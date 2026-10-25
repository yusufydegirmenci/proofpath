-- TASLAK (Faz 13): günlük lig puanı sunucuda hesaplanır. UYGULANMADI; yalnızca ek (drop/delete yok).
-- Sözdizimi bir Postgres sunucusunda çalıştırılmadı (test edilmedi); önce staging'de, iki hesapla denenmeli.
--
-- Ne değişir:
--  1) ogr_lig_soru: lig sorularının zorluğu ve doğru şıkkı (tohum: seed/20261025_lig_soru_tohumu.sql, QB'den üretilir). İstemci okuyamaz.
--  2) ogr_lig_gonder: bir günlük lig cevabını kaydeder; puanı (kolay 10, orta 15, zor 20 + hepsi doğruysa 5) SUNUCU hesaplar.
--     Oturum şartı, gün başına en çok 10 soru, her sıra bir kez (tekrar cevap yok), tarih sunucu gününe ±1 gün.
--  3) docs_lig_koru (tetikleyici): league/<uid> belgesinde 'd' (günlük kayıtlar/puan) alanını istemci DEĞİŞTİREMEZ; yalnızca
--     ogr_lig_gonder yazar. Diğer alanlar (cfg, since, acad, miss, dz …) eskisi gibi istemciden yazılır.
--
-- Bilinçli sınırlar:
--  - Günün soru KÜMESİNİ seçen mantık (konu ilerlemesi, tekrar) istemcide kalır; sunucu kümeyi yalnız doğrular (soru lig havuzunda mı, tekrarsız mı, ≤10).
--  - QB istemcide açık (oyunlar kullanıyor); doğru şıkkı bilen biri doğru cevaplayabilir. Kapanan şey: ham puan yazma, aynı soruyu
--    tekrar cevaplama, gün başına sınırsız puan. Cevap gizliliği için QB'nin de sunucuya taşınması gerekir (ayrı iş).
--  - ogr_lig_gonder belgenin updated_at değerini DEĞİŞTİRMEZ: istemcinin diğer alan yazmaları (taban sürüm kontrolü) çakışmasın.
--  - Duello/fetih reytingi (dz) ve diğer lig alanları bu fazın kapsamı dışındadır, istemciden yazılmaya devam eder.
--
-- Uygulama sırası: bu dosya → seed/20261025_lig_soru_tohumu.sql → ancak sonra istemciyi yayınla.
-- İstemci yayınlanıp sunucu hazır değilse lig cevabı "sunucu hazır değil" der ve kaydedilmez (veri kaybı yok).

create table if not exists public.ogr_lig_soru (
  soru   integer primary key check (soru >= 0),
  tur    text    not null check (tur in ('ccna', 'eng')),
  zorluk integer not null check (zorluk between 1 and 3),
  dogru  integer not null check (dogru between 0 and 5)
);
alter table public.ogr_lig_soru enable row level security;   -- politika yok: istemci hiç okuyamaz/yazamaz
revoke all on public.ogr_lig_soru from anon, authenticated;

create or replace function public.ogr_lig_gonder(
  p_gun text, p_sira integer, p_secenek integer,
  p_sorular jsonb default null, p_tekrar jsonb default '[]'::jsonb, p_seviye integer default 0)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  uid     uuid := auth.uid();
  v_path  text;
  v_bugun date := (now() at time zone 'Europe/Istanbul')::date;
  v_row   public.docs%rowtype;
  v_data  jsonb;
  v_d     jsonb;
  v_gun   jsonb;
  v_qs    jsonb;
  v_n     integer;
  v_a     jsonb;
  v_soru  integer;
  v_key   public.ogr_lig_soru%rowtype;
  v_c     numeric;
  v_dogru boolean;
  v_tot   integer;
  v_ok    integer;
  v_pts   numeric;
  v_i     integer;
  v_rv    jsonb;
  v_keys  text[];
begin
  if uid is null then raise exception 'oturum gerekli' using errcode = '28000'; end if;
  if p_gun is null or p_gun !~ '^\d{4}-\d{2}-\d{2}$' then raise exception 'gecersiz gun' using errcode = '22023'; end if;
  if abs(p_gun::date - v_bugun) > 1 then raise exception 'gecersiz gun' using errcode = '22023'; end if;
  if p_secenek is null or p_secenek not between 0 and 5 then raise exception 'gecersiz secenek' using errcode = '22023'; end if;

  v_path := 'league/' || uid::text;
  perform pg_advisory_xact_lock(hashtext(uid::text || ':lig'));   -- eş zamanlı isteklerde aynı sıra iki kez sayılmasın

  select * into v_row from public.docs where path = v_path for update;
  v_data := coalesce(v_row.data, '{}'::jsonb);
  v_d    := coalesce(v_data -> 'd', '{}'::jsonb);
  v_gun  := v_d -> p_gun;

  -- Günün sorusu kümesi: ilk cevapta istemci bildirir, sunucu doğrular ve sabitler; sonra değişmez.
  v_qs := case when jsonb_typeof(v_gun -> 'qs') = 'array' then v_gun -> 'qs' else null end;
  if v_qs is null then
    if p_sorular is null or jsonb_typeof(p_sorular) <> 'array' then raise exception 'soru listesi gerekli' using errcode = '22023'; end if;
    v_n := jsonb_array_length(p_sorular);
    if v_n not between 1 and 10 then raise exception 'soru sayisi gecersiz' using errcode = '22023'; end if;
    if exists (select 1 from jsonb_array_elements(p_sorular) e where jsonb_typeof(e) <> 'number' or e::text !~ '^\d+$') then
      raise exception 'soru listesi gecersiz' using errcode = '22023';
    end if;
    if (select count(distinct e::text) from jsonb_array_elements(p_sorular) e) <> v_n then raise exception 'soru tekrar' using errcode = '22023'; end if;
    if (select count(*) from public.ogr_lig_soru where soru in (select (e::text)::integer from jsonb_array_elements(p_sorular) e)) <> v_n then
      raise exception 'bu soru icin sunucu hazir degil' using errcode = '22023';   -- havuzda yok (ya da tohum henüz yok)
    end if;
    v_qs := p_sorular;
    -- tekrar (rv): yalnız kümenin içinden, sayı olanlar
    select coalesce(jsonb_agg(e), '[]'::jsonb) into v_rv
      from jsonb_array_elements(case when jsonb_typeof(p_tekrar) = 'array' then p_tekrar else '[]'::jsonb end) e
      where jsonb_typeof(e) = 'number' and v_qs @> jsonb_build_array(e);
    -- Eski sürümle başlamış gün (qs yok) kayıtları korunur; yeni alanlar eklenir.
    v_gun := coalesce(v_gun, '{}'::jsonb) || jsonb_build_object('v', 2, 'qs', v_qs, 'rv', v_rv, 'n', v_n,
               'lv', greatest(0, least(coalesce(p_seviye, 0), 9)));
    v_gun := jsonb_build_object('ok', 0, 'tot', 0, 'w', 0, 'wok', 0, 'pts', 0, 'a', '[]'::jsonb) || v_gun;
  end if;

  v_n := jsonb_array_length(v_qs);
  if p_sira is null or p_sira not between 0 and v_n - 1 then raise exception 'gecersiz sira' using errcode = '22023'; end if;

  v_a := coalesce(v_gun -> 'a', '[]'::jsonb);
  if jsonb_typeof(v_a) <> 'array' then v_a := '[]'::jsonb; end if;
  while jsonb_array_length(v_a) < v_n loop v_a := v_a || 'null'::jsonb; end loop;
  if jsonb_typeof(v_a -> p_sira) <> 'null' then raise exception 'bu soru zaten cevaplandi' using errcode = '23505'; end if;

  if coalesce((v_gun ->> 'tot')::integer, 0) >= v_n then raise exception 'tur bitti' using errcode = '23505'; end if;
  v_soru := ((v_qs -> p_sira)::text)::integer;
  select * into v_key from public.ogr_lig_soru where soru = v_soru;
  if not found then raise exception 'bu soru icin sunucu hazir degil' using errcode = '22023'; end if;

  v_c     := case v_key.zorluk when 1 then 1 when 2 then 1.5 else 2 end;
  v_dogru := (p_secenek = v_key.dogru);
  v_a     := jsonb_set(v_a, array[p_sira::text], to_jsonb(p_secenek));
  v_tot   := coalesce((v_gun ->> 'tot')::integer, 0) + 1;
  v_ok    := coalesce((v_gun ->> 'ok')::integer, 0) + case when v_dogru then 1 else 0 end;
  v_pts   := coalesce((v_gun ->> 'pts')::numeric, 0) + case when v_dogru then round(10 * v_c) else 0 end;
  if v_tot = v_n and v_ok = v_tot then v_pts := v_pts + 5; end if;

  v_gun := v_gun || jsonb_build_object('a', v_a, 'tot', v_tot, 'ok', v_ok, 'pts', v_pts,
             'w',   coalesce((v_gun ->> 'w')::numeric, 0)   + v_c,
             'wok', coalesce((v_gun ->> 'wok')::numeric, 0) + case when v_dogru then v_c else 0 end);
  v_d := jsonb_set(v_d, array[p_gun], v_gun, true);

  -- en son 60 gün kalsın (istemcinin eski budamasıyla aynı)
  select array_agg(k order by k) into v_keys from jsonb_object_keys(v_d) k;
  if array_length(v_keys, 1) > 60 then
    for v_i in 1 .. array_length(v_keys, 1) - 60 loop v_d := v_d - v_keys[v_i]; end loop;
  end if;

  perform set_config('pp.lig_rpc', '1', true);   -- docs_lig_koru bu işlemde 'd' yazımına izin verir
  if v_row.path is not null then
    update public.docs set data = jsonb_set(v_data, '{d}', v_d, true) where path = v_path;   -- updated_at'e DOKUNMA (bkz. üst not)
  else
    insert into public.docs (path, coll, doc_id, owner, data) values (v_path, 'league', uid::text, uid, jsonb_build_object('d', v_d, 'since', p_gun));
  end if;
  perform set_config('pp.lig_rpc', '', true);

  return jsonb_build_object('gun', v_gun, 'dogru', v_dogru, 'dogru_secenek', v_key.dogru, 'tarih', p_gun);
end;
$$;
revoke all on function public.ogr_lig_gonder(text, integer, integer, jsonb, jsonb, integer) from public, anon;
grant execute on function public.ogr_lig_gonder(text, integer, integer, jsonb, jsonb, integer) to authenticated;

-- 'd' yalnız ogr_lig_gonder tarafından yazılır: istemci yazımında eski 'd' korunur (yoksa alan düşürülür).
create or replace function public.docs_lig_koru() returns trigger
language plpgsql
as $$
begin
  if new.coll <> 'league' or coalesce(current_setting('pp.lig_rpc', true), '') = '1' then return new; end if;
  new.data := new.data - 'd';
  if tg_op = 'UPDATE' and old.data ? 'd' then
    new.data := new.data || jsonb_build_object('d', old.data -> 'd');
  end if;
  return new;
end;
$$;
drop trigger if exists docs_lig_koru on public.docs;
create trigger docs_lig_koru before insert or update on public.docs
  for each row execute function public.docs_lig_koru();

-- Geri alma (rollback): istemciyi eski sürüme döndürmeden ÖNCE tetikleyici kaldırılmalı, yoksa eski istemcinin puanı yazılmaz:
--   drop trigger if exists docs_lig_koru on public.docs;
--   drop function if exists public.docs_lig_koru();
--   drop function if exists public.ogr_lig_gonder(text, integer, integer, jsonb, jsonb, integer);
--   drop table if exists public.ogr_lig_soru;   -- tohum yeniden üretilebilir (tools/lig-anahtar.js)
-- Mevcut league belgelerindeki 'd' verisi hiçbir adımda silinmez.

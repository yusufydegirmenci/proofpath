-- TASLAK (Faz 9 sunucu): sinav akisi icin ek. UYGULANMADI; yalnizca ek (drop/delete yok), 20261012_ogrenme_guvenilir_ustalik.sql uzerine kurulur.
-- Sozdizimi bir Postgres sunucusunda calistirilmadi (test edilmedi); once staging'de, iki hesapla denenmeli.
--
-- Ne degisir:
--  1) ogr_cevap_anahtari: agirlik (seviye sinavi zorluk agirligi) ve aciklama (why / whyNot; istemci icerigine KOYULMAZ) alanlari.
--  2) ogr_deneme_gonder: ayni imza, create or replace. Puan agirlikli toplam; yanit boyutu siniri; sonuc yalniz GECTIYSE cevap anahtarini
--     ve aciklamalari dondurur (kalinca yalniz puan/oran/dogru sayisi): anahtar kalan denemelerde sizmaz.
--  3) Istemci yetkisi degismez: ogr_cevap_anahtari tamamen kapali kalir; ogr_deneme yine yalniz fonksiyonla yazilir.
--
-- Uygulama sirasi (ayrintisi raporda): bu dosya → *_ogr_hedefler.sql → *_ogr_anahtar.sql (gizli, halka acik repoda YOK) → ancak sonra istemciyi yayinla.
-- Istemci yayinlanip sunucu hazir degilse sinavlar "sunucu hazir degil" der ve ustaliga sayilmaz (veri kaybi yok).

alter table public.ogr_cevap_anahtari add column if not exists agirlik numeric not null default 1 check (agirlik > 0);
alter table public.ogr_cevap_anahtari add column if not exists aciklama jsonb;

create or replace function public.ogr_deneme_gonder(p_hedef text, p_varyant text, p_cevaplar jsonb, p_yardim jsonb default '{}'::jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  uid       uuid := auth.uid();
  h         public.ogr_hedef%rowtype;
  v_maks    numeric;
  v_puan    numeric;
  v_soru_n  integer;
  v_dogru_n integer;
  v_atanan  text;
  v_sinir   integer;
  v_yrd     jsonb;
  v_esik    numeric;
  v_gecti   boolean;
  v_anahtar jsonb := null;
begin
  if uid is null then raise exception 'oturum gerekli' using errcode = '28000'; end if;
  select * into h from public.ogr_hedef where id = p_hedef;
  if not found then raise exception 'bilinmeyen hedef' using errcode = '22023'; end if;
  if p_cevaplar is null or jsonb_typeof(p_cevaplar) <> 'object' then raise exception 'cevaplar nesne olmali' using errcode = '22023'; end if;
  if pg_column_size(p_cevaplar) > 65536 then raise exception 'cevaplar cok buyuk' using errcode = '22023'; end if;

  -- Tam küme: cevaplar varyantın TÜM sorularını içermeli, fazlası olmamalı (tek soruyu yoklayarak anahtar çıkarma engellenir)
  if exists (select 1 from public.ogr_cevap_anahtari a where a.hedef = p_hedef and a.varyant = p_varyant and not (p_cevaplar ? a.soru_id))
     or exists (select 1 from jsonb_object_keys(p_cevaplar) k where k not in (select soru_id from public.ogr_cevap_anahtari where hedef = p_hedef and varyant = p_varyant)) then
    raise exception 'eksik ya da fazla cevap' using errcode = '22023';
  end if;

  perform pg_advisory_xact_lock(hashtext(uid::text || p_hedef));   -- es zamanli isteklerde saat siniri asilmasin
  select count(*) into v_sinir from public.ogr_deneme where user_id = uid and hedef = p_hedef and olusturma > now() - interval '1 hour';
  if v_sinir >= 5 then raise exception 'cok sik deneme; biraz bekle' using errcode = '54000'; end if;

  -- Sunucu varyant atamasi: en az kullanilan, son kullanilan degil. Tek varyantli hedefte her zaman o varyant.
  select a.varyant into v_atanan from (select distinct varyant from public.ogr_cevap_anahtari where hedef = p_hedef) a
    left join (select varyant, count(*) n, max(olusturma) son from public.ogr_deneme where user_id = uid and hedef = p_hedef group by varyant) k on k.varyant = a.varyant
    order by coalesce(k.n, 0), coalesce(k.son, 'epoch'::timestamptz), a.varyant limit 1;
  if v_atanan is null then raise exception 'bu hedef icin soru yok' using errcode = '22023'; end if;
  if p_varyant is distinct from v_atanan then
    return jsonb_build_object('varyant_atandi', v_atanan, 'puan', null);   -- istemci atanan varyantin sorulariyla yeniden gonderir; deneme kaydedilmedi
  end if;

  select coalesce(sum(a.agirlik), 0), count(*),
         coalesce(sum(a.agirlik) filter (where p_cevaplar ->> a.soru_id = a.dogru), 0),
         count(*) filter (where p_cevaplar ->> a.soru_id = a.dogru)
    into v_maks, v_soru_n, v_puan, v_dogru_n
    from public.ogr_cevap_anahtari a where a.hedef = p_hedef and a.varyant = p_varyant;
  if v_soru_n = 0 or v_maks <= 0 then raise exception 'bu varyant icin soru yok' using errcode = '22023'; end if;

  -- Yardim beyani istemciden gelir: guvenilir kabul EDILMEZ (sunucu dogrulayamaz).
  v_yrd := jsonb_build_object('tur', case when p_yardim ->> 'tur' in ('yok', 'ipucu', 'ai') then p_yardim ->> 'tur' else 'bilinmiyor' end, 'guvenilir', false);

  insert into public.ogr_deneme (user_id, hedef, varyant, puan, maks, surum, yardim)
  values (uid, p_hedef, p_varyant, v_puan, v_maks, h.surum, v_yrd);

  v_esik  := greatest(h.esik, case when h.kritik then 0.8 else 0 end);
  v_gecti := (v_puan / v_maks) >= v_esik;

  -- Cevap anahtari ve aciklamalar YALNIZ gecince doner (kalan denemede sizmaz; sinirli deneme + gecti kosulu).
  if v_gecti then
    select jsonb_object_agg(a.soru_id,
             jsonb_build_object('dogru', a.dogru, 'ok', coalesce(p_cevaplar ->> a.soru_id = a.dogru, false)) || coalesce(a.aciklama, '{}'::jsonb))
      into v_anahtar
      from public.ogr_cevap_anahtari a where a.hedef = p_hedef and a.varyant = p_varyant;
  end if;

  return jsonb_build_object('puan', v_puan, 'maks', v_maks, 'oran', round(v_puan / v_maks, 4), 'gecti', v_gecti,
                            'dogru_sayisi', v_dogru_n, 'soru_sayisi', v_soru_n, 'esik', v_esik, 'surum', h.surum, 'anahtar', v_anahtar);
end;
$$;
revoke all on function public.ogr_deneme_gonder(text, text, jsonb, jsonb) from public, anon;
grant execute on function public.ogr_deneme_gonder(text, text, jsonb, jsonb) to authenticated;

-- Geri alma (rollback): yeni alanlari ve fonksiyon govdesini onceki surume dondurmek icin
--   1) 20261012_ogrenme_guvenilir_ustalik.sql icindeki ogr_deneme_gonder tanimini yeniden calistirin (create or replace);
--   2) alter table public.ogr_cevap_anahtari drop column if exists aciklama, drop column if exists agirlik;   -- anahtar tohumlari bu alanlara yazdiysa once yedek alin
--   Not: ogr_deneme kayitlari silinmez; puan/maks numeric oldugu icin agirlikli kayitlar eski surumle de okunur.

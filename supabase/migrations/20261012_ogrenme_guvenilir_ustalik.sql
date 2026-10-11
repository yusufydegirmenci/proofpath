-- TASLAK: guvenilir ustalik kaydi (cevap anahtari ve puanlama sunucuda).
-- Dosya olarak hazirlandi; UYGULANMADI. Uygulama icin yedek + iki hesapla deneme + acik onay gerekir.
-- Sozdizimi bir Postgres sunucusunda calistirilmadi (test edilmedi); uygulamadan once staging'de denenmeli.
--
-- Neden: istemci tarafindaki kapilar yetkilendirme degildir; guvenilir ustalik sonucu istemciden bagimsiz,
-- sunucuda uretilen kayitlardan gelmelidir. Bu taslak guvenilir sonucu ayri tablolara ve islevlere tasir.
--
-- Ilkeler:
--  1) Cevap anahtari istemciye hicbir yolla donmez (tabloda politika yok; yalnizca security definer islev okur).
--  2) Puani sunucu hesaplar; istemci yalniz cevaplarini gonderir.
--  3) ogr_deneme yalnizca eklenir (insert/update/delete istemciden kapali), gecmis kanit korunur.
--  4) Kapi degerlendirmesi sunucuda: kritik hedefler tek tek, varsayilan esik %80.
--  5) Deneme sikligi sinirli (ezber ve tekrar denemeyi zorlastirir).

-- ---- Mufredat metadatasi (cevap iceremez) ----
create table if not exists public.ogr_hedef (
  id          text primary key,                       -- istemcideki hedef kimligi (ornek: ders:ccna:1:sinav)
  yetkinlik   text not null,
  kritik      boolean not null default false,
  esik        numeric not null default 0.8 check (esik > 0 and esik <= 1),
  surum       text not null,                          -- icerik (mufredat) surumu
  uyumlu_surumler text[] not null default '{}'
);
alter table public.ogr_hedef enable row level security;
drop policy if exists ogr_hedef_select on public.ogr_hedef;
create policy ogr_hedef_select on public.ogr_hedef for select to authenticated using (true);
revoke insert, update, delete on public.ogr_hedef from anon, authenticated;

create table if not exists public.ogr_kapi (
  id              text primary key,                   -- ornek: altin:sec:1
  seviye          text not null,                      -- L0..L8
  onkosul_kapilar text[] not null default '{}',
  esik            numeric not null default 0.8 check (esik > 0 and esik <= 1)
);
create table if not exists public.ogr_kapi_hedef (
  kapi   text not null references public.ogr_kapi(id) on delete cascade,
  hedef  text not null references public.ogr_hedef(id) on delete cascade,
  primary key (kapi, hedef)
);
-- Sunucuda henuz proje/kanit/bagimsizlik tablosu YOK: bunlari isteyen kapi (min_cekirdek_proje>0 ya da gereksinimler) acilamaz.
alter table public.ogr_kapi add column if not exists min_cekirdek_proje integer not null default 0;
alter table public.ogr_kapi add column if not exists gereksinimler text[] not null default '{}';
alter table public.ogr_kapi enable row level security;
alter table public.ogr_kapi_hedef enable row level security;
drop policy if exists ogr_kapi_select on public.ogr_kapi;
create policy ogr_kapi_select on public.ogr_kapi for select to authenticated using (true);
drop policy if exists ogr_kapi_hedef_select on public.ogr_kapi_hedef;
create policy ogr_kapi_hedef_select on public.ogr_kapi_hedef for select to authenticated using (true);
revoke insert, update, delete on public.ogr_kapi, public.ogr_kapi_hedef from anon, authenticated;

-- ---- Cevap anahtari: hicbir istemci politikasi yok → yalnizca security definer islevler okur ----
create table if not exists public.ogr_cevap_anahtari (
  hedef    text not null references public.ogr_hedef(id) on delete cascade,
  varyant  text not null,
  soru_id  text not null,
  dogru    text not null,
  primary key (hedef, varyant, soru_id)
);
alter table public.ogr_cevap_anahtari enable row level security;       -- politika YOK: istemciye tamamen kapali
revoke all on public.ogr_cevap_anahtari from anon, authenticated;

-- ---- Denemeler: yalnizca ekleme; istemci okuyabilir (kendi satirlari), yazamaz ----
create table if not exists public.ogr_deneme (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  hedef      text not null references public.ogr_hedef(id),
  varyant    text not null,
  puan       numeric not null check (puan >= 0),
  maks       numeric not null check (maks > 0),
  surum      text not null,
  yardim     jsonb not null default '{"tur":"bilinmiyor","guvenilir":false}'::jsonb,
  dogrulama  text not null default 'sunucu' check (dogrulama = 'sunucu'),
  olusturma  timestamptz not null default now(),
  constraint ogr_deneme_puan_maks check (puan <= maks)
);
create index if not exists ogr_deneme_kullanici_idx on public.ogr_deneme (user_id, hedef, olusturma desc);
alter table public.ogr_deneme enable row level security;
drop policy if exists ogr_deneme_select on public.ogr_deneme;
create policy ogr_deneme_select on public.ogr_deneme for select to authenticated using (user_id = auth.uid());
revoke insert, update, delete on public.ogr_deneme from anon, authenticated;     -- yazma yalnizca ogr_deneme_gonder ile

-- ---- Deneme gonder: puanlama sunucuda; cevap anahtari donmez ----
-- p_cevaplar: {"<soru_id>": "<verilen cevap>", ...}. Varyanti SUNUCU atar (p_varyant yalniz sunucunun daha once verdigi varyantla eslesmeli:
-- son denemede kalinan varyant ve kullanilmis varyantlar disinda en az kullanilan). Donus yalniz puan/oran/gecti; soru kimligi ve dogru cevap DONMEZ.
-- Not: atanan varyanti istemciye veren (cevap anahtarsiz) soru RPC'si bu taslakta YOK; eklenmeden istemci varyanti bilemez.
create or replace function public.ogr_deneme_gonder(p_hedef text, p_varyant text, p_cevaplar jsonb, p_yardim jsonb default '{}'::jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  uid     uuid := auth.uid();
  h       public.ogr_hedef%rowtype;
  toplam  integer;
  dogru   integer;
  atanan  text;
  sinir   integer;
  yrd     jsonb;
begin
  if uid is null then raise exception 'oturum gerekli' using errcode = '28000'; end if;
  select * into h from public.ogr_hedef where id = p_hedef;
  if not found then raise exception 'bilinmeyen hedef' using errcode = '22023'; end if;
  if p_cevaplar is null or jsonb_typeof(p_cevaplar) <> 'object' then raise exception 'cevaplar nesne olmali' using errcode = '22023'; end if;

  perform pg_advisory_xact_lock(hashtext(uid::text || p_hedef));   -- es zamanli isteklerde saat siniri asilmasin
  select count(*) into sinir from public.ogr_deneme where user_id = uid and hedef = p_hedef and olusturma > now() - interval '1 hour';
  if sinir >= 5 then raise exception 'cok sik deneme; biraz bekle' using errcode = '54000'; end if;

  -- Sunucu varyant atamasi: en az kullanilan, son kullanilan degil.
  select a.varyant into atanan from (select distinct varyant from public.ogr_cevap_anahtari where hedef = p_hedef) a
    left join (select varyant, count(*) n, max(olusturma) son from public.ogr_deneme where user_id = uid and hedef = p_hedef group by varyant) k on k.varyant = a.varyant
    order by coalesce(k.n, 0), coalesce(k.son, 'epoch'::timestamptz), a.varyant limit 1;
  if atanan is null then raise exception 'bu hedef icin soru yok' using errcode = '22023'; end if;
  if p_varyant is distinct from atanan then
    return jsonb_build_object('varyant_atandi', atanan, 'puan', null);   -- istemci once atanan varyantin sorularini ister
  end if;

  select count(*) into toplam from public.ogr_cevap_anahtari where hedef = p_hedef and varyant = p_varyant;
  if toplam = 0 then raise exception 'bu varyant icin soru yok' using errcode = '22023'; end if;

  select count(*) filter (where p_cevaplar ->> a.soru_id = a.dogru)
    into dogru
    from public.ogr_cevap_anahtari a where a.hedef = p_hedef and a.varyant = p_varyant;

  -- Yardim beyani istemciden gelir: guvenilir kabul EDILMEZ (sunucu dogrulayamaz).
  yrd := jsonb_build_object('tur', coalesce(p_yardim ->> 'tur', 'bilinmiyor'), 'guvenilir', false);

  insert into public.ogr_deneme (user_id, hedef, varyant, puan, maks, surum, yardim)
  values (uid, p_hedef, p_varyant, dogru, toplam, h.surum, yrd);

  return jsonb_build_object('puan', dogru, 'maks', toplam, 'oran', round(dogru::numeric / toplam, 4),
                            'gecti', (dogru::numeric / toplam) >= greatest(h.esik, case when h.kritik then 0.8 else 0 end));
end;
$$;
revoke all on function public.ogr_deneme_gonder(text, text, jsonb, jsonb) from public, anon;
grant execute on function public.ogr_deneme_gonder(text, text, jsonb, jsonb) to authenticated;

-- ---- Kapi degerlendirme (sunucuda): kritik hedefler tek tek, kritik olmayanlarin ortalamasi esikte ----
-- Istemcideki js/ogrenme/kapi.js ile ayni kural; guvenilir sonuc BURADAN gelir. Donus: {acik, nedenler[]}
create or replace function public.ogr_kapi_degerlendir(p_kapi text, p_yigin text[] default '{}')
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  uid      uuid := auth.uid();
  k        public.ogr_kapi%rowtype;
  r        record;
  nedenler jsonb := '[]'::jsonb;
  ort      numeric;
  p        text;
begin
  if uid is null then raise exception 'oturum gerekli' using errcode = '28000'; end if;
  select * into k from public.ogr_kapi where id = p_kapi;
  if not found then raise exception 'bilinmeyen kapi' using errcode = '22023'; end if;

  if p_yigin @> array[p_kapi] then
    return jsonb_build_object('kapi', p_kapi, 'acik', false, 'nedenler', jsonb_build_array(jsonb_build_object('kod', 'dongu', 'ref', p_kapi)));
  end if;

  if k.min_cekirdek_proje > 0 or cardinality(k.gereksinimler) > 0 then
    nedenler := nedenler || jsonb_build_array(jsonb_build_object('kod', 'sunucu-kaniti-tanimsiz', 'ref', p_kapi));
  end if;
  if not exists (select 1 from public.ogr_kapi_hedef where kapi = p_kapi) and cardinality(k.onkosul_kapilar) = 0 then
    nedenler := nedenler || jsonb_build_array(jsonb_build_object('kod', 'tanim-eksik', 'ref', p_kapi));
  end if;

  foreach p in array k.onkosul_kapilar loop
    if not exists (select 1 from public.ogr_kapi where id = p) then
      nedenler := nedenler || jsonb_build_array(jsonb_build_object('kod', 'bilinmeyen-onkosul', 'ref', p));
    elsif not coalesce((public.ogr_kapi_degerlendir(p, coalesce(p_yigin, '{}') || p_kapi) ->> 'acik')::boolean, false) then
      nedenler := nedenler || jsonb_build_array(jsonb_build_object('kod', 'onkosul-kapi', 'ref', p));
    end if;
  end loop;

  for r in
    select kh.hedef, h.kritik, greatest(h.esik, case when h.kritik then 0.8 else 0 end, k.esik) as esik, h.surum, h.uyumlu_surumler,
           (select d.puan / d.maks from public.ogr_deneme d
              where d.user_id = uid and d.hedef = kh.hedef and (d.surum = h.surum or d.surum = any (h.uyumlu_surumler))
              order by d.olusturma desc, d.id desc limit 1) as oran
      from public.ogr_kapi_hedef kh join public.ogr_hedef h on h.id = kh.hedef
     where kh.kapi = p_kapi
  loop
    if r.oran is null then
      nedenler := nedenler || jsonb_build_array(jsonb_build_object('kod', case when r.kritik then 'kritik-denenmedi' else 'hedef-denenmedi' end, 'ref', r.hedef));
    elsif r.kritik and r.oran < r.esik then
      nedenler := nedenler || jsonb_build_array(jsonb_build_object('kod', 'kritik-basarisiz', 'ref', r.hedef, 'oran', r.oran, 'esik', r.esik));
    end if;
  end loop;

  select avg(x.oran) into ort from (
    select (select d.puan / d.maks from public.ogr_deneme d
              where d.user_id = uid and d.hedef = kh.hedef and (d.surum = h.surum or d.surum = any (h.uyumlu_surumler))
              order by d.olusturma desc, d.id desc limit 1) as oran
      from public.ogr_kapi_hedef kh join public.ogr_hedef h on h.id = kh.hedef
     where kh.kapi = p_kapi and not h.kritik) x where x.oran is not null;
  if ort is not null and ort < k.esik then
    nedenler := nedenler || jsonb_build_array(jsonb_build_object('kod', 'esik-altinda', 'ref', p_kapi, 'oran', ort, 'esik', k.esik));
  end if;

  return jsonb_build_object('kapi', p_kapi, 'acik', jsonb_array_length(nedenler) = 0, 'nedenler', nedenler);
end;
$$;
revoke all on function public.ogr_kapi_degerlendir(text, text[]) from public, anon;
grant execute on function public.ogr_kapi_degerlendir(text, text[]) to authenticated;

-- Geri alma (rollback): asagidaki komutlar yalnizca bu dosyanin ekledigi nesneleri kaldirir; docs ve profiles'a dokunmaz.
--   drop function if exists public.ogr_kapi_degerlendir(text, text[]);
--   drop function if exists public.ogr_deneme_gonder(text, text, jsonb, jsonb);
--   drop table if exists public.ogr_deneme, public.ogr_cevap_anahtari, public.ogr_kapi_hedef, public.ogr_kapi, public.ogr_hedef;
-- Dikkat: ogr_deneme silinirse sunucudaki kanit kaybolur; once yedek alin.

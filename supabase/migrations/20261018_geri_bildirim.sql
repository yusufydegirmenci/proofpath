-- Faz 12 V4: geri bildirim tablosu (hata / istek / sikayet / oneri).
-- Yalniz YENI nesneler olusturur (tablo, indeks, fonksiyon, trigger, politika); mevcut tablo ve politikalara dokunmaz, veri silmez/degistirmez.
-- Dosya olarak hazirlandi; UYGULANMADI ve sozdizimi yerel Postgres'te calistirilmadi (psql yok). Uygulamadan once begin; ...; rollback; ile denenmeli.
-- Istemci bu tabloyu su an CAGIRMAZ (geri bildirimler yalniz yerel kuyrukta, ya_pp_ogr.geriBildirim); baglanti ayri bir karar ve ayri bir turdur.
--
-- Ilkeler:
--  1) Anon yok: yalniz oturum acmis kullanici ekler/gorur; yalniz KENDI satirini. Guncelleme ve silme politikasi YOK (istemci duzeltemez/silemez).
--  2) Kisisel veri alani yok (ad/e-posta kolonu yok); baglam yalniz ders/proje kimligi gibi kucuk bir nesne. Okuma/moderasyon sahip tarafindan panelden.
--  3) Spam siniri: kullanici basina son 24 saatte en fazla 10 satir (tetikleyici); created_at ve durum sunucuda zorlanir.
--  4) Uzunluk/bicim CHECK kisitlari.

create table if not exists public.geri_bildirim (
  id          uuid primary key default gen_random_uuid(),
  owner       uuid not null default auth.uid() references auth.users(id) on delete cascade,
  tur         text not null,
  baslik      text not null,
  aciklama    text not null,
  baglam      jsonb not null default '{}'::jsonb,
  durum       text not null default 'yeni',
  created_at  timestamptz not null default now(),
  constraint geri_bildirim_tur      check (tur in ('hata', 'istek', 'sikayet', 'oneri')),
  constraint geri_bildirim_baslik   check (char_length(baslik) between 3 and 80),
  constraint geri_bildirim_aciklama check (char_length(aciklama) between 10 and 2000),
  constraint geri_bildirim_baglam   check (jsonb_typeof(baglam) = 'object' and octet_length(baglam::text) <= 1000),
  constraint geri_bildirim_durum    check (durum in ('yeni', 'okundu', 'kapandi'))
);

create index if not exists geri_bildirim_owner_idx on public.geri_bildirim (owner, created_at);

alter table public.geri_bildirim enable row level security;
revoke all on public.geri_bildirim from anon, authenticated;
grant select, insert on public.geri_bildirim to authenticated;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'geri_bildirim' and policyname = 'geri_bildirim_select') then
    create policy geri_bildirim_select on public.geri_bildirim for select to authenticated using (owner = auth.uid());
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'geri_bildirim' and policyname = 'geri_bildirim_insert') then
    create policy geri_bildirim_insert on public.geri_bildirim for insert to authenticated with check (owner = auth.uid() and durum = 'yeni');
  end if;
end
$$;

-- Eklemeden once: zaman ve durum sunucuda belirlenir (gecmise tarihleyerek siniri atlatma yok); gunluk sinir.
create or replace function public.geri_bildirim_gunluk_sinir() returns trigger
language plpgsql as $$
begin
  new.created_at := now();
  new.durum := 'yeni';
  if (select count(*) from public.geri_bildirim where owner = new.owner and created_at > now() - interval '24 hours') >= 10 then
    raise exception 'geri_bildirim: gunluk sinir (10) asildi';
  end if;
  return new;
end
$$;

do $$
begin
  if not exists (select 1 from pg_trigger where tgname = 'geri_bildirim_gunluk_sinir' and tgrelid = 'public.geri_bildirim'::regclass) then
    create trigger geri_bildirim_gunluk_sinir before insert on public.geri_bildirim
      for each row execute function public.geri_bildirim_gunluk_sinir();
  end if;
end
$$;

-- Faz 8: rapor paylasimi sunucu politikasi (portfolyo/rapor paylasimi, iptal edilebilir).
-- Yalniz YENI nesneler olusturur (tablo, fonksiyon, trigger, politika); mevcut tablo ve politikalara dokunmaz, veri silmez/degistirmez.
-- Dosya olarak hazirlandi; sozdizimi yerel Postgres'te calistirilmadi (psql yok). Uygulamadan once begin; ...; rollback; ile denenmeli.
--
-- Ilkeler:
--  1) Belirtec (token) yalniz paylasimi olusturan istemcide gorunur; sunucuda yalniz SHA-256 ozeti saklanir.
--  2) Sahibi disinda kimse tabloyu dogrudan okuyamaz/yazamaz (RLS); baskasi yalniz rapor_gor(belirtec) ile erisir.
--  3) Iptal edilmis ya da suresi dolmus paylasim erisim vermez; iptal geri alinamaz; yalniz iptal alani degistirilebilir.
--  4) Paylasilan rapor istemcinin hazirladigi isveren gorunumudur (ozel not/kimlik yok); boyut ve sure sinirli (en fazla 90 gun).

create table if not exists public.rapor_paylasim (
  id          uuid primary key default gen_random_uuid(),
  owner       uuid not null references auth.users(id) on delete cascade,
  token_ozet  text not null unique,
  rapor       jsonb not null,
  created_at  timestamptz not null default now(),
  expires_at  timestamptz not null,
  revoked_at  timestamptz,
  constraint rapor_paylasim_boyut check (octet_length(rapor::text) < 200000),
  constraint rapor_paylasim_sure  check (expires_at > created_at and expires_at <= created_at + interval '90 days'),
  constraint rapor_paylasim_ozet  check (token_ozet ~ '^[0-9a-f]{64}$')
);

create index if not exists rapor_paylasim_owner_idx on public.rapor_paylasim (owner);

alter table public.rapor_paylasim enable row level security;
revoke all on public.rapor_paylasim from anon;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'rapor_paylasim' and policyname = 'rapor_paylasim_select') then
    create policy rapor_paylasim_select on public.rapor_paylasim for select to authenticated using (owner = auth.uid());
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'rapor_paylasim' and policyname = 'rapor_paylasim_insert') then
    create policy rapor_paylasim_insert on public.rapor_paylasim for insert to authenticated with check (owner = auth.uid() and revoked_at is null);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'rapor_paylasim' and policyname = 'rapor_paylasim_update') then
    create policy rapor_paylasim_update on public.rapor_paylasim for update to authenticated using (owner = auth.uid()) with check (owner = auth.uid());
  end if;
end
$$;

-- Yalniz iptal alani degisebilir; iptal geri alinamaz.
create or replace function public.rapor_paylasim_guncelle_kilidi() returns trigger
language plpgsql as $$
begin
  if new.owner is distinct from old.owner
     or new.token_ozet is distinct from old.token_ozet
     or new.rapor is distinct from old.rapor
     or new.expires_at is distinct from old.expires_at
     or new.created_at is distinct from old.created_at then
    raise exception 'rapor_paylasim: yalniz revoked_at degistirilebilir';
  end if;
  if old.revoked_at is not null and new.revoked_at is distinct from old.revoked_at then
    raise exception 'rapor_paylasim: iptal geri alinamaz';
  end if;
  return new;
end
$$;

do $$
begin
  if not exists (select 1 from pg_trigger where tgname = 'rapor_paylasim_guncelle_kilidi' and tgrelid = 'public.rapor_paylasim'::regclass) then
    create trigger rapor_paylasim_guncelle_kilidi before update on public.rapor_paylasim
      for each row execute function public.rapor_paylasim_guncelle_kilidi();
  end if;
end
$$;

-- Erisim: belirtec gecerli, iptal edilmemis ve suresi dolmamissa raporu dondurur; aksi halde null (nedeni sizdirmaz).
create or replace function public.rapor_gor(p_belirtec text) returns jsonb
language sql stable security definer set search_path = public as $$
  select r.rapor
  from public.rapor_paylasim r
  where p_belirtec is not null
    and length(p_belirtec) >= 16
    and r.token_ozet = encode(sha256(convert_to(p_belirtec, 'UTF8')), 'hex')
    and r.revoked_at is null
    and r.expires_at > now()
  limit 1
$$;

revoke all on function public.rapor_gor(text) from public;
grant execute on function public.rapor_gor(text) to anon, authenticated;

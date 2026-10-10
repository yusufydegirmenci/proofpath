-- Proofpath · Supabase şeması
-- Supabase panelinde SQL Editor'e yapıştırıp bir kez çalıştır.

-- 1) Tek belge tablosu: uygulamanın db.collection/doc yapısını taşır.
create table if not exists public.docs (
  path        text primary key,          -- örn. data/users/<uid>/pp/projects/abc  ya da  league/<uid>
  coll        text not null,             -- yolun son parçası hariç kısmı
  doc_id      text not null,             -- yolun son parçası
  owner       uuid references auth.users(id) on delete cascade,
  data        jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now(),
  constraint docs_data_size check (octet_length(data::text) < 900000)
);

create index if not exists docs_coll_idx  on public.docs (coll);
create index if not exists docs_owner_idx on public.docs (owner);

-- 2) Satır güvenliği (RLS): herkes yalnızca kendi verisini görür ve yazar.
alter table public.docs enable row level security;

drop policy if exists docs_select on public.docs;
create policy docs_select on public.docs for select to authenticated
using (
  left(path, length('data/users/' || auth.uid()::text || '/')) = 'data/users/' || auth.uid()::text || '/'
  or coll in ('league', 'cheers', 'league_notes', 'jobpool', 'gazete')
);

drop policy if exists docs_insert on public.docs;
create policy docs_insert on public.docs for insert to authenticated
with check (
  owner = auth.uid()
  and (
    left(path, length('data/users/' || auth.uid()::text || '/')) = 'data/users/' || auth.uid()::text || '/'
    or (coll in ('league', 'cheers') and doc_id = auth.uid()::text)
  )
);

drop policy if exists docs_update on public.docs;
create policy docs_update on public.docs for update to authenticated
using (
  owner = auth.uid()
  and (
    left(path, length('data/users/' || auth.uid()::text || '/')) = 'data/users/' || auth.uid()::text || '/'
    or (coll in ('league', 'cheers') and doc_id = auth.uid()::text)
  )
)
with check (
  owner = auth.uid()
  and (
    left(path, length('data/users/' || auth.uid()::text || '/')) = 'data/users/' || auth.uid()::text || '/'
    or (coll in ('league', 'cheers') and doc_id = auth.uid()::text)
  )
);

drop policy if exists docs_delete on public.docs;
create policy docs_delete on public.docs for delete to authenticated
using (
  owner = auth.uid()
  and (
    left(path, length('data/users/' || auth.uid()::text || '/')) = 'data/users/' || auth.uid()::text || '/'
    or (coll in ('league', 'cheers') and doc_id = auth.uid()::text)
  )
);

-- 3) Görünen ad: lig sıralamasında isimler buradan gelir.
create table if not exists public.profiles (
  id    uuid primary key references auth.users(id) on delete cascade,
  name  text not null default ''
);

alter table public.profiles enable row level security;

drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles for select to authenticated using (true);

drop policy if exists profiles_update on public.profiles;
create policy profiles_update on public.profiles for update to authenticated
using (id = auth.uid()) with check (id = auth.uid());

-- Kayıt olunca profil satırını otomatik aç.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name)
  values (new.id, left(coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)), 40))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

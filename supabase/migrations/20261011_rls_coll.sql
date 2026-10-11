-- docs politikalari: coll ve doc_id degerlerinin path ile tutarliligi.
-- Dosya olarak hazirlandi; uygulanmasi ayri onay gerektirir.

-- coll = path'in son '/' oncesi, doc_id = son parca (supabase-shim.js ile ayni kural).
-- NOT VALID: mevcut satirlari taramaz, yeni yazimlara uygulanir.
alter table public.docs drop constraint if exists docs_coll_matches_path;
alter table public.docs add constraint docs_coll_matches_path check (
  position('/' in path) > 0
  and doc_id = substring(path from '[^/]*$')
  and coll = left(path, length(path) - length(doc_id) - 1)
) not valid;

drop policy if exists docs_insert on public.docs;
create policy docs_insert on public.docs for insert to authenticated
with check (
  owner = auth.uid()
  and coll = left(path, length(path) - length(doc_id) - 1)
  and doc_id = substring(path from '[^/]*$')
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
  and coll = left(path, length(path) - length(doc_id) - 1)
  and doc_id = substring(path from '[^/]*$')
  and (
    left(path, length('data/users/' || auth.uid()::text || '/')) = 'data/users/' || auth.uid()::text || '/'
    or (coll in ('league', 'cheers') and doc_id = auth.uid()::text)
  )
);

-- Oneri (uygulanmaz, istemci degisikligi gerektirir): lig icin yalniz gereken alanlari
-- acan gorunum. Istemci gecise hazir olunca docs_select'ten 'league' cikarilir.
-- create or replace view public.league_public with (security_invoker = false) as
--   select doc_id, data - 'miss' as data from public.docs where coll = 'league';
-- grant select on public.league_public to authenticated;

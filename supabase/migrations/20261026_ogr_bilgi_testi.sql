-- TASLAK (Faz 21): bolum sonu "bilgi testi" icin tek islev. UYGULANMADI; yalnizca ek (drop/delete yok).
-- Ayri hafif katman: puansiz, tekrarlanabilir, ilerlemeye/ustaliga/kapiya YAZMAZ (ogr_deneme'ye insert yok).
-- Cevap anahtari yine ogr_cevap_anahtari'nda (hedef 'bolum:<yol>:<n>:bilgi', varyant 'v1'); istemciye anahtar inmez,
-- yalniz sorulan sorunun anlik geri bildirimi (dogru mu, dogru sik, why/whyNot) doner. Ders sinavi anahtarlari bu islevle SORGULANAMAZ (hedef deseni).
-- Sozdizimi bir Postgres sunucusunda calistirilmadi; once staging'de denenmeli.
create or replace function public.ogr_bilgi_kontrol(p_hedef text, p_soru_id text, p_cevap text)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  a public.ogr_cevap_anahtari%rowtype;
begin
  if auth.uid() is null then raise exception 'oturum gerekli' using errcode = '28000'; end if;
  if p_hedef is null or p_hedef !~ '^bolum:[a-z]+:[0-9]+:bilgi$' then raise exception 'bilinmeyen hedef' using errcode = '22023'; end if;
  if p_soru_id is null or p_cevap is null or length(p_cevap) > 500 then raise exception 'gecersiz cevap' using errcode = '22023'; end if;
  select * into a from public.ogr_cevap_anahtari where hedef = p_hedef and varyant = 'v1' and soru_id = p_soru_id;
  if not found then raise exception 'bu hedef icin soru yok' using errcode = '22023'; end if;
  return jsonb_build_object('ok', p_cevap = a.dogru, 'dogru', a.dogru) || coalesce(a.aciklama, '{}'::jsonb);
end;
$$;
revoke all on function public.ogr_bilgi_kontrol(text, text, text) from public, anon;
grant execute on function public.ogr_bilgi_kontrol(text, text, text) to authenticated;

-- Geri alma: drop function if exists public.ogr_bilgi_kontrol(text, text, text);   (anahtar satirlari ayri; hedef 'bolum:%:bilgi')

-- Faz 12 V5: guvenlik sertlestirme (get_advisors bulgulari). UYGULANMADI; uygulamadan once begin; ...; rollback; ile denenmeli.
-- Yalniz revoke execute ve alter function ... set search_path. Tablo, veri, politika, drop/delete YOK.
-- Tetikleyici / olay fonksiyonlari RPC ile cagrilmamali; tetikleyici calismaya devam eder (cagiran rol tablo/olay sahibidir, EXECUTE yetkisi gerekmez).
-- DEGISMEYENLER (tasarim geregi): rapor_gor (belirteclu paylasim), ogr_deneme_gonder, ogr_kapi_degerlendir.

revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.rls_auto_enable() from public, anon, authenticated;

alter function public.rapor_paylasim_guncelle_kilidi() set search_path = public;

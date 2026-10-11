# CHANGELOG

## Faz 1B (dal: faz-1b)
- supabase-js betiği tam sürüme (`2.117.3`) sabitlendi, bütünlük (SRI) denetimi eklendi.
- `supabase/migrations/` eklendi: `docs` politikaları için yeni migration dosyası (uygulanmadı).
- Testler: `tests/make-dbg.js` (hata ayıklama kancalı `tests/page_dbg.html` üretir), `tests/kritik_akis.js` (ders, ilerleme, sınav, seri, ayar için gerçek assert'ler), eski akış testi `tests/emekli/` altına taşındı, `npm test` varsayılan zaman aşımı 90 sn.

## Faz 2A
- Test altyapısı: `package.json`, `npm test`, `tests/run-all.js`, sabit yolların göreliye çevrilmesi, `TESTING.md`.

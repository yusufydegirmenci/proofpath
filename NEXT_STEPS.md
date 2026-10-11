# NEXT_STEPS.md — kontrol noktası (2026-10-11, Faz 2A sonu)

## Durum

- Faz 1 (keşif): tamam. Kayıtlar `AUDIT.md`, `FEATURE_INVENTORY.md` (henüz izlenmiyor, commit edilmedi).
- **Faz 2A (test ağı): tamam, yerel commit'ler atıldı, push yok.** `claude-faz1`, `origin/main` @ `78dbe3e` üzerine alındı (fast-forward).
- Uygulama kodu (`index.html`, `supabase-shim.js`, `config.js`, `content/`, `supabase/`, `docs/`) **değiştirilmedi**.
- AUDIT P1-3 (boş dal) ve P1-4 (taşınamaz testler) kapandı. Ayrıntı ve gerçek sonuçlar: `TESTING.md`.

## Test taban çizgisi

`npm test -- --timeout=90`: 57 dosya → **27 GEÇTİ, 29 KALDI, 1 ZAMAN AŞIMI, 0 ÇÖKTÜ.**
Yalnız 3 test (`smoke`, `local_ai_free`, `personal_plan`) gerçekten assert eder; diğerleri çökmeden bitince "GEÇTİ" sayılır.
29 KALDI'nın 25'i `__S/__X/__store` hata ayıklama kancası yokluğundan (repoda olmayan `page_dbg.html`); 1 eski test (`h73`); 3'ü kök nedeni bilinmeyen UI başarısızlığı (`h69`, `h79`, `t58g`). `mobil.js` 90 sn'yi aşıyor.

## Sıradaki öneri (onay bekliyor)

1. **Faz 2B — hata ayıklama kancası:** `index.html`'e `?debug` ile açılan `__S`/`__X` kancası ekle (uygulama koduna dokunur, onay gerekir) → 25 test çalışır hâle gelir. Alternatif: testleri kamusal DOM'a taşı.
2. `h69`, `h79`, `t58g` kök neden analizi (test mi uygulama mı eski); `h73`'ü güncelle ya da kaldır (karar sizin).
3. Yalnız-yazdıran testlere assert ekle (en değerli 5–10 tanesi: puan/XP, lig, sınav).
4. `AUDIT.md` P1-1/P1-2 (RLS), P1-5 (CDN SRI), P1-6 (kaynak ıraksaması), P1-7 (son-yazan-kazanır): sırayla, canlı Supabase'e dokunan her şey onaydan sonra.

## Kullanıcıdan gerekenler

- Faz 2B için `index.html`'e debug kancası eklemeye izin.
- `h73` (eski akış): silinsin mi, güncellensin mi?
- Supabase test hesabı veya panel erişimi (RLS doğrulaması için) hâlâ yok.

## Not

`AUDIT.md`, `FEATURE_INVENTORY.md`, `PROOFPATH_MASTER.md` izlenmeyen dosyalar olarak duruyor; commit edilip edilmeyeceği sizin kararınız.

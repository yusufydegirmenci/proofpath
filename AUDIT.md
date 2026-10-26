# AUDIT.md — Faz 1 (Discovery), salt-okunur denetim

Tarih: 2026-10-11 · Kapsam: **kod değiştirilmedi**, push/deploy yok. Denetlenen: `origin/main` @ `78dbe3e` (46 commit), geçici kopyada incelendi.
Etiketler: **[DOĞRULANDI]** kodda/çalıştırmada görüldü · **[VARSAYIM]** koddan çıkarım, çalıştırılmadı · **[TEST EDİLEMEDİ]** erişim/ortam yok.

## 0. Önce bilinmesi gereken: yerel dal boş

- **[DOĞRULANDI]** Yerel `claude-faz1` dalı `fe317e1` ("Initial commit") üzerinde; çalışma ağacında yalnız `.gitattributes`, `PROOFPATH_MASTER.md`, `.omc/` var. **Uygulama kodu yok.**
- **[DOĞRULANDI]** Gerçek kod `origin/main`'de (46 commit; yerel dal ona 45 commit geride, `fe317e1` onun atası → temiz fast-forward/rebase mümkün).
- **[DOĞRULANDI]** Canlı site (`yusufydegirmenci.github.io/proofpath/`) HTTP 200, `index.html` içeriği `origin/main` HEAD ile aynı (CRLF farkı hariç); `config.js`, `content/lessons/*.js` 200.
- Sonuç: Faz 2'den önce `claude-faz1` dalı `origin/main` üzerine alınmalı (bu turda yapılmadı).

## 1. Sistem özeti

| Konu | Bulgu | Durum |
|---|---|---|
| Mimari | Tek dosya `index.html` (2,0 MB, 8975 satır; 18 satır >3000 karakter), bağımlılıksız vanilla JS/CSS. Ders içeriği ayrı `content/lessons/*.js` (`window.PP_LESSONS`) | DOĞRULANDI |
| Çalışma modları | (a) Claude Artifact (`window.claude.db`), (b) web: `supabase-shim.js` `window.claude`'u Supabase üzerinde taklit eder; `window.claude` varsa shim devre dışı | DOĞRULANDI |
| Veri | Tek tablo `public.docs(path PK, coll, doc_id, owner, data jsonb)` + `profiles`. Şema `supabase/schema.sql`, belgeler `docs/VERI_SEMASI.md` | DOĞRULANDI |
| Kimlik | Supabase Auth e-posta/şifre, şifre sıfırlama, istemci tarafı min 8 karakter | DOĞRULANDI (kod) |
| Dağıtım | GitHub Pages, `main`'den; CI/workflow yok (`.github` yok), `package.json` yok | DOĞRULANDI |
| Yapay zekâ | Web sürümünde AI çağrısı yok; `content/local-engine.js` (210 satır) kural tabanlı; koç/Müdür görevleri yalnız Artifact tarafında zamanlanmış görev | DOĞRULANDI (kod) |
| İçerik | 4 ders için sabit içerik: ccna 17, eng 11, sec 34, bk 38 = **100 ders**. 70 animasyon sahnesi (7 dosya). dev/net/qa için sabit ders dosyası yok | DOĞRULANDI |
| Çevrimdışı/PWA | `manifest`, service worker yok | DOĞRULANDI |
| Dış bağımlılık | `cdn.jsdelivr.net/npm/@supabase/supabase-js@2` (sürüm sabit değil, SRI yok), Google Fonts | DOĞRULANDI |

## 2. Taban çizgisi (baseline) — gerçekten çalıştırıldı

Ortam: Node 22.14, Playwright (geçici kopyada kuruldu; proje dizinine dokunulmadı), `file://` + sahte `window.claude` (`tests/stub.js`).

- `tests/smoke.js`: **GEÇTİ** — 15 sekme × (400 px koyu, 1100 px açık) = 30 kombinasyon, sayfa hatası/yatay taşma yok. DOĞRULANDI
- `tests/local_ai_free.js`, `tests/personal_plan.js`: çalıştı, beklenen çıktıyı verdi. DOĞRULANDI
- `tests/mobil.js`: 90 sn zaman aşımında çıktı vermedi → sonuç **bilinmiyor**. TEST EDİLEMEDİ
- Kalan **51 test** (`h*.js`, `t5*.js`, `t6*.js`, …) çökerek bitti. Örneklenen 3'ünde (h39, h85, fb) neden: `Cannot find module '…/repo/tests/stub.js'`. 53/58 test dosyasında `/repo/` veya `/tmp/claude…` sabit yolu var. Diğer 48'in çökme nedeni tek tek incelenmedi → VARSAYIM (aynı neden).
- Gerçek Supabase'e karşı hiçbir test yok; RLS, kayıt/giriş, çok cihaz senkronu çalıştırılmadı. TEST EDİLEMEDİ
- Gerçek telefon, Firefox, ekran okuyucu: test edilmedi (`docs/UX_ANALIZ.md` de aynısını söylüyor).

## 3. Bulgular

### P0 — kritik
Doğrulanmış P0 **yok**. P1-1 canlı veritabanında istismar edilebilirse P0'a yükselebilir.

### P1 — yüksek

| # | Bulgu | Kanıt | Etiket |
|---|---|---|---|
| P1-1 | **RLS: `coll` yola bağlı değil.** `docs_insert/update` yalnız `path` önekini veya (`coll in (league,cheers)` ve `doc_id=uid`) koşulunu kontrol eder; `coll` alanının `path` ile tutarlılığı doğrulanmaz. Kullanıcı `path='data/users/<uid>/x', coll='league'` (veya `jobpool`, `gazete`, `league_notes`) ile satır ekleyip `docs_select`'in herkese açtığı paylaşılan koleksiyonlara sahte kayıt sokabilir. İstemci bu koleksiyonları `eq('coll', …)` ile çeker. | `supabase/schema.sql` policy'leri; `supabase-shim.js:fetchColl` | Politika DOĞRULANDI; istismar canlıda TEST EDİLEMEDİ |
| P1-2 | **Lig herkese açık okunur, içerik serbest.** `league/<uid>` (gün kayıtları, `miss` yanlış listesi) tüm giriş yapmışlara okunur; yalnız sahibine yazılır ama şeması sunucuda doğrulanmaz (jsonb, 900 KB sınırı). Sahte puan/XP yazmak serbest; "yanlışlarım" başkalarına görünür (gizlilik). | schema.sql `docs_select`, `docs/VERI_SEMASI.md` | DOĞRULANDI (politika) |
| P1-3 | **Yerel dal boş / yanlış taban.** Faz 2 öncesi `claude-faz1`, `origin/main`'e alınmazsa tüm iş boş ağaçta başlar. | `git log`, `git ls-files` | DOĞRULANDI |
| P1-4 | **Test paketi taşınamaz ve kırık.** 51/55 çalıştırılan test çöküyor (sabit `/repo/…` yolları), CI yok, `package.json` yok → regresyon güvencesi fiilen yalnız `smoke.js`. Refaktör (Faz 2) bu güvence olmadan riskli. | test çıktısı, `grep` | DOĞRULANDI |
| P1-5 | **Tedarik zinciri: SRI'siz, sürümsüz CDN betiği** (`supabase-js@2`) kimlik doğrulama sayfasında çalışır; jsdelivr ele geçirilirse oturum/token çalınabilir. | `index.html:844` | DOĞRULANDI |
| P1-6 | **Kaynak/derleme kopyası ıraksıyor.** `content/akademi.src.html` (2,0 MB) ile `index.html` 437 satır farklı; üretim betiği `content/konu_ekleri.py` repoda olmayan `ccna` modülünü import ediyor (`from ccna import T`) → içerik üretim hattı yeniden üretilemez; hangisinin "kaynak" olduğu belirsiz. | `diff`, `konu_ekleri.py:2`, `ccna.py` yok | DOĞRULANDI |
| P1-7 | **Çok cihaz / eşzamanlı yazma: son yazan kazanır.** `write()` belgenin tamamını istemci önbelleğiyle birleştirip `upsert` eder; sürüm/`updated_at` karşılaştırması yok. İki cihazda aynı belge (`progress`, `projects`) düzenlenirse veri kaybı olabilir. Her 45 sn koleksiyonun tamamı yeniden çekilir. | `supabase-shim.js:write, refreshAll` | Kod DOĞRULANDI; davranış TEST EDİLEMEDİ |

### P2 — orta (yalnız liste, düzeltme yok)

- Koleksiyon çekimi sayfalı ama **10 000 satırda sessizce kesilir** (`out.length < 10000`). DOĞRULANDI (kod)
- `league_notes`, `jobpool`, `gazete` için INSERT/UPDATE politikası yok; web modunda yalnız okunabilir, yazıcı Artifact koçudur → **web sürümünde bu özellikler boş/ölü olabilir**. VARSAYIM (UI'da çalıştırılmadı)
- `Çıkış` düğmesi `confirm()` kullanıyor (bloklayıcı diyalog). DOĞRULANDI (kod)
- `index.html` 2 MB tek dosya: ilk yükleme/ayrıştırma maliyeti, inceleme zorluğu. Lighthouse ölçülmedi. TEST EDİLEMEDİ
- `localStorage` 67 kullanım (misafir modu vb.): sürüm/migrasyon stratejisi yok. VARSAYIM
- Sunucu tarafı şifre kuralı, e-posta onayı, rate-limit, Supabase Auth ayarları görülemedi. TEST EDİLEMEDİ
- `.omc/` izlenmeyen ve `.gitignore`'da yok (yerel ortam durumu commit'e sızabilir). DOĞRULANDI
- README "Bilinen sınırlar": 172 soru AI incelemesinden geçti, insan uzman yok → master prompt §19 ile çelişen içerik güvence boşluğu. DOĞRULANDI (README)

### Olumlu (doğrulanmış)

- Arayüz `h()` hiper-betik yardımcısı ve `textContent` ile kuruluyor; `index.html`'de yalnız 3 `innerHTML` var (SVG/statik). `eval`/`new Function`/`document.write` yok → XSS yüzeyi düşük görünüyor (kullanıcı verisi akışı tam izlenmedi: VARSAYIM).
- Anahtar `sb_publishable_…` (herkese açık tür); repoda `service_role`/secret anahtarı **bulunmadı** (`index.html`, `supabase-shim.js`, `config.js` tarandı).
- RLS açık; `docs` için kullanıcı-yolu izolasyonu ve `profiles` güncelleme kısıtı doğru görünüyor.

## 4. Master prompt boşlukları (kısa; ayrıntı FEATURE_INVENTORY.md'de)

Önkoşul/bilgi grafiği, Veri Analitiği yolu (0 eşleşme), PWA/çevrimdışı, Dijital Öğrenme İkizi, gerçek akran değerlendirme, işveren raporu, ARCHITECTURE/SECURITY/TESTING/DATA_MODEL belgeleri → **MISSING / PARTIAL**.

# FEATURE_INVENTORY.md — Faz 1 (2026-10-11)

Kaynak: `origin/main` @ `78dbe3e`. Biçim: Gereksinim → Mevcut → Dosyalar → Boşluk → Kanıt → Durum.
**Kanıt düzeyi:** `kod` = dosyada görüldü, `çalıştı` = testte çalıştırıldı, `anahtar` = yalnız kelime eşleşmesi (zayıf kanıt, doğrulanmadı).
Durum: EXISTS AND VERIFIED · EXISTS — NEEDS IMPROVEMENT · PARTIALLY IMPLEMENTED · MISSING · IMPLEMENTED — NOT VERIFIED · BLOCKED · REGRESSION FOUND

## A. Çalışan çekirdek (mevcut uygulama)

| Özellik | Mevcut | Dosyalar | Boşluk | Kanıt | Durum |
|---|---|---|---|---|---|
| 15 sekmeli arayüz (Bugün, Ders, Sınıf, Şehir, Ofis, Oku, Masa, Lig, Mülakat, Proje, Sözlük, Rehber, Ayar, Sayılar, Ödüller) | Açılıyor, hata/taşma yok (400 px koyu, 1100 px açık) | `index.html` | Gerçek cihaz/Firefox yok | `smoke.js` çalıştı | EXISTS AND VERIFIED (sahte veriyle) |
| Giriş / kayıt / şifre sıfırlama | E-posta+şifre, Supabase Auth | `supabase-shim.js` | Gerçek hesapla denenmedi; sunucu ayarları görülemedi | kod | IMPLEMENTED — NOT VERIFIED |
| Veri katmanı (Artifact `db` ↔ Supabase) | `window.claude` taklidi, `docs` tablosu, RLS | `supabase-shim.js`, `supabase/schema.sql` | RLS `coll` açığı (AUDIT P1-1), son-yazan-kazanır (P1-7) | kod | EXISTS — NEEDS IMPROVEMENT |
| Misafir modu | `window.__guest`, localStorage | `index.html` | Veri taşıma/silme akışı doğrulanmadı | anahtar, `t61c_guest.js` (çalıştırılamadı) | IMPLEMENTED — NOT VERIFIED |
| Sabit ders kütüphanesi | ccna 17, eng 11, sec 34, bk 38 (=100) | `content/lessons/*.js` | dev/net/qa için sabit ders yok; içerik uzman onaylı değil | kod, ders sayımı çalıştı | EXISTS — NEEDS IMPROVEMENT |
| Animasyon Atölyesi | 70 sahne, 7 dosya | `content/nwscenes/*.json`, `content/nwengine.js` | Etkileşim derinliği ölçülmedi | sayım çalıştı | EXISTS AND VERIFIED (varlık) |
| Mini sınav / Lig (günlük 8 soru + tekrar) | Dersten soru üretimi, yanlış tekrarı, kartın arkası açıklaması | `index.html`, `docs/qb_*.js` | Lig verisi herkese açık (P1-2) | kod, `anahtar` | IMPLEMENTED — NOT VERIFIED |
| Oyunlar (Ağ Koşusu, Fetih, Günün meydanı) | Mevcut | `index.html` | Denge testleri çökük (`t57f`, `t58f`) | kod | IMPLEMENTED — NOT VERIFIED |
| Proje Atölyesi + 9 Yetkinlik Yolu | Siber, QA, backend × 3 seviye; adım: Öğren/Yap/Kanıt | `docs/projects*.js`, `docs/proj_*4.js` | Kanıt dosya/URL doğrulaması yok | kod | EXISTS — NEEDS IMPROVEMENT |
| Mülakat Antrenmanı | Mevcut | `index.html` | AI mülakatçı yok (yerel kural) | kod | EXISTS — NEEDS IMPROVEMENT |
| Sözlük, Rehber, Kavram Atlası | Mevcut | `index.html`, `docs/atlas_*.js` | — | kod | IMPLEMENTED — NOT VERIFIED |
| Erişilebilirlik (Rahat okuma, Sade mod, yüksek kontrast, tempo) | Mevcut | `index.html`, `docs/UX_ANALIZ.md` | Ekran okuyucu, gerçek kullanıcı yok | kod | EXISTS — NEEDS IMPROVEMENT |
| Yapay zekâsız yerel geri bildirim, kişisel plan | Kural tabanlı | `content/local-engine.js`, `content/personal.js`, `content/tickets.js` | Zayıf nokta modeli basit | `local_ai_free.js`, `personal_plan.js` çalıştı | EXISTS AND VERIFIED (çıktı üretiyor) |
| Koç / Müdür günlük görevleri | Artifact tarafında zamanlanmış görev; komutlar repoda | `content/coach/*.txt` | Web sürümünde çalışmaz; çalışması bu repodan doğrulanamaz | kod | BLOCKED (Artifact ortamı) |
| Dağıtım | GitHub Pages, canlı = `main` HEAD | — | CI, sürümleme yok | curl, diff | EXISTS AND VERIFIED |

## B. Master prompt yetenekleri (§8–§16) ve mevcut karşılıkları

| Master § | Gereksinim | Mevcutla eşleşme | Kanıt | Durum |
|---|---|---|---|---|
| 6 / 8.1 | Yetkinlik grafiği, önkoşul zekâsı | Yok (önkoşul/önkoşul-benzeri 0 eşleşme); dersler konu numarasıyla doğrusal | anahtar (0) | MISSING |
| 8.2 | Oynanabilir teknik dünya / gerçek lab | Animasyon sahneleri + Şehir/Ofis/Masa sekmeleri; gerçek lab yürütme yok | kod (kısmi) | PARTIALLY IMPLEMENTED |
| 8.3 | Olay müdahale simülasyonu | `tickets.js` (hazır ticket seti), Masa sekmesi | kod | PARTIALLY IMPLEMENTED |
| 8.4 | Aralıklı tekrar | Yanlış tekrarı (günde ≤2), Lig tekrar kuyruğu; zamanlama modeli (SM-2/Leitner) doğrulanmadı | anahtar | PARTIALLY IMPLEMENTED |
| 8.5 | Uyarlanabilir anlatım modları | Sade mod/tempo var; içerik düzeyi modları doğrulanmadı | kod | PARTIALLY IMPLEMENTED |
| 8.6 | Proje, portföy, kanıt | Proje Atölyesi (adım+kanıt+not); portföy çıktısı doğrulanmadı | kod | PARTIALLY IMPLEMENTED |
| 8.7 | Teknik mülakatçı, proje savunması | Mülakat Antrenmanı (yerel); savunma akışı yok | kod | PARTIALLY IMPLEMENTED |
| 8.8 | Dijital Öğrenme İkizi | `personal.js` kişisel plan; kanıta dayalı öğrenen modeli yok | kod | PARTIALLY IMPLEMENTED |
| 8.9 | Çok cihaz + çevrimdışı | Supabase senkronu var; manifest/service worker yok | kod | PARTIALLY IMPLEMENTED (offline MISSING) |
| 8.10 | Güven/Şeffaflık Merkezi | Gizlilik/silme kelime eşleşmesi var, ayrı merkez doğrulanmadı | anahtar | IMPLEMENTED — NOT VERIFIED |
| 9 | Kişisel AI koç | Artifact koç görevleri + yerel kural motoru; web'de AI yok | kod | PARTIALLY IMPLEMENTED |
| 10 | Hata/toparlanma günlüğü | `mistakes`, `miss`, `audit` koleksiyonları | kod (`VERI_SEMASI.md`) | PARTIALLY IMPLEMENTED |
| 11 | Değerlendirme, iyileştirme, dürüstlük | Seviye sınavı, mini sınav; bütünlük önlemleri doğrulanmadı | anahtar | IMPLEMENTED — NOT VERIFIED |
| 12 | Yetkinlik raporu, işveren hazırlığı | `reports`, `exams`, sertifika kelimeleri; doğrulanabilir rapor yok | anahtar | IMPLEMENTED — NOT VERIFIED |
| 13 | Akran değerlendirme | Lig, destekler (`cheers`), `audit_votes`; yapılandırılmış inceleme doğrulanmadı | kod (şema) | PARTIALLY IMPLEMENTED |
| 14 | Alan bazlı yollar + lab | 9 Yetkinlik Yolu | kod | PARTIALLY IMPLEMENTED |
| 15 | Veri Analitiği yolu | 0 eşleşme (index, content, docs) | anahtar (0) | MISSING |
| 16 | Uyarlanabilir çalışma planı | `personal.js`, `days`, `exams`, Sınav Haritası | `personal_plan.js` çalıştı | EXISTS — NEEDS IMPROVEMENT |
| 17 | Veri bütünlüğü, güvenlik, gizlilik | RLS var; açıklar AUDIT P1-1/2/5/7 | kod | EXISTS — NEEDS IMPROVEMENT |
| 20 | Test stratejisi | 58 Playwright dosyası, 3 çalıştı, 51 çöktü, CI yok | çalıştı | REGRESSION FOUND (test altyapısı) |
| 2.2 | Mühendislik kayıtları | Yalnız README + docs/*.md; ARCHITECTURE, SECURITY, TESTING, DATA_MODEL, ROADMAP, CHANGELOG yok | `ls` | MISSING |
| 3 | `index.html` kademeli bölünmesi | Ders içeriği çıkarıldı; 2 MB çekirdek hâlâ tek dosya | `wc` | PARTIALLY IMPLEMENTED |

Not: "anahtar" kanıtlı satırlar bilerek zayıf bırakıldı; Faz 3+ başlamadan ilgili kod yolu tek tek açılıp doğrulanmalı.

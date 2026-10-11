# TESTING.md

Son çalıştırma: 2026-10-11 (Faz 4), Windows 11, Node 22.14, Playwright 1.64 (Chromium), `file://` + sahte `window.claude` (`tests/stub.js`).

## Komutlar

```bash
npm install
npx playwright install chromium
npm run test:smoke                  # tests/smoke.js — 15 sekme × 2 tema, ~1 dk
node tests/kritik_akis.js           # gerçek assert'li 5 kritik akış (18 kontrol), hata → çıkış 1
npm test                            # tests/run-all.js — hepsi sırayla; önce tests/make-dbg.js; dosya başına 420 sn zaman aşımı
npm test -- --timeout=90 smoke      # zaman aşımını değiştir / dosya adına göre süz
```

`run-all.js` durumları: **GEÇTİ** (çıkış 0) · **KALDI** (çıkış ≠ 0) · **ZAMAN AŞIMI** · **ÇÖKTÜ** (test hiç başlayamadı). Her test geçici bir klasörde çalışır; ayrıntılı loglar koşu sonunda yazdırılan klasördedir. Tam koşu yaklaşık 35–45 dk sürer (en yavaş: `mobil` ~280 sn, `t57a` ~175 sn, `h85` ~110 sn).

## Hata ayıklama sayfası (`tests/make-dbg.js`)

Uygulama artık tek bir sarmalayıcı işlev değil, küresel kapsamda sırayla yüklenen betiklerden oluşur (`index.html` → `js/`). `make-dbg.js`, `index.html`'den `tests/page_dbg.html` üretir (git'e girmez): `<script src>` ve `<link href>` yollarını `../` ile düzeltir ve `</body>` öncesine ayrı bir betik ekler. Bu betik `window.__S` (durum) ve `window.__X` (iç yardımcılar) tanımlar. Eski test adları (`ST`, `QBX`, `tf`, `cl`) yeni sembollere bağlanır (`STARTER`, `QB`, `tmFor`, `cleanLesson`); `NW_RX`, `baseQuiz`, `nwFor`, `nwFuzzy` eklendi. Yapı değişse de hook uygulama betiklerine dokunmaz.

## Faz 4 testleri

| Dosya | İçerik | Kontrol |
|---|---|---|
| `tests/hesaplar.js` | Faz 3 sabitleri + tek tanıma taşıma; davranışı değişen 3 beklenen değer gerekçesiyle güncellendi (tamamlanan ders sayısı birleşim; mini sınav %80 kapısı), yeni: aynı kimlik bir kez sayılır, 3/5 açmaz 4/5 açar, eski "q" geçerli, `plOffset` bantları | 75 |
| `tests/ogrenme.js` | + §15–20: ilerleme/ustalık/seri tek tanımları, mini sınav kapısı, telafi metni, aralıklı tekrar planı (başarısızlık → telafi; tamamlanan tekrar planı değiştirir; başarısız öğe geri gelir; kalıcı), açıklama modları ve kalıcı tercih, `depo.sifirla` | 156 |
| `tests/ogrenme_tarayici.js` | "q yanlışla da açılır" kontrolü kapı davranışına göre sıkılaştırıldı | 34 |
| `tests/faz4_entegrasyon.js` (yeni) | gerçek uygulamada: başarısız mini sınav → kapı kapalı + telafi + "Yeniden dene" → geçiş, sıradaki ders kilidi kapıya bağlı, Bugün tekrar kuyruğu, açıklama modu tercihi yenilemede kalıcı, "Tümünü sıfırla" `ya_pp_ogr`, proje/mülakat/akran/olay simülasyonu denetim testleri | 26 |
| `tests/t57b_mynotes.js` | ekran görüntüsünden önce elemanın kararlı olması beklenir (aynı DOM düğümü 400 ms); yalnız "not attached" hatasında yeniden dener; assert değişmedi | — |

Sonuç (`npm test`, 420 sn zaman aşımı, `79598cd` + `plOffset` değişikliği koşu sırasında çalışma kopyasında): **GEÇTİ 62 · KALDI 0 · ZAMAN AŞIMI 0 · ÇÖKTÜ 0** (toplam 62; testlerin süre toplamı 1882 sn). `t57b` ve `h72` bu koşuda geçti.

## Faz 3 testleri

| Dosya | İçerik | Kontrol |
|---|---|---|
| `tests/sira.js` | acorn ile yükleme sırası: yükleme anında çalışan kod sonraki betikte bildirilen ada başvurursa KALDI; kendi öz-sınaması var | 88 betik, sorun 0 |
| `tests/hesaplar.js` | mevcut XP / seri / rütbe / seviye / mini sınav / soru bankası / işe hazırlık hesaplarını sabitler (beklenen değerler elle hesaplı) | 71 |
| `tests/ogrenme.js` | model birimi (Node, tarayıcısız): puan, %80 eşik, kritik hedef, kapı nedenleri, telafi, varyant, aktarım, depo, eski veri dönüştürücü | 121 |
| `tests/ogrenme_tarayici.js` | gerçek uygulamada bağlama: grafik, eski kayıtların değişmemesi, deneme kaydı + yenileme, panel | 34 |

Sonuç (`npm test`, 420 sn, `b6d0ed2`): **GEÇTİ 60 · KALDI 1 · ZAMAN AŞIMI 0 · ÇÖKTÜ 0** (toplam 61; 57 eski + 4 yeni). KALDI: `t57b_mynotes` — `locator.screenshot: Element is not attached to the DOM` (ekran görüntüsü yarışı, assert değil); tek başına 3/3 geçti, Faz 2B tabanında (`741c32c`) da 3 koşuda 1 kez aynı şekilde düştü, yani Faz 3 kaynaklı değil. `h72` bu koşuda KALDI vermedi.

## Faz 2B sonuçları

| Koşu | Commit | GEÇTİ | KALDI | ZAMAN AŞIMI | ÇÖKTÜ |
|---|---|---|---|---|---|
| Faz 1B (90 sn) | `236b38a` | 40 | 12 | 4 | 0 |
| Faz 2B taban (bayat testler güncellendi, 90 sn) | `602d0a5` | 51 | 1 (`t58a`) | 5 | 0 |
| Aynı taban, yavaş 5 test 400 sn ile | `602d0a5` | 5/5 GEÇTİ (`h46` 94 sn, `h85` 110 sn, `mobil` 283 sn, `soak` 95 sn, `t57a` 174 sn) | — | — | — |
| Birim çıkarımı ortası (varsayılan 420 sn) | `5d52ce0` | 56 | 1 (`t58a`) | 0 | 0 |
| Birim çıkarımı ortası | `3087c1f` | 57 | 0 | 0 | 0 |
| Birim çıkarımı ortası | `7b54e97` | 57 | 0 | 0 | 0 |
| Birim çıkarımı bitti | `d4a1bae` | 57 | 0 | 0 | 0 |
| **Son durum** (yorum satırları geri konduktan sonra) | `97351ae` | **57** | **0** | **0** | **0** |

Emekli (`tests/emekli/h73.js`) sayıma dahil değil. `t58a_ders_odasi` iki koşuda ekran görüntüsü alırken öğe yeniden çizildiği için düştü (yalnız `screenshot`, assert değil); ekran görüntüsü hata vermez hâle getirildi, sonraki koşularda geçti.

Birimler çıkarılırken her birimden sonra: `smoke`, `kritik_akis` ve birimle ilgili birkaç test; tam koşu yalnızca yukarıdaki noktalarda (bir önceki snapshot'a karşı) yapıldı.

## Bayat testler (Faz 2B'de güncellendi, assert gevşetilmedi)

- `h69`: ikinci CCNA dersi için ilk ders önce tamamlanmış sayılır (`ya_lc` tohumu); `Henüz ticket yok.` metni güncellendi.
- `h79`: yeni Ders Odası akışı (Isınma → "Okudum, mini sınava geç" → mini sınavın tüm soruları); artık gerçek bir kontrol var (ders tamamlandı + ikinci ders görünür, değilse çıkış 1).
- `t57g`, `t58g`: Fetih'te yardım katmanı kapatılır ve "Seferi başlat" basılır (kök neden: sefer öncesi hazırlık ekranı; **uygulama hatası değil**).
- `t59a`: sahne kimliği `hash` → `sc-hash` (takma ad artık ekran akışında kullanılmıyor).
- `h85`, `q2`, `t60b`, `t61b`, `tmcov`, `nwmap`: `make-dbg` yeni sembollere bağlandı, test kodu değişmedi.

## Hâlâ doğrulama yapmayan testler

`smoke`, `kritik_akis`, `personal_plan`, `local_ai_free` ile `h79` dışında çoğu test sonuçları yazdırır ve yalnız çökmezse GEÇTİ sayılır. Örnek: `t57g` içindeki `ask shown` ve `h69` içindeki `masa txt` / `ders empty text` yazdırır ama kontrol etmez (ikisi şu an `false` yazıyor; ilgili ekran metinleri/akış değişti, kontrol eklenmedi). `h72` bir kez birim kapısında KALDI verdi, 11 yeniden koşuda geçti (kök neden bilinmiyor; rastgele içerik ve yük şüphesi, varsayım).

## Kapsam boşlukları

- Gerçek Supabase, RLS, kayıt/giriş, çok cihaz senkronu: **hiç test yok** (kural gereği bağlanılmadı).
- Gerçek telefon, Firefox/Safari, ekran okuyucu: yok. Yalnız Chromium emülasyonu.
- Erişilebilirlik ve performans (Lighthouse) ölçümü yok. İlk yükleme artık ~90 ayrı betik/stil isteği; ölçülmedi.
- CI yok; testler yalnız elle çalışır.

## Faz 5 tur 1
- `node tests/faz5_net.js`: alt ağ hesabı (bağımsız sabit değerlerle), ders eki bloklarının görünmesi, kaynak bağlantıları, lab doğrula/yanlış/ipucu/sıfırla/kanıt, ek olmayan derste etki yok, 390 px taşma. Sonuç: GEÇTİ. smoke, sira, kritik_akis, hesaplar 75, ogrenme 156, ogrenme_tarayici 34, faz4_entegrasyon 26, mobil (135 bakış, 0 sorun) geçti.

## Faz 6
- `node tests/faz6_koc.js`: veri yokken öneri yok, kayıttan öneri + dayanak, gezinme doğrulaması, tercih kalıcılığı ve onaylı sıfırlama, ustalık/kanıt yazamama (kayıt değişmez), sahte sağlayıcı (hata, senkron hata, boş, zaman aşımı, kayıtsız), cevap alanlarının bağlamdan çıkarılması, korumalı değerlendirmede sağlayıcı çağrılmaması, arayüz soru-cevap, 390 px. Sonuç: GEÇTİ. Gerçek sağlayıcı ile test edilmedi.

## Faz 7
- `node tests/faz7_plan.js`: plan günleri/kapasite/tampon/sıra (elle hesaplı), değişime tepki (dakika, tamamlanan konu, tekrar), kaçırılan gün (3/1/0 kaçırma, yumuşak başlangıç, müsaitsiz gün), tercih doğrulama, boş durum, alternatif takvimler, ikiz (güçlü/zayıf/belirsiz/öz-beyan/veri yok), arayüz kalıcılığı, 390 px. Sonuç: GEÇTİ. Gerçek kullanıcı süre verisiyle doğrulanmadı (süreler varsayım).

# TESTING.md

Son çalıştırma: 2026-10-11 (Faz 2B), Windows 11, Node 22.14, Playwright 1.64 (Chromium), `file://` + sahte `window.claude` (`tests/stub.js`). Hiçbir dış servise (Supabase dahil) veri bağlantısı kurulmaz; `supabase-shim.js` sahte katman varken kendini kapatır.

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

## Faz 2B sonuçları

| Koşu | Commit | GEÇTİ | KALDI | ZAMAN AŞIMI | ÇÖKTÜ |
|---|---|---|---|---|---|
| Faz 1B (90 sn) | `236b38a` | 40 | 12 | 4 | 0 |
| Faz 2B taban (bayat testler güncellendi, 90 sn) | `602d0a5` | 51 | 1 (`t58a`) | 5 | 0 |
| Aynı taban, yavaş 5 test 400 sn ile | `602d0a5` | 5/5 GEÇTİ (`h46` 94 sn, `h85` 110 sn, `mobil` 283 sn, `soak` 95 sn, `t57a` 174 sn) | — | — | — |
| Birim çıkarımı ortası (varsayılan 420 sn) | `5d52ce0` | 56 | 1 (`t58a`) | 0 | 0 |
| Birim çıkarımı ortası | `3087c1f` | 57 | 0 | 0 | 0 |
| Birim çıkarımı ortası | `7b54e97` | 57 | 0 | 0 | 0 |
| **Son durum** | `d4a1bae` | **57** | **0** | **0** | **0** |

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

# TESTING.md

Son çalıştırma: 2026-10-11, Windows 11, Node 22.14, Playwright 1.64 (Chromium 1248), `file://` + sahte `window.claude` (`tests/stub.js`). Hiçbir dış servise (Supabase dahil) veri bağlantısı kurulmaz; `supabase-shim.js` sahte katman varken kendini kapatır. (Sayfa yine de `jsdelivr`/Google Fonts'u yüklemeyi dener; bu salt-okunur CDN isteğidir.)

## Komutlar

```bash
npm install
npx playwright install chromium     # Chromium ~437 MB + headless shell ~278 MB + ffmpeg ~4 MB (disk)
npm run test:smoke                  # tests/smoke.js — 15 sekme × 2 tema, ~1 dk
npm test                            # tests/run-all.js — hepsi sırayla, dosya başına 60 sn zaman aşımı
npm test -- --timeout=90 smoke      # zaman aşımını değiştir / dosya adına göre süz
```

`run-all.js` durumları: **GEÇTİ** (çıkış 0) · **KALDI** (çıkış ≠ 0) · **ZAMAN AŞIMI** · **ÇÖKTÜ** (test hiç başlayamadı: modül/tarayıcı yok). Her test geçici bir klasörde çalışır (ekran görüntüleri oraya yazılır), ayrıntılı loglar sonda yazdırılır. Çıkış kodu: hepsi GEÇTİ ise 0.

## Gerçek sonuçlar (`npm test -- --timeout=90`, 57 dosya)

| Durum | Adet |
|---|---|
| GEÇTİ | 27 |
| KALDI | 29 |
| ZAMAN AŞIMI | 1 (`mobil.js`) |
| ÇÖKTÜ | 0 |

Varsayılan 60 sn ile (ilk koşu): GEÇTİ 23, KALDI 3, ZAMAN AŞIMI 5, ÇÖKTÜ 26 (eski sınıflama). `h39`, `h46`, `h67`, `smoke` 60 sn'ye sığmıyor, 90 sn'de bitiyor.

**Çok önemli sınırlama:** 57 dosyadan yalnızca 3'ü (`smoke.js`, `local_ai_free.js`, `personal_plan.js`) gerçekten doğrulama yapıp başarısızlıkta çıkış kodunu değiştiriyor. Diğer ~54 eski test sonuçları **ekrana yazdırır** ve çökmezse 0 döner. Onlar için GEÇTİ = "çökmeden bitti"; beklenen değer doğrulanmadı. Bu testlerin assert'lerle güçlendirilmesi ayrı bir iştir (bu turda yapılmadı).

## Düzeltilen ortam hataları (sınıf a)

- 53 dosyada `/repo/tests/stub.js` ve `/tmp/claude-0/.../page.html` mutlak yolları → `require('./stub.js')` ve `index.html`'e `__dirname` tabanlı `file://` URL'si.
- 53 dosyada `executablePath:'/opt/pw-browsers/chromium'` kaldırıldı (Playwright kendi tarayıcısını kullanır).
- `process.cwd()+'/page_dbg.html'` (21 dosya) → `index.html`. `t57a` ekran görüntüleri `os.tmpdir()`'e.
- Assert'ler, beklenen değerler ve bekleme süreleri değiştirilmedi.

## Geçmeyen testler ve sınıfları

**(a) Ortam — hâlâ engelli (25 dosya): eksik hata ayıklama kancası.** Testler sayfada `__S` (durum nesnesi) ve `__X` (iç yardımcılar) ya da `window.__store` bekler. `index.html`'de bunlar yok (`__X`, `__S`, `__store` = 0 eşleşme). Eski testler, repoda olmayan `page_dbg.html` (index.html'den üretilmiş bir hata ayıklama kopyası) ile yazılmış; üretici betik git geçmişinde de yok. Hata: `ReferenceError: __S/__X is not defined`.
`fb, h85, nwmap, q2, soak, t57a_joker_skin, t57d_vardiya, t57f_fetih_balance, t57g_fetih_ui, t58a_ders_odasi, t58f_balance, t58f_fetih_balance, t59a_nw, t59b_reset, t59c_games, t59d_fk3, t59g, t60a_tracks, t60b_cov, t60c_nw, t61b_quizalign, t61c_guest, tmcov, touch, touch2`
→ Çözüm `index.html` içine (kapsam dışı) `?debug` ile açılan bir kanca eklemeyi veya testleri kamusal DOM'a taşımayı gerektirir. Önerilen: Faz 2B.

**(b) Gerçek/şüpheli başarısızlık — uygulama bulgusu (kök neden doğrulanmadı):**
- `h69.js`: `button:text-is("Şimdi ders üret")` 30 sn bulunamadı (metin `index.html`'de 1 yerde var → koşula bağlı ya da akış değişmiş).
- `h79.js`: `button:text-is("Dersi okudum")` bulunamadı (metin `index.html`'de 3 yerde var → akış/durum koşulu).
- `t58g_fetih2.js`: `Cannot read properties of null (reading 'click')` (bir öğe yok; (a) ile bağlantılı olabilir).
- Test mi uygulama mı eski, ayırt edilmedi. Uygulama kodu değiştirilmedi.

**(c) Zaman aşımı:** `mobil.js` (3 cihaz × 3 ayar × 15 sekme = 135 yükleme) 90 sn'de bitmiyor; hiç çıktı vermiyor. Daha uzun zaman aşımıyla denenmedi.

**(d) Eski/ölü test (silinmedi):** `h73.js` — `button:text-is("Cevabımı değerlendir")` düğmesi `index.html`'de yok; `f9e0ca2` ("Yapay zekasız geri bildirim", 2026-10-10) ile kaldırılmış. Test eski akışı bekliyor; güncellenmeli ya da kaldırılmalı (karar sizde).

## Uygulama bulguları (düzeltilmedi)

1. Hata ayıklama kancaları (`__S`, `__X`, `__store`) üretim `index.html`'inde yok; 25 test bunsuz çalışamıyor.
2. `h69`, `h79`: ders akışındaki düğmeler testin beklediği koşulda görünmüyor (kök neden bilinmiyor).
3. `h73`: "Cevabımı değerlendir" kaldırıldı; test güncellenmemiş.

## Kapsam boşlukları

- Gerçek Supabase, RLS, kayıt/giriş, çok cihaz senkronu: **hiç test yok** (kural gereği bağlanılmadı).
- Gerçek telefon, Firefox/Safari, ekran okuyucu: yok. Yalnız Chromium emülasyonu.
- Erişilebilirlik ve performans (Lighthouse) ölçümü yok.
- Assert'li test yalnız 3 dosya. Veri bütünlüğü, puan/XP hesabı, lig, sınav doğruluğu için doğrulayıcı test yok.
- CI yok; testler yalnız elle çalışır.

## Faz 1B güncellemesi

- `npm test` önce `tests/make-dbg.js`'i çalıştırır: `index.html`'den `tests/page_dbg.html` üretir (`__S`, `__X` kancaları, git'e girmez). Hata ayıklama gerektiren 26 test buna yönlendirildi. Varsayılan zaman aşımı 90 sn.
- `tests/kritik_akis.js`: ders açma, ilerleme kaydı, sınav puanı, seri, ayarların kalıcılığı için gerçek assert'ler (18 kontrol, başarısızlıkta çıkış kodu 1).
- `tests/emekli/`: eski akışa ait testler (`h73`); ayrı sayılır, çıkış kodunu etkilemez.
- Son tam koşu (`npm test -- --timeout=90`, 56 dosya, `kritik_akis` hariç): GEÇTİ 40 · KALDI 12 · ZAMAN AŞIMI 4 (`h67`, `mobil`, `soak`, `t57a`) · ÇÖKTÜ 0. `kritik_akis.js` ayrıca koşuldu: 18/18 GEÇTİ.
- Kalan KALDI'lar: şu an kodda olmayan semboller (`ST`, `QBX`) veya kancalı kapsamın dışındaki sembol (`NW_RX`) bekleyen testler; `h69`, `h79` eski ders akışını bekliyor.

# Faz 2A — Test ağının onarımı (analiz notu)

Tarih: 2026-10-11 · Durum: **devam ediyor** (sonuç bölümü boş) · Başlangıç tabanı: `origin/main` @ `78dbe3e`
İlgili: [faz-1.md](faz-1.md), [master-prompt-faz-haritasi.md](master-prompt-faz-haritasi.md)

## Master prompt'taki yeri

Faz 2A, master §21'in Faz 2'sinin (modüler refaktör) bir parçası değil, onun **önkoşulu**. Master Faz 1'in iki maddesini tamamlıyor: "test taban çizgisi kur" ve `TESTING.md` kaydı (§2.2). Ayrıca §20 ("her anlamlı değişiklikten sonra test checkpoint'i") ve Faz 2'nin "her çıkarılan birimi hemen doğrula" kuralı bu ağ olmadan uygulanamaz. AUDIT P1-3 (yanlış taban) ve P1-4 (kırık testler) bu fazla kapanmalı.

## Kullanıcının verdiği prompt (özet, kural ve adımlar korunarak)

Başlık: "Proofpath Faz 2A: TEST AĞINI ONAR. Uygulama davranışını DEĞİŞTİRME." Önce NEXT_STEPS.md ve AUDIT.md (P1-3, P1-4) okunacak, keşif tekrarlanmayacak.

**Kurallar**
- Push yok, deploy yok. Supabase'e veya hiçbir dış servise bağlanma; anahtar/şifre/token isteme ve kullanma. Testler sahte (stub) veriyle çalışmalı.
- Dokunulmayacak: `index.html`, `supabase-shim.js`, `config.js`, `content/`, `supabase/`, `docs/`.
- Değişebilecekler yalnız: `tests/`, `package.json` (+ lock), `.gitignore`, `TESTING.md`, `NEXT_STEPS.md`.
- oh-my-claudecode modları (autopilot, ralph, team vb.) ve alt ajanlar yok; doğrudan çalış.
- Testleri geçirmek için assert zayıflatma, silme, atlama yok. Uygulamada hata bulunursa düzeltilmez, `TESTING.md`'ye "uygulama bulgusu" olarak yazılır.

**Adımlar**
1. `git status`; `claude-faz1` `origin/main`'in atasıysa `git fetch origin` + `git merge --ff-only origin/main`. Çakışma/hata varsa dur ve bildir. Sonra `git log --oneline -3`.
2. `.gitignore`'a `.omc/` ve `node_modules/` ekle.
3. `tests/` içindeki sabit yolları (`/repo/`, `/tmp/claude…`) say, betikle `__dirname`/`path.join` tabanlı yap; `git diff --stat` ve 3 örnek diff'i kontrol et.
4. `package.json`: devDependencies'te `playwright`; `"test"` = `tests/run-all.js` (her test sırayla, 60 sn zaman aşımı, GEÇTİ / KALDI / ZAMAN AŞIMI / ÇÖKTÜ tablosu, çıkış kodu), `"test:smoke"` = `smoke.js`.
5. `npm install`, `npx playwright install chromium`; indirme boyutunu bildir.
6. `smoke.js`, sonra `run-all` gerçekten çalıştırılıp raporlanır.
7. Geçmeyenler sınıflanır: (a) yol/ortam hatası → düzelt; (b) gerçek başarısızlık → uygulama bulgusu; (c) zaman aşımı → bildir; (d) eski/ölü test → silme, listele.
8. `TESTING.md` (komutlar, gerçek sonuçlar, kapsam boşlukları) oluştur, `NEXT_STEPS.md` güncelle.
9. Küçük yerel commitler (`chore: ...`); push yok.

Bitince istenen özet: GEÇTİ/KALDI/ZAMAN AŞIMI sayıları, `git diff --stat`, uygulama bulguları, sıradaki öneri.

## Beklenen çıktılar

- Yerel dal `origin/main` (`78dbe3e` veya daha yenisi) üzerinde; Faz 2A commit'leri onun üstünde, yalnız yerelde.
- `.gitignore`: `.omc/` eklenmiş (`node_modules/` zaten var, tekrar eklenmesi zararsız).
- `tests/*.js` içinde `/repo/`, `/tmp/claude` geçen satır kalmamış.
- `package.json`, `package-lock.json`, `tests/run-all.js` yeni.
- `TESTING.md` yeni; `NEXT_STEPS.md` Faz 2A sonunu yansıtıyor.
- Gerçek çalıştırma çıktısına dayanan sonuç tablosu.

## Bu thread'in önceden gördüğü tuzaklar (repodan doğrulandı)

Bunlar Faz 2A raporunu okurken dikkat edilecek yerler; prompt'ta adı geçmiyor.

1. **Sabit yol üç çeşit, prompt yalnız ikisini sayıyor.** `/repo/tests/stub.js` (28 yer) ve `/tmp/claude-0/.../scratchpad/repo/tests/stub.js` (25 yer) kolay. Ama 53 test ayrıca `executablePath:'/opt/pw-browsers/chromium'` kullanıyor (başka bir makinedeki tarayıcı); bu da kaldırılmazsa testler kullanıcının makinesinde çalışmaz.
2. **24 test repoda olmayan `scratchpad/page.html` dosyasını açıyor** (6'sı `#oyun` ile). Bunun `index.html`'e mi yönlendirileceği bir karar. `index.html`'e çevrilirse eski sürüm için yazılmış seçiciler tutmayabilir; bu (a) ortam mı, (d) eski test mi olarak sınıflandığına bakılmalı.
3. **57 test dosyasının yalnız 3'ü gerçek başarı/başarısızlık kodu veriyor** (`smoke`, `local_ai_free`, `personal_plan`). Kalan 54'ü ekran görüntüsü alıp konsola yazan keşif betikleri; sayfa hatalarını yalnız yazdırıyor. `run-all` bunları çıkış koduna göre değerlendirirse çoğu "GEÇTİ" görünür ama bu sadece "çökmedi" demektir. Prompt "assert zayıflatma" diyor; burada sorun tersi: zayıflatılacak assert zaten yok.
4. **Ekran görüntüleri çalışma dizinine yazılıyor** (27 test, ör. `v27-oyun-lobi-390.png`). Ya `.gitignore`'a `*.png` gibi bir kural ya da çıktı klasörü gerekir; yoksa commit'e yüzlerce PNG sızabilir.
5. **Bazı testlerin içinde 60 sn'lik döngü var** (ör. `h39.js` oyun koşusu, iki görünüm × iki kostüm). 60 sn zaman aşımında "ZAMAN AŞIMI" çıkması test hatası değil, test tasarımı.
6. `mobil.js` Faz 1'de 90 sn'de bitmedi; 60 sn sınırında yine zaman aşımı beklenir.

## Bitince kontrol listesi

| # | Kontrol | Nasıl |
|---|---|---|
| 1 | Taban doğru mu | `git log --oneline` başında `78dbe3e` atası var mı; merge `--ff-only` mi, yoksa merge commit/rebase mi yapılmış |
| 2 | Push var mı | `origin`'de yeni dal/commit yok mu (`git ls-remote` / GitHub) |
| 3 | Yasak dosyalara dokunuldu mu | `git diff --stat 78dbe3e..HEAD` yalnız `tests/`, `package.json`, `package-lock.json`, `.gitignore`, `TESTING.md`, `NEXT_STEPS.md` göstermeli |
| 4 | Testler gerçekten çalıştırıldı mı | Raporda komut + ham çıktı/tablo var mı; `npx playwright install` boyutu bildirildi mi; sayılar `run-all` tablosuyla tutuyor mu |
| 5 | Assert zayıflatıldı / test silindi mi | `git diff 78dbe3e..HEAD -- tests/` içinde silinen `process.exit`, `throw`, kontrol satırı veya silinen dosya var mı; `smoke.js`'teki `process.exit(bad?1:0)` duruyor mu |
| 6 | Sabit yol kaldı mı | `grep -rn "/repo/\|/tmp/claude\|/opt/pw-browsers" tests/` boş mu |
| 7 | `page.html` ne oldu | Hangi dosyaya yönlendirildi; o testler hangi sınıfa düştü |
| 8 | "GEÇTİ" ne anlama geliyor | Rapor 54 keşif betiğini gerçek testlerden ayırıyor mu; `TESTING.md` bunu kapsam boşluğu olarak yazıyor mu |
| 9 | Ekran görüntüleri | Commit'e PNG girmiş mi |
| 10 | Uygulama bulguları | Konsoldaki `pageerror`/taşma çıktıları "uygulama bulgusu" olarak kaydedilmiş mi |
| 11 | Kayıtlar | `TESTING.md` komutları, gerçek sonuçları ve §20.1 kapsam boşluklarını (auth, RLS, senkron, ilerleme vb. testi yok) içeriyor mu; `NEXT_STEPS.md` güncel mi |
| 12 | Kurallar | Alt ajan / omc modu kullanılmış mı; Supabase'e bağlanma girişimi var mı |

## Sonuç

_(Faz 2A bitince doldurulacak: GEÇTİ / KALDI / ZAMAN AŞIMI / ÇÖKTÜ sayıları, diff --stat, uygulama bulguları, kontrol listesi sonuçları, sonraki faz için notlar.)_

# Faz 1 — Keşif ve stabilizasyon (analiz notu)

Tarih: 2026-10-11 · Hazırlayan: proje thread'i (salt okunur inceleme; kod değiştirilmedi)
Kaynaklar: Faz 1 oturumunun çıktıları `AUDIT.md`, `FEATURE_INVENTORY.md`, `NEXT_STEPS.md` (proje klasörü kökünde) + `PROOFPATH_MASTER.md` §21 + repo `origin/main` @ `78dbe3e`.

## Kullanıcının verdiği Faz 1 prompt'u (aynen)

> PROOFPATH_MASTER.md dosyasını oku. Bu bir ana planlama belgesi.
>
> Şimdi SADECE Faz 1'i (Discovery and stabilization) yap, ama bu turda kodu DEĞİŞTİRME:
> - Repoyu, Git durumunu ve çalışan özellikleri incele.
> - Prompt'ta belirtilen AUDIT.md, FEATURE_INVENTORY.md, NEXT_STEPS.md dosyalarını oluştur.
> - Bulguları doğrulanmış / varsayım / test edilemedi diye ayır.
> - P0 ve P1 sorunlarını listele, ama düzeltme.
> - Faz 2'ye geçme, push etme, deploy etme.
>
> Bittiğinde Türkçe kısa bir özet ver: ne buldun, en riskli 5 sorun ne, sıradaki öneri ne.

Not: Bu prompt master'ın Faz 1'inin daraltılmış hali. "Kritik hataları gider" ve master'ın istediği diğer kayıtlar (ARCHITECTURE, SECURITY, TESTING, DATA_MODEL, ROADMAP, IMPLEMENTATION_STATUS) bilerek kapsam dışı bırakıldı.

## Kullanıcının aktardığı Faz 1 sonuç özeti (aynen)

> En önemli bulgu: yerel dal boş. Gerçek kod origin/main'de (46 commit), senin claude-faz1 dalın ise sadece "Initial commit" üzerinde. Daha önce git clone "klasör zaten var" hatası vermişti. O klasör boş bir repoymuş. Bu yüzden Faz 1 geçici bir kopyada çalışmış.

| Öncelik | Sorun | Ne yapmalı |
|---|---|---|
| Hemen | Yerel dal boş | origin/main'e al (adım 1) |
| P1-4 | 51 testin 51'i çöküyor (sabit /repo/ yolları), CI yok | Testleri __dirname tabanlı yap, npm test ekle. Refaktörden önce şart |
| P1-1 | RLS'te coll alanı yola bağlı değil, paylaşılan koleksiyonlara sahte kayıt girebilir | Politikaya tutarlılık koşulu. Canlı veritabanında uygulamadan önce senin onayın gerekir |
| P1-2 | Lig herkese açık, yanlış listeleri başkalarına görünüyor | Gerekli alanları açan görünüm. Gizlilik meselesi |
| P1-5 | CDN betiği sürümsüz ve SRI'siz | Sürümü sabitle, SRI ekle (küçük iş) |
| P1-6 | akademi.src.html ile index.html ıraksıyor, üretim betiği eksik modül istiyor | Hangisi kaynak, karar ver |
| P1-7 | Çok cihazda son yazan kazanır | Sadece çok cihaz kullanımı gerçekse |

> P1-1 şu an P0 değil, ama canlıda istismar edilebilirse P0 olur. Bunu Claude Code doğrulayamadı çünkü Supabase'e erişimi yok.

## Özet ile repo arasındaki çelişkiler

- **"51 testin 51'i çöküyor" yanlış ifade.** AUDIT.md'ye göre 58 dosyanın (biri `stub.js` yardımcısı) 55'i çalıştırıldı; 3'ü çalıştı (`smoke`, `local_ai_free`, `personal_plan`), `mobil.js` zaman aşımı, 51'i çöktü. Doğrusu "55 testin 51'i".
- **Sabit yol tek sorun değil (yeni bulgu, bu thread):** 53 test `executablePath:'/opt/pw-browsers/chromium'` ile başka bir makinedeki tarayıcı yolunu da sabitlemiş; 24 test repoda olmayan bir `scratchpad/page.html` dosyasını açıyor (muhtemelen o zamanki `index.html` kopyası). Yalnız `/repo/` yolunu düzeltmek bu testleri çalıştırmaya yetmez.
- **Testlerin çoğunda başarı ölçütü yok (yeni bulgu, bu thread):** 57 test dosyasından yalnız 3'ü (`smoke`, `local_ai_free`, `personal_plan`) başarısızlıkta sıfırdan farklı çıkış kodu veriyor. Kalan 54'ü ekran görüntüsü alıp konsola yazan keşif betikleri; sayfa hatalarını sadece yazdırıyorlar. Bunlar onarılsa bile "GEÇTİ" yalnız "çökmedi" anlamına gelir. AUDIT'in "regresyon güvencesi fiilen yalnız smoke.js" sonucu doğru, hatta bu nedenle daha da güçlü.
- `index.html` ile `akademi.src.html` farkı: rapor "437 satır", benim ölçümüm `diff` çıktısında 333 değişen satır. Ölçüm yöntemi farkı olabilir; sonuç (ıraksıyorlar) aynı.
- Diğer P1 iddiaları (RLS, SRI, eksik `ccna` modülü) repoyla tutarlı.

## Faz 1'in sınırı

- Master prompt §21'e göre Faz 1 = "Discovery and stabilization": repo/dağıtım/git incelemesi, özellik envanteri ve mühendislik kayıtları, test taban çizgisi, **kritik güvenlik ve veri bütünlüğü hatalarının giderilmesi**, sonraki güvenli adımın belirlenmesi.
- Faz 1 oturumu **repoya hiçbir commit atmadı**. Repodaki 46 commit'in tamamı (2026-10-08 → 2026-10-11, son `78dbe3e` "Backend/AWS dersleri 1-38") Faz 1 öncesi mevcut uygulamadır.
- Faz 1'in tek ürünü üç rapor dosyasıdır; bunlar repoda değil, yalnız proje klasöründe. Faz 1 oturumunun `claude-faz1` dalı yereldi, `origin`'e itilmemiş (origin'de yalnız `main` ve bu thread'in dalı var).

## Yapılanlar

1. Repo, canlı site ve git durumu incelendi: canlı site (GitHub Pages) = `main` HEAD; CI yok, `package.json` yok.
2. Mimari çıkarıldı: tek dosya `index.html` (2 MB, 8975 satır, vanilla JS); içerik `content/lessons/*.js`; web modunda `supabase-shim.js` Artifact `window.claude` API'sini Supabase ile taklit ediyor; tek tablo `docs` + `profiles`.
3. İçerik sayımı: 100 sabit ders (ccna 17, eng 11, sec 34, bk 38), 70 animasyon sahnesi. dev/net/qa derslerinin sabit içeriği yok.
4. Test taban çizgisi ölçüldü: 58 test dosyası; `smoke.js` geçti (15 sekme × 2 görünüm), `local_ai_free.js` ve `personal_plan.js` çalıştı, `mobil.js` zaman aşımı, **51 test çöktü** (sabit `/repo/` ve `/tmp/claude…` yolları).
5. Güvenlik denetimi: P0 yok, 7 adet P1, 8 adet P2 bulgu (ayrıntı `AUDIT.md`).
6. Master prompt gereksinimlerine karşı özellik envanteri (`FEATURE_INVENTORY.md`).
7. Faz 2 öncesi önerilen sıra ve kullanıcıdan istenenler (`NEXT_STEPS.md`).

## Bu thread'de yeniden doğrulananlar

- 58 test dosyasından 53'ünde sabit yol var (`grep`). Doğru.
- `index.html:844` sürümü sabitlenmemiş, SRI'siz `supabase-js@2` CDN betiği. Doğru.
- **RLS açığı (P1-1) gerçek:** `supabase/schema.sql` içinde `docs_select`, `coll in ('league','cheers','league_notes','jobpool','gazete')` olan her satırı tüm giriş yapmış kullanıcılara açıyor; `docs_insert/update` ise kullanıcının kendi `data/users/<uid>/` yoluna istediği `coll` değeriyle yazmasına izin veriyor. Yani herhangi bir kullanıcı ortak ilan/gazete/lig notu havuzuna sahte kayıt sokabilir. (Canlı veritabanında denenmedi.)
- `content/konu_ekleri.py` repoda olmayan `ccna` modülünü import ediyor. Doğru.
- `index.html` ile `content/akademi.src.html` farklı (8975 ve 8875 satır, diff'te 333 değişen satır; rapordaki "437 satır" farklı bir ölçüm olabilir, sonuç aynı: iki kopya ıraksıyor).

## Riskler

- **Master'ın Faz 1'i tam bitmedi (bilinçli):** master prompt Faz 1'de kritik güvenlik/veri bütünlüğü hatalarının *giderilmesini* de istiyor; kullanıcı prompt'u bu turda "düzeltme" demediği için oturum yalnız raporladı. Bu bir oturum hatası değil, ama P1-1, P1-2, P1-5, P1-7 açık duruyor ve master'ın Faz 1 kabul ölçütü ("P1'ler ya düzeltildi ya engel nedeni yazıldı") ancak bunlar sonraki fazlarda kapanınca karşılanır.
- **Regresyon güvencesi yok:** fiilen tek güvenilir test `smoke.js`. Faz 2 (monolit bölme) bu haliyle riskli.
- **Yanlış taban riski:** Faz 1 oturumunun yerel dalı boş "Initial commit" üzerindeydi. Sonraki faz `origin/main`'den başlamazsa iş boş ağaçta yapılır.
- **Çok cihaz veri kaybı:** son yazan kazanır, sürüm kontrolü yok (P1-7).
- **İçerik üretim hattı yeniden üretilemez** (P1-6) ve kaynak dosyanın hangisi olduğu belirsiz.
- Faz 1 raporları repoda değil; başka bir oturum bunları görmeyebilir.

## Eksikler (Faz 1 kapsamında olup yapılmayanlar)

- Kritik hata düzeltmeleri (RLS, SRI, test yolları) yapılmadı.
- Mühendislik kayıtları eksik: master'ın istediği `ARCHITECTURE.md`, `SECURITY.md`, `TESTING.md`, `DATA_MODEL.md`, `ROADMAP.md`, `CHANGELOG.md` oluşturulmadı.
- Gerçek Supabase ile hiçbir şey test edilmedi (giriş, RLS, senkron); panel erişimi yok.
- Kalan 48 çöken testin nedeni tek tek bakılmadı (varsayım: aynı sabit yol).
- `mobil.js` sonucu bilinmiyor; gerçek telefon/Firefox/ekran okuyucu testi yok.
- Envanterde "anahtar" kanıtlı satırlar zayıf (yalnız kelime eşleşmesi).

## Sonraki fazlar için notlar

1. Faz 2'ye başlamadan önce: dalı `origin/main` üzerine al, test yollarını `__dirname` tabanlı yap, `package.json` + `npm test` ekle, testleri yeniden ölç. (NEXT_STEPS 1-2)
2. RLS düzeltmesi: insert/update politikalarında `coll`'ün yoldan türetildiğini zorla. Canlı veritabanına uygulamak dış etkili; kullanıcı onayı gerekir.
3. `supabase-js` sürümünü sabitle + SRI ekle (küçük, hızlı kazanç).
4. `index.html` / `akademi.src.html` için tek kaynak kararı verilmeden refaktör başlamamalı.
5. Faz 1 raporlarının repoya (ör. `docs/`) commit edilmesi önerilir ki sonraki oturumlar aynı keşfi tekrarlamasın.
6. Kullanıcıdan beklenenler: Supabase panel erişimi veya test hesabı; dev/net/qa içerik önceliği; Veri Analitiği yolunun zamanı; gerçek kullanıcı verisi olup olmadığı; Artifact modu hâlâ kullanılıyor mu.
7. Toplu yeniden analizde kontrol edilecek: P1 bulgularının hangi fazda kapatıldığı ve `smoke.js` dışındaki testlerin gerçekten geçip geçmediği.

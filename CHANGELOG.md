# CHANGELOG

## Faz K11 (dal: faz-k11; migration, canlı DB, gizli anahtar, zamanlanmış iş, yeni bağımlılık yok)
- Python hattına 2 ders: 9 `try/except` (ValueError, TypeError, ZeroDivisionError, finally) ve 10 dize yöntemleri (split, join, strip, replace, find, upper/lower, format) (`content/lessons/py-3.js`). Her ders 8 soru, 4 hedef, 2 çalıştırılabilir örnek (CPython 3.12 ile doğrulandı), bozuk kodu düzeltme görevi, PP.alan alıştırması (`py-9-hatali`, `py-10-satir`; kontrol veriden hesaplanır, varyantla yeniden çalışır).
- Ders metnindeki örnek kodlar sınav sorularıyla aynı değer/ifadeyi kullanmaz (faz-k10'daki sızıntı tekrarlanmadı).
- STARTER.py ve TMAP.py 10 konuya çıktı. Sunucu tohumu: hedef metadata `supabase/seed/20261018_1_ogr_hedefler.sql` (+6 satır); cevap anahtarı yalnız özel depoda (`kayitlar/seed/ek-k7.sql`, hedef `ek-k7-hedef.sql`). UYGULANMADI.
- Test: `tests/faz_k10_py.js` 10 derse genişledi (171); sayılar güncellendi: `faz9s_tarama` (970 soru), `faz12b_geri_bildirim` (10 tarihli ders), `faz5c_net` (py 10 konu).

## Faz K10 (dal: faz-k10; migration, canlı DB, gizli anahtar, zamanlanmış iş, yeni bağımlılık yok)
- Yeni hat `py` (Python, PCEP düzeyi, ders 1-8): değişkenler ve türler, giriş-çıkış, operatörler, koşullar, döngüler, liste ve demet, sözlük ve küme, fonksiyonlar (`content/lessons/py-1.js`, `py-2.js`). Kapsam herkese açık PCEP müfredat özetinden; metinler özgün.
- Her ders: anlatım, 2+ çalıştırılabilir kod örneği (CPython 3.12 ile doğrulandı), bozuk kodu düzeltme görevi, 4 ölçülebilir hedef, hedefe bağlı 8 soru (answer/why/whyNot sunucu tohumunda), uygulama alanı (PP.alan, Pyodide) alıştırması. Kontrol veriden hesaplanır ve değişmiş veriyle yeniden çalışır (`content/lessons/py-alan.js`).
- Yeni `alan` ders bloğu (`rota-ders.js` lblock, `cleanLesson` blok kimliği korur). Soru bankası olmayan hat için soru tabanlı seçiciler (oyun, alıştırma, seviye testi) `trkSorulu()` ile yalnız bankası olan hatları listeler.
- Sunucu tohumu: hedef metadata `supabase/seed/20261018_1_ogr_hedefler.sql` (+24 satır); cevap anahtarı yalnız özel depoda (`kayitlar/seed/ek-k6.sql`). UYGULANMADI.
- Test: `tests/faz_k10_py.js` (139); sayılar güncellendi: `faz9s_tarama` (954 soru), `ogrenme_tarayici` (8 yol), `faz12b_geri_bildirim` (8 tarihli ders), `ogrenme` (gerçek içerik gerçek bugüne göre).

## Tur 4 (dal: faz-k4; yalnız CSS/aria, davranış değişmedi)
- 390 px dokunma hedefleri 44 px'e çıkarıldı: `.chip`, `.seg button`, `.my-kinds button`, `.my-pn`, `.nw-chip2`, `.sn`, `.gh-nav button` (`css/son-eklemeler.css`; medya sorgusuz, tüm genişliklerde geçerli). 390 px ölçümü: 153 durum × 2 tema = 306 durum, 44 px altı hedef 251 -> 0 (satır içi okuma kelimeleri hariç).
- Kontrast: koyu temada yardım şeridi "?" simgesi 1.97 -> 8.59:1, açıklama metni 4.44 -> AA; ders filtresi metni `--ink`.
- Yalnız placeholder ile adlanan 3 alana `aria-label` (okuma notu, proje yeni adım, proje günlük notu).

## Faz 9 sunucu (dal: faz-9s; migration ve tohum UYGULANMADI, canlı DB, gizli anahtar, zamanlanmış iş, yeni dış kütüphane yok)
- Ustalığa/kapıya sayılan sınavların cevap anahtarı içerikten ve tarayıcıdan çıkarıldı: ders mini sınavı (587 soru), seviye sınavı (7 alan × 10 soru, soru bankasından ayrıldı; bankada yer tutucu kaldı, dizinler kaymaz) ve Veri Analitiği sınavları (21 soru). Sorularda yalnız metin, seçenek ve `id` kalır; puanı ve geçti kararını sunucu verir (`claude.use("ogr")` → `ogr_deneme_gonder`, kapı: `ogr_kapi_degerlendir`).
- Doğru cevap ve açıklamalar yalnız sınav GEÇİLİNCE sunucudan gelir; kalınca yalnız puan/doğru sayısı. Çevrimdışı, misafir, oturum, sunucu hazır değil, çok sık deneme için Türkçe mesajlar; bu denemeler ustalığa sayılmaz. Yerel kayıt sunucu yanıtının önbelleğidir (`dogrulama: "sunucu"`, yalnız `PP.ogr.sunucu` yazar).
- Ders içi alıştırma, Parsons, lab, "çözümü göster", oyun/tekrar soru bankası ve yerleştirme testi istemcide kalır (çevrimdışı çalışır, ustalık/lig saymaz).
- Araç: `node tools/cevap-anahtari.js` (kuru çalışma) / `--yaz`: anahtarı SQL tohumuna ayırır, içerikten siler, soru kimliği ekler; tekrar çalıştırmada tohum birleşir. Anahtar tohumu `supabase/seed/*_anahtar.sql` halka açık repoya girmez (`supabase/seed/.gitignore`); hedef metadata tohumu girer.
- `supabase/migrations/20261019_ogrenme_sunucu_sinav.sql` (UYGULANMADI): yalnız ek (anahtar tablosuna `agirlik`, `aciklama`; `ogr_deneme_gonder` aynı imzayla yenilenir). Uygulama sırası: migration → hedef tohumu → anahtar tohumu → ancak sonra istemci yayını.
- Hesapsız deneme kendi 3 tanıtım sorusunu kullanır (kaydedilmez). Eski `qzCorrect` iki soruda yanlış şıkkı doğru gösteriyordu ("A" cevabı, IPv6 sorusu); tam eşleşme öne alındı.
- Test: `tests/faz9s_arac.js` (39), `faz9s_sunucu.js` (49), `faz9s_tarama.js` (22; sızıntı taraması); sahte sınav sunucusu `tests/sunucu_sahte.js` SENTETİK anahtar kullanır. Etkilenen testler (kritik_akis, faz4_entegrasyon, ogrenme_tarayici, faz12_sema, faz10_va, faz10_va12, hesaplar, h79, t59b, t60d, tur_c) yeni akışa uyarlandı, assert zayıflatılmadı.

## E1 (dal: faz-e1; migration, canlı DB, gizli anahtar, zamanlanmış iş yok)
- Alan egzersizlerinde (SQL/Python/JS) düz textarea yerine CodeMirror 6: sözdizimi rengi, satır numarası, otomatik girinti, Ctrl+Enter çalıştırır, Esc odaktan çıkarır, açık/koyu tema (`--cm-*` renkleri `css/son-eklemeler.css`).
- Tek yerel paket: `vendor/codemirror-6.43.14.js` (476 KB ham, ~167 KB gzip), SHA-384 SRI (`<script integrity>`), tam sabit sürümler, çalışma anında CDN yok. Yalnız ilk alan kurulunca yüklenir (tembel).
- Derleme: `cd tools/cm && npm ci && node derle.js` (esbuild); çıktı `vendor/` + `codemirror.sri.json` + `LICENSE-codemirror.txt` (MIT). Derlemeden sonra `js/ders/alan.js` içindeki `CM.dosya`/`CM.sri` güncellenir (test uyuşmazlığı yakalar).
- Geri dönüş: yükleme/SRI/kurulum hatasında düz textarea kalır, çalışma bozulmaz. Uyum katmanı: textarea DOM'da gizli kalır (`data-alan-kod`), `.value` okuma/yazma editöre yönlenir; mevcut testler değişmedi.
- Test: `tests/e1_editor.js` (SRI sabiti = dosya, üç dil renk, yaz/oku, girinti, Ctrl+Enter, Esc, Sıfırla, 404 ve bozuk-SRI geri dönüşü, 390 px, koyu tema; http sunucusu ile).
- Bilinen sınır: `file://` açılışında SRI'li betik yüklenemez, textarea kalır; sw.js bu dosyayı kurulumda değil ilk kullanımda önbelleğe alır (çevrimdışı: bir kez çevrimiçi açılmış olmalı).
## Faz 12 V5 (dal: faz-12c; migration UYGULANMADI, canlı DB, gizli anahtar, zamanlanmış iş, GitHub otomasyonu, yeni dış kütüphane yok)
- Geri bildirim gönderme: Ayarlar kuyruğundaki her yerel kayıtta açık "Gönder" düğmesi; önizleme + "bu metin sunucuya gider, başkaları göremez" uyarısı + açık onay (otomatik gönderme YOK). Oturum yok/misafir/Artifact ise "yerel kalır" mesajı. Başarıda kayıt "gönderildi" işaretlenir (düzenlenemez, yeniden gönderilemez); sunucu hatası ve günlük sınır (10) anlaşılır Türkçe mesajla gösterilir; yerel kopya hiçbir durumda silinmez. İstemci yalnız insert yapar: `supabase-shim.js` içinde `claude.use("geri_bildirim")` yalnız `gonder` sunar (anahtar/oturum mantığı değişmedi); önem tabloda sütun olmadığı için `baglam` içinde gider.
- `supabase/migrations/20261018_guvenlik_sertlestirme.sql` (UYGULANMADI): yalnız `revoke execute` (`handle_new_user`, `rls_auto_enable`) ve `alter function rapor_paylasim_guncelle_kilidi() set search_path = public`; drop/delete/veri yok. `rapor_gor`, `ogr_deneme_gonder`, `ogr_kapi_degerlendir` değişmez (tasarım gereği).
- O1 ısınma atlama: ısınma adımında "Isınmayı atla" (`w-atla` işareti); ders-tamam = (`w` ya da `w-atla`) + okuma + mini sınav %80 + alıştırma (`PP.ogr.ilerleme.dersTamam`). Atlayıp %80 altı alana "2 dakikalık ısınmayı yap" önerisi; kimse bloklanmaz. Cihazlar arası ders adımı birleştirmesi `w-atla`yı da taşır.
- Yedek dosyası (`seviye-sinavi.js`): açıklamaya ve dosyaya "geri bildirim metinlerini de içerir" uyarısı.
- 30 ders (Backend 13–22, CCNA 13–17, Siber 11–20, İngilizce 7–11) `objectives`, her soruda `obj`, her yanlış seçenek için `whyNot`, `summary` ile dolduruldu.
- Test: `tests/faz12c_gonder.js` (sahte Supabase istemcisiyle gönder/hata/limit, shim yalnız insert, sertleştirme dosyası metin denetimi, ısınma atlama + telafi, 390 px); `faz12b_geri_bildirim.js` tablo adı beklentisi güncellendi (artık yalnız gönderme mantığı ve shim).

## Faz 12 V4 (dal: faz-12b; migration UYGULANMADI, canlı DB, sunucu çağrısı, GitHub issue, zamanlanmış iş, gizli anahtar, yeni dış kütüphane yok)
- "Bu hatalı" düğmesi: her ders odasında (başlıkta), Veri Analitiği ders kartında ve proje ekranında; bağlam (sekme, ders/proje kimliği, adım, hazır ders/proje başlığı) otomatik dolar. Kendi projesinin başlığı bağlama girmez; ad/e-posta hiç eklenmez.
- Geri bildirim formu (`js/ders/geri-bildirim-ui.js`) ve mantığı (`PP.ogr.gb`, `js/ogrenme/geri-bildirim.js`): tür (hata/istek/şikayet/öneri), başlık (3–80), açıklama (10–2000; "Problem / Expected / Actual / Steps" şablon düğmesi), isteğe bağlı önem. E-posta ya da şifre/anahtar benzeri metinde ilk Kaydet uyarır, ikinci basış kaydeder. Yerel kuyruk `ya_pp_ogr.geriBildirim` altında (en çok 100 kayıt): Ayarlar'da liste, düzenle, iki adımlı sil, kopyala, JSON/Markdown dışa aktarma. Yazılan ama kaydedilmemiş metin bağlam başına taslak olarak saklanır (en çok 20), yenilemede geri gelir. Hiçbir şey gönderilmez.
- `supabase/migrations/20261018_geri_bildirim.sql`: yalnız YENİ `geri_bildirim` tablosu (id, owner, tür, başlık, açıklama, bağlam, durum, created_at; CHECK kısıtları; RLS: oturum açmış kullanıcı yalnız kendi satırını ekler/görür, anon yok, update/delete politikası yok; sunucuda `created_at`/`durum` zorlanır, kullanıcı başına 24 saatte en çok 10 satır). Dosya olarak hazır, UYGULANMADI; istemci tabloyu çağırmaz (testle sınanır).
- Güncel tutma: derste `sonDogrulama` boşsa "doğrulanmadı" etiketi (`lrDogrulamaEtiket`; tarih uydurulmaz). Bugün ve Dersler ekranında "İçerik güncelliği" sayacı: toplam / bayat (183 gün+) / doğrulanmadı (`PP.ogr.ders.dogrulamaOzeti`).
- Aylık kaynak raporu: `npm run kaynak:aylik` (`tests/kaynak/aylik.js`, AĞ ister, elle çalıştırılır) denetim sonucunu `../proofpath-ops/raporlar/kaynak-<tarih>.md` dosyasına yazar; hedef bu reponun içinde olamaz ve oluşturulmaz. `--json=` ile ağsız dönüştürür.
- Test: `tests/faz12b_geri_bildirim.js` (npm run test:ogrenme içinde).

## Faz 12a V2 (dal: faz-12a; migration, canlı DB, sunucu tablosu, gizli anahtar, yeni dış kütüphane yok)
- Kaynak denetimi: `npm run kaynak` (`tests/kaynak/denetle.js`, AĞ ister, yalnız GET; `npm test` ağsız kalır). Ders, ek, proje, atlas ve VA verisindeki dış adresleri toplar (`tests/kaynak/toplayici.js`), 200 dışını ve başlığı konuyla eşleşmeyenleri listeler; bot engelleyen siteler (401/403/405/429/999) "belirsiz" sayılır. Ağsız karşılığı `tests/kaynak_etiket.js` (npm test içinde): adres biçimi, adressiz sertifika iddiasının "doğrulanmadı" etiketi, VA Seviye 1 kaynakları.
- VA Seviye 1'in üç dersinin boş kaynak listesi, curl ile 200 doğrulanmış resmî Microsoft/Google/LibreOffice yardım sayfalarıyla dolduruldu.
- 30 ders (Backend 4–12, CCNA 4–12, Siber 4–10, İngilizce 2–6) `objectives` (2–4), her soruda `obj`, her yanlış seçenek için `whyNot`, `summary` (3–5) ile dolduruldu; her hedef en az bir soruyla ölçülür. V1 pilot derslerindeki açık bulgular düzeltildi (tek soruyla ölçülen hedeflere ikinci soru, bk-1 h1 sorusu, ccna-3 `why`, "İnternet" yazımı, eng-2 -es/-s açıklaması).
- Ders↔alıştırma eşleme tablosu `PP.lab.ESLEME` (js/ders/ders-eki.js): yol+konu → lab / Parsons, VA ders → alan / Parsons. Ders odasının son adımında "Alıştır" düğmesi (`lrAlistir`) yalnız lab ya da Parsons'u olan derslerde çıkar ve alıştırma adımına götürür. `tests/faz12_esleme.js` tablonun PP_EK / PP_VA / PP_PARSONS ile birebir tuttuğunu ve düğmenin yalnız eşleşen derslerde göründüğünü sınar.
- `tests/faz12_sema.js`: "alanı henüz olmayan ders" örneği bk-4'ten bk-20'ye taşındı (bk-4 artık alanlı); sayfa açılış bekleme süresi 3,5 sn.

## Faz 12a V1 (dal: faz-12a; migration, canlı DB, sunucu tablosu, gizli anahtar, yeni dış kütüphane yok)
- Kod bloklarını çalıştırarak doğrulama (`tests/faz12_kod.js`, ağsız): derslerdeki 46 `cmd` bloğu `lang` etiketi taşır (sql, python, js, bash, yaml, json, dockerfile; çalışması beklenmeyenler `ios`, `cmd`, `text`, `graphql`, `cwli` ve `calistirma: "atla <neden>"` ile açık işaretli). SQL `node:sqlite`te, Python `python -I -X utf8` (zaman sınırlı, ağ soketi kapalı), JS acorn modül ayrıştırması, bash `bash -n`, JSON `JSON.parse`, YAML PyYAML varsa. Etiketsiz ya da gerekçesiz atlanan blok testi düşürür. Veri Analitiği alan çözümleri (`PP_VA.alanCozum` + `tests/va-cozumler-*.json`) PP.alan kontrol/varyant işleviyle çevrimdışı çalıştırılır (doğru çözüm kabul, yanlışlar red).
- ccna-3'te tek blokta duran JSON ve YAML örneği iki bloğa ayrıldı (içerik aynı).
- Ders şeması (hepsi isteğe bağlı; eski dersler değişmeden çalışır): ders düzeyinde `objectives` (2–4), `summary` (3–5), `prereq`, `minutes`, `sonDogrulama` (tarih), `surum`; soru düzeyinde `obj` (hedef eşlemesi) ve `whyNot` (yanlış seçeneğin nedeni). Yardımcılar ve denetim `PP.ogr.ders` (`js/ogrenme/cekirdek.js`): `hedefler`, `secenekNedeni`, `dogrulamaDurumu`, `denetle`.
- Ders odası (`js/ders/ders-odasi.js`): hedefler anlatımın başında, özet okuma bölümünün sonunda; `whyNot` mini sınavda yalnız YANLIŞ cevaptan sonra ve yalnız seçilen seçenek için; "son doğrulama: <tarih>" etiketi (183 günden eskiyse "6 aydan eski" uyarısı); `minutes` varsa tahmini süre onu kullanır. `cleanLesson` yeni alanları korur.
- Pilot: 10 ders (Backend 1–3, CCNA 1–3, Siber 1–3, İngilizce 1) için `objectives`, `summary`, soru başına `obj` ve her yanlış seçenek için `whyNot` (135 açıklama). Bağımsız Sonnet taramasından geçti. Başka ders doldurulmadı.
- Testler: `tests/faz12_kod.js` (yeni), `tests/faz12_sema.js` (yeni, 390 px), `tests/ogrenme.js` genişletildi (şema denetimi: zorunlu alan, soru/cevap, whyNot/obj/summary/prereq/minutes/tarih geçerliliği, önkoşul döngüsü, kopya başlık; gerçek `content/lessons` taraması).

## W1 (dal: faz-w1; migration, sunucu tablosu, AI servisi, gizli anahtar, yeni dış kütüphane yok)
- `PP.senaryo` (`js/ogrenme/senaryo.js`, arayüz `js/ders/senaryo-ui.js`, veri `content/senaryo/*.js`): ders sonu isteğe bağlı İngilizce iş senaryosu kartı (belge → görev → yazma → yapı + anahtar kavram denetimi → örnek iyi cevap, öz-karşılaştırma). Şablonlar: bug/olay (5 başlık), yanıt, inceleme, açıklayıcı soru. Denetim anlamı değerlendirmez; AI geri bildirimi yok; sonuç kapı/not/ustalık/kanıt sayılmaz. Cevaplar yalnız `ya_pp_ogr.tercih.senaryo`.
- Pilot: 13 kart (VA Seviye 0 ×3, Backend 1–5, Siber 1–5); ders odasında "notlar" adımının sonunda, VA'da ders kartının sonunda. 15 öğe yapısı değişmedi (kart 16. öğe, isteğe bağlı).
- Portföy: "İş yazışmalarım" (`PP.rapor.isYazismalari`), hepsi "doğrulanmamış" etiketli; gizlenebilir; dışa aktarma ders notlarını/özel notları içermez.
- Faz 10 tur 4 açıkları: VA Seviye 0 lab (g1–g3) ortak çubuğa bağlandı (görev başına 3 kademe ipucu, çözüm 2 yanlıştan sonra; eski ipucu düğmesi kalktı; çözüm görülen görev ilerleme sayılır ama kanıt yazılmaz). VA Parsons'ları SQL alan panelinde "Sıra alıştırması" başlığıyla ayrıldı; kod alanı ve sıra alıştırması çözüm durumu iki yerde aynı satırda görünür.
- Test: `tests/faz_w1.js` (yeni); `tests/faz10_va.js` lab düğme seçicileri çubuğa uyarlandı (assert zayıflatılmadı).

## Faz 10 tur 4 (dal: faz-10d, alıştırma çubuğu + 5 hızlı öğrenme parçası; migration, sunucu tablosu, gizli anahtar, yeni dış kütüphane yok)
- Alıştırma çubuğu (`js/ders/cubuk.js`, `PP.cubuk`): Çalıştır/Kontrol · İpucu · Çözümü gör · Sıfırla, tüm alıştırma türlerinde aynı sıra (PP.alan kod alanları, alt ağ laboratuvarı, rota/ACL/VLAN-STP/NAT/OSPF/DHCP karar laboratuvarları, Parsons). "Çözümü gör" ilk 2 yanlış denemeden sonra açılır, iki adımlı onay ister; görülen çözüm "çözüm görüldü" diye kaydedilir ve kanıt/ustalık sayılmaz (`PP.cubuk.kanitSayilir`). Durum mevcut `ya_pp_ogr.tercih.cubuk` içinde; yeni depolama anahtarı yok.
- 3 kademeli ipucu (yön, daha belirgin, neredeyse çözüm), her kademe kayıtlı. 32 VA alanı, 16 genel karar senaryosu, rota/ACL/alt ağ senaryoları için senaryoya özgü 3 kademe. "Ördeğe anlat" kutusu: yapay zekâ yok, üç soru (ne denedin / ne bekledin / ne oldu), yazılanlar saklanmaz.
- Parsons soruları (`js/ders/parsons.js`, `content/parsons.js`, `content/parsons-net.js`): satırları sıraya dizme, en çok 2 yanlış satır; Ekle/↑/↓/Çıkar düğmeleriyle klavyeden çözülür, sürükleme ek. VA Seviye 2'den 3 (va2-2, va2-5, va2-8) + CCNA VLAN dersinden 1.
- Çözüm metinleri `content/veri-analitigi/cozumler.js` (32 alan; "Çözümü gör" için istemcide bulunmak zorunda).
- Seri dondurma (`js/ogrenme/seri.js`): kesintisiz her 7 etkin günde 1 dondurma, en çok 2; boş bir günü otomatik köprüler. Etkin günlerden türetilir, ayrı kayıt yok. Bugün'de dondurma satırı ve 7/30. gün kutlaması (Sade modda kapalı). Eski davranış (dondurma yokken boşluk keser) aynen korundu.
- Günün sorusu (`js/bugun/gunsorusu.js`, `js/ders/hata-defteri.js`): soru bankasından yerel tarihle deterministik; Bugün'de tekrar kuyruğunun ilk satırı; yanlış cevap mevcut oyun tekrar kuyruğuna (1-3-7-14 gün) girer.
- va2-12: EXPLAIN QUERY PLAN kontrolü sütun adından ve plan metni biçiminden bağımsız (SCAN/SEARCH ve indeks adı gevşek eşleşme).
- Test: `tests/faz10d.js` (yeni), `tests/hesaplar.js` seri dondurma (8 yeni kontrol; mevcut kontroller değişmedi).
- Bilinen: `js/atolye/va-ui.js` kapsam dışıydı; VA Seviye 0 laboratuvarı (g1–g3) eski ipucu düğmesinde kaldı, VA Parsons'ları SQL alan panelinin altında görünür.

## Tur C (dal: faz-c, canlı öncesi düzeltme; migration, sunucu tablosu ve gizli anahtar yok)
- Sahibe ait sabitler kaldırıldı: proje ekranında GitHub kullanıcı adı boş başlar, komutlarda `<GitHub-kullanıcı-adın>` yer tutucusu ve "önce adını yaz" uyarısı görünür (yazdıkça komutlar güncellenir); kimlik kartı dosyası `proofpath-kimlik.png`; mülakat model cevabı ve örneklerde `[Adın]`/`[şehir]` ya da nötr ad; sınıf koçu istemlerinde kişi adı yok.
- Hedef tek kaynak: onboarding'de seçilen hedef (`goalTrack()` / `goalSet()`, `js/cekirdek/temel.js`) Bugün şehir kartı, "Sıradaki ders", Haftalık plan yolu, Alıştırma/Ders/Seviye testi varsayılanı, Sayılar, Kimlik kartı, karne ve marka alt satırını belirler (Siber/Network/Backend/DevOps/Test/İngilizce seçince CCNA gösterilmez). Kurucu hesabı ve hedefi olmayanlar için varsayılan değişmedi (CCNA).
- Seviye testi: onboarding'deki "Seviye testini yap" testi Bugün'ün üstünde açar ve odaklar; "Sıfırdan başlıyorum" cevabı seviye kaydına yazılır, Ders ekranı aynı soruyu yeniden sormaz.
- Giriş kartı (`js/giris/giris-ek.js`, `supabase-shim.js`'e dokunmadan): 3 satır değer önerisi, "en az 8 karakter" ipucu, şifre göster, gizlilik notu, "Hesapsız bir ders dene" (yalnız bellekte; ağ, Supabase ve depolama kullanmaz). Oturum/hesap türü belli olana kadar uygulama kabuğu gizli ve `inert`.
- Hazırlık puanı veri yokken "Henüz ölçülmedi"; Kodla dene'de CDN hatası kısa Türkçe mesaj + "Tekrar dene"; `404.html`.
- Test: `tests/tur_c.js` (yeni); `tests/stub.js` koç istemi eşleşmesi yeni ifadeye uyarlandı.

## Faz 10 tur 3 (dal: faz-10c, Veri Analitiği Seviye 1–2 + Faz 8 küçük temizlik)
- Veri Analitiği Seviye 1 (elektronik tablo, 3 ders) ve Seviye 2 (SQL, 13 ders, M§15.2 sırası): her ders 15 öğe tam (`content/veri-analitigi/seviye1.js`, `seviye2a.js`, `seviye2b.js`), her derste en az 1 SQL/Python `PP.alan` alanı (`alanlar1.js`, `alanlar2a.js`, `alanlar2b.js`; 22 çalışan alan + 3 `sim`), Seviye 1/2 değerlendirmesi (6 + 10 soru, telafi derse bağlı), kademe başına 4 proje (`js/veri/proje-yeni-va12.js`, 7 adım; README/veri sözlüğü/metodoloji/test/sınırlamalar adımlarıyla).
- Elektronik tablo çalıştırılmaz: alanlar "simülasyon" (kural tabanlı) ya da "aynı işin SQL/Python karşılığı" etiketli; kontrol veriden sayar, her çalışan alanda varyant (sabit cevap reddedilir).
- `PP.alan`: çok tablolu veri (`veri.ek`; SQL'de ek tablolar, Python'da `tablolar`). Ortak veri: `content/veri-analitigi/veri-ek.js` (kirli tablo, musteri/urun/hedef).
- `PP.va`: seviye bazlı değerlendirme/durum (`sinav(cevap, seviye)`, `durum().seviyeler`); aşama kilidi zorlanmıyor (öneri). PL-300 eşlemesi hâlâ "doğrulanmadı"; sertifika vaadi yok.
- Temizlik: sup1b/sup4c "açılır" dili kaldırıldı; telafi K eksikleri bk1b, bk3c, sup1b, ba1c, ba3d kapatıldı; `weeks` değişmedi (bariz uyumsuzluk yok).
- Test: `tests/faz10_va12.js` (yeni; gerçek SQL/Python'da çözüm kabul, yanlış ve sabit cevap reddi; `tests/va-cozumler-*.json`).

## Faz 8 tur 4 (dal: faz-8b, kalan projelerin taraması ve son tam test; yeni özellik yok)
- Kalite taraması: tur 3'te okunmayan 34 proje (bk 6, qa 7, sec 7, sup 7, ba 3, VA Seviye 0 için 4) bağımsız Sonnet'lerle salt okunur tarandı; bulgular başka Sonnet'lerce düzeltildi (`js/veri/proje-yeni-*.js`). Kimlikler ve kayıt anahtarları değişmedi.
- Taranan 34 projenin hepsinde bulgu çıktı; hepsi 7 adıma çıkarıldı, gereken kabul ölçütleri eklendi; telafi/sonraki metinleri her K'yi sayıyor.
- Doğrulanamayanlar: Bitwarden ücretsiz planda tekrarlanan parola raporu iddiası yanlıştı, çıkarıldı (ba1c); Windows 11 Dosya Geçmişi ve GitHub Türkçe menü adı "doğrulanmadı / kendi sürümünde doğrula" diye yazıldı (sec1c, ba3d); qa3d önkoşulu "qa2 adım 8" olarak düzeltildi, qa2 paketi 15 test üretir notu eklendi.
- "Kilidi açılır" cümleleri yumuşatıldı: yeni projelerde proje bazlı makine kilidi yok, kilit yalnız kademe Altın Vuruş kapısında.

## Faz 8 tur 3 (dal: faz-8b, kapanış ve doğrulama)
- `tests/ogrenme_tarayici.js`: içerik açığı kontrolü eski varsayımı (her kapıda en az 2 eksik) bırakıp gerçeğe bağlandı: eksik = gerekli - tanımlı ve kalan tek açık `altin:gold:3`.
- Yol kartı (`js/proje/proje-atolyesi.js`): 7'den çok projesi olan yolda kademe başlıkları (taranabilirlik; 390 px'te taşma yok).
- Kalite taraması: 43 yeni projeden 11'i okundu; bulgular düzeltildi, bulgulu 10 projeye 7. adım ve gerekli kabul ölçütleri eklendi (`js/veri/proje-yeni-*.js`).

## Faz 10 tur 2 (dal: faz-10b, ortak uygulama alanı PP.alan)
- `PP.alan` (`js/ders/alan.js`): tek API (ders kimliği, tür, başlangıç kodu, kontrol fonksiyonu, sıfırla, ipucu, kanıt kaydı). Türler: `sql` (sql.js 1.10.3, SQLite/WASM), `python` (Pyodide 0.26.4), `js` (izole Web Worker), `sim` (kod çalışmaz, "simülasyon" etiketli kural kontrolü). Etiket dürüst: çalışan "gerçek çalışır", sim "simülasyon"; çalıştırma kullanılamazsa etiket "simülasyon · gerçek çalıştırma şu an kullanılamıyor" olur.
- Dış kütüphane: sürümü sabit, jsDelivr; sql.js (betik + wasm) ve Pyodide yükleyicisi SHA-384 ile doğrulanmadan çalıştırılmaz, uyuşmazlıkta/ağ yokta/çevrimdışıyken anlaşılır mesaj. Kütüphane yalnız "Çalıştır"a basınca yüklenir. Sınır: Pyodide çekirdek dosyaları (asm.js/wasm/stdlib) sürüm sabit ama ayrıca hash'lenmez.
- Güvenlik/sınır: kod yalnız tarayıcıda (işçi) çalışır; çalıştırma sırasında işçide fetch/XHR/WebSocket/importScripts/indexedDB/Worker kaldırılır (en iyi çaba); 5 sn zaman sınırı (aşılınca işçi sonlandırılır, sonsuz döngü kesilir), kod 20000 karakter, çıktı 20000 karakter, SQL sonucu 200 satır, SQLite sayfa sınırı. Tarayıcıda sert bellek sınırı yok (Python için).
- Kontrol fonksiyonu sabit cevap tutmaz: beklenen değer veriden sayılır ve kod ikinci kez değiştirilmiş veriyle çalıştırılır ("SELECT 2" gibi sabit çözüm geçmez). SECURITY P2-1 genişletilmedi.
- Veri Analitiği Seviye 0: her derse 1 SQL + 1 Python alanı (`content/veri-analitigi/alanlar.js`, 12 siparişlik sentetik veri; SQL tablosu `siparis`, Python `siparisler`/`sutunlar`). Çözüm `lab` türünde kanıt (`alan-<id>`, ipuçlu `-ipucu`; istemci doğrulaması) + `tercih.va.alan`; Seviye 0 tamamlama koşulu DEĞİŞMEDİ.
- Test: `tests/faz10_alan.js` (yeni, `test:ogrenme` zincirinde; ağ gerekir, yoksa bölümler "ATLANDI" yazar).

## Faz 5 tur 7 (dal: faz-5g, içerik düzeltme turu)
- TMAP (`js/veri/tmap.js`) ders metni ek ile uyumlandı: DevOps 7 Compose `secrets:` bloğu, Backend 22 Parameters/Outputs, DevOps 11 PVC örneği ve `current-context` uyarısı, CCNA 4 trunk komutları.
- sec 23 kaynağına RFC 2196 eski belge notu; sec 28 NIST AI 100-2 kaynağı E2025 sürümüne güncellendi (curl 200).
- Kalite taraması 2: 38 ek girdisi okundu (17 girdide bulgu); teknik ve dil düzeltmeleri `content/lessons/*-ek*.js` dosyalarında.
- Lab sonuç başlığı "Eksik/yanlış" dar ekranda tek satır (`css/ders-odasi.css`).

## Faz 5 tur 6 (dal: faz-5f, QA + teknik İngilizce ek verisi, OSPF/DHCP lab, kalite taraması)
- QA 18 konu (`content/lessons/qa-ek.js`) ve teknik İngilizce 11 konu (`content/lessons/eng-ek.js`) için ders eki: benzetme + sınırı, rehberli alıştırma, bağımsız görev, yaygın hatalar, geçme ölçütü + kritik yanlış anlamalar, telafi, sonraki adım; 14 çekirdek öğe 29 konuda tam. Alıştırmalar kâğıt/yerel; canlı veri, izinsiz yük ya da güvenlik denemesi istemez.
- Dış kaynak yalnız `curl` 200 dönen ve başlığı konuyla eşleşen sayfalar (2026-10-12): QA 18/18 konuda kaynak var; İngilizce 8/11 (konu 0, 9, 10 kaynaksız; British Council sayfaları erişilemedi, bazı Cambridge sayfaları konu başlığı vermediği için eklenmedi). İngilizce ekinde sınav, seviye ya da puan iddiası yok (testle doğrulanır).
- OSPF (`ccna-ospf`, `net-ospf`) ve DHCP (`ccna-dhcp`, `net-dhcp`) form tabanlı karar lab'ları (`js/ders/lab-ospf-dhcp.js`, yerel simülasyon etiketli; gerçek router/DHCP sunucusu yok). Doğru cevaplar maliyet, yol toplamı, komşuluk ayarı karşılaştırması, DR seçimi, havuz kapasitesi, aktarma ulaşımı ve adres sınıfı hesabından çıkar. CCNA konu 7 (DHCP) ve 10 (OSPF), Network konu 7 (OSPF; rota ve NAT ile birlikte üç lab) ve 10 (DHCP) derslerine bağlı; `oneri.LAB` güncellendi. Kanıt kapı değildir; kanıt kimliği yola göre ayrı (`lab:ccna-ospf:*` / `lab:net-ospf:*` vb.).
- Test: `tests/faz5f_lab.js` (yeni, `test:ogrenme` zincirine eklendi); `faz5b_ccna.js`, `faz5c_net.js`, `faz5d_lab.js` yeni lab sayısına, `faz5_net.js` "ek verisi olmayan ders" denetimi (artık tüm yolların eki var; sayfada PP_EK.eng geçici silinerek) uyarlandı; assert zayıflatılmadı.

## Faz 5 tur 5 (dal: faz-5e, Backend + DevOps ek verisi, alt ağ lab kimliği ayrımı)
- Backend 38 konu (`content/lessons/bk-ek-1.js`, `bk-ek-2.js`) ve DevOps 18 konu (`content/lessons/dev-ek.js`) için ders eki: benzetme + sınırı, rehberli alıştırma, bağımsız görev, yaygın hatalar, geçme ölçütü + kritik yanlış anlamalar, telafi, sonraki adım. Alıştırmalar kâğıt/yerel; canlı ya da maliyetli bulut işlemi istemez.
- Dış kaynak yalnız `curl` 200 dönenler (2026-10-12); Backend 38/38 konuda, DevOps 16/18 konuda kaynak var (DevOps 0 ve 1 doğrulanamadığı için kaynaksız).
- Alt ağ lab kanıt kimliği yola göre ayrıldı: CCNA `ccna-altag`, Network `network-altag`. Eski ortak `lab-net-altag-*` kayıtları silinmedi ve iki yolda sayılır; yeni kayıt başka yola sızmaz, eski+yeni çift sayılmaz.
- Test: `tests/faz5e_ek.js` (yeni); `faz5_net.js`, `faz5b_ccna.js`, `faz5d_lab.js` yeni kimliklere uyarlandı (assert zayıflatılmadı), `faz5d_lab.js`'e altag ayrım/geriye uyum assert'leri eklendi.

## Faz 5 tur 4 (dal: faz-5d, siber ek + VLAN/STP ve NAT lab + kanıt kimliği ayrımı)
- Siber güvenlik 31 konu için ders eki (`content/lessons/sec-ek.js`): benzetme + sınırı, rehberli alıştırma, bağımsız görev, yaygın hatalar, geçme ölçütü + kritik yanlış anlamalar, telafi, sonraki adım; 14 çekirdek öğe 31 konuda tam. Dış kaynak yalnız HTTP 200 dönen RFC/NIST/OWASP bağlantıları (23 konuda; 8 konuda yok), doğrulama tarihi 2026-10-12. Alıştırmalar kâğıt üstünde ya da kendi cihazında, savunma odaklı.
- VLAN/STP (`ccna-vlan`, `net-vlan`) ve NAT/PAT (`ccna-nat`, `net-nat`) form tabanlı karar lab'ları (`js/ders/lab-vlan-nat.js`, yerel simülasyon etiketli; gerçek switch/router yok). Doğru cevaplar kök köprü/kök port/NAT tablosu hesabından çıkar. CCNA konu 4, 7, 13 ve Network konu 6, 7'ye bağlı. Kanıt kapı değildir.
- Lab kanıt kimlikleri yola göre ayrıldı: Network rota/ACL lab'ı artık `lab-net-rota-*` / `lab-net-acl-*` yazar. Eski `lab-ccna-rota-*` ve `lab-ccna-acl-*` kayıtları silinmedi ve her iki yolda sayılır (kimin yazdığı bilinmediği için); yeni kayıtlar yola göre ayrıdır. Alt ağ lab'ı (`net-altag`) hâlâ ortak.
- `PP.ogr.oneri.LAB`: ders:net:7/8/14 ve ders:ccna:5/8/14 güncellendi; `labDurum` eski kimliği (`eski`) tanır.
- Test: `tests/faz5d_lab.js` (yeni); `faz5b_ccna.js`, `faz5c_net.js` yeni lab kimliklerine uyarlandı (assert zayıflatılmadı).

## Faz 5 tur 3 (dal: faz-5c, Network yolu 4–17)
- Network konu 4–17 için ders eki (`content/lessons/net-ek.js`): benzetme + sınırı, rehberli alıştırma, bağımsız görev, yaygın hatalar, geçme ölçütü + kritik yanlış anlamalar, telafi, sonraki adım; 18 konunun 14 çekirdek öğesi tam. Dış kaynak yalnız HTTP 200 dönen RFC/NIST bağlantıları (7 konuda yok: IEEE/CompTIA doğrulanamadı), doğrulama tarihi 2026-10-12. Konu 1 ve 2'ye eksik üçüncü yaygın hata eklendi.
- Rota (konu 6) ve ACL (konu 13) lab'ları Network yoluna da bağlandı (yerel simülasyon); `PP.ogr.oneri.LAB` ders:net:7 ve ders:net:14 eklendi (eksik lab önerilir, kapı değil).
- dev/net/qa önkoşul sırası denetimi: STARTER = TMAP sırası, ders/yetkinlik zinciri doğrusal; sıra değiştirilmedi.
- Test: `tests/faz5c_net.js` (yeni).

## Faz 5 tur 2 (dal: faz-5b, CCNA yolu)
- CCNA 17 konusu için ders eki (`content/lessons/ccna-ek.js`): benzetme + sınırı, rehberli alıştırma, bağımsız görev, yaygın hatalar, geçme ölçütü + kritik yanlış anlamalar, telafi ve sonraki adım. Dış kaynak yalnız HTTP 200 dönen RFC bağlantıları (11 konu), doğrulama tarihi 2026-10-12; doğrulanamayan konularda kaynak eklenmedi.
- Lab'lar (yerel simülasyon etiketli): rota seçimi (en uzun önek) ve ACL değerlendirme + wildcard (`js/ders/lab-karar.js`); alt ağ lab'ı CCNA Subnetting dersine de bağlandı. Hedef, başlangıç, görev, gözlem, doğrulama, sıfırla, ipucu, kanıt kaydı; kanıt kapı kanıtı değil.
- Bilgi grafiği önerisi (`js/ogrenme/yol-oneri.js`, `PP.ogr.oneri`): en küçük sonraki adım + neden + blok nedeni (kritik hedef geçilmediyse telafi); eksik lab önerilir (kapı değil). Ders sayfasındaki "Ustalık ve kapılar" panelinde ve Bugün Koç önerilerinde (yalnız telafi/lab; düz müfredat sırası öneri sayılmaz).
- Test: `tests/faz5b_ccna.js` (yeni); `tests/faz5_net.js` ek verisi olmayan ders kontrolü ccna yerine eng ile (ccna artık ek aldı).

## Faz 10 tur 1 (dal: faz-10, Veri Analitiği — yalnız Seviye 0)
- Müfredat ve önkoşul grafiği (`content/veri-analitigi/mufredat.js`): Seviye 0–8, SQL'in 13 alt konusu M§15.2 sırasıyla; yalnız Seviye 0 "hazır", 1–8 dürüstçe "yok". PL-300 eşlemesi "doğrulanmadı".
- Seviye 0 (`content/veri-analitigi/seviye0.js`): 3 tam ders (15 öğe), sentetik 12 siparişlik veri seti, 1 lab (3 görev, yerel simülasyon etiketi, doğrulama/ipucu/sıfırla/kanıt), 5 soruluk değerlendirme (%80) ve derse bağlı telafi.
- `PP.va` (`js/ogrenme/veri-analitigi.js`) ve Atölye > "Veri Analitiği" arayüzü (`js/atolye/va-ui.js`). Seviye 0 tamam = 3 ders okundu + 3 lab görevi + değerlendirme geçildi; Seviye 1 kilitli. Kayıtlar istemci doğrulamalı, ustalık/sertifika kanıtı değildir.
- Test: `tests/faz10_va.js` (yeni).

## Faz 9 (dal: faz-9)
- Çevrimdışı/PWA (varsayılan KAPALI; Ayarlar > Güven merkezi ya da `?pwa=1`): `manifest.webmanifest`, `ikon.svg`, `sw.js` (ağ önce, önbellek yedek; yalnız uygulama kabuğu ve statik içerik; Supabase API ve kullanıcı verisi önbelleğe alınmaz; göreli adres, GitHub Pages alt yolu korunur), `js/ogrenme/cevrimdisi.js`. Yeni sürüm kendiliğinden devralmaz, "Şimdi yenile" ile uygulanır; kapatınca SW ve önbellek kaldırılır.
- Senkron (varsayılan KAPALI; `localStorage.pp_senkron=1`): `PP.sync` motoru (`js/ogrenme/senkron.js`) kalıcı yazma kuyruğu (kullanıcıya göre ayrı), durumlar bekliyor/çakışma/hata/başarılı, kesilen istekte yeniden deneme. `supabase-shim.js` bayrak açıkken yazmaları taban sürümlü (`updated_at`) gönderir; sunucu satırı değişmişse YAZMAZ, iki sürümü saklar ve kullanıcıya sorar. Çevrimdışıyken son bilinen sunucu görüntüsü okunur. Bayrak kapalıyken yazma yolu eskisiyle aynıdır. Sağ altta durum rozeti.
- Paylaşılan cihaz yalıtımı (`PP.cihaz`, shim'de her zaman etkin): hesap değişince önceki kullanıcının yerel verisi (`ya_*`) ayrı saklaya (`pp_stash:<uid>`) alınır, o hesap dönünce geri gelir; sahipsiz ilk veri ilk giren hesaba atanır. "Paylaşılan cihaz modu" açıkken çıkışta bu hesabın yerel verisi ve kuyruğu silinir; çıkış uyarısı bekleyen değişiklik sayısını söyler.
- Güven merkezi (`PP.guven`, `js/atolye/guven-ui.js`; Ayarlar): saklanan veri ve nedeni, ölçülen/çıkarım/doğrulanmamış ayrımı, AI sağlayıcıya giden veri, portfolyo görünürlüğü, dışa aktarma (JSON), yerel veriyi silme (açık onay + dışa aktarma önerisi görüldü işareti şart; sunucu/hesap silme yok ve öyle yazılı), sınırlar.
- Düzeltme (Faz 4 hatası): aralıklı tekrar günü artık yerel güne çevrilir; gece 00:00-03:00 (TR) kayıtları UTC tarihi yüzünden bir önceki güne yazılıyordu.
- Test: `tests/faz9_senkron.js`, `tests/faz9_cevrimdisi.js` (yeni; yerel http sunucu + sahte supabase).

## Faz 8 (dal: faz-8)
- Kanıt raporu `PP.rapor` (`js/ogrenme/rapor.js`): her iddia kanıta bağlı ya da "doğrulanmamış"; adım işaretleme öz-beyan etiketli; 8 kademeli durum yalnız sunucu doğrulamalı kanıt türleriyle yükselir; işveren görünümü özel not/gerekçe/kanıtsız iddia taşımaz; proje tamamlanınca öz-beyan etiketli `proje-kaydi` kanıtı yazılır; proje tanımında 10 alandan kaçının dolu olduğu görünür. CV (yalnız kanıtlı satırlar), rol boşluğu (iş vaadi yok), teknik İngilizce.
- Mülakat rubriği `PP.mulakat`: 6 ölçüt 0-4, kaynak etiketi (öz/insan/AI), tekrarlayan zayıflık ve telafi eylemi; Mülakat sekmesinde panel.
- Akran incelemesi `PP.akran` ve paylaşım `PP.paylasim` (istemci modeli, sahte depo): AI/insan ayrımı zorunlu, görünürlük yalnız sahip/yazar, inceleme güvenilir durumu değiştirmez; belirteç yalnız SHA-256 özeti olarak saklanır, iptal/süre dolumu erişimi keser.
- Sunucu politikası taslağı `supabase/migrations/20261013_paylasim_politikasi.sql` (uygulanmadı). Arayüzde paylaşım bağlantısı oluşturma kapalı.
- Test: `tests/faz8_kariyer.js`.

## Faz 7 (dal: faz-7)
- Uyarlanabilir plan `PP.plan`: tekrar/telafi kuyruğu + yoldaki kalan konular + öğrenci müsaitliği → günlük küçük adımlar, ayrı tampon, görünür varsayımlar. Tahmin hafta ARALIĞI ve ölçülenden ayrı; kesin tarih/olasılık yok. Kaçırılan gün cezasız, plan bugünden yeniden kurulur; alternatif takvimler.
- Öğrenme ikizi `PP.ikiz`: kayıtlardan güçlü/zayıf/belirsiz/darboğaz, her biri kanıtıyla; kaydı olmayan yol için durum söylenmez.
- Bugün sekmesinde "Plan ve öğrenme ikizi" paneli; tercihler `ya_pp_ogr.tercih.plan`. Test: `tests/faz7_plan.js`.

## Faz 6 (dal: faz-6)
- Koç modülü `PP.koc` ve Bugün'de Koç paneli: öneriler yalnız kayıtlardan ve "Dayanak" ile; kayıt yoksa "veri yok"; gezinme yalnız geçerli hedeflere. Tercihler (ton, proaktif öneri, harici sağlayıcı) incelenir/değiştirilir/onayla sıfırlanır. Harici sağlayıcı varsayılan kapalı, gerçek AI bağlantısı yok.
- Koç ilerleme/ustalık/kanıt yazamaz; açık sınav sırasında cevap/ipucu verilmez ve sağlayıcıya hiçbir şey gitmez; sağlayıcıya giden bağlamdan cevap alanları çıkarılır; hata/zaman aşımında yerel yanıt. Test: `tests/faz6_koc.js`.

## Faz 5 tur 1 (dal: faz-5, Network yolu)
- Ders eki: Network yolunun ilk 4 konusu için benzetme + sınırı, rehberli alıştırma, bağımsız görev, yaygın hatalar, geçme ölçütü, telafi, kaynaklar (yalnız HTTP 200 doğrulananlar). Alt ağ laboratuvarı (yerel simülasyon): doğrula, ipucu, sıfırla, `lab` türünde kanıt. Test: `tests/faz5_net.js`.

## Faz 4 (dal: faz-4)
- Tek tanım: ders tamamlama, ustalık ve seri hesapları `PP.ogr` altında toplandı (`PP.ogr.ilerleme`, `PP.ogr.ustalik`, `PP.ogr.seri`, `PP.ogr.kapi.miniSinav`, `PP.ogr.kapi.rutbeKosullari`, `PP.ogr.tekrar.ARALIK`). Eski işlev adları (`lcDone`, `lessonsDone`, `starterTopics`, `stageOf`, `mastLevels`, `plLevel`, `plBand`, `gsAnswer`, `streakInfo`, `gmStreak`, `deskState`, `gateList` …) korunur ve bu tanımlara devreder. `js/ogrenme/` betikleri çekirdek koddan önce yüklenir.
- Davranış değişiklikleri: (1) tamamlanan ders sayısı artık iki kaynağın birleşimi (ders kayıtları ∪ tamamlanmış konular, aynı kimlik bir kez), eskiden büyük olanı alınıyordu; (2) mini sınav adımı yalnız en az %80 doğru ile tamamlanır (eskiden tüm soruları cevaplamak yetiyordu); daha önce tamamlanmış mini sınav kayıtları geçerli kalır; sıradaki ders bu kapıyı bekler.
- Mini sınav: sonuçta geçme eşiği, başarısızlıkta hedefli telafi önerisi ve "Yeniden dene" (farklı soru seti yoksa bu açıkça yazılır). Her deneme ayrı kayıt olarak eklenir.
- Açıklama modları: ders anlatımında 8 mod (Tam anlatım, Kısa özet, Benzetmeyle, Adım adım, Örnekle, Bozulursa ne olur, Gerçek durumlar, Mülakat dili); hepsi dersin aynı konu haritasından, tercih kalıcı.
- Tekrar kuyruğu (Bugün): kalınan mini sınavlar telafi öğesi, geçilenler 1/3/7/14/30 gün aralıkla tekrar öğesi olarak "neden bugün" açıklamasıyla görünür; deneme kayıtlarından hesaplanır (kalıcı, cezasız).
- "Tümünü sıfırla" öğrenme modeli kaydını (`ya_pp_ogr`) da kaldırır; sıfırlama yedeğine eklenir. Başka bir yerde silme yok.
- Testler: `tests/faz4_entegrasyon.js` (yeni), `tests/ogrenme.js` ve `tests/hesaplar.js` genişletildi (değişen beklenen değerler gerekçeli), `tests/t57b_mynotes.js` ekran görüntüsünden önce elemanın kararlı olmasını bekler.

## Faz 3 (dal: faz-3)
- Öğrenme modeli (`js/ogrenme/`, tek ad alanı `window.PP.ogr`): yetkinlik grafiği ve önkoşullar, değerlendirme hedefleri, deneme/kanıt kaydı, kapılar (varsayılan %80 eşik, kritik hedefler tek tek, her kilidin nedeni), Altın Vuruş / Bütünleşik / Joker üreticileri, hedefli telafi ve varyant seçimi, içerik sürümü, yollar arası aktarım kuralı.
- Mevcut ders içeriğinden (`STARTER`, `PATHS`) kurulan tek grafik; eski kayıtlar (`ya_lc`, `ya_gs`, `ya_lv`, `ya_pl`) yalnız okunur, biçimleri ve anahtarları değişmedi. Yeni depolama anahtarı: `ya_pp_ogr`.
- Arayüz: Ders ekranında "Ustalık ve kapılar" paneli (önkoşullar, kilit nedenleri, telafi önerisi); ders yolundaki kilitli satır nedenini söyler. Sıralı ders kilidi davranışı değişmedi.
- Testler: `tests/sira.js` (yükleme sırası denetimi, acorn), `tests/hesaplar.js` (mevcut XP/seri/rütbe/seviye/sınav hesaplarını sabitler), `tests/ogrenme.js` (model birim testleri), `tests/ogrenme_tarayici.js` (uygulamadaki bağlama). `.gitignore`: `/*.png`. README mimari bölümü güncellendi.
- `supabase/migrations/20261012_ogrenme_guvenilir_ustalik.sql`: sunucu tarafı puanlama/kapı taslağı (uygulanmadı).

## Faz 2B (dal: faz-2b)
- supabase-js betiği yayımlanmış dosyaya (`dist/umd/supabase.js`) çevrildi, SRI karması yeniden hesaplandı.
- `index.html` davranışı korunarak birimlere ayrıldı (2,0 MB → ~81 KB): 7 stil dosyası (`css/`), 7 veri dosyası (`js/veri/`) ve 50 kod birimi (`js/`). Uygulama artık tek bir sarmalayıcı işlev değil, küresel kapsamda sırayla yüklenen klasik betiklerdir (`"use strict"` her dosyada korunur). Derleme adımı yok; rota, URL, depolama anahtarları ve veri biçimleri değişmedi.
- Testler: bayat testler yeni akışa güncellendi (assert gevşetilmedi), `make-dbg` yeni yapıya dayanıklı, zaman aşımı varsayılanı 420 sn, `TESTING.md` yenilendi.

## Faz 1B (dal: faz-1b)
- supabase-js betiği tam sürüme (`2.117.3`) sabitlendi, bütünlük (SRI) denetimi eklendi.
- `supabase/migrations/` eklendi: `docs` politikaları için yeni migration dosyası (uygulanmadı).
- Testler: `tests/make-dbg.js` (hata ayıklama kancalı `tests/page_dbg.html` üretir), `tests/kritik_akis.js` (ders, ilerleme, sınav, seri, ayar için gerçek assert'ler), eski akış testi `tests/emekli/` altına taşındı, `npm test` varsayılan zaman aşımı 90 sn.

## Faz 2A
- Test altyapısı: `package.json`, `npm test`, `tests/run-all.js`, sabit yolların göreliye çevrilmesi, `TESTING.md`.

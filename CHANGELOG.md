# CHANGELOG

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

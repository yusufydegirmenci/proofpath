# ProofPath Master Prompt — Faz Haritası

Tarih: 2026-10-11 · Kaynak: `ProofPath_Master_Prompt_EN.txt` (v18.0, 1440 satır). İçerik proje kökündeki `PROOFPATH_MASTER.md` ile aynı; o dosya yalnız Markdown kaçış karakterleri (`\#`, `\*`) ve fazladan boş satırlar içeriyor.
Amaç: her faz bitince çıktıyı beklenenle karşılaştırmak ve en sonda toplu eksik analizi yapmak. Faz numaraları master prompt §21'i izler. Kullanıcının başka oturuma verdiği faz metni bu bölümlerden kesilip biçildiği için, her faz notunda o fazın gerçekte hangi metinle verildiği de kaydedilmeli.

## 1. Her fazda geçerli kurallar (tüm fazların ortak kabul ölçütü)

| Kural | Kaynak | Faz sonunda nasıl kontrol edilir |
|---|---|---|
| Repoda çalış; yalnız öneri/rapor değil, uygula + test et + belgele | §0 | Fazın commit'i var mı, `origin`'e itildi mi |
| Uygulanmamış/test edilmemiş şeyi yapılmış gibi söyleme | §0, §20.3, §23 | Rapordaki her "doğrulandı" iddiasını bir komut/çıktıyla eşleştir |
| Kullanıcıyla Türkçe konuş, arayüz dilini koru | §0, §23 | Rapor dili, UI metinleri |
| Mevcut özelliği yeniden yazma: önce envantere bak, varsa onar/genişlet | §2.3, §5 | Yeni dosya/modül mevcut bir işlevi kopyalıyor mu |
| Bulgular kalıcı kayıtlara yazılır, keşif tekrarlanmaz | §2.1–2.2, §22 | Kayıt dosyaları güncellendi mi, faz baştan keşif yaptı mı |
| P0/P1 hatalar kozmetik işten önce | §4 | Açık P0/P1 varken yeni özellik eklenmiş mi |
| Ön yüz kilidi güvenlik değildir; güvenilir sonuç sunucu tarafında | §6.2, §11.2, §17.3 | Yeni kapılar/puanlar istemci tarafında mı |
| Simülasyon gerçek çalıştırma gibi sunulmaz | §8.2, §14, §15 | Laboratuvarlarda "gerçek / yerel / simülasyon" etiketi |
| Kullanıcı verisini silme/sıfırlama yok; geri alınamaz işlem için izin | §17.1–17.2, §21 F11 | Migration ve veri işlemleri |
| Her anlamlı değişiklikten sonra test checkpoint'i | §20, §21 sonu | Testler fazın içinde mi koşuldu |
| Oturum sonunda `NEXT_STEPS.md` güncel checkpoint | §3.3, §22 | Dosya fazın gerçek son durumunu yansıtıyor mu |
| Kilometre taşı raporu: ne değişti, hangi dosyalar, hangi testler + sonuç, ne doğrulanmadı, sonraki adım | §23 | Faz raporu bu 8 maddeyi içeriyor mu |
| Faz 1'de durma; bütçe/engel olana kadar devam et | §0, §21 sonu | Oturum erken mi kesildi |

Durum etiketleri iki ayrı set halinde tanımlı: envanter için §2.3 (`EXISTS AND VERIFIED` … `REGRESSION FOUND`), raporlama için §20.3 (`Implemented and Verified` … `Blocked`), refaktör defteri için §3.1 (`NOT STARTED` … `REGRESSION FOUND`).

## 2. Kalıcı mühendislik kayıtları (§2.2)

Hangi fazda oluşması/güncellenmesi beklendiği:

| Dosya | İçerik | İlk beklendiği faz | Sonra güncellenir |
|---|---|---|---|
| `AUDIT.md` | Doğrulanmış bulgular, riskler, taban çizgisi | 1 | 11 |
| `ARCHITECTURE.md` | Modüller, arayüzler, veri akışı | 1 | 2, 3 |
| `ROADMAP.md` | Öncelikli iş, bağımlılık, kabul ölçütleri | 1 | her faz |
| `FEATURE_INVENTORY.md` | `Gereksinim → Mevcut uygulama → Dosyalar → Bağımlılık → Boşluk → Plan → Kanıt → Durum` | 1 | her faz |
| `REFACTOR_MAP.md` | Çıkarma defteri | 2 (Faz 1'de plan olarak açılabilir) | 2+ |
| `DATA_MODEL.md` | Varlıklar, sahiplik, sürümler | 1 | 3, 9 |
| `SECURITY.md` | Tehdit modeli, yetkilendirme, açık riskler | 1 | 9, 11 |
| `TESTING.md` | Test stratejisi, komutlar, gerçek sonuçlar | 1 | her faz |
| `IMPLEMENTATION_STATUS.md` | Özellik bazında ilerleme/doğrulama | 1 | her faz |
| `CHANGELOG.md` | Anlamlı değişiklikler | ilk kod değişikliği | her faz |
| `NEXT_STEPS.md` | Devam checkpoint'i | 1 | her oturum sonu |

Master "eşdeğer dosya varsa güncelle, kopya üretme" diyor; birleştirme serbest ama içerik eksik olmamalı.

## 3. Bağımlılık sırası (§4) ve fazlarla eşleşmesi

§4'teki 12 adımlık sıra §21'deki 11 faza şöyle oturur:

| §4 adımı | Faz |
|---|---|
| 1 Keşif, taban çizgisi, envanter · 2 Kritik güvenlik/veri/akış düzeltmeleri | F1 |
| 3 Modüler mimari, veri sahipliği, ortak yetkinlik modeli | F2 + F3 |
| 4 Müfredat, önkoşul, değerlendirme, kanıt, ilerleme | F3 |
| 5 Mevcut özellikleri denetle/iyileştir | F4 |
| 6 Eksik öğrenme yeteneklerini ortak altyapıda kur · 8 Alan içeriği + lab | F5 (+F10) |
| 7 AI Koç ve uyarlanabilir plan | F6 + F7 |
| 9 Proje, değerlendirme, telafi, portfolyo, kariyer | F8 |
| 10 Öğrenme ikizi, çevrimdışı, güven/şeffaflık | F7 (ikiz) + F9 |
| 11 Erişilebilirlik, performans, regresyon, güvenlik, E2E · 12 Dağıtım | F11 |

Sert bağımlılıklar (önceki tamamlanmadan sonraki başlamamalı):
- F1 kritik düzeltmeler → her şey (§4 "P0/P1 önce").
- F2 refaktör → F3+ (yeni özellikler monolite değil modüllere eklenir).
- F3 tek yetkinlik/ilerleme/kanıt modeli → F4–F10 (hepsi aynı modeli paylaşmalı, §5 sonu).
- F5 ders içeriği → aynı konunun lab'ı (§8.2, §15.1, §15.3).
- F3 kanıt modeli + F5 değerlendirme → F6 Koç, F7 ikiz/plan, F8 raporlar.
- F8 paylaşım/izin + F9 güven merkezi birbirine bağlı (portfolyo görünürlüğü, iptal).
- F11 tümüne bağlı.

## 4. Fazlar

### Faz 1 — Keşif ve stabilizasyon (§2, §4 P0/P1, §17.2–17.3, §21 F1)
Hedef: güvenilir taban çizgisi kurmak ve kritik hataları gidermek.
Beklenen çıktılar:
- Branch, çalışma ağacı, betikler, giriş noktaları, rotalar, bağımlılıklar, veri modeli, auth, API, kalıcılık, testler, dağıtım haritası (§2.1 madde 1–2).
- Özelliklerin gerçek davranışı (dosya adından çıkarım değil) (§2.1-3).
- Güvenlik/veri bütünlüğü riskleri, ölü kontroller, tekrarlanan mantık (§2.1-4).
- Her bulgu için doğrulandı/çıkarım/test edilmedi/erişim yok etiketi (§2.1-5).
- Test, build, çalışma zamanı hatası taban çizgisi (§2.1-6).
- §2.2 kayıtlarının oluşturulması; envanter §2.3 formatında.
- **P0/P1 güvenlik, veri bütünlüğü ve ana akış hatalarının düzeltilmesi.**
- Auth kontrolleri: e-posta normalizasyonu/benzersizlik, eşzamanlı kayıt, şifre sıfırlama, oturum yenileme, hesap silme + yeniden kayıt, kullanıcılar arası izolasyon (§17.2). Bildirilen çift kayıt/şifre sıfırlama sorunları önce yeniden üretilmeli.
- Bir sonraki en güvenli adımın belirlenmesi + `NEXT_STEPS.md`.
Kabul: kayıtlar var ve kanıtlı; açık P0 kalmadı; P1'ler ya düzeltildi ya engel nedeni yazıldı; test taban çizgisi sayılarla kayıtlı.

### Faz 2 — Modüler mimari ve refaktör (§3, §21 F2)
Hedef: `index.html` monolitini davranışı koruyarak birim birim bölmek.
Beklenen çıktılar:
- Önce gerçek boyut/yapı ölçümü (eski rapora güvenme).
- Her birim için 12 adımlık süreç (§3.1): kaynak aralık, olay/durum/yan etki izleme, envanter kontrolü, `REFACTOR_MAP.md` kaydı, çıkarma, çağıranları güncelleme, çift çalışma/çift dinleyici kontrolü, test, davranış karşılaştırması, checkpoint.
- Defter alanları: eski konum, yeni yol + arayüz, bağımlı/tüketenler, durum/olay/API, envanter satırı, test + sonuç, durum etiketi.
- Uyumluluk (§3.2): rotalar, URL fragmanları, geri/ileri, dağıtım yolları, depolama anahtarları/formatları korunur.
- Ortak arayüzler, kopya uygulamaların kaldırılması.
Kabul: her çıkarılan birim `VERIFIED` ya da açık engelle `VERIFICATION BLOCKED`; "çıkarıldı" ≠ "doğrulandı"; canlı rotalar ve kayıtlı veriler bozulmadı.

### Faz 3 — Öğrenme temelleri (§5 sonu, §6, §11, §17.1, §21 F3)
Hedef: tek, yetkili yetkinlik grafiği + ilerleme + değerlendirme + kanıt modeli.
Beklenen çıktılar:
- Varlıklar (§6): yol/kademe/modül/ders/içerik sürümü, yetkinlik + önkoşul, alıştırma/lab/proje/capstone, değerlendirme hedefi/soru/varyant/rubrik/deneme, telafi/hata kaydı/tekrar öğesi, kanıt/rapor/portfolyo/paylaşım izni, tercih/plan/geçmiş.
- L0–L8 ilerleme seviyeleri; kademe başına 4 ayrı çekirdek proje; Golden Shot, Integrated Golden Shot, Joker kapıları (§6.1).
- Kapı kuralları (§6.2): sayfa açmak ustalık açmaz; kritik beceri ortalamaya gömülmez; müfredat sürümü + geçmiş kanıt korunur; yollar arası transfer yalnız kanıt eşleşirse.
- Varsayılan %80 eşik, kritik hedefler tek tek geçmeli (§11.1); cevap anahtarları istemci kodunda olmamalı (mümkünse) (§11.2).
- Mevcut ilerleme ve kullanıcı verisinin bozulmadığının doğrulanması; geriye uyumlu migration (§17.1).
Kabul (§6.2): önkoşullar incelenebilir; her kilit nedenini söyler; geçerli tamamlanma sonrakini açar; başarısız kritik gereksinim bloke kalır; ilerleme yenileme/yeniden girişte kalır; yetkisiz kullanıcı güvenilir ustalık kaydı sahteleyemez. Puan/kapı/telafi/varyant kuralları için otomatik test (§11.2).

### Faz 4 — Mevcut modüllerin entegrasyonu (§5, §8.3–8.7, §10, §13, §21 F4)
Hedef: var olan özellikleri ortak modele bağlamak, kopyaları birleştirmek.
Kapsam ve kabul ölçütleri:
- Olay müdahale simülasyonları (§8.3): belirti, log/metrik/topoloji kanıtı, araştırma eylemleri, alternatif nedenler, kararların sonuçları, kök neden açıklaması, rubrik + kanıt, varyant senaryolar. Kabul: öğrenci kanıt inceleyip karar vermeli; tek tık doğru cevap yetkinlik sayılmaz.
- Fail-Forward günlüğü (§10): görev, yetkinlik, cevap, hata, olası kök neden (doğrulanmış ile ayrı), ipucu, telafi görevi, sonraki denemeler. Kabul: başarısızlık hedefli telafiye yol açar, yeni değerlendirme gelişimi doğrular, düzelen hata ilerlemeyi kalıcı bloklamaz.
- Açıklama modları (§8.5): 8 mod, tercih kalıcı. Kabul: mod değişimi açıklamayı anlamlı değiştirir; tüm modlar aynı hedef ve doğru teknik modele dayanır.
- Aralıklı tekrar (§8.4): performans/hata/güven/zamana göre planlama, zayıf ve kritik beceriye öncelik, varyant soru, "neden bugün" açıklaması, cezasız seri. Kabul: tamamlanan tekrar planı değiştirir, başarısız öğe geri gelir, kuyruk kalıcı.
- Proje/portfolyo (§8.6), teknik mülakat (§8.7), Peer Review (§13): F8'de derinleşir; F4'te denetim + birleştirme + test.
- Kopya menü/model/ilerleme hesabı/koç/değerlendirme motoru kalmamalı (§5).
Kabul: her modül için eksik kabul ölçütü ve test eklendi.

### Faz 5 — Öğretim ve etkileşimli pratik (§7, §8.1–8.2, §11, §14, §21 F5)
Hedef: başlangıçtan ileri seviyeye eksiksiz ders + uygun lab.
Beklenen çıktılar:
- Her ciddi ders 15 öğe (§7): hedef/önkoşul, sade açıklama, terim/zihinsel model, adım adım örnek, benzetme + sınırı, anlamlı görsel, rehberli alıştırma, bağımsız görev, yaygın hatalar, bilgi kontrolü, geçme ölçütü + kritik yanlış anlama, lab/proje bağlantıları, güvenilir dış kaynak, sonraki adım + telafi.
- Medya kuralları (§7.1), uydurma URL yok, dış kaynakların son doğrulama tarihi (§7.2).
- Bilgi grafiği (§8.1): blok nedeni, en küçük sonraki adım, yeni kanıtla yeniden hesap, çelişkili/eski kayıt tespiti. Kabul: grafik gerçek ilerlemeyi ve önerileri etkiler.
- Lablar (§8.2): her lab 9 öğe (hedef, başlangıç durumu, görev, gözlenebilir durum değişimi, doğrulama, sıfırla/tekrar, ipucu, yetkinlik kaydı, gerçek/yerel/simülasyon etiketi). Kabul: uygulanan her alanda en az bir temsili lab etkileşim + doğrulama + kanıt kaydı yapar.
- Alan yolları (§14): IT temelleri, CCNA, siber güvenlik, backend, DevOps, QA, teknik İngilizce. Kabul: her uygulanan yolda önkoşul, gerçek öğretim, alıştırma, yetkinliğe bağlı değerlendirme, dürüst çalıştırma etiketi.
- Değerlendirme türleri ve 8 adımlı telafi (§11, §11.1).

### Faz 6 — Koç ve kişiselleştirme (§9, §21 F6)
Hedef: ProofPath verisine bağlı, kendi çalışma alanı olan Koç.
Beklenen çıktılar: bağlama duyarlı rehberlik (§9.1, uydurma geçmiş yok), öğretme + iç navigasyon (§9.2), tercih incele/değiştir/sıfırla (§9.3), gerekçeli proaktif öneri (§9.4), onay gerektiren işlemlerde onay (§9.5), sağlayıcı hatası/zaman aşımı, LLM tek başına ustalık veremez, korumalı değerlendirmede cevap sızdırmaz (§9.6).
Kabul (§9.6): gerçek öğrenci durumundan bağlamlı açıklama/öneri; geçerli hedefe navigasyon; önerinin kanıtını açıklar; önemli işlemler yetki kurallarına tabi. İzin, hata ve köken testleri.

### Faz 7 — Planlama ve öğrenci zekâsı (§8.4, §8.8, §16, §21 F7)
Hedef: uyarlanabilir çalışma planı + aralıklı tekrar + kanıta dayalı öğrenme ikizi.
Beklenen çıktılar: haftalık plan, günlük küçük adım, varsayımlı iş yükü tahmini, tampon, kaçırılan oturum telafisi, alternatif takvim (§16); ikizde mevcut durum + kanıt, güçlü/zayıf, en az iki plan karşılaştırması, varsayım ve belirsizlik, düzeltme imkânı (§8.8).
Kabul: plan gerçek önkoşul/iş yükü verisini kullanır ve değişime tepki verir; en az iki plan görünür varsayımlarla karşılaştırılabilir; her tahmin ölçülen gerçekten ayrı gösterilir; kesin tarih/olasılık uydurulmaz.

### Faz 8 — Yetkinlik ve kariyer hazırlığı (§8.6–8.7, §12, §13, §21 F8)
Hedef: kanıta dayalı rapor, portfolyo, mülakat, peer review, kariyer önerisi.
Beklenen çıktılar: proje başına 10 tanım alanı (§8.6), rapor alanları (§12), 8 kademeli kanıt durumu (§12.1), rol bazlı boşluk analizi/CV/teknik İngilizce (§12.2), mülakat uyarlaması ve tekrarlayan zayıflık takibi (§8.7), peer review rubriği ve AI/insan ayrımı (§13).
Kabul: proje tamamlanması rozet değil kanıt kaydı üretir; her rapor iddiası kanıta bağlı ya da "doğrulanmamış"; yetkisiz kullanıcı özel raporu göremez; iptal edilen paylaşım erişim vermez; peer review izinleri özel içeriği sızdırmaz; mülakat sonuçları rubrik bazlı ve telafiye bağlı.

### Faz 9 — Süreklilik ve güven (§8.9, §8.10, §17.3, §21 F9)
Hedef: uygulanabilir PWA/çevrimdışı + senkron + güven/şeffaflık merkezi.
Beklenen çıktılar: kurulabilir uygulama, seçili derslerin çevrimdışı önbelleği, kuyruklu değişiklik, senkron, görünür çevrimdışı/bekliyor/başarılı/hata durumları, çakışmada sessiz üzerine yazmama, içerik sürüm kontrolü, paylaşılan cihazda kullanıcı ayrımı (§8.9); güven merkezinde tercihler, saklanan veri ve nedeni, önerinin kanıtı, ölçülen/çıkarım/doğrulanmamış ayrımı, AI sağlayıcısına giden veri, dışa aktarma/silme, portfolyo görünürlüğü, sıfırlama ve etkisi (§8.10).
Kabul: çevrimdışı ders erişimi, kuyruk, yeniden bağlanma, kesilen istek, çakışma, önbellek güncelleme, çıkış ve kullanıcılar arası izolasyon test edildi; dışa aktarma/sıfırlama/silme/paylaşım yetkisiz erişim ve sessiz veri kaybı olmadan çalışır; vaat edilemeyen gizlilik garantisi yazılmaz.

### Faz 10 — Alan tamamlama (§14, §15, §21 F10)
Hedef: Veri Analitiği yolunu §15.1 sırasıyla eksiksiz kurmak, diğer yolları ortak mimariyle genişletmek.
Beklenen çıktılar:
- Sıra (§15.1): müfredat + önkoşul grafiği → tam ders → eşleşen lab → test → bağımsız değerlendirme + telafi → araç birleştirme → projeler/capstone → sertifika eşlemesi → rapor + kariyer.
- Seviye 0–8 (§15.2): temeller, tablolar, SQL (13 alt konu sırayla), istatistik, Python/Pandas, ETL, Power Query/Power BI/DAX, hikâyeleştirme, PL-300 hazırlığı.
- Lablar (§15.3): SQL, Python, veri temizleme, görselleştirme, Power BI/DAX (gerçek ya da dürüst simülasyon).
- 6 entegre iş akışı (§15.4), 6 alan bağlantısı (§15.5), kademe başına 4 ayrı proje + README/veri sözlüğü/metodoloji/test/sınırlamalar (§15.6).
Kabul: menü veya birkaç SQL dersi yeterli değil; PL-300 kapsamı resmi kaynaktan yeniden kontrol edilir, ağırlıklar sabitlenmez, gerçek sınav sorusu kopyalanmaz; "yolu bitirmek = sertifika" asla söylenmez; Power BI Desktop tarayıcıda çalışıyor gibi sunulmaz; grafik yalnız ölçtüğü yetkinliği kanıtlar.

### Faz 11 — Son kalite ve yayın (§18, §19, §20, §23, §21 F11)
Hedef: tam doğrulama ve güvenli dağıtım.
Beklenen çıktılar: regresyon/entegrasyon/E2E/güvenlik/erişilebilirlik/performans testleri; §20.1'deki 18 kapsam alanı; §20.2'deki 20 adımlı uçtan uca öğrenci yolculuğu; UX/erişilebilirlik gereksinimleri (§18: ölü kontrol yok, yatay taşma yok, klavye/odak/kontrast, azaltılmış hareket); tüm kayıtların güncellenmesi; yalnız yetkiyle dağıtım ve canlı sitenin ayrıca doğrulanması; §23'teki 8 maddelik son rapor.
Kabul: birincil yolculuklar tüm ekran boyutlarında kullanılabilir; işlevsel gösterilen ölü kontrol yok; test edilmeyen adım "tamam" işaretlenmez; dağıtım doğrulanmadan başarılı denmez.

## 5. Faz 1: beklenen ile yapılan karşılaştırması

Kaynak: `faz-1.md` (bu klasör) + kökteki `AUDIT.md`, `FEATURE_INVENTORY.md`, `NEXT_STEPS.md`.

| Master'ın beklediği | Yapılan | Durum |
|---|---|---|
| Repo, dağıtım, git durumu incelemesi | Yapıldı (canlı site = `main` HEAD, CI yok, `package.json` yok) | Tamam |
| Giriş noktası/mimari/veri modeli haritası | `AUDIT.md` içinde var; ayrı `ARCHITECTURE.md`/`DATA_MODEL.md` yok | Kısmi |
| Gerçek davranış (dosya adından değil) | `smoke.js` ile 15 sekme render edildi; envanterin bir kısmı yalnız anahtar kelime eşleşmesine dayanıyor | Kısmi |
| Bulgu başına doğrulandı/çıkarım/erişim yok etiketi | Raporda var; Supabase tarafı hiç denenmedi | Kısmi |
| Test/build taban çizgisi | Ölçüldü: 58 testten 51'i sabit yol yüzünden çöktü, `mobil.js` zaman aşımı | Tamam (ölçüm), kötü taban |
| §2.2 kayıtları | Yalnız `AUDIT.md`, `FEATURE_INVENTORY.md`, `NEXT_STEPS.md`. Eksik: `ARCHITECTURE`, `ROADMAP`, `REFACTOR_MAP`, `DATA_MODEL`, `SECURITY`, `TESTING`, `IMPLEMENTATION_STATUS`, `CHANGELOG` | Eksik (3/11) |
| Kayıtların repoda olması (sonraki oturumların görmesi) | Repoya commit edilmedi, yalnız proje klasöründe; oturumun dalı itilmedi | Eksik |
| Envanter §2.3 formatı ve durum etiketleri | Envanter var; kanıt sütunu zayıf | Kısmi |
| **P0/P1 kritik hataların giderilmesi** | Hiçbiri düzeltilmedi. Açık: RLS `coll` açığı (P1-1), sürümsüz/SRI'siz `supabase-js` CDN, kırık test yolları, çok cihazda son-yazan-kazanır veri kaybı (P1-7) vb. | **Yapılmadı** |
| §17.2 auth testleri (çift kayıt, şifre sıfırlama, silme + yeniden kayıt, izolasyon) | Supabase erişimi olmadığı için denenmedi; engel olarak yazılmalıydı | Engelli, kısmen belgelenmiş |
| Canlı uygulama incelemesi | Yapıldı | Tamam |
| Sonraki güvenli adım + `NEXT_STEPS.md` | Var | Tamam |
| "Faz 1'de durma" (§21 sonu) | Oturum keşif sonrası durdu | Sapma (kullanıcı fazları ayrı verdiği için beklenebilir, ama düzeltme kısmı Faz 1'in parçası) |
| Kod değişikliği varsa commit/CHANGELOG | Commit yok | — |

Özet: Faz 1'in keşif yarısı büyük ölçüde yapıldı, stabilizasyon yarısı (kritik düzeltmeler) ve kayıtların çoğu yapılmadı. Faz 2'ye başlamadan önce kapatılması gerekenler:
1. Dal `origin/main` üzerinden açılmalı (Faz 1 dalı boş "Initial commit" üzerindeydi).
2. Test yolları düzeltilip `npm test` benzeri tek komut ve gerçek taban çizgisi; aksi halde §3.1'deki "her çıkarmadan sonra test" şartı karşılanamaz.
3. RLS politikası, `supabase-js` sürüm sabitleme + SRI.
4. Eksik kayıt dosyaları (en azından `ARCHITECTURE`, `SECURITY`, `TESTING`, `REFACTOR_MAP` iskeleti) ve hepsinin repoya commit'i.
5. `index.html` ile `content/akademi.src.html` arasında tek kaynak kararı.

## 6. Her faz sonunda kullanılacak kontrol listesi

1. Faz hangi metinle verildi? (Kullanıcının kesip verdiği bölüm; §21 dışı bölümler eklenmiş mi, kesilmiş mi?)
2. Commit'ler: hangi dal, `origin`'e itildi mi, taban hangi commit?
3. Yukarıdaki faz bölümündeki "beklenen çıktılar" tek tek: var / kısmi / yok.
4. Kabul ölçütleri: hangisi gerçek testle doğrulandı, hangisi yalnız iddia?
5. Ortak kurallar tablosu (§1 bu dosya): ihlal var mı?
6. Kayıt dosyaları güncellendi mi (§2 tablo)?
7. Önceki fazlardan açık kalan P0/P1 ve eksikler kapandı mı?
8. Testler: çalıştırılan komutlar ve sonuçlar; önceki faza göre fark.
9. `NEXT_STEPS.md` gerçeği yansıtıyor mu?
10. Sonuç `faz-N.md` olarak bu klasöre.

## 7. Toplu yeniden analiz için kapsam (son fazdan sonra)

- §20.2'deki 20 adımlı yolculuğun her adımı: test edildi / engelli / yapılmadı.
- §8'deki 10 yetenek + §9 Koç + §10 Fail-Forward + §13 Peer Review + §15 Veri Analitiği + §16 Planlayıcı: §20.3 etiketleriyle durum.
- §1'deki 7 ayrım ("görüntülenen ≠ anlaşılan", "simülasyon ≠ gerçek", "hazırlık ≠ sertifika" vb.) arayüzde gerçekten ayrılıyor mu.
- Tek yetkinlik/ilerleme/kanıt modeli var mı, yoksa modüller kendi hesabını mı tutuyor (§5 sonu).
- Güvenlik: RLS, paylaşım iptali, kullanıcılar arası izolasyon, istemcide cevap anahtarı, sırlar.
- Tüm Faz notlarındaki "Eksikler" bölümlerinin birleşik listesi ve hangi fazda kapandığı.

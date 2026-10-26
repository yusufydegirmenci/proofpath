/* Siber güvenlik (Security+ SY0-801 (V8) temelli) · sabit dersler 19-24 */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).sec = (window.PP_LESSONS.sec || {}));
  var CT = { title: "CompTIA Security+ sınav hedefleri (SY0-801, V8)", url: "https://www.comptia.org/certifications/security" };
  var PM = { title: "Professor Messer: Security+ (ücretsiz video kursu, SY0-701 sürümü)", url: "https://www.professormesser.com/", type: "video", length: "Çok bölümlü", level: "başlangıç", lang: "EN" };
  var NISTG = { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", type: "doc", level: "orta", lang: "EN" };
  function res(a, why) { var o = {}; for (var k in a) o[k] = a[k]; o.why = why; return o; }

  /* 19 ──────────────────────────────────────────── Varlık yönetimi */
  L[19] = {
    hook: "Neyin var olduğunu bilmiyorsan onu koruyamazsın. Envanter güvenliğin ilk adımıdır.",
    homework: "Evindeki ağa bağlı tüm cihazları listele (telefon, TV, kamera, yazıcı...). Router yönetim ekranındaki cihaz listesiyle karşılaştır; tanımadığın cihaz var mı?",
    warmup: {
      recap: [{ point: "Zafiyet taraması ve yama yönetimi, hangi sistemlerin var olduğunu bilmeye bağlıdır.", example: "Taranacak IP listesi" }],
      concepts: [
        { term: "Varlık envanteri", tr: "Sahip olunan her şeyin listesi", summary: "Donanım, yazılım, veri ve hesapların kayıtlı olması.", example: "CMDB" },
        { term: "Gölge BT", tr: "Kayıt dışı kullanım", summary: "Onaysız cihaz ve hizmetler.", example: "Kişisel bulut deposu" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Bir zafiyet çıktı: 'Bu sürümü kullanan tüm sunucuları bul.' Envanter yoksa günler sürer, varsa dakikalar. Kayıtsız cihaz yamasız ve izlenmeyen demektir; saldırganın tercih ettiği kapı." },
      { t: "steps", h: "Varlık yaşam döngüsü", items: [
        "Edinme: satın alma ve onay. Kayıt: envantere ekle, sahip ve sınıf ata.",
        "Kullanım: yapılandır, yamala, izle.",
        "Bakım: güncelleme ve takip.",
        "Elden çıkarma: veriyi güvenli sil, kaydı kapat."
      ] },
      { t: "steps", h: "Takip ve sahiplik", items: [
        "Her varlığın sahibi (owner) ve sınıfı olsun (kritik, standart, düşük).",
        "Donanım: seri no, konum, kullanıcı. Yazılım: sürüm, lisans.",
        "Keşif araçları: ağ taraması, DHCP kayıtları, uç nokta ajanları.",
        "CMDB: varlıklar ve ilişkilerin kaydı."
      ] },
      { t: "steps", h: "Güvenli imha ve silme", items: [
        "Temizleme (sanitization): veriyi kurtarılamaz hale getirmek.",
        "Disk için kriptografik silme (anahtarı yok etmek), üzerine yazma, fiziksel yok etme (parçalama, delme, manyetik silme).",
        "Silme sertifikası ile belgeleme.",
        "Kiralık/iade cihazlarda veri silme zorunlu."
      ] },
      { t: "box", h: "Veri kalıntısı", text: "Normal 'sil' ya da 'format' veriyi kalıcı silmez. SSD ve disklerde güvenli silme ya da şifreleme + anahtar imhası kullan." },
      { t: "warn", h: "Tuzak", text: "BYOD (kişisel cihaz) ve IoT, envantere kolay girmez ama ağa bağlanır. Politika, MDM ve ayrı ağ ile yönet." }
    ],
    objectives: [
      { id: "h1", text: "Bir olayın varlık yaşam döngüsünün hangi aşamasına denk geldiğini (edinme, kayıt, kullanım, bakım, elden çıkarma) bulabilirsin." },
      { id: "h2", text: "Envanter ve varlık sahibinin neden güvenliğin ilk adımı olduğunu seçebilirsin." },
      { id: "h3", text: "Güvenli imha yöntemlerini (kriptografik silme, parçalama, üzerine yazma) basit silmeden ayırt edebilirsin." }
    ],
    summary: [
      "Envanter yoksa yama, izleme ve risk yönetimi eksik kalır; zafiyet çıkınca etkilenen sistemleri dakikalarda bulmak envantere bağlıdır.",
      "Varlık yaşam döngüsü edinme, kayıt, kullanım, bakım ve elden çıkarma aşamalarından oluşur; kayıt aşamasında sahip ve sınıf atanır.",
      "Her varlığın bir sahibi (owner) olmalıdır; korunmasından ve kararlarından o sorumludur.",
      "Normal 'sil' ya da format dizin kaydını kaldırır ama veri diskte kalır ve kurtarılabilir.",
      "Güvenli imha yöntemleri kriptografik silme (anahtarı yok etme), üzerine yazma ve fiziksel yok etmedir; silme sertifikasıyla belgelenir."
    ],
    quiz: [
      { id: "762f2e0d", q: "Varlık yönetiminin güvenlik açısından ilk faydası nedir?", options: ["Neyin korunması gerektiğini bilmek", "İnterneti hızlandırmak", "Parolaları güçlendirmek", "Lisansı ucuzlatmak"], obj: "h2" },
      { id: "09e81785", q: "Diski kurtarılamaz hale getirmenin geleneksel fiziksel yöntemi hangisidir?", options: ["Parçalama (shredding)", "Format atmak", "Dosyayı silmek", "Yeniden adlandırmak"], obj: "h3" },
      { id: "cc6f910e", q: "Her varlık için atanması gereken sorumlu kişiye ne denir?", options: ["Owner (sahip)", "Attacker", "Auditor", "Proxy"], obj: "h2" },
      { id: "6d725b53", q: "Normal 'dosyayı sil' komutu neden yeterli değildir?", options: ["Veri diskte kalır ve kurtarılabilir", "Dosya hemen yeniden oluşur", "Disk bozulur", "Ağı yavaşlatır"], obj: "h3" },
      { id: "5c722295", q: "Eski bir sunucunun verisi güvenli silinip kaydı envanterden kapatılıyor. Bu varlık yaşam döngüsünün hangi aşamasıdır?", options: ["Elden çıkarma", "Edinme", "Kayıt", "Bakım"], obj: "h1" },
      { id: "69059499", q: "Şifrelenmiş bir SSD'nin verisini, sürücünün şifreleme anahtarını yok ederek ulaşılmaz kılmak hangisidir?", options: ["Kriptografik silme", "Hızlı format", "Dosya sistemini yeniden adlandırma", "Çöp kutusunu boşaltma"], obj: "h3" }
    ],
    interview: [
      { q: "Neden varlık envanteri tutulur?", a: "Neyin var olduğunu bilmeden yama, izleme ve risk yönetimi yapılamaz. Envanter zafiyetin hangi sistemleri etkilediğini hızla gösterir ve kayıtsız cihazı ortaya çıkarır." },
      { q: "Eski bir cihazı elden çıkarırken ne yaparsın?", a: "Veriyi güvenli şekilde silerim (kriptografik silme, üzerine yazma ya da fiziksel imha), envanterden kapatırım ve silme işlemini belgelerim." }
    ],
    vocab: [
      { term: "Asset", tr: "varlık", ex: "Register every asset." },
      { term: "Inventory", tr: "envanter", ex: "Update the inventory." },
      { term: "Owner", tr: "sahip", ex: "Each asset has an owner." },
      { term: "Sanitize", tr: "güvenli temizlemek", ex: "Sanitize the drive." },
      { term: "Decommission", tr: "hizmet dışı bırakmak", ex: "Decommission the server." }
    ],
    resources: [res(PM, "Varlık yönetimi ve güvenli imha"), res(NISTG, "Tanımla (Identify) fonksiyonu")],
    sources: [CT]
  };

  /* 20 ──────────────────────────────────────────── Zafiyet yönetimi */
  L[20] = {
    hook: "Zafiyet yönetimi bir kerelik tarama değil, döngüdür: bul, önceliklendir, kapat, doğrula, tekrar et.",
    homework: "Bilgisayarındaki bir uygulamanın güncelleme ayarını kontrol et: otomatik mi? Güncelleme ne zaman yüklendi?",
    warmup: {
      recap: [{ point: "CVSS puanı ve sömürülme durumu önceliği belirler.", example: "İnternete açık kritik açık önce" }],
      concepts: [
        { term: "Yama yönetimi", tr: "Güncelleme süreci", summary: "Yamaları test edip zamanında dağıtmak.", example: "Aylık yama günü" },
        { term: "Düzeltme (remediation)", tr: "Zafiyeti kapatmak", summary: "Yama, yapılandırma değişikliği ya da telafi edici kontrol.", example: "Servisi kapatmak" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Salı sabahı kritik bir güvenlik yaması yayımlandı. Hemen tüm sunuculara basarsan servis çökebilir; hiç basmazsan saldırıya açıksın. Zafiyet yönetimi, bu dengeyi süreçle çözer." },
      { t: "steps", h: "Döngü", items: [
        "Keşif: varlıkları belirle.",
        "Tarama: kimlik doğrulamalı (credentialed) tarama daha doğru sonuç verir.",
        "Analiz: yanlış pozitifleri ayıkla, CVSS ve bağlamla önceliklendir.",
        "Düzeltme: yama, yapılandırma ya da telafi edici kontrol.",
        "Doğrulama: yeniden tara ve kapandığını kanıtla.",
        "Rapor ve tekrar."
      ] },
      { t: "steps", h: "Yama yönetimi", items: [
        "Önce test ortamında dene, sonra kademeli (pilot grup) yay.",
        "Acil durum yaması için ayrı hızlı yol (change management ile).",
        "Geri dönüş (rollback) planı hazır olsun.",
        "Yamalanamayan sistemlerde istisna kaydı ve telafi edici kontrol."
      ] },
      { t: "box", h: "Risk kabulü", text: "Bazı zafiyetler hemen kapatılamaz. Kurum riskini bilerek kabul edebilir (risk acceptance), ama yazılı onay, sahip ve gözden geçirme tarihi olmalı." },
      { t: "steps", h: "Bilgi kaynakları", items: [
        "CVE/NVD, üretici duyuruları, CISA KEV (bilinen sömürülen zafiyetler) listesi.",
        "Tehdit istihbaratı, OSINT, bug bounty bulguları.",
        "Penetrasyon testi ve red/blue/purple team çalışmaları."
      ] },
      { t: "warn", h: "Tuzak", text: "Tarama sonuçları 'iş bitti' demek değildir. Raporu okuyup önceliklendirmek ve kapatılanı doğrulamak asıl işin kendisidir." },
      { t: "steps", h: "Tespit yöntemleri ve raporlama (V8)", items: [
        "IPAM (IP adres yönetimi): hangi IP'nin kime ve neye ait olduğunu kaydeder; kayıtta olmayan ama ağda IP alan cihaz, yönetilmeyen ya da sahte (rogue) cihaz sinyalidir ve tarama kapsamını netleştirir.",
        "CSPM: bulut ortamlarını sürekli tarayıp yanlış yapılandırmaları (herkese açık depolama, aşırı geniş izin) bulur. Kaynak kod incelemesi zafiyetleri üretime çıkmadan koddan yakalar.",
        "Önceliklendirme önem derecesine ve sızma testi raporuna göre yapılır; doğrulama düzeltmenin gerçekten işe yaradığını yeniden tarama ile kanıtlar.",
        "Raporlama iç (yönetim ve teknik ekip) ve dış (denetçi, düzenleyici, müşteri) olarak ayrılır. Bug bounty ve sorumlu ifşa (responsible disclosure) politikası dışarıdan gelen bulguları düzenli kanala alır."
      ] }
    ],
    objectives: [
      { id: "h1", text: "Zafiyet yönetimi döngüsündeki adımların sırasını (tarama, analiz, düzeltme, doğrulama) bulabilirsin." },
      { id: "h2", text: "Kimlik bilgisiyle yapılan taramanın ve CISA KEV listesinin değerini ayırt edebilirsin." },
      { id: "h3", text: "Yama dağıtım ve yamalanamayan sistem senaryolarında doğru yaklaşımı seçebilirsin." },
      { id: "h4", text: "Tarama, IPAM, CSPM ve kaynak kod incelemesi gibi tespit yöntemlerini ve iç ile dış raporlamayı ayırt edebilirsin." }
    ],
    summary: [
      "Zafiyet yönetimi bir döngüdür: keşif, tarama, analiz, düzeltme, doğrulama ve rapor.",
      "Kimlik bilgisiyle (credentialed) yapılan tarama sistemin içini gördüğü için daha doğru sonuç verir ve yanlış pozitifleri azaltır.",
      "Yama önce test ortamında denenir, pilot grupla kademeli yayılır ve rollback planı hazır tutulur.",
      "CISA KEV listesi aktif olarak sömürülen bilinen zafiyetleri içerir; bu açıklar önceliklidir.",
      "Yamalanamayan sistemde telafi edici kontrol uygulanır; riski kabul etmek için yazılı onay, sahip ve gözden geçirme tarihi gerekir."
    ],
    quiz: [
      { id: "00a3e5d5", q: "Kimlik bilgisiyle yapılan (credentialed) taramanın avantajı nedir?", options: ["Daha doğru ve derin sonuç verir", "Daha hızlı olur", "Ağa yük bindirmez", "Yama gerektirmez"], obj: "h2" },
      { id: "b1999b7e", q: "Zafiyet düzeltildikten hemen sonraki adım nedir?", options: ["Yeniden tarayıp doğrulamak", "Raporu silmek", "Servisi kapatmak", "Parolayı değiştirmek"], obj: "h1" },
      { id: "a7e2a4d0", q: "Yama uygularken en doğru yaklaşım hangisidir?", options: ["Önce test, sonra kademeli yaygınlaştırma", "Hepsine aynı anda", "Hiç test etmeden", "Sadece yılda bir"], obj: "h3" },
      { id: "27b10776", q: "CISA KEV listesi ne içerir?", options: ["Aktif olarak sömürülen bilinen zafiyetler", "Tüm CVE'ler", "Parolalar", "Sertifika listesi"], obj: "h2" },
      { id: "d8ede161", q: "Tarama tamamlandı ve ham bulgular geldi. Yama yapmadan önce yapılacak analiz adımı hangisidir?", options: ["Yanlış pozitifleri ayıklayıp CVSS ve bağlama göre önceliklendirmek", "Tüm bulguları aynı önceliğe koymak", "Bulguları yayınlamadan silmek", "Her bulguya aynı anda yama uygulamak"], obj: "h1" },
      { id: "cdd35ce8", q: "Eski bir üretim sistemi yama kabul etmiyor. Doğru yaklaşım hangisidir?", options: ["Ağdan izole etme gibi telafi edici kontrol uygulayıp riski yazılı kabul ettirmek ve gözden geçirme tarihi koymak", "Zafiyeti kayda geçirmeden sessizce görmezden gelip sistemi çalıştırmak", "Sistemi internete açıp yamasız eski sürümün herkese erişilebilir kalmasını sağlamak", "Sistemi tarama kapsamından çıkarıp envanter kaydını silerek zafiyeti görünmez yapmak"], obj: "h3" },
      { id: "fd87b8d8", q: "Ağ ekibi, IPAM kayıtlarında bulunmayan ama ağda IP alıp çalışan birkaç cihaz fark ediyor. Bu bulgu hangi riske işaret eder?", options: ["Sertifika süresinin dolması", "Yönetilmeyen (unmanaged) ya da sahte (rogue) cihazlar", "Yetersiz yedekleme sıklığı", "Tarama aracının yanlış pozitif üretmesi"], obj: "h4" },
      { id: "33c2e048", q: "Birden çok bulut hesabında depolama kovalarının yanlışlıkla herkese açık bırakılıp bırakılmadığını sürekli ve otomatik bulup raporlamak için hangi araç türü en uygundur?", options: ["Ağ tabanlı IDS", "WAF", "CSPM (bulut güvenlik duruşu yönetimi)", "UPS"], obj: "h4" }
    ],
    interview: [
      { q: "Zafiyet yönetimi sürecini anlat.", a: "Varlıkları keşfeder, tararım, bulguları CVSS ve bağlamla önceliklendiririm, yama ya da telafi edici kontrolle düzeltirim, yeniden tarayıp doğrularım ve rapor ederim. Bu bir döngüdür." },
      { q: "Bir sistemi yamalayamıyorsan ne yaparsın?", a: "Telafi edici kontrol uygularım (ağdan izole etme, erişimi kısıtlama), riski yazılı olarak kabul ettirir ve gözden geçirme tarihi koyarım." }
    ],
    vocab: [
      { term: "Remediation", tr: "düzeltme", ex: "Remediation is in progress." },
      { term: "Rollback", tr: "geri dönüş", ex: "Prepare a rollback plan." },
      { term: "Scan", tr: "tarama", ex: "Run a vulnerability scan." },
      { term: "Risk acceptance", tr: "risk kabulü", ex: "Management signed the risk acceptance." },
      { term: "Exception", tr: "istisna", ex: "We granted an exception." }
    ],
    resources: [
      res(PM, "Zafiyet yönetimi bölümleri"),
      { title: "CISA: Bilinen Sömürülen Zafiyetler Kataloğu (KEV)", url: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog", type: "doc", why: "Önceliklendirme için güncel liste", level: "orta", lang: "EN" }
    ],
    sources: [CT]
  };

  /* 21 ──────────────────────────────────────────── Log ve SIEM */
  L[21] = {
    hook: "Loglar güvenliğin kara kutusudur: olay olduktan sonra ne olduğunu ancak onlardan öğrenirsin.",
    homework: "Windows Olay Görüntüleyici'yi aç (Security günlüğü). Son başarısız oturum açma denemelerine (Olay 4625) bak ve kaç tane olduğunu not et.",
    warmup: {
      recap: [{ point: "Dedektif kontroller olayı fark eder; loglar bunun malzemesidir.", example: "Log analizi" }],
      concepts: [
        { term: "Log", tr: "Olay kaydı", summary: "Sistem, ağ ve uygulama olaylarının zaman damgalı kaydı.", example: "Başarısız giriş" },
        { term: "SIEM", tr: "Merkezi log ve alarm sistemi", summary: "Logları toplar, ilişkilendirir ve alarm üretir.", example: "Splunk, Elastic, Sentinel" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Saat 03:12'de bir yönetici hesabı yurt dışından giriş yaptı. Bunu kim fark eder? Loglar toplanıp SIEM'de 'olağandışı konum' kuralı varsa bir alarm doğar. Yoksa haftalar sonra raporla fark edersin." },
      { t: "steps", h: "Log kaynakları", items: [
        "İşletim sistemi (Windows Olay Günlükleri, Linux /var/log).",
        "Ağ cihazları, güvenlik duvarı, IDS/IPS, proxy.",
        "Uygulama ve veritabanı, web sunucusu.",
        "Kimlik sistemleri (AD), bulut denetim kayıtları, EDR."
      ] },
      { t: "steps", h: "SIEM ne yapar?", items: [
        "Toplama (collection) ve normalleştirme: farklı formatları ortak biçime çevirir.",
        "İlişkilendirme (correlation): ayrı olayları birleştirir (10 başarısız giriş + 1 başarılı giriş = şüpheli).",
        "Alarm ve panel (dashboard), arama ve raporlama.",
        "Saklama: uyum için belirlenen süre."
      ] },
      { t: "box", h: "SOAR ve UEBA", text: "SOAR: alarm sonrası müdahaleyi otomatikleştirir (hesabı kilitle, IP'yi engelle). UEBA: kullanıcı/varlık davranışının normalden sapmasını bulur." },
      { t: "steps", h: "İyi log pratikleri", items: [
        "Saatleri senkronize et (NTP); zaman damgası yoksa olay zinciri kurulamaz.",
        "Loglar değiştirilemesin: merkezi sunucuya yaz, erişimi kısıtla.",
        "Gürültüyü azalt: her şeyi değil, önemli olayları alarm yap.",
        "Saklama süresi ve gizlilik (loglarda parola, kişisel veri olmasın).",
        "Syslog (ağ cihazları), NetFlow (akış verisi), paket yakalama (pcap)."
      ] },
      { t: "warn", h: "Tuzak", text: "Alarm yorgunluğu: çok fazla düşük kaliteli alarm, gerçek olayın gözden kaçmasına yol açar. Kuralları sürekli ayarla: eşikleri ve istisnaları gözden geçirmeye uyarı ayarı (alert tuning) denir." },
      { t: "steps", h: "Veri kaynakları, protokoller ve göstergeler (V8)", items: [
        "NetFlow/IPFIX: paket içeriğini değil bağlantı özetini (kim kime, hangi port, ne kadar veri) taşır; beklenmeyen bağlantı ve büyük hacimli çıkışı görmek için hafif bir yoldur. IPFIX, NetFlow'un IETF standardı karşılığıdır.",
        "syslog: cihazlardan merkezi log toplama. SNMP: cihaz durumunu izleme ve yönetme. Paket yakalama tam içerik verir ama çok depolama ister; port mirroring switch trafiğini analizöre kopyalar.",
        "Ajanlı (agent) izleme cihaza yazılım kurar ve derin veri verir; ajansız (agentless) izleme yazılım kurmadan uzaktan sorgular, ajan kurulamayan cihazlarda işe yarar ama daha az ayrıntı verir.",
        "Gösterge örnekleri: imkânsız seyahat (aynı hesap kısa sürede birbirinden çok uzak iki konumdan giriş yapar), hesap kilitlenme artışı, aynı anda çok sayıda oturum, log silme ya da değiştirme."
      ] }
    ],
    objectives: [
      { id: "h1", text: "İşletim sistemi, ağ cihazı, uygulama ve kimlik sistemi gibi log kaynaklarını ve NetFlow/IPFIX, syslog, SNMP gibi veri toplama yöntemlerini sayabilirsin." },
      { id: "h2", text: "SIEM'in toplama, normalleştirme ve ilişkilendirme işlevlerini örnekle açıklayabilirsin." },
      { id: "h3", text: "SOAR ile UEBA'nın ne yaptığını birbirinden ayırabilirsin." },
      { id: "h4", text: "NTP ile saat senkronizasyonu gibi iyi log pratiklerini uygulayabilirsin." },
      { id: "h5", text: "Çok sayıda düşük değerli uyarıyı uyarı ayarı (alert tuning) ile azaltma yaklaşımını seçebilirsin." }
    ],
    summary: [
      "Loglar olaydan sonra ne olduğunu anlamanın temel kaynağıdır; SIEM bunları toplar, normalleştirir ve ilişkilendirir.",
      "İlişkilendirme ayrı olayları birleştirir: 10 başarısız giriş + 1 başarılı giriş şüphelidir.",
      "SOAR alarm sonrası müdahaleyi otomatikleştirir; UEBA davranışın normalden sapmasını bulur.",
      "Saatler NTP ile senkronize edilmeli, loglar merkezi sunucuya yazılıp korunmalıdır.",
      "Alarm yorgunluğu gerçek olayı gizler; kurallar sürekli ayarlanmalıdır."
    ],
    quiz: [
      { id: "e5a07b36", q: "SOC'ye günde yüzlerce düşük değerli uyarı geliyor ve analistler gerçek olayları gözden kaçırıyor. En uygun iyileştirme hangisidir?", options: ["Eşik ve istisnaları gözden geçirip uyarı kurallarını ayarlamak", "Tüm uyarıları kapatıp yalnızca haftalık rapora güvenmek ve beklemek", "Günlük kaynaklarının yarısını SIEM'e göndermeyi durdurup beklemek", "Analist sayısını artırıp kuralları hiç değiştirmemek ve izlemek"], obj: "h5" },
      { id: "b99d4e98", q: "Farklı kaynaklardan gelen olayları birleştirip şüpheli desen bulmaya ne denir?", options: ["İlişkilendirme (correlation)", "Yedekleme", "Şifreleme", "Maskeleme"], obj: "h2" },
      { id: "464995b3", q: "Log analizinde zaman damgalarının doğru olması için hangi servis önemlidir?", options: ["NTP", "DHCP", "SMTP", "FTP"], obj: "h4" },
      { id: "316ca665", q: "Alarmdan sonra müdahaleyi otomatikleştiren çözüm hangisidir?", options: ["SOAR", "DLP", "NAT", "CDN"], obj: "h3" },
      { id: "231137df", q: "Başarısız oturum açma olayı hangi Windows olay numarasıdır?", options: ["4625", "4624", "1102", "7045"], obj: "h1" },
      { id: "fd7c45ee", q: "Güvenlik analisti, paket içeriğine bakmadan hangi iç sunucunun gece boyunca dışarıdaki bir adrese çok büyük hacimde veri gönderdiğini görmek istiyor. Hangi veri kaynağı hem uygun hem de hafiftir?", options: ["Tam paket yakalama (PCAP)", "Antivirüs imza güncelleme günlüğü", "NetFlow / IPFIX akış kayıtları", "SNMP trap bildirimleri"], obj: "h1" },
      { id: "cfd0e8ae", q: "Aynı kullanıcı hesabıyla İstanbul'dan, 20 dakika sonra São Paulo'dan oturum açılıyor. Bu durum hangi göstergeye örnektir?", options: ["İmkânsız seyahat (impossible travel)", "Hesap kilitleme eşiği aşımı", "Protokol düşürme", "Log manipülasyonu"], obj: "h1" }
    ],
    interview: [
      { q: "SIEM nedir?", a: "Çeşitli kaynaklardan logları toplayan, normalleştiren, ilişkilendiren ve alarm üreten merkezi sistemdir. Olay tespitini, araştırmayı ve uyum raporlamasını destekler." },
      { q: "Neden saat senkronizasyonu önemli?", a: "Farklı cihazların loglarını doğru sıraya koymak için ortak zaman gerekir. Saatler farklıysa olay zinciri kurulamaz ve adli analiz bozulur." }
    ],
    vocab: [
      { term: "Log", tr: "kayıt", ex: "Check the logs." },
      { term: "Alert", tr: "alarm", ex: "An alert was triggered." },
      { term: "Correlation", tr: "ilişkilendirme", ex: "Use correlation rules." },
      { term: "Retention", tr: "saklama", ex: "Log retention is 12 months." },
      { term: "False alarm", tr: "yanlış alarm", ex: "It was a false alarm." }
    ],
    resources: [
      res(PM, "Log ve SIEM"),
      { title: "Microsoft Learn: Windows güvenlik denetim olayları", url: "https://learn.microsoft.com/en-us/windows/security/threat-protection/auditing/security-auditing-overview", type: "doc", why: "Windows güvenlik olaylarını anlamak için", level: "orta", lang: "EN" }
    ],
    sources: [CT]
  };

  /* 22 ──────────────────────────────────────────── Kimlik ve erişim */
  L[22] = {
    hook: "Güvenlik duvarı ağı korur, kimlik yönetimi kapıdan kimin girebileceğini belirler. Bugün saldırıların çoğu kimlik üzerinden olur.",
    homework: "Önemli üç hesabında (e-posta, banka, sosyal medya) MFA'nın açık olup olmadığına bak. Kapalıysa uygulama tabanlı MFA'yı aç.",
    warmup: {
      recap: [{ point: "AAA: kimlik doğrulama, yetkilendirme, kayıt.", example: "Giriş, izinler, loglar" }],
      concepts: [
        { term: "MFA", tr: "Çok faktörlü doğrulama", summary: "Birden çok farklı kanıtla kimlik doğrulama.", example: "Parola + telefon kodu" },
        { term: "RBAC", tr: "Role dayalı erişim", summary: "İzinleri kişiye değil role bağlamak.", example: "Muhasebeci rolü" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Çalışan parolasını sahte bir sitede girdi. MFA açıksa saldırgan tek başına parolayla giremez. MFA, en ucuz ve etkili güvenlik önlemlerinden biridir." },
      { t: "steps", h: "Doğrulama faktörleri", items: [
        "Bildiğin bir şey: parola, PIN.",
        "Sahip olduğun bir şey: telefon, güvenlik anahtarı, akıllı kart.",
        "Olduğun bir şey: parmak izi, yüz (biyometri).",
        "Bulunduğun yer / yaptığın davranış: konum, davranış kalıbı (ek faktör).",
        "İki parola birden MFA değildir: aynı faktör türü iki kez kullanılmış olur."
      ] },
      { t: "steps", h: "Erişim kontrol modelleri", items: [
        "DAC: kaynak sahibi izin verir (dosya sahibi paylaşır).",
        "MAC: merkezi etiketlere (gizlilik düzeyi) göre zorunlu erişim; askeri tarzı.",
        "RBAC: izinler role bağlıdır. En yaygın kurumsal yöntem.",
        "ABAC: kullanıcı, kaynak ve bağlam özelliklerine (saat, konum, cihaz) göre karar.",
        "Kural tabanlı: önceden tanımlı kurallar (güvenlik duvarı ACL)."
      ] },
      { t: "steps", h: "Kimlik teknolojileri", items: [
        "SSO (tek oturum açma): bir kez giriş, birçok uygulama. SAML, OIDC, OAuth.",
        "Federasyon: farklı kurumların kimliklerine güvenmesi.",
        "Dizin hizmeti: Active Directory, LDAP.",
        "PAM (ayrıcalıklı erişim yönetimi): yönetici hesaplarını kasada tutup kısa süreli verir.",
        "Parolasız: FIDO2/passkey."
      ] },
      { t: "box", h: "İlkeler", text: "En az yetki (least privilege), görev ayrımı (separation of duties), 'bilmesi gereken kadar' (need to know). Çalışan görev değiştirince ya da ayrılınca yetkiler güncellenmeli (joiner-mover-leaver)." },
      { t: "warn", h: "Tuzak", text: "SMS kodu MFA'dır ama en zayıf biçimlerindendir (SIM swap). Mümkünse uygulama tabanlı kod ya da donanım anahtarı (FIDO2) kullan." },
      { t: "steps", h: "Hesap türleri, Kerberos ve yetki yönetimi (V8)", items: [
        "gMSA (grup yönetilen hizmet hesabı): Windows etki alanında parolası otomatik oluşturulan ve düzenli döndürülen servis hesabı; hiçbir insan parolayı bilmez, elle değiştirme ve paylaşma riski ortadan kalkar.",
        "Ayrıcalık birikimi (privilege creep): kişi rol değiştirdikçe eski yetkileri silinmez ve zamanla gereğinden fazla yetki toplar. Çözüm: rol değişince yetkileri temizlemek ve düzenli erişim gözden geçirmesi.",
        "Acil erişim (break-glass) hesabı: SSO/MFA çökerse kullanılmak üzere ayrılmış, çok sıkı korunan ve her kullanımı alarm üreten hesap. Kimlik kanıtlama (identity proofing): hesap açılırken kişinin gerçekten o kişi olduğunun doğrulanması; MFA yedek kodları telefon kaybında kullanılır ve güvenli saklanmalıdır.",
        "Kerberos: etki alanında bilet tabanlı SSO. Kullanıcı bir kez anahtar dağıtım merkezinde (KDC) doğrulanır ve bilet verme bileti (TGT) alır; her servis için TGT ile servis bileti istenir, parola servislere gitmez. İstemci ile KDC saatleri birbirine yakın olmalıdır."
      ] }
    ],
    objectives: [
      { id: "h1", text: "Bildiğin, sahip olduğun ve olduğun faktör türlerini ayırıp MFA'yı doğru tanımlayabilirsin." },
      { id: "h2", text: "DAC, MAC, RBAC ve ABAC modellerini ayırt edebilirsin." },
      { id: "h3", text: "En az yetki ve görev ayrımı gibi ilkeleri bir örneğe uygulayabilirsin." },
      { id: "h4", text: "gMSA, ayrıcalık birikimi, acil erişim hesabı ve Kerberos bilet mantığı gibi kimlik yönetimi kavramlarını ayırt edebilirsin." }
    ],
    summary: [
      "MFA farklı faktör türlerini birleştirir: bildiğin, sahip olduğun, olduğun.",
      "İki parola birden MFA değildir; aynı faktör türü iki kez kullanılmış olur.",
      "RBAC izinleri role bağlar ve en yaygın kurumsal yöntemdir; DAC, MAC, ABAC ve kural tabanlı modeller de vardır.",
      "SSO, federasyon, dizin hizmeti ve PAM kimlik yönetiminin temel teknolojileridir.",
      "SMS kodu MFA'dır ama zayıftır (SIM swap); uygulama kodu ya da FIDO2 anahtarı tercih edilir."
    ],
    quiz: [
      { id: "2a683325", q: "Parola + telefondaki uygulama kodu hangi faktör türlerini birleştirir?", options: ["Bildiğin + sahip olduğun", "Bildiğin + bildiğin", "Olduğun + olduğun", "Hepsi aynı"], obj: "h1" },
      { id: "acf1bbbe", q: "İzinleri kişiye değil role bağlayan model hangisidir?", options: ["RBAC", "DAC", "MAC", "NAT"], obj: "h2" },
      { id: "56c40315", q: "Parola ve güvenlik sorusu birlikte kullanılırsa bu MFA midir?", options: ["Hayır, ikisi de 'bildiğin' faktörü", "Evet", "Sadece bankalarda", "Sadece mobilde"], obj: "h1" },
      { id: "82350d58", q: "Bir kullanıcının kendi görevini yapmak için gereken minimum yetkiye sahip olması hangi ilkedir?", options: ["En az yetki (least privilege)", "Görev ayrımı", "Tek oturum açma", "Federasyon"], obj: "h3" },
      { id: "cbf98d1d", q: "Muhasebeden satın almaya geçen bir çalışan, her iki birimin uygulamalarına hâlâ yetkili. Yıllar içinde çok sayıda kişi bu şekilde gereğinden fazla yetki biriktirmiş. Bu duruma ne denir ve en iyi önlem nedir?", options: ["Ayrıcalık yükseltme saldırısı; parola uzunluğunu artırmak", "Görev rotasyonu; çalışanları zorunlu tatile göndermek", "Gölge BT; onaysız uygulamaları engellemek", "Ayrıcalık birikimi (privilege creep); rol değişikliğinde eski yetkileri kaldırmak ve düzenli erişim gözden geçirmesi yapmak"], obj: "h4" },
      { id: "03ac49b8", q: "Bir kurum Windows ortamındaki servis hesabının parolasını hiçbir insanın bilmemesini ve sistemin düzenli olarak otomatik döndürmesini istiyor. Hangi çözüm uygundur?", options: ["Paylaşılan yönetici hesabı", "Grup yönetilen hizmet hesabı (gMSA)", "Acil erişim (break-glass) hesabı", "Parolasız yerel hesap"], obj: "h4" },
      { id: "8cfef998", q: "Active Directory etki alanında kullanıcı bir kez oturum açtıktan sonra dosya sunucusuna ve intranete parola sormadan erişiyor. Parola servislere gönderilmeden kimlik hangi mekanizmayla kanıtlanıyor?", options: ["Kerberos biletleri (TGT ve servis bileti)", "Her serviste hash'lenmiş parolanın yeniden gönderilmesi", "Her bağlantıda zorunlu istemci sertifikası", "RADIUS hesap kayıtları (accounting)"], obj: "h4" }
    ],
    interview: [
      { q: "MFA neden önemlidir?", a: "Parola çalınsa ya da tahmin edilse bile saldırganın ikinci bir faktöre ihtiyacı olur. Kimlik tabanlı saldırıların çoğunu engeller. Tercihen uygulama tabanlı kod ya da FIDO2 anahtar kullanılır." },
      { q: "RBAC nedir?", a: "İzinlerin tek tek kişilere değil rollere verildiği erişim modelidir. Kullanıcıya rol atanır, rol değişince izinler birlikte değişir; yönetimi kolaylaştırır ve en az yetkiyi destekler." }
    ],
    vocab: [
      { term: "Authentication", tr: "kimlik doğrulama", ex: "Authentication failed." },
      { term: "Authorization", tr: "yetkilendirme", ex: "You lack authorization." },
      { term: "SSO", tr: "tek oturum açma", ex: "We use SSO for apps." },
      { term: "Least privilege", tr: "en az yetki", ex: "Apply least privilege." },
      { term: "Passkey", tr: "parolasız anahtar", ex: "Use a passkey." }
    ],
    resources: [
      res(PM, "Kimlik ve erişim yönetimi"),
      { title: "CISA: MFA'yı açın", url: "https://www.cisa.gov/secure-our-world/turn-mfa", type: "doc", why: "MFA'nın neden ve nasıl açılacağı", level: "başlangıç", lang: "EN" }
    ],
    sources: [CT]
  };

  /* 23 ──────────────────────────────────────────── Otomasyon */
  L[23] = {
    hook: "Aynı 20 adımı elle 200 kez yapmak hata demektir. Güvenlikte otomasyon hız ve tutarlılık getirir.",
    homework: "Sık yaptığın tekrar eden bir işi (ör. kullanıcı oluşturma, yedek kontrolü) adım adım yaz. Hangi adımları bir betikle otomatikleştirebilirsin?",
    warmup: {
      recap: [{ point: "SOAR alarmdan sonra müdahaleyi otomatikleştirir.", example: "Hesabı kilitle" }],
      concepts: [
        { term: "Otomasyon", tr: "İşi yazılıma yaptırmak", summary: "Tekrarlı güvenlik görevlerini betik ve araçlarla otomatik çalıştırmak.", example: "Otomatik yama" },
        { term: "IaC", tr: "Kod olarak altyapı", summary: "Sunucu ve ağı kodla tanımlayıp tekrar edilebilir kurmak.", example: "Terraform, CloudFormation" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "İşten ayrılan çalışanın 12 sistemdeki hesabı kapatılacak. Elle yapılırsa biri unutulur. Otomasyon aynı adımları her seferinde aynı sırayla ve loglayarak yapar." },
      { t: "steps", h: "Kullanım alanları", items: [
        "Kullanıcı ve yetki yönetimi: hesap açma/kapama, rol atama.",
        "Güvenlik duvarı kuralları ve ağ yapılandırması.",
        "Yama dağıtımı, yapılandırma uyumu kontrolü.",
        "Alarm ve olay müdahalesi (SOAR playbook'ları).",
        "Zafiyet tarama ve ticket oluşturma.",
        "CI/CD hattına güvenlik testi eklemek (SAST, bağımlılık taraması)."
      ] },
      { t: "steps", h: "Runbook ve playbook (V8)", items: [
        "Runbook: rutin bir operasyonun (yama dağıtımı, hesap kapatma, yedek geri yükleme) adım adım yazılı prosedürüdür; tutarlıdır ve çoğu zaman otomasyona dönüştürülür.",
        "Playbook: belirli bir olay türünde (ör. fidye yazılımı) kimin neyi hangi sırayla yapacağını anlatan müdahale senaryosudur; SOAR bu senaryoları otomatik çalıştırabilir.",
        "İkisi de çalışan kişiden bağımsız tekrarlanabilir sonuç sağlar; değişiklik olunca güncellenmeli ve tatbikatla denenmelidir."
      ] },
      { t: "steps", h: "Faydalar", items: [
        "Hız ve ölçeklenebilirlik, insan hatasını azaltma.",
        "Tutarlı uygulama ve denetlenebilir kayıt.",
        "Uzman zamanını yüksek değerli işlere ayırma."
      ] },
      { t: "steps", h: "Riskler", items: [
        "Karmaşıklık, yanlış betik kitlesel hasar verir.",
        "Tek hata noktası: otomasyon hesabı çalınırsa tehlikeli.",
        "Teknik borç: bakımsız betikler ve belgelenmemiş akışlar.",
        "Yüksek maliyet ve beceri gereksinimi."
      ] },
      { t: "box", h: "Araç örnekleri", text: "Betikleme (PowerShell, Python, Bash), yapılandırma yönetimi (Ansible), IaC (Terraform), API'ler ve webhook'lar, SOAR platformları." },
      { t: "warn", h: "Tuzak", text: "Otomasyon yetkisi geniş tutulursa saldırganın en iyi hedefi olur. Otomasyon hesaplarına en az yetki ver, sırları kasada tut, değişiklikleri sürüm kontrolünde incele." },
      { t: "steps", h: "Yapay zekâ destekli otomasyon (V8)", items: [
        "Kullanım alanları: kullanıcı ve kaynak sağlama, istenen durumu koruma, anomali tespiti, bilet yönetimi. Yapay zekâ ile: sohbet botu (analiste yardımcı), tahmine dayalı analiz, yapay zekâ destekli taban çizgisi (normal davranışı sürekli öğrenip sapmayı işaretler) ve ajan tabanlı (agentic) yapay zekâ (hedef verilince araçları kendisi çağırıp çok adımlı iş yapar).",
        "Korkuluk (guardrail): otomasyonun yapabileceklerini sınırlayan kurallar; izinli eylem listesi, onay eşiği, geri alma ve insan onayı. Ajan yapay zekâda yüksek etkili eylemlerden önce insan onayı şarttır.",
        "Hedeflenen sonuçlar: verimlilik, taban çizgisi uygulama, sürekli iyileştirme, daha az kesinti, proaktiflik. Riskler: karmaşıklık, süreç riski, tek hatanın toplu hasar vermesi."
      ] }
    ],
    objectives: [
      { id: "h1", text: "Güvenlikte otomasyonun kullanım alanlarını, yapay zekâ destekli örneklerini (taban çizgisi, ajan, sohbet botu) ve faydalarını sayabilirsin." },
      { id: "h2", text: "IaC, Ansible, betikleme ve SOAR gibi araç örneklerini tanıyabilirsin." },
      { id: "h3", text: "Otomasyonun risklerini (toplu hasar, tek hata noktası, teknik borç) açıklayabilirsin." },
      { id: "h4", text: "Otomasyon hesapları için en az yetki ve sırları kasada tutma yaklaşımını uygulayabilirsin." },
      { id: "h5", text: "Runbook ile playbook'u amaçlarına göre ayırt edebilirsin." }
    ],
    summary: [
      "Otomasyon hesap yönetimi, yama, güvenlik duvarı kuralları ve olay müdahalesi gibi işleri tutarlı yapar.",
      "Faydaları hız, ölçeklenebilirlik, insan hatasını azaltma ve denetlenebilir kayıttır.",
      "Riskleri: yanlış betikle kitlesel hasar, çalınan otomasyon hesabı, teknik borç ve maliyet.",
      "Araçlar: PowerShell, Python, Bash, Ansible, Terraform (IaC), API ve webhook, SOAR.",
      "Otomasyon hesaplarına en az yetki ver, sırları kasada tut, değişiklikleri sürüm kontrolünde incele."
    ],
    quiz: [
      { id: "d94b5a13", q: "Ekip, bir sunucuyu yamalama işini her seferinde aynı adımlarla yapmak için adım adım yazılı bir rutin prosedür hazırlıyor ve sonra otomasyona dönüştürmeyi planlıyor. Bu belge hangisidir?", options: ["Runbook", "Olay sonrası raporu (PIR)", "Risk kaydı (risk register)", "İş kapsamı belgesi (SOW)"], obj: "h5" },
      { id: "c195b94c", q: "Otomasyonun güvenlik açısından temel faydası nedir?", options: ["Tutarlılık ve hız, insan hatasını azaltma", "Parolaları kaldırmak", "Ağı kapatmak", "Log tutmamak"], obj: "h1" },
      { id: "a9781c87", q: "Altyapıyı kodla tanımlayıp tekrar edilebilir kurmaya ne denir?", options: ["IaC", "SIEM", "DLP", "RAID"], obj: "h2" },
      { id: "a92107b2", q: "Otomasyonun bir riski hangisidir?", options: ["Hatalı betiğin toplu hasar vermesi", "Ağın yavaşlaması", "Daha çok parola", "Sertifika süresi"], obj: "h3" },
      { id: "ef57b5fe", q: "Otomasyon hesapları için en doğru yaklaşım nedir?", options: ["En az yetki ve sırların kasada tutulması", "Domain admin yetkisi", "Parolayı betiğe yazmak", "Ortak kullanıcı"], obj: "h4" },
      { id: "0cd6d9f7", q: "SOC, yapay zekâ ajanının şüpheli hesapları kendiliğinden devre dışı bırakabilmesini istiyor. Yanlış pozitif durumunda iş kesintisi riskini azaltan en uygun tasarım hangisidir?", options: ["Ajana tüm kimlik sistemlerinde geniş yönetici yetkisi vermek", "Eylem kaydını kapatıp yalnızca sonucu raporlatmak", "Ajanı kuralsız bırakıp hatalarını olay sonrası düzeltmek", "Yüksek etkili eylemlerden önce insan onayı ve izinli eylem listesi (guardrail) uygulamak"], obj: "h1" },
      { id: "f3d54d98", q: "Bir ekip, normal oturum açma saatlerini ve veri aktarım hacimlerini sürekli öğrenen, bunlardan sapmaları işaretleyen bir model kullanıyor. Bu yaklaşım nedir?", options: ["Yapay zekâ destekli taban çizgisi ile anomali tespiti", "İmza tabanlı tespit", "Statik erişim kontrol listesi (ACL)", "Masa başı tatbikat"], obj: "h1" }
    ],
    interview: [
      { q: "Güvenlikte otomasyon nerede kullanılır?", a: "Kullanıcı yaşam döngüsü, yama ve yapılandırma uyumu, alarm sonrası müdahale (SOAR), zafiyet tarama ve ticket akışı, CI/CD'de güvenlik testleri." },
      { q: "Otomasyon riskleri nelerdir?", a: "Hatalı betik toplu hasar verebilir, otomasyon hesabı yüksek yetkiyle çalıntı hedefi olabilir ve bakımsız betikler teknik borca dönüşür. Bunu kod incelemesi, en az yetki ve test ile yönetirim." }
    ],
    vocab: [
      { term: "Automation", tr: "otomasyon", ex: "Automation reduces errors." },
      { term: "Playbook", tr: "müdahale senaryosu", ex: "Run the response playbook." },
      { term: "Script", tr: "betik", ex: "Write a script." },
      { term: "Workflow", tr: "iş akışı", ex: "Create a workflow." },
      { term: "API", tr: "program arayüzü", ex: "Use the API to disable the account." }
    ],
    resources: [res(PM, "Güvenlik operasyonlarında otomasyon"), res(NISTG, "Müdahale ve kurtarma")],
    sources: [CT]
  };

  /* 24 ──────────────────────────────────────────── Olay müdahalesi */
  L[24] = {
    hook: "Olay anında plan yoksa herkes aynı anda farklı şey yapar. Olay müdahalesi sakin kalmanın prosedürüdür.",
    homework: "Şirketinde 'şüpheli e-posta' bildirimi kime yapılıyor? Yoksa, 5 satırlık bir bildirim akışı yaz: kim, nereye, ne zaman, hangi bilgiyle.",
    warmup: {
      recap: [{ point: "SIEM alarm üretir; alarmdan sonra ne yapılacağını olay müdahale planı söyler.", example: "Playbook" }],
      concepts: [
        { term: "Olay (incident)", tr: "Güvenlik ihlali", summary: "Bilgi güvenliğini tehdit eden gerçekleşmiş ya da gerçekleşme ihtimali yüksek olay.", example: "Fidye yazılımı" },
        { term: "IR planı", tr: "Müdahale planı", summary: "Rolleri, adımları ve iletişimi önceden belirleyen belge.", example: "NIST SP 800-61 Rev. 3" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Çalışan: 'Bilgisayarım garip davranıyor.' Önce ne yapılır? Kanıtı bozmadan ayır, kaydet, bildir, kapsamı belirle. Plan ve sıra bilinirse panikle yapılan hamleler (yanlışlıkla kanıtı silme) önlenir." },
      { t: "steps", h: "Müdahale aşamaları", items: [
        "Hazırlık (preparation): plan, ekip, araçlar, eğitim, iletişim listesi.",
        "Tespit ve analiz (detection & analysis): olay mı, değil mi? Kapsam ve etki nedir?",
        "Sınırlama (containment): yayılmayı durdur. Kısa vadeli (ağdan ayır) ve uzun vadeli (yama, geçici çözüm).",
        "Yok etme (eradication): zararlıyı ve kök nedeni kaldır.",
        "Kurtarma (recovery): sistemleri temizden geri getir, izle.",
        "Ders çıkarma (lessons learned): toplantı, rapor, iyileştirme."
      ] },
      { t: "steps", h: "İlk anda yapılacaklar", items: [
        "Olayı kaydet: ne zaman, kim fark etti, ne görüldü.",
        "Kanıtı koru: cihazı kapatmadan önce gerekiyorsa ağdan ayır; bellek ve loglar kaybolmasın.",
        "Doğru kişilere haber ver: güvenlik ekibi, yönetim, gerekirse hukuk ve iletişim.",
        "Önem düzeyi ata: etkilenen sistem, veri ve kullanıcı sayısına göre."
      ] },
      { t: "box", h: "Roller", text: "Olay yöneticisi (koordinasyon), teknik analist, iletişim sorumlusu, hukuk ve KVKK sorumlusu, yönetim temsilcisi. Hangi durumda dış bildirim (düzenleyici, müşteri) gerektiği önceden bilinmeli." },
      { t: "steps", h: "Sınırlama örnekleri", items: [
        "Etkilenen cihazı ağdan ayır, hesabı devre dışı bırak, kötü IP/alan adını engelle.",
        "Kritik sistemlerde önce iş etkisini değerlendir.",
        "Kanıt toplamadan temizlik yapma (kök neden kaybolur)."
      ] },
      { t: "warn", h: "Tuzak", text: "Sınavda sıralama sorulur: Hazırlık, Tespit ve Analiz, Sınırlama, Yok etme, Kurtarma, Ders çıkarma. Sınırlama, yok etmeden önce gelir; önce yayılmayı durdurursun." },
      { t: "steps", h: "Müzakere ve dış bildirim (V8)", items: [
        "Fidye ödeme kararı yalnızca teknik bir karar değildir: hukuk, üst yönetim, sigorta, kolluk ve gerekirse uzman müzakereci birlikte değerlendirir. Ödemek verinin geri geleceğini garanti etmez ve tekrar hedef olma riskini artırır. Önce sınırlama yapılır, yedeklerin sağlamlığı kontrol edilir.",
        "Bildirim ve dış raporlama: paydaşlar, müşteriler, kolluk ve düzenleyici. Kişisel veri ihlallerinde yasal bildirim süreleri (ör. GDPR'da 72 saat) olay doğrulanır doğrulanmaz hukukla birlikte yönetilir.",
        "Olay sonrası: kök neden analizi (RCA) ve olay sonrası rapor (PIR); hazırlık tarafında eğitim, masa başı tatbikat, simülasyon ve playbook.",
        "Kaynak notu: NIST SP 800-61 Rev. 3 (Nisan 2025), Rev. 2'nin yerini alan güncel rehberdir ve olay müdahalesini NIST CSF 2.0 işlevleriyle ilişkilendirir. Sınavda ve sektörde yaygın olan hazırlık-tespit-sınırlama-yok etme-kurtarma-ders çıkarma sırası bu derste temel alınır."
      ] }
    ],
    objectives: [
      { id: "h1", text: "Olay müdahalesinin altı aşamasını doğru sırayla sıralayabilirsin." },
      { id: "h2", text: "Sınırlama, yok etme ve kurtarma aşamalarını ayırt edebilir; fidye ve veri ihlali olaylarında müzakere ile yasal dış bildirim kararını doğru verebilirsin." },
      { id: "h3", text: "Olay sonrası ders çıkarma toplantısının, kök neden analizinin ve olay sonrası raporun amacını açıklayabilirsin." },
      { id: "h4", text: "Şüpheli bir cihazda ilk anda yapılacak adımları (kaydet, kanıtı koru, bildir) uygulayabilirsin." }
    ],
    summary: [
      "Aşamalar: hazırlık, tespit ve analiz, sınırlama, yok etme, kurtarma, ders çıkarma.",
      "Sınırlama yok etmeden önce gelir; önce yayılma durdurulur.",
      "İlk anda olay kaydedilir, kanıt korunur, doğru kişilere haber verilir, önem düzeyi atanır.",
      "Roller: olay yöneticisi, teknik analist, iletişim, hukuk/KVKK ve yönetim temsilcisi.",
      "Kanıt toplamadan temizlik yapılmaz; aksi halde kök neden kaybolur."
    ],
    quiz: [
      { id: "1d446777", q: "Olay müdahalesinde ilk aşama hangisidir?", options: ["Hazırlık", "Sınırlama", "Yok etme", "Kurtarma"], obj: "h1" },
      { id: "0173ae17", q: "Yayılmayı durdurmak (örn. cihazı ağdan ayırmak) hangi aşamadır?", options: ["Sınırlama (containment)", "Kurtarma", "Ders çıkarma", "Hazırlık"], obj: "h2" },
      { id: "e40f1fb4", q: "Olay kapandıktan sonra yapılan toplantıya ne ad verilir?", options: ["Ders çıkarma (lessons learned)", "Sınırlama", "Tespit", "Hazırlık"], obj: "h3" },
      { id: "34031ac9", q: "Şüpheli bilgisayarda ilk yapılması gereken doğru adım hangisidir?", options: ["Ağdan ayırıp güvenlik ekibine bildirmek", "Diski formatlamak", "Sessizce kullanmaya devam etmek", "Parolayı e-postayla göndermek"], obj: "h4" },
      { id: "97f8de5c", q: "Fidye yazılımı olayında yönetici 'ödeyelim, hemen çözülsün' diyor. En doğru yaklaşım hangisidir?", options: ["BT ekibinin hemen kendi başına ödemesi", "Kararı hukuk, üst yönetim, sigorta ve kolluk ile birlikte vermek; ödemenin veri kurtarmayı garanti etmediğini hesaba katmak", "Ödemeyi gizli tutup kolluğa ve sigortaya hiç haber vermemek", "Saldırganın talimatlarına uyup yedekleri silmek"], obj: "h2" },
      { id: "86f5c50f", q: "Bir fidye olayında müşteri kişisel verilerinin çalındığı doğrulandı ve yasal bildirim süresi işlemeye başladı. Müdahale ekibi ne yapmalıdır?", options: ["Olay tamamen çözülene kadar bildirimi ertelemek", "Yalnızca basın açıklaması yayımlamak", "Hukuk ve uyum ekibiyle birlikte düzenleyiciye ve etkilenen kişilere yasal süre içinde bildirim yapmak", "Yalnızca iç BT ekibini bilgilendirmek"], obj: "h2" },
      { id: "c018eaae", q: "Olay müdahalesinde hangi İKİ adım sınırlandırma (containment) aşamasına girer?", options: ["Etkilenen cihazı ağdan izole etmek", "Personele yıllık farkındalık eğitimi planlamak", "Sistemi temiz yedekten geri yüklemek", "Olay sonrası değerlendirme raporu yazmak", "Ele geçirilen hesabı devre dışı bırakmak"], multi: 2, obj: "h2" }
    ],
    interview: [
      { q: "Olay müdahale aşamalarını say.", a: "Hazırlık, tespit ve analiz, sınırlama, yok etme, kurtarma ve ders çıkarma. Önce yayılmayı durdurur, sonra kök nedeni temizler, sistemi güvenli şekilde geri getirir ve süreci iyileştiririm." },
      { q: "Olay sırasında kanıtı nasıl korursun?", a: "Önce loglar ve gerekirse bellek görüntüsü alırım, cihazı gereksiz kapatmam, her adımı zaman damgasıyla kaydederim ve kanıt zincirini (chain of custody) belgelerim." }
    ],
    vocab: [
      { term: "Incident", tr: "olay / ihlal", ex: "Report the incident." },
      { term: "Containment", tr: "sınırlama", ex: "Containment is the first priority." },
      { term: "Eradication", tr: "yok etme", ex: "Eradication removes the malware." },
      { term: "Escalate", tr: "üst birime iletmek", ex: "Escalate to the security team." },
      { term: "Lessons learned", tr: "çıkarılan dersler", ex: "Hold a lessons learned meeting." }
    ],
    resources: [
      res(PM, "Olay müdahale süreci"),
      { title: "NIST SP 800-61 Rev. 3: Incident Response Recommendations and Considerations for Cybersecurity Risk Management", url: "https://csrc.nist.gov/pubs/sp/800/61/r3/final", type: "doc", why: "Olay müdahalesi için güncel rehber (2025, Rev. 2'nin yerini aldı)", level: "orta", lang: "EN" }
    ],
    sources: [CT]
  };
})();

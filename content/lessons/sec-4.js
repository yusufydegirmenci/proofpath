/* Siber güvenlik (Security+ SY0-701 temelli) · sabit dersler 19-24 */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).sec = (window.PP_LESSONS.sec || {}));
  var CT = { title: "CompTIA Security+ sınav hedefleri (SY0-701)", url: "https://www.comptia.org/certifications/security" };
  var PM = { title: "Professor Messer: Security+ SY0-701 (ücretsiz video kursu)", url: "https://www.professormesser.com/", type: "video", length: "Çok bölümlü", level: "başlangıç", lang: "EN" };
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
    quiz: [
      { q: "Varlık yönetiminin güvenlik açısından ilk faydası nedir?", options: ["Neyin korunması gerektiğini bilmek", "İnterneti hızlandırmak", "Parolaları güçlendirmek", "Lisansı ucuzlatmak"], answer: "Neyin korunması gerektiğini bilmek", why: "Envanter yoksa yama ve izleme eksik kalır." },
      { q: "Diski kurtarılamaz hale getirmenin geleneksel fiziksel yöntemi hangisidir?", options: ["Parçalama (shredding)", "Format atmak", "Dosyayı silmek", "Yeniden adlandırmak"], answer: "Parçalama (shredding)", why: "Fiziksel imha, veri kurtarmayı engeller." },
      { q: "Her varlık için atanması gereken sorumlu kişiye ne denir?", options: ["Owner (sahip)", "Attacker", "Auditor", "Proxy"], answer: "Owner (sahip)", why: "Sahip, varlığın korunmasından ve kararlarından sorumludur." },
      { q: "Normal 'dosyayı sil' komutu neden yeterli değildir?", options: ["Veri diskte kalır ve kurtarılabilir", "Dosya hemen yeniden oluşur", "Disk bozulur", "Ağı yavaşlatır"], answer: "Veri diskte kalır ve kurtarılabilir", why: "Silme genelde sadece dizin kaydını kaldırır." }
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
      { t: "warn", h: "Tuzak", text: "Tarama sonuçları 'iş bitti' demek değildir. Raporu okuyup önceliklendirmek ve kapatılanı doğrulamak asıl işin kendisidir." }
    ],
    quiz: [
      { q: "Kimlik bilgisiyle yapılan (credentialed) taramanın avantajı nedir?", options: ["Daha doğru ve derin sonuç verir", "Daha hızlı olur", "Ağa yük bindirmez", "Yama gerektirmez"], answer: "Daha doğru ve derin sonuç verir", why: "Sistemin içini görebildiği için yanlış pozitifleri azaltır." },
      { q: "Zafiyet düzeltildikten sonra son adım nedir?", options: ["Yeniden tarayıp doğrulamak", "Raporu silmek", "Servisi kapatmak", "Parolayı değiştirmek"], answer: "Yeniden tarayıp doğrulamak", why: "Kapandığı kanıtlanmalı." },
      { q: "Yama uygularken en doğru yaklaşım hangisidir?", options: ["Önce test, sonra kademeli yaygınlaştırma", "Hepsine aynı anda", "Hiç test etmeden", "Sadece yılda bir"], answer: "Önce test, sonra kademeli yaygınlaştırma", why: "Yama bazen servisi bozabilir; rollback planı hazır olmalı." },
      { q: "CISA KEV listesi ne içerir?", options: ["Aktif olarak sömürülen bilinen zafiyetler", "Tüm CVE'ler", "Parolalar", "Sertifika listesi"], answer: "Aktif olarak sömürülen bilinen zafiyetler", why: "Sömürülmekte olan açıklar önceliklidir." }
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
      { t: "warn", h: "Tuzak", text: "Alarm yorgunluğu: çok fazla düşük kaliteli alarm, gerçek olayın gözden kaçmasına yol açar. Kuralları sürekli ayarla." }
    ],
    quiz: [
      { q: "Farklı kaynaklardan gelen olayları birleştirip şüpheli desen bulmaya ne denir?", options: ["İlişkilendirme (correlation)", "Yedekleme", "Şifreleme", "Maskeleme"], answer: "İlişkilendirme (correlation)", why: "SIEM'in temel işlevlerinden biridir." },
      { q: "Log analizinde zaman damgalarının doğru olması için hangi servis önemlidir?", options: ["NTP", "DHCP", "SMTP", "FTP"], answer: "NTP", why: "Saat senkronizasyonu, olayları doğru sıraya dizmek için gerekir." },
      { q: "Alarmdan sonra müdahaleyi otomatikleştiren çözüm hangisidir?", options: ["SOAR", "DLP", "NAT", "CDN"], answer: "SOAR", why: "Security Orchestration, Automation and Response." },
      { q: "Başarısız oturum açma olayı hangi Windows olay numarasıdır?", options: ["4625", "4624", "1102", "7045"], answer: "4625", why: "4625 başarısız, 4624 başarılı oturum açmadır." }
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
      { t: "warn", h: "Tuzak", text: "SMS kodu MFA'dır ama en zayıf biçimlerindendir (SIM swap). Mümkünse uygulama tabanlı kod ya da donanım anahtarı (FIDO2) kullan." }
    ],
    quiz: [
      { q: "Parola + telefondaki uygulama kodu hangi faktör türlerini birleştirir?", options: ["Bildiğin + sahip olduğun", "Bildiğin + bildiğin", "Olduğun + olduğun", "Hepsi aynı"], answer: "Bildiğin + sahip olduğun", why: "Parola bilgi, telefon sahip olunan şeydir." },
      { q: "İzinleri kişiye değil role bağlayan model hangisidir?", options: ["RBAC", "DAC", "MAC", "NAT"], answer: "RBAC", why: "Role-Based Access Control." },
      { q: "Parola ve güvenlik sorusu birlikte kullanılırsa bu MFA midir?", options: ["Hayır, ikisi de 'bildiğin' faktörü", "Evet", "Sadece bankalarda", "Sadece mobilde"], answer: "Hayır, ikisi de 'bildiğin' faktörü", why: "Farklı faktör türleri gerekir." },
      { q: "Bir kullanıcının kendi görevini yapmak için gereken minimum yetkiye sahip olması hangi ilkedir?", options: ["En az yetki (least privilege)", "Görev ayrımı", "Tek oturum açma", "Federasyon"], answer: "En az yetki (least privilege)", why: "Gereğinden fazla yetki riski artırır." }
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
      { t: "warn", h: "Tuzak", text: "Otomasyon yetkisi geniş tutulursa saldırganın en iyi hedefi olur. Otomasyon hesaplarına en az yetki ver, sırları kasada tut, değişiklikleri sürüm kontrolünde incele." }
    ],
    quiz: [
      { q: "Otomasyonun güvenlik açısından temel faydası nedir?", options: ["Tutarlılık ve hız, insan hatasını azaltma", "Parolaları kaldırmak", "Ağı kapatmak", "Log tutmamak"], answer: "Tutarlılık ve hız, insan hatasını azaltma", why: "Aynı işi her seferinde aynı şekilde yapar." },
      { q: "Altyapıyı kodla tanımlayıp tekrar edilebilir kurmaya ne denir?", options: ["IaC", "SIEM", "DLP", "RAID"], answer: "IaC", why: "Infrastructure as Code." },
      { q: "Otomasyonun bir riski hangisidir?", options: ["Hatalı betiğin toplu hasar vermesi", "Ağın yavaşlaması", "Daha çok parola", "Sertifika süresi"], answer: "Hatalı betiğin toplu hasar vermesi", why: "Ölçek hem faydadır hem risk." },
      { q: "Otomasyon hesapları için en doğru yaklaşım nedir?", options: ["En az yetki ve sırların kasada tutulması", "Domain admin yetkisi", "Parolayı betiğe yazmak", "Ortak kullanıcı"], answer: "En az yetki ve sırların kasada tutulması", why: "Otomasyon hesabı çalınırsa etkisi büyüktür." }
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
        { term: "IR planı", tr: "Müdahale planı", summary: "Rolleri, adımları ve iletişimi önceden belirleyen belge.", example: "NIST SP 800-61" }
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
      { t: "warn", h: "Tuzak", text: "Sınavda sıralama sorulur: Hazırlık, Tespit ve Analiz, Sınırlama, Yok etme, Kurtarma, Ders çıkarma. Sınırlama, yok etmeden önce gelir; önce yayılmayı durdurursun." }
    ],
    quiz: [
      { q: "Olay müdahalesinde ilk aşama hangisidir?", options: ["Hazırlık", "Sınırlama", "Yok etme", "Kurtarma"], answer: "Hazırlık", why: "Plan, ekip ve araçlar olaydan önce hazırlanır." },
      { q: "Yayılmayı durdurmak (örn. cihazı ağdan ayırmak) hangi aşamadır?", options: ["Sınırlama (containment)", "Kurtarma", "Ders çıkarma", "Hazırlık"], answer: "Sınırlama (containment)", why: "Önce zararın büyümesini durdurursun." },
      { q: "Olay kapandıktan sonra yapılan toplantıya ne ad verilir?", options: ["Ders çıkarma (lessons learned)", "Sınırlama", "Tespit", "Hazırlık"], answer: "Ders çıkarma (lessons learned)", why: "Süreci iyileştirmek için son aşamadır." },
      { q: "Şüpheli bilgisayarda ilk yapılması gereken doğru adım hangisidir?", options: ["Ağdan ayırıp güvenlik ekibine bildirmek", "Diski formatlamak", "Sessizce kullanmaya devam etmek", "Parolayı e-postayla göndermek"], answer: "Ağdan ayırıp güvenlik ekibine bildirmek", why: "Yayılmayı durdurur ve kanıtı korur." }
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
      { title: "NIST SP 800-61: Computer Security Incident Handling Guide", url: "https://csrc.nist.gov/pubs/sp/800/61/r2/final", type: "doc", why: "Olay müdahalesi için temel rehber", level: "orta", lang: "EN" }
    ],
    sources: [CT]
  };
})();

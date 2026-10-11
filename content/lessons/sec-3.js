/* Siber güvenlik (Security+ SY0-701 temelli) · sabit dersler 13-18 */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).sec = (window.PP_LESSONS.sec || {}));
  var CT = { title: "CompTIA Security+ sınav hedefleri (SY0-701)", url: "https://www.comptia.org/certifications/security" };
  var PM = { title: "Professor Messer: Security+ SY0-701 (ücretsiz video kursu)", url: "https://www.professormesser.com/", type: "video", length: "Çok bölümlü", level: "başlangıç", lang: "EN" };
  var NISTG = { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", type: "doc", level: "orta", lang: "EN" };
  function res(a, why) { var o = {}; for (var k in a) o[k] = a[k]; o.why = why; return o; }

  /* 13 ──────────────────────────────────────────── Güvenlik duvarı */
  L[13] = {
    hook: "Güvenlik duvarı kapıdaki görevlidir: kim, nereden, hangi kapıdan geliyor? Listede yoksa geçiremez.",
    homework: "Windows Defender Güvenlik Duvarı'nı aç, gelen kurallardan 3'ünü incele. Hangi uygulama hangi port için izin vermiş?",
    warmup: {
      recap: [{ point: "Segmentasyonda bölgeler arası trafik kurallarla kontrol edilir.", example: "İç ağ, DMZ, internet" }],
      concepts: [
        { term: "Güvenlik duvarı", tr: "Trafik filtresi", summary: "Kurallara göre trafiğe izin verir ya da engeller.", example: "Kaynak, hedef, port, protokol" },
        { term: "Stateful", tr: "Durum izleyen", summary: "Bağlantının durumunu takip eder; dönüş trafiğine otomatik izin verir.", example: "Giden istek, gelen cevap" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Yeni web sunucusu kuruldu ama dışarıdan açılmıyor. Güvenlik duvarında 443 portuna izin kuralı yoktur. Kural mantığını bilmek, hem erişim sorununu çözmeyi hem de gereksiz delik açmamayı sağlar." },
      { t: "steps", h: "Güvenlik duvarı türleri", items: [
        "Paket filtreleme (stateless): her paketi tek tek kurala bakarak karar verir; hızlı ama bağlantıyı bilmez.",
        "Stateful: bağlantı tablosunu tutar; iç ağdan çıkan isteğe gelen cevabı otomatik kabul eder.",
        "Uygulama katmanı / proxy: içeriği ve uygulamayı inceler.",
        "NGFW (yeni nesil): uygulama tanıma, IPS, kullanıcı kimliği ve TLS inceleme içerir.",
        "WAF: web uygulaması isteklerini (SQLi, XSS) filtreler.",
        "Host tabanlı (cihaz üzerindeki) ve ağ tabanlı güvenlik duvarı."
      ] },
      { t: "steps", h: "Kural yazarken", items: [
        "Kural: kaynak, hedef, protokol, port, eylem (izin ver/engelle).",
        "Kurallar yukarıdan aşağıya okunur; ilk eşleşen çalışır.",
        "Sonda örtük 'hepsini engelle' (implicit deny) vardır.",
        "En az yetki: yalnızca gerekli trafiğe izin ver."
      ] },
      { t: "box", h: "Örnek kural", text: "İzin ver | Kaynak: any | Hedef: 10.0.5.20 (web) | TCP 443. Engelle | any | any | any. Böylece sadece HTTPS erişilir." },
      { t: "steps", h: "Diğer bileşenler", items: [
        "IDS: izler ve alarm verir (dedektif). IPS: hattın üstünde engeller (önleyici).",
        "Proxy: istemci adına dış dünyaya çıkar; içerik filtreleme sağlar.",
        "Web filtresi, DLP, URL filtreleme.",
        "Load balancer ve reverse proxy: sunucuları saklar, yükü dağıtır."
      ] },
      { t: "warn", h: "Tuzak", text: "'Şimdilik herkese aç, sonra kapatırız' kuralları kalıcı olur. Geçici kural açarken bitiş tarihi ve sahibi yaz. Eski kurallar düzenli temizlenmezse delikler birikir." }
    ],
    quiz: [
      { q: "Çıkan bağlantının dönüş trafiğine otomatik izin veren güvenlik duvarı türü hangisidir?", options: ["Stateful", "Stateless paket filtresi", "Hub", "Repeater"], answer: "Stateful", why: "Stateful bağlantı durumunu tutar." },
      { q: "Güvenlik duvarı kuralları nasıl işlenir?", options: ["Yukarıdan aşağıya, ilk eşleşen çalışır", "Aşağıdan yukarıya", "Rastgele", "Hepsi birlikte"], answer: "Yukarıdan aşağıya, ilk eşleşen çalışır", why: "Kural sırası önemlidir." },
      { q: "IDS ile IPS arasındaki fark nedir?", options: ["IDS alarm verir, IPS engeller", "IDS engeller, IPS alarm verir", "İkisi de aynıdır", "IDS sadece loglar tutar"], answer: "IDS alarm verir, IPS engeller", why: "IPS hattın üzerinde olup saldırıyı durdurabilir." },
      { q: "Web uygulamasını SQL injection ve XSS isteklerine karşı filtreleyen çözüm hangisidir?", options: ["WAF", "NAC", "VPN", "DHCP"], answer: "WAF", why: "Web Application Firewall HTTP isteklerini inceler." }
    ],
    interview: [
      { q: "Güvenlik duvarında en az yetki nasıl uygulanır?", a: "Varsayılan olarak her şeyi engeller, yalnızca gerekli kaynak, hedef, protokol ve port için izin kuralı yazarım. Kuralları belgeler ve düzenli gözden geçiririm." },
      { q: "Stateful ve stateless güvenlik duvarı farkı nedir?", a: "Stateless her paketi tek başına kurala göre değerlendirir. Stateful bağlantı durumunu takip eder, bu yüzden giden isteğe gelen cevaba otomatik izin verir ve daha güvenlidir." }
    ],
    vocab: [
      { term: "Firewall rule", tr: "güvenlik duvarı kuralı", ex: "Add a firewall rule for port 443." },
      { term: "Allow / Deny", tr: "izin ver / engelle", ex: "Deny all other traffic." },
      { term: "Inbound / Outbound", tr: "gelen / giden", ex: "Block inbound RDP." },
      { term: "Whitelist / Allow list", tr: "izin listesi", ex: "Use an allow list." },
      { term: "Proxy", tr: "vekil sunucu", ex: "Traffic goes through a proxy." }
    ],
    resources: [res(PM, "Güvenlik duvarı ve ağ cihazları"), res(NISTG, "Koruyucu kontroller")],
    sources: [CT]
  };

  /* 14 ──────────────────────────────────────────── VPN */
  L[14] = {
    hook: "VPN, halka açık internette özel bir tünel kazar: dışarıdan bakan sadece şifreli trafik görür.",
    homework: "Şirket VPN'inde split tunnel mi full tunnel mı kullanılıyor? Fark ne anlama geliyor, iki cümleyle yaz.",
    warmup: {
      recap: [{ point: "Hibrit şifreleme: asimetrikle anahtar anlaşılır, simetrikle veri şifrelenir.", example: "TLS, IPsec" }],
      concepts: [
        { term: "VPN", tr: "Sanal özel ağ", summary: "İnternet üzerinde şifreli tünel kurar.", example: "Evden şirket ağına bağlanma" },
        { term: "Tünel", tr: "Şifreli yol", summary: "Paketlerin başka bir paketin içinde taşınması.", example: "IPsec tüneli" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Çalışan kafede şirket dosyalarına ulaşmak istiyor. Halka açık Wi-Fi'da trafik dinlenebilir. VPN, trafiği şifreleyip güvenli bir tünelle şirkete taşır." },
      { t: "steps", h: "VPN türleri", items: [
        "Remote access VPN: tek kullanıcıdan şirket ağına (istemci yazılımı ile).",
        "Site-to-site VPN: iki ofis ağını birbirine bağlar (router/firewall arasında).",
        "SSL/TLS VPN: tarayıcı/istemci üzerinden, 443 ile; güvenlik duvarlarında kolay geçer.",
        "IPsec: ağ katmanında şifreleme; IKE ile anahtar anlaşması, ESP ile veri şifreleme."
      ] },
      { t: "steps", h: "Tünel şekilleri", items: [
        "Full tunnel: tüm trafik VPN'den geçer; izleme ve filtre kolay, bant genişliği daha çok.",
        "Split tunnel: yalnızca şirket trafiği VPN'den, kalanı doğrudan internetten; hızlı ama denetimi zayıf.",
        "Always-on VPN: cihaz ağa bağlanınca otomatik VPN."
      ] },
      { t: "box", h: "IPsec modları", text: "Transport modu: sadece veri (payload) şifrelenir, ana bilgisayarlar arası. Tunnel modu: tüm IP paketi yeni bir IP başlığıyla sarılır, site-to-site için kullanılır. AH bütünlük sağlar, ESP hem şifreleme hem bütünlük." },
      { t: "steps", h: "Güvenli VPN için", items: [
        "MFA zorunlu olsun.",
        "Güncel protokol (IKEv2, TLS 1.2+) ve güçlü şifreleme.",
        "VPN cihazını düzenli yamala; internete açık bir hedeftir.",
        "Bağlanan cihazın durumunu denetle (güncel mi, antivirüslü mü)."
      ] },
      { t: "warn", h: "Tuzak", text: "VPN sağlayıcısı 'tam güvenlik' vermez; sadece ağ yolunu şifreler. Ele geçirilmiş bir cihaz VPN ile bağlanırsa saldırganı da içeri taşır." }
    ],
    quiz: [
      { q: "İki ofisin ağlarını birbirine bağlayan VPN türü hangisidir?", options: ["Site-to-site", "Remote access", "Split tunnel", "Proxy"], answer: "Site-to-site", why: "Ofis ağları arasında kalıcı tünel kurar." },
      { q: "Yalnızca şirket trafiğini VPN'den geçiren, kalan trafiği doğrudan internetten çıkaran yapı hangisidir?", options: ["Split tunnel", "Full tunnel", "Air gap", "DMZ"], answer: "Split tunnel", why: "Tüm trafik değil, sadece belirlenen trafik tünele girer." },
      { q: "IPsec'te hem şifreleme hem bütünlük sağlayan bileşen hangisidir?", options: ["ESP", "AH", "DNS", "NAT"], answer: "ESP", why: "ESP şifreleme ve bütünlük sunar; AH sadece bütünlük/kimlik." },
      { q: "VPN güvenliği için zorunlu tutulması en doğru olan hangisidir?", options: ["MFA", "Parolayı e-postayla göndermek", "Eski protokol", "Herkese yönetici hakkı"], answer: "MFA", why: "Tek faktörlü VPN, çalınan parolayla içeri girişe açıktır." }
    ],
    interview: [
      { q: "Full tunnel ve split tunnel farkı nedir?", a: "Full tunnelda tüm trafik VPN'den geçer ve şirket tarafından izlenir. Split tunnelda sadece şirket trafiği tünele girer, geri kalanı doğrudan internete çıkar; hızlıdır ama denetim zayıftır." },
      { q: "Remote access VPN'i nasıl güvenli hale getirirsin?", a: "MFA, güncel protokol ve şifreleme, VPN cihazını düzenli yamalama, bağlanan cihazın sağlığını kontrol etme ve erişimi en az yetkiyle sınırlama." }
    ],
    vocab: [
      { term: "Tunnel", tr: "tünel", ex: "The VPN tunnel is up." },
      { term: "Remote access", tr: "uzaktan erişim", ex: "Enable remote access VPN." },
      { term: "Site-to-site", tr: "ofisten ofise", ex: "A site-to-site VPN links two offices." },
      { term: "Encapsulation", tr: "kapsülleme", ex: "ESP uses encapsulation." },
      { term: "Endpoint", tr: "uç nokta", ex: "Check the endpoint's health." }
    ],
    resources: [res(PM, "VPN ve IPsec bölümleri"), res(NISTG, "Uzaktan erişim güvenliği")],
    sources: [CT]
  };

  /* 15 ──────────────────────────────────────────── Bulut ve sanallaştırma */
  L[15] = {
    hook: "Bulutta güvenlik ortaklaşa yürür: kapı kilidini sağlayıcı verir, anahtarı kimin elinde tuttuğuna sen karar verirsin.",
    homework: "Kullandığın bir bulut hizmetinde (ör. Google Drive, AWS) 'paylaşım ve erişim ayarlarını' aç. Herkese açık bağlantı var mı bak.",
    warmup: {
      recap: [{ point: "Yanlış yapılandırma en yaygın zafiyet türlerinden biridir.", example: "Herkese açık depolama" }],
      concepts: [
        { term: "Paylaşılan sorumluluk", tr: "Ortak güvenlik yükü", summary: "Sağlayıcı altyapıyı, müşteri veri/erişim/yapılandırmayı korur.", example: "IaaS'ta işletim sistemi yaması müşteride" },
        { term: "Sanallaştırma", tr: "Tek donanımda çok sanal makine", summary: "Hypervisor, donanımı sanal makinelere böler.", example: "VMware, Hyper-V" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Bir geliştirici veritabanı yedeğini herkese açık bulut depolama kovasına koydu. Haberlere çıkan veri sızıntılarının çoğu hack değil, yanlış yapılandırmadır." },
      { t: "steps", h: "Hizmet modelleri", items: [
        "IaaS: altyapı (sanal makine, ağ, depolama). Sen işletim sistemini ve üstünü yönetirsin.",
        "PaaS: çalışma platformu. Sen uygulamayı ve veriyi yönetirsin.",
        "SaaS: hazır yazılım (e-posta, CRM). Sen kullanıcı, veri ve erişimi yönetirsin."
      ] },
      { t: "steps", h: "Dağıtım modelleri", items: [
        "Genel (public) bulut, özel (private), hibrit ve topluluk bulutu.",
        "Çoklu bulut: birden fazla sağlayıcı kullanımı."
      ] },
      { t: "box", h: "Paylaşılan sorumluluk modeli", text: "Sağlayıcı: fiziksel veri merkezi, donanım, sanallaştırma katmanı. Müşteri: kimlik ve erişim, veri sınıflandırma ve şifreleme, ağ ve güvenlik grubu ayarları, işletim sistemi yaması (IaaS'ta). SaaS'ta sorumluluk sağlayıcıya daha çok kayar ama veri ve kullanıcılar hep sende kalır." },
      { t: "steps", h: "Bulut güvenlik pratikleri", items: [
        "Kimlik yönetimi: MFA, en az yetki, kök hesabı kullanma.",
        "Depolamayı varsayılan olarak kapalı tut; herkese açık erişimi engelle.",
        "Verileri hem beklerken hem aktarılırken şifrele.",
        "CASB, bulut yapılandırma izleme (CSPM) ve loglama.",
        "Altyapıyı kod olarak yönet (IaC) ve değişiklikleri denetle."
      ] },
      { t: "steps", h: "Sanallaştırma riskleri", items: [
        "VM escape: sanal makineden hypervisor'a kaçış.",
        "VM sprawl: kontrolsüz çoğalan sanal makineler, yamasız kalan sistemler.",
        "Konteynerlerde: güvensiz imaj, aşırı yetkili konteyner."
      ] },
      { t: "warn", h: "Tuzak", text: "'Bulutta olduğu için güvenli' yanlıştır. Bulut sağlayıcısı veri merkezini korur ama senin yanlış yapılandırmanı düzeltmez." }
    ],
    quiz: [
      { q: "SaaS modelinde müşterinin hâlâ sorumlu olduğu şey hangisidir?", options: ["Veri ve kullanıcı erişimi", "Fiziksel veri merkezi", "Hypervisor yaması", "Ağ kabloları"], answer: "Veri ve kullanıcı erişimi", why: "SaaS'ta bile veri ve erişim müşteridedir." },
      { q: "IaaS'ta sanal makinenin işletim sistemi yamasından kim sorumludur?", options: ["Müşteri", "Bulut sağlayıcısı", "ISP", "Kimse"], answer: "Müşteri", why: "IaaS'ta işletim sistemi ve üstü müşteriye aittir." },
      { q: "Kontrolsüz şekilde çoğalan, yamalanmayan sanal makineler hangi riskin örneğidir?", options: ["VM sprawl", "VM escape", "Rogue DHCP", "Tailgating"], answer: "VM sprawl", why: "Yönetilmeyen VM'ler saldırı yüzeyini büyütür." },
      { q: "Bulut ortamında en yaygın veri sızıntısı nedeni hangisidir?", options: ["Yanlış yapılandırma", "Zero-day", "Fiziksel hırsızlık", "DDoS"], answer: "Yanlış yapılandırma", why: "Herkese açık depolama gibi ayar hataları çok yaygındır." }
    ],
    interview: [
      { q: "Paylaşılan sorumluluk modeli nedir?", a: "Bulut sağlayıcısı altyapıyı (donanım, veri merkezi, sanallaştırma) korur. Müşteri kimlik/erişim, veri, yapılandırma ve IaaS'ta işletim sistemi güvenliğinden sorumludur. Hizmet modeline göre sınır kayar." },
      { q: "Bulutta ilk uygulayacağın üç güvenlik önlemi nedir?", a: "Kök hesabı koruma ve MFA, en az yetkiyle IAM ve depolamanın herkese açık olmaması; ayrıca loglamayı açıp verileri şifrelemek." }
    ],
    vocab: [
      { term: "IaaS / PaaS / SaaS", tr: "hizmet olarak altyapı / platform / yazılım", ex: "Gmail is SaaS." },
      { term: "Hypervisor", tr: "sanallaştırma katmanı", ex: "Patch the hypervisor." },
      { term: "Shared responsibility", tr: "paylaşılan sorumluluk", ex: "Know the shared responsibility model." },
      { term: "Misconfiguration", tr: "yanlış yapılandırma", ex: "Misconfiguration caused the leak." },
      { term: "Tenant", tr: "kiracı (müşteri hesabı)", ex: "Each tenant is isolated." }
    ],
    resources: [
      res(PM, "Bulut ve sanallaştırma bölümleri"),
      { title: "AWS: Paylaşılan Sorumluluk Modeli", url: "https://aws.amazon.com/compliance/shared-responsibility-model/", type: "doc", why: "Modelin resmî açıklaması", level: "başlangıç", lang: "EN" }
    ],
    sources: [CT]
  };

  /* 16 ──────────────────────────────────────────── Veri koruma */
  L[16] = {
    hook: "Tüm veri aynı değerde değildir: önce neyin önemli olduğunu belirle, sonra ona göre koru.",
    homework: "Ofisindeki 6 veri türünü (ör. maaş listesi, tanıtım broşürü, müşteri TC numarası) 'herkese açık / iç / gizli / çok gizli' olarak sınıflandır.",
    warmup: {
      recap: [{ point: "Kriptografi gizliliği sağlar.", example: "AES ile disk şifreleme" }],
      concepts: [
        { term: "Veri sınıflandırma", tr: "Önem derecesi etiketi", summary: "Veriye gizlilik düzeyi atamak.", example: "Genel, iç, gizli" },
        { term: "DLP", tr: "Veri sızıntısı önleme", summary: "Hassas verinin kurum dışına çıkışını izler/engeller.", example: "TC kimlik no içeren e-postayı engelle" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Bir çalışan müşteri listesini kişisel e-postasına gönderdi. DLP bu eylemi tespit eder ya da engeller. Ama önce hangi verinin 'gizli' olduğu tanımlı olmalı; yoksa kural yazılamaz." },
      { t: "steps", h: "Veri halleri", items: [
        "Beklerken (at rest): diskte, veritabanında. Disk/veritabanı şifreleme (AES).",
        "Aktarılırken (in transit): ağda. TLS, VPN.",
        "Kullanımda (in use): bellekte işlenirken. Erişim kontrolü, güvenli bellek (enclave)."
      ] },
      { t: "steps", h: "Sınıflandırma ve rol", items: [
        "Sınıflar: genel (public), iç (internal), gizli (confidential), çok gizli.",
        "Veri sahibi (owner): sınıfı ve erişimi belirler. Veri koruyucu (custodian): teknik olarak saklar ve korur.",
        "Veri işleyen, kontrolör (KVKK/GDPR): kişisel veriyi işleme amacı ve yöntemini belirleyen/işleyen taraf."
      ] },
      { t: "steps", h: "Koruma yöntemleri", items: [
        "Şifreleme: disk, dosya, veritabanı ve yedek.",
        "Maskeleme (masking): gösterimde kısmen gizleme (**** 1234).",
        "Tokenizasyon: hassas veriyi anlamsız bir jetonla değiştirme.",
        "Anonimleştirme / takma adlandırma (pseudonymization).",
        "DLP: sızıntıyı tespit ve engelleme.",
        "Veri saklama ve imha politikaları: gerekmeyen veriyi güvenli sil."
      ] },
      { t: "box", h: "Egemenlik ve konum", text: "Verinin hangi ülkede saklandığı hukuki sorumluluğu etkiler (veri egemenliği). Kişisel veriler için KVKK ve GDPR gibi düzenlemeler uygulanır." },
      { t: "warn", h: "Tuzak", text: "Maskeleme ve şifreleme aynı şey değildir. Maskeleme veriyi sadece görünümde gizler; şifreleme veriyi anahtarla korur. Tokenizasyonda orijinal veri ayrı güvenli bir kasada tutulur." }
    ],
    quiz: [
      { q: "Verinin ağda taşınırken korunması hangi veri halini ifade eder?", options: ["Aktarılırken (in transit)", "Beklerken (at rest)", "Kullanımda (in use)", "Arşivde"], answer: "Aktarılırken (in transit)", why: "TLS ve VPN bu hali korur." },
      { q: "Kredi kartı numarasını sistemde anlamsız bir jetonla değiştirmek hangisidir?", options: ["Tokenizasyon", "Hashing", "Bitirme", "Yedekleme"], answer: "Tokenizasyon", why: "Hassas veri yerine jeton saklanır, gerçek veri ayrı kasadadır." },
      { q: "Kurumdan çıkan e-postalarda TC kimlik numarası desenini yakalayıp engelleyen çözüm hangisidir?", options: ["DLP", "IDS", "NAC", "VPN"], answer: "DLP", why: "Data Loss Prevention hassas veri desenlerini izler." },
      { q: "Verinin önem düzeyini ve erişimini belirleyen rol hangisidir?", options: ["Veri sahibi (owner)", "Veri koruyucu (custodian)", "Kullanıcı", "Ağ yöneticisi"], answer: "Veri sahibi (owner)", why: "Sahip sınıflandırmadan ve erişim kararlarından sorumludur." }
    ],
    interview: [
      { q: "Veri sınıflandırma neden önemlidir?", a: "Hangi verinin ne kadar korunması gerektiğini belirler. Böylece şifreleme, erişim ve DLP kuralları riske göre uygulanır, kaynaklar kritik verilere yönlendirilir." },
      { q: "Beklerken, aktarılırken ve kullanımda veri nasıl korunur?", a: "Beklerken disk/veritabanı şifrelemesi, aktarılırken TLS ve VPN, kullanımda erişim kontrolü ve kısıtlı yetkiyle korunur." }
    ],
    vocab: [
      { term: "Data at rest", tr: "beklerken veri", ex: "Encrypt data at rest." },
      { term: "Data in transit", tr: "aktarılırken veri", ex: "TLS protects data in transit." },
      { term: "Classification", tr: "sınıflandırma", ex: "Apply a data classification." },
      { term: "Masking", tr: "maskeleme", ex: "Use masking for card numbers." },
      { term: "Retention", tr: "saklama süresi", ex: "Follow the retention policy." }
    ],
    resources: [res(PM, "Veri koruma ve gizlilik bölümleri"), res(NISTG, "Veri güvenliği kontrolleri")],
    sources: [CT]
  };

  /* 17 ──────────────────────────────────────────── Dayanıklılık ve yedekleme */
  L[17] = {
    hook: "Güvenlik sadece saldırıyı önlemek değildir: yaşandığında hızla ayağa kalkabilmek de güvenliktir.",
    homework: "Kendi bilgisayarındaki önemli dosyaların 3-2-1 kuralına uyup uymadığını kontrol et. Uymayan yeri yaz.",
    warmup: {
      recap: [{ point: "Erişilebilirlik CIA'nın üçüncü ayağıdır.", example: "Yedek ve yedek sistemler" }],
      concepts: [
        { term: "RTO", tr: "Geri dönüş süresi hedefi", summary: "Kesintiden sonra sistemin ne kadar sürede ayağa kalkması gerektiği.", example: "4 saat" },
        { term: "RPO", tr: "Veri kaybı hedefi", summary: "En çok ne kadar veri kaybı kabul edilir.", example: "Son 15 dakika" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Sunucu odasında su borusu patladı. Yönetici soruyor: 'Ne kadar sürede çalışırız, ne kadar veri kaybederiz?' Bu soruların cevabı RTO ve RPO'dur; yedek ve felaket planıyla bağlantılıdır." },
      { t: "steps", h: "Yedekleme türleri", items: [
        "Tam (full): her şeyin kopyası; geri dönüşü kolay, süre ve alan çok.",
        "Artımlı (incremental): son yedekten bu yana değişenler; hızlı, geri dönüşte tüm zincir gerekir.",
        "Fark (differential): son tam yedekten bu yana değişenler; geri dönüş için tam + son fark yeterli.",
        "Anlık görüntü (snapshot) ve sürekli replikasyon."
      ] },
      { t: "box", h: "3-2-1 kuralı", text: "3 kopya, 2 farklı ortam, 1 kopya uzakta ya da çevrimdışı. Fidye yazılımına karşı değiştirilemez (immutable) ya da hava boşluklu yedek kritiktir. Yedek, geri yüklemeyi test ettiğin sürece yedektir." },
      { t: "steps", h: "Süreklilik kavramları", items: [
        "BCP (iş sürekliliği planı) ve DRP (felaket kurtarma planı).",
        "BIA (iş etki analizi): hangi sistem kesilirse en çok zarar verir.",
        "Hot site: hazır, çalışan yedek tesis (en hızlı, en pahalı). Warm: kısmen hazır. Cold: boş alan (en yavaş, en ucuz).",
        "Yük devretme (failover): birincil çökünce yedeğe geçiş. Küme (cluster) ve yük dengeleme.",
        "RAID: disk arızasına karşı dayanıklılık; yedek yerine geçmez.",
        "UPS ve jeneratör: elektrik kesintisine karşı."
      ] },
      { t: "steps", h: "Test", items: [
        "Masa başı tatbikat (tabletop): senaryoyu konuşarak geçmek.",
        "Yürüyüş (walkthrough) ve simülasyon, tam geçiş (failover) testi.",
        "Paralel test: ana sistem çalışırken yedeği de çalıştırıp doğrulamak."
      ] },
      { t: "warn", h: "Tuzak", text: "RAID yedekleme değildir. Dosyayı yanlışlıkla silersen ya da fidye yazılımı şifrelerse RAID bu değişikliği de aynalar." }
    ],
    quiz: [
      { q: "'En çok 15 dakikalık veri kaybı kabul edilebilir' ifadesi hangi metriği tanımlar?", options: ["RPO", "RTO", "MTTR", "BIA"], answer: "RPO", why: "RPO, kabul edilebilir veri kaybı noktasıdır." },
      { q: "Son tam yedekten bu yana değişen tüm verileri yedekleyen tür hangisidir?", options: ["Fark (differential)", "Artımlı", "Tam", "Snapshot"], answer: "Fark (differential)", why: "Fark yedek son tam yedeğe göre değişenleri alır." },
      { q: "Hazır ve çalışan, en hızlı devralan yedek tesis hangisidir?", options: ["Hot site", "Cold site", "Warm site", "Air gap"], answer: "Hot site", why: "Hot site kısa sürede devralır; en pahalı seçenektir." },
      { q: "RAID için hangisi doğrudur?", options: ["Yedekleme yerine geçmez", "Fidye yazılımına karşı korur", "Silinen dosyayı geri getirir", "Hepsi"], answer: "Yedekleme yerine geçmez", why: "RAID disk arızasına dayanıklıdır, silinme/şifrelenmeye değil." }
    ],
    interview: [
      { q: "RTO ve RPO nedir?", a: "RTO sistemin kesintiden sonra ne kadar sürede geri gelmesi gerektiğini, RPO ise en fazla ne kadar veri kaybının kabul edilebilir olduğunu belirtir. Yedekleme sıklığı ve felaket kurtarma stratejisi bunlara göre seçilir." },
      { q: "Fidye yazılımına karşı yedekleme stratejin ne olur?", a: "3-2-1 kuralı: en az bir kopya çevrimdışı ya da değiştirilemez olur, düzenli geri yükleme testi yapılır ve yedek hesapları ana ağdan ayrı kimlik bilgileriyle korunur." }
    ],
    vocab: [
      { term: "Backup", tr: "yedek", ex: "Test the backup." },
      { term: "Restore", tr: "geri yüklemek", ex: "We restored it from backup." },
      { term: "Failover", tr: "yük devretme", ex: "Failover took two minutes." },
      { term: "Redundancy", tr: "yedeklilik", ex: "Add redundancy." },
      { term: "Disaster recovery", tr: "felaket kurtarma", ex: "Update the disaster recovery plan." }
    ],
    resources: [
      res(PM, "Dayanıklılık ve kurtarma"),
      { title: "CISA: Felaket kurtarma ve süreklilik planı", url: "https://www.cisa.gov/", type: "doc", why: "Hazırlık için resmî kaynaklar", level: "orta", lang: "EN" }
    ],
    sources: [CT]
  };

  /* 18 ──────────────────────────────────────────── Sertleştirme */
  L[18] = {
    hook: "Sertleştirme, bir sistemin gereksiz her kapısını kapatmaktır: ne kadar az açık kapı, o kadar az saldırı yolu.",
    homework: "Windows ya da Linux makinende çalışan servisleri ve açık portları listele (netstat -ano / ss -tuln). Neye ihtiyacın olmadığını işaretle.",
    warmup: {
      recap: [{ point: "Saldırı yüzeyi, saldırganın erişebileceği tüm noktalar toplamıdır.", example: "Açık port, kullanılmayan servis" }],
      concepts: [
        { term: "Sertleştirme", tr: "Güvenli yapılandırma", summary: "Gereksiz servis ve ayarları kapatıp sistemi güvenli hale getirmek.", example: "Varsayılan hesabı kapatmak" },
        { term: "Baseline", tr: "Temel yapılandırma", summary: "Güvenli kabul edilen standart ayar seti.", example: "CIS Benchmark" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Yeni sunucu kuruldu. Hemen üretime alınır mı? Hayır: önce gereksiz servisleri kapat, varsayılan parolaları değiştir, güncellemeleri yükle, güvenlik duvarını aç. Bu adımlara sertleştirme denir." },
      { t: "steps", h: "Yaygın sertleştirme adımları", items: [
        "Gereksiz servis, port ve yazılımı kaldır (saldırı yüzeyini küçült).",
        "Varsayılan hesap ve parolaları değiştir ya da kapat.",
        "Yamaları ve güncellemeleri düzenli uygula.",
        "Yönetici hakkını sınırla (en az yetki); ortak hesap kullanma.",
        "Disk şifreleme, güvenli önyükleme (Secure Boot), BIOS/UEFI parolası.",
        "Uç nokta koruma: EDR/antivirüs, host güvenlik duvarı.",
        "Loglamayı aç ve merkezi sunucuya gönder.",
        "Güvenli protokoller: Telnet yerine SSH, HTTP yerine HTTPS, FTP yerine SFTP."
      ] },
      { t: "steps", h: "Standartlar ve araçlar", items: [
        "CIS Benchmarks: platform bazlı güvenli yapılandırma kılavuzları.",
        "Grup ilkesi (GPO) ve yapılandırma yönetimi araçları ile toplu uygulama.",
        "Altın imaj (golden image): önceden sertleştirilmiş şablon.",
        "Yapılandırma sapmasını (drift) izleme."
      ] },
      { t: "box", h: "Ağ cihazlarında", text: "Router/switch: varsayılan parola değiştir, kullanılmayan portları kapat, SSH aç Telnet kapat, yönetim erişimini ayrı VLAN'a al, banner ve loglama ayarla." },
      { t: "steps", h: "Uygulama ve mobil", items: [
        "Uygulama beyaz listeleme: sadece onaylı uygulama çalışsın.",
        "MDM: mobil cihaz yönetimi ile ayar, silme, şifreleme zorunluluğu.",
        "USB/çıkarılabilir ortam kısıtlaması."
      ] },
      { t: "warn", h: "Tuzak", text: "Sertleştirme bir kerelik iş değildir. Yamalar çıkar, ayarlar kayar. Baseline ile karşılaştırıp sapmayı sürekli izlemek gerekir." }
    ],
    quiz: [
      { q: "Yeni kurulan sunucuda ilk adımlardan biri hangisidir?", options: ["Gereksiz servisleri ve varsayılan hesapları kapatmak", "Tüm portları açmak", "Yöneticiye ortak hesap vermek", "Logları kapatmak"], answer: "Gereksiz servisleri ve varsayılan hesapları kapatmak", why: "Saldırı yüzeyini küçültmek sertleştirmenin özüdür." },
      { q: "Telnet yerine hangi protokol kullanılmalıdır?", options: ["SSH", "FTP", "HTTP", "SNMPv1"], answer: "SSH", why: "SSH şifreli uzaktan yönetim sağlar." },
      { q: "Önceden sertleştirilmiş şablon sanal makineye ne denir?", options: ["Altın imaj (golden image)", "Honeypot", "Sandbox", "Jump server"], answer: "Altın imaj (golden image)", why: "Aynı güvenli temelle çok sayıda sistem kurmayı sağlar." },
      { q: "CIS Benchmarks nedir?", options: ["Güvenli yapılandırma rehberleri", "Zafiyet puanı", "Saldırı türü", "Şifreleme algoritması"], answer: "Güvenli yapılandırma rehberleri", why: "Platform bazında sertleştirme ayarlarını sunar." }
    ],
    interview: [
      { q: "Sertleştirme nedir?", a: "Bir sistemi gereksiz servis ve ayarlardan arındırıp güvenli yapılandırmayla çalıştırmaktır. Varsayılan hesapları değiştirme, yama, en az yetki, host güvenlik duvarı ve loglama gibi adımları içerir." },
      { q: "Baseline ve drift nedir?", a: "Baseline güvenli kabul edilen standart yapılandırmadır. Drift, zamanla sistemin bu standarttan sapmasıdır. Sürekli karşılaştırarak sapmaları tespit eder ve düzeltirim." }
    ],
    vocab: [
      { term: "Hardening", tr: "sertleştirme", ex: "Server hardening is required." },
      { term: "Attack surface", tr: "saldırı yüzeyi", ex: "Reduce the attack surface." },
      { term: "Baseline", tr: "temel yapılandırma", ex: "Compare with the baseline." },
      { term: "Default credentials", tr: "varsayılan kimlik bilgisi", ex: "Change default credentials." },
      { term: "Least privilege", tr: "en az yetki", ex: "Apply least privilege." }
    ],
    resources: [
      res(PM, "Sertleştirme ve güvenli yapılandırma"),
      { title: "CIS Benchmarks", url: "https://www.cisecurity.org/cis-benchmarks", type: "doc", why: "Platform bazında hazır sertleştirme listeleri", level: "orta", lang: "EN" }
    ],
    sources: [CT]
  };
})();

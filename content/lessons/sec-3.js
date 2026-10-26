/* Siber güvenlik (Security+ SY0-801 (V8) temelli) · sabit dersler 13-18 */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).sec = (window.PP_LESSONS.sec || {}));
  var CT = { title: "CompTIA Security+ sınav hedefleri (SY0-801, V8)", url: "https://www.comptia.org/certifications/security" };
  var PM = { title: "Professor Messer: Security+ (ücretsiz video kursu, SY0-701 sürümü)", url: "https://www.professormesser.com/", type: "video", length: "Çok bölümlü", level: "başlangıç", lang: "EN" };
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
    objectives: [
      { id: "h1", text: "Stateful ve stateless güvenlik duvarını dönüş trafiğine davranışlarına göre ayırt edebilirsin." },
      { id: "h2", text: "Yukarıdan aşağı ilk eşleşen kural mantığı ve implicit deny ile bir paketin akıbetini bulabilirsin." },
      { id: "h3", text: "IDS, IPS ve WAF'ın ne yaptığını ve nerede durduğunu ayırt edebilirsin." }
    ],
    summary: [
      "Stateful güvenlik duvarı bağlantı tablosu tutar; iç ağdan çıkan isteğin cevabına ayrı kural yazmadan izin verir, stateless ise her paketi tek başına değerlendirir.",
      "Kurallar yukarıdan aşağıya okunur, ilk eşleşen çalışır; sondaki örtük implicit deny hiçbir kurala uymayan trafiği engeller.",
      "Kural; kaynak, hedef, protokol, port ve eylemden oluşur ve en az yetki ilkesiyle yalnızca gerekli trafiğe izin verir.",
      "IDS izler ve alarm verir, IPS hattın üzerinde olduğu için saldırıyı engeller.",
      "WAF HTTP isteklerini inceleyip SQLi ve XSS gibi web saldırılarını filtreler; geçici açılan kurallara bitiş tarihi ve sahip yazılmalıdır."
    ],
    quiz: [
      { id: "b290662f", q: "Çıkan bağlantının dönüş trafiğine otomatik izin veren güvenlik duvarı türü hangisidir?", options: ["Stateful", "Stateless paket filtresi", "Hub", "Repeater"], obj: "h1" },
      { id: "9e59959a", q: "Güvenlik duvarı kuralları nasıl işlenir?", options: ["Yukarıdan aşağıya, ilk eşleşen çalışır", "Aşağıdan yukarıya", "Rastgele", "Hepsi birlikte"], obj: "h2" },
      { id: "33727e26", q: "IDS ile IPS arasındaki fark nedir?", options: ["IDS alarm verir, IPS engeller", "IDS engeller, IPS alarm verir", "İkisi de aynıdır", "IDS sadece loglar tutar"], obj: "h3" },
      { id: "11b38266", q: "Web uygulamasını SQL injection ve XSS isteklerine karşı filtreleyen çözüm hangisidir?", options: ["WAF", "NAC", "VPN", "DHCP"], obj: "h3" },
      { id: "6c05c2df", q: "Kurallar sırayla şöyledir: (1) İzin ver, any → 10.0.5.20, TCP 443; (2) Engelle, any → any, her protokol. 10.0.5.20 adresine gelen bir TCP 22 paketine ne olur?", options: ["Engellenir: 1. kural eşleşmez, 2. kural eşleşip engeller", "İzin verilir: hedef adresi 1. kuralla eşleşiyor", "İzin verilir: kurallar toplu değerlendirilir", "Rastgele bir kural uygulanır"], obj: "h2" },
      { id: "e2cd2f7e", q: "Her paketi bağlantı geçmişini bilmeden tek tek kurala göre değerlendiren, bu yüzden dönüş trafiği için ayrı kural isteyen güvenlik duvarı türü hangisidir?", options: ["Stateless paket filtresi", "Stateful", "NGFW", "Uygulama katmanı proxy"], obj: "h1" }
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
    objectives: [
      { id: "h1", text: "Bir senaryo için doğru VPN türünü (remote access ya da site-to-site) seçebilirsin." },
      { id: "h2", text: "Full tunnel ile split tunnel arasındaki denetim ve hız farkını ayırt edebilirsin." },
      { id: "h3", text: "IPsec içinde ESP, AH, transport ve tunnel modunun işlevini ayırt edebilirsin." },
      { id: "h4", text: "Güvenli bir VPN için gereken kontrolleri (MFA, güncel protokol, yama) seçebilirsin." }
    ],
    summary: [
      "Remote access VPN tek kullanıcıyı şirket ağına bağlar, site-to-site VPN iki ofis ağını router ya da firewall arasında birbirine bağlar.",
      "Full tunnelda tüm trafik VPN'den geçer ve izlenebilir; split tunnelda yalnızca şirket trafiği geçer, hız artar ama denetim zayıflar.",
      "IPsec'te ESP hem şifreleme hem bütünlük sağlar, AH yalnızca bütünlük ve kimlik; tunnel modu tüm IP paketini yeni bir başlıkla sarar.",
      "SSL/TLS VPN 443 portunu kullandığı için güvenlik duvarlarından kolay geçer.",
      "VPN cihazı internete açık bir hedeftir: MFA, güncel protokol (IKEv2, TLS 1.2+) ve düzenli yama şarttır; ele geçmiş bir cihaz VPN ile saldırganı içeri taşır."
    ],
    quiz: [
      { id: "d0f66afd", q: "İki ofisin ağlarını birbirine bağlayan VPN türü hangisidir?", options: ["Site-to-site", "Remote access", "Split tunnel", "Proxy"], obj: "h1" },
      { id: "c3f3a8ec", q: "Yalnızca şirket trafiğini VPN'den geçiren, kalan trafiği doğrudan internetten çıkaran yapı hangisidir?", options: ["Split tunnel", "Full tunnel", "Air gap", "DMZ"], obj: "h2" },
      { id: "98d278b4", q: "IPsec'te hem şifreleme hem bütünlük sağlayan bileşen hangisidir?", options: ["ESP", "AH", "DNS", "NAT"], obj: "h3" },
      { id: "324e98e2", q: "VPN güvenliği için zorunlu tutulması en doğru olan hangisidir?", options: ["MFA", "Parolayı e-postayla göndermek", "Eski protokol", "Herkese yönetici hakkı"], obj: "h4" },
      { id: "ee57b204", q: "Evden çalışan tek bir çalışanın kendi bilgisayarından şirket ağına güvenli bağlanması için hangi VPN türü kullanılır?", options: ["Remote access VPN", "Site-to-site VPN", "Air gap", "Honeypot"], obj: "h1" },
      { id: "9070c30d", q: "Güvenlik ekibi tüm çalışan trafiğinin şirket güvenlik duvarından geçip izlenmesini istiyor. Hangi yapı kurulmalıdır?", options: ["Full tunnel", "Split tunnel", "Always-on VPN", "Site-to-site VPN"], obj: "h2" },
      { id: "a25216a6", q: "IPsec'te tüm IP paketini yeni bir IP başlığıyla saran ve site-to-site VPN'de kullanılan mod hangisidir?", options: ["Tunnel modu", "Transport modu", "AH", "IKE"], obj: "h3" }
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
      { t: "warn", h: "Tuzak", text: "'Bulutta olduğu için güvenli' yanlıştır. Bulut sağlayıcısı veri merkezini korur ama senin yanlış yapılandırmanı düzeltmez." },
      { t: "steps", h: "Sunucusuz, çoklu bulut ve dağıtım modelleri (V8)", items: [
        "Sunucusuz (serverless, ör. fonksiyon hizmeti): sunucu, işletim sistemi ve çalışma zamanı sağlayıcıya aittir; müşteri kodu, yapılandırmayı, izinleri ve veriyi yönetir. Riskler: aşırı geniş izinli fonksiyon rolü, kodda gömülü sır, bağımlılık zafiyeti.",
        "Çoklu bulut (multicloud): birden çok sağlayıcı kullanmak bağımlılığı ve tek sağlayıcı kesintisi riskini azaltır, ama her sağlayıcıda farklı ayar ve kimlik modeli yanlış yapılandırma ve görünürlük boşluğu riskini artırır.",
        "Dağıtım modelleri: kamu (public), özel (private), hibrit (hybrid) ve topluluk (community: ortak amaçlı kurumların paylaştığı bulut). Kod olarak altyapı (IaC) ortamı tekrarlanabilir kılar ve kodla birlikte gözden geçirilir."
      ] }
    ],
    objectives: [
      { id: "h1", text: "IaaS, PaaS ve SaaS'ta sağlayıcı ile müşterinin sorumluluk sınırını ayırt edebilirsin." },
      { id: "h2", text: "Bulut veri sızıntılarının en yaygın nedenini bulup uygun önlemi seçebilirsin." },
      { id: "h3", text: "VM sprawl ile VM escape riskini birbirinden ayırt edebilirsin." },
      { id: "h4", text: "Sunucusuz, çoklu bulut ve bulut dağıtım modellerinin (public, private, hybrid, community) güvenlik sonuçlarını ayırt edebilirsin." }
    ],
    summary: [
      "Paylaşılan sorumlulukta sağlayıcı veri merkezini, donanımı ve sanallaştırma katmanını korur; kimlik, erişim ve veri her modelde müşteridedir.",
      "IaaS'ta işletim sistemi yaması müşteriye, PaaS'ta uygulama ve veri müşteriye aittir; SaaS'ta sorumluluk sağlayıcıya kayar ama veri ve kullanıcılar sende kalır.",
      "Haberlere çıkan bulut sızıntılarının çoğu hack değil yanlış yapılandırmadır, örneğin herkese açık depolama kovası.",
      "VM sprawl kontrolsüz çoğalıp yamasız kalan sanal makinelerdir; VM escape saldırganın sanal makineden hypervisor'a kaçışıdır.",
      "Bulut güvenliğinin temelleri MFA, en az yetki, kök hesabı kullanmama, beklerken ve aktarılırken şifreleme ile loglamadır."
    ],
    quiz: [
      { id: "9a309b0c", q: "SaaS modelinde müşterinin hâlâ sorumlu olduğu şey hangisidir?", options: ["Veri ve kullanıcı erişimi", "Fiziksel veri merkezi", "Hypervisor yaması", "Ağ kabloları"], obj: "h1" },
      { id: "545a1cdd", q: "IaaS'ta sanal makinenin işletim sistemi yamasından kim sorumludur?", options: ["Müşteri", "Bulut sağlayıcısı", "ISP", "Kimse"], obj: "h1" },
      { id: "d334366d", q: "Kontrolsüz şekilde çoğalan, yamalanmayan sanal makineler hangi riskin örneğidir?", options: ["VM sprawl", "VM escape", "Rogue DHCP", "Tailgating"], obj: "h3" },
      { id: "e10d6b64", q: "Bulut ortamında en yaygın veri sızıntısı nedeni hangisidir?", options: ["Yanlış yapılandırma", "Zero-day", "Fiziksel hırsızlık", "DDoS"], obj: "h2" },
      { id: "7441b330", q: "PaaS modelinde müşterinin yönetmeye devam ettiği şey hangisidir?", options: ["Uygulama ve veri", "İşletim sistemi yaması ve hypervisor", "Fiziksel veri merkezi güvenliği", "Ağ donanımı ve sunucu rafları"], obj: "h1" },
      { id: "26b3197a", q: "Bir geliştirici veritabanı yedeğini herkese açık bulut depolama kovasına koydu. İlk önlem hangisi olmalıdır?", options: ["Kovada herkese açık erişimi kapatıp erişimi en az yetkiyle sınırlamak", "Hypervisor'u yamalamak", "Sanal makine sayısını azaltmak", "Sağlayıcıdan veri merkezini yeniden kurmasını istemek"], obj: "h2" },
      { id: "3c0ef1a6", q: "Bir sanal makineyi ele geçiren saldırganın hypervisor'a ve komşu sanal makinelere ulaşması hangi riskle anılır?", options: ["VM escape", "VM sprawl", "Tokenizasyon", "Split tunnel"], obj: "h3" },
      { id: "945bd74d", q: "Bir ekip olay işleyen kodunu sunucusuz bir fonksiyon hizmetinde çalıştırıyor. Sorumluluk dağılımında hangisi müşteriye aittir?", options: ["Fonksiyonun çalıştığı fiziksel sunucunun yamalanması", "Fonksiyon kodu, fonksiyonun izinleri ve yapılandırması", "Altta yatan işletim sistemi ve çalışma zamanı ortamının güvenliği", "Veri merkezinin fiziksel erişim denetimi"], obj: "h4" }
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
        "Veri işleyen, kontrolör (KVKK/GDPR): kişisel veriyi işleme amacı ve yöntemini belirleyen/işleyen taraf.",
        "Veri operatörü (data operator) V8 rol listesinde adıyla geçer; hedef belgesi tanım vermez, bu yüzden ayrı bir sınav sorusu yoktur."
      ] },
      { t: "steps", h: "Koruma yöntemleri", items: [
        "Şifreleme: disk, dosya, veritabanı ve yedek.",
        "Maskeleme (masking): gösterimde kısmen gizleme (**** 1234).",
        "Kimliksizleştirme (deidentification, V8): ad, kimlik numarası gibi doğrudan tanımlayıcıları kaldırıp kaydı bir kişiye bağlanamaz hale getirmek; araştırma ve analiz için veri paylaşımında kullanılır.",
        "V8 listesinde ayrıca 'data transpose' (veri yer değiştirme) geçer; resmî hedef belgesi bu terimi tanımlamaz, bu yüzden burada yalnızca adı anılır.",
        "Tokenizasyon: hassas veriyi anlamsız bir jetonla değiştirme.",
        "Anonimleştirme / takma adlandırma (pseudonymization).",
        "DLP: sızıntıyı tespit ve engelleme.",
        "Veri saklama ve imha politikaları: gerekmeyen veriyi güvenli sil."
      ] },
      { t: "box", h: "Egemenlik ve konum", text: "Verinin hangi ülkede saklandığı hukuki sorumluluğu etkiler (veri egemenliği). Kişisel veriler için KVKK ve GDPR gibi düzenlemeler uygulanır." },
      { t: "warn", h: "Tuzak", text: "Maskeleme ve şifreleme aynı şey değildir. Maskeleme veriyi sadece görünümde gizler; şifreleme veriyi anahtarla korur. Tokenizasyonda orijinal veri ayrı güvenli bir kasada tutulur." },
      { t: "steps", h: "Veri rolleri ve yaşam döngüsü (V8)", items: [
        "Veri sahibi (owner): veriden iş olarak sorumlu yönetici; sınıflandırmayı ve erişim kararını verir. Koruyucu (custodian): veriyi teknik olarak saklar ve korur (yedek, şifreleme, erişim uygulaması).",
        "Veri görevlisi (steward): veri kalitesi, tanımlar ve doğru kullanımı için sorumludur. Operatör: veriyi günlük işlemlerde işleyen kişi.",
        "Veri sorumlusu (controller): verinin neden ve nasıl işleneceğine karar verir. İşleyen (processor): onun adına işler. Alt işleyen (subprocessor): işleyenin yardım aldığı üçüncü taraf. Verisi işlenen kişiye veri öznesi denir.",
        "Yaşam döngüsü: oluşturma, yönetim, dağıtım, saklama (retention), imha. Saklama süresi dolan veri güvenli imha edilir; yapılandırılmış (tablo) ve yapılandırılmamış (belge, e-posta) veri farklı araçlarla korunur."
      ] }
    ],
    objectives: [
      { id: "h1", text: "Verinin hangi halde (at rest, in transit, in use) olduğunu tanıyıp uygun korumayı eşleştirebilirsin." },
      { id: "h2", text: "Tokenizasyon, maskeleme ve DLP'yi ne yaptıklarına göre ayırt edebilirsin." },
      { id: "h3", text: "Veri sahibi, koruyucu, görevlisi (steward), sorumlusu (controller), işleyen (processor) ve alt işleyen rollerini ayırt edebilirsin." },
      { id: "h4", text: "Kimliksizleştirme (deidentification) ile maskeleme ve tokenizasyonu ayırt edebilirsin." }
    ],
    summary: [
      "Veri üç halde korunur: beklerken disk ve veritabanı şifrelemesiyle, aktarılırken TLS ve VPN ile, kullanımdayken erişim kontrolüyle.",
      "Tokenizasyon hassas veriyi anlamsız bir jetonla değiştirir ve orijinal veri ayrı güvenli bir kasada kalır.",
      "Maskeleme veriyi yalnızca görünümde gizler (**** 1234), şifreleme ise veriyi anahtarla korur; ikisi aynı şey değildir.",
      "DLP e-posta ve dosya trafiğinde TC kimlik numarası gibi hassas veri desenlerini yakalayıp engeller; önce verinin sınıflandırılmış olması gerekir.",
      "Veri sahibi sınıfı ve erişimi belirler, veri koruyucu teknik olarak saklar ve korur."
    ],
    quiz: [
      { id: "2fb185c9", q: "Verinin ağda taşınırken korunması hangi veri halini ifade eder?", options: ["Aktarılırken (in transit)", "Beklerken (at rest)", "Kullanımda (in use)", "Arşivde"], obj: "h1" },
      { id: "b1762729", q: "Kredi kartı numarasını sistemde anlamsız bir jetonla değiştirmek hangisidir?", options: ["Tokenizasyon", "Hashing", "Bitirme", "Yedekleme"], obj: "h2" },
      { id: "75dd5f52", q: "Kurumdan çıkan e-postalarda TC kimlik numarası desenini yakalayıp engelleyen çözüm hangisidir?", options: ["DLP", "IDS", "NAC", "VPN"], obj: "h2" },
      { id: "69bbab61", q: "Verinin önem düzeyini ve erişimini belirleyen rol hangisidir?", options: ["Veri sahibi (owner)", "Veri koruyucu (custodian)", "Kullanıcı", "Ağ yöneticisi"], obj: "h3" },
      { id: "a1835a2b", q: "Veritabanı dosyalarını diskte AES ile şifrelemek verinin hangi halini korur?", options: ["Beklerken (at rest)", "Aktarılırken (in transit)", "Kullanımda (in use)", "Hiçbirini"], obj: "h1" },
      { id: "67926482", q: "Ekranda bir kart numarasının yalnızca son dört hanesinin görünüp geri kalanının yıldız olarak gösterilmesi hangisidir?", options: ["Maskeleme", "Şifreleme", "Tokenizasyon", "Hashing"], obj: "h2" },
      { id: "9c3a05aa", q: "Müşteri veritabanını teknik olarak saklayan, yedekleyen ve altyapısını işleten BT ekibi hangi rolü üstlenmiştir?", options: ["Veri koruyucu (custodian)", "Veri sahibi (owner)", "Son kullanıcı", "Denetçi"], obj: "h3" },
      { id: "88ac5cbf", q: "Bir kurumun veri sözlüğünü tutan, alan tanımlarının ve kalite kurallarının tutarlı olmasını sağlayan kişi hangi rolü üstlenir?", options: ["Veri sahibi (data owner)", "Veri koruyucu (data custodian)", "Veri görevlisi (data steward)", "Veri işleyen (data processor)"], obj: "h3" },
      { id: "c7d21e90", q: "Bir hastane, hasta kayıtlarını araştırma ekibine vermeden önce ad ve kimlik numarası gibi doğrudan tanımlayıcıları kaldırıyor. Bu işlem hangisidir?", options: ["Kimliksizleştirme (deidentification)", "Anahtar emanet (key escrow)", "Hava boşluğu (air gap)", "Yasal bekletme (legal hold)"], obj: "h4" },
      { id: "e2531ed0", q: "Bir perakendeci müşteri verilerini bir bulut CRM sağlayıcısına işletiyor; sağlayıcı da e-posta gönderimi için üçüncü bir şirketten hizmet alıyor. Bu üçüncü şirketin rolü nedir?", options: ["Alt işleyen (subprocessor)", "Veri sorumlusu (controller)", "Veri öznesi", "Veri koruyucu (custodian)"], obj: "h3" }
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
      { t: "warn", h: "Tuzak", text: "RAID yedekleme değildir. Dosyayı yanlışlıkla silersen ya da fidye yazılımı şifrelerse RAID bu değişikliği de aynalar." },
      { t: "steps", h: "Dayanıklılık ayrıntıları (V8)", items: [
        "Yük dengeleme trafiği birden çok sunucuya dağıtır. Otomatik ölçekleme (autoscaling) yüke göre sunucu sayısını kendiliğinden artırıp azaltır. Kümeleme (clustering): birden çok düğüm tek hizmet gibi çalışır; biri düşerse diğeri devralır.",
        "Güç yedekliliği: UPS kısa kesintiyi karşılar, jeneratör uzun kesintide devreye girer, yedekli güç kaynağı (RPS) cihazın bir kaynağı bozulsa da çalışmasını sürdürür, aşırı gerilim koruyucu ani yükselmeden korur.",
        "Kapasite planlama: gelecekteki kullanıcı, depolama, işlem gücü ve ağ ihtiyacını önceden hesaplayıp yetersizlik yüzünden kesinti yaşamamak.",
        "Platform çeşitliliği: tek satıcı, tek donanım ya da tek sanallaştırma ürününe bağımlı olmamak. Yedek testleri: geri yükleme testi (yedek gerçekten açılıyor mu), failover ve simülasyon."
      ] }
    ],
    objectives: [
      { id: "h1", text: "RTO ile RPO'yu ayırt edip bir ifadenin hangisini tanımladığını bulabilirsin." },
      { id: "h2", text: "Tam, artımlı ve fark yedeklerini geri dönüşte gereken zincire göre ayırt edebilirsin." },
      { id: "h3", text: "Hot, warm ve cold site seçeneklerini hız ve maliyetlerine göre sıralayıp yük dengeleme, otomatik ölçekleme ve güç yedekliliği çözümlerini ayırt edebilirsin." },
      { id: "h4", text: "RAID'in yedek olmadığını ve fidye yazılımına karşı 3-2-1 kuralını açıklayan seçeneği bulabilirsin." }
    ],
    summary: [
      "RTO sistemin kesintiden sonra ne kadar sürede geri gelmesi gerektiğini, RPO en fazla ne kadar veri kaybının kabul edileceğini belirtir.",
      "Fark (differential) yedek son tam yedekten bu yana değişenleri alır, geri dönüşte tam ve son fark yeterlidir; artımlıda tam ve tüm artımlı zincir gerekir.",
      "Hot site hazır ve en hızlı ama en pahalıdır, cold site boş alandır ve en yavaş ama en ucuzdur, warm site arasındadır.",
      "3-2-1 kuralı üç kopya, iki farklı ortam ve bir uzak ya da çevrimdışı kopyadır; fidye yazılımına karşı değiştirilemez ya da air gap yedek kritiktir.",
      "RAID disk arızasına dayanıklılık sağlar ama silinen ya da fidye yazılımıyla şifrelenen dosyayı da aynalar; yedek yerine geçmez."
    ],
    quiz: [
      { id: "4f265834", q: "'En çok 15 dakikalık veri kaybı kabul edilebilir' ifadesi hangi metriği tanımlar?", options: ["RPO", "RTO", "MTTR", "BIA"], obj: "h1" },
      { id: "035a190d", q: "Son tam yedekten bu yana değişen tüm verileri yedekleyen tür hangisidir?", options: ["Fark (differential)", "Artımlı", "Tam", "Snapshot"], obj: "h2" },
      { id: "c0993ef4", q: "Hazır ve çalışan, en hızlı devralan yedek tesis hangisidir?", options: ["Hot site", "Cold site", "Warm site", "Air gap"], obj: "h3" },
      { id: "5e07df81", q: "RAID için hangisi doğrudur?", options: ["Yedekleme yerine geçmez", "Fidye yazılımına karşı korur", "Silinen dosyayı geri getirir", "Hepsi"], obj: "h4" },
      { id: "20b5dfdf", q: "Bir sistemin kesintiden sonra en geç 4 saat içinde tekrar çalışır hale getirilmesi gerektiği belirtiliyor. Bu hangi metriktir?", options: ["RTO", "RPO", "BIA", "Failover"], obj: "h1" },
      { id: "7110cbc2", q: "Geri dönüşte son tam yedeğin yanı sıra o günden itibaren alınan tüm yedeklerin sırayla uygulanması gereken tür hangisidir?", options: ["Artımlı (incremental)", "Fark (differential)", "Tam (full)", "RAID"], obj: "h2" },
      { id: "80c4f2c7", q: "3-2-1 yedekleme kuralındaki '1' neyi ifade eder?", options: ["Bir kopyanın uzakta ya da çevrimdışı tutulması", "Bir yedek yazılımı kullanmak", "Bir günlük saklama süresi", "Tek bir disk kullanmak"], obj: "h4" },
      { id: "080479e4", q: "Yedek tesis seçeneklerini devralma hızı en yavaştan en hızlıya (maliyet de en düşükten en yükseğe) sıralayan seçenek hangisidir?", options: ["Cold, warm, hot","Hot, warm, cold","Warm, cold, hot","Hot, cold, warm"], obj: "h3" },
      { id: "7924b1af", q: "Bir e-ticaret sitesi kampanya saatlerinde yavaşlıyor, geceleri ise sunucuların çoğu boşta kalıyor. Ekip sunucu sayısını yüke göre otomatik artırıp azaltmak istiyor. Hangi çözüm uygundur?", options: ["Soğuk site (cold site)", "Otomatik ölçekleme (autoscaling)", "Disk aynalama (RAID 1)", "Değişmez (immutable) yedekleme"], obj: "h3" },
      { id: "4143bfe4", q: "Veri merkezindeki kritik bir sunucunun tek güç kaynağı arızalanınca sunucu kapandı. Bu tekil hata noktasını gidermek için sunucuya ne eklenmelidir?", options: ["Aşırı gerilim koruyucu (surge protector)", "Sıcak site (hot site)", "Yedekli güç kaynağı (redundant power supply)", "Uzak konumda yedek (off-site backup)"], obj: "h3" }
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
      { t: "warn", h: "Tuzak", text: "Sertleştirme bir kerelik iş değildir. Yamalar çıkar, ayarlar kayar. Baseline ile karşılaştırıp sapmayı sürekli izlemek gerekir." },
      { t: "steps", h: "İşletim sistemi sertleştirme araçları (V8)", items: [
        "Grup İlkesi (Group Policy, GPO): Windows etki alanında parola kuralı, USB engeli, kilit ekranı gibi ayarları yüzlerce makineye merkezden dağıtır ve uygulatır.",
        "SELinux: Linux çekirdeğinde zorunlu erişim denetimi (MAC) uygular. Bir süreç ele geçirilse bile politikanın izin vermediği dosyalara ve portlara erişemez; hasarı sınırlar."
      ] }
    ],
    objectives: [
      { id: "h1", text: "Yeni kurulan bir sistemde uygulanacak sertleştirme adımlarını, güvenli protokol tercihlerini ve Grup İlkesi ile SELinux gibi işletim sistemi araçlarının rolünü seçebilirsin." },
      { id: "h2", text: "Altın imaj, CIS Benchmarks ve baseline kavramlarını amaçlarına göre eşleştirebilirsin." },
      { id: "h3", text: "Bir sistemin baseline'dan sapmasını (drift) tanıyıp sürekli izlenmesi gerektiğini bulabilirsin." }
    ],
    summary: [
      "Sertleştirmenin özü saldırı yüzeyini küçültmektir: gereksiz servis ve portları kapat, varsayılan hesapları değiştir, yamala.",
      "Telnet yerine SSH, HTTP yerine HTTPS, FTP yerine SFTP kullanılır; yönetim trafiği şifreli olmalıdır.",
      "Altın imaj önceden sertleştirilmiş şablondur ve çok sayıda sistemi aynı güvenli temelle kurmayı sağlar.",
      "CIS Benchmarks platform bazında hazır güvenli yapılandırma kılavuzlarıdır; baseline güvenli kabul edilen standart ayar setidir.",
      "Sertleştirme bir kerelik iş değildir; zamanla oluşan sapma (drift) baseline ile karşılaştırılarak izlenir."
    ],
    quiz: [
      { id: "3afa6ccd", q: "Yeni kurulan sunucuda ilk adımlardan biri hangisidir?", options: ["Gereksiz servisleri ve varsayılan hesapları kapatmak", "Tüm portları açmak", "Yöneticiye ortak hesap vermek", "Logları kapatmak"], obj: "h1" },
      { id: "5b6204a4", q: "Telnet yerine hangi protokol kullanılmalıdır?", options: ["SSH", "FTP", "HTTP", "SNMPv1"], obj: "h1" },
      { id: "91daeb64", q: "Önceden sertleştirilmiş şablon sanal makineye ne denir?", options: ["Altın imaj (golden image)", "Honeypot", "Sandbox", "Jump server"], obj: "h2" },
      { id: "998fdebd", q: "CIS Benchmarks nedir?", options: ["Güvenli yapılandırma rehberleri", "Zafiyet puanı", "Saldırı türü", "Şifreleme algoritması"], obj: "h2" },
      { id: "adb391b7", q: "Üç ay önce sertleştirilen sunucuda, bir yöneticinin sonradan açtığı port baseline ile karşılaştırınca ortaya çıkıyor. Bu durum nasıl adlandırılır?", options: ["Yapılandırma sapması (drift)", "Altın imaj", "Honeypot", "Zero-day"], obj: "h3" },
      { id: "ff281718", q: "Bir switch'in sertleştirilmesi için hangisi doğrudur?", options: ["Kullanılmayan portları kapatmak, Telnet yerine SSH kullanmak ve yönetimi ayrı VLAN'dan yapmak", "Varsayılan parolayı kolay hatırlansın diye korumak ve kullanılmayan portları açık bırakmak", "Tüm portları açık bırakıp yalnızca trafiği izleyerek riski yönetmeye çalışmak", "Yönetimi herkese açık kullanıcı VLAN'ından Telnet ile yapmak ve logları kapatmak"], obj: "h1" },
      { id: "176da637", q: "Bir Linux web sunucusunda uygulama süreci ele geçirilmiş ve saldırgan /home altındaki dosyalara erişmeye çalışıyor, ama işletim sistemi politikası buna izin vermiyor. Bu davranışı sağlayan mekanizma hangisidir?", options: ["Grup İlkesi (GPO)", "TLS denetimi", "SELinux (zorunlu erişim denetimi)", "NAC"], obj: "h1" }
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

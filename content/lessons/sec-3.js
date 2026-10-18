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
      { q: "Çıkan bağlantının dönüş trafiğine otomatik izin veren güvenlik duvarı türü hangisidir?", options: ["Stateful", "Stateless paket filtresi", "Hub", "Repeater"], answer: "Stateful", why: "Stateful bağlantı durumunu tutar.", obj: "h1", whyNot: { "Stateless paket filtresi": "Stateless filtre her paketi bağlantı geçmişini bilmeden değerlendirir; dönüş trafiği için ayrı kural ister.", "Hub": "Hub paketleri tüm portlara kopyalayan bir ağ cihazıdır, trafiği filtrelemez.", "Repeater": "Repeater sinyali yeniler; kural ya da bağlantı durumu tutmaz." } },
      { q: "Güvenlik duvarı kuralları nasıl işlenir?", options: ["Yukarıdan aşağıya, ilk eşleşen çalışır", "Aşağıdan yukarıya", "Rastgele", "Hepsi birlikte"], answer: "Yukarıdan aşağıya, ilk eşleşen çalışır", why: "Kural sırası önemlidir.", obj: "h2", whyNot: { "Aşağıdan yukarıya": "Kurallar yukarıdan aşağıya okunur; aşağıdan başlamak ilk eşleşen kuralı değiştirir.", "Rastgele": "Değerlendirme belirlidir; rastgele olsaydı politika öngörülemez olurdu.", "Hepsi birlikte": "Kurallar sırayla değerlendirilir; ilk eşleşen çalıştığı için hepsi birlikte uygulanmaz." } },
      { q: "IDS ile IPS arasındaki fark nedir?", options: ["IDS alarm verir, IPS engeller", "IDS engeller, IPS alarm verir", "İkisi de aynıdır", "IDS sadece loglar tutar"], answer: "IDS alarm verir, IPS engeller", why: "IPS hattın üzerinde olup saldırıyı durdurabilir.", obj: "h3", whyNot: { "IDS engeller, IPS alarm verir": "Roller ters verilmiş; hattın üzerinde engelleyen IPS, alarm veren IDS'tir.", "İkisi de aynıdır": "İkisi de saldırıyı tespit eder ama IPS hat üzerinde olduğu için engelleme yeteneği de vardır.", "IDS sadece loglar tutar": "IDS log tutmakla kalmaz, şüpheli trafikte alarm üretir; fark engelleme yeteneğindedir." } },
      { q: "Web uygulamasını SQL injection ve XSS isteklerine karşı filtreleyen çözüm hangisidir?", options: ["WAF", "NAC", "VPN", "DHCP"], answer: "WAF", why: "Web Application Firewall HTTP isteklerini inceler.", obj: "h3", whyNot: { "NAC": "NAC cihazı sağlığına ve kimliğine göre ağa kabul eder; web isteklerinin içeriğini incelemez.", "VPN": "VPN trafiği şifreleyen tünel kurar; SQL injection isteğini filtrelemez.", "DHCP": "DHCP IP adresi dağıtır; web saldırılarına karşı koruma sağlamaz." } },
      { q: "Kurallar sırayla şöyledir: (1) İzin ver, any → 10.0.5.20, TCP 443; (2) Engelle, any → any, her protokol. 10.0.5.20 adresine gelen bir TCP 22 paketine ne olur?", options: ["Engellenir: 1. kural eşleşmez, 2. kural eşleşip engeller", "İzin verilir: hedef adresi 1. kuralla eşleşiyor", "İzin verilir: kurallar toplu değerlendirilir", "Rastgele bir kural uygulanır"], answer: "Engellenir: 1. kural eşleşmez, 2. kural eşleşip engeller", why: "1. kural yalnızca TCP 443 için geçerlidir; 22. port ilk eşleşen kuralda 'engelle'ye düşer.", obj: "h2", whyNot: { "İzin verilir: hedef adresi 1. kuralla eşleşiyor": "Kural yalnızca adrese değil porta da bakar; 22 numaralı port 443 ile eşleşmez.", "İzin verilir: kurallar toplu değerlendirilir": "Kurallar toplu değil sırayla değerlendirilir ve ilk eşleşen çalışır.", "Rastgele bir kural uygulanır": "Değerlendirme sıralıdır; sonuç kural sırasına göre belirlidir." } },
      { q: "Her paketi bağlantı geçmişini bilmeden tek tek kurala göre değerlendiren, bu yüzden dönüş trafiği için ayrı kural isteyen güvenlik duvarı türü hangisidir?", options: ["Stateless paket filtresi", "Stateful", "NGFW", "Uygulama katmanı proxy"], answer: "Stateless paket filtresi", why: "Bağlantı tablosu tutmadığı için giden isteğin cevabını tanıyamaz; hızlıdır ama kural yazımı daha yüklüdür.", obj: "h1", whyNot: { "Stateful": "Stateful bağlantı tablosu tuttuğu için dönüş trafiğine ayrı kural gerektirmeden izin verir.", "NGFW": "NGFW bağlantı durumunun yanında uygulama tanıma, IPS ve kullanıcı kimliği de içerir.", "Uygulama katmanı proxy": "Proxy içeriği ve uygulamayı inceler; paketleri tek tek, durumsuz değerlendirmek tanımı değildir." } }
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
      { q: "İki ofisin ağlarını birbirine bağlayan VPN türü hangisidir?", options: ["Site-to-site", "Remote access", "Split tunnel", "Proxy"], answer: "Site-to-site", why: "Ofis ağları arasında kalıcı tünel kurar.", obj: "h1", whyNot: { "Remote access": "Remote access tek kullanıcıyı istemci yazılımıyla şirkete bağlar; iki ofis ağını kalıcı bağlamaz.", "Split tunnel": "Split tunnel bir tünel şeklidir (hangi trafiğin tünele gireceği), iki ağı bağlayan VPN türü değildir.", "Proxy": "Proxy istemci adına dış dünyaya çıkan vekil sunucudur; iki ağı şifreli tünelle bağlamaz." } },
      { q: "Yalnızca şirket trafiğini VPN'den geçiren, kalan trafiği doğrudan internetten çıkaran yapı hangisidir?", options: ["Split tunnel", "Full tunnel", "Air gap", "DMZ"], answer: "Split tunnel", why: "Tüm trafik değil, sadece belirlenen trafik tünele girer.", obj: "h2", whyNot: { "Full tunnel": "Full tunnelda tüm trafik VPN'den geçer; soruda ise yalnızca şirket trafiği tünele giriyor.", "Air gap": "Air gap sistemi ağdan koparmaktır; VPN trafiği yönlendirme biçimi değildir.", "DMZ": "DMZ internete açık servislerin bölgesidir; VPN tünel biçimiyle ilgisi yoktur." } },
      { q: "IPsec'te hem şifreleme hem bütünlük sağlayan bileşen hangisidir?", options: ["ESP", "AH", "DNS", "NAT"], answer: "ESP", why: "ESP şifreleme ve bütünlük sunar; AH sadece bütünlük/kimlik.", obj: "h3", whyNot: { "AH": "AH bütünlük ve kimlik doğrulama sağlar ama veriyi şifrelemez.", "DNS": "DNS alan adı çözümler; IPsec bileşeni değildir.", "NAT": "NAT adres çevirir; şifreleme ya da bütünlük sağlamaz." } },
      { q: "VPN güvenliği için zorunlu tutulması en doğru olan hangisidir?", options: ["MFA", "Parolayı e-postayla göndermek", "Eski protokol", "Herkese yönetici hakkı"], answer: "MFA", why: "Tek faktörlü VPN, çalınan parolayla içeri girişe açıktır.", obj: "h4", whyNot: { "Parolayı e-postayla göndermek": "Parolayı e-postayla göndermek kimlik bilgisini açığa çıkarır, VPN güvenliğini zayıflatır.", "Eski protokol": "Eski protokoller bilinen zayıflıklar taşır; güncel IKEv2 ve TLS 1.2+ tercih edilmelidir.", "Herkese yönetici hakkı": "Herkese yönetici hakkı en az yetki ilkesine aykırıdır ve ele geçen hesabın zararını büyütür." } },
      { q: "Evden çalışan tek bir çalışanın kendi bilgisayarından şirket ağına güvenli bağlanması için hangi VPN türü kullanılır?", options: ["Remote access VPN", "Site-to-site VPN", "Air gap", "Honeypot"], answer: "Remote access VPN", why: "Tek kullanıcıdan şirket ağına, istemci yazılımıyla kurulan tünel remote access VPN'dir.", obj: "h1", whyNot: { "Site-to-site VPN": "Site-to-site iki ofis ağını router ya da firewall seviyesinde bağlar, tek bir kullanıcıyı değil.", "Air gap": "Air gap ağ bağlantısını tamamen keser; uzaktan erişim sağlamaz.", "Honeypot": "Honeypot saldırganı çekmek için kurulmuş tuzaktır, kullanıcı erişimi sağlamaz." } },
      { q: "Güvenlik ekibi tüm çalışan trafiğinin şirket güvenlik duvarından geçip izlenmesini istiyor. Hangi yapı kurulmalıdır?", options: ["Full tunnel", "Split tunnel", "Always-on VPN", "Site-to-site VPN"], answer: "Full tunnel", why: "Full tunnelda internet trafiği de dahil her şey tünelden geçer; izleme ve filtreleme bu yüzden kolaydır.", obj: "h2", whyNot: { "Split tunnel": "Split tunnelda internet trafiği tünel dışında doğrudan çıkar, bu yüzden şirket onu göremez.", "Always-on VPN": "Always-on yalnızca bağlantının otomatik kurulmasını sağlar; tüm trafiğin tünelden geçeceğini garanti etmez.", "Site-to-site VPN": "Site-to-site ofis ağlarını bağlar; tek bir çalışanın internet trafiğini yönlendirmez." } },
      { q: "IPsec'te tüm IP paketini yeni bir IP başlığıyla saran ve site-to-site VPN'de kullanılan mod hangisidir?", options: ["Tunnel modu", "Transport modu", "AH", "IKE"], answer: "Tunnel modu", why: "Tunnel modu orijinal paketi bütünüyle kapsüller; transport modu yalnızca veriyi şifreler.", obj: "h3", whyNot: { "Transport modu": "Transport modu sadece veriyi (payload) şifreler, orijinal IP başlığını yeni bir başlıkla sarmaz.", "AH": "AH bir mod değil, bütünlük sağlayan protokoldür.", "IKE": "IKE anahtar anlaşmasını yapar; paketi kapsüllemez." } }
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
    objectives: [
      { id: "h1", text: "IaaS, PaaS ve SaaS'ta sağlayıcı ile müşterinin sorumluluk sınırını ayırt edebilirsin." },
      { id: "h2", text: "Bulut veri sızıntılarının en yaygın nedenini bulup uygun önlemi seçebilirsin." },
      { id: "h3", text: "VM sprawl, VM escape ve konteyner risklerini birbirinden ayırt edebilirsin." }
    ],
    summary: [
      "Paylaşılan sorumlulukta sağlayıcı veri merkezini, donanımı ve sanallaştırma katmanını korur; kimlik, erişim ve veri her modelde müşteridedir.",
      "IaaS'ta işletim sistemi yaması müşteriye, PaaS'ta uygulama ve veri müşteriye aittir; SaaS'ta sorumluluk sağlayıcıya kayar ama veri ve kullanıcılar sende kalır.",
      "Haberlere çıkan bulut sızıntılarının çoğu hack değil yanlış yapılandırmadır, örneğin herkese açık depolama kovası.",
      "VM sprawl kontrolsüz çoğalıp yamasız kalan sanal makinelerdir; VM escape saldırganın sanal makineden hypervisor'a kaçışıdır.",
      "Bulut güvenliğinin temelleri MFA, en az yetki, kök hesabı kullanmama, beklerken ve aktarılırken şifreleme ile loglamadır."
    ],
    quiz: [
      { q: "SaaS modelinde müşterinin hâlâ sorumlu olduğu şey hangisidir?", options: ["Veri ve kullanıcı erişimi", "Fiziksel veri merkezi", "Hypervisor yaması", "Ağ kabloları"], answer: "Veri ve kullanıcı erişimi", why: "SaaS'ta bile veri ve erişim müşteridedir.", obj: "h1", whyNot: { "Fiziksel veri merkezi": "Fiziksel veri merkezini sağlayıcı korur; müşteri sorumluluğu değildir.", "Hypervisor yaması": "Hypervisor sanallaştırma katmanıdır ve sağlayıcıya aittir.", "Ağ kabloları": "Veri merkezindeki kablolama sağlayıcının fiziksel altyapısıdır." } },
      { q: "IaaS'ta sanal makinenin işletim sistemi yamasından kim sorumludur?", options: ["Müşteri", "Bulut sağlayıcısı", "ISP", "Kimse"], answer: "Müşteri", why: "IaaS'ta işletim sistemi ve üstü müşteriye aittir.", obj: "h1", whyNot: { "Bulut sağlayıcısı": "IaaS'ta sağlayıcı donanımı ve hypervisor'u yönetir; müşterinin sanal makinesinin işletim sistemi müşteriye aittir.", "ISP": "İnternet servis sağlayıcı yalnızca bağlantıyı sunar, VM'in işletim sistemini yönetmez.", "Kimse": "Yamasız bırakılan işletim sistemi saldırıya açıktır; sorumluluk müşterinin üzerindedir." } },
      { q: "Kontrolsüz şekilde çoğalan, yamalanmayan sanal makineler hangi riskin örneğidir?", options: ["VM sprawl", "VM escape", "Rogue DHCP", "Tailgating"], answer: "VM sprawl", why: "Yönetilmeyen VM'ler saldırı yüzeyini büyütür.", obj: "h3", whyNot: { "VM escape": "VM escape saldırganın VM'den hypervisor'a kaçmasıdır; sorudaki sorun kontrolsüz çoğalma ve yamasızlıktır.", "Rogue DHCP": "Rogue DHCP ağa sahte DHCP sunucusu eklemektir; sanal makine çoğalmasıyla ilgisi yoktur.", "Tailgating": "Tailgating yetkili birinin arkasından fiziksel olarak içeri girmektir." } },
      { q: "Bulut ortamında en yaygın veri sızıntısı nedeni hangisidir?", options: ["Yanlış yapılandırma", "Zero-day", "Fiziksel hırsızlık", "DDoS"], answer: "Yanlış yapılandırma", why: "Herkese açık depolama gibi ayar hataları çok yaygındır.", obj: "h2", whyNot: { "Zero-day": "Zero-day nadir görülür; bulut sızıntılarının çoğu bilinen ama yanlış ayarlanmış yapılandırmalardan gelir.", "Fiziksel hırsızlık": "Veri merkezi fiziksel güvenliği sağlayıcıdadır; sızıntıların ana nedeni bu değildir.", "DDoS": "DDoS hizmeti kesintiye uğratır, veriyi sızdırmaz." } },
      { q: "PaaS modelinde müşterinin yönetmeye devam ettiği şey hangisidir?", options: ["Uygulama ve veri", "İşletim sistemi yaması ve hypervisor", "Fiziksel veri merkezi güvenliği", "Ağ donanımı ve sunucu rafları"], answer: "Uygulama ve veri", why: "PaaS'ta platformu sağlayıcı yönetir; müşteri kendi uygulamasını ve verisini yönetir.", obj: "h1", whyNot: { "İşletim sistemi yaması ve hypervisor": "PaaS'ta işletim sistemini platform yönetir ve hypervisor sağlayıcıdadır; işletim sistemi yaması müşteriye ancak IaaS'ta düşer.", "Fiziksel veri merkezi güvenliği": "Fiziksel güvenlik hiçbir hizmet modelinde müşteriye ait değildir.", "Ağ donanımı ve sunucu rafları": "Donanım sağlayıcının fiziksel altyapısıdır." } },
      { q: "Bir geliştirici veritabanı yedeğini herkese açık bulut depolama kovasına koydu. İlk önlem hangisi olmalıdır?", options: ["Kovada herkese açık erişimi kapatıp erişimi en az yetkiyle sınırlamak", "Hypervisor'u yamalamak", "Sanal makine sayısını azaltmak", "Sağlayıcıdan veri merkezini yeniden kurmasını istemek"], answer: "Kovada herkese açık erişimi kapatıp erişimi en az yetkiyle sınırlamak", why: "Sorun müşteri tarafı yapılandırma hatasıdır; kovanın erişim ayarı müşterinin sorumluluğundadır.", obj: "h2", whyNot: { "Hypervisor'u yamalamak": "Hypervisor sağlayıcının sorumluluğundadır ve sızıntı yapılandırmadan kaynaklanıyor.", "Sanal makine sayısını azaltmak": "VM sprawl'u azaltır ama açık kovadaki veriyi korumaz.", "Sağlayıcıdan veri merkezini yeniden kurmasını istemek": "Veri merkezi güvenli; hata müşterinin kendi erişim ayarındadır." } },
      { q: "Bir sanal makineyi ele geçiren saldırganın hypervisor'a ve komşu sanal makinelere ulaşması hangi riskle anılır?", options: ["VM escape", "VM sprawl", "Tokenizasyon", "Split tunnel"], answer: "VM escape", why: "VM escape sanal makine sınırını aşıp hypervisor'a geçmektir; tenant izolasyonunu tehdit eder.", obj: "h3", whyNot: { "VM sprawl": "VM sprawl kontrolsüz çoğalan sanal makinelerdir; bir saldırının sınır aşması değildir.", "Tokenizasyon": "Tokenizasyon hassas veriyi jetonla değiştiren bir veri koruma yöntemidir.", "Split tunnel": "Split tunnel VPN trafiğinin bir kısmını tünel dışına çıkarma yapılandırmasıdır." } }
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
    objectives: [
      { id: "h1", text: "Verinin hangi halde (at rest, in transit, in use) olduğunu tanıyıp uygun korumayı eşleştirebilirsin." },
      { id: "h2", text: "Tokenizasyon, maskeleme ve DLP'yi ne yaptıklarına göre ayırt edebilirsin." },
      { id: "h3", text: "Veri sahibi (owner) ile veri koruyucu (custodian) rollerini ayırt edebilirsin." }
    ],
    summary: [
      "Veri üç halde korunur: beklerken disk ve veritabanı şifrelemesiyle, aktarılırken TLS ve VPN ile, kullanımdayken erişim kontrolüyle.",
      "Tokenizasyon hassas veriyi anlamsız bir jetonla değiştirir ve orijinal veri ayrı güvenli bir kasada kalır.",
      "Maskeleme veriyi yalnızca görünümde gizler (**** 1234), şifreleme ise veriyi anahtarla korur; ikisi aynı şey değildir.",
      "DLP e-posta ve dosya trafiğinde TC kimlik numarası gibi hassas veri desenlerini yakalayıp engeller; önce verinin sınıflandırılmış olması gerekir.",
      "Veri sahibi sınıfı ve erişimi belirler, veri koruyucu teknik olarak saklar ve korur."
    ],
    quiz: [
      { q: "Verinin ağda taşınırken korunması hangi veri halini ifade eder?", options: ["Aktarılırken (in transit)", "Beklerken (at rest)", "Kullanımda (in use)", "Arşivde"], answer: "Aktarılırken (in transit)", why: "TLS ve VPN bu hali korur.", obj: "h1", whyNot: { "Beklerken (at rest)": "At rest diskte ya da veritabanında duran veridir; ağda taşınan veri değildir.", "Kullanımda (in use)": "In use bellekte işlenen veridir; ağ üzerinden taşınmasıyla ilgili değildir.", "Arşivde": "Arşivdeki veri de beklerken halindedir; taşınma durumunu anlatmaz." } },
      { q: "Kredi kartı numarasını sistemde anlamsız bir jetonla değiştirmek hangisidir?", options: ["Tokenizasyon", "Hashing", "Bitirme", "Yedekleme"], answer: "Tokenizasyon", why: "Hassas veri yerine jeton saklanır, gerçek veri ayrı kasadadır.", obj: "h2", whyNot: { "Hashing": "Hash tek yönlüdür ve geri çevrilemez; tokenizasyonda ise gerçek veri kasada tutulur ve gerektiğinde jetonla eşleştirilir.", "Bitirme": "Bitirme diye bir veri koruma yöntemi yoktur; sorudaki uygulama tokenizasyondur.", "Yedekleme": "Yedekleme veriyi kopyalar; hassas veriyi jetonla değiştirmez." } },
      { q: "Kurumdan çıkan e-postalarda TC kimlik numarası desenini yakalayıp engelleyen çözüm hangisidir?", options: ["DLP", "IDS", "NAC", "VPN"], answer: "DLP", why: "Data Loss Prevention hassas veri desenlerini izler.", obj: "h2", whyNot: { "IDS": "IDS ağdaki şüpheli saldırıları izler; e-posta içeriğinde veri deseni aramaz.", "NAC": "NAC cihazın ağa kabulünü denetler; kurumdan çıkan veriyi izlemez.", "VPN": "VPN trafiği şifreler ama içeriği inceleyip TC kimlik numarası arayıp engellemez." } },
      { q: "Verinin önem düzeyini ve erişimini belirleyen rol hangisidir?", options: ["Veri sahibi (owner)", "Veri koruyucu (custodian)", "Kullanıcı", "Ağ yöneticisi"], answer: "Veri sahibi (owner)", why: "Sahip sınıflandırmadan ve erişim kararlarından sorumludur.", obj: "h3", whyNot: { "Veri koruyucu (custodian)": "Custodian veriyi teknik olarak saklar ve korur; sınıf ve erişim kararını vermez.", "Kullanıcı": "Kullanıcı veriyi iş için kullanır; sınıflandırma kararı ona ait değildir.", "Ağ yöneticisi": "Ağ yöneticisi altyapıyı işletir; verinin önem düzeyini belirleme yetkisi veri sahibindedir." } },
      { q: "Veritabanı dosyalarını diskte AES ile şifrelemek verinin hangi halini korur?", options: ["Beklerken (at rest)", "Aktarılırken (in transit)", "Kullanımda (in use)", "Hiçbirini"], answer: "Beklerken (at rest)", why: "Diskte duran veriyi korur; ağda taşınma için TLS ve VPN, bellekte işlenme için erişim kontrolü gerekir.", obj: "h1", whyNot: { "Aktarılırken (in transit)": "Aktarım halinde veriyi TLS ve VPN korur; disk şifrelemesi ağdaki trafiğe uygulanmaz.", "Kullanımda (in use)": "Bellekte işlenen veri çözülmüş haldedir; disk şifrelemesi bunu korumaz.", "Hiçbirini": "Disk şifreleme çalınan diskteki ya da kopyalanan dosyadaki veriyi korur, yani beklerken halini." } },
      { q: "Ekranda bir kart numarasının yalnızca son dört hanesinin görünüp geri kalanının yıldız olarak gösterilmesi hangisidir?", options: ["Maskeleme", "Şifreleme", "Tokenizasyon", "Hashing"], answer: "Maskeleme", why: "Maskeleme veriyi yalnızca gösterimde gizler; altta orijinal veri değişmez.", obj: "h2", whyNot: { "Şifreleme": "Şifreleme veriyi anahtarla okunamaz hale getirir; yıldızlama bir gösterim tercihidir.", "Tokenizasyon": "Tokenizasyon veriyi anlamsız bir jetonla değiştirir ve orijinali kasada tutar.", "Hashing": "Hash tek yönlü bir özettir; kısmen gösterim yapmaz." } },
      { q: "Müşteri veritabanını teknik olarak saklayan, yedekleyen ve altyapısını işleten BT ekibi hangi rolü üstlenmiştir?", options: ["Veri koruyucu (custodian)", "Veri sahibi (owner)", "Son kullanıcı", "Denetçi"], answer: "Veri koruyucu (custodian)", why: "Custodian teknik koruma ve saklamadan sorumludur; sınıf ve erişim kararını sahip verir.", obj: "h3", whyNot: { "Veri sahibi (owner)": "Owner sınıfı ve erişimi belirleyen iş tarafı yetkilisidir; teknik saklama onun işi değildir.", "Son kullanıcı": "Son kullanıcı veriyi iş için kullanır; altyapıyı ve yedeği işletmez.", "Denetçi": "Denetçi kontrollerin uygunluğunu değerlendirir; veriyi saklamaz." } }
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
    objectives: [
      { id: "h1", text: "RTO ile RPO'yu ayırt edip bir ifadenin hangisini tanımladığını bulabilirsin." },
      { id: "h2", text: "Tam, artımlı ve fark yedeklerini geri dönüşte gereken zincire göre ayırt edebilirsin." },
      { id: "h3", text: "Hot, warm ve cold site seçeneklerini hız ve maliyetlerine göre sıralayabilirsin." },
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
      { q: "'En çok 15 dakikalık veri kaybı kabul edilebilir' ifadesi hangi metriği tanımlar?", options: ["RPO", "RTO", "MTTR", "BIA"], answer: "RPO", why: "RPO, kabul edilebilir veri kaybı noktasıdır.", obj: "h1", whyNot: { "RTO": "RTO sistemin ne kadar sürede geri geleceğini söyler, kaybedilebilir veri miktarını değil.", "MTTR": "MTTR ortalama onarım süresini ölçen operasyonel bir göstergedir; kabul edilen veri kaybı hedefi değildir.", "BIA": "BIA hangi sistemin kesilince en çok zarar verdiğini bulan analizdir, veri kaybı sınırını belirleyen metrik değildir." } },
      { q: "Son tam yedekten bu yana değişen tüm verileri yedekleyen tür hangisidir?", options: ["Fark (differential)", "Artımlı", "Tam", "Snapshot"], answer: "Fark (differential)", why: "Fark yedek son tam yedeğe göre değişenleri alır.", obj: "h2", whyNot: { "Artımlı": "Artımlı yalnızca son yedekten (tam ya da artımlı) bu yana değişenleri alır, son tam yedekten itibaren birikeni değil.", "Tam": "Tam yedek her şeyin kopyasıdır; yalnızca değişenleri almaz.", "Snapshot": "Snapshot belirli andaki görüntüdür; son tam yedeğe göre fark alma tanımı değildir." } },
      { q: "Hazır ve çalışan, en hızlı devralan yedek tesis hangisidir?", options: ["Hot site", "Cold site", "Warm site", "Air gap"], answer: "Hot site", why: "Hot site kısa sürede devralır; en pahalı seçenektir.", obj: "h3", whyNot: { "Cold site": "Cold site boş alandır ve en yavaş devralan seçenektir.", "Warm site": "Warm site kısmen hazırdır; hot site kadar hızlı devralmaz.", "Air gap": "Air gap ağdan ayrılmış sistemdir, yedek tesis türü değildir." } },
      { q: "RAID için hangisi doğrudur?", options: ["Yedekleme yerine geçmez", "Fidye yazılımına karşı korur", "Silinen dosyayı geri getirir", "Hepsi"], answer: "Yedekleme yerine geçmez", why: "RAID disk arızasına dayanıklıdır, silinme/şifrelenmeye değil.", obj: "h4", whyNot: { "Fidye yazılımına karşı korur": "RAID değişikliği aynalar; fidye yazılımı dosyaları şifrelediğinde şifreli hali de kopyalanır.", "Silinen dosyayı geri getirir": "RAID silmeyi de diğer disklere yansıtır; silinen dosyayı geri getiren yedektir.", "Hepsi": "Seçeneklerden yalnızca biri doğrudur; RAID fidye yazılımına ve silinmeye karşı korumaz." } },
      { q: "Bir sistemin kesintiden sonra en geç 4 saat içinde tekrar çalışır hale getirilmesi gerektiği belirtiliyor. Bu hangi metriktir?", options: ["RTO", "RPO", "BIA", "Failover"], answer: "RTO", why: "RTO kurtarma süresi hedefidir; RPO ise kabul edilen veri kaybı noktasıdır.", obj: "h1", whyNot: { "RPO": "RPO zaman değil, veri kaybı sınırını (ör. 15 dakikalık veri) anlatır.", "BIA": "BIA hangi sistemin kritik olduğunu bulan analizdir ve RTO/RPO değerlerinin girdisidir.", "Failover": "Failover birincil çökünce yedeğe geçmektir; bir hedef değil bir eylemdir." } },
      { q: "Geri dönüşte son tam yedeğin yanı sıra o günden itibaren alınan tüm yedeklerin sırayla uygulanması gereken tür hangisidir?", options: ["Artımlı (incremental)", "Fark (differential)", "Tam (full)", "RAID"], answer: "Artımlı (incremental)", why: "Artımlı yedekte her adım bir öncekine bağlıdır; zincirin tamamı gerekir.", obj: "h2", whyNot: { "Fark (differential)": "Fark yedekte geri dönüş için tam yedek ve son fark yeterlidir; tüm zincir gerekmez.", "Tam (full)": "Tam yedek tek başına geri dönüşe yeter; zincir gerektirmez.", "RAID": "RAID yedekleme türü değil disk dayanıklılığı yöntemidir." } },
      { q: "3-2-1 yedekleme kuralındaki '1' neyi ifade eder?", options: ["Bir kopyanın uzakta ya da çevrimdışı tutulması", "Bir yedek yazılımı kullanmak", "Bir günlük saklama süresi", "Tek bir disk kullanmak"], answer: "Bir kopyanın uzakta ya da çevrimdışı tutulması", why: "Uzak ya da çevrimdışı kopya, fidye yazılımı ve yangın gibi tek noktadan gelen kayıplara karşı korur.", obj: "h4", whyNot: { "Bir yedek yazılımı kullanmak": "Kural yazılım sayısını değil kopya, ortam ve konumu tarif eder.", "Bir günlük saklama süresi": "3-2-1 saklama süresiyle ilgili değildir.", "Tek bir disk kullanmak": "Kural tam tersine çeşitliliği ister: üç kopya ve iki farklı ortam." } }
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
    objectives: [
      { id: "h1", text: "Yeni kurulan bir sistemde uygulanacak sertleştirme adımlarını ve güvenli protokol tercihlerini seçebilirsin." },
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
      { q: "Yeni kurulan sunucuda ilk adımlardan biri hangisidir?", options: ["Gereksiz servisleri ve varsayılan hesapları kapatmak", "Tüm portları açmak", "Yöneticiye ortak hesap vermek", "Logları kapatmak"], answer: "Gereksiz servisleri ve varsayılan hesapları kapatmak", why: "Saldırı yüzeyini küçültmek sertleştirmenin özüdür.", obj: "h1", whyNot: { "Tüm portları açmak": "Açık port saldırı yüzeyini büyütür; sertleştirme gereksiz portları kapatır.", "Yöneticiye ortak hesap vermek": "Ortak hesap kullanıcı hesap verebilirliğini bozar; sertleştirme bunu yasaklar.", "Logları kapatmak": "Loglama sertleştirmenin parçasıdır; kapatmak olay tespitini imkansız kılar." } },
      { q: "Telnet yerine hangi protokol kullanılmalıdır?", options: ["SSH", "FTP", "HTTP", "SNMPv1"], answer: "SSH", why: "SSH şifreli uzaktan yönetim sağlar.", obj: "h1", whyNot: { "FTP": "FTP parolayı ve veriyi açık metin gönderir; dosya aktarımı protokolüdür, Telnet gibi uzaktan yönetim sağlamaz.", "HTTP": "HTTP web trafiği içindir ve şifrelemez; uzaktan komut satırı yönetimi sağlamaz.", "SNMPv1": "SNMPv1 izleme protokolüdür ve topluluk dizesini açık metin taşır; güvenli değildir." } },
      { q: "Önceden sertleştirilmiş şablon sanal makineye ne denir?", options: ["Altın imaj (golden image)", "Honeypot", "Sandbox", "Jump server"], answer: "Altın imaj (golden image)", why: "Aynı güvenli temelle çok sayıda sistem kurmayı sağlar.", obj: "h2", whyNot: { "Honeypot": "Honeypot saldırganı çekip izlemek için kurulan tuzak sistemdir, sertleştirilmiş şablon değildir.", "Sandbox": "Sandbox şüpheli kodu izole ortamda çalıştırmak içindir, sistem şablonu değildir.", "Jump server": "Jump server yönetilen sistemlere tek giriş noktasıdır, imaj şablonu değildir." } },
      { q: "CIS Benchmarks nedir?", options: ["Güvenli yapılandırma rehberleri", "Zafiyet puanı", "Saldırı türü", "Şifreleme algoritması"], answer: "Güvenli yapılandırma rehberleri", why: "Platform bazında sertleştirme ayarlarını sunar.", obj: "h2", whyNot: { "Zafiyet puanı": "Zafiyet puanını CVSS verir; CIS Benchmarks yapılandırma rehberidir.", "Saldırı türü": "Benchmarks bir saldırı sınıfı değil, savunma ayarlarının listesidir.", "Şifreleme algoritması": "Benchmarks algoritma tanımlamaz, ayar önerir (algoritma seçimini de içerebilir)." } },
      { q: "Üç ay önce sertleştirilen sunucuda, bir yöneticinin sonradan açtığı port baseline ile karşılaştırınca ortaya çıkıyor. Bu durum nasıl adlandırılır?", options: ["Yapılandırma sapması (drift)", "Altın imaj", "Honeypot", "Zero-day"], answer: "Yapılandırma sapması (drift)", why: "Zamanla sistemin baseline'dan uzaklaşmasıdır; bu yüzden sertleştirme sürekli izlenmelidir.", obj: "h3", whyNot: { "Altın imaj": "Altın imaj sapmanın değil, ilk güvenli şablonun adıdır.", "Honeypot": "Honeypot bir tuzak sistemdir; sapma tespiti değildir.", "Zero-day": "Zero-day üreticinin bilmediği zafiyettir; burada sorun yerel yapılandırma değişikliğidir." } },
      { q: "Bir switch'in sertleştirilmesi için hangisi doğrudur?", options: ["Kullanılmayan portları kapatmak, Telnet yerine SSH kullanmak ve yönetimi ayrı VLAN'dan yapmak", "Varsayılan parolayı kolay hatırlansın diye korumak", "Tüm portları açık bırakıp izlemek", "Yönetimi herkese açık VLAN'dan yapmak"], answer: "Kullanılmayan portları kapatmak, Telnet yerine SSH kullanmak ve yönetimi ayrı VLAN'dan yapmak", why: "Ağ cihazı sertleştirmesi varsayılanları değiştirir, yüzeyi küçültür ve yönetimi ayırır.", obj: "h1", whyNot: { "Varsayılan parolayı kolay hatırlansın diye korumak": "Varsayılan parola herkesçe bilinir; değiştirilmesi gerekir.", "Tüm portları açık bırakıp izlemek": "İzleme tek başına yüzeyi küçültmez; kullanılmayan portlar kapatılmalıdır.", "Yönetimi herkese açık VLAN'dan yapmak": "Yönetim erişimi ayrı bir ağdan yapılmalıdır, kullanıcı ağından değil." } }
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

/* CCNA 200-301 · sabit dersler 7-12 (Servisler, Güvenlik, Routing, Kablosuz) */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).ccna = (window.PP_LESSONS.ccna || {}));
  var CISCO = { title: "Cisco CCNA 200-301", url: "https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccna.html" };
  var JERE = { title: "Jeremy's IT Lab: Free CCNA 200-301 (YouTube kanalı)", url: "https://www.youtube.com/@JeremysITLab", type: "video", length: "Çok bölümlü", level: "başlangıç", lang: "EN" };
  var PT = { title: "Cisco: Packet Tracer (ücretsiz simülatör)", url: "https://www.netacad.com/cisco-packet-tracer", type: "araç", level: "başlangıç", lang: "EN" };
  function res(a, why) { var o = {}; for (var k in a) o[k] = a[k]; o.why = why; return o; }

  /* 7 ───────────────────────────────────────────── DHCP ve DNS */
  L[7] = {
    hook: "DHCP otele giren misafire oda numarası verir, DNS ise resepsiyondaki rehber gibi isimden oda numarasını bulur.",
    homework: "Bilgisayarında 'ipconfig /release' ve 'ipconfig /renew' çalıştır. Ardından 'nslookup google.com' yaz ve hangi DNS sunucusunun cevap verdiğini not et.",
    warmup: {
      recap: [
        { point: "169.254.x.x adresi DHCP'den adres alınamadığını gösterir.", example: "APIPA adresi" },
        { point: "Alt ağ maskesi ve gateway olmadan cihaz başka ağa çıkamaz.", example: "Default gateway = router" }
      ],
      concepts: [
        { term: "DHCP", tr: "Otomatik IP dağıtma servisi", summary: "IP, maske, gateway ve DNS'i otomatik verir.", example: "Ofiste herkese otomatik adres" },
        { term: "DNS", tr: "İsim-IP çevirisi", summary: "google.com adını IP adresine çevirir.", example: "nslookup google.com" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Yeni gelen çalışan bilgisayarını bağladı: IP yok, internet yok. Başka biri 'internete giremiyorum ama bazı sitelere IP ile girebiliyorum' diyor. İlki DHCP, ikincisi DNS sorunudur. Bu ikisini ayırt etmek günde birkaç kez işine yarar." },
      { t: "h", text: "DHCP: adresi kim verir?" },
      { t: "p", text: "DHCP (Dynamic Host Configuration Protocol), cihazlara IP adresi, alt ağ maskesi, default gateway ve DNS sunucusunu otomatik verir. Elle adres yazmak yerine sunucu havuzdan boş bir adres seçer ve belli süreliğine kiralar (lease)." },
      { t: "steps", h: "DORA: 4 adımda adres alma", items: [
        "Discover: yeni cihaz 'Bana adres verecek biri var mı?' diye broadcast eder.",
        "Offer: DHCP sunucusu 'Sana şu adresi verebilirim' diye teklif eder.",
        "Request: cihaz 'Tamam, bu adresi istiyorum' der.",
        "Acknowledge: sunucu 'Onaylandı, kiralama süresi şu kadar' der."
      ] },
      { t: "box", h: "Portlar", text: "DHCP sunucusu UDP 67, istemci UDP 68 kullanır. DHCP istemci broadcast ile başladığı için sunucu başka ağdaysa router'a 'ip helper-address' (DHCP relay) yazılır." },
      { t: "cmd", text: "# Cisco router'ı DHCP sunucusu yapma:\nRouter(config)# ip dhcp excluded-address 192.168.10.1 192.168.10.10\nRouter(config)# ip dhcp pool MUHASEBE\nRouter(dhcp-config)# network 192.168.10.0 255.255.255.0\nRouter(dhcp-config)# default-router 192.168.10.1\nRouter(dhcp-config)# dns-server 8.8.8.8\n\n# DHCP relay (sunucu başka ağda):\nRouter(config-if)# ip helper-address 192.168.1.5\n\nRouter# show ip dhcp binding" },
      { t: "h", text: "DNS: isimden IP'ye" },
      { t: "p", text: "İnsanlar google.com yazar, bilgisayarlar IP ile çalışır. DNS (Domain Name System) isimleri IP adreslerine çevirir. Benzetme: telefon rehberi. İsmi bulursun, numarayı rehber verir. DNS genellikle UDP 53 kullanır." },
      { t: "steps", h: "En çok kullanılan DNS kayıtları", items: [
        "A: isim → IPv4 adresi",
        "AAAA: isim → IPv6 adresi",
        "CNAME: bir ismin takma adı (başka bir isme yönlendirir)",
        "MX: o alan adının e-posta sunucusu",
        "PTR: IP → isim (ters sorgu)"
      ] },
      { t: "cmd", text: "# Windows'ta:\nipconfig /release\nipconfig /renew\nipconfig /flushdns\nnslookup google.com\nping 8.8.8.8\nping google.com" },
      { t: "box", h: "DHCP mi DNS mi? Hızlı ayrım", text: "ping 8.8.8.8 çalışıyor ama ping google.com çalışmıyorsa sorun DNS'tedir. IP hiç yoksa ya da 169.254 görüyorsan sorun DHCP'dedir (ya da DHCP'ye ulaşılamıyor)." },
      { t: "warn", h: "Tuzak", text: "Ağda iki DHCP sunucusu olması (örneğin biri yanlışlıkla bağlanmış bir ev router'ı) yanlış gateway dağıtır ve ağın yarısı internete çıkamaz. 'Rogue DHCP' denir." }
    ],
    quiz: [
      { q: "DHCP'nin 4 adımı hangi sırayla ilerler?", options: ["Discover, Offer, Request, Acknowledge", "Request, Offer, Discover, Acknowledge", "Offer, Discover, Acknowledge, Request", "Discover, Request, Offer, Acknowledge"], answer: "Discover, Offer, Request, Acknowledge", why: "DORA: Discover, Offer, Request, Acknowledge." },
      { q: "ping 8.8.8.8 çalışıyor ama ping google.com çalışmıyor. Sorun nerede?", options: ["DHCP", "DNS", "Kablo", "Switch portu"], answer: "DNS", why: "IP ile erişim var, isim çözülemiyor. Bu DNS sorunudur." },
      { q: "DNS'de alan adını IPv4 adresine çeviren kayıt türü hangisidir?", options: ["MX", "CNAME", "A", "PTR"], answer: "A", why: "A kaydı isim-IPv4 eşleşmesidir. AAAA ise IPv6 içindir." },
      { q: "DHCP sunucusu farklı bir ağdaysa router'a hangi komut eklenir?", options: ["ip helper-address", "ip dhcp pool", "ip route", "ip nat inside"], answer: "ip helper-address", why: "DHCP relay, istemcinin broadcast isteğini unicast olarak sunucuya iletir." },
      { q: "Bir bilgisayarın IP'sini bırakıp yenisini istemek için hangi komutlar kullanılır?", options: ["ipconfig /release ve /renew", "ping ve tracert", "arp -a ve nslookup", "netstat ve route"], answer: "ipconfig /release ve /renew", why: "/release mevcut kiralamayı bırakır, /renew yeniden adres ister." }
    ],
    interview: [
      { q: "DHCP nedir, nasıl çalışır?", a: "Cihazlara IP, maske, gateway ve DNS bilgisini otomatik veren servistir. DORA ile çalışır: Discover, Offer, Request, Acknowledge. Adres belli süreliğine kiralanır." },
      { q: "Kullanıcı 'internete giremiyorum' dedi. DNS mi DHCP mi olduğunu nasıl ayırırsın?", a: "ipconfig ile IP'ye bakarım. Adres yoksa ya da 169.254 ise DHCP'dir. Adres varsa ping 8.8.8.8 ve ping google.com denerim. İlki çalışıp ikincisi çalışmıyorsa DNS sorunudur." },
      { q: "DNS'te A ve CNAME kaydı farkı nedir?", a: "A kaydı bir ismi doğrudan IPv4 adresine bağlar. CNAME bir ismi başka bir isme yönlendiren takma addır; çözüm sonunda yine bir A kaydına ulaşılır." }
    ],
    vocab: [
      { term: "Lease", tr: "kiralama süresi", ex: "The lease expires in 8 hours." },
      { term: "DNS server", tr: "DNS sunucusu", ex: "Change the DNS server to 8.8.8.8." },
      { term: "Resolve", tr: "çözümlemek", ex: "The name does not resolve." },
      { term: "Scope / pool", tr: "adres havuzu", ex: "The DHCP pool is full." },
      { term: "Renew", tr: "yenilemek", ex: "Please renew your IP address." },
      { term: "Static IP", tr: "sabit IP", ex: "The printer has a static IP." }
    ],
    resources: [
      res(JERE, "DHCP ve DNS konularını anlatır"),
      res(PT, "DHCP sunucusunu simülasyonda kur")
    ],
    sources: [CISCO]
  };

  /* 8 ───────────────────────────────────────────── NAT */
  L[8] = {
    hook: "NAT, büyük bir şirketin santralidir: içeridekiler tek bir dış numarayla konuşur, santral kimin aradığını hatırlar.",
    homework: "Packet Tracer'da bir router'ı PAT (overload) ile yapılandır: içeride 192.168.10.0/24, dışarıda tek bir adres olsun. 'show ip nat translations' çıktısında port numaralarını incele.",
    warmup: {
      recap: [
        { point: "Özel adresler (10.x, 172.16-31.x, 192.168.x) internette yönlendirilmez.", example: "RFC 1918" },
        { point: "Router, bilinmeyen hedefler için default route kullanır.", example: "ip route 0.0.0.0 0.0.0.0 ..." }
      ],
      concepts: [
        { term: "NAT", tr: "Adres çevirme", summary: "Özel IP'yi internete çıkarken genel IP'ye çevirir.", example: "192.168.1.10 → 203.0.113.5" },
        { term: "PAT (overload)", tr: "Port ile çevirme", summary: "Birçok iç cihaz tek bir dış IP'yi port farkıyla paylaşır.", example: "Evdeki tüm cihazlar tek IP ile çıkar." }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Ofiste 200 bilgisayar var ama internet operatöründen yalnızca 1 genel IP aldın. Hepsi nasıl internete çıkacak? Cevap NAT. Ayrıca dışarıdan gelen birinin iç ağdaki sunucuya erişmesi gerekiyorsa (web sunucusu) yine NAT ayarı gerekir." },
      { t: "h", text: "NAT nedir?" },
      { t: "p", text: "NAT (Network Address Translation), paket router'dan geçerken kaynak ya da hedef IP adresini değiştirir. Özel adresler internette yönlendirilemediği için internete çıkarken genel adrese çevrilir. Hem IPv4 adres tükenmesini hafifletir hem de iç ağın adreslerini dışarıdan gizler." },
      { t: "steps", h: "NAT türleri", items: [
        "Static NAT: bir iç adres, bir dış adres (1'e 1). Dışarıdan erişilecek sunucular için.",
        "Dynamic NAT: iç adresler bir genel adres havuzundan sırayla eşlenir. Havuz bitince yeni cihaz çıkamaz.",
        "PAT (NAT overload): çok iç adres tek genel adrese port numarasıyla eşlenir. En yaygın olanı. Ev ve ofis router'larındaki NAT budur."
      ] },
      { t: "h", text: "4 önemli terim" },
      { t: "steps", h: "Adres isimleri", items: [
        "Inside local: iç ağdaki cihazın gerçek (özel) adresi. Örnek: 192.168.10.5",
        "Inside global: o cihazın internette görünen adresi. Örnek: 203.0.113.5",
        "Outside global: internetteki hedefin gerçek adresi. Örnek: 8.8.8.8",
        "Outside local: hedefin iç ağdan görünen adresi (çoğu zaman outside global ile aynıdır)."
      ] },
      { t: "h", text: "Yapılandırma (PAT)" },
      { t: "cmd", text: "Router(config)# interface gigabitethernet0/0\nRouter(config-if)# ip nat inside\nRouter(config)# interface gigabitethernet0/1\nRouter(config-if)# ip nat outside\n\n# Hangi iç adresler çevrilsin (wildcard maske: ters maske)\nRouter(config)# access-list 1 permit 192.168.10.0 0.0.0.255\n\n# Dış arayüzün adresine PAT\nRouter(config)# ip nat inside source list 1 interface gigabitethernet0/1 overload\n\nRouter# show ip nat translations\nRouter# show ip nat statistics" },
      { t: "steps", h: "Ne yaptık?", items: [
        "Router'a hangi arayüz içeride (inside), hangisi dışarıda (outside) söyledik.",
        "ACL ile çevrilecek iç adresleri seçtik.",
        "'overload' ile hepsini dış arayüzün tek adresine port farkıyla eşledik.",
        "show komutlarıyla çevirileri doğruladık."
      ] },
      { t: "box", h: "Özet çıktı", text: "show ip nat translations çıktısında 192.168.10.5:50001 gibi bir iç adres-port, 203.0.113.5:50001 gibi bir dış adres-port ile eşleşir. Cevap geldiğinde router tabloya bakıp doğru iç cihaza geri yollar." },
      { t: "warn", h: "Tuzak", text: "inside ve outside yanlış arayüze yazılırsa NAT hiç çalışmaz. ACL'de çevrilecek ağı unutursan o cihaz internete çıkamaz. İlk bakacağın yerler: 'show ip nat statistics' ve ACL." }
    ],
    quiz: [
      { q: "Birçok iç cihazı tek bir genel IP ile internete çıkaran NAT türü hangisidir?", options: ["Static NAT", "Dynamic NAT", "PAT (overload)", "Reverse NAT"], answer: "PAT (overload)", why: "PAT, port numaralarını kullanarak çok iç adresi tek genel adrese eşler." },
      { q: "İç ağdaki bir sunucunun dışarıdan erişilebilmesi için hangi NAT uygun olur?", options: ["Static NAT", "PAT ile rastgele port", "Hiçbiri", "DHCP"], answer: "Static NAT", why: "Static NAT sabit bire bir eşleme yapar, dışarıdan her zaman aynı adres ulaşır." },
      { q: "'Inside global' adres nedir?", options: ["İç cihazın internette görünen adresi", "İç cihazın gerçek özel adresi", "Hedef sunucunun adresi", "Gateway adresi"], answer: "İç cihazın internette görünen adresi", why: "Inside global, iç cihazın dışarıdan görünen (çevrilmiş) adresidir." },
      { q: "NAT çevirilerini listeleyen komut hangisidir?", options: ["show ip nat translations", "show ip route", "show nat table", "show access-lists"], answer: "show ip nat translations", why: "Bu komut aktif çevirileri iç ve dış adreslerle gösterir." },
      { q: "NAT yapılandırmasında 'ip nat inside' hangi arayüze yazılır?", options: ["İç ağa bakan arayüze", "İnternete bakan arayüze", "Console'a", "Loopback'e"], answer: "İç ağa bakan arayüze", why: "İç ağa bakan arayüz inside, internete bakan outside olarak işaretlenir." }
    ],
    interview: [
      { q: "NAT neden gerekli?", a: "Özel IP adresleri internette yönlendirilmez ve genel IPv4 adresleri sınırlıdır. NAT, özel adresleri internete çıkarken genel adrese çevirerek binlerce cihazın az sayıda genel IP ile internete erişmesini sağlar." },
      { q: "PAT ile NAT'ın farkı nedir?", a: "NAT genelde bire bir adres çevirir. PAT (overload) ise çok iç adresi tek genel adrese port numarasıyla eşler. Ev ve ofislerde kullandığımız çoğunlukla PAT'tır." },
      { q: "NAT çalışmıyorsa nereye bakarsın?", a: "İç ve dış arayüzlerde ip nat inside/outside doğru mu, çevrilecek adresleri seçen ACL doğru mu, default route var mı ve show ip nat translations ile çeviri oluşuyor mu diye bakarım." }
    ],
    vocab: [
      { term: "Translation", tr: "çeviri", ex: "The NAT translation table is full." },
      { term: "Public IP", tr: "genel IP", ex: "Our public IP changed." },
      { term: "Port forwarding", tr: "port yönlendirme", ex: "Set up port forwarding for the web server." },
      { term: "Inside / outside", tr: "iç / dış", ex: "Mark the inside interface." },
      { term: "Overload", tr: "aşırı yükleme (PAT)", ex: "Use the overload keyword." },
      { term: "Outbound", tr: "dışarı giden", ex: "Outbound traffic is translated." }
    ],
    resources: [
      res(JERE, "NAT ve PAT'ı laboratuvarla anlatır"),
      res(PT, "NAT'ı ücretsiz simülatörde dene")
    ],
    sources: [CISCO, { title: "RFC 1918", url: "https://www.rfc-editor.org/rfc/rfc1918" }]
  };

  /* 9 ───────────────────────────────────────────── ACL */
  L[9] = {
    hook: "ACL, bina girişindeki güvenlik görevlisinin listesidir: kimin geçeceğini yukarıdan aşağı sırayla kontrol eder.",
    homework: "Packet Tracer'da iki ağ kur. Birinden diğerindeki sunucuya yalnızca web (port 80) erişimine izin veren bir extended ACL yaz, diğer her şeyi engelle. 'show access-lists' ile eşleşme sayacına bak.",
    warmup: {
      recap: [
        { point: "NAT'ta çevrilecek adresleri seçmek için ACL kullandık.", example: "access-list 1 permit 192.168.10.0 0.0.0.255" },
        { point: "Router IP adresine bakarak yönlendirme yapar.", example: "Routing tablosu" }
      ],
      concepts: [
        { term: "ACL", tr: "Erişim kontrol listesi", summary: "Paketleri kurala göre izin verir ya da engeller.", example: "permit / deny satırları" },
        { term: "Wildcard mask", tr: "Ters maske", summary: "0 'tam eşleş', 255 'önemsiz' demektir.", example: "0.0.0.255 = /24" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Misafir ağındaki cihazlar muhasebe sunucusuna ulaşamamalı, ama internete çıkabilmeli. Router'da bunu paket bazında kontrol etmenin yolu ACL'dir." },
      { t: "h", text: "ACL nedir?" },
      { t: "p", text: "ACL (Access Control List), sırayla okunan permit (izin ver) ve deny (engelle) kuralları listesidir. Router paketi listenin başından başlayarak kontrol eder, ilk uyan kural uygulanır ve listenin geri kalanına bakılmaz. Hiçbir kural uymazsa en sonda görünmez bir 'deny any' çalışır (implicit deny)." },
      { t: "steps", h: "İki ana tür", items: [
        "Standard ACL (1-99, 1300-1999): yalnızca kaynak IP'ye bakar. Hedefe yakın yere konur.",
        "Extended ACL (100-199, 2000-2699): kaynak, hedef, protokol (tcp, udp, icmp) ve port'a bakar. Kaynağa yakın yere konur.",
        "Named ACL: numara yerine isim verilir, satırlar tek tek düzenlenebilir. Pratikte tercih edilir."
      ] },
      { t: "h", text: "Wildcard maske" },
      { t: "p", text: "ACL'de alt ağ maskesi yerine wildcard (ters) maske kullanılır. 0 bit 'birebir eşleşmeli', 1 bit 'fark etmez' demektir. /24 ağı için wildcard 0.0.0.255, /26 için 0.0.0.63, tek bir cihaz için 0.0.0.0 (ya da 'host' sözcüğü)." },
      { t: "box", h: "Wildcard nasıl bulunur?", text: "255.255.255.255 eksi alt ağ maskesi. Maske 255.255.255.192 ise wildcard 0.0.0.63." },
      { t: "h", text: "Örnek: sadece web'e izin ver" },
      { t: "cmd", text: "# 192.168.20.0/24 ağı 192.168.10.5 sunucusunun sadece web'ine (80) erişebilsin\nRouter(config)# ip access-list extended MISAFIR-KURAL\nRouter(config-ext-nacl)# permit tcp 192.168.20.0 0.0.0.255 host 192.168.10.5 eq 80\nRouter(config-ext-nacl)# deny ip 192.168.20.0 0.0.0.255 192.168.10.0 0.0.0.255\nRouter(config-ext-nacl)# permit ip any any\n\n# Arayüze uygula: içeri gelen trafikte\nRouter(config)# interface gigabitethernet0/1\nRouter(config-if)# ip access-group MISAFIR-KURAL in\n\nRouter# show access-lists" },
      { t: "steps", h: "Sıra neden önemli?", items: [
        "1. satır: misafirler sunucunun web'ine girebilir (permit).",
        "2. satır: misafirlerin 192.168.10.0 ağına kalan her erişimi engellenir (deny).",
        "3. satır: geri kalan her şeye (internet gibi) izin verilir (permit ip any any).",
        "Sıra tersine çevrilirse 3. satır her şeyi geçirir ve engelleyen satıra hiç ulaşılmaz."
      ] },
      { t: "h", text: "Nereye ve hangi yöne uygulanır?" },
      { t: "steps", h: "in ve out", items: [
        "in: paket arayüze girerken kontrol edilir.",
        "out: paket arayüzden çıkarken kontrol edilir.",
        "Bir arayüzde yön başına en çok bir ACL olabilir.",
        "Extended ACL'i kaynağa yakın, standard ACL'i hedefe yakın koy."
      ] },
      { t: "warn", h: "Tuzak", text: "Listenin sonunda 'permit' yoksa implicit deny yüzünden gerisi engellenir ve ağ bir anda kopar. ACL'i uzaktan SSH ile yazarken kendi bağlantını da engelleyebilirsin. Önce 'permit' kurallarını düşün." }
    ],
    quiz: [
      { q: "ACL'de hiçbir kural bir pakete uymazsa ne olur?", options: ["Paket geçer", "Paket implicit deny ile engellenir", "Router yeniden başlar", "Paket loglanır"], answer: "Paket implicit deny ile engellenir", why: "Her ACL'in sonunda görünmeyen bir 'deny any' vardır." },
      { q: "Wildcard maske 0.0.0.255 hangi alt ağ maskesine denk gelir?", options: ["255.255.255.0", "255.255.0.0", "255.255.255.255", "255.0.0.0"], answer: "255.255.255.0", why: "Wildcard, alt ağ maskesinin tersidir: 255.255.255.255 - 255.255.255.0 = 0.0.0.255." },
      { q: "Hangi ACL türü yalnızca kaynak IP'ye bakar?", options: ["Standard", "Extended", "Reflexive", "Dynamic"], answer: "Standard", why: "Standard ACL sadece kaynak IP ile filtreler. Extended ACL protokol, port ve hedefi de kullanır." },
      { q: "Extended ACL genellikle nereye konur?", options: ["Hedefe yakın", "Kaynağa yakın", "Her zaman WAN'a", "Switch'e"], answer: "Kaynağa yakın", why: "Engellenecek trafik ağın içinde boşuna yol almasın diye extended ACL kaynağa yakın uygulanır." },
      { q: "ACL'i bir arayüze uygulayan komut hangisidir?", options: ["ip access-group", "access-list apply", "ip filter", "permit interface"], answer: "ip access-group", why: "ip access-group <ad> in|out arayüz modunda kullanılır." }
    ],
    interview: [
      { q: "ACL nedir, ne için kullanılır?", a: "Sıralı permit/deny kurallarından oluşan, paketleri IP, protokol ve port'a göre filtreleyen listedir. Güvenlik amacıyla trafik kısıtlamak, NAT için adres seçmek ve QoS için trafik sınıflandırmak gibi işlerde kullanılır." },
      { q: "Standard ile extended ACL farkı nedir?", a: "Standard yalnızca kaynak IP'ye bakar, hedefe yakın konur. Extended kaynak, hedef, protokol ve port'a bakar, kaynağa yakın konur." },
      { q: "Implicit deny nedir?", a: "Her ACL'in sonunda görünmeyen bir 'deny any' kuralı vardır. Hiçbir satıra uymayan paket engellenir. Bu yüzden genelde sonda açıkça permit satırı gerekir." }
    ],
    vocab: [
      { term: "Permit / deny", tr: "izin ver / engelle", ex: "Deny all traffic from the guest VLAN." },
      { term: "Wildcard mask", tr: "ters maske", ex: "Use a wildcard mask of 0.0.0.255." },
      { term: "Rule", tr: "kural", ex: "Add a new rule at the top." },
      { term: "Inbound / outbound", tr: "giriş / çıkış yönü", ex: "Apply the ACL inbound." },
      { term: "Block", tr: "engellemek", ex: "The firewall blocks port 23." },
      { term: "Whitelist", tr: "izinli liste", ex: "Only whitelisted IPs can connect." }
    ],
    resources: [
      res(JERE, "ACL konusunu örneklerle anlatır"),
      res(PT, "ACL'i simülasyonda dene, eşleşme sayaçlarını izle")
    ],
    sources: [CISCO]
  };

  /* 10 ───────────────────────────────────────────── OSPF (temel) */
  L[10] = {
    hook: "OSPF, router'ların birbirine harita çizip paylaştığı bir şehir planlama toplantısıdır: herkes aynı haritayı görür ve en kısa yolu kendisi hesaplar.",
    homework: "Packet Tracer'da 3 router'ı üçgen şeklinde bağla, OSPF area 0 ile yapılandır. 'show ip ospf neighbor' ile komşuları gör, bir bağlantıyı kopar ve yolun nasıl değiştiğini 'show ip route ospf' ile izle.",
    warmup: {
      recap: [
        { point: "Static route elle yazılır, dinamik protokol yolları otomatik öğretir.", example: "S ile O satırları" },
        { point: "Router en uzun prefix'i ve en küçük AD'yi tercih eder.", example: "OSPF AD = 110" }
      ],
      concepts: [
        { term: "OSPF", tr: "Link-state dinamik yönlendirme", summary: "Router'lar bağlantı bilgisini paylaşıp en kısa yolu hesaplar.", example: "Büyük kurumsal ağlarda yaygın" },
        { term: "Area 0", tr: "Omurga alanı", summary: "Tüm diğer alanların bağlanması gereken merkez alan.", example: "Backbone area" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Şirket 5 şubeye büyüdü. Her router'a elle static route yazmak ve bir hat koptuğunda her yeri düzeltmek imkânsız hale geldi. Router'ların yolları kendi öğrenmesi ve bir hat koparsa otomatik alternatif bulması gerekiyor. OSPF tam bunu yapar." },
      { t: "h", text: "OSPF nedir?" },
      { t: "p", text: "OSPF (Open Shortest Path First), açık standartlı bir link-state protokolüdür. Her router kendi bağlantılarını (link) komşularına duyurur. Sonunda herkes aynı haritaya (LSDB) sahip olur ve en kısa yolu SPF algoritmasıyla kendisi hesaplar. 'Kısa' derken metrik olarak maliyet (cost) kullanılır; maliyet bant genişliğinden hesaplanır." },
      { t: "steps", h: "Temel kavramlar", items: [
        "Area (alan): ağı mantıksal bölgelere ayırır. Tüm alanlar Area 0 (omurga) ile bağlanır.",
        "Router ID: router'ın OSPF kimliği. Elle verilmezse en yüksek loopback IP'si, o da yoksa en yüksek aktif arayüz IP'si olur.",
        "Neighbor (komşu): aynı bağlantıdaki, hello paketi ile tanışmış OSPF router.",
        "Cost (maliyet): bant genişliği ne kadar yüksekse maliyet o kadar düşük.",
        "Administrative distance: OSPF için 110."
      ] },
      { t: "h", text: "Komşuluk nasıl kurulur?" },
      { t: "steps", h: "Aşamalar (özet)", items: [
        "Down: hiç hello alınmadı.",
        "Init: hello alındı ama komşu beni henüz görmedi.",
        "2-Way: karşılıklı görüştük. Çok erişimli (broadcast) ağda burada DR/BDR seçilir.",
        "ExStart, Exchange, Loading: veritabanları (LSDB) değiş tokuş edilir.",
        "Full: veritabanları eşit, komşuluk tamam. Yönlendirme bu noktada başlar."
      ] },
      { t: "box", h: "Hello ve dead süresi", text: "Broadcast ağlarda hello 10 saniye, dead 40 saniyedir. Komşuluğun kurulması için iki tarafta area, hello/dead süreleri ve alt ağ eşleşmelidir." },
      { t: "h", text: "Yapılandırma" },
      { t: "cmd", text: "Router(config)# router ospf 1\nRouter(config-router)# router-id 1.1.1.1\nRouter(config-router)# network 10.0.0.0 0.0.0.3 area 0\nRouter(config-router)# network 192.168.10.0 0.0.0.255 area 0\nRouter(config-router)# passive-interface gigabitethernet0/1\n\nRouter# show ip ospf neighbor\nRouter# show ip route ospf\nRouter# show ip ospf interface brief" },
      { t: "steps", h: "Satır satır", items: [
        "'router ospf 1': OSPF'i açar. 1, yerel işlem numarasıdır; komşularla aynı olması gerekmez.",
        "'router-id': router'a sabit bir kimlik verir.",
        "'network ... area 0': hangi arayüzlerin OSPF'e katılacağını wildcard maskeyle seçer.",
        "'passive-interface': kullanıcıların olduğu portta hello göndermeyi keser; güvenlik için iyi."
      ] },
      { t: "warn", h: "Tuzak", text: "Komşuluk kurulmuyorsa genellikle şunlardan biridir: farklı area, farklı alt ağ, farklı hello/dead süresi ya da network komutu arayüzü kapsamıyor. 'show ip ospf interface' çıktısını iki tarafta karşılaştır." }
    ],
    quiz: [
      { q: "OSPF'in administrative distance değeri kaçtır?", options: ["1", "90", "110", "120"], answer: "110", why: "OSPF 110, static 1, connected 0'dır." },
      { q: "Tüm OSPF alanlarının bağlanması gereken omurga alanı hangisidir?", options: ["Area 1", "Area 0", "Area 100", "Area 255"], answer: "Area 0", why: "Çok alanlı OSPF'te tüm alanlar Area 0'a bağlanır." },
      { q: "OSPF komşuluğunun tamamlanmış hali hangi durumdur?", options: ["Init", "2-Way", "Full", "Down"], answer: "Full", why: "Full durumu iki komşunun veritabanlarının eşitlendiği ve yönlendirmenin başladığı durumdur." },
      { q: "OSPF komşularını gösteren komut hangisidir?", options: ["show ip ospf neighbor", "show ip route", "show ospf peers", "show interfaces"], answer: "show ip ospf neighbor", why: "Bu komut komşuları, durumlarını ve arayüzlerini listeler." },
      { q: "Router ID elle verilmezse neye göre seçilir?", options: ["En yüksek loopback IP, yoksa en yüksek aktif arayüz IP", "En küçük MAC adresi", "Rastgele", "Hostname"], answer: "En yüksek loopback IP, yoksa en yüksek aktif arayüz IP", why: "Elle router-id yoksa loopback öncelik alır, o da yoksa en yüksek IP'li aktif arayüz kullanılır." }
    ],
    interview: [
      { q: "OSPF nedir? Static route'tan farkı nedir?", a: "OSPF, router'ların yollarını birbirine otomatik öğrettiği link-state bir dinamik yönlendirme protokolüdür. Static route elle yazılır ve ağ değişince elle güncellenir. OSPF bir bağlantı koparsa kendisi yeni yol hesaplar." },
      { q: "OSPF komşuluğu kurulmuyor. Ne kontrol edersin?", a: "Arayüzler up mu, aynı alt ağda mı, aynı area mı, hello/dead süreleri eşit mi, network komutu arayüzü kapsıyor mu, ACL hello paketlerini engelliyor mu bakarım. show ip ospf neighbor ve show ip ospf interface kullanırım." },
      { q: "Link-state ile distance-vector farkı nedir?", a: "Link-state protokoller (OSPF) tüm ağın haritasını herkese dağıtır ve her router en iyi yolu kendisi hesaplar. Distance-vector protokoller (RIP) yalnızca komşulardan duydukları 'hedefe şu kadar uzak' bilgisini aktarır, bu yüzden daha yavaş yakınsar." }
    ],
    vocab: [
      { term: "Neighbor", tr: "komşu", ex: "The OSPF neighbor is down." },
      { term: "Convergence", tr: "yakınsama", ex: "OSPF has fast convergence." },
      { term: "Cost / metric", tr: "maliyet / metrik", ex: "The route with the lower cost wins." },
      { term: "Backbone", tr: "omurga", ex: "Area 0 is the backbone." },
      { term: "Link-state", tr: "bağlantı durumu", ex: "OSPF is a link-state protocol." },
      { term: "Advertise", tr: "duyurmak", ex: "Advertise this network in OSPF." }
    ],
    resources: [
      res(JERE, "OSPF konusunu detaylı ve laboratuvarla anlatır"),
      res(PT, "OSPF'i üçgen topolojide dene")
    ],
    sources: [CISCO]
  };

  /* 11 ───────────────────────────────────────────── Kablosuz ağ (Wi-Fi) temelleri */
  L[11] = {
    hook: "Wi-Fi, kablonun yerini radyo dalgasının aldığı ağdır: herkes aynı havayı paylaşır, o yüzden kanal seçimi ve güvenlik hayati olur.",
    homework: "Telefonunla evindeki ya da ofisteki Wi-Fi ağlarını tara. 2.4 GHz ve 5 GHz ağları, hangi kanalları kullandıklarını ve sinyal güçlerini not et. En az dolu kanalı seç.",
    warmup: {
      recap: [
        { point: "VLAN'lar mantıksal ağlar oluşturur; her SSID bir VLAN'a bağlanabilir.", example: "Misafir Wi-Fi'ı ayrı VLAN" },
        { point: "Switch portu bir access port'tur; AP ise genelde bir switch portuna bağlanır.", example: "AP bir uç cihaz gibi switch'e takılır." }
      ],
      concepts: [
        { term: "SSID", tr: "Wi-Fi ağ adı", summary: "Kullanıcının gördüğü ağ ismi.", example: "OFIS-WIFI" },
        { term: "Access point (AP)", tr: "Kablosuz erişim noktası", summary: "Kablosuz cihazları kablolu ağa bağlar.", example: "Tavanda asılı beyaz kutu" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Toplantı odasında Wi-Fi sürekli kopuyor, bazı insanlar bağlanıyor bazıları bağlanamıyor. Kablolu ağı çok iyi bilsen de Wi-Fi'ın kendine has sorunlarını (kanal çakışması, mesafe, parazit) bilmiyorsan çözemezsin." },
      { t: "h", text: "Temel parçalar" },
      { t: "steps", h: "Kablosuz ağın elemanları", items: [
        "AP (Access Point): kablosuz istemcileri kablolu ağa bağlar.",
        "SSID: ağın adı. BSSID: o AP'nin radyosunun MAC adresi.",
        "WLC (Wireless LAN Controller): çok sayıda AP'yi merkezden yönetir (ayar, güncelleme, kanal ve güç).",
        "İstemci: telefon, dizüstü, yazıcı gibi kablosuz cihaz."
      ] },
      { t: "h", text: "Frekans bantları" },
      { t: "steps", h: "2.4 GHz ve 5 GHz", items: [
        "2.4 GHz: menzili uzun, duvardan iyi geçer, ama yavaş ve kalabalık (mikrodalga, Bluetooth da kullanır). Çakışmayan kanallar 1, 6 ve 11'dir.",
        "5 GHz: hızlı, çok kanal, daha az parazit ama menzili kısa ve duvardan kötü geçer.",
        "Wi-Fi 6E ile 6 GHz bandı da eklendi (daha az kalabalık)."
      ] },
      { t: "h", text: "802.11 standartları (kısa özet)" },
      { t: "steps", h: "Hangisi hangi band?", items: [
        "802.11n (Wi-Fi 4): 2.4 ve 5 GHz",
        "802.11ac (Wi-Fi 5): 5 GHz",
        "802.11ax (Wi-Fi 6): 2.4 ve 5 GHz (Wi-Fi 6E ile 6 GHz da)"
      ] },
      { t: "h", text: "Güvenlik" },
      { t: "steps", h: "Hangisini kullan?", items: [
        "WEP: eski ve kırılmış. Kullanma.",
        "WPA2: AES şifrelemesi (CCMP). Kişisel (ortak parola, PSK) ya da kurumsal (802.1X, kullanıcı adı ve şifre) olur.",
        "WPA3: daha güçlü, parola tahminine karşı SAE el sıkışması kullanır. Mümkünse bunu seç."
      ] },
      { t: "h", text: "AP mimarileri" },
      { t: "steps", h: "3 yaygın yapı", items: [
        "Autonomous AP: her AP kendi başına yapılandırılır. Küçük ağlar için.",
        "Cloud-based: AP'ler bulut paneli ile yönetilir.",
        "Lightweight AP + WLC: AP'ler (CAPWAP tüneli ile) controller tarafından yönetilir. Büyük kurumlarda yaygın."
      ] },
      { t: "box", h: "Elle dene", text: "Telefonunda bir Wi-Fi analiz uygulaması aç. 1, 6, 11 kanallarında kaç ağ var gör. Senin ağın kalabalık kanaldaysa router ayarından en boş kanala al." },
      { t: "warn", h: "Tuzak", text: "'Sinyal çubuğu dolu' demek 'hızlı' demek değildir. Kanal çakışması ya da çok kullanıcı varsa sinyal güçlü olsa da bağlantı yavaş olur. Güç ve çakışma ayrı şeylerdir." }
    ],
    quiz: [
      { q: "2.4 GHz bandında çakışmayan kanallar hangileridir?", options: ["1, 6, 11", "1, 2, 3", "2, 4, 6", "5, 10, 15"], answer: "1, 6, 11", why: "2.4 GHz'de kanallar birbirine yakındır, birbirini bozmayan standart üçlü 1, 6 ve 11'dir." },
      { q: "Çok sayıda AP'yi merkezden yöneten cihaz hangisidir?", options: ["Switch", "WLC", "Firewall", "Modem"], answer: "WLC", why: "Wireless LAN Controller, lightweight AP'leri merkezden yönetir." },
      { q: "Hangi güvenlik standardı en güçlü ve günceldir?", options: ["WEP", "WPA", "WPA2", "WPA3"], answer: "WPA3", why: "WPA3 en yeni standarttır ve SAE ile parola tahminine karşı daha dirençlidir." },
      { q: "5 GHz hakkında hangisi doğrudur?", options: ["Menzili 2.4 GHz'den uzundur", "Daha hızlı ama menzili kısadır", "Sadece 802.11b kullanır", "Duvardan en iyi geçen banttır"], answer: "Daha hızlı ama menzili kısadır", why: "5 GHz yüksek hız ve az parazit sunar, ancak menzili ve duvar geçişi 2.4 GHz'den zayıftır." },
      { q: "SSID nedir?", options: ["AP'nin MAC adresi", "Kablosuz ağın adı", "Şifreleme türü", "Kanal numarası"], answer: "Kablosuz ağın adı", why: "SSID, kullanıcıların gördüğü Wi-Fi ağ adıdır." }
    ],
    interview: [
      { q: "2.4 GHz ile 5 GHz farkı nedir?", a: "2.4 GHz'in menzili uzundur ve duvardan iyi geçer ama yavaş ve kalabalıktır. 5 GHz daha hızlı ve az parazitlidir ama menzili kısadır. Cihaz yakındaysa 5 GHz, uzaktaysa 2.4 GHz daha iyi çalışır." },
      { q: "Wi-Fi yavaş diyen kullanıcıya nasıl yaklaşırsın?", a: "Sinyal gücünü, hangi banda bağlı olduğunu, kanal çakışmasını ve AP başına kullanıcı sayısını kontrol ederim. Gerekirse kanalı değiştirir, kullanıcıyı 5 GHz'e yönlendirir ya da AP'nin yerini ve gücünü ayarlarım." },
      { q: "WLC ne işe yarar?", a: "Wireless LAN Controller, çok sayıda AP'yi merkezden yapılandırmak, güncellemek, kanal ve güç ayarlamak ve roaming'i yönetmek için kullanılır." }
    ],
    vocab: [
      { term: "Signal strength", tr: "sinyal gücü", ex: "The signal strength is weak." },
      { term: "Interference", tr: "parazit", ex: "There is interference on channel 6." },
      { term: "Roaming", tr: "AP'ler arası geçiş", ex: "Roaming between access points is slow." },
      { term: "Channel", tr: "kanal", ex: "Switch to a less crowded channel." },
      { term: "Coverage", tr: "kapsama alanı", ex: "We need better coverage on the second floor." },
      { term: "Passphrase", tr: "parola cümlesi", ex: "Enter the Wi-Fi passphrase." }
    ],
    resources: [
      res(JERE, "Kablosuz ağ konularını anlatır"),
      { title: "Wi-Fi Alliance: Wi-Fi güvenliği", url: "https://www.wi-fi.org/discover-wi-fi/security", type: "doc", why: "WPA3 ve güvenlik bilgisi (üretici kuruluş)", level: "orta", lang: "EN" }
    ],
    sources: [CISCO]
  };

  /* 12 ───────────────────────────────────────────── Ağ güvenliği temelleri */
  L[12] = {
    hook: "Ağ güvenliği, binanın kapısına kilit, kameraya kayıt, anahtarlara kimlik kontrolü koymaktır: tek bir önlem değil, katmanlı savunmadır.",
    homework: "Packet Tracer'da bir switch portunda port security aç (maksimum 1 MAC, violation shutdown). Başka bir bilgisayarı o porta tak ve portun nasıl 'err-disabled' olduğunu gör, sonra portu geri aç.",
    warmup: {
      recap: [
        { point: "ACL, paketleri kurala göre izin verir ya da engeller.", example: "permit / deny" },
        { point: "Switch MAC adresini öğrenir ve porta bağlar.", example: "show mac address-table" }
      ],
      concepts: [
        { term: "CIA üçlüsü", tr: "Gizlilik, bütünlük, erişilebilirlik", summary: "Güvenliğin üç hedefi.", example: "Confidentiality, Integrity, Availability" },
        { term: "AAA", tr: "Kimlik doğrulama, yetkilendirme, kayıt", summary: "Kim, ne yapabilir, ne yaptı?", example: "Authentication, Authorization, Accounting" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Biri ofiste boş bir ağ prizine kendi dizüstü bilgisayarını takmış ve ağdaki cihazları tarıyor. Ya da bir çalışan sahte bir e-postadaki bağlantıya tıklayıp fidye yazılımı bulaştırdı. Ağ yöneticisi olarak hem teknik hem insan kaynaklı tehditleri bilmen gerekir." },
      { t: "h", text: "Temel kavramlar" },
      { t: "steps", h: "CIA üçlüsü", items: [
        "Confidentiality (gizlilik): veriyi sadece yetkililer görmeli. Şifreleme bunun içindir.",
        "Integrity (bütünlük): veri değiştirilmemeli. Hash ve dijital imza bunun içindir.",
        "Availability (erişilebilirlik): sistem gerektiğinde çalışmalı. Yedekleme ve yedekli yapılar bunun içindir."
      ] },
      { t: "steps", h: "Sık karıştırılanlar", items: [
        "Threat (tehdit): zarar verebilecek şey. Örnek: saldırgan.",
        "Vulnerability (zayıflık): açık. Örnek: güncellenmemiş yazılım.",
        "Exploit: açığı kullanan yöntem ya da kod.",
        "Risk: tehdidin bir zayıflığı kullanıp zarar verme ihtimali."
      ] },
      { t: "h", text: "Yaygın saldırılar" },
      { t: "steps", h: "Hangisi ne?", items: [
        "Phishing: sahte e-posta ya da site ile kullanıcıyı kandırıp bilgi çalma.",
        "Malware: virüs, fidye yazılımı, trojan gibi zararlı yazılım.",
        "DoS / DDoS: hizmeti aşırı yükleyip erişilemez yapma (DDoS çok kaynaktan).",
        "Man-in-the-middle: iki taraf arasına girip trafiği dinleme ya da değiştirme.",
        "Sosyal mühendislik: teknik açık yerine insanı kandırma."
      ] },
      { t: "h", text: "Savunma araçları" },
      { t: "steps", h: "Katmanlı savunma", items: [
        "Firewall: trafiği kurala göre süzer. IPS: şüpheli trafiği algılayıp engeller.",
        "VPN: şifreli tünel. Site-to-site (ofisler arası) ve remote access (uzaktan çalışan).",
        "AAA: kimlik doğrulama, yetkilendirme ve kayıt (log).",
        "MFA (çok faktörlü doğrulama): parola + ikinci kanıt (telefon kodu gibi).",
        "Güncelleme ve yama yönetimi: bilinen açıkları kapatmak."
      ] },
      { t: "h", text: "Switch güvenliği: port security" },
      { t: "cmd", text: "Switch(config)# interface fastethernet0/1\nSwitch(config-if)# switchport mode access\nSwitch(config-if)# switchport port-security\nSwitch(config-if)# switchport port-security maximum 2\nSwitch(config-if)# switchport port-security mac-address sticky\nSwitch(config-if)# switchport port-security violation shutdown\n\nSwitch# show port-security interface fastethernet0/1" },
      { t: "steps", h: "Ne yapıyor?", items: [
        "Porta en çok 2 MAC adresinin bağlanmasına izin verir.",
        "'sticky': öğrenilen MAC'leri otomatik kaydeder.",
        "'violation shutdown': yetkisiz cihaz takılırsa port kapanır (err-disabled).",
        "Portu geri açmak için: 'shutdown' ardından 'no shutdown'."
      ] },
      { t: "h", text: "Cihaz yönetim güvenliği" },
      { t: "cmd", text: "Router(config)# hostname R1\nR1(config)# ip domain-name sirket.local\nR1(config)# crypto key generate rsa modulus 2048\nR1(config)# username yonetici secret <guclu-sifre>\nR1(config)# line vty 0 4\nR1(config-line)# transport input ssh\nR1(config-line)# login local\nR1(config)# enable secret <guclu-sifre>\nR1(config)# service password-encryption" },
      { t: "box", h: "Telnet yerine SSH", text: "Telnet her şeyi açık metin gönderir, parola da dahil. SSH şifrelidir. Cihaz yönetiminde her zaman SSH kullan. <guclu-sifre> yerine kendi güçlü parolanı yaz; gerçek parolayı asla ders notlarına ya da paylaşılan dosyalara koyma." },
      { t: "warn", h: "Tuzak", text: "'enable password' düz metin tutar, 'enable secret' hash'ler. Her zaman secret kullan. Güvenlik tek bir cihazla değil, katmanlarla sağlanır." }
    ],
    quiz: [
      { q: "Phishing nedir?", options: ["Ağı aşırı yükleme", "Sahte e-posta ya da siteyle bilgi çalma", "Disk şifreleme", "Port tarama"], answer: "Sahte e-posta ya da siteyle bilgi çalma", why: "Phishing, kullanıcıyı kandırarak parola ya da kart bilgisi gibi verileri ele geçirmeyi amaçlar." },
      { q: "CIA üçlüsünde 'I' neyi temsil eder?", options: ["Identity", "Integrity", "Internet", "Interface"], answer: "Integrity", why: "Integrity (bütünlük), verinin izinsiz değiştirilmediğini garanti etmektir." },
      { q: "Yetkisiz bir cihaz takılınca portu kapatan port security ayarı hangisidir?", options: ["violation shutdown", "violation allow", "mode trunk", "storm-control"], answer: "violation shutdown", why: "violation shutdown, ihlalde portu err-disabled durumuna alır." },
      { q: "Cihaz yönetiminde hangisi önerilir?", options: ["Telnet", "SSH", "HTTP", "FTP"], answer: "SSH", why: "SSH trafiği şifreler. Telnet parolayı bile açık metin gönderir." },
      { q: "MFA (çok faktörlü doğrulama) ne sağlar?", options: ["Daha hızlı internet", "Parolaya ek ikinci bir doğrulama", "Otomatik yedekleme", "IP adresi atama"], answer: "Parolaya ek ikinci bir doğrulama", why: "MFA, parola çalınsa bile saldırganın ikinci faktör olmadan girmesini zorlaştırır." }
    ],
    interview: [
      { q: "CIA üçlüsünü açıkla.", a: "Confidentiality veriyi yalnızca yetkililerin görmesi, Integrity verinin değiştirilmemesi, Availability sistemin gerektiğinde erişilebilir olmasıdır. Güvenlik önlemleri bu üç hedeften en az birini korumak için alınır." },
      { q: "Switch portunu yetkisiz cihazlara karşı nasıl korursun?", a: "Port security ile porta en çok bu kadar MAC öğrenmesine izin verir, sticky ile kaydeder, ihlalde portu kapatırım. Kullanılmayan portları da kapatır ve boş bir VLAN'a alırım." },
      { q: "Neden Telnet yerine SSH?", a: "Telnet tüm trafiği, parolalar dahil, şifresiz gönderir ve dinlenebilir. SSH trafiği şifreler, bu yüzden yönetimde kullanılır." }
    ],
    vocab: [
      { term: "Threat", tr: "tehdit", ex: "Ransomware is a serious threat." },
      { term: "Vulnerability", tr: "zayıflık", ex: "We found a vulnerability in the server." },
      { term: "Patch", tr: "yama", ex: "Apply the security patch." },
      { term: "Authentication", tr: "kimlik doğrulama", ex: "Enable two-factor authentication." },
      { term: "Encryption", tr: "şifreleme", ex: "The data is protected by encryption." },
      { term: "Breach", tr: "ihlal, sızıntı", ex: "We reported a data breach." }
    ],
    resources: [
      res(JERE, "Güvenlik konularını CCNA kapsamında anlatır"),
      { title: "CISA: Phishing ve güvenlik ipuçları", url: "https://www.cisa.gov/secure-our-world", type: "doc", why: "Gündelik güvenlik alışkanlıkları (kamu kurumu)", level: "başlangıç", lang: "EN" }
    ],
    sources: [CISCO]
  };
})();

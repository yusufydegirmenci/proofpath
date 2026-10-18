/* CCNA 200-301 · sabit dersler 13-17 (IPv6, STP/EtherChannel, İzleme servisleri, QoS, Otomasyon) */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).ccna = (window.PP_LESSONS.ccna || {}));
  var CISCO = { title: "Cisco CCNA 200-301", url: "https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccna.html" };
  var JERE = { title: "Jeremy's IT Lab: Free CCNA 200-301 (YouTube kanalı)", url: "https://www.youtube.com/@JeremysITLab", type: "video", length: "Çok bölümlü", level: "başlangıç", lang: "EN" };
  var PT = { title: "Cisco: Packet Tracer (ücretsiz simülatör)", url: "https://www.netacad.com/cisco-packet-tracer", type: "araç", level: "başlangıç", lang: "EN" };
  function res(a, why) { var o = {}; for (var k in a) o[k] = a[k]; o.why = why; return o; }

  /* 13 ───────────────────────────────────────────── IPv6 temelleri */
  L[13] = {
    hook: "IPv6, IPv4'ün adres bittiği şehre eklenen yepyeni bir mahalledir: adresler o kadar çok ki NAT'a bile gerek kalmaz.",
    homework: "Bilgisayarında 'ipconfig' çıktısında IPv6 adreslerini bul. Hangisi fe80:: ile başlıyor (link-local), hangisi global? Sonra 2001:0db8:0000:0000:0000:0000:0000:0001 adresini kısaltarak yaz.",
    warmup: {
      recap: [
        { point: "IPv4 32 bittir, adresler tükendi, NAT bunu hafifletti.", example: "PAT ile tek IP, çok cihaz" },
        { point: "ARP, IPv4'te IP'den MAC'i bulur.", example: "arp -a" }
      ],
      concepts: [
        { term: "IPv6", tr: "128 bitlik adres sistemi", summary: "8 grup, her grup 4 hex karakter.", example: "2001:db8:acad:1::1" },
        { term: "Link-local", tr: "Yalnızca aynı bağlantıda geçerli adres", summary: "FE80::/10 ile başlar, her IPv6 arayüzde otomatik oluşur.", example: "fe80::1" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Operatör sana IPv6 desteği açtı. Bilgisayarlarda hem IPv4 hem IPv6 adres görüyorsun ve bazı siteler IPv6 üzerinden açılıyor. Adresleri okuyamazsan hangi adresin ne için olduğunu bilemezsin." },
      { t: "h", text: "IPv6 adresi nasıl görünür?" },
      { t: "p", text: "IPv6 adresi 128 bittir, 16 bitlik 8 gruba bölünür ve her grup 4 hex karakterle yazılır, aralarında iki nokta üst üste vardır: 2001:0db8:0000:0000:0000:0000:0000:0001. Çok uzun olduğu için iki kısaltma kuralı vardır." },
      { t: "steps", h: "Kısaltma kuralları", items: [
        "Kural 1: her grubun başındaki sıfırlar silinebilir. 0db8 → db8, 0000 → 0.",
        "Kural 2: art arda gelen tamamen sıfır gruplar tek bir '::' ile değiştirilebilir. Bu sadece bir kez yapılabilir.",
        "Örnek: 2001:0db8:0000:0000:0000:0000:0000:0001 → 2001:db8::1",
        "Örnek: fe80:0000:0000:0000:0202:b3ff:fe1e:8329 → fe80::202:b3ff:fe1e:8329"
      ] },
      { t: "h", text: "Adres türleri" },
      { t: "steps", h: "En önemlileri", items: [
        "Global unicast (2000::/3): internette geçerli, IPv4'teki genel adres gibi.",
        "Link-local (FE80::/10): sadece aynı bağlantıda geçerli, yönlendirilmez. Her IPv6 arayüzünde otomatik oluşur.",
        "Unique local (FC00::/7, pratikte FD00::/8): özel ağ adresi, IPv4'teki 192.168.x.x gibi.",
        "Multicast (FF00::/8): bir gruba gönderim. IPv6'da broadcast yoktur, yerine multicast kullanılır.",
        "Loopback (::1) kendindir. Unspecified (::) adres yok demektir."
      ] },
      { t: "h", text: "Yapısı ve önemli farklar" },
      { t: "steps", h: "IPv4'ten farklar", items: [
        "Alt ağ standardı /64'tür: ilk 64 bit ağ (prefix), son 64 bit arayüz kimliği (interface ID).",
        "Broadcast yok. Multicast ve anycast var.",
        "ARP yok. Yerine NDP (Neighbor Discovery Protocol, ICMPv6) kullanılır.",
        "Adres edinme: SLAAC (cihaz router duyurusundan kendine adres oluşturur), DHCPv6 ya da elle.",
        "Dokümantasyon adresi: 2001:db8::/32. Örneklerde bunu kullanırız."
      ] },
      { t: "h", text: "Cisco router'da yapılandırma" },
      { t: "cmd", lang: "ios", calistirma: "atla Cisco IOS komutları; cihaz ya da Packet Tracer gerekir", text: "Router(config)# ipv6 unicast-routing\nRouter(config)# interface gigabitethernet0/0\nRouter(config-if)# ipv6 address 2001:db8:acad:1::1/64\nRouter(config-if)# ipv6 address fe80::1 link-local\nRouter(config-if)# no shutdown\n\n# Static route:\nRouter(config)# ipv6 route 2001:db8:acad:2::/64 2001:db8:acad:12::2\n\nRouter# show ipv6 interface brief\nRouter# show ipv6 route" },
      { t: "box", h: "Neden 'ipv6 unicast-routing'?", text: "Bu komut olmadan Cisco router IPv6 paketleri yönlendirmez. Arayüze adres verdin diye router otomatik yönlendirici olmaz." },
      { t: "warn", h: "Tuzak", text: "'::' bir adreste yalnızca bir kez kullanılabilir. 2001::db8::1 geçersizdir, çünkü kaç sıfır grubunun nereye gittiği belirsiz olur." }
    ],
    objectives: [
      { id: "h1", text: "Uzun bir IPv6 adresini baştaki sıfırları silip tek '::' kullanarak kısaltabilir, geçersiz kısaltmayı bulabilirsin." },
      { id: "h2", text: "Bir adresi önekine bakarak global unicast, link-local, unique local veya multicast olarak ayırt edebilirsin." },
      { id: "h3", text: "IPv6'nın IPv4'ten farklarını (broadcast yerine multicast, ARP yerine NDP, /64 alt ağ) ayırt edebilirsin." },
      { id: "h4", text: "Cisco router arayüzüne IPv6 adresi verip statik rota yazabilir ve yönlendirmeyi açan komutu bulabilirsin." }
    ],
    summary: [
      "IPv6 adresi 128 bittir: 16 bitlik 8 grup, her grup 4 hex karakter; baştaki sıfırlar silinir ve art arda gelen tamamen sıfır gruplar yalnızca bir kez '::' olur.",
      "Önek tablosu: global unicast 2000::/3, link-local FE80::/10, unique local FC00::/7 (pratikte FD00::/8), multicast FF00::/8; ::1 loopback, :: belirsiz adrestir.",
      "IPv6'da broadcast yoktur (multicast kullanılır), ARP yerine ICMPv6 tabanlı NDP çalışır ve standart alt ağ /64'tür (64 bit ağ, 64 bit arayüz kimliği).",
      "Cisco router IPv6 paketlerini 'ipv6 unicast-routing' olmadan yönlendirmez; statik rota 'ipv6 route <önek/uzunluk> <next-hop>' biçimindedir.",
      "Dokümantasyon ve örneklerde 2001:db8::/32 bloğu kullanılır; adres SLAAC, DHCPv6 veya elle edinilir."
    ],
    quiz: [
      { q: "2001:0db8:0000:0000:0000:0000:0000:0001 adresinin doğru kısaltması hangisidir?", options: ["2001:db8::1", "2001:db8:0:1", "2001::db8::1", "2001:db8:1"], answer: "2001:db8::1", why: "Baştaki sıfırları sil, art arda sıfır gruplarını tek '::' ile değiştir.", obj: "h1", whyNot: { "2001:db8:0:1": "Sıfır gruplarının hepsini silip yerine '::' koymak gerekir; burada kaç grubun eksildiği belli olmayan, yalnızca dört gruplu bir adres kalır.", "2001::db8::1": "'::' bir adreste yalnızca bir kez kullanılabilir; iki tane olursa kaç sıfır grubunun nereye gittiği belirsizleşir.", "2001:db8:1": "'::' olmadan sadece üç grup kalır; 8 gruptan eksik olan gruplar '::' ile gösterilmediği için adres geçersiz olur." } },
      { q: "FE80:: ile başlayan adres türü hangisidir?", options: ["Global unicast", "Link-local", "Multicast", "Loopback"], answer: "Link-local", why: "FE80::/10 link-local adresidir, yalnızca aynı bağlantıda geçerlidir.", obj: "h2", whyNot: { "Global unicast": "Global unicast adresler 2000::/3 ile (2 veya 3 ile başlayarak) başlar; FE80 ile başlayanlar bu blokta değildir.", "Multicast": "Multicast adresler FF00::/8 ile başlar, FE80 ile değil.", "Loopback": "Loopback adresi yalnızca ::1'dir; FE80:: öneki bu adres değildir." } },
      { q: "IPv6'da ARP'nin yerini hangi protokol alır?", options: ["DHCP", "NDP", "DNS", "ICMPv4"], answer: "NDP", why: "Neighbor Discovery Protocol (ICMPv6), komşu cihazların adresini bulmak için ARP'nin yerine kullanılır.", obj: "h3", whyNot: { "DHCP": "DHCP adres ve ayar dağıtır, komşunun MAC adresini bulmaz; bu işi IPv6'da NDP yapar.", "DNS": "DNS isimleri IP'ye çevirir; Layer 2 komşu adresini bulma görevi onda değildir.", "ICMPv4": "ICMPv4 IPv4'ün kontrol mesajlarıdır; IPv6'nın komşu keşfi ICMPv6 üzerinde çalışan NDP ile yapılır." } },
      { q: "IPv6'da standart alt ağ uzunluğu nedir?", options: ["/24", "/48", "/64", "/128"], answer: "/64", why: "Genelde 64 bit ağ, 64 bit arayüz kimliği kullanılır.", obj: "h3", whyNot: { "/24": "/24, IPv4'te sık görülen bir maskedir; IPv6'da LAN alt ağı için standart uzunluk /64'tür.", "/48": "/48 genelde bir siteye verilen önek uzunluğudur; tek bir LAN için /64 kullanılır.", "/128": "/128 tek bir hostu (örneğin loopback ::1/128) gösterir, bir alt ağı değil." } },
      { q: "Cisco router'ın IPv6 paketlerini yönlendirmesi için hangi komut gerekir?", options: ["ipv6 unicast-routing", "ip routing", "ipv6 enable", "ipv6 nat"], answer: "ipv6 unicast-routing", why: "Bu komut IPv6 yönlendirmeyi global olarak açar.", obj: "h4", whyNot: { "ip routing": "Bu IPv4 yönlendirmesidir; IPv6 paketlerinin yönlendirilmesini açmaz.", "ipv6 enable": "Arayüzde IPv6'yı etkinleştirip link-local adres oluşturur ama router'ı IPv6 paketlerini yönlendirir hâle getirmez.", "ipv6 nat": "NAT çeviri yapar; yönlendirmeyi açmaz ve IPv6'da adres bolluğu nedeniyle genelde gerekmez." } },
      { q: "Aşağıdaki adreslerden hangisi geçersizdir?", options: ["2001:db8::1","fe80::202:b3ff:fe1e:8329","2001::db8::1","::1"], answer: "2001::db8::1", why: "Bir adreste '::' yalnızca bir kez kullanılabilir; iki tane olursa her biri kaç sıfır grubunu temsil ettiği belirsiz kalır.", obj: "h1", whyNot: { "2001:db8::1": "Geçerlidir: 2001:db8:0:0:0:0:0:1 adresinin tek '::' ile kısaltılmış hâlidir.", "fe80::202:b3ff:fe1e:8329": "Geçerlidir: link-local adresin ortadaki sıfır grupları tek '::' ile gösterilmiştir.", "::1": "Geçerlidir: loopback adresidir, yedi sıfır grubu tek '::' ile kısaltılmıştır." } },
      { q: "Bir IPv6 adresi FF02::1 ile başlıyorsa bu adres hangi türdendir?", options: ["Multicast","Global unicast","Link-local","Unique local"], answer: "Multicast", why: "FF00::/8 multicast bloğudur; FF02::1 aynı bağlantıdaki tüm düğümlere gider ve IPv4 broadcast'in yerini tutar.", obj: "h2", whyNot: { "Global unicast": "Global unicast adresler 2000::/3 bloğundadır, FF ile başlamaz.", "Link-local": "Link-local adresler FE80::/10 ile başlar, FF ile başlamaz.", "Unique local": "Unique local adresler FC00::/7 (pratikte FD) ile başlar." } },
      { q: "2001:db8:acad:2::/64 ağına 2001:db8:acad:12::2 next-hop adresi üzerinden statik rota hangi komutla yazılır?", options: ["ipv6 route 2001:db8:acad:2::/64 2001:db8:acad:12::2","ip route 2001:db8:acad:2::/64 2001:db8:acad:12::2","ipv6 route 2001:db8:acad:2::/64 255.255.255.0 2001:db8:acad:12::2","ipv6 unicast-routing 2001:db8:acad:2::/64"], answer: "ipv6 route 2001:db8:acad:2::/64 2001:db8:acad:12::2", why: "IPv6 statik rota 'ipv6 route <önek/uzunluk> <next-hop>' biçimindedir; maske yerine önek uzunluğu yazılır.", obj: "h4", whyNot: { "ip route 2001:db8:acad:2::/64 2001:db8:acad:12::2": "'ip route' IPv4 rotası içindir; IPv6 önekini kabul etmez.", "ipv6 route 2001:db8:acad:2::/64 255.255.255.0 2001:db8:acad:12::2": "IPv6'da noktalı ondalık maske kullanılmaz; uzunluk /64 olarak önekin içinde yazılır.", "ipv6 unicast-routing 2001:db8:acad:2::/64": "Bu komut argüman almaz; yalnızca IPv6 yönlendirmeyi global olarak açar, rota eklemez." } }
    ],
    interview: [
      { q: "IPv6 neden geliştirildi?", a: "IPv4'ün 32 bitlik adres alanı tükendi. IPv6 128 bitlik adresleme ile neredeyse sınırsız adres sunar, ayrıca NAT ihtiyacını azaltır ve daha verimli bir başlık yapısı getirir." },
      { q: "Link-local adres nedir?", a: "FE80::/10 ile başlayan, sadece aynı bağlantıdaki cihazlar arasında geçerli, yönlendirilmeyen adrestir. Her IPv6 arayüzünde otomatik oluşur ve komşu keşfi, yönlendirme protokolleri gibi işlerde kullanılır." },
      { q: "IPv6'da broadcast var mı?", a: "Hayır. Broadcast yerine multicast kullanılır. Örneğin tüm düğümlere FF02::1 adresiyle gönderilir." }
    ],
    vocab: [
      { term: "Prefix", tr: "önek (ağ kısmı)", ex: "The prefix length is 64." },
      { term: "Dual stack", tr: "IPv4 ve IPv6 birlikte", ex: "The network runs dual stack." },
      { term: "Link-local", tr: "bağlantıya özel", ex: "Use the link-local address." },
      { term: "Multicast", tr: "grup gönderimi", ex: "IPv6 uses multicast instead of broadcast." },
      { term: "SLAAC", tr: "otomatik adres oluşturma", ex: "Clients use SLAAC to get an address." },
      { term: "Hex", tr: "16'lık sistem", ex: "IPv6 addresses are written in hex." }
    ],
    resources: [
      res(JERE, "IPv6 adreslemeyi baştan anlatır"),
      { title: "RFC 4291: IPv6 adresleme mimarisi", url: "https://www.rfc-editor.org/rfc/rfc4291", type: "doc", why: "Adres türlerinin resmî tanımı", level: "ileri", lang: "EN" }
    ],
    sources: [CISCO, { title: "RFC 4291", url: "https://www.rfc-editor.org/rfc/rfc4291" }]
  };

  /* 14 ───────────────────────────────────────────── STP ve EtherChannel */
  L[14] = {
    hook: "STP, şehirdeki döngüsel yolların trafiği kilitlemesini önleyen trafik düzenidir: bir yolu bilerek kapatır, ama o yol bozulursa yedeği açar.",
    homework: "Packet Tracer'da 3 switch'i üçgen şeklinde bağla ve 'show spanning-tree' ile root bridge'i bul. Root'u değiştirmek için 'spanning-tree vlan 1 priority 4096' yaz ve sonucu izle. Sonra iki switch arasına 2 kablo çekip EtherChannel yap.",
    warmup: {
      recap: [
        { point: "Switch bilinmeyen hedefi ve broadcast'i tüm portlara yayar.", example: "Flooding" },
        { point: "VLAN'lar arası trafik trunk portlardan geçer.", example: "802.1Q" }
      ],
      concepts: [
        { term: "Broadcast storm", tr: "Yayın fırtınası", summary: "Döngülü ağda broadcast sonsuza kadar dolaşır, ağ kilitlenir.", example: "Switch'ler arası döngü" },
        { term: "EtherChannel", tr: "Linkleri birleştirme", summary: "Birden fazla fiziksel kabloyu tek mantıksal link yapar.", example: "2 x 1 Gbps = 2 Gbps link" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Bir hafta sonu ağ yedeklilik için switch'ler arasına ek kablo çekildi. Pazartesi sabahı tüm ağ kilitlendi, ışıklar sürekli çakıyor. Döngü (loop) oluşmuş ve broadcast fırtınası başlamış. STP bunu önlemek için vardır." },
      { t: "h", text: "Döngü neden tehlikeli?" },
      { t: "p", text: "Switch'ler broadcast'i tüm portlara yayar. Switch'ler arasında bir döngü varsa broadcast çerçevesi dönüp durur ve çoğalır (broadcast storm). Ethernet çerçevesinde TTL yoktur, kendiliğinden ölmez. MAC tabloları da sürekli değişir. Çözüm: STP." },
      { t: "h", text: "STP ne yapar?" },
      { t: "p", text: "STP (Spanning Tree Protocol, 802.1D), switch'ler arasındaki fazla yolları mantıksal olarak kapatıp döngüsüz bir ağaç oluşturur. Bir aktif yol bozulursa kapalı yol otomatik açılır. Benzetme: yol çalışmasında bir şeridi kapatıp alternatifi hazır tutmak." },
      { t: "steps", h: "STP nasıl karar verir?", items: [
        "1) Root bridge seçilir: en düşük Bridge ID'ye sahip switch. Bridge ID = öncelik (varsayılan 32768 + VLAN no) + MAC adresi.",
        "2) Her root olmayan switch'te root'a en iyi yolu veren port 'root port' olur.",
        "3) Her segmentte root'a en yakın taraftaki port 'designated port' olur.",
        "4) Geriye kalan portlar 'alternate/blocked' olur ve trafik taşımaz."
      ] },
      { t: "box", h: "Maliyet (cost)", text: "Yol maliyeti hıza bağlıdır: 10 Mbps = 100, 100 Mbps = 19, 1 Gbps = 4, 10 Gbps = 2. Düşük maliyet daha iyi yoldur." },
      { t: "steps", h: "Port durumları (802.1D)", items: [
        "Blocking → Listening → Learning → Forwarding (toplam 30-50 saniye).",
        "RSTP (802.1w) bunu saniyeler içine indirir. Durumlar: Discarding, Learning, Forwarding.",
        "Cisco'nun varsayılanı PVST+: her VLAN için ayrı STP örneği."
      ] },
      { t: "cmd", lang: "ios", calistirma: "atla Cisco IOS komutları; cihaz ya da Packet Tracer gerekir", text: "Switch# show spanning-tree\nSwitch(config)# spanning-tree mode rapid-pvst\nSwitch(config)# spanning-tree vlan 1 root primary\nSwitch(config)# spanning-tree vlan 1 priority 4096\n\n# Bilgisayar portu için (uç cihaz):\nSwitch(config-if)# spanning-tree portfast\nSwitch(config-if)# spanning-tree bpduguard enable" },
      { t: "steps", h: "PortFast ve BPDU Guard", items: [
        "PortFast: uç cihaz portunu beklemeden hemen forwarding yapar. Bilgisayar anında bağlanır.",
        "BPDU Guard: PortFast'li porta yanlışlıkla bir switch takılırsa (BPDU gelirse) portu kapatır. Döngü riskini önler.",
        "Bu ikisini yalnızca uç cihaz portlarına uygula."
      ] },
      { t: "h", text: "EtherChannel: linkleri birleştir" },
      { t: "p", text: "İki switch arasına 2 kablo çekersen STP birini bloklar, bant genişliği boşa gider. EtherChannel birden çok fiziksel linki tek mantıksal link (port-channel) yapar. STP bunu tek link görür, bloklamaz; hem hız hem yedeklilik kazanılır." },
      { t: "steps", h: "Protokoller", items: [
        "LACP (802.3ad): açık standart. Modlar: active (teklif eder), passive (teklif bekler).",
        "PAgP: Cisco'ya özel. Modlar: desirable, auto.",
        "On: protokol yok, elle zorla. Karşı taraf da 'on' olmalı."
      ] },
      { t: "cmd", lang: "ios", calistirma: "atla Cisco IOS komutları; cihaz ya da Packet Tracer gerekir", text: "Switch(config)# interface range gigabitethernet0/1-2\nSwitch(config-if-range)# channel-group 1 mode active\nSwitch(config)# interface port-channel 1\nSwitch(config-if)# switchport mode trunk\n\nSwitch# show etherchannel summary" },
      { t: "warn", h: "Tuzak", text: "EtherChannel'da bağlanan portların hız, duplex, VLAN ve trunk ayarları aynı olmalıdır. Biri farklıysa kanal oluşmaz. Ayrıca iki taraf 'passive-passive' ya da 'auto-auto' kalırsa kimse teklif etmez ve kanal kurulmaz." }
    ],
    objectives: [
      { id: "h1", text: "Switch'lerin öncelik ve MAC değerlerinden Bridge ID'yi karşılaştırıp root bridge'i bulabilirsin." },
      { id: "h2", text: "STP'nin döngüyü nasıl önlediğini ve root port, designated port, blocked port rollerini ayırt edebilirsin." },
      { id: "h3", text: "PortFast ve BPDU Guard'ı uç cihaz portuna uygulayan komutları yazabilir ve hangi portlarda kullanılmayacağını bulabilirsin." },
      { id: "h4", text: "EtherChannel için LACP ve PAgP modlarının hangi çiftlerde kanal kurduğunu ayırt edebilirsin." }
    ],
    summary: [
      "Ethernet çerçevesinde TTL olmadığı için Layer 2 döngüsünde broadcast sonsuza kadar dolaşır ve broadcast storm ağı kilitler; STP fazla yolları bloklayarak bunu önler.",
      "Root bridge en düşük Bridge ID'ye sahip switch'tir: öncelik (varsayılan 32768 + VLAN no) önce, eşitse MAC adresi karar verir; 'spanning-tree vlan 1 priority 4096' ya da 'root primary' ile root seçilir.",
      "Klasik yol maliyeti: 10 Mbps = 100, 100 Mbps = 19, 1 Gbps = 4, 10 Gbps = 2; roller root port, designated port ve bloklanan alternate porttur.",
      "802.1D'de blocking, listening, learning, forwarding geçişi 30-50 saniye sürer; RSTP (802.1w) saniyelere indirir, Cisco varsayılanı PVST+'tır (VLAN başına ayrı örnek).",
      "PortFast ve BPDU Guard yalnızca uç cihaz portlarına yazılır; EtherChannel'da LACP active/passive, PAgP desirable/auto kullanır ve bağlanan portların hız, duplex, VLAN ayarı aynı olmalıdır."
    ],
    quiz: [
      { q: "STP'nin temel amacı nedir?", options: ["Hız artırmak", "Layer 2 döngülerini önlemek", "IP dağıtmak", "VLAN oluşturmak"], answer: "Layer 2 döngülerini önlemek", why: "STP, yedek yolları mantıksal olarak kapatarak döngü ve broadcast fırtınasını önler.", obj: "h2", whyNot: { "Hız artırmak": "STP bir yolu bloklar, bant genişliğini artırmaz; hız ve bant için EtherChannel gibi bir çözüm gerekir.", "IP dağıtmak": "IP dağıtma DHCP'nin işidir; STP Layer 2'de döngüyü önler.", "VLAN oluşturmak": "VLAN'lar 'vlan' komutuyla oluşturulur; STP VLAN yaratmaz, yalnızca VLAN başına döngüsüz topoloji kurar." } },
      { q: "Root bridge nasıl seçilir?", options: ["En yüksek IP adresi", "En düşük Bridge ID", "En çok port", "En hızlı switch"], answer: "En düşük Bridge ID", why: "Bridge ID = öncelik + MAC. En düşük değere sahip switch root olur.", obj: "h1", whyNot: { "En yüksek IP adresi": "STP Layer 2'de çalışır ve Bridge ID'ye IP adresi girmez.", "En çok port": "Port sayısı Bridge ID'nin parçası değildir; öncelik ve MAC'e bakılır.", "En hızlı switch": "Hız Bridge ID'de yer almaz; root seçimi öncelik ve MAC adresine göre yapılır." } },
      { q: "PortFast hangi porta uygulanır?", options: ["Switch'ler arası trunk", "Uç cihaz (bilgisayar) portu", "Router portu", "Her porta"], answer: "Uç cihaz (bilgisayar) portu", why: "PortFast, uç cihaz portlarının hemen forwarding'e geçmesi için kullanılır.", obj: "h3", whyNot: { "Switch'ler arası trunk": "Trunk'ta karşıdan BPDU beklenir; buraya PortFast veya BPDU Guard koymak döngü korumasını bozar ya da portu kapatır.", "Router portu": "Router portu STP'ye katılmaz; PortFast bir switch portu özelliğidir.", "Her porta": "Uç cihaz olmayan, başka switch bağlanabilecek portlara PortFast koymak döngü riski yaratır." } },
      { q: "Birden çok fiziksel linki tek mantıksal link yapan teknoloji hangisidir?", options: ["VLAN", "EtherChannel", "NAT", "HSRP"], answer: "EtherChannel", why: "EtherChannel, linkleri port-channel altında birleştirir.", obj: "h4", whyNot: { "VLAN": "VLAN broadcast alanını böler, fiziksel linkleri birleştirmez.", "NAT": "NAT adres çevirisidir; linklerle ilgisi yoktur.", "HSRP": "HSRP varsayılan ağ geçidi yedekliliği sağlayan bir first-hop protokolüdür, Layer 2 link birleştirme yapmaz." } },
      { q: "LACP için iki tarafın moduna ne uygun olur?", options: ["passive-passive", "active-passive", "auto-auto", "desirable-auto"], answer: "active-passive", why: "En az bir taraf active olmalıdır. passive-passive'de kimse teklif etmez. desirable ve auto PAgP içindir.", obj: "h4", whyNot: { "passive-passive": "İkisi de passive olursa kimse LACP teklifi göndermez ve kanal kurulmaz.", "auto-auto": "auto PAgP modudur ve pasiftir; iki taraf auto ise teklif eden olmaz, ayrıca LACP sorusunda protokol uymaz.", "desirable-auto": "Bu çift PAgP içindir ve çalışır; ama soru LACP'yi sorar, desirable ve auto LACP modu değildir." } },
      { q: "VLAN 1'de SW1 (öncelik 32769, MAC 0000.0C00.0002), SW2 (öncelik 32769, MAC 0000.0C00.0001) ve SW3 (öncelik 4097, MAC 0000.0C00.00FF) var. Root bridge hangisidir?", options: ["SW1","SW2","SW3","Öncelikler eşit olmadığı için root seçilemez"], answer: "SW3", why: "Önce öncelik karşılaştırılır: 4097 en düşük olduğundan SW3 root olur; MAC yalnızca öncelikler eşitse devreye girer.", obj: "h1", whyNot: { "SW1": "Önceliği 32769 ile SW3'ten (4097) yüksektir; MAC'e eşitlik olursa bakılır.", "SW2": "MAC adresi en düşük olsa da önceliği 32769'dur; öncelik MAC'ten önce değerlendirilir.", "Öncelikler eşit olmadığı için root seçilemez": "STP en düşük değeri seçer; öncelikler farklıysa en düşük öncelik kazanır, eşitlik aranmaz." } },
      { q: "STP maliyet tablosuna göre 1 Gbps bir linkin klasik yol maliyeti kaçtır?", options: ["4","19","2","100"], answer: "4", why: "Klasik değerler: 10 Mbps = 100, 100 Mbps = 19, 1 Gbps = 4, 10 Gbps = 2.", obj: "h2", whyNot: { "2": "2, 10 Gbps linkin maliyetidir.", "19": "19 Fast Ethernet (100 Mbps) linkin maliyetidir.", "100": "100, 10 Mbps linkin maliyetidir." } },
      { q: "Root olmayan bir switch'te root bridge'e en iyi yolu veren port hangi rolü alır?", options: ["Root port","Designated port","Alternate (blocked) port","Edge port"], answer: "Root port", why: "Her root olmayan switch'te root'a en düşük maliyetle ulaşan tek port root port olur.", obj: "h2", whyNot: { "Designated port": "Designated port, her segmentte root'a en yakın taraftaki porttur; root'a giden yol portu değildir.", "Alternate (blocked) port": "Alternate port, root'a ikinci yolu verip trafik taşımayan bloklanmış porttur.", "Edge port": "Edge port, PortFast'li uç cihaz portu için kullanılan bir terimdir, root'a giden yolla ilgisi yoktur." } },
      { q: "Bilgisayar bağlanan portu hemen forwarding'e alıp porta yanlışlıkla switch takılırsa portu kapatması için hangi komut çifti yazılır?", options: ["spanning-tree portfast ve spanning-tree bpduguard enable","spanning-tree mode rapid-pvst ve channel-group 1 mode active","spanning-tree vlan 1 priority 4096 ve switchport mode trunk","spanning-tree vlan 1 root primary ve channel-group 1 mode on"], answer: "spanning-tree portfast ve spanning-tree bpduguard enable", why: "PortFast portu hemen forwarding yapar, BPDU Guard porta BPDU gelirse portu kapatır.", obj: "h3", whyNot: { "spanning-tree mode rapid-pvst ve channel-group 1 mode active": "Birincisi global STP modunu seçer, ikincisi EtherChannel kurar; ikisi de uç cihaz portunu korumaz.", "spanning-tree vlan 1 priority 4096 ve switchport mode trunk": "Biri root seçimini etkiler, diğeri portu trunk yapar; trunk uç cihaz portu için doğru değildir.", "spanning-tree vlan 1 root primary ve channel-group 1 mode on": "Root primary root seçimini ayarlar, channel-group ise EtherChannel'dır; PortFast veya BPDU Guard yoktur." } },
      { q: "BPDU Guard'lı bir PortFast portuna BPDU gönderen bir switch bağlanırsa port ne olur?", options: ["Port err-disabled durumuna geçip kapanır","Port forwarding'de kalır ve BPDU yok sayılır","Port otomatik olarak root port seçilir","Port EtherChannel'a eklenir"], answer: "Port err-disabled durumuna geçip kapanır", why: "BPDU Guard, uç cihaz portunda BPDU görürse döngü riskini önlemek için portu err-disabled yapar.", obj: "h3", whyNot: { "Port forwarding'de kalır ve BPDU yok sayılır": "Yok saymak PortFast'li portu döngüye açık bırakırdı; BPDU Guard tam olarak bunu engeller.", "Port otomatik olarak root port seçilir": "Root port seçimi BPDU Guard'ın işi değildir; porta BPDU gelmesi portun kapanmasına yol açar.", "Port EtherChannel'a eklenir": "EtherChannel elle veya LACP/PAgP ile kurulur; BPDU Guard portu kanala eklemez." } },
      { q: "Bir tarafta PAgP desirable, diğer tarafta PAgP auto yapılandırılırsa ne olur?", options: ["PAgP kanalı kurulur","Kanal kurulmaz, çünkü auto taraf teklif etmez","LACP kanalı kurulur","STP linklerden birini mutlaka bloklar"], answer: "PAgP kanalı kurulur", why: "desirable aktif olarak teklif eder, auto ise gelen teklifi kabul eder; bu çift kanal kurar.", obj: "h4", whyNot: { "Kanal kurulmaz, çünkü auto taraf teklif etmez": "Bir tarafın teklif etmesi yeter; desirable teklif eder, auto kabul eder. Kanal yalnızca iki taraf da pasifse kurulmaz.", "LACP kanalı kurulur": "desirable ve auto PAgP modlarıdır; LACP'nin modları active ve passive'dir.", "STP linklerden birini mutlaka bloklar": "Kanal kurulduğunda STP bunu tek mantıksal link olarak görür ve bloklamaz." } }
    ],
    interview: [
      { q: "STP neden gerekli?", a: "Switch'ler arasında yedek yol varsa döngü oluşur ve broadcast fırtınası ağı çökertir. STP fazla yolları bloklayarak döngüsüz bir topoloji sağlar, aktif yol bozulursa yedeği açar." },
      { q: "Root bridge nasıl seçilir, nasıl kontrol edersin?", a: "En düşük Bridge ID'ye (öncelik + MAC) sahip switch seçilir. Öncelik değerini düşürerek ('spanning-tree vlan 1 priority 4096' ya da 'root primary') istediğim switch'i root yaparım. 'show spanning-tree' ile doğrularım." },
      { q: "EtherChannel nedir, faydası nedir?", a: "Birden çok fiziksel linki tek mantıksal link olarak birleştirir. STP birini bloklamaz, bant genişliği artar ve bir link koparsa diğerleri çalışmaya devam eder." }
    ],
    vocab: [
      { term: "Loop", tr: "döngü", ex: "There is a loop in the network." },
      { term: "Root bridge", tr: "kök switch", ex: "Switch A is the root bridge." },
      { term: "Redundancy", tr: "yedeklilik", ex: "We need redundancy between the switches." },
      { term: "Failover", tr: "devralma", ex: "Failover took five seconds." },
      { term: "Bundle", tr: "demet, birleştirme", ex: "Bundle the two links together." },
      { term: "Blocked port", tr: "bloklanmış port", ex: "This port is blocked by STP." }
    ],
    resources: [
      res(JERE, "STP ve EtherChannel'ı adım adım anlatır"),
      res(PT, "Üç switch'le döngü kur, STP'nin bloklamasını izle")
    ],
    sources: [CISCO]
  };

  /* 15 ───────────────────────────────────────────── NTP, Syslog ve SNMP */
  L[15] = {
    hook: "NTP duvar saatini ayarlar, Syslog olay defterini tutar, SNMP ise cihazların nabzını ölçen sağlık taramasıdır.",
    homework: "Packet Tracer'da bir router'a syslog sunucusu ve NTP sunucusu tanımla. Arayüzü kapatıp aç ve olayın syslog sunucusunda hangi seviyede (kaç numaralı) göründüğünü yaz.",
    warmup: {
      recap: [
        { point: "SSH, cihaz yönetimini şifreler.", example: "transport input ssh" },
        { point: "ACL ve port security ağı korur.", example: "Katmanlı savunma" }
      ],
      concepts: [
        { term: "NTP", tr: "Ağ zaman protokolü", summary: "Cihazların saatlerini aynı kaynağa eşitler.", example: "UDP 123" },
        { term: "Syslog", tr: "Olay günlüğü", summary: "Cihaz olaylarını seviyeyle merkezi sunucuya yollar.", example: "Seviye 0 (acil) ile 7 (debug)" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Dün gece 03:12'de ağda bir kesinti oldu. Üç farklı cihazın log'una bakıyorsun ve saatler birbirini tutmuyor; hangi olay önce oldu anlayamıyorsun. Ayrıca 200 cihazı tek tek açıp kontrol etmek yerine merkezden izlemek istiyorsun. NTP, Syslog ve SNMP bunun için." },
      { t: "h", text: "NTP: herkes aynı saatte" },
      { t: "p", text: "NTP (Network Time Protocol), ağdaki cihazların saatini güvenilir bir kaynağa göre eşitler (UDP 123). Log'larda doğru sıra, sertifika geçerliliği ve güvenlik denetimi için doğru saat şarttır. Kaynakların güvenilirlik katmanına 'stratum' denir; 0 atomik saat, 1 ona bağlı sunucu, sayı büyüdükçe kaynaktan uzaklaşılır." },
      { t: "cmd", lang: "ios", calistirma: "atla Cisco IOS komutları; cihaz ya da Packet Tracer gerekir", text: "Router(config)# ntp server 10.0.0.5\nRouter# show ntp status\nRouter# show ntp associations\nRouter# show clock" },
      { t: "h", text: "Syslog: merkezi olay günlüğü" },
      { t: "p", text: "Cihazlar olayları (arayüz açıldı, yapılandırma değişti, hata) mesaj olarak üretir. Syslog bunları konsola, belleğe ya da merkezi bir sunucuya (UDP 514) gönderir. Her mesajın 0 ile 7 arasında bir önem seviyesi vardır." },
      { t: "steps", h: "Syslog seviyeleri (0 en ciddi)", items: [
        "0 Emergency: sistem kullanılamıyor",
        "1 Alert: hemen müdahale gerek",
        "2 Critical: kritik durum",
        "3 Error: hata",
        "4 Warning: uyarı",
        "5 Notice: normal ama önemli",
        "6 Informational: bilgi",
        "7 Debugging: hata ayıklama ayrıntısı"
      ] },
      { t: "box", h: "Ezber ipucu", text: "Seviye sayısı küçüldükçe olay ciddileşir. 'logging trap warnings' dersen 4 ve daha küçük (0-4) seviyeler sunucuya gider." },
      { t: "cmd", lang: "ios", calistirma: "atla Cisco IOS komutları; cihaz ya da Packet Tracer gerekir", text: "Router(config)# service timestamps log datetime msec\nRouter(config)# logging host 10.0.0.9\nRouter(config)# logging trap warnings\nRouter# show logging" },
      { t: "h", text: "SNMP: izleme ve yönetim" },
      { t: "p", text: "SNMP (Simple Network Management Protocol), bir yönetim istasyonunun (manager) cihazlardaki küçük yazılımlardan (agent) bilgi alıp ayar yapmasını sağlar. Cihazın bilgileri MIB denen bir veri ağacında OID numaralarıyla tutulur (örneğin CPU, arayüz trafiği)." },
      { t: "steps", h: "Temel bilgiler", items: [
        "Manager, agent'a UDP 161 ile sorar (Get) ya da ayar değiştirir (Set).",
        "Agent, önemli olayda manager'a kendiliğinden haber yollar (Trap, UDP 162).",
        "SNMPv1 ve v2c: topluluk adı (community string) ile çalışır, şifresizdir. Zayıf.",
        "SNMPv3: kimlik doğrulama ve şifreleme sunar. Mümkünse bunu kullan."
      ] },
      { t: "cmd", lang: "ios", calistirma: "atla Cisco IOS komutları; cihaz ya da Packet Tracer gerekir", text: "# Salt okunur topluluk (örnek isim; gerçekte tahmin edilmesi zor bir değer kullan):\nRouter(config)# snmp-server community <topluluk-adi> ro\nRouter(config)# snmp-server host 10.0.0.9 version 2c <topluluk-adi>" },
      { t: "warn", h: "Tuzak", text: "'public' ve 'private' gibi varsayılan topluluk adları saldırganların ilk dediği şeydir. Yazma (rw) yetkisini gereksiz yere açma. Yeni kurulumlarda SNMPv3 tercih et." }
    ],
    objectives: [
      { id: "h1", text: "NTP, Syslog ve SNMP'yi kullandıkları UDP portlarına (123, 514, 161/162) göre ayırt edebilirsin." },
      { id: "h2", text: "Syslog seviyelerinin adını ve numarasını eşleştirip 'logging trap warnings' ile hangi mesajların gideceğini bulabilirsin." },
      { id: "h3", text: "SNMP işlemlerini (Get, Set, Trap) ve SNMPv2c ile SNMPv3'ün güvenlik farkını ayırt edebilirsin." },
      { id: "h4", text: "Router'da NTP sunucusu, syslog sunucusu tanımlayan IOS komutlarını yazabilirsin." }
    ],
    summary: [
      "NTP UDP 123 ile cihaz saatlerini eşitler; stratum kaynaktan uzaklığı gösterir (0 saat kaynağı, 1 ona bağlı sunucu) ve 'ntp server <ip>' ile 'show ntp associations' kullanılır.",
      "Syslog UDP 514 ile merkezi sunucuya gider; seviyeler 0 Emergency'den 7 Debugging'e kadardır ve küçük sayı daha ciddidir.",
      "'logging trap warnings' seviye 4 ve daha ciddi (0-4) mesajları sunucuya yollar; sunucu 'logging host <ip>' ile tanımlanır.",
      "SNMP'de manager agent'a UDP 161 ile Get/Set yapar, agent önemli olayda UDP 162 ile Trap yollar; veriler MIB'de OID numaralarıyla tutulur.",
      "SNMPv1 ve v2c topluluk adını düz metin taşır ('public', 'private' tahmin edilen varsayılanlardır); kimlik doğrulama ve şifreleme SNMPv3 ile gelir."
    ],
    quiz: [
      { q: "NTP hangi portu kullanır?", options: ["UDP 123", "UDP 161", "UDP 514", "TCP 22"], answer: "UDP 123", why: "NTP UDP 123, SNMP UDP 161/162, Syslog UDP 514 kullanır.", obj: "h1", whyNot: { "UDP 161": "UDP 161 SNMP'nin Get/Set sorgu portudur.", "UDP 514": "UDP 514 Syslog portudur.", "TCP 22": "TCP 22 SSH içindir ve TCP kullanır; NTP UDP üzerinde çalışır." } },
      { q: "Syslog'da en ciddi seviye hangisidir?", options: ["0 (Emergency)", "3 (Error)", "6 (Informational)", "7 (Debugging)"], answer: "0 (Emergency)", why: "Seviye sayısı küçüldükçe olay ciddileşir. 0 sistem kullanılamıyor demektir.", obj: "h2", whyNot: { "3 (Error)": "Error hatadır ama 0, 1 ve 2 numaralı seviyeler (Emergency, Alert, Critical) daha ciddidir.", "6 (Informational)": "Informational yalnızca bilgi mesajıdır, ciddi olay değildir.", "7 (Debugging)": "Debugging en ayrıntılı ve en az ciddi seviyedir, ciddiyet sırasında sondadır." } },
      { q: "SNMPv3'ün diğer sürümlerden farkı nedir?", options: ["Daha eski", "Kimlik doğrulama ve şifreleme sunar", "Yalnızca router'da çalışır", "TCP kullanır"], answer: "Kimlik doğrulama ve şifreleme sunar", why: "v1 ve v2c topluluk adıyla çalışır ve şifresizdir. v3 güvenlik özellikleri getirir.", obj: "h3", whyNot: { "Daha eski": "SNMPv3 en yeni sürümdür; v1 ve v2c ondan eskidir.", "Yalnızca router'da çalışır": "SNMP switch, sunucu gibi birçok cihazda çalışır; v3 için böyle bir kısıt yoktur.", "TCP kullanır": "SNMP v3 dâhil UDP 161/162 kullanır; fark taşıma protokolünde değil güvenliktedir." } },
      { q: "'logging trap warnings' ne yapar?", options: ["Sadece 7. seviyeyi yollar", "0-4 seviyesindeki mesajları sunucuya yollar", "Logları kapatır", "Debug açar"], answer: "0-4 seviyesindeki mesajları sunucuya yollar", why: "Warning seviyesi 4'tür. Bu seviye ve daha ciddileri (0-4) gönderilir.", obj: "h2", whyNot: { "Sadece 7. seviyeyi yollar": "Trap seviyesi bir eşiktir: belirtilen seviye ve daha ciddileri gider; ayrıca warnings seviyesi 4'tür, 7 değil.", "Logları kapatır": "Logların kapatılması ayrı komutlarla yapılır; 'logging trap' yalnızca sunucuya giden seviyeyi sınırlar.", "Debug açar": "Debug çıktısı 'debug' komutlarıyla açılır; logging trap warnings debug mesajı göndermez." } },
      { q: "Cihaz önemli bir olayı yönetim istasyonuna kendiliğinden bildirmek için SNMP'de ne kullanır?", options: ["Get", "Set", "Trap", "Walk"], answer: "Trap", why: "Trap, agent'ın kendi inisiyatifiyle gönderdiği bildirimdir.", obj: "h3", whyNot: { "Get": "Get'i manager başlatır; agent kendiliğinden bildirim göndermez.", "Set": "Set, manager'ın cihazdaki bir değeri değiştirme isteğidir.", "Walk": "Walk da manager'ın MIB ağacını ardışık sorgularla dolaşmasıdır; olayı agent kendisi bildirmez." } },
      { q: "SNMP manager, bir cihazdaki agent'a Get sorgusu gönderirken hedef port hangisidir?", options: ["UDP 161","UDP 162","UDP 123","UDP 514"], answer: "UDP 161", why: "Agent sorguları UDP 161'de dinler; manager'ın Get ve Set istekleri bu porta gider.", obj: "h1", whyNot: { "UDP 162": "UDP 162, agent'ın gönderdiği Trap'leri manager'ın dinlediği porttur; sorgular 161'e gider.", "UDP 123": "UDP 123 NTP içindir.", "UDP 514": "UDP 514 Syslog içindir." } },
      { q: "Syslog'da 4 numaralı seviyenin adı nedir?", options: ["Warning","Error","Notice","Critical"], answer: "Warning", why: "Sıra: 0 Emergency, 1 Alert, 2 Critical, 3 Error, 4 Warning, 5 Notice, 6 Informational, 7 Debugging.", obj: "h2", whyNot: { "Error": "Error 3 numaralı seviyedir.", "Notice": "Notice 5 numaralı seviyedir.", "Critical": "Critical 2 numaralı seviyedir." } },
      { q: "Yönetim istasyonu bir arayüzün ayarını agent üzerinden değiştirmek istiyor. Bu SNMP işlemi hangisidir?", options: ["Set","Get","Trap","MIB"], answer: "Set", why: "Set, manager'ın agent'taki bir değeri değiştirmesini sağlar; Get okur.", obj: "h3", whyNot: { "Get": "Get yalnızca değeri okur, değiştirmez.", "Trap": "Trap, değişiklik isteği değil, agent'ın manager'a yolladığı kendiliğinden bildirimdir.", "MIB": "MIB bir işlem değil, cihaz bilgilerinin OID'lerle tutulduğu veri ağacıdır." } },
      { q: "Router'ın 10.0.0.5 adresindeki NTP sunucusundan saat alması için hangi komut yazılır?", options: ["ntp server 10.0.0.5","logging host 10.0.0.5","snmp-server community 10.0.0.5 ro","clock set 10.0.0.5"], answer: "ntp server 10.0.0.5", why: "'ntp server <ip>' router'ı o adresteki NTP kaynağına eşitler; sonucu 'show ntp status' ile doğrularsın.", obj: "h4", whyNot: { "logging host 10.0.0.5": "Bu komut log mesajlarının gönderileceği syslog sunucusunu tanımlar, saati eşitlemez.", "snmp-server community 10.0.0.5 ro": "Bu komutta 10.0.0.5 bir topluluk adı olarak okunur; sunucu adresi tanımlamaz ve saatle ilgisi yoktur.", "clock set 10.0.0.5": "'clock set' elle saat ve tarih girer (ör. saat:dakika:saniye); IP adresi kabul etmez." } },
      { q: "Router'ın olay mesajlarını 10.0.0.9 adresindeki merkezi sunucuya göndermesi için hangi komut yazılır?", options: ["logging host 10.0.0.9","ntp server 10.0.0.9","snmp-server community 10.0.0.9 ro","service timestamps log 10.0.0.9"], answer: "logging host 10.0.0.9", why: "'logging host <ip>' syslog sunucusunu tanımlar; hangi seviyelerin gideceğini 'logging trap' belirler.", obj: "h4", whyNot: { "ntp server 10.0.0.9": "Bu komut saat kaynağı tanımlar, log göndermez.", "snmp-server community 10.0.0.9 ro": "Bu komut SNMP topluluk adı tanımlar; 10.0.0.9 burada bir ad olur, sunucu adresi olmaz.", "service timestamps log 10.0.0.9": "'service timestamps log' log satırlarına zaman damgası ekler ve datetime gibi seçenek ister, IP adresi almaz." } }
    ],
    interview: [
      { q: "Neden ağ cihazlarında doğru saat önemlidir?", a: "Log'ları farklı cihazlar arasında doğru sıraya dizmek, güvenlik olaylarını araştırmak ve sertifika gibi zamana bağlı mekanizmaların çalışması için. NTP ile cihazları aynı kaynağa eşitlerim." },
      { q: "Syslog seviyelerini anlat.", a: "0 ile 7 arasındadır: Emergency, Alert, Critical, Error, Warning, Notice, Informational, Debugging. Küçük sayı daha ciddi olaydır. Sunucuya belirli bir seviye ve daha ciddisi gönderilebilir." },
      { q: "SNMP nedir, hangi sürümü seçersin?", a: "Ağ cihazlarını izlemek ve yönetmek için kullanılan protokoldür. Manager agent'a sorar, agent trap ile haber verir. Güvenlik için kimlik doğrulama ve şifreleme sunan SNMPv3'ü tercih ederim." }
    ],
    vocab: [
      { term: "Timestamp", tr: "zaman damgası", ex: "Check the timestamp in the log." },
      { term: "Log", tr: "kayıt", ex: "Send the logs to the server." },
      { term: "Severity", tr: "önem seviyesi", ex: "The severity is critical." },
      { term: "Monitor", tr: "izlemek", ex: "We monitor the switches 24/7." },
      { term: "Alert", tr: "uyarı", ex: "An alert was sent to the admin." },
      { term: "Threshold", tr: "eşik", ex: "CPU usage passed the threshold." }
    ],
    resources: [
      res(JERE, "NTP, Syslog ve SNMP'yi anlatır"),
      res(PT, "Syslog ve NTP'yi simülasyonda dene")
    ],
    sources: [CISCO]
  };

  /* 16 ───────────────────────────────────────────── QoS temelleri */
  L[16] = {
    hook: "QoS, yoğun otoyolda ambulansa ayrı şerit açmaktır: bütün araçlar aynı yolu paylaşır ama acil olanlar öne geçer.",
    homework: "Aynı hat üzerinden aynı anda hem video görüşmesi hem büyük bir dosya indirmeyi dene. Görüşmedeki takılmayı gözle. Hangi trafik türlerinin gecikmeye duyarlı olduğunu listele.",
    warmup: {
      recap: [
        { point: "Syslog olay seviyeleri 0 (ciddi) ile 7 (hata ayıklama) arasındadır.", example: "Warning = 4" },
        { point: "ACL trafiği sınıflandırmak için de kullanılır.", example: "permit / deny eşleşmesi" }
      ],
      concepts: [
        { term: "QoS", tr: "Hizmet kalitesi", summary: "Trafiği önceliklendirir, kritik uygulamaları korur.", example: "Ses ve video öncelikli" },
        { term: "Jitter", tr: "Gecikme dalgalanması", summary: "Paketlerin varış süresinin tutarsızlığı. Sesi bozar.", example: "Ses robot gibi çıkar" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Biri büyük bir yedekleme dosyası yüklemeye başlıyor ve tüm ofisin Teams görüşmeleri bozuluyor. Hat dolunca paketler sıraya giriyor ve ses takılıyor. Çözüm daha fazla bant genişliği ya da QoS ile önemli trafiğe öncelik vermek." },
      { t: "h", text: "4 temel sorun" },
      { t: "steps", h: "Ağın dört düşmanı", items: [
        "Bandwidth (bant genişliği): hat dolunca herkes yavaşlar.",
        "Delay (gecikme): paketin gitmesi için geçen süre. Ses için tek yön en çok yaklaşık 150 ms.",
        "Jitter: gecikmenin dalgalanması. Ses için yaklaşık 30 ms altı olmalı.",
        "Packet loss (kayıp): paketlerin düşmesi. Ses için yaklaşık %1 altı olmalı."
      ] },
      { t: "h", text: "Trafik türleri" },
      { t: "steps", h: "Kim neye duyarlı?", items: [
        "Ses (VoIP): gecikmeye, jitter'a ve kayba çok duyarlı. Az bant ister ama en yüksek öncelik.",
        "Video: yüksek bant, kayba ve gecikmeye duyarlı.",
        "Veri: e-posta, dosya aktarımı. Gecikmeye toleranslı, kayıp olursa yeniden iletilir.",
        "Kritik uygulama: ERP, veritabanı. Önceliklendirilir."
      ] },
      { t: "h", text: "QoS araç kutusu" },
      { t: "steps", h: "Sırayla ne olur?", items: [
        "Classification (sınıflandırma): trafiği türüne göre ayır (ACL, protokol, port ile).",
        "Marking (işaretleme): pakete öncelik etiketi koy (IP başlığında DSCP, Ethernet'te CoS).",
        "Queuing (kuyruklama): yoğunlukta paketleri kuyruğa al, önemlileri öne geçir.",
        "Congestion avoidance: kuyruk dolmadan önce bazı paketleri bilerek düşür (örnek: WRED).",
        "Policing: izin verilen hızı aşan trafiği düşür ya da işaretle.",
        "Shaping: aşan trafiği kuyrukta bekletip yavaşlatarak gönder."
      ] },
      { t: "box", h: "Policing ve shaping farkı", text: "Policing fazlayı keser (düşürür), shaping fazlayı geciktirir (tamponlar). Policing ani bozulma yapabilir, shaping gecikme ekler." },
      { t: "steps", h: "Bilmen gereken DSCP değerleri", items: [
        "EF (46): ses (VoIP) için en yüksek öncelik, düşük gecikmeli kuyrukta (LLQ) gider.",
        "AF serisi (örnek: AF41): video ve kritik veri için garantili sınıflar.",
        "Default (0): normal en iyi çaba (best effort) trafiği."
      ] },
      { t: "box", h: "Güven sınırı (trust boundary)", text: "İşaretlere nerede güveneceğini belirleyen yerdir. Örneğin IP telefonların işaretini kabul eder, kullanıcı bilgisayarlarından gelen işareti silip yeniden yazarsın. Böylece kimse kendi trafiğine 'ses önceliği' yazıp ağı haksız kullanamaz." },
      { t: "warn", h: "Tuzak", text: "QoS bant genişliği yaratmaz; yalnızca yoğunlukta hangi trafiğin önce gideceğini belirler. Hat hiç dolmuyorsa QoS fark ettirmez. Gerçek yetersizlik varsa hattı büyütmek gerekir." }
    ],
    objectives: [
      { id: "h1", text: "Ses, video, veri ve kritik uygulama trafiğini gecikme, jitter ve kayba duyarlılığına göre ayırt edebilir, ses için eşik değerlerini (≈150 ms, ≈30 ms, ≈%1) söyleyebilirsin." },
      { id: "h2", text: "Classification, marking, queuing, congestion avoidance, policing ve shaping mekanizmalarını görevlerine göre ayırt edebilirsin." },
      { id: "h3", text: "Trafik türüne uygun DSCP değerini (EF 46, AF serisi, Default 0) seçebilirsin." },
      { id: "h4", text: "QoS'un neyi çözüp neyi çözmediğini (bant genişliği yaratmaz, trust boundary) ayırt edebilirsin." }
    ],
    summary: [
      "Ağın dört sorunu bant genişliği, gecikme, jitter ve paket kaybıdır; ses için tek yön gecikme yaklaşık 150 ms, jitter yaklaşık 30 ms ve kayıp yaklaşık %1 altında olmalıdır.",
      "QoS sırası: classification (ayır), marking (DSCP/CoS etiketi), queuing (kuyrukta öne geçir), congestion avoidance (örn. WRED), policing ve shaping.",
      "Policing aşan trafiği düşürür veya işaretler, shaping aynı trafiği kuyrukta bekletip yavaşlatır; biri kayıp, diğeri gecikme yaratır.",
      "DSCP: EF (46) ses ve düşük gecikmeli kuyruk (LLQ), AF serisi (örn. AF41) video ve kritik veri, Default (0) best effort trafik.",
      "Trust boundary'de kullanıcı bilgisayarlarından gelen işaretler silinip yeniden yazılır; QoS yoğunlukta öncelik belirler ama bant genişliği yaratmaz."
    ],
    quiz: [
      { q: "Hangi trafik türü gecikme ve jitter'a en duyarlıdır?", options: ["E-posta", "Dosya indirme", "Ses (VoIP)", "Yedekleme"], answer: "Ses (VoIP)", why: "Ses gerçek zamanlıdır, gecikme ve jitter anında kalite bozar.", obj: "h1", whyNot: { "E-posta": "E-posta gecikmeye toleranslıdır; birkaç saniye gecikse kimse fark etmez.", "Dosya indirme": "Dosya indirme yavaşlasa da iş görür, kayıp olursa yeniden iletilir.", "Yedekleme": "Yedekleme arka planda çalışır ve gecikmeye duyarlı değildir." } },
      { q: "QoS'ta paketlere öncelik etiketi koymaya ne denir?", options: ["Classification", "Marking", "Shaping", "Policing"], answer: "Marking", why: "Marking, pakete DSCP ya da CoS gibi bir değer yazmaktır.", obj: "h2", whyNot: { "Classification": "Classification trafiği türüne göre ayırır, etiket yazmaz; etiketi yazan adım marking'dir.", "Shaping": "Shaping aşan trafiği tamponlayıp yavaşlatır, pakete öncelik etiketi koymaz.", "Policing": "Policing hız sınırını aşan trafiği düşürür veya işaretler; öncelik etiketi koymak ayrı bir adımdır." } },
      { q: "Aşan trafiği düşüren mekanizma hangisidir?", options: ["Shaping", "Policing", "Queuing", "Marking"], answer: "Policing", why: "Policing fazlayı düşürür, shaping ise tamponlayıp geciktirir.", obj: "h2", whyNot: { "Shaping": "Shaping aşan trafiği düşürmez, kuyrukta bekletip yavaşlatarak gönderir.", "Queuing": "Queuing paketleri sıraya alıp önemlileri öne geçirir; fazlayı düşürmek onun görevi değildir.", "Marking": "Marking yalnızca pakete DSCP/CoS etiketi yazar." } },
      { q: "Ses trafiği için tipik DSCP değeri nedir?", options: ["EF (46)", "Default (0)", "AF11", "CS1"], answer: "EF (46)", why: "EF (Expedited Forwarding), ses için kullanılan en yüksek öncelikli sınıftır.", obj: "h3", whyNot: { "Default (0)": "Default (0) best effort trafiktir, ses için özel öncelik sağlamaz.", "AF11": "AF serisi video ve kritik veri için garantili sınıflardır; AF11 bu serinin düşük öncelikli bir üyesidir, ses sınıfı değildir.", "CS1": "CS1 genelde best effort'un altında kalan düşük öncelikli (scavenger) trafik için kullanılır." } },
      { q: "QoS'un sınırı nedir?", options: ["Bant genişliği yaratır", "Yoğunlukta önceliği belirler, ek bant yaratmaz", "Sadece Wi-Fi'da çalışır", "Şifreleme yapar"], answer: "Yoğunlukta önceliği belirler, ek bant yaratmaz", why: "Hat yetersizse QoS sadece hangi trafiğin önce gideceğini seçer, kapasiteyi artırmaz.", obj: "h4", whyNot: { "Bant genişliği yaratır": "QoS kapasite eklemez; hat yetersizse çözüm hattı büyütmektir.", "Sadece Wi-Fi'da çalışır": "QoS kablolu LAN, WAN ve Wi-Fi'da uygulanabilir; Wi-Fi'a özel değildir.", "Şifreleme yapar": "Şifreleme gizlilik sağlar; QoS ise trafiğin önceliğini belirler." } },
      { q: "Ses (VoIP) trafiğinde tek yön gecikme için kabul edilen üst sınır yaklaşık kaçtır?", options: ["150 ms","30 ms","500 ms","1 saniye"], answer: "150 ms", why: "Ses kalitesi için tek yön gecikme yaklaşık 150 ms altında kalmalıdır; jitter yaklaşık 30 ms, kayıp yaklaşık %1 altı olmalıdır.", obj: "h1", whyNot: { "30 ms": "30 ms jitter için verilen yaklaşık sınırdır, tek yön gecikme sınırı değildir.", "500 ms": "500 ms konuşmayı belirgin biçimde bozacak kadar uzundur, kabul edilen sınırın çok üstündedir.", "1 saniye": "1 saniye gecikmede konuşma sürekli birbirinin lafını kesmeye dönüşür; sınır yaklaşık 150 ms'dir." } },
      { q: "Kuyruk tamamen dolmadan önce bazı paketleri bilerek düşürerek tıkanıklığı önleyen mekanizma hangisidir?", options: ["Congestion avoidance (örn. WRED)","Marking","Shaping","Classification"], answer: "Congestion avoidance (örn. WRED)", why: "Congestion avoidance, kuyruk dolmadan bazı paketleri erkenden düşürür ve gönderenlerin hızını kendiliğinden azaltmasını sağlar.", obj: "h2", whyNot: { "Marking": "Marking yalnızca etiket yazar, paket düşürmez.", "Shaping": "Shaping fazlayı düşürmek yerine tamponlayıp geciktirir.", "Classification": "Classification trafiği türüne göre ayırır, düşürme yapmaz." } },
      { q: "Özel bir işaret taşımayan, normal en iyi çaba (best effort) trafiğin DSCP değeri nedir?", options: ["Default (0)","EF (46)","AF41","CS1"], answer: "Default (0)", why: "İşaretsiz trafik DSCP 0 (Default) taşır ve en iyi çaba ile iletilir.", obj: "h3", whyNot: { "EF (46)": "EF (46) ses için ayrılmış en yüksek öncelikli sınıftır.", "AF41": "AF41 video gibi trafik için garantili bir sınıftır, varsayılan değildir.", "CS1": "CS1 (DSCP 8) genelde best effort'un da altında tutulan düşük öncelikli trafik için kullanılır." } },
      { q: "Ağ, kullanıcı bilgisayarlarından gelen DSCP işaretlerine neden güvenmemeli ve işareti silip yeniden yazmalıdır?", options: ["Kullanıcı kendi trafiğine ses önceliği yazıp ağı haksız kullanabilir","DSCP alanı IP başlığında bulunmaz","Switch'ler DSCP işaretini okuyamaz","DSCP işaretleri yalnızca ses telefonlarına yazılabilir"], answer: "Kullanıcı kendi trafiğine ses önceliği yazıp ağı haksız kullanabilir", why: "Trust boundary, işarete nerede güvenileceğini belirler; güvenilmeyen uçtan gelen işaret yeniden yazılarak kötüye kullanım önlenir.", obj: "h4", whyNot: { "DSCP alanı IP başlığında bulunmaz": "DSCP IP başlığındaki ToS/DS alanında taşınır; mesele alanın var olması değil güvenilirliğidir.", "Switch'ler DSCP işaretini okuyamaz": "QoS yapılandırılmış switch'ler DSCP'yi okur; asıl sebep işaretin kötüye kullanılabilmesidir.", "DSCP işaretleri yalnızca ses telefonlarına yazılabilir": "Herhangi bir uç cihaz DSCP değeri yazabilir; bu yüzden ağ işarete körü körüne güvenmez." } }
    ],
    interview: [
      { q: "QoS nedir, neden gerekli?", a: "Ağdaki trafiği türüne göre önceliklendirme mekanizmasıdır. Ses ve video gibi gecikmeye duyarlı trafiğin, dosya indirme gibi toleranslı trafik yüzünden bozulmasını yoğunluk anında önlemek için gerekir." },
      { q: "Policing ile shaping farkı nedir?", a: "Policing, belirlenen hızı aşan trafiği düşürür ya da işaretler. Shaping, aşan trafiği kuyrukta bekletip yavaşlatarak gönderir. İlki kayıp, ikincisi gecikme yaratır." },
      { q: "Ses trafiği için hangi değerler önemlidir?", a: "Tek yön gecikme en çok yaklaşık 150 ms, jitter yaklaşık 30 ms altı ve paket kaybı yaklaşık %1 altı olmalıdır. Bunlar aşılırsa sesin kalitesi bozulur." }
    ],
    vocab: [
      { term: "Latency", tr: "gecikme", ex: "High latency affects video calls." },
      { term: "Priority", tr: "öncelik", ex: "Voice has the highest priority." },
      { term: "Queue", tr: "kuyruk", ex: "The packets wait in the queue." },
      { term: "Congestion", tr: "tıkanıklık", ex: "The link is under congestion." },
      { term: "Throughput", tr: "gerçek aktarım hızı", ex: "Throughput dropped during backup." },
      { term: "Real-time", tr: "gerçek zamanlı", ex: "Voice is real-time traffic." }
    ],
    resources: [
      res(JERE, "QoS'u örneklerle anlatır"),
      { title: "Cisco: QoS ile ilgili kaynaklar (Cisco belgeleri)", query: "Cisco QoS configuration guide DSCP classification marking", type: "doc", why: "Kavramların resmî açıklaması", level: "orta", lang: "EN" }
    ],
    sources: [CISCO]
  };

  /* 17 ───────────────────────────────────────────── Otomasyon ve programlanabilirlik */
  L[17] = {
    hook: "Otomasyon, 200 router'a tek tek elle girmek yerine bir işi yazıp hepsine aynı anda göndermektir: insan hatasını azaltır, zamanı kısaltır.",
    homework: "Bir JSON dosyası yaz: 2 cihazın adı, IP adresi ve konumu olsun. Sonra aynı veriyi YAML olarak yaz. İkisinin farkını kendi cümlenle açıkla.",
    warmup: {
      recap: [
        { point: "SNMP, ağ cihazlarını izlemek için kullanılır; yönetimi elle yaparsak ölçeklenmez.", example: "200 cihaz" },
        { point: "Cihaz yapılandırması komut satırı ile elle yazılıyordu.", example: "Router(config)# ..." }
      ],
      concepts: [
        { term: "API", tr: "Yazılımların konuşma arayüzü", summary: "Bir programın başka bir programdan veri isteme yolu.", example: "REST API" },
        { term: "JSON", tr: "Yaygın veri formatı", summary: "Anahtar-değer çiftleri, okunabilir metin.", example: "{ \"host\": \"R1\" }" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Yeni bir VLAN'ı 150 switch'e eklemen gerekiyor. Elle yapsan günler sürer ve birinde yazım hatası yaparsın. Bir script ya da araç ile bunu dakikalarda ve aynı şekilde yapabilirsin. Günümüzde ağ mühendisliği giderek yazılımla yönetiliyor." },
      { t: "h", text: "Geleneksel ağ ve controller tabanlı ağ" },
      { t: "p", text: "Geleneksel ağda her cihaz kendi kontrol (control plane) kararını verir ve tek tek yapılandırılır. Controller tabanlı (SDN) ağda kontrol zekâsı merkezi bir controller'da toplanır, cihazlar (data plane) onun talimatıyla paket iletir. Yönetici ağı tek noktadan görür ve yönetir." },
      { t: "steps", h: "3 düzlem (plane)", items: [
        "Data plane: paketi gerçekten ileten kısım (switch/router donanımı).",
        "Control plane: nasıl iletileceğine karar veren kısım (routing protokolleri, MAC öğrenme).",
        "Management plane: cihaza erişip yapılandırma ve izleme (SSH, SNMP, API)."
      ] },
      { t: "steps", h: "API yönleri", items: [
        "Northbound API: controller'ın üstteki uygulamalara/yöneticiye sunduğu arayüz (genelde REST).",
        "Southbound API: controller'ın cihazlarla konuştuğu arayüz (NETCONF, OpenFlow, CLI/SNMP gibi).",
        "Örnek ürün: Cisco Catalyst Center (eski adıyla DNA Center)."
      ] },
      { t: "h", text: "REST API" },
      { t: "p", text: "REST, web üzerinden HTTP ile çalışan yaygın bir API tarzıdır. Her kaynak bir URL ile gösterilir ve HTTP fiilleri işlemi belirtir." },
      { t: "steps", h: "HTTP fiilleri ve CRUD", items: [
        "POST: oluştur (Create)",
        "GET: oku (Read)",
        "PUT / PATCH: güncelle (Update)",
        "DELETE: sil (Delete)",
        "Yanıt kodları: 200 başarılı, 201 oluşturuldu, 400 hatalı istek, 401 yetkisiz, 404 bulunamadı, 500 sunucu hatası."
      ] },
      { t: "cmd", lang: "bash", text: "curl -X GET https://api.ornek.com/devices -H \"Accept: application/json\"" },
      { t: "h", text: "Veri formatları" },
      { t: "cmd", lang: "json", text: "# JSON\n{\n  \"hostname\": \"R1\",\n  \"interfaces\": [\n    { \"name\": \"Gi0/0\", \"ip\": \"10.0.0.1\" },\n    { \"name\": \"Gi0/1\", \"ip\": \"192.168.10.1\" }\n  ]\n}" },
      { t: "cmd", lang: "yaml", text: "# YAML (aynı veri)\nhostname: R1\ninterfaces:\n  - name: Gi0/0\n    ip: 10.0.0.1\n  - name: Gi0/1\n    ip: 192.168.10.1" },
      { t: "steps", h: "Farkları", items: [
        "JSON: süslü parantez ve tırnak kullanır, API'lerde çok yaygın.",
        "YAML: girinti ile yazılır, insan için daha okunur. Ansible dosyalarında kullanılır.",
        "XML: etiketlerle yazılır, daha eski ve ayrıntılı."
      ] },
      { t: "h", text: "Yapılandırma yönetim araçları" },
      { t: "steps", h: "Kısaca", items: [
        "Ansible: ajan gerektirmez (agentless), SSH ile bağlanır, YAML 'playbook' kullanır. Ağ otomasyonunda çok popüler.",
        "Puppet ve Chef: cihazda ajan çalıştırır (agent tabanlı), merkezden durum yönetir.",
        "Amaç: aynı yapılandırmayı birçok cihaza tutarlı biçimde uygulamak."
      ] },
      { t: "box", h: "Yapay zekâ ve ağ", text: "CCNA sınavında yapay zekâ ve makine öğrenmesinin ağ işletiminde (anomali tespiti, tahmin) kullanıldığına dair kavramsal sorular da çıkabilir. Detaya inilmez; kavramı bilmen yeter." },
      { t: "warn", h: "Tuzak", text: "Otomasyon hatayı da hızla çoğaltır. Bir script yanlışsa 150 cihaz bir anda bozulur. Önce test ortamında, sonra küçük bir grupta dene; her zaman yedek al." }
    ],
    objectives: [
      { id: "h1", text: "Data plane, control plane ve management plane görevlerini ile northbound/southbound API yönlerini ayırt edebilirsin." },
      { id: "h2", text: "Bir REST isteği için uygun HTTP fiilini (POST, GET, PUT/PATCH, DELETE) ve yanıt kodunu (200, 401, 404 vb.) seçebilirsin." },
      { id: "h3", text: "Aynı veriyi JSON, YAML veya XML biçiminden tanıyıp ayırt edebilirsin." },
      { id: "h4", text: "Ansible, Puppet ve Chef'i ajan gerektirme durumuna göre ayırt edebilirsin." }
    ],
    summary: [
      "Data plane paketi iletir, control plane nasıl iletileceğine karar verir (routing, MAC öğrenme), management plane cihaza erişim ve yapılandırmadır (SSH, SNMP, API).",
      "Controller tabanlı ağda kontrol merkezileşir; northbound API controller'ı uygulamalara bağlar (genelde REST), southbound API cihazlara bağlar (NETCONF, OpenFlow gibi); örnek ürün Cisco Catalyst Center'dır.",
      "REST'te HTTP fiilleri CRUD'a karşılık gelir: POST oluşturur, GET okur, PUT/PATCH günceller, DELETE siler.",
      "Yanıt kodları: 200 başarılı, 201 oluşturuldu, 400 hatalı istek, 401 yetkisiz, 404 bulunamadı, 500 sunucu hatası.",
      "JSON süslü parantez ve tırnakla, YAML girintiyle, XML etiketlerle yazılır; Ansible ajansızdır (SSH, YAML playbook), Puppet ve Chef cihazda ajan çalıştırır."
    ],
    quiz: [
      { q: "REST API'de kayıt oluşturmak için hangi HTTP fiili kullanılır?", options: ["GET", "POST", "DELETE", "HEAD"], answer: "POST", why: "POST oluşturur, GET okur, PUT/PATCH günceller, DELETE siler.", obj: "h2", whyNot: { "GET": "GET mevcut bir kaynağı okur, yeni kayıt oluşturmaz.", "DELETE": "DELETE kaynağı siler.", "HEAD": "HEAD, GET gibidir ama yalnızca başlık bilgisini döndürür; kayıt oluşturmaz." } },
      { q: "Ansible için hangisi doğrudur?", options: ["Ajan gerektirir", "Ajan gerektirmez ve YAML playbook kullanır", "Sadece Windows'ta çalışır", "Sadece router'larda çalışır"], answer: "Ajan gerektirmez ve YAML playbook kullanır", why: "Ansible agentless'tır, SSH ile bağlanır ve YAML ile yazılır.", obj: "h4", whyNot: { "Ajan gerektirir": "Ansible ajansızdır (agentless); cihaza ajan kurulumu gerekmez. Ajan kullanan araçlar Puppet ve Chef'tir.", "Sadece Windows'ta çalışır": "Ansible SSH ile bağlanır ve ağ cihazı, sunucu gibi çok çeşitli hedefleri yönetir; platform kısıtı yoktur.", "Sadece router'larda çalışır": "Ansible switch, firewall ve sunucuları da yönetir; yalnızca router'a özgü değildir." } },
      { q: "Controller'ın uygulamalara sunduğu arayüz hangisidir?", options: ["Northbound API", "Southbound API", "Console API", "VLAN API"], answer: "Northbound API", why: "Northbound API üst katmana (uygulama/yönetici), southbound API alt katmana (cihazlara) bağlanır.", obj: "h1", whyNot: { "Southbound API": "Southbound API controller'ı alttaki cihazlara bağlar; uygulamalarla konuşan northbound'dur.", "Console API": "Console, cihaza fiziksel yönetim erişimidir; CCNA'da controller API yönü olarak tanımlanmaz.", "VLAN API": "VLAN bir Layer 2 özelliğidir, API yönü değildir." } },
      { q: "Kontrol düzlemi (control plane) ne yapar?", options: ["Paketi donanımda iletir", "Paketin nasıl iletileceğine karar verir", "Cihazı fiziksel olarak yönetir", "Kabloyu taşır"], answer: "Paketin nasıl iletileceğine karar verir", why: "Control plane, routing ve MAC öğrenme gibi kararları verir. Data plane ise bunu uygular.", obj: "h1", whyNot: { "Paketi donanımda iletir": "Paketi donanımda iletmek data plane'in işidir.", "Cihazı fiziksel olarak yönetir": "Cihaza erişip yapılandırma ve izleme management plane'in işidir ve fiziksel bir işlem değildir.", "Kabloyu taşır": "Kabloyu taşımak fiziksel ortamdır, bir düzlem görevi değildir." } },
      { q: "HTTP 404 yanıtı ne demektir?", options: ["Başarılı", "Yetkisiz", "Kaynak bulunamadı", "Sunucu hatası"], answer: "Kaynak bulunamadı", why: "404, istenen kaynağın bulunamadığını gösterir.", obj: "h2", whyNot: { "Başarılı": "Başarılı yanıt 200'dür.", "Yetkisiz": "Yetkisiz erişim 401 koduyla bildirilir.", "Sunucu hatası": "Sunucu hatası 500'dür; 404 istemcinin yanlış veya olmayan kaynak istediğini gösterir." } },
      { q: "Yönetici SSH ile bir switch'e bağlanıp VLAN yapılandırıyor. Bu işlem hangi düzleme aittir?", options: ["Management plane","Data plane","Control plane","Southbound API"], answer: "Management plane", why: "Cihaza erişip yapılandırma ve izleme (SSH, SNMP, API) management plane'in işidir.", obj: "h1", whyNot: { "Data plane": "Data plane paketleri iletir, yapılandırma yapmaz.", "Control plane": "Control plane iletim kararlarını verir (routing protokolleri, MAC öğrenme); yöneticinin yaptığı erişim değildir.", "Southbound API": "Southbound API bir düzlem değil, controller'ın cihazlarla konuştuğu arayüzdür." } },
      { q: "Controller'ın cihazlarla konuşmak için kullandığı southbound arayüze örnek hangisidir?", options: ["NETCONF","JSON","YAML","Ansible playbook"], answer: "NETCONF", why: "NETCONF ve OpenFlow tipik southbound protokollerdir; controller bunlarla cihazları yapılandırır.", obj: "h1", whyNot: { "JSON": "JSON bir veri formatıdır, controller'ı cihazlara bağlayan protokol değildir.", "YAML": "YAML da bir veri formatıdır; Ansible dosyalarında kullanılır.", "Ansible playbook": "Playbook, Ansible'ın YAML ile yazılmış görev dosyasıdır; southbound API değildir." } },
      { q: "REST API sunucusu geçersiz kimlik bilgisiyle gelen bir isteğe hangi kodu döndürür?", options: ["401","200","404","500"], answer: "401", why: "401 yetkisiz demektir; kimlik doğrulama başarısız olduğunda sunucu bu kodu verir.", obj: "h2", whyNot: { "200": "200 isteğin başarıyla işlendiğini gösterir.", "404": "404, istenen kaynağın bulunamadığını gösterir; sorun kimlik değil kaynağın yokluğudur.", "500": "500 sunucu tarafındaki hatadır, kimlik sorunu değildir." } },
      { q: "Girinti ile yazılan, süslü parantez ve tırnak gerektirmeyen, Ansible dosyalarında kullanılan veri formatı hangisidir?", options: ["YAML","JSON","XML","CSV"], answer: "YAML", why: "YAML yapıyı girintiyle gösterir ve insan için okunaklıdır; Ansible playbook'ları bu formatta yazılır.", obj: "h3", whyNot: { "JSON": "JSON süslü parantez ve tırnak kullanır.", "XML": "XML etiketlerle yazılır ve ayrıntılıdır.", "CSV": "CSV virgülle ayrılmış düz tablo satırlarıdır; iç içe yapı girintiyle gösterilmez." } },
      { q: "{ \"hostname\": \"R1\", \"interfaces\": [ { \"name\": \"Gi0/0\" } ] } metni hangi veri formatındadır?", options: ["JSON","YAML","XML","CSV"], answer: "JSON", why: "Süslü parantezler, tırnaklı anahtarlar ve köşeli parantezli diziler JSON'un işaretleridir.", obj: "h3", whyNot: { "YAML": "YAML aynı veriyi 'hostname: R1' biçiminde ve girintiyle yazar, süslü parantez gerekmez.", "XML": "XML aynı veriyi <hostname>R1</hostname> gibi etiketlerle yazar.", "CSV": "CSV virgüllü düz satırlardır; iç içe liste ve süslü parantez içermez." } },
      { q: "Puppet ve Chef için hangisi doğrudur?", options: ["Yönetilen cihazda bir ajan çalıştırırlar","Yalnızca SSH ile ajan kurmadan bağlanırlar","Yalnızca YAML playbook ile çalışırlar","Controller'ın northbound API'sinin başka adıdır"], answer: "Yönetilen cihazda bir ajan çalıştırırlar", why: "Puppet ve Chef ajan tabanlıdır; ajansız ve SSH ile çalışan araç Ansible'dır.", obj: "h4", whyNot: { "Yalnızca SSH ile ajan kurmadan bağlanırlar": "Bu Ansible'ın özelliğidir; Puppet ve Chef ajan kullanır.", "Yalnızca YAML playbook ile çalışırlar": "YAML playbook Ansible'ın biçimidir.", "Controller'ın northbound API'sinin başka adıdır": "İkisi de yapılandırma yönetim aracıdır, controller API yönü değildir." } }
    ],
    interview: [
      { q: "Ağ otomasyonu neden önemli?", a: "Elle yapılandırma yavaştır ve insan hatasına açıktır. Otomasyon yüzlerce cihazı aynı şekilde, hızlı ve tekrarlanabilir biçimde yapılandırmayı sağlar, ayrıca değişikliklerin izlenmesini kolaylaştırır." },
      { q: "REST API'de GET ve POST farkı nedir?", a: "GET mevcut bir kaynağı okur ve veriyi değiştirmez. POST yeni bir kaynak oluşturmak için kullanılır ve genelde gövdesinde veri taşır." },
      { q: "JSON ile YAML arasındaki fark nedir?", a: "İkisi de veri formatıdır. JSON süslü parantez ve tırnak kullanır, API'lerde yaygındır. YAML girinti ile yazılır, insan için daha okunaklıdır ve Ansible gibi araçlarda kullanılır." }
    ],
    vocab: [
      { term: "Automation", tr: "otomasyon", ex: "We automate the backup process." },
      { term: "Script", tr: "betik", ex: "Run the script on all switches." },
      { term: "Endpoint", tr: "API ucu", ex: "Call the devices endpoint." },
      { term: "Request / response", tr: "istek / yanıt", ex: "The response code was 200." },
      { term: "Template", tr: "şablon", ex: "Use a configuration template." },
      { term: "Deploy", tr: "yaymak, devreye almak", ex: "Deploy the change to all sites." }
    ],
    resources: [
      res(JERE, "Otomasyon ve programlanabilirlik bölümünü anlatır"),
      { title: "Cisco DevNet (ücretsiz öğrenme ve laboratuvarlar)", url: "https://developer.cisco.com/", type: "kurs", why: "Ağ otomasyonu ve API için Cisco'nun resmî öğrenme alanı", level: "orta", lang: "EN" }
    ],
    sources: [CISCO]
  };
})();

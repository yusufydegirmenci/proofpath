/* CCNA 200-301 · sabit dersler 1-6 (Temeller, Adresleme, Switching, Routing)
 * Anahtar = STARTER.ccna içindeki sıra numarası. quiz.answer, seçeneklerden birinin birebir metnidir. */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).ccna = (window.PP_LESSONS.ccna || {}));

  /* 1 ───────────────────────────────────────────── Ağ nedir? Cihazlar ve kablolar */
  L[1] = {
    hook: "Ağ bir şehir gibidir: cihazlar evler, switch mahalle kavşağı, router şehir çıkış kapısı, kablolar da yollar.",
    homework: "Evinde ya da ofiste ağdaki 4 cihazı say ve her birinin 'uç cihaz', 'switch', 'router' ya da 'access point' olduğunu not et. Sonra bilgisayarında ipconfig çalıştırıp Default Gateway satırını bul.",
    warmup: {
      concepts: [
        { term: "Uç cihaz (end device)", tr: "Trafiği başlatan ya da alan cihaz", summary: "Bilgisayar, telefon, yazıcı, sunucu. Ağın kenarında durur.", example: "Muhasebedeki yazıcı bir uç cihazdır." },
        { term: "Switch", tr: "Aynı ağdaki cihazları birbirine bağlar", summary: "Ofis içi kavşak. Kabloları toplar, veriyi doğru porta yollar.", example: "Bir kattaki 24 bilgisayar bir switch'e takılır." },
        { term: "Router", tr: "Farklı ağları birbirine bağlar", summary: "Ofis ağını internete ya da başka bir ofise bağlayan kapı.", example: "Ofisin internete çıkışı router'dan geçer." }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Muhasebeden Ayşe arıyor: 'İnternet yok, hiçbir şey açılmıyor!' Sorun kablo mu, switch mi, router mı, yoksa sadece onun bilgisayarı mı? Ağın parçalarını bilmezsen nereye bakacağını da bilemezsin." },
      { t: "h", text: "Ağ nedir?" },
      { t: "p", text: "Ağ, iki ya da daha fazla cihazın veri paylaşabilmesi için birbirine bağlanmasıdır. Dosya göndermek, yazıcıyı paylaşmak, web sitesi açmak hep bir ağ işidir. Benzetme: şehirdeki yollar. Cihazlar evler, kablolar yollar, veri de yoldaki arabalar." },
      { t: "h", text: "Parçalar ve işleri" },
      { t: "steps", h: "Ağın temel parçaları", items: [
        "Uç cihaz (end device): bilgisayar, telefon, yazıcı, sunucu. Veriyi başlatan ya da alan taraf.",
        "Switch: aynı ağdaki cihazları birbirine bağlar. Ofis içindeki kavşak gibidir.",
        "Router: farklı ağları birbirine bağlar. Ofisten internete çıkan kapıdır.",
        "Access point (AP): cihazların kablosuz bağlanmasını sağlar. Wi-Fi'ın kaynağıdır.",
        "Firewall: gelen ve giden trafiği kurala göre süzer. Güvenlik kapısıdır.",
        "Kablo: bakır (UTP) ya da fiber. Veriyi taşıyan yol."
      ] },
      { t: "h", text: "Kablolar: bakır mı fiber mi?" },
      { t: "steps", h: "Hangisi ne zaman?", items: [
        "UTP (bakır, bükümlü çift): ofis içi. Cat5e ve Cat6 yaygın. Bir kablo en çok 100 metre gider.",
        "Fiber optik: ışıkla taşır. Uzun mesafede (kilometreler) ve yüksek hızda kullanılır, elektrik parazitinden etkilenmez.",
        "Düz kablo (straight-through): farklı tür cihazları bağlar. Örnek: bilgisayardan switch'e.",
        "Çapraz kablo (crossover): aynı tür cihazları bağlar. Örnek: switch'ten switch'e. Günümüz cihazlarının çoğu bunu otomatik algılar (Auto-MDIX)."
      ] },
      { t: "h", text: "Ağ türleri" },
      { t: "steps", h: "Büyüklüğe göre", items: [
        "LAN (Local Area Network): tek bir bina ya da ofis. Senin ofis ağın.",
        "WAN (Wide Area Network): şehirler ve ülkeler arası. Genelde internet operatörünün hattı.",
        "İnternet: dünyadaki binlerce ağın birbirine bağlanmış hali."
      ] },
      { t: "h", text: "Elle dene: bağlantıyı 4 adımda kontrol et" },
      { t: "steps", h: "Windows'ta", items: [
        "Başlat'a tıkla, 'cmd' yaz ve Enter'a bas. Siyah bir pencere açılır.",
        "'ipconfig' yaz ve Enter'a bas. 'IPv4 Address' ve 'Default Gateway' satırlarını bul.",
        "'ping 127.0.0.1' yaz. Cevap geliyorsa bilgisayarının kendi ağ yazılımı çalışıyor demektir.",
        "'ping' ve ardından Default Gateway adresini yaz. Cevap geliyorsa router'a ulaşıyorsun. Sonra 'ping 8.8.8.8' ile internete bak."
      ] },
      { t: "cmd", text: "ipconfig\nping 127.0.0.1\nping 192.168.1.1\nping 8.8.8.8" },
      { t: "box", h: "Sorun giderme sırası", text: "Kablo ve ışıklar, sonra bilgisayarın IP'si, sonra gateway'e ping, sonra internete ping. Hangi adımda takıldıysan sorun oradadır. Bu sırayı ezberle; mülakatta da iş yerinde de işe yarar." },
      { t: "warn", h: "Tuzak", text: "Modem ile router aynı şey değildir. Evdeki cihaz çoğu zaman ikisini birden yapar, o yüzden karışır. Ayrıca switch aynı ağdaki cihazları bağlar, ağlar arası yolu router bulur." }
    ],
    quiz: [
      { q: "Farklı iki ağı birbirine bağlayan cihaz hangisidir?", options: ["Switch", "Router", "Yazıcı", "Access point"], answer: "Router", why: "Switch aynı ağdaki cihazları bağlar. Farklı ağlar arasındaki yolu router bulur." },
      { q: "Bakır UTP kablonun standart en uzun mesafesi nedir?", options: ["10 metre", "100 metre", "1 kilometre", "10 kilometre"], answer: "100 metre", why: "UTP Ethernet kablosu 100 metreye kadar güvenilir çalışır. Daha uzun mesafe için fiber ya da araya cihaz gerekir." },
      { q: "Tek bir ofis binasındaki ağ hangi türdür?", options: ["WAN", "LAN", "Internet", "VPN"], answer: "LAN", why: "LAN, küçük bir alandaki ağdır. WAN şehirler arası uzun mesafeli ağdır." },
      { q: "Wi-Fi ile bağlanmak için ağa hangi cihaz eklenir?", options: ["Access point", "Hub", "Fiber kablo", "Firewall"], answer: "Access point", why: "Access point kablosuz cihazları kabloluya bağlar." },
      { q: "'ping 127.0.0.1' neyi test eder?", options: ["İnterneti", "Router'ı", "Bilgisayarın kendi ağ yazılımını", "DNS sunucusunu"], answer: "Bilgisayarın kendi ağ yazılımını", why: "127.0.0.1 loopback adresidir, paket hiç dışarı çıkmaz. Cevap gelmesi yerel ağ yazılımının çalıştığını gösterir." }
    ],
    interview: [
      { q: "Switch ile router arasındaki fark nedir?", a: "Switch aynı ağdaki cihazları birbirine bağlar ve MAC adresine bakar. Router farklı ağları birbirine bağlar ve IP adresine bakıp yol seçer. Basitçe: switch bina içi kavşak, router şehir çıkışı." },
      { q: "Kullanıcı 'internet yok' dedi. Nereden başlarsın?", a: "Önce fiziksel katmana bakarım: kablo takılı mı, port ışığı yanıyor mu. Sonra ipconfig ile IP alıp almadığını, gateway'e ve 8.8.8.8'e ping'i, en son DNS'i (ping google.com) kontrol ederim. Böylece sorunun hangi adımda olduğunu daraltırım." },
      { q: "LAN ile WAN farkı nedir?", a: "LAN küçük bir alandaki, genelde bir kuruma ait ağdır. WAN şehirleri ya da ülkeleri bağlayan, genelde operatörden kiralanan geniş ağdır." }
    ],
    vocab: [
      { term: "Network", tr: "ağ", ex: "Our office network is down." },
      { term: "Cable", tr: "kablo", ex: "Check the cable first." },
      { term: "Gateway", tr: "ağ geçidi", ex: "Ping the default gateway." },
      { term: "Bandwidth", tr: "bant genişliği", ex: "We need more bandwidth." },
      { term: "Wired / wireless", tr: "kablolu / kablosuz", ex: "Is it wired or wireless?" },
      { term: "Troubleshoot", tr: "sorun gidermek", ex: "I will troubleshoot the connection." }
    ],
    resources: [
      { title: "Jeremy's IT Lab: Free CCNA 200-301 (YouTube kanalı)", url: "https://www.youtube.com/@JeremysITLab", type: "video", why: "Sıfırdan, anlaşılır, ücretsiz tam CCNA kursu", length: "Çok bölümlü", level: "başlangıç", lang: "EN" },
      { title: "Cisco: CCNA 200-301 sınav konuları (resmî)", url: "https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccna.html", type: "doc", why: "Sınavda hangi konuların çıktığının resmî listesi", level: "başlangıç", lang: "EN" },
      { title: "Cisco Networking Academy (ücretsiz kurslar)", url: "https://www.netacad.com/", type: "kurs", why: "Cisco'nun kendi ücretsiz başlangıç kursları", level: "başlangıç", lang: "EN" }
    ],
    sources: [{ title: "Cisco CCNA 200-301", url: "https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccna.html" }]
  };

  /* 2 ───────────────────────────────────────────── IP adresi ve alt ağ maskesi */
  L[2] = {
    hook: "IP adresi mahalle + kapı numarasıdır: maske hangi kısmın mahalle, hangi kısmın kapı olduğunu söyler.",
    homework: "Bilgisayarının ipconfig çıktısında IPv4 adresini ve alt ağ maskesini yaz. Ağ kısmını ve host kısmını elle ayır. Aynı ağdaki başka bir cihazın IP'sini bulup aynı ağda olduklarını kendin doğrula.",
    warmup: {
      recap: [
        { point: "Router farklı ağları, switch aynı ağdaki cihazları bağlar.", example: "Ofisin internete çıkışı router'dandır." }
      ],
      concepts: [
        { term: "IP adresi", tr: "Cihazın ağdaki adresi", summary: "32 bitlik sayı, 4 parçalı yazılır: 192.168.1.10", example: "Yazıcı: 192.168.1.50" },
        { term: "Alt ağ maskesi", tr: "Ağ ve host kısmını ayıran sayı", summary: "255.255.255.0 demek ilk 24 bit ağ, son 8 bit host.", example: "/24 aynı şeyin kısa yazımıdır." }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Yeni bir yazıcı kurdun ama bazı bilgisayarlar yazdırabiliyor, bazıları yazdıramıyor. Kontrol edince yazıcının IP'si 192.168.2.50, bilgisayarların IP'si 192.168.1.x. Neden? Çünkü farklı ağdalar. Bunu görmek için IP ve maskeyi okumayı bilmen gerek." },
      { t: "h", text: "IPv4 adresi nedir?" },
      { t: "p", text: "IPv4 adresi 32 bitten oluşur. Okumayı kolaylaştırmak için 8'er bitlik 4 parçaya (oktet) bölünür ve her parça 0 ile 255 arasında bir sayı olarak yazılır: 192.168.1.10. Benzetme: adres 'Gül Mahallesi, 10 numara'. Mahalle ağı, kapı numarası cihazı gösterir." },
      { t: "h", text: "Alt ağ maskesi ne işe yarar?" },
      { t: "p", text: "Maske, adresin hangi kısmının ağ, hangi kısmının host (cihaz) olduğunu söyler. 255.255.255.0 maskesinde ilk üç oktet ağdır, son oktet hosttur. Bu /24 olarak da yazılır, çünkü 24 bit '1'dir." },
      { t: "steps", h: "192.168.1.10 / 255.255.255.0 örneği", items: [
        "Ağ kısmı: 192.168.1 (maskenin 255 olan yerleri)",
        "Host kısmı: 10 (maskenin 0 olan yeri)",
        "Ağ adresi: 192.168.1.0 (host kısmı hep 0)",
        "Yayın (broadcast) adresi: 192.168.1.255 (host kısmı hep 255)",
        "Kullanılabilir host adresleri: 192.168.1.1 ile 192.168.1.254"
      ] },
      { t: "h", text: "Aynı ağda mıyız?" },
      { t: "steps", h: "Kontrol yöntemi", items: [
        "İki cihazın IP'sini ve maskesini yaz.",
        "Maskenin 255 olduğu oktetleri karşılaştır.",
        "Hepsi aynıysa aynı ağdasınız, biri farklıysa farklı ağdasınız.",
        "Örnek: 192.168.1.10 ile 192.168.1.25 (maske /24) aynı ağ. 192.168.1.10 ile 192.168.2.10 farklı ağ, aralarında router gerekir."
      ] },
      { t: "h", text: "Özel (private) ve genel (public) adresler" },
      { t: "steps", h: "RFC 1918 özel aralıklar", items: [
        "10.0.0.0 ile 10.255.255.255 (10.0.0.0/8)",
        "172.16.0.0 ile 172.31.255.255 (172.16.0.0/12)",
        "192.168.0.0 ile 192.168.255.255 (192.168.0.0/16)",
        "Bunlar internette yönlendirilmez, her ofis kendi içinde kullanır. İnternete çıkarken NAT ile genel adrese çevrilir."
      ] },
      { t: "box", h: "Özel adresler", text: "127.0.0.1: kendin (loopback). 169.254.x.x: APIPA. DHCP sunucusundan adres alamayan Windows kendine bu adresi verir. Bir bilgisayarda 169.254 görüyorsan DHCP'den adres alamamıştır." },
      { t: "cmd", text: "ipconfig\nipconfig /all\n\n# Cisco cihazda:\nshow ip interface brief" },
      { t: "warn", h: "Tuzak", text: "İlk adres (host kısmı hep 0) ağ adresidir, son adres (host kısmı hep 1) broadcast'tir. İkisi de bir cihaza verilmez. Bu yüzden /24'te 256 değil 254 kullanılabilir adres vardır." }
    ],
    quiz: [
      { q: "192.168.1.10/24 adresinin ağ adresi nedir?", options: ["192.168.1.0", "192.168.1.1", "192.168.0.0", "192.168.1.255"], answer: "192.168.1.0", why: "/24'te son oktet host'tur, ağ adresinde hep 0 olur: 192.168.1.0." },
      { q: "Aşağıdakilerden hangisi özel (private) bir adrestir?", options: ["8.8.8.8", "172.20.5.9", "172.40.1.1", "11.0.0.1"], answer: "172.20.5.9", why: "172.16.0.0 ile 172.31.255.255 arası özeldir. 172.40 bu aralığın dışındadır." },
      { q: "Bir Windows bilgisayarda 169.254.12.7 görüyorsun. Bu ne demektir?", options: ["İnternet çok hızlı", "DHCP'den adres alamadı", "Statik IP verilmiş", "Router bozuk ve internet yok, ama adres normal"], answer: "DHCP'den adres alamadı", why: "169.254.x.x APIPA adresidir. DHCP sunucusuna ulaşılamayınca Windows kendine bu adresi verir." },
      { q: "255.255.255.0 maskesinin kısa yazımı nedir?", options: ["/16", "/24", "/28", "/8"], answer: "/24", why: "255.255.255.0 içinde 24 tane '1' bit vardır, /24 olur." },
      { q: "192.168.1.10/24 ile hangi adres aynı ağdadır?", options: ["192.168.2.10", "192.168.1.200", "10.0.0.10", "192.168.0.10"], answer: "192.168.1.200", why: "İlk üç oktet (192.168.1) aynıysa /24'te aynı ağdasınız." }
    ],
    interview: [
      { q: "Alt ağ maskesi ne işe yarar?", a: "IP adresinin hangi bölümünün ağ, hangi bölümünün host olduğunu belirler. Cihaz, hedefin kendi ağında olup olmadığını maskeye bakarak anlar. Aynı ağdaysa doğrudan gönderir, değilse gateway'e gönderir." },
      { q: "Bir bilgisayar 169.254 ile başlayan IP almış. Ne yaparsın?", a: "DHCP sunucusuna ulaşılamadığını anlarım. Kabloyu ve switch portunu, VLAN'ı, DHCP servisinin çalıştığını ve havuzun dolu olup olmadığını kontrol ederim. Sonra ipconfig /release ve /renew ile yeniden adres isterim." },
      { q: "Özel IP aralıkları nelerdir?", a: "10.0.0.0/8, 172.16.0.0/12 ve 192.168.0.0/16. İnternette yönlendirilmezler, kurumlar iç ağda serbestçe kullanır ve NAT ile internete çıkar." }
    ],
    vocab: [
      { term: "IP address", tr: "IP adresi", ex: "What is your IP address?" },
      { term: "Subnet mask", tr: "alt ağ maskesi", ex: "The subnet mask is 255.255.255.0." },
      { term: "Octet", tr: "8 bitlik parça", ex: "Each octet is a number from 0 to 255." },
      { term: "Broadcast", tr: "yayın", ex: "The broadcast address is the last one." },
      { term: "Host", tr: "ağdaki cihaz", ex: "This subnet supports 254 hosts." },
      { term: "Private address", tr: "özel adres", ex: "192.168.x.x is a private address." }
    ],
    resources: [
      { title: "Jeremy's IT Lab: Free CCNA 200-301 (YouTube kanalı)", url: "https://www.youtube.com/@JeremysITLab", type: "video", why: "IPv4 adreslemeyi baştan anlatır", length: "Çok bölümlü", level: "başlangıç", lang: "EN" },
      { title: "RFC 1918: Özel adres aralıkları", url: "https://www.rfc-editor.org/rfc/rfc1918", type: "doc", why: "Özel IP aralıklarının resmî tanımı", level: "orta", lang: "EN" }
    ],
    sources: [{ title: "RFC 1918", url: "https://www.rfc-editor.org/rfc/rfc1918" }]
  };

  /* 3 ───────────────────────────────────────────── Subnetting */
  L[3] = {
    hook: "Subnetting, büyük bir apartman sitesini bloklara bölmektir: her bloğun kendi numaraları ve kendi kapısı olur.",
    homework: "192.168.10.0/24 ağını 4 eşit alt ağa böl. Her birinin ağ adresini, ilk ve son kullanılabilir host adresini ve broadcast adresini kâğıda yaz.",
    warmup: {
      recap: [
        { point: "/24 maskesi ilk 24 biti ağ, son 8 biti host yapar.", example: "192.168.1.0/24: 254 host" },
        { point: "Ağ adresi ve broadcast adresi cihaza verilmez.", example: "192.168.1.0 ve 192.168.1.255" }
      ],
      concepts: [
        { term: "Block size", tr: "Blok büyüklüğü", summary: "256 eksi maskenin ilgili oktet değeri.", example: "/26 → 256-192 = 64" },
        { term: "Host formülü", tr: "2 üssü h eksi 2", summary: "h, host bit sayısıdır.", example: "6 host biti → 62 host" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Şirkette 4 departman var: muhasebe, satış, IT, misafir. Hepsini aynı büyük ağa koyarsan herkes herkesin trafiğini görür ve güvenlik kuralı yazamazsın. Her departmana ayrı küçük ağ (alt ağ) vermek istiyorsun." },
      { t: "h", text: "Fikir: ağı bloklara böl" },
      { t: "p", text: "Subnetting, bir ağın host bitlerinden 'ödünç alıp' onu daha küçük ağlara bölmektir. Maske uzar (örnek: /24 → /26) ve ağ sayısı artarken her ağdaki host sayısı azalır. Benzetme: tek büyük salonu bölme duvarlarıyla 4 odaya ayırmak." },
      { t: "h", text: "Tablo: en çok kullanılanlar" },
      { t: "steps", h: "Maske, blok ve host sayısı", items: [
        "/24 = 255.255.255.0, blok 256, 254 host",
        "/25 = 255.255.255.128, blok 128, 126 host",
        "/26 = 255.255.255.192, blok 64, 62 host",
        "/27 = 255.255.255.224, blok 32, 30 host",
        "/28 = 255.255.255.240, blok 16, 14 host",
        "/29 = 255.255.255.248, blok 8, 6 host",
        "/30 = 255.255.255.252, blok 4, 2 host (iki router arası bağlantı için ideal)"
      ] },
      { t: "box", h: "Formül", text: "Host sayısı = 2 üzeri h eksi 2. h, host bit sayısıdır. /26'da 32-26 = 6 host biti var: 2^6 = 64, eksi 2 (ağ ve broadcast) = 62 host." },
      { t: "h", text: "Örnek: 192.168.10.0/24 ağını 4 alt ağa böl" },
      { t: "steps", h: "Adım adım", items: [
        "4 alt ağ için 2 bit gerekir (2^2 = 4). Maske /24 + 2 = /26.",
        "/26'nın blok büyüklüğü 64. Son oktette 64'er artarız.",
        "1. alt ağ: 192.168.10.0/26. Hostlar .1 ile .62, broadcast .63",
        "2. alt ağ: 192.168.10.64/26. Hostlar .65 ile .126, broadcast .127",
        "3. alt ağ: 192.168.10.128/26. Hostlar .129 ile .190, broadcast .191",
        "4. alt ağ: 192.168.10.192/26. Hostlar .193 ile .254, broadcast .255"
      ] },
      { t: "h", text: "Hızlı yöntem: bir IP hangi alt ağda?" },
      { t: "steps", h: "192.168.10.77/26 için", items: [
        "Blok büyüklüğü 64. Son oktet 77.",
        "64'ün katlarına bak: 0, 64, 128, 192. 77, 64 ile 127 arasında.",
        "Ağ adresi 192.168.10.64, broadcast 192.168.10.127.",
        "Kullanılabilir aralık 192.168.10.65 ile 192.168.10.126."
      ] },
      { t: "cmd", text: "# Cisco cihazda IP ve maske verme:\nRouter(config)# interface gigabitethernet0/0\nRouter(config-if)# ip address 192.168.10.1 255.255.255.192\nRouter(config-if)# no shutdown" },
      { t: "warn", h: "Tuzak", text: "Alt ağlar çakışmamalı. Biri 192.168.10.0/26, diğeri 192.168.10.32/27 olamaz, çünkü ikincisi birincinin içindedir. Bölerken hep blok sınırlarında ilerle." }
    ],
    quiz: [
      { q: "/27 maskesinde kaç kullanılabilir host adresi vardır?", options: ["32", "30", "62", "14"], answer: "30", why: "/27'de 5 host biti var: 2^5 = 32, eksi 2 = 30." },
      { q: "/26 maskesinin blok büyüklüğü kaçtır?", options: ["32", "64", "128", "192"], answer: "64", why: "256 - 192 = 64. 255.255.255.192 maskesinde blok 64'tür." },
      { q: "192.168.10.77/26 adresinin ağ adresi nedir?", options: ["192.168.10.0", "192.168.10.64", "192.168.10.77", "192.168.10.128"], answer: "192.168.10.64", why: "Bloklar 0, 64, 128, 192. 77 sayısı 64 ile 127 arasında olduğu için ağ adresi .64'tür." },
      { q: "İki router arasındaki noktadan noktaya bağlantı için en uygun maske hangisidir?", options: ["/24", "/28", "/30", "/16"], answer: "/30", why: "/30'da tam 2 kullanılabilir host vardır, iki router ucu için yeter ve adres israfı olmaz." },
      { q: "192.168.10.0/24 ağını 4 eşit alt ağa bölmek için yeni maske ne olmalı?", options: ["/25", "/26", "/27", "/28"], answer: "/26", why: "4 alt ağ 2 bit ister. 24 + 2 = 26." }
    ],
    interview: [
      { q: "Neden subnetting yaparız?", a: "Büyük bir ağı küçük parçalara bölmek için. Böylece broadcast trafiği azalır, güvenlik kuralları departman bazında yazılabilir, IP adresleri israf edilmez ve ağ yönetimi kolaylaşır." },
      { q: "192.168.1.0/26 ağında kaç host olur?", a: "/26'da 6 host biti vardır. 2^6 = 64 adres, ağ ve broadcast çıkınca 62 kullanılabilir host kalır." },
      { q: "Bir IP'nin hangi alt ağa ait olduğunu hızlıca nasıl bulursun?", a: "Maskenin blok büyüklüğünü bulurum (256 eksi ilgili oktet). IP'nin o oktetini blok büyüklüğünün katlarıyla karşılaştırırım. Küçük olan en yakın katı ağ adresidir, bir sonraki katın bir eksiği broadcast'tir." }
    ],
    vocab: [
      { term: "Subnet", tr: "alt ağ", ex: "Each department has its own subnet." },
      { term: "Prefix length", tr: "önek uzunluğu (/24 gibi)", ex: "The prefix length is 26." },
      { term: "Network address", tr: "ağ adresi", ex: "The network address is the first one." },
      { term: "Usable host", tr: "kullanılabilir host", ex: "This subnet has 62 usable hosts." },
      { term: "VLSM", tr: "değişken uzunlukta alt ağ maskesi", ex: "We use VLSM to save addresses." },
      { term: "Overlap", tr: "çakışma", ex: "These two subnets overlap." }
    ],
    resources: [
      { title: "Jeremy's IT Lab: Free CCNA 200-301 (YouTube kanalı)", url: "https://www.youtube.com/@JeremysITLab", type: "video", why: "Subnetting derslerini adım adım çözer", length: "Çok bölümlü", level: "başlangıç", lang: "EN" },
      { title: "Subnetting alıştırma soruları (arama)", query: "subnetting practice online CCNA", type: "alıştırma", why: "Hız kazanmak için çok soru çöz", level: "orta", lang: "EN" }
    ],
    sources: [{ title: "Cisco CCNA 200-301", url: "https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccna.html" }]
  };

  /* 4 ───────────────────────────────────────────── MAC adresi ve Switch */
  L[4] = {
    hook: "Switch, apartman görevlisi gibidir: hangi dairenin zili hangi katta, hangi MAC hangi portta ezbere bilir.",
    homework: "Bilgisayarında 'ipconfig /all' çalıştır ve Physical Address (MAC) satırını bul. Sonra 'arp -a' ile ağındaki diğer cihazların IP-MAC eşleşmesine bak.",
    warmup: {
      recap: [
        { point: "Alt ağ maskesi ağ ve host kısmını ayırır.", example: "/24 → 254 host" },
        { point: "Router farklı ağlar, switch aynı ağ içindir.", example: "Aynı kattaki cihazlar switch'e takılır." }
      ],
      concepts: [
        { term: "MAC adresi", tr: "Ağ kartının fiziksel adresi", summary: "48 bit, hex yazılır: AA:BB:CC:DD:EE:FF. Üretici koyar.", example: "00:1A:2B:3C:4D:5E" },
        { term: "MAC adres tablosu", tr: "Switch'in port-MAC listesi", summary: "Switch gördüğü kaynak MAC'leri porta bağlayarak öğrenir.", example: "show mac address-table" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Bir kullanıcı 'ağ çok yavaş' diyor. Switch'e bakınca tüm trafik sanki herkese gidiyor. Switch'in nasıl karar verdiğini bilmezsen bir portun neden yoğun olduğunu ya da bir cihazın hangi porta bağlı olduğunu bulamazsın." },
      { t: "h", text: "MAC adresi nedir?" },
      { t: "p", text: "MAC adresi, ağ kartına üretici tarafından verilen 48 bitlik fiziksel adrestir. Hex (16'lık sistem) olarak yazılır: AA:BB:CC:DD:EE:FF. İlk 24 bit üreticiyi (OUI), son 24 bit kartı gösterir. IP adresi değişebilir, MAC adresi karta aittir. Benzetme: IP adresi oturduğun ev adresi, MAC adresi kimlik numaran." },
      { t: "h", text: "Switch nasıl çalışır?" },
      { t: "steps", h: "Switch'in 4 işi", items: [
        "Öğrenir (learning): bir porttan gelen çerçevenin kaynak MAC'ini o portla MAC tablosuna yazar.",
        "Karar verir (forwarding): hedef MAC tabloda varsa sadece o porta gönderir.",
        "Taşırır (flooding): hedef MAC tabloda yoksa (unknown unicast) ya da hedef broadcast ise geldiği port hariç tüm portlara yollar.",
        "Eskitir (aging): bir süre görünmeyen MAC kaydını tablodan siler (varsayılan 300 saniye)."
      ] },
      { t: "h", text: "ARP: IP'den MAC'e çeviri" },
      { t: "p", text: "Bilgisayar aynı ağdaki bir IP'ye veri göndermek ister ama çerçeveye MAC yazması gerekir. ARP (Address Resolution Protocol) devreye girer: 'Bu IP kimin?' diye herkese broadcast sorar, sahibi MAC adresiyle cevap verir. Cevap bir süre ARP tablosunda saklanır." },
      { t: "h", text: "Collision ve broadcast domain" },
      { t: "steps", h: "Önemli ayrım", items: [
        "Switch'in her portu ayrı bir collision domain'dir. Çarpışma sorunu yoktur.",
        "Bir switch (VLAN yoksa) tek bir broadcast domain'dir. Bir cihazın broadcast'ini herkes alır.",
        "Router her arayüzünde broadcast'i durdurur. Her router arayüzü ayrı bir broadcast domain'dir."
      ] },
      { t: "cmd", text: "# Windows:\nipconfig /all\narp -a\n\n# Cisco switch:\nshow mac address-table\nshow interfaces status\nshow interfaces fastethernet0/1" },
      { t: "box", h: "Elle dene", text: "1) Windows'ta cmd aç. 2) 'ipconfig /all' yaz, 'Physical Address' satırını bul: bu MAC adresin. 3) 'arp -a' yaz: IP-MAC eşleşmelerini gör. 4) Tüm MAC'leri 'ff-ff-ff-ff-ff-ff' broadcast satırıyla karşılaştır." },
      { t: "warn", h: "Tuzak", text: "Switch IP adresine bakmaz, MAC adresine bakar (katman 2). IP'ye göre yol seçen router'dır (katman 3). Karıştırırsan mülakatta puan kaybedersin." }
    ],
    quiz: [
      { q: "Switch gelen bir çerçevenin hedef MAC adresini tablosunda bulamazsa ne yapar?", options: ["Çerçeveyi atar", "Geldiği port hariç tüm portlara gönderir", "Router'a gönderir", "Sadece ilk porta gönderir"], answer: "Geldiği port hariç tüm portlara gönderir", why: "Bilinmeyen hedefe (unknown unicast) flooding uygulanır. Cevap gelince hedef MAC öğrenilir." },
      { q: "Switch MAC adres tablosunu nasıl doldurur?", options: ["Çerçevelerin kaynak MAC adresinden", "Çerçevelerin hedef IP adresinden", "Yöneticinin elle girmesiyle", "DHCP sunucusundan"], answer: "Çerçevelerin kaynak MAC adresinden", why: "Switch, bir porttan gelen çerçevenin kaynak MAC'ini o portla ilişkilendirerek öğrenir." },
      { q: "ARP ne işe yarar?", options: ["IP adresini MAC adresine çevirir", "Alan adını IP'ye çevirir", "IP adresi dağıtır", "Trafiği şifreler"], answer: "IP adresini MAC adresine çevirir", why: "ARP aynı ağdaki bir IP'nin MAC adresini bulmak için kullanılır. Alan adı çevirisi DNS'in işidir." },
      { q: "Switch'in her portu neyi oluşturur?", options: ["Ayrı bir broadcast domain", "Ayrı bir collision domain", "Ayrı bir VLAN", "Ayrı bir alt ağ"], answer: "Ayrı bir collision domain", why: "Switch portları arasında çarpışma olmaz, her port ayrı collision domain'dir." },
      { q: "Cisco switch'te MAC tablosunu hangi komut gösterir?", options: ["show ip route", "show mac address-table", "show vlan brief", "show running-config"], answer: "show mac address-table", why: "Bu komut hangi MAC'in hangi portta öğrenildiğini listeler." }
    ],
    interview: [
      { q: "Switch nasıl karar verir?", a: "Gelen çerçevenin kaynak MAC adresini porta bağlayıp MAC tablosuna yazar. Hedef MAC tabloda varsa yalnızca o porta, yoksa ya da broadcast ise geldiği port hariç tüm portlara gönderir." },
      { q: "ARP nedir?", a: "Aynı ağdaki bir IP adresinin MAC adresini öğrenmeye yarayan protokoldür. Cihaz 'bu IP kimde?' diye broadcast sorar, sahibi MAC adresiyle yanıtlar ve sonuç ARP tablosunda saklanır." },
      { q: "Broadcast domain ile collision domain farkı nedir?", a: "Collision domain, aynı anda konuşan cihazların çarpışabildiği alandır. Switch portu başına ayrıdır. Broadcast domain, bir broadcast'in ulaştığı alandır. Switch (VLAN yoksa) tek broadcast domain'dir, router her arayüzde ayırır." }
    ],
    vocab: [
      { term: "MAC address", tr: "fiziksel adres", ex: "What is the MAC address of this device?" },
      { term: "Frame", tr: "çerçeve (katman 2 veri birimi)", ex: "The switch forwards the frame." },
      { term: "Flooding", tr: "tüm portlara gönderme", ex: "Unknown traffic causes flooding." },
      { term: "ARP table", tr: "ARP tablosu", ex: "Clear the ARP table and try again." },
      { term: "Port", tr: "switch girişi", ex: "Which port is the printer on?" },
      { term: "Collision domain", tr: "çarpışma alanı", ex: "Each switch port is its own collision domain." }
    ],
    resources: [
      { title: "Jeremy's IT Lab: Free CCNA 200-301 (YouTube kanalı)", url: "https://www.youtube.com/@JeremysITLab", type: "video", why: "Ethernet ve switching derslerini anlatır", length: "Çok bölümlü", level: "başlangıç", lang: "EN" },
      { title: "Cisco: Packet Tracer (ücretsiz simülatör)", url: "https://www.netacad.com/cisco-packet-tracer", type: "araç", why: "Switch'i ve MAC tablosunu bilgisayarda dene", level: "başlangıç", lang: "EN" }
    ],
    sources: [{ title: "Cisco CCNA 200-301", url: "https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccna.html" }]
  };

  /* 5 ───────────────────────────────────────────── VLAN */
  L[5] = {
    hook: "VLAN, tek bir binayı (switch) sanal katlara bölmektir: aynı binada olsanız da farklı katlar birbirini görmez.",
    homework: "Packet Tracer'da bir switch'e 2 bilgisayar ve 2 bilgisayar daha bağla. İlk ikisini VLAN 10'a, diğer ikisini VLAN 20'ye koy. Aynı VLAN'dakiler ping atabilmeli, farklı VLAN'dakiler atamamalı.",
    warmup: {
      recap: [
        { point: "Bir switch (VLAN yoksa) tek broadcast domain'dir.", example: "Herkes herkesin broadcast'ini alır." },
        { point: "Alt ağ, ağı küçük parçalara böler.", example: "192.168.10.0/26 gibi" }
      ],
      concepts: [
        { term: "VLAN", tr: "Sanal LAN", summary: "Bir fiziksel switch'i mantıksal ağlara böler.", example: "VLAN 10 muhasebe, VLAN 20 satış" },
        { term: "Trunk", tr: "Birden çok VLAN taşıyan bağlantı", summary: "Switch'ler arası ya da switch-router arası link.", example: "802.1Q etiketi ile VLAN numarası taşır" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Misafir Wi-Fi'ı bağlayan biri muhasebe yazıcısını görebiliyor, hatta muhasebe sunucusuna ping atabiliyor. Güvenlik açığı. Çözüm: misafirleri, muhasebeyi ve IT'yi ayrı VLAN'lara koymak." },
      { t: "h", text: "VLAN nedir?" },
      { t: "p", text: "VLAN (Virtual LAN), bir fiziksel switch üzerinde mantıksal olarak ayrı ağlar oluşturmaktır. Aynı switch'e bağlı iki cihaz farklı VLAN'daysa birbirinin broadcast'ini görmez ve doğrudan konuşamaz. Benzetme: tek bina, ama her kat ayrı şirket ve katlar arası geçiş için kapıdan (router) geçmek gerekir." },
      { t: "h", text: "Neden VLAN?" },
      { t: "steps", h: "Faydaları", items: [
        "Güvenlik: departmanlar birbirinden ayrılır.",
        "Performans: broadcast domain küçülür, gereksiz trafik azalır.",
        "Esneklik: cihazın fiziksel yeri değişse de VLAN'ı aynı kalır.",
        "Yönetim: ağ mantıksal olarak düzenlenir."
      ] },
      { t: "h", text: "Access port ve trunk port" },
      { t: "steps", h: "İki tür port", items: [
        "Access port: tek VLAN'a ait. Bilgisayar, yazıcı gibi uç cihazlar bunlara takılır.",
        "Trunk port: birden çok VLAN trafiğini taşır. Switch-switch ve switch-router arasında kullanılır.",
        "Trunk'ta çerçeveye 802.1Q etiketi eklenir. Etiket VLAN numarasını taşır.",
        "Native VLAN: trunk'ta etiketsiz giden VLAN. Varsayılan VLAN 1'dir. Güvenlik için kullanılmayan bir VLAN'a değiştirilir."
      ] },
      { t: "h", text: "Cisco switch'te yapılandırma" },
      { t: "cmd", text: "Switch(config)# vlan 10\nSwitch(config-vlan)# name MUHASEBE\nSwitch(config-vlan)# exit\nSwitch(config)# vlan 20\nSwitch(config-vlan)# name SATIS\nSwitch(config-vlan)# exit\n\nSwitch(config)# interface fastethernet0/1\nSwitch(config-if)# switchport mode access\nSwitch(config-if)# switchport access vlan 10\n\nSwitch(config)# interface gigabitethernet0/24\nSwitch(config-if)# switchport mode trunk\n\nSwitch# show vlan brief\nSwitch# show interfaces trunk" },
      { t: "steps", h: "Satır satır ne yaptık?", items: [
        "'vlan 10' ve 'name MUHASEBE': VLAN'ı oluşturur ve isim verir.",
        "'switchport mode access': portu uç cihaz portu yapar.",
        "'switchport access vlan 10': portu VLAN 10'a atar.",
        "'switchport mode trunk': yukarı bağlantı portunu trunk yapar.",
        "'show vlan brief': hangi port hangi VLAN'da gösterir."
      ] },
      { t: "h", text: "VLAN'lar arası iletişim" },
      { t: "p", text: "Farklı VLAN'lar farklı alt ağlardır. Aralarında konuşmak için yönlendirme (router ya da katman 3 switch) gerekir. Klasik yöntem 'router-on-a-stick': router'ın tek fiziksel arayüzü, her VLAN için bir alt arayüze (subinterface) bölünür ve switch'e trunk ile bağlanır." },
      { t: "cmd", text: "Router(config)# interface gigabitethernet0/0.10\nRouter(config-subif)# encapsulation dot1Q 10\nRouter(config-subif)# ip address 192.168.10.1 255.255.255.0\n\nRouter(config)# interface gigabitethernet0/0.20\nRouter(config-subif)# encapsulation dot1Q 20\nRouter(config-subif)# ip address 192.168.20.1 255.255.255.0" },
      { t: "warn", h: "Tuzak", text: "Port yanlış VLAN'dayken 'cihaz IP alıyor ama kimseye ulaşamıyor' sorunu yaşarsın. Önce 'show vlan brief' ile portun hangi VLAN'da olduğuna bak. Bir de trunk'ta VLAN izinli değilse o VLAN'ın trafiği geçmez." }
    ],
    quiz: [
      { q: "VLAN'ların temel amacı nedir?", options: ["Hızı artırmak", "Bir switch'i mantıksal ağlara bölmek", "Şifreleme yapmak", "IP adresi dağıtmak"], answer: "Bir switch'i mantıksal ağlara bölmek", why: "VLAN, fiziksel bir switch üzerinde ayrı broadcast domain'ler oluşturur." },
      { q: "Birden fazla VLAN'ın trafiğini taşıyan switch portu hangisidir?", options: ["Access port", "Trunk port", "Console port", "Loopback"], answer: "Trunk port", why: "Trunk port, 802.1Q etiketiyle birden çok VLAN taşır." },
      { q: "Farklı VLAN'daki iki cihazın konuşabilmesi için ne gerekir?", options: ["Daha uzun kablo", "Yönlendirme yapan bir cihaz (router ya da L3 switch)", "Aynı MAC adresi", "Hub"], answer: "Yönlendirme yapan bir cihaz (router ya da L3 switch)", why: "Her VLAN ayrı bir alt ağdır, aralarında yol bulmak katman 3 işidir." },
      { q: "Portu VLAN 30'a atayan komut hangisidir?", options: ["switchport mode trunk", "switchport access vlan 30", "vlan 30 access", "ip vlan 30"], answer: "switchport access vlan 30", why: "Önce 'switchport mode access', sonra 'switchport access vlan 30' kullanılır." },
      { q: "VLAN ve port eşleşmesini özet gösteren komut hangisidir?", options: ["show vlan brief", "show ip route", "show version", "show clock"], answer: "show vlan brief", why: "Bu komut her VLAN'ın hangi portları içerdiğini listeler." }
    ],
    interview: [
      { q: "VLAN nedir, neden kullanılır?", a: "Bir fiziksel switch üzerinde ayrı mantıksal ağlar oluşturmaktır. Güvenlik (departmanları ayırma), performans (broadcast domain'i küçültme) ve esneklik için kullanılır." },
      { q: "Access port ile trunk port arasındaki fark nedir?", a: "Access port tek bir VLAN'a aittir ve uç cihazlara bağlanır. Trunk port birden çok VLAN'ın trafiğini 802.1Q etiketiyle taşır ve switch-switch ya da switch-router arasında kullanılır." },
      { q: "Farklı VLAN'lar nasıl haberleşir?", a: "Inter-VLAN routing ile. Router-on-a-stick yönteminde router'ın bir fiziksel arayüzü her VLAN için alt arayüzlere bölünür. Alternatif olarak katman 3 switch üzerinde SVI kullanılır." }
    ],
    vocab: [
      { term: "VLAN", tr: "sanal yerel ağ", ex: "The guest network is in VLAN 30." },
      { term: "Trunk", tr: "çok VLAN taşıyan bağlantı", ex: "Configure this port as a trunk." },
      { term: "Access port", tr: "tek VLAN'lı port", ex: "The printer is on an access port." },
      { term: "Tagging", tr: "etiketleme", ex: "802.1Q adds a tag to the frame." },
      { term: "Native VLAN", tr: "etiketsiz VLAN", ex: "Change the native VLAN from 1." },
      { term: "Inter-VLAN routing", tr: "VLAN'lar arası yönlendirme", ex: "We need inter-VLAN routing." }
    ],
    resources: [
      { title: "Jeremy's IT Lab: Free CCNA 200-301 (YouTube kanalı)", url: "https://www.youtube.com/@JeremysITLab", type: "video", why: "VLAN ve trunk konusunu laboratuvarla anlatır", length: "Çok bölümlü", level: "başlangıç", lang: "EN" },
      { title: "Cisco: Packet Tracer (ücretsiz simülatör)", url: "https://www.netacad.com/cisco-packet-tracer", type: "araç", why: "VLAN ödevini bilgisayarında yap", level: "başlangıç", lang: "EN" }
    ],
    sources: [{ title: "Cisco CCNA 200-301", url: "https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccna.html" }]
  };

  /* 6 ───────────────────────────────────────────── Router ve yönlendirme (static route) */
  L[6] = {
    hook: "Router, kavşaktaki trafik polisi ve harita gibidir: paketin hedefine bakıp hangi yola gideceğini routing tablosundan bulur.",
    homework: "Packet Tracer'da 2 router ve her birinin arkasında bir bilgisayar kur. Static route yazıp iki bilgisayarın birbirine ping atmasını sağla. 'show ip route' çıktısındaki C, L ve S satırlarını açıkla.",
    warmup: {
      recap: [
        { point: "VLAN'lar farklı alt ağlardır, aralarında yönlendirme gerekir.", example: "VLAN 10 ve VLAN 20 arası router ister." },
        { point: "Hedef IP aynı ağda değilse paket gateway'e gider.", example: "Default gateway = router" }
      ],
      concepts: [
        { term: "Routing tablosu", tr: "Router'ın yol haritası", summary: "Hangi ağa hangi çıkıştan gidileceğini listeler.", example: "show ip route" },
        { term: "Static route", tr: "Elle yazılan yol", summary: "Yönetici tek tek girer, otomatik değişmez.", example: "ip route 192.168.20.0 255.255.255.0 10.0.0.2" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "İstanbul ofisi ile Ankara ofisi arasında hat var ama iki ofisteki bilgisayarlar birbirine ulaşamıyor. Router'lar diğer ofisin ağını bilmiyor. Router'a yolu göstermek senin işin." },
      { t: "h", text: "Router ne yapar?" },
      { t: "p", text: "Router, gelen pakette hedef IP adresine bakar ve routing tablosunda en uygun yolu bulup paketi o yönde yollar. Router yalnızca bildiği ağlara paket gönderebilir. Bilmiyorsa paketi atar. Benzetme: kavşaktaki tabela. 'Ankara' yazan tabela yoksa araba yolunu bulamaz." },
      { t: "h", text: "Routing tablosu nasıl dolar?" },
      { t: "steps", h: "3 kaynak", items: [
        "Doğrudan bağlı ağlar (Connected, C): router'ın arayüzüne IP verip açtığın an tabloya girer.",
        "Static route (S): yönetici elle yazar. Küçük ağlarda basit ve güvenilir.",
        "Dinamik protokoller (OSPF gibi): router'lar yolları birbirine öğretir. Sonraki konularda."
      ] },
      { t: "h", text: "Hedefe karar verme kuralları" },
      { t: "steps", h: "Router'ın seçim sırası", items: [
        "En uzun prefix kazanır (longest prefix match): 192.168.1.0/24 ile 192.168.1.128/25 varsa hedef .130 ise /25 seçilir.",
        "Aynı prefix için birden fazla kaynak varsa administrative distance (AD) küçük olan kazanır: connected 0, static 1, OSPF 110.",
        "Hiçbiri eşleşmezse default route (0.0.0.0/0) kullanılır. O da yoksa paket düşer."
      ] },
      { t: "h", text: "Komutlar" },
      { t: "cmd", text: "Router(config)# interface gigabitethernet0/0\nRouter(config-if)# ip address 10.0.0.1 255.255.255.252\nRouter(config-if)# no shutdown\n\n# Static route: hedef ağ, maske, bir sonraki router (next hop)\nRouter(config)# ip route 192.168.20.0 255.255.255.0 10.0.0.2\n\n# Default route: bilinmeyen her şey bu yöne gitsin\nRouter(config)# ip route 0.0.0.0 0.0.0.0 203.0.113.1\n\nRouter# show ip route\nRouter# show ip interface brief" },
      { t: "steps", h: "show ip route çıktısını okuma", items: [
        "C: doğrudan bağlı ağ.",
        "L: router arayüzünün kendi IP adresi (/32).",
        "S: static route.",
        "O: OSPF ile öğrenilen yol.",
        "S* ya da 'Gateway of last resort': default route."
      ] },
      { t: "box", h: "Dönüş yolu", text: "Static route'u iki yönlü düşün. A router'ına B ağını gösterdiysen, B router'ına da A ağını göstermelisin. Biri eksikse ping gider ama cevap dönmez." },
      { t: "warn", h: "Tuzak", text: "Arayüz 'no shutdown' ile açılmadıysa ya da IP verilmediyse tabloda C satırı görünmez. Önce 'show ip interface brief' ile arayüzün up/up olup olmadığına bak." }
    ],
    quiz: [
      { q: "Router, hedef ağ için birden çok eşleşme bulursa hangisini seçer?", options: ["En kısa prefix", "En uzun prefix (en spesifik)", "Rastgele", "İlk yazılanı"], answer: "En uzun prefix (en spesifik)", why: "Longest prefix match: hedefe en spesifik uyan yol seçilir." },
      { q: "Routing tablosunda 'S' harfi neyi gösterir?", options: ["Switch", "Static route", "Secure", "Subnet"], answer: "Static route", why: "S, yönetici tarafından elle yazılmış static route'tur." },
      { q: "Bilinmeyen tüm hedefler için kullanılan route hangisidir?", options: ["0.0.0.0/0", "255.255.255.255/32", "127.0.0.0/8", "10.0.0.0/8"], answer: "0.0.0.0/0", why: "Default route, hiçbir daha spesifik yola uymayan tüm trafiği tek bir yöne gönderir." },
      { q: "Static route'un administrative distance değeri varsayılan olarak kaçtır?", options: ["0", "1", "90", "110"], answer: "1", why: "Connected 0, static 1, OSPF 110'dur." },
      { q: "A router'ına B ağını gösterdin ama ping cevap dönmüyor. En olası sebep nedir?", options: ["Kablo fazla uzun", "B router'ında A ağına dönüş yolu yok", "Switch bozuk", "DNS hatası"], answer: "B router'ında A ağına dönüş yolu yok", why: "Yönlendirme iki yönlüdür. Dönüş yolu olmayınca cevap gelmez." }
    ],
    interview: [
      { q: "Router ile switch arasındaki fark nedir?", a: "Switch MAC adresine bakarak aynı ağ içinde çerçeve iletir. Router IP adresine bakarak farklı ağlar arasında paket yönlendirir ve routing tablosu kullanır." },
      { q: "Static route ile dinamik routing farkı nedir?", a: "Static route elle yazılır, kaynak kullanmaz ama ağ değişince elle güncellenmesi gerekir. Dinamik protokoller (OSPF gibi) yolları router'lar arasında otomatik öğretir, büyük ağlarda yönetimi kolaylaştırır." },
      { q: "Default route nedir, ne zaman kullanılır?", a: "0.0.0.0/0 olarak yazılan, başka hiçbir yola uymayan trafiği tek bir yöne gönderen yoldur. Genellikle ofis router'ından internet operatörüne giden çıkış için kullanılır." }
    ],
    vocab: [
      { term: "Routing table", tr: "yönlendirme tablosu", ex: "Check the routing table." },
      { term: "Next hop", tr: "bir sonraki router", ex: "The next hop is 10.0.0.2." },
      { term: "Default route", tr: "varsayılan yol", ex: "Add a default route to the ISP." },
      { term: "Interface", tr: "arayüz", ex: "The interface is down." },
      { term: "Administrative distance", tr: "yönetsel mesafe (güvenilirlik)", ex: "Static routes have an AD of 1." },
      { term: "Packet", tr: "paket", ex: "The packet was dropped." }
    ],
    resources: [
      { title: "Jeremy's IT Lab: Free CCNA 200-301 (YouTube kanalı)", url: "https://www.youtube.com/@JeremysITLab", type: "video", why: "Routing ve static route'u lab ile anlatır", length: "Çok bölümlü", level: "başlangıç", lang: "EN" },
      { title: "Cisco: Packet Tracer (ücretsiz simülatör)", url: "https://www.netacad.com/cisco-packet-tracer", type: "araç", why: "Router ve static route'u ücretsiz dene", level: "başlangıç", lang: "EN" }
    ],
    sources: [{ title: "Cisco CCNA 200-301", url: "https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccna.html" }]
  };
})();

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
        "Hub: eski bir cihazdır, gelen sinyali tüm portlara yayar; yerini büyük ölçüde switch aldı.",
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
      { t: "h", text: "Fiziksel katman: ortam seçimi" },
      { t: "steps", h: "UTP kategorileri (yaklaşık sınırlar)", items: [
        "Cat3: eski, 10 Mbps Ethernet ve telefon hattı. Bugün yeni kurulumda kullanılmaz.",
        "Cat5e: 1 Gbps, 100 metreye kadar. Ev ve küçük ofiste hâlâ yaygın.",
        "Cat6: 1 Gbps için 100 metre; 10GBASE-T ile en çok yaklaşık 55 metre, kurulum kalitesine bağlı (IEEE 802.3an, TIA-568).",
        "Cat6a: 10 Gbps, tam 100 metre. Yeni ofis kablolamasında sık seçilir.",
        "Cat7: korumalı (shielded). Yalnız ISO/IEC 11801 sınıfıdır, TIA tanımaz.",
        "Cat8: 25/40 Gbps, yaklaşık 30 metre. Veri merkezinde sunucu-switch arası kısa bağlantılar için."
      ] },
      { t: "steps", h: "Fiber ve koaksiyel", items: [
        "Tek modlu fiber (SMF): çok ince çekirdek (yaklaşık 9 mikron), lazer ışık kaynağı, kilometrelerce mesafe.",
        "Çok modlu fiber (MMF): daha kalın çekirdek (50 ya da 62,5 mikron), LED ya da VCSEL ışık kaynağı, daha kısa mesafe (bina içi, kampüs).",
        "Fiber konnektörleri: LC, SC, ST. Bakır UTP ucu ise RJ-45'tir.",
        "Koaksiyel: eski Ethernet'te kullanıldı; bugün kablo TV ve kablo internet (DOCSIS) hattında görülür."
      ] },
      { t: "h", text: "T568A, T568B ve düz/çapraz kablo" },
      { t: "steps", h: "RJ-45 uç sırası (1'den 8'e)", items: [
        "T568A: beyaz-yeşil, yeşil, beyaz-turuncu, mavi, beyaz-mavi, turuncu, beyaz-kahve, kahve.",
        "T568B: beyaz-turuncu, turuncu, beyaz-yeşil, mavi, beyaz-mavi, yeşil, beyaz-kahve, kahve.",
        "Düz kablo: iki uçta da aynı standart (ikisi de A ya da ikisi de B).",
        "Çapraz kablo: bir uçta T568A, diğer uçta T568B; gönderme ve alma çiftleri yer değiştirir.",
        "10/100 Mbps Ethernet 1-2 (gönder) ve 3-6 (al) pinlerini kullanır; gigabit dört çiftin hepsini kullanır.",
        "Auto-MDIX: port kablo türünü algılar, yanlış kabloyu kendi düzeltir."
      ] },
      { t: "box", h: "Bandwidth, throughput, goodput", text: "Bandwidth hattın kuramsal kapasitesidir (1 Gbps hat). Throughput belirli bir anda gerçekte ölçülen toplam hızdır; tıkanıklık, gecikme ve ek yük yüzünden bandwidth'ten düşüktür. Goodput ise başlıklar, kontrol trafiği ve yeniden iletimler çıkarıldıktan sonra kalan yararlı uygulama verisinin hızıdır; throughput'tan da düşük olur." },
      { t: "p", text: "Kodlama hakkında kısa not: fiziksel katman bitleri ortama göre sinyale çevirir (bakırda gerilim değişimi, fiberde ışık darbesi, kablosuzda radyo dalgası). Manchester gibi kodlama yöntemleri sinyalin içine saat bilgisi de koyar. Sınavda ayrıntıdan çok 'fiziksel katman bitleri sinyale çevirir' cümlesi önemlidir." },
      { t: "h", text: "Ağ türleri" },
      { t: "steps", h: "Büyüklüğe göre", items: [
        "LAN (Local Area Network): tek bir bina ya da ofis. Senin ofis ağın.",
        "WAN (Wide Area Network): şehirler ve ülkeler arası. Genelde internet operatörünün hattı.",
        "İnternet: dünyadaki binlerce ağın birbirine bağlanmış hali."
      ] },
      { t: "h", text: "Ağ türleri: kapsama göre ayrıntı" },
      { t: "steps", h: "Küçükten büyüğe (mesafeler yaklaşık, kesin standart değildir)", items: [
        "PAN (kişisel ağ): kişinin çevresinde birkaç metre. Telefon-kulaklık Bluetooth bağlantısı, NFC, USB kablo.",
        "LAN: tek bina ya da ofis. Teknoloji: Ethernet (IEEE 802.3) ve Wi-Fi (IEEE 802.11). Kurumun kendi sahip olduğu ağdır.",
        "CAN (kampüs ağı): aynı kuruma ait birkaç binayı bağlar. Üniversite ya da fabrika kampüsü; binalar arası genelde fiber.",
        "MAN (şehir ağı): bir şehri ya da bölgesini kapsar. Belediye ya da operatörün şehir içi fiber halkaları.",
        "WAN: şehirler ve ülkeler arası. Çoğunlukla operatörden kiralanır: MPLS, VPN, uydu, 4G/5G, fiber hat."
      ] },
      { t: "box", h: "WAN topolojileri: göreli kıyas", text: "Point-to-point: iki konum arası tek hat; basit ve düşük gecikmeli, ama yeni konum eklemek yeni hat demek. Hub-and-spoke: şubeler merkeze bağlanır; ucuz ve ölçeklenir, merkez arızalanırsa şubeler birbirinden kopar. Full mesh: herkes herkese bağlı; n×(n−1)/2 hat, çok dayanıklı ama en pahalı. Partial mesh: yalnız önemli noktalar birbirine bağlı; maliyet ile dayanıklılık arasında denge. Dual-homed: bir konum iki ayrı hatla (çoğu zaman iki ayrı sağlayıcı ya da iki ayrı yönlendiriciyle) bağlanır; bir hat gidince diğeri devralır, kritik uygulamalar için. Bunlar göreli kıyastır; gerçek maliyet ve gecikme sağlayıcıya göre değişir." },
      { t: "steps", h: "Standartları kim koyar?", items: [
        "IEEE: LAN/MAN standartları (802.3 Ethernet, 802.11 Wi-Fi).",
        "ISO: uluslararası standartlar, OSI başvuru modeli.",
        "ITU-T: telekomünikasyon standartları (operatör ve ses/veri iletim hatları).",
        "ANSI: ABD ulusal standart kuruluşu. Kablolama için TIA/EIA-568 gibi standartlar da bu ailede anılır.",
        "IETF: internet protokollerinin RFC belgelerini yayımlar (IP, TCP, DNS)."
      ] },
      { t: "h", text: "Elle dene: bağlantıyı 4 adımda kontrol et" },
      { t: "steps", h: "Windows'ta", items: [
        "Başlat'a tıkla, 'cmd' yaz ve Enter'a bas. Siyah bir pencere açılır.",
        "'ipconfig' yaz ve Enter'a bas. 'IPv4 Address' ve 'Default Gateway' satırlarını bul.",
        "'ping 127.0.0.1' yaz. Cevap geliyorsa bilgisayarının kendi ağ yazılımı çalışıyor demektir.",
        "'ping' ve ardından Default Gateway adresini yaz. Cevap geliyorsa router'a ulaşıyorsun. Sonra 'ping 8.8.8.8' ile internete bak."
      ] },
      { t: "cmd", lang: "cmd", calistirma: "atla Windows komut satırı (Linux/macOS komutlarıyla karışık olabilir); bu ortamda çalıştırılmaz", text: "ipconfig\nping 127.0.0.1\nping 192.168.1.1\nping 8.8.8.8" },
      { t: "box", h: "Sorun giderme sırası", text: "Kablo ve ışıklar, sonra bilgisayarın IP'si (ipconfig), sonra ping 127.0.0.1, sonra gateway'e ping, sonra internete ping, en son DNS (ör. ping google.com). Hangi adımda takıldıysan sorun oradadır. Bu sırayı ezberle; mülakatta da iş yerinde de işe yarar." },
      { t: "warn", h: "Tuzak", text: "Modem ile router aynı şey değildir. Evdeki cihaz çoğu zaman ikisini birden yapar, o yüzden karışır. Ayrıca switch aynı ağdaki cihazları bağlar, ağlar arası yolu router bulur." }
    ],
    objectives: [
      { id: "h1", text: "Switch, router, access point ve uç cihazın işini ayırt edip bir senaryoda hangisine ihtiyaç olduğunu seçebilirsin." },
      { id: "h2", text: "LAN ile WAN farkını ve bakır UTP kablonun mesafe sınırını söyleyebilirsin." },
      { id: "h3", text: "ipconfig ve ping ile bağlantıyı sırayla (kendin, IP, gateway, internet) kontrol edip sorunun hangi adımda olduğunu bulabilirsin." },
      { id: "h4", text: "Ağ türünü, WAN topolojisini, kablo/fiber ortamını (mesafe ve hıza göre) ve T568 düz/çapraz ayrımını bir senaryoda seçebilir, bandwidth, throughput ve goodput farkını açıklayabilirsin." }
    ],
    summary: [
      "Switch aynı ağdaki cihazları, router farklı ağları bağlar; access point kablosuz cihazları ağa katar.",
      "LAN tek bina ya da ofis, WAN şehirler arası ağdır; bakır UTP en çok 100 metre gider, daha uzağı için fiber gerekir.",
      "Bağlantı sorununu sırayla ara: kablo ve ışıklar, IP (ipconfig), gateway'e ping, sonra internete ping.",
      "ping 127.0.0.1 yalnız bilgisayarının kendi ağ yazılımını sınar.",
      "Ağ türleri kapsamla ayrılır (PAN, LAN, CAN, MAN, WAN). Cat6a 10 Gbps'i 100 metrede taşır, kilometrelik mesafede tek modlu fiber gerekir; aynı T568 iki uçta düz, farklı çapraz kablodur. Goodput, throughput ve bandwidth'ten düşüktür."
    ],
    quiz: [
      { id: "f168ff6a", q: "Farklı iki ağı birbirine bağlayan cihaz hangisidir?", options: ["Switch", "Router", "Yazıcı", "Access point"], obj: "h1" },
      { id: "76513e08", q: "Bakır UTP kablonun standart en uzun mesafesi nedir?", options: ["10 metre", "100 metre", "1 kilometre", "10 kilometre"], obj: "h2" },
      { id: "73f45c3e", q: "Tek bir ofis binasındaki ağ hangi türdür?", options: ["WAN", "LAN", "İnternet", "VPN"], obj: "h2" },
      { id: "83e3546d", q: "Wi-Fi ile bağlanmak için ağa hangi cihaz eklenir?", options: ["Access point", "Hub ile kablolu bir yayın cihazı", "Fiber kablo", "Firewall, kurallara göre trafik süzen cihaz"], obj: "h1" },
      { id: "78ec9d2f", q: "'ping 127.0.0.1' neyi test eder?", options: ["İnterneti", "Router'ı", "Bilgisayarın kendi ağ yazılımını", "DNS sunucusunu"], obj: "h3" },
      { id: "4c41fe3f", q: "ipconfig'te IPv4 adresin görünüyor ve ping 127.0.0.1 cevap veriyor, ama Default Gateway'e ping cevapsız. Sorunu önce nerede ararsın?", options: ["Bilgisayarın kendi ağ yazılımında", "Hedef web sitesinin sunucusunda", "Bilgisayarla gateway arasındaki bağlantıda (kablo, switch portu, router)", "DNS çözümlemesinde"], obj: "h3" },
      { id: "f0041d11", q: "Merkez ofis ile 20 küçük şubeyi, şubeler arası trafik az olacak biçimde en düşük hat maliyetiyle bağlamak istiyorsun. Hangi WAN topolojisi uygun?", options: ["Hub-and-spoke", "Full mesh", "Her şube için ayrı bir point-to-point hat", "Dual-homed (her şubede iki sağlayıcı)"], obj: "h4" },
      { id: "940075fb", q: "İki bina arası 2 kilometre ve fiber çekilecek. Hangi ortam uygun?", options: ["Tek modlu fiber (SMF)", "Cat6a UTP", "Cat8 UTP", "Çok modlu fiber (MMF)"], obj: "h4" },
      { id: "eff4e3d2", q: "Bir kablonun bir ucu T568A, diğer ucu T568B ile sonlandırıldı. Bu kablo hangisidir?", options: ["Çapraz (crossover)", "Düz (straight-through)", "Fiber patch kablosu", "Koaksiyel kablo"], obj: "h4" },
      { id: "6606ce57", q: "1 Gbps bir hatta başlıklar, kontrol trafiği ve yeniden iletimler çıkarıldıktan sonra yalnız yararlı kullanıcı verisinin hızı ölçülüyor. Bu değerin adı nedir?", options: ["Goodput", "Bandwidth", "Gecikme (latency)", "Jitter"], obj: "h4" }
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
        "Bu yöntem /8, /16, /24 gibi oktet sınırındaki maskelerde geçerlidir; /26 gibi maskeler sonraki derste.",
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
      { t: "cmd", lang: "ios", calistirma: "atla Cisco IOS komutları; cihaz ya da Packet Tracer gerekir", text: "ipconfig\nipconfig /all\n\n# Cisco cihazda:\nshow ip interface brief" },
      { t: "warn", h: "Tuzak", text: "İlk adres (host kısmı hep 0) ağ adresidir, son adres (host kısmı hep 1) broadcast'tir. İkisi de bir cihaza verilmez. Bu yüzden /24'te 256 değil 254 kullanılabilir adres vardır." }
    ],
    objectives: [
      { id: "h1", text: "Bir IPv4 adresi ve maskeden ağ adresini, broadcast adresini ve kullanılabilir host aralığını bulabilirsin." },
      { id: "h2", text: "İki cihazın aynı ağda olup olmadığını maskeye bakarak söyleyebilirsin." },
      { id: "h3", text: "Özel adres aralıklarını sayabilir ve 169.254.x.x adresinin ne anlama geldiğini açıklayabilirsin." },
      { id: "h4", text: "Noktalı alt ağ maskesini /24 gibi kısa yazıma çevirebilirsin." }
    ],
    summary: [
      "IPv4 adresi 32 bittir ve 8'er bitlik 4 oktete bölünür; maske hangi kısmın ağ, hangisinin host olduğunu söyler.",
      "/24'te ilk üç oktet ağdır; host kısmı tamamen 0 olan adres ağ adresi, tamamen 1 olan broadcast'tir ve ikisi de cihaza verilmez.",
      "Oktet sınırlı maskelerde (/8, /16, /24) iki cihaz maskenin 255 olduğu oktetlerde aynıysa aynı ağdadır; /26 gibi maskelerde blok sınırına bakmak gerekir (sonraki ders).",
      "Özel aralıklar 10.0.0.0/8, 172.16.0.0/12 ve 192.168.0.0/16'dır; 169.254.x.x DHCP'den adres alınamadığını gösterir."
    ],
    quiz: [
      { id: "4dcc6f49", q: "192.168.1.10/24 adresinin ağ adresi nedir?", options: ["192.168.1.0", "192.168.1.1", "192.168.0.0", "192.168.1.255"], obj: "h1" },
      { id: "8a5c5a47", q: "Aşağıdakilerden hangisi özel (private) bir adrestir?", options: ["8.8.8.8", "172.20.5.9", "172.40.1.1", "11.0.0.1"], obj: "h3" },
      { id: "a0de24ec", q: "Bir Windows bilgisayarda 169.254.12.7 görüyorsun. Bu ne demektir?", options: ["Adres genel (public) bir internet adresi", "DHCP'den adres alamadı", "Statik IP verilmiş", "DHCP'den adres normal alınmış, sorun başka yerde"], obj: "h3" },
      { id: "2736eddc", q: "255.255.255.0 maskesinin kısa yazımı nedir?", options: ["/16", "/24", "/28", "/8"], obj: "h4" },
      { id: "4ec8f367", q: "192.168.1.0/24 ağında kullanılabilir host adresi aralığı hangisidir?", options: ["192.168.1.0 – 192.168.1.255", "192.168.1.0 – 192.168.1.254", "192.168.1.1 – 192.168.1.254", "192.168.1.1 – 192.168.1.255"], obj: "h1" },
      { id: "c072b9ac", q: "192.168.5.130/24 adresinin bulunduğu ağın broadcast adresi nedir?", options: ["192.168.5.0", "192.168.5.130", "192.168.5.254", "192.168.5.255"], obj: "h1" },
      { id: "6e319b06", q: "192.168.1.10/24 ile hangi adres aynı ağdadır?", options: ["192.168.2.10, /24 maskeyle", "192.168.1.200", "10.0.0.10", "192.168.0.10, aynı /24 maskeyle"], obj: "h2" }
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
      { t: "cmd", lang: "ios", calistirma: "atla Cisco IOS komutları; cihaz ya da Packet Tracer gerekir", text: "# Cisco cihazda IP ve maske verme:\nRouter(config)# interface gigabitethernet0/0\nRouter(config-if)# ip address 192.168.10.1 255.255.255.192\nRouter(config-if)# no shutdown" },
      { t: "warn", h: "Tuzak", text: "Alt ağlar çakışmamalı. Biri 192.168.10.0/26, diğeri 192.168.10.32/27 olamaz, çünkü ikincisi birincinin içindedir. Bölerken hep blok sınırlarında ilerle." }
    ],
    objectives: [
      { id: "h1", text: "Bir maskeden blok büyüklüğünü ve kullanılabilir host sayısını (2^h − 2) hesaplayabilirsin." },
      { id: "h2", text: "Bir IP adresinin hangi alt ağda olduğunu blok sınırlarına bakarak bulabilirsin." },
      { id: "h3", text: "İhtiyaca göre maske seçebilirsin: ağı eşit alt ağlara bölmek için ya da iki router arası bağlantı için." }
    ],
    summary: [
      "Subnetting host bitlerinden ödünç alır: maske uzar, ağ sayısı artar, her ağdaki host sayısı azalır.",
      "Kullanılabilir host sayısı = 2^h − 2 (h: host biti); /26 → 62, /27 → 30, /30 → 2.",
      "Blok büyüklüğü 256 eksi maskenin son oktetidir (/26 → 64); bir IP'nin alt ağı blok katlarına bakılarak bulunur.",
      "4 alt ağ için 2 bit gerekir (/24 → /26); iki router arası bağlantıda /30 yeter.",
      "Alt ağlar çakışmamalı; bölerken hep blok sınırlarında ilerle."
    ],
    quiz: [
      { id: "79f47ecb", q: "/27 maskesinde kaç kullanılabilir host adresi vardır?", options: ["32", "30", "62", "14"], obj: "h1" },
      { id: "160a8ba2", q: "/26 maskesinin blok büyüklüğü kaçtır?", options: ["32", "64", "128", "192"], obj: "h1" },
      { id: "9f813436", q: "192.168.10.77/26 adresinin ağ adresi nedir?", options: ["192.168.10.0", "192.168.10.64", "192.168.10.77", "192.168.10.128"], obj: "h2" },
      { id: "f86c5722", q: "İki router arasındaki noktadan noktaya bağlantı için en uygun maske hangisidir?", options: ["/24", "/28", "/30", "/16"], obj: "h3" },
      { id: "7f2fdcb6", q: "192.168.10.0/24 ağını 4 eşit alt ağa bölmek için yeni maske ne olmalı?", options: ["/25", "/26", "/27", "/28"], obj: "h3" },
      { id: "6ddb1693", q: "10.20.77.9/21 adresinin bulunduğu alt ağda kullanılabilir host aralığı hangisidir?", options: ["10.20.64.1 - 10.20.71.254", "10.20.72.1 - 10.20.79.254", "10.20.77.1 - 10.20.77.254", "10.20.72.0 - 10.20.79.255"], obj: "h2" },
      { id: "d1c36c14", q: "192.168.5.0/24 Class C ağı /28 maskesiyle bölünürse kaç alt ağ ve alt ağ başına kaç kullanılabilir host elde edilir?", options: ["8 alt ağ, 30 host", "16 alt ağ, 16 host", "16 alt ağ, 14 host", "14 alt ağ, 16 host"], obj: "h1" },
      { id: "eefea2ca", q: "172.30.100.200/20 adresinin bulunduğu alt ağın broadcast adresi nedir?", options: ["172.30.100.255", "172.30.96.255", "172.30.127.255", "172.30.111.255"], obj: "h2" }
    ],
    interview: [
      { q: "Neden subnetting yaparız?", a: "Büyük bir ağı küçük parçalara bölmek için. Böylece broadcast trafiği azalır, güvenlik kuralları departman bazında yazılabilir, IP adresleri israf edilmez ve ağ yönetimi kolaylaşır." },
      { q: "192.168.1.0/26 ağında kaç host olur?", a: "/26'da 6 host biti vardır. 2^6 = 64 adres, ağ ve broadcast çıkınca 62 kullanılabilir host kalır." },
      { q: "Bir IP'nin hangi alt ağa ait olduğunu hızlıca nasıl bulursun?", a: "Maskenin blok büyüklüğünü bulurum (256 eksi ilgili oktet). IP'nin o oktetini blok büyüklüğünün katlarıyla karşılaştırırım. Küçük ya da eşit olan en yakın katı ağ adresidir, bir sonraki katın bir eksiği broadcast'tir." }
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
        "Yayar (flooding): hedef MAC tabloda yoksa (unknown unicast) ya da hedef broadcast ise geldiği port hariç tüm portlara yollar.",
        "Siler (aging): bir süre görünmeyen MAC kaydını tablodan siler (varsayılan 300 saniye)."
      ] },
      { t: "h", text: "ARP: IP'den MAC'e çeviri" },
      { t: "p", text: "Bilgisayar aynı ağdaki bir IP'ye veri göndermek ister ama çerçeveye MAC yazması gerekir. ARP (Address Resolution Protocol) devreye girer: 'Bu IP kimin?' diye herkese broadcast sorar, sahibi MAC adresiyle cevap verir. Cevap bir süre ARP tablosunda saklanır." },
      { t: "h", text: "Collision ve broadcast domain" },
      { t: "steps", h: "Önemli ayrım", items: [
        "Switch'in her portu ayrı bir collision domain'dir. Çarpışma sorunu yoktur.",
        "Bir switch (VLAN yoksa) tek bir broadcast domain'dir. Bir cihazın broadcast'ini herkes alır.",
        "Router her arayüzünde broadcast'i durdurur. Her router arayüzü ayrı bir broadcast domain'dir."
      ] },
      { t: "cmd", lang: "ios", calistirma: "atla Cisco IOS komutları; cihaz ya da Packet Tracer gerekir", text: "# Windows:\nipconfig /all\narp -a\n\n# Cisco switch:\nshow mac address-table\nshow interfaces status\nshow interfaces fastethernet0/1" },
      { t: "box", h: "Elle dene", text: "1) Windows'ta cmd aç. 2) 'ipconfig /all' yaz, 'Physical Address' satırını bul: bu MAC adresin. 3) 'arp -a' yaz: IP-MAC eşleşmelerini gör. 4) Çıktıda 'ff-ff-ff-ff-ff-ff' görürsen bu broadcast MAC'idir; ARP sorusu bu adrese gider." },
      { t: "h", text: "Çerçeve alanları ve MAC tablosu (Faz 20 eki)" },
      {
        t: "steps",
        h: "Ethernet çerçevesi alanları",
        items: [
          "Ön söz (preamble) ve başlangıç ayırıcısı: alıcının saatini eşler; genellikle çerçeve uzunluğuna sayılmaz.",
          "Hedef MAC (6 bayt) ve kaynak MAC (6 bayt): çerçevenin kime gittiği ve kimden geldiği. Hedef alanı önce okunur, switch karar verirken buna bakar.",
          "Tür/uzunluk (2 bayt): içindeki yükün IPv4 mü IPv6 mı olduğunu gösterir.",
          "Veri (46-1500 bayt): üst katman paketi; 46 bayttan kısaysa doldurulur. Tavan 1500 bayt MTU olarak bilinir.",
          "FCS (4 bayt): çerçeve sonunda hata denetim değeri; alıcı kendi hesapladığıyla karşılaştırır, uyuşmazsa çerçeveyi atar.",
          "Toplam çerçeve boyutu (ön söz hariç) 64 ile 1518 bayt arasındadır (VLAN etiketiyle 1522). 64 bayttan kısa parçalara 'runt' denir."
        ]
      },
      {
        t: "steps",
        h: "MAC tablosu öğrenme ve yayın",
        items: [
          "Öğrenme: switch yalnız kaynak MAC'e bakarak tabloyu doldurur (MAC → giriş portu).",
          "İletme: hedef MAC tabloda varsa yalnız o porta gider (bilinen unicast).",
          "Yayın (flooding): hedef tabloda yoksa (bilinmeyen unicast), yayın (FF:FF:FF:FF:FF:FF) ya da çoklu yayın ise çerçeve geldiği port hariç tüm portlara gider.",
          "Kaynak MAC'i yayın adresi olamaz; switch hiçbir zaman yayın adresini 'öğrenmez'.",
          "Kayıt süresi dolarsa (varsayılan 300 s) silinir; bir cihaz porta taşınırsa yeni portta görüldüğünde kayıt güncellenir."
        ]
      },
      { t: "h", text: "Hub, switch, router: domain tablosu (Faz 42c)" },
      { t: "steps", h: "Aynı soru, üç cihaz (VLAN yok varsayımıyla)", items: [
        "Hub (katman 1): tüm portlar TEK collision domain ve TEK broadcast domain. Gelen sinyali herkese tekrarlar.",
        "Switch (katman 2): HER PORT ayrı collision domain; broadcast domain tek (VLAN'sız).",
        "Router (katman 3): her arayüz ayrı collision domain VE ayrı broadcast domain.",
        "Örnek: 4 portlu hub 1 collision domain verir; 4 portlu switch 4 verir."
      ] },
      { t: "steps", h: "Duplex ve çarpışma", items: [
        "Yarı çift yön (half duplex): aynı anda ya gönderir ya alır. Hub gibi paylaşılan ortamda CSMA/CD kullanılır: dinle, boşsa gönder, çarpışma olursa jam sinyali yay, rastgele süre bekle, yeniden dene.",
        "Tam çift yön (full duplex): gönderme ve alma ayrı çiftlerde aynı anda olur. Çarpışma olmaz, CSMA/CD kapanır. Switch portu ile bilgisayar arasında normal durum budur.",
        "Duplex uyuşmazlığı: bir uç tam, diğer uç yarı çift yöndeyse late collision ve CRC hataları artar, bağlantı yavaşlar.",
        "Wi-Fi'da CSMA/CA kullanılır: çarpışma tespit edilemediği için önlemeye çalışılır (önce dinle, rastgele bekle, onay iste)."
      ] },
      { t: "steps", h: "Switch çerçeveyi ne zaman iletir?", items: [
        "Store-and-forward: çerçevenin tamamını alır, FCS'yi denetler, hatalıysa atar, sonra iletir. Daha güvenli, biraz daha gecikmeli.",
        "Cut-through: hedef MAC okunur okunmaz iletmeye başlar. Gecikme düşük ama hatalı çerçeve de iletilebilir.",
        "Fragment-free: ilk 64 baytı bekler (çarpışma parçalarını eler), sonra iletir. Bugün çoğu Cisco switch store-and-forward çalışır."
      ] },
      { t: "cmd", lang: "ios", calistirma: "atla Cisco IOS komutları; cihaz ya da Packet Tracer gerekir", text: "Switch# show mac address-table\n          Mac Address Table\n-------------------------------------------\nVlan    Mac Address       Type        Ports\n----    -----------       --------    -----\n   1    0001.4299.1a01    DYNAMIC     Fa0/1\n   1    0001.4299.1a02    DYNAMIC     Fa0/2\n\n! Type DYNAMIC: öğrenilmiş (aging ile silinir). STATIC: elle yazılmış.\n! Hedef MAC bu listede yoksa switch çerçeveyi gelen port hariç tüm portlara yayar." },
      { t: "h", text: "IOS CLI temelleri (Faz 42d)" },
      { t: "steps", h: "Modlar ve yardım", items: [
        "Kullanıcı EXEC modu: istem 'Switch>'. Sınırlı izleme komutları.",
        "Ayrıcalıklı EXEC: 'enable' ile girilir, istem 'Switch#'. Tüm show komutları ve 'configure terminal' buradan.",
        "Global yapılandırma: 'Switch(config)#'. Alt modlar: 'Switch(config-if)#' (arayüz), 'Switch(config-line)#' (hat). 'exit' bir üst moda, 'end' ya da Ctrl+Z doğrudan # moduna döner.",
        "'?' o noktada yazılabilecek komutları listeler (örn. 'show ?'); 'sh ru' gibi kısaltmalar çalışır, Tab tamamlar. 'Incomplete command' eksik parametre, 'Invalid input' yanlış yazım demektir.",
        "hostname kuralı: harfle başlar, boşluk içermez, harf ya da rakamla biter, en çok 63 karakter.",
        "'no ip domain-lookup': yanlış yazılan komutu alan adı sanıp DNS'e sormasın diye kapatılır; yoksa terminal dakikalarca bekler."
      ] },
      { t: "steps", h: "Arayüz ve yönetim IP'si", items: [
        "Router arayüzü varsayılan KAPALIDIR: 'no shutdown' gerekir. Switch portları genelde açıktır.",
        "'show ip interface brief': her arayüzün IP'sini, Status (katman 1) ve Protocol (katman 2) durumunu tek tabloda verir. up/up çalışıyor, administratively down 'no shutdown' unutulmuş demektir.",
        "Switch'in yönetim IP'si SVI'ya verilir: 'interface vlan 1', 'ip address ...', 'no shutdown'. Başka ağdan erişim için 'ip default-gateway <router>' yazılır.",
        "Switch'te port 2. katmandadır, IP almaz; IP VLAN arayüzüne (SVI) verilir."
      ] },
      { t: "steps", h: "Dört bellek ve kayıt", items: [
        "ROM: açılış (bootstrap) kodu, POST. RAM: çalışan yapılandırma (running-config), geçici; kapanınca silinir.",
        "NVRAM: startup-config, kalıcı. Flash: IOS imajı, kalıcı.",
        "Kaydetmek için 'copy running-config startup-config' (kısa: 'write memory' ya da 'wr'). Kaydetmeden yeniden başlatırsan değişiklik gider.",
        "'show version' IOS sürümünü, çalışma süresini ve bellek boyutlarını; 'show flash:' imaj dosyalarını gösterir.",
        "Yedek: 'copy running-config tftp:'. TFTP UDP 69 kullanır ve şifresizdir; yalnız güvenilir iç ağda kullan."
      ] },
      { t: "cmd", lang: "ios", calistirma: "atla Cisco IOS komutları; cihaz ya da Packet Tracer gerekir", text: "Switch(config)# line console 0\nSwitch(config-line)# password <guclu-sifre>\nSwitch(config-line)# login\nSwitch(config-line)# exec-timeout 5 0\nSwitch(config-line)# exit\nSwitch(config)# enable secret <guclu-sifre>\nSwitch(config)# service password-encryption\nSwitch(config)# banner motd #Yetkisiz erisim yasaktir#\n\n! SSH kurulum SIRASI:\nSwitch(config)# hostname S1\nS1(config)# ip domain-name sirket.local\nS1(config)# crypto key generate rsa modulus 2048\nS1(config)# username yonetici secret <guclu-sifre>\nS1(config)# line vty 0 15\nS1(config-line)# transport input ssh\nS1(config-line)# login local\n\n! Bağlanma (istemciden):\nssh -l yonetici 192.168.1.2" },
      { t: "box", h: "enable secret ve service password-encryption", text: "'enable secret' parolayı güçlü bir özetle (hash) saklar, 'enable password' açık metin tutar; ikisi de varsa secret geçerlidir. 'service password-encryption' yalnız düz metin parolaları zayıf (tip 7) bir kodlamayla gizler, gerçek koruma değildir. SSH için hostname ve ip domain-name olmadan RSA anahtarı üretilemez; bu yüzden sıra önemlidir. <guclu-sifre> yerine kendi parolanı yaz, gerçek parolayı paylaşma." },
      { t: "warn", h: "Tuzak", text: "Switch IP adresine bakmaz, MAC adresine bakar (katman 2). IP'ye göre yol seçen router'dır (katman 3). Karıştırırsan mülakatta puan kaybedersin." }
    ],
    objectives: [
      { id: "h1", text: "Switch'in MAC tablosunu nasıl öğrendiğini, yayın davranışını ve Ethernet çerçevesinin alanlarını (hedef/kaynak MAC, tür, veri, FCS) açıklayabilir; hedef MAC tabloda varken ya da yokken çerçeveyi ne yaptığını söyleyebilirsin." },
      { id: "h2", text: "ARP'nin ne işe yaradığını söyleyip IP adresi ile MAC adresi arasındaki farkı ayırt edebilirsin." },
      { id: "h3", text: "Switch portu ve router arayüzü için collision domain ile broadcast domain sayısını ayırt edebilirsin." },
      { id: "h4", text: "Switch'te MAC tablosunu gösteren komutu (show mac address-table) bulabilirsin." }
    ],
    summary: [
      "MAC adresi ağ kartına üretici tarafından verilen 48 bitlik fiziksel adrestir; switch IP'ye değil MAC'e bakar (katman 2).",
      "Switch kaynak MAC'i porta bağlayarak öğrenir; hedef tabloda varsa yalnız o porta, yoksa ya da broadcast ise geldiği port hariç tüm portlara gönderir.",
      "ARP, aynı ağdaki bir IP'nin MAC adresini broadcast soruyla bulur ve sonucu ARP tablosunda saklar.",
      "Switch'in her portu ayrı collision domain'dir; switch (VLAN yoksa) tek broadcast domain'dir, router her arayüzde broadcast'i durdurur.",
      "Ethernet çerçevesi hedef/kaynak MAC, tür, veri (46-1500 bayt) ve sonda FCS taşır (64-1518 bayt); switch yalnız kaynak MAC'i öğrenir, bilinmeyen hedef ve yayın çerçevelerini geldiği port hariç tüm portlara yayar."
    ],
    quiz: [
      { id: "30363d0b", q: "Switch gelen bir çerçevenin hedef MAC adresini tablosunda bulamazsa ne yapar?", options: ["Çerçeveyi atar", "Geldiği port hariç tüm portlara gönderir", "Router'a gönderir", "Sadece ilk porta gönderir"], obj: "h1" },
      { id: "b4ae5d5b", q: "Switch MAC adres tablosunu varsayılan olarak nasıl doldurur?", options: ["Çerçevelerin kaynak MAC adresinden", "Çerçevelerin hedef IP adresinden", "Yalnızca yöneticinin elle girdiği kayıtlarla", "DHCP sunucusundan"], obj: "h1" },
      { id: "05087b83", q: "ARP ne işe yarar?", options: ["IP adresini MAC adresine çevirir", "Alan adını IP'ye çevirir", "IP adresi dağıtır", "Trafiği şifreler"], obj: "h2" },
      { id: "3876cbb6", q: "Switch'in her portu neyi oluşturur?", options: ["Ayrı bir broadcast domain", "Ayrı bir collision domain", "Ayrı bir VLAN", "Ayrı bir alt ağ"], obj: "h3" },
      { id: "b1f21db2", q: "VLAN tanımlanmamış tek bir switch'in 8 portunun hepsi kullanılıyor. Kaç collision domain ve kaç broadcast domain vardır?", options: ["1 collision, 8 broadcast", "8 collision, 8 broadcast", "1 collision, 1 broadcast", "8 collision, 1 broadcast"], obj: "h3" },
      { id: "86f37e99", q: "Bir router'ın iki arayüzüne birer switch bağlı ve hiçbirinde VLAN yok. Toplam kaç broadcast domain vardır?", options: ["1", "2", "3", "4"], obj: "h3" },
      { id: "c3266e63", q: "Cisco switch'te MAC tablosunu hangi komut gösterir?", options: ["show ip route", "show mac address-table", "show vlan brief ile VLAN ve port listesi", "show running-config ile geçerli yapılandırma"], obj: "h4" },
      { id: "90524eb3", q: "Ethernet çerçevesinde hata denetimi için kullanılan ve çerçevenin sonunda bulunan alan hangisidir?", options: ["Preamble","Tür/uzunluk","Hedef MAC","FCS"], obj: "h1" },
      { id: "744c128b", q: "Switch MAC tablosunu doldururken hangi alana bakar?", options: ["Gelen çerçevenin hedef MAC adresine ve çıkış portuna","Paketin hedef IP adresine ve alt ağ maskesine","Gelen çerçevenin kaynak MAC adresine","Tür/uzunluk alanına"], obj: "h1" },
      { id: "007423a8", q: "Bir çerçevenin hedef MAC adresi FF:FF:FF:FF:FF:FF. Switch ne yapar?", options: ["Çerçeveyi düşürür","Geldiği port hariç tüm portlara gönderir","Tablodaki ilk porta gönderir","Çerçeveyi yalnız router portuna gönderir"], obj: "h1" },
      { id: "8d4a4d18", q: "Standart Ethernet çerçevesinin (ön söz hariç, etiketsiz) boyutu kaç bayt aralığındadır?", options: ["64-1518","32-512","1500-9000","46-1500"], obj: "h1" },
      { id: "7c22dd5c", q: "MAC tablosunda kaydı olmayan bir hedefe çerçeve geldiğinde switch sonuç olarak neyi öğrenir?", options: ["Hedef MAC adresinin hangi portta olduğunu","Hedef IP adresini","Hiçbir şey öğrenmez","Çerçevenin kaynak MAC adresini ve giriş portunu"], obj: "h1" },
      { id: "792e1610", q: "4 portu da dolu olan bir hub ile 4 portu da dolu olan bir switch'te (VLAN yok) collision domain sayıları sırasıyla kaçtır?", options: ["1 ve 4", "4 ve 1", "1 ve 1", "4 ve 4"], obj: "h3" },
      { id: "74984202", q: "Bir switch hedef MAC adresini okur okumaz, çerçevenin geri kalanı gelmeden iletmeye başlıyor. Bu yöntemin adı nedir?", options: ["Cut-through", "Store-and-forward", "CSMA/CD", "ARP"], obj: "h1" },
      { id: "3108cbca", q: "Cisco switch'te startup-config hangi bellekte kalıcı olarak saklanır?", options: ["NVRAM", "RAM", "Flash", "ROM"], obj: "h4" },
      { id: "69e796f0", q: "Bir switch'te SSH için RSA anahtarı üretmeden (crypto key generate rsa) önce hangi iki ayar yapılmış olmalıdır?", options: ["hostname ve ip domain-name", "enable password ve banner motd", "line console 0 ve exec-timeout", "service dhcp ve ip helper-address"], obj: "h4" }
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
    homework: "Packet Tracer'da bir switch'e toplam 4 bilgisayar bağla. İlk ikisini VLAN 10'a, diğer ikisini VLAN 20'ye koy. Aynı VLAN'dakiler ping atabilmeli, farklı VLAN'dakiler atamamalı.",
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
      { t: "cmd", lang: "ios", calistirma: "atla Cisco IOS komutları; cihaz ya da Packet Tracer gerekir", text: "Switch(config)# vlan 10\nSwitch(config-vlan)# name MUHASEBE\nSwitch(config-vlan)# exit\nSwitch(config)# vlan 20\nSwitch(config-vlan)# name SATIS\nSwitch(config-vlan)# exit\n\nSwitch(config)# interface fastethernet0/1\nSwitch(config-if)# switchport mode access\nSwitch(config-if)# switchport access vlan 10\n\nSwitch(config)# interface gigabitethernet0/24\nSwitch(config-if)# switchport mode trunk\n\nSwitch# show vlan brief\nSwitch# show interfaces trunk" },
      { t: "steps", h: "Satır satır ne yaptık?", items: [
        "'vlan 10' ve 'name MUHASEBE': VLAN'ı oluşturur ve isim verir.",
        "'switchport mode access': portu uç cihaz portu yapar.",
        "'switchport access vlan 10': portu VLAN 10'a atar.",
        "'switchport mode trunk': yukarı bağlantı portunu trunk yapar.",
        "'show vlan brief': hangi port hangi VLAN'da gösterir."
      ] },
      { t: "h", text: "VLAN'lar arası iletişim" },
      { t: "p", text: "Farklı VLAN'lar farklı alt ağlardır. Aralarında konuşmak için yönlendirme (router ya da katman 3 switch) gerekir. Klasik yöntem 'router-on-a-stick': router'ın tek fiziksel arayüzü, her VLAN için bir alt arayüze (subinterface) bölünür ve switch'e trunk ile bağlanır." },
      { t: "cmd", lang: "ios", calistirma: "atla Cisco IOS komutları; cihaz ya da Packet Tracer gerekir", text: "Router(config)# interface gigabitethernet0/0\nRouter(config-if)# no shutdown\n\nRouter(config)# interface gigabitethernet0/0.10\nRouter(config-subif)# encapsulation dot1Q 10\nRouter(config-subif)# ip address 192.168.10.1 255.255.255.0\n\nRouter(config)# interface gigabitethernet0/0.20\nRouter(config-subif)# encapsulation dot1Q 20\nRouter(config-subif)# ip address 192.168.20.1 255.255.255.0" },
      {"t":"h","text":"VLAN arası yönlendirme ayrıntıları (Faz 42h)"},
      {"t":"steps","h":"802.1Q etiketi","items":["Trunk bağlantıda çerçeveye 4 baytlık 802.1Q etiketi eklenir; içinde 12 bitlik VLAN kimliği (VID) vardır, yani 1-4094 arası VLAN kullanılabilir.","Native VLAN trunk üzerinde etiketsiz giden VLAN'dır (varsayılan VLAN 1). İki ucun native VLAN'ı aynı olmalı; farklıysa uyarı ve yanlış VLAN'a sızma olur.","Access port etiketsiz çalışır; etiketi switch porta girerken ekler, çıkarken siler."]},
      {"t":"steps","h":"Yöntem 1: router-on-a-stick","items":["Switch tarafı: yönlendiriciye giden portu trunk yap (switchport mode trunk); gerekli VLAN'lar izin listesinde olsun.","Router tarafı: fiziksel arayüz 'no shutdown'; her VLAN için alt arayüz (Gi0/0.10 gibi), önce 'encapsulation dot1Q 10', sonra o VLAN'ın ağ geçidi IP'si.","Her alt arayüzün IP'si o VLAN'daki cihazların varsayılan ağ geçididir.","Dezavantaj: tüm VLAN'lar arası trafik tek fiziksel bağlantıdan geçer; darboğaz olur. Küçük ağlar ve laboratuvar için uygundur."]},
      {"t":"steps","h":"Yöntem 2: katman 3 switch ve SVI","items":["ip routing komutu switch'in yönlendirmesini açar.","Her VLAN için SVI: interface vlan 10, ip address 192.168.10.1 255.255.255.0, no shutdown.","SVI'nin up/up olması için o VLAN'ın var olması ve en az bir aktif portunun (access ya da trunk) bulunması gerekir.","Yönlendirme donanımda yapıldığı için router-on-a-stick'ten çok daha hızlıdır; orta ve büyük ağlarda tercih edilir.","Router'a giden fiziksel yol için routed port (no switchport) kullanılır."]},
      {"t":"cmd","lang":"ios","calistirma":"atla Cisco IOS komutları; cihaz ya da Packet Tracer gerekir","text":"! Katman 3 switch:\nSwitch(config)# ip routing\nSwitch(config)# interface vlan 10\nSwitch(config-if)# ip address 192.168.10.1 255.255.255.0\nSwitch(config-if)# no shutdown\n\n! Doğrulama:\nshow vlan brief\nshow interfaces trunk\nshow ip interface brief\nshow ip route\nping 192.168.20.10"},
      {"t":"steps","h":"Hata arama sırası","items":["Cihazın IP'si, maskesi ve ağ geçidi doğru mu? Ağ geçidi o VLAN'ın alt arayüz ya da SVI adresi olmalı.","Port doğru VLAN'da mı? (show vlan brief)","Trunk çalışıyor mu, VLAN izin listesinde mi, native VLAN iki uçta aynı mı? (show interfaces trunk)","Alt arayüzde encapsulation dot1Q VLAN numarasıyla eşleşiyor mu; L3 switchte ip routing açık mı? (show ip route'ta C ve L satırları)"]},
      { t: "warn", h: "Tuzak", text: "Port yanlış VLAN'dayken 'cihaz IP alıyor ama kimseye ulaşamıyor' sorunu yaşarsın. Önce 'show vlan brief' ile portun hangi VLAN'da olduğuna bak. Bir de trunk'ta VLAN izin listesinde (allowed VLANs) değilse o VLAN'ın trafiği geçmez." }
    ],
    objectives: [
      { id: "h1", text: "VLAN'ın ne işe yaradığını ve güvenlik ile broadcast açısından sağladığı faydayı söyleyebilirsin." },
      { id: "h2", text: "Access port ile trunk portu ayırt edip hangi cihazın hangi porta bağlanacağını seçebilirsin." },
      { id: "h3", text: "Farklı VLAN'daki cihazların konuşması için neden yönlendirme gerektiğini açıklayabilirsin." },
      { id: "h4", text: "Bir portu VLAN'a atayan ve VLAN-port eşleşmesini gösteren Cisco komutlarını seçebilirsin." }
    ],
    summary: [
      "VLAN, tek fiziksel switch üzerinde mantıksal olarak ayrı ağlar (broadcast domain'ler) oluşturur; güvenlik, performans ve esneklik sağlar.",
      "Access port tek VLAN'a aittir ve uç cihazlara bağlanır; trunk port 802.1Q etiketiyle birden çok VLAN taşır.",
      "Her VLAN ayrı bir alt ağdır; VLAN'lar arası iletişim için router (router-on-a-stick) ya da katman 3 switch gerekir.",
      "Portu VLAN'a atamak için 'switchport mode access' ve 'switchport access vlan N' kullanılır; 'show vlan brief' VLAN-port eşleşmesini gösterir."
    ],
    quiz: [
      { id: "fdcb9445", q: "VLAN'ların temel amacı nedir?", options: ["Hızı artırmak", "Bir switch'i mantıksal ağlara bölmek", "Şifreleme yapmak", "IP adresi dağıtmak"], obj: "h1" },
      { id: "6329e426", q: "Aşağıdakilerden hangisi VLAN kullanmanın doğrudan faydasıdır?", options: ["Bakır kablonun 100 metrelik uzunluk sınırını fiziksel olarak aşmak", "Tüm VLAN trafiğini uçtan uca otomatik olarak şifreleyip korumak", "Cihazlara otomatik IP adresi dağıtmak", "Departmanları ayırıp broadcast alanını küçültmek"], obj: "h1" },
      { id: "eee214c8", q: "Bir bilgisayarın bağlandığı port ile iki switch'i bağlayan uplink portu için doğru eşleşme hangisidir?", options: ["Bilgisayar: trunk, uplink: access", "Her ikisi de access", "Bilgisayar: access, uplink: trunk", "Her ikisi de trunk"], obj: "h2" },
      { id: "b55edca6", q: "Birden fazla VLAN'ın trafiğini taşıyan switch portu hangisidir?", options: ["Access port", "Trunk port", "Console port", "Loopback"], obj: "h2" },
      { id: "534f5507", q: "Farklı VLAN'daki iki cihazın konuşabilmesi için ne gerekir?", options: ["Daha uzun kablo", "Yönlendirme yapan bir cihaz (router ya da L3 switch)", "Aynı MAC adresi", "Hub"], obj: "h3" },
      { id: "863f4870", q: "Portu VLAN 30'a atayan komut hangisidir?", options: ["switchport mode trunk", "switchport access vlan 30", "vlan 30 access komutu ile port ataması", "ip vlan 30 komutunu arayüz modunda girerek"], obj: "h4" },
      { id: "225e3972", q: "VLAN ve port eşleşmesini özet gösteren komut hangisidir?", options: ["show vlan brief", "show ip route komutu, bağlantılı ağları listeler", "show version, cihaz sürüm bilgisini listeler", "show clock"], obj: "h4" },
      { id: "d37295c0", q: "Router-on-a-stick yönteminde VLAN 20 için router'da doğru yapılandırma hangisidir?", options: ["Alt arayüzde encapsulation dot1Q 20 ve o VLAN'ın ağ geçidi IP'si","Her VLAN için ayrı fiziksel arayüz ve switchport mode access komutu","Yalnız fiziksel arayüze IP verip VLAN numarasını yazmamak gerekir","Switch tarafında trunk yerine access modu kullanılır ve etiket eklenmez"], obj: "h3" },
      { id: "90e09842", q: "Katman 3 switchte VLAN 10 için SVI oluşturuldu ve yönlendirme açılmadı. VLAN 10 ile VLAN 20 arasında ne olur?", options: ["Trafik otomatik olarak router'a gönderilir ve çalışır","Yönlendirme yapılmaz, çünkü ip routing komutu açılmamıştır","İki VLAN otomatik olarak aynı alt ağ hâline gelir ve konuşur","Yalnız yayın trafiği geçer, diğer paketler ise düşer"], obj: "h3" },
      { id: "9a3485cd", q: "Trunk bağlantıda 802.1Q etiketindeki VLAN kimliği kaç bittir ve hangi aralıkta VLAN'a izin verir?", options: ["8 bit, 1-254 arası olacak şekilde","16 bit, 1-65534 arası olacak şekilde","12 bit, 1-4094 arası","10 bit, 1-1022 arası olacak şekilde"], obj: "h2" },
      { id: "044f6ca2", q: "Switchin trunk portunda native VLAN iki uçta farklı yapılandırılırsa ne beklenir?", options: ["Trunk otomatik olarak access porta döner ve çalışır","Tüm VLAN'lar kendiliğinden aynı numaraya çevrilir","Hiçbir sorun olmaz, çünkü native VLAN yalnız yönetim içindir","Uyarı ve etiketsiz trafiğin yanlış VLAN'a düşmesi"], obj: "h2" }
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
      { t: "cmd", lang: "ios", calistirma: "atla Cisco IOS komutları; cihaz ya da Packet Tracer gerekir", text: "Router(config)# interface gigabitethernet0/0\nRouter(config-if)# ip address 10.0.0.1 255.255.255.252\nRouter(config-if)# no shutdown\n\n# Static route: hedef ağ, maske, bir sonraki router (next hop)\nRouter(config)# ip route 192.168.20.0 255.255.255.0 10.0.0.2\n\n# Default route: bilinmeyen her şey bu yöne gitsin\nRouter(config)# ip route 0.0.0.0 0.0.0.0 203.0.113.1\n\nRouter# show ip route\nRouter# show ip interface brief" },
      { t: "steps", h: "show ip route çıktısını okuma", items: [
        "C: doğrudan bağlı ağ.",
        "L: router arayüzünün kendi IP adresi (/32).",
        "S: static route.",
        "O: OSPF ile öğrenilen yol.",
        "S* ya da 'Gateway of last resort': default route."
      ] },
      { t: "h", text: "Yönlendirme protokolü sınıfları ve AD tablosu (Faz 42c)" },
      { t: "steps", h: "Üç sınıf", items: [
        "Distance vector (mesafe vektörü): router komşusunun söylediğine güvenir, 'şu ağa şu kadar uzaklıktayım' der. RIP (metrik atlama sayısı, en çok 15; 16 ulaşılamaz). EIGRP Cisco'nun gelişmiş distance vector protokolüdür.",
        "Link state (bağlantı durumu): her router tüm topolojinin haritasını çıkarır, en kısa yolu SPF algoritmasıyla hesaplar. OSPF ve IS-IS. Daha hızlı yakınsar, daha çok bellek ister.",
        "Path vector (yol vektörü): yolu geçilen AS numaraları listesiyle tutar. BGP, internet üzerinde şirketler ve operatörler (otonom sistemler) arasında kullanılır.",
        "IGP kuruluş içi (RIP, EIGRP, OSPF, IS-IS), EGP kuruluşlar arası (BGP) çalışır."
      ] },
      { t: "steps", h: "Varsayılan administrative distance (küçük kazanır)", items: [
        "Connected 0, Static 1, eBGP 20, EIGRP 90, OSPF 110, IS-IS 115, RIP 120, iBGP 200.",
        "AD farklı kaynaklar arasında seçer; AYNI protokol içinde yolu metrik seçer (RIP atlama, OSPF cost).",
        "show ip route kodları: C bağlı, L yerel, S statik, O OSPF, R RIP, D EIGRP, B BGP, S* varsayılan rota."
      ] },
      { t: "box", h: "Dönüş yolu", text: "Static route'u iki yönlü düşün. A router'ına B ağını gösterdiysen, B router'ına da A ağını göstermelisin. Biri eksikse ping gider ama cevap dönmez." },
      { t: "warn", h: "Tuzak", text: "Arayüz 'no shutdown' ile açılmadıysa ya da IP verilmediyse tabloda C satırı görünmez. Önce 'show ip interface brief' ile arayüzün up/up olup olmadığına bak." }
    ],
    objectives: [
      { id: "h1", text: "Routing tablosunda birden çok eşleşme olduğunda hangi yolun seçileceğini (en uzun prefix, sonra administrative distance) söyleyebilirsin." },
      { id: "h2", text: "show ip route çıktısındaki C, L, S, O kodlarını okuyup her satırın kaynağını söyleyebilirsin." },
      { id: "h3", text: "Default route'un (0.0.0.0/0) ne zaman kullanıldığını söyleyebilirsin." },
      { id: "h4", text: "Static route yazıp dönüş yolunun da gerektiğini hesaba katarak ping sorununu teşhis edebilirsin." }
    ],
    summary: [
      "Router hedef IP'ye bakar ve yalnız routing tablosunda bildiği ağlara paket gönderir; bilmiyorsa paketi atar.",
      "Tablo doğrudan bağlı ağlardan (C), elle yazılan static route'lardan (S) ve dinamik protokollerden (OSPF gibi) dolar.",
      "Seçimde önce en uzun prefix kazanır; aynı prefix için administrative distance küçük olan kazanır (connected 0, static 1, OSPF 110).",
      "Hiçbir yola uymayan trafik default route'a (0.0.0.0/0) gider; o da yoksa paket düşer.",
      "Static route iki yönlü düşünülmelidir: dönüş yolu eksikse ping gider ama cevap dönmez."
    ],
    quiz: [
      { id: "5c70cb56", q: "Router, hedef ağ için birden çok eşleşme bulursa hangisini seçer?", options: ["En kısa prefix", "En uzun prefix (en spesifik)", "Rastgele", "İlk yazılanı"], obj: "h1" },
      { id: "f7901442", q: "Routing tablosunda 'S' harfi neyi gösterir?", options: ["Switch, yani yönlendirme tablosundaki anahtar kaydı", "Static route", "Secure", "Subnet, doğrudan bağlı alt ağ kaydı"], obj: "h2" },
      { id: "19426cb0", q: "Bilinmeyen tüm hedefler için kullanılan route hangisidir?", options: ["0.0.0.0/0", "255.255.255.255/32", "127.0.0.0/8", "10.0.0.0/8"], obj: "h3" },
      { id: "425af39d", q: "Static route'un administrative distance değeri varsayılan olarak kaçtır?", options: ["0", "1", "90", "110"], obj: "h1" },
      { id: "15495b38", q: "A router'ına B ağını gösterdin ama ping cevap dönmüyor. En olası sebep nedir?", options: ["Kablo fazla uzun", "B router'ında A ağına dönüş yolu yok", "Switch bozuk", "DNS hatası"], obj: "h4" },
      { id: "1f9ccc52", q: "'show ip route' çıktısında bir satır 'L' koduyla başlıyor. Bu satır neyi gösterir?", options: ["OSPF ile öğrenilen yolu", "Router arayüzünün kendi IP adresini (/32)", "Elle yazılmış static route'u", "Default route'u"], obj: "h2" },
      { id: "90e72d15", q: "Aynı hedef ağı hem RIP hem OSPF aynı önekle (prefix) öğrendi. Router routing tablosuna hangisini koyar?", options: ["OSPF yolunu (AD 110)", "RIP yolunu (AD 120)", "İkisini birlikte kullanır", "Metriği küçük olanı seçer"], obj: "h1" },
      { id: "64f53cdb", q: "BGP hangi yönlendirme protokolü sınıfındadır ve genelde nerede kullanılır?", options: ["Path vector, otonom sistemler arasında", "Distance vector, tek bir ofisin içinde", "Link state, tek bir kampüs ağının içinde", "Statik, yönetici her rotayı elle girer"], obj: "h1" }
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

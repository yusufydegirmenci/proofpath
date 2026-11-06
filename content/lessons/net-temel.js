/* Ağ temelleri dersleri 1-3 (OSI/TCP-IP, portlar ve protokoller, kablolar ve topolojiler)
   Üretim: Faz 41c (GECE-10). Kod örnekleri çalıştırılarak/ayrıştırılarak doğrulandı; kaynak adresleri HTTP ile denetlendi (sonDogrulama 2026-11-06). */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).net = (window.PP_LESSONS.net || {}));

  /* 1 ───────────────────────────── Ağ nedir, OSI ve TCP/IP */
  L[1] = {
    "hook": "Bir mektup zarfa, zarf kutuya, kutu koliye girer; ağ da veriyi aynı mantıkla kat kat sarar ve her katman yalnızca kendi etiketine bakar.",
    "homework": "Kendi bilgisayarında ipconfig (Linux/macOS'ta ip addr) çalıştır, bağdaştırıcılarını ve durumlarını (bağlı / Media disconnected) bir kâğıda yaz, her birini hangi OSI katmanının ilgilendirdiğini işaretle.",
    "warmup": {
      "recap": [
        {
          "point": "Bir ağ, birbirine bağlı cihazların veri paylaşmasıdır.",
          "example": "Evde telefonun ve dizüstünün aynı modeme bağlanması"
        },
        {
          "point": "Bilgisayarlar veriyi 0 ve 1 olarak, yani bit olarak taşır.",
          "example": "Bir fotoğrafın ağ üzerinde bit dizisi olarak gitmesi"
        }
      ],
      "concepts": [
        {
          "term": "OSI modeli",
          "tr": "Yedi katmanlı başvuru modeli",
          "summary": "Ağ iletişimini yedi katmana bölen, anlatmak ve arıza aramak için kullanılan kavramsal modeldir; gerçek ağlar onu bire bir uygulamaz.",
          "example": "Sorunun fiziksel katmanda mı yoksa uygulama katmanında mı olduğunu aramak"
        },
        {
          "term": "TCP/IP modeli",
          "tr": "İnternetin gerçek yığını",
          "summary": "İnternette fiilen çalışan, genelde dört katmanla (uygulama, taşıma, internet, ağ erişimi) anlatılan protokol ailesidir.",
          "example": "Tarayıcının HTTP'yi TCP üzerinden, IP ile taşıması"
        },
        {
          "term": "Kapsülleme",
          "tr": "Başlıkla sarma",
          "summary": "Veri aşağı inerken her katmanın ona kendi başlığını eklemesidir; alıcıda ters sırada sökülür.",
          "example": "Segmentin IP başlığı eklenerek pakete dönüşmesi"
        },
        {
          "term": "PDU",
          "tr": "Katmandaki veri birimi",
          "summary": "Her katmanın veriye verdiği ad: taşımada segment (UDP'de datagram), ağda paket, veri bağlantıda çerçeve, fiziksel katmanda bit.",
          "example": "Ethernet çerçevesi"
        }
      ]
    },
    "blocks": [
      {
        "t": "h",
        "text": "Neden öğreniyoruz?"
      },
      {
        "t": "box",
        "h": "Gerçek talep",
        "text": "Destek masasına \"sayfa açılmıyor\" bileti düşer. Bilet tek cümledir ama sorun kabloda, IP ayarında, güvenlik duvarında ya da uygulamada olabilir. Katman modelini bilen kişi işi ikiye böler: \"Önce en alttan başla, her katmanı sırayla ele.\" Bu, tahminle uğraşmak yerine sistemli sorun gidermedir."
      },
      {
        "t": "h",
        "text": "Katmanlı düşünce"
      },
      {
        "t": "p",
        "text": "Ağ iletişimi çok karmaşık olduğu için küçük işlere bölünür. Her katman yalnızca altındaki katmanın hizmetini kullanır ve üstündekine hizmet verir. Böylece kablo değişse bile tarayıcıyı değiştirmen gerekmez, katmanlar birbirinden bağımsız yenilenebilir."
      },
      {
        "t": "box",
        "h": "OSI'nin yedi katmanı (üstten alta)",
        "text": "7 Uygulama (HTTP, DNS) · 6 Sunum (şifreleme, biçim) · 5 Oturum (oturum kurma/kapatma) · 4 Taşıma (TCP, UDP, port) · 3 Ağ (IP, yönlendirici) · 2 Veri bağlantı (MAC, anahtar) · 1 Fiziksel (kablo, sinyal)."
      },
      {
        "t": "p",
        "text": "TCP/IP modeli daha sadedir. Uygulama, Sunum ve Oturum katmanları tek \"Uygulama\" katmanında birleşir; Taşıma aynı kalır; OSI'nin Ağ katmanı \"İnternet\" olur; Veri bağlantı ve Fiziksel katmanlar \"Ağ erişimi\" altında toplanır. Pratikte \"katman 3\" derken IP, \"katman 4\" derken TCP/UDP kastedilir."
      },
      {
        "t": "h",
        "text": "Kapsülleme: veri nasıl sarılır"
      },
      {
        "t": "p",
        "text": "Tarayıcı bir istek ürettiğinde bu veri aşağı iner. Taşıma katmanı TCP başlığını ekler (segment), ağ katmanı IP başlığını ekler (paket), veri bağlantı katmanı çerçeve başlığı ve sonuna bir sınama toplamı ekler (çerçeve), fiziksel katman bunu bit olarak yollar. Alıcıda süreç tersine işler."
      },
      {
        "t": "p",
        "text": "Sayıyla görelim. Ethernet'te bir çerçevenin taşıdığı en çok veri (MTU) genelde 1500 bayttır. IP başlığı 20, TCP başlığı 20 bayt (seçeneksiz) tutar. Demek ki tek bir TCP segmentinde uygulama verisi en çok 1500 - 20 - 20 = 1460 bayt olabilir; bu değere MSS denir. Çerçevenin kendi başlığı (14 bayt) ve sonundaki sınama toplamı (4 bayt) eklenince çerçeve 14 + 1500 + 4 = 1518 bayta çıkar."
      },
      {
        "t": "cmd",
        "lang": "bash",
        "calistirma": "atla elle çalıştırılıp doğrulandı: Git Bash, 2026-11-06",
        "text": "mtu=1500; ip=20; tcp=20\necho \"MSS = $((mtu-ip-tcp))\"\necho \"Cerceve en fazla = $((14+mtu+4))\""
      },
      {
        "t": "box",
        "h": "Arıza hangi katmanda?",
        "text": "Bağdaştırıcı \"Media disconnected\" diyorsa katman 1 (kablo, port, kart). Kendi IP adresin yoksa ya da ağ geçidi yanlışsa katman 3. IP ile ping gidiyor ama site adıyla açılmıyorsa sorun büyük olasılıkla uygulama katmanındaki ad çözümlemesindedir. Alttan üste ilerlemek gereksiz kontrolü azaltır."
      },
      {
        "t": "h",
        "text": "Kendi makinende ilk teşhis"
      },
      {
        "t": "p",
        "text": "Aşağıdaki iki komut yalnızca kendi bilgisayarını inceler; hiçbir dış hedefe yük bindirmez. ipconfig bağdaştırıcılarını ve durumlarını listeler. 127.0.0.1 \"geri döngü\" adresidir: paket ağ kartına bile gitmeden kendi TCP/IP yığınına döner, yani yanıt gelmesi yığının çalıştığını gösterir."
      },
      {
        "t": "cmd",
        "lang": "cmd",
        "calistirma": "atla elle çalıştırılıp doğrulandı: Windows komut satırı (Git Bash üzerinden), 2026-11-06 (ipconfig, ping -n); atla Linux/macOS bu makinede yok, ip addr ve ping -c doğrulanamadı",
        "text": "ipconfig\nping -n 2 127.0.0.1\nREM Linux/macOS karşılığı: ip addr ; ping -c 2 127.0.0.1"
      },
      {
        "t": "steps",
        "h": "Elle deneme",
        "items": [
          "Bir komut satırı aç.",
          "ipconfig (Linux'ta ip addr) yaz ve bağdaştırıcı listesini oku.",
          "Her bağdaştırıcının durumunu bağlı ya da Media disconnected olarak not et.",
          "ping 127.0.0.1 çalıştır (Windows'ta -n 2, Linux'ta -c 2).",
          "Yanıt geldiyse \"TCP/IP yığınım çalışıyor\" diye yaz, ağın sağlam olduğunu iddia etme."
        ]
      },
      {
        "t": "warn",
        "h": "Tuzak",
        "text": "ping 127.0.0.1 başarılı oldu diye internetin çalıştığı sonucu çıkmaz; yalnızca kendi makinendeki yığın sağlamdır. İkinci tuzak: OSI bir anlatma modelidir, cihazlarda yedi ayrı yazılım katmanı aramak yanlıştır."
      }
    ],
    "objectives": [
      {
        "id": "h1",
        "text": "OSI'nin yedi katmanını sırayla sayıp TCP/IP'nin dört katmanıyla eşleştirebilirsin."
      },
      {
        "id": "h2",
        "text": "Kapsülleme sırasındaki başlıkları ve PDU adlarını söyleyip MSS'i MTU'dan hesaplayabilirsin."
      },
      {
        "id": "h3",
        "text": "Bir arızayı katmana yerleştirip kendi makinende ipconfig ve ping 127.0.0.1 ile ilk teşhisi yapabilirsin."
      }
    ],
    "summary": [
      "OSI yedi katmanlı anlatma modelidir; TCP/IP internetin fiilen kullandığı dört katmanlı yığındır.",
      "Kapsülleme: veri aşağı inerken segment, paket, çerçeve ve bit olur; alıcıda ters sırayla sökülür.",
      "Ethernet'te MTU 1500 iken seçeneksiz IP ve TCP başlıkları 40 bayt tuttuğundan MSS 1460 bayttır.",
      "Sorun gidermeye alttan başla: önce bağlantı (katman 1), sonra adres (3), sonra port ve uygulama.",
      "ping 127.0.0.1 yalnızca kendi TCP/IP yığınını sınar, dış ağı değil."
    ],
    "prereq": [],
    "minutes": 25,
    "sonDogrulama": "2026-11-06",
    "surum": "1",
    "quiz": [
      {
        "id": "7514fb03",
        "q": "TCP/IP modelinin \"İnternet\" katmanı OSI'de hangi katmana karşılık gelir?",
        "options": [
          "Veri bağlantı katmanı (2), MAC adreslemesi burada yapılır",
          "Ağ katmanı (3), IP adreslemesi burada yapılır",
          "Taşıma katmanı (4), port numaraları burada kullanılır",
          "Oturum katmanı (5), bağlantı oturumları burada yönetilir"
        ],
        "obj": "h1"
      },
      {
        "id": "3ea0598e",
        "q": "OSI'nin Uygulama, Sunum ve Oturum katmanları TCP/IP'de nasıl yer alır?",
        "options": [
          "Üçü tek bir Taşıma katmanında birleşir",
          "Sunum katmanı Ağ erişimi katmanına karışır",
          "Üçü tek bir Uygulama katmanında birleşir",
          "Her biri TCP/IP'de ayrı katman olarak aynen kalır"
        ],
        "obj": "h1"
      },
      {
        "id": "0803782a",
        "q": "Ethernet'te MTU 1500 bayt; IP ve TCP başlıkları seçeneksiz 20 + 20 bayt. Bir segmentin taşıyabileceği en çok uygulama verisi (MSS) kaç bayttır?",
        "options": [
          "1480 bayt",
          "1500 bayt",
          "1518 bayt",
          "1460 bayt"
        ],
        "obj": "h2"
      },
      {
        "id": "5eaec69d",
        "q": "Veri uygulamadan kabloya inerken PDU adları hangi sırayla görülür?",
        "options": [
          "Segment, paket, çerçeve, bit",
          "Paket, segment, çerçeve, bit",
          "Çerçeve, paket, segment, bit",
          "Segment, çerçeve, paket, bit"
        ],
        "obj": "h2"
      },
      {
        "id": "9e94f356",
        "q": "ipconfig bir bağdaştırıcı için \"Media disconnected\" gösteriyor. İlk şüphe hangi katmandır?",
        "options": [
          "Uygulama katmanı: tarayıcı ayarları yanlış yapılmış",
          "Fiziksel katman: kablo, port ya da ağ kartı",
          "Taşıma katmanı: hedef port güvenlik duvarında kapalı",
          "Ağ katmanı: varsayılan ağ geçidi hatalı girilmiş"
        ],
        "obj": "h3"
      },
      {
        "id": "e6ac7aec",
        "q": "ping 127.0.0.1 yanıt veriyor. Bu sonuç neyi kanıtlar?",
        "options": [
          "Varsayılan ağ geçidinin ve yönlendiricinin çalıştığını",
          "Kablonun hedef sunucuya kadar sağlam olduğunu",
          "Bu makinedeki TCP/IP yığınının çalıştığını",
          "Alan adlarının doğru çözümlendiğini"
        ],
        "obj": "h3"
      }
    ],
    "interview": [
      {
        "q": "Kullanıcı \"internet yok\" diyor. Katman modeliyle nasıl ilerlersin?",
        "a": "Alttan üste giderim. Önce bağlantı durumu ve link ışığı (katman 1), sonra IP adresi ve ağ geçidi (3), sonra IP ile erişim ve ad çözümleme, en son uygulama ayarı. Her adımda bir katmanı elerim."
      },
      {
        "q": "OSI ile TCP/IP arasındaki temel fark nedir?",
        "a": "OSI yedi katmanlı kavramsal bir modeldir; TCP/IP internetin gerçekten kullandığı protokol yığınıdır ve genelde dört katmanla anlatılır. OSI daha çok iletişim ve sorun giderme dili olarak kullanılır."
      },
      {
        "q": "Kapsülleme nedir? Bir örnek ver.",
        "a": "Her katmanın veriye kendi başlığını eklemesidir. Örneğin taşıma segmenti IP başlığıyla pakete, paket de çerçeve başlığıyla çerçeveye sarılır; alıcı sırayla söker."
      }
    ],
    "vocab": [
      {
        "term": "Layer",
        "tr": "Katman",
        "ex": "The network layer routes packets between networks."
      },
      {
        "term": "Encapsulation",
        "tr": "Kapsülleme",
        "ex": "Encapsulation adds a header at every layer."
      },
      {
        "term": "Header",
        "tr": "Başlık",
        "ex": "The IP header is 20 bytes long without options."
      },
      {
        "term": "Frame",
        "tr": "Çerçeve",
        "ex": "An Ethernet frame carries up to 1500 bytes of payload."
      },
      {
        "term": "Loopback",
        "tr": "Geri döngü",
        "ex": "The loopback address 127.0.0.1 points to your own machine."
      }
    ],
    "sources": [
      {
        "title": "RFC 1122: Requirements for Internet Hosts (Communication Layers)",
        "url": "https://www.rfc-editor.org/rfc/rfc1122"
      },
      {
        "title": "RFC 894: A Standard for the Transmission of IP Datagrams over Ethernet Networks",
        "url": "https://www.rfc-editor.org/rfc/rfc894"
      }
    ]
  };

  /* 2 ───────────────────────────── Portlar ve protokoller */
  L[2] = {
    "hook": "IP adresi bir apartmanın sokak numarasıdır, port ise kapı zili: aynı binada web, SSH ve e-posta hizmeti ayrı ziller çalar.",
    "homework": "Kendi makinende netstat -an çalıştır, LISTENING satırlarından üç portu seç ve her birinin hangi servise ait olabileceğini port tablosundan bul; emin olmadıklarına \"bilmiyorum\" yaz.",
    "warmup": {
      "recap": [
        {
          "point": "Katman 4 (taşıma) TCP ve UDP'yi barındırır, veri birimi segmenttir.",
          "example": "Web sayfası TCP segmentleriyle gelir"
        },
        {
          "point": "Katman 3 IP adresiyle makineyi bulur.",
          "example": "192.168.1.10 adresli bilgisayar"
        }
      ],
      "concepts": [
        {
          "term": "Port",
          "tr": "Servis kapısı",
          "summary": "16 bitlik numaradır (0-65535); aynı IP adresindeki hangi uygulamaya gidileceğini belirler.",
          "example": "HTTPS için 443"
        },
        {
          "term": "Soket",
          "tr": "IP ve port çifti",
          "summary": "Bir uç noktayı tanımlar; bağlantı iki soketin (kaynak ve hedef) birleşimidir.",
          "example": "127.0.0.1:8080"
        },
        {
          "term": "TCP",
          "tr": "Bağlantılı, güvenilir taşıma",
          "summary": "Veriyi sıralı ve kayıpsız teslim etmeye çalışır; kayıp parçayı yeniden gönderir.",
          "example": "Dosya indirme, web, SSH"
        },
        {
          "term": "UDP",
          "tr": "Bağlantısız, hafif taşıma",
          "summary": "Bağlantı kurmaz, teslim garantisi vermez; hızlıdır ve eski veriyi beklemeye gerek olmayan işlerde uygundur.",
          "example": "DNS sorgusu, canlı yayın"
        }
      ]
    },
    "blocks": [
      {
        "t": "h",
        "text": "Neden öğreniyoruz?"
      },
      {
        "t": "box",
        "h": "Gerçek talep",
        "text": "Güvenlik ekibi şunu ister: \"Yeni web sunucusuna yalnızca kullanıcılar HTTPS ile ulaşsın, yönetim ise yalnız ofis ağından SSH ile yapılsın.\" Bu kuralı yazmak için hangi servisin hangi port ve hangi taşıma protokolüyle çalıştığını bilmek gerekir. Yanlış portu açmak ya gerekli trafiği keser ya da gereksiz bir kapıyı dışarı bırakır."
      },
      {
        "t": "h",
        "text": "Port ve soket"
      },
      {
        "t": "p",
        "text": "Bir makinede aynı anda birçok ağ uygulaması çalışır, ama IP adresi tektir. Gelen paketin hangi uygulamaya gideceğini taşıma katmanındaki port numarası söyler. Port alanı 16 bit olduğu için 2 üzeri 16 = 65536 farklı değer (0-65535) vardır."
      },
      {
        "t": "box",
        "h": "Port aralıkları (IANA)",
        "text": "0-1023: sistem (iyi bilinen) portlar, ör. 22, 25, 53, 80, 443. 1024-49151: kayıtlı portlar. 49152-65535: dinamik (geçici) portlar; istemci tarafı kaynak portu çoğunlukla bu aralıktan seçilir (16384 numara). Bazı işletim sistemleri geçici port için farklı bir aralık kullanır."
      },
      {
        "t": "p",
        "text": "Sunucu iyi bilinen portta bekler; istemci bağlanırken işletim sistemi ona geçici bir kaynak port atar. Bu yüzden aynı bilgisayardan iki tarayıcı sekmesi aynı sunucunun 443 portuna bağlansa bile karışmaz: iki bağlantının kaynak portu farklıdır, yani soket çiftleri farklıdır."
      },
      {
        "t": "box",
        "h": "Eşleştirme tablosu",
        "text": "SSH 22 (şifreli yönetim) · SMTP 25 (e-posta gönderme) · DNS 53 (çoğunlukla UDP, büyük yanıtlarda TCP) · HTTP 80 · POP3 110 · IMAP 143 · HTTPS 443 · IMAPS 993 · POP3S 995. Düz metin protokollerin çoğunun TLS ile korunan bir karşılığı vardır; yönetim ve posta için şifreli olanı seç."
      },
      {
        "t": "cmd",
        "lang": "python",
        "calistirma": "atla elle çalıştırılıp doğrulandı: Git Bash, 2026-11-06 (Python 3.12, standart kütüphane; ad eşlemesi işletim sistemi hizmet tablosundan gelir)",
        "text": "import socket\nfor p in (22, 25, 53, 80, 110, 143, 443):\n    print(p, socket.getservbyport(p, \"tcp\"))"
      },
      {
        "t": "h",
        "text": "TCP ya da UDP?"
      },
      {
        "t": "p",
        "text": "TCP, veriyi sıralı ve eksiksiz teslim etmek için bağlantı kurar ve kaybı yeniden gönderir; dosya, web ve e-posta gibi her baytın önemli olduğu işlerde seçilir. UDP bağlantı kurmaz; başlığı 8 bayttır, TCP'nin en az 20 baytından hafiftir. Bir ölçüm ya da ses parçası geç gelirse zaten işe yaramıyorsa, yeniden göndermek yerine yenisini beklemek UDP ile daha uygundur."
      },
      {
        "t": "p",
        "text": "Aşağıdaki betik yalnızca 127.0.0.1 üzerinde çalışır: sisteme boş bir port seçtirir (port 0), bir sunucu soketi açar, aynı makinedeki istemciyle bağlanıp mesaj alır. Dışarıya hiçbir bağlantı yapılmaz."
      },
      {
        "t": "cmd",
        "lang": "python",
        "calistirma": "atla elle çalıştırılıp doğrulandı: Git Bash, 2026-11-06 (Python 3.12)",
        "text": "import socket, threading\nsrv = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\nsrv.bind((\"127.0.0.1\", 0))\nsrv.listen(1)\nport = srv.getsockname()[1]\ndef sunucu():\n    c, a = srv.accept()\n    c.sendall(b\"merhaba\")\n    c.close()\nthreading.Thread(target=sunucu).start()\ni = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\ni.connect((\"127.0.0.1\", port))\nprint(i.recv(100).decode(), i.getsockname()[0], i.getpeername()[1] == port)\ni.close(); srv.close()"
      },
      {
        "t": "box",
        "h": "netstat çıktısını okuma",
        "text": "netstat -an kendi makinenin bağlantılarını listeler. \"0.0.0.0:445 ... LISTENING\" satırı, makinenin tüm arayüzlerinde 445 numaralı portta bağlantı beklediğini söyler. 127.0.0.1:8080 görürsen servis yalnızca bu makineden erişilebilirdir. ESTABLISHED kurulu bir bağlantıdır."
      },
      {
        "t": "cmd",
        "lang": "bash",
        "calistirma": "atla elle çalıştırılıp doğrulandı: Git Bash, 2026-11-06 (Windows'un netstat komutu, bash borusu ile); atla Linux bu makinede yok, ss -ltn doğrulanamadı",
        "text": "netstat -an | grep LISTENING\n# Linux karşılığı: ss -ltn"
      },
      {
        "t": "steps",
        "h": "Elle deneme",
        "items": [
          "Bir komut satırı aç.",
          "netstat -an çıktısında LISTENING satırlarını süz (Linux'ta ss -ltn) ve dinleyen portları yaz.",
          "Yerel adres sütunundaki port numaralarını yaz.",
          "Her portu iyi bilinen port tablosunda ara.",
          "Tabloda olmayanlar için \"bilmiyorum\" yaz, tahmin etme."
        ]
      },
      {
        "t": "warn",
        "h": "Tuzak",
        "text": "Portun numarası servisi garanti etmez: biri SSH'ı 2222'de, web'i 8080'de çalıştırabilir. Ayrıca LISTENING gören bir portun dışarıdan erişilebilir olması şart değildir; güvenlik duvarı hâlâ keser. Dışarıya açık olup olmadığını yalnızca kendi izin verilmiş ağında sınama yoluyla anlarsın."
      }
    ],
    "objectives": [
      {
        "id": "h1",
        "text": "Yaygın servis ve port eşleşmelerini (22, 25, 53, 80, 443, 993) ve düz metin-şifreli çiftleri söyleyebilirsin."
      },
      {
        "id": "h2",
        "text": "TCP ile UDP'den hangisinin hangi iş için uygun olduğunu gerekçesiyle seçebilirsin."
      },
      {
        "id": "h3",
        "text": "Soketi ve geçici portu açıklayıp netstat çıktısında dinleyen portları okuyabilirsin."
      }
    ],
    "summary": [
      "Port, aynı IP adresindeki hangi uygulamaya gidileceğini söyleyen 16 bitlik numaradır (65536 değer).",
      "Soket IP adresi ile port çiftidir; iki bağlantı kaynak portlarının farklı olmasıyla birbirinden ayrılır.",
      "TCP güvenilir ve sıralıdır; UDP hafiftir ve geç gelen verinin işe yaramadığı durumlarda uygundur.",
      "Düz metin protokollerin (HTTP, IMAP, POP3) şifreli karşılıkları vardır; yönetim ve posta için bunları seç.",
      "netstat -an ile kendi makinende dinleyen portları görebilirsin; LISTENING bağlantı beklemek demektir."
    ],
    "prereq": [],
    "minutes": 25,
    "sonDogrulama": "2026-11-06",
    "surum": "1",
    "quiz": [
      {
        "id": "5b3878c5",
        "q": "Bir güvenlik duvarında yalnız TCP 22 açıldı. Bu portla hangi iş yapılabilir?",
        "options": [
          "Tarayıcıdan sitenin HTTPS sayfasını açmak",
          "Giden e-postayı SMTP ile bir sunucuya teslim etmek",
          "Sunucuyu SSH ile uzaktan ve şifreli yönetmek",
          "Alan adını DNS sorgusuyla IP adresine çevirmek"
        ],
        "obj": "h1"
      },
      {
        "id": "cfbdd82c",
        "q": "Hangi çift, düz metin bir posta protokolü ile şifreli karşılığını doğru eşleştirir?",
        "options": [
          "POP3 110 ve SMTP 25 (biri alma biri gönderme)",
          "Telnet 23 ve FTP 21 (ikisi de dosya taşır)",
          "HTTP 80 ve DNS 53 (ikisi de alan adıyla çalışır)",
          "IMAP 143 ve IMAPS 993"
        ],
        "obj": "h1"
      },
      {
        "id": "393edcf9",
        "q": "Bir betik her 10 saniyede sunucuya sensör değeri yollar; geç gelen değer işe yaramaz, yenisi zaten gelecektir. Hangi tercih mantıklıdır?",
        "options": [
          "UDP: kayıp ölçüm yeniden gönderilmez, yenisi gelir",
          "TCP: kaybolan her ölçüm sıralı olarak yeniden gönderilsin",
          "TCP, çünkü UDP hiçbir şekilde veri taşıyamaz",
          "UDP, çünkü yalnızca yerel ağ içinde çalışabilir"
        ],
        "obj": "h2"
      },
      {
        "id": "a4734749",
        "q": "Büyük bir dosya indirirken neden TCP tercih edilir?",
        "options": [
          "Başlığı UDP'den küçüktür, ağda daha az bayt gider",
          "Kayıp parçalar yeniden gönderilir, sıra korunur",
          "Şifreleme sağlar, araya girenler dosyayı okuyamaz",
          "Port numarası gerekmediğinden bağlantı kurmak daha basittir"
        ],
        "obj": "h2"
      },
      {
        "id": "a11f289d",
        "q": "Aynı bilgisayardaki iki tarayıcı sekmesi aynı sunucunun 443 portuna bağlı. Bağlantılar neden birbirine karışmaz?",
        "options": [
          "Her sekme sunucuda ayrı bir hedef port numarası alır",
          "İşletim sistemi aynı anda yalnız bir bağlantıya izin verir",
          "Kaynak portları farklı, soket çiftleri ayrı",
          "Sunucu paketleri MAC adresine göre sekmelere dağıtır"
        ],
        "obj": "h3"
      },
      {
        "id": "bc0db6df",
        "q": "netstat çıktısında \"0.0.0.0:445 ... LISTENING\" satırı ne anlama gelir?",
        "options": [
          "Makineye şu anda dışarıdan 445 portu üzerinden bağlanılmış",
          "445 portu kapalıdır ve güvenlik duvarı tarafından engellenir",
          "445 portuna yalnız bu makinenin kendisi bağlanabilir",
          "Makine tüm arayüzlerde 445'i dinleyip bağlantı bekler"
        ],
        "obj": "h3"
      },
      {
        "id": "90640d24",
        "q": "Port alanı 16 bit olduğuna göre toplam kaç farklı port numarası vardır?",
        "options": [
          "65536 (0 ile 65535 arası)",
          "65535 (1 ile 65535 arası)",
          "32768 (yarısı istemci yarısı sunucu için)",
          "1024 (iyi bilinen portlar kadar)"
        ],
        "obj": "h1"
      }
    ],
    "interview": [
      {
        "q": "Port ile IP adresi arasındaki fark nedir?",
        "a": "IP adresi makineyi (arayüzü) bulur, port ise o makinedeki hangi uygulamaya gidileceğini söyler. İkisinin birleşimi soket olarak tanımlanır."
      },
      {
        "q": "Bir sunucuda hangi portların dinlediğini nasıl görürsün?",
        "a": "Kendi makinemde netstat -an (Linux'ta ss -ltn) çalıştırır, LISTENING satırlarındaki yerel adres ve portlara bakarım. Dışarıya açık olup olmadığı ise güvenlik duvarı kurallarına bağlıdır."
      },
      {
        "q": "DNS neden çoğunlukla UDP kullanır?",
        "a": "Sorgu ve yanıt küçüktür, bağlantı kurmak gereksiz yük olur; yanıt gelmezse istemci sorguyu yeniden sorar. Yanıt çok büyükse TCP'ye geçilebilir."
      }
    ],
    "vocab": [
      {
        "term": "Port",
        "tr": "Port, kapı",
        "ex": "The web server listens on port 443."
      },
      {
        "term": "Socket",
        "tr": "Soket",
        "ex": "A socket is an IP address plus a port number."
      },
      {
        "term": "Listening",
        "tr": "Dinlemede",
        "ex": "The service is listening on all interfaces."
      },
      {
        "term": "Handshake",
        "tr": "El sıkışma",
        "ex": "TCP starts with a three-way handshake."
      },
      {
        "term": "Ephemeral port",
        "tr": "Geçici port",
        "ex": "The client uses an ephemeral port as its source port."
      }
    ],
    "sources": [
      {
        "title": "IANA: Service Name and Transport Protocol Port Number Registry",
        "url": "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml"
      },
      {
        "title": "Python belgeleri: socket modülü",
        "url": "https://docs.python.org/3/library/socket.html"
      },
      {
        "title": "RFC 9293: Transmission Control Protocol (TCP)",
        "url": "https://www.rfc-editor.org/rfc/rfc9293"
      }
    ]
  };

  /* 3 ───────────────────────────── Kablolar, konnektörler ve topolojiler */
  L[3] = {
    "hook": "Yol seçmek gibi: kısa mesafede bakır bir sokak yeter, uzak ve gürültülü yerde ışıkla giden bir otoyol gerekir; cihazların bağlanış şekli ise şehrin harita düzenidir.",
    "homework": "Evindeki ağı kâğıda çiz: hangi cihaz neye hangi kabloyla ya da kablosuz bağlı, ortada hangi cihaz var? Topolojiyi adlandır ve ortadaki cihaz arızalanırsa neler kopacağını yaz.",
    "warmup": {
      "recap": [
        {
          "point": "Fiziksel katman (1) bitleri sinyale çevirir ve kabloda taşır.",
          "example": "Elektrik darbesi ya da ışık"
        },
        {
          "point": "Bağdaştırıcı \"Media disconnected\" diyorsa bağlantı kurulamamıştır.",
          "example": "Çıkmış ya da arızalı kablo"
        }
      ],
      "concepts": [
        {
          "term": "Bükümlü çift",
          "tr": "Bakır ağ kablosu",
          "summary": "Birbirine sarılı bakır tel çiftleriyle çalışan, RJ45 ile biten kablodur; kanal uzunluğu genelde 100 m ile sınırlıdır.",
          "example": "Masadan duvar prizine giden Cat6a kablo"
        },
        {
          "term": "Fiber optik",
          "tr": "Işıkla taşıyan kablo",
          "summary": "Veriyi cam lifte ışıkla taşır; elektriksel parazitten etkilenmez ve bakırdan çok uzağa gider. Tek modlu uzun mesafe, çok modlu kısa mesafe içindir.",
          "example": "İki bina arası bağlantı"
        },
        {
          "term": "Konnektör",
          "tr": "Kablo ucu",
          "summary": "Kabloyu cihaza bağlayan uçtur: Ethernet için RJ45, telefon için RJ11, fiber için LC ve SC, kablo TV için F-tipi.",
          "example": "Bakırda RJ45, fiberde LC"
        },
        {
          "term": "Topoloji",
          "tr": "Bağlanış düzeni",
          "summary": "Cihazların birbirine bağlanış biçimidir: yıldız, tam ağ (mesh), halka, bara. Kablo sayısını ve bir arızanın etkisini belirler.",
          "example": "Ev ağında modem merkezde olan yıldız düzen"
        }
      ]
    },
    "blocks": [
      {
        "t": "h",
        "text": "Neden öğreniyoruz?"
      },
      {
        "t": "box",
        "h": "Gerçek talep",
        "text": "Şirket yeni bir depo binası açıyor: ana binaya 800 m uzakta ve arada yüksek gerilim hattı var. Yönetim \"ağ kablosunu çekin\" diyor. Doğru ortamı seçmezsen bağlantı ya hiç kalkmaz ya da sürekli hata verir. Mesafe, hız, parazit ve maliyet kararı bu dersin konusudur."
      },
      {
        "t": "h",
        "text": "Bakır ve fiber: neye göre seçilir"
      },
      {
        "t": "p",
        "text": "Bakır bükümlü çift ucuzdur, kurulumu kolaydır ve RJ45 ile cihazlara doğrudan takılır; ama bir kanal en çok yaklaşık 100 m uzunluğunda olabilir. Daha uzun çekersen sinyal zayıflar, hata ve kopma artar. Bakır elektrik taşıdığı için motor ve yüksek gerilim gibi kaynaklardan parazit alabilir."
      },
      {
        "t": "p",
        "text": "Fiber optik veriyi ışıkla taşır. Elektriksel parazitten etkilenmez, aradaki iki bina elektriksel olarak ayrılmış olur ve kilometrelerce uzağa gidebilir. Karşılığında kablo ve alıcı-verici maliyeti daha yüksektir. Tek modlu fiber uzun, çok modlu fiber kısa mesafe içindir; iki uçtaki modül aynı türde olmalıdır."
      },
      {
        "t": "box",
        "h": "Karar kuralı",
        "text": "100 m'den kısa ve parazit az ise: bakır bükümlü çift (düşük maliyet). Bina arası, uzun mesafe, yüksek gerilim ya da yıldırım riski varsa: fiber. Hız ihtiyacı ve mesafe birlikte değerlendirilir; \"10 Gb/s olsun\" demek tek başına mesafe sorununu çözmez."
      },
      {
        "t": "h",
        "text": "Konnektörler"
      },
      {
        "t": "p",
        "text": "RJ45 sekiz telli Ethernet ucudur. RJ11 daha küçüktür ve telefon hattında kullanılır. Fiberde küçük form faktörlü LC ve kare gövdeli, itip çekilen SC yaygındır. Kablo TV ve geniş bant modemlerin koaksiyel kablosu F-tipi vidalı konnektörle biter. Switch'lerde SFP yuvası, bakır ya da fiber modül takılabilen değiştirilebilir bir alıcı-verici yuvasıdır."
      },
      {
        "t": "h",
        "text": "Topolojiler"
      },
      {
        "t": "p",
        "text": "Yıldız: her cihaz ortadaki switch'e bağlanır; n cihaz için n kablo gerekir. Bir kablo koparsa yalnız o cihaz düşer, ama ortadaki switch arızalanırsa hepsi birbirinden kopar. Tam ağ (full mesh): her cihaz diğer tümüne bağlıdır; n cihaz için n(n-1)/2 bağlantı gerekir. Çok dayanıklıdır ama büyüdükçe kablo sayısı hızla artar."
      },
      {
        "t": "cmd",
        "lang": "bash",
        "calistirma": "atla elle çalıştırılıp doğrulandı: Git Bash, 2026-11-06",
        "text": "for n in 4 6 8; do\n  echo \"$n cihaz: yildiz=$n tam-ag=$((n*(n-1)/2))\"\ndone"
      },
      {
        "t": "box",
        "h": "Halka ve bara",
        "text": "Halka: cihazlar çember hâlinde bağlıdır, veri komşudan komşuya geçer; tek kopma tasarıma göre ağı etkileyebilir. Bara: tüm cihazlar tek omurga kabloya takılıdır; bugün yerel ağlarda neredeyse hiç kullanılmaz. Günümüzün yerel ağları büyük çoğunlukla yıldızdır; büyük ağlarda önemli bağlantılar kısmî mesh ile yedeklenir."
      },
      {
        "t": "p",
        "text": "Fiziksel bağlantı sorunlarında ilk bakılacak yer bağdaştırıcının durumudur. Aşağıdaki komut yalnızca kendi makinenin bağdaştırıcılarını listeler."
      },
      {
        "t": "cmd",
        "lang": "bash",
        "calistirma": "atla elle çalıştırılıp doğrulandı: Git Bash, 2026-11-06 (Windows ipconfig çıktısı, yerel dile göre değişebilir); atla Linux bu makinede yok, ip link show doğrulanamadı",
        "text": "ipconfig | grep -i \"media state\"\n# Linux karşılığı: ip link show"
      },
      {
        "t": "steps",
        "h": "Elle deneme",
        "items": [
          "Komut satırında ipconfig (Linux'ta ip link show) çalıştır.",
          "Her bağdaştırıcının bağlı olup olmadığına bak.",
          "Kullanmadığın bağdaştırıcıda Media disconnected görmeyi bekle.",
          "Bir ağ kablosunu fişten çekip aynı komutu yeniden çalıştır, durumun değiştiğini gör.",
          "Kabloyu geri tak ve durumun düzeldiğini doğrula."
        ]
      },
      {
        "t": "warn",
        "h": "Tuzak",
        "text": "Yeterince kısa görünen bakır kabloda bile mesafe, patch kabloları ve prizler toplanınca 100 m'yi aşabilir. Fiberde ise tek modlu modülü çok modlu fiberle (veya tersiyle) eşleştirmek bağlantıyı hiç kaldırmaz ya da çok hatalı çalıştırır. Kablo çekmeden önce türü ve uzunluğu yazılı kontrol et."
      }
    ],
    "objectives": [
      {
        "id": "h1",
        "text": "Mesafe, hız ve parazit koşuluna göre bakır ya da fiber ortamı seçip gerekçesini söyleyebilirsin."
      },
      {
        "id": "h2",
        "text": "Yıldız ve tam ağ topolojisini kablo sayısı (n ve n(n-1)/2) ile arıza etkisi açısından karşılaştırabilirsin."
      },
      {
        "id": "h3",
        "text": "RJ45, RJ11, LC, SC ve F-tipi konnektörleri doğru kablo ailesiyle eşleştirip bağdaştırıcı bağlantı durumunu okuyabilirsin."
      }
    ],
    "summary": [
      "Bakır bükümlü çift ucuzdur ama kanal yaklaşık 100 m ile sınırlıdır ve paraziti toplar.",
      "Fiber ışıkla taşır, parazitten etkilenmez ve uzağa gider; tek ve çok modlu türler karıştırılmamalı.",
      "Konnektör kablo ailesini gösterir: RJ45 Ethernet, RJ11 telefon, LC ve SC fiber, F-tipi koaksiyel.",
      "Yıldızda n kablo gerekir, merkez arızası hepsini koparır; tam ağda n(n-1)/2 bağlantı gerekir ama çok dayanıklıdır.",
      "Fiziksel bağlantı sorununda önce bağdaştırıcı durumuna (Media disconnected) bak."
    ],
    "prereq": [],
    "minutes": 25,
    "sonDogrulama": "2026-11-06",
    "surum": "1",
    "quiz": [
      {
        "id": "70349903",
        "q": "İki bina arası 800 m ve araya yüksek gerilim hattı giriyor. En uygun ortam hangisidir?",
        "options": [
          "Cat6a bakır: 10 Gb/s destekler, mesafe sorun olmaz",
          "Cat5e bakır: ucuzdur, yüksek gerilimden etkilenmez",
          "F-tipi koaksiyel: kablo TV'de uzun mesafe taşıyor",
          "Tek modlu fiber: ışıkla taşır, parazit almaz"
        ],
        "obj": "h1"
      },
      {
        "id": "bf76dcb5",
        "q": "Masadan odadaki switch'e 60 m, çevrede parazit yok, 1 Gb/s yeterli. En ucuz yeterli çözüm hangisidir?",
        "options": [
          "Cat5e ya da üstü bakır bükümlü çift",
          "Tek modlu fiber ve LC uçlu modüller kullanmak",
          "Koaksiyel kablo ve F-tipi konnektörle bağlanmak",
          "RJ11 telefon kablosuyla doğrudan bağlanmak"
        ],
        "obj": "h1"
      },
      {
        "id": "b05366da",
        "q": "6 bilgisayarı birbirine doğrudan bağlayan tam ağ (full mesh) topolojisinde kaç bağlantı gerekir?",
        "options": [
          "6 bağlantı (cihaz sayısı kadar)",
          "15 bağlantı",
          "30 bağlantı (n x (n-1))",
          "36 bağlantı (n x n)"
        ],
        "obj": "h2"
      },
      {
        "id": "f7ebea55",
        "q": "Yıldız topolojide ortadaki switch arızalanırsa ne olur?",
        "options": [
          "Yalnız switch'e en yakın cihaz ağdan düşer",
          "Cihazlar komşu kablolar üzerinden kendiliğinden haberleşir",
          "O switch'e bağlı tüm cihazlar birbirinden kopar",
          "Yalnız yeni bağlantılar engellenir, mevcutlar sürer"
        ],
        "obj": "h2"
      },
      {
        "id": "9b342992",
        "q": "Bir switch portuna fiber takılacak ama port bakır RJ45 değil, SFP yuvası. Bu yuva ne işe yarar?",
        "options": [
          "Yalnız LC konnektörlü tek tip fiber modülü kabul eder",
          "Switch'in güç kablosunu takmak için ayrılmış yuvadır",
          "Kablosuz erişim için anten bağlanan yuvadır",
          "Bakır ya da fiber modül takılarak port türü seçilir"
        ],
        "obj": "h3"
      },
      {
        "id": "88e480ce",
        "q": "Kablo TV ve geniş bant modeme giden, vidalı F-tipi konnektörlü kablo hangi kablo ailesindendir?",
        "options": [
          "Koaksiyel kablo",
          "Bükümlü çift (UTP) kablo",
          "Çok modlu fiber kablo",
          "RJ11 telefon kablosu"
        ],
        "obj": "h3"
      },
      {
        "id": "0505ee55",
        "q": "Tam ağın (full mesh) yıldız topolojiye göre asıl artısı nedir?",
        "options": [
          "Kablo sayısı daha azdır, kurulum daha ucuzdur",
          "Arızada alternatif yol kalır",
          "Tek merkez cihazla yönetim daha kolaydır",
          "Yeni cihaz eklemek ek kablo gerektirmez"
        ],
        "obj": "h2"
      }
    ],
    "interview": [
      {
        "q": "Bakır mı fiber mi, nasıl karar verirsin?",
        "a": "Önce mesafeye, sonra paraziti ve hız ihtiyacına bakarım. Yaklaşık 100 m içinde ve parazit azsa ucuz olan bakırı; bina arası, uzun mesafe ya da yüksek gerilim/yıldırım riski varsa fiberi seçerim."
      },
      {
        "q": "Yıldız topolojinin en büyük riski nedir, nasıl azaltılır?",
        "a": "Merkez switch tek hata noktasıdır; arızalanırsa bağlı herkes düşer. Yedek switch ve yedek bağlantılarla ya da önemli noktalarda kısmî mesh ile risk azaltılır."
      },
      {
        "q": "Bir bilgisayarda \"Media disconnected\" görüyorsun. Ne yaparsın?",
        "a": "Fiziksel katmandan başlarım: kabloyu ve portu, switch'teki link ışığını, başka bir kabloyu ve ağ kartını sınarım. IP ayarına ancak bağlantı kurulduktan sonra bakarım."
      }
    ],
    "vocab": [
      {
        "term": "Twisted pair",
        "tr": "Bükümlü çift",
        "ex": "Twisted pair cabling is limited to about 100 meters."
      },
      {
        "term": "Fiber optic",
        "tr": "Fiber optik",
        "ex": "Fiber optic cable is immune to electrical interference."
      },
      {
        "term": "Connector",
        "tr": "Konnektör",
        "ex": "An RJ45 connector ends an Ethernet cable."
      },
      {
        "term": "Topology",
        "tr": "Topoloji",
        "ex": "A star topology connects every device to a central switch."
      },
      {
        "term": "Single point of failure",
        "tr": "Tek hata noktası",
        "ex": "The central switch is a single point of failure."
      }
    ],
    "sources": [
      {
        "title": "Cisco Networking Academy",
        "url": "https://www.netacad.com/"
      },
      {
        "title": "RFC 894: A Standard for the Transmission of IP Datagrams over Ethernet Networks",
        "url": "https://www.rfc-editor.org/rfc/rfc894"
      }
    ]
  };

})();

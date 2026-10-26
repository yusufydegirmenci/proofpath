/* CCNA 200-301 / NetAcad ITN + Networking Basics hizası · sabit dersler 24-29 (protokoller, modeller ve kapsülleme; ikili ve onaltılık sayılar; ağ medyası; sorun giderme metodolojisi; proje: ev ağını kur; kontrol noktası). Faz 20.
   Kapsam NetAcad Networking Basics / ITN modül konularıyla karşılaştırıldı (modül listesi: kayıtlı hesap taraması 2026-10-25/26; modül içi metin ve sınav soruları okunmadı) ve CCNA 200-301 alanlarıyla (Cisco sınav sayfası, HTTP 200) hizalandı; sınav maddelerinin ağırlık ve madde numaraları doğrulanmadı. Metinler özgündür, NetAcad/Cisco metninden kopyalanmamıştır.
   Hesaplı sorular (ikili/onaltılık dönüşüm, maske, ağ adresi, havuz boyutu) Node ile ayrıca hesaplanıp doğrulandı. Numaralama: TMAP.ccna dizini + 1 (mevcut 1-23 korunur); ders eki: ccna-ek-2.js, anahtarlar 23-28. Kontrol noktası (ders 29) şemayı değiştirmeden ders-sınavı biçimindedir. */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).ccna = (window.PP_LESSONS.ccna || {}));

  /* 24 ───────────────────────────── Protokoller, modeller ve kapsülleme */
  L[24] = {
    hook: "Bir mektubu postalarken zarfın üstüne alıcı adresi, içine de asıl yazıyı koyarsın; posta aracı başka bir zarfa daha sarar. Ağ da veriyi katman katman zarflar. Bu derste her zarfın adını ve neden var olduğunu öğrenirsin.",
    homework: "Bir web sayfası açtığında olanları kendi cümlenle yaz: tarayıcı isteği hazırlar (uygulama), taşıma hizmeti port ekler, IP adres ekler, ağ kartı MAC ekler. Her adımın yanına verinin o andaki adını (veri, segment, paket, çerçeve, bit) yaz.",
    warmup: {
      recap: [
        { point: "Switch MAC adresine bakar, router IP adresine bakar.", example: "Aynı ağda MAC, ağlar arasında IP" },
        { point: "Protokol, iki tarafın uyduğu kurallar bütünüdür.", example: "HTTP: tarayıcı ile sunucunun konuşma kuralı" }
      ],
      concepts: [
        {
          term: "Protokol",
          tr: "İletişim kuralı",
          summary: "Mesajın biçimini, sırasını ve hata durumunda ne yapılacağını tanımlar.",
          example: "DNS sorgusunun biçimi"
        },
        {
          term: "Kapsülleme (encapsulation)",
          tr: "Her katmanın veriye kendi başlığını eklemesi",
          summary: "Gönderen tarafta yukarıdan aşağıya, alıcı tarafta aşağıdan yukarıya işlenir.",
          example: "Segmente IP başlığı eklenince paket olur"
        },
        {
          term: "PDU",
          tr: "Protokol veri birimi",
          summary: "Her katmanın veriye verdiği ad: veri, segment, paket, çerçeve, bit.",
          example: "Katman 3 PDU'su pakettir"
        }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      {
        t: "box",
        h: "Gerçek talep",
        text: "Ekipte biri 'sorun taşıma katmanında' diyor, öbürü 'hayır, çerçeve bozuk' diyor. Katmanların adını, veri birimlerini ve hangi cihazın hangi katmana baktığını bilmezsen tartışma kısa sürer ama yanlış yere bakarsın."
      },
      { t: "h", text: "Protokol, standart ve model" },
      {
        t: "p",
        text: "Protokol iki tarafın uyduğu kurallardır. Standart, bu kuralların birçok üretici tarafından aynı uygulanması için yazıya dökülmüş hâlidir. İnternet protokollerinin çoğu IETF'nin RFC belgelerinde, Ethernet ve Wi-Fi IEEE standartlarında tanımlıdır. Model ise bu kuralları düşünmek için çizilen bir haritadır."
      },
      {
        t: "steps",
        h: "İki model, iki amaç",
        items: [
          "OSI modeli 7 katmanlı bir başvuru (referans) modelidir: Uygulama, Sunum, Oturum, Taşıma, Ağ, Veri bağlantı, Fiziksel. Amacı kavramları ortak adlarla konuşmak ve sorunu bir katmana indirmektir.",
          "TCP/IP modeli internetin gerçekte kullandığı protokol takımını anlatır. NetAcad ve CCNA'da 4 katman olarak gösterilir: Uygulama, Taşıma, İnternet, Ağ erişimi.",
          "Kısa kural: OSI bir modeldir, bir protokol yığını değildir; TCP/IP ise hem bir modeldir hem de çalışan yığındır. Kimse 'OSI yığını' kurmaz; ürünler TCP/IP ile çalışır, sorun giderirken OSI numaralarıyla konuşuruz.",
          "Eşleşme: OSI 5-6-7 birlikte TCP/IP Uygulama'ya, OSI 4 Taşıma'ya, OSI 3 İnternet'e, OSI 1-2 Ağ erişimi'ne denk gelir."
        ]
      },
      { t: "h", text: "Kapsülleme ve PDU adları" },
      {
        t: "steps",
        h: "Gönderen tarafta yukarıdan aşağıya",
        items: [
          "Uygulama katmanı veriyi hazırlar (ör. HTTP isteği). Bu aşamada ad 'veri'dir.",
          "Taşıma katmanı kaynak ve hedef port ekler. TCP ile PDU 'segment', UDP ile 'datagram' denir (günlük dilde ikisine de segment denebilir).",
          "Ağ (İnternet) katmanı kaynak ve hedef IP adresini ekler. PDU 'paket'tir.",
          "Veri bağlantı katmanı kaynak ve hedef MAC adresini başa, hata denetim değerini (FCS) sona ekler. PDU 'çerçeve'dir.",
          "Fiziksel katman çerçeveyi bitlere çevirip kabloda, fiberde ya da havada sinyal olarak gönderir. PDU 'bit'tir."
        ]
      },
      {
        t: "p",
        text: "Alıcı tarafta işlem tersine gider: bitler çerçeve olur, MAC kontrol edilip başlık atılır, paket IP'ye, segment porta göre uygulamaya iletilir. Buna kapsül açma (de-encapsulation) denir."
      },
      { t: "h", text: "Hangi adres ne zaman değişir?" },
      {
        t: "steps",
        h: "Yerel ve uzak hedef",
        items: [
          "Hedef aynı ağdaysa çerçevenin hedef MAC'i doğrudan hedef cihazın MAC'idir.",
          "Hedef başka ağdaysa hedef MAC varsayılan ağ geçidinin (router arayüzünün) MAC'idir; hedef IP ise uzak cihazın IP'sidir.",
          "Router her atlamada çerçeveyi açar, yeni bir MAC çifti ile yeniden çerçeveler. IP adresleri uçtan uca aynı kalır (NAT yoksa), MAC adresleri atlama atlama değişir."
        ]
      },
      {
        t: "box",
        h: "Aynı katmanlar konuşur",
        text: "Gönderen cihazın taşıma katmanı yalnız alıcı cihazın taşıma katmanıyla 'konuşur' (aynı katman etkileşimi). Aşağıdaki katman ise yukarıdakine hizmet verir (bitişik katman etkileşimi). Bu ayrım, bir katmanı değiştirirken (ör. Wi-Fi'ye geçmek) üst katmanları değiştirmek zorunda kalmamanı sağlar."
      },
      {
        t: "warn",
        h: "Tuzak",
        text: "'Router ağ katmanında çalışır' demek 'router'da yalnız katman 3 vardır' demek değildir; her cihaz kendi arayüzünde alt katmanları da çalıştırır. Ayrıca MAC adresi uçtan uca taşınmaz; her atlamada değişir."
      }
    ],
    objectives: [
      { id: "h1", text: "OSI ile TCP/IP katmanlarını eşleyip OSI'nin bir model, TCP/IP'nin çalışan protokol takımı olduğunu söyleyebilirsin." },
      { id: "h2", text: "Kapsülleme sırasında her katmanın PDU adını ve eklediği bilgiyi (port, IP, MAC/FCS) sıralayabilirsin." },
      { id: "h3", text: "Yerel ve uzak hedefte çerçevenin hedef MAC ve hedef IP adresinin ne olduğunu belirleyebilirsin." },
      { id: "h4", text: "Standart kuruluşlarının (IETF, IEEE) hangi alanı belirlediğini ayırt edebilirsin." }
    ],
    summary: [
      "OSI 7 katmanlı bir başvuru modelidir, TCP/IP internetin kullandığı protokol takımıdır; OSI bir model, bir yığın değildir.",
      "Kapsülleme sırası: veri, segment (datagram), paket, çerçeve, bit.",
      "Taşıma katmanı port, ağ katmanı IP, veri bağlantı katmanı MAC ve FCS ekler.",
      "Uzak hedefte hedef MAC ağ geçidinindir, hedef IP uzak cihazındır; MAC her atlamada değişir, IP uçtan uca kalır.",
      "IETF internet protokollerini (RFC), IEEE Ethernet ve Wi-Fi gibi bağlantı standartlarını tanımlar."
    ],
    prereq: [
      1
    ],
    minutes: 25,
    sonDogrulama: "2026-10-26",
    surum: "2026-10-v1",
    interview: [
      {
        q: "OSI modeli ile TCP/IP arasındaki fark nedir?",
        a: "OSI 7 katmanlı bir başvuru modelidir, kavramları ortak adlarla konuşmamızı sağlar. TCP/IP internetin gerçekte çalışan protokol takımıdır ve 4 katmanlı gösterilir. OSI bir model, bir yığın değildir; sorun gidermede OSI numaralarını, çalışan sistemde TCP/IP protokollerini kullanırım."
      },
      {
        q: "Kapsülleme nedir, PDU adları nelerdir?",
        a: "Her katmanın veriye kendi başlığını eklemesidir. Sıra: veri, segment (UDP'de datagram), paket, çerçeve, bit. Taşıma port, ağ IP, veri bağlantı MAC ve FCS ekler."
      },
      {
        q: "Uzak bir sunucuya giden çerçevede hedef MAC kimindir?",
        a: "Varsayılan ağ geçidinin. Hedef IP sunucuyu gösterir ama sunucunun MAC'i uzak ağda olduğu için gönderen onu bilmez; router her atlamada MAC'i yeniden yazar."
      }
    ],
    vocab: [
      { term: "Encapsulation", tr: "kapsülleme", ex: "Encapsulation adds a header at each layer." },
      { term: "PDU", tr: "protokol veri birimi", ex: "The PDU at layer 2 is a frame." },
      { term: "Segment", tr: "taşıma katmanı veri birimi", ex: "A TCP segment carries port numbers." },
      { term: "Reference model", tr: "başvuru modeli", ex: "OSI is a reference model." },
      { term: "Default gateway", tr: "varsayılan ağ geçidi", ex: "Traffic to other networks goes to the default gateway." }
    ],
    sources: [
      { title: "RFC 1122: İnternet ana bilgisayar gereksinimleri (katmanlı yapı)", url: "https://www.rfc-editor.org/rfc/rfc1122" },
      { title: "Cisco CCNA 200-301 sınav sayfası", url: "https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccna.html" }
    ],
    quiz: [
      { id: "28c29366", q: "Aşağıdakilerden hangisi OSI için doğru bir ifadedir?", options: ["Yalnız üreticilerin ürün kutusuna yazdığı bir pazarlama terimidir","Kavramları ortak adlarla konuşmak ve sorunu katmana indirmek için kullanılan 7 katmanlı bir başvuru modelidir","TCP/IP'nin yerini alan yeni nesil protokol takımıdır","Yalnızca kablosuz ağlar için tanımlanmıştır"], obj: "h1" },
      { id: "3c35b863", q: "OSI'nin Taşıma, Ağ ve Veri bağlantı katmanlarının veri birimleri sırasıyla hangisidir?", options: ["Segment, paket, çerçeve","Paket, segment, çerçeve","Çerçeve, paket, bit","Veri, çerçeve, segment"], obj: "h2" },
      { id: "8aacf595", q: "Bir cihaz TCP segmentine IP başlığı eklediğinde ortaya çıkan veri birimine ne denir?", options: ["Çerçeve","Segment","Bit","Paket"], obj: "h2" },
      { id: "3b7cf865", q: "Veri bağlantı katmanı kapsülleme sırasında çerçeveye neler ekler?", options: ["Kaynak ve hedef port numaraları","Kaynak ve hedef IP adresleri","Kaynak ve hedef MAC adresleri ile sona FCS","Yalnız VLAN adı"], obj: "h2" },
      { id: "b760f551", q: "PC-A başka bir ağdaki sunucuya paket gönderiyor. Çerçevedeki hedef MAC ve hedef IP adresi kimindir?", options: ["Hedef MAC sunucunun, hedef IP ağ geçidinin","Hedef MAC varsayılan ağ geçidinin, hedef IP sunucunun","İkisi de varsayılan ağ geçidinin","İkisi de sunucunun"], obj: "h3" },
      { id: "95b70bb0", q: "Bir paket üç router'dan geçerek hedefe ulaşıyor (NAT yok). Hangisi doğrudur?", options: ["Kaynak ve hedef IP aynı kalır, MAC adresleri her atlamada değişir","IP ve MAC adresleri değişmeden kalır","Kaynak IP her atlamada router'ın IP'si olur","Hedef IP her atlamada bir sonraki router olur"], obj: "h3" },
      { id: "cd80e0ec", q: "OSI ile TCP/IP eşleşmesinde OSI'nin Uygulama, Sunum ve Oturum katmanları TCP/IP'de nereye denk gelir?", options: ["Taşıma katmanına","İnternet katmanına","Ağ erişimi katmanına","Uygulama katmanına"], obj: "h1" },
      { id: "b966a288", q: "Aynı katman etkileşimi (same-layer interaction) ne anlatır?", options: ["Bir katmanın hiç alt katman kullanmaması","İki katmanın aynı cihazda birleşmesi","Gönderenin bir katmanının alıcıdaki aynı katmanla protokolü üzerinden konuşması","Yalnız fiziksel katmanın kabloyla konuşması"], obj: "h1" },
      { id: "2b939b16", q: "Aşağıdakilerden hangisi IEEE'nin standartlaştırdığı alana örnektir?", options: ["HTTP ve DNS gibi internet protokol belgeleri (RFC)","Ethernet ve Wi-Fi bağlantı standartları","IP adres bloklarının bölgelere ve kuruluşlara dağıtımı","Alan adı kayıt ücretleri"], obj: "h4" },
      { id: "54f81797", q: "Alıcı tarafta kapsül açma sırasında çerçeve MAC kontrolünden geçtikten sonra ne olur?", options: ["MAC başlığı atılır ve içindeki paket ağ katmanına iletilir","Çerçeve doğrudan uygulamaya verilir","Çerçeve hedef MAC'e geri gönderilir","IP başlığı eklenir"], obj: "h2" }
    ]
  };

  /* 25 ───────────────────────────── İkili ve onaltılık sayılar */
  L[25] = {
    hook: "Bilgisayar yalnız iki rakam bilir: 0 ve 1. IP adresini, maskeyi ve MAC adresini okuyabilmek için bu iki sayı sistemini ve onaltılık yazımı elle çevirmeyi öğrenirsin. Subnetting dersinden önce çalışılması önerilir.",
    homework: "Kendi bilgisayarının IP adresini yaz, dört sekizlisini kâğıtta ikiliye çevir. Sonra aynı bilgisayarın MAC adresinin ilk iki hex basamağını (ör. 5E) 4 bitlik gruplarla ikiliye çevir.",
    warmup: {
      recap: [
        { point: "IPv4 adresi 32 bittir; dört sekizliden (oktet) oluşur.", example: "192.168.10.77" },
        { point: "MAC adresi 48 bittir ve hex yazılır.", example: "00:1A:2B:3C:4D:5E" }
      ],
      concepts: [
        {
          term: "İkili (binary)",
          tr: "Taban 2",
          summary: "Her bit 0 ya da 1'dir; sekiz bitin ağırlıkları 128, 64, 32, 16, 8, 4, 2, 1'dir.",
          example: "11000000 = 128 + 64 = 192"
        },
        {
          term: "Onaltılık (hexadecimal)",
          tr: "Taban 16",
          summary: "0-9 ve A-F kullanır; bir hex basamağı tam 4 bittir.",
          example: "F = 1111, A = 1010"
        },
        {
          term: "Sekizli (oktet)",
          tr: "8 bitlik grup",
          summary: "Bir IPv4 adresinin noktalarla ayrılan her bölümü.",
          example: "192.168.10.77 adresinde 4 oktet var"
        }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      {
        t: "box",
        h: "Gerçek talep",
        text: "Biri sana '255.255.255.224 maskesi kaç bit?' ya da 'MAC adresinin üreticiyi gösteren ilk yarısı hangisi?' diye soruyor. Cevap sayı sistemlerinde saklı: maske ardışık 1'lerden ve 0'lardan oluşur, MAC hex yazılır."
      },
      { t: "h", text: "İkiliden ondalığa" },
      {
        t: "p",
        text: "Bir sekizlinin sekiz bitinin ağırlıkları soldan sağa 128, 64, 32, 16, 8, 4, 2, 1'dir. Değerini bulmak için 1 olan bitlerin ağırlıklarını topla."
      },
      {
        t: "steps",
        h: "Örnek: 11001001",
        items: [
          "1 olan bitler: 128, 64, 8 ve 1.",
          "Toplam: 128 + 64 + 8 + 1 = 201.",
          "Kontrol: sekiz bitle en fazla 255 (11111111) yazılır; sonuç 255'i geçmemeli."
        ]
      },
      { t: "h", text: "Ondalıktan ikiliye" },
      {
        t: "steps",
        h: "Örnek: 172",
        items: [
          "128 sığar mı? Evet, 1. Kalan 172 - 128 = 44.",
          "64 sığar mı? Hayır, 0.",
          "32 sığar mı? Evet, 1. Kalan 12.",
          "16 sığar mı? Hayır, 0. 8 sığar mı? Evet, 1. Kalan 4.",
          "4 sığar mı? Evet, 1. Kalan 0. 2 ve 1: 0, 0.",
          "Sonuç: 10101100."
        ]
      },
      { t: "h", text: "Onaltılık sayılar" },
      {
        t: "p",
        text: "Hex 16 değer kullanır: 0-9, sonra A=10, B=11, C=12, D=13, E=14, F=15. Her hex basamağı tam 4 bittir; bu yüzden ikili sayıyı sağdan 4'erli gruplayıp çevirmek kolaydır. Bir sekizli iki hex basamağıdır."
      },
      {
        t: "steps",
        h: "Örnekler",
        items: [
          "5E: 5 = 0101, E = 1110. Birleşik 01011110.",
          "200: 128+64+8 = 11001000, gruplar 1100 ve 1000, yani C8.",
          "2F: 2x16 + 15 = 47.",
          "255 = 11111111 = FF."
        ]
      },
      { t: "h", text: "Ağ işinde nerede çıkar?" },
      {
        t: "steps",
        h: "Kullanım yerleri",
        items: [
          "IPv4 maskesi ardışık 1'lerle başlar: 255.255.255.224 son oktette 11100000'dır, yani 3 ek bit; toplam /27.",
          "Ağ adresi, IP ile maskenin bit düzeyinde VE işlemiyle bulunur: 192.168.10.77 ve /26: 77 = 01001101, 192 = 11000000, VE sonucu 01000000 = 64. Ağ adresi 192.168.10.64.",
          "Host sayısı: kalan host bitleri h ise 2 üzeri h eksi 2. /27'de 5 host biti var: 32 - 2 = 30.",
          "MAC adresi 48 bit = 12 hex basamak; IPv6 adresi 128 bit = 32 hex basamak, 16 bitlik 8 grupta (4 hex basamak) yazılır."
        ]
      },
      {
        t: "cmd",
        lang: "text",
        calistirma: "atla elle hesap; Windows Hesap Makinesi'nin Programcı kipi ile kontrol edebilirsin",
        text: "Elle hesap şablonu:\n  128  64  32  16   8   4   2   1\n    1   1   0   0   1   0   0   1  = 201\nHex gruplama:  1100 1001 -> C 9 -> C9"
      },
      {
        t: "warn",
        h: "Tuzak",
        text: "Ondalık 10 ile ikili 10 aynı şey değildir (ikili 10 = ondalık 2). Hex '10' ise ondalık 16'dır. Ayrıca MAC adresindeki 'B' harfi 11'dir, B'yi sayı sanıp atlama."
      }
    ],
    objectives: [
      { id: "h1", text: "Bir sekizliyi ikiliden ondalığa ve ondalıktan ikiliye çevirebilirsin." },
      { id: "h2", text: "İkili ile onaltılık arasında 4 bitlik gruplarla dönüşüm yapabilirsin." },
      { id: "h3", text: "Maskeyi önek uzunluğuna çevirebilir ve host sayısını hesaplayabilirsin." },
      { id: "h4", text: "IP ile maskenin bit düzeyinde VE işlemiyle ağ adresini bulabilirsin." }
    ],
    summary: [
      "Sekiz bitin ağırlıkları 128, 64, 32, 16, 8, 4, 2, 1'dir; 1 olan bitlerin toplamı sekizlinin değeridir.",
      "Bir hex basamağı 4 bittir: A=1010, F=1111; bir sekizli iki hex basamaktır.",
      "Maske ardışık 1'lerden oluşur; 1'lerin sayısı önek uzunluğudur.",
      "Ağ adresi = IP VE maske; host sayısı = 2^h - 2.",
      "MAC 48 bit (12 hex), IPv6 128 bit (32 hex) uzunluğundadır."
    ],
    prereq: [
      2
    ],
    minutes: 25,
    sonDogrulama: "2026-10-26",
    surum: "2026-10-v1",
    interview: [
      {
        q: "Bir IP adresinin hangi ağda olduğunu ikili düzeyde nasıl bulursun?",
        a: "IP adresi ile maskeyi bit bit VE işlemine sokarım. Maskenin 1 olduğu yerler adresin ağ kısmını korur, 0 olan yerler host bitlerini sıfırlar. Sonuç ağ adresidir."
      },
      {
        q: "Neden hex kullanılır?",
        a: "Bir hex basamağı tam 4 bittir; uzun ikili dizileri kısa ve hatasız yazar. MAC ve IPv6 adresleri bu yüzden hex yazılır."
      }
    ],
    vocab: [
      { term: "Binary", tr: "ikili", ex: "Convert the octet to binary." },
      { term: "Hexadecimal", tr: "onaltılık", ex: "A MAC address is written in hexadecimal." },
      { term: "Octet", tr: "sekizli (8 bit)", ex: "An IPv4 address has four octets." },
      { term: "Bitwise AND", tr: "bit düzeyinde VE", ex: "A bitwise AND gives the network address." },
      { term: "Prefix length", tr: "önek uzunluğu", ex: "A /27 prefix length has 27 network bits." }
    ],
    sources: [
      { title: "Cisco Networking Academy: Networking Basics", url: "https://www.netacad.com/courses/networking-basics" },
      { title: "Cisco CCNA 200-301 sınav sayfası", url: "https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccna.html" }
    ],
    quiz: [
      { id: "768650a3", q: "İkili 11001001 sayısının ondalık değeri nedir?", options: ["199","205","209","201"], obj: "h1" },
      { id: "85e7f6c5", q: "Ondalık 172 sayısı ikilide nasıl yazılır?", options: ["10101010","11001100","10101100","10110100"], obj: "h1" },
      { id: "595538d6", q: "Hex 5E sayısının ikili karşılığı hangisidir?", options: ["01101110","01011110","01010111","11100101"], obj: "h2" },
      { id: "431fcac8", q: "Ondalık 200 sayısının onaltılık karşılığı nedir?", options: ["C8","C0","8C","D8"], obj: "h2" },
      { id: "7eced371", q: "Hex 2F ondalık olarak kaçtır?", options: ["35","215","37","47"], obj: "h2" },
      { id: "2eb75ed0", q: "255.255.255.224 maskesinin önek uzunluğu kaçtır?", options: ["/25","/26","/27","/28"], obj: "h3" },
      { id: "a5ea4f47", q: "/27 önekli bir ağda kaç kullanılabilir host adresi vardır?", options: ["32","30","62","14"], obj: "h3" },
      { id: "7780a495", q: "192.168.10.77 adresi /26 maskesiyle VE işlemine sokulursa ağ adresi ne çıkar?", options: ["192.168.10.64","192.168.10.0","192.168.10.77","192.168.10.128"], obj: "h4" },
      { id: "731c90a1", q: "172.16.45.9 adresinin /20 maskesiyle ağ adresi nedir?", options: ["172.16.45.0","172.16.40.0","172.16.0.0","172.16.32.0"], obj: "h4" },
      { id: "bbb2d26b", q: "MAC adresi kaç bit ve kaç hex basamaktır?", options: ["32 bit, 8 hex basamak","64 bit, 16 hex basamak","48 bit, 12 hex basamak","128 bit, 32 hex basamak"], obj: "h2" },
      { id: "8febccfa", q: "Bir hex basamağı tam olarak kaç bittir?", options: ["2","4","8","16"], obj: "h2" }
    ]
  };

  /* 26 ───────────────────────────── Ağ medyası: UTP, fiber ve Wi-Fi bantları */
  L[26] = {
    hook: "İki cihaz arasındaki yol bakır kablo, cam elyaf ya da hava olabilir. Hangisinin ne kadar uzağa, ne hızda ve hangi parazit altında gittiğini bilmek ağ tasarımının ilk adımıdır.",
    homework: "Evindeki ya da okuldaki en az üç bağlantıyı listele (ör. modem-bilgisayar kablosu, Wi-Fi, fiber hat). Her birinin ortamını (bakır, fiber, kablosuz) ve tahmini uzunluğunu yaz. Wi-Fi ayarında telefonunun 2.4 ya da 5 GHz'e bağlı olduğunu bulmaya çalış.",
    warmup: {
      recap: [
        { point: "Fiziksel katman bitleri sinyale çevirir.", example: "Elektrik, ışık ya da radyo dalgası" },
        {
          point: "Bant genişliği teorik kapasite, iş çıkarma (throughput) gerçek hızdır.",
          example: "1 Gb/s bağlantıda gerçek hız genelde daha düşüktür"
        }
      ],
      concepts: [
        {
          term: "UTP",
          tr: "Korumasız çift bükümlü kablo",
          summary: "4 bükümlü bakır çift taşır; bükülme parazit etkisini azaltır. Kanal en çok 100 m.",
          example: "Ofis duvarındaki Cat 6 kablo"
        },
        {
          term: "Çok kipli ve tek kipli fiber",
          tr: "Işıkla taşıyan cam elyaf",
          summary: "Çok kipli kısa mesafede LED ya da VCSEL, tek kipli ince çekirdekle çok uzun mesafede lazer kullanır.",
          example: "Bina içi omurga çok kipli, şehirler arası tek kipli"
        },
        {
          term: "EMI",
          tr: "Elektromanyetik parazit",
          summary: "Bakırda sinyali bozabilir; fiber ışık taşıdığı için etkilenmez.",
          example: "Floresan lamba yanındaki kablo"
        }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      {
        t: "box",
        h: "Gerçek talep",
        text: "Depodaki iki bina arasında 300 metre var ve arada büyük bir motor atölyesi bulunuyor. UTP kablo çekersen sınırı ve parazit sorununu aşarsın; doğru ortam seçimi için sınırları bilmelisin."
      },
      { t: "h", text: "Bakır: UTP" },
      {
        t: "steps",
        h: "UTP kabloların ana noktaları",
        items: [
          "UTP, 4 çift bükümlü telden oluşur; bükülme komşu çiftlerin birbirine karışmasını (crosstalk) azaltır. STP/FTP gibi korumalı türler ek koruma ekler.",
          "Kategori ne kadar yüksekse hız ve bant genişliği o kadar yüksektir: Cat 5e 1 Gb/s'yi, Cat 6/6a 10 Gb/s'yi destekleyebilir (Cat 6'da 10 Gb/s kısa mesafede, Cat 6a'da 100 m kanalda).",
          "Ethernet bakır kanalı en çok 100 m olmalıdır (kablo, yama kabloları ve bağlantılar dahil). Daha uzak mesafede araya switch ya da fiber gerekir.",
          "Uçlar RJ-45 konnektörüyle sonlanır. T568A ve T568B iki renk sırası standardıdır. Uçlar aynı standartla bitmişse düz (straight-through) kablo olur; farklıysa çapraz kablo olur. Bugünkü cihazların çoğu Auto-MDIX ile türü kendisi bulur."
        ]
      },
      {
        t: "p",
        text: "Düz kablo genellikle farklı tür cihazları (PC-switch, switch-router) bağlar; çapraz kablo aynı tür cihazları (switch-switch) bağlardı. Auto-MDIX sayesinde artık ikisi de çalışabilir."
      },
      { t: "h", text: "Fiber" },
      {
        t: "steps",
        h: "Fiber ortamı",
        items: [
          "Fiber ışık taşır; EMI'dan etkilenmez, çok uzun mesafe ve yüksek hız sağlar, dinlemesi zordur.",
          "Çok kipli (multimode): kalın çekirdek, LED/VCSEL ışık kaynağı, kısa mesafe (genelde bina ya da yerleşke içi, yüzlerce metre).",
          "Tek kipli (single-mode): çok ince çekirdek, lazer, kilometrelerce mesafe (şehirler arası, servis sağlayıcı).",
          "Bakıra göre pahalı ve kurulum becerisi gerektirir; konnektör ve uç kirliliği kaybı artırır.",
          "Her yön için ayrı bir fiber kullanılır; bu yüzden fiber hatlar çiftler hâlinde gelir (gönderme ve alma)."
        ]
      },
      { t: "h", text: "Kablosuz: Wi-Fi bantları" },
      {
        t: "steps",
        h: "Bantlar ve standartlar",
        items: [
          "2.4 GHz: menzili uzun, duvar geçişi iyi, kanal sayısı az ve kalabalık; çakışmayan kanallar 1, 6 ve 11'dir (ABD kanal planında; kanal kümesi bölgeye göre değişir). Mikrodalga ve Bluetooth gibi cihazlar da parazit yapar.",
          "5 GHz: daha çok kanal, daha az parazit ve yüksek hız; menzil kısa, duvar geçişi daha zayıftır.",
          "6 GHz (Wi-Fi 6E ve sonrası): daha da geniş temiz kanallar; menzil kısa ve cihaz desteği gerekir.",
          "802.11n (Wi-Fi 4) 2.4 ve 5 GHz'de, 802.11ac (Wi-Fi 5) yalnız 5 GHz'de, 802.11ax (Wi-Fi 6) 2.4 ve 5 GHz'de (6E ile 6 GHz'de) çalışır.",
          "Kablosuz ortak ortamdır ve yarı çift yönlüdür: aynı kanalı kullanan cihazlar sırayla konuşur (CSMA/CA)."
        ]
      },
      {
        t: "box",
        h: "Hangisini seç?",
        text: "Masaüstü bilgisayar ve sunucu için mümkünse kablo: daha hızlı, kararlı ve güvenli. Gezici cihaz için Wi-Fi; kalabalık ortamda 5 GHz, uzak oda ve çok duvar için 2.4 GHz. Binalar arası kilometreler için tek kipli fiber."
      },
      {
        t: "warn",
        h: "Tuzak",
        text: "'Cat 6 kablo her zaman 10 Gb/s verir' doğru değildir; mesafe, kanal kalitesi ve uç cihaz belirler. Ayrıca 100 m sınırı yalnız bakır içindir, fiber için geçerli değildir."
      }
    ],
    objectives: [
      { id: "h1", text: "UTP kablonun sınırlarını (100 m kanal, kategori, düz/çapraz) açıklayabilirsin." },
      { id: "h2", text: "Çok kipli ve tek kipli fiberi mesafe ve ışık kaynağı açısından ayırt edebilirsin." },
      { id: "h3", text: "2.4, 5 ve 6 GHz bantlarının menzil ve kalabalık açısından ödünleşimini söyleyebilirsin." },
      { id: "h4", text: "Bir senaryoya göre uygun ortamı (UTP, fiber, Wi-Fi) seçebilirsin." }
    ],
    summary: [
      "UTP'de Ethernet kanalının üst sınırı 100 m'dir; kategoriler hız ve bant genişliğini belirler.",
      "Düz kablo farklı tür, çapraz kablo aynı tür cihazları bağlardı; Auto-MDIX bunu otomatikleştirir.",
      "Fiber EMI'dan etkilenmez; çok kipli kısa, tek kipli çok uzun mesafe içindir.",
      "2.4 GHz uzun menzil ama kalabalık (kanal 1, 6, 11), 5 ve 6 GHz hızlı ama kısa menzilli.",
      "Kablosuz ortamda aynı kanalı kullanan cihazlar ortak yayın alanını paylaşır."
    ],
    prereq: [
      1
    ],
    minutes: 20,
    sonDogrulama: "2026-10-26",
    surum: "2026-10-v1",
    interview: [
      {
        q: "UTP kablonun sınırı nedir, aşılırsa ne yaparsın?",
        a: "Ethernet bakır kanalı en çok 100 m'dir. Aşmak gerekirse araya switch koyarım ya da fiber kullanırım."
      },
      {
        q: "Tek kipli ile çok kipli fiber farkı nedir?",
        a: "Tek kipli ince çekirdek ve lazerle kilometrelerce, çok kipli kalın çekirdek ve LED/VCSEL ile yüzlerce metreye kadar kullanılır. İkisi de EMI'dan etkilenmez."
      },
      {
        q: "2.4 ve 5 GHz arasında nasıl seçersin?",
        a: "Menzil ve duvar geçişi için 2.4 GHz, hız ve az parazit için 5 GHz (ya da 6 GHz). 2.4 GHz'de çakışmayan kanallar 1, 6 ve 11'dir."
      }
    ],
    vocab: [
      { term: "Twisted pair", tr: "çift bükümlü kablo", ex: "UTP is a twisted pair cable." },
      { term: "Single-mode fiber", tr: "tek kipli fiber", ex: "Single-mode fiber reaches long distances." },
      { term: "Crosstalk", tr: "çiftler arası karışma", ex: "Twisting reduces crosstalk." },
      { term: "Channel", tr: "kanal", ex: "Pick a less crowded channel." },
      { term: "Interference", tr: "parazit", ex: "Microwaves cause interference on 2.4 GHz." }
    ],
    sources: [
      { title: "Cisco Networking Academy: Networking Basics", url: "https://www.netacad.com/courses/networking-basics" },
      { title: "Cisco CCNA 200-301 sınav sayfası", url: "https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccna.html" },
      { title: "Wi-Fi Alliance: Wi-Fi güvenliği ve sürümleri", url: "https://www.wi-fi.org/discover-wi-fi/security" }
    ],
    quiz: [
      { id: "3b1df059", q: "Bir Ethernet bakır kablo kanalının standart üst sınırı kaçtır?", options: ["100 metre","10 metre","550 metre","1 kilometre"], obj: "h1" },
      { id: "8c8730f6", q: "İki switch arasında 450 m uzaklık var ve araya güç kaynağı ve motor gibi parazit kaynakları giriyor. En uygun ortam hangisidir?", options: ["Cat 6 UTP","Cat 5e UTP","2.4 GHz Wi-Fi köprüsü","Fiber"], obj: "h4" },
      { id: "0d8de6bf", q: "Tek kipli fiber ile çok kipli fiber arasındaki temel fark hangisidir?", options: ["Tek kipli bakırdır, çok kipli cam elyaftır","Çok kipli daha uzun mesafe gider","Tek kipli ince çekirdek ve lazerle çok uzun mesafe sağlar, çok kipli daha kalın çekirdekle kısa mesafede kullanılır","Tek kipli EMI'dan etkilenir, çok kipli etkilenmez"], obj: "h2" },
      { id: "4c6a3da4", q: "Fiberin bakıra göre avantajı hangisidir?", options: ["Kurulumu her zaman daha ucuzdur","EMI'dan etkilenmez ve uzun mesafede yüksek hız sunar","Güç (PoE) taşıyabilir","Konnektör kirliliğinden etkilenmez"], obj: "h2" },
      { id: "47e14578", q: "Farklı tür iki cihazı (PC ile switch) eski donanımlarda bağlamak için hangi kablo kullanılırdı?", options: ["Düz (straight-through) kablo","Çapraz (crossover) kablo, TX-RX uçları ters bağlı","Konsol (rollover) kablo","Koaksiyel kablo, eski Ethernet ortamı"], obj: "h1" },
      { id: "a46d9d7f", q: "Auto-MDIX ne işe yarar?", options: ["Kablonun uzunluğunu otomatik kısaltır","VLAN atamasını otomatik yapar","Gücü (PoE) açar","Port, kablonun düz ya da çapraz olduğunu algılayıp gönderme ve alma çiftlerini otomatik ayarlar"], obj: "h1" },
      { id: "29a46c6d", q: "2.4 GHz bandı için hangisi doğrudur?", options: ["En yüksek hızı ve en çok kanalı sunar","Yalnız 802.11ac ile kullanılır","Menzili uzun ve duvar geçişi iyidir ama kanal sayısı azdır ve kalabalıktır","Hiçbir parazitten etkilenmez"], obj: "h3" },
      { id: "f2a37058", q: "Yoğun bir ofiste hız ve parazitsiz kanal önemliyse hangi Wi-Fi bandı daha uygundur?", options: ["Yalnız 2.4 GHz","5 GHz (ya da destekleniyorsa 6 GHz)","Bluetooth bandı","Fiziksel kablo olmadığı için hiçbiri"], obj: "h3" },
      { id: "9f13c0d9", q: "802.11ac (Wi-Fi 5) hangi bandı kullanır?", options: ["Yalnız 5 GHz","Yalnız 2.4 GHz","2.4 ve 5 GHz birlikte","Yalnız 6 GHz"], obj: "h3" },
      { id: "2c82df3d", q: "Wi-Fi'de aynı kanalı kullanan cihazlar için hangisi doğrudur?", options: ["Her biri ayrı bir collision domain'de olur","Aynı anda tam hızla konuşabilirler","Kanal sayısı hız etkisi yaratmaz","Ortak yayın alanını paylaşırlar ve sırayla konuşurlar"], obj: "h3" }
    ]
  };

  /* 27 ───────────────────────────── Sorun giderme metodolojisi */
  L[27] = {
    hook: "Bir kullanıcı 'internet yok' dediğinde rastgele ayar değiştirmek yerine yöntemle ilerlersin: sorunu tanımla, kuram kur, sına, çöz, doğrula, kaydet. Araçların (ping, traceroute, show) her birinin cevabı bir katmanı eler.",
    homework: "Bilgisayarında sırayla ping 127.0.0.1, kendi IP'n, varsayılan ağ geçidin, 8.8.8.8 ve bir alan adı dene. Hangi adımda hata alacağını tahmin et ve bunun hangi katmanı gösterdiğini yaz. Başkasının cihazına ya da ağına dokunma.",
    warmup: {
      recap: [
        { point: "OSI katmanları sorunu daraltmaya yarar.", example: "Link ışığı yoksa katman 1" },
        { point: "ICMP, ağ durumunu bildiren yardımcı protokoldür.", example: "ping ICMP echo kullanır" }
      ],
      concepts: [
        {
          term: "Yukarıdan aşağı, aşağıdan yukarı, böl ve yönet",
          tr: "Üç katman yaklaşımı",
          summary: "Uygulamadan başla, fizikselden başla ya da ortadan (genelde katman 3) başlayıp yön seç.",
          example: "Ping ağ geçidine gidiyorsa sorun katman 3 altında değildir"
        },
        {
          term: "ping",
          tr: "Erişilebilirlik testi",
          summary: "ICMP echo isteği gönderir, yanıt gelir mi ve ne kadar sürede gelir ölçer.",
          example: "ping 192.168.1.1"
        },
        {
          term: "traceroute",
          tr: "Yol izleme",
          summary: "TTL değerini 1, 2, 3 diye artırarak yoldaki her router'ı listeler (Windows'ta tracert).",
          example: "tracert 8.8.8.8"
        }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      {
        t: "box",
        h: "Gerçek talep",
        text: "Muhasebede biri 'siteye giremiyorum' diyor. Kabloyu mu çekmeli, DNS'i mi değiştirmeli, router'ı mı yeniden başlatmalı? Sırayla ve kanıtla ilerlemezsen bir şeyi düzeltirken iki şeyi bozarsın."
      },
      { t: "h", text: "Genel süreç" },
      {
        t: "steps",
        h: "Adımlar",
        items: [
          "Sorunu belirle: ne bozuk, kime, ne zamandan beri, ne değişti? Kanıt topla (hata mesajı, ekran görüntüsü, ışıklar).",
          "Olası nedeni (kuram) kur: en basit ve en olası nedenden başla.",
          "Kuramı sına: tek değişken değiştir, sonucu gözle. Kuram yanlışsa yenisini kur; gerekirse yükselt (escalate).",
          "Eylem planı yap ve uygula: etkisini ve geri alma yolunu düşün; gerekirse onay al.",
          "Çalıştığını doğrula ve olası ek önlemleri düşün (aynı sorun başkasında da var mı).",
          "Belgeleri güncelle: ne oldu, ne yapıldı, sonuç ne."
        ]
      },
      { t: "h", text: "Üç yaklaşım" },
      {
        t: "steps",
        h: "Katman katman",
        items: [
          "Aşağıdan yukarı: fiziksel (kablo, ışık, güç) ile başla. Fiziksel sorundan şüphelenirsen ya da ağ yeniyse iyidir.",
          "Yukarıdan aşağı: kullanıcının uygulamasıyla başla. Tek bir uygulama bozuksa iyidir.",
          "Böl ve yönet: ortadan (ör. ağ geçidine ping) başla; başarılıysa üst, başarısızsa alt katmana git. Deneyim gerekirse hızlıdır."
        ]
      },
      { t: "h", text: "Araçlar: bilgisayar tarafı" },
      {
        t: "steps",
        h: "Sırayla ping",
        items: [
          "ping 127.0.0.1: kendi TCP/IP yığının çalışıyor mu (ağ kartına çıkmaz).",
          "Kendi IP'n: arayüz yapılandırılmış mı.",
          "Varsayılan ağ geçidi: yerel ağ (katman 2-3) tamam mı. Başarısızsa kablo, VLAN, IP/maske ya da ağ geçidi yanlışlığına bak.",
          "Uzak IP (ör. 8.8.8.8): ağ dışı yönlendirme ve NAT tamam mı.",
          "Uzak alan adı: DNS çalışıyor mu. IP'ye ping gidiyor, ada gitmiyorsa DNS sorunu vardır.",
          "tracert/traceroute: yolda nerede kesildiğini gösterir. Yıldızlar (*) o atlamanın yanıt vermediğini gösterir; her zaman sorun demek değildir (bazı router'lar ICMP yanıtını kapatır).",
          "ipconfig /all (IP, maske, ağ geçidi, DNS), arp -a (IP-MAC), nslookup (DNS sorgusu)."
        ]
      },
      { t: "h", text: "Araçlar: Cisco cihaz tarafı" },
      {
        t: "cmd",
        lang: "ios",
        calistirma: "atla Cisco IOS komutları; cihaz ya da Packet Tracer gerekir",
        text: "show ip interface brief   ! arayüz durumu ve IP özeti\nshow interfaces gigabitethernet0/0   ! hata sayaçları, duplex\nshow ip route   ! yönlendirme tablosu\nshow vlan brief   ! VLAN üyelikleri\nshow mac address-table   ! hangi MAC hangi portta\nshow cdp neighbors   ! komşu cihazlar\nshow running-config   ! etkin yapılandırma"
      },
      {
        t: "steps",
        h: "Arayüz durumu nasıl okunur?",
        items: [
          "up / up: katman 1 ve 2 çalışıyor. Sorun yukarıdaysa IP, rota ya da ACL'ye bak.",
          "up / down: fiziksel sinyal var ama katman 2 sorunu (kapsülleme, keepalive, saat uyumsuzluğu) olabilir.",
          "down / down: fiziksel sorun (kablo takılı değil, karşı port kapalı, arızalı kablo).",
          "administratively down: arayüz shutdown ile elle kapatılmış; no shutdown gerekir."
        ]
      },
      {
        t: "box",
        h: "Ping çıktısını oku",
        text: "Cisco ping'de '!' yanıt geldi, '.' zaman aşımı, 'U' hedefe ulaşılamadı demektir. Windows'ta 'Request timed out' yanıt gelmedi, 'Destination host unreachable' yol bulunamadı anlamına gelir. Cevapsız bir ping tek başına arıza kanıtı değildir; güvenlik duvarı ICMP'yi bilerek engelliyor olabilir."
      },
      {
        t: "warn",
        h: "Tuzak",
        text: "Aynı anda birden çok ayar değiştirme: hangisinin işe yaradığını anlayamazsın. Ayrıca yalnız ping başarısızlığına bakıp 'ağ bozuk' deme; hedef ICMP'ye kapalı olabilir. Kanıtı başka bir testle (port bağlantısı, tarayıcı) destekle."
      }
    ],
    objectives: [
      { id: "h1", text: "Sorun giderme adımlarını sırayla sayabilir ve her adımın amacını söyleyebilirsin." },
      { id: "h2", text: "Aşağıdan yukarı, yukarıdan aşağı ve böl ve yönet yaklaşımlarını uygun senaryoya eşleyebilirsin." },
      { id: "h3", text: "Sıralı ping sonuçlarından sorunun hangi katmanda olduğunu çıkarabilirsin." },
      { id: "h4", text: "Arayüz durum çıktısından (up/down, administratively down) olası nedeni söyleyebilirsin." }
    ],
    summary: [
      "Süreç: sorunu belirle, kuram kur, sına, eylem planı uygula, doğrula, belgele.",
      "Aşağıdan yukarı fiziksel katmandan, yukarıdan aşağı uygulamadan, böl ve yönet ortadan başlar.",
      "Sıralı ping: kendi yığın, kendi IP, ağ geçidi, uzak IP, uzak ad; ilk başarısız adım sorunun yerini gösterir.",
      "IP'ye ping gidip ada gitmiyorsa DNS'e bak.",
      "down/down fiziksel, up/down katman 2, administratively down elle kapatılmış demektir."
    ],
    prereq: [
      1,
      4
    ],
    minutes: 25,
    sonDogrulama: "2026-10-26",
    surum: "2026-10-v1",
    interview: [
      {
        q: "Sorun gidermeye nasıl başlarsın?",
        a: "Önce sorunu net tanımlarım: kimde, ne zamandan beri, ne değişti. Sonra en olası nedeni kuram olarak kurar, tek değişkenle sınar, çözdüğümü doğrular ve belgelerim."
      },
      {
        q: "Kullanıcı internete çıkamıyor, ne yaparsın?",
        a: "Sırayla ping atarım: kendi IP'si, ağ geçidi, uzak IP, uzak ad. İlk başarısız adım katmanı gösterir. IP tamam ama ad çözülmüyorsa DNS'e bakarım."
      },
      {
        q: "down/down ile up/down arasındaki fark nedir?",
        a: "down/down genellikle fiziksel sorun, up/down ise sinyal var ama katman 2 sorunu (kapsülleme, keepalive vb.) demektir."
      }
    ],
    vocab: [
      { term: "Troubleshooting", tr: "sorun giderme", ex: "Troubleshooting needs a method." },
      { term: "Escalate", tr: "bir üst seviyeye yükseltmek", ex: "Escalate the issue if the theory fails." },
      { term: "Reachability", tr: "erişilebilirlik", ex: "Ping tests reachability." },
      { term: "Hop", tr: "atlama (yoldaki router)", ex: "Traceroute shows each hop." },
      { term: "Timeout", tr: "zaman aşımı", ex: "A request timed out." }
    ],
    sources: [
      { title: "RFC 792: Internet Control Message Protocol (ping ve traceroute altyapısı)", url: "https://www.rfc-editor.org/rfc/rfc792" },
      { title: "Cisco Networking Academy: Networking Basics", url: "https://www.netacad.com/courses/networking-basics" },
      { title: "Cisco CCNA 200-301 sınav sayfası", url: "https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccna.html" }
    ],
    quiz: [
      { id: "73f37fdf", q: "Sorun giderme sürecinde 'kuramı sına' adımından sonra kuram yanlış çıkarsa ne yapılır?", options: ["Sorun çözülmüş sayılır","Tüm cihazlar yeniden başlatılır","Yeni bir kuram kurulur ya da sorun yükseltilir (escalate)","Belgeleme atlanıp süreç kapatılır"], obj: "h1" },
      { id: "1514af7b", q: "Aşağıdakilerden hangisi sürecin son adımıdır?", options: ["Sorunu belirlemek","Bulguları, yapılan işlemleri ve sonucu belgelemek","Kuram kurmak","Eylem planını uygulamak"], obj: "h1" },
      { id: "26da0343", q: "Tek bir kullanıcının yalnız bir uygulaması çalışmıyor, ağın geri kalanı normal. Hangi yaklaşım doğal bir başlangıçtır?", options: ["Yukarıdan aşağı (uygulamadan başla)","Aşağıdan yukarı, tüm kabloları kontrol et","Tüm switch'leri yeniden başlat","Hiç test yapmadan ağ kartını değiştir"], obj: "h2" },
      { id: "06cf55a2", q: "Böl ve yönet yaklaşımı nedir?", options: ["Sorunu iki farklı kişiye bölüp aynı anda ayar değiştirmek","Ağı ikiye bölerek tüm cihazları ayırmak","Yalnız fiziksel katmandan başlamak","Ortadaki bir katmandan (örneğin varsayılan ağ geçidine ping) başlayıp sonuca göre yukarı ya da aşağı gitmek"], obj: "h2" },
      { id: "b7d6f5ce", q: "Bir bilgisayar kendine, varsayılan ağ geçidine ve 8.8.8.8 adresine ping atabiliyor ama www.ornek.com adına atamıyor. Olası neden nedir?", options: ["Kablo kopuk","Yanlış alt ağ maskesi","DNS çözümlemesi sorunu","Ağ kartı sürücüsü bozuk"], obj: "h3" },
      { id: "526bd010", q: "Bir bilgisayar kendi IP'sine ping atabiliyor ama varsayılan ağ geçidine atamıyor. Önce neye bakılır?", options: ["DNS sunucu adresine","Kablo/Wi-Fi bağlantısı, VLAN üyeliği, IP ve maske, ağ geçidi adresi","Web sunucusunun sertifikasına","Uzak sunucunun güvenlik duvarına"], obj: "h3" },
      { id: "70ffde31", q: "ping 127.0.0.1 başarısız oluyorsa ne anlama gelir?", options: ["Yerel TCP/IP yığını ya da ağ yazılımı çalışmıyor olabilir","Varsayılan ağ geçidi kapalıdır","İnternet bağlantısı yoktur","Karşı switch portu kapalıdır"], obj: "h3" },
      { id: "7256379f", q: "Bir switch arayüzü 'down/down' gösteriyor. En olası neden hangisidir?", options: ["Yanlış IP adresi","DNS ayarı","Arayüz shutdown ile kapatılmış","Fiziksel sorun (kablo takılı değil, bozuk ya da karşı port kapalı)"], obj: "h4" },
      { id: "7a5bf473", q: "show ip interface brief çıktısında 'administratively down' görülüyor. Çözüm nedir?", options: ["Kabloyu değiştirmek","DHCP sunucusunu yeniden başlatmak","Arayüz yapılandırma kipinde no shutdown komutu","Switch'i fabrika ayarlarına döndürmek"], obj: "h4" },
      { id: "efdaf0f7", q: "Traceroute çıktısında 5. atlamadan sonra yalnız yıldız (*) görünüyor. Doğru yorum hangisidir?", options: ["Hedef kesin kapalıdır","O atlama ya da sonrası yanıt vermiyor; ICMP engelleniyor olabilir, her zaman kesin arıza anlamına gelmez","Yerel ağ kartı bozuktur","Her atlamada tarayıcı hata verir"], obj: "h3" }
    ]
  };

  /* 28 ───────────────────────────── Proje: ev ağını kur */
  L[28] = {
    hook: "Servis sağlayıcının verdiği modem aslında tek kutuda router, switch, erişim noktası, DHCP sunucusu ve NAT yapan bir cihazdır. Bu projede kâğıt üzerinde (ve laboratuvardaki simülasyonla) bir ev ağını tasarlar, güvenli kurarsın. Yalnız kendi cihazlarını ve kendi ağını düşün; başkasının ağına dokunma.",
    homework: "Kendi evindeki ağ için tek sayfalık bir plan çiz: cihaz listesi, SSID adı, güvenlik modu, DHCP aralığı, sabit adres vereceğin cihazlar ve kapatacağın özellikler. Gerçek ayarları değiştirme; plan kâğıt üzerinde kalsın.",
    warmup: {
      recap: [
        { point: "DHCP istemciye adres, maske, ağ geçidi ve DNS verir.", example: "192.168.1.100-199 aralığı" },
        { point: "NAT/PAT özel adresleri tek genel adrese çevirir.", example: "192.168.1.x -> 203.0.113.7" }
      ],
      concepts: [
        {
          term: "SSID",
          tr: "Kablosuz ağ adı",
          summary: "Erişim noktasının yayınladığı ad; güvenlik sağlamaz, yalnız tanıtır.",
          example: "EvAgi-5G"
        },
        {
          term: "WPA2 / WPA3",
          tr: "Kablosuz şifreleme ve kimlik doğrulama",
          summary: "WPA2 AES ile, WPA3 daha güçlü el sıkışmayla (SAE) çalışır; WEP ve açık ağ güvensizdir.",
          example: "Ev için WPA2/WPA3 karma ya da yalnız WPA3"
        },
        {
          term: "WPS",
          tr: "Hızlı eşleştirme",
          summary: "PIN yöntemi zayıflıklarıyla bilinir; kullanılmayacaksa kapatılır.",
          example: "Yönetim sayfasında WPS kapalı"
        }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      {
        t: "box",
        h: "Gerçek talep",
        text: "Arkadaşın yeni bir modem aldı: 'Wi-Fi kuruldu ama yazıcı bağlanmıyor, misafirler ağımı görüyor, parolayı hiç değiştirmedim.' Bu proje, ağı baştan sona doğru sırayla kurmanı sağlar."
      },
      { t: "h", text: "Proje adımları" },
      {
        t: "steps",
        h: "Plan",
        items: [
          "Cihaz envanteri: telefon, dizüstü, TV, yazıcı, kamera, akıllı hoparlör. Her birinin hangi Wi-Fi sürümünü ve güvenlik modunu desteklediğini yaz.",
          "Adresleme: ev ağı genellikle 192.168.1.0/24. Router/ağ geçidi .1 olur. DHCP havuzunu sabit adresli cihazlardan ayır: ör. havuz .100-.199, yazıcı ve NAS için .10-.50 arası sabit adres.",
          "Kablosuz: ad (SSID) ve güçlü parola belirle. Güvenlik modu olarak cihazların hepsi destekliyorsa WPA3, eski cihaz varsa WPA2/WPA3 geçiş kipi seç. WEP ve açık ağ olmaz.",
          "Bantlar: yakın ve hızlı cihazlar için 5 GHz, uzak ve eski cihazlar için 2.4 GHz. Ayrı SSID vermek ya da tek ad (band steering) seçmek tasarım kararıdır.",
          "NAT: router tüm ev cihazlarını tek genel adres arkasında saklar (PAT). Dışarıdan başlatılan bağlantı için tabloda kayıt yoktur; port yönlendirme açmadıkça gelen paket düşer.",
          "Güvenlik sertleştirme: yönetici parolasını varsayılandan değiştir, WPS'i kapat, uzaktan yönetimi kapat, yazılımı (firmware) güncelle, misafirler için ayrı misafir ağı aç.",
          "Doğrulama: dizüstüden ağ geçidine ve dış IP'ye ping at, ardından alan adı aç; her cihaz adres almış mı bak. Sorun çıkarsa önceki derste öğrendiğin sırayla ilerle."
        ]
      },
      { t: "h", text: "Karar tablosu" },
      {
        t: "steps",
        h: "Hangi ayar neden?",
        items: [
          "WPA3-Personal: güncel cihazlar için en güçlü; eski cihazlar bağlanamayabilir.",
          "WPA2 (AES): geniş uyumluluk; parola güçlüyse hâlâ kabul edilebilir.",
          "WEP / açık ağ: güvenli değildir, kullanılmaz.",
          "Misafir ağı: misafirleri ev cihazlarından ayırır (izolasyon).",
          "Port yönlendirme: yalnız gerçekten dışarıdan erişilmesi gereken servis için, en az kapsamla; kamera gibi cihazı internete doğrudan açmak risklidir."
        ]
      },
      {
        t: "box",
        h: "Laboratuvar",
        text: "Bu dersin alıştırması 'Ev ağı karar laboratuvarı': dört senaryoda kablosuz güvenlik modunu, DHCP havuzunu, NAT davranışını ve sertleştirme adımlarını seçersin. Gerçek router yoktur; form tabanlı yerel simülasyondur."
      },
      {
        t: "warn",
        h: "Sınır",
        text: "Bu proje yalnız kendi ağın içindir. Başkasının Wi-Fi ağını, modemini ya da cihazını izinsiz taramak, parola denemek ya da ayarlarını değiştirmek hukuka aykırıdır. Simülasyon ve kâğıt plan bunun için yeterlidir."
      }
    ],
    objectives: [
      { id: "h1", text: "Cihaz desteğine göre uygun kablosuz güvenlik modunu seçebilirsin." },
      { id: "h2", text: "Ev ağı için adres planı ve DHCP havuzu (sabit adresler havuz dışında) tasarlayabilirsin." },
      { id: "h3", text: "NAT/PAT arkasındaki ev cihazlarının dışarıya nasıl göründüğünü ve gelen bağlantının neden düştüğünü açıklayabilirsin." },
      { id: "h4", text: "Ev ağı için temel sertleştirme adımlarını sıralayabilirsin." }
    ],
    summary: [
      "Ev router'ı tek kutuda router, switch, erişim noktası, DHCP ve NAT'tır.",
      "Güvenlik modu: hepsi destekliyorsa WPA3, eski cihaz varsa WPA2/WPA3 geçiş; WEP ve açık ağ yok.",
      "DHCP havuzu sabit adresli cihazlardan ayrı tutulur.",
      "PAT tüm ev cihazlarını tek genel adres arkasında gösterir; port yönlendirme yoksa dışarıdan gelen paket düşer.",
      "Sertleştirme: yönetici parolası, WPS kapalı, uzaktan yönetim kapalı, güncel yazılım, misafir ağı."
    ],
    prereq: [
      7,
      8,
      11
    ],
    minutes: 30,
    sonDogrulama: "2026-10-26",
    surum: "2026-10-v1",
    interview: [
      {
        q: "Evde bir kablosuz ağı güvenli nasıl kurarsın?",
        a: "Güçlü bir Wi-Fi parolası ve WPA3 (eski cihaz varsa WPA2/WPA3), değiştirilmiş yönetici parolası, WPS ve uzaktan yönetim kapalı, güncel yazılım ve misafirler için ayrı ağ."
      },
      {
        q: "NAT bir güvenlik duvarı mıdır?",
        a: "Hayır, ama dışarıdan başlatılan bağlantılar için kayıt yoksa paketi düşürdüğü için dolaylı bir koruma sağlar. Asıl güvenlik güvenlik duvarı kuralları ve güncel yazılımla gelir."
      }
    ],
    vocab: [
      { term: "SSID", tr: "kablosuz ağ adı", ex: "Choose a clear SSID." },
      { term: "Guest network", tr: "misafir ağı", ex: "Guests use the guest network." },
      { term: "Port forwarding", tr: "port yönlendirme", ex: "Port forwarding exposes a service." },
      { term: "Firmware", tr: "cihaz yazılımı", ex: "Update the router firmware." },
      { term: "DHCP pool", tr: "DHCP havuzu", ex: "The DHCP pool starts at .100." }
    ],
    sources: [
      { title: "RFC 1918: Özel ağlar için adres tahsisi", url: "https://www.rfc-editor.org/rfc/rfc1918" },
      { title: "RFC 2663: NAT terimleri ve düşünceler", url: "https://www.rfc-editor.org/rfc/rfc2663" },
      { title: "Wi-Fi Alliance: Wi-Fi güvenliği", url: "https://www.wi-fi.org/discover-wi-fi/security" },
      { title: "Cisco Networking Academy: Networking Basics", url: "https://www.netacad.com/courses/networking-basics" }
    ],
    quiz: [
      { id: "aaa05b97", q: "Bir evde dizüstü ve telefon WPA3 destekliyor, ama eski TV yalnız WPA2 biliyor. En uygun kablosuz güvenlik ayarı hangisidir?", options: ["WPA2/WPA3 geçiş (karma) kipi","Yalnız WPA3","WEP","Açık ağ"], obj: "h1" },
      { id: "275486d3", q: "SSID'yi gizlemek (yayınlamamak) ağı güvenli yapar mı?", options: ["Evet, ağ artık hiç bulunamaz","Evet, WPA3'ün yerini alır","Evet, ama yalnız 5 GHz'de","Hayır, ad gizlenebilir ama güvenlik şifreleme ve güçlü parolayla sağlanır"], obj: "h1" },
      { id: "ac8835bd", q: "192.168.1.0/24 ev ağında yazıcı için sabit adres 192.168.1.20 verilecek. DHCP havuzu nasıl olmalı?", options: ["Havuz 192.168.1.1-254 olmalı","Havuzun içine yazıcıyı da koymalı","Havuz 192.168.1.100-199 gibi sabit adreslerin dışında olmalı","Hiç havuz olmamalı"], obj: "h2" },
      { id: "e9039d30", q: "DHCP havuzu 192.168.1.100 ile 192.168.1.199 arasında (uçlar dahil). Kaç adres kiralanabilir?", options: ["99","100","101","254"], obj: "h2" },
      { id: "2bbe3a11", q: "Ev ağındaki beş cihaz internete tek bir genel adresle (PAT) çıkıyor. Dış dünya bu cihazları nasıl görür?", options: ["Hepsi router'ın genel adresi olarak görünür, ayrımı port numaraları sağlar","Her biri kendi özel adresiyle görünür","Hiç görünmezler ve bağlanamazlar","Her biri ayrı bir genel adres alır"], obj: "h3" },
      { id: "c44614d7", q: "Dışarıdan bir kullanıcı, ev router'ının genel adresine hiç isteği olmadan bir paket gönderiyor. NAT tablosunda kayıt yok ve port yönlendirme tanımlı değil. Ne olur?", options: ["Rastgele bir cihaza iletilir","Tüm cihazlara yayılır","Router paketi yönetici arayüzüne açar","Paket düşer"], obj: "h3" },
      { id: "adf10e88", q: "Ev router'ında yönetici parolası varsayılan. İlk sertleştirme adımı ne olmalı?", options: ["Parolayı etiket altında bırakmak","Wi-Fi parolasını yönetici parolası yapmak","Yönetici parolasını güçlü ve benzersiz bir parolayla değiştirmek","Yönetim arayüzünü tüm internete açmak"], obj: "h4" },
      { id: "e8416e2a", q: "WPS PIN yöntemi hakkında doğru öneri hangisidir?", options: ["Her zaman açık bırakılmalı","Kullanılmayacaksa kapatılmalı","Yönetici parolasının yerine geçer","WPA3'ten daha güvenlidir"], obj: "h4" },
      { id: "d8ab99f4", q: "Misafirlerin ev cihazlarına (yazıcı, NAS) erişmesini istemiyorsunuz ama internete çıkabilmeli. Çözüm nedir?", options: ["Misafir ağı (izole edilmiş ayrı SSID) açmak","Misafirlere ana Wi-Fi parolasını verip internete çıkarmak","Yazıcıyı kapatmak","Wi-Fi'ı tamamen kapatıp yalnızca kablolu bağlantıya geçmek"], obj: "h4" }
    ]
  };

  /* 29 ───────────────────────────── Kontrol noktası: ağ temelleri */
  L[29] = {
    hook: "Bu bir yeni konu değil, ara kontrol: Protokoller ve modeller, sayı sistemleri, ağ medyası, MAC/Switch çerçeve bilgisi ve sorun giderme konularını tek sınavda ölçer. Takıldığın başlığın dersine dön.",
    homework: "Sınavdan önce her ders için tek cümlelik bir özet yaz (kapsülleme sırası, ikili-hex dönüşümü, UTP sınırı, MAC tablosu öğrenme, sıralı ping). Sınavdan sonra yanlış yaptığın sorunun dersini yeniden oku.",
    warmup: {
      recap: [
        { point: "Katmanlar: veri, segment, paket, çerçeve, bit.", example: "Ders 24" },
        { point: "Ethernet çerçevesi MAC ve FCS taşır; switch kaynak MAC'i öğrenir.", example: "Ders 4" }
      ],
      concepts: [
        {
          term: "Kontrol noktası",
          tr: "Ders grubu sonunda ara sınav",
          summary: "Birkaç dersin ortak sınavıdır; yeni konu yok, tekrar ve eksik tespiti var.",
          example: "12 soru, %80 geçme"
        }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      {
        t: "box",
        h: "Gerçek talep",
        text: "NetAcad biçiminde ders gruplarının sonunda kontrol noktası sınavı vardır: bölüm bölüm ilerlerken eksikleri erkenden yakalamanı sağlar. Burada da aynı mantık: dersleri bitirdin, şimdi bütünü ölç."
      },
      {
        t: "steps",
        h: "Sınavın kapsamı",
        items: [
          "Ders 24: modeller, kapsülleme, PDU adları, yerel ve uzak hedef.",
          "Ders 25: ikili, onaltılık, maske ve ağ adresi hesapları.",
          "Ders 26: UTP, fiber ve Wi-Fi bantları.",
          "Ders 4: Ethernet çerçevesi alanları, MAC tablosu öğrenme ve yayın.",
          "Ders 27: sorun giderme süreci, sıralı ping, arayüz durumu."
        ]
      },
      {
        t: "box",
        h: "Nasıl çalışır?",
        text: "Bu kontrol noktası yeni bir sınav türü değil, mevcut ders mini sınavı biçiminde (12 soru, %80 geçme) eklendi. Geçemezsen ilgili dersi tekrar oku ve yeniden dene."
      }
    ],
    objectives: [
      { id: "h1", text: "Protokoller, modeller ve kapsülleme konularındaki bilgini sınayabilirsin." },
      { id: "h2", text: "İkili-onaltılık dönüşüm ve maske hesaplarını hızlıca yapabilirsin." },
      { id: "h3", text: "Ağ medyası ve Ethernet çerçevesi bilgilerini bir arada kullanabilirsin." },
      { id: "h4", text: "Bir sorun senaryosunda doğru sorun giderme adımını seçebilirsin." }
    ],
    summary: [
      "Kontrol noktası yeni konu içermez; 24, 25, 26, 4 ve 27. dersleri birlikte sınar.",
      "Yanlış yaptığın soruların dersine dönüp tekrar et.",
      "%80 ve üstü geçme ölçütüdür."
    ],
    prereq: [
      24,
      25,
      26,
      27
    ],
    minutes: 20,
    sonDogrulama: "2026-10-26",
    surum: "2026-10-v1",
    interview: [
      {
        q: "Bir sorunu hangi sırayla ararsın?",
        a: "Önce sorunu tanımlar, en olası nedeni kuram olarak kurar ve sıralı testlerle (arayüz durumu, ping, traceroute) katman katman daraltırım."
      }
    ],
    vocab: [
      { term: "Checkpoint", tr: "kontrol noktası", ex: "Pass the checkpoint to continue." },
      { term: "FCS", tr: "çerçeve denetim dizisi", ex: "The FCS detects bit errors." }
    ],
    sources: [
      { title: "Cisco Networking Academy: Networking Basics", url: "https://www.netacad.com/courses/networking-basics" },
      { title: "Cisco CCNA 200-301 sınav sayfası", url: "https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccna.html" }
    ],
    quiz: [
      { id: "facc3280", q: "Bir cihaz web isteğini hazırlayıp TCP ile port numaralarını ekledi. Bu noktada veri birimi nedir?", options: ["Paket","Çerçeve","Bit","Segment"], obj: "h1" },
      { id: "3562eadb", q: "Hangisi OSI için en doğru ifadedir?", options: ["İnternetin kullandığı asıl protokol yığınıdır","Yalnız Wi-Fi içindir","Kavramsal bir başvuru modelidir, internetin çalıştığı yığın değildir","Yalnız 4 katmandan oluşur"], obj: "h1" },
      { id: "198ace87", q: "Uzak bir sunucuya giden çerçevenin hedef MAC adresi kimindir?", options: ["Sunucunun","Varsayılan ağ geçidinin","DNS sunucusunun","Yayın MAC adresinin (FF:FF:FF:FF:FF:FF)"], obj: "h1" },
      { id: "8575494b", q: "İkili 11111000 sayısı ondalık olarak kaçtır?", options: ["248","240","252","224"], obj: "h2" },
      { id: "0156277a", q: "Ondalık 255 sayısı hex olarak nasıl yazılır?", options: ["EE","F0","99","FF"], obj: "h2" },
      { id: "37b183e7", q: "255.255.255.248 maskesinin kaç kullanılabilir host adresi vardır?", options: ["8","14","6","2"], obj: "h2" },
      { id: "59d835c1", q: "Ofis içinde iki bina arası 220 m. Hangi ortam kurallara uyar?", options: ["Cat 6 UTP","Fiber","Cat 5e UTP","USB uzatma kablosu"], obj: "h3" },
      { id: "8f7d1e02", q: "Çok sayıda duvarlı bir evde uzak odadaki cihaz için hangi Wi-Fi bandı genelde daha iyi menzil verir?", options: ["2.4 GHz","5 GHz","6 GHz","Bluetooth bandı"], obj: "h3" },
      { id: "52c1b884", q: "Ethernet çerçevesinin sonundaki FCS alanı ne işe yarar?", options: ["Hedef MAC adresini tutmaya","VLAN numarasını taşımaya","Alıcının IP adresini taşımaya","Çerçevede bit hatası olup olmadığını denetlemeye"], obj: "h3" },
      { id: "6dbbdae8", q: "Switch'in MAC tablosunda hedef MAC yok. Çerçeveye ne olur?", options: ["Düşürülür","Router'a yollanır","Geldiği port hariç tüm portlara gönderilir","İlk porta yollanır"], obj: "h3" },
      { id: "8a6b2dc3", q: "PC bir ağ geçidine ping atabiliyor, 8.8.8.8'e atabiliyor ama alan adı çözemiyor. Sonraki adım nedir?", options: ["Kabloyu değiştirmek","DNS ayarını ve DNS sunucusuna erişimi kontrol etmek","Alt ağ maskesini değiştirmek","Switch'i fabrika ayarına döndürmek"], obj: "h4" },
      { id: "4e50eef5", q: "Arayüz 'up/down' iken en olası sorun alanı hangisidir?", options: ["Katman 2 (kapsülleme, keepalive, saat uyumsuzluğu)","Uygulama katmanı (HTTP)","Kablo takılı değil","DNS sunucusu"], obj: "h4" }
    ]
  };

})();

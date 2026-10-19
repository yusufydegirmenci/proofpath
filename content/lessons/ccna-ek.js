/* CCNA yolu · Faz 5 tur 2: konu başına ders eki (anahtar = TMAP.ccna dizini, 0–22; 17-22 Tur 2 ile eklendi, ders no = anahtar + 1).
   M§7 listesinden TMAP'te bulunmayan öğeler: benzetme + sınırı, rehberli alıştırma, bağımsız görev, yaygın hatalar,
   geçme ölçütü + kritik yanlış anlama, dış kaynak (son doğrulama tarihiyle), telafi/sonraki adım, lab bağlantısı.
   Dış kaynak: yalnız HTTP 200 dönenler (curl, 2026-10-12); IEEE/Cisco sayfaları doğrulanamadığı için eklenmedi. */
(function () {
  var E = ((window.PP_EK = window.PP_EK || {}).ccna = (window.PP_EK.ccna || {}));
  var DOG = "2026-10-12";
  var R = function (no, ad, neden) { return { t: "RFC " + no + ": " + ad, u: "https://www.rfc-editor.org/rfc/rfc" + no, dogrulama: DOG, neden: neden }; };

  E[0] = {
    analoji: { a: "Şehir: cihazlar evler, switch mahalle kavşağı, router şehir çıkış kapısı, kablolar yollardır.", sinir: "Şehirde bir yol herkesin ortak malıdır; ağda switch portları cihazlara özel bağlantı sağlar ve router'ın yönlendirme kararı adresle verilir, tabelayla değil." },
    rehberli: ["Evindeki ağı çiz: telefon, laptop, TV, modem/router. Hangisi uç cihaz, hangisi ağ cihazı?", "Aynı çizimde LAN sınırını (ev içi) ve WAN sınırını (internet tarafı) çiz; sınırdaki cihazı işaretle.", "Bir cihazı çıkar (ör. router) ve ev içindeki cihazlar birbirini görmeye devam eder mi, internet gider mi, yaz."],
    bagimsiz: "Okulundaki ya da işyerindeki bir ağı (3 cihaz yeter) kutu-ok olarak çiz. Her cihazın işini ve hangi cihazın bozulursa neyin duracağını bir cümleyle yaz; dersteki ofis örneğiyle karşılaştır.",
    hatalar: [["Switch ile router'ı aynı işi yapan cihazlar sanmak", "Switch aynı ağdaki cihazları bağlar, router farklı ağları bağlar."], ["Wi-Fi'ı ayrı bir ağ türü sanmak", "Wi-Fi bir erişim ortamıdır; arkasında yine switch/router mantığı çalışır."], ["LAN'ı fiziksel boyutla tanımlamak", "LAN tek bir yönetim alanındaki yerel ağdır; WAN'ı ayıran şey coğrafya değil, ağları bağlayan hizmettir."]],
    gecme: { olcut: "Mini sınavda %80 ve bir ofis ağını çizip her cihazın işini söyleyebilmek.", kritik: ["Switch'in ağlar arası yönlendirme yaptığını sanmak", "Router'ın aynı ağdaki cihazları birbirine bağladığını sanmak"] },
    telafi: "Takıldıysan yalnız iki soruya dön: 'Bu cihaz aynı ağdakileri mi bağlıyor, farklı ağları mı?' Önce ofis çizimini yeniden yap.",
    sonraki: "Sıradaki konu: IP adresi ve alt ağ maskesi."
  };

  E[1] = {
    analoji: { a: "Posta adresi: şehir/mahalle kısmı ağ, kapı numarası cihazdır; maske adresin nerede bölündüğünü söyler.", sinir: "Posta adresinde bölünme yeri sabit görünür; IP'de maske bölünmeyi belirler ve aynı adres farklı maskeyle başka bir ağa ait olabilir." },
    rehberli: ["192.168.1.10/24 adresini yaz; ilk 24 bit ağ, kalan 8 bit host. Ağ adresi 192.168.1.0.", "Aynı ağda kalacak bir adres (192.168.1.77) ile dışarıda kalacak bir adres (192.168.2.77) seç ve nedenini söyle.", "Varsayılan ağ geçidinin (default gateway) ne zaman gerektiğini yaz: hedef aynı ağda değilse."],
    bagimsiz: "Bilgisayarında 'ipconfig' (Windows) ya da 'ip a' (Linux) çalıştır. IP, maske ve gateway'i not et; ağ adresini elle hesapla. Gateway'in aynı ağda olduğunu doğrula.",
    hatalar: [["Gateway'i farklı bir ağda tanımlamak", "Gateway, cihazın kendi ağındaki router arayüz adresi olmalıdır."], ["Özel adresleri internette görünür sanmak", "10/8, 172.16/12 ve 192.168/16 özel adreslerdir (RFC 1918) ve internette yönlendirilmez."], ["Maskeyi yalnız 255.255.255.0 sanmak", "Maske bit sayısıdır (/n); 255.255.255.0 yalnız /24'ün yazımıdır."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen IP/maskeden ağ adresini bulabilmek.", kritik: ["Maskenin ağ ve host kısımlarını belirlediğini bilmemek", "Gateway'in aynı ağda olması gerektiğini bilmemek"] },
    telafi: "Takıldıysan maskeyi bit olarak yaz (/24 = 24 bir, 8 sıfır); birlerin kapladığı kısım ağdır. Birkaç adresi kendin ayır.",
    sonraki: "Sıradaki konu: subnetting (lab var).",
    kaynaklar: [R("1918", "Address Allocation for Private Internets", "Özel adres aralıklarının resmî tanımı.")]
  };

  E[2] = {
    analoji: { a: "Pasta dilimleme: büyük bir pastayı (ağ) eşit boyutlu dilimlere bölersin; her dilim bir alt ağdır.", sinir: "Pasta istediğin kadar dilime bölünür; alt ağ blokları 2'nin kuvveti boyutundadır ve ağ adresi blok boyutunun katında başlamak zorundadır." },
    rehberli: ["50 cihaz için: 2^n - 2 >= 50 sağlayan en küçük n=6 (62 host), önek /26.", "Blok boyutu 64. 192.168.10.0/26'nın ağ adresi .0, yayın adresi .63, kullanılabilir aralık .1–.62.", "Sonraki alt ağın .64'te başladığını ve aralarda boşluk olmadığını doğrula."],
    bagimsiz: "192.168.50.0/24 ağını 4 eşit alt ağa böl. Her birinin ağ, yayın, ilk ve son host adresini yaz. Sonra aşağıdaki lab'da /26 senaryolarını çöz.",
    hatalar: [["Kullanılabilir host sayısını 2^n sanmak", "Ağ ve yayın adresleri host olamaz: 2^n - 2."], ["Ağ adresini blok sınırına oturtmamak", "Ağ adresi blok boyutunun katıdır; 192.168.1.70/26'nın ağı .64'tür."], ["/31 ve /32'yi sıradan alt ağ saymak", "/31 yalnız noktadan noktaya bağlantıda, /32 tek bir ana makine rotası ya da loopback için kullanılır; host barındıran alt ağlar /30 ve daha kısa öneklerdir."]],
    gecme: { olcut: "Mini sınavda %80 ve lab'daki dört senaryonun tamamı doğru.", kritik: ["Ağ ve yayın adresini kullanılabilir host saymak", "İhtiyaca göre önek seçimini 2^n - 2 ile yapamamak"] },
    telafi: "Takıldıysan yalnız bir önek seç (/26) ve blok boyutunu (64) bul; adresi bu blok sınırına oturt. Lab'daki ipucu formülünü kullanmak puan düşürmez.",
    sonraki: "Sıradaki konu: MAC adresi ve switch.",
    kaynaklar: [R("4632", "CIDR: Classless Inter-domain Routing", "Önek (/n) gösteriminin ve blok toplamanın tanımı."), R("1918", "Address Allocation for Private Internets", "Alt ağ alıştırmalarında kullanılan özel aralıklar.")],
    lab: "ccna-altag"
  };

  E[3] = {
    analoji: { a: "Apartman kapıcısı: hangi daire hangi kapıda diye bir defter tutar, mektubu doğrudan o kapıya götürür.", sinir: "Kapıcı deftere önceden yazılmıştır; switch MAC tablosunu gelen çerçevelerin kaynak adresinden kendi öğrenir ve bilmediği adrese gelen çerçeveyi tüm portlara gönderir (flood)." },
    rehberli: ["Boş MAC tablosu olan bir switch'e A'dan B'ye çerçeve geldi. A'nın portunu tabloya yaz (kaynaktan öğrenme).", "B bilinmediği için çerçeve gelen port hariç tüm portlara gider (flood). B cevap verince B'nin portu da öğrenilir.", "Bundan sonra A↔B çerçeveleri yalnız ilgili portlardan geçer; tablodaki satırı yaz."],
    bagimsiz: "Bilgisayarında 'arp -a' çalıştır. Üç satır seç; IP-MAC eşlemesini yaz. Aynı ağdaki bir cihazın MAC'ini telefonla bulup tabloyla karşılaştır.",
    hatalar: [["Switch'in IP'ye göre karar verdiğini sanmak", "Klasik switch yalnız MAC adresine bakar (2. katman)."], ["MAC tablosunu elle yazılmış sanmak", "Öğrenme otomatiktir ve süresi dolunca satır silinir."], ["Yayını (broadcast) yalnız IP özelliği sanmak", "Ethernet'te de ff:ff:ff:ff:ff:ff yayın MAC adresi vardır ve switch bunu tüm portlara iletir."]],
    gecme: { olcut: "Mini sınavda %80 ve bir çerçevenin switch'ten nasıl geçtiğini (öğrenme, flood, iletme) sıralayabilmek.", kritik: ["Switch'i yönlendirme yapan cihaz sanmak", "ARP'nin IP'den MAC bulduğunu bilmemek"] },
    telafi: "Takıldıysan tek senaryoyu elle yürüt: boş tablo, bir çerçeve gelir. Her adımda tabloya ne yazıldığını işaretle.",
    sonraki: "Sıradaki konu: VLAN (sanal yerel ağlar), access ve trunk portlar.",
    kaynaklar: [R("826", "An Ethernet Address Resolution Protocol", "IP adresinden MAC bulan ARP'nin özgün tanımı.")]
  };

  E[4] = {
    lab: "ccna-vlan",
    parsons: "ccna-vlan-komut",
    analoji: { a: "Aynı binada ayrı kat anahtarlı bölümler: muhasebe ve satış aynı binadadır ama koridorları ayrıdır.", sinir: "Katlar fiziksel olarak ayrıdır; VLAN'lar aynı switch üzerinde mantıksal ayrılır ve VLAN'lar arası konuşma için 3. katman cihazı (router) gerekir." },
    rehberli: ["Bir switch'te VLAN 10 (Muhasebe) ve VLAN 20 (Satış) tanımla; port 1–4 access VLAN 10, 5–8 VLAN 20.", "İki switch arasındaki bağlantıyı trunk yap; 802.1Q'nun çerçeveye VLAN etiketi eklediğini not et (Cisco'da: switchport mode trunk; izinli VLAN'ları switchport trunk allowed vlan 10,20 ile sınırla).", "VLAN 10'daki PC'den VLAN 20'dekine ping neden başarısız, hangi cihazla çözülür, yaz."],
    bagimsiz: "Üç bölümlü (Muhasebe, Satış, Misafir) küçük bir ofis için VLAN planı hazırla: VLAN numarası, isim, alt ağ ve hangi portların hangi VLAN'da olacağını tabloya yaz. Misafirin iç ağa erişememesinin nasıl sağlanacağını açıkla.",
    hatalar: [["Trunk'ta izin verilen VLAN'ı unutmak", "Trunk, bir VLAN'ı taşımıyorsa o VLAN'ın cihazları karşı switch'e ulaşamaz; izin listesini kontrol et."], ["Native VLAN'ın iki uçta farklı olması", "İki uçta aynı olmalıdır; aksi halde trafik yanlış VLAN'a düşer ve uyarı verir."], ["VLAN'ları aynı alt ağda bırakmak", "Her VLAN kendi alt ağını kullanır; yoksa VLAN'lar arası yönlendirme anlamsızlaşır."]],
    gecme: { olcut: "Mini sınavda %80 ve access/trunk farkını ve VLAN'lar arası konuşma için router gerektiğini açıklayabilmek.", kritik: ["(2. katman) switch'in tek başına VLAN'lar arasında yönlendirme yaptığını sanmak", "Access portun birden fazla VLAN taşıdığını sanmak"] },
    telafi: "Takıldıysan iki VLAN, iki PC ve bir router çizip her PC'nin hangi alt ağda olduğunu işaretle; sonra trafiğin yolunu elle çiz.",
    sonraki: "Sıradaki konu: router ve yönlendirme (lab var)."
  };

  E[5] = {
    analoji: { a: "Navigasyon: gideceğin adres için en ayrıntılı eşleşen tabelayı seçersin; hiçbiri uymazsa 'diğer yönler' tabelasına gidersin.", sinir: "Navigasyon en kısa yolu ölçüyle hesaplar; router önce en uzun önek eşleşmesini seçer, ölçü yalnız aynı önekler arasında devreye girer." },
    rehberli: ["Rota tablosuna bak: 10.0.0.0/8, 10.1.0.0/16, 10.1.2.0/24, 0.0.0.0/0. Hedef 10.1.2.77 dört satırdan hangisine uyar?", "Uyan satırların hepsini yaz ve en uzun öneki (en özgül olanı) seç: /24.", "Bir satır silinirse (/24) hedef hangi satırdan gider? Peki default rota da yoksa ne olur?"],
    bagimsiz: "Bilgisayarının rota tablosunu al ('route print' ya da 'ip route'). Default rotayı bul ve bir iç ağ satırı seç; bir hedef IP için hangi satırın seçileceğini elle belirle, sonra lab'daki dört senaryoyu çöz.",
    hatalar: [["En küçük metriği/ilk satırı seçmek", "Önce en uzun önek; metrik yalnız eşit uzunluktaki rotalar arasında kullanılır."], ["Default rotayı unutmak", "Eşleşme yoksa paket atılır; internet erişimi için 0.0.0.0/0 gerekir."], ["Statik rotada dönüş yolunu unutmak", "Trafik çift yönlüdür; karşı router'da da ağınıza dönüş rotası olmalı."]],
    gecme: { olcut: "Mini sınavda %80 ve lab'daki dört senaryoda doğru rota satırını seçebilmek.", kritik: ["En uzun önek kuralını bilmemek", "Eşleşme yoksa paketin atıldığını bilmemek"] },
    telafi: "Takıldıysan hedef IP'yi ikili yaz ve her satırın önek uzunluğu kadar bitini karşılaştır; kaç bit tuttuğunu say.",
    sonraki: "Sıradaki konu: DHCP ve DNS.",
    kaynaklar: [R("1812", "Requirements for IP Version 4 Routers", "Router'ın yönlendirme kararının (en uzun önek) resmî gereksinimleri.")],
    lab: "ccna-rota"
  };

  E[6] = {
    lab: "ccna-dhcp",
    analoji: { a: "Otelde resepsiyon: anahtar kartını (adresi) resepsiyon verir; rehber ise oda numarasını söyleyen defterdir.", sinir: "Otelde kart belirli bir süre kalır; DHCP adresi kiralamadır ve süre dolunca yenilenir. DNS yanıtları da önbelleğe alınır ve süresi (TTL) vardır." },
    rehberli: ["Bir cihaz ağa takıldı: Discover, Offer, Request, Ack (DORA) sırasını yaz ve her adımda kim konuşuyor işaretle.", "Cihaz adresi nasıl alır, kira süresi dolunca ne olur, yaz.", "Tarayıcıya bir alan adı yazıldığında: DNS sorgusu, yanıt, ardından TCP bağlantısı sırasını çiz."],
    bagimsiz: "Komut satırında 'ipconfig /all' ile DHCP sunucusunu ve DNS sunucularını bul; 'nslookup' ile bir alan adının IP'sini sorgula. Aynı adı iki DNS sunucusuna sor ve sonuçları karşılaştır.",
    hatalar: [["DHCP olmadan 169.254.x.x adres görünce ağ sorunu aramamak", "169.254.0.0/16 otomatik özel adrestir (APIPA); cihaz DHCP sunucusuna ulaşamamıştır."], ["DNS ile DHCP'yi karıştırmak", "DHCP adres dağıtır, DNS ad çözer."], ["İnternete IP ile çıkıp ad ile çıkamamayı DHCP hatası sanmak", "IP'yle erişim var, ad ile yok ise sorun DNS'tedir."]],
    gecme: { olcut: "Mini sınavda %80 ve DORA sırasını ve bir adın çözülme adımlarını anlatabilmek.", kritik: ["DNS'in adresi dağıttığını sanmak", "DHCP'nin yalnız IP verdiğini sanmak (maske, gateway ve DNS de verir)"] },
    telafi: "Takıldıysan önce yalnız DORA'yı dört kutuya yaz, sonra DNS sorgusunu ayrı bir çizimde çöz.",
    sonraki: "Sıradaki konu: NAT ve PAT (adres çevirme).",
    kaynaklar: [R("2131", "Dynamic Host Configuration Protocol", "DHCP'nin resmî tanımı (DORA, kira)."), R("1035", "Domain Names - Implementation and Specification", "DNS sorgu ve kayıt biçimi.")]
  };

  E[7] = {
    lab: "ccna-nat",
    analoji: { a: "Şirket santrali: dışarıya tek numara görünür, içeridekiler dahili numaradır; santral kimin aradığını hatırlar.", sinir: "Santral dahili numaralarını görür; NAT cihazı ise bağlantı tablosunu (adres + port) tutar ve dışarıdan başlatılan istek tabloda yoksa içeri geçemez." },
    rehberli: ["İçeride 192.168.1.10:51000 → dışarıda 8.8.8.8:53. NAT cihazı kaynak adresi genel adrese çevirir; tabloya yaz.", "Yanıt dışarıdan geri geldi: tablodan ters çeviri yapılır; yaz.", "İki iç cihaz aynı anda çıkarsa PAT bunları nasıl ayırır (farklı kaynak portlar), yaz."],
    bagimsiz: "Evindeki modemin yönetim sayfasından ya da 'ipconfig' ile iç IP'ni, internette 'IP adresim' diye aratıp genel IP'ni bul ve farkını açıkla. NAT olmasaydı ne olurdu, iki cümleyle yaz.",
    hatalar: [["NAT'ı güvenlik duvarı sanmak", "NAT adres çevirir; dışarıdan gelen trafiğin geçmemesi bir yan etkidir, güvenlik politikası değildir."], ["Inside local ve inside global'i karıştırmak", "Inside local içerideki özel adres, inside global dışarıdan görünen adrestir."], ["PAT'ta portu atlamak", "Aşırı yükleme (overload) NAT'ta ayırıcı olan kaynak porttur."]],
    gecme: { olcut: "Mini sınavda %80 ve bir çıkış paketinin NAT'tan nasıl geçtiğini adım adım yazabilmek.", kritik: ["NAT'ın güvenlik sağladığını sanmak", "PAT'ın portlarla ayrım yaptığını bilmemek"] },
    telafi: "Takıldıysan tek paketin iki yönünü ayrı ayrı çiz: içeriden dışarıya ve dönüşte; her iki yönde NAT tablosu satırını işaretle.",
    sonraki: "Sıradaki konu: ACL (lab var).",
    kaynaklar: [R("3022", "Traditional IP Network Address Translator (Traditional NAT)", "Temel NAT ve NAPT (PAT) tanımı.")]
  };

  E[8] = {
    analoji: { a: "Kapıdaki görevli: listeyi yukarıdan aşağı okur, ilk uyan satırın kararını uygular; listede olmayan herkesi içeri almaz.", sinir: "Görevli duruma göre insiyatif kullanabilir; ACL yalnız listeyi uygular, ilk eşleşmede durur ve en sonda gizli bir 'hepsini reddet' (örtük deny) vardır." },
    rehberli: ["ACL satırlarını yukarıdan aşağı oku; bir paket için ilk uyan satırı bul ve orada dur.", "Hiçbir satır uymazsa sonucu yaz: örtük deny.", "192.168.10.0/26 ağını 'host' ve 'wildcard' olarak yaz: 192.168.10.0 0.0.0.63 (maskenin tersi)."],
    bagimsiz: "Kendi ağın için iki satırlık bir ACL tasarla (biri izin, biri red) ve sırayı değiştirince sonucun nasıl değiştiğini bir paket üzerinde göster. Ardından lab'daki altı senaryoyu çöz.",
    hatalar: [["Genel kuralı özel kuralın önüne yazmak", "ACL ilk eşleşmede durur; özel kurallar üstte, genel kurallar altta olmalıdır."], ["Örtük deny'i unutup 'permit' eklememek", "Hiçbir permit eşleşmezse paket düşer; gereken trafiği açıkça izinle."], ["Wildcard maskını alt ağ maskı gibi yazmak", "Wildcard maskın tersidir: /24 için 255.255.255.0 değil 0.0.0.255."]],
    gecme: { olcut: "Mini sınavda %80 ve lab'daki altı senaryoda doğru karar ile eşleşen satırı bulabilmek.", kritik: ["ACL'nin tüm satırları değerlendirdiğini sanmak (ilk eşleşmede durur)", "Örtük deny'i bilmemek"] },
    telafi: "Takıldıysan paketi satır satır yürüt: her satırda 'uyar mı?' diye yaz, ilk 'uyar' olan satırda dur.",
    sonraki: "Sıradaki konu: OSPF (dinamik yönlendirme, temel).",
    lab: "ccna-acl"
  };

  E[9] = {
    lab: "ccna-ospf",
    analoji: { a: "Komşular harita paylaşır: herkes kendi sokağının yollarını anlatır, sonunda herkesin elinde şehrin aynı haritası olur.", sinir: "Haritalar gerçek zamanlı değil; OSPF'te komşuluk kurulmadan (hello, aynı alan, aynı parametreler) bilgi paylaşılmaz ve her router en kısa yolu maliyet (cost) toplamıyla hesaplar." },
    rehberli: ["İki router'ı bir bağlantıyla birleştir. Her biri 'hello' paketleri gönderir; komşuluk için aynı alan (area) ve aynı hello/dead süreleri gerekir.", "Bir bağlantının maliyeti, bant genişliğiyle ters orantılıdır; iki yol arasında toplam maliyeti en düşük olan seçilir.", "Broadcast ağlarda bir DR ve bir BDR seçilir; hangi kriterle seçildiğini yaz (en yüksek öncelik, eşitse en yüksek router ID)."],
    bagimsiz: "Üç router'dan oluşan bir üçgen çiz. Her bağlantıya bir maliyet yaz ve A'dan C'ye en düşük toplam maliyetli yolu hesapla. Bir bağlantı kesilirse yolun nasıl değiştiğini yaz.",
    hatalar: [["Alan numaralarının uyuşmaması", "Komşu router'lar o bağlantıda aynı alanda olmalıdır; aksi halde komşuluk kurulmaz."], ["Hello/dead sürelerini farklı bırakmak", "Süreler uyuşmazsa komşuluk 'full' durumuna gelmez."], ["Maliyeti tahmin etmek", "Maliyet arayüz bant genişliğinden (referans / bant) hesaplanır, hop sayısıyla bir ilgisi yoktur."]],
    gecme: { olcut: "Mini sınavda %80 ve komşuluk kurulma koşullarını ve en düşük maliyetli yolun seçimini açıklayabilmek.", kritik: ["OSPF'in yol seçimini hop sayısıyla yaptığını sanmak", "Komşulukta alan ve sürelerin uyuşması gerektiğini bilmemek"] },
    telafi: "Takıldıysan önce iki router arasında komşuluğun şartlarını listele; sonra üçgendeki iki yolun toplam maliyetini ayrı ayrı yaz.",
    sonraki: "Sıradaki konu: Wi-Fi temelleri.",
    kaynaklar: [R("2328", "OSPF Version 2", "OSPFv2'nin resmî tanımı (komşuluk, DR/BDR, maliyet).")]
  };

  E[10] = {
    analoji: { a: "Kalabalık bir salonda konuşma: herkes aynı odada konuşur; aynı anda iki kişi konuşursa anlaşılmaz, bu yüzden sırayla ya da farklı kanallardan konuşulur.", sinir: "Salonda duvarlar sesi keser; Wi-Fi'da radyo dalgaları komşu ağlarla çakışabilir ve duvar, mesafe gibi nedenlerle sinyal zayıflar. Şifreleme olmadan herkes dinleyebilir." },
    rehberli: ["2,4 GHz bandında örtüşmeyen kanalların 1, 6 ve 11 olduğunu yaz; neden komşu kanallar çakışır?", "SSID'in ağın adı, BSSID'in erişim noktasının MAC adresi olduğunu not et.", "WPA2-Personal ile WPA3-Personal arasındaki farkı bir cümleyle yaz (WPA3 daha güçlü anahtar doğrulama sağlar)."],
    bagimsiz: "Telefonunla çevrendeki Wi-Fi ağlarının kanallarını incele (bir Wi-Fi analiz uygulamasıyla). En kalabalık kanalı ve kendi ağının kanalını yaz; daha az kalabalık bir kanal öner.",
    hatalar: [["Gizli SSID'i güvenlik sanmak", "SSID gizlemek güvenlik sağlamaz; asıl koruma güçlü şifreleme ve parolaydır."], ["Kanalları rastgele seçmek", "2,4 GHz'de 1/6/11 örtüşmez; diğerleri komşu kanallarla girişim yapar."], ["Açık (şifresiz) ağı güvenli saymak", "Şifresiz ağda trafik dinlenebilir; kamusal ağlarda ek koruma (VPN, HTTPS) gerekir."]],
    gecme: { olcut: "Mini sınavda %80 ve örtüşmeyen kanalları ile WPA2/WPA3 farkını söyleyebilmek.", kritik: ["SSID gizlemeyi güvenlik önlemi sanmak", "Her kanalın birbirinden bağımsız olduğunu sanmak"] },
    telafi: "Takıldıysan önce kanal planını çiz: 1, 6 ve 11'de üç erişim noktası; komşu kanallardaki bir ağın nasıl girişim yaptığını işaretle.",
    sonraki: "Sıradaki konu: ağ güvenliği temelleri."
  };

  E[11] = {
    analoji: { a: "Bina güvenliği: giriş kartı (kimlik), kat kapıları (segmentasyon), kamera (kayıt) ve kuralları bilen görevli birlikte çalışır.", sinir: "Binada bir kapı tek başına yetebilir; ağ güvenliği katmanlıdır: tek bir önlem (ör. parola) yetmez, katmanlar birbirini tamamlar." },
    rehberli: ["Port güvenliği: bir switch portuna en fazla 2 MAC öğrenmesine izin ver; üçüncü cihaz bağlanırsa ihlal olur.", "DHCP snooping: yalnız güvenilen (trusted) portlardan DHCP sunucu yanıtına izin verilir; neden sahte sunucuyu engeller?", "AAA'yı üç harfle aç: kimlik doğrulama, yetkilendirme, kayıt (hesap verebilirlik)."],
    bagimsiz: "Küçük bir ofis ağı için üç önlem seç (ör. port güvenliği, VLAN ayrımı, güçlü parola) ve her birinin hangi saldırıyı azalttığını yaz. Hiçbirinin tek başına yetmediğini bir örnekle açıkla.",
    hatalar: [["Kullanılmayan portları açık bırakmak", "Kullanılmayan portları kapat ve boş bir VLAN'a al."], ["Varsayılan parolaları değiştirmemek", "Tüm cihazlarda varsayılan hesapları değiştir; en sık kullanılan zafiyetlerdendir."], ["Güvenliği tek bir cihaza yüklemek", "Güvenlik katmanlıdır: uç, switch, router ve uygulama düzeyinde önlem gerekir."]],
    gecme: { olcut: "Mini sınavda %80 ve port güvenliği, DHCP snooping ve AAA'nın ne işe yaradığını söyleyebilmek.", kritik: ["Tek bir önlemin tüm tehditleri çözdüğünü sanmak", "AAA'nın yalnız parola olduğunu sanmak"] },
    telafi: "Takıldıysan her önlem için tek soru sor: 'Bu hangi saldırıyı durdurur?' ve cevabı bir cümleyle yaz.",
    sonraki: "Sıradaki konu: IPv6 temelleri."
  };

  E[12] = {
    analoji: { a: "Telefon numaralarının uzunlaşması: adres sayısı yetmeyince numara basamağı artırılır; IPv6 adres alanını pratik olarak tüketilemez hale getirir.", sinir: "Telefon numarası uzar ama numaranın işlevi aynı kalır; IPv6'da çalışma mantığı da değişir: yayın (broadcast) yoktur, bunun yerine çok noktaya yayın (multicast) ve komşu keşfi (NDP) kullanılır." },
    rehberli: ["2001:0db8:0000:0000:0000:0000:0000:0001 adresini kısalt: baştaki sıfırları at, ardışık sıfır gruplarını bir kez '::' yap → 2001:db8::1.", "fe80::/10 ile başlayan adresin link-local olduğunu ve yalnız o bağlantıda geçerli olduğunu yaz.", "/64'ün tipik bir alt ağ önek uzunluğu olduğunu, 64 bitin arayüz kimliği için ayrıldığını not et."],
    bagimsiz: "Bilgisayarında IPv6 adreslerini listele ('ipconfig' ya da 'ip -6 a'). Bir link-local ve (varsa) bir global adres bul; her birinin önekini ve türünü yaz. '::' kısaltmasını açarak tam biçimine çevir.",
    hatalar: [["'::' işaretini birden fazla kez kullanmak", "Bir adreste '::' yalnız bir kez kullanılabilir; yoksa kaç sıfır olduğu belli olmaz."], ["IPv6'da yayın adresi aramak", "IPv6'da broadcast yoktur; multicast ve NDP kullanılır."], ["IPv6 alt ağlarını IPv4 gibi küçük bölmek", "Standart alt ağ /64'tür; LAN'da /64'ten küçük blok seçmek SLAAC'ı bozar (noktadan noktaya bağlantılarda /127 gibi istisnalar vardır)."]],
    gecme: { olcut: "Mini sınavda %80 ve bir IPv6 adresini kurallara göre kısaltıp açabilmek.", kritik: ["IPv6'da broadcast olduğunu sanmak", "'::' kısaltmasının birden çok kez kullanılabildiğini sanmak"] },
    telafi: "Takıldıysan önce 8 grup x 16 bit düzenini çiz; sonra sıfır gruplarını işaretle ve kısaltma kuralını uygula.",
    sonraki: "Sıradaki konu: STP ve EtherChannel.",
    kaynaklar: [R("8200", "Internet Protocol, Version 6 (IPv6) Specification", "IPv6 başlığının ve işleyişinin resmî tanımı."), R("4291", "IP Version 6 Addressing Architecture", "IPv6 adres türleri, gösterim ve kısaltma kuralları.")]
  };

  E[13] = {
    lab: "ccna-vlan",
    analoji: { a: "Trafik ışığı yok: bir şehirde iki yol döngü oluşturursa araçlar sonsuza dek döner; STP bazı yolları kapatarak tek yolu açık bırakır.", sinir: "Şehirde kapalı yol bir daha açılmaz; STP bir bağlantı koparsa yedek portu açar. EtherChannel ise yolları kapatmaz, birden çok bağlantıyı tek mantıksal bağlantıda toplayıp bant genişliği artırır." },
    rehberli: ["Üç switch üçgen bağlandı: döngü yayın fırtınasına yol açar. STP en düşük bridge ID'ye sahip switch'i kök (root) seçer.", "Kök olmayan switch'lerde kök yola en yakın port 'root port', diğer segmentlerde atanan port 'designated', kalan port 'blocked' olur.", "İki switch arasında iki kablo varsa EtherChannel onları tek bağlantı gibi gösterir; STP yalnız tek bağlantı görür."],
    bagimsiz: "Dört switch'li bir topoloji çiz. Bridge ID'leri belirle (öncelik + MAC), kökü seç ve her switch'te root portu işaretle. Sonra bir bağlantı koparsa neyin değişeceğini yaz.",
    hatalar: [["Kökü rastgele bırakmak", "Kök en düşük bridge ID'dir; istenen switch'in önceliğini düşürerek kök yap."], ["EtherChannel'da iki uçta ayarı farklı yapmak", "İki uçta mod (LACP/PAgP) ve parametreler uyuşmalıdır; uyuşmazsa kanal oluşmaz."], ["Yedek bağlantıyı boşta sanmak", "STP yedek yolu bloklar ve kesinti olunca açar; bu yüzden yedek de gerekli bir tasarımdır."]],
    gecme: { olcut: "Mini sınavda %80 ve kök seçimini ve port rollerini bir topolojide belirleyebilmek.", kritik: ["Kökün en yüksek öncelikli switch olduğunu sanmak (en düşük bridge ID)", "EtherChannel'ın STP'yi kapattığını sanmak"] },
    telafi: "Takıldıysan yalnız bridge ID karşılaştırmasını yap (öncelik, eşitse MAC); kökü seçtikten sonra portları rolleriyle yaz.",
    sonraki: "Sıradaki konu: NTP, Syslog ve SNMP."
  };

  E[14] = {
    analoji: { a: "Bina yönetimi: saat herkesin aynı olması için ortak bir saate bakar (NTP), olaylar defterine yazılır (Syslog), sayaçlar uzaktan okunur (SNMP).", sinir: "Defter elle yazılırdı; Syslog mesajı ağ üzerinden bir sunucuya gönderilir ve yanıt beklemez (UDP kullanılabilir). Saat farkı olan cihazlarda olaylar sıralanamaz." },
    rehberli: ["Olayları ilişkilendirmek için neden tüm cihazların saatinin aynı olması gerektiğini yaz (NTP).", "Syslog önem düzeylerini 0 (acil) ile 7 (hata ayıklama) arasında sırala; hangisinin daha önemli olduğunu belirt.", "SNMP'de yönetici (manager), ajan (agent) ve MIB'in rollerini yaz; 'get' ve 'trap' farkını söyle."],
    bagimsiz: "Bir cihazın günlüğünde (Windows Olay Görüntüleyici ya da Linux journalctl) beş olay seç; her birinin önem düzeyini ve zamanını yaz. İki cihazın saati farklı olsaydı bu olayları nasıl yorumlardın?",
    hatalar: [["Saat senkronizasyonunu önemsememek", "Farklı saatli cihazların günlükleri birleştirilemez; olay incelemesi imkânsızlaşır."], ["SNMP community'yi varsayılan bırakmak", "'public' ve 'private' gibi varsayılan community adları tahmin edilebilir; v3 ve yetkilendirme tercih edilmeli."], ["Önem düzeyi sayısını tersine okumak", "Syslog'da düşük sayı daha ciddi olaydır (0 acil, 7 hata ayıklama)."]],
    gecme: { olcut: "Mini sınavda %80 ve NTP, Syslog ve SNMP'nin ayrı görevlerini söyleyebilmek.", kritik: ["Syslog ile SNMP'yi aynı işi yapan protokoller sanmak", "Önem düzeyinde sayının tersine okunduğunu bilmemek"] },
    telafi: "Takıldıysan üç protokolü tek cümlelik görevleriyle (saat, olay günlüğü, izleme) yaz; sonra her birine bir örnek ekle.",
    sonraki: "Sıradaki konu: QoS temelleri.",
    kaynaklar: [R("5905", "Network Time Protocol Version 4", "NTP'nin resmî tanımı."), R("5424", "The Syslog Protocol", "Syslog mesaj biçimi ve önem düzeyleri."), R("3411", "An Architecture for Describing SNMP Management Frameworks", "SNMP yönetici/ajan mimarisi.")]
  };

  E[15] = {
    analoji: { a: "Hastane acil girişi: ambulanslar normal hastalardan önce geçer; her araç aynı kapıdan girse de öncelik sırası vardır.", sinir: "Acil önceliği hayat kurtarır ama yol yine dardır; QoS yeni bant genişliği yaratmaz, yalnız sıkışıklıkta kimin önce gideceğini belirler." },
    rehberli: ["Ses (VoIP) gecikmeye duyarlıdır, dosya indirme ise değildir. Hangisine öncelik verilmeli, yaz.", "Trafiği sınıflandır ve işaretle: IP başlığındaki DSCP alanı sınıfı taşır.", "Sıkışıklıkta kuyruk yönetimi öncelikli trafiği öne alır; kuyruk dolarsa varsayılan olarak gelen paketler atılır (tail drop); WRED gibi mekanizmalar düşük öncelikli sınıfı önce atar."],
    bagimsiz: "Evinde ya da ofisinde aynı anda çalışan beş uygulamayı (video görüşme, indirme, oyun, e-posta, yedekleme) sırala. Her birine bir öncelik ver ve nedenini gecikme/kayıp duyarlılığıyla açıkla.",
    hatalar: [["QoS'in bant genişliğini artırdığını sanmak", "QoS yalnız sıkışıklıkta önceliği belirler; bant genişliği artmaz."], ["Her şeye yüksek öncelik vermek", "Her şey öncelikliyse hiçbir şey öncelikli değildir."], ["İşaretlemeyi uç cihaza bırakıp güvenmek", "İşaretlemeye güvenilen sınırı (trust boundary) belirle; kullanıcı cihazı keyfi işaretleyebilir."]],
    gecme: { olcut: "Mini sınavda %80 ve ses, video ve veri trafiğinin gereksinimlerini sıralayabilmek.", kritik: ["QoS'in tıkanıklığı ortadan kaldırdığını sanmak", "DSCP'nin trafiği sınıflandıran bir işaret olduğunu bilmemek"] },
    telafi: "Takıldıysan üç trafik türü için tek tablo yap: gecikmeye, kayba ve bant genişliğine duyarlılık; öncelik bu tablodan gelir.",
    sonraki: "Sıradaki konu: otomasyon ve programlanabilirlik.",
    kaynaklar: [R("2474", "Definition of the Differentiated Services Field (DS Field)", "DSCP alanının resmî tanımı.")]
  };

  E[16] = {
    analoji: { a: "Tarifi robota öğretmek: aynı işi elle her cihazda yapmak yerine bir kez yazarsın ve robot tüm cihazlarda uygular.", sinir: "Robot hatayı da çoğaltır: yanlış bir şablon yüzlerce cihazı bozar; bu yüzden önce küçük bir cihaz grubunda dene ve değişikliği sürüm kontrolünde tut." },
    rehberli: ["REST API'de bir kaynağa 'GET' isteği atılır ve yanıt çoğunlukla JSON'dur. Bir cihazın arayüz listesini isteyen örnek bir istek yaz.", "JSON'da nesne, dizi ve değer ayrımını yaz: {\"ad\": \"Gi0/1\", \"durum\": \"up\"}.", "NETCONF/RESTCONF'un YANG modeline göre yapılandırma yazdığını not et; aynı değişikliğin 50 cihazda tekrarlanmasını nasıl kolaylaştırdığını yaz."],
    bagimsiz: "Herhangi bir açık REST API'ye (ör. kendi seçtiğin bir genel JSON hizmetine) komut satırından 'curl' ile GET isteği gönder; yanıttaki alanları listele ve bir alanı çıkar. Aynı işi 10 cihaz için nasıl otomatikleştirirdin, bir paragrafla yaz.",
    hatalar: [["Değişikliği önce sınamadan tüm cihazlara göndermek", "Önce bir test cihazında ya da küçük grupta dene; sonra genişlet."], ["Sırları betiğin içine yazmak", "Parola ve anahtarları kod yerine ortam değişkeni ya da gizli kasada tut."], ["JSON'daki tür farkını göz ardı etmek", "Sayı, metin ve boolean farklıdır; \"1\" ile 1 aynı değildir."]],
    gecme: { olcut: "Mini sınavda %80 ve REST, JSON ve NETCONF/YANG'ın rollerini ayırt edebilmek.", kritik: ["Otomasyonun hatayı da çoğalttığını bilmemek", "REST ile NETCONF'u aynı protokol sanmak"] },
    telafi: "Takıldıysan önce yalnız bir JSON nesnesini okumayı çalış; sonra aynı veriyi bir REST yanıtında bul.",
    sonraki: "Sıradaki konu: Ağ topolojileri ve mimarileri.",
    kaynaklar: [R("8259", "The JavaScript Object Notation (JSON) Data Interchange Format", "JSON'un resmî tanımı."), R("6241", "Network Configuration Protocol (NETCONF)", "NETCONF'un resmî tanımı."), R("8040", "RESTCONF Protocol", "YANG verisine REST üzerinden erişimin tanımı.")]
  };

  E[17] = {
    analoji: {"a":"Şehir planı: sokaklar mahalle içini, ana caddeler mahalleleri, çevre yolu şehirleri bağlar; her yolun görevi farklıdır.","sinir":"Şehirde yollar bir kez döşenir ve trafik akışı çok değişmez; ağda trafik yönü (kullanıcıdan sunucuya ya da sunucudan sunucuya) zamanla değişir ve tasarım ona göre seçilir."},
    rehberli: ["Üç katmanlı bir kampüs çiz: üç kat anahtarı, iki bina dağıtım anahtarı ve bir çekirdek. Her katmanın görevini bir cümleyle yaz.","Aynı ağı iki katmanlı (daraltılmış çekirdek) olarak yeniden çiz; hangi cihaz azaldı, ne kaybettin, yaz.","Dört yaprak ve iki omurgalı bir spine-leaf çiz. İki farklı yaprak arasındaki yolu işaretle ve kaç atlama olduğunu say."],
    bagimsiz: "Okulunun ya da işyerinin ağını bir mimari türüne (iki ya da üç katmanlı, SOHO) benzet. Neden o türe uyduğunu ve bir arıza anında neyin duracağını üç cümleyle yaz.",
    hatalar: [["Küçük ofise üç katmanlı tasarım kurmak","Gereksiz cihaz ve yönetim yükü getirir; iki katmanlı ya da tek kutu yeterlidir."],["Spine-leaf'te yaprakları birbirine bağlamak","Spine-leaf'te her yaprak yalnızca omurgalara bağlanır; yapraklar arası doğrudan bağlantı tasarımın mantığını bozar."],["Tam mesh bağlantı sayısını n×(n−1) sanmak","Her bağlantının iki ucu vardır; doğru sayı n×(n−1)/2'dir."]],
    gecme: {"olcut":"Mini sınavda %80 ve bir senaryo için kampüs, veri merkezi ya da WAN mimarisini gerekçesiyle seçebilmek.","kritik":["Spine-leaf'te yaprakların birbirine bağlandığını sanmak","Çekirdek katmanın kullanıcı cihazı bağladığını sanmak"]},
    telafi: "Takıldıysan yalnız bir soruya dön: 'Bu ağın trafiği kullanıcıdan sunucuya mı, sunucudan sunucuya mı akıyor?' Sonra katman çizimini yeniden yap.",
    sonraki: "Sıradaki konu: Sanallaştırma, konteyner ve bulut kavramları."
  };

  E[18] = {
    analoji: {"a":"Apartman ve pansiyon: apartmanda her dairenin kendi mutfağı vardır (sanal makine), pansiyonda odalar ortak mutfağı paylaşır (konteyner).","sinir":"Daireler ve odalar fiziksel mekândır; sanal makine ve konteynerler yazılımla saniyeler içinde çoğaltılır, silinir ve ağ üzerinden taşınır."},
    rehberli: ["Bir fiziksel sunucuya üç VM yerleştir. Her VM'in sanal ağ kartının hangi sanal anahtara ve hangi VLAN'a bağlanacağını çiz.","Aynı sunucuda üç konteyner çalıştır; hangi unsurların ortak (çekirdek) olduğunu işaretle.","Bir e-posta hizmeti, bir sanal sunucu kiralama ve bir uygulama platformu için IaaS, PaaS ve SaaS'ı eşleştir; her birinde işletim sistemini kimin yönettiğini yaz."],
    bagimsiz: "Bir uygulamayı (ör. küçük bir web sitesi) fiziksel sunucu, VM, konteyner ve SaaS olarak çalıştırmanın artı ve eksilerini dört satırlık bir tabloda karşılaştır. Gerçek bir sunucuya dokunma, kâğıt üzerinde çalış.",
    hatalar: [["Konteyneri küçük bir VM sanmak","Konteyner ana makinenin çekirdeğini paylaşır; yalıtımı VM kadar güçlü değildir."],["Bulutta her şeyin sağlayıcı sorumluluğunda olduğunu sanmak","IaaS'ta işletim sistemi, her modelde veri ve erişim yönetimi müşteridedir."],["Karma bulutu iki ayrı genel bulut sanmak","Karma bulut, özel altyapı ile genel bulutun birlikte ve bağlı kullanılmasıdır."]],
    gecme: {"olcut":"Mini sınavda %80 ve IaaS, PaaS ve SaaS'ı bir senaryoda sorumluluk paylaşımına göre ayırt edebilmek.","kritik":["Konteynerin kendi işletim sistemini taşıdığını sanmak","SaaS'ta işletim sistemini müşterinin yönettiğini sanmak"]},
    telafi: "Takıldıysan 'kim neyi yönetiyor?' sorusuyla bir tablo çiz: donanım, sanallaştırma, işletim sistemi, uygulama, veri. IaaS, PaaS ve SaaS'ta işaretle.",
    sonraki: "Sıradaki konu: TCP ve UDP."
  };

  E[19] = {
    analoji: {"a":"Kargo ve kartpostal: taahhütlü kargoda her koli numaralanır, teslim onayı alınır, kaybolana yenisi gönderilir (TCP). Kartpostal atılır, ulaştı mı bakılmaz (UDP).","sinir":"Kargoda eksik koliyi insan fark edip yeniden yollar; TCP'de bunu protokol kendiliğinden yapar. UDP'de ise uygulama isterse kendi önlemini alır."},
    rehberli: ["Üçlü el sıkışmayı SYN, SYN/ACK ve ACK olarak istemci ile sunucu arasında ok çizimiyle göster; hangi adımda bağlantının kurulduğunu işaretle.","Bir web isteği için kaynak ve hedef soketi yaz: istemci IP ve geçici port, sunucu IP ve 443.","Bir dosya aktarımı ve bir görüntülü görüşme için TCP ya da UDP seçimini gerekçelendir."],
    bagimsiz: "Bilgisayarında 'netstat -an' komutuyla açık bağlantıları listele. En az iki bağlantı için protokolü, yerel ve uzak portu ve hangi hizmete ait olabileceğini tabloya yaz. Hiçbir bağlantıyı kesme.",
    hatalar: [["UDP'yi 'kötü' ya da 'yanlış' protokol sanmak","UDP güvenilirliği uygulamaya bırakır; gecikmeye duyarlı uygulamalar için doğru seçimdir."],["İstemci kaynak portunun 443 olduğunu sanmak","443 hizmetin portudur; istemci yüksek numaralı geçici bir port seçer."],["FIN ile RST'yi aynı sanmak","FIN düzgün kapanışı, RST bağlantının aniden kesilmesini anlatır."]],
    gecme: {"olcut":"Mini sınavda %80 ve bir uygulama için TCP ya da UDP seçimini ve üçlü el sıkışmayı anlatabilmek.","kritik":["UDP'nin sıra numarası ve onay taşıdığını sanmak","Üçlü el sıkışmanın sırasını karıştırmak"]},
    telafi: "Takıldıysan önce yalnız üçlü el sıkışmayı kâğıda üç ok olarak çiz; sonra TCP ile UDP'yi iki sütunlu tabloda karşılaştır.",
    sonraki: "Sıradaki konu: CDP, LLDP, DTP ve trunk ayrıntısı."
  };

  E[20] = {
    analoji: {"a":"Apartmandaki isim tabelası ve ortak koridor: komşular kapıdaki tabelayla kendini tanıtır (CDP ve LLDP), ortak koridor birden çok katın trafiğini taşır (trunk).","sinir":"Tabela herkesin görebildiği bir bilgidir; ağda aynı bilgi saldırgana harita verir, bu yüzden kullanıcıya bakan portlarda kapatılır. Koridor da kendiliğinden kat eklemez; izinli VLAN listesi hangi katların geçeceğini sınırlar."},
    rehberli: ["Üç anahtarlı bir ağ çiz ve 'show cdp neighbors' çıktısında her anahtarın hangi komşuyu göstereceğini yaz (komşu adı, yerel port, uzak port).","Dört DTP birleşimi için (auto-auto, auto-desirable, desirable-desirable, access-trunk) trunk kurulup kurulmadığını tabloya işle.","Anahtarlar arası bir bağlantı için trunk, native VLAN 99 ve izinli VLAN 10,20,99 yapılandırmasını kâğıda yaz."],
    bagimsiz: "Packet Tracer'da ya da kâğıt üzerinde iki anahtar kur; bir uçta native VLAN'ı 99, diğer uçta 1 yap ve ne beklediğini yaz. Sonra uyuşmazlığı düzelt ve 'show interfaces trunk' çıktısında neyin değişeceğini belirt. Gerçek ağda deneme yapma.",
    hatalar: [["İki uç dynamic auto bırakıp trunk beklemek","İkisi de pazarlığı başlatmaz; trunk kurulmaz, bağlantı access kalır."],["Native VLAN'ı iki uçta farklı bırakmak","Etiketsiz trafik yanlış VLAN'a düşer ve günlükte uyarı çıkar."],["Kullanıcı portlarını dynamic modda bırakmak","İstenmeyen trunk pazarlığına izin verir; 'switchport mode access' kullanılır."]],
    gecme: {"olcut":"Mini sınavda %80 ve DTP birleşimlerinden hangisinin trunk kurduğunu söyleyebilmek.","kritik":["DTP'nin standart olduğunu sanmak","Native VLAN'ın değiştirilemeyeceğini sanmak"]},
    telafi: "Takıldıysan DTP için 4x4'lük bir tablo çiz (access, trunk, auto, desirable) ve her hücreye sonucu yaz; sonra iki uçlu bir trunk çizip native VLAN'ı işaretle.",
    sonraki: "Sıradaki konu: FHRP ve HSRP (ilk atlama yedekliliği)."
  };

  E[21] = {
    analoji: {"a":"İki kapıcılı bina: ziyaretçiler hep 'kapı numarası 1'i ararlar. O gün hangi kapıcı nöbetteyse o karşılar; nöbetçi değişse de ziyaretçi adresi değiştirmez.","sinir":"Kapıcı değişimi vardiya düzenidir; HSRP'de ise bekleyen yönlendirici hello mesajlarıyla aktifi sürekli izler ve arıza anında kendiliğinden devralır."},
    rehberli: ["Bir VLAN, iki yönlendirici (R1 ve R2) ve internet çiz. R1'in önceliği 110, R2'nin 100 olduğunda hangisinin aktif olacağını yaz.","R1 arızalanınca devralmanın adımlarını yaz: R2 ne yapar, istemci neyi fark eder?","R1'de preempt kapalıyken R1 geri geldiğinde ne olacağını açıkla; ardından preempt açıkken aynı olayı yeniden yaz."],
    bagimsiz: "Packet Tracer'da ya da kâğıt üzerinde bir HSRP grubu tasarla: sanal IP, iki yönlendiricinin gerçek IP'leri ve öncelikleri. 'standby' komutlarını ve 'show standby brief' çıktısından ne bekleyeceğini yaz.",
    hatalar: [["İstemciye gerçek yönlendirici IP'sini ağ geçidi vermek","O yönlendirici bozulunca yedeklilik işe yaramaz; istemciye sanal IP verilir."],["Preempt'i varsayılan olarak açık sanmak","HSRP'de preempt varsayılan olarak kapalıdır; yüksek öncelikli yönlendirici dönse bile rolü geri almaz."],["HSRP'nin her zaman yük paylaştırdığını sanmak","Bir grupta yalnız aktif yönlendirici iletir; yük paylaşımı için GLBP ya da VLAN başına farklı grup kullanılır."]],
    gecme: {"olcut":"Mini sınavda %80 ve bir senaryoda hangi yönlendiricinin aktif olacağını önceliğe ve IP adresine göre söyleyebilmek.","kritik":["İstemciye gerçek yönlendirici IP'sini ağ geçidi vermenin yeterli olduğunu sanmak","HSRP'nin Cisco'ya özgü olmadığını sanmak"]},
    telafi: "Takıldıysan önce yalnız 'kim aktif olur?' sorusuna odaklan: önce öncelik, eşitse IP adresi. Sonra preempt'i ekleyerek aynı senaryoyu yeniden çöz.",
    sonraki: "Sıradaki konu: VPN ve uzaktan erişim."
  };

  E[22] = {
    analoji: {"a":"Kalabalık yolda zırhlı geçit: araçlarını yolun herkese açık kısmında değil, kapalı ve korumalı bir koridorda götürürsün.","sinir":"Zırhlı geçit yalnızca yolu korur; aracın içindeki bir kusur ya da zararlı yazılım geçitle temizlenmez. VPN de uç cihazı temiz hale getirmez."},
    rehberli: ["Bir merkez ve iki şubeyi site-to-site VPN ile bağlayan bir çizim yap. Tünelin hangi cihazlar arasında kurulduğunu ve kullanıcıların farkında olup olmadığını yaz.","Evden çalışan bir kullanıcı için uzaktan erişim senaryosunu üç adımda yaz ve tam tünel ile bölünmüş tünel arasındaki farkı belirt.","Bir GRE tünelinin neden şifrelemediğini ve IPsec ile nasıl korunabileceğini iki cümleyle yaz."],
    bagimsiz: "Kendin için bir VPN ihtiyacı uydur (ör. iki şube ya da evden çalışan 10 kişi). Hangi VPN türünü ve hangi tünel yöntemini seçeceğini, neyi şifreleyeceğini ve riskini kâğıda üç satırda yaz. Gerçek VPN kurma.",
    hatalar: [["GRE'nin şifreleme yaptığını sanmak","GRE yalnızca kapsüller; gizlilik için IPsec gerekir."],["VPN'in uç cihazı da güvenli yaptığını sanmak","VPN yolu korur; uç cihazdaki zararlı yazılım yine kurumsal ağa ulaşabilir."],["Tünel ve taşıma modunu karıştırmak","Tünel modu özgün paketin tamamını sarar; taşıma modu yalnızca veriyi korur."]],
    gecme: {"olcut":"Mini sınavda %80 ve site-to-site ile uzaktan erişim VPN'ini, GRE ile IPsec farkını söyleyebilmek.","kritik":["GRE'nin şifreleme sağladığını sanmak","Uzaktan erişim VPN'in iki ağı birbirine bağladığını sanmak"]},
    telafi: "Takıldıysan önce 'kim kime bağlanıyor?' sorusunu çöz: ağ-ağ ise site-to-site, kullanıcı-ağ ise uzaktan erişim. Sonra GRE ve IPsec'i yan yana bir tabloda karşılaştır.",
    sonraki: "Sıradaki: CCNA yolundaki konuları tekrar edip deneme sınavına geç."
  };
})();

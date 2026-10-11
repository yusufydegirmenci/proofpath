"use strict";
/* v20: konu etiketli soru bankası (k = konu numarası: ccna c01-c27, eng e01-e13) */
(function(){
  var TAG={0:["ccna",1],1:["ccna",4],2:["ccna",1],3:["ccna",17],4:["ccna",18],5:["ccna",16],6:["ccna",5],7:["ccna",3],8:["ccna",3],9:["ccna",4],10:["ccna",1],11:["ccna",7],12:["ccna",19],13:["ccna",5],14:["ccna",8],15:["ccna",10],16:["ccna",9],17:["ccna",8],18:["ccna",5],19:["ccna",15],
   20:["eng",2],21:["eng",1],22:["eng",1],23:["eng",3],24:["eng",12],25:["eng",6],26:["eng",3],27:["eng",6],28:["eng",3],29:["eng",12],30:["eng",3],31:["eng",8],32:["eng",12],33:["eng",3],34:["eng",6],35:["eng",11],36:["eng",13],37:["eng",4],38:["eng",9],39:["eng",8],40:["eng",12]};
  QB.forEach(function(q,i){if(TAG[i])q.k=TAG[i][1]});
  function N(t,d,k,q,o,a,w,x){QB.push({t:t,d:d,k:k,q:q,o:o,a:a,w:w,x:x||""})}
  /* ---- CCNA ---- */
  N("ccna",1,1,"Evdeki Wi-Fi modem cihazı hangi işleri bir arada yapar?",["Sadece yazıcı paylaşır","İnternete çıkış, IP dağıtma ve kablosuz yayın","Sadece kablo uzatır","Sadece kamera kaydeder"],1,"Ev tipi cihaz modem + router + switch + access point'in birleşimidir.","Modem dışarıya (ISP) bağlar, router ağlar arası yol seçer; ikisini aynı sanma.");
  N("ccna",1,1,"Ofisteki 24 bilgisayarı aynı yerel ağda toplamak için en uygun cihaz hangisi?",["Modem","Switch","Repeater","Firewall"],1,"Switch, çok portlu ve MAC adresine göre akıllı iletim yapan yerel ağ cihazıdır.","Hub da çok portludur ama gelen veriyi herkese yollar; switch yalnızca ilgili porta.");
  N("ccna",1,1,"Kablosuz cihazları kablolu ağa bağlayan cihaz hangisi?",["Hub","Patch panel","Access Point","KVM"],2,"Access Point (AP) Wi-Fi sinyalini kablolu ağa köprüler.","AP IP dağıtmaz ve yönlendirme yapmaz; sadece bağlantı noktasıdır.");
  N("ccna",2,1,"Firewall'un temel görevi nedir?",["Kabloyu güçlendirmek","Trafiğe kurallara göre izin vermek veya engellemek","IP adresi dağıtmak","Alan adını çözmek"],1,"Firewall, belirlenen kurallara göre trafiği süzer.","Firewall her şeyi korumaz; kuralları doğru yazılmadıysa açık bırakır.");
  N("ccna",2,1,"Hub ile switch arasındaki en önemli fark nedir?",["Hub gelen veriyi tüm portlara yollar, switch ilgili porta","Hub daha akıllıdır","Switch kablosuzdur","Fark yoktur"],0,"Hub körlemesine çoğaltır; switch hedef MAC adresini tablosunda biliyorsa yalnız o porta gönderir (bilmiyorsa ya da yayınsa tüm portlara yayar).","Hub = hoparlörle anons (herkes duyar), switch = kulağa fısıldamak.");
  N("ccna",2,1,"Aynı switch'e bağlı iki bilgisayar birbirine veri yollarken paketler router'a uğrar mı?",["Evet, her zaman","Hayır, aynı ağdalarsa switch yeter","Sadece gece","Sadece Wi-Fi'da"],1,"Aynı alt ağdaki cihazlar switch üzerinden doğrudan konuşur; router farklı ağlar için gerekir.","Router her trafiğin geçtiği yer değil, ağlar arası kapıdır.");
  N("ccna",1,2,"Ethernet bakır (UTP) kablosunun standart azami uzunluğu kaçtır?",["10 m","100 m","1 km","10 km"],1,"Bakır Ethernet segmenti en fazla 100 metredir.","Daha uzak mesafede sinyal zayıflar; uzak noktalar için fiber veya ara cihaz gerekir.");
  N("ccna",1,2,"Çok uzak iki bina arasında yüksek hızlı bağlantı için en uygun ortam hangisi?",["Fiber optik","İnce telefon kablosu","HDMI kablosu","USB uzatma"],0,"Fiber ışıkla taşır, uzun mesafede ve yüksek hızda kayıp azdır.","UTP 100 m'de biter; fiber kilometrelerce gidebilir.");
  N("ccna",1,2,"RJ-45 konnektörde kaç pin vardır?",["4","6","8","12"],2,"Ethernet kablolarında kullanılan RJ-45 8 pinlidir.","Telefon fişi (RJ-11) daha küçüktür; 6 yuvalıdır ve genelde 2 ya da 4 kontak kullanır.");
  N("ccna",2,2,"Cisco cihazı ilk kez yapılandırmak için bilgisayarı hangi porttan bağlarsın?",["Console","Wi-Fi","HDMI","Ses çıkışı"],0,"Console portu, cihaza IP olmadan doğrudan yönetim erişimi verir.","Ağ henüz kurulmadıysa SSH çalışmaz; console kurtarıcıdır.");
  N("ccna",2,2,"Eski cihazlarda switch'i switch'e bağlarken hangi kablo gerekirdi?",["Crossover","Console kablosu","Koaksiyel","Telefon kablosu"],0,"Aynı tür cihazlar arası klasik olarak crossover istenirdi; günümüzde Auto-MDIX çoğunu otomatik halleder.","Straight-through farklı tür cihazlar (PC-switch) içindir.");
  N("ccna",1,3,"TCP segmentleri OSI modelinin hangi katmanında oluşur?",["2. Veri bağı","3. Ağ","4. Taşıma","7. Uygulama"],2,"TCP ve UDP 4. katman, yani Taşıma katmanıdır.","IP adresi 3. katmanda, segment 4. katmandadır; karıştırma.");
  N("ccna",2,3,"Veri ağa gönderilirken kapsülleme (encapsulation) sırası hangisidir?",["Veri → Segment → Paket → Çerçeve → Bit","Bit → Çerçeve → Paket → Segment → Veri","Paket → Bit → Veri → Çerçeve","Çerçeve → Veri → Bit → Paket"],0,"Üstten alta inerken her katman kendi başlığını ekler: segment, paket, çerçeve, bit.","Alıcıda tersi olur: bitlerden başlayıp veriye çıkılır (de-encapsulation).");
  N("ccna",1,3,"3. katmanın (Ağ) veri birimine ne denir?",["Bit","Çerçeve","Paket","Segment"],2,"Katman 3 PDU'su pakettir; katman 2 çerçeve, katman 4 segment.","Sıra: segment (4), paket (3), çerçeve (2), bit (1).");
  N("ccna",1,3,"Klasik switch OSI modelinin hangi katmanında çalışır?",["1","2","3","7"],1,"Klasik switch MAC adresiyle 2. katmanda karar verir.","Katman 3 switch'ler IP'ye de bakar ama 'klasik' switch 2. katmandır.");
  N("ccna",1,3,"HTTP protokolü OSI'nin hangi katmanındadır?",["Fiziksel","Ağ","Taşıma","Uygulama"],3,"HTTP, tarayıcının kullandığı bir uygulama katmanı protokolüdür.","Tarayıcı ve web sunucusu 7. katman; altındaki TCP 4. katmandır.");
  N("ccna",1,3,"Kablo üzerindeki elektrik/ışık sinyalleri OSI'nin hangi katmanıdır?",["1. Fiziksel","3. Ağ","5. Oturum","6. Sunum"],0,"Bitlerin sinyal olarak taşındığı kısım Fiziksel katmandır.","Kablo koptuysa sorun hep 1. katmandadır.");
  N("ccna",1,4,"172.16.0.0 ile 172.31.255.255 aralığı hangi gruba girer?",["Özel (private)","Genel (public)","Loopback","Multicast"],0,"RFC 1918 özel aralıkları: 10/8, 172.16/12, 192.168/16.","172.32.x.x artık özel değil, genel adrestir; sınırı ezberle.");
  N("ccna",1,4,"127.0.0.1 adresi ne işe yarar?",["Router'ı gösterir","Cihazın kendisini (loopback) gösterir","İnternet sunucusudur","Yayın adresidir"],1,"127.0.0.1 loopback'tir; paket ağa çıkmadan kendi cihazına döner.","ping 127.0.0.1 cevap verirse yalnızca cihazın TCP/IP yığını çalışıyor demektir; ağ kartının, kablonun veya internetin çalıştığını göstermez.");
  N("ccna",2,4,"Bir bilgisayar 169.254.x.x adresi almış. Büyük ihtimalle ne olmuştur?",["DHCP sunucusundan adres alamamıştır","İnternete hızlı bağlanmıştır","Statik IP verilmiştir","VPN açıktır"],0,"DHCP cevap vermezse Windows kendine APIPA (169.254.x.x) adresi atar.","Bu adreslerle internete çıkılmaz; önce DHCP'yi ve kabloyu kontrol et.");
  N("ccna",1,4,"IPv4 adresindeki bir okteti en çok hangi değer olabilir?",["99","100","255","256"],2,"Oktet 8 bittir: 0-255 arası.","256 geçersizdir; 8 bit en fazla 255 yapar.");
  N("ccna",2,4,"192.168.1.5 ve 192.168.2.5 (maske /24) aynı ağda mıdır?",["Evet","Hayır, 3. oktet farklı olduğu için farklı ağlardır","Sadece DHCP varsa","Sadece switch varsa"],1,"/24'te ilk 3 oktet ağı belirler; 1 ile 2 farklıdır.","Aynı ağ demek aynı ağ bitleri demektir; son oktet host'tur.");
  N("ccna",2,4,"Ağ adresi (örn. 10.0.0.0/24) bir cihaza host adresi olarak verilebilir mi?",["Evet","Hayır, ağın kendisini temsil eder","Sadece sunucuya","Sadece yazıcıya"],1,"Ağ adresi ve yayın adresi host'lara verilmez.","Bu yüzden normal alt ağlarda host sayısı 2^n - 2 hesaplanır.");
  N("ccna",2,5,"/27 alt ağ maskesinin noktalı yazımı hangisidir?",["255.255.255.192","255.255.255.224","255.255.255.240","255.255.255.248"],1,"/27 = 27 bir; son oktette 3 bir = 224.","192 = /26, 240 = /28, 248 = /29; son oktet değerlerini sırayla ezberle.");
  N("ccna",2,5,"Kullanılabilir host sayısı formülü hangisidir?",["2^n","2^n - 2","n x 2","2n - 1"],1,"n host bitiyse 2^n - 2 (ağ ve yayın adresi çıkarılır).","Eksi 2'yi unutmak en yaygın subnetting hatasıdır.");
  N("ccna",1,5,"/30 ağında kaç kullanılabilir host vardır?",["2","4","6","30"],0,"/30'da 2 host biti: 4 - 2 = 2. Router-router bağlantıları için idealdir.","4 adres var ama 2'si ağ ve yayın adresi.");
  N("ccna",2,5,"/26 bir ağın blok büyüklüğü (adım) kaçtır?",["16","32","64","128"],2,"/26'da son oktet maskesi 192; 256 - 192 = 64.","Blok büyüklüğü = 256 - maske değeri.");
  N("ccna",2,5,"10.0.0.0/24 ağının yayın (broadcast) adresi hangisidir?",["10.0.0.1","10.0.0.254","10.0.0.255","10.0.0.256"],2,"/24'te son oktet 255 yayın adresidir.","254 son kullanılabilir host, 255 yayındır.");
  N("ccna",3,5,"192.168.1.130/25 adresi hangi ağa aittir?",["192.168.1.0","192.168.1.64","192.168.1.128","192.168.1.192"],2,"/25 blok 128: 0-127 ve 128-255. 130 ikinci blokta, ağ 192.168.1.128.","Adresi blok büyüklüğüne bölüp tabana yuvarla.");
  N("ccna",3,5,"/28 bir ağda kaç kullanılabilir host vardır?",["6","14","16","30"],1,"/28'de 4 host biti: 16 - 2 = 14.","16 toplam adres sayısıdır, kullanılabilir 14.");
  N("ccna",1,6,"IPv6 adresi kaç bittir?",["32","64","128","256"],2,"IPv6 128 bittir, onaltılık (hex) yazılır.","IPv4 32 bit, IPv6 128 bit.");
  N("ccna",2,6,"fe80:: ile başlayan IPv6 adresi hangi türdür?",["Genel (global)","Link-local","Multicast","Loopback"],1,"fe80::/10 link-local, sadece aynı bağlantı üzerinde geçerlidir.","Link-local yönlendirilmez; router dışına çıkmaz.");
  N("ccna",2,6,"IPv6 adres kısaltmasında :: (çift iki nokta) bir adreste kaç kez kullanılabilir?",["Sınırsız","En fazla bir kez","En fazla iki kez","Hiç"],1,"Ardışık sıfır gruplarını :: ile yalnızca bir kez kısaltabilirsin.","İki kez kullanırsan kaç grup atlandığı belirsizleşir.");
  N("ccna",2,6,"IPv6'da yayın (broadcast) var mıdır?",["Evet","Hayır, multicast kullanılır","Sadece Wi-Fi'da","Sadece sunucularda"],1,"IPv6'da broadcast yoktur; yerine multicast ve anycast vardır.","Bu yüzden IPv6'da ARP yok; NDP aynı işi multicast ile yapar.");
  N("ccna",1,7,"TCP bağlantı kurarken üçlü el sıkışma sırası nedir?",["SYN, SYN-ACK, ACK","ACK, SYN, FIN","FIN, ACK, SYN","SYN, FIN, ACK"],0,"İstemci SYN yollar, sunucu SYN-ACK ile cevaplar, istemci ACK ile bitirir.","Telefonda 'alo - alo, duyuyorum - tamam' gibi düşün.");
  N("ccna",1,7,"HTTPS varsayılan olarak hangi port numarasını kullanır?",["22","53","80","443"],3,"HTTPS = 443, HTTP = 80.","22 SSH, 53 DNS portudur.");
  N("ccna",2,7,"DNS sorguları genelde hangi protokol ve port ile gider?",["TCP 80","UDP 53","TCP 22","UDP 69"],1,"Kısa DNS sorguları UDP 53 kullanır (büyük cevaplarda TCP 53).","DNS = 53 numarasını bilmen yeter.");
  N("ccna",1,7,"SSH hangi portu kullanır?",["21","22","23","25"],1,"SSH 22'dir; güvenli uzak yönetim sağlar.","Telnet 23'tür ve şifresizdir; yerine SSH kullan.");
  N("ccna",2,7,"Canlı görüntülü görüşmede gecikme önemli olduğu için genelde hangisi tercih edilir?",["TCP","UDP","ICMP","ARP"],1,"UDP bağlantısızdır, onay beklemez; küçük kayıp gecikmeden iyidir.","TCP kayıp paketi tekrar ister; canlı görüntüde bu takılma yapar.");
  N("ccna",2,8,"VLAN neyi bölmeye yarar?",["Broadcast domain'i","Kablo uzunluğunu","İnternet hızını","Şifreleri"],0,"Her VLAN ayrı bir broadcast domain'dir.","VLAN'lar mantıksal ağlardır; fiziksel kablo aynı kalabilir.");
  N("ccna",1,8,"Cisco switch'te varsayılan VLAN numarası kaçtır?",["0","1","10","100"],1,"Tüm portlar ilk başta VLAN 1'dedir.","Güvenlik için kullanıcıları VLAN 1'den ayırmak iyi pratiktir.");
  N("ccna",2,8,"Access portu ne demektir?",["Birden çok VLAN taşıyan port","Tek bir VLAN'a ait uç cihaz portu","Kapalı port","Konsol portu"],1,"Access portu bir VLAN'a bağlıdır; PC, yazıcı gibi uç cihazlar içindir.","Çok VLAN taşıyan port trunk'tır.");
  N("ccna",2,9,"802.1Q etiketi kaç byte'tır?",["2","4","8","16"],1,"802.1Q VLAN etiketi çerçeveye 4 byte ekler.","Etiket içinde VLAN ID 12 bittir (1-4094).");
  N("ccna",3,9,"Native VLAN trafiği trunk üzerinde nasıl gider?",["Etiketsiz","İki kat etiketli","Şifreli","Hiç gitmez"],0,"Native VLAN çerçeveleri etiketlenmeden geçer.","İki uçta native VLAN farklıysa karışıklık ve güvenlik riski oluşur.");
  N("ccna",2,10,"STP'de root bridge nasıl seçilir?",["En düşük Bridge ID","En yüksek MAC","En çok portu olan","Rastgele"],0,"En düşük Bridge ID (öncelik + MAC) root olur.","Küçük sayı kazanır; çünkü öncelik değeri düşük = daha yüksek tercih.");
  N("ccna",2,10,"STP'de blocking durumundaki port ne yapar?",["Veri çerçevelerini iletmez, döngüyü önler","Hızı iki katına çıkarır","Şifreler","Kapanır ve silinir"],0,"Fazla yolu kapatır; döngüyü engeller, ana yol bozulursa devreye girebilir.","Blocking arıza değil, bilinçli bir korumadır.");
  N("ccna",3,10,"PortFast hangi portlarda kullanılır?",["Switch'ler arası linklerde","Uç cihaz (PC) bağlı portlarda","Sadece fiber portlarda","Konsol portunda"],1,"PortFast, uç cihaz portunu STP bekleme süresi olmadan hemen açar.","Switch'e bağlı portta PortFast döngü riski yaratır.");
  N("ccna",2,11,"EtherChannel ne işe yarar?",["Birden çok fiziksel linki tek mantıksal link yapar","Wi-Fi'ı güçlendirir","IP dağıtır","VLAN siler"],0,"Fiziksel linkleri birleştirip bant genişliği ve yedeklilik kazandırır.","STP bunu tek link görür; fazla link bloklanmaz.");
  N("ccna",3,11,"Hangisi standart (IEEE) EtherChannel müzakere protokolüdür?",["LACP","PAgP","HSRP","VTP"],0,"LACP (IEEE 802.3ad, bugünkü adıyla 802.1AX) standarttır; PAgP Cisco'ya özeldir.","İki uçta da aynı mod ve ayarlar eşleşmeli.");
  N("ccna",1,12,"SSID nedir?",["Wi-Fi ağının adı","Şifre türü","Kablo markası","IP sınıfı"],0,"SSID, kablosuz ağın görünen adıdır.","Aynı SSID birden çok AP'de yayınlanabilir (roaming).");
  N("ccna",2,12,"2.4 GHz Wi-Fi'da birbirini örtüşmeyen kanallar hangileridir?",["1, 6, 11","1, 2, 3","2, 4, 6","5, 10, 15"],0,"2.4 GHz'de örtüşmeyen kanallar 1, 6 ve 11'dir.","Yan yana kanallar girişim yapar; komşu AP'lerde 1/6/11 dağıt.");
  N("ccna",2,13,"Yönlendirme tablosunda birden çok eşleşme varsa router hangisini seçer?",["En uzun prefix (en spesifik)","En kısa prefix","En eski kayıt","Rastgele"],0,"Longest prefix match: en spesifik (en büyük /sayı) rota kazanır.","/24 ile /16 ikisi de uyuyorsa /24 seçilir.");
  N("ccna",2,13,"Yönlendirme tablosunda 'C' kodu ne demektir?",["Doğrudan bağlı ağ","Statik rota","OSPF rotası","Hatalı rota"],0,"C = Connected: router'ın arayüzüne bağlı ağ.","Statik 'S', OSPF 'O' ile gösterilir.");
  N("ccna",3,13,"Administrative Distance (AD) hangi rotanın seçileceğini nasıl etkiler?",["Düşük AD daha güvenilirdir ve tercih edilir","Yüksek AD tercih edilir","AD hiç etkilemez","Sadece Wi-Fi'ı etkiler"],0,"Farklı kaynaktan aynı ağ için rota varsa düşük AD kazanır.","Statik 1, OSPF 110: statik daha güvenilir sayılır.");
  N("ccna",2,14,"'ip route 10.2.0.0 255.255.0.0 192.168.1.2' komutunda 192.168.1.2 neyi gösterir?",["Next-hop (sonraki router)","Hedef ağ","Alt ağ maskesi","DNS sunucusu"],0,"Son parametre paketin gönderileceği sonraki router'dır.","Sıra: hedef ağ, maske, next-hop.");
  N("ccna",2,14,"Varsayılan (default) statik rota hangi ağı gösterir?",["0.0.0.0/0","255.255.255.255/32","127.0.0.1/8","10.0.0.0/8"],0,"0.0.0.0/0 'bilmediğin her yere şuraya gönder' demektir.","Genelde internete çıkış için kullanılır.");
  N("ccna",2,15,"OSPF'in omurga alanı hangisidir?",["Area 0","Area 1","Area 100","Area 255"],0,"Tüm alanlar Area 0'a (backbone) bağlanmalıdır.","Area 0 olmadan çok alanlı OSPF tasarımı çalışmaz.");
  N("ccna",3,15,"OSPF metriği (cost) neye dayanır?",["Bant genişliği","Kablo rengi","Port sayısı","Cihaz yaşı"],0,"Cost bant genişliğiyle ters orantılıdır; hızlı link düşük maliyetlidir.","Hop sayısı RIP'in metriğidir, OSPF'in değil.");
  N("ccna",2,16,"FHRP (örn. HSRP) neden kullanılır?",["Varsayılan ağ geçidinin tek arıza noktası olmasını önlemek","Wi-Fi hızlandırmak","Şifre kırmak","VLAN eklemek"],0,"İki router sanal bir IP paylaşır; biri düşse diğeri devralır.","Hostlar sanal IP'yi gateway olarak bilir, hangi router'ın aktif olduğunu bilmez.");
  N("ccna",3,16,"HSRP'de hostlar gateway olarak hangi adresi kullanır?",["Aktif router'ın gerçek IP'si","Sanal IP","DNS IP'si","Yayın adresi"],1,"Hostlar sanal IP'ye yönelir; aktif router geçişi şeffaf olur.","Gerçek IP'yi gateway yaparsan yedeklilik işe yaramaz.");
  N("ccna",1,17,"DHCP'nin DORA adımları hangileridir?",["Discover, Offer, Request, Acknowledge","Delete, Open, Read, Add","Dial, Open, Route, Accept","Detect, Offer, Reset, Allow"],0,"İstemci keşfeder, sunucu teklif eder, istemci ister, sunucu onaylar.","Discover - Offer - Request - Ack: baş harfler DORA.");
  N("ccna",3,17,"DHCP sunucusu farklı bir alt ağdaysa router'a hangi komut eklenir?",["ip helper-address","ip route","ip nat inside","ntp server"],0,"ip helper-address, DHCP isteklerini sunucuya iletir (relay).","DHCP broadcast kullanır; router broadcast'ı geçirmez, helper gerekir.");
  N("ccna",1,18,"DNS'in A kaydı neyi eşler?",["Alan adı → IPv4 adresi","IP → MAC","MAC → port","Port → VLAN"],0,"A kaydı alan adını IPv4 adresine bağlar; AAAA IPv6 içindir.","ARP IP'yi MAC'e çevirir, DNS adı IP'ye.");
  N("ccna",2,18,"Alan adını elle sorgulamak için hangi komut kullanılır?",["nslookup","ipconfig /release","tracert","netstat"],0,"nslookup, DNS sunucusuna sorgu atar.","ping de adı çözer ama asıl amacı bağlantı testidir.");
  N("ccna",2,19,"PAT (NAT overload) ne yapar?",["Birçok iç cihazı tek genel IP üzerinde port numaralarıyla paylaştırır","Her cihaza ayrı genel IP verir","IPv6'ya çevirir","Şifreler"],0,"PAT, port numaralarıyla bir genel IP'yi çok cihaza paylaştırır.","Evdeki tüm cihazların tek internet IP'siyle çıkması PAT'tır.");
  N("ccna",3,19,"Statik NAT ne zaman kullanılır?",["Bir iç sunucuyu dışarıya sabit adresle yayınlamak için","Her gün değişen cihazlar için","Wi-Fi şifresi için","VLAN için"],0,"Birebir sabit eşleme: iç sunucu = sabit dış adres.","Dinamik NAT havuzdan geçici adres verir.");
  N("ccna",1,20,"NTP ne işe yarar?",["Cihazların saatini senkronize eder","Dosya aktarır","IP dağıtır","VLAN yapar"],0,"NTP tüm cihazlarda doğru ve aynı saati sağlar.","Saatler farklıysa log kayıtlarını sıraya koyamazsın.");
  N("ccna",2,20,"Syslog'da en acil seviye hangisidir?",["0 - Emergency","3 - Error","6 - Info","7 - Debug"],0,"Seviye 0 en ciddi, 7 en ayrıntılıdır.","Küçük sayı = daha acil.");
  N("ccna",2,21,"Port security ne yapar?",["Porttan izin verilen MAC adresi sayısını sınırlar","Portu hızlandırır","VLAN atar","IP verir"],0,"İzinsiz cihazın switch portuna takılmasını engeller.","Sticky MAC öğrendiği adresi yapılandırmaya yazar.");
  N("ccna",3,21,"Port security ihlalinde varsayılan 'shutdown' modunda port ne olur?",["err-disabled durumuna düşer","Hızlanır","Trunk olur","Hiçbir şey olmaz"],0,"Port kapatılır; yöneticinin açması gerekir.","Restrict modu ise yalnız ihlal eden paketi atar ve log yazar.");
  N("ccna",2,22,"ACL'nin sonunda görünmeyen kural nedir?",["Implicit deny (her şeyi engelle)","Implicit permit","Log kaydı","Yönlendirme"],0,"Eşleşmeyen her trafik gizli 'deny any' ile engellenir.","En az bir permit yazmazsan tüm trafik düşer.");
  N("ccna",2,22,"ACL kuralları nasıl işlenir?",["Yukarıdan aşağı, ilk eşleşmede durur","Aşağıdan yukarı","Rastgele","Hepsi birlikte"],0,"İlk eşleşen kural uygulanır; sonrasına bakılmaz.","Genel kuralı üste koyarsan özel kurallar hiç çalışmaz.");
  N("ccna",3,22,"Standart ve extended ACL farkı nedir?",["Standart sadece kaynak IP'ye, extended kaynak/hedef/porta bakar","Standart daha hızlıdır","Extended sadece Wi-Fi'dadır","Fark yok"],0,"Standart ACL kaynak adresine; extended kaynak, hedef, protokol ve porta bakar.","Standart ACL'yi hedefe yakın, extended'ı kaynağa yakın koy.");
  N("ccna",2,23,"AAA'daki üç A hangileridir?",["Authentication, Authorization, Accounting","Access, Admin, Audit","Alarm, Ack, Alert","Auto, Api, Acl"],0,"Kimsin? Neye yetkilisin? Ne yaptın? sorularının cevabıdır.","Kimlik doğrulama yetkilendirmeden önce gelir.");
  N("ccna",1,23,"VPN'in temel amacı nedir?",["Şifreli güvenli tünel kurmak","Kabloyu kısaltmak","Wi-Fi hızlandırmak","IP silmek"],0,"VPN, güvensiz ağ üzerinden şifreli tünel sağlar.","Evden çalışırken şirket ağına VPN ile bağlanırsın.");
  N("ccna",1,24,"Phishing nedir?",["Sahte mesajlarla kimlik veya şifre çalmaya çalışmak","Kablo kesmek","Ağı hızlandırmak","Yedek almak"],0,"Kullanıcıyı sahte e-posta veya sayfayla kandırma saldırısıdır.","Teknik değil insan zafiyetini hedefler; eğitim en iyi savunmadır.");
  N("ccna",2,24,"Hangisi Wi-Fi için en güncel ve güvenli şifreleme standardıdır?",["WEP","WPA","WPA2","WPA3"],3,"WPA3 en yeni ve güçlüdür; WEP kırılabilir ve kullanılmamalıdır.","WPA2 hâlâ yaygındır ama WPA3 daha güvenlidir.");
  N("ccna",1,25,"HTTP GET isteği ne yapar?",["Sunucudan veri okur","Veri siler","Şifre değiştirir","Cihaz kapatır"],0,"GET veri okur; POST oluşturur, PUT günceller, DELETE siler.","REST API'de GET güvenli ve veriyi değiştirmeyen istektir.");
  N("ccna",2,25,"JSON'da veri nasıl gösterilir?",["anahtar: değer çiftleriyle","Sadece sayılarla","Resimlerle","Ses dosyasıyla"],0,"JSON anahtar-değer çiftleri kullanır: {\"ad\": \"sw1\"}.","Anahtarlar tırnak içindedir; sonda fazla virgül hata verir.");
  N("ccna",2,25,"HTTP 404 ne anlama gelir?",["İstenen kaynak bulunamadı","İşlem başarılı","Sunucu hatası","Yetki yok"],0,"404 Not Found: istenen sayfa/kaynak bulunamadı. 200 başarılı, 500 sunucu hatası, 403 yasak.","4xx istemci hatası, 5xx sunucu hatasıdır.");
  N("ccna",2,26,"SDN'de kontrol düzlemi (control plane) nerededir?",["Merkezi controller'da","Her kabloda","Yazıcıda","Kullanıcı PC'sinde"],0,"SDN'de karar mantığı merkezi controller'a alınır; cihazlar sadece iletir.","Geleneksel ağda her cihaz kendi kararını verir.");
  N("ccna",3,26,"Southbound API ne işe yarar?",["Controller ile ağ cihazları arasında konuşur","Uygulamalarla controller arasında konuşur","Kullanıcıyı doğrular","Wi-Fi yayınlar"],0,"Southbound: controller → cihaz; northbound: uygulama → controller.","Yön: controller'ın altına (cihazlara) = south.");
  N("ccna",2,27,"Ansible'ın öne çıkan özelliği nedir?",["Agentless (cihaza ajan kurmaya gerek yok)","Sadece Windows'ta çalışır","Kablo çeker","Sadece Wi-Fi içindir"],0,"Ansible SSH ile bağlanır, cihazlara ayrı yazılım kurmaz.","Yapılandırma dosyaları YAML ile yazılır.");
  N("ccna",2,27,"Terraform neyi temsil eder?",["Altyapıyı kodla tanımlama (IaC)","Antivirüs","Kablo test cihazı","E-posta sunucusu"],0,"Terraform altyapıyı kodla tanımlayıp tekrarlanabilir kurar.","Elle tıklayarak kurmak yerine dosyadan otomatik kurulum.");
  /* ---- ENGLISH ---- */
  N("eng",1,1,"\"I ___ an IT administrator.\"",["am","is","are","be"],0,"I ile am kullanılır: I am.","I'm = I am; 'I is' hiç doğru değildir.");
  N("eng",1,1,"\"She ___ in Ankara.\"",["am","is","are","be"],1,"He/She/It ile is.","She are ve She am yanlıştır.");
  N("eng",1,1,"\"They ___ in the meeting room.\"",["is","am","are","be"],2,"They/We/You ile are.","Çoğul özne = are.");
  N("eng",1,1,"\"My name ___ Yusuf.\"",["are","am","is","be"],2,"Tekil isim (name) ile is.","My name's Yusuf kısaltması da doğrudur.");
  N("eng",2,1,"\"The printer ___ not working.\"",["am","is","are","do"],1,"Printer tekil (it) olduğu için is not working.","Is not = isn't.");
  N("eng",2,1,"\"Are you ready?\" sorusuna olumlu kısa cevap hangisi?",["Yes, I am.","Yes, I do.","Yes, I is.","Yes, I be."],0,"Are ile sorulana am/are/is ile cevap verilir: Yes, I am.","'do' ile cevap verme; soru are ile başladıysa cevap da be fiiliyle.");
  N("eng",1,2,"\"Can you help me?\" ne demektir?",["Bana yardım edebilir misin?","Sana yardım ettim","Yardım etmeliyim","Yardım ediyordum"],0,"Can you ...? = ...-abilir misin?","Can = -ebilmek; yetenek, izin, rica veya ihtimal anlatır.");
  N("eng",1,2,"\"I ___ access the VPN.\" (erişemiyorum)",["can","can not to","cannot","cans"],2,"cannot / can't = yapamıyorum.","can'ın sonuna s gelmez, ardından to da gelmez.");
  N("eng",1,2,"\"___ you reset my password?\" (yapabilir misin?)",["Can","Do","Are","Is"],0,"Can you + fiil (yalın): Can you reset?","Can'dan sonra fiil -s veya -ing almaz.");
  N("eng",2,2,"\"He can ___ the problem.\"",["fix","fixes","fixing","fixed"],0,"can'dan sonra yalın fiil gelir: can fix.","'He can fixes' yaygın hatadır.");
  N("eng",2,2,"Hangi cümle doğrudur?",["I can speaks English.","I can speak English.","I can speaking English.","I can to speak English."],1,"can + yalın fiil: I can speak.","Can'dan sonra -s, -ing, to yok.");
  N("eng",1,3,"\"___ you have a ticket number?\"",["Do","Does","Is","Are"],0,"You ile soru: Do you have?","Do/Does yardımcı fiildir, ardından fiil yalın gelir.");
  N("eng",2,3,"\"Does she ___ here?\"",["works","working","work","worked"],2,"Does'tan sonra yalın fiil: work.","Does zaten -s'yi taşır; fiile tekrar -s ekleme.");
  N("eng",1,3,"\"He ___ not know the answer.\"",["do","does","is","are"],1,"He/She/It ile does not.","He don't yaygın bir hatadır; doğrusu He doesn't.");
  N("eng",2,3,"\"We don't ___ Windows 7 anymore.\"",["uses","use","using","used"],1,"don't + yalın fiil: don't use.","Olumsuzda fiil hep yalın kalır.");
  N("eng",2,3,"\"___ the printer work?\"",["Do","Does","Is","Are"],1,"Printer (it) tekil: Does the printer work?","Soruda Does varken fiil work (s'siz) olur.");
  N("eng",1,4,"\"I ___ check it tomorrow.\" (kontrol edeceğim)",["will","did","am","can"],0,"will + yalın fiil gelecek zamandır.","will'den sonra to veya -ing gelmez.");
  N("eng",1,4,"\"will not\" kısaltması hangisidir?",["willn't","won't","wont'","wouldn't"],1,"will not = won't.","wouldn't başka bir kelimedir (would not).");
  N("eng",2,4,"\"I will ___ you an email.\"",["send","sent","sending","sends"],0,"will + yalın fiil: will send.","'will sent' yanlıştır; will'den sonra fiil V1.");
  N("eng",2,4,"\"Yarın dönüş yapacağım.\" hangisidir?",["I will get back to you tomorrow.","I got back tomorrow.","I am get back.","I back will."],0,"get back to you = sana dönüş yapmak; will ile gelecek.","Tomorrow (yarın) ile will kullanılır, got (geçmiş) değil.");
  N("eng",1,5,"\"You ___ restart the PC.\" (öneri: yeniden başlatmalısın)",["should","must not","can't","did"],0,"should = -meli, -malı (tavsiye).","must daha güçlü zorunluluktur.");
  N("eng",2,5,"\"You ___ share your password.\" (yasak)",["must not","should","can","will"],0,"must not = kesinlikle yapma (yasak).","don't have to ise 'zorunda değilsin' demektir; yasak değildir.");
  N("eng",2,5,"Hangisi daha güçlü bir zorunluluk bildirir?",["should","must","could","might"],1,"must güçlüdür; should tavsiye düzeyindedir.","Politika ve güvenlik kurallarında must kullanılır.");
  N("eng",1,6,"\"___ you send me the file, please?\" (nazik rica)",["Could","Did","Are","Do"],0,"Could you ...? daha nazik rica kalıbıdır.","Rica ederken please eklemeyi unutma.");
  N("eng",1,6,"\"I ___ like a coffee.\" (rica/istek)",["would","will not","can't","did"],0,"I would like = ... istiyorum (nazik).","I'd like kısaltması çok yaygındır.");
  N("eng",2,6,"Hangisi en nazik rica cümlesidir?",["Give me the report.","Send the report.","Could you send me the report, please?","You send report."],2,"Could you ... please? en nazik formdur.","Emir kipi iş yerinde sert durabilir.");
  N("eng",1,7,"\"I ___ to update the server.\" (güncellemem gerek)",["have","has","must","do"],0,"I have to + fiil = -mem gerek.","He/She için has to kullanılır.");
  N("eng",2,7,"\"She ___ to work tonight.\"",["have","has","having","haves"],1,"She ile has to.","'She have to' yaygın hatadır.");
  N("eng",2,7,"\"You don't have to come.\" ne demek?",["Gelmen yasak","Gelmek zorunda değilsin","Gelmelisin","Geldin"],1,"don't have to = zorunda değilsin (yasak değil).","must not ile karıştırma: must not yasak, don't have to serbest.");
  N("eng",1,8,"\"Yesterday I ___ the server.\" (yeniden başlattım)",["restart","restarts","restarted","restarting"],2,"Geçmiş zaman düzenli fiil: restart + ed.","Yesterday geçmiş zaman işaretidir.");
  N("eng",2,8,"\"go\" fiilinin geçmiş hali (V2) hangisidir?",["goed","went","gone","going"],1,"go - went - gone. Düzensiz fiildir.","gone V3'tür (have gone).");
  N("eng",2,8,"\"Did you ___ the email?\"",["receive","received","receives","receiving"],0,"Did'den sonra fiil yalın: receive.","Did zaten geçmişi taşır; fiile -ed ekleme.");
  N("eng",2,9,"\"I ___ never seen this error before.\"",["have","am","did","do"],0,"have + V3: have seen (deneyim).","never ile present perfect: I have never seen.");
  N("eng",2,9,"\"She ___ fixed the issue.\"",["have","has","is","do"],1,"She ile has + V3.","He/She/It = has.");
  N("eng",3,9,"\"I have worked here ___ three years.\"",["since","for","from","at"],1,"for + süre (three years); since + başlangıç noktası.","since 2024 ama for two years.");
  N("eng",1,10,"\"___ is your name?\"",["What","Where","Why","Who is"],0,"What = ne; adını sorarken What.","Where yer sorar, Why neden sorar.");
  N("eng",1,10,"\"___ did the server crash?\" (neden)",["Why","Where","Who","When is"],0,"Why = neden.","Because ile cevap verilir.");
  N("eng",2,10,"\"___ do you work?\" (nerede)",["Where","What","Why","How many"],0,"Where = nerede.","Cevap: I work in Ankara.");
  N("eng",1,11,"\"The server is slow ___ the disk is full.\"",["because","so","but","or"],0,"because = çünkü (sebep).","Sebep because'dan sonra gelir.");
  N("eng",2,11,"\"The disk is full, ___ the server is slow.\"",["because","so","but","if"],1,"so = bu yüzden (sonuç).","Sonucu so'dan sonra yazarsın.");
  N("eng",2,11,"\"I tried, ___ it did not work.\"",["so","because","but","and so"],2,"but = ama (karşıtlık).","Karşıt iki fikri but bağlar.");
  N("eng",1,12,"E-postada kapanış için hangisi uygundur?",["Best regards,","Bye bye","See you never","Hello,"],0,"Best regards resmi kapanıştır.","Hello bir başlangıçtır, kapanış değil.");
  N("eng",2,12,"\"I am writing to report a problem.\" ne anlama gelir?",["Bir sorunu bildirmek için yazıyorum","Sorunu çözdüm","Sorun yok","Seni arayacağım"],0,"I am writing to + fiil = ...-mek için yazıyorum.","Resmi e-postanın tipik açılış cümlesidir.");
  N("eng",1,12,"\"Please find attached the report.\" ne demek?",["Rapor ekte, bakmanı rica ederim","Raporu sildim","Raporu bekle","Rapor kayıp"],0,"Ek dosya bildirimi kalıbıdır.","find attached = ekte bulabilirsin.");
  N("eng",1,13,"\"Could you repeat that, please?\" ne demek?",["Bunu tekrar eder misin?","Bunu yazdım","Toplantı bitti","Sesi kapat"],0,"Anlamadığında nazikçe tekrar istersin.","Sorun değil; anlamadığını söylemek profesyonelce.");
  N("eng",2,13,"\"Let me share my screen.\" ne demek?",["Ekranımı paylaşayım","Ekranı kapatayım","Bilgisayarı kapatayım","Sesi açayım"],0,"Online toplantıda ekran paylaşımı kalıbı.","Let me + yalın fiil = ...-ayım.");
  N("eng",3,13,"\"I'll put you on hold.\" telefonda ne demek?",["Seni beklemeye alıyorum","Seni arıyorum","Seni engelliyorum","Seni kapatıyorum"],0,"on hold = beklemede.","Hold on! = bir saniye bekle.");
  /* şık sırasını soru numarasına bağlı sabit karıştır (cevap hep A olmasın); ilk 41 soru eski kayıtlar için aynı kalır */
  QB.forEach(function(q,i){if(i<41)return;var r=rngf(i*2654435761+7),idx=q.o.map(function(_,k){return k});idx=shuf(idx,r);var o=idx.map(function(k){return q.o[k]});q.a=idx.indexOf(q.a);q.o=o});
})();
var COEF=[0,1,1.5,2],DN=["","kolay","orta","zor"];
var LL=[["Çaylak",0],["Çırak",100],["Usta",300],["Üstat",700],["Efsane",1500]];
var BANDS=[["Başlangıç",0,1],["Orta",2,2],["İleri",3,4]];
var STARTLV={yeni:0,orta:2,ileri:3};
S.league=[];S.names={};S.me=null;S.guest=false;S.nonOwner=false;function MYN(){return S.nonOwner?((S.names&&S.me&&S.names[S.me])||""):"Yusuf"}function UN(){return S.nonOwner?"Kullanıcı":"Yusuf"}S.userCap=null;S.lgLoaded=false;S.cheers=[];S.lnotes=[];
S.lg={view:"bugun",open:null,cmp:null,board:"fair",band:"all",front:{}};
function dayNum(s){return Math.floor(parse(s).getTime()/864e5)}
function rngf(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;var t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function shuf(a,r){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(r()*(i+1)),x=a[i];a[i]=a[j];a[j]=x}return a}
function bandOf(lv){return lv<=1?0:lv===2?1:2}
function dailyQsLegacy(date,lv){
  var b=bandOf(lv),spec=[[["ccna",[1,1,2]],["eng",[1,1]]],[["ccna",[1,2,2]],["eng",[2,2]]],[["ccna",[2,3,3]],["eng",[2,3]]]][b],r=rngf(dayNum(date)*7919+13+b*101),out=[],used={};
  spec.forEach(function(sp){
    var pool=shuf(QB.map(function(q,i){return {q:q,i:i}}).filter(function(x){return x.q.t===sp[0]&&x.i<41}),r);
    sp[1].forEach(function(dd){
      var pk=pool.filter(function(x){return !used[x.i]&&x.q.d===dd})[0]||pool.filter(function(x){return !used[x.i]&&Math.abs(x.q.d-dd)<=1})[0]||pool.filter(function(x){return !used[x.i]})[0];
      if(pk){used[pk.i]=1;out.push(Object.assign({_i:pk.i},pk.q))}
    });
  });
  return out;
}
function topicSeq(id){var m=/^[ce](\d+)$/.exec(String(id));return m?+m[1]:null}
function studiedMax(track){
  var mx=0,any=false,nx=null,has=false;
  S.topics.forEach(function(t){if(t.track!==track)return;has=true;var n=topicSeq(t.id);if(n==null)return;
    if(t.status==="built"||t.status==="building"){any=true;mx=Math.max(mx,n)}
    if(t.status==="next"&&(nx==null||n<nx))nx=n});
  S.lessons.forEach(function(l){if(l.track!==track||!l.topicId||(l.date&&l.date>today()))return;var n=topicSeq(l.topicId);if(n!=null){any=true;mx=Math.max(mx,n)}});
  if(!has&&!any)return 99;
  if(!any)return nx||1;
  return mx;
}
function topicNameOf(track,k){var id=(track==="eng"?"e":"c")+(k<10?"0":"")+k,t=S.topics.filter(function(x){return x.id===id})[0];return t?t.name:null}
function recentIds(me,date){
  var d=(me&&me.d)||{},out={},from=dayNum(date)-6;
  Object.keys(d).forEach(function(k){if(k<date&&dayNum(k)>=from&&Array.isArray(d[k].qs))d[k].qs.forEach(function(i){out[i]=1})});
  return out;
}
function dailyQs2(date,lv,me){
  var b=bandOf(lv),spec=[[["ccna",[1,1,1,2,2]],["eng",[1,1,2]]],[["ccna",[1,2,2,2,3]],["eng",[1,2,2]]],[["ccna",[2,2,3,3,3]],["eng",[2,3,3]]]][b],r=rngf(dayNum(date)*7919+29+b*101),out=[],used={},seen=recentIds(me,date);
  spec.forEach(function(sp){
    var tr=sp[0],mx=studiedMax(tr);
    var base=shuf(QB.map(function(q,i){return {q:q,i:i}}).filter(function(x){return x.q.t===tr}),r);
    var pool=base.filter(function(x){return x.q.k==null||x.q.k<=mx}),wide=base.filter(function(x){return x.q.k!=null&&x.q.k>mx&&x.q.k<=mx+3});
    sp[1].forEach(function(dd,j){
      function free(arr,fn){return arr.filter(function(x){return !used[x.i]&&fn(x)})}
      var rec=function(x){return x.q.k!=null&&x.q.k>=mx-1},fresh=function(x){return !seen[x.i]},ex=function(x){return x.q.d===dd},near=function(x){return Math.abs(x.q.d-dd)<=1};
      var tries=[];
      [pool].forEach(function(P){
        var wantRec=j%2===0;
        tries.push(free(P,function(x){return ex(x)&&fresh(x)&&(!wantRec||rec(x))}),free(P,function(x){return ex(x)&&fresh(x)}),free(P,function(x){return near(x)&&fresh(x)}),free(P,function(x){return ex(x)}),free(P,near),free(P,function(){return true}));
      });
      tries.push(free(wide,near),free(wide,function(){return true}));
      var pk=null;for(var t=0;t<tries.length&&!pk;t++)pk=tries[t][0]||null;
      if(pk){used[pk.i]=1;out.push(Object.assign({_i:pk.i,_pre:(pk.q.k!=null&&pk.q.k>mx)},pk.q))}
    });
  });
  var miss=(me&&Array.isArray(me.miss)?me.miss:[]).filter(function(m){return m&&typeof m.i==="number"&&QB[m.i]&&(QB[m.i].t==="ccna"||QB[m.i].t==="eng")&&String(m.d)<date&&!used[m.i]}).sort(function(a,b){return String(a.d).localeCompare(String(b.d))}).slice(0,2);
  miss.forEach(function(m){used[m.i]=1;out.push(Object.assign({_i:m.i,_rv:true},QB[m.i]))});
  return out;
}
function qsFor(date,lv){
  var me=myLeague(),day=me&&me.d&&me.d[date];
  if(day&&Array.isArray(day.qs)&&day.qs.length){
    var rv={};(Array.isArray(day.rv)?day.rv:[]).forEach(function(i){rv[i]=1});
    return day.qs.map(function(i){return QB[i]?Object.assign({_i:i,_rv:!!rv[i]},QB[i]):null}).filter(Boolean);
  }
  if(day&&Array.isArray(day.a)&&day.a.length&&day.v!==2)return dailyQsLegacy(date,lv);
  if(!S.ready2&&!S.topics.length)return [];
  return dailyQs2(date,lv,me);
}
function myLeague(){return S.league.filter(function(x){return x.id===S.me})[0]||null}
function cfgOf(doc){var c=doc&&doc.cfg&&typeof doc.cfg==="object"?doc.cfg:{};return {target:[3,5,7].indexOf(c.target)>=0?c.target:5,mins:[15,30,60].indexOf(c.mins)>=0?c.mins:30,start:STARTLV[c.start]!=null?c.start:"yeni"}}
function dayPts(x){if(!x)return 0;if(typeof x.pts==="number")return x.pts;return num(x.ok)*10+(num(x.tot)>=5&&num(x.ok)===num(x.tot)?5:0)}
function weekStart(k){return iso(mondayOf(parse(k)))}
function lgStats(doc){
  var d=(doc&&doc.d&&typeof doc.d==="object")?doc.d:{},cfg=cfgOf(doc),keys=Object.keys(d).filter(function(k){return num(d[k]&&d[k].tot)>0}).sort(),tot=0,days=keys.length,W={};
  keys.forEach(function(k){var x=d[k],p=dayPts(x);tot+=p;var wk=weekStart(k),o=W[wk]=W[wk]||{pts:0,wok:0,w:0,days:0};o.pts+=p;o.days++;
    o.wok+=typeof x.wok==="number"?x.wok:num(x.ok);o.w+=typeof x.w==="number"?x.w:num(x.tot)});
  var lvP=0;LL.forEach(function(l,i){if(tot>=l[1])lvP=i});
  var lv=Math.max(lvP,STARTLV[cfg.start]||0),nx=LL[lv+1]||null;
  var mon=iso(mondayOf(new Date())),cur=W[mon]||{pts:0,wok:0,w:0,days:0};
  var since=str(doc&&doc.since)||(keys[0]||today());if(keys[0]&&keys[0]<since)since=keys[0];
  var from=since>mon?since:mon,elapsed=Math.max(1,Math.min(7,Math.round((parse(today())-parse(from))/864e5)+1));
  var expected=Math.max(1,Math.ceil(cfg.target*elapsed/7)),consist=Math.min(100,Math.round(cur.days/expected*100));
  var accAdj=(cur.wok+3.6)/(cur.w+6),accRaw=cur.w>0?cur.wok/cur.w:null;
  var prev=Object.keys(W).filter(function(k){return k<mon&&W[k].w>=3}).sort().slice(-3),pAcc=prev.length?prev.reduce(function(a,k){return a+W[k].wok/W[k].w},0)/prev.length:null;
  var gel=(pAcc!=null&&accRaw!=null)?Math.max(0,Math.min(100,Math.round(50+(accRaw-pAcc)*200))):50;
  var fair=cur.days>0?Math.round(0.4*accAdj*100+0.35*consist+0.25*gel):null;
  var st=0,x=new Date();if(!d[iso(x)]||!num(d[iso(x)].tot))x.setDate(x.getDate()-1);
  while(d[iso(x)]&&num(d[iso(x)].tot)>0){st++;x.setDate(x.getDate()-1)}
  var t=d[today()]||{ok:0,tot:0,a:[]},last=keys.length?keys[keys.length-1]:null,ago=last?Math.round((parse(today())-parse(last))/864e5):null;
  var act=[];for(var i=13;i>=0;i--){var dd=new Date();dd.setDate(dd.getDate()-i);var e=d[iso(dd)];act.push(e&&num(e.tot)>0?(num(e.tot)>=num(e.n||5)&&num(e.ok)===num(e.tot)?2:1):0)}
  return {tot:tot,wk:cur.pts,days:days,streak:st,lv:lv,lvName:LL[lv][0],next:nx,toNext:nx?nx[1]-tot:0,today:t,fair:fair,acc:accRaw==null?null:Math.round(accRaw*100),accAdj:Math.round(accAdj*100),consist:consist,gel:gel,gelD:(pAcc!=null&&accRaw!=null)?Math.round((accRaw-pAcc)*100):null,expected:expected,played:cur.days,cfg:cfg,since:since,isNew:Math.round((parse(today())-parse(since))/864e5)<14,ago:ago,act:act,band:bandOf(lv)};
}
function nameOf(id){return id===S.me?"Sen":(S.names[id]||"Arkadaş")}
function resolveNames(){
  var u=S.userCap;if(!u||!u.profiles)return;
  var ids=S.league.map(function(x){return x.id}).filter(function(id){return id!==S.me&&S.names[id]==null});
  if(!ids.length)return;
  ids.forEach(function(id){S.names[id]=""});
  Promise.resolve(u.profiles(ids)).then(function(ps){ids.forEach(function(id){S.names[id]=(ps&&ps[id]&&ps[id].name)||""});sched()}).catch(function(){});
}
function acadSnap(){var s=idStats();return {rank:s.rank,xp:s.xp,streak:s.streak,ccna:s.ccna,eng:s.eng}}
function saveMe(patch){
  if(!S.db||!S.me||!S.canWrite)return;
  var me=myLeague()||{id:S.me},doc=Object.assign({},me);delete doc.id;
  for(var k in patch)doc[k]=patch[k];
  if(!doc.since)doc.since=today();
  doc.ts=new Date().toISOString();
  S.db.doc("league/"+S.me).set(doc).catch(function(){});
  S.league=S.league.filter(function(x){return x.id!==S.me}).concat([Object.assign({id:S.me},doc)]);
}
function syncLeagueMe(){
  if(!S.db||!S.me||!S.canWrite||S.guest||!S.lgLoaded||!S.ready2)return;
  var me=myLeague(),a=acadSnap();
  if(!S.pf.share){if(me&&me.acad)saveMe({acad:null});return}
  if(me&&JSON.stringify(me.acad||{})===JSON.stringify(a))return;
  saveMe({acad:a});
}
function myTier(){var me=myLeague(),s=lgStats(me),d=me&&me.d&&me.d[today()];return (d&&typeof d.lv==="number")?d.lv:s.lv}
function answerQ(i,choice){
  if(!S.db||!S.me||!S.canWrite)return;
  var me=myLeague()||{id:S.me},tier=myTier(),qs=qsFor(today(),tier),q=qs[i];if(!q)return;
  var d=Object.assign({},me.d||{}),day=Object.assign({ok:0,tot:0,w:0,wok:0,pts:0,a:[],lv:tier},d[today()]||{});
  day.a=(day.a||[]).slice();if(day.a[i]!=null)return;
  if(!day.v&&!day.a.length){day.v=2;day.qs=qs.map(function(x){return x._i});day.rv=qs.filter(function(x){return x._rv}).map(function(x){return x._i});day.n=qs.length}
  var c=COEF[q.d]||1,n=num(day.n)||5;day.a[i]=choice;day.tot=num(day.tot)+1;day.w=num(day.w)+c;
  var right=choice===q.a;
  if(right){day.ok=num(day.ok)+1;day.wok=num(day.wok)+c;day.pts=num(day.pts)+Math.round(10*c)}
  if(day.tot===n&&day.ok===day.tot)day.pts=num(day.pts)+5;
  d[today()]=day;
  var ks=Object.keys(d).sort();ks.slice(0,Math.max(0,ks.length-60)).forEach(function(k){delete d[k]});
  var miss=(Array.isArray(me.miss)?me.miss:[]).filter(function(m){return m&&typeof m.i==="number"&&m.i!==q._i});
  if(!right)miss.push({i:q._i,d:today()});
  var patch={d:d,miss:miss.slice(-20)};if(!S.guest&&!me.acad&&S.pf.share)patch.acad=acadSnap();
  saveMe(patch);
  S.lg.front[i]=false;
  if(day.tot===n&&day.ok===n)burst();
  draw();
}
function autoNote(s){
  if(s.days===0)return "Henüz başlamadın. İlk tur 5 soru, yaklaşık 2 dakika; puan değil alışkanlık kuruyorsun.";
  var n=[];
  if(s.played===0)n.push("Bu hafta henüz oynamadın. Hedefin haftada "+s.cfg.target+" gün; bugün bir tur yeter.");
  else if(s.consist<60)n.push("Bu hafta hedefinin gerisindesin ("+s.played+"/"+s.expected+" gün). Günde tek tur bile işe yarar.");
  else if(s.consist>=100)n.push("Haftalık hedefini tutturuyorsun, istikrarın güçlü.");
  if(s.gelD!=null){if(s.gelD>=8)n.push("Doğruluğun geçen haftalara göre %"+s.gelD+" arttı; gelişim bu ligin asıl ödülü.");else if(s.gelD<=-10)n.push("Bu hafta doğruluğun biraz düştü; yanlışların açıklamasını oku, aynı konu tekrar gelecek.")}
  if(s.acc!=null&&s.acc<55)n.push("Zorlanıyorsan normal. Sorular seviyene göre seçiliyor; açıklamaları okumak puandan değerli.");
  if(s.streak>=5)n.push(s.streak+" günlük seri harika.");
  if(s.isNew)n.push("Yeni üye korumasındasın: istikrar puanın katıldığın günden itibaren hesaplanıyor.");
  return n.slice(0,3).join(" ")||"İyi gidiyorsun, aynı tempoda devam.";
}
function lnoteFor(id){var l=S.lnotes.slice().sort(function(a,b){return String(b.week).localeCompare(String(a.week))})[0];if(!l)return null;var p=l.perUser&&l.perUser[id];return {head:str(l.headline),note:p&&str(p.note||p),week:str(l.week)}}
function agoText(a){return a==null?"hiç oynamadı":a===0?"bugün aktif":a===1?"dün aktif":a+" gün önce"}
function cheerOf(id){return S.cheers.filter(function(c){return c.to&&c.to[id]}).length}
function cheered(id){var c=S.cheers.filter(function(x){return x.id===S.me})[0];return !!(c&&c.to&&c.to[id]===today())}
function cheerTo(id){
  if(!S.db||!S.me||!S.canWrite||id===S.me||cheered(id))return;
  var c=S.cheers.filter(function(x){return x.id===S.me})[0]||{id:S.me,to:{}},to=Object.assign({},c.to||{});to[id]=today();
  var doc={to:to,ts:new Date().toISOString()};S.db.doc("cheers/"+S.me).set(doc).catch(function(){});
  S.cheers=S.cheers.filter(function(x){return x.id!==S.me}).concat([Object.assign({id:S.me},doc)]);draw();
}
function seg(items,cur,set){return h("div",{class:"seg",role:"tablist"},items.map(function(x){return h("button",{class:"segb"+(x[0]===cur?" on":""),type:"button",role:"tab","aria-selected":x[0]===cur?"true":"false",onclick:function(){set(x[0]);draw()}},x[1])}))}
function qBack(q,a,i){
  var L=S.lg,wrong=a!==q.a,front=L.front[i]===true;
  var tn=q.k!=null?topicNameOf(q.t,q.k):null;
  if(wrong&&!front)return h("div",{class:"qback"},
    h("div",{class:"qb-h"},h("b",null,"Kartın arkası"),tn?h("span",{class:"pill"},tn):null),
    h("div",{class:"qb-q"},q.q),
    h("div",{class:"qb-r"},h("small",null,"Doğrusu"),h("div",{class:"qb-a ok"},h("span",null,String.fromCharCode(65+q.a)),q.o[q.a])),
    h("div",{class:"qb-r"},h("small",null,"Senin seçimin"),h("div",{class:"qb-a bad"},h("span",null,String.fromCharCode(65+a)),q.o[a])),
    h("div",{class:"qb-r"},h("small",null,"Neden doğru?"),h("p",null,q.w)),
    q.x?h("div",{class:"qb-r"},h("small",null,"Sık yapılan hata"),h("p",null,q.x)):null,
    h("div",{class:"small mute"},"Bu soru birkaç gün sonra tekrar karşına çıkacak."),
    h("button",{class:"btn ghost",type:"button",onclick:function(){L.front[i]=true;draw()}},"Soruya dön"));
  return h("div",{class:"fb "+(wrong?"bad":"good")},h("b",null,wrong?"Olmadı.":"Doğru."),h("p",{style:"margin:0"},q.w),
    !wrong&&q.x?h("p",{class:"small mute",style:"margin:0"},"İpucu: "+q.x):null,
    wrong?h("button",{class:"btn ghost",type:"button",onclick:function(){L.front[i]=false;draw()}},"Kartın arkasını çevir"):null);
}
function renderChallenge(){
  var tier=myTier(),qs=qsFor(today(),tier),me=myLeague(),st=lgStats(me),t=st.today,ans=t.a||[],N=qs.length;
  var out=[h("div",{class:"panel lgc"},h("div",{class:"label"},"Günün meydan okuması"),h("h2",null,N?(N+" soru, "+Math.max(3,Math.round(N*0.4))+" dakika"):"Sorular hazırlanıyor"),
    h("div",{class:"small mute"},"Sorular işlediğin konulardan ve seviyenden ("+BANDS[bandOf(tier)][0]+") seçilir; önceki yanlışların birkaç gün sonra tekrar gelir. Zor sorular daha çok puan verir: kolay ×1, orta ×1,5, zor ×2. Hepsini doğru yaparsan +5 bonus."),
    h("div",{class:"qdots","aria-label":"ilerleme"},qs.map(function(q,i){var a=ans[i];return h("i",{class:a==null?"":(a===q.a?"ok":"bad")})})))];
  if(!S.me)return out.concat(h("div",{class:"empty"},"Lig bu görünümde kullanılamıyor (oturum bilgisi yok)."));
  qs.forEach(function(q,i){
    var a=ans[i],done=a!=null,wrong=done&&a!==q.a,showBack=wrong&&S.lg.front[i]!==true,tn=q.k!=null?topicNameOf(q.t,q.k):null;
    out.push(h("div",{class:"panel qc"+(showBack?" flipped":"")},h("div",{class:"tk-top"},h("span",{class:"pill "+(q.t==="eng"?"eng":"")},q.t==="eng"?"İngilizce":"Ağ"),h("span",{class:"pill"},DN[q.d]+" ×"+COEF[q.d]),q._rv?h("span",{class:"pill nw"},"tekrar"):null,q._pre?h("span",{class:"pill"},"ön izleme"):null,h("span",{class:"pill"},(i+1)+"/"+N)),
      tn&&!showBack?h("div",{class:"small mute"},"Konu: "+tn):null,
      showBack?null:h("b",{class:"qq"},q.q),
      showBack?null:h("div",{class:"qopts"},q.o.map(function(o,k){
        var cls="qo"+(done?(k===q.a?" ok":(k===a?" bad":" dim")):"");
        return h("button",{class:cls,type:"button",disabled:done||!S.canWrite,onclick:function(){answerQ(i,k)}},h("span",null,String.fromCharCode(65+k)),o)})),
      done?qBack(q,a,i):null));
  });
  if(N&&num(t.tot)>=N)out.push(h("div",{class:"panel lgdone"},h("h2",null,t.ok===N?"Mükemmel gün":"Bugünkü tur bitti"),
    h("div",null,t.ok+"/"+N+" doğru · +"+dayPts(t)+" puan. Yarın yeni sorular gelir; yanlışların bir kısmı tekrar olarak döner."),
    h("div",{class:"small mute"},st.next?("Sonraki seviye: "+st.next[0]+" ("+st.toNext+" puan kaldı)"):"En üst seviyedesin.")));
  return out;
}
function fairLine(s){return "doğruluk "+(s.acc==null?"–":s.acc)+" · istikrar "+s.consist+" · gelişim "+(s.gelD==null?"–":(s.gelD>0?"+":"")+s.gelD)}
function renderBoard(){
  var L=S.lg,rows=S.league.map(function(x){return {id:x.id,doc:x,s:lgStats(x)}}).filter(function(r){return L.band==="all"||r.s.band===+L.band});
  rows.sort(function(a,b){return L.board==="fair"?((b.s.fair==null?-1:b.s.fair)-(a.s.fair==null?-1:a.s.fair)||b.s.tot-a.s.tot):(b.s.wk-a.s.wk||b.s.tot-a.s.tot)});
  var med=["🥇","🥈","🥉"],ln=lnoteFor("*"),out=[];
  out.push(h("div",{class:"panel"},h("div",{class:"label"},"Bu hafta"),h("h2",null,"Lig sıralaması"),
    seg([["fair","Adil puan"],["raw","Ham puan"]],L.board,function(v){L.board=v}),
    h("div",{class:"chiprow"},[["all","Hepsi"]].concat(BANDS.map(function(b,i){return [String(i),b[0]]})).map(function(x){return h("button",{class:"fchip"+(String(L.band)===x[0]?" on":""),type:"button",onclick:function(){L.band=x[0];draw()}},x[1])})),
    h("div",{class:"small mute"},L.board==="fair"?"Adil puan: doğruluk %40 (zorluk ağırlıklı), istikrar %35 (kendi haftalık hedefine göre), gelişim %25 (geçmiş haftalarına göre). Az soruda şans etkisi düşürülür.":"Ham puan: sadece topladığın puan. Zor soru ve seviye farkı hesaba katılmaz."),
    !rows.length?h("div",{class:"empty"},"Bu grupta kimse yok."):h("div",{class:"tlist"},rows.map(function(r,i){
      var open=L.open===r.id,a=r.doc.acad,s=r.s;
      return h("div",{class:"lrow"+(r.id===S.me?" me":"")},
        h("button",{class:"lhead",type:"button","aria-expanded":open?"true":"false",onclick:function(){L.open=open?null:r.id;draw()}},
          h("span",{class:"lpos"},i<3&&(L.board==="raw"||s.fair!=null)?med[i]:String(i+1)),
          h("span",{class:"tt"},h("b",null,nameOf(r.id),s.isNew?h("span",{class:"pill nw"},"yeni"):null),h("small",null,"Lv"+(s.lv+1)+" "+s.lvName+" · "+(s.streak?s.streak+" gün seri":agoText(s.ago)))),
          h("span",{class:"lpts"},h("b",null,L.board==="fair"?(s.fair==null?"–":s.fair):s.wk),h("small",null,L.board==="fair"?"adil":"puan"))),
        open?h("div",{class:"ldet"},
          h("div",{class:"lwide"},h("small",null,fairLine(s))),
          h("div",null,h("b",null,s.wk),h("small",null,"hafta puanı")),h("div",null,h("b",null,s.tot),h("small",null,"toplam")),
          h("div",null,h("b",null,num(s.today.tot)>0?s.today.ok+"/"+num(s.today.n||5):"–"),h("small",null,"bugün")),
          a&&a.rank?h("div",{class:"lacad"},h("small",null,"Akademi"),h("b",null,a.rank+" · "+a.xp+" XP"),h("small",null,"CCNA "+a.ccna+" bina · İng. "+a.eng+" basamak")):null):null);
    }))));
  var lr=S.lnotes.slice().sort(function(a,b){return String(b.week).localeCompare(String(a.week))})[0];
  if(lr&&lr.headline)out.push(h("div",{class:"panel"},h("div",{class:"label"},"Müdür notu · "+str(lr.week)),h("div",null,str(lr.headline))));
  out.push(h("details",{class:"panel more"},h("summary",null,"Adalet kuralları"),
    h("ul",{class:"fnd"},
      h("li",null,"Sorular seviyene göre seçilir; yeni başlayan kolay sorularla, ileri düzey zor sorularla yarışır."),
      h("li",null,"Zor soru daha değerli: kolay ×1, orta ×1,5, zor ×2."),
      h("li",null,"İstikrar, herkesin kendi seçtiği haftalık hedefine (3, 5 ya da 7 gün) göre ölçülür. Az zamanı olan da eşit şansa sahip."),
      h("li",null,"Yeni üyenin istikrarı katıldığı günden başlar; ilk iki hafta \"yeni\" etiketi taşır."),
      h("li",null,"Gelişim, kendi geçmiş haftalarınla kıyaslanır: yeni başlayan da hızlı ilerlerse yukarı çıkar."),
      h("li",null,"Birkaç soruda şans etkisini azaltmak için doğruluk, küçük bir ön değerle yumuşatılır."))));
  return out;
}
function bar2(label,a,b,unit){
  function w(v){return Math.max(2,Math.min(100,v==null?0:v))+"%"}
  return h("div",{class:"cmp2"},h("div",{class:"cl"},label),
    h("div",{class:"cb me"},h("i",{style:"width:"+w(a)}),h("b",null,a==null?"–":a+(unit||""))),
    h("div",{class:"cb th"},h("i",{style:"width:"+w(b)}),h("b",null,b==null?"–":b+(unit||""))));
}
function renderFriends(){
  var me=myLeague(),ms=lgStats(me),others=S.league.filter(function(x){return x.id!==S.me}),out=[];
  if(!others.length)return [h("div",{class:"panel"},h("div",{class:"label"},"Arkadaşlar"),h("h2",null,"Henüz kimse yok"),
    h("div",{class:"small mute"},S.guest?"Burada diğer katılımcıları göreceksin.":"Paylaş menüsünden bir arkadaşını Contributor olarak ekle. İlk turu çözünce burada görünür."))];
  var cmp=S.lg.cmp&&others.filter(function(x){return x.id===S.lg.cmp})[0];
  if(cmp){
    var o=lgStats(cmp);
    out.push(h("div",{class:"panel"},h("button",{class:"btn ghost",type:"button",onclick:function(){S.lg.cmp=null;draw()}},"← Arkadaşlar"),
      h("h2",null,"Sen ve "+nameOf(cmp.id)),
      h("div",{class:"cleg"},h("span",{class:"k me"},"Sen"),h("span",{class:"k th"},nameOf(cmp.id))),
      bar2("Adil puan",ms.fair,o.fair),bar2("Doğruluk",ms.acc,o.acc,"%"),bar2("İstikrar",ms.consist,o.consist,"%"),bar2("Gelişim (50 = değişmedi)",ms.gel,o.gel),
      h("div",{class:"ldet"},
        h("div",null,h("b",null,"Lv"+(ms.lv+1)),h("small",null,"sen · "+ms.lvName)),h("div",null,h("b",null,"Lv"+(o.lv+1)),h("small",null,nameOf(cmp.id)+" · "+o.lvName)),
        h("div",null,h("b",null,ms.tot+" / "+o.tot),h("small",null,"toplam puan")),
        h("div",null,h("b",null,ms.streak+" / "+o.streak),h("small",null,"gün seri")),
        h("div",null,h("b",null,ms.cfg.target+" / "+o.cfg.target),h("small",null,"haftalık hedef gün"))),
      h("div",{class:"small mute"},"Seviye, hedef ve başlangıç farkları adil puana zaten yansıdığı için bu karşılaştırma bir yarış değil, bir yol göstergesi. "+(o.isNew?nameOf(cmp.id)+" yeni başladı; ilk haftalarda çıkış yapması normal.":""))));
    return out;
  }
  out.push(h("div",{class:"panel"},h("div",{class:"label"},"Arkadaşlar · "+others.length),h("h2",null,"Kimler çalışıyor?"),
    h("div",{class:"small mute"},"Kartlara dokunup seninle karşılaştır. Alkış göndererek moral ver.")));
  others.map(function(x){return {x:x,s:lgStats(x)}}).sort(function(a,b){return (a.s.ago==null?99:a.s.ago)-(b.s.ago==null?99:b.s.ago)}).forEach(function(r){
    var x=r.x,s=r.s,ln=lnoteFor(x.id),cc=cheerOf(x.id);
    out.push(h("div",{class:"panel fcard"},
      h("div",{class:"fc-top"},h("div",{class:"fav"},(nameOf(x.id)||"?").slice(0,1).toUpperCase()),
        h("div",{class:"fc-id"},h("b",null,nameOf(x.id),s.isNew?h("span",{class:"pill nw"},"yeni"):null),h("small",null,"Lv"+(s.lv+1)+" "+s.lvName+" · "+agoText(s.ago))),
        h("div",{class:"lpts"},h("b",null,s.fair==null?"–":s.fair),h("small",null,"adil"))),
      h("div",{class:"act","aria-label":"son 14 gün"},s.act.map(function(v){return h("i",{class:v===2?"p":v===1?"o":""})})),
      h("div",{class:"small mute"},fairLine(s)+" · hedef "+s.cfg.target+" gün/hafta"+(s.cfg.mins?" · ~"+s.cfg.mins+" dk":"")),
      x.acad&&x.acad.rank?h("div",{class:"small"},"Akademi: "+x.acad.rank+" · "+x.acad.xp+" XP · CCNA "+x.acad.ccna+" bina"):null,
      ln&&ln.note?h("div",{class:"fb"},h("small",null,"Koç notu"),h("div",null,ln.note)):null,
      h("div",{class:"row"},h("button",{class:"btn",type:"button",onclick:function(){S.lg.cmp=x.id;draw();window.scrollTo(0,0)}},"Karşılaştır"),
        h("button",{class:"btn ghost",type:"button",disabled:!S.canWrite||cheered(x.id)||!S.me,onclick:function(){cheerTo(x.id)}},cheered(x.id)?"Alkışladın":"Alkışla"),
        cc?h("span",{class:"pill"},"👏 "+cc):null)));
  });
  return out;
}
function renderProfile(){
  var me=myLeague(),s=lgStats(me),cfg=s.cfg,ln=lnoteFor(S.me),out=[];
  function chips(label,items,cur,key,fmt){
    return h("div",{class:"cfgrow"},h("div",{class:"label"},label),h("div",{class:"chiprow"},items.map(function(v){
      return h("button",{class:"fchip"+(String(cur)===String(v[0])?" on":""),type:"button",disabled:!S.canWrite||!S.me,onclick:function(){var c=Object.assign({},cfgOf(me));c[key]=v[0];saveMe({cfg:c});draw()}},v[1])}))) }
  out.push(h("div",{class:"panel"},h("div",{class:"label"},"Profilim"),h("h2",null,"Lv"+(s.lv+1)+" "+s.lvName),
    h("div",{class:"small mute"},s.tot+" puan"+(s.next?" · sonraki seviyeye "+s.toNext+" puan":" · en üst seviye")+" · "+s.days+" gün oynadın"+(cfg.start!=="yeni"&&s.tot<LL[s.lv][1]?" · seviyen başlangıç seçimine göre yerleştirildi":"")),
    h("div",{class:"act","aria-label":"son 14 gün"},s.act.map(function(v){return h("i",{class:v===2?"p":v===1?"o":""})}))));
  out.push(h("div",{class:"panel"},h("div",{class:"label"},"Sana göre ayarla"),h("h2",null,"Adil olması için"),
    h("div",{class:"small mute"},"Zamanın ve başlangıç seviyen herkesten farklı. Bunları seç, puanlar buna göre hesaplanır."),
    chips("Haftalık hedefin (gün)",[[3,"3 gün"],[5,"5 gün"],[7,"7 gün"]],cfg.target,"target"),
    chips("Günlük süren (bilgi)",[[15,"15 dk"],[30,"30 dk"],[60,"60 dk"]],cfg.mins,"mins"),
    chips("Başlangıç seviyem",[["yeni","Yeni başladım"],["orta","Biraz biliyorum"],["ileri","İleri düzeyim"]],cfg.start,"start"),
    h("div",{class:"small mute"},"Başlangıç seviyesi soru zorluğunu belirler; seviyen puanla yükselir, geri düşmez.")));
  out.push(h("div",{class:"panel"},h("div",{class:"label"},"Bu haftanın karnesi"),
    h("div",{class:"dstats"},h("div",null,h("b",null,s.fair==null?"–":s.fair),h("small",null,"adil puan")),h("div",null,h("b",null,s.acc==null?"–":s.acc+"%"),h("small",null,"doğruluk")),h("div",null,h("b",null,s.played+"/"+s.expected),h("small",null,"gün/hedef")),h("div",null,h("b",null,s.gelD==null?"–":(s.gelD>0?"+":"")+s.gelD),h("small",null,"gelişim"))),
    h("div",{class:"fb"},h("small",null,"Koç notu"),h("div",null,autoNote(s))),
    ln&&ln.note?h("div",{class:"fb good"},h("small",null,"Müdür · "+ln.week),h("div",null,ln.note)):null,
    h("div",{class:"small mute"},"Otomatik not, puanlarından kural tabanlı üretilir; Müdür haftalık olarak kendi notunu da ekler.")));
  return out;
}
/* v35 ilan havuzu (herkes okur, görev yazar) */
S.pool=[];S.pq={city:"",remote:false};
function poolScore(x,R){
  var s=(String(x.title||"")+" "+String(x.skills||"")).toLowerCase(),hit=0,kw=R.kw||[];
  kw.forEach(function(k){if(s.indexOf(k)>=0)hit++});
  var own=(R.sk||[]).filter(function(k){return s.indexOf(String(k).toLowerCase())>=0});
  var role=x.role===R.id?40:0;
  var sc=Math.min(100,role+Math.min(3,hit)*12+Math.min(4,own.length)*6+(role?evBonus(R):0));
  var lv=String(x.level||"").toLowerCase();if(/senior|kıdemli|lead/.test(lv+" "+String(x.title||"").toLowerCase()))sc=0;
  return {sc:sc,own:own};
}
function poolAge(x){var d=String(x.date||"").slice(0,10);if(!/^\d{4}-\d\d-\d\d$/.test(d))return 99;return Math.max(0,Math.round((new Date(today())-new Date(d))/864e5))}
function renderJobsPool(){
  var R=jrRole(),all=S.pool.filter(function(x){return x&&x.title&&safeUrl(x.url)&&poolAge(x)<=21});
  var seg=h("div",{class:"seg",role:"group","aria-label":"Hedef rol"},JR.map(function(o){return h("button",{type:"button","aria-pressed":S.jr.role===o.id?"true":"false",onclick:function(){S.jr.role=o.id;draw()}},o.name)}));
  var cities=[];all.forEach(function(x){var c=String(x.city||"").trim();if(c&&cities.indexOf(c)<0)cities.push(c)});cities.sort();
  var L=all.map(function(x){var m=poolScore(x,R);return {x:x,m:m}}).filter(function(o){return o.m.sc>=30&&(!S.pq.city||String(o.x.city||"").trim()===S.pq.city)&&(!S.pq.remote||o.x.remote===true)});
  L.sort(function(a,b){return b.m.sc-a.m.sc||poolAge(a.x)-poolAge(b.x)});
  var out=[h("div",{class:"panel"},h("div",{class:"label"},"İlanlar"),h("h2",null,"Rolüne uyan güncel ilanlar"),seg,
    cities.length?h("div",{class:"lscroll",style:"margin-top:8px"},[""].concat(cities).map(function(c){return h("button",{type:"button",class:"opt","aria-pressed":S.pq.city===c?"true":"false",onclick:function(){S.pq.city=c;draw()}},c||"Türkiye geneli")}).concat([h("button",{type:"button",class:"opt","aria-pressed":S.pq.remote?"true":"false",onclick:function(){S.pq.remote=!S.pq.remote;draw()}},"Uzaktan")])):null,
    h("div",{class:"small mute",style:"margin-top:8px"},"İlanlar her gün otomatik toplanır ve herkes için aynıdır; uyum puanı seçtiğin role ve ilandaki becerilere göre bu cihazda hesaplanır. Başvurmadan önce ilanı kendin doğrula."))];
  if(!all.length)out.push(h("div",{class:"panel"},h("div",{class:"empty"},"İlan havuzu henüz boş. Günlük toplama görevi çalıştıkça burada ilanlar birikecek.")));
  else if(!L.length)out.push(h("div",{class:"panel"},h("div",{class:"empty"},"Bu filtreyle uyan ilan yok. Şehri ya da rolü değiştir.")));
  else out.push(h("div",{class:"panel"},L.slice(0,20).map(function(o){var x=o.x,u=safeUrl(x.url),age=poolAge(x);
    var miss=String(x.skills||"").split(/[,;]+/).map(function(z){return z.trim()}).filter(function(z){return z&&!o.m.own.some(function(k){return z.toLowerCase().indexOf(String(k).toLowerCase())>=0})}).slice(0,3);
    return h("div",{class:"lbox"},h("div",{style:"display:flex;justify-content:space-between;gap:8px;align-items:flex-start"},h("p",{style:"margin:0;font-weight:600"},String(x.title).slice(0,90)),h("span",{class:"pill"},"%"+o.m.sc)),
      h("p",{class:"small mute",style:"margin:2px 0 0"},[x.company,x.city,x.remote?"uzaktan":"",x.level,age===0?"bugün":age+" gün önce"].filter(Boolean).join(" · ").slice(0,140)),
      miss.length?h("p",{class:"small",style:"margin:4px 0 0"},"Bakılacak beceriler: "+miss.join(", ")):null,
      h("a",{href:u,target:"_blank",rel:"noopener noreferrer"},"İlana git"))})));
  return out;
}
/* v35 gazete: haberler ve etkinlikler (herkes okur, görev yazar) */
S.gz=[];S.gzq={tag:"",view:"haber",msg:""};
var GZ_TAGS=[["","Hepsi"],["qa","Test/QA"],["bk","Backend"],["sec","Siber"],["ai","Yapay zeka"],["cloud","Bulut"],["ag","Ağ/BT"],["kariyer","Kariyer"]];
function gzClean(d){
  if(!d||typeof d!=="object")return null;
  var items=Array.isArray(d.items)?d.items:[];
  var out=[];items.slice(0,60).forEach(function(x){
    if(!x||typeof x!=="object"||!x.title)return;
    var u=safeUrl(x.url);if(!u)return;
    out.push({kind:x.kind==="etkinlik"?"etkinlik":"haber",title:String(x.title).slice(0,160),source:String(x.source||"").slice(0,60),url:u,summary:String(x.summary||"").slice(0,420),why:String(x.why||"").slice(0,320),tag:String(x.tag||"").slice(0,12),when:/^\d{4}-\d\d-\d\d/.test(String(x.when||""))?String(x.when).slice(0,16):"",where:String(x.where||"").slice(0,80),talk:String(x.talk||"").slice(0,420),cost:String(x.cost||"").slice(0,40),lang:String(x.lang||"").slice(0,4)});
  });
  return {id:String(d.id||""),date:String(d.date||d.id||"").slice(0,10),headline:String(d.headline||"").slice(0,200),items:out};
}
function gzEvents(){
  var seen={},o=[];
  S.gz.slice().sort(function(a,b){return b.date.localeCompare(a.date)}).slice(0,14).forEach(function(e){e.items.forEach(function(x){if(x.kind!=="etkinlik"||seen[x.url])return;seen[x.url]=1;o.push(x)})});
  return o;
}
function gzDay(s){return String(s||"").slice(0,10)}
function gzAddCal(x){
  if(!S.mcp||!S.canWrite||S.guest||!x.when){return}
  var d=gzDay(x.when),hm=/T(\d\d:\d\d)/.exec(x.when),st=hm?hm[1]:"10:00",eh=String((+st.slice(0,2)+2)%24).padStart(2,"0");
  S.gzq.msg="Ekleniyor";draw();
  S.mcp.callTool("Google Calendar","create_event",{summary:x.title.slice(0,100),startTime:d+"T"+st+":00",endTime:(+eh<+st.slice(0,2)?(function(){var n=new Date(d+"T12:00:00");n.setDate(n.getDate()+1);return n.getFullYear()+"-"+String(n.getMonth()+1).padStart(2,"0")+"-"+String(n.getDate()).padStart(2,"0")})():d)+"T"+eh+st.slice(2)+":00",timeZone:"Europe/Istanbul",description:(x.summary||"")+" "+x.url,location:x.where||"",useDefaultReminders:false,overrideReminders:[{method:"popup",minutes:60}]})
   .then(function(){S.gzq.msg="Takvime eklendi.";draw()},function(e){var c=e&&e.code;S.gzq.msg=(c==="not_in_manifest"||c==="approval_required")?"Takvim izni verilmedi.":"Eklenemedi.";draw()});
}
function gzCard(x,ev){
  var up=ev&&x.when&&gzDay(x.when)>=today(),past=ev&&x.when&&gzDay(x.when)<today();
  return h("div",{class:"lbox"},
    h("div",{style:"display:flex;justify-content:space-between;gap:8px;align-items:flex-start"},h("p",{style:"margin:0;font-weight:600"},x.title),x.tag?h("span",{class:"pill"},(GZ_TAGS.filter(function(t){return t[0]===x.tag})[0]||[0,x.tag])[1]):null),
    ev?h("p",{class:"small",style:"margin:4px 0 0;font-weight:600"},[x.when?gzDay(x.when)+(/T/.test(x.when)?" "+x.when.slice(11,16):""):"tarih açıklanmadı",x.where,x.cost].filter(Boolean).join(" · ")):null,
    x.summary?h("p",{class:"small",style:"margin:4px 0 0"},x.summary):null,
    ev&&x.talk?h("p",{class:"small",style:"margin:4px 0 0"},h("b",null,past?"Neler anlatıldı: ":"Neler anlatılacak: "),x.talk):null,
    x.why?h("p",{class:"small",style:"margin:4px 0 0"},h("b",null,"Neden önemli: "),x.why):null,
    h("div",{class:"row",style:"margin-top:6px"},h("a",{href:x.url,target:"_blank",rel:"noopener noreferrer",onclick:function(){if(!num(prog().gz_n))setProg({gz_n:1})}},ev?"Etkinlik sayfası":"Haberi oku"+(x.source?" · "+x.source:"")),
      up&&S.mcp&&S.canWrite&&!S.guest?h("button",{class:"btn ghost",type:"button",onclick:function(){gzAddCal(x)}},"Takvime ekle"):null));
}
function renderGazete(){
  var Q=S.gzq,eds=S.gz.slice().sort(function(a,b){return b.date.localeCompare(a.date)}),cur=eds[0];
  var seg=h("div",{class:"seg",role:"group","aria-label":"Bölüm"},[["haber","Haberler"],["etkinlik","Etkinlikler"]].map(function(o){return h("button",{type:"button","aria-pressed":Q.view===o[0]?"true":"false",onclick:function(){Q.view=o[0];Q.msg="";draw()}},o[1])}));
  var tags=h("div",{class:"lscroll",style:"margin-top:8px"},GZ_TAGS.map(function(t){return h("button",{type:"button",class:"opt","aria-pressed":Q.tag===t[0]?"true":"false",onclick:function(){Q.tag=t[0];draw()}},t[1])}));
  var out=[h("div",{class:"panel"},h("div",{class:"label"},"Gazete"+(cur?" · "+cur.date:"")),h("h2",null,cur&&cur.headline?cur.headline:"Yazılım dünyasından günün özeti"),seg,tags,
    h("div",{class:"small mute",style:"margin-top:8px"},"Haberler ve etkinlikler her sabah otomatik derlenir; bağlantılar asıl kaynağa gider. Yazılar özet ve yorumdur, kararı vermeden önce kaynağı oku."),
    Q.msg?h("div",{class:"small"},Q.msg):null)];
  if(!cur){out.push(h("div",{class:"panel"},h("div",{class:"empty"},"İlk sayı henüz hazır değil. Günlük derleme görevi çalışınca burada çıkacak.")));return out}
  if(Q.view==="haber"){
    var L=cur.items.filter(function(x){return x.kind==="haber"&&(!Q.tag||x.tag===Q.tag)});
    out.push(L.length?h("div",{class:"panel"},L.map(function(x){return gzCard(x,false)})):h("div",{class:"panel"},h("div",{class:"empty"},"Bu başlıkta bugün haber yok.")));
  }else{
    var E=gzEvents().filter(function(x){return !Q.tag||x.tag===Q.tag}),up=E.filter(function(x){return !x.when||gzDay(x.when)>=today()}).sort(function(a,b){return String(a.when||"9").localeCompare(String(b.when||"9"))}),pa=E.filter(function(x){return x.when&&gzDay(x.when)<today()}).sort(function(a,b){return b.when.localeCompare(a.when)});
    out.push(h("div",{class:"panel"},h("h3",null,"Yaklaşanlar"),up.length?up.map(function(x){return gzCard(x,true)}):h("div",{class:"empty"},"Yaklaşan etkinlik bulunamadı.")));
    if(pa.length)out.push(h("div",{class:"panel"},h("h3",null,"Geçenler ve anlatılanlar"),pa.slice(0,8).map(function(x){return gzCard(x,true)})));
  }
  return out;
}
function renderLeague(){
  var L=S.lg,out=[];
  if(S.guest&&!L._g){L._g=1}
  out.push(seg([["bugun","Bugün"],["sira","Sıralama"],["arkadas","Arkadaşlar"],["ilan","İlanlar"],["gazete","Gazete"],["profil","Profilim"]],L.view,function(v){L.view=v;L.cmp=null}));
  if(S.guest&&L.view==="bugun"&&!(myLeague()))out.push(h("div",{class:"panel"},h("div",{class:"label"},"Misafir"),h("h2",null,"Proofpath Ligi'ne hoş geldin"),
    h("div",{class:"small mute"},"Önce Profilim'den başlangıç seviyeni ve haftalık hedefini seç, sonra günün 5 sorusunu çöz. Puanlar herkes için adil hesaplanır.")));
  if(L.view==="bugun")out=out.concat(renderChallenge());
  else if(L.view==="sira"){out=out.concat(renderBoard());var iv=renderInvite();if(iv)out.push(iv)}
  else if(L.view==="arkadas")out=out.concat(renderFriends());
  else if(L.view==="ilan")out=out.concat(renderJobsPool());
  else if(L.view==="gazete")out=out.concat(renderGazete());
  else out=out.concat(renderProfile());
  return out;
}
function renderInvite(){
  if(S.guest)return null;
  return h("div",{class:"panel"},h("div",{class:"label"},"Arkadaş ekle"),h("h2",null,"Birlikte çalışın"),
    h("div",{class:"small mute"},"1) Sayfanın Paylaş menüsünü aç. 2) Arkadaşını e-postasıyla ekle ve \"Contributor\" yetkisi ver. 3) Linki açınca sadece Lig'i görür; senin dersin, ticket ve notların ona kapalıdır. Tanımadığın birini ekleme."),
    h("div",{class:"small mute"},"Sadece Görüntüleyici olan sıralamayı görür ama puan yazamaz."));
}
function leagueTeaser(){
  if(S.guest||!S.me)return null;
  var s=lgStats(myLeague()),n=num(s.today.tot),TN=qsFor(today(),myTier()).length||num(s.today.n)||5,rows=S.league.map(function(x){return lgStats(x).fair}).filter(function(v){return v!=null}).sort(function(a,b){return b-a}),pos=s.fair!=null?rows.indexOf(s.fair)+1:0;
  return h("div",{class:"panel lgt"},h("div",{class:"lgt-l"},h("div",{class:"label"},"Lig"),h("b",null,n>=TN?"Bugünkü tur tamam · "+s.today.ok+"/"+TN:"Günün "+TN+" sorusu: "+n+"/"+TN),
      h("small",null,S.league.length>1&&pos?("Adil sıran: "+pos+". / "+rows.length):("Lv"+(s.lv+1)+" "+s.lvName+" · "+s.tot+" puan"))),
    h("button",{class:"btn"+(n>=TN?" ghost":""),type:"button",onclick:function(){S.lg.view=n>=TN?"sira":"bugun";goTab("lig")}},n>=TN?"Sıralama":"Çöz"));
}

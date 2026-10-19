/* CCNA 200-301 · sabit dersler 21-23 (CDP/LLDP/DTP ve trunk ayrıntısı, FHRP/HSRP, VPN ve uzaktan erişim) · ders eki: ccna-ek.js, anahtarlar 20-22 */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).ccna = (window.PP_LESSONS.ccna || {}));
  var CISCO = { title: "Cisco CCNA 200-301", url: "https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccna.html" };
  var JERE = { title: "Jeremy's IT Lab: Free CCNA 200-301 (YouTube kanalı)", url: "https://www.youtube.com/@JeremysITLab", type: "video", length: "Çok bölümlü", level: "başlangıç", lang: "EN" };
  function res(a, why) { var o = {}; for (var k in a) o[k] = a[k]; o.why = why; return o; }

  /* 21 ───────────────────────────────────────────── CDP, LLDP, DTP ve trunk ayrıntısı */
  L[21] = {
    hook: "Duvardaki kablonun öbür ucunda hangi cihaz ve hangi port olduğunu bulmak için kabloyu elle izlemene gerek yok; cihazlar birbirine kendini tanıtır.",
    homework: "İki switch'i tek bir bağlantıyla birleştiren bir çizim yap ve her uca 'access' ya da 'trunk' yaz. Hangi VLAN'ların bu bağlantıdan geçmesi gerektiğini listele. Native VLAN için neden 1 dışında bir değer seçmek isteyebileceğini bir cümleyle yaz.",
    warmup: {
      recap: [
        { point: "VLAN, bir anahtarı mantıksal olarak birden çok yayın alanına böler.", example: "VLAN 10 ve VLAN 20" },
        { point: "Trunk, birden çok VLAN'ın trafiğini tek bağlantıda taşır.", example: "Anahtardan anahtara bağlantı" }
      ],
      concepts: [
        { term: "CDP / LLDP", tr: "Katman 2 komşu keşif protokolleri", summary: "Doğrudan bağlı cihazlar adını, modelini ve bağlı portunu birbirine duyurur. CDP Cisco'ya özgü, LLDP standarttır.", example: "show cdp neighbors" },
        { term: "DTP", tr: "Dinamik trunk protokolü", summary: "Cisco'ya özgüdür; bir bağlantının access mi trunk mı olacağını iki uç arasında pazarlıkla belirler.", example: "dynamic desirable" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Yeni gelen mühendis, rafta etiketi olmayan bir switch'in hangi cihaza ve hangi porttan bağlı olduğunu bulmak zorunda. Başka bir gün iki switch arasında trunk kuruldu ama VLAN 30'daki kullanıcılar karşı tarafı göremiyor. Keşif protokolleri ve trunk ayrıntıları bu iki sorunu birkaç komutla çözer." },
      { t: "steps", h: "CDP ve LLDP", items: [
        "CDP (Cisco Discovery Protocol) Cisco'ya özgüdür ve katman 2'de çalışır. Doğrudan bağlı komşuya cihaz adını, platformunu, yerel ve uzak portu, yeteneğini duyurur. Çoğu Cisco cihazda varsayılan olarak açıktır.",
        "LLDP (IEEE 802.1AB) aynı işi yapan üretici bağımsız standarttır. Farklı üreticilerin cihazlarının bulunduğu ağda kullanılır. Cisco cihazda kullanmak için 'lldp run' ile etkinleştirilir.",
        "İkisi de yalnız doğrudan bağlı komşuyu gösterir; birkaç atlama ötedeki cihazı göstermez.",
        "Güvenlik: Keşif bilgisi saldırgana ağ haritası verir. Kullanıcıya ya da dış ağa bakan portlarda kapatılır (arayüzde 'no cdp enable', cihazın tamamında 'no cdp run')."
      ] },
      { t: "cmd", lang: "ios", calistirma: "atla Cisco IOS komutları; cihaz ya da Packet Tracer gerekir", text: "Switch# show cdp neighbors\nSwitch# show cdp neighbors detail\nSwitch(config)# lldp run\nSwitch# show lldp neighbors" },
      { t: "steps", h: "Trunk ve 802.1Q", items: [
        "Trunk, anahtarlar arasındaki tek bir bağlantıda birden çok VLAN'ın trafiğini taşır.",
        "802.1Q çerçeveye 4 baytlık bir etiket ekler; etiketin içindeki VLAN kimliği 12 bittir (1–4094 kullanılabilir).",
        "Native VLAN, trunk üzerinde etiketsiz giden VLAN'dır. Varsayılanı VLAN 1'dir ama değiştirilebilir ve iki uçta aynı olmalıdır.",
        "İzinli VLAN listesi (allowed VLAN) trunktan hangi VLAN'ların geçeceğini sınırlar."
      ] },
      { t: "cmd", lang: "ios", calistirma: "atla Cisco IOS komutları; cihaz ya da Packet Tracer gerekir", text: "Switch(config)# interface gigabitethernet0/1\nSwitch(config-if)# switchport mode trunk\nSwitch(config-if)# switchport trunk native vlan 99\nSwitch(config-if)# switchport trunk allowed vlan 10,20,99\nSwitch(config-if)# switchport nonegotiate\n\nSwitch# show interfaces trunk\n\n# Hem eski ISL hem 802.1Q destekleyen modellerde önce 'switchport trunk encapsulation dot1q' gerekir.\n# Yeni anahtarlar yalnız 802.1Q kullanır." },
      { t: "steps", h: "DTP modları", items: [
        "access: port kalıcı olarak access olur; karşı taraf ne isterse istesin trunk olmaz.",
        "trunk: port kalıcı olarak trunk olur ve karşı tarafı da trunk'a çevirmeye çalışır.",
        "dynamic desirable: trunk olmayı aktif olarak ister. Karşı taraf trunk, desirable ya da auto ise trunk kurulur.",
        "dynamic auto: trunk olmayı kendisi başlatmaz, yalnız karşı taraf isterse olur. İki uç da auto ise trunk kurulmaz, bağlantı access kalır."
      ] },
      { t: "steps", h: "Hangi birleşim trunk kurar?", items: [
        "trunk ile trunk, desirable ya da auto: trunk.",
        "desirable ile desirable ya da auto: trunk.",
        "auto ile auto: trunk yok, access kalır.",
        "access ile trunk: uyumsuzluk; bağlantı ayakta görünse bile VLAN trafiği doğru taşınmaz.",
        "Güvenli uygulama: kullanıcı portlarında 'switchport mode access', anahtarlar arası bağlantıda 'switchport mode trunk' artı 'switchport nonegotiate' kullanmak ve kullanılmayan portları kapatmaktır."
      ] },
      { t: "steps", h: "Trunk sorun giderme", items: [
        "'show interfaces trunk': hangi portlar trunk, native VLAN, izinli ve etkin VLAN listesi.",
        "Native VLAN uyuşmazlığı: iki uçta farklı native VLAN. Cihaz günlükte uyarı verir ve etiketsiz trafik yanlış VLAN'a düşer.",
        "İzinli listede olmayan VLAN: port trunk görünür ama o VLAN'ın trafiği geçmez. VLAN bir uçta tanımlı değilse de geçmez.",
        "Bir uç trunk, diğer uç access ise bağlantı ayakta görünür ama VLAN trafiği düzgün taşınmaz."
      ] },
      { t: "warn", h: "Tuzak", text: "'Native VLAN her zaman VLAN 1'dir' ve 'DTP standarttır' yanlışlarına düşme: native VLAN değiştirilebilir, DTP ise Cisco'ya özgüdür; standart olan LLDP'dir. Native VLAN'ı kullanıcı trafiği taşıyan bir VLAN'la aynı bırakmak da risklidir; kullanılmayan bir VLAN seçmek yaygın iyi uygulamadır." }
    ],
    objectives: [
      { id: "h1", text: "CDP ile LLDP'yi (Cisco'ya özgü ve standart) ayırt edip komşu bilgisini ilgili komutla okuyabilirsin." },
      { id: "h2", text: "DTP modlarının (access, trunk, dynamic auto, dynamic desirable) hangi birleşimlerde trunk kurduğunu yorumlayabilirsin." },
      { id: "h3", text: "802.1Q etiketini, native VLAN'ı ve izinli VLAN listesini açıklayabilirsin." },
      { id: "h4", text: "Bir trunk sorununu belirtisine göre teşhis edip kullanıcı portlarında istenmeyen trunk'ı önleyebilirsin." }
    ],
    summary: [
      "CDP Cisco'ya özgü, LLDP IEEE standardı olan katman 2 komşu keşif protokolüdür; ikisi de yalnız doğrudan bağlı komşuyu gösterir.",
      "Keşif protokolleri kullanıcıya ya da dış ağa bakan portlarda kapatılmalıdır, çünkü ağ haritasını açığa çıkarır.",
      "DTP Cisco'ya özgüdür: desirable aktif ister, auto yalnızca karşıdan gelen isteğe uyar; auto ile auto trunk kurmaz.",
      "802.1Q etiketinde 12 bitlik VLAN kimliği taşınır; native VLAN etiketsiz gider ve iki uçta aynı olmalıdır.",
      "Kullanıcı portlarında 'switchport mode access', anahtarlar arasında statik trunk ve 'switchport nonegotiate' kullanılır; sorun giderirken 'show interfaces trunk' bakılır."
    ],
    quiz: [
      { id: "41ca0898", q: "Farklı üreticilerin cihazlarının bulunduğu ağda doğrudan bağlı komşu bilgisini paylaşmak için hangi protokol kullanılır?", options: ["CDP (Cisco'ya özgü)","DTP (trunk pazarlığı)","STP (döngü önleme)","LLDP (IEEE standardı)"], obj: "h1" },
      { id: "43727027", q: "Doğrudan bağlı Cisco komşunun cihaz adını, platformunu ve bağlandığı portu görmek için hangi komut kullanılır?", options: ["show cdp neighbors","show interfaces trunk","show vlan brief","show mac address-table"], obj: "h1" },
      { id: "1afce7cf", q: "İki anahtarın karşılıklı portları 'dynamic auto' olarak ayarlandı. Sonuç ne olur?", options: ["İki uç da trunk olur","Bağlantı hata verip kapanır","Trunk kurulmaz, access kalır","Yalnızca VLAN 1 trunk olur"], obj: "h2" },
      { id: "c5e928e3", q: "Bir uçta 'dynamic desirable', diğer uçta 'dynamic auto' ayarlıdır. Sonuç ne olur?", options: ["Trunk kurulmaz","Trunk kurulur","Port kapanır (err-disabled)","Yalnızca native VLAN geçer"], obj: "h2" },
      { id: "11bf9ab2", q: "802.1Q etiketinde VLAN kimliği kaç bit ile gösterilir?", options: ["12 bit","8 bit","10 bit","16 bit"], obj: "h3" },
      { id: "53533984", q: "Trunk üzerinde etiketsiz olarak taşınan trafik hangi VLAN'a aittir?", options: ["Her zaman VLAN 1'e","İzinli listedeki en küçük VLAN'a","Yönetim VLAN'ına","Native VLAN'a"], obj: "h3" },
      { id: "2d048335", q: "Trunk bağlantısı ayakta ve diğer VLAN'lar çalışıyor, ama VLAN 30'daki kullanıcılar karşı anahtardaki VLAN 30'a ulaşamıyor. İlk nereye bakarsın?", options: ["CDP komşu tablosu ve cihaz adları","İzinli VLAN listesi ve VLAN tanımı","Native VLAN numarasının 1 olması","Port hızı ve dupleks ayarı"], obj: "h4" },
      { id: "10f07db1", q: "Kullanıcı bilgisayarlarının bağlandığı bir portta istemeden trunk oluşmasını önlemek için en doğru yapılandırma hangisidir?", options: ["switchport mode dynamic desirable","switchport mode dynamic auto","switchport mode access","switchport trunk allowed vlan all"], obj: "h4" }
    ],
    interview: [
      { q: "CDP ile LLDP arasındaki fark nedir?", a: "CDP Cisco'ya özgü, LLDP ise IEEE 802.1AB standardıdır. İkisi de doğrudan bağlı komşuya adını, modelini ve portunu duyurur. Farklı üreticilerin bulunduğu ağda LLDP tercih edilir." },
      { q: "Neden kullanıcı portlarında DTP'yi kapatırsın?", a: "DTP açıkken bir saldırgan trunk pazarlığı başlatıp portu trunk yaptırabilir ve birçok VLAN'ın trafiğine erişebilir. Bu yüzden kullanıcı portları 'switchport mode access' yapılır, anahtarlar arası bağlantılarda statik trunk ve 'switchport nonegotiate' kullanılır." },
      { q: "Trunk kurulduğu halde bir VLAN karşıya geçmiyorsa nereye bakarsın?", a: "'show interfaces trunk' çıktısında o VLAN'ın izinli listede olup olmadığına, iki uçta da tanımlı olup olmadığına ve native VLAN'ın iki uçta aynı olup olmadığına bakarım." }
    ],
    vocab: [
      { term: "Neighbor", tr: "komşu", ex: "The switch lists its neighbors." },
      { term: "Trunk", tr: "trunk (çok VLAN'lı bağlantı)", ex: "The trunk carries many VLANs." },
      { term: "Native VLAN", tr: "etiketsiz VLAN", ex: "Both ends use the same native VLAN." },
      { term: "Allowed VLANs", tr: "izinli VLAN listesi", ex: "The allowed VLANs list is short." },
      { term: "Negotiation", tr: "pazarlık", ex: "DTP handles trunk negotiation." },
      { term: "Tag", tr: "etiket", ex: "802.1Q adds a tag to the frame." }
    ],
    resources: [
      res(JERE, "CDP, LLDP, DTP ve trunk konularını anlatır")
    ],
    sources: [
      CISCO
    ]
  };

  /* 22 ───────────────────────────────────────────── FHRP/HSRP (ilk atlama yedekliliği) */
  L[22] = {
    hook: "Evin tek kapısının anahtarı kaybolursa dışarı çıkamazsın. İkinci kapı olsa bile bilgisayarlar hangi kapıyı kullanacaklarını bilmiyorsa işe yaramaz.",
    homework: "Bir ağ çiz: tek VLAN, iki yönlendirici ve internet. Bilgisayarların ağ geçidi olarak yalnızca tek bir IP yazması gerekiyor. Yönlendiricilerden biri bozulunca ayarı değiştirmeden bağlantının sürmesi için bu IP kime ait olmalı? Bir cümleyle yaz.",
    warmup: {
      recap: [
        { point: "Bilgisayar kendi alt ağı dışına çıkarken trafiği varsayılan ağ geçidine gönderir.", example: "192.168.10.1" },
        { point: "Yedeklilik, tek bir arızanın ağı durdurmasını önler.", example: "İki yönlendirici" }
      ],
      concepts: [
        { term: "FHRP", tr: "İlk atlama yedekliliği protokolü", summary: "Birden çok yönlendirici tek bir sanal ağ geçidi gibi görünür.", example: "Sanal IP 192.168.10.1" },
        { term: "HSRP", tr: "Hot Standby Router Protocol", summary: "Cisco'ya özgü FHRP: bir yönlendirici aktif, biri bekleyen olur.", example: "Aktif R1, bekleyen R2" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Ofiste iki yönlendirici var ama bilgisayarların hepsi yalnızca R1'i ağ geçidi olarak biliyor. R1 bozulduğunda R2 sağlam olduğu halde kimse internete çıkamıyor. Ya 200 bilgisayarın ayarını elle değiştirirsin ya da en baştan FHRP kurarsın." },
      { t: "steps", h: "Sorun: tek varsayılan ağ geçidi", items: [
        "İstemcide varsayılan ağ geçidi tek bir IP olarak yazılıdır (çoğu zaman DHCP ile verilir).",
        "O yönlendirici arızalanırsa arkasında yedek olsa bile istemci başka bir yönlendiriciye kendiliğinden geçmez.",
        "FHRP (First Hop Redundancy Protocol) çözümü: iki ya da daha fazla yönlendirici ortak bir sanal IP ve sanal MAC adresi paylaşır. İstemci ağ geçidi olarak sanal IP'yi kullanır; arkadaki gerçek yönlendirici değişse bile istemcinin ayarı değişmez."
      ] },
      { t: "steps", h: "HSRP nasıl çalışır?", items: [
        "Aynı HSRP grubundaki yönlendiricilerden biri aktif (active), biri bekleyen (standby) olur; diğerleri dinleyici durumundadır.",
        "Aktif yönlendirici sanal IP'ye gelen trafiği iletir ve sanal MAC adresiyle ARP isteklerine yanıt verir.",
        "Yönlendiriciler hello mesajlarıyla birbirini izler. Aktif yönlendiriciden belirli süre hello gelmezse bekleyen yönlendirici aktif olur.",
        "Aktif olan, önceliği (priority) en yüksek yönlendiricidir. Öncelik varsayılan olarak 100'dür. Öncelikler eşitse arayüz IP adresi en yüksek olan kazanır.",
        "Preempt: daha yüksek öncelikli bir yönlendirici ağa dönünce aktif rolü geri alabilir. Preempt varsayılan olarak kapalıdır; kapalıysa aktif olan yönlendirici, düşük öncelikli olsa bile rolü bırakmaz."
      ] },
      { t: "cmd", lang: "ios", calistirma: "atla Cisco IOS komutları; cihaz ya da Packet Tracer gerekir", text: "R1(config)# interface gigabitethernet0/0\nR1(config-if)# ip address 192.168.10.2 255.255.255.0\nR1(config-if)# standby 1 ip 192.168.10.1\nR1(config-if)# standby 1 priority 110\nR1(config-if)# standby 1 preempt\n\nR2(config)# interface gigabitethernet0/0\nR2(config-if)# ip address 192.168.10.3 255.255.255.0\nR2(config-if)# standby 1 ip 192.168.10.1\n\nR1# show standby brief" },
      { t: "box", h: "Çıktıyı okumak", text: "R1'in önceliği 110, R2'nin varsayılan 100 olduğundan R1 aktif olur. İstemciler 192.168.10.1'i ağ geçidi olarak bilir. R1 arızalanırsa R2 aynı sanal IP ile devralır ve istemcilerin ayarını değiştirmesi gerekmez. R1 geri gelince 'preempt' açık olduğu için rolünü geri alır." },
      { t: "steps", h: "Diğer FHRP'ler", items: [
        "HSRP: Cisco'ya özgü; aktif ve bekleyen yönlendirici.",
        "VRRP: açık standart; farklı üreticilerin cihazları birlikte çalışabilir. Roller ana (master) ve yedek (backup).",
        "GLBP: Cisco'ya özgü; aynı sanal IP üzerinde birden çok yönlendirici istemci trafiğini aynı anda taşıyarak yük paylaşımı yapabilir.",
        "HSRP ve VRRP'de bir grupta yalnız bir yönlendirici trafiği taşır. Yükü paylaştırmak için VLAN başına farklı grup ve farklı aktif yönlendirici yapılandırılır."
      ] },
      { t: "warn", h: "Tuzak", text: "Sanal IP, yönlendiricilerin gerçek arayüz adreslerinden farklı bir adrestir ve istemciye ağ geçidi olarak yalnızca sanal IP verilir. 'HSRP yük dengeler' yanılgısına da düşme: tek grupta yalnız aktif yönlendirici iletir. Preempt kapalıysa yüksek öncelikli yönlendirici dönse bile rolü geri almaz." }
    ],
    objectives: [
      { id: "h1", text: "Tek varsayılan ağ geçidi sorununu ve FHRP'nin sanal IP ve sanal MAC ile bunu nasıl çözdüğünü açıklayabilirsin." },
      { id: "h2", text: "HSRP'de aktif ve bekleyen rolünü, önceliği ve preempt'i bir senaryoda yorumlayabilirsin." },
      { id: "h3", text: "HSRP için 'standby' komutlarını ve 'show standby brief' çıktısının ne anlattığını okuyabilirsin." },
      { id: "h4", text: "HSRP, VRRP ve GLBP'yi standart olup olmamasına ve yük paylaşımına göre ayırt edebilirsin." }
    ],
    summary: [
      "İstemcide tek bir varsayılan ağ geçidi yazılıdır; o yönlendirici bozulunca yedek olsa bile istemci kendiliğinden geçmez.",
      "FHRP, birden çok yönlendiricinin ortak bir sanal IP ve sanal MAC adresini paylaşmasını sağlar; istemci ağ geçidi olarak sanal IP'yi kullanır.",
      "HSRP'de en yüksek öncelikli yönlendirici aktif olur; öncelik eşitse en yüksek IP kazanır, varsayılan öncelik 100'dür.",
      "Preempt varsayılan olarak kapalıdır; açık değilse yüksek öncelikli yönlendirici döndüğünde aktif rolü geri almaz.",
      "HSRP ve GLBP Cisco'ya özgü, VRRP açık standarttır; GLBP yük paylaşımı yapabilir, HSRP ve VRRP'de grupta tek yönlendirici iletir."
    ],
    quiz: [
      { id: "a7f01e53", q: "İki yönlendiricili bir ağda istemciler yalnızca R1'i varsayılan ağ geçidi olarak biliyor. R1 arızalanınca ne olur?", options: ["İstemciler kendiliğinden R2'yi ağ geçidi yapar","R2 otomatik olarak R1'in IP adresini kopyalar","R2 sağlam olsa da istemciler ağ dışına çıkamaz","R2, DHCP ile istemcilere yeni ağ geçidi adresi dağıtır"], obj: "h1" },
      { id: "43095cbd", q: "FHRP kurulu bir ağda istemcilere varsayılan ağ geçidi olarak hangi adres verilir?", options: ["Gruba ait sanal IP adresi","Aktif yönlendiricinin arayüz IP adresi","Bekleyen yönlendiricinin arayüz IP adresi","Yönlendiriciler arası bağlantının IP adresi"], obj: "h1" },
      { id: "1c96b9bb", q: "R1 önceliği 120, R2 önceliği 100 olan iki yönlendirici HSRP grubuna aynı anda katılıyor. Hangisi aktif olur?", options: ["R2, çünkü düşük öncelik değeri kazanır","İkisi de aynı anda aktif olur","Rastgele biri seçilir","R1, çünkü önceliği daha yüksektir"], obj: "h2" },
      { id: "1027f1e8", q: "İki yönlendiricinin HSRP önceliği eşit. R1'in arayüz IP adresi 192.168.10.2, R2'ninki 192.168.10.3. Hangisi aktif olur?", options: ["R1, çünkü adresi daha küçüktür","R2, çünkü adresi daha büyüktür","R1, çünkü önce yapılandırılmıştır","Hiçbiri; grup kurulmaz"], obj: "h2" },
      { id: "59b7f818", q: "R1 (öncelik 110, preempt yapılandırılmamış) arızalandı ve R2 (öncelik 100) aktif oldu. R1 geri geldi. HSRP'de ne olur?", options: ["R2 aktif kalır, preempt olmadığı için","R1 hemen aktif olur, önceliği yüksek olduğu için","İki yönlendirici de bekleyen duruma geçer","Grup silinir ve baştan kurulur"], obj: "h2" },
      { id: "d164a1e4", q: "Hangi komut HSRP grup 1 için sanal IP adresini tanımlar?", options: ["ip default-gateway 192.168.10.1","standby 1 ip 192.168.10.1","ip helper-address 192.168.10.1","ip route 0.0.0.0 0.0.0.0 192.168.10.1"], obj: "h3" },
      { id: "826cac20", q: "Bir arayüzün HSRP rolünü (Active/Standby), önceliğini ve sanal IP adresini özetleyen komut hangisidir?", options: ["show ip interface brief","show ip protocols","show vrrp brief","show standby brief"], obj: "h3" },
      { id: "0f671a88", q: "Farklı üreticilerin yönlendiricilerinin aynı sanal ağ geçidini paylaşması gerekiyor. Hangi FHRP açık standarttır?", options: ["HSRP","GLBP","VRRP","LACP"], obj: "h4" }
    ],
    interview: [
      { q: "FHRP neden gerekir?", a: "İstemcilerde varsayılan ağ geçidi tek bir IP olarak yazılıdır. O yönlendirici arızalanırsa istemci kendiliğinden başka bir yönlendiriciye geçmez. FHRP ile yönlendiriciler ortak bir sanal IP paylaşır; istemci hep aynı sanal IP'yi kullanır ve devralma ona görünmez." },
      { q: "HSRP'de aktif yönlendirici nasıl seçilir?", a: "En yüksek önceliğe sahip yönlendirici aktif olur. Öncelikler eşitse arayüz IP adresi en yüksek olan kazanır. Diğeri bekleyen (standby) olur ve aktiften hello gelmezse devralır." },
      { q: "HSRP, VRRP ve GLBP nasıl ayrılır?", a: "HSRP ve GLBP Cisco'ya özgüdür, VRRP açık standarttır. HSRP ve VRRP'de grupta tek yönlendirici trafiği taşır. GLBP birden çok yönlendiricinin aynı sanal IP üzerinde aynı anda trafik taşıyarak yük paylaşmasını sağlayabilir." }
    ],
    vocab: [
      { term: "Default gateway", tr: "varsayılan ağ geçidi", ex: "The default gateway is a virtual address." },
      { term: "Failover", tr: "yedeğe geçiş", ex: "Failover took only a few seconds." },
      { term: "Priority", tr: "öncelik", ex: "The router with the highest priority wins." },
      { term: "Preempt", tr: "rolü geri alma", ex: "With preempt, the primary router takes over again." },
      { term: "Virtual IP", tr: "sanal IP", ex: "Clients use the virtual IP as the gateway." },
      { term: "Standby", tr: "bekleyen", ex: "The standby router takes over after a failure." }
    ],
    resources: [
      res(JERE, "FHRP ve HSRP (ilk atlama yedekliliği) konusunu anlatır")
    ],
    sources: [
      CISCO
    ]
  };

  /* 23 ───────────────────────────────────────────── VPN ve uzaktan erişim */
  L[23] = {
    hook: "Kafedeki halka açık Wi-Fi üzerinden şirket sunucusuna bağlanmak, mektubu herkesin gördüğü bir posta kutusundan göndermek gibidir; şifreli zarf (VPN) şarttır.",
    homework: "Bir VPN istemcisini hiç kullandın mı? Kullandıysan tüm trafiğin mi, yoksa yalnızca belirli adreslerin mi tünelden geçtiğini düşün. Kullanmadıysan bir çalışanın evden iş ağına bağlanma senaryosunu üç adımda yaz.",
    warmup: {
      recap: [
        { point: "Genel internet, yolundaki herkesin gördüğü bir ortamdır.", example: "Kafe Wi-Fi ağı" },
        { point: "Şifreleme veriyi okunamaz yapar, kimlik doğrulama karşıdakinin kim olduğunu doğrular.", example: "HTTPS bağlantısı" }
      ],
      concepts: [
        { term: "VPN", tr: "Sanal özel ağ", summary: "Genel bir ağ üzerinde şifreli, yalıtılmış bir bağlantı (tünel) kurar.", example: "Evden şirket ağına bağlanmak" },
        { term: "IPsec", tr: "IP güvenlik protokolleri ailesi", summary: "IP paketlerini şifreleyen ve doğrulayan protokol çerçevesi.", example: "Şubeler arası şifreli tünel" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Şirketin iki şubesi ve evden çalışan 40 kişisi var. Kiralık hat çok pahalı; hepsi internet üzerinden iş ağına bağlanacak. Hangi tür VPN, hangi protokol ve neyin şifreleneceği sorularını yanıtlaman gerekiyor." },
      { t: "steps", h: "İki temel VPN türü", items: [
        "Site-to-site VPN: iki ağ, uçlardaki ağ geçidi cihazlarıyla (yönlendirici ya da güvenlik duvarı) birbirine bağlanır. Kullanıcılar VPN'den habersizdir; şube ağındaki bir bilgisayar merkeze sanki yerel ağdaymış gibi ulaşır. Genellikle sürekli açıktır.",
        "Uzaktan erişim (remote access) VPN: tek bir kullanıcının cihazı (dizüstü, telefon) şirket ağ geçidine bağlanır. Genellikle kullanıcı VPN istemcisini başlatır ve ihtiyaç olunca bağlanır."
      ] },
      { t: "steps", h: "Tünel, şifreleme ve GRE", items: [
        "Tünel (tunneling): bir paketi başka bir paketin içine koyup (kapsülleme) iki uç arasında taşımaktır.",
        "GRE (Generic Routing Encapsulation) birçok protokolü, çoklu yayını ve yönlendirme protokollerini bile kapsülleyebilir. Ancak GRE kendi başına şifreleme ve kimlik doğrulama sağlamaz; yoldaki biri içeriği okuyabilir.",
        "Bu yüzden GRE sık sık IPsec ile birlikte kullanılır: GRE esnek taşımayı, IPsec güvenliği sağlar (GRE over IPsec)."
      ] },
      { t: "steps", h: "IPsec bileşenleri (kavramsal)", items: [
        "IPsec tek bir protokol değil, bir çerçevedir: gizlilik (şifreleme), bütünlük, kaynak kimlik doğrulaması ve tekrar saldırısı koruması sağlar.",
        "ESP (Encapsulating Security Payload): veriyi şifreler ve bütünlüğünü korur; IPsec'te yaygın kullanılandır. AH (Authentication Header): bütünlük ve kimlik doğrulama sağlar ama şifrelemez.",
        "IKE (Internet Key Exchange): uçların birbirini doğrulayıp anahtarları pazarlık ettiği protokoldür. 1. aşama uçlar arasında güvenli bir yönetim kanalı kurar; 2. aşama asıl veriyi koruyan IPsec bağlantısını kurar.",
        "Tünel modu: özgün IP paketinin tamamı korunur ve yeni bir IP başlığıyla sarılır; site-to-site VPN'de ağ geçitleri arasında yaygındır. Taşıma modu: yalnızca veri kısmı korunur, özgün IP başlığı kalır; uçtan uca iki ana makine arasında kullanılır."
      ] },
      { t: "steps", h: "Uzaktan erişim yöntemleri", items: [
        "İstemci tabanlı (IPsec ya da SSL/TLS tabanlı): cihaza VPN yazılımı kurulur; tüm ağa ya da belirli kaynaklara erişim sağlar.",
        "İstemcisiz (clientless) SSL VPN: kullanıcı tarayıcıdan bir portala bağlanır ve yalnızca portalda yayınlanan uygulamalara erişir; yazılım kurulumu gerekmez. Yönetilmeyen bir bilgisayardan sınırlı erişim için uygundur.",
        "Tam tünel (full tunnel): tüm trafik VPN'e gider; kurumsal güvenlik denetiminden geçer ama internet çıkışı da şirket hattından olur.",
        "Bölünmüş tünel (split tunneling): yalnız kurumsal ağa giden trafik VPN'e gider, geri kalanı doğrudan internete çıkar. Şirket hattı yük almaz ama cihaz aynı anda hem kurumsal ağa hem açık internete bağlı olur."
      ] },
      { t: "box", h: "Hangisini seç?", text: "Şubeyi merkeze sürekli bağlayacaksan site-to-site, gezen ya da evden çalışan kişi için uzaktan erişim VPN. Yönlendirme protokolü ya da çoklu yayın taşıman gerekiyorsa GRE kullanılabilir ama şifreleme için IPsec eklenir." },
      { t: "warn", h: "Tuzak", text: "'VPN her şeyi güvenli yapar' yanılgısına düşme: VPN yolu şifreler ama uç cihazdaki zararlı yazılımı temizlemez. GRE tüneli şifreli değildir. Bölünmüş tünelde cihaz aynı anda şirket ağına ve açık internete bağlıdır; bu bir risk olabilir." }
    ],
    objectives: [
      { id: "h1", text: "Site-to-site VPN ile uzaktan erişim VPN'ini bir senaryoda ayırt edebilirsin." },
      { id: "h2", text: "GRE'nin yalnızca kapsülleme yaptığını, IPsec içinde ESP ve AH'nin ne sağladığını açıklayabilirsin." },
      { id: "h3", text: "IKE aşamalarının ve IPsec tünel ile taşıma modunun amacını kavramsal olarak eşleştirebilirsin." },
      { id: "h4", text: "İstemcisiz SSL VPN, tam tünel ve bölünmüş tünel arasında senaryoya uygun olanı seçebilirsin." }
    ],
    summary: [
      "Site-to-site VPN iki ağı uçlardaki ağ geçitleriyle bağlar ve kullanıcıya görünmez; uzaktan erişim VPN tek kullanıcının cihazını şirket ağ geçidine bağlar.",
      "GRE birçok protokolü ve yönlendirme trafiğini kapsülleyebilir ama şifrelemez; güvenlik için IPsec ile birlikte kullanılır.",
      "IPsec bir çerçevedir: ESP şifreleme ve bütünlük sağlar, AH yalnız bütünlük ve kimlik doğrulama sağlar, IKE kimlik doğrulama ve anahtar pazarlığı yapar.",
      "IKE 1. aşamada güvenli bir yönetim kanalı, 2. aşamada veriyi koruyan IPsec bağlantısını kurar; tünel modunda özgün paketin tamamı sarılır.",
      "İstemcisiz SSL VPN tarayıcıdan sınırlı erişim verir; tam tünelde tüm trafik VPN'e gider, bölünmüş tünelde yalnız kurumsal trafik gider."
    ],
    quiz: [
      { id: "33cf5a19", q: "Bir şubedeki tüm bilgisayarların, kullanıcılar bir şey yapmadan merkez ağına şifreli ulaşmasını sağlayan ve uçlarında ağ geçidi cihazları bulunan VPN türü hangisidir?", options: ["Uzaktan erişim VPN","Site-to-site VPN","İstemcisiz SSL VPN","Bölünmüş tünelleme"], obj: "h1" },
      { id: "b1772868", q: "Sık seyahat eden bir satış temsilcisi dizüstü bilgisayarıyla otel ağından şirket ağına bağlanacak. En uygun çözüm hangisidir?", options: ["Şube yönlendiricisinde site-to-site VPN","Kiralık hat siparişi","GRE tüneli (şifresiz)","Uzaktan erişim VPN istemcisi"], obj: "h1" },
      { id: "950f9b8f", q: "Çoklu yayın ve yönlendirme protokolü trafiğini kapsülleyebilen, ancak kendi başına şifreleme yapmayan tünel protokolü hangisidir?", options: ["GRE","ESP","IKE","AH"], obj: "h2" },
      { id: "292dcfdd", q: "IPsec içinde veri gizliliğini (şifreleme) ve bütünlüğü birlikte sağlayan protokol hangisidir?", options: ["AH","GRE","ESP","IKE"], obj: "h2" },
      { id: "db5d3d99", q: "IKE'nin 1. aşamasının amacı nedir?", options: ["Kullanıcı verisini doğrudan şifreleyip iletmek","Uçları doğrulayıp güvenli bir yönetim kanalı kurmak","Tünel paketlerine yeni IP başlığı eklemek","Yönlendirme tablosunu uzak uca kopyalamak"], obj: "h3" },
      { id: "c826ff10", q: "IPsec tünel modu ile taşıma modu arasındaki fark hangisidir?", options: ["Tünel modunda yalnızca veri kısmı korunur","Taşıma modu özgün paketin tamamını sarar","İkisi arasında fark yoktur, adlar eşanlamlıdır","Tünel modunda özgün paketin tamamı sarılır"], obj: "h3" },
      { id: "4c5d68fa", q: "Kafedeki yönetilmeyen bir bilgisayardan yalnızca şirketin web tabanlı bordro uygulamasına erişilecek ve bilgisayara yazılım kurulmayacak. Hangi yaklaşım uygundur?", options: ["İstemcisiz (tarayıcı tabanlı) SSL VPN","Site-to-site IPsec VPN (ağ geçitleri arası)","Tam tünel VPN istemcisi (yazılımlı)","GRE over IPsec tüneli (uçlar arası)"], obj: "h4" },
      { id: "ddb0a089", q: "Bölünmüş tünelleme (split tunneling) açıkken kullanıcı cihazının trafiği nasıl yönlendirilir?", options: ["Tüm trafik şirket ağ geçidine gider","Tüm trafik doğrudan internete çıkar","Kurumsal trafik tünelden, kalanı doğrudan çıkar","Yalnızca DNS sorguları tünelden gider"], obj: "h4" }
    ],
    interview: [
      { q: "Site-to-site VPN ile uzaktan erişim VPN arasındaki fark nedir?", a: "Site-to-site VPN iki ağı ağ geçidi cihazlarıyla sürekli bağlar ve kullanıcılar farkında olmadan kullanır. Uzaktan erişim VPN tek bir kullanıcının cihazını istemci yazılımı ya da tarayıcıyla şirket ağ geçidine bağlar." },
      { q: "GRE ile IPsec farkı nedir? Neden birlikte kullanılırlar?", a: "GRE esnek bir kapsülleme protokolüdür, yönlendirme protokollerini ve çoklu yayını taşıyabilir ama şifrelemez. IPsec gizlilik, bütünlük ve kimlik doğrulama sağlar. GRE over IPsec ikisinin avantajını birleştirir." },
      { q: "Bölünmüş tünelleme neden tartışmalıdır?", a: "Şirket hattının yükünü azaltır ama cihaz aynı anda hem kurumsal ağa hem açık internete bağlı kalır. Cihaz zararlı yazılım bulaştırırsa kurumsal ağa bir köprü olabilir. Bu yüzden risk politikasına göre karar verilir." }
    ],
    vocab: [
      { term: "Tunnel", tr: "tünel", ex: "The tunnel connects the two sites." },
      { term: "Encapsulation", tr: "kapsülleme", ex: "GRE uses encapsulation." },
      { term: "Encryption", tr: "şifreleme", ex: "IPsec adds encryption." },
      { term: "Remote access", tr: "uzaktan erişim", ex: "Remote access needs a VPN client." },
      { term: "Split tunneling", tr: "bölünmüş tünelleme", ex: "Split tunneling sends only some traffic." },
      { term: "Key exchange", tr: "anahtar değişimi", ex: "IKE handles the key exchange." }
    ],
    resources: [
      res(JERE, "VPN, IPsec ve uzaktan erişim konularını anlatır")
    ],
    sources: [
      CISCO
    ]
  };

})();

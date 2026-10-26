/* Bölüm sonu bilgi testi (Faz 21) · ccna. Yalnız soru ve seçenekler; doğru cevap/açıklama sunucuda (ogr_bilgi_kontrol), burada YOK. */
(window.PP_BILGI = window.PP_BILGI || {}).ccna = {
 "1": {
  "baslik": "Temeller, adresleme, switching ve routing",
  "dersler": [
   1,
   6
  ],
  "sorular": [
   {
    "id": "45a6d143",
    "q": "Bir switch, ilk kez gördüğü bir hedef MAC adresine giden çerçeveyi (MAC tablosunda yok) nasıl işler?",
    "options": [
     "Çerçeveyi düşürür ve gönderene hata bildirir",
     "Giriş portu hariç tüm portlara yayar",
     "Çerçeveyi varsayılan ağ geçidine (router) iletir",
     "Hedef için kendi başına ARP isteği başlatır"
    ]
   },
   {
    "id": "8135330a",
    "q": "192.168.10.77/26 adresi hangi alt ağda bulunur?",
    "options": [
     "192.168.10.0/26",
     "192.168.10.128/26",
     "192.168.10.64/26",
     "192.168.10.76/26"
    ]
   },
   {
    "id": "fe28eb55",
    "q": "Router bir pakete uyan birden çok yol bulduğunda hangisini seçer?",
    "options": [
     "Prefix uzunluğuna bakmadan en düşük metrikli yolu",
     "En uzun ön ek eşleşmesine (en özgül maske) sahip yolu",
     "Tabloya ilk yazılan (en üstteki) yolu",
     "Varsayılan yolu (0.0.0.0/0), önceliği en yüksek olduğu için"
    ]
   },
   {
    "id": "7df43151",
    "q": "Aynı hedef için RIP, OSPF ve statik yol varsa varsayılan yönetimsel uzaklığa göre router hangisini tabloya koyar?",
    "options": [
     "RIP yolu (AD 120)",
     "OSPF yolu (AD 110)",
     "Statik yol (AD 1)",
     "Üçü de eşit yük paylaşımıyla"
    ]
   }
  ]
 },
 "2": {
  "baslik": "Servisler, güvenlik, routing ve kablosuz",
  "dersler": [
   7,
   12
  ],
  "sorular": [
   {
    "id": "796048de",
    "q": "Bir istemci DHCP ile adres alırken Discover, Offer, Request, Acknowledge adımlarının sırası nasıldır?",
    "options": [
     "İstemci Discover'dan sonra doğrudan unicast Acknowledge yollar",
     "Sunucu önce Request gönderir, istemci Offer ile yanıtlar",
     "Yalnızca iki mesaj değişilir: Offer ve Acknowledge",
     "DORA: Discover, Offer, Request, Acknowledge"
    ]
   },
   {
    "id": "ad1b16ab",
    "q": "Birden çok iç hostun tek bir genel IP adresini portlarla paylaşarak internete çıkmasını sağlayan NAT türü hangisidir?",
    "options": [
     "NAT64",
     "Statik NAT",
     "PAT (NAT overload)",
     "Dinamik NAT (havuz, port yok)"
    ]
   },
   {
    "id": "91fcfde9",
    "q": "Switch portunda port security açık ve izin verilen MAC sayısı aşıldığında varsayılan ihlal modu nedir?",
    "options": [
     "Restrict: log tutar, port açık kalır",
     "Shutdown: port err-disabled olur",
     "Protect: portu kapatmadan sessizce düşürür",
     "Port tüm MAC adreslerini kabul eder"
    ]
   },
   {
    "id": "98202ebe",
    "q": "Kablosuz ağda 2,4 GHz bandında birbiriyle çakışmayan kanal kümesi hangisidir?",
    "options": [
     "1, 6 ve 11",
     "1, 2 ve 3 (birbirine bitişik kanallar)",
     "6, 7 ve 8 (birbirine bitişik kanallar)",
     "3, 4 ve 5 (birbirine bitişik kanallar)"
    ]
   }
  ]
 },
 "3": {
  "baslik": "IPv6, STP, izleme, QoS ve otomasyon",
  "dersler": [
   13,
   17
  ],
  "sorular": [
   {
    "id": "913bd086",
    "q": "IPv6'da fe80::/10 aralığındaki adres türü hangisidir?",
    "options": [
     "Unique local (özel ağ, ULA)",
     "Multicast (bir gruba gönderim)",
     "Global unicast (internette yönlendirilebilir)",
     "Link-local unicast"
    ]
   },
   {
    "id": "72114b6c",
    "q": "STP topolojide kök köprüyü (root bridge) neye göre seçer?",
    "options": [
     "Üzerinde en çok port bulunan switch",
     "Yönetici bağlantısı en hızlı olan switch",
     "En düşük köprü kimliği (öncelik, sonra MAC)",
     "Her zaman en yüksek MAC adresine sahip switch"
    ]
   },
   {
    "id": "0f34b5d8",
    "q": "Ağ cihazlarından merkezi bir sunucuya olay günlüğü (log) göndermek için hangi protokol kullanılır?",
    "options": [
     "NTP (zaman eşitleme)",
     "TFTP (dosya aktarımı)",
     "DHCP (adres dağıtımı)",
     "Syslog"
    ]
   },
   {
    "id": "cb3ecd75",
    "q": "REST API üzerinden bir kaynağı okumak için hangi HTTP yöntemi kullanılır?",
    "options": [
     "GET",
     "PUT",
     "DELETE",
     "POST"
    ]
   }
  ]
 },
 "4": {
  "baslik": "Topolojiler, sanallaştırma ve TCP/UDP",
  "dersler": [
   18,
   20
  ],
  "sorular": [
   {
    "id": "33a0d1bc",
    "q": "Veri merkezlerinde her leaf switch'in her spine switch'e bağlandığı mimari hangisidir?",
    "options": [
     "Üç katmanlı (çekirdek, dağıtım, erişim)",
     "Spine-leaf",
     "Yıldız (star) topoloji",
     "Halka (ring) topoloji"
    ]
   },
   {
    "id": "2a60e803",
    "q": "Hypervisor üzerinde çalışan sanal makine ile konteyner arasındaki temel fark nedir?",
    "options": [
     "Konteynerler yalnız fiziksel sunucuda çalışabilir, sanal makinede çalışamaz",
     "İkisi arasında yalıtım ve kaynak kullanımı farkı yoktur",
     "Konteyner çekirdeği paylaşır, VM kendi işletim sistemini taşır",
     "Konteynerlerin kendi çekirdeği ve tam işletim sistemi vardır"
    ]
   },
   {
    "id": "a3ccb27b",
    "q": "TCP bağlantısı kurmak için üç yönlü el sıkışmanın adımları hangisidir?",
    "options": [
     "ACK, SYN, SYN-ACK (ters sıra)",
     "SYN, ACK, FIN (kapanış bayrağıyla)",
     "SYN, SYN-ACK, ACK",
     "SYN, RST, ACK (sıfırlama ile)"
    ]
   },
   {
    "id": "af9bce8c",
    "q": "Canlı video konferansı gibi gecikmeye duyarlı ve kayıp paketi yeniden göndermenin anlamsız olduğu trafik için hangi aktarım protokolü uygundur?",
    "options": [
     "TCP",
     "UDP",
     "SCTP",
     "ICMP"
    ]
   }
  ]
 },
 "5": {
  "baslik": "CDP/LLDP, trunk, FHRP ve VPN",
  "dersler": [
   21,
   23
  ],
  "sorular": [
   {
    "id": "1bda1efc",
    "q": "Hangi keşif protokolü üreticiden bağımsız (IEEE 802.1AB) bir standarttır?",
    "options": [
     "LLDP",
     "CDP (Cisco'ya özel keşif protokolü)",
     "VTP (VLAN veritabanı eşitleme)",
     "DTP (dinamik trunk anlaşması)"
    ]
   },
   {
    "id": "ad759ac6",
    "q": "Bir trunk bağlantısında 802.1Q etiketlenmemiş (untagged) trafik hangi VLAN'a aittir?",
    "options": [
     "Yönetim VLAN'ı (her zaman VLAN 99)",
     "Native VLAN",
     "VLAN 1002",
     "Hiçbir VLAN"
    ]
   },
   {
    "id": "19e9d24c",
    "q": "HSRP'nin amacı nedir?",
    "options": [
     "Hostlara otomatik IP adresi ve ağ geçidi dağıtmak",
     "Uzak ofisler arasında şifreli tünel kurmak",
     "Sanal ağ geçidi ile router yedekliliği sağlamak",
     "Switch'lerde katman 2 döngüsünü engellemek"
    ]
   },
   {
    "id": "e7988f68",
    "q": "Merkez ofis ile şube arasında internet üzerinden sürekli şifreli tünel kurmak için kullanılan VPN türü hangisidir?",
    "options": [
     "Site-to-site VPN",
     "MPLS L3VPN (servis sağlayıcı aboneliği)",
     "SSL sertifikasıyla web sitesine girmek",
     "Remote-access VPN"
    ]
   }
  ]
 },
 "6": {
  "baslik": "Modeller, sayı sistemleri, medya ve sorun giderme",
  "dersler": [
   24,
   29
  ],
  "sorular": [
   {
    "id": "5668238f",
    "q": "OSI modelinde bir IP paketini yönlendiren router hangi katmanda çalışır?",
    "options": [
     "Ağ katmanı (3. katman)",
     "Veri bağlantı katmanı (2. katman)",
     "Taşıma katmanı (4. katman)",
     "Fiziksel katman (1. katman)"
    ]
   },
   {
    "id": "be1f0c04",
    "q": "İkili 11000000 sayısının onluk karşılığı nedir?",
    "options": [
     "128 (yalnızca en soldaki bit)",
     "254 (yedi bit açık)",
     "224 (üç bit açık)",
     "192"
    ]
   },
   {
    "id": "55317d62",
    "q": "Bir sunucu odasında 90 metrelik bakır kablo bağlantısı için hangisi kullanılabilir?",
    "options": [
     "Konsol kablosu (yönetim erişimi için)",
     "Koaksiyel RG-6 kablosu ile Ethernet",
     "UTP (Cat6) kablo",
     "Çok modlu fiber, yalnız 10 m'ye kadar"
    ]
   },
   {
    "id": "72a184b3",
    "q": "Ping başarılı ama kullanıcı ad ile siteye giremiyor. Sorun en olası nerededir?",
    "options": [
     "Varsayılan ağ geçidi adresinde",
     "Fiziksel katmanda kablo kopukluğunda",
     "DNS çözümlemesinde",
     "Switch'in VLAN yapılandırmasında"
    ]
   }
  ]
 }
};

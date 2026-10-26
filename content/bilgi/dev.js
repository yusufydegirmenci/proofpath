/* Bölüm sonu bilgi testi (Faz 21) · dev. Yalnız soru ve seçenekler; doğru cevap/açıklama sunucuda (ogr_bilgi_kontrol), burada YOK. */
(window.PP_BILGI = window.PP_BILGI || {}).dev = {
 "1": {
  "baslik": "Mikroservis, API erişimi, Service ve Deployment",
  "dersler": [
   23,
   26
  ],
  "sorular": [
   {
    "id": "7ff171e0",
    "q": "'Servis başına veri' ilkesine göre bir servisin başka bir servisin sahip olduğu veriye ihtiyacı olursa ne yapılmalıdır?",
    "options": [
     "Aynı tabloyu iki servisin ortak kullanması için paylaştırmak",
     "Veriyi kendi veritabanına bir kez kopyalayıp bir daha eşitlememek",
     "Sahibi olan servisin veritabanına doğrudan bağlanıp okumak",
     "Veriyi sahibi olan servisin API'si üzerinden istemek"
    ]
   },
   {
    "id": "8f95c279",
    "q": "Kubernetes'te Node yetkilendirme kipi neyi yetkilendirir?",
    "options": [
     "Pod'lar arasındaki ağ trafiğine izin verilmesini",
     "Kullanıcıların kubectl exec ile Pod'a bağlanma isteklerini",
     "Kubelet'lerin API sunucusuna yaptığı istekleri",
     "Düğümlerin bulut sağlayıcı API'sine erişimini"
    ]
   },
   {
    "id": "63940003",
    "q": "Varsayılan davranışta LoadBalancer türü bir Service hangi iki türün üzerine kurulur?",
    "options": [
     "ExternalName ve NodePort",
     "Ingress ve ExternalName",
     "ExternalName ve ClusterIP",
     "NodePort ve ClusterIP"
    ]
   },
   {
    "id": "4b834662",
    "q": "Bir Deployment'ın imajı yeni bir sürüme güncellenince ne olur?",
    "options": [
     "Tüm eski Pod'lar silinir ve hiçbir yedek sürüm tutulmaz",
     "İmaj yalnız Service'e yazılır, Pod'lar eski sürümde kalır",
     "Aynı ReplicaSet'in Pod'ları kimlikleri korunarak yerinde güncellenir",
     "Yeni bir ReplicaSet oluşur, eskisi kademeli küçülür"
    ]
   }
  ]
 },
 "2": {
  "baslik": "Pod akışı, genişletme, güvenlik ve gözlemlenebilirlik",
  "dersler": [
   27,
   30
  ],
  "sorular": [
   {
    "id": "1ffaac7f",
    "q": "Scheduler bir Pod için düğüm seçince sonucu nasıl iletir?",
    "options": [
     "Seçilen düğümdeki container runtime'ı kendisi başlatır",
     "Doğrudan etcd'ye yazarak Pod kaydını kendisi değiştirir",
     "API sunucusu üzerinden Pod'un nodeName alanını doldurur",
     "Seçilen düğümdeki kubelet'e doğrudan emir gönderir ve bekler"
    ]
   },
   {
    "id": "5fc0c186",
    "q": "Çekirdek kodunu değiştirmeden Kubernetes'e yeni bir depolama sürücüsü eklemeyi sağlayan standart arayüz hangisidir?",
    "options": [
     "OCI (Open Container Initiative) belirtimi",
     "CRI (Container Runtime Interface)",
     "CSI (Container Storage Interface)",
     "CNI (Container Network Interface)"
    ]
   },
   {
    "id": "1b1a591a",
    "q": "Pod Security Admission'da bir ad alanında 'warn' kipi ile bir profil seçilirse ihlalli Pod için ne olur?",
    "options": [
     "Pod kabul edilir, yalnız denetim günlüğüne not düşülür",
     "Kullanıcıya uyarı gösterilir, Pod yine kabul edilir",
     "Pod reddedilir ve kümede hiç oluşturulmaz, hata döner",
     "Pod kabul edilir ve profil kendiliğinden gevşetilir"
    ]
   },
   {
    "id": "9a084fa5",
    "q": "Prometheus ekosisteminde uyarıların gruplanıp e-posta ya da sohbet gibi kanallara yönlendirilmesinden hangi bileşen sorumludur?",
    "options": [
     "Node Exporter bileşeni",
     "Prometheus Pushgateway",
     "Alertmanager",
     "PromQL sorgu motoru"
    ]
   }
  ]
 }
};

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
     "Veriyi sahibi olan servisin API'si üzerinden istemek",
     "Sahibi olan servisin veritabanına doğrudan bağlanıp okumak",
     "Aynı tabloyu iki servisin ortak kullanması için paylaştırmak",
     "Veriyi kendi veritabanına bir kez kopyalayıp bir daha eşitlememek"
    ]
   },
   {
    "id": "8f95c279",
    "q": "Kubernetes'te Node yetkilendirme kipi neyi yetkilendirir?",
    "options": [
     "Kullanıcıların kubectl exec ile Pod'a bağlanma isteklerini",
     "Düğümlerin bulut sağlayıcı API'sine erişimini",
     "Kubelet'lerin API sunucusuna yaptığı istekleri",
     "Pod'lar arasındaki ağ trafiğine izin verilmesini"
    ]
   },
   {
    "id": "63940003",
    "q": "Varsayılan davranışta LoadBalancer türü bir Service hangi iki türün üzerine kurulur?",
    "options": [
     "Ingress ve ExternalName",
     "NodePort ve ClusterIP",
     "ExternalName ve ClusterIP",
     "ExternalName ve NodePort"
    ]
   },
   {
    "id": "4b834662",
    "q": "Bir Deployment'ın imajı yeni bir sürüme güncellenince ne olur?",
    "options": [
     "Yeni bir ReplicaSet oluşur, eskisi kademeli küçülür",
     "Aynı ReplicaSet'in Pod'ları kimlikleri korunarak yerinde güncellenir",
     "İmaj yalnız Service'e yazılır, Pod'lar eski sürümde kalır",
     "Tüm eski Pod'lar silinir ve hiçbir yedek sürüm tutulmaz"
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
     "Seçilen düğümdeki kubelet'e doğrudan emir gönderir ve bekler",
     "Doğrudan etcd'ye yazarak Pod kaydını kendisi değiştirir",
     "API sunucusu üzerinden Pod'un nodeName alanını doldurur",
     "Seçilen düğümdeki container runtime'ı kendisi başlatır"
    ]
   },
   {
    "id": "5fc0c186",
    "q": "Çekirdek kodunu değiştirmeden Kubernetes'e yeni bir depolama sürücüsü eklemeyi sağlayan standart arayüz hangisidir?",
    "options": [
     "CNI (Container Network Interface)",
     "CRI (Container Runtime Interface)",
     "OCI (Open Container Initiative) belirtimi",
     "CSI (Container Storage Interface)"
    ]
   },
   {
    "id": "1b1a591a",
    "q": "Pod Security Admission'da bir ad alanında 'warn' kipi ile bir profil seçilirse ihlalli Pod için ne olur?",
    "options": [
     "Pod kabul edilir ve profil kendiliğinden gevşetilir",
     "Pod kabul edilir, yalnız denetim günlüğüne not düşülür",
     "Pod reddedilir ve kümede hiç oluşturulmaz, hata döner",
     "Kullanıcıya uyarı gösterilir, Pod yine kabul edilir"
    ]
   },
   {
    "id": "9a084fa5",
    "q": "Prometheus ekosisteminde uyarıların gruplanıp e-posta ya da sohbet gibi kanallara yönlendirilmesinden hangi bileşen sorumludur?",
    "options": [
     "PromQL sorgu motoru",
     "Alertmanager",
     "Prometheus Pushgateway",
     "Node Exporter bileşeni"
    ]
   }
  ]
 }
};

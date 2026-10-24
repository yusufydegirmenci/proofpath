/* DevOps yolu · Tur 6: konu başına ders eki, ikinci parça (anahtar = TMAP.dev dizini, 18–21; ders no = anahtar + 1). KCNA ve Terraform Associate (004) kapsam genişletmesi.
   Alanlar: benzetme + sınırı, rehberli alıştırma, bağımsız görev, yaygın hatalar, geçme ölçütü + kritik yanlış anlama, dış kaynak (son doğrulama tarihiyle), telafi/sonraki adım.
   Tüm alıştırmalar kendi makinede, yerel kümede ya da kâğıt üzerinde yapılır; canlı, ücretli ya da başkasının sistemine işlem istemez.
   Dış kaynak: yalnız HTTP 200 dönenler (curl, 2026-10-19). */
(function () {
  var E = ((window.PP_EK = window.PP_EK || {}).dev = (window.PP_EK.dev || {}));
  var DOG = "2026-10-19";
  var K = function (t, u, neden) { return { t: t, u: u, dogrulama: DOG, neden: neden }; };

  E[18] = {
    analoji: { a: "Site yönetimi: apartman görevlisi her daireye aynı anda bakar (DaemonSet), kapıcı numaralı dairelerin anahtarını sabit tutar (StatefulSet), temizlikçi haftalık gelip işini bitirip gider (CronJob). Kimin hangi kata gireceğini ise kat kuralları ve kapı kilidi (zamanlama, taint) belirler.", sinir: "Sitede kurallar kişiyle konuşularak esner; Kubernetes'te Scheduler yalnız yazılı istek ve kurallara bakar, yazmadığın bir tercihi tahmin etmez." },
    rehberli: ["Üç iş için denetleyici türü seç ve nedenini bir cümleyle yaz: (a) veritabanı, (b) her düğümde log toplayıcı, (c) gece yarısı yedek. Yanıtı Deployment, StatefulSet, DaemonSet, Job/CronJob arasından ver.", "Yerel kümede (kind ya da minikube) konudaki Job örneğini uygula, kubectl logs job/selam çıktısında 'merhaba' satırını bul, sonra Job'ı sil. Kümeyi doğrulamak için önce kubectl config current-context çalıştır.", "Hata ayıklama: bir Pod Pending kalıyor ve describe çıktısında '0/1 nodes are available: 1 node(s) had untolerated taint' yazıyor. Nedeni ve iki çözümü (toleration eklemek ya da taint'i kaldırmak) yaz; hangisinin ne zaman doğru olduğunu açıkla."],
    bagimsiz: "Tek düğümlü yerel kümende bir Pod'a node'un kapasitesinden büyük bir cpu request yaz, Pending kalmasını izle, describe olayından nedeni oku ve isteği küçülterek Pod'u çalıştır. Bulgunu üç satırda not et: ne yaptın, olay ne dedi, neyi düzelttin. Yalnız kendi yerel kümende dene.",
    hatalar: [["Veritabanını Deployment ile çalıştırmak", "Pod yeniden oluşunca kimlik ve disk eşleşmesi kaybolabilir; kalıcı kimlik için StatefulSet, disk için kalıcı depolama kullan."], ["Limits'i yerleşim kuralı sanmak", "Scheduler yerleştirirken requests'e bakar; limits çalışma sırasındaki üst sınırdır."], ["Her Pod'u istediği düğüme sabitlemek", "nodeSelector ve affinity gerektiği kadar kullan; aşırı kısıt Pod'u Pending bırakır ve kümenin dengesini bozar."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen üç iş yükü için doğru denetleyici türünü seçip bir Pending Pod'un nedenini describe olaylarından okuyabilmek.", kritik: [
      "Tüm iş yüklerinin Deployment ile yönetilmesi gerektiğini sanmak",
      "Taint'in Pod'u çektiğini, toleration'ın ise zorla yerleştirdiğini sanmak (taint iter, toleration yalnız izin verir)"
    ] },
    kaynaklar: [
      K("Kubernetes: StatefulSet", "https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/", "Kalıcı kimlik ve depolama gerektiren iş yükü türünün resmî anlatımı."),
      K("Kubernetes: DaemonSet", "https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/", "Düğüm başına Pod çalıştırma örneklerini ve sınırlarını anlatır."),
      K("Kubernetes: Job", "https://kubernetes.io/docs/concepts/workloads/controllers/job/", "Bitmesi beklenen işlerin tamamlanma ve yeniden deneme mantığı."),
      K("Kubernetes: Taint ve Toleration", "https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/", "Düğümün Pod'ları nasıl iteceğini ve toleration'ın rolünü açıklar."),
      K("Kubernetes: Kaynak yönetimi (requests ve limits)", "https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/", "İstek ve sınır farkının zamanlamaya etkisi.")
    ],
    telafi: "Takıldıysan önce şunu sor: bu iş yükü kalıcı kimlik mi ister, her düğümde mi çalışır, yoksa bir kez bitip mi kapanır? Cevap denetleyici türünü seçer; Pending ise doğrudan kubectl describe pod ile Events'e bak.",
    sonraki: "Sıradaki konu: Dağıtım stratejileri ve Kubernetes'te sorun giderme."
  };

  E[19] = {
    analoji: { a: "Yeni menüyü tanıtan restoran: önce tek masaya sunarsın (canary), bir şef iki mutfağı yan yana hazır tutar ve tabelayı çevirir (blue/green), ya da tabakları tek tek değiştirirsin (rolling). Yemek bozuksa önce fişe, sonra mutfak kaydına, en son şefin anlatısına bakarsın.", sinir: "Restoranda müşteri geri bildirimi anında gelir; sistemde geri bildirimi metrik, log ve olaylar verir ve bunlar kurulu değilse bozuk sürümü fark etmek gecikir." },
    rehberli: ["Üç stratejiyi tek tabloda karşılaştır: kesinti var mı, iki sürüm aynı anda çalışır mı, ek kaynak gerekir mi, geri dönüş ne kadar hızlı. Satırlar rolling, blue/green, canary olsun.", "Yerel kümede konudaki bozuk yayın alıştırmasını yap: nginx:9.99.99 ile Deployment oluştur, kubectl get pods ile durumu, kubectl describe pod ile Events satırını oku, imajı nginx:1.27'ye çevir ve rollout status ile düzeldiğini doğrula. Sonunda Deployment'ı sil.", "Hata ayıklama: bir Pod CrashLoopBackOff'ta. Önce hangi üç komutu hangi sırayla çalıştıracağını yaz (get, describe, logs --previous) ve her birinden hangi bilgiyi beklediğini belirt."],
    bagimsiz: "Haftada bir yayın yapan, 1000 kullanıcılı bir uygulama için strateji seç. Kısa bir gerekçe yaz: neden bu strateji, hangi metrik kötüleşirse geri alırsın (ör. hata oranı, gecikme), kaynak maliyeti kabul edilebilir mi. Uygulama kâğıt üzerinde kalır, gerçek bir sistemde deneme.",
    hatalar: [["Pod durumuna bakıp nedeni tahmin etmek", "Neden Events ve loglardadır; describe ve logs --previous çalıştırmadan düzeltme yapma."], ["Canary'yi probe ve metrik olmadan açmak", "Readiness probe ve hata oranı izlemesi olmadan canary bozuk sürümü fark ettirmez; kullanıcı fark eder."], ["Blue/green'in maliyetsiz olduğunu sanmak", "İki ortam birlikte çalışır; veritabanı şeması iki sürümle de uyumlu olmalıdır."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen bir durum için doğru stratejiyi seçip bir CrashLoopBackOff Pod'unun nedenini get, describe ve logs --previous ile, bir ImagePullBackOff Pod'unun nedenini get ve describe (Events) ile bulabilmek.", kritik: [
      "Rolling update'in aynı anda yalnız tek sürümün çalıştığı anlamına geldiğini sanmak",
      "CrashLoopBackOff'un ağ sorunu anlamına geldiğini sanmak (konteyner sürekli çöküyor demektir, nedeni logda aranır)"
    ] },
    kaynaklar: [
      K("Kubernetes: Deployment", "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/", "Rolling update, Recreate ve geri alma mantığının resmî anlatımı."),
      K("Kubernetes: İş yüklerini yönetme (canary örneği)", "https://kubernetes.io/docs/concepts/workloads/management/", "Etiketlerle canary dağıtım örneğini içeren yönetim sayfası."),
      K("Kubernetes: Pod hata ayıklama", "https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/", "Pending, ImagePullBackOff ve CrashLoopBackOff için adım adım teşhis."),
      K("Kubernetes: Çalışan Pod'u ayıklama", "https://kubernetes.io/docs/tasks/debug/debug-application/debug-running-pod/", "kubectl debug ve geçici konteyner kullanımı.")
    ],
    telafi: "Takıldıysan sırayı ezberle: durum (get), neden (describe, Events), kanıt (logs --previous). Strateji için tek soru sor: yanlış giderse kaç kullanıcı etkilenir ve geri dönüş ne kadar sürer?",
    sonraki: "Sıradaki konu: Bulut yerel mimari ve CNCF ekosistemi."
  };

  E[20] = {
    analoji: { a: "Şehir planı: tek büyük bina (monolit) yerine mahalleler (mikroservisler), mahalleler arası yol ve ışık kuralları (service mesh), talebe göre açılıp kapanan dükkânlar (sunucusuz), ortak yol ve kanalizasyon standardı (OCI, CNI, CSI). Belediye planını bir vakıf (CNCF) yayımlar ama hiçbir mahalle zorunlu değildir.", sinir: "Şehirde standartlar tek belediyeye bağlıdır; bulut yerel dünyada CNCF yol gösterir, projeler birbirinden bağımsız geliştirilir ve her proje her sistemde gerekmez." },
    rehberli: ["Beş ihtiyaç için araç sınıfı seç ve kâğıda yaz: yük artınca Pod sayısı, düğüm sayısı, kuyruktaki mesaj sayısına göre ölçek, servisler arası şifreli trafik, boştayken sıfıra inen iş yükü.", "Yerelde bir Deployment (cpu requests tanımlı) üzerine kubectl autoscale ile HPA oluştur, kubectl get hpa çıktısını oku. TARGETS <unknown> ise metrics-server eksik olabilir (ya da Pod'da cpu requests tanımsızdır); nedenini not et, sonra HPA'yı sil.", "Simülasyon (kurulum yok): iki servis arasındaki bir isteği sidecar'lı ve sidecar'sız çiz; mTLS ve yeniden denemeyi hangi kutunun yaptığını işaretle."],
    bagimsiz: "Bir e-ticaret uygulamasını (ürün, sepet, ödeme) mikroservislere böl, ama hangilerinin birlikte kalması gerektiğini de gerekçelendir. Her servis için hangi ölçekleme türünü seçeceğini ve service mesh'in gerekip gerekmediğini kâğıda yaz.",
    hatalar: [["Service mesh'i her sistemde zorunlu sanmak", "Mesh ek kaynak ve karmaşıklık getirir; birkaç servisli sistemde genellikle gereksizdir."], ["HPA, VPA ve Cluster Autoscaler'ı aynı şey sanmak", "HPA Pod sayısını, VPA Pod kaynak isteğini, Cluster Autoscaler düğüm sayısını ayarlar."], ["OCI, CRI, CNI, CSI'yı birer ürün sanmak", "Bunlar arayüz ve biçim standartlarıdır; ürünler bu standartları uygular."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen bir ihtiyaç için doğru araç sınıfını (ölçekleme, mesh, sunucusuz, gözlem) seçip OCI, CRI, CNI, CSI'nın hangi alanı standartlaştırdığını söyleyebilmek.", kritik: [
      "Bulut yerel ile mikroservisi aynı şey sanmak (mikroservis yaklaşımlardan yalnız biridir)",
      "CNCF'in Kubernetes'in tek sahibi olduğunu sanmak (CNCF vakıf olarak barındırır, projeler bağımsız yönetişime sahiptir)"
    ] },
    kaynaklar: [
      K("CNCF: Projeler", "https://www.cncf.io/projects/", "Sandbox, incubating ve graduated olgunluk basamaklarındaki projelerin güncel listesi."),
      K("CNCF: Biz kimiz", "https://www.cncf.io/about/who-we-are/", "Vakfın amacı ve bulut yerel tanımının resmî kaynağı."),
      K("Open Container Initiative: Genel bakış", "https://opencontainers.org/about/overview/", "OCI imaj ve çalışma zamanı standartlarının kısa tanıtımı."),
      K("Kubernetes: Yatay Pod ölçekleme", "https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/", "HPA'nın nasıl hesapladığı ve metrics-server ihtiyacı."),
      K("KEDA belgeleri", "https://keda.sh/docs/", "Olay tabanlı ölçeklemenin resmî belgesi."),
      K("Linkerd: Service mesh nedir", "https://linkerd.io/what-is-a-service-mesh/", "Service mesh kavramının sade anlatımı."),
      K("Knative belgeleri", "https://knative.dev/docs/", "Kubernetes üzerinde sunucusuz iş yükü katmanının resmî belgesi.")
    ],
    telafi: "Takıldıysan sorunu tek cümleyle yaz (ölçek mi, güvenlik mi, maliyet mi, gözlem mi) ve araç adını sonra ara. KCNA'da araç adından önce sorunu tanımak gerekir.",
    sonraki: "Sıradaki konu: Terraform ileri: değişken, modül, durum ve HCP Terraform."
  };

  E[21] = {
    analoji: { a: "Ortak mutfak defteri: tarifin parametreleri (variable), tekrar kullanılan hazır reçete kartı (modül), mutfağın son halini yazan ortak defter (state) ve defteri aynı anda iki kişinin yazmasını engelleyen kilit. Defter ile gerçek raf arasında fark olursa (drift) önce plan ile bakılır.", sinir: "Defter yalnız sana ait tarifi bilir; Terraform, state'te olmayan bir kaynağı kendisi yönetmez ve elle yapılan değişikliği yalnız plan çalıştırınca fark eder." },
    rehberli: ["Konudaki yerel modül örneğini kur: modules/not/main.tf ve main.tf dosyalarını yaz; init, plan, apply çalıştır, terraform state list çıktısında module.a ve module.b kaynaklarını bul, terraform output ile yolları oku.", "Hata ayıklama: icerik = \"\" ver ve terraform plan çalıştır; validation hata mesajını oku, değeri düzelt. Sonra a.txt dosyasını elle değiştirip terraform plan çalıştır: sapmayı (drift) plan çıktısında göster ve apply ile düzelt.", "TF_LOG=DEBUG ile plan'ı bir kez çalıştırıp çıktının hangi bölümünde sağlayıcı çağrılarını gördüğünü yaz; sonra terraform destroy ile temizle. Import ve S3 backend kilidini (use_lockfile) uygulama yapmadan, kâğıt üzerinde adım adım anlat."],
    bagimsiz: "İki ortamlı (dev, prod) bir proje düzeni tasarla: hangi değerler variable olur, hangisi modüle girer, state'i nerede saklarsın, kimin apply edebileceğini nasıl sınırlarsın. HCP Terraform workspace'ini kullanıp kullanmayacağını gerekçelendir. Uygulama kâğıt üzerinde kalır.",
    hatalar: [["sensitive = true ile verinin korunduğunu sanmak", "Yalnız çıktıyı gizler; state'te düz metin kalır. State'i şifreli ve erişimi kısıtlı bir backend'de tut."], ["State'i takımla Git üzerinden paylaşmak", "Eşzamanlı yazma ve gizli veri sorunu çıkar; kilitli uzak backend ya da HCP Terraform kullan."], ["Elle yapılan değişikliği görmezden gelmek", "Drift birikir; plan çalıştırıp farkı oku, sonra ya koda yansıt ya da apply ile geri çek."]],
    gecme: { olcut: "Mini sınavda %80 ve değişkenli, modüllü bir yerel Terraform projesini init, plan, apply, destroy ile çalıştırıp drift'i plan çıktısından okuyabilmek.", kritik: [
      "Remote backend kullanmanın state'i otomatik olarak şifrelediğini ve gizli veriyi sildiğini sanmak",
      "import komutunun kaynağı kod olarak da yazdığını sanmak (konfigürasyon yine yazılmalı ya da üretilmelidir)"
    ] },
    kaynaklar: [
      K("Terraform: Girdi değişkenleri", "https://developer.hashicorp.com/terraform/language/values/variables", "Değişken türleri, doğrulama ve değer verme yollarının resmî anlatımı."),
      K("Terraform: Modüller", "https://developer.hashicorp.com/terraform/language/modules", "Modül yazma, çağırma ve sürümleme."),
      K("Terraform: State kilidi", "https://developer.hashicorp.com/terraform/language/state/locking", "Eşzamanlı çalışmayı engelleyen kilidin mantığı."),
      K("Terraform: Uzak state", "https://developer.hashicorp.com/terraform/language/state/remote", "Uzak backend'in ne sağladığı ve nasıl yapılandırıldığı."),
      K("Terraform: Import", "https://developer.hashicorp.com/terraform/language/import", "Mevcut kaynağı yönetime alma."),
      K("Terraform: Hassas veri", "https://developer.hashicorp.com/terraform/language/manage-sensitive-data", "Sensitive değerlerin state'te nasıl durduğu ve korunma yolları."),
      K("Terraform: Hata ayıklama günlüğü", "https://developer.hashicorp.com/terraform/internals/debugging", "TF_LOG ile ayrıntılı günlük açma."),
      K("HCP Terraform belgeleri", "https://developer.hashicorp.com/terraform/cloud-docs", "Workspace, proje ve ekip özelliklerinin resmî belgesi.")
    ],
    telafi: "Takıldıysan önce şunu sor: bu değer girdi mi, çıktı mı, yoksa state'te mi duruyor? Sonra plan'ı oku; plan okunmadan apply etme.",
    sonraki: "DevOps yolunun son konusunu tamamladın. Şimdi yerel bir proje seçip derle, test et, paketle, Kubernetes'e yerel olarak dağıt ve izle; öğrendiklerini uçtan uca birleştir."
  };
})();

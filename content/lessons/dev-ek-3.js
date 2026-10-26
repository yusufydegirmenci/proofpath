/* DevOps yolu · Faz 19b: yeni konular 23-30 için ders eki (anahtar = TMAP.dev dizini, 22–29; ders no = anahtar + 1). LFS158 bölüm sırası ve resmî CNCF KCNA müfredatına göre.
   Alanlar: benzetme + sınırı, rehberli alıştırma, bağımsız görev, yaygın hatalar, geçme ölçütü + kritik yanlış anlama, dış kaynak (son doğrulama tarihiyle), telafi/sonraki adım.
   Tüm alıştırmalar kendi makinede, yerel kümede (kind ya da minikube) ya da kâğıt üzerinde yapılır; canlı, ücretli ya da başkasının sistemine işlem istemez. Örnekler "simülasyon"dur.
   Dış kaynak: yalnız HTTP 200 dönenler (curl, 2026-10-26). KCNA sınav soru sayısı ve geçme puanı: doğrulanmadı. */
(function () {
  var E = ((window.PP_EK = window.PP_EK || {}).dev = (window.PP_EK.dev || {}));
  var DOG = "2026-10-26";
  var K = function (t, u, neden) { return { t: t, u: u, dogrulama: DOG, neden: neden }; };

  E[22] = {
    analoji: { a: "Çarşı ve dev lokanta: lokantada mutfak tıkanırsa herkes bekler; çarşıda yoğun tezgâha kasa eklersin, öteki tezgâhlara dokunmazsın.", sinir: "Çarşıda müşteri tezgâhlar arasında kendisi gezer; yazılımda servisler arası her çağrı ağ üzerinden gider, gecikebilir ya da kopabilir." },
    rehberli: ["Kendi bildiğin küçük bir uygulamayı (ödev takip, alışveriş) dört iş yeteneğine böl ve her biri için 'kendi verisi ne olurdu?' sorusunu yaz.","0,999 x 0,999 x 0,999 hesabını yap ve zincire dördüncü bir servis eklersen sonucun nasıl değiştiğini bul (0,999 üssü 4).","Bir 'sepet' servisini yeniden başlattığını düşün: ödeme servisi sepete bağlıysa ne olur? Zaman aşımı ve yeniden denemenin yerini bir cümleyle yaz."],
    bagimsiz: "Gerçek ya da hayali bir proje için 'monolit kalmalı mı, bölünmeli mi?' kararını bir sayfada savun: ekip sayısı, dağıtım sıklığı ve ölçek farkı gibi üç ölçüt kullan. Hata ayıklama görevi: 'Mikroservis olunca her şey hızlanır' cümlesindeki eksik maliyetleri yaz.",
    hatalar: [["Mikroservisi her proje için doğru sanmak","Takas olduğunu unutma; küçük ekipte modüler monolit çoğu kez daha iyi başlangıçtır."],["Servisler arası ortak veritabanı kullanmak","Bağımsız dağıtımı bozar; her servis kendi verisini yönetmeli."],["Ağ çağrısını yerel fonksiyon çağrısı gibi düşünmek","Ağ gecikir ve kopar; zaman aşımı, yeniden deneme ve devre kesici gerekir."]],
    gecme: { olcut: "Mini sınavda %80 ve bir uygulama için monolit/mikroservis kararını ölçütlerle gerekçelendirip zincirleme erişilebilirlik hesabını doğru yapabilmek.", kritik: ["Mikroservisin her zaman monolitten üstün olduğunu sanmak","Servislerin ortak veritabanı paylaşmasının sorun olmadığını sanmak"] },
    kaynaklar: [
      K("Martin Fowler: Microservices", "https://martinfowler.com/articles/microservices.html", "Mikroservisin tanımı, özellikleri ve takasları, alanın en çok atıf alan açıklaması."),
      K("microservices.io: Microservice Architecture deseni", "https://microservices.io/patterns/microservices.html", "Deseni ve ona bağlı alt desenleri (veritabanı, ağ geçidi) gösterir."),
      K("Martin Fowler: Strangler Fig Application", "https://martinfowler.com/bliki/StranglerFigApplication.html", "Monoliti kademeli taşıma yaklaşımının kısa anlatımı."),
      K("microservices.io: Database per service", "https://microservices.io/patterns/data/database-per-service.html", "Servis başına veri tabanı desenini ve sonuçlarını açıklar.")
    ],
    telafi: "Takıldıysan önce şu soruyu sor: hangi parçanın ayrı ölçeklenmesi gerekiyor? Cevap yoksa bölmeden önce monoliti modüllere ayır.",
    sonraki: "Sıradaki konu: API'ye giriş yolu: kimlik doğrulama, yetkilendirme ve admission control. Servislere bölünce en kritik kapı API'dir; ona nasıl girildiğini orada göreceksin."
  };

  E[23] = {
    analoji: { a: "Bina girişi: önce kimlik kartı okutulur, sonra ziyaretçi listesine bakılır, en son güvenlik çantanı kurallara göre tarar ve gerekirse eşyanı bırakmanı ister.", sinir: "Binada kapılar kişiyle esner; Kubernetes'te kapılar kesin sırayla çalışır ve her biri yazılı kurala göre karar verir." },
    rehberli: ["Üç isteği sınıflandır: (a) belirteci geçersiz, (b) geçerli kullanıcı ama RBAC kuralı yok, (c) yetkili ama kota dolu. Her biri için hangi aşamada ve hangi hata koduyla (401 ya da 403) takılacağını yaz.","Yerel kümede kubectl auth can-i create pods komutunu --as=system:anonymous ile ve onsuz çalıştır, çıktıları karşılaştır.","Konudaki kota örneğini uygula: pods=2 kotalı bir ad alanında 3 kopyalı Deployment aç, describe rs çıktısında kota hatasını bul, sonra ad alanını sil."],
    bagimsiz: "Bir istek akışı şeması çiz: kubectl'den etcd'ye kadar her kapıyı, hangi aşamada hangi bileşenin karar verdiğini ve hata kodunu göster. Hata ayıklama görevi: 'Yetkim var ama Pod oluşmuyor' durumunda hangi aşamalara bakılacağını sırayla yaz.",
    hatalar: [["401 ile 403'ü karıştırmak","401 kimlik doğrulama başarısızlığıdır; 403 kimlik belli ama yetki ya da admission engeli demektir."],["Admission'ın okumaları da denetlediğini sanmak","Yalnız yazma niteliğindeki istekler admission'dan geçer."],["Anonim isteğin otomatik yetkili olduğunu sanmak","Anonim istek kabul edilir ama RBAC varsayılan olarak ona yetki vermez."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen bir hata kodu ya da kota senaryosunda isteğin hangi aşamada takıldığını doğru söyleyebilmek.", kritik: ["Yetkilendirmenin admission control'den önce gelmediğini sanmak (sıra: kimlik doğrulama, yetkilendirme, admission)","ResourceQuota'nın yetkilendirme aşamasında uygulandığını sanmak"] },
    kaynaklar: [
      K("Kubernetes: Kubernetes API'ye erişimi denetleme", "https://kubernetes.io/docs/concepts/security/controlling-access/", "Üç aşamanın sırasını ve genel akışı resmî olarak anlatır."),
      K("Kubernetes: Kimlik doğrulama", "https://kubernetes.io/docs/reference/access-authn-authz/authentication/", "Kimlik doğrulama yöntemleri ve anonim istek davranışı."),
      K("Kubernetes: Yetkilendirme", "https://kubernetes.io/docs/reference/access-authn-authz/authorization/", "Node, ABAC, RBAC ve Webhook kiplerinin tanımı."),
      K("Kubernetes: Admission denetleyicileri", "https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/", "Admission denetleyici listesi ve etkileri."),
      K("Kubernetes: Kaynak kotaları", "https://kubernetes.io/docs/concepts/policy/resource-quotas/", "ResourceQuota'nın ad alanında nasıl uygulandığı.")
    ],
    telafi: "Takıldıysan hata kodunu ve mesajını oku: 401 ise kimlik, 403 ise yetki ya da admission mesajına bak. Sonra aşamaları sırayla ele.",
    sonraki: "Sıradaki konu: Service türleri karşılaştırma: ClusterIP, NodePort, LoadBalancer, ExternalName. İstek içeri girince Pod'a ulaşmak için Service gerekir; türlerini orada karşılaştıracaksın."
  };

  E[24] = {
    analoji: { a: "Ofis binasında dahili hat (ClusterIP), binanın dış kapısındaki sabit numara (NodePort), şirketin tüm şubelere dağıtım yapan genel çağrı merkezi numarası (LoadBalancer) ve başka şirketi gösteren rehber satırı (ExternalName).", sinir: "Telefon rehberinde numara elle değişir; Service ise Pod'lar değiştikçe arkasındaki adresleri kendisi günceller." },
    rehberli: ["Konudaki komutlarla bir Deployment için ClusterIP ve NodePort Service aç, kubectl get svc çıktısında PORT(S) sütununu oku.","Üç senaryo için tür seç: (a) yalnız veritabanına içeriden erişim, (b) test için hızlıca dışarıdan erişim, (c) bulutta herkese açık web sitesi.","ExternalName ile bir dış alan adına yönlendirme yazılı olarak çiz ve DNS'te hangi kaydın döndüğünü açıkla."],
    bagimsiz: "Dört türü karşılaştıran tek sayfalık bir tablo hazırla: erişim kapsamı, ek kaynaklar, maliyet ve tipik kullanım. Hata ayıklama görevi: Service'e istek gidiyor ama yanıt yok; selector, targetPort ve EndpointSlice kontrolünü sırayla yaz.",
    hatalar: [["Service seçicisini Pod etiketiyle eşleştirmemek","Eşleşme yoksa EndpointSlice boş olur ve trafik gidecek yer bulamaz."],["port ile targetPort'u karıştırmak","port Service'in portu, targetPort Pod'daki konteyner portudur."],["ExternalName'e IP vermeye çalışmak","Hedef bir alan adı olmalı; IP için Endpoints/EndpointSlice kullanılır."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen bir senaryo için doğru Service türünü gerekçesiyle seçebilmek.", kritik: ["NodePort'un yalnız tek bir düğümde açıldığını sanmak (her düğümde açılır)","ExternalName'in bir yük dengeleyici olduğunu sanmak"] },
    kaynaklar: [
      K("Kubernetes: Service", "https://kubernetes.io/docs/concepts/services-networking/service/", "Tüm Service türlerinin, port alanlarının ve DNS davranışının resmî anlatımı."),
      K("Kubernetes: kube-proxy", "https://kubernetes.io/docs/reference/command-line-tools-reference/kube-proxy/", "Service kurallarını düğümde uygulayan bileşenin seçenekleri.")
    ],
    telafi: "Takıldıysan şu sırayla sor: kim erişecek (içeri/dışarı), hangi adresle, trafiği kim dengeleyecek? Sonra türü seç.",
    sonraki: "Sıradaki konu: kube-proxy, ReplicaSet ve mikroservislerin Kubernetes'te çalışması. Service'in arkasındaki kuralları kube-proxy ve ReplicaSet düzeyinde pekiştireceksin."
  };

  E[25] = {
    analoji: { a: "Postane: kube-proxy her mahalledeki dağıtım kural defteridir; ReplicaSet ise 'her vardiyada tam 3 postacı olsun' diyen amir. Biri çıkarsa yenisini çağırır.", sinir: "Postacılar kendi isteğiyle gelip gider; Pod'lar ise yalnız denetleyicinin kararıyla açılır ve kapanır." },
    rehberli: ["Konudaki komutlarla 3 kopyalı Deployment aç, tüm Pod'ları sil ve ReplicaSet'in yenilerini açışını izle.","replicas=10, maxSurge=%25, maxUnavailable=%25 için en çok kaç Pod'un aynı anda var olabileceğini ve en az kaçının hazır kalacağını hesapla (13 ve 8).","Bir mikroservis için Deployment ve Service YAML'ının hangi alanlarla eşleştiğini (selector ve etiket) kâğıda çiz."],
    bagimsiz: "Üç mikroservisten oluşan bir uygulama için kâğıt üzerinde: her servise Deployment ve Service ata, servisler arası DNS adlarını yaz ve bir Pod düştüğünde ReplicaSet'in ne yaptığını açıkla. Hata ayıklama görevi: Service'e istek bazen başarısız oluyor; Pod hazırlığı, EndpointSlice ve kube-proxy sırasını yaz.",
    hatalar: [["kube-proxy'yi tek merkezli bir proxy sanmak","Her düğümde çalışır ve kural kurar; trafik çekirdekte yönlendirilir."],["ReplicaSet seçicisini başka Pod'larla çakıştırmak","Seçiciye uyan başıboş Pod'lar sahiplenilebilir; etiketleri benzersiz tut."],["maxSurge ve maxUnavailable yuvarlamasını karıştırmak","Yüzdede maxSurge yukarı, maxUnavailable aşağı yuvarlanır."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen replicas ve yüzde değerleri için rolling update sınırlarını doğru hesaplayabilmek.", kritik: ["kube-proxy'nin yalnız tek düğümde çalıştığını sanmak","Pod'u elle silmenin kalıcı olarak kopya sayısını azalttığını sanmak"] },
    kaynaklar: [
      K("Kubernetes: ReplicaSet", "https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/", "ReplicaSet'in seçici, şablon ve sahiplenme mantığı."),
      K("Kubernetes: Deployment", "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/", "Rolling update, maxSurge ve maxUnavailable tanımları."),
      K("Kubernetes: kube-proxy", "https://kubernetes.io/docs/reference/command-line-tools-reference/kube-proxy/", "kube-proxy kipleri ve seçenekleri."),
      K("Kubernetes: Service", "https://kubernetes.io/docs/concepts/services-networking/service/", "Service ve EndpointSlice ilişkisi.")
    ],
    telafi: "Takıldıysan önce 'istenen sayı' ile 'şu anki sayı'yı yaz. ReplicaSet bu farkı kapatmaya çalışır; sonra kuralları kube-proxy kurar.",
    sonraki: "Sıradaki konu: kubectl ile Pod çalıştırınca ne olur: istekten konteynere akış. Pod, ReplicaSet ve kube-proxy'yi birleştirip tüm akışı kubectl run komutundan başlayarak izleyeceksin."
  };

  E[26] = {
    analoji: { a: "Restoran: garson siparişi kasaya yazar, defter kaydeder, şef koordinatörü ocağı seçer, ocağın aşçısı yemeği yapar.", sinir: "Restoranda garson aşçıya doğrudan söyleyebilir; Kubernetes'te bileşenler birbirine değil, hep API sunucusundaki nesneye bakar." },
    rehberli: ["Konudaki komutlarla bir Pod başlat ve kubectl describe pod çıktısındaki olay sırasını (Scheduled, Pulling, Pulled, Created, Started) bileşenlerle eşleştir.","Akışı kâğıda çiz: kubectl, API sunucusu, etcd, scheduler, kubelet, container runtime. Her okun yanına ne taşındığını yaz.","kubectl create deployment komutunda ek olarak hangi denetleyicilerin devreye girdiğini (Deployment, ReplicaSet) ekle ve nesne sayısını say."],
    bagimsiz: "Bir Pod'un Pending'de takılmasını farklı nedenler için (scheduler düğüm bulamadı, imaj çekilemedi, kota doldu) üç ayrı kutuda göster: hangi bileşen suçlu, hangi komutla bakılır? Hata ayıklama görevi: Pod'un NODE sütunu boşsa hangi bileşene bakacağını yaz.",
    hatalar: [["Scheduler'ın konteyner başlattığını sanmak","Scheduler yalnız düğümü seçer; başlatmayı kubelet yapar."],["Çıplak Pod için controller manager'ın gerekli olduğunu sanmak","Yalnız Deployment gibi üst nesneler denetleyici ister."],["Pod Pending'ken hep imaj sorunu aramak","NODE boşsa sorun scheduler'dadır; atanmışsa imaj ve kubelet olaylarına bak."]],
    gecme: { olcut: "Mini sınavda %80 ve kubectl run akışındaki bileşen sırasını ve her bileşenin tek görevini doğru söyleyebilmek.", kritik: ["Scheduler'ın konteyneri başlattığını sanmak","Bileşenlerin etcd ile doğrudan konuştuğunu sanmak"] },
    kaynaklar: [
      K("Kubernetes: Küme mimarisi", "https://kubernetes.io/docs/concepts/architecture/", "Kontrol düzlemi ve düğüm bileşenlerinin resmî tanımı."),
      K("Kubernetes: kube-scheduler", "https://kubernetes.io/docs/concepts/scheduling-eviction/kube-scheduler/", "Filtreleme ve puanlama adımlarının anlatımı."),
      K("Kubernetes: Pod yaşam döngüsü", "https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/", "Pod aşamaları ve durumları."),
      K("Kubernetes: Denetleyiciler", "https://kubernetes.io/docs/concepts/architecture/controller/", "İstenen ve gerçek durumu eşitleyen döngü.")
    ],
    telafi: "Takıldıysan akışı tek cümleyle yaz: istek → kayıt → düğüm seçimi → çalıştırma. Sonra her ok için hangi bileşen olduğunu doldur.",
    sonraki: "Sıradaki konu: Kubernetes'i genişletmek: CRI, RuntimeClass, CRD ve Operator. Kontrol düzlemi akışını bildiğine göre kümeyi genişleten RuntimeClass, CRD ve Operator kavramlarına geçebilirsin."
  };

  E[27] = {
    analoji: { a: "Elektrik prizleri: CRI, CNI ve CSI standart prizlerdir. RuntimeClass hangi cihazın hangi prize takılacağını seçer. CRD kendi yeni prizini tanımlar; Operator o prize takılan, işini bilen akıllı cihazdır.", sinir: "Prizler pasif standarttır; Kubernetes'te Operator sürekli çalışan bir denetim döngüsüdür ve yanlış yazılırsa kaynak tüketebilir." },
    rehberli: ["CRI, CNI ve CSI'nin her birinin hangi iki bileşen arasındaki arayüz olduğunu kâğıda yaz (runtime, ağ eklentisi, depolama eklentisi).","Kâğıt üzerindeki CRD örneğini oku ve Yedek kind'ının hangi grup, kapsam ve çoğul ada sahip olduğunu bul.","Bir Operator için denetim döngüsünü yaz: Yedek kaynağını izle, istenen ile gerçek durumu karşılaştır, farkı kapat."],
    bagimsiz: "Bir veritabanı Operator'ı için kâğıt üzerinde: hangi CRD olurdu, hangi alanlar (sürüm, kopya sayısı, yedek takvimi) olurdu, Operator hangi işleri otomatik yapardı? Hata ayıklama görevi: CRD var ama hiçbir şey olmuyor; neden olabilir?",
    hatalar: [["Dockershim'in kaldırılmasını imajların çalışmaması sanmak","OCI imajları containerd ve CRI-O ile çalışır."],["CRD oluşturup davranış beklemek","Davranış için kaynağı izleyen bir denetleyici gerekir."],["RuntimeClass adını kümede tanımsız bırakmak","Pod'un runtimeClassName'i tanımsızsa Pod başlamaz."]],
    gecme: { olcut: "Mini sınavda %80 ve CRI/RuntimeClass/CRD/Operator kavramlarını doğru ilişkilendirebilmek.", kritik: ["Kubernetes'in artık Docker imajlarını çalıştıramadığını sanmak","CRD'nin tek başına bir uygulamayı yönettiğini sanmak"] },
    kaynaklar: [
      K("Kubernetes: Container Runtime Interface (CRI)", "https://kubernetes.io/docs/concepts/architecture/cri/", "CRI'nin kubelet ile runtime arasındaki rolü."),
      K("Kubernetes: RuntimeClass", "https://kubernetes.io/docs/concepts/containers/runtime-class/", "RuntimeClass alanları, handler ve zamanlama."),
      K("Kubernetes: Özel kaynaklar (CRD)", "https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/", "CRD ve özel kaynağın tanımı."),
      K("Kubernetes: Operator deseni", "https://kubernetes.io/docs/concepts/extend-kubernetes/operator/", "Operator'ın ne olduğu ve neden kullanıldığı.")
    ],
    telafi: "Takıldıysan önce şunu sor: bu yeni bir nesne türü mü (CRD), yeni bir çalıştırma biçimi mi (RuntimeClass), yoksa işi yapan döngü mü (Operator)?",
    sonraki: "Sıradaki konu: RBAC ve Pod Security Standards ile küme güvenliği. Genişletilen kümeyi güvende tutmak için RBAC ve Pod Security Standards'ı sırada göreceksin."
  };

  E[28] = {
    analoji: { a: "Bina: Role bir kat için anahtar kartıdır, ClusterRole tüm binayı açan karttır. RoleBinding kartı bir kişiye verir. Pod Security ise kapıdaki bagaj taramasıdır.", sinir: "Kartlar fiziksel olarak 'yasak' içerebilir; RBAC'ta yalnız izin kartları vardır, yasak kartı yoktur." },
    rehberli: ["Konudaki komutlarla pod-okuyucu Role'ünü, ci ServiceAccount'unu ve RoleBinding'i oluştur; üç can-i komutunun yes/no çıktısını tahmin et, sonra çalıştırıp karşılaştır.","dev ad alanına enforce=baseline etiketi koy ve privileged: true olan bir Pod'un neden reddedildiğini mesajdan oku.","Üç profil için bir tablo yap: ne serbest, ne yasak (örneğin privileged konteyner, hostNetwork, root kullanıcı)."],
    bagimsiz: "Bir uygulama ekibi için en az ayrıcalıklı bir RBAC planı yaz: hangi ServiceAccount hangi fiilleri hangi kaynaklarda kullanır? Hata ayıklama görevi: 'forbidden: User cannot list pods' mesajında hangi Role/Binding eksik olabilir?",
    hatalar: [["Role oluşturup Binding'i unutmak","Role tek başına kimseye izin vermez; Binding gerekir."],["RoleBinding ile ClusterRole'ü kümeye açık sanmak","ClusterRole'ü RoleBinding ile bağlarsan izin yalnız o ad alanı için geçerlidir."],["Pod Security etiketini yalnız Pod'a koymak","Etiket ad alanına konur."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen Role/Binding için kullanıcının hangi işleri yapabileceğini doğru söyleyebilmek.", kritik: ["RBAC'ta deny kuralı olduğunu sanmak","Pod Security Standards'ın RBAC'ın yerine geçtiğini sanmak"] },
    kaynaklar: [
      K("Kubernetes: RBAC yetkilendirmesi", "https://kubernetes.io/docs/reference/access-authn-authz/rbac/", "Role, ClusterRole ve Binding nesnelerinin resmî anlatımı."),
      K("Kubernetes: Pod Security Standards", "https://kubernetes.io/docs/concepts/security/pod-security-standards/", "Üç profilin kural listesi."),
      K("Kubernetes: Pod Security Admission", "https://kubernetes.io/docs/concepts/security/pod-security-admission/", "enforce, audit, warn kipleri ve etiketler.")
    ],
    telafi: "Takıldıysan şu sırayla sor: kim (subject), hangi fiil, hangi kaynak, hangi ad alanı? Dördünü yazınca Role ve Binding kendiliğinden çıkar.",
    sonraki: "Sıradaki konu: Gözlemlenebilirlik yığını ve CNCF topluluğu: Prometheus, OpenTelemetry, SIG ve KEP. Güvenli kümenin sağlığını izlemek için gözlemlenebilirlik yığınına ve CNCF ekosistemine geçeceksin."
  };

  E[29] = {
    analoji: { a: "Hastane izleme: nabız ve tansiyon sayıları metrik, hasta defteri log, hastanın odalar arasındaki yolculuk haritası iz.", sinir: "Hastane izleme kayıt ister; yazılımda her şeyi kaydetmek depolama ve gizlilik maliyeti getirir, bu yüzden örnekleme ve filtreleme gerekir." },
    rehberli: ["Üç soru için doğru sinyali seç: (a) saniyede kaç istek geliyor, (b) tam olarak hangi istek hata verdi, (c) istek hangi servislerde ne kadar bekledi?","t=0'da 1200, t=60 sn'de 1800 olan bir sayaç için rate değerini hesapla (10 istek/sn).","SLO %99,95 olan bir hizmetin 30 günlük hata bütçesini dakika olarak bul (21,6 dk)."],
    bagimsiz: "Küçük bir uygulama için gözlemlenebilirlik planı yaz: hangi üç metrik, hangi log alanları, hangi isteklerin izi tutulacak? Hata ayıklama görevi: Grafikte hata oranı artmış ama loglarda hata yok; hangi sinyale ve hangi sorulara bakarsın?",
    hatalar: [["Yalnız log tutup metrik toplamamak","Trend ve eşik uyarısı için metrik gerekir."],["Prometheus'u uzun süreli arşiv sanmak","Zaman serisi saklamayı sınırlar; uzun vadede ayrı çözümler kullanılır."],["Metrik etiketlerinde sınırsız değer kullanmak","Her farklı etiket değeri yeni bir seri doğurur; seri sayısı patlar."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen sayaç değerlerinden rate ve SLO'dan hata bütçesini doğru hesaplayabilmek.", kritik: ["Prometheus'un varsayılan olarak veri ittiğini sanmak","Metrik, log ve izin aynı soruları yanıtladığını sanmak"] },
    kaynaklar: [
      K("Prometheus: Genel bakış", "https://prometheus.io/docs/introduction/overview/", "Prometheus'un mimarisi ve pull modeli."),
      K("OpenTelemetry: Gözlemlenebilirlik temelleri", "https://opentelemetry.io/docs/concepts/observability-primer/", "Metrik, log ve iz kavramlarının tanımı."),
      K("Kubernetes: Loglama mimarisi", "https://kubernetes.io/docs/concepts/cluster-administration/logging/", "Konteyner loglarının düğümde nasıl tutulduğu."),
      K("Kubernetes: Sistem metrikleri", "https://kubernetes.io/docs/concepts/cluster-administration/system-metrics/", "Kontrol düzlemi bileşenlerinin metrikleri."),
      K("CNCF: KCNA sertifikası", "https://www.cncf.io/certification/kcna/", "KCNA sınavının resmî sayfası."),
      K("CNCF: KCNA müfredatı", "https://github.com/cncf/curriculum", "Resmî müfredat PDF'inin bulunduğu CNCF deposu."),
      K("CNCF projeleri", "https://www.cncf.io/projects/", "Projelerin olgunluk aşamalarına göre listesi.")
    ],
    telafi: "Takıldıysan sorunu 'kaç, ne, nerede' diye böl: kaç tane (metrik), ne oldu (log), nerede takıldı (iz).",
    sonraki: "Yolun sonu: DevOps yolunun Kubernetes ve bulut yerel kısmını tamamladın. Şimdi KCNA alanlarına göre soru bankasıyla tekrar et ve yerel kümede bir uygulamayı uçtan uca dağıtıp izle."
  };
})();

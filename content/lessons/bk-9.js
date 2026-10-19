/* Backend / AWS · sabit dersler 43-46 (depolama, felaket kurtarma, maliyet, analitik) · SAA-C03 kapsam genişletmesi (Tur 3) · ders eki: bk-ek-3.js, anahtarlar 42-45 */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).bk = (window.PP_LESSONS.bk || {}));
  var SAA = { title: "AWS Certified Solutions Architect – Associate", url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/", type: "doc", level: "orta", lang: "EN" };

  /* 43 ─────────────────────────────── Depolama seçimi: EBS, EFS, FSx ve S3 ileri */
  L[43] = {
    hook: "Her veri aynı yerde durmaz: veritabanı diski, ortak dosya paylaşımı ve yıllık arşiv farklı depolama ister. Yanlış seçim ya hızı ya parayı ya da dayanıklılığı kaybettirir.",
    homework: "Şu dört veriyi uygun depolamaya yerleştir: bir veritabanının veri dosyaları, 20 Linux sunucunun ortak içerik klasörü, bir Windows ekibinin dosya paylaşımı ve beş yıl saklanması gereken ama neredeyse hiç okunmayan kayıtlar. Her biri için tek cümlelik gerekçe yaz.",
    warmup: {
      recap: [
        { point: "S3 nesne depolamadır ve depolama sınıfları vardır; yaşam döngüsü kuralları nesneyi başka sınıfa taşır.", example: "Standard → Glacier" },
        { point: "EBS bir EC2 örneğinin kalıcı diskidir; instance store geçicidir.", example: "Kök ve veri diski" }
      ],
      concepts: [
        { term: "Amazon EBS", tr: "Blok depolama", summary: "EC2 örneğine bağlanan disk gibi çalışan, tek bir AZ içinde yaşayan, anlık görüntü (snapshot) ile yedeklenen blok depolamadır.", example: "Veritabanı veri diski" },
        { term: "Amazon EFS", tr: "Elastik dosya sistemi", summary: "Birden çok EC2 örneğinin aynı anda bağlayabildiği, kapasitesi kendiliğinden büyüyen yönetilen NFS dosya sistemidir.", example: "Ortak içerik klasörü" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Bir ekip veritabanını EC2'de çalıştırıyor ve gecikme dalgalanıyor. Başka bir ekip birden çok sunucunun aynı klasörü görmesini istiyor. Hukuk birimi kayıtların bir süre silinememesini şart koşuyor. Her sorunun depolama cevabı farklıdır; mimar türü iş yükünden seçer." },
      { t: "steps", h: "EBS ve instance store", items: [
        "EBS blok depolamadır; tek bir AZ'de yaşar ve aynı AZ'deki bir EC2 örneğine bağlanır. Örnekten bağımsız kalıcıdır.",
        "Yedek: anlık görüntü (snapshot) artımlıdır ve bölge içinde S3 üzerinde saklanır. Başka AZ ya da bölgede aynı diski yeniden kurmak için anlık görüntü oradan geri yüklenir ya da kopyalanır.",
        "Birim türleri kavramsal olarak: genel amaçlı SSD (çoğu iş yükü için dengeli), sağlanmış IOPS SSD (gecikmeye duyarlı veritabanları için tutarlı yüksek performans), verim odaklı HDD (büyük sıralı okuma-yazma: günlük, veri ambarı), soğuk HDD (seyrek erişim, en ucuz). HDD türleri önyükleme (boot) diski olamaz. Güncel tür adları ve sınırlar için resmî belgeyi oku.",
        "Şifreleme KMS ile açılabilir; şifreli diskten alınan anlık görüntü de şifrelidir.",
        "Instance store: örneğin bulunduğu fiziksel konağa bağlı çok hızlı geçici disktir. Örnek durdurulunca ya da konak bozulunca veri gider; önbellek ve geçici iş verisi içindir."
      ] },
      { t: "steps", h: "Dosya sistemleri: EFS ve FSx", items: [
        "EFS: NFS protokolüyle Linux örneklerine bağlanır; birden çok AZ'deki çok sayıda örnek aynı anda kullanır. Kapasite kendiliğinden büyür-küçülür. Seyrek erişilen dosyalar için daha ucuz sınıfa yaşam döngüsü kuralı atanabilir.",
        "FSx for Windows File Server: SMB ve Active Directory entegrasyonu gereken Windows iş yükleri için.",
        "FSx for Lustre: yüksek hızlı paralel dosya sistemi; makine öğrenmesi, bilimsel hesaplama gibi HPC iş yükleri için ve S3 verisiyle bütünleşir.",
        "FSx for NetApp ONTAP ve FSx for OpenZFS: mevcut şirket içi NetApp ya da ZFS çözümlerini bulutta kullanmak için."
      ] },
      { t: "steps", h: "S3'te ileri özellikler", items: [
        "Çoğaltma (replication): kovadaki nesneleri başka bir bölgeye (CRR) ya da aynı bölgedeki başka bir kovaya (SRR) otomatik kopyalar. Her iki kovada sürümleme (versioning) açık olmalıdır.",
        "Object Lock: nesneyi saklama süresi boyunca silinmeye ve üzerine yazılmaya karşı korur (WORM). Yönetişim modunda yetkili kullanıcılar kaldırabilir; uyumluluk modunda kök kullanıcı dahil kimse kaldıramaz. Sürümleme gerektirir.",
        "Arşiv sınıfları: anında geri getirmeli, dakikalar-saatler içinde esnek geri getirmeli ve saatler süren en ucuz derin arşiv sınıfları vardır. Seyrek erişim ve geri getirme süresine tahammül varsa maliyet düşer; ayrıntı için resmî belgeyi oku.",
        "Intelligent-Tiering: erişim örüntüsü bilinmiyorsa nesneleri otomatik taşır.",
        "Transfer Acceleration ve multipart yükleme: uzak istemcilerden büyük dosya yüklemeyi hızlandırır ve dayanıklı kılar.",
        "Erişim noktaları (access points): çok sayıda uygulamanın aynı kovaya farklı ve sade politikalarla erişmesini sağlar."
      ] },
      { t: "box", h: "Hangi depolama, hangi iş yükü?", text: "Veritabanı diski: EBS sağlanmış IOPS SSD. Çok sunuculu ortak Linux klasörü: EFS. Windows dosya paylaşımı: FSx for Windows. HPC ve S3 verisi üzerinde hızlı iş: FSx for Lustre. Değişmez kayıt: S3 Object Lock. Seyrek ulaşılan uzun süreli arşiv: S3 arşiv sınıfı. Geçici, çok hızlı: instance store." },
      { t: "warn", h: "Tuzak", text: "EBS'i birden çok AZ'de ortak disk sanmak: EBS tek AZ'dedir. Başka AZ'ye taşımak için anlık görüntü gerekir; ortak paylaşım için EFS ya da FSx kullan. Bir de Object Lock'u sürümleme olmadan beklemek: sürümleme şarttır. Fiyat ve sınırlar için resmî belgeden doğrula." }
    ],
    objectives: [
      { id: "h1", text: "EBS birim türlerini (SSD ve HDD aileleri) iş yüküne göre seçebilir, instance store'un geçici olduğunu bilirsin." },
      { id: "h2", text: "EBS'in AZ sınırını ve anlık görüntüyle başka AZ ya da bölgeye taşımayı açıklayabilirsin." },
      { id: "h3", text: "EFS ile FSx çeşitlerini (Windows, Lustre) iş yüküne göre ayırt edebilirsin." },
      { id: "h4", text: "S3 çoğaltma, Object Lock ve arşiv sınıflarını gereksinime göre eşleştirebilirsin." }
    ],
    summary: [
      "EBS tek AZ'deki blok depolamadır; veritabanı için sağlanmış IOPS SSD, büyük sıralı iş için HDD türleri seçilir. HDD önyükleme diski olamaz.",
      "EBS'i başka AZ ya da bölgeye taşımak için anlık görüntü alınıp orada geri yüklenir ya da kopyalanır.",
      "Instance store çok hızlı ama geçicidir; durdurma ya da konak arızasında veri gider.",
      "EFS çok sunuculu Linux paylaşımı, FSx for Windows SMB/AD, FSx for Lustre HPC içindir.",
      "S3 çoğaltma sürümleme ister; Object Lock WORM saklama sağlar; arşiv sınıfları seyrek ulaşılan veriyi ucuza saklar."
    ],
    quiz: [
      { id: "118a4232", q: "Gecikmeye duyarlı bir ilişkisel veritabanı EC2'de çalışacak ve tutarlı yüksek disk performansı gerekiyor. Hangi depolama uygundur?", options: [
  "EBS sağlanmış IOPS SSD birimi",
  "EBS soğuk HDD birimi",
  "EC2 instance store, kalıcı veri deposu olarak",
  "S3 Standard-IA"
], obj: "h1" },
      { id: "e5287519", q: "Bir EBS birimindeki verinin başka bir AZ'deki EC2 örneğinde de kullanılması gerekiyor. Ne yaparsın?", options: [
  "EBS birimini doğrudan diğer AZ'deki örneğe bağlarsın",
  "Önyükleme diski HDD türüne çevrilir",
  "Instance store üzerine kopyalarsın",
  "Birimin anlık görüntüsünü alıp diğer AZ'de bu anlık görüntüden yeni bir birim oluşturursun"
], obj: "h2" },
      { id: "45ff160a", q: "Farklı AZ'lerdeki çok sayıda Linux sunucu aynı dosya klasörünü aynı anda okuyup yazacak ve kapasiteyi önceden belirlemek istemiyorsun. Hangi hizmet uygundur?", options: ["Amazon EBS", "EC2 instance store", "Amazon EFS", "S3 Glacier Deep Archive"], obj: "h3" },
      { id: "dec8a5b4", q: "Active Directory ile bütünleşen, SMB protokolüyle çalışan bir Windows dosya paylaşımı istiyorsun. Hangi hizmet doğrudur?", options: ["Amazon EFS", "Amazon FSx for Windows File Server", "Amazon FSx for Lustre", "EBS soğuk HDD birimi"], obj: "h3" },
      { id: "e20d73d3", q: "Makine öğrenmesi eğitim işi, S3'teki veri setini çok yüksek verimle paralel okumak zorunda. Hangi hizmet bu iş yükü için uygundur?", options: [
  "Amazon FSx for Windows File Server",
  "Amazon FSx for Lustre",
  "EBS genel amaçlı SSD birimi",
  "S3 Glacier Flexible Retrieval"
], obj: "h3" },
      { id: "d60eb890", q: "Mevzuat gereği finansal kayıtların belirli bir saklama süresince silinememesi ve üzerine yazılamaması isteniyor. S3'te hangi özellik kullanılır?", options: [
  "S3 Transfer Acceleration",
  "S3 Intelligent-Tiering",
  "S3 Object Lock (WORM) ve sürümleme",
  "Yalnızca kova politikasında GetObject izni"
], obj: "h4" },
      { id: "e08fc2de", q: "Bir kovadaki nesnelerin başka bir bölgedeki kovaya otomatik kopyalanması için ilk koşul nedir?", options: [
  "Hedef kovanın aynı bölgede olması",
  "Kovanın herkese açık olması",
  "Her nesnenin Glacier sınıfında olması",
  "Kaynak ve hedef kovalarda sürümlemenin açık olması"
], obj: "h4" },
      { id: "dadcbc6a", q: "Beş yıl saklanması gereken ama yılda en fazla bir kez, saatler içinde ulaşılabilmesi yeterli olan büyük bir arşiv için en düşük maliyetli S3 seçeneği hangisidir?", options: [
  "S3 Glacier Deep Archive sınıfı",
  "S3 Standard",
  "S3 Intelligent-Tiering'in sık erişim katmanı",
  "EBS genel amaçlı SSD"
], obj: "h4" }
    ],
    interview: [
      { q: "EBS ile EFS arasındaki fark nedir?", a: "EBS tek AZ'deki tek örneğe bağlanan blok depolamadır (disk gibi). EFS ise birden çok AZ'deki çok sayıda örneğin aynı anda bağlayabildiği yönetilen NFS dosya sistemidir." },
      { q: "Instance store ne zaman veri kaybeder?", a: "Örnek durdurulduğunda, sonlandırıldığında ya da altındaki konak arızalandığında. Bu yüzden önbellek ve geçici iş verisi için kullanılır, kalıcı veri için kullanılmaz." },
      { q: "S3 Object Lock'un iki modu arasındaki fark nedir?", a: "Yönetişim modunda yetkili kullanıcılar korumayı kaldırabilir. Uyumluluk modunda saklama süresi dolana kadar kök kullanıcı dahil kimse nesneyi silemez ya da değiştiremez." }
    ],
    vocab: [
      { term: "Block storage", tr: "blok depolama", ex: "EBS is block storage." },
      { term: "Snapshot", tr: "anlık görüntü", ex: "Create a snapshot of the volume." },
      { term: "File system", tr: "dosya sistemi", ex: "Mount the file system on three instances." },
      { term: "Retention", tr: "saklama süresi", ex: "Set a retention period." },
      { term: "Replication", tr: "çoğaltma", ex: "Enable cross-Region replication." }
    ],
    resources: [
      { title: "Amazon EBS birim türleri", url: "https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volume-types.html", type: "doc", why: "Birim türleri ve kullanım alanları", level: "orta", lang: "EN" },
      { title: "Amazon EFS nedir", url: "https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html", type: "doc", why: "Yönetilen dosya sistemi", level: "orta", lang: "EN" }
    ],
    sources: [SAA]
  };

  /* 44 ─────────────────────────────── Felaket kurtarma ve AWS Backup */
  L[44] = {
    hook: "Bir AZ çökmesi sıradan bir gündür; bütün bir bölgenin kaybı ise planlı hazırlık ister. Kurtarma stratejisi, ne kadar veri ve zaman kaybedebileceğine göre seçilir.",
    homework: "Bir sipariş sistemi için iki sayı belirle: en fazla ne kadar veri kaybına katlanabilirsin, sistem en fazla ne kadar süre kapalı kalabilir? Sonra bu iki sayıya en ucuz uyan felaket kurtarma stratejisini seç ve gerekçesini yaz.",
    warmup: {
      recap: [
        { point: "Multi-AZ aynı bölgedeki AZ arızasına karşı korur; bölgenin kendisi kaybolursa yetmez.", example: "RDS Multi-AZ" },
        { point: "Yedekleme ve çoğaltma aynı şey değildir: çoğaltma hatayı da kopyalar, yedek geçmiş bir noktayı korur.", example: "Yanlışlıkla silinen tablo" }
      ],
      concepts: [
        { term: "RPO", tr: "Kurtarma noktası hedefi", summary: "Felaket anında kaybedilebilecek en fazla veri miktarını, zaman olarak söyler. Yedekleme ya da çoğaltma sıklığını belirler.", example: "RPO 15 dakika: son 15 dakikalık veri kaybı kabul" },
        { term: "RTO", tr: "Kurtarma süresi hedefi", summary: "Felaketten sonra hizmetin yeniden ayağa kalkması için izin verilen en fazla süredir.", example: "RTO 2 saat: hizmet iki saat içinde geri gelmeli" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Bir bankanın yönetimi 'bölge tamamen kullanılamaz olursa ne yaparız?' diye soruyor. Cevap tek bir hizmette değil, bir stratejide: kayıp ve kesinti hedefleri, bunlara uyan mimari ve düzenli tatbikat. Strateji pahalıdır; hedefler gevşedikçe ucuzlar." },
      { t: "steps", h: "Dört kurtarma stratejisi (ucuzdan pahalıya)", items: [
        "Yedekle ve geri yükle (backup and restore): veriyi düzenli olarak (genellikle başka bölgeye) yedeklersin; felakette altyapıyı kodla yeniden kurar ve veriyi geri yüklersin. En ucuzu, en yavaşıdır; RTO ve RPO saatler mertebesindedir.",
        "Pilot ışığı (pilot light): çekirdek veri sürekli ikinci bölgeye çoğaltılır (ör. veritabanı), uygulama sunucuları kapalı ya da çok küçüktür. Felakette sunucular açılır ve ölçeklenir. RTO daha kısadır.",
        "Sıcak yedek (warm standby): ikinci bölgede tam işlevli ama küçültülmüş bir kopya sürekli çalışır. Felakette hızla büyütülür. RTO dakikalar düzeyine iner.",
        "Çok bölgeli etkin-etkin (multi-site active-active): iki bölge birden gerçek trafiği sunar. En pahalıdır; RTO ve RPO sıfıra yakındır, ama veri tutarlılığı ve karmaşıklık artar."
      ] },
      { t: "box", h: "Strateji seçimi", text: "Hedefler gevşekse (saatlerce kapalı kalınabilir) yedekle ve geri yükle yeter. RTO dakikalar ve RPO saniyelerse sıcak yedek ya da etkin-etkin gerekir. Maliyet, hedefler sıkılaştıkça artar; bu yüzden hedef önce iş birimiyle konuşularak belirlenir." },
      { t: "steps", h: "Kurtarma yapı taşları", items: [
        "AWS Backup: EC2, EBS, RDS, DynamoDB, EFS, FSx ve diğer hizmetler için yedekleme politikalarını merkezden yönetir. Zamanlama, saklama süresi, başka bölge ve başka hesaba kopya, ve yedeği silinmeye karşı kilitleyen Vault Lock burada yapılır.",
        "Veritabanı: RDS için başka bölgede okuma kopyası ya da anlık görüntü kopyası; Aurora Global Database ile bölgeler arası düşük gecikmeli çoğaltma; DynamoDB global tabloları ile çok bölgeli yazılabilir tablo.",
        "Depolama: S3 bölgeler arası çoğaltma (CRR); EBS anlık görüntülerinin başka bölgeye kopyası.",
        "Sunucu: AWS Elastic Disaster Recovery, şirket içi ya da başka ortamdaki sunucuları sürekli blok düzeyinde AWS'ye çoğaltıp felakette hızla başlatmayı sağlar.",
        "Trafik yönlendirme: Route 53 sağlık denetimli failover ya da gecikme/ağırlıklı politikalar kullanıcıyı sağlıklı bölgeye yönlendirir.",
        "Altyapı: CloudFormation ya da CDK şablonları ikinci bölgede aynı ortamı tekrarlanabilir kurar."
      ] },
      { t: "steps", h: "Yüksek erişilebilirlik ve felaket kurtarma farkı", items: [
        "Yüksek erişilebilirlik (HA): tek bileşen arızasına dayanır, aynı bölgede birden çok AZ ile (Multi-AZ, Auto Scaling).",
        "Felaket kurtarma (DR): bir bölgenin ya da bütün bir sitenin kaybına dayanır; farklı bölgede kopya ve plan ister.",
        "Yedek tek başına DR değildir: yedeğin geri yüklenebildiğini düzenli sınamak gerekir. Test edilmemiş yedek varsayımdır."
      ] },
      { t: "warn", h: "Tuzak", text: "'Multi-AZ var, felaketten korunuyorum' demek. Multi-AZ aynı bölgedeki AZ arızasını kapsar; bölge kaybını kapsamaz. Bir de çoğaltmayı yedek sanmak: yanlış silme ya da bozulma çoğaltmayla anında kopyalanır; geçmiş bir noktaya dönmek için yedek ya da sürümleme gerekir." }
    ],
    objectives: [
      { id: "h1", text: "RPO ve RTO'yu tanımlayıp senaryodaki bir ihtiyaca uygulayabilirsin." },
      { id: "h2", text: "Dört felaket kurtarma stratejisini maliyet ve süre dengesine göre sıralayabilirsin." },
      { id: "h3", text: "AWS Backup, bölgeler arası çoğaltma ve Route 53 failover'ın kurtarmadaki rolünü eşleştirebilirsin." },
      { id: "h4", text: "Yüksek erişilebilirlik ile felaket kurtarma arasındaki farkı ve yedeğin neden sınanması gerektiğini açıklayabilirsin." }
    ],
    summary: [
      "RPO kabul edilen veri kaybı, RTO kabul edilen kesinti süresidir; ikisi sıkılaştıkça maliyet artar.",
      "Strateji sırası ucuzdan pahalıya: yedekle ve geri yükle, pilot ışığı, sıcak yedek, etkin-etkin.",
      "AWS Backup yedekleme politikalarını, başka bölge ve hesaba kopyayı ve Vault Lock'u merkezden yönetir.",
      "Bölgeler arası çoğaltma (S3 CRR, Aurora Global Database, DynamoDB global tabloları) ve Route 53 failover kurtarmanın yapı taşlarıdır.",
      "Multi-AZ bir HA çözümüdür; felaket kurtarma için farklı bölgede kopya gerekir ve yedek düzenli sınanmalıdır."
    ],
    quiz: [
      { id: "30b10e5c", q: "Bir şirket, felaket anında en fazla 15 dakikalık veri kaybını kabul edebiliyor. Bu hedef hangi ölçüttür?", options: [
  "RTO (kurtarma süresi hedefi)",
  "SLA (hizmet seviyesi sözleşmesi)",
  "RPO (kurtarma noktası hedefi)",
  "MTBF (arızalar arası ortalama süre)"
], obj: "h1" },
      { id: "f6078353", q: "Felaketten sonra hizmetin yeniden çalışır hale gelmesi için izin verilen en uzun süreye ne ad verilir?", options: [
  "RPO (kurtarma noktası hedefi)",
  "RTO (kurtarma süresi hedefi)",
  "TTL (yaşam süresi)",
  "IOPS (saniyedeki giriş/çıkış işlemi)"
], obj: "h1" },
      { id: "f494f620", q: "Hedefleri gevşek (saatlerce kapalı kalınabilir, birkaç saatlik veri kaybı kabul) ve maliyeti en düşük tutmak isteyen bir uygulama için hangi felaket kurtarma stratejisi uygundur?", options: ["Yedekle ve geri yükle", "Çok bölgeli etkin-etkin", "Sıcak yedek", "Pilot ışığı"], obj: "h2" },
      { id: "0b7ea5c9", q: "İkinci bölgede veritabanı sürekli çoğaltılıyor, ama uygulama sunucuları kapalı ve yalnızca felakette açılıp ölçekleniyor. Bu strateji hangisidir?", options: ["Yedekle ve geri yükle", "Sıcak yedek", "Etkin-etkin", "Pilot ışığı"], obj: "h2" },
      { id: "73a3ad49", q: "İkinci bölgede tam işlevli ama küçültülmüş bir uygulama kopyası sürekli çalışıyor ve felakette hızla büyütülüyor. Bu strateji hangisidir?", options: ["Pilot ışığı", "Yedekle ve geri yükle", "Yalnızca Multi-AZ", "Sıcak yedek"], obj: "h2" },
      { id: "6890e303", q: "Birden çok hizmetin (EBS, RDS, DynamoDB, EFS) yedeklemelerini tek politikayla yönetmek, başka bölge ve hesaba kopyalamak ve yedeği silinmeye karşı kilitlemek istiyorsun. Hangi hizmet kullanılır?", options: ["AWS Backup", "Amazon CloudWatch", "AWS Config", "AWS Systems Manager Session Manager"], obj: "h3" },
      { id: "bbbec656", q: "Bir RDS örneği Multi-AZ olarak çalışıyor. Bu yapılandırma hangi arızaya karşı koruma sağlar?", options: [
  "Bütün bir bölgenin kaybına",
  "Aynı bölgedeki bir AZ'nin ya da birincil örneğin arızasına",
  "Yanlışlıkla silinen verinin geri getirilmesine",
  "Uygulama kodundaki bir hataya"
], obj: "h4" },
      { id: "c30761b2", q: "Bir şirket, yedeklerinin geri yüklenebildiğinden emin olmak istiyor. En doğru yaklaşım hangisidir?", options: [
  "Yedek işinin 'başarılı' durumunu yeterli saymak",
  "Yedekleri sıkıştırarak boyutunu küçültmek",
  "Geri yükleme senaryosunu belirli aralıklarla gerçekten deneyip süresini ölçmek",
  "Yalnızca yedeklerin sayısını artırmak"
], obj: "h4" }
    ],
    interview: [
      { q: "RPO ve RTO arasındaki fark nedir?", a: "RPO ne kadar veri kaybına katlanılabileceğini (zaman olarak), RTO hizmetin ne kadar sürede geri gelmesi gerektiğini söyler. İkisi de iş birimiyle belirlenir ve strateji seçimini yönlendirir." },
      { q: "Pilot ışığı ile sıcak yedek arasındaki fark nedir?", a: "Pilot ışığında yalnızca çekirdek (genelde veri) sürekli çalışır, uygulama sunucuları felakette açılır. Sıcak yedekte ikinci bölgede küçültülmüş ama çalışan tam bir kopya vardır, bu yüzden daha hızlı ama daha pahalıdır." },
      { q: "Multi-AZ felaket kurtarma sayılır mı?", a: "Hayır. Multi-AZ bir bölge içindeki AZ arızasına dayanıklılık sağlar. Bölge kaybı için farklı bölgede kopya, yedek ya da çoğaltma gerekir." }
    ],
    vocab: [
      { term: "Recovery", tr: "kurtarma", ex: "The recovery took one hour." },
      { term: "Failover", tr: "yedeğe geçiş", ex: "Route 53 can fail over to another Region." },
      { term: "Standby", tr: "hazırda bekleyen kopya", ex: "Keep a warm standby in a second Region." },
      { term: "Backup vault", tr: "yedek kasası", ex: "Lock the backup vault." },
      { term: "Drill", tr: "tatbikat", ex: "Run a disaster recovery drill." }
    ],
    resources: [
      { title: "AWS: İş yükleri için felaket kurtarma (teknik makale)", url: "https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html", type: "doc", why: "Dört stratejinin resmî anlatımı", level: "orta", lang: "EN" },
      { title: "AWS Backup Geliştirici Kılavuzu", url: "https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html", type: "doc", why: "Merkezi yedekleme politikaları", level: "orta", lang: "EN" }
    ],
    sources: [SAA]
  };

  /* 45 ─────────────────────────────── Maliyet optimizasyonu ve Well-Architected */
  L[45] = {
    hook: "Bulutta fatura, mimari kararların aynasıdır: neyi, ne kadar süre, hangi taahhütle ve nerede çalıştırdığın doğrudan faturaya yansır.",
    homework: "Bir hafta boyunca çalışan bir test ortamı düşün: sürekli açık duran iki sunucu, gece boşta kalan bir veritabanı ve her gün yüklenen büyük günlük dosyaları. Her kalem için maliyeti düşürecek bir değişiklik öner ve bunun hangi riski getirdiğini yaz.",
    warmup: {
      recap: [
        { point: "EC2'de On-Demand esnektir; Reserved/Savings Plans taahhütle indirimlidir; Spot kesilebilirdir.", example: "Üç fiyatlandırma modeli" },
        { point: "S3 depolama sınıfları ve yaşam döngüsü kuralları veriyi ucuz sınıfa taşır.", example: "Standard → Glacier" }
      ],
      concepts: [
        { term: "AWS Well-Architected Framework", tr: "İyi tasarlanmış mimari çerçevesi", summary: "Bir mimariyi altı direk üzerinden gözden geçirmeyi sağlayan en iyi uygulamalar derlemesidir: operasyonel mükemmellik, güvenlik, güvenilirlik, performans verimliliği, maliyet optimizasyonu ve sürdürülebilirlik.", example: "Altı direk" },
        { term: "Savings Plans", tr: "Tasarruf planları", summary: "Belirli bir saatlik harcama düzeyini 1 ya da 3 yıl taahhüt edersin, karşılığında On-Demand fiyatına göre indirim alırsın.", example: "Compute Savings Plans" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Ay sonu faturası beklenenin iki katı geldi ve kimse nedenini bilmiyor. Maliyet sorunu çoğunlukla bir hizmetin yanlış seçilmesi değil, görünürlük eksikliğidir: kim ne harcadı, hangi kaynak boşta, hangi taahhüt kullanılmıyor? Mimar hem tasarım kararını hem de izleme araçlarını bilmelidir." },
      { t: "steps", h: "Well-Architected altı direk", items: [
        "Operasyonel mükemmellik: işletmeyi izlemek, otomatikleştirmek ve sürekli iyileştirmek.",
        "Güvenlik: kimlik, veri koruma, tespit ve olay müdahalesi.",
        "Güvenilirlik: arızadan toparlanma, ölçekleme ve değişimi yönetme.",
        "Performans verimliliği: doğru kaynak türü ve boyutunu seçip ihtiyaç değiştikçe uyarlamak.",
        "Maliyet optimizasyonu: değer sağlamayan harcamayı önlemek.",
        "Sürdürülebilirlik: iş yükünün çevresel etkisini azaltmak (verimli kullanım, gereksiz kaynağı kapatma)."
      ] },
      { t: "steps", h: "Maliyeti görmek ve yönetmek", items: [
        "Cost Explorer: geçmiş harcamaları hizmet, hesap, etiket gibi boyutlara göre görselleştirir ve ileriye dönük tahmin gösterir.",
        "AWS Budgets: harcama ya da kullanım için bütçe tanımlar; eşik aşılınca (gerçekleşen ya da tahmini) uyarı gönderir, istenirse eylem tetikler.",
        "Maliyet ayırma etiketleri (cost allocation tags): kaynaklara takım ya da proje gibi etiketler koyarsın; faturalama tarafında etkinleştirildikten sonra harcamalar bu etikete göre ayrılır.",
        "Cost and Usage Report: ayrıntılı kullanım ve maliyet verisini S3'e teslim eder; Athena gibi araçlarla analiz edilir.",
        "Compute Optimizer: kaynak kullanımına bakıp EC2, EBS, Lambda gibi kaynaklar için boyut küçültme ya da değiştirme önerir.",
        "Trusted Advisor: maliyet, güvenlik, hata toleransı gibi başlıklarda kontroller ve öneriler sunar; hangi kontrollerin açık olduğu destek planına göre değişir (resmî belgeyi oku).",
        "AWS Pricing Calculator: kurmadan önce bir mimarinin maliyetini tahmin etmek içindir.",
        "Organizations birleşik faturalama: tüm hesaplar tek faturada toplanır ve toplam kullanım hacimli indirimlere birlikte sayılır."
      ] },
      { t: "steps", h: "Hesaplama maliyetini düşürmek", items: [
        "Doğru boyutlandırma (rightsizing): düşük kullanılan büyük örnekleri küçültmek.",
        "Savings Plans ve Reserved Instances: sabit, öngörülebilir taban yük için 1-3 yıllık taahhütle indirim. Compute Savings Plans örnek ailesi, bölge ve hizmet (EC2, Fargate, Lambda) değişse de uygulanır; EC2 Instance Savings Plans ve Reserved Instances daha belirli bir aileye bağlıdır.",
        "Spot: kesilebilir, hataya dayanıklı ve esnek iş yükleri için (toplu işleme, test, durumsuz web katmanı). On-Demand'a göre büyük indirim sağlar ama AWS kapasiteyi geri alabilir.",
        "Sunucusuz ve yönetilen hizmetler: kullandığın kadar öde; boş duran kaynak masrafı azalır.",
        "Zamanlama: geliştirme ortamlarını mesai dışında kapatmak.",
        "Graviton gibi ARM tabanlı işlemciler çoğu iş yükünde daha iyi fiyat/performans verebilir; uygulama uyumunu önce test et."
      ] },
      { t: "steps", h: "Depolama ve ağ maliyeti", items: [
        "S3 yaşam döngüsü ve Intelligent-Tiering: seyrek erişilen veriyi ucuz sınıfa kendiliğinden taşır.",
        "Kullanılmayan EBS birimlerini, eski anlık görüntüleri ve boşta Elastic IP'leri temizle.",
        "Veri aktarımı: veriyi AWS'ye almak genellikle ücretsizdir; internete çıkış, bölgeler arası ve AZ'ler arası aktarım ücretlidir (güncel kurallar için resmî belgeyi oku).",
        "S3 ve DynamoDB trafiğini NAT yerine gateway endpoint ile taşımak NAT veri işleme masrafını önler.",
        "CloudFront içeriği kullanıcıya yakın sunar; kaynaktan çıkış trafiğini azaltabilir."
      ] },
      { t: "box", h: "Hangi araç, hangi soru?", text: "'Geçen ay ne harcadım, gelecek ay ne olacak?' Cost Explorer. 'Eşik aşılırsa haber ver.' Budgets. 'Hangi takım ne harcadı?' Maliyet ayırma etiketleri. 'Bu sunucu gereğinden büyük mü?' Compute Optimizer. 'Sabit yükte indirim nasıl alırım?' Savings Plans. 'Kesilebilir iş nasıl ucuzlar?' Spot." },
      { t: "warn", h: "Tuzak", text: "Taahhüdü tahmine göre fazla almak: kullanmadığın taahhüt de faturalanır. Önce kullanımı izleyip taban yükü bul, sonra taahhüt et. Spot'u kesintiye dayanıksız bir iş yüküne koymak da yanlıştır. Fiyat ve indirim oranları için resmî belgeden doğrula." }
    ],
    objectives: [
      { id: "h1", text: "Well-Architected çerçevesinin altı direğini sayabilir ve maliyet direğinin odağını açıklayabilirsin." },
      { id: "h2", text: "Cost Explorer, Budgets, etiketler ve Compute Optimizer'ın hangi soruyu cevapladığını eşleştirebilirsin." },
      { id: "h3", text: "On-Demand, Savings Plans/Reserved ve Spot arasından iş yükünün özelliğine uygun olanı seçebilirsin." },
      { id: "h4", text: "Depolama, veri aktarımı ve çok hesaplı yapıdaki maliyet kaldıraçlarını (yaşam döngüsü, endpoint, birleşik faturalama) açıklayabilirsin." }
    ],
    summary: [
      "Well-Architected çerçevesinin altı direği: operasyonel mükemmellik, güvenlik, güvenilirlik, performans verimliliği, maliyet optimizasyonu ve sürdürülebilirlik.",
      "Cost Explorer harcamayı gösterir ve tahmin eder; Budgets eşik aşılınca uyarır; etiketler harcamayı takım ve projeye ayırır; Compute Optimizer boyut önerir.",
      "Sabit taban yük için Savings Plans ya da Reserved, kesilebilir esnek iş için Spot, öngörülemez yük için On-Demand ya da sunucusuz seçilir.",
      "Depolamada yaşam döngüsü ve Intelligent-Tiering, ağda gateway endpoint ve CloudFront maliyeti düşürür.",
      "Organizations birleşik faturalama tüm hesapların kullanımını toplayarak hacimli indirimlerden birlikte yararlanmayı sağlar."
    ],
    quiz: [
      { id: "8dec2367", q: "Aşağıdakilerden hangisi AWS Well-Architected Framework'ün altı direğinden biri DEĞİLDİR?", options: ["Güvenilirlik", "Taşınabilirlik", "Performans verimliliği", "Sürdürülebilirlik"], obj: "h1" },
      { id: "e2aec4d5", q: "Geçen aylardaki harcamayı hizmete göre görselleştirmek ve önümüzdeki aylar için tahmin görmek istiyorsun. Hangi araç kullanılır?", options: ["AWS Cost Explorer", "AWS Config", "Amazon Inspector", "AWS CloudTrail"], obj: "h2" },
      { id: "144e2793", q: "Aylık harcama tahmini bir eşiği aşacak gibi olduğunda e-posta ile uyarılmak istiyorsun. Hangi hizmet uygundur?", options: ["AWS Trusted Advisor'ın güvenlik kontrolleri", "Amazon Macie", "AWS Shield Standard", "AWS Budgets"], obj: "h2" },
      { id: "69a40a5f", q: "Birden çok takım aynı hesabı kullanıyor ve harcamayı takım bazında ayırmak istiyorsun. Ne yapmalısın?", options: [
  "Her takımın EC2 örnek adını değiştirmek",
  "Yalnızca CloudTrail günlüklerini incelemek",
  "Kaynaklara takım etiketi koyup bunu maliyet ayırma etiketi olarak etkinleştirmek",
  "Her takıma ayrı bir VPC açmak"
], obj: "h2" },
      { id: "f17c68aa", q: "Çalışan bir EC2 filosunun çoğu örneği düşük CPU ve bellek kullanıyor. Boyut küçültme önerisi almak için hangi hizmet kullanılır?", options: ["AWS Budgets", "AWS Organizations", "AWS Compute Optimizer", "Amazon Route 53"], obj: "h2" },
      { id: "06333fc1", q: "Yıl boyunca sürekli çalışan, öngörülebilir taban yük için indirim almak ve zaman içinde örnek ailesini ya da hizmetini (EC2, Fargate, Lambda) değiştirebilmek istiyorsun. Hangi seçenek uygundur?", options: ["Spot örnekleri", "Yalnızca On-Demand", "Yalnızca S3 Intelligent-Tiering", "Compute Savings Plans"], obj: "h3" },
      { id: "403969fa", q: "Kesintiye dayanıklı, durumsuz ve esnek zamanlı bir toplu işleme işini en düşük maliyetle çalıştırmak istiyorsun. Hangi seçenek uygundur?", options: ["Spot örnekleri", "Reserved örnekleri, üç yıl taahhütle", "Dedicated Host", "Yalnızca On-Demand"], obj: "h3" },
      { id: "f9702b12", q: "Organizasyondaki on hesabın toplam kullanımının hacimli fiyat indirimlerine birlikte sayılmasını istiyorsun. Hangi özellik bunu sağlar?", options: [
  "Her hesapta ayrı bütçe oluşturmak",
  "Organizations birleşik faturalama",
  "Her hesapta Compute Optimizer açmak",
  "Hesapları farklı bölgelere dağıtmak"
], obj: "h4" }
    ],
    interview: [
      { q: "Maliyet optimizasyonuna nereden başlarsın?", a: "Önce görünürlük: Cost Explorer ve etiketlerle kimin neyi harcadığını görürüm. Sonra boşta ve gereğinden büyük kaynakları (Compute Optimizer) küçültür, taban yük için Savings Plans, kesilebilir işler için Spot, zamanlama ve yaşam döngüsü kurallarıyla devam ederim." },
      { q: "Savings Plans ile Reserved Instances arasında fark nedir?", a: "İkisi de taahhütle indirim verir. Savings Plans saatlik harcama taahhüdüdür ve Compute türünde aile, bölge ve hizmet değişse de uygulanır. Reserved Instances belirli bir örnek özelliğine bağlıdır ve daha az esnektir." },
      { q: "Spot ne zaman kullanılmaz?", a: "Kesintiye dayanıksız, durum tutan ve süresi belirsiz kritik iş yüklerinde kullanılmaz. AWS kapasiteyi geri aldığında örnek sonlandırılabilir." }
    ],
    vocab: [
      { term: "Rightsizing", tr: "doğru boyutlandırma", ex: "Rightsizing reduces cost." },
      { term: "Commitment", tr: "taahhüt", ex: "A one-year commitment gives a discount." },
      { term: "Budget", tr: "bütçe", ex: "Set a budget alert." },
      { term: "Tag", tr: "etiket", ex: "Tag each resource with a team name." },
      { term: "Interruption", tr: "kesinti", ex: "Spot instances can be interrupted." }
    ],
    resources: [
      { title: "AWS Well-Architected Framework", url: "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html", type: "doc", why: "Altı direk ve en iyi uygulamalar", level: "orta", lang: "EN" },
      { title: "AWS Cost Explorer nedir", url: "https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html", type: "doc", why: "Harcama analizi ve tahmin", level: "başlangıç", lang: "EN" }
    ],
    sources: [SAA]
  };

  /* 46 ─────────────────────────────── Analitik ve veri gölü */
  L[46] = {
    hook: "Veri sistemlere dağılmış durumda: günlükler S3'te, satışlar veritabanında, tıklamalar akışta. Hepsine tek yerden soru sormak için bir veri gölü kurulur.",
    homework: "Bir mağazanın haftalık satış dosyalarının (CSV), uygulama günlüklerinin ve anlık tıklama akışının tek bir analiz ortamında nasıl buluşacağını çiz. Veri nerede durur, kim dönüştürür, hangi araçla sorgulanır ve yöneticinin panosu nereden beslenir?",
    warmup: {
      recap: [
        { point: "S3 dayanıklı ve ucuz nesne depolamadır; her türlü dosyayı tutar.", example: "CSV, JSON, Parquet" },
        { point: "Kinesis Data Firehose akan veriyi S3'e teslim edebilir.", example: "Tıklama akışı → S3" }
      ],
      concepts: [
        { term: "Data lake", tr: "Veri gölü", summary: "Ham ve işlenmiş veriyi, çoğunlukla S3'te, olduğu biçimde saklayan ve birçok araçla sorgulanabilen merkezi depodur.", example: "S3 üzerinde CSV ve Parquet" },
        { term: "Amazon Athena", tr: "Sunucusuz SQL sorgu hizmeti", summary: "S3'teki veriyi standart SQL ile doğrudan sorgular; sunucu yönetimi yoktur ve taranan veri miktarı üzerinden ücretlenir.", example: "SELECT * FROM satislar WHERE gun = '2026-10-01'" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Pazarlama ekibi 'geçen çeyrekte hangi kampanya hangi şehirde satışı artırdı?' diye soruyor. Veri S3'teki dosyalarda, veritabanı dışa aktarımlarında ve günlüklerde. Soruyu bir sunucu kurmadan, SQL ile ve veriyi taşımadan cevaplamak istiyorsun. Ayrıca yöneticiler için pano ve veri erişimini şirket genelinde yönetecek bir yetki katmanı gerekiyor." },
      { t: "steps", h: "Akış: toplama, depolama, dönüştürme, sorgulama, görselleştirme", items: [
        "Toplama: akışlı veri için Kinesis Data Streams ve Firehose (35. ders); veritabanlarından DMS ile sürekli kopya; dosyalar için doğrudan S3 yüklemesi.",
        "Depolama: S3 veri gölü temelidir. Ham, temizlenmiş ve sunuma hazır veri ayrı önek ya da kovalarda tutulur.",
        "Dönüştürme ve katalog: AWS Glue sunucusuz ETL (çıkar-dönüştür-yükle) işleri çalıştırır; Glue Veri Kataloğu tabloların şemasını saklar; tarayıcılar (crawler) şemayı otomatik çıkarır.",
        "Sorgulama: Athena S3'teki veriyi SQL ile sorgular; Redshift karmaşık analitik için veri ambarıdır; EMR büyük ölçekli Spark/Hadoop işleri içindir; OpenSearch arama ve günlük analizi içindir.",
        "Görselleştirme: Amazon QuickSight iş zekâsı panoları sunar.",
        "Yetkilendirme: AWS Lake Formation veri gölü için merkezi yetki yönetimi sağlar."
      ] },
      { t: "steps", h: "Hangi hizmet, hangi iş?", items: [
        "Athena: ara sıra ve ad hoc SQL, sunucusuz. Maliyet taranan veriyle orantılı olduğu için Parquet gibi sütunlu biçim, sıkıştırma ve bölümleme (partition) hem hızı hem faturayı düşürür.",
        "Redshift: büyük ve yapılandırılmış veri üzerinde karmaşık birleştirme ve toplamaları çok sayıda kullanıcıyla hızlı çalıştırmak için sütunlu, paralel bir veri ambarı. Redshift Spectrum ambardan S3'teki veriyi de sorgulatır.",
        "EMR: yönetilen Hadoop/Spark kümeleri; özel veri işleme çerçevesi ya da büyük makine öğrenmesi ön işlemi gerektiğinde.",
        "OpenSearch: tam metin arama, günlük ve olay analizi, gösterge panelleri.",
        "Glue: ETL ve katalog; Athena ve Redshift Spectrum aynı kataloğu kullanabilir.",
        "QuickSight: son kullanıcı için pano ve rapor."
      ] },
      { t: "box", h: "Basit bir veri gölü kalıbı", text: "Uygulama günlükleri ve tıklamalar Firehose ile S3'e iner. Glue tarayıcısı şemayı bulup kataloğa yazar, bir Glue işi veriyi Parquet'e çevirir. Analist Athena ile sorgular, yönetici QuickSight panosuna bakar, Lake Formation kimin hangi tabloya ve sütuna eriştiğini yönetir." },
      { t: "steps", h: "Seçim ipuçları", items: [
        "Sunucu yönetmeden ara sıra SQL: Athena.",
        "Çok kullanıcılı, sürekli ve karmaşık analitik iş yükü: Redshift.",
        "Özel Spark işi ya da çok büyük dönüşüm: EMR (ya da Glue).",
        "Günlük araması ve tam metin: OpenSearch.",
        "Tablo ve sütun düzeyinde merkezi yetki: Lake Formation.",
        "Pano: QuickSight.",
        "Anlık (gerçek zamanlıya yakın) analiz: önce Kinesis ile akışı yakala, işlemeyi akış işleme hizmetiyle yap; ayrıntı için resmî belgeye bak."
      ] },
      { t: "warn", h: "Tuzak", text: "Athena'yı sıkıştırılmamış, bölümlenmemiş büyük CSV üzerinde çalıştırmak: her sorgu tüm veriyi tarar ve faturayı şişirir. Veriyi sütunlu biçime çevir ve bölümle. Bir de her analitik soruya Redshift kümesi açmak: ara sıra yapılan sorgu için Athena yeter. Fiyat ve özellikler için resmî belgeden doğrula." }
    ],
    objectives: [
      { id: "h1", text: "Veri gölü kavramını ve toplama, depolama, dönüştürme, sorgulama, görselleştirme akışını açıklayabilirsin." },
      { id: "h2", text: "Athena ile Redshift'in ne zaman seçileceğini ve Athena maliyetini düşüren yöntemleri açıklayabilirsin." },
      { id: "h3", text: "Glue, EMR ve OpenSearch'ün rollerini senaryoya göre ayırt edebilirsin." },
      { id: "h4", text: "QuickSight ve Lake Formation'ın pano ve yetkilendirme rolünü eşleştirebilirsin." }
    ],
    summary: [
      "Veri gölü genellikle S3 üzerinde ham ve işlenmiş veriyi tek yerde tutar; çok sayıda araç aynı veriyi sorgulayabilir.",
      "Athena sunucusuz ve taranan veriye göre ücretlidir; Parquet gibi sütunlu biçim, sıkıştırma ve bölümleme maliyeti düşürür.",
      "Redshift çok kullanıcılı karmaşık analitik için veri ambarıdır; Spectrum S3'teki veriyi de sorgular.",
      "Glue ETL ve veri kataloğu sağlar; EMR Spark/Hadoop işleri, OpenSearch tam metin ve günlük analizi içindir.",
      "QuickSight pano ve rapor sunar; Lake Formation veri gölünde tablo ve sütun düzeyinde merkezi yetki yönetir."
    ],
    quiz: [
      { id: "4c83bc32", q: "S3'teki CSV ve Parquet dosyalarını sunucu kurmadan, standart SQL ile ara sıra sorgulamak istiyorsun. Hangi hizmet uygundur?", options: ["Amazon ElastiCache", "Amazon OpenSearch Service", "AWS Backup", "Amazon Athena"], obj: "h2" },
      { id: "d3bf3f85", q: "Athena sorgu maliyetini ve süresini düşürmek için S3'teki büyük CSV veri setine ne yapılmalıdır?", options: [
  "Her sorguda tüm veriyi taramak",
  "Veriyi tek bir büyük sıkıştırılmamış dosyaya birleştirmek",
  "Sütunlu biçime (ör. Parquet) çevirmek, sıkıştırmak ve tarih gibi alanlara göre bölümlemek",
  "Veriyi Athena'dan önce ElastiCache'e kopyalamak"
], obj: "h2" },
      { id: "93618bd8", q: "Çok sayıda analist, petabayt ölçeğine varan yapılandırılmış veri üzerinde karmaşık birleştirme ve toplama sorgularını sürekli ve hızlı çalıştıracak. Hangi hizmet daha uygundur?", options: [
  "Amazon Athena tek başına, her sorguda yeniden tarayarak",
  "Amazon Redshift",
  "Amazon SQS",
  "AWS Secrets Manager"
], obj: "h2" },
      { id: "fa92627e", q: "Veri gölündeki tabloların şemasını otomatik keşfetmek, katalog tutmak ve CSV'yi Parquet'e dönüştüren sunucusuz bir ETL işi çalıştırmak istiyorsun. Hangi hizmet kullanılır?", options: ["AWS Glue", "Amazon QuickSight", "AWS WAF", "Amazon Route 53"], obj: "h1" },
      { id: "2109e4f5", q: "Ekip, mevcut özel Spark kodunu yönetilen bir kümede çalıştırarak çok büyük bir veri kümesini işlemek istiyor. Hangi hizmet doğrudan uygundur?", options: ["Amazon EMR", "Amazon Athena", "Amazon QuickSight", "AWS Shield"], obj: "h3" },
      { id: "ba5f2c01", q: "Uygulama günlüklerinde tam metin arama yapmak ve gösterge panelleriyle olay analizi görmek istiyorsun. Hangi hizmet uygundur?", options: ["Amazon Redshift", "Amazon OpenSearch Service", "AWS Lake Formation", "Amazon Cognito"], obj: "h3" },
      { id: "cb06310c", q: "Yöneticilerin iş verisini etkileşimli panolarla ve raporlarla görmesi isteniyor. Hangi hizmet bu iş içindir?", options: ["AWS Glue Data Catalog", "AWS Backup", "Amazon QuickSight", "Amazon SNS"], obj: "h4" },
      { id: "6fbdf79e", q: "Veri gölünde farklı ekiplerin hangi tablo ve sütunlara erişebileceğini merkezi olarak yönetmek istiyorsun. Hangi hizmet bu işe uygundur?", options: ["AWS Shield Advanced", "Amazon EBS", "Amazon CloudFront", "AWS Lake Formation"], obj: "h4" }
    ],
    interview: [
      { q: "Athena ile Redshift arasında nasıl seçersin?", a: "Ara sıra, ad hoc ve sunucu yönetmek istemediğim sorgular için Athena. Çok kullanıcılı, sürekli ve karmaşık analitik iş yüklerinde, performans öngörülebilirliği isterken Redshift veri ambarı." },
      { q: "Athena maliyeti nasıl düşürülür?", a: "Taranan veri miktarı azaltılır: sütunlu biçim (Parquet), sıkıştırma, bölümleme ve yalnız gereken sütunları seçmek." },
      { q: "Veri gölü ile veri ambarı arasındaki fark nedir?", a: "Veri gölü ham ve yapılandırılmamış veriyi de olduğu gibi tutar, şema okuma anında uygulanır. Veri ambarı yapılandırılmış ve temizlenmiş veriyi, önceden tanımlı şemayla, hızlı analitik sorgu için saklar." }
    ],
    vocab: [
      { term: "Data lake", tr: "veri gölü", ex: "Store raw data in a data lake." },
      { term: "ETL", tr: "çıkar-dönüştür-yükle", ex: "Run an ETL job." },
      { term: "Partition", tr: "bölüm", ex: "Partition the table by date." },
      { term: "Columnar", tr: "sütunlu (biçim)", ex: "Parquet is a columnar format." },
      { term: "Dashboard", tr: "pano", ex: "Build a dashboard for managers." }
    ],
    resources: [
      { title: "Amazon Athena Kullanıcı Kılavuzu", url: "https://docs.aws.amazon.com/athena/latest/ug/what-is.html", type: "doc", why: "Sunucusuz SQL sorgusu", level: "orta", lang: "EN" },
      { title: "AWS Glue Geliştirici Kılavuzu", url: "https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html", type: "doc", why: "ETL ve veri kataloğu", level: "orta", lang: "EN" }
    ],
    sources: [SAA]
  };
})();

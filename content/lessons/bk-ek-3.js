/* Backend yolu · Tur 3: konu başına ders eki, üçüncü parça (anahtar = TMAP.bk dizini, 38–45; ders no = anahtar + 1). SAA-C03 kapsam genişletmesi.
   Alanlar: benzetme + sınırı, rehberli alıştırma, bağımsız görev, yaygın hatalar, geçme ölçütü + kritik yanlış anlama, dış kaynak (son doğrulama tarihiyle), telafi/sonraki adım.
   Alıştırmalar kâğıt üzerindedir; AWS konsolunda kaynak açmak, ücretli ya da canlı hesabı değiştiren işlem istemez.
   Dış kaynak: yalnız HTTP 200 dönenler (curl, 2026-10-19). */
(function () {
  var E = ((window.PP_EK = window.PP_EK || {}).bk = (window.PP_EK.bk || {}));
  var DOG = "2026-10-12";
  var A = function (yol, t, neden) { return { t: t, u: "https://docs.aws.amazon.com/" + yol, dogrulama: DOG, neden: neden }; };

  E[38] = {
    analoji: { a: "Havalimanı güvenlik hattı: biletin olsa bile ülke yasakları (SCP) ve pasaport kontrolü (izin sınırı) geçişi daraltır; hiçbiri sana bilet vermez, biletin ayrıca olmalıdır.", sinir: "Havalimanında kontroller sırayla ve tek yönlü işler; IAM'de açık Deny nerede olursa olsun hepsini geçersiz kılar ve katmanlar kesişim kurar." },
    rehberli: ["Üç satırlık bir tablo yap: kimlik politikası, SCP, izin sınırı. Her satıra 'izin verir mi, yoksa yalnız daraltır mı' yaz.", "Bir kullanıcıya S3 okuma izni verildiğini, SCP'nin ise S3 eylemlerini reddettiğini düşün; sonucu ve nedenini bir cümleyle yaz.", "Hesap A'daki bir rolün hesap B'deki kovayı okuması için iki tarafta hangi izinlerin gerektiğini iki madde olarak yaz."],
    bagimsiz: "Üç hesaplı kurgusal bir organizasyon çiz (yönetim, geliştirme, üretim). Üretim hesabında hangi eylemi SCP ile reddedeceğini ve iş yükünü neden yönetim hesabına koymayacağını kâğıda yaz. Gerçek hesapta politika değiştirme.",
    hatalar: [["SCP'nin izin verdiğini sanmak", "SCP yalnız tavandır; kimlik ya da kaynak politikasında ayrıca Allow gerekir."], ["İş yükünü yönetim hesabında çalıştırmak", "SCP yönetim hesabına uygulanmaz; iş yüklerini üye hesaplarda çalıştır."], ["Hesaplar arası erişimde yalnız bir tarafı yapılandırmak", "Çağıran tarafta kimlik politikası, kaynak tarafta kaynak politikası (ya da rol üstlenme) gerekir."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen bir isteğin açık ret, SCP, izin sınırı ve Allow katmanlarından geçip geçmediğini açıklayabilmek.", kritik: [
    "SCP ya da izin sınırının yetki verdiğini sanmak",
    "Açık Deny'ın bir Allow ile aşılabileceğini sanmak"
  ] },
    kaynaklar: [
      A("IAM/latest/UserGuide/reference_policies_evaluation-logic.html", "AWS Belgesi: Politika değerlendirme mantığı", "Katmanların nasıl birleştiğinin resmî anlatımı."),
      A("organizations/latest/userguide/orgs_manage_policies_scps.html", "AWS Belgesi: Hizmet kontrol politikaları", "SCP'nin tavan mantığını ve etkisini anlatır.")
    ],
    telafi: "Takıldıysan önce şunu sor: açık bir Deny var mı? Yoksa hangi katman izni daraltıyor ve en sonda kimin Allow'u var?",
    sonraki: "Sıradaki konu: Tespit ve koruma hizmetleri."
  };

  E[39] = {
    analoji: { a: "Müze güvenliği: kapıdaki görevli (WAF) bavul açtırır, kamera kayıtlarını izleyen görevli (GuardDuty) şüpheli davranışı fark eder, depo sayımı yapan (Inspector, Macie) kilitleri ve değerli eşyayı kontrol eder.", sinir: "Müzede bir görevli alarm verirse hemen müdahale eder; bu hizmetlerin çoğu yalnızca bulgu üretir ve müdahaleyi senin kurman gerekir." },
    rehberli: ["Beş hizmeti (WAF, Shield, GuardDuty, Inspector, Macie) iki sütunda grupla: 'engeller' ve 'bulgu üretir'.", "Bir giriş sayfasına dakikada çok istek atan botu hangi hizmetin ve hangi kuralın durduracağını bir cümleyle yaz.", "GuardDuty bulgusundan EventBridge ile bir bildirime giden akışı üç kutuyla çiz."],
    bagimsiz: "Kurgusal bir e-ticaret sitesinin önüne katmanlı savunma çiz: kenar, ağ, veri, sürekli tespit. Her katmana bir hizmet adı yaz ve her birinin neyi engelleyip neyi yalnız bildirdiğini işaretle. Gerçek hesapta hizmet açma.",
    hatalar: [["Tespit hizmetlerini koruma sanmak", "GuardDuty, Inspector ve Macie bulgu üretir; engelleme için WAF ya da başka kontrol gerekir."], ["WAF'ı güvenlik grubunun yerine koymak", "Güvenlik grubu ağ katmanını, WAF HTTP içeriğini süzer; birbirinin yerini tutmaz."], ["Config ile CloudTrail'i karıştırmak", "CloudTrail kim ne yaptığını, Config kaynağın yapılandırmasını ve uyumunu kaydeder."]],
    gecme: { olcut: "Mini sınavda %80 ve bir tehdit tarifini doğru güvenlik hizmetiyle eşleştirebilmek.", kritik: [
    "Tespit hizmetinin trafiği kendiliğinden engellediğini sanmak",
    "Shield ile WAF'ı aynı iş için sanmak"
  ] },
    kaynaklar: [
      A("waf/latest/developerguide/waf-chapter.html", "AWS Belgesi: AWS WAF Geliştirici Kılavuzu", "Web ACL ve kural gruplarının resmî anlatımı."),
      A("guardduty/latest/ug/what-is-guardduty.html", "AWS Belgesi: Amazon GuardDuty nedir", "Tehdit tespiti ve bulgu kavramlarının resmî tanımı.")
    ],
    telafi: "Takıldıysan her hizmet için tek soru sor: bu hizmet neye bakıyor (HTTP isteği, hesap kayıtları, yazılım, S3 verisi, yapılandırma) ve engelliyor mu, yalnız bildiriyor mu?",
    sonraki: "Sıradaki konu: VPC ağ tasarımı: NAT, endpoint ve Transit Gateway."
  };

  E[40] = {
    analoji: { a: "Site yönetimi: giden kapı (NAT) yalnız dışarı çıkış izni verir, ortak servis kapısı (endpoint) sizi yol dışına çıkarmadan depoya götürür, bloklar arası köprü (peering) iki blok arasındadır; merkez meydan (Transit Gateway) bütün blokları bağlar.", sinir: "Sitede kapılar ve köprüler fiziksel olarak sabittir; bulutta aynı bileşenler yazılımla anında eklenir, her birinin saatlik ya da veri işleme masrafı vardır." },
    rehberli: ["İki AZ'li bir VPC çiz ve her AZ'ye bir NAT Gateway koy; bir AZ düşerse yolu işaretle.", "S3'e giden trafik için NAT'ı kullanmanın neden masraf getirdiğini, gateway endpoint'in neyi değiştirdiğini iki cümleyle yaz.", "A-B ve B-C peering yapıldığında A'nın C'ye ulaşıp ulaşamadığını çizimle göster ve iki çözüm yolu yaz."],
    bagimsiz: "Üç VPC ve bir şirket ağı içeren kurgusal bir yapı çiz. Hangi bağlantıyı peering, hangisini Transit Gateway, hangisini PrivateLink ile kuracağını gerekçeleriyle yaz. Gerçek VPC açma.",
    hatalar: [["Tüm özel alt ağları tek NAT'a bağlamak", "AZ başına bir NAT kur ve her alt ağı kendi AZ'sindeki NAT'a yönlendir."], ["S3 trafiğini NAT üzerinden geçirmek", "Gateway endpoint kullan; trafik internete çıkmaz ve NAT masrafı doğmaz."], ["Peering'in geçişli olduğunu sanmak", "A-B ve B-C eşleşmesi A-C yolunu açmaz; Transit Gateway ya da ayrı peering gerekir."]],
    gecme: { olcut: "Mini sınavda %80 ve bir bağlantı ihtiyacına NAT, endpoint, peering, Transit Gateway ya da PrivateLink'ten doğru olanı seçebilmek.", kritik: [
    "Peering'in geçişli olduğunu sanmak",
    "NAT Gateway'in birden çok AZ'yi kendiliğinden kapsadığını sanmak"
  ] },
    kaynaklar: [
      A("vpc/latest/userguide/vpc-nat-gateway.html", "AWS Belgesi: NAT gateway", "NAT Gateway'in çalışması ve yerleşimi."),
      A("vpc/latest/privatelink/what-is-privatelink.html", "AWS Belgesi: AWS PrivateLink nedir", "Endpoint ve servis paylaşımının resmî tanımı.")
    ],
    telafi: "Takıldıysan önce şunu sor: hedef internet mi, bir AWS servisi mi, başka bir VPC mi, yoksa şirket ağı mı? Cevap hangi bileşenin gerektiğini söyler.",
    sonraki: "Sıradaki konu: Hibrit bağlantı ve veri aktarımı."
  };

  E[41] = {
    analoji: { a: "İki şehir arası ulaşım: VPN halk otobüsü gibi hemen kalkar ama yolun trafiğine bağlıdır; Direct Connect kendi özel yolundur, hızlı ve düzenlidir ama yapımı zaman alır. Snow cihazı ise kamyonla toplu yük taşımaktır.", sinir: "Otobüs ve kamyon aynı anda kullanılabilir; bulutta da bunlar birbirini tamamlar ve her yolun ayrı bir masrafı vardır. Özel yol da tek başına şifreli değildir." },
    rehberli: ["Üç ihtiyacı (hızlı kurulum, tutarlı gecikme, çok büyük tek seferlik veri) üç araca eşleştir ve gerekçeni yaz.", "Direct Connect'in neden yedeğe ihtiyaç duyduğunu iki cümleyle yaz ve yedek aracı adlandır.", "DMS ile SCT'nin farkını bir cümleyle yaz."],
    bagimsiz: "Kurgusal bir şirket için hibrit yapıyı çiz: veri merkezi, AWS bölgesi, hat ve veri taşıma aracı. Hangi bağlantıyı ana, hangisini yedek seçtiğini ve neden yazdığın aracın uygun olduğunu açıkla. Gerçek hat ya da cihaz sipariş etme.",
    hatalar: [["Direct Connect'in otomatik şifreli olduğunu sanmak", "Gizlilik için VPN ya da hat şifrelemesi ekle."], ["Büyük veriyi zayıf hattan ağ üzerinden taşımaya çalışmak", "Veri çok büyük ve hat yetersizse Snow cihazı daha pratiktir."], ["Tek Direct Connect hattına güvenmek", "Yedek VPN ve farklı konumda ikinci hat planla."]],
    gecme: { olcut: "Mini sınavda %80 ve bir ihtiyaca VPN, Direct Connect, DataSync, Snow, Storage Gateway, Transfer Family ya da DMS'ten doğru olanı seçebilmek.", kritik: [
    "Direct Connect'in varsayılan olarak şifreli olduğunu sanmak",
    "DataSync ile Snow cihazının aynı senaryoya uyduğunu sanmak"
  ] },
    kaynaklar: [
      A("directconnect/latest/UserGuide/Welcome.html", "AWS Belgesi: AWS Direct Connect", "Özel hat kavramlarının resmî anlatımı."),
      A("datasync/latest/userguide/what-is-datasync.html", "AWS Belgesi: AWS DataSync nedir", "Çevrimiçi veri taşıma hizmetinin resmî tanımı.")
    ],
    telafi: "Takıldıysan iki soru sor: veri mi taşınıyor yoksa ağ mı bağlanıyor? Veri taşınıyorsa ne kadar büyük, hat ne kadar yeterli?",
    sonraki: "Sıradaki konu: Depolama seçimi: EBS, EFS, FSx ve S3 ileri."
  };

  E[42] = {
    analoji: { a: "Ofis eşyaları: EBS tek bir bilgisayarın içindeki disk, EFS ortak ağ klasörü, FSx hazır ofis dosya sunucusu, S3 sınırsız depo odası, Glacier ise bodrumdaki arşiv dolabıdır.", sinir: "Ofiste dolaplar fiziksel yer tutar ve kapasite sınırlıdır; bulutta depolama kapasitesi esnektir, ama her türün performans ve fiyat dengesi farklıdır." },
    rehberli: ["Dört iş yükünü (veritabanı, ortak Linux klasörü, Windows paylaşımı, arşiv) dört depolamaya eşleştir.", "EBS'in neden tek AZ'de olduğunu ve başka AZ'ye taşınmak için gereken adımı iki cümleyle yaz.", "Object Lock'un hangi koşulda çalıştığını (sürümleme) ve uyumluluk modunun farkını bir paragrafla yaz."],
    bagimsiz: "Kurgusal bir şirketin beş verisini (veritabanı diski, ortak medya klasörü, muhasebe arşivi, eğitim verisi, geçici işlem dosyaları) uygun depolamaya eşle ve her seçimi tek cümleyle savun. Gerçek kaynak oluşturma.",
    hatalar: [["EBS'i birden çok AZ'de ortak disk sanmak", "EBS tek AZ'dedir; ortak paylaşım için EFS ya da FSx kullan."], ["Kalıcı veriyi instance store'a koymak", "Instance store geçicidir; kalıcı veri EBS ya da başka depoda durur."], ["Object Lock'u sürümlemesiz beklemek", "Object Lock ve çoğaltma sürümleme ister."]],
    gecme: { olcut: "Mini sınavda %80 ve bir iş yükünü EBS, instance store, EFS, FSx ya da S3 sınıflarından doğru olanıyla eşleştirebilmek.", kritik: ["EBS'in AZ'ler arası paylaşıldığını sanmak", "Instance store'un kalıcı olduğunu sanmak"] },
    kaynaklar: [
      A("ebs/latest/userguide/ebs-volume-types.html", "AWS Belgesi: Amazon EBS birim türleri", "SSD ve HDD birim ailelerinin resmî karşılaştırması."),
      A("AmazonS3/latest/userguide/object-lock.html", "AWS Belgesi: S3 Object Lock", "Değişmez saklama ve modlarının resmî anlatımı.")
    ],
    telafi: "Takıldıysan tek soru sor: veriye kim erişecek (tek sunucu mu, çok sunucu mu), ne sıklıkla ve ne kadar süre saklanacak?",
    sonraki: "Sıradaki konu: Felaket kurtarma ve AWS Backup."
  };

  E[43] = {
    analoji: { a: "Sigorta ve ikinci ev: yedekle-geri yükle, evin planını saklayıp yandığında yeniden yaptırmak; pilot ışığı, ikinci evin temelini ve tesisatını hazır tutmak; sıcak yedek, mobilyalı ama küçük ikinci bir ev; etkin-etkin, iki evde birden yaşamak.", sinir: "Gerçek evde ikinci ev yılda bir kullanılır; bulutta çalışan kopya her gün masraf yazar ve iki kopyanın verisini tutarlı tutmak ayrı bir zorluktur." },
    rehberli: ["Bir uygulama için kendi RPO ve RTO hedeflerini yaz ve hangi stratejinin uyduğunu seç.", "Dört stratejiyi maliyet ve kurtarma süresine göre iki eksende sırala.", "Multi-AZ ile felaket kurtarma farkını iki cümleyle yaz ve bir yedek geri yükleme sınamasının adımlarını üç madde olarak sırala."],
    bagimsiz: "Kurgusal bir sipariş sisteminde RPO'yu 5 dakika, RTO'yu 30 dakika kabul et ve bu hedefe uyan stratejiyi, kullandığın yapı taşlarını (çoğaltma, yedek, trafik yönlendirme) ve nasıl sınayacağını kâğıda yaz. Gerçek kaynak oluşturma.",
    hatalar: [["Multi-AZ'yi felaket kurtarma sanmak", "Multi-AZ aynı bölgede kalır; bölge kaybı için başka bölgede kopya gerekir."], ["Çoğaltmayı yedek sanmak", "Çoğaltma hatayı da kopyalar; geçmiş noktaya dönmek için yedek gerekir."], ["Yedeği hiç geri yüklemeyi denememek", "Düzenli geri yükleme tatbikatı yap ve süresini ölç."]],
    gecme: { olcut: "Mini sınavda %80 ve RPO ile RTO hedefine uyan stratejiyi seçip gerekçesini söyleyebilmek.", kritik: [
    "Multi-AZ'nin bölge kaybına karşı koruduğunu sanmak",
    "Çoğaltmanın yedek yerine geçtiğini sanmak"
  ] },
    kaynaklar: [
      A("whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html", "AWS Belgesi: Bulutta felaket kurtarma seçenekleri", "Dört stratejinin resmî tanımı ve karşılaştırması."),
      A("aws-backup/latest/devguide/whatisbackup.html", "AWS Belgesi: AWS Backup nedir", "Merkezi yedekleme politikalarının resmî anlatımı.")
    ],
    telafi: "Takıldıysan iki sayı yaz: ne kadar veri kaybına, ne kadar kesintiye katlanılır? Sonra dört stratejiyi ucuzdan pahalıya sırala ve hedefe uyan en ucuzunu seç.",
    sonraki: "Sıradaki konu: Maliyet optimizasyonu ve Well-Architected."
  };

  E[44] = {
    analoji: { a: "Ev bütçesi: fatura dökümünü açıp kalemleri görmek (Cost Explorer), limit aşılınca uyarı kurmak (Budgets), gereğinden büyük aboneliği küçültmek (rightsizing) ve sabit kullandığın şeyi yıllık almak (Savings Plans).", sinir: "Evde fatura ayda bir gelir ve sabittir; bulutta kullanım dakikalar içinde değişir, bu yüzden izleme sürekli yapılır ve taahhüt kullanılmazsa da faturalanır." },
    rehberli: ["Altı direği sırala ve her birini tek bir kelimeyle özetle.", "Sürekli çalışan bir veritabanı sunucusu için hangi fiyatlandırma modelini, kesilebilir bir toplu iş için hangisini seçeceğini yaz.", "Bir hesabın harcamasını üç takıma ayırmak için hangi adımları atacağını üç madde olarak sırala."],
    bagimsiz: "Kurgusal bir test ortamının (iki sunucu, bir veritabanı, günlük dosyaları) aylık harcamasını azaltmak için dört değişiklik öner. Her değişikliğin hangi riski getirdiğini ve hangi aracı kullanacağını kâğıda yaz. Gerçek kaynakta değişiklik yapma.",
    hatalar: [["Taahhüdü tahmine göre fazla almak", "Önce kullanımı izle ve taban yükü bul; kullanılmayan taahhüt de faturalanır."], ["Spot'u kesintiye dayanıksız işe vermek", "Spot yalnızca kesilebilir, esnek işler içindir."], ["Etiketleri etkinleştirmeden rapor beklemek", "Maliyet ayırma etiketleri faturalamada etkinleştirilmelidir."]],
    gecme: { olcut: "Mini sınavda %80 ve bir maliyet sorusunu doğru araç ya da fiyatlandırma modeliyle eşleştirebilmek.", kritik: [
    "Spot'un kesilmeyeceğini sanmak",
    "Taahhüt edilen kaynağın kullanılmazsa ücretsiz olduğunu sanmak"
  ] },
    kaynaklar: [
      A("wellarchitected/latest/framework/welcome.html", "AWS Belgesi: Well-Architected Framework", "Altı direğin resmî tanımı."),
      A("savingsplans/latest/userguide/what-is-savings-plans.html", "AWS Belgesi: Savings Plans nedir", "Taahhütle indirimin resmî anlatımı.")
    ],
    telafi: "Takıldıysan önce bir iş yükü seç ve sor: sürekli mi çalışıyor, kesilebilir mi, kim kullanıyor? Cevaplar fiyatlandırma modelini ve izleme aracını söyler.",
    sonraki: "Sıradaki konu: Analitik ve veri gölü."
  };

  E[45] = {
    analoji: { a: "Büyük bir kütüphane: S3 ham kitapların rafı, Glue kitapları kataloglayıp düzenleyen görevli, Athena danışma masasından soru sorabildiğin bilgi görevlisi, Redshift sürekli çalışan araştırma bölümü, QuickSight ise duvardaki özet panosu.", sinir: "Kütüphanede kitaplar tek kopyadır; veri gölünde aynı veri birçok araçla sorgulanır, ama sorgu başına taranan veri faturaya yansır." },
    rehberli: ["Bir veri gölü akışını beş kutuyla çiz: toplama, depolama, dönüştürme, sorgulama, görselleştirme.", "Bir CSV dosyasının Athena için neden Parquet'e çevrilmesi gerektiğini iki cümleyle yaz.", "Athena, Redshift ve OpenSearch'ün her biri için tek bir uygun senaryo yaz."],
    bagimsiz: "Kurgusal bir mağaza zincirinin satış dosyaları, uygulama günlükleri ve tıklama akışı için bir analiz akışı çiz. Her aşamada hangi hizmetin durduğunu, veriyi kimin dönüştürdüğünü ve yetkiyi kimin yönettiğini kâğıda yaz. Gerçek hesapta hizmet açma.",
    hatalar: [["Athena'yı sıkıştırılmamış devasa CSV üzerinde çalıştırmak", "Sütunlu biçime çevir, sıkıştır ve bölümle."], ["Her analitik işe Redshift kümesi açmak", "Ara sıra sorgu için sunucusuz Athena yeterlidir."], ["Veri gölü yetkisini kova politikasıyla tek tek yönetmek", "Tablo ve sütun düzeyi merkezi yetki için Lake Formation kullan."]],
    gecme: { olcut: "Mini sınavda %80 ve bir analitik ihtiyacı Athena, Redshift, Glue, EMR, OpenSearch, QuickSight ya da Lake Formation'dan doğru olanla eşleştirebilmek.", kritik: ["Athena'nın sunucu gerektirdiğini sanmak", "Veri gölü ile veri ambarını aynı şey sanmak"] },
    kaynaklar: [
      A("athena/latest/ug/what-is.html", "AWS Belgesi: Amazon Athena nedir", "Sunucusuz SQL sorgusunun resmî tanımı."),
      A("glue/latest/dg/what-is-glue.html", "AWS Belgesi: AWS Glue nedir", "ETL ve veri kataloğu kavramlarının resmî anlatımı.")
    ],
    telafi: "Takıldıysan iki soru sor: veri nerede duruyor ve soru ne sıklıkla, kaç kişi tarafından soruluyor? Ara sıra ise Athena, sürekli ve ağır ise Redshift düşün.",
    sonraki: "Backend yolunun son konusunu bitirdin; şimdi elindeki konuları bir mimari tasarımında birleştirebilirsin."
  };
})();

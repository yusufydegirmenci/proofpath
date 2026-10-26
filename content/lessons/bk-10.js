/* Backend / AWS · sabit dersler 47-51 (depolama, güvenlik katmanları, veri koruma, felaket kurtarma stratejileri, hibrit bağlantı yedeği: karşılaştırma dersleri) · SAA-C03 kapsam genişletmesi (Faz 17b) · ders eki: bk-ek-4.js, anahtarlar 46-50 */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).bk = (window.PP_LESSONS.bk || {}));
  var SAA = { title: "AWS Certified Solutions Architect – Associate", url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/", type: "doc", level: "orta", lang: "EN" };

  /* 47 ─────────────────────────────── Depolama karşılaştırması: EBS, instance store, EFS, FSx ve S3 sınıfları */
  L[47] = {
    hook: "Aynı veri beş farklı depolamada durabilir; hangisinin doğru olduğunu fiyat etiketi değil erişim biçimi, paylaşım ve kalıcılık gereksinimi söyler. Sınavda ve işte, hizmetleri yan yana koyup elemeyi bilen kazanır.",
    homework: "Şu altı gereksinimi tek tabloya yaz: tek sunucunun veritabanı diski, geçici ara veri, 30 Linux sunucunun ortak klasörü, Windows ekibinin AD'li paylaşımı, erişimi belirsiz nesneler, yılda bir okunan arşiv. Her satıra tek bir depolama seç ve neden diğerlerinin eşleşmediğini tek cümleyle yaz.",
    warmup: {
      recap: [
        { point: "EBS tek AZ'de yaşayan kalıcı blok diskidir; instance store ise örneğe bağlı geçici disktir.", example: "Veritabanı diski ile ara dosyalar" },
        { point: "S3 nesne depolamadır ve sınıfları erişim sıklığı ile geri getirme süresine göre fiyatlanır.", example: "Standard ile Glacier" }
      ],
      concepts: [
        { term: "Paylaşımlı dosya sistemi", tr: "Ortak dosya depolama", summary: "Birden çok sunucunun aynı anda bağlayıp okuyup yazabildiği dosya sistemidir; EFS ve FSx ailesi bu gruptadır, EBS bu gruba girmez.", example: "Ortak içerik klasörü" },
        { term: "Erişim örüntüsü", tr: "Veriye ne sıklıkla ulaşıldığı", summary: "S3 sınıfı seçiminde belirleyici ölçüttür: sık, seyrek, nadir ya da bilinmiyor. Örüntü bilinmiyorsa kendiliğinden taşıyan sınıf seçilir.", example: "Aylarca açılmayan fatura PDF'leri" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Bir mimar, bütçesi sıkı bir proje için 'hepsini EBS'e koyalım' önerisi alır. Oysa paylaşılan klasör, geçici ara veri ve arşiv aynı diskte tutulunca ya para ya hız ya da paylaşım kaybolur. Karşılaştırma becerisi, hizmeti ezberlemekten çok yanlış olanı doğru gerekçeyle elemektir." },
      { t: "steps", h: "Blok ve geçici depolama: EBS ile instance store", items: [
        "EBS: kalıcı, tek AZ'de, anlık görüntüyle yedeklenir. Genel amaçlı SSD (gp3) çoğu iş yükü ve küçük diskler için ucuz ve yeterli bir varsayılandır; sağlanmış IOPS SSD (io2) gecikmeye duyarlı kritik veritabanları içindir.",
        "Instance store: konağa doğrudan bağlı, çok yüksek G/Ç sunan ama geçici diskdir. Örnek durdurulunca ya da konak bozulunca veri gider; yeniden üretilebilen ara veri ve önbellek için uygundur. Yüksek yerel G/Ç gerektiren iş için depolama optimize örnek türleri bu amaçla kullanılır.",
        "Karar kuralı: veri kalıcı olmalıysa EBS, kaybolması sorun değilse ve hız öncelikliyse instance store. Aynı diski birden çok AZ'de paylaşmak EBS ile olmaz."
      ] },
      { t: "steps", h: "Dosya sistemleri: EFS ve FSx çeşitleri", items: [
        "EFS: NFS ile Linux sunucularına bağlanır, birden çok AZ'den aynı anda erişilir, kapasite kendiliğinden büyür. Erişilmeyen dosyaları daha ucuz sınıfa taşıyan yaşam döngüsü yönetimi vardır.",
        "FSx for Windows File Server: SMB ve Active Directory gerektiren Windows iş yükleri için.",
        "FSx for Lustre: HPC ve makine öğrenmesi için yüksek verimli paralel dosya sistemi; S3 ile bütünleşir.",
        "FSx for NetApp ONTAP: şirket içi ONTAP'ı bulutta aynı araçlar ve çok protokollü (NFS, SMB, iSCSI) erişimle sürdürmek için. FSx for OpenZFS ZFS tabanlı iş yükleri içindir.",
        "Karar kuralı: protokol belirleyicidir. Linux ve NFS için EFS, Windows ve SMB için FSx for Windows, HPC için Lustre, ONTAP uyumu için ONTAP."
      ] },
      { t: "steps", h: "S3 sınıfları karşılaştırması", items: [
        "Standard: sık erişilen veri. Intelligent-Tiering: örüntü bilinmiyorsa ya da değişiyorsa nesneleri erişime göre kendiliğinden taşır ve geri getirme ücreti almaz.",
        "Standard-IA ve One Zone-IA: seyrek erişilen ama milisaniyede gelmesi gereken veri. One Zone-IA tek AZ'de tutar, daha ucuzdur; yeniden üretilebilen ikincil kopya için uygundur. İkisinde de geri getirme ücreti ve asgari saklama süresi vardır.",
        "Glacier Instant Retrieval: yılda birkaç kez erişilen arşiv, erişimde milisaniye. Glacier Flexible Retrieval: dakikalar-saatler. Glacier Deep Archive: saatler, en ucuz.",
        "Karar kuralı: önce 'ne kadar sürede gelmeli', sonra 'ne sıklıkla okunuyor', en sonda 'tek AZ kaybı kabul mü' sorusunu sor. Güncel fiyat ve asgari süreleri resmî belgeden doğrula."
      ] },
      { t: "box", h: "Hızlı eleme tablosu", text: "Kalıcı disk tek sunucu: EBS. Geçici ve çok hızlı: instance store. Çok sunuculu Linux paylaşımı: EFS. Windows SMB ve AD: FSx for Windows. HPC ve S3 verisi: FSx for Lustre. ONTAP uyumu: FSx for ONTAP. Örüntü belirsiz nesne: S3 Intelligent-Tiering. Seyrek, anında: IA sınıfları. Nadir, saatler tolere: Glacier sınıfları." },
      { t: "warn", h: "Tuzak", text: "'En ucuz sınıf her zaman doğru' sanmak: Deep Archive saatler sürer, IA sınıfları geri getirme ücreti alır. Bir de EBS'i ortak klasör gibi düşünmek: EBS tek AZ'dedir. Soruda geçen koşul sözcüğünü (en düşük işletme yükü, en düşük maliyet, anında erişim) önce işaretle, sonra şıkları ele." }
    ],
    objectives: [
      { id: "h1", text: "Instance store ile EBS'i kalıcılık ve hız açısından karşılaştırıp doğru olanı seçebilirsin." },
      { id: "h2", text: "EFS'in paylaşım ve yaşam döngüsü özelliğini ve EBS'in AZ sınırını ayırt edebilirsin." },
      { id: "h3", text: "FSx çeşitlerini (Windows, Lustre, ONTAP) protokol ve iş yüküne göre eşleştirebilirsin." },
      { id: "h4", text: "S3 sınıflarını erişim sıklığı, geri getirme süresi ve AZ dayanıklılığına göre seçebilirsin." }
    ],
    summary: [
      "EBS kalıcı ve tek AZ'dedir; instance store hızlı ama geçicidir.",
      "EFS çok AZ'li Linux paylaşımıdır ve yaşam döngüsüyle seyrek dosyaları ucuz sınıfa taşır.",
      "FSx ailesinde protokol belirleyicidir: Windows için SMB/AD, HPC için Lustre, ONTAP uyumu için ONTAP.",
      "S3'te örüntü belirsizse Intelligent-Tiering, seyrek ama anında ise IA sınıfları, nadir ise Glacier sınıfları.",
      "Koşul sözcüğü (maliyet, anında erişim, işletme yükü) doğru şıkkı belirler."
    ],
    quiz: [
      { id: "c92c6adb", q: "Bir ekip, EC2 üzerinde çalışan bir analiz işi için saniyede çok yüksek sayıda küçük G/Ç gerektiren geçici bir ara veri kümesi tutacak. Veri kaybolursa kaynaktan yeniden üretilebiliyor ve hedef en yüksek yerel disk hızı. Hangi seçim uygundur?", options: [
  "EBS gp3 birimi, sağlanmış IOPS ile artırılarak",
  "Amazon EFS dosya sistemi, yüksek verimli modda",
  "Örneğe fiziksel bağlı instance store",
  "S3 Standard kovası, çok parçalı yüklemeyle"
], obj: "h1" },
      { id: "dfda0e05", q: "Farklı AZ'lerdeki Linux sunucuların paylaştığı bir dosya sisteminin dosyalarının çoğu aylardır açılmıyor. Uygulamayı değiştirmeden depolama maliyetini düşürmek istiyorsun. Ne yaparsın?", options: [
  "EFS'te yaşam döngüsü yönetimiyle seyrek dosyaları ucuz sınıfa taşırsın",
  "Bütün veriyi tek bir EBS gp3 birimine taşıyıp Multi-Attach ile her sunucuya bağlarsın",
  "Dosya sistemini yüksek hızlı FSx for Lustre ile değiştirip S3 deposu ile eşleştirirsin",
  "Verileri instance store'a kopyalarsın"
], obj: "h2" },
      { id: "5fd51d53", q: "Şirket içinde NetApp ONTAP kullanan bir ekip, aynı protokolleri (NFS, SMB, iSCSI) ve anlık görüntü/klonlama araçlarını değiştirmeden bulutta çalıştırmak istiyor. Hangi hizmet doğrudan uygundur?", options: [
  "Amazon EFS",
  "Amazon FSx for Windows File Server",
  "Amazon FSx for Lustre",
  "Amazon FSx for NetApp ONTAP"
], obj: "h3" },
      { id: "cdbf4d7a", q: "Erişim örüntüsü bilinmeyen ve zamanla değişen, 128 KB'tan büyük nesneler için kendiliğinden maliyet optimizasyonu isteniyor; ekip geri getirme ücreti ve elle sınıf yönetimiyle uğraşmak istemiyor. Hangi S3 sınıfı uygundur?", options: [
  "S3 Standard-IA",
  "S3 Intelligent-Tiering",
  "S3 Glacier Deep Archive",
  "S3 One Zone-IA"
], obj: "h4" },
      { id: "9bacb219", q: "Yeniden üretilebilen, seyrek okunan ikincil bir veri kopyası için milisaniyelik erişim gerekiyor. Tek AZ'nin kaybı kabul edilebilir ve hedef en düşük maliyet. Hangi S3 sınıfı en uygundur?", options: [
  "S3 Standard",
  "S3 Glacier Flexible Retrieval",
  "S3 Standard-IA",
  "S3 One Zone-IA"
], obj: "h4" }
    ],
    interview: [
      { q: "Instance store ne zaman EBS'e tercih edilir?", a: "Veri geçici ve yeniden üretilebilirse, örneğin ara veri ya da önbellek, ve en yüksek yerel G/Ç hızı gerekiyorsa. Kalıcılık gerekiyorsa EBS seçilir." },
      { q: "EFS ile FSx for Windows arasında nasıl seçersin?", a: "Protokole ve işletim sistemine bakarım: Linux ve NFS için EFS, Windows, SMB ve Active Directory entegrasyonu için FSx for Windows File Server." },
      { q: "S3 Intelligent-Tiering'i ne zaman kullanırsın?", a: "Erişim örüntüsü bilinmediğinde ya da zamanla değiştiğinde; nesneleri erişime göre kendiliğinden taşır ve elle sınıf yönetimi ve geri getirme ücreti derdi çıkarmaz." }
    ],
    vocab: [
      { term: "Ephemeral storage", tr: "geçici depolama", ex: "Instance store is ephemeral storage." },
      { term: "Shared file system", tr: "paylaşımlı dosya sistemi", ex: "Use a shared file system for many servers." },
      { term: "Access pattern", tr: "erişim örüntüsü", ex: "The access pattern is unknown." },
      { term: "Lifecycle policy", tr: "yaşam döngüsü kuralı", ex: "Add a lifecycle policy." },
      { term: "Retrieval fee", tr: "geri getirme ücreti", ex: "Infrequent Access classes charge a retrieval fee." }
    ],
    resources: [
      { title: "EC2 instance store", url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html", type: "doc", why: "Geçici depolamanın kapsamı", level: "orta", lang: "EN" },
      { title: "Amazon S3 depolama sınıfları", url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html", type: "doc", why: "Sınıf karşılaştırması", level: "orta", lang: "EN" }
    ],
    sources: [SAA]
  };

  /* 48 ─────────────────────────────── Güvenlik katmanları: Shield, WAF, Network Firewall, Firewall Manager */
  L[48] = {
    hook: "Aynı saldırıya dört farklı güvenlik hizmeti 'ben engellerim' diyebilir; yalnızca biri doğru katmanda durur. Katmanları karıştıran mimari, açığı kapatmış gibi görünüp açık bırakır.",
    homework: "Bir e-ticaret sitesinin yolunu çiz: kullanıcı, CloudFront, ALB, VPC'deki uygulama, dışarıya çıkan trafik. Her duraktaki olası tehdidi (DDoS, SQL enjeksiyonu, istenmeyen alan adı çıkışı, hesaplar arası tutarsız kural) yaz ve hangi hizmetin hangi durakta durduğunu işaretle.",
    warmup: {
      recap: [
        { point: "Güvenlik grubu port ve IP kurallarıyla çalışır; HTTP içeriğini incelemez.", example: "443 portuna izin" },
        { point: "Katmanlı savunmada her katman farklı bir tehdit türünü engeller; biri diğerinin yerini tutmaz.", example: "Kapıdaki kontrol ile içerideki kamera" }
      ],
      concepts: [
        { term: "Katman 7 (uygulama) denetimi", tr: "HTTP içeriğini inceleme", summary: "İstek gövdesi, başlıklar ve sorgu dizgisi gibi uygulama düzeyi bilgiyi kurallarla süzmektir; WAF bu katmandadır.", example: "SQL enjeksiyonu kalıbı" },
        { term: "Merkezi ilke yönetimi", tr: "Hesaplar arası tek ilke", summary: "Birçok hesapta aynı güvenlik kuralını tek yerden tanımlayıp yaymaktır; Firewall Manager bu işi yapar.", example: "Her yeni hesapta aynı WAF kuralı" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Bir şirket, uygulamasının önüne 'bir güvenlik duvarı koyalım' diyor. Hangisi? DDoS için bir şey, web saldırıları için başka, VPC trafiği için bir diğeri, onlarca hesap için de ayrı bir yönetim aracı var. Doğru katmanı seçmek hem güvenliği hem faturayı belirler." },
      { t: "steps", h: "Dört hizmet, dört iş", items: [
        "AWS Shield: DDoS koruması. Shield Standard tüm müşterilere ücretsiz ve kendiliğinden gelir, yaygın ağ ve taşıma katmanı saldırılarına karşı temel koruma verir.",
        "Shield Advanced: ücretli abonelik; gelişmiş DDoS tespiti ve azaltması, Shield Response Team desteği, DDoS kaynaklı ölçekleme maliyetleri için koruma. CloudFront, Route 53, Global Accelerator, yük dengeleyiciler ve Elastic IP gibi kaynaklara uygulanır.",
        "AWS WAF: HTTP/HTTPS isteklerini katman 7'de süzer. SQL enjeksiyonu, XSS, hız sınırlama ve IP/coğrafya kuralları web ACL ile tanımlanır; CloudFront, ALB, API Gateway gibi kaynaklara bağlanır.",
        "AWS Network Firewall: VPC düzeyinde durum bilgili ve durumsuz denetim, IPS imzaları, alan adı filtreleme; VPC'ler arası ve internete çıkış trafiği için, genellikle Transit Gateway ile merkezi bir denetim VPC'sinde kurulur.",
        "AWS Firewall Manager: bu hizmetlerin kurallarını (WAF, Shield Advanced, güvenlik grubu, Network Firewall) Organizations altındaki hesaplarda merkezden tanımlar ve yeni hesaplara yayar."
      ] },
      { t: "steps", h: "Hangi saldırıyı kim durdurur", items: [
        "Hacimsel ve protokol DDoS (ağ ve taşıma katmanı): Shield. Uygulama katmanı DDoS'ta WAF'ın hız sınırlama kuralları devreye girer; Shield Advanced bu birlikte kullanım için uzman desteği ekler.",
        "SQL enjeksiyonu, XSS, kötü botlar: WAF. Shield bu kalıpları içerik düzeyinde süzmez.",
        "VPC'ler arası ya da çıkış trafiğinde derin paket denetimi ve alan adı kara listesi: Network Firewall. WAF yalnız web kaynaklarının HTTP trafiğine bakar.",
        "Onlarca hesapta kuralları tek yerden uygulama ve uyumu denetleme: Firewall Manager. Config uyumu kaydeder, Security Hub bulguları toplar; ikisi kural dağıtmaz.",
        "Port ve IP düzeyinde basit izin: güvenlik grubu ve NACL; HTTP içeriğini bilmezler."
      ] },
      { t: "box", h: "Bir cümlelik eleme", text: "DDoS ve destek: Shield (Advanced). Web saldırısı içeriği: WAF. VPC trafiği, IPS ve alan adı süzme: Network Firewall. Çok hesapta merkezi uygulama: Firewall Manager. Basit port izni: güvenlik grubu." },
      { t: "warn", h: "Tuzak", text: "WAF'ı VPC içi trafiği denetleyen bir ağ güvenlik duvarı sanmak ve Shield'ı SQL enjeksiyonunu süzen bir araç saymak. Bir de Firewall Manager'ı kural motoru sanmak: kuralları kendisi çalıştırmaz, WAF ve Network Firewall gibi hizmetlerin ilkesini hesaplara dağıtır ve Organizations gerektirir. Ücretli özellikleri (Shield Advanced) resmî fiyat sayfasından doğrula." }
    ],
    objectives: [
      { id: "h1", text: "Shield Standard ile Shield Advanced arasındaki farkı ve DDoS için hangisinin gerektiğini açıklayabilirsin." },
      { id: "h2", text: "WAF'ın katman 7 web saldırılarını nasıl engellediğini ve nereye bağlandığını bilirsin." },
      { id: "h3", text: "Network Firewall'ı VPC trafiğinde derin denetim ve alan adı filtreleme için seçebilirsin." },
      { id: "h4", text: "Firewall Manager'ın çok hesaplı ortamda merkezi ilke uygulamadaki rolünü açıklayabilirsin." }
    ],
    summary: [
      "Shield DDoS içindir; Standard ücretsiz ve otomatiktir, Advanced uzman desteği ve maliyet koruması ekler.",
      "WAF katman 7 HTTP isteğini süzer: SQL enjeksiyonu, XSS, hız sınırlama.",
      "Network Firewall VPC trafiğinde durum bilgili denetim, IPS ve alan adı filtreleme yapar.",
      "Firewall Manager bu hizmetlerin ilkesini Organizations altındaki hesaplara merkezden dağıtır.",
      "Güvenlik grubu port/IP düzeyindedir; bu hizmetlerden hiçbirinin yerini tutmaz."
    ],
    quiz: [
      { id: "901e17b5", q: "CloudFront ve ALB arkasındaki bir web uygulaması hem ağ/taşıma hem uygulama katmanı DDoS saldırılarına uğruyor. Ekip 7/24 AWS DDoS uzman desteği ve saldırı yüzünden ölçeklemeden doğan maliyet için iade talebi istiyor. Ne seçmelisin?", options: [
  "AWS Shield Standard",
  "AWS Shield Advanced",
  "Yalnız AWS WAF web ACL",
  "Amazon GuardDuty"
], obj: "h1" },
      { id: "5c70e216", q: "Bir CloudFront dağıtımının arkasındaki uygulamaya SQL enjeksiyonu ve XSS girişimleri geliyor. HTTP isteği içeriğini inceleyip bunları engelleyecek hizmet hangisidir?", options: [
  "AWS Network Firewall",
  "Güvenlik grubu",
  "Amazon Inspector",
  "CloudFront dağıtımına bağlı AWS WAF web ACL"
], obj: "h2" },
      { id: "353876ab", q: "Birkaç VPC Transit Gateway ile bağlı. Ekip VPC'ler arası ve internete çıkan trafikte durum bilgili denetim, IPS imzaları ve alan adı bazlı filtreleme istiyor. Hangi hizmet bunu sağlar?", options: [
  "AWS Network Firewall",
  "AWS WAF web uygulaması güvenlik duvarı",
  "Güvenlik grubu",
  "AWS Shield Advanced DDoS koruma planı"
], obj: "h3" },
      { id: "23cfb97e", q: "AWS Organizations altındaki onlarca hesapta WAF kurallarını, güvenlik grubu ilkelerini ve Network Firewall kurallarını merkezden uygulamak ve yeni hesaplara kendiliğinden yaymak isteniyor. Hangi hizmet kullanılır?", options: [
  "AWS Security Hub",
  "AWS IAM Identity Center",
  "AWS Firewall Manager",
  "AWS Config"
], obj: "h4" },
      { id: "f691bf5f", q: "Küçük bir ekip, ALB ve CloudFront önündeki uygulamaları için ek ücret ve ek kurulum olmadan temel ağ/taşıma katmanı DDoS koruması istiyor. Hangisi buna uyar?", options: [
  "AWS Shield Standard",
  "AWS Shield Advanced aboneliği",
  "AWS Firewall Manager ilkesi",
  "AWS Network Firewall"
], obj: "h1" }
    ],
    interview: [
      { q: "WAF ile Shield Advanced birlikte nasıl kullanılır?", a: "Shield Advanced DDoS tespiti, azaltması ve uzman desteği verir; WAF ise uygulama katmanında istek içeriğini kurallarla süzer. Uygulama katmanı DDoS'ta WAF'ın hız sınırlama kuralları Shield Advanced desteğiyle birlikte çalışır." },
      { q: "Network Firewall'ı ne zaman seçersin?", a: "VPC'ler arası ya da internete çıkış trafiğinde durum bilgili denetim, IPS imzaları ve alan adı filtresi gerektiğinde, genellikle Transit Gateway ile birlikte merkezi bir denetim noktası olarak." },
      { q: "Firewall Manager neyi çözer?", a: "Birçok hesapta WAF, Shield Advanced, güvenlik grubu ve Network Firewall ilkelerini tek yerden tanımlayıp yeni hesaplara kendiliğinden uygulamayı; Organizations gerektirir." }
    ],
    vocab: [
      { term: "DDoS", tr: "dağıtık hizmet engelleme", ex: "Shield protects against DDoS attacks." },
      { term: "Web ACL", tr: "web erişim kontrol listesi", ex: "Attach a web ACL to the distribution." },
      { term: "Rate-based rule", tr: "hız tabanlı kural", ex: "Add a rate-based rule." },
      { term: "Deep packet inspection", tr: "derin paket denetimi", ex: "Network Firewall supports deep packet inspection." },
      { term: "Central policy", tr: "merkezi ilke", ex: "Apply a central policy to all accounts." }
    ],
    resources: [
      { title: "AWS Shield ve DDoS koruması", url: "https://docs.aws.amazon.com/waf/latest/developerguide/ddos-overview.html", type: "doc", why: "Standard ve Advanced karşılaştırması", level: "orta", lang: "EN" },
      { title: "AWS Network Firewall nedir", url: "https://docs.aws.amazon.com/network-firewall/latest/developerguide/what-is-aws-network-firewall.html", type: "doc", why: "VPC düzeyinde ağ denetimi", level: "orta", lang: "EN" }
    ],
    sources: [SAA]
  };

  /* 49 ─────────────────────────────── Veri koruma: Macie ile bulma, DataBrew ile maskeleme */
  L[49] = {
    hook: "Hassas veri şirketin bilmediği bir kovada durur ve bilinmeyeni koruyamazsın. Önce nerede olduğunu bulmak, sonra gerektiğinde kimsenin göremeyeceği hale getirmek gerekir: bunlar iki ayrı iştir ve iki ayrı hizmettir.",
    homework: "Kurgusal bir müşteri tablosu düşün (ad, e-posta, kart numarası, sipariş tutarı). Hangi sütunların hassas olduğunu işaretle, sonra analitik ekibe vermeden önce her biri için bir yöntem seç: sil, karma (hash) yap, yer tutucuyla değiştir ya da olduğu gibi bırak. Bulma ve gizleme adımlarını iki ayrı kutu olarak çiz.",
    warmup: {
      recap: [
        { point: "Şifreleme veriyi yetkisiz okumaya karşı korur ama yetkili okuyucuya açık metin verir.", example: "KMS ile şifreli kova" },
        { point: "Tespit hizmetleri bulgu üretir; müdahale ayrı kurulur.", example: "GuardDuty bulgusundan bildirim" }
      ],
      concepts: [
        { term: "Amazon Macie", tr: "Hassas veri keşfi", summary: "S3 nesnelerini inceleyip kişisel ve finansal veri gibi hassas içeriği bulan, bulgu üreten hizmettir. Veriyi değiştirmez.", example: "Kovada kredi kartı numarası bulgusu" },
        { term: "AWS Glue DataBrew", tr: "Kodsuz veri hazırlama", summary: "Görsel arayüzle veriyi temizler ve dönüştürür; kişisel veri sütunlarını maskeleme, değiştirme ya da karma gibi dönüşümlerle gizleyebilir.", example: "E-posta sütununu karmaya çevirmek" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Analitik ekip müşteri verisine ihtiyaç duyuyor; güvenlik ekibi kişisel verinin analist ortamına sızmasını istemiyor. İki ekibi buluşturan yol, hassas veriyi önce bulmak, sonra maskeleyip temiz kopyayı paylaşmaktır." },
      { t: "steps", h: "Bulma: Amazon Macie", items: [
        "Macie, S3 kovalarındaki nesneleri yönetilen veri tanımlayıcılarıyla (kredi kartı, kimlik gibi kalıplar) ve istersen kendi özel tanımlayıcılarınla inceler.",
        "İki çalışma biçimi vardır: otomatik hassas veri keşfi geniş ve sürekli görünürlük sağlar; hedefli keşif işleri seçilen kova ve nesneleri ayrıntılı tarar. Ayrıntıyı resmî belgeden oku.",
        "Sonuç bir bulgudur (finding): hangi nesnede ne tür hassas veri olduğunu söyler. Bulgular EventBridge ve Security Hub'a iletilebilir.",
        "Macie nesneyi silmez, değiştirmez, maskelemez ve kova erişimini kendiliğinden kapatmaz; müdahaleyi sen kurarsın.",
        "Kapsam S3'tür. RDS ya da DynamoDB içeriğini taramak için veriyi S3'e dışa aktarmak gerekir."
      ] },
      { t: "steps", h: "Gizleme: AWS Glue DataBrew", items: [
        "DataBrew, kodsuz görsel arayüzle veri profili çıkarır ve yüzlerce hazır dönüşümle veriyi temizler.",
        "Kişisel veri dönüşümleri: maskeleme, yer tutucuyla değiştirme, karma (hash), şifreleme, karıştırma ya da silme gibi seçenekler sunar. Güncel liste için resmî belgeye bak.",
        "Bir DataBrew projesi veriyi okur, tarifeyi (recipe) uygular ve temiz çıktıyı yeni bir konuma (örneğin başka bir S3 kovası) yazar; ham veri yerinde kalır.",
        "RDS gibi kaynaklardan JDBC ile veri alabilir; bu yüzden 'RDS'teki hassas veriyi kod yazmadan maskele' sorusunun cevabı sıklıkla DataBrew'dir."
      ] },
      { t: "steps", h: "Birlikte iş akışı ve karşılaştırma", items: [
        "Sıra: Macie hassas veriyi bulur, ekip hassas sütunları kararlaştırır, DataBrew bu sütunları maskeler, temiz kopya analitik ortama açılır.",
        "Macie bulur ama gizlemez; DataBrew gizler ama tespit hizmeti değildir; Athena sorgu motorudur ve kendiliğinden maskeleme yapmaz.",
        "KMS şifrelemesi bekleyen veriyi korur; yetkili analist yine açık metin görür, bu yüzden maskeleme yerine geçmez. Object Lock değişmezlik sağlar, gizlilik sağlamaz.",
        "Amacına göre: bulma için Macie, gizleme için DataBrew, okuma yetkisi için IAM ve Lake Formation, şifreleme için KMS."
      ] },
      { t: "warn", h: "Tuzak", text: "Macie'nin bulduğu veriyi kendisinin gizleyeceğini sanmak ya da şifrelemeyi maskeleme saymak. Bir de Macie'yi veritabanlarında çalışan bir hizmet sanmak: kapsamı S3'tür. Karşılaşılan 'maskele' fiili çoğunlukla DataBrew, 'bul/sınıflandır' fiili Macie demektir. Kapsam ve özelliklerin güncel halini resmî belgeden doğrula." }
    ],
    objectives: [
      { id: "h1", text: "Macie'nin ne yaptığını ve ne yapmadığını (bulgu üretir, değiştirmez) açıklayabilirsin." },
      { id: "h2", text: "DataBrew ile kodsuz maskeleme senaryosunu tanıyıp diğer hizmetlerden ayırabilirsin." },
      { id: "h3", text: "Macie'nin S3 kapsamını bilip RDS verisi için dışa aktarma yolunu seçebilirsin." },
      { id: "h4", text: "Bul-maskele-paylaş iş akışını doğru sırada ve doğru hizmetlerle kurabilirsin." }
    ],
    summary: [
      "Macie S3'te hassas veriyi bulur ve bulgu üretir; veriyi değiştirmez.",
      "DataBrew kodsuz dönüşümlerle kişisel sütunları maskeler, değiştirir ya da karma yapar.",
      "Macie'nin kapsamı S3'tür; veritabanı verisi için önce S3'e dışa aktarılır.",
      "Doğru sıra: Macie ile bul, DataBrew ile maskele, temiz kopyayı paylaş.",
      "Şifreleme, Object Lock ve Athena maskeleme yerine geçmez."
    ],
    quiz: [
      { id: "37bc1aef", q: "Güvenlik ekibi, S3 kovalarında hangi nesnelerin kişisel veri veya kredi kartı numarası içerdiğini keşfetmek ve bulguları EventBridge ile bildirimlere bağlamak istiyor. Hangi hizmet bu işi yapar?", options: [
  "Amazon GuardDuty",
  "Amazon Inspector",
  "Amazon Macie",
  "AWS Config"
], obj: "h1" },
      { id: "d499c064", q: "Macie, S3'teki CSV dosyalarında kişisel alanları buldu. Analitik ekibine vermeden önce bu sütunlardaki değerleri kod yazmadan karma (hash) ya da yer tutucuyla değiştirmek gerekiyor. Hangisi doğru yaklaşımdır?", options: [
  "Macie'de bulguyu maskeleme işi olarak çalıştırmak",
  "AWS Glue DataBrew'de kişisel veri dönüşümleriyle sütunları maskelemek",
  "Kovaya S3 Object Lock uygulamak",
  "Kovayı yalnız KMS anahtarıyla şifrelemek"
], obj: "h2" },
      { id: "596087fb", q: "Müşteri verisi bir RDS veritabanında duruyor ve ekip bu veride hassas içerik taraması yapmak istiyor. Macie'nin kapsamı göz önüne alındığında hangi yaklaşım uygundur?", options: [
  "Macie'yi doğrudan RDS örneğine ve tablolarına bağlayıp taramak",
  "CloudTrail kayıtlarını Macie yerine kullanmak",
  "AWS WAF kurallarıyla veritabanı sütunlarını taramak",
  "Veriyi S3'e dışa aktarmak ve S3 kovasını Macie ile taramak"
], obj: "h3" },
      { id: "38dc34c2", q: "Bir ekip, analitik için paylaşacağı ham müşteri verisinde önce hassas sütunları bulup sonra gizlemek istiyor. Doğru iş akışı hangisidir?", options: [
  "Macie ile hassas sütunları bul, DataBrew ile maskele, maskelenmiş kopyayı paylaş",
  "DataBrew ile bul, Macie ile maskele, kopyayı paylaş",
  "Macie bulgusuna S3 Object Lock koy ve ham veriyi doğrudan paylaş",
  "Ham veriyi paylaş ve Athena'nın sorguda otomatik maskelemesini bekle"
], obj: "h4" },
      { id: "bd74901a", q: "Macie bir kovada kredi kartı numarası içeren bir nesne buldu. Macie kendi başına ne yapar?", options: [
  "Nesneyi karantina kovasına taşıyıp otomatik olarak siler",
  "Bulgu üretir; bulgu EventBridge veya Security Hub'a iletilebilir",
  "Kart numarası alanını nesne içinde otomatik olarak maskeler",
  "Kovanın herkese açık erişimini kendiliğinden kapatır ve kovayı özel yapar"
], obj: "h1" }
    ],
    interview: [
      { q: "Macie ile DataBrew arasındaki fark nedir?", a: "Macie S3'te hassas veriyi bulur ve bulgu üretir. DataBrew ise veriyi dönüştürür ve kişisel sütunları maskeler. Biri tespit, diğeri veri hazırlama hizmetidir." },
      { q: "Şifreleme neden maskeleme yerine geçmez?", a: "Şifreleme yetkisiz okumayı engeller ama yetkili kullanıcı yine açık metin görür. Maskeleme ise değerin kendisini gizler; analist gerçek değeri hiç görmez." },
      { q: "RDS'teki veriyi Macie ile nasıl tararsın?", a: "Macie S3 nesnelerini inceler; bu yüzden veriyi önce S3'e dışa aktarır ve oradaki kovayı taratırım." }
    ],
    vocab: [
      { term: "Sensitive data", tr: "hassas veri", ex: "Find sensitive data in the bucket." },
      { term: "Data masking", tr: "veri maskeleme", ex: "Apply data masking before sharing." },
      { term: "Hash", tr: "karma", ex: "Hash the email column." },
      { term: "Finding", tr: "bulgu", ex: "Macie generates a finding." },
      { term: "Recipe", tr: "tarif (dönüşüm adımları)", ex: "A DataBrew recipe lists the transformations." }
    ],
    resources: [
      { title: "Amazon Macie nedir", url: "https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html", type: "doc", why: "Hassas veri keşfi ve bulgu kavramı", level: "orta", lang: "EN" },
      { title: "DataBrew ile kişisel veri koruma", url: "https://docs.aws.amazon.com/databrew/latest/dg/personal-information-protection.html", type: "doc", why: "Maskeleme dönüşümleri", level: "orta", lang: "EN" }
    ],
    sources: [SAA]
  };

  /* 50 ─────────────────────────────── Felaket kurtarma stratejileri karşılaştırması */
  L[50] = {
    hook: "'Felaket kurtarma yapıyoruz' cümlesi dört farklı şey demek olabilir ve fiyat farkı onlarca kat olabilir. Hedef sayılar belli olmadan strateji seçmek, ya gereksiz para ya da yetersiz koruma demektir.",
    homework: "Üç kurgusal uygulama düşün: blog, sipariş sistemi, ödeme sistemi. Her biri için RPO ve RTO hedefi yaz, sonra dört stratejiden (yedekle ve geri yükle, pilot light, warm standby, etkin-etkin) en ucuz uyanı seç ve neden bir alttakinin yetmediğini tek cümleyle açıkla.",
    warmup: {
      recap: [
        { point: "RPO kabul edilen veri kaybı, RTO kabul edilen kesinti süresidir.", example: "RPO 15 dk, RTO 1 saat" },
        { point: "Multi-AZ aynı bölgedeki AZ arızasını karşılar; bölge kaybı için ikinci bölge gerekir.", example: "RDS Multi-AZ ile bölge kaybı farkı" }
      ],
      concepts: [
        { term: "Çekirdek katman", tr: "Ayakta tutulan asgari bileşen", summary: "Pilot light'ta sürekli çoğaltılan ve hazır bekleyen kısımdır (ör. veritabanı); gerisi olay anında açılır.", example: "Çoğaltılan veritabanı" },
        { term: "Yük devri", tr: "Trafiği ikinci siteye çevirme", summary: "Birincil bölge sağlıksızken kullanıcıyı ikinciye yönlendirmektir; DNS tabanlı failover bunun yaygın yoludur.", example: "Route 53 failover" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Yönetim 'bölge çökerse ne olur' diye soruyor. Cevap tek bir hizmet değil; hedef sayılara uyan bir strateji ve onu kuran yapı taşları. Sınav soruları çoğunlukla 'verilen RTO/RPO ve bütçeye uyan en uygun stratejiyi seç' biçimindedir." },
      { t: "steps", h: "Dört stratejinin yan yana karşılaştırması", items: [
        "Yedekle ve geri yükle: yedekler (genellikle başka bölgede) tutulur, olay anında altyapı kurulur ve veri geri yüklenir. En ucuz, en yavaştır; RTO ve RPO saatler mertebesinde.",
        "Pilot light: çekirdek (ör. veritabanı) ikinci bölgede sürekli çoğaltılır; uygulama sunucuları kapalıdır. Olay anında sunucular hazır AMI'den açılır, ölçeklenir ve DNS çevrilir. Yedekle ve geri yüklemeden hızlıdır.",
        "Warm standby: ikinci bölgede tam işlevli ama küçültülmüş bir kopya çalışır ve olayda büyütülür. Pilot light'tan daha hızlı, daha pahalı; RTO dakikalarla ölçülür.",
        "Çok bölgeli etkin-etkin: iki bölge birden gerçek trafik işler. RTO ve RPO sıfıra yakın, maliyet ve karmaşıklık en yüksek.",
        "Karar kuralı: hedefler sıkılaştıkça maliyet artar. Önce RTO/RPO'yu belirle, sonra bu hedefi karşılayan en ucuz stratejiyi seç."
      ] },
      { t: "steps", h: "Yapı taşları ve neyi etkiledikleri", items: [
        "RPO'yu belirleyen: çoğaltma ve yedekleme sıklığı. Sürekli çoğaltma (Aurora Global Database, DynamoDB global tabloları, S3 çoğaltma) RPO'yu saniyelere indirir; günlük kopya RPO'yu saatlere çıkarır.",
        "RTO'yu belirleyen: sunucuların ne kadar hızlı hazır olduğu. Hazır AMI, başlatma şablonu, Auto Scaling ve altyapı kodu (CloudFormation/CDK) süreyi kısaltır; Elastic Disaster Recovery sunucuları sürekli çoğaltıp hızla başlatır.",
        "Yönlendirme: Route 53 failover politikası ve sağlık denetimi, kullanıcıyı sağlıklı bölgeye kendiliğinden çevirir. Basit yönlendirme sağlık denetimine göre karar vermez.",
        "Yedek yönetimi: AWS Backup politikaları, başka bölge/hesaba kopya ve Vault Lock merkezi yönetilir; yedeğin geri yüklenebildiği düzenli sınanmalıdır."
      ] },
      { t: "box", h: "Hedefe göre seçim", text: "Saatlerce kesinti ve saatlik veri kaybı tamamsa: yedekle ve geri yükle. Dakikalar-onlarca dakika RTO ve düşük RPO: pilot light. Dakikalar RTO ve çalışan küçük kopya: warm standby. Neredeyse sıfır kesinti ve veri kaybı, bütçe uygunsa: etkin-etkin." },
      { t: "warn", h: "Tuzak", text: "Pilot light ile warm standby'yi karıştırmak: pilot light'ta uygulama katmanı kapalıdır, warm standby'de küçük de olsa çalışır. Bir de yük devri hızlandırıcılarını RPO sanmak: AMI ve TTL RTO'yu, çoğaltma sıklığı RPO'yu etkiler. Ayrıntılı tanımlar için resmî felaket kurtarma teknik belgesine bak." }
    ],
    objectives: [
      { id: "h1", text: "Bir değişikliğin RPO'yu mu RTO'yu mu etkilediğini ayırt edebilirsin." },
      { id: "h2", text: "Dört stratejiyi (özellikle pilot light ile warm standby'yi) maliyet ve süreye göre ayırt edebilirsin." },
      { id: "h3", text: "Veritabanı ve depolama çoğaltma yapı taşlarını (Aurora Global Database, S3 çoğaltma) strateji için eşleştirebilirsin." },
      { id: "h4", text: "Route 53 failover ile bölgeler arası yük devrini açıklayabilirsin." }
    ],
    summary: [
      "RPO çoğaltma sıklığıyla, RTO hazırlık ve otomasyon hızıyla belirlenir.",
      "Strateji sırası ucuzdan pahalıya: yedekle ve geri yükle, pilot light, warm standby, etkin-etkin.",
      "Pilot light'ta uygulama sunucuları kapalı, warm standby'de küçültülmüş ama çalışır durumdadır.",
      "Aurora Global Database bölgeler arası düşük gecikmeli veritabanı çoğaltması sağlar; Multi-AZ bölge kaybını karşılamaz.",
      "Route 53 sağlık denetimli failover trafiği otomatik olarak sağlıklı bölgeye yönlendirir."
    ],
    quiz: [
      { id: "5f08359a", q: "Bir ödeme uygulamasında RTO ve RPO hedefleri sıfıra çok yakın; iki bölgenin ikisi de gerçek trafiği işleyecek ve ekip yüksek maliyeti kabul ediyor. Hangi felaket kurtarma stratejisi uygundur?", options: [
  "Yedekle ve geri yükle",
  "Pilot light",
  "Sıcak yedek (warm standby)",
  "Çok bölgeli etkin-etkin (multi-site active-active)"
], obj: "h2" },
      { id: "3ca79d96", q: "Pilot light ile sıcak yedek (warm standby) stratejileri arasındaki asıl fark nedir?", options: [
  "Sıcak yedekte uygulama küçük de olsa çalışır; pilot light'ta kapalıdır",
  "Pilot light veriyi ikinci bölgeye çoğaltmaz, yalnız sıcak yedek çoğaltır",
  "Sıcak yedek tek AZ'de, pilot light birden çok bölgede çalışır",
  "Pilot light daha pahalıdır çünkü her şey tam kapasitedir"
], obj: "h2" },
      { id: "162d36a2", q: "Aurora kullanan bir uygulama için ikinci bölgede saniyeler düzeyinde RPO ile okuma kopyası isteniyor ve felakette bu kopyanın hızla birincile terfi ettirilmesi gerekiyor. Hangi özellik uygundur?", options: [
  "RDS Multi-AZ dağıtımı",
  "Günde bir anlık görüntüyü başka bölgeye kopyalamak",
  "Aurora Global Database",
  "S3 bölgeler arası çoğaltma"
], obj: "h3" },
      { id: "f03b34ba", q: "Birincil bölgedeki uygulama sağlık denetimini geçemediğinde kullanıcıların kendiliğinden ikincil bölgeye yönlendirilmesi isteniyor. Hangi çözüm bunu sağlar?", options: [
  "Route 53 basit (simple) yönlendirme ile iki bölgenin IP adresini tek kayda yazmak",
  "Route 53 sağlık denetimli failover yönlendirme politikası",
  "ALB'de çapraz bölge (cross-zone) yük dengelemeyi tüm hedef gruplarda açmak",
  "AWS Backup kasası kilidi"
], obj: "h4" },
      { id: "92386abf", q: "Şirket RPO'yu 24 saatten 5 dakikaya indirmek istiyor. Aşağıdakilerden hangisi doğrudan RPO'yu etkiler?", options: [
  "Hazır AMI sayısını artırmak",
  "Route 53 kayıtlarının TTL değerini düşürmek",
  "Auto Scaling grubunun en küçük kapasitesini artırmak",
  "Veri çoğaltma veya yedekleme sıklığını artırmak (sürekli çoğaltma)"
], obj: "h1" }
    ],
    interview: [
      { q: "Pilot light ile warm standby arasındaki fark nedir?", a: "İkisinde de çekirdek veri çoğaltılır. Pilot light'ta uygulama sunucuları kapalıdır ve olayda açılır; warm standby'de küçültülmüş ama çalışan bir kopya vardır, olayda büyütülür. İkincisi daha hızlı ve daha pahalıdır." },
      { q: "RPO'yu düşürmek için ne yaparsın?", a: "Çoğaltma ya da yedekleme sıklığını artırırım, mümkünse sürekli çoğaltmaya geçerim; çünkü RPO kaybedilebilecek verinin tazeliğine bağlıdır." },
      { q: "RTO'yu kısaltan adımlar nelerdir?", a: "Hazır AMI ve başlatma şablonları, Auto Scaling, altyapının koddan kurulması, Elastic Disaster Recovery ve düşük TTL'li, sağlık denetimli Route 53 yönlendirmesi." }
    ],
    vocab: [
      { term: "Failover", tr: "yük devri", ex: "Route 53 handles the failover." },
      { term: "Warm standby", tr: "sıcak yedek", ex: "Run a scaled-down copy as a warm standby." },
      { term: "Pilot light", tr: "pilot ışığı", ex: "Keep only the core running as a pilot light." },
      { term: "Active-active", tr: "etkin-etkin", ex: "Both Regions serve traffic in an active-active setup." },
      { term: "Replication lag", tr: "çoğaltma gecikmesi", ex: "Monitor the replication lag." }
    ],
    resources: [
      { title: "AWS'te iş yükleri için felaket kurtarma", url: "https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-workloads-on-aws.html", type: "doc", why: "Strateji ve RTO/RPO tanımları", level: "orta", lang: "EN" },
      { title: "Bulutta felaket kurtarma seçenekleri", url: "https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html", type: "doc", why: "Dört stratejinin karşılaştırması", level: "orta", lang: "EN" }
    ],
    sources: [SAA]
  };

  /* 51 ─────────────────────────────── Hibrit bağlantı yedeği: Direct Connect ve Site-to-Site VPN */
  L[51] = {
    hook: "Şirketin hattı kesilirse AWS'teki uygulama ofisten görünmez olur. Tek bağlantı güzel çalışırken yedek yolu planlamak, kesinti anında dakika kazandırır; hangi yedeğin yeterli olduğunu bütçe ve süre belirler.",
    homework: "Şirket ağı ile AWS arasında bir bağlantı tasarla: birincil yol, yedek yol ve her ikisi çökerse ne olacağı. Her seçeneğin yanına tahmini kurulum süresi (gün/hafta), maliyet düzeyi (düşük/orta/yüksek) ve neyi koruduğunu (kablo, cihaz, konum) yaz.",
    warmup: {
      recap: [
        { point: "Direct Connect özel bir fiziksel hattır; internete bağlı değildir ve varsayılan olarak şifrelemez.", example: "Ofis ile Direct Connect konumu arası hat" },
        { point: "Site-to-Site VPN, internet üzerinde IPsec tünelleriyle şirket ağını AWS'ye bağlar.", example: "İki tünelli VPN bağlantısı" }
      ],
      concepts: [
        { term: "BGP", tr: "Dinamik yönlendirme protokolü", summary: "Şirket ağı ile AWS arasında hangi ön eklerin hangi yoldan ulaşılabilir olduğunu karşılıklı bildirir; yedek yola otomatik geçişi sağlar.", example: "Aynı ön eki iki yoldan duyurmak" },
        { term: "Dayanıklılık modeli", tr: "Arızaya dayanma düzeyi", summary: "Direct Connect'te tek bağlantıdan, ayrı cihazlara, ayrı konumlara uzanan kademeli tasarımlardır; seviye arttıkça dayanıklılık ve maliyet artar.", example: "İki ayrı konumda ayrı bağlantılar" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Bir hastane, hasta kayıtlarını AWS'te çalıştırıyor ve şirket içi sistemlerle Direct Connect üzerinden konuşuyor. Bir sabah hattı bir kazıcı kopardı. Yedek yol olsaydı kayıtlar akmaya devam edecekti. Sınavda bu, 'en düşük maliyetli yedek mi, en dayanıklı yedek mi' sorusuna dönüşür." },
      { t: "steps", h: "Yedek seçenekleri karşılaştırması", items: [
        "Site-to-Site VPN yedek: kurulumu hızlıdır (dakikalar-saatler), maliyeti düşüktür, internet üzerinden çalışır ve IPsec ile şifreler. Bant genişliği ve gecikme Direct Connect kadar öngörülebilir değildir. Direct Connect varken en düşük maliyetli yedek bu seçenektir.",
        "İkinci Direct Connect: farklı cihaz ya da farklı konumda ikinci bağlantı. Performans özelliklerini korur, en yüksek dayanıklılığı verir; ancak sipariş ve kurulum süresi uzun, maliyet yüksektir.",
        "AWS Client VPN: bireysel kullanıcıların uzaktan erişimi içindir, site-to-site yedek bağlantı olarak seçilmez.",
        "VPC peering: iki VPC'yi bağlar; şirket ağını AWS'ye bağlamaz.",
        "Karar kuralı: 'en düşük maliyet/hızlı kurulum' denirse VPN, 'maksimum dayanıklılık, maliyet ikincil' denirse ayrı konumlarda ikinci Direct Connect."
      ] },
      { t: "steps", h: "Dayanıklılık düzeyleri ve yönlendirme", items: [
        "Tek bağlantı: tek hata noktası. Aynı konumda iki bağlantı: bağlantı arızasını karşılar ama konum kaybını karşılamaz.",
        "Ayrı konumlarda ayrı cihazlarda sonlanan bağlantılar: konum ya da cihaz kaybını karşılar; en yüksek dayanıklılık modeli budur. Ayrıntı için Direct Connect dayanıklılık araç setini oku.",
        "Aynı ön ek hem Direct Connect hem VPN'den BGP ile duyurulursa, AWS rota önceliğinde Direct Connect rotalarını VPN rotalarından önce tercih eder; VPN bu yüzden yedekte kalır.",
        "Direct Connect varsayılan olarak şifrelemez. Şifreleme gerekirse Direct Connect üzerinden Site-to-Site VPN (IPsec) kurulabilir ya da destekleyen bağlantılarda MACsec kullanılır.",
        "Birden çok VPC ve bölgeye erişim için Direct Connect gateway ve Transit Gateway düşünülür."
      ] },
      { t: "box", h: "Hızlı eleme", text: "Hızlı ve ucuz yedek: Site-to-Site VPN. En dayanıklı: ayrı konumlarda ikinci Direct Connect. Kullanıcı uzaktan erişimi: Client VPN. VPC'ler arası: peering/Transit Gateway. Hat şifreleme: Direct Connect üzerinde VPN. Birincil Direct Connect, yedek VPN ise performans düşüşü kabul edilmelidir." },
      { t: "warn", h: "Tuzak", text: "Direct Connect'i 'özel olduğu için şifrelidir' sanmak. Bir de VPN yedeğinin Direct Connect ile aynı bant genişliğini vereceğini varsaymak: internet üzerindedir ve tünel başına bant genişliği sınırlıdır. Ve iki bağlantıyı aynı konumda aynı cihaza bağlayıp 'yedek var' demek: tek hata noktası kalır." }
    ],
    objectives: [
      { id: "h1", text: "Direct Connect için en düşük maliyetli ve hızlı kurulan yedeği (Site-to-Site VPN) seçebilirsin." },
      { id: "h2", text: "Tek konum, ayrı cihaz ve ayrı konum tasarımlarının dayanıklılık farkını açıklayabilirsin." },
      { id: "h3", text: "Aynı ön ekin iki yoldan duyurulmasında rota önceliğini ve VPN yedeğinin sınırlarını bilirsin." },
      { id: "h4", text: "Direct Connect'in varsayılan olarak şifrelemediğini ve VPN ile şifrelemeyi açıklayabilirsin." }
    ],
    summary: [
      "Direct Connect'in en düşük maliyetli ve hızlı kurulan yedeği Site-to-Site VPN'dir.",
      "En yüksek dayanıklılık ayrı konumlarda ayrı bağlantılarla sağlanır; aynı konumdaki iki bağlantı konum kaybını karşılamaz.",
      "Aynı ön ek iki yoldan duyurulursa Direct Connect rotası VPN rotasından önce gelir.",
      "VPN yedeği internet üzerindedir; bant genişliği ve gecikme Direct Connect kadar öngörülebilir değildir.",
      "Direct Connect varsayılan olarak şifrelemez; IPsec için üzerinde VPN kurulur."
    ],
    quiz: [
      { id: "91e6b4e5", q: "Şirketin üretim ağı tek bir Direct Connect bağlantısıyla AWS'ye bağlı. Bağlantı kesilirse devreye girecek, en düşük maliyetli ve kolay kurulan yedek yol isteniyor. Ne yapılmalıdır?", options: [
  "Mevcut ağ geçidine bir Site-to-Site VPN bağlantısı eklemek",
  "Farklı bir konumda ikinci bir Direct Connect bağlantısı sipariş etmek",
  "AWS Client VPN uç noktası kurmak",
  "VPC peering bağlantısı eklemek"
], obj: "h1" },
      { id: "29dfda29", q: "Kritik bir iş yükü için Direct Connect bağlantısında bir konumun tamamen kaybına dayanıklılık isteniyor; maliyet ikincil bir kaygı. Hangi tasarım uygundur?", options: [
  "Aynı konumda iki bağlantıyı aynı cihaza bağlamak",
  "Tek bağlantıyı daha yüksek bant genişliğine yükseltmek",
  "İki ayrı Direct Connect konumunda, her birinde ayrı cihazda sonlanan ayrı bağlantılar",
  "Konum yedeği olarak yalnız bir Site-to-Site VPN bağlantısı eklemek"
], obj: "h2" },
      { id: "ddf8a831", q: "Aynı şirket içi ön ek hem Direct Connect hem de Site-to-Site VPN üzerinden BGP ile AWS'ye bildirildi. AWS varsayılan olarak trafik için hangi yolu tercih eder?", options: [
  "VPN yolunu, çünkü şifrelidir",
  "Direct Connect yolunu; VPN yedekte kalır",
  "Trafiği iki yol arasında rastgele böler",
  "Çakışma hatası verip ikisini de devre dışı bırakır"
], obj: "h3" },
      { id: "6a9ddb2d", q: "Bir kurum, Direct Connect üzerinden geçen trafiğin ağ katmanında IPsec ile şifrelenmesini istiyor. Direct Connect varsayılan olarak veriyi şifrelemediğine göre ne yapmalıdır?", options: [
  "Direct Connect zaten otomatik şifreler, ek bir şey yapmamak",
  "VPC'ye bir NAT Gateway eklemek",
  "Sadece S3 gateway endpoint kullanmak",
  "Direct Connect üzerinden bir Site-to-Site VPN tüneli kurmak"
], obj: "h4" },
      { id: "16d96d40", q: "Birincil Direct Connect bağlantısı yüksek bant genişliği taşıyor. Yedek olarak yalnız bir Site-to-Site VPN kuruldu. Direct Connect kesildiğinde en gerçekçi beklenti hangisidir?", options: [
  "Trafik VPN'e geçer ve bant genişliği ile gecikme Direct Connect ile aynı kalır, çünkü hat özeldir",
  "Bağlantı otomatik olarak yedek ikinci Direct Connect'e geçer",
  "Trafik VPN'e geçer; bant genişliği ve gecikme Direct Connect'ten kötü olabilir",
  "Yük dengeleyici trafiği otomatik olarak S3'e yönlendirir"
], obj: "h3" }
    ],
    interview: [
      { q: "Direct Connect'in yedeği olarak neden VPN seçilir?", a: "Hızlı kurulur, ucuzdur ve IPsec ile şifreler. Aynı ön ek BGP ile iki yoldan duyurulduğunda Direct Connect öncelikli olduğu için VPN yedekte bekler. Bant genişliği ve gecikmenin düşebileceği kabul edilir." },
      { q: "En yüksek dayanıklılık için Direct Connect nasıl tasarlanır?", a: "Ayrı konumlarda, ayrı cihazlarda sonlanan ayrı bağlantılarla; böylece tek bir bağlantı, cihaz ya da konum kaybı trafiği kesmez." },
      { q: "Direct Connect trafiği şifreli mi?", a: "Varsayılan olarak değil. Şifreleme için Direct Connect üzerinden Site-to-Site VPN (IPsec) kurulur ya da destekleyen bağlantılarda MACsec kullanılır." }
    ],
    vocab: [
      { term: "Backup path", tr: "yedek yol", ex: "Add a VPN as a backup path." },
      { term: "Resiliency", tr: "dayanıklılık", ex: "Design for maximum resiliency." },
      { term: "Tunnel", tr: "tünel", ex: "Each VPN connection has two tunnels." },
      { term: "Route priority", tr: "rota önceliği", ex: "Direct Connect has a higher route priority than VPN." },
      { term: "Encryption in transit", tr: "iletimde şifreleme", ex: "Use IPsec for encryption in transit." }
    ],
    resources: [
      { title: "Direct Connect dayanıklılık araç seti", url: "https://docs.aws.amazon.com/directconnect/latest/UserGuide/resiliency_toolkit.html", type: "doc", why: "Dayanıklılık modelleri", level: "orta", lang: "EN" },
      { title: "AWS Site-to-Site VPN nedir", url: "https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html", type: "doc", why: "VPN tünelleri ve yedek kullanım", level: "orta", lang: "EN" }
    ],
    sources: [SAA]
  };
})();

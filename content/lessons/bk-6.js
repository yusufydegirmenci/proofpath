/* Backend / AWS · sabit dersler 31-36 */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).bk = (window.PP_LESSONS.bk || {}));
  var DOC = "https://docs.aws.amazon.com/";
  var SKILL = { title: "AWS Skill Builder (ücretsiz dijital kurslar)", url: "https://skillbuilder.aws/", type: "course", level: "başlangıç", lang: "EN" };
  var EXAM = { title: "AWS Certified Developer – Associate", url: "https://aws.amazon.com/certification/certified-developer-associate/", type: "doc", level: "orta", lang: "EN" };
  function res(a, why) { var o = {}; for (var k in a) o[k] = a[k]; o.why = why; return o; }

  /* 31 ─────────────────────────────── Retry, idempotency, backoff */
  L[31] = {
    hook: "Dağıtık sistemde 'hata olmaz' yoktur; 'hata olunca ne olur' vardır.",
    homework: "Bir ödeme isteği ağ zaman aşımına uğradı. İstemci tekrar denerse çift ödeme olmaması için ne yapılmalı?",
    warmup: {
      recap: [{ point: "SQS en az bir kez teslim eder.", example: "Çift mesaj" }, { point: "DynamoDB kısıtlanabilir.", example: "Throttling" }],
      concepts: [
        { term: "Exponential backoff", tr: "Üstel geri çekilme", summary: "Her başarısız denemeden sonra bekleme süresini katlayarak artırmak.", example: "100ms, 200ms, 400ms" },
        { term: "Idempotency key", tr: "Tekrar anahtarı", summary: "Aynı isteğin tekrarında aynı sonucu vermek için isteğe eşlik eden benzersiz kimlik.", example: "Idempotency-Key: 7f3a..." }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Müşteri 'Öde'ye bastı, ağ koptu, uygulama aynı isteği tekrar gönderdi. Sistem iki kez tahsilat yaparsa güven kaybedersin. Güvenli tekrar için idempotency şart." },
      { t: "steps", h: "Yeniden deneme ilkeleri", items: [
        "Sadece geçici hataları dene: zaman aşımı, 429, 5xx, kısıtlanma. 400/403/404'ü deneme.",
        "Üstel geri çekilme: bekleme katlanarak artar.",
        "Jitter (rastgelelik): herkes aynı anda tekrar denemesin diye bekleme süresine rastgele sapma ekle.",
        "Üst sınır: en fazla N deneme ve toplam süre.",
        "AWS SDK'ları bunu varsayılan yapar; ayarlanabilir."
      ] },
      { t: "cmd", lang: "python", text: "import random, time\ndef cagir(fn, deneme=5):\n    for i in range(deneme):\n        try:\n            return fn()\n        except GeciciHata:\n            time.sleep(random.uniform(0, min(10, 0.1 * 2 ** i)))\n    raise" },
      { t: "steps", h: "Idempotency nasıl sağlanır?", items: [
        "İstemci benzersiz anahtar üretir (UUID) ve her tekrarda aynı anahtarı gönderir.",
        "Sunucu anahtarı kaydeder: işlenmişse kayıtlı sonucu döner, yeniden işlemez.",
        "DynamoDB koşullu yazma: attribute_not_exists(IslemId) ile tekrar yazmayı reddet.",
        "SQS FIFO: MessageDeduplicationId ile 5 dakika içinde tekrarı engeller.",
        "Lambda Powertools idempotency yardımcıları."
      ] },
      { t: "steps", h: "Dayanıklılık kalıpları", items: [
        "DLQ: tekrar denemeye rağmen başarısız mesajı ayır.",
        "Circuit breaker (devre kesici): sürekli hata veren bağımlılığa istek göndermeyi geçici durdur.",
        "Timeout: sonsuz beklemeyi önle; kısa ve bilinçli zaman aşımı.",
        "Bulkhead: kaynakları izole et, bir bağımlılık hepsini tüketmesin.",
        "Graceful degradation: özellik çalışmazsa temel işlev devam etsin."
      ] },
      { t: "box", h: "Retry storm", text: "Tüm istemciler aynı anda ve hemen yeniden denerse arızalı servis daha da yüklenir ve toparlanamaz. Backoff + jitter bunu önler." },
      { t: "warn", h: "Tuzak", text: "Idempotent olmayan işlemde (POST ödeme) körü körüne yeniden deneme. Önce idempotency anahtarı tasarla, sonra retry ekle." }
    ],
    quiz: [
      { id: "62e815d8", q: "Yeniden denemelerin aynı anda yığılmasını önleyen teknik hangisidir?", options: ["Jitter", "Şifreleme", "Sharding", "Snapshot"] },
      { id: "6c0dbbd0", q: "Hangi hata için yeniden deneme MANTIKLI DEĞİLDİR?", options: ["400 Bad Request", "503", "429", "Zaman aşımı"] },
      { id: "79a8ef0a", q: "Ödemede çift tahsilatı önleyen temel yöntem nedir?", options: ["Idempotency anahtarı", "Daha hızlı ağ", "Daha büyük disk", "Log tutmak"] },
      { id: "b564bef2", q: "Sürekli hata veren bağımlılığa istek göndermeyi geçici durduran kalıp nedir?", options: ["Circuit breaker", "Blue/Green", "Fan-out", "Canary"] },
      { id: "63b5abfc", q: "DynamoDB ile tekrar yazmayı engelleyen mekanizma hangisidir?", options: ["Koşullu yazma", "Scan", "Stream", "TTL"] }
    ],
    interview: [
      { q: "Idempotency nedir, nasıl uygularsın?", a: "Aynı işlemin birden çok kez uygulanmasının tek kez uygulamayla aynı sonucu vermesidir. İstemci benzersiz anahtar gönderir, sunucu bu anahtarı koşullu yazma ile kaydeder; tekrar gelirse kayıtlı sonucu döner." },
      { q: "Exponential backoff with jitter neden kullanılır?", a: "Backoff, arızalı servise yeniden istek sıklığını azaltır. Jitter, birçok istemcinin aynı anda tekrar denemesini (retry storm) engeller." }
    ],
    vocab: [
      { term: "Retry", tr: "yeniden denemek", ex: "Retry on timeout." },
      { term: "Backoff", tr: "geri çekilme", ex: "Use exponential backoff." },
      { term: "Jitter", tr: "rastgele sapma", ex: "Add jitter." },
      { term: "Transient", tr: "geçici", ex: "A transient error." },
      { term: "Duplicate", tr: "mükerrer", ex: "Reject duplicate requests." }
    ],
    resources: [
      { title: "Amazon Builders' Library: Timeout, retry ve jitter", url: "https://builder.aws.com/content/3EumjoZascWd1oZiEgL8ORlv3qE/timeouts-retries-and-backoff-with-jitter", type: "article", why: "Amazon Builders' Library", level: "orta", lang: "EN" },
      { title: "Powertools for AWS Lambda: Idempotency", url: "https://docs.powertools.aws.dev/lambda/python/latest/utilities/idempotency/", type: "doc", why: "Hazır yardımcı", level: "ileri", lang: "EN" }
    ],
    sources: [EXAM]
  };

  /* 32 ─────────────────────────────── EC2, ELB, Auto Scaling */
  L[32] = {
    hook: "Bazen sunucu gerçekten gerekir. O zaman bir değil, birden çok ve otomatik ölçeklenen sunucu.",
    homework: "ALB arkasında 2 AZ'ye yayılmış, Auto Scaling grubuyla ölçeklenen bir web uygulamasını çiz.",
    warmup: {
      recap: [{ point: "AZ'ler bağımsız veri merkezleridir.", example: "Çoklu AZ" }],
      concepts: [
        { term: "EC2", tr: "Sanal sunucu", summary: "Bulutta kiralanan, işletim sistemi seviyesinde kontrol veren sanal makine.", example: "t3.micro" },
        { term: "Auto Scaling Group", tr: "Otomatik ölçekleme grubu", summary: "Yüke göre örnek sayısını artırıp azaltan ve sağlıksızı yenileyen grup.", example: "min 2, max 10" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Özel yazılım kuran, sürekli çalışan bir uygulama için EC2 gerekir. Tek sunucu tek hata noktasıdır. ALB + Auto Scaling ile yük dağılır, bozulan sunucu otomatik yenilenir." },
      { t: "steps", h: "EC2 temelleri", items: [
        "AMI: işletim sistemi + yazılım şablonu. Örnek türü: CPU/bellek boyutu (t, m, c, r aileleri).",
        "Fiyatlandırma: On-Demand (esnek), Reserved/Savings Plans (1-3 yıl taahhütle indirimli), Spot (kesilebilir, çok ucuz).",
        "EBS: örnek diski (kalıcı). Instance store: geçici, örnekle ölür.",
        "User data: ilk açılışta çalışan betik. Örnek profili (instance profile) ile rol.",
        "Metadata servisi (IMDSv2): örnek bilgisi ve geçici kimlik; IMDSv2 zorunlu tut."
      ] },
      { t: "steps", h: "Yük dengeleyiciler", items: [
        "ALB (Application): HTTP/HTTPS, yol ve host tabanlı yönlendirme, WebSocket. Katman 7.",
        "NLB (Network): TCP/UDP, çok yüksek performans, sabit IP. Katman 4.",
        "GWLB: güvenlik cihazları için.",
        "Hedef grubu ve sağlık denetimi: sağlıksız hedefe trafik gitmez.",
        "Sticky session, TLS sonlandırma (ACM sertifikası)."
      ] },
      { t: "steps", h: "Auto Scaling", items: [
        "Başlatma şablonu (launch template): AMI, tür, güvenlik grubu.",
        "Min/istenen/maks sayı; birden çok AZ'ye yayılır.",
        "Ölçekleme politikaları: hedef takibi (ortalama CPU %50), adımlı, zamanlanmış, tahmine dayalı.",
        "Soğuma süresi (cooldown) ve ısınma: yüzlerce ardışık ölçeklemeyi önler."
      ] },
      { t: "box", h: "Durumsuz tasarım", text: "Ölçeklemeye uygun uygulama oturum ve dosyaları örnek üzerinde tutmaz; oturumu ElastiCache/DynamoDB'ye, dosyayı S3'e koyar. Böylece herhangi bir örnek silinebilir." },
      { t: "warn", h: "Tuzak", text: "Tek örnek ve elle yama: örnek bozulursa servis durur. En az iki AZ'de ASG ve sağlık denetimi kullan; örnekleri 'evcil hayvan' değil 'sürü' olarak gör." }
    ],
    quiz: [
      { id: "eb41faa7", q: "HTTP yol tabanlı yönlendirme yapan yük dengeleyici hangisidir?", options: ["ALB", "NLB", "Route 53 kaydı", "Gateway endpoint"] },
      { id: "34eae9a5", q: "Kesilebilir ama çok ucuz EC2 seçeneği hangisidir?", options: ["Spot", "On-Demand", "Dedicated Host", "Reserved"] },
      { id: "eec64949", q: "Sağlıksız örneği otomatik yenileyen yapı hangisidir?", options: ["Auto Scaling Group", "Subnet", "Bucket", "Alias"] },
      { id: "c560d878", q: "Örnekle birlikte silinen geçici disk hangisidir?", options: ["Instance store", "EBS", "S3", "EFS"] },
      { id: "aa894bc2", q: "Hedef takibi ölçekleme politikası ne yapar?", options: ["Bir metriği hedef değerde tutacak şekilde ölçekler", "Her gün aynı saatte kapatır", "Sadece alarm gönderir", "Örnekleri şifreler"] }
    ],
    interview: [
      { q: "ALB ve NLB farkı?", a: "ALB katman 7'de HTTP/HTTPS, yol ve host tabanlı yönlendirme sunar. NLB katman 4'te TCP/UDP trafiği çok yüksek performansla ve sabit IP ile taşır." },
      { q: "Yüksek erişilebilir web uygulamasını nasıl tasarlarsın?", a: "En az iki AZ'de Auto Scaling grubu, önünde ALB ve sağlık denetimi, durum bilgisini örnek dışında (S3, DynamoDB, ElastiCache) tutan durumsuz uygulama ve çoklu AZ veritabanı." }
    ],
    vocab: [
      { term: "Instance", tr: "örnek (sunucu)", ex: "Launch an instance." },
      { term: "AMI", tr: "makine imajı", ex: "Create a custom AMI." },
      { term: "Load balancer", tr: "yük dengeleyici", ex: "Put the instances behind a load balancer." },
      { term: "Health check", tr: "sağlık denetimi", ex: "Configure a health check." },
      { term: "Scale out", tr: "yatay genişlemek", ex: "Scale out under load." }
    ],
    resources: [
      { title: "Amazon EC2 Kullanıcı Kılavuzu (Linux)", url: DOC + "AWSEC2/latest/UserGuide/concepts.html", type: "doc", why: "Resmî rehber", level: "başlangıç", lang: "EN" },
      { title: "Elastic Load Balancing Kılavuzu", url: DOC + "elasticloadbalancing/latest/userguide/what-is-load-balancing.html", type: "doc", why: "ALB ve NLB", level: "orta", lang: "EN" }
    ],
    sources: [EXAM]
  };

  /* 33 ─────────────────────────────── VPC ve security groups */
  L[33] = {
    hook: "Kendi özel ağın bulutta: kimin içeri gireceğini, kimin çıkacağını sen belirlersin.",
    homework: "2 AZ'li bir VPC çiz: 2 public, 2 private subnet. Veritabanı ve ALB nerede durur, internet çıkışı nasıl olur?",
    warmup: {
      recap: [{ point: "RDS özel alt ağda olmalıdır.", example: "Private subnet" }, { point: "CIDR ağ aralığıdır.", example: "10.0.0.0/16" }],
      concepts: [
        { term: "VPC", tr: "Sanal özel bulut", summary: "AWS içinde yalıtılmış, kendi IP aralığın olan sanal ağ.", example: "10.0.0.0/16" },
        { term: "Security group", tr: "Güvenlik grubu", summary: "Örnek düzeyinde durum bilgili (stateful) sanal güvenlik duvarı.", example: "Giriş: 443, kaynak: ALB SG" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Lambda veya EC2 özel bir RDS'e ulaşamıyor (zaman aşımı). Sorun neredeyse her zaman alt ağ, yönlendirme tablosu veya güvenlik grubundadır." },
      { t: "steps", h: "Ağ bileşenleri", items: [
        "Subnet: VPC'nin bir AZ'deki alt ağı. Public: internet geçidine (IGW) yönlendirme var. Private: yok.",
        "Internet Gateway (IGW): VPC ile internet arası çift yönlü kapı.",
        "NAT Gateway: private subnet'in internete çıkışı (içeri bağlantı kurulamaz). Public subnet'te durur.",
        "Route table: trafiğin nereye gideceği (0.0.0.0/0 → IGW).",
        "VPC endpoint: internete çıkmadan AWS servisine özel bağlantı (S3, DynamoDB için gateway endpoint, diğerleri için interface endpoint).",
        "VPC peering ve Transit Gateway: VPC'leri birbirine bağlar."
      ] },
      { t: "steps", h: "Security group ve NACL", items: [
        "Security group: örnek/ENI düzeyi, SADECE izin kuralları, durum bilgili (dönüş trafiği otomatik izinli), varsayılan hepsi giden izinli.",
        "Başka bir güvenlik grubunu kaynak gösterebilirsin (ALB SG → uygulama SG → DB SG zinciri).",
        "NACL: subnet düzeyi, izin ve ret kuralları, durumsuz (stateless; giriş ve çıkış ayrı yazılır), sıra numaralı kural."
      ] },
      { t: "box", h: "Klasik üç katman", text: "Public subnet: ALB, NAT. Private subnet (uygulama): EC2/ECS/Lambda. Private subnet (veri): RDS/ElastiCache. Güvenlik grupları katmanları zincirler: DB sadece uygulama grubundan 5432 kabul eder." },
      { t: "box", h: "Lambda ve VPC", text: "Lambda varsayılan olarak VPC dışında çalışır. Özel RDS'e erişmesi için VPC'ye bağlarsın (private subnet + güvenlik grubu). Bu durumda internete/AWS servislerine çıkmak için NAT veya VPC endpoint gerekir." },
      { t: "warn", h: "Tuzak", text: "Veritabanı güvenlik grubunda 0.0.0.0/0 açmak. Kaynak olarak yalnızca uygulamanın güvenlik grubunu göster." }
    ],
    quiz: [
      { id: "af56c241", q: "Private subnet'teki örneğin internete çıkması için gerekli olan nedir?", options: ["NAT Gateway", "Internet Gateway doğrudan", "Security group silmek", "Route 53"] },
      { id: "3bf47d88", q: "Security group için doğru ifade hangisidir?", options: ["Durum bilgilidir ve sadece izin kuralı vardır", "Durumsuzdur", "Subnet düzeyindedir", "Ret kuralı içerir"] },
      { id: "db318897", q: "İnternete çıkmadan S3'e özel erişim için ne kullanılır?", options: ["VPC gateway endpoint", "Internet Gateway", "NAT Gateway", "Direct Connect"] },
      { id: "7c0d1bf3", q: "Lambda özel RDS'e erişemiyor. İlk neye bakarsın?", options: ["VPC bağlantısı, subnet ve güvenlik grupları", "Kova politikası", "CloudFront", "KMS"] },
      { id: "f4bb20fc", q: "Public subnet'i public yapan nedir?", options: ["Internet Gateway'e giden route", "Büyük CIDR", "Adı", "Güvenlik grubu"] }
    ],
    interview: [
      { q: "Security group ve NACL farkı?", a: "Security group örnek düzeyinde, durum bilgili, sadece izin kuralları içerir. NACL subnet düzeyinde, durumsuz, izin ve ret kuralları ve sıra numarası içerir." },
      { q: "Public ve private subnet farkı?", a: "Public subnet'in route tablosunda Internet Gateway'e yönlendirme vardır. Private subnet'te yoktur; internete çıkış için NAT Gateway kullanılır." }
    ],
    vocab: [
      { term: "Subnet", tr: "alt ağ", ex: "Create a private subnet." },
      { term: "CIDR", tr: "ağ aralığı gösterimi", ex: "Use a /16 CIDR." },
      { term: "Gateway", tr: "ağ geçidi", ex: "Attach an internet gateway." },
      { term: "Route table", tr: "yönlendirme tablosu", ex: "Edit the route table." },
      { term: "Ingress", tr: "gelen trafik", ex: "Allow ingress on port 443." }
    ],
    resources: [
      { title: "Amazon VPC Kullanıcı Kılavuzu", url: DOC + "vpc/latest/userguide/what-is-amazon-vpc.html", type: "doc", why: "Resmî rehber", level: "başlangıç", lang: "EN" },
      res(SKILL, "Ağ temelleri")
    ],
    sources: [EXAM]
  };

  /* 34 ─────────────────────────────── CloudFront ve Route 53 */
  L[34] = {
    hook: "Kullanıcıya yakın sunucudan hızlı servis ve doğru adrese yönlendirme: CDN ve DNS.",
    homework: "alanadi.com'u CloudFront'a bağlayan DNS kaydını tasarla: hangi kayıt türü (A alias), hedef ne?",
    warmup: {
      recap: [{ point: "S3 statik içerik tutar.", example: "Statik site" }, { point: "HTTP başlıkları önbelleği etkiler.", example: "Cache-Control" }],
      concepts: [
        { term: "CDN", tr: "İçerik dağıtım ağı", summary: "İçeriği dünya çapındaki kenar konumlarında önbelleğe alıp kullanıcıya yakın sunar.", example: "CloudFront" },
        { term: "DNS", tr: "Alan adı sistemi", summary: "Alan adlarını IP adreslerine çeviren sistem.", example: "Route 53" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "İstanbul'daki kullanıcı Frankfurt'taki S3'ten görsel çekiyor. CloudFront görseli yakın kenar konumundan sunar, gecikme ve kaynak yükü azalır. HTTPS ve alan adını da burada çözersin." },
      { t: "steps", h: "CloudFront", items: [
        "Dağıtım (distribution): köken (origin) tanımlar: S3, ALB, API Gateway, özel HTTP sunucu.",
        "Kenar konumları (edge locations): önbellek. Hit ise kökene gitmez.",
        "TTL ve Cache-Control: ne kadar önbellekte kalacağı. Önbellek anahtarı: URL, sorgu, başlık, çerez.",
        "Geçersiz kılma (invalidation): içeriği erken temizle (maliyetli); tercihen sürümlü dosya adı kullan.",
        "OAC (Origin Access Control): S3 yalnızca CloudFront'tan okunabilsin.",
        "HTTPS: ACM sertifikası (CloudFront için us-east-1 bölgesinde), imzalı URL/çerez ile özel içerik.",
        "Lambda@Edge / CloudFront Functions: kenarda kod (yönlendirme, başlık)."
      ] },
      { t: "steps", h: "Route 53", items: [
        "Barındırılan bölge (hosted zone): alan adı kayıtlarının kapsayıcısı.",
        "Kayıt türleri: A (IPv4), AAAA (IPv6), CNAME (başka ada takma ad; kök alan adında olmaz), MX, TXT, NS.",
        "Alias kaydı: AWS kaynağına (CloudFront, ALB, S3 site) yönlendirir; kök alan adında çalışır, sorgu ücretsiz.",
        "Yönlendirme politikaları: basit, ağırlıklı, gecikme tabanlı, sağlık denetimli failover, coğrafi konum, çoklu değer.",
        "Sağlık denetimi: sağlıksız uç noktayı DNS'ten çıkar."
      ] },
      { t: "box", h: "Tipik mimari", text: "Kullanıcı → Route 53 (alias) → CloudFront → S3 (statik) ve /api/* → API Gateway/ALB. Dinamik içerikte bile bağlantı yönetimi ve TLS kenarda sonlanır." },
      { t: "box", h: "DNS TTL", text: "DNS kaydının TTL'si çözücülerin cevabı ne kadar önbellekte tutacağıdır. Geçişten önce TTL'yi kısalt." },
      { t: "warn", h: "Tuzak", text: "S3 kovasını herkese açıp CloudFront'u atlatmak. Kovayı özel tut, OAC ile sadece CloudFront'a izin ver. Ayrıca kök alan adı için CNAME değil alias kullan." }
    ],
    quiz: [
      { id: "284a0584", q: "S3'e doğrudan erişimi kapatıp sadece CloudFront'tan okutan özellik hangisidir?", options: ["Origin Access Control", "Presigned URL tek başına", "Versioning", "Lifecycle"] },
      { id: "dd258e9b", q: "Kök alan adını (example.com) CloudFront'a yönlendirmek için ne kullanılır?", options: ["Alias kaydı", "CNAME", "MX", "TXT"] },
      { id: "5248cf9e", q: "Gecikmesi en düşük bölgeye yönlendiren Route 53 politikası hangisidir?", options: ["Gecikme tabanlı", "Basit", "Ağırlıklı", "Sabit"] },
      { id: "8fba2ac6", q: "CloudFront'ta güncellenen içeriği hemen yansıtmanın alternatifi olarak önerilen yöntem?", options: ["Sürümlü dosya adı", "Daha çok bellek", "Kök hesap", "VPN"] },
      { id: "ff873066", q: "CloudFront için ACM sertifikası hangi bölgede olmalıdır?", options: ["us-east-1", "eu-central-1", "ap-south-1", "Herhangi"] }
    ],
    interview: [
      { q: "CloudFront nasıl performans sağlar?", a: "İçeriği kenar konumlarında önbelleğe alır; kullanıcı yakın noktadan alır, köken yükü ve gecikme azalır. Ayrıca bağlantı yeniden kullanımı ve TLS sonlandırma sağlar." },
      { q: "CNAME ve alias farkı?", a: "CNAME bir adı başka ada yönlendirir ve kök alan adında kullanılamaz. Alias Route 53'e özgü, AWS kaynağını işaret eder, kök adda çalışır ve sorgu ücreti yoktur." }
    ],
    vocab: [
      { term: "Edge location", tr: "kenar konumu", ex: "Content is cached at the edge." },
      { term: "Origin", tr: "köken", ex: "Set S3 as the origin." },
      { term: "Cache hit", tr: "önbellek isabeti", ex: "A cache hit is faster." },
      { term: "Hosted zone", tr: "barındırılan bölge", ex: "Create a hosted zone." },
      { term: "Record", tr: "kayıt", ex: "Add a DNS record." }
    ],
    resources: [
      { title: "Amazon CloudFront Geliştirici Kılavuzu", url: DOC + "AmazonCloudFront/latest/DeveloperGuide/Introduction.html", type: "doc", why: "Resmî rehber", level: "başlangıç", lang: "EN" },
      { title: "Amazon Route 53 Geliştirici Kılavuzu", url: DOC + "Route53/latest/DeveloperGuide/Welcome.html", type: "doc", why: "DNS kayıtları ve yönlendirme", level: "başlangıç", lang: "EN" }
    ],
    sources: [EXAM]
  };

  /* 35 ─────────────────────────────── Kinesis */
  L[35] = {
    hook: "Saniyede binlerce olay akıyor: tıklamalar, sensörler, loglar. Kinesis bu akışı yakalar.",
    homework: "Kinesis Data Streams ile SQS farkını yaz: sıra, çoklu tüketici ve saklama açısından.",
    warmup: {
      recap: [{ point: "SQS mesajı tüketilince siler.", example: "Kuyruk" }, { point: "Lambda olay kaynağı eşlemesi akıştan okur.", example: "Poll tabanlı" }],
      concepts: [
        { term: "Stream", tr: "Akış", summary: "Sürekli gelen, sıralı veri kayıtları dizisi.", example: "Tıklama akışı" },
        { term: "Shard", tr: "Parça", summary: "Akışın kapasite birimi: saniyede 1 MB / 1000 kayıt yazma, 2 MB okuma.", example: "4 shard = 4 MB/sn yazma" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "E-ticaret sitesi tıklama olaylarını gerçek zamanlı analiz etmek, hem pano güncellemek hem S3'e arşivlemek istiyor. Aynı akışı birden çok tüketici bağımsız okur." },
      { t: "steps", h: "Kinesis ailesi", items: [
        "Data Streams: gerçek zamanlı akış, sıralı, tekrar okunabilir, 24 saat-365 gün saklama.",
        "Data Firehose: akışı S3, Redshift, OpenSearch gibi hedeflere yönetilen şekilde yükler; sunucusuz, birkaç dakika tamponlar.",
        "Managed Service for Apache Flink: akış üzerinde SQL/Flink analizi.",
        "Video Streams: video akışı."
      ] },
      { t: "steps", h: "Data Streams kavramları", items: [
        "Partition key: kaydın hangi shard'a gideceğini belirler; aynı anahtar → aynı shard → sıra korunur.",
        "Sequence number: shard içindeki kayıt sırası.",
        "Üretici: PutRecord/PutRecords, KPL. Tüketici: Lambda, KCL, Firehose.",
        "On-demand veya provisioned kapasite modu; resharding (bölme/birleştirme).",
        "Gelişmiş fan-out: her tüketiciye ayrılmış 2 MB/sn."
      ] },
      { t: "box", h: "Kinesis ve SQS", text: "SQS: tek tüketici grubu, mesaj işlenince silinir, sıra yok (FIFO hariç), tekrar okunamaz. Kinesis: birden çok bağımsız tüketici, sıra shard içinde korunur, veri saklama süresi boyunca tekrar oynatılabilir." },
      { t: "box", h: "Hatalar", text: "ProvisionedThroughputExceededException: shard sınırı aşıldı. Sıcak shard: tek partition key çok yoğun. Çözüm: anahtarı dağıt, shard artır, backoff ile dene." },
      { t: "box", h: "Lambda ile", text: "Lambda shard başına bir toplu iş okur. Bir kayıt hata verirse tüm batch tekrar denenir ve shard bloklanabilir. Çözüm: BisectBatchOnFunctionError, MaximumRetryAttempts, hata hedefi (DLQ/SNS)." },
      { t: "warn", h: "Tuzak", text: "Partition key olarak düşük çeşitlilikli alan (ülke kodu) seçmek: tek shard sıcak kalır, diğerleri boş." }
    ],
    quiz: [
      { id: "391f3eb2", q: "Kayıtların hangi shard'a gideceğini ne belirler?", options: ["Partition key", "Bucket adı", "ARN", "Subnet"] },
      { id: "00fe92f5", q: "Akışı S3'e yönetilen şekilde boşaltan servis hangisidir?", options: ["Firehose", "Data Streams tek başına", "SQS", "Cognito"] },
      { id: "2c0d0fb9", q: "Aynı veriyi birden çok bağımsız tüketicinin okuyabilmesi hangi servisin avantajıdır?", options: ["Kinesis Data Streams", "SQS standart", "SNS SMS", "Route 53"] },
      { id: "61a139df", q: "Shard başına yazma sınırı nedir?", options: ["1 MB/sn veya 1000 kayıt/sn", "100 MB/sn", "1 KB/sn", "Sınırsız"] },
      { id: "06ad4c91", q: "Sıcak shard'ın çözümü hangisidir?", options: ["Partition key dağılımını iyileştirmek", "Daha çok log", "Parolayı değiştirmek", "KMS silmek"] }
    ],
    interview: [
      { q: "Kinesis Data Streams ve SQS farkı?", a: "Kinesis sıralı (shard içinde), birden çok tüketicinin okuyabildiği ve saklama süresince tekrar oynatılabilen bir akıştır. SQS mesajı bir tüketiciye teslim edip işlenince siler; sıra garantisi yalnızca FIFO'da vardır." },
      { q: "Firehose ne zaman kullanılır?", a: "Akıştaki veriyi S3, Redshift veya OpenSearch'e özel tüketici yazmadan, sunucusuz ve tamponlu yüklemek istediğimde." }
    ],
    vocab: [
      { term: "Stream", tr: "akış", ex: "Process the stream in real time." },
      { term: "Shard", tr: "parça", ex: "Add more shards." },
      { term: "Record", tr: "kayıt", ex: "Put a record." },
      { term: "Throughput", tr: "veri hacmi/hız", ex: "Increase throughput." },
      { term: "Real-time", tr: "gerçek zamanlı", ex: "Real-time analytics." }
    ],
    resources: [
      { title: "Kinesis Data Streams Geliştirici Kılavuzu", url: DOC + "streams/latest/dev/introduction.html", type: "doc", why: "Resmî rehber", level: "başlangıç", lang: "EN" },
      res(SKILL, "Veri akışı kursları")
    ],
    sources: [EXAM]
  };

  /* 36 ─────────────────────────────── STS */
  L[36] = {
    hook: "Uzun ömürlü anahtar yerine kısa ömürlü bilet: STS geçici kimlik bilgisinin kaynağıdır.",
    homework: "Hesap A'daki bir kullanıcının Hesap B'deki S3'ü okuması için gereken iki politikayı (güven ve izin) yaz.",
    warmup: {
      recap: [{ point: "Roller geçici kimlik verir.", example: "AssumeRole" }, { point: "Güven politikası kimin üstleneceğini belirler.", example: "Principal" }],
      concepts: [
        { term: "STS", tr: "Güvenlik belirteci servisi", summary: "Kısa ömürlü, sınırlı yetkili kimlik bilgisi üreten servis.", example: "AssumeRole" },
        { term: "Federation", tr: "Federasyon", summary: "Dış kimlik sağlayıcısının (Google, SAML, OIDC) kullanıcısını AWS erişimine bağlamak.", example: "Kurumsal SSO" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Geliştirme hesabındaki bir CI işi üretim hesabına dağıtım yapacak. Üretimde kalıcı anahtar yaratmak yerine CI, üretimdeki bir rolü AssumeRole ile üstlenir ve 1 saatlik geçici kimlik alır." },
      { t: "steps", h: "STS API'leri", items: [
        "AssumeRole: hesaplar arası veya aynı hesapta rol üstlenme.",
        "AssumeRoleWithWebIdentity: OIDC kimliği (Google, EKS pod'ları) ile.",
        "AssumeRoleWithSAML: kurumsal SAML kimliği ile.",
        "GetSessionToken: MFA ile oturum belirteci.",
        "GetCallerIdentity: 'ben kimim?' (izin gerektirmez)."
      ] },
      { t: "steps", h: "Dönen bilgi", items: [
        "AccessKeyId, SecretAccessKey ve SessionToken (üçü birlikte kullanılır).",
        "Süre: 15 dakika - 12 saat (rol ayarına göre; varsayılan 1 saat).",
        "Oturum politikası ile yetki daha da daraltılabilir; rol izin sınırını aşamaz."
      ] },
      { t: "cmd", lang: "bash", text: "aws sts assume-role \\\n  --role-arn arn:aws:iam::222222222222:role/UretimDeploy \\\n  --role-session-name ci-dagitim" },
      { t: "box", h: "Hesaplar arası erişim", text: "İki taraf gerekir: (1) Hedef hesaptaki rolün güven politikası kaynak hesabı/rolü Principal olarak ister. (2) Kaynak hesaptaki kimliğin kimlik politikası sts:AssumeRole iznini ister. İkisi de olmazsa AccessDenied." },
      { t: "box", h: "Güvenlik ayrıntıları", text: "ExternalId: üçüncü taraf erişiminde 'confused deputy' saldırısını önler. MFA koşulu: güven politikasına aws:MultiFactorAuthPresent. Oturum etiketleri ve CloudTrail'de oturum adıyla izlenebilirlik." },
      { t: "warn", h: "Tuzak", text: "Geçici kimlik bilgilerini dosyaya yazıp uzun süre kullanmak ve SessionToken'ı atlamak. SDK/CLI profilleri rolü otomatik üstlenip yeniler; elle token taşımayı azalt." }
    ],
    quiz: [
      { id: "1257f0e8", q: "Başka bir hesaptaki rolü üstlenmek için kullanılan STS çağrısı hangisidir?", options: ["AssumeRole", "GetObject", "PutItem", "Decrypt"] },
      { id: "8944e5cb", q: "Geçici kimlik bilgisi hangi üç parçadan oluşur?", options: ["AccessKeyId, SecretAccessKey, SessionToken", "Kullanıcı adı, parola, PIN", "Sertifika, anahtar, imza", "ARN, bölge, hesap"] },
      { id: "5da0860d", q: "Hesaplar arası rol üstlenmede hedef rolde hangi politika kimin üstleneceğini belirler?", options: ["Güven politikası", "Kova politikası", "Güvenlik grubu", "SCP"] },
      { id: "08deee6f", q: "'Ben kimim?' sorusunu cevaplayan çağrı hangisidir?", options: ["GetCallerIdentity", "ListUsers", "DescribeInstances", "GetBucketPolicy"] },
      { id: "69fa1f19", q: "Üçüncü taraf erişiminde 'confused deputy' riskini azaltan değer nedir?", options: ["ExternalId", "TTL", "CIDR", "Alias"] }
    ],
    interview: [
      { q: "Neden uzun ömürlü anahtar yerine geçici kimlik?", a: "Geçici kimlik kısa sürede biter; sızsa bile hasar süresi sınırlıdır. Rotasyon derdi yoktur ve rol bazlı en az yetki uygulanır." },
      { q: "Hesaplar arası erişim nasıl kurulur?", a: "Hedef hesapta güven politikası kaynak hesabı Principal alan bir rol oluşturulur. Kaynak hesapta kimliğe sts:AssumeRole izni verilir. Kimlik rolü üstlenip geçici anahtarlarla çağrı yapar." }
    ],
    vocab: [
      { term: "Temporary credentials", tr: "geçici kimlik bilgisi", ex: "STS issues temporary credentials." },
      { term: "Assume", tr: "üstlenmek", ex: "Assume the deploy role." },
      { term: "Session", tr: "oturum", ex: "The session expires in an hour." },
      { term: "Cross-account", tr: "hesaplar arası", ex: "Cross-account access." },
      { term: "Trust", tr: "güven", ex: "Edit the trust policy." }
    ],
    resources: [
      { title: "IAM: Geçici güvenlik kimlik bilgileri", url: DOC + "IAM/latest/UserGuide/id_credentials_temp.html", type: "doc", why: "STS ve geçici kimlik", level: "orta", lang: "EN" },
      { title: "STS API Referansı", url: DOC + "STS/latest/APIReference/welcome.html", type: "doc", why: "API'ler", level: "orta", lang: "EN" }
    ],
    sources: [EXAM]
  };
})();

/* Backend / AWS · sabit dersler 13-18 */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).bk = (window.PP_LESSONS.bk || {}));
  var DOC = "https://docs.aws.amazon.com/";
  var SKILL = { title: "AWS Skill Builder (ücretsiz dijital kurslar)", url: "https://skillbuilder.aws/", type: "course", level: "başlangıç", lang: "EN" };
  var EXAM = { title: "AWS Certified Developer – Associate", url: "https://aws.amazon.com/certification/certified-developer-associate/", type: "doc", level: "orta", lang: "EN" };
  function res(a, why) { var o = {}; for (var k in a) o[k] = a[k]; o.why = why; return o; }

  /* 13 ─────────────────────────────── RDS */
  L[13] = {
    hook: "İlişkisel veritabanını kurmak, yedeklemek ve yamalamak yerine AWS'ye bırak.",
    homework: "Multi-AZ ile Read Replica farkını bir cümlede yaz: biri neyi, diğeri neyi çözer?",
    warmup: {
      recap: [{ point: "SQL ilişkisel veritabanında çalışır.", example: "JOIN, transaction" }],
      concepts: [
        { term: "RDS", tr: "Yönetilen ilişkisel veritabanı", summary: "MySQL, PostgreSQL, MariaDB, Oracle, SQL Server motorlarını AWS yönetir: yedek, yama, izleme.", example: "db.t3.micro PostgreSQL" },
        { term: "Multi-AZ", tr: "Çoklu erişilebilirlik bölgesi", summary: "Veriyi başka bir AZ'deki yedek örneğe eşzamanlı kopyalar; arızada otomatik geçiş.", example: "Yüksek erişilebilirlik" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Muhasebe verisi ilişkilidir ve işlem garantisi ister. DynamoDB yerine RDS PostgreSQL seçersin. Gece 3'te disk dolarsa uyanmak istemezsin; yönetilen servis bunu azaltır." },
      { t: "steps", h: "Yüksek erişilebilirlik ve ölçek", items: [
        "Multi-AZ: yedek örnek, arızada otomatik failover. Multi-AZ örnek dağıtımında bekleme okuma ölçeklemez (Multi-AZ DB cluster'da okunabilir bekleme örnekleri vardır).",
        "Read Replica: okuma trafiğini dağıtır (eşzamansız kopya). Okuma ölçekler; failover amaçlı değildir.",
        "Aurora: AWS'nin MySQL/PostgreSQL uyumlu, 6 kopyalı dağıtık depolama kullanan motoru; daha hızlı geçiş ve 15 kopyaya kadar okuma."
      ] },
      { t: "steps", h: "Yedekleme ve güvenlik", items: [
        "Otomatik yedek: 1-35 gün saklama, belirli zamana geri dönüş (PITR).",
        "Manuel snapshot: silinene dek kalır.",
        "Geri yükleme her zaman YENİ bir örnek oluşturur.",
        "Şifreleme: dinlenirken KMS, aktarımda TLS. Şifreleme oluştururken seçilir.",
        "Özel alt ağ (private subnet) + güvenlik grubu: veritabanı internete açılmaz."
      ] },
      { t: "box", h: "Lambda ile bağlantı", text: "Lambda çok sayıda eşzamanlı çağrıda veritabanı bağlantılarını tüketebilir. RDS Proxy bağlantıları havuzlar ve kimlik bilgisini Secrets Manager'dan yönetir." },
      { t: "box", h: "Ne zaman RDS, ne zaman DynamoDB?", text: "Karmaşık sorgu, JOIN, raporlama, işlem bütünlüğü: RDS. Çok yüksek ölçek, tek basamaklı milisaniye, basit erişim kalıpları: DynamoDB." },
      { t: "warn", h: "Tuzak", text: "Veritabanını herkese açık (public) yapmak veya güvenlik grubunda 0.0.0.0/0 ile 5432/3306 portunu açmak. Sadece uygulamanın güvenlik grubuna izin ver." },
      {t:"steps",h:"Aurora Serverless v2 (SAA-C03)",items:["Aurora Serverless v2, Aurora küme kapasitesini Aurora kapasite birimi (ACU) cinsinden yüke göre küçük adımlarla kendiliğinden artırıp azaltır; öngörülemeyen, değişken ya da seyrek kullanılan veritabanları için uygundur.","Kapasiteyi elle seçmek yerine en az ve en çok ACU aralığı verirsin; Multi-AZ ve okuma kopyaları desteklenir. Faturalama kullanılan kapasiteye göredir.","Sabit ve öngörülebilir yoğun yükte sağlanmış (provisioned) Aurora örnekleri, özellikle taahhütli indirimle, çoğu zaman daha ucuzdur.","Serverless v1 ömrünü doldurmuştur; yeni işlerde v2 anılır. Güncel durum için resmî belgeyi oku."]}
    ],
    objectives: [
      { id: "h1", text: "Multi-AZ ile Read Replica'yı amacına göre (arıza geçişi mi, okuma ölçeği mi) ayırt edebilirsin." },
      { id: "h2", text: "Otomatik yedek (1-35 gün, PITR) ile manuel snapshot'ı ayırt edip geri yüklemenin yeni bir örnek ürettiğini açıklayabilirsin." },
      { id: "h3", text: "Lambda kaynaklı bağlantı yığılmasına RDS Proxy'yi, ağ güvenliği için özel alt ağ ve güvenlik grubunu seçebilirsin." },
      { id: "h4", text: "Bir iş yükü için RDS mi DynamoDB mi uygun olduğunu sorgu ve ölçek ihtiyacına göre belirleyebilirsin." },
      { id: "h5", text: "Aurora Serverless v2'nin ne zaman (değişken, öngörülemeyen yük) sağlanmış Aurora'ya tercih edildiğini söyleyebilirsin." }
    ],
    summary: [
      "Multi-AZ eşzamanlı bekleme örneğiyle otomatik failover sağlar ama Multi-AZ örnek dağıtımında bekleme okuma ölçeklemez (Multi-AZ DB cluster'da okunabilir bekleme örnekleri vardır); Read Replica eşzamansız kopyayla okuma yükünü dağıtır ve failover amaçlı değildir.",
      "Aurora 6 kopyalı dağıtık depolama kullanır ve 15 kopyaya kadar okuma sunar.",
      "Otomatik yedekler 1-35 gün saklanır ve belirli zamana geri dönüşe izin verir; manuel snapshot silinene dek kalır; her geri yükleme yeni bir örnek ve yeni uç nokta oluşturur.",
      "Çok sayıda eşzamanlı Lambda çağrısı bağlantıları tüketir; RDS Proxy bağlantıları havuzlar ve kimlik bilgisini Secrets Manager'dan yönetir.",
      "Veritabanı özel alt ağda durur ve güvenlik grubu yalnızca uygulamanın grubuna izin verir; 0.0.0.0/0 ile 5432/3306 açmak tipik tuzaktır.",
      "Aurora Serverless v2 kapasiteyi ACU adımlarıyla yüke göre otomatik ölçekler; değişken yükte işletme yükünü ve boşta maliyeti düşürür."
    ],
    quiz: [
      { id: "c70f3ff5", q: "Okuma trafiğini dağıtmak için hangisi kullanılır?", options: ["Read Replica", "Multi-AZ örnek dağıtımının bekleme örneği", "Snapshot", "Parameter group"], obj: "h1" },
      { id: "60057089", q: "AZ arızasında otomatik geçişi sağlayan özellik hangisidir?", options: ["Multi-AZ", "Read Replica", "Snapshot", "IAM"], obj: "h1" },
      { id: "64b4bd08", q: "Lambda'dan RDS'e çok bağlantı açılıyorsa hangisi yardımcı olur?", options: ["RDS Proxy", "S3", "CloudFront", "Route 53"], obj: "h3" },
      { id: "264e0087", q: "Bir snapshot'tan geri yükleme ne üretir?", options: ["Yeni bir veritabanı örneği", "Mevcut örneği değiştirir", "Hiçbir şey", "Yeni bir kova"], obj: "h2" },
      { id: "c66428c8", q: "Veritabanı örneği nerede olmalıdır?", options: ["Özel alt ağda", "Herkese açık alt ağda", "S3'te", "Lambda içinde"], obj: "h3" },
      { id: "77d651db", q: "Muhasebe kayıtları gibi JOIN'li raporlama ve işlem (transaction) bütünlüğü isteyen ilişkisel veri için hangisi daha uygundur?", options: ["RDS PostgreSQL","DynamoDB ile tek tablo","ElastiCache Memcached","S3 Standard"], obj: "h4" },
      { id: "7af78afb", q: "Otomatik yedekler ile manuel snapshot arasındaki saklama farkı hangisidir?", options: ["Otomatik yedek 1-35 gün saklanır; manuel snapshot siz silene dek kalır","Her ikisi de 35 gün sonra kendiliğinden silinir","Manuel snapshot 1 gün sonra silinir, otomatik yedek sonsuza kadar kalır","Otomatik yedek saklanmaz, yalnız snapshot vardır"], obj: "h2" },
      { id: "ad10cea4", q: "Gün boyu öngörülemez biçimde değişen, bazı saatlerde neredeyse hiç kullanılmayan bir uygulama MySQL uyumlu veritabanı istiyor. Kapasiteyi elle yönetmek ve tepe yüke göre sabit örnek ödemek istemiyorlar. Hangi seçenek uygundur?", options: ["En büyük örnek türünde sağlanmış tek bir RDS örneği","Aurora Global Database","Aurora Serverless v2","Amazon S3 üzerinde Athena sorguları"], obj: "h5" },
      { id: "3f95592c", q: "Okuma ağırlıklı bir RDS veritabanının okuma yükünü azaltmak için hangi İKİ çözüm uygundur?", options: ["Sağlanmış IOPS değerini düşürmek", "Veritabanını tek bir Availability Zone'a taşımak", "Bir ya da daha fazla okuma replikası eklemek", "Sık okunan sorgu sonuçlarını ElastiCache'te önbelleğe almak", "Multi-AZ DB instance dağıtımının bekleme örneğine okuma yönlendirmek"], multi: 2, obj: "h1" }
    ],
    interview: [
      { q: "Multi-AZ ile Read Replica farkı nedir?", a: "Multi-AZ yüksek erişilebilirlik içindir: eşzamanlı yedek, otomatik failover; Multi-AZ örnek dağıtımında bekleme okuma ölçeklemez (Multi-AZ DB cluster'da okunabilir bekleme örnekleri vardır). Read Replica ölçek içindir: eşzamansız kopya, okuma trafiğini dağıtır ve manuel terfi gerekir." },
      { q: "RDS ile Aurora farkı?", a: "Aurora, AWS'nin kendi dağıtık depolamasını kullanan MySQL/PostgreSQL uyumlu motorudur; genelde daha yüksek performans, hızlı failover ve daha çok replika sunar, maliyeti de farklıdır." }
    ],
    vocab: [
      { term: "Instance", tr: "örnek", ex: "Choose the DB instance class." },
      { term: "Failover", tr: "yedeğe geçiş", ex: "Automatic failover." },
      { term: "Replica", tr: "kopya", ex: "Create a read replica." },
      { term: "Snapshot", tr: "anlık görüntü", ex: "Take a snapshot." },
      { term: "Connection pool", tr: "bağlantı havuzu", ex: "Use a connection pool." }
    ],
    resources: [
      { title: "Amazon RDS Kullanıcı Kılavuzu", url: DOC + "AmazonRDS/latest/UserGuide/Welcome.html", type: "doc", why: "Resmî rehber", level: "başlangıç", lang: "EN" },
      res(SKILL, "Veritabanı kursları")
    ],
    sources: [EXAM]
  };

  /* 14 ─────────────────────────────── ElastiCache */
  L[14] = {
    hook: "En hızlı sorgu hiç yapılmayan sorgudur: önbellek.",
    homework: "En sık okunan ama nadir değişen bir veriyi seç (ör. ürün listesi). TTL'si kaç saniye olmalı ve neden?",
    warmup: {
      recap: [{ point: "Veritabanı okuması pahalıdır.", example: "RDS sorgusu" }],
      concepts: [
        { term: "Cache", tr: "Önbellek", summary: "Sık okunan veriyi hızlı belleğe koyarak veritabanı yükünü azaltma.", example: "Redis" },
        { term: "TTL", tr: "Yaşam süresi", summary: "Önbellekteki verinin ne kadar süre geçerli sayılacağı.", example: "300 saniye" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Ana sayfa her açılışta aynı 'popüler ürünler' sorgusunu çalıştırıyor. Veritabanı yoruluyor. Sonucu 60 saniye önbellekte tutarsan yük yüzlerce kat azalır." },
      { t: "steps", h: "ElastiCache motorları", items: [
        "Redis (ve Valkey): zengin veri yapıları (liste, küme, sıralı küme), kalıcılık, replikasyon, pub/sub, Multi-AZ.",
        "Memcached: basit, çok iş parçacıklı, sadece anahtar-değer, kalıcılık yok.",
        "Kullanım: oturum deposu, sıralama tabloları (leaderboard), hız sınırlama."
      ] },
      { t: "steps", h: "Önbellek stratejileri", items: [
        "Lazy loading (cache-aside): önce önbelleğe bak; yoksa veritabanından oku ve önbelleğe yaz. Sadece istenen veri önbellekte olur; ilk istek yavaş, veri eskiyebilir.",
        "Write-through: her yazmada hem veritabanı hem önbellek güncellenir. Veri taze; yazma yavaşlar ve kullanılmayan veri de önbelleğe girer.",
        "TTL: eskimeyi sınırlamak için ikisiyle birlikte kullanılır."
      ] },
      { t: "box", h: "DAX ile fark", text: "DAX yalnızca DynamoDB için, istemciyle uyumlu bellek içi önbellektir ve kod değişikliğini en aza indirir. ElastiCache genel amaçlıdır; önbellek mantığını sen yazarsın." },
      { t: "box", h: "Güvenlik", text: "ElastiCache özel alt ağda çalışır. Aktarımda TLS, dinlenirken şifreleme ve Redis AUTH/IAM kimlik doğrulama etkinleştirilir." },
      { t: "warn", h: "Tuzak", text: "Önbellek tek doğruluk kaynağı değildir; veri kaybolabilir. Kritik veriyi sadece önbelleğe yazma. Ayrıca eskimiş veriyle yanlış karar riskini TTL ve geçersiz kılma ile yönet." }
    ],
    objectives: [
      { id: "h1", text: "Lazy loading ile write-through stratejisini okuma/yazma akışına ve veri tazeliğine göre ayırt edebilirsin." },
      { id: "h2", text: "Sıralı küme, kalıcılık gibi ihtiyaçlara bakarak Redis ile Memcached arasında seçim yapabilirsin." },
      { id: "h3", text: "TTL ve geçersiz kılma ile eskimiş veri riskini sınırlayıp önbelleğin tek doğruluk kaynağı olamayacağını açıklayabilirsin." },
      { id: "h4", text: "ElastiCache ile DAX'ı (genel amaçlı mı, yalnız DynamoDB için mi) ayırt edebilirsin." }
    ],
    summary: [
      "Lazy loading (cache-aside) önce önbelleğe bakar, ıskada veritabanından okuyup yazar: sadece istenen veri önbellekte olur ama ilk istek yavaştır ve veri eskiyebilir.",
      "Write-through her yazmada önbelleği de günceller: veri taze kalır, yazma yavaşlar ve hiç okunmayacak veri de önbelleğe girebilir.",
      "Redis zengin veri yapıları, kalıcılık, replikasyon ve Multi-AZ sunar; Memcached basit, çok iş parçacıklı ve kalıcılıksızdır.",
      "DAX yalnızca DynamoDB'ye özel, istemciyle uyumlu önbellektir; ElastiCache genel amaçlıdır ve önbellek mantığını sen yazarsın.",
      "Önbellek kaybolabilir; kritik veri yalnız önbelleğe yazılmaz, eskime TTL ve geçersiz kılmayla sınırlanır."
    ],
    quiz: [
      { id: "fcadefd3", q: "Önce önbelleğe bakıp bulunamazsa veritabanından okuyup önbelleğe yazan strateji hangisidir?", options: ["Lazy loading", "Write-through", "Sharding", "Failover"], obj: "h1" },
      { id: "6e7dcbd4", q: "Sıralı küme ve kalıcılık gibi zengin özellikler hangi motorda vardır?", options: ["Redis", "Memcached", "Her ikisi eşit", "Hiçbiri"], obj: "h2" },
      { id: "fff6fdc9", q: "Verinin önbellekte ne kadar geçerli kalacağını belirleyen ayar nedir?", options: ["TTL", "ARN", "CIDR", "MTU"], obj: "h3" },
      { id: "b4d76d6c", q: "Her yazmada önbelleği de güncelleyen strateji hangisidir?", options: ["Write-through", "Lazy loading", "Read replica", "Backoff"], obj: "h1" },
      { id: "f6a2b03a", q: "Yalnızca DynamoDB okumalarını, istemci kodunu neredeyse değiştirmeden hızlandırmak için en uygun önbellek hangisidir?", options: ["DAX","ElastiCache Memcached","RDS Proxy","SQS"], obj: "h4" },
      { id: "c48213c6", q: "Ürün fiyatı veritabanında değişti ama önbellekte eski fiyat görünüyor. Bu eskimeyi sınırlamanın doğru yolu hangisidir?", options: ["Kısa bir TTL vermek ve güncellemede önbellek girişini geçersiz kılmak","TTL'yi 30 güne çıkarmak","Fiyatı yalnızca önbelleğe yazmak","Memcached'e geçmek"], obj: "h3" }
    ],
    interview: [
      { q: "Lazy loading ve write-through farkı nedir?", a: "Lazy loading okuma anında önbelleği doldurur: sadece istenen veri önbellekte olur ama ilk istek yavaş ve veri eskiyebilir. Write-through yazma sırasında önbelleği günceller: veri taze, yazma yavaş, gereksiz veri depolanabilir." },
      { q: "Redis ve Memcached arasında nasıl seçersin?", a: "Basit, çok iş parçacıklı bir önbellek yetiyorsa Memcached. Veri yapıları, kalıcılık, replikasyon ve yüksek erişilebilirlik gerekiyorsa Redis." }
    ],
    vocab: [
      { term: "Cache hit", tr: "önbellek isabeti", ex: "A high cache hit ratio." },
      { term: "Cache miss", tr: "önbellek ıskası", ex: "On a miss, query the database." },
      { term: "Eviction", tr: "tahliye (silinme)", ex: "Eviction happens when memory is full." },
      { term: "Invalidate", tr: "geçersiz kılmak", ex: "Invalidate the cache entry." },
      { term: "Session", tr: "oturum", ex: "Store sessions in Redis." }
    ],
    resources: [
      { title: "ElastiCache Kullanıcı Kılavuzu", url: DOC + "AmazonElastiCache/latest/dg/WhatIs.html", type: "doc", why: "Resmî rehber", level: "başlangıç", lang: "EN" },
      { title: "Önbellek stratejileri (AWS belgeleri)", url: DOC + "AmazonElastiCache/latest/red-ug/Strategies.html", type: "doc", why: "Lazy loading ve write-through", level: "orta", lang: "EN" }
    ],
    sources: [EXAM]
  };

  /* 15 ─────────────────────────────── Lambda */
  L[15] = {
    hook: "Sunucu yok, işletim sistemi yok: sadece kod. Olay gelince çalışır, bitince kapanır.",
    homework: "Basit bir Lambda yaz: gelen olayı (event) logla ve {\"mesaj\": \"merhaba\"} döndür. Konsoldan test et ve CloudWatch'ta logu bul.",
    warmup: {
      recap: [{ point: "Rol, servise kimlik verir.", example: "Yürütme rolü" }, { point: "S3 olay bildirimi fonksiyon tetikler.", example: "Dosya yüklendi" }],
      concepts: [
        { term: "Lambda function", tr: "Lambda fonksiyonu", summary: "Olaya tepki veren, kullandığın süre kadar ücretlenen sunucusuz kod birimi.", example: "handler(event, context)" },
        { term: "Cold start", tr: "Soğuk başlangıç", summary: "Yeni bir çalışma ortamı hazırlanırken oluşan ilk çağrı gecikmesi.", example: "Birkaç yüz ms" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Görsel yüklendiğinde küçük resim üretmek, kayıt formunu işlemek, zamanlanmış rapor çalıştırmak: Sunucu kiralamadan, trafik yoksa ücret ödemeden." },
      { t: "cmd", lang: "python", text: "import json\n\ndef handler(event, context):\n    print(json.dumps(event))\n    return {\"statusCode\": 200, \"body\": json.dumps({\"mesaj\": \"merhaba\"})}" },
      { t: "steps", h: "Önemli ayarlar", items: [
        "Bellek 128 MB - 10 GB; CPU belleğe orantılı artar.",
        "Zaman aşımı en fazla 15 dakika.",
        "Yürütme rolü: fonksiyonun yetkileri.",
        "Ortam değişkenleri: yapılandırma; hassas veriler için Secrets Manager/Parameter Store.",
        "Katmanlar (layers): paylaşılan kütüphaneler.",
        "Dağıtım paketi: zip (50 MB sıkıştırılmış, 250 MB açılmış) veya konteyner imajı (10 GB)."
      ] },
      { t: "steps", h: "Tetikleyiciler", items: [
        "Eşzamanlı (synchronous): API Gateway, SDK Invoke. Sonucu bekler; hatayı çağıran görür.",
        "Eşzamansız (asynchronous): S3, SNS, EventBridge. Hata olursa 2 kez yeniden dener; DLQ veya hata hedefine gönderilebilir.",
        "Olay kaynağı eşleme (poll tabanlı): SQS, Kinesis, DynamoDB Streams. Lambda kuyruğu/akışı okur."
      ] },
      { t: "box", h: "Eşzamanlılık", text: "Her eşzamanlı istek ayrı bir çalışma ortamı kullanır. Hesap başına varsayılan bölgesel eşzamanlılık sınırı vardır (varsayılan 1000). Ayrılmış eşzamanlılık (reserved) fonksiyona garanti ve üst sınır verir. Hazırlanmış eşzamanlılık (provisioned) soğuk başlangıcı azaltır." },
      { t: "box", h: "İyi uygulamalar", text: "Handler dışında SDK istemcilerini başlat (ortam yeniden kullanılır). /tmp varsayılan 512 MB geçici alan sunar (ayarlanarak 10 GB'a kadar). Fonksiyonu idempotent yaz: aynı olay iki kez gelebilir. Kısa ve tek amaçlı tut." },
      { t: "warn", h: "Tuzak", text: "Lambda durumsuzdur. Bir çağrıda belleğe yazdığın değerin sonraki çağrıda orada olmasına güvenme. Kalıcı veriyi DynamoDB, S3 gibi yerlere yaz." }
    ],
    objectives: [
      { id: "h1", text: "Lambda'nın temel sınırlarını (çağrı başına en fazla 15 dakika, bellek 128 MB-10 GB) bilerek uzun süren işe uygun alternatifi seçebilirsin." },
      { id: "h2", text: "Bir Lambda erişim hatasında kodda anahtar aramak yerine yürütme rolünün izinlerini bulup düzeltebilirsin." },
      { id: "h3", text: "Soğuk başlangıcı provisioned concurrency ve handler dışı başlatma gibi yöntemlerle azaltma kararını verebilirsin." },
      { id: "h4", text: "Eşzamansız çağrıdaki yeniden deneme davranışını ve bunun fonksiyonu neden idempotent yazdırdığını açıklayabilirsin." }
    ],
    summary: [
      "Bir çağrı en fazla 15 dakika sürer ve bellek 128 MB-10 GB arasında ayarlanır; CPU belleğe orantılı artar.",
      "Fonksiyonun AWS yetkisi yürütme rolünden gelir; kod içine anahtar gömülmez, hassas değerler Secrets Manager veya Parameter Store'da tutulur.",
      "Eşzamansız çağrıda (S3, SNS, EventBridge) hata olursa Lambda varsayılan olarak 2 kez daha dener, sonra DLQ veya hata hedefine gönderebilir.",
      "Soğuk başlangıç provisioned concurrency, küçük paket ve SDK istemcilerini handler dışında başlatmakla azaltılır.",
      "Lambda durumsuzdur ve aynı olay iki kez gelebilir; kalıcı veri DynamoDB veya S3'e yazılır, fonksiyon idempotent tasarlanır."
    ],
    quiz: [
      { id: "14356098", q: "Bir Lambda çağrısının en uzun süresi nedir?", options: ["15 dakika", "5 dakika", "1 saat", "Sınırsız"], obj: "h1" },
      { id: "c5c3c382", q: "Fonksiyonun AWS servislerine erişim izni nereden gelir?", options: ["Yürütme rolü", "Kodun içindeki anahtar", "Kova politikası tek başına", "Route 53"], obj: "h2" },
      { id: "f6a2a523", q: "Soğuk başlangıcı azaltmak için hangisi kullanılır?", options: ["Provisioned concurrency", "Daha uzun zaman aşımı", "Daha çok log", "Layers"], obj: "h3" },
      { id: "29d56c08", q: "Asenkron çağrıda hata olursa Lambda ne yapar?", options: ["Varsayılan olarak 2 kez daha dener", "Hemen siler", "Hiç denemez", "Kullanıcıya sorar"], obj: "h4" },
      { id: "0ce5b86c", q: "Neden Lambda idempotent yazılmalıdır?", options: ["Aynı olay birden fazla kez gelebilir", "Daha hızlı olur", "Daha ucuz olur", "Zorunlu değildir"], obj: "h4" },
      { id: "f2b72a86", q: "Tek bir adımı yaklaşık 40 dakika süren bir veri dönüştürme işi için hangi yaklaşım uygundur?", options: ["ECS/Fargate veya AWS Batch gibi uzun çalışabilen bir servis","Lambda zaman aşımını 40 dakikaya çıkarmak","Lambda belleğini 10 GB yapmak","Provisioned concurrency açmak"], obj: "h1" },
      { id: "e66a0d2b", q: "Lambda fonksiyonu DynamoDB'ye yazarken AccessDenied hatası veriyor. İlk nereye bakılır?", options: ["Fonksiyonun yürütme rolündeki izin politikalarına","Zaman aşımı ayarına","Bellek boyutuna","Layer sürümüne"], obj: "h2" }
    ],
    interview: [
      { q: "Cold start nedir, nasıl azaltılır?", a: "Yeni bir çalışma ortamı hazırlanırken oluşan ilk çağrı gecikmesidir. Provisioned concurrency, daha küçük paket, SDK'yı handler dışında başlatmak ve uygun çalışma zamanı seçmek gecikmeyi azaltır." },
      { q: "Eşzamanlı ve eşzamansız çağrı farkı?", a: "Eşzamanlıda çağıran sonucu bekler ve hatayı kendisi yönetir (API Gateway). Eşzamansızda olay kuyruğa alınır, Lambda 2 kez yeniden dener ve başarısızlar DLQ veya hedefe gider (S3, SNS)." },
      { q: "Lambda'nın sınırları nelerdir?", a: "Çağrı başına en fazla 15 dakika, 10 GB bellek, /tmp alanı, paket boyutu sınırı ve bölgesel eşzamanlılık kotası vardır." }
    ],
    vocab: [
      { term: "Handler", tr: "giriş fonksiyonu", ex: "The handler receives the event." },
      { term: "Event", tr: "olay", ex: "The event contains the request." },
      { term: "Invocation", tr: "çağrı", ex: "Each invocation is billed." },
      { term: "Concurrency", tr: "eşzamanlılık", ex: "Limit the concurrency." },
      { term: "Timeout", tr: "zaman aşımı", ex: "Increase the timeout." }
    ],
    resources: [
      { title: "AWS Lambda Geliştirici Kılavuzu", url: DOC + "lambda/latest/dg/welcome.html", type: "doc", why: "Resmî rehber", level: "başlangıç", lang: "EN" },
      res(SKILL, "Lambda temelleri kursu")
    ],
    sources: [EXAM]
  };

  /* 16 ─────────────────────────────── API Gateway */
  L[16] = {
    hook: "Lambda'yı internete açan kapı: API Gateway.",
    homework: "REST API ve HTTP API arasında bir tablo yap: hangisi daha ucuz, hangisi daha çok özellik sunuyor?",
    warmup: {
      recap: [{ point: "HTTP istek-cevap modeli.", example: "GET /orders" }, { point: "Lambda olayı JSON alır.", example: "event" }],
      concepts: [
        { term: "API Gateway", tr: "API ağ geçidi", summary: "API oluşturan, yayınlayan, güvenliğini sağlayan ve arka uçlara yönlendiren yönetilen servis.", example: "GET /orders → Lambda" },
        { term: "Stage", tr: "Aşama", summary: "API'nin dağıtılmış sürümü: dev, prod.", example: "/prod/orders" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Mobil uygulamanın çağıracağı bir REST API gerekir. API Gateway; yetkilendirme, hız sınırlama, önbellek, CORS ve Lambda entegrasyonunu tek yerde yönetir." },
      { t: "steps", h: "API türleri", items: [
        "HTTP API: daha ucuz, düşük gecikmeli, JWT yetkilendirici ve Lambda proxy için yeterli.",
        "REST API: daha çok özellik: API anahtarları, kullanım planları, istek doğrulama, WAF, önbellek, ayrıntılı dönüşümler.",
        "WebSocket API: çift yönlü gerçek zamanlı (sohbet)."
      ] },
      { t: "steps", h: "Entegrasyon türleri", items: [
        "Lambda proxy: istek olduğu gibi Lambda'ya gider, Lambda tam HTTP cevabı döndürür (statusCode, headers, body). En yaygın.",
        "Lambda custom (non-proxy): eşleme şablonlarıyla dönüşüm.",
        "HTTP: başka bir HTTP uç noktasına yönlendirme.",
        "AWS servisi: doğrudan DynamoDB, SQS gibi servislere.",
        "Mock: sahte cevap."
      ] },
      { t: "steps", h: "Güvenlik", items: [
        "IAM yetkilendirme: AWS kimlikleri için.",
        "Cognito kullanıcı havuzu yetkilendiricisi: son kullanıcı JWT'si.",
        "Lambda yetkilendirici (authorizer): özel mantık.",
        "API anahtarı + kullanım planı: ölçüm ve kısıtlama (kimlik doğrulama için tek başına yeterli değil).",
        "AWS WAF, TLS, kaynak politikası."
      ] },
      { t: "box", h: "Sık hatalar", text: "502 Bad Gateway: Lambda geçersiz biçimde cevap döndürdü (proxy biçimine uymadı). 504: entegrasyon zaman aşımı (REST API'de varsayılan 29 sn, Regional REST API'de kota artışıyla yükseltilebilir; HTTP API 30 sn). 429: kısıtlama. CORS hatası: tarayıcıdan farklı kökenden çağrıda başlıklar eksik." },
      { t: "box", h: "Aşamalar ve değişkenleri", text: "Her aşamanın kendi URL'si, önbelleği, kısıtlama ayarı ve aşama değişkenleri olabilir. Kanarya dağıtımıyla trafiğin bir kısmı yeni sürüme yönlendirilebilir." },
      { t: "warn", h: "Tuzak", text: "Lambda proxy entegrasyonunda gövdeyi düz nesne döndürmek. Cevap {statusCode, headers, body(metin)} biçiminde olmalıdır; aksi hâlde 502 alırsın." }
    ],
    objectives: [
      { id: "h1", text: "Lambda proxy entegrasyonunda dönüş nesnesini (statusCode, headers, body metni) yazıp 502'nin nedenini bulabilirsin." },
      { id: "h2", text: "HTTP API ile REST API'yi özellik ve maliyet farkına göre (API anahtarı, kullanım planı, düşük gecikme) ayırt edebilirsin." },
      { id: "h3", text: "Senaryoya göre yetkilendirme yöntemini (IAM, Cognito, Lambda authorizer, API anahtarı) seçebilirsin." },
      { id: "h4", text: "CORS ve 429 gibi sık hata belirtilerinin nedenini bulabilirsin." }
    ],
    summary: [
      "Lambda proxy'de cevap statusCode, headers ve metin (string) body içeren bir nesne olmalıdır; düz nesne döndürmek 502 Bad Gateway verir.",
      "HTTP API daha ucuz ve düşük gecikmelidir (JWT yetkilendirici, Lambda proxy); API anahtarı, kullanım planı, istek doğrulama, WAF ve önbellek REST API'dedir.",
      "Son kullanıcı JWT'si için Cognito yetkilendirici, AWS kimlikleri için IAM, özel mantık için Lambda authorizer kullanılır; API anahtarı tek başına kimlik doğrulama değildir.",
      "Hata belirtileri: 502 geçersiz Lambda cevabı, 504 entegrasyon zaman aşımı, 429 kısıtlama, CORS hatası ise eksik Access-Control-Allow-* başlığı demektir.",
      "Her aşamanın (dev, prod) kendi URL'si, önbelleği ve aşama değişkenleri olabilir; kanarya dağıtımıyla trafiğin bir kısmı yeni sürüme gider."
    ],
    quiz: [
      { id: "05bae92b", q: "Lambda proxy entegrasyonunda Lambda'nın döndürmesi gereken şey nedir?", options: ["statusCode, headers ve body içeren nesne", "Sadece düz metin", "XML dosyası", "Boş değer"], obj: "h1" },
      { id: "feddaec2", q: "Daha ucuz ve düşük gecikmeli, temel ihtiyaçlar için hangi tür uygundur?", options: ["HTTP API", "REST API", "WebSocket API", "SOAP"], obj: "h2" },
      { id: "54ed5caf", q: "Son kullanıcı JWT'sini doğrulamak için hangisi kullanılır?", options: ["Cognito yetkilendirici", "API anahtarı", "Kova politikası", "Route 53"], obj: "h3" },
      { id: "a0722a89", q: "Tarayıcıdan farklı kökenli API çağrısında engellenme hangi ayarla çözülür?", options: ["CORS", "TTL", "Stage", "WAF"], obj: "h4" },
      { id: "53d40c13", q: "API anahtarları ve kullanım planları hangi türde bulunur?", options: ["REST API", "Sadece WebSocket", "Hiçbirinde", "Sadece CLI"], obj: "h2" },
      { id: "2c6894f4", q: "İstemci kısa sürede çok fazla istek gönderip kısıtlamaya takılınca API Gateway hangi HTTP durum kodunu döndürür?", options: ["429","502","404","301"], obj: "h4" },
      { id: "ad8f4c5e", q: "AWS'deki başka bir servisin (IAM kimliği olan) API'yi çağırmasını yetkilendirmek için hangisi uygundur?", options: ["IAM yetkilendirme","Cognito kullanıcı havuzu yetkilendiricisi","Yalnızca API anahtarı","Mock entegrasyon"], obj: "h3" },
      { id: "72a9b5c0", q: "Lambda proxy entegrasyonunda cevaptaki body alanı nasıl olmalıdır?", options: ["Metin (string) olmalı; nesne önce JSON metnine çevrilir","Düz nesne veya sözlük olarak verilmeli","XML Document nesnesi olmalı","Her zaman bir sayı olmalı"], obj: "h1" }
    ],
    interview: [
      { q: "HTTP API ve REST API arasındaki fark?", a: "HTTP API daha ucuz ve hızlıdır, temel proxy ihtiyaçları ve JWT yetkilendirme için yeterlidir. REST API daha çok özellik sunar: API anahtarı, kullanım planı, istek doğrulama, WAF, önbellek, dönüşümler." },
      { q: "API Gateway'de 502 hatasının tipik nedeni?", a: "Lambda proxy entegrasyonunda fonksiyonun beklenen biçimde (statusCode, headers, string body) cevap döndürmemesi veya fonksiyonun hata fırlatmasıdır." }
    ],
    vocab: [
      { term: "Route", tr: "yol (yönlendirme)", ex: "Add a route for GET /orders." },
      { term: "Stage", tr: "aşama", ex: "Deploy to the prod stage." },
      { term: "Authorizer", tr: "yetkilendirici", ex: "Attach a JWT authorizer." },
      { term: "Throttling", tr: "kısıtlama", ex: "Enable throttling." },
      { term: "Integration", tr: "entegrasyon", ex: "A Lambda integration." }
    ],
    resources: [
      { title: "API Gateway Geliştirici Kılavuzu", url: DOC + "apigateway/latest/developerguide/welcome.html", type: "doc", why: "Resmî rehber", level: "başlangıç", lang: "EN" },
      res(SKILL, "Sunucusuz API kursları")
    ],
    sources: [EXAM]
  };

  /* 17 ─────────────────────────────── Step Functions */
  L[17] = {
    hook: "Birden çok adımlı işi tek fonksiyona sıkıştırmak yerine, akış şemasını AWS yürütsün.",
    homework: "Sipariş akışını adımlara böl: stok kontrol, ödeme, kargo. Ödeme başarısız olursa hangi adım çalışmalı?",
    warmup: {
      recap: [{ point: "Lambda en fazla 15 dakika çalışır.", example: "Uzun iş sınırı" }],
      concepts: [
        { term: "State machine", tr: "Durum makinesi", summary: "Adımların (state) sırasını, koşullarını ve hata yönetimini tanımlayan iş akışı.", example: "ASL JSON" },
        { term: "Saga", tr: "Saga kalıbı", summary: "Dağıtık işlemde bir adım başarısız olursa önceki adımları telafi eden eylemlerle geri alma.", example: "Ödeme iade et" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Sipariş: stok düş, ödeme al, kargo oluştur. Ödeme patlarsa stok geri eklenmeli. Bunu Lambda içinde iç içe yazmak karmaşıktır; Step Functions akışı, yeniden denemeyi ve hata yolunu görsel yönetir." },
      { t: "steps", h: "State türleri", items: [
        "Task: iş yapar (Lambda, DynamoDB, SQS ve 200+ servis çağrısı).",
        "Choice: koşula göre dallanma.",
        "Parallel: dalları aynı anda çalıştırır.",
        "Map: bir listedeki her öğe için işlem yapar.",
        "Wait: bekleme. Succeed / Fail: sonlandırma.",
        "Pass: veri iletimi/dönüşümü."
      ] },
      { t: "steps", h: "Hata yönetimi", items: [
        "Retry: hata türüne göre yeniden deneme, aralık, oran ve en fazla deneme.",
        "Catch: yeniden denemeden sonra başka bir duruma yönlendirme (telafi, bildirim).",
        "Timeout: adım zaman aşımı."
      ] },
      { t: "steps", h: "Standard ve Express", items: [
        "Standard: 1 yıla kadar sürer, tam yürütme geçmişi, tam olarak bir kez (exactly-once). Uzun, kritik iş akışları.",
        "Express: en fazla 5 dakika, çok yüksek hacim, en az bir kez (at-least-once; asenkron Express), ucuz. Olay işleme, IoT."
      ] },
      { t: "box", h: "Onay beklemek", text: "Task token ile geri çağrı kalıbı (waitForTaskToken): akış, insan onayı veya dış sistemden cevap gelene kadar durur." },
      { t: "box", h: "Ne zaman kullanmamalı?", text: "Tek adımlı basit işte Lambda yeterlidir. Çok yüksek hacimli kısa akışlarda maliyet için Express seçilir." },
      { t: "warn", h: "Tuzak", text: "Lambda'larda uzun bekleme (sleep) ile zaman geçirmek ücretlidir. Beklemeyi Wait durumuna devret." }
    ],
    objectives: [
      { id: "h1", text: "Task, Choice, Parallel, Map gibi state türlerini yapılacak işe göre eşleştirebilirsin." },
      { id: "h2", text: "Retry ve Catch ile hata yolunu tasarlayıp saga mantığıyla telafi adımı kurgulayabilirsin." },
      { id: "h3", text: "Standard ve Express iş akışı türleri arasında süre, hacim ve teslim garantisine göre seçim yapabilirsin." },
      { id: "h4", text: "waitForTaskToken ile insan onayı veya dış sistem cevabı bekleyen bir akış kurgulayabilirsin." }
    ],
    summary: [
      "Task iş yapar (Lambda ve 200'den fazla servis), Choice koşula göre dallanır, Parallel dalları aynı anda, Map listedeki her öğeyi işler.",
      "Retry hata türüne, aralığa ve deneme sayısına göre yeniden dener; Catch yeniden deneme sonrası telafi veya bildirim durumuna yönlendirir.",
      "Saga kalıbında her adımın bir telafi eylemi vardır; ödeme patlarsa stok geri eklenir.",
      "Standard 1 yıla kadar sürer, tam yürütme geçmişi tutar, tam olarak bir kez çalışır; Express en fazla 5 dakikadır, yüksek hacimlidir, en az bir kez (asenkron Express) çalışır ve daha ucuzdur.",
      "Beklemeyi Lambda içinde sleep ile değil Wait durumuyla yap; insan onayı için waitForTaskToken kalıbı akışı token gelene dek durdurur."
    ],
    quiz: [
      { id: "0b61ba69", q: "Adım başarısız olursa belirli bir duruma yönlendiren yapı hangisidir?", options: ["Catch", "Pass", "Wait", "Map"], obj: "h2" },
      { id: "20889996", q: "Listedeki her öğe için aynı işlemi yapan durum hangisidir?", options: ["Map", "Choice", "Wait", "Succeed"], obj: "h1" },
      { id: "88c7ac6f", q: "1 yıla kadar süren, tam yürütme geçmişi tutan tür hangisidir?", options: ["Standard", "Express", "Lambda", "Batch"], obj: "h3" },
      { id: "cd471fc7", q: "İnsan onayı gelene kadar bekleyen akış için ne kullanılır?", options: ["Task token (waitForTaskToken)", "Sadece Wait 1 gün", "S3 olayı", "CloudFront"], obj: "h4" },
      { id: "ed6cf957", q: "Saga kalıbı neyi çözer?", options: ["Dağıtık işlemde telafi ile geri alma", "DNS çözümleme", "Disk şifreleme", "Önbellek ısıtma"], obj: "h2" },
      { id: "e8691e29", q: "Sipariş tutarı 1000'den büyükse yönetici onayı adımına, değilse doğrudan ödemeye giden bir dallanma için hangi state kullanılır?", options: ["Choice","Parallel","Pass","Succeed"], obj: "h1" },
      { id: "27b28870", q: "Saniyede binlerce kısa (5 dakikadan kısa) IoT olayını işleyen ve en az bir kez çalışmayı kabul eden bir akış için hangi tür daha uygundur?", options: ["Express","Standard","Wait state","Pass state"], obj: "h3" }
    ],
    interview: [
      { q: "Neden Lambda içinde iç içe Lambda çağırmak yerine Step Functions?", a: "Step Functions durum, yeniden deneme, hata yolu, paralellik ve görsel izleme sağlar; Lambda zincirinde bunları kendin kodlarsın ve bekleme süresi için ücret ödersin." },
      { q: "Standard ve Express farkı?", a: "Standard uzun süreli (1 yıl), tam olarak bir kez, ayrıntılı geçmişli kritik akışlar içindir. Express kısa (5 dk), yüksek hacimli, en az bir kez (asenkron Express) çalışan ve daha ucuz akışlar içindir." }
    ],
    vocab: [
      { term: "Workflow", tr: "iş akışı", ex: "Orchestrate the workflow." },
      { term: "State", tr: "durum (adım)", ex: "A Choice state." },
      { term: "Orchestration", tr: "orkestrasyon", ex: "Use orchestration for multi-step jobs." },
      { term: "Compensate", tr: "telafi etmek", ex: "Compensate the failed step." },
      { term: "Retry", tr: "yeniden deneme", ex: "Add a retry policy." }
    ],
    resources: [
      { title: "AWS Step Functions Geliştirici Kılavuzu", url: DOC + "step-functions/latest/dg/welcome.html", type: "doc", why: "Resmî rehber", level: "başlangıç", lang: "EN" },
      res(SKILL, "Step Functions kursu")
    ],
    sources: [EXAM]
  };

  /* 18 ─────────────────────────────── SQS ve DLQ */
  L[18] = {
    hook: "İki servis aynı anda ayakta olmak zorunda değil: araya bir kuyruk koy.",
    homework: "Sipariş oluşturma ile e-posta gönderme arasına neden kuyruk koymak iyidir? Üç fayda yaz.",
    warmup: {
      recap: [{ point: "Lambda kuyruğu okuyabilir.", example: "Olay kaynağı eşleme" }, { point: "Aynı mesaj iki kez gelebilir.", example: "İdempotency" }],
      concepts: [
        { term: "Queue", tr: "Kuyruk", summary: "Üretici ile tüketici arasında mesajları geçici tutan tampon.", example: "SQS" },
        { term: "DLQ", tr: "Ölü mektup kuyruğu", summary: "Birkaç denemeden sonra işlenemeyen mesajların toplandığı kuyruk.", example: "maxReceiveCount = 3" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Kampanya anında sipariş sayısı 100 kat artıyor. E-posta servisi yetişemiyor. Siparişleri kuyruğa yazarsan tüketici kendi hızında işler; sistem çökmez (yük dengeleme/tampon)." },
      { t: "steps", h: "Standard ve FIFO", items: [
        "Standard: neredeyse sınırsız verim, en az bir kez teslim, sıra garantisi yok (çift mesaj olabilir).",
        "FIFO: sıra korunur, tam olarak bir kez işleme (tekrar önleme), verim sınırlı; adı .fifo ile biter.",
        "FIFO'da MessageGroupId sırayı gruplar; MessageDeduplicationId tekrarı engeller."
      ] },
      { t: "steps", h: "Önemli ayarlar", items: [
        "Visibility timeout (görünürlük zaman aşımı): bir tüketici mesajı aldığında diğerlerinden gizlenir; süre içinde silinmezse tekrar görünür. İşlem süresinden uzun olmalı.",
        "Mesaj saklama: 1 dakika - 14 gün (varsayılan 4 gün).",
        "Gecikme kuyruğu (delay): mesajı belli süre gizler.",
        "Long polling (ReceiveMessageWaitTimeSeconds ≤ 20): boş yanıtları azaltır ve maliyeti düşürür.",
        "Mesaj boyutu en fazla 256 KB (yeni sınır 1 MiB'ye çıkarıldı; güncel kotaya bak); daha büyük için S3 işaretçisi."
      ] },
      { t: "box", h: "DLQ", text: "Bir mesaj maxReceiveCount kadar denenip işlenemezse sonraki alımda DLQ'ya taşınır. Zehirli mesajın tüm kuyruğu tıkamasını önler; DLQ'yu izleyip alarm kur, inceleyip yeniden sürüş (redrive) yap. Standard kuyruğun DLQ'su standard, FIFO'nunki FIFO olur." },
      { t: "box", h: "SQS + Lambda", text: "Lambda kuyruğu toplu (batch) okur. Toplu işte bir mesaj başarısız olursa tüm grup yeniden görünür olur; kısmi toplu yanıt (batchItemFailures) ile sadece başarısızları geri döndür." },
      { t: "warn", h: "Tuzak", text: "Visibility timeout'u Lambda zaman aşımından kısa tutmak: işlem sürerken mesaj tekrar görünür ve çift işlenir. Kural: kuyruk görünürlük süresi ≥ Lambda zaman aşımının ~6 katı." }
    ],
    objectives: [
      { id: "h1", text: "Standard ve FIFO kuyruk arasında sıra, tekrar önleme ve verim gereksinimine göre seçim yapabilirsin." },
      { id: "h2", text: "Visibility timeout'u işlem süresine göre ayarlayıp mesajın çift işlenmesini önleyebilirsin." },
      { id: "h3", text: "DLQ ve maxReceiveCount ile zehirli mesajı ana kuyruktan ayırıp DLQ'dan redrive ile geri sürmeyi açıklayabilirsin." },
      { id: "h4", text: "Long polling ile boş yanıt maliyetini azaltmayı ve SQS-Lambda toplu işte batchItemFailures kullanımını açıklayabilirsin." }
    ],
    summary: [
      "Standard kuyruk neredeyse sınırsız verim ve en az bir kez teslim sunar, sıra garantisi yoktur; FIFO sırayı korur, tekrarı önler ve .fifo ile biter.",
      "FIFO'da MessageGroupId sırayı gruplar, MessageDeduplicationId tekrarı engeller.",
      "Visibility timeout işlem süresinden uzun olmalıdır; kısa kalırsa mesaj işlem sürerken tekrar görünür ve çift işlenir.",
      "maxReceiveCount aşılınca mesaj sonraki alımda DLQ'ya taşınır; DLQ izlenip alarm kurulur, inceleme sonrası redrive yapılır.",
      "Long polling (en fazla 20 sn) boş yanıtları ve maliyeti azaltır; mesaj saklama 1 dakika-14 gündür (varsayılan 4), mesaj boyutu en fazla 256 KB (yeni sınır 1 MiB'ye çıkarıldı; güncel kotaya bak)."
    ],
    quiz: [
      { id: "96ea3586", q: "İşlenemeyen mesajların toplandığı kuyruğa ne denir?", options: ["DLQ", "FIFO", "Delay queue", "Stream"], obj: "h3" },
      { id: "a422f0bf", q: "Sıra ve tekrar önleme gerekiyorsa hangi tür seçilir?", options: ["FIFO", "Standard", "SNS", "Kinesis Firehose"], obj: "h1" },
      { id: "b18bbed6", q: "Tüketici mesajı alınca onu diğerlerinden gizleyen ayar nedir?", options: ["Visibility timeout", "Retention period", "Delay seconds", "Long polling"], obj: "h2" },
      { id: "856a1e7b", q: "Boş yanıtları azaltan ve maliyeti düşüren yöntem hangisidir?", options: ["Long polling", "Short polling", "FIFO", "DLQ"], obj: "h4" },
      { id: "5f8a6215", q: "Standard SQS için doğru ifade hangisidir?", options: ["En az bir kez teslim, sıra garantisi yok", "Her zaman tam bir kez", "Sıra garantili", "Sadece 10 mesaj"], obj: "h1" },
      { id: "9aeb1130", q: "Lambda zaman aşımı 60 saniye iken kuyruğun visibility timeout değeri 30 saniye bırakılırsa ne olur?", options: ["Mesaj işlem sürerken tekrar görünür ve çift işlenebilir","Mesaj hemen otomatik olarak ölü mektup kuyruğuna taşınır","Kuyruk kendiliğinden FIFO türüne dönüşür ve sırayı korur","Mesaj kuyruktan kalıcı olarak silinir ve bir daha işlenmez"], obj: "h2" },
      { id: "7daa5c9d", q: "maxReceiveCount 3 olan bir kuyrukta bir mesaj 3 kez alınıp silinemezse, sonraki alım girişiminde ne olur?", options: ["Mesaj sonraki alımda DLQ'ya taşınır","Mesaj ana kuyrukta sonsuza kadar denenir","Mesaj otomatik e-posta olarak gönderilir","Kuyruk silinir"], obj: "h3" },
      { id: "3bb279bc", q: "SQS'ten toplu okuyan Lambda'da 10 mesajdan yalnızca 1'i başarısız oluyor. Yalnız onu yeniden denemek için ne kullanılır?", options: ["batchItemFailures ile kısmi toplu yanıt","Visibility timeout'u 0 yapmak","FIFO'ya geçmek","Long polling açmak"], obj: "h4" },
      { id: "271e8f4a", q: "Hata düzeltildikten sonra DLQ'da biriken mesajları kaynak kuyruğa geri göndermek için ne yapılır?", options: ["DLQ redrive ile mesajları kaynak kuyruğa geri sürmek","Saklama süresini 14 güne çıkarıp mesajların kendiliğinden dönmesini beklemek","Visibility timeout değerini 0 yapıp mesajları hemen yeniden görünür kılmak","Ana kuyruğu FIFO türüne çevirip mesajları sıraya yeniden dizmek"], obj: "h3" }
    ],
    interview: [
      { q: "SQS Standard ve FIFO farkı?", a: "Standard çok yüksek verim sunar ama en az bir kez teslim eder ve sırayı garanti etmez. FIFO sırayı korur ve tekrarı önler; verimi daha sınırlıdır." },
      { q: "DLQ ne işe yarar?", a: "Birkaç denemeden sonra işlenemeyen mesajları ana kuyruktan ayırır; böylece zehirli mesaj akışı tıkamaz, mesajlar sonradan incelenir veya yeniden sürülür." },
      { q: "Neden kuyruk kullanırız?", a: "Servisleri birbirinden ayırmak (gevşek bağlılık), ani yükü tamponlamak, tüketiciyi bağımsız ölçeklemek ve geçici arızalara karşı dayanıklılık için." }
    ],
    vocab: [
      { term: "Message", tr: "mesaj", ex: "Send a message to the queue." },
      { term: "Producer", tr: "üretici", ex: "The producer sends messages." },
      { term: "Consumer", tr: "tüketici", ex: "The consumer polls the queue." },
      { term: "Dead-letter queue", tr: "ölü mektup kuyruğu", ex: "Configure a dead-letter queue." },
      { term: "Decoupling", tr: "ayrıştırma", ex: "Queues enable decoupling." }
    ],
    resources: [
      { title: "Amazon SQS Geliştirici Kılavuzu", url: DOC + "AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html", type: "doc", why: "Resmî rehber", level: "başlangıç", lang: "EN" },
      res(SKILL, "Mesajlaşma ve ayrıştırma")
    ],
    sources: [EXAM]
  };
})();

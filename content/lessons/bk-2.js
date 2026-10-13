/* Backend / AWS · sabit dersler 7-12 */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).bk = (window.PP_LESSONS.bk || {}));
  var DOC = "https://docs.aws.amazon.com/";
  var SKILL = { title: "AWS Skill Builder (ücretsiz dijital kurslar)", url: "https://skillbuilder.aws/", type: "course", level: "başlangıç", lang: "EN" };
  var EXAM = { title: "AWS Certified Developer – Associate", url: "https://aws.amazon.com/certification/certified-developer-associate/", type: "doc", level: "orta", lang: "EN" };
  function res(a, why) { var o = {}; for (var k in a) o[k] = a[k]; o.why = why; return o; }

  /* 7 ─────────────────────────────── Bulut ve AWS hesabı */
  L[7] = {
    hook: "Sunucu satın almak yerine saniyeler içinde kiralayıp kullandığın kadar ödemek: bulutun fikri bu.",
    homework: "Bir AWS hesabında Billing > Budgets bölümünden 5 dolarlık bir bütçe uyarısı kurmayı planla (veya kur). Neden ilk iş bu?",
    warmup: {
      recap: [{ point: "API'ler HTTP ile konuşur.", example: "REST" }],
      concepts: [
        { term: "Region", tr: "Bölge", summary: "AWS'nin dünyada coğrafi konum kümesi. Veri ve gecikme bölgeye göre değişir.", example: "eu-central-1 (Frankfurt)" },
        { term: "Availability Zone", tr: "Erişilebilirlik bölgesi", summary: "Bir bölge içindeki bağımsız veri merkezi grupları.", example: "eu-central-1a" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Girişimin ilk günü sunucu almak yerine bir AWS hesabı açar. Doğru kurulum yapılmazsa ya yanlışlıkla büyük fatura gelir ya da kök hesap ele geçirilir." },
      { t: "steps", h: "Bulutun temel özellikleri", items: [
        "İstek üzerine kendin kullan (on-demand): ihtiyaç anında oluştur, işin bitince kapat.",
        "Kullandığın kadar öde.",
        "Esneklik: ölçeği yukarı-aşağı değiştir.",
        "Küresel erişim: bölgeler ve kenar konumları."
      ] },
      { t: "steps", h: "Hizmet modelleri", items: [
        "IaaS: sanal makine, ağ (EC2). Sistem yönetimi sende.",
        "PaaS: platform (Elastic Beanstalk). Kodu getirirsin.",
        "SaaS: hazır yazılım (e-posta servisi).",
        "Sunucusuz (serverless): sunucuyu hiç yönetmezsin (Lambda, DynamoDB, S3)."
      ] },
      { t: "box", h: "Paylaşılan sorumluluk", text: "AWS 'bulutun güvenliğinden' (donanım, veri merkezi, hipervizör), sen 'bulut içindeki güvenlikten' (IAM, veri şifreleme, yapılandırma, uygulama kodu) sorumlusun." },
      { t: "steps", h: "İlk hafta kurulumu", items: [
        "Kök (root) kullanıcıya güçlü parola + MFA, günlük işte kullanma.",
        "Yönetici yetkili ayrı IAM kullanıcısı veya IAM Identity Center kullanıcısı oluştur.",
        "Billing > Budgets ile aylık bütçe uyarısı kur.",
        "Kullanmadığın kaynakları kapat; Free Tier sınırlarını izle.",
        "Bölgeni seç ve tutarlı kal (konsolun sağ üst köşesi)."
      ] },
      { t: "warn", h: "Tuzak", text: "Erişim anahtarını GitHub'a koymak: botlar dakikalar içinde bulup madencilik için kaynak açar ve binlerce dolarlık fatura çıkar. Anahtarları koda gömme." }
    ],
    quiz: [
      { q: "Paylaşılan sorumluluk modelinde müşteri neyden sorumludur?", options: ["Bulut İÇİNDEKİ güvenlik (IAM, veri, yapılandırma)", "Fiziksel veri merkezi", "Hipervizör", "Güç ve soğutma"], answer: "Bulut İÇİNDEKİ güvenlik (IAM, veri, yapılandırma)", why: "AWS bulutun güvenliğinden, müşteri bulut içindeki güvenlikten sorumludur." },
      { q: "Bir bölge içindeki bağımsız veri merkezi gruplarına ne denir?", options: ["Availability Zone", "Edge location", "Bucket", "VPC peering"], answer: "Availability Zone", why: "Çoklu AZ yüksek erişilebilirlik sağlar." },
      { q: "Kök hesap için ilk yapılması gereken nedir?", options: ["MFA etkinleştirmek ve günlük işte kullanmamak", "Erişim anahtarı oluşturmak", "Herkesle paylaşmak", "Parolayı basit tutmak"], answer: "MFA etkinleştirmek ve günlük işte kullanmamak", why: "Kök hesap sınırsız yetkilidir." },
      { q: "Sunucuyu hiç yönetmediğin model hangisidir?", options: ["Sunucusuz (serverless)", "IaaS", "Fiziksel sunucu", "Colocation"], answer: "Sunucusuz (serverless)", why: "Lambda gibi servislerde altyapıyı AWS yönetir." }
    ],
    interview: [
      { q: "Region ve Availability Zone farkı nedir?", a: "Region coğrafi bir bölgedir (Frankfurt). AZ, o bölge içindeki birbirinden bağımsız veri merkezi gruplarıdır. Yüksek erişilebilirlik için birden fazla AZ'ye dağıtım yapılır." },
      { q: "Yeni açılan AWS hesabında ilk neleri yaparsın?", a: "Kök hesaba MFA koyar, günlük iş için yönetici IAM kimliği oluşturur, bütçe uyarısı kurar ve kök hesabı kullanmayı bırakırım." }
    ],
    vocab: [
      { term: "On-demand", tr: "istek üzerine", ex: "Resources are available on-demand." },
      { term: "Region", tr: "bölge", ex: "Choose the closest region." },
      { term: "Serverless", tr: "sunucusuz", ex: "A serverless backend." },
      { term: "Pay-as-you-go", tr: "kullandığın kadar öde", ex: "Pay-as-you-go pricing." },
      { term: "Root user", tr: "kök kullanıcı", ex: "Do not use the root user." }
    ],
    resources: [
      res(SKILL, "Cloud Practitioner Essentials ile başla"),
      { title: "AWS Ücretsiz Katman", url: "https://aws.amazon.com/free/", type: "doc", why: "Neyin ücretsiz olduğunu gör", level: "başlangıç", lang: "EN" }
    ],
    sources: [EXAM]
  };

  /* 8 ─────────────────────────────── IAM */
  L[8] = {
    hook: "AWS'de her şey 'kim, neyi, hangi kaynakta yapabilir?' sorusuna iner.",
    homework: "Sadece bir S3 kovasını okuyabilen bir politika JSON'u yaz: Effect, Action, Resource alanlarını belirt.",
    warmup: {
      recap: [{ point: "Kök kullanıcı sınırsız yetkilidir.", example: "Günlük kullanılmaz" }, { point: "JSON yapılandırma dilidir.", example: "Politika belgeleri" }],
      concepts: [
        { term: "IAM policy", tr: "IAM politikası", summary: "Hangi eylemlerin hangi kaynaklarda izinli veya yasak olduğunu tanımlayan JSON belgesi.", example: "s3:GetObject" },
        { term: "IAM role", tr: "IAM rolü", summary: "Geçici kimlik bilgisiyle üstlenilebilen kimlik. Lambda ve EC2 uzun ömürlü anahtar yerine rol kullanır.", example: "Lambda yürütme rolü" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Lambda fonksiyonun DynamoDB'ye yazmak istiyor ama 'AccessDeniedException' alıyor. Sorun neredeyse her zaman IAM'dir. Çözüm: fonksiyonun rolüne en az yetkiyle doğru izni vermek." },
      { t: "steps", h: "Kimlikler", items: [
        "Kullanıcı: bir insan veya uygulama (uzun ömürlü kimlik).",
        "Grup: kullanıcıları toplar; izinler gruba bağlanır.",
        "Rol: geçici kimlik; servisler ve diğer hesaplar üstlenir.",
        "Politika: izinleri tanımlar ve kimliklere bağlanır."
      ] },
      { t: "cmd", lang: "json", text: "{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [{\n    \"Effect\": \"Allow\",\n    \"Action\": [\"s3:GetObject\"],\n    \"Resource\": \"arn:aws:s3:::benim-kovam/*\"\n  }]\n}" },
      { t: "steps", h: "Değerlendirme kuralları", items: [
        "Varsayılan: her şey reddedilir (örtük deny).",
        "Açık Allow izin verir.",
        "Açık Deny her şeyi geçersiz kılar.",
        "Birden çok politika birleşir; en kısıtlayıcı açık Deny kazanır."
      ] },
      { t: "box", h: "En az yetki", text: "Sadece görevin gerektirdiği eylemleri ve kaynakları ver. Önce dar başla, AccessDenied aldıkça gerekeni ekle. '*' yetkisi (her şeye izin) üretimde sorun işaretidir." },
      { t: "box", h: "Rol ve güven politikası", text: "Bir rolün iki yönü vardır: izin politikası (ne yapabilir) ve güven politikası (kim üstlenebilir; ör. lambda.amazonaws.com). Geçici kimlik bilgilerini STS verir." },
      { t: "warn", h: "Tuzak", text: "Kodda sabit erişim anahtarı kullanmak. Bunun yerine uygulamanın çalıştığı servise rol ver; SDK kimlik bilgisini otomatik alır." }
    ],
    quiz: [
      { q: "IAM'de varsayılan davranış nedir?", options: ["Her şey reddedilir", "Her şeye izin verilir", "Sadece okuma", "Sadece yazma"], answer: "Her şey reddedilir", why: "Örtük deny: izin verilmediyse yoktur." },
      { q: "Açık Deny ile açık Allow çakışırsa ne olur?", options: ["Deny kazanır", "Allow kazanır", "İlk gelen kazanır", "Hata verir"], answer: "Deny kazanır", why: "Açık Deny her zaman önceliklidir." },
      { q: "Bir Lambda fonksiyonu AWS servisine erişmek için neyi kullanmalıdır?", options: ["IAM rolü", "Koda gömülü erişim anahtarı", "Kök hesap parolası", "Genel kova"], answer: "IAM rolü", why: "Rol geçici kimlik sağlar; anahtar sızıntısı riski yoktur." },
      { q: "En az yetki ilkesi ne demektir?", options: ["Sadece gereken izinleri vermek", "Herkese yönetici yetkisi", "İzinleri hiç vermemek", "Kök hesap kullanmak"], answer: "Sadece gereken izinleri vermek", why: "Hasar alanı daralır." },
      { q: "Bir rolü kimlerin üstlenebileceğini hangi belge belirler?", options: ["Güven politikası", "S3 kova politikası", "Güvenlik grubu", "KMS anahtarı"], answer: "Güven politikası", why: "Trust policy, Principal'i tanımlar." }
    ],
    interview: [
      { q: "IAM kullanıcısı ile rol farkı nedir?", a: "Kullanıcı uzun ömürlü kimlik bilgisi taşıyan bir kimliktir. Rol, üstlenildiğinde geçici kimlik bilgisi veren bir kimliktir ve servisler, diğer hesaplar veya federasyon için tercih edilir." },
      { q: "'AccessDenied' hatasını nasıl ayıklarsın?", a: "Hangi kimliğin (rol) hangi eylemi hangi kaynakta çağırdığını hata mesajından ve CloudTrail'den bulurum. Sonra kimlik politikasını, kaynak politikasını, açık Deny'ları ve izin sınırlarını kontrol ederim." }
    ],
    vocab: [
      { term: "Policy", tr: "politika", ex: "Attach a policy to the role." },
      { term: "Principal", tr: "kimlik (isteği yapan)", ex: "The principal is a Lambda service." },
      { term: "Least privilege", tr: "en az yetki", ex: "Follow least privilege." },
      { term: "Assume a role", tr: "rolü üstlenmek", ex: "The function assumes a role." },
      { term: "ARN", tr: "AWS kaynak adı", ex: "Use the bucket ARN." }
    ],
    resources: [
      { title: "IAM Kullanıcı Kılavuzu", url: DOC + "IAM/latest/UserGuide/introduction.html", type: "doc", why: "Resmî giriş", level: "başlangıç", lang: "EN" },
      res(SKILL, "IAM temelleri kursu")
    ],
    sources: [EXAM]
  };

  /* 9 ─────────────────────────────── AWS CLI ve SDK */
  L[9] = {
    hook: "Konsolda tıklamak öğrenmek içindir; üretimde her şey komutla ve kodla yapılır.",
    homework: "aws configure ile profil ayarla, aws sts get-caller-identity komutuyla kim olduğunu doğrula.",
    warmup: {
      recap: [{ point: "IAM kimliği yetkiyi belirler.", example: "Rol ve politika" }],
      concepts: [
        { term: "AWS CLI", tr: "Komut satırı aracı", summary: "AWS servislerini terminalden yönetmeni sağlar.", example: "aws s3 ls" },
        { term: "SDK", tr: "Yazılım geliştirme kiti", summary: "AWS API'lerini kodundan (Python, JS) çağırmanı sağlayan kütüphane.", example: "boto3" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Dağıtım betiği, test ortamı kurulumu ve Lambda kodu hep CLI ve SDK ile çalışır. Aynı işi 50 kez tıklamak yerine bir betik yazarsın." },
      { t: "cmd", lang: "bash", text: "aws configure --profile dev\naws sts get-caller-identity --profile dev\naws s3 ls\naws dynamodb scan --table-name Siparisler --max-items 5" },
      { t: "cmd", lang: "python", text: "import boto3\ns3 = boto3.client('s3')\nfor k in s3.list_objects_v2(Bucket='benim-kovam').get('Contents', []):\n    print(k['Key'])" },
      { t: "steps", h: "Kimlik bilgisi sırası (kısaca)", items: [
        "Koda doğrudan verilen bilgi (kaçın).",
        "Ortam değişkenleri (AWS_ACCESS_KEY_ID...).",
        "~/.aws/credentials ve config dosyası, profiller.",
        "Konteyner/EC2/Lambda rolü: SDK otomatik bulur.",
        "SSO ile oturum (aws sso login): geçici kimlik."
      ] },
      { t: "box", h: "Faydalı bayraklar", text: "--profile: hangi kimlik. --region: hangi bölge. --output json|table|text. --query: JMESPath ile çıktıyı süz. --dry-run: bazı komutlarda gerçekten uygulamadan dene. Sayfalama için --max-items ve --starting-token." },
      { t: "warn", h: "Tuzak", text: "Yanlış profil veya bölgeyle komut çalıştırmak: üretim kaynağını silebilirsin. Komuttan önce aws sts get-caller-identity ve bölgeyi kontrol etme alışkanlığı edin." }
    ],
    quiz: [
      { q: "Kimin adına işlem yaptığını gösteren komut hangisidir?", options: ["aws sts get-caller-identity", "aws s3 ls", "aws configure list-all", "aws iam delete-user"], answer: "aws sts get-caller-identity", why: "Mevcut kimliği ve hesabı gösterir." },
      { q: "Python için AWS SDK'sının adı nedir?", options: ["boto3", "pandas", "django", "numpy"], answer: "boto3", why: "boto3 Python SDK'sıdır." },
      { q: "Lambda içindeki kod AWS'ye nasıl yetkilenmelidir?", options: ["Yürütme rolü üzerinden", "Kodda gömülü anahtarla", "Parolayla", "Anonim"], answer: "Yürütme rolü üzerinden", why: "SDK rolün geçici bilgisini otomatik kullanır." },
      { q: "CLI çıktısını süzmek için hangi bayrak kullanılır?", options: ["--query", "--dry", "--force", "--wait-all"], answer: "--query", why: "JMESPath ile alan seçer." }
    ],
    interview: [
      { q: "SDK kimlik bilgilerini nereden bulur?", a: "Sırasıyla koda verilenden, ortam değişkenlerinden, paylaşılan kimlik dosyası ve profillerden, sonra konteyner veya örnek rolünden (varsayılan sağlayıcı zinciri). Bulutta çalışırken rol kullanmak en güvenlisidir." },
      { q: "CLI ve SDK ne zaman kullanılır?", a: "CLI hızlı yönetim ve betikler içindir. SDK uygulama kodunun AWS servislerini çağırması içindir." }
    ],
    vocab: [
      { term: "Profile", tr: "profil", ex: "Use the dev profile." },
      { term: "Credentials", tr: "kimlik bilgileri", ex: "Never commit credentials." },
      { term: "Pagination", tr: "sayfalama", ex: "Handle pagination in list calls." },
      { term: "Client", tr: "istemci nesnesi", ex: "Create an S3 client." },
      { term: "Environment variable", tr: "ortam değişkeni", ex: "Set an environment variable." }
    ],
    resources: [
      { title: "AWS CLI Kullanıcı Kılavuzu", url: DOC + "cli/latest/userguide/cli-chap-welcome.html", type: "doc", why: "Kurulum ve komutlar", level: "başlangıç", lang: "EN" },
      { title: "Boto3 Belgeleri", url: "https://boto3.amazonaws.com/v1/documentation/api/latest/index.html", type: "doc", why: "Python SDK", level: "orta", lang: "EN" }
    ],
    sources: [EXAM]
  };

  /* 10 ─────────────────────────────── S3 */
  L[10] = {
    hook: "Dosya depolamanın AWS'deki cevabı: sınırsız, dayanıklı ve ucuz.",
    homework: "Bir kova oluştur, bir dosya yükle, Block Public Access'in açık olduğunu doğrula ve geçici (presigned) bir bağlantı üret.",
    warmup: {
      recap: [{ point: "IAM politikası kaynağa erişimi belirler.", example: "s3:GetObject" }],
      concepts: [
        { term: "Object storage", tr: "Nesne depolama", summary: "Veri dosya sistemi yerine anahtarla adreslenen nesneler olarak saklanır.", example: "Anahtar: faturalar/2026/10.pdf" },
        { term: "Presigned URL", tr: "Önceden imzalı bağlantı", summary: "Belirli bir nesneye geçici erişim veren imzalı URL.", example: "15 dakikalık indirme linki" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Kullanıcılar profil fotoğrafı yüklüyor. Dosyayı sunucundan geçirmek yerine S3'e doğrudan presigned URL ile yükletirsin; sunucu yükü azalır." },
      { t: "steps", h: "Temel kavramlar", items: [
        "Kova (bucket): küresel olarak benzersiz adlı kapsayıcı, bir bölgede yaşar.",
        "Nesne: anahtar (key) + veri + metaveri. Klasörler aslında anahtar öneki (prefix).",
        "Dayanıklılık: %99,999999999 (11 dokuz); erişilebilirlik sınıfa göre değişir.",
        "Tek nesne en fazla 5 TB; 100 MB üstü için multipart yükleme önerilir."
      ] },
      { t: "steps", h: "Depolama sınıfları", items: [
        "Standard: sık erişim.",
        "Standard-IA / One Zone-IA: seyrek erişim, daha ucuz depolama, erişim ücreti.",
        "Intelligent-Tiering: erişim örüntüsüne göre otomatik taşır.",
        "Glacier sınıfları: arşiv, çok ucuz, geri getirme süreli.",
        "Lifecycle kuralı: 30 gün sonra IA'ya, 365 gün sonra Glacier'a taşı veya sil."
      ] },
      { t: "steps", h: "Güvenlik", items: [
        "Block Public Access: varsayılan açık bırak.",
        "Kova politikası + IAM: kime izin?",
        "Şifreleme: SSE-S3 (varsayılan), SSE-KMS (anahtar denetimi).",
        "Sürümleme (versioning): yanlışlıkla silme/üzerine yazmadan korur.",
        "Erişim günlükleri ve CloudTrail veri olayları."
      ] },
      { t: "box", h: "Olay bildirimi", text: "Nesne oluşturulunca S3 bir Lambda, SQS veya SNS'i tetikleyebilir (ör. yüklenen görseli küçült). Bu, sunucusuz mimarinin klasik kalıbıdır." },
      { t: "box", h: "Tutarlılık", text: "S3 artık yeni nesne yazma, üzerine yazma ve silme için güçlü okuma-sonrası-yazma tutarlılığı sağlar." },
      { t: "warn", h: "Tuzak", text: "Kovayı yanlışlıkla herkese açmak yıllardır en sık veri sızıntısı nedenidir. Block Public Access'i kapatma; statik site için CloudFront kullan." }
    ],
    quiz: [
      { q: "Uygulama sunucusunu geçmeden kullanıcıya doğrudan S3'e yükleme izni vermenin yolu nedir?", options: ["Presigned URL", "Kovayı herkese açmak", "Kök anahtar paylaşmak", "FTP"], answer: "Presigned URL", why: "Geçici ve sınırlı izin verir." },
      { q: "Seyrek erişilen veriyi otomatik taşıyan ve maliyeti düşüren özellik hangisidir?", options: ["Lifecycle kuralı", "CORS", "Presigned URL", "Event bildirimi"], answer: "Lifecycle kuralı", why: "Süreye göre sınıf değiştirir veya siler." },
      { q: "Yanlışlıkla silmeye veya üzerine yazmaya karşı hangi özellik korur?", options: ["Sürümleme (versioning)", "Transfer Acceleration", "Requester Pays", "CORS"], answer: "Sürümleme (versioning)", why: "Eski sürümler korunur ve geri alınabilir." },
      { q: "S3'te klasörler gerçekte nedir?", options: ["Anahtar önekleri", "Fiziksel dizinler", "Ayrı kovalar", "Veritabanı tabloları"], answer: "Anahtar önekleri", why: "S3 düz anahtar alanıdır." },
      { q: "Yüklenen dosyaya otomatik tepki vermek için hangisi kullanılır?", options: ["S3 olay bildirimi ve Lambda", "IAM kullanıcı", "Route 53", "Cron"], answer: "S3 olay bildirimi ve Lambda", why: "Olay tabanlı sunucusuz kalıp." }
    ],
    interview: [
      { q: "S3 depolama sınıflarını nasıl seçersin?", a: "Sık erişim için Standard, seyrek erişim için IA, bilinmeyen örüntü için Intelligent-Tiering, uzun süreli arşiv için Glacier. Lifecycle kurallarıyla geçişi otomatikleştiririm." },
      { q: "Bir kovayı güvenli tutmak için neler yaparsın?", a: "Block Public Access'i açık tutar, en az yetkili politika yazar, şifreleme ve sürümlemeyi etkinleştirir, erişimi günlüklerim. Dışarıya sunum gerekiyorsa CloudFront ve presigned URL kullanırım." }
    ],
    vocab: [
      { term: "Bucket", tr: "kova", ex: "Create a bucket." },
      { term: "Object", tr: "nesne", ex: "Upload an object." },
      { term: "Prefix", tr: "önek", ex: "List objects by prefix." },
      { term: "Lifecycle", tr: "yaşam döngüsü", ex: "Add a lifecycle rule." },
      { term: "Versioning", tr: "sürümleme", ex: "Enable versioning." }
    ],
    resources: [
      { title: "Amazon S3 Kullanıcı Kılavuzu", url: DOC + "AmazonS3/latest/userguide/Welcome.html", type: "doc", why: "Resmî rehber", level: "başlangıç", lang: "EN" },
      res(SKILL, "S3 ile ilgili dijital kurslar")
    ],
    sources: [EXAM]
  };

  /* 11 ─────────────────────────────── DynamoDB anahtar tasarımı */
  L[11] = {
    hook: "DynamoDB'de en önemli karar tablo oluştururken verdiğin: anahtarlar. Sonradan değiştiremezsin.",
    homework: "'Sipariş' tablosunu düşün: bir müşterinin tüm siparişlerini tarihe göre sıralı getirmek için partition key ve sort key ne olmalı?",
    warmup: {
      recap: [{ point: "NoSQL'de önce erişim kalıbı belirlenir.", example: "Hangi sorgular?" }],
      concepts: [
        { term: "Partition key", tr: "Bölüm anahtarı", summary: "Verinin hangi fiziksel bölüme gideceğini belirleyen anahtar. Hash'lenir.", example: "MusteriId" },
        { term: "Sort key", tr: "Sıralama anahtarı", summary: "Aynı bölüm anahtarlı öğeleri sıralar ve aralık sorgusu sağlar.", example: "SiparisTarihi" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Her sipariş tek bir 'durum' bölüm anahtarıyla saklanırsa tüm trafik tek bölüme yığılır ve kısıtlanma (throttling) başlar. İyi anahtar yükü eşit dağıtır." },
      { t: "steps", h: "Anahtar türleri", items: [
        "Basit anahtar: sadece partition key. Öğe tek anahtarla bulunur (GetItem).",
        "Bileşik anahtar: partition key + sort key. Aynı bölümde birden çok öğe, sıralı.",
        "Birincil anahtar benzersiz olmalıdır."
      ] },
      { t: "steps", h: "Temel işlemler", items: [
        "GetItem: tam anahtarla tek öğe. En hızlı ve ucuz.",
        "Query: bir partition key'e ait öğeler; sort key üzerinde koşul (begins_with, between).",
        "Scan: tüm tabloyu okur. Büyük tabloda yavaş ve pahalı, kaçın.",
        "PutItem, UpdateItem, DeleteItem, BatchWriteItem, TransactWriteItems."
      ] },
      { t: "cmd", lang: "bash", text: "# Bir müşterinin Ekim 2026 siparişleri\naws dynamodb query --table-name Siparisler \\\n  --key-condition-expression \"MusteriId = :m AND SiparisTarihi BETWEEN :a AND :b\" \\\n  --expression-attribute-values '{\":m\":{\"S\":\"M-17\"},\":a\":{\"S\":\"2026-10-01\"},\":b\":{\"S\":\"2026-10-31\"}}'" },
      { t: "box", h: "İyi partition key", text: "Çok sayıda farklı değeri olan ve erişimi eşit dağılan alan seçilir (kullanıcı kimliği, sipariş kimliği). Düşük çeşitlilik (durum, ülke) 'sıcak bölüm'e yol açar." },
      { t: "box", h: "Tek tablo tasarımı", text: "İlgili varlıkları (müşteri, siparişleri) aynı tabloda, PK/SK önekleriyle (PK = CUSTOMER#17, SK = ORDER#2026-10-11) saklayarak tek Query ile birlikte getirebilirsin." },
      { t: "warn", h: "Tuzak", text: "Scan ile filtre yazmak. Filtre okuma sonrası uygulanır; tüm öğeler okunur ve ücretlendirilir. Erişim kalıbı için anahtar veya indeks tasarla." }
    ],
    quiz: [
      { q: "Bir bölüm anahtarına ait öğeleri sıralı getirmek için hangi işlem uygundur?", options: ["Query", "Scan", "DeleteTable", "CreateBackup"], answer: "Query", why: "Query partition key ile çalışır, sort key'de koşul destekler." },
      { q: "İyi bir partition key nasıl olmalıdır?", options: ["Çok farklı değer içeren, eşit dağılan", "Sadece iki değerli", "Sabit", "Tarih"], answer: "Çok farklı değer içeren, eşit dağılan", why: "Yük bölümlere eşit dağılır." },
      { q: "Tüm tabloyu okuyan ve büyük tablolarda kaçınılan işlem hangisidir?", options: ["Scan", "GetItem", "Query", "PutItem"], answer: "Scan", why: "Tüm öğeler okunur ve ücretlendirilir." },
      { q: "Birincil anahtar bileşik olduğunda hangi iki parça vardır?", options: ["Partition key ve sort key", "İki sort key", "İki indeks", "Şema ve tablo"], answer: "Partition key ve sort key", why: "Birlikte benzersiz olmalıdır." },
      { q: "'Sıcak bölüm' neden oluşur?", options: ["Trafiğin tek anahtar değerine yığılması", "Tablo büyüklüğü", "Şifreleme", "Yedekleme"], answer: "Trafiğin tek anahtar değerine yığılması", why: "Bölüm başına kapasite sınırlıdır." }
    ],
    interview: [
      { q: "Query ile Scan arasındaki fark nedir?", a: "Query bir partition key'in öğelerini hedefler (sort key koşuluyla), sadece gerekli öğeleri okur. Scan tüm tabloyu okur; büyük tabloda yavaş ve pahalıdır." },
      { q: "İyi bir partition key nasıl seçilir?", a: "Yüksek çeşitlilikli ve erişimi eşit dağılan alan seçilir. Önce erişim kalıpları listelenir; anahtar bu kalıpları GetItem veya Query ile karşılayacak şekilde tasarlanır." }
    ],
    vocab: [
      { term: "Item", tr: "öğe (satır)", ex: "Write an item to the table." },
      { term: "Attribute", tr: "öznitelik", ex: "Add an attribute." },
      { term: "Hot partition", tr: "sıcak bölüm", ex: "A hot partition causes throttling." },
      { term: "Access pattern", tr: "erişim kalıbı", ex: "List your access patterns first." },
      { term: "Throttling", tr: "kısıtlanma", ex: "Requests are throttled." }
    ],
    resources: [
      { title: "DynamoDB: Birincil anahtar tasarımı", url: DOC + "amazondynamodb/latest/developerguide/bp-partition-key-design.html", type: "doc", why: "Resmî en iyi uygulamalar", level: "orta", lang: "EN" },
      { title: "The DynamoDB Book / Alex DeBrie yazıları", url: "https://www.alexdebrie.com/posts/dynamodb-single-table/", type: "article", why: "Tek tablo tasarımı", level: "ileri", lang: "EN" }
    ],
    sources: [EXAM]
  };

  /* 12 ─────────────────────────────── DynamoDB indeks ve kapasite */
  L[12] = {
    hook: "Tablo anahtarı tek sorguya yeter. İkinci bir sorgu için ikinci bir yol gerekir: indeks.",
    homework: "Siparişleri 'durum' alanına göre sorgulamak için bir GSI tasarla: GSI'nın partition ve sort key'i ne olur?",
    warmup: {
      recap: [{ point: "Query partition key ister.", example: "MusteriId" }],
      concepts: [
        { term: "GSI", tr: "Global ikincil indeks", summary: "Tablodan farklı bir partition/sort key ile sorgulama sağlar; kendi kapasitesi vardır.", example: "Durum + Tarih" },
        { term: "RCU / WCU", tr: "Okuma / yazma kapasite birimi", summary: "Sağlanmış kapasite modelinde okuma ve yazma hızı birimi.", example: "1 RCU = 4 KB'a kadar saniyede 1 güçlü tutarlı okuma" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Tablo MusteriId ile sorgulanıyor ama yönetici paneli 'bekleyen siparişler'i listelemek istiyor. Scan yerine durum alanı üzerine GSI kurarsın." },
      { t: "steps", h: "İkincil indeksler", items: [
        "GSI: farklı partition + sort key; sonradan eklenebilir; nihai tutarlı okuma; ayrı kapasite.",
        "LSI: aynı partition key, farklı sort key; sadece tablo oluşturulurken eklenir; güçlü tutarlı okuma destekler; bölüm başına 10 GB sınırı getirir.",
        "Projeksiyon: indekse hangi özniteliklerin kopyalanacağı (KEYS_ONLY, INCLUDE, ALL)."
      ] },
      { t: "steps", h: "Kapasite modları", items: [
        "On-demand: kapasite planlamadan, istek başına öde. Öngörülemeyen yük için.",
        "Provisioned: RCU/WCU sen belirlersin; Auto Scaling ile uyarlanır. Öngörülebilir yük için daha ucuz.",
        "Aşıldığında ProvisionedThroughputExceededException ve kısıtlanma."
      ] },
      { t: "box", h: "Kapasite hesabı", text: "Yazma: 1 KB'a kadar 1 WCU. Okuma: güçlü tutarlı 4 KB için 1 RCU, nihai tutarlı 4 KB için 0,5 RCU, işlemli (transactional) 4 KB için 2 RCU. Örnek: 6 KB'lık öğeyi saniyede 10 kez güçlü tutarlı okumak = 2 × 10 = 20 RCU." },
      { t: "steps", h: "Diğer özellikler", items: [
        "TTL: süresi geçen öğeleri otomatik siler (ücretsiz).",
        "DynamoDB Streams: öğe değişikliklerini sırayla yakalar; Lambda'yı tetikler.",
        "DAX: DynamoDB için bellek içi önbellek (mikrosaniye okuma).",
        "Point-in-time recovery ve isteğe bağlı yedek.",
        "Koşullu yazma (ConditionExpression): eşzamanlı güncellemelerde çakışmayı önler."
      ] },
      { t: "warn", h: "Tuzak", text: "Kısıtlanmada yeniden denemeyi hemen ve sürekli yapmak yükü artırır. Üstel geri çekilme (exponential backoff) ve jitter kullan; SDK bunu yapar." }
    ],
    quiz: [
      { q: "Sonradan eklenebilen, farklı partition key ile sorgu sağlayan indeks hangisidir?", options: ["GSI", "LSI", "Primary key", "DAX"], answer: "GSI", why: "GSI istenildiğinde eklenir; LSI yalnızca tablo oluşturulurken." },
      { q: "6 KB'lık bir öğeyi saniyede 10 kez güçlü tutarlı okumak kaç RCU gerektirir?", options: ["20", "10", "60", "5"], answer: "20", why: "6 KB → 2 birim (4 KB'a yuvarla) × 10 = 20 RCU." },
      { q: "Süresi dolan öğeleri otomatik silen özellik hangisidir?", options: ["TTL", "Streams", "DAX", "GSI"], answer: "TTL", why: "TTL, süre alanı geçince öğeyi siler." },
      { q: "Öngörülemeyen, ani dalgalanan yük için hangi kapasite modu uygundur?", options: ["On-demand", "Provisioned sabit", "Reserved", "Yedek mod"], answer: "On-demand", why: "Kapasite planlamadan istek başına öder." },
      { q: "DynamoDB değişikliklerini yakalayıp Lambda tetiklemek için ne kullanılır?", options: ["DynamoDB Streams", "CloudFront", "Route 53", "Snowball"], answer: "DynamoDB Streams", why: "Değişiklik akışı olayları sıralı sağlar." }
    ],
    interview: [
      { q: "GSI ve LSI farkı nedir?", a: "GSI farklı partition ve sort key kullanır, sonradan eklenebilir, ayrı kapasiteye ve nihai tutarlılığa sahiptir. LSI aynı partition key'i korur, sadece tablo oluşturulurken eklenir, güçlü tutarlı okuma destekler ve bölüm başına boyut sınırı getirir." },
      { q: "On-demand mı provisioned mı?", a: "Yük öngörülemez veya yeniyse on-demand. Yük sabit ve öngörülebilirse provisioned ve Auto Scaling, birim başına daha ucuzdur." },
      { q: "Kısıtlanma (throttling) aldığında ne yaparsın?", a: "Üstel geri çekilme ve jitter ile yeniden denerim, anahtar dağılımını (sıcak bölüm) incelerim, gerekirse kapasiteyi artırır veya DAX gibi önbellek eklerim." }
    ],
    vocab: [
      { term: "Index", tr: "indeks", ex: "Create a global secondary index." },
      { term: "Projection", tr: "projeksiyon", ex: "Project only the keys." },
      { term: "Capacity unit", tr: "kapasite birimi", ex: "Calculate read capacity units." },
      { term: "Backoff", tr: "geri çekilme", ex: "Use exponential backoff." },
      { term: "Stream", tr: "akış", ex: "Process the stream with Lambda." }
    ],
    resources: [
      { title: "DynamoDB ikincil indeksler", url: DOC + "amazondynamodb/latest/developerguide/SecondaryIndexes.html", type: "doc", why: "GSI ve LSI ayrıntıları", level: "orta", lang: "EN" },
      { title: "DynamoDB okuma/yazma kapasite modları", url: DOC + "amazondynamodb/latest/developerguide/capacity-mode.html", type: "doc", why: "On-demand ve provisioned", level: "orta", lang: "EN" }
    ],
    sources: [EXAM]
  };
})();

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
        "IaaS: sanal makine, ağ (EC2, VPC). Sistem yönetimi sende.",
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
    objectives: [
      { id: "h1", text: "Paylaşılan sorumluluk modelinde AWS'nin ve müşterinin sorumluluklarını ayırt edebilirsin." },
      { id: "h2", text: "Region ile Availability Zone farkını söyleyebilirsin." },
      { id: "h3", text: "Yeni bir AWS hesabında kök kullanıcı için ilk güvenlik adımını seçebilirsin." },
      { id: "h4", text: "IaaS, PaaS ve sunucusuz (serverless) modellerini sunucu yönetimi sorumluluğuna göre ayırt edebilirsin." }
    ],
    summary: [
      "AWS bulutun güvenliğinden (donanım, veri merkezi, hipervizör), sen bulut içindeki güvenlikten (IAM, veri, yapılandırma, kod) sorumlusun.",
      "Region coğrafi bir bölgedir; Availability Zone bu bölgedeki bağımsız veri merkezi gruplarıdır.",
      "Kök kullanıcıya güçlü parola ve MFA koy, günlük işte kullanma; iş için ayrı yönetici kimliği aç.",
      "Sunucusuz modelde (Lambda, DynamoDB, S3) sunucuyu hiç yönetmezsin; IaaS'ta sistem yönetimi sendedir.",
      "Billing > Budgets ile bütçe uyarısı kur; erişim anahtarını koda veya GitHub'a koyma."
    ],
    quiz: [
      { id: "cf55feed", q: "Paylaşılan sorumluluk modelinde müşteri neyden sorumludur?", options: ["Bulut İÇİNDEKİ güvenlik (IAM, veri, yapılandırma)","Fiziksel veri merkezi","Hipervizör","Güç ve soğutma"], obj: "h1" },
      { id: "f75459c9", q: "Bir bölge içindeki bağımsız veri merkezi gruplarına ne denir?", options: ["Availability Zone","Edge location","Bucket","VPC peering"], obj: "h2" },
      { id: "309ba087", q: "Kök hesap için ilk yapılması gereken nedir?", options: ["MFA etkinleştirmek ve günlük işte kullanmamak","Erişim anahtarı oluşturmak","Herkesle paylaşmak","Parolayı basit tutmak"], obj: "h3" },
      { id: "a15e88ac", q: "Kodu platforma yükleyip altındaki sunucu ve işletim sistemini platforma bıraktığın model (ör. Elastic Beanstalk) hangisidir?", options: ["IaaS","SaaS","Colocation","PaaS"], obj: "h4" },
      { id: "7e675881", q: "Sunucuyu hiç yönetmediğin model hangisidir?", options: ["Sunucusuz (serverless)","IaaS","Fiziksel sunucu","Colocation"], obj: "h4" }
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
        "Birden çok politika birleşir; herhangi bir açık Deny kazanır."
      ] },
      { t: "box", h: "En az yetki", text: "Sadece görevin gerektirdiği eylemleri ve kaynakları ver. Önce dar başla, AccessDenied aldıkça gerekeni ekle. '*' yetkisi (her şeye izin) üretimde sorun işaretidir." },
      { t: "box", h: "Rol ve güven politikası", text: "Bir rolün iki yönü vardır: izin politikası (ne yapabilir) ve güven politikası (kim üstlenebilir; ör. lambda.amazonaws.com). Geçici kimlik bilgilerini STS verir." },
      { t: "warn", h: "Tuzak", text: "Kodda sabit erişim anahtarı kullanmak. Bunun yerine uygulamanın çalıştığı servise rol ver; SDK kimlik bilgisini otomatik alır." }
    ],
    objectives: [
      { id: "h1", text: "Bir isteğin sonucunu örtük deny, açık Allow ve açık Deny kurallarına göre söyleyebilirsin." },
      { id: "h2", text: "Bir Lambda fonksiyonunun AWS'ye erişimi için kullanıcı anahtarı yerine IAM rolünü seçebilirsin." },
      { id: "h3", text: "En az yetki ilkesine göre bir kimliğe yalnız gereken izinleri verebilirsin." },
      { id: "h4", text: "Rolün güven politikası ile izin politikasını ayırt edebilirsin." }
    ],
    summary: [
      "IAM'de varsayılan her şey reddedilir (örtük deny); açık Allow izin verir, açık Deny her şeyi geçersiz kılar.",
      "Servisler uzun ömürlü anahtar yerine IAM rolü üstlenir; rol geçici kimlik bilgisi verir.",
      "En az yetki: yalnız görevin gerektirdiği eylemleri ve kaynakları ver, '*' yetkisinden kaçın.",
      "İzin politikası rolün ne yapabileceğini, güven politikası rolü kimin üstlenebileceğini belirler."
    ],
    quiz: [
      { id: "877a2355", q: "IAM'de varsayılan davranış nedir?", options: ["Her şey reddedilir","Her şeye izin verilir","Sadece okuma","Sadece yazma"], obj: "h1" },
      { id: "2d8379a0", q: "Açık Deny ile açık Allow çakışırsa ne olur?", options: ["Allow kazanır","İlk gelen kazanır","Deny kazanır","Hata verir"], obj: "h1" },
      { id: "c5f7a85c", q: "Bir Lambda fonksiyonu AWS servisine erişmek için neyi kullanmalıdır?", options: ["Koda gömülü erişim anahtarı","Kök hesap parolası","IAM rolü","Genel kova"], obj: "h2" },
      { id: "d52795ff", q: "En az yetki ilkesi ne demektir?", options: ["Herkese yönetici yetkisi","İzinleri hiç vermemek","Sadece gereken izinleri vermek","Kök hesap kullanmak"], obj: "h3" },
      { id: "2a7916e0", q: "Bir rolü kimlerin üstlenebileceğini hangi belge belirler?", options: ["S3 kova politikası","Güvenlik grubu","KMS anahtarı","Güven politikası"], obj: "h4" }
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
        "~/.aws/credentials ve config dosyası, profiller; SSO ile oturum (aws sso login) da buradandır, geçici kimlik verir.",
        "Konteyner/EC2/Lambda rolü: SDK otomatik bulur."
      ] },
      { t: "box", h: "Faydalı bayraklar", text: "--profile: hangi kimlik. --region: hangi bölge. --output json|table|text. --query: JMESPath ile çıktıyı süz. --dry-run: bazı komutlarda gerçekten uygulamadan dene. Sayfalama için --max-items ve --starting-token." },
      { t: "warn", h: "Tuzak", text: "Yanlış profil veya bölgeyle komut çalıştırmak: üretim kaynağını silebilirsin. Komuttan önce aws sts get-caller-identity ve bölgeyi kontrol etme alışkanlığı edin." }
    ],
    objectives: [
      { id: "h1", text: "aws sts get-caller-identity ile hangi kimlikle çalıştığını doğrulayabilirsin." },
      { id: "h2", text: "Python'dan AWS API'lerini çağıran SDK'nın adını (boto3) söyleyebilirsin." },
      { id: "h3", text: "Lambda gibi bulut içi kodun AWS'ye yetkilenme yolu olarak yürütme rolünü seçebilirsin." },
      { id: "h4", text: "CLI çıktısını --query bayrağıyla süzebilirsin." }
    ],
    summary: [
      "CLI betik ve hızlı yönetim için, SDK uygulama kodunun AWS'yi çağırması içindir; Python SDK'sı boto3'tür.",
      "Komuttan önce aws sts get-caller-identity ile kimliği, ayrıca profili ve bölgeyi kontrol et.",
      "Bulutta çalışan kod anahtar gömmek yerine rolün geçici kimlik bilgisini kullanır; SDK bunu otomatik bulur.",
      "--query JMESPath ile çıktıdan alan seçer; --profile ve --region hangi kimlik ve bölgeyi belirler."
    ],
    quiz: [
      { id: "ecb1a4bc", q: "Kimin adına işlem yaptığını gösteren komut hangisidir?", options: ["aws s3 ls","aws configure list-all","aws sts get-caller-identity","aws iam delete-user"], obj: "h1" },
      { id: "9e6bdccd", q: "Python için AWS SDK'sının adı nedir?", options: ["pandas","django","numpy","boto3"], obj: "h2" },
      { id: "0c24d4f8", q: "Lambda içindeki kod AWS'ye nasıl yetkilenmelidir?", options: ["Kodda gömülü anahtarla","Parolayla","Anonim","Yürütme rolü üzerinden"], obj: "h3" },
      { id: "51158993", q: "CLI çıktısını süzmek için hangi bayrak kullanılır?", options: ["--dry","--force","--wait-all","--query"], obj: "h4" }
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
    objectives: [
      { id: "h1", text: "Kullanıcının dosyayı doğrudan S3'e yüklemesi için presigned URL'yi seçebilirsin." },
      { id: "h2", text: "Lifecycle kuralı ile sürümleme özelliklerini amaçlarına (maliyet, koruma) göre eşleştirebilirsin." },
      { id: "h3", text: "S3'te klasörlerin gerçekte anahtar öneki olduğunu söyleyebilirsin." },
      { id: "h4", text: "Yüklenen nesneye otomatik tepki veren olay tabanlı akışı (S3 olay bildirimi ve Lambda) belirtebilirsin." }
    ],
    summary: [
      "Presigned URL, tek bir nesneye geçici ve sınırlı erişim verir; kovayı herkese açmak sızıntı nedenidir.",
      "Lifecycle kuralı nesneleri süreye göre IA veya Glacier'a taşır ya da siler; sürümleme yanlışlıkla silmeden korur.",
      "S3 düz bir anahtar alanıdır; klasör gibi görünenler anahtar önekleridir (prefix).",
      "Nesne oluşunca S3 bir Lambda, SQS veya SNS'i tetikleyebilir; bu sunucusuz mimarinin klasik kalıbıdır."
    ],
    quiz: [
      { id: "6ebaead7", q: "Uygulama sunucusunu geçmeden kullanıcıya doğrudan S3'e yükleme izni vermenin yolu nedir?", options: ["Kovayı herkese açmak","Kök anahtar paylaşmak","FTP","Presigned URL"], obj: "h1" },
      { id: "a3c4091c", q: "Seyrek erişilen veriyi otomatik taşıyan ve maliyeti düşüren özellik hangisidir?", options: ["CORS","Presigned URL","Event bildirimi","Lifecycle kuralı"], obj: "h2" },
      { id: "a75d351f", q: "Yanlışlıkla silmeye veya üzerine yazmaya karşı hangi özellik korur?", options: ["Transfer Acceleration","Sürümleme (versioning)","Requester Pays","CORS"], obj: "h2" },
      { id: "20b3435d", q: "S3'te klasörler gerçekte nedir?", options: ["Fiziksel dizinler","Anahtar önekleri","Ayrı kovalar","Veritabanı tabloları"], obj: "h3" },
      { id: "265212fb", q: "Yüklenen dosyaya otomatik tepki vermek için hangisi kullanılır?", options: ["IAM kullanıcı","Route 53","S3 olay bildirimi ve Lambda","Cron"], obj: "h4" }
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
    hook: "DynamoDB'de en önemli karar, tabloyu oluştururken seçtiğin anahtarlardır. Sonradan değiştiremezsin.",
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
      { t: "cmd", lang: "bash", text: "# Bir müşterinin Ekim 2026 siparişleri\naws dynamodb query --table-name Siparisler \\\n  --key-condition-expression \"MusteriId = :m AND SiparisTarihi BETWEEN :a AND :b\" \\\n  --expression-attribute-values '{\":m\":{\"S\":\"M-17\"},\":a\":{\"S\":\"2026-10-01\"},\":b\":{\"S\":\"2026-10-31T23:59:59\"}}'" },
      { t: "box", h: "İyi partition key", text: "Çok sayıda farklı değeri olan ve erişimi eşit dağılan alan seçilir (kullanıcı kimliği, sipariş kimliği). Düşük çeşitlilik (durum, ülke) 'sıcak bölüm'e yol açar." },
      { t: "box", h: "Tek tablo tasarımı", text: "İlgili varlıkları (müşteri, siparişleri) aynı tabloda, PK/SK önekleriyle (PK = CUSTOMER#17, SK = ORDER#2026-10-11) saklayarak tek Query ile birlikte getirebilirsin." },
      { t: "warn", h: "Tuzak", text: "Scan ile filtre yazmak. Filtre okuma sonrası uygulanır; tüm öğeler okunur ve ücretlendirilir. Erişim kalıbı için anahtar veya indeks tasarla." }
    ],
    objectives: [
      { id: "h1", text: "Bir erişim kalıbı için GetItem, Query ve Scan işlemlerinden uygun olanı seçebilirsin." },
      { id: "h2", text: "İyi bir partition key'in niteliklerini (çok farklı değer, eşit dağılım) söyleyebilirsin." },
      { id: "h3", text: "Bir tablo için partition key ve sort key çiftini erişim kalıbına göre belirleyebilirsin." },
      { id: "h4", text: "Sıcak bölümün (hot partition) nedenini açıklayabilirsin." }
    ],
    summary: [
      "GetItem tam anahtarla tek öğe getirir, Query bir partition key'in öğelerini sıralı getirir, Scan tüm tabloyu okur ve kaçınılır.",
      "İyi partition key çok farklı değer içerir ve erişimi eşit dağıtır; durum veya ülke gibi düşük çeşitlilik sorun çıkarır.",
      "Bileşik anahtar partition key ve sort key'den oluşur; ikisi birlikte benzersiz olmalıdır.",
      "Trafik tek anahtar değerine yığılınca sıcak bölüm oluşur ve kısıtlanma (throttling) başlar."
    ],
    quiz: [
      { id: "7ca9c265", q: "Bir bölüm anahtarına ait öğeleri sıralı getirmek için hangi işlem uygundur?", options: ["Scan","DeleteTable","Query","CreateBackup"], obj: "h1" },
      { id: "3c86ba1b", q: "İyi bir partition key nasıl olmalıdır?", options: ["Sadece iki değerli","Sabit","Tarih","Çok farklı değer içeren, eşit dağılan"], obj: "h2" },
      { id: "ec3ef19a", q: "Tüm tabloyu okuyan ve büyük tablolarda kaçınılan işlem hangisidir?", options: ["GetItem","Scan","Query","PutItem"], obj: "h1" },
      { id: "7dc2b4b1", q: "Birincil anahtar bileşik olduğunda hangi iki parça vardır?", options: ["İki sort key","İki indeks","Şema ve tablo","Partition key ve sort key"], obj: "h3" },
      { id: "1103736d", q: "'Sıcak bölüm' neden oluşur?", options: ["Tablo büyüklüğü","Şifreleme","Trafiğin tek anahtar değerine yığılması","Yedekleme"], obj: "h4" },
      { id: "0fb865b8", q: "Bir müşterinin tüm siparişlerini tarihe göre sıralı getirmek için hangi anahtar çifti uygundur?", options: ["Partition key: SiparisTarihi, sort key: MusteriId","Partition key: Durum, sort key: MusteriId","Partition key: MusteriId, sort key: SiparisTarihi","Yalnız partition key: MusteriId"], obj: "h3" }
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
    homework: "Tüm müşterilerin 'bekleyen' siparişlerini tarihe göre sorgulamak için bir GSI tasarla: GSI'nın partition ve sort key'i ne olur? Yalnız 'durum' partition key olunca hangi sorun çıkar, nasıl azaltırsın?",
    warmup: {
      recap: [{ point: "Query partition key ister.", example: "MusteriId" }],
      concepts: [
        { term: "GSI", tr: "Global ikincil indeks", summary: "Tablodan farklı bir partition/sort key ile sorgulama sağlar; kendi kapasitesi vardır.", example: "Durum + Tarih" },
        { term: "RCU / WCU", tr: "Okuma / yazma kapasite birimi", summary: "Sağlanmış kapasite modelinde okuma ve yazma hızı birimi.", example: "1 RCU = 4 KB'a kadar saniyede 1 güçlü tutarlı okuma" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Tablo MusteriId ile sorgulanıyor ama yönetici paneli 'bekleyen siparişler'i listelemek istiyor. Scan yerine Durum partition key, Tarih sort key olan bir GSI kurarsın. Dikkat: az değerli 'durum' GSI'da da sıcak bölüm yapar; çok yoğun yazmada Durum#1..N gibi parçalanmış değerler kullan ve sorguda hepsini oku." },
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
    objectives: [
      { id: "h1", text: "GSI ile LSI'yi ayırt edebilir ve sorgu ihtiyacına (farklı partition key mi, güçlü tutarlılık mı) göre birini seçebilirsin." },
      { id: "h2", text: "Bir öğe boyutu ve okuma/yazma sıklığından RCU ve WCU hesaplayabilirsin." },
      { id: "h3", text: "Yükün öngörülebilirliğine göre on-demand ya da provisioned kapasite modunu seçebilirsin." },
      { id: "h4", text: "TTL ve DynamoDB Streams'in ne işe yaradığını eşleştirebilirsin." }
    ],
    summary: [
      "GSI farklı partition ve sort key ile sonradan eklenebilir; LSI aynı partition key'i korur ve yalnız tablo oluşturulurken eklenir.",
      "Kapasite birimi hesabında öğe boyutu yukarı yuvarlanır: okumada 4 KB, yazmada 1 KB dilimi başına birim.",
      "On-demand öngörülemeyen yük için, provisioned (Auto Scaling ile) öngörülebilir yük için uygundur.",
      "TTL süresi geçen öğeleri siler, Streams öğe değişikliklerini sırayla yakalayıp Lambda'yı tetikleyebilir.",
      "Kısıtlanmada hemen yeniden denemek yükü artırır; üstel geri çekilme ve jitter kullan."
    ],
    quiz: [
      { id: "8f4a6af7", q: "Sonradan eklenebilen, farklı partition key ile sorgu sağlayan indeks hangisidir?", options: ["LSI","Primary key","GSI","DAX"], obj: "h1" },
      { id: "8378652d", q: "6 KB'lık bir öğeyi saniyede 10 kez güçlü tutarlı okumak kaç RCU gerektirir?", options: ["10","60","5","20"], obj: "h2" },
      { id: "82a75d04", q: "Süresi dolan öğeleri otomatik silen özellik hangisidir?", options: ["Streams","DAX","TTL","GSI"], obj: "h4" },
      { id: "4c12e2bd", q: "Öngörülemeyen, ani dalgalanan yük için hangi kapasite modu uygundur?", options: ["Provisioned sabit","On-demand","Reserved","Yedek mod"], obj: "h3" },
      { id: "d0919763", q: "DynamoDB değişikliklerini yakalayıp Lambda tetiklemek için ne kullanılır?", options: ["CloudFront","Route 53","Snowball","DynamoDB Streams"], obj: "h4" },
      { id: "f238a2f0", q: "Aynı partition key'i koruyup farklı bir sort key ile sorgulamak ve güçlü tutarlı okuma da istemek için hangi indeks gerekir?", options: ["LSI","GSI","DAX önbelleği","Streams"], obj: "h1" },
      { id: "6a99a945", q: "3,5 KB'lık bir öğeyi saniyede 100 kez yazmak kaç WCU gerektirir?", options: ["350","100","400","200"], obj: "h2" }
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

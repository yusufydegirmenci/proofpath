/* Backend / AWS · sabit dersler 25-30 */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).bk = (window.PP_LESSONS.bk || {}));
  var DOC = "https://docs.aws.amazon.com/";
  var SKILL = { title: "AWS Skill Builder (ücretsiz dijital kurslar)", url: "https://skillbuilder.aws/", type: "course", level: "başlangıç", lang: "EN" };
  var EXAM = { title: "AWS Certified Developer – Associate", url: "https://aws.amazon.com/certification/certified-developer-associate/", type: "doc", level: "orta", lang: "EN" };
  function res(a, why) { var o = {}; for (var k in a) o[k] = a[k]; o.why = why; return o; }

  /* 25 ─────────────────────────────── KMS */
  L[25] = {
    hook: "Veriyi şifrelemek kolay; anahtarı güvenle yönetmek zor. KMS bunu senin için yapar.",
    homework: "Zarf şifrelemeyi (envelope encryption) kendi cümlelerinle üç adımda yaz: veri anahtarı, ana anahtar, şifreli veri.",
    warmup: {
      recap: [{ point: "IAM kimin neyi yapabileceğini belirler.", example: "kms:Decrypt" }],
      concepts: [
        { term: "KMS key", tr: "KMS anahtarı", summary: "AWS KMS'de saklanan, dışarı çıkmayan şifreleme anahtarı.", example: "alias/uygulama-anahtari" },
        { term: "Envelope encryption", tr: "Zarf şifreleme", summary: "Veriyi veri anahtarıyla, veri anahtarını da KMS anahtarıyla şifreleme.", example: "GenerateDataKey" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Müşteri verisini S3'te, RDS'te ve DynamoDB'de şifreli tutman gerekiyor. KMS anahtarı bu servislerle bütünleşir; kimin şifre çözebildiğini IAM ve anahtar politikasıyla denetler, tüm kullanım CloudTrail'e yazılır." },
      { t: "steps", h: "Anahtar türleri", items: [
        "AWS owned keys: AWS'nin yönettiği, görünmeyen anahtarlar.",
        "AWS managed keys (aws/s3 gibi): hesabında görünür, otomatik döner, politikasını değiştiremezsin.",
        "Customer managed keys: sen oluşturursun; politika, rotasyon ve silme zamanlaması sende. Aylık küçük ücret.",
        "Simetrik (AES-256) varsayılan; asimetrik anahtarlar imza ve dışarıda şifreleme için."
      ] },
      { t: "steps", h: "Zarf şifreleme akışı", items: [
        "GenerateDataKey çağrılır: düz veri anahtarı + KMS ile şifrelenmiş kopyası döner.",
        "Veri, düz veri anahtarıyla yerelde şifrelenir; düz anahtar bellekten silinir.",
        "Şifreli veri ve şifreli veri anahtarı birlikte saklanır.",
        "Çözmek için şifreli veri anahtarı KMS Decrypt ile açılır, sonra veri çözülür.",
        "Neden? KMS doğrudan en fazla 4 KB şifreler; büyük veri için veri anahtarı gerekir."
      ] },
      { t: "box", h: "Erişim: anahtar politikası", text: "Her KMS anahtarının bir anahtar politikası vardır ve erişimin temel kaynağıdır. IAM politikası ancak anahtar politikası IAM'e yetki veriyorsa işe yarar. Hesaplar arası kullanım için anahtar politikasında diğer hesabı açıkça belirtmek gerekir." },
      { t: "steps", h: "Diğer önemli noktalar", items: [
        "Otomatik rotasyon (yıllık) müşteri yönetimli anahtarlarda açılabilir.",
        "Anahtar silme için 7-30 günlük bekleme süresi vardır; silinen anahtarla şifreli veri kurtarılamaz.",
        "Şifreleme bağlamı (encryption context): ek doğrulama verisi, günlüklerde görünür.",
        "Bölgeseldir; çok bölgeli anahtar (multi-Region key) desteklenir.",
        "KMS API çağrı kotaları vardır; büyük hacimde veri anahtarı önbellekleme veya S3 bucket key kullanılır."
      ] },
      { t: "warn", h: "Tuzak", text: "Anahtarı silmeyi planlayıp 'zaten kullanılmıyor' demek: bu anahtarla şifreli bir yedek varsa veriye bir daha ulaşamazsın. Silmek yerine devre dışı bırakıp izle." },
      {t:"steps",h:"CloudHSM ve KMS farkı (SAA-C03)",items:["AWS CloudHSM, hesabına ayrılmış tek kiracılı bir donanım güvenlik modülü kümesidir; anahtarları yalnızca sen yönetirsin, AWS anahtar malzemesine erişemez.","Standart arayüzlerle çalışır: PKCS#11, Java JCE ve Microsoft CNG. Bu arayüzleri bekleyen uygulamalar için seçilir.","KMS yönetilen ve çok kiracılı bir hizmettir, çoğu AWS hizmetine doğrudan entegredir ve işletme yükü düşüktür. CloudHSM ise tek kiracılı özel donanım ve tam anahtar denetimi şartı olduğunda gerekir; kümeyi sen ölçeklersin ve yüksek erişilebilirlik için birden çok AZ'ye yayarsın.","KMS özel anahtar deposu (custom key store) olarak CloudHSM kümesine bağlanabilir."]}
    ],
    objectives: [
      { id: "h1", text: "AWS owned, AWS managed ve customer managed anahtar türlerini kontrol düzeyine göre ayırt edebilirsin." },
      { id: "h2", text: "Zarf şifreleme akışını GenerateDataKey ve Decrypt adımlarıyla anlatabilirsin." },
      { id: "h3", text: "KMS'in doğrudan şifreleyebildiği veri sınırını ve nedenini belirtebilirsin." },
      { id: "h4", text: "Anahtar silme bekleme süresini ve CloudTrail kaydını güvenlik önlemi olarak açıklayabilirsin." },
      { id: "h5", text: "KMS ile CloudHSM'i (çok kiracılı yönetilen hizmet ile tek kiracılı özel donanım) ayırt edebilirsin." }
    ],
    summary: [
      "KMS anahtarı S3, RDS, DynamoDB ile bütünleşir; erişim IAM ve anahtar politikasıyla denetlenir.",
      "Customer managed key'de politika, rotasyon ve silme zamanlaması sendedir.",
      "Zarf şifrelemede veri, veri anahtarıyla şifrelenir; KMS doğrudan en fazla 4 KB şifreler.",
      "Anahtar silme için 7-30 günlük bekleme vardır; silinen anahtarla şifreli veri kurtarılamaz.",
      "Tüm anahtar kullanımı CloudTrail'e yazılır.",
      "CloudHSM tek kiracılı özel HSM'dir ve PKCS#11/JCE/CNG sunar; tam anahtar denetimi şartı yoksa işletme yükü düşük olan KMS tercih edilir."
    ],
    quiz: [
      { id: "ddb58c9f", q: "KMS doğrudan en fazla kaç KB veriyi şifreleyebilir?", options: ["4 KB", "4 GB", "256 MB", "1 TB"], obj: "h3" },
      { id: "cb808b4a", q: "Veriyi veri anahtarıyla, veri anahtarını KMS anahtarıyla şifreleme yöntemine ne denir?", options: ["Envelope encryption", "Hashing", "Salting", "Tokenization"], obj: "h2" },
      { id: "854d6b25", q: "Politikasını ve rotasyonunu kontrol edebildiğin anahtar türü hangisidir?", options: ["Customer managed key", "AWS owned key", "AWS managed key", "Hiçbiri"], obj: "h1" },
      { id: "b2f471bf", q: "Bir KMS anahtarı silinmeye planlanırsa ne olur?", options: ["7-30 gün bekleme süresi uygulanır", "Anında silinir", "Hiç silinmez", "S3'e taşınır"], obj: "h4" },
      { id: "83779b5c", q: "KMS anahtar kullanımı nerede kayıt altına alınır?", options: ["CloudTrail", "Route 53", "SQS", "ECR"], obj: "h4" },
      { id: "3bb6e151", q: "Bir bankanın uyumluluk kuralı, şifreleme anahtarlarının yalnızca kendisine ayrılmış tek kiracılı bir donanım güvenlik modülünde tutulmasını ve AWS'nin anahtar malzemesine erişememesini şart koşuyor. Hangi hizmet kullanılmalıdır?", options: ["AWS tarafından yönetilen KMS anahtarı (varsayılan anahtar)","AWS Secrets Manager","AWS Certificate Manager (ACM)","AWS CloudHSM"], obj: "h5" },
      { id: "6378223c", q: "Eski bir uygulama anahtar işlemlerini PKCS#11 arayüzüyle yapıyor ve kod değiştirilemiyor. Anahtarlar AWS'de tutulacak. Hangi hizmet bu arayüzü destekler?", options: ["Amazon Cognito","AWS CloudHSM","Yalnızca AWS KMS'nin kendi API'si","AWS Systems Manager Parameter Store"], obj: "h5" }
    ],
    interview: [
      { q: "Zarf şifreleme nedir, neden kullanılır?", a: "Veri, bir veri anahtarıyla şifrelenir; o veri anahtarı da KMS anahtarıyla şifrelenip veriyle saklanır. KMS 4 KB sınırı olduğundan ve büyük veride ağ yükünü azaltmak için bu yöntem kullanılır." },
      { q: "AWS managed key ve customer managed key farkı?", a: "AWS managed key ücretsiz ve otomatik yönetilir ama politikası değiştirilemez. Customer managed key üzerinde politika, rotasyon, etkinleştirme ve hesaplar arası paylaşım kontrolü sendedir." }
    ],
    vocab: [
      { term: "Encrypt", tr: "şifrelemek", ex: "Encrypt data at rest." },
      { term: "Decrypt", tr: "şifre çözmek", ex: "Decrypt with the KMS key." },
      { term: "Key policy", tr: "anahtar politikası", ex: "Edit the key policy." },
      { term: "Rotation", tr: "rotasyon", ex: "Enable automatic rotation." },
      { term: "Data key", tr: "veri anahtarı", ex: "Generate a data key." }
    ],
    resources: [
      { title: "AWS KMS Geliştirici Kılavuzu", url: DOC + "kms/latest/developerguide/overview.html", type: "doc", why: "Resmî rehber", level: "başlangıç", lang: "EN" },
      res(SKILL, "Güvenlik temelleri kursu")
    ],
    sources: [EXAM]
  };

  /* 26 ─────────────────────────────── Secrets Manager ve Parameter Store */
  L[26] = {
    hook: "Veritabanı parolası kodda durmaz. Peki nerede durur?",
    homework: "Bir Lambda'nın veritabanı parolasını Secrets Manager'dan okuması için gereken IAM iznini yaz.",
    warmup: {
      recap: [{ point: "KMS gizli verileri şifreler.", example: "Anahtar" }, { point: "Rol kimlik verir.", example: "Lambda rolü" }],
      concepts: [
        { term: "Secrets Manager", tr: "Gizli bilgi yöneticisi", summary: "Parola ve anahtarları saklar, şifreler, otomatik döndürür.", example: "RDS parolası" },
        { term: "Parameter Store", tr: "Parametre deposu", summary: "Systems Manager'ın yapılandırma ve gizli bilgi deposu; hiyerarşik.", example: "/uygulama/prod/db-host" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Kodda sabit yazılmış parola GitHub'a sızar ve değiştirmek için yeniden dağıtım gerekir. Çalışma anında güvenli depodan okumak ve düzenli döndürmek (rotasyon) doğru yoldur." },
      { t: "cmd", lang: "python", text: "import boto3, json\nsm = boto3.client('secretsmanager')\nsecret = json.loads(sm.get_secret_value(SecretId='prod/db')['SecretString'])\nprint(secret['username'])  # parolayı asla loglama" },
      { t: "steps", h: "Secrets Manager", items: [
        "Gizli bilgi şifrelidir (KMS), sürümlenir (AWSCURRENT, AWSPREVIOUS).",
        "Otomatik rotasyon: RDS, Redshift, DocumentDB için hazır Lambda; diğerleri için özel Lambda.",
        "Hesaplar arası paylaşım: kaynak politikası.",
        "Gizli bilgi başına ve çağrı başına ücret."
      ] },
      { t: "steps", h: "Parameter Store", items: [
        "Standard parametre ücretsiz (4 KB), Advanced parametre ücretli (8 KB, politika desteği).",
        "String, StringList, SecureString (KMS ile şifreli).",
        "Hiyerarşik yol: /uygulama/ortam/anahtar; GetParametersByPath ile toplu okuma.",
        "Yerleşik otomatik rotasyon yoktur."
      ] },
      { t: "box", h: "Hangisini seç?", text: "Otomatik rotasyon, hesaplar arası paylaşım, veritabanı kimlik bilgisi: Secrets Manager. Yapılandırma değerleri ve ucuz/ücretsiz gizli saklama, rotasyon gerekmiyorsa: Parameter Store (SecureString)." },
      { t: "steps", h: "Kullanım kalıpları", items: [
        "Lambda: ortam değişkenine parola yazma; çalışma anında oku ve önbellekle (bir kez başlatma sırasında).",
        "ECS: task tanımında secrets alanı ile ortam değişkeni olarak enjekte et.",
        "CloudFormation: dinamik referanslar {{resolve:secretsmanager:...}}.",
        "Erişim: IAM izni (secretsmanager:GetSecretValue) + KMS izni (kms:Decrypt)."
      ] },
      { t: "warn", h: "Tuzak", text: "Gizli bilgiyi Lambda ortam değişkenine açık metin koymak: konsolda, loglarda ve CloudFormation şablonunda görünebilir. Ayrıca her çağrıda yeniden okumak gecikme ve maliyet artırır; önbellekle." }
    ],
    objectives: [
      { id: "h1", text: "Secrets Manager ve Parameter Store'u rotasyon, ücret ve kullanım amacına göre karşılaştırabilirsin." },
      { id: "h2", text: "Parameter Store'da Standard/Advanced katmanını ve String/SecureString türlerini ayırt edebilirsin." },
      { id: "h3", text: "Secrets Manager'dan sır okumak için gereken IAM izinlerini belirtebilirsin." },
      { id: "h4", text: "Parolayı kodda veya açık metin ortam değişkeninde tutmanın risklerini açıklayabilirsin." }
    ],
    summary: [
      "Kodda sabit yazılan parola sızar ve değiştirmek için yeniden dağıtım gerektirir.",
      "Secrets Manager: KMS ile şifreli, sürümlü, otomatik rotasyonlu, hesaplar arası paylaşılabilir; ücretlidir.",
      "Parameter Store: Standard parametre ücretsiz, SecureString KMS ile şifreli, yerleşik rotasyon yok.",
      "Okuma için secretsmanager:GetSecretValue ve kms:Decrypt izinleri gerekir.",
      "Lambda'da parolayı açık metin ortam değişkenine yazma; çalışma anında oku ve önbellekle."
    ],
    quiz: [
      { id: "c919f703", q: "Veritabanı parolasını otomatik döndürmek için hangi servis uygundur?", options: ["Secrets Manager", "S3", "CloudFront", "SNS"], obj: "h1" },
      { id: "e8b9334a", q: "Ücretsiz standart parametre depolayabilen servis hangisidir?", options: ["Parameter Store", "Secrets Manager", "KMS", "Cognito"], obj: "h2" },
      { id: "83c9b07e", q: "Parameter Store'da şifreli değer için hangi tür kullanılır?", options: ["SecureString", "String", "StringList", "BinaryDoc"], obj: "h2" },
      { id: "9d1816b0", q: "Secrets Manager'dan parola okumak için gerekli IAM eylemi hangisidir?", options: ["secretsmanager:GetSecretValue", "s3:GetObject", "ec2:RunInstances", "sqs:SendMessage"], obj: "h3" },
      { id: "38e9799c", q: "Parola için en kötü yaklaşım hangisidir?", options: ["Kodda sabit yazmak", "Secrets Manager", "SecureString", "Rotasyon"], obj: "h4" }
    ],
    interview: [
      { q: "Secrets Manager ve Parameter Store farkı?", a: "Secrets Manager gizli bilgiler için tasarlanmıştır: otomatik rotasyon, sürümleme, hesaplar arası paylaşım ve ücretlidir. Parameter Store daha çok yapılandırma içindir, standart katman ücretsizdir, SecureString ile şifreli saklayabilir ama yerleşik rotasyonu yoktur." },
      { q: "Lambda'da gizli bilgiyi nasıl okursun?", a: "Fonksiyon rolüne en az yetkiyle GetSecretValue (ve gerekirse kms:Decrypt) izni verir, değeri handler dışında bir kez okuyup önbelleğe alırım. Loglamam." }
    ],
    vocab: [
      { term: "Secret", tr: "gizli bilgi", ex: "Store the secret safely." },
      { term: "Rotation", tr: "döndürme", ex: "Rotate the secret every 30 days." },
      { term: "Hard-coded", tr: "koda gömülü", ex: "Never use hard-coded passwords." },
      { term: "Parameter", tr: "parametre", ex: "Read the parameter." },
      { term: "Hierarchy", tr: "hiyerarşi", ex: "Use a parameter hierarchy." }
    ],
    resources: [
      { title: "AWS Secrets Manager Kullanıcı Kılavuzu", url: DOC + "secretsmanager/latest/userguide/intro.html", type: "doc", why: "Resmî rehber", level: "başlangıç", lang: "EN" },
      { title: "Systems Manager Parameter Store", url: DOC + "systems-manager/latest/userguide/systems-manager-parameter-store.html", type: "doc", why: "Parametre türleri ve hiyerarşi", level: "orta", lang: "EN" }
    ],
    sources: [EXAM]
  };

  /* 27 ─────────────────────────────── Cognito */
  L[27] = {
    hook: "Giriş, kayıt, parola sıfırlama ve MFA'yı kendin yazma; Cognito'ya bırak.",
    homework: "Kullanıcı havuzu ile kimlik havuzu farkını bir cümleyle yaz: biri 'kim', diğeri 'neye erişir' sorusunu cevaplar.",
    warmup: {
      recap: [{ point: "JWT kimlik taşır.", example: "ID token" }, { point: "API Gateway Cognito ile yetkilendirir.", example: "Authorizer" }],
      concepts: [
        { term: "User pool", tr: "Kullanıcı havuzu", summary: "Kayıt, giriş ve token üreten kullanıcı dizini.", example: "E-posta ile giriş" },
        { term: "Identity pool", tr: "Kimlik havuzu", summary: "Kimlik doğrulanmış (veya misafir) kullanıcıya geçici AWS kimlik bilgisi verir.", example: "Mobil uygulama S3'e doğrudan yükler" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Mobil uygulamana e-posta/parola, Google ile giriş ve MFA lazım. Cognito kullanıcı havuzu bunu hazır sunar; API Gateway token'ı doğrular." },
      { t: "steps", h: "İki bileşen", items: [
        "User pool: kimlik doğrulama. Kayıt, giriş, parola sıfırlama, MFA, sosyal (Google, Apple) ve SAML/OIDC federasyonu. JWT token'ları verir (ID, access, refresh).",
        "Identity pool (federated identities): kullanıcıya STS ile geçici AWS kimlik bilgisi verir; IAM rolü ile S3/DynamoDB'ye doğrudan erişim.",
        "Birlikte: kullanıcı havuzu 'kim', kimlik havuzu 'AWS'de neye erişir'."
      ] },
      { t: "steps", h: "Token'lar", items: [
        "ID token: kullanıcı kimliği iddiaları (e-posta, ad).",
        "Access token: API yetkilendirme (kapsamlar/scopes).",
        "Refresh token: yeni ID/access token almak için, uzun ömürlü.",
        "Doğrulama: imza (JWKS ile), exp, iss, aud."
      ] },
      { t: "steps", h: "Özellikler", items: [
        "Lambda tetikleyicileri: kayıt öncesi/sonrası, token özelleştirme, özel doğrulama.",
        "Gruplar ve rollere eşleme: yöneticiler vs kullanıcılar.",
        "Barındırılan arayüz (Hosted UI) ve OAuth 2.0 akışları.",
        "Gelişmiş güvenlik: tehdit algılama, uyarlanabilir kimlik doğrulama."
      ] },
      { t: "box", h: "Akış", text: "Uygulama → Cognito kullanıcı havuzu: giriş → JWT. Uygulama → API Gateway (Authorization: Bearer ...). API Gateway Cognito yetkilendiricisi token'ı doğrular, Lambda'ya iletir. Doğrudan AWS erişimi için token kimlik havuzuna verilir → geçici anahtarlar." },
      { t: "warn", h: "Tuzak", text: "Kullanıcı havuzu ile kimlik havuzunu karıştırmak. API'yi korumak için çoğu zaman sadece kullanıcı havuzu yeter; AWS kaynaklarına doğrudan erişim gerekiyorsa kimlik havuzu eklenir." }
    ],
    objectives: [
      { id: "h1", text: "User pool ile identity pool'un görevlerini ayırt edebilirsin." },
      { id: "h2", text: "ID, access ve refresh token'ının ne işe yaradığını belirtebilirsin." },
      { id: "h3", text: "Cognito Lambda tetikleyicileriyle kayıt sürecini özelleştirebileceğini açıklayabilirsin." }
    ],
    summary: [
      "User pool kayıt, giriş, parola sıfırlama, MFA ve federasyon sağlar; JWT token'ları verir.",
      "Identity pool STS ile geçici AWS kimlik bilgisi verir.",
      "ID token kimlik, access token API yetkilendirme, refresh token yenileme içindir.",
      "Lambda tetikleyicileriyle kayıt öncesi/sonrası ve token özelleştirilebilir.",
      "API'yi korumak için çoğu zaman yalnızca kullanıcı havuzu yeter."
    ],
    quiz: [
      { id: "08f8c107", q: "Kayıt ve giriş yapan, JWT üreten Cognito bileşeni hangisidir?", options: ["User pool", "Identity pool", "IAM role", "KMS key"], obj: "h1" },
      { id: "5cd3a45f", q: "Kullanıcıya geçici AWS kimlik bilgisi veren bileşen hangisidir?", options: ["Identity pool", "User pool", "Hosted UI", "WAF"], obj: "h1" },
      { id: "f24a08e2", q: "API yetkilendirmede kullanılan token hangisidir?", options: ["Access token", "Refresh token", "Parola özeti", "Çerez"], obj: "h2" },
      { id: "bbb9d85c", q: "Yeni token almak için kullanılan uzun ömürlü token hangisidir?", options: ["Refresh token", "ID token", "Access token", "API anahtarı"], obj: "h2" },
      { id: "8f9a90fd", q: "Kayıt öncesi özel doğrulama yapmak için ne kullanılır?", options: ["Lambda tetikleyicisi", "S3 olayı", "Route 53", "VPC"], obj: "h3" }
    ],
    interview: [
      { q: "User pool ile identity pool farkı?", a: "User pool kimlik doğrulama ve token üretimidir (kim). Identity pool bu kimliği IAM rolüne eşleyip geçici AWS kimlik bilgisi verir (neye erişir)." },
      { q: "Cognito ile API Gateway nasıl çalışır?", a: "İstemci Cognito'dan token alır, Authorization başlığında gönderir; API Gateway Cognito yetkilendiricisi imzayı ve süreyi doğrulayıp isteği arka uca geçirir." }
    ],
    vocab: [
      { term: "Sign up", tr: "kayıt olmak", ex: "Sign up with an email." },
      { term: "Sign in", tr: "giriş yapmak", ex: "Sign in to the app." },
      { term: "Federation", tr: "federasyon", ex: "Federate with Google." },
      { term: "Claim", tr: "iddia", ex: "Read the email claim." },
      { term: "Scope", tr: "kapsam", ex: "Request the read scope." }
    ],
    resources: [
      { title: "Amazon Cognito Geliştirici Kılavuzu", url: DOC + "cognito/latest/developerguide/what-is-amazon-cognito.html", type: "doc", why: "Resmî rehber", level: "başlangıç", lang: "EN" },
      res(SKILL, "Kimlik yönetimi kursları")
    ],
    sources: [EXAM]
  };

  /* 28 ─────────────────────────────── CloudWatch */
  L[28] = {
    hook: "Gördüğün şeyi düzeltebilirsin. CloudWatch sistemini görünür kılar.",
    homework: "Lambda hata sayısı bir dakikada 5'i aşınca e-posta atan bir alarm tasarla: metrik, eşik, süre ve eylem.",
    warmup: {
      recap: [{ point: "SNS bildirim gönderir.", example: "Alarm eylemi" }],
      concepts: [
        { term: "Metric", tr: "Metrik", summary: "Zaman serisi sayısal ölçüm.", example: "Lambda Errors" },
        { term: "Log group", tr: "Günlük grubu", summary: "Benzer kaynakların günlük akışlarını toplayan kapsayıcı.", example: "/aws/lambda/siparis" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Müşteri 'sipariş hata veriyor' diyor. CloudWatch'ta loglardan hatayı bulur, metriklerden ne zaman başladığını görür, alarmla bir daha önceden haberdar olursun." },
      { t: "steps", h: "Bileşenler", items: [
        "Metrikler: servislerin otomatik yayınladığı (CPU, Lambda Invocations/Errors/Duration) ve özel metrikler.",
        "Günlükler (Logs): log grupları ve akışları; saklama süresi ayarlanır.",
        "Alarmlar: bir metrik eşiği aşınca eylem (SNS, Auto Scaling, EC2 eylemi). Durumlar: OK, ALARM, INSUFFICIENT_DATA.",
        "Panolar (Dashboards): metrik ve log görselleştirme.",
        "Logs Insights: günlüklerde sorgu dili ile arama.",
        "Metric filter: log içindeki desenden metrik üretir.",
        "Olaylar: artık EventBridge ile birleşik."
      ] },
      { t: "cmd", lang: "cwli", calistirma: "atla CloudWatch Logs Insights sorgusu; ayrıştırıcı ve AWS hesabı yok", text: "fields @timestamp, @message\n| filter @message like /ERROR/\n| sort @timestamp desc\n| limit 20" },
      { t: "box", h: "Özel metrik ve ayrıntı", text: "Standart metrikler 5 dakikada, ayrıntılı izleme 1 dakikada gelir (EC2). Kendi metriğini PutMetricData veya Embedded Metric Format (EMF) ile gönderebilirsin. Yüksek çözünürlüklü özel metrik 1 saniyeye kadar inebilir." },
      { t: "box", h: "Yapılandırılmış log", text: "Logları JSON olarak yaz (istek kimliği, kullanıcı, süre). Logs Insights'ta alanlara göre süzmek çok kolaylaşır. Parola ve kişisel veriyi loglama." },
      { t: "steps", h: "Alarm tasarımı", items: [
        "Doğru metrik: hata oranı, gecikme (p99), kuyruk yaşı.",
        "Süre ve veri noktası: 3 üzerinden 2 gibi değerlendirme ile gürültüyü azalt.",
        "Eksik veri davranışı: notBreaching / breaching seçimi.",
        "Eylem: SNS → e-posta veya ChatOps."
      ] },
      { t: "warn", h: "Tuzak", text: "Log saklama süresi varsayılan olarak 'süresiz'dir ve maliyet büyür. Log gruplarına saklama süresi koy." }
    ],
    objectives: [
      { id: "h1", text: "CloudWatch bileşenlerini (metrik, log, alarm, pano, Logs Insights) görevlerine göre eşleştirebilirsin." },
      { id: "h2", text: "Metric filter ile log desenlerinden metrik üretebileceğini açıklayabilirsin." },
      { id: "h3", text: "Alarm durumlarını ve SNS ile bildirim kurmayı anlatabilirsin." },
      { id: "h4", text: "Log saklama süresi ayarının maliyete etkisini açıklayabilirsin." }
    ],
    summary: [
      "Metrikler servislerden otomatik gelir; özel metrik PutMetricData veya EMF ile gönderilir.",
      "Saklama süresi log grubu düzeyinde ayarlanır; varsayılan süresizdir.",
      "Alarm durumları: OK, ALARM, INSUFFICIENT_DATA; eylem olarak SNS, Auto Scaling vb. tetiklenir.",
      "Logs Insights sorgu diliyle, metric filter ise log desenlerinden metrik üretir.",
      "Logları JSON yaz; parola ve kişisel veriyi loglama."
    ],
    quiz: [
      { id: "b77ba5ca", q: "Log içindeki desenden metrik üreten özellik hangisidir?", options: ["Metric filter", "X-Ray", "Lifecycle", "Stage"], obj: "h2" },
      { id: "5a7dfdd2", q: "Günlüklerde sorgu dili ile arama yapan araç hangisidir?", options: ["Logs Insights", "CloudTrail", "Config", "Inspector"], obj: "h1" },
      { id: "647fbf22", q: "Alarm durumlarından hangisi veri yetersizliğini gösterir?", options: ["INSUFFICIENT_DATA", "OK", "ALARM", "PAUSED"], obj: "h3" },
      { id: "f6e1fe56", q: "Alarm tetiklenince e-posta göndermek için hangi servis eylem hedefi olur?", options: ["SNS", "S3", "KMS", "ECR"], obj: "h3" },
      { id: "57752e2c", q: "Log maliyetini sınırlamak için ne yapılır?", options: ["Saklama süresi ayarlamak", "Hiç log tutmamak", "Kök kullanıcı kullanmak", "Logları herkese açmak"], obj: "h4" }
    ],
    interview: [
      { q: "CloudWatch ile CloudTrail farkı nedir?", a: "CloudWatch performans ve uygulama izlemedir: metrik, log, alarm. CloudTrail 'kim hangi API'yi ne zaman çağırdı' denetim kaydıdır." },
      { q: "İyi bir alarm nasıl tasarlanır?", a: "Kullanıcıyı etkileyen metrik (hata oranı, gecikme) seçilir, eşik ve değerlendirme periyodu gürültüyü azaltacak şekilde ayarlanır, eylem net bir kişiye veya kanala gider, eksik veri davranışı düşünülür." }
    ],
    vocab: [
      { term: "Metric", tr: "metrik", ex: "Publish a custom metric." },
      { term: "Alarm", tr: "alarm", ex: "Create an alarm." },
      { term: "Threshold", tr: "eşik", ex: "Set the threshold to 5." },
      { term: "Log stream", tr: "günlük akışı", ex: "Open the log stream." },
      { term: "Dashboard", tr: "pano", ex: "Build a dashboard." }
    ],
    resources: [
      { title: "Amazon CloudWatch Kullanıcı Kılavuzu", url: DOC + "AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html", type: "doc", why: "Resmî rehber", level: "başlangıç", lang: "EN" },
      { title: "CloudWatch Logs Insights sorgu sözdizimi", url: DOC + "AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html", type: "doc", why: "Sorgu dili", level: "orta", lang: "EN" }
    ],
    sources: [EXAM]
  };

  /* 29 ─────────────────────────────── X-Ray */
  L[29] = {
    hook: "Bir istek 6 servisten geçti ve yavaş. Hangisi yavaşlattı? İzleme (tracing) cevap verir.",
    homework: "Bir isteğin API Gateway → Lambda → DynamoDB yolunu çiz ve her adımda ölçülecek süreyi işaretle.",
    warmup: {
      recap: [{ point: "CloudWatch metrik ve log verir.", example: "Duration" }],
      concepts: [
        { term: "Trace", tr: "İz", summary: "Bir isteğin servisler arasında izlediği yolun tamamı.", example: "Trace ID" },
        { term: "Segment / subsegment", tr: "Parça", summary: "Bir servisin veya bir alt çağrının (DB sorgusu) iz içindeki zamanlı kaydı.", example: "DynamoDB çağrısı" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Kullanıcılar 'yavaş' diyor. Loglar tek tek servislerde normal görünüyor. X-Ray tüm yolu tek haritada gösterir: darboğaz üçüncü taraf API çağrısıymış." },
      { t: "steps", h: "Kavramlar", items: [
        "Trace: bir isteğin uçtan uca kaydı; X-Amzn-Trace-Id başlığıyla taşınır.",
        "Segment: bir servisin yaptığı iş; subsegment: alt çağrılar (SDK, HTTP, SQL).",
        "Servis haritası: servisler arası bağımlılık, gecikme, hata oranı.",
        "Örnekleme (sampling): her isteği izlemek yerine kural bazlı örnek alınır (maliyet).",
        "Anotasyon (indekslenir, filtrelenir) ve metaveri (indekslenmez, ayrıntı)."
      ] },
      { t: "steps", h: "Etkinleştirme", items: [
        "Lambda: Active tracing aç; X-Ray daemon gerekmez.",
        "API Gateway: aşamada izlemeyi aç.",
        "EC2/ECS/Beanstalk: X-Ray daemon çalıştır (ECS'de yan konteyner).",
        "Kod: X-Ray SDK ile AWS SDK ve HTTP çağrılarını sarmala; ya da OpenTelemetry (ADOT).",
        "IAM: xray:PutTraceSegments, xray:PutTelemetryRecords izinleri."
      ] },
      { t: "box", h: "Ne işe yarar?", text: "Darboğaz bulma, hata kaynağını izleme, soğuk başlangıç görme, servis bağımlılıklarını anlama. CloudWatch ServiceLens, metrik, log ve izleri tek görünümde birleştirir." },
      { t: "box", h: "Anotasyon vs metaveri", text: "Anotasyon: basit anahtar-değer, filtre ifadesiyle aranabilir (ör. kullanıcıTipi = premium). Metaveri: her türlü nesne, aranamaz, ayrıntı için." },
      { t: "warn", h: "Tuzak", text: "Her isteği izlemek maliyetli ve gürültülüdür; örnekleme kuralı kullan. Ayrıca kişisel veriyi iz içine yazma." }
    ],
    objectives: [
      { id: "h1", text: "Trace, segment, subsegment ve servis haritası kavramlarını ayırt edebilirsin." },
      { id: "h2", text: "Anotasyon ile metaverinin farkını, hangisinin aranabildiğini belirtebilirsin." },
      { id: "h3", text: "Lambda için X-Ray'in nasıl etkinleştirildiğini ve gereken izinleri sıralayabilirsin." },
      { id: "h4", text: "Örneklemenin maliyet ve gürültüyü nasıl azalttığını açıklayabilirsin." }
    ],
    summary: [
      "Trace bir isteğin uçtan uca kaydıdır; segment bir servisin işi, subsegment alt çağrılardır.",
      "Servis haritası servisler arası bağımlılık, gecikme ve hata oranını gösterir.",
      "Anotasyon indekslenir ve filtrelenir; metaveri indekslenmez, ayrıntı içindir.",
      "Lambda'da Active tracing açılır, daemon gerekmez; rolde xray:Put* izinleri olmalı.",
      "Her isteği izlemek yerine örnekleme kuralı kullan; kişisel veriyi iz içine yazma."
    ],
    quiz: [
      { id: "3c662b18", q: "Bir isteğin servisler arası uçtan uca yolunu gösteren yapı nedir?", options: ["Trace", "Alarm", "Bucket", "Stage"], obj: "h1" },
      { id: "6c277206", q: "Aranabilir (indekslenen) ek veri hangisidir?", options: ["Annotation", "Metadata", "Log", "Layer"], obj: "h2" },
      { id: "e67cbb82", q: "Lambda için X-Ray'i etkinleştirmek ne gerektirir?", options: ["Active tracing ayarı ve rol izni", "EC2 kurmak", "VPC peering", "KMS anahtarı"], obj: "h3" },
      { id: "6616b2d0", q: "X-Ray maliyetini ve gürültüyü azaltan mekanizma nedir?", options: ["Örnekleme (sampling)", "Şifreleme", "Rotasyon", "Replika"], obj: "h4" },
      { id: "77d5ddb7", q: "Servisler arası bağımlılık ve gecikmeyi görsel gösteren çıktı nedir?", options: ["Servis haritası", "Dockerfile", "Change set", "Lifecycle kuralı"], obj: "h1" }
    ],
    interview: [
      { q: "Dağıtık izleme neden gerekir?", a: "Bir istek birçok servisten geçtiğinde tek tek log ve metrikler darboğazı göstermez. İzleme isteğin tüm yolunu ve her adımın süresini görünür kılar." },
      { q: "X-Ray ile CloudWatch farkı?", a: "CloudWatch metrik, log ve alarm sağlar. X-Ray isteğin servisler arası izini ve darboğazı gösterir; birbirini tamamlarlar." }
    ],
    vocab: [
      { term: "Trace", tr: "iz", ex: "Open the trace." },
      { term: "Bottleneck", tr: "darboğaz", ex: "Find the bottleneck." },
      { term: "Latency", tr: "gecikme", ex: "Reduce latency." },
      { term: "Sampling", tr: "örnekleme", ex: "Use a sampling rule." },
      { term: "Service map", tr: "servis haritası", ex: "Check the service map." }
    ],
    resources: [
      { title: "AWS X-Ray Geliştirici Kılavuzu", url: DOC + "xray/latest/devguide/aws-xray.html", type: "doc", why: "Resmî rehber", level: "başlangıç", lang: "EN" },
      res(SKILL, "İzleme ve gözlemlenebilirlik")
    ],
    sources: [EXAM]
  };

  /* 30 ─────────────────────────────── CloudTrail */
  L[30] = {
    hook: "'Bu kaynağı kim sildi?' sorusunun resmî cevabı CloudTrail'dedir.",
    homework: "Bir S3 kovasının silinmesini CloudTrail'de nasıl bulursun? Hangi olay adı, hangi alanlara bakarsın?",
    warmup: {
      recap: [{ point: "CloudWatch performans izler.", example: "Metrik" }, { point: "IAM kimlik tanımlar.", example: "Kullanıcı/rol" }],
      concepts: [
        { term: "CloudTrail", tr: "Denetim kaydı", summary: "AWS hesabındaki API çağrılarını (kim, ne zaman, nereden, ne) kaydeden servis.", example: "DeleteBucket" },
        { term: "Trail", tr: "İz (kayıt yolu)", summary: "Olayları S3'e (ve isteğe CloudWatch Logs'a) sürekli kaydeden yapılandırma.", example: "Organizasyon geneli trail" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Bir S3 kovası kayboldu. CloudTrail'de DeleteBucket olayını bulur, hangi IAM kimliğinin, hangi IP'den, hangi anahtarla yaptığını görürsün. Güvenlik denetimi ve olay incelemenin temeli." },
      { t: "steps", h: "Olay türleri", items: [
        "Yönetim olayları (management): kaynak oluşturma, silme, IAM değişiklikleri. Varsayılan kaydedilir.",
        "Veri olayları (data events): S3 nesne okuma/yazma, Lambda çağrısı. Varsayılan KAPALI, ücretli.",
        "Insights olayları: olağandışı API etkinliği tespiti."
      ] },
      { t: "steps", h: "Önemli noktalar", items: [
        "Olay geçmişi (Event history): son 90 günlük yönetim olayları, ücretsiz, hemen görünür.",
        "Daha uzun saklama ve tüm bölgeler için trail oluştur; kayıtlar S3'e yazılır.",
        "Günlük dosyası bütünlük doğrulaması (digest) ile değişiklik tespiti.",
        "CloudTrail Lake: olaylar üzerinde SQL sorgusu.",
        "CloudWatch Logs'a gönder ve metrik filtre ile alarm kur (ör. kök kullanıcı girişi, yetkisiz API çağrısı)."
      ] },
      { t: "cmd", lang: "bash", text: "aws cloudtrail lookup-events \\\n  --lookup-attributes AttributeKey=EventName,AttributeValue=DeleteBucket \\\n  --max-results 5" },
      { t: "box", h: "Kayıt içinde ne var?", text: "eventTime, eventSource, eventName, userIdentity (kim), sourceIPAddress, userAgent, requestParameters, responseElements, errorCode. 'AccessDenied' hata ayıklamada errorCode ve userIdentity'ye bak." },
      { t: "box", h: "CloudWatch ve Config ile fark", text: "CloudTrail: kim ne çağırdı. CloudWatch: performans ve loglar. AWS Config: kaynak yapılandırmasının zaman içindeki durumu ve kurallara uyum." },
      { t: "warn", h: "Tuzak", text: "Sadece olay geçmişine güvenmek: 90 gün sınırı vardır ve veri olaylarını içermez. Denetim için trail kur, kayıt kovasını koru (sürümleme, MFA delete, sıkı politika)." }
    ],
    objectives: [
      { id: "h1", text: "Bir kaynağı kimin sildiğini CloudTrail kayıtlarından bulabileceğini açıklayabilirsin." },
      { id: "h2", text: "Yönetim, veri ve Insights olaylarını ve amaçlarını ayırt edebilirsin." },
      { id: "h3", text: "Olay geçmişinin 90 günlük sınırını ve uzun saklama için trail gerektiğini belirtebilirsin." },
      { id: "h4", text: "Log bütünlük doğrulamasını ve kayıt içindeki userIdentity alanının rolünü açıklayabilirsin." }
    ],
    summary: [
      "CloudTrail kim, ne zaman, hangi IP'den hangi API'yi çağırdı sorusunu yanıtlar.",
      "Yönetim olayları varsayılan kaydedilir; veri olayları varsayılan KAPALI ve ücretlidir.",
      "Olay geçmişi son 90 gün yönetim olaylarını ücretsiz gösterir; daha uzunu için trail gerekir.",
      "Bütünlük doğrulaması (digest) ile kayıtlarda değişiklik tespit edilir.",
      "Kayıtta userIdentity kimi, errorCode hatayı gösterir; kayıt kovasını koru."
    ],
    quiz: [
      { id: "f7dd13e0", q: "Bir kaynağı kimin sildiğini bulmak için hangi servise bakılır?", options: ["CloudTrail", "CloudFront", "SQS", "ECR"], obj: "h1" },
      { id: "935474bc", q: "Olay geçmişi (Event history) ne kadar geriyi gösterir?", options: ["90 gün", "7 gün", "10 yıl", "24 saat"], obj: "h3" },
      { id: "b64be3fc", q: "Varsayılan olarak KAPALI olan olay türü hangisidir?", options: ["Veri olayları", "Yönetim olayları", "Konsol girişi", "IAM değişikliği"], obj: "h2" },
      { id: "ce82817e", q: "Kayıt dosyalarının değiştirilmediğini kanıtlayan özellik nedir?", options: ["Log dosyası bütünlük doğrulaması", "Presigned URL", "Lifecycle", "Read replica"], obj: "h4" },
      { id: "348e3399", q: "CloudTrail kayıtlarında 'kim' bilgisi hangi alandadır?", options: ["userIdentity", "eventTime", "awsRegion", "eventVersion"], obj: "h4" }
    ],
    interview: [
      { q: "CloudTrail ile CloudWatch farkı?", a: "CloudTrail hesapta kim hangi API'yi çağırdı kaydıdır (denetim). CloudWatch metrik, log ve alarmla performans ve uygulama izlemedir." },
      { q: "Bir güvenlik olayında CloudTrail'i nasıl kullanırsın?", a: "Şüpheli kimliğin eylemlerini zaman çizelgesiyle çıkarır, kaynak IP ve kullanıcı aracısına bakar, hangi kaynakların oluşturulduğunu/silindiğini belirler. Trail kayıtlarının bütünlüğünü doğrularım." }
    ],
    vocab: [
      { term: "Audit", tr: "denetim", ex: "Enable auditing." },
      { term: "Trail", tr: "iz kaydı", ex: "Create a multi-Region trail." },
      { term: "Event", tr: "olay", ex: "Look up the event." },
      { term: "Identity", tr: "kimlik", ex: "Check the user identity." },
      { term: "Compliance", tr: "uyumluluk", ex: "Meet compliance requirements." }
    ],
    resources: [
      { title: "AWS CloudTrail Kullanıcı Kılavuzu", url: DOC + "awscloudtrail/latest/userguide/cloudtrail-user-guide.html", type: "doc", why: "Resmî rehber", level: "başlangıç", lang: "EN" },
      res(SKILL, "Güvenlik ve izleme")
    ],
    sources: [EXAM]
  };
})();

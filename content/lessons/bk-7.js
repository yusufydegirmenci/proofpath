/* Backend / AWS · sabit dersler 37-38 */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).bk = (window.PP_LESSONS.bk || {}));
  var DOC = "https://docs.aws.amazon.com/";
  var SKILL = { title: "AWS Skill Builder (ücretsiz dijital kurslar)", url: "https://skillbuilder.aws/", type: "course", level: "başlangıç", lang: "EN" };
  var EXAM = { title: "AWS Certified Developer – Associate", url: "https://aws.amazon.com/certification/certified-developer-associate/", type: "doc", level: "orta", lang: "EN" };
  function res(a, why) { var o = {}; for (var k in a) o[k] = a[k]; o.why = why; return o; }

  /* 37 ─────────────────────────────── Parameter Store ve AppConfig */
  L[37] = {
    hook: "Bir ayarı değiştirmek için yeniden dağıtım yapmak zorunda kalmamalısın.",
    homework: "Bir özellik bayrağı (feature flag) tasarla: 'yeni-odeme-ekrani' yüzde 10 kullanıcıda açık olsun. Hangi araçla, nasıl kademeli açarsın?",
    warmup: {
      recap: [{ point: "Parameter Store yapılandırma tutar.", example: "/uygulama/prod/db-host" }, { point: "Canary dağıtım riski azaltır.", example: "Kademeli geçiş" }],
      concepts: [
        { term: "Feature flag", tr: "Özellik bayrağı", summary: "Bir özelliği kodu yeniden dağıtmadan açıp kapatmayı sağlayan yapılandırma.", example: "yeni-odeme-ekrani: true" },
        { term: "AppConfig", tr: "Uygulama yapılandırma servisi", summary: "Yapılandırmayı doğrulayıp kademeli ve izlenerek (otomatik geri alma ile) dağıtan servis.", example: "Systems Manager AppConfig" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Yeni özellik kodu üretimde ama herkese açmak riskli. Bayrağı önce %5 kullanıcıda aç, hata oranını izle, sorun yoksa artır; sorun olursa bayrağı kapat. Yeniden dağıtım gerekmez." },
      { t: "steps", h: "Parameter Store ile", items: [
        "Basit yapılandırma: bağlantı adresi, eşikler. Hiyerarşi: /uygulama/ortam/anahtar.",
        "SecureString ile şifreli; sürüm geçmişi; IAM ile yol bazlı erişim.",
        "Değer değişince uygulama kendiliğinden bilmez; okuma sıklığını ve önbelleği sen yönetirsin.",
        "Doğrulama ve kademeli dağıtım yoktur."
      ] },
      { t: "steps", h: "AppConfig ile", items: [
        "Uygulama → Ortam (dev/prod) → Yapılandırma profili (kaynak: AppConfig barındırılan, S3, Parameter Store, Secrets Manager).",
        "Doğrulayıcılar: JSON Schema veya Lambda ile hatalı yapılandırmayı dağıtımdan önce engelle.",
        "Dağıtım stratejisi: AllAtOnce, Linear, Canary; bekleme (bake) süresi.",
        "CloudWatch alarmı izleme: alarm tetiklenirse otomatik geri alma.",
        "Özellik bayrakları: türü, çok değerli ve segment kuralları."
      ] },
      { t: "box", h: "Nasıl okunur?", text: "Lambda için AppConfig uzantısı (extension/layer) yerel HTTP uç noktası sunar; yapılandırmayı önbelleğe alıp arka planda günceller. Uygulama her istekte AppConfig'e gitmez. Başka bilgisayarlar için AppConfig Agent kullanılır." },
      { t: "box", h: "Karar", text: "Nadiren değişen, riski düşük ayar: Parameter Store veya ortam değişkeni. Sık değişen, doğrulama ve kademeli yayın isteyen ayar ve özellik bayrakları: AppConfig. Gizli bilgi: Secrets Manager." },
      { t: "warn", h: "Tuzak", text: "Yapılandırmayı her çağrıda doğrudan Parameter Store'dan okumak: kota ve gecikme sorunu. Önbellekle (TTL ile) ve değişiklik gecikmesini kabul et." }
    ],
    quiz: [
      { q: "Yapılandırmayı doğrulayıp kademeli ve otomatik geri alma ile dağıtan servis hangisidir?", options: ["AppConfig", "Parameter Store", "S3", "SNS"], answer: "AppConfig", why: "Doğrulayıcı, dağıtım stratejisi ve alarm entegrasyonu vardır." },
      { q: "Özellik bayrağının amacı nedir?", options: ["Özelliği yeniden dağıtmadan açıp kapatmak", "Disk şifrelemek", "DNS çözmek", "Yedek almak"], answer: "Özelliği yeniden dağıtmadan açıp kapatmak", why: "Riski kademeli yönetmeye yarar." },
      { q: "Parola gibi gizli bilgi için en uygun servis hangisidir?", options: ["Secrets Manager", "AppConfig özellik bayrağı", "S3 genel kova", "Ortam değişkeni açık metin"], answer: "Secrets Manager", why: "Rotasyon ve şifreleme sunar." },
      { q: "Lambda'da AppConfig'i verimli okumak için ne kullanılır?", options: ["AppConfig Lambda uzantısı (katman)", "Her istekte doğrudan API çağrısı", "Kodu yeniden dağıtmak", "VPC peering"], answer: "AppConfig Lambda uzantısı (katman)", why: "Yapılandırmayı önbelleğe alır ve arka planda yeniler." },
      { q: "Parameter Store hangisini sağlamaz?", options: ["Kademeli dağıtım ve otomatik geri alma", "Hiyerarşik adlandırma", "SecureString", "Sürüm geçmişi"], answer: "Kademeli dağıtım ve otomatik geri alma", why: "Bu AppConfig'in alanıdır." }
    ],
    interview: [
      { q: "Parameter Store ve AppConfig arasında nasıl seçersin?", a: "Basit, nadir değişen ayarlar için Parameter Store yeterli. Doğrulama, kademeli yayın, özellik bayrağı ve alarmla otomatik geri alma gerekiyorsa AppConfig." },
      { q: "Özellik bayrağı neden değerli?", a: "Kod dağıtımını özellik yayınından ayırır. Riskli özellik kademeli açılır, sorun olursa anında kapatılır; yeniden dağıtım gerekmez." }
    ],
    vocab: [
      { term: "Configuration", tr: "yapılandırma", ex: "Update the configuration." },
      { term: "Feature flag", tr: "özellik bayrağı", ex: "Enable the feature flag for 10% of users." },
      { term: "Validator", tr: "doğrulayıcı", ex: "Add a JSON schema validator." },
      { term: "Gradual rollout", tr: "kademeli yayın", ex: "Use a gradual rollout." },
      { term: "Bake time", tr: "izleme (bekleme) süresi", ex: "Set a bake time of 10 minutes." }
    ],
    resources: [
      { title: "AWS AppConfig Kullanıcı Kılavuzu", url: DOC + "appconfig/latest/userguide/what-is-appconfig.html", type: "doc", why: "Resmî rehber", level: "orta", lang: "EN" },
      { title: "Systems Manager Parameter Store", url: DOC + "systems-manager/latest/userguide/systems-manager-parameter-store.html", type: "doc", why: "Parametre deposu", level: "başlangıç", lang: "EN" }
    ],
    sources: [EXAM]
  };

  /* 38 ─────────────────────────────── CDK ve AppSync */
  L[38] = {
    hook: "Altyapıyı YAML yerine gerçek bir programlama diliyle yaz; API'ni de tek sorguyla esnek sun.",
    homework: "Bir CDK uygulamasında Lambda ve DynamoDB tablosu oluşturan kodu hayal et: tablo kaynağı fonksiyona okuma-yazma iznini nasıl verir?",
    warmup: {
      recap: [{ point: "CloudFormation şablonu altyapıyı tanımlar.", example: "Stack" }, { point: "REST uç noktaları sabit veri döndürür.", example: "GET /orders" }],
      concepts: [
        { term: "AWS CDK", tr: "Bulut geliştirme kiti", summary: "Altyapıyı TypeScript, Python gibi dillerle tanımlayıp CloudFormation'a derleyen çerçeve.", example: "new s3.Bucket(this, 'Kova')" },
        { term: "GraphQL", tr: "Sorgu dili/API", summary: "İstemcinin tam olarak istediği alanları tek istekte sorguladığı API stili.", example: "{ siparis(id:1){ tutar } }" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Aynı yapıdan 20 Lambda oluşturacaksın. YAML'da kopyalarsın; CDK'da döngü veya yardımcı fonksiyon yazarsın. Mobil uygulama ise tek ekranda üç farklı kaynaktan veri istiyor; GraphQL ile tek çağrı yeter." },
      { t: "h", text: "CDK" },
      { t: "cmd", text: "import * as cdk from 'aws-cdk-lib';\nimport * as dynamodb from 'aws-cdk-lib/aws-dynamodb';\nimport * as lambda from 'aws-cdk-lib/aws-lambda';\n\nclass SiparisStack extends cdk.Stack {\n  constructor(scope, id) {\n    super(scope, id);\n    const tablo = new dynamodb.Table(this, 'Siparisler', {\n      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },\n      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,\n    });\n    const fn = new lambda.Function(this, 'Fn', {\n      runtime: lambda.Runtime.NODEJS_20_X,\n      handler: 'index.handler',\n      code: lambda.Code.fromAsset('src'),\n      environment: { TABLO: tablo.tableName },\n    });\n    tablo.grantReadWriteData(fn); // IAM izni otomatik\n  }\n}" },
      { t: "steps", h: "CDK kavramları", items: [
        "App → Stack → Construct hiyerarşisi.",
        "Construct düzeyleri: L1 (CfnXxx, CloudFormation karşılığı), L2 (makul varsayılanlar ve yardımcı metotlar), L3 (kalıplar).",
        "cdk init, cdk synth (şablon üret), cdk diff (farkı gör), cdk deploy, cdk destroy.",
        "cdk bootstrap: hesap/bölgede CDK'nin kullandığı kaynakları bir kez kurar.",
        "grant* metotları: en az yetkiyle IAM politikası üretir."
      ] },
      { t: "box", h: "CDK ve SAM", text: "İkisi de CloudFormation üretir. SAM: YAML kısa sözdizimi, sunucusuz odaklı, yerel test araçlı. CDK: genel programlama dili, döngü/koşul/soyutlama, tüm AWS servisleri." },
      { t: "h", text: "AppSync (GraphQL)" },
      { t: "steps", h: "Temel fikirler", items: [
        "Şema (schema): tipler, Query, Mutation, Subscription.",
        "Çözümleyici (resolver): bir alanın verisinin nereden geleceği (DynamoDB, Lambda, RDS, HTTP).",
        "Veri kaynakları ve JavaScript/VTL çözümleyicileri; boru hattı (pipeline) çözümleyicileri.",
        "Subscription: WebSocket ile gerçek zamanlı güncelleme.",
        "Yetkilendirme: API anahtarı, Cognito, IAM, OIDC, Lambda."
      ] },
      { t: "cmd", text: "type Siparis { id: ID! tutar: Float! musteri: Musteri }\ntype Query { siparis(id: ID!): Siparis }\ntype Mutation { siparisOlustur(tutar: Float!): Siparis }\ntype Subscription { yeniSiparis: Siparis @aws_subscribe(mutations: [\"siparisOlustur\"]) }" },
      { t: "box", h: "REST ve GraphQL", text: "REST: çok uç nokta, sabit cevap, fazla/eksik veri riski. GraphQL: tek uç nokta, istemci alanları seçer, tek istekte ilişkili veri. Karmaşık sorgular ve önbellekleme ise sunucuda daha dikkatli tasarım ister." },
      { t: "warn", h: "Tuzak", text: "cdk deploy'dan önce cdk diff bakmamak: kaynak değişimi (replacement) veri kaybına yol açabilir; DynamoDB tablosu ve RDS için removalPolicy: RETAIN kullan." }
    ],
    quiz: [
      { q: "CDK uygulamasının derlenip CloudFormation şablonu ürettiği komut hangisidir?", options: ["cdk synth", "cdk bootstrap", "cdk destroy", "cdk list-only"], answer: "cdk synth", why: "synth şablonu üretir; deploy dağıtır." },
      { q: "CDK'de bir tablonun Lambda'ya okuma-yazma izni vermesi nasıl yapılır?", options: ["tablo.grantReadWriteData(fn)", "Kök anahtar paylaşmak", "Kovayı açmak", "Elle JSON yazmak zorunlu"], answer: "tablo.grantReadWriteData(fn)", why: "Gerekli IAM politikası otomatik oluşur." },
      { q: "Dağıtımdan önce değişiklik farkını gösteren komut hangisidir?", options: ["cdk diff", "cdk init", "cdk ls", "cdk docs"], answer: "cdk diff", why: "Replacement gibi riskleri önceden gösterir." },
      { q: "GraphQL'de bir alanın verisinin nereden geleceğini tanımlayan yapı nedir?", options: ["Resolver", "Stage", "Layer", "Shard"], answer: "Resolver", why: "Çözümleyici DynamoDB, Lambda gibi kaynağa bağlar." },
      { q: "AppSync'te gerçek zamanlı güncelleme hangi yapıyla sağlanır?", options: ["Subscription", "Query", "Scan", "Trail"], answer: "Subscription", why: "WebSocket üzerinden değişiklikleri iter." }
    ],
    interview: [
      { q: "CDK ve CloudFormation ilişkisi nedir?", a: "CDK, programlama diliyle yazılan koddan CloudFormation şablonu üretir ve onu dağıtır. Yani sonuç yine CloudFormation yığınıdır; CDK soyutlama, döngü ve yardımcı metotlar ekler." },
      { q: "GraphQL'i REST'e göre ne zaman seçersin?", a: "İstemcilerin farklı alan ihtiyaçları olduğunda, birden çok kaynaktan tek istekle veri gerektiğinde ve gerçek zamanlı abonelik istendiğinde. Basit, önbelleğe uygun kaynak odaklı API'lerde REST yeterlidir." },
      { q: "SAM ile CDK arasında nasıl seçersin?", a: "Küçük, sunucusuz uygulama ve YAML rahatlığı için SAM. Büyük, çok servisli, tekrar eden kalıplı altyapı ve tip güvenliği için CDK." }
    ],
    vocab: [
      { term: "Construct", tr: "yapı taşı (CDK)", ex: "A construct represents a resource." },
      { term: "Synthesize", tr: "şablon üretmek", ex: "Synthesize the stack." },
      { term: "Schema", tr: "şema", ex: "Define the GraphQL schema." },
      { term: "Resolver", tr: "çözümleyici", ex: "Attach a resolver to the field." },
      { term: "Mutation", tr: "veri değiştiren GraphQL işlemi", ex: "Run a mutation." }
    ],
    resources: [
      { title: "AWS CDK Geliştirici Kılavuzu", url: DOC + "cdk/v2/guide/home.html", type: "doc", why: "Resmî rehber", level: "orta", lang: "EN" },
      { title: "AWS AppSync Geliştirici Kılavuzu", url: DOC + "appsync/latest/devguide/what-is-appsync.html", type: "doc", why: "GraphQL ve çözümleyiciler", level: "orta", lang: "EN" }
    ],
    sources: [EXAM]
  };
})();

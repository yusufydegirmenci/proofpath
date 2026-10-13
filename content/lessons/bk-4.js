/* Backend / AWS · sabit dersler 19-24 */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).bk = (window.PP_LESSONS.bk || {}));
  var DOC = "https://docs.aws.amazon.com/";
  var SKILL = { title: "AWS Skill Builder (ücretsiz dijital kurslar)", url: "https://skillbuilder.aws/", type: "course", level: "başlangıç", lang: "EN" };
  var EXAM = { title: "AWS Certified Developer – Associate", url: "https://aws.amazon.com/certification/certified-developer-associate/", type: "doc", level: "orta", lang: "EN" };
  function res(a, why) { var o = {}; for (var k in a) o[k] = a[k]; o.why = why; return o; }

  /* 19 ─────────────────────────────── SNS */
  L[19] = {
    hook: "Bir olay oldu ve beş farklı sistem bilmeli: tek mesaj, çok alıcı.",
    homework: "Sipariş oluşunca e-posta, stok güncelleme ve analiz servisinin haberdar olması gerekiyor. SNS konusu ve abonelikleri nasıl kurarsın?",
    warmup: {
      recap: [{ point: "SQS tek tüketiciye mesaj taşır.", example: "Kuyruk" }],
      concepts: [
        { term: "Topic", tr: "Konu", summary: "Yayıncının mesaj gönderdiği ve abonelerin dinlediği kanal.", example: "siparis-olusturuldu" },
        { term: "Fan-out", tr: "Yayılım", summary: "Tek mesajı birden fazla aboneye aynı anda dağıtmak.", example: "SNS → 3 SQS kuyruğu" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Sipariş servisi her yeni siparişi SNS konusuna yayınlar. E-posta, stok ve analiz servisleri bağımsız abone olur. Yeni bir servis eklemek sipariş koduna dokunmayı gerektirmez." },
      { t: "steps", h: "Abone türleri", items: [
        "SQS, Lambda, HTTP/HTTPS uç noktası, e-posta, SMS, mobil bildirim, Kinesis Data Firehose."
      ] },
      { t: "box", h: "SNS + SQS fan-out", text: "Her abone için ayrı SQS kuyruğu bağlanır. Böylece her tüketici kendi hızında ve kendi DLQ'suyla çalışır; bir servis çökse bile mesaj kaybolmaz." },
      { t: "steps", h: "Özellikler", items: [
        "Mesaj filtreleme: aboneye sadece filtre politikasına uyan mesajlar gider (ör. tutar > 1000).",
        "FIFO konular: sıralı ve tekrarsız (SQS FIFO ile).",
        "Teslim yeniden denemeleri ve DLQ (abonelik için).",
        "Şifreleme: KMS; erişim: konu politikası."
      ] },
      { t: "box", h: "SNS ile SQS farkı", text: "SNS itme (push) tabanlı, çok alıcılı yayın-abonelik. SQS çekme (pull) tabanlı, mesajı kalıcı tutan kuyruktur. İkisi birlikte kullanılır." },
      { t: "warn", h: "Tuzak", text: "SNS mesajı saklamaz. Abone o anda ulaşılamazsa ve yeniden deneme biterse mesaj kaybolur. Güvenilirlik için abone olarak SQS kullan." }
    ],
    quiz: [
      { q: "Tek bir mesajı birden fazla abone sisteme dağıtma kalıbı hangisidir?", options: ["Fan-out", "Failover", "Sharding", "Backoff"], answer: "Fan-out", why: "SNS → birden çok SQS en klasik örnektir." },
      { q: "Aboneye yalnızca belirli mesajları ulaştıran özellik nedir?", options: ["Mesaj filtreleme politikası", "Visibility timeout", "TTL", "Long polling"], answer: "Mesaj filtreleme politikası", why: "Mesaj özniteliklerine göre filtreler." },
      { q: "SNS ve SQS arasındaki temel fark nedir?", options: ["SNS itme tabanlı yayın-abonelik, SQS çekme tabanlı kuyruk", "İkisi aynı", "SNS kalıcı depolar", "SQS e-posta atar"], answer: "SNS itme tabanlı yayın-abonelik, SQS çekme tabanlı kuyruk", why: "SQS mesajı saklar; SNS dağıtır." },
      { q: "SNS konusuna abone olabilecek bir hedef hangisidir?", options: ["Lambda fonksiyonu", "Bir EBS diski", "Bir IAM kullanıcısı", "Bir subnet"], answer: "Lambda fonksiyonu", why: "SQS, Lambda, HTTP, e-posta, SMS desteklenir." }
    ],
    interview: [
      { q: "SNS + SQS fan-out neden tercih edilir?", a: "Her tüketici kendi kuyruğuna sahip olur: bağımsız hızda işler, kendi yeniden deneme ve DLQ'sunu yönetir; biri çökse bile mesaj kuyrukta bekler. Üretici abonelerden habersiz kalır." },
      { q: "SNS mesaj kaybedebilir mi?", a: "SNS mesajı kalıcı saklamaz; teslim edilemeyen mesaj yeniden deneme politikasından sonra DLQ ayarlı değilse kaybolur. Bu yüzden kritik tüketiciler için SQS aboneliği ve DLQ kullanılır." }
    ],
    vocab: [
      { term: "Publish", tr: "yayınlamak", ex: "Publish a message to the topic." },
      { term: "Subscribe", tr: "abone olmak", ex: "Subscribe a queue to the topic." },
      { term: "Fan-out", tr: "yayılım", ex: "Use fan-out for notifications." },
      { term: "Filter policy", tr: "filtre politikası", ex: "Add a filter policy." },
      { term: "Notification", tr: "bildirim", ex: "Send an SMS notification." }
    ],
    resources: [
      { title: "Amazon SNS Geliştirici Kılavuzu", url: DOC + "sns/latest/dg/welcome.html", type: "doc", why: "Resmî rehber", level: "başlangıç", lang: "EN" },
      res(SKILL, "Olay tabanlı mimari kursları")
    ],
    sources: [EXAM]
  };

  /* 20 ─────────────────────────────── EventBridge */
  L[20] = {
    hook: "Sistemde 'bir şey oldu' diyen her olayı kurallarla doğru yere yönlendiren servis.",
    homework: "Her gece 02:00'de bir Lambda'yı çalıştıran zamanlanmış bir kural tasarla. Cron ifadesini yaz.",
    warmup: {
      recap: [{ point: "SNS mesajı abonelere dağıtır.", example: "Fan-out" }],
      concepts: [
        { term: "Event bus", tr: "Olay veri yolu", summary: "Olayların gönderildiği ve kuralların değerlendirildiği kanal.", example: "default bus" },
        { term: "Rule", tr: "Kural", summary: "Olay desenine uyan olayları hedeflere yönlendirir veya zamanlanmış çalıştırır.", example: "S3 'Object Created' → Lambda" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "EC2 durdu, S3'e dosya düştü, ödeme sistemi bir olay gönderdi: EventBridge bu olayları kurallara göre doğru hedefe (Lambda, Step Functions, SQS) yönlendirir. Ayrıca cron benzeri zamanlama sağlar." },
      { t: "steps", h: "Kavramlar", items: [
        "Olay kaynağı: AWS servisleri, kendi uygulamaların, SaaS ortakları.",
        "Event bus: default, özel ve ortak (partner) veri yolları.",
        "Kural: olay deseni (JSON) eşleşirse hedefleri tetikler.",
        "Hedef: Lambda, SQS, SNS, Step Functions, Kinesis, API hedefi vb. (kural başına birden fazla).",
        "EventBridge Scheduler: tek seferlik veya tekrarlayan zamanlanmış çağrılar."
      ] },
      { t: "cmd", lang: "json", text: "{\n  \"source\": [\"aws.s3\"],\n  \"detail-type\": [\"Object Created\"],\n  \"detail\": { \"bucket\": { \"name\": [\"benim-kovam\"] } }\n}" },
      { t: "box", h: "Zamanlama", text: "cron(0 2 * * ? *) her gün 02:00 UTC. rate(5 minutes) her 5 dakikada. Saat dilimi dikkat: cron ifadeleri varsayılan UTC'dir." },
      { t: "steps", h: "Ek özellikler", items: [
        "Arşiv ve yeniden oynatma (replay): geçmiş olayları tekrar işle.",
        "Şema kayıt defteri (schema registry): olay yapılarını keşfet.",
        "Pipes: kaynaktan (SQS, DynamoDB Streams) filtre ve zenginleştirmeyle hedefe bağlar.",
        "DLQ ve yeniden deneme politikası (hedef başına)."
      ] },
      { t: "box", h: "SNS ile fark", text: "EventBridge içerik tabanlı zengin filtreleme, çok sayıda AWS ve SaaS kaynağı, şema ve replay sunar. SNS yüksek hacimli basit yayın ve SMS/e-posta/mobil bildirim için uygundur." },
      { t: "warn", h: "Tuzak", text: "Olay iletimi en az bir kez olduğundan hedefler idempotent olmalıdır. Ayrıca zamanlanmış kuralın saat dilimini unutma." }
    ],
    quiz: [
      { q: "Her gün belirli saatte Lambda çalıştırmak için ne kullanılır?", options: ["EventBridge zamanlanmış kural", "SQS visibility timeout", "S3 lifecycle", "IAM rolü"], answer: "EventBridge zamanlanmış kural", why: "cron veya rate ifadesiyle zamanlanır." },
      { q: "Olay deseni neyi belirler?", options: ["Hangi olayların kuralla eşleşeceğini", "Disk boyutunu", "Parola politikasını", "Bölge seçimini"], answer: "Hangi olayların kuralla eşleşeceğini", why: "Desen JSON olarak olayın alanlarını eşler." },
      { q: "Geçmiş olayları yeniden işlemeyi sağlayan özellik hangisidir?", options: ["Archive and replay", "Fan-out", "Long polling", "PITR"], answer: "Archive and replay", why: "Arşivlenen olaylar tekrar oynatılır." },
      { q: "Bir kuralın hedefi olamayacak olan hangisidir?", options: ["Bir EBS snapshot'ının boyutu", "Lambda", "SQS", "Step Functions"], answer: "Bir EBS snapshot'ının boyutu", why: "Hedefler servis çağrılarıdır." },
      { q: "cron ifadeleri hangi saat diliminde değerlendirilir (klasik kural)?", options: ["UTC", "Yerel", "İstanbul", "PST"], answer: "UTC", why: "Scheduler ise saat dilimi seçmeye izin verir." }
    ],
    interview: [
      { q: "EventBridge ile SNS farkı nedir?", a: "EventBridge olay tabanlı mimari için zengin desen eşleme, SaaS ve AWS kaynak entegrasyonu, replay ve şema sunar. SNS yüksek hacimli, basit yayın-abonelik ve son kullanıcı bildirimleri için uygundur." },
      { q: "Zamanlanmış işleri AWS'de nasıl yaparsın?", a: "EventBridge Scheduler veya zamanlanmış kural ile cron/rate ifadesi tanımlar, hedef olarak Lambda veya Step Functions seçerim." }
    ],
    vocab: [
      { term: "Event", tr: "olay", ex: "An event matches the rule." },
      { term: "Bus", tr: "veri yolu", ex: "Send events to a custom bus." },
      { term: "Rule", tr: "kural", ex: "Create a rule." },
      { term: "Target", tr: "hedef", ex: "Add a Lambda target." },
      { term: "Schedule", tr: "zamanlama", ex: "Create a schedule." }
    ],
    resources: [
      { title: "Amazon EventBridge Kullanıcı Kılavuzu", url: DOC + "eventbridge/latest/userguide/eb-what-is.html", type: "doc", why: "Resmî rehber", level: "başlangıç", lang: "EN" },
      res(SKILL, "Olay tabanlı mimari")
    ],
    sources: [EXAM]
  };

  /* 21 ─────────────────────────────── CloudFormation ve SAM */
  L[21] = {
    hook: "Altyapıyı tıklayarak değil, kodla kur: tekrarlanabilir, sürümlenebilir, silinebilir.",
    homework: "Bir S3 kovası içeren minimal bir CloudFormation şablonu (YAML) yaz ve yığın (stack) olarak oluştur, sonra sil.",
    warmup: {
      recap: [{ point: "YAML/JSON yapılandırma biçimleridir.", example: "Şablon" }, { point: "Git geçmiş tutar.", example: "Şablonu depoya koy" }],
      concepts: [
        { term: "Infrastructure as Code", tr: "Kod olarak altyapı", summary: "Altyapıyı bildirimsel dosyalarla tanımlama.", example: "CloudFormation" },
        { term: "Stack", tr: "Yığın", summary: "Bir şablondan oluşturulan kaynakların yönetilen grubu.", example: "siparis-api-prod" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Dev, test ve prod ortamlarının aynı olmasını istiyorsun. Elle kurulumda her ortam biraz farklıdır. Şablonla aynı altyapıyı her seferinde aynı kurarsın." },
      { t: "cmd", lang: "yaml", text: "AWSTemplateFormatVersion: '2010-09-09'\nParameters:\n  Ortam: { Type: String, Default: dev }\nResources:\n  Kova:\n    Type: AWS::S3::Bucket\n    Properties:\n      BucketName: !Sub benim-kova-${Ortam}\nOutputs:\n  KovaAdi:\n    Value: !Ref Kova" },
      { t: "steps", h: "Şablon bölümleri", items: [
        "Resources (zorunlu): oluşturulacak kaynaklar.",
        "Parameters: dağıtımda verilen değerler.",
        "Mappings, Conditions: sabit eşlemeler ve koşullu oluşturma.",
        "Outputs: çıktılar, diğer yığınlara aktarım (Export).",
        "Fonksiyonlar: !Ref, !GetAtt, !Sub, !Join, !ImportValue."
      ] },
      { t: "steps", h: "Güvenli değişiklik", items: [
        "Change set: uygulamadan önce neyin değişeceğini gör.",
        "Drift detection: elle yapılan değişiklikleri tespit et.",
        "Rollback: hata olursa otomatik önceki duruma dön.",
        "DeletionPolicy: Retain/Snapshot ile silinirken veriyi koru.",
        "Stack policy: kritik kaynakları korur."
      ] },
      { t: "box", h: "SAM", text: "AWS SAM, CloudFormation'ın sunucusuz uzantısıdır. Transform: AWS::Serverless-2016-10-31 ile AWS::Serverless::Function, ::Api, ::SimpleTable gibi kısa tanımlar yazılır. sam build, sam local invoke, sam deploy --guided komutları vardır." },
      { t: "cmd", lang: "yaml", text: "Transform: AWS::Serverless-2016-10-31\nResources:\n  Fn:\n    Type: AWS::Serverless::Function\n    Properties:\n      Runtime: python3.12\n      Handler: app.handler\n      CodeUri: src/\n      Events:\n        Api: { Type: Api, Properties: { Path: /merhaba, Method: get } }" },
      { t: "warn", h: "Tuzak", text: "Yığının yönettiği kaynağı konsoldan elle değiştirmek (drift). Bir sonraki dağıtımda değişikliğin üzerine yazılır veya hata alırsın. Değişiklik şablondan yapılmalıdır." }
    ],
    quiz: [
      { q: "Uygulamadan önce hangi kaynakların değişeceğini gösteren özellik nedir?", options: ["Change set", "Drift detection", "Stack policy", "Export"], answer: "Change set", why: "Değişiklik önizlemesi sağlar." },
      { q: "CloudFormation şablonunda zorunlu bölüm hangisidir?", options: ["Resources", "Outputs", "Parameters", "Mappings"], answer: "Resources", why: "Şablonun en az bir kaynağı olmalıdır." },
      { q: "Elle yapılan değişiklikleri tespit eden özellik hangisidir?", options: ["Drift detection", "Change set", "Rollback", "Transform"], answer: "Drift detection", why: "Gerçek durumu şablonla karşılaştırır." },
      { q: "SAM'in CloudFormation'a eklediği nedir?", options: ["Sunucusuz kaynaklar için kısa sözdizimi", "Yeni bir bulut", "Veritabanı motoru", "DNS servisi"], answer: "Sunucusuz kaynaklar için kısa sözdizimi", why: "Transform ile genişletilir." },
      { q: "Yığın silinirken veriyi korumak için hangi ayar kullanılır?", options: ["DeletionPolicy: Retain", "Outputs", "Mappings", "Metadata"], answer: "DeletionPolicy: Retain", why: "Kaynak yığın silinse de kalır." }
    ],
    interview: [
      { q: "CloudFormation ve elle konsol kullanımı farkı?", a: "Şablon tekrarlanabilir, sürümlenebilir ve incelenebilir; ortamlar arası tutarlılık sağlar, geri alma ve silme kolaydır. Elle kurulum hataya ve ortamlar arası farka açıktır." },
      { q: "SAM nedir?", a: "CloudFormation üzerine kurulu sunucusuz uygulama çerçevesidir: Function, Api, SimpleTable gibi kısa kaynaklar, yerel test (sam local) ve dağıtım komutları sunar." }
    ],
    vocab: [
      { term: "Template", tr: "şablon", ex: "Write a template." },
      { term: "Stack", tr: "yığın", ex: "Delete the stack." },
      { term: "Drift", tr: "sapma", ex: "Detect drift." },
      { term: "Deploy", tr: "dağıtmak", ex: "Deploy the stack." },
      { term: "Parameter", tr: "parametre", ex: "Pass a parameter." }
    ],
    resources: [
      { title: "AWS CloudFormation Kullanıcı Kılavuzu", url: DOC + "AWSCloudFormation/latest/UserGuide/Welcome.html", type: "doc", why: "Resmî rehber", level: "başlangıç", lang: "EN" },
      { title: "AWS SAM Geliştirici Kılavuzu", url: DOC + "serverless-application-model/latest/developerguide/what-is-sam.html", type: "doc", why: "Sunucusuz dağıtım", level: "orta", lang: "EN" }
    ],
    sources: [EXAM]
  };

  /* 22 ─────────────────────────────── CI/CD */
  L[22] = {
    hook: "Koda push et, gerisini boru hattı yapsın: derle, test et, dağıt.",
    homework: "Bir CI/CD boru hattını üç aşamada çiz: kaynak, derleme/test, dağıtım. Her aşamada hangi AWS servisi var?",
    warmup: {
      recap: [{ point: "Git deposu kodun kaynağıdır.", example: "main dalı" }, { point: "Şablon altyapıyı tanımlar.", example: "CloudFormation" }],
      concepts: [
        { term: "CI/CD", tr: "Sürekli entegrasyon / dağıtım", summary: "Kod değişikliklerini otomatik derleyip test eden ve dağıtan süreç.", example: "push → test → deploy" },
        { term: "Pipeline", tr: "Boru hattı", summary: "Sıralı aşamalardan oluşan otomatik akış.", example: "Source → Build → Deploy" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Elle dağıtım hata ve gecikme demek. Boru hattı her push'ta aynı adımları çalıştırır, testi geçmeyen kodu canlıya göndermez." },
      { t: "steps", h: "AWS geliştirici araçları", items: [
        "CodeCommit: yönetilen Git deposu (birçok ekip bunun yerine GitHub veya GitLab kullanır; CodePipeline bunlara da bağlanır).",
        "CodeBuild: derleme ve test; buildspec.yml ile tanımlanır; sunucusuz, kullanım başına ödeme.",
        "CodeDeploy: EC2, on-premises, Lambda ve ECS'ye dağıtım; appspec dosyası.",
        "CodePipeline: aşamaları (Source, Build, Test, Deploy, Approval) birleştiren orkestratör."
      ] },
      { t: "cmd", lang: "yaml", text: "version: 0.2\nphases:\n  install:\n    commands: [pip install -r requirements.txt]\n  build:\n    commands: [pytest, sam build]\nartifacts:\n  files: ['**/*']" },
      { t: "steps", h: "Dağıtım stratejileri", items: [
        "In-place (yerinde): mevcut örnekler güncellenir; kısa kesinti riski.",
        "Rolling: örnekler gruplar hâlinde güncellenir.",
        "Blue/Green: yeni ortam kurulur, trafik geçirilir; hızlı geri dönüş; ek maliyet.",
        "Canary / Linear (Lambda, ECS): trafiğin küçük yüzdesi veya kademeli aktarımı; alarm tetiklenirse otomatik geri alma."
      ] },
      { t: "box", h: "Lambda ve CodeDeploy", text: "Lambda takma adı (alias) ağırlıklı trafik kaydırması yapar: Canary10Percent5Minutes gibi yapılandırmalar ve CloudWatch alarmı ile otomatik rollback sağlanır." },
      { t: "box", h: "Gizli bilgiler", text: "Derleme sırasında parolaları ortam değişkeni olarak koda yazma. Secrets Manager veya Parameter Store referansı kullan; derleme rolüne en az yetki ver." },
      { t: "warn", h: "Tuzak", text: "Test aşamasız boru hattı: otomatik hatayı otomatik canlıya taşır. Testi, onay aşamasını ve rollback planını eksik bırakma." }
    ],
    quiz: [
      { q: "Derleme ve test adımını yürüten servis hangisidir?", options: ["CodeBuild", "CodeDeploy", "CloudTrail", "Route 53"], answer: "CodeBuild", why: "buildspec.yml ile çalışır." },
      { q: "Yeni ortam kurup trafiği geçirerek hızlı geri dönüş sağlayan strateji hangisidir?", options: ["Blue/Green", "In-place", "Rolling", "Manuel"], answer: "Blue/Green", why: "Eski ortam hazır beklediği için geri dönüş hızlıdır." },
      { q: "Aşamaları bir araya getiren orkestratör hangisidir?", options: ["CodePipeline", "CodeBuild", "Cognito", "KMS"], answer: "CodePipeline", why: "Source, Build, Deploy aşamalarını bağlar." },
      { q: "Lambda'da trafiği kademeli yeni sürüme kaydırmak için ne kullanılır?", options: ["Alias ve CodeDeploy canary/linear", "VPC peering", "Edge location", "Snowball"], answer: "Alias ve CodeDeploy canary/linear", why: "Alarm tetiklenirse otomatik geri alınır." },
      { q: "Derleme tanım dosyasının adı nedir?", options: ["buildspec.yml", "appspec.json", "Dockerfile", "template.txt"], answer: "buildspec.yml", why: "CodeBuild bu dosyayı okur." }
    ],
    interview: [
      { q: "Blue/Green ve Canary farkı nedir?", a: "Blue/Green tam yeni ortam kurup trafiği topluca geçirir, eski ortam geri dönüş için hazır kalır. Canary trafiğin küçük bir yüzdesini yeni sürüme gönderip izler, sorun yoksa kalanını kaydırır." },
      { q: "CI/CD'nin faydası?", a: "Hızlı ve tekrarlanabilir dağıtım, erken hata yakalama, küçük ve sık sürümler, insan hatasının azalması." }
    ],
    vocab: [
      { term: "Pipeline", tr: "boru hattı", ex: "The pipeline failed at the build stage." },
      { term: "Artifact", tr: "çıktı paketi", ex: "Store the build artifact." },
      { term: "Rollback", tr: "geri alma", ex: "Trigger an automatic rollback." },
      { term: "Blue/Green", tr: "mavi/yeşil dağıtım", ex: "Use a blue/green deployment." },
      { term: "Approval", tr: "onay", ex: "Add a manual approval." }
    ],
    resources: [
      { title: "AWS CodePipeline Kullanıcı Kılavuzu", url: DOC + "codepipeline/latest/userguide/welcome.html", type: "doc", why: "Resmî rehber", level: "başlangıç", lang: "EN" },
      { title: "AWS CodeBuild Kullanıcı Kılavuzu", url: DOC + "codebuild/latest/userguide/welcome.html", type: "doc", why: "buildspec ve derleme", level: "orta", lang: "EN" }
    ],
    sources: [EXAM]
  };

  /* 23 ─────────────────────────────── Elastic Beanstalk */
  L[23] = {
    hook: "Kodunu yükle, gerisini (sunucu, yük dengeleyici, ölçekleme) platform kursun.",
    homework: "Elastic Beanstalk ile Lambda'yı karşılaştır: hangi durumda hangisini seçersin?",
    warmup: {
      recap: [{ point: "PaaS kodu getirir, altyapıyı platform yönetir.", example: "Beanstalk" }],
      concepts: [
        { term: "Elastic Beanstalk", tr: "Platform hizmeti", summary: "Kodunu yükleyince EC2, ELB, Auto Scaling ve izlemeyi kuran yönetilen platform.", example: "Python/Node/Java uygulaması" },
        { term: "Environment", tr: "Ortam", summary: "Bir uygulama sürümünü çalıştıran kaynak koleksiyonu.", example: "web sunucu ortamı" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Geleneksel bir web uygulamasını (Django, Spring) AWS'ye altyapıyla uğraşmadan taşımak istiyorsun. Beanstalk, kodunu paketleyip ortamı kurar; kaynaklar yine senin hesabında görünür ve kontrol edilebilir." },
      { t: "steps", h: "Ortam türleri", items: [
        "Web sunucu ortamı: HTTP isteklerini karşılar (ELB + EC2 + Auto Scaling).",
        "Worker ortamı: SQS kuyruğundan mesaj işler (arka plan işleri)."
      ] },
      { t: "steps", h: "Dağıtım politikaları", items: [
        "All at once: en hızlı, kesinti olabilir.",
        "Rolling: gruplar hâlinde, kapasite düşer.",
        "Rolling with additional batch: kapasiteyi korur.",
        "Immutable: yeni örnek grubu, güvenli ve hızlı geri alma.",
        "Traffic splitting: canary benzeri trafik bölme.",
        "Blue/Green: iki ortamın URL'lerini değiştirme (CNAME swap)."
      ] },
      { t: "steps", h: "Yapılandırma", items: [
        ".ebextensions klasörü (YAML/JSON .config dosyaları): paketler, dosyalar, komutlar.",
        "Ortam değişkenleri ve ayarlar konsoldan veya dosyadan.",
        "Procfile, Buildfile, platform kancaları.",
        "EB CLI: eb init, eb create, eb deploy, eb logs."
      ] },
      { t: "box", h: "Veritabanı", text: "Beanstalk ortamı içine RDS eklemek mümkündür ama ortam silinince veritabanı da silinir. Üretimde RDS'i ortamın dışında oluşturup bağlamak önerilir." },
      { t: "box", h: "Seçim", text: "Hızlı taşıma, geleneksel uygulama, az altyapı bilgisi: Beanstalk. Olay tabanlı kısa işler: Lambda. Konteynerler: ECS/EKS/App Runner. Tam kontrol: EC2." },
      { t: "warn", h: "Tuzak", text: "Beanstalk ortamını konsoldan elle değiştirmek ve .ebextensions ile çakıştırmak. Kalıcı değişikliği yapılandırma dosyasında tut." }
    ],
    quiz: [
      { q: "SQS kuyruğundan mesaj işleyen Beanstalk ortamı türü hangisidir?", options: ["Worker", "Web sunucu", "Edge", "Batch"], answer: "Worker", why: "Worker ortamı arka plan işleri içindir." },
      { q: "Yeni örnek grubu kurup güvenli geri alma sağlayan dağıtım politikası hangisidir?", options: ["Immutable", "All at once", "Manuel", "Tek örnek"], answer: "Immutable", why: "Yeni örnekler sağlıklı olursa eskiler kaldırılır." },
      { q: "Beanstalk yapılandırma dosyaları hangi klasörde tutulur?", options: [".ebextensions", "/etc/aws", "buildspec", ".github"], answer: ".ebextensions", why: "Ortam özelleştirmeleri burada." },
      { q: "Üretimde veritabanı için doğru tercih nedir?", options: ["RDS'i ortamın dışında oluşturmak", "Ortam içinde RDS", "Dosyada saklamak", "Lambda'ya gömmek"], answer: "RDS'i ortamın dışında oluşturmak", why: "Ortam silinirse veritabanı da gider." },
      { q: "Beanstalk hangi hizmet modeline örnektir?", options: ["PaaS", "IaaS tek başına", "SaaS", "Colocation"], answer: "PaaS", why: "Kod yüklenir, platform altyapıyı yönetir." }
    ],
    interview: [
      { q: "Beanstalk ne zaman uygun?", a: "Geleneksel web uygulamasını az altyapı yönetimiyle hızla AWS'ye taşımak istediğimde. Kaynaklar hâlâ benim hesabımda olduğundan gerektiğinde ince ayar yapabilirim." },
      { q: "Immutable ve rolling farkı?", a: "Rolling mevcut örnekleri gruplar hâlinde günceller; kapasite geçici düşebilir. Immutable yeni bir örnek grubu oluşturur ve sağlıklıysa eskileri kaldırır; geri alma daha güvenlidir." }
    ],
    vocab: [
      { term: "Platform", tr: "platform", ex: "Select a Python platform." },
      { term: "Environment", tr: "ortam", ex: "Create a new environment." },
      { term: "Application version", tr: "uygulama sürümü", ex: "Upload an application version." },
      { term: "Worker", tr: "işçi (arka plan)", ex: "A worker environment." },
      { term: "Swap URL", tr: "URL değiştirmek", ex: "Swap the environment URLs." }
    ],
    resources: [
      { title: "Elastic Beanstalk Geliştirici Kılavuzu", url: DOC + "elasticbeanstalk/latest/dg/Welcome.html", type: "doc", why: "Resmî rehber", level: "başlangıç", lang: "EN" },
      res(SKILL, "Uygulama dağıtım kursları")
    ],
    sources: [EXAM]
  };

  /* 24 ─────────────────────────────── ECS ve ECR */
  L[24] = {
    hook: "'Bende çalışıyor' bitti: konteyner uygulamayı ve ortamını paketler.",
    homework: "Basit bir uygulama için Dockerfile yaz: taban imaj, bağımlılık kurulumu, port ve başlangıç komutu.",
    warmup: {
      recap: [{ point: "Yönetilen platform altyapıyı üstlenir.", example: "Beanstalk" }],
      concepts: [
        { term: "Container", tr: "Konteyner", summary: "Uygulamayı ve bağımlılıklarını izole, taşınabilir bir pakette çalıştıran birim.", example: "Docker" },
        { term: "Task definition", tr: "Görev tanımı", summary: "ECS'de hangi imaj, CPU/bellek, port ve rolle konteyner çalışacağının planı.", example: "JSON/YAML" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Uygulaman özel sistem kütüphaneleri istiyor ve Lambda sınırlarına sığmıyor. Konteynerleştirip ECR'a koyar, ECS ile Fargate üzerinde sunucu yönetmeden çalıştırırsın." },
      { t: "cmd", lang: "dockerfile", text: "FROM python:3.12-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nEXPOSE 8080\nCMD [\"python\", \"app.py\"]" },
      { t: "steps", h: "ECR", items: [
        "Yönetilen konteyner imaj deposu (private/public).",
        "aws ecr get-login-password ile docker login; docker tag + docker push.",
        "Görüntü taraması, yaşam döngüsü kuralları (eski imajları sil), değişmez etiketler.",
        "Erişim: IAM ve depo politikası."
      ] },
      { t: "steps", h: "ECS kavramları", items: [
        "Cluster: görev ve servislerin mantıksal grubu.",
        "Task definition: imaj, CPU/bellek, ortam değişkenleri, port, günlük, görev rolü.",
        "Task: çalışan konteyner(ler). Service: istenen sayıda görevi sürekli çalışır tutar, yük dengeleyiciye bağlanır.",
        "Başlatma türü: Fargate (sunucusuz) veya EC2 (kendi örneklerin)."
      ] },
      { t: "box", h: "Roller", text: "Task execution role: ECS'nin imajı çekmesi ve günlük yazması için. Task role: konteyner içindeki uygulamanın DynamoDB, S3 gibi servisleri çağırması için. İkisini karıştırma." },
      { t: "box", h: "Seçenekler", text: "ECS: AWS'nin kendi basit orkestratörü. EKS: yönetilen Kubernetes. App Runner: imajdan doğrudan web servisi. Fargate: ikisi için de sunucusuz hesaplama." },
      { t: "warn", h: "Tuzak", text: "Gizli bilgileri (parola, anahtar) imajın içine koymak. Secrets Manager veya Parameter Store'dan task tanımında secrets ile geçir." }
    ],
    quiz: [
      { q: "Konteyner imajlarını depolayan AWS servisi hangisidir?", options: ["ECR", "ECS", "S3 Glacier", "RDS"], answer: "ECR", why: "Elastic Container Registry." },
      { q: "Sunucu yönetmeden konteyner çalıştırmanın seçeneği hangisidir?", options: ["Fargate", "EC2 başlatma türü", "Bastion", "Direct Connect"], answer: "Fargate", why: "Altyapıyı AWS yönetir." },
      { q: "Konteyner içindeki uygulamanın DynamoDB'ye erişmesi hangi rolle yapılır?", options: ["Task role", "Task execution role", "Root", "Service-linked role"], answer: "Task role", why: "Execution role imaj çekme ve log içindir." },
      { q: "İstenen sayıda görevi sürekli çalışır tutan ECS yapısı hangisidir?", options: ["Service", "Task definition", "Registry", "Layer"], answer: "Service", why: "Görev düşerse yenisini başlatır." },
      { q: "Yönetilen Kubernetes servisi hangisidir?", options: ["EKS", "ECS", "ECR", "SQS"], answer: "EKS", why: "Elastic Kubernetes Service." }
    ],
    interview: [
      { q: "ECS ile EKS farkı nedir?", a: "ECS AWS'nin kendi daha basit orkestratörüdür. EKS yönetilen Kubernetes'tir: taşınabilirlik ve geniş ekosistem sunar, öğrenme eğrisi daha diktir." },
      { q: "Task role ile task execution role farkı?", a: "Execution role ECS ajanının imajı ECR'dan çekmesi ve günlük yazması içindir. Task role konteynerdeki uygulamanın AWS servislerini çağırması içindir." },
      { q: "Konteyner ve Lambda arasında nasıl seçersin?", a: "Kısa, olay tabanlı ve değişken yükte Lambda. Uzun süreli süreçler, özel çalışma zamanı, 15 dakikayı aşan iş veya sürekli çalışan servis için konteyner." }
    ],
    vocab: [
      { term: "Image", tr: "imaj", ex: "Build the image." },
      { term: "Registry", tr: "imaj deposu", ex: "Push the image to the registry." },
      { term: "Cluster", tr: "küme", ex: "Create an ECS cluster." },
      { term: "Task", tr: "görev", ex: "Run a task." },
      { term: "Orchestrator", tr: "orkestratör", ex: "ECS is a container orchestrator." }
    ],
    resources: [
      { title: "Amazon ECS Geliştirici Kılavuzu", url: DOC + "AmazonECS/latest/developerguide/Welcome.html", type: "doc", why: "Resmî rehber", level: "başlangıç", lang: "EN" },
      { title: "Docker: Başlangıç", url: "https://docs.docker.com/get-started/", type: "doc", why: "Konteyner temelleri", level: "başlangıç", lang: "EN" }
    ],
    sources: [EXAM]
  };
})();

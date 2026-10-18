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
    objectives: [
      { id: "h1", text: "SNS konusu ile SQS kuyruklarını bağlayarak fan-out kalıbını kurgulayabilir ve geçerli abone türlerini sayabilirsin." },
      { id: "h2", text: "SNS ile SQS'yi iletim modeli (itme/çekme) ve mesaj saklama açısından ayırt edebilirsin." },
      { id: "h3", text: "Filtre politikasıyla aboneye yalnızca ilgili mesajların gitmesini sağlayabilirsin." },
      { id: "h4", text: "SNS'in mesajı saklamadığını bilerek güvenilir teslim için SQS aboneliği ve DLQ seçebilirsin." }
    ],
    summary: [
      "Fan-out'ta tek mesaj bir SNS konusundan birden çok aboneye dağıtılır; her abone için ayrı SQS kuyruğu bağlamak tüketicileri bağımsız kılar.",
      "SNS abone olarak SQS, Lambda, HTTP/HTTPS, e-posta, SMS, mobil bildirim ve Kinesis Data Firehose destekler.",
      "SNS itme tabanlıdır ve mesajı saklamaz; SQS çekme tabanlıdır ve mesajı kuyrukta tutar.",
      "Filtre politikası aboneye yalnızca belirli özniteliklere uyan mesajları iletir (ör. tutar > 1000).",
      "Teslim denemeleri bitince mesaj kaybolabilir; kritik tüketicide SQS aboneliği ve abonelik DLQ'su kullanılır."
    ],
    quiz: [
      { q: "Tek bir mesajı birden fazla abone sisteme dağıtma kalıbı hangisidir?", options: ["Fan-out", "Failover", "Sharding", "Backoff"], answer: "Fan-out", why: "SNS → birden çok SQS en klasik örnektir.", obj: "h1", whyNot: {"Failover":"Failover yedek örneğe geçiştir; mesaj dağıtımı değildir.","Sharding":"Sharding veriyi parçalara böler; mesajı abonelere yaymaz.","Backoff":"Backoff yeniden denemeler arası bekleme stratejisidir."} },
      { q: "Aboneye yalnızca belirli mesajları ulaştıran özellik nedir?", options: ["Mesaj filtreleme politikası", "Visibility timeout", "TTL", "Long polling"], answer: "Mesaj filtreleme politikası", why: "Mesaj özniteliklerine göre filtreler.", obj: "h3", whyNot: {"Visibility timeout":"Visibility timeout SQS'te alınan mesajı gizler; SNS aboneliği filtrelemez.","TTL":"TTL önbellek geçerlilik süresidir.","Long polling":"Long polling SQS okuma yöntemidir; SNS aboneliğine etkisi yoktur."} },
      { q: "SNS ve SQS arasındaki temel fark nedir?", options: ["SNS itme tabanlı yayın-abonelik, SQS çekme tabanlı kuyruk", "İkisi aynı", "SNS kalıcı depolar", "SQS e-posta atar"], answer: "SNS itme tabanlı yayın-abonelik, SQS çekme tabanlı kuyruk", why: "SQS mesajı saklar; SNS dağıtır.", obj: "h2", whyNot: {"İkisi aynı":"İkisi aynı değildir: SNS itme, SQS çekme tabanlıdır.","SNS kalıcı depolar":"Ters söylenmiş: kalıcı saklayan SQS'tir, SNS mesajı saklamaz.","SQS e-posta atar":"E-posta gönderebilen SNS aboneliğidir; SQS e-posta atmaz."} },
      { q: "SNS konusuna abone olabilecek bir hedef hangisidir?", options: ["Lambda fonksiyonu", "Bir EBS diski", "Bir IAM kullanıcısı", "Bir subnet"], answer: "Lambda fonksiyonu", why: "SQS, Lambda, HTTP, e-posta, SMS desteklenir.", obj: "h1", whyNot: {"Bir EBS diski":"EBS diski blok depolamadır; mesaj alamaz.","Bir IAM kullanıcısı":"IAM kullanıcısı bir kimliktir, SNS aboneliği hedefi değildir.","Bir subnet":"Subnet bir ağ aralığıdır; mesaj almaz."} },
      { q: "SNS abonesi olan bir servis kısa süre ulaşılamaz oluyor. Mesajı kaybetmemek için ne yapılmalıdır?", options: ["Aboneyi SQS kuyruğu yapıp gerekirse DLQ eklemek","SNS'in mesajı kalıcı sakladığına güvenmek","TTL değerini artırmak","Long polling açmak"], answer: "Aboneyi SQS kuyruğu yapıp gerekirse DLQ eklemek", why: "SNS mesajı saklamaz; SQS kuyruğu mesajı tutar, tüketici hazır olunca okur.", obj: "h4", whyNot: {"SNS'in mesajı kalıcı sakladığına güvenmek":"SNS mesajı kalıcı saklamaz; yeniden denemeler bitince mesaj kaybolabilir.","TTL değerini artırmak":"TTL bir önbellek kavramıdır, SNS teslimini etkilemez.","Long polling açmak":"Long polling SQS tüketicisinin okuma ayarıdır; SNS'ten SQS'e teslimi garanti etmez."} },
      { q: "Sipariş konusunda yalnızca tutarı 1000'den büyük mesajların denetim kuyruğuna gitmesi isteniyor. Hangi özellik kullanılır?", options: ["Abonelik filtre politikası","SNS FIFO konusu","Mesaj saklama süresi","E-posta aboneliği"], answer: "Abonelik filtre politikası", why: "Filtre politikası mesaj özniteliklerine göre aboneye yalnız uyan mesajları iletir.", obj: "h3", whyNot: {"SNS FIFO konusu":"FIFO konu sıra ve tekrarsızlık sağlar; içerik süzmez.","Mesaj saklama süresi":"SNS mesaj saklamaz; saklama süresi SQS özelliğidir.","E-posta aboneliği":"E-posta aboneliği bir hedef türüdür; mesajları tutara göre süzmez."} }
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
    objectives: [
      { id: "h1", text: "Olay desenini (source, detail-type, detail) JSON olarak yazıp hangi olayları yakalayacağını söyleyebilirsin." },
      { id: "h2", text: "cron ve rate ifadeleriyle zamanlanmış kural yazıp klasik kurallarda UTC varsayımını gözetebilirsin." },
      { id: "h3", text: "Kural hedeflerini (Lambda, SQS, SNS, Step Functions) ve archive/replay özelliğini ihtiyaca göre seçebilirsin." },
      { id: "h4", text: "EventBridge ile SNS'i (zengin olay eşleme ve SaaS entegrasyonu mu, basit yüksek hacimli bildirim mi) ayırt edebilirsin." }
    ],
    summary: [
      "Kural, olay deseni JSON'u eşleşince hedefleri tetikler; bir kuralın birden fazla hedefi olabilir (Lambda, SQS, SNS, Step Functions, Kinesis ve diğerleri).",
      "cron(0 2 * * ? *) her gün 02:00 UTC demektir, rate(5 minutes) her 5 dakikadır; klasik kurallarda ifade UTC değerlendirilir, EventBridge Scheduler saat dilimi seçtirir.",
      "Archive ve replay geçmiş olayları yeniden işletir; şema kayıt defteri olay yapılarını keşfettirir.",
      "Pipes, SQS veya DynamoDB Streams gibi kaynakları filtre ve zenginleştirmeyle hedefe bağlar.",
      "Olay iletimi en az bir kez olduğundan hedefler idempotent olmalıdır; SNS basit ve yüksek hacimli bildirim için, EventBridge zengin olay yönlendirme için seçilir."
    ],
    quiz: [
      { q: "Her gün belirli saatte Lambda çalıştırmak için ne kullanılır?", options: ["EventBridge zamanlanmış kural", "SQS visibility timeout", "S3 lifecycle", "IAM rolü"], answer: "EventBridge zamanlanmış kural", why: "cron veya rate ifadesiyle zamanlanır.", obj: "h2", whyNot: {"SQS visibility timeout":"SQS visibility timeout mesajı gizler; zamanlama yapmaz.","S3 lifecycle":"S3 lifecycle nesnelerin yaşam döngüsünü yönetir, Lambda çalıştırmaz.","IAM rolü":"IAM rolü izin verir; zamanlayıcı değildir."} },
      { q: "Olay deseni neyi belirler?", options: ["Hangi olayların kuralla eşleşeceğini", "Disk boyutunu", "Parola politikasını", "Bölge seçimini"], answer: "Hangi olayların kuralla eşleşeceğini", why: "Desen JSON olarak olayın alanlarını eşler.", obj: "h1", whyNot: {"Disk boyutunu":"Disk boyutu olay desenine değil EBS/EC2 ayarına aittir.","Parola politikasını":"Parola politikası IAM ayarıdır.","Bölge seçimini":"Bölge seçimi olay deseniyle belirlenmez."} },
      { q: "Geçmiş olayları yeniden işlemeyi sağlayan özellik hangisidir?", options: ["Archive and replay", "Fan-out", "Long polling", "PITR"], answer: "Archive and replay", why: "Arşivlenen olaylar tekrar oynatılır.", obj: "h3", whyNot: {"Fan-out":"Fan-out tek mesajı birden çok aboneye dağıtmaktır, geçmişi yeniden oynatmaz.","Long polling":"Long polling SQS okuma yöntemidir.","PITR":"PITR veritabanını belirli zamana geri döndürür; olay yeniden işletmez."} },
      { q: "Bir kuralın hedefi olamayacak olan hangisidir?", options: ["Bir EBS snapshot'ının boyutu", "Lambda", "SQS", "Step Functions"], answer: "Bir EBS snapshot'ının boyutu", why: "Hedefler servis çağrılarıdır.", obj: "h3", whyNot: {"Lambda":"Lambda geçerli bir hedeftir.","SQS":"SQS geçerli bir hedeftir.","Step Functions":"Step Functions geçerli bir hedeftir."} },
      { q: "cron ifadeleri hangi saat diliminde değerlendirilir (klasik kural)?", options: ["UTC", "Yerel", "İstanbul", "PST"], answer: "UTC", why: "Scheduler ise saat dilimi seçmeye izin verir.", obj: "h2", whyNot: {"Yerel":"Klasik kural ifadeyi hesabın yerel saatine göre değil UTC'ye göre değerlendirir.","İstanbul":"İstanbul gibi bir zaman dilimi klasik kuralda seçilemez; yalnız Scheduler seçtirir.","PST":"PST klasik kuralda kullanılmaz; ifade UTC'dir."} },
      { q: "Şu desen hangi olayı yakalar: source 'aws.s3', detail-type 'Object Created', detail.bucket.name 'benim-kovam'?", options: ["benim-kovam kovasına nesne yüklendiğinde","Herhangi bir kovada nesne silindiğinde","Herhangi bir S3 kovasına nesne yüklendiğinde","Bir EC2 örneği durduğunda"], answer: "benim-kovam kovasına nesne yüklendiğinde", why: "Desen kaynağı, olay türünü ve kova adını birlikte eşler; yalnız uyan olaylar kuralı tetikler.", obj: "h1", whyNot: {"Herhangi bir kovada nesne silindiğinde":"Silme olayı detail-type 'Object Deleted' olurdu; desen 'Object Created' ister.","Herhangi bir S3 kovasına nesne yüklendiğinde":"Desen kova adını da eşler; yalnız benim-kovam için çalışır.","Bir EC2 örneği durduğunda":"Kaynak 'aws.s3' ile sınırlıdır; EC2 olayları aws.ec2 kaynağından gelir."} },
      { q: "Ortak (partner) bir SaaS'tan gelen olayı içeriğine göre zengin biçimde süzüp Step Functions'a yönlendirmek için en uygun servis hangisidir?", options: ["EventBridge","SNS ile SMS aboneliği","SQS long polling","Lambda layers"], answer: "EventBridge", why: "EventBridge SaaS ve AWS kaynaklarından olay alır, desen eşleme ile süzer ve hedefe yönlendirir.", obj: "h4", whyNot: {"SNS ile SMS aboneliği":"SNS SMS aboneliği son kullanıcıya bildirim göndermek içindir; SaaS olay yönlendirmesi için değildir.","SQS long polling":"Long polling SQS'in okuma yöntemidir; olay süzme veya yönlendirme yapmaz.","Lambda layers":"Layers Lambda'ya kütüphane paylaştırır; olay yönlendirmez."} }
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
    objectives: [
      { id: "h1", text: "Bir CloudFormation şablonunun bölümlerini (zorunlu Resources, Parameters, Outputs) ayırt edip küçük bir şablon yazabilirsin." },
      { id: "h2", text: "Change set ile drift detection'ı amaçlarına göre (değişikliği önizleme / elle yapılan değişikliği bulma) ayırt edebilirsin." },
      { id: "h3", text: "DeletionPolicy (Retain, Snapshot) ile yığın silinirken veriyi koruyabilirsin." },
      { id: "h4", text: "SAM'in CloudFormation üzerine ne eklediğini (Transform, AWS::Serverless::Function) ve temel komutlarını açıklayabilirsin." }
    ],
    summary: [
      "Şablonda yalnız Resources bölümü zorunludur; Parameters, Mappings, Conditions ve Outputs isteğe bağlıdır.",
      "Change set uygulamadan önce hangi kaynakların değişeceğini gösterir; drift detection gerçek durumu şablonla karşılaştırıp elle yapılan değişikliği bulur.",
      "DeletionPolicy: Retain kaynağı yığın silinse de bırakır, Snapshot silmeden önce yedek alır.",
      "SAM, Transform: AWS::Serverless-2016-10-31 ile AWS::Serverless::Function, ::Api, ::SimpleTable gibi kısa tanımlar ekler; sam build, sam local invoke, sam deploy --guided komutları vardır.",
      "Yığının yönettiği kaynağı konsoldan elle değiştirmek drift yaratır; değişiklik şablondan yapılmalıdır."
    ],
    quiz: [
      { q: "Uygulamadan önce hangi kaynakların değişeceğini gösteren özellik nedir?", options: ["Change set", "Drift detection", "Stack policy", "Export"], answer: "Change set", why: "Değişiklik önizlemesi sağlar.", obj: "h2", whyNot: {"Drift detection":"Drift detection elle yapılan değişikliği bulur; uygulama öncesi önizleme vermez.","Stack policy":"Stack policy kritik kaynakların güncellenmesini kısıtlar; değişikliği önizlemez.","Export":"Export bir çıktıyı başka yığınların kullanımına açar."} },
      { q: "CloudFormation şablonunda zorunlu bölüm hangisidir?", options: ["Resources", "Outputs", "Parameters", "Mappings"], answer: "Resources", why: "Şablonun en az bir kaynağı olmalıdır.", obj: "h1", whyNot: {"Outputs":"Outputs isteğe bağlıdır; şablon onsuz da geçerlidir.","Parameters":"Parameters isteğe bağlıdır; sabit değerlerle şablon yazılabilir.","Mappings":"Mappings isteğe bağlıdır; sabit eşleme gerekmiyorsa kullanılmaz."} },
      { q: "Elle yapılan değişiklikleri tespit eden özellik hangisidir?", options: ["Drift detection", "Change set", "Rollback", "Transform"], answer: "Drift detection", why: "Gerçek durumu şablonla karşılaştırır.", obj: "h2", whyNot: {"Change set":"Change set uygulamadan önce planlanan değişikliği gösterir, elle yapılanı aramaz.","Rollback":"Rollback hata sonrası önceki duruma dönüştür; drift tespiti yapmaz.","Transform":"Transform şablonu SAM gibi makrolarla genişletir; drift bulmaz."} },
      { q: "SAM'in CloudFormation'a eklediği nedir?", options: ["Sunucusuz kaynaklar için kısa sözdizimi", "Yeni bir bulut", "Veritabanı motoru", "DNS servisi"], answer: "Sunucusuz kaynaklar için kısa sözdizimi", why: "Transform ile genişletilir.", obj: "h4", whyNot: {"Yeni bir bulut":"SAM yeni bir bulut değil, CloudFormation'ın uzantısıdır.","Veritabanı motoru":"Veritabanı motoru değildir; dağıtım şablonu kısaltır.","DNS servisi":"DNS servisi Route 53'tür; SAM değildir."} },
      { q: "Yığın silinirken veriyi korumak için hangi ayar kullanılır?", options: ["DeletionPolicy: Retain", "Outputs", "Mappings", "Metadata"], answer: "DeletionPolicy: Retain", why: "Kaynak yığın silinse de kalır.", obj: "h3", whyNot: {"Outputs":"Outputs değeri dışa aktarır, silinme davranışını belirlemez.","Mappings":"Mappings sabit anahtar-değer eşlemesidir.","Metadata":"Metadata şablona ek bilgi ekler; silme davranışını değiştirmez."} },
      { q: "Bir veritabanı kaynağı için yığın silinirken silmeden hemen önce son bir yedek (snapshot) alınmasını istiyorsun. Hangi ayar kullanılır?", options: ["DeletionPolicy: Snapshot","DeletionPolicy: Delete","DeletionPolicy: Retain","Stack policy"], answer: "DeletionPolicy: Snapshot", why: "Snapshot, desteklenen kaynaklarda silmeden önce yedek alır; Retain ise kaynağı olduğu gibi bırakır.", obj: "h3", whyNot: {"DeletionPolicy: Delete":"Delete kaynağı yedek almadan siler.","DeletionPolicy: Retain":"Retain kaynağı olduğu gibi bırakır ama yedek (snapshot) almaz.","Stack policy":"Stack policy güncellemelerde kritik kaynakları korur; silinirken yedek almaz."} },
      { q: "Şablonun başına Transform: AWS::Serverless-2016-10-31 eklemek ne sağlar?", options: ["AWS::Serverless::Function gibi kısa sunucusuz kaynak türleri kullanılabilir","Şablon otomatik olarak Terraform'a çevrilir","Yığın birden çok bölgeye kendiliğinden dağıtılır","Drift detection otomatik çalışmaya başlar"], answer: "AWS::Serverless::Function gibi kısa sunucusuz kaynak türleri kullanılabilir", why: "Transform şablonu SAM sözdizimiyle genişletir; CloudFormation bunları tam kaynaklara açar.", obj: "h4", whyNot: {"Şablon otomatik olarak Terraform'a çevrilir":"Transform CloudFormation şablonunu işler; Terraform'a çevirme yapmaz.","Yığın birden çok bölgeye kendiliğinden dağıtılır":"Transform bölge dağıtımını değiştirmez; bölgeler ayrı yığınlarla yönetilir.","Drift detection otomatik çalışmaya başlar":"Drift detection ayrı bir özelliktir; Transform onu tetiklemez."} }
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
    objectives: [
      { id: "h1", text: "CodeBuild, CodeDeploy ve CodePipeline'ın rollerini (derle ve test et / dağıt / aşamaları bağla) ayırt edebilirsin." },
      { id: "h2", text: "buildspec.yml içindeki phases ve artifacts yapısını okuyup test komutunu doğru yere yazabilirsin." },
      { id: "h3", text: "In-place, Rolling, Blue/Green ve Canary stratejilerini geri dönüş hızı ve maliyet açısından seçebilirsin." },
      { id: "h4", text: "Lambda alias ve CodeDeploy canary/linear yapılandırmasını CloudWatch alarmıyla otomatik geri almaya bağlayarak açıklayabilirsin." }
    ],
    summary: [
      "CodeBuild buildspec.yml ile derler ve test eder, CodeDeploy EC2, on-premises, Lambda ve ECS'ye dağıtır (appspec), CodePipeline aşamaları birleştirir.",
      "buildspec.yml version, phases (install, build) ve artifacts bölümlerinden oluşur; test komutları build fazına yazılır.",
      "Blue/Green yeni ortam kurup trafiği geçirir ve hızlı geri dönüş sağlar ama ek maliyet getirir; Rolling örnekleri gruplar hâlinde günceller.",
      "Lambda'da alias ağırlıklı trafik kaydırması yapar; Canary10Percent5Minutes gibi ayarlar ve alarm, otomatik rollback sağlar.",
      "Derleme sırasında parolalar koda yazılmaz, Secrets Manager veya Parameter Store kullanılır; testsiz boru hattı hatayı otomatik canlıya taşır."
    ],
    quiz: [
      { q: "Derleme ve test adımını yürüten servis hangisidir?", options: ["CodeBuild", "CodeDeploy", "CloudTrail", "Route 53"], answer: "CodeBuild", why: "buildspec.yml ile çalışır.", obj: "h1", whyNot: {"CodeDeploy":"CodeDeploy derlemeyi değil dağıtımı yapar.","CloudTrail":"CloudTrail API çağrılarını kaydeder; derleme çalıştırmaz.","Route 53":"Route 53 DNS servisidir."} },
      { q: "Yeni ortam kurup trafiği geçirerek hızlı geri dönüş sağlayan strateji hangisidir?", options: ["Blue/Green", "In-place", "Rolling", "Manuel"], answer: "Blue/Green", why: "Eski ortam hazır beklediği için geri dönüş hızlıdır.", obj: "h3", whyNot: {"In-place":"In-place mevcut örnekleri günceller; geri dönmek için eski sürümü yeniden dağıtmak gerekir.","Rolling":"Rolling örnekleri gruplar hâlinde günceller; eski ortam hazır beklemediği için geri dönüş yavaştır.","Manuel":"Manuel dağıtım bir strateji değildir ve hızlı geri dönüş garantisi vermez."} },
      { q: "Aşamaları bir araya getiren orkestratör hangisidir?", options: ["CodePipeline", "CodeBuild", "Cognito", "KMS"], answer: "CodePipeline", why: "Source, Build, Deploy aşamalarını bağlar.", obj: "h1", whyNot: {"CodeBuild":"CodeBuild derleyip test eder; aşamaları birleştiren orkestratör değildir.","Cognito":"Cognito kullanıcı kimliği yönetir.","KMS":"KMS şifreleme anahtarlarını yönetir."} },
      { q: "Lambda'da trafiği kademeli yeni sürüme kaydırmak için ne kullanılır?", options: ["Alias ve CodeDeploy canary/linear", "VPC peering", "Edge location", "Snowball"], answer: "Alias ve CodeDeploy canary/linear", why: "Alarm tetiklenirse otomatik geri alınır.", obj: "h4", whyNot: {"VPC peering":"VPC peering iki ağı birbirine bağlar; trafiği sürümlere kaydırmaz.","Edge location":"Edge location CloudFront içerik önbellek noktasıdır.","Snowball":"Snowball veriyi fiziksel cihazla taşır."} },
      { q: "Derleme tanım dosyasının adı nedir?", options: ["buildspec.yml", "appspec.json", "Dockerfile", "template.txt"], answer: "buildspec.yml", why: "CodeBuild bu dosyayı okur.", obj: "h2", whyNot: {"appspec.json":"appspec dosyası CodeDeploy'a aittir.","Dockerfile":"Dockerfile konteyner imajını tanımlar, CodeBuild derleme tanımı değildir.","template.txt":"template.txt geçerli bir CodeBuild tanım dosyası adı değildir."} },
      { q: "buildspec.yml dosyasında pytest gibi test komutları genellikle nereye yazılır?", options: ["phases altındaki build bölümünün commands listesine","artifacts.files listesine","Resources bölümüne","appspec hooks bölümüne"], answer: "phases altındaki build bölümünün commands listesine", why: "Derleme ve test komutları phases altında build fazının commands listesinde çalıştırılır.", obj: "h2", whyNot: {"artifacts.files listesine":"artifacts çıktı olarak saklanacak dosyaları belirtir, komut çalıştırmaz.","Resources bölümüne":"Resources CloudFormation şablonunun bölümüdür, buildspec'in değil.","appspec hooks bölümüne":"appspec CodeDeploy dosyasıdır; hooks dağıtım yaşam döngüsü içindir."} },
      { q: "Ek ortam kurmadan, örnekleri gruplar hâlinde güncelleyen dağıtım stratejisi hangisidir?", options: ["Rolling","Blue/Green","Canary","Manuel onay aşaması"], answer: "Rolling", why: "Rolling mevcut örnekleri gruplar hâlinde günceller; yeni ortam kurmadığı için ek maliyeti yoktur.", obj: "h3", whyNot: {"Blue/Green":"Blue/Green yeni bir ortam kurar ve ek maliyet getirir.","Canary":"Canary trafiğin küçük bir yüzdesini yeni sürüme gönderir (Lambda/ECS); örnek gruplarını güncellemez.","Manuel onay aşaması":"Onay aşaması pipeline'da insan kontrolü içindir, dağıtım stratejisi değildir."} }
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

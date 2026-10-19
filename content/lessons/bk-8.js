/* Backend / AWS · sabit dersler 39-42 (IAM/SCP, tespit ve koruma, VPC ağ tasarımı, hibrit bağlantı) · SAA-C03 kapsam genişletmesi (Tur 3) · ders eki: bk-ek-3.js, anahtarlar 38-41 */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).bk = (window.PP_LESSONS.bk || {}));
  var SAA = { title: "AWS Certified Solutions Architect – Associate", url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/", type: "doc", level: "orta", lang: "EN" };

  /* 39 ─────────────────────────────── IAM politika değerlendirmesi, Organizations ve SCP */
  L[39] = {
    hook: "Aynı politika bir hesapta çalışır, başka hesapta 'AccessDenied' verir; sır, hangi katmanın izni daralttığındadır.",
    homework: "Bir kullanıcıya tam S3 izni veren bir kimlik politikası, aynı kullanıcıya bir izin sınırı ve hesaba bağlı bir SCP düşün. Üçü farklı şeyler söylerse sonucu nasıl bulursun? Kâğıda bir karar sırası yaz.",
    warmup: {
      recap: [
        { point: "IAM'de varsayılan durum örtük reddir: izin yoksa erişim yoktur.", example: "Hiç politikası olmayan kullanıcı" },
        { point: "Kimlik tabanlı politika kullanıcıya ya da role, kaynak tabanlı politika kaynağa bağlanır.", example: "Kova politikası" }
      ],
      concepts: [
        { term: "Permissions boundary", tr: "İzin sınırı", summary: "Bir kullanıcı ya da rolün alabileceği en geniş yetkiyi çizer; kendisi izin vermez, yalnız izni kısar.", example: "Sınır yalnız S3 ve EC2 içerir" },
        { term: "Service control policy (SCP)", tr: "Hizmet kontrol politikası", summary: "Organizations'ta hesaplara ya da birimlere uygulanan yetki tavanı; izin vermez, verilebilecek izinleri sınırlar.", example: "İzinli bölgeler dışını reddeden SCP" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Şirketin onlarca AWS hesabı var. Güvenlik ekibi hiçbir hesapta denetim kaydının kapatılamamasını istiyor; ürün ekipleri ise kendi hesaplarında rol oluşturabilmek istiyor. Bunu hesap hesap gezip politika yazarak değil, Organizations, SCP ve izin sınırlarıyla kurarsın. Mimarın işi, 'bu istek neden reddedildi?' sorusunu politika katmanlarına bakarak cevaplamaktır." },
      { t: "steps", h: "Bir isteğin değerlendirilmesi", items: [
        "Başlangıç: her istek örtük olarak reddedilir.",
        "İlgili politikalardan herhangi birinde açık Deny varsa istek reddedilir; hiçbir Allow bunu geri çeviremez.",
        "Organizations kullanılıyorsa hesabın SCP'leri o eyleme izin verilebilir bırakmalıdır (yönetim hesabı bu kuralın dışındadır).",
        "İzin sınırı ya da oturum politikası varsa istenen eylem onların içinde de kalmalıdır.",
        "Sonunda kimlik tabanlı ya da kaynak tabanlı bir politika eylemi açıkça Allow etmelidir. Hepsinden geçen istek kabul edilir."
      ] },
      { t: "box", h: "Kesişim kuralı", text: "SCP, izin sınırı ve oturum politikası yetkiyi artırmaz, yalnız daraltır. Etkin yetki, kimlik politikasının verdiği izin ile bu üç sınırın kesişimidir. İzin sınırı 'her şeye izin' dese bile kullanıcıya ayrıca bir izin politikası gerekir; çünkü sınır bir tavandır, hediye değildir." },
      { t: "steps", h: "Kimlik tabanlı ve kaynak tabanlı politika", items: [
        "Aynı hesap: kimlik politikasının ya da kaynak politikasının Allow vermesi çoğu hizmette yeterlidir (açık Deny yoksa).",
        "Farklı hesap: çağıran tarafın kimlik politikası da, kaynağın hesabındaki kaynak politikası da izin vermelidir. Alternatif: kaynak hesabındaki bir rolü üstlenmek; o zaman istek o rolün yetkisiyle yapılır.",
        "Kaynak politikasında Principal alanı kimin erişebileceğini söyler; kimlik politikasında Principal yazılmaz.",
        "aws:PrincipalOrgID koşulu kaynağı tek tek hesap sayma zahmetinden kurtarır: 'organizasyonumdaki herkes' diyebilirsin."
      ] },
      { t: "cmd", lang: "json", text: "{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [{\n    \"Effect\": \"Allow\",\n    \"Principal\": \"*\",\n    \"Action\": \"s3:GetObject\",\n    \"Resource\": \"arn:aws:s3:::ornek-kova/*\",\n    \"Condition\": { \"StringEquals\": { \"aws:PrincipalOrgID\": \"o-ornek12345\" } }\n  }]\n}" },
      { t: "steps", h: "Organizations ve SCP", items: [
        "Organizations hesapları bir yönetim (management) hesabının altında toplar; hesaplar organizasyon birimlerine (OU) bölünür ve SCP'ler birime bağlanıp aşağı doğru kalıtılır.",
        "SCP kimseye izin vermez; hesapta verilebilecek izinlerin tavanını çizer. Hesaptaki kullanıcıya yine bir kimlik politikası gerekir.",
        "SCP üye hesabın kök (root) kullanıcısı dahil tüm kimliklerini sınırlar; yönetim hesabındaki kimlikleri sınırlamaz. Bu yüzden iş yükü yönetim hesabında çalıştırılmaz.",
        "Yaygın kalıplar: izinli bölgeler dışını reddet, denetim kaydını kapatmayı reddet, organizasyondan ayrılmayı reddet.",
        "Birleşik faturalama: tüm hesapların kullanımı tek faturada toplanır (maliyet dersinde ayrıntı).",
        "AWS Control Tower, çok hesaplı bir ortamı hazır koruma kurallarıyla kurmayı kolaylaştıran yönetilen bir çözümdür; ayrıntı için resmî belgeyi oku."
      ] },
      { t: "steps", h: "Yetki devri ve merkezi giriş", items: [
        "İzin sınırı yetki devrinde kullanılır: geliştiriciye rol oluşturma yetkisi verirken, oluşturduğu rollere belirli bir sınırı zorunlu kılan koşul koyarsan kendi yetkisinden fazlasını veremez.",
        "IAM Identity Center: çalışanların (ya da harici kimlik sağlayıcının) tek girişle birden çok hesaba ve uygulamaya rol bazlı erişmesi; kalıcı IAM kullanıcısı yerine geçici kimlik.",
        "Rol üstlenme (AssumeRole) ile hesaplar arası erişim: güven politikası kimin üstlenebileceğini söyler (36. derste STS)."
      ] },
      { t: "warn", h: "Tuzak", text: "SCP'nin izin verdiğini sanma: SCP'deki 'her şeye izin' ifadesi kullanıcıya erişim kazandırmaz. Bir de SCP'ye yanlış yazılmış bir Deny kendi yöneticilerini de kilitleyebilir; yeni SCP'yi önce küçük bir test birimine bağla." }
    ],
    objectives: [
      { id: "h1", text: "Bir isteğin örtük ret, açık ret ve izin katmanlarından nasıl geçtiğini yorumlayabilirsin." },
      { id: "h2", text: "SCP, izin sınırı ve oturum politikasının yetkiyi yalnız daralttığını, izin vermediğini açıklayabilirsin." },
      { id: "h3", text: "Aynı hesapta ve hesaplar arasında kimlik ve kaynak politikalarının nasıl birleştiğini ayırt edebilirsin." },
      { id: "h4", text: "Çok hesaplı bir yapıda Organizations, IAM Identity Center ve izin sınırını senaryoya göre seçebilirsin." }
    ],
    summary: [
      "İstek varsayılan olarak reddedilir; açık Deny hangi politikada olursa olsun her Allow'u geçersiz kılar.",
      "SCP, izin sınırı ve oturum politikası yetki vermez; etkin yetkiyi kimlik ya da kaynak politikasının izniyle kesişimde daraltır.",
      "Aynı hesapta kimlik veya kaynak politikasından biri yeterli olabilir; hesaplar arası erişimde iki taraf da izin vermelidir (ya da rol üstlenilir).",
      "SCP üye hesaptaki tüm kimlikleri, kök kullanıcı dahil, sınırlar; Organizations yönetim hesabını sınırlamaz.",
      "aws:PrincipalOrgID kaynağı organizasyon düzeyinde açar; IAM Identity Center merkezi giriş, izin sınırı güvenli yetki devri sağlar."
    ],
    quiz: [
      { id: "2010fce0", q: "Bir kullanıcının kimlik politikası s3:DeleteObject eylemine izin veriyor. Aynı hesaba bağlı SCP ise bu eylemi açıkça reddediyor. Kullanıcı bir nesneyi silmeyi denerse ne olur?", options: [
  "İstek reddedilir; açık ret her izni geçersiz kılar",
  "İstek kabul edilir; kimlik politikası SCP'den daha özeldir",
  "İstek kabul edilir, çünkü kullanıcı kendi hesabında çalışıyor",
  "Yalnızca kök kullanıcı için reddedilir, diğer kimlikler silebilir"
], obj: "h1" },
      { id: "d75892a4", q: "Bir hesapta SCP her eyleme izin veriyor. Hesaptaki yeni bir IAM kullanıcısına hiçbir politika bağlanmadı. Kullanıcı S3 kovalarını listeleyebilir mi?", options: [
  "Evet; SCP'deki geniş izin kullanıcıya geçer",
  "Evet, ama yalnızca okuma eylemleri için",
  "Hayır; SCP izin vermez, yalnız tavan çizer. Kullanıcıya ayrıca bir izin politikası gerekir",
  "Hayır, çünkü SCP yalnızca kök kullanıcıya uygulanır"
], obj: "h2" },
      { id: "4f127e66", q: "Bir kullanıcıya AdministratorAccess politikası bağlı, ama izin sınırı yalnızca S3 ve EC2 eylemlerine izin veriyor. Kullanıcı bir DynamoDB tablosu oluşturabilir mi?", options: [
  "Evet; AdministratorAccess her sınırı aşar",
  "Hayır; etkin yetki kimlik politikası ile sınırın kesişimidir ve DynamoDB sınırın dışındadır",
  "Evet; izin sınırı yalnızca konsol girişini etkiler",
  "Hayır, ama yalnızca kullanıcı bir gruba üye değilse"
], obj: "h2" },
      { id: "72f7a6af", q: "Aşağıdakilerden hangisi bir SCP'den etkilenmez?", options: [
  "Üye hesaptaki IAM rolleri",
  "Üye hesabın kök kullanıcısı",
  "Üye hesaptaki federe kullanıcılar",
  "Organizations yönetim (management) hesabındaki kimlikler"
], obj: "h2" },
      { id: "a71bb0c0", q: "Hesap A'daki bir rolün kimlik politikasında s3:GetObject izni var. Hesap B'deki kovanın politikasında ise hesap A'ya hiç izin verilmemiş. Rol doğrudan kovadan nesne okumayı denerse ne olur?", options: [
  "Kabul edilir; isteği yapanın kimlik politikası yeterlidir",
  "Kabul edilir, çünkü roller hesap sınırlarını aşabilir",
  "Reddedilir; hesaplar arası erişim yalnızca IAM kullanıcılarıyla yapılabilir",
  "Reddedilir; hesaplar arası erişimde kaynak tarafı da izin vermelidir"
], obj: "h3" },
      { id: "640f8df9", q: "Yüzlerce hesaplı bir organizasyonda, organizasyondaki herhangi bir hesabın okuyabileceği ama dışarıya kapalı bir kova istiyorsun. Yeni hesap eklendikçe kova politikasını güncellemek istemiyorsun. Ne yaparsın?", options: [
  "Her hesabın kök kullanıcısını Principal olarak tek tek yazarsın",
  "Kova politikasında aws:PrincipalOrgID koşulunu organizasyon kimliğiyle kullanırsın",
  "Kovayı herkese açıp erişimi yalnızca uygulama katmanında kısıtlarsın",
  "Her hesap için ayrı IAM kullanıcısı açıp erişim anahtarlarını dağıtırsın"
], obj: "h3" },
      { id: "2b1e96dd", q: "Bir şirket, çalışanların tek bir kurumsal oturumla birden çok AWS hesabına rol bazlı erişmesini ve kalıcı erişim anahtarı kullanmamasını istiyor. Hangi hizmet bu iş için tasarlanmıştır?", options: ["AWS Secrets Manager", "Amazon Cognito kimlik havuzu", "AWS IAM Identity Center", "Yalnızca AWS STS"], obj: "h4" },
      { id: "b89386f4", q: "Geliştiricilerin kendi uygulamaları için IAM rolü oluşturabilmesini, ancak oluşturdukları rollerin kendi yetkilerinden fazlasını alamamasını istiyorsun. Hangi yaklaşım uygundur?", options: [
  "Geliştiricilerin politikasına, yeni rollerde belirli bir izin sınırının zorunlu tutulması koşulunu eklemek",
  "Geliştiricilere IAM yönetici erişimi verip CloudTrail'i izlemek",
  "Rol oluşturmayı yalnızca kök kullanıcıya bırakmak",
  "Her role geniş bir kaynak tabanlı politika bağlamak"
], obj: "h4" }
    ],
    interview: [
      { q: "SCP ile izin sınırı arasındaki fark nedir?", a: "İkisi de izin vermez, yalnız tavan çizer. SCP Organizations'ta hesap ya da birim düzeyindedir ve hesaptaki tüm kimlikleri etkiler. İzin sınırı ise tek bir kullanıcı ya da role bağlanır." },
      { q: "Bir istek AccessDenied aldı. Hangi sırayla bakarsın?", a: "Önce açık bir Deny var mı diye bakarım (kimlik, kaynak, SCP). Sonra SCP, izin sınırı ve oturum politikasının eylemi dışarıda bırakıp bırakmadığına, en son da kimlik ya da kaynak politikasında Allow olup olmadığına bakarım." },
      { q: "Hesaplar arası erişimde neden iki taraf da izin vermelidir?", a: "Çünkü her hesap kendi kaynaklarının sahibidir. Çağıran hesap kimliğine izin verir, kaynağın hesabı da dışarıdan gelen bu kimliği kabul ettiğini söyler. Bir taraf eksikse istek reddedilir." }
    ],
    vocab: [
      { term: "Principal", tr: "asıl (erişen kimlik)", ex: "The principal is the caller." },
      { term: "Condition", tr: "koşul", ex: "Add a condition to the statement." },
      { term: "Guardrail", tr: "koruma korkuluğu", ex: "An SCP is a guardrail." },
      { term: "Delegation", tr: "yetki devri", ex: "Delegation needs a boundary." },
      { term: "Organizational unit", tr: "organizasyon birimi", ex: "Attach the policy to the OU." }
    ],
    resources: [
      { title: "IAM: Politika değerlendirme mantığı", url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html", type: "doc", why: "Katmanların nasıl birleştiğinin resmî anlatımı", level: "orta", lang: "EN" },
      { title: "Organizations: Hizmet kontrol politikaları", url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html", type: "doc", why: "SCP'nin tavan mantığı", level: "orta", lang: "EN" }
    ],
    sources: [SAA]
  };

  /* 40 ─────────────────────────────── Tespit ve koruma hizmetleri */
  L[40] = {
    hook: "Güvenlik duvarı kapıyı tutar; ama kapıdan girenin kim olduğunu, içeride ne yaptığını ve hangi dosyada neyin durduğunu başka hizmetler söyler.",
    homework: "Bir web uygulamasının önüne beş koruma ya da tespit hizmeti sıralayacaksın. Her biri için tek cümleyle 'şunu görür / şunu engeller' yaz ve hangisinin engellediğini, hangisinin yalnızca uyardığını işaretle.",
    warmup: {
      recap: [
        { point: "Güvenlik grubu ve NACL ağ katmanında (3. ve 4. katman) trafiği süzer.", example: "Port 443'e izin ver" },
        { point: "CloudTrail hesaptaki API çağrılarını kaydeder.", example: "Kim kovayı sildi?" }
      ],
      concepts: [
        { term: "AWS WAF", tr: "Web uygulaması güvenlik duvarı", summary: "HTTP isteklerini 7. katmanda kurallarla süzer: SQL enjeksiyonu, XSS, hız sınırı, IP listesi.", example: "Giriş sayfasına dakikada çok istek atanı engelle" },
        { term: "Amazon GuardDuty", tr: "Tehdit tespit hizmeti", summary: "CloudTrail, VPC akış ve DNS kayıtlarını inceleyip şüpheli davranışı bulgu olarak bildirir; ajan kurmak gerekmez.", example: "Ele geçirilmiş EC2'nin kötü niyetli adrese bağlanması" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Bir e-ticaret sitesi hem giriş sayfasına kaba kuvvet denemeleri hem de bir gün trafik seli yaşıyor. Güvenlik ekibi ayrıca S3'te kimsenin bilmediği müşteri kimlik bilgileri bulunup bulunmadığını ve sunucuların bilinen açıklarla çalışıp çalışmadığını bilmek istiyor. Her sorunun ayrı bir hizmeti vardır; mimar doğru olanı seçer." },
      { t: "steps", h: "Engelleyenler", items: [
        "AWS WAF: CloudFront, ALB, API Gateway gibi uçlara bağlanan web ACL'dir. Yönetilen kural gruplarıyla yaygın saldırıları (SQL enjeksiyonu, XSS) engeller; hız tabanlı kuralla tek kaynaktan gelen aşırı isteği sınırlar; IP ve ülke kurallarıyla trafiği süzer.",
        "AWS Shield: DDoS korumasıdır. Standard sürümü tüm müşterilere otomatik gelir ve 3. ve 4. katman saldırılarına karşı temel koruma verir. Advanced sürümü ücretlidir; gelişmiş algılama, saldırı sırasında uzman desteği ve saldırı kaynaklı maliyet koruması sunar (kapsam ve fiyat için resmî belgeyi oku).",
        "AWS Network Firewall: VPC içinde durumlu süzme ve izinsiz giriş önleme yapan yönetilen ağ güvenlik duvarıdır; VPC düzeyinde derin trafik denetimi gerektiğinde kullanılır.",
        "AWS Firewall Manager: WAF kurallarını, Shield korumasını ve güvenlik gruplarını organizasyondaki birçok hesaba merkezden uygular ve uyumsuzluğu gösterir."
      ] },
      { t: "steps", h: "Tespit edenler", items: [
        "Amazon GuardDuty: CloudTrail olayları, VPC akış kayıtları ve DNS sorgularını inceleyerek tehdit bulgusu üretir. Ajan kurulumu gerekmez; engellemez, bulgu verir ve genelde olay müdahale otomasyonunu tetikler.",
        "Amazon Inspector: EC2 örneklerini, ECR konteyner imajlarını ve Lambda fonksiyonlarını bilinen yazılım açıkları (CVE) için sürekli tarar.",
        "Amazon Macie: S3'te kişisel veri gibi hassas içeriği makine öğrenmesi ve desenlerle bulur; yanlış açılmış kovaları da raporlar.",
        "AWS Config: kaynakların yapılandırma geçmişini tutar ve kurallarla değerlendirir. Örneğin 'hiçbir güvenlik grubu 22 numaralı portu herkese açmasın' kuralına uymayan kaynakları listeler.",
        "AWS Security Hub: GuardDuty, Inspector, Macie ve diğer kaynaklardan gelen bulguları tek yerde toplar ve güvenlik standartlarına göre kontroller çalıştırır."
      ] },
      { t: "box", h: "Hangi soru, hangi hizmet?", text: "'Bu HTTP isteği saldırı mı?' WAF. 'Hacim saldırısı var mı?' Shield. 'Hesabımda şüpheli davranış var mı?' GuardDuty. 'Sunucum bilinen açık taşıyor mu?' Inspector. 'S3'te hassas veri var mı?' Macie. 'Kaynağım kurala uygun mu, geçmişte ne değişti?' Config. 'Hepsini tek ekranda görebilir miyim?' Security Hub." },
      { t: "steps", h: "Katmanlı savunma örneği", items: [
        "Kenar: Shield ve WAF, CloudFront ya da ALB önünde saldırıyı uygulamaya ulaşmadan keser.",
        "Ağ: VPC içinde özel alt ağ, güvenlik grubu ve gerekirse Network Firewall.",
        "Veri: KMS ile şifreleme, Macie ile hassas veri keşfi.",
        "Sürekli tespit: GuardDuty, Inspector ve Config bulgularını Security Hub'da topla; EventBridge ile müdahale otomasyonuna bağla.",
        "Organizasyon: Firewall Manager ve SCP ile aynı koruma tüm hesaplarda yaygınlaşır."
      ] },
      { t: "warn", h: "Tuzak", text: "Tespit hizmetlerini koruma sanmak. GuardDuty, Inspector ve Macie bulgu üretir, trafiği kendileri kesmez; engelleme için WAF, güvenlik grubu ya da otomatik müdahale kurman gerekir. Ayrıca hizmetlerin ücretsiz deneme süresi ve fiyatı değişebilir; güncel bilgiyi resmî belgeden doğrula." }
    ],
    objectives: [
      { id: "h1", text: "WAF, Shield ve Network Firewall'u koruduğu katmana göre ayırt edebilirsin." },
      { id: "h2", text: "GuardDuty, Inspector ve Macie'nin neyi incelediğini ve engellemek yerine bulgu ürettiklerini açıklayabilirsin." },
      { id: "h3", text: "Config ve Security Hub'ın rolünü (yapılandırma uyumu ve bulgu toplama) senaryoda seçebilirsin." },
      { id: "h4", text: "Bir tehdit ya da risk tarifini doğru güvenlik hizmetiyle eşleştirebilirsin." }
    ],
    summary: [
      "WAF 7. katmanda HTTP isteklerini kurallarla süzer; Shield DDoS'a karşı korur; Network Firewall VPC içinde derin trafik denetimi yapar.",
      "GuardDuty hesap ve ağ kayıtlarından tehdit bulgusu üretir; ajan gerektirmez ve kendisi engellemez.",
      "Inspector yazılım açıklarını, Macie S3'teki hassas veriyi bulur; ikisi de bulgu verir.",
      "Config kaynak yapılandırmasını kayda alıp kurallara karşı değerlendirir; Security Hub bulguları tek yerde toplar.",
      "Firewall Manager ve SCP ile koruma tüm hesaplara merkezden uygulanır; bulgular EventBridge ile otomatik müdahaleye bağlanabilir."
    ],
    quiz: [
      { id: "731019f0", q: "Bir ALB'nin arkasındaki web uygulaması SQL enjeksiyonu ve XSS denemeleri alıyor. Bu istekleri uygulamaya ulaşmadan engellemek için hangi hizmet kullanılır?", options: ["Amazon GuardDuty", "AWS WAF", "Amazon Macie", "AWS Config"], obj: "h1" },
      { id: "cccbb60c", q: "Tüm AWS müşterilerine otomatik olarak gelen, 3. ve 4. katman DDoS saldırılarına karşı temel koruma sağlayan hizmet hangisidir?", options: [
  "AWS Shield Advanced yalnızca ücretli planlarda",
  "AWS Firewall Manager",
  "Amazon Inspector",
  "AWS Shield Standard"
], obj: "h1" },
      { id: "d8b04fe7", q: "Ele geçirilmiş olabilecek bir EC2 örneğinin bilinen kötü niyetli bir adrese DNS sorgusu attığını, ajan kurmadan tespit etmek istiyorsun. Hangi hizmet bunu yapar?", options: ["Amazon GuardDuty", "Amazon Inspector", "AWS WAF", "Amazon Macie"], obj: "h2" },
      { id: "15c808ab", q: "S3 kovalarında kişisel veri gibi hassas içeriğin bulunup bulunmadığını otomatik taramak ve yanlış açılmış kovaları raporlamak istiyorsun. Hangi hizmet kullanılır?", options: ["Amazon Inspector", "AWS Shield Advanced", "Amazon Macie", "AWS Network Firewall"], obj: "h2" },
      { id: "aaaac9ae", q: "Sunucuların ve konteyner imajlarının bilinen yazılım açıklarını (CVE) sürekli taratmak istiyorsun. Hangi hizmet uygundur?", options: ["Amazon Inspector", "Amazon GuardDuty", "AWS Config", "AWS CloudTrail"], obj: "h2" },
      { id: "1a56d144", q: "Güvenlik ekibi, 'hiçbir güvenlik grubu 22 numaralı portu herkese (0.0.0.0/0) açmasın' kuralına uymayan kaynakları listelemek ve yapılandırma geçmişini görmek istiyor. Hangi hizmet kullanılır?", options: ["Amazon GuardDuty", "AWS WAF", "AWS Config", "Amazon Macie"], obj: "h3" },
      { id: "a52aea64", q: "GuardDuty, Inspector ve Macie bulgularını tek bir ekranda toplamak ve güvenlik standartlarına göre kontrolleri çalıştırmak için hangi hizmet kullanılır?", options: ["AWS CloudFormation", "Amazon Route 53", "AWS Systems Manager Parameter Store", "AWS Security Hub"], obj: "h3" },
      { id: "a3c3a832", q: "Organizasyonundaki onlarca hesapta aynı WAF kurallarını ve güvenlik grubu politikasını merkezden uygulamak ve uyumsuz hesapları görmek istiyorsun. Hangi hizmet bu iş içindir?", options: ["Amazon GuardDuty", "AWS Firewall Manager", "AWS Shield Standard", "Amazon Macie"], obj: "h4" }
    ],
    interview: [
      { q: "WAF ile güvenlik grubu arasındaki fark nedir?", a: "Güvenlik grubu ağ katmanında IP, port ve protokole göre izin verir. WAF ise HTTP isteğinin içeriğine bakar; SQL enjeksiyonu, XSS ve hız sınırı gibi uygulama katmanı kurallarını uygular." },
      { q: "GuardDuty bir şey bulduğunda ne olur, kendisi engeller mi?", a: "Hayır, bulgu üretir. Bulguyu EventBridge ile bir Lambda'ya ya da bildirime bağlayıp otomatik müdahale kurarsın. Engelleme için ayrıca WAF, güvenlik grubu ya da yetki kısıtlaması gerekir." },
      { q: "Config ile CloudTrail birbirinin yerine geçer mi?", a: "Hayır. CloudTrail 'kim, hangi API çağrısını yaptı' sorusunu cevaplar. Config ise 'kaynağın yapılandırması neydi, şimdi neye dönüştü ve kurala uyuyor mu' sorusunu cevaplar." }
    ],
    vocab: [
      { term: "Web ACL", tr: "web erişim kontrol listesi (WAF)", ex: "Attach the web ACL to the load balancer." },
      { term: "Finding", tr: "bulgu", ex: "GuardDuty created a finding." },
      { term: "Vulnerability", tr: "zafiyet", ex: "Scan for known vulnerabilities." },
      { term: "Compliance", tr: "uyum", ex: "Check compliance with the rule." },
      { term: "DDoS", tr: "dağıtık hizmet engelleme saldırısı", ex: "Shield protects against DDoS." }
    ],
    resources: [
      { title: "AWS WAF Geliştirici Kılavuzu", url: "https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html", type: "doc", why: "Web ACL ve kural kavramları", level: "orta", lang: "EN" },
      { title: "Amazon GuardDuty Kullanıcı Kılavuzu", url: "https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html", type: "doc", why: "Tehdit tespiti ve bulgular", level: "orta", lang: "EN" }
    ],
    sources: [SAA]
  };

  /* 41 ─────────────────────────────── VPC ağ tasarımı: NAT, endpoint ve Transit Gateway */
  L[41] = {
    hook: "Özel ağ kurmak kolay; hangi kaynağın internete, hangi servise ve hangi diğer ağa, hangi yoldan çıkacağına karar vermek mimarlıktır.",
    homework: "İki AZ'li bir VPC çiz. Özel alt ağdaki uygulamanın internetten paket indirmesi, S3'e erişmesi ve başka bir VPC'deki bir servise ulaşması için hangi bileşenleri koyacağını yaz. Her bileşenin yanına tek bir AZ'ye mi bağlı olduğunu, yoksa bölge geneli mi olduğunu işaretle.",
    warmup: {
      recap: [
        { point: "Public alt ağın yönlendirme tablosunda Internet Gateway'e giden rota vardır; private'ta yoktur.", example: "0.0.0.0/0 → IGW" },
        { point: "Güvenlik grubu durumludur ve yalnız izin kuralı içerir; NACL durumsuzdur.", example: "Giriş 443, kaynak ALB" }
      ],
      concepts: [
        { term: "VPC endpoint", tr: "VPC uç noktası", summary: "VPC'deki kaynakların bir AWS servisine internete çıkmadan, AWS'nin özel ağı üzerinden erişmesini sağlar. İki türü vardır: gateway ve interface.", example: "S3 gateway endpoint" },
        { term: "Transit Gateway", tr: "Aktarım ağ geçidi", summary: "Çok sayıda VPC'yi ve şirket içi ağı merkezi bir yönlendirici üzerinden birbirine bağlar; geçişli yönlendirme sağlar.", example: "Yüz VPC tek merkeze bağlanır" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Özel alt ağdaki uygulama sunucuları yama indirmek için internete çıkmak zorunda, ama dışarıdan içeri bağlantı kabul etmemeli. Uygulama S3'e her gün terabaytlarca veri yazıyor ve fatura beklenenden yüksek. Başka bir ekip kendi servisini senin ağındaki on servise bağlamak istiyor. Her ihtiyacın ayrı bir ağ bileşeni vardır." },
      { t: "steps", h: "İnternete çıkış", items: [
        "Internet Gateway (IGW): VPC ile internet arasındaki yatayda ölçeklenen, yönetilen çift yönlü kapıdır. Kaynağın genel IP'si de olmalıdır.",
        "NAT Gateway: özel alt ağdaki kaynakların internete çıkmasını, ama dışarıdan içeri bağlantı kabul etmemesini sağlar. Public alt ağda durur ve Elastic IP kullanır.",
        "NAT Gateway tek bir AZ içinde yaşar. Dayanıklı tasarımda her AZ'ye bir NAT Gateway konur ve her özel alt ağ kendi AZ'sindeki NAT'a yönlendirilir; böylece bir AZ çökerse diğeri çıkış yapabilir. Ek AZ trafiği masrafını da düşürür.",
        "Egress-only Internet Gateway: IPv6 için aynı fikir; özel IPv6 kaynakları dışarı çıkar, dışarıdan içeri başlatılan bağlantı kabul edilmez (IPv6'da NAT yoktur)."
      ] },
      { t: "steps", h: "AWS servislerine özel erişim", items: [
        "Gateway endpoint: yalnızca S3 ve DynamoDB için. Yönlendirme tablosuna bir kural eklenir; ek ücret yoktur. Trafik NAT'a uğramaz, internete çıkmaz.",
        "Interface endpoint (AWS PrivateLink): alt ağınızda özel bir ağ arayüzü (ENI) açar ve birçok AWS servisine ya da başka bir hesaptaki servise bu arayüzden erişirsin. Saatlik ve veri işleme ücreti vardır (güncel fiyat için resmî belgeyi oku).",
        "PrivateLink ile kendi servisini de sunabilirsin: sağlayıcı NLB'nin önüne bir endpoint servisi koyar, tüketiciler kendi VPC'lerinde endpoint açar. Yalnız o servise tek yönlü erişim verilir; CIDR çakışması sorun olmaz, tüm ağı açmaz."
      ] },
      { t: "steps", h: "VPC'leri birbirine bağlamak", items: [
        "VPC peering: iki VPC arasında birebir özel bağlantı. Geçişli (transitive) değildir: A-B ve B-C eşleşmesi A'nın C'ye ulaşmasını sağlamaz. CIDR aralıkları çakışmamalıdır.",
        "Transit Gateway: çok sayıda VPC, VPN ve Direct Connect bağlantısını merkezde toplar; yönlendirme tabloları ile geçişli bağlantı sağlar. VPC sayısı arttıkça birebir peering ağı karmaşıklaşır; Transit Gateway bunu sadeleştirir.",
        "PrivateLink: yalnız bir servisi paylaşmak için; peering ve Transit Gateway ise ağları bağlamak içindir."
      ] },
      { t: "box", h: "Hangi araç, hangi senaryo?", text: "Özel kaynak internetten yama indirecek: NAT Gateway. Özel kaynak S3 ya da DynamoDB'ye gidecek: gateway endpoint. Özel kaynak başka bir AWS servisine ya da tedarikçi servisine gidecek: interface endpoint. İki VPC tam bağlı olacak: peering. Çok VPC ve şirket ağı merkezde buluşacak: Transit Gateway. Tek servis paylaşılacak: PrivateLink." },
      { t: "steps", h: "Görünürlük ve güvenlik", items: [
        "VPC Flow Logs: ağ arayüzü, alt ağ ya da VPC düzeyinde IP trafiğinin meta verisini (kaynak, hedef, port, kabul/ret) kaydeder; paket içeriğini kaydetmez. CloudWatch Logs ya da S3'e yazılır. Reddedilen trafiği bulmak için kullanılır.",
        "Güvenlik grubu ve NACL: grup durumlu ve yalnız izin içerir; NACL durumsuzdur, izin ve ret kuralı içerir, kural numarasına göre değerlendirilir.",
        "Sunucuya erişim için bastion yerine Systems Manager Session Manager tercih edilir: açık SSH portu gerekmez, oturumlar kayıt altına alınır."
      ] },
      { t: "warn", h: "Tuzak", text: "Tüm özel alt ağları tek NAT Gateway'e yönlendirmek: o AZ çökerse diğer AZ'lerin çıkışı da gider. S3 ve DynamoDB trafiğini NAT üzerinden geçirmek ise gereksiz veri işleme masrafı yaratır; gateway endpoint kullan. Sınır ve fiyatlar için resmî belgeden doğrula." }
    ],
    objectives: [
      { id: "h1", text: "NAT Gateway'in rolünü, AZ'ye bağlı olduğunu ve dayanıklı yerleşimini açıklayabilirsin." },
      { id: "h2", text: "Gateway endpoint, interface endpoint ve PrivateLink'i senaryoya göre ayırt edebilirsin." },
      { id: "h3", text: "VPC peering, Transit Gateway ve PrivateLink arasından bağlantı ihtiyacına uygun olanı seçebilirsin." },
      { id: "h4", text: "Flow Logs, güvenlik grubu, NACL ve egress-only gateway'in hangi sorunu çözdüğünü eşleştirebilirsin." }
    ],
    summary: [
      "NAT Gateway özel kaynakların internete çıkmasını sağlar, public alt ağda durur ve tek AZ'ye bağlıdır; dayanıklılık için AZ başına bir tane konur.",
      "Gateway endpoint yalnız S3 ve DynamoDB içindir ve yönlendirme tablosuyla çalışır; interface endpoint (PrivateLink) ENI ile birçok servise erişim sağlar.",
      "PrivateLink bir servisi tek yönlü paylaşır; VPC peering iki ağı bağlar ama geçişli değildir; Transit Gateway çok ağı merkezde birleştirir.",
      "IPv6'da NAT yerine egress-only Internet Gateway kullanılır.",
      "Flow Logs ağ trafiğinin meta verisini kaydeder (içeriği değil); reddedilen trafiği bulmakta işe yarar."
    ],
    quiz: [
      { id: "b6d0dcda", q: "Özel alt ağdaki uygulama sunucularının işletim sistemi yamalarını internetten indirmesi, ama dışarıdan içeri bağlantı kabul etmemesi isteniyor. Hangi bileşen kullanılır?", options: [
  "Özel alt ağın yönlendirme tablosuna doğrudan Internet Gateway rotası",
  "Her sunucuya genel IP verip güvenlik grubunu kapatmak",
  "Public alt ağda bir NAT Gateway",
  "Yalnızca bir VPC peering bağlantısı"
], obj: "h1" },
      { id: "349f15bc", q: "İki AZ'de çalışan bir uygulamada, bir AZ çöktüğünde diğer AZ'deki özel kaynakların internet çıkışının sürmesi isteniyor. NAT Gateway yerleşimi nasıl olmalı?", options: [
  "Her AZ'ye bir NAT Gateway konur ve her özel alt ağ kendi AZ'sindeki NAT'a yönlenir",
  "Tek bir NAT Gateway kurulur; AZ'lere yayılması AWS tarafından yapılır",
  "Yalnızca ikinci AZ'ye bir NAT Gateway konur",
  "NAT yerine her sunucuya Elastic IP bağlanır"
], obj: "h1" },
      { id: "d11b13db", q: "Özel alt ağdaki kaynaklar S3'e çok büyük veri yazıyor ve NAT Gateway veri işleme masrafı yükseliyor. Trafiği internete çıkarmadan ve ek hizmet masrafı olmadan S3'e taşımak için ne yapılmalı?", options: [
  "S3 için interface endpoint açıp saatlik ücret ödemek",
  "S3 için bir gateway endpoint eklemek ve yönlendirme tablosunu güncellemek",
  "Daha büyük bir NAT Gateway kurmak",
  "Kovayı herkese açıp internetten yazmak"
], obj: "h2" },
      { id: "25fa5252", q: "Bir tedarikçi, kendi servisini senin VPC'ndeki yüzlerce müşteriye sunmak istiyor. Müşteri ağlarının tamamını açmadan yalnızca o servise tek yönlü erişim verilecek ve CIDR aralıkları çakışabilecek. Hangi çözüm uygundur?", options: [
  "Her müşteriyle ayrı VPC peering kurmak",
  "Servisi Internet Gateway ile herkese açmak",
  "Tüm müşterileri tek bir güvenlik grubuna almak",
  "AWS PrivateLink ile NLB'nin arkasında bir endpoint servisi"
], obj: "h2" },
      { id: "68ba0dce", q: "VPC A, VPC B ile; VPC B de VPC C ile peering yapmış. VPC A'daki bir sunucu VPC C'deki sunucuya ulaşabilir mi?", options: [
  "Evet, B üzerinden otomatik yönlendirilir",
  "Hayır; peering geçişli değildir. A ile C için ayrı peering ya da Transit Gateway gerekir",
  "Evet, ama yalnızca güvenlik grupları izin verirse",
  "Hayır, ancak VPC'ler aynı AZ'de ise"
], obj: "h3" },
      { id: "4e070d7b", q: "Onlarca VPC ve şirket içi bir ağ, merkezi bir yönlendirme noktasında buluşacak. Peering ağı ise yönetilemeyecek kadar karmaşık olurdu. Hangi hizmet bu işe uygundur?", options: ["Amazon CloudFront", "Egress-only Internet Gateway", "VPC Flow Logs", "AWS Transit Gateway"], obj: "h3" },
      { id: "2a938f8f", q: "Bir özel alt ağdaki ağ arayüzüne gelen ve reddedilen bağlantı denemelerinin hangi kaynak IP'lerden geldiğini incelemek istiyorsun. Hangi özellik kullanılır?", options: ["VPC Flow Logs", "Route 53 sağlık denetimi", "AWS KMS anahtar politikası", "S3 Intelligent-Tiering"], obj: "h4" },
      { id: "f2afa3f6", q: "IPv6 kullanan özel alt ağdaki kaynakların internete çıkmasını, ama dışarıdan içeri başlatılan bağlantıları kabul etmemesini istiyorsun. Hangi bileşen kullanılır?", options: ["Public alt ağda NAT Gateway", "Gateway endpoint", "Egress-only Internet Gateway", "Transit Gateway"], obj: "h4" }
    ],
    interview: [
      { q: "Gateway endpoint ile interface endpoint arasındaki fark nedir?", a: "Gateway endpoint yalnız S3 ve DynamoDB içindir, yönlendirme tablosu kuralıyla çalışır ve ek ücreti yoktur. Interface endpoint alt ağda bir ENI açar, birçok servisi destekler ve PrivateLink ile çalışır; saatlik ve veri ücreti vardır." },
      { q: "Çok sayıda VPC'yi bağlarken neden Transit Gateway tercih edilir?", a: "Peering geçişli değildir ve her çift için ayrı bağlantı gerekir. VPC sayısı arttıkça bağlantı sayısı hızla artar. Transit Gateway tek merkezde toplar ve geçişli yönlendirme sağlar." },
      { q: "NAT Gateway neden AZ başına konur?", a: "NAT Gateway tek bir AZ'de yaşar. Tek NAT olursa o AZ çöktüğünde diğer AZ'lerin internet çıkışı da kesilir. AZ başına bir NAT, dayanıklılığı ve AZ arası trafik masrafını iyileştirir." }
    ],
    vocab: [
      { term: "NAT gateway", tr: "ağ adresi çevirme geçidi", ex: "Place the NAT gateway in a public subnet." },
      { term: "Endpoint", tr: "uç nokta", ex: "Create a VPC endpoint for S3." },
      { term: "Peering", tr: "eşleştirme", ex: "VPC peering is not transitive." },
      { term: "Transitive", tr: "geçişli", ex: "Transit Gateway is transitive." },
      { term: "Flow log", tr: "akış kaydı", ex: "Enable flow logs on the subnet." }
    ],
    resources: [
      { title: "NAT gateway belgeleri", url: "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html", type: "doc", why: "NAT Gateway kavramı ve yerleşimi", level: "orta", lang: "EN" },
      { title: "AWS PrivateLink nedir", url: "https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html", type: "doc", why: "Endpoint ve servis paylaşımı", level: "orta", lang: "EN" }
    ],
    sources: [SAA]
  };

  /* 42 ─────────────────────────────── Hibrit bağlantı ve veri aktarımı */
  L[42] = {
    hook: "Şirketin verisi hâlâ kendi veri merkezinde ve internet bağlantısı o veriyi aylarca taşıyamayacak kadar yavaş. Buluta nasıl ve hangi yoldan geçilir?",
    homework: "Şirket içi bir veri merkezini AWS'ye bağlayacaksın. 'Birkaç gün içinde şifreli bağlantı lazım', 'her gün tutarlı gecikme lazım' ve 'çok büyük arşivi bir kerede taşımamız lazım' ihtiyaçlarından her birine bir araç seç ve gerekçesini tek cümleyle yaz.",
    warmup: {
      recap: [
        { point: "VPN iki ağ arasında şifreli tünel kurar; internet üzerinden gidebilir.", example: "Şube ↔ merkez" },
        { point: "S3 nesne depolamadır; dosya sunucusu gibi doğrudan bağlanmaz.", example: "Kova ve nesne" }
      ],
      concepts: [
        { term: "AWS Direct Connect", tr: "Özel ağ bağlantısı", summary: "Şirket ağını AWS'ye internete çıkmadan, ayrılmış özel bir hat üzerinden bağlar; gecikme tutarlıdır ve bant genişliği yüksektir.", example: "Veri merkezi ↔ AWS bölgesi" },
        { term: "AWS DataSync", tr: "Veri eşitleme hizmeti", summary: "Şirket içi dosya paylaşımlarından ya da başka depolardan S3, EFS ve FSx'e verileri hızlandırılmış ve doğrulamalı biçimde taşır; zamanlanabilir.", example: "Her gece NFS → S3" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Bir üretim şirketi uygulamalarının bir kısmını AWS'ye taşırken eski sistemlerini veri merkezinde tutuyor. Bunlar sürekli konuşmak zorunda. Ayrıca yüzlerce terabaytlık arşiv S3'e taşınacak. Bağlantı yolunu ve veri taşıma yöntemini seçmek mimarın en sık sorulan kararlarındandır." },
      { t: "steps", h: "Şirket ağını AWS'ye bağlamak", items: [
        "Site-to-Site VPN: internet üzerinden IPsec tüneli. Hızla (birkaç gün, çoğu zaman saatler içinde) kurulur, şifrelidir, ama gecikme ve verim internetin durumuna bağlıdır. Dayanıklılık için bağlantı iki tünelle gelir.",
        "Direct Connect: bir Direct Connect konumundaki ayrılmış fiziksel hat. Gecikme tutarlıdır, verim yüksektir; ama sipariş ve kurulum haftalar sürebilir. Varsayılan olarak şifreli değildir: gizlilik için üstüne VPN ya da hat şifrelemesi eklenir.",
        "Dayanıklı tasarım: kritik bağlantılarda farklı konumlarda birden çok Direct Connect hattı, yedek olarak da Site-to-Site VPN kurulur. Direct Connect düşünce trafik VPN'e geçer.",
        "Client VPN: tek tek çalışanların cihazlarını VPC'ye bağlayan yönetilen uzaktan erişim VPN'idir; ağdan ağa bağlantı değildir.",
        "Birden çok VPC ve şirket ağı varsa hepsi Transit Gateway üzerinde toplanır (önceki derste)."
      ] },
      { t: "steps", h: "Veriyi buluta taşımak", items: [
        "DataSync: çevrimiçi, ağ üzerinden, zamanlanabilir ve doğrulamalı taşıma. Şirket içi NFS/SMB paylaşımlarından S3, EFS ve FSx'e sürekli eşitleme için uygundur.",
        "Snow ailesi (Snowball gibi): fiziksel cihaz postayla gelir, veriyi içine kopyalarsın, geri gönderirsin, AWS S3'e yükler. Çok büyük veri ve düşük ya da pahalı bant genişliği için; uzak yerlerde bağlantısız çalışma (uç işlem) için de kullanılır. Hangi cihazların güncel sunulduğu için resmî belgeye bak.",
        "Storage Gateway: şirket içi uygulamaların bulut depolamayı yerel depolama gibi kullanmasını sağlayan hibrit ağ geçididir. Dosya (S3 File Gateway), birim (Volume Gateway) ve bant (Tape Gateway) arayüzleri vardır; yerel önbellek tutar.",
        "AWS Transfer Family: SFTP, FTPS ve FTP protokolleriyle doğrudan S3 ya da EFS'ye dosya aktarımı; sunucu yönetimi yok, ortaklar mevcut istemcilerini kullanır.",
        "S3 Transfer Acceleration: uzak istemcilerin S3'e yükleme hızını kenar konumları üzerinden artırır."
      ] },
      { t: "steps", h: "Veritabanı taşımak", items: [
        "AWS Database Migration Service (DMS): kaynak veritabanı çalışırken hedefe sürekli değişiklik kopyalar; kesinti süresini en aza indirir. Aynı motorlar arasında ya da farklı motorlar arasında çalışır.",
        "AWS Schema Conversion Tool (SCT): motor değişirken (ör. ticari bir motordan PostgreSQL uyumluya) şemayı ve kodu dönüştürmeye yardım eder."
      ] },
      { t: "box", h: "Hangi araç, hangi ihtiyaç?", text: "Hızlı ve şifreli ağ bağlantısı: Site-to-Site VPN. Tutarlı gecikme ve yüksek verim: Direct Connect (yedeği VPN). Süregelen dosya eşitleme: DataSync. Çok büyük, bir defalık veri: Snow cihazı. Yerel uygulama bulut depolamayı yerel gibi görecek: Storage Gateway. Ortaklara SFTP: Transfer Family. Veritabanı geçişi: DMS (ve gerekirse SCT)." },
      { t: "warn", h: "Tuzak", text: "Direct Connect'i 'otomatik şifreli' sanmak. Hat özel olsa da trafik varsayılan olarak şifrelenmez; gizlilik gereksinimi varsa VPN ya da hat şifrelemesi eklenmelidir. Ayrıca Direct Connect siparişinin kurulum süresi vardır; acil ihtiyaç için ilk adım VPN olabilir. Fiyat ve süre için resmî belgeden doğrula." }
    ],
    objectives: [
      { id: "h1", text: "Site-to-Site VPN, Direct Connect ve Client VPN'i ihtiyaca göre ayırt edebilirsin." },
      { id: "h2", text: "Direct Connect'in şifreleme ve dayanıklılık yönlerini (yedek VPN, çoklu konum) açıklayabilirsin." },
      { id: "h3", text: "DataSync, Snow ailesi, Storage Gateway ve Transfer Family'yi veri taşıma senaryosuna göre seçebilirsin." },
      { id: "h4", text: "DMS ve SCT'nin veritabanı geçişindeki rolünü ayırt edebilirsin." }
    ],
    summary: [
      "Site-to-Site VPN internet üzerinden şifreli ve hızlı kurulur; Direct Connect tutarlı gecikme ve yüksek verim için ayrılmış hattır ama kurulumu uzun sürer ve varsayılan olarak şifrelemez.",
      "Kritik hibrit bağlantıda iki konumlu Direct Connect ve yedek VPN kullanılır.",
      "DataSync çevrimiçi ve zamanlanabilir dosya eşitleme yapar; Snow cihazları çok büyük ya da bağlantısı zayıf yerlerdeki veri için fiziksel taşıma sağlar.",
      "Storage Gateway yerel uygulamalara önbellekli bulut depolama sunar; Transfer Family ortakların SFTP/FTPS/FTP ile S3'e doğrudan dosya yüklemesini sağlar.",
      "DMS veritabanını çalışırken sürekli kopyalar; farklı motora geçişte SCT şemayı dönüştürür."
    ],
    quiz: [
      { id: "f85289bb", q: "Bir şirket, veri merkeziyle AWS arasında şifreli bir bağlantıyı birkaç gün içinde kurmak istiyor. İnternet üzerinden gitmesi kabul edilebilir. Hangi seçenek uygundur?", options: [
  "AWS Direct Connect, yeni bir hat siparişiyle",
  "AWS Snowball Edge cihazı",
  "Amazon CloudFront",
  "AWS Site-to-Site VPN"
], obj: "h1" },
      { id: "3ed9d3a8", q: "Bir şirket, veri merkezi ile AWS arasında tutarlı gecikmeli, yüksek verimli özel bir bağlantı istiyor. Hangi hizmet uygundur?", options: ["AWS Direct Connect", "Yalnızca bir Site-to-Site VPN", "Amazon Route 53", "AWS Transfer Family"], obj: "h1" },
      { id: "da75fae7", q: "Direct Connect bağlantısı arızalanırsa iş sürekliliği için en uygun ek önlem aşağıdakilerden hangisidir?", options: [
  "Hatta daha yüksek bant genişliği sipariş etmek",
  "Güvenlik grubu kurallarını gevşetmek",
  "Aynı VPC'ye giden bir Site-to-Site VPN'i yedek yol olarak kurmak",
  "Aynı hatta ikinci bir sanal arayüz açmak"
], obj: "h2" },
      { id: "d569dde3", q: "Birkaç yüz terabaytlık arşiv verisi, sınırlı bant genişliği olan bir ofisten S3'e taşınacak ve ağ üzerinden aktarmak aylar sürecek. Hangi yöntem uygundur?", options: [
  "AWS Snow ailesi cihazı ile fiziksel taşıma",
  "DataSync ile mevcut internet hattından aktarmak",
  "AWS Transfer Family ile SFTP yüklemesi",
  "Client VPN ile her çalışanın cihazından yüklemek"
], obj: "h3" },
      { id: "842b3170", q: "Şirket içi NFS paylaşımındaki dosyaların her gece S3'e eşitlenmesi, aktarımın doğrulanması ve işin zamanlanması isteniyor. Hangi hizmet bu iş için tasarlanmıştır?", options: ["AWS Snowball Edge", "Amazon ElastiCache", "AWS DataSync", "AWS Direct Connect"], obj: "h3" },
      { id: "77699fe7", q: "Şirket içi bir yedekleme uygulaması SMB/NFS dosya paylaşımı bekliyor, ama veriler S3'te saklanacak ve sık erişilenler yerelde önbelleklenecek. Hangi çözüm uygundur?", options: [
  "AWS Transfer Family",
  "S3 File Gateway (Storage Gateway)",
  "Amazon EBS birimi",
  "AWS Database Migration Service"
], obj: "h3" },
      { id: "9786fce6", q: "Çalışan bir ticari Oracle veritabanı, minimum kesintiyle PostgreSQL uyumlu bir yönetilen veritabanına taşınacak ve şema dönüşümü gerekiyor. Hangi hizmet çifti kullanılır?", options: [
  "DataSync ve Transfer Family",
  "DMS ve SCT",
  "Snowball ve Storage Gateway",
  "Direct Connect ve Client VPN"
], obj: "h4" },
      { id: "8f11fcd6", q: "Dış ortakların mevcut SFTP istemcileriyle dosyaları S3'e yüklemesini, ama sunucu yönetmeden yapmak istiyorsun. Hangi hizmet kullanılır?", options: ["AWS DataSync", "AWS Schema Conversion Tool", "Amazon Route 53", "AWS Transfer Family"], obj: "h3" }
    ],
    interview: [
      { q: "Site-to-Site VPN ile Direct Connect arasında nasıl seçersin?", a: "Hızlı devreye alma ve düşük başlangıç masrafı için VPN; tutarlı gecikme, yüksek verim ve büyük veri hacmi için Direct Connect. Kritik sistemlerde ikisi birlikte kullanılır: Direct Connect ana, VPN yedek." },
      { q: "Direct Connect trafik şifreler mi?", a: "Varsayılan olarak hayır. Hat özeldir ama gizlilik için üzerine VPN eklenir ya da hat düzeyinde şifreleme açılır." },
      { q: "Ne zaman DataSync, ne zaman Snow cihazı?", a: "Bant genişliği yeterli ve veri sürekli akıyorsa DataSync. Veri çok büyük, hat yetersiz ya da bağlantı hiç yoksa fiziksel Snow cihazı." }
    ],
    vocab: [
      { term: "Hybrid", tr: "hibrit (şirket içi + bulut)", ex: "We run a hybrid architecture." },
      { term: "Dedicated connection", tr: "ayrılmış bağlantı", ex: "Direct Connect is a dedicated connection." },
      { term: "Tunnel", tr: "tünel", ex: "The VPN has two tunnels." },
      { term: "Migrate", tr: "taşımak", ex: "Migrate the database with DMS." },
      { term: "Throughput", tr: "veri hacmi/hızı", ex: "The link has high throughput." }
    ],
    resources: [
      { title: "AWS Direct Connect Kullanıcı Kılavuzu", url: "https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html", type: "doc", why: "Özel hat kavramları", level: "orta", lang: "EN" },
      { title: "AWS DataSync Kullanıcı Kılavuzu", url: "https://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html", type: "doc", why: "Çevrimiçi veri taşıma", level: "orta", lang: "EN" }
    ],
    sources: [SAA]
  };
})();

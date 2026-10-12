/* Backend yolu · Faz 5 tur 5: konu başına ders eki, ikinci parça (anahtar = TMAP.bk dizini, 19–37).
   Alanlar: benzetme + sınırı, rehberli alıştırma, bağımsız görev, yaygın hatalar, geçme ölçütü + kritik yanlış anlama,
   dış kaynak (son doğrulama tarihiyle), telafi/sonraki adım.
   Alıştırmalar kâğıt üzerinde, kendi makinede ya da AWS konsolunu yalnız okuma düzeyindedir; maliyetli ya da canlı hesabı değiştiren işlem istemez.
   Dış kaynak: yalnız HTTP 200 dönenler (curl, 2026-10-12); AWS CodeBuild sayfası doğrulanamadığı için eklenmedi. */
(function () {
  var E = ((window.PP_EK = window.PP_EK || {}).bk = (window.PP_EK.bk || {}));
  var DOG = "2026-10-12";
  var A = function (yol, t, neden) { return { t: t, u: "https://docs.aws.amazon.com/" + yol, dogrulama: DOG, neden: neden }; };
  var K = function (t, u, neden) { return { t: t, u: u, dogrulama: DOG, neden: neden }; };

  E[19] = {
    analoji: { a: "Postane posta kutusu: gönderen mektubu bırakıp gider, alıcı müsait olunca alır; alıcı çökse de mektup kaybolmaz.", sinir: "Posta kutusunda mektup tek kişiye gider ve sırası belli olur; Standard SQS'te aynı mesaj bazen iki kez gelebilir ve sıra garanti değildir." },
    rehberli: ["Kâğıda 'sipariş servisi → kuyruk → e-posta servisi' çiz; e-posta servisi 10 dakika kapalıyken siparişlerin nereye biriktiğini işaretle.", "Visibility timeout 30 sn, işleme 45 sn sürüyor: mesaja ne olur, yaz (başka tüketici tekrar görür).", "Bir mesaj 5 kez başarısız oldu: DLQ'ya gitmesi için hangi ayarın (maxReceiveCount) gerektiğini ve DLQ'yu kimin izleyeceğini yaz."],
    bagimsiz: "Bir 'fatura PDF üret' işi için kuyruk tasarla: Standard mı FIFO mu, visibility timeout kaç sn, kaç denemeden sonra DLQ? Her seçimi tek cümleyle gerekçelendir (yalnız kâğıt üzerinde).",
    hatalar: [["Visibility timeout'u işleme süresinden kısa bırakmak", "Mesaj işlenirken yeniden görünür ve iki kez işlenir; süreyi işleme süresinden uzun tut."], ["DLQ'yu kurup hiç izlememek", "DLQ'daki mesaj sessizce birikir; uyarı kur ve nedenini incele."], ["Standard kuyrukta sıra garantisi beklemek", "Sıra ve tek seferlik teslim gerekiyorsa FIFO seç; yoksa tüketiciyi tekrara dayanıklı yaz."]],
    gecme: { olcut: "Mini sınavda %80 ve bir kuyruk akışında visibility timeout ile DLQ'nun rolünü gerekçesiyle anlatabilmek.", kritik: ["Mesaj okununca kuyruktan hemen silindiğini sanmak (silme işlem sonrası tüketici yapar)", "DLQ'nun hataları kendiliğinden düzelttiğini sanmak"] },
    kaynaklar: [
      A("AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html", "AWS Belgesi: SQS visibility timeout", "Mesajın işlenirken neden gizlendiğini resmi kaynaktan doğrular."),
      A("AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html", "AWS Belgesi: SQS dead-letter queues", "DLQ ve maxReceiveCount ayarını resmi kaynaktan gösterir.")
    ],
    telafi: "Takıldıysan tek mesajın yolunu çiz: gönderildi, okundu (gizlendi), silindi ya da süre doldu ve yeniden göründü.",
    sonraki: "Sıradaki konu: SNS. Önce bu konunun geçme ölçütünü sağla, sonra devam et."
  };

  E[20] = {
    analoji: { a: "Radyo istasyonu: yayıncı tek yayın yapar, dinleyen herkes kendi radyosundan alır; yeni dinleyici için yayıncı bir şey değiştirmez.", sinir: "Radyoyu kaçıran dinleyici yayını sonradan dinleyemez; SNS de teslim anında hazır olmayan aboneye mesajı kalıcı tutmaz, bunun için abone önüne SQS konur." },
    rehberli: ["Kâğıda bir 'sipariş verildi' topic'i çiz; e-posta, stok ve analitik servislerini abone olarak bağla.", "Dördüncü bir abone (ör. kargo) eklendiğinde yayıncı kodunun değişip değişmediğini yaz.", "Her aboneyi SQS kuyruğu üzerinden bağlamanın (fan-out) yavaş aboneyi nasıl koruduğunu bir cümleyle açıkla."],
    bagimsiz: "Bir 'kullanıcı kayıt oldu' olayı için topic, en az üç abone ve her abonenin işlemi başarısız olursa ne olacağını (yeniden deneme / DLQ) kâğıda çiz.",
    hatalar: [["SNS'i kuyruk gibi kullanmak", "SNS iletir, saklamaz; geç kalan tüketici için abone önüne SQS koy."], ["Yayıncıda aboneleri tek tek çağırmak", "Bu sıkı bağ yaratır; abone eklemek topic aboneliğiyle olmalı."], ["Topic erişim politikasını herkese açık bırakmak", "Yalnız gereken hesap ve servislere yayın/abonelik izni ver."]],
    gecme: { olcut: "Mini sınavda %80 ve bir fan-out çizimini kendi başına tamamlayabilmek.", kritik: ["SNS'in mesajı kalıcı sakladığını sanmak", "Yeni abone için yayıncı kodunun değişmesi gerektiğini sanmak"] },
    kaynaklar: [
      A("sns/latest/dg/welcome.html", "AWS Belgesi: Amazon SNS nedir", "Topic, yayıncı ve abone kavramlarının resmi tanımı."),
      A("sns/latest/dg/sns-fanout-as-sqs.html", "AWS Belgesi: SNS ve SQS ile fan-out", "Fan-out düzenini resmi kaynaktan gösterir.")
    ],
    telafi: "Takıldıysan 'tek mesaj, çok alıcı' cümlesini kendi sözlerinle yaz ve yalnız bir yayıncı, bir topic, iki aboneyle çiz.",
    sonraki: "Sıradaki konu: EventBridge."
  };

  E[21] = {
    analoji: { a: "Site görevlisi: olaylar (kargo geldi, asansör bozuldu) ona bildirilir; elindeki kurallara bakıp doğru kişiye yönlendirir.", sinir: "Görevli yalnız kurala bakarak yönlendirir; kural yanlış yazılırsa olay sessizce hiçbir yere gitmez ve bunu fark etmek zordur." },
    rehberli: ["Üç olay yaz: sipariş oluştu, ödeme başarısız, gece 02:00 zamanlayıcısı.", "Her olay için bir kural ve bir hedef (ör. Lambda, SQS) eşle.", "Kural hiçbir olayla eşleşmezse ne olacağını ve bunu nasıl fark edeceğini yaz (metrik / arşiv)."],
    bagimsiz: "Bir 'dosya yüklendi' olayı için olay desenini (hangi alanlara bakılır) kâğıda JSON olarak yaz; iki hedef seç ve kuralın yanlış yazıldığını nasıl anlayacağını açıkla.",
    hatalar: [["Olay desenini fazla geniş yazmak", "Her olay hedefi tetikler ve maliyet/gürültü artar; deseni dar tut."], ["Zamanlanmış işi sunucuda cron ile yönetmek", "Zamanlama kuralı yönetilen ve izlenebilir bir seçenektir."], ["Hedef başarısız olunca iş bitti sanmak", "Yeniden deneme ve DLQ ayarla; başarısız teslimi izle."]],
    gecme: { olcut: "Mini sınavda %80 ve bir olay için desen, kural ve hedefi doğru sırayla sayabilmek.", kritik: ["EventBridge ile SNS'i aynı şey sanmak (EventBridge içeriğe göre kural ile yönlendirir)", "Kuralın eşleşmediği olayın kaydedildiğini sanmak"] },
    kaynaklar: [A("eventbridge/latest/userguide/eb-what-is.html", "AWS Belgesi: Amazon EventBridge nedir", "Olay, bus ve kural kavramlarının resmi anlatımı.")],
    telafi: "Takıldıysan tek bir olay seç: kim üretti, hangi desen eşleşti, kim aldı sorularını sırayla yanıtla.",
    sonraki: "Sıradaki konu: CloudFormation ve SAM."
  };

  E[22] = {
    analoji: { a: "Mimari proje: aynı projeyle aynı evi defalarca inşa edebilirsin ve değişiklik önce projede yapılır.", sinir: "Proje kâğıttadır; biri şantiyede elle duvar yıkarsa (konsoldan elle değişiklik) gerçek yapı projeden sapar (drift)." },
    rehberli: ["Küçük bir şablon örneğini oku (ör. bir S3 kovası tanımı) ve Resources, Parameters, Outputs bölümlerini işaretle.", "Bir değişiklik düşün: kovaya sürümleme açmak. Change set'in neyi önceden göstereceğini yaz.", "Aynı şablonu dev ve prod için nasıl yeniden kullanacağını (parametre) bir cümleyle yaz."],
    bagimsiz: "Kendi makinende yalnız metin olarak bir SAM şablonu iskeleti yaz (bir fonksiyon, bir API olayı). Dağıtım yapma; yalnız hangi kaynakların oluşacağını listele.",
    hatalar: [["Şablonu bırakıp konsoldan elle değiştirmek", "Drift oluşur; değişikliği şablonda yap."], ["Change set görmeden güncellemek", "Silinecek ya da yeniden oluşturulacak kaynakları önceden gör."], ["Gizli bilgiyi şablona yazmak", "Düz parametre gizli sayılmaz; Secrets Manager gibi bir gizli değer deposuna dinamik başvuru kullan."]],
    gecme: { olcut: "Mini sınavda %80 ve bir şablonda kaynak, parametre ve çıktıyı gösterip change set'in amacını söyleyebilmek.", kritik: ["Stack silinince kaynakların kalacağını varsaymak (silme politikasına bakılmalı)", "SAM'in CloudFormation'dan bağımsız bir araç olduğunu sanmak"] },
    kaynaklar: [
      A("AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-changesets.html", "AWS Belgesi: CloudFormation change set", "Değişikliği uygulamadan önce önizlemeyi resmi kaynaktan açıklar."),
      A("serverless-application-model/latest/developerguide/what-is-sam.html", "AWS Belgesi: AWS SAM nedir", "SAM'in CloudFormation üzerine kurulduğunu doğrular.")
    ],
    telafi: "Takıldıysan şablonu üç başlığa böl: ne kurulacak (Resources), neyle özelleşecek (Parameters), ne geri verecek (Outputs).",
    sonraki: "Sıradaki konu: CodePipeline, CodeBuild, CodeDeploy."
  };

  E[23] = {
    analoji: { a: "Fabrika montaj bandı: parça sırayla kontrol, birleştirme ve paketleme istasyonlarından geçer; kusurlu parça bantta durdurulur.", sinir: "Bantta her ürün aynı gelir; yazılımda testler eksikse kusurlu sürüm de otomatik ve hızlı biçimde canlıya çıkar." },
    rehberli: ["Kâğıda 'kaynak → build → test → dağıtım' hattını çiz ve her aşamaya hangi servisin düştüğünü yaz.", "Test aşaması başarısız olursa hattın nerede durması gerektiğini işaretle.", "Dağıtım başarısız olursa geri alma (rollback) için neye ihtiyaç olduğunu yaz."],
    bagimsiz: "Kendi küçük projen için dört aşamalı bir hat planla: hangi olay hattı başlatır, hangi test geçmeden dağıtım yapılmaz, geri alma nasıl olur (yalnız plan).",
    hatalar: [["Testsiz hat kurmak", "Otomasyon hatayı hızlandırır; en az birim testi aşaması ekle."], ["Hat rolüne yönetici yetkisi vermek", "Her aşamaya yalnız gereken izni ver."], ["Gizli anahtarı build betiğine yazmak", "Gizli bilgiyi Secrets Manager ya da Parameter Store'dan çek."]],
    gecme: { olcut: "Mini sınavda %80 ve üç servisin görevini bir hat üzerinde doğru yere koyabilmek.", kritik: ["CodeBuild'in dağıtım yaptığını sanmak (derler ve test eder; dağıtımı CodeDeploy yapar)", "Hattın başarısız aşamada devam ettiğini sanmak"] },
    kaynaklar: [A("codepipeline/latest/userguide/welcome.html", "AWS Belgesi: AWS CodePipeline nedir", "Hat, aşama ve eylem kavramlarının resmi tanımı.")],
    telafi: "Takıldıysan hattı tek cümleye indir: değişiklik gelir, derlenir, test edilir, dağıtılır; her adımda 'başarısızsa ne olur'u ekle.",
    sonraki: "Sıradaki konu: Elastic Beanstalk."
  };

  E[24] = {
    analoji: { a: "Hazır mobilyalı daire: kodunu getirirsin, tesisat ve düzen kurulmuş gelir.", sinir: "Dairede duvarı kendi isteğine göre yıkamazsın; Beanstalk'ta sıra dışı gereksinim olursa altyapı ayrıntısına inmen ya da başka servise geçmen gerekir." },
    rehberli: ["Bir web uygulaması için Beanstalk'ın senin yerine kurduğu parçaları (sunucu, yük dengeleyici, ölçekleme) listele.", "Ortam ayarını (ör. ortam değişkeni) koddan neden ayırman gerektiğini yaz.", "Beanstalk'ın sana yetmediği bir durumu (ör. çok kapsayıcılı karmaşık mimari, işletim sistemi düzeyinde ince ayar) örnekle."],
    bagimsiz: "Küçük bir API için 'Beanstalk mı, ECS mi?' kararını kâğıda iki sütunlu tabloyla ver (hız, kontrol, yönetim yükü). Karar gerekçeni yaz.",
    hatalar: [["Beanstalk'ın altındaki kaynakları elle değiştirmek", "Ayarları Beanstalk yapılandırmasından yönet; elle değişiklik sapma yaratır."], ["Üretim ve geliştirmeyi tek ortamda tutmak", "Ayrı ortamlar kur."], ["Gizli bilgiyi ortam değişkenine düz metin koymak", "Secrets Manager / Parameter Store kullan."]],
    gecme: { olcut: "Mini sınavda %80 ve Beanstalk'ın ne yönettiğini ve ne zaman yetersiz kaldığını anlatabilmek.", kritik: ["Beanstalk'ın altyapısız (sunucusuz) çalıştığını sanmak", "Her uygulama için en iyi seçim olduğunu sanmak"] },
    kaynaklar: [A("elasticbeanstalk/latest/dg/Welcome.html", "AWS Belgesi: Elastic Beanstalk nedir", "Servisin neyi yönettiğini resmi kaynaktan doğrular.")],
    telafi: "Takıldıysan yalnız şunu yaz: kodu ben yazıyorum, altyapıyı Beanstalk kuruyor; hangi iki şeyi hâlâ ben yönetiyorum?",
    sonraki: "Sıradaki konu: ECS ve ECR."
  };

  E[25] = {
    analoji: { a: "Konteyner gemisi: standart boyutlu kutular her limanda aynı şekilde yüklenir ve boşaltılır; ECR depo, ECS liman işletmesidir.", sinir: "Kutu içeriği standarttır ama kutunun içi (imaj) eski ya da zafiyetliyse her yere aynı zafiyet taşınır." },
    rehberli: ["Bir Dockerfile'ı oku (kendi makinende) ve temel imaj, bağımlılık ve başlatma komutu satırlarını işaretle.", "İmajın 'ECR'de saklanıp ECS'te çalıştırılması' akışını kâğıda çiz.", "Fargate ile EC2 türü arasındaki farkı (sunucuyu kim yönetir) bir cümleyle yaz."],
    bagimsiz: "Küçük bir uygulama için imaj etiket stratejisi planla: 'latest' yerine sürüm ya da commit etiketi neden daha güvenli, ve eski imajlar nasıl temizlenir (yalnız plan).",
    hatalar: [["Üretimde 'latest' etiketine güvenmek", "Hangi sürümün çalıştığı belirsizleşir; sabit etiket kullan."], ["İmaja gizli bilgi gömmek", "Çalışma zamanında Secrets Manager/Parameter Store'dan ver."], ["Görev rolünü geniş vermek", "Her görev yalnız gereken izne sahip olmalı."]],
    gecme: { olcut: "Mini sınavda %80 ve ECR, ECS ve Fargate'in görevlerini bir akışta doğru yere koyabilmek.", kritik: ["ECR'nin konteyneri çalıştırdığını sanmak (yalnız imaj depolar)", "Konteynerin sanal makine ile aynı olduğunu sanmak"] },
    kaynaklar: [
      A("AmazonECS/latest/developerguide/Welcome.html", "AWS Belgesi: Amazon ECS nedir", "ECS ve Fargate kavramlarının resmi anlatımı."),
      A("AmazonECR/latest/userguide/what-is-ecr.html", "AWS Belgesi: Amazon ECR nedir", "ECR'nin imaj deposu rolünü doğrular.")
    ],
    telafi: "Takıldıysan akışı üç kutuyla çiz: imajı yap, ECR'ye koy, ECS'te çalıştır.",
    sonraki: "Sıradaki konu: KMS. Devam etmeden önce kritik yanlış anlamaları gözden geçir."
  };

  E[26] = {
    analoji: { a: "Banka kasası ve kasa görevlisi: anahtarı kimse eline almaz; işlemi görevli yapar ve her açılış deftere yazılır.", sinir: "Görevliye kimin ne zaman erişebileceği politika ile belirlenir; politika fazla genişse kasa korunsa bile yetkisiz kişi içeri girebilir." },
    rehberli: ["Zarf şifrelemeyi kâğıda çiz: veri anahtarı veriyi şifreler, KMS anahtarı veri anahtarını şifreler.", "Bir anahtar politikasını oku (ya da örnek yaz) ve 'kim şifreleyebilir, kim çözebilir' ayrımını işaretle.", "Anahtar kullanımının CloudTrail'de nasıl göründüğünü bir cümleyle yaz."],
    bagimsiz: "Bir 'müşteri belgeleri' bucket'ı için anahtar planı yap: kim şifreler, kim çözer, anahtar silinirse ne olur. Her rol için en az yetki ilkesini yaz (yalnız plan).",
    hatalar: [["Anahtarı koda ya da dosyaya gömmek", "Anahtar yönetimini KMS'e bırak; uygulama yalnız izinle çağırsın."], ["Anahtar politikasında herkese izin vermek", "Şifreleme ve çözme izinlerini ayrı ve dar tut."], ["Anahtarı silmenin geri alınabilir olduğunu sanmak", "Silinen anahtarla şifrelenmiş veri açılamaz; bekleme süresini kullan."]],
    gecme: { olcut: "Mini sınavda %80 ve zarf şifrelemeyi adım adım anlatabilmek.", kritik: ["KMS'in büyük veriyi doğrudan şifrelediğini sanmak (veri anahtarlarını korur)", "Anahtar silinince verinin yine açılabileceğini sanmak"] },
    kaynaklar: [A("kms/latest/developerguide/overview.html", "AWS Belgesi: AWS KMS nedir", "KMS anahtarı ve zarf şifreleme kavramlarının resmi özeti.")],
    telafi: "Takıldıysan yalnız şunu çiz: veriyi kim şifreliyor, o anahtarı kim koruyor, kullanım nereye kaydediliyor?",
    sonraki: "Sıradaki konu: Cognito."
  };

  E[27] = {
    analoji: { a: "Otel resepsiyonu: kimliğini kontrol edip sana oda kartı verir; kapılar sonra karta bakar, kimliğe değil.", sinir: "Kart kaybolursa ya da süresi uzunsa başkası kullanabilir; bu yüzden jeton kısa ömürlü olmalı ve ek doğrulama (MFA) gerekebilir." },
    rehberli: ["User pool ile identity pool farkını yaz: biri kim olduğunu doğrular, diğeri AWS erişimi için geçici kimlik verir.", "Bir giriş akışını çiz: kullanıcı → user pool → jeton → API.", "MFA'nın hangi saldırıyı (çalınmış parola) zorlaştırdığını bir cümleyle yaz."],
    bagimsiz: "Bir mobil uygulama için giriş tasarla: e-posta ile mi, sosyal giriş ile mi, MFA zorunlu mu? Jeton süresini ve yenilemeyi gerekçelendir (yalnız plan).",
    hatalar: [["Kendi parola saklama sistemini yazmak", "Hazır, denetlenmiş servis kullan."], ["Jetonu doğrulamadan güvenmek", "API tarafında imza, süre ve hedef kitleyi (audience) doğrula."], ["Jetonu tarayıcıda güvensiz yerde saklamak", "Saklama yerini ve XSS riskini değerlendir."]],
    gecme: { olcut: "Mini sınavda %80 ve user pool ile identity pool'u karıştırmadan açıklayabilmek.", kritik: ["Giriş yapmış olmanın otomatik olarak yetkili olmak demek olduğunu sanmak", "İki havuzu aynı şey sanmak"] },
    kaynaklar: [A("cognito/latest/developerguide/what-is-amazon-cognito.html", "AWS Belgesi: Amazon Cognito nedir", "User pool ve identity pool ayrımının resmi anlatımı.")],
    telafi: "Takıldıysan akışı tek soruyla çöz: kim olduğunu kim doğruluyor, ne yapabileceğine kim karar veriyor?",
    sonraki: "Sıradaki konu: X-Ray."
  };

  E[28] = {
    analoji: { a: "Kargo takip numarası: paketin hangi aktarma merkezinde ne kadar beklediğini adım adım görürsün.", sinir: "Takip yalnız numaralı pakette çalışır; örneklemede her istek izlenmez, nadir yavaşlayan istek hiç izlenmemiş olabilir." },
    rehberli: ["Bir isteğin yolunu çiz: istemci → API → fonksiyon → veritabanı; her adıma bir segment süresi yaz.", "En yavaş segmenti bul ve bir iyileştirme önerisi yaz.", "Örnekleme oranını %100 yerine düşük tutmanın neden mantıklı olduğunu bir cümleyle yaz."],
    bagimsiz: "Kâğıt üzerinde verilen şu izi yorumla: API 40 ms, fonksiyon 900 ms, veritabanı 850 ms. Darboğaz nerede, ilk neye bakarsın, hangi ek ölçüm gerekir?",
    hatalar: [["Yavaşlığı tahminle çözmeye çalışmak", "Önce iz ve servis haritasından darboğazı bul."], ["İz verisine kişisel veri koymak", "Açıklama (annotation) alanlarında hassas veriden kaçın."], ["Örneklemeyi tamamen kapatmak", "Düşük oran bile genel resmi verir; hatalı istekleri öncelikle yakala."]],
    gecme: { olcut: "Mini sınavda %80 ve bir izden darboğaz segmentini bulup gerekçelendirebilmek.", kritik: ["İzlemenin her isteği kaydettiğini sanmak", "X-Ray'in log yerine geçtiğini sanmak (ikisi birbirini tamamlar)"] },
    kaynaklar: [A("xray/latest/devguide/aws-xray.html", "AWS Belgesi: AWS X-Ray nedir", "İz, segment ve servis haritası kavramlarının resmi anlatımı.")],
    telafi: "Takıldıysan isteğin yolunu düz bir çizgiyle çiz ve her kutuya süre yaz; en uzun kutu önce incelenir.",
    sonraki: "Sıradaki konu: CloudTrail."
  };

  E[29] = {
    analoji: { a: "Bina giriş defteri ve kamera kaydı: kim, ne zaman, hangi kapıdan girdi sorusuna cevap verir.", sinir: "Defter yalnız yazılanı gösterir; bazı olaylar (ör. veri düzeyi) varsayılan kayıtta değildir ve defteri silebilen biri izi de silebilir." },
    rehberli: ["Bir olay örneği oku (ya da düşün): kim (userIdentity), ne (eventName), ne zaman (eventTime), nereden (sourceIPAddress).", "Yönetim olayı ile veri olayı farkını bir örnekle yaz.", "Trail kayıtlarını neden ayrı bir bucket'ta ve değiştirilemez korumayla tutmak gerektiğini yaz."],
    bagimsiz: "'Bir bucket politikası dün değişti, kim yaptı?' sorusunu yanıtlamak için hangi olay adına bakacağını, hangi alanları okuyacağını ve kaydın korunmasını kâğıda planla.",
    hatalar: [["Trail'i hiç açmamak", "Olay geçmişi sınırlıdır; kalıcı kayıt için trail kur."], ["Kayıt bucket'ını herkese yazılabilir bırakmak", "Kaydın bütünlüğü bozulur; erişimi dar tut."], ["Sorun çıkınca bakmak", "Uyarı ve düzenli inceleme kur; olay sonrası aramak geç kalır."]],
    gecme: { olcut: "Mini sınavda %80 ve bir olay kaydından kim, ne, ne zaman bilgisini çıkarabilmek.", kritik: ["CloudTrail'in uygulama günlüğü olduğunu sanmak (API çağrılarını kaydeder)", "Veri olaylarının varsayılan olarak kaydedildiğini sanmak"] },
    kaynaklar: [A("awscloudtrail/latest/userguide/cloudtrail-user-guide.html", "AWS Belgesi: AWS CloudTrail nedir", "Olay türleri ve trail kavramlarının resmi anlatımı.")],
    telafi: "Takıldıysan tek olayı dört alana böl: kim, ne yaptı, ne zaman, nereden.",
    sonraki: "Sıradaki konu: Yeniden deneme ve idempotency."
  };

  E[30] = {
    analoji: { a: "Asansör düğmesine basmak: basmadı sandın, yine bastın; düğme zaten yanıyorsa tekrar basmak bir şeyi değiştirmez.", sinir: "Düğme doğası gereği idempotenttir; sipariş oluşturma gibi işlemler değildir ve aynı çağrının tekrarı çift kayıt yaratabilir, anahtar gerekir." },
    rehberli: ["Bir ödeme çağrısı zaman aşımına uğradı: sunucuda işlem olmuş olabilir mi, yaz.", "Üstel geri çekilmeyi hesapla: 1, 2, 4, 8 sn; jitter'ın neden rastgelelik kattığını yaz.", "Idempotency anahtarının (aynı istek, aynı sonuç) çift siparişi nasıl önlediğini kâğıtta göster."],
    bagimsiz: "Bir 'sipariş oluştur' API'si için tekrar politikası tasarla: kaç deneme, bekleme süresi, hangi hatalarda tekrar denenir/denenmez, idempotency anahtarı nerede saklanır (yalnız plan).",
    hatalar: [["Anında ve sınırsız tekrar denemek", "Geri çekilme ve deneme sınırı koy; yoksa fırtına olur."], ["Tüm hataları tekrar denemek", "Yalnız geçici hataları dene; 4xx istemci hatalarını tekrarlama."], ["Jitter kullanmamak", "Tüm istemciler aynı anda dener; rastgelelik yükü dağıtır."]],
    gecme: { olcut: "Mini sınavda %80 ve bir çağrı için tekrar politikasını ve idempotency anahtarını gerekçesiyle kurabilmek.", kritik: ["Yeniden denemenin her zaman güvenli olduğunu sanmak", "Idempotency'nin yalnız istemci tarafında çözüldüğünü sanmak (sunucu anahtarı saklamalı)"] },
    kaynaklar: [
      A("general/latest/gr/api-retries.html", "AWS Belgesi: Yeniden deneme ve üstel geri çekilme", "Geri çekilme ve jitter yaklaşımının resmi anlatımı."),
      K("Amazon Builders' Library: Making retries safe with idempotent APIs", "https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/", "Idempotency ile güvenli tekrarı pratik örneklerle anlatır.")
    ],
    telafi: "Takıldıysan iki soru sor: bu çağrıyı iki kez yapsam zarar var mı, varsa tekrarı hangi anahtar engeller?",
    sonraki: "Sıradaki konu: EC2, ELB ve Auto Scaling."
  };

  E[31] = {
    analoji: { a: "Market kasaları: kuyruk uzayınca yeni kasa açılır, boşalınca kapanır; kapı görevlisi (ELB) müşteriyi boş kasaya yönlendirir.", sinir: "Kasa açmak zaman alır; ani yük patlamasında yeni sunucu hazır olana kadar gecikme yaşanır ve kasada paylaşılan durum (oturum) varsa müşteri başka kasada kaybolur." },
    rehberli: ["Tek sunuculu bir uygulamada iki riski yaz: kapasite ve arıza.", "ELB, iki sunucu ve sağlık kontrolünü çiz; bir sunucu sağlıksız olursa trafiğin nereye gittiğini işaretle.", "Auto Scaling için minimum, istenen ve maksimum sayıyı ve bir ölçeklenme tetikleyicisini (ör. CPU) yaz."],
    bagimsiz: "Bir web uygulaması için iki farklı Availability Zone'da çalışan bir yerleşim çiz; ölçek sınırlarını, sağlık kontrol yolunu ve maliyeti sınırlamak için maksimum değeri gerekçelendir (yalnız plan).",
    hatalar: [["Sunucuyu tek AZ'de tutmak", "En az iki AZ kullan; biri düşünce diğeri hizmeti sürdürsün."], ["Oturumu sunucu belleğinde tutmak", "Oturumu dışarıda (veritabanı/önbellek) sakla; sunucu bağımsız olsun."], ["Maksimum sınırı koymamak", "Beklenmedik maliyeti önlemek için üst sınır belirle."]],
    gecme: { olcut: "Mini sınavda %80 ve ELB, sağlık kontrolü ve Auto Scaling'in birlikte nasıl çalıştığını anlatabilmek.", kritik: ["Auto Scaling'in anında kapasite verdiğini sanmak", "Yük dengeleyicinin tek başına yüksek erişilebilirlik sağladığını sanmak (çok AZ gerekir)"] },
    kaynaklar: [
      A("elasticloadbalancing/latest/userguide/what-is-load-balancing.html", "AWS Belgesi: Elastic Load Balancing nedir", "Yük dengeleyicinin rolünü resmi kaynaktan açıklar."),
      A("autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html", "AWS Belgesi: Amazon EC2 Auto Scaling nedir", "Ölçekleme grubu ve sağlık kontrolü kavramları.")
    ],
    telafi: "Takıldıysan tek sunucunun çökmesini hayal et ve sor: trafiği kim yönlendirir, yeni sunucuyu kim açar?",
    sonraki: "Sıradaki konu: VPC ve güvenlik grupları."
  };

  E[32] = {
    analoji: { a: "Site ve daireler: site girişi ortak, daire kapısı kişisel; güvenlik görevlisi ve kapı kilidi iki ayrı koruma katmanıdır.", sinir: "Sitede herkes aynı güvenlikten geçer; VPC'de güvenlik grubu durumlu (dönüş trafiğini izler), NACL durumsuzdur ve iki yönü ayrı ayrı yazmak gerekir." },
    rehberli: ["Kâğıda bir VPC çiz: bir genel, bir özel alt ağ; web sunucusunu genel, veritabanını özel alt ağa koy.", "Güvenlik grubu kuralını yaz: veritabanı yalnız web sunucusunun grubundan 5432 portuna izin verir.", "Özel alt ağdaki sunucunun güncelleme indirmesi için NAT Gateway'in rolünü işaretle."],
    bagimsiz: "Kendi AWS hesabında yalnız okuma düzeyinde bir güvenlik grubunun gelen kurallarına bak (varsa); 0.0.0.0/0 olan bir kuralı not et ve daraltılması için ne yazacağını planla. Hiçbir şeyi değiştirme.",
    hatalar: [["Veritabanını genel alt ağa koymak", "Veritabanı özel alt ağda olmalı; yalnız uygulama katmanı erişsin."], ["Yönetim portlarını (22, 3389) 0.0.0.0/0'a açmak", "Kaynağı dar bir IP ya da güvenli oturum yöntemiyle sınırla."], ["Güvenlik grubu ile NACL'i aynı sanmak", "Biri durumlu ve örnek düzeyinde, diğeri durumsuz ve alt ağ düzeyindedir."]],
    gecme: { olcut: "Mini sınavda %80 ve bir mimari çizimde genel/özel alt ağı ve güvenlik grubu kurallarını doğru yerleştirebilmek.", kritik: ["0.0.0.0/0 açmanın zararsız olduğunu sanmak", "Özel alt ağın otomatik olarak internete çıkabildiğini sanmak (NAT gerekir)"] },
    kaynaklar: [
      A("vpc/latest/userguide/what-is-amazon-vpc.html", "AWS Belgesi: Amazon VPC nedir", "VPC, alt ağ ve yönlendirme kavramlarının resmi özeti."),
      A("AmazonVPC/latest/UserGuide/VPC_SecurityGroups.html", "AWS Belgesi: VPC güvenlik grupları", "Güvenlik grubu kurallarını ve durumlu yapıyı açıklar.")
    ],
    telafi: "Takıldıysan önce 'kim kime konuşabilmeli?' sorusunu yaz, sonra yalnız o yolu açan kuralı çiz.",
    sonraki: "Sıradaki konu: CloudFront ve Route 53."
  };

  E[33] = {
    analoji: { a: "Zincir market şubeleri: ürün her mahalledeki şubede hazır bulunur, merkez depoya gitmen gerekmez; Route 53 de 'en yakın açık şube' tabelasıdır.", sinir: "Şubedeki ürün eskimiş olabilir; önbellekte içerik TTL dolana ya da geçersiz kılınana kadar eski kalır." },
    rehberli: ["Bir statik site için akışı çiz: kullanıcı → en yakın uç → önbellekte var mı → yoksa origin.", "TTL'i 1 saat yaptığında içerik güncellemesinin kullanıcıya ne zaman yansıdığını yaz.", "Origin'e doğrudan erişimi kapatıp yalnız CloudFront'a izin vermenin neden güvenli olduğunu yaz."],
    bagimsiz: "Kendi alan adın için kâğıt üzerinde bir DNS planı yap: ana site, API ve bir yedek için hangi kayıt türü ve hangi sağlık kontrolü yönlendirmesi kullanılır? Canlı DNS'e dokunma.",
    hatalar: [["Origin'i herkese açık bırakmak", "Erişimi yalnız CloudFront'a ver; önbelleği atlamayı engelle."], ["Çok uzun TTL ile sık değişen içeriği yayınlamak", "TTL'i içeriğin değişim hızına göre seç ya da geçersiz kıl."], ["DNS kaydını değiştirip hemen etkisini beklemek", "Eski kayıt önbellekte TTL kadar kalabilir."]],
    gecme: { olcut: "Mini sınavda %80 ve bir içerik için önbellek, TTL ve origin erişim kararını gerekçesiyle verebilmek.", kritik: ["CloudFront'un içeriği her zaman güncel sunduğunu sanmak", "Route 53'ün yalnız alan adı satın alma servisi olduğunu sanmak"] },
    kaynaklar: [
      A("AmazonCloudFront/latest/DeveloperGuide/Introduction.html", "AWS Belgesi: Amazon CloudFront nedir", "Uç konumlar ve önbellek mantığını resmi kaynaktan anlatır."),
      A("Route53/latest/DeveloperGuide/Welcome.html", "AWS Belgesi: Amazon Route 53 nedir", "DNS ve yönlendirme politikalarının resmi özeti.")
    ],
    telafi: "Takıldıysan akışı iki soruyla çöz: içerik önbellekte var mı, yoksa kim getiriyor?",
    sonraki: "Sıradaki konu: Kinesis."
  };

  E[34] = {
    analoji: { a: "Akan nehir ve kayıt kamerası: su (olaylar) hep akar, istediğin kadar kişi aynı kaydı farklı anlardan izleyebilir.", sinir: "Nehir geri akmaz; kayıt süresi (saklama) dolunca eski veri silinir ve bölüm sıkışırsa tek kolda toplanan veri yavaşlar." },
    rehberli: ["SQS ile Kinesis farkını iki cümlede yaz: biri işlenince silinen iş kuyruğu, diğeri sıralı ve çok tüketicili akış.", "Bölme anahtarı olarak 'kullanıcı kimliği' seçildiğinde bir kullanıcının olaylarının neden sıralı kaldığını yaz.", "Firehose'un akışı nereye (ör. S3) yazdığını ve ne zaman gerektiğini işaretle."],
    bagimsiz: "Bir tıklama akışı için tasarla: bölme anahtarı ne olur, iki tüketici (canlı pano, arşiv) nasıl okur, 'sıcak bölüm' riski nasıl azalır? Yalnız kâğıt üzerinde.",
    hatalar: [["Bölme anahtarı olarak tek bir sabit değer seçmek", "Tüm veri tek bölüme düşer; yük dağıtan bir anahtar seç."], ["Kinesis'i basit iş kuyruğu için kullanmak", "Sıra ve çok tüketici gerekmiyorsa SQS daha sade ve ucuzdur."], ["Saklama süresini hesaba katmamak", "Süre dolunca veri silinir; arşiv gerekiyorsa Firehose ile S3'e yaz."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen bir senaryoda SQS mi Kinesis mi seçileceğini gerekçesiyle söyleyebilmek.", kritik: ["Kinesis'te okunan verinin silindiğini sanmak (saklama süresi boyunca durur)", "Bölme anahtarının önemsiz bir ayar olduğunu sanmak"] },
    kaynaklar: [A("streams/latest/dev/introduction.html", "AWS Belgesi: Kinesis Data Streams nedir", "Akış, shard ve tüketici kavramlarının resmi anlatımı.")],
    telafi: "Takıldıysan tek soruyu sor: olayların sırası ve birden çok okuyucu gerekiyor mu? Evetse Kinesis, hayırsa SQS.",
    sonraki: "Sıradaki konu: STS ve geçici kimlik."
  };

  E[35] = {
    analoji: { a: "Otel misafir kartı: belirli süre ve belirli odalar için çalışır, süre dolunca kendiliğinden ölür; ana anahtar ise kasada kalır.", sinir: "Kart süresi dolana kadar kullanılabilir; çalınırsa o süre içinde zarar verir, bu yüzden süre kısa ve yetki dar tutulmalıdır." },
    rehberli: ["Kalıcı erişim anahtarı ile STS geçici kimliğinin farkını (süre, sızıntı etkisi) iki satırda yaz.", "Hesap A'daki bir kullanıcının Hesap B'deki role AssumeRole ile nasıl geçtiğini çiz.", "Rolün güven politikası ile izin politikasının ayrı işlerini yaz."],
    bagimsiz: "Bir CI hattı için kalıcı anahtar yerine rol kullanma planı yaz: kim rolü üstlenebilir, süre ne kadar, yetki neyle sınırlı? Gerçek rol oluşturma; yalnız plan yaz.",
    hatalar: [["Kalıcı erişim anahtarını koda ya da repoya koymak", "Geçici kimlik ve rol kullan; sızan anahtarı hemen devre dışı bırak."], ["Güven politikasını herkese açmak", "Rolü üstlenebilecek hesap ve kimlikleri dar belirt."], ["Oturum süresini gereksiz uzun tutmak", "En kısa yeterli süreyi seç."]],
    gecme: { olcut: "Mini sınavda %80 ve AssumeRole akışında güven ve izin politikalarını doğru ayırabilmek.", kritik: ["Geçici kimliğin güvenlik riski taşımadığını sanmak", "Güven politikası ile izin politikasını aynı şey sanmak"] },
    kaynaklar: [A("IAM/latest/UserGuide/id_credentials_temp.html", "AWS Belgesi: IAM'de geçici güvenlik bilgileri", "Geçici kimliğin neden ve nasıl kullanıldığını resmi kaynaktan anlatır.")],
    telafi: "Takıldıysan sor: bu kimlik ne kadar yaşar ve çalınırsa ne yapabilir? Süreyi ve yetkiyi küçült.",
    sonraki: "Sıradaki konu: Parameter Store ve AppConfig."
  };

  E[36] = {
    analoji: { a: "Evin pano ve kasası: ayar panosu herkesin görebildiği not defteri, gizli bilgi ise kasadır; ikisini karıştırmazsın.", sinir: "Pano değişince herkes aynı anda görür; yanlış değer de herkese anında yayılabilir, bu yüzden kademeli yayın ve geri alma gerekir." },
    rehberli: ["Beş ayar yaz ve her birini sınıflandır: normal ayar, gizli bilgi, özellik bayrağı.", "Parameter Store ile Secrets Manager farkını (döndürme, maliyet, gizlilik düzeyi) bir tabloyla yaz.", "AppConfig ile ayarın kademeli yayılmasının neden güvenli olduğunu bir cümleyle yaz."],
    bagimsiz: "Kendi uygulamandaki bir yapılandırma dosyasını oku: kod içine gömülü bir parola ya da URL var mı? Varsa hangisinin nereye taşınacağını planla; gerçek değerleri paylaşma.",
    hatalar: [["Gizli bilgiyi düz metin parametre olarak saklamak", "Şifreli (SecureString) tür ya da Secrets Manager kullan."], ["Ayarı koda gömüp her değişiklikte yeniden yayınlamak", "Ayarı dışarı al; uygulama çalışırken okusun."], ["Tüm ayarlara herkesin erişmesine izin vermek", "Parametre yoluna göre dar IAM izni ver."]],
    gecme: { olcut: "Mini sınavda %80 ve bir ayar listesini doğru depoya (Store/Secrets/AppConfig) eşleyebilmek.", kritik: ["Ayarı koda gömmenin güvenli olduğunu sanmak", "Parameter Store ile Secrets Manager'ın birebir aynı olduğunu sanmak"] },
    kaynaklar: [
      A("systems-manager/latest/userguide/systems-manager-parameter-store.html", "AWS Belgesi: Systems Manager Parameter Store", "Parametre türleri ve şifreli saklamanın resmi anlatımı."),
      A("appconfig/latest/userguide/what-is-appconfig.html", "AWS Belgesi: AWS AppConfig nedir", "Kademeli yapılandırma yayınının resmi tanımı.")
    ],
    telafi: "Takıldıysan her ayara şunu sor: sızarsa zarar verir mi? Evetse gizli bilgidir ve kasaya gider.",
    sonraki: "Sıradaki konu: AWS CDK ve AppSync."
  };

  E[37] = {
    analoji: { a: "CDK: elle tuğla dizmek yerine bir inşaat makinesi programlarsın; AppSync ise sipariş formu: yalnız istediğin kalemleri yazarsın, fazlasını getirmez.", sinir: "Makine hatalı programlanırsa hatayı tekrarlayarak çoğaltır; esnek sorgu da kötü yazılırsa çok sayıda arka uç çağrısı yapıp yavaşlayabilir." },
    rehberli: ["Aynı kaynağın tekrarını YAML'da ve kodda (döngü/yapı) karşılaştır: kodda neden daha kısa olduğunu yaz.", "Bir construct'ın (yapı) ne olduğunu ve düşük/yüksek seviyeli farkı bir cümleyle açıkla.", "GraphQL sorgusunda yalnız 'ad' ve 'e-posta' isteyip fazla alan getirmemenin faydasını ve çözücünün (resolver) rolünü yaz."],
    bagimsiz: "Üç kaynak içeren (kova, fonksiyon, kuyruk) küçük bir yapıyı kâğıt üzerinde bir construct olarak tasarla ve bir AppSync şemasında iki alanı hangi veri kaynağına bağlayacağını yaz. Dağıtım yapma.",
    hatalar: [["CDK çıktısını incelemeden dağıtmak", "Üretilen şablonu ve değişiklik farkını (diff) önce oku."], ["Her şeyi tek dev construct'a koymak", "Küçük, yeniden kullanılabilir yapılar kur."], ["AppSync'te yetkilendirmeyi atlamak", "Alan düzeyinde kimlik doğrulama ve yetki kurallarını tanımla."]],
    gecme: { olcut: "Mini sınavda %80 ve CDK'nın neyi ürettiğini (CloudFormation) ve AppSync çözücüsünün işini anlatabilmek.", kritik: ["CDK'nın CloudFormation'dan bağımsız olduğunu sanmak", "GraphQL'in yetkilendirme gerektirmediğini sanmak"] },
    kaynaklar: [
      A("cdk/v2/guide/home.html", "AWS Belgesi: AWS CDK v2 Geliştirici Kılavuzu", "CDK'nın kodla altyapı yaklaşımını ve CloudFormation ilişkisini anlatır."),
      A("appsync/latest/devguide/what-is-appsync.html", "AWS Belgesi: AWS AppSync nedir", "GraphQL API ve çözücü kavramlarının resmi tanımı.")
    ],
    telafi: "Takıldıysan iki kutuya böl: CDK altyapıyı koda döker, AppSync veriyi istemcinin istediği biçimde sunar.",
    sonraki: "Backend yolunun son konusunu bitirdin; şimdi elindeki konuları bir projede birleştirebilirsin."
  };
})();

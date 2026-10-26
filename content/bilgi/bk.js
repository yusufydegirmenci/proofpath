/* Bölüm sonu bilgi testi (Faz 21) · bk. Yalnız soru ve seçenekler; doğru cevap/açıklama sunucuda (ogr_bilgi_kontrol), burada YOK. */
(window.PP_BILGI = window.PP_BILGI || {}).bk = {
 "1": {
  "baslik": "HTTP, Git, SQL ve kimlik doğrulama temelleri",
  "dersler": [
   1,
   6
  ],
  "sorular": [
   {
    "id": "513b339e",
    "q": "Giriş yapmış bir kullanıcı, yalnızca yöneticilere açık bir uç noktayı çağırıyor. Sunucunun dönmesi gereken en uygun durum kodu hangisidir?",
    "options": [
     "403 Forbidden",
     "404 Not Found",
     "500 Internal Server Error",
     "401 Unauthorized"
    ]
   },
   {
    "id": "71afa472",
    "q": "Hatalı bir commit zaten paylaşılan main dalına gönderildi. Geçmişi yeniden yazmadan etkisini geri almanın en güvenli yolu nedir?",
    "options": [
     "git reset --hard ile geri sarıp force push yapmak",
     "git revert ile tersini uygulayan commit eklemek",
     "Yeni bir dal açıp eski dalı sessizce silmek",
     "git stash ile commit'i geçici olarak saklamak"
    ]
   },
   {
    "id": "352e6432",
    "q": "Bazı müşterilerin hiç siparişi yok. Tüm müşterileri, varsa siparişleriyle birlikte listelemek için hangi birleştirme gerekir?",
    "options": [
     "orders INNER JOIN customers",
     "customers INNER JOIN orders",
     "customers LEFT JOIN orders",
     "customers CROSS JOIN orders"
    ]
   },
   {
    "id": "8b352227",
    "q": "Bir JWT'nin payload bölümüne konan bilgi hakkında hangisi doğrudur?",
    "options": [
     "Sunucuda saklanır, token yalnızca bir referans taşır",
     "Şifrelidir, yalnızca sunucu anahtarıyla okunabilir",
     "İmzalıdır, şifreli değildir; token sahibi okuyabilir",
     "Yalnızca imza anahtarını bilenler tarafından okunabilir"
    ]
   }
  ]
 },
 "2": {
  "baslik": "AWS temelleri, IAM, S3 ve DynamoDB",
  "dersler": [
   7,
   12
  ],
  "sorular": [
   {
    "id": "3ca5221f",
    "q": "Bir uygulamanın tek bir Availability Zone'un arızalanmasına karşı ayakta kalması için en doğru dağıtım hangisidir?",
    "options": [
     "Tüm uygulamayı tek bir alt ağda toplamak",
     "Örnek türünü daha büyük bir türe yükseltmek",
     "Tüm örnekleri kapasitesi en yüksek tek AZ'ye koymak",
     "Örnekleri aynı bölgede en az iki AZ'ye yaymak"
    ]
   },
   {
    "id": "f91d1940",
    "q": "Bir kullanıcıya bir politikayla s3:DeleteObject izni verilmiş, başka bir politikada ise açıkça yasaklanmıştır. Sonuç nedir?",
    "options": [
     "Son eklenen politika geçerli olur",
     "Açık Deny kazanır, silme işlemi reddedilir",
     "İkisi birbirini iptal eder, varsayılan izin verilir",
     "Allow kazanır, silme işlemi yapılır"
    ]
   },
   {
    "id": "ba1e6c72",
    "q": "Mobil uygulama, kullanıcının fotoğrafını AWS anahtarı taşımadan doğrudan özel bir S3 klasörüne yükleyecek. Hangi yaklaşım uygundur?",
    "options": [
     "Dosyayı Base64 yapıp API gövdesiyle S3'e iletmeyi denemek",
     "Kova politikasını herkese yazma izni verecek biçimde açıp bırakmak",
     "Sunucuda kısa ömürlü presigned PUT URL üretip istemciye vermek",
     "Uzun ömürlü IAM anahtarını uygulama koduna gömüp dağıtmak"
    ]
   },
   {
    "id": "d2e5a8df",
    "q": "DynamoDB tablosunun bölüm anahtarı userId. Aynı tabloyu orderId ile verimli sorgulamak için ne yapılmalıdır?",
    "options": [
     "Her sorguda Scan çalıştırıp filtre uygulamak",
     "orderId'yi bölüm anahtarı yapan bir GSI eklemek",
     "userId bölüm anahtarını sonradan orderId olarak değiştirmek",
     "Okuma kapasitesini artırıp Query'yi orderId ile çalıştırmak"
    ]
   }
  ]
 },
 "3": {
  "baslik": "RDS, önbellek, Lambda, API Gateway ve SQS",
  "dersler": [
   13,
   18
  ],
  "sorular": [
   {
    "id": "3968ecdb",
    "q": "Raporlama sorguları ana RDS örneğini yavaşlatıyor. Okuma yükünü ana veritabanından uzaklaştırmak için hangi özellik kullanılır?",
    "options": [
     "Otomatik yedek saklama süresini uzatıp izlemek",
     "Ayrılan depolama alanını belirgin biçimde büyütmek",
     "Multi-AZ DB instance bekleme örneğine doğrudan sorgu göndermek",
     "Read replica açıp raporları oradan çalıştırmak"
    ]
   },
   {
    "id": "046a5fb6",
    "q": "Cache-aside (lazy loading) örüntüsünde bir okuma isteği, önbellekte bulunamadı (cache miss). Uygulama ne yapmalıdır?",
    "options": [
     "Boş sonuç döndürüp önbelleği olduğu gibi bırakmak",
     "Veritabanına yalnızca yazma yapıp okumayı atlamak",
     "Önbelleğin tamamını silip yeniden doldurmaya başlamak",
     "Veritabanından okuyup önbelleğe yazmak ve döndürmek"
    ]
   },
   {
    "id": "df940672",
    "q": "Bir Lambda fonksiyonunun tek bir çağrısı en fazla ne kadar çalışabilir?",
    "options": [
     "60 dakika",
     "Süre sınırı yoktur",
     "15 dakika",
     "5 dakika"
    ]
   },
   {
    "id": "8e89821a",
    "q": "Bir SQS tüketicisi mesajı alıp işledi ama silmeden çöktü. Mesaja ne olur?",
    "options": [
     "İlk başarısızlıkta otomatik olarak ölü mektup kuyruğuna gider",
     "Silinmediği için mesaj bir daha hiç teslim edilmez",
     "Tüketici çöktüğü anda kalıcı olarak ve geri alınamaz biçimde silinir",
     "Görünürlük süresi dolunca yeniden görünür olur"
    ]
   }
  ]
 },
 "4": {
  "baslik": "SNS, EventBridge, CloudFormation ve konteynerler",
  "dersler": [
   19,
   24
  ],
  "sorular": [
   {
    "id": "708b5138",
    "q": "Bir sipariş olayı hem stok hem faturalama servisini bağımsız ve güvenilir biçimde tetiklemeli. Hangi tasarım uygundur?",
    "options": [
     "Servislerden birinin diğerini senkron çağırmasını sağlamak",
     "Tek bir SQS kuyruğunu iki servisle birlikte okutmak ve silmek",
     "SNS konusunu her servisin kendi SQS kuyruğuna abone etmek",
     "Olayı yalnızca bir Lambda günlük akışına yazmak"
    ]
   },
   {
    "id": "19b84cc4",
    "q": "Her gece 02:00'de bir Lambda fonksiyonu çalıştırılacak. Sunucusuz ve yönetilen en basit yöntem hangisidir?",
    "options": [
     "Her gece SNS konusuna elle mesaj yayımlayıp beklemek",
     "Boşta bekleyen bir EC2 örneğinde sürekli döngü çalıştırmak",
     "Lambda zaman aşımını 24 saate çıkarıp beklemek",
     "Zamanlanmış EventBridge kuralıyla Lambda'yı hedeflemek"
    ]
   },
   {
    "id": "c0b64c04",
    "q": "CloudFormation yığını oluşturulurken kaynaklardan biri hata verirse, varsayılan davranış nedir?",
    "options": [
     "Hata yok sayılır ve yığın başarılı işaretlenir",
     "Başarısız kaynak atlanır, diğerleri kalıcı olarak kalır",
     "İşlem sonsuza dek duraklar ve elle onay bekler",
     "Oluşturma geri alınır, yaratılan kaynaklar silinir"
    ]
   },
   {
    "id": "24b1ca4c",
    "q": "Konteynerleri çalıştıracak EC2 sunucularını hiç yönetmek istemeyen bir ekip ECS ile hangi başlatma türünü seçmelidir?",
    "options": [
     "Yalnızca Elastic Beanstalk ile tek örnek",
     "Lambda katmanları (layers)",
     "Fargate",
     "EC2 başlatma türü"
    ]
   }
  ]
 },
 "5": {
  "baslik": "KMS, gizli bilgi, Cognito, izleme ve denetim",
  "dersler": [
   25,
   30
  ],
  "sorular": [
   {
    "id": "b46fbeed",
    "q": "KMS Encrypt API'si doğrudan en fazla 4 KB veri şifreler. 2 GB'lık bir dosyayı KMS anahtarıyla korumak için ne yapılır?",
    "options": [
     "KMS anahtarını dosyayla birlikte indirip kullanmak",
     "Dosyayı Base64'e çevirip şifrelenmiş sayarak saklamak",
     "GenerateDataKey ile veri anahtarı alıp dosyayı şifrelemek",
     "Dosyayı Encrypt API'sine tek parça halinde ve eksiksiz göndermek"
    ]
   },
   {
    "id": "d19dc6b7",
    "q": "Bir RDS veritabanı parolası her 30 günde kendiliğinden yenilensin ve uygulama koduna elle dokunulmasın. Hangi servis uygundur?",
    "options": [
     "Secrets Manager ile otomatik rotasyon",
     "Parolayı ortam değişkeninde düz metin olarak tutmak",
     "Parolayı kaynak koda sabit yazmak",
     "CloudWatch metrik alarmı kurmak"
    ]
   },
   {
    "id": "5865e2c9",
    "q": "Mobil uygulama giriş yapan kullanıcının doğrudan S3'ten dosya okuması için geçici AWS kimlik bilgisine ihtiyaç duyuyor. Hangi Cognito bileşeni bunu sağlar?",
    "options": [
     "Identity pool",
     "X-Ray segmenti",
     "User pool tek başına",
     "CloudTrail izi"
    ]
   },
   {
    "id": "596e77e9",
    "q": "Bir S3 kovasının dün kim tarafından silindiğini öğrenmek için hangi servisin kayıtlarına bakılır?",
    "options": [
     "CloudWatch metrikleri",
     "X-Ray izleri",
     "Parameter Store",
     "CloudTrail"
    ]
   }
  ]
 },
 "6": {
  "baslik": "Yeniden deneme, EC2, VPC, Kinesis ve STS",
  "dersler": [
   31,
   36
  ],
  "sorular": [
   {
    "id": "15284deb",
    "q": "Ödeme API'sine gönderilen istek zaman aşımına uğradı ve istemci yeniden deniyor. Çift tahsilatı önlemek için ne yapılmalıdır?",
    "options": [
     "Her denemede yeni bir rastgele anahtar üretmek",
     "Yeniden denemeyi tamamen kaldırıp hata göstermek",
     "Bekleme süresini sıfırlayıp hemen tekrar denemek",
     "Her denemede aynı idempotency key'i göndermek"
    ]
   },
   {
    "id": "27bbf623",
    "q": "Bir güvenlik grubunda yalnızca gelen 443 trafiğine izin verilmiştir. İstemciye dönen yanıt için ek kural gerekir mi?",
    "options": [
     "Evet, giden yönde 443 için ayrı bir kural yazılmalıdır",
     "Hayır, güvenlik grubu durum bilgilidir, yanıta izin verir",
     "Hayır, çünkü güvenlik grupları her trafiğe tümüyle açıktır",
     "Evet, dönüş için geçici portlara ayrıca izin verilmelidir"
    ]
   },
   {
    "id": "dbe38eef",
    "q": "Sağlanmış modda bir Kinesis akışına saniyede 4.000 kayıt yazılıyor; her kayıt yaklaşık 500 bayt. Yazma için en az kaç shard gerekir?",
    "options": [
     "2 shard",
     "1 shard",
     "12 shard",
     "4 shard"
    ]
   },
   {
    "id": "20d02ef5",
    "q": "Başka bir AWS hesabındaki S3 kovasına uzun ömürlü anahtar paylaşmadan erişmek için hangi mekanizma kullanılır?",
    "options": [
     "Kovayı VPC içine alıp ağ erişimi açmak",
     "Hedef hesabın root parolasını paylaşmak",
     "STS ile hedef hesaptaki role AssumeRole yapmak",
     "Hedef hesapta kalıcı bir kullanıcı anahtarı oluşturup göndermek"
    ]
   }
  ]
 },
 "7": {
  "baslik": "SCP, WAF, VPC endpoint ve veri taşıma",
  "dersler": [
   37,
   42
  ],
  "sorular": [
   {
    "id": "913b8bd3",
    "q": "Bir hesapta SCP s3:* eylemine izin veriyor, ancak kullanıcının IAM politikasında hiçbir S3 izni yok. Kullanıcı kovayı listelemeyi dener. Sonuç nedir?",
    "options": [
     "Yalnızca listeleme için kısmi izin otomatik tanımlanır",
     "Reddedilir; SCP yalnızca tavan çizer, izin vermez",
     "İzin verilir, çünkü SCP izin verdiği her eylemi etkinleştirir",
     "İzin verilir, çünkü SCP kullanıcıya yetki atar"
    ]
   },
   {
    "id": "91d06c4c",
    "q": "Bir giriş uç noktasına tekil IP adreslerinden çok sayıda deneme geliyor. İstek hızını HTTP katmanında sınırlamak için ne yapılır?",
    "options": [
     "WAF'a hız kuralı ekleyip ALB'ye bağlamak",
     "Alt ağlar arasında bir VPC endpoint oluşturmak",
     "GuardDuty'yi açıp tüm EC2'lere ajan yüklemek",
     "Güvenlik grubuna HTTP hızına dayalı kural yazmak"
    ]
   },
   {
    "id": "4681217b",
    "q": "İnternet çıkışı (NAT) olmayan özel bir alt ağdaki EC2 örneğinin S3'e özel ağ üzerinden erişmesi için en uygun çözüm hangisidir?",
    "options": [
     "Şirket ağından AWS'ye bir Direct Connect hattı çekmek",
     "Örneğe genel IP verip trafiği internet üzerinden geçirmek",
     "VPC'yi bir Transit Gateway'e bağlayıp yönlendirmek",
     "S3 için gateway endpoint kurup rota tablosuna eklemek"
    ]
   },
   {
    "id": "59dc54c4",
    "q": "Şirket içi bir dosya sunucusundaki birkaç terabaytlık veri, doğrulamalı ve zamanlanabilir biçimde S3'e düzenli taşınacak. Hangi servis uygundur?",
    "options": [
     "AWS WAF",
     "AWS AppConfig",
     "Amazon GuardDuty",
     "AWS DataSync"
    ]
   }
  ]
 },
 "8": {
  "baslik": "SAA depolama, felaket kurtarma ve maliyet",
  "dersler": [
   43,
   51
  ],
  "sorular": [
   {
    "id": "a5572c60",
    "q": "Farklı AZ'lerdeki birçok EC2 örneği aynı dosya kümesini eşzamanlı okuyup yazacak. Hangi depolama uygundur?",
    "options": [
     "Amazon EFS",
     "Örnek deposu (instance store)",
     "Amazon EBS birimi",
     "S3 Glacier Flexible Retrieval"
    ]
   },
   {
    "id": "d052ba44",
    "q": "İş kuralı, felaket durumunda en fazla 15 dakikalık veri kaybını kabul ediyor. Bu hedef hangi kavramla ifade edilir?",
    "options": [
     "SLA (hizmet seviyesi anlaşması)",
     "RTO (kurtarma süresi hedefi)",
     "RPO (kurtarma noktası hedefi)",
     "MTU (azami iletim birimi)"
    ]
   },
   {
    "id": "04bd449a",
    "q": "Nesnelerin erişim örüntüsü bilinmiyor ve zamanla değişiyor. Yönetim yükü olmadan maliyeti düşürecek S3 sınıfı hangisidir?",
    "options": [
     "S3 Intelligent-Tiering",
     "S3 Glacier Deep Archive",
     "S3 Standard-IA",
     "S3 One Zone-IA"
    ]
   },
   {
    "id": "3b218b35",
    "q": "Pilot light felaket kurtarma stratejisinde olay öncesinde ikinci bölgede sürekli çalışan temel parça hangisidir?",
    "options": [
     "Tam kapasiteli tüm uygulama sunucuları",
     "Sürekli çoğaltılan veritabanı",
     "Hiçbir şey, sıfırdan kurulur",
     "Yalnızca bir ölçeklendirme günlük dosyası"
    ]
   }
  ]
 }
};

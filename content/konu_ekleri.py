# -*- coding: utf-8 -*-
from ccna import T
CC=[];SE=[];BKX=[]
def A(lst,names,*a,**k): lst.append((names,T(*a,**k)))
# ---------------- CCNA ----------------
A(CC,["IPv6 temelleri"],"IPv6","IPv4 adresleri tükendi. Yeni milyarlarca cihaz nasıl adres alıyor?",
 [["128 bit","Adres 128 bittir; sekiz grup, onaltılık yazılır"],["Kısaltma","Baştaki sıfırlar atılır; ardışık sıfır grupları bir kez :: olur"],["Link-local","fe80::/10 ile başlar, yalnız aynı bağlantıda geçerlidir"],["SLAAC","Cihaz, yönlendiricinin duyurduğu önekten kendi adresini üretir"]],
 "IPv4'ün 32 bitlik adres alanı yetmiyor. IPv6 çok daha büyük bir adres alanı verir ve ağ sınırında adres çevirme (NAT) ihtiyacını azaltır.",
 "Tam yazım:\n2001:0db8:0000:0000:0000:0000:0000:0001\nKısa yazım:\n2001:db8::1\nİpucu: :: bir adreste yalnız bir kez kullanılır",
 [["IPv6 hesaba katılmazsa","IPv6 destekleyen bir hedefe ulaşırken sorun çıkar ya da güvenlik kuralları IPv6 tarafında boş kalır."],["Çift yığın (IPv4+IPv6) yanlış kurulursa","Bazı siteler yavaş açılır ya da hiç açılmaz."]],
 [["2001:0db8:0000:0000:0000:0000:0000:0001 adresinin kısa hali","2001:db8::1","2001:db8:1","2001::db8::1"],["IPv6 adresi kaç bittir","128","32","64"],["fe80:: ile başlayan adres hangi türdür","Link-local","Global unicast","Multicast"]],
 ["IPv6 adresini okumayı ve kısaltmayı","Link-local adresi tanımayı","SLAAC fikrini"],"Sonunda bir IPv6 adresini kısaltıp türünü söyleyebileceksin.",None)
A(CC,["STP ve EtherChannel"],"STP ve EtherChannel","Switch'ler arasına yedek kablo çektin ama ağ yavaşladı ve çöktü. Neden?",
 [["Döngü","Switch'ler arası halka, yayın paketlerini sonsuza dek döndürür (broadcast storm)"],["STP","Spanning Tree: fazla yolları engeller, döngüyü keser"],["Kök köprü","En düşük bridge ID'ye (öncelik + MAC) sahip switch; yollar ona göre seçilir"],["EtherChannel","Birden çok fiziksel bağlantıyı tek mantıksal bağlantı yapar (LACP ile)"]],
 "Yedek yol iyidir ama switch ağında döngü felaket olur. STP yedek yolu hazırda bekletir; EtherChannel ise yedek kabloyu boşa beklemez, hızı toplar.",
 "3 switch üçgen bağlı:\nSW1(kök) ─ SW2\nSW1 ─ SW3\nSW2 ─ SW3  ← STP bu bağlantıyı engeller (blocking)\nSW1-SW2 arasında 2 kablo + EtherChannel = 2 kat hız, tek mantıksal link",
 [["STP kapatılırsa","Bir döngüde yayın fırtınası ağı kilitler."],["EtherChannel iki uçta farklı ayarlanırsa","Bağlantı birleşmez ya da döngü oluşur."]],
 [["Switch döngüsünü önleyen protokol","STP","OSPF","DHCP"],["Kök köprü neye göre seçilir","En düşük bridge ID","En hızlı port","En çok bağlı cihaz"],["Birden çok kabloyu tek mantıksal bağlantıda toplamak","EtherChannel","VLAN","NAT"]],
 ["Döngünün neden tehlikeli olduğunu","Kök köprü seçimini","EtherChannel'in amacını"],"Sonunda üç switch'lik bir ağda hangi portun engelleneceğini açıklayabileceksin.",None)
A(CC,["NTP, Syslog ve SNMP"],"NTP, Syslog ve SNMP","Gece üçte router çöktü. Loglara bakıyorsun ama her cihazın saati farklı. Olayı nasıl sıralarsın?",
 [["NTP","Saati ortak kaynaktan eşitler (UDP 123)"],["Syslog","Cihaz mesajlarını merkeze yollar (UDP 514); önem derecesi 0 Emergency'den 7 Debug'a"],["SNMP","Yönetim istasyonu cihazlardan veri sorar ya da cihaz uyarı (trap) yollar (UDP 161/162)"],["Merkezi izleme","Tüm cihazlar tek yerde görünür"]],
 "Güvenilir olay çözümlemesi için önce saatler eşit olmalı, sonra loglar bir yerde toplanmalı. SNMP ile de cihaz sağlığı sürekli izlenir.",
 "Router → Syslog sunucusu: %LINK-3-UPDOWN: Interface Gi0/1, changed state to down\nNTP olmadan: log saati 03:14, öbür cihazda 03:19 → olay sırası karışır\nSNMP: izleme sistemi her 5 dakikada CPU yüzdesini sorar",
 [["NTP yoksa","Loglar birbirini doğrulamaz; sertifika ve oturum hataları da çıkabilir."],["Syslog merkezi yoksa","Cihaz çökünce loglar da gider."]],
 [["Cihaz saatlerini eşitlemek","NTP","Syslog","SNMP"],["Cihazdan merkeze log mesajı yollamak","Syslog","NTP","DHCP"],["Cihazdan uyarı (trap) göndermek ve veri sorgulamak","SNMP","ACL","NAT"]],
 ["NTP, Syslog ve SNMP'nin işini ayırmayı","Syslog önem derecelerini","Merkezi izleme fikrini"],"Sonunda bir ağ izleme düzeninin üç parçasını eşleştirebileceksin.",None)
A(CC,["QoS temelleri"],"QoS","Aynı hatta hem video görüşme hem dosya indirme var. Görüşme neden takılır?",
 [["Bant genişliği","Birim zamanda geçen veri miktarı"],["Gecikme ve jitter","Gecikme: yolculuk süresi; jitter: gecikmenin dalgalanması"],["Sınıflandırma ve işaretleme","Trafik türünü tanıyıp DSCP gibi etiket koymak"],["Kuyruklama","Önemli trafiği öne almak"]],
 "Hat doluyken tüm paketler eşit davranılırsa ses ve video bozulur. QoS, zamana duyarlı trafiği öne alır.",
 "Ses (VoIP): gecikme düşük, jitter düşük olmalı → öncelikli kuyruk\nDosya indirme: gecikme önemsiz → normal kuyruk\nAkış: Sınıflandır → işaretle → kuyruğa koy",
 [["QoS yoksa","Hat yoğunlaşınca görüntülü görüşme kopar, indirme ise hatta hiç aksamaz."],["Her trafiği öncelikli yaparsan","Öncelik anlamsızlaşır."]],
 [["Ses ve video için neden QoS kullanılır","Gecikme ve jitter'a duyarlıdır","Dosya boyutu büyüktür","Şifreli olduğu için"],["Trafiğe öncelik etiketi koymak","İşaretleme (marking)","NAT","Trunk"],["Gecikmenin dalgalanmasına ne denir","Jitter","Bant genişliği","TTL"]],
 ["QoS'un neden gerektiğini","Gecikme ve jitter farkını","Sınıflandır, işaretle, kuyrukla akışını"],"Sonunda hangi trafiğe öncelik vereceğini gerekçeyle seçebileceksin.",None)
A(CC,["Otomasyon ve programlanabilirlik"],"Otomasyon ve programlanabilirlik","Yüz switch'e aynı ayarı elle girmek mi, tek betikle yollamak mı?",
 [["Düzlemler","Veri (iletme), kontrol (karar) ve yönetim düzlemi"],["SDN / denetleyici","Kontrol merkezi bir yazılımdadır; ağı API ile yönetir"],["REST ve JSON","HTTP ile (GET, POST, PUT, DELETE) JSON veri alışverişi"],["Araçlar","Ansible: ajansız, YAML ile; Puppet ve Chef: ajanla; Terraform: kodla altyapı"]],
 "Elle yapılan iş tekrar eder, hata üretir. Otomasyon aynı işi tutarlı, hızlı ve denetlenebilir yapar.",
 "GET /api/devices  → cihaz listesi (JSON)\nPOST /api/vlans   → yeni VLAN oluştur\nAnsible playbook (YAML):\n- hosts: switches\n  tasks:\n  - name: VLAN 10 ekle",
 [["Otomasyon test edilmeden çalıştırılırsa","Hatalı ayar yüz cihaza birden yayılır."],["API anahtarı sızarsa","Tüm ağı yönetme yetkisi başkasına geçer."]],
 [["Ağı merkezi yazılımla programlanabilir yapan yaklaşım","SDN","STP","QoS"],["Yeni VLAN oluşturmak için hangi HTTP yöntemi","POST","GET","DELETE"],["Ajansız ve YAML kullanan araç","Ansible","Puppet","Syslog"]],
 ["Veri, kontrol ve yönetim düzlemini ayırmayı","REST yöntemlerini","Ansible, Puppet, Chef farkını"],"Sonunda bir ağ görevini el yerine API ya da betikle yapma gerekçesini yazabileceksin.",None)

# ---------------- SEC (SY0-801 ek konular) ----------------
A(SE,["Yapay zekâ riskleri"],"Yapay zekâ riskleri","Çalışan, müşteri verisini kurum dışı bir sohbet botuna yapıştırdı. Ne olabilir?",
 [["Prompt injection","Girdiyle yapay zekânın talimatını ele geçirme"],["Veri sızıntısı","Gizli veri modele ya da üçüncü tarafa gider"],["Veri zehirleme","Eğitim verisini bozup modeli yanıltma"],["YZ destekli saldırı","Derin sahte (deepfake) ses/video ve ikna edici oltalama"]],
 "Yapay zekâ üretkenlik katar ama yeni saldırı yüzeyi de açar. Hem kurumun kullandığı YZ'yi hem saldırganın kullandığı YZ'yi hesaba katmak gerekir.",
 "Risk örnekleri:\n1) Çalışan gizli kodu bir dış sohbet botuna yapıştırır → sızıntı\n2) Gelen e-postadaki gizli talimat YZ asistanını yönlendirir → prompt injection\n3) Yönetici sesini taklit eden arama → deepfake dolandırıcılığı\nÖnlem: onaylı araç listesi, veri sınıflandırma, çıktıyı doğrulama, geri arama ile teyit",
 [["Kontrol yoksa","Gizli veri farkında olmadan dışarı çıkar (gölge YZ)."],["YZ çıktısına körü körüne güvenilirse","Yanlış ya da zararlı sonuç işleme girer."]],
 [["Girdiyle yapay zekâ talimatını ele geçirmek","Prompt injection","Phishing","SQL injection"],["Eğitim verisini bozup modeli yanıltmak","Veri zehirleme","DDoS","Port taraması"],["Yönetici sesini taklit eden sahte arama","Deepfake","Fidye yazılımı","Rootkit"]],
 ["YZ'nin yeni risklerini ayırmayı","Prompt injection ve veri zehirlemeyi","Çalışanlar için güvenli kullanım kuralını"],"Sonunda bir kurum için basit bir YZ kullanım kuralı taslağı çıkarabileceksin.",None)
A(SE,["Zero Trust"],"Zero Trust","Ofis ağına girdin diye sana her kapı mı açılmalı?",
 [["Asla güvenme, hep doğrula","Ağın içinde olmak güven sağlamaz"],["En az yetki","Her isteğe yalnız gereken erişim verilir"],["Sürekli doğrulama","Kimlik, cihaz ve bağlam her istekte kontrol edilir"],["Mikro segmentasyon","Ağ küçük bölgelere ayrılır; yanal hareket zorlaşır"]],
 "Eski model kale-hendek gibiydi: içeri girene güvenirdi. Zero Trust, saldırgan içeri girse bile her adımda yeniden doğrulatır.",
 "İstek: Ali → Muhasebe sunucusu\nKontrol: kimlik (MFA) + cihaz sağlıklı mı + saat ve konum normal mi\nSonuç: yalnız ihtiyaç duyduğu uygulamaya, o oturum için izin\nŞüpheli bağlam → ek doğrulama ya da ret",
 [["Zero Trust uygulanmazsa","Tek ele geçirilmiş hesap iç ağda her yere ulaşabilir."],["Aşırı sıkı kurulursa","Çalışanlar işini yapamaz; istisnalar çoğalır."]],
 [["Zero Trust'un temel fikri","Asla güvenme, hep doğrula","Ağ içindekilere tam güven","Yalnız güvenlik duvarı"],["Saldırganın ağ içinde yanal hareketini zorlaştırmak","Mikro segmentasyon","Daha uzun parola","Yedekleme"],["Her isteğe yalnız gereken erişimi vermek","En az yetki","Geniş yetki","Ortak hesap"]],
 ["Kale-hendek ile Zero Trust farkını","Sürekli doğrulamayı","Mikro segmentasyonu"],"Sonunda bir uygulama için Zero Trust erişim kuralı yazabileceksin.",None)
A(SE,["Değişiklik yönetimi"],"Değişiklik yönetimi","Cuma akşamı 'küçük bir ayar' yaptın ve ertesi sabah sistem çöktü. Neyi atladın?",
 [["Değişiklik talebi","Ne, neden, kim, ne zaman yazılı istenir"],["Etki analizi ve onay","Neleri etkileyeceğine bakılır; yetkili onaylar"],["Geri alma planı","Olmazsa nasıl eski hale dönüleceği baştan yazılır"],["Bakım penceresi ve kayıt","Uygun zamanda yapılır, sonuç belgelenir"]],
 "Plansız değişiklik, kesinti ve güvenlik açığının sık nedenidir. Süreç hızı yavaşlatmak için değil, hatayı küçük ve geri alınabilir tutmak için vardır.",
 "Talep: Güvenlik duvarına yeni kural\nEtki: Ödeme servisi etkilenebilir\nOnay: Ağ lideri\nPlan: Cumartesi 02:00; test; geri alma = eski kuralı geri yükle\nSonuç: Kaydedildi",
 [["Süreç yoksa","Kimin neyi ne zaman değiştirdiği bilinmez, sorun çözmek zorlaşır."],["Geri alma planı yoksa","Bozulan sistem uzun süre kapalı kalır."]],
 [["Değişiklik başarısız olursa eski hale dönmek için ne gerekir","Geri alma planı","Daha fazla yetki","Yeni parola"],["Değişikliğin neleri etkileyeceğini değerlendirmek","Etki analizi","Yedekleme","Sızma testi"],["Değişikliği kimin onaylayacağı baştan belli olmalı","Doğru","Yanlış","Fark etmez"]],
 ["Değişiklik sürecinin adımlarını","Geri alma planının önemini","Etki analizini"],"Sonunda bir değişikliği talep, onay ve geri alma planıyla yazabileceksin.",None)

# ---------------- BK (DVA-C02 kapsamındaki ek hizmetler) ----------------
A(BKX,["EC2, yük dengeleyici ve Auto Scaling"],"EC2, ELB ve Auto Scaling","Siten bir gecede dört kat trafik alırsa tek sunucu yeter mi?",
 [["EC2","Bulutta sanal sunucu; makine görüntüsü (AMI) ve örnek türü seçersin"],["Yük dengeleyici (ELB)","İstekleri sağlıklı sunucular arasında dağıtır; ALB HTTP'yi anlar"],["Auto Scaling grubu","En az, istenen ve en çok sunucu sayısını tutar; yüke göre artırır azaltır"],["Sağlık kontrolü","Bozulan sunucu devreden çıkarılır, yenisi açılır"]],
 "Tek sunucu hem kapasiteyi hem erişilebilirliği sınırlar. Dengeleyici ve otomatik ölçekleme, yükü ve arızayı birlikte karşılar.",
 "İstemci → ALB → [EC2 A] [EC2 B] [EC2 C]\nAuto Scaling: en az 2, en çok 6\nCPU %70 üstü → sunucu ekle; sakinleşince → sil\nA bozulursa ALB trafiği yollamaz, ASG yeni sunucu açar",
 [["Sağlık kontrolü yoksa","Bozuk sunucuya istek gitmeye devam eder."],["Sunucu içinde oturum tutulursa","Ölçeklenince kullanıcılar oturumunu kaybeder; oturumu dışarıda tut."]],
 [["İstekleri sunucular arasında dağıtmak","Elastic Load Balancing","Amazon S3","AWS KMS"],["Yüke göre sunucu sayısını otomatik artırıp azaltmak","Auto Scaling","CloudTrail","Route 53"],["HTTP isteğini yol ve başlığa göre yönlendiren dengeleyici","Application Load Balancer","Gateway Load Balancer","Elastic IP"]],
 ["EC2, ELB ve ASG üçlüsünü","Sağlık kontrolünü","Durumsuz (stateless) uygulama fikrini"],"Sonunda trafik artışına dayanan basit bir mimariyi çizebileceksin.",None)
A(BKX,["VPC ve güvenlik grupları"],"VPC ve güvenlik grupları","Veritabanın internetten görünür olmalı mı?",
 [["VPC","Hesabındaki sanal özel ağ; IP aralığını sen seçersin"],["Genel ve özel alt ağ","Genel: internet çıkışı (Internet Gateway); özel: doğrudan değil"],["NAT Gateway","Özel alt ağdaki kaynakların internete çıkmasını sağlar, içeri almaz"],["Güvenlik grubu ve NACL","Güvenlik grubu: örnek düzeyinde, durumlu (stateful), yalnız izin; NACL: alt ağ düzeyinde, durumsuz, izin ve ret"]],
 "Ağ sınırı yanlış çizilirse veri doğrudan internete açılır. Doğru kurulum, yalnız gereken yolu açar.",
 "VPC 10.0.0.0/16\n Genel alt ağ: ALB (internetten 443)\n Özel alt ağ: uygulama + veritabanı\nVeritabanı güvenlik grubu: yalnız uygulama güvenlik grubundan 5432'ye izin\nÖzel alt ağdan dışarı: NAT Gateway",
 [["Veritabanı genel alt ağda ve 0.0.0.0/0'a açıksa","İnternetten saldırıya açık olur."],["Güvenlik grubu aşırı geniş yazılırsa","Her kaynak her kaynağa ulaşır."]],
 [["Güvenlik grubu hangi düzeyde ve nasıl çalışır","Örnek düzeyi, durumlu, yalnız izin","Alt ağ düzeyi, durumsuz","Hesap düzeyi, yalnız ret"],["Özel alt ağdaki sunucunun internete çıkması için","NAT Gateway","Internet Gateway'e doğrudan bağlamak","Elastic IP yeter"],["Alt ağ düzeyinde, durumsuz ve ret kuralı yazılabilen","NACL","Güvenlik grubu","IAM politikası"]],
 ["Genel ve özel alt ağ farkını","Güvenlik grubu ile NACL'yi","NAT Gateway'in rolünü"],"Sonunda üç katmanlı bir uygulamanın alt ağ ve güvenlik grubu planını çizebileceksin.",None)
A(BKX,["CloudFront ve Route 53"],"CloudFront ve Route 53","Sitenin görselleri uzaktaki bir sunucudan geliyor ve geç yükleniyor. Nasıl yaklaştırırsın?",
 [["CloudFront","İçeriği dünya çapındaki uç noktalarda önbelleğe alan CDN"],["Önbellek ve TTL","İçerik uçta ne kadar saklanır; değişince geçersiz kılma (invalidation) yapılır"],["Origin erişimi","S3'ü doğrudan açma; yalnız CloudFront erişsin (OAC)"],["Route 53","DNS hizmeti; ağırlıklı, gecikmeye göre ve yedekleme (failover) yönlendirme politikaları"]],
 "Kullanıcıya yakın uçtan sunmak gecikmeyi ve kaynak yükünü azaltır. Route 53 de trafiği doğru yere ve sağlıklı kopyaya yollar.",
 "Kullanıcı → CloudFront (uç) → önbellekte var: hemen ver\n                          → yok: S3'ten çek, sakla\nRoute 53: www.site.com → CloudFront\nFailover: ana bölge sağlıksızsa yedek bölgeye yönlendir",
 [["Önbellek süresi hatalı olursa","Eski içerik gösterilir ya da önbellek işe yaramaz."],["S3 herkese açık bırakılırsa","İçerik CloudFront'u atlayıp sızabilir."]],
 [["İçeriği kullanıcıya yakın uçlarda önbelleğe alan hizmet","Amazon CloudFront","Amazon RDS","AWS Lambda"],["DNS yönetimi ve yönlendirme politikaları sunan hizmet","Amazon Route 53","Amazon SQS","AWS X-Ray"],["Eski önbelleği hemen temizlemek için","Invalidation","Yeni bucket açmak","Bölge değiştirmek"]],
 ["CDN mantığını","Önbellek ve geçersiz kılmayı","Route 53 yönlendirme politikalarını"],"Sonunda statik bir siteyi hızlandıran dağıtım akışını anlatabileceksin.",None)
A(BKX,["Kinesis ve akış verisi"],"Kinesis","Saniyede binlerce tıklama olayı geliyor. Her birini tek tek işlemeye mi çalışacaksın?",
 [["Akış (stream)","Sürekli gelen olay verisi"],["Kinesis Data Streams","Veriyi parçalara (shard) bölerek tutar; birden çok tüketici okuyabilir"],["Bölme anahtarı","Aynı anahtarlı kayıtlar aynı shard'a gider ve sırası korunur"],["Firehose","Akışı S3, Redshift gibi hedeflere hazır taşır; kendin okumazsın"]],
 "SQS her mesajı bir kez işlenip silinen iş kuyruğudur. Akış verisinde ise olayların sırası ve birden çok tüketicinin okuması gerekir; bunun için Kinesis uygundur.",
 "Uygulama → [Stream: shard1 shard2] → Tüketici A (anlık pano)\n                                    → Tüketici B (arşive yaz)\nBölme anahtarı = kullanıcıId → bir kullanıcının olayları sıralı kalır\nFirehose: akıştan doğrudan S3'e arşiv",
 [["Bölme anahtarı dengesizse","Bir shard aşırı yüklenir (sıcak shard), diğerleri boş kalır."],["Saklama süresi kaçırılırsa","Okunmayan eski kayıtlar silinir."]],
 [["Sürekli akan olay verisini sıralı ve çok tüketicili işlemek","Kinesis Data Streams","Amazon S3","AWS KMS"],["Akışı hazır şekilde S3'e taşımak","Kinesis Data Firehose","Amazon EBS","AWS SAM"],["Aynı kullanıcının olaylarını sıralı tutmak için","Aynı bölme anahtarını kullanmak","Her olaya rastgele anahtar","Shard sayısını sıfırlamak"]],
 ["Akış ve kuyruk farkını","Shard ve bölme anahtarını","Firehose'un rolünü"],"Sonunda bir olay akışı için hangi hizmeti seçeceğini gerekçeyle yazabileceksin.",None)
A(BKX,["STS ve geçici kimlik bilgileri"],"STS ve geçici kimlik","Uygulamana kalıcı bir erişim anahtarı vermek yerine ona 'bir saatlik kart' versek?",
 [["STS","Security Token Service: kısa ömürlü kimlik bilgisi üretir"],["AssumeRole","Bir rolü geçici olarak üstlenmek; erişim anahtarı, gizli anahtar ve oturum belirteci döner"],["Hesaplar arası erişim","Başka hesaptaki role güven ilişkisiyle girmek"],["Neden geçici","Süresi dolar; sızsa bile zarar sınırlı kalır"]],
 "Kalıcı anahtar sızarsa yıllarca kullanılabilir. Geçici bilgiler kendiliğinden ölür ve rol bazlı en az yetkiyle çalışır.",
 "Uygulama → sts:AssumeRole(roleArn) → geçici AccessKey + SecretKey + SessionToken (örn. 1 saat)\nBu bilgilerle S3'e erişir; süre dolunca yenisi alınır\nLambda ve EC2 üzerinde rol zaten otomatik geçici bilgi sağlar",
 [["Kalıcı anahtar koda gömülürse","Depo sızınca hesap ele geçirilir."],["Rol güven ilişkisi gevşek bırakılırsa","İstenmeyen hesaplar rolü üstlenebilir."]],
 [["Kısa ömürlü kimlik bilgisi üreten hizmet","AWS STS","Amazon S3","Amazon SNS"],["Başka hesaptaki role geçici girmek için çağrılan eylem","AssumeRole","PutObject","Invoke"],["Geçici kimlik bilgisinde anahtar ve gizli anahtarın yanında ne bulunur","Oturum belirteci","Parola","Sertifika"]],
 ["Geçici ve kalıcı kimlik farkını","AssumeRole akışını","Neden rol tercih edildiğini"],"Sonunda anahtarsız, rol tabanlı erişim akışını anlatabileceksin.",None)
A(BKX,["Parameter Store ve AppConfig"],"Parameter Store ve AppConfig","Aynı kod hem test hem üretimde çalışıyor ama ayarlar farklı. Ayarları nereye koyarsın?",
 [["Parameter Store","Ayar ve (şifreli) gizli değerleri hiyerarşik yolda saklar: /app/prod/db-url"],["AppConfig","Ayarı kademeli ve doğrulamalı yayınlar; sorun çıkarsa geri alır"],["Ayrım","Kod aynı kalır, ortama göre ayar değişir"],["Secrets Manager farkı","Secrets Manager otomatik parola döndürme sunar; Parameter Store daha basit ve ucuz ayardır"]],
 "Ayarı koda gömmek her değişiklikte yeniden yayın ister ve gizli bilgiyi sızdırabilir. Dışarı almak hem güvenli hem esnektir.",
 "/myapp/test/db-url = test-db...\n/myapp/prod/db-url = prod-db... (SecureString, KMS ile şifreli)\nLambda: ortam adına göre yolu okur\nAppConfig: yeni ayarı %10 kullanıcıya aç, hata yoksa genişlet",
 [["Ayar koda gömülürse","Her değişiklik yeni yayın ister; parola depoya sızar."],["AppConfig doğrulaması yoksa","Hatalı ayar tüm kullanıcılara bir anda yayılır."]],
 [["Ayarları hiyerarşik yolda saklayan hizmet","Parameter Store","Amazon SQS","CloudFront"],["Ayarı kademeli ve doğrulamalı yayınlayan hizmet","AWS AppConfig","Amazon EBS","AWS WAF"],["Otomatik parola döndürme için daha uygun olan","Secrets Manager","Düz metin ortam değişkeni","Kod içi sabit"]],
 ["Ayarı koddan ayırmayı","Parameter Store ve AppConfig farkını","Secrets Manager ile farkını"],"Sonunda test ve üretim için ayar yollarını tasarlayabileceksin.",None)
A(BKX,["AWS CDK ve AppSync"],"AWS CDK ve AppSync","Altyapıyı YAML yerine tanıdık bir programlama diliyle tarif edebilsen?",
 [["CDK","Altyapıyı Python, TypeScript gibi dillerle tanımlar; CloudFormation'a çevrilir"],["Yapı (construct)","Hazır altyapı bileşeni; döngü ve fonksiyonla çoğaltılır"],["AppSync","Yönetilen GraphQL API; istemci tam istediği alanı ister"],["Çözücü (resolver)","İsteği DynamoDB, Lambda gibi kaynağa bağlar"]],
 "Büyük altyapıda YAML tekrar eder. CDK tekrarı koda döker. AppSync ise istemciye gereksiz veri taşıtmadan esnek API sunar.",
 "CDK (Python):\nbucket = s3.Bucket(self, 'Dosyalar', versioned=True)\ncdk deploy → CloudFormation yığını\nGraphQL sorgusu:\nquery { urun(id: 7) { ad fiyat } }  → yalnız ad ve fiyat döner",
 [["CDK çıktısı gözden geçirilmezse","Beklenmeyen kaynak açılır; cdk diff ile önce bak."],["GraphQL'de yetki unutulursa","Her alan herkese açık kalabilir."]],
 [["Altyapıyı programlama diliyle tanımlayıp CloudFormation'a çeviren araç","AWS CDK","AWS CLI","AWS X-Ray"],["Yönetilen GraphQL API hizmeti","AWS AppSync","Amazon SNS","Amazon ECR"],["Dağıtımdan önce hangi değişikliklerin olacağını görmek için","cdk diff","cdk destroy","aws configure"]],
 ["CDK ve CloudFormation ilişkisini","GraphQL'in REST'ten farkını","AppSync çözücülerini"],"Sonunda küçük bir altyapıyı CDK ile tarif edebileceksin.",None)

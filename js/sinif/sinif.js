"use strict";
/* ---- Sınıf: karakterler gelir, canlı ders ---- */
function figure(id,mood){
  var c=CH[id]||CH.kocag,ink="#2a1f1a";
  var g=[];
  g.push(sv("path",{d:"M6 96 C6 70 22 62 40 62 C58 62 74 70 74 96 Z",fill:c.top}));
  if(id==="elnur")g.push(sv("path",{d:"M40 64 L36 72 L40 92 L44 72 Z",fill:"#e9e9ef"}));
  g.push(sv("rect",{x:35,y:52,width:10,height:13,rx:3,fill:c.skin,opacity:.85}));
  g.push(sv("ellipse",{cx:40,cy:36,rx:18,ry:20,fill:c.skin}));
  if(id==="ayse"){g.push(sv("circle",{cx:40,cy:11,r:8,fill:c.hair}),sv("path",{d:"M22 34 C21 14 59 14 58 34 C52 24 28 24 22 34Z",fill:c.hair}),sv("circle",{cx:22,cy:46,r:2.4,fill:"#e8c35a"}),sv("circle",{cx:58,cy:46,r:2.4,fill:"#e8c35a"}))}
  else if(id==="demir"){g.push(sv("path",{d:"M22 32 C25 15 55 15 58 32 C51 24 29 24 22 32Z",fill:c.hair}),sv("circle",{cx:33,cy:37,r:6,fill:"none",stroke:ink,"stroke-width":1.6}),sv("circle",{cx:47,cy:37,r:6,fill:"none",stroke:ink,"stroke-width":1.6}),sv("path",{d:"M39 37 L41 37",stroke:ink,"stroke-width":1.6}))}
  else if(id==="zeynep"){g.push(sv("path",{d:"M21 36 C20 13 60 13 59 36 C53 24 27 24 21 36Z",fill:c.hair}),sv("path",{d:"M58 28 C72 32 70 52 60 58",fill:"none",stroke:c.hair,"stroke-width":6,"stroke-linecap":"round"}))}
  else if(id==="elnur"){g.push(sv("path",{d:"M22 34 C22 12 58 12 58 34 C52 22 28 22 22 34Z",fill:c.hair}))}
  else {g.push(sv("path",{d:"M22 34 C22 14 58 14 58 34 C52 24 28 24 22 34Z",fill:c.hair}),sv("path",{d:"M20 38 C19 8 61 8 60 38",fill:"none",stroke:"#9aa5b1","stroke-width":3}),sv("path",{d:"M20 40 L22 50 L30 52",fill:"none",stroke:"#9aa5b1","stroke-width":2.4,"stroke-linecap":"round"}))}
  if(mood==="happy"){
    g.push(sv("path",{d:"M29 38 Q33 33 37 38",fill:"none",stroke:ink,"stroke-width":2,"stroke-linecap":"round"}),sv("path",{d:"M43 38 Q47 33 51 38",fill:"none",stroke:ink,"stroke-width":2,"stroke-linecap":"round"}),sv("path",{d:"M32 47 Q40 56 48 47",fill:"none",stroke:ink,"stroke-width":2,"stroke-linecap":"round"}));
  }else if(mood==="worried"){
    g.push(sv("circle",{cx:33,cy:39,r:2.2,fill:ink}),sv("circle",{cx:47,cy:39,r:2.2,fill:ink}),sv("path",{d:"M28 31 L37 34",stroke:ink,"stroke-width":1.8,"stroke-linecap":"round"}),sv("path",{d:"M52 31 L43 34",stroke:ink,"stroke-width":1.8,"stroke-linecap":"round"}),sv("path",{d:"M33 52 Q40 46 47 52",fill:"none",stroke:ink,"stroke-width":2,"stroke-linecap":"round"}));
  }else{
    g.push(sv("circle",{cx:33,cy:38,r:2.2,fill:ink}),sv("circle",{cx:47,cy:38,r:2.2,fill:ink}),sv("path",{d:"M34 50 L46 50",stroke:ink,"stroke-width":2,"stroke-linecap":"round"}));
  }
  return sv.apply(null,["svg",{width:88,height:106,viewBox:"0 0 80 96",role:"img","aria-label":c.n}].concat(g));
}
function charBox(id,mood){
  var c=CH[id]||CH.kocag;
  return h("div",{class:"fig"},figure(id,mood),h("div",{class:"who"},c.n),h("div",{class:"role"},c.role));
}
var STARTER={ccna:[
["Ağ nedir? Cihazlar ve kablolar","Temeller","Şehirdeki yollar ve kavşaklar gibi: cihazlar kavşak, kablolar yol."],
["IP adresi ve alt ağ maskesi","Adresleme","Mahalle ve kapı numarası: maske mahalleyi, host kısmı kapıyı gösterir."],
["Subnetting (alt ağlara bölme)","Adresleme","Büyük bir apartman sitesini bloklara bölmek."],
["MAC adresi ve Switch","Switching","Daire zili etiketleri: switch hangi zilin hangi dairede olduğunu bilir."],
["VLAN","Switching","Aynı binada ayrı kat kartları: herkes sadece kendi katına girer."],
["Router ve yönlendirme (static route)","Routing","Navigasyon: hedefe giden yolu tarif eder."],
["DHCP ve DNS","Servisler","Otelde oda anahtarı (DHCP) ve rehber defteri (DNS)."],
["NAT","Servisler","Şirket santrali: dışarıdan tek numara, içeride dahili hatlar."],
["ACL (erişim listesi)","Güvenlik","Kapıdaki görevli ve izin listesi."],
["OSPF (temel)","Routing","Şehir haritasını komşularla paylaşıp en kısa yolu bulmak."],
["Kablosuz ağ (Wi-Fi) temelleri","Kablosuz","Radyo kanalı: aynı frekansta çok kişi bağırırsa karışır."],
["Ağ güvenliği temelleri","Güvenlik","Evin kapısı, kilidi ve alarmı: katmanlı koruma."], ["IPv6 temelleri", "Adresleme", "Yeni mahalle: adresler bitti, çok daha uzun posta kodu."], ["STP ve EtherChannel", "Switching", "Trafik ışığı: döngüyü kes, çok şeritli yol aç."], ["NTP, Syslog ve SNMP", "Servisler", "Ortak saat, merkezi defter ve nöbetçi gözlemci."], ["QoS temelleri", "Servisler", "Ambulans şeridi: acil trafik öne geçer."], ["Otomasyon ve programlanabilirlik", "Otomasyon", "Tek tek elle çevirme yerine tek komutla yüz kapı."], ["Ağ topolojileri ve mimarileri", "Temeller", "Şehir planı: sokaklar, ana caddeler ve çevre yolu ayrı görevler üstlenir."], ["Sanallaştırma, konteyner ve bulut kavramları", "Bulut", "Apartman daireleri kendi mutfağıyla (sanal makine), pansiyon odaları ortak mutfakla (konteyner)."], ["TCP ve UDP", "Taşıma", "Taahhütlü kargo (TCP) ile postaya atılan kart (UDP)."], ["CDP, LLDP, DTP ve trunk ayrıntısı", "Switching", "Kapıdaki isim tabelası ve bina içi ortak koridor: komşu kendini tanıtır, koridordan birden çok kat geçer."], ["FHRP ve HSRP (ilk atlama yedekliliği)", "Routing", "İki kapıcılı bina: gelen ziyaretçi hep aynı kapı numarasını arar, kapıcı değişse de fark etmez."], ["VPN ve uzaktan erişim", "Güvenlik", "Kalabalık yolda zırhlı geçit: kendi şifreli tünelin içinden geçersin."]],
sec:[
["Güvenlik nedir? Varlık, tehdit, zafiyet","Temeller","Evin kapısı: neyi, kimden, nasıl koruduğunu bilmeden kilit seçemezsin."],
["CIA üçlüsü: gizlilik, bütünlük, erişilebilirlik","Temeller","Kasa, mühür ve açık kapı."],
["Şifreleme ve hash","Temeller","Kilitli kutu ve parmak izi."],
["Kimlik doğrulama ve yetkilendirme (MFA)","Kimlik","Otelde kimlik göstermek ve sadece kendi odanı açmak."],
["Tehdit aktörleri ve saldırı türleri","Tehditler","Kapıdaki farklı tip hırsızlar."],
["Oltalama ve sosyal mühendislik","Tehditler","Elektrik idaresinden geldim diyen sahte memur."],
["Zafiyet yönetimi ve tarama","Operasyon","Bina denetçisi: açık pencereleri bulur ve sıralar."],
["Ağ güvenliği: güvenlik duvarı ve segmentasyon","Mimari","Sitenin kapı görevlisi ve bölümlere ayrılmış bloklar."],
["Log ve izleme (SIEM)","Operasyon","Güvenlik kameraları ve nöbetçi."],
["Olay müdahalesi","Operasyon","Yangın tatbikatı: kim ne yapar."],
["Risk yönetimi ve politikalar","Yönetişim","Sigorta ve ev kuralları."],
["Yedekleme ve kurtarma","Mimari","Yedek anahtar ve yangına karşı kasa."]],
bk:[
["İstemci-sunucu ve HTTP","Temeller","Garson ve mutfak."],
["REST API tasarımı","API","Restoran menüsü: ne isteyebileceğin belli."],
["JSON ve veri biçimleri","API","Herkesin okuyabildiği standart form."],
["Veritabanı ve SQL","Veri","Düzenli arşiv dolabı."],
["Kimlik doğrulama: JWT","Güvenlik","Etkinlik bileği: bir kere gösterirsin, içeride gezersin."],
["Hata yönetimi ve loglama","Kalite","Arızada yanan uyarı lambası ve kara kutu."],
["Birim test","Kalite","Her tuğlayı tek tek denemek."],
["Git ve CI/CD","Dağıtım","Fabrika bandı ve kalite kontrol."],
["AWS Lambda ve API Gateway","Bulut","Sipariş kapısı ve istek başına çalışan aşçı."],
["DynamoDB ve S3","Bulut","Anahtarla çalışan hızlı dolap ve büyük depo."],
["IAM, en az yetki, Secrets Manager","Güvenlik","Kimin hangi odanın anahtarına sahip olacağı."],
["CloudWatch ve hata ayıklama","Kalite","Gösterge paneli ve kara kutu."]],
eng:[
["Tanışma ve kendini tanıtma","Konuşma","30 saniyelik asansör konuşması."],
["Present simple: alışkanlık ve işler","Dilbilgisi","Günlük program tabelası."],
["Past simple: dün ne yaptım","Dilbilgisi","Fotoğraf albümü."],
["Soru kurmak (do/does/did)","Dilbilgisi","Sıra değiştirme oyunu."],
["Can / could: rica ve yetenek","Konuşma","Nazik kapı çalma."],
["İş e-postası yazmak","İş İngilizcesi","Zarfı doğru doldurmak: tanı, söyle, teşekkür et."],
["Stand-up: dün, bugün, engel","İş İngilizcesi","Telgraf: gereksizi at."],
["Toplantıda anlamadığını söylemek","İş İngilizcesi","Radyo: 'tekrar eder misin?'"],
["Teknik kelimeler: IT günlük dili","Kelime","Alet çantasındaki aletlerin adı."],
["Hata anlatmak (bug report)","İş İngilizcesi","Polis tutanağı: olguları yaz."],
["Mülakat: kendimi anlatırım","Konuşma","Vitrin: en iyi yanını göster."],
["Kod incelemesi: PR yorumu yazmak ve yanıtlamak","İş İngilizcesi","Kibar not: kapıyı kapatmadan söyle."],
["Olay bildirimi ve durum güncellemesi","İş İngilizcesi","Havalimanı anonsu: kısa, düzenli, dürüst."],
["Sunum ve demo anlatımı","İş İngilizcesi","Müze rehberi: önce yol haritası, sonra eserin önünde dur ve göster."],
["README ve teknik doküman yazmak","İş İngilizcesi","Mobilya kılavuzu: önce ne olduğu, sonra aletler, sonra adım adım montaj."]],
sec:[["Güvenlik kavramları ve CIA Üçlüsü", "Temel kavramlar", "Banka kasa dairesi: kilit, mühür, mesai saati"],
["Kontrol türleri", "Temel kavramlar", "Bir binanın kapı kilidi, kamera, alarm ve yangın planı"],
["Kriptografi: hash (özet)", "Temel kavramlar", "Zarfın üstündeki mühür: açılırsa bozulur"],
["Kriptografi: simetrik ve asimetrik şifreleme", "Temel kavramlar", "Aynı anahtar mı, açık kutu + özel anahtar mı"],
["Sertifikalar ve PKI", "Temel kavramlar", "Noter onaylı kimlik: herkesin güvendiği bir imza"],
["Tehdit aktörleri", "Tehditler, saldırılar, zafiyetler", "Mahalleye girebilecek farklı insan tipleri: meraklı, hırsız, çete, eski çalışan"],
["Sosyal mühendislik", "Tehditler, saldırılar, zafiyetler", "Telefonda kendini 'teknik servis' diye tanıtan sahte görevli"],
["Zararlı yazılım türleri", "Tehditler, saldırılar, zafiyetler", "Hastalık türleri: virüs, kurt, truva atı gibi farklı bulaşma yolları"],
["Ağ saldırıları", "Tehditler, saldırılar, zafiyetler", "Bir kapıyı kırmak, kapıyı kalabalıkla tıkamak, postayı yolda okumak"],
["Uygulama saldırıları", "Tehditler, saldırılar, zafiyetler", "Gişedeki memuru kandıracak bir dilekçe yazmak"],
["Zafiyet türleri", "Tehditler, saldırılar, zafiyetler", "Bir evde kilitlenmemiş pencere, eski kilit, açık bırakılmış anahtar"],
["Ağ segmentasyonu", "Güvenlik mimarisi", "Apartmanda her dairenin ayrı kapısı"],
["Güvenlik duvarı", "Güvenlik mimarisi", "Sitenin giriş kapısındaki güvenlik görevlisi ve kural listesi"],
["VPN", "Güvenlik mimarisi", "Halka açık yolda zırhlı araçla gitmek"],
["Bulut ve sanallaştırma", "Güvenlik mimarisi", "Kendi evin yerine kiralık otel dairesi; sorumluluk paylaşılır"],
["Veri koruma", "Güvenlik mimarisi", "Belgeleri gizlilik derecesine göre ayrı dolaplara koymak"],
["Dayanıklılık ve yedekleme", "Güvenlik mimarisi", "Yedek anahtar, yedek jeneratör, kopya belge"],
["Sertleştirme (hardening)", "Güvenlik operasyonları", "Eve gereksiz kapıları duvarla örmek, kilitleri güçlendirmek"],
["Varlık yönetimi", "Güvenlik operasyonları", "Depo sayımı: neyin nerede olduğunu bilmeden koruyamazsın"],
["Zafiyet yönetimi", "Güvenlik operasyonları", "Düzenli bina muayenesi ve tamir listesi"],
["Log ve izleme (SIEM)", "Güvenlik operasyonları", "Binadaki tüm kameraların izlendiği tek güvenlik odası"],
["Kimlik ve erişim (MFA, RBAC)", "Güvenlik operasyonları", "Kimlik kartı + parmak izi; göreve göre anahtar"],
["Otomasyon", "Güvenlik operasyonları", "Otomatik yangın söndürme sistemi"],
["Olay müdahalesi", "Güvenlik operasyonları", "Yangın tatbikatı: hazırlık, algıla, söndür, öğren"],
["Adli kanıt", "Güvenlik operasyonları", "Suç mahalline bant çekmek ve kanıt poşetini mühürlemek"],
["Risk yönetimi", "Program yönetimi ve gözetim", "Sigorta hesabı: olasılık x etki"],
["Politika ve prosedürler", "Program yönetimi ve gözetim", "Site yönetiminin kural kitabı"],
["Üçüncü taraf riski", "Program yönetimi ve gözetim", "Evine giren tamirci firmasının güvenilirliği"],
["Uyum (compliance)", "Program yönetimi ve gözetim", "Yasal zorunlu yangın ve denetim belgeleri"],
["Denetim ve değerlendirme", "Program yönetimi ve gözetim", "Dışarıdan gelen müfettiş kontrolü"],
["Farkındalık eğitimi", "Program yönetimi ve gözetim", "Apartman sakinlerine kapı güvenliği toplantısı"], ["Yapay zekâ riskleri", "Tehditler", "Çok yetenekli bir stajyer: hızlı ama her söyleneni yapar."], ["Zero Trust", "Mimari", "Her kapıda yeniden kimlik kontrolü."], ["Değişiklik yönetimi", "Program yönetimi ve gözetim", "Ameliyat öncesi onay ve geri dönüş planı."],
["IoT, gömülü sistemler ve ICS/SCADA","Güvenlik mimarisi","Yıllarca açık kalan baraj kapağı: kapatıp onaramazsın, etrafını korursun."],
["Mobil cihaz güvenliği","Güvenlik operasyonları","Ortak ev dolabı: iş eşyalarını kilitli bölmeye koyarsın, kişisel eşyalarına dokunmazsın."],
["Kablosuz ağ güvenliği","Güvenlik mimarisi","Apartmanın ortak anahtarı yerine her daireye ayrı kart."],
["Tehdit vektörleri ve saldırı yüzeyi","Tehditler, saldırılar, zafiyetler","Eve girilebilecek her kapı ve pencere: kapı sayısını azaltmak hırsızı değil riski azaltır."],
["Aldatma ve bozma teknolojileri","Güvenlik operasyonları","Müzedeki alarm bağlı sahte kapı: kimse girmemeli, giren hemen belli olur"],
["Tespit ve önleme araçları: IDS/IPS, DLP, NAC, EDR/XDR","Güvenlik operasyonları","Bina güvenliği: kapıda kimlik, çıkışta paket kontrolü, kamera ve nöbetçi"],
["İş etki analizi, risk iştahı ve toleransı","Program yönetimi ve gözetim","Apartman yangın planı: kim ne kadar çabuk tahliye olur, hangi riske razıyız"],
["Sızma testi türleri ve keşif","Program yönetimi ve gözetim","Kilitçiye yazılı izinle kapıyı denettirmek ve raporunu almak"]],
bk:[["HTTP ve REST", "Temel", "Restoranda garson: sipariş fişi gider, tabak döner."],
["JSON", "Temel", "Yemek tarifi kartı: alan adı ve değer, hep aynı düzen."],
["Git", "Temel", "Dosyanın fotoğraf albümü: her kayıt bir kare, istersen geri dönersin."],
["Veritabanı temeli: SQL", "Temel", "Excel tablosu ama kuralları sıkı: satır, sütun, bağlantı."],
["Veritabanı temeli: NoSQL", "Temel", "Etiketli çekmeceler: her çekmecenin içi farklı olabilir."],
["Kimlik doğrulama: JWT ve OAuth", "Temel", "Konser bileği: bir kez kimlik göster, bileği tak, içeride gez."],
["Bulut nedir ve AWS hesabı", "Bulut temeli", "Su gibi kullan: sayaçla öde, kendi kuyunu kazma."],
["IAM: kullanıcı, rol, politika", "Bulut temeli", "Otel anahtar kartı: kart kimin, hangi kapıları açar."],
["AWS CLI ve SDK", "Bulut temeli", "Uzaktan kumanda: tıklamak yerine komutla yönet."],
["S3", "Depolama ve veri", "Sonsuz dolaplı emanet deposu: kova (bucket) ve etiketli kutular."],
["DynamoDB: anahtar tasarımı", "Depolama ve veri", "Kütüphane fişi: kitap numarasıyla saniyede bul."],
["DynamoDB: indeks ve kapasite", "Depolama ve veri", "Kütüphanede ikinci katalog ve gişe sayısı."],
["RDS temelleri", "Depolama ve veri", "Kiralık hazır mutfak: ocak senin, bakımı yönetilen."],
["ElastiCache", "Depolama ve veri", "Garsonun cebindeki not: sık sorulan cevap yakında durur."],
["Lambda", "Sunucusuz", "Çağırınca gelen taksi: iş bitince gider, sadece yolculuğa ödersin."],
["API Gateway", "Sunucusuz", "Binanın resepsiyonu: kim girer, nereye yönlenir."],
["Step Functions", "Sunucusuz", "Montaj hattı şeması: adımlar sırayla, hata olursa yedek yol."],
["SQS ve DLQ", "Mesajlaşma", "Postane kutusu: mektup sırada bekler, ulaşmayan ayrı kutuya düşer."],
["SNS", "Mesajlaşma", "Hoparlör anonsu: bir mesaj, çok dinleyici."],
["EventBridge", "Mesajlaşma", "Olay santrali: olay olur, kurala göre doğru yere yönlenir."],
["CloudFormation ve SAM", "Dağıtım", "Mimari proje çizimi: çizimden bina otomatik kurulur."],
["CodePipeline, CodeBuild, CodeDeploy", "Dağıtım", "Fabrika bandı: kod girer, test edilir, rafa gider."],
["Elastic Beanstalk", "Dağıtım", "Anahtar teslim ev: kodu ver, kurulumu o yapsın."],
["Konteyner: ECS ve ECR", "Dağıtım", "Nakliye konteyneri: içi aynı, her limanda aynı açılır."],
["KMS", "Güvenlik", "Banka kasası anahtarı: şifreleme anahtarlarının güvenli yöneticisi."],
["Secrets Manager ve Parameter Store", "Güvenlik", "Kilitli sır dolabı: parola koda yazılmaz, dolaptan alınır."],
["Cognito", "Güvenlik", "Giriş kapısı görevlisi: kullanıcı kaydı ve girişi hazır."],
["CloudWatch", "Gözlem ve sorun giderme", "Arabanın gösterge paneli: metrik, log, alarm."],
["X-Ray", "Gözlem ve sorun giderme", "Kargo takibi: isteğin hangi duraklarda ne kadar kaldığı."],
["CloudTrail", "Gözlem ve sorun giderme", "Güvenlik kamerası kaydı: kim, ne zaman, ne yaptı."],
["Yeniden deneme, idempotency, üstel geri çekilme", "Mimari desenleri", "Kapıyı tekrar çalmak: aralığı açarak dene, çifte sipariş verme."], ["EC2, yük dengeleyici ve Auto Scaling", "Bulut mimarisi", "Kasa sayısı kalabalığa göre artıp azalan market."], ["VPC ve güvenlik grupları", "Bulut mimarisi", "Site içi bloklar ve kapıdaki güvenlik."], ["CloudFront ve Route 53", "Bulut mimarisi", "Her mahalleye şube: ürün yakında, adres defteri doğru yolda."], ["Kinesis ve akış verisi", "Veri", "Sürekli akan nehir: istediğin kadar kişi kıyıdan okur."], ["STS ve geçici kimlik bilgileri", "Güvenlik", "Bir saatlik misafir kartı."], ["Parameter Store ve AppConfig", "Yapılandırma", "Ayar kitapçığı: kod aynı, kitapçık ortama göre."], ["AWS CDK ve AppSync", "Altyapı ve API", "Yapı kartonunu elle kesmek yerine makineye çizdirmek."], ["IAM politika değerlendirmesi, Organizations ve SCP", "Güvenlik", "Havalimanı kontrol hattı: bilet, ülke yasağı ve pasaport kontrolü birlikte geçişi belirler."], ["Tespit ve koruma hizmetleri", "Güvenlik", "Müze güvenliği: kapıdaki görevli engeller, kameradaki görevli şüpheli davranışı fark eder."], ["VPC ağ tasarımı: NAT, endpoint ve Transit Gateway", "Bulut mimarisi", "Site yönetimi: giden kapı, servis girişi ve bloklar arası köprü."], ["Hibrit bağlantı ve veri aktarımı", "Bulut mimarisi", "İki şehir arası yol: halk otobüsü, özel yol ve kamyonla toplu yük."], ["Depolama seçimi: EBS, EFS, FSx ve S3 ileri", "Depolama ve veri", "Ofis eşyaları: kendi diskin, ortak klasör ve bodrumdaki arşiv dolabı."], ["Felaket kurtarma ve AWS Backup", "Bulut mimarisi", "Sigorta ve ikinci ev: yedek plan, temel, küçük ev ya da iki ev birden."], ["Maliyet optimizasyonu ve Well-Architected", "Bulut mimarisi", "Ev bütçesi: faturayı oku, limit koy, gereğinden büyüğü küçült."], ["Analitik ve veri gölü", "Veri", "Büyük kütüphane: ham raf, katalog görevlisi, danışma masası ve özet panosu."]]};
STARTER.net=[["Ağ nedir, OSI ve TCP/IP","1. Ağ kavramları (%23)","Mektup yollamak gibi: zarf, adres, posta aracı; her aşamanın ayrı bir görevi var."],["Portlar ve protokoller","1. Ağ kavramları (%23)","Bir apartmanda adres IP'dir, daire numarası porttur: aynı binada birçok servis yaşar."],["Kablolar, konnektörler ve topolojiler","1. Ağ kavramları (%23)","Otoyol, köprü ve ara sokaklar gibi: her yolun hızı ve menzili farklıdır."],["IPv4 adresleme ve alt ağlar","1. Ağ kavramları (%23)","Şehir > mahalle > sokak > kapı numarası: maske, çizginin nereden geçtiğini söyler."],["IPv6 ve trafik türleri","1. Ağ kavramları (%23)","Telefon rehberi büyüdü: eski numaralar (IPv4) bitti, yeni uzun numaralar (IPv6) geldi."],["Ağ cihazları ve bulut kavramları","1. Ağ kavramları (%23)","Ofis binası: kapıdaki güvenlik (firewall), asansör (switch), resepsiyon (router)."],["Yönlendirme ve NAT","2. Ağ uygulaması (%20)","Posta dağıtım merkezleri: her merkez, mektubu bir sonraki merkeze atar."],["Switching, VLAN ve STP","2. Ağ uygulaması (%20)","Apartman içinde katlar (VLAN): aynı binada ama kapılar kilitli, herkes kendi katında."],["Kablosuz ağlar","2. Ağ uygulaması (%20)","Radyo istasyonu gibi: aynı frekansta iki yayın birbirini bozar."],["Ağ servisleri: DHCP, DNS, NTP","3. Ağ operasyonları (%19)","Rehber (DNS), otomatik numara dağıtım (DHCP) ve herkesin aynı saate bakması (NTP)."],["İzleme: SNMP, syslog, flow ve baseline","3. Ağ operasyonları (%19)","Arabanın göstergeleri: hız, yakıt, sıcaklık. Bakmazsan arıza yoldayken çıkar."],["Yüksek erişilebilirlik ve felaket kurtarma","3. Ağ operasyonları (%19)","Yedek lastik ve yedek araba: lastik patlayınca devam, araba yanınca yeni araç."],["Saldırı türleri ve zafiyet","4. Ağ güvenliği (%14)","Bina güvenliği: sahte kimlik, kapıda takılma, anahtar kopyalama; her yöntem ayrı önlem ister."],["Güvenlik duvarı, segmentasyon ve VPN","4. Ağ güvenliği (%14)","Site kapısı, bina içi kilitli bölümler ve şirketle ev arasındaki özel tünel."],["Sorun giderme metodolojisi","5. Sorun giderme (%24)","Doktor muayenesi: önce şikayeti dinle, sonra teşhis koy, tedaviyi uygula ve kontrolle."],["Sorun giderme araçları: komut satırı ve analizör","5. Sorun giderme (%24)","Doktorun steteskopu ve tansiyon aleti: her araç bir belirtiyi ölçer."],["Kablo ve Wi-Fi sorunları, performans","5. Sorun giderme (%24)","Su borusu gibi: kırılma, sızıntı, kalın-ince boru; her biri farklı belirti verir."],["Ağ hizmetleri ve yönlendirme sorunları","5. Sorun giderme (%24)","Trafik haritası: yanlış tabela (ağ geçidi), dolu otopark (DHCP), kapalı yol (ACL)."]];STARTER.dev=[["DevOps nedir ve kültürü","Temeller (KCNA: Cloud Native Architecture)","Mutfak ile servis ekibinin ortak çalışıp siparişi sıcak ve hızlı masaya getirmesi gibi."],["Linux ve komut satırı","Temeller","Şehirde adresle gezmek gibi: dizin yolunu bilirsen her yere komutla ulaşırsın."],["Bash betikleme","Temeller","Mutfak tarifi gibi: adımları bir kez yazarsın, her seferinde aynı yemek çıkar."],["Git ve takım akışı","Kaynak kodu ve işbirliği","Ortak bir belgeyi herkesin kopyasında düzenleyip sonra düzgünce birleştirmek gibi."],["Ağ, DNS ve HTTP","Temeller","Telefon rehberi (DNS) ile aranan kişinin evine gitmek (IP, port) gibi."],["CI/CD ve GitHub Actions","Uygulama Teslimi (KCNA: Cloud Native Application Delivery %16)","Fabrikadaki üretim bandı gibi: ham madde girer, kontrol edilir, paketlenir ve sevk edilir."],["Konteyner, imaj ve registry","Konteynerler (KCNA: Container Orchestration)","Konteyner, gemi taşıma kutusu gibi: içi ne olursa olsun her limanda aynı şekilde taşınır."],["Dockerfile, volume, ağ ve Compose","Konteynerler (KCNA: Container Orchestration)","Dockerfile yemek tarifi, imaj hazır yemek, Compose ise tüm menünün sipariş formu gibi."],["Kubernetes mimarisi","Kubernetes Temelleri (KCNA %44)","Kubernetes, limanın kontrol kulesi gibi: kutuları (konteynerleri) hangi rıhtıma koyacağına o karar verir."],["Pod, Deployment ve ölçekleme","Kubernetes Temelleri (KCNA %44)","Deployment, vardiya müdürü gibi: kaç çalışanın olacağını ve birinin yerine yenisini koymayı garanti eder."],["Service, Ingress ve ağ","Konteyner Orkestrasyonu (KCNA %28)","Service, şirketin santral numarası gibi: içerideki kişi değişse de numara aynı kalır."],["ConfigMap, Secret, namespace ve depolama","Konteyner Orkestrasyonu (KCNA %28)","ConfigMap ayar panosu, Secret kilitli çekmece, namespace ise ofisteki ayrı katlar gibi."],["Helm ve GitOps","Uygulama Teslimi (KCNA: Cloud Native Application Delivery %16)","Helm bir uygulama paketi yöneticisi, GitOps ise kümenin sürekli 'depodaki plana uy' diyen bekçisi gibi."],["Kod olarak altyapı: Terraform ve Ansible","Altyapı ve yapılandırma","Terraform inşaat planı, Ansible ise binaya girince her odanın düzenini kuran usta gibi."],["Gözlemlenebilirlik ve günlükleme","Bulut Yerlisi Mimari (KCNA: Cloud Native Architecture %12)","Arabanın göstergeleri (metrik), kara kutu kaydı (log) ve yolculuk haritası (trace) birlikte arızayı bulduran üçlüdür."],["Gizli bilgi yönetimi ve DevSecOps","Konteyner Orkestrasyonu: güvenlik (KCNA %28)","Anahtarı paspasın altına bırakmamak, evde herkese yalnız gereken odanın anahtarını vermek gibi."],["Bulutta DevOps: AWS eşlemesi","Bulut","Aynı fabrikanın hazır kiralanabilir atölyelerle kurulmuş hali gibi: makine yerine servis kullanırsın."],["SRE temelleri","Bulut yerlisi mimari ve işletme","Hastanede nöbet sistemi gibi: ne kadar kesinti kabul edildiği önceden bellidir, olay olunca herkes rolünü bilir."],["Kubernetes iş yükü türleri ve zamanlama","Kubernetes Temelleri (KCNA %44)","Vardiya çizelgesi: kim hangi makinede, hangi işte ve ne kadar süre çalışır."],["Dağıtım stratejileri ve Kubernetes'te sorun giderme","Kubernetes Temelleri (KCNA %44)","Yeni menüyü önce tek masada denemek; yemek bozuksa mutfak kayıtlarına bakmak."],["Bulut yerel mimari ve CNCF ekosistemi","Bulut yerlisi mimari ve işletme","Şehir planı: standart bağlantılar sayesinde farklı yapılar aynı şebekeye bağlanır."],["Terraform ileri: değişken, modül, durum ve HCP Terraform","Altyapı ve yapılandırma","Yapı projesi: şablon parçalar (modül), ortak defter (state) ve ortak ofis (HCP)."]];STARTER.qa=[["Test nedir ve neden gerekli","Bölüm 1 · Test temelleri","Test, uçağın kalkıştan önceki kontrol listesi gibidir: sorunu havadayken değil yerdeyken bulmak içindir."],["Test ilkeleri ve test süreci","Bölüm 1 · Test temelleri","Yedi ilke, iyi bir doktorun muayene alışkanlıkları gibidir: hastalığı kanıtlar, sağlığı kesin garanti etmez."],["Test seviyeleri ve test türleri","Bölüm 2 · Yaşam döngüsünde test","Bina denetimi gibi: önce tek tuğla, sonra duvar, sonra bütün bina, en sonda sahibinin onayı."],["Çevik testte QA'nın rolü","Bölüm 2 · Yaşam döngüsünde test","Çevik takım bir mutfak ekibi gibidir: tadım yalnız servis öncesi değil, pişerken de yapılır."],["Statik test ve gözden geçirme","Bölüm 3 · Statik test","Statik test, yemeği pişirmeden önce tarifi okumaya benzer: yanlış ölçüyü ocağa koymadan yakalarsın."],["Test senaryosu yazmak","Bölüm 4 · Test analizi ve tasarımı","İyi senaryo, başkasının da yapabileceği net bir yemek tarifidir: malzeme, adım, beklenen tat."],["Eşdeğerlik sınıfları","Bölüm 4 · Test analizi ve tasarımı","Kantinde öğrenci indirimi gibi: yaşı 18 ile 25 arası herkes aynı fiyatı öder, her birini ayrı denemene gerek yok."],["Sınır değer analizi","Bölüm 4 · Test analizi ve tasarımı","Kapıdaki yaş sınırı gibi: kusur çoğu zaman 17 ile 18 arasındaki çizgide saklanır."],["Karar tablosu","Bölüm 4 · Test analizi ve tasarımı","Kombinasyon kilidi gibi: her tuş birleşimi ayrı bir sonuca götürür."],["Durum geçişi testi","Bölüm 4 · Test analizi ve tasarımı","Asansör gibi: kat, düğme ve kapı durumuna göre bazı hareketler mümkün, bazıları değil."],["Beyaz kutu: ifade ve dal kapsamı","Bölüm 4 · Test analizi ve tasarımı","Evin her odasına girmek (ifade) ile her kapıdan geçmek (dal) aynı şey değildir."],["Deneyim tabanlı testler","Bölüm 4 · Test analizi ve tasarımı","Tecrübeli bir tamirci arabayı dinleyip sesten arızayı tahmin eder; liste yardımcı olur, ama sezgi de değerlidir."],["Test planlama ve risk","Bölüm 5 · Test yönetimi","Sınav haftasında konuları risk ve ağırlığa göre çalışmak gibi: her konuya eşit saat ayırmazsın."],["Test metrikleri ve raporlama","Bölüm 5 · Test yönetimi","Araba gösterge paneli gibi: tek bir ibreye bakarak değil, hız, yakıt ve uyarı ışıklarına birlikte bakarak karar verirsin."],["Hata raporu ve Jira ile hata yönetimi","Bölüm 5 · Test yönetimi","İyi hata raporu, doktora gidince şikâyeti net anlatmaktır: ne zaman, nerede, ne oldu, ne bekliyordun."],["API testi: Postman ve durum kodları","Bölüm 6 · Test araçları ve pratik","API, restoranda garsondur: siparişi mutfağa iletir, cevabı getirir. Garsonu doğrudan sınarsın."],["SQL ile veri doğrulama ve tarayıcı araçları","Bölüm 6 · Test araçları ve pratik","Ekrandaki sonuç vitrindir; veritabanı depodur. Vitrinin doğru olması deponun doğru olduğunu garanti etmez."],["Otomasyon, CI, performans ve erişilebilirlik","Bölüm 6 · Test araçları ve pratik","Otomasyon, çamaşır makinesi gibidir: tekrarlayan işi yapar, ama her kıyafet için uygun değildir."],["Kullanıcı hikâyesi, kabul ölçütü ve ATDD","Bölüm 4 · Test analizi ve tasarımı","Sipariş formu: ne istendiği önce yazılır, teslimde aynı formla kontrol edilir."],["Tahmin, önceliklendirme, test piramidi ve çeyrekler","Bölüm 5 · Test yönetimi","Bütçeli alışveriş listesi: neye ne kadar zaman ayrılacağını önceden hesaplarsın."],["Roller, bağımsızlık, bakım testi ve konfigürasyon yönetimi","Bölüm 5 · Test yönetimi","Apartman yönetimi: roller, bağımsız denetçi ve değişiklik defteri."],["Kök neden analizi ve retrospektif","Bölüm 5 · Test yönetimi","Sızdıran musluk: kovayı değil contayı değiştir; haftalık ev toplantısında görev dağıt."]];
STARTER.py=[["Değişkenler ve veri türleri","Temeller ve veri türleri","Etiketli çekmece: etiket adın, içindeki şey değerin, çekmecenin cinsi türün."],["Giriş, çıkış ve metin biçimlendirme","Girdi, çıktı ve işlemler","Gişe camı: karşıdan metin gelir (input), sen cevabı kâğıda yazıp uzatırsın (print)."],["Operatörler","Girdi, çıktı ve işlemler","Hesap makinesi tuşları: hangi tuşa önce bastığın sonucu değiştirir."],["Koşullar: if, elif, else","Akış denetimi","Yol ayrımı tabelaları: ilk uyan tabelaya göre yürürsün."],["Döngüler: while ve for","Akış denetimi","Çamaşır makinesi programı: aynı adımlar her turda tekrarlanır, sayaç bitince durur."],["Liste ve demet (tuple)","Veri koleksiyonları","Numaralı raf (liste) ve mühürlü zarf (demet): rafı değiştirirsin, zarfı açamazsın."],["Sözlük ve küme","Veri koleksiyonları","Telefon rehberi (sözlük) ve benzersiz kartlar torbası (küme)."],["Fonksiyonlar","Fonksiyonlar","Tarif kartı: malzemeyi (parametre) verirsin, yemeği (return) alırsın."],["Hatalar: try, except, finally","Hata yönetimi","Sigorta kutusu: bir devre atınca tüm ev kararmaz; hatayı yakalayan blok yalnız o devreyi keser."],["Dize yöntemleri","Metin işleme","Kuyumcu tezgâhı: metni keser (split), tutturur (join), parlatır (strip), yenisini üretir; eldeki taşa dokunmaz."]];
STARTER.js=[["Değişkenler ve veri türleri (let/const)","Temeller ve veri türleri","Etiketli çekmece: etiket adın, içindeki şey değerin; const çekmeceyi mühürler, let açık bırakır."],["Metin ve şablon dizesi","Girdi, çıktı ve işlemler","Boşluklu form: ters tırnak içindeki ${ } boşluklarına değerler yazılır, metin hazır çıkar."],["Operatörler ve karşılaştırma (== ve ===)","Girdi, çıktı ve işlemler","Kimlik kontrolü: === hem ad hem tür ister; == türü kendi çevirip gevşek bakar."],["Koşullar: if, else if, else","Akış denetimi","Yol ayrımı tabelaları: ilk uyan tabelaya göre yürürsün."],["Döngüler: for, while, for...of","Akış denetimi","Çamaşır makinesi programı: aynı adımlar her turda tekrarlanır, sayaç bitince durur."],["Dizi yöntemleri: map, filter, forEach","Veri koleksiyonları","Montaj bandı: map her parçayı dönüştürür, filter uymayanı ayırır, forEach yalnız iş yapar."],["Nesneler","Veri koleksiyonları","Kimlik kartı: alanların adı var (ad, yaş, şehir); değeri adıyla okursun."],["Fonksiyonlar ve ok fonksiyonları","Fonksiyonlar","Tarif kartı: malzemeyi (parametre) verirsin, yemeği (return) alırsın; ok işareti kısa yazımdır."]];
function starterTopics(track){
  var L=STARTER[track]||[],D=PP.ogr.ilerleme.sabitDurumlar(L.length,function(i){return lcDone("s-"+track+"-"+(i+1))},plOffset(track,L.length));
  return L.map(function(x,i){return {id:"s-"+track+"-"+(i+1),track:track,name:x[0],area:x[1],analogy:x[2],status:D[i].durum,mastery:D[i].ustalik,order:i,areaOrder:0,starter:true}});
}
function topicChoices(track){
  var T=topicsOf(track).filter(function(t){return t.status!=="locked"});
  return T.length?T:starterTopics(track);
}
function topicById(id){
  var t=S.topics.filter(function(x){return x.id===id})[0];if(t)return t;
  var all=TRKS.reduce(function(a,t){return a.concat(starterTopics(t))},[]);return all.filter(function(x){return x.id===id})[0]||null;
}
function defaultTopic(track){
  var T=topicChoices(track);if(!T.length)return null;
  var nx=T.filter(function(t){return t.status==="next"})[0];
  if(nx)return nx.id;
  return T.slice().sort(function(a,b){return num(a.mastery)-num(b.mastery)})[0].id;
}
function sampleErr(e){
  var c=e&&e.code;
  if(c==="cancelled")return "Durduruldu.";
  if(c==="not_granted")return "Canlı ders için bu sayfanın Claude'u kullanmasına izin vermen gerekiyor. Sayfayı yenileyip izni onayla.";
  if(c==="rate_limited")return "Çok hızlı istek gitti ya da kullanım limitin doldu. Biraz sonra tekrar dene.";
  if(c==="invalid_json")return "Sorular okunamadı. Tekrar dene.";
  if(c==="sampling_disabled"||c==="not_declared"||c==="capability_disabled"||c==="capability_removed")return "Canlı ders bu görünümde kullanılamıyor.";
  return "Bağlantı sorunu oldu. Tekrar dene.";
}
function genPrompt(track,t){
  var T=topicsOf(track);if(!T.length)T=starterTopics(track);var known=T.filter(function(x){return x.status==="built"||x.status==="building"}).map(function(x){return x.name});
  var m=Math.round(num(t.mastery)),lvl=m<40?"kolay":m<70?"orta":"zor";
  var past=S.attempts.filter(function(a){return a.topicId===t.id}).sort(function(a,b){return String(b.ts).localeCompare(String(a.ts))});
  var asked=past.slice(0,10).map(function(a){return "- "+a.q}).join("\n")||"(yok)";
  var wrong=past.filter(function(a){return num(a.score)<50}).slice(0,5).map(function(a){return "- "+a.q}).join("\n")||"(yok)";
  var ros=ROSTER[track].map(function(id,i){return (i+1)+". "+CH[id].n+": "+CH[id].role}).join("\n");
  var common=""+UN()+" bu alanda SIFIRDAN başlayan biri gibi ele alınır; küçümseme, 'kolay' deme. Her soru ilgili karakterin ağzından gelen gerçek bir iş durumu olsun.\n"+
   "KONU: "+t.name+"\nALAN: "+(t.area||"")+"\nBENZETME (varsa kullan): "+(t.analogy||"yok")+"\nÖĞRENCİNİN GÖRDÜĞÜ KONULAR (yalnız bunlarla ve bu konuyla çözülebilen sorular sor): "+(known.join(", ")||t.name)+"\nUSTALIK: "+m+"/100, zorluk: "+lvl+"\nSON HATALARI (bunlardan birini farklı biçimde tekrar sor):\n"+wrong+"\nDAHA ÖNCE SORULANLAR (aynısını sorma):\n"+asked+"\nKARAKTERLER (soru sırasıyla):\n"+ros+"\n";
  if(track==="eng"){
    return "Sen "+UN()+"'un İngilizce koçusun. "+common+
     "KURALLAR: "+UN()+"'un öğrendiği yardımcı fiil/kalıp dışına çıkma. Karakter mesajını İngilizce yazar (situation: 1-2 kısa cümle, basit kelimeler, iş/BT bağlamı), Türkçesi situation_tr alanında. mcq: question Türkçe talimat, options 4 İngilizce cevap, tek doğru (correct = 0-3 indeks). open: question 'Şunu İngilizce yaz: <Türkçe cümle>' biçiminde; model doğru İngilizce cümle; breakdown Türkçe cümlenin ek-parçalama dökümü (beyaz tahta yöntemi): [{\"p\":\"Türkçe parça\",\"m\":\"karşılığı, ör. -abil = can\"}]. 3. ve 4. soru open olsun, diğerleri mcq. explanation Türkçe ve sebepli. Gramer ve kelime %100 doğru olmalı.\n"+
     "ÇIKTI: yalnızca JSON dizi, 5 öğe, her biri: {\"kind\":\"mcq\"|\"open\",\"situation\":\"...\",\"situation_tr\":\"...\",\"question\":\"...\",\"options\":[\"..\",\"..\",\"..\",\"..\"],\"correct\":0,\"model\":\"\",\"breakdown\":[],\"explanation\":\"...\",\"why\":\"Bunu bu yüzden öğrendin: tek cümle, iş bağlamı\"}";
  }
  return "Sen "+UN()+"'un "+certName(track)+" koçusun. "+common+
   (track==="sec"?"GÜVENLİK ETİĞİ: yalnız savunma ve kendi izole lab ortamı; başkasının sistemine saldırı anlatma. ":track==="bk"?"BACKEND: kod ve bulut hizmeti iddialarında emin olmadığını sorma; AWS limit ve fiyat sayısı sorma. ":track==="dev"?"DEVOPS: komut ve YAML iddialarında emin olmadığını sorma; bulut fiyat ve kota sayısı sorma; yalnız kendi izole lab ortamı. ":track==="net"?"NETWORK: port, protokol ve kablo sınırı sayılarında emin olmadığını sorma; satıcıdan bağımsız anlat (Cisco komutu isteme). ":track==="qa"?"TEST: ISTQB terimlerini Türkçe karşılığıyla birlikte kullan; araç sürümü ve fiyat sorma. ":"")+
   "KURALLAR: Sorular ÖZGÜN olsun; gerçek sınav sorusu veya braindump kullanma. Teknik olarak %100 doğru olmalı; emin olmadığın komut ve değeri sorma. situation Türkçe, 1-2 cümle, karakter ağzından. mcq: 4 seçenek, tek doğru (correct = 0-3 indeks). open: kısa teşhis sırası ya da açıklama iste, model alanına ideal kısa cevabı yaz. 4. ve 5. soru open olsun, diğerleri mcq. explanation: neden doğru, diğerleri neden yanlış (2-3 cümle). analogy: 'Yani ...' ile başlayan tek cümle günlük hayat benzetmesi.\n"+
   "ÇIKTI: yalnızca JSON dizi, 5 öğe, her biri: {\"kind\":\"mcq\"|\"open\",\"situation\":\"...\",\"question\":\"...\",\"options\":[\"..\",\"..\",\"..\",\"..\"],\"correct\":0,\"model\":\"\",\"explanation\":\"...\",\"analogy\":\"Yani ...\",\"why\":\"Bunu bu yüzden öğrendin: tek cümle, iş bağlamı\"}";
}
function startClass(){
  var C=S.cls,t=topicById(C.topicId);
  if(!t||!S.sample)return;
  if(C.ctl)C.ctl.abort();
  C.ctl=new AbortController();
  C.phase="loading";C.err=null;C.qs=[];C.i=0;C.res=[];C.after=null;draw();
  var ctl=C.ctl,track=C.track;
  S.sample.json(genPrompt(track,t),{signal:ctl.signal,cache:false}).then(function(arr){
    var list=(Array.isArray(arr)?arr:(arr&&arr.questions)||[]).filter(function(q){
      if(!q||typeof q.question!=="string"||typeof q.situation!=="string")return false;
      if(q.kind==="mcq")return Array.isArray(q.options)&&q.options.length>=2&&Number.isInteger(q.correct)&&q.correct>=0&&q.correct<q.options.length;
      return q.kind==="open"&&typeof q.model==="string";
    }).slice(0,5);
    if(!list.length)throw {code:"invalid_json"};
    C.qs=list;C.i=0;C.res=[];C.phase="ask";C.err=null;
  }).catch(function(e){C.phase="idle";C.err=sampleErr(e)}).then(function(){C.ctl=null;draw()});
}
function charFor(i){var r=ROSTER[S.cls.track];return r[i%r.length]}
function saveAttempt(q,r){
  if(!S.db)return;
  var t=topicById(S.cls.topicId)||{};
  S.db.collection("attempts").add({date:today(),track:S.cls.track,topicId:t.id||"",topicName:t.name||"",character:charFor(S.cls.i),kind:q.kind,
    score:r.score,xp:r.xp,q:String(q.question).slice(0,240),a:String(r.answer||"").slice(0,400),ts:new Date().toISOString()}).catch(function(){});
}
function answerMcq(k){
  var C=S.cls,q=C.qs[C.i];if(C.phase!=="ask")return;
  var ok=k===q.correct,r={score:ok?100:0,xp:ok?5:0,answer:q.options[k],picked:k};
  C.res[C.i]=r;C.phase="fb";saveAttempt(q,r);draw();
}
function answerOpen(text){
  var C=S.cls,q=C.qs[C.i];if(C.phase!=="ask"||!text.trim())return;
  C.phase="grading";draw();
  var track=C.track,idx=C.i;
  var p="Sen "+UN()+"'un "+trName(track)+" koçusun. "+UN()+" başlangıç seviyesinde; sert olma, ama doğruluk önemli.\nSORU: "+q.question+(q.situation?"\nDURUM: "+q.situation:"")+"\nİDEAL CEVAP: "+q.model+"\nÖĞRENCİNİN CEVABI: "+text.trim().slice(0,600)+
   "\nDeğerlendir: anlam ve doğruluk esas, küçük yazım farkları puan kırmasın"+(track==="eng"?" ama gramer hatası (yardımcı fiil, özne, sıra) kırsın":"")+". Yalnızca JSON döndür: {\"score\":0-100 tam sayı,\"good\":\"doğru yaptığı kısım, Türkçe 1 cümle\",\"fix\":\"eksik ya da hata ve sebebi, Türkçe 1-2 cümle; hata yoksa boş\",\"better\":\"düzeltilmiş ya da ideal cevap\"}";
  S.sample.json(p,{modelTier:"quick",cache:false}).then(function(g){
    var sc=Math.max(0,Math.min(100,Math.round(num(g&&g.score))));
    var r={score:sc,xp:Math.round(sc/100*15),answer:text.trim(),good:g.good||"",fix:g.fix||"",better:g.better||q.model};
    C.res[idx]=r;C.phase="fb";saveAttempt(q,r);
  }).catch(function(e){C.phase="ask";C.msg=sampleErr(e)}).then(function(){draw()});
}
function nextQ(){
  var C=S.cls;C.msg=null;
  if(C.i+1<C.qs.length){C.i++;C.phase="ask";draw();return}
  var done=C.res.filter(Boolean),pct=done.length?Math.round(done.reduce(function(s,r){return s+r.score},0)/done.length):0;
  var t=S.topics.filter(function(x){return x.id===C.topicId})[0];
  C.phase="done";C.after=null;
  if(t&&S.db){
    var old=num(t.mastery),neu=Math.round(0.6*pct+0.4*old);
    C.after={old:old,neu:neu,pct:pct};
    S.db.doc("topics/"+t.id).update({mastery:neu,lastReview:today(),status:t.status==="next"?"building":t.status}).catch(function(){C.after=null;draw()});
  }
  draw();
}
function flagQ(){
  var C=S.cls,q=C.qs[C.i];if(!q||!S.db)return;
  S.db.collection("flags").add({date:today(),track:C.track,topicId:C.topicId,q:q.question,options:q.options||null,correct:q.correct==null?null:q.correct,model:q.model||"",explanation:q.explanation||"",ts:new Date().toISOString()})
   .then(function(){C.msg="İşaretlendi. Koç bir sonraki çalışmada doğrular.";draw()},function(){C.msg="İşaretlenemedi.";draw()});
}
function renderClass(){
  var C=S.cls,out=[];
  out.push(miniTiles([{c:"bg-l",k:"MÜLAKAT",t:"Antrenman",s:"Sesli prova, model cevap",go:function(){goTab("mul")}},{c:"bg-g",k:"OYUN",t:"Meydan oku",s:"Bota ya da arkadaşa karşı",go:function(){S.gtab="arena";goTab("oyun")}}]));
  var T=topicChoices(C.track);
  if(!C.topicId||!T.some(function(t){return t.id===C.topicId}))C.topicId=defaultTopic(C.track);
  /* canlı şerit */
  var ta=todayAttempts(),okc=ta.filter(function(a){return num(a.score)>=60}).length,xp=Math.min(100,ta.reduce(function(s,a){return s+num(a.xp)},0));
  out.push(h("div",{class:"panel"},
    h("div",{class:"livebar"},
      h("div",null,h("div",{class:"label"},"Bugün canlı"),h("b",{class:"mono"},ta.length+" soru · +"+xp+" XP"+(ta.length?" · %"+Math.round(okc/ta.length*100)+" doğru":""))),
      h("div",{class:"dots","aria-label":"Son cevaplar"},ta.slice(-14).map(function(a){return h("i",{class:num(a.score)>=60?"ok":"no"})}))),
    h("div",{class:"small mute"},"Çözdüğün her soru anında rütbene, serine, ısı haritana ve konunun ustalığına işlenir. Günlük canlı XP en çok 100'e kadar sayılır.")));
  /* kontroller */
  var ctrl=h("div",{class:"panel"},
    h("h2",null,"Sınıf"),
    h("div",{class:"small mute"},"Karakterler sana ofisten gerçek durumlar getirir. Beş soru, yaklaşık 10 dakika. Cevabın yanlışsa neden yanlış olduğunu ve günlük hayat benzetmesini görürsün."),
    h("div",{class:"row",style:"align-items:end"},
      h("div",{class:"seg",role:"group","aria-label":"Koç"},
        TRK_LIST.map(function(o){return h("button",{type:"button","aria-pressed":C.track===o[0]?"true":"false",onclick:function(){if(C.phase==="loading")return;C.track=o[0];C.topicId=null;C.phase="idle";C.err=null;draw()}},o[1])})),
      h("div",{class:"field",style:"flex:2 1 220px"},h("label",{for:"c-topic",class:"label"},"Konu"),
        h("select",{id:"c-topic",onchange:function(e){C.topicId=e.target.value}},T.map(function(t){return h("option",{value:t.id,selected:t.id===C.topicId},t.name+" · %"+Math.round(num(t.mastery)))}))),
      C.phase==="loading"?h("button",{class:"btn ghost",type:"button",onclick:function(){if(C.ctl)C.ctl.abort()}},"Durdur"):
      h("button",{class:"btn",type:"button",disabled:!S.sample||!T.length,onclick:startClass},C.phase==="idle"||C.phase==="done"?"Dersi başlat":"Baştan başlat")));
  if(!S.sample)ctrl.append(h("div",{class:"empty"},"Canlı ders bu görünümde kullanılamıyor. Sayfayı Claude uygulamasında ya da claude.ai'da aç."));
  if(T.length&&T[0].starter)ctrl.append(h("div",{class:"small mute"},"Koç konu haritanı açana kadar başlangıç konuları gösteriliyor. Hepsi seçilebilir."));
  if(C.err)ctrl.append(h("div",{class:"alert"},C.err));
  out.push(ctrl);
  if(C.phase==="loading")out.push(h("div",{class:"panel"},h("div",{style:"display:flex;gap:16px;align-items:center;flex-wrap:wrap"},figure(ROSTER[C.track][0],"neutral"),h("div",null,h("b",null,"Karakterler hazırlanıyor"),h("div",{class:"small mute"},"Beş soru yazılıyor, yarım dakika kadar sürebilir.")))));
  if(C.phase==="ask"||C.phase==="fb"||C.phase==="grading")out.push(renderQuestion());
  if(C.phase==="done")out.push(renderDone());
  return out;
}
function renderQuestion(){
  var C=S.cls,q=C.qs[C.i],r=C.res[C.i],id=charFor(C.i);
  var mood=C.phase==="fb"&&r?(r.score>=70?"happy":r.score>=40?"neutral":"worried"):"neutral";
  var prog=h("div",{class:"prog","aria-label":"İlerleme"},C.qs.map(function(x,i){var rr=C.res[i];return h("i",{class:i===C.i&&C.phase!=="fb"?"cur":rr?(rr.score>=60?"ok":"no"):(i===C.i?"cur":"")})}));
  var bub=h("div",{class:"bubble"},
    h("div",{class:"sit"},q.situation),
    q.situation_tr?h("details",null,h("summary",{class:"small"},"Türkçesi"),h("div",{class:"small mute",style:"margin-top:4px"},q.situation_tr)):null,
    h("div",null,h("b",null,q.question)));
  if(q.kind==="mcq"){
    var o=h("div",{class:"opts"},q.options.map(function(t,k){
      var cls="opt";
      if(C.phase==="fb"){if(k===q.correct)cls+=" right";else if(r&&r.picked===k)cls+=" wrong"}
      return h("button",{type:"button",class:cls,disabled:C.phase!=="ask",onclick:function(){answerMcq(k)}},String.fromCharCode(65+k)+". "+t);
    }));
    bub.append(o);
  }else if(C.phase!=="fb"){
    var ta=h("textarea",{id:"c-ans",maxlength:600,placeholder:C.track==="eng"?"İngilizce yaz":"Kendi cümlelerinle yaz",disabled:C.phase==="grading"});
    bub.append(ta,h("div",{class:"row",style:"align-items:center"},
      h("button",{class:"btn",type:"button",disabled:C.phase==="grading",onclick:function(){answerOpen(ta.value)}},C.phase==="grading"?"Değerlendiriliyor":"Gönder"),
      C.phase==="grading"?h("span",{class:"small mute"},"Koç okuyor"):null));
  }
  if(C.msg)bub.append(h("div",{class:"small",style:"color:var(--rust)"},C.msg));
  var fb=null;
  if(C.phase==="fb"&&r){
    var good=r.score>=60;
    fb=h("div",{class:"fb "+(good?"good":"bad")},
      h("b",null,(q.kind==="mcq"?(good?"Doğru. ":"Olmadı. "):("Puan: "+r.score+" · "))+"+"+r.xp+" XP"),
      q.kind==="open"?[r.good?h("div",null,r.good):null,r.fix?h("div",null,r.fix):null,h("div",null,h("span",{class:"label"},"Daha iyisi "),r.better),q.model&&q.model!==r.better?h("div",{class:"small mute"},"İdeal: "+q.model):null]:null,
      q.breakdown&&q.breakdown.length&&C.track==="eng"?h("div",null,h("div",{class:"label"},"Beyaz tahta"),h("div",{class:"breakdown"},q.breakdown.map(function(b){return h("span",null,(b.p||"")+" → "+(b.m||""))}))):null,
      q.explanation?h("div",null,q.explanation):null,
      q.analogy?h("div",{style:"font-weight:600"},q.analogy):null,
      q.why?h("div",{class:"small mute"},q.why):null,
      h("div",{class:"row",style:"align-items:center"},
        h("button",{class:"btn",type:"button",onclick:nextQ},C.i+1<C.qs.length?"Sonraki":"Bitir"),
        h("button",{class:"btn ghost",type:"button",onclick:flagQ},"Bu soruda hata var")));
  }
  return h("div",{class:"panel"},prog,h("div",{class:"stage"},charBox(id,mood),h("div",{style:"display:grid;gap:12px;min-width:0"},bub,fb)));
}
function renderDone(){
  var C=S.cls,done=C.res.filter(Boolean),xp=done.reduce(function(s,r){return s+r.xp},0);
  var okc=done.filter(function(r){return r.score>=60}).length;
  return h("div",{class:"panel"},
    h("div",{class:"stage"},charBox(charFor(0),okc>=Math.ceil(done.length*0.6)?"happy":"neutral"),
      h("div",{style:"display:grid;gap:8px"},
        h("h2",null,"Ders bitti"),
        h("div",null,okc+" / "+done.length+" doğru · +"+xp+" XP"),
        C.after?h("div",null,"Konu ustalığı %"+C.after.old+" → ",h("b",null,"%"+C.after.neu)," (oturum ortalaması %"+C.after.pct+"). Kapı sınavında yaklaşık %80'i geçince bina tamamlanır."):h("div",{class:"small mute"},"Ustalık güncellemesi kaydedilemedi."),
        h("div",{class:"small mute"},"Koçlar bu cevapları ve işaretlediğin hataları akşam çalışmasında okur."),
        h("div",{class:"row"},h("button",{class:"btn",type:"button",onclick:startClass},"Yeni ders"),h("button",{class:"btn ghost",type:"button",onclick:function(){tab="bugun";draw()}},"3 satırlık raporu doldur")))));
}

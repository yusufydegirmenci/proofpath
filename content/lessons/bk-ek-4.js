/* Backend yolu · Faz 17b: konu başına ders eki, dördüncü parça (anahtar = TMAP.bk dizini, 46–50; ders no = anahtar + 1). SAA-C03 karşılaştırma dersleri.
   Alanlar: benzetme + sınırı, rehberli alıştırma, bağımsız görev, yaygın hatalar, geçme ölçütü + kritik yanlış anlama, dış kaynak (son doğrulama tarihiyle), telafi/sonraki adım.
   Alıştırmalar kâğıt üzerindedir; AWS konsolunda kaynak açmak, ücretli ya da canlı hesabı değiştiren işlem istemez.
   Dış kaynak: yalnız HTTP 200 dönenler (curl, 2026-10-26). */
(function () {
  var E = ((window.PP_EK = window.PP_EK || {}).bk = (window.PP_EK.bk || {}));
  var DOG = "2026-10-26";
  var A = function (yol, t, neden) { return { t: t, u: "https://docs.aws.amazon.com/" + yol, dogrulama: DOG, neden: neden }; };

  E[46] = {
    analoji: { a: "Eşya saklama: evdeki çekmece (EBS) tek odaya aittir, kapının önündeki geçici kutu (instance store) taşınınca gider, ortak depo (EFS) herkesin girdiği odadır, uzak arşiv deposu (Glacier) ucuzdur ama getirtmek zaman alır.", sinir: "Eşya saklarken yer kapasitesi fiziksel sınırdır; bulutta kapasite büyür ama her tür farklı protokol, kalıcılık ve geri getirme koşulu getirir." },
    rehberli: ["Altı gereksinimi (tek sunucu diski, geçici ara veri, ortak Linux klasörü, Windows AD paylaşımı, belirsiz erişimli nesne, yıllık arşiv) bir tabloya yaz ve her satıra bir depolama seç.", "Her seçimin yanına 'bunu seçmezsem hangi şık yanlış olurdu ve neden' diye tek cümle ekle.", "S3 sınıfları için üç ölçüt sırala: geri getirme süresi, erişim sıklığı, tek AZ kaybı kabulü; hangi ölçüt sınıfı en çok daraltıyor yaz."],
    bagimsiz: "Kurgusal bir medya şirketinin ham videoları, yayın önbelleği, editörlerin ortak proje klasörü ve beş yıllık arşivi için depolama planı çiz. Her veri türüne bir hizmet seç ve gerekçeyle yaz. Gerçek hesapta kaynak açma.",
    hatalar: [["EBS'i ortak klasör sanmak", "EBS tek AZ'dedir; çok sunuculu paylaşım için EFS ya da FSx kullan."], ["Instance store'a kalıcı veri koymak", "Durdurma ya da konak arızasında veri gider; yalnız yeniden üretilebilen veri koy."], ["En ucuz S3 sınıfını her yerde seçmek", "Deep Archive saatler sürer, IA sınıflarında geri getirme ücreti vardır; erişim koşuluna göre seç."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen bir gereksinimi doğru depolamayla eşleştirip diğer şıkların neden yanlış olduğunu söyleyebilmek.", kritik: [
    "EBS'in birden çok AZ'de ortak kullanıldığını sanmak",
    "Instance store'un kalıcı olduğunu sanmak"
  ] },
    kaynaklar: [
      A("AWSEC2/latest/UserGuide/InstanceStorage.html", "AWS Belgesi: EC2 instance store", "Geçici depolamanın kapsamı ve sınırları."),
      A("AmazonS3/latest/userguide/storage-class-intro.html", "AWS Belgesi: Amazon S3 depolama sınıfları", "Sınıfların resmî karşılaştırması.")
    ],
    telafi: "Takıldıysan sırayla sor: kalıcı mı, paylaşılıyor mu, hangi protokol, ne sıklıkla ve ne kadar hızlı okunuyor? Cevaplar depolamayı daraltır.",
    sonraki: "Sıradaki konu: Güvenlik katmanları: Shield, WAF, Network Firewall ve Firewall Manager."
  };

  E[47] = {
    analoji: { a: "Bir alışveriş merkezi: giriş kapısındaki kalabalık yönetimi (Shield) izdihamı keser, ürün kontrolü yapan görevli (WAF) çantaya bakar, içerideki koridor kameraları (Network Firewall) iç hareketi izler, merkez müdürlüğü (Firewall Manager) bütün şubelere aynı kuralı gönderir.", sinir: "Alışveriş merkezinde görevliler çoğunlukla insandır ve esner; bulutta her hizmetin kapsamı ve yapılandırması katıdır, biri diğerinin işini yapmaz." },
    rehberli: ["Dört hizmeti (Shield, WAF, Network Firewall, Firewall Manager) bir yola yerleştir: kullanıcı, kenar, VPC, çıkış, çok hesap.", "SQL enjeksiyonu, hacimsel DDoS, istenmeyen alan adına çıkış ve hesaplar arası kural tutarsızlığı için hangi hizmetin cevap olduğunu yaz.", "Shield Standard ile Advanced arasında üç farkı tabloya yaz."],
    bagimsiz: "Kurgusal bir bankanın web uygulaması için katmanlı güvenlik planı çiz: kenar, uygulama, VPC ve yönetim katmanları. Her katmana bir hizmet ve neden başka bir hizmetin o işi yapamadığını yaz. Gerçek hesapta hizmet açma.",
    hatalar: [["Shield'ın SQL enjeksiyonunu süzdüğünü sanmak", "İçerik düzeyi süzme WAF'ın işidir; Shield DDoS içindir."], ["WAF'ı VPC içi trafiği denetleyen güvenlik duvarı sanmak", "VPC trafiğinde derin denetim için Network Firewall kullan."], ["Firewall Manager'ı kuralları kendi çalıştıran bir araç sanmak", "Firewall Manager ilkeleri hesaplara dağıtır ve Organizations gerektirir."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen bir tehdidi doğru güvenlik hizmetiyle eşleştirip diğerlerinin neden yetmediğini söyleyebilmek.", kritik: [
    "WAF ile Shield'ı aynı iş için sanmak",
    "Güvenlik grubunun HTTP içeriğini incelediğini sanmak"
  ] },
    kaynaklar: [
      A("waf/latest/developerguide/ddos-overview.html", "AWS Belgesi: DDoS koruması ve Shield", "Standard ve Advanced farkının resmî anlatımı."),
      A("waf/latest/developerguide/fms-chapter.html", "AWS Belgesi: AWS Firewall Manager", "Hesaplar arası merkezi ilke yönetimi.")
    ],
    telafi: "Takıldıysan tehdidi katmana yerleştir: ağ/taşıma DDoS mu, HTTP içeriği mi, VPC içi trafik mi, çok hesaplı yönetim mi? Cevap hizmeti söyler.",
    sonraki: "Sıradaki konu: Veri koruma: Macie ile bulma, DataBrew ile maskeleme."
  };

  E[48] = {
    analoji: { a: "Dosya arşivi: bir görevli bütün dolapları gezip hangi dosyada kimlik numarası olduğunu not eder (Macie), başka bir görevli dosyaların kopyalarındaki numaraları siyah mürekkeple karartır (DataBrew); ilk görevli karartmaz, ikincisi arama yapmaz.", sinir: "Arşivde iki görevli aynı kişi olabilir; bulutta bulma ve gizleme ayrı hizmetlerdir ve ayrı yetkilendirilir." },
    rehberli: ["Bir müşteri tablosunda hassas sütunları işaretle ve her biri için sil, karma, değiştir ya da bırak kararı ver.", "Bul-maskele-paylaş akışını üç kutuyla çiz ve her kutuya hizmet adını yaz.", "Şifrelemenin neden maskeleme olmadığını bir cümleyle yaz."],
    bagimsiz: "Kurgusal bir sağlık uygulamasının hasta kayıtlarını (ad, kimlik, tanı, tutar) analitik ekibine açmadan önce bir veri koruma akışı çiz. Hangi alanın maskeleneceğini, hangisinin bırakılacağını ve nedenini yaz. Gerçek veriyle çalışma.",
    hatalar: [["Macie'nin veriyi maskelediğini sanmak", "Macie bulur ve bulgu üretir; maskeleme için DataBrew gibi bir araç gerekir."], ["Macie'nin RDS'yi doğrudan taradığını sanmak", "Macie S3 nesnelerini inceler; veritabanı verisini önce S3'e aktar."], ["Şifrelemeyi maskeleme saymak", "Şifreli veri yetkili okuyucuya açık metin verir; maskeleme değeri gizler."]],
    gecme: { olcut: "Mini sınavda %80 ve bir veri koruma ihtiyacını doğru hizmetle (bulma, maskeleme, erişim, şifreleme) eşleştirebilmek.", kritik: [
    "Macie'nin kendiliğinden maskeleme yaptığını sanmak",
    "KMS şifrelemesinin kişisel veriyi analiste görünmez kıldığını sanmak"
  ] },
    kaynaklar: [
      A("macie/latest/user/what-is-macie.html", "AWS Belgesi: Amazon Macie nedir", "Hassas veri keşfinin resmî tanımı."),
      A("databrew/latest/dg/personal-information-protection.html", "AWS Belgesi: DataBrew ile kişisel bilgi koruma", "Maskeleme dönüşümlerinin resmî anlatımı.")
    ],
    telafi: "Takıldıysan fiile bak: 'bul/sınıflandır' ise Macie, 'maskele/dönüştür' ise DataBrew, 'şifrele' ise KMS, 'kim okuyabilir' ise IAM ya da Lake Formation.",
    sonraki: "Sıradaki konu: Felaket kurtarma stratejileri: RTO, RPO ve dört model."
  };

  E[49] = {
    analoji: { a: "Yangın tatbikatı: bina boşaltma planı hazır bir evde (yedekle ve geri yükle) yeni bina bulmak saatler sürer, yedek ofiste bir masa hazır tutmak (pilot light) süreyi kısaltır, küçük ama çalışan bir ofis (warm standby) daha da kısaltır, iki ofiste aynı anda çalışmak (etkin-etkin) kesintiyi neredeyse sıfırlar.", sinir: "Bir ofisi taşımak fiziksel olarak sürer; bulutta kopya kurmak dakikalar sürebilir ama her yedek ofis sürekli bir ücret demektir." },
    rehberli: ["Dört stratejiyi ucuzdan pahalıya sırala ve her birinin yanına tahmini RTO ve RPO düzeyi yaz.", "Pilot light ile warm standby arasındaki farkı tek cümlede yaz: hangi katman çalışıyor, hangisi kapalı?", "Bir değişikliğin RPO'yu mu RTO'yu mu etkilediğini ayırmak için üç örnek yaz (çoğaltma sıklığı, AMI hazırlığı, DNS TTL)."],
    bagimsiz: "Kurgusal bir sipariş sistemi için RPO ve RTO hedefi seç, uygun stratejiyi belirle ve ikinci bölgedeki bileşenleri (veritabanı çoğaltma, AMI, yönlendirme, yedek) listele. Gerçek hesapta bölge açma.",
    hatalar: [["Multi-AZ'yi felaket kurtarma saymak", "Multi-AZ aynı bölgedeki AZ arızasını karşılar; bölge kaybı için ikinci bölge gerekir."], ["Pilot light ile warm standby'yi karıştırmak", "Pilot light'ta uygulama sunucuları kapalıdır; warm standby'de küçültülmüş ama çalışır."], ["AMI ve TTL ayarını RPO çözümü sanmak", "Bunlar RTO'yu etkiler; RPO çoğaltma ve yedek sıklığına bağlıdır."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen RTO ve RPO hedefine uyan en ucuz stratejiyi seçip diğer stratejilerin neden yetersiz ya da gereksiz pahalı olduğunu söyleyebilmek.", kritik: [
    "Multi-AZ'nin bölge kaybından koruduğunu sanmak",
    "Çoğaltmanın yedeğin yerini tuttuğunu sanmak"
  ] },
    kaynaklar: [
      A("whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-workloads-on-aws.html", "AWS Belgesi: Felaket kurtarma teknik belgesi", "Strateji ve hedef tanımlarının resmî kaynağı."),
      A("whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html", "AWS Belgesi: Bulutta felaket kurtarma seçenekleri", "Dört stratejinin yan yana karşılaştırması.")
    ],
    telafi: "Takıldıysan iki sayıyı yaz: ne kadar veri kaybı, ne kadar kesinti? Sonra dört stratejiyi ucuzdan pahalıya sırala ve hedefi karşılayan en ucuzunu seç.",
    sonraki: "Sıradaki konu: Hibrit bağlantı yedeği: Direct Connect ve Site-to-Site VPN."
  };

  E[50] = {
    analoji: { a: "Şehirlerarası yol: ana otoyol (Direct Connect) hızlı ve öngörülebilirdir, ücretsiz kısa yol (VPN) yavaş ama her an açıktır; ikinci bir otoyol farklı bir ilden geçerse (ayrı konum) bir ilin kapanması seni durdurmaz.", sinir: "Yolda iki güzergah fiziksel olarak ayrıdır; bulutta aynı konumda iki bağlantı yine aynı kabloda çökebilir, güzergah ayrımı tasarımla sağlanır." },
    rehberli: ["Tek bağlantı, aynı konumda iki bağlantı ve ayrı konumlarda iki bağlantı için hangi arızaların karşılandığını tabloya yaz.", "Aynı ön ek DX ve VPN'den duyurulduğunda hangi yolun seçildiğini ve nedenini yaz.", "Direct Connect üzerinde şifrelemenin neden varsayılan olmadığını ve iki çözümü yaz."],
    bagimsiz: "Kurgusal bir hastanenin veri merkezi ile AWS arasındaki bağlantı için birincil ve yedek yol tasarla. Bütçe düşük olsa da yüksek olsa da hangi seçeneğin değişeceğini ve neden değiştiğini yaz. Gerçek hat sipariş etme.",
    hatalar: [["Direct Connect'in şifreli olduğunu sanmak", "Varsayılan olarak şifrelemez; IPsec için üzerinde VPN kur."], ["İki bağlantıyı aynı cihaza bağlayıp dayanıklı saymak", "Cihaz ya da konum kaybı ikisini birden keser; ayrı cihaz ve konum kullan."], ["VPN yedeğinin birincille aynı performansı vereceğini varsaymak", "VPN internet üzerindedir; bant genişliği ve gecikme değişebilir."]],
    gecme: { olcut: "Mini sınavda %80 ve bir hibrit bağlantı gereksinimine (maliyet, süre, dayanıklılık, şifreleme) uyan tasarımı seçebilmek.", kritik: [
    "Direct Connect'in varsayılan olarak şifrelediğini sanmak",
    "Aynı konumdaki iki bağlantının konum kaybına dayanacağını sanmak"
  ] },
    kaynaklar: [
      A("directconnect/latest/UserGuide/resiliency_toolkit.html", "AWS Belgesi: Direct Connect dayanıklılık araç seti", "Dayanıklılık modellerinin resmî anlatımı."),
      A("vpn/latest/s2svpn/VPC_VPN.html", "AWS Belgesi: AWS Site-to-Site VPN", "VPN bağlantısı ve tünel kavramları.")
    ],
    telafi: "Takıldıysan koşul sözcüğüne bak: 'en düşük maliyet/hızlı' ise VPN, 'en dayanıklı' ise ayrı konumlarda ikinci Direct Connect, 'şifreleme' ise Direct Connect üzerinde VPN.",
    sonraki: "Backend yolunun karşılaştırma derslerini bitirdin; şimdi elindeki konuları bir mimari tasarımında birleştirebilirsin."
  };
})();

/* Siber güvenlik (Security+ SY0-701 temelli) · sabit dersler 35-38 */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).sec = (window.PP_LESSONS.sec || {}));
  var CT = { title: "CompTIA Security+ sınav hedefleri (SY0-701)", url: "https://www.comptia.org/certifications/security" };
  var PM = { title: "Professor Messer: Security+ SY0-701 (ücretsiz video kursu)", url: "https://www.professormesser.com/", type: "video", length: "Çok bölümlü", level: "başlangıç", lang: "EN" };
  function res(a, why) { var o = {}; for (var k in a) o[k] = a[k]; o.why = why; return o; }

  /* 35 ──────────────────────────────────────────── IoT, gömülü sistemler ve ICS/SCADA */
  L[35] = {
    hook: "Su arıtma tesisindeki bir kontrolör, kırk yıllık bir bilgisayardan daha eskidir ve kimse onu kapatıp güncelleyemez. Peki onu nasıl korursun?",
    homework: "Evindeki ya da iş yerindeki ağa bağlı üç 'akıllı' cihazı yaz (kamera, yazıcı, TV gibi). Her birinin varsayılan parolasını değiştirip değiştirmediğini ve internete açık olup olmadığını not et.",
    warmup: {
      recap: [{ point: "Ağ segmentasyonu ihlalin yayılmasını sınırlar.", example: "Misafir ve sunucu VLAN'ları" }],
      concepts: [
        { term: "ICS / SCADA", tr: "Endüstriyel kontrol sistemleri", summary: "Fabrika, enerji ve su gibi fiziksel süreçleri izleyen ve yöneten sistemlerin genel adı.", example: "Barajdaki kapak kontrolü" },
        { term: "Embedded system", tr: "Gömülü sistem", summary: "Belirli bir işi yapmak üzere bir cihazın içine yerleştirilmiş küçük bilgisayar ve yazılımı.", example: "Çamaşır makinesi kartı" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Bir fabrikada üretim hattını yöneten kontrolörler yıllardır kapanmadan çalışıyor. Üretici desteği bitti, yama yok. Aynı ağda ofis bilgisayarları da var. Bu cihazı kapatamazsın, güncelleyemezsin; geriye onu çevresindeki kontrollerle korumak kalır." },
      { t: "steps", h: "Cihaz aileleri", items: ["IoT (nesnelerin interneti): kamera, akıllı priz, termostat, yazıcı gibi ağa bağlı küçük cihazlar. Çoğu zayıf varsayılan parola ve nadir güncelleme ile gelir.", "Gömülü sistem: tek bir işe adanmış yazılım. Kaynakları kısıtlıdır; güvenlik yazılımı kurmak çoğu zaman mümkün değildir.", "RTOS (gerçek zamanlı işletim sistemi): olayı belirli bir süre içinde işlemek zorunda olan cihazlarda kullanılır. Öngörülebilir zamanlama önceliktir, güvenlik özellikleri çoğu zaman ikinci plandadır.", "ICS / OT: fiziksel süreci yöneten operasyonel teknoloji. PLC (programlanabilir mantık denetleyici) vanayı, motoru, bandı doğrudan sürer; HMI operatörün ekranıdır; historian verileri kaydeder.", "SCADA: geniş alana dağılmış tesisleri uzaktan izleyen ve denetleyen sistem; merkez ile sahadaki cihazlar arasında haberleşir."] },
      { t: "box", h: "BT ve OT önceliği farklıdır", text: "Ofis ağında (BT) önce gizlilik düşünülür. Endüstriyel ağda (OT) önce erişilebilirlik ve güvenlik (safety) gelir: bir vananın yanlış açılması can kaybına yol açabilir. Bu yüzden OT'de 'hemen yamala ve yeniden başlat' alışkanlığı çalışmaz." },
      { t: "steps", h: "Tipik zayıflıklar", items: ["Varsayılan veya paylaşılan parolalar; güçlü kimlik doğrulama olmayan eski haberleşme protokolleri.", "Yama gelmeyen, desteği bitmiş yazılım ve firmware.", "BT ağıyla düz (segmentasyonsuz) bağlantı; bakım için açılan uzak erişim yolları.", "Fiziksel erişim: kilitsiz panolar, takılı bırakılan USB portları.", "Envanterde olmayan, kimsenin sahiplenmediği 'gölge' cihazlar."] },
      { t: "steps", h: "Savunma", items: ["Envanter çıkar: neyin var olduğunu bilmediğin cihazı koruyamazsın.", "Segmentasyon: OT ve IoT cihazlarını ayrı bölgeye al; BT ile arasına güvenlik duvarı ve DMZ koy; yalnızca gerekli trafiğe izin ver.", "Hava boşluğu (air gap): kritik ağı fiziksel olarak ayırmak. Tam koruma değildir; USB bellek ve bakım dizüstüsü köprü olabilir.", "Yamalanamayan cihaz için telafi edici kontrol: izolasyon, erişim listeleri, izleme, fiziksel kilit.", "Varsayılan parolayı değiştir, gereksiz servisleri kapat, uzak erişimi MFA ve kayıt altında ver."] },
      { t: "h", text: "Kısa blok: kod olarak altyapı (IaC)" },
      { t: "box", h: "Altyapıyı da koda dökmek", text: "Kod olarak altyapı (IaC), sunucu ve ağ ayarlarını elle değil şablon dosyalarla tanımlamaktır. Dosyalar sürüm denetiminde tutulur; böylece her değişikliği kim, ne zaman, neden yaptı görürsün. Aynı şablon her seferinde aynı sonucu verdiği için sapma azalır." },
      { t: "steps", h: "IaC ve sürüm denetimi güvenliği", items: ["Sırları (parola, anahtar) şablona yazma; gizli yönetim kasasından çek. Depoya sır sızdıysa onu silmek yetmez, mutlaka yenile.", "Depoda sır taraması ve kod incelemesi (pull request onayı) zorunlu olsun; ana dala doğrudan yazma izni kısıtlansın.", "Değişmez altyapı (immutable infrastructure): çalışan sunucuyu elle değiştirme; yeni sürümden yeni örnek kur, eskisini kaldır. Böylece yapılandırma sapması ve izsiz elle müdahale biter.", "Şablonları dağıtımdan önce otomatik güvenlik kurallarıyla tara (açık depolama, her yere açık port gibi)."] },
      { t: "warn", h: "Tuzak", text: "'Cihaz ağa bağlı değil, güvenli' düşüncesi yanıltıcıdır. Hava boşluklu sistemlere de USB, bakım dizüstüsü veya tedarikçinin getirdiği yazılımla girilebilir. Ayrıca yamayı atlamak ancak telafi edici kontrol varsa kabul edilebilir bir risk kararıdır; 'unutuldu' değildir." }
    ],
    objectives: [
      { id: "h1", text: "PLC, SCADA, RTOS ve IoT gibi cihaz ailelerini görevlerine ve tipik risklerine göre ayırt edebilirsin." },
      { id: "h2", text: "Yamalanamayan eski bir cihaz için segmentasyon, hava boşluğu ve izleme gibi telafi edici kontrollerden uygun olanı seçebilirsin." },
      { id: "h3", text: "Kod olarak altyapı ve sürüm denetimi için sır yönetimi ile kontrollü değişiklik kurallarından doğru olanı seçebilirsin." }
    ],
    summary: [
      "IoT, gömülü sistem ve ICS cihazları kısıtlı kaynakla, uzun ömürle ve çoğu zaman zayıf varsayılanlarla gelir.",
      "PLC fiziksel süreci sürer, HMI operatörün ekranıdır, SCADA ise dağınık tesisleri merkezden izler ve denetler.",
      "OT dünyasında erişilebilirlik ve fiziksel güvenlik önceliklidir; yama ve yeniden başlatma bu yüzden dikkatle planlanır.",
      "Yamalanamayan cihazlar segmentasyon, erişim kısıtı, izleme ve fiziksel koruma gibi telafi edici kontrollerle korunur; hava boşluğu da mutlak değildir.",
      "IaC ve sürüm denetiminde sırlar koda yazılmaz, değişiklikler incelenir ve değişmez altyapıyla sunucular elle değil yeniden kurularak güncellenir."
    ],
    quiz: [
      { id: "d26ccea8", q: "Endüstriyel bir tesiste motor, vana ve konveyör gibi fiziksel parçaları doğrudan süren cihaza ne denir?", options: ["PLC (programlanabilir mantık denetleyici)","SIEM sunucusu","Kablosuz denetleyici","Sertifika yetkilisi"], obj: "h1" },
      { id: "b2ac74bf", q: "Geniş bir alana dağılmış su pompa istasyonlarını merkezden izleyip uzaktan denetleyen sistem türü hangisidir?", options: ["Honeypot","SCADA","Hypervisor","Proxy sunucu"], obj: "h1" },
      { id: "3c36d626", q: "Ofise yeni takılan akıllı kamera, fabrika varsayılanı yönetici parolasıyla ve internete açık geldi. İlk adım olarak hangisi uygundur?", options: ["Kamerayı olduğu gibi bırakıp yalnızca kayıt süresini uzatmak","Parolayı herkesin hatırlaması için kasada yazılı tutmak","Varsayılan parolayı değiştirmek, gereksiz uzak erişimi kapatmak ve kamerayı ayrı bir IoT bölgesine almak","Kamerayı kullanıcı bilgisayarlarıyla aynı ağda tutup güncelleme beklemek"], obj: "h1" },
      { id: "5ed43e88", q: "Üretici desteği bitmiş bir tıbbi görüntüleme cihazı yamalanamıyor ama çalışmaya devam etmesi gerekiyor. En uygun telafi edici kontrol hangisidir?", options: ["Cihazı doğrudan internete açıp uzaktan destek beklemek","Tüm personele yerel yönetici hakkı vermek","Cihazı güvenlik taramasından sürekli muaf tutmak","Cihazı ayrı bir ağ bölgesine alıp erişimi yalnızca gereken sistemlerle sınırlamak ve izlemek"], obj: "h2" },
      { id: "91c11c13", q: "Hava boşluklu (air gap) bir ICS ağı için hangi ifade doğrudur?", options: ["Fiziksel ayrım olsa bile USB bellek veya bakım dizüstüsü zararlı yazılımı içeri taşıyabilir","Ağ ayrık olduğu için zararlı yazılım hiçbir yoldan giremez","Hava boşluğu varsa kayıt ve izleme gereksizdir","Hava boşluğu yalnızca kablosuz bağlantılar için anlam taşır"], obj: "h2" },
      { id: "bbdee112", q: "Bir geliştirici bulut şablonuna veritabanı parolasını yazıp ortak depoya gönderdi. Hangi yanıt en doğrudur?", options: ["Yalnızca dosyadaki satırı silip yeni bir sürüm göndermek","Parolayı koddan çıkarıp gizli yönetim kasasına taşımak, sızan parolayı yenilemek ve depoda sır taramasını açmak","Depoyu herkese kapatıp parolayı olduğu gibi kullanmaya devam etmek","Parolayı şablonda şifreleyip anahtarını aynı dosyaya eklemek"], obj: "h3" },
      { id: "dec6eeb9", q: "Değişmez altyapı (immutable infrastructure) yaklaşımında bir sunucunun yamalanması nasıl yapılır?", options: ["Çalışan sunucuya bağlanıp ayarlar elle değiştirilir","Sunucu hiç güncellenmeden yıllarca çalıştırılır","Yeni sürümden yeni bir örnek kurulur, trafik ona aktarılır ve eski örnek kaldırılır","Değişiklikler yalnızca sunucudaki notlara yazılır"], obj: "h3" }
    ],
    interview: [
      { q: "Yama yapılamayan bir endüstriyel cihazı nasıl korursun?", a: "Önce envanterde yer alıp almadığına bakarım. Sonra ayrı bir ağ bölgesine alır, güvenlik duvarıyla yalnızca gereken trafiğe izin veririm. İzleme, fiziksel kilit ve bakım erişimi için kontrol eklerim; riski belgeleyip sahiplenmiş birine bağlarım." },
      { q: "IaC'de sırlar neden depoda tutulmaz?", a: "Sürüm geçmişi her eski halini saklar ve depoya erişen herkes görebilir. Sırlar bir gizli yönetim kasasında tutulur, çalışma anında çekilir; sızarsa yenilenir." }
    ],
    vocab: [
      { term: "PLC", tr: "programlanabilir mantık denetleyici", ex: "The PLC controls the conveyor." },
      { term: "SCADA", tr: "uzaktan izleme ve denetim sistemi", ex: "SCADA monitors remote pumps." },
      { term: "RTOS", tr: "gerçek zamanlı işletim sistemi", ex: "The sensor runs an RTOS." },
      { term: "Air gap", tr: "hava boşluğu", ex: "The plant uses an air gap." },
      { term: "Immutable infrastructure", tr: "değişmez altyapı", ex: "We use immutable infrastructure." },
      { term: "Compensating control", tr: "telafi edici kontrol", ex: "Isolation is a compensating control." }
    ],
    resources: [
      res(PM, "IoT, gömülü sistemler ve ICS bölümleri"),
      { title: "NIST SP 800-82: Endüstriyel Kontrol Sistemleri Güvenliği Rehberi", url: "https://csrc.nist.gov/pubs/sp/800/82/r3/final", type: "doc", why: "OT ağlarını koruma yöntemleri", level: "orta", lang: "EN" }
    ],
    sources: [CT]
  };

  /* 36 ──────────────────────────────────────────── Mobil cihaz güvenliği */
  L[36] = {
    hook: "Cebindeki telefon hem şirketin e-postasını hem aile fotoğraflarını taşıyor. Kaybolduğunda şirket neyi silebilir, neyi silmemelidir?",
    homework: "Kendi telefonunda ekran kilidi, otomatik kilit süresi ve 'Cihazımı bul' özelliğinin açık olup olmadığını kontrol et. Hangi uygulamaların konum ve kamera izni olduğuna bak; gereksiz olanlardan üçünü kapat.",
    warmup: {
      recap: [{ point: "Kimlik ve erişim kontrolleri verinin kimin elinde olduğunu belirler.", example: "MFA ve en az yetki" }],
      concepts: [
        { term: "MDM / UEM", tr: "Mobil cihaz / birleşik uç nokta yönetimi", summary: "Kurumun cihazlara politika uyguladığı, uygulama dağıttığı ve gerektiğinde silme komutu gönderdiği yönetim platformu.", example: "Ekran kilidi zorunluluğu" },
        { term: "BYOD", tr: "Kendi cihazını getir", summary: "Çalışanın kendi telefonunu ya da tabletini işte kullandığı model.", example: "Kişisel telefonla kurumsal e-posta" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Satış ekibi müşteri listesine telefonlarından ulaşıyor. Biri telefonunu taksiye unuttu. Cihaz kilitli değilse müşteri verisi başkasının eline geçer. Şirket telefonu uzaktan silerse çalışanın kişisel fotoğrafları da gider. Bu yüzden önce hangi cihaz modelinin kullanıldığı ve neyin kimin olduğu belirlenir." },
      { t: "steps", h: "Dağıtım modelleri", items: ["BYOD (kendi cihazını getir): cihaz çalışanındır; kurumun kontrolü sınırlıdır, kişisel ve kurumsal veri karışır.", "COBO (şirketin sahibi olduğu, yalnızca iş için): cihaz şirketindir ve yalnızca iş amaçlı kullanılır; kontrol en yüksektir.", "COPE (şirketin sahibi olduğu, kişisel kullanıma da açık): cihaz şirketindir, sınırlı kişisel kullanıma izin verilir.", "CYOD (kendi cihazını seç): çalışan kurumun onayladığı listeden cihaz seçer; sahip genelde şirkettir."] },
      { t: "steps", h: "Yönetim ve kontroller", items: ["MDM cihaz ayarlarını, UEM ise telefon, bilgisayar ve diğer uç noktaları tek konsoldan yönetir.", "Ekran kilidi, PIN/biyometri, otomatik kilit ve cihaz şifrelemesi zorunlu kılınır.", "Uzaktan silme: kayıp ya da çalıntı cihazda verinin silinmesi. BYOD'da yalnızca kurumsal konteyner silinir (seçici silme).", "Uygulama yönetimi (MAM): hangi uygulamaların kurulacağı, hangisinin kurumsal veriye erişeceği ve verinin hangi uygulamaya kopyalanabileceği belirlenir.", "Konteynerleştirme / iş profili: iş uygulamaları ve verileri kişisel alandan ayrı şifreli bir alanda tutulur.", "Konum, kamera ve mikrofon izinleri en az yetki ilkesiyle ve gerektiğinde coğrafi sınırlama (geofencing) ile yönetilir."] },
      { t: "box", h: "Uyumluluk politikası", text: "UEM, cihazın durumunu denetler: işletim sistemi güncel mi, ekran kilidi var mı, cihaz jailbreak/root yapılmış mı? Uyumsuz cihazın kurumsal e-postaya ve uygulamalara erişimi otomatik engellenir." },
      { t: "steps", h: "Tipik riskler", items: ["Jailbreak (iOS) ve root (Android): işletim sisteminin koruma sınırlarını kaldırır, uygulama izolasyonu ve imza denetimi zayıflar.", "Sideloading: uygulamayı resmi mağaza dışından kurmak; mağazanın tarama ve inceleme adımlarından geçmemiş zararlı uygulama gelebilir.", "Güvenilmeyen Wi-Fi'da trafik dinlenebilir; kurumsal erişimde VPN ya da uygulama bazlı şifreleme kullanılır.", "Kayıp veya çalıntı cihaz, güncellenmeyen işletim sistemi, aşırı izin isteyen uygulamalar."] },
      { t: "warn", h: "Tuzak", text: "'Uzaktan silme var, o halde sorun yok' düşüncesi eksiktir: cihaz ağa bağlı değilse komut ulaşmaz. Bu yüzden önce şifreleme ve ekran kilidi gelir; uzaktan silme ikinci katmandır. Ayrıca BYOD'da çalışanın gizliliği için yalnızca kurumsal veri silinmeli, kişisel veri korunmalıdır." }
    ],
    objectives: [
      { id: "h1", text: "BYOD, COBO, COPE ve CYOD modellerini sahiplik ve kontrol düzeyine göre ayırt edebilirsin." },
      { id: "h2", text: "Kayıp cihaz ve veri ayrımı senaryolarında MDM/UEM, uzaktan silme, konteyner ve uygulama yönetimi arasından uygun kontrolü seçebilirsin." },
      { id: "h3", text: "Jailbreak/root yapılmış cihaz ve sideloading kaynaklı riskleri açıklayan doğru gerekçeyi seçebilirsin." }
    ],
    summary: [
      "BYOD'da cihaz çalışanın, COBO'da şirketin ve yalnızca işe ayrılmıştır; COPE sınırlı kişisel kullanıma izin verir; CYOD'da çalışan onaylı listeden seçer.",
      "MDM/UEM, ekran kilidi ve şifreleme gibi politikaları uygular, uyumsuz cihazı erişimden engeller ve uzaktan silme komutu gönderebilir.",
      "Konteynerleştirme ve uygulama yönetimi, kurumsal ve kişisel verinin aynı cihazda karışmasını önler; BYOD'da seçici silmeyi mümkün kılar.",
      "Jailbreak/root işletim sisteminin korumalarını kaldırır; sideloading ise resmi mağaza denetimini atlar. İkisi de uyumluluk politikasıyla engellenir.",
      "Konum, kamera ve mikrofon izinleri en az yetki ilkesiyle verilir; uzaktan silme son çaredir, önce kilit ve şifreleme gelir."
    ],
    quiz: [
      { id: "37d9bfe1", q: "Cihazı şirket satın alıp çalışana verir ve sınırlı kişisel kullanıma da izin verir. Bu model hangisidir?", options: ["BYOD","COBO","VDI","COPE"], obj: "h1" },
      { id: "9e145881", q: "Hangi dağıtım modelinde cihazın sahibi çalışandır ve kurumun kontrolü doğal olarak en sınırlıdır?", options: ["BYOD","COBO","COPE","CYOD"], obj: "h1" },
      { id: "abd7af80", q: "Satış temsilcisi kurumsal e-postası yüklü telefonunu kaybetti. Cihaz UEM'e kayıtlı. Hangi yanıt en uygundur?", options: ["Yalnızca çalışanın yeni telefon almasını beklemek","UEM konsolundan cihazı kilitleyip kurumsal veriyi uzaktan silmek ve kullanıcının oturum belirteçlerini iptal etmek","Kullanıcıya parolasını bir hafta boyunca değiştirmemesini söylemek","Cihazı sadece tekrar bulunana kadar göz ardı etmek"], obj: "h2" },
      { id: "9723e5ed", q: "Aynı telefonda iş uygulamalarının ve verisinin kişisel alandan ayrı, şifreli bir bölümde tutulmasını sağlayan yaklaşım hangisidir?", options: ["Cihaza root erişimi vermek","Resmi mağaza dışından kurulum izni vermek","Konteynerleştirme (iş profili)","Konum hizmetlerini her uygulamaya açık bırakmak"], obj: "h2" },
      { id: "ee31179f", q: "Bir kurum, jailbreak yapılmış telefonların e-posta ve iş uygulamalarına erişmesini engelliyor. Bunun temel gerekçesi nedir?", options: ["Jailbreak telefonu fiziksel olarak daha yavaş hale getirdiği için","Jailbreak yalnızca ekran parlaklığı ayarını değiştirdiği için","Jailbreak yapılan cihazlarda ekran kilidi kullanılamadığı için","İşletim sisteminin uygulama izolasyonu ve imza denetimi gibi korumaları zayıfladığı için zararlı uygulama kurumsal veriye erişebilir"], obj: "h3" },
      { id: "0dcecab4", q: "Bir çalışan, resmi mağazada bulunmayan bir uygulamayı doğrudan indirdiği dosyayla kurmak istiyor (sideloading). Bu neden risklidir?", options: ["Uygulama mağazanın tarama ve inceleme adımlarından geçmediği için zararlı kod içerebilir","Mağaza uygulamaları hiçbir zaman güvenli olmadığı için","Sideloading cihazın pil ömrünü kalıcı olarak düşürdüğü için","Sideloading yalnızca tabletlerde çalıştığı için"], obj: "h3" },
      { id: "43128a13", q: "Bir çalışan kurumsal belgeyi telefondaki kişisel bir bulut uygulamasına kopyalıyor. Hangi kontrol bu veri sızıntısını en doğrudan azaltır?", options: ["Telefonun ekran parlaklığını ve otomatik kilit süresini yeniden ayarlamak","Uygulama yönetimi ile kurumsal verinin yalnızca onaylı uygulamalara kopyalanabilmesini ve kaydedilebilmesini kısıtlamak","Çalışandan ekran koruyucu görselini kurum logosuyla değiştirmesini istemek","Belgeyi tüm çalışanlara e-postayla göndererek herkesin erişmesini sağlamak"], obj: "h2" }
    ],
    interview: [
      { q: "BYOD için hangi güvenlik kontrollerini istersin?", a: "Cihazı UEM'e kaydettirir, ekran kilidi, şifreleme ve güncel işletim sistemi zorunluluğu koyarım. Kurumsal veriyi konteyner ya da iş profiliyle ayırırım; çalışan ayrıldığında yalnızca kurumsal alanı silerim. Jailbreak/root cihazı engellerim." },
      { q: "Uzaktan silme tek başına yeterli mi?", a: "Hayır. Cihaz ağa bağlı değilse komut ulaşmaz. Önce ekran kilidi ve tam cihaz şifrelemesi gelir, uzaktan silme ve belirteç iptali bunları tamamlar." }
    ],
    vocab: [
      { term: "BYOD", tr: "kendi cihazını getir", ex: "We allow BYOD with a profile." },
      { term: "MDM", tr: "mobil cihaz yönetimi", ex: "The MDM enforces a screen lock." },
      { term: "Remote wipe", tr: "uzaktan silme", ex: "We triggered a remote wipe." },
      { term: "Sideloading", tr: "mağaza dışı uygulama kurulumu", ex: "Sideloading is blocked." },
      { term: "Jailbreak", tr: "iOS koruma sınırlarını kaldırma", ex: "Jailbroken devices fail compliance." },
      { term: "Containerization", tr: "konteynerleştirme", ex: "Containerization separates work data." }
    ],
    resources: [
      res(PM, "Mobil cihaz güvenliği bölümü")
    ],
    sources: [CT]
  };

  /* 37 ──────────────────────────────────────────── Kablosuz ağ güvenliği */
  L[37] = {
    hook: "Kafedeki 'Misafir_WiFi' ağına bağlandın. Peki bunun gerçekten kafenin ağı mı yoksa masadaki başka bir cihazın yaydığı kopya mı olduğunu nasıl anlarsın?",
    homework: "Evdeki modemin yönetim sayfasına gir (ya da bilgi al). Wi-Fi şifreleme türünün ne olduğunu, WPS'in açık olup olmadığını ve misafir ağı özelliği olup olmadığını not et.",
    warmup: {
      recap: [{ point: "Ağ segmentasyonu misafir trafiğini iç ağdan ayırır.", example: "Misafir VLAN'ı" }],
      concepts: [
        { term: "WPA3", tr: "Wi-Fi koruma standardı (3. nesil)", summary: "Kişisel ağlarda parola korumasını SAE el sıkışmasıyla güçlendiren, kurumsal ağlarda daha güçlü şifreleme seçenekleri sunan standart.", example: "Evde WPA3-Personal" },
        { term: "802.1X", tr: "Port tabanlı kimlik doğrulama", summary: "Cihaz ağa girmeden önce bir kimlik doğrulama sunucusuna (RADIUS) doğrulanır.", example: "Kurumsal Wi-Fi girişi" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Bir şirket tüm çalışanlar için tek ortak Wi-Fi parolası kullanıyor. Bir çalışan işten ayrıldı ama parola aynı kaldı. Parolayı değiştirmek herkesin cihazını yeniden ayarlamak demek. Kullanıcı bazlı kimlik doğrulama (802.1X) bu sorunu çözer: ayrılanın hesabı kapatılır, ağ aynı kalır." },
      { t: "steps", h: "Şifreleme ve kimlik doğrulama", items: ["Açık ağ: şifreleme yoktur; kapsama alanındaki herkes trafiği dinleyebilir. Yeni nesil açık ağ modu (OWE) trafiği kullanıcı başına şifreler.", "WEP: eski, RC4 ve kısa başlatma vektörü kullanır; dakikalar içinde kırılabilir. Kullanılmamalıdır.", "WPA / TKIP: WEP'in geçici düzeltmesidir, artık önerilmez.", "WPA2: AES tabanlı CCMP şifreleme kullanır. Personal (PSK) ortak paroladır; Enterprise ise 802.1X ve RADIUS kullanır.", "WPA3: Personal'da SAE el sıkışması parolanın çevrimdışı tahmin saldırılarını zorlaştırır ve oturum başına ileri gizlilik sağlar; yönetim çerçevelerinin korunması (PMF) zorunludur."] },
      { t: "steps", h: "WPA-Enterprise (802.1X + RADIUS)", items: ["İstemci (supplicant): bağlanmak isteyen cihaz.", "Kimlik doğrulayıcı (authenticator): erişim noktası ya da switch; kararı vermez, sorgu iletir.", "RADIUS sunucusu: kullanıcı ya da sertifikayı doğrular, kabul ya da ret döner.", "EAP yöntemleri: sertifika tabanlı olanlar (EAP-TLS) parola tabanlılardan daha güçlüdür; sunucu sertifikası doğrulanmalıdır."] },
      { t: "box", h: "Sahte erişim noktası (evil twin)", text: "Saldırgan bilinen bir SSID'yi taklit eden daha güçlü sinyalli bir erişim noktası kurar; cihazlar buna bağlanıp trafiklerini ona verir. Savunma: sertifikalı 802.1X ile sunucu doğrulaması, kablosuz saldırı tespiti (WIDS/WIPS), yetkisiz erişim noktası taraması, güvenilmeyen ağda VPN ve kullanıcılara 'bağlanırken uyarıları oku' eğitimi." },
      { t: "steps", h: "Diğer riskler", items: ["WPS: PIN ile kolay eşleştirme. PIN doğrulaması iki parçalı olduğu için deneme sayısı küçülür ve kaba kuvvete açıktır; kapatılmalıdır.", "Bluetooth: bluejacking (istenmeyen mesaj gönderme) ve bluesnarfing (izinsiz veri çekme). Gereksiz yere görünür bırakma, eski eşleştirmeleri silme, güncelleme ve kapatma önlemdir.", "Zayıf PSK, varsayılan yönetici parolası ve güncellenmeyen erişim noktası yazılımı."] },
      { t: "steps", h: "Planlama: site survey ve yerleşim", items: ["Site survey: binada sinyal gücünü ve parazit kaynaklarını ölçerek erişim noktası sayısı ve yerini belirlemek.", "Isı haritası (heat map): sinyal gücünü renklerle gösteren harita; ölü bölge ve gereksiz taşmayı ortaya çıkarır.", "Kanal planı: komşu erişim noktaları farklı kanallarda çalışmalı; 2,4 GHz'de çakışmayan kanallar (1, 6, 11) yaygın tercih, 5 GHz'de daha fazla seçenek vardır.", "Sinyal sızıntısı: gücü gereksiz yüksek tutmak dışarıdan dinlemeye ve çalışma alanı dışına taşmaya yol açar."] },
      { t: "box", h: "Misafir ağı", text: "Misafir SSID'si ayrı VLAN'a bağlanır, iç ağa erişimi yoktur, yalnızca internete çıkışa izin verilir. İstemci izolasyonu ile misafirler birbirini göremez. Gerekirse captive portal ile kullanım şartları kabul ettirilir." },
      { t: "warn", h: "Tuzak", text: "SSID'yi gizlemek güvenlik sağlamaz; ağ adı kablosuz trafikte yine görünür. Gizli SSID cihazları sürekli ağ aramaya iter. Gerçek koruma güçlü kimlik doğrulama, şifreleme ve izlemedir." }
    ],
    objectives: [
      { id: "h1", text: "WEP, WPA2 ve WPA3'ü şifreleme ve parola koruması açısından ayırt edebilirsin." },
      { id: "h2", text: "Evil twin saldırısını ve WPA-Enterprise (802.1X + RADIUS) çözümünü bir senaryoda eşleştirebilirsin." },
      { id: "h3", text: "Site survey, ısı haritası, kanal planı ve misafir ağı ayrımı için doğru yerleşim kararını seçebilirsin." },
      { id: "h4", text: "WPS ve Bluetooth kaynaklı riskleri tanıyıp uygun azaltma adımını seçebilirsin." }
    ],
    summary: [
      "WEP kırılabilir ve kullanılmamalıdır; WPA2 AES-CCMP kullanır; WPA3 SAE ile parola tahminini zorlaştırır ve PMF'yi zorunlu kılar.",
      "WPA-Enterprise, ortak parola yerine kullanıcı ya da sertifika bazlı kimlik doğrulama için 802.1X ve RADIUS kullanır.",
      "Evil twin, meşru SSID'yi taklit eden sahte erişim noktasıdır; sunucu doğrulaması, WIPS ve VPN ile azaltılır.",
      "Site survey ve ısı haritası erişim noktalarının yerini ve kanallarını belirler; misafir ağı ayrı VLAN ve istemci izolasyonu ile iç ağdan ayrılır.",
      "WPS PIN kapatılmalı, Bluetooth gereksiz yere görünür bırakılmamalı ve cihazlar güncel tutulmalıdır."
    ],
    quiz: [
      { id: "133a6956", q: "Parola koruması çevrimdışı tahmin saldırılarına karşı SAE el sıkışmasıyla güçlendirilen Wi-Fi güvenlik standardı hangisidir?", options: ["WEP","WPA2-Personal (PSK)","WPA3-Personal","Açık ağ + captive portal"], obj: "h1" },
      { id: "ad429b10", q: "WEP neden artık kullanılmamalıdır?", options: ["Yalnızca 5 GHz bandında çalıştığı için kapsama alanı dardır","AES-GCMP kullandığı için çok yavaştır","Her kullanıcıya ayrı oturum anahtarı verdiği için yönetimi zordur","Kısa başlatma vektörüyle RC4 kullandığı için anahtar kısa sürede kurtarılabilir"], obj: "h1" },
      { id: "39da9e20", q: "Kafe yakınında aynı SSID adını yayan, sinyali daha güçlü bir cihaz görüyorsun ve birçok kullanıcı ona bağlanıyor. Bu hangi saldırıdır?", options: ["Evil twin (sahte erişim noktası)","Bluesnarfing","Wardriving","WPS PIN kaba kuvvet"], obj: "h2" },
      { id: "22b9f4f7", q: "Bir kurum, ortak parola yerine kullanıcı bazlı kimlik doğrulama istiyor ve ayrılan çalışanın erişimini tek hesapla kapatabilmek istiyor. En uygun çözüm hangisidir?", options: ["WPA2-Personal parolasını sık sık değiştirmek","WPA2/WPA3-Enterprise: 802.1X ile RADIUS sunucusu","SSID'yi gizlemek","MAC adresi süzmeyi tek koruma yapmak"], obj: "h2" },
      { id: "8ca1741d", q: "Bir ofiste bazı odalarda sinyalin zayıf, bazı kanallarda çakışma olduğu şikayet ediliyor. En uygun adım nedir?", options: ["Tüm erişim noktalarının gücünü en yükseğe ayarlayıp hepsini aynı kanala koymak","Tüm erişim noktalarını tek bir odada toplayıp kablolarla dağıtmak","Site survey yapıp ısı haritasıyla ölü bölgeleri ve çakışan kanalları görerek erişim noktası yerleşimini ve kanal planını düzeltmek","Şifreleme türünü değiştirerek sinyal gücünü artırmaya çalışmak"], obj: "h3" },
      { id: "e57de7a6", q: "Bir şirket ziyaretçilerine Wi-Fi vermek istiyor. En doğru tasarım hangisidir?", options: ["Ziyaretçileri çalışanların ağına koyup parolayı paylaşmak","Misafir ağından sunucu ağına geçişe izin vermek","Misafir ağını yönetim VLAN'ıyla birleştirmek","Ayrı SSID ve VLAN'da, yalnızca internete çıkışa izin verip istemcileri birbirinden yalıtmak"], obj: "h3" },
      { id: "be1fc6d1", q: "Evdeki bir modemde WPS PIN özelliği açık. Neden kapatılması önerilir?", options: ["PIN doğrulaması kısımlar halinde yapıldığı için deneme sayısı azalır ve kaba kuvvetle kırılabilir","WPS PIN kablosuz sinyalin gücünü düşürdüğü için","WPS yalnızca 2,4 GHz'de çalıştığı için","WPS ekranı modemi fiziksel olarak ısıttığı için"], obj: "h4" },
      { id: "a7522578", q: "Bir saldırganın, eşleşmiş bir telefonun rehberini ve mesajlarını izinsiz çekmesi hangi Bluetooth saldırısıdır?", options: ["Bluejacking","Bluesnarfing","Evil twin","Wardriving"], obj: "h4" }
    ],
    interview: [
      { q: "Kurumsal Wi-Fi için neden ortak parola yerine 802.1X seçersin?", a: "Her kullanıcı kendi kimliği ya da sertifikasıyla doğrulanır. Ayrılan kişinin hesabı kapatılınca ağı yeniden yapılandırmak gerekmez. Kayıt tutulur, hangi kullanıcının bağlandığı izlenir." },
      { q: "Evil twin saldırısını nasıl azaltırsın?", a: "Sunucu sertifikası doğrulanan 802.1X kullanırım, kablosuz saldırı tespitiyle yetkisiz erişim noktalarını izlerim, güvenilmeyen ağlarda VPN şart koşarım ve kullanıcıları sertifika uyarılarını göz ardı etmemeleri için eğitirim." }
    ],
    vocab: [
      { term: "Evil twin", tr: "sahte ikiz erişim noktası", ex: "An evil twin copied the SSID." },
      { term: "RADIUS", tr: "merkezi kimlik doğrulama sunucusu", ex: "RADIUS approves the login." },
      { term: "Heat map", tr: "ısı haritası", ex: "The heat map shows dead zones." },
      { term: "Site survey", tr: "saha ölçümü", ex: "We ran a site survey." },
      { term: "Captive portal", tr: "giriş sayfası", ex: "Guests accept terms on a captive portal." },
      { term: "Bluesnarfing", tr: "Bluetooth ile izinsiz veri çekme", ex: "Bluesnarfing steals contacts." }
    ],
    resources: [
      res(PM, "Kablosuz güvenlik bölümleri"),
      { title: "Wi-Fi Alliance: Güvenlik", url: "https://www.wi-fi.org/discover-wi-fi/security", type: "doc", why: "WPA2 ve WPA3 farklarının resmi özeti", level: "başlangıç", lang: "EN" }
    ],
    sources: [CT]
  };

  /* 38 ──────────────────────────────────────────── Tehdit vektörleri ve saldırı yüzeyi */
  L[38] = {
    hook: "Bir hırsız eve girmek için kapıyı, pencereyi ya da bodrumu seçebilir. Siber saldırgan da 'nereden gireceğini' seçer; senin işin kapı sayısını azaltmak.",
    homework: "Çalıştığın ya da yaşadığın yerdeki dijital 'giriş kapılarını' listele (e-posta, telefon, USB, Wi-Fi, internete açık servisler). En az beşini yaz ve hangisinin kapatılabileceğini işaretle.",
    warmup: {
      recap: [{ point: "Sosyal mühendislik insanı hedefler; zafiyet sistemdeki açıktır.", example: "Oltalama ve yamasız servis" }],
      concepts: [
        { term: "Threat vector", tr: "Tehdit vektörü", summary: "Saldırganın hedefe ulaşmak için kullandığı yol ya da yöntem.", example: "Zararlı ek içeren e-posta" },
        { term: "Attack surface", tr: "Saldırı yüzeyi", summary: "Saldırganın etkileşime girebileceği tüm noktaların toplamı.", example: "Açık portlar, uygulamalar, çalışanlar" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Bir tehdit raporunda 'saldırı e-postayla geldi, motivasyon fidye, aktör organize suç grubu' yazıyor. Üç ayrı kavram var. Hangisini kapatabilirsin? Aktörü ve motivasyonu değiştiremezsin; ama vektörü ve saldırı yüzeyini küçültebilirsin." },
      { t: "steps", h: "Tehdit vektörleri", items: ["Mesaj tabanlı: e-posta (oltalama), SMS (smishing), anlık mesajlaşma uygulamaları.", "Ses tabanlı: telefonla arayıp kimlik taklidi (vishing), sahte ses kayıtları.", "Dosya ve görüntü tabanlı: zararlı belge, makro, sahte PDF, QR kod ya da görüntü içine gizlenmiş bağlantı.", "Çıkarılabilir cihaz: yerde bulunan ya da hediye gelen USB bellek, harici disk.", "Tedarik zinciri: güvenilir sağlayıcının güncelleme kanalı, yazılım bileşeni ya da donanımı üzerinden gelen tehdit.", "Savunmasız ya da desteği bitmiş yazılım: yamalanmamış sistem ve eski uygulamalar.", "Güvenilmeyen ağlar: halka açık Wi-Fi, sahte erişim noktası.", "Açık servisler ve portlar: internete gereksiz yere açık RDP, FTP, yönetim arayüzü."] },
      { t: "steps", h: "Saldırı yüzeyini küçültme", items: ["Varlık envanteri çıkar: neyin açık olduğunu bil.", "Kullanılmayan servis, port, hesap ve yazılımı kapat veya kaldır.", "Desteği biten sistemi güncelle ya da yalıt (segmentasyon).", "Uzaktan erişimi VPN ve MFA arkasına al; yönetim arayüzlerini internete açma.", "E-posta filtreleme, bağlantı ve ek koruması, makro kısıtı.", "Çıkarılabilir ortam politikası: USB'yi kapat ya da tara; tedarikçi riskini değerlendir.", "Çalışan eğitimi: mesaj ve ses tabanlı vektörleri tanıma ve raporlama."] },
      { t: "box", h: "Vektör, aktör ve motivasyon ayrı kavramlardır", text: "Vektör 'nasıl girdi' sorusunun cevabıdır. Aktör 'kim' sorusunun cevabıdır (devlet destekli grup, organize suç, hacktivist, içeriden biri, amatör). Motivasyon 'neden' sorusunun cevabıdır. Aynı vektörü farklı aktörler, farklı nedenlerle kullanabilir." },
      { t: "steps", h: "Tehdit aktörü motivasyonları", items: ["Finansal kazanç: fidye yazılımı, dolandırıcılık, veri satışı.", "Hizmet aksatma: sistemi çalışmaz hale getirmek (ör. DDoS), rekabet ya da sabotaj.", "Veri sızdırma: gizli bilgi, fikri mülkiyet ya da kişisel verinin çalınması.", "Jeopolitik: devletler arası casusluk, kritik altyapıya karşı baskı.", "Etik (hacktivizm): bir davayı duyurmak ya da protesto etmek.", "İntikam: kırgın eski çalışan ya da müşteri.", "Şantaj: çalınan veriyi ya da sistemi bırakmanın karşılığında talep."] },
      { t: "warn", h: "Tuzak", text: "Tek bir saldırıyı tek bir etiketle açıklamaya çalışma: fidye yazılımı hem finansal motivasyon hem de şantaj olabilir. Ayrıca saldırı yüzeyini küçültmek ('az kapı') saldırgan sayısını değil, saldırıya açık noktaları azaltır; sıfırlamaz." }
    ],
    objectives: [
      { id: "h1", text: "Bir saldırı senaryosunu doğru tehdit vektörüne (mesaj, ses, dosya, çıkarılabilir cihaz, tedarik zinciri gibi) eşleştirebilirsin." },
      { id: "h2", text: "Bir ortamın saldırı yüzeyini küçülten adımı gereksiz servisleri kapatma, yalıtma ve erişim kısıtlama arasından seçebilirsin." },
      { id: "h3", text: "Bir olayı vektör, aktör ve motivasyon olarak ayırarak doğru eşleştirmeyi seçebilirsin." }
    ],
    summary: [
      "Tehdit vektörü saldırganın kullandığı yoldur: mesaj, ses, dosya ve görüntü, çıkarılabilir cihaz, tedarik zinciri, desteği bitmiş yazılım, güvenilmeyen ağ ve açık servisler gibi.",
      "Saldırı yüzeyi, saldırganın ulaşabileceği tüm noktaların toplamıdır; envanter çıkarma, gereksizi kapatma ve erişimi kısıtlama onu küçültür.",
      "Vishing ses tabanlı, smishing SMS tabanlı bir vektördür; yerde bulunan USB çıkarılabilir cihaz vektörüdür.",
      "Tedarik zinciri vektöründe tehdit, güvendiğin bir sağlayıcının ürünü ya da güncellemesi üzerinden gelir.",
      "Motivasyonlar finansal kazanç, hizmet aksatma, veri sızdırma, jeopolitik, etik, intikam ve şantajdır; vektör, aktör ve motivasyon birbirinden farklı kavramlardır."
    ],
    quiz: [
      { id: "080279fe", q: "Arayan kişi banka güvenlik birimiymiş gibi konuşup kurbandan tek kullanımlık doğrulama kodunu istiyor. Bu hangi vektör türüdür?", options: ["Dosya tabanlı","Çıkarılabilir cihaz","Ses tabanlı (vishing)","Tedarik zinciri"], obj: "h1" },
      { id: "72fcf54b", q: "Otoparkta bulunan etiketli bir USB belleği merak eden çalışan şirket bilgisayarına takıyor. Bu senaryodaki vektör hangisidir?", options: ["Mesaj tabanlı","Güvenilmeyen ağ","Açık servis","Çıkarılabilir cihaz"], obj: "h1" },
      { id: "9d380add", q: "Güvenilir bir yazılım tedarikçisinin imzalı güncellemesinin içine zararlı kod yerleştirilmiş ve birçok müşteriye ulaşmıştır. Bu hangi vektördür?", options: ["Tedarik zinciri","Çıkarılabilir cihaz","Ses tabanlı","Dosya tabanlı"], obj: "h1" },
      { id: "c07f6368", q: "Bir ağın saldırı yüzeyini en doğrudan küçülten adım hangisidir?", options: ["Her açık servise ayrı bir izleme paneli eklemek","Kullanılmayan servisleri, portları ve hesapları kapatmak ya da kaldırmak","Çalışanlara daha uzun parola kullanmalarını yalnızca tavsiye etmek","Sunuculara ek kullanıcı hesabı açmak"], obj: "h2" },
      { id: "a88f5263", q: "Envanter taraması, internete açık bir RDP servisi ve artık kullanılmayan bir FTP sunucusunu gösterdi. En öncelikli adım nedir?", options: ["Her iki servisi de olduğu gibi bırakıp günlükleri izlemek","Yalnızca çalışanlara bir e-posta gönderip dikkat etmelerini istemek","Kullanılmayan FTP'yi kapatmak ve RDP'yi VPN ile MFA arkasına almak ya da internetten kaldırmak","RDP portunu başka bir numaraya taşımayı tek önlem saymak"], obj: "h2" },
      { id: "f626cbf7", q: "Bir grup bir hastanenin sistemlerini şifreleyip kripto para karşılığı anahtar satmayı teklif ediyor. Başlıca motivasyon hangisidir?", options: ["Jeopolitik","İntikam","Etik (hacktivizm)","Finansal kazanç"], obj: "h3" },
      { id: "b062853c", q: "Devlet destekli bir grup, rakip bir ülkenin enerji şirketine e-posta ile saldırıyor. Doğru eşleştirme hangisidir?", options: ["Aktör: devlet destekli grup; vektör: e-posta; motivasyon: jeopolitik","Aktör: e-posta; vektör: devlet destekli grup; motivasyon: finansal kazanç","Aktör: enerji şirketi; vektör: jeopolitik; motivasyon: e-posta","Aktör: jeopolitik; vektör: enerji şirketi; motivasyon: e-posta"], obj: "h3" }
    ],
    interview: [
      { q: "Saldırı yüzeyini küçültmek için neler yaparsın?", a: "Önce envanter çıkarırım. Kullanılmayan servis, port ve hesapları kapatırım; desteği biten sistemleri güncelleyip ya da yalıtıp korurum; uzak erişimi VPN ve MFA arkasına alırım. Çalışan eğitimi ve e-posta filtreleri de insan ve mesaj yüzeyini azaltır." },
      { q: "Vektör, aktör ve motivasyon arasındaki fark nedir?", a: "Vektör saldırganın girdiği yoldur (örn. e-posta), aktör saldırıyı yapan taraftır (örn. organize suç grubu), motivasyon ise nedenidir (örn. finansal kazanç). Aynı vektör farklı aktörler ve farklı nedenlerle kullanılabilir." }
    ],
    vocab: [
      { term: "Attack surface", tr: "saldırı yüzeyi", ex: "We reduced the attack surface." },
      { term: "Threat vector", tr: "tehdit vektörü", ex: "Email is a common threat vector." },
      { term: "Vishing", tr: "sesli oltalama", ex: "Vishing uses phone calls." },
      { term: "Supply chain", tr: "tedarik zinciri", ex: "A supply chain attack hit vendors." },
      { term: "Hacktivist", tr: "siyasi amaçlı bilgisayar korsanı", ex: "A hacktivist defaced the site." },
      { term: "Extortion", tr: "şantaj", ex: "Data extortion is common." }
    ],
    resources: [
      res(PM, "Tehdit vektörleri ve aktörler bölümleri"),
      { title: "MITRE ATT&CK", url: "https://attack.mitre.org/", type: "araç", why: "Saldırgan yöntemlerinin ortak sınıflandırması", level: "orta", lang: "EN" }
    ],
    sources: [CT]
  };
})();

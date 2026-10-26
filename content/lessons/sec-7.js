/* Siber güvenlik (Security+ SY0-801 (V8) temelli) · sabit dersler 35-38 (ders eki: sec-ek-2.js, anahtarlar 31-34) */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).sec = (window.PP_LESSONS.sec || {}));
  var CT = { title: "CompTIA Security+ sınav hedefleri (SY0-801, V8)", url: "https://www.comptia.org/certifications/security" };
  var PM = { title: "Professor Messer: Security+ (ücretsiz video kursu, SY0-701 sürümü)", url: "https://www.professormesser.com/", type: "video", length: "Çok bölümlü", level: "başlangıç", lang: "EN" };
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
      { id: "261d3b9b", q: "Endüstriyel bir tesiste motor, vana ve konveyör gibi fiziksel parçaları doğrudan süren cihaza ne denir?", options: ["HMI (operatör ekranı)","Historian (veri kaydedici)","PLC (mantık denetleyici)","SIEM (günlük toplayıcı)"], obj: "h1" },
      { id: "0c59f2db", q: "Geniş bir alana dağılmış su pompa istasyonlarını merkezden izleyip uzaktan denetleyen sistem türü hangisidir?", options: ["SCADA (merkezden izleme ve denetim)","PLC (tek makineyi süren denetleyici)","HMI (yerel operatör ekranı)","Historian (veri kayıt sunucusu)"], obj: "h1" },
      { id: "70f4297c", q: "Ofise yeni takılan akıllı kamera, fabrika varsayılanı yönetici parolasıyla ve internete açık geldi. İlk adım olarak hangisi uygundur?", options: ["Kamerayı bu haliyle bırakıp kayıt süresini uzatmak ve görüntüleri buluta yedeklemek","Parolayı herkesin hatırlaması için kasada yazılı tutup kamerayı bu haliyle kullanmak","Kamerayı kullanıcı bilgisayarlarıyla aynı ağda bırakıp bir sonraki güncellemeyi beklemek","Parolayı değiştirip uzak erişimi kapatmak ve kamerayı ayrı IoT bölgesine almak"], obj: "h1" },
      { id: "b4fdcf45", q: "Fren kontrol kartı gibi bir cihaz, sensör olayını belirli bir süre içinde işlemek zorunda. Zamanlamayı öngörülebilir kılmak için hangi tür işletim sistemi kullanılır?", options: ["Genel amaçlı masaüstü işletim sistemi","RTOS (gerçek zamanlı işletim sistemi)","Hypervisor (sanallaştırma katmanı)","Mobil cihaz yönetim platformu (MDM)"], obj: "h1" },
      { id: "48a24f3b", q: "Üretici desteği bitmiş bir tıbbi görüntüleme cihazı yamalanamıyor ama çalışmaya devam etmesi gerekiyor. En uygun telafi edici kontrol hangisidir?", options: ["Cihazı üretici desteği alabilmek için doğrudan internete açmak","Cihazı ofis ağında bırakıp yalnızca kullanıcı parolalarını değiştirmek","Cihazı ayrı bir ağ bölgesine alıp erişimi ve trafiği sınırlayıp izlemek","Cihazı güvenlik taramalarından çıkarıp envanterden silmek"], obj: "h2" },
      { id: "a9263b18", q: "Hava boşluklu (air gap) bir ICS ağı için hangi ifade doğrudur?", options: ["Fiziksel ayrım olsa da USB bellek veya bakım dizüstüsü zararlıyı içeri taşıyabilir","Ağ fiziksel olarak ayrık olduğundan dışarıdan zararlı yazılım gelme riski ortadan kalkar","Hava boşluğu varsa ayrık ağda olay kaydı ve izleme kurmaya gerek kalmaz","Hava boşluğu yalnızca kablosuz bağlantıları ayırır, kablolu bağlantılara etkisi yoktur"], obj: "h2" },
      { id: "8370b16e", q: "Bir geliştirici bulut şablonuna veritabanı parolasını yazıp ortak depoya gönderdi. Hangi yanıt en doğrudur?", options: ["Dosyadaki satırı silip yeni bir sürüm göndermek; eski sürümleri geçmişte bırakmak","Depoyu özel yapıp parolayı olduğu gibi kullanmayı sürdürmek","Parolayı şablonda şifreleyip çözme anahtarını aynı dosyada saklamak","Parolayı kasaya taşıyıp sızan parolayı yenilemek ve depoda sır taramasını açmak"], obj: "h3" },
      { id: "f1e04edc", q: "Değişmez altyapı (immutable infrastructure) yaklaşımında bir sunucunun yamalanması nasıl yapılır?", options: ["Çalışan sunucuya bağlanılıp yama elle uygulanır ve değişiklik not edilir","Yeni sürümden yeni bir örnek kurulur, trafik ona aktarılır, eskisi kaldırılır","Sunucu yerinde yamalanır, sorun çıkarsa elle geri alınır","Değişiklikler önce üretimde denenir, sonra şablona işlenir"], obj: "h3" }
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
      { id: "a8a6f6a7", q: "Cihazı şirket satın alıp çalışana verir ve sınırlı kişisel kullanıma da izin verir. Bu model hangisidir?", options: ["BYOD","COBO","COPE","VDI"], obj: "h1" },
      { id: "9e145881", q: "Hangi dağıtım modelinde cihazın sahibi çalışandır ve kurumun kontrolü doğal olarak en sınırlıdır?", options: ["BYOD","COBO","COPE","CYOD"], obj: "h1" },
      { id: "3406db00", q: "Cihaz şirkete aittir, yalnızca iş amaçlı kullanılır ve kişisel kullanıma izin verilmez. Bu model hangisidir?", options: ["BYOD","COPE","VDI","COBO"], obj: "h1" },
      { id: "3232932e", q: "Çalışan, kurumun onayladığı cihaz listesinden kendine uygun olanı seçiyor. Bu model hangisidir?", options: ["BYOD","CYOD","COBO","COPE"], obj: "h1" },
      { id: "317b7a57", q: "Satış temsilcisi kurumsal e-postası yüklü telefonunu kaybetti. Cihaz UEM'e kayıtlı. Hangi yanıt en uygundur?", options: ["Çalışanın yeni telefon almasını bekleyip eski cihazı kendi hâline bırakmak","Kullanıcıya parolasını bir hafta değiştirmemesini söylemek, çünkü cihaz bulunabilir","Cihazı UEM'den kilitleyip kurumsal veriyi silmek ve oturumları iptal etmek","Cihaz bulunana kadar işlem yapmayıp yalnızca olay kaydı açmak"], obj: "h2" },
      { id: "e3d4fdef", q: "Aynı telefonda iş uygulamalarının ve verisinin kişisel alandan ayrı, şifreli bir bölümde tutulmasını sağlayan yaklaşım hangisidir?", options: ["Konteynerleştirme (iş profili)","Cihaza root erişimi vermek","Tüm cihazı sıfırlayan tam silme politikası","Konum hizmetlerini tüm uygulamalara açmak"], obj: "h2" },
      { id: "fb19054c", q: "Bir kurum, jailbreak yapılmış telefonların e-posta ve iş uygulamalarına erişmesini engelliyor. Bunun temel gerekçesi nedir?", options: ["Jailbreak cihazı yavaşlattığı için iş uygulamalarının performansı düşer","Jailbreak cihazın pilini hızla tükettiği için çalışan verimliliği azalır","Jailbreak yalnızca ekran görünümünü değiştirdiği için kurum politikasına uymaz","Uygulama izolasyonu ve imza denetimi zayıfladığı için veri risk altındadır"], obj: "h3" },
      { id: "31796a54", q: "Bir çalışan, resmi mağazada bulunmayan bir uygulamayı doğrudan indirdiği dosyayla kurmak istiyor (sideloading). Bu neden risklidir?", options: ["Mağaza dışı kurulum pil ömrünü kalıcı olarak düşürdüğü için","Uygulama mağazanın tarama ve incelemesinden geçmediği için zararlı olabilir","Mağaza dışı kurulum cihazın depolama alanını hızla doldurduğu için","Mağaza dışı uygulamalar yalnızca tabletlerde çalışır, bu yüzden telefonda kullanılamaz"], obj: "h3" },
      { id: "24f4fdc9", q: "Bir çalışan kurumsal belgeyi telefondaki kişisel bir bulut uygulamasına kopyalıyor. Hangi kontrol bu veri sızıntısını en doğrudan azaltır?", options: ["Telefonun ekran parlaklığını ve otomatik kilit süresini yeniden ayarlamak","Çalışanlara kişisel bulut uygulamalarını kullanmama konusunda yıllık e-posta göndermek","Uygulama yönetimiyle kurumsal verinin yalnızca onaylı uygulamalara kopyalanmasına izin vermek","Cihaz yedeklemesini kişisel buluta otomatik olarak açmak"], obj: "h2" }
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
      { t: "steps", h: "Diğer riskler", items: ["Wardriving: bir bölgeyi dolaşarak kablosuz ağları taramak ve haritalamak. Savunma bağlamında kendi ağını aynı bakışla keşfedip açık, zayıf şifreli ya da yetkisiz erişim noktalarını görmeni sağlar; yalnızca sahibi olduğun ağlarda yapılır.", "WPS: PIN ile kolay eşleştirme. PIN doğrulaması iki parçalı olduğu için deneme sayısı küçülür ve kaba kuvvete açıktır; kapatılmalıdır.", "Bluetooth: bluejacking (istenmeyen mesaj gönderme) ve bluesnarfing (izinsiz veri çekme). Gereksiz yere görünür bırakma, eski eşleştirmeleri silme, güncelleme ve kapatma önlemdir.", "Zayıf PSK, varsayılan yönetici parolası ve güncellenmeyen erişim noktası yazılımı."] },
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
      "Wardriving ağları gezerek haritalar; savunmada kendi ağını keşfedip açıkları görmek için kullanılır. WPS PIN kapatılmalı, Bluetooth gereksiz yere görünür bırakılmamalı ve cihazlar güncel tutulmalıdır."
    ],
    quiz: [
      { id: "06511059", q: "Parola koruması çevrimdışı tahmin saldırılarına karşı SAE el sıkışmasıyla güçlendirilen Wi-Fi güvenlik standardı hangisidir?", options: ["WPA3-Personal","WEP","WPA2-Personal (PSK)","WPA2-Enterprise (802.1X)"], obj: "h1" },
      { id: "5c9f4468", q: "WEP neden artık kullanılmamalıdır?", options: ["Yalnızca 5 GHz bandında çalıştığı için kapsama alanı dardır","Çok güçlü şifreleme kullandığı için cihazları yavaşlatır","Her kullanıcıya ayrı oturum anahtarı verdiği için yönetimi zordur","RC4 ve kısa başlatma vektörü yüzünden anahtar kısa sürede kurtarılabilir"], obj: "h1" },
      { id: "1692661e", q: "Kafe yakınında aynı SSID adını yayan, sinyali daha güçlü bir cihaz görüyorsun ve birçok kullanıcı ona bağlanıyor. Bu hangi saldırıdır?", options: ["Bluesnarfing (Bluetooth veri çekme)","Evil twin (sahte ikiz ağ)","Wardriving (ağları haritalama)","WPS PIN kaba kuvvet saldırısı"], obj: "h2" },
      { id: "aa728af0", q: "Bir kurum, ortak parola yerine kullanıcı bazlı kimlik doğrulama istiyor ve ayrılan çalışanın erişimini tek hesapla kapatabilmek istiyor. En uygun çözüm hangisidir?", options: ["WPA2-Personal parolasını sık sık değiştirmek","SSID'yi gizleyip MAC adresi süzmeyi açmak","WPA2/WPA3-Enterprise: 802.1X ile RADIUS sunucusu","WPA3-Personal'a geçip ortak parolayı paylaşmaya devam etmek"], obj: "h2" },
      { id: "898f62ce", q: "Bir ofiste bazı odalarda sinyalin zayıf, bazı kanallarda çakışma olduğu şikayet ediliyor. En uygun adım nedir?", options: ["Isı haritalı site survey ile ölü bölge ve çakışmayı bulup yerleşimi düzeltmek","Tüm erişim noktalarının gücünü artırıp aynı kanalda çalıştırmak","Şikayet edilen odalara yeni erişim noktaları ekleyip kanal ayarlarına dokunmamak","Şifreleme türünü değiştirerek sinyal gücünü artırmaya çalışmak"], obj: "h3" },
      { id: "ee38a821", q: "Bir şirket ziyaretçilerine Wi-Fi vermek istiyor. En doğru tasarım hangisidir?", options: ["Ziyaretçileri çalışan ağına alıp parolayı onlarla paylaşmak","Misafir ağından sunucu ağına yalnızca okuma erişimi tanımak","Misafir ağını yönetim VLAN'ıyla aynı yapıya almak","Ayrı SSID ve VLAN'da yalnızca internete çıkış verip istemcileri yalıtmak"], obj: "h3" },
      { id: "211eb161", q: "Evdeki bir modemde WPS PIN özelliği açık. Neden kapatılması önerilir?", options: ["WPS, kablosuz sinyalin gücünü düşürerek kapsama alanını daraltır","PIN iki parçalı doğrulandığından deneme uzayı küçülür ve kaba kuvvetle kırılır","WPS yalnızca 2,4 GHz bandında çalıştığı için 5 GHz cihazları dışarıda kalır","WPS, modemin yazılım güncellemelerini otomatik olarak kapatır"], obj: "h4" },
      { id: "03737f2f", q: "Bir saldırgan Bluetooth açığından yararlanarak kurbanın telefonundaki rehberi ve mesajları izinsiz çekiyor. Bu hangi Bluetooth saldırısıdır?", options: ["Bluejacking","Evil twin","Bluesnarfing","Wardriving"], obj: "h4" }
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
      { term: "Bluesnarfing", tr: "Bluetooth ile izinsiz veri çekme", ex: "Bluesnarfing steals contacts." },
      { term: "Wardriving", tr: "gezerek kablosuz ağ keşfi", ex: "We ran wardriving on our own network." }
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
      { t: "steps", h: "Tehdit aktörü motivasyonları", items: ["Finansal kazanç: fidye yazılımı, dolandırıcılık, veri satışı.", "Hizmet aksatma: sistemi çalışmaz hale getirmek (ör. DDoS), rekabet ya da sabotaj.", "Veri sızdırma: gizli bilgi, fikri mülkiyet ya da kişisel verinin çalınması.", "Jeopolitik: devletler arası casusluk, kritik altyapıya karşı baskı.", "Felsefi/siyasi inanç (hacktivizm): bir davayı duyurmak ya da protesto etmek.", "Etik: izinli ya da sorumlu bildirimle açığı kuruma göstermek isteyen beyaz şapkalı araştırmacı; zarar vermek değil, açığı kapattırmak amaçtır.", "İntikam: kırgın eski çalışan ya da müşteri.", "Şantaj: çalınan veriyi ya da sistemi bırakmanın karşılığında talep."] },
      { t: "warn", h: "Tuzak", text: "Tek bir saldırıyı tek bir etiketle açıklamaya çalışma: fidye yazılımı hem finansal motivasyon hem de şantaj olabilir. Ayrıca saldırı yüzeyini küçültmek ('az kapı') saldırgan sayısını değil, saldırıya açık noktaları azaltır; sıfırlamaz." },
      { t: "steps", h: "Vektör ve saldırı yüzeyi ayrıntıları (V8)", items: [
        "Mesaj tabanlı: e-posta, SMS, RCS (zengin içerikli mesajlaşma), anlık mesajlaşma ve iş birliği araçları. Görüntü tabanlı: QR kodlar ve gömülü içerik. Dosya tabanlı: gömülü makro, RTF ve PDF belgeleri.",
        "Tarayıcı tabanlı: zararlı eklentiler, JavaScript, parola yöneticisi eklentileri, çerezler ve oturum belirteçleri. Oturum belirteci çalınırsa saldırgan MFA tekrar sorulmadan o kullanıcı gibi davranabilir. Uzak erişim: RDP, VNC, VPN.",
        "Yerinde yaşama (living off the land): saldırgan PowerShell, WMI gibi sistemde zaten var olan güvenilir araçları kullanır; yeni zararlı dosya gerekmez, imza tabanlı antivirüs görmeyebilir.",
        "Saldırı yüzeyi örnekleri: kodda gömülü sırlar (hardcoded secrets), herkese açık depo ve nesne depolama, güvensiz istisna yönetimi, yönetilmeyen cihaz ve eski kimlik bilgileri, kimlik sağlayıcılar, LLM'ler."
      ] }
    ],
    objectives: [
      { id: "h1", text: "Bir saldırı senaryosunu doğru tehdit vektörüne (mesaj, ses, dosya, çıkarılabilir cihaz, tedarik zinciri gibi) eşleştirebilirsin." },
      { id: "h2", text: "Bir ortamın saldırı yüzeyini küçülten adımı gereksiz servisleri kapatma, yalıtma ve erişim kısıtlama arasından seçebilirsin." },
      { id: "h3", text: "Bir olayı vektör, aktör ve motivasyon olarak ayırarak doğru eşleştirmeyi seçebilirsin." },
      { id: "h4", text: "Yerinde yaşama (living off the land), oturum belirteci çalma, gömülü sırlar ve herkese açık depo gibi V8 vektör ve saldırı yüzeyi örneklerini tanıyabilirsin." }
    ],
    summary: [
      "Tehdit vektörü saldırganın kullandığı yoldur: mesaj, ses, dosya ve görüntü, çıkarılabilir cihaz, tedarik zinciri, desteği bitmiş yazılım, güvenilmeyen ağ ve açık servisler gibi.",
      "Saldırı yüzeyi, saldırganın ulaşabileceği tüm noktaların toplamıdır; envanter çıkarma, gereksizi kapatma ve erişimi kısıtlama onu küçültür.",
      "Vishing ses tabanlı, smishing SMS tabanlı bir vektördür; yerde bulunan USB çıkarılabilir cihaz vektörüdür.",
      "Tedarik zinciri vektöründe tehdit, güvendiğin bir sağlayıcının ürünü ya da güncellemesi üzerinden gelir.",
      "Motivasyonlar finansal kazanç, hizmet aksatma, veri sızdırma, jeopolitik, felsefi/siyasi inanç (hacktivizm), etik (beyaz şapkalı bildirim), intikam ve şantajdır; vektör, aktör ve motivasyon birbirinden farklı kavramlardır."
    ],
    quiz: [
      { id: "f9f5aa49", q: "Arayan kişi banka güvenlik birimiymiş gibi konuşup kurbandan tek kullanımlık doğrulama kodunu istiyor. Bu hangi vektör türüdür?", options: ["Ses tabanlı (vishing)","Dosya tabanlı (zararlı belge)","Çıkarılabilir cihaz (USB)","Tedarik zinciri (sağlayıcı)"], obj: "h1" },
      { id: "e2a956c2", q: "Otoparkta bulunan etiketli bir USB belleği merak eden çalışan şirket bilgisayarına takıyor. Bu senaryodaki vektör hangisidir?", options: ["Mesaj tabanlı (e-posta)","Güvenilmeyen ağ (sahte Wi-Fi)","Açık servis (internete açık RDP)","Çıkarılabilir cihaz (USB)"], obj: "h1" },
      { id: "02fd81f7", q: "Güvenilir bir yazılım tedarikçisinin imzalı güncellemesinin içine zararlı kod yerleştirilmiş ve birçok müşteriye ulaşmıştır. Bu hangi vektördür?", options: ["Güvenilmeyen ağ (sahte erişim noktası)","Tedarik zinciri (güncelleme kanalı)","Mesaj tabanlı (oltalama e-postası)","Dosya tabanlı (makrolu belge)"], obj: "h1" },
      { id: "2b252065", q: "Bir ağın saldırı yüzeyini en doğrudan küçülten adım hangisidir?", options: ["Açık servislerin hepsine ayrı bir izleme paneli ve uyarı kuralı eklemek","Çalışanlara daha uzun parola kullanmalarını tavsiye etmek","Kullanılmayan servisleri, portları ve hesapları kapatmak ya da kaldırmak","Sunuculara denetim amaçlı yeni yönetici hesapları açmak"], obj: "h2" },
      { id: "18a57efb", q: "Envanter taraması, internete açık bir RDP servisi ve artık kullanılmayan bir FTP sunucusunu gösterdi. En öncelikli adım nedir?", options: ["FTP'yi kapatıp RDP'yi VPN ve MFA arkasına almak ya da internetten kaldırmak","İki servisi de olduğu gibi bırakıp günlükleri günlük olarak incelemek ve raporlamak","Çalışanlara bu servislere dikkat etmelerini isteyen bir güvenlik e-postası göndermek","RDP portunu başka bir numaraya taşıyıp kullanılmayan FTP'yi de açık bırakmak"], obj: "h2" },
      { id: "bc6e4f1b", q: "Bir grup bir hastanenin sistemlerini şifreleyip kripto para karşılığı anahtar satmayı teklif ediyor. Başlıca motivasyon hangisidir?", options: ["Jeopolitik","İntikam","Felsefi/siyasi inanç","Finansal kazanç"], obj: "h3" },
      { id: "7da654b5", q: "Devlet destekli bir grup, rakip ülkenin kritik altyapısını kesintiye uğratmaya çalışıyor ve bir enerji şirketine e-posta ile saldırıyor. Doğru eşleştirme hangisidir?", options: ["Aktör: devlet destekli grup; vektör: e-posta; motivasyon: finansal kazanç","Aktör: devlet destekli grup; vektör: e-posta; motivasyon: jeopolitik","Aktör: enerji şirketi; vektör: e-posta; motivasyon: devlet destekli grup","Aktör: devlet destekli grup; vektör: jeopolitik; motivasyon: e-posta"], obj: "h3" },
      { id: "87acef2b", q: "Saldırgan hedef sunucuda yeni zararlı dosya bırakmadan yalnızca Windows'a yerleşik PowerShell ve WMI ile komut çalıştırıyor. Bu teknik hangisidir?", options: ["Rootkit kurulumu", "Truva atı", "Tedarik zinciri saldırısı", "Yerinde yaşama (living off the land)"], obj: "h4" },
      { id: "55dd053e", q: "Bir geliştirici yanlışlıkla bulut erişim anahtarını kaynak koda yazıp herkese açık bir depoya yükledi. İlk ve en iyi adım hangisidir?", options: ["Depoyu özel yapıp anahtarı değiştirmemek", "Commit geçmişini temizleyip anahtarı değiştirmemek", "Anahtar uzunluğunu artırmak", "Anahtarı hemen iptal edip yenilemek ve sır taramasını otomatikleştirmek"], obj: "h4" },
      { id: "61e3ba20", q: "Çalışanlara zengin içerikli mesajlaşma (RCS) üzerinden sahte kargo bağlantısı gönderiliyor. Bu saldırı hangi vektör kategorisine girer?", options: ["Görüntü tabanlı vektör", "Mesaj tabanlı vektör", "Sinyal tabanlı vektör (RF/NFC)", "Çıkarılabilir ortam tabanlı vektör"], obj: "h4" },
      { id: "6d756279", q: "Zararlı bir tarayıcı eklentisi, kullanıcının MFA ile açılmış oturumunun çerezini (oturum belirtecini) çalıp saldırganın başka bir cihazdan oturumu sürdürmesini sağlıyor. Saldırgan neden MFA'yı yeniden geçmek zorunda kalmıyor?", options: ["MFA yalnızca parola yerine geçer, oturum sırasında hiç çalışmaz", "Çerez her zaman kullanıcının parolasını içerir", "Oturum belirteci kimlik doğrulama sonrası verilir; onu sunan taraf zaten doğrulanmış sayılır", "Tarayıcı eklentileri MFA kodunu kendiliğinden üretir"], obj: "h4" }
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

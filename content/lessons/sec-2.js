/* Siber güvenlik (Security+ SY0-801 (V8) temelli) · sabit dersler 7-12 */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).sec = (window.PP_LESSONS.sec || {}));
  var CT = { title: "CompTIA Security+ sınav hedefleri (SY0-801, V8)", url: "https://www.comptia.org/certifications/security" };
  var PM = { title: "Professor Messer: Security+ (ücretsiz video kursu, SY0-701 sürümü)", url: "https://www.professormesser.com/", type: "video", length: "Çok bölümlü", level: "başlangıç", lang: "EN" };
  var OWASP = { title: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/", type: "doc", level: "orta", lang: "EN" };
  var CISA = { title: "CISA: Secure Our World (temel güvenlik alışkanlıkları)", url: "https://www.cisa.gov/secure-our-world", type: "doc", level: "başlangıç", lang: "EN" };
  function res(a, why) { var o = {}; for (var k in a) o[k] = a[k]; o.why = why; return o; }

  /* 7 ───────────────────────────────────────────── Sosyal mühendislik */
  L[7] = {
    hook: "En güçlü güvenlik duvarını bile bir telefon aramasıyla aşabilirsin: sosyal mühendislik insanı hedefler, sistemi değil.",
    homework: "Son bir ayda aldığın şüpheli bir e-posta ya da SMS'i bul. Hangi baskı tekniğini kullandığını (aciliyet, otorite, korku, ödül) işaretle.",
    warmup: {
      recap: [{ point: "Saldırı vektörlerinden biri e-postadır; kullanıcı en zayıf halka olabilir.", example: "Phishing" }],
      concepts: [
        { term: "Phishing", tr: "Oltalama", summary: "Sahte mesajla kullanıcıyı bilgi vermeye veya tıklamaya ikna etmek.", example: "Sahte banka e-postası" },
        { term: "Pretexting", tr: "Uydurma senaryo", summary: "Kendini başkası gibi gösterip ikna edici bir hikâye kurmak.", example: "'IT destekten arıyorum'" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Muhasebeden biri 'Genel müdürden acil IBAN değişikliği e-postası geldi' diye soruyor. Gönderen adresi neredeyse aynı. Bu bir BEC (business email compromise) denemesi olabilir. Doğrulama telefonla ve başka kanaldan yapılır." },
      { t: "h", text: "Başlıca teknikler" },
      { t: "steps", h: "Mesaj ve ses tabanlı", items: [
        "Phishing: geniş kitleye sahte e-posta.",
        "Spear phishing: belirli bir kişiye özel hazırlanmış e-posta.",
        "Whaling: üst düzey yöneticileri hedef alan phishing.",
        "Smishing: SMS ile. Vishing: telefon (ses) ile.",
        "BEC: yöneticiyi/tedarikçiyi taklit edip para transferi istemek."
      ] },
      { t: "steps", h: "Yüz yüze ve fiziksel", items: [
        "Pretexting: inandırıcı bir senaryo ve kimlik uydurma.",
        "Tailgating / piggybacking: yetkili birinin ardından kapıdan içeri girmek.",
        "Shoulder surfing: omuz üstünden ekrana ya da parola girişine bakmak.",
        "Dumpster diving: çöpten belge ve bilgi toplamak.",
        "Baiting: USB bırakmak gibi merak uyandıran yemler.",
        "Skimming (V8): ATM ya da ödeme cihazına takılan sahte okuyucuyla kart verisini kopyalamak.",
        "Erişim vestibülü (access vestibule, eski adıyla mantrap): iki kapılı geçiş; ikinci kapı birincisi kapanmadan açılmaz. Kapıdan peşinden sızmayı (tailgating) zorlaştıran fiziksel kontroldür."
      ] },
      { t: "steps", h: "Web ve diğer", items: [
        "Pharming: kullanıcıyı sahte siteye yönlendirmek (DNS).",
        "Watering hole: hedef grubun ziyaret ettiği siteyi ele geçirmek.",
        "Typosquatting: benzer yazımlı alan adı (gogle.com).",
        "Influence kampanyaları ve dezenformasyon."
      ] },
      { t: "box", h: "Baskı teknikleri", text: "Aciliyet ('hemen'), otorite ('müdürden'), korku ('hesabın kapanacak'), ödül ('kazandın'), sempati ve uyum. Birçok mesaj duygusal bir tetikle seni düşünmeden harekete geçirmeye çalışır." },
      { t: "steps", h: "Savunma", items: [
        "Bağlantıya tıklamadan önce adresin üstüne gel, gönderen adresini dikkatle oku.",
        "Para, parola, kod isteyen her talebi ikinci bir kanaldan doğrula.",
        "Rapor etme kültürü: 'şüpheli' butonu ve güvenlik ekibine hızlı bildirim.",
        "MFA, e-posta filtreleme ve düzenli simülasyonlu eğitim."
      ] },
      { t: "warn", h: "Tuzak", text: "Teknik önlemler kadar kültür de belirleyicidir: kimsenin 'çok meşgulüm' diye doğrulamayı atlamadığı bir kurum." },
      { t: "steps", h: "QR kod ve yapay zekâ destekli sahtecilik (V8)", items: [
        "Quishing: QR koda gizlenmiş zararlı bağlantıyla yapılan oltalama. Kod; poster, e-posta ya da otoparktaki sahte ödeme etiketi olabilir. Kullanıcı adresi göremeden tarar, e-posta filtrelerinin görüntü içindeki bağlantıyı yakalaması zorlaşır.",
        "Deepfake: yapay zekâ ile üretilmiş ses ya da görüntü; yönetici sesiyle para talebi (vishing) ya da görüntülü toplantıda sahte kimlik için kullanılır.",
        "Savunma: ikinci kanaldan doğrulama, önceden kararlaştırılmış kod sözcük ve ödemelerde çift onay."
      ] }
    ],
    objectives: [
      { id: "h1", text: "Phishing, spear phishing, whaling, smishing, vishing ve quishing saldırılarını hedef ve kanala göre ayırt edebilirsin." },
      { id: "h2", text: "Tailgating, shoulder surfing, dumpster diving ve baiting gibi fiziksel teknikleri bir senaryodan tanıyabilirsin." },
      { id: "h3", text: "Pharming, watering hole ve typosquatting saldırılarını birbirinden ayırt edebilirsin." },
      { id: "h4", text: "Acil para talebi içeren bir mesajdaki baskı tekniğini bulup doğru savunmayı (ikinci kanaldan doğrulama) seçebilirsin; skimming saldırısını ve erişim vestibülünün peşinden sızmaya karşı rolünü tanıyabilirsin." }
    ],
    summary: [
      "Phishing geniş kitleye, spear phishing belirli kişiye, whaling üst düzey yöneticilere yönelir; smishing SMS, vishing telefon kanalıdır.",
      "Tailgating, shoulder surfing, dumpster diving ve baiting insanı fiziksel ortamda hedef alır.",
      "Pharming DNS ile sahte siteye yönlendirir, watering hole hedef grubun sitesini ele geçirir, typosquatting benzer yazımlı alan adı kullanır.",
      "Aciliyet, otorite, korku ve ödül, düşünmeden harekete geçirmek için kullanılan baskı tekniklerindendir.",
      "Para, parola ya da kod isteyen talepler ikinci bir kanaldan doğrulanır ve şüpheli mesaj bildirilir."
    ],
    quiz: [
      { id: "6edc78cd", q: "Bir yöneticiyi hedef alan özel hazırlanmış oltalama saldırısı nasıl adlandırılır?", options: ["Whaling", "Smishing", "Pharming", "Baiting"], obj: "h1" },
      { id: "a3f6c1d2", q: "Bir ATM'nin kart yuvasına takılan ince bir aparat, kartın manyetik şeridindeki veriyi sessizce kopyalıyor. Bu saldırı hangisidir?", options: ["Skimming", "Tailgating", "Shoulder surfing", "Baiting"], obj: "h4" },
      { id: "b8e04a7c", q: "Veri merkezi girişinde ikinci kapı, birinci kapı kapanmadan açılmıyor; amaç yetkili birinin peşinden sızmayı zorlaştırmak. Bu kontrol hangisidir?", options: ["Erişim vestibülü (access vestibule)", "Güvenlik kamerası kayıt sistemi (CCTV)", "Çevre aydınlatma ve hareket sensörü", "Ziyaretçi kayıt defteri ve rozet"], obj: "h4" },
      { id: "17637fe4", q: "Yetkili çalışanın arkasından kapıdan sızmak hangisidir?", options: ["Tailgating", "Vishing", "Typosquatting", "Pharming"], obj: "h2" },
      { id: "e27fd259", q: "Telefonla arayıp 'IT destekten arıyorum, parolanı söyle' demek hangisine girer?", options: ["Vishing / pretexting", "Dumpster diving", "Watering hole", "Smishing"], obj: "h1" },
      { id: "0f30e4c8", q: "Gogle.com gibi benzer yazımlı alan adı kaydetmek hangisidir?", options: ["Typosquatting", "Tailgating", "Whaling", "Baiting"], obj: "h3" },
      { id: "7a1f5236", q: "Genel müdürden geldiği söylenen 'acil IBAN değişikliği' e-postası için en doğru ilk adım nedir?", options: ["Tutar küçükse işlemi yapıp sonra bildirmek", "Gönderene yanıt yazıp doğrulamasını istemek", "Telefonla ya da başka bir kanaldan talebi doğrulamak", "E-postayı silip kimseye söylememek"], obj: "h4" },
      { id: "140dee78", q: "'Hesabın 1 saat içinde kapatılacak, hemen bağlantıya tıkla!' mesajında ağırlıklı olarak hangi baskı tekniği kullanılıyor?", options: ["Ödül", "Sempati", "Aciliyet ve korku", "Otorite"], obj: "h4" },
      { id: "3e5c5c7c", q: "Çalışanların sık ziyaret ettiği bir sektör forumu ele geçirilip siteyi açanlara zararlı yazılım bulaştırılıyor. Bu hangisidir?", options: ["Pharming", "Typosquatting", "Watering hole", "Vishing"], obj: "h3" },
      { id: "620b029b", q: "Ofiste birinin omzunun üzerinden ekrana bakarak parolasını öğrenmek hangisidir?", options: ["Dumpster diving", "Baiting", "Pharming", "Shoulder surfing"], obj: "h2" },
      { id: "be38b8a1", q: "Çalışanlar otoparktaki ödeme direğine yapıştırılmış bir QR kodu okutup sahte bir ödeme sayfasına kart bilgisi giriyor. Bu saldırı hangisidir?", options: ["Smishing", "Vishing", "Pharming", "Quishing"], obj: "h1" }
    ],
    interview: [
      { q: "Phishing e-postasını nasıl anlarsın?", a: "Gönderen adresine ve bağlantının gerçek adresine bakarım, aciliyet ve tehdit dilini ve beklenmedik eki fark ederim. Para ya da parola isteyen talepleri başka bir kanaldan doğrularım ve şüpheliyse güvenlik ekibine bildiririm." },
      { q: "Çalışanları sosyal mühendisliğe karşı nasıl hazırlarsın?", a: "Düzenli eğitim, simülasyonlu phishing testleri, rapor butonu, net doğrulama prosedürü ve rapor edenleri cezalandırmayan bir kültür." }
    ],
    vocab: [
      { term: "Phishing", tr: "oltalama", ex: "Report the phishing email." },
      { term: "Spoofing", tr: "kimlik taklidi", ex: "Email spoofing is common." },
      { term: "Pretext", tr: "uydurma senaryo", ex: "He used a false pretext." },
      { term: "Tailgating", tr: "kapıdan sızma", ex: "Tailgating is physical." },
      { term: "Lure", tr: "yem", ex: "The USB was a lure." }
    ],
    resources: [
      res(CISA, "Phishing'i tanıma rehberi"),
      res(PM, "Sosyal mühendislik teknikleri bölümü")
    ],
    sources: [CT]
  };

  /* 8 ───────────────────────────────────────────── Zararlı yazılım */
  L[8] = {
    hook: "Virüs, solucan, truva atı, fidye yazılımı: hepsi 'zararlı yazılım' ama nasıl yayıldıkları ve ne yaptıkları çok farklı.",
    homework: "Bilgisayarında bir antivirüs/Defender taraması çalıştır ve 'korumalı klasör'/'ransomware koruması' ayarının açık olup olmadığına bak.",
    warmup: {
      recap: [{ point: "Saldırgan hedefe e-posta, USB ya da zafiyet üzerinden zararlı yazılım bırakabilir.", example: "Sosyal mühendislik + zararlı eki" }],
      concepts: [
        { term: "Malware", tr: "Zararlı yazılım", summary: "Sistemlere zarar vermek ya da bilgi çalmak için yazılmış yazılımlar.", example: "Fidye yazılımı, casus yazılım" },
        { term: "IOC", tr: "Saldırı belirtisi", summary: "Bir saldırıya işaret eden dosya, IP, hash gibi izler.", example: "Zararlı dosya hash'i" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Sabah 9'da çalışan: 'Dosyalarımın uzantısı değişti, ekranda para istiyorlar.' Hangi tür? Fidye yazılımı. İlk hamle: cihazı ağdan ayır, kapatma, güvenlik ekibini ve yönetimi haberdar et. Türü tanımak, doğru müdahale sırasını belirler." },
      { t: "h", text: "Başlıca türler" },
      { t: "steps", h: "Yayılma ve davranış", items: [
        "Virüs: bir dosyaya bulaşır, kullanıcı çalıştırınca yayılır.",
        "Solucan (worm): kendi başına ağ üzerinden yayılır, kullanıcı gerekmez.",
        "Truva atı (trojan): faydalı görünüp içinde zararlı yük taşır.",
        "Fidye yazılımı (ransomware): dosyaları şifreler, fidye ister. Çift gasp: veriyi çalıp yayımlamakla da tehdit eder.",
        "Casus yazılım (spyware) ve keylogger: bilgiyi izler, tuş vuruşlarını kaydeder.",
        "Rootkit: kendini ve başka zararlıyı sistem derinliğinde gizler.",
        "Botnet: ele geçirilmiş cihazlar ağı; DDoS ve spam için kullanılır.",
        "Mantık bombası (logic bomb): belirli koşulda tetiklenir (ör. çalışan çıkarılınca).",
        "Dosyasız zararlı (fileless): diske yazmadan bellekte, PowerShell gibi araçlarla çalışır."
      ] },
      { t: "box", h: "Belirtiler", text: "Yavaşlama, bilinmeyen süreçler, beklenmedik ağ trafiği, kapanmayan antivirüs, değişen dosya uzantıları, açılmayan dosyalar, ekranda fidye notu." },
      { t: "steps", h: "Savunma", items: [
        "Güncel yama, EDR/antivirüs, e-posta ve web filtreleme.",
        "Yedekleme: 3-2-1 kuralı (3 kopya, 2 ortam, 1 çevrimdışı/uzak).",
        "En az yetki ve uygulama beyaz listeleme.",
        "Ağ segmentasyonu ile bulaşmayı sınırlama."
      ] },
      { t: "steps", h: "Fidye yazılımında ilk adımlar", items: [
        "Etkilenen cihazı ağdan ayır (kabloyu çek, Wi-Fi'yi kapat). Gücü hemen kesme: bellekteki izler kaybolabilir.",
        "Olayı bildir ve olay müdahale planını başlat.",
        "Yedeklerin temiz ve çevrimdışı olduğunu doğrula.",
        "Fidye ödemek garanti çözüm değildir; karar yönetim ve hukukla verilir."
      ] },
      { t: "warn", h: "Tuzak", text: "'Virüs' her zararlıya verilen genel isim gibi kullanılır. Sınavda ve işte doğru tür önemlidir: kendi başına yayılıyorsa solucan, faydalı görünüp zarar veriyorsa truva atı." }
    ],
    objectives: [
      { id: "h1", text: "Virüs, solucan ve truva atını yayılma biçimine göre ayırt edebilirsin." },
      { id: "h2", text: "Fidye yazılımı olayında ilk müdahale adımlarını (ağdan ayırma, bildirme, gücü kesmeme) doğru sırayla seçebilirsin." },
      { id: "h3", text: "3-2-1 yedekleme kuralını açıklayıp fidye yazılımına karşı temiz yedeğin rolünü gösterebilirsin." }
    ],
    summary: [
      "Virüs bir dosyaya bulaşıp çalıştırılınca yayılır, solucan ağ üzerinden kendi başına yayılır, truva atı faydalı görünüp zararlı yük taşır.",
      "Fidye yazılımı dosyaları şifreler; çift gasp durumunda veriyi çalıp yayımlamakla da tehdit eder.",
      "Fidye yazılımında cihaz ağdan ayrılır, güç hemen kesilmez, olay bildirilir ve yedeklerin temiz olduğu doğrulanır.",
      "3-2-1 kuralı 3 kopya, 2 farklı ortam ve 1 çevrimdışı ya da uzak kopya demektir.",
      "Güncel yama, EDR, en az yetki ve ağ segmentasyonu bulaşma riskini ve etkisini azaltır."
    ],
    quiz: [
      { id: "b4b012da", q: "Kullanıcı etkileşimi olmadan ağ üzerinden kendi kendine yayılan zararlı hangisidir?", options: ["Solucan", "Truva atı", "Keylogger", "Mantık bombası"], obj: "h1" },
      { id: "2a561e08", q: "Faydalı bir program gibi görünüp içinde zararlı yük taşıyan yazılım hangisidir?", options: ["Truva atı", "Solucan", "Botnet", "Rootkit"], obj: "h1" },
      { id: "f424e298", q: "Fidye yazılımına karşı en etkili önlem hangisidir?", options: ["Çevrimdışı yedek ve düzenli test", "Parolayı sık değiştirmek", "Yedeği her zaman ağa bağlı tutmak", "Tüm dosyaları tek paylaşımda toplamak"], obj: "h3" },
      { id: "e39ad6ad", q: "3-2-1 yedekleme kuralında '1' neyi ifade eder?", options: ["Bir kopya çevrimdışı ya da uzakta", "Bir kullanıcı", "Bir gün", "Bir sunucu"], obj: "h3" },
      { id: "c7fede34", q: "Çalışanın ekranında fidye notu çıktı. İlk müdahale hangisidir?", options: ["Cihazın gücünü hemen kesip dosyaları silmek", "Cihazı yeniden başlatıp dosyaları kurtarmayı denemek", "Cihazı ağdan ayırıp güvenlik ekibine bildirmek", "Fidyeyi hemen ödemek"], obj: "h2" },
      { id: "50db4d83", q: "Fidye yazılımı olayında aşağıdaki sıralardan hangisi doğrudur?", options: ["Gücü kes, cihazı yeniden başlat, olayı sonra bildir", "Cihazı ağdan ayır, olayı bildir, yedeklerin temiz olduğunu doğrula", "Fidyeyi öde, cihazı ağdan ayır, olayı bildir", "Olayı bildir, cihazı ağda bırak, dosyaları silmeyi dene"], obj: "h2" }
    ],
    interview: [
      { q: "Virüs ile solucan arasındaki fark nedir?", a: "Virüs bir dosyaya bulaşır ve çalıştırılınca yayılır. Solucan kullanıcı etkileşimi olmadan ağ üzerinden kendi kendine yayılır." },
      { q: "Fidye yazılımı olayında ilk ne yaparsın?", a: "Etkilenen cihazı ağdan ayırırım, güvenlik ekibine ve yönetime haber veririm, olay müdahale planını başlatırım ve yedeklerin temiz olduğunu doğrularım. Ödeme kararı yönetim ve hukukla verilir." }
    ],
    vocab: [
      { term: "Malware", tr: "zararlı yazılım", ex: "The malware spread fast." },
      { term: "Ransomware", tr: "fidye yazılımı", ex: "Ransomware encrypted the files." },
      { term: "Payload", tr: "zararlı yük", ex: "The payload was hidden." },
      { term: "Botnet", tr: "bot ağı", ex: "A botnet launched the DDoS." },
      { term: "Backup", tr: "yedek", ex: "Restore from backup." }
    ],
    resources: [
      res(PM, "Malware türleri ve savunma"),
      { title: "CISA: Fidye yazılımı rehberi (StopRansomware)", url: "https://www.cisa.gov/stopransomware", type: "doc", why: "Önleme ve müdahale için kurumsal rehber", level: "orta", lang: "EN" }
    ],
    sources: [CT]
  };

  /* 9 ───────────────────────────────────────────── Ağ saldırıları */
  L[9] = {
    hook: "Ağ saldırıları iletişimi dinler, kandırır, doldurur ya da yolunu şaşırtır. Hangi katmanda olduğunu bilmek çözümü gösterir.",
    homework: "Evindeki router yönetim sayfasına gir ve yönetici parolasının varsayılan olmadığını, WPS'in kapalı olduğunu ve yazılımının güncel olduğunu kontrol et.",
    warmup: {
      recap: [{ point: "CCNA'dan: ARP, DNS, DHCP ve switch/router çalışması ağ saldırılarının temelidir.", example: "ARP spoofing, rogue DHCP" }],
      concepts: [
        { term: "DDoS", tr: "Dağıtık hizmet engelleme", summary: "Çok sayıda kaynaktan trafikle hizmeti kullanılmaz hale getirmek.", example: "Botnet'ten gelen yük" },
        { term: "MITM", tr: "Ortadaki adam", summary: "İki taraf arasına girip trafiği dinlemek/değiştirmek.", example: "Sahte Wi-Fi" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Müşteri: 'Sitemiz çok yavaş, saniyede on binlerce istek geliyor.' Ağ trafiğine bakınca DDoS mu, yoksa kampanya yoğunluğu mu ayırt etmen gerekir. Saldırı türünü bilmek filtre ve koruma seçimini belirler." },
      { t: "steps", h: "Hizmet engelleme", items: [
        "DoS: tek kaynaktan, DDoS: çok kaynaktan (botnet) saldırı.",
        "Volumetrik: bant genişliğini doldurur. Protokol (SYN flood): bağlantı tablosunu doldurur. Uygulama katmanı: HTTP flood.",
        "Amplification (yansıtmalı): küçük sorguya büyük cevap veren servisleri (DNS, NTP) kurban adına kullanır.",
        "Savunma: CDN/DDoS koruma servisi, hız sınırlama, filtreleme, ISP desteği."
      ] },
      { t: "steps", h: "Araya girme ve kimlik taklidi", items: [
        "MITM: trafiği araya girip izler/değiştirir. Savunma: TLS/HTTPS ve sertifika doğrulama.",
        "ARP spoofing: yerel ağda sahte ARP cevabıyla trafiği kendine çeker. Savunma: DAI (DHCP snooping ile birlikte).",
        "DNS poisoning/spoofing: sahte DNS cevabıyla kullanıcıyı sahte siteye gönderir. Savunma: DNSSEC, güvenilir DNS.",
        "Rogue DHCP: sahte DHCP sunucusu yanlış gateway dağıtır. Savunma: DHCP snooping.",
        "Evil twin: meşru Wi-Fi adının sahte kopyası. Savunma: WPA3/802.1X, sahte AP tespiti."
      ] },
      { t: "steps", h: "Keşif ve parola saldırıları", items: [
        "Port tarama (nmap): açık servisleri keşfetmek için. Savunma: gereksiz portları kapatmak, güvenlik duvarı.",
        "Brute force / dictionary: parola denemeleri. Savunma: hesap kilitleme, MFA, güçlü parola.",
        "Password spraying: az sayıda yaygın parolayı çok hesapta denemek (kilitlemeye takılmamak için).",
        "Credential stuffing: sızmış kullanıcı/parola ikililerini başka sitelerde denemek. Savunma: benzersiz parola, MFA.",
        "Replay: yakalanan geçerli mesajı tekrar göndermek. Savunma: zaman damgası, nonce."
      ] },
      { t: "box", h: "Ayırt etme", text: "Switch'te MAC tablosunu doldurmak (MAC flooding) switch'i hub gibi davranmaya zorlar; port security ile önlenir. VLAN hopping'e karşı kullanılmayan portları kapat, native VLAN'ı değiştir." },
      { t: "warn", h: "Tuzak", text: "Password spraying ile brute force karıştırılır: brute force bir hesaba çok parola dener, spraying çok hesaba az parola dener." },
      { t: "steps", h: "Protokol düşürme ve kullanıcı numaralandırma (V8)", items: [
        "Protocol downgrade: saldırgan iletişimin iki ucunu da daha eski ve zayıf bir sürüme (ör. eski TLS, SSL, WEP, zayıf şifre takımı) geri düşmeye zorlar, sonra o sürümün bilinen açıklarını kullanır. Savunma: sunucuda eski sürümleri kapatmak ve güçlü sürümü zorunlu kılmak.",
        "Kullanıcı numaralandırma (user enumeration): giriş ya da parola sıfırlama formu, hesabın var olup olmadığını ele veren farklı cevaplar verir ('kullanıcı bulunamadı' ya da cevap süresi farkı). Saldırgan geçerli kullanıcı listesi çıkarıp parola püskürtmeye geçer.",
        "Savunma: iki durumda da aynı genel hata mesajı, hız sınırlama (rate limiting) ve MFA."
      ] }
    ],
    objectives: [
      { id: "h1", text: "ARP spoofing, DNS poisoning ve rogue DHCP saldırılarını tanıyıp her birine karşı savunmayı (DAI, DNSSEC, DHCP snooping) eşleştirebilirsin." },
      { id: "h2", text: "Brute force, password spraying ve credential stuffing saldırılarını deneme biçimine göre ayırt edebilirsin." },
      { id: "h3", text: "DoS ve DDoS saldırılarını volumetrik, protokol (SYN flood) ve uygulama katmanı olarak sınıflandırabilirsin." },
      { id: "h4", text: "Protokol düşürme ve kullanıcı numaralandırma saldırılarını tanıyıp uygun savunmayı seçebilirsin." }
    ],
    summary: [
      "ARP spoofing yerel ağda sahte ARP cevabıyla trafiği çeker; savunması DAI'dir (DHCP snooping ile birlikte).",
      "Rogue DHCP yanlış gateway dağıtır ve DHCP snooping ile engellenir; DNS poisoning ise sahte DNS cevabıyla kullanıcıyı sahte siteye gönderir.",
      "Brute force bir hesaba çok parola dener, spraying çok hesaba az parola dener, credential stuffing sızmış parola ikililerini dener.",
      "DDoS çok kaynaktan gelir ve volumetrik, protokol (SYN flood) ya da uygulama katmanı olabilir.",
      "TLS araya girmeye, MFA ve hesap kilitleme parola saldırılarına, CDN ve hız sınırlama DDoS'a karşı kullanılır."
    ],
    quiz: [
      { id: "5f2dc9ae", q: "Yerel ağda sahte ARP cevaplarıyla trafiği saldırganın üzerinden geçirmek hangisidir?", options: ["ARP spoofing", "DNS poisoning", "SYN flood", "Replay"], obj: "h1" },
      { id: "c78955fb", q: "Çok sayıda hesapta birkaç yaygın parolayı denemek hangisidir?", options: ["Password spraying", "Brute force", "Replay", "MITM"], obj: "h2" },
      { id: "17f6c82d", q: "Rogue DHCP sunucusuna karşı switch'te hangi özellik kullanılır?", options: ["DHCP snooping", "STP", "NAT", "PoE"], obj: "h1" },
      { id: "0ee14842", q: "SYN flood hangi tür saldırıdır?", options: ["Protokol tabanlı DoS", "Parola saldırısı", "Sosyal mühendislik", "MITM"], obj: "h3" },
      { id: "267eaadb", q: "Başka bir sitedeki sızıntıdan alınan gerçek kullanıcı adı/parola çiftlerini hedef sitede denemek hangisidir?", options: ["Brute force", "Password spraying", "Credential stuffing", "Replay"], obj: "h2" },
      { id: "5f2cb041", q: "Sahte DNS cevaplarına karşı kayıtların dijital imzayla doğrulanmasını sağlayan önlem hangisidir?", options: ["DAI", "DHCP snooping", "Port security", "DNSSEC"], obj: "h1" },
      { id: "d357c829", q: "Saldırgan, istemci ile sunucu arasındaki el sıkışmaya karışıp TLS 1.3 yerine eski ve açığı bilinen bir sürümün kullanılmasını sağlıyor. Bu saldırı hangisidir?", options: ["Replay saldırısı", "Protokol düşürme (downgrade) saldırısı", "DNS önbellek zehirlenmesi", "Parola püskürtme"], obj: "h4" },
      { id: "226f0b2a", q: "Bir giriş sayfası yanlış kullanıcı adında 'Böyle bir kullanıcı yok', doğru kullanıcı adı ama yanlış parolada 'Parola hatalı' diyor. Saldırgan bu farktan ne öğrenir ve en iyi düzeltme nedir?", options: ["Parolanın uzunluğunu; hata mesajını daha ayrıntılı yapmak", "Oturum belirtecini; çerezi HttpOnly yapmak", "Sunucunun yazılım sürümünü; banner'ı gizlemek", "Hangi hesapların var olduğunu; iki durumda da aynı genel hata mesajını göstermek"], obj: "h4" }
    ],
    interview: [
      { q: "DDoS saldırısına karşı ne yaparsın?", a: "Trafiği ve türünü hızla analiz ederim, CDN ya da DDoS koruma servisine yönlendiririm, hız sınırlama ve filtre uygularım ve ISP ile iletişime geçerim. Önceden de kapasite ve olay planı hazır olmalıdır." },
      { q: "Brute force, spraying ve credential stuffing farkı nedir?", a: "Brute force tek hesaba çok parola dener. Spraying çok hesaba az sayıda yaygın parola dener. Credential stuffing başka sızıntılardan alınan gerçek kullanıcı/parola çiftlerini dener. Hepsine karşı MFA ve izleme etkilidir." }
    ],
    vocab: [
      { term: "Spoofing", tr: "taklit", ex: "ARP spoofing was detected." },
      { term: "Flood", tr: "sel (aşırı yük)", ex: "A SYN flood hit the server." },
      { term: "Eavesdropping", tr: "gizlice dinleme", ex: "TLS prevents eavesdropping." },
      { term: "Brute force", tr: "kaba kuvvet", ex: "Brute force attacks failed." },
      { term: "Rate limiting", tr: "hız sınırlama", ex: "Enable rate limiting." }
    ],
    resources: [
      res(PM, "Ağ saldırıları bölümleri"),
      { title: "Cloudflare: DDoS saldırısı nedir?", url: "https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/", type: "doc", why: "DDoS'u görsellerle anlatır", level: "başlangıç", lang: "EN" }
    ],
    sources: [CT]
  };

  /* 10 ──────────────────────────────────────────── Uygulama saldırıları */
  L[10] = {
    hook: "Uygulama saldırılarında saldırgan formdaki bir kutuyu bile komut girişine çevirebilir. Kök neden: girdiye körü körüne güvenmek.",
    homework: "OWASP Top 10 (2025 sürümü) listesine bak ve her maddeyi tek cümleyle kendi kelimelerinle yaz. En çok merak ettiğin ikisini seç.",
    warmup: {
      recap: [{ point: "Kullanıcıdan gelen veriye güvenilmez.", example: "Form alanı, URL parametresi" }],
      concepts: [
        { term: "Injection", tr: "Komut enjekte etme", summary: "Girdiyi komut/sorgu olarak çalıştırtmak.", example: "' OR '1'='1" },
        { term: "XSS", tr: "Siteler arası betik", summary: "Sayfaya zararlı JavaScript yerleştirmek.", example: "<script> yorum kutusunda" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Geliştirici: 'Arama kutusuna tırnak işareti yazınca sayfa hata veriyor.' Bu, SQL injection belirtisi olabilir. Güvenlik tarafı olarak sorunu tanımak ve geliştiriciye çözümü (parametreli sorgu) söylemek senin işin." },
      { t: "steps", h: "Başlıca uygulama saldırıları", items: [
        "SQL injection: girdi SQL sorgusuna karışır. Örn. ' OR '1'='1 ile giriş atlanır. Savunma: parametreli sorgu (prepared statement), girdi doğrulama, en az yetkili DB hesabı.",
        "XSS (Cross-Site Scripting): sayfaya zararlı JS enjekte edilir; başka kullanıcının tarayıcısında çalışır. Savunma: çıktıyı encode etme, CSP.",
        "CSRF: kullanıcının oturumuyla istemeden işlem yaptırmak. Savunma: CSRF token, SameSite çerez.",
        "Komut enjeksiyonu: girdi işletim sistemi komutuna karışır. Savunma: girdi doğrulama, shell'e doğrudan parametre vermemek.",
        "Path traversal: ../../ ile izinsiz dosya okumak. Savunma: yol doğrulama.",
        "Buffer overflow: belleğe sığmayan veriyle bellek bozulması ve kod çalıştırma. Savunma: güvenli dil/derleyici korumaları.",
        "SSRF: sunucuyu iç ağa istek yaptırmak. Savunma: URL beyaz liste, iç ağ erişimini sınırlama.",
        "Race condition / TOCTOU: kontrol ile kullanım arasındaki zaman farkını suistimal etmek."
      ] },
      { t: "cmd", lang: "text", calistirma: "atla yorum satırlarıyla anlatılan SQL enjeksiyon örneği; çalıştırılacak kod yok", text: "# Savunmasız:   SELECT * FROM users WHERE name = '" + "$girdi" + "'\n# Girdi:         ' OR '1'='1\n# Sonuç:        tüm kullanıcılar döner\n\n# Güvenli (parametreli):\n# SELECT * FROM users WHERE name = ?   -- değer sorgudan ayrı gönderilir" },
      { t: "box", h: "Ortak kök", text: "Enjeksiyon ailesinde (SQLi, XSS, komut enjeksiyonu) veri ile komut karışır; diğerlerinde de kök neden girdiye, oturuma ya da zamanlamaya güvenmektir. Ortak çözüm: girdiyi doğrula, çıktıyı encode et, parametreli arayüz kullan, en az yetki ver." },
      { t: "steps", h: "Güvenli yazılım yöntemleri", items: [
        "Girdi doğrulama (beyaz liste) ve çıktı kodlama.",
        "Statik kod analizi (SAST), dinamik test (DAST), bağımlılık taraması.",
        "WAF (web uygulaması güvenlik duvarı) ek katman olur, asıl çözümün yerine geçmez.",
        "Sır (parola, anahtar) kodda tutulmaz."
      ] },
      { t: "warn", h: "Tuzak", text: "WAF, hatalı kodu düzeltmez. Asıl çözüm kodda; WAF geçici ve ek bir korumadır." },
      { t: "steps", h: "OWASP Top 10 (2025 sürümü)", items: [
        "2025 listesi: A01 Bozuk erişim denetimi, A02 Güvenlik yanlış yapılandırması, A03 Yazılım tedarik zinciri hataları, A04 Kriptografik hatalar, A05 Enjeksiyon, A06 Güvensiz tasarım, A07 Kimlik doğrulama hataları, A08 Yazılım ve veri bütünlüğü hataları, A09 Güvenlik günlüğü ve uyarı hataları, A10 İstisnai durumların yanlış ele alınması.",
        "2021'e göre değişenler: SSRF ayrı madde olmaktan çıkıp bozuk erişim denetimine katıldı; 'Savunmasız ve eski bileşenler' yerini daha geniş kapsamlı 'Yazılım tedarik zinciri hataları'na bıraktı; 'İstisnai durumların yanlış ele alınması' yeni eklendi.",
        "İstisnai durumların yanlış ele alınması: hata anında uygulamanın yığın izi, sorgu ya da bağlantı dizesi göstermesi, hatayı yutması veya güvensiz varsayılana düşmesi. Savunma: genel kullanıcı mesajı, ayrıntıyı yalnızca günlüğe yazmak, hata durumunda güvenli (kapalı) davranmak."
      ] }
    ],
    objectives: [
      { id: "h1", text: "SQL injection girdisini tanıyıp en etkili savunmanın parametreli sorgu olduğunu seçebilirsin." },
      { id: "h2", text: "XSS, CSRF ve SSRF saldırılarını nerede ve kimin adına çalıştıklarına göre ayırt edebilirsin." },
      { id: "h3", text: "../../ içeren bir girdiyi path traversal olarak tanıyabilirsin." },
      { id: "h4", text: "OWASP Top 10 (2025) listesinin başlıca maddelerini ve istisnai durumların yanlış ele alınmasını (güvensiz hata yönetimi) tanıyabilirsin." }
    ],
    summary: [
      "Enjeksiyon saldırılarının ortak kökü, kullanıcı verisinin komut ya da sorgu olarak çalışmasıdır; diğer saldırılar da girdiye ya da oturuma körü körüne güvenmekten doğar.",
      "SQL injection'a karşı en etkili savunma parametreli sorgudur; girdi doğrulama ve en az yetkili DB hesabı destekler.",
      "XSS zararlı betiği başka kullanıcının tarayıcısında çalıştırır, CSRF kullanıcının açık oturumuyla istek yaptırır, SSRF sunucuyu iç ağa istek yaptırır.",
      "Path traversal ../../ ile izinsiz dosyaya erişmeye çalışır; savunması yol doğrulamadır.",
      "WAF ek bir katmandır ve hatalı kodu düzeltmez; asıl çözüm kodda yapılır."
    ],
    quiz: [
      { id: "281ec6c5", q: "SQL injection'a karşı en etkili savunma hangisidir?", options: ["Parametreli sorgu", "Sadece WAF", "Parolayı uzatmak", "HTTPS kullanmak"], obj: "h1" },
      { id: "2b28ad34", q: "Başka kullanıcıların tarayıcısında çalışan zararlı JavaScript hangi saldırıdır?", options: ["XSS", "CSRF", "SSRF", "Buffer overflow"], obj: "h2" },
      { id: "6b110126", q: "Kullanıcının açık oturumunu kullanarak istemeden işlem yaptırma hangisidir?", options: ["CSRF", "XSS", "Path traversal", "Replay"], obj: "h2" },
      { id: "547c8f31", q: "../../etc/passwd gibi bir girdi hangi saldırıya işaret eder?", options: ["Path traversal", "SQL injection", "XSS", "DDoS"], obj: "h3" },
      { id: "f55a350d", q: "Saldırgan bir web uygulamasını, dışarıdan erişilemeyen iç ağdaki bir yönetim servisine istek göndermeye zorluyor. Bu hangisidir?", options: ["XSS", "CSRF", "SSRF", "Buffer overflow"], obj: "h2" },
      { id: "18c2a7d4", q: "Bir web uygulaması beklenmedik bir hata oluşunca kullanıcıya tam yığın izini ve veritabanı bağlantı dizesini gösteriyor. Bu, hangi zafiyet türünün örneğidir?", options: ["İstisnai durumların güvensiz ele alınması (hata yönetimi hatası)", "SQL enjeksiyonu", "Çapraz site istek sahteciliği (CSRF)", "Dizin gezinme (path traversal)"], obj: "h4" },
      { id: "ea7c5971", q: "Hangi İKİ kontrol XSS (siteler arası betik çalıştırma) saldırılarına karşı etkilidir?", options: ["Çıktı kodlaması (output encoding)", "Content Security Policy (CSP)", "Parola karmaşıklığı kuralını sıkılaştırmak", "TLS sürümünü yükseltmek", "Sunucuda port taramasını engellemek"], multi: 2, obj: "h2" }
    ],
    interview: [
      { q: "SQL injection nedir, nasıl önlenir?", a: "Kullanıcı girdisinin SQL sorgusuna komut olarak karışmasıdır. Parametreli sorgularla, girdi doğrulamayla ve veritabanı hesabına en az yetki vererek önlenir." },
      { q: "XSS ile CSRF farkı nedir?", a: "XSS'te saldırgan zararlı betiği sitenin içinde çalıştırır. CSRF'te saldırgan kullanıcının açık oturumunu kullanarak istek gönderir. XSS için çıktı kodlama ve CSP, CSRF için token ve SameSite çerez kullanılır." }
    ],
    vocab: [
      { term: "Injection", tr: "enjeksiyon", ex: "SQL injection is common." },
      { term: "Sanitize", tr: "girdiyi temizlemek", ex: "Sanitize all input." },
      { term: "Prepared statement", tr: "hazır sorgu", ex: "Use prepared statements." },
      { term: "Payload", tr: "zararlı girdi/yük", ex: "The payload was blocked." },
      { term: "WAF", tr: "web uygulaması güvenlik duvarı", ex: "The WAF blocked the request." }
    ],
    resources: [
      res(OWASP, "Uygulama zafiyetlerinin güncel listesi"),
      { title: "PortSwigger Web Security Academy (ücretsiz)", url: "https://portswigger.net/web-security", type: "kurs", why: "Güvenli laboratuvarlarda pratik yaparak öğrenme", level: "orta", lang: "EN" }
    ],
    sources: [CT, OWASP]
  };

  /* 11 ──────────────────────────────────────────── Zafiyet türleri */
  L[11] = {
    hook: "Zafiyet kapının kilidindeki kusurdur. Saldırgan o kusuru kullanınca ona 'exploit' denir.",
    homework: "Bir yazılımın (ör. tarayıcın) güncelleme geçmişine bak ve son güvenlik güncellemesinde hangi CVE numaralarının kapatıldığını bul.",
    warmup: {
      recap: [{ point: "Uygulama saldırıları bir zafiyeti sömürür.", example: "SQL injection açığı" }],
      concepts: [
        { term: "Zafiyet (vulnerability)", tr: "Zayıflık", summary: "Sömürülebilecek bir yazılım/yapılandırma kusuru.", example: "Yamalanmamış servis" },
        { term: "CVE", tr: "Zafiyet numarası", summary: "Bilinen zafiyetler için standart kimlik.", example: "CVE-2024-XXXXX" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Tarama raporunda 40 bulgu var. Hangisini önce kapatırsın? Önceliği CVSS puanı, sömürülme kolaylığı ve varlığın önemi belirler. Zafiyet türlerini bilmek raporu okumayı kolaylaştırır." },
      { t: "steps", h: "Zafiyet türleri", items: [
        "Yazılım zafiyeti: kod hatası (buffer overflow, injection).",
        "Yamalanmamış sistem: bilinen açığın giderilmemesi.",
        "Yapılandırma hatası: varsayılan parola, açık port, herkese açık depolama.",
        "Zero-day: üreticinin henüz bilmediği/yama çıkarmadığı zafiyet.",
        "Eski/desteği biten (end-of-life) sistem: artık yama gelmeyen yazılım.",
        "Donanım/firmware zafiyeti: işlemci, BIOS, IoT cihaz yazılımı.",
        "Tedarik zinciri: kullandığın kütüphane, yazılım ya da hizmet sağlayıcıdaki zafiyet.",
        "Sanallaştırma/bulut: VM escape, yanlış yapılandırılmış bulut depolama.",
        "İnsan: eğitimsizlik, parola tekrarı."
      ] },
      { t: "steps", h: "Ölçme ve kayıt", items: [
        "CVE: bilinen zafiyetin benzersiz kimliği.",
        "CVSS: 0-10 arası şiddet puanı (Düşük, Orta, Yüksek, Kritik).",
        "Zafiyet taraması: bilinen açıkları arar (Nessus, OpenVAS).",
        "Sızma testi: açığı gerçekten sömürmeyi dener; izin ve kapsam şarttır."
      ] },
      { t: "box", h: "Öncelik nasıl verilir?", text: "Yalnızca CVSS'e değil: sömürü internette var mı, varlık dışa açık mı, hangi veri var, telafi edici kontrol var mı sorularına bak. İnternete açık kritik sistemdeki yüksek puanlı açık, iç ağdaki test makinesinden önce kapanır." },
      { t: "warn", h: "Tuzak", text: "Zafiyet taraması ile sızma testi aynı şey değildir. Tarama bulur ve listeler; sızma testi insanla bulguları zincirleyip gerçek etkiyi gösterir. Yanlış pozitifleri (false positive) tarama sonrası doğrulaman gerekir." },
      { t: "steps", h: "Zafiyet kimlikleri: CVE, CWE, CVSS", items: [
        "CVE: belirli bir üründeki belirli bir zafiyetin benzersiz numarasıdır (ör. CVE-yıl-sayı biçimi).",
        "CWE: zafiyetin arkasındaki zayıflık türlerinin listesidir (ör. bellek taşması, enjeksiyon, hardcoded kimlik bilgisi); tek bir ürünü değil hata sınıfını anlatır.",
        "CVSS: zafiyetin ciddiyetini 0-10 arasında puanlar. Kısa ezber: CWE 'hata türü', CVE 'bu üründeki o hata', CVSS 'ne kadar ciddi'."
      ] }
    ],
    objectives: [
      { id: "h1", text: "Bir senaryodaki zafiyeti türüne (zero-day, yapılandırma hatası, end-of-life, tedarik zinciri) göre sınıflandırabilirsin." },
      { id: "h2", text: "CVE, CWE, CVSS, zafiyet taraması ve sızma testinin rollerini ayırt edebilirsin." },
      { id: "h3", text: "İki bulgudan hangisinin önce kapatılacağını CVSS, sömürü durumu ve varlığın dışa açıklığına bakarak seçebilirsin." }
    ],
    summary: [
      "Zero-day, üreticinin henüz bilmediği ya da yama çıkarmadığı zafiyettir; yama olmadığı için telafi edici kontrol gerekir.",
      "CVE zafiyetin kimlik numarasıdır, CVSS ise 0-10 arası şiddet puanıdır; ikisi aynı şey değildir.",
      "Varsayılan parola, açık port ve herkese açık depolama yazılım hatası değil yapılandırma hatasıdır.",
      "Öncelik yalnızca CVSS'e göre verilmez: sömürü kodunun var olması, varlığın internete açıklığı ve içerdiği veri de hesaba girer.",
      "Tarama bilinen açıkları listeler ve yanlış pozitif üretebilir; sızma testi izinle açığı gerçekten sömürüp etkiyi gösterir."
    ],
    quiz: [
      { id: "d3554b18", q: "Üreticinin henüz bilmediği ve yaması olmayan zafiyet nasıl adlandırılır?", options: ["Zero-day", "End-of-life", "Misconfiguration", "False positive"], obj: "h1" },
      { id: "d5be7499", q: "Zafiyetin şiddetini 0-10 arası puanlayan sistem hangisidir?", options: ["CVSS", "CVE", "SIEM", "DLP"], obj: "h2" },
      { id: "cb1193b2", q: "Varsayılan parolanın değiştirilmemesi hangi zafiyet türüdür?", options: ["Yapılandırma hatası", "Zero-day", "Buffer overflow", "Tedarik zinciri"], obj: "h1" },
      { id: "a4c19945", q: "Tarayıcının bulduğu ama gerçekte olmayan bir bulguya ne denir?", options: ["False positive", "False negative", "Zero-day", "Exploit"], obj: "h2" },
      { id: "791744bd", q: "Üreticisi desteğini bitirdiği için artık hiç yama yayımlamayan bir işletim sistemi hangi zafiyet türüne örnektir?", options: ["End-of-life sistem", "Zero-day", "Yanlış pozitif", "Sızma testi"], obj: "h1" },
      { id: "4774f970", q: "İki bulgu var: (A) iç ağdaki test makinesinde CVSS 9.8 ama bilinen sömürü yok; (B) internete açık müşteri portalında CVSS 7.5 ve internette çalışan sömürü kodu mevcut. Hangisi önce kapatılmalıdır?", options: ["B: dışa açık ve sömürüsü hazır", "A: çünkü puanı daha yüksek", "İkisi de aynı anda, sıra önemsiz", "Hangisinin yaması daha kolaysa o"], obj: "h3" },
      { id: "569f6a37", q: "Bir kurumun, kapsamı ve izni yazılı belirlenmiş şekilde yetkili bir uzmandan bulunan açıkları gerçekten sömürüp gerçek etkiyi göstermesini istemesi hangisidir?", options: ["Sızma testi","Zafiyet taraması","CVE araması","CVSS puanlaması"], obj: "h2" },
      { id: "e236653f", q: "Güvenlik ekibi, farklı ürünlerdeki birçok açığın aynı kök hata türünden (ör. girdi doğrulamasının eksikliği) kaynaklandığını raporlamak istiyor. Hata türlerini sınıflandıran liste hangisidir?", options: ["CVE", "CVSS", "CISA KEV", "CWE"], obj: "h2" }
    ],
    interview: [
      { q: "Zafiyet taraması ile sızma testi arasındaki fark nedir?", a: "Zafiyet taraması otomatik araçla bilinen açıkları listeler. Sızma testi yetkiyle açıkları gerçekten sömürmeyi dener, etkiyi gösterir ve bulguları zincirler. İkisi de kapsam ve izinle yapılır." },
      { q: "Zafiyetleri nasıl önceliklendirirsin?", a: "CVSS puanı, açığın aktif olarak sömürülüp sömürülmediği, varlığın internete açık olup olmadığı ve içerdiği verinin önemi birlikte değerlendirilir." }
    ],
    vocab: [
      { term: "Vulnerability", tr: "zafiyet", ex: "A critical vulnerability was found." },
      { term: "Exploit", tr: "sömürü kodu", ex: "A public exploit exists." },
      { term: "Patch", tr: "yama", ex: "Apply the patch." },
      { term: "Misconfiguration", tr: "yanlış yapılandırma", ex: "The bucket was misconfigured." },
      { term: "False positive", tr: "yanlış alarm", ex: "It was a false positive." }
    ],
    resources: [
      res(PM, "Zafiyet türleri ve zafiyet taraması"),
      { title: "NVD: Ulusal Zafiyet Veritabanı (CVE arama)", url: "https://nvd.nist.gov/", type: "araç", why: "CVE ve CVSS bilgisi aramak için", level: "orta", lang: "EN" }
    ],
    sources: [CT]
  };

  /* 12 ──────────────────────────────────────────── Ağ segmentasyonu */
  L[12] = {
    hook: "Gemide su geçirmez bölmeler vardır: bir yer su alsa da gemi batmaz. Segmentasyon ağı böyle bölmelere ayırır.",
    homework: "Evde ya da ofiste misafir Wi-Fi'ı ana ağdan ayrı mı? Ayrıysa nasıl, değilse nasıl ayrılabileceğini bir paragraf yaz.",
    warmup: {
      recap: [{ point: "CCNA'dan VLAN: aynı switch'i mantıksal olarak birden çok ağa böler.", example: "VLAN 10 ve 20" }],
      concepts: [
        { term: "Segmentasyon", tr: "Ağı bölmek", summary: "Ağı güvenlik bölgelerine ayırıp aralarındaki trafiği kurala bağlamak.", example: "Misafir, sunucu, yönetim VLAN'ları" },
        { term: "DMZ", tr: "Tampon bölge", summary: "İnternete açık servislerin iç ağdan ayrılmış bölgesi.", example: "Web sunucusu DMZ'de" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Bir kamera sistemi ele geçirildi. Kameralar muhasebe ağıyla aynı ağdaysa saldırgan oradan muhasebeye geçebilir. Segmentasyon, ihlalin 'patlama yarıçapını' küçültür." },
      { t: "steps", h: "Segmentasyon yöntemleri", items: [
        "Fiziksel: ayrı switch, ayrı kablolama.",
        "VLAN: mantıksal ayrım; VLAN'lar arası trafik router/L3 switch ve ACL ile kontrol edilir.",
        "Güvenlik duvarı bölgeleri: iç (trusted), DMZ, dış (untrusted).",
        "Mikrosegmentasyon: bulut/veri merkezinde iş yükü bazında ince kural.",
        "Hava boşluğu (air gap): kritik sistemi ağdan tamamen ayırmak."
      ] },
      { t: "steps", h: "Yaygın bölgeler", items: [
        "Kullanıcı ağı, sunucu ağı, yönetim ağı, misafir ağı, IoT/kamera ağı, yazıcı ağı.",
        "DMZ: dışarıdan erişilen web/e-posta sunucuları.",
        "Üretim/OT ağı ayrı tutulur."
      ] },
      { t: "box", h: "İlkeler", text: "En az yetki: sadece gerekli trafiğe izin ver, gerisini engelle (default deny). Güvenlik duvarı kuralları 'kimden, kime, hangi portla' olarak yazılır. Yönetim erişimi ayrı ağdan yapılır." },
      { t: "steps", h: "Diğer ağ güvenliği kavramları", items: [
        "Jump server / bastion host: yönetilen sistemlere tek ve izlenen giriş noktası.",
        "NAC (Network Access Control): cihazın sağlık/kimlik durumuna göre ağa kabul.",
        "Port security, 802.1X: izinsiz cihazın switch portuna bağlanmasını önler.",
        "Honeypot: saldırganı çekip izlemek için tuzak sistem."
      ] },
      { t: "warn", h: "Tuzak", text: "VLAN kendi başına güvenlik duvarı değildir. VLAN'lar arasında filtreleme yoksa ayrım göstermeliktir. Çözüm: VLAN + ACL/firewall kuralı." }
    ],
    objectives: [
      { id: "h1", text: "Bir servisi doğru ağ bölgesine yerleştirip segmentasyonun saldırının yayılmasını neden sınırladığını seçebilirsin." },
      { id: "h2", text: "VLAN, air gap, mikrosegmentasyon ve güvenlik duvarı bölgelerini birbirinden ayırt edebilirsin." },
      { id: "h3", text: "802.1X, NAC ve bastion host gibi kontrolleri çözdükleri soruna göre eşleştirebilirsin." }
    ],
    summary: [
      "Segmentasyon ağı bölgelere ayırır; bir bölge ele geçirilse bile saldırganın yatay hareketi (lateral movement) zorlaşır.",
      "Dışarıdan erişilen web ve e-posta sunucuları iç ağa değil DMZ'ye konur; DMZ'deki makine ele geçse de iç ağa doğrudan erişemez.",
      "VLAN tek başına güvenlik duvarı değildir; VLAN'lar arasında ACL ya da firewall kuralı yoksa ayrım göstermelik kalır.",
      "Air gap kritik sistemi hiçbir ağa bağlamamaktır; mikrosegmentasyon ise bulut ve veri merkezinde iş yükü bazında ince kural yazar.",
      "802.1X switch portunda kimlik doğrular, bastion host yönetilen sistemlere tek ve izlenen giriş noktası sağlar."
    ],
    quiz: [
      { id: "5a8fdef8", q: "İnternete açık web sunucusu hangi bölgeye yerleştirilir?", options: ["DMZ", "Yönetim ağı", "Kullanıcı ağı", "Air gap"], obj: "h1" },
      { id: "01345129", q: "Segmentasyonun temel güvenlik faydası nedir?", options: ["Saldırının yayılmasını sınırlar", "İnterneti hızlandırır", "Parolayı güçlendirir", "Lisans maliyetini düşürür"], obj: "h1" },
      { id: "9ae34017", q: "Kritik bir sistemi ağdan fiziksel olarak tamamen ayırmak hangisidir?", options: ["Air gap", "DMZ", "VLAN", "NAT"], obj: "h2" },
      { id: "fb596526", q: "Switch portuna izinsiz cihaz bağlanmasını engelleyen standart hangisidir?", options: ["802.1X", "NTP", "SNMP", "DHCP"], obj: "h3" },
      { id: "1adf63b5", q: "İki VLAN tanımlandı, VLAN'lar arası yönlendirme açık ama aralarında hiçbir ACL ya da güvenlik duvarı kuralı yok. Güvenlik açısından durum nedir?", options: ["Ayrım göstermeliktir; yönlendirme filtrelenmediği için trafik VLAN'lar arasında geçebilir", "VLAN'lar kendiliğinden tam yalıtım sağlar; yönlendirme açık olsa da trafik karışmaz", "Trafik yalnızca şifreliyse VLAN'lar arasında geçebilir, düz metin trafik engellenir", "Sorun yalnızca iki VLAN fiziksel olarak aynı kabloyu paylaşıyorsa ortaya çıkar"], obj: "h2" },
      { id: "b313193d", q: "Yönetilen sunuculara erişimin tek ve izlenen bir noktadan yapılmasını sağlayan sistem hangisidir?", options: ["Bastion host (jump server)", "Honeypot", "Air gap", "Stateless paket filtresi"], obj: "h3" },
      { id: "1de02f42", q: "Ağa bağlanmak isteyen bir cihazın kimliği ya da sağlık durumu (yama, antivirüs) uygun değilse onu ağa almayan ya da karantina bölgesine yönlendiren kontrol hangisidir?", options: ["NAC","Honeypot","DMZ","Air gap"], obj: "h3" }
    ],
    interview: [
      { q: "Ağ segmentasyonu neden önemlidir?", a: "Bir bölge ele geçirilirse saldırganın başka bölgelere yatay hareketini sınırlar. İhlalin etkisini küçültür ve trafiği kurala bağlayarak izleme kolaylaştırır." },
      { q: "DMZ nedir?", a: "İnternete açık servislerin iç ağdan ayrı, güvenlik duvarıyla kontrol edilen bölgesidir. DMZ'deki sunucu ele geçirilse bile iç ağa doğrudan erişemez." }
    ],
    vocab: [
      { term: "Segmentation", tr: "bölümleme", ex: "Network segmentation limits damage." },
      { term: "DMZ", tr: "tampon bölge", ex: "Place the web server in the DMZ." },
      { term: "Lateral movement", tr: "yatay hareket", ex: "Prevent lateral movement." },
      { term: "Default deny", tr: "varsayılan engelle", ex: "Use a default deny rule." },
      { term: "Bastion host", tr: "köprü sunucu", ex: "Log in via the bastion host." }
    ],
    resources: [
      res(PM, "Ağ segmentasyonu ve güvenli ağ tasarımı"),
      { title: "NIST: Zero Trust Architecture (SP 800-207)", url: "https://csrc.nist.gov/pubs/sp/800/207/final", type: "doc", why: "Segmentasyonun modern yaklaşımı", level: "ileri", lang: "EN" }
    ],
    sources: [CT]
  };
})();

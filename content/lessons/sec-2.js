/* Siber güvenlik (Security+ SY0-701 temelli) · sabit dersler 7-12 */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).sec = (window.PP_LESSONS.sec || {}));
  var CT = { title: "CompTIA Security+ sınav hedefleri (SY0-701)", url: "https://www.comptia.org/certifications/security" };
  var PM = { title: "Professor Messer: Security+ SY0-701 (ücretsiz video kursu)", url: "https://www.professormesser.com/", type: "video", length: "Çok bölümlü", level: "başlangıç", lang: "EN" };
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
        "Shoulder surfing: omuz üstünden ekrana ya da parola yazışına bakmak.",
        "Dumpster diving: çöpten belge ve bilgi toplamak.",
        "Baiting: USB bırakmak gibi merak uyandıran yemler."
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
      { t: "warn", h: "Tuzak", text: "Sosyal mühendisliğin en iyi savunması teknik değil, kültürdür: kimsenin 'çok meşgulüm' diye doğrulamayı atlamadığı bir kurum." }
    ],
    quiz: [
      { q: "Bir yöneticiyi hedef alan özel hazırlanmış oltalama saldırısı nasıl adlandırılır?", options: ["Whaling", "Smishing", "Pharming", "Baiting"], answer: "Whaling", why: "Whaling, üst düzey yöneticilere yönelik spear phishing'dir." },
      { q: "Yetkili çalışanın arkasından kapıdan sızmak hangisidir?", options: ["Tailgating", "Vishing", "Typosquatting", "Pharming"], answer: "Tailgating", why: "Tailgating, yetkili birinin ardından fiziksel olarak içeri girmektir." },
      { q: "Telefonla arayıp 'IT destekten arıyorum, parolanı söyle' demek hangisine girer?", options: ["Vishing / pretexting", "Dumpster diving", "Watering hole", "Smishing"], answer: "Vishing / pretexting", why: "Ses yoluyla, uydurma bir senaryoyla bilgi koparılıyor." },
      { q: "Gogle.com gibi benzer yazımlı alan adı kaydetmek hangisidir?", options: ["Typosquatting", "Tailgating", "Whaling", "Baiting"], answer: "Typosquatting", why: "Yazım hatasına güvenen sahte alan adıdır." }
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
    quiz: [
      { q: "Kullanıcı etkileşimi olmadan ağ üzerinden kendi kendine yayılan zararlı hangisidir?", options: ["Solucan", "Truva atı", "Keylogger", "Mantık bombası"], answer: "Solucan", why: "Solucan kendi başına yayılır." },
      { q: "Faydalı bir program gibi görünüp içinde zararlı yük taşıyan yazılım hangisidir?", options: ["Truva atı", "Solucan", "Botnet", "Rootkit"], answer: "Truva atı", why: "Meşru görünümü ile kullanıcıyı kandırır." },
      { q: "Fidye yazılımına karşı en etkili önlem hangisidir?", options: ["Çevrimdışı yedek ve düzenli test", "Parolayı sık değiştirmek", "Ekran koruyucu", "Ağı yavaşlatmak"], answer: "Çevrimdışı yedek ve düzenli test", why: "Temiz yedek, fidye ödemeden geri dönüşü sağlar." },
      { q: "3-2-1 yedekleme kuralında '1' neyi ifade eder?", options: ["Bir kopya çevrimdışı ya da uzakta", "Bir kullanıcı", "Bir gün", "Bir sunucu"], answer: "Bir kopya çevrimdışı ya da uzakta", why: "3 kopya, 2 farklı ortam, 1 tanesi uzak/çevrimdışı." }
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
        "ARP spoofing: yerel ağda sahte ARP cevabıyla trafiği kendine çeker. Savunma: DAI, port security.",
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
      { t: "warn", h: "Tuzak", text: "Password spraying ile brute force karıştırılır: brute force bir hesaba çok parola dener, spraying çok hesaba az parola dener." }
    ],
    quiz: [
      { q: "Yerel ağda sahte ARP cevaplarıyla trafiği saldırganın üzerinden geçirmek hangisidir?", options: ["ARP spoofing", "DNS poisoning", "SYN flood", "Replay"], answer: "ARP spoofing", why: "Sahte ARP cevabıyla MAC-IP eşlemesi bozulur." },
      { q: "Çok sayıda hesapta birkaç yaygın parolayı denemek hangisidir?", options: ["Password spraying", "Brute force", "Replay", "MITM"], answer: "Password spraying", why: "Hesap kilitlemeye takılmadan geniş ölçekte denenir." },
      { q: "Rogue DHCP sunucusuna karşı switch'te hangi özellik kullanılır?", options: ["DHCP snooping", "STP", "NAT", "PoE"], answer: "DHCP snooping", why: "Sadece güvenilir portlardan DHCP cevaplarına izin verir." },
      { q: "SYN flood hangi tür saldırıdır?", options: ["Protokol tabanlı DoS", "Parola saldırısı", "Sosyal mühendislik", "MITM"], answer: "Protokol tabanlı DoS", why: "TCP bağlantı tablosunu yarım bağlantılarla doldurur." }
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
    hook: "Uygulama saldırılarında saldırgan formdaki bir kutuyu bile komut yazma yerine çevirebilir. Kök neden: girdiye körü körüne güvenmek.",
    homework: "OWASP Top 10 listesine bak ve her maddeyi tek cümleyle kendi kelimelerinle yaz. En çok merak ettiğin ikisini seç.",
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
      { t: "cmd", text: "# Savunmasız:   SELECT * FROM users WHERE name = '" + "$girdi" + "'\n# Girdi:         ' OR '1'='1\n# Sonuç:        tüm kullanıcılar döner\n\n# Güvenli (parametreli):\n# SELECT * FROM users WHERE name = ?   -- değer sorgudan ayrı gönderilir" },
      { t: "box", h: "Ortak kök", text: "Hepsinde veri ile komutun karışması vardır. Çözüm ortak: girdiyi doğrula, çıktıyı encode et, parametreli arayüz kullan, en az yetki ver." },
      { t: "steps", h: "Güvenli yazılım yöntemleri", items: [
        "Girdi doğrulama (beyaz liste) ve çıktı kodlama.",
        "Statik kod analizi (SAST), dinamik test (DAST), bağımlılık taraması.",
        "WAF (web uygulaması güvenlik duvarı) ek katman olur, asıl çözümün yerine geçmez.",
        "Sır (parola, anahtar) kodda tutulmaz."
      ] },
      { t: "warn", h: "Tuzak", text: "WAF, hatalı kodu düzeltmez. Asıl çözüm kodda; WAF geçici ve ek bir korumadır." }
    ],
    quiz: [
      { q: "SQL injection'a karşı en etkili savunma hangisidir?", options: ["Parametreli sorgu", "Sadece WAF", "Parolayı uzatmak", "HTTPS kullanmak"], answer: "Parametreli sorgu", why: "Veri sorgudan ayrı gönderildiği için komut olarak yorumlanmaz." },
      { q: "Başka kullanıcıların tarayıcısında çalışan zararlı JavaScript hangi saldırıdır?", options: ["XSS", "CSRF", "SSRF", "Buffer overflow"], answer: "XSS", why: "Cross-Site Scripting, zararlı betiği sayfaya yerleştirir." },
      { q: "Kullanıcının açık oturumunu kullanarak istemeden işlem yaptırma hangisidir?", options: ["CSRF", "XSS", "Path traversal", "Replay"], answer: "CSRF", why: "Cross-Site Request Forgery, oturum çerezine güvenir. CSRF token önler." },
      { q: "../../etc/passwd gibi bir girdi hangi saldırıya işaret eder?", options: ["Path traversal", "SQL injection", "XSS", "DDoS"], answer: "Path traversal", why: "Dizin atlayarak izinsiz dosyaya erişmeye çalışır." }
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
      { t: "warn", h: "Tuzak", text: "Zafiyet taraması ile sızma testi aynı şey değildir. Tarama bulur ve listeler; sızma testi insanla bulguları zincirleyip gerçek etkiyi gösterir. Yanlış pozitifleri (false positive) tarama sonrası doğrulaman gerekir." }
    ],
    quiz: [
      { q: "Üreticinin henüz bilmediği ve yaması olmayan zafiyet nasıl adlandırılır?", options: ["Zero-day", "End-of-life", "Misconfiguration", "False positive"], answer: "Zero-day", why: "Zero-day için yama yoktur; telafi edici kontroller gerekir." },
      { q: "Zafiyetin şiddetini 0-10 arası puanlayan sistem hangisidir?", options: ["CVSS", "CVE", "SIEM", "DLP"], answer: "CVSS", why: "CVSS şiddet puanıdır, CVE ise kimlik." },
      { q: "Varsayılan parolanın değiştirilmemesi hangi zafiyet türüdür?", options: ["Yapılandırma hatası", "Zero-day", "Buffer overflow", "Tedarik zinciri"], answer: "Yapılandırma hatası", why: "Yazılımın kendisi değil, kurulum ayarı zayıftır." },
      { q: "Tarayıcının bulduğu ama gerçekte olmayan bir bulguya ne denir?", options: ["False positive", "False negative", "Zero-day", "Exploit"], answer: "False positive", why: "Sahte alarm; doğrulama gerekir." }
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
    quiz: [
      { q: "İnternete açık web sunucusu hangi bölgeye yerleştirilir?", options: ["DMZ", "Yönetim ağı", "Kullanıcı ağı", "Air gap"], answer: "DMZ", why: "DMZ, dışarıdan erişilen servisleri iç ağdan ayırır." },
      { q: "Segmentasyonun temel güvenlik faydası nedir?", options: ["Saldırının yayılmasını sınırlar", "İnterneti hızlandırır", "Parolayı güçlendirir", "Lisans maliyetini düşürür"], answer: "Saldırının yayılmasını sınırlar", why: "Bir bölge ele geçirilse bile diğerlerine yatay hareket zorlaşır." },
      { q: "Kritik bir sistemi ağdan fiziksel olarak tamamen ayırmak hangisidir?", options: ["Air gap", "DMZ", "VLAN", "NAT"], answer: "Air gap", why: "Hava boşluğu, sistemin hiçbir ağa bağlı olmaması anlamına gelir." },
      { q: "Switch portuna izinsiz cihaz bağlanmasını engelleyen standart hangisidir?", options: ["802.1X", "NTP", "SNMP", "DHCP"], answer: "802.1X", why: "Port tabanlı kimlik doğrulama sağlar." }
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

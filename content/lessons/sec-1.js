/* Siber güvenlik (Security+ SY0-701 temelli) · sabit dersler 1-6 */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).sec = (window.PP_LESSONS.sec || {}));
  var CT = { title: "CompTIA Security+ sınav hedefleri (SY0-701)", url: "https://www.comptia.org/certifications/security" };
  var PM = { title: "Professor Messer: Security+ SY0-701 (ücretsiz video kursu)", url: "https://www.professormesser.com/", type: "video", length: "Çok bölümlü", level: "başlangıç", lang: "EN" };
  var NISTG = { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", type: "doc", level: "orta", lang: "EN" };
  var CISA = { title: "CISA: Secure Our World (temel güvenlik alışkanlıkları)", url: "https://www.cisa.gov/secure-our-world", type: "doc", level: "başlangıç", lang: "EN" };
  function res(a, why) { var o = {}; for (var k in a) o[k] = a[k]; o.why = why; return o; }

  /* 1 ───────────────────────────────────────────── CIA Üçlüsü */
  L[1] = {
    hook: "Güvenlik üç soruyla başlar: Bilgi başkasının eline geçti mi? Değişti mi? Gerektiğinde ulaşabiliyor muyum?",
    homework: "Kendi telefonundaki 3 uygulamayı seç. Her biri için hangi CIA öğesinin senin için en kritik olduğunu yaz (ör. banka: gizlilik, not uygulaması: erişilebilirlik).",
    warmup: {
      recap: [{ point: "Bu ilk ders. Şu ana kadarki ağ bilgin (IP, switch, router) güvenlik konularında temel olacak.", example: "Ağ bilgisi + güvenlik = ağ güvenliği" }],
      concepts: [
        { term: "Gizlilik (Confidentiality)", tr: "Yetkisiz kişi görmesin", summary: "Bilgiye sadece yetkili kişiler ulaşır.", example: "Maaş listesini sadece İK görür" },
        { term: "Bütünlük (Integrity)", tr: "Bilgi izinsiz değişmesin", summary: "Verinin doğru ve değiştirilmemiş olması.", example: "Faturadaki IBAN'ın değişmemesi" },
        { term: "Erişilebilirlik (Availability)", tr: "Gerektiğinde ulaşılsın", summary: "Sistem ve veri ihtiyaç anında kullanılabilir olur.", example: "Web sitesi saldırıda çökmez" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Yönetici sorar: 'Fidye yazılımı bize ne yapabilir?' Cevap tek cümlede CIA ile verilir: dosyaları şifreleyip erişilebilirliği, çaldığı verileri sızdırıp gizliliği bozar. Güvenlikte her olayı bu üç gözlükle okursun." },
      { t: "h", text: "CIA Üçlüsü" },
      { t: "steps", h: "Üç hedef", items: [
        "Gizlilik (Confidentiality): bilgiyi yetkisizlerden saklamak. Araçlar: şifreleme, erişim kontrolü, MFA.",
        "Bütünlük (Integrity): bilgi izinsiz değişmesin ya da değişirse fark edilsin. Araçlar: hash, dijital imza, sürüm kontrolü.",
        "Erişilebilirlik (Availability): sistemler gerektiğinde çalışsın. Araçlar: yedekleme, yedek (redundancy) sistemler, DDoS koruması."
      ] },
      { t: "box", h: "Ek kavramlar", text: "AAA: Authentication (kimsin?), Authorization (ne yapabilirsin?), Accounting (ne yaptın, kayıt). Non-repudiation (inkâr edememe): işlemi yapan sonradan 'ben yapmadım' diyemez; dijital imza ve loglar bunu sağlar." },
      { t: "steps", h: "Olayı CIA ile oku", items: [
        "Laptop çalındı, disk şifreli değil → gizlilik ihlali.",
        "Biri veritabanında fiyatları değiştirdi → bütünlük ihlali.",
        "DDoS ile site 3 saat açılmadı → erişilebilirlik ihlali.",
        "Fidye yazılımı dosyaları şifreledi ve veriyi sızdırdı → erişilebilirlik + gizlilik."
      ] },
      { t: "warn", h: "Tuzak", text: "Üçü her zaman aynı anda maksimum olmaz. Çok sıkı erişim kontrolü gizliliği artırır ama erişilebilirliği düşürür. Güvenlik, riske göre denge kurmaktır." }
    ],
    objectives: [
      { id: "h1", text: "Bir güvenlik olayında hangi hedefin (gizlilik, bütünlük, erişilebilirlik) bozulduğunu söyleyerek olayı CIA üçlüsüne göre sınıflandırabilirsin." },
      { id: "h2", text: "AAA'nın üç bileşenini (authentication, authorization, accounting) ve her birinin sorduğu soruyu ayırt edebilirsin." },
      { id: "h3", text: "İnkâr edememe (non-repudiation) kavramını açıklayıp ona katkı veren araçları (dijital imza, log) sayabilirsin." }
    ],
    summary: [
      "CIA üçlüsü: gizlilik (yetkisizler okuyamasın), bütünlük (izinsiz değişmesin ya da fark edilsin), erişilebilirlik (gerektiğinde çalışsın).",
      "Bir olayı okurken sor: kim gördü (gizlilik), ne değişti (bütünlük), ne çalışmaz oldu (erişilebilirlik).",
      "AAA: authentication \"kimsin?\", authorization \"ne yapabilirsin?\", accounting \"ne yaptın?\" sorusunu cevaplar.",
      "İnkâr edememe, işlemi yapanın sonradan \"ben yapmadım\" diyememesidir; dijital imza ve loglar sağlar.",
      "Üçü aynı anda maksimum olmaz; güvenlik riske göre denge kurmaktır."
    ],
    quiz: [
      { q: "Bir çalışan müşteri tablosundaki bir fiyatı izinsiz değiştirdi. Hangi güvenlik hedefi bozuldu?", options: ["Bütünlük", "Gizlilik", "Erişilebilirlik", "İnkâr edememe"], answer: "Bütünlük", why: "Verinin yetkisiz değişmesi bütünlük ihlalidir.", obj: "h1", whyNot: { "Gizlilik": "Gizlilik verinin yetkisizlerce okunmasıyla ilgilidir; burada veri okunmadı, değiştirildi.", "Erişilebilirlik": "Veri hâlâ erişilebilir durumda; sorun içeriğinin izinsiz değişmesi.", "İnkâr edememe": "İnkâr edememe, işlemi yapanın sonradan \"ben yapmadım\" diyememesidir ve CIA hedeflerinden biri değildir." } },
      { q: "DDoS saldırısıyla bir web sitesi saatlerce kapalı kaldı. Etkilenen hedef hangisi?", options: ["Erişilebilirlik", "Gizlilik", "Bütünlük", "Kimlik doğrulama"], answer: "Erişilebilirlik", why: "Sistem gerektiğinde kullanılamadığı için erişilebilirlik bozulmuştur.", obj: "h1", whyNot: { "Gizlilik": "DDoS veriyi okumaz ya da çalmaz; gizlilik bozulmadı.", "Bütünlük": "Veri değişmedi; yalnızca sisteme ulaşılamadı.", "Kimlik doğrulama": "Kimlik doğrulama, kullanıcının kim olduğunu doğrulama sürecidir. DDoS onu değil, hizmetin ayakta kalmasını hedefler." } },
      { q: "'Kimsin?' sorusuna cevap veren AAA bileşeni hangisidir?", options: ["Authentication", "Authorization", "Accounting", "Availability"], answer: "Authentication", why: "Kimlik doğrulama (authentication) kimlik iddiasını doğrular.", obj: "h2", whyNot: { "Authorization": "Authorization \"ne yapabilirsin?\" sorusunu cevaplar ve kimlik doğrulandıktan sonra gelir.", "Accounting": "Accounting \"ne yaptın?\" diye kayıt tutar; kimlik iddiasını doğrulamaz.", "Availability": "Availability AAA'nın değil CIA üçlüsünün bileşenidir; sistemin gerektiğinde çalışmasıdır." } },
      { q: "Dijital imza ve log kayıtları en çok hangi kavrama katkı sağlar?", options: ["İnkâr edememe (non-repudiation)", "Yedekleme", "Ağ segmentasyonu", "Şifre sıfırlama"], answer: "İnkâr edememe (non-repudiation)", why: "İşlemi yapanın sonradan inkâr etmesini zorlaştırır.", obj: "h3", whyNot: { "Yedekleme": "Yedekleme veri kaybına karşı erişilebilirliği korur; kimin ne yaptığını kanıtlamaz.", "Ağ segmentasyonu": "Segmentasyon saldırının yayılmasını sınırlar; işlemi yapanı kanıtlamaz.", "Şifre sıfırlama": "Şifre sıfırlama hesaba yeniden erişim verir; işlemi kimin yaptığına dair kanıt üretmez." } }
    ],
    interview: [
      { q: "CIA üçlüsü nedir?", a: "Gizlilik, bütünlük ve erişilebilirlik. Gizlilik yetkisiz erişimi engeller, bütünlük verinin izinsiz değişmesini önler, erişilebilirlik sistemin gerektiğinde çalışmasını sağlar. Her güvenlik olayını bu üçüne göre sınıflandırırım." },
      { q: "Fidye yazılımı CIA'nın hangi öğelerini etkiler?", a: "Dosyaları şifrelediği için erişilebilirliği, modern saldırılarda veriyi sızdırdığı için gizliliği etkiler. Veriyi değiştirirse bütünlüğü de etkileyebilir." }
    ],
    vocab: [
      { term: "Confidentiality", tr: "gizlilik", ex: "Encryption protects confidentiality." },
      { term: "Integrity", tr: "bütünlük", ex: "Hashes check integrity." },
      { term: "Availability", tr: "erişilebilirlik", ex: "Backups improve availability." },
      { term: "Non-repudiation", tr: "inkâr edememe", ex: "Digital signatures provide non-repudiation." },
      { term: "Breach", tr: "ihlal / sızıntı", ex: "The data breach was reported." }
    ],
    resources: [
      res(PM, "CIA ve temel kavramlar ücretsiz videoda"),
      res(CISA, "Günlük hayattan basit güvenlik alışkanlıkları")
    ],
    sources: [CT]
  };

  /* 2 ───────────────────────────────────────────── Kontrol türleri */
  L[2] = {
    hook: "Kapıdaki kilit, kamera, kural ve güvenlik görevlisi: hepsi 'kontrol'tür, sadece görevleri farklıdır.",
    homework: "Ofisindeki ya da evindeki 6 güvenlik önlemini listele (kilit, kamera, parola kuralı, antivirüs...). Her birine hem 'kategori' hem 'işlev' etiketi ver.",
    warmup: {
      recap: [{ point: "CIA üçlüsü güvenliğin hedefidir; kontroller bu hedefleri korur.", example: "MFA gizliliği korur" }],
      concepts: [
        { term: "Önleyici (preventive)", tr: "Olmadan engeller", summary: "Saldırı gerçekleşmeden durdurur.", example: "Güvenlik duvarı, kilit" },
        { term: "Dedektif (detective)", tr: "Olunca fark eder", summary: "Olayı tespit eder.", example: "Log izleme, kamera" },
        { term: "Düzeltici (corrective)", tr: "Olay sonrası düzeltir", summary: "Zararı onarır.", example: "Yedekten geri yükleme" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Denetçi 'Elinizde hangi kontroller var, hangi boşluk açık?' diye soruyor. Kontrolleri sınıflandırmak, neyin eksik olduğunu görmenin ilk adımıdır: sadece önleyici varsa, saldırı olduğunu fark etmezsin." },
      { t: "h", text: "İki eksen: kategori ve işlev" },
      { t: "steps", h: "Kategoriler (kim/ne uyguluyor?)", items: [
        "Teknik (technical): yazılım ve donanımla uygulanır. Güvenlik duvarı, şifreleme, antivirüs.",
        "Yönetimsel (managerial): politika ve süreçler. Risk değerlendirmesi, güvenlik politikası.",
        "Operasyonel (operational): insanlar uygular. Güvenlik görevlisi, eğitim, olay müdahale prosedürü.",
        "Fiziksel (physical): kilit, çit, kamera, bariyer."
      ] },
      { t: "steps", h: "İşlevler (ne işe yarıyor?)", items: [
        "Önleyici (preventive): olmadan engeller. Güvenlik duvarı, MFA, kapı kilidi.",
        "Caydırıcı (deterrent): vazgeçirir. 'Kamera var' tabelası, uyarı afişi.",
        "Dedektif (detective): fark eder. Log analizi, IDS, hareket sensörü.",
        "Düzeltici (corrective): sonrasında düzeltir. Yedekten dönme, yama.",
        "Telafi edici (compensating): asıl kontrol uygulanamazken yerine konan. Eski sistem yamalanamıyorsa ağdan izole etmek.",
        "Yönlendirici (directive): ne yapılacağını söyler. Politikalar, kabul edilebilir kullanım kuralı."
      ] },
      { t: "box", h: "Örnek eşleme", text: "Kapı kartı okuyucusu: kategori fiziksel/teknik, işlev önleyici. Kamera: fiziksel, dedektif (ve caydırıcı). SIEM alarmı: teknik, dedektif. Güvenlik eğitimi: operasyonel, önleyici." },
      { t: "warn", h: "Tuzak", text: "Sınavda aynı kontrol birden çok işlev taşıyabilir (kamera hem caydırıcı hem dedektif). Soru 'en iyi' hangisi diyorsa sorunun vurguladığı işleve bak." }
    ],
    objectives: [
      { id: "h1", text: "Bir kontrolü kategorisine (teknik, yönetimsel, operasyonel, fiziksel) yerleştirebilirsin." },
      { id: "h2", text: "Bir kontrolün işlevini (önleyici, caydırıcı, dedektif, düzeltici, telafi edici) söyleyebilirsin." }
    ],
    summary: [
      "Kontroller iki eksende okunur: kategori (kim ya da ne uyguluyor: teknik, yönetimsel, operasyonel, fiziksel) ve işlev (ne işe yarıyor).",
      "İşlevler: önleyici engeller, caydırıcı vazgeçirir, dedektif fark eder, düzeltici sonradan düzeltir, telafi edici asıl kontrolün yerini tutar, yönlendirici (directive) politika ve kurallarla davranışı yönlendirir.",
      "Aynı kontrol birden çok işlev taşıyabilir (kamera: caydırıcı ve dedektif); soru hangi işlevi vurguluyorsa ona bak.",
      "Yalnız önleyici kontrol varsa saldırı olduğunu fark etmezsin; dedektif katman şarttır."
    ],
    quiz: [
      { q: "Yamalanamayan eski bir sunucuyu ayrı bir ağa taşımak hangi kontrol işlevidir?", options: ["Telafi edici", "Caydırıcı", "Düzeltici", "Yönlendirici"], answer: "Telafi edici", why: "Asıl kontrol (yama) uygulanamadığı için yerine konan alternatif önlemdir.", obj: "h2", whyNot: { "Caydırıcı": "Caydırıcı kontrol saldırganı vazgeçirmeye çalışır. Burada yama yapılamadığı için yerine bir önlem konuyor, caydırma amacı yok.", "Düzeltici": "Düzeltici kontrol olaydan sonra durumu düzeltir (yama, yedekten dönme). Burada olay yok; yamanın yerine alternatif bir önlem konuyor.", "Yönlendirici": "Yönlendirici (directive) kontrol politika ve kurallarla davranışı yönlendirir. Yamalanamayan sunucuyu izole etmek ise asıl kontrolün yerini tuttuğu için telafi edicidir." } },
      { q: "Log analizi ve IDS hangi işlev grubuna girer?", options: ["Dedektif", "Önleyici", "Caydırıcı", "Düzeltici"], answer: "Dedektif", why: "Olayı fark etmeye yarar.", obj: "h2", whyNot: { "Önleyici": "Önleyici kontrol olayı gerçekleşmeden engeller (güvenlik duvarı, MFA). Log analizi ve IDS olayı fark etmeye yarar.", "Caydırıcı": "Caydırıcı kontrol vazgeçirmeye yöneliktir (tabela, uyarı). Log analizi ve IDS vazgeçirmez, fark eder.", "Düzeltici": "Düzeltici kontrol olaydan sonra düzeltir; log ve IDS yalnızca olayı görünür kılar, düzeltmez." } },
      { q: "Güvenlik politikası ve risk değerlendirmesi hangi kategoridedir?", options: ["Yönetimsel", "Teknik", "Fiziksel", "Operasyonel"], answer: "Yönetimsel", why: "Yönetimsel kontroller politika, süreç ve risk yönetimi gibi yönetim araçlarıdır.", obj: "h1", whyNot: { "Teknik": "Teknik kontrol yazılım ya da donanımla uygulanır (güvenlik duvarı, şifreleme); politika ve risk değerlendirmesi ise belge ve süreçtir.", "Fiziksel": "Fiziksel kontroller kilit, çit, kamera gibi somut önlemlerdir; politika ve risk değerlendirmesi ise belge ve süreçtir, dokunulabilir bir engel değildir.", "Operasyonel": "Operasyonel kontrol insanların uyguladığı günlük işlerdir (güvenlik görevlisi, eğitim). Politika yazmak ve riski değerlendirmek yönetimin işidir." } },
      { q: "'Bu alan kamerayla izlenmektedir' tabelasının ana işlevi nedir?", options: ["Caydırıcı", "Düzeltici", "Dedektif", "Telafi edici"], answer: "Caydırıcı", why: "Saldırganı vazgeçirmeye yöneliktir.", obj: "h2", whyNot: { "Düzeltici": "Tabela hiçbir şeyi düzeltmez; olaydan sonra devreye girmez.", "Dedektif": "Tabela olayı fark etmez. Kamera dedektif olabilir ama tabelanın ana işlevi caydırmaktır.", "Telafi edici": "Telafi edici kontrol, asıl kontrol uygulanamazken yerine konan önlemdir; tabelada böyle bir durum yok." } }
    ],
    interview: [
      { q: "Güvenlik kontrolü türlerini anlat.", a: "Kategoriler teknik, yönetimsel, operasyonel ve fiziksel. İşlevler önleyici, caydırıcı, dedektif, düzeltici, telafi edici ve yönlendirici. İyi bir güvenlik programı sadece önleyiciye değil, tespit ve düzeltmeye de yatırım yapar." },
      { q: "Telafi edici kontrol örneği ver.", a: "Eski bir cihaz yamalanamıyorsa onu ayrı VLAN'a koyup erişimi sadece gerekli adreslerle sınırlandırmak. Asıl kontrol (yama) yerine ikinci bir önlem alınmış olur." }
    ],
    vocab: [
      { term: "Preventive", tr: "önleyici", ex: "A firewall is preventive." },
      { term: "Detective", tr: "tespit edici", ex: "Logs are detective controls." },
      { term: "Deterrent", tr: "caydırıcı", ex: "A warning sign is a deterrent." },
      { term: "Compensating", tr: "telafi edici", ex: "We added a compensating control." },
      { term: "Policy", tr: "politika", ex: "Read the security policy." }
    ],
    resources: [
      res(PM, "Kontrol türleri bölümü"),
      res(NISTG, "Kontrollerin çerçevede nasıl düzenlendiği")
    ],
    sources: [CT]
  };

  /* 3 ───────────────────────────────────────────── Hash */
  L[3] = {
    hook: "Hash bir verinin parmak izidir: aynı veri aynı izi verir, tek harf değişirse iz tamamen değişir.",
    homework: "Bir metin dosyasının SHA-256 değerini al (Windows: certutil -hashfile dosya.txt SHA256; Linux/Mac: sha256sum dosya.txt). Dosyaya bir harf ekle ve hash'in nasıl değiştiğini gör.",
    warmup: {
      recap: [{ point: "Bütünlük, verinin izinsiz değişmemesidir.", example: "Hash bütünlüğü kontrol eder" }],
      concepts: [
        { term: "Hash", tr: "Veri parmak izi", summary: "Veriyi sabit uzunlukta özete çevirir; geri çevrilemez.", example: "SHA-256 çıktısı 64 hex karakterdir" },
        { term: "Çakışma (collision)", tr: "İki veri aynı hash", summary: "İki farklı verinin aynı hash'i vermesi. İyi algoritmada pratikte olmaz.", example: "MD5'te çakışma üretilebildi" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "İndirdiğin yazılımın sitesinde 'SHA-256: 9f86d0...' yazıyor. İndirdiğin dosyanın değiştirilmediğini nasıl anlarsın? Hash'i hesaplayıp karşılaştırırsın. Parolalar da düz metin yerine hash olarak saklanır." },
      { t: "h", text: "Hash nedir?" },
      { t: "p", text: "Hash fonksiyonu, herhangi bir uzunluktaki veriyi sabit uzunlukta bir çıktıya (özet, digest) çevirir. Tek yönlüdür: hash'ten asıl veriyi geri çıkaramazsın. Aynı girdi her zaman aynı çıktıyı verir. Girdideki küçük bir değişiklik çıktıyı tamamen değiştirir (avalanche etkisi)." },
      { t: "steps", h: "Yaygın algoritmalar", items: [
        "MD5 (128 bit): kırık sayılır, çakışma üretilebilir. Güvenlik amacıyla kullanma.",
        "SHA-1 (160 bit): zayıf kabul edilir, yeni kullanımda önerilmez.",
        "SHA-256 / SHA-3: günümüzde güvenli kabul edilir."
      ] },
      { t: "steps", h: "Hash nerede kullanılır?", items: [
        "Dosya bütünlüğü: indirilen dosyanın hash'ini yayımlanan değerle karşılaştır.",
        "Parola saklama: sistem parolanın hash'ini saklar, girişte yeni hash'i karşılaştırır.",
        "Dijital imza: belgenin hash'i imzalanır.",
        "Log bütünlüğü: kayıtların zincirleme hash'i ile değiştirilmesi fark edilir."
      ] },
      { t: "box", h: "Salt ve yavaş hash", text: "Aynı parola aynı hash'i verir; saldırgan hazır tablolarla (rainbow table) eşleştirir. Salt, her kullanıcıya eklenen rastgele değerdir ve bu tabloları işe yaramaz yapar. Parola için hızlı SHA-256 yerine bilerek yavaş olan bcrypt, scrypt, Argon2 ya da PBKDF2 kullanılır." },
      { t: "cmd", lang: "cmd", calistirma: "atla Windows komut satırı (Linux/macOS komutlarıyla karışık olabilir); bu ortamda çalıştırılmaz", text: "# Windows\ncertutil -hashfile dosya.txt SHA256\n\n# Linux / macOS\nsha256sum dosya.txt\nshasum -a 256 dosya.txt" },
      { t: "warn", h: "Tuzak", text: "Hash şifreleme değildir. Şifrelemenin anahtarla geri döndürülebilmesi vardır, hash'in yoktur. 'Parolayı hash'ledik, şifreledik' demek yanlıştır." }
    ],
    objectives: [
      { id: "h1", text: "Hash'in temel özelliklerini (tek yönlü, sabit uzunluklu çıktı, küçük değişiklikte tamamen değişen sonuç) söyleyebilirsin." },
      { id: "h2", text: "İndirilen bir dosyanın bütünlüğünü hash'i yayımlanan değerle karşılaştırarak kontrol edebilirsin." },
      { id: "h3", text: "Parola saklamada salt'ın ve bilerek yavaş algoritmaların neden gerektiğini açıklayıp MD5'ten neden kaçınıldığını söyleyebilirsin." }
    ],
    summary: [
      "Hash herhangi bir veriyi sabit uzunlukta özete çevirir; tek yönlüdür, aynı girdi aynı çıktıyı verir, küçük değişiklik çıktıyı tamamen değiştirir.",
      "Dosya bütünlüğünü, hesapladığın hash'i yayımlanan değerle karşılaştırarak kontrol edersin.",
      "MD5 ve SHA-1 güvenlik amacıyla kullanılmamalı; SHA-256 ve SHA-3 güvenli kabul edilir.",
      "Parolada salt, aynı parolaların aynı hash'i vermesini ve hazır tabloları engeller; hızlı SHA yerine bcrypt, scrypt, Argon2 ya da PBKDF2 kullan.",
      "Hash şifreleme değildir: geri döndürülemez ve anahtarı yoktur."
    ],
    quiz: [
      { q: "Hash fonksiyonunun temel özelliği hangisidir?", options: ["Tek yönlüdür, geri çevrilemez", "Anahtarla geri çözülür", "Çıktı uzunluğu girdiyle büyür", "Sadece metinde çalışır"], answer: "Tek yönlüdür, geri çevrilemez", why: "Hash'ten asıl veri geri elde edilemez; amaç doğrulamadır.", obj: "h1", whyNot: { "Anahtarla geri çözülür": "Anahtarla geri çözülebilmek şifrelemenin özelliğidir; hash'in geri dönüşü yoktur.", "Çıktı uzunluğu girdiyle büyür": "Hash çıktısı sabit uzunluktadır: tek harf de büyük bir dosya da aynı uzunlukta özet verir (SHA-256 için 256 bit).", "Sadece metinde çalışır": "Hash her tür veriye uygulanır: dosya, görüntü, program ya da parola." } },
      { q: "İndirilen dosyanın değişmediğini nasıl kontrol edersin?", options: ["Hash'i hesaplayıp yayımlananla karşılaştırırım", "Dosyayı şifrelerim", "Dosyayı zip'lerim", "Boyutuna bakarım"], answer: "Hash'i hesaplayıp yayımlananla karşılaştırırım", why: "Hash farklıysa dosya değişmiştir (bütünlük kontrolü).", obj: "h2", whyNot: { "Dosyayı şifrelerim": "Şifrelemek dosyayı gizler ama orijinalle aynı olup olmadığını söylemez; doğrulama için yayımlanmış bir referans hash gerekir.", "Dosyayı zip'lerim": "Zip'lemek dosyayı sıkıştırır; içeriğinin değiştirilip değiştirilmediği sorusuna cevap vermez.", "Boyutuna bakarım": "Boyutu aynı kalacak biçimde değiştirilmiş bir dosya olabilir; tek baytlık fark hash'i tamamen değiştirir, boyutu değiştirmeyebilir." } },
      { q: "Parola hash'lerinde 'salt' neden kullanılır?", options: ["Aynı parolaların aynı hash'i vermesini ve rainbow table'ı engellemek için", "Hash'i kısaltmak için", "Parolayı şifrelemek için", "Giriş hızını artırmak için"], answer: "Aynı parolaların aynı hash'i vermesini ve rainbow table'ı engellemek için", why: "Salt her kullanıcı için farklı rastgele değerdir.", obj: "h3", whyNot: { "Hash'i kısaltmak için": "Salt hash'i kısaltmaz; girdiye eklenen rastgele bir değerdir, çıktı uzunluğu aynı kalır.", "Parolayı şifrelemek için": "Salt şifreleme yapmaz; aynı parolaların farklı hash üretmesini sağlar.", "Giriş hızını artırmak için": "Amaç hız değil. Parola hash'lerinde bilerek yavaş algoritmalar seçilir ki kaba kuvvet denemeleri zorlaşsın." } },
      { q: "Aşağıdakilerden hangisi artık güvenlik amacıyla önerilmez?", options: ["MD5", "SHA-256", "SHA-3", "Argon2"], answer: "MD5", why: "MD5'te çakışma üretilebildiği için kırık sayılır.", obj: "h3", whyNot: { "SHA-256": "SHA-256 genel amaçlı hash (bütünlük, imza) için güvenli sayılır; yalnız parola saklamak için hızlı olduğundan yavaş algoritmalar tercih edilir.", "SHA-3": "SHA-3 güvenli kabul edilen yeni bir standarttır.", "Argon2": "Argon2, parola saklamak için önerilen ve bilerek yavaş çalışan bir algoritmadır." } }
    ],
    interview: [
      { q: "Hash ile şifreleme arasındaki fark nedir?", a: "Şifreleme anahtarla geri çözülebilir, gizliliği hedefler. Hash tek yönlüdür, geri çevrilemez ve bütünlük kontrolü ya da parola doğrulama için kullanılır." },
      { q: "Parolalar nasıl saklanmalı?", a: "Düz metin değil, salt eklenmiş ve bilerek yavaş bir algoritmayla (bcrypt, scrypt, Argon2, PBKDF2) hash'lenerek saklanmalı." }
    ],
    vocab: [
      { term: "Hash", tr: "özet / parmak izi", ex: "Compare the hash values." },
      { term: "Digest", tr: "özet çıktısı", ex: "The digest is 256 bits." },
      { term: "Salt", tr: "tuz (rastgele ek)", ex: "Add a unique salt." },
      { term: "Collision", tr: "çakışma", ex: "MD5 has known collisions." },
      { term: "Checksum", tr: "sağlama toplamı", ex: "Verify the checksum." }
    ],
    resources: [
      res(PM, "Hashing ve kriptografi bölümleri"),
      { title: "OWASP: Password Storage Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html", type: "doc", why: "Parolaların doğru saklanması için pratik rehber", level: "orta", lang: "EN" }
    ],
    sources: [CT]
  };

  /* 4 ───────────────────────────────────────────── Simetrik / asimetrik */
  L[4] = {
    hook: "Simetrik şifrelemede tek anahtar vardır, asimetrikte bir çift: biri kilitler, diğeri açar.",
    homework: "HTTPS ile açılan bir sitenin tarayıcıda kilit simgesine tıkla, sertifika bilgisine bak. Şifreleme algoritmasını ve sertifikayı kimin verdiğini not et.",
    warmup: {
      recap: [{ point: "Hash tek yönlüdür; şifreleme ise anahtarla geri çözülür.", example: "Hash ≠ şifreleme" }],
      concepts: [
        { term: "Simetrik şifreleme", tr: "Tek ortak anahtar", summary: "Aynı anahtar hem şifreler hem çözer. Hızlıdır.", example: "AES" },
        { term: "Asimetrik şifreleme", tr: "Anahtar çifti", summary: "Açık anahtar şifreler, özel anahtar çözer.", example: "RSA, ECC" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Yönetici dizüstü bilgisayarların diski için 'şifreleme' istiyor ve bir müşteriyle e-postayı güvenli paylaşmak istiyor. Disk için simetrik (AES), e-posta/anahtar paylaşımı için asimetrik mantık kullanılır. Hangisi nerede? Bu dersin konusu." },
      { t: "h", text: "Simetrik şifreleme" },
      { t: "p", text: "Aynı anahtar şifreler ve çözer. Hızlıdır, büyük veride (disk, dosya, VPN trafiği) kullanılır. Zorluğu anahtarı karşı tarafa güvenli ulaştırmaktır. Örnek: AES-128, AES-256. Eski DES ve 3DES artık kullanılmaz." },
      { t: "h", text: "Asimetrik şifreleme" },
      { t: "p", text: "Bir anahtar çifti vardır: açık anahtar (public) herkese verilir, özel anahtar (private) sadece sahibinde kalır. Açık anahtarla şifrelenen yalnızca özel anahtarla çözülür. Yavaştır, bu yüzden büyük veri için değil, anahtar değişimi ve imza için kullanılır. Örnek: RSA, ECC." },
      { t: "steps", h: "Ne için hangisi?", items: [
        "Gizlilik (başkası okuyamasın): alıcının açık anahtarıyla şifrele, alıcı kendi özel anahtarıyla çözer.",
        "Dijital imza (benden geldi): kendi özel anahtarınla imzala, herkes açık anahtarınla doğrular.",
        "HTTPS: asimetrikle oturum anahtarı anlaşılır, sonra hızlı simetrik şifreleme kullanılır (hibrit).",
        "Disk şifreleme (BitLocker): simetrik AES."
      ] },
      { t: "box", h: "Ezber kuralı", text: "Şifreli göndermek: alıcının açık anahtarı. İmzalamak: kendi özel anahtarın. Özel anahtar asla paylaşılmaz." },
      { t: "warn", h: "Tuzak", text: "'Açık anahtarla şifrele' ile 'özel anahtarla imzala' karıştırılır. İmza gizlilik sağlamaz, kimin yazdığını ve değişmediğini kanıtlar." }
    ],
    quiz: [
      { q: "Bir mesajı sadece Ayşe'nin okuması için hangi anahtarla şifrelersin?", options: ["Ayşe'nin açık anahtarı", "Kendi özel anahtarın", "Ayşe'nin özel anahtarı", "Kendi açık anahtarın"], answer: "Ayşe'nin açık anahtarı", why: "Açık anahtarla şifrelenen yalnızca ilgili özel anahtarla (Ayşe'de) çözülür." },
      { q: "Büyük bir diskin şifrelenmesi için en uygun yöntem hangisi?", options: ["Simetrik (AES)", "Asimetrik (RSA) ile tüm veriyi şifrelemek", "Hash", "Base64"], answer: "Simetrik (AES)", why: "Simetrik şifreleme hızlıdır; büyük veri için kullanılır." },
      { q: "Dijital imza oluşturmak için hangi anahtar kullanılır?", options: ["Gönderenin özel anahtarı", "Gönderenin açık anahtarı", "Alıcının özel anahtarı", "Ortak parola"], answer: "Gönderenin özel anahtarı", why: "Özel anahtarla imzalanır, açık anahtarla doğrulanır." },
      { q: "HTTPS bağlantısında genellikle ne olur?", options: ["Asimetrikle anahtar anlaşılır, veri simetrik şifrelenir", "Tüm veri RSA ile şifrelenir", "Sadece hash kullanılır", "Veri düz metin gider"], answer: "Asimetrikle anahtar anlaşılır, veri simetrik şifrelenir", why: "Hibrit yaklaşım hem güvenli anahtar değişimi hem hız sağlar." }
    ],
    interview: [
      { q: "Simetrik ve asimetrik şifreleme arasındaki fark nedir?", a: "Simetrikte tek ortak anahtar vardır, hızlıdır ama anahtar paylaşımı zordur. Asimetrikte açık ve özel anahtar çifti vardır, yavaştır ama anahtar paylaşımı ve imza sorununu çözer. Pratikte ikisi birlikte (HTTPS gibi) kullanılır." },
      { q: "Dijital imza ne sağlar?", a: "Mesajın kimden geldiğini (kimlik doğrulama), değişmediğini (bütünlük) ve gönderenin sonradan inkâr edememesini sağlar. İçeriği gizlemez." }
    ],
    vocab: [
      { term: "Symmetric", tr: "simetrik", ex: "AES is symmetric." },
      { term: "Asymmetric", tr: "asimetrik", ex: "RSA is asymmetric." },
      { term: "Public key", tr: "açık anahtar", ex: "Share your public key." },
      { term: "Private key", tr: "özel anahtar", ex: "Never share the private key." },
      { term: "Key exchange", tr: "anahtar değişimi", ex: "TLS starts with a key exchange." }
    ],
    resources: [
      res(PM, "Simetrik/asimetrik bölümleri"),
      { title: "Cloudflare Learning Center: Encryption nedir?", url: "https://www.cloudflare.com/learning/", type: "doc", why: "Şifrelemeyi görsellerle anlatan genel kaynak", level: "başlangıç", lang: "EN" }
    ],
    sources: [CT]
  };

  /* 5 ───────────────────────────────────────────── Sertifikalar ve PKI */
  L[5] = {
    hook: "Açık anahtar kime ait? Sertifika, güvenilir bir kurumun 'bu anahtar gerçekten bu siteye ait' diye attığı imzadır.",
    homework: "Tarayıcıda bankanın sitesine gir, kilit simgesinden sertifikayı aç: kimin adına verilmiş, kim vermiş, ne zaman bitiyor? Üç satır not al.",
    warmup: {
      recap: [{ point: "Asimetrikte açık anahtar herkese verilir; sorun, açık anahtarın gerçekten o kişiye ait olduğunu bilmektir.", example: "Sahte site kendi açık anahtarını verebilir" }],
      concepts: [
        { term: "Sertifika", tr: "Kimlik kartı", summary: "Bir açık anahtarı bir kimlikle bağlayan, CA'nın imzaladığı belge.", example: "X.509" },
        { term: "CA", tr: "Sertifika otoritesi", summary: "Sertifikaları imzalayan güvenilir kurum.", example: "Let's Encrypt, DigiCert" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Kullanıcı 'Bağlantınız gizli değil' uyarısı alıyor. Sertifikanın süresi dolmuş olabilir, ismi uymuyor olabilir ya da güvenilmeyen bir CA vermiş olabilir. PKI'ı bilen hızlıca neyin bozuk olduğunu bulur." },
      { t: "h", text: "PKI nedir?" },
      { t: "p", text: "PKI (Public Key Infrastructure), sertifikaları üreten, dağıtan ve iptal eden yapıdır. Bir sunucu sertifikası, site adını ve açık anahtarı içerir; CA tarafından dijital olarak imzalanmıştır. Tarayıcı, sertifikayı imzalayan CA'ya güvendiği için siteye güvenir." },
      { t: "steps", h: "Güven zinciri", items: [
        "Root CA: en tepedeki güvenilir kurum. Sertifikası işletim sistemi ve tarayıcıda hazır gelir.",
        "Intermediate CA: root'un imzaladığı ara kurum; günlük sertifikaları o imzalar.",
        "Sunucu (leaf) sertifikası: web sitesine verilir.",
        "Tarayıcı zinciri yukarı doğru doğrular; root'a kadar güven varsa kabul eder."
      ] },
      { t: "steps", h: "Sertifika yaşam döngüsü", items: [
        "CSR (Certificate Signing Request): sunucu anahtar çifti üretir, açık anahtarını CA'ya gönderir.",
        "CA kimliği doğrular ve sertifikayı imzalar.",
        "Süresi dolmadan yenilenir. Süresi dolan sertifika tarayıcı uyarısına yol açar.",
        "Anahtar sızarsa sertifika iptal edilir: CRL (iptal listesi) veya OCSP (anlık sorgu)."
      ] },
      { t: "box", h: "Self-signed ve wildcard", text: "Self-signed: kendi kendini imzalar, dışarıdan güvenilmez; test ve iç sistemlerde kullanılır. Wildcard (*.sirket.com): tek sertifika tüm alt alan adlarını kapsar, ama anahtar sızarsa hepsi risk altına girer." },
      { t: "warn", h: "Tuzak", text: "Sertifika siteyi 'güvenli' yapmaz, sadece kimliği ve şifrelemeyi doğrular. Kötü niyetli bir site de geçerli sertifika alabilir. Kilit simgesi 'bu site zararsız' demek değildir." }
    ],
    quiz: [
      { q: "Sertifikanın temel işlevi nedir?", options: ["Açık anahtarı bir kimlikle bağlamak", "Dosyaları sıkıştırmak", "Parolaları saklamak", "Ağ trafiğini hızlandırmak"], answer: "Açık anahtarı bir kimlikle bağlamak", why: "CA, anahtarın o kimliğe ait olduğunu imzasıyla doğrular." },
      { q: "Kullanıcı sertifika uyarısı alıyor ve sertifikanın bitiş tarihi geçmiş. En olası neden?", options: ["Sertifika yenilenmemiş", "DNS çalışmıyor", "Kablo kopuk", "Parola yanlış"], answer: "Sertifika yenilenmemiş", why: "Süresi dolan sertifika tarayıcıda uyarı üretir." },
      { q: "İptal edilmiş sertifikaları anlık sorgulamak için hangi mekanizma kullanılır?", options: ["OCSP", "CSR", "DHCP", "NTP"], answer: "OCSP", why: "OCSP sertifikanın durumunu anlık sorgular; CRL ise iptal listesidir." },
      { q: "Wildcard sertifikanın riski nedir?", options: ["Anahtar sızarsa tüm alt alan adları etkilenir", "Sadece tek siteyi kapsar", "Şifreleme yapmaz", "Süresi hiç dolmaz"], answer: "Anahtar sızarsa tüm alt alan adları etkilenir", why: "Tek sertifika birçok alt alan adını kapsadığı için etki alanı geniştir." }
    ],
    interview: [
      { q: "PKI nedir?", a: "Sertifikaları üreten, dağıtan, yenileyen ve iptal eden altyapıdır. Güven zinciri root CA'dan ara CA'ya ve sunucu sertifikasına uzanır. Tarayıcı zinciri doğrulayınca siteye güvenir." },
      { q: "Tarayıcıda sertifika hatası görürsen ne kontrol edersin?", a: "Bitiş tarihini, sertifikadaki alan adının siteyle uyuşup uyuşmadığını, zincirin eksik olup olmadığını ve cihazın saatinin doğru olup olmadığını kontrol ederim." }
    ],
    vocab: [
      { term: "Certificate", tr: "sertifika", ex: "The certificate has expired." },
      { term: "CA (Certificate Authority)", tr: "sertifika otoritesi", ex: "A trusted CA signed it." },
      { term: "CSR", tr: "sertifika imza talebi", ex: "Generate a CSR first." },
      { term: "Revoke", tr: "iptal etmek", ex: "Revoke the certificate." },
      { term: "Chain of trust", tr: "güven zinciri", ex: "The chain of trust is broken." }
    ],
    resources: [
      res(PM, "PKI ve sertifikalar bölümü"),
      { title: "Let's Encrypt: Nasıl çalışır?", url: "https://letsencrypt.org/how-it-works/", type: "doc", why: "Ücretsiz bir CA'nın otomatik sertifika süreci", level: "orta", lang: "EN" }
    ],
    sources: [CT]
  };

  /* 6 ───────────────────────────────────────────── Tehdit aktörleri */
  L[6] = {
    hook: "Saldırgan hep 'hacker' değildir: motivasyonu ve yeteneği farklı gruplar, farklı yöntemlerle gelir.",
    homework: "Bir haberden gerçek bir siber olay seç. Saldırganın türünü ve motivasyonunu tahmin et; neden öyle düşündüğünü iki cümleyle yaz.",
    warmup: {
      recap: [{ point: "Kontroller (önleyici, dedektif...) tehdide göre seçilir.", example: "İç tehdide karşı yetki sınırlama" }],
      concepts: [
        { term: "Tehdit aktörü", tr: "Saldırgan", summary: "Bir kuruma zarar verme ihtimali olan kişi ya da grup.", example: "Suç çetesi, devlet destekli grup" },
        { term: "Motivasyon", tr: "Saldırı sebebi", summary: "Para, siyaset, intikam, merak, casusluk.", example: "Fidye için saldırı" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Yönetim 'Bizi kim hedef alır?' diye soruyor. Küçük bir şirket için cevap çoğunlukla 'para peşindeki suç grupları ve içeriden bir hata'dır, devlet destekli gruplar değil. Doğru tehdit modeli, savunma bütçesini doğru yere harcatır." },
      { t: "h", text: "Başlıca tehdit aktörleri" },
      { t: "steps", h: "Aktör türleri", items: [
        "Organize suç grupları: para odaklı. Fidye yazılımı, dolandırıcılık. Kaynakları ve organizasyonu yüksektir.",
        "Devlet destekli (nation-state / APT): casusluk ve sabotaj. En yüksek kaynak, uzun süreli ve gizli saldırılar.",
        "Hacktivist: siyasi ya da ideolojik amaç. Web sitesi bozma, DDoS, veri sızdırma.",
        "İçeriden tehdit (insider): kasıtlı (intikam, para) ya da kazara (hatalı e-posta, yanlış paylaşım). Zaten yetkisi vardır.",
        "Script kiddie: hazır araçları kullanan, düşük yetenekli kişi.",
        "Gölge BT (shadow IT): resmî onay olmadan kullanılan araç ve hizmetler. Kötü niyet olmasa da risk yaratır."
      ] },
      { t: "steps", h: "Ayırt eden özellikler", items: [
        "Yetenek ve kaynak: devlet > organize suç > hacktivist > script kiddie.",
        "İç / dış: içerideki tehdit güvenlik duvarını zaten aşmıştır.",
        "Hedef: maddi kazanç, bilgi, itibar, kesinti."
      ] },
      { t: "box", h: "Tehdit vektörü", text: "Saldırganın içeri girdiği yol: e-posta (phishing), kaldırılabilir cihaz (USB), açık servis, tedarik zinciri, yazılım zafiyeti, sosyal medya, kablosuz ağ." },
      { t: "warn", h: "Tuzak", text: "Sınavda 'yetkili kullanıcı bilmeden zararlı dosya açtı' → bu kazara iç tehdittir. 'Çalışan intikam için veri sildi' → kasıtlı iç tehdit." }
    ],
    quiz: [
      { q: "Fidye yazılımıyla para kazanmayı hedefleyen, organize ve kaynaklı grup hangisidir?", options: ["Organize suç grubu", "Hacktivist", "Script kiddie", "Gölge BT"], answer: "Organize suç grubu", why: "Para odaklı ve organizedir." },
      { q: "Uzun süreli, gizli casusluk yürüten ve en yüksek kaynağa sahip aktör hangisidir?", options: ["Devlet destekli (APT)", "Script kiddie", "Hacktivist", "Kazara iç tehdit"], answer: "Devlet destekli (APT)", why: "APT devlet destekli, uzun süreli ve gizli operasyonlar yürütür." },
      { q: "Çalışanın onaysız bir bulut depolama hizmeti kullanması neyi gösterir?", options: ["Gölge BT", "Hacktivizm", "DDoS", "Zero-day"], answer: "Gölge BT", why: "Resmî onay dışı kullanılan hizmet gölge BT'dir." },
      { q: "Hazır araçlarla saldıran düşük yetenekli kişi nasıl adlandırılır?", options: ["Script kiddie", "APT", "Insider", "Organize suç"], answer: "Script kiddie", why: "Kendi aracını yazmaz, hazır araçları kullanır." }
    ],
    interview: [
      { q: "Tehdit aktörü türlerini say.", a: "Organize suç grupları, devlet destekli gruplar (APT), hacktivistler, iç tehditler (kasıtlı ya da kazara), script kiddie'ler ve gölge BT. Motivasyon, yetenek ve kaynak seviyeleri farklıdır; savunma planı buna göre yapılır." },
      { q: "İç tehdidi nasıl azaltırsın?", a: "En az yetki ilkesi, görev ayrımı, erişim loglama, çıkış işlemlerinde hesapları hemen kapatma ve farkındalık eğitimi uygularım." }
    ],
    vocab: [
      { term: "Threat actor", tr: "tehdit aktörü", ex: "The threat actor targeted finance." },
      { term: "Insider threat", tr: "iç tehdit", ex: "Insider threats have valid access." },
      { term: "Nation-state", tr: "devlet destekli", ex: "A nation-state group attacked it." },
      { term: "Hacktivist", tr: "aktivist saldırgan", ex: "Hacktivists defaced the site." },
      { term: "Attack vector", tr: "saldırı yolu", ex: "Email is a common attack vector." }
    ],
    resources: [
      res(PM, "Tehdit aktörleri ve vektörler"),
      { title: "MITRE ATT&CK: saldırgan teknikleri bilgi tabanı", url: "https://attack.mitre.org/", type: "doc", why: "Gerçek saldırıların teknik sınıflandırması", level: "orta", lang: "EN" }
    ],
    sources: [CT]
  };
})();

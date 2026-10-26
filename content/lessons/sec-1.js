/* Siber güvenlik (Security+ SY0-801 (V8) temelli) · sabit dersler 1-6 */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).sec = (window.PP_LESSONS.sec || {}));
  var CT = { title: "CompTIA Security+ sınav hedefleri (SY0-801, V8)", url: "https://www.comptia.org/certifications/security" };
  var PM = { title: "Professor Messer: Security+ (ücretsiz video kursu, SY0-701 sürümü)", url: "https://www.professormesser.com/", type: "video", length: "Çok bölümlü", level: "başlangıç", lang: "EN" };
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
      { id: "2745a447", q: "Bir çalışan müşteri tablosundaki bir fiyatı izinsiz değiştirdi. Hangi güvenlik hedefi bozuldu?", options: ["Bütünlük", "Gizlilik", "Erişilebilirlik", "İnkâr edememe"], obj: "h1" },
      { id: "6abc829a", q: "DDoS saldırısıyla bir web sitesi saatlerce kapalı kaldı. Etkilenen hedef hangisi?", options: ["Erişilebilirlik", "Gizlilik", "Bütünlük", "Kimlik doğrulama"], obj: "h1" },
      { id: "82e4236a", q: "'Kimsin?' sorusuna cevap veren AAA bileşeni hangisidir?", options: ["Authentication", "Authorization", "Accounting", "Availability"], obj: "h2" },
      { id: "aadcf15f", q: "Dijital imza ve log kayıtları en çok hangi kavrama katkı sağlar?", options: ["İnkâr edememe (non-repudiation)", "Yedekleme", "Ağ segmentasyonu", "Şifre sıfırlama"], obj: "h3" }
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
      { t: "warn", h: "Tuzak", text: "Sınavda aynı kontrol birden çok işlev taşıyabilir (kamera hem caydırıcı hem dedektif). Soru 'en iyi' hangisi diyorsa sorunun vurguladığı işleve bak." },
      { t: "steps", h: "Derinlemesine savunma ve en az yetki (V8)", items: [
        "Derinlemesine savunma (defense in depth): tek bir kontrole güvenmek yerine birbirini tamamlayan birçok katman kullanılır (fiziksel, ağ, uç nokta, uygulama, veri, kimlik). Bir katman delinirse sıradaki katman saldırıyı yavaşlatır ya da durdurur.",
        "Katmanlar farklı kontrol türlerinden oluşur: kilit (fiziksel), güvenlik duvarı (teknik), politika (yönetimsel), devriye (operasyonel). Aynı kontrolü üst üste koymak değil, birbirini tamamlayan türleri bir arada kullanmak hedeflenir.",
        "En az yetki: kullanıcı ve süreçlere yalnızca işini yapmaya yetecek erişim verilir; Zero Trust da bu ilkeye dayanır."
      ] }
    ],
    objectives: [
      { id: "h1", text: "Bir kontrolü kategorisine (teknik, yönetimsel, operasyonel, fiziksel) yerleştirebilirsin." },
      { id: "h2", text: "Bir kontrolün işlevini (önleyici, caydırıcı, dedektif, düzeltici, telafi edici, yönlendirici) söyleyebilirsin." },
      { id: "h3", text: "Derinlemesine savunmanın ne olduğunu ve tek bir kontrole güvenmenin neden riskli olduğunu açıklayabilirsin." }
    ],
    summary: [
      "Kontroller iki eksende okunur: kategori (kim ya da ne uyguluyor: teknik, yönetimsel, operasyonel, fiziksel) ve işlev (ne işe yarıyor).",
      "İşlevler: önleyici engeller, caydırıcı vazgeçirir, dedektif fark eder, düzeltici sonradan düzeltir, telafi edici asıl kontrolün yerini tutar, yönlendirici (directive) politika ve kurallarla davranışı yönlendirir.",
      "Aynı kontrol birden çok işlev taşıyabilir (kamera: caydırıcı ve dedektif); soru hangi işlevi vurguluyorsa ona bak.",
      "Yalnız önleyici kontrol varsa saldırı olduğunu fark etmezsin; dedektif katman şarttır."
    ],
    quiz: [
      { id: "cf92b0e4", q: "Yamalanamayan eski bir sunucuyu ayrı bir ağa taşımak hangi kontrol işlevidir?", options: ["Telafi edici", "Caydırıcı", "Düzeltici", "Yönlendirici"], obj: "h2" },
      { id: "367418de", q: "Log analizi ve IDS hangi işlev grubuna girer?", options: ["Dedektif", "Önleyici", "Caydırıcı", "Düzeltici"], obj: "h2" },
      { id: "abe827ab", q: "Güvenlik politikası ve risk değerlendirmesi hangi kategoridedir?", options: ["Yönetimsel", "Teknik", "Fiziksel", "Operasyonel"], obj: "h1" },
      { id: "b5d0970b", q: "Çalışanlara verilen güvenlik farkındalık eğitimi hangi kategoridedir?", options: ["Teknik", "Yönetimsel", "Operasyonel", "Fiziksel"], obj: "h1" },
      { id: "daf5593f", q: "'Bu alan kamerayla izlenmektedir' tabelasının ana işlevi nedir?", options: ["Caydırıcı", "Düzeltici", "Dedektif", "Telafi edici"], obj: "h2" },
      { id: "df2b5cdd", q: "Bir hastane girişte kart okuyucu, ağda güvenlik duvarı, cihazlarda EDR ve veritabanında şifreleme kullanıyor. Biri kart okuyucuyu atlatsa bile diğer katmanlar saldırıyı zorlaştırıyor. Bu yaklaşım hangisidir?", options: ["Telafi edici kontrol (compensating control)", "Derinlemesine savunma (defense in depth)", "Görev ayrımı (separation of duties)", "Hava boşluğu (air gap)"], obj: "h3" }
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
      { id: "12456b0a", q: "Hash fonksiyonunun temel özelliği hangisidir?", options: ["Tek yönlüdür, geri çevrilemez", "Anahtarla geri çözülür", "Çıktı uzunluğu girdiyle büyür", "Sadece metinde çalışır"], obj: "h1" },
      { id: "176918db", q: "İndirilen dosyanın değişmediğini nasıl kontrol edersin?", options: ["Hash'i hesaplayıp yayımlananla karşılaştırırım", "Dosyayı şifrelerim", "Dosyayı zip'lerim", "Boyutuna bakarım"], obj: "h2" },
      { id: "fc9a1763", q: "Parola hash'lerinde 'salt' neden kullanılır?", options: ["Aynı parolaların aynı hash'i vermesini engellemek için", "Hash'i kısaltmak için", "Parolayı şifrelemek için", "Giriş hızını artırmak için"], obj: "h3" },
      { id: "98778746", q: "Aşağıdakilerden hangisi artık güvenlik amacıyla önerilmez?", options: ["MD5", "SHA-256", "SHA-3", "Argon2"], obj: "h3" },
      { id: "52bfbe01", q: "Kullanıcı parolalarını veritabanında saklamak için en uygun yaklaşım hangisidir?", options: ["Parolayı AES ile şifreleyip anahtarı aynı sunucuda tutmak", "Tuzsuz MD5 ile hash'lemek", "Salt'lı ve bilerek yavaş bir algoritmayla hash'lemek (ör. bcrypt, Argon2)", "Tuzsuz SHA-256 ile hash'lemek"], obj: "h3" },
      { id: "a22ac518", q: "Hangi İKİ özellik kriptografik bir hash fonksiyonunu tanımlar?", options: ["Doğru anahtara sahip olan çıktıyı yeniden çözebilir", "Küçük girdi değişimi çıktıyı çok değiştirir", "Çıktı uzunluğu girdi uzunluğuyla birlikte büyür", "Çıktı geri çevrilemez (tek yönlü)", "Aynı özeti veren iki farklı girdi bulmak kolaydır"], multi: 2, obj: "h1" }
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
    homework: "HTTPS ile açılan bir sitenin tarayıcıda site bilgisi (kilit/ayar) simgesine tıkla, sertifika bilgisine bak. Şifreleme algoritmasını ve sertifikayı kimin verdiğini not et.",
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
      { t: "warn", h: "Tuzak", text: "'Açık anahtarla şifrele' ile 'özel anahtarla imzala' karıştırılır. İmza gizlilik sağlamaz, kimin yazdığını ve değişmediğini kanıtlar." },
      { t: "steps", h: "Şifreleme düzeyleri ve donanım güvenliği (V8)", items: [
        "Düzeyler: tam disk (cihaz çalınınca korur, ama oturum açıkken veri açıktır), bölüm/birim (tek bir birimi), dosya (seçili dosyayı), veritabanı (depolamadaki veritabanı dosyalarını) ve kayıt/alan (tek satır ya da sütun; ör. kimlik numarası ayrı anahtarla, bu yüzden yönetici bile okuyamayabilir).",
        "HSM (donanım güvenlik modülü): anahtarları üreten, saklayan ve imza/şifreleme işlemini kendi içinde yapan, kurcalamaya dayanıklı özel donanım. Özel anahtar cihazın dışına çıkmaz; kurum genelinde birçok uygulamaya ağdan hizmet verir (CA kök anahtarı, ödeme sistemleri).",
        "TPM: tek bir bilgisayarın anakartındaki güvenlik çipi; disk şifreleme anahtarını önyükleme bütünlüğü bozulmadıkça açmaz ve cihaz kimliği sağlar. Secure enclave: işlemci içinde yalıtılmış bölge; kullanımdaki (in use) veriyi işletim sisteminden bile saklar.",
        "Anahtar uzunluğu uzadıkça kaba kuvvet zorlaşır; ancak algoritma kusurluysa uzunluk kurtarmaz."
      ] }
    ],
    objectives: [
      { id: "h1", text: "Simetrik ve asimetrik şifrelemeyi anahtar sayısı ve hız bakımından ayırt edip AES ile RSA'yı doğru gruba koyabilirsin." },
      { id: "h2", text: "Gizlilik için hangi anahtarla şifreleyeceğini, dijital imza için hangi anahtarla imzalayacağını seçebilirsin." },
      { id: "h3", text: "Büyük veri için hangi yöntemin uygun olduğunu söyleyip HTTPS'teki hibrit yapıyı açıklayabilirsin." },
      { id: "h4", text: "Tam disk, dosya, veritabanı ve kayıt düzeyi şifreleme arasından senaryoya uygun olanı ve HSM, TPM ile secure enclave'in rolünü seçebilirsin." }
    ],
    summary: [
      "Simetrikte tek ortak anahtar hem şifreler hem çözer; hızlıdır ama anahtarı güvenle iletmek zordur (örnek: AES).",
      "Asimetrikte açık ve özel anahtar çifti vardır; yavaştır, anahtar değişimi ve imza için kullanılır (örnek: RSA, ECC).",
      "Gizli mesaj için alıcının açık anahtarıyla şifrelersin; imza için kendi özel anahtarınla imzalarsın; özel anahtar asla paylaşılmaz.",
      "HTTPS hibrittir: asimetrikle oturum anahtarı anlaşılır, veri hızlı simetrik şifrelemeyle taşınır; disk şifreleme de simetriktir."
    ],
    quiz: [
      { id: "fa08bf8a",q:"Bir mesajı sadece Ayşe'nin okuması için hangi anahtarla şifrelersin?",options:["Ayşe'nin açık anahtarı","Kendi özel anahtarın","Ayşe'nin özel anahtarı","Kendi açık anahtarın"],obj:"h2" },
      { id: "5f76d905",q:"Büyük bir diskin şifrelenmesi için en uygun yöntem hangisi?",options:["Simetrik (AES)","Asimetrik (RSA) ile tüm veriyi şifrelemek","Hash","Base64"],obj:"h3" },
      { id: "fa18db2c",q:"Dijital imza oluşturmak için hangi anahtar kullanılır?",options:["Gönderenin özel anahtarı","Gönderenin açık anahtarı","Alıcının özel anahtarı","Ortak parola"],obj:"h2" },
      { id: "9d51bb82",q:"HTTPS bağlantısında genellikle ne olur?",options:["Asimetrikle anahtar anlaşılır, veri simetrik şifrelenir","Tüm veri RSA ile şifrelenir","Sadece hash kullanılır","Veri düz metin gider"],obj:"h3" },
      { id: "06f559de",q:"Aşağıdakilerden hangisi simetrik şifreleme algoritmasıdır?",options:["RSA","ECC","AES","SHA-256"],obj:"h1" },
      { id: "9d380214", q: "Bir hastane, veritabanındaki yalnızca hasta kimlik numarası sütununun veritabanı yöneticileri dahil çoğu kullanıcıdan gizli kalmasını istiyor; diğer sütunlar açık kalabilir. Hangi şifreleme düzeyi uygundur?", options: ["Kayıt/alan (sütun) düzeyi şifreleme", "Tam disk şifreleme", "Bölüm (volume) şifreleme", "Yedek dosyasını dosya düzeyinde şifreleme"], obj: "h4" },
      { id: "47de857d", q: "Bir kuruluş, kök CA özel anahtarının hiçbir koşulda dışa aktarılamayacağı, kurcalamaya dayanıklı ve birçok uygulamanın ağdan imza istediği merkezi bir donanım çözümü arıyor. Hangisi en uygundur?", options: ["HSM (donanım güvenlik modülü)", "TPM", "Secure enclave", "Yazılım tabanlı anahtar deposu"], obj: "h4" },
      { id: "28bc0a3a", q: "Bir dizüstü bilgisayarın tam disk şifreleme anahtarının anakartta bağlı bir çipte tutulması ve önyükleme bütünlüğü bozulursa diskin açılmaması isteniyor. Hangi bileşen bunu sağlar?", options: ["HSM", "Parola yöneticisi", "DNS sinkhole", "TPM (Trusted Platform Module)"], obj: "h4" }
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
    homework: "Tarayıcıda bankanın sitesine gir, site bilgisi (kilit/ayar) simgesinden sertifikayı aç: kimin adına verilmiş, kim vermiş, ne zaman bitiyor? Üç satır not al.",
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
      { t: "box", h: "Self-signed ve wildcard", text: "Self-signed: kendi kendini imzalar, dışarıdan güvenilmez; test ve iç sistemlerde kullanılır. Wildcard (*.sirket.com): tek sertifika tek seviyedeki tüm alt alan adlarını (a.sirket.com) kapsar, ama anahtar sızarsa hepsi risk altına girer." },
      { t: "warn", h: "Tuzak", text: "Sertifika siteyi 'güvenli' yapmaz, sadece kimliği ve şifrelemeyi doğrular. Kötü niyetli bir site de geçerli sertifika alabilir. Kilit simgesi 'bu site zararsız' demek değildir." },
      { t: "steps", h: "Anahtar emanet ve sertifika türleri (V8)", items: [
        "Anahtar emanet (key escrow): özel anahtarın bir kopyası güvenilir bir tarafta ya da kurumun sıkı denetimli kasasında saklanır. Çalışan ayrılır ya da anahtarını kaybederse şifreli veri kurtarılabilir; karşılığında emanet noktası yüksek değerli bir hedef olur.",
        "Kendinden imzalı (self-signed) sertifikayı güvenilir bir CA değil, sahibi imzalar; tarayıcılar güvenmez, yalnızca iç testlerde makuldür. Üçüncü taraf (kamu) CA sertifikası tarayıcıların güvendiği kök zincirine bağlıdır.",
        "Güven kökü (root of trust): zincirin başında koşulsuz güvenilen bileşen; kök CA ya da donanım (TPM, HSM) olabilir."
      ] }
    ],
    objectives: [
      { id: "h1", text: "Sertifikanın açık anahtarı bir kimlikle bağladığını ve bu bağı CA'nın imzasının doğruladığını söyleyebilirsin." },
      { id: "h2", text: "Güven zincirini (root CA, intermediate CA, sunucu sertifikası) sıralayıp tarayıcının zinciri nasıl doğruladığını açıklayabilirsin." },
      { id: "h3", text: "Tarayıcıdaki sertifika uyarısının olası nedenlerini (süresi dolma gibi) bulabilirsin." },
      { id: "h4", text: "OCSP ve CRL ile iptal kontrolünü, CSR'nin rolünü, wildcard sertifikanın riskini ve anahtar emanetin (key escrow) amacını ayırt edebilirsin." }
    ],
    summary: [
      "Sertifika, bir açık anahtarı bir kimlikle (site adı) bağlar; CA bu bağı dijital imzasıyla doğrular.",
      "Güven zinciri root CA, intermediate CA ve sunucu sertifikası olarak sıralanır; tarayıcı zinciri yukarı doğru root'a kadar doğrular.",
      "Süresi dolmuş sertifika, uyuşmayan alan adı ya da güvenilmeyen CA tarayıcıda uyarıya yol açar.",
      "CSR ile CA'dan sertifika istenir; iptal edilenler CRL (liste) veya OCSP (anlık sorgu) ile kontrol edilir.",
      "Wildcard sertifika tek seviyedeki tüm alt alan adlarını kapsar, anahtarı sızarsa hepsi risk altına girer; kilit simgesi sitenin zararsız olduğu anlamına gelmez."
    ],
    quiz: [
      { id: "4c56311a",q:"Sertifikanın temel işlevi nedir?",options:["Açık anahtarı bir kimlikle bağlamak","Dosyaları sıkıştırmak","Parolaları saklamak","Ağ trafiğini hızlandırmak"],obj:"h1" },
      { id: "789057cd",q:"Kullanıcı sertifika uyarısı alıyor ve sertifikanın bitiş tarihi geçmiş. En olası neden?",options:["Sertifika yenilenmemiş","DNS çalışmıyor","Kablo kopuk","Parola yanlış"],obj:"h3" },
      { id: "2de03970",q:"İptal edilmiş sertifikaları anlık sorgulamak için hangi mekanizma kullanılır?",options:["OCSP","CSR","DHCP","NTP"],obj:"h4" },
      { id: "8974128a",q:"Wildcard sertifikanın riski nedir?",options:["Anahtar sızarsa tüm alt alan adları etkilenir","Sadece tek siteyi kapsar","Şifreleme yapmaz","Süresi hiç dolmaz"],obj:"h4" },
      { id: "4872227f",q:"Tarayıcı bir sunucu sertifikasına güvenip güvenmeyeceğine nasıl karar verir?",options:["Site adının popüler olup olmadığına bakar","Zinciri yukarı doğru doğrulayıp güvenilen bir root CA'ya ulaşır","Kullanıcıdan sunucunun parolasını ister","Sertifikayı kendisi imzalar"],obj:"h2" },
      { id: "4c915753",q:"Kullanıcı bankam.com adresine giriyor ama sunucunun sertifikası yalnızca odeme.bankam.net adı için verilmiş. Tarayıcı neden uyarı verir?",options:["Sertifikanın süresi dolmuş","Sertifikadaki alan adı girilen adresle uyuşmuyor","Sunucunun IP adresi değişmiş","Tarayıcı önbelleği dolu"],obj:"h3" },
      { id: "802306ad", q: "Bir şirket, çalışan ayrılınca ya da anahtarını kaybedince şifreli verilere erişebilmek için özel anahtarların bir kopyasını ayrı ve sıkı denetimli bir kasada saklıyor. Bu uygulamanın adı nedir?", options: ["Sertifika sabitleme (certificate pinning)", "Anahtar germe (key stretching)", "Anahtar emanet (key escrow)", "OCSP stapling"], obj: "h4" }
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
    objectives: [
      { id: "h1", text: "Tehdit aktörü türlerini (organize suç, devlet destekli, hacktivist, script kiddie, gölge BT) motivasyon ve yeteneklerine göre ayırt edebilirsin." },
      { id: "h2", text: "Bir senaryoda kasıtlı iç tehdit ile kazara iç tehdidi birbirinden ayırabilirsin." },
      { id: "h3", text: "Saldırganın içeri girdiği yolu (tehdit vektörünü) saldırgandan ve motivasyondan ayırarak adlandırabilirsin." }
    ],
    summary: [
      "Organize suç grupları para peşindedir; devlet destekli gruplar (APT) uzun süreli ve gizli casusluk yapar, en yüksek kaynağa sahiptir.",
      "Hacktivist siyasi ya da ideolojik amaçla saldırır; script kiddie hazır araç kullanan düşük yetenekli kişidir.",
      "İç tehdit kasıtlı (intikam, para) ya da kazara (bilmeden zararlı dosya açmak) olabilir; zaten yetkisi vardır.",
      "Gölge BT, onay almadan kullanılan araç ve hizmetlerdir; kötü niyet olmasa da risk yaratır.",
      "Tehdit vektörü saldırganın girdiği yoldur (e-posta, USB, açık servis); aktör ve motivasyondan ayrı bir kavramdır."
    ],
    quiz: [
      { id: "909b424e",q:"Fidye yazılımıyla para kazanmayı hedefleyen, organize ve kaynaklı grup hangisidir?",options:["Organize suç grubu","Hacktivist","Script kiddie","Gölge BT"],obj:"h1" },
      { id: "2dc5dbc7",q:"Uzun süreli, gizli casusluk yürüten ve en yüksek kaynağa sahip aktör hangisidir?",options:["Devlet destekli (APT)","Script kiddie","Hacktivist","Kazara iç tehdit"],obj:"h1" },
      { id: "a6564d73",q:"Çalışanın onaysız bir bulut depolama hizmeti kullanması neyi gösterir?",options:["Gölge BT","Hacktivizm","DDoS","Zero-day"],obj:"h1" },
      { id: "426d25f4",q:"Hazır araçlarla saldıran düşük yetenekli kişi nasıl adlandırılır?",options:["Script kiddie","APT","Insider","Organize suç"],obj:"h1" },
      { id: "32e9560b",q:"Yetkili bir çalışan, bilmeden zararlı bir e-posta ekini açtı. Olay, çalışanın rolüne göre hangi tehdit türüdür?",options:["Kasıtlı iç tehdit","Hacktivist","Kazara iç tehdit","Organize suç grubu"],obj:"h2" },
      { id: "628a34f6",q:"Saldırgan phishing e-postasıyla kuruma girdi. Bu saldırıda e-posta neyi temsil eder?",options:["Tehdit aktörü","Motivasyon","Kontrol işlevi","Tehdit vektörü"],obj:"h3" }
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

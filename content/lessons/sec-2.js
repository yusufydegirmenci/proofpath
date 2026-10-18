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
        "Shoulder surfing: omuz üstünden ekrana ya da parola girişine bakmak.",
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
      { t: "warn", h: "Tuzak", text: "Teknik önlemler kadar kültür de belirleyicidir: kimsenin 'çok meşgulüm' diye doğrulamayı atlamadığı bir kurum." }
    ],
    objectives: [
      { id: "h1", text: "Phishing, spear phishing, whaling, smishing ve vishing saldırılarını hedef ve kanala göre ayırt edebilirsin." },
      { id: "h2", text: "Tailgating, shoulder surfing, dumpster diving ve baiting gibi fiziksel teknikleri bir senaryodan tanıyabilirsin." },
      { id: "h3", text: "Pharming, watering hole ve typosquatting saldırılarını birbirinden ayırt edebilirsin." },
      { id: "h4", text: "Acil para talebi içeren bir mesajdaki baskı tekniğini bulup doğru savunmayı (ikinci kanaldan doğrulama) seçebilirsin." }
    ],
    summary: [
      "Phishing geniş kitleye, spear phishing belirli kişiye, whaling üst düzey yöneticilere yönelir; smishing SMS, vishing telefon kanalıdır.",
      "Tailgating, shoulder surfing, dumpster diving ve baiting insanı fiziksel ortamda hedef alır.",
      "Pharming DNS ile sahte siteye yönlendirir, watering hole hedef grubun sitesini ele geçirir, typosquatting benzer yazımlı alan adı kullanır.",
      "Aciliyet, otorite, korku ve ödül, düşünmeden harekete geçirmek için kullanılan baskı tekniklerindendir.",
      "Para, parola ya da kod isteyen talepler ikinci bir kanaldan doğrulanır ve şüpheli mesaj bildirilir."
    ],
    quiz: [
      { q: "Bir yöneticiyi hedef alan özel hazırlanmış oltalama saldırısı nasıl adlandırılır?", options: ["Whaling", "Smishing", "Pharming", "Baiting"], answer: "Whaling", why: "Whaling, üst düzey yöneticilere yönelik spear phishing'dir.", obj: "h1", whyNot: { "Smishing": "Smishing hedefi değil kanalı belirtir: SMS ile yapılan oltalamadır, yöneticiye özel olması gerekmez.", "Pharming": "Pharming kişiye özel e-posta değil, DNS üzerinden kullanıcıyı sahte siteye yönlendirmedir.", "Baiting": "Baiting, USB gibi merak uyandıran bir yem bırakmaktır; hazırlanmış bir oltalama mesajı değildir." } },
      { q: "Yetkili çalışanın arkasından kapıdan sızmak hangisidir?", options: ["Tailgating", "Vishing", "Typosquatting", "Pharming"], answer: "Tailgating", why: "Tailgating, yetkili birinin ardından fiziksel olarak içeri girmektir.", obj: "h2", whyNot: { "Vishing": "Vishing telefon (ses) üzerinden yapılır; kapıdan fiziksel geçişle ilgisi yoktur.", "Typosquatting": "Typosquatting benzer yazımlı bir alan adı kaydetmektir, bu çevrimiçi bir tekniktir.", "Pharming": "Pharming kullanıcıyı DNS ile sahte siteye yönlendirir; fiziksel giriş değildir." } },
      { q: "Telefonla arayıp 'IT destekten arıyorum, parolanı söyle' demek hangisine girer?", options: ["Vishing / pretexting", "Dumpster diving", "Watering hole", "Smishing"], answer: "Vishing / pretexting", why: "Ses yoluyla, uydurma bir senaryoyla bilgi koparılıyor.", obj: "h1", whyNot: { "Dumpster diving": "Dumpster diving çöpten belge toplamaktır; burada kimseyle konuşulmaz, oysa senaryoda canlı bir arama var.", "Watering hole": "Watering hole hedef grubun sık ziyaret ettiği web sitesini ele geçirmektir, telefon aramasıyla ilgisi yoktur.", "Smishing": "Smishing de aynı mantıktır ama kanalı SMS'tir; senaryoda mesaj değil telefon araması var." } },
      { q: "Gogle.com gibi benzer yazımlı alan adı kaydetmek hangisidir?", options: ["Typosquatting", "Tailgating", "Whaling", "Baiting"], answer: "Typosquatting", why: "Yazım hatasına güvenen sahte alan adıdır.", obj: "h3", whyNot: { "Tailgating": "Tailgating fiziksel bir tekniktir: yetkili birinin ardından kapıdan geçmek.", "Whaling": "Whaling üst düzey yöneticileri hedef alan phishing'dir; alan adı kaydıyla ilgili değildir.", "Baiting": "Baiting merak uyandıran bir yem (ör. USB) bırakmaktır, alan adı yazımına dayanmaz." } },
      { q: "Genel müdürden geldiği söylenen 'acil IBAN değişikliği' e-postası için en doğru ilk adım nedir?", options: ["Tutar küçükse işlemi yapıp sonra bildirmek", "Gönderene yanıt yazıp doğrulamasını istemek", "Telefonla ya da başka bir kanaldan talebi doğrulamak", "E-postayı silip kimseye söylememek"], answer: "Telefonla ya da başka bir kanaldan talebi doğrulamak", why: "Para talepleri ikinci bir kanaldan doğrulanır; aciliyet ve otorite baskısı BEC'in tipik işaretidir.", obj: "h4", whyNot: { "Tutar küçükse işlemi yapıp sonra bildirmek": "Doğrulama atlanırsa saldırı başarılı olur; tutarın küçüklüğü sahte talebi meşru yapmaz.", "Gönderene yanıt yazıp doğrulamasını istemek": "Yanıt aynı (ele geçirilmiş ya da taklit) kanala gider; saldırgan kendini doğrulamış gibi cevap verir.", "E-postayı silip kimseye söylememek": "Güvenlik ekibine bildirmemek diğer çalışanları aynı saldırıya açık bırakır; rapor etme kültürü savunmanın parçasıdır." } },
      { q: "'Hesabın 1 saat içinde kapatılacak, hemen bağlantıya tıkla!' mesajında ağırlıklı olarak hangi baskı tekniği kullanılıyor?", options: ["Ödül", "Sempati", "Aciliyet ve korku", "Otorite"], answer: "Aciliyet ve korku", why: "Kısa süre sınırı aciliyet, hesabın kapanması tehdidi korku yaratır; amaç düşünmeden tıklatmaktır.", obj: "h4", whyNot: { "Ödül": "Mesaj bir kazanç vaat etmiyor, aksine bir kayıp (hesabın kapanması) ile tehdit ediyor.", "Sempati": "Mesaj yardım isteyip duygusal bağ kurmuyor; zaman baskısı ve tehdit kullanıyor.", "Otorite": "Mesajda bir yönetici ya da kurum yetkilisinin emri yok; baskı süre ve tehditten geliyor." } },
      { q: "Çalışanların sık ziyaret ettiği bir sektör forumu ele geçirilip siteyi açanlara zararlı yazılım bulaştırılıyor. Bu hangisidir?", options: ["Pharming", "Typosquatting", "Watering hole", "Vishing"], answer: "Watering hole", why: "Watering hole, hedef grubun güvendiği ve sık ziyaret ettiği meşru siteyi ele geçirmektir.", obj: "h3", whyNot: { "Pharming": "Pharming kullanıcıyı DNS ile sahte siteye yönlendirir; meşru sitenin kendisi ele geçirilmez.", "Typosquatting": "Typosquatting benzer yazımlı yeni bir alan adı kaydeder; gerçek site ele geçirilmez.", "Vishing": "Vishing telefon (ses) üzerinden yapılan oltalamadır, bir web sitesini ele geçirmeyi içermez." } },
      { q: "Ofiste birinin omzunun üzerinden ekrana bakarak parolasını öğrenmek hangisidir?", options: ["Dumpster diving", "Baiting", "Pharming", "Shoulder surfing"], answer: "Shoulder surfing", why: "Shoulder surfing, ekrana ya da klavyeye fiziksel olarak bakarak bilgi edinmektir.", obj: "h2", whyNot: { "Dumpster diving": "Dumpster diving çöpe atılmış belgelerden bilgi toplamaktır; burada canlı bir gözlem var.", "Baiting": "Baiting merak uyandıran bir yem (ör. USB) bırakmaktır; kimse yemlenmiyor, ekrana bakılıyor.", "Pharming": "Pharming DNS üzerinden sahte siteye yönlendirir; fiziksel gözlemle ilgisi yoktur." } }
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
      { q: "Kullanıcı etkileşimi olmadan ağ üzerinden kendi kendine yayılan zararlı hangisidir?", options: ["Solucan", "Truva atı", "Keylogger", "Mantık bombası"], answer: "Solucan", why: "Solucan kendi başına yayılır.", obj: "h1", whyNot: { "Truva atı": "Truva atı faydalı görünüp kullanıcıya çalıştırtılır; kendi başına yayılmaz.", "Keylogger": "Keylogger tuş vuruşlarını kaydeden bir casus yazılımdır; yayılma biçimini tanımlamaz.", "Mantık bombası": "Mantık bombası belirli bir koşulda (ör. çalışan çıkarılınca) tetiklenir, ağ üzerinden yayılmaz." } },
      { q: "Faydalı bir program gibi görünüp içinde zararlı yük taşıyan yazılım hangisidir?", options: ["Truva atı", "Solucan", "Botnet", "Rootkit"], answer: "Truva atı", why: "Meşru görünümü ile kullanıcıyı kandırır.", obj: "h1", whyNot: { "Solucan": "Solucan meşru görünmeye çalışmaz; kullanıcıya ihtiyaç duymadan ağda yayılır.", "Botnet": "Botnet bir yazılım türü değil, ele geçirilmiş cihazlardan oluşan ağdır.", "Rootkit": "Rootkit kendini ve başka zararlıyı sistemde gizler; faydalı program kılığına girmesi tanımı değildir." } },
      { q: "Fidye yazılımına karşı en etkili önlem hangisidir?", options: ["Çevrimdışı yedek ve düzenli test", "Parolayı sık değiştirmek", "Yedeği her zaman ağa bağlı tutmak", "Tüm dosyaları tek paylaşımda toplamak"], answer: "Çevrimdışı yedek ve düzenli test", why: "Temiz yedek, fidye ödemeden geri dönüşü sağlar.", obj: "h3", whyNot: { "Parolayı sık değiştirmek": "Parola yenilemek hesabı korur ama şifrelenmiş dosyaları geri getirmez.", "Yedeği her zaman ağa bağlı tutmak": "Ağa bağlı yedek de fidye yazılımı tarafından şifrelenebilir; temiz kopya çevrimdışı olmalıdır.", "Tüm dosyaları tek paylaşımda toplamak": "Tek paylaşım, tek hamlede tüm verinin şifrelenmesini kolaylaştırır; etkiyi artırır, azaltmaz." } },
      { q: "3-2-1 yedekleme kuralında '1' neyi ifade eder?", options: ["Bir kopya çevrimdışı ya da uzakta", "Bir kullanıcı", "Bir gün", "Bir sunucu"], answer: "Bir kopya çevrimdışı ya da uzakta", why: "3 kopya, 2 farklı ortam, 1 tanesi uzak/çevrimdışı.", obj: "h3", whyNot: { "Bir kullanıcı": "Kuralın sayıları kullanıcıyla değil kopya sayısı, ortam çeşidi ve konumla ilgilidir.", "Bir gün": "3-2-1 yedekleme sıklığını değil, kopya düzenini anlatır.", "Bir sunucu": "'1' kopyanın nerede durduğunu söyler (çevrimdışı/uzak), tek sunucu kullanmayı değil." } },
      { q: "Çalışanın ekranında fidye notu çıktı. İlk müdahale hangisidir?", options: ["Cihazın gücünü hemen kesip dosyaları silmek", "Cihazı yeniden başlatıp dosyaları kurtarmayı denemek", "Cihazı ağdan ayırıp güvenlik ekibine bildirmek", "Fidyeyi hemen ödemek"], answer: "Cihazı ağdan ayırıp güvenlik ekibine bildirmek", why: "Ayırma yayılmayı durdurur, bildirim olay müdahale planını başlatır; ödeme kararı yönetim ve hukukla verilir.", obj: "h2", whyNot: { "Cihazın gücünü hemen kesip dosyaları silmek": "Gücü hemen kesmek bellekteki izleri kaybettirebilir, dosyaları silmek de delil ve kurtarma şansını yok eder.", "Cihazı yeniden başlatıp dosyaları kurtarmayı denemek": "Yeniden başlatma bellekteki izleri siler ve şifrelemeyi sürdürebilir; önce cihaz ağdan ayrılmalıdır.", "Fidyeyi hemen ödemek": "Ödeme garanti çözüm değildir; karar yönetim ve hukukla birlikte, olay planı sürerken verilir." } },
      { q: "Fidye yazılımı olayında aşağıdaki sıralardan hangisi doğrudur?", options: ["Gücü kes, cihazı yeniden başlat, olayı sonra bildir", "Cihazı ağdan ayır, olayı bildir, yedeklerin temiz olduğunu doğrula", "Fidyeyi öde, cihazı ağdan ayır, olayı bildir", "Olayı bildir, cihazı ağda bırak, dosyaları silmeyi dene"], answer: "Cihazı ağdan ayır, olayı bildir, yedeklerin temiz olduğunu doğrula", why: "Önce yayılma durdurulur, sonra olay müdahale planı başlatılır, ardından geri dönüş için temiz yedek doğrulanır.", obj: "h2", whyNot: { "Gücü kes, cihazı yeniden başlat, olayı sonra bildir": "Gücü kesmek bellekteki izleri kaybettirir ve bildirimi geciktirmek müdahaleyi yavaşlatır; ayırma da yok.", "Fidyeyi öde, cihazı ağdan ayır, olayı bildir": "Ödeme ilk adım olamaz ve garanti çözüm değildir; önce yayılma durdurulmalıdır.", "Olayı bildir, cihazı ağda bırak, dosyaları silmeyi dene": "Cihaz ağda kalırsa şifreleme yayılır; dosyaları silmek de delil ve kurtarma şansını yok eder." } }
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
      { t: "warn", h: "Tuzak", text: "Password spraying ile brute force karıştırılır: brute force bir hesaba çok parola dener, spraying çok hesaba az parola dener." }
    ],
    objectives: [
      { id: "h1", text: "ARP spoofing, DNS poisoning ve rogue DHCP saldırılarını tanıyıp her birine karşı savunmayı (DAI, DNSSEC, DHCP snooping) eşleştirebilirsin." },
      { id: "h2", text: "Brute force, password spraying ve credential stuffing saldırılarını deneme biçimine göre ayırt edebilirsin." },
      { id: "h3", text: "DoS ve DDoS saldırılarını volumetrik, protokol (SYN flood) ve uygulama katmanı olarak sınıflandırabilirsin." }
    ],
    summary: [
      "ARP spoofing yerel ağda sahte ARP cevabıyla trafiği çeker; savunması DAI'dir (DHCP snooping ile birlikte).",
      "Rogue DHCP yanlış gateway dağıtır ve DHCP snooping ile engellenir; DNS poisoning ise sahte DNS cevabıyla kullanıcıyı sahte siteye gönderir.",
      "Brute force bir hesaba çok parola dener, spraying çok hesaba az parola dener, credential stuffing sızmış parola ikililerini dener.",
      "DDoS çok kaynaktan gelir ve volumetrik, protokol (SYN flood) ya da uygulama katmanı olabilir.",
      "TLS araya girmeye, MFA ve hesap kilitleme parola saldırılarına, CDN ve hız sınırlama DDoS'a karşı kullanılır."
    ],
    quiz: [
      { q: "Yerel ağda sahte ARP cevaplarıyla trafiği saldırganın üzerinden geçirmek hangisidir?", options: ["ARP spoofing", "DNS poisoning", "SYN flood", "Replay"], answer: "ARP spoofing", why: "Sahte ARP cevabıyla MAC-IP eşlemesi bozulur.", obj: "h1", whyNot: { "DNS poisoning": "DNS poisoning ad çözümünü bozar (alan adından sahte IP verir); MAC-IP eşlemesi ARP'ta bozulur.", "SYN flood": "SYN flood hizmeti kullanılmaz hale getirir, trafiği saldırganın üzerinden geçirmez.", "Replay": "Replay yakalanan geçerli bir mesajı yeniden göndermektir, sahte ARP cevabı içermez." } },
      { q: "Çok sayıda hesapta birkaç yaygın parolayı denemek hangisidir?", options: ["Password spraying", "Brute force", "Replay", "MITM"], answer: "Password spraying", why: "Hesap kilitlemeye takılmadan geniş ölçekte denenir.", obj: "h2", whyNot: { "Brute force": "Brute force tek hesaba çok sayıda parola dener; sorudaki yöntem bunun tersidir.", "Replay": "Replay parola tahmini değil, yakalanmış geçerli bir mesajı tekrar göndermektir.", "MITM": "MITM iki taraf arasına girip trafiği izler ya da değiştirir; parola denemesi yapmaz." } },
      { q: "Rogue DHCP sunucusuna karşı switch'te hangi özellik kullanılır?", options: ["DHCP snooping", "STP", "NAT", "PoE"], answer: "DHCP snooping", why: "Sadece güvenilir portlardan DHCP cevaplarına izin verir.", obj: "h1", whyNot: { "STP": "STP anahtarlar arası döngüyü önler; DHCP cevaplarını süzmez.", "NAT": "NAT adres çevirisi yapar ve switch'te sahte DHCP sunucusunu engellemez.", "PoE": "PoE kablo üzerinden cihaza elektrik verir; güvenlik filtresi değildir." } },
      { q: "SYN flood hangi tür saldırıdır?", options: ["Protokol tabanlı DoS", "Parola saldırısı", "Sosyal mühendislik", "MITM"], answer: "Protokol tabanlı DoS", why: "TCP bağlantı tablosunu yarım bağlantılarla doldurur.", obj: "h3", whyNot: { "Parola saldırısı": "SYN flood hesapları hedef almaz; TCP bağlantı kurma sürecini suistimal eder.", "Sosyal mühendislik": "Sosyal mühendislik insanı kandırır; SYN flood ise otomatik üretilmiş TCP paketleriyle yapılır.", "MITM": "MITM trafiği izlemek ya da değiştirmek için araya girer; SYN flood hizmeti dolu bağlantı tablosuyla durdurur." } },
      { q: "Başka bir sitedeki sızıntıdan alınan gerçek kullanıcı adı/parola çiftlerini hedef sitede denemek hangisidir?", options: ["Brute force", "Password spraying", "Credential stuffing", "Replay"], answer: "Credential stuffing", why: "Sızmış gerçek çiftler, parolaları yeniden kullanan hesapları ele geçirmek için başka sitelerde denenir.", obj: "h2", whyNot: { "Brute force": "Brute force parolaları tahmin eder; sızmış gerçek kullanıcı/parola çiftlerini kullanmaz.", "Password spraying": "Spraying az sayıda yaygın parolayı çok hesapta dener; sızıntıdan gelen çiftleri kullanmaz.", "Replay": "Replay yakalanan geçerli bir mesajı yeniden göndermektir, parola denemesi değildir." } },
      { q: "Sahte DNS cevaplarına karşı kayıtların dijital imzayla doğrulanmasını sağlayan önlem hangisidir?", options: ["DAI", "DHCP snooping", "Port security", "DNSSEC"], answer: "DNSSEC", why: "DNSSEC, DNS cevaplarını imzalayarak sahte cevapların kabul edilmesini önler.", obj: "h1", whyNot: { "DAI": "DAI ARP paketlerini doğrular; DNS cevaplarını imzalamaz.", "DHCP snooping": "DHCP snooping sahte DHCP sunucusunu engeller; DNS kayıtlarını doğrulamaz.", "Port security": "Port security bir portta öğrenilebilecek MAC sayısını sınırlar; DNS ile ilgisi yoktur." } }
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
      { t: "cmd", lang: "text", calistirma: "atla yorum satırlarıyla anlatılan SQL enjeksiyon örneği; çalıştırılacak kod yok", text: "# Savunmasız:   SELECT * FROM users WHERE name = '" + "$girdi" + "'\n# Girdi:         ' OR '1'='1\n# Sonuç:        tüm kullanıcılar döner\n\n# Güvenli (parametreli):\n# SELECT * FROM users WHERE name = ?   -- değer sorgudan ayrı gönderilir" },
      { t: "box", h: "Ortak kök", text: "Enjeksiyon ailesinde (SQLi, XSS, komut enjeksiyonu) veri ile komut karışır; diğerlerinde de kök neden girdiye, oturuma ya da zamanlamaya güvenmektir. Ortak çözüm: girdiyi doğrula, çıktıyı encode et, parametreli arayüz kullan, en az yetki ver." },
      { t: "steps", h: "Güvenli yazılım yöntemleri", items: [
        "Girdi doğrulama (beyaz liste) ve çıktı kodlama.",
        "Statik kod analizi (SAST), dinamik test (DAST), bağımlılık taraması.",
        "WAF (web uygulaması güvenlik duvarı) ek katman olur, asıl çözümün yerine geçmez.",
        "Sır (parola, anahtar) kodda tutulmaz."
      ] },
      { t: "warn", h: "Tuzak", text: "WAF, hatalı kodu düzeltmez. Asıl çözüm kodda; WAF geçici ve ek bir korumadır." }
    ],
    objectives: [
      { id: "h1", text: "SQL injection girdisini tanıyıp en etkili savunmanın parametreli sorgu olduğunu seçebilirsin." },
      { id: "h2", text: "XSS, CSRF ve SSRF saldırılarını nerede ve kimin adına çalıştıklarına göre ayırt edebilirsin." },
      { id: "h3", text: "../../ içeren bir girdiyi path traversal olarak tanıyabilirsin." }
    ],
    summary: [
      "Enjeksiyon saldırılarının ortak kökü, kullanıcı verisinin komut ya da sorgu olarak çalışmasıdır; diğer saldırılar da girdiye ya da oturuma körü körüne güvenmekten doğar.",
      "SQL injection'a karşı en etkili savunma parametreli sorgudur; girdi doğrulama ve en az yetkili DB hesabı destekler.",
      "XSS zararlı betiği başka kullanıcının tarayıcısında çalıştırır, CSRF kullanıcının açık oturumuyla istek yaptırır, SSRF sunucuyu iç ağa istek yaptırır.",
      "Path traversal ../../ ile izinsiz dosyaya erişmeye çalışır; savunması yol doğrulamadır.",
      "WAF ek bir katmandır ve hatalı kodu düzeltmez; asıl çözüm kodda yapılır."
    ],
    quiz: [
      { q: "SQL injection'a karşı en etkili savunma hangisidir?", options: ["Parametreli sorgu", "Sadece WAF", "Parolayı uzatmak", "HTTPS kullanmak"], answer: "Parametreli sorgu", why: "Veri sorgudan ayrı gönderildiği için komut olarak yorumlanmaz.", obj: "h1", whyNot: { "Sadece WAF": "WAF ek bir katmandır ama hatalı kodu düzeltmez; tek başına yeterli savunma sayılmaz.", "Parolayı uzatmak": "Uzun parola kimlik doğrulamayı güçlendirir; sorguya karışan girdiyi engellemez.", "HTTPS kullanmak": "HTTPS trafiği şifreler ama sunucuya giden zararlı girdi yine sorguya karışır." } },
      { q: "Başka kullanıcıların tarayıcısında çalışan zararlı JavaScript hangi saldırıdır?", options: ["XSS", "CSRF", "SSRF", "Buffer overflow"], answer: "XSS", why: "Cross-Site Scripting, zararlı betiği sayfaya yerleştirir.", obj: "h2", whyNot: { "CSRF": "CSRF betik çalıştırmaz; kullanıcının açık oturumunu kullanarak istek gönderir.", "SSRF": "SSRF sunucuyu iç ağa istek yaptırır; kurbanın tarayıcısıyla ilgisi yoktur.", "Buffer overflow": "Buffer overflow bellekte sığmayan veriyle bellek bozulması yaratır, web sayfasına betik koymak değildir." } },
      { q: "Kullanıcının açık oturumunu kullanarak istemeden işlem yaptırma hangisidir?", options: ["CSRF", "XSS", "Path traversal", "Replay"], answer: "CSRF", why: "Cross-Site Request Forgery, oturum çerezine güvenir. CSRF token önler.", obj: "h2", whyNot: { "XSS": "XSS sayfaya zararlı betik yerleştirir; CSRF ise betik gerektirmeden oturumun güvenine yaslanır.", "Path traversal": "Path traversal ../../ ile izinsiz dosya okur, kullanıcı oturumuyla işlem yaptırmaz.", "Replay": "Replay yakalanan mesajı yeniden gönderir; kullanıcının tarayıcısını kullanarak yeni istek yaptırmaz." } },
      { q: "../../etc/passwd gibi bir girdi hangi saldırıya işaret eder?", options: ["Path traversal", "SQL injection", "XSS", "DDoS"], answer: "Path traversal", why: "Dizin atlayarak izinsiz dosyaya erişmeye çalışır.", obj: "h3", whyNot: { "SQL injection": "SQL injection tırnak ve OR gibi ifadelerle sorguyu bozar; dizin atlama içermez.", "XSS": "XSS girdisi <script> gibi bir betik taşır, dosya yolu değil.", "DDoS": "DDoS çok kaynaktan yük bindirmektir; tek bir girdiyle dosya yolu denemek değildir." } },
      { q: "Saldırgan bir web uygulamasını, dışarıdan erişilemeyen iç ağdaki bir yönetim servisine istek göndermeye zorluyor. Bu hangisidir?", options: ["XSS", "CSRF", "SSRF", "Buffer overflow"], answer: "SSRF", why: "SSRF'te sunucu, saldırgan adına iç ağdaki kaynaklara istek yapmaya zorlanır.", obj: "h2", whyNot: { "XSS": "XSS zararlı betiği başka kullanıcının tarayıcısında çalıştırır; sunucunun iç ağa istek yapmasıyla ilgili değildir.", "CSRF": "CSRF isteği kullanıcının tarayıcısı ve oturumu üzerinden yaptırır; isteği yapan sunucu değildir.", "Buffer overflow": "Buffer overflow bellek taşmasıdır; sunucuya iç ağ isteği yaptırmak değildir." } }
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
    objectives: [
      { id: "h1", text: "Bir senaryodaki zafiyeti türüne (zero-day, yapılandırma hatası, end-of-life, tedarik zinciri) göre sınıflandırabilirsin." },
      { id: "h2", text: "CVE, CVSS, zafiyet taraması ve sızma testinin rollerini ayırt edebilirsin." },
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
      { q: "Üreticinin henüz bilmediği ve yaması olmayan zafiyet nasıl adlandırılır?", options: ["Zero-day", "End-of-life", "Misconfiguration", "False positive"], answer: "Zero-day", why: "Zero-day için yama yoktur; telafi edici kontroller gerekir.", obj: "h1", whyNot: { "End-of-life": "End-of-life, üreticinin artık yama yayımlamadığı eski sistemdir; burada sorun yamanın hiç var olmaması değil, üreticinin zafiyeti henüz bilmemesidir.", "Misconfiguration": "Yapılandırma hatası kurulum ayarının zayıf olmasıdır; üretici kodunda bilinmeyen bir açık anlamına gelmez.", "False positive": "False positive taramanın var olmayan bir açığı bildirmesidir; gerçek ve sömürülebilir bir zafiyeti anlatmaz." } },
      { q: "Zafiyetin şiddetini 0-10 arası puanlayan sistem hangisidir?", options: ["CVSS", "CVE", "SIEM", "DLP"], answer: "CVSS", why: "CVSS şiddet puanıdır, CVE ise kimlik.", obj: "h2", whyNot: { "CVE": "CVE zafiyete verilen benzersiz kimliktir (ör. CVE-2024-XXXXX); şiddeti puanlamaz.", "SIEM": "SIEM logları toplayıp ilişkilendiren izleme sistemidir, zafiyet puanlamaz.", "DLP": "DLP hassas verinin kurum dışına çıkışını engeller; zafiyet şiddetiyle ilgisi yoktur." } },
      { q: "Varsayılan parolanın değiştirilmemesi hangi zafiyet türüdür?", options: ["Yapılandırma hatası", "Zero-day", "Buffer overflow", "Tedarik zinciri"], answer: "Yapılandırma hatası", why: "Yazılımın kendisi değil, kurulum ayarı zayıftır.", obj: "h1", whyNot: { "Zero-day": "Zero-day üreticinin bilmediği kod zafiyetidir; varsayılan parola ise bilinen ve kurulumda düzeltilebilen bir ayar sorunudur.", "Buffer overflow": "Buffer overflow kod düzeyinde bir bellek hatasıdır; parolanın değiştirilmemesi kodla değil kurulumla ilgilidir.", "Tedarik zinciri": "Tedarik zinciri zafiyeti kullandığın kütüphane ya da sağlayıcıdan gelir; burada kendi kurulum ayarın unutulmuştur." } },
      { q: "Tarayıcının bulduğu ama gerçekte olmayan bir bulguya ne denir?", options: ["False positive", "False negative", "Zero-day", "Exploit"], answer: "False positive", why: "Sahte alarm; doğrulama gerekir.", obj: "h2", whyNot: { "False negative": "False negative taramanın var olan bir açığı kaçırmasıdır; sorudaki durumda ise olmayan bir açık bildiriliyor.", "Zero-day": "Zero-day gerçekten var olan ama bilinmeyen açıktır; tarayıcının uydurduğu bir bulgu değildir.", "Exploit": "Exploit, açığı sömüren koddur; bulgunun sahte olması anlamına gelmez." } },
      { q: "Üreticisi desteğini bitirdiği için artık hiç yama yayımlamayan bir işletim sistemi hangi zafiyet türüne örnektir?", options: ["End-of-life sistem", "Zero-day", "Yanlış pozitif", "Sızma testi"], answer: "End-of-life sistem", why: "Destek bitince yeni açıklar kapatılmaz; sistem ya yenilenir ya da ağdan izole edilir.", obj: "h1", whyNot: { "Zero-day": "Zero-day üreticinin henüz bilmediği açıktır; burada üretici ürünü bilerek yamasız bırakmıştır.", "Yanlış pozitif": "Yanlış pozitif taramanın hatalı alarmıdır; destek bitmesi gerçek bir durumdur.", "Sızma testi": "Sızma testi bir güvenlik değerlendirme yöntemidir, zafiyet türü değildir." } },
      { q: "İki bulgu var: (A) iç ağdaki test makinesinde CVSS 9.8 ama bilinen sömürü yok; (B) internete açık müşteri portalında CVSS 7.5 ve internette çalışan sömürü kodu mevcut. Hangisi önce kapatılmalıdır?", options: ["B: dışa açık ve sömürüsü hazır", "A: çünkü puanı daha yüksek", "İkisi de aynı anda, sıra önemsiz", "Hangisinin yaması daha kolaysa o"], answer: "B: dışa açık ve sömürüsü hazır", why: "Öncelik yalnızca puana göre değil sömürü durumu, dışa açıklık ve varlık önemine göre belirlenir.", obj: "h3", whyNot: { "A: çünkü puanı daha yüksek": "CVSS tek ölçüt değildir; A iç ağda ve sömürüsüz olduğu için gerçek risk B'den düşüktür.", "İkisi de aynı anda, sıra önemsiz": "Kaynaklar sınırlıdır; gerçek riskine göre sıralamak zafiyet yönetiminin özüdür.", "Hangisinin yaması daha kolaysa o": "Yama kolaylığı planlamayı etkiler ama önceliği riskin kendisi belirler." } }
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
      { q: "İnternete açık web sunucusu hangi bölgeye yerleştirilir?", options: ["DMZ", "Yönetim ağı", "Kullanıcı ağı", "Air gap"], answer: "DMZ", why: "DMZ, dışarıdan erişilen servisleri iç ağdan ayırır.", obj: "h1", whyNot: { "Yönetim ağı": "Yönetim ağı yöneticilerin cihazlara eriştiği iç bölgedir; internete açık sunucuyu oraya koymak yönetim yüzeyini dışarı açar.", "Kullanıcı ağı": "Kullanıcı ağı çalışan bilgisayarlarının bölgesidir; dışarıdan erişilen sunucu burada ele geçerse doğrudan çalışan makinelerine ulaşılır.", "Air gap": "Air gap sistemi ağdan tamamen ayırır; internete hizmet verecek web sunucusuyla bağdaşmaz." } },
      { q: "Segmentasyonun temel güvenlik faydası nedir?", options: ["Saldırının yayılmasını sınırlar", "İnterneti hızlandırır", "Parolayı güçlendirir", "Lisans maliyetini düşürür"], answer: "Saldırının yayılmasını sınırlar", why: "Bir bölge ele geçirilse bile diğerlerine yatay hareket zorlaşır.", obj: "h1", whyNot: { "İnterneti hızlandırır": "Segmentasyon trafiği kurala bağlar ve ayırır; hız kazandırmak amacı değildir.", "Parolayı güçlendirir": "Parola gücü kimlik doğrulama konusudur; ağı bölmek parolayı etkilemez.", "Lisans maliyetini düşürür": "Segmentasyon ek tasarım ve kural yönetimi getirir; amacı maliyet değil ihlalin etkisini küçültmektir." } },
      { q: "Kritik bir sistemi ağdan fiziksel olarak tamamen ayırmak hangisidir?", options: ["Air gap", "DMZ", "VLAN", "NAT"], answer: "Air gap", why: "Hava boşluğu, sistemin hiçbir ağa bağlı olmaması anlamına gelir.", obj: "h2", whyNot: { "DMZ": "DMZ ağa bağlı kalan ama iç ağdan ayrılmış tampon bölgedir; sistem hâlâ ağdadır.", "VLAN": "VLAN mantıksal ayrımdır; cihazlar aynı fiziksel altyapıda kalır ve ağa bağlıdır.", "NAT": "NAT adres çevirir; bir sistemi ağdan fiziksel olarak ayırmaz." } },
      { q: "Switch portuna izinsiz cihaz bağlanmasını engelleyen standart hangisidir?", options: ["802.1X", "NTP", "SNMP", "DHCP"], answer: "802.1X", why: "Port tabanlı kimlik doğrulama sağlar.", obj: "h3", whyNot: { "NTP": "NTP cihazların saatlerini eşitler; switch portuna kimin bağlanacağını denetlemez.", "SNMP": "SNMP cihazları izlemek ve yönetmek için kullanılır; port erişimini kimlik doğrulamasıyla sınırlamaz.", "DHCP": "DHCP IP adresi dağıtır; izinsiz cihaz da adres alabilir, kimlik sormaz." } },
      { q: "İki VLAN tanımlandı ama aralarında hiçbir ACL ya da güvenlik duvarı kuralı yok. Güvenlik açısından durum nedir?", options: ["Ayrım göstermeliktir; yönlendirme filtrelenmediği için trafik VLAN'lar arasında geçebilir", "VLAN'lar kendiliğinden tam yalıtım sağlar", "Trafik yalnızca şifreliyse geçebilir", "Yalnızca fiziksel kablo ayrıysa sorun olur"], answer: "Ayrım göstermeliktir; yönlendirme filtrelenmediği için trafik VLAN'lar arasında geçebilir", why: "Çözüm VLAN'ı ACL ya da firewall kuralıyla birlikte kullanmaktır.", obj: "h2", whyNot: { "VLAN'lar kendiliğinden tam yalıtım sağlar": "VLAN yalnızca mantıksal ayrım sağlar; aralarındaki trafik filtrelenmezse yönlendirme ile geçer.", "Trafik yalnızca şifreliyse geçebilir": "Şifreleme VLAN'lar arası geçişi engellemez; geçişi kurallar belirler.", "Yalnızca fiziksel kablo ayrıysa sorun olur": "Sorun fiziksel kabloyla değil, VLAN'lar arasında filtre olmamasıyla ilgilidir." } },
      { q: "Yönetilen sunuculara erişimin tek ve izlenen bir noktadan yapılmasını sağlayan sistem hangisidir?", options: ["Bastion host (jump server)", "Honeypot", "Air gap", "Stateless paket filtresi"], answer: "Bastion host (jump server)", why: "Yönetim erişimi tek noktada toplandığı için kayıt tutmak ve kısıtlamak kolaylaşır.", obj: "h3", whyNot: { "Honeypot": "Honeypot saldırganı çekip izlemek için kurulmuş tuzaktır; yöneticilerin giriş noktası değildir.", "Air gap": "Air gap sistemi ağdan tamamen koparır; yönetim erişimini tek noktada toplamaz.", "Stateless paket filtresi": "Paket filtresi trafiğe izin verir ya da engeller; yönetici oturumlarını izleyen giriş noktası değildir." } }
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

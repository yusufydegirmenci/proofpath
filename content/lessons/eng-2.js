/* İngilizce (iş ve BT) · sabit dersler 7-11 */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).eng = (window.PP_LESSONS.eng || {}));
  var BBC = { title: "BBC Learning English (ücretsiz ders ve podcast)", url: "https://www.bbc.co.uk/learningenglish", type: "kurs", level: "başlangıç", lang: "EN" };
  var BC = { title: "British Council LearnEnglish (ücretsiz alıştırmalar)", url: "https://learnenglish.britishcouncil.org/", type: "kurs", level: "başlangıç", lang: "EN" };
  var CAM = { title: "Cambridge Dictionary (örnek cümleli sözlük)", url: "https://dictionary.cambridge.org/", type: "araç", level: "başlangıç", lang: "EN" };
  function res(a, why) { var o = {}; for (var k in a) o[k] = a[k]; o.why = why; return o; }

  /* 7 ───────────────────────────────────────────── Stand-up: dün / bugün / engel */
  L[7] = {
    hook: "Stand-up 30 saniyedir: dün ne yaptım, bugün ne yapacağım, beni ne durduruyor. Üç kalıp, hepsi bu.",
    homework: "Yarınki işin için 3 cümle yaz: 1 'Yesterday I ...', 1 'Today I will ...', 1 'I'm blocked by ...' (engel yoksa 'No blockers'). Sesli söyle, 30 saniyeyi geçme.",
    warmup: { words: [
      { word: "blocker", tr: "engel", pos: "noun", ex: "I have one blocker.", exTr: "Bir engelim var.", use: "Stand-up'ta", level: "B1" },
      { word: "in progress", tr: "devam ediyor", pos: "phrase", ex: "The migration is in progress.", exTr: "Geçiş devam ediyor.", use: "Durum bildirirken", level: "A2" },
      { word: "wait for", tr: "beklemek", pos: "phrase", ex: "I'm waiting for access.", exTr: "Erişimi bekliyorum.", use: "Engeli anlatırken", level: "A2" }
    ] },
    blocks: [
      { t: "h", text: "Durum" },
      { t: "box", h: "Gerçek durum", text: "Sabah 9:15, ekip online toplantıda. Sıra sende: 'Yusuf, your update?' Herkes 30 saniye bekliyor. Ezberlenmiş bir kalıbın varsa panik olmaz." },
      { t: "h", text: "Üç parçalı kalıp" },
      { t: "steps", h: "Dün – Bugün – Engel", items: [
        "Dün (past simple): 'Yesterday I fixed the VPN issue and updated two laptops.'",
        "Bugün (will / I'm going to): 'Today I'll work on the switch upgrade.'",
        "Engel: 'I'm waiting for approval from security.' ya da 'No blockers.'"
      ] },
      { t: "split", tr: "Bugün yeni bir yazıcı kuracağım.", parts: [
        { tr: "bugün", q: "Ne zaman?", en: "Today" },
        { tr: "ben ...-eceğim", q: "Gelecek niyet", en: "I'll" },
        { tr: "kurmak", q: "Ne yapacağım?", en: "set up" },
        { tr: "yeni bir yazıcı", q: "Ne?", en: "a new printer" }
      ], result: "Today I'll set up a new printer." },
      { t: "h", text: "Durum bildirme kalıpları" },
      { t: "steps", h: "Kopyala ve uyarla", items: [
        "It's done. / It's finished. (Bitti.)",
        "It's in progress. (Devam ediyor.)",
        "It's almost ready. (Neredeyse hazır.)",
        "I'm stuck on ___. (___ konusunda takıldım.)",
        "I need help with ___. (___ için yardıma ihtiyacım var.)",
        "I'll let you know by ___. (___ kadar haber veririm.)"
      ] },
      { t: "warn", h: "Sık hata", text: "'Yesterday I fix the VPN' yanlış. Dün = geçmiş zaman: 'fixed'. 'Tomorrow I will to fix' da yanlış: will'den sonra 'to' gelmez." }
    ],
    story: { title: "Sabah toplantısı", text: "Mina: 'Yesterday I reset five passwords and installed updates on the file server. Today I will replace a broken monitor. I have one blocker: I'm waiting for a new cable from the warehouse.'", question: "What is Mina's blocker? (İngilizce cevapla)" },
    quiz: [
      { q: "'Dün iki laptop güncelledim.' hangisidir?", options: ["Yesterday I updated two laptops.", "Yesterday I update two laptops.", "Yesterday I will update two laptops.", "Yesterday I am updating two laptops."], answer: "Yesterday I updated two laptops.", why: "'Yesterday' ile past simple kullanılır: updated." },
      { q: "'Onay bekliyorum.' hangisidir?", options: ["I'm waiting for approval.", "I wait to approval.", "I'm wait approval.", "I waiting approval."], answer: "I'm waiting for approval.", why: "'wait for' kalıbı ve şimdiki devam eden durum: I'm waiting for." },
      { q: "Engelin yoksa ne dersin?", options: ["No blockers.", "I have blocker none.", "Blockers no have.", "Not blocker."], answer: "No blockers.", why: "Kısa ve doğal: 'No blockers.'" },
      { q: "'Bugün sunucuyu yeniden başlatacağım.' hangisidir?", options: ["Today I'll restart the server.", "Today I restarted the server.", "Today I'll to restart the server.", "Today I restart will the server."], answer: "Today I'll restart the server.", why: "will'den sonra fiil yalın: I'll restart." }
    ],
    interview: [
      { q: "How do you give a daily update?", a: "I keep it short. I say what I did yesterday, what I will do today, and if anything blocks me. For example: Yesterday I fixed the VPN issue. Today I'll upgrade the switch. I'm waiting for approval from security." },
      { q: "What do you do when you are blocked?", a: "I say it clearly in the stand-up, I explain what I need and from whom, and I give a date. Then I move to another task so I don't lose time." }
    ],
    vocab: [
      { term: "Update", tr: "durum güncellemesi", ex: "Here is my update." },
      { term: "Blocker", tr: "engel", ex: "No blockers today." },
      { term: "Approval", tr: "onay", ex: "We need approval." },
      { term: "Schedule", tr: "planlamak / takvim", ex: "I scheduled the upgrade." },
      { term: "Priority", tr: "öncelik", ex: "This is high priority." },
      { term: "Handover", tr: "devir teslim", ex: "I wrote a handover note." }
    ],
    resources: [
      res(BBC, "Günlük iş konuşmaları ve kısa dinlemeler"),
      res(BC, "Toplantı ve iş İngilizcesi alıştırmaları")
    ],
    sources: [{ title: "British Council LearnEnglish", url: "https://learnenglish.britishcouncil.org/" }]
  };

  /* 8 ───────────────────────────────────────────── Toplantıda anlamadığını söylemek */
  L[8] = {
    hook: "Anlamadığını söylemek zayıflık değil, profesyonelliktir. Doğru kalıpla bunu nazikçe yaparsın.",
    homework: "Aşağıdaki 5 kalıbı not kartına yaz ve gün içinde 3 kez gerçek bir İngilizce videoda duraklatıp 'Could you repeat that?' diye sesli söyle.",
    warmup: { words: [
      { word: "repeat", tr: "tekrar etmek", pos: "verb", ex: "Could you repeat that?", exTr: "Tekrar eder misiniz?", use: "Duymadığında", level: "A1" },
      { word: "clarify", tr: "netleştirmek", pos: "verb", ex: "Can you clarify the deadline?", exTr: "Son tarihi netleştirir misiniz?", use: "Belirsizlikte", level: "B1" },
      { word: "slow down", tr: "yavaşlamak", pos: "phrase", ex: "Could you slow down a little?", exTr: "Biraz yavaşlar mısınız?", use: "Hızlı konuşana", level: "A2" }
    ] },
    blocks: [
      { t: "h", text: "Durum" },
      { t: "box", h: "Gerçek durum", text: "Toplantıda biri hızlı konuşuyor, bir kelimeyi kaçırdın. Susarsan yanlış anlarsın. Doğru kalıpla sorarsan herkes aynı şeyi merak ediyordur." },
      { t: "h", text: "Üç durum, üç kalıp" },
      { t: "steps", h: "Duymadım / Anlamadım / Emin değilim", items: [
        "Duymadım: 'Sorry, could you repeat that, please?'",
        "Anlamadım: 'I'm not sure I understand. Could you explain that again?'",
        "Hızlı konuşuyor: 'Could you speak a bit more slowly, please?'",
        "Doğrulama: 'Just to confirm, you mean ___?'",
        "Yazıyla: 'Could you put that in the chat?'"
      ] },
      { t: "split", tr: "Son tarihi tekrar söyler misiniz?", parts: [
        { tr: "...-ebilir misiniz (rica)", q: "Nazik rica", en: "Could you" },
        { tr: "tekrar etmek", q: "Ne yapsın?", en: "repeat" },
        { tr: "son tarihi", q: "Neyi?", en: "the deadline" },
        { tr: "lütfen", q: "Nezaket", en: "please" }
      ], result: "Could you repeat the deadline, please?" },
      { t: "box", h: "Neden 'Could'?", text: "'Can you' de olur ama 'Could you' daha nazik. Toplantıda ve müşteriyle hep 'Could you' kullan." },
      { t: "warn", h: "Sık hata", text: "'What?' tek başına kaba duyulur. 'Sorry?' veya 'Pardon?' kullan. 'I don't understand you' kişiye suçlama gibi gelir; 'I didn't catch that' daha yumuşaktır." }
    ],
    story: { title: "Kaçırılan tarih", text: "Online toplantıda yönetici hızlı konuştu: 'We need the report by Thursday.' Selin 'Thursday' kelimesini duymadı. Sessiz kalmadı: 'Sorry, I didn't catch the day. Could you repeat it?' Yönetici güldü ve tekrar etti.", question: "What did Selin say? (İngilizce cevapla)" },
    quiz: [
      { q: "Duymadığında en nazik seçenek hangisi?", options: ["Sorry, could you repeat that, please?", "What?", "Say again.", "I don't hear."], answer: "Sorry, could you repeat that, please?", why: "'Could you ... please?' nazik ve profesyonel." },
      { q: "'Yani şunu mu demek istiyorsun?' doğrulaması hangisi?", options: ["Just to confirm, you mean the Friday deadline?", "You mean Friday I?", "Confirm you Friday?", "Is Friday you?"], answer: "Just to confirm, you mean the Friday deadline?", why: "'Just to confirm' doğrulama için standart kalıptır." },
      { q: "'Biraz yavaş konuşur musunuz?' hangisi?", options: ["Could you speak a bit more slowly?", "Speak slow please you.", "You speak slowly can?", "Make slow your speak."], answer: "Could you speak a bit more slowly?", why: "'speak more slowly' doğru kalıp." },
      { q: "'I didn't catch that.' ne demek?", options: ["Duymadım / anlayamadım.", "Onu yakalayamadım (fiziksel).", "Katılmıyorum.", "Bitirdim."], answer: "Duymadım / anlayamadım.", why: "'catch' burada 'duyup anlamak' anlamında." }
    ],
    interview: [
      { q: "What do you do if you don't understand something in a meeting?", a: "I ask politely. I say, Sorry, could you repeat that, please? Then I confirm: Just to confirm, you mean ...? I also write a short summary after the meeting so everyone agrees." },
      { q: "How do you handle a language difficulty?", a: "I prepare key words before the meeting, I ask people to speak a little slower when needed, and I use the chat to confirm numbers and dates." }
    ],
    vocab: [
      { term: "Repeat", tr: "tekrar etmek", ex: "Could you repeat that?" },
      { term: "Clarify", tr: "netleştirmek", ex: "Let me clarify." },
      { term: "Catch", tr: "duyup anlamak", ex: "I didn't catch that." },
      { term: "Summary", tr: "özet", ex: "I'll send a summary." },
      { term: "Confirm", tr: "doğrulamak", ex: "Just to confirm..." },
      { term: "Misunderstanding", tr: "yanlış anlama", ex: "It was a misunderstanding." }
    ],
    resources: [
      res(BBC, "Toplantı ve iş konuşması dinleme pratiği"),
      res(BC, "Dinleme ve konuşma alıştırmaları")
    ],
    sources: [{ title: "BBC Learning English", url: "https://www.bbc.co.uk/learningenglish" }]
  };

  /* 9 ───────────────────────────────────────────── Teknik kelimeler (IT) */
  L[9] = {
    hook: "BT İngilizcesinde 40-50 kelime işin %80'ini kapatır. Önce bunları cümle içinde öğren, listeyle değil.",
    homework: "Aşağıdaki kelimelerden 10'unu seç, her biri için kendi işinden bir cümle yaz. Örn: 'I reset the password for the user.'",
    warmup: { words: [
      { word: "issue", tr: "sorun", pos: "noun", ex: "There is an issue with the VPN.", exTr: "VPN'de bir sorun var.", use: "Sorun bildirirken", level: "A2" },
      { word: "install", tr: "kurmak", pos: "verb", ex: "I installed the update.", exTr: "Güncellemeyi kurdum.", use: "Yazılım işlerinde", level: "A2" },
      { word: "restart", tr: "yeniden başlatmak", pos: "verb", ex: "Please restart your laptop.", exTr: "Lütfen laptopunu yeniden başlat.", use: "Kullanıcıya adım verirken", level: "A2" }
    ] },
    blocks: [
      { t: "h", text: "Durum" },
      { t: "box", h: "Gerçek durum", text: "Yabancı bir meslektaşın 'The server is down, please check the logs and restart the service' diyor. Bu cümledeki üç teknik kelimeyi bilmezsen iş durur." },
      { t: "h", text: "Çekirdek kelimeler (gruplar halinde)" },
      { t: "steps", h: "Ağ ve erişim", items: [
        "network (ağ), connection (bağlantı), router, switch, firewall",
        "login / log in (giriş yapmak), password (parola), account (hesap), access (erişim)",
        "permission (yetki), reset (sıfırlamak), locked (kilitli), username"
      ] },
      { t: "steps", h: "Donanım ve yazılım", items: [
        "device, laptop, monitor, printer, cable, battery",
        "install (kurmak), uninstall (kaldırmak), update (güncellemek), upgrade (sürüm yükseltmek)",
        "configure (yapılandırmak), settings (ayarlar), version (sürüm)"
      ] },
      { t: "steps", h: "Sorun ve çözüm", items: [
        "issue / problem (sorun), error (hata), crash (çökmek), freeze (donmak), slow (yavaş)",
        "check (kontrol etmek), troubleshoot (sorun gidermek), fix (düzeltmek), restart (yeniden başlatmak)",
        "workaround (geçici çözüm), root cause (kök neden), resolved (çözüldü)"
      ] },
      { t: "split", tr: "Kullanıcı ağa bağlanamıyor.", parts: [
        { tr: "kullanıcı", q: "Kim?", en: "The user" },
        { tr: "...-emiyor (yapamıyor)", q: "Ne durumda?", en: "can't" },
        { tr: "bağlanmak", q: "Ne yapamıyor?", en: "connect" },
        { tr: "ağa", q: "Nereye?", en: "to the network" }
      ], result: "The user can't connect to the network." },
      { t: "warn", h: "Sık karışan çiftler", text: "update (küçük yama) ≠ upgrade (büyük sürüm). install = kurmak, setup = hazırlayıp çalışır hale getirmek. log in (fiil, iki kelime) ≠ login (isim: giriş ekranı)." }
    ],
    story: { title: "Yavaş laptop", text: "A user says: 'My laptop is very slow and it freezes when I open Excel.' Ahmet checks the settings, finds an old update and installs it. Then he restarts the laptop. The problem is resolved.", question: "What did Ahmet do first? (İngilizce cevapla)" },
    quiz: [
      { q: "'Sorun gidermek' için doğru fiil hangisi?", options: ["troubleshoot", "trouble", "shootrouble", "problemize"], answer: "troubleshoot", why: "Troubleshoot = sorunu bulup gidermek." },
      { q: "'Parolayı sıfırladım.' hangisi?", options: ["I reset the password.", "I resetted the password.", "I reseted password.", "I am reset the password."], answer: "I reset the password.", why: "'reset' düzensiz: reset – reset – reset." },
      { q: "'Geçici çözüm' İngilizcede nedir?", options: ["workaround", "workstation", "homework", "fixwork"], answer: "workaround", why: "Workaround: asıl çözüm gelene kadar kullanılan geçici yol." },
      { q: "Bir uygulama aniden kapandı. Hangi kelime uyar?", options: ["crash", "install", "upgrade", "permission"], answer: "crash", why: "Crash = çökmek." },
      { q: "'The user can't ___ in.' boşluğa ne gelir?", options: ["log", "login", "logged", "logging"], answer: "log", why: "Fiil olarak 'log in': can't log in." }
    ],
    interview: [
      { q: "What tools do you use to troubleshoot a network problem?", a: "First I check the physical connection and the IP settings. Then I use ping and traceroute to find where the connection stops. If needed, I check the logs and the firewall rules." },
      { q: "Explain the difference between update and upgrade.", a: "An update is a small change, like a security patch. An upgrade moves to a new major version, for example from one operating system version to the next." }
    ],
    vocab: [
      { term: "Issue", tr: "sorun", ex: "There is an issue." },
      { term: "Error", tr: "hata", ex: "The error message says access denied." },
      { term: "Install", tr: "kurmak", ex: "Install the update." },
      { term: "Configure", tr: "yapılandırmak", ex: "I configured the router." },
      { term: "Workaround", tr: "geçici çözüm", ex: "Here is a workaround." },
      { term: "Root cause", tr: "kök neden", ex: "We found the root cause." },
      { term: "Permission", tr: "yetki", ex: "You need permission." },
      { term: "Resolve", tr: "çözmek", ex: "The ticket is resolved." }
    ],
    resources: [
      res(CAM, "Her kelimenin örnek cümlesi ve sesli okunuşu"),
      res(BBC, "'English at Work' gibi iş İngilizcesi dizileri")
    ],
    sources: [{ title: "Cambridge Dictionary", url: "https://dictionary.cambridge.org/" }]
  };

  /* 10 ──────────────────────────────────────────── Hata anlatmak (bug report) */
  L[10] = {
    hook: "İyi bir hata raporu 4 soruya cevap verir: ne bekledim, ne oldu, nasıl tekrarlanır, nerede oldu.",
    homework: "Son yaşadığın bir hatayı 5 maddelik bir rapora çevir: title, steps to reproduce, expected result, actual result, environment. İngilizce yaz.",
    warmup: { words: [
      { word: "reproduce", tr: "tekrar üretmek", pos: "verb", ex: "I can reproduce the error.", exTr: "Hatayı tekrar üretebiliyorum.", use: "Rapor yazarken", level: "B1" },
      { word: "expected", tr: "beklenen", pos: "adj", ex: "Expected result: the page opens.", exTr: "Beklenen sonuç: sayfa açılır.", use: "Rapor başlığı", level: "B1" },
      { word: "actual", tr: "gerçekleşen", pos: "adj", ex: "Actual result: error 500.", exTr: "Gerçekleşen sonuç: 500 hatası.", use: "Rapor başlığı", level: "B1" }
    ] },
    blocks: [
      { t: "h", text: "Durum" },
      { t: "box", h: "Gerçek durum", text: "Yazılım ekibine 'It doesn't work' yazarsan cevap gelmez. 'When I click Save, I get error 500' yazarsan 5 dakikada çözüm gelir. Fark: net ve yapılandırılmış anlatım." },
      { t: "h", text: "Rapor iskeleti" },
      { t: "steps", h: "Kopyalanabilir şablon", items: [
        "Title: Short and clear. (Örn: 'VPN disconnects after 5 minutes')",
        "Steps to reproduce: 1) Open the VPN client 2) Connect 3) Wait 5 minutes",
        "Expected result: The connection stays active.",
        "Actual result: The connection drops and shows error 809.",
        "Environment: Windows 11, VPN client 5.2, home Wi-Fi.",
        "Extra: Screenshot attached. It started after the last update."
      ] },
      { t: "split", tr: "Kaydet düğmesine tıklayınca hata alıyorum.", parts: [
        { tr: "tıkladığımda", q: "Ne zaman?", en: "When I click" },
        { tr: "Kaydet düğmesine", q: "Neye?", en: "Save" },
        { tr: "hata alıyorum", q: "Ne oluyor?", en: "I get an error" }
      ], result: "When I click Save, I get an error." },
      { t: "h", text: "Faydalı kalıplar" },
      { t: "steps", h: "Hazır cümleler", items: [
        "It started after ___. (___ sonrasında başladı.)",
        "It happens every time / sometimes. (Her seferinde / ara sıra oluyor.)",
        "I can't reproduce it anymore. (Artık tekrar üretemiyorum.)",
        "It only happens on ___. (Sadece ___ üzerinde oluyor.)",
        "The error message says '___'. (Hata mesajı '___' diyor.)",
        "I have already tried restarting. (Yeniden başlatmayı denedim.)"
      ] },
      { t: "warn", h: "Sık hata", text: "'It is not working' çok belirsiz. Neyin, ne zaman, hangi mesajla çalışmadığını yaz. Hata mesajını kelimesi kelimesine kopyala, özetleme." }
    ],
    story: { title: "Eksik bilgi", text: "Can writes: 'The app is broken.' The developer asks: 'What do you see when you open it? Which version? Can you send a screenshot?' Can rewrites the report with steps, the error message and a screenshot. The developer finds the cause in ten minutes.", question: "Why did the developer ask questions? (İngilizce cevapla)" },
    quiz: [
      { q: "Raporda 'beklenen sonuç' için hangi başlık kullanılır?", options: ["Expected result", "Wanted ending", "Hope answer", "Future result"], answer: "Expected result", why: "Standart başlık: Expected result / Actual result." },
      { q: "'Güncellemeden sonra başladı.' hangisi?", options: ["It started after the update.", "It start after update.", "It starts before the update yesterday.", "It started from update after."], answer: "It started after the update.", why: "Geçmişte başladı: started + after the update." },
      { q: "Hata mesajı için en iyi yaklaşım hangisi?", options: ["Kelimesi kelimesine kopyalamak", "Kendi cümlenle özetlemek", "Sadece 'error' yazmak", "Hiç yazmamak"], answer: "Kelimesi kelimesine kopyalamak", why: "Kesin metin, aramak ve teşhis için en değerli bilgidir." },
      { q: "'Steps to reproduce' ne demek?", options: ["Hatayı tekrar oluşturma adımları", "Çözüm adımları", "Kurulum adımları", "Yedekleme adımları"], answer: "Hatayı tekrar oluşturma adımları", why: "Reproduce = tekrar üretmek; geliştirici bu adımlarla hatayı görür." }
    ],
    interview: [
      { q: "How do you report a bug to a development team?", a: "I write a clear title and list the steps to reproduce, the expected result and the actual result. I add the exact error message, the environment, and a screenshot. I also say how often it happens." },
      { q: "A user says 'it doesn't work'. What do you ask?", a: "I ask what they were doing, what they expected, and what they see now. I ask for the exact error message and a screenshot, and I check when it started." }
    ],
    vocab: [
      { term: "Bug", tr: "yazılım hatası", ex: "I found a bug." },
      { term: "Reproduce", tr: "tekrar üretmek", ex: "I can reproduce it." },
      { term: "Expected result", tr: "beklenen sonuç", ex: "Expected result: success page." },
      { term: "Actual result", tr: "gerçekleşen sonuç", ex: "Actual result: error." },
      { term: "Environment", tr: "ortam", ex: "Environment: Windows 11." },
      { term: "Screenshot", tr: "ekran görüntüsü", ex: "Screenshot attached." },
      { term: "Log", tr: "kayıt dosyası", ex: "Please send the logs." }
    ],
    resources: [
      res(CAM, "Kelimelerin doğru kullanımını örneklerle görmek için"),
      res(BC, "Resmi yazı ve rapor yazma alıştırmaları")
    ],
    sources: [{ title: "British Council LearnEnglish", url: "https://learnenglish.britishcouncil.org/" }]
  };

  /* 11 ──────────────────────────────────────────── Mülakat: kendimi anlatırım */
  L[11] = {
    hook: "'Tell me about yourself' sorusu 60 saniyedir: şimdi, geçmiş, gelecek. Hazır bir iskelet seni kurtarır.",
    homework: "Aşağıdaki iskeleti kendi bilginle doldur, 60 saniyelik metni yaz. Telefonla kaydet, dinle, iki kez daha kısalt. Sonra ezber değil, anahtar kelimelerle anlat.",
    warmup: { words: [
      { word: "experience", tr: "deneyim", pos: "noun", ex: "I have two years of experience.", exTr: "İki yıllık deneyimim var.", use: "Mülakatta", level: "A2" },
      { word: "strength", tr: "güçlü yön", pos: "noun", ex: "My strength is troubleshooting.", exTr: "Güçlü yönüm sorun gidermek.", use: "Mülakatta", level: "B1" },
      { word: "goal", tr: "hedef", pos: "noun", ex: "My goal is to become a network engineer.", exTr: "Hedefim ağ mühendisi olmak.", use: "Gelecek planı", level: "A2" }
    ] },
    blocks: [
      { t: "h", text: "Durum" },
      { t: "box", h: "Gerçek durum", text: "Mülakatın ilk sorusu: 'Tell me about yourself.' Amaç hayat hikâyen değil; bu role neden uygun olduğunu 1 dakikada göstermek." },
      { t: "h", text: "Şimdi – Geçmiş – Gelecek" },
      { t: "steps", h: "60 saniyelik iskelet", items: [
        "Şimdi (present): 'I work as an IT support specialist. I look after users, computers and the network.'",
        "Geçmiş (past): 'Before that, I studied computer technology and I did an internship where I learned Windows and basic networking.'",
        "Güçlü yön: 'I'm good at troubleshooting and explaining problems in a simple way.'",
        "Gelecek (hedef): 'I'm now studying for the CCNA because I want to grow into network engineering. That's why this role interests me.'"
      ] },
      { t: "split", tr: "CCNA için çalışıyorum çünkü ağ mühendisi olmak istiyorum.", parts: [
        { tr: "çalışıyorum (şu an)", q: "Şu an ne yapıyorum?", en: "I'm studying" },
        { tr: "CCNA için", q: "Ne için?", en: "for the CCNA" },
        { tr: "çünkü", q: "Neden?", en: "because" },
        { tr: "... olmak istiyorum", q: "Hedef", en: "I want to become a network engineer" }
      ], result: "I'm studying for the CCNA because I want to become a network engineer." },
      { t: "h", text: "Hazır cümleler" },
      { t: "steps", h: "Kopyala ve uyarla", items: [
        "I have ___ years of experience in ___.",
        "In my last job, I was responsible for ___.",
        "One thing I'm proud of is ___.",
        "I learn quickly and I like solving problems.",
        "I'm looking for a role where I can ___.",
        "That's why I'm interested in this position."
      ] },
      { t: "warn", h: "Sık hata", text: "'I am working since 2 years' yanlış. Doğrusu: 'I have been working for two years' (veya basit: 'I have two years of experience'). Çok uzun cevap verme, 60-90 saniyeyi geçme." }
    ],
    story: { title: "Mülakat sabahı", text: "Deniz prepares an answer for the first question. She writes three parts: what she does now, what she studied before, and what she wants next. In the interview she speaks for one minute. The manager nods and asks about her CCNA study plan.", question: "What are the three parts of Deniz's answer? (İngilizce cevapla)" },
    quiz: [
      { q: "'Tell me about yourself' cevabında en iyi yapı hangisi?", options: ["Şimdi – geçmiş – hedef", "Doğumdan bugüne tüm hayat", "Sadece hobiler", "Sadece maaş beklentisi"], answer: "Şimdi – geçmiş – hedef", why: "Kısa ve role bağlı kalan yapı: şimdi, geçmiş, gelecek hedef." },
      { q: "'İki yıllık deneyimim var.' hangisi?", options: ["I have two years of experience.", "I am two years experience.", "I have experience of two year.", "I had two years experience now."], answer: "I have two years of experience.", why: "'have ... years of experience' standart kalıptır." },
      { q: "'Güçlü yönüm sorun gidermek.' hangisi?", options: ["My strength is troubleshooting.", "My strong is troubleshoot.", "I strength troubleshooting.", "Strength mine troubleshooting."], answer: "My strength is troubleshooting.", why: "Strength (isim) + is + isim/ing." },
      { q: "Cevap süresi kaç saniye civarı olmalı?", options: ["60-90 saniye", "5 saniye", "10 dakika", "30 dakika"], answer: "60-90 saniye", why: "Kısa, net ve etkileyici. Detay için ek soru gelir." }
    ],
    interview: [
      { q: "Tell me about yourself.", a: "I work as an IT support specialist. I look after users, computers and the network. Before that, I studied computer technology and did an internship. I'm good at troubleshooting and explaining problems simply. Now I'm studying for the CCNA because I want to grow into network engineering, and that's why this role interests me." },
      { q: "What is your biggest strength?", a: "My biggest strength is troubleshooting. I stay calm, I check things step by step, and I document the solution so the team can reuse it." },
      { q: "Where do you see yourself in five years?", a: "I see myself as a network engineer who designs and improves networks, and who also helps junior colleagues learn." }
    ],
    vocab: [
      { term: "Experience", tr: "deneyim", ex: "I have experience in IT." },
      { term: "Strength", tr: "güçlü yön", ex: "My strength is communication." },
      { term: "Weakness", tr: "gelişim alanı", ex: "A weakness I'm working on is public speaking." },
      { term: "Responsible for", tr: "...ten sorumlu", ex: "I was responsible for backups." },
      { term: "Goal", tr: "hedef", ex: "My goal is the CCNA." },
      { term: "Position", tr: "pozisyon", ex: "I'm interested in this position." }
    ],
    resources: [
      res(BC, "İş mülakatı konuşma alıştırmaları"),
      res(BBC, "Mülakat İngilizcesi ve kısa dinlemeler")
    ],
    sources: [{ title: "British Council LearnEnglish", url: "https://learnenglish.britishcouncil.org/" }]
  };
})();

/* İngilizce (iş ve BT) · sabit dersler 1-6
 * Hedef: IT destek / sistem işlerinde çalışacak Türkçe konuşan başlangıç düzeyi.
 * Her derste: durum, hazır cümleler, kalıp kurma (split), quiz, mülakat cevabı, kelimeler. */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).eng = (window.PP_LESSONS.eng || {}));
  var BBC = { title: "BBC Learning English (ücretsiz ders ve podcast)", url: "https://www.bbc.co.uk/learningenglish", type: "kurs", level: "başlangıç", lang: "EN" };
  var BC = { title: "British Council LearnEnglish (ücretsiz alıştırmalar)", url: "https://learnenglish.britishcouncil.org/", type: "kurs", level: "başlangıç", lang: "EN" };
  var CAM = { title: "Cambridge Dictionary (örnek cümleli sözlük)", url: "https://dictionary.cambridge.org/", type: "araç", level: "başlangıç", lang: "EN" };
  function res(a, why) { var o = {}; for (var k in a) o[k] = a[k]; o.why = why; return o; }

  /* 1 ───────────────────────────────────────────── Tanışma ve kendini tanıtma */
  L[1] = {
    hook: "Kendini tanıtmak 3 cümleyle başlar: kimsin, ne iş yapıyorsun, nerede yaşıyorsun. Bu üçü yeter.",
    homework: "Kendini 5 cümleyle yaz: adın, işin, şehrin, ne öğrendiğin, hedefin. Sonra aynadan sesli oku. Kendini telefonla kaydedip dinle.",
    warmup: {
      words: [
        { word: "introduce", tr: "tanıtmak", pos: "verb", ex: "Let me introduce myself.", exTr: "Kendimi tanıtayım.", use: "Toplantıda ilk söz", level: "A1" },
        { word: "colleague", tr: "iş arkadaşı", pos: "noun", ex: "This is my colleague, Elif.", exTr: "Bu iş arkadaşım Elif.", use: "İş yerinde", level: "A2" },
        { word: "responsible for", tr: "...ten sorumlu", pos: "phrase", ex: "I am responsible for the network.", exTr: "Ağdan sorumluyum.", use: "Görevini anlatırken", level: "A2" }
      ]
    },
    blocks: [
      { t: "h", text: "Durum" },
      { t: "box", h: "Gerçek durum", text: "Yeni bir şirkette ilk gün. Bir iş arkadaşı sana 'Hi, I'm Mark. Nice to meet you!' diyor. Ya da online toplantıda 'Could you introduce yourself?' diye soruluyor. 20 saniyede kendini net ve rahat tanıtabilmen gerekiyor." },
      { t: "h", text: "Kendini tanıtma formülü" },
      { t: "steps", h: "3 cümlelik formül", items: [
        "1) İsmin: 'Hi, I'm Yusuf.' ya da 'My name is Yusuf.'",
        "2) İşin: 'I work as an IT administrator at a global company.'",
        "3) Yerin: 'I'm from Turkey and I live in Ankara.'",
        "Bonus: 'Nice to meet you.' ile bitir."
      ] },
      { t: "split", tr: "Ben bir BT yöneticisi olarak çalışıyorum.", parts: [
        { tr: "ben", q: "Kim?", en: "I" },
        { tr: "çalışıyorum (alışkanlık)", q: "Ne yapıyorum?", en: "work" },
        { tr: "... olarak", q: "Hangi sıfatla?", en: "as" },
        { tr: "bir BT yöneticisi", q: "Ne?", en: "an IT administrator" }
      ], result: "I work as an IT administrator." },
      { t: "h", text: "Hazır cümleler" },
      { t: "steps", h: "Kopyala ve kendine uyarla", items: [
        "Hi, I'm ___. (Merhaba, ben ___.)",
        "I work as ___ at ___. (___ şirketinde ___ olarak çalışıyorum.)",
        "I'm from Turkey. (Türkiye'denim.)",
        "I live in Ankara. (Ankara'da yaşıyorum.)",
        "I'm responsible for the network. (Ağdan sorumluyum.)",
        "I'm learning English to improve my career. (Kariyerimi geliştirmek için İngilizce öğreniyorum.)",
        "Nice to meet you. / Pleased to meet you. (Tanıştığımıza memnun oldum.)"
      ] },
      { t: "h", text: "Tanıştığında cevaplar" },
      { t: "steps", h: "Kısa diyalog", items: [
        "A: Hi, I'm Mark. Nice to meet you.",
        "B: Nice to meet you too, Mark. I'm Ayşe.",
        "A: Where are you from?",
        "B: I'm from Turkey. How about you?",
        "A: I'm from Germany. What do you do?",
        "B: I work in IT. I look after the network and the computers."
      ] },
      { t: "box", h: "Dikkat: am, is, are", text: "'I' ile 'am', 'he/she/it' ile 'is', 'you/we/they' ile 'are' kullanılır. 'I am from Ankara.' doğru, 'I from Ankara.' yanlıştır. Kısa yazım: I'm, he's, she's, you're." },
      { t: "warn", h: "Tuzak", text: "'I am 30 years old' diyebilirsin ama 'I have 30 years' diyemezsin. Yaş için 'be' fiili kullanılır. Ayrıca iş için 'I work as...' der, 'I work like...' demezsin." }
    ],
    story: { title: "Ayşe'nin ilk günü", text: "Ayşe bugün yeni bir şirkette başladı. Masasına oturdu. Yanındaki kişi gülümsedi: 'Hi, I'm Mark. I'm in the finance team. Nice to meet you!' Ayşe de gülümsedi: 'Hi, I'm Ayşe. I work as an IT support specialist. Nice to meet you too.'", question: "Ayşe'nin işi nedir? (İngilizce cevapla)" },
    quiz: [
      { q: "'I ___ from Turkey.' boşluğa hangisi gelir?", options: ["am", "is", "are", "be"], answer: "am", why: "'I' öznesiyle 'am' kullanılır." },
      { q: "'Bir BT yöneticisi olarak çalışıyorum.' cümlesinin İngilizcesi hangisidir?", options: ["I work as an IT administrator.", "I am work as an IT administrator.", "I works like IT administrator.", "I working IT administrator."], answer: "I work as an IT administrator.", why: "Alışkanlık ve meslek için present simple: I work as ..." },
      { q: "Biri 'Nice to meet you.' dedi. Doğal cevap hangisidir?", options: ["Nice to meet you too.", "I am fine, thanks.", "Yes, please.", "See you later."], answer: "Nice to meet you too.", why: "Aynı cümle karşılıklı söylenir: 'Nice to meet you too.'" },
      { q: "'Where are you from?' sorusuna hangi cevap uygundur?", options: ["I'm from Turkey.", "I'm fine.", "I'm 30 years old.", "I like pizza."], answer: "I'm from Turkey.", why: "'Where are you from?' nereli olduğunu sorar." },
      { q: "Hangisi doğru cümledir?", options: ["She is a network engineer.", "She are a network engineer.", "She am a network engineer.", "She be a network engineer."], answer: "She is a network engineer.", why: "'She' ile 'is' kullanılır." }
    ],
    interview: [
      { q: "Can you introduce yourself?", a: "Hello, my name is ___. I work as an IT administrator at a global company. I live in Ankara. I look after the network, the users and the computers. I'm learning English and networking to improve my career. Nice to meet you." },
      { q: "What do you do?", a: "I work in IT. I help users with their computers and I take care of the network." },
      { q: "Where are you from?", a: "I'm from Turkey. I live in Ankara." }
    ],
    vocab: [
      { term: "Nice to meet you", tr: "tanıştığımıza memnun oldum", ex: "Hi, I'm Yusuf. Nice to meet you." },
      { term: "Work as", tr: "... olarak çalışmak", ex: "I work as a system administrator." },
      { term: "Be from", tr: "... lı olmak", ex: "I'm from Turkey." },
      { term: "Look after", tr: "ilgilenmek, bakmak", ex: "I look after the network." },
      { term: "Team", tr: "takım", ex: "I'm in the IT team." },
      { term: "Company", tr: "şirket", ex: "I work at a global company." }
    ],
    resources: [
      res(BBC, "Basit tanışma kalıplarını dinleyerek öğren"),
      res(BC, "Tanışma ve selamlaşma alıştırmaları")
    ],
    sources: [{ title: "BBC Learning English", url: "https://www.bbc.co.uk/learningenglish" }]
  };

  /* 2 ───────────────────────────────────────────── Present simple */
  L[2] = {
    hook: "Present simple, 'her gün yaptıklarımın' zamanıdır: işin, alışkanlıkların ve değişmeyen gerçekler.",
    homework: "Bir iş gününü 6 cümleyle anlat: 'I start work at 9. I check the emails...' Sonra 3 tanesini 'he/she' ile yeniden yaz ve fiilin sonundaki -s'e dikkat et.",
    warmup: {
      recap: [
        { point: "Kendini tanıtırken 'I work as ...' kullanırız.", example: "I work as an IT administrator." }
      ],
      words: [
        { word: "usually", tr: "genellikle", pos: "adv", ex: "I usually start at 9.", exTr: "Genellikle 9'da başlarım.", use: "Alışkanlık", level: "A1" },
        { word: "check", tr: "kontrol etmek", pos: "verb", ex: "I check the emails.", exTr: "E-postaları kontrol ederim.", use: "Günlük işler", level: "A1" },
        { word: "every day", tr: "her gün", pos: "phrase", ex: "I reset passwords every day.", exTr: "Her gün parola sıfırlarım.", use: "Sıklık", level: "A1" }
      ]
    },
    blocks: [
      { t: "h", text: "Durum" },
      { t: "box", h: "Gerçek durum", text: "Yeni bir iş arkadaşın 'What do you do every day?' diye soruyor ya da mülakatta 'Tell me about your daily tasks.' diyorlar. İşini ve rutinini anlatman lazım." },
      { t: "h", text: "Ne zaman kullanılır?" },
      { t: "steps", h: "3 durum", items: [
        "Alışkanlık ve rutin: 'I check the emails every morning.'",
        "Değişmeyen gerçekler: 'The server runs on Linux.'",
        "Program ve tarifeler: 'The meeting starts at 10.'"
      ] },
      { t: "h", text: "Nasıl kurulur?" },
      { t: "steps", h: "Üç şekil", items: [
        "Olumlu: özne + fiil (he/she/it ile fiile -s/-es gelir). I work. / She works.",
        "Olumsuz: özne + do not (don't) / does not (doesn't) + fiil. I don't work. / She doesn't work.",
        "Soru: Do/Does + özne + fiil? Do you work? / Does she work?"
      ] },
      { t: "box", h: "Altın kural", text: "doesn't ve does'tan sonra fiil -s ALMAZ. Doğru: 'She doesn't work.' Yanlış: 'She doesn't works.'" },
      { t: "steps", h: "-s / -es ekleme", items: [
        "Çoğu fiil: work → works, check → checks (ama check: ch ile bitiyor → checks)",
        "-s, -sh, -ch, -x, -o ile bitenler: -es. watch → watches, fix → fixes, go → goes",
        "Ünsüz + y: y düşer, -ies gelir. study → studies",
        "Düzensiz: have → has"
      ] },
      { t: "h", text: "Sıklık zarfları" },
      { t: "steps", h: "Fiilden önce, 'be'den sonra", items: [
        "always (her zaman), usually (genellikle), often (sık sık), sometimes (bazen), rarely (nadiren), never (asla)",
        "I always lock my computer. (fiilden önce)",
        "He is never late. ('be'den sonra)"
      ] },
      { t: "split", tr: "Her gün parola sıfırlıyorum.", parts: [
        { tr: "ben", q: "Kim?", en: "I" },
        { tr: "sıfırlıyorum", q: "Ne yapıyorum?", en: "reset" },
        { tr: "parolaları", q: "Neyi?", en: "passwords" },
        { tr: "her gün", q: "Ne zaman?", en: "every day" }
      ], result: "I reset passwords every day." },
      { t: "h", text: "Hazır cümleler (BT işi)" },
      { t: "steps", h: "Kendi işine uyarla", items: [
        "I start work at 9 o'clock. (Saat 9'da işe başlarım.)",
        "I usually check the emails first. (Genellikle önce e-postalara bakarım.)",
        "I help users with their problems. (Kullanıcılara sorunlarında yardım ederim.)",
        "I don't work on weekends. (Hafta sonları çalışmam.)",
        "She monitors the servers. (O, sunucuları izler.)",
        "Does he reset passwords? (O parola sıfırlar mı?)"
      ] },
      { t: "warn", h: "Tuzak", text: "'I am work' yanlıştır, 'I work' doğrudur. 'Be' fiili ile asıl fiili aynı anda koyma. Ayrıca 'He work' yanlış, 'He works' doğru." }
    ],
    story: { title: "Tom'un iş günü", text: "Tom is an IT support specialist. He starts work at 9. He usually checks the tickets first. Then he helps users with their problems. He doesn't work on weekends.", question: "What does Tom do first? (İngilizce cevapla)" },
    quiz: [
      { q: "'She ___ the servers every day.' hangisi doğrudur?", options: ["monitor", "monitors", "monitoring", "is monitor"], answer: "monitors", why: "'She' ile present simple'da fiile -s gelir." },
      { q: "'He doesn't ___ on Sundays.' boşluğa hangisi gelir?", options: ["work", "works", "working", "worked"], answer: "work", why: "'doesn't'tan sonra fiil yalın halde kalır." },
      { q: "'Does she reset passwords?' sorusunun doğru kısa cevabı hangisidir?", options: ["Yes, she does.", "Yes, she resets.", "Yes, she is.", "Yes, she do."], answer: "Yes, she does.", why: "'Does' ile sorulan soruya 'does/doesn't' ile cevap verilir." },
      { q: "'always' sıklık zarfı cümlede nerede durur?", options: ["Ana fiilden önce", "Cümlenin sonunda zorunlu", "Ana fiilden sonra", "Fark etmez"], answer: "Ana fiilden önce", why: "I always check ... şeklinde, ana fiilden önce ('be'den sonra) kullanılır." },
      { q: "'fix' fiilinin 'he' ile hali nedir?", options: ["fixs", "fixes", "fixies", "fixing"], answer: "fixes", why: "-x ile biten fiillere -es gelir." }
    ],
    interview: [
      { q: "What are your daily tasks?", a: "I start work at 9. I usually check the emails and the tickets first. Then I help users with their computers and accounts, and I monitor the systems. I also write short reports at the end of the day." },
      { q: "What do you do in your free time?", a: "I usually study English and networking. I also like walking and meeting friends on weekends." },
      { q: "Do you work in a team?", a: "Yes, I do. I work with a small IT team. We share the tickets and help each other." }
    ],
    vocab: [
      { term: "Every day", tr: "her gün", ex: "I check the logs every day." },
      { term: "Usually", tr: "genellikle", ex: "I usually start at 9." },
      { term: "Task", tr: "görev", ex: "My daily tasks are simple." },
      { term: "Monitor", tr: "izlemek", ex: "She monitors the servers." },
      { term: "Weekend", tr: "hafta sonu", ex: "I don't work on weekends." },
      { term: "Routine", tr: "rutin", ex: "This is my morning routine." }
    ],
    resources: [
      res(BC, "Present simple alıştırmaları"),
      res(CAM, "Fiillerin örnek cümlelerini gör")
    ],
    sources: [{ title: "British Council LearnEnglish", url: "https://learnenglish.britishcouncil.org/" }]
  };

  /* 3 ───────────────────────────────────────────── Past simple */
  L[3] = {
    hook: "Past simple, bitmiş işlerin zamanıdır: 'dün ne yaptım?' sorusunun cevabı.",
    homework: "Dünü 6 cümleyle anlat: 'Yesterday I woke up at 7. I went to work...' En az 2 düzensiz fiil kullan (go-went, have-had, see-saw gibi).",
    warmup: {
      recap: [
        { point: "Present simple alışkanlıklar içindir; he/she ile fiile -s gelir.", example: "She works." }
      ],
      words: [
        { word: "yesterday", tr: "dün", pos: "adv", ex: "Yesterday I fixed a printer.", exTr: "Dün bir yazıcıyı tamir ettim.", use: "Geçmiş zaman", level: "A1" },
        { word: "last week", tr: "geçen hafta", pos: "phrase", ex: "We updated the servers last week.", exTr: "Geçen hafta sunucuları güncelledik.", use: "Geçmiş zaman", level: "A1" },
        { word: "ago", tr: "önce", pos: "adv", ex: "I started two years ago.", exTr: "İki yıl önce başladım.", use: "Geçmiş zaman", level: "A2" }
      ]
    },
    blocks: [
      { t: "h", text: "Durum" },
      { t: "box", h: "Gerçek durum", text: "Stand-up toplantısında 'What did you do yesterday?' diye soruluyor. Ya da mülakatta 'What did you do in your last job?' deniyor. Bitmiş işleri anlatman gerek." },
      { t: "h", text: "Ne zaman?" },
      { t: "p", text: "Geçmişte başlayıp biten olaylar için. Genellikle yanında bir geçmiş zaman ifadesi olur: yesterday (dün), last week (geçen hafta), two days ago (iki gün önce), in 2023 (2023'te)." },
      { t: "h", text: "Düzenli fiiller: -ed ekle" },
      { t: "steps", h: "Örnekler", items: [
        "work → worked, fix → fixed, install → installed, reset → reset (aynı)",
        "-e ile bitene sadece -d: update → updated",
        "Ünsüz + y: y → ied: study → studied",
        "I fixed the printer yesterday. (Dün yazıcıyı tamir ettim.)"
      ] },
      { t: "h", text: "Düzensiz fiiller: ezber listesi" },
      { t: "steps", h: "En sık 10 tanesi", items: [
        "go → went (gitmek)", "have → had (sahip olmak)", "see → saw (görmek)",
        "do → did (yapmak)", "make → made (yapmak, üretmek)", "write → wrote (yazmak)",
        "run → ran (koşmak, çalışmak)", "take → took (almak)", "send → sent (göndermek)", "find → found (bulmak)"
      ] },
      { t: "h", text: "Olumsuz ve soru" },
      { t: "steps", h: "didn't ve did", items: [
        "Olumsuz: özne + didn't + yalın fiil. I didn't fix it. (Onu tamir etmedim.)",
        "Soru: Did + özne + yalın fiil? Did you restart the PC? (Bilgisayarı yeniden başlattın mı?)",
        "did ve didn't'tan sonra fiil YALIN kalır: 'I didn't went' yanlış, 'I didn't go' doğru."
      ] },
      { t: "split", tr: "Dün sunucuyu yeniden başlattım.", parts: [
        { tr: "ben", q: "Kim?", en: "I" },
        { tr: "yeniden başlattım", q: "Ne yaptım?", en: "restarted" },
        { tr: "sunucuyu", q: "Neyi?", en: "the server" },
        { tr: "dün", q: "Ne zaman?", en: "yesterday" }
      ], result: "I restarted the server yesterday." },
      { t: "h", text: "Hazır cümleler (BT)" },
      { t: "steps", h: "Stand-up ve mülakat için", items: [
        "Yesterday I fixed a network problem. (Dün bir ağ sorununu çözdüm.)",
        "I installed the updates last night. (Güncellemeleri dün gece kurdum.)",
        "I didn't finish the report. (Raporu bitirmedim.)",
        "Did you send the email? (E-postayı gönderdin mi?)",
        "I started this job two years ago. (Bu işe iki yıl önce başladım.)",
        "I worked at a small company before. (Daha önce küçük bir şirkette çalıştım.)"
      ] },
      { t: "warn", h: "Tuzak", text: "'I didn't fixed it' yanlıştır. 'didn't' zaten geçmişi taşır, fiil yalın kalır: 'I didn't fix it.' Aynı şekilde 'Did you went?' yanlış, 'Did you go?' doğrudur." }
    ],
    story: { title: "Zor bir gün", text: "Yesterday was a difficult day. Mark came to work at 8. The internet didn't work. He checked the cables and restarted the router. After 20 minutes, he found the problem. The cable was loose. He fixed it and the internet worked again.", question: "What did Mark find? (İngilizce cevapla)" },
    quiz: [
      { q: "'I ___ the printer yesterday.' (tamir etmek)", options: ["fix", "fixed", "fixing", "fixes"], answer: "fixed", why: "Düzenli fiile geçmiş için -ed eklenir." },
      { q: "'go' fiilinin geçmiş hali nedir?", options: ["goed", "went", "gone", "going"], answer: "went", why: "go - went: düzensiz fiildir." },
      { q: "Hangisi doğru olumsuz cümledir?", options: ["I didn't fix it.", "I didn't fixed it.", "I not fix it.", "I don't fixed it."], answer: "I didn't fix it.", why: "didn't'tan sonra fiil yalın kalır." },
      { q: "'Dün bir e-posta yazdım.' cümlesinin doğrusu hangisidir?", options: ["I wrote an email yesterday.", "I writed an email yesterday.", "I write an email yesterday.", "I did wrote an email yesterday."], answer: "I wrote an email yesterday.", why: "write - wrote düzensiz fiildir." },
      { q: "'Did you restart the PC?' sorusuna doğru kısa olumsuz cevap hangisidir?", options: ["No, I didn't.", "No, I don't.", "No, I wasn't.", "No, I haven't."], answer: "No, I didn't.", why: "'Did' ile sorulan soruya 'did/didn't' ile cevap verilir." }
    ],
    interview: [
      { q: "What did you do in your last job?", a: "I worked as an IT support specialist. I helped users with their problems, I installed and updated software, and I managed user accounts. I also helped with the network." },
      { q: "What did you do yesterday?", a: "Yesterday I fixed two printer problems, I reset three passwords and I wrote a short report. After work I studied English for an hour." },
      { q: "When did you start your current job?", a: "I started this job eight months ago." }
    ],
    vocab: [
      { term: "Yesterday", tr: "dün", ex: "Yesterday I fixed the router." },
      { term: "Last night", tr: "dün gece", ex: "We updated the server last night." },
      { term: "Ago", tr: "önce", ex: "I started two years ago." },
      { term: "Finish", tr: "bitirmek", ex: "I finished the report." },
      { term: "Install", tr: "kurmak", ex: "I installed the new software." },
      { term: "Problem", tr: "sorun", ex: "We solved the problem." }
    ],
    resources: [
      res(BC, "Past simple alıştırmaları"),
      res(BBC, "Geçmişi anlatan kısa dinleme ve okumalar")
    ],
    sources: [{ title: "British Council LearnEnglish", url: "https://learnenglish.britishcouncil.org/" }]
  };

  /* 4 ───────────────────────────────────────────── Soru kurmak */
  L[4] = {
    hook: "Soru kurmak, doğru bilgiyi almaktır: iş yerinde en çok kullanacağın cümle türü budur.",
    homework: "Bir kullanıcıya sorabileceğin 8 teknik soru yaz: 'Did you restart the PC?', 'When did it start?', 'What error do you see?' gibi. Her birini sesli oku.",
    warmup: {
      recap: [
        { point: "Geçmişte 'did' + yalın fiil; şimdi 'do/does' + yalın fiil.", example: "Did you restart? / Do you see an error?" }
      ],
      words: [
        { word: "error message", tr: "hata mesajı", pos: "noun", ex: "What error message do you see?", exTr: "Hangi hata mesajını görüyorsun?", use: "Sorun giderme", level: "A2" },
        { word: "restart", tr: "yeniden başlatmak", pos: "verb", ex: "Did you restart it?", exTr: "Yeniden başlattın mı?", use: "Sorun giderme", level: "A1" },
        { word: "since", tr: "...den beri", pos: "prep", ex: "Since when?", exTr: "Ne zamandan beri?", use: "Zaman sorusu", level: "A2" }
      ]
    },
    blocks: [
      { t: "h", text: "Durum" },
      { t: "box", h: "Gerçek durum", text: "Baküdeki iş ortağın 'My computer doesn't work.' diyor. Seni yeterli bilgi olmadan işe yaramayan bir mesajla bıraktı. Doğru sorular sorup sorunu daraltman gerekiyor." },
      { t: "h", text: "Evet/hayır soruları" },
      { t: "steps", h: "Formül", items: [
        "Do + özne + fiil? → Do you have the error message?",
        "Does + he/she/it + fiil? → Does it work on another computer?",
        "Did + özne + fiil? → Did you restart the PC?",
        "Be fiili için başa gelir: Is it connected? Are you online?",
        "Can/could ile: Can you see the icon? Could you send a screenshot?"
      ] },
      { t: "h", text: "Soru kelimeleri (Wh-questions)" },
      { t: "steps", h: "Her biri bir bilgi ister", items: [
        "What: ne? → What error do you see?",
        "When: ne zaman? → When did it start?",
        "Where: nerede? → Where are you now?",
        "Who: kim? → Who else has the problem?",
        "Why: neden? → Why did you restart it?",
        "How: nasıl? → How do you connect?",
        "How many / How long: kaç / ne kadar → How long is the problem there?"
      ] },
      { t: "box", h: "Sıra", text: "Soru kelimesi + do/does/did + özne + fiil. Örnek: 'When did it stop?' Burada 'did' sorudan sonra fiil yalın: 'stop'." },
      { t: "split", tr: "Hata ne zaman başladı?", parts: [
        { tr: "ne zaman", q: "Zaman sorusu?", en: "When" },
        { tr: "(geçmiş yardımcı)", q: "Soru yardımcısı?", en: "did" },
        { tr: "bu / hata", q: "Neyi soruyoruz?", en: "the error" },
        { tr: "başlamak", q: "Fiil (yalın)?", en: "start" }
      ], result: "When did the error start?" },
      { t: "h", text: "Hazır soru seti: sorun giderme" },
      { t: "steps", h: "Kullanıcıya soracakların", items: [
        "What is the problem? (Sorun nedir?)",
        "When did it start? (Ne zaman başladı?)",
        "What error message do you see? (Hangi hata mesajını görüyorsun?)",
        "Did you restart the computer? (Bilgisayarı yeniden başlattın mı?)",
        "Did anything change recently? (Yakın zamanda bir şey değişti mi?)",
        "Does it work on another computer? (Başka bilgisayarda çalışıyor mu?)",
        "Can you send me a screenshot? (Bana ekran görüntüsü gönderebilir misin?)"
      ] },
      { t: "warn", h: "Tuzak", text: "'You restarted it?' gibi yukarı tonlu soru konuşmada olur ama yazıda ve resmî ortamda 'Did you restart it?' kullan. Ayrıca 'Did you went?' hatalıdır: 'Did you go?'" }
    ],
    story: { title: "Bir destek talebi", text: "Elnur writes: 'My VPN doesn't work.' Ayşe asks: 'When did it start? Do you see an error message? Did you restart your laptop?' Elnur answers: 'It started this morning. I see error 800. Yes, I restarted it.'", question: "What error does Elnur see?" },
    quiz: [
      { q: "'Bilgisayarı yeniden başlattın mı?' hangisidir?", options: ["Did you restart the computer?", "Do you restarted the computer?", "You did restart the computer?", "Have restart the computer?"], answer: "Did you restart the computer?", why: "Geçmiş soru: Did + özne + yalın fiil." },
      { q: "'When ___ it start?' (geçmiş zamanda) boşluk hangisidir?", options: ["did", "does", "do", "is"], answer: "did", why: "Geçmiş sorular did ile kurulur: When did it start?" },
      { q: "'Does it work?' sorusundaki 'work' neden -s almaz?", options: ["Çünkü does fiili taşır", "Çünkü it çoğuldur", "Rastgele", "Çünkü geçmiş zamandır"], answer: "Çünkü does fiili taşır", why: "does'tan sonra fiil yalın kalır." },
      { q: "'Hangi hata mesajını görüyorsun?' hangisidir?", options: ["What error message do you see?", "What error message you see?", "Which you see error message?", "What do you see error message?"], answer: "What error message do you see?", why: "Soru kelimesi + do + özne + fiil sırası." },
      { q: "Ekran görüntüsü istemek için nazik cümle hangisidir?", options: ["Can you send me a screenshot?", "Send screenshot now.", "You send screenshot?", "I want screenshot."], answer: "Can you send me a screenshot?", why: "'Can you ...?' nazik bir rica kalıbıdır." }
    ],
    interview: [
      { q: "A user says 'My computer is slow.' What questions do you ask?", a: "I ask: When did it start? Did you install anything new? What programs are open? Did you restart the computer? Does it happen all the time or only sometimes? Then I check the system." },
      { q: "How do you collect information from a user?", a: "I ask short and clear questions, one by one. I ask for the error message and a screenshot, and I ask what changed recently." },
      { q: "Do you ask questions when you don't understand?", a: "Yes, I do. I always ask to be sure. It saves time and helps me find the real problem." }
    ],
    vocab: [
      { term: "Error message", tr: "hata mesajı", ex: "What error message do you see?" },
      { term: "Screenshot", tr: "ekran görüntüsü", ex: "Please send a screenshot." },
      { term: "Recently", tr: "yakın zamanda", ex: "Did anything change recently?" },
      { term: "Another", tr: "başka", ex: "Try another computer." },
      { term: "Since when", tr: "ne zamandan beri", ex: "Since when do you have this problem?" },
      { term: "Happen", tr: "olmak, gerçekleşmek", ex: "When does it happen?" }
    ],
    resources: [
      res(BC, "Soru kurma alıştırmaları"),
      res(BBC, "Gerçek diyaloglarla soru kalıpları")
    ],
    sources: [{ title: "British Council LearnEnglish", url: "https://learnenglish.britishcouncil.org/" }]
  };

  /* 5 ───────────────────────────────────────────── Can / could */
  L[5] = {
    hook: "Can ve could, iş yerinde en sık kullanacağın nazik kalıplardır: rica, izin ve yetenek.",
    homework: "Aşağıdaki durumlar için 'Could you ...?' cümleleri yaz: loğu göndermesini iste, telefona çıkmasını iste, 5 dakika sonra tekrar aramasını iste. Sonra 2 tanesini 'Can you ...?' ile de yaz ve farkı kendine açıkla.",
    warmup: {
      recap: [
        { point: "Soru: Do/Does/Did + özne + yalın fiil.", example: "Did you restart it?" }
      ],
      words: [
        { word: "could you", tr: "...ebilir misiniz (nazik)", pos: "phrase", ex: "Could you send the log?", exTr: "Log'u gönderebilir misiniz?", use: "Nazik rica", level: "A2" },
        { word: "available", tr: "müsait", pos: "adj", ex: "Are you available now?", exTr: "Şimdi müsait misin?", use: "İş yerinde", level: "A2" },
        { word: "permission", tr: "izin", pos: "noun", ex: "I don't have permission.", exTr: "İznim yok.", use: "Erişim sorunu", level: "A2" }
      ]
    },
    blocks: [
      { t: "h", text: "Durum" },
      { t: "box", h: "Gerçek durum", text: "Toplantıda birinin sunumunu görmek istiyorsun ya da bir iş arkadaşından log dosyası lazım. 'Send me the file!' demek sert durur. 'Could you send me the file, please?' ise profesyonel ve nazik." },
      { t: "h", text: "Can / could ne işe yarar?" },
      { t: "steps", h: "3 kullanım", items: [
        "Yetenek: I can configure a router. (Router yapılandırabilirim.)",
        "Rica: Can you help me? / Could you help me? (Bana yardım edebilir misin?)",
        "İzin: Can I use your laptop? / Could I ask a question? (Sorabilir miyim?)"
      ] },
      { t: "box", h: "Can mi, could mu?", text: "'Could' daha nazik ve resmîdir. Müşteriye, yöneticiye ya da tanımadığın birine 'Could you...?' de. Arkadaşa ya da yakın iş arkadaşına 'Can you...?' yeter." },
      { t: "steps", h: "Altın kurallar", items: [
        "can/could'tan sonra fiil YALIN gelir: 'I can help.' ('I can to help' yanlış.)",
        "Olumsuz: can't (cannot), couldn't. I can't connect to the VPN.",
        "Üçüncü tekil kişide -s yok: 'She can help.' ('She cans' yanlış.)",
        "Please eklemek nazikliği artırır: Could you please send...?"
      ] },
      { t: "split", tr: "Log dosyasını gönderebilir misiniz?", parts: [
        { tr: "-ebilir misiniz (nazik)", q: "Rica kalıbı?", en: "Could you" },
        { tr: "göndermek", q: "Fiil (yalın)?", en: "send" },
        { tr: "log dosyasını", q: "Neyi?", en: "the log file" },
        { tr: "lütfen", q: "Nazik kelime?", en: "please" }
      ], result: "Could you send the log file, please?" },
      { t: "h", text: "Hazır cümleler" },
      { t: "steps", h: "Günlük iş cümleleri", items: [
        "Could you repeat that, please? (Tekrar eder misiniz?)",
        "Could you help me with this? (Bu konuda bana yardım eder misiniz?)",
        "Can you hear me? (Beni duyabiliyor musun?)",
        "Can I ask a question? (Bir soru sorabilir miyim?)",
        "I can't access the server. (Sunucuya erişemiyorum.)",
        "I can fix this in 10 minutes. (Bunu 10 dakikada çözebilirim.)",
        "I'm sorry, I can't do that today. (Üzgünüm, bunu bugün yapamam.)"
      ] },
      { t: "warn", h: "Tuzak", text: "'Can you to help me?' yanlıştır, 'to' gelmez. 'I could connect yesterday' ise geçmişte yapabildiğini anlatır, nazik rica ile karıştırma: bağlam farkı gösterir." }
    ],
    story: { title: "Toplantıda", text: "In the meeting, Elnur says: 'Could you share your screen, please?' Ayşe answers: 'Sure. Can you see it now?' Elnur says: 'Yes, I can. Thank you.'", question: "What does Elnur ask Ayşe to do?" },
    quiz: [
      { q: "Daha nazik rica hangisidir?", options: ["Could you help me?", "Help me.", "You help me?", "I want help."], answer: "Could you help me?", why: "'Could you...?' en nazik rica kalıplarından biridir." },
      { q: "'She ___ configure the router.' (yapabilir)", options: ["can", "cans", "can to", "is can"], answer: "can", why: "can 3. tekil kişide -s almaz ve yalın fiil ister." },
      { q: "'I ___ connect to the VPN.' (bağlanamıyorum)", options: ["can't", "don't can", "can not to", "am not can"], answer: "can't", why: "can'in olumsuzu can't ya da cannot'tır." },
      { q: "'Could I ask a question?' ne anlama gelir?", options: ["Bir soru sorabilir miyim?", "Soru sormayı bırak", "Sen soru sordun", "Soru sormam gerekiyor"], answer: "Bir soru sorabilir miyim?", why: "'Could I...?' izin isteme kalıbıdır." },
      { q: "Doğru cümle hangisidir?", options: ["Can you send me the file?", "Can you to send me the file?", "Can you sending me the file?", "Can you sends me the file?"], answer: "Can you send me the file?", why: "can'den sonra yalın fiil gelir." }
    ],
    interview: [
      { q: "What can you do in networking?", a: "I can configure basic VLANs, assign IP addresses, and troubleshoot simple connection problems. I'm learning more every day, and I can read the documentation and learn new tools quickly." },
      { q: "Could you tell me about a problem you solved?", a: "Sure. Last month the internet didn't work in one office. I checked the cable, then the switch. The port was in the wrong VLAN. I fixed it and the problem was solved." },
      { q: "Can you work in a team?", a: "Yes, I can. I like sharing information and helping my colleagues." }
    ],
    vocab: [
      { term: "Could you", tr: "...ebilir misiniz (nazik)", ex: "Could you repeat that?" },
      { term: "Available", tr: "müsait", ex: "Are you available at 3?" },
      { term: "Permission", tr: "izin", ex: "I need permission to access the folder." },
      { term: "Share your screen", tr: "ekran paylaşmak", ex: "Could you share your screen?" },
      { term: "Access", tr: "erişim", ex: "I can't access the file." },
      { term: "Request", tr: "talep, rica", ex: "I have a request." }
    ],
    resources: [
      res(BC, "Can / could alıştırmaları"),
      res(BBC, "Nazik rica kalıpları dinleme")
    ],
    sources: [{ title: "British Council LearnEnglish", url: "https://learnenglish.britishcouncil.org/" }]
  };

  /* 6 ───────────────────────────────────────────── İş e-postası yazmak */
  L[6] = {
    hook: "İyi bir iş e-postası kısa, net ve naziktir: kim olduğunu, ne istediğini ve ne zaman istediğini ilk bakışta gösterir.",
    homework: "Aşağıdaki durum için kısa bir e-posta yaz: Muhasebe departmanındaki bir kullanıcıdan yazıcı hata mesajının ekran görüntüsünü istiyorsun. Konu, selamlama, istek ve kapanış olsun.",
    warmup: {
      recap: [
        { point: "Rica için 'Could you ...?' kullanılır, fiil yalın gelir.", example: "Could you send the log?" }
      ],
      words: [
        { word: "regards", tr: "saygılar", pos: "noun", ex: "Best regards, Yusuf", exTr: "En iyi dileklerimle, Yusuf", use: "E-posta kapanışı", level: "A2" },
        { word: "attached", tr: "ekte", pos: "adj", ex: "Please find the file attached.", exTr: "Dosya ektedir.", use: "E-posta", level: "A2" },
        { word: "deadline", tr: "son tarih", pos: "noun", ex: "The deadline is Friday.", exTr: "Son tarih cuma.", use: "İş planı", level: "A2" }
      ]
    },
    blocks: [
      { t: "h", text: "Durum" },
      { t: "box", h: "Gerçek durum", text: "Almanya'daki bir iş ortağına yazman gerekiyor: sunucu bakımı için cumartesi gece 22:00'de kesinti olacak. E-posta kısa, net ve profesyonel olmalı. Yoksa kimse neden yazdığını anlamaz." },
      { t: "h", text: "Bir e-postanın 6 parçası" },
      { t: "steps", h: "Sırayla", items: [
        "1) Subject (konu): kısa ve açık. 'Server maintenance on Saturday 22:00'",
        "2) Greeting (selamlama): 'Hi Mark,' (samimi) ya da 'Dear Mr. Smith,' (resmî).",
        "3) Purpose (amaç): 'I'm writing to inform you that...' / 'I'm writing about...'",
        "4) Details (ayrıntı): tarih, saat, etki. Kısa tut.",
        "5) Request (istek): 'Could you please confirm by Friday?'",
        "6) Closing (kapanış): 'Best regards,' / 'Kind regards,' ve adın."
      ] },
      { t: "h", text: "Örnek e-posta" },
      { t: "cmd", text: "Subject: Server maintenance on Saturday 22:00\n\nHi Mark,\n\nI'm writing to inform you that we will do server maintenance on Saturday at 22:00.\nThe email system will be offline for about two hours.\n\nCould you please let your team know?\nPlease contact me if you have any questions.\n\nBest regards,\nYusuf" },
      { t: "h", text: "Yararlı kalıplar" },
      { t: "steps", h: "Amaç, istek, teşekkür", items: [
        "I'm writing to ... (…için yazıyorum)",
        "I'm writing to inform you that ... (… bildirmek istiyorum)",
        "Could you please ...? (… rica edebilir miyim?)",
        "Please find the file attached. (Dosya ektedir.)",
        "Thank you for your help / quick reply. (Yardımınız / hızlı cevabınız için teşekkürler.)",
        "I look forward to your reply. (Cevabınızı bekliyorum.)",
        "Please let me know if you have any questions. (Sorunuz olursa lütfen bildirin.)"
      ] },
      { t: "steps", h: "Resmî mi, samimi mi?", items: [
        "Resmî: Dear Mr./Ms. + soyadı, Kind regards, I would like to ...",
        "Samimi: Hi + ad, Thanks, Can you ...?",
        "Emin değilsen bir adım resmî başla; karşı taraf samimileşirse sen de uyum sağla."
      ] },
      { t: "box", h: "Altın kurallar", text: "Kısa yaz (5-8 cümle). Tek e-postada tek konu. Konu satırını boş bırakma. Gönderme tuşuna basmadan önce adı, tarihi ve eki kontrol et." },
      { t: "warn", h: "Tuzak", text: "Türkçeden birebir çeviri tehlikelidir. 'I wait your reply' yerine 'I look forward to your reply'. 'Please do the needful' gibi kalıplar da bazı kültürlerde garip karşılanır, sade yaz." }
    ],
    story: { title: "Bir e-posta", text: "Subject: Password reset. Hi Elif, I reset your password. Your new temporary password is in the next message. Please change it after you log in. Best regards, Yusuf.", question: "What should Elif do after she logs in?" },
    quiz: [
      { q: "E-posta kapanışı için hangisi uygundur?", options: ["Best regards,", "See you in the toilet,", "Bye bye boss,", "Answer me,"], answer: "Best regards,", why: "'Best regards' ve 'Kind regards' iş e-postasında yaygın kapanışlardır." },
      { q: "Ekte dosya gönderirken hangi cümle doğrudur?", options: ["Please find the file attached.", "Please find the file attach.", "Please attached the file find.", "The file is attach."], answer: "Please find the file attached.", why: "'Please find ... attached' ekli dosya için kalıp ifadedir." },
      { q: "'Cevabınızı bekliyorum.' hangisidir?", options: ["I look forward to your reply.", "I wait your reply.", "I am waiting you.", "I hope reply."], answer: "I look forward to your reply.", why: "Nazik ve doğal kalıp: look forward to + isim." },
      { q: "Resmî bir e-postaya nasıl başlanır?", options: ["Dear Mr. Smith,", "Hey bro,", "What's up,", "Yo,"], answer: "Dear Mr. Smith,", why: "Resmî selamlama 'Dear' ile başlar." },
      { q: "Konu satırı için en iyi örnek hangisidir?", options: ["Server maintenance on Saturday 22:00", "Hi", "Important!!!", "Please read"], answer: "Server maintenance on Saturday 22:00", why: "İyi konu satırı kısa, net ve içeriği tahmin ettirir." }
    ],
    interview: [
      { q: "How do you write a professional email?", a: "I write a clear subject, a short greeting, and then I explain the purpose in the first sentence. I keep it short, I add a clear request with a deadline, and I close politely. Before sending, I check names, dates and attachments." },
      { q: "How do you communicate with users?", a: "I communicate in a simple and polite way, I avoid technical words when possible, and I confirm in writing what we agreed." },
      { q: "Do you write reports?", a: "Yes, I write short weekly reports. I explain what we did, what problems we had and what we plan to do next." }
    ],
    vocab: [
      { term: "Subject", tr: "konu satırı", ex: "Write a clear subject." },
      { term: "Attachment", tr: "ek dosya", ex: "Check the attachment." },
      { term: "Reply", tr: "cevap", ex: "I look forward to your reply." },
      { term: "Confirm", tr: "onaylamak", ex: "Please confirm by Friday." },
      { term: "Inform", tr: "bilgilendirmek", ex: "I'm writing to inform you." },
      { term: "Deadline", tr: "son tarih", ex: "The deadline is Monday." }
    ],
    resources: [
      res(BC, "İş e-postası yazma alıştırmaları"),
      res(BBC, "İş İngilizcesi kısa dersleri")
    ],
    sources: [{ title: "British Council LearnEnglish", url: "https://learnenglish.britishcouncil.org/" }]
  };
})();

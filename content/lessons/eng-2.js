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
      { t: "box", h: "Gerçek durum", text: "Sabah 9:15, ekip online toplantıda. Sıra sende: 'Deniz, your update?' Herkes 30 saniye bekliyor. Ezberlenmiş bir kalıbın varsa panik olmaz." },
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
    objectives: [
      { id: "h1", text: "Dünü anlatan stand-up cümlesinde fiili past simple ile (fixed, updated, reset) yazabilirsin." },
      { id: "h2", text: "Bugünkü planı 'I'll' veya 'I'm going to' ile ve yalın fiille kurabilirsin." },
      { id: "h3", text: "Engeli 'I'm waiting for ...', 'I'm stuck on ...' ya da 'No blockers.' kalıbıyla bildirebilirsin." }
    ],
    summary: [
      "Stand-up üç parçadır: Yesterday + geçmiş zaman, Today + gelecek niyet, engel veya 'No blockers.'.",
      "'Yesterday' ile past simple gelir: 'Yesterday I fixed the VPN issue'; 'Yesterday I fix' yanlıştır.",
      "will'den sonra 'to' gelmez ve fiil yalın kalır: 'Today I'll work on the switch upgrade'; 'I will to fix' yanlıştır.",
      "Engel bildirirken 'I'm waiting for approval from security.' ve 'I'm stuck on ___.' kalıpları kullanılır.",
      "Durumu 'It's done.', 'It's in progress.', 'It's almost ready.' ile söylersin; tüm güncelleme yaklaşık 30 saniyeyi geçmemelidir."
    ],
    quiz: [
      { q: "'Dün iki laptop güncelledim.' hangisidir?", options: ["Yesterday I updated two laptops.", "Yesterday I update two laptops.", "Yesterday I will update two laptops.", "Yesterday I am updating two laptops."], answer: "Yesterday I updated two laptops.", why: "'Yesterday' ile past simple kullanılır: updated.", obj: "h1", whyNot: { "Yesterday I update two laptops.": "'Yesterday' geçmiş zaman ister; fiil 'updated' olmalıdır, yalın 'update' değil.", "Yesterday I will update two laptops.": "'will' gelecek zamandır; 'yesterday' ile birlikte kullanılamaz.", "Yesterday I am updating two laptops.": "'am updating' şu an devam eden eylemi anlatır; dün bitmiş eylem için past simple gerekir." } },
      { q: "'Onay bekliyorum.' hangisidir?", options: ["I'm waiting for approval.", "I wait to approval.", "I'm wait approval.", "I waiting approval."], answer: "I'm waiting for approval.", why: "'wait for' kalıbı ve şimdiki devam eden durum: I'm waiting for.", obj: "h3", whyNot: { "I wait to approval.": "'wait' ile edat 'for' kullanılır ('wait for approval'); 'to' bu anlamı vermez.", "I'm wait approval.": "'I'm' ile fiil -ing alır (I'm waiting) ve 'for' edatı eksiktir.", "I waiting approval.": "Yardımcı fiil 'am/'m' eksiktir ve 'wait' için 'for' gerekir." } },
      { q: "Engelin yoksa ne dersin?", options: ["No blockers.", "I have blocker none.", "Blockers no have.", "Not blocker."], answer: "No blockers.", why: "Kısa ve doğal: 'No blockers.'", obj: "h3", whyNot: { "I have blocker none.": "Türkçe sözcük sırası kopyalanmış; İngilizcede 'No blockers.' ya da 'I have no blockers.' denir.", "Blockers no have.": "Sözcük sırası bozuk ve özne ile fiil yoktur; kısa hâli 'No blockers.' olur.", "Not blocker.": "Bu kalıp doğal değil; 'No blockers.' ya da 'It's not a blocker.' denir." } },
      { q: "'Bugün sunucuyu yeniden başlatacağım.' hangisidir?", options: ["Today I'll restart the server.", "Today I restarted the server.", "Today I'll to restart the server.", "Today I restart will the server."], answer: "Today I'll restart the server.", why: "will'den sonra fiil yalın: I'll restart.", obj: "h2", whyNot: { "Today I restarted the server.": "'restarted' geçmiş zamandır; planı anlatmak için 'I'll restart' gerekir.", "Today I'll to restart the server.": "'will'den sonra 'to' gelmez; yalın fiil kullanılır.", "Today I restart will the server.": "'will' yardımcı fiil olup özneden hemen sonra gelir: 'I'll restart'." } },
      { q: "'Dün sunucuyu yeniden başlattım.' cümlesinin doğru İngilizcesi hangisidir?", options: ["Yesterday I restarted the server.","Yesterday I restart the server.","Yesterday I have restarted the server.","Yesterday I will restart the server."], answer: "Yesterday I restarted the server.", why: "Belirli bir geçmiş zaman ifadesi (yesterday) past simple ile kullanılır: restarted.", obj: "h1", whyNot: { "Yesterday I restart the server.": "Fiil geçmiş zamana çekilmemiş; 'restarted' olmalı.", "Yesterday I have restarted the server.": "Present perfect, 'yesterday' gibi belirli bir geçmiş zaman ifadesiyle kullanılmaz.", "Yesterday I will restart the server.": "'will' gelecek içindir; 'yesterday' geçmiştir." } },
      { q: "'Bugün erişimi test edeceğim.' cümlesinin doğru İngilizcesi hangisidir?", options: ["Today I'm going to test the access.","Today I'm going test the access.","Today I going to test the access.","Today I'm going to tested the access."], answer: "Today I'm going to test the access.", why: "Plan için 'am/is/are going to + yalın fiil' kalıbı kullanılır.", obj: "h2", whyNot: { "Today I'm going test the access.": "'going' ile 'test' arasında 'to' eksik; kalıp 'going to + fiil'dir.", "Today I going to test the access.": "'going to' kalıbında 'am' gerekir: I'm going to.", "Today I'm going to tested the access.": "'to'dan sonra fiil yalın gelir (test); 'tested' geçmiş biçimdir." } },
      { q: "'Güvenlik duvarı kuralında takıldım.' cümlesinin doğru İngilizcesi hangisidir?", options: ["I'm stuck on the firewall rule.","I stuck on the firewall rule.","I'm stuck for the firewall rule.","I'm sticked on the firewall rule."], answer: "I'm stuck on the firewall rule.", why: "Takılma için 'be stuck on ___' kalıbı kullanılır.", obj: "h3", whyNot: { "I stuck on the firewall rule.": "'stuck' burada sıfattır ve 'be' fiiliyle gelir: I'm stuck.", "I'm stuck for the firewall rule.": "Kalıp 'stuck on ___' şeklindedir, 'for' değil.", "I'm sticked on the firewall rule.": "'stick' düzensiz fiildir, 'sticked' diye bir biçim yoktur; zaten kalıpta sıfat olan 'stuck' kullanılır." } }
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
    objectives: [
      { id: "h1", text: "Duymadığında 'Sorry, could you repeat that, please?' gibi nazik bir rica cümlesi seçebilirsin." },
      { id: "h2", text: "Anladığını doğrulamak için 'Just to confirm, you mean ___?' kalıbını doğru kurabilirsin." },
      { id: "h3", text: "Daha yavaş konuşma veya yazıyla paylaşma isteğini 'Could you ...?' ile nazikçe söyleyebilirsin." },
      { id: "h4", text: "'I didn't catch that' gibi kalıbın anlamını ve 'What?' ile 'Sorry?' arasındaki nezaket farkını ayırt edebilirsin." }
    ],
    summary: [
      "Duymadığında: 'Sorry, could you repeat that, please?'; anlamadığında: 'I'm not sure I understand. Could you explain that again?'.",
      "Hızlı konuşana 'Could you speak a bit more slowly, please?' dersin; sayı ve tarihleri 'Could you put that in the chat?' ile yazıya döktürürsün.",
      "Doğrulama kalıbı 'Just to confirm, you mean ___?' ile yanlış anlamayı baştan önlersin.",
      "'Could you' ile rica 'Can you'den daha naziktir; toplantıda ve müşteriyle 'Could you' tercih edilir.",
      "Tek başına 'What?' kaba duyulur, 'Sorry?' veya 'Pardon?' kullanılır; 'I didn't catch that' kişiyi suçlamaz, 'catch' burada duyup anlamak demektir."
    ],
    quiz: [
      { q: "Duymadığında en nazik seçenek hangisi?", options: ["Sorry, could you repeat that, please?", "What?", "Say again.", "I don't hear."], answer: "Sorry, could you repeat that, please?", why: "'Could you ... please?' nazik ve profesyonel.", obj: "h1", whyNot: { "What?": "Tek başına 'What?' kaba ve ani duyulur; 'Sorry?' veya 'Could you repeat that, please?' denir.", "Say again.": "Emir kipidir ve nezaket sözcüğü (could you, please) yoktur.", "I don't hear.": "Doğal bir kalıp değildir; 'I didn't catch that' ya da 'I can't hear you' denir." } },
      { q: "'Yani şunu mu demek istiyorsun?' doğrulaması hangisi?", options: ["Just to confirm, you mean the Friday deadline?", "You mean Friday I?", "Confirm you Friday?", "Is Friday you?"], answer: "Just to confirm, you mean the Friday deadline?", why: "'Just to confirm' doğrulama için standart kalıptır.", obj: "h2", whyNot: { "You mean Friday I?": "Sözcük sırası bozuk ve doğrulama kalıbı yoktur.", "Confirm you Friday?": "Özne ve fiil çekimi yok, 'Just to confirm, you mean ...' yapısı eksik.", "Is Friday you?": "Anlamsız; 'you mean' kalıbıyla soru kurulmamış." } },
      { q: "'Biraz yavaş konuşur musunuz?' hangisi?", options: ["Could you speak a bit more slowly?", "Speak slow please you.", "You speak slowly can?", "Make slow your speak."], answer: "Could you speak a bit more slowly?", why: "'speak more slowly' doğru kalıp.", obj: "h3", whyNot: { "Speak slow please you.": "Sözcük sırası bozuk; ayrıca fiili niteleyen 'slowly' zarfı gerekir ve 'Could you' rica yapısı yok.", "You speak slowly can?": "Türkçedeki sıra kopyalanmış; rica 'Could you speak ...?' ile başlar.", "Make slow your speak.": "'your speak' diye bir isim kullanımı yoktur ve 'make slow' böyle bir kalıp değildir; hız rica ederken 'Could you speak more slowly?' denir." } },
      { q: "'I didn't catch that.' ne demek?", options: ["Duymadım / anlayamadım.", "Onu yakalayamadım (fiziksel).", "Katılmıyorum.", "Bitirdim."], answer: "Duymadım / anlayamadım.", why: "'catch' burada 'duyup anlamak' anlamında.", obj: "h4", whyNot: { "Onu yakalayamadım (fiziksel).": "Bu cümlede 'catch' bir şeyi tutmak değil, duyup anlamak anlamındadır.", "Katılmıyorum.": "Katılmamak 'I disagree' ile söylenir.", "Bitirdim.": "Bitirdim 'I'm done' ya da 'I've finished' olur." } },
      { q: "Müşteriyle toplantıda 'Bunu tekrar açıklar mısınız?' demek için en nazik seçenek hangisidir?", options: ["Could you explain that again, please?","Can you explain that again?","Explain that again.","You explain that again."], answer: "Could you explain that again, please?", why: "'Could you' + 'please' en nazik rica biçimidir; müşteri ve toplantı ortamı için uygundur.", obj: "h1", whyNot: { "Can you explain that again?": "Anlaşılır ama 'Could you ... please?' kadar nazik değildir.", "Explain that again.": "Emir kipidir ve kaba duyulur.", "You explain that again.": "Bu da emir gibidir; rica kalıbı yoktur." } },
      { q: "'Yani Perşembe mi demek istiyorsunuz?' diye doğrulamak için hangisi uygundur?", options: ["Just to confirm, you mean Thursday?","Just to confirm, you are meaning Thursday?","Just confirm, Thursday you?","To confirm just you mean Thursday."], answer: "Just to confirm, you mean Thursday?", why: "Doğrulama için standart kalıp 'Just to confirm, you mean ___?' şeklindedir.", obj: "h2", whyNot: { "Just to confirm, you are meaning Thursday?": "'mean' bu anlamda durum fiilidir, -ing ile kullanılmaz: 'you mean'.", "Just confirm, Thursday you?": "Kalıbın 'to' kısmı ve fiil eksik, sözcük sırası bozuk.", "To confirm just you mean Thursday.": "'Just' kalıbın başında 'Just to confirm' olarak gelir; sözcük sırası bozulmuştur." } },
      { q: "'Bunu sohbete yazar mısınız?' demek için hangisi doğrudur?", options: ["Could you put that in the chat?","Could you putting that in the chat?","Could you to put that in the chat?","Do you put that in the chat?"], answer: "Could you put that in the chat?", why: "'Could you' kalıbından sonra yalın fiil gelir: Could you put ...?", obj: "h3", whyNot: { "Could you putting that in the chat?": "'Could'tan sonra fiil -ing almaz, yalın hâl kullanılır.", "Could you to put that in the chat?": "'Could'tan sonra 'to' gelmez.", "Do you put that in the chat?": "Bu bir alışkanlık sorusudur, rica değildir." } },
      { q: "Duymadığın için kısa ve kaba durmayan bir şekilde 'Efendim?' demek istiyorsun. Hangisi uygundur?", options: ["Sorry?","What?","I don't understand you.","Say it."], answer: "Sorry?", why: "'Sorry?' ya da 'Pardon?' kısa ve nazik bir geri sorudur.", obj: "h4", whyNot: { "What?": "Tek başına kaba duyulur.", "I don't understand you.": "Kişiyi suçlar gibi duyulur; 'I didn't catch that' daha yumuşaktır.", "Say it.": "Emir kipidir ve nezaket içermez." } }
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
    objectives: [
      { id: "h1", text: "Bir BT durumuna uyan sorun-çözüm fiilini (troubleshoot, crash, workaround, freeze) bağlamdan seçebilirsin." },
      { id: "h2", text: "BT fiillerinin geçmiş zaman biçimini (reset, installed) doğru yazabilirsin." },
      { id: "h3", text: "update-upgrade ve log in-login ayrımını cümle içinde doğru kullanabilirsin." }
    ],
    summary: [
      "Tipik bir cümle: 'The server is down, please check the logs and restart the service.'; üç gruba ayır: ağ ve erişim, donanım ve yazılım, sorun ve çözüm.",
      "update küçük bir yama, upgrade yeni büyük sürüme geçiştir; install kurmak, uninstall kaldırmaktır.",
      "'log in' iki kelimeli fiildir ('The user can't log in'), 'login' isimdir ('login page').",
      "'reset' düzensizdir ve üç biçimi aynıdır: reset - reset - reset; 'resetted' diye biçim yoktur.",
      "Sorun giderirken: issue/error, crash, freeze, check, troubleshoot, workaround (geçici çözüm), root cause (kök neden), resolved (çözüldü)."
    ],
    quiz: [
      { q: "'Sorun gidermek' için doğru fiil hangisi?", options: ["troubleshoot", "trouble", "shootrouble", "problemize"], answer: "troubleshoot", why: "Troubleshoot = sorunu bulup gidermek.", obj: "h1", whyNot: { "trouble": "'trouble' sıkıntı demektir ve sorunu bulup gidermeyi anlatmaz; doğru fiil 'troubleshoot'tur.", "shootrouble": "İngilizcede böyle bir sözcük yoktur; doğru sıra 'troubleshoot'tur.", "problemize": "İngilizcede böyle bir fiil yoktur; sorun gidermek için 'troubleshoot' kullanılır." } },
      { q: "'Parolayı sıfırladım.' hangisi?", options: ["I reset the password.", "I resetted the password.", "I reseted password.", "I am reset the password."], answer: "I reset the password.", why: "'reset' düzensiz: reset – reset – reset.", obj: "h2", whyNot: { "I resetted the password.": "'reset' düzensiz fiildir, geçmiş biçimi de 'reset'tir; '-ed' eklenmez.", "I reseted password.": "'-ed' eklenmez ve 'the' tanımlığı eksiktir.", "I am reset the password.": "'am' ile yalın fiil birlikte kullanılmaz; geçmiş anlatmak için 'I reset the password' denir." } },
      { q: "'Geçici çözüm' İngilizcede nedir?", options: ["workaround", "workstation", "homework", "fixwork"], answer: "workaround", why: "Workaround: asıl çözüm gelene kadar kullanılan geçici yol.", obj: "h1", whyNot: { "workstation": "Workstation, güçlü bir masaüstü bilgisayar ya da iş istasyonudur, geçici çözüm değildir.", "homework": "Homework ödev demektir.", "fixwork": "İngilizcede böyle bir sözcük yoktur; geçici çözüm 'workaround'tur." } },
      { q: "Bir uygulama aniden kapandı. Hangi kelime uyar?", options: ["crash", "install", "upgrade", "permission"], answer: "crash", why: "Crash = çökmek.", obj: "h1", whyNot: { "install": "Install kurmak demektir; uygulama kendi kendine kapandığı için uymaz.", "upgrade": "Upgrade yeni bir sürüme geçmektir, kapanmayı anlatmaz.", "permission": "Permission yetki demektir, bir isimdir ve uygulamanın çökmesini anlatmaz." } },
      { q: "'The user can't ___ in.' boşluğa ne gelir?", options: ["log", "login", "logged", "logging"], answer: "log", why: "Fiil olarak 'log in': can't log in.", obj: "h3", whyNot: { "login": "'login' isimdir (giriş ekranı), fiil olarak 'log in' yazılır.", "logged": "'can't'ten sonra yalın fiil gelir; 'logged' geçmiş biçimdir.", "logging": "'can't'ten sonra -ing biçimi gelmez; yalın 'log' gerekir." } },
      { q: "'Dün güncellemeyi kurdum.' cümlesinin doğru İngilizcesi hangisidir?", options: ["I installed the update yesterday.","I install the update yesterday.","I have installed the update yesterday.","I installing the update yesterday."], answer: "I installed the update yesterday.", why: "'Yesterday' ile past simple kullanılır: installed.", obj: "h2", whyNot: { "I install the update yesterday.": "Fiil geçmiş zamana çekilmemiş; 'installed' olmalı.", "I have installed the update yesterday.": "Present perfect, 'yesterday' gibi belirli geçmiş zaman ifadesiyle kullanılmaz.", "I installing the update yesterday.": "Yardımcı fiil olmadan -ing biçimi kullanılamaz ve zaman yanlıştır." } },
      { q: "Bir kullanıcının Windows 10'dan Windows 11'e geçmesi için hangi sözcük en uygundur?", options: ["upgrade","update","uninstall","reset"], answer: "upgrade", why: "Upgrade yeni bir büyük sürüme geçmektir; update ise küçük yamadır.", obj: "h3", whyNot: { "update": "Update mevcut sürümde küçük bir yama veya güncellemedir, yeni büyük sürüme geçiş değildir.", "uninstall": "Uninstall kaldırmak demektir.", "reset": "Reset sıfırlamak demektir, sürüm değiştirmez." } },
      { q: "'The ___ page does not load.' boşluğa ne gelir?", options: ["login","log in","logged","logging in"], answer: "login", why: "Sayfa adını niteleyen sözcük isimdir: login page.", obj: "h3", whyNot: { "log in": "'log in' iki kelimeli fiildir; isim gereken yerde 'login' yazılır.", "logged": "'logged' fiilin geçmiş biçimidir, sayfayı niteleyen isim değildir.", "logging in": "'logging in' fiilin -ing biçimidir, isim gerektiren yerde kullanılmaz." } }
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
    objectives: [
      { id: "h1", text: "Hata raporunun başlıklarını (title, steps to reproduce, expected result, actual result, environment) doğru yerde kullanabilirsin." },
      { id: "h2", text: "Hatanın ne zaman başladığını ve ne sıklıkla oluştuğunu İngilizce söyleyebilirsin (It started after ..., It happens every time)." },
      { id: "h3", text: "Belirsiz bir şikâyeti ('It doesn't work') rapora dönüştürecek doğru bilgi ve soruları seçebilirsin." }
    ],
    summary: [
      "İyi rapor dört soruyu yanıtlar: ne bekledim, ne oldu, nasıl tekrarlanır, nerede oldu.",
      "İskelet: Title, Steps to reproduce, Expected result, Actual result, Environment ve eklenti olarak screenshot.",
      "Kalıplar: 'It started after the update.', 'It happens every time / sometimes.', 'It only happens on ___.', 'I can't reproduce it anymore.'.",
      "Hata mesajını özetleme, kelimesi kelimesine kopyala; 'It is not working' çok belirsizdir.",
      "Environment satırına işletim sistemi, yazılım sürümü ve bağlantı bilgisi yazılır (Windows 11, VPN client 5.2, home Wi-Fi)."
    ],
    quiz: [
      { q: "Raporda 'beklenen sonuç' için hangi başlık kullanılır?", options: ["Expected result", "Wanted ending", "Hope answer", "Future result"], answer: "Expected result", why: "Standart başlık: Expected result / Actual result.", obj: "h1", whyNot: { "Wanted ending": "Standart başlık değildir; rapor 'Expected result' ve 'Actual result' ile yazılır.", "Hope answer": "İngilizce rapor başlığı olarak kullanılmaz; doğru başlık 'Expected result'tır.", "Future result": "Gelecekteki sonucu değil, olması beklenen sonucu yazarsın; başlık 'Expected result'tır." } },
      { q: "'Güncellemeden sonra başladı.' hangisi?", options: ["It started after the update.", "It start after update.", "It starts before the update yesterday.", "It started from update after."], answer: "It started after the update.", why: "Geçmişte başladı: started + after the update.", obj: "h2", whyNot: { "It start after update.": "Geçmişte başladığı için 'started' olmalı ve 'the' tanımlığı eksiktir.", "It starts before the update yesterday.": "'before' güncellemeden önce anlamına gelir, istenen 'sonra' anlamı değildir.", "It started from update after.": "Sözcük sırası bozuk; doğru kalıp 'It started after the update.'." } },
      { q: "Hata mesajı için en iyi yaklaşım hangisi?", options: ["Kelimesi kelimesine kopyalamak", "Kendi cümlenle özetlemek", "Sadece 'error' yazmak", "Hiç yazmamak"], answer: "Kelimesi kelimesine kopyalamak", why: "Kesin metin, aramak ve teşhis için en değerli bilgidir.", obj: "h3", whyNot: { "Kendi cümlenle özetlemek": "Özet, aranabilir ve teşhis için gereken tam ifadeyi kaybettirir.", "Sadece 'error' yazmak": "Hangi hata olduğunu söylemez; teşhise yardım etmez.", "Hiç yazmamak": "Hata mesajı teşhis için en değerli ipucudur, atlanmamalıdır." } },
      { q: "'Steps to reproduce' ne demek?", options: ["Hatayı tekrar oluşturma adımları", "Çözüm adımları", "Kurulum adımları", "Yedekleme adımları"], answer: "Hatayı tekrar oluşturma adımları", why: "Reproduce = tekrar üretmek; geliştirici bu adımlarla hatayı görür.", obj: "h1", whyNot: { "Çözüm adımları": "Çözüm adımları 'steps to fix' ya da 'solution' ile anlatılır.", "Kurulum adımları": "Kurulum adımları 'installation steps' olur.", "Yedekleme adımları": "Yedekleme adımları 'backup steps' olur." } },
      { q: "Hata her denemede ortaya çıkıyor. Bunu raporda nasıl yazarsın?", options: ["It happens every time.","It happen every time.","It happens every times.","It happens ever time."], answer: "It happens every time.", why: "'Every time' tekil ve ayrı yazılan bir kalıptır; üçüncü tekil kişi fiili -s alır: happens.", obj: "h2", whyNot: { "It happen every time.": "'It' ile fiil -s alır: happens.", "It happens every times.": "'every' tekil isim ister: every time, 'times' değil.", "It happens ever time.": "'ever' hiç demektir; sıklık için 'every' gerekir." } },
      { q: "Bir kullanıcı sadece 'It doesn't work.' yazdı. En faydalı ilk cevap hangisidir?", options: ["What error message do you see, and when did it start?","Please try again later.","Everything works on my side.","Can you describe it in one word?"], answer: "What error message do you see, and when did it start?", why: "Hata mesajı ve başlangıç zamanı, raporu tekrar üretilebilir yapan en değerli bilgilerdir.", obj: "h3", whyNot: { "Please try again later.": "Sorunu anlamak için bilgi toplamaz, sadece ertelemeyi önerir.", "Everything works on my side.": "Bilgi istemez ve kullanıcıyı yanlış çıkarır; hatayı tekrar üretmeye yardımcı olmaz.", "Can you describe it in one word?": "Tek sözcük yine belirsiz kalır; mesaj ve zaman gibi somut bilgi gerekir." } },
      { q: "Raporda 'Environment' satırına ne yazılır?", options: ["Windows 11, VPN client 5.2, home Wi-Fi","The connection stays active.","1) Open the VPN client 2) Connect","This bug is very annoying."], answer: "Windows 11, VPN client 5.2, home Wi-Fi", why: "Environment, hatanın görüldüğü işletim sistemi, yazılım sürümü ve bağlantıyı tanımlar.", obj: "h1", whyNot: { "The connection stays active.": "Bu bir 'Expected result' örneğidir.", "1) Open the VPN client 2) Connect": "Bunlar 'Steps to reproduce' adımlarıdır.", "This bug is very annoying.": "Kişisel yorum bir ortam bilgisi değildir ve raporda teşhise yardım etmez." } }
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
      { t: "h", text: "Şimdi – Geçmiş – Güçlü yön – Hedef" },
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
      { t: "warn", h: "Sık hata", text: "'I am working since 2 years' yanlış. Doğrusu: 'I have been working for two years' (veya basit: 'I have two years of experience'). Çok uzun cevap verme, 60 saniyeyi geçme." }
    ],
    story: { title: "Mülakat sabahı", text: "Deniz prepares an answer for the first question. She writes three parts: what she does now, what she studied before, and what she wants next. In the interview she speaks for one minute. The manager nods and asks about her CCNA study plan.", question: "What are the three parts of Deniz's answer? (İngilizce cevapla)" },
    objectives: [
      { id: "h1", text: "'Tell me about yourself' cevabını şimdi, geçmiş, güçlü yön ve hedef sırasıyla kurabilirsin." },
      { id: "h2", text: "Deneyim süresini 'I have two years of experience' veya 'I have been working for two years' kalıbıyla doğru söyleyebilirsin." },
      { id: "h3", text: "Güçlü yönünü ve hedefini 'My strength is ...' ve 'My goal is to ...' kalıplarıyla ifade edebilirsin." }
    ],
    summary: [
      "60 saniyelik iskelet: şimdi (I work as ...), geçmiş (Before that, I studied ...), güçlü yön (I'm good at ...), hedef (I'm now studying for the CCNA because ...).",
      "Cevap yaklaşık 60 saniye sürmeli; uzun cevap ve hayat hikâyesi mülakatta zarar verir.",
      "'I am working since 2 years' yanlıştır; doğrusu 'I have been working for two years' ya da 'I have two years of experience'.",
      "Hazır kalıplar: 'In my last job, I was responsible for ___.', 'One thing I'm proud of is ___.', 'That's why I'm interested in this position.'.",
      "Metni ezberlemek yerine anahtar kelimeyle anlat; telefonla kaydet, dinle ve iki kez kısalt."
    ],
    quiz: [
      { q: "'Tell me about yourself' cevabında en iyi yapı hangisi?", options: ["Şimdi – geçmiş – güçlü yön – hedef", "Doğumdan bugüne tüm hayat", "Sadece hobiler", "Sadece maaş beklentisi"], answer: "Şimdi – geçmiş – güçlü yön – hedef", why: "Kısa ve role bağlı kalan yapı: şimdi, geçmiş, güçlü yön, gelecek hedef.", obj: "h1", whyNot: { "Doğumdan bugüne tüm hayat": "60 saniyeye sığmaz ve role uygunluğu göstermez.", "Sadece hobiler": "Hobiler role neden uygun olduğunu göstermez; şimdi, geçmiş, güçlü yön ve hedef yapısı gerekir.", "Sadece maaş beklentisi": "İlk soruda erken bir konudur ve 'kendini anlat' sorusuna cevap vermez." } },
      { q: "'İki yıllık deneyimim var.' hangisi?", options: ["I have two years of experience.", "I am two years experience.", "I have experience of two year.", "I had two years experience now."], answer: "I have two years of experience.", why: "'have ... years of experience' standart kalıptır.", obj: "h2", whyNot: { "I am two years experience.": "'I am' kişiyi tanımlar, süreyi değil; deneyim 'I have ... of experience' ile söylenir.", "I have experience of two year.": "'two' ile isim çoğul olmalı (years) ve kalıp 'two years of experience' olarak sıralanır.", "I had two years experience now.": "'had' geçmiş, 'now' şimdi demektir ve çelişir; ayrıca 'of' eksiktir." } },
      { q: "'Güçlü yönüm sorun gidermek.' hangisi?", options: ["My strength is troubleshooting.", "My strong is troubleshoot.", "I strength troubleshooting.", "Strength mine troubleshooting."], answer: "My strength is troubleshooting.", why: "Strength (isim) + is + isim/ing.", obj: "h3", whyNot: { "My strong is troubleshoot.": "'strong' sıfattır, isim olarak 'strength' gerekir; 'troubleshoot' fiildir, 'troubleshooting' isim biçimi kullanılır.", "I strength troubleshooting.": "'strength' isimdir, fiil olarak kullanılamaz.", "Strength mine troubleshooting.": "Sahiplik 'my' ile isimden önce gelir ve cümlede 'is' fiili eksiktir." } },
      { q: "Cevap süresi kaç saniye civarı olmalı?", options: ["Yaklaşık 60 saniye", "5 saniye", "10 dakika", "30 dakika"], answer: "Yaklaşık 60 saniye", why: "Kısa, net ve etkileyici. Detay için ek soru gelir.", obj: "h1", whyNot: { "5 saniye": "Çok kısadır; kendini tanıtmaya yetmez.", "10 dakika": "Tek taraflı uzun bir monolog olur ve mülakatçının sorularına yer bırakmaz.", "30 dakika": "Bir tanıtım sorusu için fazlasıyla uzundur; detay için ek soru gelir." } },
      { q: "'Üç yıldır BT desteğinde çalışıyorum.' cümlesinin doğru İngilizcesi hangisidir?", options: ["I have been working in IT support for three years.","I am working in IT support since three years.","I work in IT support since three years.","I have been working in IT support since three years."], answer: "I have been working in IT support for three years.", why: "Süre belirtirken 'for' kullanılır ve eylem sürüyorsa present perfect continuous (have been working) gelir.", obj: "h2", whyNot: { "I am working in IT support since three years.": "'since' bir başlangıç noktası ister, süre ise 'for' ile söylenir; ayrıca zaman biçimi de uymaz.", "I work in IT support since three years.": "'since' ile süre söylenmez ve present simple bu kullanımda yetersizdir.", "I have been working in IT support since three years.": "Zaman biçimi doğru, ama 'since' süre (three years) ile kullanılamaz; süre için 'for' gerekir." } },
      { q: "'Hedefim ağ mühendisi olmak.' cümlesinin doğru İngilizcesi hangisidir?", options: ["My goal is to become a network engineer.","My goal is become a network engineer.","My goal are to become a network engineer.","My goal to becoming network engineer is."], answer: "My goal is to become a network engineer.", why: "Hedef bildirirken 'My goal is to + yalın fiil' kalıbı kullanılır.", obj: "h3", whyNot: { "My goal is become a network engineer.": "'is' ile fiil arasında 'to' eksiktir: is to become.", "My goal are to become a network engineer.": "'goal' tekildir, 'is' gerekir.", "My goal to becoming network engineer is.": "Sözcük sırası bozuk ve 'to becoming' kalıbı yanlıştır; yalın fiil gerekir." } },
      { q: "'Before that, I studied computer technology.' cümlesi 60 saniyelik iskeletin hangi parçasıdır?", options: ["Geçmiş","Şimdi","Gelecek hedef","Güçlü yön"], answer: "Geçmiş", why: "'Before that' ve past simple (studied) geçmiş deneyimi ve eğitimi anlatan parçadır.", obj: "h1", whyNot: { "Şimdi": "Şimdi parçası 'I work as ...' gibi mevcut işi anlatır.", "Gelecek hedef": "Hedef parçası 'I'm now studying for the CCNA because ...' gibi geleceği anlatır.", "Güçlü yön": "Güçlü yön parçası 'I'm good at ...' ile başlar." } }
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

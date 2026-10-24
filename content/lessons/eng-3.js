/* İngilizce (iş ve BT) · sabit dersler 12-15 (PR yorumu, olay bildirimi, sunum ve demo, README). Dış kaynak: yalnız HTTP 200 dönenler (curl, 2026-10-19). */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).eng = (window.PP_LESSONS.eng || {}));
  var BBC = { title: "BBC Learning English (ücretsiz ders ve podcast)", url: "https://www.bbc.co.uk/learningenglish", type: "kurs", level: "başlangıç", lang: "EN" };
  var CAM = { title: "Cambridge Dictionary (örnek cümleli sözlük)", url: "https://dictionary.cambridge.org/", type: "araç", level: "başlangıç", lang: "EN" };
  function res(a, why) { var o = {}; for (var k in a) o[k] = a[k]; o.why = why; return o; }

  /* 12 ──────────────────────────────────────────── Kod incelemesi: PR yorumu */
  L[12] = {
    hook: "PR'ına 'This is wrong.' yazan biriyle mi çalışmak istersin, 'Could we use a constant here? It would avoid typos.' yazanla mı? İkisi de aynı şeyi söyler; biri kapıyı kapatır, biri açar.",
    homework: "Kendi yazdığın ya da herkese açık küçük bir koddan üç sorun seç. Biri için 'Nit:', biri için 'Question:', biri için 'Suggestion:' ile başlayan birer İngilizce yorum yaz; her birinde gerekçe (because / so that) ve öneri (Could we ...?) olsun. Sonra birine kibarca itiraz eden bir yanıt yaz.",
    warmup: { words: [
      { word: "nit", tr: "küçük, zorunlu olmayan düzeltme", pos: "noun", ex: "Nit: please rename this variable.", exTr: "Küçük not: lütfen bu değişkeni yeniden adlandır.", use: "Yorum etiketi", level: "B1" },
      { word: "address (a comment)", tr: "yoruma karşılık vermek", pos: "verb", ex: "I addressed all the comments.", exTr: "Tüm yorumlara karşılık verdim.", use: "Yorumu alan yazar", level: "B1" },
      { word: "approve", tr: "onaylamak", pos: "verb", ex: "I will approve it after the tests pass.", exTr: "Testler geçince onaylayacağım.", use: "İnceleme sonunda", level: "A2" }
    ] },
    blocks: [
      { t: "h", text: "Durum" },
      { t: "box", h: "Gerçek durum", text: "Ekip arkadaşın bir pull request (PR) açtı: kodunu ana dala eklemeden önce incelemeni istiyor. İki sorun görüyorsun: bir değişken adı kafa karıştırıyor, bir sorgu kullanıcı girdisini doğrudan metne ekliyor. Yazılı yorumda ses tonu ve mimik yoktur; yüz yüze nazik duyulan cümle yazıda sert okunabilir. Bu yüzden yorumun yapısı önemlidir." },
      { t: "h", text: "Bir yorumun üç parçası" },
      { t: "steps", h: "Etiket – gözlem – gerekçe ve öneri", items: [
        "Etiket: yorumun ağırlığını başta söyle. 'Nit:' (küçük not), 'Question:' (soru), 'Suggestion:' (öneri), 'Blocking:' (bu çözülmeden birleştirmeyelim). Ekipler etiketleri farklı kullanabilir; ekibinin kuralına uy.",
        "Gözlem: kişiye değil koda bak. 'This query adds user input to the SQL text.' ('You wrote an unsafe query.' değil.)",
        "Gerekçe ve öneri: nedeni 'because' ya da 'so that' ile, öneriyi 'Could we ...?' ya da 'What do you think about ...?' ile söyle."
      ] },
      { t: "split", tr: "Bu değişkeni yeniden adlandırabilir miyiz? Daha anlaşılır olur.", parts: [
        { tr: "...-ebilir miyiz (birlikte)", q: "Kibar öneri", en: "Could we" },
        { tr: "yeniden adlandırmak", q: "Ne yapalım?", en: "rename" },
        { tr: "bu değişkeni", q: "Neyi?", en: "this variable" },
        { tr: "daha anlaşılır olsun diye", q: "Gerekçe", en: "so that it is clearer" }
      ], result: "Could we rename this variable so that it is clearer?" },
      { t: "h", text: "Çalışan örnek" },
      { t: "cmd", lang: "text", calistirma: "atla PR yorumu metni; kod değil", text: "Nit: `tmp` is hard to understand. Could we rename it to `userCount`?\n\nQuestion: What happens if `items` is empty? I think line 42 would throw an error.\n\nSuggestion: This query adds user input directly to the SQL text. Could we use a parameterized query instead? It would prevent SQL injection.\n\nBlocking: The password is written to the log on line 88. Let's remove it before we merge.\n\nNice work on the tests, by the way. They were easy to read." },
      { t: "h", text: "Yazar olarak yanıt vermek" },
      { t: "steps", h: "Kabul, soru, kibar itiraz", items: [
        "Kabul: 'Good catch, thanks! I'll fix it.' Düzelttikten sonra: 'Done.'",
        "Soru: 'Could you clarify what you mean by ___?' (___ ile neyi kastettiğini açar mısın?)",
        "Kibar itiraz: 'I see your point. I kept it this way because ___. Would it be OK if we ___?'",
        "Ertelemek: 'That's a good idea, but it is out of scope for this PR. Could we do it in a follow-up PR?'",
        "Bitirince: 'I've addressed all the comments. Could you take another look?'"
      ] },
      { t: "h", text: "Sertten nazike: hata düzeltme" },
      { t: "steps", h: "Bozuk yorum → düzeltilmiş yorum", items: [
        "'This is wrong.' → 'I think this might return null when the list is empty. Could we add a check?'",
        "'Why you did not write a test?' → 'Could we add a test for this case? It would help us catch regressions.' (Soruda yardımcı fiil öne gelir: Why did you ...?)",
        "'You must to change it.' → 'Could we change this to ___? That would ___.' (must/could'tan sonra 'to' gelmez.)",
        "'Fix it please.' → 'Suggestion: please rename `x` to `retryCount`, because `x` does not say what it counts.'"
      ] },
      { t: "box", h: "Altın kural", text: "Yorum kodu hedef alsın, kişiyi değil. Her yorum şunları söylesin: ne gördün, neden önemli, ne öneriyorsun. Çok yorum yazıyorsan iyi olan bir şeyi de belirt ('Nice work on ...'). Ama ciddi bir sorunu nezaket uğruna yumuşatıp gizleme: 'Blocking:' etiketiyle açıkça söyle." },
      { t: "warn", h: "Sık hata", text: "'Please fix' tek başına neyi ve neden değiştireceğini söylemez. 'Why you did remove this?' yanlış: doğrusu 'Why did you remove this?'. 'Could you to add' ve 'Could you adding' da yanlış: could'tan sonra yalın fiil gelir, 'Could you add ...?'." }
    ],
    story: { title: "Üç yorum", text: "Berk opened a pull request. Selin wrote: 'Question: what happens when the file is missing? I think the code stops with an error. Could we add a check?' Berk answered: 'Good catch, thanks! I added a check and a test. Could you take another look?'", question: "What did Berk add? (İngilizce cevapla)" },
    objectives: [
      { id: "h1", text: "Koda yönelik bir PR yorumunu etiket, gözlem ve gerekçe/öneri parçalarıyla İngilizce yazabilirsin." },
      { id: "h2", text: "Sert bir yorumu 'Could we ...?' ve 'because' kalıplarıyla kibar ve gerekçeli bir yoruma çevirebilirsin." },
      { id: "h3", text: "Aldığın yoruma kabul, soru ya da kibar itiraz cümlesiyle doğru tonda yanıt yazabilirsin." },
      { id: "h4", text: "Soru sırası ya da fiil biçimi hatalı yorum cümlelerini ('Why you did ...?', 'Could you to ...') bulup düzeltebilirsin." }
    ],
    summary: [
      "İyi bir PR yorumu üç parçalıdır: etiket (Nit, Question, Suggestion, Blocking), koda bakan gözlem, gerekçe ve öneri.",
      "Kibar öneri 'Could we ...?' ile, gerekçe 'because' ya da 'so that' ile kurulur; yorum kişiyi değil kodu hedef alır.",
      "Yoruma yanıt: kabul için 'Good catch, thanks! I'll fix it.', itiraz için 'I see your point. I kept it this way because ___.', erteleme için 'Could we do it in a follow-up PR?'.",
      "Soruda yardımcı fiil özneden önce gelir ('Why did you remove this?'); could ve must'tan sonra yalın fiil gelir, 'to' ya da -ing gelmez.",
      "Ciddi bir sorunu (güvenlik, veri kaybı) yumuşatıp gizleme; 'Blocking:' etiketiyle ve gerekçesiyle açıkça yaz."
    ],
    quiz: [
      { id: "66d289e5", q: "Bir PR yorumunun başındaki 'Nit:' etiketi ne anlatır?", options: ["Düzelmeden birleştirilmemesi gereken ciddi bir hata", "Küçük, birleştirmeyi engellemeyen bir düzeltme önerisi", "Yorumu yazanın soruyu anlamadığı", "PR'ın başka biri tarafından açıldığı"], obj: "h1" },
      { id: "2a958fa8", q: "Hangi yorum etiket, gözlem ve gerekçe/öneri parçalarının üçünü de taşır?", options: ["Suggestion: Please change this query before we merge the whole change.", "This query is bad and it should not be in a professional project.", "Why did you write this query like this? Nobody in the team writes it this way.", "Suggestion: This query adds user input to the SQL text. Could we use a parameterized query? It would prevent SQL injection."], obj: "h1" },
      { id: "6a2117c1", q: "'Bu değişkenin adı kötü, değiştir.' yorumunu en kibar ve gerekçeli şekilde hangisi söyler?", options: ["Could we rename this variable? A clearer name would help the next reader.", "Rename this variable now.", "You named this variable badly.", "Why you did not choose a better name?"], obj: "h2" },
      { id: "a2db29e5", q: "'Bunu bu PR'da yapmayalım, ayrı bir PR'a bırakalım.' için hangisi doğrudur?", options: ["Could we to leave this for a follow-up PR?", "Could we leaving this for a follow-up PR?", "Could we leave this for a follow-up PR?", "We could leaves this for a follow-up PR?"], obj: "h2" },
      { id: "defff203", q: "Reviewer 'Question: what happens if the list is empty?' diye sordu ve haklı bir noktaya işaret ediyor. En uygun yanıt hangisidir?", options: ["That is not my problem.", "Good catch, thanks! I added a check and a test.", "Why you ask this?", "Read the code again."], obj: "h3" },
      { id: "ffff9c67", q: "Reviewer önerisine katılmıyorsun ama gerekçen var. Hangisi kibar bir itirazdır?", options: ["No. I will not change it and this discussion is over.", "You are wrong about this, and the code is already fine.", "I disagree you, because the code works on my machine.", "I see your point. I kept it this way because the API returns strings. Would it be OK if we leave it?"], obj: "h3" },
      { id: "1952efbc", q: "Hangi yorum cümlesi hatasızdır?", options: ["Why you removed this check?", "Why you did remove this check?", "Why did you remove this check?", "Why did you removed this check?"], obj: "h4" },
      { id: "ccae5997", q: "'Could you adding a test for this case?' cümlesinin doğru hâli hangisidir?", options: ["Could you add a test for this case?", "Could you to add a test for this case?", "Could you added a test for this case?", "Can you adding a test for this case?"], obj: "h4" }
    ],
    interview: [
      { q: "How do you give feedback in a code review?", a: "I comment on the code, not on the person. I use a short label, for example Nit or Suggestion. I explain why, and I offer an option, for example: Could we use a constant here? It would avoid typos. I also say what is good." },
      { q: "What do you do when you disagree with a review comment?", a: "I thank the reviewer and explain my reason politely: I see your point, but I kept it this way because ... Then I ask a question, such as: Would it be OK if we do it in a follow-up PR? If we still disagree, I ask the tech lead to decide." },
      { q: "How do you reply when you get many comments on your PR?", a: "I answer each one: Done, or a short reason. When I finish, I write: I've addressed all the comments. Could you take another look?" }
    ],
    vocab: [
      { term: "Pull request (PR)", tr: "kodu birleştirme ve inceleme isteği", ex: "I opened a PR." },
      { term: "Reviewer", tr: "inceleyen kişi", ex: "The reviewer left three comments." },
      { term: "Approve", tr: "onaylamak", ex: "I'll approve once the tests pass." },
      { term: "Merge", tr: "birleştirmek", ex: "We can merge after the review." },
      { term: "Follow-up", tr: "sonraki iş, takip", ex: "Let's do it in a follow-up PR." },
      { term: "Out of scope", tr: "kapsam dışı", ex: "That change is out of scope for this PR." },
      { term: "Nit", tr: "küçük, zorunlu olmayan not", ex: "Nit: add a space here." }
    ],
    resources: [
      res({ title: "Google eng-practices: How to write code review comments", url: "https://google.github.io/eng-practices/review/reviewer/comments.html", type: "doc", level: "orta", lang: "EN" }, "Yorumun kibar, açık ve gerekçeli yazılması için kısa kılavuz"),
      res({ title: "Google eng-practices: How to handle reviewer comments", url: "https://google.github.io/eng-practices/review/developer/handling-comments.html", type: "doc", level: "orta", lang: "EN" }, "Yorumu alan yazar tarafı: yanıt vermek ve anlaşmazlığı çözmek"),
      res(CAM, "Kalıpların doğru kullanımını örneklerle görmek için")
    ],
    sources: [{ title: "Google eng-practices: How to write code review comments", url: "https://google.github.io/eng-practices/review/reviewer/comments.html" }, { title: "Google eng-practices: How to handle reviewer comments", url: "https://google.github.io/eng-practices/review/developer/handling-comments.html" }]
  };

  /* 13 ──────────────────────────────────────────── Olay bildirimi ve durum güncellemesi */
  L[13] = {
    hook: "Sistem düştü ve herkes 'ne oldu?' diye soruyor. Düzenli yazılmış beş satırlık bir güncelleme, yüz ayrı mesajın yerini tutar.",
    homework: "Uydurma bir kesinti seç (ör. giriş sayfası açılmıyor). Beş parçalı durum güncellemesini İngilizce yaz: Status, Impact, What we know, Action, Next update. Sonra 'Resolved' durumunda ayrı bir kapanış mesajı yaz. Nedeni bilmiyorsan tahmin etme, 'We don't know the cause yet.' yaz.",
    warmup: { words: [
      { word: "outage", tr: "kesinti", pos: "noun", ex: "We have an outage in the login service.", exTr: "Giriş hizmetinde bir kesinti var.", use: "Olay bildirirken", level: "B1" },
      { word: "impact", tr: "etki", pos: "noun", ex: "The impact is limited to the web app.", exTr: "Etki yalnız web uygulamasıyla sınırlı.", use: "Güncellemede", level: "B1" },
      { word: "roll back", tr: "önceki sürüme dönmek", pos: "phrasal verb", ex: "We rolled back the release.", exTr: "Sürümü geri aldık.", use: "Çözüm anlatırken", level: "B1" }
    ] },
    blocks: [
      { t: "h", text: "Durum" },
      { t: "box", h: "Gerçek durum", text: "Cuma sabahı 10:05'te kullanıcılar sisteme giremiyor. Yönetici, müşteri destek ekibi ve başka ekipler aynı soruyu soruyor. Herkese tek tek yazmak yerine kanala tek bir güncelleme yazarsın. Okuyan 20 saniyede durumu, etkiyi ve yeni bilginin ne zaman geleceğini anlamalı." },
      { t: "h", text: "Durum güncellemesinin beş parçası" },
      { t: "steps", h: "Status – Impact – What we know – Action – Next update", items: [
        "Status (durum): Investigating (araştırıyoruz), Identified (kaynağı bulduk), Monitoring (izliyoruz), Resolved (çözüldü).",
        "Impact (etki): kim ya da ne etkilendi? 'Some users cannot log in.' / 'About 20 percent of requests fail.'",
        "What we know (bilinenler): zaman ve olgular. 'It started at 10:05.' Bilmiyorsan: 'We don't know the cause yet.'",
        "Action (yapılan iş): 'We are checking the latest release.' / 'We rolled back the release.'",
        "Next update (sonraki güncelleme): 'Next update at 10:45.' Söz verdiğin saatte, yeni bilgi olmasa bile 'No change yet.' yaz."
      ] },
      { t: "split", tr: "Giriş sorununu araştırıyoruz.", parts: [
        { tr: "biz ...-yoruz (şu an)", q: "Şimdi sürüyor mu?", en: "We are" },
        { tr: "araştırmak (-ing)", q: "Ne yapıyoruz?", en: "investigating" },
        { tr: "giriş sorununu", q: "Neyi?", en: "the login issue" }
      ], result: "We are investigating the login issue." },
      { t: "h", text: "Çalışan örnek" },
      { t: "cmd", lang: "text", calistirma: "atla durum güncellemesi metni; kod değil", text: "[Investigating] Login problem\nStatus: Investigating\nImpact: Some users cannot log in to the web app. The mobile app is not affected.\nWhat we know: The problem started at 10:05. We don't know the cause yet.\nAction: We are checking the latest release and the database connection.\nNext update: 10:45.\n\n[Resolved] Login problem\nStatus: Resolved\nImpact: Login was unavailable for about 35 minutes (10:05-10:40).\nCause: A wrong setting was included in the last release.\nAction: We rolled back the release at 10:40. Logins are working again.\nNext step: We will write a short report by Monday and add a check to the release steps." },
      { t: "h", text: "Zaman kalıpları" },
      { t: "steps", h: "Hangi olay için hangi zaman?", items: [
        "Başlangıç (bitmiş an): 'It started at 10:05.' (past simple + saat)",
        "Başlangıçtan beri süren durum: 'Users have been unable to log in since 10:05.' (have/has + since + başlangıç anı)",
        "Süre: 'It lasted about 40 minutes.' / 'It was down for 40 minutes.' (for + süre)",
        "Şu an yapılan: 'We are checking the logs.' (am/is/are + -ing)",
        "Yapıldı ve sonucu şimdi önemli: 'We have found the cause.' (have/has + fiilin üçüncü hâli)",
        "Plan: 'We will update you at 11:00.'"
      ] },
      { t: "h", text: "Bilgi, tahmin ve bilinmeyen" },
      { t: "steps", h: "Kesin mi, muhtemel mi, bilinmiyor mu?", items: [
        "Kesin (kanıtın varsa): 'The database is down.'",
        "Muhtemel: 'We think the problem is in the login service.' / 'It might be related to the last release.'",
        "Bilinmeyen: 'We don't know the cause yet.' / 'We are not sure yet.'",
        "Suçlama yok: 'Ali broke the server.' yerine 'A wrong setting was released.' Olguyu söyle, kişiyi değil."
      ] },
      { t: "h", text: "Telefonda ya da sohbette yükseltme" },
      { t: "steps", h: "Üst birime ya da başka ekibe bildirmek", items: [
        "'I'm calling about an outage in the login service. It started at 10:05.'",
        "'Could you join the incident call? We need someone from the database team.'",
        "'Let me read it back: login service, since 10:05, about 20 percent of users. Is that right?'",
        "'Sorry, could you spell the server name, please?'"
      ] },
      { t: "h", text: "Bozuk güncellemeyi düzelt" },
      { t: "steps", h: "Bozuk → düzeltilmiş", items: [
        "'Server broke by Ali. We fix now. Update maybe later.' → 'The server is down. We are fixing it now. Next update at 11:00.'",
        "'The login is not working since 10.' → 'Login has not been working since 10:00.' (since ile present perfect)",
        "'We solved the problem, it will never happen again.' → 'We rolled back the release and the service is stable. We will add a check to prevent this.' (Garanti verme.)"
      ] },
      { t: "warn", h: "Sık hata", text: "'The server is down since 10:05' yanlıştır; since ile present perfect gelir: 'The server has been down since 10:05.' 'Yesterday the server was down since 10' da yanlıştır. Ayrıca tahmini neden olarak yazma ve kişi adı verme: bilgin yoksa 'We don't know the cause yet.' yaz." }
    ],
    story: { title: "Sabah kesintisi", text: "At 10:05 the login page stopped working. Elif wrote in the team channel: 'We are investigating a login problem. Some users cannot log in. It started at 10:05. Next update at 10:45.' At 10:40 she wrote: 'We rolled back the release. Login works again.'", question: "When is the next update? (İngilizce cevapla)" },
    objectives: [
      { id: "h1", text: "Bir kesinti için durum, etki, bilinenler, yapılan iş ve sonraki güncelleme parçalarını içeren İngilizce bir güncelleme yazabilirsin." },
      { id: "h2", text: "Başlangıcı, süren durumu ve şu an yapılan işi past simple, since ile present perfect ve present continuous ile doğru zamanda yazabilirsin." },
      { id: "h3", text: "Kesin bilgiyi, tahmini ve bilinmeyeni ayırıp kişiyi suçlamadan yazabilirsin." },
      { id: "h4", text: "Telefonda ya da sohbette olayı bildirip yükseltme isteğini ve geri okuyarak doğrulamayı İngilizce yapabilirsin." }
    ],
    summary: [
      "Durum güncellemesi beş parçalıdır: Status, Impact, What we know, Action ve Next update.",
      "Başlangıç için past simple ('It started at 10:05'), süren durum için since ile present perfect ('has been down since 10:05'), şu an yapılan iş için present continuous ('We are checking') kullanılır.",
      "Nedeni bilmiyorsan 'We don't know the cause yet.' yaz; tahmini 'We think ...' ile belirt ve kişi adıyla suçlama yapma.",
      "Sonraki güncelleme saatini mutlaka ver ve yeni bilgi olmasa da o saatte 'No change yet.' yaz.",
      "Telefonda 'Could you spell ...?' ile netleştir, 'Let me read it back ... Is that right?' ile doğrula."
    ],
    quiz: [
      { id: "6a153b31", q: "Kesinti güncellemesinde 'Next update: 10:45.' satırı neden yazılır?", options: ["Sorunun 10:45'te kesin olarak çözüleceğini herkese garanti etmek için", "Yöneticiye ve müşteriye resmî bir rapor sunmak için", "Okuyan yeni bilginin ne zaman geleceğini bilsin ve tekrar tekrar sormasın diye", "Hata kaydını kapatıp ekibi bilgilendirmeyi bırakmak için"], obj: "h1" },
      { id: "ac7d3d4f", q: "Hangi satır 'Impact' (etki) bölümüne aittir?", options: ["Some users cannot log in to the web app.", "We are checking the latest release.", "It started at 10:05.", "Next update at 10:45."], obj: "h1" },
      { id: "ebfc9b46", q: "Cümleyi tamamla: 'Users ___ unable to log in since 10:05.'", options: ["are", "were", "has been", "have been"], obj: "h2" },
      { id: "ba951415", q: "'Şu an günlükleri kontrol ediyoruz.' cümlesinin doğru İngilizcesi hangisidir?", options: ["We are check the logs.", "We are checking the logs.", "We checking the logs.", "We are checks the logs."], obj: "h2" },
      { id: "f1946ba0", q: "Nedenini henüz bilmiyorsun. Hangi cümle dürüst ve doğrudur?", options: ["We don't know the cause yet.", "The cause is a database failure.", "Ali probably broke the server.", "It is not our problem."], obj: "h3" },
      { id: "102c9c65", q: "Kişiyi suçlamadan olguyu yazan cümle hangisidir?", options: ["Ali included a wrong setting in the release.", "Ali forgot to check the release.", "A wrong setting was included in the release.", "The testers did not find the problem."], obj: "h3" },
      { id: "ab05fd02", q: "Telefonda sunucu adını duymadın. Hangisi uygun bir istektir?", options: ["What? Say it again, I did not hear.", "Spell it.", "You must to spell the name.", "Sorry, could you spell the server name, please?"], obj: "h4" },
      { id: "7b704127", q: "Aldığın bilgiyi geri okuyarak doğrulamak için hangisi uygundur?", options: ["I read you back, and I think it is fine.", "Let me read it back: login service, since 10:05. Is that right?", "Read back me the numbers, please.", "Let me to read back it to you."], obj: "h4" }
    ],
    interview: [
      { q: "How do you communicate during an incident?", a: "I write short updates at regular times. Each update has the status, the impact, what we know, what we are doing and when the next update comes. I do not guess the cause, and I do not blame people." },
      { q: "What do you do if you do not know the cause?", a: "I say it clearly: We don't know the cause yet. Then I say what we are checking and when I will update again." },
      { q: "Describe a time you handled a production problem.", a: "I use a simple structure: what happened, what I did, what the result was, and what we changed. For example: the login stopped working, I checked the latest release, we rolled it back, and I added a check to the release steps. (Kendi gerçek örneğinle değiştir.)" }
    ],
    vocab: [
      { term: "Outage", tr: "kesinti", ex: "We had a short outage this morning." },
      { term: "Incident", tr: "olay, kesinti vakası", ex: "We opened an incident." },
      { term: "Impact", tr: "etki", ex: "The impact is limited to the web app." },
      { term: "Root cause", tr: "kök neden", ex: "We are looking for the root cause." },
      { term: "Roll back", tr: "önceki sürüme dönmek", ex: "We rolled back the release." },
      { term: "Escalate", tr: "üst birime iletmek", ex: "I escalated the problem to the database team." },
      { term: "Postmortem", tr: "olay sonrası değerlendirme", ex: "We wrote a blameless postmortem." }
    ],
    resources: [
      res({ title: "Atlassian: Incident communication best practices", url: "https://www.atlassian.com/incident-management/incident-communication", type: "doc", level: "orta", lang: "EN" }, "Olay sırasında kimin neyi, ne zaman duyması gerektiği"),
      res({ title: "Google SRE Book: Postmortem culture", url: "https://sre.google/sre-book/postmortem-culture/", type: "doc", level: "orta", lang: "EN" }, "Suçlamasız olay değerlendirmesi ve olgulara dayalı yazım"),
      res(BBC, "Günlük iş konuşmaları ve kısa dinlemeler")
    ],
    sources: [{ title: "Atlassian: Incident communication best practices", url: "https://www.atlassian.com/incident-management/incident-communication" }, { title: "Google SRE Book: Postmortem culture", url: "https://sre.google/sre-book/postmortem-culture/" }]
  };

  /* 14 ──────────────────────────────────────────── Sunum ve demo anlatımı */
  L[14] = {
    hook: "Beş dakikalık bir demoda ekranı doğru gösterip yanlış anlatırsan dinleyici ne gördüğünü bilemez. İyi bir demoda her tıklamanın bir cümlesi vardır.",
    homework: "Kendi yaptığın ya da herkese açık küçük bir uygulamayı seç. Üç dakikalık bir demo metni yaz: açılış (amaç ve gündem), üç adımlı gösterim (First / Next / Finally), kapanış (özet ve sonraki adım). Metni sesli oku, süreni ölç ve bir soruya 'I'm not sure, but I'll check and get back to you.' yanıtı hazırla.",
    warmup: { words: [
      { word: "walk through", tr: "adım adım göstermek", pos: "phrasal verb", ex: "Let me walk you through the new screen.", exTr: "Yeni ekranı adım adım göstereyim.", use: "Demo anlatırken", level: "B1" },
      { word: "agenda", tr: "gündem, sunum planı", pos: "noun", ex: "Here is the agenda for today.", exTr: "Bugünün planı burada.", use: "Açılışta", level: "B1" },
      { word: "wrap up", tr: "toparlamak", pos: "phrasal verb", ex: "Let me wrap up with the next steps.", exTr: "Sonraki adımlarla toparlayayım.", use: "Kapanışta", level: "B2" }
    ] },
    blocks: [
      { t: "h", text: "Durum" },
      { t: "box", h: "Gerçek durum", text: "Sprint sonunda ekibine ve ürün sahibine yaptığın işi beş dakikada göstereceksin. Dinleyiciler teknik olmayabilir. Ekranda ne olduğunu, neden önemli olduğunu ve sonra ne yapılacağını kısa cümlelerle söylemelisin." },
      { t: "h", text: "Sunumun iskeleti" },
      { t: "steps", h: "Açılış – Gösterim – Kapanış", items: [
        "Açılış: 'Hi everyone, I'm Elif. Today I'm going to show you the new search feature.' (kim, ne gösterilecek)",
        "Gündem: 'First, I'll explain the problem. Then I'll show the demo. Finally, we can talk about next steps.'",
        "Gösterim: her adım için bir sıralama sözcüğü ve bir kısa cümle: 'First, I open the search page.' / 'Next, I type a word.' / 'As you can see, the results appear immediately.'",
        "Kapanış: 'To sum up, search is now faster. The next step is to test it with real users. Any questions?'"
      ] },
      { t: "split", tr: "Gördüğünüz gibi, sonuçlar hemen çıkıyor.", parts: [
        { tr: "gördüğünüz gibi", q: "Ekrana dikkat çekmek", en: "As you can see," },
        { tr: "sonuçlar", q: "Ne?", en: "the results" },
        { tr: "hemen çıkıyor", q: "Nasıl?", en: "appear immediately" }
      ], result: "As you can see, the results appear immediately." },
      { t: "h", text: "Çalışan örnek" },
      { t: "cmd", lang: "text", calistirma: "atla sunum metni; kod değil", text: "Hi everyone, I'm Elif. Today I'm going to show you the new search feature.\nFirst, I'll explain the problem. Then I'll show a short demo. Finally, we can talk about next steps.\n\nThe problem: users could not find old orders.\nLet me share my screen. Can everyone see it?\nFirst, I open the orders page. Next, I type a word in the search box.\nAs you can see, the results appear immediately.\nFinally, I click an order to open its details.\n\nTo sum up, search is now faster. The next step is to test it with real users.\nThat's all from me. Any questions?" },
      { t: "h", text: "Ekran paylaşımı ve akış kalıpları" },
      { t: "steps", h: "Demo sırasında söyleyebileceklerin", items: [
        "'Let me share my screen. Can everyone see it?' (paylaşmadan önce ve sonra)",
        "'I'm going to click here.' / 'On the left you can see the menu.' (ne yaptığını söyle)",
        "'This takes a few seconds.' / 'While it loads, let me explain ...' (bekleme anı)",
        "'Let me go back to the previous screen.' (geri dönüş)",
        "'To sum up, ...' / 'The key point is ...' (özet)"
      ] },
      { t: "h", text: "Soruları yanıtlamak" },
      { t: "steps", h: "Anlamadığın ve bilmediğin soru", items: [
        "Anlamadın: 'Sorry, could you repeat the question, please?' / 'Do you mean the mobile app?'",
        "Biliyorsun: 'Yes, it works on mobile too. I'll show it.'",
        "Bilmiyorsun: 'Good question. I'm not sure, but I'll check and get back to you by tomorrow.'",
        "Konu dışı: 'That's a great point. Can we talk about it after the meeting?'"
      ] },
      { t: "h", text: "Demoda hata çıkarsa" },
      { t: "steps", h: "Sakin kalıp", items: [
        "'Something unexpected happened. Let me try that again.'",
        "Çalışmazsa yedek: 'Let me show you a screenshot instead.'",
        "Suçlama ya da panik yok: 'This never works!' yerine 'It looks like the data has not loaded. Let me refresh the page.'"
      ] },
      { t: "h", text: "Bozuk cümleyi düzelt" },
      { t: "steps", h: "Bozuk → düzeltilmiş", items: [
        "'Today I show you the new feature in the future.' → 'Today I'm going to show you the new feature.'",
        "'Like you can see, results appearing.' → 'As you can see, the results appear immediately.'",
        "'Let me to share the screen, you see?' → 'Let me share my screen. Can everyone see it?'"
      ] },
      { t: "warn", h: "Sık hata", text: "'Let me to share' (let'ten sonra to gelmez), 'I will to show' (will'den sonra to gelmez) ve 'Thank you for your listening' (doğrusu 'Thank you for listening') sık yapılan hatalardır. Ayrıca bilmediğin bir soruya 'Yes' deme; 'I'll check' de ve söz verdiğin zamanda dön." }
    ],
    story: { title: "Sprint demosu", text: "Elif opened her demo with one sentence: 'Today I'm going to show you the new search feature.' She shared her screen and asked, 'Can everyone see it?' When a manager asked about mobile, she said, 'Good question. I'm not sure, but I'll check and get back to you by tomorrow.'", question: "What will Elif do about the mobile question? (İngilizce cevapla)" },
    objectives: [
      { id: "h1", text: "Bir demonun açılışını (kim, ne gösterilecek, gündem) ve kapanışını (özet, sonraki adım, soru daveti) İngilizce yapabilirsin." },
      { id: "h2", text: "Demo adımlarını sıralama sözcükleri ve 'As you can see' kalıbıyla, doğru fiil biçimiyle anlatabilirsin." },
      { id: "h3", text: "Ekran paylaşırken ve beklenmedik bir hata çıktığında sakin kalıplarla yanıt verebilirsin." },
      { id: "h4", text: "Soruyu tekrar isteyebilir, bildiğin soruyu yanıtlayabilir ve bilmediğin soruya dürüstçe takip sözü verebilirsin." }
    ],
    summary: [
      "Demo üç parçalıdır: açılış (kim, ne, gündem), gösterim (sıralı adımlar) ve kapanış (özet, sonraki adım, soru).",
      "Amaç için 'I'm going to show you ...', ekrandaki sonuç için 'As you can see, ...' kullanılır.",
      "'Let me' ve 'will' den sonra 'to' gelmez: 'Let me share', 'I will show'.",
      "Hata çıkarsa panik ve suçlama yerine 'Something unexpected happened. Let me try that again.' de.",
      "Bilmediğin soruya 'I'm not sure, but I'll check and get back to you' de ve söz ver."
    ],
    quiz: [
      { id: "993ca8a5", q: "Sunumun açılışında ne yapacağını söyleyen doğru cümle hangisidir?", options: ["Today I am going show you the new search feature.", "Today I'm going to show you the new search feature.", "Today I will to show you the new search feature.", "Today I showing you the new search feature."], obj: "h1" },
      { id: "f0bd5e2b", q: "Kapanışta sonraki adımı bildirip soru davet eden uygun cümle hangisidir?", options: ["That's all from me. The next step is to test it with real users. Any questions?", "That's all. Thank you for your listening.", "Finish. Bye.", "I hope you understand everything, if not it's your problem."], obj: "h1" },
      { id: "1c21b66b", q: "Ekranda o an görünen sonucu göstermek için hangi cümle doğrudur?", options: ["As you see it, the results appears immediately.", "How you can see, the results appear immediately.", "Like you can see, results appearing immediately.", "As you can see, the results appear immediately."], obj: "h2" },
      { id: "d5e6fd96", q: "Demoda bir sonraki adıma geçerken hangi cümle doğrudur?", options: ["Next, I am select a filter.", "After that, I selecting a filter.", "Next, I select a filter.", "Next, I selects a filter."], obj: "h2" },
      { id: "fb77ad0c", q: "Ekranı paylaşmadan önce hangisi uygun bir kalıptır?", options: ["I share my screen, you see?", "Let me share my screen. Can everyone see it?", "Let me to share my screen.", "Allow me sharing my screen."], obj: "h3" },
      { id: "ae76b5ea", q: "Demoda beklenmedik bir hata çıktı. En uygun tepki hangisidir?", options: ["Something unexpected happened. Let me try that again.", "Sorry, sorry, this never works, it is the developer's fault.", "The demo is finished because it is broken.", "I don't know why. Please look at the error yourself."], obj: "h3" },
      { id: "eb771c70", q: "Cevabını bilmediğin bir soru geldi. Hangisi dürüst ve profesyoneldir?", options: ["I don't know. Next question.", "Yes, it works for all cases.", "That is a wrong question.", "Good question. I'm not sure, but I'll check and get back to you by tomorrow."], obj: "h4" },
      { id: "197b88af", q: "Soruyu anlamadığında tekrar istemek için hangisi uygundur?", options: ["Repeat the question.", "What you said?", "Sorry, could you repeat the question, please?", "Could you to repeat?"], obj: "h4" }
    ],
    interview: [
      { q: "Can you describe a time you presented your work to a team?", a: "Yes. I started with the problem, then I showed a short demo, and I finished with the next steps. I kept each step to one sentence and asked for questions at the end. (Kendi gerçek örneğinle değiştir.)" },
      { q: "How do you handle a question you cannot answer?", a: "I say it honestly: Good question, I'm not sure. Then I promise to check and I give a time, for example by tomorrow, and I follow up." },
      { q: "What do you do if the demo fails?", a: "I stay calm. I say that something unexpected happened, I try again, and if it still fails I show a screenshot and explain what the result should look like." }
    ],
    vocab: [
      { term: "Demo", tr: "gösterim", ex: "I will give a short demo." },
      { term: "Walk through", tr: "adım adım göstermek", ex: "Let me walk you through the steps." },
      { term: "Agenda", tr: "gündem", ex: "Here is the agenda." },
      { term: "Wrap up", tr: "toparlamak", ex: "Let me wrap up with the next steps." },
      { term: "Get back to you", tr: "sana dönmek", ex: "I'll get back to you by tomorrow." },
      { term: "Share (my) screen", tr: "ekran paylaşmak", ex: "Let me share my screen." },
      { term: "Takeaway", tr: "akılda kalacak sonuç", ex: "The main takeaway is that search is faster." }
    ],
    resources: [
      res({ title: "Atlassian: Sprint review (demo ve geri bildirim)", url: "https://www.atlassian.com/agile/scrum/sprint-reviews", type: "doc", level: "orta", lang: "EN" }, "Sprint sonunda işi gösterme ve geri bildirim toplama"),
      res(BBC, "Sunum ve toplantı İngilizcesi için kısa dinlemeler"),
      res(CAM, "Kalıpların örnek cümleli sözlük karşılığı")
    ],
    sources: [{ title: "Atlassian: Sprint review", url: "https://www.atlassian.com/agile/scrum/sprint-reviews" }]
  };

  /* 15 ──────────────────────────────────────────── README ve teknik doküman yazmak */
  L[15] = {
    hook: "Yeni gelen biri projeni indirip 'şimdi ne yapacağım?' diye kalıyorsa sorun kodda değil, README'dedir. İyi bir README ilk beş dakikada okuyucuyu çalışan bir sonuca götürür.",
    homework: "Küçük bir proje seç (kendi yazdığın bir betik de olur). Bir README taslağı yaz: başlık ve tek cümlelik açıklama, Requirements, Installation, Usage (komutlar kod bloğunda), Troubleshooting (iki hata, neden ve çözüm) ve License. Hiçbir adımda 'please' ile başlama; emir kipi kullan.",
    warmup: { words: [
      { word: "prerequisite", tr: "önkoşul", pos: "noun", ex: "The prerequisite is Node.js 20.", exTr: "Önkoşul Node.js 20.", use: "Requirements bölümünde", level: "B2" },
      { word: "run (a command)", tr: "komutu çalıştırmak", pos: "verb", ex: "Run npm install.", exTr: "npm install komutunu çalıştır.", use: "Kurulum adımında", level: "A2" },
      { word: "contribute", tr: "katkıda bulunmak", pos: "verb", ex: "You can contribute by opening a pull request.", exTr: "Bir pull request açarak katkıda bulunabilirsin.", use: "Contributing bölümünde", level: "B1" }
    ] },
    blocks: [
      { t: "h", text: "Durum" },
      { t: "box", h: "Gerçek durum", text: "Ekipteki yeni biri senin yazdığın aracı kurmaya çalışıyor ve sana sormadan yapamıyor. README'yi iyi yazarsan bir daha sormayacak. Okuyucu uzun paragraf okumaz; başlık arar, komutu kopyalar ve çalıştırır." },
      { t: "h", text: "README'nin iskeleti" },
      { t: "steps", h: "Sıra okuyucunun sorusunu yanıtlar", items: [
        "Başlık ve tek cümle: 'Quick Notes is a small web app that shows your notes in the browser.' (ne olduğu)",
        "Requirements: 'You need Node.js 20 or later.' (önkoşul)",
        "Installation: 'Clone the repository and install the dependencies.' (kurulum komutları kod bloğunda)",
        "Usage: 'Start the app.' (en az bir çalışan örnek)",
        "Troubleshooting: 'If the port is already in use, ...' (belirti, çözüm)",
        "Contributing ve License: 'Open an issue before you send a pull request.' / 'MIT License'"
      ] },
      { t: "split", tr: "Bağımlılıkları npm install ile kur.", parts: [
        { tr: "kur (emir)", q: "Adım nasıl başlar?", en: "Install" },
        { tr: "bağımlılıkları", q: "Neyi?", en: "the dependencies" },
        { tr: "npm install ile", q: "Hangi komutla?", en: "with npm install" }
      ], result: "Install the dependencies with npm install." },
      { t: "h", text: "Çalışan örnek" },
      { t: "cmd", lang: "text", calistirma: "atla README metni; kod değil", text: "# Quick Notes\n\nQuick Notes is a small web app that shows your notes in the browser.\n\n## Requirements\n\nYou need Node.js 20 or later.\n\n## Installation\n\n    git clone https://example.com/quick-notes.git\n    cd quick-notes\n    npm install\n\n## Usage\n\nStart the app:\n\n    npm start\n\nYou can set a custom port, but the default is 3000.\n\n## Troubleshooting\n\nIf you see `ENOENT: no such file or directory`, check that you are in the project folder.\nIf the port is already in use, stop the other process or choose a different port.\n\n## License\n\nMIT" },
      { t: "h", text: "Dil kalıpları" },
      { t: "steps", h: "README'de kullanılan cümleler", items: [
        "Adımlar emir kipiyle başlar: 'Install ...', 'Run ...', 'Open ...', 'Check ...'. Özne yok, 'please' sık değil.",
        "Gereksinim: 'You need ...' / '... is required.' Zorunlu: 'You must ...' İsteğe bağlı: 'You can ...' Öneri: 'We recommend ...' / 'You should ...'",
        "Koşul: 'If you see this error, run ...' (If + belirti, + emir)",
        "Açıklama şimdiki zamanla yazılır: 'The tool saves notes in a file.' (geçmiş ya da gelecek değil)",
        "Uyarı: 'Note: ...' / 'Warning: this deletes all notes.'"
      ] },
      { t: "h", text: "Sorun giderme yazımı" },
      { t: "steps", h: "Hata mesajı, neden, çözüm", items: [
        "Hata metnini olduğu gibi kod biçiminde yaz: `ENOENT: no such file or directory` (aranabilir olsun).",
        "Nedeni tek cümleyle söyle: 'This means the file does not exist.'",
        "Çözümü emir kipiyle ver: 'Create the file or run the tool from the project folder.'",
        "Bilmediğin nedeni uydurma: 'This error can have several causes.' de ve en olası ikisini listele."
      ] },
      { t: "h", text: "Bozuk cümleyi düzelt" },
      { t: "steps", h: "Bozuk → düzeltilmiş", items: [
        "'You should installing the packages.' → 'Install the packages.' (ya da 'You should install the packages.')",
        "'You must to have Node.js 20 or latest.' → 'You need Node.js 20 or later.'",
        "'When port is use, stopping other process.' → 'If the port is already in use, stop the other process.'"
      ] },
      { t: "warn", h: "Sık hata", text: "Komutu cümlenin içine gömmek (kopyalarken hata çıkar), 'or latest' yerine 'or later' yazmamak ve 'must' ile 'can' farkını karıştırmak (zorunlu mu, isteğe bağlı mı?) sık hatalardır. Ayrıca çalıştırmadığın komutu README'ye yazma; yazdıktan sonra sıfırdan bir klasörde kendin dene." }
    ],
    story: { title: "Yeni arkadaşın ilk günü", text: "Can joined the team on Monday. He opened the README, installed Node.js 20, ran npm install and added his first note in ten minutes. He did not need to ask anyone. At the end of the README he found a Troubleshooting section and fixed a path error by himself.", question: "Why did Can not need to ask anyone? (İngilizce cevapla)" },
    objectives: [
      { id: "h1", text: "Bir README'nin bölümlerini (başlık ve tek cümlelik açıklama, kurulum, kullanım, katkı, lisans) doğru sırada kurabilirsin." },
      { id: "h2", text: "Kurulum ve kullanım adımlarını emir kipiyle yazıp komutları kod bloğuna koyabilirsin." },
      { id: "h3", text: "Gereksinimi, zorunluluğu ve isteğe bağlı ayarı 'need', 'must' ve 'can' ile doğru ayırarak yazabilirsin." },
      { id: "h4", text: "Sorun giderme bölümünde hata mesajını, nedeni ve çözümü 'If ..., ...' kalıbıyla yazabilirsin." }
    ],
    summary: [
      "README önce projenin ne olduğunu, sonra kurulumu, kullanımı, sorun gidermeyi, katkıyı ve lisansı anlatır.",
      "Adımlar emir kipiyle yazılır ('Install', 'Run'); komutlar kod bloğunda durur.",
      "'You need ... or later' gereksinimi, 'must' zorunluluğu, 'can' isteğe bağlılığı bildirir.",
      "Sorun giderme: hata metni olduğu gibi, nedeni bir cümle, çözüm emir kipiyle.",
      "README'deki her komutu temiz bir klasörde kendin çalıştırarak doğrula."
    ],
    quiz: [
      { id: "0aa5e84d", q: "README'nin en üstünde okuyucu ilk olarak ne görmelidir?", options: ["Yazarın tüm özgeçmişi", "Projenin adı ve ne işe yaradığını anlatan kısa bir açıklama", "Sürüm geçmişinin tamamı", "Hata kayıtları ve eski kararlar"], obj: "h1" },
      { id: "0925423e", q: "Okuyucuyu en hızlı çalıştıran bölüm sırası hangisidir?", options: ["Description, Installation, Usage, Contributing, License", "License, Contributing, Usage, Installation, Description", "Usage, License, Description, Installation, Contributing", "Installation, Contributing, Description, License, Usage"], obj: "h1" },
      { id: "b6587602", q: "Kurulum adımını doğru yazan cümle hangisidir?", options: ["You should installing the dependencies with npm install.", "Installs the dependencies with npm install.", "To install the dependencies, you need to ran npm install.", "Install the dependencies with npm install."], obj: "h2" },
      { id: "beceb7b0", q: "Komutlar README'de nasıl yazılmalıdır?", options: ["Düz paragraf içinde, cümlenin parçası olarak", "Ekran görüntüsü olarak", "Kod bloğu içinde, kopyalanıp çalıştırılabilecek biçimde", "Türkçeye çevrilerek"], obj: "h2" },
      { id: "184f0fc1", q: "Node.js 20 sürümü ya da daha yenisi gerektiğini belirten doğru cümle hangisidir?", options: ["You need Node.js 20 or latest.", "You need Node.js 20 or later.", "You must to have Node.js 20 or later.", "Node.js 20 is need."], obj: "h3" },
      { id: "f84f37bc", q: "Bir ayarın zorunlu olmadığını, varsayılanın 3000 olduğunu belirten cümle hangisidir?", options: ["You can set a custom port, but the default is 3000.", "You must set a custom port, but the default is 3000.", "You should set a custom port, otherwise the app does not start.", "You can to set a custom port, but the default is 3000."], obj: "h3" },
      { id: "9e550e3c", q: "Sorun giderme bölümü için hangi cümle doğru kurulmuştur?", options: ["If the port is already used, you was stop the other process.", "When port is use, stopping other process.", "The port is use already, so you must stopping.", "If the port is already in use, stop the other process or choose a different port."], obj: "h4" },
      { id: "a2c2c3ba", q: "Hata mesajı README'de nasıl yazılırsa okuyucuya en çok yardım eder?", options: ["Yalnızca 'Something went wrong' yazarak", "Mesajı kendi cümlenle değiştirerek", "Hata mesajı olduğu gibi (kod biçiminde), yanında nedeni ve çözümüyle", "Çözümü yazmadan yalnızca hatayı listeleyerek"], obj: "h4" }
    ],
    interview: [
      { q: "How do you document a project so a new teammate can use it?", a: "I write a README with a short description, the requirements, the install and usage commands in code blocks, and a troubleshooting section. Then I test it myself in a clean folder." },
      { q: "What is the difference between 'you must' and 'you can' in documentation?", a: "'You must' means the step is required. 'You can' means it is optional. I use them carefully so the reader knows what is necessary." },
      { q: "How do you write a troubleshooting section?", a: "For each problem I write the exact error message, a one-sentence cause, and the fix as a command or an action. If I do not know the exact cause, I say so and list the most likely ones." }
    ],
    vocab: [
      { term: "README", tr: "projeyi tanıtan ilk belge", ex: "Read the README first." },
      { term: "Requirement", tr: "gereksinim", ex: "The main requirement is Node.js 20." },
      { term: "Installation", tr: "kurulum", ex: "The installation takes two minutes." },
      { term: "Usage", tr: "kullanım", ex: "See the usage section for examples." },
      { term: "Troubleshooting", tr: "sorun giderme", ex: "Check the troubleshooting section." },
      { term: "Dependency", tr: "bağımlılık", ex: "Install the dependencies first." },
      { term: "Default", tr: "varsayılan", ex: "The default port is 3000." }
    ],
    resources: [
      res({ title: "GitHub Docs: About READMEs", url: "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes", type: "doc", level: "başlangıç", lang: "EN" }, "README'nin neleri içermesi gerektiği"),
      res({ title: "Make a README", url: "https://www.makeareadme.com/", type: "doc", level: "başlangıç", lang: "EN" }, "Bölüm bölüm yazım rehberi ve örnek şablon"),
      res(CAM, "Dokümanda kullandığın fiil ve kalıpları örnek cümlelerle doğrula")
    ],
    sources: [{ title: "GitHub Docs: About READMEs", url: "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes" }, { title: "Make a README", url: "https://www.makeareadme.com/" }]
  };
})();

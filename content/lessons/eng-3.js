/* İngilizce (iş ve BT) · sabit dersler 12-13 (PR yorumu, olay bildirimi). Dış kaynak: yalnız HTTP 200 dönenler (curl, 2026-10-19). */
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
})();

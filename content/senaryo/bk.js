/* İş senaryosu kartları (W1 pilot) — Backend, ilk 5 ders (STARTER bk 1–5). Şema: js/ogrenme/senaryo.js.
   Tüm belgeler ÖZGÜN ve kurgusaldır: kişi/şirket adları uydurmadır, telifli ticket metni yoktur. Model cevap ve anahtarlar istemcidedir; kart kapı/not/ustalık değildir. */
window.PP_SENARYO = window.PP_SENARYO || [];
window.PP_SENARYO.push(
  {
    id: "sn-bk-1", yol: "bk", ders: "bk-1", baslik: "Profil ekranı boş: 404 mü, sunucu mu?", sablon: "bug",
    belge: { tur: "slack", konu: "#web-bugs · profile screen is blank", kimden: "Priya (QA)",
      metin: "Hi team, since yesterday's release the profile screen of the web app is blank for every account I tried. In the browser dev tools, the Network tab shows the request GET /user/5 returning 404 Not Found. When I type GET /users/5 into the address bar by hand, I get the profile JSON with 200 OK. Our API documentation lists only /users/{id}. The release notes say the web client was refactored to use a new API helper. The old Android build still works. I can't tell whether the server or the client is at fault, and the Friday demo is close. Could someone take a look today?" },
    gorev: "Reply in the channel with a short incident summary, using the five headings.",
    ipucuTr: "İstenen yolu dokümandaki yolla karşılaştır. Hata sunucuda mı istemcide mi? Düzeltmeyi gözlenebilir bir çıktıyla nasıl doğruladığını yaz.",
    sozluk: [["request", "istek"], ["endpoint", "uç nokta (API adresi)"], ["status code", "durum kodu"], ["404 Not Found", "kaynak bulunamadı"], ["root cause", "kök neden"], ["client", "istemci"], ["release", "sürüm yayını"], ["hotfix", "acil düzeltme"], ["Network tab", "ağ sekmesi"]],
    kaliplar: ["The root cause was …", "The request returned … instead of …", "I verified the fix by …", "Next, I will …"],
    mustMention: [
      { ad: "404 Not Found durumu", es: ["404", "not found"] },
      { ad: "yanlış yol (/user ≠ /users)", es: ["wrong path", "wrong url", "wrong endpoint", "incorrect path", "incorrect url", "singular", "typo", "should be users"] },
      { ad: "dokümante edilen yola uyum", es: ["as documented", "per the docs", "per the documentation", "according to the documentation", "matches the docs", "matches the documentation"] },
      { ad: "hata istemcide", es: ["in the client", "in the web client", "client side", "client code", "frontend", "front end", "server is fine", "not the server"] },
      { ad: "çıktıyla doğrulama", es: ["returns 200", "now returns 200", "retested", "retest*", "verified"] }],
    kontrol: ["Kök nedeni (hangi yol, nerede yanlış) tek cümleyle söyledim.", "Durum kodunu (404) ve doğrusunu (200) yazdım.", "Hatanın sunucuda mı istemcide mi olduğunu açıkça belirttim.", "Doğrulamayı gözlenebilir bir çıktıyla anlattım (hangi istek, hangi sonuç).", "Bir sonraki adım ya da önleme (ör. sözleşme testi) ekledim.", "Ton sakin ve nettir; suçlama yok."],
    ornek: {
      problem: "Since yesterday's release the profile screen of the web app is blank. The request GET /user/5 returns 404 Not Found.",
      cause: "The root cause was a wrong path in the web client: after the refactor it calls the singular /user/{id}, but the API only exposes /users/{id}. The server is fine.",
      fix: "I changed the new API helper in the client so it calls /users/{id}, as documented, and prepared a hotfix build.",
      verified: "I verified the fix in the Network tab: GET /users/5 now returns 200 OK with the profile JSON, and I retested three more user IDs.",
      next: "Next, I will add a contract test that checks every client path against the API documentation, and confirm that the Android build is not affected." }
  },
  {
    id: "sn-bk-2", yol: "bk", ders: "bk-2", baslik: "PR incelemesi: fiil dolu uç noktalar", sablon: "inceleme",
    belge: { tur: "pr", konu: "PR #214 · Add order endpoints", kimden: "Tomas (backend developer)",
      metin: "This PR adds three endpoints for orders. POST /getOrders reads the orders of a customer; the customer ID is sent in the request body. GET /deleteOrder?id=42 removes an order and returns 200 with the text \"ok\". POST /createOrder creates an order and also returns 200. Tomas wrote in the description: \"I kept it simple so the mobile team can call everything without thinking about HTTP methods.\" All tests pass, and the mobile team would like to merge today because they are already building against these paths. You are the reviewer on this pull request." },
    gorev: "Leave a review comment on the PR using the three headings. Be kind but specific.",
    ipucuTr: "Yöntem ile eylemin uyumunu ve GET'ten beklenen güvenliği düşün. Yolların neyi adlandırması gerektiğini ve hangi durum kodlarının uygun olduğunu yaz.",
    sozluk: [["endpoint", "uç nokta"], ["resource", "kaynak"], ["noun", "isim"], ["safe method", "güvenli yöntem"], ["side effect", "yan etki"], ["idempotent", "aynı istek tekrarlanınca aynı sonuç"], ["review comment", "inceleme yorumu"], ["status code", "durum kodu"], ["cache", "önbellek"]],
    kaliplar: ["Could we …?", "One concern is that …", "This matters because …", "I suggest …"],
    mustMention: [
      { ad: "yollarda isim/kaynak kullanımı", es: ["noun*", "resource*", "plural"] },
      { ad: "GET güvenli olmalı (yan etki)", es: ["safe", "side effect*", "prefetch*", "crawler*", "cache*", "idempotent"] },
      { ad: "DELETE yöntemi", es: ["delete method", "http delete", "use delete", "delete request", "delete orders", "delete verb"] },
      { ad: "durum kodları (201/204)", es: ["201", "204", "status code*", "no content"] }],
    kontrol: ["Önce gözlemi (neyi gördüğümü) somut yol adlarıyla yazdım.", "GET'in neden veri değiştirmemesi gerektiğini nedenini açıkladım.", "Somut bir alternatif yazdım (ör. DELETE /orders/{id}).", "Durum kodu (201/204) önerisi ekledim.", "Ton nazik; kişiyi değil kodu eleştirdim.", "Birleştirme (merge) için net bir sonraki adım söyledim."],
    ornek: {
      observation: "The paths contain verbs (/getOrders, /deleteOrder, /createOrder) and the methods do not match the actions: GET /deleteOrder changes data, and POST /getOrders only reads data.",
      why: "A GET request must be safe: browsers, crawlers, link prefetchers and caches may repeat it, so a GET that deletes an order can remove data by accident. Letting the method express the action also makes the API predictable for the mobile team.",
      suggestion: "Could we use resource nouns? For example GET /orders?customerId=42 for a list, POST /orders to create (returning 201 Created) and DELETE /orders/{id} to delete (returning 204 No Content). Thanks for the quick work, and I am happy to pair on the change today." }
  },
  {
    id: "sn-bk-3", yol: "bk", ders: "bk-3", baslik: "Ortak geliştirici: geçersiz JSON gövdesi", sablon: "yanit",
    belge: { tur: "eposta", konu: "Integration with /v1/stock fails", kimden: "Elena (developer at Halden Parts Ltd, a partner)",
      metin: "Hello, our integration with your /v1/stock endpoint does not work. In our logs the error says: \"Unexpected token ' in JSON at position 1\". This is the body we send: {'sku': 'A-100', 'quantity': 12, 'price': 19,90, } We copied the format from your sample PDF, so we do not understand what is wrong. Our launch is on Monday and the whole team is a little worried. Could you tell us what to change? We can send more logs if you need them. Kind regards, Elena" },
    gorev: "Reply to Elena by email. Explain what is wrong with the JSON and how to fix it, in a calm and helpful tone.",
    ipucuTr: "Gövdeyi bir JSON ayrıştırıcının gözüyle satır satır oku: hangi karakterler JSON kurallarına uymuyor? Nazik, sakinleştirici bir yanıt yaz.",
    sozluk: [["JSON", "JavaScript Object Notation (veri biçimi)"], ["valid", "geçerli"], ["parser", "ayrıştırıcı"], ["double quotes", "çift tırnak"], ["trailing comma", "sondaki fazla virgül"], ["decimal point", "ondalık nokta"], ["request body", "istek gövdesi"], ["header", "başlık"], ["validator", "doğrulayıcı"]],
    kaliplar: ["Thank you for the details.", "The body is not valid JSON because …", "A valid body looks like this: …", "If it still fails, please send me …"],
    mustMention: [
      { ad: "tek tırnak yerine çift tırnak", es: ["double quote*", "single quote*", "apostrophe*"] },
      { ad: "sondaki fazla virgül", es: ["trailing comma*", "extra comma*", "last comma", "comma after", "comma at the end"] },
      { ad: "ondalık nokta (19.90)", es: ["19.90", "19.9", "decimal point", "decimal separator", "decimal comma"] },
      { ad: "doğrulayıcı ile kontrol", es: ["validat*", "parser", "jsonlint", "valid json"] }],
    kontrol: ["Sorunları tek tek ve sırayla (en az üç) açıkladım.", "Geçerli bir örnek gövde yazdım.", "Önce teşekkür ettim/rahatlattım, sonra teknik kısma geçtim.", "Doğrulama için bir araç ya da yol önerdim.", "Hâlâ çalışmazsa ne göndermesi gerektiğini söyledim.", "Samimi ama profesyonel yazdım; suçlama yok."],
    ornek: {
      reply: "Hello Elena, thank you for the details, and please do not worry: this is easy to fix before Monday. Your body is not valid JSON for three reasons. First, JSON needs double quotes, so 'sku' must be \"sku\". Second, there is a trailing comma after the price, which a JSON parser rejects. Third, 19,90 uses a decimal comma, but JSON needs a decimal point: 19.90. A valid body looks like this: {\"sku\": \"A-100\", \"quantity\": 12, \"price\": 19.90}. You can check any body with a JSON validator before you send it. If it still fails, please send me the full request and the response, and I will look at it today. I will also check our sample PDF, because it should not contain these errors. Kind regards" }
  },
  {
    id: "sn-bk-4", yol: "bk", ders: "bk-4", baslik: "Rapor tutarı iadeden sonra yanlış", sablon: "bug",
    belge: { tur: "ticket", konu: "October revenue on the dashboard is too high", kimden: "Hannah (Finance)",
      metin: "The dashboard shows 48,200 EUR of revenue for October, but our accounting system says 42,100 EUR. The difference is about 6,100 EUR, which is close to the size of the refunds we paid out in October. The dashboard query is: SELECT SUM(total) FROM orders WHERE created_at >= '2025-10-01' AND created_at < '2025-11-01'; The orders table has a status column with the values paid, refunded and cancelled. Cancelled orders have a total of 0 in our system, and every refund in October belongs to an October order. I need a reliable number before the board meeting on Thursday, so please check this today and tell me what you found." },
    gorev: "Write the ticket reply for Hannah with the five headings: what is wrong, why, what you changed, how you checked it, and what comes next.",
    ipucuTr: "Sorgu hangi siparişleri topluyor? Farkın büyüklüğü hangi sütunla ilgili olabilir? Düzeltmeyi finans rakamıyla nasıl karşılaştıracağını yaz.",
    sozluk: [["revenue", "gelir"], ["refund", "iade"], ["query", "sorgu"], ["SUM", "toplam fonksiyonu"], ["WHERE clause", "WHERE koşulu"], ["status column", "durum sütunu"], ["reconcile", "rakamları uzlaştırmak"], ["spot-check", "örnek kayıt kontrolü"], ["board meeting", "yönetim kurulu toplantısı"]],
    kaliplar: ["The dashboard overstates … by …", "The query does not take … into account.", "I changed the query to …", "The new result matches …"],
    mustMention: [
      { ad: "iade edilen siparişler", es: ["refund*"] },
      { ad: "sorgu durum sütununu yok sayıyor", es: ["ignores the status", "does not filter", "doesn't filter", "no filter", "without filtering", "does not look at", "does not check"] },
      { ad: "status filtresi (WHERE)", es: ["exclud*", "where status", "filter*", "status filter"] },
      { ad: "finans rakamıyla eşleştirme", es: ["reconcil*", "matches finance", "matches the finance", "matches the accounting", "same as finance"] }],
    kontrol: ["Farkı sayılarla (48.200 / 42.100 / ≈6.100) yazdım.", "Kök nedeni sorgunun hangi kısmında gösterdim (SUM, status).", "Düzeltmeyi somut yazdım (hangi koşul eklendi).", "Doğrulamayı finans rakamıyla karşılaştırarak yaptım.", "Tekrarını önleyecek bir adım ekledim.", "Finans ekibinin anlayacağı sade dille yazdım."],
    ornek: {
      problem: "The October revenue on the dashboard was 48,200 EUR, but finance reports 42,100 EUR, so the dashboard overstates revenue by about 6,100 EUR.",
      cause: "The root cause was the dashboard query: it uses SUM(total) over every October order and ignores the status column, so refunded orders were counted as revenue.",
      fix: "I changed the query to exclude refunded and cancelled orders with WHERE status = 'paid', and I show refunds on a separate line.",
      verified: "I verified the result by running the new query for October: it returns 42,100 EUR, which matches the finance number, and I spot-checked five refunded orders.",
      next: "Next, I will add a daily check that compares the dashboard total with finance, and document which statuses count as revenue." }
  },
  {
    id: "sn-bk-5", yol: "bk", ders: "bk-5", baslik: "\"Beni sürekli çıkarıyor\": belirsiz giriş sorunu", sablon: "soru",
    belge: { tur: "ticket", konu: "Login broken", kimden: "Leo (customer support)",
      metin: "A customer wrote to support: \"I can't use the app, it keeps kicking me out.\" There are no more details, and the customer has not answered our follow-up yet. The customer is on the Pro plan and is annoyed. Our API uses JWT access tokens that expire after 15 minutes, and the app sends the token in the Authorization header. This morning, support found several 401 Unauthorized responses for this customer in the logs, but nobody checked how far apart they are. Leo asks you, the backend developer, what to ask the customer and what to look at first." },
    gorev: "Write the clarifying questions Leo should ask the customer, and say what you can check in the meantime.",
    ipucuTr: "Soruların amacı sorunu tekrar üretmek: ne zaman, ne kadar sürede, hangi cihaz/sürüm, hangi hata. Beklerken loglardaki 401'lerin zamanına ve token süresine bak.",
    sozluk: [["clarifying question", "açıklayıcı soru"], ["access token", "erişim jetonu"], ["expire", "süresi dolmak"], ["401 Unauthorized", "kimlik doğrulanamadı"], ["refresh token", "yenileme jetonu"], ["header", "başlık"], ["log", "kayıt (log)"], ["timestamp", "zaman damgası"], ["reproduce", "sorunu yeniden üretmek"]],
    kaliplar: ["Could you tell me …?", "How long after …?", "Meanwhile, I will check …", "If … , then …"],
    mustMention: [
      { ad: "401 Unauthorized yanıtları", es: ["401", "unauthorized"] },
      { ad: "token süresi dolması", es: ["expir*", "15 minute", "15 minutes"] },
      { ad: "yenileme (refresh)", es: ["refresh"] },
      { ad: "cihaz/tarayıcı/sürüm", es: ["device*", "browser*", "app version", "ios", "android", "platform"] },
      { ad: "ne kadar süre sonra (zamanlama)", es: ["how long", "how often", "how many minutes", "what time", "when exactly", "after how"] }],
    kontrol: ["Sorular tek tek ve cevaplanabilir (evet/hayır ya da kısa bilgi).", "Zamanlamayı sordum (ne zaman, ne kadar sürede).", "Cihaz, tarayıcı ya da uygulama sürümünü sordum.", "Beklerken ne kontrol edeceğimi yazdım (loglar, 401 zamanları).", "Olası nedeni (token süresi) varsayım olarak belirttim, kesin hüküm vermedim.", "Müşteriye iletilebilecek nazik bir tonda yazdım."],
    ornek: {
      questions: "1) How long after you log in does the app sign you out: always after about 15 minutes, or at random times? 2) Which device, browser and app version do you use? 3) Do you see an error message, or does the app just show the login screen? 4) Did it start after an update or only today? Please also tell us what you were doing when it happened.",
      meanwhile: "Meanwhile I can check the logs for the 401 Unauthorized responses and compare their timestamps with the login time. If they appear about 15 minutes after login, the access token is expiring and the app may not refresh it correctly, so I will check the refresh flow and the Authorization header for this app version." }
  }
);

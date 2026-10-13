/* İş senaryosu kartları (W1 pilot) — Veri Analitiği Seviye 0 (va0-1, va0-2, va0-3). Şema: js/ogrenme/senaryo.js.
   Kişi/şirket adları kurgusaldır; metinler özgündür. Model cevap ve anahtarlar istemcidedir; kart kapı/not/ustalık değildir. */
window.PP_SENARYO = window.PP_SENARYO || [];
window.PP_SENARYO.push(
  {
    id: "sn-va0-1", yol: "va0", ders: "va0-1", baslik: "\"Müşteriler dönmüyor\": iş sorusunu ölçülebilir yapmak", sablon: "soru",
    belge: { tur: "slack", konu: "#analytics-requests · customers are not coming back", kimden: "Camille (Marketing manager)",
      metin: "Hi! Our customers are not coming back anymore, and I think the new packaging is the reason. I need a dashboard that shows loyalty and fixes this problem. The board meets in two weeks. We sell coffee beans online. The order data is in the shop database, and the newsletter data is in a separate tool that I cannot export myself. Can you start today? I do not have time for a long meeting, so just build what you think is right. Thanks!!" },
    gorev: "Write the clarifying questions you would send to Camille, and say what you can check in the meantime.",
    ipucuTr: "\"Dönmüyor\" ölçülebilir mi? Bu talebi bir analitik soruya çevirmek için hangi bilgiler eksik? Beklerken veride neye bakarsın?",
    sozluk: [["clarifying question", "açıklayıcı soru"], ["metric", "ölçüt"], ["repeat purchase rate", "tekrar satın alma oranı"], ["time period", "zaman aralığı"], ["baseline", "karşılaştırma tabanı"], ["data source", "veri kaynağı"], ["dashboard", "gösterge paneli"], ["definition", "tanım"], ["stakeholder", "paydaş"]],
    kaliplar: ["What do you mean by …?", "Could we define … as …?", "Which time period …?", "Meanwhile, I can check …"],
    mustMention: [
      { ad: "ölçülebilir tanım (tekrar satın alma)", es: ["repeat purchase*", "repurchase*", "returning customer*", "retention rate", "second order", "second purchase"] },
      { ad: "zaman aralığı", es: ["time period", "timeframe", "time frame", "date range", "start date", "which dates", "since when"] },
      { ad: "karşılaştırma (önce/sonra)", es: ["before and after", "before the new packaging", "after the change", "baseline"] },
      { ad: "veri kaynakları", es: ["data source*", "newsletter tool"] }],
    kontrol: ["En az bir belirsiz kelimeyi (\"dönmüyor\") ölçülebilir tanıma çevirdim.", "Zaman aralığını ve ambalaj değişim tarihini sordum.", "Karşılaştırma tabanını (önce/sonra) sordum.", "Veri kaynaklarını ve eksiklerini sordum.", "Beklerken yapabileceğim somut bir veri kontrolü yazdım.", "Kararın ne için kullanılacağını sordum; ambalajın nedeni olduğunu kanıtlanmış gibi kabul etmedim."],
    ornek: {
      questions: "1) What do you mean by \"not coming back\": no second order within 60 days, or fewer orders per month? Could we define it as the repeat purchase rate? 2) Which time period should I look at, and on which date did the new packaging start? 3) Should I compare customers before and after the change, or only recent customers? 4) Which data sources can I use: only the order data in the shop database, or also the newsletter tool? 5) What decision will the board make with the answer?",
      meanwhile: "Meanwhile I can look at the order table: which columns exist, how many customers placed a second order, how many orders have missing dates, and what the baseline repeat purchase rate was before the packaging change. I will not build the dashboard before the question is clear, because a wrong metric would cost more time." }
  },
  {
    id: "sn-va0-2", yol: "va0", ders: "va0-2", baslik: "Toplam yanlış çıkıyor: sütun türü sorunu", sablon: "yanit",
    belge: { tur: "eposta", konu: "My totals look wrong", kimden: "Ravi (Sales operations)",
      metin: "Hi, I exported 500 orders from the shop to a CSV file and opened it in a spreadsheet. Two things are strange. First, the total of the quantity column is 1,180, but the shop admin says 1,290. Some cells look like \"2 pcs\" and are aligned to the left. Second, my pivot table shows a \"sum of phone\" of about 2.6 trillion, and the leading zeros of the phone numbers disappeared. I did not change any data. Is the file broken? I need the numbers for the 3 pm meeting. Thanks, Ravi" },
    gorev: "Reply to Ravi. Explain why the totals are wrong and how to fix each problem, in simple words.",
    ipucuTr: "Hangi sütunlar sayı gibi davranmıyor ve neden? Her sorun için hem açıklamayı hem de düzeltme adımını yaz.",
    sozluk: [["data type", "veri türü"], ["numeric", "sayısal"], ["text", "metin"], ["identifier", "tanımlayıcı"], ["leading zero", "baştaki sıfır"], ["pivot table", "özet tablo"], ["convert", "dönüştürmek"], ["clean the data", "veriyi temizlemek"], ["unit", "birim"]],
    kaliplar: ["The reason is that …", "A phone number is an identifier, not …", "To fix this, …", "You can check it by …"],
    mustMention: [
      { ad: "metin–sayı farkı (veri türü)", es: ["text in", "as text", "data type*", "numeric"] },
      { ad: "birimli hücreler (\"2 pcs\") temizlenmeli", es: ["convert*", "clean*", "remove the unit", "remove the pcs"] },
      { ad: "telefon = tanımlayıcı, toplanmaz", es: ["identifier*", "not a measure", "never be added", "should not be added", "not be summed"] },
      { ad: "baştaki sıfır", es: ["leading zero*"] },
      { ad: "kontrol (1.290 ile karşılaştırma)", es: ["1 290", "1290"] }],
    kontrol: ["Her iki sorunu ayrı ayrı açıkladım.", "Neden toplamın eksik çıktığını veri türüyle bağladım.", "Telefonun neden toplanmaması gerektiğini söyledim.", "Her sorun için somut bir düzeltme yazdım.", "Düzeltmeden sonra nasıl kontrol edeceğini (1.290) yazdım.", "Sade, yargılamayan bir dil kullandım."],
    ornek: {
      reply: "Hi Ravi, the file is not broken; this is a data type problem. First, the quantity column contains text in some cells, like \"2 pcs\". A spreadsheet only adds numbers, so those cells are skipped, and your total is lower than the shop's 1,290. Remove the unit and convert the column to numbers, and the total should match 1,290; please compare the two numbers after the cleaning. Second, a phone number is an identifier, not a measure, so it should never be added. Keep the column as text, which also keeps the leading zeros, and use the pivot table only on columns like quantity or price. To get the zeros back, import the file again and choose Text for the phone column. Tell me if the totals still differ and I will look at the file with you. Best regards" }
  },
  {
    id: "sn-va0-3", yol: "va0", ders: "va0-3", baslik: "\"Kampanya işe yaradı\" slaytı: veri bunu söylüyor mu?", sablon: "inceleme",
    belge: { tur: "slack", konu: "#ecommerce · slide for Friday", kimden: "Julia (Head of E-commerce)",
      metin: "Sales were up 14% in the week of the discount email, so the campaign works. Please put it on the slide as a fact: \"Campaign = +14% sales\". Also, the customer satisfaction survey only has answers from 38% of our customers, but the average is 4.6 out of 5, so let's write that customers love us. The raw survey file contains names and email addresses, and I will attach it to the deck so that everyone can see the comments. I need the final slide by Friday morning." },
    gorev: "Reply in the thread using the three headings. Be polite, explain what the data does and does not support, and suggest what to change before the slide goes out.",
    ipucuTr: "Slayttaki iddia veriyle ne kadar örtüşüyor? Her iddia için neyin eksik olduğunu ve daha dürüst bir cümleyi yaz.",
    sozluk: [["correlation", "ilişki (birlikte görülme)"], ["causation", "nedensellik"], ["baseline", "karşılaştırma tabanı"], ["response rate", "yanıt oranı"], ["representative", "temsil edici"], ["bias", "yanlılık"], ["personal data", "kişisel veri"], ["aggregate", "toplulaştırmak"], ["claim", "iddia"]],
    kaliplar: ["The data shows …, but it does not show …", "To claim …, we would need …", "I suggest we write …", "Could we remove … before sharing?"],
    mustMention: [
      { ad: "ilişki ≠ nedensellik", es: ["caus*", "correlat*", "does not prove", "coincid*"] },
      { ad: "karşılaştırma tabanı", es: ["compar*", "baseline", "previous weeks", "last year", "control group", "seasonal*", "other factors"] },
      { ad: "yanıt oranı / temsil sorunu", es: ["response rate", "not representative", "biased", "bias", "non response", "answered can differ"] },
      { ad: "kişisel veri / gizlilik", es: ["privacy", "personal data", "anonymi*", "aggregat*", "gdpr"] }],
    kontrol: ["Önce verinin neyi gösterdiğini (artış, ortalama) kabul ettim.", "Nedensellik iddiasının neden yetmediğini açıkladım.", "Hangi karşılaştırmanın iddiayı güçlendireceğini yazdım.", "Yanıt oranı sorununu sayıyla (%38) belirttim.", "Kişisel veri riskini ve çözümü (çıkar/özetle) yazdım.", "Slayt için yeni, daha dürüst bir cümle önerdim."],
    ornek: {
      observation: "The data shows that sales were 14% higher in the campaign week, and the survey average is 4.6. It does not show that the campaign caused the increase, and only 38% of customers answered the survey.",
      why: "Sales and the campaign coincided, but that is a correlation, not proof of causation: the increase could come from seasonality or other factors. We would need a comparison with previous weeks or the same week last year. A 38% response rate may also be biased, because the customers who answered can differ from those who did not, so the survey may not be representative of all customers. The raw file contains names and email addresses, which is personal data and a privacy risk.",
      suggestion: "I suggest we write \"Sales were 14% higher in the campaign week; we are checking against previous weeks\" and \"4.6 out of 5 among the 38% who responded\". Could we also remove the names and email addresses and share only aggregated comments? I am happy to prepare the comparison by Thursday." }
  }
);

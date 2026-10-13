/* İş senaryosu kartları (W1 pilot) — Siber güvenlik, ilk 5 ders (STARTER sec 1–5). Şema: js/ogrenme/senaryo.js.
   Savunma/tespit/politika odaklı; saldırı talimatı yok. Kişi/şirket adları kurgusaldır; metinler özgündür. Model cevap ve anahtarlar istemcidedir; kart kapı/not/ustalık değildir. */
window.PP_SENARYO = window.PP_SENARYO || [];
window.PP_SENARYO.push(
  {
    id: "sn-sec-1", yol: "sec", ders: "sec-1", baslik: "Kayıp dizüstü: varlık, tehdit, zafiyet", sablon: "bug",
    belge: { tur: "olay", konu: "Incident note · lost company laptop", kimden: "IT service desk",
      metin: "Marta, an accountant, reported on Tuesday evening that she lost her company laptop at an airport. The laptop contains the quarterly payroll spreadsheet. The disk is not encrypted, and Marta logs in with a short PIN. The VPN certificate on the device is still valid, and the laptop was last seen online three hours ago. The service desk has not taken any action yet because nobody knew which steps are needed. Your manager asks for a short incident summary today, in the usual structure, so that the next steps can be approved quickly." },
    gorev: "Write the incident summary with the five headings. In Cause, name the asset, the threat and the vulnerability.",
    ipucuTr: "Cause bölümünde üçlüyü ayır: varlık, tehdit, zafiyet. Cihaz hâlâ ağa bağlanabilir: erişimi nasıl kesersin? Doğrulamayı hangi çıktıyla yaparsın?",
    sozluk: [["asset", "varlık"], ["threat", "tehdit"], ["vulnerability", "zafiyet"], ["risk", "risk"], ["disk encryption", "disk şifreleme"], ["remote wipe", "uzaktan silme"], ["revoke", "iptal etmek"], ["certificate", "sertifika"], ["incident", "olay"]],
    kaliplar: ["The asset at risk is …", "The threat is …, and the vulnerability is …", "I revoked … and …", "I confirmed that …"],
    mustMention: [
      { ad: "varlık", es: ["asset*"] },
      { ad: "tehdit (hırsızlık/yetkisiz erişim)", es: ["threat*", "thief", "theft", "stolen", "unauthorized access", "unauthorised access"] },
      { ad: "zafiyet", es: ["vulnerabilit*", "weakness*"] },
      { ad: "risk / veri ifşası", es: ["risk*", "exposure", "exposed"] },
      { ad: "müdahale (iptal/uzaktan silme)", es: ["revok*", "wip*", "remote wipe", "lock the device"] }],
    kontrol: ["Varlık, tehdit ve zafiyeti Cause içinde ayrı ayrı adlandırdım.", "Riski (veri ifşası) tek cümleyle bağladım.", "Fix, somut ve sıralı adımlardan oluşuyor (hesap, sertifika, silme).", "Doğrulamada neyi nerede kontrol ettiğimi yazdım.", "Önleyici adım ekledim (disk şifreleme, parola).", "Hukuki/bildirim gerekliliğini kendim karar vermeden ilgili birime bıraktım."],
    ornek: {
      problem: "On Tuesday evening a company laptop with the quarterly payroll spreadsheet was lost at an airport. The disk was not encrypted.",
      cause: "The asset is the payroll data. The threat is theft or loss followed by unauthorized access. The vulnerability is that the disk was not encrypted and the login used only a short PIN, so the risk of data exposure is high.",
      fix: "I revoked the VPN certificate, signed the user out everywhere, reset her passwords and sent a remote wipe command to the device.",
      verified: "I verified in the management console that the certificate is revoked and that the wipe command is queued; it will run when the laptop next connects.",
      next: "Next, we should enable full-disk encryption on all laptops, require stronger passwords, and ask legal whether the loss of payroll data must be reported." }
  },
  {
    id: "sn-sec-2", yol: "sec", ders: "sec-2", baslik: "Yönetime CIA üçlüsünü sade anlatmak", sablon: "yanit",
    belge: { tur: "eposta", konu: "What went wrong this week?", kimden: "Oscar (Head of Sales)",
      metin: "Hi, three things happened this week and the board asked me to explain them in security terms. First, a sales rep emailed the full customer list to a private address by mistake. Second, on Wednesday our CRM was down for three hours during a big campaign. Third, somebody changed the discount values in the pricing spreadsheet, and nobody knows who did it or when. I do not know the vocabulary. Can you tell me, in plain English, which part of the CIA triad each event touched, and what one simple control would help for each? Thanks, Oscar" },
    gorev: "Reply to Oscar in plain English. Name the CIA property for each event and suggest one simple control for each. Keep it under 150 words, one numbered line per event.",
    ipucuTr: "Üç olay, üç özellik: bilginin yanlış kişiye gitmesi, sistemin kullanılamaması, verinin kimse bilmeden değişmesi. Her biri için tek ve basit bir kontrol öner; jargon kullanma.",
    sozluk: [["confidentiality", "gizlilik"], ["integrity", "bütünlük"], ["availability", "erişilebilirlik"], ["control", "kontrol/önlem"], ["audit log", "denetim kaydı"], ["backup", "yedek"], ["access control", "erişim denetimi"], ["outage", "kesinti"], ["plain English", "sade dil"]],
    kaliplar: ["This is a loss of …", "A simple control is …", "In plain terms, …", "Happy to explain more."],
    mustMention: [
      { ad: "gizlilik (confidentiality)", es: ["confidential*"] },
      { ad: "bütünlük (integrity)", es: ["integrity"] },
      { ad: "erişilebilirlik (availability)", es: ["availab*"] },
      { ad: "somut kontrol", es: ["access control", "permissions", "limit who can", "least privilege", "restrict*", "encryption", "backup*", "audit log", "version history", "version control", "logging", "monitoring", "redundancy", "failover", "fallback"] }],
    kontrol: ["Üç olayın her biri için doğru CIA özelliğini adlandırdım.", "Her olay için tek, somut bir kontrol önerdim.", "Jargonu ilk kullandığım yerde sade dille açıkladım.", "Sıralı/numaralı yazdım; yönetici hızlı okuyabilir.", "Ton saygılı ve güven verici.", "E-postayı 150 kelimenin altında tuttum; her olay ayrı numaralı satırda."],
    ornek: {
      reply: "Hi Oscar, happy to explain. 1) The customer list sent to a private address is a loss of confidentiality: information reached someone who should not have it. A simple control is to limit who can export the list and use rules that warn about large exports. 2) The CRM outage touched availability: people could not use the system when they needed it. A simple control is a tested backup and a fallback server so the system recovers quickly. 3) The changed discount values are an integrity problem: data was modified and nobody can tell who did it. A simple control is an audit log with version history, plus fewer people with edit rights. Best regards" }
  },
  {
    id: "sn-sec-3", yol: "sec", ders: "sec-3", baslik: "PR incelemesi: base64 şifreleme değildir", sablon: "inceleme",
    belge: { tur: "pr", konu: "PR #87 · Simplify password storage", kimden: "Jonas (developer)",
      metin: "This PR changes how passwords are stored. In the signup code, the password is saved as Buffer.from(password).toString('base64'), with the comment \"base64 encryption, so we can email the password to users who forget it\". In the new quick-login feature, the code stores md5(password). Jonas wrote in the description: \"Base64 keeps passwords secret, and md5 is fast, so login stays snappy. Reversible storage lets support recover forgotten passwords.\" CI is green and the feature is announced for next week. You are asked to review the PR before it is merged." },
    gorev: "Leave a review comment on the PR using the three headings. Explain the problem clearly and propose a safer design.",
    ipucuTr: "Parola saklamada hangi özellikler önemli: geri çevrilebilirlik, hız, tuz? Unutulan parola için parolayı okumadan güvenli bir yol öner.",
    sozluk: [["hash", "özet (hash)"], ["salt", "tuz"], ["encoding", "kodlama"], ["encryption", "şifreleme"], ["reversible", "geri çevrilebilir"], ["brute force", "kaba kuvvet"], ["bcrypt / Argon2", "parola için yavaş özet algoritmaları"], ["password reset link", "parola sıfırlama bağlantısı"], ["one-way", "tek yönlü"]],
    kaliplar: ["One concern is that …", "This matters because …", "Instead of …, we could …", "Thanks for raising the support use case."],
    mustMention: [
      { ad: "base64 kodlamadır, şifreleme değil", es: ["encoding", "not encryption", "not a form of encryption", "anyone can decode", "can be decoded", "easily decoded", "decod*"] },
      { ad: "md5 parola için fazla hızlı", es: ["too fast", "fast hash", "brute force", "rainbow", "gpu"] },
      { ad: "tuz (salt)", es: ["salt", "salted", "salting"] },
      { ad: "bcrypt/Argon2/scrypt", es: ["bcrypt", "argon2", "argon2id", "scrypt", "pbkdf2"] },
      { ad: "parola kurtarma yerine sıfırlama", es: ["reset link", "password reset", "reset flow", "one way", "irreversible"] }],
    kontrol: ["Önce gözlemi tarafsız yazdım (ne yapılmış).", "Kodlama ile şifreleme farkını açıkladım.", "Hızlı özetin neden parola için kötü olduğunu açıkladım.", "Somut bir güvenli alternatif önerdim (tuzlu, yavaş özet).", "Destek ihtiyacına (parola kurtarma) uygun bir çözüm sundum.", "Ton nazik; teşekkürle başladım ya da bitirdim."],
    ornek: {
      observation: "The signup code stores passwords as base64 and the quick-login code stores md5(password). Base64 is an encoding, not encryption, and anyone can decode it.",
      why: "If the database leaks, every password can be read immediately, and users who reuse them are at risk everywhere. Md5 is a fast hash, so attackers can brute force billions of guesses per second, and without a salt, identical passwords give identical hashes.",
      suggestion: "Could we store a salted, slow, one-way hash with bcrypt or Argon2 instead? For forgotten passwords, support can send a password reset link, so we never need to read or email a password. Thanks for raising the support use case, and I am happy to help with the change." }
  },
  {
    id: "sn-sec-4", yol: "sec", ders: "sec-4", baslik: "Acil MFA sıfırlama talebi: önce kimlik doğrula", sablon: "soru",
    belge: { tur: "slack", konu: "#it-security · urgent MFA reset request", kimden: "Sven (help desk, night shift)",
      metin: "A caller says he is Daniel from the executive team. He is travelling, his phone with the authenticator app fell into water, and he must join a board call in 30 minutes. He asks me to disable MFA on his account and reset his password right now. He knows his employee number, but he sounds very stressed and a bit angry. Our policy says an MFA reset needs identity verification, but it does not say how. I do not want to block a real executive, and I do not want to help an attacker. What should I do? Can someone from security answer quickly?" },
    gorev: "Write what Sven should say to the caller: the checks he asks for, and what he can offer in the meantime.",
    ipucuTr: "Arayanın verdiği bilgiye mi, kayıtlı kanala mı güveneceksin? Beklerken hesabı riske atmadan ne sunabilirsin?",
    sozluk: [["identity verification", "kimlik doğrulama (kişiyi teyit)"], ["call back", "geri aramak"], ["social engineering", "sosyal mühendislik"], ["urgency", "acele ettirme"], ["backup code", "yedek kod"], ["enroll a new device", "yeni cihaz kaydetmek"], ["approval", "onay"], ["policy", "politika"], ["escalate", "üst seviyeye iletmek"]],
    kaliplar: ["Before I change anything, I need to …", "I will call you back on the number we have on file.", "This is the same process for everyone.", "In the meantime, I can offer …"],
    mustMention: [
      { ad: "kimlik doğrulama", es: ["identity is verified", "verify your identity", "verify who", "confirm your identity", "identity verification", "verification steps"] },
      { ad: "kayıtlı numaradan geri arama", es: ["call you back", "call back", "callback", "number on file", "known number", "hr directory", "out of band"] },
      { ad: "yönetici onayı / bilet", es: ["manager*", "approval", "approve*", "ticket"] },
      { ad: "acele/baskı = sosyal mühendislik", es: ["social engineering", "pressure", "pretext", "vishing", "urgency"] },
      { ad: "güvenli geçici çözüm", es: ["backup code*", "one time", "hardware key", "new device", "enroll*"] }],
    kontrol: ["Sorular tek tek ve doğrulanabilir (kayıtlı numara, onay).", "Arayan kişinin verdiği bilgiye değil, kayıtlı kanala güvendim.", "Acele/baskıyı bir risk işareti olarak adlandırdım.", "MFA'yı doğrulamadan kapatmayacağımı açıkça yazdım.", "Beklerken sunabileceğim güvenli bir seçenek yazdım.", "Ton saygılı ve kararlı; gerçek yöneticiyi de suçlamıyor."],
    ornek: {
      questions: "Can I call you back on the mobile number we have in the HR directory, not the number you are calling from? Can your manager confirm the request in the ticket or by video? Please understand that an employee number is not enough proof, and that the same checks apply to everyone, because urgency and pressure are typical signs of social engineering.",
      meanwhile: "I will not disable MFA or reset the password before your identity is verified. Once the callback and the approval are done, I can offer a one-time backup code or enroll a new device, and I will record every step in the ticket. If there is no time, a colleague can add you to the call as a guest while we finish the checks." }
  },
  {
    id: "sn-sec-5", yol: "sec", ders: "sec-5", baslik: "Dağıtık giriş denemeleri: ne oluyor?", sablon: "bug",
    belge: { tur: "olay", konu: "Alert summary · login endpoint, Monday 02:10–02:40 UTC", kimden: "Security monitoring",
      metin: "The web login endpoint received 18,400 failed login attempts from 35 different IP addresses. That is about 500 per IP. Each IP tried one or two email and password pairs per account and then moved on. The per-IP block starts at 1,000 failures in 30 minutes, so no single IP reached it. The attempts used 6,100 different email addresses. Twelve accounts logged in successfully; according to the breach checker, all twelve use the same password as in a public leak from another website. None of these users has MFA enabled. The application has no CAPTCHA and no per-account lockout. The security lead asks for an incident summary before the 9 am meeting." },
    gorev: "Write the incident summary with the five headings. Name the type of attack and the controls that were missing.",
    ipucuTr: "IP başına limit neden işe yaramadı? Saldırıyı hangi adla anarsın? Ele geçen hesaplara ne yaparsın ve hangi kontroller eksikti?",
    sozluk: [["credential stuffing", "sızdırılmış parolaları başka sitede denemek"], ["brute force", "kaba kuvvet"], ["rate limiting", "oran sınırlama"], ["lockout", "hesap kilitleme"], ["MFA", "çok faktörlü kimlik doğrulama"], ["CAPTCHA", "insan doğrulama testi"], ["session", "oturum"], ["breach", "veri ihlali"], ["distributed", "dağıtık"]],
    kaliplar: ["This pattern is consistent with …", "The attack stayed under the per-IP limit because …", "I forced a reset for …", "We are still missing …"],
    mustMention: [
      { ad: "credential stuffing / parola yeniden kullanımı", es: ["credential stuffing", "password spraying", "stuffing", "password reuse", "reused password*", "reuse*"] },
      { ad: "dağıtık deneme (çok IP)", es: ["distributed", "botnet", "spread across", "many ips", "low and slow"] },
      { ad: "MFA eksikliği", es: ["no mfa", "without mfa", "mfa is not", "not enabled", "2fa", "two factor", "multi factor"] },
      { ad: "oran sınırı / hesap kilidi / CAPTCHA önerisi", es: ["rate limiting", "per account rate", "account lockout", "add captcha", "enable captcha", "throttl*"] },
      { ad: "ele geçen hesaplara müdahale", es: ["revok*", "forced a password reset", "force* a password reset", "reset the password*", "sign* out"] }],
    kontrol: ["Saldırı türünü doğru adlandırdım ve nedenini bir cümleyle gösterdim.", "Neden IP başına limitin yetmediğini açıkladım.", "Eksik kontrolleri açıkça saydım (MFA, kilit/limit, CAPTCHA).", "Ele geçen 12 hesaba ne yaptığımı yazdım.", "Doğrulamayı gözlenebilir bir sonuçla anlattım.", "Kullanıcılara bildirim ve kalıcı önlemleri sonraki adım olarak yazdım."],
    ornek: {
      problem: "Between 02:10 and 02:40 UTC the login endpoint received 18,400 failed attempts from 35 IP addresses, and 12 accounts were accessed successfully.",
      cause: "This is credential stuffing: attackers tried passwords leaked from another website, because users reuse them. The attack was distributed over many IPs, so our per-IP block never triggered, and we have no MFA, no CAPTCHA and no per-account lockout.",
      fix: "I forced a password reset for the 12 accounts, revoked their sessions, enabled per-account rate limiting and temporarily blocked the abusive IP ranges.",
      verified: "I verified in the logs that the 12 sessions are closed, that new failed attempts now receive HTTP 429, and that no further successful logins came from those IP ranges.",
      next: "Next, we should offer MFA and make it mandatory for admins, check new passwords against known breaches, add CAPTCHA after repeated failures and notify the affected users." }
  }
);

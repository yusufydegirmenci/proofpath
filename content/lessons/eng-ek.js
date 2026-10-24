/* Teknik İngilizce yolu · Faz 5 tur 6: konu başına ders eki (anahtar = TMAP.eng dizini, 0–10).
   Benzetme + sınırı, rehberli alıştırma, bağımsız görev, yaygın hatalar, geçme ölçütü + kritik yanlış anlama,
   dış kaynak (son doğrulama tarihiyle), telafi/sonraki adım.
   Tüm alıştırmalar kâğıt üzerinde, sesli tekrar (kendi telefonunda kayıt dahil) ya da kendi çalışmanla yapılır.
   Bu ek bir sınav seviyesi, puan ya da şirket kuralı iddia etmez; yalnız ders içindeki kalıpların kullanımını pekiştirir.
   Dış kaynak: yalnız HTTP 200 dönen ve başlığı konuyla eşleşen sayfalar (curl, 2026-10-12). British Council sayfaları erişilemedi,
   Cambridge "do-or-does", "emails" ve "can-could-and-be-able-to" sayfaları konu başlığı vermediği için eklenmedi; konu 0, 9 ve 10 kaynaksızdır. */
(function () {
  var E = ((window.PP_EK = window.PP_EK || {}).eng = (window.PP_EK.eng || {}));
  var DOG = "2026-10-12";
  var K = function (t, u, neden) { return { t: t, u: u, dogrulama: DOG, neden: neden }; };
  var CG = function (slug, ad, neden) { return K("Cambridge Dictionary, English Grammar Today: " + ad, "https://dictionary.cambridge.org/grammar/british-grammar/" + slug, neden); };

  E[0] = {
    analoji: { a: "Kartvizit: küçücük bir kartta ad, görev ve yer yazar; karşındaki sana hemen yer açar. Kendini tanıtmak da sözlü bir kartvizittir.", sinir: "Kartvizit sabit durur; konuşmada karşındakine ve ortama göre kısaltır ya da ayrıntı eklersin, ayrıca yüz yüze tanışmada ses tonu ve gülümseme de mesajın parçasıdır." },
    rehberli: ["Dört kalıbı yaz: I'm ... (ad), I work as a/an ... (rol), I'm based in ... (yer), I'm interested in ... / I'm learning ... (hedef).", "Kendi bilgilerinle doldur ve sesli oku; her cümleyi bir nefeste söyleyebildiğini kontrol et.", "Karşındaki 'Nice to meet you.' dediğinde 'Nice to meet you too.' diye cevap ver; telefonunun kaydını açıp 30 saniyelik tanıtmanı kaydet ve dinle."],
    bagimsiz: "Kendini 30 saniyede anlatan 4 cümlelik bir tanıtım yaz (ad, rol, yer, hedef). Sesli oku, bir kez kaydet ve dinle; takıldığın ya da çok uzatan yeri kısaltıp tekrar yaz. Sonra iş yerinde yeni biriyle tanışacak olsan nasıl değiştireceğini bir cümleyle belirt.",
    hatalar: [["'I am live in Ankara' demek", "'I live in Ankara.' ya da 'I'm based in Ankara.' de; live bir fiildir, önüne am gelmez."], ["'I work as IT administrator' demek", "Meslek adından önce a/an gelir: 'I work as an IT administrator.' ('an' çünkü IT sesli harfle başlar: ay-ti)."], ["'Nice to meet you' cevabını 'I'm fine' diye vermek", "Cevap 'Nice to meet you too.' ya da 'Nice to meet you, too.' olur; 'I'm fine' 'How are you?' sorusunun cevabıdır."]],
    gecme: { olcut: "Mini sınavda %80 ve kendini ad, rol, yer ve hedefle dört cümlede, doğru artikel ve fiil biçimiyle söyleyip yazabilmek.", kritik: ["'I am' ile 'I work/live' kalıplarını birbirine karıştırmak", "Mesleği artikelsiz söylemek ve fark etmemek"] },
    telafi: "Takıldıysan yalnız ilk iki kalıba dön: 'Hi, I'm ...' ve 'I work as a/an ...'. İkisini bir hafta boyunca günde bir kez söyle; sonra yer ve hedefi ekle.",
    sonraki: "Sıradaki konu: Present simple. Tanıtırken kullandığın 'I work' ve 'I live' kalıpları aslında bu zamanın örnekleridir."
  };

  E[1] = {
    analoji: { a: "Otobüs tarifesi: 'otobüs her sabah 8'de kalkar'. Present simple de tekrar eden alışkanlıkları ve değişmeyen gerçekleri anlatan tarifedir.", sinir: "Tarife sabit saat gösterir; 'şu anda yaptığım iş' için ise farklı bir zaman (present continuous: I'm working) kullanılır, bu derste o yok." },
    rehberli: ["Beş alışkanlığını yaz: I work ..., I check ..., I start ..., sonra aynı cümleleri he/she ile tekrar et ve -s/-es eklemeyi uygula (he works, she checks).", "Aynı cümlelerden soru yap (Do you work ...? Does he work ...?) ve olumsuz yap (They don't work ..., She doesn't work ...).", "Zaman ipuçlarını (every day, on Fridays, usually, never) cümlelere ekle ve sesli oku."],
    bagimsiz: "Kendi haftalık rutinin için altı cümle yaz: üç cümle 'I' ile, üç cümle bir arkadaşın ya da iş arkadaşın için (he/she). İki soru ve iki olumsuz cümle ekle. Yazdıktan sonra fiillerde -s unutup unutmadığını, soruda does'tan sonra fiilin yalın kalıp kalmadığını kontrol et.",
    hatalar: [["'She work here' demek", "he/she/it ile fiile -s/-es eklenir: 'She works here.'"], ["'Does he works?' demek", "does varken fiil yalın kalır: 'Does he work here?'"], ["'He don't work' demek", "he/she/it ile 'doesn't' kullan: 'He doesn't work on Fridays.'"]],
    gecme: { olcut: "Mini sınavda %80 ve aynı bilgiyi I ve he/she için doğru olumlu, olumsuz ve soru cümlesiyle kurabilmek.", kritik: ["Soruda hem does hem fiile -s koymak", "he/she/it'te olumsuzda don't kullanmak"] },
    kaynaklar: [CG("present-simple-i-work", "Present simple (I work)", "Present simple'ın kullanımı ve örnekleri için.")],
    telafi: "Takıldıysan yalnız he/she cümleleriyle çalış: önce 'She works', sonra 'She doesn't work', sonra 'Does she work?'. Her biri için beş cümle yaz.",
    sonraki: "Sıradaki konu: Past simple. Aynı cümleleri geçmişe çevirip bitmiş işleri anlatmayı orada öğreneceksin."
  };

  E[2] = {
    analoji: { a: "İş günlüğü: dün ne yaptığını tarihle yazarsın ve bitmiş işi kaydedersin. Past simple de bitmiş geçmiş olayların kaydıdır.", sinir: "Günlük hep tarihlidir; konuşmada 'ne zaman' belli olmasa da bitmiş bir işi anlatıyorsan past simple kullanırsın, ama 'şimdiyle bağlantılı' geçmiş için başka bir zaman (present perfect) vardır ve bu derste yok." },
    rehberli: ["Düzenli beş fiili geçmişe çevir (fix → fixed, test → tested, work → worked, study → studied, stop → stopped) ve yazım kalıbına (y → ied, sessiz harf tekrarı) dikkat et.", "Düzensiz beş fiili ezberle (go → went, see → saw, write → wrote, find → found, have → had) ve her biriyle bir cümle kur.", "Soru ve olumsuzu kur: 'Did you test it?', 'I didn't find the bug.' Did/didn't'ten sonra fiilin yalın kaldığını işaretle."],
    bagimsiz: "Dün yaptığın altı işi past simple ile yaz (üç düzenli, üç düzensiz fiil). İki soru (Did you ...?) ve iki olumsuz cümle (I didn't ...) ekle. Yazdıktan sonra did'den sonra fiilleri yalın bıraktığını ve düzensiz fiilleri doğru yazdığını kontrol et.",
    hatalar: [["'Did you fixed it?' demek", "did varken fiil yalın kalır: 'Did you fix it?'"], ["'I goed home' demek", "go düzensiz bir fiildir: 'I went home.'"], ["'I didn't found the bug' demek", "didn't varken de fiil yalın kalır: 'I didn't find the bug.'"]],
    gecme: { olcut: "Mini sınavda %80 ve verilen düzenli ve düzensiz fiilleri geçmişe çevirip did/didn't ile soru ve olumsuz kurabilmek.", kritik: ["Did/didn't'ten sonra fiili de geçmiş yapmak", "Düzensiz fiillere -ed eklemek"] },
    kaynaklar: [CG("past-simple-i-worked", "Past simple (I worked)", "Past simple'ın kullanımı."), CG("irregular-verbs", "Table of irregular verbs", "Düzensiz fiillerin tablosu; yalnız ihtiyacın olanları çalış.")],
    telafi: "Takıldıysan yalnız 10 sık fiille çalış (go, see, have, make, find, write, run, fix, test, work). Her gün ikisini geçmişte bir cümleye koy.",
    sonraki: "Sıradaki konu: Soru kurmak. Do, does ve did'i soru kurarken doğru seçmeyi orada göreceksin."
  };

  E[3] = {
    analoji: { a: "Bilet gişesinde sıra kuralı: soru kurarken yardımcı fiil (do, does, did) başa geçer, cümlenin sırası değişir. Sıra bozulursa kasiyer ne dediğini anlamaz.", sinir: "Gişedeki sıra herkes için aynıdır; İngilizcede soruda özne soru kelimesi olursa (Who fixed it?) yardımcı fiil gerekmez, bu yüzden her soru aynı kalıpla kurulmaz." },
    rehberli: ["Üç olumlu cümleyi soruya çevir: 'You work here.' → 'Do you work here?', 'She works here.' → 'Does she work here?', 'You tested it.' → 'Did you test it?'", "Where, what, when, why, how ile beş soru kur ve yardımcı fiilin soru sözcüğünden sonra geldiğini işaretle: 'Where do you work?'", "Be fiilli soru kur (Are you ready? Is it working?) ve bunda do/does gerekmediğini fark et."],
    bagimsiz: "İş görüşmesi ya da stand-up için kendine sorabileceğin sekiz soru yaz (dördü yes/no, dördü wh- sorusu). Her soruda doğru yardımcı fiili ve yalın fiili kullan. Sonra her soruya kısa bir cevap yaz ('Yes, I do.' / 'No, she doesn't.').",
    hatalar: [["'You work here?' demek (yardımcı fiil olmadan)", "Gündelik konuşmada sorulabilir ama yazılı ve resmî dilde 'Do you work here?' kur."], ["'Does she works here?' demek", "does varken fiil yalın kalır: 'Does she work here?'"], ["'Where you work?' demek", "Soru sözcüğünden sonra yardımcı fiil gelir: 'Where do you work?'"]],
    gecme: { olcut: "Mini sınavda %80 ve verilen cümleleri do/does/did ile doğru soruya çevirebilmek.", kritik: ["Soruda yardımcı fiili atlamak", "Yardımcı fiil varken ana fiile de -s ya da -ed koymak"] },
    kaynaklar: [CG("questions", "Questions", "Soru kurmanın temel kalıpları."), CG("wh-questions", "Wh- questions", "Soru sözcükleriyle soru kurma.")],
    telafi: "Takıldıysan yalnız üç adım uygula: önce hangi zaman (şimdi/geçmiş), sonra yardımcı fiil (do/does/did), sonra özne ve yalın fiil.",
    sonraki: "Sıradaki konu: Can / could. Soruları kibar rica ve yetenek anlatan kalıplarla kurmayı orada göreceksin."
  };

  E[4] = {
    analoji: { a: "Kapıyı çalıp girmek: 'can' kapıyı rahatça açmak gibi (yetenek, günlük rica), 'could' ise önce kapıyı çalıp nazikçe sormak gibi. İş ortamında ikisi de lazım.", sinir: "Kapının açılıp açılmayacağı bellidir; konuşmada ton ve ilişki kibarlığı belirler, 'could' her zaman daha uygun olmaz (arkadaşa 'Can you pass it?' da gayet doğaldır)." },
    rehberli: ["Yeteneğini can ile anlat (I can write SQL queries.) ve olumsuzunu yaz (I can't ...).", "Rica cümleleri kur: 'Can you send me the file?' ve daha kibar hali 'Could you check this ticket, please?'", "Nazik bir 'hayır' yaz: 'Sorry, I can't join the meeting at 3. Could we move it to 4?'"],
    bagimsiz: "İş yerinde bir arkadaşından, bir yöneticiden ve bir müşteriden aynı şeyi (ör. bir dosyayı göndermesini) rica eden üç cümle yaz; her birinde farklı derecede kibarlık kullan. Sonra bir toplantıya katılamayacağını söyleyen kibar bir cümle yaz.",
    hatalar: [["'Could you to check?' demek", "can ve could'tan sonra 'to' gelmez, fiil yalın kalır: 'Could you check this?'"], ["'Can you checking?' demek", "-ing eklenmez: 'Can you check?'"], ["Her yerde sadece 'can' kullanmak", "Yöneticiye ya da müşteriye rica ederken 'could' ve 'please' tonu yumuşatır."]],
    gecme: { olcut: "Mini sınavda %80 ve aynı rica için can ve could cümlelerini kurup 'please' ile tonu ayarlayabilmek.", kritik: ["can/could'tan sonra to ya da -ing getirmek", "Reddi 'No' demekle sınırlamak, nazik bir öneri eklememek"] },
    kaynaklar: [CG("can", "Can", "Can'in yetenek, izin ve rica kullanımları."), CG("could", "Could", "Could'un rica ve diğer kullanımları.")],
    telafi: "Takıldıysan tek bir rica seç ve üç tonda yaz: 'Can you ...?', 'Could you ...?', 'Could you ..., please?' Aralarındaki farkı bir cümleyle not et.",
    sonraki: "Sıradaki konu: İş e-postası. Kibar rica kalıplarını yazılı iletişimde kullanmayı orada göreceksin."
  };

  E[5] = {
    analoji: { a: "Posta paketi: üstündeki etiket (konu satırı) paketin ne olduğunu söyler, içindeki kısa not (mesaj) ne istediğini. Etiketsiz ya da dağınık paket geri döner.", sinir: "Paketi göndereni hemen görürsün; e-postada karşındakinin ton ve ilişki beklentisi (resmî mi, samimi mi) de mesajı etkiler ve her şirkette farklı olabilir." },
    rehberli: ["Bir e-posta iskeleti yaz: konu satırı, selam (Hi Ayşe,), amaç (I'm writing to ask about ...), rica (Could you please ... by Friday?), kapanış (Best regards, ad).", "Aynı mesajı hem samimi bir arkadaşa hem de tanımadığın bir yöneticiye yaz ve tonun neresinin değiştiğini işaretle.", "Konu satırını beş kelimeye indir ve mesajın gövdesini üç cümleye sığdır."],
    bagimsiz: "Bir iş arkadaşından bir rapora erişim isteyen kısa bir e-posta yaz: net konu satırı, selam, tek cümlelik amaç, bir rica (tarih ile) ve kapanış. Yazdıktan sonra sesli oku ve gereksiz her kelimeyi çıkar; iki farklı alıcı (arkadaş ve yönetici) için tonu bir cümleyle belirt.",
    hatalar: [["Konu satırını boş bırakmak ya da 'Hi' yazmak", "Konu satırı mesajın konusunu söylemeli (ör. 'Access to the sales report')."], ["Amacı uzun bir paragrafın sonuna saklamak", "İlk cümlede ne istediğini söyle; ayrıntıyı sonra ver."], ["Tonu alıcıya uydurmamak", "Tanımadığın biriyle resmîce yaz; samimi bir iş arkadaşıyla kısa ve sıcak yaz. Emin değilsen daha kibar tarafı seç."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen durum için konu satırı, selam, amaç, rica ve kapanışı içeren kısa bir e-posta yazabilmek.", kritik: ["E-postada neyi, ne zamana kadar istediğini belirtmemek", "Resmî ve samimi tonu ayırt etmemek"] },
    kaynaklar: [CG("formal-and-informal-language", "Formal and informal language", "Resmî ve gündelik dil farkını kavramak için.")],
    telafi: "Takıldıysan yalnız üç satır yaz: konu, bir cümlelik amaç, tarihle bir rica. Sonra selam ve kapanışı ekle.",
    sonraki: "Sıradaki konu: Stand-up. E-postada kısa ve net yazmayı toplantıda kısa ve net konuşmaya taşıyacaksın."
  };

  E[6] = {
    analoji: { a: "Futbolda devre arası konuşması: kısa, odaklı, herkes ne durumda olduğunu ve neye ihtiyacı olduğunu söyler. Stand-up da üç cümlelik bir durum bildirimidir.", sinir: "Devre arasında teknik direktör konuşur; stand-up'ta herkes sırayla konuşur ve ekip, ürün ve hata tartışması için ayrı toplantı gerekir, çok uzatılmamalıdır." },
    rehberli: ["Üç kalıbı yaz: 'Yesterday I ...' (past simple), 'Today I'm going to ...' (plan), 'I'm blocked by ...' ya da 'I'm waiting for ...' (engel).", "Kendi gününü bu üç kalıpla doldur ve sesli oku; zamanları karıştırıp karıştırmadığını kontrol et.", "'I have no blockers.' kalıbını ekle ve 'That's all from me.' ile bitir; toplamın 30 saniyeyi geçmediğini ölç."],
    bagimsiz: "Bir okul ödevin ya da bir kişisel projen için 30 saniyelik bir stand-up yaz: dün ne yaptın (past simple), bugün ne yapacaksın (going to), seni ne durduruyor ya da durdurmuyor. Kendi telefonuna kaydet, dinle ve fazla ayrıntıyı çıkar.",
    hatalar: [["'Yesterday I test the login page' demek", "Dün için past simple kullan: 'Yesterday I tested the login page.'"], ["Engeli söylememek", "Engel varsa açıkça söyle: 'I'm blocked by a missing test account.' Sessizlik yardım almayı geciktirir."], ["Çok ayrıntıya girmek", "Stand-up kısa bir durum bildirimidir; ayrıntı gerekiyorsa 'Can we talk after the stand-up?' de."]],
    gecme: { olcut: "Mini sınavda %80 ve dün, bugün ve engel olmak üzere üç parçalı kısa bir stand-up'ı doğru zamanlarla söyleyebilmek.", kritik: ["Dünü şimdiki zamanla anlatmak", "Engeli bilip söylememek"] },
    kaynaklar: [K("Atlassian: Standups for agile teams", "https://www.atlassian.com/agile/scrum/standups", "Stand-up toplantısının amacı ve yapısı.")],
    telafi: "Takıldıysan önce yalnız 'Yesterday I ...' cümlesini günde bir kez söyle; sonra 'Today I'm going to ...' ve engeli ekle.",
    sonraki: "Sıradaki konu: Anlamadığını söylemek. Toplantıda anlamadığın bir şey çıktığında nasıl nazikçe sorabileceğini orada öğreneceksin."
  };

  E[7] = {
    analoji: { a: "Navigasyon yanlış yola sokarsa 'yeniden hesaplanıyor' dersin: yanlış yolda ilerlemek yerine durup yeniden yön sorarsın. Anlamadığını söylemek de aynı düzeltmedir.", sinir: "Navigasyon her zaman yeniden hesaplar; insan bazen utanır ya da hızlı konuşan biri karşısında sormak zor gelir, bu yüzden hazır kalıpları önceden pratik etmek gerekir." },
    rehberli: ["Dört kalıbı yaz: tekrar iste (Sorry, could you repeat that?), yavaşlat (Could you speak a bit slower, please?), teyit et (Let me check if I understand: ... right?), örnek iste (Could you give me an example?).", "Her kalıbı sesli üç kez söyle; tonunun nazik olduğundan emin ol.", "Kendi ders ya da iş senaryonda bir cümleyi 'anlamadım' diye varsay ve dört kalıptan hangisini kullanacağına karar ver."],
    bagimsiz: "Kısa bir çevrimiçi ders ya da toplantı videosunu (kendi izlediğin, herkese açık) aç ve iki yerde durdur. Her durakta anlamadığın bir şeyi dört kalıptan biriyle sormuş gibi yaz ve karşı tarafın cevabını tahmin ederek teyit cümlesi kur.",
    hatalar: [["Anlamayıp sessiz kalmak", "Yanlış anlama sonradan daha pahalıdır; hemen sor."], ["Sadece 'What?' demek", "Kısa ve kaba durabilir; 'Sorry, could you repeat that?' ya da 'Sorry, I didn't catch that.' de."], ["Anlamadığı hâlde 'Yes, yes' demek", "Teyit et: 'Let me check if I understand: we need the report by Friday, right?'"]],
    gecme: { olcut: "Mini sınavda %80 ve dört durumda (tekrar, yavaşlatma, teyit, örnek) doğru nazik kalıbı seçebilmek.", kritik: ["Anlamadığını söylemeyi zayıflık sanmak", "Teyit etmeden varsayımla işe başlamak"] },
    kaynaklar: [CG("requests", "Requests", "Rica kalıplarının yapısı."), CG("politeness", "Politeness", "Nazik ifade biçimleri.")],
    telafi: "Takıldıysan yalnız bir kalıba odaklan: 'Sorry, could you repeat that?'. Bir hafta boyunca günde üç kez sesli söyle; sonra ikincisini ekle.",
    sonraki: "Sıradaki konu: Teknik kelimeler. Karşındakinden anlamadığın bir teknik sözcüğü sorarken kullanacağın ortak IT kelimelerini orada göreceksin."
  };

  E[8] = {
    analoji: { a: "Alet çantası: her alet (kelime) bir işe yarar ve doğru yerde kullanılınca iş hızlanır. Aynı kelimeyi isim ya da fiil gibi kullanmak, çekici tornavida yerine kullanmak gibidir.", sinir: "Çantadaki aletin adı sabit; teknik kelimelerin kullanımı takıma ve şirkete göre değişebilir ve kalıplar farklı olabilir, bu yüzden ekibin kullandığı kalıbı gözlemlemek gerekir." },
    rehberli: ["Dört kelimeyi cümlede kullan: 'I found a bug in the login page.', 'I'm working on a ticket about passwords.', 'We deployed the fix this morning.', 'The release is on Friday.'", "Her kelimenin türünü (isim/fiil) yaz: bug (isim), ticket (isim), deploy (fiil), release (isim ya da fiil).", "İsimlerden (bug, ticket) çoğul cümle (two bugs, three tickets), fiillerden (deploy, release) geçmiş zaman cümlesi (deployed, released) kur."],
    bagimsiz: "Kendi projen ya da ödevin için altı cümle yaz: her cümlede bu dört kelimeden en az birini doğru türde ve doğru biçimde kullan (bug, ticket, deploy, release). Birinde geçmiş zaman, birinde çoğul kullan. Sonra bir cümleyi bir iş arkadaşına anlatır gibi sesli söyle.",
    hatalar: [["'I found bug' demek (artikelsiz)", "Sayılabilir isimdir: 'I found a bug.' / 'I found two bugs.'"], ["'We deploy it yesterday' demek", "Dün için past simple: 'We deployed it yesterday.'"], ["Anlamını bilmeden kelimeyi kullanmak", "Emin değilsen sor: 'What do you mean by release here?' Anlam şirkete göre değişebilir."]],
    gecme: { olcut: "Mini sınavda %80 ve dört temel IT kelimesini doğru türde, isimleri çoğul, fiilleri geçmiş zaman biçimiyle cümlede kullanabilmek.", kritik: ["Fiil ile ismi karıştırmak", "Sayılabilir bir ismi artikelsiz ve tekil yazmak"] },
    kaynaklar: [K("Google developer documentation style guide: Word list", "https://developers.google.com/style/word-list", "Teknik yazıda sık geçen sözcüklerin kullanım önerileri; kendi ekibinin kullanımıyla karşılaştır.")],
    telafi: "Takıldıysan tek bir isim seç (ör. bug) ve tekil, çoğul, soru, olumsuz ile 'The bug was fixed.' gibi geçmiş olay cümlesi kur; sonra bir fiil (ör. deploy) için geçmiş zaman cümlesi yaz. Sonra diğer kelimeye geç.",
    sonraki: "Sıradaki konu: Hata anlatmak. Bu kelimeleri bir hata raporunda net ve eksiksiz kullanmayı orada göreceksin."
  };

  E[9] = {
    analoji: { a: "Tamirciye giderken 'çalışmıyor' demek yerine 'düğmeye basınca ışık yanıyor ama ses çıkmıyor' dersen tamirci hemen anlar. Hata raporu da aynı netliği ister.", sinir: "Tamirci cihazı elinde görür; hata raporunu okuyan kişi senin ekranını görmez, bu yüzden adımlar ve ortam bilgisi eksiksiz yazılmalıdır." },
    rehberli: ["Şablonu yaz: Title, Steps (1, 2, 3), Expected, Actual, Browser/Environment.", "Bir hata düşün (ör. giriş düğmesi çalışmıyor) ve her başlığı İngilizce cümleyle doldur: 'Login button does nothing.', 'Expected: I see the dashboard.', 'Actual: nothing happens.'", "Raporu bir arkadaşının okuyup tekrar üretebileceği kadar net olup olmadığını kontrol et."],
    bagimsiz: "Kendi kullandığın bir uygulamadaki gerçek ya da uydurma bir hata için İngilizce bir rapor yaz: başlık, numaralı adımlar, beklenen, gerçekleşen, tarayıcı ve sürüm. Bir iş arkadaşı gibi, raporu okuyup hatayı tekrar üretebilecek mi diye kontrol et ve belirsiz yeri düzelt.",
    hatalar: [["'It doesn't work.' yazmak", "Hiçbir bilgi vermez; ne olmasını beklediğini ve ne olduğunu söyle."], ["Birçok sorunu tek raporda anlatmak", "Her sorun ayrı rapor olmalı; yoksa izlenmesi zorlaşır."], ["Ortam bilgisini unutmak", "Tarayıcı, işletim sistemi ve sürümü yaz; hata ortama bağlı olabilir."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen bir hata için başlık, adımlar, beklenen, gerçekleşen ve ortam bilgisini içeren İngilizce rapor yazabilmek.", kritik: ["Beklenen ile gerçekleşeni ayırmamak", "Adımları numarasız ve belirsiz yazmak"] },
    telafi: "Takıldıysan raporu beş satıra böl: başlık, adımlar, expected, actual, ortam. Her satırı tek kısa cümleyle doldur.",
    sonraki: "Sıradaki konu: Mülakat. Net ve kısa anlatma becerini kendini tanıtma cevabında kullanacaksın."
  };

  E[10] = {
    analoji: { a: "Asansör konuşması: 30 saniyede kim olduğunu, ne yaptığını ve ne aradığını söylersin. Hazırlanmış kısa bir cevap sorular başlamadan güven verir.", sinir: "Asansör konuşması sabittir; gerçek mülakatta sorular ve şirket değişir, bu yüzden cevabını ezber değil esnek bir iskelet olarak hazırla." },
    rehberli: ["Dört cümlelik iskeleti yaz: şimdi (I'm a ...), geçmiş (I studied ...), hedef (Now I'm looking for ...), neden (I enjoy ...).", "Kendi bilgilerinle doldur ve sesli oku; süreyi ölç (hedef: kısa ve net).", "Kendi telefonuna kaydet, dinle ve tekrarlanan ya da gereksiz kelimeleri çıkar."],
    bagimsiz: "Kendini tanıtan dört cümlelik bir cevap yaz ve üç farklı hedef için (ör. destek, test, junior geliştirici) hedef cümlesini değiştir. İki soru ekle ('Why this role?', 'What do you enjoy?') ve her biri için tek cümlelik cevap hazırla. Ezberleme; iskeleti anla ve doğal söyle.",
    hatalar: [["Hazırlanmadan girmek", "Kısa bir iskelet bile kekelemeyi azaltır; önceden sesli çalış."], ["Özgeçmişi baştan sona okumak", "Dört cümlede şimdi, geçmiş, hedef ve nedeni söyle; ayrıntıyı sorulursa ver."], ["Zaman karıştırmak", "Bitmiş eğitim için past simple ('I studied ...'), şimdi için present ('I work ...', 'I'm looking for ...') kullan."]],
    gecme: { olcut: "Mini sınavda %80 ve şimdi, geçmiş, hedef ve nedeni içeren dört cümlelik bir kendini tanıtma cevabını doğru zamanlarla söyleyip yazabilmek.", kritik: ["Hedefi nedenini söylemeden vermek", "Cevabı kelime kelime ezberleyip esnek söyleyememek"] },
    telafi: "Takıldıysan yalnız ilk iki cümleyi (şimdi, geçmiş) bir hafta sesli tekrar et; sonra hedef ve nedeni ekle.",
    sonraki: "Sıradaki konu: PR yorumları. Mülakattaki net ve kısa anlatma becerini, kod incelemesinde kibar ve gerekçeli yazılı yorum yazarken kullanacaksın."
  };
})();

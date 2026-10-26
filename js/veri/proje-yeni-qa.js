"use strict";
/* ALAN: Proje Atölyesi, Test Uzmanı (qa) yolu çekirdek projeleri. NE YAPAR: PP_PROJ.yeni dizisine yol:"qa" olan 9 yeni proje iter (id, lv kademe, başlık ve steps: başlık, anlatım, yap, kanıt, İngilizce, soru).
   SORUN OLURSA: proje-birlestir.js bunları PATHS qa yoluna ekler (cekirdek:true); aynı id varsa atlanır. İlerleme anahtarı path-<proje id> (proje-atolyesi.js); id değişirse ilerleme kopar. Yükleme sırası tests/sira.js ile denetlenir.
   YENİ ÖZELLİK: Yeni proje bu dosyada K.yeni.push; kademe sayıları tests/faz8_proje.js içinde denetlenir. */
(function (g) {
  var K = g.PP_PROJ = g.PP_PROJ || { tanim: {}, yeni: [], va: [] };

  /* ===================== LV1 ===================== */

  K.yeni.push({
    yol: "qa", id: "qa1b", lv: 1,
    title: "Hata Raporu Atölyesi: Tekrar Üretilebilir Rapor Yazmak",
    weeks: 2,
    tools: "Tarayıcı DevTools, OBS Studio (veya yerleşik ekran kaydı: Windows'ta Xbox Game Bar, macOS'ta Shift+Cmd+5), Google Sheets, Trello, Google Docs",
    why: "Kötü yazılmış bir hata raporu geliştiriciyi saatlerce soru sormaya iter ve hata çözülmeden kalır. Bilerek hatalı bir demo uygulamada bulduğun sorunları başkasının tek seferde tekrar üretebileceği biçimde yazarsın.",
    outcome: ["Kötü bir hata raporunu teşhis edip düzeltirsin", "Hatayı en az adımla tekrar üretip kanıtlarsın", "Önem ve öncelik ayrımıyla 4 profesyonel rapor yazarsın"],
    pitch: "I wrote reproducible bug reports with minimal steps, evidence and clear severity on an intentionally faulty demo app.",
    steps: [
      ["İyi ve kötü rapor farkı", "Hata raporu bir adres tarifidir: 'şu sokakta bir yerde' demek kimseyi eve ulaştırmaz. İyi raporda başlık, adımlar, beklenen, gerçekleşen ve ortam bulunur.", "Hazır üç kötü rapor örneği yaz ('buton çalışmıyor' gibi). Her birinde eksik olan alanları işaretle ve düzelt.", "3 kötü raporun düzeltilmiş hali", "bug report = hata raporu, expected result = beklenen sonuç, actual result = gerçekleşen sonuç, environment = ortam", "how to write a good bug report examples bad vs good"],
      ["Hatayı tekrar üret", "Tekrar üretilemeyen hata geliştiricinin gözünde yoktur. Önce hatayı 3 kez dene, sonra gereksiz adımları ayıkla; amaç en kısa yolu bulmaktır. Analoji: bulmacanın en kısa çözüm yolu.", "Sauce Demo sitesinde 'problem_user' ile giriş yap (bu hesap bilerek hatalı davranır). Toplam 4 hata bulacaksın: 2'sini bu adımın ilk turunda, 2'sini ek bir turda (farklı sayfalarda: ürün listesi, sepet, ödeme, sıralama) bul. Her hatayı en az adımla 3 kez tekrar ettiğini not et.", "4 hata için en kısa adım listesi (2'si ilk turda, 2'si ek turda)", "reproduce = tekrar üretmek, minimal steps = en az adım, intermittent = ara sıra olan", "how to reproduce a bug minimal steps qa"],
      ["Kanıt topla: ekran, konsol, ağ", "Kanıt raporu inandırıcı yapar. Ekran görüntüsü neyi gördüğünü, konsol hatası ve ağ sekmesi arka planda ne olduğunu gösterir. Analoji: kaza tutanağına eklenen fotoğraf. DevTools F12 ile açılır; Console sekmesi kırmızı hataları, Network sekmesi istekleri ve cevap kodlarını listeler.", "Bulduğun 4 hatanın her birinde DevTools Console ve Network sekmesine bak. Her hata için bir ekran görüntüsü, 15 saniyelik ekran kaydı (OBS Studio veya yerleşik kayıt aracı) ve varsa konsol satırını kaydet; konsolda hata yoksa 'konsol temiz' diye not et.", "4 hata için görüntü, kayıt ve konsol notu", "evidence = kanıt, console error = konsol hatası, network request = ağ isteği, screenshot = ekran görüntüsü", "chrome devtools console network tab for testers"],
      ["Önem ve öncelik", "Önem (severity) hatanın ürüne zararıdır, öncelik (priority) ne zaman düzeltileceğidir. Logo yazım hatası düşük önemli ama ana sayfada ise öncelikli olabilir. Analoji: ambulans mı, randevu mu.", "4 hatayı şu tabloya yerleştir: başlık, önem (kritik/yüksek/orta/düşük), öncelik, gerekçe cümlesi. En az bir hatanın önemi ile önceliği farklı olsun.", "4 satırlı önem-öncelik tablosu", "severity = önem, priority = öncelik, blocker = engelleyici, triage = ayıklama", "severity vs priority bug examples"],
      ["Raporu yaz ve Trello'ya aç", "Başlık hatayı tek cümlede özetler: nerede, ne oluyor. Şablonu sabitlersen her raporda aynı yapıyı kullanırsın; okuyan ne arayacağını bilir.", "Kendi şablonunu yaz. 4 hatanın tamamı için rapor oluştur, en az ikisini İngilizce yaz. Trello panosuna kart olarak aç, Yeni listesine koy.", "4 raporlu Trello panosu", "title = başlık, attachment = ek, label = etiket, status = durum", "bug report template trello jira fields"],
      ["Akran incelemesi ve yeniden yazım", "Rapor yazarken kendi bilgini unutamazsın; başkası okuyunca eksik görünür. Bir arkadaşın raporu yalnız okuyarak hatayı üretebiliyorsa rapor iyidir.", "Raporlarından 2'sini bir kişiye ver ve yalnız rapora bakarak hatayı üretmesini iste. Takıldığı yeri not et, raporu düzelt. Kimse bulunamazsa 24 saat bekleyip kendin 'yabancı gözle' dene.", "Takılma notu ve düzeltilmiş 2 rapor", "peer review = akran incelemesi, clarity = açıklık, feedback = geri bildirim", "bug report peer review checklist"],
      ["Portföy sayfası ve ek hata keşfi","Raporlar ayrı kartlarda dağınık kalırsa işe alım yapan kişi hiçbirini açmaz. Tek sayfada 4 raporun özeti ve en iyi kanıt bir vitrindir; ek bir keşif turu da şablonu gerçekten kullanabildiğini gösterir.","Tek bir Google Docs sayfası aç: başına 3 cümlelik özet yaz, 4 raporun Trello kart bağlantısını ve önem-öncelik özetini ekle. The Internet demo sitesinde 20 dakikalık ek bir keşif turu yap, 1 ek hata bul ve aynı şablonla 'ek bulgu' olarak sayfaya ekle.","Tek portföy sayfası (4 rapor + 1 ek bulgu)","portfolio = portföy, summary = özet, discovery = keşif, link = bağlantı","bug report portfolio page example qa"]
    ],
    onkosul: ["Önkoşul yok: tarayıcı kullanmayı ve bir web sitesinde gezinmeyi bilmen yeterli.", "İsteğe bağlı: qa1 (Manuel Test: İlk Test Planım) projesindeki hata raporu adımı bu projeyi kolaylaştırır.", "DevTools bilgisi önceden gerekmez: F12 ile açmayı ve Console/Network sekmelerini adım 3'te öğrenirsin."],
    gereksinim: [
      "İşlevsel (zorunlu): 4 hata raporu yazılır; her birinde başlık, adımlar, beklenen, gerçekleşen, ortam ve kanıt bulunur.",
      "İşlevsel (zorunlu): Her raporda önem ve öncelik ayrı yazılır, gerekçesiyle.",
      "İşlevsel (zorunlu): Raporlar bir Trello panosunda kart olarak tutulur.",
      "İşlevsel (isteğe bağlı): Bir raporu video kaydıyla desteklersin.",
      "İşlevsel (isteğe bağlı): Kendi rapor şablonunu Google Sheets'e de kaydedersin.",
      "İşlevsel olmayan: Her rapor en çok 12 adımla ve tek hata kapsayacak şekilde kısa tutulur.",
      "İşlevsel olmayan: Hedef yalnız herkese açık demo sitelerdir; gerçek kişi verisi kullanılmaz.",
      "İşlevsel (zorunlu): 4 raporun bağlantısı, önem-öncelik özeti ve ek keşif turundan 1 ek bulgu tek bir portföy sayfasında toplanır."
    ],
    kabul: [
      "K1: 4 raporun her birinde 6 zorunlu alan dolu | Test: Şablonu rapor rapor işaretle, boş alan 0 olmalı.",
      "K2: En az 2 rapor İngilizce yazılmış | Test: Raporları sayıp dilini not et.",
      "K3: Bir arkadaşın (veya 24 saat sonraki sen) en az 2 raporu yalnız okuyarak hatayı yeniden üretti | Test: Takılma notunda 'üretildi' yazmalı, kanıt notuna ekle.",
      "K4: Önem ve önceliği farklı olan en az 1 hata var ve gerekçesi yazılı | Test: Tablodaki satırı göster.",
      "K5: Her raporda en az 1 kanıt dosyası ekli (ekran, kayıt veya konsol notu) | Test: Trello kartlarını aç, ek sayısını say.",
      "K6: Portföy sayfasında 4 rapor bağlantısı, önem-öncelik özeti ve şablonla yazılmış 1 ek bulgu var | Test: Sayfayı aç, bağlantıları tıkla ve ek bulgunun 6 alanını işaretle."
    ],
    rubrik: [
      { olcut: "Tekrar üretilebilirlik", guclu: "Adımlar en kısa yoldur ve başkası ilk denemede hatayı görür.", zayif: "Adımlar eksik veya belirsiz, okuyan hatayı göremez." },
      { olcut: "Başlık ve özet", guclu: "Başlık tek cümlede nerede ve ne olduğunu söyler.", zayif: "Başlık 'çalışmıyor' gibi genel." },
      { olcut: "Kanıt kalitesi", guclu: "Ekran, kayıt ve konsol notu hatayı doğrudan gösterir.", zayif: "Kanıt yok veya hatayı göstermiyor." },
      { olcut: "Önem-öncelik ayrımı", guclu: "İkisi ayrı gerekçelerle yazılmış, fark örneklenmiş.", zayif: "İkisi aynı şey sanılmış." },
      { olcut: "Düzeltme döngüsü", guclu: "Akran takılma noktası raporu somut biçimde iyileştirmiş.", zayif: "Geri bildirim alınmamış veya rapor değişmemiş." }
    ],
    savunma: [
      "Bir hatanın en kısa adım listesinden hangi adımı çıkarınca hata kayboldu ve bu sana ne anlattı?",
      "Önemi yüksek ama önceliği düşük bir hata nasıl olabilir? Kendi tablonla örnekle.",
      "Raporu İngilizce yazarken hangi terimi Türkçe düşünüp çevirdin ve neden riskli buldun?",
      "Bu raporu bir otomatik test olarak yazsaydın hangi alan kaybolurdu?"
    ],
    yetkinlikler: [
      { ad: "Hata raporu yazımı", kanit: "Adım 5'teki 4 raporlu Trello panosu." },
      { ad: "Hata tekrar üretme", kanit: "Adım 2'deki 4 hata için en kısa adım listeleri." },
      { ad: "Kanıt toplama", kanit: "Adım 3'teki 4 hatanın görüntü, kayıt ve konsol notları." },
      { ad: "Önceliklendirme", kanit: "Adım 4'teki önem-öncelik tablosu." },
      { ad: "Portföy sunumu", kanit: "Adım 7'deki tek portföy sayfası." }
    ],
    telafi: "K1 tutmazsa adım 5'e dön ve şablonu yeniden doldur (şablon adım 5'te yazılır); K2 tutmazsa adım 5'e dönüp en az 2 raporu İngilizce yeniden yaz; K3 tutmazsa adım 2'deki adımları sadeleştirip adım 6'daki incelemeyi tekrar yap; K4 tutmazsa adım 4'teki tabloya önemi ile önceliği farklı bir hata ve gerekçesini ekle; K5 tutmazsa adım 3'e dönüp 4 hatanın eksik kanıtlarını topla; K6 tutmazsa adım 7'de portföy sayfasını tamamla.",
    sonraki: "K1-K6'nın hepsi tutarsa (K2 ve K4 dahil) ve ilk iki savunma sorusunu kendi raporlarınla cevaplarsan qa1c (keşif testi oturumu) ve qa2 için hazırsın; tamamlama kanıt kaydı olarak panon, portföy sayfan ve notların kaydedilir."
  });

  K.yeni.push({
    yol: "qa", id: "qa1c", lv: 1,
    title: "Keşif Testi Oturumu: Charter, Zaman Kutusu ve Debrief",
    weeks: 2,
    tools: "Tarayıcı, Google Docs veya not defteri, kronometre, demo test siteleri",
    why: "Senaryo yazmaya vakit yokken veya yeni bir ürünü tanırken keşif testi en hızlı bilgi kaynağıdır. Gelişigüzel gezinmeyi, hedefi ve süresi olan bir oturuma çevirirsin.",
    outcome: ["Hedefli bir test görev tanımı (charter) yazarsın", "Zaman kutulu iki keşif oturumu yapıp not tutarsın", "Oturum sonu özetiyle (debrief) bulgularını sunarsın"],
    pitch: "I ran time-boxed exploratory testing sessions with written charters, notes and a short debrief on public demo sites.",
    steps: [
      ["Keşif testi nedir?", "Senaryosuz ama düşünmeden değil: aynı anda öğren, tasarla ve çalıştır. Analoji: haritasız ama pusulalı yürüyüş. Pusula, aklındaki hedeftir.", "Keşif testi ile senaryolu testin farkını iki sütunlu tabloya yaz. Hangi durumda hangisini seçeceğini 3 örnekle belirt.", "Karşılaştırma tablosu ve 3 örnek", "exploratory testing = keşif testi, scripted testing = senaryolu test, test idea = test fikri", "exploratory testing vs scripted testing explained simply"],
      ["Charter yaz", "Charter oturumun kısa görev cümlesidir: 'Şunu keşfet, şunu kullanarak, şunu bulmak için'. Çok genel olursa dağılırsın, çok dar olursa keşfedecek yer kalmaz.", "Sauce Demo sitesi için 3 charter yaz. Örnek biçim: 'Sepet davranışını farklı ürün sayılarıyla keşfet, tutarsızlık bulmak için'. Birini en dar, birini en geniş say ve nedenini yaz.", "3 charter ve değerlendirme notu", "charter = görev tanımı, mission = amaç, scope = kapsam, heuristic = sezgisel kural", "exploratory testing charter examples session based"],
      ["Oturumu çalıştır ve not tut", "Oturum 45 dakika gibi kutulanmış zamandır. Not üç kısma ayrılır: bulgu, soru, fikir. Analoji: dedektif defteri; her şeyi yazmak yerine işe yarayanları işaretlersin.", "Birinci charter ile 45 dakikalık oturum yap. Notları 'Bulgu / Soru / Test fikri' olarak üç sütunda tut. Başlangıç ve bitiş saatini yaz; kronometreyle süreyi ve gerçek test süresini ayır.", "45 dakikalık oturum notu", "session = oturum, time-box = süre kutusu, note = not, bug = hata", "session based test management notes template"],
      ["Sezgisel kurallar: hatayı nerede ararsın", "Boş, çok uzun, özel karakter, geri tuşu, iki sekme: bunlar sezgisel kurallardır. Analoji: hırsız gibi kapı ve pencereleri tek tek yoklamak.", "Şu 10 sezgisel kuralı bir tabloya yaz (kural, örnek girdi, beklenen sonuç): 1) boş girdi, 2) çok uzun girdi, 3) özel karakter (< > ' & ve tırnak), 4) baştaki veya sondaki boşluk, 5) negatif sayı veya sıfır, 6) sınır değer (en küçük/en büyük), 7) geri tuşu, 8) form doluyken sayfayı yenileme (F5), 9) aynı sayfayı iki sekmede açma, 10) çift tıklama veya hızlı tekrar gönderme. Sonuç sütununu adım 5'te dolduracaksın.", "10 kuralın listesi ve örnek girdileri", "heuristic = sezgisel kural, edge case = uç durum, input = girdi, special characters = özel karakterler", "software testing heuristics cheat sheet"],
      ["İkinci oturum: kuralları sayfada uygula","İkinci oturum ilkinin tekrarı değildir: farklı bir charter ve elindeki 10 kural onu yönlendirir. Aynı süre kutusu ve aynı not düzeni iki oturumu karşılaştırılabilir kılar. Analoji: aynı bölgeye ikinci keşif, bu kez elinde kontrol listesiyle.","Hesap gerektirmeyen bir form sayfası seç (The Internet demo sitesinde örn. 'Inputs' sayfası; sayfanın sitede bulunduğunu kendi sürümünde doğrula). Giriş (login) formlarını seçme ve hiçbir yere gerçek hesap bilgisi yazma. 2. charter ile 45 dakikalık ikinci oturumu yap: başlangıç ve bitiş saatini yaz, notları Bulgu / Soru / Test fikri sütunlarında tut ve adım 4'teki 10 kuralın sonuç sütununu doldur.","45 dakikalık 2. oturum notu ve 10 kuralın sonuç tablosu","second session = ikinci oturum, start time = başlangıç saati, end time = bitiş saati, result = sonuç","session based test management second session notes"],
      ["Debrief: oturumu anlat", "Debrief oturum sonunda 10 dakikalık özettir: ne denedim, ne buldum, neyi test edemedim, sıradaki adım ne. Karar verici tüm notlarını okumaz, özetini okur.", "İki oturumun özetini 1 sayfada yaz: bulgular, açık sorular, kapsam dışı kalan yerler, risk. Sesli 3 dakika anlat. 'Test results show...' ile başlayan bir İngilizce cümle ekle.", "1 sayfalık debrief ve provası", "debrief = oturum sonu özeti, coverage = kapsam, open question = açık soru, risk = risk", "exploratory testing debrief report example"],
      ["Bulguyu hata raporuna çevir","Keşif notundaki bulgu hâlâ ham: 'garip görünüyor' düzeyinde. Karar verici hata raporu ister: başlık, adımlar, beklenen, gerçekleşen, ortam, kanıt. Notlarda bilgi çoğu zaman vardır, eksik olan hatayı yeniden üretmektir.","İki oturumun bulgularından en önemlisini seç ve hata raporuna çevir: başlık, adımlar, beklenen, gerçekleşen, ortam ve kanıt (ekran görüntüsü veya konsol notu) alanlarını doldur. Hatayı baştan 3 kez tekrar üretip adımları kısalt.","6 alanlı 1 hata raporu","finding = bulgu, bug report = hata raporu, reproduce = tekrar üretmek, evidence = kanıt","exploratory testing finding to bug report"]
    ],
    onkosul: ["Önkoşul yok: bir web sitesini tarayıcıda kullanmayı bilmen yeterli.", "İsteğe bağlı: qa1 (Manuel Test: İlk Test Planım) projesindeki test senaryosu kavramı karşılaştırma için yardımcı olur.", "Not tutma alışkanlığı yeterli; ek araç bilgisi gerekmez."],
    gereksinim: [
      "İşlevsel (zorunlu): 3 charter yazılır; her biri hedef, yöntem ve beklenen bilgiden oluşur.",
      "İşlevsel (zorunlu): 2 oturum yapılır; her biri 45 dakika zaman kutulu, başlangıç ve bitiş saati yazılı ve en az 30 dakikalık gerçek test süresi içerir.",
      "İşlevsel (zorunlu): Oturum notları bulgu, soru ve test fikri olarak ayrılır.",
      "İşlevsel (zorunlu): 1 sayfalık debrief yazılır.",
      "İşlevsel (zorunlu): En az 1 bulgu 6 alanlı bir hata raporuna çevrilir.",
      "İşlevsel (isteğe bağlı): Üçüncü charter ile kısa bir üçüncü oturum yaparsın.",
      "İşlevsel olmayan: Süre kutusu kronometreyle ölçülür ve dosyada belirtilir.",
      "İşlevsel olmayan: Yalnız herkese açık demo siteleri kullanılır; hesap bilgisi girilmez, bu yüzden giriş (login) formları seçilmez."
    ],
    kabul: [
      "K1: 3 charter 'neyi, nasıl, hangi amaçla' içeriyor | Test: Her charter'da üç parçayı renkli kalemle işaretle.",
      "K2: İki oturumun gerçek test süresi en az 30 dakika ve kayıtlı | Test: Not başına başlangıç-bitiş saati yazılı olmalı.",
      "K3: İki oturumun notlarında toplam en az 5 bulgu, 3 soru, 3 test fikri var | Test: Üç sütunu iki oturum için say.",
      "K4: 10 sezgisel kuralın her biri için sonuç yazılı | Test: Adım 4'teki 10 kural listesiyle adım 5'teki sonuç tablosunu eşleştir; boş satır olmamalı.",
      "K5: Debrief hem 'test edemediklerim'i hem riski içeriyor | Test: Bu iki başlığın altını oku, dolu olmalı.",
      "K6: En az 1 bulgu 6 alanlı hata raporuna çevrilmiş ve rapor yalnız okunarak hata yeniden üretilebiliyor | Test: Raporun adımlarını sırayla uygula; hata görülmeli."
    ],
    rubrik: [
      { olcut: "Charter netliği", guclu: "Charter oturumu yönlendirecek kadar dar, yeni bilgi çıkaracak kadar açık.", zayif: "Charter 'siteyi test et' gibi genel veya tek bir adıma kilitli." },
      { olcut: "Not kalitesi", guclu: "Bulgu, soru ve fikir ayrımı net; başkası notlardan oturumu izleyebilir.", zayif: "Notlar karışık ve yalnız sen anlıyorsun." },
      { olcut: "Sezgisel kural kullanımı", guclu: "10 kural gerekçeyle denenmiş, sonuçları kayıtlı.", zayif: "Kurallar rastgele denenmiş, sonuç yazılmamış." },
      { olcut: "Debrief", guclu: "Kapsam dışı ve risk açıkça söylenmiş, öneri var.", zayif: "Sadece bulunan hatalar listelenmiş." },
      { olcut: "Süre disiplini", guclu: "Süre kutusu ve gerçek test süresi ayrı ölçülmüş.", zayif: "Süre kaydı yok." }
    ],
    savunma: [
      "Bu oturumda 'neden önce bu sayfaya baktın' sorusuna charter'ın hangi cümlesiyle cevap verirsin?",
      "Keşif testi ile senaryolu test aynı hatayı bulsaydı hangisinin kanıtı daha güçlü olurdu?",
      "Kapsam dışı bıraktığın bir yer için karar vericiye ne söylersin?",
      "Süre kutusu olmasaydı oturum nasıl değişirdi?"
    ],
    yetkinlikler: [
      { ad: "Test görevi tanımlama", kanit: "Adım 2'deki 3 charter ve değerlendirme notu." },
      { ad: "Gözlem ve not tutma", kanit: "Adım 3'teki ve adım 5'teki 45 dakikalık oturum notları." },
      { ad: "Sezgisel test tasarımı", kanit: "Adım 4'teki 10 kural listesi ve adım 5'teki sonuç tablosu." },
      { ad: "Test sonucu sunumu", kanit: "Adım 6'daki 1 sayfalık debrief ve sesli prova." },
      { ad: "Bulguyu hata raporuna dönüştürme", kanit: "Adım 7'deki 6 alanlı hata raporu." }
    ],
    telafi: "K1 tutmazsa adım 2'ye dönüp charter'ları yeniden yaz; K2 veya K3 tutmazsa adım 3 ve adım 5'teki oturumlardan eksik olanı yeni bir 45 dakikalık oturumla tekrar et (saatleri yaz); K4 tutmazsa adım 4'teki kural listesini ve adım 5'teki sonuç tablosunu eksiksiz doldur; K5 tutmazsa adım 6'da debrief'e risk ve kapsam dışı bölümlerini ekle; K6 tutmazsa adım 7'de hatayı yeniden üretip raporu baştan yaz.",
    sonraki: "K1-K6'nın hepsi tutarsa ve ilk iki savunma sorusunu notlarınla cevaplarsan qa1d ve qa2'ye geçiş için kilit açılır; tamamlama kanıt kaydı olarak charter'lar, iki oturum notu, debrief ve hata raporu saklanır."
  });

  K.yeni.push({
    yol: "qa", id: "qa1d", lv: 1,
    title: "Test Verisi ve Kontrol Listesi: Küçük Bir Formu Sınamak",
    weeks: 2,
    tools: "Tarayıcı, Google Sheets, kendi yerel HTML form dosyası, DevTools",
    why: "Çoğu hata yanlış veya eksik test verisinden kaçar: boş alan, uzun metin, özel karakter. Küçük bir formu sistemli bir test verisi tablosu ve yeniden kullanılabilir kontrol listesi ile sınarsın.",
    outcome: ["Girdi alanları için sentetik test verisi tablosu hazırlarsın", "Form için yeniden kullanılabilir kontrol listesi yazarsın", "Listeyi iki farklı forma uygulayıp sonuçları karşılaştırırsın"],
    pitch: "I built a synthetic test data table and a reusable checklist and applied them to two different web forms.",
    steps: [
      ["Kontrol listesi mi senaryo mu?", "Senaryo tarif gibi uzun, kontrol listesi pilotun kalkış öncesi kontrol listesi gibi kısa ve tekrar kullanılabilir. Alışkanlık gerektiren işlerde liste, hafızadan daha güvenilirdir.", "Aynı form için hem 2 senaryo hem 10 maddelik kontrol listesi yaz. Hangisini yazmak daha kısa sürdü, hangisi daha çok alanı kapsadı, not et.", "2 senaryo, 10 maddelik liste ve karşılaştırma notu", "checklist = kontrol listesi, test case = test senaryosu, reusable = yeniden kullanılabilir", "checklist based testing vs test cases"],
      ["Kendi test formunu hazırla", "Test için kontrol edebileceğin bir hedef şart. Kendi bilgisayarında çalışan 5 alanlı bir HTML formu (ad, e-posta, yaş, telefon, mesaj) gerçek veri göndermeden uygulama gibi davranır.", "Kendi bilgisayarında form.html adlı bir dosya oluştur ve şu şablonu yapıştır: <form onsubmit='return gonder()'> Ad <input name=ad required maxlength=30> E-posta <input name=eposta type=text required> Yaş <input name=yas type=number min=18 max=99 required> Telefon <input name=tel type=tel maxlength=15> Mesaj <textarea name=mesaj required></textarea> <button>Gönder</button> </form><p id=s></p><script>function gonder(){s.textContent='Gönderildi (yerel)';return false}</script> Şablonda 2 bilerek bırakılmış doğrulama eksiği var; hangileri olduğunu şimdi araştırma, adım 4'te veri tablosundaki farktan çıkar. Dosyayı tarayıcıda aç, DevTools'un (F12) Network sekmesi açıkken formu doldurup Gönder'e bas ve dış bir istek çıkmadığını doğrula.", "Çalışan form.html ve Network sekmesinde istek çıkmadığının notu", "form = form, input field = girdi alanı, validation = doğrulama, required = zorunlu", "simple html form required maxlength example"],
      ["Sentetik test verisi tablosu", "Gerçek kişi verisi kullanma. Uydurma ama gerçekçi veri üret: geçerli, geçersiz, sınır, boş, çok uzun, özel karakter. Analoji: kalıp yemeği için farklı boyda tavalar hazırlamak.", "Her alan için en az 6 veri satırı hazırla (geçerli, boş, sınır, çok uzun, özel karakter, boşluk). Sheets'te alan, değer, sınıf, beklenen sonuç sütunları kullan. Toplam en az 30 satır.", "30+ satırlı test verisi tablosu", "test data = test verisi, synthetic data = sentetik veri, boundary = sınır, invalid = geçersiz", "test data design form fields valid invalid boundary"],
      ["Tabloyu çalıştır ve sonucu yaz", "Beklenen ve gerçekleşen yan yana durunca fark kolay görülür. Geçti/Kaldı yanında 'Yorum' sütunu hatayı tarif eder.", "30 veri satırını form.html üzerinde dene, 'Gerçekleşen' ve 'Sonuç' sütunlarını doldur. Kaldı (fail) satırlarından en az 2 gerçek davranış farkını hata olarak yaz; formdaki 2 bilerek eksik burada ortaya çıkar (örn. çok uzun mesaj kabul edildi, biçimi bozuk e-posta kabul edildi). Gerekirse DevTools Console'a bakıp mesaj ekle.", "Sonuçları dolu tablo ve 2 hata notu (mesaj uzunluğu, e-posta biçimi)", "actual = gerçekleşen, pass = geçti, fail = kaldı, defect = kusur", "manual test execution log spreadsheet"],
      ["Listeyi genelleştir ve ikinci forma uygula", "İyi liste hedefe özel değil, tür için yazılmıştır. Başka bir forma uygulayınca neresinin genel, neresinin özel olduğunu görürsün.", "Kontrol listeni 12 maddeye genelleştir. The Internet demo sitesindeki bir form sayfasında (örn. login) uygula. Hangi maddelerin uymadığını ve nedenini yaz.", "12 maddelik liste ve ikinci form sonucu", "generic = genel, applicable = uygulanabilir, coverage = kapsam, reuse = yeniden kullanım", "web form testing checklist"],
      ["Eşdeğer sınıflar: az satırla çok kapsam","30 satırın çoğu aynı şeyi sınıyor olabilir. Eşdeğer sınıf, formun aynı davranışı verdiği girdi grubudur; gruptan bir temsilci yeterlidir. Analoji: sınıf yoklamasında her öğrenciyi değil her sırayı kontrol etmek.","Yaş (18-99), ad (en çok 30 karakter) ve telefon alanları için eşdeğer sınıfları çiz: geçerli, sınırın altı, sınırın üstü, boş, yanlış tür. Her sınıfa 1 temsilci değer seç. 30 satırlık tablonun hangi satırlarının aynı sınıfı tekrarladığını işaretle ve sayısını yaz.","Alan başına sınıf tablosu ve işaretli tekrar satırları","equivalence class = eşdeğer sınıf, representative = temsilci değer, partition = bölme, redundant = gereksiz tekrar","equivalence partitioning boundary value analysis simple example"],
      ["Sınır değerler ve yeniden test","Hatalar sınırda yaşar: 17, 18, 99, 100. Sınır değer, sınıfın tam kıyısındaki ve hemen dışındaki girdidir. Düzeltmeden sonra yalnız ilgili satırları yeniden koşmak (yeniden test) kanıtın en ucuz halidir.","Yaş için 17, 18, 99, 100; ad için 29, 30, 31 karakter değerlerini forma gir ve sonuçları yaz (31. karakter yazılamıyorsa 'sınırlandı' diye not et). Sonra form.html'de 2 bilerek eksiği düzelt (mesaj alanına maxlength ekle, e-posta alanını type=email yap) ve yalnız bu hatalarla ilgili satırları yeniden çalıştır; Kaldı olanın Geçti'ye döndüğünü göster.","Sınır değer tablosu ve önce-sonra yeniden test notu","boundary value = sınır değer, retest = yeniden test, fix = düzeltme, regression = gerileme","boundary value analysis form field examples retest"]
    ],
    onkosul: ["Önkoşul yok: tarayıcı kullanmayı ve bir metin düzenleyici ile dosya kaydetmeyi bilmen yeterli.", "İsteğe bağlı: qa1 (Manuel Test: İlk Test Planım) projesindeki sınır değer ve eşdeğer sınıf adımı bu projeyi hızlandırır.", "Form şablonu adım 2'de verilir; kopyalayıp dosyaya yapıştırman yeter, HTML yazman gerekmez."],
    gereksinim: [
      "İşlevsel (zorunlu): Kendi bilgisayarında çalışan 5 alanlı bir form kurulur (şablon adım 2'de verilir; içinde 2 bilerek doğrulama eksiği vardır).",
      "İşlevsel (zorunlu): Test verisi tablosunda en az 30 sentetik satır bulunur; hiçbiri gerçek kişiye ait değildir.",
      "İşlevsel (zorunlu): Tablo çalıştırılır; beklenen, gerçekleşen ve sonuç sütunları doldurulur.",
      "İşlevsel (zorunlu): En az 12 maddelik genel kontrol listesi yazılır ve iki ayrı forma (kendi formun ve The Internet demo sitesinden bir form) uygulanır.",
      "İşlevsel (zorunlu): Alanlar için eşdeğer sınıf ve sınır değer tablosu hazırlanır; sınır değerler çalıştırılır.",
      "İşlevsel (zorunlu): Formdaki 2 bilerek eksik düzeltilir ve ilgili satırlar yeniden test edilir.",
      "İşlevsel (isteğe bağlı): Veri tablosunu CSV olarak dışa aktarırsın.",
      "İşlevsel olmayan: Her tablo satırı tek bir koşulu sınar.",
      "İşlevsel olmayan: Hiçbir gerçek kişi verisi, e-posta veya telefon kullanılmaz."
    ],
    kabul: [
      "K1: Veri tablosunda 5 alanın her biri için en az 6 sınıf var | Test: Alanları süz ve sınıf sayısını say.",
      "K2: 30+ satırın hepsinde 'Gerçekleşen' ve 'Sonuç' dolu | Test: Sütunda boş hücre sayısı 0 olmalı.",
      "K3: Formdaki 2 bilerek eksik (mesaj alanında uzunluk sınırı yok, e-posta alanı biçimi denetlemiyor) test tablosundan bulunmuş ve hata olarak yazılmış | Test: Kaldı satırlarını aç, mesaj ve e-posta bulgusunu göster.",
      "K4: Kontrol listesi en az 12 madde, iki ayrı forma uygulanmış ve uymayan maddeler gerekçeli | Test: Maddeleri say, iki sonuç kolonunu karşılaştır.",
      "K5: Veri tablosunda gerçek kişi bilgisi yok | Test: E-posta ve telefon alanlarını gözle tara, hepsi uydurma görünmeli.",
      "K6: Yaş, ad ve telefon için eşdeğer sınıflar ve temsilci değerler yazılı; 30 satırdan tekrar edenler işaretli | Test: Sınıf tablosunu aç, her alanda en az 4 sınıf ve işaretli satır sayısını bul.",
      "K7: Sınır değerler (yaş 17/18/99/100, ad 29/30/31) çalıştırılmış ve 2 hata düzeltilip yeniden test edilmiş | Test: Yeniden test notunda Kaldı olan satırların Geçti olduğunu göster."
    ],
    rubrik: [
      { olcut: "Veri çeşitliliği", guclu: "Her alan için geçerli, geçersiz, sınır, boş ve özel karakter sınıfları var.", zayif: "Yalnız 'normal' veriler denenmiş." },
      { olcut: "Beklenen sonuç", guclu: "Her satırda beklenen önceden yazılmış.", zayif: "Beklenen, sonuç görülünce yazılmış." },
      { olcut: "Liste genelliği", guclu: "Liste iki farklı forma uygulanabilir, ayrılığı açıklanmış.", zayif: "Liste yalnız ilk forma özel." },
      { olcut: "Bulgu açıklaması", guclu: "Kalan satırlar hataya ve olası nedene bağlanmış.", zayif: "Kalan satır sayısı yazılmış, açıklama yok." },
      { olcut: "Veri etiği", guclu: "Tüm veri sentetik ve bu açıkça belirtilmiş.", zayif: "Gerçek kişiye benzeyen veri kullanılmış." }
    ],
    savunma: [
      "Neden beklenen sonucu çalıştırmadan önce yazdın; sonradan yazsaydın ne olurdu?",
      "Bir alan için neden 6 sınıf seçtin, hangisini çıkarsan hangi hata kaçardı?",
      "Kontrol listesi neden her forma birebir uymadı ve bunu nasıl yönetirsin?",
      "Sentetik veri ile gerçek veri arasında bu testte hangi fark kayboldu?"
    ],
    yetkinlikler: [
      { ad: "Test verisi tasarımı", kanit: "Adım 3'teki 30+ satırlı sentetik veri tablosu." },
      { ad: "Test çalıştırma ve kayıt", kanit: "Adım 4'teki sonuçları dolu tablo ve 2 bulgu." },
      { ad: "Kontrol listesi hazırlama", kanit: "Adım 5'teki 12 maddelik liste ve iki form sonucu." },
      { ad: "Veri etiği bilinci", kanit: "Adım 3 ve K5 kapsamındaki sentetik veri notu." },
      { ad: "Eşdeğer sınıf ve sınır değer analizi", kanit: "Adım 6'daki sınıf tablosu ve adım 7'deki sınır değer sonuçları." }
    ],
    telafi: "K1 tutmazsa adım 3'e dönüp eksik sınıfları ekle; K2 veya K3 tutmazsa adım 4'te tabloyu yeniden çalıştır (formda 2 bilerek eksiğin durduğunu kontrol et); K4 tutmazsa adım 5'te listeyi 12 maddeye tamamla ve iki forma yeniden uygula, uymayanları gerekçelendir; K5 tutmazsa adım 3'e dönüp gerçek kişiye benzeyen verileri uydurmayla değiştir; K6 tutmazsa adım 6'da sınıf tablosunu tamamla; K7 tutmazsa adım 7'de sınır değerleri çalıştırıp düzeltmeyi yeniden test et.",
    sonraki: "K1-K7'nin hepsi tutarsa ve ilk iki savunma sorusunu cevaplarsan qa2 (Playwright E2E) ve qa2b projeleri için kilit açılır; tamamlama kanıt kaydı olarak tablo, liste ve yeniden test notu saklanır."
  });

  /* ===================== LV2 ===================== */

  K.yeni.push({
    yol: "qa", id: "qa2b", lv: 2,
    title: "API Test Koleksiyonu: Postman ve Newman ile",
    weeks: 3,
    tools: "Postman, Newman, JSONPlaceholder, Restful-Booker (yedek: DummyJSON), JSON, CSV",
    why: "Arayüz çalışsa da servis yanlış cevap verebilir; API testi arayüzden daha hızlı ve kesindir. Postman ile koleksiyon yazıp Newman ile komut satırından koşturarak iki aracı birleştirirsin.",
    outcome: ["Ortam değişkenli bir API test koleksiyonu yazarsın", "Cevaplar için otomatik doğrulama betikleri kurarsın", "Koleksiyonu komut satırından çalıştırıp rapor üretirsin"],
    pitch: "I built a Postman collection with variables and assertions and ran it from the command line with Newman.",
    steps: [
      ["API, istek ve cevap", "API bir restoran garsonudur: sen siparişi söylersin (istek), mutfak cevap verir. Önemli parçalar yöntem, adres, başlık ve gövdedir. Cevapta durum kodu ve gövde olur.", "JSONPlaceholder (sahte, herkese açık API) ile 6 isteği Postman'da elle dene: GET, POST, PUT, PATCH, DELETE ve geçersiz adres. Her cevapta durum kodunu ve bir alanı not et.", "6 isteğin sonuç tablosu", "request = istek, endpoint = uç nokta, method = yöntem, header = başlık, status code = durum kodu", "postman beginner rest api request methods"],
      ["Koleksiyon ve ortam değişkeni", "Her isteğe tam adres yazarsan taşıma zor olur. Değişken ({{base_url}}) adresi ortamdan çeker: aynı koleksiyon yerelde de, demoda da çalışır. Analoji: fatura adresini her yerde tek tek yazmak yerine kayıt ekranı.", "Koleksiyon oluştur, klasörlere ayır (okuma, yazma, hata). base_url ve bir değişken daha tanımla. 10 isteği değişkenle çalışır hale getir.", "10 istekli koleksiyon ve ortam", "collection = koleksiyon, environment = ortam, variable = değişken, folder = klasör", "postman collection environment variables tutorial"],
      ["Doğrulama betikleri yaz", "Gözle bakmak ölçeklenmez. Postman'da doğrulama betikleri istek ekranındaki betik sekmesine yazılır (yeni sürümlerde 'Scripts > Post-response', eski sürümlerde 'Tests'; adı kendi sürümünde doğrula); JavaScript ile durum kodu, süre ve JSON alanı kontrolü yazarsın. Analoji: kontrol memuru elle bakmak yerine makineye sabit kural verirsin.", "Her istek için en az 2 doğrulama yaz: durum kodu ve bir JSON alanı. Toplam en az 20 doğrulama. Bilerek bir beklenen değeri yanlış yaz ve kırmızı olduğunu gör.", "20+ doğrulamalı koleksiyon", "assertion = doğrulama, test script = test betiği, JSON path = JSON yolu, response time = cevap süresi", "postman tests pm.test status code json assertions"],
      ["Zincirleme ve olumsuz test", "Gerçek akışlarda bir cevaptan değer alıp sonrakinde kullanırsın: önce oluştur, sonra o id ile oku. Olumsuz testler (yanlış veri, olmayan id, yetkisiz istek) hatayı doğru verdiğini sınar. Güncelleme ve silme çoğu API'de yetki ister: Restful-Booker'da önce POST /auth ile token alınır.", "Restful-Booker test API'sinde önce POST /auth ile token al (kimlik bilgisini sitenin belgesindeki herkese açık demo bilgisinden al, ortam değişkeninde tut, koleksiyon dosyasına yazma) ve token'ı değişkene kaydet; PUT ve DELETE isteklerinde token'ı belgedeki biçimde (Cookie başlığı) gönder. Sonra oluştur → oku → güncelle → sil akışını değişkenle zincirle. 5 olumsuz istek ekle (olmayan id, eksik alan, yetkisiz silme). Her olumsuz isteği önce elle gönderip gerçek durum kodunu gözle (bazı hatalı isteklerde 4xx yerine 500 dönebilir; kendi sürümünde doğrula) ve doğrulamayı gözlediğin koda göre yaz. Restful-Booker'a (restful-booker.herokuapp.com) erişilemezse yedek olarak DummyJSON (dummyjson.com) kullan; erişimi ve uç noktaları kendi sürümünde doğrula.", "Zincirli akış, token isteği ve 5 olumsuz test (gözlenen kodlarla)", "chaining = zincirleme, negative test = olumsuz test, authorization = yetkilendirme, 4xx = istemci hatası", "postman chain requests environment variable negative testing"],
      ["Newman ile komut satırından çalıştır", "Newman Postman'ın komut satırı kardeşidir. Aynı koleksiyonu terminalden çalıştırıp rapor çıkarırsın; ileride CI'a koymak kolaylaşır.", "Koleksiyonu ve ortamı JSON olarak dışa aktar, Newman'ı kur (npm install -g newman) ve 'newman run koleksiyon.json -e ortam.json -r cli,json --reporter-json-export rapor.json' ile çalıştır: konsol özeti ve JSON raporu yerleşik gelir. HTML rapor için ayrı bir reporter (örn. newman-reporter-htmlextra) kurman gerekir; kurulum ve bayrakları kendi sürümünde doğrula. Bir testi bilerek kır; raporda hatanın görünüp görünmediğini kontrol et.", "Dışa aktarılan dosyalar ve rapor", "Newman = komut satırı koşucu, export = dışa aktar, report = rapor, CI = sürekli tümleştirme", "newman run collection environment html report"],
      ["Belgeleme ve sınırlar", "API testi her şeyi kapsamaz. Yetki modeli, performans, veri tutarlılığı ayrı konulardır. Kapsam notu 'neyi test etmedim' sorusunun cevabıdır.", "Koleksiyonun README'sini yaz: neyi test eder, nasıl çalıştırılır, nelerin dışında kalır. Sahte API'nin (JSONPlaceholder) yazdıklarını kaydetmediği sınırını da yaz ve hangi API'yi (Restful-Booker veya yedek) kullandığını belirt.", "README ve sınır listesi", "scope = kapsam, limitation = sınır, documentation = belgeleme, mock API = taklit API", "api test collection readme documentation"],
      ["CSV ile veri güdümlü iterasyon","Aynı isteği 5 farklı veriyle elle çalıştırmak yerine veriyi dosyaya koyarsın: Newman her satır için isteği bir kez çalıştırır (iterasyon). Analoji: tek tarifle 5 farklı porsiyon.","'id' ve 'beklenen_kod' sütunlu en az 5 satırlık bir CSV hazırla (JSONPlaceholder'da GET /posts/{{id}} için, geçerli ve olmayan id'lerle). Doğrulama betiğini beklenen kodu veri dosyasından okuyacak biçimde yaz (pm.iterationData.get('beklenen_kod')). Newman'ı '-d veri.csv' ile çalıştır ve özet tablosundaki iterasyon sayısının 5 olduğunu göster.","Veri CSV'si ve 5 iterasyonlu Newman çıktısı","iteration = iterasyon, data file = veri dosyası, data-driven = veri güdümlü, parameterize = parametreleştirmek","newman run data file csv iterations"]
    ],
    onkosul: ["qa1 (Manuel Test: İlk Test Planım) projesinden test senaryosu ve hata raporu mantığını bilmen gerekir.", "HTTP durum kodlarını ve JSON biçimini temel düzeyde okuyabilmen beklenir; adım 1'de pekiştirilir.", "Temel JavaScript (değişken, if) bilgisi doğrulama betikleri için gerekir; çok az gerekir, örnek çıkarılır."],
    gereksinim: [
      "İşlevsel (zorunlu): Koleksiyonda en az 15 istek 3 klasörde (okuma, yazma, hata) bulunur.",
      "İşlevsel (zorunlu): Tüm istekler ortam değişkeni kullanır; sabit adres yoktur.",
      "İşlevsel (zorunlu): En az 20 doğrulama betiği yazılır.",
      "İşlevsel (zorunlu): Newman ile koşturulup rapor üretilir.",
      "İşlevsel (zorunlu): En az 5 satırlık CSV ile veri güdümlü iterasyon çalıştırılır.",
      "İşlevsel (zorunlu): Güncelleme ve silme istekleri POST /auth ile alınan token'ı kullanır; token ortam değişkenindedir.",
      "İşlevsel (zorunlu): README ve sınır notu yazılır (neyi test eder, nasıl çalışır, neyi test etmez, sahte API sınırı).",
      "İşlevsel (isteğe bağlı): Newman'ı GitHub Actions'ta çalıştırırsın.",
      "İşlevsel olmayan: Koleksiyon tek komutla yeniden çalıştırılabilir.",
      "İşlevsel olmayan: Yalnız herkese açık test API'leri (JSONPlaceholder, Restful-Booker; yedek DummyJSON) kullanılır; gerçek hesap veya anahtar yazılmaz."
    ],
    kabul: [
      "K1: Koleksiyonda 15+ istek ve 3 klasör var | Test: Koleksiyonu dışa aktar, istekleri ve klasörleri say.",
      "K2: Tüm adresler değişkenli | Test: Koleksiyon JSON'unda adresi ara; sabit tam adres bulunmamalı.",
      "K3: 20+ doğrulama var ve bilerek kırdığın en az 1 test kırmızı olmuştu | Test: Kırmızı ekran görüntüsü ve düzeltme notu kanıt notunda.",
      "K4: Olumsuz testlerde (en az 5) beklenen kod 4xx veya API'nin belgelenmiş hata kodu; kodlar önce elle gözlenmiş ve doğrulama onlara göre yazılmış; PUT/DELETE istekleri token kullanıyor | Test: İstekleri çalıştır, gerçek kodu beklenenle karşılaştır; token isteğini göster.",
      "K5: Newman raporu üretildi ve geçen/kalan sayısı raporda görünüyor | Test: Rapor dosyasını aç, sayıları oku.",
      "K6: README neyi test ettiğini, nasıl çalıştırıldığını, neyi test etmediğini ve sahte API sınırını yazıyor | Test: README'yi aç; en az 3 'test edilmeyen' madde ve sahte API sınır cümlesini bul.",
      "K7: CSV ile en az 5 iterasyon çalışmış ve beklenen kod veri dosyasından okunuyor | Test: Newman özetinde iterasyon sayısını oku, CSV'deki bir kodu bozup bir iterasyonun kırmızı olduğunu göster."
    ],
    rubrik: [
      { olcut: "Koleksiyon yapısı", guclu: "Klasörler ve isimler mantıklı, değişkenle taşınabilir.", zayif: "İstekler dağınık, sabit adresler karışık." },
      { olcut: "Doğrulama derinliği", guclu: "Durum kodu, gövde alanı ve süre birlikte doğrulanmış.", zayif: "Yalnız 'durum 200' bakılmış." },
      { olcut: "Olumsuz test", guclu: "Hata cevapları kod ve gövde düzeyinde doğrulanmış.", zayif: "Yalnız olumlu istekler var." },
      { olcut: "Newman çalıştırması", guclu: "Rapor üretilmiş, kırık testin raporda göründüğü gösterilmiş.", zayif: "Newman çalıştırılmamış." },
      { olcut: "Sınır ve kapsam notu", guclu: "Neyin test edilmediği ve sahte API sınırı açık.", zayif: "Sınır yok." }
    ],
    savunma: [
      "Neden yalnız durum koduna güvenmedin; hangi hatayı bu şekilde kaçırırdın?",
      "Sahte bir API'ye karşı testin geçmesi gerçek servis hakkında ne söyler, ne söylemez?",
      "Zincirli akışta ilk istek başarısız olursa sonrakiler nasıl davranır ve bunu nasıl yönetirdin?",
      "Bu koleksiyonu pytest ile kodlasaydın neyi kazanır, neyi kaybederdin?"
    ],
    yetkinlikler: [
      { ad: "API istek tasarımı", kanit: "Adım 2'deki 10 istekli koleksiyon ve ortam." },
      { ad: "Otomatik doğrulama yazma", kanit: "Adım 3'teki 20+ doğrulamalı koleksiyon." },
      { ad: "Akış ve olumsuz test", kanit: "Adım 4'teki zincirli akış, token isteği ve 5 olumsuz test." },
      { ad: "Komut satırı otomasyonu", kanit: "Adım 5'teki Newman raporu." },
      { ad: "Veri güdümlü test", kanit: "Adım 7'deki CSV ve 5 iterasyonlu Newman çıktısı." },
      { ad: "Test belgeleme", kanit: "Adım 6'daki README ve sınır listesi." }
    ],
    telafi: "K1 veya K2 tutmazsa adım 2'ye dön ve adresleri değişkene taşı; K3 tutmazsa adım 3'te doğrulamaları yeniden yaz; K4 tutmazsa adım 4'te token isteğini ve olumsuz istekleri tamamla, gerçek kodları elle gözleyip doğrulamayı ona göre yaz; K5 tutmazsa adım 5'te dışa aktarımı ve Newman çalıştırmasını tekrar et; K6 tutmazsa adım 6'da README'ye kapsam ve sınır notunu ekle; K7 tutmazsa adım 7'de CSV'yi ve beklenen kod okumasını düzelt.",
    sonraki: "K1-K7'nin hepsi tutarsa ve ilk iki savunma sorusunu cevaplarsan qa3 (API, performans ve CI/CD) ve qa2d için kilit açılır; tamamlama kanıt kaydı olarak koleksiyon, CSV, rapor ve README saklanır."
  });

  K.yeni.push({
    yol: "qa", id: "qa2c", lv: 2,
    title: "Erişilebilirlik Testi: Klavye, Ekran Okuyucu ve Otomatik Tarama",
    weeks: 3,
    tools: "axe DevTools eklentisi, Lighthouse, NVDA veya VoiceOver, klavye",
    why: "Fare kullanamayan veya ekran okuyucu kullanan insanlar için bozuk bir sayfa onlar için hiç çalışmıyor demektir. Otomatik tarama ile elle klavye ve ekran okuyucu testini birleştirerek kendi kurduğun bir sayfayı sınarsın.",
    outcome: ["Klavye ile sayfayı baştan sona kullanılabilirlik açısından denetlersin", "axe ve Lighthouse ile otomatik tarama yapıp bulguları yorumlarsın", "Bulguları düzeltip önce-sonra karşılaştırırsın"],
    pitch: "I audited a small web page for accessibility using keyboard testing, a screen reader and automated scans, then fixed the findings.",
    steps: [
      ["Erişilebilirlik neden test işidir?", "Erişilebilirlik rampa gibidir: tekerlekli sandalye için yapılır ama bebek arabası ve bavul için de işe yarar. Test eden kişi 'çalışıyor' ile 'herkes için çalışıyor' farkını görür.", "4 farklı kullanıcı türü seç (klavye, ekran okuyucu, görme zorluğu, renk körlüğü). Her biri için bir web sayfasında olası 1 engel yaz.", "4 kullanıcı ve 4 engel notu", "accessibility = erişilebilirlik, assistive technology = yardımcı teknoloji, WCAG = erişilebilirlik yönergesi, barrier = engel", "web accessibility basics for testers"],
      ["Hedef sayfayı hazırla", "Test için bilerek bozuk bir sayfa lazım. Kendi bilgisayarında bir HTML sayfası: başlık, görsel, form, buton ve bir bağlantı. Hataları kendin eklersin: alt metinsiz görsel, etiketsiz alan, düşük kontrast.", "Kendi bilgisayarında test.html yaz. İçinde en az 5 bilerek erişilebilirlik hatası bulunsun. Başlangıç şablonu (gövde içeriği): <h1>Test Sayfası</h1> <img src='kedi.png'> <input type='text' placeholder='Ad'> <div onclick='alert(1)'>Gönder</div> <p style='color:#ccc;background:#fff'>Gri yazı</p> <h4>Alt başlık</h4> (alt metinsiz görsel, etiketsiz input, tıklanabilir div, düşük kontrast, başlık atlaması). Hataları gizli bir listeye yaz.", "test.html ve gizli hata listesi", "alt text = alternatif metin, label = etiket, contrast = kontrast, heading = başlık", "accessible html form label alt text example"],
      ["Klavye testi", "Fare yok: Tab ile ilerle, Shift+Tab ile geri dön, Enter/Space ile etkinleştir. Odak görünür mü, sıra mantıklı mı, takıldığın yer var mı? Analoji: gözü kapalı evde yürümek.", "Sayfayı yalnız klavyeyle kullan. Odak sırasını, odak göstergesini ve etkinleştirilemeyen öğeleri tablo olarak yaz. En az 3 sorun bulmuş ol.", "Klavye testi tablosu", "keyboard focus = klavye odağı, tab order = sekme sırası, focus indicator = odak göstergesi, keyboard trap = klavye tuzağı", "keyboard accessibility testing tab order focus"],
      ["Otomatik tarama ve elle test karşılaştırması", "Araçlar bazı hataları anında bulur ama her şeyi bulamaz: anlam ve sıra kararları insan ister. Lighthouse'un erişilebilirlik denetimi axe-core üzerine kuruludur; yani ikisi çoğunlukla aynı motorun çıktısıdır ve karşılaştırılacak asıl şey araç ile elle (klavye, ekran okuyucu) testtir.", "test.html üzerinde axe taramasını çalıştır, Lighthouse erişilebilirlik denetimini de çalıştırıp axe'in tekrarı olup olmadığını not et. Sonra otomatik sonuçları adım 3'teki klavye bulgularıyla ve gizli listenle karşılaştır; araçların bulamadığı hataları ve elle bulunanları yaz.", "Araç ve elle test karşılaştırma tablosu", "automated scan = otomatik tarama, violation = ihlal, false negative = kaçırılan hata, audit = denetim", "axe devtools lighthouse accessibility audit comparison"],
      ["Ekran okuyucu ile dinle", "Ekran okuyucu sayfayı sesle okur. Etiketsiz alan 'düzenleme kutusu' der ama ne istediğini söylemez. Analoji: kapıları numarasız dolaşan otel.", "NVDA (Windows) veya VoiceOver (Mac) ile sayfayı dinle. Başlık gezinmesini, form etiketlerini ve görsel okunuşunu dene. Okuyucunun yanlış veya eksik söylediği 3 yeri yaz; her biri için okuyucunun söylediği cümleyi aynen yaz.", "Ekran okuyucu dinleme notu", "screen reader = ekran okuyucu, landmark = sayfa bölgesi, announce = sesli okumak, aria-label = erişilebilir ad", "nvda screen reader basics testing a web page"],
      ["Düzelt ve önce-sonra karşılaştır", "Düzeltme testi tamamlar: hatanın gerçekten gittiğini kanıtlarsın. Önce-sonra tablo, savunma için en güçlü kanıttır.", "En az 5 hatayı düzelt. Klavye, axe ve ekran okuyucuyla yeniden test et. Önce/sonra tablosuna ihlal sayısı, klavye engeli ve okuyucu sorunu sütunları koy.", "Önce-sonra tablosu", "remediation = düzeltme, regression = geri dönüş, before/after = önce/sonra, report = rapor", "accessibility remediation before after report"],
      ["Bulguları etkiye göre sırala", "Her hata aynı ağırlıkta değildir: formu doldurmayı tamamen engelleyen hata ile küçük bir kontrast hatası aynı aciliyette değildir. Hastanede triyaj gibi, önce yaşamsal olanı ele alırsın.", "Klavye, araç ve ekran okuyucu bulgularını tek tabloda topla (en az 6 bulgu). Her biri için etkilenen kullanıcı grubu, etki (engelliyor / zorlaştırıyor / rahatsız ediyor) ve gerekçe yaz; etkiye göre sırala. Düzeltmediklerin için sıradaki ilk 2 hatayı seç.", "Etkiye göre sıralı bulgu tablosu", "severity = ciddiyet, impact = etki, prioritization = önceliklendirme, blocker = engelleyici hata", "accessibility issue severity prioritization blocker"]
    ],
    onkosul: ["qa1 (Manuel Test: İlk Test Planım) projesinden hata raporu ve test senaryosu yazma bilgisi.", "Temel HTML etiketlerini (başlık, form, img, button) tanımak gerekir; adım 2'de şablon verilir.", "Chrome DevTools'u açmayı bilmen beklenir."],
    gereksinim: [
      "İşlevsel (zorunlu): Kendi test sayfasında en az 5 bilinen erişilebilirlik hatası bulunur.",
      "İşlevsel (zorunlu): Klavye testi tablosu hazırlanır.",
      "İşlevsel (zorunlu): axe ve Lighthouse taraması elle testle (klavye, ekran okuyucu, gizli liste) karşılaştırılır.",
      "İşlevsel (zorunlu): Ekran okuyucu ile en az 3 sorun belgelenir.",
      "İşlevsel (zorunlu): En az 5 hata düzeltilip önce-sonra tablosu çıkarılır.",
      "İşlevsel (zorunlu): Bulgular etkiye göre sıralanır.",
      "İşlevsel (isteğe bağlı): Kontrast oranını bir araçla ölçersin.",
      "İşlevsel olmayan: Test yalnız kendi sayfanda ve herkese açık demo sayfalarda yapılır; kişisel veri girilmez."
    ],
    kabul: [
      "K1: Klavye tablosunda en az 3 sorun, odak sırası ve odak göstergesi bilgisi var | Test: Tabloyu kontrol et.",
      "K2: Otomatik taramanın (axe, Lighthouse) kaçırdığı ve elle bulunan en az 1 hata gizli listeyle karşılaştırılarak yazılmış; Lighthouse'un axe'in tekrarı olup olmadığı notlu | Test: Karşılaştırma satırını ve notu göster.",
      "K3: Ekran okuyucu notunda 3 sorun için okuyucunun söylediği cümle aynen alıntılı | Test: Notu oku, alıntıları say.",
      "K4: En az 5 hata düzeltildi ve her biri yeniden test edildi | Test: Önce-sonra tablosunda her satırda 'sonra' sütunu dolu olmalı.",
      "K5: Düzeltme sonrası axe ihlal sayısı öncekinden düşük | Test: İki taramanın ekran görüntüsünü yan yana koy.",
      "K6: En az 6 bulgu etkiye göre sıralı; her satırda kullanıcı grubu, etki ve gerekçe var | Test: Tabloda 6 satırı ve boş hücre olmadığını kontrol et."
    ],
    rubrik: [
      { olcut: "Klavye testi", guclu: "Odak sırası, görünürlük ve tuzaklar ayrı ayrı belgelenmiş.", zayif: "Yalnız 'klavyeyle çalışıyor' denmiş." },
      { olcut: "Araç yorumu", guclu: "Araçların bulduğu ve kaçırdığı hatalar karşılaştırılmış.", zayif: "Araç çıktısı olduğu gibi yapıştırılmış." },
      { olcut: "Ekran okuyucu gözlemi", guclu: "Okuyucunun gerçek cümlesi kaydedilmiş ve neden sorunlu olduğu açıklanmış.", zayif: "Genel 'okumuyor' denmiş." },
      { olcut: "Düzeltme ve doğrulama", guclu: "Her düzeltme üç yöntemle yeniden test edilmiş.", zayif: "Düzeltme yapılmış ama yeniden test yok." },
      { olcut: "Bulguların önceliği", guclu: "Hataların kullanıcıya etkisine göre sıralaması gerekçeli.", zayif: "Sıra yok." }
    ],
    savunma: [
      "Otomatik araç neden bu hatayı bulamadı ve bu sana araçların sınırı hakkında ne öğretti?",
      "Hangi düzeltme bir kullanıcı grubunu iyileştirirken başka birini kötüleştirebilir?",
      "Bu sayfa için hangi hatayı ilk düzeltirdin ve neden?",
      "Erişilebilirlik testini bir CI hattına koymak mümkün mü, hangi kısmı elle kalır?"
    ],
    yetkinlikler: [
      { ad: "Klavye erişilebilirliği testi", kanit: "Adım 3'teki klavye testi tablosu." },
      { ad: "Araç destekli denetim", kanit: "Adım 4'teki araç ve elle test karşılaştırması." },
      { ad: "Yardımcı teknoloji gözlemi", kanit: "Adım 5'teki ekran okuyucu dinleme notu." },
      { ad: "Düzeltme doğrulama", kanit: "Adım 6'daki önce-sonra tablosu." },
      { ad: "Etkiye göre önceliklendirme", kanit: "Adım 7'deki sıralı bulgu tablosu." }
    ],
    telafi: "K1 tutmazsa adım 3'te klavye testini baştan yap; K2 tutmazsa adım 4'te axe ve Lighthouse'u tekrar çalıştırıp elle test bulgularıyla ve gizli listeyle karşılaştır; K3 tutmazsa adım 5'te ekran okuyucu dinlemesini tekrar et ve cümleleri aynen yaz; K4 veya K5 tutmazsa adım 6'ya dönüp düzeltmeleri yeniden yap; K6 tutmazsa adım 7'de bulguları etkiye göre yeniden sırala.",
    sonraki: "K2, K4, K5 ve K6 tutarsa ve ilk iki savunma sorusunu cevaplarsan qa2d ve qa3b için kilit açılır; tamamlama kanıt kaydı olarak önce-sonra tablon saklanır."
  });

  K.yeni.push({
    yol: "qa", id: "qa2d", lv: 2,
    title: "Kararsız Test Onarımı: Flaky Testleri Teşhis Etmek",
    weeks: 3,
    tools: "Python, pytest, pytest-randomly (veya pytest-random-order), Playwright, Git, GitHub Actions",
    why: "Bazen geçip bazen kalan test ekibin güvenini yer; herkes 'yine kırmızı, tekrar çalıştır' demeye başlar. Bilerek kararsız yazılmış testleri teşhis edip kalıcı biçimde onarırsın.",
    outcome: ["Kararsız testi 20 koşuda ölçüp kök nedenini bulursun", "Bekleme, veri ve sıra bağımlılığı sorunlarını düzeltirsin", "Onarımı tekrarlı koşuyla kanıtlarsın"],
    pitch: "I diagnosed flaky Playwright tests, fixed their root causes and proved stability with repeated runs.",
    steps: [
      ["Kararsız test nedir?", "Aynı kodda bazen geçen bazen kalan test, hatalı pusulaya benzer: hangi yöne gideceğini bilmezsin. Nedenleri genelde bekleme, ortak veri, sıra bağımlılığı, zaman ve ağdır.", "Beş nedeni tabloya yaz (bekleme, ortak veri, sıra bağımlılığı, saat/zaman, dış servis) ve her biri için bir günlük hayat benzetmesi ve bir belirti ekle.", "5 nedenli tablo", "flaky test = kararsız test, root cause = kök neden, race condition = yarış durumu, determinism = belirlilik", "flaky tests causes explained"],
      ["Kararsız örnek paketini kur", "Teşhis için hasta lazım. 6 küçük test yazarsın; üçü bilerek kararsız olsun: sabit sleep ile bekleyen, başka testin verisine bağımlı, sıra bağımlı.", "Kendi bilgisayarında küçük bir HTML sayfası (gecikmeli yüklenen metin) kur veya The Internet demo sitesinin dinamik yükleme sayfasını kullan. 6 testlik pytest + Playwright paketi yaz; 3'ü bilerek kararsız olsun.", "6 testlik paket", "sleep = sabit bekleme, shared state = ortak durum, test order = test sırası, dynamic loading = dinamik yükleme", "playwright python flaky example sleep dynamic loading"],
      ["Ölç: 20 koşuyla istatistik", "Kararsızlığı 'sanki' diye değil ölçerek söylersin. Paketi tekrar tekrar koşturup her testin kaç kez kaldığını kaydedersin. Analoji: zarın hileli mi olduğunu çok kez atarak anlamak.", "Paketi 20 kez çalıştır (döngü veya tekrar eklentisi). Sıra bağımlı testin ortaya çıkması için koşuların en az 10'unu rastgele sırada yap (pytest-randomly veya pytest-random-order eklentisi; hangisini ve bayrağını kendi sürümünde doğrula) ve her koşunun tohumunu (seed) not et. Test adı, geçti sayısı, kaldı sayısı ve kaldığı koşuların tohum değerleri sütunlarıyla tablo yap. En kararsız 3 testi ayır.", "20 koşuluk sonuç tablosu (10'u rastgele sırada, tohumlu)", "repeat = tekrar, random order = rastgele sıra, seed = tohum, pass rate = geçme oranı, retry = yeniden deneme, quarantine = karantina", "pytest repeat run tests multiple times flaky"],
      ["Kök nedeni bul", "Tekrar çalıştırmak çözüm değildir. Trace ve günlükle kırılma anına bakarsın: element henüz yok mu, başka test veriyi bozdu mu, saat mi etkiledi?", "En kararsız 3 testin kırılma izini (trace/ekran görüntüsü) aç. Her biri için kök neden cümlesini yaz: 'Test, ... olmadan ... yaptığı için kalıyor'. Gerekirse testi yalnız çalıştırıp ortaya çıkanı karşılaştır.", "3 testin kök neden notu", "trace = iz kaydı, wait = bekleme, isolation = yalıtım, dependency = bağımlılık", "playwright trace viewer debug flaky test root cause"],
      ["Kalıcı onar", "Doğru düzeltme sabit bekleme koymak değil, doğru koşulu beklemektir: öğe görünene kadar, istek bitene kadar. Ortak veriyi her teste kendi verisi ile yalıtırsın.", "Sabit sleep'leri koşul beklemesine çevir. Ortak veriyi her teste özel yap, sıra bağımlılığını kaldır. Retry eklemeden düzelt.", "Onarılmış paket", "auto-wait = otomatik bekleme, expect = beklenti, independent test = bağımsız test, fixture = hazırlık yapısı", "playwright expect auto wait replace sleep"],
      ["Kanıtla ve yaz", "Düzelttiğini 'bir kez geçti' ile kanıtlayamazsın. 20 koşu daha, aynı tabloyla. Sonuçları kısa bir ekip notuna dönüştür: ne kırıktı, neden, nasıl düzelttin, nasıl önlenir.", "Onarılmış paketi 20 kez çalıştır ve önceki tabloyla yan yana koy. 1 sayfalık 'Flaky test post-mortem' yaz; son bölümünde 3 önleme kuralı olsun.", "Önce-sonra tablosu ve post-mortem", "post-mortem = olay sonrası inceleme, prevention = önleme, stability = kararlılık, CI = sürekli tümleştirme", "flaky test postmortem best practices"],
      ["Yasak kalıp kontrolü ve CI","Kural insanın hafızasına bırakılırsa unutulur, makineye bırakılırsa her değişiklikte denetlenir. Git geçmişi de düzeltmenin ne zaman ve neden yapıldığını gösterir. Analoji: kapıdaki güvenlik taraması.","Kodda 'time.sleep', 'wait_for_timeout' ve 'reruns' kalıplarını arayan küçük bir kontrol yaz (bir grep betiği veya pytest içinde dosya tarayan bir test). Paketi Git deposuna koy, düzeltmeyi anlamlı bir commit mesajıyla kaydet ve GitHub'a gönder. GitHub Actions workflow'unda önce bu kontrolü, sonra paketi rastgele sırada çalıştır. Bilerek bir sleep ekleyip kontrolün kırmızıya döndüğünü, silince yeşile döndüğünü ekran görüntüsüyle kaydet.","Kontrol betiği, workflow dosyası ve kırmızı-yeşil Actions kaydı","lint rule = denetim kuralı, commit = kayıt, workflow = iş akışı, quality gate = kalite kapısı","github actions pytest workflow forbid sleep check"]
    ],
    onkosul: ["qa2 (Otomasyon: Playwright ile E2E) projesindeki pytest ve Playwright temeli gerekir.", "Python'da temel kod okuma ve fonksiyon yazma bilgisi beklenir.", "qa1 (Manuel Test: İlk Test Planım) projesinden hata raporu yazma bilgisi post-mortem için yardımcıdır.", "Git ile commit ve GitHub'a gönderme (push) temel düzeyde gerekir; GitHub Actions workflow'u qa2 adım 8'de görülür."],
    gereksinim: [
      "İşlevsel (zorunlu): 6 testlik pakette en az 3 test bilerek kararsız yazılır.",
      "İşlevsel (zorunlu): Paket 20 kez çalıştırılıp test başına geçme/kalma sayısı tabloya yazılır; koşuların en az 10'u rastgele sırada yapılır.",
      "İşlevsel (zorunlu): En az 3 kararsız test için kök neden yazılır.",
      "İşlevsel (zorunlu): Düzeltme sonrası paket 20 kez daha çalıştırılır ve her sırada ve her test tek başına geçer.",
      "İşlevsel (zorunlu): Yasaklı kalıp kontrolü Git deposunda GitHub Actions ile çalışır.",
      "İşlevsel (isteğe bağlı): Aynı ölçümü GitHub Actions'ta da yaparsın.",
      "İşlevsel olmayan: Düzeltmede yeniden deneme (retry, reruns), sabit sleep veya wait_for_timeout kullanılmaz.",
      "İşlevsel olmayan: Yalnız kendi yerel sayfan veya herkese açık demo siteleri kullanılır."
    ],
    kabul: [
      "K1: Önce tablosunda en az 3 testin kaldığı koşu sayısı sıfırdan büyük; sıra bağımlı test rastgele sıralı koşularda kalmış | Test: 20 koşuluk tabloyu aç, kalan sayısına ve tohum değerlerine bak.",
      "K2: Her kararsız test için kök neden tek cümleyle ve iz kaydı ekran görüntüsü ile belgeli | Test: Notu ve görüntüleri eşleştir.",
      "K3: Düzeltmede sabit sleep, wait_for_timeout ve yeniden deneme (retry, reruns) yok | Test: Kodda 'sleep', 'wait_for_timeout', 'retry' ve 'reruns' ara; sonuç boş olmalı.",
      "K4: Sonra tablosunda 20 koşunun hepsinde (en az 10'u rastgele sırada) 3 test geçmiş ve her test tek başına da geçiyor | Test: İkinci 20 koşuluk tabloyu aç, kalan sayısı 0 olmalı; 6 testi tek tek (pytest dosya::test_adi) çalıştır, hepsi geçmeli.",
      "K5: Post-mortem 3 önleme kuralı içeriyor | Test: Son bölümü say.",
      "K6: Yasaklı kalıp kontrolü ve paket GitHub Actions'ta çalışıyor; bilerek eklenen sleep çalışmayı kırmızı yapıyor | Test: Actions geçmişinde bir kırmızı ve bir yeşil çalışmayı göster."
    ],
    rubrik: [
      { olcut: "Ölçüm disiplini", guclu: "Önce ve sonra aynı sayıda koşu, tablo karşılaştırılabilir.", zayif: "Tek koşuyla 'düzeldi' denmiş." },
      { olcut: "Kök neden", guclu: "Neden iz kaydıyla gösterilmiş ve kategoriye bağlanmış.", zayif: "Neden tahmin: 'site yavaştı'." },
      { olcut: "Çözümün doğruluğu", guclu: "Çözüm doğru koşulu bekleme ve yalıtım; hataları maskelemiyor.", zayif: "Sleep veya retry ile sorun örtülmüş." },
      { olcut: "Bağımsızlık", guclu: "Testler her sırada ve tek başına geçiyor.", zayif: "Testler sırayla koşarsa geçiyor." },
      { olcut: "Önleme", guclu: "Kurallar kodda uygulanabilir ve ekip için yazılmış.", zayif: "Genel öğüt: 'dikkatli yaz'." }
    ],
    savunma: [
      "Retry neden bir çözüm değil, bir semptom maskesi? Kendi tablonla örnekle.",
      "20 koşu yeterli mi? Daha az veya çok koşmak kararını nasıl değiştirirdi?",
      "Kök nedeni bulmak için hangi bilgiyi (iz, günlük, yalnız koşu) en çok kullandın ve neden?",
      "Hangi testi silmek, onarmaktan daha doğru olabilirdi?"
    ],
    yetkinlikler: [
      { ad: "Kararsızlığı ölçme", kanit: "Adım 3'teki 20 koşuluk sonuç tablosu." },
      { ad: "Kök neden analizi", kanit: "Adım 4'teki 3 testin kök neden notu." },
      { ad: "Dayanıklı test yazma", kanit: "Adım 5'teki onarılmış paket." },
      { ad: "Teknik iletişim", kanit: "Adım 6'daki post-mortem." },
      { ad: "Otomatik denetim ve CI", kanit: "Adım 7'deki kontrol betiği ve kırmızı-yeşil Actions kaydı." }
    ],
    telafi: "K1 tutmazsa adım 2'de kararsız testleri yeniden kur ve adım 3'te rastgele sıralı koşuları ekle; K2 tutmazsa adım 4'te iz kayıtlarını yeniden aç; K3 veya K4 tutmazsa adım 5'e dön, beklemeyi koşula çevir, retry ve sleep'leri kaldır, testleri tek başına ve rastgele sırada yeniden koştur; K5 tutmazsa adım 6'da post-mortem'e önleme kurallarını ekle; K6 tutmazsa adım 7'de kontrol betiğini ve workflow'u düzelt.",
    sonraki: "K1-K6'nın hepsi tutarsa ve ilk iki savunma sorusunu cevaplarsan qa3 ve qa3d (regresyon paketi optimizasyonu) için kilit açılır; tamamlama kanıt kaydı olarak iki tablo, post-mortem ve Actions kaydı saklanır."
  });

  /* ===================== LV3 ===================== */

  K.yeni.push({
    yol: "qa", id: "qa3b", lv: 3,
    title: "Risk Tabanlı Test Stratejisi: Hangi Şeyi, Ne Kadar Test Edersin?",
    weeks: 4,
    tools: "Google Sheets, Miro veya çizim aracı, herkese açık demo e-ticaret sitesi, Google Docs",
    why: "Zaman sınırlı olduğu için her şeyi test edemezsin; kıdemli test mühendisi riske göre sıralar. Bir demo e-ticaret uygulaması için riski ölçüp sayfa kadar bir test stratejisi yazar ve savunursun.",
    outcome: ["Özellikleri olasılık ve etkiye göre puanlayıp riski sıralarsın", "Her risk için test türü ve derinlik kararı verirsin", "Stratejiyi bir karar vericiye savunacak biçimde yazarsın"],
    pitch: "I wrote a risk-based test strategy for a demo e-commerce site, with scored risks and justified test depth.",
    steps: [
      ["Riski tanımla", "Risk iki şeyin çarpımıdır: ne kadar olası ve olunca ne kadar yıkıcı. Analoji: yıldırım düşmesi nadir ama yıkıcı; küçük bir tökezleme sık ama zararsız. Kararlar ikisine birlikte bakar.", "Sauce Demo demo mağaza sitesini gez. 12 özellik listele (giriş, ürün listesi, sepet, ödeme, çıkış vb.). Her biri için 'ne ters gidebilir?' cümlesi yaz.", "12 özellik ve 12 risk cümlesi", "risk = risk, likelihood = olasılık, impact = etki, product risk = ürün riski", "risk based testing explained likelihood impact"],
      ["Risk puanlama matrisi", "Puanlamayı keyfi yapmamak için ölçüt belirlersin: etki 1-5 neye bakar (para, güven, kullanıcı sayısı), olasılık 1-5 neye bakar (karmaşıklık, değişim sıklığı). Ölçütü yazmak karar savunmanın temelidir.", "Etki ve olasılık için 5 basamaklı ölçekleri 1 cümleyle tanımla. 12 özelliği puanla; her puan için 'neden bu puan?' diyen 1 cümlelik gerekçe sütunu (etki gerekçesi ve olasılık gerekçesi) yaz, çarpımı hesapla, Sheets'te sırala. Isı haritasını (etki × olasılık ızgarası) çiz.", "Ölçütlü, gerekçeli puan tablosu ve ısı haritası", "risk matrix = risk matrisi, score = puan, criteria = ölçüt, heat map = ısı haritası", "risk assessment matrix testing scoring"],
      ["Derinlik ve test türü eşlemesi", "Her risk eşit değil: kritik riske derin test (senaryo, otomasyon, keşif), düşük riske hafif kontrol. Test türleri risk türüne uymalı: finansal hata → veri doğrulama, güven kaybı → keşif.", "Risk tablosuna 3 yeni sütun ekle: test türü (manuel, otomasyon, API, performans, erişilebilirlik), derinlik (kapsamlı/orta/hafif) ve gerekçe. En yüksek 4 risk için kapsamlı, en düşük 3 risk için hafif test öner.", "Eşlemeli strateji tablosu", "test depth = test derinliği, test type = test türü, rationale = gerekçe, trade-off = ödünleşim", "risk based testing test depth selection"],
      ["Giriş-çıkış kriteri ve zaman", "Strateji 'ne zaman başlarız, ne zaman biter' sorusuna da cevap verir. Zaman bütçesi sınırlı: yüksek risk önce test edilir, kalan süreye göre düşük risk kesilir.", "40 saatlik bir test bütçesi varsay. Riskleri saate böl. Giriş (test başlar) ve çıkış (yeterli) kriterlerini 3'er madde yaz. Bütçe yarıya inerse neyi keseceğini göster.", "Saat dağılımı ve 6 kriter", "entry criteria = giriş kriteri, exit criteria = çıkış kriteri, budget = bütçe, scope cut = kapsam kesme", "test strategy entry exit criteria example"],
      ["Stratejiyi yaz", "Karar vericiler uzun belge okumaz: bir sayfa, net karar, gerekçe, kalan risk. Analoji: asansörde yöneticiye iki dakikada anlatmak.", "1 sayfalık test stratejisi yaz: hedef, ilk 4 risk, yaklaşım, bütçe, kalan risk, öneri. Bir İngilizce özet paragraf ekle: 'We prioritised testing by risk...'.", "1 sayfalık strateji", "test strategy = test stratejisi, residual risk = kalan risk, stakeholder = paydaş, recommendation = öneri", "one page test strategy template risk based"],
      ["Karşı sorgu ve revizyon", "Strateji, başkası itiraz edince sınanır: 'neden ödeme değil de giriş?' gibi. Puanlama ve gerekçe tutarlıysa savunursun, değilse revize edersin.", "Bir kişiden stratejini en az 3 soru ile sorgulamasını iste (kimse yoksa 3 itirazı kendine yaz). Cevaplarını yaz; puanı veya kararı değiştirdiysen önce-sonra notu ekle.", "3 itiraz-cevap ve revizyon notu", "challenge = itiraz, defend = savunmak, revise = revize etmek, assumption = varsayım", "test strategy review questions stakeholders"],
      ["Mini koşuyla doğrula","Strateji kâğıt üzerinde güzel görünür; sınav sahada. En yüksek riskli özelliği stratejideki derinlikle gerçekten test etmek hem puanını hem derinliğini sınar. Analoji: haritayı yürüyerek denemek.","En yüksek puanlı özelliği seç (örn. ödeme akışı). Stratejide yazdığın test türü ve derinlikle 2 saatlik mini koşu yap. Kaç test yaptığını, kaç hata bulduğunu ve süreyi yaz. Olasılık puanını sonuçla karşılaştır; 'beklendi/beklenmedi' notu ve gerekiyorsa revize puan ekle.","Mini koşu notu ve puan karşılaştırması","pilot run = deneme koşusu, calibration = kalibrasyon, finding = bulgu, revision = revizyon","risk based testing pilot session validate risk scores"]
    ],
    onkosul: ["qa1 (Manuel Test: İlk Test Planım) projesindeki test senaryosu ve test seviyeleri bilgisi.", "qa2 (Otomasyon: Playwright ile E2E) veya qa3 (Kalite Stratejisi: API, Performans ve CI/CD) projelerinden en az birinin kavramsal bilgisi, test türlerini seçmek için gerekir.", "Spreadsheet'te çarpma, sıralama ve basit grafik yapabilmek gerekir.", "Not: qa3 adım 6 aynı konuya giriştir (10 özellikli e-ticaret riski, tek kişilik puan). Bu proje onu derinleştirir: 12 özellikte ölçütlü ve gerekçeli puan kalibrasyonu, 40 saatlik bütçe ve yarıya inince kapsam kesme, giriş-çıkış kriterleri, savunma ve mini koşuyla doğrulama. qa3 adım 6'yı yaptıysan farklı bir özellik kümesi veya ölçüt seç."],
    gereksinim: [
      "İşlevsel (zorunlu): 12 özellik için olasılık ve etki puanı, yazılı ölçütle verilir ve her puanın gerekçe cümlesi yazılır.",
      "İşlevsel (zorunlu): Her özellik için test türü, derinlik ve gerekçe belirtilir.",
      "İşlevsel (zorunlu): 40 saatlik bütçe risklere dağıtılır, yarı bütçe senaryosu yazılır ve giriş ile çıkış kriterleri 3'er madde yazılır.",
      "İşlevsel (zorunlu): 1 sayfalık strateji belgesi hazırlanır.",
      "İşlevsel (zorunlu): Risk ısı haritası çizilir.",
      "İşlevsel (zorunlu): En yüksek riskli özellikte 2 saatlik mini koşu yapılır ve sonuç risk puanıyla karşılaştırılır.",
      "İşlevsel (isteğe bağlı): Puanlamayı Miro'da ortak bir panoda yaparsın.",
      "İşlevsel olmayan: Her puan için gerekçe cümlesi yazılır.",
      "İşlevsel olmayan: Hedef yalnız herkese açık demo mağaza sitesidir; gerçek müşteri verisi kullanılmaz."
    ],
    kabul: [
      "K1: Ölçek tanımları (etki 1-5, olasılık 1-5) ayrı yazılmış ve ısı haritası çizilmiş | Test: Tabloda iki ölçüt bölümünü ve ısı haritasını göster.",
      "K2: 12 özelliğin hepsinde puan, her puan için gerekçe cümlesi, test türü, derinlik ve eşleme gerekçesi dolu | Test: Sheets'te boş hücre sayısı 0 olmalı; rastgele 3 puanın gerekçesini sesli savun.",
      "K3: Saat dağılımının toplamı 40, yarı bütçe için kesilenler listelenmiş ve giriş ile çıkış kriterleri 3'er madde | Test: Toplamı Sheets'te hesapla, kriter maddelerini say.",
      "K4: Strateji tek sayfa ve 'kalan risk' bölümü içeriyor | Test: Belgeyi aç, sayfa sayısını ve bölüm başlıklarını kontrol et.",
      "K5: En az 3 itiraz cevaplanmış ve gerekirse karar değiştirilmiş | Test: İtiraz-cevap notunu say.",
      "K6: Mini koşuda planlanan ve gerçekleşen derinlik, süre ve bulgu sayısı yazılı; en az 1 puan için beklendi/beklenmedi notu var | Test: Mini koşu notunu stratejideki satırla eşleştir."
    ],
    rubrik: [
      { olcut: "Puanlama ölçütü", guclu: "Ölçekler somut göstergelere bağlı, tüm özelliklerde tutarlı uygulanmış ve her puanın gerekçe cümlesi var.", zayif: "Puanlar sezgisel, ölçüt yok." },
      { olcut: "Test türü eşlemesi", guclu: "Risk türü ile test türü gerekçeli eşleşmiş.", zayif: "Hepsine 'manuel test' yazılmış." },
      { olcut: "Bütçe kararı", guclu: "Bütçe yarıya inince hangi riskin kesileceği nedenlerle gösterilmiş.", zayif: "Bütçe düşünülmemiş." },
      { olcut: "Strateji iletişimi", guclu: "Kısa, karar odaklı ve kalan riski açıkça söylüyor.", zayif: "Uzun, dağınık ve kararsız." },
      { olcut: "Savunma ve revizyon", guclu: "İtirazlar kanıtla cevaplanmış; gerekirse karar değişmiş.", zayif: "İtiraz yok veya savunulamamış." }
    ],
    savunma: [
      "İki özellik aynı puanı aldıysa hangisini önce test edersin ve neden?",
      "Puanlama ölçütünü değiştirsen hangi özelliklerin sırası değişirdi?",
      "Kalan riski karar vericiye nasıl anlatırsın ki gereksiz korku da yaratmayasın, gerçeği de saklamayasın?",
      "Bu strateji ürün canlıya çıkıp bir hata gelirse hangi kanıtı sunar?"
    ],
    yetkinlikler: [
      { ad: "Risk analizi", kanit: "Adım 2'deki ölçütlü, gerekçeli puan tablosu ve ısı haritası." },
      { ad: "Test stratejisi tasarımı", kanit: "Adım 3'teki eşlemeli strateji tablosu." },
      { ad: "Kaynak planlama", kanit: "Adım 4'teki saat dağılımı ve kriterler." },
      { ad: "Paydaşa sunum ve savunma", kanit: "Adım 5'teki 1 sayfalık strateji ve adım 6'daki itiraz notu." },
      { ad: "Strateji doğrulama", kanit: "Adım 7'deki mini koşu notu ve puan karşılaştırması." }
    ],
    telafi: "K1 tutmazsa adım 2'ye dön, ölçekleri ve ısı haritasını tamamla; K2 tutmazsa adım 2'de eksik puan gerekçelerini, adım 3'te eşlemeyi tamamla; K3 tutmazsa adım 4'te saat dağılımını ve giriş-çıkış kriterlerini yeniden yap; K4 tutmazsa adım 5'te belgeyi tek sayfaya indir ve kalan risk bölümünü ekle; K5 tutmazsa adım 6'daki itirazları gerçek bir kişiyle tekrar et; K6 tutmazsa adım 7'de mini koşuyu stratejideki derinlikle tekrarla.",
    sonraki: "K1-K6'nın hepsi tutarsa ve ilk üç savunma sorusunu cevaplarsan qa3c ve qa4 (kapston) için kilit açılır; tamamlama kanıt kaydı olarak strateji belgesi ve mini koşu notu saklanır."
  });

  K.yeni.push({
    yol: "qa", id: "qa3c", lv: 3,
    title: "Kalite Metrikleri Panosu: Doğru Soruyu Ölçmek",
    weeks: 4,
    tools: "SQLite (DB Browser for SQLite veya sqlite3 komut satırı), SQL, Google Sheets veya Python, sentetik CSV verisi",
    why: "Ekipler 'kaç test yazdık' gibi yanıltıcı sayılarla kalite hakkında konuşur. Sentetik bir test sonuç veri setinden hangi kararlara hizmet eden metrikleri seçip pano kurduğunu ve her metriğin sınırını savunursun.",
    outcome: ["Karar odaklı 5 kalite metriği tanımlarsın", "SQL ile metrikleri sentetik veriden hesaplarsın", "Panoyu kurup yanıltıcı kullanımı savunmada açıklarsın"],
    pitch: "I defined quality metrics, computed them with SQL on synthetic test data and built a dashboard that explains their limits.",
    steps: [
      ["Hangi karar için ölçüyorsun?", "Metrik bir soruya cevap vermeli: 'çıkabilir miyiz?', 'test paketimiz güvenilir mi?'. Sorusuz ölçüm hız göstergesi gibi tek başına anlamsız. Analoji: arabada yalnız yakıt göstergesi olması.", "3 karar sorusu yaz (çıkış, paket güveni, hata maliyeti). Her biri için 2 aday metrik öner ve ölçmenin nasıl yanıltabileceğini 1 cümleyle belirt.", "3 soru ve 6 aday metrik", "metric = metrik, KPI = anahtar gösterge, vanity metric = yanıltıcı süs metrik, decision = karar", "software quality metrics useful vs vanity"],
      ["Sentetik veri seti üret", "Gerçek ekip verisine ihtiyacın yok: kendi ürettiğin tutarlı veri tablosu yeterli. Gerçek hayatı taklit eder: çalıştırma, test kimliği, hata, kapanış tarihi, önem, modül, yeniden açılma.", "Kendi betiğinle veya elle her biri en az 200 satırlık iki CSV üret: test çalıştırmaları (id, test_id, modül, sonuç, süre, tarih) ve hatalar (id, modül, önem, açılış, kapanış, yeniden_acildi). test_id değerleri tekrar etsin (örn. 20 farklı test, her biri 10 kez koşsun; en az 3 testin sonucu bazen 'geçti' bazen 'kaldı' olsun); yeniden_acildi 0 veya 1 olsun. Veriyi 'sentetik' diye etiketle. İki tabloyu da SQLite'a yükle.", "İki CSV (şemalı) ve iki tablolu SQLite dosyası", "synthetic data = sentetik veri, schema = şema, import = içe aktarma, dataset = veri seti", "generate synthetic csv test results python sqlite import"],
      ["SQL ile metrikleri hesapla", "Aynı veri farklı sorgularla farklı hikaye anlatır. Modül başına hata sayısı, hata kapanış süresi, geçme oranı, tekrar açılma oranı ve kararsız test sayısı farklı sorular yanıtlar. (Gerçek 'hata yoğunluğu' kod büyüklüğüne bölünür; bu veride o sütun olmadığı için 'hata sayısı' denir.)", "5 metrik için SQL yaz: modül başına açık kritik hata sayısı, ortalama hata kapanış süresi, haftalık geçme oranı, tekrar açılan hata oranı (yeniden_acildi), kararsız test sayısı (aynı test_id'nin hem 'geçti' hem 'kaldı' sonucu olması). Her sorgunun sonucunu tabloya yaz, sonra CSV'yi Sheets'te filtreleyip en az 3 metriği elle sayarak çapraz kontrol et ve farkı not et.", "5 SQL sorgusu, sonuç tablosu ve elle kontrol notu", "aggregate = toplulaştırma, group by = gruplama, defect count = hata sayısı, lead time = bekleme süresi, reopen rate = tekrar açılma oranı", "sql group by aggregate defect metrics"],
      ["Panoyu kur", "İyi pano az sayıda net grafiktir: eğilim için çizgi, karşılaştırma için çubuk. Her grafiğin yanına 'bu ne söylüyor, ne söylemiyor' notu koyarsın.", "Sheets veya Python ile 1 sayfalık pano kur: 5 grafik, her birine başlık, tek cümle yorum ve sınır notu. Renkler eşik değerini göstermeli; eşiği yazılı gerekçeyle belirle.", "Pano ve sınır notları", "dashboard = pano, trend = eğilim, threshold = eşik, chart = grafik", "quality dashboard design charts trends threshold"],
      ["Yanıltıcı kullanımı sına", "Her metrik oyuna açıktır: 'çok hata bulana ödül' ekibe gereksiz hata açtırır. Goodhart yasası: ölçü hedef olunca iyi ölçü olmaktan çıkar. Bunu veriyle gösterirsin.", "Bir metriğin kötüye kullanımını simüle et: kapanış süresini kısaltmak için hataları hemen 'çözüldü' yapıp yeniden aç. Veriyi değiştir (hata tablosunda kapanış tarihlerini açılışa yaklaştır ve bu hataların yeniden_acildi değerini 1 yap); ortalama kapanış süresinin iyi göründüğünü ama tekrar açılan hata oranının kötüleştiğini, yani kalitenin düştüğünü göster.", "Önce-sonra grafiği (kapanış süresi ve tekrar açılan hata oranı) ve açıklama", "gaming = metriği oyunlamak, Goodhart's law = Goodhart yasası, incentive = teşvik, bias = yanlılık", "goodharts law software metrics gaming"],
      ["Sunum ve sınır belgesi", "Panoyu kullananlar sınırı bilmeli: örnek büyüklüğü, tanım, eksik veri. Yazılı 'bu metrik şunu söylemez' cümlesi güveni artırır.", "1 sayfalık 'metrik sözlüğü' yaz: her metrik için bir satır (5 satır), sütunlar: karar, tanım, formül, kaynak, sınır, kötüye kullanım riski (6 sütun). 3 dakikalık İngilizce sunum provası yap: 'This metric shows... but it does not show...'.", "6 sütunlu metrik sözlüğü ve prova", "definition = tanım, limitation = sınır, data source = veri kaynağı, communication = iletişim", "metrics glossary definition formula limitations"],
      ["SQL sonuçlarını pivotla çaprazla","Tek araçla bulunan sayıya körü körüne güvenme: aynı soruyu ikinci bir yoldan hesaplayıp aynı sonucu görmek sorgunun doğru olduğunu gösterir. Fark çıkarsa genellikle tanım veya boş değer sorunudur. Analoji: hesabı iki kişinin ayrı yapıp karşılaştırması.","İki CSV'yi Google Sheets'e yükle. Pivot tablo ile en az 3 metriği (örn. modül başına açık kritik hata sayısı, haftalık geçme oranı, tekrar açılan hata oranı) yeniden hesapla. SQL sonuçlarıyla yan yana koy; fark varsa nedenini (tanım, boş değer, tarih biçimi) bul ve metrik sözlüğündeki tanımı netleştir.","SQL-pivot karşılaştırma tablosu ve tanım notları","pivot table = pivot tablo, cross-check = çapraz kontrol, discrepancy = tutarsızlık, definition = tanım","google sheets pivot table cross check sql results"]
    ],
    onkosul: ["qa3 (Kalite Stratejisi: API, Performans ve CI/CD) projesinden SQL ile veri sorgulama temeli veya eşdeğer SQL bilgisi gerekir.", "qa1 (Manuel Test: İlk Test Planım) projesinden hata yaşam döngüsü ve test sonucu kavramları.", "Google Sheets'te grafik oluşturmayı bilmek gerekir."],
    gereksinim: [
      "İşlevsel (zorunlu): Sentetik iki tablo hazırlanır, her biri en az 200 satırdır ve ikisi de SQLite'a yüklenir; çalıştırmalar (id, test_id, modül, sonuç, süre, tarih), hatalar (id, modül, önem, açılış, kapanış, yeniden_acildi).",
      "İşlevsel (zorunlu): 5 metrik SQL ile hesaplanır; en az 3'ü elle çapraz kontrol edilir.",
      "İşlevsel (zorunlu): En az 3 metrik Sheets pivot tablosuyla yeniden hesaplanıp SQL sonuçlarıyla karşılaştırılır.",
      "İşlevsel (zorunlu): 1 sayfalık panoda her grafiğin yorumu ve sınır notu bulunur.",
      "İşlevsel (zorunlu): En az 1 metriğin oyunlanması gösterilir.",
      "İşlevsel (zorunlu): Metrik sözlüğü (karar, tanım, formül, kaynak, sınır, kötüye kullanım riski sütunlarıyla) yazılır.",
      "İşlevsel (isteğe bağlı): Panoyu Python grafik kütüphanesi ile üretirsin.",
      "İşlevsel olmayan: Veri açıkça 'sentetik' etiketlidir; gerçek bir ekip veya kişi adı geçmez."
    ],
    kabul: [
      "K1: Her metrik hangi karar sorusuna cevap verdiğini bir cümleyle söylüyor | Test: Sözlükte 'karar' sütununu kontrol et.",
      "K2: 5 SQL sorgusu çalışıyor, sonuçları tabloda ve en az 3'ü elle çapraz kontrol edilmiş | Test: Sorguları SQLite'ta yeniden çalıştır, sonuçlar eşleşmeli; elle kontrol notundaki fark 0 veya açıklanmış olmalı.",
      "K3: Panoda her grafiğin altında 'ne söyler / ne söylemez' notu ve eşik değeri için yazılı gerekçe var | Test: 5 grafiği tek tek aç, eşik gerekçesini oku.",
      "K4: Oyunlama deneyi önce-sonra grafikle gösterilmiş (kapanış süresi iyileşirken tekrar açılan hata oranı kötüleşmiş) ve kalite kaybı açıklanmış | Test: Önce ve sonra değerlerini karşılaştır.",
      "K5: Sözlükte her metriğin formülü, kaynağı, sınırı ve kötüye kullanım riski yazılı | Test: 5 satırı ve formül, kaynak, sınır, kötüye kullanım riski sütunlarını say (karar ve tanımla toplam 6 sütun).",
      "K6: En az 3 metrik hem SQL hem Sheets pivot ile hesaplanmış; farklar açıklanmış veya yok | Test: İki sonucu yan yana aç, fark sütununa bak."
    ],
    rubrik: [
      { olcut: "Metrik seçimi", guclu: "Her metrik bir karara bağlı; vanity metrik açıkça elenmiş.", zayif: "Metrikler 'kolay ölçülen' diye seçilmiş." },
      { olcut: "Veri ve sorgu doğruluğu", guclu: "Sorgular tutarlı, sonuçlar elle ve Sheets pivotla çapraz kontrol edilmiş.", zayif: "Sonuçlar doğrulanmamış." },
      { olcut: "Pano okunabilirliği", guclu: "Az grafik, net başlık, tek cümle yorum, sınır notu.", zayif: "Çok grafik, yorumsuz." },
      { olcut: "Oyunlama analizi", guclu: "Deney metriğin nasıl yanıltabileceğini veriyle gösteriyor.", zayif: "Teorik uyarı var, veri yok." },
      { olcut: "Sınır belgeleme", guclu: "Sözlük sınırı açıkça ve karar vericinin anlayacağı dille yazıyor.", zayif: "Sınır yok, metrik mutlak doğru gibi sunulmuş." }
    ],
    savunma: [
      "En çok güvendiğin metrik hangisi ve onu hangi koşulda reddederdin?",
      "Bir yönetici 'kapanış süresini yarıya indirin' derse hangi riski anlatırsın?",
      "200 satırlık sentetik veri ile gerçek veri arasında hangi sonuçlar değişebilir?",
      "Pano tek bir sayıya indirilmek istenirse neyi kaybedersin?"
    ],
    yetkinlikler: [
      { ad: "Metrik tasarımı", kanit: "Adım 1'deki 3 soru ve 6 aday metrik." },
      { ad: "SQL ile veri analizi", kanit: "Adım 3'teki 5 sorgu, sonuç tablosu ve elle kontrol notu." },
      { ad: "Veri görselleştirme", kanit: "Adım 4'teki pano." },
      { ad: "Metrik eleştirisi", kanit: "Adım 5'teki oyunlama deneyi ve adım 6'daki metrik sözlüğü." },
      { ad: "Çapraz doğrulama", kanit: "Adım 7'deki SQL-pivot karşılaştırma tablosu." }
    ],
    telafi: "K1 tutmazsa adım 1'e ve adım 6'daki 'karar' sütununa dön; K2 tutmazsa adım 3'te sorguları yeniden yaz ve elle kontrolü yap; K3 tutmazsa adım 4'te her grafiğe yorum, sınır notu ve eşik gerekçesi ekle; K4 tutmazsa adım 5'te deneyi yeniden kur (yeniden_acildi değerlerini de değiştir); K5 tutmazsa adım 6'da 6 sütunlu sözlüğü tamamla; K6 tutmazsa adım 7'de pivot hesabını tekrar et.",
    sonraki: "K1-K6'nın hepsi tutarsa ve ilk üç savunma sorusunu cevaplarsan qa3d ve qa4 (kapston) için kilit açılır; tamamlama kanıt kaydı olarak pano, sözlük ve SQL-pivot karşılaştırması saklanır."
  });

  K.yeni.push({
    yol: "qa", id: "qa3d", lv: 3,
    title: "Regresyon Paketi Optimizasyonu: Hızlı ve Güvenilir Paket",
    weeks: 4,
    tools: "Python, pytest, Playwright, pytest-xdist, GitHub Actions",
    why: "Büyüyen regresyon paketi yavaşlar ve ekip testi çalıştırmayı bırakır. Kendi kurduğun 30 testlik paketi ölçüp sınıflandırır, paralelleştirir ve çalıştırma süresini düşürürken riski yönetirsin.",
    outcome: ["Paketi süre, değer ve kararlılık açısından ölçüp sınıflandırırsın", "Seçili çalıştırma ve paralel koşum ile süreyi düşürürsün", "Hangi testi neden çıkardığını savunursun"],
    pitch: "I measured and optimised a 30-test regression suite using tagging, selective runs and parallel execution while documenting the risk trade-offs.",
    steps: [
      ["Önce ölç: paket haritası", "Optimizasyon ölçmeden yapılmaz. Her testin süresi, kapsadığı özellik, kırılma geçmişi ve kararlılığı bir tabloya girer. Analoji: bavulu toplamadan önce eşyaları tartmak.", "qa2 paketini 30 teste tamamlamış halde (veya kendi 30 testlik paketini; Sauce Demo ve kendi yerel sayfan) kullan. Her test için süre, özellik, öncelik ve son 10 koşudaki başarısız (fail) sayısını tabloya yaz.", "30 satırlı paket haritası", "regression suite = regresyon paketi, duration = süre, coverage = kapsam, baseline = başlangıç ölçümü", "regression test suite optimization measure runtime"],
      ["Sınıflandır: etiketler", "Her test aynı değerde değildir: duman (çok hızlı, kritik yol), çekirdek (ana özellikler), tam (uç durum). pytest işaretleri (marker) ile etiketlenir, böylece seçili çalıştırılır.", "Her teste duman/çekirdek/tam etiketlerinden birini ver ve nedenini yaz. pytest işaretleri ile etiketleri koda ekle. Duman paketin 5 dakikayı geçmemesi hedeflensin.", "Etiketli paket ve gerekçe sütunu", "marker = işaret, smoke test = duman testi, critical path = kritik yol, tag = etiket", "pytest markers smoke regression selection"],
      ["Paralel çalıştır", "Testler birbirinden bağımsızsa aynı anda koşabilir: mutfakta tek aşçı yerine dört aşçı. Ama ortak veri paylaşan testler birbirini bozar; bu sorunlar yalıtım gerektirir.", "pytest-xdist ile paketi 1, 2, 4 işçiyle çalıştır. Her koşuda toplam süreyi ve başarısız (fail) test sayısını yaz. Paralelde başarısız olan testlerin nedenini bul ve yalıt.", "Süre karşılaştırma tablosu", "parallel = paralel, worker = işçi, speedup = hızlanma, isolation = yalıtım", "pytest xdist parallel run speedup isolation"],
      ["Kararsız ve yinelenen testler", "Kararsız test paketi yavaşlatır ve güveni kırar; aynı şeyi sınayan iki test gereksiz sürer. Karantina kararsız testi paketin dışına alır ama silmez: onarım listesi tutulur.", "Başarısız (fail) olan testler arasından en kararsız 3'ünü karantinaya al ve nedenini yaz. Aynı şeyi sınayan 2 testi birleştir veya birini çıkar; kapsama etkisini yaz.", "Karantina listesi ve birleştirme notu", "quarantine = karantina, duplicate test = yinelenen test, redundancy = gereksiz tekrar, maintenance = bakım", "test suite pruning duplicate flaky quarantine"],
      ["CI'da katmanlı çalıştırma", "Her değişiklikte hızlı duman, geceleri tam paket. Böylece geri bildirim hızlı kalır, derin kontrol kaybolmaz. Analoji: kapıda hızlı kontrol, gece derin temizlik.", "GitHub Actions workflow dosyasında iki iş tanımla: her commit'te duman, zamanlanmış tam paket. Çalışmaların süresini ekran görüntüsüyle kaydet.", "İki işli workflow ve süre kaydı", "pipeline = hat, scheduled run = zamanlanmış çalıştırma, fast feedback = hızlı geri bildirim, nightly = gece çalıştırma", "github actions smoke on push full nightly pytest"],
      ["Risk ve kayıp raporu", "Optimizasyon bedava değildir: hızlandırırken kapsam ve güvenden ne kaybettin? Kaybı yazmak ekibin kararı bilinçli almasını sağlar.", "1 sayfalık rapor yaz: başlangıç süre, son süre, çıkarılan/karantinaya alınan testler, kaybedilen kapsam, kalan risk, öneri. En fazla bir tablo ve 1 İngilizce özet paragraf kullan.", "1 sayfalık optimizasyon raporu", "trade-off = ödünleşim, coverage loss = kapsam kaybı, residual risk = kalan risk, recommendation = öneri", "test suite optimization report trade-offs"],
      ["Kapanış özeti: sonuçları tek tabloda topla", "Raporu okuyan kişi 5 farklı tabloyu gezmez; tek bir bakışta sonucu görmek ister. Kapanış özeti, yolculuğun sonunda tüm sayıları aynı sayfaya koyan künye gibidir.", "Başlangıç ve son süreyi, 1/2/4 işçi sürelerini, toplam test sayısını, duman/çekirdek/tam dağılımını, karantinaya alınan ve birleştirilen test sayısını, başarısız (fail) sayısını ve geriye kalan test sayısını tek tabloda topla. Adım 6 raporundaki tabloyu bununla değiştir.", "Tek tablolu kapanış özeti", "summary = özet, before/after = önce/sonra, remaining = geriye kalan, fail count = başarısız sayısı", "test suite optimization summary table before after"]
    ],
    onkosul: ["qa2 (Otomasyon: Playwright ile E2E) projesindeki pytest ve Playwright paketi gerekir; qa2 paketi 15 test üretir, bu projede 30 test gerekir, bu yüzden qa2 paketini 30 teste tamamlaman gerekir (ya da eşdeğer 30 testlik kendi paketini kullan).", "qa2d (Kararsız Test Onarımı) projesindeki kararsızlık ölçümü ve kök neden bilgisi çok işe yarar.", "GitHub Actions workflow dosyası yazmayı temel düzeyde bilmek gerekir; qa2 adım 8'de yapılır."],
    gereksinim: [
      "İşlevsel (zorunlu): 30 testlik paketin süre, özellik, öncelik ve kararlılık tablosu çıkarılır.",
      "İşlevsel (zorunlu): Testler duman, çekirdek ve tam olarak etiketlenir.",
      "İşlevsel (zorunlu): Paket 1, 2 ve 4 işçiyle ölçülür.",
      "İşlevsel (zorunlu): En az 3 kararsız test karantinaya alınır ve en az 1 yinelenen test birleştirilir.",
      "İşlevsel (zorunlu): CI'da duman ve tam çalıştırma ayrı işlerdir.",
      "İşlevsel (zorunlu): Sonuçlar tek bir kapanış özet tablosunda toplanır.",
      "İşlevsel (isteğe bağlı): Süreyi grafiğe dökersin.",
      "İşlevsel olmayan: Duman paketi 5 dakikayı geçmez; ölçüm yerel veya CI'da yazılır."
    ],
    kabul: [
      "K1: Paket haritasında 30 satır ve 5 sütun dolu | Test: Tabloyu aç, boş hücre sayısı 0 olmalı.",
      "K2: Her teste bir etiket ve gerekçe verilmiş | Test: Kodda marker'ları listele, etiketsiz test kalmamalı.",
      "K3: 1, 2, 4 işçi süreleri yazılı ve 4 işçide test sonuçları yalnız kasıtlı karantina farkıyla aynı | Test: İki koşunun başarısız (fail) test listesini karşılaştır.",
      "K4: Karantina listesinde neden ve onarım planı var; birleştirilen testin kapsam etkisi yazılı | Test: Notları aç, 3 satır ve 1 birleştirme bul.",
      "K5: Rapor başlangıç ve son süreyi, kaybedilen kapsamı ve kalan riski içeriyor | Test: Rapor başlıklarını kontrol et.",
      "K6: Kapanış tablosunda süreler, testlerin toplam/karantina/birleştirilen sayıları ve başarısız (fail) sayısı tek tabloda | Test: Tabloyu K1, K3 ve K4 çıktılarıyla sayı sayı karşılaştır."
    ],
    rubrik: [
      { olcut: "Ölçüm temeli", guclu: "Her karar ölçülmüş verilere dayanıyor, önce-sonra karşılaştırılabilir.", zayif: "Hız 'daha hızlı gibi' diye iddia edilmiş." },
      { olcut: "Sınıflandırma kararı", guclu: "Etiketler riske bağlı ve gerekçeli; duman gerçekten kritik yolu kapsıyor.", zayif: "Etiketler rastgele." },
      { olcut: "Paralel güvenlik", guclu: "Yalıtım sorunları bulunup çözülmüş, sonuçlar karşılaştırılmış.", zayif: "Paralel koşum denenmemiş veya sonuçlar bozulmuş." },
      { olcut: "Karantina ve silme kararı", guclu: "Her çıkarma kararı nedeni ve onarım planıyla yazılı.", zayif: "Testler sessizce silinmiş." },
      { olcut: "Ödünleşim şeffaflığı", guclu: "Kaybedilen kapsam ve kalan risk açıkça yazılı.", zayif: "Rapor yalnız kazancı anlatıyor." }
    ],
    savunma: [
      "Duman paketine neden bu testleri koydun; birini çıkarsan hangi riski almış olurdun?",
      "Paralel koşumda sonuçlar farklı çıkarsa neyden şüphelenirsin?",
      "Bir testi karantinaya almak ile silmek arasındaki farkı kendi örneğinle anlat.",
      "Süre yarıya inerken kapsam azaldıysa karar vericiye hangi cümleyle sunarsın?"
    ],
    yetkinlikler: [
      { ad: "Paket ölçümü ve sınıflandırma", kanit: "Adım 1'deki paket haritası ve adım 2'deki etiketli paket." },
      { ad: "Paralel ve izole çalıştırma", kanit: "Adım 3'teki süre karşılaştırma tablosu." },
      { ad: "Paket bakımı", kanit: "Adım 4'teki karantina listesi ve birleştirme notu." },
      { ad: "CI tasarımı", kanit: "Adım 5'teki iki işli workflow." },
      { ad: "Karar şeffaflığı", kanit: "Adım 6'daki optimizasyon raporu." },
      { ad: "Sonuç özetleme", kanit: "Adım 7'deki kapanış özet tablosu." }
    ],
    telafi: "K1 veya K2 tutmazsa adım 1 ve 2'ye dön, haritayı ve etiketleri tamamla; K3 tutmazsa adım 3'te yalıtımı onar ve ölçümü tekrarla; K4 tutmazsa adım 4'te karantina ve birleştirme gerekçelerini yaz; K5 tutmazsa adım 6'da raporu ödünleşimle yeniden yaz; K6 tutmazsa adım 7'de özet tablosunu önceki tablolarla sayı sayı eşleştirip yeniden doldur.",
    sonraki: "K3, K4, K5 ve K6 tutarsa ve ilk üç savunma sorusunu cevaplarsan qa4 (kapston) için kilit açılır; tamamlama kanıt kaydı olarak harita, süre tablosu ve rapor saklanır."
  });

})(window);

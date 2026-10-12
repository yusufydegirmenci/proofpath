"use strict";
(function (g) {
  var K = g.PP_PROJ = g.PP_PROJ || { tanim: {}, yeni: [], va: [] };

  /* ===================== LV1 ===================== */

  K.yeni.push({
    yol: "qa", id: "qa1b", lv: 1,
    title: "Hata Raporu Atölyesi: Tekrar Üretilebilir Rapor Yazmak",
    weeks: 2,
    tools: "Tarayıcı DevTools, ekran kaydı aracı, Google Sheets, Trello",
    why: "Kötü yazılmış bir hata raporu geliştiriciyi saatlerce soru sormaya iter ve hata çözülmeden kalır. Bilerek hatalı bir demo uygulamada bulduğun sorunları başkasının tek seferde tekrar üretebileceği biçimde yazarsın.",
    outcome: ["Kötü bir hata raporunu teşhis edip düzeltirsin", "Hatayı en az adımla tekrar üretip kanıtlarsın", "Önem ve öncelik ayrımıyla 4 profesyonel rapor yazarsın"],
    pitch: "I wrote reproducible bug reports with minimal steps, evidence and clear severity on an intentionally faulty demo app.",
    steps: [
      ["İyi ve kötü rapor farkı", "Hata raporu bir adres tarifidir: 'şu sokakta bir yerde' demek kimseyi eve ulaştırmaz. İyi raporda başlık, adımlar, beklenen, gerçekleşen ve ortam bulunur.", "Hazır üç kötü rapor örneği yaz ('buton çalışmıyor' gibi). Her birinde eksik olan alanları işaretle ve düzelt.", "3 kötü raporun düzeltilmiş hali", "bug report = hata raporu, expected result = beklenen sonuç, actual result = gerçekleşen sonuç, environment = ortam", "how to write a good bug report examples bad vs good"],
      ["Hatayı tekrar üret", "Tekrar üretilemeyen hata geliştiricinin gözünde yoktur. Önce hatayı 3 kez dene, sonra gereksiz adımları ayıkla; amaç en kısa yolu bulmaktır. Analoji: bulmacanın en kısa çözüm yolu.", "Sauce Demo sitesinde 'problem_user' ile giriş yap (bu hesap bilerek hatalı davranır). 2 hata bul ve her birini en az adımla 3 kez tekrar ettiğini not et.", "2 hata için en kısa adım listesi", "reproduce = tekrar üretmek, minimal steps = en az adım, intermittent = ara sıra olan", "how to reproduce a bug minimal steps qa"],
      ["Kanıt topla: ekran, konsol, ağ", "Kanıt raporu inandırıcı yapar. Ekran görüntüsü neyi gördüğünü, konsol hatası ve ağ sekmesi arka planda ne olduğunu gösterir. Analoji: kaza tutanağına eklenen fotoğraf.", "Bulduğun hatalardan birinde DevTools Console ve Network sekmesine bak. Bir ekran görüntüsü, 15 saniyelik ekran kaydı ve varsa konsol satırını kaydet.", "Görüntü, kayıt ve konsol notu", "evidence = kanıt, console error = konsol hatası, network request = ağ isteği, screenshot = ekran görüntüsü", "chrome devtools console network tab for testers"],
      ["Önem ve öncelik", "Önem (severity) hatanın ürüne zararıdır, öncelik (priority) ne zaman düzeltileceğidir. Logo yazım hatası düşük önemli ama ana sayfada ise öncelikli olabilir. Analoji: ambulans mı, randevu mu.", "4 hatayı şu tabloya yerleştir: başlık, önem (kritik/yüksek/orta/düşük), öncelik, gerekçe cümlesi. En az bir hatanın önemi ile önceliği farklı olsun.", "4 satırlı önem-öncelik tablosu", "severity = önem, priority = öncelik, blocker = engelleyici, triage = ayıklama", "severity vs priority bug examples"],
      ["Raporu yaz ve Trello'ya aç", "Başlık hatayı tek cümlede özetler: nerede, ne oluyor. Şablonu sabitlersen her raporda aynı yapıyı kullanırsın; okuyan ne arayacağını bilir.", "Kendi şablonunu yaz. 4 hatanın tamamı için rapor oluştur, en az ikisini İngilizce yaz. Trello panosuna kart olarak aç, Yeni listesine koy.", "4 raporlu Trello panosu", "title = başlık, attachment = ek, label = etiket, status = durum", "bug report template trello jira fields"],
      ["Akran incelemesi ve yeniden yazım", "Rapor yazarken kendi bilgini unutamazsın; başkası okuyunca eksik görünür. Bir arkadaşın raporu yalnız okuyarak hatayı üretebiliyorsa rapor iyidir.", "Raporlarından 2'sini bir kişiye ver ve yalnız rapora bakarak hatayı üretmesini iste. Takıldığı yeri not et, raporu düzelt. Kimse bulunamazsa 24 saat bekleyip kendin 'yabancı gözle' dene.", "Takılma notu ve düzeltilmiş 2 rapor", "peer review = akran incelemesi, clarity = açıklık, feedback = geri bildirim", "bug report peer review checklist"]
    ],
    onkosul: ["Önkoşul yok: tarayıcı kullanmayı ve bir web sitesinde gezinmeyi bilmen yeterli.", "İsteğe bağlı: qa1 (Manuel Test: İlk Test Planım) projesindeki hata raporu adımı bu projeyi kolaylaştırır.", "DevTools açmayı (F12) bilmen beklenir; adım 3'te basitçe gösterilir."],
    gereksinim: [
      "İşlevsel (zorunlu): 4 hata raporu yazılır; her birinde başlık, adımlar, beklenen, gerçekleşen, ortam ve kanıt bulunur.",
      "İşlevsel (zorunlu): Her raporda önem ve öncelik ayrı yazılır, gerekçesiyle.",
      "İşlevsel (zorunlu): Raporlar bir Trello panosunda kart olarak tutulur.",
      "İşlevsel (isteğe bağlı): Bir raporu video kaydıyla desteklersin.",
      "İşlevsel (isteğe bağlı): Kendi rapor şablonunu Google Sheets'e de kaydedersin.",
      "İşlevsel olmayan: Her rapor en çok 12 adımla ve tek hata kapsayacak şekilde kısa tutulur.",
      "İşlevsel olmayan: Hedef yalnız herkese açık demo sitelerdir; gerçek kişi verisi kullanılmaz."
    ],
    kabul: [
      "K1: 4 raporun her birinde 6 zorunlu alan dolu | Test: Şablonu rapor rapor işaretle, boş alan 0 olmalı.",
      "K2: En az 2 rapor İngilizce yazılmış | Test: Raporları sayıp dilini not et.",
      "K3: Bir arkadaşın (veya 24 saat sonraki sen) en az 2 raporu yalnız okuyarak hatayı yeniden üretti | Test: Takılma notunda 'üretildi' yazmalı, kanıt notuna ekle.",
      "K4: Önem ve önceliği farklı olan en az 1 hata var ve gerekçesi yazılı | Test: Tablodaki satırı göster.",
      "K5: Her raporda en az 1 kanıt dosyası ekli (ekran, kayıt veya konsol notu) | Test: Trello kartlarını aç, ek sayısını say."
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
      { ad: "Hata tekrar üretme", kanit: "Adım 2'deki en kısa adım listeleri." },
      { ad: "Kanıt toplama", kanit: "Adım 3'teki görüntü, kayıt ve konsol notu." },
      { ad: "Önceliklendirme", kanit: "Adım 4'teki önem-öncelik tablosu." }
    ],
    telafi: "K1 tutmazsa adım 1'e dön ve şablonu yeniden doldur; K3 tutmazsa adım 2'deki adımları sadeleştirip adım 6'daki incelemeyi tekrar yap; K5 tutmazsa adım 3'e dönüp eksik kanıtları topla.",
    sonraki: "K1, K3 ve K5 tutarsa ve ilk iki savunma sorusunu kendi raporlarınla cevaplarsan qa1c (keşif testi oturumu) ve qa2 için hazırsın; tamamlama kanıt kaydı olarak panon ve notların kaydedilir."
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
      ["Oturumu çalıştır ve not tut", "Oturum 45 dakika gibi kutulanmış zamandır. Not üç kısma ayrılır: bulgu, soru, fikir. Analoji: dedektif defteri; her şeyi yazmak yerine işe yarayanları işaretlersin.", "Birinci charter ile 45 dakikalık oturum yap. Notları 'Bulgu / Soru / Test fikri' olarak üç sütunda tut. Kronometreyle süreyi ve gerçek test süresini ayır.", "45 dakikalık oturum notu", "session = oturum, time-box = süre kutusu, note = not, bug = hata", "session based test management notes template"],
      ["Sezgisel kurallar: hatayı nerede ararsın", "Boş, çok uzun, özel karakter, geri tuşu, iki sekme: bunlar sezgisel kurallardır. Analoji: hırsız gibi kapı ve pencereleri tek tek yoklamak.", "The Internet (Herokuapp demo) sitesinde bir form sayfası seç. 10 sezgisel kuralı sırayla uygula ve her birinin sonucunu işaretle. İkinci oturumu bu sayfa ile yap.", "10 kuralın sonuç tablosu", "heuristic = sezgisel kural, edge case = uç durum, input = girdi, special characters = özel karakterler", "software testing heuristics cheat sheet"],
      ["Debrief: oturumu anlat", "Debrief oturum sonunda 10 dakikalık özettir: ne denedim, ne buldum, neyi test edemedim, sıradaki adım ne. Karar verici tüm notlarını okumaz, özetini okur.", "İki oturumun özetini 1 sayfada yaz: bulgular, açık sorular, kapsam dışı kalan yerler, risk. Sesli 3 dakika anlat. 'Test results show...' ile başlayan bir İngilizce cümle ekle.", "1 sayfalık debrief ve provası", "debrief = oturum sonu özeti, coverage = kapsam, open question = açık soru, risk = risk", "exploratory testing debrief report example"]
    ],
    onkosul: ["Önkoşul yok: bir web sitesini tarayıcıda kullanmayı bilmen yeterli.", "İsteğe bağlı: qa1 (Manuel Test: İlk Test Planım) projesindeki test senaryosu kavramı karşılaştırma için yardımcı olur.", "Not tutma alışkanlığı yeterli; ek araç bilgisi gerekmez."],
    gereksinim: [
      "İşlevsel (zorunlu): 3 charter yazılır; her biri hedef, yöntem ve beklenen bilgiden oluşur.",
      "İşlevsel (zorunlu): 2 oturum yapılır; her biri en az 30 dakikalık gerçek test süresi içerir.",
      "İşlevsel (zorunlu): Oturum notları bulgu, soru ve test fikri olarak ayrılır.",
      "İşlevsel (zorunlu): 1 sayfalık debrief yazılır.",
      "İşlevsel (isteğe bağlı): Bir bulguyu hata raporuna çevirirsin.",
      "İşlevsel olmayan: Süre kutusu kronometreyle ölçülür ve dosyada belirtilir.",
      "İşlevsel olmayan: Yalnız herkese açık demo siteleri kullanılır; hesap bilgisi girilmez."
    ],
    kabul: [
      "K1: 3 charter 'neyi, nasıl, hangi amaçla' içeriyor | Test: Her charter'da üç parçayı renkli kalemle işaretle.",
      "K2: İki oturumun gerçek test süresi en az 30 dakika ve kayıtlı | Test: Not başına başlangıç-bitiş saati yazılı olmalı.",
      "K3: Notlarda en az 5 bulgu, 3 soru, 3 test fikri var | Test: Üç sütunu say.",
      "K4: 10 sezgisel kuralın her biri için sonuç yazılı | Test: Tabloda boş satır olmamalı.",
      "K5: Debrief hem 'test edemediklerim'i hem riski içeriyor | Test: Bu iki başlığın altını oku, dolu olmalı."
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
      { ad: "Gözlem ve not tutma", kanit: "Adım 3'teki 45 dakikalık oturum notu." },
      { ad: "Sezgisel test tasarımı", kanit: "Adım 4'teki 10 kuralın sonuç tablosu." },
      { ad: "Test sonucu sunumu", kanit: "Adım 5'teki 1 sayfalık debrief ve sesli prova." }
    ],
    telafi: "K1 tutmazsa adım 2'ye dönüp charter'ları yeniden yaz; K2 veya K3 tutmazsa adım 3'ü yeni bir 45 dakikalık oturumla tekrar et; K4 tutmazsa adım 4'teki kural tablosunu eksiksiz doldur; K5 tutmazsa adım 5'te debrief'e risk ve kapsam dışı bölümlerini ekle.",
    sonraki: "K2, K3 ve K5 tutarsa ve ilk iki savunma sorusunu notlarınla cevaplarsan qa1d ve qa2'ye geçiş için kilit açılır; tamamlama kanıt kaydı olarak charter ve debrief'in saklanır."
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
      ["Kendi test formunu hazırla", "Test için kontrol edebileceğin bir hedef şart. Kendi bilgisayarında çalışan 5 alanlı bir HTML formu (ad, e-posta, yaş, telefon, mesaj) gerçek veri göndermeden uygulama gibi davranır.", "Kendi bilgisayarında bir form.html dosyası yaz veya şablonundan kopyala; alanlarda 'required' ve 'maxlength' kuralları olsun. Tarayıcıda dosyayı aç. Hiçbir sunucuya veri gönderilmediğini doğrula.", "Çalışan form.html", "form = form, input field = girdi alanı, validation = doğrulama, required = zorunlu", "simple html form required maxlength example"],
      ["Sentetik test verisi tablosu", "Gerçek kişi verisi kullanma. Uydurma ama gerçekçi veri üret: geçerli, geçersiz, sınır, boş, çok uzun, özel karakter. Analoji: kalıp yemeği için farklı boyda tavalar hazırlamak.", "Her alan için en az 6 veri satırı hazırla (geçerli, boş, sınır, çok uzun, özel karakter, boşluk). Sheets'te alan, değer, sınıf, beklenen sonuç sütunları kullan. Toplam en az 30 satır.", "30+ satırlı test verisi tablosu", "test data = test verisi, synthetic data = sentetik veri, boundary = sınır, invalid = geçersiz", "test data design form fields valid invalid boundary"],
      ["Tabloyu çalıştır ve sonucu yaz", "Beklenen ve gerçekleşen yan yana durunca fark kolay görülür. Geçti/Kaldı yanında 'Yorum' sütunu hatayı tarif eder.", "30 veri satırını form.html üzerinde dene, 'Gerçekleşen' ve 'Sonuç' sütunlarını doldur. Kalan satırlardan en az 2 gerçek davranış farkını (örn. çok uzun metin kabul edildi) hata olarak yaz.", "Sonuçları dolu tablo ve 2 bulgu", "actual = gerçekleşen, pass = geçti, fail = kaldı, defect = kusur", "manual test execution log spreadsheet"],
      ["Listeyi genelleştir ve ikinci forma uygula", "İyi liste hedefe özel değil, tür için yazılmıştır. Başka bir forma uygulayınca neresinin genel, neresinin özel olduğunu görürsün.", "Kontrol listeni 12 maddeye genelleştir. The Internet demo sitesindeki bir form sayfasında (örn. login) uygula. Hangi maddelerin uymadığını ve nedenini yaz.", "12 maddelik liste ve ikinci form sonucu", "generic = genel, applicable = uygulanabilir, coverage = kapsam, reuse = yeniden kullanım", "web form testing checklist"]
    ],
    onkosul: ["Önkoşul yok: tarayıcı kullanmayı ve bir metin düzenleyici ile dosya kaydetmeyi bilmen yeterli.", "İsteğe bağlı: qa1 (Manuel Test: İlk Test Planım) projesindeki sınır değer ve eşdeğer sınıf adımı bu projeyi hızlandırır.", "Basit bir HTML formu şablonu hazır verilir; yazmak için HTML bilmen gerekmez."],
    gereksinim: [
      "İşlevsel (zorunlu): Kendi bilgisayarında çalışan 5 alanlı bir form kurulur.",
      "İşlevsel (zorunlu): Test verisi tablosunda en az 30 sentetik satır bulunur; hiçbiri gerçek kişiye ait değildir.",
      "İşlevsel (zorunlu): Tablo çalıştırılır; beklenen, gerçekleşen ve sonuç sütunları doldurulur.",
      "İşlevsel (zorunlu): En az 12 maddelik genel kontrol listesi yazılır.",
      "İşlevsel (isteğe bağlı): Veri tablosunu CSV olarak dışa aktarırsın.",
      "İşlevsel olmayan: Her tablo satırı tek bir koşulu sınar.",
      "İşlevsel olmayan: Hiçbir gerçek kişi verisi, e-posta veya telefon kullanılmaz."
    ],
    kabul: [
      "K1: Veri tablosunda 5 alanın her biri için en az 6 sınıf var | Test: Alanları süz ve sınıf sayısını say.",
      "K2: 30+ satırın hepsinde 'Gerçekleşen' ve 'Sonuç' dolu | Test: Sütunda boş hücre sayısı 0 olmalı.",
      "K3: En az 2 gerçek davranış farkı hata olarak yazılmış | Test: Kalan satırları aç, bulguyu bul.",
      "K4: Kontrol listesi iki ayrı forma uygulanmış, uymayan maddeler gerekçeli | Test: İki sonuç kolonunu karşılaştır.",
      "K5: Veri tablosunda gerçek kişi bilgisi yok | Test: E-posta ve telefon alanlarını gözle tara, hepsi uydurma görünmeli."
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
      { ad: "Kontrol listesi hazırlama", kanit: "Adım 5'teki 12 maddelik liste." },
      { ad: "Veri etiği bilinci", kanit: "Adım 3 ve K5 kapsamındaki sentetik veri notu." }
    ],
    telafi: "K1 tutmazsa adım 3'e dönüp eksik sınıfları ekle; K2 veya K3 tutmazsa adım 4'te tabloyu yeniden çalıştır; K4 tutmazsa adım 5'te listeyi iki forma yeniden uygula ve uymayanları gerekçelendir.",
    sonraki: "K1, K2 ve K4 tutarsa ve ilk iki savunma sorusunu cevaplarsan qa2 (Playwright E2E) ve qa2b projeleri için kilit açılır; tamamlama kanıt kaydı olarak tablo ve liste saklanır."
  });

  /* ===================== LV2 ===================== */

  K.yeni.push({
    yol: "qa", id: "qa2b", lv: 2,
    title: "API Test Koleksiyonu: Postman ve Newman ile",
    weeks: 3,
    tools: "Postman, Newman, JSONPlaceholder, Restful-Booker, JSON",
    why: "Arayüz çalışsa da servis yanlış cevap verebilir; API testi arayüzden daha hızlı ve kesindir. Postman ile koleksiyon yazıp Newman ile komut satırından koşturarak iki aracı birleştirirsin.",
    outcome: ["Ortam değişkenli bir API test koleksiyonu yazarsın", "Cevaplar için otomatik doğrulama betikleri kurarsın", "Koleksiyonu komut satırından çalıştırıp rapor üretirsin"],
    pitch: "I built a Postman collection with variables and assertions and ran it from the command line with Newman.",
    steps: [
      ["API, istek ve cevap", "API bir restoran garsonudur: sen siparişi söylersin (istek), mutfak cevap verir. Önemli parçalar yöntem, adres, başlık ve gövdedir. Cevapta durum kodu ve gövde olur.", "JSONPlaceholder (sahte, herkese açık API) ile 6 isteği Postman'da elle dene: GET, POST, PUT, PATCH, DELETE ve geçersiz adres. Her cevapta durum kodunu ve bir alanı not et.", "6 isteğin sonuç tablosu", "request = istek, endpoint = uç nokta, method = yöntem, header = başlık, status code = durum kodu", "postman beginner rest api request methods"],
      ["Koleksiyon ve ortam değişkeni", "Her isteğe tam adres yazarsan taşıma zor olur. Değişken ({{base_url}}) adresi ortamdan çeker: aynı koleksiyon yerelde de, demoda da çalışır. Analoji: fatura adresini her yerde tek tek yazmak yerine kayıt ekranı.", "Koleksiyon oluştur, klasörlere ayır (okuma, yazma, hata). base_url ve bir değişken daha tanımla. 10 isteği değişkenle çalışır hale getir.", "10 istekli koleksiyon ve ortam", "collection = koleksiyon, environment = ortam, variable = değişken, folder = klasör", "postman collection environment variables tutorial"],
      ["Doğrulama betikleri yaz", "Gözle bakmak ölçeklenmez. Postman 'Tests' sekmesinde JavaScript ile durum kodu, süre ve JSON alanı kontrolü yazarsın. Analoji: kontrol memuru elle bakmak yerine makineye sabit kural verirsin.", "Her istek için en az 2 doğrulama yaz: durum kodu ve bir JSON alanı. Toplam en az 20 doğrulama. Bilerek bir beklenen değeri yanlış yaz ve kırmızı olduğunu gör.", "20+ doğrulamalı koleksiyon", "assertion = doğrulama, test script = test betiği, JSON path = JSON yolu, response time = cevap süresi", "postman tests pm.test status code json assertions"],
      ["Zincirleme ve olumsuz test", "Gerçek akışlarda bir cevaptan değer alıp sonrakinde kullanırsın: önce oluştur, sonra o id ile oku. Olumsuz testler (yanlış veri, olmayan id, yetkisiz istek) hatayı doğru verdiğini sınar.", "Restful-Booker test API'sinde oluştur → oku → güncelle → sil akışını değişkenle zincirle. 5 olumsuz istek ekle (olmayan id, eksik alan, yetkisiz silme). Doğrulamaları ona göre yaz.", "Zincirli akış ve 5 olumsuz test", "chaining = zincirleme, negative test = olumsuz test, authorization = yetkilendirme, 4xx = istemci hatası", "postman chain requests environment variable negative testing"],
      ["Newman ile komut satırından çalıştır", "Newman Postman'ın komut satırı kardeşidir. Aynı koleksiyonu terminalden çalıştırıp rapor çıkarırsın; ileride CI'a koymak kolaylaşır.", "Koleksiyonu ve ortamı JSON olarak dışa aktar. Newman ile çalıştır ve HTML veya JSON raporu üret. Bir testi bilerek kır; raporda hatanın görünüp görünmediğini kontrol et.", "Dışa aktarılan dosyalar ve rapor", "Newman = komut satırı koşucu, export = dışa aktar, report = rapor, CI = sürekli tümleştirme", "newman run collection environment html report"],
      ["Belgeleme ve sınırlar", "API testi her şeyi kapsamaz. Yetki modeli, performans, veri tutarlılığı ayrı konulardır. Kapsam notu 'neyi test etmedim' sorusunun cevabıdır.", "Koleksiyonun README'sini yaz: neyi test eder, nasıl çalıştırılır, nelerin dışında kalır. Sahte API'nin (JSONPlaceholder) yazdıklarını kaydetmediği sınırını da yaz.", "README ve sınır listesi", "scope = kapsam, limitation = sınır, documentation = belgeleme, mock API = taklit API", "api test collection readme documentation"]
    ],
    onkosul: ["qa1 (Manuel Test: İlk Test Planım) projesinden test senaryosu ve hata raporu mantığını bilmen gerekir.", "HTTP durum kodlarını ve JSON biçimini temel düzeyde okuyabilmen beklenir; adım 1'de pekiştirilir.", "Temel JavaScript (değişken, if) bilgisi doğrulama betikleri için gerekir; çok az gerekir, örnek çıkarılır."],
    gereksinim: [
      "İşlevsel (zorunlu): Koleksiyonda en az 15 istek 3 klasörde (okuma, yazma, hata) bulunur.",
      "İşlevsel (zorunlu): Tüm istekler ortam değişkeni kullanır; sabit adres yoktur.",
      "İşlevsel (zorunlu): En az 20 doğrulama betiği yazılır.",
      "İşlevsel (zorunlu): Newman ile koşturulup rapor üretilir.",
      "İşlevsel (isteğe bağlı): Veri dosyası (CSV) ile iterasyon kurarsın.",
      "İşlevsel olmayan: Koleksiyon tek komutla yeniden çalıştırılabilir.",
      "İşlevsel olmayan: Yalnız herkese açık test API'leri ve kendi yerel API'n kullanılır; gerçek hesap veya anahtar yazılmaz."
    ],
    kabul: [
      "K1: Koleksiyonda 15+ istek ve 3 klasör var | Test: Koleksiyonu dışa aktar, istekleri ve klasörleri say.",
      "K2: Tüm adresler değişkenli | Test: Koleksiyon JSON'unda adresi ara; sabit tam adres bulunmamalı.",
      "K3: 20+ doğrulama var ve bilerek kırdığın en az 1 test kırmızı olmuştu | Test: Kırmızı ekran görüntüsü ve düzeltme notu kanıt notunda.",
      "K4: Olumsuz testlerde (en az 5) 4xx durum kodu bekleniyor ve doğrulanıyor | Test: İstekleri aç, beklenen kodları oku.",
      "K5: Newman raporu üretildi ve geçen/kalan sayısı raporda görünüyor | Test: Rapor dosyasını aç, sayıları oku."
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
      { ad: "Akış ve olumsuz test", kanit: "Adım 4'teki zincirli akış ve 5 olumsuz test." },
      { ad: "Komut satırı otomasyonu", kanit: "Adım 5'teki Newman raporu." }
    ],
    telafi: "K1 veya K2 tutmazsa adım 2'ye dön ve adresleri değişkene taşı; K3 tutmazsa adım 3'te doğrulamaları yeniden yaz; K4 tutmazsa adım 4'teki olumsuz istekleri tamamla; K5 tutmazsa adım 5'te dışa aktarımı ve Newman çalıştırmasını tekrar et.",
    sonraki: "K3, K4 ve K5 tutarsa ve ilk iki savunma sorusunu cevaplarsan qa3 (API, performans ve CI/CD) ve qa2d için kilit açılır; tamamlama kanıt kaydı olarak koleksiyon ve rapor saklanır."
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
      ["Hedef sayfayı hazırla", "Test için bilerek bozuk bir sayfa lazım. Kendi bilgisayarında bir HTML sayfası: başlık, görsel, form, buton ve bir bağlantı. Hataları kendin eklersin: alt metinsiz görsel, etiketsiz alan, düşük kontrast.", "Kendi bilgisayarında test.html yaz. İçinde en az 5 bilerek erişilebilirlik hatası bulunsun (örn. alt metinsiz görsel, etiketsiz input, tıklanabilir div, düşük kontrast, başlık atlaması). Hataları gizli bir listeye yaz.", "test.html ve gizli hata listesi", "alt text = alternatif metin, label = etiket, contrast = kontrast, heading = başlık", "accessible html form label alt text example"],
      ["Klavye testi", "Fare yok: Tab ile ilerle, Shift+Tab ile geri dön, Enter/Space ile etkinleştir. Odak görünür mü, sıra mantıklı mı, takıldığın yer var mı? Analoji: gözü kapalı evde yürümek.", "Sayfayı yalnız klavyeyle kullan. Odak sırasını, odak göstergesini ve etkinleştirilemeyen öğeleri tablo olarak yaz. En az 3 sorun bulmuş ol.", "Klavye testi tablosu", "keyboard focus = klavye odağı, tab order = sekme sırası, focus indicator = odak göstergesi, keyboard trap = klavye tuzağı", "keyboard accessibility testing tab order focus"],
      ["Otomatik tarama: axe ve Lighthouse", "Araçlar bazı hataları anında bulur ama her şeyi bulamaz: anlam ve sıra kararları insan ister. İki aracın çıkarını karşılaştırmak neyi kaçırdıklarını gösterir.", "test.html üzerinde axe ve Lighthouse erişilebilirlik taramasını çalıştır. Her aracın bulduklarını gizli listenle karşılaştır; hangi hataları bulamadı, yaz.", "Karşılaştırma tablosu", "automated scan = otomatik tarama, violation = ihlal, false negative = kaçırılan hata, audit = denetim", "axe devtools lighthouse accessibility audit comparison"],
      ["Ekran okuyucu ile dinle", "Ekran okuyucu sayfayı sesle okur. Etiketsiz alan 'düzenleme kutusu' der ama ne istediğini söylemez. Analoji: kapıları numarasız dolaşan otel.", "NVDA (Windows) veya VoiceOver (Mac) ile sayfayı dinle. Başlık gezinmesini, form etiketlerini ve görsel okunuşunu dene. Okuyucunun yanlış veya eksik söylediği 3 yeri yaz.", "Ekran okuyucu dinleme notu", "screen reader = ekran okuyucu, landmark = sayfa bölgesi, announce = sesli okumak, aria-label = erişilebilir ad", "nvda screen reader basics testing a web page"],
      ["Düzelt ve önce-sonra karşılaştır", "Düzeltme testi tamamlar: hatanın gerçekten gittiğini kanıtlarsın. Önce-sonra tablo, savunma için en güçlü kanıttır.", "En az 5 hatayı düzelt. Klavye, axe ve ekran okuyucuyla yeniden test et. Önce/sonra tablosuna ihlal sayısı, klavye engeli ve okuyucu sorunu sütunları koy.", "Önce-sonra tablosu", "remediation = düzeltme, regression = geri dönüş, before/after = önce/sonra, report = rapor", "accessibility remediation before after report"]
    ],
    onkosul: ["qa1 (Manuel Test: İlk Test Planım) projesinden hata raporu ve test senaryosu yazma bilgisi.", "Temel HTML etiketlerini (başlık, form, img, button) tanımak gerekir; adım 2'de şablon verilir.", "Chrome DevTools'u açmayı bilmen beklenir."],
    gereksinim: [
      "İşlevsel (zorunlu): Kendi test sayfasında en az 5 bilinen erişilebilirlik hatası bulunur.",
      "İşlevsel (zorunlu): Klavye testi tablosu hazırlanır.",
      "İşlevsel (zorunlu): axe ve Lighthouse sonuçları karşılaştırılır.",
      "İşlevsel (zorunlu): Ekran okuyucu ile en az 3 sorun belgelenir.",
      "İşlevsel (zorunlu): En az 5 hata düzeltilip önce-sonra tablosu çıkarılır.",
      "İşlevsel (isteğe bağlı): Kontrast oranını bir araçla ölçersin.",
      "İşlevsel olmayan: Test yalnız kendi sayfanda ve herkese açık demo sayfalarda yapılır; kişisel veri girilmez."
    ],
    kabul: [
      "K1: Klavye tablosunda en az 3 sorun, odak sırası ve odak göstergesi bilgisi var | Test: Tabloyu kontrol et.",
      "K2: axe ve Lighthouse'un kaçırdığı en az 1 hata gizli listeyle karşılaştırılarak yazılmış | Test: Karşılaştırma satırını göster.",
      "K3: Ekran okuyucu notunda 3 sorun için okuyucunun söylediği cümle alıntılı | Test: Notu oku, alıntıları say.",
      "K4: En az 5 hata düzeltildi ve her biri yeniden test edildi | Test: Önce-sonra tablosunda her satırda 'sonra' sütunu dolu olmalı.",
      "K5: Düzeltme sonrası axe ihlal sayısı öncekinden düşük | Test: İki taramanın ekran görüntüsünü yan yana koy."
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
      { ad: "Araç destekli denetim", kanit: "Adım 4'teki axe ve Lighthouse karşılaştırması." },
      { ad: "Yardımcı teknoloji gözlemi", kanit: "Adım 5'teki ekran okuyucu dinleme notu." },
      { ad: "Düzeltme doğrulama", kanit: "Adım 6'daki önce-sonra tablosu." }
    ],
    telafi: "K1 tutmazsa adım 3'te klavye testini baştan yap; K2 tutmazsa adım 4'te iki aracı tekrar çalıştırıp gizli listeyle karşılaştır; K3 tutmazsa adım 5'te ekran okuyucu dinlemesini tekrar et; K4 veya K5 tutmazsa adım 6'ya dönüp düzeltmeleri yeniden yap.",
    sonraki: "K2, K4 ve K5 tutarsa ve ilk iki savunma sorusunu cevaplarsan qa2d ve qa3b için kilit açılır; tamamlama kanıt kaydı olarak önce-sonra tablon saklanır."
  });

  K.yeni.push({
    yol: "qa", id: "qa2d", lv: 2,
    title: "Kararsız Test Onarımı: Flaky Testleri Teşhis Etmek",
    weeks: 3,
    tools: "Python, pytest, Playwright, Git, GitHub Actions",
    why: "Bazen geçip bazen kalan test ekibin güvenini yer; herkes 'yine kırmızı, tekrar çalıştır' demeye başlar. Bilerek kararsız yazılmış testleri teşhis edip kalıcı biçimde onarırsın.",
    outcome: ["Kararsız testi 20 koşuda ölçüp kök nedenini bulursun", "Bekleme, veri ve sıra bağımlılığı sorunlarını düzeltirsin", "Onarımı tekrarlı koşuyla kanıtlarsın"],
    pitch: "I diagnosed flaky Playwright tests, fixed their root causes and proved stability with repeated runs.",
    steps: [
      ["Kararsız test nedir?", "Aynı kodda bazen geçen bazen kalan test, hatalı pusulaya benzer: hangi yöne gideceğini bilmezsin. Nedenleri genelde bekleme, ortak veri, sıra bağımlılığı, zaman ve ağdır.", "Beş nedeni tabloya yaz (bekleme, ortak veri, sıra bağımlılığı, saat/zaman, dış servis) ve her biri için bir günlük hayat benzetmesi ve bir belirti ekle.", "5 nedenli tablo", "flaky test = kararsız test, root cause = kök neden, race condition = yarış durumu, determinism = belirlilik", "flaky tests causes explained"],
      ["Kararsız örnek paketini kur", "Teşhis için hasta lazım. 6 küçük test yazarsın; üçü bilerek kararsız olsun: sabit sleep ile bekleyen, başka testin verisine bağımlı, sıra bağımlı.", "Kendi bilgisayarında küçük bir HTML sayfası (gecikmeli yüklenen metin) kur veya The Internet demo sitesinin dinamik yükleme sayfasını kullan. 6 testlik pytest + Playwright paketi yaz; 3'ü bilerek kararsız olsun.", "6 testlik paket", "sleep = sabit bekleme, shared state = ortak durum, test order = test sırası, dynamic loading = dinamik yükleme", "playwright python flaky example sleep dynamic loading"],
      ["Ölç: 20 koşuyla istatistik", "Kararsızlığı 'sanki' diye değil ölçerek söylersin. Paketi tekrar tekrar koşturup her testin kaç kez kaldığını kaydedersin. Analoji: zarın hileli mi olduğunu çok kez atarak anlamak.", "Paketi 20 kez çalıştır (döngü veya tekrar eklentisi). Test adı, geçti sayısı, kaldı sayısı sütunlarıyla tablo yap. En kararsız 3 testi ayır.", "20 koşuluk sonuç tablosu", "repeat = tekrar, pass rate = geçme oranı, retry = yeniden deneme, quarantine = karantina", "pytest repeat run tests multiple times flaky"],
      ["Kök nedeni bul", "Tekrar çalıştırmak çözüm değildir. Trace ve günlükle kırılma anına bakarsın: element henüz yok mu, başka test veriyi bozdu mu, saat mi etkiledi?", "En kararsız 3 testin kırılma izini (trace/ekran görüntüsü) aç. Her biri için kök neden cümlesini yaz: 'Test, ... olmadan ... yaptığı için kalıyor'. Gerekirse testi yalnız çalıştırıp ortaya çıkanı karşılaştır.", "3 testin kök neden notu", "trace = iz kaydı, wait = bekleme, isolation = yalıtım, dependency = bağımlılık", "playwright trace viewer debug flaky test root cause"],
      ["Kalıcı onar", "Doğru düzeltme sabit bekleme koymak değil, doğru koşulu beklemektir: öğe görünene kadar, istek bitene kadar. Ortak veriyi her teste kendi verisi ile yalıtırsın.", "Sabit sleep'leri koşul beklemesine çevir. Ortak veriyi her teste özel yap, sıra bağımlılığını kaldır. Retry eklemeden düzelt.", "Onarılmış paket", "auto-wait = otomatik bekleme, expect = beklenti, independent test = bağımsız test, fixture = hazırlık yapısı", "playwright expect auto wait replace sleep"],
      ["Kanıtla ve yaz", "Düzelttiğini 'bir kez geçti' ile kanıtlayamazsın. 20 koşu daha, aynı tabloyla. Sonuçları kısa bir ekip notuna dönüştür: ne kırıktı, neden, nasıl düzelttin, nasıl önlenir.", "Onarılmış paketi 20 kez çalıştır ve önceki tabloyla yan yana koy. 1 sayfalık 'Flaky test post-mortem' yaz; son bölümünde 3 önleme kuralı olsun.", "Önce-sonra tablosu ve post-mortem", "post-mortem = olay sonrası inceleme, prevention = önleme, stability = kararlılık, CI = sürekli tümleştirme", "flaky test postmortem best practices"]
    ],
    onkosul: ["qa2 (Otomasyon: Playwright ile E2E) projesindeki pytest ve Playwright temeli gerekir.", "Python'da temel kod okuma ve fonksiyon yazma bilgisi beklenir.", "qa1 (Manuel Test: İlk Test Planım) projesinden hata raporu yazma bilgisi post-mortem için yardımcıdır."],
    gereksinim: [
      "İşlevsel (zorunlu): 6 testlik pakette en az 3 test bilerek kararsız yazılır.",
      "İşlevsel (zorunlu): Paket 20 kez çalıştırılıp test başına geçme/kalma sayısı tabloya yazılır.",
      "İşlevsel (zorunlu): En az 3 kararsız test için kök neden yazılır.",
      "İşlevsel (zorunlu): Düzeltme sonrası paket 20 kez daha çalıştırılır.",
      "İşlevsel (isteğe bağlı): Aynı ölçümü GitHub Actions'ta da yaparsın.",
      "İşlevsel olmayan: Düzeltmede yeniden deneme (retry) veya sabit sleep yöntemi kullanılmaz.",
      "İşlevsel olmayan: Yalnız kendi yerel sayfan veya herkese açık demo siteleri kullanılır."
    ],
    kabul: [
      "K1: Önce tablosunda en az 3 testin kaldığı koşu sayısı sıfırdan büyük | Test: 20 koşuluk tabloyu aç, kalan sayısına bak.",
      "K2: Her kararsız test için kök neden tek cümleyle ve iz kaydı ekran görüntüsü ile belgeli | Test: Notu ve görüntüleri eşleştir.",
      "K3: Düzeltmede sabit sleep yok | Test: Kodda 'sleep' ara; sonuç boş olmalı.",
      "K4: Sonra tablosunda 20 koşunun hepsinde 3 test geçmiş | Test: İkinci 20 koşuluk tabloyu aç, kalan sayısı 0 olmalı.",
      "K5: Post-mortem 3 önleme kuralı içeriyor | Test: Son bölümü say."
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
      { ad: "Teknik iletişim", kanit: "Adım 6'daki post-mortem." }
    ],
    telafi: "K1 tutmazsa adım 2'de kararsız testleri yeniden kur; K2 tutmazsa adım 4'te iz kayıtlarını yeniden aç; K3 veya K4 tutmazsa adım 5'e dön ve beklemeyi koşula çevir; K5 tutmazsa adım 6'da post-mortem'e önleme kurallarını ekle.",
    sonraki: "K3, K4 ve K5 tutarsa ve ilk iki savunma sorusunu cevaplarsan qa3 ve qa3d (regresyon paketi optimizasyonu) için kilit açılır; tamamlama kanıt kaydı olarak iki tablo ve post-mortem saklanır."
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
      ["Risk puanlama matrisi", "Puanlamayı keyfi yapmamak için ölçüt belirlersin: etki 1-5 neye bakar (para, güven, kullanıcı sayısı), olasılık 1-5 neye bakar (karmaşıklık, değişim sıklığı). Ölçütü yazmak karar savunmanın temelidir.", "Etki ve olasılık için 5 basamaklı ölçekleri 1 cümleyle tanımla. 12 özelliği puanla, çarpımı hesapla, Sheets'te sırala. Isı haritası çiz.", "Ölçütlü puan tablosu ve ısı haritası", "risk matrix = risk matrisi, score = puan, criteria = ölçüt, heat map = ısı haritası", "risk assessment matrix testing scoring"],
      ["Derinlik ve test türü eşlemesi", "Her risk eşit değil: kritik riske derin test (senaryo, otomasyon, keşif), düşük riske hafif kontrol. Test türleri risk türüne uymalı: finansal hata → veri doğrulama, güven kaybı → keşif.", "Risk tablosuna 3 yeni sütun ekle: test türü (manuel, otomasyon, API, performans, erişilebilirlik), derinlik (kapsamlı/orta/hafif) ve gerekçe. En yüksek 4 risk için kapsamlı, en düşük 3 risk için hafif test öner.", "Eşlemeli strateji tablosu", "test depth = test derinliği, test type = test türü, rationale = gerekçe, trade-off = ödünleşim", "risk based testing test depth selection"],
      ["Giriş-çıkış kriteri ve zaman", "Strateji 'ne zaman başlarız, ne zaman biter' sorusuna da cevap verir. Zaman bütçesi sınırlı: yüksek risk önce test edilir, kalan süreye göre düşük risk kesilir.", "40 saatlik bir test bütçesi varsay. Riskleri saate böl. Giriş (test başlar) ve çıkış (yeterli) kriterlerini 3'er madde yaz. Bütçe yarıya inerse neyi keseceğini göster.", "Saat dağılımı ve 6 kriter", "entry criteria = giriş kriteri, exit criteria = çıkış kriteri, budget = bütçe, scope cut = kapsam kesme", "test strategy entry exit criteria example"],
      ["Stratejiyi yaz", "Karar vericiler uzun belge okumaz: bir sayfa, net karar, gerekçe, kalan risk. Analoji: asansörde yöneticiye iki dakikada anlatmak.", "1 sayfalık test stratejisi yaz: hedef, ilk 4 risk, yaklaşım, bütçe, kalan risk, öneri. Bir İngilizce özet paragraf ekle: 'We prioritised testing by risk...'.", "1 sayfalık strateji", "test strategy = test stratejisi, residual risk = kalan risk, stakeholder = paydaş, recommendation = öneri", "one page test strategy template risk based"],
      ["Karşı sorgu ve revizyon", "Strateji, başkası itiraz edince sınanır: 'neden ödeme değil de giriş?' gibi. Puanlama ve gerekçe tutarlıysa savunursun, değilse revize edersin.", "Bir kişiden stratejini en az 3 soru ile sorgulamasını iste (kimse yoksa 3 itirazı kendine yaz). Cevaplarını yaz; puanı veya kararı değiştirdiysen önce-sonra notu ekle.", "3 itiraz-cevap ve revizyon notu", "challenge = itiraz, defend = savunmak, revise = revize etmek, assumption = varsayım", "test strategy review questions stakeholders"]
    ],
    onkosul: ["qa1 (Manuel Test: İlk Test Planım) projesindeki test senaryosu ve test seviyeleri bilgisi.", "qa2 (Otomasyon: Playwright ile E2E) veya qa3 (API, Performans ve CI/CD) projelerinden en az birinin kavramsal bilgisi, test türlerini seçmek için gerekir.", "Spreadsheet'te çarpma, sıralama ve basit grafik yapabilmek gerekir."],
    gereksinim: [
      "İşlevsel (zorunlu): 12 özellik için olasılık ve etki puanı, yazılı ölçütle verilir.",
      "İşlevsel (zorunlu): Her özellik için test türü, derinlik ve gerekçe belirtilir.",
      "İşlevsel (zorunlu): 40 saatlik bütçe risklere dağıtılır ve yarı bütçe senaryosu yazılır.",
      "İşlevsel (zorunlu): 1 sayfalık strateji belgesi hazırlanır.",
      "İşlevsel (isteğe bağlı): Risk ısı haritasını görsel olarak çizersin.",
      "İşlevsel olmayan: Her puan için gerekçe cümlesi yazılır.",
      "İşlevsel olmayan: Hedef yalnız herkese açık demo mağaza sitesidir; gerçek müşteri verisi kullanılmaz."
    ],
    kabul: [
      "K1: Ölçek tanımları (etki 1-5, olasılık 1-5) ayrı yazılmış | Test: Tabloda iki ölçüt bölümünü göster.",
      "K2: 12 özelliğin hepsinde puan, test türü, derinlik, gerekçe dolu | Test: Sheets'te boş hücre sayısı 0 olmalı.",
      "K3: Saat dağılımının toplamı 40 ve yarı bütçe için kesilenler listelenmiş | Test: Toplamı Sheets'te hesapla.",
      "K4: Strateji tek sayfa ve 'kalan risk' bölümü içeriyor | Test: Belgeyi aç, sayfa sayısını ve bölüm başlıklarını kontrol et.",
      "K5: En az 3 itiraz cevaplanmış ve gerekirse karar değiştirilmiş | Test: İtiraz-cevap notunu say."
    ],
    rubrik: [
      { olcut: "Puanlama ölçütü", guclu: "Ölçekler somut göstergelere bağlı ve tüm özelliklerde tutarlı uygulanmış.", zayif: "Puanlar sezgisel, ölçüt yok." },
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
      { ad: "Risk analizi", kanit: "Adım 2'deki ölçütlü puan tablosu ve ısı haritası." },
      { ad: "Test stratejisi tasarımı", kanit: "Adım 3'teki eşlemeli strateji tablosu." },
      { ad: "Kaynak planlama", kanit: "Adım 4'teki saat dağılımı ve kriterler." },
      { ad: "Paydaşa sunum ve savunma", kanit: "Adım 5'teki 1 sayfalık strateji ve adım 6'daki itiraz notu." }
    ],
    telafi: "K1 veya K2 tutmazsa adım 2 ve 3'e dön, ölçütleri ve eşlemeyi tamamla; K3 tutmazsa adım 4'te saat dağılımını yeniden yap; K4 tutmazsa adım 5'te belgeyi tek sayfaya indir; K5 tutmazsa adım 6'daki itirazları gerçek bir kişiyle tekrar et.",
    sonraki: "K2, K3 ve K5 tutarsa ve ilk üç savunma sorusunu cevaplarsan qa3c ve qa4 (kapston) için kilit açılır; tamamlama kanıt kaydı olarak strateji belgesi saklanır."
  });

  K.yeni.push({
    yol: "qa", id: "qa3c", lv: 3,
    title: "Kalite Metrikleri Panosu: Doğru Soruyu Ölçmek",
    weeks: 4,
    tools: "SQLite, SQL, Google Sheets veya Python, sentetik CSV verisi",
    why: "Ekipler 'kaç test yazdık' gibi yanıltıcı sayılarla kalite hakkında konuşur. Sentetik bir test sonuç veri setinden hangi kararlara hizmet eden metrikleri seçip pano kurduğunu ve her metriğin sınırını savunursun.",
    outcome: ["Karar odaklı 5 kalite metriği tanımlarsın", "SQL ile metrikleri sentetik veriden hesaplarsın", "Panoyu kurup yanıltıcı kullanımı savunmada açıklarsın"],
    pitch: "I defined quality metrics, computed them with SQL on synthetic test data and built a dashboard that explains their limits.",
    steps: [
      ["Hangi karar için ölçüyorsun?", "Metrik bir soruya cevap vermeli: 'çıkabilir miyiz?', 'test paketimiz güvenilir mi?'. Sorusuz ölçüm hız göstergesi gibi tek başına anlamsız. Analoji: arabada yalnız yakıt göstergesi olması.", "3 karar sorusu yaz (çıkış, paket güveni, hata maliyeti). Her biri için 2 aday metrik öner ve ölçmenin nasıl yanıltabileceğini 1 cümleyle belirt.", "3 soru ve 6 aday metrik", "metric = metrik, KPI = anahtar gösterge, vanity metric = yanıltıcı süs metrik, decision = karar", "software quality metrics useful vs vanity"],
      ["Sentetik veri seti üret", "Gerçek ekip verisine ihtiyacın yok: kendi ürettiğin tutarlı veri tablosu yeterli. Gerçek hayatı taklit eder: çalıştırma, hata, kapanış tarihi, önem, modül.", "Kendi betiğinle veya elle 200 satırlık iki CSV üret: test çalıştırmaları (id, modül, sonuç, süre, tarih) ve hatalar (id, modül, önem, açılış, kapanış). Veriyi 'sentetik' diye etiketle. Bir tablo SQLite'a yükle.", "İki CSV ve SQLite dosyası", "synthetic data = sentetik veri, schema = şema, import = içe aktarma, dataset = veri seti", "generate synthetic csv test results python sqlite import"],
      ["SQL ile metrikleri hesapla", "Aynı veri farklı sorgularla farklı hikaye anlatır. Hata yoğunluğu modül başına, hata kapanış süresi, geçme oranı ve kararsız test oranı farklı sorular yanıtlar.", "5 metrik için SQL yaz: modül başına açık kritik hata, ortalama hata kapanış süresi, haftalık geçme oranı, tekrar açılan hata oranı, kararsız test sayısı. Her sorgunun sonucunu tabloya yaz.", "5 SQL sorgusu ve sonuç tablosu", "aggregate = toplulaştırma, group by = gruplama, defect density = hata yoğunluğu, lead time = bekleme süresi", "sql group by aggregate defect metrics"],
      ["Panoyu kur", "İyi pano az sayıda net grafiktir: eğilim için çizgi, karşılaştırma için çubuk. Her grafiğin yanına 'bu ne söylüyor, ne söylemiyor' notu koyarsın.", "Sheets veya Python ile 1 sayfalık pano kur: 5 grafik, her birine başlık, tek cümle yorum ve sınır notu. Renkler eşik değerini göstermeli; eşiği yazılı gerekçeyle belirle.", "Pano ve sınır notları", "dashboard = pano, trend = eğilim, threshold = eşik, chart = grafik", "quality dashboard design charts trends threshold"],
      ["Yanıltıcı kullanımı sına", "Her metrik oyuna açıktır: 'çok hata bulana ödül' ekibe gereksiz hata açtırır. Goodhart yasası: ölçü hedef olunca iyi ölçü olmaktan çıkar. Bunu veriyle gösterirsin.", "Bir metriğin kötüye kullanımını simüle et: örn. kapanış süresini kısaltmak için hataları 'çözüldü' yapıp yeniden aç. Veriyi değiştir, metriğin nasıl iyi göründüğünü ama kalitenin kötüleştiğini göster.", "Önce-sonra grafiği ve açıklama", "gaming = metriği oyunlamak, Goodhart's law = Goodhart yasası, incentive = teşvik, bias = yanlılık", "goodharts law software metrics gaming"],
      ["Sunum ve sınır belgesi", "Panoyu kullananlar sınırı bilmeli: örnek büyüklüğü, tanım, eksik veri. Yazılı 'bu metrik şunu söylemez' cümlesi güveni artırır.", "1 sayfalık 'metrik sözlüğü' yaz: tanım, formül, kaynak, sınır, kötüye kullanım riski. 3 dakikalık İngilizce sunum provası yap: 'This metric shows... but it does not show...'.", "Metrik sözlüğü ve prova", "definition = tanım, limitation = sınır, data source = veri kaynağı, communication = iletişim", "metrics glossary definition formula limitations"]
    ],
    onkosul: ["qa3 (Kalite Stratejisi: API, Performans ve CI/CD) projesinden SQL ile veri sorgulama temeli veya eşdeğer SQL bilgisi gerekir.", "qa1 (Manuel Test: İlk Test Planım) projesinden hata yaşam döngüsü ve test sonucu kavramları.", "Google Sheets'te grafik oluşturmayı bilmek gerekir."],
    gereksinim: [
      "İşlevsel (zorunlu): Sentetik iki tablo (çalıştırmalar ve hatalar) en az 200 satırla hazırlanır.",
      "İşlevsel (zorunlu): 5 metrik SQL ile hesaplanır.",
      "İşlevsel (zorunlu): 1 sayfalık panoda her grafiğin yorumu ve sınır notu bulunur.",
      "İşlevsel (zorunlu): En az 1 metriğin oyunlanması gösterilir.",
      "İşlevsel (zorunlu): Metrik sözlüğü yazılır.",
      "İşlevsel (isteğe bağlı): Panoyu Python grafik kütüphanesi ile üretirsin.",
      "İşlevsel olmayan: Veri açıkça 'sentetik' etiketlidir; gerçek bir ekip veya kişi adı geçmez."
    ],
    kabul: [
      "K1: Her metrik hangi karar sorusuna cevap verdiğini bir cümleyle söylüyor | Test: Sözlükte 'karar' sütununu kontrol et.",
      "K2: 5 SQL sorgusu çalışıyor ve sonuçları tabloda | Test: Sorguları SQLite'ta yeniden çalıştır, sonuçlar eşleşmeli.",
      "K3: Panoda her grafiğin altında 'ne söyler / ne söylemez' notu var | Test: 5 grafiği tek tek aç.",
      "K4: Oyunlama deneyi önce-sonra grafikle gösterilmiş ve kalite kaybı açıklanmış | Test: Önce ve sonra değerlerini karşılaştır.",
      "K5: Sözlükte her metriğin formülü, kaynağı ve sınırı yazılı | Test: Beş satırı ve dört sütunu say."
    ],
    rubrik: [
      { olcut: "Metrik seçimi", guclu: "Her metrik bir karara bağlı; vanity metrik açıkça elenmiş.", zayif: "Metrikler 'kolay ölçülen' diye seçilmiş." },
      { olcut: "Veri ve sorgu doğruluğu", guclu: "Sorgular tutarlı, sonuçlar elle kontrol edilmiş.", zayif: "Sonuçlar doğrulanmamış." },
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
      { ad: "SQL ile veri analizi", kanit: "Adım 3'teki 5 sorgu ve sonuç tablosu." },
      { ad: "Veri görselleştirme", kanit: "Adım 4'teki pano." },
      { ad: "Metrik eleştirisi", kanit: "Adım 5'teki oyunlama deneyi ve adım 6'daki metrik sözlüğü." }
    ],
    telafi: "K1 veya K5 tutmazsa adım 1 ve 6'ya dönüp karar ve sınır sütunlarını doldur; K2 tutmazsa adım 3'te sorguları yeniden yaz ve elle kontrol et; K3 tutmazsa adım 4'te her grafiğe yorum ekle; K4 tutmazsa adım 5'te deneyi yeniden kur.",
    sonraki: "K2, K4 ve K5 tutarsa ve ilk üç savunma sorusunu cevaplarsan qa3d ve qa4 (kapston) için kilit açılır; tamamlama kanıt kaydı olarak pano ve sözlük saklanır."
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
      ["Önce ölç: paket haritası", "Optimizasyon ölçmeden yapılmaz. Her testin süresi, kapsadığı özellik, kırılma geçmişi ve kararlılığı bir tabloya girer. Analoji: bavulu toplamadan önce eşyaları tartmak.", "qa2 projesindeki paketi veya kendi 30 testlik paketini (Sauce Demo ve kendi yerel sayfan) kullan. Her test için süre, özellik, öncelik ve son 10 koşudaki kalma sayısını tabloya yaz.", "30 satırlı paket haritası", "regression suite = regresyon paketi, duration = süre, coverage = kapsam, baseline = başlangıç ölçümü", "regression test suite optimization measure runtime"],
      ["Sınıflandır: etiketler", "Her test aynı değerde değildir: duman (çok hızlı, kritik yol), çekirdek (ana özellikler), tam (uç durum). pytest işaretleri (marker) ile etiketlenir, böylece seçili çalıştırılır.", "Her teste duman/çekirdek/tam etiketlerinden birini ver ve nedenini yaz. pytest işaretleri ile etiketleri koda ekle. Duman paketin 5 dakikayı geçmemesi hedeflensin.", "Etiketli paket ve gerekçe sütunu", "marker = işaret, smoke test = duman testi, critical path = kritik yol, tag = etiket", "pytest markers smoke regression selection"],
      ["Paralel çalıştır", "Testler birbirinden bağımsızsa aynı anda koşabilir: mutfakta tek aşçı yerine dört aşçı. Ama ortak veri paylaşan testler birbirini bozar; bu sorunlar yalıtım gerektirir.", "pytest-xdist ile paketi 1, 2, 4 işçiyle çalıştır. Her koşuda toplam süreyi ve kalan test sayısını yaz. Paralel kalan testlerin nedenini bul ve yalıt.", "Süre karşılaştırma tablosu", "parallel = paralel, worker = işçi, speedup = hızlanma, isolation = yalıtım", "pytest xdist parallel run speedup isolation"],
      ["Kararsız ve yinelenen testler", "Kararsız test paketi yavaşlatır ve güveni kırar; aynı şeyi sınayan iki test gereksiz sürer. Karantina kararsız testi paketin dışına alır ama silmez: onarım listesi tutulur.", "Kalan testlerden en kararsız 3'ünü karantinaya al ve nedenini yaz. Aynı şeyi sınayan 2 testi birleştir veya birini çıkar; kapsama etkisini yaz.", "Karantina listesi ve birleştirme notu", "quarantine = karantina, duplicate test = yinelenen test, redundancy = gereksiz tekrar, maintenance = bakım", "test suite pruning duplicate flaky quarantine"],
      ["CI'da katmanlı çalıştırma", "Her değişiklikte hızlı duman, geceleri tam paket. Böylece geri bildirim hızlı kalır, derin kontrol kaybolmaz. Analoji: kapıda hızlı kontrol, gece derin temizlik.", "GitHub Actions workflow dosyasında iki iş tanımla: her commit'te duman, zamanlanmış tam paket. Çalışmaların süresini ekran görüntüsüyle kaydet.", "İki işli workflow ve süre kaydı", "pipeline = hat, scheduled run = zamanlanmış çalıştırma, fast feedback = hızlı geri bildirim, nightly = gece çalıştırma", "github actions smoke on push full nightly pytest"],
      ["Risk ve kayıp raporu", "Optimizasyon bedava değildir: hızlandırırken kapsam ve güvenden ne kaybettin? Kaybı yazmak ekibin kararı bilinçli almasını sağlar.", "1 sayfalık rapor yaz: başlangıç süre, son süre, çıkarılan/karantinaya alınan testler, kaybedilen kapsam, kalan risk, öneri. En fazla bir tablo ve 1 İngilizce özet paragraf kullan.", "1 sayfalık optimizasyon raporu", "trade-off = ödünleşim, coverage loss = kapsam kaybı, residual risk = kalan risk, recommendation = öneri", "test suite optimization report trade-offs"]
    ],
    onkosul: ["qa2 (Otomasyon: Playwright ile E2E) projesindeki pytest ve Playwright paketi veya eşdeğer 30 testlik paket gerekir.", "qa2d (Kararsız Test Onarımı) projesindeki kararsızlık ölçümü ve kök neden bilgisi çok işe yarar.", "GitHub Actions workflow dosyası yazmayı temel düzeyde bilmek gerekir; qa2 adım 7'de yapılır."],
    gereksinim: [
      "İşlevsel (zorunlu): 30 testlik paketin süre, özellik, öncelik ve kararlılık tablosu çıkarılır.",
      "İşlevsel (zorunlu): Testler duman, çekirdek ve tam olarak etiketlenir.",
      "İşlevsel (zorunlu): Paket 1, 2 ve 4 işçiyle ölçülür.",
      "İşlevsel (zorunlu): En az 3 kararsız test karantinaya alınır ve en az 1 yinelenen test birleştirilir.",
      "İşlevsel (zorunlu): CI'da duman ve tam çalıştırma ayrı işlerdir.",
      "İşlevsel (isteğe bağlı): Süreyi grafiğe dökersin.",
      "İşlevsel olmayan: Duman paketi 5 dakikayı geçmez; ölçüm yerel veya CI'da yazılır."
    ],
    kabul: [
      "K1: Paket haritasında 30 satır ve 5 sütun dolu | Test: Tabloyu aç, boş hücre sayısı 0 olmalı.",
      "K2: Her teste bir etiket ve gerekçe verilmiş | Test: Kodda marker'ları listele, etiketsiz test kalmamalı.",
      "K3: 1, 2, 4 işçi süreleri yazılı ve 4 işçide test sonuçları yalnız kasıtlı karantina farkıyla aynı | Test: İki koşunun kalan listesini karşılaştır.",
      "K4: Karantina listesinde neden ve onarım planı var; birleştirilen testin kapsam etkisi yazılı | Test: Notları aç, 3 satır ve 1 birleştirme bul.",
      "K5: Rapor başlangıç ve son süreyi, kaybedilen kapsamı ve kalan riski içeriyor | Test: Rapor başlıklarını kontrol et."
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
      { ad: "Karar şeffaflığı", kanit: "Adım 6'daki optimizasyon raporu." }
    ],
    telafi: "K1 veya K2 tutmazsa adım 1 ve 2'ye dön, haritayı ve etiketleri tamamla; K3 tutmazsa adım 3'te yalıtımı onar ve ölçümü tekrarla; K4 tutmazsa adım 4'te karantina ve birleştirme gerekçelerini yaz; K5 tutmazsa adım 6'da raporu ödünleşimle yeniden yaz.",
    sonraki: "K3, K4 ve K5 tutarsa ve ilk üç savunma sorusunu cevaplarsan qa4 (kapston) için kilit açılır; tamamlama kanıt kaydı olarak harita, süre tablosu ve rapor saklanır."
  });

})(window);

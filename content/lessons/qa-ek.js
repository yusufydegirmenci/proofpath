/* QA yolu · Faz 5 tur 6: konu başına ders eki (anahtar = TMAP.qa dizini, 0–17).
   Benzetme + sınırı, rehberli alıştırma, bağımsız görev, yaygın hatalar, geçme ölçütü + kritik yanlış anlama,
   dış kaynak (son doğrulama tarihiyle), telafi/sonraki adım.
   Tüm alıştırmalar kâğıt üzerinde ya da kendi test ortamında yapılır; başkasının sistemine, canlı veriye ya da izinsiz yük/güvenlik denemesi yoktur.
   Dış kaynak: yalnız HTTP 200 dönenler (curl, 2026-10-12). Müfredat ayrıntısı (CTFL PDF) doğrulanamadığı için bağlantı verilmedi; sayfa var olan kaynaklar listelendi. */
(function () {
  var E = ((window.PP_EK = window.PP_EK || {}).qa = (window.PP_EK.qa || {}));
  var DOG = "2026-10-12";
  var K = function (t, u, neden) { return { t: t, u: u, dogrulama: DOG, neden: neden }; };
  var SOZLUK = K("ISTQB Sözlüğü (glossary.istqb.org)", "https://glossary.istqb.org/", "Test terimlerinin resmi tanımlarını aramak için; arama kutusuna terimi yaz.");
  var CTFL = K("ISTQB CTFL sertifika sayfası", "https://www.istqb.org/certifications/certified-tester-foundation-level", "Temel seviye sertifikanın kapsamı ve resmi müfredata giden sayfa.");

  E[0] = {
    analoji: { a: "Aşçı yemeği servise vermeden tadına bakar: tadına bakmak testtir, çorbanın neden tuzlu olduğunu bulup düzeltmek hata ayıklamadır.", sinir: "Tat zevke göre değişir; yazılımda 'doğru' davranışı gereksinim ve kabul kriteri tanımlar, kişisel beğeni değil." },
    rehberli: ["Gündelik bir yazılımdan (ör. alışveriş sepeti) bir hata zinciri kur: insan hatası → kusur → arıza; her halkayı bir cümleyle yaz.", "Aynı zinciri 'kusuru ne zaman bulursak maliyeti nasıl değişir?' sorusuyla yorumla: gereksinim aşamasında mı, canlıda mı?", "Test ile hata ayıklamanın çıktısını ayrı yaz: test neyi üretir (arıza gözlemi), hata ayıklama neyi üretir (kusurun yeri ve düzeltmesi)?"],
    bagimsiz: "Kullandığın bir uygulamada yaşadığın bir sorunu düşün (ör. yanlış tutar, çöken ekran). Hata (error), kusur (defect) ve arıza (failure) kavramlarını bu olay için ayrı ayrı tahmin et; hangisini sen gözlemledin, hangisi koda bakmadan bilinemez, yaz.",
    hatalar: [["Kusur ile arızayı aynı sanmak", "Kusur kodda ya da belgede durur; arıza o kusur çalışırken ortaya çıkan yanlış davranıştır. Her kusur arızaya yol açmaz."], ["Testi hata ayıklama sanmak", "Test arızayı gösterir; kusurun yerini bulup düzeltmek hata ayıklamadır ve genelde geliştiricinin işidir."], ["Testin amacını yalnız hata bulmak sanmak", "Test ayrıca güven sağlar, riski azaltır ve karar için bilgi verir; hata bulmak amaçlardan yalnız biridir."]],
    gecme: { olcut: "Mini sınavda %80 ve bir senaryoda hata, kusur, arıza ve test/hata ayıklama ayrımını doğru adlandırabilmek.", kritik: ["Testin yazılımın hatasız olduğunu kanıtladığını sanmak", "Kusur, arıza ve hata ayıklamayı birbirinin yerine kullanmak"] },
    kaynaklar: [SOZLUK],
    telafi: "Takıldıysan tek bir olay seç ve üç soru sor: Kim yanlış anladı (hata)? Kodda ne yanlış (kusur)? Kullanıcı ne gördü (arıza)?",
    sonraki: "Sıradaki konu: Test ilkeleri ve test süreci. Burada öğrendiğin kavramlar, o konuda yedi ilkeyi ve test süreci adımlarını yorumlamanın temelidir."
  };

  E[1] = {
    analoji: { a: "Doktor her hastaya aynı tüm tetkikleri istemez: şikâyete ve riske göre muayeneyi seçer, sağlıklı çıkan tetkik hastanın hiçbir sorunu olmadığını garanti etmez. Test de böyledir.", sinir: "Doktor aynı hastayı yıllarca izleyebilir; yazılım testinde zaman ve bütçe sınırlıdır ve her sürümde ürün değişir, bu yüzden önceliklendirme şarttır." },
    rehberli: ["Yedi ilkeyi kendi cümlelerinle bir kâğıda yaz (ör. 'Tam test mümkün değildir').", "Her ilke için bir günlük senaryo seç ve ilkeyle eşle (ör. 'aynı testler hep tekrarlanırsa yeni kusur bulmaz').", "Test sürecini planlama → izleme/kontrol → analiz → tasarım → gerçekleştirme → yürütme → tamamlama sırasıyla yaz ve bir gereksinimi (ör. şifre en az 8 karakter) test koşulu ve test senaryosuna ayır."],
    bagimsiz: "Bir giriş formu için şu gereksinimi al: 'Şifre en az 8 karakter olmalı.' Test koşulunu bir cümleyle, iki test senaryosunu (geçerli ve geçersiz) adım ve beklenen sonuçla yaz. Her senaryo için hangi ilkeyi desteklediğini belirt.",
    hatalar: [["Her şeyi test edebileceğini sanmak", "Girdi birleşimleri çok büyüktür; riske ve tekniklere göre seçilmiş testlerle çalışılır."], ["Test koşulu ile test senaryosunu karıştırmak", "Koşul 'neyi sınıyoruz' (şifre uzunluğu doğrulaması), senaryo 'nasıl sınıyoruz' (7 karakterli şifre gir, hata bekle) sorusunun cevabıdır."], ["Aynı testleri hiç değiştirmemek", "Sürekli aynı testler yeni kusur bulmaz; test seti gözden geçirilip yenilenmelidir."]],
    gecme: { olcut: "Mini sınavda %80 ve yedi ilkeyi senaryoyla eşleyip test süreci faaliyetlerini sırayla söyleyebilmek.", kritik: ["Hiç kusur bulunmamasını 'yazılımda kusur yok' diye yorumlamak", "Test koşulu, senaryo ve test verisi kavramlarını aynı sanmak"] },
    kaynaklar: [CTFL, SOZLUK],
    telafi: "Takıldıysan önce tek bir ilkeyi seç ve 'bunu günlük hayattan bir örnekle anlatabilir miyim?' diye sor; sonra süreç adımlarını yalnız sırasıyla yaz.",
    sonraki: "Sıradaki konu: Test seviyeleri, türleri ve regresyon. Süreçte 'test gerçekleştirme' ve 'yürütme' adımlarında hangi seviyede ne test edildiğini orada göreceksin."
  };

  E[2] = {
    analoji: { a: "Bir araba fabrikasında önce parçalar (bileşen), sonra parçaların birleşimi (entegrasyon), sonra tüm araba (sistem), en sonda müşterinin test sürüşü (kabul) denetlenir.", sinir: "Fabrikada seviyeler fiziksel sıradır; yazılımda seviyeler çoğu zaman paralel ve otomatik yürür, ayrıca düzeltmeden sonra eski özelliklerin tekrar sınanması (regresyon) gibi ihtiyaçlar vardır." },
    rehberli: ["Beş test seviyesini (bileşen, bileşen entegrasyonu, sistem, sistem entegrasyonu, kabul) küçük bir e-ticaret örneğinde birer cümleyle tanımla.", "Fonksiyonel, fonksiyonel olmayan, beyaz kutu ve değişiklik ile ilgili (onaylama, regresyon) test türlerini bir tabloya yaz ve her türe bir örnek ekle.", "Bir hata düzeltildi diye düşün: önce hangi testi (onaylama) yeniden koşarsın, sonra hangi testleri (regresyon) seçersin? Duman testiyle farkını yaz."],
    bagimsiz: "Bir sipariş sayfasında 'kupon uygulanınca toplam yanlış hesaplanıyor' hatası düzeltildi. Hangi seviyede ve hangi türde hangi testleri yapacağını listele; bunlardan hangileri onaylama, hangileri regresyon, hangisi duman testi olur, nedenini yaz.",
    hatalar: [["Onaylama ile regresyon testini karıştırmak", "Onaylama testi düzeltilen kusurun gerçekten giderildiğini, regresyon testi düzeltmenin başka yeri bozmadığını sınar."], ["Fonksiyonel olmayan testi atlamak", "Performans, güvenlik ve kullanılabilirlik gibi özellikler kullanıcı deneyimini belirler; yalnız 'çalışıyor mu' sorusu yetmez."], ["Seviyeleri sırayla bitirilen aşamalar sanmak", "Seviyeler farklı kusur türlerini yakalar ve çevik çalışmada iç içe, otomatik yürütülür."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen bir senaryoyu doğru seviye ve türe eşleyebilmek.", kritik: ["Regresyon testinin yalnız yeni özelliği sınadığını sanmak", "Kabul testinin geliştirici tarafından yapıldığını sanmak (kullanıcı ya da müşteri ihtiyacı doğrulanır)"] },
    kaynaklar: [SOZLUK],
    telafi: "Takıldıysan seviyeleri 'küçükten büyüğe' sırala; sonra her seviye için yalnız 'hangi kusur burada yakalanır?' sorusunu cevapla.",
    sonraki: "Sıradaki konu: Çevik testte QA'nın rolü. Seviyeleri ve regresyonu kısa döngülerde nasıl yürüttüğünü orada göreceksin."
  };

  E[3] = {
    analoji: { a: "Mutfakta yemek servise çıkmadan herkes tadına bakar, yalnız son kontrolcü değil. Çevik takımda da kaliteyi herkes üstlenir, QA bu işi kolaylaştıran ve sorular soran kişidir.", sinir: "Mutfakta tarif değişmez; çevik takımda her sprintte gereksinimler değişir, bu yüzden kabul kriterleri ve otomasyon sürekli güncellenir." },
    rehberli: ["Bir kullanıcı hikâyesi seç ('Kullanıcı olarak şifremi sıfırlamak istiyorum') ve Given-When-Then biçiminde iki kabul kriteri yaz.", "Aynı hikâye için QA olarak sorulacak üç soru yaz (ör. kayıtsız e-posta, süresi dolmuş bağlantı, art arda istek).", "Test piramidini çiz: birim, API/servis, arayüz katmanlarını ve her katmana düşen test sayısını ok ile göster."],
    bagimsiz: "Kendi sepet uygulamanda 'ürünü sepete ekle' hikâyesi için üç kabul kriteri yaz. Her biri için sola kaydırma (erken test) sağlayan bir soruyu hikâye toplantısında nasıl soracağını ve hangi katmanda otomatik test yazacağını belirt.",
    hatalar: [["Testi sprintin son gününe bırakmak", "Hikâye netleşirken ve geliştirme sürerken test etmek (sola kaydırma) kusuru ucuza bulur."], ["Kabul kriterini belirsiz bırakmak", "'Hızlı olmalı' gibi ölçülemeyen kriter test edilemez; sayı ve koşulla yaz."], ["Piramidin tepesine (arayüz testine) aşırı yüklenmek", "Arayüz testleri yavaş ve kırılgandır; çoğu mantık daha alt katmanlarda test edilmelidir."]],
    gecme: { olcut: "Mini sınavda %80 ve bir hikâye için Given-When-Then kriteri yazıp hangi katmanda test edileceğini söyleyebilmek.", kritik: ["QA'nın yalnız sprint sonunda test eden kişi olduğunu sanmak", "Sola kaydırmanın yalnız otomasyon demek olduğunu sanmak (gereksinimi netleştirmek de içindedir)"] },
    kaynaklar: [K("Atlassian: Kullanıcı hikâyeleri", "https://www.atlassian.com/agile/project-management/user-stories", "Hikâye yazımı ve kabul kriterleri için."), K("Martin Fowler: Practical Test Pyramid", "https://martinfowler.com/articles/practical-test-pyramid.html", "Test piramidinin pratik anlatımı."), K("Cucumber: BDD", "https://cucumber.io/docs/bdd/", "Davranış odaklı geliştirme ve Given-When-Then fikri."), K("Martin Fowler: GivenWhenThen", "https://martinfowler.com/bliki/GivenWhenThen.html", "Given-When-Then kalıbının kısa tanımı.")],
    telafi: "Takıldıysan hikâyeyi önce tek cümleyle yaz, sonra yalnız 'ne olursa başarılı sayılır?' diye sor; Given-When-Then'i en son çıkar.",
    sonraki: "Sıradaki konu: Statik test ve gözden geçirme. Kriter ve hikâyeler kod yazılmadan önce nasıl incelenir, orada göreceksin."
  };

  E[4] = {
    analoji: { a: "Kitabı basmadan önce yazım denetimi: hatalar basılmadan bulunursa baskıyı geri çağırmak gerekmez. Statik test de kod çalıştırılmadan gereksinim ve belgedeki kusuru yakalar.", sinir: "Yazım denetimi yalnız yazı hatasını bulur; statik test mantık ve tutarlılık kusurunu da bulabilir ama kodun çalışırkenki davranışını göstermez (dinamik test gerekir)." },
    rehberli: ["Bir gereksinim cümlesi yaz ('Sistem hızlı yanıt vermeli') ve neden test edilemez olduğunu işaretle; ölçülebilir hâle getir.", "Dört gözden geçirme türünü (gayriresmî, yürüyüş, teknik gözden geçirme, denetim/inspection) resmiyet derecesine göre sırala.", "Gözden geçirme sürecinin adımlarını (planlama, başlatma, bireysel inceleme, iletişim/analiz, düzeltme/raporlama) kısa bir örnek belgeyle uygula."],
    bagimsiz: "Kısa bir gereksinim metni al (ör. 'kullanıcı e-postasını girer, sistem uygun bir mesaj gösterir'). En az üç belirsizlik ya da çelişki bul, her biri için bir düzeltme sorusu yaz; kimin hangi rolle (yazar, moderatör, gözden geçiren) bakacağını belirt.",
    hatalar: [["Gözden geçirmeyi kişisel eleştiriye çevirmek", "Odak üründedir; bulgu 'belgede şu belirsizlik var' diye ifade edilir, kişi hedef alınmaz."], ["Statik testi dinamik testin yerine koymak", "Statik test belgeyi ve kodu çalıştırmadan inceler; arıza ancak dinamik testte gözlenir. İkisi birbirini tamamlar."], ["Gözden geçirmeyi yalnız koda uygulamak", "Gereksinim, tasarım ve test belgeleri de incelenir; hatalar orada daha ucuza yakalanır."]],
    gecme: { olcut: "Mini sınavda %80 ve bir gereksinimdeki belirsizliği bulup statik ile dinamik testi doğru ayırabilmek.", kritik: ["Statik testin kod çalıştırmayı gerektirdiğini sanmak", "Gözden geçirmede yalnız yazım hatası aramak"] },
    kaynaklar: [K("Atlassian: Kod incelemesi", "https://www.atlassian.com/agile/software-development/code-reviews", "Kod gözden geçirmenin neden ve nasıl yapıldığına giriş."), SOZLUK],
    telafi: "Takıldıysan tek bir cümlelik gereksinim al ve yalnız şunu sor: bu cümle bir testle doğrulanabilir mi? Hayırsa neden?",
    sonraki: "Sıradaki konu: Test senaryosu yazmak. Gözden geçirilmiş ve netleşmiş bir gereksinimden uygulanabilir senaryoya nasıl geçileceğini orada göreceksin."
  };

  E[5] = {
    analoji: { a: "Yemek tarifi gibi: malzeme listesi (ön koşul), adımlar ve sonuçta nasıl görünmesi gerektiği (beklenen sonuç). Biri eksikse başkası tarifi uygulayamaz.", sinir: "Tarif tek bir sonuca götürür; test senaryosu sistemin hem doğru hem yanlış girdilere vereceği davranışı (pozitif ve negatif) sınar." },
    rehberli: ["Giriş sayfası için 'Geçersiz şifreyle giriş' senaryosunu yaz: ön koşul, tek eylemli adımlar, beklenen sonuç.", "Aynı özelliğin pozitif senaryosunu ekle ve iki senaryonun farkını işaretle.", "Senaryoyu başkasına verdiğini düşün: hangi adımda soru sorması gerekir? Belirsiz adımı yeniden yaz."],
    bagimsiz: "Bir 'şifremi unuttum' akışı için bir pozitif ve iki negatif senaryo yaz. Her senaryoda ön koşul, numaralı ve tek eylemli adım, ölçülebilir beklenen sonuç ve (gerekirse) test verisi bulunsun. Yazdıklarını bir arkadaşın gözüyle oku ve belirsiz yeri düzelt.",
    hatalar: [["Beklenen sonucu yazmamak", "Geçti ya da kaldı kararı kişiye göre değişir; beklenen sonuç ölçülebilir olmalıdır."], ["Tek senaryoda çok şey denemek", "Kaldığında nedenin hangi adım olduğu anlaşılmaz; bir senaryo tek bir davranışı sınasın."], ["Yalnız pozitif senaryo yazmak", "Çoğu kusur geçersiz girdide çıkar; negatif senaryolar da gereklidir."]],
    gecme: { olcut: "Mini sınavda %80 ve bir gereksinim için ön koşul, adım ve beklenen sonucu açık yazılmış pozitif ile negatif senaryo üretebilmek.", kritik: ["Senaryoyu yalnız yazan kişinin anlayabileceği biçimde yazmak", "Beklenen sonucu 'çalışmalı' gibi ölçülemez bir ifadeyle bırakmak"] },
    kaynaklar: [SOZLUK],
    telafi: "Takıldıysan senaryoyu üç satıra indir: ön koşul, tek eylem, tek beklenen sonuç. Sonra gerekiyorsa adım ekle.",
    sonraki: "Sıradaki konu: Eşdeğerlik sınıfları. Senaryolar için hangi girdi değerlerini seçeceğini orada sistematik biçimde öğreneceksin."
  };

  E[6] = {
    analoji: { a: "Okulda sınıf mevcudu yoklaması: her öğrenciyi tek tek sormak yerine sınıfları sayarsın; aynı gruptaki öğrenci benzer davranır. Girdileri de davranışı aynı olan gruplara böler, her gruptan bir temsilci denersin.", sinir: "Öğrenciler birbirinden bağımsızdır; yazılımda aynı sınıf içinde bile kodda yanlış yazılmış bir koşul bir değeri farklı yapabilir, bu yüzden sınırlara ayrıca bakılır (sınır değer analizi)." },
    rehberli: ["'Yaş 18-65 arasındaki kullanıcı başvurabilir' kuralı için sınıfları çıkar: 17 ve altı, 18-65, 66 ve üstü.", "Her sınıftan bir temsilci seç (10, 40, 80) ve beklenen sonucu yaz.", "Eşdeğerlik kapsamını hesapla: denenen sınıf sayısı / toplam sınıf sayısı. Yalnız 40 denenirse kapsam ne olur?"],
    bagimsiz: "'Sepet tutarı 0 ile 1000 TL arasında geçerlidir (sınırlar dahil)' kuralı için geçerli ve geçersiz sınıfları (negatif tutar, 0-1000, 1000 üstü gibi) çıkar. Her sınıftan bir temsilci seç, toplam sınıf sayısını ve dört test içeren bir setin kapsam yüzdesini hesapla.",
    hatalar: [["Sınıfları yanlış çıkarmak", "Bir kuralın geçersiz tarafları (alt ve üst) ayrı sınıflardır; unutulursa kusur kaçar."], ["Aynı sınıftan çok değer denemek", "Aynı sınıftaki değerler genelde aynı davranır; fazla değer zaman harcatır, yeni bilgi vermez."], ["Eşdeğerlik sınıfını sınır değerin yerine koymak", "Sınıf temsilcisi sınırdaki kusuru yakalamaz; sınır değerler ayrıca denenir."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen bir kuralda sınıfları doğru çıkarıp kapsam yüzdesini hesaplayabilmek.", kritik: ["Yalnız geçerli sınıfları test etmek", "Kapsamı 'denenen değer sayısı' sanmak (sınıf sayısına göre hesaplanır)"] },
    kaynaklar: [SOZLUK],
    telafi: "Takıldıysan kuralı sayı doğrusuna çiz; sınırların dışındaki ve içindeki bölgeleri boya. Her boya bir sınıftır.",
    sonraki: "Sıradaki konu: Sınır değer analizi. Sınıfları çıkardıktan sonra kusurun en sık çıktığı sınırlara nasıl odaklanılacağını orada göreceksin."
  };

  E[7] = {
    analoji: { a: "Otoyolda hız sınırı 90 ise 89, 90 ve 91 km/s'yi denersin: ceza çizgisi tam o noktadadır. Kusur da çoğunlukla sınırın bir birim yanında çıkar.", sinir: "Hız sınırı fiziksel bir çizgidir; yazılımda sınır koda ya da veriye göre farklı yazılmış olabilir (ör. > yerine >=), bu yüzden gereksinimden sınırı doğru çıkarmak gerekir." },
    rehberli: ["18-65 (dahil) kuralı için iki değerli BVA setini çıkar: 17, 18, 65, 66.", "Üç değerli BVA setini çıkar: 17, 18, 19, 64, 65, 66; iki yöntemin test sayısını karşılaştır.", "Kodda `if (yas > 18)` yazılmış olsun: hangi test bu kusuru yakalar, hangileri yakalamaz?"],
    bagimsiz: "'Kullanıcı adı 3 ile 15 karakter (dahil) olmalıdır' kuralı için hem iki hem üç değerli sınır değer setini yaz. Her değer için beklenen sonucu (geçerli/geçersiz) belirt. Sonra 'en az 3' yerine kodda 'en az 4' yazıldığını düşün ve hangi testin yakalayacağını söyle.",
    hatalar: [["Sınır değerleri yanlış hesaplamak", "Dahil/hariç ifadesini ve alt-üst sınırı dikkatle ayır; 18 ile 65 dahilse geçersiz komşular 17 ve 66'dır."], ["Yalnız sınır değeri denemek", "Eşdeğerlik sınıflarının içini ve diğer sınıfları da kapsayan bir set gerekir."], ["Üç değerli yöntemi her zaman şart sanmak", "İki değerli yöntem çoğu durumda yeterlidir; üç değerli daha sıkıdır ve daha çok test üretir. Risk ve zaman belirler."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen bir kural için iki ve üç değerli BVA setini hatasız çıkarabilmek.", kritik: ["Sınır değerleri sınıfın ortasında aramak", "Bir birim kayma (off-by-one) kusurunun sınırı test etmeden bulunabileceğini sanmak"] },
    kaynaklar: [SOZLUK],
    telafi: "Takıldıysan önce sınıfları çıkar, sonra her sınıfın en uç iki değerini işaretle. Dahil/hariç karışırsa sayı doğrusunda sınır noktalarını daire ile çiz.",
    sonraki: "Sıradaki konu: Karar tablosu testi. Tek girdinin sınırlarından birden çok koşulun birleşimine geçip iş kurallarını sistematik sınayacaksın."
  };

  E[8] = {
    analoji: { a: "Bir sinemada bilet fiyatı yaşa ve gün tipine bağlıdır: öğrenci mi, hafta içi mi? Fiyat listesi bir tablo gibidir; her birleşim için bir satır vardır ve hiçbiri unutulmaz.", sinir: "Fiyat listesinde birleşimler az ve açıktır; yazılımda koşul sayısı arttıkça kural sayısı üstel artar (n koşul → 2^n), bu yüzden birleştirme ve riske göre seçim gerekir." },
    rehberli: ["Dersteki kargo kuralını al: üye ve sepet ≥ 500 TL ise kargo 0; üye ve sepet < 500 TL ise 30; üye değil ve sepet ≥ 500 TL ise 30; üye değil ve sepet < 500 TL ise 50. Koşulları ve eylemi ayır.", "İki koşul için 2 x 2 = 4 kuralı tabloya dök ve her kural için bir test yaz.", "Aynı eylemi doğuran kuralları birleştirip tabloyu sadeleştir; hangi koşul fark yaratmıyor?"],
    bagimsiz: "Bir kütüphane ödünç alma kuralı düşün: üyelik geçerli mi (E/H), kitap rafta mı (E/H), ceza borcu var mı (E/H). 3 koşul için kaç kural olduğunu hesapla (2^3), tabloyu çıkar, her kural için eylemi (ödünç ver / reddet) yaz ve kapsamı belirle.",
    hatalar: [["Koşul birleşimlerini atlamak", "Kusur çoğunlukla belirli bir birleşimde çıkar; tablo bu yüzden vardır."], ["Koşul sayısı arttıkça tabloyu elle sürdürmek", "Kural sayısı hızla büyür; birleştirme ve risk tabanlı seçim gerekir."], ["Eylemi koşulla karıştırmak", "Koşul girdinin durumudur (üye mi?), eylem sistemin sonucudur (kargo ücreti)."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen bir iş kuralı için kural sayısını hesaplayıp karar tablosunu eksiksiz çıkarabilmek.", kritik: ["Koşul sayısına göre kural sayısını yanlış hesaplamak (n ikili koşul için 2^n)", "Tablonun tek bir kuralını test etmenin yeterli olduğunu sanmak"] },
    kaynaklar: [SOZLUK],
    telafi: "Takıldıysan koşulları alt alta yaz ve yalnız E/H (doğru/yanlış) birleşimlerini say. Eylemleri en son, her sütun için ayrı yaz.",
    sonraki: "Sıradaki konu: Durum geçişi testi. Birleşim yerine zaman içinde değişen durumları sınayarak geçmişe bağlı davranışı test edeceksin."
  };

  E[9] = {
    analoji: { a: "Asansör: kat, kapı açık/kapalı gibi durumlar ve düğmeye basma gibi olaylar vardır. Hareket halindeyken kapıyı açma isteği reddedilmelidir (geçersiz geçiş).", sinir: "Asansör durumları azdır; yazılımda durum sayısı çok olabilir ve her durumda her olaya cevap tanımlı olmayabilir. Eksik tanımlar kusurun kaynağı olur." },
    rehberli: ["Sipariş akışını çiz: Yeni → (öde) → Ödendi → (kargola) → Kargoda → (teslim et) → Teslim edildi; iptal geçişlerini ekle.", "Durum ve geçerli geçiş sayısını say; her geçişi bir test olarak yaz.", "En az iki geçersiz denemeyi (ör. Teslim edildi durumunda iptal) yaz ve beklenen davranışı (reddetme mesajı) belirt."],
    bagimsiz: "Bir yemek siparişi uygulamasının durumlarını (alındı, hazırlanıyor, yolda, teslim edildi, iptal) çiz. Geçerli geçişleri liste olarak yaz, geçişlerin kaçını iki testle (her geçiş en az bir kez) kapsayacağını, iki geçersiz geçişi ve beklenen cevabı belirt.",
    hatalar: [["Geçersiz geçişleri denememek", "Sistem izin verilmeyen olayda doğru davranıyor mu? Kusur çoğunlukla burada çıkar."], ["Durumları eksik modellemek", "Gizli durumlar (ör. 'ödeme beklemede') atlanırsa test seti kapsamlı görünse de eksiktir."], ["Yalnız durumları kapsamak", "Geçiş kapsamı durum kapsamından güçlüdür; her geçişi en az bir kez sınamak gerekir."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen bir durum diyagramından geçerli ve geçersiz geçişleri çıkarıp geçiş kapsamını hesaplayabilmek.", kritik: ["Durum kapsamının geçiş kapsamını içerdiğini sanmak", "Geçersiz geçişlerin test edilmesine gerek olmadığını sanmak"] },
    kaynaklar: [SOZLUK],
    telafi: "Takıldıysan durumları kutu, olayları ok olarak çiz; her kutudan çıkabilecek okları tek tek say.",
    sonraki: "Sıradaki konu: Beyaz kutu: ifade ve dal kapsamı. Kara kutu tekniklerinden iç yapıya bakan tekniklere geçeceksin."
  };

  E[10] = {
    analoji: { a: "Bir yol ağını gezme: ifade kapsamı her sokağa en az bir kez girmek, dal kapsamı ise her kavşakta hem sağa hem sola en az bir kez dönmektir. İkincisi daha çok iş gerektirir ama daha az yer atlar.", sinir: "Tüm sokakları gezmek şehrin doğru haritalandığını göstermez; yüksek kapsam da kodun doğru olduğunu garanti etmez, yalnız hangi kodun hiç çalışmadığını gösterir." },
    rehberli: ["Beş satırlık bir koddaki (if içeren) ifadeleri ve karar noktasını numaralandır.", "Tek bir test ile ifade kapsamını hesapla (ör. yas=20 → %100); aynı testin dal kapsamını bul (%50).", "Dal kapsamını %100 yapan ikinci testi seç (yas=15) ve neden dal kapsamının ifade kapsamını kapsadığını yaz."],
    bagimsiz: "Şu koda bak: `indirim = 0; if (tutar > 100) indirim = 10; if (uye) indirim += 5;`. İfade ve dal kapsamını %100 yapacak en az testi bul. Testlerini yazarken yalnız kapsamı mı yoksa beklenen sonucu da mı doğruladığını kontrol et.",
    hatalar: [["Yalnız ifade kapsamına güvenmek", "İfade kapsamı %100 olsa bile bir dalın hiç denenmediği (else tarafı) olabilir; dal kapsamı daha güçlüdür."], ["Kapsam yüzdesini tek hedef yapmak", "Kapsam, testin kaliteli olduğunu göstermez; beklenen sonuçları doğrulayan testler gerekir."], ["Kapsamı artırmak için doğrulamasız test yazmak", "Hiçbir sonucu kontrol etmeyen test yüzdeyi yükseltir ama kusur yakalamaz; her test beklenen sonucu doğrulamalı."]],
    gecme: { olcut: "Mini sınavda %80 ve küçük bir kod parçası için ifade ve dal kapsamı yüzdelerini hesaplayabilmek.", kritik: ["%100 dal kapsamının kusursuz kod demek olduğunu sanmak", "İfade kapsamı ile dal kapsamını aynı sanmak"] },
    kaynaklar: [K("Coverage.py: Dal ölçümü", "https://coverage.readthedocs.io/en/latest/branch.html", "Python'da ifade ve dal kapsamı ölçümünün nasıl çalıştığı.")],
    telafi: "Takıldıysan kodu akış şemasına çevir: kutular ifade, eşkenar dörtgenler karar noktasıdır. Her kutuya ve her çıkış oka en az bir test götür.",
    sonraki: "Sıradaki konu: Deneyim tabanlı testler. Teknikler yetmediğinde deneyim ve keşifle nasıl tamamlayacağını orada göreceksin."
  };

  E[11] = {
    analoji: { a: "Deneyimli bir usta evin tesisatına bakar ve 'şurada genelde sorun çıkar' der: hata tahmini deneyime dayanır. Keşifsel test, haritasız ama pusulayla yeni bir şehri belirli bir sürede gezmektir; not alırsın.", sinir: "Usta kişisel deneyimine güvenir, bu yüzden bulgular kişiden kişiye değişir; tekrarlanabilirlik ve kayıt için charter, süre sınırı ve notlar gerekir." },
    rehberli: ["Kupon uygulama alanı için hata tahmini girdileri listele: boş, boşluklu, 500 karakter, apostrof, emoji.", "60 dakikalık bir keşifsel test için charter yaz ('Kupon akışını geçersiz ve süresi dolmuş kuponlarla keşfet').", "Oturum notu formatı hazırla: ne denedim, ne gözledim, hangi soru oluştu, hangi hata raporu açılacak."],
    bagimsiz: "Kendi kullandığın bir uygulamada 30 dakikalık bir keşifsel test yap (yalnız kendi hesabında). Bir charter yaz, bulduğun sorunları ve oluşan soruları not et. En az bir hata tahmini girdisi kullan ve sonucunu belirt. Canlı kullanıcı verisine zarar verme.",
    hatalar: [["Keşifsel testi notsuz yapmak", "Ne denendiği bilinmezse tekrar edilemez ve bulgu kanıtlanamaz."], ["Yalnız keşifsel teste güvenmek", "Teknikler ve otomasyonla birlikte kullanılmalıdır; keşif onları tamamlar."], ["Zaman kutusunu atlamak", "Sınırsız keşif dağılır; süre ve charter odağı korur."]],
    gecme: { olcut: "Mini sınavda %80 ve bir özellik için charter ile hata tahmini girdi listesi yazabilmek.", kritik: ["Keşifsel testin plansız ve notsuz serbest gezinti olduğunu sanmak", "Deneyim tabanlı tekniklerin diğer tekniklerin yerini aldığını sanmak"] },
    kaynaklar: [SOZLUK],
    telafi: "Takıldıysan tek bir özelliği seç, 'şunu bozmak için ne denerim?' diye beş girdi yaz ve sırayla dene.",
    sonraki: "Sıradaki konu: Test planlama ve risk. Teknikleri seçtikten sonra neye ne kadar zaman ayıracağını riskle belirleyeceksin."
  };

  E[12] = {
    analoji: { a: "Yolculuk planı: bütçe ve zaman sınırlıyken önce kaçırılmaması gereken yerleri (yüksek risk) planlarsın, süs olanları sonraya bırakırsın. Hareketten önce 'yola çıkış' ve 'varış' koşullarını da belirlersin.", sinir: "Yolculukta rota sabittir; test planında kapsam ve riskler değişir, plan bu yüzden güncellenmelidir." },
    rehberli: ["Üç risk yaz (ödeme tutarı yanlış, profil teması bozuk, giriş çalışmıyor) ve olasılık x etki ile seviyesini hesapla.", "Riskleri sırala ve hangisine daha çok test zamanı ayıracağını yaz.", "Bir sürüm için giriş kriteri (ör. derleme hazır, test ortamı çalışıyor) ve çıkış kriteri (ör. kritik hata kalmadı, %95 test geçti) yaz; üç nokta tahminle bir görevin süresini hesapla."],
    bagimsiz: "Küçük bir alışveriş sitesi için beş risk yaz, her birine olasılık ve etki puanı (1-3) ver, seviyelerini hesapla ve test sırasını belirle. Bir çıkış kriteri yaz ve bu kriterin 'test bitti' kararını nasıl desteklediğini açıkla.",
    hatalar: [["Risk analizi yapmamak", "Tüm özelliklere eşit zaman ayırmak yüksek riskli yerleri eksik bırakabilir."], ["Çıkış kriterini tanımlamamak", "Test ne zaman biter sorusu cevapsız kalır; kriter ölçülebilir olmalıdır."], ["Tahmini tek sayı olarak vermek", "Belirsizlik varsa iyimser, olası ve kötümser değerle aralık ver (üç nokta tahmin)."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen riskler için seviye hesaplayıp öncelik sırası ile çıkış kriteri önerebilmek.", kritik: ["Riski yalnız olasılık ya da yalnız etki ile değerlendirmek", "Testin kriter olmadan 'zaman bitince' durduğunu sanmak"] },
    kaynaklar: [SOZLUK],
    telafi: "Takıldıysan riski iki soruya indir: ne kadar olası? Olursa ne kadar zarar verir? İkisini çarp, en yüksekten başla.",
    sonraki: "Sıradaki konu: Test metrikleri ve raporlama. Plana göre ilerlemeyi nasıl sayılarla ve yorumla anlatacağını orada göreceksin."
  };

  E[13] = {
    analoji: { a: "Araba gösterge paneli: hız, yakıt ve uyarı lambası sürücüye anlamlı karar bilgisi verir. Ham motor verisi değil, 'devam edebilir miyim?' sorusunun cevabı gerekir.", sinir: "Gösterge paneli otomatik ölçer; test metriklerini seçmek ve yorumlamak insan yargısı ister, yanlış metrik yanlış karara götürür." },
    rehberli: ["Haftalık duruma bak: planlanan 200 test, yürütülen 150, geçen 135. Yürütme oranı ve geçme oranını hesapla.", "Açık kritik hata sayısını ve sürüme etkisini bir cümleyle yorumla.", "Hata yoğunluğunu hesapla (hata sayısı / bin satır) ve iki modülü karşılaştır; hangisine daha çok test koyarsın?"],
    bagimsiz: "Küçük bir test sürecinin verilerini uydur (ör. planlanan 80, yürütülen 60, geçen 54, açık kritik hata 1). Yürütme ve geçme oranlarını hesapla, kısa bir ilerleme raporu yaz: durum, risk, önerilen karar. Raporda sayının yanında yorumun da olsun.",
    hatalar: [["Yalnız geçen test sayısını raporlamak", "Kaç test yürütüldü, kaç kalan ve açık kritik hata var, bunlar olmadan sayı anlamsızdır."], ["Ham veriyi yorumsuz sunmak", "Karar vericiye 'sürüm hazır mı, hangi risk var' bilgisini ver."], ["Metriği hedef haline getirmek", "'Test sayısını artır' hedefi anlamsız test üretir; metrik ölçmek içindir, yönetmek için değil."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen sayılardan yürütme/geçme oranını hesaplayıp tek paragraflık yorum yazabilmek.", kritik: ["Geçme oranını hangi tabana (yürütülen mi, planlanan mı) göre hesapladığını belirtmeden raporlamak", "Tek bir metriğin sürüm kararını verdiğini sanmak"] },
    kaynaklar: [SOZLUK],
    telafi: "Takıldıysan raporu üç cümleyle yaz: Nerede olduğumuz (oranlar), ne riskli (açık kritik hata), ne öneriyorum (karar).",
    sonraki: "Sıradaki konu: Hata raporu ve Jira ile hata yönetimi. Metriklerin arkasındaki hataların nasıl yazılıp izleneceğini orada göreceksin."
  };

  E[14] = {
    analoji: { a: "Arızalı bir cihazı tamirciye götürmek: 'çalışmıyor' demek yerine 'şu düğmeye basınca şu ışık yanıyor' dersen tamirci hemen bulur. Net hata raporu da aynıdır.", sinir: "Tamirci cihazı elinde görür; yazılımda geliştirici hatayı kendi ortamında tekrar edemezse yalnız rapora güvenir, bu yüzden ortam ve adımlar kritiktir." },
    rehberli: ["Geçersiz kuponla HTTP 500 aldığın bir senaryo için rapor yaz: başlık, ortam, adımlar, beklenen, gerçekleşen, ek.", "Önem (severity) ile önceliği (priority) ayırt et ve bu hata için ikisini belirle.", "Jira'da basit bir hata akışını çiz (Open → In Progress → Resolved → Closed / Reopened) ve basit bir JQL sorgusu yaz (ör. açık hatalar)."],
    bagimsiz: "Kendi kullandığın bir uygulamadaki gerçek ya da uydurma bir hata için eksiksiz bir rapor yaz. Başlık, ortam (tarayıcı, işletim sistemi, sürüm), numaralı adımlar, beklenen/gerçek sonuç ve önem-öncelik gerekçesini belirt. Başkası raporu okuyup hatayı yeniden üretebiliyor mu diye kontrol et.",
    hatalar: [["Adımları eksik yazmak", "Hatayı yeniden üretemeyen geliştirici düzeltemez; adımlar numaralı ve tek eylemli olmalıdır."], ["Önem ile önceliği karıştırmak", "Önem hatanın sistemdeki etkisidir, öncelik düzeltme sırasıdır; ikisi farklı olabilir."], ["Birden çok hatayı tek rapora yazmak", "Her hata ayrı izlenmeli; yoksa kapanış ve sorumluluk karışır."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen bir senaryo için eksiksiz hata raporu ve doğru önem/öncelik seçebilmek.", kritik: ["Önem ile önceliğin aynı şey olduğunu sanmak", "Raporda ortam bilgisinin gereksiz olduğunu sanmak"] },
    kaynaklar: [K("Atlassian: Jira issue (iş) nedir", "https://support.atlassian.com/jira-software-cloud/docs/what-is-an-issue/", "Jira'da issue kavramı ve alanları."), K("Atlassian: JQL ile gelişmiş arama", "https://support.atlassian.com/jira-service-management-cloud/docs/use-advanced-search-with-jira-query-language-jql/", "JQL sorgularının yazımı.")],
    telafi: "Takıldıysan raporu altı satıra böl: başlık, ortam, adımlar, beklenen, gerçekleşen, ek. Her satırı tek cümleyle doldur.",
    sonraki: "Sıradaki konu: API testi: Postman ve durum kodları. Hatayı arayüze inmeden kaynağında nasıl yakalayacağını orada göreceksin."
  };

  E[15] = {
    analoji: { a: "Restoranda garsona sipariş verirsin (istek) ve ne zaman geleceğini, doğru mu geldiğini kontrol edersin. API testi, arayüze (masaya) gitmeden doğrudan mutfağın sipariş penceresiyle konuşmaktır.", sinir: "Restoranda garson çoğu zaman cevap verir; API'de yetki, hatalı gövde ya da kayıt yok gibi durumlar farklı durum kodlarıyla (400, 401, 403, 404) kendini gösterir ve hepsi test edilmelidir." },
    rehberli: ["GET, POST, PUT, PATCH, DELETE yöntemlerini bir sipariş örneğinde birer cümleyle tanımla.", "Durum kodu sınıflarını yaz: 2xx başarı, 4xx istemci hatası, 5xx sunucu hatası; 200, 201, 400, 401, 403, 404 için beklenen durumu eşle.", "Postman'da (ya da kâğıtta) iki doğrulama betiği yaz: durum kodu 201 ve yanıtta id var. Kendi test ortamı dışında deneme yapma."],
    bagimsiz: "Kendi kurduğun ya da izin verilmiş bir test API'sinde (ör. yerelde çalışan örnek API) bir kaynak için en az iki pozitif ve iki negatif istek tasarla. Beklenen durum kodunu ve yanıt gövdesinde kontrol edeceğin alanı yaz. Gerçek kullanıcı verisi ve başkasının servisi kullanılmaz.",
    hatalar: [["Yalnız 200 kodunu kontrol etmek", "Yanıt gövdesi, başlıklar ve durum kodu doğru olmalıdır; 200 dönen yanıt yanlış veri taşıyabilir."], ["Negatif API testlerini atlamak", "Bozuk gövde, eksik token ve yetkisiz erişim durumlarında beklenen 400, 401, 403 test edilmelidir."], ["Gerçek ya da başkasının servisine test isteği atmak", "Yalnız kendi ya da izin verilmiş test ortamında dene; canlı veriyi değiştirme."]],
    gecme: { olcut: "Mini sınavda %80 ve bir uç nokta için pozitif ve negatif isteklerin beklenen durum kodlarını ve bir doğrulama betiğini yazabilmek.", kritik: ["Durum kodlarının yalnız 200 ve 404'ten ibaret olduğunu sanmak", "API testinin arayüz testinin yerini tamamen aldığını sanmak"] },
    kaynaklar: [K("MDN: HTTP yanıt durum kodları", "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status", "Durum kodlarının anlamları."), K("MDN: HTTP istek yöntemleri", "https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods", "GET, POST gibi yöntemlerin tanımı."), K("RFC 9110: HTTP Semantics", "https://www.rfc-editor.org/rfc/rfc9110", "HTTP yöntem ve durum kodu anlambiliminin resmi tanımı."), K("Postman: Test betikleri", "https://learning.postman.com/docs/tests-and-scripts/write-scripts/test-scripts/", "Postman'da doğrulama betiği yazma.")],
    telafi: "Takıldıysan önce yalnız durum kodu sınıflarını (2xx, 4xx, 5xx) ezberle; sonra her istek için 'başarılı olursa ne dönerim, hata olursa hangi sınıf?' diye sor.",
    sonraki: "Sıradaki konu: SQL ve tarayıcı geliştirici araçları. Arayüz ve API arasındaki veriyi veritabanında ve tarayıcıda nasıl doğrulayacağını orada göreceksin."
  };

  E[16] = {
    analoji: { a: "Alışveriş fişi ile kasadaki kayıt aynı mı? Arayüz fişi gösterir, SQL deftere bakar. Tarayıcı araçları ise kasiyer ile müşteri arasındaki konuşmayı (istek-yanıt) kaydeder.", sinir: "Defter her şeyi doğru göstermez; veritabanına bakmak için yetki ve dikkat gerekir, yanlış sorgu (özellikle UPDATE/DELETE) gerçek veriyi bozabilir." },
    rehberli: ["Test veritabanında bir SELECT ile belirli bir siparişin durumunu sorgula (kendi test verinde).", "GROUP BY ... HAVING COUNT(*) > 1 ile yinelenen e-postaları bul, LEFT JOIN ile müşterisi olmayan (yetim) siparişleri listele.", "Tarayıcıda F12 > Network ile bir isteği seç; durum kodunu, gönderilen gövdeyi ve yanıtı oku; Console'daki bir hata iletisini not et."],
    bagimsiz: "Kendi test ortamındaki iki tablo için (ör. musteriler ve siparisler) bir yetim kayıt sorgusu ve bir yinelenen kayıt sorgusu yaz. Sadece okuma (SELECT) yap; WHERE'siz UPDATE ya da DELETE çalıştırma. Sonra tarayıcıda bir sayfanın ağ isteklerinden birinin durum kodunu ve yanıtını yorumla.",
    hatalar: [["WHERE olmadan UPDATE ya da DELETE çalıştırmak", "Bütün satırları değiştirir ya da siler; test ortamında bile önce SELECT ile etkilenecek satırları doğrula."], ["Yalnız arayüze bakmak", "Arayüz doğru görünse de veri yanlış kaydedilmiş olabilir; veritabanı ve ağ istekleri de kontrol edilir."], ["Canlı veritabanında sorgu denemek", "Yalnız yetkin olduğun ve izin verilen test ortamında çalış; canlı veride salt okunur ve yetkili kişinin gözetiminde işlem yap."]],
    gecme: { olcut: "Mini sınavda %80 ve bir veri doğrulama sorusu için doğru SELECT, GROUP BY/HAVING ya da LEFT JOIN sorgusunu yazabilmek.", kritik: ["WHERE koşulsuz UPDATE/DELETE'in güvenli olduğunu sanmak", "Arayüzde doğru görünen verinin veritabanında da doğru olduğunu varsaymak"] },
    kaynaklar: [K("PostgreSQL: Giriş, birleştirme (JOIN)", "https://www.postgresql.org/docs/current/tutorial-join.html", "JOIN mantığı için resmi eğitim sayfası."), K("PostgreSQL: Giriş, toplama (GROUP BY/HAVING)", "https://www.postgresql.org/docs/current/tutorial-agg.html", "GROUP BY ve HAVING örnekleri."), K("Chrome DevTools: Ağ", "https://developer.chrome.com/docs/devtools/network", "Network panelinde istek ve yanıtı okumak."), K("Chrome DevTools: Konsol", "https://developer.chrome.com/docs/devtools/console", "Konsol hatalarını okumak.")],
    telafi: "Takıldıysan sorguyu üç parçaya böl: hangi tablo (FROM), hangi satırlar (WHERE), hangi sütunlar (SELECT). Önce yalnız SELECT * ile 5 satıra bak.",
    sonraki: "Sıradaki konu: Test otomasyonu, CI, performans ve erişilebilirlik. Elle yaptığın bu kontrollerin bir kısmını otomatikleştirmeyi orada göreceksin."
  };

  E[17] = {
    analoji: { a: "Fabrikada bir işi elle yapmak yerine makineye öğretirsin; ama her işi makineye vermek akıllıca değildir. Tekrar eden kararlı işler makineye, tek seferlik ve değişken işler insana uygundur.", sinir: "Makine yalnız öğretildiği kontrolü yapar; yeni ve beklenmedik sorunu keşfetmek için insan testi (keşifsel) şarttır ve yanlış yazılmış otomasyon sahte güven verir." },
    rehberli: ["Beş testi listele ve her biri için otomasyona uygun mu (kararlı, sık tekrarlanan) değil mi (tek seferlik, keşifsel) olduğunu işaretle.", "CI akışını çiz: kod değişir → otomatik derleme ve testler → kırmızıysa birleştirme durur.", "Bir web sayfasında WCAG'ın dört ilkesini (algılanabilir, çalıştırılabilir, anlaşılır, sağlam) bir örnekle eşle ve normal metin kontrastı için 4.5:1 AA ölçütünü bir renk çiftinde kontrol et."],
    bagimsiz: "Kendi küçük bir projen için otomasyon planı yaz: hangi üç testi otomatikleştirirsin, hangisini elle bırakırsın ve neden? CI'da hangi komut çalışır? Performans testini yalnız kendi yerel/test ortamında, izinli bir araçla ve düşük yükle nasıl planlarsın? Bir erişilebilirlik kontrolü (klavye ile gezinme ya da kontrast) ekle.",
    hatalar: [["Her şeyi otomatikleştirmeye çalışmak", "Kararsız ya da bir kez çalışacak testlerin otomasyonu maliyetlidir; önce kararlı ve sık tekrarlanan testleri seç."], ["Performans testini izinsiz canlıya yapmak", "Yük testi canlı sistemi aksatabilir; yalnız kendi ya da izinli test ortamında, kontrollü yükle yap."], ["Erişilebilirliği sona bırakmak", "Kontrast, klavye erişimi ve etiketler tasarım aşamasında düşünülürse düzeltmesi ucuzdur."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen testler için otomasyon uygunluğunu gerekçeyle belirleyip CI akışını ve temel performans ile erişilebilirlik kavramlarını söyleyebilmek.", kritik: ["Otomasyonun insan testini tamamen değiştirdiğini sanmak", "Yük testini izin almadan herhangi bir sisteme yapmanın serbest olduğunu sanmak"] },
    kaynaklar: [K("Playwright: Başlangıç", "https://playwright.dev/docs/intro", "Tarayıcı testi otomasyonuna giriş."), K("Martin Fowler: Continuous Integration", "https://martinfowler.com/articles/continuousIntegration.html", "Sürekli entegrasyon fikrinin açıklaması."), K("GitHub Actions: Genel bakış", "https://docs.github.com/en/actions", "Testleri her değişiklikte çalıştıran iş akışları."), K("Grafana k6 belgeleri", "https://grafana.com/docs/k6/latest/", "Performans (yük) testi aracı belgeleri."), K("web.dev: Web Vitals", "https://web.dev/articles/vitals", "Sayfa performansı ölçütleri."), K("W3C: WCAG 2.2", "https://www.w3.org/TR/WCAG22/", "Erişilebilirlik kılavuzu."), K("W3C: Kontrast (Minimum) açıklaması", "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html", "Metin kontrastı ölçütünün açıklaması.")],
    telafi: "Takıldıysan önce yalnız 'bu test sık tekrarlanıyor mu ve kararlı mı?' sorusunu sor; evetse otomasyon adayıdır. Diğer kavramları tek tek, birer cümleyle yaz.",
    sonraki: "Yolun sonu: QA yolunu bitirdin. Şimdi soru bankasıyla tekrar et ve proje atölyesinde kendi test planı ile hata raporu örneğini hazırla."
  };
})();

/* QA yolu · Faz 19a: yeni konular 23-34 için ders eki (anahtar = TMAP.qa dizini, 22–33; ders no = anahtar + 1).
   Alanlar: benzetme + sınırı, rehberli alıştırma, bağımsız görev, yaygın hatalar, geçme ölçütü + kritik yanlış anlama, dış kaynak (son doğrulama tarihiyle), telafi/sonraki adım.
   Tüm alıştırmalar kâğıt üzerinde ya da kendi test ortamında yapılır; başkasının sistemine ya da canlı veriye dokunulmaz. Örnekler "simülasyon"dur.
   Dış kaynak: istqb.org müfredat PDF'i ve glossary.istqb.org; HTTP 200 (curl, 2026-10-26). */
(function () {
  var E = ((window.PP_EK = window.PP_EK || {}).qa = (window.PP_EK.qa || {}));
  var DOG = "2026-10-26";
  var K = function (t, u, neden) { return { t: t, u: u, dogrulama: DOG, neden: neden }; };
  var SOZLUK = K("ISTQB Sözlüğü (glossary.istqb.org)", "https://glossary.istqb.org/", "Test terimlerinin resmi tanımlarını aramak için; arama kutusuna terimi yaz.");
  var CTFL = K("ISTQB CTFL v4.0.1 müfredatı (PDF)", "https://istqb.org/?sdm_process_download=1&download_id=3345", "Bu konunun resmî müfredattaki yeri ve tanımları; PDF 2024-09-15 sürümüdür.");

  E[22] = {
    analoji: { a: "Terzi ölçü kâğıdına göre diktiyse doğrulama tamam; müşteri ceketi giyip rahat ettiyse geçerleme tamam. Test ikisini de ister.", sinir: "Giysinin rahatlığı bir kişiye göre ölçülür; yazılımda ihtiyaç birçok paydaşa ve ortama göre değişir." },
    rehberli: ["Bir 'sepete ürün ekle' özelliği için üç doğrulama sorusu (belirtime uygun mu) yaz.","Aynı özellik için üç geçerleme sorusu (kullanıcının işini görüyor mu) yaz.","Her soruyu kimin cevaplayabileceğini yanına yaz (test, ürün sahibi, gerçek kullanıcı)."],
    bagimsiz: "Kendi seçtiğin bir uygulama için kâğıt üzerinde yarım sayfalık bir not hazırla: belirtime uygunluk kanıtı ne olurdu, ihtiyaca uygunluk kanıtı ne olurdu. Hata ayıklama görevi: 'Tüm testler geçti, ürün hazır' cümlesindeki eksik varsayımı bul ve düzelt.",
    hatalar: [["Geçerlemeyi doğrulamanın başka adı sanmak","Biri belirtime, öbürü ihtiyaca bakar; kanıtları farklıdır."],["Kabul testini yalnız doğrulama saymak","Kabul testi geçerleme ve dağıtıma hazırlık odaklıdır."],["'Hatasız = başarılı' demek","Kusursuzluk yanılgısıdır; ihtiyaç karşılanmayabilir."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen üç durumu doğrulama ya da geçerleme olarak gerekçesiyle sınıflandırabilmek.", kritik: ["Doğrulama ile geçerlemenin aynı şey olduğunu sanmak","Tüm testlerin geçmesinin ürünün başarılı olacağını garanti ettiğini sanmak"] },
    kaynaklar: [CTFL, SOZLUK],
    telafi: "Takıldıysan tek bir özellik seç ve iki soruyu yan yana yaz: 'belirtimde ne yazıyor?' ve 'kullanıcı bununla ne yapmak istiyor?'. Cevaplar ayrışıyorsa fark ortaya çıkar.",
    sonraki: "Sıradaki konu: Test esası, testware ve izlenebilirlik. Bir gereksinim değişti ve hangi testlerin etkilendiğini kimse bilmiyor; bunu orada göreceksin."
  };

  E[23] = {
    analoji: { a: "Yemek tarifi test esası, mutfakta ortaya çıkan malzeme ve tabaklar testware, hangi tabağın hangi tariften çıktığını gösteren defter izlenebilirliktir.", sinir: "Tarif bir kez yazılır; test esası ise sprint boyunca değişir ve bağlar bu değişimi izlemelidir." },
    rehberli: ["Üç gereksinim ve altı test durumu uydur; bir izlenebilirlik tablosu çiz.","Gereksinimlerden birini değiştir ve hangi test durumlarının etkilendiğini işaretle.","Hiç testi olmayan bir gereksinim bırak ve tablodan bunu nasıl fark ettiğini yaz."],
    bagimsiz: "Kendi küçük projen için test esası kaynaklarını (gereksinim, hikâye, risk listesi) ve her faaliyetin üretmesi gereken testware'i tek sayfada listele. Hata ayıklama görevi: 'Test planı yazdık, testware tamam' cümlesindeki eksikleri bul.",
    hatalar: [["Test esasını yalnız gereksinim belgesi sanmak","Kullanıcı hikâyesi, kabul ölçütü, risk analizi ve tasarım da test esası olabilir."],["İzlenebilirliği bir kez kurup bırakmak","Değişiklikle bağlar bozulur; güncellemeyi sürecin parçası yap."],["Test günlüğünü testware saymamak","Günlük ve kusur raporu yürütme çıktılarıdır, testware'dir."]],
    gecme: { olcut: "Mini sınavda %80 ve bir değişikliğin etkilediği testleri izlenebilirlik tablosundan bulabilmek.", kritik: ["Testware'in yalnız test planından ibaret olduğunu sanmak","İzlenebilirliğin yalnız denetim için tutulduğunu sanmak"] },
    kaynaklar: [CTFL, SOZLUK],
    telafi: "Takıldıysan tek bir gereksinim al ve ona bağlı her şeyi sırayla yaz: koşul, durum, betik, sonuç, kusur. Bu zinciri çizmek izlenebilirliği gösterir.",
    sonraki: "Sıradaki konu: Yedi test ilkesi: testler eskir (pestisit paradoksu), kusurlar kümelenir. Aylardır aynı 200 test geçiyor ama kullanıcılar yeni kusurlar bildiriyor; bunu orada göreceksin."
  };

  E[24] = {
    analoji: { a: "Aynı ilaçla sürekli savaşılan böcek bağışıklık kazanır; aynı testleri hep koşturursan kusurlar o testlerin görmediği yere taşınır.", sinir: "Böcekler gerçekten uyum sağlar; testlerde ise eskiyen şey testin kapsadığı alandır, kusurlar uyum sağlamaz." },
    rehberli: ["Yedi ilkeyi birer cümleyle ve birer örnekle yaz.","Üç sürümde aynı testle azalan kusur sayısı için dört maddelik bir yenileme planı yaz.","Kusurlar kümelenir ilkesinden bir risk sırası çıkar: hangi modüle ilk bakarsın?"],
    bagimsiz: "Kendi projen ya da hayali bir uygulama için hangi testlerin eskimeye en yatkın olduğunu belirle ve her biri için yenileme önerisi yaz. Hata ayıklama görevi: 'Tüm testlerimiz geçti, kusur kalmamıştır' cümlesindeki yanlış ilkeyi bul.",
    hatalar: [["Pestisit paradoksunu 'testler işe yaramaz' sanmak","Tekrar bazen yararlıdır (regresyon); sorun, tek başına yetmemesidir."],["Kusur yokluğunu doğruluk saymak","Birinci ilke: test yokluğu kanıtlayamaz."],["Her projeye aynı testi uygulamak","Altıncı ilke: test bağlama bağlıdır."]],
    gecme: { olcut: "Mini sınavda %80 ve üç durumu doğru ilkeyle eşleyebilmek.", kritik: ["Aynı testleri tekrar etmenin her zaman gereksiz olduğunu sanmak","Kusur bulunamamasının doğruluk anlamına geldiğini sanmak"] },
    kaynaklar: [CTFL, SOZLUK],
    telafi: "Takıldıysan yedi ilkeyi her biri için tek anahtar kelimeyle yaz (varlık, kapsamlı, erken, küme, eskime, bağlam, yanılgı) ve her anahtara bir örnek ekle.",
    sonraki: "Sıradaki konu: İnceleme süreci ve rolleri: yönetici, yazar, moderatör, kâtip, gözden geçiren. Bir inceleme toplantısında herkes konuşuyor ama kararlar kayboluyor; bunu orada göreceksin."
  };

  E[25] = {
    analoji: { a: "Tiyatro provasında yönetmen provayı yönetir, oyuncu metni sahiplenir, suflör kararları not eder, izleyiciler eksikleri söyler.", sinir: "Provada herkes doğaçlama yapabilir; incelemede ise adımlar ve kayıtlar tutarlı olmalıdır." },
    rehberli: ["Beş kişi ve beş rol için bir rol dağılımı yaz.","Bir gereksinim incelemesini beş süreç adımına böl ve her adımın çıktısını yaz.","Bulunan altı anomaliden hangilerinin kusur olabileceğini gerekçeyle ayır."],
    bagimsiz: "Kendi çalıştığın ya da hayali bir belge için bir inceleme planı hazırla: kapsam, roller, çıkış ölçütü ve süre. Hata ayıklama görevi: 'Toplantıda herkes konuştu, not tutan yoktu' durumundaki eksik rolü ve sonucu yaz.",
    hatalar: [["Kâtip ile moderatörü karıştırmak","Kâtip kayıt tutar; moderatör toplantıyı yönetir."],["Anomaliyi kusur saymak","Anomali analizden sonra kusur olabilir ya da olmayabilir."],["Katılımcıyı değerlendirmeyi amaç yapmak","Amaç ürünü iyileştirmektir, kişiyi puanlamak değil."]],
    gecme: { olcut: "Mini sınavda %80 ve bir toplantı senaryosunda eksik rolü bulabilmek.", kritik: ["Kâtibin toplantıyı yönettiğini sanmak","Her anomalinin kusur olduğunu sanmak"] },
    kaynaklar: [CTFL, SOZLUK],
    telafi: "Takıldıysan rolleri sorulara çevir: Kim karar verir? Kim yönetir? Kim yazar? Kim düzeltir? Kim bulur? Sonra her soruya bir rol eşle.",
    sonraki: "Sıradaki konu: İnceleme türleri: gayriresmî, walkthrough, teknik inceleme, inspection. Aynı belge için çay masasında iki dakikalık bakış da yapılabilir, tutanaklı resmî inceleme de; bunu orada göreceksin."
  };

  E[26] = {
    analoji: { a: "Arkadaşa kısaca göstermek gayriresmî, makaleyi sunarak anlatmak walkthrough, uzman kurulunda tartışmak teknik inceleme, hakem sürecinden geçirmek inspection gibidir.", sinir: "Akademik sürece benzer ama yazılımda amaç yayın değil kusur bulma ve kalite güvencesidir." },
    rehberli: ["Dört türü bir tabloya yaz: yöneten, amaç, resmîlik, çıktı.","Üç hayali durum için (hızlı fikir, mimari karar, kritik gereksinim) tür seç ve gerekçe yaz.","Aynı belgeye iki türü art arda uygulayan bir plan yaz."],
    bagimsiz: "Kendi belgen ya da hayali bir kullanıcı hikâyesi için iki farklı inceleme türünü seç ve karşılaştır. Hata ayıklama görevi: 'Her inceleme inspection olmalı' iddiasındaki eksikliği gerekçeyle yaz.",
    hatalar: [["Walkthrough'ta lideri moderatör sanmak","Walkthrough'u yazar yönetir."],["Teknik incelemeyi gayriresmî saymak","Teknik incelemede moderatör ve teknik yeterli gözden geçirenler vardır."],["Inspection'da yazarı kâtip yapmak","Inspection'da yazar lider ya da kâtip olamaz."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen üç durum için doğru inceleme türünü gerekçesiyle seçebilmek.", kritik: ["Inspection ile walkthrough'un aynı olduğunu sanmak","Tek bir inceleme türünün her durumda en iyi olduğunu sanmak"] },
    kaynaklar: [CTFL, SOZLUK],
    telafi: "Takıldıysan her türü tek anahtar kelimeye indir: gayriresmî = süreçsiz, walkthrough = yazar, teknik = karar, inspection = resmî ve ölçülü.",
    sonraki: "Sıradaki konu: Test eforu tahmini: oran, ekstrapolasyon, Wideband Delphi, üç nokta. Yönetici 'test ne kadar sürer?' diye soruyor; bunu orada göreceksin."
  };

  E[27] = {
    analoji: { a: "Yolculuk süresini tahmin etmek: geçen seferin oranı, son üç seferin ortalaması, arkadaşlarla gizli tahmin ve iyi-orta-kötü senaryo.", sinir: "Yol süresinin ölçümü kesindir; testte ise tahmin her zaman varsayımlara dayanır." },
    rehberli: ["Geliştirme:test oranı 4:3 ve geliştirme 80 kişi-gün ise test eforunu hesapla.","Son üç iterasyonun test eforları 18, 22 ve 20 ise sonraki iterasyon için ekstrapolasyon yap.","a=3, m=6, b=15 için E ve SD'yi bul ve aralığı yaz."],
    bagimsiz: "Kendi küçük projen için iki tahmin tekniği seç ve sonuçları karşılaştır. Hata ayıklama görevi: 'Test 3 gün sürer' cümlesini varsayım ve aralık ekleyerek yeniden yaz.",
    hatalar: [["Üç nokta formülünü (a+m+b)/3 sanmak","Doğrusu (a + 4m + b) / 6."],["Delphi'de uzmanların birbirini görerek tahmin etmesi","Her tur izole yapılır; sonra tartışılır."],["Oranı ters kullanmak","Geliştirme:test 3:2 ise test = geliştirme x 2 / 3."]],
    gecme: { olcut: "Mini sınavda %80 ve oran, ekstrapolasyon ve üç nokta hesaplarını doğru yapabilmek.", kritik: ["Üç nokta formülünde ortadaki değeri 4 ile çarpmayı unutmak","Tahminin kesin bir söz olduğunu sanmak"] },
    kaynaklar: [CTFL, SOZLUK],
    telafi: "Takıldıysan formülleri kâğıda yaz, sayıları yerine koy ve adım adım hesapla. Önce oran ve ortalama gibi kolay olanlarla başla.",
    sonraki: "Sıradaki konu: Giriş ve çıkış ölçütleri, Definition of Ready ve Definition of Done. Henüz kabul ölçütü bile yazılmamış bir hikâye sprinte girer ve kimse ne zaman bittiğini bilmez; bunu orada göreceksin."
  };

  E[28] = {
    analoji: { a: "Yolculuğa çıkmadan önce yakıt ve bilet kontrolü Ready, varışta eşyaların tam olması Done'dır.", sinir: "Yolculukta varış nettir; yazılımda 'bitti' sınırı ölçüte yazılmazsa herkes başka bir yerde durur." },
    rehberli: ["Bir hikâye için dört maddelik Definition of Ready yaz.","Aynı hikâye için dört ölçülebilir madde içeren Definition of Done yaz.","'Kodlama bitti' maddesini ölçülebilir bir cümleye çevir."],
    bagimsiz: "Kendi proje ya da hayali bir ekip için Ready ve Done listelerini yaz ve iki sprint boyunca hangi maddenin en çok işe yarayacağını gerekçelendir. Hata ayıklama görevi: 'Test bitince çıkarız' ölçütünü ölçülebilir hale getir.",
    hatalar: [["Ready ve Done'ı aynı liste saymak","Biri başlangıç, biri bitiş kapısıdır."],["Çıkış ölçütünü tüm testlerin geçmesine bağlamak","Kabul edilen risk eşiği de ölçüt olabilir."],["Done'ı test edilmemiş maddeyle bitirmek","Done, testlerin geçtiğini kanıtlar."]],
    gecme: { olcut: "Mini sınavda %80 ve bir hikâye için dört maddelik ölçülebilir Ready ve Done listesi yazabilmek.", kritik: ["Ready ile Done'ın aynı şey olduğunu sanmak","Çıkış ölçütünün yalnız tüm testlerin geçmesi olduğunu sanmak"] },
    kaynaklar: [CTFL, SOZLUK],
    telafi: "Takıldıysan önce 'neye başlamadan önce neyi bilmek isterim?' (Ready) sonra 'bitti demek için ne görmek isterim?' (Done) sorusunu sor ve cevapları sayıyla yaz.",
    sonraki: "Sıradaki konu: K3 hesap: eşdeğerlik sınıfları ve sınır değer sayımı (2 ve 3 değerli). Sınavda 'kaç test gerekir?' ya da 'hangi değerler seçilir?' soruları hesap ister; bunu orada göreceksin."
  };

  E[29] = {
    analoji: { a: "Kapı eşiği: yüksekliği anlamak için tam eşiğe ve iki yanına basarsın.", sinir: "Eşik bir noktadır; yazılımda sınır birden çok girdide ve birleşimde olabilir." },
    rehberli: ["Adet 1 ile 50 arası geçerli. Sınıfları yaz ve her birinden bir değer seç.","Aynı aralık için 2 değerli ve 3 değerli sınır değerleri listele.","'adet < 50' yerine 'adet <= 50' yazılmış kodu hangi sınır değerlerin yakalayacağını belirle."],
    bagimsiz: "Kendi seçtiğin bir sayısal girdi (puan 0-100, indirim yüzdesi, sepet adedi) için sınıfları, 2 değerli ve 3 değerli SDA değerlerini yaz. Hata ayıklama görevi: 'Ortadaki değer geçtiyse alan doğrudur' cümlesindeki yanlış varsayımı bul.",
    hatalar: [["Geçersiz sınıfları atlamak","Kapsam hesabında paydaya geçersizler de girer."],["2 değerli ile 3 değerliyi karıştırmak","2 değerli 4, 3 değerli 6 değer verir (18-65 için)."],["SDA'yı sırasız sınıflarda uygulamak","SDA yalnız sıralı sınıflar içindir."]],
    gecme: { olcut: "Mini sınavda %80 ve bir aralık için 2 ve 3 değerli test değerlerini doğru yazabilmek.", kritik: ["SDA'nın tüm girdi türlerine uygulanabildiğini sanmak","EP'de sınıf başına çok değer gerektiğini sanmak"] },
    kaynaklar: [CTFL, SOZLUK],
    telafi: "Takıldıysan aralığı sayı doğrusuna çiz, sınıfları renklendir, sınırları işaretle. Sonra her sınır için önce 2 sonra 3 değer yaz.",
    sonraki: "Sıradaki konu: K3 hesap: karar tablosu sütun sayımı, okuma ve kapsam. İş kuralı birkaç koşulun birleşimine göre sonuç veriyor ve hangi birleşimi unuttuğunu bilmiyorsun; bunu orada göreceksin."
  };

  E[30] = {
    analoji: { a: "Kombinasyon kilidi: her basamaktaki seçenek sayısı çarpılır, karar tablosu tüm kombinasyonları listeler.", sinir: "Kilidin tek doğru kombinasyonu vardır; tabloda ise her sütunun bir beklenen sonucu vardır." },
    rehberli: ["Üç koşullu bir kural için 8 sütunlu tam tabloyu çiz.","Sonucu aynı olan iki sütunu bul ve tireyle birleştir.","Bir sütunu olanaksız say (N/A) ve kapsam yüzdesini yeniden hesapla."],
    bagimsiz: "Kendi uydurduğun bir üç koşullu iş kuralı için tam tablo, birleştirilmiş tablo ve kapsam hesabını kâğıtta yap. Hata ayıklama görevi: 'Beş koşul var, 10 test yeter' cümlesindeki sütun hatasını bul.",
    hatalar: [["Sütun sayısını koşul sayısı kadar sanmak","n koşul 2 üzeri n sütun verir."],["Tire ile N/A'yı karıştırmak","Tire etkisiz, N/A olanaksız demektir."],["Kapsamı tüm sütunlara bölmek","Uygulanabilir sütunlara böl."]],
    gecme: { olcut: "Mini sınavda %80 ve üç koşullu bir tabloda sütun sayısı, birleştirme ve kapsamı doğru hesaplayabilmek.", kritik: ["Sütun sayısının koşul sayısına eşit olduğunu sanmak","Tire ile N/A'nın aynı olduğunu sanmak"] },
    kaynaklar: [CTFL, SOZLUK],
    telafi: "Takıldıysan ilk koşulu sütunların yarısı D yarısı Y olacak şekilde yaz, ikinci koşulu bir önceki yarının yarısına böl; böylece tüm birleşimler eksiksiz çıkar.",
    sonraki: "Sıradaki konu: K3 hesap: durum geçişi testi, geçiş sayımı ve kapsam yüzdesi. Bir sipariş 'yeni', 'ödendi', 'kargoda', 'teslim edildi' ya da 'iptal' olabilir; bunu orada göreceksin."
  };

  E[31] = {
    analoji: { a: "Metro haritasında her istasyondan geçmek bir şeydir, her hattı kullanmak başka bir şeydir.", sinir: "Metroda geçersiz hat yoktur; yazılımda ise olmaması gereken geçişler de denenir." },
    rehberli: ["Beş durumlu sipariş modelinden geçerli geçişleri say.","Durum tablosunu çiz, boş hücreleri say.","Üç farklı test dizisi yaz ve her birinin durum ve geçiş kapsamını hesapla."],
    bagimsiz: "Kendi uydurduğun dört durumlu bir model (örneğin oturum: giriş yok, giriş yaptı, kilitli, çıkış) için durum tablosu, geçerli geçiş sayısı ve tüm geçerli geçişleri kapsayan en az test dizisi sayısını bul. Hata ayıklama görevi: 'Tüm durumlar kapsandı, bitti' iddiasının zayıflığını açıkla.",
    hatalar: [["Durum kapsamını geçiş kapsamı sanmak","Tüm durumlar daha zayıftır."],["Geçersiz geçişleri hiç denememek","Tüm geçişler kapsamı geçersizleri de ister."],["Hücre sayısını durum sayısıyla karıştırmak","Hücre = durum x olay."]],
    gecme: { olcut: "Mini sınavda %80 ve bir diyagramda geçiş sayımı ile kapsam yüzdesini doğru hesaplayabilmek.", kritik: ["Tüm durumlar kapsamının geçerli geçişleri de garantilediğini sanmak","Geçersiz geçişlerin testte gereksiz olduğunu sanmak"] },
    kaynaklar: [CTFL, SOZLUK],
    telafi: "Takıldıysan ok sayısını önce say, sonra tabloyu satır = durum, sütun = olay olarak çiz ve boş hücreleri işaretle.",
    sonraki: "Sıradaki konu: K3 hesap: ifade ve dal kapsamı, en az test sayısı. Kod parçası verilir ve 'testler kodun yüzde kaçını kapsıyor?' diye sorulur; bunu orada göreceksin."
  };

  E[32] = {
    analoji: { a: "Şehir turu: her sokaktan geçmek ifade kapsamı, her kavşakta hem sağa hem sola dönmek dal kapsamıdır.", sinir: "Turda sokak sayısı bellidir; kodda ise veriye bağlı yollar çalışmadan görünmeyebilir." },
    rehberli: ["Altı ifadeli örnek kodu çiz ve ifadeleri numaralandır.","x = 10 ve x = 3 girdileri için koşan ifadeleri ve karar sonuçlarını işaretle.","%100 dal kapsamı için gereken en az girdi çiftini bul."],
    bagimsiz: "Kendi yazdığın üç if'li küçük bir işlev için ifade kapsamı ve koşullu dal kapsamı tablosu çıkar. Hata ayıklama görevi: 'Tüm ifadeler koştu, dallar da tamam' iddiasının neden yanlış olabileceğini örnekle göster.",
    hatalar: [["İfade kapsamını dal kapsamı sanmak","İfade kapsamı else yolunu garanti etmez."],["Toplamı bölen olarak almamak","Kapsam = koşan / toplam."],["Koşulsuz dalları unutmak","Müfredat tanımına göre koşulsuz aktarımlar da dal sayılır; sorudaki tanıma uy."]],
    gecme: { olcut: "Mini sınavda %80 ve bir kod için ifade ve dal kapsamını doğru hesaplayabilmek.", kritik: ["%100 ifade kapsamının tüm kararları sınadığını sanmak","Dal kapsamının ifade kapsamından zayıf olduğunu sanmak"] },
    kaynaklar: [CTFL, SOZLUK],
    telafi: "Takıldıysan kodu satır satır yaz, her satırın yanına hangi girdide koştuğunu not et. Sonra sayarak böl.",
    sonraki: "Sıradaki konu: Risk düzeyi hesabı, proje ve ürün riski, onay ve regresyon testi. Zaman kıt ve yüz test var; bunu orada göreceksin."
  };

  E[33] = {
    analoji: { a: "Hava durumu uyarısında yağma ihtimali ve ıslanmanın bedeli birlikte önlem almayı belirler.", sinir: "Hava tahmini olasılığı veri verir; testte olasılık ve etki çoğu zaman uzman tahminidir." },
    rehberli: ["Beş test için olasılık ve etki puanı ver, risk düzeylerini çarpıp sırala.","Üç riski proje ya da ürün riski olarak sınıflandır.","Bir kusur düzeltmesi için onay testini ve üç regresyon testini seç."],
    bagimsiz: "Kendi küçük projen için sekiz maddelik risk tablosu hazırla ve sıraya diz. Hata ayıklama görevi: 'Düzeltme geçti, regresyon gereksiz' cümlesindeki eksiği bul.",
    hatalar: [["Olasılık ve etkiyi toplamak","Niceliksel risk çarpımla bulunur."],["Proje ve ürün riskini karıştırmak","Biri yönetim, diğeri ürün kalitesidir."],["Regresyonu atlamak","Düzeltme başka yeri bozabilir."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen olasılık-etki sayılarıyla doğru risk sırası ve doğru onay/regresyon seçimi.", kritik: ["Risk düzeyinin toplamla bulunduğunu sanmak","Onay testinin regresyon yerine geçtiğini sanmak"] },
    kaynaklar: [CTFL, SOZLUK],
    telafi: "Takıldıysan sayıları tabloya yaz, çarp ve büyükten küçüğe diz. Sonra her satır için 'ne bozulursa kim zarar görür?' sorusunu sor.",
    sonraki: "Yolun sonu: QA yolunun ek konularını da bitirdin. Şimdi soru bankasıyla tekrar et ve kendi test planında bu derslerin hesaplarını uygula."
  };
})();

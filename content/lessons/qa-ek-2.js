/* QA yolu · ISTQB CTFL v4.0.1 kapsam turu: konu başına ders eki, ikinci parça (anahtar = TMAP.qa dizini, 18–21; ders no = anahtar + 1).
   Kapsam: işbirliğine dayalı test (kullanıcı hikâyesi, kabul ölçütü, ATDD), test yönetimi ayrıntısı (giriş/çıkış ölçütü, tahmin, önceliklendirme, piramit, çeyrekler),
   roller, bağımsızlık, bakım testi ve konfigürasyon yönetimi.
   Alanlar: benzetme + sınırı, rehberli alıştırma, bağımsız görev, yaygın hatalar, geçme ölçütü + kritik yanlış anlama, dış kaynak (son doğrulama tarihiyle), telafi/sonraki adım.
   Tüm alıştırmalar kâğıt üzerinde ya da kendi test ortamında yapılır; başkasının sistemine ya da canlı veriye dokunulmaz. Örnekler "simülasyon"dur.
   Dış kaynak: yalnız HTTP 200 dönenler (curl, 2026-10-19). */
(function () {
  var E = ((window.PP_EK = window.PP_EK || {}).qa = (window.PP_EK.qa || {}));
  var DOG = "2026-10-19";
  var K = function (t, u, neden) { return { t: t, u: u, dogrulama: DOG, neden: neden }; };
  var SOZLUK = K("ISTQB Sözlüğü (glossary.istqb.org)", "https://glossary.istqb.org/", "Test terimlerinin resmi tanımlarını aramak için; arama kutusuna terimi yaz.");
  var CTFL = K("ISTQB CTFL v4.0 resmî sayfası", "https://www.istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0", "Sınav yapısı ve müfredat (v4.0.1) indirme bağlantıları resmî sayfada.");

  E[18] = {
    analoji: { a: "Ev yaptırmadan önce mimar, usta ve ev sahibi planın başında toplanır. Ev sahibi 'mutfak geniş olsun' der, usta 'kaç metre?' diye sorar, mimar ölçüyü yazar. Hikâye toplantısında testçi de usta gibi 'kaç saniye, kaç kez, süre dolarsa ne olur?' diye sorar.", sinir: "Ev planı bir kez çizilir ve pek değişmez; hikâye ve kabul ölçütleri her sprintte yeniden konuşulur ve güncellenir." },
    rehberli: [
      "'Müşteri olarak sepete kupon kodu girmek istiyorum' hikâyesini INVEST altı harfiyle kontrol et ve her harfe bir cümle yaz (örneğin Küçük: tek ekranda biter mi?).",
      "Aynı hikâye için önce iki senaryo odaklı (Given-When-Then), sonra iki kural odaklı (madde) kabul ölçütü yaz. Hangisinin hangi ölçütte daha doğal durduğunu bir cümleyle belirt.",
      "Ölçütlerden en az beş kabul testi türet (geçerli kupon, süresi dolmuş kupon, ikinci kez kullanım, boş alan, çok uzun kod). Her teste girdi ve beklenen sonucu yaz."
    ],
    bagimsiz: "Kendi seçtiğin bir uygulama için (alışveriş, not defteri ya da bir banka ekranı) kâğıt üzerinde bir kullanıcı hikâyesi yaz. Üç kabul ölçütü ekle ve bu ölçütlerden kodlamadan önce beş kabul testi türet. Hata ayıklama görevi: 'Sayfa hızlı açılmalı, kullanıcı dostu olmalı' ölçütündeki ölçülemeyen iki ifadeyi bul ve sayı ile koşul koyarak yeniden yaz.",
    hatalar: [
      ["Ölçütü 'hızlı ve kullanışlı olmalı' diye bırakmak", "Test türetilemez; '2 saniyede açılır, klavye ile gezilir' gibi sayı ve koşul yaz."],
      ["Testi hikâye bittikten sonra yazmak", "ATDD'de testler kodlamadan önce ölçütten türer; böylece herkes aynı şeyi anlamış olur."],
      ["Hikâyeyi büyük bırakmak", "Bir sprintte bitmeyen hikâye test edilemez; INVEST'in 'Küçük' ve 'Test edilebilir' harflerine göre böl."]
    ],
    gecme: { olcut: "Mini sınavda %80 ve bir hikâye için en az iki biçimde (senaryo ve kural odaklı) ölçüt yazıp bunlardan beş kabul testi türetebilmek.", kritik: [
      "Kabul ölçütünün yalnız test aşamasında yazılan bir belge olduğunu sanmak",
      "'Hızlı olmalı' gibi ölçülemeyen bir ifadenin geçerli kabul ölçütü olduğunu sanmak"
    ] },
    kaynaklar: [
      K("Agile Alliance: ATDD", "https://www.agilealliance.org/glossary/atdd/", "Kabul testi güdümlü geliştirmenin kısa tanımı."),
      K("Agile Alliance: INVEST", "https://www.agilealliance.org/glossary/invest/", "İyi hikâyenin altı niteliği."),
      K("Cucumber: Gherkin referansı", "https://cucumber.io/docs/gherkin/reference/", "Given-When-Then sözdiziminin ayrıntısı."),
      CTFL
    ],
    telafi: "Takıldıysan hikâyeyi tek cümleye indir, sonra yalnız 'hangi sayıyı ya da koşulu ölçerek bitti derim?' diye sor. Biçimi (Given-When-Then ya da madde) en son seç.",
    sonraki: "Sıradaki konu: Tahmin, önceliklendirme, test piramidi ve çeyrekler. Ölçütlerden çıkan testleri süreye ve riske göre nasıl planlayacağını orada göreceksin."
  };

  E[19] = {
    analoji: { a: "Yolculuğa çıkmadan önce valiz hazırlarsın: giriş ölçütü 'araba yakıtlı, bilet elde', çıkış ölçütü 'vardım ve eşyalar tamam'. Valize sığmayacağını bilirsen önce pasaportu ve ilacı koyarsın, yani riske göre öncelik verirsin.", sinir: "Valizde eşyaların önemi belli ve sabittir; testte risk bilgi geldikçe değişir ve plan sürekli güncellenir." },
    rehberli: [
      "Bir sürüm için giriş ölçütünü (en az üç madde) ve çıkış ölçütünü (en az üç ölçülebilir madde) yaz. Çıkış maddelerinden biri 'süre bitti' ise onu sayıyla değiştir.",
      "Oran tabanlı tahmin: geçen sürümde geliştirme 20 gün, test 8 gün sürdü. Bu sürümde geliştirme 15 gün ise test eforunu hesapla. Sonra üç nokta ile (2, 5, 14 gün) aynı işi tahmin et ve iki sonucu karşılaştır.",
      "Beş testi (ödeme, giriş, arama, profil teması, parola sıfırlama) olasılık x etki ile puanla, risk tabanlı sıraya diz. Hangi testin hangi çeyreğe (Q1-Q4) ve piramidin hangi katmanına düştüğünü yanına yaz."
    ],
    bagimsiz: "Kendi küçük projen için tek sayfalık bir test planı yaz: giriş ve çıkış ölçütü, iki yöntemle tahmin (oran tabanlı ve üç nokta), risk sırasına göre en az sekiz test ve bunların piramit katmanı. Hata ayıklama görevi: 'Çıkış ölçütü: test süresi bitince' ve 'Tahmin: 3 gün' yazan bir planda iki eksiği bul, ölçülebilir hale getir.",
    hatalar: [
      ["Çıkış ölçütünü 'süre bitti' yapmak", "Süre bitişi ölçüt değildir; kapsam ve açık hata eşiği gibi ölçülebilir koşul koy."],
      ["Tahmini tek sayı olarak vermek", "Üç nokta ya da aralık ver; belirsizlik karar verene görünür olsun."],
      ["Piramidi ters çevirmek", "Arayüz testi yavaş ve kırılgandır; çoğu mantığı birim ve API katmanında koştur."]
    ],
    gecme: { olcut: "Mini sınavda %80 ve verilen sayılarla oran tabanlı ve üç nokta tahmini doğru hesaplayıp testleri risk puanına göre sıralayabilmek.", kritik: [
      "Çıkış ölçütünün 'tüm testlerin geçmesi' demek olduğunu sanmak (kabul edilen risk eşiği de ölçüttür)",
      "Önceliklendirmenin yalnız riske göre yapıldığını sanmak (kapsam, gereksinim ve bağımlılık da vardır)"
    ] },
    kaynaklar: [
      K("Atlassian: Çevik tahmin", "https://www.atlassian.com/agile/project-management/estimation", "Çevik takımlarda tahmin yöntemlerine genel bakış."),
      K("Wikipedia: Three-point estimation", "https://en.wikipedia.org/wiki/Three-point_estimation", "Üç nokta tahmin formülü ve mantığı."),
      K("Martin Fowler: Test Pyramid", "https://martinfowler.com/bliki/TestPyramid.html", "Test piramidinin kısa anlatımı."),
      K("Lisa Crispin: Agile Testing Quadrants", "https://lisacrispin.com/2011/11/08/using-the-agile-testing-quadrants/", "Çeyreklerin hangi soruya hizmet ettiği."),
      CTFL
    ],
    telafi: "Takıldıysan önce yalnız çıkış ölçütünü yaz ve 'bunu bir sayıyla ölçebilir miyim?' diye sor. Tahmini ve sırayı ondan sonra ekle.",
    sonraki: "Sıradaki konu: Roller, bağımsızlık, bakım testi ve konfigürasyon yönetimi. Planı kimin yürüteceğini ve canlıdaki değişikliklerin nasıl sınanacağını orada göreceksin."
  };

  E[20] = {
    analoji: { a: "Apartman asansörünün bakımı: yöneticiler bakım planını yapar (yönetim rolü), teknisyen kontrolü uygular (test rolü). Bakım sonrası kayıt defterine hangi parçanın hangi tarihte, hangi sürüm numarasıyla değiştiği yazılır.", sinir: "Asansörde parça fiziksel ve tek tektir; yazılımda aynı derlemenin farklı ortam, veri ve betik sürümleri vardır, bu yüzden kaydın daha ayrıntılı olması gerekir." },
    rehberli: [
      "Kendi çalıştığın ya da bildiğin bir ekipte test yönetimi rolü ile test rolünü iki sütunda göster. Hangi görevlerin hangi sütuna düştüğünü yaz ve aynı kişinin iki rolü birden yürüttüğü bir durum örneği ver.",
      "Canlı sistemde 'ödeme sağlayıcısının sürümü değişti' olayı için etki analizi yap: hangi üç alan etkilenir? Bunlardan onaylama ve regresyon testi olarak hangisini hangi sırayla koşarsın?",
      "Bir test sonucu kaydı hazırla: test adı, derleme sürümü, test verisi sürümü, tarih, sonuç. Aynı testin başka sürümdeki sonucuyla karşılaştırılabilir olması için hangi alanı eklerdin?"
    ],
    bagimsiz: "Kâğıt üzerinde bir 'bakım testi planı' yaz: canlıdaki bir değişikliği seç (kargo kuralı, parola uzunluğu), etkilenen üç alanı belirt, hangi testlerin yeniden koşulacağını ve sonucun hangi sürüme bağlanacağını yaz. Hata ayıklama görevi: 'Sonuçlar bu hafta temiz çıktı' yazan ama sürümü olmayan bir kaydı, hangi alanlar eksik olduğunu bularak düzelt.",
    hatalar: [
      ["Küçük değişikliğe regresyon bakmamak", "Etki analiziyle komşu alanları belirle; küçük değişiklik de başka yeri bozabilir."],
      ["Test sonucunu derleme sürümüne bağlamamak", "Hangi sürüme karşı koştuğu yazılmayan sonuç tekrarlanamaz; sürüm ve veri sürümünü kayda ekle."],
      ["Geliştiricinin yalnız kendi kodunu test etmesine güvenmek", "Yazar kendi varsayımını göremez; en az bir bağımsız göz ekle."]
    ],
    gecme: { olcut: "Mini sınavda %80 ve verilen bir canlı değişiklik için etki analizi, yeniden koşulacak testler ve sürüm kaydını yazabilmek.", kritik: [
      "Bağımsızlığın her zaman daha iyi olduğunu sanmak (iletişim kopabilir)",
      "Bakım testinin yalnız yeni özellik eklenince yapıldığını sanmak (taşıma ve emeklilik de tetikler)"
    ] },
    kaynaklar: [
      K("Atlassian: Sürüm kontrolü nedir", "https://www.atlassian.com/git/tutorials/what-is-version-control", "Sürümlü ve izlenebilir kayıt fikrinin temeli."),
      K("Wikipedia: Software maintenance", "https://en.wikipedia.org/wiki/Software_maintenance", "Bakım türleri ve neden yapıldığı."),
      K("Atlassian: DevOps nedir", "https://www.atlassian.com/devops/what-is-devops", "Sık değişen sistemlerde testin yeri."),
      SOZLUK,
      CTFL
    ],
    telafi: "Takıldıysan önce 'neyi değiştirdik?' diye sor ve etkilenen alanı bir cümleyle yaz. Sonra yeniden koşulacak testleri ve sürüm kaydını sırayla ekle.",
    sonraki: "Sıradaki konu: Kök neden analizi ve retrospektif. Bir kusurun neden doğduğunu ve bir sonraki iterasyonda nasıl önleneceğini orada çalışacaksın."
  };

  E[21] = {
    analoji: { a: "Sızdıran musluğun altına kova koymak belirtiyi geçici durdurur; kök neden contanın yıpranmasıdır ve onu değiştirmeden sorun döner. Haftalık ev toplantısında 'bu hafta ne iyi gitti, neyi değiştireceğiz?' diye konuşup birine 'conta' görevi vermek retrospektiftir.", sinir: "Musluğun tek bir fiziksel nedeni vardır; yazılım kusurunda birden çok neden iç içe olabilir ve '5 Neden' tek zincir gibi görünse de dal verebilir. Ayrıca retrospektif suçlu aramaz, süreci düzeltir." },
    rehberli: [
      "Bir kusur seç: 'Sepette kargo ücreti 0 TL görünüyor.' Beş kez art arda 'neden?' sor ve her yanıtı kanıta (kural, hikâye, kod, veri) bağla. Sonuncu yanıt bir kişi değil bir süreç ya da gereksinim olmalı.",
      "Kök nedene karşı iki önlem yaz: biri bu kusuru önleyen (ör. kabul ölçütünde hangi toplamın kullanılacağını yazmak), biri erken yakalayan (ör. eşik değerinde sınır değer testi).",
      "Bir iterasyon için üç sütunlu retrospektif tablosu çiz: İyi giden, Geliştirilecek, Eylem. Eylem maddelerine sahip ve tarih ekle."
    ],
    bagimsiz: "Kâğıt üzerinde (simülasyon) bir kusur raporunu al, '5 Neden' zincirini yaz, kök nedeni belirle ve iki eylem maddesi çıkar. Hata ayıklama görevi: şu zinciri düzelt: 'Neden 1: Test başarısız oldu. Neden 2: Ali kodu yanlış yazdı. Kök neden: Ali dikkatsiz.' Hangi adımlarda kanıt eksik, nerede kişi kök neden yapılmış, bulup süreç temelli bir köke çevir.",
    hatalar: [
      ["İlk nedende durmak", "İlk yanıt çoğu zaman belirtinin yakınıdır. Kanıtla en az üç kez daha 'neden?' sor ve süreç ya da gereksinime ulaş."],
      ["Kişiyi kök neden yapmak ('dikkatsizdi')", "İnsan hatası bir kök neden değildir; hatayı mümkün kılan süreç boşluğunu ara (belirsiz hikâye, eksik inceleme, test eksikliği)."],
      ["Eylem maddesini sahipsiz ve tarihsiz bırakmak", "Her eylemin bir sahibi, bir tarihi ve bir ölçüsü olsun; yoksa sonraki retrospektifte aynı konu döner."]
    ],
    gecme: { olcut: "Mini sınavda %80 ve verilen bir kusur için kanıtlı bir 'neden' zinciri, süreç temelli kök neden ve sahibi ile tarihi olan iki eylem maddesini yazabilmek.", kritik: [
      "Kök nedenin bir kişi olduğunu sanmak",
      "Retrospektifin sorunu yalnızca tartışıp eylem maddesi çıkarmadan bitirilebileceğini sanmak"
    ] },
    kaynaklar: [
      K("Atlassian: 5 Whys (5 Neden) oyun planı", "https://www.atlassian.com/team-playbook/plays/5-whys", "Neden zincirini adım adım nasıl yürüteceğin."),
      K("Atlassian: Kök neden analizi", "https://www.atlassian.com/work-management/project-management/root-cause-analysis", "Belirti ile kök neden farkı ve yöntemler."),
      K("Atlassian: Retrospektifler", "https://www.atlassian.com/agile/scrum/retrospectives", "Retrospektif akışı ve eylem maddeleri."),
      SOZLUK,
      CTFL
    ],
    telafi: "Takıldıysan önce kusuru tek cümleyle yaz ve 'bu neden oldu?' sorusunu sadece bir kez yanıtla. Sonra yanıtın yanına kanıtı yaz; kanıt yoksa o adımı 'varsayım' diye işaretle.",
    sonraki: "Sıradaki konu: Doğrulama ve geçerleme: ürün doğru mu yapıldı, doğru ürün mü yapıldı. Test temellerine CTFL 4.0.1 gözüyle dönüp eksik kavramları ve K3 hesap sorularını tamamlayacaksın."
  };
})();

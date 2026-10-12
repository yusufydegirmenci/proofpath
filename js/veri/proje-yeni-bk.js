"use strict";
(function (g) {
  var K = g.PP_PROJ = g.PP_PROJ || { tanim: {}, yeni: [], va: [] };

  /* ---------- LV1 ---------- */

  K.yeni.push({
    yol: "bk", id: "bk1b", lv: 1,
    title: "Dosya Tabanlı Bütçe Defteri (C#)",
    weeks: 2,
    tools: ".NET SDK, VS Code veya Visual Studio, Git, xUnit",
    why: "Para hareketlerinde bir kuruş hata bile güveni bozar; bu yüzden veri tipi ve dosya biçimi seçimi önemlidir. Küçük bir kişisel bütçe defteri yazarak gelir-gider kayıtlarını CSV dosyasında doğru ve geri okunabilir biçimde tutarsın.",
    outcome: ["Para için doğru veri tipini seçip kullanırsın", "Kayıtları CSV dosyasına yazar ve bozuk satırlara dayanıklı okursun", "Aylık özet raporunu LINQ ile üretirsin"],
    pitch: "I built a C# console budget ledger that stores transactions in a CSV file and reports monthly totals by category.",
    steps: [
      ["Defterin veri modelini çiz", "Defter, bir kasa fişi yığınıdır: her fişte tarih, tutar, kategori ve not vardır. Önce fişin üzerinde ne yazacağını kâğıtta belirlersin, sonra koda dökersin.", "Bir kayıt için alanları listele (Id, Tarih, Tutar, Kategori, Not, Tür: gelir/gider). Her alan için C# tipini ve nedenini yaz; tutar için neden decimal seçtiğini bir cümleyle açıkla.", "Alan-tip tablosu (6 satır)", "decimal = ondalık sayı tipi, floating point = kayan nokta, field = alan, data model = veri modeli", "c# decimal vs double money why"],
      ["Proje iskeleti ve Transaction sınıfı", "Sınıf, fiş kalıbıdır; her nesne kalıptan basılmış tek bir fiştir. Kalıba kural koyarsan (negatif tutar olmaz) hatalı fiş hiç basılmaz.", "dotnet new console ile projeyi aç, git init yap. Transaction sınıfını yaz; tutarı 0 veya negatif olan kaydı constructor içinde ArgumentException ile reddet. İlk commit'i at.", "Derlenen proje ve ilk commit", "constructor = yapıcı metot, validation = doğrulama, ArgumentException = geçersiz argüman hatası, commit = kayıt noktası", "c# class constructor validation ArgumentException"],
      ["Menü: ekle ve listele", "Menü, bir lokantanın tezgahıdır: müşteri seçer, mutfak ilgili metodu çalıştırır. Kullanıcı girdisine hiçbir zaman güvenme; sayı beklediğin yere harf gelebilir.", "1 Gelir ekle, 2 Gider ekle, 3 Listele, 4 Çık menüsünü yaz. Tutar girişinde decimal.TryParse kullan; hatalı girişte mesaj verip yeniden sor. Kültür farkını (virgül/nokta) test et.", "Hatalı girişte çökmeyen menü", "TryParse = güvenli çevirme, user input = kullanıcı girdisi, culture = kültür ayarı, loop = döngü", "c# decimal tryparse console input validation"],
      ["CSV'ye kaydet, CSV'den oku", "CSV, her satırı virgülle bölünmüş düz tablodur. Dosya yazarken yarıda kesilirse defter bozulur; bu yüzden önce geçici dosyaya yazıp sonra yerine koymak güvenlidir.", "Kayıtları ledger.csv dosyasına yaz; açılışta oku. Bozuk bir satırı atla, satır numarasıyla uyarı yaz ve kalan satırları yükle. Tutarı InvariantCulture ile yaz.", "Yeniden açınca duran kayıtlar ve bozuk satır uyarısı", "CSV = virgülle ayrılmış değerler, parse = ayrıştırmak, invariant culture = kültürden bağımsız biçim, file I/O = dosya okuma yazma", "c# read write csv file invariantculture skip bad lines"],
      ["LINQ ile aylık özet", "LINQ, tabloya soru sormanın yoludur: GroupBy kategorilere ayırır, Sum her torbanın toplamını verir. Önce soruyu cümleyle yaz, sonra sorguya çevir.", "Verilen bir ay için kategori başına toplam gideri, toplam geliri ve net bakiyeyi yazdıran rapor ekle. En çok harcanan kategoriyi vurgula. Boş ay için 'kayıt yok' mesajı ver.", "Aylık özet raporu çıktısı", "GroupBy = gruplama, Sum = toplam, aggregate = toplulaştırma, net balance = net bakiye", "c# linq groupby sum monthly report"],
      ["Testler ve README", "Test, deftere kendi kendini denetleten bir kontrol listesidir. Para hesabında beklenen değeri elle hesaplayıp teste yazmak, kodu kopyalayıp aynı sonucu beklemekten çok daha güvenilirdir.", "xUnit ile 6 test yaz: negatif tutar reddi, toplam hesabı, boş ay, bozuk satır atlama, CSV yaz-oku gidiş-dönüş, net bakiye. README'ye kurulum ve örnek çıktı ekle, GitHub'a gönder.", "6 geçen test ve README'li repo", "unit test = birim testi, assert = doğrulama, round trip = gidiş-dönüş, README = tanıtım dosyası", "xunit assert decimal csv round trip test c#"],
      ["Dayanıklılık: boş veya eksik dosya, tarih ve yuvarlama", "Gerçek hayatta dosya hep sağlam gelmez: ilk açılışta hiç yoktur, boş olabilir, tarih alanına '30 Şubat' yazılmış olabilir. Para gösterirken kuruş altı artıkların nasıl yuvarlanacağı da yazılı bir karar olmalıdır. Analoji: kasiyer kuruş üstünü her seferinde aynı kuralla yuvarlar.", "ledger.csv yokken ve 0 bayt boşken uygulamayı aç; çökmeden boş defterle başlasın (dosya yoksa oluştur). Tarihi DateTime.TryParseExact ile yyyy-MM-dd biçiminde iste; 30 Şubat gibi geçersiz tarihi ve boş kategoriyi satır numarasıyla reddet. Gösterilen tutarları Math.Round(x, 2, MidpointRounding.AwayFromZero) ile yuvarla ve kararı README'ye yaz. Bu üç davranış için 3 yeni test ekle.", "Boş/eksik dosya, geçersiz tarih ve yuvarlama için 3 geçen yeni test", "missing file = eksik dosya, empty file = boş dosya, TryParseExact = biçimli tarih çözme, rounding = yuvarlama", "c# file not found empty csv tryparseexact math.round midpointrounding"]
    ],
    onkosul: ["Önkoşul: C# değişken, koşul, döngü ve metot bilgisi (bk1 Konsol Görev Yöneticisi'nin 3. adımı düzeyinde).", "Sınıf ve List<T> kullanımı (bk1'in 4. adımı).", "Git ile commit atmayı bilmek."],
    gereksinim: [
      "İşlevsel (zorunlu): Gelir ve gider kaydı eklenir, tutar decimal tipinde tutulur.",
      "İşlevsel (zorunlu): Kayıtlar ledger.csv dosyasına yazılır ve yeniden açılışta okunur.",
      "İşlevsel (zorunlu): Seçilen ay için kategori toplamları ve net bakiye listelenir.",
      "İşlevsel (isteğe bağlı): Kategoriye göre süzme veya kayıt silme eklenir.",
      "İşlevsel (zorunlu): Dosya yoksa veya boşsa uygulama çökmeden boş defterle başlar; geçersiz tarih ve boş kategori reddedilir.",
      "İşlevsel (zorunlu): Gösterilen tutarlar 2 ondalığa yazılı bir kuralla yuvarlanır.",
      "İşlevsel olmayan: Bozuk bir CSV satırı uygulamayı çökertmez, satır numarasıyla bildirilir.",
      "İşlevsel olmayan: Dosya biçimi bölge ayarından bağımsızdır (InvariantCulture)."
    ],
    kabul: [
      "K1: Tutarı 0 veya negatif olan kayıt oluşturulamaz | Test: 0 ve -5 girerek hata mesajı aldığını ve listede kayıt çıkmadığını gözle.",
      "K2: 3 kayıt ekleyip kapatıp açınca aynı 3 kayıt görünür | Test: uygulamayı kapat, aç, listele; Id, tutar ve tarihleri karşılaştır.",
      "K3: CSV'ye elle eklenen bozuk 1 satır atlanır ve satır numarası yazılır | Test: dosyayı not defteriyle boz, uygulamayı aç, uyarıyı ve diğer kayıtların yüklendiğini gör.",
      "K4: 0,10 + 0,20 toplamı tam 0,30 çıkar | Test: bu toplam için yazdığın testin geçtiğini ve double ile aynı testin neden başarısız olabileceğini kanıt notuna yaz.",
      "K5: Aylık özetteki net bakiye elle hesapladığın değerle eşleşir | Test: 6 kayıtlı örnek veriyi kâğıtta topla ve rapor çıktısıyla karşılaştır.",
      "K6: En az 6 test geçer ve README çalıştırma adımlarını içerir | Test: dotnet test çıktısındaki sayıyı not et, README'yi temiz klasörde uygula.",
      "K7: Dosya yokken ve boşken uygulama çökmeden açılır, 30 Şubat tarihi reddedilir ve 2,005 gibi tutarın yuvarlama sonucu README'deki kuralla uyuşur | Test: ledger.csv'yi sil, sonra 0 bayt yap, aç; geçersiz tarih gir; yuvarlamayı elle hesapla ve karşılaştır."
    ],
    rubrik: [
      { olcut: "Para veri tipi seçimi", guclu: "decimal kullanılır, nedeni örnekle açıklanır, yuvarlama davranışı bilinir.", zayif: "double kullanılır veya neden seçildiği açıklanamaz." },
      { olcut: "CSV dayanıklılığı", guclu: "Bozuk satır, boş dosya ve eksik dosya ayrı ayrı ele alınır, kalan veri korunur.", zayif: "Tek bozuk satırda uygulama çöker veya tüm veri kaybolur." },
      { olcut: "Girdi doğrulama", guclu: "Tutar, tarih ve kategori hataları anlamlı mesajla yeniden sorulur.", zayif: "Hatalı girişte istisna ile kapanır." },
      { olcut: "Rapor doğruluğu", guclu: "Kategori ve net bakiye elle hesapla eşleşir, boş ay özel olarak ele alınır.", zayif: "Toplamlar tutmaz veya boş ayda hata verir." },
      { olcut: "Test kalitesi", guclu: "Beklenen değerler elle hesaplanmış, gidiş-dönüş ve sınır durumları var.", zayif: "Testler yalnızca kodun çıktısını kopyalar." }
    ],
    savunma: [
      "Tutarı neden double yerine decimal tuttun ve kayan nokta hangi somut hatayı üretirdi?",
      "CSV yerine JSON seçseydin hangi işi kolaylaştırır, hangisini zorlaştırırdı?",
      "Dosyaya yazarken elektrik kesilirse ne olur, bunu nasıl azaltırdın?",
      "Bu defter 100 bin kayda ulaşsa hangi kısım ilk yavaşlar ve ne yapardın?"
    ],
    yetkinlikler: [
      { ad: "Veri tipi ve model tasarımı", kanit: "Adım 1 alan-tip tablosu ve Adım 2 Transaction sınıfındaki doğrulama." },
      { ad: "Dosya girdi-çıktısı ve hata toleransı", kanit: "Adım 4 çıktısı: yeniden açınca duran kayıtlar ve bozuk satır uyarısı." },
      { ad: "LINQ ile toplulaştırma", kanit: "Adım 5 aylık özet raporu çıktısı." },
      { ad: "Birim test yazma", kanit: "Adım 6'daki 6 geçen test ve elle hesaplanmış beklenen değerler." },
      { ad: "Girdi ve dosya dayanıklılığı", kanit: "Adım 7'deki boş/eksik dosya, tarih doğrulama ve yuvarlama testleri." }
    ],
    telafi: "K1 başarısızsa → adım 2'ye dön, Transaction constructor doğrulamasını yeniden yaz. K3 başarısızsa → adım 4'e dön, satır satır try/catch ve satır numarası mantığını yeniden kur. K2 başarısızsa → adım 4'e dön, yazma ve okuma biçimini (InvariantCulture, alan sırası) eşleştir. K4 başarısızsa → adım 1'e dön, alan tiplerini gözden geçir. K6 başarısızsa → adım 6'ya dön, eksik testleri yaz ve README'ye çalıştırma adımlarını ekle. K5 başarısızsa → adım 5'e dön, GroupBy sorgusunu kâğıttaki hesapla adım adım karşılaştır. K7 başarısızsa → adım 7'ye dön, dosya yok/boş durumunu, TryParseExact doğrulamasını ve yuvarlama kuralını yeniden kur.",
    sonraki: "K1-K7'nin tamamı tutar ve 4 savunma sorusunu kendi cümlelerinle yanıtlarsan bk1c Metin Ayrıştırıcı kilidi açılır; tamamlama bir kanıt kaydı üretir."
  });

  K.yeni.push({
    yol: "bk", id: "bk1c", lv: 1,
    title: "Metin Ayrıştırıcı ve Birim Testleri (C#)",
    weeks: 2,
    tools: ".NET SDK, VS Code veya Visual Studio, Git, xUnit",
    why: "Sunucular her gün satır satır log yazar ve bu metni anlamlı veriye çevirmek backend işinin ortak parçasıdır. Basit bir log satırı ayrıştırıcısı yazar, her kenar durumu birim testle kilitlersin.",
    outcome: ["Metin satırını alanlarına güvenle ayrıştırırsın", "Hatalı girdiyi çökmeden sonuç nesnesiyle bildirirsin", "Önce test yazıp sonra kodu geliştirirsin"],
    pitch: "I wrote a C# log line parser as a tested class library that returns structured results and reports malformed lines without crashing.",
    steps: [
      ["Girdi biçimini tanımla", "Ayrıştırıcı, posta sınıflandırma görevlisi gibidir: önce zarfın hangi biçimde olacağını bilmek zorundadır. Biçimi yazmadan kod yazarsan her istisna bir sürpriz olur.", "Log satırı biçimini belirle: 'ZAMAN SEVİYE KAYNAK: mesaj' (örn. 2025-03-01T10:15:30 ERROR Odeme: Zaman asimi). Zaman damgasının kendisinde de ':' bulunduğunu not et: satır ilk üç boşluktan bölünür (ZAMAN, SEVİYE, 'KAYNAK:', mesaj) ve mesajı başlatan ':' yalnız KAYNAK'ın sonundakidir. 5 geçerli ve 5 geçersiz örnek satır yaz; geçerli örneklerden en az birinin mesajında da ':' olsun.", "Biçim tanımı ve 10 örnek satır", "format = biçim, specification = şartname, valid input = geçerli girdi, edge case = uç durum", "log line format specification timestamp level message"],
      ["Sınıf kitaplığı ve sonuç tipi", "Kitaplık, başka programların çağırabileceği alet çantasıdır. Hata için istisna fırlatmak yerine 'başarılı mı, neden olmadı' bilgisini taşıyan bir sonuç nesnesi döndürmek, çağıranı rahat ettirir.", "Classlib projesi ve xUnit test projesi aç, çözümde birleştir. LogEntry (Zaman, Seviye, Kaynak, Mesaj) ve ParseResult (Başarılı, Girdi, Hata) tiplerini yaz.", "Derlenen çözüm: kitaplık + test projesi", "class library = sınıf kitaplığı, solution = çözüm, result object = sonuç nesnesi, project reference = proje referansı", "dotnet new classlib xunit solution project reference"],
      ["Önce kırmızı test, sonra kod", "TDD, önce sınav sorusunu yazıp sonra cevabı yazmaktır. Test başta kırmızıdır (başarısız); kodu yazınca yeşile döner ve her değişiklikte seni korur.", "Parse metodu için önce 3 test yaz (geçerli satır, boş satır, seviyesi bilinmeyen satır) ve başarısız olduklarını gör. Sonra metodu yaz ve testleri yeşile çevir.", "Kırmızıdan yeşile giden test çıktıları", "TDD = test güdümlü geliştirme, red/green = kırmızı/yeşil, test case = test durumu, regression = gerileme", "tdd red green refactor c# xunit beginner"],
      ["Ayrıştırma mantığı: Split ve TryParse", "Satırı doğru yerlerden bölmek, bir keki dilimlemek gibidir; yanlış yerden kesersen zaman damgasındaki ve mesajın içindeki iki nokta üst üste de bölünür. Önce satırı boşlukla ilk üç alana ayırıp kalanı mesaj olarak almak, ':' işaretini yalnız KAYNAK alanının sonunda aramak bu hatayı önler.", "Satırı önce boşlukla en fazla 4 parçaya böl (Split(' ', 4): ZAMAN, SEVİYE, 'KAYNAK:', mesaj); ':' işaretini yalnız 3. parçanın sonunda ara, zaman damgasındaki ve mesajdaki ':' işaretlerine dokunma. Zamanı DateTime.TryParse, seviyeyi enum ile (INFO, WARN, ERROR) çöz. Her hata türü için ayrı hata metni döndür.", "Tüm örnek satırlar için doğru ParseResult (mesajında ':' olan tam biçimli satır dahil)", "Split = bölmek, enum = sabit değer kümesi, IndexOf = ilk konum bulma, substring = alt metin", "c# string split indexof substring enum tryparse"],
      ["Toplu işleme: dosya ve özet", "Tek satır ayrıştırmak yetmez; gerçek log binlerce satırdır ve içinde bozuk olanlar mutlaka bulunur. Bozuk satırı atlayıp sayısını raporlamak, tamamen durmaktan iyidir.", "Metin dosyasını satır satır oku, ParseAll metodu yaz. Çıktı: geçerli satır sayısı, bozuk satır sayısı, seviye başına adet ve ilk 3 hata. Boş dosyayı da ele al.", "20 satırlık örnek dosyanın özet çıktısı (sayılar ve ilk 3 hata)", "stream = akış, line by line = satır satır, summary = özet, malformed = bozuk biçimli", "c# read file line by line parse summary count"],
      ["Uç durum testleri ve belgeleme", "Test paketi, kodun sigorta poliçesidir. Boşluk, çok uzun satır, Türkçe karakter gibi uç durumlar poliçenin kapsamını belirler.", "En az 10 teste ulaş: fazladan boşluk, tek alanlı satır, Unicode mesaj, çok uzun mesaj, null. Kapsamı neyin dışarıda bıraktığını README'de 'bilinen sınırlar' başlığıyla yaz.", "10+ geçen test ve bilinen sınırlar listesi", "edge case = uç durum, test coverage = test kapsamı, null check = boş değer denetimi, limitation = sınır", "unit testing edge cases null empty unicode c#"],
      ["Süzme ve komut satırı girişi (isteğe bağlı)", "Süzme, kitaplığın elek takımıdır: aynı ayrıştırılmış kayıtlardan yalnız istediğin seviyeyi ya da zaman aralığını geçirirsin. Dosya yolunu program argümanından almak, aracı kod değiştirmeden kullanmanı sağlar; dosya okuma yine kitaplığın dışında, konsol uygulamasında kalır.", "Kitaplığa seviyeye ve zaman aralığına göre süzen bir metot ekle (LINQ Where ile); önce 3 test yaz. Konsol uygulamasında dosya yolunu args[0]'dan oku, argüman yoksa kullanım mesajı yaz. Kitaplığın konsol veya dosya bilmediğini koru.", "Süzülmüş özet çıktısı ve süzme testleri", "filter = süzme, LINQ = dil içi sorgu, command-line argument = komut satırı argümanı, args = program argümanları", "c# linq where filter datetime range command line args"]
    ],
    onkosul: ["Önkoşul: C# metot, koşul, döngü ve sınıf bilgisi (bk1 Konsol Görev Yöneticisi düzeyi).", "xUnit ile basit bir test yazmış olmak (bk1'in 6. adımı).", "bk1b Dosya Tabanlı Bütçe Defteri'ndeki dosya okuma deneyimi önerilir."],
    gereksinim: [
      "İşlevsel (zorunlu): Tek bir log satırı Zaman, Seviye, Kaynak ve Mesaj alanlarına ayrılır.",
      "İşlevsel (zorunlu): Geçersiz satır istisna fırlatmaz, ParseResult içinde hata metniyle döner.",
      "İşlevsel (zorunlu): Dosyadaki tüm satırlar işlenir ve geçerli, bozuk ve seviye başına sayılar ile ilk 3 hata raporlanır.",
      "İşlevsel (isteğe bağlı): Belirli bir seviyeye veya zaman aralığına göre süzme eklenir ve dosya yolu komut satırı argümanından alınır.",
      "İşlevsel olmayan: Kitaplık konsol veya dosya bilmez; yalnız metin alır ve sonuç döndürür.",
      "İşlevsel olmayan: Her hata türü kendi testiyle kilitlenir."
    ],
    kabul: [
      "K1: 5 geçerli örnek satırın tamamı doğru alanlara ayrılır | Test: her satır için alan değerlerini kâğıttaki beklenenle karşılaştıran testin geçtiğini gör.",
      "K2: 5 geçersiz örnek satır için istisna çıkmaz, Başarılı=false ve farklı hata metni döner | Test: test çıktısında her hata metninin ayırt edilebilir olduğunu kontrol et.",
      "K3: Mesajında ':' bulunan tam biçimli satır mesajı kesmeden ayrıştırılır | Test: '2025-03-01T10:15:30 ERROR Odeme: Saat 10:15 tamam' satırının Zaman, Seviye, Kaynak (Odeme) ve Mesaj ('Saat 10:15 tamam') alanlarını testle doğrula.",
      "K4: Karışık 20 satırlık dosyada geçerli ve bozuk satır sayıları, seviye başına adetler ve rapordaki ilk 3 hata elle bulduklarınla eşleşir | Test: dosyayı kendin say, ilk 3 bozuk satırı işaretle ve rapor çıktısıyla karşılaştır.",
      "K5: En az 10 test vardır ve en az 3'ü önce başarısız görülmüştür | Test: kırmızı ekran görüntüsü veya commit geçmişini kanıt notuna ekle.",
      "K6: README bilinen sınırları en az 3 maddede yazar | Test: README'yi aç ve sınırları say.",
      "K7: (İsteğe bağlı) Seviye ve zaman aralığı süzmesi çalışır ve dosya yolu komut satırı argümanından alınır | Test: 20 satırlık dosyada yalnız ERROR seviyesini süz, sonucu elle saydığınla karşılaştır; argümansız çalıştırınca kullanım mesajı çıktığını gör."
    ],
    rubrik: [
      { olcut: "Biçim tanımı netliği", guclu: "Biçim kuralları ve örnekler çelişkisizdir, uç durumlar adlandırılmıştır.", zayif: "Biçim yalnız kodun içinde saklıdır, örnek yoktur." },
      { olcut: "Hata bildirimi", guclu: "Her hata türü ayrı, anlaşılır metinle sonuç nesnesinde döner.", zayif: "Tek genel hata mesajı veya yakalanmamış istisna." },
      { olcut: "Ayrıştırma doğruluğu", guclu: "İki nokta, boşluk ve Unicode içeren satırlar doğru çözülür.", zayif: "Mesaj içindeki ayraçta alanlar kayar." },
      { olcut: "Test disiplini", guclu: "Testler koddan önce yazılmış, her biri tek davranışı denetler, isimleri okunaklı.", zayif: "Tek testte birçok şey denenir, sonradan koda uydurulur." },
      { olcut: "Kitaplık tasarımı", guclu: "Kitaplık G/Ç'den bağımsızdır, genel arayüzü küçüktür.", zayif: "Kitaplık doğrudan konsola yazar veya dosyaya bağlıdır." }
    ],
    savunma: [
      "Hata için istisna yerine sonuç nesnesi döndürmeyi neden seçtin, hangi durumda istisna daha doğru olurdu?",
      "Satırı Split ile mi, IndexOf ile mi böldün ve bu seçim mesajdaki ':' için neden önemli?",
      "Testi koddan önce yazmak sana hangi hatayı erken yakalattı, örnek ver.",
      "Girdi biçimi değişseydi (ek bir alan gelseydi) hangi testler kırılır ve ne yapardın?"
    ],
    yetkinlikler: [
      { ad: "Girdi biçimi belirleme", kanit: "Adım 1 çıktısı: biçim tanımı ve 10 örnek satır." },
      { ad: "Metin ayrıştırma", kanit: "Adım 4 çıktısı: tüm örnek satırlar için doğru ParseResult." },
      { ad: "Test güdümlü geliştirme", kanit: "Adım 3 kırmızıdan yeşile test çıktıları." },
      { ad: "Hata modelleme", kanit: "Adım 2 ParseResult tipi ve Adım 5 özet çıktısındaki bozuk satır sayıları." },
      { ad: "Süzme ve komut satırı girişi (isteğe bağlı)", kanit: "Adım 7 çıktısı: süzülmüş özet çıktısı ve süzme testleri." }
    ],
    telafi: "K1 veya K3 başarısızsa → adım 4'e dön, bölme mantığını (ilk ayraç, TryParse) yeniden yaz. K2 başarısızsa → adım 2'ye dön, ParseResult ve hata metinlerini yeniden tasarla. K4 başarısızsa → adım 5'e dön, dosya okuma, sayaç ve ilk 3 hata mantığını elle sayımla yeniden doğrula. K5 başarısızsa → adım 3'e dön, bir davranış için önce test yazıp kırmızıyı kaydet. K6 başarısızsa → adım 6'ya dön, README'ye en az 3 bilinen sınırı yaz ve testleri tamamla. K7 (isteğe bağlı) başarısızsa → adım 7'ye dön, süzme koşullarını ve argüman okumayı ayrı test et.",
    sonraki: "K1-K6 tutar (adım 7'yi yaptıysan K7 de) ve savunma sorularını yanıtlarsan bk1d Hesap Makinesi Kitaplığı kilidi açılır; tamamlama bir kanıt kaydı üretir."
  });

  K.yeni.push({
    yol: "bk", id: "bk1d", lv: 1,
    title: "Hesap Makinesi Kitaplığı (C#)",
    weeks: 3,
    tools: ".NET SDK, VS Code veya Visual Studio, Git, xUnit",
    why: "Her API'nin içinde 'bir ifadeyi doğru hesapla' gibi saf mantık parçaları vardır ve bunlar en çok test edilmesi gereken yerlerdir. Dört işlem ve parantez destekleyen bir ifade değerlendirici kitaplığı yazarak sınıf tasarımı, özyineleme ve test disiplinini birleştirirsin.",
    outcome: ["Girdiyi token'lara bölen bir ayrıştırıcı yazarsın", "İşlem önceliğini ve parantezi doğru hesaplarsın", "Kitaplığı konsol uygulamasından ve testlerden kullanırsın"],
    pitch: "I implemented a C# expression calculator library with a tokenizer and parser that respects operator precedence, covered by unit tests.",
    steps: [
      ["Gramer: ne hesaplanacak?", "Dil bilgisi, cümle kurallarıdır: '2+3*4' geçerli, '2+*3' geçersizdir. Kuralı önce yazarsan kod onun çevirisi olur.", "Desteklenecek öğeleri yaz: sayı (ondalıklı), + - * /, parantez, tekli eksi. 8 geçerli ve 6 geçersiz örnek ifade ve beklenen sonuçlarını elle hesaplayıp yaz.", "Gramer notu ve 14 örnek ifade", "grammar = dilbilgisi, expression = ifade, operator precedence = işlem önceliği, unary minus = tekli eksi", "arithmetic expression grammar operator precedence"],
      ["Çözüm yapısı ve Token tipi", "Kitaplık ve arayüz ayrı olmalı: motoru bir kez yazar, konsoldan da testten de çağırırsın. Token, cümlenin kelimesi gibidir.", "Classlib (Calc.Core), konsol uygulaması ve xUnit projesi aç. Token tipini (Sayı, Operatör, SolParantez, SağParantez) ve TokenKind enum'unu yaz.", "Üç projeli derlenen çözüm", "token = sözcük birimi, enum = sabit değer kümesi, separation of concerns = sorumlulukların ayrılması, solution = çözüm", "dotnet solution classlib console xunit separation of concerns"],
      ["Tokenizer: metni parçalara böl", "Tokenizer, cümleyi kelimelere bölen kişidir. Karakterleri soldan sağa gezer, rakam görünce sayıyı sonuna kadar toplar, boşluğu atlar, tanımadığı karakterde hata verir.", "Tokenize(string) metodunu yaz. '12.5 * (3 + 4)' için 7 token üret. Sayıyı double.Parse(metin, NumberStyles.Float, CultureInfo.InvariantCulture) ile çevir; InvariantCulture kullanmazsan tr-TR gibi kültürlerde nokta ondalık ayracı sayılmaz ve '12.5' yanlış okunabilir. Tanınmayan karakterde hata konumunu söyle. Önce 5 test yaz; birini CultureInfo.CurrentCulture = tr-TR iken çalıştır ve bitince eski kültürü geri yükle.", "Tokenizer testleri (tr-TR kültürü dahil) geçiyor", "tokenizer = sözcük ayırıcı, lexer = sözcük çözümleyici, character = karakter, index = konum, culture = kültür ayarı, InvariantCulture = kültürden bağımsız biçim", "write a simple tokenizer lexer c# arithmetic"],
      ["Parser: öncelik ve parantez", "İşlem önceliği, mutfaktaki sıradır: çarpma toplamadan önce yapılır, parantez ise sırayı değiştirir. Özyinelemeli iniş yöntemi her öncelik düzeyine ayrı bir metot verir.", "Toplama/çıkarma, çarpma/bölme ve birincil (sayı, parantezli ifade veya tekli eksi) için üç metot yaz. '2+3*4' sonucu 14, '(2+3)*4' sonucu 20, '-3+5' sonucu 2, '1.5*2' sonucu 3 çıksın. Sıfıra bölmede kontrollü hata ver.", "Öncelik, parantez, ondalıklı sayı ve tekli eksi testleri geçiyor", "recursive descent = özyinelemeli iniş, precedence = öncelik, parentheses = parantez, division by zero = sıfıra bölme", "recursive descent parser c# calculator precedence"],
      ["Hata yönetimi ve sınır durumlar", "Hesap makinesi yanlış ifadede sessizce yanlış cevap vermemeli, nedenini söylemelidir. Hata sınıfı, hatanın konumunu da taşıdığında hata ayıklamak kolaylaşır.", "CalcException'ı konum bilgisiyle yaz. Şu 6 durumu yakala: eksik parantez, fazladan kapatan parantez, ardışık operatör, boş ifade, çok büyük sayı, tanınmayan karakter. Konsol arayüzü: ifadeyi al, sonucu veya hata konumunu yaz.", "6 hata durumu için doğru mesajlar", "custom exception = özel istisna, error position = hata konumu, overflow = taşma, input validation = girdi doğrulama", "c# custom exception error position parser overflow"],
      ["Test paketi, refactor ve yayın", "Test paketi hazır olunca kodu temizlemek korkusuz olur; testler yeşil kalırsa davranış bozulmamıştır. Belgelenmemiş kitaplığı başkası kullanamaz.", "En az 20 test hedefle (tablo tabanlı Theory ile). Tekrarlayan kodu sadeleştir ve testlerin yeşil kaldığını göster. README'ye kullanım örneği ve desteklenmeyenleri yaz, GitHub'a gönder.", "20+ geçen test ve README", "Theory = veri tabanlı test, refactor = yeniden düzenleme, public API = genel arayüz, documentation = belgeleme", "xunit theory inlinedata refactor with tests c#"],
      ["Üs alma ve ifade döngüsü (isteğe bağlı)", "Yeni bir işleç eklemek, gramere yeni bir öncelik basamağı eklemektir: üs alma çarpmadan da güçlüdür ve sağdan sola birleşir (2^3^2, 2^(3^2) demektir). Konsolun tek ifade yerine döngüyle çalışması da aracı gerçekten kullanılabilir yapar.", "Tokenizer'a ^ işlecini ekle, parser'da çarpma/bölmeden güçlü, sağdan birleşimli yeni bir düzey aç; önce '2^3^2' (512) için test yaz. '-2^2' için tekli eksi ile üs önceliğine kendin karar ver ve README'ye yaz. Konsolu 'çık' yazılana dek ifade alan bir döngüye çevir; hatalı girdide döngü sürsün.", "Üs testleri ve döngülü konsolun örnek oturum çıktısı", "right associativity = sağdan birleşim, exponent = üs, REPL = oku-değerlendir-yaz döngüsü, loop = döngü", "recursive descent parser exponent right associative c# repl loop"]
    ],
    onkosul: ["Önkoşul: C# sınıf, metot, List<T> ve döngü bilgisi (bk1 Konsol Görev Yöneticisi).", "xUnit ile test yazma deneyimi (bk1 veya bk1c Metin Ayrıştırıcı).", "Özyineleme (bir metodun kendini çağırması) kavramına temel aşinalık."],
    gereksinim: [
      "İşlevsel (zorunlu): + - * / ve parantez içeren ifade doğru önceliğle hesaplanır.",
      "İşlevsel (zorunlu): Ondalıklı sayı ve tekli eksi desteklenir.",
      "İşlevsel (zorunlu): Geçersiz ifadede hata konumuyla birlikte CalcException fırlatılır.",
      "İşlevsel (zorunlu): Çekirdek mantık ayrı bir kitaplıkta durur, konsol uygulaması onu çağırır.",
      "İşlevsel (isteğe bağlı): Üs alma, bir değişken (örn. x) desteği veya 'çık' yazılana dek süren bir ifade döngüsü (REPL) eklenir.",
      "İşlevsel olmayan: Kitaplık konsola yazmaz ve dışarıdan global duruma bağlı değildir."
    ],
    kabul: [
      "K1: '2+3*4' sonucu 14, '(2+3)*4' sonucu 20, '-3+5' sonucu 2 ve '1.5*2' sonucu 3 çıkar | Test: dört ifadeyi tablo tabanlı testte (Theory) çalıştır ve testlerin geçtiğini gör; konsol adım 5'te hazır olunca aynı ifadeleri bir kez de elle gir.",
      "K2: '12.5 * (3 + 4)' ifadesi 7 token üretir ve kültür tr-TR yapılsa da ilk sayı 12.5 okunur | Test: tokenizer testinde token listesini yazdır ve say; aynı testi CultureInfo.CurrentCulture = tr-TR ile tekrarla ve sayı değerini karşılaştır.",
      "K3: '10/0' kontrollü hata verir, kitaplık sonraki hesabı yine yapar | Test: birim testte '10/0' için hata fırlatıldığını ve aynı testte hemen ardından '1+1' ifadesinin 2 döndüğünü gör; konsol adım 5'te hazır olunca aynı iki girdiyi elle dene ve programın kapanmadığını gör.",
      "K4: '2+*3' ve '(2+3' için hata konumu doğru bildirilir | Test: mesajdaki konumu ifadede elle işaretle.",
      "K5: En az 20 test geçer ve en az 6'sı hata durumudur | Test: dotnet test çıktısını ve hata testi sayısını kanıt notuna yaz.",
      "K6: Kitaplık projesinde Console sınıfına başvuru yoktur | Test: Calc.Core içinde 'Console.' araması yap, sonuç boş olmalı.",
      "K7: (İsteğe bağlı) '2^3^2' sonucu 512 çıkar ve konsol 'çık' yazılana dek ifade almaya devam eder | Test: ifadeyi testte çalıştır; konsolda bir hatalı ve bir geçerli ifade girdikten sonra döngünün sürdüğünü, 'çık' ile bittiğini gör."
    ],
    rubrik: [
      { olcut: "Öncelik ve parantez doğruluğu", guclu: "Karışık ifadeler (iç içe parantez, tekli eksi) elle hesapla birebir tutar.", zayif: "Öncelik soldan sağa gider veya parantez yok sayılır." },
      { olcut: "Tokenizer/parser ayrımı", guclu: "İki aşama ayrı sınıf ve ayrı testlerle çalışır.", zayif: "Tek metotta karakter karakter hem bölünür hem hesaplanır." },
      { olcut: "Hata modeli", guclu: "Hata türü ve konumu bildirilir, her biri testlidir.", zayif: "Genel 'hata' mesajı veya yanlış sonuç." },
      { olcut: "Kitaplık sınırları", guclu: "Çekirdek G/Ç'den bağımsız, genel arayüz küçük ve belgeli.", zayif: "Kitaplık doğrudan konsola bağlı, arayüz karışık." },
      { olcut: "Test paketi", guclu: "Theory ile geniş girdi tablosu, sınır ve hata durumları ayrı.", zayif: "Birkaç mutlu yol testi." }
    ],
    savunma: [
      "Neden işlem önceliğini tokenizer'da değil parser'da çözdün?",
      "Özyinelemeli iniş yerine iki yığınlı (stack) bir yöntemi seçseydin ne değişirdi?",
      "Hata için istisna mı sonuç nesnesi mi daha uygun, bu kitaplık için kararın nedir?",
      "Üs alma veya fonksiyon (sin) eklesen hangi parçalar değişir, hangileri aynı kalır?"
    ],
    yetkinlikler: [
      { ad: "Dil kuralı tanımlama", kanit: "Adım 1 gramer notu ve 14 örnek ifade." },
      { ad: "Algoritma ve özyineleme", kanit: "Adım 4 çıktısı: öncelik, parantez, ondalıklı sayı ve tekli eksi testleri geçiyor." },
      { ad: "Hata yönetimi tasarımı", kanit: "Adım 5 çıktısı: 6 hata durumu için doğru mesajlar." },
      { ad: "Test ve refactor disiplini", kanit: "Adım 6 çıktısı: 20+ geçen test ve sadeleşmiş kod." },
      { ad: "Dili genişletme (isteğe bağlı)", kanit: "Adım 7 çıktısı: üs testleri ve döngülü konsolun örnek oturumu." }
    ],
    telafi: "K1 başarısızsa → adım 4'e dön, öncelik düzeylerini üç metoda ayırıp yeniden yaz. K2 başarısızsa → adım 3'e dön, tokenizer testlerini tek tek yazıp çalıştır. K3 veya K4 başarısızsa → adım 5'e dön, hata konumunu taşıyan CalcException'ı yeniden kur. K5 başarısızsa → adım 6'ya dön, test tablosunu (Theory) en az 20 teste ve 6 hata durumuna tamamla. K6 başarısızsa → adım 2'ye dön, kitaplık ve konsol sorumluluklarını ayır. K7 (isteğe bağlı) başarısızsa → adım 7'ye dön, üs önceliğini ve konsol döngüsünü ayrı ayrı yeniden kur.",
    sonraki: "K1-K6'nın tamamı (adım 7'yi yaptıysan K7 de) tutar ve savunma sorularını yanıtlarsan lv2 projelerinden (bk2b SQL Veri Erişim Katmanı, bk2c Harici API Tüketen Servis, bk2d Sayfalama ve Doğrulama) biri için önkoşul sağlanmış olur; tamamlama bir kanıt kaydı üretir."
  });

  /* ---------- LV2 ---------- */

  K.yeni.push({
    yol: "bk", id: "bk2b", lv: 2,
    title: "SQL Veri Erişim Katmanı ve Migrasyon",
    weeks: 4,
    tools: ".NET SDK, SQLite, Microsoft.Data.Sqlite, DB Browser for SQLite, xUnit, Git",
    why: "ORM'siz çalıştığında SQL'in ve veri erişiminin nasıl işlediğini açıkça görürsün; bu, yavaş sorguyu veya bozuk veriyi anlamanın temelidir. Bir kütüphane ödünç sistemi için ham SQL ile repository katmanı ve sürümlenmiş migrasyon betikleri yazarsın.",
    outcome: ["Migrasyon betikleriyle şemayı sürümlü yönetirsin", "Parametreli SQL ve repository deseniyle veriye erişirsin", "Transaction ve indeksin etkisini ölçersin"],
    pitch: "I built a SQL data access layer in C# with versioned migrations, parameterized queries and transactional borrow operations.",
    steps: [
      ["Şemayı tasarla", "Şema, kütüphanenin raf düzenidir: kitap, üye ve ödünç kaydı ayrı raflardadır ve birbirine numarayla bağlanır. İlişkiyi yabancı anahtar kurar.", "Books (Id, Isbn, Title, Stock: mevcut kopya sayısı, CHECK Stock >= 0), Members ve Loans (Id, BookId, MemberId, LoanDate, DueDate: iade son tarihi, ReturnDate: boşsa kitap henüz iade edilmemiş) tablolarını tasarla: birincil anahtar, yabancı anahtar, benzersizlik (ISBN) ve NOT NULL kurallarını belirle. ER diyagramını çiz.", "ER diyagramı ve CREATE TABLE betikleri (Stock ve DueDate sütunlarıyla)", "primary key = birincil anahtar, foreign key = yabancı anahtar, constraint = kısıt, schema = şema", "sql schema design books members loans foreign key"],
      ["Migrasyon sistemi kur", "Migrasyon, şemanın günlüğüdür: 001, 002, 003 numaralı betikler sırayla uygulanır ve hangisinin uygulandığı bir tabloda tutulur. Böylece her ortam aynı şemaya ulaşır.", "migrations klasöründe numaralı .sql dosyaları yaz. SchemaVersion tablosuna bakıp yalnız uygulanmamışları çalıştıran bir Migrator sınıfı yaz. Aynı betiği iki kez çalıştırmanın zararsız olduğunu göster.", "Migrator çalışıyor, ikinci çalıştırmada değişiklik yok", "migration = şema değişikliği betiği, idempotent = tekrarında zararsız, version table = sürüm tablosu, apply = uygulamak", "database migrations versioned scripts schema version table"],
      ["Parametreli sorgular ve repository", "Kullanıcı girdisini SQL metnine yapıştırmak, kapıyı anahtarla değil notla açmaktır. Parametre, değeri komuttan ayrı taşır ve SQL injection'ı kapatır. Repository, SQL'i tek yerde tutar.", "BookRepository ve MemberRepository yaz: Add, GetById, Search(başlık parçası). Tüm sorgular parametreli olsun. Kendi izole veritabanında girdi olarak tek tırnaklı bir başlık dene ve çökmediğini göster.", "Repository metotları ve tırnaklı girdi testi", "parameterized query = parametreli sorgu, SQL injection = SQL enjeksiyonu, repository = veri erişim sınıfı, data access layer = veri erişim katmanı", "ado.net parameterized query sqlite repository pattern c#"],
      ["Transaction: ödünç verme işlemi", "Transaction, ya hep ya hiç sözüdür: kitabı ödünç verirken stok düşüp ödünç kaydı yazılmazsa tutarsızlık olur. Hata olursa Rollback her şeyi geri alır.", "BorrowBook işlemini tek transaction'da yaz: kitap müsait mi kontrol et, Loans'a kayıt ekle, stoku düş. Ortasında bilerek hata fırlatıp hiçbir değişikliğin kalmadığını göster.", "Rollback testi: hata sonrası veri değişmemiş", "transaction = işlem bütünlüğü, commit = onay, rollback = geri alma, atomicity = bölünmezlik", "sqlite transaction commit rollback c# ado.net"],
      ["Sorgular: JOIN, gruplama, indeks", "JOIN iki rafı birleştirir; indeks ise kitabın ansiklopedinin sonundaki dizinidir: tüm sayfaları çevirmeden bulursun. Hız farkını ölçmeden indeksin işe yaradığını iddia etme. Baştan joker içeren LIKE '%x%' araması B-tree indeksini genellikle kullanamaz ve ölçümde fark göstermeyebilir; bu yüzden ölçümü önek aramasıyla (LIKE 'x%') yap. SQLite'ta LIKE varsayılan olarak büyük/küçük harfe duyarsızdır ve indeksin devreye girmesi için sütun harmanlaması (COLLATE NOCASE) gerekebilir; bu davranış burada doğrulanmadı, kendi SQLite sürümünde EXPLAIN QUERY PLAN ile doğrula. İçeren arama gerekiyorsa FTS5 ayrı bir seçenektir.", "Geciken ödünçleri (DueDate geçmiş ve ReturnDate boş) üye adıyla listeleyen JOIN sorgusu ve üye başına ödünç sayısı sorgusu yaz. Önce 20 bin kitabı tek transaction içinde, aynı parametreli INSERT komutunu yeniden kullanarak tohumla (her satırı ayrı transaction'da eklemek dosya tabanlı SQLite'ta çok yavaş olabilir; tohumlama süresini not et). Sonra başlık önek araması için SearchByPrefix(önek) metodunu ekle (parametreli: LIKE @onek || '%'); süresini indeksten önce ve sonra ölç; EXPLAIN QUERY PLAN çıktısını kaydet.", "Önek araması için önce/sonra ölçümü ve sorgu planı notu", "JOIN = birleştirme, index = dizin, query plan = sorgu planı, GROUP BY = gruplama, prefix search = önek araması, seeding = tohumlama, FTS5 = SQLite tam metin arama eklentisi", "sqlite index explain query plan like prefix collate nocase fts5"],
      ["Entegrasyon testleri ve teslim", "Veritabanı testleri sahteyle değil gerçek (bellek içi) veritabanıyla daha güvenilirdir; her test temiz şemayla başlamalıdır. Bellek içi SQLite veritabanı, onu açan bağlantı kapanınca yok olur: bağlantıyı test boyunca açık tut (ya da Mode=Memory;Cache=Shared ile adlandırılmış paylaşımlı bellek içi veritabanı kullan; bağlantı dizesi seçeneklerini kendi Microsoft.Data.Sqlite sürümünde doğrula).", "xUnit ile bellek içi SQLite kullanan 8 test yaz: migrasyon, ekleme, arama, ödünç, rollback, benzersizlik ihlali, JOIN sorgusu, parametreli arama. README'ye şema ve migrasyon çalıştırma adımlarını ekle.", "8 geçen test ve README", "integration test = entegrasyon testi, in-memory = bellek içi, fixture = test hazırlığı, unique violation = benzersizlik ihlali", "xunit sqlite in memory integration test fixture"],
      ["İade işlemi ve çift ödünç koruması (isteğe bağlı)", "Ödünç vermenin tersi de aynı titizliği ister: iade, kaydı kapatıp stoku geri artırır ve ikisi bir bütündür. Tek kopyası kalan kitabı art arda iki kez ödünç vermeye çalışmak, stok kontrolünün gerçekten çalışıp çalışmadığını gösterir.", "ReturnBook işlemini tek transaction'da yaz: ReturnDate boş olan kaydı doldur, Stock'u bir artır; zaten iade edilmiş kaydı ikinci kez iade etmeyi reddet. BorrowBook'ta stok düşümünü koşullu yap (UPDATE ... WHERE Stock > 0; etkilenen satır sayısı 0 ise işlemi geri al) ve tek kopyalı kitabı art arda iki üyeye ödünç vermeyi dene. İstersen DueDate sonrası gün sayısı çarpı günlük ücret ile gecikme ücretini hesapla.", "İade ve çift ödünç denemesi için önce/sonra SELECT sonuçları", "return = iade, double borrow = çift ödünç, late fee = gecikme ücreti, rows affected = etkilenen satır sayısı", "sqlite update where stock > 0 rows affected transaction return book"]
    ],
    onkosul: ["Önkoşul: C# sınıf ve koleksiyon bilgisi (bk1 Konsol Görev Yöneticisi).", "Temel SQL (SELECT, INSERT, WHERE) bilgisi; yoksa veri yolundaki SQL temel dersleri.", "bk2 REST API: ASP.NET Core ve EF Core'u görmüş olmak önerilir; bu proje EF Core'un arkasında ne olduğunu açar."],
    gereksinim: [
      "İşlevsel (zorunlu): Şema numaralı migrasyon betikleriyle kurulur ve uygulanan sürüm bir tabloda tutulur; Books tablosu Stock, Loans tablosu DueDate ve ReturnDate sütunlarını içerir.",
      "İşlevsel (zorunlu): Kitap ve üye için ekle, getir, ara işlemleri repository sınıflarında yapılır.",
      "İşlevsel (zorunlu): Ödünç verme işlemi tek transaction'dır ve hata durumunda geri alınır.",
      "İşlevsel (zorunlu): Tüm sorgular parametreli yazılır.",
      "İşlevsel (isteğe bağlı): İade işlemi, çift ödünç koruması ve gecikme ücreti hesabı eklenir.",
      "İşlevsel olmayan: Her test temiz bir bellek içi veritabanında bağımsız çalışır."
    ],
    kabul: [
      "K1: Migrasyonlar ikinci kez çalıştırıldığında hiçbir betik tekrar uygulanmaz | Test: Migrator'ı iki kez çalıştır, SchemaVersion satır sayısının değişmediğini gör.",
      "K2: Aynı ISBN ile ikinci kitap eklenemez ve Stock negatif yapılamaz | Test: ekleme dene, benzersizlik hatasının kontrollü yakalandığını gözle; Stock = -1 yazmayı dene ve CHECK kısıtının reddettiğini gör.",
      "K3: Başlıkta tek tırnak bulunan arama girdisi hata vermez ve tabloyu bozmaz | Test: kendi izole veritabanında ' içeren başlıkla ara, tabloların yerinde olduğunu doğrula.",
      "K4: Ödünç işleminin ortasında atılan hata sonrası stok ve Loans değişmez | Test: önce/sonra SELECT sonuçlarını kanıt notuna yapıştır.",
      "K5: Başlık önek aramasında (LIKE 'x%') indeks eklemeden önce ve sonra süre ve sorgu planı kaydedilmiş, fark (fark yoksa nedeni) yorumlanmıştır | Test: iki ölçümü ve iki EXPLAIN QUERY PLAN çıktısını not et; planda indeks adının geçip geçmediğine bak.",
      "K6: En az 8 entegrasyon testi geçer | Test: dotnet test çıktısını kaydet.",
      "K7: (İsteğe bağlı) İade sonrası Stock bir artar ve ReturnDate dolar; aynı kayıt ikinci kez iade edilemez; tek kopyalı kitap art arda iki ödünç denemesinde yalnız ilkinde verilir | Test: önce/sonra SELECT sonuçlarını ve ikinci denemenin hata mesajını kanıt notuna yapıştır."
    ],
    rubrik: [
      { olcut: "Şema tasarımı", guclu: "Anahtarlar, kısıtlar ve ilişkiler doğru; gereksiz tekrarlı veri yok.", zayif: "Kısıtsız tablolar, ilişkiler uygulamada elle korunuyor." },
      { olcut: "Migrasyon yönetimi", guclu: "Sürümlü, tekrar çalıştırılabilir, sıralı ve testli.", zayif: "Şema elle kuruluyor, hangi sürümde olduğu bilinmiyor." },
      { olcut: "Güvenli SQL", guclu: "Tüm sorgular parametreli, tırnaklı girdi denenmiş ve kanıtlanmış.", zayif: "Metin birleştirmeyle sorgu kuruluyor." },
      { olcut: "Transaction doğruluğu", guclu: "Rollback senaryosu test edilmiş, tutarlılık gösterilmiş.", zayif: "Çoklu yazma transaction'sız, hata sonrası veri tutarsız." },
      { olcut: "Performans kanıtı", guclu: "İndeks öncesi/sonrası ölçüm ve plan yorumu var.", zayif: "İndeks 'hızlandırır' denip ölçüm yok." }
    ],
    savunma: [
      "ORM yerine ham SQL kullanmanın bu projedeki avantajı ve bedeli nedir?",
      "Migrasyon betiğini sonradan değiştirmek yerine neden yeni numaralı betik eklersin?",
      "Ödünç işlemi için hangi izolasyon ve eşzamanlılık sorunu iki kullanıcıyla ortaya çıkabilir?",
      "Her kolona indeks koysaydın yazma performansı ve disk için ne olurdu?"
    ],
    yetkinlikler: [
      { ad: "İlişkisel şema tasarımı", kanit: "Adım 1 ER diyagramı ve CREATE TABLE betikleri." },
      { ad: "Sürümlü migrasyon yönetimi", kanit: "Adım 2 çıktısı: Migrator ikinci çalıştırmada değişiklik yapmıyor." },
      { ad: "Güvenli veri erişimi", kanit: "Adım 3 repository metotları ve tırnaklı girdi testi." },
      { ad: "Transaction ve performans ölçümü", kanit: "Adım 4 rollback testi ve Adım 5 önce/sonra ölçüm notu." },
      { ad: "İade ve tutarlılık (isteğe bağlı)", kanit: "Adım 7 çıktısı: iade ve çift ödünç denemesi için önce/sonra SELECT sonuçları." }
    ],
    telafi: "K1 başarısızsa → adım 2'ye dön, SchemaVersion kontrolünü yeniden yaz. K2 başarısızsa → adım 1'e dön, UNIQUE kısıtını ekle. K3 başarısızsa → adım 3'e dön, tüm sorguları parametreye çevir. K4 başarısızsa → adım 4'e dön, transaction sınırlarını ve hata anını yeniden kur. K5 başarısızsa → adım 5'e dön, ölçümü aynı veriyle ve önek aramasıyla tekrarla; planda indeks adı yoksa harmanlamayı (COLLATE NOCASE) ve sorguyu gözden geçir. K6 başarısızsa → adım 6'ya dön, bağlantıyı açık tutan test hazırlığını (fixture) ve temiz şema kurulumunu düzelt. K7 (isteğe bağlı) başarısızsa → adım 7'ye dön, iade ve stok kontrolünü tek transaction'da yeniden kur.",
    sonraki: "K1-K6'nın tamamı (adım 7'yi yaptıysan K7 de) tutar ve savunma sorularını yanıtlarsan bk2c Harici API Tüketen Servis kilidi açılır; veri erişiminde ORM seçmeyi gerekçelendirebilirsin; tamamlama bir kanıt kaydı üretir."
  });

  K.yeni.push({
    yol: "bk", id: "bk2c", lv: 2,
    title: "Harici API Tüketen Servis ve Hata Yönetimi",
    weeks: 4,
    tools: ".NET SDK, ASP.NET Core Minimal API, HttpClient, Microsoft.Extensions.Http.Resilience (Polly v8 tabanlı), IMemoryCache (Microsoft.Extensions.Caching.Memory), xUnit, Postman veya curl, Git",
    why: "Modern servislerin çoğu başka servislere bağımlıdır ve o servisler yavaşlar, hata verir, bozuk yanıt döner. Kur bilgisi sağlayan harici bir JSON API'yi tüketen bir servis yazar, zaman aşımı, yeniden deneme ve önbellekle dayanıklı kılarsın.",
    outcome: ["HttpClient ile harici API'yi doğru yapılandırarak çağırırsın", "Zaman aşımı, yeniden deneme ve hata eşlemesi yazarsın", "Sahte HTTP yanıtlarıyla servisi ağsız test edersin"],
    pitch: "I built an ASP.NET Core service that consumes an external JSON API with timeouts, retries, error mapping and tests using a fake HTTP handler.",
    steps: [
      ["Harici API sözleşmesini oku", "Başka bir servisin API'si, bir restoranın menüsüdür: neyin sipariş edilebildiğini, ne döneceğini ve ne zaman 'bitti' diyeceğini bilmen gerekir. Sözleşmeyi bilmeden kod yazmak tahmindir.", "Seçtiğin bir ücretsiz döviz kuru API'sinin belgesini oku. İstek, yanıt gövdesi, durum kodları, hız sınırı ve kimlik doğrulama gereksinimini 1 sayfada özetle. Bir gerçek yanıtı dosyaya kaydet ve geliştirmeyi, testleri bu kayıtlı örnek yanıt üzerinden (yerel sahte uç nokta ya da test dosyası) yap. Ücretsiz bir API'nin kararlılığı, şeması ve hız sınırı değişebilir; seçeceğin API'nin kararlı olduğu burada doğrulanmadı, belgeyi ve yanıtı kendin doğrula.", "1 sayfalık API sözleşmesi özeti ve örnek yanıt", "API contract = API sözleşmesi, endpoint = uç nokta, rate limit = hız sınırı, status code = durum kodu", "how to read third party api documentation json response status codes"],
      ["Typed HttpClient ve DTO", "HttpClient'i her istekte new ile yaratmak, her telefonda yeni hat açmak gibi kaynak israfıdır. IHttpClientFactory havuzu yönetir. Dışarıdan gelen JSON'u kendi DTO'na çevirip iç modeli dışa bağımsız tutarsın.", "ExchangeRateClient sınıfını typed client olarak kaydet. Yanıtı DTO'ya deserialize et, ardından kendi Rate modeline eşle. /api/rates/{base}/{target} uç noktasını ekle.", "Uç nokta kayıtlı örnek yanıtı kendi modelinle dönüyor", "IHttpClientFactory = HttpClient fabrikası, typed client = tipli istemci, DTO = veri taşıma nesnesi, mapping = eşleme", "asp.net core typed httpclient ihttpclientfactory dto"],
      ["Zaman aşımı ve iptal", "Karşı servis yanıt vermezse sonsuza kadar beklemek, kuyrukta kilitlenmektir. Zaman aşımı sabırlılığın sınırıdır; CancellationToken ise iptal düğmesidir.", "İstek başına 3 saniyelik zaman aşımı koy, CancellationToken'ı zincirle. Yapay yavaş bir yerel sahte uç noktaya (kendi yazdığın) bağlanıp zaman aşımının tetiklendiğini göster. Zaman aşımında 504 dön. Zaman aşımı yeniden denenmez (adım 4); bu yüzden toplam süre yaklaşık 3 sn kalır.", "Yavaş sahte uç noktada 504 yanıtı", "timeout = zaman aşımı, CancellationToken = iptal belirteci, gateway timeout = ağ geçidi zaman aşımı, latency = gecikme", "httpclient timeout cancellationtoken asp.net core 504"],
      ["Yeniden deneme ve hata eşleme", "Geçici hata (ağ takılması, 503) tekrar denenince geçebilir; kalıcı hata (404, 400) denemekle geçmez. Yeniden denemede bekleme süresi katlanarak artar ki karşı servisi daha çok boğma.", "Microsoft.Extensions.Http.Resilience paketinin AddResilienceHandler yöntemiyle (Polly v8 tabanlı) bir yeniden deneme stratejisi kur; yöntem ve seçenek adlarını kendi paket sürümünde doğrula (burada doğrulanmadı). Yalnız 5xx ve ağ hatalarında en fazla 3 deneme, katlanan bekleme (örn. 200, 400, 800 ms) kullan; zaman aşımı ve 4xx yeniden denenmez. 404'ü kendi 404'üne, bozuk JSON'u 502'ye, zaman aşımını 504'e, harici 429'u (hız sınırı; yeniden denenmez, varsa Retry-After başlığı taşınır) kendi 503'üne eşle; 429 eşlemesi bir tasarım tercihidir, gerekçesini tabloya yaz. Her eşlemeyi tabloya yaz.", "Hata eşleme tablosu (404, 429, 502, 504) ve deneme sayısı logu", "retry = yeniden deneme, exponential backoff = katlanan bekleme, transient error = geçici hata, idempotent = tekrarlanabilir, resilience handler = direnç işleyicisi, Retry-After = tekrar deneme süresi başlığı", "microsoft.extensions.http.resilience addresiliencehandler retry exponential backoff polly"],
      ["Önbellek ve geri düşüş", "Her isteğe harici API'ye gitmek yavaş ve pahalıdır. Kısa süreli önbellek, sık sorulan cevabı cebinde tutmak gibidir; harici servis çökerse eski değeri 'bayat' işaretiyle göstermek geri düşüştür.", "Aynı kuru IMemoryCache ile (AddMemoryCache) 60 saniye önbelleğe al. Harici servis hata verirse önbellekte varsa bayat değeri 'stale: true' bayrağıyla dön, yoksa 502 dön. Önbellek isabet sayısını logla.", "İkinci istek önbellekten, hata anında bayat yanıt", "cache = önbellek, TTL = yaşam süresi, stale = bayat, fallback = geri düşüş", "imemorycache ttl fallback stale data resilience"],
      ["Sahte handler ile test", "Testte gerçek ağa çıkmak yavaş ve tutarsızdır. HttpMessageHandler'ı sahtelersen istediğin yanıtı, gecikmeyi veya hatayı üretirsin; test hızlı ve deterministik olur.", "Sahte handler yazıp 9 test oluştur: başarılı yanıt, 404, 429, bozuk JSON, zaman aşımı, 2 hata sonra başarı (yeniden deneme), önbellek isabeti, bayat geri düşüş, iptal. README'ye hata eşleme tablosunu koy.", "9 geçen test ve README", "mock = sahte nesne, HttpMessageHandler = HTTP mesaj işleyicisi, deterministic = deterministik, test double = test yerine geçen nesne", "mock httpmessagehandler unit test httpclient c#"],
      ["Gözlem ve bağımlılık sağlık denetimi (isteğe bağlı)", "Bağımlılığın çökmesi yalnız istemciyi değil seni de ilgilendirir: sağlık denetimi harici servisin durumunu gösterir. Deneme ve önbellek sayıları loga yazılırsa 'bugün kaç kez yeniden denedik' sorusu cevaplanır.", "ILogger ile deneme sayısını, önbellek isabetini/ıskalamasını ve harici hata türünü yapılandırılmış alanlarla yaz. /health/live (bağımlılıksız) ve /health/ready (harici API'ye hafif bir istek atan) uç noktalarını ekle; harici servis sahte handler'da hata verince ready 503, live 200 dönsün. Harici 429 gelirse log satırına Retry-After değerini de yaz.", "Log satırları ve live/ready çıktısı", "health check = sağlık denetimi, liveness = canlılık, readiness = hazır olma, structured logging = yapılandırılmış log", "asp.net core health checks readiness external dependency structured logging"]
    ],
    onkosul: ["Önkoşul: bk2 REST API: ASP.NET Core ve EF Core projesindeki uç nokta ve DI kavramları.", "JSON ve HTTP durum kodlarını okuyabilmek.", "xUnit ile test yazma (bk1 veya bk1c)."],
    gereksinim: [
      "İşlevsel (zorunlu): Servis harici bir kur API'sini HttpClient fabrikasıyla çağırır ve sonucu kendi modeline eşler.",
      "İşlevsel (zorunlu): İstek başına zaman aşımı uygulanır ve zaman aşımında 504 döner.",
      "İşlevsel (zorunlu): Yalnız geçici hatalarda en fazla 3 kez, katlanan beklemeyle yeniden denenir; zaman aşımı yeniden denenmez.",
      "İşlevsel (zorunlu): Hata eşleme tablosundaki durum kodları uygulanır (404, 429, 502, 504).",
      "İşlevsel (zorunlu): 60 saniyelik önbellek ve bayat değerle geri düşüş eklenir.",
      "İşlevsel (isteğe bağlı): /health/live ve /health/ready ile deneme ve önbellek sayılarını yapılandırılmış log olarak yazma eklenir.",
      "İşlevsel olmayan: Testler gerçek ağa çıkmadan çalışır."
    ],
    kabul: [
      "K1: Servis kendi Rate modelini döner, harici DTO'yu dışarı sızdırmaz | Test: uç nokta yanıtındaki alan adlarını DTO ile karşılaştır.",
      "K2: Yavaş sahte uç noktaya yapılan istek yeniden denenmeden yaklaşık 3 sn içinde 504 ile biter | Test: süreyi ölç, durum kodunu ve handler çağrı sayısının 1 olduğunu kayda geçir.",
      "K3: 503 sonrası başarı veren sahte yanıtta toplam 3 çağrı yapılır ve sonuç döner | Test: handler çağrı sayacını teste yaz, log satırlarını incele.",
      "K4: 404 ve 429 yanıtları yeniden denenmez; 429 kendi 503 yanıtına (varsa Retry-After ile) eşlenir | Test: iki durum için handler çağrı sayısının 1 olduğunu ve dönen durum kodlarını doğrula.",
      "K5: Aynı kur 60 sn içinde ikinci kez istendiğinde harici çağrı yapılmaz; harici servis hata verirse önbellekteki bayat değer 'stale: true' ile, önbellekte yoksa 502 döner | Test: çağrı sayacı ve önbellek isabet logunu gör; sahte handler'ı hata döndürecek şekilde değiştirip ikinci isteğin yanıtını kaydet.",
      "K6: En az 9 test geçer ve hata eşleme tablosu README'dedir | Test: dotnet test çıktısı ve README'yi kontrol et.",
      "K7: (İsteğe bağlı) Harici servis çökünce /health/ready 503, /health/live 200 döner ve yeniden deneme ile önbellek sayıları yapılandırılmış log satırı olarak yazılır | Test: sahte handler'ı hata döndürecek şekilde ayarla, iki uç noktayı çağır, log satırlarını kanıt notuna yapıştır."
    ],
    rubrik: [
      { olcut: "Sözleşme anlayışı", guclu: "API sözleşmesi, hız sınırı ve hata biçimleri eksiksiz özetlenmiş ve koda yansımış.", zayif: "Yanıt alanları tahminle okunmuş, hata biçimi bilinmiyor." },
      { olcut: "Dayanıklılık", guclu: "Zaman aşımı, kısıtlı yeniden deneme ve katlanan bekleme birlikte, gerekçeli.", zayif: "Zaman aşımı yok veya sınırsız deneme." },
      { olcut: "Hata eşleme", guclu: "Her harici hata türü anlamlı kendi durum koduna eşlenmiş.", zayif: "Her hata 500'e dönüyor." },
      { olcut: "Test yalıtımı", guclu: "Sahte handler ile ağsız deterministik testler, çağrı sayısı denetleniyor.", zayif: "Testler gerçek API'ye bağlı." },
      { olcut: "Bağımlılığı sınırlama", guclu: "Harici DTO ve iç model ayrı, önbellek stratejisi savunulabilir.", zayif: "Harici yanıt doğrudan istemciye aktarılıyor." }
    ],
    savunma: [
      "Hangi hataları yeniden denedin, hangilerini denemedin ve neden?",
      "Yeniden denemede bekleme süresi sabit olsaydı karşı servise ne olurdu?",
      "Bayat veri döndürmek bu senaryoda kabul edilebilir mi, hangi durumda olmazdı?",
      "Harici servis 5 dakika çökse senin servisin ne yapar, bunu nasıl izlersin?"
    ],
    yetkinlikler: [
      { ad: "Harici API tüketimi", kanit: "Adım 1 sözleşme özeti ve Adım 2 uç noktasının kendi modelinle dönen yanıtı." },
      { ad: "Dayanıklılık kalıpları", kanit: "Adım 3 504 yanıtı ve Adım 4 deneme sayısı logu." },
      { ad: "Hata sözleşmesi tasarımı", kanit: "Adım 4 hata eşleme tablosu." },
      { ad: "Önbellek ve geri düşüş", kanit: "Adım 5 çıktısı: ikinci istek önbellekten, hata anında bayat yanıt." },
      { ad: "Deterministik test", kanit: "Adım 6'daki 9 geçen test ve sahte handler." },
      { ad: "Gözlem ve sağlık denetimi (isteğe bağlı)", kanit: "Adım 7 çıktısı: log satırları ve live/ready çıktısı." }
    ],
    telafi: "K2 başarısızsa → adım 3'e dön, zaman aşımı ve CancellationToken zincirini yeniden kur; süre uzuyorsa adım 4'e de bak ve zaman aşımının yeniden denenmediğini doğrula. K3 veya K4 başarısızsa → adım 4'e dön, hangi hataların geçici sayıldığını yeniden tanımla; 404 ve 429'un denenmediğini sayaç testiyle göster. K5 başarısızsa → adım 5'e dön, önbellek anahtarı ve TTL mantığını gözden geçir; bayat geri düşüşü (stale: true ve 502) ayrıca dene. K1 başarısızsa → adım 2'ye dön, DTO ve model eşlemesini ayır. K6 başarısızsa → adım 6'ya dön, eksik testleri (9 test) ve README hata eşleme tablosunu tamamla. K7 (isteğe bağlı) başarısızsa → adım 7'ye dön, ready kontrolünü harici bağımlılığa bağla.",
    sonraki: "K1-K6'nın tamamı (adım 7'yi yaptıysan K7 de) tutar ve savunma sorularını yanıtlarsan bk2d Sayfalama, Filtreleme ve Doğrulama kilidi açılır; lv3 projelerinden bk3b (önbellek ve hız sınırlama) için önkoşulun büyük kısmı sağlanır; tamamlama bir kanıt kaydı üretir."
  });

  K.yeni.push({
    yol: "bk", id: "bk2d", lv: 2,
    title: "Sayfalama, Filtreleme ve Doğrulama API'si",
    weeks: 4,
    tools: ".NET SDK, ASP.NET Core Web API, EF Core, SQLite, OpenAPI belgesi (yerleşik Microsoft.AspNetCore.OpenApi; arayüz için Swashbuckle.AspNetCore veya Scalar.AspNetCore paketi), xUnit, Git",
    why: "Bir liste uç noktası binlerce kayıt döndürürse hem sunucuyu hem istemciyi çökertir; geçersiz girdi ise veriyi bozar. Ürün envanteri API'sinde sayfalama, süzme, sıralama ve girdi doğrulamayı tutarlı bir sözleşmeyle uygularsın.",
    outcome: ["Sayfalı ve süzülebilir liste uç noktası yazarsın", "Girdiyi doğrular ve standart hata biçimiyle dönersin", "Sorgu davranışını testlerle kilitlersin"],
    pitch: "I built an ASP.NET Core inventory API with server-side paging, filtering, sorting and validated requests that return consistent problem details.",
    steps: [
      ["Liste sözleşmesini tasarla", "Liste uç noktası, kütüphanenin arama makinesi gibidir: kaç sonuç, hangi sırayla, hangi süzgeçle sorusuna tek tip cevap vermelidir. Sözleşmeyi yazılı yaparsan istemci tahmin yürütmez.", "GET /api/products için parametreleri belirle: page, pageSize (varsayılan 20, en çok 100), q, category, minPrice, maxPrice, sort. Yanıt zarfını (items, page, pageSize, totalCount) ve 4 örnek isteği yaz.", "Liste sözleşmesi ve 4 örnek istek", "pagination = sayfalama, query string = sorgu dizgesi, response envelope = yanıt zarfı, default = varsayılan", "rest api pagination filtering sorting design query parameters"],
      ["Modeli ve veriyi kur", "Sayfalamayı denemek için yeterince veri gerekir; 5 kayıtta hata saklanır. Tohum verisi, test ortamını her seferinde aynı kuran kopya kâğıdıdır.", "Product (Id, Ad, Kategori, Fiyat, Stok, Oluşturma) modelini ve EF Core DbContext'i yaz. 500 ürünlük tohum verisi üret (kendi kodunla). Migrasyonu uygula.", "500 ürünlü çalışan veritabanı", "seed data = tohum verisi, DbContext = veri bağlamı, entity = varlık, migration = şema değişikliği", "ef core seed data sqlite dbcontext asp.net core"],
      ["Süzme ve sıralama: IQueryable", "IQueryable, sorguyu hemen çalıştırmayan bir tarif kartıdır: Where, OrderBy eklersin, en sonda veritabanına tek sorgu gider. Her şeyi belleğe çekip süzmek, bütün deponun envanterini eve taşımaktır.", "q (ad içinde), category, fiyat aralığı süzgeçlerini IQueryable üzerinde zincirle. sort parametresini yalnız beyaz listedeki alanlarla (ad, fiyat, oluşturma; artan/azalan) kabul et. Üretilen SQL'i logdan kontrol et.", "Üretilen SQL logu: WHERE ve ORDER BY veritabanında", "IQueryable = ertelenmiş sorgu, filter = süzgeç, whitelist = beyaz liste, deferred execution = ertelenmiş çalıştırma", "ef core iqueryable where orderby deferred execution sql log"],
      ["Sayfalama: Skip/Take ve toplam", "Sayfalama, kitabın sayfalarını çevirmektir: Skip öncekileri atlar, Take sayfa boyutunu alır. Toplam sayıyı süzgeçten sonra, sayfalamadan önce saymalısın; yoksa 'kaç sayfa var' yanlış çıkar.", "Count sorgusunu süzgeçten sonra, Skip/Take'ten önce çalıştır. Sıralamayı her zaman belirle (varsayılan Id) ki sayfalar kararlı olsun. Son sayfanın ve sayfa ötesinin (boş items) davranışını belirle.", "Sayfa 1, son sayfa ve sayfa ötesi örnek yanıtları", "Skip/Take = atla/al, totalCount = toplam kayıt, stable sort = kararlı sıralama, offset = ofset", "ef core skip take pagination total count stable ordering"],
      ["Girdi doğrulama ve ProblemDetails", "Doğrulama, kapıdaki görevlidir: geçersiz isteği içeri almaz ve nedenini söyler. Hataların hepsi aynı biçimde (ProblemDetails) gelirse istemci tek kod yazar.", "page ≥ 1, pageSize 1-100, minPrice ≤ maxPrice, geçersiz sort alanı gibi kuralları doğrula. Hatalarda 400 ve alan bazlı hata listesiyle ProblemDetails dön. Ürün oluşturma (POST) için ad boş olamaz, fiyat > 0 kuralları ekle.", "6 geçersiz istek için doğru 400 yanıtları", "validation = doğrulama, ProblemDetails = standart hata biçimi, 400 Bad Request = hatalı istek, data annotations = veri açıklamaları", "asp.net core validation problemdetails 400 fluentvalidation data annotations"],
      ["Testler, performans notu ve belgeleme", "Sorgu testleri, 'sayfa 3'te hangi ürünler gelir' gibi soruları kesinleştirir. Süzgeç kombinasyonları hatayı gizlediği yerdir.", "WebApplicationFactory ile 10 test yaz: varsayılan sayfa, özel sayfa boyutu, süzgeç, sıralama, birleşik süzgeç, sayfa ötesi, geçersiz parametreler. 500 ve 5000 kayıtta bir isteğin süresini ölç ve yorumla. OpenAPI belgesi adım 7'de ele alınır.", "10 geçen test ve ölçüm notu", "integration test = entegrasyon testi, WebApplicationFactory = test sunucusu, OpenAPI = API belgesi biçimi, benchmark = karşılaştırmalı ölçüm", "webapplicationfactory integration test pagination asp.net core"],
      ["OpenAPI belgesi: örnek istek/yanıt ekle ve belgeyi doğrula", "API belgesi, cihazın kullanım kılavuzudur; belge ile davranış ayrışırsa istemci yanlış varsayım yapar. .NET 9 ve sonrasındaki Web API şablonu Swagger UI getirmez; yalnız yerleşik OpenAPI belgesi üretir (Microsoft.AspNetCore.OpenApi, MapOpenApi ile /openapi/v1.json). Arayüz istersen Swashbuckle.AspNetCore (Swagger UI) veya Scalar.AspNetCore paketini kurarsın.", "MapOpenApi ile belgeyi aç. Arayüz için dotnet add package Scalar.AspNetCore (veya Swashbuckle.AspNetCore) kur ve MapScalarApiReference (Swashbuckle ise UseSwaggerUI) ekle. Belgeye adım 1'deki 4 örnek isteği ve 200 ile 400 ProblemDetails örnek yanıtlarını ekle. Sonra belgeyi doğrula: parametrelerin (page, pageSize, q, category, minPrice, maxPrice, sort) ve yanıt kodlarının belgede olduğunu kontrol et, arayüzden bir geçersiz isteği dene ve gerçek yanıtla belgeyi karşılaştır.", "Örnekli OpenAPI belgesi ve belge-davranış karşılaştırma notu", "OpenAPI document = API belgesi, schema = şema, example = örnek, Swagger UI = belge arayüzü", "asp.net core 9 openapi document scalar swashbuckle swagger ui"]
    ],
    onkosul: ["Önkoşul: bk2 REST API: ASP.NET Core ve EF Core (CRUD, DbContext, OpenAPI belgesi).", "LINQ Where ve OrderBy kullanımı (bk1 Konsol Görev Yöneticisi).", "HTTP durum kodları ve sorgu dizgesi bilgisi."],
    gereksinim: [
      "İşlevsel (zorunlu): Liste uç noktası page ve pageSize ile sayfalar; varsayılan 20, üst sınır 100.",
      "İşlevsel (zorunlu): q, category ve fiyat aralığı süzgeçleri birlikte çalışır.",
      "İşlevsel (zorunlu): Yalnız beyaz listedeki alanlarla sıralama yapılır.",
      "İşlevsel (zorunlu): Geçersiz girdi alan bazlı hatalarla ProblemDetails biçiminde 400 döner.",
      "İşlevsel (zorunlu): OpenAPI belgesi tüm sorgu parametrelerini, örnek isteği ve 200/400 yanıt örneklerini içerir.",
      "İşlevsel (isteğe bağlı): Sonraki ve önceki sayfa bağlantıları yanıta eklenir.",
      "İşlevsel olmayan: Süzme, sıralama ve sayfalama veritabanı sorgusunda yapılır, bellekte değil."
    ],
    kabul: [
      "K1: 500 kayıt için pageSize=20'de 25 sayfa ve totalCount=500 döner | Test: ilk ve 25. sayfayı çağır, items sayılarını ve totalCount'u gör.",
      "K2: Süzgeç uygulandığında totalCount süzülmüş sayıyı gösterir | Test: category=X ile çağır, sayıyı veritabanında COUNT ile doğrula.",
      "K3: Sıralama kararlıdır; aynı kayıt iki sayfada tekrar etmez | Test: tüm sayfaları gez, Id'lerin benzersizliğini ve toplamını kontrol et.",
      "K4: pageSize=1000 ve sort=password için 400 ProblemDetails döner | Test: iki isteği gönder, hata alan adlarını oku.",
      "K5: EF Core logunda süzgeç WHERE'de, sayfalama LIMIT/OFFSET'te görünür | Test: SQL logu kanıt notuna yapıştır.",
      "K6: En az 10 test geçer | Test: dotnet test çıktısını kaydet.",
      "K7: OpenAPI belgesi 7 sorgu parametresini ve en az 1 örnek 400 yanıtını içerir; belgedeki bir örnek istek gerçek yanıtla uyuşur | Test: /openapi/v1.json dosyasını aç, parametreleri say; örnek isteği arayüzden çalıştır."
    ],
    rubrik: [
      { olcut: "Sözleşme tutarlılığı", guclu: "Parametreler, varsayılanlar ve yanıt zarfı yazılı ve testlerle uyumlu.", zayif: "Parametreler tutarsız, belge ile davranış farklı." },
      { olcut: "Sorgu verimliliği", guclu: "Süzme, sıralama ve sayfalama veritabanında, tek sorguda; SQL logu kanıtlı.", zayif: "Tüm tablo belleğe çekilip süzülüyor." },
      { olcut: "Sayfalama doğruluğu", guclu: "Toplam süzgeçten sonra sayılır, sıralama kararlı, sayfa ötesi tanımlı.", zayif: "Sayfalar çakışıyor veya toplam yanlış." },
      { olcut: "Doğrulama ve hata biçimi", guclu: "Alan bazlı, standart 400 yanıtları; beyaz liste uygulanıyor.", zayif: "Hatalar 500 veya düz metin; sort alanı kontrolsüz." },
      { olcut: "Test kapsamı", guclu: "Süzgeç kombinasyonları ve sınırlar ayrı testlerde.", zayif: "Yalnız varsayılan istek test edilmiş." }
    ],
    savunma: [
      "Skip/Take sayfalaması çok büyük tablolarda neden yavaşlar, alternatif ne olurdu?",
      "Sort alanını neden beyaz listeyle sınırladın, doğrudan kolon adı kabul etseydin ne olurdu?",
      "pageSize üst sınırını neden koydun ve 100'ü nasıl seçtin?",
      "Doğrulamayı denetleyicide mi, ayrı katmanda mı yaptın, bu karar test ve bakım için ne değiştirir?"
    ],
    yetkinlikler: [
      { ad: "API sözleşmesi tasarımı", kanit: "Adım 1 liste sözleşmesi ve 4 örnek istek." },
      { ad: "Verimli sorgu yazma", kanit: "Adım 3 üretilen SQL logu ve Adım 4 sayfa örnek yanıtları." },
      { ad: "Girdi doğrulama", kanit: "Adım 5 çıktısı: 6 geçersiz istek için doğru 400 yanıtları." },
      { ad: "Entegrasyon testi", kanit: "Adım 6'daki 10 geçen test ve ölçüm notu." },
      { ad: "API belgeleme", kanit: "Adım 7'deki örnekli OpenAPI belgesi ve belge-davranış karşılaştırma notu." }
    ],
    telafi: "K1 veya K3 başarısızsa → adım 4'e dön, kararlı sıralama ve Count sırasını yeniden kur. K2 veya K5 başarısızsa → adım 3'e dön, süzgeçleri IQueryable üzerinde zincirleyip SQL logunu kontrol et. K4 başarısızsa → adım 5'e dön, doğrulama kurallarını ve ProblemDetails çıktısını yeniden yaz. K6 başarısızsa → adım 6'ya dön, süzgeç kombinasyon testlerini ekle. K7 başarısızsa → adım 7'ye dön, belgeyi yeniden üretip parametreleri ve örnek yanıtları ekle.",
    sonraki: "K1-K7'nin tamamı tutar ve savunma sorularını yanıtlarsan lv3 projeleri bk3b Önbellek ve Hız Sınırlama ile bk3c Arka Plan İşi ve Kuyruk için önkoşulun büyük bölümü sağlanır; tamamlama bir kanıt kaydı üretir."
  });

  /* ---------- LV3 ---------- */

  K.yeni.push({
    yol: "bk", id: "bk3b", lv: 3,
    title: "Önbellek ve Hız Sınırlama Katmanı",
    weeks: 4,
    tools: ".NET SDK, ASP.NET Core, IMemoryCache, ASP.NET Core Rate Limiting, xUnit, curl veya k6, Git",
    why: "Trafik arttığında en pahalı sorgu ve en saldırgan istemci sistemi yavaşlatır; önbellek maliyeti, hız sınırı ise adaleti ve korumayı sağlar. Bir ürün kataloğu API'sine önbellek stratejisi ve istemci başına hız sınırı tasarlar, kararlarını ölçümle savunursun.",
    outcome: ["Önbellek stratejisini (TTL, geçersiz kılma) tasarlarsın", "İstemci başına hız sınırı uygular ve 429 sözleşmesini tanımlarsın", "Ölçüm yaparak tasarım kararlarını savunursun"],
    pitch: "I designed a caching and rate limiting layer for an ASP.NET Core API, measuring hit rates and latency to justify the TTL and limit choices.",
    steps: [
      ["Yük ve sorun analizi", "Önbelleği körlemesine koymak, her dolaba kilit takmak gibidir; önce neyin pahalı ve neyin sık okunduğunu ölçersin. Tasarım, ölçümle başlar.", "Yavaş bir katalog uç noktası (yapay 200 ms gecikmeli sorgu) yaz. 200 istekle (k6 ile ya da Task.WhenAll kullanan kendi yük betiğinle) ortalama ve en yavaş %95'lik yanıt süresini ölç. k6 kurulumunu ve betik sözdizimini kendi sürümünün belgesinden doğrula (burada doğrulanmadı). Hangi verinin sık okunup nadir değiştiğini sınıflandır.", "Taban ölçümü ve veri sınıflandırma tablosu", "baseline = taban ölçüm, latency = gecikme, p95 = yüzde 95'lik gecikme, read-heavy = okuma ağırlıklı", "api performance baseline latency p95 measurement"],
      ["Okuma önbelleği: cache-aside", "Cache-aside, defterinin önce yanına bakmak gibidir: varsa oradan oku, yoksa kaynaktan al ve deftere yaz. Aynı anda gelen 100 istek aynı boş anahtara çarparsa hepsi kaynağa gider; buna 'sürü çarpması' denir ve kilitle önlenir.", "IMemoryCache ile cache-aside uygula, TTL'i verinin değişme sıklığına göre seç. Aynı anda 50 isteğin (k6 veya Task.WhenAll betiğiyle) aynı anahtarda yalnız 1 kaynak sorgusu yaptığını (SemaphoreSlim veya tek-uçuş mantığıyla) göster. Seçmediğin bir önbellek yaklaşımını (ör. önbelleksiz okuma ya da yazarken güncelleme) neden seçmediğini 2 cümleyle not et; adım 6'daki karar belgesinde kullanacaksın.", "50 eşzamanlı istekte 1 kaynak çağrısı kanıtı", "cache-aside = önce önbellek deseni, TTL = yaşam süresi, cache stampede = önbellek sürü çarpması, hit rate = isabet oranı", "cache aside pattern cache stampede imemorycache semaphoreslim"],
      ["Geçersiz kılma ve tutarlılık", "Bilgisayar bilimindeki iki zor şeyden biri önbellek geçersiz kılmadır: ürün fiyatı güncellenince eski fiyat kaç dakika görünebilir? Bu süreye karar vermek bir iş kararıdır, teknik değil.", "Ürün güncellenince ilgili anahtarı sil veya güncelle. 'En çok kaç saniye eski veri kabul edilir' kuralını yazılı karara bağla. Güncelleme sonrası okuma ile eski veri penceresini ölç.", "Eski veri penceresi ölçümü ve karar notu", "invalidation = geçersiz kılma, staleness = bayatlık, consistency = tutarlılık, eviction = çıkarma", "cache invalidation strategies staleness trade-off"],
      ["Hız sınırı: algoritma seçimi", "Hız sınırı, bir metro turnikesidir: dakikada kaç kişi geçebilir. Sabit pencere basittir ama pencere sınırında iki katı geçirebilir; kayan pencere veya token bucket daha adildir. Her seçimin bedeli vardır.", "Üç algoritmayı (sabit pencere, kayan pencere, token bucket) kâğıtta karşılaştır: patlama, bellek, doğruluk. Birini seç ve nedenini yaz. ASP.NET Core rate limiter ile istemci IP'si veya anahtarı başına 20 istek/10 sn uygula.", "Algoritma karşılaştırma tablosu ve çalışan sınır", "rate limiting = hız sınırlama, token bucket = jeton kovası, sliding window = kayan pencere, throttling = kısma", "rate limiting algorithms token bucket sliding window fixed window"],
      ["429 sözleşmesi ve istemci deneyimi", "Reddedilen istemciye neden ve ne zaman tekrar deneyeceğini söylemezsen kör kalır. Retry-After başlığı, kapıdaki 'şu saatte gel' notudur.", "Sınır aşıldığında 429 ve Retry-After başlığıyla ProblemDetails dön. Kimliği doğrulanmış istemci için daha yüksek sınır tanımla. Kendi test istemcinle sınırın tetiklendiğini ve süre dolunca açıldığını göster.", "429 yanıtı ve sınırın yeniden açılması", "429 Too Many Requests = çok fazla istek, Retry-After = tekrar deneme süresi, quota = kota, client key = istemci anahtarı", "http 429 retry-after header rate limit asp.net core"],
      ["Ölçüm, test ve tasarım savunması", "Kararını sayıyla göstermeyen tasarım bir görüştür. Önbellek isabet oranı ve gecikme farkı, hız sınırı reddi oranı sunumunun kanıtlarıdır.", "Önce/sonra ölçümünü (k6 veya yük betiğinle) tekrarla: isabet oranı, ortalama ve p95 gecikme, 429 sayısı. 8 test yaz (isabet, ıskalama, geçersiz kılma, sürü çarpması, sınır, 429 başlığı, sınır sıfırlanması, ayrı istemci). 1 sayfalık tasarım kararı belgesi yaz: önbellek için reddettiğin en az bir alternatifi (adım 2'deki not) ve hız sınırı için reddettiğin algoritmayı (adım 4'teki tablo) nedenleriyle ve ölçümle ilişkilendirerek yaz.", "Ölçüm tablosu, 8 test ve reddedilen alternatifli karar belgesi", "ADR = mimari karar kaydı, trade-off = ödünleşim, load test = yük testi, observability = gözlemlenebilirlik", "architecture decision record trade-off caching rate limiting"],
      ["Yük testi ve dağıtık önbellek notu (isteğe bağlı)", "Tek istekle çalışan tasarım, kalabalıkta başka türlü davranabilir: sürü çarpması, sınır ve gecikme ancak yük altında görünür. IMemoryCache tek sunucunun belleğidir; birden çok sunucu olunca her sunucunun kendi önbelleği ve kendi sayacı olur.", "k6 ya da Task.WhenAll betiğiyle 30-60 sn'lik yük testi çalıştır (önbellekli ve önbelleksiz, sabit eşzamanlı kullanıcı sayısıyla); isabet oranı, p95 ve 429 oranını tabloya yaz. Ardından 'iki sunucuya çıksak ne bozulur' sorusu için 3 maddelik not yaz (ör. IDistributedCache gibi dağıtık önbellek arayüzü ve ortak sayaç gereksinimi). Bu bir tasarım notudur; çok sunuculu kurulumu çalıştırman gerekmez.", "Yük testi tablosu ve dağıtık önbellek notu", "load test = yük testi, distributed cache = dağıtık önbellek, IDistributedCache = dağıtık önbellek arayüzü, scale out = yatay ölçekleme", "k6 load test distributed cache idistributedcache rate limiting multiple servers"]
    ],
    onkosul: ["Önkoşul: bk2 REST API: ASP.NET Core ve EF Core ile bk2c Harici API Tüketen Servis (önbellek ve dayanıklılık kavramları).", "bk2d Sayfalama, Filtreleme ve Doğrulama API'si (liste uç noktası ve test deneyimi) önerilir.", "HTTP durum kodları ve başlıklar, eşzamanlılığa temel aşinalık (async/await, kilit)."],
    gereksinim: [
      "İşlevsel (zorunlu): Katalog okuma uç noktası cache-aside ile önbelleğe alınır ve TTL gerekçelidir.",
      "İşlevsel (zorunlu): Ürün güncellenince ilgili önbellek girdisi geçersiz kılınır.",
      "İşlevsel (zorunlu): Eşzamanlı aynı anahtar istekleri tek kaynak sorgusu üretir.",
      "İşlevsel (zorunlu): İstemci başına hız sınırı aşılınca 429 ve Retry-After döner.",
      "İşlevsel (isteğe bağlı): Kimliği doğrulanmış istemci için ayrı bir kota tanımlanır.",
      "İşlevsel (isteğe bağlı): Yük testi sonuçları ve çok sunuculu ortam için dağıtık önbellek notu eklenir.",
      "İşlevsel olmayan: Her tasarım kararı (TTL, algoritma, sınır değeri) önce/sonra ölçümle belgelenir."
    ],
    kabul: [
      "K1: Taban ölçümde ortalama ve p95 gecikme kayıtlıdır | Test: 200 istek sonucu tablosunu kanıt notuna ekle.",
      "K2: TTL süresi içinde ikinci ve sonraki isteklerde kaynak çağrısı yapılmaz | Test: TTL dolmadan art arda istek at, kaynak çağrı sayacını oku, isabet oranını hesapla; TTL dolduktan sonraki ilk isteğin kaynağa gittiğini de gör.",
      "K3: 50 eşzamanlı istekte kaynak yalnız 1 kez sorgulanır | Test: k6 ya da Task.WhenAll betiğiyle 50 eşzamanlı istek at ve kaynak çağrı sayacını gör.",
      "K4: Ürün güncellenince bir sonraki okuma yeni değeri döner | Test: güncelle, hemen oku, değeri karşılaştır; eski veri penceresini yaz.",
      "K5: 10 sn'de 21. istek 429 ve Retry-After alır, süre sonunda yeniden kabul edilir | Test: istek döngüsü çalıştır, durum kodlarını ve başlığı kaydet.",
      "K6: Karar belgesi önbellek ve hız sınırı için en az birer reddedilen alternatifi nedenleriyle içerir | Test: belgeyi oku ve alternatifleri say.",
      "K7: (İsteğe bağlı) Yük testinde önbellekli ve önbelleksiz isabet oranı, p95 ve 429 oranı tabloda yazılıdır ve çok sunuculu ortam için dağıtık önbellek ile ortak sayaç notu en az 3 maddedir | Test: tabloyu ve notu aç, sayıları ve maddeleri say."
    ],
    rubrik: [
      { olcut: "Ölçüm temelli karar", guclu: "Taban ve sonrası sayıları var, TTL ve sınır değerleri ölçüme dayanıyor.", zayif: "Sayılar sezgisel, ölçüm yok." },
      { olcut: "Önbellek doğruluğu", guclu: "Geçersiz kılma, sürü çarpması ve bayatlık penceresi ele alınmış ve test edilmiş.", zayif: "Yalnız TTL var; güncelleme sonrası eski veri sürüyor ve fark edilmiyor." },
      { olcut: "Hız sınırı tasarımı", guclu: "Algoritma seçimi karşılaştırmalı, istemci anahtarı mantıklı, 429 sözleşmesi tam.", zayif: "Genel sayaç, istemci ayrımı yok, başlık yok." },
      { olcut: "Eşzamanlılık güvenliği", guclu: "Aynı anahtarlı eşzamanlı isteklerde kaynak tek çağrılıyor, kanıtlı.", zayif: "Yarış durumu denenmemiş." },
      { olcut: "Tasarım savunması", guclu: "Reddedilen alternatifler ve bedeller açık yazılı.", zayif: "Karar nedeni verilmemiş." }
    ],
    savunma: [
      "TTL değerini nasıl seçtin ve fiyat güncellemesinde 30 saniyelik bayatlık iş açısından kabul edilebilir mi?",
      "Uygulama birden çok sunucuda çalışsa bu önbellek ve hız sınırı neden yetersiz kalır, çözüm ne olurdu?",
      "Sabit pencere yerine token bucket seçseydin hangi davranış değişirdi?",
      "Önbellekte hata varsa (yanlış anahtar) hangi veri sızabilir ve bunu nasıl önlersin?"
    ],
    yetkinlikler: [
      { ad: "Performans ölçümü ve analiz", kanit: "Adım 1 taban ölçümü ve Adım 6 ölçüm tablosu." },
      { ad: "Önbellek tasarımı", kanit: "Adım 2 sürü çarpması kanıtı ve Adım 3 eski veri penceresi ölçümü." },
      { ad: "Hız sınırlama ve istemci sözleşmesi", kanit: "Adım 4 algoritma tablosu ve Adım 5 429 yanıtı." },
      { ad: "Tasarım kararını savunma", kanit: "Adım 6 karar belgesi ve 8 test." },
      { ad: "Yük altında doğrulama (isteğe bağlı)", kanit: "Adım 7 çıktısı: yük testi tablosu ve dağıtık önbellek notu." }
    ],
    telafi: "K2 başarısızsa → adım 2'ye dön, önbellek anahtarını ve TTL mantığını (TTL içinde kaynağa gidilmemesini) yeniden kur. K3 başarısızsa → adım 2'ye dön, eşzamanlı aynı anahtar için kilit veya tek-uçuş mantığını yeniden yaz. K4 başarısızsa → adım 3'e dön, geçersiz kılma noktasını güncelleme koduna bağla. K5 başarısızsa → adım 4 ve 5'e dön, sınır yapılandırmasını ve 429 yanıtını yeniden kur. K1 veya K6 başarısızsa → adım 1 ve 6'ya dön, ölçümü ve karar belgesini (reddedilen alternatiflerle) tamamla. K7 (isteğe bağlı) başarısızsa → adım 7'ye dön, yük testini ve notu tamamla.",
    sonraki: "K1-K6'nın tamamı (adım 7'yi yaptıysan K7 de) tutar ve 4 savunma sorusunu gerekçeli yanıtlarsan bk3c Arka Plan İşi ve Kuyruk ile bk3d Gözlemlenebilirlik kilitleri açılır; bk4 bulut kapstonu için ölçeklenme gerekçelerini kullanabilirsin; tamamlama bir kanıt kaydı üretir."
  });

  K.yeni.push({
    yol: "bk", id: "bk3c", lv: 3,
    title: "Arka Plan İşi ve Kuyruk Sistemi",
    weeks: 4,
    tools: ".NET SDK, ASP.NET Core, BackgroundService, System.Threading.Channels, SQLite, xUnit, Git",
    why: "E-posta göndermek veya rapor üretmek gibi yavaş işler istek içinde yapılırsa kullanıcı bekler ve hata anında iş kaybolur. Bir bildirim servisinde işi kuyruğa alan, arka planda çalıştıran, hatada yeniden deneyen ve çift işlemeyi önleyen bir sistem tasarlarsın.",
    outcome: ["İşi kuyruğa alıp arka planda işleyen servis yazarsın", "Yeniden deneme, ölü mektup kuyruğu ve idempotency uygularsın", "Kapanışta iş kaybını önleme kararlarını savunursun"],
    pitch: "I built a durable job queue with a background worker, retries with backoff, a dead-letter table and idempotent processing in ASP.NET Core.",
    steps: [
      ["Senkron sorunu ve tasarım", "Postaneye mektup bırakıp gitmek ile mektubun ulaşmasını kapıda beklemek farklıdır: kuyruk, 'aldım, işleyeceğim' fişidir. Ama fiş kaybolursa mektup da kaybolur; bu yüzden kalıcılık sorusu baştan sorulur.", "Bildirim gönderme uç noktasını önce senkron yaz ve 2 sn'lik yapay gecikmeyle sürenin istemciyi nasıl beklettiğini ölç. Hedef akışı çiz: POST → kuyruğa yaz → 202 Accepted → işçi işler → durum sorgulanır. Kaybolma riskini listele.", "Akış çizimi ve senkron gecikme ölçümü", "asynchronous processing = eşzamansız işleme, queue = kuyruk, 202 Accepted = kabul edildi, producer/consumer = üretici/tüketici", "background job queue design 202 accepted producer consumer"],
      ["Bellek içi kuyruk: Channel ve BackgroundService", "Channel, üreticiyle tüketici arasındaki taşıma bandıdır; BackgroundService ise uygulamayla birlikte açılıp kapanan sürekli çalışan işçidir. Sınırlı kapasiteli bant, dolunca üreticiyi yavaşlatır ve belleği korur.", "Channel<Job> ile sınırlı kapasiteli kuyruk ve BackgroundService işçisi yaz. POST 202 ve iş Id'si döner, işçi işi işler. Kuyruk doluysa 503 dön. Bilerek uygulamayı yeniden başlatıp bellek içi kuyruktaki işlerin kaybolduğunu göster. (Adım 3'te iş kuyruğunun yerini tablo alır; Channel yalnız uyandırma sinyali olarak kalır.)", "202 yanıtı ve yeniden başlatmada iş kaybı kanıtı", "Channel = kanal, BackgroundService = arka plan servisi, bounded = sınırlı kapasiteli, backpressure = geri basınç", "system.threading.channels backgroundservice bounded channel c#"],
      ["Kalıcı kuyruk: Jobs tablosu", "Kalıcı kuyruk, işi defterine yazmaktır: elektrik kesilse de defter yerinde durur. Her işin durumu (Beklemede, İşleniyor, Başarılı, Başarısız) ve deneme sayısı kayıtlıdır.", "Jobs tablosunu (Id, Tür, Yük, Durum, Deneme, SonrakiDeneme, Hata) SQLite'ta kur. Uç nokta işi tabloya yazsın; işçi tablodan 'Beklemede' olanları alıp 'İşleniyor' yapsın. Karar: Channel yalnız işçiyi uyandıran sinyaldir (işin kendisini taşımaz); kuyruk sınırı Channel kapasitesi değil, Beklemede iş sayısıdır (örn. 1000) ve aşılırsa POST 503 döner. Yeniden başlatmada işlerin kaybolmadığını göster.", "Yeniden başlatma sonrası devam eden iş", "durable = kalıcı, job status = iş durumu, polling = yoklama, persistence = kalıcılık", "persistent job queue database table polling worker status"],
      ["Yeniden deneme ve ölü mektup", "Geçici hatada işi bir süre sonra yeniden denersin; sürekli başarısız olan iş sonsuz döngüye girerse kuyruğu tıkar. Belli sayıdan sonra işi 'ölü mektup' kutusuna ayırırsın ki biri bakıp karar versin.", "Hata fırlatan iş türü ekle. En fazla 4 deneme ve katlanan bekleme (SonrakiDeneme alanı) uygula. 4. başarısızlıkta durumu 'Ölü' yap ve hata metnini sakla. Ölü işleri listeleyen ve yeniden kuyruğa alan uç nokta ekle.", "Hata sonrası deneme zaman çizelgesi ve ölü iş", "dead-letter queue = ölü mektup kuyruğu, backoff = bekleme artışı, poison message = zehirli ileti, max attempts = en çok deneme", "dead letter queue retry backoff poison message"],
      ["Idempotency ve çift işleme", "İstemci ağ hatasında aynı isteği iki kez gönderebilir; işçi çöküp işi iki kez alabilir. Her iş için bir idempotency anahtarı, 'bu mektup zaten teslim edildi' damgasıdır; ikinci gelen işlenmez.", "İstekte Idempotency-Key başlığı kabul et; aynı anahtarla ikinci istek yeni iş üretmesin, mevcut işin Id'sini dönsün. İşçide aynı işin iki kez çalışmasına karşı durum güncellemesini koşullu yap. Aynı isteği 5 kez göndererek 1 iş oluştuğunu göster.", "5 aynı istek, 1 iş kaydı", "idempotency key = tekrar güvenliği anahtarı, at-least-once = en az bir kez teslim, exactly-once = tam bir kez, duplicate = çift kayıt", "idempotency key api at least once delivery duplicate"],
      ["Kapanış, test ve işletim notu", "Servis kapanırken yarım kalan iş, depoyu kapatırken tezgahta unutulan mal gibidir; zarif kapanış (graceful shutdown) bunu önler. Hiç test edilmemiş hata yolu, çalışmayan hata yoludur.", "Kapanış belirtecini dinleyip işçinin mevcut işi bitirmesini sağla. 9 test yaz: kuyruğa alma, işleme, başarısız deneme, ölü iş, idempotency, kuyruk dolu, yeniden başlatma, durum sorgusu, zarif kapanış. Kuyruk uzunluğu ve ölü iş sayısı için kısa bir işletim notu yaz.", "9 geçen test ve işletim notu", "graceful shutdown = zarif kapanış, hosted service = barındırılan servis, operational runbook = işletim notu, queue depth = kuyruk uzunluğu", "graceful shutdown backgroundservice stoppingtoken c# testing"],
      ["Eşzamanlılık: iki işçi aynı işi alırsa", "İki kasiyer aynı müşteriyi çağırırsa müşteri iki kez ücretlendirilir. İşi 'alan' kişi bir sahiplenme damgasıyla tek olmalıdır: önce okuyup sonra yazmak iki işçiyi aynı anda içeri sokar, tek bir koşullu güncelleme ise kapıyı bir kişiye açar.", "İşi alma adımını tek atomik güncellemeye çevir: UPDATE Jobs SET Durum='İşleniyor' WHERE Id=@id AND Durum='Beklemede'; etkilenen satır 1 ise iş senindir, 0 ise başkası aldı. İki işçi (iki BackgroundService örneği) çalıştırıp 20 işi paylaştır ve her işin işleme sayacını kaydet. Bu durum için 1 test yaz.", "Her işin tam bir kez işlendiğini gösteren sayaç tablosu ve test", "concurrency = eşzamanlılık, atomic update = bölünmez güncelleme, race condition = yarış durumu, claim = sahiplenme", "sql atomic claim job update where status pending concurrent workers"]
    ],
    onkosul: ["Önkoşul: bk2 REST API: ASP.NET Core ve EF Core (uç nokta, DbContext veya ADO.NET erişimi).", "bk2c Harici API Tüketen Servis'teki yeniden deneme ve hata eşleme kavramları.", "async/await ve temel eşzamanlılık kavramları; bk2b SQL Veri Erişim Katmanı'ndaki transaction bilgisi önerilir."],
    gereksinim: [
      "İşlevsel (zorunlu): Bildirim isteği kuyruğa yazılır ve 202 ile iş Id'si döner.",
      "İşlevsel (zorunlu): İşler Jobs tablosunda kalıcıdır ve uygulama yeniden başlatılınca devam eder.",
      "İşlevsel (zorunlu): Başarısız iş en çok 4 kez katlanan beklemeyle denenir, sonra Ölü olur.",
      "İşlevsel (zorunlu): Aynı Idempotency-Key ile gelen istek tek iş üretir.",
      "İşlevsel (zorunlu): Beklemede iş sayısı sınırı aşılınca POST 503 döner; Channel yalnız uyandırma sinyalidir.",
      "İşlevsel (zorunlu): İki işçi aynı işi almaya çalışsa bile iş yalnız bir işçi tarafından işlenir.",
      "İşlevsel (isteğe bağlı): Ölü işler elle yeniden kuyruğa alınabilir.",
      "İşlevsel olmayan: Kapanışta işçi mevcut işi bitirir veya işi 'Beklemede' durumuna geri bırakır, iş kaybolmaz."
    ],
    kabul: [
      "K1: POST isteği işin süresinden bağımsız hızlı biçimde 202 döner | Test: 2 sn'lik işte yanıt süresini ölç, 202 ve iş Id'sini kaydet.",
      "K2: Uygulama yeniden başlatılınca 'Beklemede' işler işlenir | Test: 3 iş ekle, işçi çalışmadan kapat, aç, durumların Başarılı olduğunu gör.",
      "K3: Sürekli hata veren iş 4 denemeden sonra Ölü olur | Test: Deneme sayısı ve SonrakiDeneme zaman damgalarını tablodan al.",
      "K4: Aynı Idempotency-Key ile 5 istek 1 iş kaydı üretir | Test: Jobs tablosunda COUNT al.",
      "K5: Beklemede iş sayısı sınırında 503 döner ve bellek büyümez | Test: sınırı aşan istek betiği çalıştır, yanıt kodlarını say ve Jobs tablosundaki Beklemede sayısını sınırla karşılaştır.",
      "K6: En az 9 test geçer ve işletim notu iki izleme ölçüsünü (kuyruk uzunluğu, ölü iş sayısı) tanımlar | Test: test çıktısını ve notu kanıt notuna ekle.",
      "K7: Kapanış sinyalinde 'İşleniyor' durumundaki iş ya Başarılı olur ya da Beklemede'ye döner; hiçbir iş kaybolmaz | Test: 2 sn'lik iş sürerken uygulamayı kapat, aç ve Jobs'ta İşleniyor kalan iş olmadığını, toplam iş sayısının değişmediğini doğrula.",
      "K8: İki işçi aynı 20 işi alırken her iş tam 1 kez işlenir | Test: iki işçi çalıştır, her işin işleme sayacının 1 olduğunu ve atomik güncellemede etkilenen satır sayısını kontrol et."
    ],
    rubrik: [
      { olcut: "Kalıcılık ve kayıpsızlık", guclu: "Yeniden başlatma ve çökme senaryoları denenmiş, iş kaybı yok ve kanıtlı.", zayif: "Bellek içi kuyruk, yeniden başlatmada işler gidiyor." },
      { olcut: "Hata ve yeniden deneme tasarımı", guclu: "Deneme sınırı, katlanan bekleme ve ölü mektup birlikte, zaman çizelgesiyle kanıtlı.", zayif: "Sonsuz deneme veya hata sessizce yutuluyor." },
      { olcut: "Çift işleme koruması", guclu: "İstek ve işçi düzeyinde idempotency; ikisi de testli.", zayif: "Aynı iş iki kez çalışabiliyor, fark edilmiyor." },
      { olcut: "Kapanış ve kaynak yönetimi", guclu: "Zarif kapanış ve sınırlı kuyruk, geri basınç davranışı açık.", zayif: "Kapanışta iş yarım kalıyor, kuyruk sınırsız büyüyor." },
      { olcut: "Tasarım gerekçesi", guclu: "Teslim garantisi (en az bir kez) ve bedeli açıkça yazılı.", zayif: "Garanti hakkında iddia yok veya yanlış (tam bir kez diye)." }
    ],
    savunma: [
      "Neden 'tam bir kez' değil 'en az bir kez' teslim modelini seçtin ve idempotency bunu nasıl telafi eder?",
      "Kalıcı tablo yerine harici bir mesaj aracısı kullansaydın neyi kazanır, neyi karmaşıklaştırırdın?",
      "İki işçi aynı anda aynı işi almaya çalışırsa ne olur, kodun bunu nasıl önler?",
      "Ölü iş sayısı artarsa kim, ne zaman, neye bakarak karar verir?"
    ],
    yetkinlikler: [
      { ad: "Eşzamansız mimari tasarımı", kanit: "Adım 1 akış çizimi ve Adım 2 202 yanıtı." },
      { ad: "Kalıcı durum yönetimi", kanit: "Adım 3 çıktısı: yeniden başlatma sonrası devam eden iş." },
      { ad: "Dayanıklılık ve hata politikası", kanit: "Adım 4 deneme zaman çizelgesi ve ölü iş." },
      { ad: "Idempotency ve tutarlılık", kanit: "Adım 5 çıktısı: 5 aynı istek, 1 iş kaydı." },
      { ad: "Eşzamanlı işçi güvenliği", kanit: "Adım 7 sayaç tablosu: iki işçide her iş 1 kez işlendi." },
      { ad: "Zarif kapanış", kanit: "Adım 6'daki kapanış testi: İşleniyor işi kalmaz." }
    ],
    telafi: "K1 başarısızsa → adım 2'ye dön, uç noktayı işi kuyruğa yazıp hemen 202 ve iş Id'si dönecek biçimde yeniden kur. K2 başarısızsa → adım 3'e dön, durum geçişlerini ve açılışta 'İşleniyor' kalan işleri kurtarma mantığını yeniden yaz. K3 başarısızsa → adım 4'e dön, deneme sayacı ve SonrakiDeneme hesabını düzelt. K4 başarısızsa → adım 5'e dön, anahtar saklama ve benzersizlik kısıtını yeniden kur. K5 başarısızsa → adım 3'e dön, Beklemede iş sayısı sınırını ve 503 yolunu yeniden kur (Channel yalnız sinyal olsun). K7 başarısızsa → adım 6'ya dön, kapanışta İşleniyor işleri Başarılı veya Beklemede yapacak mantığı yaz. K6 başarısızsa → adım 6'ya dön, eksik testleri yaz ve işletim notuna iki izleme ölçüsünü ekle. K8 başarısızsa → adım 7'ye dön, işi alma güncellemesini koşullu ve atomik yap.",
    sonraki: "K1-K8'in tamamı tutar ve savunma sorularını gerekçeli yanıtlarsan bk3d Gözlemlenebilirlik kilidi açılır (kuyruğu izlenebilir kılmak için); bk4 bulut kapstonu için kuyruk tasarımını girdi olarak kullanabilirsin; tamamlama bir kanıt kaydı üretir."
  });

  K.yeni.push({
    yol: "bk", id: "bk3d", lv: 3,
    title: "Gözlemlenebilirlik: Log, Metrik ve Sağlık Kontrolü",
    weeks: 3,
    tools: ".NET SDK, ASP.NET Core, ILogger, Serilog, System.Diagnostics.Metrics, dotnet-counters, OpenTelemetry (konsol dışa aktarıcı), SQLite (Microsoft.Data.Sqlite), Health Checks, xUnit, Git",
    why: "Üretimde bir şey bozulduğunda 'ne oldu, nerede, kim etkilendi' sorularına dakikalar içinde cevap verebilmek gerekir. Sipariş API'sine yapılandırılmış log, korelasyon kimliği, metrikler ve sağlık kontrolleri ekler, kasıtlı arızalarla bunları kendi ortamında doğrularsın.",
    outcome: ["Yapılandırılmış ve korelasyonlu log üretirsin", "İş ve teknik metrikleri tanımlayıp gösterirsin", "Canlılık ve hazır olma sağlık kontrolleriyle arızayı teşhis edersin"],
    pitch: "I instrumented an ASP.NET Core order API with structured logs, correlation IDs, custom metrics and health checks, then diagnosed injected failures from the telemetry alone.",
    steps: [
      ["Gözlemlenebilirlik soruları", "Arabanın gösterge paneli, motoru açmadan durumu söyler: yakıt (metrik), uyarı lambası (sağlık), kara kutu (log). Sistemi önce 'hangi soruya cevap vermeliyim' diye tasarlarsın, sonra neyi ölçeceğini seçersin.", "Sipariş API'si için 'sipariş neden başarısız oldu, ne kadar yavaşladı, bağımlılık ayakta mı' gibi 8 teşhis sorusu yaz. Her soruyu log, metrik veya sağlık kontrolü ile eşle.", "8 soruluk teşhis tablosu", "observability = gözlemlenebilirlik, logs/metrics/traces = log/metrik/iz, signal = sinyal, diagnosis = teşhis", "observability logs metrics traces difference three pillars"],
      ["Yapılandırılmış log ve korelasyon kimliği", "Düz metin log, el yazısı defterdir; yapılandırılmış log ise alanları aranabilen tablodur. Korelasyon kimliği, bir isteğin tüm log satırlarını birbirine bağlayan bilet numarasıdır.", "Serilog veya ILogger ile alanlı log yaz (SiparisId, Tutar, SureMs). Ara katman (middleware) ile her isteğe korelasyon kimliği ata, yanıt başlığında döndür ve her log satırına ekle. Kişisel veriyi (e-posta, kart) loga yazmama kuralı koy.", "Aynı kimlikle bağlanan 5+ log satırı", "structured logging = yapılandırılmış log, correlation ID = korelasyon kimliği, middleware = ara katman, log level = log seviyesi", "structured logging serilog correlation id middleware asp.net core"],
      ["Log seviyesi ve gürültü yönetimi", "Her şeyi ERROR yazarsan gerçek hata kaybolur; ses kısma da önemli bir tasarım kararıdır. Seviyeler bir yangın alarmının kademeleridir.", "Seviye kuralı yaz: beklenen iş hatası (stok yok) Warning, beklenmeyen istisna Error, ayrıntı Debug. Üretim ve geliştirme için ayrı yapılandırma yap. Bir isteğin kaç log satırı ürettiğini say ve gereksizleri kıs.", "Seviye kuralı tablosu ve önce/sonra satır sayısı", "log level = log seviyesi, noise = gürültü, sampling = örnekleme, retention = saklama süresi", "logging levels best practices warning error noise"],
      ["Metrikler: sayaç, ölçer, histogram", "Log tek tek olayları, metrik ise toplamları anlatır: dakikada kaç sipariş, ortalama süre. Sayaç yalnız artar, ölçer iner çıkar, histogram dağılımı gösterir; ortalama yanıltabilir, yüzdelik dilim (p95) daha dürüsttür.", "System.Diagnostics.Metrics ile 3 ölçü tanımla: oluşturulan_siparis (sayaç), basarisiz_siparis (sayaç, neden etiketli), siparis_suresi_ms (histogram). System.Diagnostics.Metrics kendi başına bir /metrics uç noktası sunmaz; ölçüleri dotnet-counters ile canlı izle ya da OpenTelemetry metrik dışa aktarıcısıyla (konsol dışa aktarıcı yeter) dışarı ver. Araç ve paket adlarını ve komut sözdizimini kendi sürümünde doğrula (burada doğrulanmadı). Etiketlerde yüksek çeşitlilikten (kullanıcı Id gibi) kaçın.", "Üç ölçünün dotnet-counters veya dışa aktarıcı çıktısı", "counter = sayaç, gauge = ölçer, histogram = histogram, cardinality = etiket çeşitliliği, exporter = dışa aktarıcı, dotnet-counters = canlı sayaç izleme aracı", "system.diagnostics.metrics counter histogram asp.net core cardinality dotnet-counters opentelemetry exporter"],
      ["Sağlık kontrolleri: canlılık ve hazır olma", "Canlılık (liveness) 'süreç yaşıyor mu', hazır olma (readiness) 'iş alabilir mi' sorusudur; veritabanı düşünce süreç yaşar ama hazır değildir. Orkestratör bu ayrıma göre yeniden başlatır veya trafiği keser.", "/health/live (bağımlılıksız) ve /health/ready (veritabanı ve kuyruk gibi bağımlılıkları denetleyen) uç noktalarını ekle. Sipariş verisini bir SQLite dosyasında (Microsoft.Data.Sqlite) tut; ready kontrolü bu dosyaya bağlantı açmayı dener. Veritabanı dosyasını kendi ortamında geçici olarak erişilmez yap ve ready'nin 503, live'ın 200 döndüğünü göster.", "Veritabanı arızasında live=200, ready=503", "liveness = canlılık, readiness = hazır olma, health check = sağlık kontrolü, dependency = bağımlılık", "asp.net core health checks liveness readiness"],
      ["Arıza enjekte et ve yalnız telemetriyle teşhis et", "Gözlemlenebilirliğin sınavı, arızayı kodu okumadan bulabilmektir. Bir arkadaşın (veya sen, farklı bir zamanda) bozunca yalnız log ve metrikle sebebi bulabiliyorsan sistem izlenebilirdir.", "3 arıza oluştur: yavaş bağımlılık, rastgele istisna, bozuk giriş. Her arıza için hangi log/metrik/sağlık sinyalinin değiştiğini ve nasıl ayırt ettiğini yaz. 6 test ekle (korelasyon başlığı, metrik artışı, ready 503, log alanı, kişisel veri sızmaması, seviye). Kısa bir 'olay inceleme' notu yaz.", "3 arıza için teşhis notu ve 6 geçen test", "incident = olay, root cause = kök neden, runbook = işletim notu, fault injection = arıza enjeksiyonu", "fault injection incident diagnosis logs metrics root cause"],
      ["Dağıtık iz ve basit panel (isteğe bağlı)", "Log ve metrik 'ne oldu' ve 'ne kadar' der; iz ise tek bir isteğin parçalarını (API, veritabanı) aynı bilet altında zaman çizelgesine dizer. Yavaşlığın hangi parçada olduğunu iz gösterir.", "ActivitySource ile sipariş isteğine bir kök span ve veritabanı çağrısına bir alt span ekle; OpenTelemetry konsol dışa aktarıcısıyla çıktıyı gör. İstersen metrikleri (dotnet-counters veya dışa aktarıcı çıktısı) bir tabloya ya da basit bir HTML sayfasına dök. Paket ve sınıf adlarını kendi sürümünde doğrula (burada doğrulanmadı).", "Aynı TraceId'li kök ve alt span çıktısı", "trace = iz, span = iz parçası, TraceId = iz kimliği, ActivitySource = iz kaynağı", "opentelemetry dotnet activitysource console exporter trace span asp.net core"]
    ],
    onkosul: ["Önkoşul: bk2 REST API: ASP.NET Core ve EF Core (middleware, DI, uç noktalar).", "bk3b Önbellek ve Hız Sınırlama veya bk3c Arka Plan İşi ve Kuyruk projelerinden biri; izlenecek gerçek bir sistem olması için.", "HTTP durum kodları ve temel yapılandırma (appsettings) bilgisi."],
    gereksinim: [
      "İşlevsel (zorunlu): Her istek bir korelasyon kimliği taşır; kimlik yanıt başlığında döner ve tüm log satırlarında bulunur.",
      "İşlevsel (zorunlu): Loglar yapılandırılmış alanlar içerir (SiparisId, SureMs) ve kişisel veri içermez.",
      "İşlevsel (zorunlu): Log seviye kuralı uygulanır ve gürültü kısıldıktan sonra bir isteğin log satır sayısı önce/sonra ölçülür.",
      "İşlevsel (zorunlu): En az 3 metrik tanımlıdır: iki sayaç ve bir histogram.",
      "İşlevsel (zorunlu): /health/live ve /health/ready ayrı davranır; ready bağımlılıkları denetler.",
      "İşlevsel (isteğe bağlı): Dağıtık iz (trace) veya basit bir panel eklenir.",
      "İşlevsel olmayan: Telemetri, istek gecikmesini gözle görülür artırmaz ve etiket çeşitliliği sınırlıdır."
    ],
    kabul: [
      "K1: Bir isteğin yanıt başlığındaki korelasyon kimliği o isteğin tüm log satırlarında geçer | Test: kimliği loglarda ara, satırları say ve kanıt notuna yapıştır.",
      "K2: Loglarda e-posta veya kart alanı bulunmaz | Test: bir örnek sipariş gönder, log çıktısında bu alanları ara, sonuç boş olmalı.",
      "K3: Başarısız sipariş neden etiketiyle sayaçta artar | Test: stok yok ve doğrulama hatası üret, iki etiket değerinin dotnet-counters veya dışa aktarıcı çıktısında ayrı arttığını gör.",
      "K4: Veritabanı erişilemezken live 200, ready 503 döner; geri gelince ready 200 olur | Test: kendi ortamında dosyayı geçici taşı, iki uç noktayı çağır.",
      "K5: Üç enjekte arıza için teşhis notu yalnız telemetriden yazılmıştır ve kök neden doğrudur | Test: arızayı sen ya da bir arkadaşın kodu göstermeden kurar, notun doğru nedeni bulduğunu karşılaştır.",
      "K6: En az 6 test geçer | Test: dotnet test çıktısını kaydet.",
      "K7: Seviye kuralı uygulandıktan sonra aynı isteğin log satırı sayısı azalmıştır; beklenen iş hatası (stok yok) Warning, beklenmeyen istisna Error olarak görünür | Test: aynı isteği önce/sonra gönder, satır sayılarını kanıt notuna yaz; stok yok ve istisna durumlarının seviyelerini log çıktısında oku.",
      "K8: (İsteğe bağlı) Bir sipariş isteğinin iz çıktısında kök span ile en az bir alt span (veritabanı çağrısı) aynı TraceId ile görünür | Test: OpenTelemetry konsol dışa aktarıcı çıktısında TraceId'yi ara, span sayısını ve ortak TraceId'yi kanıt notuna yaz."
    ],
    rubrik: [
      { olcut: "Teşhis soruları ve sinyal eşleme", guclu: "Her soru doğru sinyale (log/metrik/sağlık) eşlenmiş ve gerekçeli.", zayif: "Her şey log, sinyal seçimi gerekçesiz." },
      { olcut: "Log kalitesi", guclu: "Yapılandırılmış, korelasyonlu, doğru seviyeli, kişisel veri içermeyen.", zayif: "Düz metin, bağlamsız, hassas veri sızıyor." },
      { olcut: "Metrik tasarımı", guclu: "Doğru tür (sayaç/histogram), sınırlı etiketler, adlandırma tutarlı.", zayif: "Yalnız sayaç, kontrolsüz etiket çeşitliliği." },
      { olcut: "Sağlık kontrolü doğruluğu", guclu: "Live ve ready ayrımı arızada kanıtlı, davranış testli.", zayif: "Tek /health ve her zaman 200." },
      { olcut: "Teşhis yetkinliği", guclu: "Arıza yalnız telemetriyle doğru nedene bağlanmış, nota yazılmış.", zayif: "Teşhis kodu okuyarak yapılmış veya yanlış." }
    ],
    savunma: [
      "Neden hem log hem metrik tutuyorsun, birini seçmek zorunda kalsan ne kaybederdin?",
      "Metrik etiketine kullanıcı Id'si koysan ne olurdu ve neden zararlı?",
      "Live ve ready ayrımı olmasaydı bir orkestratör yanlış hangi kararı verirdi?",
      "Loglarda hangi veriyi bilerek yazmadın ve bir denetçiye bunu nasıl gösterirsin?"
    ],
    yetkinlikler: [
      { ad: "Gözlemlenebilirlik tasarımı", kanit: "Adım 1 teşhis tablosu ve Adım 3 seviye kuralı tablosu ile önce/sonra satır sayısı." },
      { ad: "Yapılandırılmış loglama", kanit: "Adım 2 çıktısı: aynı kimlikle bağlanan log satırları." },
      { ad: "Metrik tasarımı", kanit: "Adım 4 çıktısı: üç ölçünün dotnet-counters veya dışa aktarıcı çıktısı." },
      { ad: "Sağlık kontrolü ve olay teşhisi", kanit: "Adım 5 live/ready sonucu ve Adım 6 teşhis notları." },
      { ad: "Dağıtık iz (isteğe bağlı)", kanit: "Adım 7 çıktısı: aynı TraceId taşıyan kök ve alt span çıktısı." }
    ],
    telafi: "K1 veya K2 başarısızsa → adım 2'ye dön, ara katman ve log alanlarını yeniden kur, kişisel veri alanlarını çıkar. K3 başarısızsa → adım 4'e dön, sayaç ve etiket tanımlarını yeniden yaz; çıktı görünmüyorsa dotnet-counters veya dışa aktarıcı kurulumunu kontrol et. K4 başarısızsa → adım 5'e dön, live ve ready kontrollerini ayır. K5 başarısızsa → adım 6'ya dön, hangi sinyalin hangi arızayı ayırt ettiğini tabloya yeniden yaz; yetmezse adım 1'deki teşhis sorularını gözden geçir. K6 başarısızsa → adım 6'ya dön, eksik testleri (korelasyon başlığı, metrik artışı, ready 503, log alanı, kişisel veri sızmaması, seviye) tamamla. K7 başarısızsa → adım 3'e dön, seviye kuralını ve önce/sonra satır sayısını yeniden çıkar. K8 (isteğe bağlı) başarısızsa → adım 7'ye dön, ActivitySource ve dışa aktarıcı kurulumunu kontrol et.",
    sonraki: "K1-K7'nin tamamı tutar (adım 7'yi yaptıysan K8 de) ve savunma sorularını gerekçeli yanıtlarsan bk4 bulut kapstonu için izleme gereksinimini karşılamış olursun. lv3 kümesindeki bk3b, bk3c ve bk3d içinden kaç projenin tamamlanması gerektiği bu proje metninde tanımlı değildir; geçerli kuralı yol sayfasından kendin doğrula. Tamamlama bir kanıt kaydı üretir."
  });
})(window);

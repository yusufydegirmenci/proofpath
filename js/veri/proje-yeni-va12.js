"use strict";
/* ALAN: Atölye > Veri Analitiği, Seviye 1 (elektronik tablo) ve Seviye 2 (SQL) projeleri. NE YAPAR: PP_PROJ.va dizisine Seviye 1-2 için 8 proje iter (seviye alanı ve steps dizisi).
   SORUN OLURSA: proje-yeni-va.js'ten SONRA yüklenir (ikisi de K.va'ya ekler). atolye/va-ui.js p.seviye ile süzer; proje-birlestir.js adım dizilerini nesneye çevirir. Çözümler repoda tutulmaz (tests/va-cozumler-*.json). Yükleme sırası tests/sira.js ile denetlenir.
   YENİ ÖZELLİK: Yeni proje burada K.va.push. Test: tests/faz10_va12.js (8 proje, arayüz 390 px). */
(function (g) {
  var K = g.PP_PROJ = g.PP_PROJ || { tanim: {}, yeni: [], va: [] };
  K.va = K.va || [];

  /* Veri Analitiği Seviye 1 (va1-p1..p4) ve Seviye 2 (va2-p1..p4) projeleri. Tüm veri SENTETİKTİR.
     Seviye 1: VA.veriKirli (13 satır, 7 sütun) ve VA.veri (12 siparişlik siparis tablosu). Seviye 2: siparis + musteri, urun, hedef (VA.veriSql).
     Türkçe Excel işlev adları (ETOPLA, EĞERSAY, DÜŞEYARA vb.) ve ayırıcı (, ya da ;) yerel ayara göre değişebilir. */

  K.va.push({
    id: "va1-p1", seviye: 1,
    title: "Satış Tablosu Temizleme Günlüğü",
    weeks: 2,
    tools: "Tablo programı (Excel veya Google E-Tablolar), uygulama alanı (SQL, Python, elektronik tablo simülasyonu), not defteri",
    why: "Ham satış tablosu çoğu zaman olduğu gibi kullanılamaz: kopya satır toplamı şişirir, metin olarak yazılmış sayı toplanmaz, aynı şehir üç farklı yazılır. Hangi sorunu nasıl bulduğunu ve neyi neden değiştirdiğini kayda geçiren bir temizleme günlüğü hazırlarsın; başkası aynı adımları izleyip aynı sonuca varabilir.",
    outcome: ["13 satırlık ham tablodaki sorunları türlerine göre sınıflandırırsın", "Her değişikliği 'önce, sonra, gerekçe' biçiminde günlüğe yazarsın", "Temizlik sonrası tabloyu bağımsız kontrollerle sınarsın", "Varsayımla düzelttiğin ve düzeltemediğin hücreleri ayrı gösterirsin"],
    pitch: "I cleaned a deliberately messy 13-row sales table (duplicate row, text in a number column, mixed spellings, a missing price) and kept a change log that records every edit with its reason and the checks that confirm the result.",
    steps: [
      ["Veri sözlüğü: ham tabloyu tanı", "Temizlemeden önce tabloyu tanımalısın: 13 satır ve 7 sütun (kayit_no, tarih, sehir, urun, adet, fiyat, odeme) var. Her sütunun beklenen türü ve biçimi sözlükte yazılı değilse 'hatalı' kavramı da tanımsız kalır; adet bir tam sayı, fiyat bir sayı, tarih tek biçimde yazılmış tarih olmalıdır.", "Ham tabloyu 'ham' adlı bir sayfaya yapıştır ve dokunma. Her sütun için beklenen tür, beklenen biçim ve bilinen bir örnek değer içeren sözlük sayfası yaz. Birimi bilmediğin sütunda (fiyat TL mi, KDV dahil mi) 'bilinmiyor' yaz.", "Ham sayfa ile 7 satırlık sözlük sayfası", "data dictionary = veri sözlüğü, expected type = beklenen tür, raw data = ham veri", "data dictionary spreadsheet column type expected format"],
      ["Metodoloji ve varsayımlar: kuralları önce yaz", "Düzeltmeye başlamadan kuralları yazmak keyfi düzeltmeyi engeller. Kurallar şunlara cevap verir: ham veri silinir mi (hayır, kopyada çalışılır), kopya hangi koşulda silinir (tüm alanları aynı olan satır), boş hücre doldurulur mu (hayır, 'bilinmiyor' kalır), kısaltma ve yazım farkı nasıl birleştirilir (listede tanımlı yazım esas alınır ve her biri varsayım olarak işaretlenir).", "'Kurallar ve varsayımlar' sayfasına en az 5 kural yaz. Örnek: 'IST kısaltmasını İstanbul sayıyorum, bu bir varsayımdır', 'K07 fiyatı boş; doldurmuyorum', '21.02.2026 gün.ay.yıl okunur, 21 ay olamayacağı için belirsiz değildir'.", "En az 5 satırlık kural ve varsayım sayfası", "assumption = varsayım, cleaning rule = temizleme kuralı, audit trail = denetim izi", "data cleaning rules assumptions documentation audit trail"],
      ["Sorunları bul ve sınıfla", "Bu tabloda sorunlar beş türdedir: kopya satır (K10 iki kez), metin sayı ('2 adet' içeren K05), boş hücre (fiyatı boş K07), tarih biçimi (K08 '21.02.2026' diğerleri '2026-01-05' biçiminde) ve yazım farkı ('ankara', 'İstanbul ' sonunda boşlukla, 'IST', 'fare'). Sorunlu satır sayısı 8, sorunsuz satır sayısı 5'tir (K01, K03, K09, K10'un ilk kaydı, K11).", "Sorun listesi sayfası kur: kayit_no, sütun, sorun türü, ham değer. Önce kendi gözünle ve süzgeçle bul, sonra uygulama alanındaki SQL, Python ve elektronik tablo görevlerinden ilgili olanı çöz; çıktılarını kendi listenle karşılaştır.", "Sorun listesi (satır, sütun, tür, ham değer) ve sayım: sorunlu 8, sorunsuz 5", "duplicate row = tekrarlı satır, missing value = eksik değer, inconsistent = tutarsız, outlier = aykırı değer", "common data quality problems duplicates missing values inconsistent formats"],
      ["Temizle ve günlüğe yaz", "Temizleme kopya sayfada, kural kural yapılır; her değişiklik günlüğe 'kayit_no | sütun | önce | sonra | kural' satırı olarak girer. Beklenen sonuç: kopya silinince 12 satır, şehir değerleri İstanbul, Ankara, İzmir (3 değer), ürün değerleri Kulaklık, Klavye, Fare, Monitör (4 değer), adet sütununda tüm değerler sayı.", "'temiz' sayfasını ham sayfanın kopyasından üret. Günlük sayfasına her değişikliği yaz; K07 için 'değiştirilmedi, bilinmiyor' karar satırı da günlüğe girer (bu satır dahil en az 8 satır). K07 fiyatını boş bırak ve 'bilinmiyor' olarak işaretle; K05 adet değerini 2 yap ve 'metinden sayı çıkarıldı, varsayım' diye not et.", "Temiz sayfa (12 satır) ve K07 karar satırı dahil en az 8 satırlık değişiklik günlüğü", "change log = değişiklik günlüğü, normalize = tek biçime getir, trim = baştaki ve sondaki boşlukları sil, dedupe = tekrarları sil", "spreadsheet trim proper remove duplicates find replace"],
      ["Test: temizlik sonrası kontrol sorguları", "Temizlik 'yaptım' demekle bitmez; bağımsız kontrol gerekir. Kontroller: kayit_no benzersiz mi (12 farklı değer), şehir ve ürün sütunlarında benzersiz değer sayısı beklenen mi (3 ve 4), adet sütunu tamamen sayı mı. Ayrıca kopya silinmeden önce ve sonra toplam tutarı karşılaştır: fiyatı bilinen satırlarda adet çarpı fiyat toplamı kopya silindikten sonra 16650, silinmeden 20850 olmalıdır (K07 fiyat bilinmediği için ikisinde de dışarıda).", "Temiz sayfaya her kontrol için bir formül (örn. benzersiz değer sayma, sayı mı denetimi, toplam) yaz ve sonucu beklenenle yan yana göster. Uygulama alanındaki sorguyu ya da tablo görevini çalıştırıp kendi sonucunla karşılaştır.", "Kontrol sayfası: her kontrolün beklenen ve bulunan değeri, ve 16650 ile 20850 karşılaştırması", "validation check = doğrulama kontrolü, reconciliation = mutabakat, count distinct = benzersiz say", "spreadsheet count unique values sumproduct check data quality"],
      ["Sınırlamalar: neyi düzeltemedin", "Dürüst bir günlük düzeltemediğini de yazar. K07 fiyatı kaynağa sorulmadan bilinemez; aynı ürünün diğer satırındaki 250 değerini yazarsan toplam 17150 olur ama bu bir tahmindir. 13 satırlık bir tabloda bulduğun kurallar gerçek, büyük ve her gün değişen bir tabloda aynı biçimde çalışmaz.", "'Sınırlamalar' bölümüne en az 4 madde yaz: doldurulmayan hücreler, varsayımla düzeltilen hücreler (IST, '2 adet'), yalnız 13 satırlık örnekte denenmiş olması, kaynağa sorulması gereken sorular.", "Sınırlamalar listesi: 'düzeltilemedi' ve 'varsayımla düzeltildi' ayrı işaretli", "limitation = sınırlama, imputation = eksik değer doldurma, source system = kaynak sistem", "data cleaning limitations imputation risks documentation"],
      ["README taslağı ve kapanış", "README başkasının bu çalışmayı 5 dakikada anlamasını sağlar: tablonun ne olduğu, kaç sorun bulundu, hangi kurallar uygulandı, neler doğrulandı, neler doğrulanmadı. Sayılar günlükteki sayılarla tutmalıdır; tutmayan sayı güveni bozar.", "README taslağını yaz: amaç, veri (13 satır, 7 sütun, sentetik), sorun özeti (8 sorunlu satır), kurallar, sonuç (12 satır), kontroller ve sınırlamalar. Her sayıyı günlük ya da kontrol sayfasından doğrula.", "README taslağı ve sayıların doğrulandığını gösteren işaret", "README = projeyi anlatan giriş dosyası, reproducible = yeniden üretilebilir, handoff = devir", "how to write a data project readme reproducible"]
    ],
    alan: ["va1-2-py", "va1-2-sql", "va1-2-sim"],
    alanNotu: "Uygulama alanları (va1-2-py, va1-2-sql, va1-2-sim) yalnız o alanın görev metninde istenen tek temizleme işlemini (ör. bir sorunu bulma ya da düzeltme) veriden hesaplanan beklenen değerle sınar; elektronik tablo alanı gerçek Excel değil kural tabanlı simülasyondur. Sorun sınıflaması, kural ve varsayım yazımı, tam temizleme, değişiklik günlüğü, README, K07 gibi boş hücrelerin ele alınışı ve gerçek tablo programındaki davranış (kopya silme, yerel ayara göre işlev adları) bu alanlarla kanıtlanmaz ve doğrulanmamıştır.",
    onkosul: ["Veri Analitiği Seviye 1, 2. ders (sıralama, filtre, tekrar, eksik değer, doğrulama) ile birlikte ya da sonrasında yapılması önerilir.", "Bir tablo programında süzgeç, bul-değiştir ve temel formül kullanabilmek."],
    gereksinim: [
      "İşlevsel (zorunlu): Ham tablo değiştirilmeden ayrı bir sayfada saklanır, temizlik kopyada yapılır.",
      "İşlevsel (zorunlu): Kurallar ve varsayımlar sayfasında en az 5 kural yazılıdır.",
      "İşlevsel (zorunlu): Sorun listesi satır, sütun, sorun türü ve ham değeri içerir ve 8 sorunlu satırı gösterir.",
      "İşlevsel (zorunlu): Temiz sayfa 12 satırdır; her değişiklik günlükte 'önce, sonra, kural' ile yazılıdır.",
      "İşlevsel (zorunlu): En az 3 bağımsız kontrol (benzersiz kayit_no, şehir ve ürün değer sayısı, adet türü) ve toplam tutar karşılaştırması vardır.",
      "İşlevsel olmayan: Doldurulmayan ve varsayımla düzeltilen hücreler açıkça ayrı işaretlidir.",
      "İşlevsel olmayan: README'deki her sayı günlük ya da kontrol sayfasındaki sayıyla tutar."
    ],
    kabul: [
      "K1: Ham sayfa değişmeden durur ve temiz sayfa kopyadan üretilmiştir | Test: Ham sayfada 13 satır ve K10'un iki kaydı hâlâ görünür.",
      "K2: Kurallar sayfasında en az 5 kural vardır ve her varsayım 'varsayım' diye işaretlidir | Test: IST ve '2 adet' için varsayım notunu ara.",
      "K3: Sorun listesi 8 sorunlu satırı ve 5 sorunsuz satırı gösterir | Test: Sorunlu satır listesinde 8 satır say; kopya olan K10 ikinci kaydının ayrı sayıldığını kontrol et.",
      "K4: Temiz sayfa 12 satırdır ve şehir sütununda 3, ürün sütununda 4 benzersiz değer vardır | Test: Benzersiz değer sayan formülü çalıştır.",
      "K5: Adet sütununun tüm hücreleri sayıdır | Test: Sayı mı denetimini tüm adet hücrelerine uygula; hiçbiri yanlış çıkmamalı.",
      "K6: Kopya silinmeden toplam tutar 20850, silindikten sonra 16650'dir (K07 hariç) | Test: Adet çarpı fiyat toplamını iki sayfada hesapla ve farkın 4200 (K10) olduğunu göster.",
      "K7: K07 fiyatı boş bırakılmış ve sınırlamalarda 'düzeltilemedi' olarak yazılmıştır; README sayıları günlükle tutar | Test: Temiz sayfada K07 fiyat hücresini ve README'deki 8 ve 12 sayılarını kontrol et."
    ],
    rubrik: [
      { olcut: "Sorun sınıflama", guclu: "Beş sorun türü (kopya, metin sayı, boş, tarih biçimi, yazım farkı) satır satır ve eksiksiz listelenmiş.", zayif: "Yalnız bir iki sorun fark edilmiş; kopya satır gözden kaçmış." },
      { olcut: "Kural ve varsayım netliği", guclu: "Her düzeltme önceden yazılmış bir kurala bağlı; varsayımlar açıkça işaretli.", zayif: "Düzeltmeler gerekçesiz yapılmış; IST gibi tahminler kesinmiş gibi sunulmuş." },
      { olcut: "Günlük kalitesi", guclu: "Önce, sonra ve kural sütunlarıyla başkası aynı adımları izleyebilir.", zayif: "Günlük yok ya da yalnız 'temizlendi' yazıyor." },
      { olcut: "Bağımsız kontrol", guclu: "Beklenen sayılar (12, 3, 4, 16650, 20850) önceden yazılmış ve bulunanla karşılaştırılmış.", zayif: "Kontrol temizlik formülünün aynısıyla yapılmış; bağımsız değil." },
      { olcut: "Sınırlamalarda dürüstlük", guclu: "Doldurulmayan hücre ve yalnız 13 satırda denenmiş olması açıkça yazılmış.", zayif: "Boş fiyat tahminle doldurulmuş ve sorun yokmuş gibi gösterilmiş." }
    ],
    savunma: [
      "K10'un ikinci kaydını silmek ile ikisini de tutmak toplamı nasıl değiştirir ve silmeden önce hangi kontrolü yaptın?",
      "K07'nin boş fiyatını aynı ürünün diğer satırlarından doldurmadın; doldursaydın hangi risk doğardı?",
      "'IST' değerini İstanbul sayman neden bir varsayımdır ve yanlışsa sonuçlar nasıl bozulur?",
      "Temizliği yapan formülle kontrolü yapan formül neden farklı olmalı?"
    ],
    yetkinlikler: [
      { ad: "Veri sorunu tespiti", kanit: "Adım 3'teki sorun listesi: 8 sorunlu, 5 sorunsuz satır." },
      { ad: "Kural tabanlı temizleme", kanit: "Adım 2'deki kurallar ve adım 4'teki değişiklik günlüğü." },
      { ad: "Bağımsız doğrulama", kanit: "Adım 5'teki kontrol sayfası ve 16650 / 20850 karşılaştırması." },
      { ad: "Belirsizliği belgeleme", kanit: "Adım 6'daki 'düzeltilemedi' ve 'varsayımla düzeltildi' işaretleri." },
      { ad: "Teknik anlatım", kanit: "Adım 7'deki README taslağı." }
    ],
    telafi: "K1 tutmazsa ham sayfayı yeniden yapıştır ve temizlik sayfasını ondan kopyala; K2 tutmazsa adım 2'ye dön, her düzeltme için bir kural ve varsayım notu ekle; K3 tutmazsa adım 3'te tabloyu sütun sütun süzerek 8 sorunlu satırı yeniden bul; K4 tutmazsa adım 4'te şehir ve ürün yazımlarını tek tek eşle; K5 tutmazsa 'adet' sütunundaki metin hücresini bul ve düzelt; K6 tutmazsa kopya satırı silip adet çarpı fiyat toplamını yeniden hesapla; K7 tutmazsa adım 6 ve 7'ye dön, K07'yi boş bırak ve README sayılarını günlükten yeniden yaz.",
    sonraki: "Önerilen sonraki proje: Formüllü KPI Sayfası (va1-p2). Bu proje temizlenmiş bir tablo üretir; formüllerle özet sayılar çıkarmak doğal devamıdır. Kilit zorlanmaz, sıra bir öneridir."
  });

  K.va.push({
    id: "va1-p2", seviye: 1,
    title: "Formüllü KPI Sayfası: ETOPLA, EĞERSAY, DÜŞEYARA",
    weeks: 2,
    tools: "Tablo programı (Excel veya Google E-Tablolar), uygulama alanı (elektronik tablo simülasyonu, Python), not defteri",
    why: "Bir yöneticinin 'toplam ciro, ödeme türü dağılımı, iade oranı' sorusu bir sayfada, el ile değil formülle cevaplanmalı ki veri değişince sonuç da değişsin. Çalışan sayıları kontrol ederek doğrulanmış bir KPI sayfası hazırlarsın.",
    outcome: ["Koşullu toplama ve sayma formüllerini gerçek bir soruya uygularsın", "DÜŞEYARA ile ürün kategorisi eşlemesi kurarsın", "Her KPI'yı ikinci bir yolla çapraz doğrularsın", "Boş hücrenin formülde sessizce 0 sayıldığını fark edip belgelersin"],
    pitch: "I built a formula-driven KPI sheet for a 12-order sales table using conditional sum, count and lookup formulas, and cross-checked every KPI with a second method.",
    steps: [
      ["Veri sözlüğü: sipariş tablosunu belgele", "KPI formülleri sütun anlamlarına dayanır: adet kaç parça, birim_fiyat tek parçanın fiyatı, indirim_orani 0 ile 1 arasında bir oran, iade 'evet' ya da 'hayır'. S007 siparişinin indirim_orani hücresi boştur; tablo programları boş hücreyi çarpmada 0 gibi işler, bu da indirimi yokmuş gibi gösterir.", "12 sipariş ve 10 sütunu bir 'veri' sayfasına yapıştır. 10 satırlık veri sözlüğü yaz; indirim_orani için 'S007 boş, formülde 0 gibi işlenir, bu bir varsayımdır' notunu ekle.", "'veri' sayfası ve 10 satırlık sözlük", "data dictionary = veri sözlüğü, blank cell = boş hücre, KPI = temel performans göstergesi", "excel blank cell treated as zero in calculations"],
      ["Metodoloji ve varsayımlar: KPI tanımları", "KPI'yı formülden önce tanımlamak gerekir. Brüt tutar = adet çarpı birim_fiyat (indirimsiz). Net tutar = brüt çarpı (1 eksi indirim_orani). İade oranı = iade 'evet' olan sipariş sayısı bölü toplam sipariş sayısı. Her tanım yazılmazsa iki kişi aynı KPI için farklı sayı bulur.", "'KPI tanımları' sayfasına 6 KPI yaz: sipariş sayısı, brüt ciro, net ciro, ödeme türüne göre sipariş sayısı, iade oranı, kategoriye göre brüt ciro. Her birinin payını, paydasını ve varsayımını ekle.", "6 KPI tanımı ve varsayım notları", "metric definition = metrik tanımı, numerator = pay, denominator = payda, gross = brüt, net = net", "kpi definition numerator denominator spreadsheet"],
      ["Yardımcı sütunlar ve koşullu toplama (ETOPLA)", "Brüt tutar sütununu her satırda adet çarpı birim_fiyat ile üretirsin; sonra koşullu toplam ürün adına göre alınır. Beklenen brüt toplam 17150'dir; ürün kırılımı Kulaklık 4050, Klavye 3200, Fare 1500, Monitör 8400 olmalıdır. Net ciro toplamı (boş indirim 0 sayılırsa) 16007,5 çıkar. Türkçe sürümde işlevlerin adı ETOPLA, İngilizcede SUMIF; ayırıcı yerel ayara göre ',' ya da ';' olabilir.", "Brüt tutar ve net tutar sütunlarını ekle. Ürün başına ETOPLA ile brüt ciroyu hesapla ve toplamı 17150 ile karşılaştır. Uygulama alanındaki elektronik tablo görevini çözerek yazdığın formülün kural tabanlı denetimden geçip geçmediğine bak.", "Brüt toplam 17150 ve ürün kırılımı (4050, 3200, 1500, 8400)", "SUMIF = koşullu topla, helper column = yardımcı sütun, conditional sum = koşullu toplam", "excel sumif function by product example"],
      ["Sayma ve oran (EĞERSAY) ve DÜŞEYARA", "EĞERSAY (COUNTIF) koşula uyan hücreleri sayar: ödeme türü kart 7, nakit 3, havale 2 sipariş (toplam 12); iade 'evet' olan 2 sipariş, yani iade oranı 2/12 ≈ yüzde 16,7. DÜŞEYARA (VLOOKUP) bir ürün adından kategori getirir; kategori tablosunu kendin kurarsın: Kulaklık ses, Klavye ve Fare çevre birimi, Monitör görüntü. Kategori brüt cirosu ses 4050, çevre birimi 4700, görüntü 8400 (toplam 17150).", "ÖdemeTürü ve iade için EĞERSAY formüllerini yaz, iade oranını yüzde olarak göster. 'kategori' sayfasını kur, siparişlere DÜŞEYARA ile kategori ekle ve kategori başına ETOPLA ile brüt ciroyu hesapla. DÜŞEYARA'da tam eşleşme argümanını açıkça seç.", "Ödeme dağılımı (7, 3, 2), iade oranı yaklaşık yüzde 16,7 ve kategori toplamları (4050, 4700, 8400)", "COUNTIF = koşullu say, VLOOKUP = düşey ara, exact match = tam eşleşme", "excel vlookup exact match countif percentage"],
      ["Test: KPI çapraz doğrulama", "Her KPI'yı ikinci bir yolla doğrula: ürün toplamlarının toplamı brüt toplamla (17150) eşit mi, kategori toplamlarının toplamı da 17150 mi, ödeme türü sayılarının toplamı 12 mi. Bir yolla bulduğun sayıya yalnız o yolla güvenme.", "Test sayfasına 4 çapraz kontrol yaz ve her birinin 'tuttu / tutmadı' sonucunu göster. Bir ürün adını bilerek yanlış yazıp (örn. 'fare') hangi kontrolün tuttuğunu ya da tutmadığını gözle; sonucu not et ve düzelt.", "4 çapraz kontrol; hepsi tuttu", "cross-check = çapraz kontrol, tie-out = toplamları eşleştirme, sanity check = akıl yürütme kontrolü", "spreadsheet reconciliation check totals tie out"],
      ["Sınırlamalar: KPI sayfası neyi göstermez", "12 sipariş küçük bir örnektir; iade oranı 2/12 ve tek bir sipariş değişse yüzde 8,3 oynar. Net ciroda boş indirim 0 sayıldığı için S007'nin net tutarı belirsizdir. Brüt ve net cirodan iadeler düşülmemiştir. DÜŞEYARA tam eşleşmede yazım farkını (Fare ve fare) aynı sayabilir ya da yerel ayara göre farklı davranabilir; bunu kendi programında dene, bu belgede doğrulanmamıştır.", "Sınırlamalar bölümüne en az 4 madde yaz: küçük örnek, S007 boş indirim, iade düşülmemesi, program ve yerel ayara bağlı davranışlar (doğrulanmamış).", "Sınırlamalar listesi", "limitation = sınırlama, small sample = küçük örneklem, assumption = varsayım", "kpi dashboard limitations small sample assumptions"],
      ["README taslağı ve kapanış", "README bir yöneticinin KPI sayfasını nasıl okuyacağını söyler: hangi sayfa ne içerir, KPI'lar nasıl tanımlı, hangi kontroller çalıştı. Sayılar sayfadaki sayılarla birebir tutmalıdır.", "README taslağını yaz: amaç, veri (12 sipariş, sentetik), KPI listesi ve değerleri (17150, 7/3/2, yaklaşık yüzde 16,7), kontroller, sınırlamalar ve formül işlev adlarının yerel ayara göre değişebileceği notu.", "README taslağı", "README = giriş belgesi, KPI sheet = KPI sayfası, documentation = belgeleme", "spreadsheet model documentation readme kpi"]
    ],
    alan: ["va1-1-sim", "va1-1-py"],
    alanNotu: "va1-1-sim kural tabanlı bir elektronik tablo simülasyonudur (gerçek Excel değil): yazdığın formülün ilgili işlevi, aralığı ve sonucu veriden hesaplanan değere eşit mi diye denetler. va1-1-py ilgili Python görevinin sonucunu veriden hesaplayarak sınar. Yalnız o alanların görevlerinde istenen tek hesap kanıtlanır; KPI tanımları, DÜŞEYARA kategori eşlemesi, çapraz kontrol sayfası, README ve gerçek tablo programındaki davranış (yerel ayar, işlev adı, boş hücre işleme) doğrulanmamıştır.",
    onkosul: ["Veri Analitiği Seviye 1, 1. ders (hücre, formül, koşullu fonksiyonlar, aramalar) ile birlikte ya da sonrasında yapılması önerilir.", "Veri Analitiği Seviye 0 sonunda 12 siparişlik tabloyu tanımış olmak yardımcı olur."],
    gereksinim: [
      "İşlevsel (zorunlu): Veri sayfasında 12 sipariş, brüt tutar ve net tutar sütunlarıyla bulunur.",
      "İşlevsel (zorunlu): En az 6 KPI sayfada yazılı tanımıyla ve formülle hesaplanır.",
      "İşlevsel (zorunlu): Koşullu toplama (ETOPLA) ile ürün ve kategori bazında brüt ciro verilir.",
      "İşlevsel (zorunlu): Koşullu sayma (EĞERSAY) ile ödeme türü dağılımı ve iade oranı hesaplanır.",
      "İşlevsel (zorunlu): DÜŞEYARA ile ürün adından kategori getirilir ve tam eşleşme kullanılır.",
      "İşlevsel olmayan: Her KPI için bir çapraz kontrol vardır; sonuçları test sayfasında görünür.",
      "İşlevsel olmayan: Sabit yazılmış sayı yoktur; her değer formülden gelir."
    ],
    kabul: [
      "K1: 12 sipariş yapıştırılmış ve S007'nin boş indirim hücresi sözlükte varsayım olarak işaretlidir | Test: Satır sayısını say; S007 notunu ara.",
      "K2: Brüt ciro toplamı 17150'dir | Test: Brüt tutar sütununun toplamını ve ürün kırılımının toplamını karşılaştır.",
      "K3: Ürün kırılımı Kulaklık 4050, Klavye 3200, Fare 1500, Monitör 8400'dür | Test: ETOPLA sonuçlarını bu değerlerle karşılaştır.",
      "K4: Ödeme türü dağılımı kart 7, nakit 3, havale 2'dir ve toplamı 12'dir | Test: EĞERSAY sonuçlarını topla.",
      "K5: İade oranı 2/12, yani yaklaşık yüzde 16,7 gösterilir | Test: İade 'evet' sayısını ve toplam sipariş sayısını ayrı hücrelerde göster.",
      "K6: DÜŞEYARA ile kategori toplamları ses 4050, çevre birimi 4700, görüntü 8400'dür | Test: Üç toplamı ve toplamının 17150 olduğunu doğrula.",
      "K7: README sayıları sayfadaki değerlerle tutar ve sınırlamalarda yerel ayar uyarısı bulunur | Test: README'deki her sayıyı sayfadan elle kontrol et."
    ],
    rubrik: [
      { olcut: "KPI tanımı", guclu: "Her KPI pay, payda ve varsayımıyla yazılı; brüt ve net ayrımı açık.", zayif: "KPI adı var ama nasıl hesaplandığı yazılı değil." },
      { olcut: "Formül doğruluğu", guclu: "ETOPLA, EĞERSAY ve DÜŞEYARA beklenen sayıları verir; aralıklar sabitlenmiş.", zayif: "Sayılar elle yazılmış ya da aralık kaymış." },
      { olcut: "Çapraz doğrulama", guclu: "Ürün, kategori ve toplam yolları birbirini doğruluyor.", zayif: "Tek yoldan hesap var; doğrulama yok." },
      { olcut: "Boş hücre ve varsayım", guclu: "S007 boş indirimi ve 0 gibi işlenmesi açıkça belgelenmiş.", zayif: "Boş hücre fark edilmemiş." },
      { olcut: "Sınırlamalar", guclu: "Küçük örnek, iade düşülmemesi ve yerel ayar farkları dürüstçe yazılı.", zayif: "Sonuçlar kesin ve genellenebilir gibi sunulmuş." }
    ],
    savunma: [
      "Brüt ve net ciro arasındaki fark bu veride neden belirsiz ve S007 burada ne etkisi yapar?",
      "DÜŞEYARA'da tam eşleşme yerine yaklaşık eşleşme seçsen ürün adı aramasında ne olurdu?",
      "İade oranı neden yalnız 12 siparişle güvenilir bir oran değildir?",
      "Her KPI için çapraz kontrol yazmanın maliyeti ve faydası nedir?"
    ],
    yetkinlikler: [
      { ad: "Koşullu toplama ve sayma", kanit: "Adım 3 ve 4'teki ETOPLA ve EĞERSAY sonuçları (17150, 7/3/2)." },
      { ad: "Arama formülü", kanit: "Adım 4'teki DÜŞEYARA ile kategori eşlemesi." },
      { ad: "Metrik tanımlama", kanit: "Adım 2'deki 6 KPI tanımı." },
      { ad: "Çapraz doğrulama", kanit: "Adım 5'teki 4 kontrol sonucu." },
      { ad: "Sınırlama bildirme", kanit: "Adım 6'daki sınırlamalar listesi." }
    ],
    telafi: "K1 tutmazsa adım 1'de sözlüğü ve S007 notunu yeniden yaz; K2 tutmazsa brüt tutar sütunundaki formülü adet çarpı birim_fiyat olarak yeniden kur ve toplamı yeniden al; K3 tutmazsa ETOPLA'daki aralıkları ve ürün adı yazımlarını kontrol et; K4 tutmazsa EĞERSAY ölçütlerini (kart, nakit, havale) yeniden yaz; K5 tutmazsa iade sayısını ve toplam sipariş sayısını ayrı hücrelerde göster; K6 tutmazsa kategori tablosunu ve DÜŞEYARA'daki tam eşleşme argümanını kontrol et; K7 tutmazsa adım 6 ve 7'ye dön, README sayılarını sayfadan yeniden al.",
    sonraki: "Önerilen sonraki proje: Özet Tablo ve Grafikle Aylık Satış Raporu (va1-p3). Bu proje elle formülle hesaplamayı gösterir; özet tablo aynı sonuçları daha hızlı üretir ve formül sonuçlarınla doğrulanabilir. Kilit zorlanmaz, sıra bir öneridir."
  });

  K.va.push({
    id: "va1-p3", seviye: 1,
    title: "Özet Tablo ve Grafikle Aylık Satış Raporu",
    weeks: 2,
    tools: "Tablo programı (Excel veya Google E-Tablolar), uygulama alanı (SQL ve elektronik tablo simülasyonu), not defteri",
    why: "Yönetici 12 satırlık bir tabloyu satır satır okumaz; ayı ve şehri gösteren bir özet ve tek bir okunaklı grafik ister. Özet tablo ve grafikle kısa bir rapor hazırlar, yorumlarını yalnız verinin desteklediği kadar yazarsın.",
    outcome: ["Özet tabloyla aylık ve şehir bazlı toplamlar üretirsin", "Özet tablo sonucunu bir SQL sorgusuyla ve formülle çapraz doğrularsın", "Grafik türünü ve eksenini soruya göre seçersin", "Üç aylık veriden hangi yorumun çıkıp hangisinin çıkmayacağını ayırırsın"],
    pitch: "I produced a monthly sales report from a 12-order table with a pivot table and a chart, cross-checked the pivot against a SQL query, and limited my conclusions to what three months of data can support.",
    steps: [
      ["Veri sözlüğü ve özet için hazırlık", "Özet tablo ham veriden değil düzgün bir veri tablosundan güvenilir sonuç verir: her sütunun tek başlığı, tek türü ve boş satırsız bir aralık gerekir. Özet için ay bilgisini tarih sütunundan türetmen ve brüt tutar (adet çarpı birim_fiyat) sütunu eklemen gerekir.", "12 siparişi yapıştır, 10 sütunluk sözlüğü yaz. 'ay' sütununu tarihten türet (2026-01, 2026-02, 2026-03) ve 'brut_tutar' sütununu ekle. Tablonun boş satır ya da birleştirilmiş hücre içermediğini kontrol et.", "Sözlük ve ay ile brut_tutar sütunlu veri sayfası", "pivot table source = özet tablo kaynağı, header = başlık, helper column = yardımcı sütun", "pivot table source data requirements"],
      ["Metodoloji ve varsayımlar: hangi tutar, hangi dönem", "Raporun ilk kararı ölçüdür: brüt tutar (indirimsiz) mi, net tutar mı? Bu projede brüt tutar kullanılır çünkü S007'de indirim_orani boştur ve net tutarı belirsizdir. İkinci karar dönemdir: 2026-01 ile 2026-03 arasında üç ay, ay başına dört sipariş vardır.", "'Metodoloji' bölümüne yaz: ölçü brüt tutar, sebebi S007, dönem 3 ay, iadeler düşülmemiştir. Rapor sorusunu tek cümleyle yaz: 'Hangi ay ve hangi şehir brüt satışta öne çıkıyor?'.", "Rapor sorusu ve 4 maddelik metodoloji", "measure = ölçü, scope = kapsam, methodology = yöntem", "report methodology define metric and time scope"],
      ["Özet tablo: aylık ve şehir bazlı brüt tutar", "Satırlara ay, değerlere brut_tutar toplamını koyarsan beklenen sonuç Ocak 2900, Şubat 8100, Mart 6150, genel toplam 17150'dir. Şehir bazında İstanbul 6900, Ankara 3800, İzmir 6450 çıkar ve toplamı yine 17150'dir. Özet tablonun toplamı kaynak veri değişince kendiliğinden güncellenmez; yenilemek gerekir.", "Özet tablo A: ay ve brüt toplam. Özet tablo B: şehir ve brüt toplam. İkisinin genel toplamının 17150 olduğunu göster. Uygulama alanındaki SQL ve elektronik tablo görevlerinden ilgilisini çözerek aylık toplamı bir yolla daha doğrula.", "İki özet tablo ve genel toplam 17150", "pivot table = özet tablo, aggregate = toplulaştır, refresh = yenile", "pivot table sum by month and city"],
      ["Grafik ve kısa yorum", "Aylık brüt tutar için sütun grafiği uygundur: kategoriler ay, yükseklik tutar. Şubat 8100 en yüksek aydır ve toplamın yaklaşık yüzde 47,2'sidir; ancak Şubat'taki 4200 liralık tek bir Monitör siparişi (S006) Şubat'ın yaklaşık yüzde 51,9'unu oluşturur. Mart Şubat'a göre yaklaşık yüzde 24,1 düşük, Ocak'tan Şubat'a artış yaklaşık yüzde 179,3'tür. Üç aylık veri bir eğilim iddiasına yetmez.", "Sütun grafiği çiz: eksen başlıkları ve grafik başlığı koy, değer eksenini sıfırdan başlat. Altına en fazla 3 cümlelik yorum yaz; her cümle bir sayıya dayansın ve 'eğilim' ya da 'neden' iddiası içermesin.", "Grafik ve 3 cümlelik yorum", "column chart = sütun grafiği, axis = eksen, trend = eğilim, outlier = aykırı", "column chart zero baseline pivot chart"],
      ["Test: özet tabloyu bağımsız yolla sına", "Özet tablo bir araçtır, doğruluğu garanti değildir; kaynağa yeni satır eklendiğinde yenilenmemiş, ya da yanlış aralık seçilmiş olabilir. Doğrulama: aynı toplamı ETOPLA ile, SQL GROUP BY ile ya da sütun toplamıyla bul. Üç ayın toplamı 17150 olmalı ve ay başına sipariş sayısı 4, 4, 4 olmalıdır.", "Test bölümüne 4 kontrol yaz: aylık özet toplamı ETOPLA ile aynı mı, şehir toplamı 17150 mi, ay başına sipariş sayısı 4 mü, grafik değerleri özet tabloyla aynı mı. Uygulama alanı yalnız ilgili tek görevi sınar; kalan kontroller sana aittir.", "4 kontrolün sonucu ve doğrulayan formül ya da sorgu", "cross-check = çapraz kontrol, group by = gruplayarak topla, refresh pivot = özeti yenile", "verify pivot table totals with sumif"],
      ["Sınırlamalar: rapor ne söylemez", "Üç ay ve 12 sipariş küçük bir veri setidir: mevsimsellik, kampanya etkisi ya da büyüme iddiası kurulamaz. Brüt tutar indirimi ve iadeyi (S003 ve S007) içermez. Grafiğin güzel görünmesi sonucun güvenilir olduğunu göstermez. Özet tablo ve grafik arayüzü programa ve sürüme göre değişir; adımlar kendi programında denenmelidir, bu belgede doğrulanmamıştır.", "En az 4 sınırlama yaz: küçük örnek, brüt ölçü, iade ve indirim dışarıda, Şubat'ın tek siparişe bağlı olması. 'Yapılmayan analiz' başlığıyla (eğilim, neden) iki maddeyi de listele.", "Sınırlamalar ve yapılmayan analizler listesi", "limitation = sınırlama, seasonality = mevsimsellik, causation = nedensellik", "small data limitations trend claims causation"],
      ["README taslağı ve kapanış", "README raporu okuyana neyin nasıl üretildiğini söyler: veri, ölçü, özet tablolar, grafik, kontroller, sınırlamalar. Rapordaki her sayı özet tablodan ya da kontrol sayfasından gelmelidir.", "README taslağını yaz: soru, veri (12 sipariş, sentetik), ölçü (brüt), sonuçlar (2900, 8100, 6150), kontroller, sınırlamalar ve araca bağlı notlar. Sayıları özet tablodan doğrula.", "README taslağı", "README = giriş belgesi, report = rapor, reproducible = yeniden üretilebilir", "write readme for analysis report"]
    ],
    alan: ["va1-3-sql", "va1-3-sim"],
    alanNotu: "va1-3-sql, ilgili görevde yazdığın SQL sonucunu veriden hesaplanan beklenen sonuçla karşılaştırarak yalnız o sorgunun (ör. aylık ya da şehir bazlı toplam) doğruluğunu kanıtlar. va1-3-sim kural tabanlı elektronik tablo simülasyonudur (gerçek Excel ya da özet tablo değil): formül metnini, işlevi ve sonucu denetler. Özet tablonun kendisi, grafik seçimi, yorum cümleleri, README ve gerçek programdaki özet tablo davranışı bu alanlarla kanıtlanmaz ve doğrulanmamıştır.",
    onkosul: ["Veri Analitiği Seviye 1, 3. ders (özet tablo, grafik, basit rapor) ile birlikte ya da sonrasında yapılması önerilir.", "Formüllü KPI Sayfası projesi (va1-p2) önerilir, zorunlu değil."],
    gereksinim: [
      "İşlevsel (zorunlu): Veri sayfasında 12 sipariş, ay ve brut_tutar sütunları vardır.",
      "İşlevsel (zorunlu): Aylık brüt tutar özet tablosu Ocak 2900, Şubat 8100, Mart 6150 gösterir.",
      "İşlevsel (zorunlu): Şehir bazlı özet tablo İstanbul 6900, Ankara 3800, İzmir 6450 gösterir.",
      "İşlevsel (zorunlu): En az bir grafik vardır; eksen ve başlıklar yazılı, değer ekseni sıfırdan başlar.",
      "İşlevsel (zorunlu): Özet tablo sonuçları ETOPLA ya da SQL ile en az bir bağımsız yolla doğrulanır.",
      "İşlevsel olmayan: Yorum cümleleri en çok 3'tür ve her biri bir sayıya dayanır; eğilim ya da neden iddiası yoktur.",
      "İşlevsel olmayan: Sınırlamalar bölümü küçük örnek ve brüt ölçüyü açıkça yazar."
    ],
    kabul: [
      "K1: Veri sayfasında 12 sipariş, ay ve brut_tutar sütunu vardır | Test: Satır sayısını ve brüt toplamın 17150 olduğunu doğrula.",
      "K2: Aylık özet 2900, 8100, 6150 gösterir | Test: Özet tablo değerlerini bu sayılarla karşılaştır.",
      "K3: Şehir özeti 6900, 3800, 6450 gösterir ve toplamı 17150'dir | Test: Üç değeri topla.",
      "K4: Grafikte eksen başlıkları vardır ve değer ekseni sıfırdan başlar | Test: Grafiği aç ve eksen minimumunu kontrol et.",
      "K5: Aylık toplam ETOPLA ya da SQL ile bağımsız doğrulanmıştır ve ay başına 4 sipariş çıkar | Test: Doğrulama formülünü ya da sorgusunu sonuçlarıyla birlikte göster.",
      "K6: Yorum en çok 3 cümledir ve eğilim ya da neden iddiası içermez | Test: Her cümleyi bir sayıyla eşleştir; 'çünkü' ve 'artış eğilimi' gibi ifadeleri ara.",
      "K7: Sınırlamalar küçük örnek, brüt ölçü ve Şubat'ın tek siparişe bağlı olduğunu yazar | Test: Bu üç maddeyi sınırlamalarda ara."
    ],
    rubrik: [
      { olcut: "Özet tablo doğruluğu", guclu: "Aylık ve şehir toplamları beklenen sayılarla tutuyor ve genel toplam 17150.", zayif: "Özet yanlış aralıkla ya da yenilenmeden alınmış; toplam tutmuyor." },
      { olcut: "Grafik seçimi", guclu: "Soruya uygun grafik, başlıklar yazılı, eksen sıfırdan başlıyor.", zayif: "Eksen kesik ya da grafik soruyu cevaplamıyor." },
      { olcut: "Bağımsız doğrulama", guclu: "Özet tablo ayrı bir yolla (SQL ya da ETOPLA) sınanmış.", zayif: "Özet tabloya körü körüne güvenilmiş." },
      { olcut: "Yorumun sınırı", guclu: "Her cümle bir sayıya dayanır; üç aydan eğilim çıkarılmamış.", zayif: "Büyüme ya da neden iddiası kurulmuş." },
      { olcut: "Sınırlamalar", guclu: "Brüt ölçü, küçük örnek ve tek siparişin etkisi açık yazılı.", zayif: "Sınırlama yok." }
    ],
    savunma: [
      "Neden net yerine brüt tutarı seçtin ve bu seçim sonucu nasıl etkiler?",
      "Şubat'ın en yüksek ay olması neden güçlü bir iş sonucu değildir?",
      "Grafikte değer eksenini sıfırdan başlatmasaydın okuyucu ne yanlış anlayabilirdi?",
      "Özet tabloyu başka hangi yolla doğruladın ve iki yol farklı çıksaydı ne yapardın?"
    ],
    yetkinlikler: [
      { ad: "Özet tablo kurma", kanit: "Adım 3'teki ay ve şehir özet tabloları (17150)." },
      { ad: "Grafik seçme ve kurma", kanit: "Adım 4'teki sütun grafiği." },
      { ad: "Çapraz doğrulama", kanit: "Adım 5'teki 4 kontrol sonucu." },
      { ad: "Yorum disiplini", kanit: "Adım 4'teki 3 cümlelik sayıya dayalı yorum." },
      { ad: "Sınırlama bildirme", kanit: "Adım 6'daki sınırlamalar ve yapılmayan analizler." }
    ],
    telafi: "K1 tutmazsa adım 1'de ay ve brut_tutar sütunlarını yeniden üret ve toplamı 17150'ye bağla; K2 tutmazsa özet tablonun kaynak aralığını ve değer alanını (toplam, sayı değil) kontrol edip yenile; K3 tutmazsa şehir yazımlarını ve özet satır alanını kontrol et; K4 tutmazsa grafiği yeniden kur ve değer eksenini sıfırdan başlat; K5 tutmazsa ETOPLA ya da SQL kontrolünü yeniden yaz ve ay başına sipariş sayısını göster; K6 tutmazsa yorumu kısalt, her cümleyi bir sayıya bağla; K7 tutmazsa adım 6'ya dön ve üç sınırlama maddesini yaz.",
    sonraki: "Önerilen sonraki proje: Veri Doğrulamalı Giriş Formu ve Hata Kontrol Sayfası (va1-p4). Rapor güvenilir veriye dayanır; veri girişi hatalarını baştan önlemek sıradaki doğal adımdır. Kilit zorlanmaz, sıra bir öneridir."
  });

  K.va.push({
    id: "va1-p4", seviye: 1,
    title: "Veri Doğrulamalı Giriş Formu ve Hata Kontrol Sayfası",
    weeks: 2,
    tools: "Tablo programı (Excel veya Google E-Tablolar), uygulama alanı (SQL ve elektronik tablo simülasyonu), not defteri",
    why: "Temizlik pahalıdır; hatayı girişte yakalamak ucuzdur. Satış girişi için doğrulama kuralları olan bir form sayfası ve girilmiş verideki hataları işaretleyen bir kontrol sayfası hazırlarsın; kuralların neyi yakalayıp neyi kaçırdığını kasten bozuk veriyle sınarsın.",
    outcome: ["Her giriş sütunu için doğrulama kuralı tasarlarsın", "Kuralları 13 satırlık bozuk tabloda sınayıp yakaladıklarını ve kaçırdıklarını ayırırsın", "Büyük küçük harf ve boşluk gibi gizli hataların neden kolay kaçtığını açıklarsın", "Hata raporunu sayılarla (sorunlu satır, sorunsuz satır) verirsin"],
    pitch: "I designed validation rules for a sales entry sheet and built an error-check sheet that flags problems in a deliberately messy 13-row table, then documented which errors the rules catch and which slip through.",
    steps: [
      ["Veri sözlüğü: girişte beklenen biçim", "Doğrulama kuralı, beklenen biçimin yazılı olmasına dayanır. Giriş sütunları: kayit_no (benzersiz metin), tarih (tek biçimde tarih), sehir (İstanbul, Ankara, İzmir listesinden), urun (Kulaklık, Klavye, Fare, Monitör listesinden), adet (1 ya da daha büyük tam sayı), fiyat (0'dan büyük sayı, boş olamaz), odeme (kart, nakit, havale).", "Her sütun için beklenen tür, izinli değerler ve zorunlu mu bilgisini içeren 7 satırlık sözlük yaz. Sınırı bilmediğin yerde (adet için üst sınır) 'bilinmiyor' yaz; uydurma bir üst sınır koyma.", "7 satırlık giriş sözlüğü", "data validation = veri doğrulama, allowed values = izinli değerler, required = zorunlu", "data validation rules spreadsheet allowed values required"],
      ["Metodoloji ve varsayımlar: kural tasarımı", "Kural iki katmanlıdır: giriş anında önleyen (açılır liste, sayı kısıtı) ve girilmiş veride arayan (kontrol formülleri). Hangi hatanın hangi katmanda yakalanacağı baştan yazılmazsa boşluk kalır. Bu projenin varsayımı: şehir ve ürün listeleri verilen değerlerle sınırlıdır ve büyük küçük harf farkı hata sayılır.", "Hata türlerini (metin sayı, boş fiyat, tarih biçimi, listede olmayan şehir ya da ürün, tekrar eden kayit_no) satırlara, 'önleyici kural' ve 'kontrol formülü' sütunlarını sütunlara yazan bir tablo kur.", "Hata türü, önleyici kural, kontrol formülü tablosu", "preventive control = önleyici kontrol, detective control = tespit edici kontrol, assumption = varsayım", "data validation versus error checking formulas"],
      ["Giriş formu: doğrulama kurallarını kur", "Açılır liste (şehir, ürün, ödeme), sayı kısıtı (adet tam sayı ve 1 ya da üstü, fiyat 0'dan büyük) ve tarih kısıtı kurulur. Doğrulama kuralının hata mesajı kullanıcıya ne yapacağını söylemelidir: 'Adet tam sayı olmalı, örn. 2'. Doğrulama, yapıştırma yoluyla gelen veriyi her programda engellemez; bu davranış programa göre değişir ve bu belgede doğrulanmamıştır.", "'giris' sayfasında 7 sütunun her biri için doğrulama kuralı ve anlaşılır hata mesajı tanımla. Ekranda her kuralı bilerek bozuk bir değerle dene ve sonucu not et.", "Kuralları ve denemeleri gösteren giriş sayfası", "dropdown list = açılır liste, input message = giriş mesajı, error alert = hata uyarısı", "excel data validation list whole number error message"],
      ["Hata kontrol sayfası: bozuk 13 satırı tara", "Bozuk tabloyu (13 satır, K01–K12 ve tekrar eden K10) 'girilen' sayfaya yapıştır; yanına kontrol sütunları ekle: adet sayı mı, fiyat dolu mu, tarih tek biçimde mi, şehir ve ürün listede mi, kayit_no daha önce geçti mi (ikinci K10 yakalanır). Bu kurallarla 8 satır işaretlenir (K02, K04, K05, K06, K07, K08, K12 ve ikinci K10), 5 satır temiz kalır. Dikkat: EĞERSAY büyük küçük harfi ayırmaz, bu yüzden listede arama yapan bir EĞERSAY kuralı 'ankara' ve 'fare' değerlerini kaçırabilir; ÖZDEŞ (EXACT) harfe duyarlıdır. Bu davranışı kendi programında dene; yerel ayara bağlı farklar doğrulanmamıştır.", "Kontrol sütunlarını yaz, 'sorunlu' ve 'sorunsuz' satırları say. Aynı listeyi hem EĞERSAY hem ÖZDEŞ ile sına; hangi satırların yalnız ikincisiyle yakalandığını yaz. Uygulama alanındaki elektronik tablo ve SQL görevlerinden ilgilisini çözerek aynı hatayı bir yolla daha say.", "Sorunlu 8, sorunsuz 5 sayısı ve EĞERSAY ile ÖZDEŞ farkının notu", "COUNTIF = koşullu say, EXACT = harfe duyarlı eşitlik, ISNUMBER = sayı mı", "excel countif case sensitive exact function validation list"],
      ["Test: kural kapsamı", "Kuralların kendisini sınamak gerekir. Test: her hata türü için en az bir bozuk satır bilerek yaz ve işaretlenip işaretlenmediğini gör; temiz bir satırın işaretlenmediğini de doğrula (yanlış alarm). Sorunlu 8 ve sorunsuz 5 toplamı 13 etmelidir.", "Test tablosuna her hata türü için bir deneme satırı yaz, 'beklenen: işaretlenir / işaretlenmez' ve 'bulunan' sütunlarını doldur. Yakalanmayan bir hata varsa bunu sınırlamalara taşı.", "Test tablosu: hata türü, beklenen, bulunan", "false positive = yanlış alarm, false negative = kaçırılan hata, test case = test durumu", "testing validation rules false positives negatives"],
      ["Sınırlamalar: kontrol neyi yakalamaz", "Kurallar yalnız biçimi yoklar; doğru biçimde girilmiş ama yanlış değeri (kulaklık fiyatını 45 girmek) yakalamaz. Doğrulama, kullanıcı programın dışında veri yapıştırdığında atlanabilir. Kural listeleri (şehir, ürün) sabit olduğundan yeni bir ürün eklendiğinde güncellenmezse doğru girişleri yanlış işaretler.", "En az 4 sınırlama yaz: değer doğruluğu, yapıştırma ile atlama (programa bağlı, doğrulanmadı), liste bakımı, küçük örnek.", "Sınırlamalar listesi", "limitation = sınırlama, plausibility check = makullük kontrolü, maintenance = bakım", "data validation limitations paste bypass plausibility"],
      ["README taslağı ve kapanış", "README, sayfayı kullanacak birinin neyi nereye gireceğini ve hata sayfasını nasıl okuyacağını açıklar: kurallar, hata türleri, yakalama sonuçları, sınırlamalar.", "README taslağını yaz: amaç, veri (13 satır, sentetik), kurallar, sonuç (8 sorunlu, 5 sorunsuz), test özeti ve sınırlamalar. Sayıları kontrol sayfasından doğrula.", "README taslağı", "README = giriş belgesi, user guide = kullanım kılavuzu, handoff = devir", "spreadsheet template documentation user guide"]
    ],
    alan: ["va1-2-sim", "va1-2-sql"],
    alanNotu: "va1-2-sim kural tabanlı bir elektronik tablo simülasyonudur: yazdığın formülün doğru işlevi ve aralığı içerip içermediğini ve sonucun veriden hesaplanan değere eşit olup olmadığını denetler; gerçek bir doğrulama kuralını (açılır liste, giriş mesajı) çalıştırmaz. va1-2-sql, ilgili görevdeki tek eksik değer ya da tekrar sorgusunu sınar. Doğrulama kurallarının kurulması, hata mesajları, kural kapsamı testi, yapıştırma davranışı ve programa bağlı farklar doğrulanmamıştır.",
    onkosul: ["Veri Analitiği Seviye 1, 2. ders (temizleme, doğrulama) ile birlikte ya da sonrasında yapılması önerilir.", "Satış Tablosu Temizleme Günlüğü projesi (va1-p1) önerilir; aynı bozuk tabloyu kullanır."],
    gereksinim: [
      "İşlevsel (zorunlu): Giriş sayfasında 7 sütun için doğrulama kuralı ve anlaşılır hata mesajı vardır.",
      "İşlevsel (zorunlu): Hata türü, önleyici kural ve kontrol formülü tablosu yazılıdır.",
      "İşlevsel (zorunlu): Bozuk 13 satır kontrol sütunlarıyla taranır ve sorunlu satır sayısı gösterilir.",
      "İşlevsel (zorunlu): EĞERSAY ve ÖZDEŞ tabanlı listede arama kuralları karşılaştırılır.",
      "İşlevsel (zorunlu): Her hata türü için bir deneme satırı içeren test tablosu vardır.",
      "İşlevsel olmayan: Hata mesajları kullanıcıya ne yapacağını söyler.",
      "İşlevsel olmayan: Yakalanmayan hatalar sınırlamalarda açıkça yazılıdır."
    ],
    kabul: [
      "K1: Giriş sayfasında 7 sütunun her biri için doğrulama kuralı ve hata mesajı vardır | Test: Her sütuna bozuk bir değer gir ve mesajı oku.",
      "K2: Hata türü tablosunda en az 5 tür (metin sayı, boş fiyat, tarih biçimi, listede olmayan değer, tekrar kayit_no) yazılıdır | Test: Tabloda bu 5 türü ara.",
      "K3: Kontrol sayfası 13 satırdan 8'ini sorunlu, 5'ini sorunsuz gösterir | Test: İki sayıyı topla; 13 etmeli.",
      "K4: İkinci K10 kaydı tekrar olarak işaretlenir, ilk K10 işaretlenmez | Test: Çalışan sayım formülünün ilk satırda 1, ikinci satırda 2 verdiğini göster.",
      "K5: 'ankara' ve 'fare' için EĞERSAY ve ÖZDEŞ sonuçlarının farkı sınanmış ve not edilmiştir | Test: İki kuralın çıktısını yan yana göster; program davranışı farklıysa farkı yaz.",
      "K6: Test tablosunda her hata türü için beklenen ve bulunan değer vardır; yanlış alarm denemesi içerir | Test: Temiz bir satırın işaretlenmediğini göster.",
      "K7: Sınırlamalar en az 4 madde içerir ve yakalanmayan hata türlerini yazar | Test: 'değer doğruluğu' ve 'yapıştırma' maddelerini ara."
    ],
    rubrik: [
      { olcut: "Kural tasarımı", guclu: "Her sütun için uygun kural ve kullanıcıya yol gösteren mesaj var.", zayif: "Kural yok ya da mesajlar 'hata' gibi anlamsız." },
      { olcut: "Kontrol sayfası doğruluğu", guclu: "8 sorunlu, 5 sorunsuz satır doğru bulunmuş ve tekrar kaydı yalnız ikinci kez işaretlenmiş.", zayif: "Yanlış alarm ya da kaçırılan hata var, nedeni bilinmiyor." },
      { olcut: "Gizli hataları fark etme", guclu: "Büyük küçük harf ve sondaki boşluk gibi hatalar ayrıca ele alınmış ve sınanmış.", zayif: "Yalnız bariz hatalar bulunmuş." },
      { olcut: "Test disiplini", guclu: "Her hata türü ve yanlış alarm için beklenen ve bulunan değer yazılı.", zayif: "Kural kuruldu ama sınanmadı." },
      { olcut: "Sınırlamalar", guclu: "Değer doğruluğu ve yapıştırma gibi kapsam dışı hatalar dürüstçe yazılı.", zayif: "Kontrolün her hatayı yakaladığı ima edilmiş." }
    ],
    savunma: [
      "Doğrulama kuralı kurmak ile hata kontrol sayfası yazmak arasındaki fark nedir ve neden ikisi de gerekir?",
      "EĞERSAY ile ÖZDEŞ'in büyük küçük harf davranışı farkı neden 'ankara' kaydını etkiler?",
      "Kontrol sayfan 8 satırı işaretledi; yanlış alarm olmadığını nasıl gösterdin?",
      "Kulaklık fiyatı yanlışlıkla 45 girilirse kurallarından hangisi bunu yakalar?"
    ],
    yetkinlikler: [
      { ad: "Veri doğrulama tasarımı", kanit: "Adım 3'teki giriş sayfası kuralları ve mesajları." },
      { ad: "Hata sınıflama", kanit: "Adım 2'deki hata türü tablosu." },
      { ad: "Kontrol formülü yazma", kanit: "Adım 4'teki kontrol sütunları ve 8 / 5 sayımı." },
      { ad: "Test ve yanlış alarm denetimi", kanit: "Adım 5'teki test tablosu." },
      { ad: "Sınırlama bildirme", kanit: "Adım 6'daki sınırlamalar listesi." }
    ],
    telafi: "K1 tutmazsa adım 3'e dön, her sütunun kuralını ve mesajını yeniden yaz; K2 tutmazsa adım 2'deki tabloya eksik hata türünü ekle; K3 tutmazsa kontrol sütunlarını tek tek yeniden yaz ve sorunlu ile sorunsuz satırları say; K4 tutmazsa tekrar kontrolünü başlangıç hücresi sabit (ilk satır) olacak biçimde yeniden kur; K5 tutmazsa 'ankara' ve 'fare' satırlarını iki kuralla ayrı ayrı sına ve farkı not et; K6 tutmazsa test tablosuna eksik hata türleri ve yanlış alarm denemesi ekle; K7 tutmazsa adım 6'ya dön, kapsam dışı hataları yaz.",
    sonraki: "Önerilen sonraki proje: Seviye 2'deki Aylık Ciro ve Ortalama Sipariş Tutarı Sorgu Seti (va2-p1). Elektronik tabloda yaptığın kontrolleri SQL ile yeniden yapmak doğal devamdır. Kilit zorlanmaz, sıra bir öneridir."
  });

  /* BÖLÜM-B-SONU */
  K.va.push({
    id: "va2-p1", seviye: 2,
    title: "Aylık Ciro ve Ortalama Sipariş Tutarı Sorgu Seti",
    weeks: 2,
    tools: "SQL aracı (SQLite uyumlu), uygulama alanı (SQL ve Python), not defteri",
    why: "'Aylık ciro ve ortalama sipariş tutarı nedir?' sorusu kolay görünür ama NULL'lu bir indirim hücresi iki farklı doğru görünen cevap üretir. Tanımı yazılı, her sayısı ikinci bir sorguyla doğrulanmış bir sorgu seti hazırlarsın.",
    outcome: ["Ciro ve ortalama sipariş tutarını yazılı bir tanıma bağlarsın", "NULL'un SUM, AVG ve COUNT sonuçlarını nasıl değiştirdiğini aynı veride gösterirsin", "Aylık sonuçları GROUP BY ve strftime ile üretip bağımsız sorguyla doğrularsın", "Hedefle karşılaştırmada eksik ayı (sipariş olmayan ay) görünür kılarsın"],
    pitch: "I wrote a query set for monthly revenue and average order value, showed how a single NULL discount changes SUM and AVG, and validated every figure with an independent query.",
    steps: [
      ["Veri sözlüğü: siparis ve hedef tabloları", "Sorgudan önce tabloları tanı: siparis (12 satır; siparis_id, tarih, musteri_id, sehir, urun, adet, birim_fiyat, indirim_orani, odeme_turu, iade) ve hedef (4 satır; ay, hedef_ciro). tarih YYYY-MM-DD metni, hedef.ay ise YYYY-MM metnidir. S007'nin indirim_orani değeri boştur (SQL'de NULL). Birim fiyatın TL olup olmadığı verilmemiştir: 'bilinmiyor'.", "Her sütun için tür, örnek ve anlam yaz; indirim_orani için 'S007 NULL' notunu ekle. Bir SELECT ile satır sayısını (12) ve NULL indirim sayısını (1) doğrula.", "Sözlük ve iki doğrulama sorgusunun sonucu: 12 satır, 1 NULL", "data dictionary = veri sözlüğü, NULL = bilinmeyen değer, row count = satır sayısı", "sql select count star count column null difference"],
      ["Metodoloji ve varsayımlar: ciro ve ortalama tanımı", "Ciro = adet * birim_fiyat * (1 - indirim_orani). Ortalama sipariş tutarı = bir siparişin cirosunun ortalaması (her satır bir sipariştir, siparis_id tekildir). S007'de indirim_orani NULL olduğundan ifade NULL olur; SUM ve AVG NULL satırları atlar, COUNT(*) atlamaz. İki seçenek vardır: NULL'u atla (belirsiz siparişi dışarıda bırak) ya da COALESCE(indirim_orani, 0) ile 'indirimsiz' varsay. İkisi de varsayımdır; hangisini seçtiğini yaz.", "Tanımı, iki seçeneği ve seçtiğini 'Metodoloji' bölümüne yaz. Seçimin gerekçesini (bilinmeyen indirimi 0 saymak ciroyu şişirebilir) belirt.", "Tanım ve varsayım notu", "revenue = ciro, average order value = ortalama sipariş tutarı, COALESCE = ilk dolu değeri ver", "sql coalesce null aggregate sum avg ignore"],
      ["Aylık ciro ve ortalama sipariş tutarı sorguları","GROUP BY strftime('%Y-%m', tarih) ile aylık ciro hesaplanır. NULL'u atlayan sürümde Ocak 2772,5, Şubat 6630, Mart 6105 çıkar; COALESCE sürümünde Şubat 7130 olur, diğerleri değişmez. Aradaki 500, S007'nin (2 adet x 250) indirimsiz cirosudur. Toplam NULL atlanırsa 15507,5, COALESCE ile 16007,5'tir. Ortalama sipariş tutarı AVG ile alınır, ama AVG yalnız NULL olmayan satırlara bakar. Şubat için AVG 2210'dur (3 sipariş: 6630 / 3); COALESCE ile 1782,5'tir (4 sipariş: 7130 / 4). Aynı ay için iki 'ortalama' bu yüzden çıkar. Ocak ortalaması 693,125 ve Mart 1526,25'tir. Sipariş sayısı COUNT(*) ile 4, 4, 4'tür; NULL'u atlayan sürümde ortalamanın dayandığı sipariş sayısı Şubat'ta 3'tür.","Her iki sürümü yaz ve sonuçlarını yan yana koy. Fark yalnız Şubat'ta ve 500 mü, doğrula. Uygulama alanındaki SQL görevlerinden aylık ya da toplu hesabı çözerek sorgunun beklenen değeri verip vermediğine bak. Aylık sorguya COUNT(*) ve AVG ekle; AVG'nin hangi satırlara dayandığını göstermek için COUNT(ciro) sütununu da yaz. Şubat'taki iki ortalamayı (2210 ve 1782,5) karşılaştır.","İki sürümün aylık ciro tablosu ve Şubat farkı: 6630 ve 7130; Ay, sipariş sayısı, ciro, ortalama tablosu ve Şubat'ın iki ortalaması","GROUP BY = gruplayarak topla, strftime = tarih biçimleme, aggregate function = toplulaştırma işlevi, AVG = ortalama, COUNT star = tüm satırları say, COUNT column = dolu değerleri say","sqlite strftime group by month sum"],
      ["Hedefle karşılaştırma ve eksik ay", "hedef tablosundan 2026-01 için 3500, 2026-02 için 6500, 2026-03 için 7000, 2026-04 için 5000 hedef vardır; Nisan'da sipariş yoktur. Ayları siparişten başlatan bir sorgu Nisan'ı hiç göstermez; hedeften başlayıp LEFT JOIN yapan sorgu Nisan'ı ciro NULL olarak gösterir. COALESCE sürümüne göre gerçekleşme/hedef Ocak yaklaşık yüzde 79,2, Şubat yaklaşık yüzde 109,7 (NULL'u atlarsa yaklaşık yüzde 102,0), Mart yaklaşık yüzde 87,2'dir.", "Önce siparişten başlayan, sonra hedeften başlayıp LEFT JOIN yapan sorguyu yaz; satır sayılarını (3 ve 4) karşılaştır. Gerçekleşme oranını hesapla. Bu adımdaki birleştirme bir ileri konudur: uygulama alanı yalnız ilgili alan görevinde sınanır.", "İki sorgunun satır sayısı (3 ve 4) ve Nisan satırının NULL ciroyla görünmesi", "LEFT JOIN = soldaki tablonun tüm satırlarını koru, target = hedef, attainment = hedef gerçekleşme oranı", "sql left join missing months target vs actual"],
      ["Test: bağımsız doğrulama sorguları", "Her sayıyı farklı bir yolla bulursun: aylık toplamların toplamı genel toplama eşit mi (COALESCE'li 16007,5), brüt toplam (adet * birim_fiyat) 17150 mi ve indirim tutarı 17150 - 16007,5 = 1142,5 mi, ay başına sipariş sayılarının toplamı 12 mi. Bir ifadenin tek sorgudaki sonucuna güvenmek yerine ikinci sorguyla uyuşmasına bak.", "5 kontrol sorgusu yaz ve 'beklenen, bulunan, tuttu mu' tablosuna işle. Tutmayan varsa nedenini araştır ve düzelt (örn. NULL ve COALESCE farkı).", "5 kontrolün beklenen/bulunan tablosu; hepsi tuttu", "reconciliation = mutabakat, cross-check = çapraz kontrol, independent query = bağımsız sorgu", "sql reconciliation query totals match"],
      ["Sınırlamalar: bu sorgu seti ne söylemez", "Ciro iadeleri düşmez: S003 (450) ve S007 iade edilmiştir. KDV, kargo ya da para birimi bilinmiyor. Üç aylık ve 12 siparişlik veri bir eğilim ya da mevsimsellik çıkarmaya yetmez. SQLite ile yazılan sorgular başka bir veritabanında (strftime yerine başka tarih işlevi) değişmek zorunda olabilir; bu belgede başka veritabanları doğrulanmamıştır.", "En az 4 sınırlama yaz: iade, NULL varsayımı, küçük örnek, veritabanı farkı (doğrulanmadı).", "Sınırlamalar listesi", "limitation = sınırlama, refund = iade, portability = taşınabilirlik", "sql dialect differences date functions portability"],
      ["README taslağı ve kapanış", "README başkasının sorguları çalıştırıp aynı sonucu almasını sağlar: tablolar, tanımlar, seçilen varsayım, her sorgunun amacı ve beklenen sonucu, kontroller, sınırlamalar.", "README taslağını yaz: soru, veri (12 sipariş, sentetik), ciro tanımı, NULL seçimi, aylık sonuçlar (2772,5; 6630 ya da 7130; 6105), kontroller ve sınırlamalar. Her sayıyı sorgu çıktısından doğrula.", "README taslağı", "README = giriş belgesi, query set = sorgu seti, reproducible = yeniden üretilebilir", "sql project readme documentation queries"]
    ],
    alan: ["va2-2-sql", "va2-4-sql", "va2-5-sql", "va2-9-sql"],
    alanNotu: "Uygulama alanları (va2-2-sql, va2-4-sql, va2-5-sql, va2-9-sql) yalnız ilgili dersin tek görevini kanıtlar: yazdığın SQL sorgusunun sonucu, beklenen değer veriden hesaplanarak karşılaştırılır (ör. bir toplam, bir gruplama ya da bir tarih işlevi). Aylık ciro ve ortalamanın bu projedeki tanımı, NULL varsayımı seçimi, hedef karşılaştırması (LEFT JOIN), kontrol tablosu, README ve SQLite dışındaki veritabanlarındaki davranış alanlarla kanıtlanmaz ve doğrulanmamıştır.",
    onkosul: ["Veri Analitiği Seviye 2, 2., 4., 5. ve 9. ders (SELECT ve NULL, toplulaştırma, GROUP BY, tarih işlevleri) ile birlikte ya da sonrasında yapılması önerilir.", "Adım 4'teki LEFT JOIN için 6. ders önerilir; bu adım sorgu setinin zorunlu çekirdeği dışında kalır."],
    gereksinim: [
      "İşlevsel (zorunlu): Ciro ve ortalama sipariş tutarının yazılı tanımı vardır.",
      "İşlevsel (zorunlu): Aylık ciro iki sürümle (NULL atlanır, COALESCE ile 0) hesaplanır ve fark gösterilir.",
      "İşlevsel (zorunlu): Aylık ortalama sipariş tutarı ve ortalamanın dayandığı sipariş sayısı gösterilir.",
      "İşlevsel (zorunlu): Hedefle karşılaştırmada sipariş olmayan ay (2026-04) görünür.",
      "İşlevsel (zorunlu): En az 5 bağımsız kontrol sorgusu ve beklenen/bulunan tablosu vardır.",
      "İşlevsel olmayan: Sorgular SQLite uyumludur ve her sorgunun amacı yorum satırıyla yazılıdır.",
      "İşlevsel olmayan: Sabit yazılmış sayı kullanılmaz; her değer sorgudan gelir."
    ],
    kabul: [
      "K1: Veri sözlüğü 12 satır ve 1 NULL indirim değerini gösterir | Test: COUNT(*) ve COUNT(indirim_orani) farkının 1 olduğunu göster.",
      "K2: Aylık ciro NULL atlanırsa 2772,5 / 6630 / 6105, COALESCE ile 2772,5 / 7130 / 6105'tir | Test: İki sorguyu çalıştır ve farkın yalnız Şubat'ta 500 olduğunu göster.",
      "K3: Toplam ciro NULL atlanırsa 15507,5, COALESCE ile 16007,5'tir | Test: Aylık toplamları topla ve genel toplamla karşılaştır.",
      "K4: Şubat ortalaması NULL atlanırsa 2210, COALESCE ile 1782,5'tir ve dayandığı sipariş sayısı 3 ve 4'tür | Test: AVG ve COUNT(ciro) sütunlarını göster.",
      "K5: Hedeften başlayan sorgu 4 ay, siparişten başlayan sorgu 3 ay gösterir ve 2026-04 ciro NULL'dur | Test: İki sorgunun satır sayısını ve Nisan satırını göster.",
      "K6: Brüt toplam 17150 ve indirim tutarı 1142,5 çıkar | Test: Brüt toplamdan COALESCE'li cirodan farkını al.",
      "K7: Sınırlamalarda iade, NULL varsayımı, küçük örnek ve veritabanı farkı (doğrulanmadı) yazılıdır | Test: Bu dört maddeyi sınırlamalarda ara."
    ],
    rubrik: [
      { olcut: "Tanım netliği", guclu: "Ciro ve ortalama tanımı yazılı; NULL seçimi gerekçeli.", zayif: "Tanım yok; sayı nasıl çıktı belli değil." },
      { olcut: "NULL farkındalığı", guclu: "Şubat için iki sürüm (6630 ve 7130; 2210 ve 1782,5) yan yana gösterilmiş ve fark açıklanmış.", zayif: "NULL fark edilmemiş; AVG'nin atladığı satırlar bilinmiyor." },
      { olcut: "Sorgu doğruluğu", guclu: "Aylık ciro ve ortalama beklenen sayılarla tutuyor.", zayif: "Sayılar tutmuyor ya da sabit yazılmış." },
      { olcut: "Bağımsız doğrulama", guclu: "Brüt toplam, genel toplam ve satır sayısı gibi ikinci yollarla sınanmış.", zayif: "Kontrol aynı sorgunun tekrarı." },
      { olcut: "Sınırlamalar", guclu: "İade, varsayım ve veritabanı farkı dürüstçe yazılı.", zayif: "Sonuç kesin gibi sunulmuş." }
    ],
    savunma: [
      "S007'nin NULL indirimini 0 saymak ile satırı atlamak Şubat ortalamasını nasıl değiştirir ve hangisini neden seçtin?",
      "AVG ile SUM/COUNT(*) neden bu veride farklı sonuç verir?",
      "Aylar siparişten başlatılınca Nisan neden kaybolur ve bunu hedef karşılaştırmasında nasıl önledin?",
      "Bu sorgu setini başka bir veritabanına taşırsan hangi parçalar değişebilir?"
    ],
    yetkinlikler: [
      { ad: "Toplulaştırma ve gruplama", kanit: "Adım 3'teki aylık ciro, ortalama ve sipariş sayısı sorguları." },
      { ad: "NULL yönetimi", kanit: "Adım 2 ve 3'teki iki sürüm ve Şubat farkı (6630 / 7130)." },
      { ad: "Eksik veriyi görünür kılma", kanit: "Adım 4'teki Nisan satırı." },
      { ad: "Bağımsız doğrulama", kanit: "Adım 5'daki 5 kontrol sorgusu." },
      { ad: "Sınırlama bildirme", kanit: "Adım 6'deki sınırlamalar listesi." }
    ],
    telafi: "K1 tutmazsa adım 1'de COUNT(*) ve COUNT(indirim_orani) sorgularını yeniden yaz; K2 tutmazsa ciro ifadesini (adet * birim_fiyat * (1 - indirim_orani)) ve strftime gruplamasını yeniden kur, COALESCE'li ve COALESCE'siz iki sürümü ayır; K3 tutmazsa aylık toplamları topla ve genel toplamla karşılaştır; K4 tutmazsa AVG yanına COUNT(ciro) ve COUNT(*) ekleyip Şubat'ın dayandığı sipariş sayısını göster; K5 tutmazsa sorguyu hedef tablosundan başlatıp LEFT JOIN ile yeniden yaz; K6 tutmazsa brüt toplam sorgusunu ayrı yaz ve farkı hesapla; K7 tutmazsa adım 6'ya dön ve dört sınırlama maddesini yaz.",
    sonraki: "Önerilen sonraki proje: Ürün Kârlılığı Analizi (va2-p2). Ciro tanımın hazır; maliyet tablosuyla birleştirip kârlılığa geçmek doğal devamıdır. Kilit zorlanmaz, sıra bir öneridir."
  });

  K.va.push({
    id: "va2-p2", seviye: 2,
    title: "Ürün Kârlılığı: urun.maliyet ile JOIN",
    weeks: 2,
    tools: "SQL aracı (SQLite uyumlu), uygulama alanı (SQL), not defteri",
    why: "En çok ciro getiren ürün en kârlı ürün olmak zorunda değildir. siparis ve urun tablolarını birleştirip kâr ve kâr marjını hesaplar, hiç satılmayan bir ürünün neden bazı sorgularda kaybolduğunu gösterirsin.",
    outcome: ["siparis ve urun tablolarını INNER JOIN ile doğru anahtar üzerinden birleştirirsin", "Ciro, maliyet, kâr ve marjı ürün bazında hesaplarsın", "Mutlak kâr sırası ile marj sırası arasındaki farkı yorumlarsın", "INNER JOIN ve LEFT JOIN farkını hiç satılmayan ürün (Kamera) üzerinde gösterirsin"],
    pitch: "I joined orders to a product cost table to compute profit and margin per product, and showed how the product with the highest profit is not the one with the highest margin.",
    steps: [
      ["Veri sözlüğü: siparis ve urun, ortak anahtar", "İki tablo urun sütunuyla bağlanır: siparis.urun ve urun.urun. urun tablosunda 5 satır vardır (Kulaklık, Klavye, Fare, Monitör, Kamera) ve sütunları urun, kategori, maliyet'tir. maliyet sütununun birim başına mı, sipariş başına mı olduğu verilmemiştir; bu projede birim başına varsayılır ve bu bir varsayımdır.", "İki tablonun sözlüğünü yaz; anahtar sütunu işaretle. Bir sorguyla siparis'teki benzersiz ürün sayısının (4) ve urun'deki satır sayısının (5) farkını göster; farkın nedeninin (Kamera) hiç satılmaması olduğunu doğrula.", "Sözlük ve 4 ile 5 farkını gösteren sorgu", "primary key = birincil anahtar, foreign key = yabancı anahtar, join key = birleştirme anahtarı", "sql join key foreign key product table"],
      ["Metodoloji ve varsayımlar: kâr ve marj tanımı", "Ciro = adet * birim_fiyat * (1 - indirim_orani); maliyet = adet * urun.maliyet; kâr = ciro - maliyet; marj = kâr / ciro. S007'nin indirimi NULL olduğundan bu projede COALESCE(indirim_orani, 0) ile indirimsiz varsayılır ve alternatifi (satırı hariç tutma) sınırlamalarda karşılaştırılır. Maliyet birim başınadır (varsayım).", "Dört tanımı ve iki varsayımı (maliyet birim başına, S007 indirimsiz) 'Metodoloji' bölümüne yaz.", "Tanım ve varsayım notu", "profit = kâr, margin = marj, assumption = varsayım", "gross profit margin formula revenue cost"],
      ["JOIN, ürün bazında kâr ve marj sıralaması","INNER JOIN ile siparis satırlarına maliyeti ekleyip ürüne göre gruplarsan: Kulaklık 9 adet, ciro 3735, maliyet 2700, kâr 1035; Klavye 4 adet, ciro 3040, maliyet 2080, kâr 960; Fare 6 adet, ciro 1462,5, maliyet 840, kâr 622,5; Monitör 2 adet, ciro 7770, maliyet 6200, kâr 1570. Toplam ciro 16007,5, toplam maliyet 11820, toplam kâr 4187,5. Marj = kâr / ciro: Fare yaklaşık yüzde 42,6, Klavye yaklaşık yüzde 31,6, Kulaklık yaklaşık yüzde 27,7, Monitör yaklaşık yüzde 20,2. Mutlak kârda sıra Monitör 1570, Kulaklık 1035, Klavye 960, Fare 622,5'tir; yani en kârlı ürün (mutlak) Monitör, en yüksek marjlı ürün Fare'dir ve sıralar ters yöndedir. Sıralama ölçüsü olarak hangisinin seçildiği karara bağlıdır, doğrusu yoktur.","Birleştirme sorgusunu yaz, önce birleşmiş satır sayısının 12 olduğunu doğrula (her sipariş tek bir ürüne bağlanır), sonra gruplayarak dört değeri çıkar. Uygulama alanındaki JOIN ve toplulaştırma görevlerinden ilgilisini çözerek sorgunun beklenen değeri verdiğine bak. Sorguya marj sütunu ekle (kâr / ciro). İki ayrı ORDER BY ile iki sıralamayı çıkar ve farkı iki cümleyle yorumla. Uygulama alanı yalnız ilgili tek görevi sınar.","Dört ürünün adet, ciro, maliyet, kâr tablosu ve toplam kâr 4187,5; İki sıralama ve iki cümlelik yorum","INNER JOIN = ortak satırlar, GROUP BY = gruplama, SUM = toplam, margin = marj, ORDER BY = sırala, trade-off = ödünleşim","sql inner join group by sum product cost profit"],
      ["INNER JOIN ve LEFT JOIN: Kamera nerede?", "Kamera hiç satılmamıştır. siparis'ten başlayan INNER JOIN Kamera'yı göstermez (4 ürün). urun'den başlayan LEFT JOIN siparis'e Kamera'yı gösterir; adet toplamı NULL gelir. Satılmamış ürünü görünür kılmak stok ve katalog kararı için önemlidir. LEFT JOIN'de ürünü siparişte sayarken COUNT(siparis_id) ile COUNT(*) farkını kullan: COUNT(*) Kamera için 1, COUNT(siparis_id) 0 verir.", "İki birleştirmeyi yaz, satır sayılarını (4 ve 5) karşılaştır, Kamera satırını COUNT(*) ve COUNT(siparis_id) ile göster. RIGHT ve FULL JOIN bazı SQLite sürümlerinde yoktur (varsayım: 3.39 öncesi), kullanma.", "İki sorgunun satır sayısı (4 ve 5) ve Kamera satırı", "LEFT JOIN = soldaki tablonun tüm satırlarını koru, NULL = bilinmeyen değer, catalog = katalog", "sql left join count star vs count column no match"],
      ["Test: bağımsız doğrulama", "Toplam kâr üç yolla doğrulanır: ürün kârlarının toplamı 4187,5, toplam ciro - toplam maliyet = 16007,5 - 11820 = 4187,5 ve sipariş satırı başına kâr hesaplanıp toplanması. Birleşmiş satır sayısı 12 olmalı; yanlış anahtar ya da tekrar eden ürün satırı bu sayıyı şişirir (tablo urun'de her ürün bir kez geçer).", "4 kontrol sorgusu yaz: birleşmiş satır sayısı, ürün kârlarının toplamı, ciro - maliyet farkı ve ürün başına adetlerin toplamının (9 + 4 + 6 + 2) 21 olması. 'Beklenen, bulunan, tuttu mu' tablosuna işle.", "4 kontrolün tablosu; hepsi tuttu", "reconciliation = mutabakat, row count = satır sayısı, join duplicates = birleştirmede tekrar", "sql join row count check fan out duplicates"],
      ["Sınırlamalar: bu analiz ne söylemez", "maliyetin birim başına olduğu bir varsayımdır. S007'nin indirimi NULL: satırı hariç tutarsan Fare kârı 622,5 yerine 402,5 olur (ciro 962,5, maliyet 560). İadeler (S003 ve S007) kârdan düşülmedi. Kargo, KDV ve ürün başına sabit giderler yok. Veri 12 siparişlik sentetik bir örnektir; bir ürün stratejisi için tek başına kullanılamaz.", "En az 4 sınırlama yaz ve Fare için iki sürümü (622,5 ve 402,5) belirt.", "Sınırlamalar listesi ve Fare'nin iki sürümü", "limitation = sınırlama, returns = iadeler, sensitivity = duyarlılık analizi", "profitability analysis limitations returns costs"],
      ["README taslağı ve kapanış", "README analizin sorusunu, tanımları, sonuç tablosunu, kontrolleri ve sınırlamaları içerir. Karar verecek kişi 'en kârlı' sözcüğünün hangi ölçüyle söylendiğini README'den anlamalıdır.", "README taslağını yaz: soru, veri (sentetik), tanımlar, sonuç tablosu (kâr: 1570, 1035, 960, 622,5), iki sıralama, kontroller ve sınırlamalar. Her sayıyı sorgu çıktısından doğrula.", "README taslağı", "README = giriş belgesi, deliverable = teslim edilen çıktı, stakeholder = ilgili taraf", "analysis project readme findings limitations"]
    ],
    alan: ["va2-6-sql", "va2-7-sql", "va2-4-sql"],
    alanNotu: "Uygulama alanları (va2-6-sql, va2-7-sql, va2-4-sql) yalnız ilgili görevin SQL sonucunu, beklenen değer veriden hesaplanarak sınar (ör. bir birleştirme sonucu ya da çok tablolu bir toplam). Bu projenin kâr ve marj tanımı, maliyetin birim başına olduğu varsayımı, iki sıralamanın yorumu, Kamera için LEFT JOIN incelemesi, kontrol tablosu, README ve SQLite dışındaki veritabanlarındaki davranış alanlarla kanıtlanmaz ve doğrulanmamıştır.",
    onkosul: ["Veri Analitiği Seviye 2, 4. (toplulaştırma), 6. (JOIN) ve 7. (çok tablolu analiz) ders ile birlikte ya da sonrasında yapılması önerilir.", "Aylık Ciro ve Ortalama Sipariş Tutarı Sorgu Seti (va2-p1) önerilir; aynı ciro tanımını kullanır."],
    gereksinim: [
      "İşlevsel (zorunlu): Kâr ve marj tanımı yazılıdır; maliyet ve S007 varsayımları belirtilmiştir.",
      "İşlevsel (zorunlu): siparis ve urun birleştirilir ve birleşmiş satır sayısı 12 olarak doğrulanır.",
      "İşlevsel (zorunlu): Dört ürünün adet, ciro, maliyet, kâr ve marjı tek tabloda verilir.",
      "İşlevsel (zorunlu): Mutlak kâr ve marj sıralaması ayrı ayrı gösterilir ve yorumlanır.",
      "İşlevsel (zorunlu): INNER JOIN ve LEFT JOIN farkı Kamera üzerinde satır sayısıyla gösterilir.",
      "İşlevsel olmayan: Sorgular SQLite uyumludur; RIGHT ve FULL JOIN kullanılmaz.",
      "İşlevsel olmayan: Sınırlamalar iki kâr sürümünü (S007 dahil ve hariç) yazar."
    ],
    kabul: [
      "K1: Veri sözlüğü iki tabloyu ve birleştirme anahtarını (urun) yazar; siparis'te 4, urun'de 5 ürün olduğu gösterilir | Test: İki COUNT(DISTINCT) sorgusunu çalıştır.",
      "K2: Birleşmiş satır sayısı 12'dir | Test: Birleştirme sorgusunun COUNT(*) sonucunu göster.",
      "K3: Ürün kârları Kulaklık 1035, Klavye 960, Fare 622,5, Monitör 1570'tir; toplamı 4187,5'tir | Test: Dört değeri topla ve ciro - maliyet farkıyla karşılaştır.",
      "K4: Marj sırası Fare, Klavye, Kulaklık, Monitör'dür (yaklaşık yüzde 42,6, 31,6, 27,7, 20,2) | Test: Marj sütununu ORDER BY ile sırala ve yüzdeleri kontrol et.",
      "K5: LEFT JOIN urun'den başlayınca 5 satır, INNER JOIN 4 satır verir; Kamera için COUNT(*) 1, COUNT(siparis_id) 0'dır | Test: İki sorguyu ve Kamera satırını göster.",
      "K6: Toplam ciro 16007,5 ve toplam maliyet 11820'dir | Test: İki toplam sorgusunu çalıştır ve farkın 4187,5 olduğunu göster.",
      "K7: Sınırlamalarda maliyet varsayımı, iade, S007'nin iki sürümü (Fare 622,5 ve 402,5) yazılıdır | Test: Bu maddeleri sınırlamalarda ara."
    ],
    rubrik: [
      { olcut: "Birleştirme doğruluğu", guclu: "Doğru anahtar, 12 birleşmiş satır; tekrar ya da kayıp satır yok.", zayif: "Yanlış anahtar ya da çarpan birleştirme; satır sayısı şişmiş." },
      { olcut: "Kâr ve marj hesabı", guclu: "Dört ürünün sayıları beklenen değerlerle tutuyor ve toplamı 4187,5.", zayif: "Maliyet adetle çarpılmamış ya da sayılar tutmuyor." },
      { olcut: "Yorum", guclu: "Mutlak kâr ile marj sıralaması farkı açıkça yazılmış.", zayif: "Yalnız bir sıralama var; 'en kârlı' kavramı tanımsız." },
      { olcut: "JOIN türü anlayışı", guclu: "INNER ve LEFT JOIN farkı Kamera ve satır sayısıyla gösterilmiş.", zayif: "LEFT JOIN yazılmış ama NULL satırı yorumlanmamış." },
      { olcut: "Sınırlamalar", guclu: "Maliyet varsayımı, iade ve S007 duyarlılığı açık.", zayif: "Sonuç kesin ve genellenebilir gibi sunulmuş." }
    ],
    savunma: [
      "Monitör mutlak kârda birinci iken marjda neden sonuncudur ve hangi ölçüyü yöneticiye önerirsin?",
      "Birleşmiş satır sayısı 12 yerine 17 çıksaydı neyi suçlardın?",
      "urun'den başlayan LEFT JOIN'de COUNT(*) ile COUNT(siparis_id) neden farklı sonuç verir?",
      "maliyet sütunu sipariş başına olsaydı sonuçlar nasıl değişirdi?"
    ],
    yetkinlikler: [
      { ad: "Tabloları birleştirme", kanit: "Adım 3'teki JOIN sorgusu ve 12 satırlık doğrulama." },
      { ad: "Metrik üretme", kanit: "Adım 3'teki ciro, maliyet, kâr ve marj tablosu." },
      { ad: "JOIN türlerini ayırt etme", kanit: "Adım 4'teki INNER ve LEFT JOIN karşılaştırması (4 ve 5)." },
      { ad: "Bağımsız doğrulama", kanit: "Adım 5'daki 4 kontrol." },
      { ad: "Sınırlama bildirme", kanit: "Adım 6'deki sınırlamalar ve Fare'nin iki sürümü." }
    ],
    telafi: "K1 tutmazsa adım 1'de iki tabloyu ve anahtar sütunu yeniden belgele, iki COUNT(DISTINCT) sorgusunu tekrar çalıştır; K2 tutmazsa birleştirme koşulunu (siparis.urun = urun.urun) kontrol et; K3 tutmazsa maliyet ifadesini (adet * urun.maliyet) ve ciro ifadesini yeniden yaz; K4 tutmazsa marjı kâr / ciro olarak yeniden hesapla; K5 tutmazsa LEFT JOIN'i urun tablosundan başlat ve COUNT(siparis_id) ile COUNT(*) farkını göster; K6 tutmazsa toplam ciro ve toplam maliyet sorgularını ayrı yaz; K7 tutmazsa adım 6'ya dön ve maliyet varsayımı, iade ve S007 maddelerini yaz.",
    sonraki: "Önerilen sonraki proje: Müşteri Segmenti Analizi (va2-p3). Ürün düzleminde kârlılığı çıkardın; şimdi müşteri düzleminde segment farklarına bakmak doğal devamıdır. Kilit zorlanmaz, sıra bir öneridir."
  });

  /* BÖLÜM-C-SONU */
  K.va.push({
    id: "va2-p3", seviye: 2,
    title: "Müşteri Segmenti Analizi: JOIN, HAVING ve CASE",
    weeks: 2,
    tools: "SQL aracı (SQLite uyumlu), uygulama alanı (SQL), not defteri",
    why: "'Bireysel mi kurumsal müşteri mi daha değerli?' sorusu tek bir ortalamayla cevaplanamaz: sipariş başına tutar, müşteri başına tutar ve hiç sipariş vermeyen müşteriler farklı hikâyeler anlatır. siparis ve musteri tablolarını birleştirip segment karşılaştırması hazırlar, çıkarımlarını verinin gücüyle sınırlarsın.",
    outcome: ["siparis ve musteri tablolarını birleştirip segment bazında sipariş, müşteri ve ciro sayarsın", "HAVING ile grup düzeyinde süzgeç (en az 2 sipariş veren müşteriler) uygularsın", "CASE WHEN ile müşteri değer bandı üretirsin ve eşiklerin varsayım olduğunu belirtirsin", "Hiç sipariş vermeyen müşteriyi (M09) LEFT JOIN ile görünür kılarsın"],
    pitch: "I analysed customer segments by joining orders to customers, filtered groups with HAVING, built value bands with CASE, and made sure customers with no orders were not silently dropped.",
    steps: [
      ["Veri sözlüğü: siparis ve musteri", "Anahtar siparis.musteri_id = musteri.musteri_id'dir. musteri tablosunda 9 müşteri vardır (musteri_id, segment, sehir, kayit_tarihi); segment bireysel ya da kurumsaldır (6 bireysel, 3 kurumsal). siparis'te 8 farklı müşteri sipariş vermiştir; M09 hiç sipariş vermemiştir. Segmentin ne anlama geldiği (kim kurumsal sayılıyor) verilmemiştir: 'bilinmiyor'.", "İki tablonun sözlüğünü yaz. COUNT(DISTINCT) ile 9 ve 8 sayılarını sorgula ve aradaki 1 müşteriyi (M09) bul.", "Sözlük ve 9, 8 sorgu sonuçları, M09 notu", "customer segment = müşteri segmenti, foreign key = yabancı anahtar, distinct count = benzersiz sayı", "sql count distinct customer table orders join key"],
      ["Metodoloji ve varsayımlar: değer ve segment tanımı", "Ciro = adet * birim_fiyat * (1 - indirim_orani); S007'nin indirimi NULL olduğundan bu projede COALESCE(indirim_orani, 0) ile indirimsiz varsayılır (M02, kurumsal). 'Değer' iki farklı ölçüyle okunur: sipariş başına ortalama tutar ve müşteri başına toplam ciro. Değer bandı eşikleri bu projede 3000 ve üstü 'yüksek', 1500 ile 3000 arası 'orta', 1500'ün altı 'düşük' olarak seçilir; bu eşikler keyfidir ve bir varsayımdır.", "Ciro tanımını, S007 varsayımını, iki değer ölçüsünü ve band eşiklerini 'Metodoloji' bölümüne yaz.", "Tanım, ölçüler ve eşik varsayımı", "customer value = müşteri değeri, threshold = eşik, assumption = varsayım", "customer value segmentation thresholds arbitrary"],
      ["Segment karşılaştırması: JOIN ve GROUP BY", "INNER JOIN ve segmente göre gruplama: bireysel 8 sipariş, 5 aktif müşteri, ciro 10282,5, sipariş başına ortalama 1285,3125; kurumsal 4 sipariş, 3 aktif müşteri, ciro 5725, ortalama 1431,25. Bireysel segmentte ciro daha yüksek, ama kurumsalda sipariş başına tutar daha yüksektir; müşteri başına ciro bireyselde 2056,5, kurumsalda yaklaşık 1908,3'tür. İade: bireysel 1 sipariş (yüzde 12,5), kurumsal 1 sipariş (yüzde 25); sayılar çok küçüktür.", "Birleştirme ve gruplama sorgusunu yaz: segment, sipariş sayısı, COUNT(DISTINCT musteri_id), ciro, ortalama. Toplam sipariş sayısının 12 ve ciro toplamının 16007,5 olduğunu doğrula. Uygulama alanındaki JOIN ve GROUP BY görevlerinden ilgilisini çözerek sorgunun beklenen değeri verdiğine bak.", "Segment tablosu: 8 / 5 / 10282,5 ve 4 / 3 / 5725", "INNER JOIN = ortak satırlar, GROUP BY = gruplama, COUNT DISTINCT = benzersiz say", "sql join group by segment count distinct revenue"],
      ["HAVING ile grup süzgeci ve CASE WHEN ile değer bandı","WHERE satırları gruplanmadan önce, HAVING grup oluştuktan sonra süzer. Müşteri başına sipariş sayısına göre HAVING COUNT(*) >= 2 uygularsan 3 müşteri kalır: M01 (3 sipariş, ciro 1772,5), M02 (2 sipariş, ciro 1300) ve M03 (2 sipariş, ciro 4650). Müşteri başına ciro 3000 ve üstü olanlar HAVING SUM(...) >= 3000 ile M03 (4650) ve M05 (3570)'tir. Tekrar eden müşteri oranı sipariş veren 8 müşteriye göre 3/8 = yüzde 37,5, kayıtlı 9 müşteriye göre 3/9 = yaklaşık yüzde 33,3 çıkar; payda ayrıca yazılmalıdır. CASE WHEN müşteri toplam cirosuna göre band üretir. Eşiklerle: yüksek M03 ve M05 (2 müşteri), orta M01 (1772,5) ve M06 (1620) (2 müşteri), düşük M02, M04, M07, M08 (4 müşteri). Segmentlere göre bireysel için 1 / 2 / 2, kurumsal için 1 / 0 / 2 (yüksek, orta, düşük). M09 siparişsizdir: musteri'den başlayıp LEFT JOIN yaparsan 9 müşteri görünür ve M09'un cirosu NULL olur; INNER JOIN M09'u sessizce dışarıda bırakır.","İki HAVING sorgusu yaz (en az 2 sipariş, ciro >= 3000). Tekrar eden müşteri oranını iki paydayla (8 ve 9) hesapla ve hangi paydayı neden seçtiğini yaz. Müşteri başına ciroyu bir alt sorguda ya da CTE'de hesapla, CASE ile band üret ve band sayılarını (2, 2, 4) ve segment kırılımlarını çıkar. M09'u musteri'den başlayan LEFT JOIN ile göster ve band atamasında NULL için ayrı bir 'siparişsiz' bandı yaz.","İki HAVING sorgusunun sonucu (3 müşteri ve 2 müşteri) ve payda notu; Band sayıları 2 / 2 / 4, segment kırılımları ve M09 için siparişsiz bandı","HAVING = grup süzgeci, WHERE = satır süzgeci, repeat customer = tekrar eden müşteri, CASE WHEN = koşullu ifade, subquery = alt sorgu, CTE = ortak tablo ifadesi","sql having vs where count group filter"],
      ["Test: bağımsız doğrulama", "Toplam sipariş sayısı segmentlerin toplamına (8 + 4 = 12), toplam ciro segment cirolarının toplamına (10282,5 + 5725 = 16007,5), müşteri sayısı band sayıları toplamı + siparişsiz müşteriye (2 + 2 + 4 + 1 = 9) eşit olmalıdır. Bunlar birbirinden bağımsız yollardır; biri tutmazsa birleştirme ya da NULL hatası vardır.", "4 kontrol sorgusu yaz ve 'beklenen, bulunan, tuttu mu' tablosuna işle. Sınır testi için gerçek veride hiçbir müşteri tam 1500 ya da 3000 değildir (toplamlar 4650, 3570, 1772,5, 1620, 1440, 1300, 855, 800); bu yüzden varyant veri hazırla: M06'nın bir siparişinin adedini değiştirip toplamını tam 1500 yap, >= yerine > yazınca M06'nın bandının orta'dan düşük'e kaydığını göster ve düzelt.", "4 kontrolün tablosu; hepsi tuttu", "reconciliation = mutabakat, off-by-one = bir birim kayma, boundary = sınır değer", "sql check totals reconcile segments boundary conditions"],
      ["Sınırlamalar: segment analizi ne söylemez", "8 sipariş ve 4 sipariş üzerinden segmentler arası bir üstünlük iddia edilemez; tek bir sipariş ortalamayı oynatır (kurumsalda S007'yi hariç tutarsan ciro 5225 ve ortalama yaklaşık 1741,7 olur). Band eşikleri keyfidir. Segmentin nasıl belirlendiği bilinmiyor. Müşteri kayıt tarihi ve sipariş zamanı birlikte incelenmedi (yeni müşteri, eski müşteri farkı).", "En az 4 sınırlama yaz: küçük örnek, eşik varsayımı, segment tanımı, S007 duyarlılığı. 'Bu veriden çıkarılamayanlar' başlığına iki madde ekle (ör. segmentin neden farklı davrandığı).", "Sınırlamalar ve çıkarılamayanlar listesi", "limitation = sınırlama, sample size = örneklem büyüklüğü, causation = nedensellik", "segment analysis small sample cannot conclude"],
      ["README taslağı ve kapanış", "README analizin sorusunu, tanımları, segment ve band sonuçlarını, kontrolleri ve sınırlamaları içerir; eşiklerin ve payda seçimlerinin varsayım olduğunu açıkça yazar.", "README taslağını yaz: soru, veri (sentetik), tanımlar, sonuç tabloları (8 / 4 sipariş; 2 / 2 / 4 band), kontroller ve sınırlamalar. Her sayıyı sorgu çıktısından doğrula.", "README taslağı", "README = giriş belgesi, deliverable = teslim edilen çıktı, caveat = uyarı", "analysis project readme caveats assumptions"]
    ],
    alan: ["va2-6-sql", "va2-5-sql", "va2-3-sql"],
    alanNotu: "Uygulama alanları (va2-6-sql, va2-5-sql, va2-3-sql) yalnız ilgili dersin tek SQL görevini sınar: sorgunun sonucu, beklenen değer veriden hesaplanarak karşılaştırılır (ör. bir birleştirme, bir HAVING süzgeci ya da bir CASE sınıflaması). Bu projedeki segment karşılaştırması, 3000 ve 1500 eşikleri, payda seçimi, M09'un LEFT JOIN ile gösterimi, kontrol tablosu, README ve yorumlar alanlarla kanıtlanmaz ve doğrulanmamıştır.",
    onkosul: ["Veri Analitiği Seviye 2, 3. (CASE WHEN), 4. (toplama işlevleri), 5. (GROUP BY ve HAVING), 6. (JOIN) ve 8. (alt sorgu ve CTE) ders ile birlikte ya da sonrasında yapılması önerilir.", "Aylık Ciro ve Ürün Kârlılığı projeleri (va2-p1, va2-p2) önerilir; aynı ciro tanımını kullanır."],
    gereksinim: [
      "İşlevsel (zorunlu): Ciro ve değer bandı eşikleri yazılı tanımla ve varsayım olarak belirtilmiştir.",
      "İşlevsel (zorunlu): Segment bazında sipariş sayısı, aktif müşteri sayısı, ciro ve sipariş başına ortalama gösterilir.",
      "İşlevsel (zorunlu): HAVING ile en az 2 sipariş veren ve ciro eşiğini geçen müşteriler listelenir.",
      "İşlevsel (zorunlu): CASE WHEN ile müşteri değer bandı üretilir ve band sayıları segmentlere göre kırılır.",
      "İşlevsel (zorunlu): Siparişsiz müşteri (M09) LEFT JOIN ile görünür kılınır.",
      "İşlevsel olmayan: Her kontrol 'beklenen, bulunan' ile belgelenir; sınır değer (>= ve >) denemesi, bir müşteriyi tam eşiğe denk getiren varyant veriyle yapılır (gerçek veride tam 1500 ya da 3000 olan müşteri yoktur).",
      "İşlevsel olmayan: Sınırlamalar küçük örneklemi ve eşiklerin keyfî olduğunu yazar."
    ],
    kabul: [
      "K1: Veri sözlüğü iki tabloyu ve anahtarı yazar; 9 kayıtlı, 8 sipariş veren müşteri ve M09 gösterilir | Test: İki COUNT(DISTINCT) sorgusunu ve M09 sorgusunu çalıştır.",
      "K2: Segment tablosu bireysel 8 sipariş, 5 müşteri, 10282,5 ciro; kurumsal 4 sipariş, 3 müşteri, 5725 ciro gösterir | Test: Sonuçları bu sayılarla karşılaştır; toplam 12 sipariş ve 16007,5 olmalı.",
      "K3: Sipariş başına ortalama bireysel yaklaşık 1285,31 ve kurumsal 1431,25'tir | Test: Ciro / sipariş sayısı hesabını elle yap ve sorguyla karşılaştır.",
      "K4: HAVING COUNT(*) >= 2 yalnız M01, M02, M03'ü döndürür | Test: Sonuç satır sayısının 3 olduğunu göster.",
      "K5: Ciro >= 3000 olan müşteriler M03 ve M05'tir | Test: HAVING SUM sorgusunun sonucunu göster.",
      "K6: Band sayıları yüksek 2, orta 2, düşük 4'tür; segmentlere göre bireysel 1/2/2, kurumsal 1/0/2'dir; M09 'siparişsiz' bandındadır | Test: Band sayılarının ve siparişsizin toplamının 9 olduğunu göster.",
      "K7: Sınırlamalar küçük örneklem, eşiklerin keyfîliği, S007 duyarlılığı ve segment tanımının bilinmemesini yazar | Test: Bu dört maddeyi sınırlamalarda ara."
    ],
    rubrik: [
      { olcut: "Birleştirme ve gruplama", guclu: "Segment tablosu beklenen sayılarla tutuyor; toplamlar 12 ve 16007,5.", zayif: "Birleştirme satır çarpmış ya da sipariş sayısı tutmuyor." },
      { olcut: "HAVING kullanımı", guclu: "WHERE ve HAVING farkı doğru uygulanmış; payda seçimi yazılı.", zayif: "HAVING yerine WHERE ile süzgeç denenmiş ve hata yorumlanmamış." },
      { olcut: "CASE bandı ve eşik farkındalığı", guclu: "Eşikler varsayım olarak belirtilmiş ve sınır değer, bir müşteriyi eşiğe denk getiren varyant veriyle denenmiş.", zayif: "Eşikler gerekçesiz; sınır değerde yanlış band." },
      { olcut: "Eksik müşteri", guclu: "M09 LEFT JOIN ile gösterilmiş ve band kontrolüne dahil edilmiş.", zayif: "INNER JOIN M09'u sessizce atmış." },
      { olcut: "Yorumun sınırı", guclu: "Segmentler arası üstünlük iddia edilmemiş; küçük örneklem belirtilmiş.", zayif: "Bireysel 'daha değerli' ya da kurumsal 'daha iyi' gibi kesin iddia var." }
    ],
    savunma: [
      "HAVING ile WHERE arasındaki fark nedir ve 'en az 2 sipariş veren müşteri' süzgecini neden WHERE ile yazamazsın?",
      "Bireysel segment ciroda öndeyken kurumsal sipariş başına tutarda öndedir; 'hangi segment değerli' sorusuna nasıl cevap verirsin?",
      "CASE bandında yüksek eşiğini 3000'den 4000'e çıkarırsan M05 (3570) hangi banda geçer, band sayıları (2, 2, 4) nasıl değişir ve bu sonucu nasıl etkiler?",
      "INNER JOIN yerine LEFT JOIN kullanmanın M09 üzerindeki etkisi nedir?"
    ],
    yetkinlikler: [
      { ad: "Çok tablolu gruplama", kanit: "Adım 3'teki segment tablosu (8 / 5 / 10282,5 ve 4 / 3 / 5725)." },
      { ad: "Grup düzeyinde süzme", kanit: "Adım 4'teki iki HAVING sorgusu." },
      { ad: "Koşullu sınıflama", kanit: "Adım 4'teki CASE bandı (2 / 2 / 4)." },
      { ad: "Eksik kaydı görünür kılma", kanit: "Adım 4'teki M09 LEFT JOIN çıktısı." },
      { ad: "Sınırlama bildirme", kanit: "Adım 6'deki sınırlamalar ve çıkarılamayanlar." }
    ],
    telafi: "K1 tutmazsa adım 1'de iki tablonun sözlüğünü ve COUNT(DISTINCT) sorgularını yeniden yaz; K2 tutmazsa JOIN koşulunu (siparis.musteri_id = musteri.musteri_id) ve segmente göre gruplamayı yeniden kur, toplam sipariş sayısını kontrol et; K3 tutmazsa ortalamayı ciro / sipariş sayısı olarak elle hesapla ve sorguyla karşılaştır; K4 tutmazsa süzgeci WHERE'den HAVING COUNT(*) >= 2'ye taşı; K5 tutmazsa HAVING SUM ifadesindeki ciro formülünü kontrol et; K6 tutmazsa müşteri başına ciroyu alt sorguda hesapla, CASE eşiklerini (3000, 1500) ve >= sınırlarını gözden geçir, M09 için LEFT JOIN ekle; K7 tutmazsa adım 6'ya dön ve dört sınırlama maddesini yaz.",
    sonraki: "Önerilen sonraki proje: Veri Kalitesi Denetim Sorguları ve Sıralama Raporu (va2-p4). Analizlerini güvenilir veriye dayandırmak için veri kalitesi sorgularını eklemek doğal devamıdır. Kilit zorlanmaz, sıra bir öneridir."
  });

  K.va.push({
    id: "va2-p4", seviye: 2,
    title: "Veri Kalitesi Denetim Sorguları ve Pencere Fonksiyonuyla Sıralama Raporu",
    weeks: 3,
    tools: "SQL aracı (SQLite uyumlu), uygulama alanı (SQL ve Python), not defteri",
    why: "Analiz sonucuna güvenmeden önce verinin güvenilir olup olmadığını sorgularla denetlemek gerekir: NULL, yetim kayıt, tekrar, eksik ay. Aynı veriden pencere fonksiyonlarıyla sıralama ve dönemler arası değişim raporu çıkarırsın; denetim sorgularının her biri beklenen sayıyı yazılı olarak taşır.",
    outcome: ["9 veri kalitesi kontrolünü koşullu toplama ve JOIN ile yazarsın", "Kontrol sonuçlarını 'bulgu var / yok' raporu olarak sunarsın", "RANK, ROW_NUMBER ve LAG ile sıralama ve dönem değişimi raporu üretirsin", "Aynı denetimi SQL ve Python ile yapıp sonuçları karşılaştırırsın"],
    pitch: "I wrote nine data quality audit queries (NULLs, orphans, duplicates, missing months) with expected counts, then produced ranking and month-over-month reports with window functions and cross-checked them in Python.",
    steps: [
      ["Veri sözlüğü: dört tablo ve ilişkiler", "Dört tablo vardır: siparis (12 satır), musteri (9 satır), urun (5 satır), hedef (4 satır). İlişkiler: siparis.musteri_id → musteri.musteri_id, siparis.urun → urun.urun, hedef.ay = 'YYYY-MM' ve siparis.tarih'in ilk 7 karakteri. Beklenen kurallar: siparis_id tekil, indirim_orani 0 ile 1 arasında ve boş değil, siparis.sehir müşterinin şehriyle aynı.", "Dört tablonun sözlüğünü ve ilişki şemasını yaz. Her beklenen kuralı 'kural, kontrol sorgusu, beklenen bulgu sayısı' sütunlu bir tabloya yaz (henüz sorguyu çalıştırma).", "Sözlük, ilişki şeması ve 9 satırlık kural tablosu", "schema = şema, constraint = kural/kısıt, relationship = ilişki", "database schema relationships data quality rules"],
      ["Metodoloji ve varsayımlar: ne 'kusur' sayılır?", "Her bulgu hata değildir. NULL indirim bir kusurdur (belirsizlik); siparişsiz müşteri (M09) ya da satılmayan ürün (Kamera) hata olmayabilir, iş bilgisi gerektirir. Bulguları 'kesin hata', 'inceleme gerek', 'normal olabilir' diye sınıfla; sınıflamayı kimin yapacağını (veri sahibi) yaz. Denetim sorguları sonucu otomatik düzeltmez, yalnız raporlar.", "Kural tablosuna 'bulgu türü' sütunu ekle. Her kontrolün olası yanlış alarm nedenini bir cümleyle yaz.", "Bulgu türü sınıflaması ve yanlış alarm notları", "data quality = veri kalitesi, false positive = yanlış alarm, data steward = veri sorumlusu", "data quality checks false positives data owner"],
      ["Denetim sorguları: 9 kontrol", "Beklenen sonuçlar: (1) NULL indirim sayısı 1 (S007); (2) musteri'de karşılığı olmayan siparis.musteri_id 0; (3) urun'de karşılığı olmayan siparis.urun 0; (4) hiç sipariş vermeyen müşteri 1 (M09); (5) hiç satılmayan ürün 1 (Kamera); (6) siparişi olmayan hedef ayı 1 (2026-04); (7) tekrar eden siparis_id 0; (8) siparis.sehir ile müşterinin şehri uyuşmayan sipariş 0; (9) 0 ile 1 dışında indirim_orani 0 (en büyük değer 0,15). Toplam 9 kontrolün 4'ünde bulgu, 5'inde bulgu yoktur. Koşullu toplama (SUM(CASE WHEN ...)) ile birkaç sayım tek sorguda toplanabilir.", "Dokuz kontrolü yaz; yetim kayıt kontrollerini LEFT JOIN ve IS NULL ile, tekrar kontrolünü GROUP BY ve HAVING ile, NULL ve aralık kontrolünü koşullu toplamla yaz. Sonuçları 'beklenen, bulunan' ile tabloya işle. Uygulama alanındaki SQL ve Python görevlerinden ilgilisini çözerek bir kontrolün beklenen değeri verdiğine bak.", "9 kontrolün tablosu: 4 bulgulu, 5 bulgusuz", "LEFT JOIN IS NULL = anti-join, conditional aggregation = koşullu toplama, orphan record = yetim kayıt", "sql orphan records left join is null duplicate check having"],
      ["Pencere fonksiyonu raporları: RANK, ROW_NUMBER, LAG","Pencere fonksiyonu satırları gruplamadan her satıra sıra, önceki değer gibi bir hesap ekler. Ürün kârına göre RANK() OVER (ORDER BY kâr DESC) ile Monitör (1570) 1, Kulaklık (1035) 2, Klavye (960) 3, Fare (622,5) 4 olur (S007 indirimi COALESCE ile 0 sayıldığında). Müşterinin ilk siparişi için ROW_NUMBER() OVER (PARTITION BY musteri_id ORDER BY tarih) ile 1 numaralı satırları seçersen 8 satır (8 sipariş veren müşteri) döner: M01 S001, M02 S002, M03 S003, M04 S005, M05 S006, M06 S008, M07 S009, M08 S011. RANK eşitlikte aynı sırayı verir, ROW_NUMBER vermez. LAG(ciro) OVER (ORDER BY ay) önceki ayın cirosunu getirir. COALESCE'li aylık ciro Ocak 2772,5, Şubat 7130, Mart 6105'tir: Ocak için önceki ay yoktur (LAG NULL), Şubat farkı 4357,5, Mart farkı -1025'tir. NULL'u atlayan sürümde Şubat 6630 olur ve farklar 3857,5 ile -525 çıkar. Bu rapor yalnız üç ayı kapsar: eğilim değil, üç noktalık bir fark tablosudur.","İki sorguyu yaz (ürün kâr sıralaması, müşterinin ilk siparişi). Pencere fonksiyonunun sonucuna WHERE ile süzgeç uygulayamayacağını bir alt sorguda ya da CTE'de çöz. Uygulama alanındaki pencere fonksiyonu görevinden ilgilisini çöz. Aylık ciroyu bir CTE'de hesapla, LAG ile önceki ayı ve farkı ekle. Ocak satırında NULL'u (önceki ay yok) gizleme; açıkça 'ilk ay' diye etiketle ve iki sürümün (6630 ve 7130) farkını sınırlamalara taşı.","Ürün sıralaması (1570, 1035, 960, 622,5) ve 8 satırlık ilk sipariş listesi; Aylık ciro, önceki ay ve fark tablosu: 4357,5 ve -1025","window function = pencere fonksiyonu, RANK = sıra (eşitlikte aynı), ROW_NUMBER = satır numarası, PARTITION BY = bölümle, LAG = bir önceki satırın değeri, CTE = ortak tablo ifadesi, month-over-month = aydan aya","sql window functions rank row_number partition by first order per customer"],
      ["Test: SQL ve Python ile çapraz doğrulama", "Aynı denetimi iki bağımsız yolla yapmak hata olasılığını azaltır. Python'da siparisler ve tablolar listeleriyle yetim kayıtları, NULL sayısını ve ürün sıralamasını hesapla; SQL sonuçlarıyla karşılaştır: NULL indirim 1, siparişsiz müşteri 1, satılmayan ürün 1, sıralama Monitör, Kulaklık, Klavye, Fare. Python ortamında yalnız standart kütüphane vardır (pandas yok).", "Python alanındaki görevlerden ilgilisini çöz ve 4 sayıyı SQL'le karşılaştır. Karşılaştırma tablosuna 'SQL, Python, uyuşuyor mu' yaz; uyuşmayanı araştır.", "4 satırlık SQL-Python karşılaştırma tablosu", "cross-validation = çapraz doğrulama, standard library = standart kütüphane, independent implementation = bağımsız uygulama", "python list of dicts orphan check null count verify sql result"],
      ["Sınırlamalar: denetim neyi yakalamaz", "Denetim yalnız yazdığın 9 kuralı yoklar; adet ya da birim_fiyat için makul aralık (aykırı değer) denetlenmedi. Kural geçerliyse veri doğrudur anlamına gelmez. 12 satırlık örnekte bulgusuz çıkan bir kontrol büyük veride de bulgusuz çıkmaz. S007'nin indirimi bilinmediği için kâr ve ciro sıralamaları varsayıma bağlıdır. SQLite'ta çalışan bir sorgu başka bir veritabanında (tarih ve pencere işlevi söz dizimi) değişebilir; bu belgede başka veritabanları doğrulanmamıştır.", "En az 4 sınırlama yaz: kapsam dışı kurallar, geçen kontrolün 'doğru veri' demek olmadığı, küçük örnek, S007 duyarlılığı ve veritabanı farkı (doğrulanmadı).", "Sınırlamalar listesi", "limitation = sınırlama, outlier = aykırı değer, coverage = kapsam", "data quality audit limitations coverage outliers"],
      ["README taslağı ve kapanış", "README denetimi başkasının yeniden çalıştırabilmesini sağlar: kural tablosu, 9 sorgu, beklenen ve bulunan sayılar, bulgu sınıfları, sıralama ve LAG raporları, SQL-Python karşılaştırması ve sınırlamalar.", "README taslağını yaz: amaç, veri (4 tablo, sentetik), 9 kontrol ve sonuçları (4 bulgulu, 5 bulgusuz), iki rapor, çapraz doğrulama ve sınırlamalar. Her sayıyı sorgu çıktısından doğrula.", "README taslağı", "README = giriş belgesi, runbook = çalıştırma kılavuzu, audit = denetim", "data quality audit documentation readme sql"]
    ],
    alan: ["va2-11-sql", "va2-10-sql", "va2-10-py", "va2-11-py"],
    alanNotu: "Uygulama alanları (va2-11-sql, va2-10-sql, va2-10-py, va2-11-py) yalnız ilgili görevin tek SQL ya da Python sonucunu, beklenen değer veriden hesaplanarak sınar (ör. bir kalite sayımı ya da bir sıralama). 9 kontrolün tamamı, bulgu sınıflaması, LAG raporu, SQL-Python karşılaştırma tablosu, README ve SQLite ile Pyodide dışındaki ortamlardaki davranış alanlarla kanıtlanmaz ve doğrulanmamıştır.",
    onkosul: ["Veri Analitiği Seviye 2, 10. (pencere fonksiyonları) ve 11. (koşullu toplama ve veri kalitesi kontrolleri) ders ile birlikte ya da sonrasında yapılması önerilir.", "Adım 3 için 6. (JOIN), adım 4 için 8. (alt sorgu ve CTE) ders önerilir."],
    gereksinim: [
      "İşlevsel (zorunlu): Dört tablonun sözlüğü ve 9 kuralın 'kural, sorgu, beklenen bulgu sayısı' tablosu vardır.",
      "İşlevsel (zorunlu): 9 denetim sorgusu yazılıdır ve sonuçları 'beklenen, bulunan' ile raporlanır.",
      "İşlevsel (zorunlu): Bulgular 'kesin hata', 'inceleme gerek', 'normal olabilir' diye sınıflanır.",
      "İşlevsel (zorunlu): RANK ile ürün kâr sıralaması ve ROW_NUMBER ile müşterinin ilk siparişi raporu üretilir.",
      "İşlevsel (zorunlu): LAG ile aylık ciro farkı raporu üretilir; ilk ayın önceki değeri NULL olarak etiketlenir.",
      "İşlevsel (zorunlu): En az 4 sayı SQL ve Python ile ayrı ayrı bulunur ve karşılaştırılır.",
      "İşlevsel olmayan: Sınırlamalar kural kapsamını, küçük örneği ve veritabanı farkını (doğrulanmadı) yazar."
    ],
    kabul: [
      "K1: Kural tablosu 9 kural içerir ve her birinin beklenen bulgu sayısı önceden yazılıdır | Test: Tabloda 9 satırı ve 'beklenen' sütununu kontrol et.",
      "K2: 9 kontrolden 4'ü bulgulu, 5'i bulgusuzdur (NULL indirim 1, siparişsiz müşteri 1, satılmayan ürün 1, siparişsiz hedef ayı 1) | Test: Sorgu sonuçlarını bu sayılarla karşılaştır.",
      "K3: Yetim kayıt, tekrar siparis_id, şehir uyuşmazlığı ve aralık dışı indirim kontrolleri 0 verir | Test: Bu dört sorgunun sonucunu göster.",
      "K4: Ürün kâr sıralaması Monitör 1, Kulaklık 2, Klavye 3, Fare 4'tür | Test: RANK sorgusunun çıktısını kâr değerleriyle (1570, 1035, 960, 622,5) birlikte göster.",
      "K5: Müşterinin ilk sipariş raporu 8 satır döndürür (M01 S001, M02 S002, M03 S003, M04 S005, M05 S006, M06 S008, M07 S009, M08 S011) | Test: Satır sayısını ve siparis_id listesini göster.",
      "K6: Aylık fark raporu Ocak için NULL, Şubat için 4357,5, Mart için -1025 verir | Test: LAG sütununu ve fark sütununu göster; COALESCE sürümünü kullandığını belirt.",
      "K7: SQL ve Python en az 4 sayıda uyuşur ve sınırlamalarda kural kapsamı ile veritabanı farkı (doğrulanmadı) yazılıdır | Test: Karşılaştırma tablosunu ve sınırlamaları göster."
    ],
    rubrik: [
      { olcut: "Kural tanımı", guclu: "Her kontrolün beklenen sayısı sorgudan önce yazılmış.", zayif: "Sorgu çalıştırıldıktan sonra sonuç 'normal' kabul edilmiş." },
      { olcut: "Sorgu doğruluğu", guclu: "9 kontrolün sayıları beklenenle tutuyor (4 bulgulu, 5 bulgusuz).", zayif: "Yetim kayıt kontrolü INNER JOIN ile yazılmış; hiçbir şey bulamıyor." },
      { olcut: "Bulgu yorumu", guclu: "Her bulgu 'hata' mı 'inceleme' mi ayrılmış ve kimin kararı belirtilmiş.", zayif: "Her bulgu otomatik 'hata' ilan edilmiş." },
      { olcut: "Pencere fonksiyonları", guclu: "RANK, ROW_NUMBER ve LAG doğru bölüm ve sırayla kullanılmış; NULL ilk ay etiketli.", zayif: "PARTITION BY unutulmuş ya da ilk ayın NULL'u gizlenmiş." },
      { olcut: "Çapraz doğrulama ve sınırlamalar", guclu: "SQL ve Python uyuşuyor; kural kapsamı ve veritabanı farkı dürüstçe yazılı.", zayif: "Tek yoldan sonuç ve 'veri temiz' iddiası var." }
    ],
    savunma: [
      "Yetim kayıt kontrolünü INNER JOIN ile yazsan neden hiçbir şey bulamazdın ve doğru yöntem nedir?",
      "RANK ile ROW_NUMBER arasındaki fark nedir ve ilk sipariş raporunda hangisini neden seçtin?",
      "Dokuz kontrolün hepsi bulgusuz olsaydı 'veri temiz' diyebilir miydin?",
      "LAG'in Ocak için NULL vermesini raporda nasıl ele aldın ve neden gizlemedin?"
    ],
    yetkinlikler: [
      { ad: "Veri kalitesi denetimi", kanit: "Adım 3'teki 9 kontrolün tablosu (4 bulgulu, 5 bulgusuz)." },
      { ad: "Anti-join ve koşullu toplama", kanit: "Adım 3'teki yetim kayıt ve sayım sorguları." },
      { ad: "Pencere fonksiyonları", kanit: "Adım 4'teki RANK, ROW_NUMBER ve LAG raporları." },
      { ad: "Çapraz doğrulama", kanit: "Adım 5'daki SQL ve Python karşılaştırma tablosu." },
      { ad: "Sınırlama bildirme", kanit: "Adım 6'deki sınırlamalar listesi." }
    ],
    telafi: "K1 tutmazsa adım 1 ve 2'de kural tablosunu 9 satıra tamamla ve beklenen sayıları sorgudan önce yaz; K2 tutmazsa dokuz kontrolü tek tek yeniden çalıştır ve bulgulu dört kontrolü (NULL indirim, siparişsiz müşteri, satılmayan ürün, siparişsiz hedef ayı) ayrı sorgularla doğrula; K3 tutmazsa yetim kayıt kontrollerini LEFT JOIN ve IS NULL ile yeniden yaz; K4 tutmazsa RANK sorgusundaki ORDER BY yönünü ve kâr ifadesini kontrol et; K5 tutmazsa ROW_NUMBER'da PARTITION BY musteri_id ve ORDER BY tarih'i yeniden yaz, süzgeci alt sorguya ya da CTE'ye taşı; K6 tutmazsa aylık ciroyu CTE'de yeniden hesapla ve LAG'i ekle; K7 tutmazsa Python'da dört sayıyı yeniden hesapla ve adım 6'ya dön, sınırlamalara kural kapsamı ve veritabanı farkını yaz.",
    sonraki: "Önerilen sonraki adım: aynı denetim ve sıralama raporunu kendi seçtiğin sentetik ya da izinli bir veri setinde yeniden yapmak. Kilit zorlanmaz, sıra bir öneridir."
  });
})(typeof window !== "undefined" ? window : this);

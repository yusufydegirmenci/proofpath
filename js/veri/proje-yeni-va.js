"use strict";
(function (g) {
  var K = g.PP_PROJ = g.PP_PROJ || { tanim: {}, yeni: [], va: [] };
  K.va = K.va || [];

  /* Veri: content/veri-analitigi/seviye0.js içindeki 12 siparişlik sentetik set (siparis_id, tarih, musteri_id, sehir, urun, adet, birim_fiyat, indirim_orani, odeme_turu, iade). */

  K.va.push({
    id: "va0-p1", seviye: 0,
    title: "Veri Sözlüğü: 10 Sütunu Tanı ve Belgele",
    weeks: 1,
    tools: "Tablo programı (Excel veya Google E-Tablolar), Not defteri, SQL ve Python uygulama alanı",
    why: "Bir tabloyu ilk kez açan analist sütunların ne anlama geldiğini bilmeden hesap yaparsa yanlış sonuca varır. Yeni bir ekip arkadaşına verilebilecek tek sayfalık bir veri sözlüğü çıkarırsın.",
    outcome: ["Satır, sütun ve veri türü kavramlarını örnek veriyle anlatırsın", "10 sütunluk bir veri sözlüğü yazarsın", "Boş hücreleri bulup sözlükte not edersin"],
    pitch: "I documented every column of a small sales table in a data dictionary, including types, example values and missing cells.",
    steps: [
      ["Tabloya ilk bakış", "Tablo bir apartman gibidir: her satır bir daire (bir sipariş), her sütun dairelerin ortak özelliği (kat, no, kiracı). İlk iş binayı gezmektir: kaç satır, kaç sütun, her sütun neyi tutuyor.", "Veri setini tablo programına yapıştır. Satır sayısını ve sütun sayısını yaz; sütun adlarını sırayla listele.", "12 satır ve 10 sütunun adlarını gösteren liste", "row = satır, column = sütun, record = kayıt, field = alan", "rows columns records fields table basics"],
      ["Veri türlerini belirle", "Türler hücrenin kabıdır: tam sayı, ondalık sayı, metin, tarih. Kap yanlışsa içindekiyle işlem yapamazsın; metin olarak saklanan bir 'adet' toplanamaz.", "Her sütun için türü tahmin et (tam sayı, ondalık, metin, tarih) ve bir örnek değer yaz. Emin olmadığın sütunu işaretle.", "Sütun, tür, örnek değer olan 10 satırlık tablo", "data type = veri türü, integer = tam sayı, float = ondalık sayı, string = metin, date = tarih", "data types integer float string date explained"],
      ["Sütunun anlamını yaz", "Sütun adı çoğu zaman yetmez: birim_fiyat TL mi, indirimli mi, KDV dahil mi? Sözlük bu soruları yazılı hale getirir; sorusu cevaplanmamış alanı 'bilinmiyor' diye açıkça belirt.", "Her sütun için tek cümlelik anlam yaz. Birimi bilmediğin yerde 'bilinmiyor, veri sahibine sorulacak' yaz.", "Anlam sütunu dolu sözlük; bilinmeyenler işaretli", "data dictionary = veri sözlüğü, definition = tanım, unit = birim, metadata = üst veri", "what is a data dictionary example"],
      ["Boş hücreleri bul ve işaretle", "Boş hücre çürük elma gibidir: bir tane bile ortalamayı ve toplamı etkiler. SQL'de boşluk NULL, Python'da None'dır ve '= boş' ile değil özel ifadeyle aranır.", "SQL ve Python uygulama alanında 'indirim_orani boş olan siparişler' görevini çöz. Çıkan siparis_id değerlerini sözlükte ilgili sütunun yanına 'boş var' diye yaz.", "Sözlükte boş olan sütun ve siparis_id notu", "null = boş değer, missing value = eksik değer, is null = boş mu", "sql is null check python none missing values"],
      ["Sözlüğü sına ve kapat", "Sözlüğün işe yarayıp yaramadığını tek yolla anlarsın: tabloyu hiç görmemiş biri sözlükten sütunu doğru yorumlayabiliyor mu. Yorumlayamıyorsa tanım eksiktir.", "Sözlüğü bir arkadaşa ver ve iki sütunu sözlüğe bakarak anlatmasını iste. Takıldığı yeri sözlükte düzelt.", "Düzeltilmiş sözlük ve bir cümlelik test notu", "peer review = akran incelemesi, clarity = açıklık, documentation = belgeleme", "how to write clear data documentation"]
    ],
    alan: ["va0-2-sql", "va0-2-py"],
    alanNotu: "Uygulama alanında yalnız 'indirim_orani boş olan siparişleri bul' kısmı (adım 4) gerçek çalışıp beklenen değeri veriden hesaplanarak kanıtlanabilir; satır ve sütun sayımı, tür tahmini, sütun anlamları ve akran testi senin kendi araçlarında yapılır ve doğrulanmamıştır.",
    onkosul: ["Önkoşul yok: bir tablo programını açıp yapıştırma yapabildiğini varsayar.", "Veri Analitiği Seviye 0, 2. ders (satır, sütun, veri türleri) ile birlikte ya da sonrasında yapılırsa kolaylaşır."],
    gereksinim: [
      "İşlevsel (zorunlu): Sözlük veri setindeki 10 sütunun tamamını kapsar.",
      "İşlevsel (zorunlu): Her sütun için tür, örnek değer ve tek cümlelik anlam bulunur.",
      "İşlevsel (zorunlu): Boş hücre bulunan sütun ve ilgili siparis_id değeri sözlükte not edilir.",
      "İşlevsel (isteğe bağlı): Her sütun için 'olası değerler' (örneğin odeme_turu için kart, nakit, havale) eklenir.",
      "İşlevsel olmayan: Sözlük tek sayfaya sığar ve veriyi görmemiş biri tarafından okunabilir.",
      "İşlevsel olmayan: Bilinmeyen bilgi tahminle doldurulmaz, 'bilinmiyor' olarak işaretlenir."
    ],
    kabul: [
      "K1: Sözlükte tam 10 sütun satırı vardır | Test: Satırları say ve sütun adlarını veri setinin başlığıyla yan yana karşılaştır.",
      "K2: Her satırda tür, örnek değer ve anlam hücreleri doludur | Test: Boş hücre bırakıp bırakmadığını sözlüğü gözle tarayarak denetle.",
      "K3: Boş hücreli sütun ve siparis_id değeri doğru yazılmıştır | Test: Uygulama alanındaki SQL ve Python çözümünün çıktısı ile sözlükteki not aynıdır.",
      "K4: Bilinmeyen birimler 'bilinmiyor' olarak işaretlidir | Test: birim_fiyat ve indirim_orani satırlarını oku; varsayım yerine açık işaret var mı bak.",
      "K5: Bir arkadaş iki sütunu yalnız sözlüğe bakarak doğru anlatır | Test: Arkadaşın anlatımını not et; yanlış anladığı yer sayısını kanıt notuna yaz."
    ],
    rubrik: [
      { olcut: "Sütun kapsamı", guclu: "10 sütunun tamamı tür, örnek ve anlamla eksiksiz yazılmış.", zayif: "Yalnız sütun adları listelenmiş, tür ve anlam yok." },
      { olcut: "Tür doğruluğu", guclu: "Her türün gerekçesi örnek değerle uyumlu (tarih metin gibi saklansa bile 'tarih' kabul edilmiş ve belirtilmiş).", zayif: "Türler rastgele; adet 'metin' gibi örnekle çelişen satırlar var." },
      { olcut: "Boş hücre tespiti", guclu: "Boş hücreli sütun ve siparis_id uygulama alanı çıktısıyla örtüşüyor.", zayif: "Boş hücre fark edilmemiş ya da 0 ile karıştırılmış." },
      { olcut: "Bilinmeyeni işaretleme", guclu: "Bilinmeyen birim ve anlamlar açıkça 'bilinmiyor' diye yazılmış.", zayif: "Birimler tahminle doldurulmuş ve kesinmiş gibi sunulmuş." },
      { olcut: "Başkası için okunabilirlik", guclu: "Arkadaş testi yapılmış ve sözlük düzeltilmiş.", zayif: "Test yapılmamış; sözlük yalnız yazarın anladığı kısaltmalarla dolu." }
    ],
    savunma: [
      "Sözlükte neden 'anlam' sütununu 'örnek değer' sütunundan ayrı tuttun?",
      "indirim_orani boş olan bir sipariş ile 0 olan bir sipariş neden aynı şey değildir?",
      "Bir sütunun birimini bilmiyorsan sözlüğe ne yazarsın ve bunun hesaplara etkisi ne olur?",
      "12 satırlık sözlük yöntemi 12 milyon satırlık tabloda neden aynı biçimde işlemez?"
    ],
    yetkinlikler: [
      { ad: "Tablo yapısını okuma", kanit: "Adım 1'deki 12 satır ve 10 sütun listesi ile adım 2'deki tür tablosu." },
      { ad: "Veri belgeleme", kanit: "Adım 3'teki anlam sütunu dolu sözlük ve işaretlenmiş bilinmeyenler." },
      { ad: "Eksik veri tespiti", kanit: "Adım 4'teki boş hücreli sütun ve siparis_id notu." }
    ],
    telafi: "K1 ya da K2 tutmazsa adım 1 ve 2'ye dön, tabloyu yeniden say ve tür tablosunu satır satır tamamla; K3 tutmazsa adım 4'te uygulama alanı görevini tekrar çöz, çıktıyı sözlükle karşılaştır; K5 tutmazsa adım 5'te arkadaşın takıldığı tanımı yeniden yaz.",
    sonraki: "Bu proje Veri Analitiği Seviye 0'daki 'iş sorusunu sütunlara çevirme' ve 'veri kalitesi kontrol listesi' projeleri için sözlüğü hazır girdi yapar; K1–K4 tutmalı ve savunma sorularının en az üçünü kendi cümlelerinle cevaplamalısın, tamamlama kanıt kaydı üretir."
  });

  K.va.push({
    id: "va0-p2", seviye: 0,
    title: "İş Sorusunu Sütunlara Çevir: Şikâyetten Analitik Soruya",
    weeks: 1,
    tools: "Not defteri, Tablo programı, SQL ve Python uygulama alanı",
    why: "Yöneticiler 'iadeler çok gibi' der; analist bunu veriyle cevaplanabilir bir soruya ve gereken sütunlara çevirmeden hesap yapamaz. Üç belirsiz şikâyeti ölçülebilir sorulara, sütun listelerine ve ilk sayılara çevirirsin.",
    outcome: ["Belirsiz bir şikâyeti ölçülebilir soruya çevirirsin", "Her soru için gereken sütunları veri setinden eşleştirirsin", "Veri setinde olmayan sütun gerektiren soruyu fark edip işaretlersin"],
    pitch: "I turned vague business complaints into measurable questions, mapped each to the columns it needs and flagged what the data cannot answer.",
    steps: [
      ["Şikâyeti soruya dönüştür", "'Satışlar kötü' demek hastanın 'kendimi kötü hissediyorum' demesi gibidir. Doktor ateş, tansiyon, süre sorar. Analist de dönemi, ölçüyü ve kıyası sorar.", "'İadeler çok', 'Kulaklık iyi satmıyor' ve 'Müşteriler memnun değil' cümlelerinin her birini dönem, ölçü ve kıyas içeren tek bir soruya çevir.", "3 şikâyet ve 3 ölçülebilir soru", "analytical question = analitik soru, metric = metrik, scope = kapsam, baseline = kıyas noktası", "how to turn business problem into analytical question"],
      ["Metrik ve boyutu ayır", "Metrik sayıdır (adet, ciro, iade sayısı); boyut sayıyı kırdığın kategoridir (şehir, ürün, ay). 'Şehre göre ciro' dersen ciro metrik, şehir boyuttur.", "Üç sorunun her biri için metriği ve boyutu ayrı ayrı yaz. Ciro tanımın varsa (adet çarpı birim_fiyat) formülünü de yaz.", "Soru, metrik, boyut sütunlu 3 satırlık tablo", "metric = metrik, dimension = boyut, aggregate = toplulaştırma, KPI = temel performans göstergesi", "metric vs dimension data analysis explained"],
      ["Gereken sütunları eşleştir", "Soru bir tarif, sütunlar malzemedir. Önce malzeme dolabına bak: veri setinin 10 sütunu var; tarifin istediği malzeme o listede yoksa tarif bu dolapla pişmez.", "Her soru için gereken sütunları sütun adıyla yaz. Veri setinde olmayan bir sütun gerekiyorsa 'veride yok' olarak ayrı işaretle.", "Soru başına sütun listesi ve 'veride yok' işaretleri", "column = sütun, schema = şema, missing data = eksik veri, requirement = gereksinim", "map business question to data columns"],
      ["İade sorusunu gerçekten hesapla", "Üç sorudan biri doğrudan sayılabiliyorsa onu hesapla ve başka sorulara dokunma. İade sayısı iade sütunundaki 'evet' satırlarını saymaktır; başka bir koşul eklenmez.", "SQL ve Python uygulama alanında 'iade edilen sipariş sayısı' görevini çöz; simülasyon alanında da aynı sayıyı yaz. Üç sonuç aynı olmalı.", "SQL, Python ve simülasyon sonucu aynı olan sayı", "count = say, filter = filtrele, condition = koşul, result = sonuç", "sql count where condition python len list comprehension"],
      ["Son notu yaz", "Analist soruyu ve sayıyı tek sayfada bir arada sunar: soru, kullanılan sütunlar, sayı ve 'bu veri neyi cevaplayamaz' satırı. Son satır güveni artırır.", "3 soru için tek sayfalık not yaz: soru, sütunlar, hesaplanabildiyse sayı, hesaplanamadıysa neden.", "1 sayfalık soru-sütun-sonuç notu", "summary = özet, limitation = sınır, assumption = varsayım", "how to write analysis summary with limitations"]
    ],
    alan: ["va0-1-sql", "va0-1-py", "va0-sim"],
    alanNotu: "Uygulama alanında yalnız 'iade edilen sipariş sayısı' (adım 4) SQL, Python ve simülasyonla gerçek çalışıp beklenen değeri veriden hesaplanarak kanıtlanabilir; soruyu ölçülebilir yazma, metrik ve boyut ayrımı, sütun eşleştirme ve 'veride yok' kararı senin kendi araçlarında yapılır, doğrulanmamıştır; simülasyon kod çalıştırmaz, yalnız kural tabanlı sayı denetimi yapar.",
    onkosul: ["Önkoşul yok: yalnız veri setinin sütun adlarını okuyabildiğini varsayar.", "Veri Analitiği Seviye 0, 1. ders (analist ne yapar, iş sorusunu analitik soruya çevirmek) bu projenin doğrudan konusudur."],
    gereksinim: [
      "İşlevsel (zorunlu): En az 3 belirsiz şikâyet ölçülebilir soruya çevrilir.",
      "İşlevsel (zorunlu): Her soru için metrik, boyut ve gereken sütun adları yazılır.",
      "İşlevsel (zorunlu): Veri setinde bulunmayan sütun gerektiren en az 1 soru 'veride yok' olarak işaretlenir.",
      "İşlevsel (zorunlu): İade sayısı SQL, Python ve simülasyonda aynı bulunur.",
      "İşlevsel (isteğe bağlı): Bir sorunun hangi ek veriyle cevaplanabileceği yazılır.",
      "İşlevsel olmayan: Her soru dönem, ölçü ve kıyas içerir; 'iyi', 'çok' gibi belirsiz sözcük kalmaz."
    ],
    kabul: [
      "K1: 3 soruda da dönem, ölçü ve kıyas yazılıdır | Test: Her soruyu oku ve bu üç öğeyi işaretle; eksik varsa kanıt notuna yaz.",
      "K2: Her soru için metrik ve boyut ayrı hücrelerde yazılıdır | Test: Tabloya bak; iki sütun da dolu ve birbirinden farklı mı denetle.",
      "K3: Gereken her sütun adı veri setinin 10 sütunundan biriyle birebir aynıdır ya da 'veride yok' olarak işaretlidir | Test: Her adı veri setinin başlık satırıyla karşılaştır.",
      "K4: SQL, Python ve simülasyon aynı iade sayısını verir | Test: Üç alanın kontrol mesajı 'veriyle uyuşuyor' demelidir.",
      "K5: Notta 'bu veri neyi cevaplayamaz' satırı vardır | Test: Notun son satırını oku; en az bir somut örnek içermeli."
    ],
    rubrik: [
      { olcut: "Sorunun ölçülebilirliği", guclu: "Üç soru dönem, ölçü ve kıyas içeriyor; veriyle cevaplanabilir.", zayif: "Sorular 'neden düştü?' gibi veriyle doğrudan cevaplanamayan biçimde kalmış." },
      { olcut: "Metrik ve boyut ayrımı", guclu: "Metrik ve boyut doğru ayrılmış, ciro formülü yazılmış.", zayif: "Boyut ile metrik karıştırılmış (şehir metrik sanılmış)." },
      { olcut: "Sütun eşleştirme", guclu: "Her sütun adı veri setiyle birebir tutuyor, olmayan sütun işaretli.", zayif: "Veride olmayan sütun varmış gibi kullanılmış." },
      { olcut: "İade sayısının tutarlılığı", guclu: "Üç ortamda aynı sayı, sonuç alan kontrolüyle doğrulanmış.", zayif: "Sayılar farklı ya da biri elle tahmin edilmiş." },
      { olcut: "Sınır belirtme", guclu: "Verinin cevaplayamadığı soru gerekçeyle belirtilmiş.", zayif: "Tüm sorular cevaplanabilirmiş gibi sunulmuş." }
    ],
    savunma: [
      "'Müşteriler memnun değil' cümlesini hangi ölçülere böldün ve neden bunları seçtin?",
      "Bir sorunun hangi sütuna ihtiyacı olduğunu bilmeden hesap yapmaya başlarsan ne olur?",
      "İade sayısı sorusu veriyle cevaplanabilirken 'müşteri neden iade etti' neden cevaplanamaz?",
      "Soruyu daha dar (tek şehir, tek ay) yazsaydın cevabın güvenilirliği nasıl değişirdi?"
    ],
    yetkinlikler: [
      { ad: "Soruyu ölçülebilir kılma", kanit: "Adım 1'deki 3 şikâyet ve 3 ölçülebilir soru." },
      { ad: "Metrik ve boyut ayırma", kanit: "Adım 2'deki soru, metrik, boyut tablosu." },
      { ad: "Veriyle eşleştirme ve sınır tespiti", kanit: "Adım 3'teki sütun listesi ve 'veride yok' işaretleri ile adım 5'teki not." },
      { ad: "Basit sayım", kanit: "Adım 4'teki SQL, Python ve simülasyon sonuçlarının aynı olması." }
    ],
    telafi: "K1 ya da K2 tutmazsa adım 1 ve 2'ye dön, her soruya dönem, ölçü ve kıyas ekleyip metrik ile boyutu yeniden ayır; K3 tutmazsa adım 3'te her sütun adını başlık satırıyla yeniden karşılaştır; K4 tutmazsa adım 4'te iade sütunundaki 'evet' koşulunu yeniden kur ve üç ortamı yeniden çalıştır.",
    sonraki: "Bu proje 'veri neyi desteklemiyor yorum notu' projesinin girdisini (soru ve sütun eşlemesi) hazırlar; K1–K4 tutmalı ve savunma sorularından en az üçünü cevaplamalısın, tamamlama kanıt kaydı üretir."
  });

  K.va.push({
    id: "va0-p3", seviye: 0,
    title: "Veri Kalitesi Kontrol Listesi: Hesaptan Önce Denetle",
    weeks: 1,
    tools: "Tablo programı, SQL ve Python uygulama alanı, Not defteri",
    why: "Veride tekrar eden satır ya da boş hücre varsa toplam ve ortalama sessizce yanlış çıkar. Hesaptan önce çalıştıracağın, her maddesi sayıyla cevaplanan bir kontrol listesi yazarsın.",
    outcome: ["Tekrar eden kayıtları ve boş hücreleri sayıyla tespit edersin", "Kontrol listesini maddeler halinde yazıp sonuçlarını işaretlersin", "Bir hatalı veri durumunun sonucu nasıl bozduğunu gösterirsin"],
    pitch: "I wrote a data quality checklist for a sales table and used SQL and Python to count duplicates and missing values.",
    steps: [
      ["Kalite sorularını yaz", "Veri kalitesi, yemek yapmadan önce malzemeyi kontrol etmektir: bayat mı, eksik mi, iki kere mi alınmış. Her kontrol evet veya hayır diye cevaplanabilen bir soru olmalı.", "En az 5 kontrol sorusu yaz: tekrar var mı, boş hücre var mı, tarih biçimi aynı mı, iade yalnız evet veya hayır mı, adet pozitif mi.", "5 maddelik kontrol sorusu listesi", "data quality = veri kalitesi, duplicate = tekrar kayıt, completeness = eksiksizlik, validity = geçerlilik", "data quality checklist completeness validity duplicates"],
      ["Tekrarı sayıyla bul", "Aynı sipariş iki kez girilirse toplam ciro şişer. Tekrar kontrolü iki sayı karşılaştırır: toplam satır ve benzersiz kimlik sayısı. Eşitse tekrar yoktur.", "SQL ve Python uygulama alanında 'toplam satır ve benzersiz siparis_id sayısı' görevini çöz. Sonucu listedeki 'tekrar var mı' maddesinin yanına yaz. Alan, tekrar eklenmiş değiştirilmiş veriyle de kontrol eder.", "Toplam ve benzersiz sayı; tekrar var mı cevabı", "distinct = benzersiz, count = say, primary key = birincil anahtar, deduplicate = tekrarı ayıklamak", "sql count distinct duplicates python set len"],
      ["Boş hücreyi sayıyla bul", "Boş hücre 'sıfır' demek değildir: bilinmiyor demektir. Ortalamada boşu 0 saymak sonucu aşağı çeker. Önce kaç tane boş olduğunu ve hangi satırda olduğunu bilmelisin.", "SQL ve Python alanında 'indirim_orani boş olan siparis_id değerleri' görevini çöz. Sonucu 'boş hücre var mı' maddesinin yanına yaz.", "Boş hücreli siparis_id listesi", "null = boş değer, missing = eksik, imputation = doldurma, is null = boş mu", "sql is null python none missing values handling"],
      ["Elle denetlenecek maddeleri kontrol et", "Her kontrolü otomatik sayı olarak yazamazsın; tarih biçimi ve iade değerlerini gözle ya da tablo programının süzgeciyle denetlersin. Bu kısım senin sorumluluğundadır.", "Kalan maddeleri tablo programında süzgeçle ya da sıralamayla kontrol et. Her madde için 'geçti', 'kaldı' ya da 'denetlenemedi' yaz.", "Her maddesi işaretli 5 satırlık kontrol listesi", "filter = süzgeç, sort = sırala, validation = doğrulama, range check = aralık kontrolü", "excel filter sort check data validity"],
      ["Hatalı verinin sonucu nasıl bozduğunu göster", "Kontrol listesine neden gerek var sorusunun cevabı bir sayıdır. Bir satırı tekrar ettiğinde toplam adet değişir; bunu sayıyla gösterirsen liste ciddiye alınır.", "Veri setinde bir sipariş satırını kopyala ve toplam adedi önce-sonra yaz. Farkı bir cümleyle açıkla.", "Önce ve sonra toplam adet, tek cümle yorum", "impact = etki, before and after = önce ve sonra, error = hata", "impact of duplicate rows on sum"]
    ],
    alan: ["va0-3-sql", "va0-3-py", "va0-2-sql", "va0-2-py"],
    alanNotu: "Uygulama alanında yalnız 'toplam satır ve benzersiz siparis_id sayısı' (adım 2) ile 'indirim_orani boş olan siparişler' (adım 3) SQL ve Python ile gerçek çalışıp beklenen değeri veriden hesaplanarak kanıtlanabilir; kontrol sorularını yazma, tarih biçimi, iade değeri ve adet kontrolleri ile önce-sonra etkisi senin kendi araçlarında yapılır ve doğrulanmamıştır.",
    onkosul: ["Önkoşul yok: tabloda satır ve sütun kavramını bildiğini varsayar.", "Veri Analitiği Seviye 0, 3. ders (veri sözlüğü, veri kalitesi) ile birlikte ya da sonrasında yapılmalı; ayrıca 'Veri Sözlüğü' projesindeki sözlük işini kolaylaştırır."],
    gereksinim: [
      "İşlevsel (zorunlu): En az 5 kontrol sorusu evet-hayır cevaplanabilir biçimde yazılır.",
      "İşlevsel (zorunlu): Tekrar kayıt kontrolü toplam satır ve benzersiz kimlik sayısıyla yapılır.",
      "İşlevsel (zorunlu): Boş hücre kontrolü, boş olan siparis_id değerlerini listeler.",
      "İşlevsel (zorunlu): Her madde 'geçti', 'kaldı' ya da 'denetlenemedi' olarak işaretlenir.",
      "İşlevsel (isteğe bağlı): Kalan her madde için önerilen düzeltme yazılır.",
      "İşlevsel olmayan: Liste başka bir veri setine uygulanabilecek kadar genel yazılır, tek tablo adına bağlı olmaz."
    ],
    kabul: [
      "K1: Listede en az 5 evet-hayır sorusu vardır | Test: Her maddeyi oku ve 'evet' ya da 'hayır' ile cevaplanıp cevaplanmadığına bak.",
      "K2: Toplam satır 12 ve benzersiz kimlik 12 bulunur ya da fark açıklanır | Test: Uygulama alanı çıktısını liste notundaki sayıyla karşılaştır.",
      "K3: Boş hücreli siparis_id listesi uygulama alanı çıktısıyla aynıdır | Test: SQL ve Python çıktılarını yan yana koy ve kümeleri karşılaştır.",
      "K4: Her madde üç durumdan biriyle işaretlidir | Test: İşaretsiz madde var mı satır satır say.",
      "K5: Önce-sonra toplam adet farkı yazılı ve doğrudur | Test: Kopyalanan satırın adet değerini eski toplama ekleyerek hesabı elle tekrar et."
    ],
    rubrik: [
      { olcut: "Kontrol sorularının denetlenebilirliği", guclu: "Her soru evet-hayır cevaplı ve sayıyla ya da gözle denetlenebilir.", zayif: "'Veri iyi mi?' gibi cevaplanamayan sorular." },
      { olcut: "Tekrar kontrolü", guclu: "Toplam ve benzersiz sayı iki ortamda aynı ve yorumu doğru.", zayif: "Tekrar yalnız gözle arandı, sayı yok." },
      { olcut: "Boş hücre kontrolü", guclu: "Boş hücreli kimlikler listelenmiş ve 0 ile karıştırılmamış.", zayif: "Boş hücre sayılmamış ya da 0 sayılmış." },
      { olcut: "Dürüst işaretleme", guclu: "Denetlenemeyen madde 'denetlenemedi' diye işaretlenmiş.", zayif: "Tüm maddeler denetlenmeden 'geçti' yazılmış." },
      { olcut: "Etkinin gösterimi", guclu: "Önce-sonra toplam adet farkı hesaplı ve doğru.", zayif: "Etki söylenmiş ama sayıyla gösterilmemiş." }
    ],
    savunma: [
      "Toplam satır ile benzersiz kimlik sayısı eşitse tekrar kesinlikle yoktur diyebilir misin, neden?",
      "Boş indirim_orani değerini 0 saymak ile satırı dışlamak ciroyu nasıl farklı etkiler?",
      "Kontrol listesine bir madde daha ekleseydin hangisini eklerdin ve nasıl denetlerdin?",
      "Bir kontrol 'denetlenemedi' çıktığında analize devam etmek doğru mu, hangi koşulla?"
    ],
    yetkinlikler: [
      { ad: "Kalite ölçütü tanımlama", kanit: "Adım 1'deki 5 maddelik evet-hayır kontrol listesi." },
      { ad: "Tekrar ve eksik veri tespiti", kanit: "Adım 2'deki toplam ve benzersiz sayı ile adım 3'teki boş hücre listesi." },
      { ad: "Dürüst raporlama", kanit: "Adım 4'teki 'geçti', 'kaldı', 'denetlenemedi' işaretleri." },
      { ad: "Hatanın etkisini gösterme", kanit: "Adım 5'teki önce-sonra toplam adet farkı." }
    ],
    telafi: "K2 ya da K3 tutmazsa adım 2 ve 3'e dön, uygulama alanı görevlerini yeniden çöz ve çıktıyı listeyle karşılaştır; K4 tutmazsa adım 4'te her maddeyi tek tek yeniden işaretle; K5 tutmazsa adım 5'te kopyaladığın satırı ve toplamı elle yeniden hesapla.",
    sonraki: "Bu proje 'veri neyi desteklemiyor yorum notu' projesinin kalite başlığı için temel olur; K1–K4 tutmalı ve savunma sorularının en az üçünü kendi cümlelerinle cevaplamalısın, tamamlama kanıt kaydı üretir."
  });

  K.va.push({
    id: "va0-p4", seviye: 0,
    title: "Veri Neyi Desteklemiyor: Sınırları Yazan Yorum Notu",
    weeks: 2,
    tools: "Not defteri, Tablo programı, SQL uygulama alanı",
    why: "12 siparişlik bir tablodan çıkan sayı güçlü görünür ama çok az veriye dayanır; analist hem sayıyı hem de 'bu sayı neyi söylemez' kısmını yazmalıdır. Karar vericiye giden tek sayfalık, sınırları açık bir yorum notu yazarsın.",
    outcome: ["Bir sayıyı verinin desteklediği ve desteklemediği cümlelere ayırırsın", "Sebep sorusu ile betimleme sorusunu ayırt edersin", "Küçük örneklemin sınırını açıkça yazarsın"],
    pitch: "I wrote a one-page interpretation note that separates what a small sales table supports from what it cannot show.",
    steps: [
      ["Tek bir sayıyı hesapla", "Yorum sayıyla başlar; sayı yanlışsa yorum boşa gider. Küçük ve kesin bir sayı seç: iade edilen sipariş sayısı ya da toplam sipariş sayısı.", "SQL uygulama alanında 'iade edilen sipariş sayısı' görevini çöz. Sayıyı ve toplam sipariş sayısını yaz.", "İade sayısı ve toplam sipariş sayısı", "count = say, total = toplam, baseline = kıyas noktası", "sql count rows where condition"],
      ["İfadeyi iki kovaya ayır", "Veri 'ne olduğunu' gösterir, 'neden olduğunu' göstermez. Tarlada çıkan ürünü görürsün ama yağmurun mu gübrenin mi etkisi olduğunu görmezsin. Cümleleri iki kovaya ayır: veri bunu söylüyor, veri bunu söylemiyor.", "İade sayısı için 3 cümle yaz: 2'si veriyle desteklenen (sayı, oran), 1'i veriyle desteklenmeyen (neden). Her cümleyi hangi kovaya koyduğunu işaretle.", "İki kovalı 3 cümlelik tablo", "descriptive = betimleyici, causal = nedensel, correlation = ilişki, claim = iddia", "correlation vs causation explained simple"],
      ["Örneklem sınırını yaz", "Yazı-tura on kez atıp yedi yazı gelmesi paranın hileli olduğunu kanıtlamaz. 12 sipariş küçüktür; bir siparişin değişmesi oranı çok oynatır. Sınırı sayıyla göster.", "İade sayısının toplam siparişe oranını yaz. Bir siparişin iadesinin değişmesi sayıyı kaç puan oynatırdı? Hesabı not et ve 'küçük örneklem' uyarısı ekle.", "Oran, bir sipariş değişince oran farkı, uyarı cümlesi", "sample size = örneklem büyüklüğü, margin = pay, small sample = küçük örneklem, limitation = sınır", "small sample size limitations data analysis"],
      ["Veride olmayan bilgiyi listele", "Veri setinde iade nedeni, müşteri yaşı ya da stok yok. Bunlar olmadan 'ürün kötü' ya da 'müşteri memnuniyetsiz' denemez. Eksik sütunları açıkça yaz.", "Verinin 10 sütununa bakarak yorum için gereken ama bulunmayan en az 3 bilgiyi yaz ve her biri için hangi cümleyi yazmanı engellediğini belirt.", "En az 3 eksik bilgi ve engellediği cümle", "missing information = eksik bilgi, assumption = varsayım, data source = veri kaynağı", "what data is missing analysis limitations"],
      ["Yorum notunu birleştir", "Karar verici notu 30 saniyede tarar. Sıralama şöyledir: sayı, ne söylüyor, ne söylemiyor, hangi ek veriyle ilerlenir. Süs yok, tek sayfa.", "Tek sayfalık not yaz: sayı, 2 destekli cümle, 1 desteksiz cümle, örneklem uyarısı, 3 eksik bilgi.", "1 sayfalık yorum notu", "interpretation = yorum, executive summary = yönetici özeti, caveat = çekince", "how to write data interpretation note caveats"]
    ],
    alan: ["va0-1-sql"],
    alanNotu: "Uygulama alanında yalnız 'iade edilen sipariş sayısı' (adım 1) SQL ile gerçek çalışıp beklenen değeri veriden hesaplanarak kanıtlanabilir; destekli ve desteksiz cümle ayrımı, örneklem sınırı hesabı, eksik bilgi listesi ve yorum notunun kalitesi senin kendi araçlarında yapılır, doğrulanmamıştır ve ancak savunma sorularıyla sınanır.",
    onkosul: ["Önkoşul yok: temel bir sayım yapabildiğini varsayar.", "Veri Analitiği Seviye 0, 3. ders (yorum sınırları) bu projenin konusudur; 'İş Sorusunu Sütunlara Çevir' projesi soru yazma becerisini hazırlar."],
    gereksinim: [
      "İşlevsel (zorunlu): Notta iade sayısı ve toplam sipariş sayısı yer alır.",
      "İşlevsel (zorunlu): En az 2 veriyle desteklenen ve 1 veriyle desteklenmeyen cümle iki ayrı başlıkta bulunur.",
      "İşlevsel (zorunlu): İade oranı ve bir siparişin oranı kaç puan oynattığı hesaplanarak yazılır.",
      "İşlevsel (zorunlu): Veride bulunmayan en az 3 bilgi ve her birinin engellediği cümle listelenir.",
      "İşlevsel (isteğe bağlı): Notun sonuna 'sonraki adım için gereken ek veri' önerisi eklenir.",
      "İşlevsel olmayan: Not tek sayfadır ve teknik terimleri bilmeyen biri tarafından okunabilir."
    ],
    kabul: [
      "K1: İade sayısı ve toplam sipariş sayısı veriyle uyumludur | Test: SQL çıktısını nottaki sayıyla karşılaştır; tablo programında iade sütununu süzerek elle say.",
      "K2: Her destekli cümle bir sayıya dayanır, desteksiz cümle 'neden' içerir | Test: Her cümlenin yanına dayandığı sütun adını yaz; yazamadığın cümle desteksiz kovasına gitmeli.",
      "K3: Oran ve bir siparişin oynattığı puan hesabı doğrudur | Test: Hesabı elle ve hesap makinesiyle iki kez yap, sonuçları kanıt notuna yaz.",
      "K4: En az 3 eksik bilgi, her biri bir cümleyi engellediğini belirterek yazılmıştır | Test: Her satırı oku; 'engellediği cümle' alanı boş olan var mı say.",
      "K5: Notta nedensellik iddiası yoktur | Test: Notta 'çünkü' ve 'neden olarak' sözcüklerini ara; bulduğun cümle veriyle desteklenmeyen kovada olmalı."
    ],
    rubrik: [
      { olcut: "Sayının doğruluğu", guclu: "İade ve toplam sayısı SQL çıktısı ve elle sayımla uyuşuyor.", zayif: "Sayı veriden değil varsayımdan alınmış." },
      { olcut: "Destekli ve desteksiz ayrımı", guclu: "Her cümle doğru kovada ve dayandığı sütun belirtilmiş.", zayif: "Neden cümlesi destekli kovada yazılmış." },
      { olcut: "Örneklem sınırı", guclu: "Bir siparişin oranı kaç puan oynattığı sayıyla gösterilmiş.", zayif: "'Veri az' denmiş ama sayı yok." },
      { olcut: "Eksik bilgi analizi", guclu: "3 eksik bilgi ve engelledikleri cümleler somut.", zayif: "Genel bir 'daha fazla veri lazım' cümlesi." },
      { olcut: "Okunabilirlik", guclu: "Tek sayfada sayı, destek, sınır, eksik bilgi sıralı.", zayif: "Dağınık, teknik terimle dolu uzun metin." }
    ],
    savunma: [
      "İade sayısı artarsa bunun nedeninin ürün kalitesi olduğunu neden söyleyemezsin?",
      "12 sipariş yerine 1200 sipariş olsaydı hangi cümlen güçlenir, hangisi hâlâ desteksiz kalırdı?",
      "Karar verici 'yani ürün kötü mü?' derse ne cevap verirsin ve neden?",
      "Notun hangi cümlesini silsen daha güvenli olurdu, hangisini silsen yanıltıcı olurdu?"
    ],
    yetkinlikler: [
      { ad: "Sayıyı doğru üretme", kanit: "Adım 1'deki SQL ile bulunan iade ve toplam sipariş sayısı." },
      { ad: "Betimleme ile neden iddiasını ayırma", kanit: "Adım 2'deki iki kovalı cümle tablosu." },
      { ad: "Sınırı sayıyla gösterme", kanit: "Adım 3'teki oran ve bir siparişin oynattığı puan hesabı." },
      { ad: "Karar vericiye yazılı iletişim", kanit: "Adım 5'teki 1 sayfalık yorum notu." }
    ],
    telafi: "K1 tutmazsa adım 1'de SQL görevini yeniden çöz ve iade sütununu elle say; K2 ya da K5 tutmazsa adım 2'ye dön, her cümlenin dayandığı sütunu yeniden yaz ve neden cümlelerini desteksiz kovaya taşı; K3 tutmazsa adım 3'te oranı ve puan farkını yeniden hesapla; K4 tutmazsa adım 4'te 10 sütunu yeniden oku ve eksik bilgileri yeniden belirle.",
    sonraki: "Bu proje Veri Analitiği Seviye 0'ın son projesidir ve Seviye 1'e geçişte yorum notu bu notla aynı biçimde istenecektir; K1–K5'in tutması ve savunma sorularının en az üçünün cevaplanması gerekir, tamamlama kanıt kaydı üretir."
  });
})(window);

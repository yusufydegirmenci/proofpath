/* Veri Analitiği · Seviye 1 (Elektronik tablolar): 3 ders (M§7'nin 15 öğesi), değerlendirme.
   ÖNEMLİ: Uygulama elektronik tabloyu GERÇEKTEN çalıştırmaz. `sim` alanları yazdığın formül metnini kural tabanlı denetler;
   SQL/Python alanları "aynı işin SQL/Python karşılığı"dır. Türkçe işlev adları (ETOPLA, EĞERSAY, DÜŞEYARA, KIRP...) yerel ayara göre değişir;
   ayırıcı (`,` ya da `;`) da yerel ayara bağlıdır. Veri SENTETİKTİR. Sayılar VA.veri (12 sipariş) ve VA.veriKirli (13 satır) tablolarından hesaplanmıştır. */
(function () {
  var VA = (window.PP_VA = window.PP_VA || {});
  VA.dersler = VA.dersler || [];

  VA.dersler.push(
    {
      id: "va1-1", seviye: 1, ad: "Hücre, veri türü, formül, koşullu fonksiyonlar, aramalar, tarih ve metin",
      hedefler: [
        "Hücre başvurusu ve temel formülle bir siparişin brüt ve net tutarını hesaplamak",
        "EĞER, ETOPLA ve EĞERSAY ile koşullu toplam/sayım; DÜŞEYARA ya da XLOOKUP ile arama yapmak",
        "Metin sayı, sonda boşluk ve karışık tarih gibi tutarsız hücreleri KIRP/DEĞER gibi işlevlerle düzeltip yaptığın dönüşümü gerekçesiyle açıklamak"
      ],
      onkosul: "Seviye 0 (satır, sütun, veri türü, eksik değer). Elektronik tablo uygulaman (Excel, Google E-Tablolar, LibreOffice Calc) varsa formülleri orada dene; yoksa kâğıt üzerinde de çalışabilirsin.",
      aciklama: "Elektronik tabloda her hücrenin adı vardır (sütun harfi + satır no: F2). Formül '=' ile başlar ve başka hücrelere başvurur: =F2*G2 bir siparişin brüt tutarıdır. Aralık (E2:E13), bir sütundaki hücre dizisidir. Koşullu işlevler aralıkta ölçüte uyanları toplar/sayar: EĞERSAY (COUNTIF) sayar, ETOPLA (SUMIF) toplar, EĞER (IF) tek hücrede karar verir. DÜŞEYARA (VLOOKUP) ve XLOOKUP bir anahtarı başka bir listede bulup yanındaki değeri getirir. Veri, formülün beklediği türde değilse (metin sayı, sonda boşluk, farklı tarih biçimi) sonuç sessizce yanlış olur: önce temizle, sonra hesapla. Bu derste Seviye 0'daki 12 siparişlik tabloyu A1'den başlayacak biçimde düşün: A siparis_id, B tarih, C musteri_id, D sehir, E urun, F adet, G birim_fiyat, H indirim_orani, I odeme_turu, J iade; veri satırları 2–13. DİKKAT: Uygulama formülü çalıştırmaz; alan görevinde formülünü ve elle/uygulamada bulduğun sonucu yazarsın, kural tabanlı denetim formül biçimine ve sonuca bakar. Türkçe işlev adları ve ';' ayırıcısı yerel ayara göre değişir: İngilizce ad ve ',' de kabul edilir.",
      terimler: [
        ["Hücre başvurusu", "F2 göreli, $F$2 mutlak başvurudur; formül kopyalanınca göreli olan kayar, mutlak olan sabit kalır."],
        ["Aralık", "E2:E13 gibi bir hücre dizisi; koşullu işlevlerde ölçüt aralığı ve toplam aralığı aynı boyda olmalıdır."],
        ["EĞER (IF)", "Koşula göre iki değerden birini döndürür: =EĞER(J2=\"evet\";\"iade\";\"geçerli\")."],
        ["ETOPLA (SUMIF)", "Ölçüte uyan satırların bir sütununu toplar: ETOPLA(ölçüt_aralığı; ölçüt; toplam_aralığı)."],
        ["EĞERSAY (COUNTIF)", "Ölçüte uyan hücre sayısını verir: EĞERSAY(D2:D13;\"Ankara\")."],
        ["DÜŞEYARA (VLOOKUP) / XLOOKUP", "Anahtarı listede bulup yanındaki değeri getirir; tam eşleşme için son bağımsız değişken YANLIŞ (FALSE/0). XLOOKUP yalnız bazı yeni sürümlerde vardır."],
        ["KIRP (TRIM) / DEĞER (VALUE)", "KIRP baştaki ve sondaki fazla boşlukları siler; DEĞER sayı gibi görünen metni sayıya çevirir."],
        ["Yerel ayar", "Türkçe işlev adları ve ';' ayırıcısı ayara göre değişir; aynı formülün İngilizce ve ',' ile yazılmışı başka bilgisayarda gerekebilir."]
      ],
      ornek: [
        "Satır tutarı: S001 (2 kulaklık × 450) brüt =F2*G2 → 900; indirimli =F2*G2*(1-H2) → 810 (indirim 0,10).",
        "Boş hücre tuzağı: S007'nin H8 hücresi boş. =F8*G8*(1-H8) → 500 çıkar, çünkü formülde boş hücre 0 sayılır: sessizce 'indirim yok' varsayılmış olur. Bu varsayımı rapora yazmak gerekir.",
        "EĞERSAY: =EĞERSAY(J2:J13;\"evet\") → 2 iade; =EĞERSAY(D2:D13;\"Ankara\") → 4 sipariş. ETOPLA: =ETOPLA(E2:E13;\"Kulaklık\";F2:F13) → 9 adet kulaklık (2+1+4+2).",
        "DÜŞEYARA: ürün listesi L2:M5 (Kulaklık 450, Klavye 800, Fare 250, Monitör 4200). =DÜŞEYARA(\"Monitör\";L2:M5;2;YANLIŞ) → 4200. Son bağımsız değişkeni DOĞRU bırakırsan liste sıralı değilse yanlış satır gelebilir.",
        "Tarih: B7 (S006, 2026-02-09) gerçek tarihe çevrilmişse =AY(B7) → 2 (Şubat). 12 siparişin 4'ü Şubat'tadır (S005–S008). Metin olarak kalmışsa AY çalışmaz.",
        "Temizleme (VA.veriKirli, K04 hücresi): şehir 'İstanbul ' (sonda boşluk). =KIRP(C5) → 'İstanbul'. K05'in adedi '2 adet' metin: =DEĞER(SOLDAN(E6;1)) → 2. Dönüşüm günlüğü satırı: hücre C5 | önce 'İstanbul ' | sonra 'İstanbul' | formül KIRP | neden: özet tabloda 'İstanbul ' ayrı grup olur.",
        "İsteğe bağlı SQL/Python karşılığı: bu dersin uygulama alanındaki Python alanı aynı işin SQL/Python karşılığıdır ve Seviye 2/4'te öğrenilen araçların ön izlemesidir; zorunlu değildir, bu dersin asıl çıktısı elektronik tablo çözümüdür. Elektronik tablo alanı (sim) kural tabanlıdır, tablo gerçekten çalıştırılmaz."
      ],
      analoji: { a: "Hesap makinesi + kayıt defteri: formül, defterdeki satırlara bakıp kendi hesabını yapan hesap makinesidir.", sinir: "Hesap makinesi sana 'bu sayı metin' demez; elektronik tablo metin sayıyı çoğu zaman sessizce atlar ya da hata verir. Temizliği sen yaparsın." },
      gorsel: "A1 siparis_id | B tarih | ... | D sehir | E urun | F adet | G birim_fiyat | H indirim_orani | I odeme | J iade\nSatır 2..13 (12 sipariş)    =ETOPLA(E2:E13;\"Kulaklık\";F2:F13)  →  9\nKirli tablo: K04 'İstanbul ' --KIRP--> 'İstanbul'   K05 '2 adet' --DEĞER(SOLDAN(..;1))--> 2",
      rehberli: [
        "Çözümlü: S001'in brüt ve net tutarını F2 ve G2 hücreleriyle yaz; 900 ve 810 bulmalısın.",
        "ETOPLA ile ürün bazında adet toplamını kur (Klavye, Fare, Monitör için de); toplamların 9, 4, 6, 2 olduğunu doğrula.",
        "TEMİZLEME (rehberli): VA.veriKirli'de K04 şehri, K05 adedi ve K12 ürünü ('fare') için birer düzeltme formülü yaz; her biri için günlük satırını doldur: hücre | önce | sonra | formül | neden. 'Neden' sütununu 'özet tabloda ayrı grup oluşur' gibi somut yaz.",
        "Alan: ETOPLA formülünü ve bulduğun sayıyı simülasyon alanına yaz; aynı işi Python alanında listeyle yap."
      ],
      bagimsiz: "TEMİZLEME GÖREVİ (bağımsız): VA.veriKirli tablosunu (13 satır) kendi elektronik tablonda aç. (1) Şehir, ürün ve adet sütunlarındaki tutarsızlıkları KIRP, DEĞER, EĞER ve gerekirse eşleme listesiyle (DÜŞEYARA) düzelt. (2) En az 4 dönüşümü günlüğe yaz: hücre | önce | sonra | formül/işlem | neden | varsayım var mı. (3) Düzeltme sonrası şehir başına brüt ciro hesapla ve sonucu temiz VA.veri ile karşılaştır; fark varsa nedenini açıkla. Boş fiyat (K07) ve karışık tarih (K08) için ne yaptığını ve neden yaptığını bir cümleyle belirt. Bu tabloda gerçek tarih/sayı dönüşümünü uygulamada sen yaparsın; uygulama bunu çalıştırmaz.",
      hatalar: [
        ["Metin sayıyı ('2 adet') sayı sanmak", "DEĞER/SOLDAN ile sayıya çevir ya da kaynağı düzelt; çevirdiğini günlüğe yaz."],
        ["Boş hücrenin formülde 0 sayıldığını fark etmemek (S007 indirimi)", "Boşu ayrıca say ya da varsayımı rapora yaz; sessiz 0 yorumu bozar."],
        ["DÜŞEYARA'da tam eşleşme için YANLIŞ yazmamak", "Ürün adı gibi etiket aramalarında son bağımsız değişken YANLIŞ (0) olsun."],
        ["Ölçüt aralığı ile toplam aralığını farklı boyda seçmek", "ETOPLA'da E2:E13 ve F2:F13 gibi aynı satır sayısını kullan."]
      ],
      kontrol: [
        { q: "=ETOPLA(E2:E13;\"Kulaklık\";F2:F13) formülü bu 12 siparişlik tabloda ne döndürür?", o: ["4", "12", "9", "3735"], a: 2, why: "Kulaklık satırlarının adetleri 2+1+4+2 = 9.", bolum: "ornek" },
        { q: "=EĞERSAY(D2:D13;\"Ankara\") kaç döndürür?", o: ["4", "3", "2", "5"], a: 0, why: "Ankara siparişleri: S002, S005, S007, S011.", bolum: "ornek" },
        { q: "Ürün adına göre fiyat çekerken DÜŞEYARA'nın son bağımsız değişkeni ne olmalı?", o: ["DOĞRU (yaklaşık eşleşme)", "YANLIŞ (tam eşleşme)", "Boş bırakılmalı", "Sütun sayısı"], a: 1, why: "Etiket aramasında tam eşleşme gerekir; yaklaşık eşleşme sıralı liste varsayar.", bolum: "terimler" },
        { q: "S007'de indirim hücresi boşken =F8*G8*(1-H8) 500 verir. Doğru yorum?", o: ["Formül hata verir", "Boş hücre 0 sayıldı: indirimsiz varsayıldı; bu varsayım yazılmalı", "Sonuç kesin doğrudur", "Satır silinmelidir"], a: 1, why: "Boş = bilinmiyor, formül ise 0 sayar; sessiz varsayım raporda belirtilmeli.", bolum: "hatalar" },
        { q: "'İstanbul ' (sonda boşluk) düzeltmek için hangi işlev uygun?", o: ["EĞERSAY", "DÜŞEYARA", "KIRP", "AY"], a: 2, why: "KIRP baştaki/sondaki fazla boşlukları siler.", bolum: "terimler" }
      ],
      gecme: { olcut: "Bilgi kontrolünde %80; bağımsız görevde en az 4 dönüşümlük günlük (önce/sonra/formül/neden) ve alanda koşullu formül görevinin kural denetimini geçmek.", kritik: ["Metin sayı ya da boş hücreyi fark etmeden hesaplamak", "Veriyi neden değiştirdiğini açıklamadan düzeltmek"] },
      kaynaklar: [{ t: "Microsoft: XLOOKUP işlevi", u: "https://support.microsoft.com/en-us/office/xlookup-function-b7fd680e-6d10-43e6-84f9-88eae8bf5929", dogrulama: "2026-10-18", neden: "Anahtarla arama yapan XLOOKUP'ın resmî açıklaması (Excel)." }, { t: "Microsoft: SUMIF işlevi", u: "https://support.microsoft.com/en-us/office/sumif-function-169b8c99-c05c-4483-a712-1697a653039b", dogrulama: "2026-10-18", neden: "Koşullu toplamın (ETOPLA karşılığı) resmî söz dizimi." }, { t: "Google E-Tablolar işlev listesi", u: "https://support.google.com/docs/table/25273", dogrulama: "2026-10-18", neden: "Google E-Tablolar'daki tüm işlevlerin listesi; Excel'siz çalışanlar için." }],
      telafi: "ETOPLA ve EĞERSAY'ı 12 siparişlik tabloda elle bir kez daha hesapla (Kulaklık adedi 9, Ankara siparişi 4); sonra kirli tablodan tek bir hücre seçip önce/sonra/formül/neden dörtlüsünü yaz.",
      sonraki: "Sıradaki ders: sıralama, filtre, tekrar, eksik değer ve doğrulama (temizleme) — aynı kirli tabloyu bütünüyle temizleyeceksin."
    },
    {
      id: "va1-2", seviye: 1, ad: "Sıralama, filtre, tekrar, eksik değer ve doğrulama (temizleme)",
      hedefler: [
        "Kirli tabloda kopya satır, metin sayı, farklı şehir yazımı, boş fiyat ve karışık tarih biçimini tespit etmek",
        "Her tutarsızlık için temizleme kararı (düzelt, doldur, hariç tut) verip varsayımı yazmak",
        "Veri doğrulama kuralı ve dönüşüm günlüğüyle temizliği tekrarlanabilir yapmak"
      ],
      onkosul: "Ders va1-1 (formül, KIRP, DEĞER, EĞERSAY) ve Seviye 0 veri kalitesi.",
      aciklama: "Gerçek veri nadiren temizdir. Elimizdeki VA.veriKirli tablosu 13 satırdır (kayit_no, tarih, sehir, urun, adet, fiyat, odeme) ve beş tür tutarsızlık taşır: (1) K10 iki kez girilmiş (kopya satır); (2) K05'in adedi '2 adet' metin; (3) şehir yazımları karışık: İstanbul, 'İstanbul ' (sonda boşluk), IST, ankara, Ankara, İzmir; ürün 'fare' küçük harfli; (4) K07'nin fiyatı boş; (5) K08'in tarihi '21.02.2026' biçiminde, diğerleri 2026-MM-GG. Temizlik adımları: önce ham tabloyu koru (kopyasını al), sorunları say, her sorun için karar ver, dönüşümü günlüğe yaz, sonuçta sayım/toplam çapraz kontrolü yap. Sıralama ve filtre temizlik için keşif aracıdır: tarihi metin sıralarsan K08 yanlış yere düşer; fiyat sütununu artan sıralayınca boşlar kenara gider. Veri doğrulama (liste, tam sayı, aralık) hatayı girişte önler. DİKKAT: elektronik tablo bu uygulamada çalışmaz; SQL ve Python alanları aynı işin karşılığıdır, sim alanı kural tabanlıdır.",
      terimler: [
        ["Kopya satır", "Aynı kaydın birden çok girilmesi (K10); toplamı şişirir."],
        ["Eksik değer", "Boş hücre (K07 fiyatı); doldur, hariç tut ya da bildir — kararı yaz."],
        ["Tutarsız yazım", "Aynı şeyin farklı yazımı (İstanbul / 'İstanbul ' / IST); gruplarken ayrı grup yaratır."],
        ["Metin sayı", "Sayı gibi görünen ama metin olan hücre ('2 adet'); aritmetikte hata ya da sessiz atlama."],
        ["Veri doğrulama", "Hücreye girilebilecek değeri sınırlayan kural (şehir listesi, adet ≥ 1)."],
        ["Dönüşüm günlüğü", "Her değişiklik için hücre | önce | sonra | işlem | neden kaydı; temizliği denetlenebilir yapar."],
        ["Çapraz kontrol", "Temizlikten önce/sonra toplam ya da satır sayısını karşılaştırma (13 → 12 satır)."]
      ],
      ornek: [
        "Tespit: 13 satırın kayit_no'ları sayıldığında 12 benzersiz kayıt var (K10 iki kez) → 1 kopya satır silinecek.",
        "Şehir yazımı: ham tabloda birebir metin olarak 6 farklı yazım var (İstanbul 3, ankara 1, İzmir 4, 'İstanbul ' 1, Ankara 3, IST 1); SQL GROUP BY ve Python sözlük anahtarı büyük-küçük harfi ayırdığı için bunları 6 ayrı grup sayar. Excel özet tablosu, ETOPLA ve EĞERSAY ise büyük-küçük harfe duyarsızdır: orada ankara ile Ankara tek grupta birleşir ve 5 grup görünür (doğrulanmadı: kendi sürümünde dene); 'İstanbul ' (sonda boşluk) ve IST yine ayrı kalır. Temizlikten sonra hangi araçla bakılırsa bakılsın 3 şehir kalır (İstanbul, Ankara, İzmir). Temizlenmemiş tablo İstanbul'u üç ayrı satırda gösterir.",
        "Kopyanın etkisi: ham tabloda İzmir brüt cirosu 450 + 1800 + 4200 + 4200 = 10650; kopya silinince 6450. Fark tam olarak K10'un cirosu (4200).",
        "Boş fiyat K07 (2 fare): karar A) aynı ürünün diğer satırlarındaki tek fiyatı (250) kullan → toplam brüt ciro 17150; karar B) K07'yi hesaba katma → 16650 (fark 2 × 250 = 500). Hangisini seçersen varsayımı yaz; B'de satırın dışarıda kaldığını raporla.",
        "Adet: '2 adet' → 2 yapılınca temiz tablodaki toplam adet 21 olur (kopya hariç). Tarih: K08 '21.02.2026' → 2026-02-21; metin olarak kalırsa sıralamada 'A→Z' en sona düşer (Şubat'ın ortasında olması gerekirken).",
        "Veri doğrulama kuralı örneği: sehir = liste {İstanbul, Ankara, İzmir}; adet = tam sayı ≥ 1; fiyat = ondalık > 0; tarih = YYYY-AA-GG biçimi.",
        "İsteğe bağlı SQL/Python karşılığı: bu dersin uygulama alanındaki SQL ve Python alanı aynı işin SQL/Python karşılığıdır ve Seviye 2/4'te öğrenilen araçların ön izlemesidir; zorunlu değildir, bu dersin asıl çıktısı elektronik tablo çözümüdür. Elektronik tablo alanı (sim) kural tabanlıdır, tablo gerçekten çalıştırılmaz."
      ],
      analoji: { a: "Yemek hazırlığı: sebzeyi yıkayıp ayıklamadan pişirirsen yemek bozulur; ayıkladıklarını da kaydedersin (neden attığını bilmek için).", sinir: "Yemekte çürük sebzeyi fark edersin; veride 'IST' ile 'İstanbul' aynı şehir mi, kendisi söylemez — karar ve bilgi (eşleme listesi) gerekir." },
      gorsel: "Ham tablo (13) --kopya sil--> 12 --KIRP/eşleme--> 3 şehir --DEĞER--> adet sayı --boş fiyat kararı--> temiz tablo\nHer okta: günlük satırı (hücre | önce | sonra | işlem | neden)",
      rehberli: [
        "Çözümlü: kayit_no sütununda EĞERSAY ile K10'un kaç kez geçtiğini say (2) ve kopya satırı kaldır; günlüğe yaz: 'satır 12 | K10 kopya | silindi | kopya | toplam ciroyu şişirir'.",
        "Şehir sütununu üç adımda temizle: KIRP, büyük/küçük harf düzeltmesi, 'IST' için eşleme. Her adım için günlük satırı yaz ve sonunda benzersiz şehir sayısının 3 olduğunu doğrula.",
        "'2 adet' hücresini sayıya çevir; K07 boş fiyat için karar A ya da B'yi seç ve toplam brüt cironun karşılığını (17150 / 16650) yaz.",
        "Alanlar: SQL alanında toplam/tekrarsız/boş satır sayılarını, Python alanında tekrarsız adet toplamını, simülasyon alanında EĞERSAY ile kopya sayısını bul."
      ],
      bagimsiz: "TEMİZLEME GÖREVİ (bağımsız): VA.veriKirli'yi sıfırdan temizle. Teslim: (1) temiz tablo (12 satır, 3 şehir, sayısal adet, ISO tarih); (2) en az 6 satırlık dönüşüm günlüğü (kopya, şehir ×2, ürün, adet, tarih, boş fiyat); (3) boş fiyat için seçtiğin kararın gerekçesi ve seçtiğin kararla/diğer kararla toplam brüt cironun karşılaştırması; (4) tabloya uygulayacağın veri doğrulama kuralları (şehir listesi, adet, fiyat, tarih). Temiz tablonla şehir başına brüt cirosunu hesapla ve temizlenmemiş hâliyle farkı açıkla. Uygulamayı kendi elektronik tablonda sen yaparsın; uygulama bu adımı çalıştırmaz.",
      hatalar: [
        ["Ham tabloyu kopyalamadan üzerinde değişiklik yapmak", "Önce kopya al; ham veri kanıttır, günlükle eşleşir."],
        ["Kopya satırı fark etmeden toplamak (İzmir 10650)", "Önce benzersiz kayıt sayısını (12) ham satır sayısıyla (13) karşılaştır."],
        ["Boş fiyatı sessizce 0 yapmak ya da satırı haber vermeden silmek", "Doldur ya da hariç tut: kararı, etkisini (500) ve varsayımı yaz."],
        ["Tarihi metin bırakıp sıralamak/filtrelemek", "Tek biçime (YYYY-AA-GG) çevir; çeviriyi günlüğe yaz."]
      ],
      kontrol: [
        { q: "VA.veriKirli'de kopya satırı çıkarınca kaç benzersiz kayıt kalır?", o: ["13", "11", "12", "10"], a: 2, why: "13 satırda K10 iki kez; 12 benzersiz kayit_no.", bolum: "ornek" },
        { q: "Temizlenmemiş özet tabloda İstanbul neden birden çok satır olur?", o: ["Veri çok büyük olduğu için", "'İstanbul ', 'İstanbul' ve 'IST' farklı değer sayılır", "Özet tablo hata yapar", "Şehirler sıralı olmadığı için"], a: 1, why: "SQL GROUP BY ve Python sözlük anahtarı birebir aynı metne bakar; boşluk ve yazım farkı ayrı grup yaratır (Excel özet tablo/ETOPLA/EĞERSAY büyük-küçük harfe duyarsızdır; doğrulanmadı: kendi sürümünde dene, ama sondaki boşluk ve IST yine ayrı kalır).", bolum: "ornek" },
        { q: "K07'nin boş fiyatını aynı ürünün tek fiyatıyla (250) doldurmak neyi gerektirir?", o: ["Hiçbir şeyi; doldurmak daima doğrudur", "Bunun bir varsayım olduğunu ve etkisini (2 × 250 = 500) günlüğe/rapora yazmayı", "Satırı silmeyi", "Fiyat sütununu silmeyi"], a: 1, why: "Doldurma bilgi uydurmaktır; yalnız ürün fiyatı sabitse makul ve belgelenmeli.", bolum: "hatalar" },
        { q: "'21.02.2026' tarihi metin kalırsa tarihe göre A→Z sıralamada ne olur?", o: ["En başa gelir", "Doğru yere (Şubat ortası) gelir", "Metin biçimi farklı olduğu için sona düşer", "Silinir"], a: 2, why: "'21.02…' metni '2026-…' metinlerinden sonra sıralanır; tek biçime çevir.", bolum: "hatalar" },
        { q: "Dönüşüm günlüğünün asıl yararı hangisidir?", o: ["Tabloyu küçültmek", "Her değişikliğin nedenini göstererek temizliği denetlenebilir yapmak", "Formülleri hızlandırmak", "Grafik çizmek"], a: 1, why: "Önce/sonra/işlem/neden kaydı temizliği savunulabilir kılar.", bolum: "terimler" }
      ],
      gecme: { olcut: "Bilgi kontrolünde %80; bağımsız görevde temiz tablo, ≥6 dönüşümlük günlük, boş fiyat kararının gerekçesi ve doğrulama kuralları.", kritik: ["Kopya satırı ya da farklı yazımları fark etmeden özet almak", "Boş değeri kararı ve varsayımı yazmadan doldurmak/silmek"] },
      kaynaklar: [{ t: "Microsoft: TRIM işlevi", u: "https://support.microsoft.com/en-us/office/trim-function-410388fa-c5df-49c6-b16c-9e5630b479f9", dogrulama: "2026-10-18", neden: "Fazla boşlukları temizleyen KIRP/TRIM işlevinin resmî açıklaması." }, { t: "Microsoft: Aralık ya da tabloda veri filtreleme", u: "https://support.microsoft.com/en-us/office/filter-data-in-a-range-or-table-01832226-31b5-4568-8806-38c37dcc180e", dogrulama: "2026-10-18", neden: "Filtre ve sıralamanın resmî adım adım anlatımı." }],
      telafi: "Kirli tablodan yalnız şehir sütununu al: kaç farklı yazım var (birebir metinle 6; Excel özet tablo büyük-küçük harfi ayırmadığı için orada 5 görünebilir, doğrulanmadı: kendi sürümünde dene), temizleyince kaç (3)? Bu sayıyı ve her dönüşümün nedenini günlüğe yaz; sonra kopya satırı say (13 → 12).",
      sonraki: "Sıradaki ders: özet tablo, grafik ve basit rapor — temizlenmiş veriyle şehir/ürün/ay özetleri ve yorum."
    },
    {
      id: "va1-3", seviye: 1, ad: "Özet tablo, grafik ve basit rapor",
      hedefler: [
        "Temiz tablodan şehir, ürün ve ay bazında özet (özet tablo mantığı) çıkarmak",
        "Karşılaştırma ve zaman için uygun grafik türünü seçmek",
        "Bulgu, varsayım ve sınır içeren kısa bir rapor yazmak; temizlenmemiş verinin özeti nasıl bozduğunu göstermek"
      ],
      onkosul: "Ders va1-1 (formül, ETOPLA) ve va1-2 (temizleme).",
      aciklama: "Özet tablo, satırları bir ya da iki boyuta göre gruplayıp bir ölçüyü (toplam, sayı, ortalama) hesaplar. Mantık ETOPLA'yla aynıdır: şehre göre ETOPLA'yı her şehir için bir kez çalıştırırsın; özet tablo bunu tek adımda yapar (SQL'de GROUP BY'ın karşılığı). Girdi temiz değilse özet bozuk çıkar: VA.veriKirli'yi doğrudan özetlersen birebir metne bakan araçta (SQL GROUP BY, Python sözlüğü) 6 şehir satırı görürsün; Excel özet tablo ve ETOPLA büyük-küçük harfe duyarsız olduğundan orada ankara/Ankara birleşir ve 5 satır görünebilir (doğrulanmadı: kendi sürümünde dene). Temizlenince hepsinde 3. Ölçü tanımı: net ciro = adet × birim fiyat × (1 − indirim); boş indirim (S007) bu derste 0 sayılıyor (varsayım). Grafik seçimi: kategorileri kıyaslamak için sütun, zaman içindeki değişim için çizgi (az dönem varsa sütun da olur), parça-bütün için yalnız 3–5 dilimde pasta. Rapor: bir cümlelik bulgu, ölçü tanımı, varsayımlar, sınırlar (12 sipariş küçük bir örneklem, neden gösterilmez). DİKKAT: Uygulama özet tablo/grafik çizmez; SQL alanı özetin GROUP BY karşılığıdır, sim alanı ÇOKETOPLA formülünü kural tabanlı denetler; özet tabloyu kendi uygulamanda kurarsın.",
      terimler: [
        ["Özet tablo", "Satırları boyuta göre gruplayıp toplam/sayı/ortalama hesaplayan tablo; kaynak veri değişince yenilenmesi gerekir."],
        ["Net ciro", "adet × birim_fiyat × (1 − indirim_orani); bu derste boş indirim = 0 varsayımı."],
        ["ÇOKETOPLA (SUMIFS)", "Birden çok ölçütü birlikte sağlayan satırları toplar: ÇOKETOPLA(toplam_aralığı; ölçüt_aralığı1; ölçüt1; ölçüt_aralığı2; ölçüt2)."],
        ["Sütun / çizgi / pasta grafiği", "Kategori kıyası / zaman içi değişim / az dilimli parça-bütün."],
        ["Ortalama sipariş tutarı", "Toplam net ciro ÷ sipariş sayısı."],
        ["Bulgu – varsayım – sınır", "Raporun üç parçası: ne bulundu, hangi kabullerle, nerede geçerli değil."]
      ],
      ornek: [
        "Şehir bazında net ciro (temiz VA.veri): İstanbul 6142,5; Ankara 3595; İzmir 6270; toplam 16007,5. Brüt cirolar 6900, 3800, 6450'dir (fark indirimler).",
        "Ürün bazında net ciro: Monitör 7770, Kulaklık 3735, Klavye 3040, Fare 1462,5. En yüksek ciro Monitör'de; en çok adet Kulaklık'ta (9 adet): ciro sıralaması ile adet sıralaması farklıdır.",
        "Ay bazında net ciro: Ocak 2772,5; Şubat 7130; Mart 6105 (her ay 4 sipariş). Zaman karşılaştırması için üç noktalı çizgi ya da sütun grafiği uygundur; Şubat'taki sıçrama S006 Monitör (3570) ile açıklanır, bu 'neden' değil gözlemdir.",
        "Ortalama sipariş tutarı: 16007,5 ÷ 12 ≈ 1333,96.",
        "Varsayımın etkisi: S007 indirimi boş ve 0 sayıldığı için net ciro 500; satırı hariç tutsaydın toplam 15507,5 olurdu. Raporda bunu yaz.",
        "Çoklu ölçüt: İstanbul'da kartla ödenen adet toplamı =ÇOKETOPLA(F2:F13;D2:D13;\"İstanbul\";I2:I13;\"kart\") → 7 (2+3+1+1).",
        "İsteğe bağlı SQL/Python karşılığı: bu dersin uygulama alanındaki SQL alanı aynı işin SQL/Python karşılığıdır ve Seviye 2/4'te öğrenilen araçların ön izlemesidir; zorunlu değildir, bu dersin asıl çıktısı elektronik tablo çözümüdür. Elektronik tablo alanı (sim) kural tabanlıdır, tablo gerçekten çalıştırılmaz."
      ],
      analoji: { a: "Fatura dökümü: aylık faturanı kategoriye (market, ulaşım) göre gruplayıp toplayan bir özet çıkarırsın.", sinir: "Faturada kategoriler baştan sabittir; veride kategori yazımı tutarsızsa özet kategorileri kendisi bölünür." },
      gorsel: "Temiz tablo --grup: sehir--> ETOPLA/özet tablo --> şehir | net ciro\nİstanbul 6142,5 | Ankara 3595 | İzmir 6270     (ham kirli veride 6 satır; Excel'de 5 olabilir, doğrulanmadı)",
      rehberli: [
        "Çözümlü: şehir başına net ciroyu önce her şehir için ayrı bir ETOPLA'yla, sonra özet tabloyla hesapla; ikisinin aynı çıktığını kontrol et (6142,5 / 3595 / 6270).",
        "TEMİZLEME + AÇIKLAMA (rehberli): VA.veriKirli'yi doğrudan özetle (6 şehir satırı; Excel özet tabloda ankara/Ankara birleşirse 5, doğrulanmadı: kendi sürümünde dene; İzmir'de kopyalı toplam 10650 brüt); sonra va1-2'deki dönüşümleri uygula ve özeti yenile. Farkı üç cümleyle açıkla: hangi dönüşüm hangi satırı düzeltti.",
        "Şehir cirosu için sütun, aylık ciro için çizgi grafiği seç ve her birinin neden uygun olduğunu bir cümleyle yaz.",
        "Alanlar: SQL alanında GROUP BY ile şehir başına net ciroyu hesapla; sim alanında ÇOKETOPLA formülünü yaz."
      ],
      bagimsiz: "TEMİZLEME + RAPOR (bağımsız): (1) VA.veriKirli'yi temizle (dönüşüm günlüğü ile) ve şehir başına brüt ciro özetini çıkar; (2) temizlenmemiş özetle karşılaştır: şehir satırı sayısı, İzmir toplamı ve fark nedeni; (3) boş fiyat için kararını yaz ve toplamın iki alternatifini ver; (4) bir paragraflık rapor: bulgu, ölçü tanımı, varsayımlar, sınırlar (küçük örneklem, neden gösterilmez); (5) grafik türünü gerekçelendir. Özet tablo ve grafiği kendi uygulamanda sen kurarsın; uygulama bunları çalıştırmaz.",
      hatalar: [
        ["Temizlenmemiş veriden özet almak (6 şehir satırı, Excel'de 5 olabilir; kopyalı toplam)", "Önce temizle, günlüğü tut, özeti sonra çıkar."],
        ["Ölçüyü tanımlamadan ciro yazmak (brüt mü net mi?)", "Raporda formülü ve boş indirim varsayımını yaz."],
        ["Özet tabloyu kaynak değişince yenilememek", "Veri değiştiyse özeti yenile ve toplamı elle çapraz kontrol et."],
        ["Pasta grafiğini çok dilimde ya da zaman için kullanmak", "Zaman için çizgi/sütun, çok kategori için sıralı sütun."],
        ["Gözlemden neden çıkarmak (Şubat sıçraması 'kampanya yüzünden')", "Yalnız ne gözlendiğini yaz; neden için ek veri gerekir."]
      ],
      kontrol: [
        { q: "Temiz 12 siparişte şehir bazında en yüksek net ciro hangi şehirde?", o: ["İstanbul", "Ankara", "İzmir", "Üçü eşit"], a: 2, why: "İzmir 6270, İstanbul 6142,5, Ankara 3595.", bolum: "ornek" },
        { q: "Aylık ciro (Ocak 2772,5; Şubat 7130; Mart 6105) için en uygun grafik?", o: ["Pasta", "Çizgi ya da sütun (zaman ekseni)", "Dağılım yalnız adet", "Grafik gereksiz"], a: 1, why: "Zaman içi değişim çizgi/sütunla okunur.", bolum: "terimler" },
        { q: "Ortalama sipariş tutarı net ciro bazında yaklaşık kaçtır?", o: ["≈ 1334", "≈ 2000", "≈ 800", "≈ 16007"], a: 0, why: "16007,5 ÷ 12 ≈ 1333,96.", bolum: "ornek" },
        { q: "Ham kirli veriyi SQL GROUP BY ile (birebir metin eşleşmesi) doğrudan özetlediğinde şehir tablosunda kaç satır görürsün?", o: ["3", "6", "12", "13"], a: 1, why: "6 farklı yazım (İstanbul, 'İstanbul ', IST, ankara, Ankara, İzmir) ayrı grup olur. Excel özet tablo büyük-küçük harfe duyarsızsa 5 görünebilir (doğrulanmadı: kendi sürümünde dene).", bolum: "aciklama" },
        { q: "Raporda S007'nin boş indirimi için ne yazılmalı?", o: ["Hiçbir şey; küçük ayrıntı", "Boşun 0 sayıldığı varsayımı ve etkisi (≈500)", "Tüm rapor iptal", "Tabloyu silmek"], a: 1, why: "Varsayım ve büyüklüğü açıkça raporlanır.", bolum: "hatalar" }
      ],
      gecme: { olcut: "Bilgi kontrolünde %80; bağımsız görevde temizlenmiş/temizlenmemiş özet karşılaştırması, boş fiyat kararı ve bulgu–varsayım–sınır içeren rapor.", kritik: ["Ölçüyü ve varsayımı belirtmeden ciro yazmak", "Gözleme neden uydurmak"] },
      kaynaklar: [{ t: "Microsoft: Özet tablo (PivotTable) oluşturma", u: "https://support.microsoft.com/en-us/office/create-a-pivottable-to-analyze-worksheet-data-a9a84538-bfe9-40a9-a8e9-f99134456576", dogrulama: "2026-10-18", neden: "Özet tablonun adım adım resmî anlatımı." }, { t: "Microsoft: Baştan sona grafik oluşturma", u: "https://support.microsoft.com/en-us/office/create-a-chart-from-start-to-finish-0baf399e-dd61-4e18-8a73-b3fd5d5680c2", dogrulama: "2026-10-18", neden: "Grafik türünü seçip oluşturmanın resmî rehberi." }],
      telafi: "Şehir başına net ciroyu üç ETOPLA ile hesapla (6142,5 / 3595 / 6270) ve toplamı 16007,5 ile doğrula; sonra tek cümlelik bulgu, bir varsayım ve bir sınır yaz.",
      sonraki: "Seviye 1 değerlendirmesi ve ardından önerilen proje: temiz veriyle satış raporu. Önerilen sonraki seviye: SQL ile sorgulama (Seviye 2)."
    }
  );

  /* ---------- Seviye 1 değerlendirmesi (ders sorularından bağımsız durum soruları) ---------- */
  VA.sinav1 = {
    id: "va1-sinav", ad: "Seviye 1 değerlendirmesi (elektronik tablolar)", esik: 0.8,
    sorular: [
      { id: "dd6a069f", q: "Bir ürün listesinden 'Fare' fiyatını çekmek istiyorsun ve liste alfabetik sıralı değil. DÜŞEYARA'da hangi seçim doğru sonucu verir?", o: ["Son bağımsız değişken DOĞRU (yaklaşık eşleşme)", "Son bağımsız değişken YANLIŞ (tam eşleşme)", "Sütun numarasını 0 yapmak", "Aralığı sıralamak zorunda bırakmak"], bolum: "va1-1" },
      { id: "adc2b343", q: "Siparişler tablosunda yalnız İstanbul siparişlerinin kaç tane olduğunu bulmak istiyorsun. Hangi işlev uygun?", o: ["ETOPLA(adet aralığı)", "DÜŞEYARA(İstanbul)", "EĞER(İstanbul)", "EĞERSAY(şehir aralığı; \"İstanbul\")"], bolum: "va1-1" },
      { id: "d6c31ec1", q: "Özet tabloda İstanbul üç ayrı satır olarak görünüyor. Veride en olası neden hangisi?", o: ["Aynı şehrin farklı yazımları ('İstanbul ', 'IST') ayrı değer sayılıyor", "Özet tablo yenilenmemiş", "Şehir sayısı çok", "Sıralama yanlış"], bolum: "va1-2" },
      { id: "0655338b", q: "Ham tabloda İzmir brüt cirosu 10650 çıktı; sipariş kayıtlarını kontrol edince aynı kayıt numaralı bir 4200'lük satırın iki kez girildiğini gördün. Temizleme sonrası İzmir için beklenen değer ve doğru adım nedir?", o: ["10650 kalır; veri değişmez", "14850; satırı bir daha ekle", "6450; kopya satırı silip dönüşümü günlüğe yaz", "4200; yalnız son satırı al"], bolum: "va1-2" },
      { id: "6602ef02", q: "Üç aylık net ciroyu (2772,5 / 7130 / 6105) yöneticiye göstereceksin ve Şubat'ın yüksek olduğunu vurgulayacaksın. Hangi sunum doğru?", o: ["Pasta grafiği; 'Şubat kampanya sayesinde yükseldi'", "Çizgi ya da sütun grafiği; 'Şubat'ta ciro yüksek (S006 Monitör katkısı); neden için ek veri gerekir'", "Grafik yok; yalnız sayı", "Üç ayı toplayıp tek sayı vermek"], bolum: "va1-3" },
      { id: "e96026c8", q: "Raporunda net ciro hesapladın ama bir siparişin indirimi boştu ve formülde 0 sayıldı. Okuyucu için en doğru davranış?", o: ["Hiçbir şey yazmamak", "Tüm indirimleri 0 yapmak", "Satırı sessizce silmek", "Boşun 0 sayıldığını, etkilenen tutarı ve alternatif toplamı (satır hariç) belirtmek"], bolum: "va1-3" }
    ]
  };
})();

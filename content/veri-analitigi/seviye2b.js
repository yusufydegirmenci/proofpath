/* Veri Analitiği · Seviye 2 (SQL) ikinci yarı: dersler va2-8 … va2-13.
   Tüm örnek sayıları seviye0.js'deki 12 siparişlik tablo (siparis) ve veri-ek.js'deki musteri/urun/hedef tablolarından hesaplanmıştır; veri SENTETİKTİR.
   Net tutar = adet × birim_fiyat × (1 − indirim_orani); boş (NULL) indirim, indirimsiz (0) sayılır. Dış kaynaklar yalnız HTTP 200 doğrulananlar (2026-10-12). */
(function () {
  var VA = (window.PP_VA = window.PP_VA || {});
  var DOG = "2026-10-12";
  VA.dersler = VA.dersler || [];

  /* ---------- va2-8 · Alt sorgu ve CTE ---------- */
  VA.dersler.push({
    id: "va2-8", seviye: 2, ad: "Alt sorgu ve CTE",
    hedefler: ["Tek değer döndüren (skaler) alt sorguyu WHERE içinde kullanarak ortalamayla kıyaslama yapmak", "IN / NOT IN alt sorgusuyla başka tabloya bağlı satırları seçmek ve NULL tuzağını bilmek", "Çok adımlı bir hesabı CTE (WITH) ile okunur parçalara bölmek"],
    onkosul: "Ders 4–7 (toplama fonksiyonları, GROUP BY, JOIN). COALESCE bu derste tanıtılır.",
    aciklama: "Bazen bir sorunun cevabı için önce başka bir soruyu cevaplamak gerekir: 'ortalamadan küçük siparişler' demek için önce ortalamayı bilmelisin. Alt sorgu, parantez içine yazılmış ve dış sorgunun içinde kullanılan bir SELECT'tir. Tek bir değer döndürüyorsa (skaler) bir sayı gibi kıyaslanır; bir sütun listesi döndürüyorsa IN / NOT IN ile üyelik sorulur. CTE ise (WITH ad AS (...)) aynı fikri sorgunun başında adlandırılmış bir ara tablo olarak yazar: iç içe geçmiş parantezlerin yerine yukarıdan aşağıya okunan adımlar kalır. Bu derste net tutar = adet × birim_fiyat × (1 − indirim_orani) kullanılır; indirim boşsa COALESCE(indirim_orani, 0) ile 0 sayılır, aksi halde işlem NULL döner ve satır sessizce hesaptan düşer.",
    terimler: [["Alt sorgu", "Başka bir sorgunun içinde, parantez içinde yazılan SELECT."], ["Skaler alt sorgu", "Tek satır ve tek sütun döndüren alt sorgu; tek bir değer yerine geçer: WHERE net < (SELECT AVG(...) FROM ...)."], ["IN / NOT IN", "Bir değerin alt sorgunun döndürdüğü listede olup olmadığını sorar."], ["CTE (WITH)", "Sorgunun başında adı verilen geçici sonuç kümesi; yalnız o sorgu boyunca yaşar."], ["COALESCE(a, b)", "İlk NULL olmayan değeri verir; COALESCE(indirim_orani, 0) boş indirimi 0 yapar."], ["Net tutar", "Bu derste: adet × birim_fiyat × (1 − indirim_orani)."], ["NULL yayılımı", "Aritmetikte bir operand NULL ise sonuç NULL olur; AVG ve SUM da NULL satırları atlar."]],
    ornek: [
      "Net tutar: S001 = 2 × 450 × (1 − 0,10) = 810. S007'de indirim boş: COALESCE ile 2 × 250 × (1 − 0) = 500; COALESCE'siz sonuç NULL olurdu.",
      "12 siparişin toplam net tutarı 16 007,5; ortalama 1 333,96. Ortalamanın ÜSTÜNDE 4 sipariş var: S005 (1 440), S006 (3 570), S008 (1 620), S010 (4 200); ALTINDA 8 sipariş.",
      "Tuzak: COALESCE yazmazsan S007 NULL olur, ortalama 11 satırdan hesaplanır (16 007,5 − 500) / 11 = 1 409,77 ve 'altında' listesi 8 yerine 7 satır döner: S007 listeden kaybolur ve eşik de değişir.",
      "NOT IN: SELECT musteri_id FROM musteri WHERE musteri_id NOT IN (SELECT musteri_id FROM siparis) → yalnız M09 (hiç sipariş vermemiş). Aynı kalıp ürün için: katalogda olup satılmayan ürün Kamera.",
      "CTE: WITH aylik AS (SELECT strftime('%Y-%m', tarih) AS ay, SUM(net) AS ciro FROM siparis GROUP BY ay) → Ocak 2 772,5; Şubat 7 130; Mart 6 105. Aylık ortalama 16 007,5 / 3 = 5 335,83; ortalamanın üstünde kalan aylar Şubat ve Mart."
    ],
    analoji: { a: "Hesap makinesinde ara sonuç: önce ortalamayı bulup kenara yazarsın, sonra her siparişi o sayıyla kıyaslarsın. Alt sorgu bu ara hesabı sorgunun içine gömer; CTE ona bir ad verip başa yazar.", sinir: "Hesap makinesinde ara sonucu sen hatırlarsın; SQL'de ara sonuç yalnız o sorgu için vardır, kalıcı tablo değildir. İlişkili (dış satıra bağlı) alt sorgular ayrı bir konudur ve bu derste kullanılmaz." },
    gorsel: "SELECT siparis_id, net FROM siparis\nWHERE net < ( SELECT AVG(net) FROM siparis )      <- önce bu çalışır: tek sayı (1333,96)\n\nWITH aylik AS ( ... GROUP BY ay )                 <- adım 1: aylık ciro tablosu\nSELECT ay, ciro FROM aylik WHERE ciro > (SELECT AVG(ciro) FROM aylik);   <- adım 2",
    rehberli: ["S001 ve S007 için net tutarı elle hesapla (810 ve 500); sonra COALESCE'li ve COALESCE'siz sorguyu çalıştır, S007 satırında farkı gör.", "Ortalamayı sabit yazmadan alt sorguyla 'ortalamanın altındaki siparişleri' listele (alan va2-8-sql); 8 satır beklenir.", "Aynı sorguyu CTE ile yeniden yaz: önce net tutarı hesaplayan bir CTE, sonra ortalamayla kıyaslayan SELECT. İki sorgunun aynı 8 satırı döndürdüğünü karşılaştır."],
    bagimsiz: "(1) Katalogda olup hiç satılmamış ürünleri NOT IN ile bul; yalnız bir ürün çıkmalı. (2) Net tutarı ortalama net tutarın en az 2 katı olan siparişleri listele. (3) Aylık net ciroyu CTE ile hesapla ve aylık ortalamanın üstünde kalan ayları listele. Her sorguda ortalamayı sabit sayı olarak yazma.",
    hatalar: [
      ["COALESCE'siz net tutar: boş indirimli satır NULL olur ve ortalamadan/listeden sessizce düşer", "Boş indirimi COALESCE(indirim_orani, 0) ile 0 yap ve bu varsayımı raporda belirt."],
      ["NOT IN alt sorgusu NULL içeriyorsa hiçbir satır dönmez (karşılaştırma bilinmeyen olur)", "Alt sorguya WHERE sütun IS NOT NULL ekle ya da NOT EXISTS / LEFT JOIN ... IS NULL kullan."],
      ["Alt sorgu birden çok satır döndürürken = ile kullanmak: SQLite hata vermez, ilk satırı alır", "Skaler beklenen yerde alt sorgunun tek satır döndürdüğünden emin ol (toplama fonksiyonu kullan); liste için IN kullan."],
      ["Ortalamayı hesaplayıp sorguya sabit sayı olarak yazmak (1333.96)", "Ortalamayı alt sorguyla hesapla; veri değişince sonuç da doğru değişir."]
    ],
    kontrol: [
      { q: "12 siparişin net tutarının ortalaması 1 333,96. Net tutarı ortalamadan YÜKSEK kaç sipariş vardır?", o: ["3", "4", "5", "8"], a: 1, why: "S005 (1 440), S006 (3 570), S008 (1 620) ve S010 (4 200) ortalamanın üstündedir; kalan 8 sipariş altındadır.", bolum: "ornek" },
      { q: "Net tutar hesabında COALESCE kullanılmazsa S007 (indirim boş) için ne olur?", o: ["Net tutar 0 olur", "Net tutar brüt tutara eşit olur", "Net tutar NULL olur ve satır AVG ve karşılaştırmalardan düşer", "SQL hata verir"], a: 2, why: "NULL ile aritmetik NULL verir; AVG NULL'ları atlar, WHERE NULL < x satırı seçmez.", bolum: "hatalar" },
      { q: "Hangisi skaler alt sorgudur?", o: ["(SELECT * FROM siparis)", "(SELECT musteri_id FROM siparis)", "WITH a AS (SELECT 1)", "(SELECT AVG(adet * birim_fiyat) FROM siparis)"], a: 3, why: "Toplama fonksiyonu tek satır ve tek sütun döndürür; bir sayı gibi kıyaslanır.", bolum: "terimler" },
      { q: "NOT IN (SELECT x FROM t) ifadesinde alt sorgu sonucunda bir NULL varsa ne olur?", o: ["Dış sorgu satır döndürmez (hiçbir değer güvenle 'listede yok' olarak kanıtlanamaz)", "NULL yok sayılır, her şey normal", "SQL hata verir", "Tüm satırlar döner"], a: 0, why: "x NOT IN (..., NULL) ifadesi hiçbir satırda DOĞRU olmaz; IS NOT NULL ile ele ya da NOT EXISTS kullan.", bolum: "hatalar" },
      { q: "CTE (WITH) için hangisi doğrudur?", o: ["Kalıcı bir tablo oluşturur", "JOIN ile birlikte kullanılamaz", "Yalnız o sorgu boyunca yaşayan adlandırılmış ara sonuçtur", "Yalnız INSERT ile kullanılır"], a: 2, why: "CTE geçici ve sorguya özeldir; kalıcılık için tablo ya da view gerekir.", bolum: "aciklama" }
    ],
    gecme: { olcut: "Bilgi kontrolünde %80; alan va2-8-sql ve va2-8-py doğru; bağımsız görevde ortalama sabit yazılmadan hesaplanmış.", kritik: ["Ortalamayı ya da eşiği sabit sayı olarak yazmak", "Boş indirimi (NULL) fark etmeden hesaba katmamak", "NOT IN alt sorgusundaki NULL riskini bilmemek"] },
    kaynaklar: [
      { t: "SQLite: WITH yan tümcesi (CTE)", u: "https://www.sqlite.org/lang_with.html", dogrulama: DOG, neden: "CTE söz dizimi ve örnekler (resmî SQLite belgesi)." },
      { t: "SQLite: ifadeler (alt sorgu ifadeleri, IN, EXISTS)", u: "https://www.sqlite.org/lang_expr.html", dogrulama: DOG, neden: "Skaler alt sorgunun ilk satırı aldığı ve IN / NOT IN davranışı burada tanımlıdır." }
    ],
    telafi: "Önce yalnız iç sorguyu tek başına çalıştır (SELECT AVG(adet * birim_fiyat * (1 - COALESCE(indirim_orani, 0))) FROM siparis) ve tek bir sayı (1333,96...) gördüğünü doğrula; sonra bu sorguyu parantez içinde WHERE'e yerleştir. CTE'de takılırsan aynı sorguyu önce iç içe yaz, sonra iç parçayı WITH adı altında başa taşı.",
    sonraki: "Sıradaki ders: tarih ve metin fonksiyonları (strftime, julianday, substr, ||)."
  });

  /* ---------- va2-9 · Tarih ve metin fonksiyonları ---------- */
  VA.dersler.push({
    id: "va2-9", seviye: 2, ad: "Tarih ve metin fonksiyonları",
    hedefler: ["Tarih metninden ay/gün çıkarmak ve iki tarih arasındaki gün farkını hesaplamak", "Metni kesmek, birleştirmek, biçimlendirmek (substr, ||, printf, instr, upper/lower)", "Biçim bozuk tarihlerin NULL döndüğünü ve büyük/küçük harf sınırlarını bilmek"],
    onkosul: "Ders 4–5 (toplama ve GROUP BY). Ders 8 (net tutar ve COALESCE).",
    aciklama: "SQLite'ta tarih ayrı bir tür değildir: tarih sütunu 'YYYY-AA-GG' biçiminde METİN olarak saklanır ve tarih fonksiyonları bu metni okur. strftime('%Y-%m', tarih) ay üretir; julianday(a) − julianday(b) iki tarih arasındaki gün farkını verir; date(tarih, '+1 month') tarih öteler. Metin tarafında substr (kes), || (birleştir), printf (biçimle), instr (konum bul), length, trim, replace, upper/lower vardır. İki kural: (1) tarih biçimi bozuksa ('21.02.2026') strftime NULL döner ve satır sessizce gruplardan kaybolabilir; (2) varsayılan SQLite derlemesinde upper/lower yalnız ASCII harfleri çevirir, Türkçe harfler bundan etkilenmeyebilir (sql.js sürümünde bu davranışı ayrıca denemelisin, doğrulanmadı).",
    terimler: [["strftime(biçim, tarih)", "Tarihi biçimlendirir: '%Y-%m' → '2026-02'; '%m' → '02'; '%w' → haftanın günü (0 = Pazar)."], ["julianday(tarih)", "Tarihi gün sayısı olarak verir; iki değerin farkı gün farkıdır."], ["date(tarih, değiştirici)", "Tarihi öteler: date('2026-03-01', '-1 day') = '2026-02-28'."], ["substr(metin, başla, uzunluk)", "Metnin bir parçasını alır (1'den başlar): substr('M01', 2) = '01'."], ["|| (birleştirme)", "İki metni birleştirir: 'S' || '013'."], ["printf", "Biçimli metin üretir: printf('%03d', 13) = '013'."], ["instr(metin, parça)", "Parçanın konumunu verir (yoksa 0): instr('S007', '0') = 2."], ["ISO 8601 tarih metni", "YYYY-AA-GG biçimi: alfabetik sıra tarih sırasına eşittir, bu yüzden aralık karşılaştırması çalışır."]],
    ornek: [
      "Ay çıkarma: strftime('%Y-%m', '2026-02-14') = '2026-02'; strftime('%w', '2026-02-14') = '6' (Cumartesi; Pazar = 0).",
      "Aylık özet (alan va2-9-sql): 2026-01 → 4 sipariş, net ciro 2 772,5; 2026-02 → 4 sipariş, 7 130; 2026-03 → 4 sipariş, 6 105. Mart, Şubat'a göre (6 105 − 7 130) / 7 130 ≈ %−14,4.",
      "Gün farkı: M01 müşterisi 2025-11-03'te kayıt oldu, ilk siparişi (S001) 2026-01-05: julianday('2026-01-05') − julianday('2025-11-03') = 63 gün.",
      "Ay taşması: date('2026-01-31', '+1 month') = '2026-03-03' (Şubat'ta 31 yok, taşar); 'ay sonu' hesabı için date('2026-03-01', '-1 day') = '2026-02-28' daha güvenlidir.",
      "Metin: substr('M01', 2) = '01'; 'S' || printf('%03d', 13) = 'S013'; replace('M01', 'M', 'K') = 'K01'; length('Kulaklık') = 8. Bozuk biçim: strftime('%Y-%m', '21.02.2026') = NULL.",
      "Büyük/küçük harf: upper('m01') = 'M01' ama upper('kulaklık') yerel SQLite 3.47 derlemesinde 'KULAKLıK' döndü (ASCII dışı 'ı' çevrilmedi)."
    ],
    analoji: { a: "Takvim ve etiket makinesi: tarih metnini 'ay', 'gün' etiketlerine bölersin; metin fonksiyonları da kodları (M01, S007) kesip yapıştırdığın etiket makinesidir.", sinir: "Başka veritabanlarında (ör. PostgreSQL) tarih ayrı bir veri türüdür ve fonksiyon adları farklıdır (DATE_TRUNC, EXTRACT); burada yalnız SQLite söz dizimi öğretilir, diğerleri bu derste çalıştırılmadı." },
    gorsel: "'2026-02-14'  --strftime('%Y-%m')-->  '2026-02'   (GROUP BY ay)\n'2026-02-14'  --strftime('%w')-->   '6'         (Cumartesi)\njulianday('2026-01-05') - julianday('2025-11-03') = 63 gün\n'M01' --substr(.,2)--> '01'     'S' || printf('%03d', 13) --> 'S013'",
    rehberli: ["strftime ile her siparişin ayını yan sütun olarak göster (SELECT tarih, strftime('%Y-%m', tarih) FROM siparis).", "Aylık sipariş sayısını ve net cirosunu hesapla (alan va2-9-sql); her ayda 4 sipariş çıkmalı.", "musteri tablosuyla birleştirip her müşterinin kayıt tarihinden ilk sipariş tarihine kaç gün geçtiğini julianday farkıyla bul; M01 için 63 beklenir."],
    bagimsiz: "(1) Siparişleri haftanın gününe göre say (strftime('%w')) ve en yoğun günü bul. (2) Şubat ayında kaç sipariş olduğunu strftime ile, sonra tarih aralığıyla (tarih >= '2026-02-01' AND tarih < '2026-03-01') say; iki sayı aynı olmalı. (3) musteri_id'den sayısal kısmı substr ile ayırıp 'K' || sayı biçiminde yeni bir kod üret.",
    hatalar: [
      ["Tarih biçimi karışıkken ('2026-02-21' ve '21.02.2026') strftime kullanmak: bozuk satırlar NULL olur ve gruplardan kaybolur", "Önce tarih sütununun biçimini kontrol et (NULL sayısına bak) ve veriyi tek biçime çevir; sonra grupla."],
      ["Ay sonu ya da ay ekleme için date(x, '+1 month') kullanıp taşmayı unutmak (31 Ocak + 1 ay = 3 Mart)", "Ayın ilk gününden başla ve '+1 month', '-1 day' ile ay sonunu türet."],
      ["Türkçe harfli metinde upper/lower'ın her şeyi çevireceğini sanmak", "Varsayılan SQLite ASCII dışı harfleri çevirmez; eşleştirme için veriyi tek yazıma getir ya da sonucu sorguya göre doğrula."],
      ["Metinle sayı karıştırmak: substr('M01', 2) = '01' metindir", "Sayı gerekiyorsa CAST(substr(...) AS INTEGER) kullan."]
    ],
    kontrol: [
      { q: "strftime('%Y-%m', '2026-02-14') ne döndürür?", o: ["'14'", "'2026-02-14'", "'2026-02'", "'02-2026'"], a: 2, why: "%Y yıl, %m ay; ikisi birleşince 'YYYY-AA' biçimli ay etiketi çıkar.", bolum: "terimler" },
      { q: "Siparişler aylara bölününce her ayda kaç sipariş vardır (Ocak, Şubat, Mart)?", o: ["4, 4, 4", "3, 5, 4", "5, 4, 3", "4, 5, 3"], a: 0, why: "S001–S004 Ocak, S005–S008 Şubat, S009–S012 Mart: her ayda 4 sipariş.", bolum: "ornek" },
      { q: "Bir sütunda '21.02.2026' biçimli tarih varsa strftime('%Y-%m', ...) o satır için ne döndürür?", o: ["'2026-02'", "'21.02'", "NULL", "Hata verir ve sorgu durur"], a: 2, why: "Tanınmayan tarih biçiminde strftime NULL döner; satır GROUP BY'da kaybolabilir.", bolum: "hatalar" },
      { q: "M01 müşterisi 2025-11-03'te kayıt oldu, ilk siparişi 2026-01-05'te. julianday farkı kaçtır?", o: ["33", "90", "2", "63"], a: 3, why: "3 Kasım → 3 Aralık 30 gün, → 3 Ocak 31 gün, → 5 Ocak 2 gün: toplam 63.", bolum: "ornek" },
      { q: "'S' || printf('%03d', 13) ifadesi ne üretir?", o: ["'S13'", "'13S'", "'S0013'", "'S013'"], a: 3, why: "printf('%03d', 13) '013' üretir; || ile 'S' başına eklenir.", bolum: "terimler" }
    ],
    gecme: { olcut: "Bilgi kontrolünde %80; alan va2-9-sql doğru (3 aylık satır, doğru sayı ve ciro).", kritik: ["Ay etiketini tarihten türetmek yerine elle yazmak", "Bozuk tarih biçiminin NULL döneceğini bilmemek"] },
    kaynaklar: [
      { t: "SQLite: tarih ve saat fonksiyonları", u: "https://www.sqlite.org/lang_datefunc.html", dogrulama: DOG, neden: "strftime biçimleri, julianday ve ötelemeler için resmî belge." },
      { t: "SQLite: çekirdek fonksiyonlar (substr, instr, printf, upper...)", u: "https://www.sqlite.org/lang_corefunc.html", dogrulama: DOG, neden: "Metin fonksiyonlarının tanımı; upper/lower'ın ASCII sınırı burada açıklanır." }
    ],
    telafi: "Önce yalnız tek bir tarihle dene: SELECT strftime('%Y-%m', '2026-02-14'), strftime('%w', '2026-02-14'); çıktının '2026-02' ve '6' olduğunu gör. Sonra aynı ifadeyi sütun adıyla (tarih) tabloya uygula ve GROUP BY ekle.",
    sonraki: "Sıradaki ders: pencere fonksiyonları (ROW_NUMBER, RANK, LAG, LEAD)."
  });

  /* ---------- va2-10 · Pencere fonksiyonları ---------- */
  VA.dersler.push({
    id: "va2-10", seviye: 2, ad: "Pencere fonksiyonları (ROW_NUMBER, RANK, LAG, LEAD)",
    hedefler: ["Satırları gruplamadan sıra, önceki/sonraki değer ve kümülatif toplam hesaplamak", "ROW_NUMBER, RANK ve DENSE_RANK farkını eşitlik durumunda açıklamak", "Pencere fonksiyonu sonucunu filtrelemek için CTE kullanmak"],
    onkosul: "Ders 5 (GROUP BY), ders 8 (CTE ve net tutar), ders 9 (aylık özet).",
    aciklama: "GROUP BY satırları gruba çökertir; pencere fonksiyonu ise her satırı korur ve yanına o satırın 'penceresinden' hesaplanan bir değer ekler. Söz dizimi: fonksiyon() OVER (PARTITION BY grup ORDER BY sıra). PARTITION BY pencereyi gruplara böler (verilmezse tüm tablo tek pencere), ORDER BY pencere içindeki sırayı belirler. ROW_NUMBER her satıra 1,2,3... numara verir; RANK eşitlerde aynı sırayı verip sonrakini atlar; DENSE_RANK atlamaz. LAG(x) önceki, LEAD(x) sonraki satırın değerini getirir (yoksa NULL). SUM(x) OVER (ORDER BY ...) kümülatif toplam verir. Pencere fonksiyonu WHERE içinde kullanılamaz: önce CTE'de hesapla, sonra dış sorguda filtrele. SQLite'ta pencere fonksiyonları 3.25 sürümünden beri vardır.",
    terimler: [["Pencere (OVER)", "Fonksiyonun baktığı satır kümesi; satırlar çökertilmez."], ["PARTITION BY", "Pencereyi gruplara böler (örn. müşteri başına ayrı numara)."], ["ROW_NUMBER()", "Pencere içinde benzersiz sıra numarası (eşitlikte keyfî sıralama; deterministik olması için ikinci bir ORDER BY sütunu ekle)."], ["RANK() / DENSE_RANK()", "Eşit değerlere aynı sırayı verir; RANK sonrakini atlar (1,2,3,3,5), DENSE_RANK atlamaz (1,2,3,3,4)."], ["LAG(x) / LEAD(x)", "Pencerede önceki / sonraki satırın x değeri; yoksa NULL."], ["Kümülatif toplam", "SUM(x) OVER (ORDER BY ...): o satıra kadar olanların toplamı."], ["Önceki döneme göre değişim", "Bu dönem − LAG(bu dönem)."]],
    ornek: [
      "ROW_NUMBER müşteri bazında: ROW_NUMBER() OVER (PARTITION BY musteri_id ORDER BY tarih) → M01'in siparişleri S001 = 1, S004 = 2, S012 = 3 (M01'in ilk siparişi: S001).",
      "RANK ile eşitlik: adete göre azalan sırada (4, 3, 2, 2, 2, 2, 1 ×6) RANK değerleri: S008 = 1, S004 = 2, adet 2 olan dört sipariş (S001, S005, S007, S011) = 3, adet 1 olan altı sipariş = 7. DENSE_RANK ise 1, 2, 3, 4 verir.",
      "LAG ile ay değişimi (alan va2-10-sql): aylık net ciro 2 772,5 → 7 130 → 6 105. Fark: Ocak NULL (öncesi yok), Şubat +4 357,5, Mart −1 025.",
      "LEAD ve kümülatif: Ocak'ın LEAD değeri 7 130; kümülatif toplam 2 772,5 → 9 902,5 → 16 007,5 (son değer tüm siparişlerin net toplamına eşit: doğrulama).",
      "Şehirde en büyük sipariş (alan va2-10-py'nin SQL karşılığı): ROW_NUMBER() OVER (PARTITION BY sehir ORDER BY net DESC) = 1 filtresi → Ankara S005 (1 440), İstanbul S006 (3 570), İzmir S010 (4 200). Filtre için CTE gerekir."
    ],
    analoji: { a: "Sınıf listesi: öğrenciler sınıfa göre gruplanır (PARTITION BY), nota göre dizilir (ORDER BY) ve herkesin yanına kendi sırası yazılır; kimse listeden silinmez.", sinir: "Sınıf listesinde 'sıra' tek bir kâğıtta durur; SQL'de sıralamayı OVER içinde yazmazsan ya da eşit değerleri ayırmazsan sonuç deterministik olmayabilir (ROW_NUMBER keyfî seçim yapar)." },
    gorsel: "ay      net_ciro   LAG(net_ciro)  fark\n2026-01   2772,5      NULL         NULL\n2026-02   7130        2772,5       +4357,5\n2026-03   6105        7130         -1025",
    rehberli: ["ROW_NUMBER ile her müşterinin siparişlerini tarih sırasıyla numarala; M01 için 1, 2, 3 değerlerini doğrula.", "Aylık net ciroyu CTE'de hesapla, LAG ile bir önceki ayı yan sütuna getir ve farkı hesapla (alan va2-10-sql). İlk ayın farkı NULL kalmalı.", "Her şehrin en yüksek net tutarlı siparişini ROW_NUMBER = 1 ile bul; üç şehir için S005, S006, S010 beklenir (Python karşılığı: alan va2-10-py)."],
    bagimsiz: "(1) adet sütununa göre RANK ve DENSE_RANK'i yan yana göster; adet = 1 olan siparişlerde ikisinin farkını açıkla. (2) Her müşterinin İKİNCİ siparişini bul (ROW_NUMBER = 2); hangi müşterilerin ikinci siparişi var? (3) Aylık ciro için kümülatif toplamı hesapla ve son satırın tüm net toplamla aynı olduğunu doğrula.",
    hatalar: [
      ["Pencere fonksiyonunu WHERE içinde kullanmak (WHERE ROW_NUMBER() OVER (...) = 1)", "Pencere sonucunu CTE ya da alt sorguda hesapla, dış sorguda filtrele."],
      ["LAG'in OVER içinde ORDER BY'ı unutmak ya da ters sıralamak (ORDER BY ay DESC)", "Sıra zamanı doğru yönde izlemeli: ORDER BY ay; fark = bu ay − LAG(bu ay)."],
      ["İlk ayın NULL farkını 0 yapıp 'büyüme yok' demek", "Önceki dönem yoksa değişim tanımsızdır; NULL bırak ya da raporda 'ilk dönem' diye belirt."],
      ["Eşit değerlerde ROW_NUMBER'ın sıralamayı rastgele seçtiğini unutmak", "Ek bir ORDER BY sütunu ekle (örn. siparis_id) ya da eşitliğin anlamlı olduğu yerde RANK kullan."]
    ],
    kontrol: [
      { q: "M01'in siparişleri tarihe göre S001, S004, S012. ROW_NUMBER() OVER (PARTITION BY musteri_id ORDER BY tarih) S004 için kaç verir?", o: ["1", "3", "2", "0"], a: 2, why: "S001 ilk (1), S004 ikinci (2), S012 üçüncü (3) siparistir.", bolum: "ornek" },
      { q: "Aylık net ciro 2 772,5 → 7 130 → 6 105. Mart için 'önceki aya göre fark' kaçtır?", o: ["+1 025", "−1 025", "+4 357,5", "NULL"], a: 1, why: "6 105 − 7 130 = −1 025; Şubat farkı +4 357,5, Ocak farkı NULL'dır.", bolum: "ornek" },
      { q: "Adet değerleri 4, 3, 2, 2, 2, 2, 1... sırasıyla RANK ile azalan sıralanınca ilk adet = 1 satırı kaçıncı sırayı alır?", o: ["5", "6", "4", "7"], a: 3, why: "1. S008 (4), 2. S004 (3), 3. sıra dört siparişe verilir, sonraki 7 olur; DENSE_RANK ise 4 verirdi.", bolum: "terimler" },
      { q: "'Her şehrin en büyük siparişi' için ROW_NUMBER() = 1 filtresi nasıl uygulanır?", o: ["WHERE içinde doğrudan", "HAVING içinde", "CTE ya da alt sorguda hesapla, dış sorguda filtrele", "GROUP BY ile"], a: 2, why: "Pencere fonksiyonları WHERE'den sonra hesaplanır; WHERE'de kullanılamaz.", bolum: "hatalar" },
      { q: "GROUP BY ile pencere fonksiyonunun temel farkı nedir?", o: ["Hiçbir fark yok", "Pencere fonksiyonu satırları korur, GROUP BY gruba çökertir", "Pencere fonksiyonu yalnız tarihle çalışır", "GROUP BY satır sayısını artırır"], a: 1, why: "OVER ile her satır sonuçta kalır ve yanına hesaplanan değer eklenir.", bolum: "aciklama" }
    ],
    gecme: { olcut: "Bilgi kontrolünde %80; alan va2-10-sql ve va2-10-py doğru; ilk ayın farkı NULL bırakılmış.", kritik: ["Pencere fonksiyonunu WHERE içinde kullanmaya çalışmak", "LAG sıralamasını yanlış yönde yazmak ve işaretin tersine dönmesi"] },
    kaynaklar: [
      { t: "SQLite: pencere fonksiyonları", u: "https://www.sqlite.org/windowfunctions.html", dogrulama: DOG, neden: "OVER, PARTITION BY, ROW_NUMBER, RANK, LAG, LEAD tanımları ve örnekler (resmî SQLite belgesi)." }
    ],
    telafi: "Önce pencereyi sade kur: SELECT siparis_id, ROW_NUMBER() OVER (ORDER BY tarih) FROM siparis (1'den 12'ye numara verir). Sonra PARTITION BY musteri_id ekle ve M01 satırlarında 1, 2, 3 gördüğünü doğrula; LAG için yine aynı iskeleti kullan.",
    sonraki: "Sıradaki ders: koşullu toplama ve veri kalitesi kontrolleri."
  });

  /* ---------- va2-11 · Koşullu toplama ve veri kalitesi kontrolleri ---------- */
  VA.dersler.push({
    id: "va2-11", seviye: 2, ad: "Koşullu toplama ve veri kalitesi kontrolleri",
    hedefler: ["SUM/COUNT içinde CASE WHEN ile tek sorguda koşullu sayım, oran ve çapraz tablo (pivot) üretmek", "Oran hesabında tamsayı bölmesi ve sıfıra bölme tuzaklarını önlemek", "Boş, tekrar, yetim anahtar ve kapsama kontrollerini sorguyla (ve Python ile) yazmak"],
    onkosul: "Ders 3 (CASE WHEN), ders 4–5 (toplama, GROUP BY), ders 6–7 (JOIN), ders 8 (alt sorgu/NOT IN).",
    aciklama: "Koşullu toplama, WHERE ile satırları atmadan yalnız belirli satırları saymanın yoludur: SUM(CASE WHEN iade = 'evet' THEN 1 ELSE 0 END) iadeli siparişleri sayar, ama iadesi hiç olmayan gruplar da sonuçta 0 ile kalır (WHERE iade = 'evet' olsaydı o gruplar kaybolurdu). Aynı fikirle oran (iade sayısı / sipariş sayısı) ve satırları sütunlara çeviren pivot yazılır. İkinci yarı veri kalitesidir: analiz sonucuna güvenmeden önce sorguyla sorulur: boş değer kaç, tekrar var mı, her siparişin müşterisi musteri tablosunda var mı (yetim anahtar), kapsama tam mı (siparişsiz müşteri, satılmayan ürün, siparişi olmayan hedef ayı). Bu kontroller 'hata var mı' değil 'bu sonuca ne kadar güvenebilirim' sorusunu cevaplar.",
    terimler: [["Koşullu toplama", "Toplama fonksiyonu içinde CASE WHEN: SUM(CASE WHEN koşul THEN 1 ELSE 0 END)."], ["Pivot (çapraz tablo)", "Satırdaki değerleri sütuna çevirmek: her ay için bir SUM(CASE ...) sütunu."], ["Tamsayı bölmesi", "SQLite'ta 2 / 3 = 0; ondalık için 1.0 * 2 / 3 ya da CAST(... AS REAL)."], ["NULLIF(a, b)", "a, b'ye eşitse NULL verir; NULLIF(payda, 0) sıfıra bölmeyi NULL'a çevirir."], ["COUNT(*) ve COUNT(sütun)", "COUNT(*) tüm satırları, COUNT(sütun) yalnız NULL olmayanları sayar."], ["Yetim (orphan) kayıt", "Bağlı olduğu tabloda karşılığı olmayan kayıt: musteri tablosunda olmayan musteri_id'li sipariş."], ["Kapsama", "Katalogda/hedefte olup veride olmayan öğeler (siparişsiz müşteri, satılmayan ürün, siparişi olmayan ay)."], ["Veri kalitesi kontrolü", "Analizden önce boş, tekrar, yetim ve kapsama sayılarını çıkaran sorular."]],
    ornek: [
      "İade oranı (alan va2-11-sql): nakit 3 sipariş, 2 iade → 2/3 ≈ 0,667 (%66,7); kart 7 sipariş, 0 iade; havale 2 sipariş, 0 iade. SUM(...) / COUNT(*) tamsayı bölmesiyle nakit için 0 verir; 1.0 * SUM(...) / COUNT(*) 0,667 verir.",
      "Şehir kırılımı: Ankara 4 sipariş / 1 iade, İstanbul 5 / 0, İzmir 3 / 1.",
      "Pivot: SUM(CASE WHEN strftime('%m', tarih) = '01' THEN net END) → Ocak 2 772,5; aynı kalıpla Şubat 7 130; Mart 6 105 (üç sütun, tek satır). CASE'in ELSE'i yoksa eşleşmeyen satırlar NULL olur ve SUM atlar.",
      "NULL ve COUNT: COUNT(*) = 12 ama COUNT(indirim_orani) = 11 (S007 boş). AVG(indirim_orani) = 0,55 / 11 = 0,05; boş indirim 0 sayılırsa 0,55 / 12 ≈ 0,0458: tanım kararı sonucu değiştirir.",
      "Kalite kontrol sayıları (alan va2-11-py): boş indirim 1 (S007); tekrar siparis_id 0 (12 satır, 12 benzersiz); yetim müşteri 0 (8 farklı müşteri, hepsi musteri tablosunda); siparişsiz müşteri 1 (M09); satılmayan ürün 1 (Kamera). Ayrıca hedef tablosunda 2026-04 var ama o ay için hiç sipariş yok (hedef 4 ay, sipariş 3 ay)."
    ],
    analoji: { a: "Meyve sayma: sepetteki tüm meyveleri tek geçişte hem toplam hem 'çürük' hem 'taze' diye ayrı sayaçlara atarsın (koşullu toplama); sayımdan önce de sepette ezik, tekrar ve etiketsiz meyve olup olmadığına bakarsın (veri kalitesi).", sinir: "Sepette meyve ya var ya yok; veride 'boş' hem bilinmiyor hem sıfır anlamına gelebilir, bu yüzden her kontrolün sonucunu yorumlaman gerekir (hangi varsayımı seçtiğini raporda yaz)." },
    gorsel: "odeme_turu | siparis_sayisi | iade_sayisi | iade_orani\nhavale     |      2        |     0       |   0.0\nkart       |      7        |     0       |   0.0\nnakit      |      3        |     2       |   0.667",
    rehberli: ["Her ödeme türü için sipariş ve iade sayısını SUM(CASE ...) ile hesapla; kart ve havale için iade_sayisi = 0 satırlarının listede kaldığını gör (alan va2-11-sql).", "Önce SUM / COUNT'u tamsayı olarak çalıştır, nakit satırının 0 çıktığını gör; sonra 1.0 ile ondalığa çevir ve 0,667'yi doğrula.", "Python ile beş kalite sayısını tek sözlükte topla (alan va2-11-py): 1, 0, 0, 1 ve ['Kamera']."],
    bagimsiz: "(1) Şehir başına iade oranını hesapla (Ankara, İstanbul, İzmir) ve en yüksek oranlı şehri bul. (2) Üç aylık net ciroyu tek satırda üç sütun olarak (pivot) üret ve toplamının 16 007,5 olduğunu doğrula. (3) musteri tablosunda olup hiç siparişi olmayan müşterileri ve hedef tablosunda olup siparişi olmayan ayları listeleyen iki kalite sorgusu yaz.",
    hatalar: [
      ["Oranı tamsayı bölmesiyle hesaplamak (SUM(...) / COUNT(*) = 0)", "1.0 * SUM(...) / COUNT(*) ya da CAST(... AS REAL) kullan."],
      ["İade sayısı için WHERE iade = 'evet' yazıp iadesiz grupları kaybetmek", "WHERE yerine SUM(CASE WHEN ...) kullan; tüm gruplar kalır."],
      ["COUNT(*) ile COUNT(sütun)'u karıştırmak (boş hücreleri farkında olmadan atlamak)", "Boş sayısını ayrıca ver: COUNT(*) − COUNT(sütun)."],
      ["Kalite kontrolü yapmadan sonucu rapora yazmak", "Boş, tekrar, yetim ve kapsama sayılarını analizden önce çıkar; varsayımını (boş = 0) yaz."],
      ["Payda sıfır olabilecek oranı korumasız yazmak", "NULLIF(payda, 0) kullan; sonuç NULL olur, sıfıra bölme hatası/belirsizliği üretmez."]
    ],
    kontrol: [
      { q: "Nakit ödemelerde 3 siparişten 2'si iade. SQLite'ta SUM(CASE WHEN iade='evet' THEN 1 ELSE 0 END) / COUNT(*) (ikisi de tamsayı) ne döndürür?", o: ["0,667", "0", "2", "66,7"], a: 1, why: "Tamsayı bölmesi 2 / 3 = 0 verir; 1.0 * ... ile ondalığa çevrilir.", bolum: "hatalar" },
      { q: "WHERE iade = 'evet' ile GROUP BY odeme_turu çalıştırılırsa hangi ödeme türleri kaybolur?", o: ["Yalnız nakit", "Hiçbiri", "Hepsi", "Kart ve havale (iadesi olmayanlar)"], a: 3, why: "WHERE satırları gruplamadan önce eler; iadesi olmayan türlerin hiç satırı kalmaz.", bolum: "hatalar" },
      { q: "COUNT(*) = 12 iken COUNT(indirim_orani) kaçtır ve neden?", o: ["12, boşlar da sayılır", "0", "11, çünkü COUNT(sütun) NULL'ları atlar", "10"], a: 2, why: "S007'nin indirimi boş; COUNT(sütun) onu saymaz.", bolum: "terimler" },
      { q: "Hangisi yetim (orphan) kayıttır?", o: ["musteri tablosunda karşılığı olmayan musteri_id'li bir sipariş", "Hiç siparişi olmayan müşteri M09", "Hiç satılmayan Kamera", "indirim_orani boş olan S007"], a: 0, why: "Yetim kayıt, bağlı olduğu tabloda karşılığı olmayan kayıttır; M09 ve Kamera 'kapsama' sorunudur.", bolum: "terimler" },
      { q: "Bu veride kapsama kontrolünde hangileri çıkar?", o: ["Yalnız S007", "Tekrar eden siparis_id", "Hiçbiri", "Siparişsiz müşteri M09 ve satılmayan ürün Kamera"], a: 3, why: "M09 hiç sipariş vermemiş, Kamera hiç satılmamış; siparis_id'ler benzersiz, S007 ise boş-değer sorunudur.", bolum: "ornek" }
    ],
    gecme: { olcut: "Bilgi kontrolünde %80; alan va2-11-sql ve va2-11-py doğru (iadesiz gruplar listede, oran ondalık, 5 kalite anahtarı).", kritik: ["Oranı tamsayı bölmesiyle hesaplamak", "Boş değerleri hiç saymadan sonucu raporlamak", "WHERE ile koşullu sayım yapıp sıfırlı grupları kaybetmek"] },
    kaynaklar: [
      { t: "SQLite: toplama fonksiyonları (COUNT, SUM, AVG)", u: "https://www.sqlite.org/lang_aggfunc.html", dogrulama: DOG, neden: "COUNT(*) ile COUNT(sütun) farkı ve NULL'ların toplama davranışı." },
      { t: "SQLite: ifadeler (CASE ifadesi)", u: "https://www.sqlite.org/lang_expr.html", dogrulama: DOG, neden: "CASE WHEN söz dizimi ve ELSE'in yokluğunda NULL dönmesi." }
    ],
    telafi: "Önce tek bir ödeme türü için elle say: nakit = S003, S007, S011 (3 sipariş), iade evet olanlar S003 ve S007 (2). Sonra CASE WHEN iade = 'evet' THEN 1 ELSE 0 END ifadesini satır satır yan sütun olarak yazdır, toplamının 2 olduğunu gör ve ancak sonra SUM ile GROUP BY ekle.",
    sonraki: "Sıradaki ders: sorgu planı, indeks ve analitik veri modelleme."
  });

  /* ---------- va2-12 · Sorgu planı, performans temelleri, analitik veri modelleme ---------- */
  VA.dersler.push({
    id: "va2-12", seviye: 2, ad: "Sorgu planı, performans temelleri ve analitik veri modelleme",
    hedefler: ["EXPLAIN QUERY PLAN çıktısında SCAN ile SEARCH farkını ve indeks kullanımını okumak", "Hangi WHERE biçiminin indeksi kullanamayacağını (sütunu fonksiyona sarmak) bilmek", "Tabloları olgu/boyut ve tanecik (grain) mantığıyla ayırıp yıldız şemayı çizmek; farklı taneciği birleştirirken çoğaltmayı (fan-out) önlemek"],
    onkosul: "Ders 1 (şema, ilişki), ders 6–7 (JOIN), ders 9 (strftime), ders 10 (CTE ile aşamalı sorgu).",
    aciklama: "Sorgu planı, veritabanının sorguyu nasıl çalıştıracağının özetidir. SQLite'ta EXPLAIN QUERY PLAN SELECT ... komutu plan satırlarını verir: 'SCAN siparis' tablonun tüm satırlarının tek tek gezildiği anlamına gelir; 'SEARCH siparis USING INDEX ad (sütun=?)' ise indeks sayesinde yalnız ilgili satırlara gidildiğini gösterir. İndeks (CREATE INDEX), bir sütunun sıralı bir kopyasını tutan yardımcı yapıdır: okumayı hızlandırabilir, yazmayı ve diskte yer kullanımını artırır. Bu bir analitik veri modelleme dersi de: analitik sorgular genelde ölçüleri taşıyan bir olgu tablosunu (siparis) ve onu açıklayan boyut tablolarını (musteri, urun) birleştirir; bu düzene yıldız şema denir. Her olgu tablosunun bir tanecik (grain) tanımı vardır: 'bir satır neyi temsil ediyor?'. Farklı tanecikli iki tabloyu (sipariş satırı ve aylık hedef) doğrudan birleştirirsen küçük taneciğin değeri çoğalır ve toplamlar şişer. Bu derste yalnız SQLite'ta deneyebildiklerin öğretilir; PostgreSQL'in EXPLAIN çıktısı farklıdır ve burada çalıştırılmadı (doğrulanmadı).",
    terimler: [["Sorgu planı", "Veritabanının sorguyu çalıştırma stratejisi; EXPLAIN QUERY PLAN ile okunur."], ["SCAN", "Tablonun tüm satırlarını gezmek (indeks yok ya da kullanılamıyor)."], ["SEARCH ... USING INDEX", "İndeks üzerinden ilgili satırlara doğrudan gitmek."], ["İndeks", "Bir ya da birkaç sütunun sıralı yardımcı kopyası; CREATE INDEX ad ON tablo(sütun)."], ["Seçicilik", "Sütundaki benzersiz değer oranı; çok az değeri olan sütunda (örn. iade: 2 değer) indeks az ayırt edicidir."], ["Olgu (fact) tablosu", "Ölçüleri ve olayları tutar (siparis: adet, birim_fiyat, indirim_orani)."], ["Boyut (dimension) tablosu", "Olguyu açıklayan öznitelikler (musteri: segment, şehir; urun: kategori, maliyet)."], ["Yıldız şema", "Ortada olgu, çevresinde boyut tabloları; boyutlar olguya anahtarla bağlanır."], ["Tanecik (grain)", "Bir satırın neyi temsil ettiği: siparis'te bir sipariş, hedef'te bir ay."], ["Fan-out (çoğaltma)", "Farklı tanecikli tabloları doğrudan birleştirince küçük taneciğin değerinin tekrar etmesi ve toplamın şişmesi."]],
    ornek: [
      "İndekssiz plan: EXPLAIN QUERY PLAN SELECT * FROM siparis WHERE musteri_id = 'M01' → 'SCAN siparis' (12 satırın tamamı gezilir).",
      "İndeks sonrası (alan va2-12-sql): CREATE INDEX idx_siparis_musteri ON siparis(musteri_id) → plan 'SEARCH siparis USING INDEX idx_siparis_musteri (musteri_id=?)'. Bu çıktı yerel SQLite 3.47.2 ile alındı; metin sürüme göre değişebilir ve sql.js sürümünde ayrıca görülmelidir. 12 satırda süre farkı ölçülemez; etki büyük tablolarda anlamlıdır.",
      "Sütunu fonksiyona sarmak: idx_siparis_tarih varken bile WHERE strftime('%Y-%m', tarih) = '2026-01' planı 'SCAN siparis' kalır; aralık biçimi WHERE tarih >= '2026-01-01' AND tarih < '2026-02-01' ise 'SEARCH ... USING INDEX idx_siparis_tarih (tarih>? AND tarih<?)' olur.",
      "Seçicilik (12 satırda benzersiz değer): siparis_id 12, musteri_id 8, odeme_turu 3, iade 2. İade sütunu iki değerli olduğundan indeks adayı olarak en zayıf olanıdır.",
      "Model: siparis = olgu (tanecik: bir sipariş; 12 satır), musteri (9 satır) ve urun (5 satır) = boyut, hedef = aylık tanecikli (4 satır) ayrı bir olgu. Yıldız: musteri ← siparis → urun.",
      "Fan-out: hedef tablosunu doğrudan siparişe ay üzerinden birleştirip SUM(hedef_ciro) alırsan Ocak 4 sipariş × 3 500 = 14 000, Şubat 4 × 6 500 = 26 000, Mart 4 × 7 000 = 28 000 çıkar (yanlış). Doğrusu: siparişi önce aya topla (CTE), sonra hedefle birleştir: gerçekleşme Ocak 2 772,5 / 3 500 ≈ %79,2; Şubat 7 130 / 6 500 ≈ %109,7; Mart 6 105 / 7 000 ≈ %87,2; Nisan'ın 5 000 hedefi için sipariş yok (LEFT JOIN ile NULL görünür)."
    ],
    analoji: { a: "Kitap dizini: 'musteri_id' dizini, kitabın tüm sayfalarını okumak yerine ilgili sayfaya gitmeni sağlar; ama kitap değiştikçe dizini de güncellemek zorundasın.", sinir: "Kitap dizini her zaman işe yarar; SQL'de planlayıcı indeksi bazen kullanmaz (küçük tablo, fonksiyona sarılmış sütun, az ayırt edici sütun) ve bunu planı okuyarak görürsün; tahmin yerine ölç." },
    gorsel: "            musteri (boyut)\n               |\n urun (boyut) -- siparis (OLGU, tanecik: 1 sipariş)\n               .\n               . (ay: farklı tanecik, önce topla sonra birleştir)\n            hedef (aylık)\n\nplan: SCAN siparis   ->  CREATE INDEX  ->  SEARCH siparis USING INDEX idx_siparis_musteri (musteri_id=?)",
    rehberli: ["Önce indeks yokken EXPLAIN QUERY PLAN SELECT * FROM siparis WHERE musteri_id = 'M01' çalıştır ve 'SCAN siparis' gör.", "CREATE INDEX IF NOT EXISTS idx_siparis_musteri ON siparis(musteri_id); sonra planı yeniden çalıştır; detail sütununda indeks adını gör (alan va2-12-sql).", "tarih için indeks kur ve iki sorguyu karşılaştır: strftime(...) = '2026-01' (SCAN) ve tarih aralığı (SEARCH). Ardından hedef ile siparişi doğrudan birleştirip SUM(hedef_ciro)'nun 14 000'e şiştiğini, aya toplayıp birleştirince 3 500 kaldığını doğrula."],
    bagimsiz: "(1) odeme_turu için bir indeks kur ve WHERE odeme_turu = 'nakit' planını oku; plan indeksi kullandı mı, 12 satırlık tabloda nedenini yaz (çıktıyı kendin gör, tahmin etme). (2) PRAGMA index_list(siparis) ile siparis tablosundaki indeksleri listele. (3) Kendi seçtiğin bir iş sorusu için olgu, boyutlar ve tanecik tanımını (tek cümleyle) yaz ve hangi birleştirmenin fan-out riski taşıdığını işaretle.",
    hatalar: [
      ["Her sütuna indeks kurmak", "İndeks yazmayı yavaşlatır ve yer tutar; yalnız sık filtrelenen/birleştirilen ve ayırt edici sütunlara kur, planla doğrula."],
      ["WHERE'de indeksli sütunu fonksiyona sarmak (strftime(tarih) = ...)", "Sorguyu sütunu çıplak bırakan aralık biçimine çevir (tarih >= ... AND tarih < ...)."],
      ["Küçük tabloda sürenin değişmemesine bakıp indeksi 'işe yaramaz' saymak", "12 satırda süre farkı ölçülemez; planın SCAN'den SEARCH'e dönmesi doğru kanıttır, süre ancak büyük veride anlamlıdır."],
      ["Farklı tanecikli tabloları (sipariş × aylık hedef) doğrudan birleştirip toplamak", "Önce aynı tanecikte topla (aya göre ciro), sonra birleştir; sonucu toplam hedefle çapraz doğrula."],
      ["Plan metninin her sürümde aynı olduğunu sanmak", "Plan metni SQLite sürümüne ve veritabanına göre değişir; kendi ortamında çalıştırıp oku."]
    ],
    kontrol: [
      { q: "EXPLAIN QUERY PLAN çıktısı 'SCAN siparis' ise ne olur?", o: ["Sorgu hata verir", "Tablonun tüm satırları gezilir (indeks kullanılmıyor)", "İndeks kullanılıyor", "Sorgu yazma yapıyor"], a: 1, why: "SCAN, tüm satırların taranması demektir; indeks kullanıldığında plan SEARCH ... USING INDEX gösterir.", bolum: "terimler" },
      { q: "idx_siparis_tarih mevcutken hangi WHERE biçimi indeksi KULLANAMAZ?", o: ["tarih >= '2026-01-01' AND tarih < '2026-02-01'", "tarih = '2026-01-05'", "strftime('%Y-%m', tarih) = '2026-01'", "tarih > '2026-02-01'"], a: 2, why: "Sütun fonksiyona sarılınca indeks sıralaması kullanılamaz; plan SCAN kalır.", bolum: "ornek" },
      { q: "hedef tablosunu (aylık) doğrudan siparişe ay üzerinden birleştirip SUM(hedef_ciro) alırsan Ocak için kaç çıkar?", o: ["3 500", "7 000", "2 772,5", "14 000"], a: 3, why: "Ocak'ta 4 sipariş var; 3 500 hedef 4 kez tekrarlanır: 14 000 (fan-out).", bolum: "ornek" },
      { q: "Bu şemada olgu ve boyut tabloları hangileridir?", o: ["Olgu: siparis; boyutlar: musteri ve urun", "Olgu: musteri; boyut: siparis", "Hepsi olgu", "Olgu: urun; boyut: hedef"], a: 0, why: "siparis ölçüleri (adet, fiyat, indirim) taşır; musteri ve urun onu açıklar.", bolum: "aciklama" },
      { q: "12 satırlık siparis tablosunda indeks sonrası sorgu süresi ölçülebilir şekilde azalmadı. Doğru yorum hangisi?", o: ["İndeks hiç işe yaramaz", "Plan SEARCH'e döndüyse mekanizma çalışıyor; süre farkı küçük veride ölçülemez", "Sorgu yanlıştı", "İndeks bozuk"], a: 1, why: "Küçük tabloda tam tarama da hızlıdır; planı okumak süre ölçmekten daha güvenilir kanıttır.", bolum: "hatalar" }
    ],
    gecme: { olcut: "Bilgi kontrolünde %80; alan va2-12-sql doğru (indeks kuruldu, planda SEARCH ve indeks adı); fan-out örneğini açıklayabiliyor.", kritik: ["SCAN ile SEARCH farkını okuyamamak", "Farklı tanecikli tabloları doğrudan toplayıp ölçüyü şişirmek", "Plan çıktısına bakmadan 'hızlandı' demek"] },
    kaynaklar: [
      { t: "SQLite: EXPLAIN QUERY PLAN", u: "https://www.sqlite.org/eqp.html", dogrulama: DOG, neden: "Plan satırlarının (SCAN, SEARCH, USING INDEX) anlamı için resmî belge." },
      { t: "SQLite: sorgu planlayıcı ve indeksler", u: "https://www.sqlite.org/queryplanner.html", dogrulama: DOG, neden: "İndeksin neden hızlandırdığı ve ne zaman kullanılmadığı." },
      { t: "SQLite: CREATE INDEX", u: "https://www.sqlite.org/lang_createindex.html", dogrulama: DOG, neden: "CREATE INDEX [IF NOT EXISTS] söz dizimi." }
    ],
    telafi: "Önce yalnız şu iki ifadeyi sırayla çalıştır: EXPLAIN QUERY PLAN SELECT * FROM siparis WHERE musteri_id = 'M01'; (SCAN gör) ve CREATE INDEX IF NOT EXISTS idx_siparis_musteri ON siparis(musteri_id); sonra ilkini tekrar çalıştır (SEARCH gör). Modelleme tarafında takılırsan her tabloya 'bir satır neyi temsil ediyor?' diye tek cümle yaz: siparis = bir sipariş, hedef = bir ay.",
    sonraki: "Sıradaki ders: iş sorusunu doğru sorguya çevirmek (Seviye 2'nin son dersi)."
  });

  /* ---------- va2-13 · İş sorusunu doğru sorguya çevirmek ---------- */
  VA.dersler.push({
    id: "va2-13", seviye: 2, ad: "İş sorusunu doğru sorguya çevirmek",
    hedefler: ["Belirsiz bir iş sorusundaki belirsizlikleri listelemek ve bir tanıma bağlamak", "Tanımı sorguya çevirmek ve her varsayımı yazılı bırakmak", "Sonucu toplam, satır sayısı ve alternatif tanımla doğrulayıp raporlamak"],
    onkosul: "Ders 1–12 (özellikle JOIN, GROUP BY, CASE, alt sorgu/CTE, veri kalitesi).",
    aciklama: "İş soruları nadiren sorguya hazır gelir: 'En iyi müşterilerimiz kimler?' sorusunda 'en iyi' neye göre (sipariş sayısı, ciro, kâr), ciro brüt mü net mi, iadeler dahil mi, hangi dönem, kaç kişi? Sorguyu yazmadan önce bu belirsizlikleri listeler ve tanımı sabitlersin. Dört adım: (1) Belirsizliği bul: ölçü, kapsam, dönem, birim, hariç tutulanlar. (2) Tanımı yaz: tek cümleyle ve sayılabilir biçimde. (3) Sorguyu yaz: tanımın her ifadesi sorguda bir karşılık bulsun. (4) Doğrula: sonuç toplamı ile bilinen toplam tutuyor mu, satır sayısı beklenen mi, JOIN satır çoğalttı mı, alternatif tanım farklı bir cevap veriyor mu; ve tanımı sonuçla birlikte raporla. Aynı veri farklı tanımlarla farklı liderler üretebilir; hangi tanımı seçtiğini söylemeden verilen cevap eksiktir.",
    terimler: [["Belirsiz soru", "Ölçüsü, kapsamı ya da dönemi belli olmayan iş sorusu."], ["Tanım", "Soruyu sayılabilir hale getiren yazılı kural (örn. iade edilmemiş siparişlerin net cirosu)."], ["Varsayım", "Tanımın veriden gelmeyen kısmı (örn. boş indirim = 0)."], ["Kapsam/Dönem", "Hangi satırlar ve hangi tarih aralığı hesaba giriyor."], ["Doğrulama", "Sonucu bağımsız bir toplam, satır sayısı ya da alternatif hesapla çapraz kontrol etmek."], ["Tanım duyarlılığı", "Tanım değişince sonucun (lider, sıra) değişmesi."], ["Rapor cümlesi", "Sonuç + tanım + varsayım + veri sınırı birlikte yazılan tek cümle."]],
    ornek: [
      "Belirsiz soru: 'En iyi 3 müşterimiz kim?'. Belirsizlikler: en iyi = ne (sipariş sayısı, ciro, kâr)? brüt mü net mi? iadeler dahil mi? dönem? eşitlikte ne olacak?",
      "Tanım A (sipariş sayısı): M01 3 sipariş (en çok); M02 ve M03 2'şer. Tanım B (net ciro, iadeler dahil): M03 4 650 (S003 450 + S010 4 200), M05 3 570, M01 1 772,5. Tanım C (iade edilmemiş siparişlerin net cirosu): M03 4 200, M05 3 570, M01 1 772,5. Lider A'da M01, B ve C'de M03: tanım sonucu değiştirdi.",
      "Sorgu iskeleti (tanım C, alan va2-13-sql): iade = 'hayır' süz → net tutarı hesapla (COALESCE) → musteri_id'ye göre topla → musteri tablosundan segment ekle → net ciroya göre azalan sırala → LIMIT 3.",
      "Doğrulama: (a) tüm müşterilerin iadesiz net ciro toplamı 15 057,5 = 16 007,5 − 950 (iadeli S003 450 ve S007 500). (b) siparis ile musteri birleştirmesi 12 satır döndürür, sipariş sayısı değişmedi: JOIN çoğaltmadı. (c) İlk 3 müşterinin toplamı 9 542,5 = iadesiz toplamın yaklaşık %63,4'ü. (d) B ile C arasında M03 farkı 450 = iadeli S003.",
      "Rapor cümlesi: 'Ocak–Mart 2026'da iade edilmeyen siparişlerin net cirosuna göre ilk 3 müşteri M03 (4 200), M05 (3 570) ve M01 (1 772,5)'tir; boş indirimli 1 sipariş (S007) indirimsiz sayıldı; veri 12 siparişlik sentetik örnektir.'",
      "Başka soru türü: 'En kârlı ürün?' için kâr tanımı gerekir; indirimsiz brüt kâr = adet × (birim_fiyat − maliyet), iadeler dahil: Monitör 2 200, Kulaklık 1 350, Klavye 1 120, Fare 660 (indirim ve iade hesaba katılmadı: bu bir tanım seçimidir)."
    ],
    analoji: { a: "Sipariş formu: müşteri 'iyi bir pizza' der; garson boyutu, hamuru, malzemeyi sorarak onu mutfağın pişirebileceği bir siparişe çevirir ve sonda tabağı siparişle karşılaştırır.", sinir: "Garsonun elinde menü vardır; analistin elindeki veri bazı soruları hiç cevaplayamayabilir (sütun yoktur), bu durumda 'bu veriyle cevaplanamaz' demek de bir sonuçtur." },
    gorsel: "belirsiz soru -> belirsizlikler (ölçü, kapsam, dönem, iade?) -> TANIM -> sorgu -> doğrulama (toplam, satır sayısı, JOIN, alternatif tanım) -> rapor cümlesi (tanım + varsayım + sınır)",
    rehberli: ["'En iyi müşteri' için üç tanım yaz (sipariş sayısı, iadeler dahil net ciro, iadesiz net ciro) ve her biri için tek müşteri lideri elle bul: M01, M03, M03.", "Tanım C'yi sorguya çevir (alan va2-13-sql): iade = 'hayır', net tutar, GROUP BY musteri_id, segment için JOIN, ORDER BY net_ciro DESC LIMIT 3. Beklenen ilk üç satır: M03, M05, M01.", "Sonucu doğrula: tüm müşteri toplamının 15 057,5 olduğunu, JOIN sonrası satır sayısının 12 kaldığını ve ilk 3'ün toplamının 9 542,5 olduğunu sorguyla göster."],
    bagimsiz: "Yeni bir belirsiz soru seç: 'Hangi şehir en çok kazandırıyor?'. (1) En az üç belirsizlik yaz. (2) Tek bir tanım seç (ölçü, iade, dönem). (3) Sorguyu yaz ve sonucu iki farklı yolla doğrula. (4) Alternatif bir tanımla lider değişiyor mu, göster. (5) Raporu tek cümleyle yaz: tanım + varsayım + veri sınırı.",
    hatalar: [
      ["Tanımı yazmadan sorguya başlamak ('en iyi' = aklındaki ilk ölçü)", "Önce ölçü, kapsam ve dönemi yaz; sorguyu tanıma göre kur."],
      ["Sonucu bağımsız bir toplamla doğrulamamak", "Toplamları (ör. 15 057,5), satır sayısını ve JOIN öncesi/sonrası satır adedini karşılaştır."],
      ["İadeleri ve boş değerleri sessizce dahil etmek ya da dışlamak", "Her varsayımı sorguda görünür yap (WHERE iade = 'hayır', COALESCE) ve raporda belirt."],
      ["Tanımın sonucu değiştirdiğini göstermemek", "Alternatif bir tanımla sonucu karşılaştır; lider değişiyorsa raporda söyle."],
      ["Veri sınırını (12 sentetik sipariş, neden bilinmez) belirtmeden kesin iddiada bulunmak", "Rapor cümlesine veri boyutunu ve cevaplanamayan kısmı ekle."]
    ],
    kontrol: [
      { q: "'En iyi müşteri' sorusu için ilk adım ne olmalı?", o: ["Hemen SELECT yazmak", "En çok sipariş vereni seçmek", "Belirsizlikleri (ölçü, dönem, iade) listeleyip tanımı sabitlemek", "Tüm tabloyu dışa aktarmak"], a: 2, why: "Tanım olmadan sorgu hangi soruyu cevapladığını bilmez.", bolum: "aciklama" },
      { q: "Bu veride sipariş sayısına göre lider M01 (3 sipariş). İadesiz net cirede lider kimdir?", o: ["M01", "M05", "M02", "M03"], a: 3, why: "M03: S010 (4 200) tek iadesiz siparişiyle 4 200 ile ilk; M01 yalnız 1 772,5 yapar. Tanım lideri değiştirdi.", bolum: "ornek" },
      { q: "Tüm müşterilerin iadesiz net ciro toplamı kaçtır ve neden?", o: ["16 007,5 (tüm net toplam)", "15 057,5 = 16 007,5 − 950 (iadeli S003 450 ve S007 500)", "9 542,5", "950"], a: 1, why: "İadeli iki siparişin net toplamı 950'dir; kalan 15 057,5 doğrulama toplamıdır.", bolum: "ornek" },
      { q: "siparis ile musteri JOIN sonrası satır sayısı 12'den 15'e çıksaydı bu neyi gösterirdi?", o: ["Birleştirme anahtarı tekil değil: JOIN satırları çoğalttı, toplamlar şişer", "Normal durum", "Veri daha da güvenilir", "Tarih hatası"], a: 0, why: "Boyut tablosunda anahtar tekrar ediyorsa JOIN çoğaltır; bu yüzden satır sayısı doğrulanır.", bolum: "hatalar" },
      { q: "Rapor cümlesi hangi bileşenleri içermelidir?", o: ["Yalnız sonuç sayısı", "Yalnız sorgu", "Sonuç + tanım + varsayım + veri sınırı", "Yalnız grafik"], a: 2, why: "Tanım ve varsayım olmadan sayı tekrar üretilemez ve yanlış yorumlanabilir.", bolum: "terimler" }
    ],
    gecme: { olcut: "Bilgi kontrolünde %80; alan va2-13-sql doğru (3 satır, doğru tanım); bağımsız görevde tanım, iki doğrulama ve rapor cümlesi yazılı.", kritik: ["Tanımı yazmadan sonucu raporlamak", "Doğrulamasız kesin iddia", "Alternatif tanımın sonucu değiştirdiğini görmezden gelmek"] },
    kaynaklar: [],
    telafi: "Önce 'en iyi müşteri' yerine yalnız bir ölçüyü yaz: 'iade edilmeyen siparişlerin net cirosu'. Sonra yalnız bir müşteriyi (M03) elle hesapla (4 200) ve sorgunun M03 satırının aynı sayıyı verdiğini doğrula; ancak sonra GROUP BY, JOIN ve LIMIT ekle.",
    sonraki: "Seviye 2'nin son dersi tamamlandı. Önerilen sonraki adım: Seviye 2 değerlendirmesi ve Seviye 2 projeleri; ardından Seviye 3 (istatistik ve analitik düşünme). Bu sıra bir öneridir, kilit zorlanmaz."
  });
})();

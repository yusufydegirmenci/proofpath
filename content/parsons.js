/* Parsons soruları (karışık satırları doğru sıraya dizme). Şimdilik Veri Analitiği Seviye 2'den 3 örnek: va2-2, va2-5, va2-8.
   Her öğe: id, ders, baslik, gorev, dogru (doğru sırayla satırlar), yanlis (en çok 2 oyalayıcı satır), ipucu (3 kademe), aciklama.
   SQL siparis / musteri / urun / hedef tablolarını kullanır (content/veri-analitigi/veri-ek.js); veri SENTETİKTİR. */
window.PP_PARSONS = window.PP_PARSONS || [];
window.PP_PARSONS.push(
  {
    id: "p-va2-2", ders: "va2-2",
    baslik: "Şubat ayının en yüksek tutarlı 2 siparişi",
    gorev: "Satış ekibi, Şubat 2026'da verilen ve iade edilmemiş siparişlerden brüt tutarı en yüksek iki tanesini görmek istiyor. Bunu cevaplayan sorguyu doğru sırayla kur.",
    dogru: [
      "SELECT siparis_id, urun, adet * birim_fiyat AS tutar",
      "FROM siparis",
      "WHERE iade = 'hayır'",
      "AND tarih LIKE '2026-02%'",
      "ORDER BY tutar DESC",
      "LIMIT 2"
    ],
    yanlis: ["ORDER BY tutar ASC", "WHERE iade = 'evet'"],
    ipucu: [
      "Sorgu bir cümle gibi sırayla okunur: ne seçilecek, nereden, hangi satırlar, nasıl sıralanacak, kaç satır kalacak.",
      "Satırları süzen koşullar sıralamadan önce gelir; en yüksek tutarlar için sıralama büyükten küçüğe olmalı ve LIMIT en sonda satır sayısını keser. İade edilmeyenleri tutan koşul 'evet' değil 'hayır' ile kurulur.",
      "Satır süzen koşullar AND ile art arda bağlanır; sıralama ve satır sınırı en sonda yer alır. Büyükten küçüğe sıralamayı ve doğru iade koşulunu seç."
    ],
    aciklama: "SQL yan tümceleri her zaman SELECT, FROM, WHERE, ORDER BY, LIMIT sırasıyla yazılır: önce satırlar süzülür, sonra sıralanır, en son LIMIT kalan satırlardan ilk ikisini alır: Şubat'ta iade edilmemiş üç sipariş vardır (S006 4200, S008 1800, S005 1600) ve LIMIT 2 en düşük tutarlı S005'i keser. LIMIT ya da ORDER BY WHERE'den önce gelseydi sorgu çalışmazdı; ASC yazmak ise en küçük tutarlıları döndürürdü."
  },
  {
    id: "p-va2-5", ders: "va2-5",
    baslik: "Cirosu yüksek şehirler (GROUP BY ve HAVING)",
    gorev: "Yönetim, iade edilmeyen siparişlerde şehir bazında sipariş sayısını ve brüt cirosu görmek istiyor; yalnız cirosu 5000'in üzerinde kalan şehirler, ciroya göre büyükten küçüğe listelenecek. Sorguyu doğru sırayla kur.",
    dogru: [
      "SELECT sehir, COUNT(*) AS siparis_sayisi, SUM(adet * birim_fiyat) AS ciro",
      "FROM siparis",
      "WHERE iade = 'hayır'",
      "GROUP BY sehir",
      "HAVING SUM(adet * birim_fiyat) > 5000",
      "ORDER BY ciro DESC"
    ],
    yanlis: ["WHERE SUM(adet * birim_fiyat) > 5000", "GROUP BY urun"],
    ipucu: [
      "İki farklı süzme var: biri tek tek satırlara (iade), biri şehirlerin toplamlarına (ciro eşiği). Satır süzmesi gruplamadan önce, grup süzmesi gruplamadan sonra yapılır.",
      "WHERE iade koşulunu taşır ve GROUP BY sehir'den önce gelir; toplama işlevi içeren 5000 koşulu ise gruplamadan sonra HAVING ile yazılır. Sıralama ciro takma adıyla en sonda yapılır.",
      "FROM'dan sonra satır süzmesi, gruplama, grup süzmesi ve sıralama sırasıyla gelir; hangi yan tümcenin hangisi olduğunu bir önceki ipucundaki kurala göre belirle. Şehir yerine ürüne göre gruplayan satır ve toplamı WHERE'e koyan satır bu soruya uymaz."
    ],
    aciklama: "WHERE satırlar gruplanmadan önce çalışır, bu yüzden SUM gibi toplama işlevlerini bilemez; toplama koşulu için gruplamadan sonra çalışan HAVING gerekir. Yan tümce sırası SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY biçimindedir ve bu veride İstanbul (6900) ile İzmir (6000) eşiği geçer."
  },
  {
    id: "p-va2-8", ders: "va2-8",
    baslik: "Hiç iade etmemiş müşteriler (alt sorgu)",
    gorev: "Müşteri hizmetleri, siparişlerinden hiçbiri iade edilmemiş müşterilerin numarasını ve segmentini istiyor. Önce iade eden müşterileri bulan alt sorguyu, sonra onları dışarıda bırakan ana sorguyu doğru sırayla kur.",
    dogru: [
      "SELECT musteri_id, segment",
      "FROM musteri",
      "WHERE musteri_id NOT IN (",
      "  SELECT musteri_id",
      "  FROM siparis",
      "  WHERE iade = 'evet'",
      ")"
    ],
    yanlis: ["WHERE musteri_id IN (", "WHERE iade = 'hayır'"],
    ipucu: [
      "Soruyu tersten çöz: önce iade edilmiş siparişi olan müşterileri bir liste olarak düşün, sonra müşteri tablosundan bu listede olmayanları al.",
      "Ana sorgu müşteri tablosundan okur ve NOT IN ile bir alt sorguya bakar; alt sorgu parantez içinde siparis tablosundan iade koşuluyla müşteri numaralarını döndürür. Alt sorgunun parantezi ayrı bir satırda kapanır.",
      "Dış sorgu müşteri tablosundan okur ve bir parantez açan WHERE satırıyla biter; parantezin içi iade edenleri bulan küçük bir sorgudur, en sonda parantez kapanır. İçeriden iade edenleri süzdüğün için koşul 'evet' tarafında olmalı; 'dışarıda bırak' mantığına uyan işleci seç."
    ],
    aciklama: "Alt sorgu parantezin içinde kendi SELECT, FROM, WHERE sırasını izler ve dış sorgunun WHERE satırı tarafından açılır; parantez kapandığında dış sorgu da tamamlanmış olur. Bu veride iade eden müşteriler M02 ile M03'tür, geriye M01, M04, M05, M06, M07, M08 ve hiç siparişi olmayan M09 kalır."
  }
);

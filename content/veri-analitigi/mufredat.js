/* Veri Analitiği yolu — müfredat ve önkoşul grafiği (M§15.1 adım 1, M§15.2).
   DURUM dürüsttür: yalnız "hazir" olan seviyede tam ders + lab + değerlendirme vardır; "yok" olanlar sadece plandır.
   Sertifika eşlemesi bu turda yapılmadı (doğrulanmadı). */
(function () {
  var VA = (window.PP_VA = window.PP_VA || {});
  VA.mufredat = {
    surum: "2026-10-tur1",
    seviyeler: [
      { id: 0, ad: "Temeller", onkosul: [], durum: "hazir", konular: ["Analist, veri mühendisi, veri bilimci ve iş analisti", "İş problemini analitik soruya çevirmek", "Satır, sütun, kayıt, değişken ve veri türleri; yapılı ve yapısız veri", "CSV, JSON, XLSX ve SQL kaynakları", "Veri sözlüğü, veri kalitesi, gizlilik ve etik yorum", "Gerekli temel matematik ve istatistik"] },
      { id: 1, ad: "Elektronik tablolar", onkosul: [0], durum: "yok", konular: ["Hücre, veri türü, formül, koşullu fonksiyonlar, aramalar, tarih ve metin", "Sıralama, filtre, tekrar, eksik değer, doğrulama", "Özet tablo, grafik, basit rapor"] },
      { id: 2, ad: "SQL", onkosul: [0, 1], durum: "yok", konular: [
        "Veritabanı, tablo, ilişki, şema", "SELECT, WHERE, ORDER BY, LIMIT, DISTINCT, NULL", "CASE WHEN", "COUNT, SUM, AVG, MIN, MAX", "GROUP BY ve HAVING", "INNER JOIN, LEFT JOIN ve diğer birleştirmeler",
        "Çok tablolu analiz", "Alt sorgu ve CTE", "Tarih ve metin fonksiyonları", "Pencere fonksiyonları (ROW_NUMBER, RANK, LAG, LEAD)", "Koşullu toplama ve veri kalitesi kontrolleri", "Sorgu planı ve performans temelleri, analitik veri modelleme", "İş sorusunu doğru sorguya çevirmek"] },
      { id: 3, ad: "İstatistik ve analitik düşünme", onkosul: [0, 1], durum: "yok", konular: ["Ortalama, ortanca, mod, yüzdelik, varyans, standart sapma", "Dağılım, aykırı değer, olasılık, örnekleme", "Evren ve örneklem; korelasyon nedensellik değildir", "Hipotez testi ve güven aralığı kavramları", "Eksik veri ve örnekleme yanlılığı", "Zaman eğilimleri, KPI tasarımı, metrik seçimi"] },
      { id: 4, ad: "Analitik için Python", onkosul: [0, 2], durum: "yok", konular: ["Ortam ve not defteri", "Değişken, tür, koleksiyon, koşul, döngü, fonksiyon", "Hata, dosya, CSV, JSON", "NumPy ve Pandas", "Temizleme, gruplama, birleştirme, pivot", "Doğrulama, görselleştirme, keşifsel analiz, tekrarlanabilirlik", "SQL'den Python'a iş akışı"] },
      { id: 5, ad: "Veri hazırlama ve ETL", onkosul: [2, 4], durum: "yok", konular: [] },
      { id: 6, ad: "Power Query, Power BI ve DAX", onkosul: [2, 5], durum: "yok", konular: [] },
      { id: 7, ad: "Veri hikâyeleştirme", onkosul: [3, 6], durum: "yok", konular: [] },
      { id: 8, ad: "PL-300 hazırlığı", onkosul: [6, 7], durum: "yok", konular: [] }
    ],
    sertifika: { ad: "Microsoft PL-300 (Power BI Data Analyst)", durum: "doğrulanmadı", not: "Resmî kapsam bu turda yeniden kontrol edilmedi; ağırlıklar sabitlenmedi, gerçek sınav sorusu yok. Yolu bitirmek sertifika anlamına gelmez." }
  };

  /* Önkoşul grafiği denetimi: döngü yok, her önkoşul var, hazır seviyenin önkoşulları hazır */
  VA.mufredatDogrula = function (m) {
    var hata = [], ids = {};
    m.seviyeler.forEach(function (s) { ids[s.id] = s; });
    m.seviyeler.forEach(function (s) {
      s.onkosul.forEach(function (o) { if (!ids[o]) hata.push("seviye " + s.id + ": bilinmeyen önkoşul " + o); else if (o >= s.id) hata.push("seviye " + s.id + ": önkoşul sonraki seviye " + o); });
      if (s.durum === "hazir") s.onkosul.forEach(function (o) { if (ids[o] && ids[o].durum !== "hazir") hata.push("seviye " + s.id + " hazır ama önkoşulu " + o + " hazır değil"); });
    });
    var sql = ids[2] && ids[2].konular.length;
    if (sql !== 13) hata.push("SQL alt konusu " + sql + " (13 olmalı)");
    return hata;
  };
})();

/* Veri Analitiği · Seviye 1–2 ortak veri ve yardımcılar. Tüm veri SENTETİKTİR (gerçek kişi/şirket yok).
   VA.veriKirli : Seviye 1 temizleme çalışması için kasten tutarsız tablo (kopya satır, metin sayı, farklı yazımlar, boş hücre).
   VA.veriSql   : Seviye 2 için siparis (Seviye 0 verisi) + ek tablolar musteri, urun, hedef (PP.alan `veri.ek`).
   VA.yd        : kontrol/varyant yazarken kullanılan yardımcılar (kontrol işlevleri sabit cevap TUTMAZ; beklenen değeri veriden sayar). */
(function () {
  var VA = (window.PP_VA = window.PP_VA || {});

  VA.veriKirli = {
    sutunlar: ["kayit_no", "tarih", "sehir", "urun", "adet", "fiyat", "odeme"],
    satirlar: [
      ["K01", "2026-01-05", "İstanbul", "Kulaklık", 2, 450, "kart"],
      ["K02", "2026-01-07", "ankara", "Klavye", 1, 800, "kart"],
      ["K03", "2026-01-12", "İzmir", "Kulaklık", 1, 450, "nakit"],
      ["K04", "2026-01-15", "İstanbul ", "Fare", 3, 250, "kart"],
      ["K05", "2026-02-02", "Ankara", "Klavye", "2 adet", 800, "havale"],
      ["K06", "2026-02-09", "IST", "Monitör", 1, 4200, "kart"],
      ["K07", "2026-02-14", "Ankara", "Fare", 2, "", "nakit"],
      ["K08", "21.02.2026", "İzmir", "Kulaklık", 4, 450, "kart"],
      ["K09", "2026-03-03", "İstanbul", "Klavye", 1, 800, "havale"],
      ["K10", "2026-03-10", "İzmir", "Monitör", 1, 4200, "kart"],
      ["K10", "2026-03-10", "İzmir", "Monitör", 1, 4200, "kart"],
      ["K11", "2026-03-18", "Ankara", "Kulaklık", 2, 450, "nakit"],
      ["K12", "2026-03-27", "İstanbul", "fare", 1, 250, "kart"]
    ]
  };

  /* Seviye 2 ek tablolar. siparis.musteri_id → musteri.musteri_id; siparis.urun → urun.urun; hedef.ay = 'YYYY-MM'.
     M09 hiç sipariş vermedi; Kamera hiç satılmadı; hedef 2026-04 için sipariş yok (LEFT JOIN / veri kalitesi alıştırmaları). */
  VA.veriSql = {
    sutunlar: null, satirlar: null, /* aşağıda siparis verisiyle doldurulur (seviye0.js sonra yüklenir) */
    ek: {
      musteri: { sutunlar: ["musteri_id", "segment", "sehir", "kayit_tarihi"], satirlar: [
        ["M01", "bireysel", "İstanbul", "2025-11-03"], ["M02", "kurumsal", "Ankara", "2025-12-10"], ["M03", "bireysel", "İzmir", "2026-01-02"],
        ["M04", "bireysel", "Ankara", "2026-01-20"], ["M05", "kurumsal", "İstanbul", "2026-01-28"], ["M06", "bireysel", "İzmir", "2026-02-05"],
        ["M07", "bireysel", "İstanbul", "2026-02-18"], ["M08", "kurumsal", "Ankara", "2026-03-01"], ["M09", "bireysel", "Bursa", "2026-03-12"]] },
      urun: { sutunlar: ["urun", "kategori", "maliyet"], satirlar: [
        ["Kulaklık", "ses", 300], ["Klavye", "çevre birimi", 520], ["Fare", "çevre birimi", 140], ["Monitör", "görüntü", 3100], ["Kamera", "görüntü", 600]] },
      hedef: { sutunlar: ["ay", "hedef_ciro"], satirlar: [["2026-01", 3500], ["2026-02", 6500], ["2026-03", 7000], ["2026-04", 5000]] }
    }
  };
  /* siparis kısmı: VA.veri (seviye0.js) yüklendikten sonra bağlanır — betik sırası: seviye0.js, veri-ek.js */
  if (VA.veri) { VA.veriSql.sutunlar = VA.veri.sutunlar; VA.veriSql.satirlar = VA.veri.satirlar; }

  var yd = VA.yd = {};
  yd.ix = function (v, ad) { return v.sutunlar.indexOf(ad); };
  yd.kopya = function (v) {
    var w = { sutunlar: v.sutunlar.slice(), satirlar: v.satirlar.map(function (r) { return r.slice(); }) };
    if (v.ek) { w.ek = {}; Object.keys(v.ek).forEach(function (a) { w.ek[a] = { sutunlar: v.ek[a].sutunlar.slice(), satirlar: v.ek[a].satirlar.map(function (r) { return r.slice(); }) }; }); }
    return w;
  };
  /* Tablo satırlarını {sütun: değer} nesnelerine çevir; boş hücre ("") → null. ad verilmezse ana tablo (siparis), verilirse v.ek[ad] */
  yd.nesneler = function (v, ad) {
    var t = ad ? v.ek[ad] : v;
    return t.satirlar.map(function (r) { var o = {}; t.sutunlar.forEach(function (c, i) { o[c] = r[i] === "" ? null : r[i]; }); return o; });
  };
  yd.gosterim = function (x) { try { return JSON.stringify(x); } catch (e) { return String(x); } };
  yd.yakin = function (a, b) { return typeof a === "number" && typeof b === "number" && Math.abs(a - b) < 1e-6; };
  /* SQL sonucu: tek hücre / ilk sütun / tüm satırlar (dizi dizisi) */
  yd.sqlTek = function (s) { return s.satirlar.length === 1 && s.sutunlar.length === 1 ? s.satirlar[0][0] : undefined; };
  yd.sqlSatirlar = function (s) { return s.satirlar.map(function (r) { return r.slice(); }); };
  /* Satır kümesi karşılaştırma (sıra önemsiz); sayılar yakın kabul edilir */
  function hucre(x) { return typeof x === "number" ? String(Math.round(x * 1e6) / 1e6) : String(x); }
  yd.ayniSatirlar = function (a, b) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
    var f = function (L) { return L.map(function (r) { return Array.isArray(r) ? r.map(hucre).join("\u0001") : hucre(r); }).sort(); }, x = f(a), y = f(b);
    return x.every(function (e, i) { return e === y[i]; });
  };
  yd.siraliSatirlar = function (a, b) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
    return a.every(function (r, i) { var q = Array.isArray(r) ? r : [r], w = Array.isArray(b[i]) ? b[i] : [b[i]]; return q.length === w.length && q.every(function (e, j) { return hucre(e) === hucre(w[j]); }); });
  };
  yd.sayi = function (bulunan, bek, ipucu) { var d = yd.yakin(bulunan, bek); return { dogru: d, mesaj: d ? "Sonuç veriyle uyuşuyor." : "Bulduğun değer: " + yd.gosterim(bulunan) + ". " + (ipucu || "Tek bir sayı döndürmelisin.") }; };
  yd.satirlar = function (bulunan, bek, ipucu, sirali) {
    var d = sirali ? yd.siraliSatirlar(bulunan, bek) : yd.ayniSatirlar(bulunan, bek);
    return { dogru: d, mesaj: d ? "Sonuç veriyle uyuşuyor." : "Bulduğun: " + yd.gosterim(bulunan) + ". " + (ipucu || "Satır sayısını, sütun sırasını ve değerleri kontrol et.") };
  };
  yd.degerOf = function (s) { return s.sonucTanimli ? s.deger : undefined; };
  /* Python sonucu sayı/liste ise JSON'dan gelir (None → null) */
})();

"use strict";
/* ALAN: Sözlük sekmesi veri hazırlığı (Faz 31). NE YAPAR: Elle yazılmış GLOS, ders kavram kartları ve content/sozluk-ek.js satırlarını tek, tekrarsız, alfabetik listeye çevirir; saf işlev, DOM/S'ye dokunmaz.
   SORUN OLURSA: Aynı terim iki kaynakta varsa ilk kaynak kazanır (GLOS, ders kartı, ek); anahtar küçük harf ve harf/rakam dışı atılarak karşılaştırılır; rehber-sozluk.js'ten ÖNCE yüklenir.
   YENİ ÖZELLİK: Yeni kaynak için ekle() çağrısı çoğaltılır, çıktı alanları {ad, ara[], tx, ders, en}; tests/sozluk.js güncellenir. */
/* Sözlük birleştirici (Faz 31). NE YAPAR: elle yazılmış GLOS + derslerin kavram kartları (warmup.concepts) + content/sozluk-ek.js satırlarını tek, tekrarsız,
   alfabetik listeye çevirir. Saf işlev: DOM/S'ye dokunmaz, node testinde (tests/sozluk.js) çalışır.
   SORUN: aynı terim iki kaynakta varsa ilk kaynak kazanır (GLOS > ders kartı > ek); anahtar, küçük harf + harf/rakam dışını atarak karşılaştırılır.
   YENİ KAYNAK: yeni bir kaynak eklenecekse aşağıdaki ekle() çağrısını çoğalt; çıktı alanları: {ad, ara[], tx, ders, en}. */
(function (g) {
  var HAT = { bk: "Backend/AWS", sec: "Siber", ccna: "Ağ (CCNA)", py: "Python", js: "JavaScript", qa: "QA", dev: "DevOps", eng: "İngilizce" };
  function norm(s) { return String(s || "").toLocaleLowerCase("tr").replace(/[^a-z0-9çğıöşü]+/g, ""); }
  function dersEtiket(d) { var p = String(d || "").split("-"); return p.length === 2 && HAT[p[0]] ? HAT[p[0]] + " · ders " + p[1] : ""; }
  function birlestir(glos, dersler, ek) {
    var out = [], goruldu = {};
    function ekle(ad, ara, tx, ders, en, anahtar) {
      if (!ad || !tx) return;
      var k = norm(anahtar || ad);
      if (!k || goruldu[k]) return;
      goruldu[k] = 1; (ara || []).forEach(function (a) { var n = norm(a); if (n && !goruldu[n]) goruldu[n] = 1; });
      out.push({ ad: ad, ara: (ara || []).map(function (a) { return String(a).toLowerCase(); }), tx: tx, ders: ders || "", en: en || "" });
    }
    (glos || []).forEach(function (x) { ekle(x[1], x[2], x[3], "", "", x[0]); });
    Object.keys(dersler || {}).forEach(function (hat) {
      Object.keys(dersler[hat] || {}).forEach(function (no) {
        var w = dersler[hat][no].warmup, c = w && Array.isArray(w.concepts) ? w.concepts : [];
        c.forEach(function (x) { if (x && x.term && x.summary) ekle(x.tr ? x.term + " (" + x.tr + ")" : x.term, [x.term], x.summary + (x.example ? " Örnek: " + x.example : ""), hat + "-" + no, x.term, x.term); });
      });
    });
    (ek || []).forEach(function (x) { ekle(x[1], x[2], x[3], x[4], x[5], x[0]); });
    return out.sort(function (a, b) { return a.ad.localeCompare(b.ad, "tr"); });
  }
  g.PP_SOZLUK = { birlestir: birlestir, dersEtiket: dersEtiket, norm: norm };
})(typeof window !== "undefined" ? window : globalThis);

"use strict";
/* ---- Faz 8 tur 2: proje tanımlarını (M§8.6, 10 alan) ve kademe başına çekirdek projeleri yollara birleştirir ----
   Veri: js/veri/proje-tanim-*.js (mevcut projelere 8 ek alan) ve js/veri/proje-yeni-*.js (yeni çekirdek projeler, VA Seviye 0 ayrı liste).
   yollar.js'ten SONRA, proje-atolyesi.js'ten ÖNCE yüklenir. Kayıtlı ilerleme anahtarı değişmez (path-<proje id>); mevcut proje id'leri korunur.
   Bu tanımlar öğrenme içeriğidir; hiçbir alan "doğrulandı" anlamına gelmez, kabul ölçütlerini öğrenci kendi denetler. */
(function (g) {
  var K = g.PP_PROJ = g.PP_PROJ || { tanim: {}, yeni: [], va: [] };
  if (typeof PATHS === "undefined") return;
  var ALAN = ["onkosul", "gereksinim", "kabul", "rubrik", "savunma", "yetkinlikler", "telafi", "sonraki"];

  function proje(pid) { var r = null; PATHS.forEach(function (p) { p.projects.forEach(function (j) { if (j.id === pid) r = j; }); }); return r; }

  Object.keys(K.tanim).forEach(function (pid) {
    var d = proje(pid);
    if (!d) return;
    ALAN.forEach(function (a) { if (K.tanim[pid][a] != null) d[a] = K.tanim[pid][a]; });
  });

  K.yeni.forEach(function (y) {
    var yol = PATHS.filter(function (p) { return p.id === y.yol; })[0];
    if (!yol || proje(y.id)) return;
    var j = {};
    Object.keys(y).forEach(function (k) { if (k !== "yol" && k !== "steps") j[k] = y[k]; });
    j.steps = y.steps.map(function (s) { return { t: s[0], learn: s[1], doit: s[2], proof: s[3], en: s[4], q: s[5], g: s[6] || "" }; });
    j.path = yol.id;
    j.cekirdek = true;
    yol.projects.push(j);
  });

  /* Veri Analitiği Seviye 0 projeleri yollar listesinde değil (VA kendi yolu); adımlar aynı nesne biçimine çevrilir */
  K.va.forEach(function (v) {
    if (v.steps && v.steps.length && Array.isArray(v.steps[0])) v.steps = v.steps.map(function (s) { return { t: s[0], learn: s[1], doit: s[2], proof: s[3], en: s[4], q: s[5], g: "" }; });
  });

  /* Kademe sırası: lv artan, kapston en sona; aynı kademede mevcut sıra korunur (kararlı sıralama) */
  PATHS.forEach(function (p) {
    var sira = p.projects.map(function (j, i) { return { j: j, i: i }; });
    sira.sort(function (a, b) { return (a.j.lv - b.j.lv) || ((a.j.cap ? 1 : 0) - (b.j.cap ? 1 : 0)) || (a.i - b.i); });
    p.projects = sira.map(function (x) { return x.j; });
  });

  /* Denetim yardımcıları (test ve rapor için): kademe başına çekirdek proje sayısı */
  K.kademeSayilari = function () {
    var out = {};
    PATHS.forEach(function (p) {
      p.projects.forEach(function (j) {
        if (j.cap) return;
        out[p.id] = out[p.id] || {};
        out[p.id][j.lv] = (out[p.id][j.lv] || 0) + 1;
      });
    });
    return out;
  };
})(window);

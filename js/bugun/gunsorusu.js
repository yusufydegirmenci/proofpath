"use strict";
/* ---- Günün sorusu (Faz 10 tur 4): mevcut soru havuzundan (QB) yerel tarihe bağlı, deterministik seçim ----
   Aynı gün + aynı havuz = aynı soru (rastgelelik yok). Cevap ya_pp_ogr.tercih.gunsorusu içinde saklanır: {gun, k, cevap}.
   Yanlış cevap mevcut oyun tekrar kuyruğuna (gqMark, 1-3-7-14 gün) girer; ayrı bir tekrar sistemi yoktur. Cezasızdır: seri/XP/ustalık değişmez. */
(function (g) {
  var PP = g.PP = g.PP || {};

  function hash(s) { var t = 2166136261; for (var i = 0; i < s.length; i++) { t ^= s.charCodeAt(i); t = Math.imul(t, 16777619) >>> 0; } return t >>> 0; }
  /* gun: "YYYY-AA-GG"; adaylar: soru dizinleri (sıralı dizi). Boşsa null. */
  function sec(gun, adaylar) {
    if (!Array.isArray(adaylar) || !adaylar.length || typeof gun !== "string") return null;
    var s = adaylar.slice().sort(function (a, b) { return a - b; });
    return s[hash("gunsorusu:" + gun) % s.length];
  }
  function oku() { try { var o = PP.ogr.depo.tercih("gunsorusu"); return o && typeof o === "object" ? o : null; } catch (e) { return null; } }
  function yaz(o) { try { return !!PP.ogr.depo.tercih("gunsorusu", o); } catch (e) { return false; } }
  /* Bugünkü cevap: gün ve soru anahtarı eşleşirse {cevap}, yoksa null */
  function cevap(gun, k) { var o = oku(); return o && o.gun === gun && o.k === k && typeof o.cevap === "number" ? o.cevap : null; }
  function cevapla(gun, k, j) { return yaz({ gun: gun, k: k, cevap: j }); }

  PP.gunSorusu = { hash: hash, sec: sec, cevap: cevap, cevapla: cevapla };
})(typeof window !== "undefined" ? window : globalThis);

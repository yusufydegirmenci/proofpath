"use strict";
/* ---- Açıklama modları (M§8.5): aynı dersin AYNI teknik kaynağından (konu haritası + ders) 8 farklı görünüm ----
   Mod içerik üretmez/uydurmaz: yalnız var olan alanları seçer ve düzenler; alan yoksa "bu ders için içerik yok" der.
   Tercih kalıcıdır: ya_pp_ogr.tercih.aciklama (PP.ogr.depo.tercih). */
(function (g) {
  var O = g.PP.ogr;
  var MODLAR = [
    ["standart", "Tam anlatım"], ["kisa", "Kısa özet"], ["benzetme", "Benzetmeyle"], ["adim", "Adım adım"],
    ["ornek", "Örnekle"], ["ariza", "Bozulursa ne olur"], ["senaryo", "Gerçek durumlar"], ["mulakat", "Mülakat dili"]
  ];
  var VARSAYILAN = "standart";
  function gecerli(m) { return MODLAR.some(function (x) { return x[0] === m; }); }
  function ad(m) { var x = MODLAR.filter(function (y) { return y[0] === m; })[0]; return x ? x[1] : m; }
  function dizi(a) { return Array.isArray(a) ? a : []; }
  function metin(x) { return typeof x === "string" ? x.trim() : ""; }

  /* kaynak: {baslik, neden, cikti, adimlar:[[terim,açıklama]], ornek, arizalar:[[durum,sonuç]], durumlar:[[durum,doğru,...]], benzetme, mulakat:[{q,a}]} */
  function icerik(mod, k) {
    k = k || {};
    if (!gecerli(mod)) mod = VARSAYILAN;
    var m = [];
    if (mod === "standart") { if (metin(k.neden)) m.push(metin(k.neden)); dizi(k.adimlar).forEach(function (a) { m.push(a[0] + ": " + a[1]); }); }
    else if (mod === "kisa") { if (metin(k.cikti)) m.push(metin(k.cikti)); var s = metin(k.neden), i = s.search(/[.!?]\s/); if (i >= 0) s = s.slice(0, i + 1); if (s) m.push(s); }
    else if (mod === "benzetme") { if (metin(k.benzetme)) { m.push(metin(k.benzetme)); dizi(k.adimlar).slice(0, 4).forEach(function (a) { m.push(a[0] + " → " + a[1]); }); } }
    else if (mod === "adim") dizi(k.adimlar).forEach(function (a, i) { m.push((i + 1) + ". " + a[0] + ": " + a[1]); });
    else if (mod === "ornek") { if (metin(k.ornek)) m.push(metin(k.ornek)); }
    else if (mod === "ariza") dizi(k.arizalar).forEach(function (a) { m.push(a[0] + " → " + a[1]); });
    else if (mod === "senaryo") dizi(k.durumlar).forEach(function (a) { if (a && a[0] && a[1]) m.push(a[0] + " → " + a[1]); });
    else if (mod === "mulakat") dizi(k.mulakat).forEach(function (x) { var q = metin(x && (x.q || x.question)), a = metin(x && (x.a || x.answer)); if (q) m.push(q + (a ? " — " + a : "")); });
    return { mod: mod, ad: ad(mod), baslik: k.baslik || "", maddeler: m, bos: m.length === 0, kod: mod === "ornek" };
  }

  O.aciklama = { MODLAR: MODLAR, VARSAYILAN: VARSAYILAN, gecerli: gecerli, ad: ad, icerik: icerik };
})(typeof window !== "undefined" ? window : globalThis);

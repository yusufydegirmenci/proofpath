"use strict";
/* ---- Yetkinlik grafiği (M§6): yol/kademe/modül/ders, yetkinlik + önkoşul, hedef, kapı tanımları ---- */
(function (g) {
  var O = g.PP.ogr;
  function yeni(surum) {
    return {
      surum: surum || "1",        /* içerik (müfredat) sürümü */
      yollar: {}, kademeler: {}, moduller: {}, dersler: {},
      yetkinlikler: {}, hedefler: {}, projeler: {}, kapilar: {}
    };
  }
  function ekle(G, tur, o) {
    if (!o || !o.id) throw new Error("PP.ogr.graf: " + tur + " kimliği yok");
    if (G[tur][o.id]) throw new Error("PP.ogr.graf: yinelenen " + tur + " " + o.id);
    G[tur][o.id] = o;
    return o;
  }
  function yetkinlikEkle(G, o) { o.onkosullar = o.onkosullar || []; return ekle(G, "yetkinlikler", o); }
  function hedefEkle(G, o) {
    o.kritik = !!o.kritik; o.esdegerler = o.esdegerler || []; o.varyantlar = o.varyantlar || [];
    o.surum = o.surum || G.surum; o.uyumluSurumler = o.uyumluSurumler || [];
    return ekle(G, "hedefler", o);
  }
  function projeEkle(G, o) { o.hedefler = o.hedefler || []; o.yetkinlikler = o.yetkinlikler || []; return ekle(G, "projeler", o); }
  function kapiEkle(G, o) { o.onkosulKapilar = o.onkosulKapilar || []; o.hedefler = o.hedefler || []; return ekle(G, "kapilar", o); }

  /* Doğrudan + dolaylı önkoşullar (sıralı, tekrarsız). Döngüde sonsuz döngüye girmez. */
  function onkosulKapanisi(G, id) {
    var out = [], gor = {};
    (function gez(x) {
      var y = G.yetkinlikler[x]; if (!y) return;
      y.onkosullar.forEach(function (p) { if (!gor[p]) { gor[p] = 1; gez(p); out.push(p); } });
    })(id);
    return out;
  }
  function norm(s) { return String(s == null ? "" : s).toLowerCase().replace(/[^a-z0-9çğıöşü]+/g, " ").trim(); }

  /* Tutarlılık denetimi: hata = model bozuk; uyari = içerik eksik (örn. kademede 4 ayrı çekirdek proje yok). */
  function dogrula(G) {
    var hata = [], uyari = [];
    Object.keys(G.yetkinlikler).forEach(function (id) {
      G.yetkinlikler[id].onkosullar.forEach(function (p) {
        if (!G.yetkinlikler[p]) hata.push("yetkinlik " + id + ": bilinmeyen önkoşul " + p);
        if (p === id) hata.push("yetkinlik " + id + ": kendi önkoşulu");
      });
    });
    var renk = {};
    (function () { /* döngü: DFS */
      function gez(id, yol) {
        if (renk[id] === 2) return;
        if (renk[id] === 1) { hata.push("önkoşul döngüsü: " + yol.concat(id).join(" → ")); return; }
        renk[id] = 1;
        (G.yetkinlikler[id] ? G.yetkinlikler[id].onkosullar : []).forEach(function (p) { if (G.yetkinlikler[p] && p !== id) gez(p, yol.concat(id)); });
        renk[id] = 2;
      }
      Object.keys(G.yetkinlikler).forEach(function (id) { gez(id, []); });
    })();
    Object.keys(G.hedefler).forEach(function (id) {
      var h = G.hedefler[id];
      if (!G.yetkinlikler[h.yetkinlik]) hata.push("hedef " + id + ": bilinmeyen yetkinlik " + h.yetkinlik);
      h.esdegerler.forEach(function (e) {
        if (!G.hedefler[e]) hata.push("hedef " + id + ": bilinmeyen eşdeğer " + e);
        else if (G.hedefler[e].esdegerler.indexOf(id) < 0) hata.push("hedef " + id + ": eşdeğerlik karşılıklı değil (" + e + ")");
      });
      if (h.esik != null && !(h.esik > 0 && h.esik <= 1)) hata.push("hedef " + id + ": eşik (0,1] dışında");
    });
    Object.keys(G.kapilar).forEach(function (id) {
      var k = G.kapilar[id];
      k.onkosulKapilar.forEach(function (p) { if (!G.kapilar[p]) hata.push("kapı " + id + ": bilinmeyen önkoşul kapı " + p); });
      k.hedefler.forEach(function (p) { if (!G.hedefler[p]) hata.push("kapı " + id + ": bilinmeyen hedef " + p); });
      (k.cekirdekProjeler || []).forEach(function (p) { if (!G.projeler[p]) hata.push("kapı " + id + ": bilinmeyen proje " + p); });
    });
    /* Çekirdek projeler gerçekten ayrı olmalı (yeniden adlandırılmış kopya değil). */
    Object.keys(G.kapilar).forEach(function (id) {
      var k = G.kapilar[id]; if (!k.cekirdekProjeler) return;
      var ad = {}, imza = {};
      k.cekirdekProjeler.forEach(function (pid) {
        var p = G.projeler[pid]; if (!p) return;
        var a = norm(p.ad), im = p.hedefler.concat(p.yetkinlikler).sort().join("|");
        if (ad[a]) hata.push("kapı " + id + ": çekirdek projeler aynı adı taşıyor (" + ad[a] + ", " + pid + ")"); else ad[a] = pid;
        if (im && imza[im]) hata.push("kapı " + id + ": çekirdek projeler aynı hedef/yetkinlik kümesini ölçüyor (" + imza[im] + ", " + pid + ")"); else if (im) imza[im] = pid;
      });
      var gerek = k.minCekirdekProje != null ? k.minCekirdekProje : O.CEKIRDEK_PROJE;
      if (k.cekirdekProjeler.length < gerek) uyari.push("kapı " + id + ": " + k.cekirdekProjeler.length + "/" + gerek + " çekirdek proje tanımlı");
    });
    return { ok: hata.length === 0, hata: hata, uyari: uyari };
  }
  O.graf = { yeni: yeni, yetkinlikEkle: yetkinlikEkle, hedefEkle: hedefEkle, projeEkle: projeEkle, kapiEkle: kapiEkle, onkosulKapanisi: onkosulKapanisi, dogrula: dogrula, ekle: ekle };
})(typeof window !== "undefined" ? window : globalThis);

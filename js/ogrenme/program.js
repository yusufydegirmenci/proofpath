"use strict";
/* ---- Müfredat grafiğini mevcut içerikten kurar (ayrı bir ikinci müfredat modeli YOK) ----
   Kaynaklar: STARTER (yol → ders listesi), PATHS (proje yolları), TRK_LIST/TRN (yol adları). Grafik ilk kullanımda ve tembel kurulur;
   yükleme anında hiçbir eski küresele dokunmaz. */
(function (g) {
  var O = g.PP.ogr, G_ = O.graf;
  var KADEME = ["", "Başlangıç", "Orta", "Zor"];

  /* tanim: {surum, yollar:[{id,ad,dersler:[{ad,modul}]}], projeYollari:[{id,ad,projeler:[{id,ad,lv,cap}]}]} → grafik */
  function kur(tanim) {
    var G = G_.yeni(tanim.surum || "1");
    (tanim.yollar || []).forEach(function (y) {
      G_.ekle(G, "yollar", { id: y.id, ad: y.ad });
      var oncekiModul = null, modulNo = 0, oncekiDers = null, oncekiYet = null;
      (y.dersler || []).forEach(function (d, i) {
        var n = i + 1;
        if (d.modul !== oncekiModul) { modulNo++; oncekiModul = d.modul; G_.ekle(G, "moduller", { id: "modul:" + y.id + ":" + modulNo, ad: d.modul, yol: y.id }); }
        var yid = "yet:" + y.id + ":" + n, did = "ders:" + y.id + ":" + n;
        G_.yetkinlikEkle(G, { id: yid, ad: d.ad, yol: y.id, onkosullar: oncekiYet ? [oncekiYet] : [] });
        G_.hedefEkle(G, { id: did + ":sinav", ad: d.ad + " mini sınavı", yetkinlik: yid, esik: O.ESIK, kritik: false, varyantlar: ["v1"], uyumluSurumler: [O.eski.SURUM], minMaks: 1 });
        G_.ekle(G, "dersler", { id: did, ad: d.ad, yol: y.id, modul: "modul:" + y.id + ":" + modulNo, sira: n, onceki: oncekiDers, yetkinlikler: [yid] });
        oncekiDers = did; oncekiYet = yid;
      });
      /* Yol düzeyi: soru bankası doğruluğu (≥20 soru kanıtı, %80) */
      G_.yetkinlikEkle(G, { id: "yet:" + y.id + ":sorular", ad: y.ad + " soru bankası", yol: y.id, onkosullar: [] });
      G_.hedefEkle(G, { id: "soru-bankasi:" + y.id, ad: y.ad + " soru doğruluğu", yetkinlik: "yet:" + y.id + ":sorular", esik: O.ESIK, kritik: false, varyantlar: [], uyumluSurumler: [O.eski.SURUM], minMaks: 20 });
    });
    (tanim.projeYollari || []).forEach(function (y) {
      var tier = {};
      (y.projeler || []).forEach(function (p) {
        G_.projeEkle(G, { id: "proje:" + y.id + ":" + p.id, ad: p.ad, yol: y.id, lv: p.lv, cap: !!p.cap, eskiId: p.id });
        (tier[p.lv] = tier[p.lv] || []).push("proje:" + y.id + ":" + p.id);
      });
      var onceki = null;
      [1, 2, 3].forEach(function (lv) {
        if (!tier[lv]) return;
        G_.ekle(G, "kademeler", { id: "kademe:" + y.id + ":" + lv, ad: KADEME[lv], yol: y.id, sira: lv });
        var kid = "altin:" + y.id + ":" + lv;
        O.kapi.kademeAltin(G, { id: kid, ad: y.ad + " · " + KADEME[lv] + " Altın Vuruş", kademe: "kademe:" + y.id + ":" + lv, cekirdekProjeler: tier[lv], onkosulKapilar: onceki ? [onceki] : [] });
        onceki = kid;
      });
    });
    return G;
  }

  /* İçerik açığı raporu: dürüst durum (kademede kaç ayrı çekirdek proje tanımlı, kaç gerekli). */
  function icerikAcigi(G) {
    return Object.keys(G.kapilar).filter(function (k) { return G.kapilar[k].seviye === "L5"; }).map(function (k) {
      var K = G.kapilar[k];
      return { kapi: k, tanimli: (K.cekirdekProjeler || []).length, gerekli: K.minCekirdekProje, eksik: Math.max(0, K.minCekirdekProje - (K.cekirdekProjeler || []).length) };
    });
  }

  /* Uygulama içeriğinden tanım: yalnız ÇAĞRILDIĞINDA STARTER, PATHS, TRK_LIST küresellerini okur. */
  function uygulamadan() {
    var yollar = TRK_LIST.map(function (o) {
      return { id: o[0], ad: o[1], dersler: (STARTER[o[0]] || []).map(function (x) { return { ad: x[0], modul: x[1] }; }) };
    });
    var projeYollari = PATHS.map(function (p) {
      return { id: p.id, ad: p.name, projeler: p.projects.map(function (j) { return { id: j.id, ad: j.title, lv: j.lv, cap: !!j.cap }; }) };
    });
    return { surum: "2026-10-v1", yollar: yollar, projeYollari: projeYollari };
  }

  /* Durum: yeni depo + eski okuma + uygulama projeleri birleşimi. Hiçbir şey yazmaz. */
  function durumKur(depo, eski, projeler, anahtar) {
    var denemeler = (depo.denemeler || []).concat(eski.denemeler || []);
    var pr = {};
    Object.keys(depo.projeler || {}).forEach(function (k) { pr[k] = depo.projeler[k]; });
    (projeler || []).forEach(function (p) { var k = p && p.pid && p.status === "bitti" ? (anahtar ? anahtar(p.pid) : p.pid) : null; if (k && !pr[k]) pr[k] = { bitti: true, dogrulama: "istemci", tarih: p.finished || null, kaynak: "projeler" }; });
    return { denemeler: denemeler, dersTamam: eski.dersTamam || {}, projeler: pr, kanitlar: (depo.kanitlar || []).concat(eski.kanitlar || []), eski: eski };
  }

  O.program = { kur: kur, icerikAcigi: icerikAcigi, uygulamadan: uygulamadan, durumKur: durumKur, KADEME: KADEME };
})(typeof window !== "undefined" ? window : globalThis);

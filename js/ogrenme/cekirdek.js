"use strict";
/* ---- Faz 3: öğrenme modeli çekirdeği. Tek ad alanı: window.PP.ogr (başka küresel ad yok). ----
   Saf mantık: DOM'a ve uygulamanın eski küresellerine dokunmaz (Node'da da yüklenebilir).
   Model belgesi: proofpath-ops kayitlar/DATA_MODEL.md */
(function (g) {
  var PP = g.PP = g.PP || {};
  var O = PP.ogr = PP.ogr || {};
  O.SURUM = 1;            /* depo/model şema sürümü */
  O.ESIK = 0.8;           /* varsayılan geçme eşiği (M§11.1) */
  O.KRITIK_ESIK = 0.8;    /* kritik hedefler tek tek bu eşiği geçmeli; hedef kendi eşiğini yükseltebilir */
  O.CEKIRDEK_PROJE = 4;   /* kademe başına ayrı çekirdek proje (M§6.1) */
  O.SEVIYE = {
    L0: "Hazırlık", L1: "Bilgi", L2: "Rehberli pratik", L3: "Bağımsız pratik", L4: "Ana proje",
    L5: "Kademe Altın Vuruş", L6: "Bütünleşik Altın Vuruş", L7: "Joker kapstonu", L8: "Portfolyo ve kariyer kanıtı"
  };
  /* Joker (L7) gereksinim türleri: her biri ayrı kanıt ister (M§6.1). */
  O.JOKER_GEREKLER = ["gereksinim-analizi", "tasarim", "uygulama", "test", "guvenlik", "hata-ayiklama", "savunma"];
  O.sayi = function (x) { return typeof x === "number" && isFinite(x) ? x : 0; };
  O.yuzde = function (x) { return Math.round(x * 100) + "%"; };
  O.kopya = function (x) { return x == null ? x : JSON.parse(JSON.stringify(x)); };
})(typeof window !== "undefined" ? window : globalThis);

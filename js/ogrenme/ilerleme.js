"use strict";
/* ALAN: İlerleme, ders/konu tamam tanımı ve sıra kilidi (PP.ogr.ilerleme).
   NE YAPAR: Ders tamam (ya_lc kaydı) ve konu tamam (db konusu built) için tek tanım; tamamlanan sayısı iki kaynağın birleşimidir; yerleştirme ofseti dersleri atlandı sayılır.
   SORUN OLURSA: İlerleme ustalık değildir (ustalık: kapi.js). Eski kayıt anahtarı ya_lc; çağıranlar çok (js/bugun, js/atolye, js/mulakat/sinav-haritasi.js konuTamam, js/sinif/sinif.js sabitDurumlar).
   YENİ ÖZELLİK: Yeni adım türü ADIMLAR'a eklenir; tests/ogrenme.js (ilerleme bölümü) güncellenir. */
/* ---- İlerleme (ders tamam) için TEK tanım (Faz 4) ----
   İlerleme = sayfa/ders açma ve sıra kilidi. Ustalık DEĞİLDİR (ustalık: PP.ogr.kapi.ustalik, kanıt + %80).
   - Ders tamam (ya_lc kaydı): ısınma (w) ya da ısınma atlama işareti (w-atla) + okuma (r) + mini sınav kapısı (q) + alıştırma (p).
     Faz 4'ten itibaren "q" yalnız mini sınav %80 kapısı geçilince yazılır (PP.ogr.kapi.miniSinav); eski "q" kayıtları geçerli kalır.
   - Konu tamam (db konusu): durum "built".
   - Tamamlanan ders sayısı: iki kaynağın BİRLEŞİMİ (aynı kimlik bir kez sayılır).
   - Yerleştirme ofseti dersleri "atlandı" sayılır: sıradakini açar ama tamamlanan ders sayısına girmez. */
(function (g) {
  var O = g.PP.ogr;
  var ADIMLAR = ["w", "r", "q", "p"];
  var ATLA = "w-atla";   /* ısınma atlama işareti: ısınma (w) yerine geçer, mini sınav %80 kapısı (q) yine şart */

  function dersTamam(kayit) { return !!(kayit && typeof kayit === "object" && (kayit.w || kayit[ATLA]) && ADIMLAR.slice(1).every(function (f) { return !!kayit[f]; })); }
  function konuTamam(t) { return !!t && t.status === "built"; }

  /* lc: ya_lc nesnesi; konular: S.topics. Dönüş: tamamlanan ders sayısı. */
  function tamamSayisi(lc, konular) {
    var gor = {}, kimliksiz = 0;
    Object.keys(lc && typeof lc === "object" ? lc : {}).forEach(function (k) { if (k.charAt(0) !== "_" && dersTamam(lc[k])) gor[k] = 1; });
    (Array.isArray(konular) ? konular : []).forEach(function (t) { if (konuTamam(t)) { if (t.id == null) kimliksiz++; else gor[String(t.id)] = 1; } });
    return Object.keys(gor).length + kimliksiz;
  }

  /* Konu aşaması (şehir/semt görünümü): built 4; building → konu ustalığı ≥40 ise 3 değilse 2; next 1; diğer 0. */
  var ASAMA_USTALIK = 40;
  function asama(t) { var m = O.sayi(t && t.mastery); return konuTamam(t) ? 4 : t && t.status === "building" ? (m >= ASAMA_USTALIK ? 3 : 2) : t && t.status === "next" ? 1 : 0; }

  /* Sabit ders listesinin durumları: tamamMi(i) → bool, ofset: yerleştirmeyle atlanan ilk ders sayısı.
     Dönüş [{durum:"built"|"next"|"open", kaynak:"ders"|"yerlestirme"|null, ustalik}] — ilk tamamlanmamış/atlanmamış ders "next". */
  var BASLANGIC_USTALIGI = 60;   /* tamam/atlanmış başlangıç konusu için gösterim değeri (konu ustalığı ölçeği 0–100) */
  function sabitDurumlar(n, tamamMi, ofset) {
    var out = [], nx = false;
    for (var i = 0; i < n; i++) {
      var t = !!tamamMi(i), atla = !t && i < ofset, st = t || atla ? "built" : !nx ? "next" : "open";
      if (st === "next") nx = true;
      out.push({ durum: st, kaynak: t ? "ders" : atla ? "yerlestirme" : null, ustalik: t || atla ? BASLANGIC_USTALIGI : 0 });
    }
    return out;
  }

  O.ilerleme = { ADIMLAR: ADIMLAR, ATLA: ATLA, dersTamam: dersTamam, konuTamam: konuTamam, tamamSayisi: tamamSayisi, asama: asama, ASAMA_USTALIK: ASAMA_USTALIK, sabitDurumlar: sabitDurumlar };
})(typeof window !== "undefined" ? window : globalThis);

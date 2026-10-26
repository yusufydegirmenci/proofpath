"use strict";
/* ALAN: Ustalık için tek tanım ve eski tanılama ölçüleri (PP.ogr.ustalik).
   NE YAPAR: Ustalık yalnız kanıtla (deg.hedefDurumu, eşik %80); soru düzeyi, beceri tahmini ve yerleştirme/seviye düzeyi tanılama göstergeleri burada toplanır, tek başına geçti saymaz.
   SORUN OLURSA: Formüller eski davranışla birebir (tests/hesaplar.js). Çağıranlar js/atolye/kalite-dongusu.js, kisisel-plan.js, js/oyun/ag-kosusu.js, dino.js, js/seviye/seviye-sinavi.js.
   YENİ ÖZELLİK: Yeni gösterge buraya; tests/hesaplar.js ve tests/ogrenme.js güncellenir. */
/* ---- Ustalık için TEK tanım (Faz 4) ----
   Ustalık (geçti/kaldı) YALNIZ kanıtla belirlenir: hedef başına son sayılan deneme ≥ eşik (%80), kritik hedefler tek tek
   → PP.ogr.deg.hedefDurumu / PP.ogr.kapi.ustalik. Aşağıdaki eski ölçüler aynı yerde toplanmış TANILAMA göstergeleridir;
   hiçbiri tek başına "geçti" saymaz (soru düzeyi, beceri tahmini, yerleştirme/seviye sınavı düzeyi).
   Formüller eski davranışla birebir aynıdır (tests/hesaplar.js). */
(function (g) {
  var O = g.PP.ogr;

  /* Soru bankası soru düzeyi: 0 Denendi · 1 Aşina (≥%70) · 2 Yeterli (%100, ≥2 deneme) · 3 Usta (kutu ≥3, ≥%85, ≥3 deneme) */
  var SORU_DUZEYLERI = ["Denendi", "Aşina", "Yeterli", "Usta"];
  function soruDuzeyi(st, kutu) {
    if (!st || !st[1]) return null;
    var acc = st[0] / st[1], bx = kutu || 0;
    return bx >= 3 && acc >= 0.85 && st[1] >= 3 ? 3 : acc === 1 && st[1] >= 2 ? 2 : acc >= 0.7 ? 1 : 0;
  }

  /* Beceri tahmini (yol başına, [1,3]) ve tekrar kutusu (0–4) güncellemesi */
  var BECERI = { min: 1, maks: 3, baslangic: 1.5 };
  function beceriAdim(th, zorluk, dogru) {
    th += dogru ? (zorluk >= th ? 0.09 : 0.04) : -(zorluk <= th ? 0.14 : 0.07);
    return Math.max(BECERI.min, Math.min(BECERI.maks, th));
  }
  function kutuAdim(bx, dogru) { return dogru ? Math.min(4, (bx || 0) + 1) : 0; }

  /* Yerleştirme testi düzeyi: 1 + 2·kazanılan/maks (0,1 hassasiyet), boş test 1. Bant: <1,5 → 0, <2,3 → 1, diğer 2. */
  function yerlestirmeDuzeyi(qs, ok) {
    var pts = 0, max = 0;
    (qs || []).forEach(function (q, i) { max += q.d; if (ok && ok[i]) pts += q.d; });
    return max ? Math.round((1 + 2 * pts / max) * 10) / 10 : 1;
  }
  function yerlestirmeBandi(lv) { return lv < 1.5 ? 0 : lv < 2.3 ? 1 : 2; }

  /* Seviye sınavı: oran ≥ .62 → 3 (Usta), ≥ .32 → 2 (Kalfa), diğer 1 (Çırak); düzeyin beceri tahminine karşılığı */
  var SEVIYE_BECERI = [0, 1.0, 1.8, 2.5];
  function seviyeSinavDuzeyi(oran) { return oran >= 0.62 ? 3 : oran >= 0.32 ? 2 : 1; }

  O.ustalik = {
    SORU_DUZEYLERI: SORU_DUZEYLERI, soruDuzeyi: soruDuzeyi,
    BECERI: BECERI, beceriAdim: beceriAdim, kutuAdim: kutuAdim,
    yerlestirmeDuzeyi: yerlestirmeDuzeyi, yerlestirmeBandi: yerlestirmeBandi,
    SEVIYE_BECERI: SEVIYE_BECERI, seviyeSinavDuzeyi: seviyeSinavDuzeyi,
    /* Kanıta dayalı ustalık (geçti/kaldı) — tek kaynak */
    hedef: function (G, hedefId, denemeler, sec) { return O.deg.hedefDurumu(G, hedefId, denemeler, sec); },
    ders: function (G, dersId, durum, sec) { return O.kapi.ustalik(G, dersId, durum, sec); }
  };
})(typeof window !== "undefined" ? window : globalThis);

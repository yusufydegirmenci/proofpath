"use strict";
/* ALAN: Seri (art arda gün) için tek tanım (PP.ogr.seri): çalışma, oyun, masa serileri.
   NE YAPAR: Bugün etkinlik yoksa dünden sayar; köprü günleri (joker) seriyi kesmez ama sayılmaz; seri cezasızdır.
   SORUN OLURSA: Kaynaklar S.days, S.progress, S.treplies (eski küresel durum); çağıranlar js/bugun/bugun.js, js/cekirdek/temel.js, js/lig/lig-profil.js, js/masa/masa-mudur.js, js/oyun/ag-kosusu.js. Formüller tests/hesaplar.js ile birebir kalmalı.
   YENİ ÖZELLİK: Yeni seri türü seri.js'e eklenir; tests/ogrenme.js, hesaplar.js, faz10d.js güncellenir. */
/* ---- Seri (art arda gün) için TEK tanım (Faz 4) ----
   Kural: bugün etkinlik yoksa dünden başlanır (seri gün bitmeden kırılmaz); ardışık etkin günler sayılır;
   köprü günleri (joker) seriyi kesmez ama sayılmaz. Seri cezasızdır: kırılması ilerleme/ustalık kaybettirmez.
   Farklı olaylar ayrı adlandırılmış türlerdir (birleştirmek davranışı değiştirirdi), mantık tektir:
   - calisma: çalışma günleri (S.days dakika, rapor, mini5, canlı deneme dakikası) + haftalık joker köprüsü
   - oyun:    oyun turu oynanan günler (S.progress[].g_runs)
   - masa:    destek hattı cevabı verilen günler (S.treplies[].date)
   - lig:     lig günlüğünde soru çözülen günler (league d[gün].tot)
   Seri dondurma (Faz 10 tur 4, yalnız "calisma"): kural basit ve görünür. Kesintisiz zincirde her 7 etkin günde 1 dondurma kazanılır, en çok 2 saklanır.
   Etkin olmayan bir gün varsa ve dondurma varsa o gün otomatik köprülenir (köprü sayılmaz, joker gibi). Dondurma yoksa seri kırılır (eski davranış).
   Ayrı bir saklama yoktur: kazanım/kullanım tamamen etkin günler kümesinden yeniden hesaplanır (senkron/yeniden kurulumda tutarlı, çift sayım yok). */
(function (g) {
  var O = g.PP.ogr;

  /* etkin(gün) → bool; sec: {kopru(gün) → bool, bugun:"YYYY-AA-GG", enCok:sayı} */
  function say(etkin, sec) {
    sec = sec || {};
    var kopru = sec.kopru || function () { return false; }, enCok = sec.enCok || Infinity;
    var d = sec.bugun || O.gun.bugun(), n = 0, adim = 0;
    if (!etkin(d) && !kopru(d)) d = O.gun.ekle(d, -1);
    while ((etkin(d) || kopru(d)) && n < enCok && adim < 100000) { if (etkin(d)) n++; d = O.gun.ekle(d, -1); adim++; }
    return n;
  }
  function kume(o) { return function (d) { return !!(o && o[d]); }; }

  var DONDURMA_GUN = 7, DONDURMA_EN_COK = 2, GERI_GUN = 800, KILOMETRE = [7, 30];
  var GUN_RE = /^\d{4}-\d{2}-\d{2}$/;
  /* L: {gün: dakika} etkin günler, J: {gün: 1} joker köprüsü. Dönüş {kopru:{gün:1}, kalan, kazanilan, kullanilan, ilerleme}.
     kopru: dondurmayla köprülenen günler; kalan: eldeki dondurma; ilerleme: son dondurmadan beri kesintisiz etkin gün (7'ye tamamlanınca yenisi gelir). */
  function dondurma(L, J, bugun) {
    var O2 = g.PP.ogr, d = bugun || O2.gun.bugun(), etkin = kume(L), joker = kume(J), kopru = {};
    var ilk = Object.keys(L || {}).filter(function (k) { return GUN_RE.test(k) && etkin(k) && k <= d; }).sort()[0];
    var res = { kopru: kopru, kalan: 0, kazanilan: 0, kullanilan: 0, ilerleme: 0 };
    if (!ilk) return res;
    var bas = O2.gun.ekle(d, -GERI_GUN); if (ilk < bas) ilk = bas;
    var son = etkin(d) || joker(d) ? d : O2.gun.ekle(d, -1);   /* bugün henüz bitmedi: etkinlik yoksa eksik sayılmaz */
    var kalan = 0, seri = 0, adim = 0;
    for (var k = ilk; k <= son && adim < 100000; k = O2.gun.ekle(k, 1), adim++) {
      if (etkin(k)) {
        seri++;
        if (seri % DONDURMA_GUN === 0 && kalan < DONDURMA_EN_COK) { kalan++; res.kazanilan++; }
      } else if (joker(k)) { /* joker köprüsü: zincir sürer, dondurma harcanmaz */ }
      else if (kalan > 0) { kalan--; res.kullanilan++; kopru[k] = 1; }
      else { seri = 0; }
    }
    res.kalan = kalan; res.ilerleme = seri % DONDURMA_GUN;
    return res;
  }
  /* Kilometre taşı: yalnız tam 7. ve 30. günde (tek seferlik kutlama; kayıt arayüzde) */
  function kilometre(n) { return KILOMETRE.indexOf(n) >= 0 ? n : 0; }

  O.seri = {
    say: say,
    /* L: {gün: dakika}, J: {gün: 1} joker günleri */
    calisma: function (L, J, bugun) {
      var dz = dondurma(L, J, bugun), joker = kume(J);
      return say(kume(L), { kopru: function (d) { return joker(d) || !!dz.kopru[d]; }, bugun: bugun });
    },
    dondurma: dondurma, kilometre: kilometre, DONDURMA_GUN: DONDURMA_GUN, DONDURMA_EN_COK: DONDURMA_EN_COK, KILOMETRE: KILOMETRE,
    /* oynandi(gün) → bool; eski davranış: en çok 400 gün geriye bakılır */
    oyun: function (oynandi, bugun) { return say(oynandi, { bugun: bugun, enCok: 400 }); },
    /* gunler: {gün: 1} */
    masa: function (gunler, bugun) { return say(kume(gunler), { bugun: bugun }); },
    /* d: lig günlüğü {gün: {tot}}; yalnız tot > 0 olan gün etkin */
    lig: function (d, bugun) { return say(function (k) { return !!(d && d[k] && O.sayi(d[k].tot) > 0); }, { bugun: bugun }); },
    TURLER: ["calisma", "oyun", "masa", "lig"]
  };
})(typeof window !== "undefined" ? window : globalThis);

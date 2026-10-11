"use strict";
/* ---- Seri (art arda gün) için TEK tanım (Faz 4) ----
   Kural: bugün etkinlik yoksa dünden başlanır (seri gün bitmeden kırılmaz); ardışık etkin günler sayılır;
   köprü günleri (joker) seriyi kesmez ama sayılmaz. Seri cezasızdır: kırılması ilerleme/ustalık kaybettirmez.
   Farklı olaylar ayrı adlandırılmış türlerdir (birleştirmek davranışı değiştirirdi), mantık tektir:
   - calisma: çalışma günleri (S.days dakika, rapor, mini5, canlı deneme dakikası) + haftalık joker köprüsü
   - oyun:    oyun turu oynanan günler (S.progress[].g_runs)
   - masa:    destek hattı cevabı verilen günler (S.treplies[].date)
   - lig:     lig günlüğünde soru çözülen günler (league d[gün].tot) */
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

  O.seri = {
    say: say,
    /* L: {gün: dakika}, J: {gün: 1} joker günleri */
    calisma: function (L, J, bugun) { return say(kume(L), { kopru: kume(J), bugun: bugun }); },
    /* oynandi(gün) → bool; eski davranış: en çok 400 gün geriye bakılır */
    oyun: function (oynandi, bugun) { return say(oynandi, { bugun: bugun, enCok: 400 }); },
    /* gunler: {gün: 1} */
    masa: function (gunler, bugun) { return say(kume(gunler), { bugun: bugun }); },
    /* d: lig günlüğü {gün: {tot}}; yalnız tot > 0 olan gün etkin */
    lig: function (d, bugun) { return say(function (k) { return !!(d && d[k] && O.sayi(d[k].tot) > 0); }, { bugun: bugun }); },
    TURLER: ["calisma", "oyun", "masa", "lig"]
  };
})(typeof window !== "undefined" ? window : globalThis);

"use strict";
/* ---- Aralıklı tekrar planı (M§8.4) — PP.ogr deneme kayıtlarından TÜRETİLİR (ikinci bir depo yok) ----
   - Kaldı hedef: bugün vadeli; telafi + (varsa) farklı varyantla yeniden sınav (PP.ogr.deg.telafi / varyantSec).
   - Geçti hedef: sondan art arda geçiş sayısına göre aralık 1, 3, 7, 14, 30 gün (hata defteri Leitner aralıklarıyla aynı).
   - Öncelik: kaldı → kritik → düşük oran → eski vade. Her öğe "neden bugün" metnini taşır.
   - Kalıcılık: plan ya_pp_ogr denemelerinden hesaplanır; yeni deneme planı değiştirir, başarısız öğe geri gelir.
   - Cezasız: tekrar kaçırmak seri/XP/ustalık düşürmez; öğe yalnız vadesi geçmiş olarak kalır. */
(function (g) {
  var O = g.PP.ogr;
  var ARALIK = [1, 3, 7, 14, 30];

  function gunOf(t) { return typeof t === "string" && /^\d{4}-\d{2}-\d{2}/.test(t) ? t.slice(0, 10) : null; }

  function oge(G, hedefId, denemeler, bugun, sec) {
    var d = O.deg.hedefDurumu(G, hedefId, denemeler, sec), h = G.hedefler[hedefId];
    if (d.durum === "denenmedi") return null;
    var s = d.sayilanlar, son = s[s.length - 1], sonGun = gunOf(son.tarih) || bugun, yz = Math.round(d.oran * 100), ez = Math.round(d.esik * 100);
    if (d.durum === "kaldi") {
      var t = O.deg.telafi(G, hedefId, denemeler, sec);
      return { hedef: hedefId, ad: d.ad, durum: "kaldi", kritik: d.kritik, oran: d.oran, vade: sonGun < bugun ? sonGun : bugun, aralik: 0, varyant: t.sonrakiVaryant, uyari: t.uyari,
        neden: "Son denemede %" + yz + " (gereken %" + ez + "): önce telafi, sonra " + (t.uyari ? "aynı soru setiyle (tek varyant)" : "farklı varyantla (" + t.sonrakiVaryant + ")") + " yeniden sına.",
        telafi: t.adimlar };
    }
    var k = 0;
    for (var i = s.length - 1; i >= 0 && s[i].oran + 1e-9 >= d.esik; i--) k++;
    var ar = ARALIK[Math.min(k, ARALIK.length) - 1], vade = O.gun.ekle(sonGun, ar), gecen = O.gun.fark(bugun, sonGun);
    var v = O.deg.varyantSec(G, hedefId, denemeler);
    return { hedef: hedefId, ad: d.ad, durum: "gecti", kritik: d.kritik, oran: d.oran, vade: vade, aralik: ar, varyant: v.varyant, uyari: v.uyari,
      neden: (vade <= bugun ? "Son başarılı denemeden " + gecen + " gün geçti; aralık " + ar + " gün (" + k + ". art arda geçiş). Unutmadan önce tazele." : "Sonraki tekrar " + vade + " (aralık " + ar + " gün).") + (h.kritik ? " Kritik hedef." : "") };
  }

  /* Dönüş {bugun:[vadesi gelmiş öğeler, öncelik sırasıyla], sonra:[yaklaşanlar, vade sırasıyla]} */
  function plan(G, denemeler, bugun, sec) {
    bugun = bugun || O.gun.bugun();
    var ogeler = Object.keys(G.hedefler).map(function (k) { return oge(G, k, denemeler || [], bugun, sec); }).filter(Boolean);
    var vadeli = ogeler.filter(function (x) { return x.vade <= bugun; }), sonra = ogeler.filter(function (x) { return x.vade > bugun; });
    vadeli.sort(function (a, b) {
      return (a.durum === "kaldi" ? 0 : 1) - (b.durum === "kaldi" ? 0 : 1) || (b.kritik ? 1 : 0) - (a.kritik ? 1 : 0) || a.oran - b.oran || a.vade.localeCompare(b.vade) || a.hedef.localeCompare(b.hedef);
    });
    sonra.sort(function (a, b) { return a.vade.localeCompare(b.vade) || a.hedef.localeCompare(b.hedef); });
    return { bugun: vadeli, sonra: sonra };
  }

  O.tekrar = { ARALIK: ARALIK, plan: plan };
})(typeof window !== "undefined" ? window : globalThis);

"use strict";
/* ---- Plan ve öğrenme ikizi paneli (Faz 7): PP.plan / PP.ikiz üzerinde arayüz. Bugün sekmesinde Koç'un altında. ---- */
function planGirdi() {
  var bugun = PP.ogr.gun.bugun(), tc = PP.plan.tercihDogrula(PP.ogr.depo.tercih("plan"));
  var yollar = TRK_LIST.map(function (o) {
    var T = starterTopics(o[0]);
    return { id: o[0], ad: o[1], tamam: T.filter(PP.ogr.ilerleme.konuTamam).length, toplam: T.length,
      kalan: T.filter(function (t) { return !PP.ogr.ilerleme.konuTamam(t); }).map(function (t) { return { id: t.id, ad: t.name }; }) };
  });
  if (!tc.yol) { var act = yollar.filter(function (y) { return y.tamam > 0 && y.kalan.length; })[0]; tc.yol = act ? act.id : "ccna"; }
  var tekrar = [];
  try { tekrar = PP.ogr.ui.tekrarPlani(bugun).bugun.map(function (t) { return { id: t.hedef, ad: t.ad }; }); } catch (e) { tekrar = []; }
  return { bugun: bugun, tercih: tc, tekrar: tekrar, yollar: yollar, gunKayit: loggedDates() };
}
function planTercihYaz(yama) {
  var t = PP.plan.tercihDogrula(PP.ogr.depo.tercih("plan")), k;
  for (k in yama) t[k] = yama[k];
  PP.ogr.depo.tercih("plan", PP.plan.tercihDogrula(t));
}
function renderPlan() {
  if (!window.PP || !PP.plan || !PP.ikiz || !PP.ogr) return null;
  S.planUi = S.planUi || { ac: false };
  var U = S.planUi, G = null, girdi, P, C, Z = null;
  try { girdi = planGirdi(); P = PP.plan.kur(girdi); C = PP.plan.karsilastir(girdi); G = PP.ogr.ui.graf(); } catch (e) { return null; }
  try { if (G) Z = PP.ikiz.durum({ G: G, denemeler: PP.ogr.ui.durum().denemeler, yollar: girdi.yollar }); } catch (e) { Z = null; }
  var tc = P.tercih, GUN = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
  var gunTuslari = h("div", { class: "row", style: "gap:6px;flex-wrap:wrap", role: "group", "aria-label": "Çalışma günleri" }, GUN.map(function (n, i) {
    return h("button", { type: "button", class: "btn ghost" + (tc.gunler[i] ? " on" : ""), "aria-pressed": tc.gunler[i] ? "true" : "false", "data-plan-gun": String(i),
      onclick: function () { var gl = tc.gunler.slice(); gl[i] = gl[i] ? 0 : 1; if (!gl.some(function (x) { return x; })) return; planTercihYaz({ gunler: gl }); draw(); } }, n);
  }));
  var dkTuslari = h("div", { class: "row", style: "gap:6px;flex-wrap:wrap", role: "group", "aria-label": "Haftalık dakika" }, [90, 180, 300, 450].map(function (n) {
    return h("button", { type: "button", class: "btn ghost" + (tc.haftalikDk === n ? " on" : ""), "aria-pressed": tc.haftalikDk === n ? "true" : "false", "data-plan-dk": String(n),
      onclick: function () { planTercihYaz({ haftalikDk: n }); draw(); } }, n + " dk");
  }));
  var musait = tc.musaitDegil.indexOf(girdi.bugun) >= 0;
  var musaitBtn = h("button", { type: "button", class: "btn ghost", "data-plan": "musait", onclick: function () {
    var l = tc.musaitDegil.filter(function (d) { return d !== girdi.bugun; }); if (!musait) l.push(girdi.bugun); planTercihYaz({ musaitDegil: l }); draw();
  } }, musait ? "Bugün müsaitim (geri al)" : "Bugün müsait değilim");
  var gunler = P.gunler.slice(0, 7).map(function (d) {
    return h("div", { class: "lbox", "data-plan-gun-kutu": d.tarih },
      h("div", { class: "label" }, d.tarih + " · ≈ " + d.dk + " dk (kapasite " + d.kapasite + " + tampon " + d.tampon + ")"),
      h("ul", { class: "lr-ul" }, d.ogeler.map(function (o) { return h("li", null, h("b", null, (o.tur === "tekrar" ? "Tekrar: " : "Ders: ") + o.ad), h("span", { class: "small mute" }, " — " + o.neden + " · " + o.dk + " dk" + (o.olculen ? "" : " (varsayım)"))); })));
  });
  var tahmin = P.tahmin.haftaAraligi
    ? "Kalan ≈ " + P.tahmin.kalanDk + " dk iş; bu tempoda yaklaşık " + P.tahmin.haftaAraligi[0] + "–" + P.tahmin.haftaAraligi[1] + " hafta. " + P.tahmin.not
    : P.tahmin.not;
  var kars = h("table", { class: "small", "data-plan": "karsilastir", style: "width:100%;border-collapse:collapse" },
    h("tr", null, ["Takvim", "Hafta", "Gün", "Tahmini süre"].map(function (x) { return h("th", { style: "text-align:left;padding:4px" }, x); })),
    C.map(function (c) { return h("tr", null, h("td", { style: "padding:4px" }, c.ad), h("td", { style: "padding:4px" }, c.haftalikDk + " dk"), h("td", { style: "padding:4px" }, String(c.aktifGun)),
      h("td", { style: "padding:4px" }, c.tahmin.haftaAraligi ? c.tahmin.haftaAraligi[0] + "–" + c.tahmin.haftaAraligi[1] + " hafta (tahmin)" : "—")); }));
  var ikiz = Z ? Z.yollar.map(function (y) {
    var s = function (a) { return a.length ? a.map(function (x) { return x.ad + " (%" + x.kanit.oran + ", " + x.kanit.deneme + " deneme)"; }).join("; ") : "—"; };
    return h("div", { class: "lbox", "data-ikiz": y.id }, h("div", { class: "label" }, y.ad + " · " + y.tamam + "/" + y.toplam + " konu tamam (ölçülen)"),
      y.veriYok ? h("div", { class: "small mute" }, "Deneme kaydı yok: güçlü/zayıf söylenemez.") : h("div", { class: "small" },
        h("div", null, h("b", null, "Güçlü: "), s(y.guclu)), h("div", null, h("b", null, "Zayıf: "), s(y.zayif)),
        y.belirsiz.map(function (b) { return h("div", { class: "mute" }, "Belirsiz: " + b.ad + " — " + b.neden + ". Netleşmesi için: " + b.gerekenKanit + "."); }),
        y.darbogaz ? h("div", null, h("b", null, "Darboğaz: "), y.darbogaz.hedef + " — " + y.darbogaz.neden) : null));
  }) : [];
  return h("div", { class: "panel plan", "data-plan": "panel" }, h("div", { class: "label" }, "Plan ve öğrenme ikizi"), h("h2", null, "Haftalık planın"),
    h("div", { class: "small", "data-plan": "telafi" }, P.telafi.metin),
    h("div", { class: "small mute", style: "margin-top:4px" }, h("b", null, "Ölçülen: "), "son 7 günde " + P.olculen.sonYediGunDk + " dk, " + P.olculen.aktifGun + " aktif gün."),
    h("div", { class: "small", "data-plan": "tahmin", style: "margin-top:4px" }, h("b", null, "Tahmin: "), tahmin),
    P.yol ? h("div", { class: "small mute" }, "Plan yolu: " + P.yol.ad + ". " + P.gerekce) : null,
    h("details", { class: "more", "data-plan": "gunler", open: U.ac ? true : null, ontoggle: function (e) { U.ac = e.target.open; } }, h("summary", null, "Günlük küçük adımlar (ilk 7 plan günü)"),
      h("div", { class: "morebox" }, gunler.length ? gunler : h("div", { class: "small mute" }, "Planlanacak iş ya da müsait gün yok."))),
    h("details", { class: "more" }, h("summary", null, "Varsayımlar"), h("div", { class: "morebox" }, h("ul", { class: "lr-ul" }, P.varsayimlar.map(function (v) { return h("li", null, v); })))),
    h("details", { class: "more" }, h("summary", null, "Alternatif takvimler"), h("div", { class: "morebox" }, kars)),
    h("details", { class: "more" }, h("summary", null, "Düzelt: müsaitliğin"), h("div", { class: "morebox", style: "display:grid;gap:8px" }, dkTuslari, gunTuslari, musaitBtn,
      h("div", { class: "small mute" }, "Takvimini sen belirlersin; plan sessizce değiştirilmez. Kaçırılan gün ceza ya da aciliyet üretmez."))),
    h("details", { class: "more" }, h("summary", null, "Öğrenme ikizi (kayıtlara göre durum)"), h("div", { class: "morebox", style: "display:grid;gap:6px" }, ikiz,
      Z && Z.ekKanit.length ? h("div", { class: "small mute", "data-ikiz": "ek" }, Z.ekKanit.map(function (x) { return x.metin; }).join(" ")) : null,
      h("div", { class: "small mute" }, "Karar desteğidir; yetkinlik kararı değildir. Olasılık ya da kesin tarih vermez."))));
}

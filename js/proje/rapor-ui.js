"use strict";
/* ---- Faz 8 arayüz: proje kanıt raporu (Proje detayı) ve mülakat rubrik paneli (Mülakat sekmesi) ---- */
function renderRaporPaneli(p, def) {
  if (!window.PP || !PP.rapor || !def) return null;
  var R = null;
  try { R = PP.rapor.olustur({ def: def, kayit: p, kanitlar: PP.ogr.depo.oku().kanitlar, bugun: PP.ogr.gun.bugun(), surum: "2026-10" }); } catch (e) { return null; }
  var D = { dogrulandi: "doğrulandı", "oz-beyan": "öz-beyan", dogrulanmamis: "doğrulanmamış" };
  var iddialar = R.iddialar.slice(0, 12).map(function (x) {
    return h("li", { "data-iddia": x.durum }, h("b", null, "[" + D[x.durum] + "] "), x.metin, x.kanit.length ? h("span", { class: "small mute" }, " — kanıt: " + x.kanit.map(function (k) { return k.kaynak; }).join(", ")) : null);
  });
  return h("div", { class: "panel rapor", "data-rapor": "panel" }, h("div", { class: "label" }, "Kanıt raporu"), h("h3", null, "Bu proje ne kanıtlıyor?"),
    h("div", { class: "small", "data-rapor": "genel" }, h("b", null, "Genel durum: "), (PP.rapor.DURUMLAR.filter(function (d) { return d.id === R.genelDurum; })[0] || {}).ad + " · " + R.yontem),
    h("details", { class: "more" }, h("summary", null, "İddialar ve kanıtları (" + R.iddialar.length + ")"), h("div", { class: "morebox" }, h("ul", { class: "lr-ul" }, iddialar))),
    h("details", { class: "more" }, h("summary", null, "Proje tanımı: " + R.tanim.tanimli + "/" + R.tanim.toplam + " alan"), h("div", { class: "morebox small" }, "Eksik: " + R.tanim.eksik.map(function (x) { return x.ad; }).join("; "))),
    h("div", { class: "small mute", style: "margin-top:6px" }, R.sonraki),
    h("ul", { class: "lr-ul small mute" }, R.sinirlamalar.map(function (x) { return h("li", null, x); })),
    h("div", { class: "small mute" }, "Paylaşım: sunucu tarafı politikası hazır ama henüz uygulanmadı; bağlantı oluşturma kapalı."));
}
function ivRubrikKaydet(P, S2) {
  var puanlar = {};
  PP.mulakat.KRITERLER.forEach(function (k) { if (S2.puan[k[0]] != null) puanlar[k[0]] = S2.puan[k[0]]; });
  var r = PP.mulakat.kaydet({ kaynak: "oz", puanlar: puanlar, rol: S.jr && S.jr.role });
  S2.msg = r.ok ? "Kaydedildi (öz değerlendirme)." : "Kaydedilemedi: en az bir ölçüt için puan seç.";
  if (r.ok) S2.puan = {};
  draw();
}
function renderRubrikPaneli() {
  if (!window.PP || !PP.mulakat) return null;
  S.rubrik = S.rubrik || { puan: {}, msg: "" };
  var S2 = S.rubrik, liste = PP.mulakat.oku(), zayif = PP.mulakat.zayiflik(liste);
  var satirlar = PP.mulakat.KRITERLER.map(function (k) {
    return h("div", { class: "row", style: "gap:4px;flex-wrap:wrap;align-items:center", "data-kriter": k[0] }, h("span", { class: "small", style: "min-width:60%" }, k[1]),
      [0, 1, 2, 3, 4].map(function (n) { return h("button", { type: "button", class: "btn ghost" + (S2.puan[k[0]] === n ? " on" : ""), "aria-pressed": S2.puan[k[0]] === n ? "true" : "false", "data-puan": k[0] + "=" + n, onclick: function () { S2.puan[k[0]] = n; draw(); } }, String(n)); }));
  });
  var zy = zayif.map(function (z) {
    return h("div", { class: "lbox warn", "data-zayiflik": z.kriter }, h("b", null, z.ad + ": son " + z.toplam + " mülakatın " + z.kez + "'inde zayıf (≤1)."), h("div", { class: "small" }, z.telafi.metin),
      h("button", { class: "btn ghost", type: "button", onclick: function () { PP.koc.calistir({ tip: "gezin", eylem: z.telafi.eylem }); } }, "Telafiye git"));
  });
  return h("div", { class: "panel rubrik", "data-rubrik": "panel" }, h("div", { class: "label" }, "Rubrik sonucu"), h("h3", null, "Provayı ölçütlere göre puanla (0–4)"),
    h("div", { style: "display:grid;gap:6px" }, satirlar),
    h("div", { class: "row", style: "margin-top:8px" }, h("button", { class: "btn", type: "button", "data-rubrik": "kaydet", onclick: function () { ivRubrikKaydet(null, S2); } }, "Sonucu kaydet")),
    S2.msg ? h("div", { class: "small", role: "status", "data-rubrik": "msg" }, S2.msg) : null,
    h("div", { class: "small mute" }, liste.length + " kayıtlı mülakat. " + PP.mulakat.SINIRLAMA), zy);
}

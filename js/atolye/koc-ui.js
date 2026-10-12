"use strict";
/* ---- Koç paneli (Faz 6): PP.koc üzerinde arayüz. Bugün sekmesinde "Sana özel" planın altında. ---- */
function kocDurum() {
  var durum = { oneriler: { liste: [], bos: "veri-yok" }, ozet: null };
  try {
    var kisisel = [];
    try { kisisel = PPPersonal.analyze(personalInput()).items || []; } catch (e) { kisisel = []; }
    var d = PP.ogr.depo.oku();
    durum.oneriler = PP.koc.oneriler({ tekrar: PP.ogr.ui.tekrarPlani(PP.ogr.gun.bugun()), labKanit: d.kanitlar, kisisel: kisisel, sonraki: (PP.ogr.ui.sonrakiAdim ? PP.ogr.ui.sonrakiAdim() : null) });
    durum.ozet = PP.ogr.ui.ozet();
  } catch (e) { /* kayıt okunamadı: boş durum, uydurma yok */ }
  return durum;
}
function renderKoc() {
  if (!window.PP || !PP.koc || !PP.ogr) return null;
  S.koc = S.koc || { onay: false, yanit: null };
  var K = S.koc, tr = PP.koc.tercihOku(), du = kocDurum(), on = du.oneriler;
  var AD = { ton: ["Anlatım tonu", { kisa: "Kısa", ayrintili: "Ayrıntılı" }], oneri: ["Proaktif öneri", { acik: "Açık", kapali: "Kapalı" }], saglayici: ["Harici sağlayıcı", { kapali: "Kapalı", acik: "Açık" }] };
  var yanitEl = h("div", { class: "small", "data-koc": "yanit", role: "status", style: "margin-top:6px" }, K.yanit || "");
  var giris = h("input", { type: "text", "aria-label": "Koça sor", placeholder: "Bugün ne çalışmalıyım?", style: "width:100%;box-sizing:border-box;min-height:44px;padding:8px 10px;border:1px solid var(--line);border-radius:8px;font:inherit" });
  function sor() {
    var q = giris.value;
    yanitEl.textContent = "Düşünüyorum…";
    PP.koc.sor(q, du).then(function (r) { K.yanit = r.metin + (r.uyari ? " (" + r.uyari + ")" : "") + (r.kaynak === "saglayici" ? " [harici sağlayıcı, tavsiyedir]" : ""); yanitEl.textContent = K.yanit; });
  }
  var rows = on.liste.map(function (o) {
    return h("div", { class: "koc-o", "data-oneri": o.id, style: "border-top:1px solid var(--line);padding:8px 0;display:grid;gap:4px" },
      h("b", null, o.baslik), h("div", { class: "small mute" }, o.neden),
      h("details", { class: "more" }, h("summary", null, "Dayanak"), h("div", { class: "morebox small" }, o.kanit.map(function (k) { return h("div", null, k.kaynak + ": " + k.ayrinti); }))),
      h("div", { class: "row" }, h("button", { class: "btn ghost", type: "button", onclick: function () {
        var r = PP.koc.calistir({ tip: "gezin", eylem: o.eylem });
        if (!r.ok) { K.yanit = "Bu hedefe gidilemedi (" + r.neden + ")."; draw(); }
      } }, "Git")));
  });
  var bosMetin = on.bos === "kapali" ? "Proaktif öneriler kapalı." : on.bos === "veri-yok" ? "Henüz öneri çıkaracak kayıt yok. Bir mini sınav çözünce kayıtlarından öneri çıkarırım; geçmişin uydurmam." : "";
  var tercihler = Object.keys(AD).map(function (k) {
    return h("div", { class: "row", style: "gap:6px;flex-wrap:wrap;align-items:center" }, h("span", { class: "small" }, AD[k][0] + ":"),
      Object.keys(AD[k][1]).map(function (v) {
        return h("button", { type: "button", class: "btn ghost" + (tr[k] === v ? " on" : ""), "aria-pressed": tr[k] === v ? "true" : "false", "data-tercih": k + "=" + v,
          onclick: function () { PP.koc.calistir({ tip: "tercih-yaz", ad: k, deger: v }); draw(); } }, AD[k][1][v]);
      }));
  });
  var sifirla = K.onay
    ? h("div", { class: "row", style: "gap:6px" }, h("span", { class: "small" }, "Koç tercihleri varsayılana dönsün mü? (ilerleme silinmez)"),
        h("button", { class: "btn", type: "button", "data-koc": "onayla", onclick: function () { PP.koc.calistir({ tip: "tercih-sifirla" }, { onay: true }); K.onay = false; draw(); } }, "Evet, sıfırla"),
        h("button", { class: "btn ghost", type: "button", onclick: function () { K.onay = false; draw(); } }, "Vazgeç"))
    : h("button", { class: "btn ghost", type: "button", "data-koc": "sifirla", onclick: function () { K.onay = true; draw(); } }, "Tercihleri sıfırla");
  return h("div", { class: "panel koc", "data-koc": "panel" }, h("div", { class: "label" }, "Koç"), h("h2", null, "Kayıtlarına göre"),
    rows.length ? rows : h("div", { class: "small mute", "data-koc": "bos" }, bosMetin),
    h("div", { style: "margin-top:8px" }, giris, h("div", { class: "row", style: "margin-top:6px" }, h("button", { class: "btn", type: "button", "data-koc": "sor", onclick: sor }, "Sor")), yanitEl),
    h("details", { class: "more", open: K.ac ? true : null, ontoggle: function (e) { K.ac = e.target.open; } }, h("summary", null, "Koç tercihleri"), h("div", { class: "morebox", style: "display:grid;gap:8px" }, tercihler, sifirla,
      h("div", { class: "small mute" }, "Koç ilerleme, ustalık ya da kanıt yazamaz; yalnız kayıtlarını okuyup yönlendirir. Harici sağlayıcı kapalıyken hiçbir şey dışarı gitmez."))));
}

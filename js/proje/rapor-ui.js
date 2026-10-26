"use strict";
/* ALAN: Proje detayında kanıt raporu paneli ve Mülakat sekmesinde rubrik paneli.
   NE YAPAR: PP.rapor.olustur çıktısını iddia listesi olarak çizer; PP.mulakat rubrik formunu çizer ve ivRubrikKaydet ile kaydeder.
   SORUN OLURSA: PP.rapor, PP.mulakat, PP.koc ve PP.ogr yüklenmiş olmalı (yoksa panel null döner); index.html'de proje ve mülakat dosyalarından sonra yüklenir. Kayıt ya_pp_ogr.
   YENİ ÖZELLİK: Yeni panel buraya, hesap js/ogrenme/rapor.js'e; tests/faz8_proje.js ve faz8_kariyer.js güncellenir. */
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
/* Faz 8 tur 2: proje tanımının 10 alanı (M§8.6). Tamamlama = öz-beyan kanıt kaydı; kabul ölçütlerini öğrenci kendi denetler (sunucu doğrulaması yok). */
function renderTanimBlok(def) {
  if (!def) return null;
  var L = function (a) { return h("ul", { class: "lr-ul small" }, (a || []).map(function (x) { return h("li", null, x); })); };
  var bos = function (a) { return !Array.isArray(a) || !a.length; };
  var kesit = function (id, ad, ic) { return h("div", { "data-tanim": id }, h("b", { class: "small" }, ad), ic); };
  var parcalar = [
    kesit("problem", "Problem ve senaryo", h("div", { class: "small" }, def.why || "tanımlı değil")),
    bos(def.onkosul) ? null : kesit("onkosul", "Önkoşullar", L(def.onkosul)),
    kesit("ciktilar", "Öğrenme çıktıları", L(def.outcome)),
    bos(def.gereksinim) ? null : kesit("gereksinim", "Gereksinimler (zorunlu / isteğe bağlı / işlevsel olmayan)", L(def.gereksinim)),
    bos(def.kabul) ? null : kesit("kabul", "Kabul ölçütleri ve test durumları (kendin denetlersin)", L(def.kabul)),
    bos(def.rubrik) ? null : kesit("rubrik", "Rubrik", h("ul", { class: "lr-ul small" }, def.rubrik.map(function (r) { return h("li", null, h("b", null, r.olcut + ": "), "iyi = " + r.guclu + " · zayıf = " + r.zayif); }))),
    kesit("artifact", "Çıktılar (adım kanıtları)", L((def.steps || []).map(function (s) { return s.proof; }))),
    bos(def.savunma) ? null : kesit("savunma", "Savunma soruları", L(def.savunma)),
    bos(def.yetkinlikler) ? null : kesit("esleme", "Yetkinlik eşlemesi", h("ul", { class: "lr-ul small" }, def.yetkinlikler.map(function (y) { return h("li", null, h("b", null, y.ad + ": "), y.kanit); }))),
    def.telafi ? kesit("telafi", "Telafi", h("div", { class: "small" }, def.telafi)) : null,
    def.sonraki ? kesit("sonraki", "Sonraki aşama kilidi", h("div", { class: "small" }, def.sonraki)) : null,
    def.alanNotu ? kesit("alan", "Uygulama alanı (SQL/Python) bağlantısı", h("div", { class: "small" }, def.alanNotu)) : null
  ].filter(Boolean);
  var td = window.PP && PP.rapor ? PP.rapor.tanimDenetimi(def) : null;
  return h("details", { class: "more", "data-tanim": "panel" }, h("summary", null, "Proje tanımı (10 alan)" + (td ? ": " + td.tanimli + "/" + td.toplam : "")),
    h("div", { class: "morebox", style: "display:grid;gap:8px" }, parcalar, h("div", { class: "small mute" }, "Tamamlamak rozet vermez: öz-beyan etiketli bir kanıt kaydı yazılır. Kabul ölçütlerini sunucu doğrulamaz; sonraki aşama kilidi bir yönergedir, uygulama bu turda kilidi zorlamaz.")));
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

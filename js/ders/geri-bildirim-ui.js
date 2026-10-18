"use strict";
/* ---- Faz 12 V4 arayüz: "Bu hatalı" düğmesi, geri bildirim formu, yerel kuyruk (Ayarlar) ve içerik güncelliği satırı.
   Her şey bu cihazda kalır (PP.ogr.gb); sunucuya ya da GitHub'a hiçbir şey gitmez. ---- */
function gbDurum() { return (S.gb = S.gb || { acik: false, baglam: null, f: null, duz: null, hata: [], uyariGoruldu: false, sil: null }); }

/* Formu aç. b = bağlam, duzKayit = düzenlenecek kuyruk kaydı (yoksa yeni; bu bağlamın taslağı varsa geri gelir) */
function gbAc(b, duzKayit) {
  var G = gbDurum(), O = PP.ogr.gb, t = duzKayit ? null : O.taslak(b);
  G.baglam = O.baglam(duzKayit ? duzKayit.baglam : b); G.duz = duzKayit ? duzKayit.id : null; G.hata = []; G.uyariGoruldu = false;
  var k = duzKayit || t || {};
  G.f = { tur: k.tur || "hata", baslik: k.baslik || "", aciklama: k.aciklama || "", onem: k.onem || "" };
  G.acik = true; draw();
}
function gbBtn(b) {
  return h("button", { class: "btn ghost", type: "button", "data-gb": "ac", onclick: function () { gbAc(b); } }, "Bu hatalı");
}

/* Form bu yerde görünmeli mi? yer: "ders" | "proje" | "ayar"; düzenleme ve genel bağlam Ayarlar'da açılır. */
function gbFormYer(yer, id) {
  var G = gbDurum();
  if (!G.acik || !G.baglam) return null;
  var ayarda = G.duz || G.baglam.tur === "genel";
  return (ayarda ? yer === "ayar" : G.baglam.tur === yer && G.baglam.id === id) ? gbForm() : null;
}

function gbForm() {
  var G = gbDurum(), O = PP.ogr.gb, f = G.f;
  var sakla = function () { if (!G.duz) O.taslakKaydet(f, G.baglam); };
  var ti = h("input", { type: "text", maxlength: O.SINIR.baslik, "aria-label": "Başlık", "data-gb": "baslik", placeholder: "Kısa başlık (İngilizce dene): The Save button does nothing", oninput: function (e) { f.baslik = e.target.value; sakla(); } });
  ti.value = f.baslik;
  var ac = h("textarea", { maxlength: O.SINIR.aciklama, rows: 7, "aria-label": "Açıklama", "data-gb": "aciklama", placeholder: "Ne oldu? Türkçe yazabilirsin; İngilizce denersen iş yazışması pratiği olur.", oninput: function (e) { f.aciklama = e.target.value; sakla(); } });
  ac.value = f.aciklama;
  var kaydet = function () {
    var k = O.kontrol(f);
    if (k.ok && k.uyari.length && !G.uyariGoruldu) { G.uyariGoruldu = true; G.hata = k.uyari.concat(["Sorun yoksa tekrar Kaydet'e bas."]); draw(); return; }
    var r = O.kaydet(f, G.baglam, G.duz);
    if (!r.ok) { G.hata = r.hata || ["Kaydedilemedi (tarayıcı depolaması dolu olabilir)."]; draw(); return; }
    G.acik = false; G.f = null; G.duz = null; G.hata = [];
    rtToast("Geri bildirim bu cihazda kuyruğa alındı. Hiçbir yere gönderilmedi."); draw();
  };
  return h("div", { class: "panel", "data-gb": "form" },
    h("div", { class: "label" }, G.duz ? "Geri bildirimi düzenle" : "Geri bildirim"),
    h("div", { class: "small mute", "data-gb": "baglam" }, "Bağlam (otomatik): " + O.baglamMetni(G.baglam)),
    h("div", { class: "chiprow", role: "group", "aria-label": "Tür" }, O.TURLER.map(function (t) {
      return h("button", { class: "fchip" + (f.tur === t[0] ? " on" : ""), type: "button", "data-gb-tur": t[0], "aria-pressed": f.tur === t[0] ? "true" : "false", onclick: function () { f.tur = t[0]; sakla(); draw(); } }, t[1]);
    })),
    ti, ac,
    h("div", { class: "row" }, h("button", { class: "btn ghost", type: "button", "data-gb": "sablon", onclick: function () { f.aciklama = (f.aciklama.trim() ? f.aciklama.replace(/\s+$/, "") + "\n\n" : "") + O.SABLON; sakla(); draw(); } }, "Şablon ekle (Problem / Expected / Actual / Steps)")),
    h("div", { class: "chiprow", role: "group", "aria-label": "Önem (isteğe bağlı)" }, h("small", { class: "mute" }, "Önem:"), O.ONEMLER.map(function (o) {
      return h("button", { class: "fchip" + (f.onem === o[0] ? " on" : ""), type: "button", "aria-pressed": f.onem === o[0] ? "true" : "false", onclick: function () { f.onem = o[0]; sakla(); draw(); } }, o[1]);
    })),
    h("div", { class: "small mute" }, "Kişisel bilgi, şifre ya da anahtar yazma. Bu yazı yalnız bu cihazda durur, kimseye gönderilmez. Kısa kalıplar: \"I expected … but I got …\", \"Steps to reproduce:\"."),
    G.hata.length ? h("div", { class: "small warnt", role: "alert", "data-gb": "hata" }, G.hata.join(" ")) : null,
    h("div", { class: "row" },
      h("button", { class: "btn", type: "button", "data-gb": "kaydet", onclick: kaydet }, G.duz ? "Güncelle" : "Kaydet"),
      h("button", { class: "btn ghost", type: "button", "data-gb": "vazgec", onclick: function () { G.acik = false; G.hata = []; draw(); } }, G.duz ? "Vazgeç" : "Kapat (taslak kalır)"),
      !G.duz ? h("button", { class: "btn ghost", type: "button", "data-gb": "taslak-sil", onclick: function () { O.taslakSil(G.baglam); G.f = { tur: "hata", baslik: "", aciklama: "", onem: "" }; G.hata = []; draw(); } }, "Taslağı sil") : null));
}

function gbKopyala(metin) {
  var yedek = function () {
    var t = h("textarea", { style: "position:fixed;opacity:0", "aria-hidden": "true" }); t.value = metin; document.body.appendChild(t); t.select();
    var s = false; try { s = document.execCommand("copy"); } catch (e) { s = false; } t.remove(); return s;
  };
  var p = null; try { p = navigator.clipboard && navigator.clipboard.writeText(metin); } catch (e) { p = null; }
  Promise.resolve(p).then(function () { return p ? true : yedek(); }, yedek).then(function (s) { rtToast(s ? "Kopyalandı." : "Kopyalanamadı; dışa aktar düğmesini dene."); });
}
function gbIndir(ad, metin, tip) {
  if (S.dl && S.dl.save) { Promise.resolve(S.dl.save({ filename: ad, data: metin })).catch(function () { }); return; }
  var a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([metin], { type: tip })); a.download = ad; document.body.appendChild(a); a.click();
  setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
}

/* Ayarlar sekmesi: kuyruk listesi, düzenle/sil, kopyala, dışa aktar */
function renderGeriBildirim() {
  if (!window.PP || !PP.ogr || !PP.ogr.gb) return null;
  var G = gbDurum(), O = PP.ogr.gb, l = O.liste(), tarih = new Date().toISOString().slice(0, 10);
  var kayit = function (k) {
    var tur = (O.TURLER.filter(function (x) { return x[0] === k.tur; })[0] || [0, k.tur])[1], onay = G.sil === k.id;
    return h("div", { class: "lbox", "data-gb-kayit": k.id },
      h("div", { class: "chiprow" }, h("span", { class: "pill" }, tur), h("span", { class: "pill" }, "bu cihazda, gönderilmedi"), k.onem ? h("span", { class: "pill" }, "önem: " + k.onem) : null),
      h("b", null, k.baslik), h("div", { class: "small mute" }, O.baglamMetni(k.baglam) + " · " + k.olusturma.slice(0, 10)),
      h("div", { class: "small", style: "white-space:pre-wrap;overflow-wrap:anywhere" }, k.aciklama.length > 240 ? k.aciklama.slice(0, 240) + "…" : k.aciklama),
      h("div", { class: "row" },
        h("button", { class: "btn ghost", type: "button", "data-gb": "kopyala", onclick: function () { gbKopyala(O.markdown(k)); } }, "Kopyala"),
        h("button", { class: "btn ghost", type: "button", "data-gb": "duzenle", onclick: function () { gbAc(null, k); } }, "Düzenle"),
        onay ? [h("button", { class: "btn", type: "button", "data-gb": "sil-evet", onclick: function () { O.sil(k.id); G.sil = null; draw(); } }, "Evet, sil"), h("button", { class: "btn ghost", type: "button", onclick: function () { G.sil = null; draw(); } }, "Vazgeç")]
          : h("button", { class: "btn ghost", type: "button", "data-gb": "sil", onclick: function () { G.sil = k.id; draw(); } }, "Sil")));
  };
  return h("div", { class: "panel", "data-gb": "panel" },
    h("div", { class: "label" }, "Geri bildirim"), h("h2", null, "Hata, istek, şikayet, öneri"),
    h("div", { class: "small mute" }, "Her ders ve projede \"Bu hatalı\" düğmesi bu formu bağlamıyla açar. Yazdıkların yalnız bu cihazda durur; hiçbir yere gönderilmez. İstersen dışa aktarıp kendin paylaşabilirsin."),
    h("div", { class: "row" }, h("button", { class: "btn", type: "button", "data-gb": "yeni", onclick: function () { gbAc({ tur: "genel", sekme: "ayar" }); } }, "Yeni geri bildirim")),
    gbFormYer("ayar"),
    l.length ? [h("div", { class: "small mute", "data-gb": "sayi" }, l.length + " kayıt")].concat(l.map(kayit), [
      h("div", { class: "row" },
        h("button", { class: "btn ghost", type: "button", "data-gb": "json", onclick: function () { gbIndir("proofpath-geri-bildirim-" + tarih + ".json", O.jsonHepsi(l), "application/json"); } }, "JSON indir"),
        h("button", { class: "btn ghost", type: "button", "data-gb": "md", onclick: function () { gbIndir("proofpath-geri-bildirim-" + tarih + ".md", O.markdownHepsi(l), "text/markdown"); } }, "Markdown indir"),
        h("button", { class: "btn ghost", type: "button", "data-gb": "hepsini-kopyala", onclick: function () { gbKopyala(O.markdownHepsi(l)); } }, "Hepsini kopyala"))])
      : h("div", { class: "small mute", "data-gb": "bos" }, "Henüz kayıt yok."));
}

/* "İçerik güncelliği" satırı (Bugün ve Dersler): tarih uydurulmaz; sonDogrulama boş dersler "doğrulanmadı" sayılır. */
function gbGuncellik() {
  var o = null; try { o = PP.ogr.ders.dogrulamaOzeti(window.PP_LESSONS); } catch (e) { o = null; }
  if (!o || !o.toplam) return null;
  return h("div", { class: "small mute", "data-guncellik": "1" }, "İçerik güncelliği: " + o.toplam + " ders · ",
    h("span", { "data-guncellik-bayat": String(o.bayat), style: o.bayat ? "color:var(--bad)" : null }, o.bayat + " bayat (6 ay+)"), " · " + o.dogrulanmadi + " doğrulanmadı (doğrulama tarihi girilmemiş).");
}

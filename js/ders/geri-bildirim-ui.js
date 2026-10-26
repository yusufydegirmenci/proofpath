"use strict";
/* ALAN: Ders > 'Bu hatalı' düğmesi, geri bildirim formu, Ayarlar'daki yerel kuyruk, içerik güncelliği satırı. NE YAPAR: Bildirim yalnız yerel kuyruğa yazılır; sunucuya ancak önizleme ve açık onaydan sonra PP.ogr.gb.gonder ile gider.
   SORUN OLURSA: Mantık ve saklama js/ogrenme/geri-bildirim.js'tedir (PP.ogr.gb), bu dosya yalnız arayüzdür; durum S.gb (gbDurum); bu dosya ders betiklerinin en sonunda yüklenir.
   YENİ ÖZELLİK: Yeni bildirim alanı gbForm'a, bağlam türü gbAc'a eklenir; tests/faz12b_geri_bildirim.js ve tests/faz12c_gonder.js güncellenir. */
/* ---- Faz 12 V4/V5 arayüz: "Bu hatalı" düğmesi, geri bildirim formu, yerel kuyruk (Ayarlar), onaylı "Gönder" ve içerik güncelliği satırı.
   Kaydetmek yalnız yerel kuyruğa yazar; sunucuya yalnız önizleme + açık onay sonrası (PP.ogr.gb.gonder) gider. ---- */
function gbDurum() { return (S.gb = S.gb || { acik: false, baglam: null, f: null, duz: null, hata: [], uyariGoruldu: false, sil: null, gonder: null, gonderiyor: false, gonderMesaj: {} }); }

/* Formu aç. b = bağlam, duzKayit = düzenlenecek kuyruk kaydı (yoksa yeni; bu bağlamın taslağı varsa geri gelir) */
function gbAc(b, duzKayit) {
  var G = gbDurum(), O = PP.ogr.gb, t = duzKayit ? null : O.taslak(b);
  G.baglam = O.baglam(duzKayit ? duzKayit.baglam : b); G.duz = duzKayit ? duzKayit.id : null; G.hata = []; G.uyariGoruldu = false; G.taslakYok = false;
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
  var sakla = function () { G.uyariGoruldu = false; if (G.duz) return; var yok = !O.taslakKaydet(f, G.baglam); if (yok !== !!G.taslakYok) { G.taslakYok = yok; draw(); } };
  var ti = h("input", { type: "text", maxlength: O.SINIR.baslik, "aria-label": "Başlık", "data-gb": "baslik", placeholder: "Kısa başlık, örn. The Save button does nothing", oninput: function (e) { f.baslik = e.target.value; sakla(); } });
  ti.value = f.baslik;
  var ac = h("textarea", { maxlength: O.SINIR.aciklama, rows: 7, "aria-label": "Açıklama", "data-gb": "aciklama", placeholder: "Ne oldu? Türkçe yazabilirsin; İngilizce denersen iş yazışması pratiği olur.", oninput: function (e) { f.aciklama = e.target.value; sakla(); } });
  ac.value = f.aciklama;
  var kaydet = function () {
    var k = O.kontrol(f);
    if (k.ok && k.uyari.length && !G.uyariGoruldu) { G.uyariGoruldu = true; G.hata = k.uyari.concat(["Sorun yoksa tekrar Kaydet'e bas."]); draw(); return; }
    var r = O.kaydet(f, G.baglam, G.duz);
    if (!r.ok) { G.hata = r.hata || [r.neden === "kayit-yok" ? "Bu kayıt artık yok." : "Kaydedilemedi (tarayıcı depolaması dolu olabilir)."]; draw(); return; }
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
    G.taslakYok ? h("div", { class: "small warnt", role: "alert" }, "Taslak bu cihaza yazılamadı (depolama dolu olabilir); kapatmadan önce kaydet ya da dışa aktar.") : null,
    h("div", { class: "small mute" }, "Kişisel bilgi, şifre ya da anahtar yazma. Kaydedince yazı yalnız bu cihazda durur; sunucuya ancak Ayarlar'da Gönder düğmesine basıp onaylarsan gider. Kısa kalıplar: \"I expected … but I got …\", \"Steps to reproduce:\"."),
    G.hata.length ? h("div", { class: "small warnt", role: "alert", "data-gb": "hata" }, G.hata.join(" ")) : null,
    h("div", { class: "row" },
      h("button", { class: "btn", type: "button", "data-gb": "kaydet", onclick: kaydet }, G.duz ? "Güncelle" : "Kaydet"),
      h("button", { class: "btn ghost", type: "button", "data-gb": "vazgec", onclick: function () { G.acik = false; G.hata = []; draw(); } }, G.duz ? "Vazgeç" : "Kapat"),
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
  if (S.dl && S.dl.save) { Promise.resolve(S.dl.save({ filename: ad, data: metin })).then(function () { rtToast("İndirildi."); }, function () { rtToast("İndirilemedi."); }); return; }
  var a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([metin], { type: tip })); a.download = ad; document.body.appendChild(a); a.click();
  setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
}

/* "Gönder": önce sunucu istemcisi var mı bak (oturum/misafir), varsa önizleme aç. Onay olmadan hiçbir şey gitmez. */
function gbGonderAc(k) {
  var G = gbDurum(), O = PP.ogr.gb;
  delete G.gonderMesaj[k.id];
  O.istemciAl().then(function (c) {
    if (!c) G.gonderMesaj[k.id] = { ok: false, mesaj: "Oturum yok ya da misafirsin: geri bildirim bu cihazda kalır." };
    else G.gonder = k.id;
    draw();
  });
}
function gbOnizleme(k) {
  var G = gbDurum(), O = PP.ogr.gb, s = O.satir(k), kes = O.kontrol(k);
  return h("div", { class: "panel", "data-gb": "onizleme" },
    h("div", { class: "label" }, "Göndermeden önce kontrol et"),
    h("div", { class: "small warnt", "data-gb": "uyari" }, "Bu metin sunucuya gider; yalnız sen görebilirsin, başkaları göremez. Kişisel bilgi, şifre ya da anahtar varsa göndermeden düzelt."),
    kes.uyari.length ? h("div", { class: "small warnt", role: "alert" }, kes.uyari.join(" ")) : null,
    h("div", { class: "small" }, h("b", null, "Başlık: "), s.baslik),
    h("div", { class: "small", style: "white-space:pre-wrap;overflow-wrap:anywhere", "data-gb": "onizleme-metin" }, s.aciklama),
    h("div", { class: "small mute", style: "overflow-wrap:anywhere" }, "Bağlam: " + O.baglamMetni(s.baglam) + (s.baglam.onem ? " · önem: " + O.onemEtiket(s.baglam.onem) : "")),
    h("div", { class: "row" },
      h("button", { class: "btn", type: "button", "data-gb": "gonder-evet", disabled: G.gonderiyor ? true : null, onclick: function () {
        if (G.gonderiyor) return;
        G.gonderiyor = true; draw();
        O.istemciAl().then(function (c) { return O.gonder(k.id, c); }).then(function (r) {
          G.gonderiyor = false; G.gonder = null;
          G.gonderMesaj[k.id] = { ok: r.ok, mesaj: r.ok ? "Gönderildi. Yerel kopya bu cihazda duruyor." + (r.uyari ? " " + r.uyari : "") : r.mesaj };
          draw();
        });
      } }, G.gonderiyor ? "Gönderiliyor…" : "Evet, gönder"),
      h("button", { class: "btn ghost", type: "button", "data-gb": "gonder-vazgec", disabled: G.gonderiyor ? true : null, onclick: function () { G.gonder = null; draw(); } }, "Vazgeç")));
}

/* Ayarlar sekmesi: kuyruk listesi, düzenle/sil, kopyala, dışa aktar */
function renderGeriBildirim() {
  if (!window.PP || !PP.ogr || !PP.ogr.gb) return null;
  var G = gbDurum(), O = PP.ogr.gb, l = O.liste(), tarih = new Date().toISOString().slice(0, 10);
  var kayit = function (k) {
    var tur = (O.TURLER.filter(function (x) { return x[0] === k.tur; })[0] || [0, k.tur])[1], onay = G.sil === k.id, gitti = k.durum === "gonderildi";
    return h("div", { class: "lbox", "data-gb-kayit": k.id },
      h("div", { class: "chiprow" }, h("span", { class: "pill" }, tur), h("span", { class: "pill", "data-gb": "durum" }, gitti ? "gönderildi" + (k.gonderildi ? " · " + k.gonderildi.slice(0, 10) : "") : "bu cihazda, gönderilmedi"), k.onem ? h("span", { class: "pill" }, "önem: " + O.onemEtiket(k.onem)) : null),
      h("b", { style: "overflow-wrap:anywhere" }, k.baslik), h("div", { class: "small mute", style: "overflow-wrap:anywhere" }, O.baglamMetni(k.baglam) + " · " + k.olusturma.slice(0, 10)),
      h("div", { class: "small", style: "white-space:pre-wrap;overflow-wrap:anywhere" }, k.aciklama.length > 240 ? k.aciklama.slice(0, 240) + "…" : k.aciklama),
      G.gonderMesaj[k.id] ? h("div", { class: "small " + (G.gonderMesaj[k.id].ok ? "mute" : "warnt"), role: "alert", "data-gb": "gonder-mesaj" }, G.gonderMesaj[k.id].mesaj) : null,
      G.gonder === k.id && !gitti ? gbOnizleme(k) : null,
      h("div", { class: "row" },
        gitti || G.gonder === k.id ? null : h("button", { class: "btn", type: "button", "data-gb": "gonder", onclick: function () { gbGonderAc(k); } }, "Gönder"),
        h("button", { class: "btn ghost", type: "button", "data-gb": "kopyala", onclick: function () { gbKopyala(O.markdown(k)); } }, "Kopyala"),
        gitti ? null : h("button", { class: "btn ghost", type: "button", "data-gb": "duzenle", onclick: function () { gbAc(null, k); } }, "Düzenle"),
        onay ? [h("button", { class: "btn", type: "button", "data-gb": "sil-evet", onclick: function () { if (!O.sil(k.id)) rtToast("Silinemedi."); G.sil = null; draw(); } }, "Evet, sil"), h("button", { class: "btn ghost", type: "button", onclick: function () { G.sil = null; draw(); } }, "Vazgeç")]
          : h("button", { class: "btn ghost", type: "button", "data-gb": "sil", onclick: function () { G.sil = k.id; draw(); } }, "Sil")));
  };
  return h("div", { class: "panel", "data-gb": "panel" },
    h("div", { class: "label" }, "Geri bildirim"), h("h2", null, "Hata, istek, şikayet, öneri"),
    h("div", { class: "small mute" }, "Her ders ve projede \"Bu hatalı\" düğmesi bu formu bağlamıyla açar. Yazdıkların önce yalnız bu cihazda durur. Oturum açıksa her kayıtta \"Gönder\" düğmesi vardır; önizleme ve onayın olmadan hiçbir şey gitmez. İstersen dışa aktarıp kendin de paylaşabilirsin."),
    h("div", { class: "row" }, h("button", { class: "btn", type: "button", "data-gb": "yeni", onclick: function () { gbAc({ tur: "genel", sekme: "ayar" }); } }, "Yeni geri bildirim")),
    gbFormYer("ayar"),
    l.length ? [h("div", { class: "small mute", "data-gb": "sayi" }, l.length + " kayıt")].concat(l.map(kayit), [
      h("div", { class: "row" },
        h("button", { class: "btn ghost", type: "button", "data-gb": "json", onclick: function () { gbIndir(PP_MARKA.dosya + "-geri-bildirim-" + tarih + ".json", O.jsonHepsi(l), "application/json"); } }, "JSON indir"),
        h("button", { class: "btn ghost", type: "button", "data-gb": "md", onclick: function () { gbIndir(PP_MARKA.dosya + "-geri-bildirim-" + tarih + ".md", O.markdownHepsi(l), "text/markdown"); } }, "Markdown indir"),
        h("button", { class: "btn ghost", type: "button", "data-gb": "hepsini-kopyala", onclick: function () { gbKopyala(O.markdownHepsi(l)); } }, "Hepsini kopyala"))])
      : h("div", { class: "small mute", "data-gb": "bos" }, "Henüz kayıt yok."));
}

/* "İçerik güncelliği" satırı (Bugün ve Dersler): tarih uydurulmaz; sonDogrulama boş dersler "doğrulanmadı" sayılır. */
function gbGuncellik() {
  var o = null; try { o = PP.ogr.ders.dogrulamaOzeti(window.PP_LESSONS); } catch (e) { o = null; }
  if (!o || !o.toplam) return null;
  return h("div", { class: "small mute", "data-guncellik": "1" }, "İçerik güncelliği: " + o.toplam + " ders · ",
    h("span", { "data-guncellik-bayat": String(o.bayat), style: o.bayat ? "color:var(--bad)" : null }, o.bayat + " bayat (6 ay+)"), " · " + o.dogrulanmadi + " doğrulanmadı (doğrulama tarihi yok ya da geçersiz).");
}

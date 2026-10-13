"use strict";
/* ---- PP.senaryoUi: ders sonu İngilizce iş senaryosu kartı (W1) — arayüz ----
   Mantık/veri: js/ogrenme/senaryo.js (PP.senaryo), content/senaryo/*.js. Kart dersin 16. öğesidir: İSTEĞE BAĞLIDIR, ders tamamlamayı/kapıyı/ustalığı etkilemez.
   Akış: belge → görev → (sözlük, kalıplar, isteğe bağlı Türkçe ipucu) → yazma → "Gönder ve örnek cevabı aç" → yapı + anahtar kavram denetimi, öz-karşılaştırma, yan yana örnek cevap.
   Dürüstlük: denetim anlamı değerlendirmez; yapay zekâ geri bildirimi yok; hiçbir yere gönderilmez. Taslak ve cevaplar yalnız ya_pp_ogr.tercih.senaryo içinde. */
(function (g) {
  var PP = g.PP = g.PP || {};
  var taslakBellek = {};   /* id → {alan: metin}: yeniden çizimde yazılan metin kaybolmasın */
  var uiDurum = {};   /* id → {tr, yapi, mesaj}: sayfa yeniden çizilince (veri anlık görüntüsü vb.) arayüz durumu da kaybolmasın */
  var listeler = [], listeAcik = false;   /* sayfadaki "İş yazışmalarım" kapları: kart değişince yenilenir */

  function S() { return PP.senaryo; }
  function kelimeEt(n) { return n + " kelime"; }
  function metinGrubu(k, c) { return S().sablon(k).alanlar.map(function (a) { return [a[1], c[a[0]] || ""]; }); }

  function kur(id) {
    var hh = g.h, k = S().bul(id);
    if (!k) return null;
    var sb = S().sablon(k), u = uiDurum[id] = uiDurum[id] || { tr: false, yapi: false, mesaj: "" };
    var kok = hh("div", { class: "panel", "data-senaryo": id });
    var alanEl = {}, sayacEl = {};

    function mevcut() { var o = {}, kay = S().oku(id); sb.alanlar.forEach(function (a) { o[a[0]] = alanEl[a[0]] ? alanEl[a[0]].value : (taslakBellek[id] && taslakBellek[id][a[0]] != null ? taslakBellek[id][a[0]] : kay.c[a[0]]); }); return o; }
    function bellegeAl() { taslakBellek[id] = mevcut(); }

    sb.alanlar.forEach(function (a) {
      var kay = S().oku(id), ilk = taslakBellek[id] && taslakBellek[id][a[0]] != null ? taslakBellek[id][a[0]] : kay.c[a[0]];
      var ta = hh("textarea", { rows: sb.alanlar.length === 1 ? 8 : 3, maxlength: S().ALAN_MAKS, lang: "en", spellcheck: "true", autocapitalize: "sentences", "data-senaryo-alan": a[0], "aria-label": a[1],
        style: "width:100%;box-sizing:border-box;font-size:14px;font-family:inherit",
        oninput: function () { bellegeAl(); sayacEl[a[0]].textContent = kelimeEt(S().kelimeSay(ta.value)); },
        onchange: function () { bellegeAl(); S().taslak(id, mevcut()); } });
      ta.value = ilk || "";
      alanEl[a[0]] = ta;
      sayacEl[a[0]] = hh("span", { class: "small mute", "data-senaryo-sayac": a[0] }, kelimeEt(S().kelimeSay(ta.value)));
    });

    function belgeEl() {
      var b = k.belge;
      return hh("div", { class: "lbox", "data-senaryo-belge": id },
        hh("div", { class: "label" }, "Gelen belge · " + S().TURLER[b.tur]),
        hh("div", { class: "small", lang: "en" }, hh("b", null, "Subject: "), b.konu), hh("div", { class: "small mute", lang: "en" }, hh("b", null, "From: "), b.kimden),
        hh("p", { lang: "en", style: "white-space:pre-wrap;overflow-wrap:anywhere;margin:6px 0 0" }, b.metin));
    }
    function yardimEl() {
      return [
        hh("details", { class: "more", "data-senaryo-sozluk": id }, hh("summary", null, "Mini sözlük (" + k.sozluk.length + " terim)"), hh("div", { class: "morebox" }, hh("ul", { class: "lr-ul" }, k.sozluk.map(function (t) { return hh("li", null, hh("b", { lang: "en" }, t[0]), " — " + t[1]); })))),
        hh("details", { class: "more", "data-senaryo-kalip": id }, hh("summary", null, "Cümle kalıpları (" + k.kaliplar.length + ")"), hh("div", { class: "morebox" }, hh("ul", { class: "lr-ul" }, k.kaliplar.map(function (x) { return hh("li", { lang: "en" }, x); })))),
        hh("label", { class: "small", style: "display:flex;gap:6px;align-items:center;margin:6px 0" },
          hh("input", { style: "width:auto;flex:none;margin-top:2px", type: "checkbox", "data-senaryo-tr": id, checked: u.tr ? true : null, onchange: function (e) { bellegeAl(); u.tr = e.target.checked; ciz(); } }), "Türkçe ipucunu göster (varsayılan kapalı; önce kendin dene)"),
        u.tr ? hh("div", { class: "lbox warn", "data-senaryo-ipucu": id, role: "status" }, hh("div", { class: "label" }, "Türkçe ipucu"), hh("p", { class: "small" }, k.ipucuTr)) : null];
    }
    function yapiListesi(r) {
      return hh("ul", { class: "lr-ul small", "data-senaryo-yapi": r.ok ? "tamam" : "eksik" }, sb.alanlar.map(function (a) {
        var x = r.alanlar[a[0]];
        return hh("li", null, (x.tamam ? "✓ " : "✗ ") + a[1] + ": " + kelimeEt(x.kelime) + (x.tamam ? "" : " (en az " + r.alanBasi + " kelime)"));
      }).concat([hh("li", null, (r.yeter ? "✓ " : "✗ ") + "Toplam: " + kelimeEt(r.toplam) + " (asgari " + r.asgari + ")")]));
    }
    function sonucEl(kay) {
      var c = kay.c, yapi = S().yapiDenetimi(k, c), kv = S().kavramDenetimi(k, c);
      var secili = kay.k;
      var kontrolEl = hh("div", { class: "lbox", "data-senaryo-kontrol": id }, hh("div", { class: "label" }, "Öz-karşılaştırma: kendi cevabını işaretle (" + secili.filter(Boolean).length + "/" + k.kontrol.length + ")"),
        k.kontrol.map(function (m, i) {
          return hh("label", { class: "small", style: "display:flex;gap:6px;align-items:flex-start;margin:4px 0" },
            hh("input", { style: "width:auto;flex:none;margin-top:2px", type: "checkbox", "data-senaryo-madde": String(i), checked: secili[i] ? true : null, onchange: function (e) { S().kontrolIsaretle(id, i, e.target.checked); ciz(); } }), hh("span", null, m));
        }));
      return hh("div", { "data-senaryo-sonuc": id },
        hh("div", { class: "lbox", role: "status" }, hh("div", { class: "label" }, "Otomatik denetim (yapı ve anahtar kavram)"),
          hh("div", { class: "small mute" }, "Bu denetim yalnız şablon alanlarını, uzunluğu ve anahtar kavramların geçip geçmediğini sayar. Anlamı, doğruluğu ve dilbilgisini değerlendirmez; doğru/yanlış hükmü vermez."),
          yapiListesi(yapi),
          hh("div", { class: "small", "data-senaryo-kavram": kv.bulunan.length + "/" + kv.toplam }, hh("b", null, "Anahtar kavramlar: " + kv.bulunan.length + "/" + kv.toplam + ". ")),
          hh("ul", { class: "lr-ul small" }, k.mustMention.map(function (m) { var bul = kv.bulunan.indexOf(m.ad) >= 0; return hh("li", { "data-senaryo-kavram-ad": bul ? "var" : "yok" }, (bul ? "✓ " : "· ") + m.ad + (bul ? "" : " (cevabında bulunamadı; başka sözcükle yazmış olabilirsin)")); }))),
        hh("div", { class: "lbox", "data-senaryo-karsilastir": id }, hh("div", { class: "label" }, "Yan yana karşılaştır"),
          hh("div", { style: "display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr));gap:8px" },
            hh("div", { "data-senaryo-benim": id }, hh("b", { class: "small" }, "Senin cevabın"), metinGrubu(k, c).map(function (p) { return hh("div", null, sb.alanlar.length > 1 ? hh("div", { class: "small mute" }, p[0]) : null, hh("p", { lang: "en", style: "white-space:pre-wrap;overflow-wrap:anywhere;margin:2px 0 6px" }, p[1] || "—")); })),
            hh("div", { "data-senaryo-ornek": id }, hh("b", { class: "small" }, "Örnek iyi cevap (tek olası cevap; birebir aynısı gerekmez)"), metinGrubu(k, k.ornek).map(function (p) { return hh("div", null, sb.alanlar.length > 1 ? hh("div", { class: "small mute" }, p[0]) : null, hh("p", { lang: "en", style: "white-space:pre-wrap;overflow-wrap:anywhere;margin:2px 0 6px" }, p[1])); })))),
        kontrolEl,
        hh("label", { class: "small", style: "display:flex;gap:6px;align-items:center;margin:6px 0" },
          hh("input", { style: "width:auto;flex:none;margin-top:2px", type: "checkbox", "data-senaryo-gizle": id, checked: kay.x ? true : null, onchange: function (e) { S().gizle(id, e.target.checked); ciz(); } }), "Bu yazıyı \"İş yazışmalarım\" dışa aktarımında gizle"));
    }

    function ciz() {
      var kay = S().oku(id), gonderildi = !!kay.g;
      kok.textContent = "";
      sb.alanlar.forEach(function (a) { alanEl[a[0]].readOnly = gonderildi; });   /* gönderilmiş cevap değişmez; düzenlemek için "Yeniden yaz" */
      kok.appendChild(hh("div", { class: "label" }, "İş senaryosu · İngilizce yazma (isteğe bağlı)"));
      kok.appendChild(hh("h3", null, k.baslik));
      kok.appendChild(hh("div", { class: "small mute", "data-senaryo-not": id }, "Gerçek iş yazışması alıştırması. Not, kapı ya da ustalık sayılmaz; yapay zekâ geri bildirimi yok ve yazdıkların hiçbir yere gönderilmez (yalnız bu cihazda saklanır). Dersi bitirmek için gerekli değil."));
      kok.appendChild(belgeEl());
      kok.appendChild(hh("p", null, hh("b", null, "Görev: "), hh("span", { lang: "en" }, k.gorev), hh("span", { class: "small mute" }, " · Şablon: " + sb.ad)));
      yardimEl().forEach(function (x) { if (x) kok.appendChild(x); });
      kok.appendChild(hh("div", { "data-senaryo-form": id },
        sb.alanlar.map(function (a) { return hh("label", { class: "field", style: "display:block;margin:6px 0" }, hh("span", { class: "label", lang: "en" }, a[1]), alanEl[a[0]], sayacEl[a[0]]); })));
      var yapiSonuc = u.yapi && !gonderildi ? hh("div", { class: "lbox", role: "status", "data-senaryo-onyapi": id }, hh("div", { class: "label" }, "Yapı denetimi (örnek cevap ve kavram denetimi gönderince açılır)"), yapiListesi(S().yapiDenetimi(k, mevcut()))) : null;
      kok.appendChild(hh("div", { class: "row", style: "gap:6px;flex-wrap:wrap;margin:6px 0" },
        gonderildi
          ? hh("button", { class: "btn ghost", type: "button", "data-senaryo": "yeniden", onclick: function () { bellegeAl(); S().yenidenYaz(id); u.mesaj = ""; u.yapi = false; ciz(); } }, "Yeniden yaz")
          : [hh("button", { class: "btn ghost", type: "button", "data-senaryo": "yapi", onclick: function () { bellegeAl(); S().taslak(id, mevcut()); u.yapi = true; u.mesaj = ""; ciz(); } }, "Yapı denetimi"),
            hh("button", { class: "btn", type: "button", "data-senaryo": "gonder", onclick: function () {
              bellegeAl(); var r = S().gonder(id, mevcut());
              u.mesaj = r.ok ? "" : r.neden === "bos-cevap" ? "Önce en az bir alana yaz; sonra örnek cevabı açabilirsin." : "Kaydedilemedi (tarayıcı depolaması kapalı ya da dolu olabilir).";
              ciz();
            } }, "Gönder ve örnek cevabı aç")]));
      if (u.mesaj) kok.appendChild(hh("div", { class: "small warn", role: "status", "data-senaryo-mesaj": id }, u.mesaj));
      if (yapiSonuc) kok.appendChild(yapiSonuc);
      if (gonderildi) kok.appendChild(sonucEl(kay));
      if (gonderildi && kay.t) kok.appendChild(hh("div", { class: "small mute", "data-senaryo-tarih": id }, "Gönderildi: " + kay.t + " · doğrulanmamış (öz-beyan)"));
      listeleriYenile();
    }
    kok.yenile = ciz;
    ciz();
    return kok;
  }

  /* "İş yazışmalarım": gönderilmiş cevaplar; PP.rapor.isYazismalari etiketi "doğrulanmamış"; gizli işaretliler dışa aktarılmaz */
  function listeIcerik() {
    var hh = g.h;
    if (!S() || !PP.rapor || !PP.rapor.isYazismalari) return null;
    var kay = S().portfoyKayitlari();
    if (!kay.length) return null;
    var r = PP.rapor.isYazismalari(kay), metin = PP.rapor.isYazismalariMetni(kay), pano = hh("div", { class: "small", role: "status", "data-senaryo-pano": "1" });
    var ta = hh("textarea", { readonly: true, rows: 6, "aria-label": "Dışa aktarılacak metin", "data-senaryo-disa": "1", style: "width:100%;box-sizing:border-box;font-size:13px" });
    ta.value = metin;
    return hh("details", { class: "more", "data-senaryo-liste": String(kay.length), open: listeAcik ? true : null, ontoggle: function (e) { listeAcik = e.target.open; } }, hh("summary", null, "İş yazışmalarım (" + kay.length + ") · doğrulanmamış"),
      hh("div", { class: "morebox" },
        hh("div", { class: "small mute" }, r.not),
        hh("ul", { class: "lr-ul small" }, kay.map(function (x) { return hh("li", { "data-senaryo-satir": x.id }, hh("b", null, x.baslik), " · " + x.tarih + " · " + x.sablon + " · " + x.kelime + " kelime · anahtar kavram " + x.kavram + " · öz-karşılaştırma " + x.kontrolOz + (x.gizli ? " · dışa aktarmada gizli" : "")); })),
        hh("div", { class: "small mute" }, "Dışa aktarma yalnız yazdığın cevapları içerir (" + r.sayi + " kayıt" + (r.gizli ? ", " + r.gizli + " gizli" : "") + "); ders notların ve özel notların dahil edilmez."),
        ta,
        hh("div", { class: "row", style: "gap:6px;margin-top:6px" }, hh("button", { class: "btn ghost", type: "button", "data-senaryo": "kopyala", onclick: function () {
          var ok = function (b) { pano.textContent = b ? "Kopyalandı." : "Kopyalanamadı. Metni elle seçip kopyala."; };
          try { g.navigator.clipboard.writeText(ta.value).then(function () { ok(true); }, function () { ok(false); }); } catch (e) { ok(false); }
        } }, "Metni kopyala")), pano));
  }

  /* Kap her zaman vardır (boşsa boş kalır); kart gönderilince/yeniden yazılınca/gizlenince içeriği tazelenir */
  function liste() {
    var kap = g.h("div", { "data-senaryo-liste-kap": "1" });
    function doldur() { kap.textContent = ""; var x = listeIcerik(); if (x) kap.appendChild(x); }
    doldur(); kap.doldur = doldur; listeler.push(kap);
    return kap;
  }
  function listeleriYenile() {
    listeler = listeler.filter(function (k) { return k.isConnected; });
    listeler.forEach(function (k) { try { k.doldur(); } catch (e) { /* yoksay */ } });
  }

  function dersIcin(dersId) { var k = S() && S().dersIcin(dersId); return k ? [kur(k.id), liste()].filter(Boolean) : null; }
  /* Backend / Siber ders odası: topicId "s-bk-3" → "bk-3" */
  function konuIcin(l) { var m = /^s-(bk|sec)-(\d+)$/.exec(l && l.topicId || ""); return m ? dersIcin(m[1] + "-" + m[2]) : null; }

  PP.senaryoUi = { kur: kur, liste: liste, dersIcin: dersIcin, konuIcin: konuIcin, sifirlaTaslak: function () { taslakBellek = {}; uiDurum = {}; } };
  g.lrSenaryo = konuIcin;
})(typeof window !== "undefined" ? window : globalThis);

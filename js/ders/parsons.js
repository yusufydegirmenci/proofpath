"use strict";
/* ---- PP.parsons: Parsons soruları (Faz 10 tur 4) — karışık satırları doğru sıraya dizme ----
   Veri: window.PP_PARSONS (content/parsons.js): {id, ders, baslik, gorev, dogru:[doğru sırayla satırlar], yanlis:[en çok 2 yanlış satır], ipucu:[3 kademe], aciklama}.
   Satır kimliği "l"+i: i < dogru.length doğru sıradaki satırdır; sonrakiler yanlış (oyalayıcı) satırlardır. Ekranda kimlik gösterilmez.
   Klavye: sürüklemek zorunlu değildir; her satırda Ekle / Yukarı / Aşağı / Çıkar düğmeleri vardır (sürükleme yalnız ek).
   Ortak çubuk (PP.cubuk): Kontrol · İpucu (3 kademe) · Çözümü gör (2 yanlıştan sonra). Çözüm görülürse kanıt sayılmaz.
   Kanıt: PP.ogr.depo.kanitEkle (tur "lab", istemci doğrulaması; sunucu kanıtı değildir). */
(function (g) {
  var PP = g.PP = g.PP || {}, EN_COK_YANLIS = 2;
  var kayit = {}, onbellek = {};

  function tanimla(d) {
    if (!d || typeof d !== "object") return { ok: false, neden: "tanim-yok" };
    if (typeof d.id !== "string" || !d.id) return { ok: false, neden: "id-yok" };
    if (typeof d.ders !== "string" || !d.ders) return { ok: false, neden: "ders-yok" };
    if (!Array.isArray(d.dogru) || d.dogru.length < 3 || d.dogru.length > 10 || d.dogru.some(function (x) { return typeof x !== "string" || !x; })) return { ok: false, neden: "dogru-gecersiz" };
    var yanlis = Array.isArray(d.yanlis) ? d.yanlis : [];
    if (yanlis.length > EN_COK_YANLIS || yanlis.some(function (x) { return typeof x !== "string" || !x; })) return { ok: false, neden: "yanlis-gecersiz" };
    var hepsi = d.dogru.concat(yanlis);
    if (hepsi.some(function (x, i) { return hepsi.indexOf(x) !== i; })) return { ok: false, neden: "satir-tekrar" };
    var x = { id: d.id, ders: d.ders, baslik: d.baslik || d.id, gorev: d.gorev || "", dogru: d.dogru.slice(), yanlis: yanlis.slice(), ipucu: Array.isArray(d.ipucu) ? d.ipucu.slice(0, 3) : [], aciklama: d.aciklama || "" };
    kayit[x.id] = x;
    return { ok: true, parsons: x };
  }
  function yukle() {
    (Array.isArray(g.PP_PARSONS) ? g.PP_PARSONS : []).forEach(function (d) { if (!kayit[d.id]) tanimla(d); });
  }
  function bul(id) { yukle(); return kayit[id] || null; }
  function dersIcin(ders) { yukle(); return Object.keys(kayit).map(function (k) { return kayit[k]; }).filter(function (x) { return x.ders === ders; }); }

  /* Karışık görünüm: kimliğe bağlı, her açılışta aynı (deterministik); doğru sıradan farklı olması garanti */
  function karisik(d) {
    var ids = d.dogru.concat(d.yanlis).map(function (_, i) { return "l" + i; }), t = 0;
    for (var i = 0; i < d.id.length; i++) t = (t * 31 + d.id.charCodeAt(i)) >>> 0;
    function rnd() { t = (t + 0x6D2B79F5) >>> 0; var r = Math.imul(t ^ (t >>> 15), 1 | t); r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r; return ((r ^ (r >>> 14)) >>> 0) / 4294967296; }
    for (var j = ids.length - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)), tmp = ids[j]; ids[j] = ids[k]; ids[k] = tmp; }
    var sirali = ids.slice(0, d.dogru.length).every(function (x, n) { return x === "l" + n; });
    if (sirali) ids.push(ids.shift());
    return ids;
  }
  function metin(d, id) { var i = +String(id).slice(1), hepsi = d.dogru.concat(d.yanlis); return hepsi[i]; }

  /* sec: öğrencinin seçtiği satır kimlikleri, sırayla. */
  function kontrol(d, sec) {
    sec = Array.isArray(sec) ? sec : [];
    var konum = sec.map(function (id, i) { return id === "l" + i; });
    var dogruSayi = konum.filter(Boolean).length;
    var yanlisSatir = sec.filter(function (id) { return +String(id).slice(1) >= d.dogru.length; }).length;
    var eksik = d.dogru.length - sec.filter(function (id) { return +String(id).slice(1) < d.dogru.length; }).length;
    return { dogru: sec.length === d.dogru.length && dogruSayi === d.dogru.length, konum: konum, dogruYerde: dogruSayi, yanlisSatir: yanlisSatir, eksik: eksik };
  }
  function cozumMetni(d) { return d.dogru.map(function (x, i) { return (i + 1) + ". " + x; }).join("\n") + (d.aciklama ? "\n\n" + d.aciklama : ""); }

  function kanitKaydet(d, ipucu) {
    var O = PP.ogr;
    if (!O || !O.depo) return { ok: false, neden: "depo-yok" };
    if (PP.cubuk && !PP.cubuk.kanitSayilir("parsons:" + d.id)) return { ok: false, neden: "cozum-goruldu" };
    return O.depo.kanitEkle({ id: "parsons-" + d.id + (ipucu ? "-ipucu" : ""), tur: "lab", hedef: "lab:" + d.ders + ":" + d.id, dogrulama: "istemci" });
  }

  /* ---------- Arayüz ---------- */
  function kur(d) {
    var hh = g.h, cid = "parsons:" + d.id, sec = [], odak = null, sonuc = null, surukle = -1;
    var kok = hh("div", { class: "lbox", "data-parsons": d.id });
    var cikis = hh("div", { role: "status", "aria-live": "polite", "data-parsons-sonuc": d.id });
    var liste = hh("div", { "data-parsons-liste": d.id });
    var kontrolBtn = hh("button", { class: "btn", type: "button", "data-parsons-kontrol": d.id, onclick: kontrolEt }, "Kontrol et");
    var sifirBtn = hh("button", { class: "btn ghost", type: "button", "data-parsons-sifirla": d.id, onclick: function () { sec = []; sonuc = null; odak = null; cubuk.gizle(); ciz(); } }, "Sıfırla");
    var cubuk = PP.cubuk.kur({ id: cid, ipucu: d.ipucu, cozum: function () { return cozumMetni(d); }, birincilEl: kontrolBtn, sifirlaEl: sifirBtn });
    var sirali = karisik(d);

    function tasi(i, yon) { var j = i + yon; if (j < 0 || j >= sec.length) return; var t = sec[i]; sec[i] = sec[j]; sec[j] = t; sonuc = null; odak = (yon < 0 ? "yukari-" : "asagi-") + sec[j]; ciz(); }
    function kontrolEt() {
      var r = kontrol(d, sec); sonuc = r;
      if (r.dogru) {
        var ip = PP.cubuk.ipucuKullanildi(cid), kn = PP.cubuk.kanitSayilir(cid) ? kanitKaydet(d, ip) : null;
        sonuc.kanit = kn ? (kn.ok ? "Kanıt kaydedildi (istemci doğrulaması)." : "Kanıt kaydedilemedi.") : "Çözüm görüldüğü için kanıt kaydedilmedi.";
      } else PP.cubuk.yanlis(cid);
      odak = "kontrol"; ciz();
    }
    function ciz() {
      var kalan = sirali.filter(function (id) { return sec.indexOf(id) < 0; });
      liste.textContent = "";
      liste.appendChild(hh("div", { class: "label" }, "Satır havuzu (" + kalan.length + ")"));
      liste.appendChild(kalan.length ? hh("ul", { class: "lr-ul", style: "list-style:none;padding:0;margin:4px 0" }, kalan.map(function (id) {
        return hh("li", { style: "display:flex;gap:6px;align-items:center;margin:3px 0", "data-parsons-havuz": id },
          hh("button", { class: "btn ghost", type: "button", "data-parsons-btn": "ekle-" + id, "aria-label": "Çözüme ekle: " + metin(d, id), onclick: function () { sec.push(id); sonuc = null; odak = "ekle-" + (kalan[kalan.indexOf(id) + 1] || kalan[kalan.indexOf(id) - 1] || ""); ciz(); } }, "Ekle"),
          hh("code", { class: "mono small", style: "overflow-wrap:anywhere" }, metin(d, id)));
      })) : hh("div", { class: "small mute" }, "Tüm satırlar çözüme alındı. Gereksiz gördüklerini “Çıkar” ile havuza geri koy."));
      liste.appendChild(hh("div", { class: "label", style: "margin-top:8px" }, "Çözümün (yukarıdan aşağı sıra)"));
      liste.appendChild(sec.length ? hh("ol", { class: "lr-ul", "data-parsons-cozum": d.id }, sec.map(function (id, i) {
        var m = sonuc && sonuc.konum ? (sonuc.konum[i] ? " ok" : " no") : "";
        return hh("li", { class: "pr-sat" + m, draggable: "true", "data-parsons-sira": String(i + 1), style: "display:flex;gap:6px;align-items:center;margin:3px 0;flex-wrap:wrap",
          ondragstart: function () { surukle = i; }, ondragover: function (e) { e.preventDefault(); },
          ondrop: function (e) { e.preventDefault(); if (surukle < 0 || surukle === i) return; var t = sec.splice(surukle, 1)[0]; sec.splice(i, 0, t); surukle = -1; sonuc = null; ciz(); } },
          hh("code", { class: "mono small", style: "flex:1;min-width:55%;overflow-wrap:anywhere" }, metin(d, id)),
          sonuc && sonuc.konum ? hh("span", { class: "small " + (sonuc.konum[i] ? "ok" : "warn"), "aria-label": sonuc.konum[i] ? "doğru yerde" : "yanlış yerde ya da fazla" }, sonuc.konum[i] ? "✓" : "✗") : null,
          hh("button", { class: "btn ghost", type: "button", "data-parsons-btn": "yukari-" + id, disabled: i === 0, "aria-label": "Yukarı taşı: " + metin(d, id), onclick: function () { tasi(i, -1); } }, "↑"),
          hh("button", { class: "btn ghost", type: "button", "data-parsons-btn": "asagi-" + id, disabled: i === sec.length - 1, "aria-label": "Aşağı taşı: " + metin(d, id), onclick: function () { tasi(i, 1); } }, "↓"),
          hh("button", { class: "btn ghost", type: "button", "data-parsons-btn": "cikar-" + id, "aria-label": "Çözümden çıkar: " + metin(d, id), onclick: function () { sec.splice(i, 1); sonuc = null; odak = null; ciz(); } }, "Çıkar"));
      })) : hh("div", { class: "small mute" }, "Henüz satır seçmedin. Havuzdan “Ekle” ile başla; sürüklemek yerine ↑ ↓ düğmelerini kullanabilirsin."));
      cikis.textContent = "";
      if (sonuc) {
        if (sonuc.dogru) cikis.appendChild(hh("div", { class: "small ok", "data-parsons-durum": "dogru" }, "✓ Doğru sıra. " + (sonuc.kanit || "") + (d.aciklama ? " " + d.aciklama : "")));
        else {
          var ipu = [];
          if (sonuc.yanlisSatir) ipu.push("çözümünde bu işe gerekmeyen " + sonuc.yanlisSatir + " satır var");
          if (sonuc.eksik) ipu.push(sonuc.eksik + " gerekli satır eksik");
          cikis.appendChild(hh("div", { class: "small warn", "data-parsons-durum": "yanlis" }, "✗ Henüz değil: " + sonuc.dogruYerde + "/" + d.dogru.length + " satır doğru yerde" + (ipu.length ? "; " + ipu.join(", ") : "") + ". ✗ işaretli satırlara bak."));
        }
      }
      if (odak) { var el = kok.querySelector('[data-parsons-btn="' + odak + '"]') || (odak === "kontrol" ? kontrolBtn : null); if (el && el.focus && !el.disabled) el.focus(); }
    }
    kok.appendChild(hh("div", { class: "label" }, "Sıraya diz · " + d.baslik));
    kok.appendChild(hh("div", { class: "lab-et" }, "Alıştırma · kod çalıştırılmaz; satırları doğru sıraya dizersin"));
    if (d.gorev) kok.appendChild(hh("p", { class: "small" }, d.gorev));
    kok.appendChild(liste); kok.appendChild(cubuk); kok.appendChild(cikis);
    kok.appendChild(hh("div", { class: "small mute" }, "Bazı satırlar gereksiz olabilir (en çok " + EN_COK_YANLIS + "); onları çözüme alma."));
    ciz();
    return kok;
  }
  function panel(id) {
    var d = bul(id);
    if (!d) return null;
    if (!onbellek[id]) onbellek[id] = kur(d);
    return onbellek[id];
  }
  /* Bir dersin Parsons soruları tek kapsayıcıda; yoksa null */
  function panelDers(ders) {
    var L = dersIcin(ders);
    if (!L.length || !g.h) return null;
    return g.h("div", { "data-parsons-ders": ders }, L.map(function (d) { return panel(d.id); }));
  }

  PP.parsons = { EN_COK_YANLIS: EN_COK_YANLIS, tanimla: tanimla, bul: bul, dersIcin: dersIcin, karisik: karisik, kontrol: kontrol, cozumMetni: cozumMetni, kanitKaydet: kanitKaydet, kur: kur, panel: panel, panelDers: panelDers };
})(typeof window !== "undefined" ? window : globalThis);

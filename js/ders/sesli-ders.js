"use strict";
/* ---- faz-k7: "Dinle" modu. Tarayıcı sesi (speechSynthesis) ile ders metnini cümle cümle okur.
   Sunucu, ücretli API, dış ses dosyası yok. Saf kısım (parcala/dilBul/sesBul/hizSinir) Node'da test edilir (tests/faz_ses.js). ---- */
(function (g) {
  var PP = g.PP = g.PP || {}, SES = PP.ses = PP.ses || {};
  var HIZ_MIN = 0.8, HIZ_MAX = 1.5;

  function hizSinir(x) { x = parseFloat(x); if (!isFinite(x)) x = 1; return Math.min(HIZ_MAX, Math.max(HIZ_MIN, Math.round(x * 20) / 20)); }

  /* Cümlede Türkçe harf yoksa ve İngilizce işlev sözcükleri baskınsa en-US, yoksa tr-TR. */
  var EN = /^(the|a|an|is|are|was|were|be|i|you|he|she|it|we|they|my|your|to|of|in|on|at|for|and|or|with|do|does|did|can|could|will|would|have|has|had|not|this|that|what|how|please|me|nice|meet|from|am|im|hi)$/;
  function dilBul(s) {
    s = String(s || "");
    if (/[çğıöşüÇĞİÖŞÜ]/.test(s)) return "tr-TR";
    var w = s.toLowerCase().match(/[a-z']+/g) || [];
    if (w.length < 3) return "tr-TR";
    var n = 0; w.forEach(function (x) { if (EN.test(x)) n++; });
    return n / w.length >= 0.3 ? "en-US" : "tr-TR";
  }

  function cumleler(t) {
    return String(t || "").replace(/\s+/g, " ").trim().replace(/([.!?…:;])\s+/g, "$1\u0001").split("\u0001").filter(function (x) { return x.trim(); });
  }

  /* Ders → [{t, dil, kod}]. Başlık + bölüm metinleri; kod blokları okunmaz, "kod bloğu" denir. */
  function parcala(l) {
    var out = [];
    function ekle(t, kod) { cumleler(t).forEach(function (c) { out.push({ t: c, dil: kod ? "tr-TR" : dilBul(c), kod: !!kod }); }); }
    if (!l) return out;
    if (l.title) ekle(l.title);
    (Array.isArray(l.blocks) ? l.blocks : []).forEach(function (b) {
      if (!b || typeof b !== "object") return;
      var t = b.t, txt = typeof b.text === "string" ? b.text : "";
      if (t === "cmd") { ekle("Kod bloğu.", true); return; }
      if (t === "split") return;
      if (t === "h") { ekle(txt); return; }
      if (b.h) ekle(b.h);
      if (t === "steps") (Array.isArray(b.items) ? b.items : []).forEach(function (x) { ekle(String(x)); });
      else if (txt) ekle(txt);
    });
    return out;
  }

  /* Tam dil → aynı dil önekli ses → yok. */
  function sesBul(voices, dil) {
    var d = String(dil).toLowerCase(), on = d.split("-")[0];
    var list = (voices || []).map(function (v) { return { v: v, l: String(v.lang || "").toLowerCase().replace("_", "-") }; });
    var tam = list.filter(function (x) { return x.l === d; })[0] || list.filter(function (x) { return x.l.split("-")[0] === on; })[0];
    return tam ? tam.v : null;
  }

  SES.parcala = parcala; SES.dilBul = dilBul; SES.sesBul = sesBul; SES.hizSinir = hizSinir; SES.cumleler = cumleler;
  if (typeof module !== "undefined" && module.exports) module.exports = SES;
  if (typeof document === "undefined" || typeof g.h !== "function") return;

  /* ---------------- Arayüz ---------------- */
  var HIZ_ANAHTAR = "ya_ses_hiz";
  function hizOku() { try { return hizSinir(g.localStorage.getItem(HIZ_ANAHTAR)); } catch (e) { return 1; } }
  var D = { id: null, parts: [], i: 0, durum: "dur", hiz: hizOku(), jeton: 0, ui: null, odak: null, tab: 0 };
  var syn = function () { return g.speechSynthesis || null; };
  var sesler = function () { try { return syn() ? syn().getVoices() : []; } catch (e) { return []; } };

  function iptal() { D.jeton++; try { var y = syn(); if (y && (y.speaking || y.pending)) y.cancel(); } catch (e) {} }
  function dur(basa) { iptal(); D.durum = "dur"; if (basa) D.i = 0; boya(); }
  function bagli() { return !!(D.ui && D.ui.kok.isConnected); }

  function oku(i) {
    var s = syn(); if (!s) return;
    if (i >= D.parts.length) { iptal(); D.durum = "bitti"; D.i = D.parts.length - 1; boya(); return; }
    iptal(); var jt = D.jeton; D.i = i; D.durum = "oyn";
    var p = D.parts[i], u = new g.SpeechSynthesisUtterance(p.t);
    u.lang = p.dil; u.rate = D.hiz; D.u = u; /* Chrome çöp toplanan utterance'ın onend'ini düşürür */
    var v = sesBul(sesler(), p.dil); if (v) u.voice = v;
    u.onend = function () { if (jt !== D.jeton) return; if (!bagli()) { dur(false); return; } oku(D.i + 1); };
    u.onerror = function () { if (jt !== D.jeton) return; D.durum = "dur"; boya(); };
    try { s.speak(u); } catch (e) { D.durum = "dur"; }
    boya();
  }

  function trSesYok() {
    var v = sesler(); if (!v.length) return false; /* liste henüz yüklenmediyse uyarma */
    return D.parts.some(function (p) { return p.dil === "tr-TR"; }) && !sesBul(v, "tr-TR");
  }

  function medya(l) {
    var ms = g.navigator && g.navigator.mediaSession; if (!ms) return;
    try {
      if (g.MediaMetadata) ms.metadata = new g.MediaMetadata({ title: l.title || "Ders", artist: g.PP_MARKA.ad + " · Dinle" });
      ms.setActionHandler("play", function () { if (D.durum !== "oyn") oku(D.durum === "bitti" ? 0 : D.i); });
      ms.setActionHandler("pause", function () { dur(false); });
      ms.setActionHandler("stop", function () { dur(true); });
      ms.setActionHandler("nexttrack", function () { oku(Math.min(D.parts.length - 1, D.i + 1)); });
      ms.setActionHandler("previoustrack", function () { oku(Math.max(0, D.i - 1)); });
    } catch (e) {}
  }

  function sonraki(l) {
    try { var li = g.lessonListFor(l.track).list, k = li.map(function (x) { return x.id; }).indexOf(l.id); return k >= 0 ? li[k + 1] || null : null; } catch (e) { return null; }
  }

  function boya() {
    var u = D.ui; if (!u || !u.kok.isConnected) return;
    var oyn = D.durum === "oyn", bit = D.durum === "bitti", n = D.parts.length;
    u.oynat.textContent = oyn ? "Duraklat" : bit ? "Baştan dinle" : D.i > 0 ? "Devam" : "Dinle";
    u.oynat.setAttribute("aria-label", oyn ? "Duraklat" : bit ? "Baştan dinle" : D.i > 0 ? "Dinlemeye devam et" : "Dersi dinle");
    u.durdur.disabled = D.durum === "dur" && D.i === 0;
    u.say.textContent = n ? (Math.min(D.i + 1, n)) + " / " + n + " cümle" : "";
    u.bar.style.width = n ? Math.round((bit ? n : D.i) / n * 100) + "%" : "0%";
    u.hizEt.textContent = "Hız " + D.hiz.toFixed(2).replace(/0$/, "") + "×";
    u.kok.setAttribute("data-durum", D.durum);
    Array.prototype.forEach.call(u.liste.children, function (li, k) { var a = k === D.i && (oyn || D.i > 0 || bit); li.classList.toggle("on", a); if (a) li.setAttribute("aria-current", "true"); else li.removeAttribute && li.removeAttribute("aria-current"); });
    if (oyn) { var on = u.liste.children[D.i]; if (on && on.scrollIntoView && u.det.open) { try { on.scrollIntoView({ block: "nearest" }); } catch (e) {} } }
    u.bitti.hidden = !bit;
  }

  /* Sayfa gizlenince/kapanınca konuşma durur (Android arka planda zaten keser; durum "oynuyor" kalmasın). */
  try { g.addEventListener("pagehide", function () { dur(false); }); g.document.addEventListener("visibilitychange", function () { if (g.document.hidden && D.durum === "oyn") dur(false); }); } catch (e) {}
  /* draw() paneli baştan kurar; odaktaki düğme (data-k) yeni panelde yeniden odaklanır. */
  function odakDondur(kok) {
    var k = D.odak; if (!k) return;
    g.setTimeout(function () {
      var a = g.document.activeElement; if (!kok.isConnected || (a && a !== g.document.body)) return;
      var e = kok.querySelector && kok.querySelector('[data-k="' + k + '"]'); if (e && e.focus) e.focus();
    }, 0);
  }
  function listeOk(ev) {
    var n = D.parts.length, d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[ev.key], k = D.tab;
    if (d) k += d; else if (ev.key === "Home") k = 0; else if (ev.key === "End") k = n - 1; else return;
    ev.preventDefault(); k = Math.min(n - 1, Math.max(0, k)); tabYap(k);
    var b = D.ui.liste.children[k].children[0]; if (b && b.focus) b.focus();
  }
  function tabYap(k) { D.tab = k; Array.prototype.forEach.call(D.ui.liste.children, function (li, j) { li.children[0].setAttribute("tabindex", j === k ? "0" : "-1"); }); }
  g.lrDinle = function (l) {
    var h = g.h, s = syn();
    var parts = parcala(l);
    if (!parts.length) return null;
    if (D.id !== l.id) { iptal(); D.id = l.id; D.i = 0; D.durum = "dur"; D.odak = null; }
    D.parts = parts;
    var ui = D.ui = {};
    ui.oynat = h("button", { type: "button", class: "btn ses-b", "data-k": "oynat", onclick: function () {
      if (D.durum === "oyn") dur(false); else oku(D.durum === "bitti" ? 0 : D.i);
    } });
    ui.durdur = h("button", { type: "button", class: "btn ghost ses-b", "data-k": "durdur", "aria-label": "Durdur ve başa sar", onclick: function () { dur(true); } }, "Durdur");
    var geri = h("button", { type: "button", class: "btn ghost ses-b", "data-k": "geri", "aria-label": "Önceki cümle", onclick: function () { oku(Math.max(0, D.i - 1)); } }, "‹");
    var ileri = h("button", { type: "button", class: "btn ghost ses-b", "data-k": "ileri", "aria-label": "Sonraki cümle", onclick: function () { oku(Math.min(parts.length - 1, D.i + 1)); } }, "›");
    ui.say = h("span", { class: "small mute", "aria-live": "off" });
    ui.hizEt = h("label", { class: "small", for: "ses-hiz" });
    ui.hiz = h("input", { type: "range", id: "ses-hiz", "data-k": "hiz", min: String(HIZ_MIN), max: String(HIZ_MAX), step: "0.05", value: String(D.hiz), "aria-label": "Okuma hızı", "aria-valuetext": D.hiz + " kat",
      oninput: function () { D.hiz = hizSinir(this.value); try { g.localStorage.setItem(HIZ_ANAHTAR, String(D.hiz)); } catch (e) {} this.setAttribute("aria-valuetext", D.hiz + " kat"); boya(); },
      onchange: function () { if (D.durum === "oyn") oku(D.i); } });
    ui.bar = h("i", { style: "width:0%" });
    D.tab = Math.min(D.tab, parts.length - 1);
    ui.liste = h("ol", { class: "ses-ls", onkeydown: listeOk }, parts.map(function (p, k) {
      return h("li", { lang: p.dil.slice(0, 2) }, h("button", { type: "button", class: "ses-c", "data-k": "c" + k, tabindex: k === D.tab ? "0" : "-1", onfocus: function () { D.tab = k; }, onclick: function () { oku(k); } }, p.kod ? "[kod bloğu]" : p.t));
    }));
    ui.det = h("details", { class: "ses-det", open: D.acik ? true : null, ontoggle: function () { D.acik = this.open; } }, h("summary", null, "Metni göster"), ui.liste);
    var nx = sonraki(l);
    ui.bitti = h("div", { class: "ses-bitti", hidden: true, role: "status" }, h("b", null, "Ders bitti."),
      nx ? h("button", { type: "button", class: "btn ses-b", onclick: function () { dur(true); if (typeof g.lrOpen === "function") g.lrOpen(nx); } }, "Sonraki ders: " + (nx.title || "Ders")) : null);
    var uyari = !s || !g.SpeechSynthesisUtterance ? h("div", { class: "lbox warn", role: "status" }, "Bu tarayıcı sesli okumayı desteklemiyor. Metni kendin okuyabilirsin.")
      : null;
    var trUyari = h("div", { class: "lbox warn", role: "status", hidden: true }, "Cihazında Türkçe ses bulunamadı; okuma bozuk çıkabilir. Cihaz ayarlarından Türkçe metin okuma sesini ekleyebilirsin.");
    function kontrol() { trUyari.hidden = !(s && trSesYok()); }
    kontrol();
    try { if (s) s.addEventListener("voiceschanged", function vc() { if (!trUyari.isConnected) { s.removeEventListener("voiceschanged", vc); return; } kontrol(); }); } catch (e) {}
    ui.kok = h("div", { class: "panel ses", role: "group", "aria-label": "Dinle: dersi sesli oku", "data-ses": "1" },
      h("div", { class: "label" }, "Dinle"),
      h("div", { class: "ses-satir" }, ui.oynat, ui.durdur, geri, ileri),
      h("div", { class: "ses-satir" }, ui.hizEt, ui.hiz),
      h("div", { class: "lr-bar" }, ui.bar), ui.say, uyari, trUyari, ui.det, ui.bitti);
    if (uyari) { ui.oynat.disabled = true; ui.hiz.disabled = true; }
    ui.kok.addEventListener && ui.kok.addEventListener("focusin", function (ev) { var k = ev.target && ev.target.getAttribute && ev.target.getAttribute("data-k"); if (k) D.odak = k; });
    medya(l); boya(); odakDondur(ui.kok);
    return ui.kok;
  };
})(typeof window !== "undefined" ? window : globalThis);

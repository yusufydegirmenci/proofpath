"use strict";
/* ---- Giriş eki (Faz C, Y1) ----
   supabase-shim.js'in giriş kartını DOM'da tamamlar; shim'e dokunmaz.
   - Oturum çözülene kadar uygulama kabuğu gizli ve inert (sahibin görünümü/adı kimseye sızmaz).
   - Kart: 3 satır değer önerisi, "en az 8 karakter" ipucu, şifre göster, gizlilik notu.
   - "Hesapsız bir ders dene": yalnız bellekte çalışan örnek ders + mini sınav. Ağ, Supabase, localStorage kullanmaz; hiçbir şey kaydedilmez. */
(function () {
  var CSS =
    "html.ppg-kapali .wrap{display:none!important}" +
    "#ppg-bekle{position:fixed;inset:0;display:none;place-items:center;font:600 15px system-ui,sans-serif;color:var(--mute,#6a655b);background:var(--bg,#f1ede4)}" +
    "html.ppg-kapali #ppg-bekle{display:grid}html.ppg-kapali.ppg-kart #ppg-bekle{display:none}" +
    ".ppg-vp{margin:0;padding:0 0 0 18px;display:grid;gap:5px;font-size:13.5px;line-height:1.4;color:var(--ink,#2d2b27)}" +
    ".ppg-ip{font-size:12.5px;color:var(--mute,#6a655b);margin-top:2px}" +
    ".ppg-gz{font-size:13px;color:var(--mute,#6a655b)}.ppg-gz summary{cursor:pointer;color:var(--net,#2d7d74);text-decoration:underline}" +
    ".ppg-gz p{margin:6px 0 0;font-size:13px;line-height:1.45}" +
    ".ppg-demo{display:grid;gap:10px}.ppg-demo h2{margin:0;font-family:var(--f-disp,Georgia,serif);font-size:22px;line-height:1.2}" +
    ".ppg-demo h2:focus{outline:none}.ppg-kv{border:1px solid var(--line,#d9d1c0);border-radius:10px;padding:9px 11px;font-size:13.5px;line-height:1.4}" +
    ".ppg-kv b{display:block}.ppg-opt{font:inherit;text-align:left;padding:10px 12px;border-radius:10px;border:1px solid var(--line,#d9d1c0);background:var(--bg,#fff);color:var(--ink,#2d2b27);cursor:pointer}" +
    ".ppg-opt.iyi{border-color:var(--net,#2d7d74);background:var(--net-soft,#d6e7e1)}.ppg-opt.kotu{border-color:var(--bad,#b04545);background:var(--rust-soft,#f2d9cb)}" +
    ".ppg-fb{font-size:13.5px;line-height:1.45;padding:9px 11px;border-radius:9px;background:var(--net-soft,#d6e7e1);color:var(--ink,#2d2b27)}";

  var root = document.documentElement;
  var acik = false, zaman = null;

  function stil() {
    if (document.getElementById("ppg-style")) return;
    var s = document.createElement("style");
    s.id = "ppg-style";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
  function kabuk() { return document.querySelector(".wrap"); }
  function kapat() {
    stil();
    root.classList.add("ppg-kapali");
    var w = kabuk();
    if (w) w.setAttribute("inert", "");
    if (!document.getElementById("ppg-bekle")) {
      var b = document.createElement("div");
      b.id = "ppg-bekle";
      b.setAttribute("role", "status");
      b.textContent = "Proofpath açılıyor…";
      document.body.appendChild(b);
    }
  }
  function ac() {
    acik = true;
    clearTimeout(zaman);
    root.classList.remove("ppg-kapali", "ppg-kart");
    var w = kabuk();
    if (w) w.removeAttribute("inert");
    var b = document.getElementById("ppg-bekle");
    if (b) b.remove();
  }
  /* Oturum ve hesap türü (sahip mi) belli olunca baslat.js çağırır; ağ hiç dönmezse 12 sn sonra açılır. */
  function hata() {
    clearTimeout(zaman);
    var b = document.getElementById("ppg-bekle");
    if (!b) return;
    b.textContent = "";
    b.appendChild(document.createTextNode("Bağlantı kurulamadı. İnternetini kontrol edip "));
    var d = document.createElement("button");
    d.type = "button"; d.textContent = "sayfayı yenile"; d.style.cssText = "font:inherit;margin-left:4px;cursor:pointer";
    d.addEventListener("click", function () { location.reload(); });
    b.appendChild(d); b.appendChild(document.createTextNode("."));
    root.classList.remove("ppg-kart");
  }
  window.ppGate = { ac: ac, hata: hata, acik: function () { return acik; } };
  if (window.claude && window.claude.use) {
    var basla = function () { if (!acik) kapat(); };
    if (document.body) basla(); else document.addEventListener("DOMContentLoaded", basla);
    zaman = setTimeout(function yedek() {
      if (acik) return;
      /* Kart açıkken kullanıcı yazıyor olabilir: bekle. Oturum/hesap türü bilinmeden kabuğu AÇMA (kurucu görünümü sızar). */
      if (document.querySelector(".ppa-wrap")) { zaman = setTimeout(yedek, 4000); return; }
      hata();
    }, 12000);
  }

  /* ---------- giriş kartı eki ---------- */
  var NOT_GIZLILIK =
    "Hesabın için e-posta adresin ve görünen adın saklanır. İlerlemen, notların ve projelerin hesabına bağlı olarak kaydedilir. " +
    "Lige katılırsan görünen adın ve puanın lig tablosunda diğer kullanıcılara görünür. Hesapsız denemede hiçbir şey kaydedilmez.";

  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === "text") n.textContent = attrs[k];
      else if (k.slice(0, 2) === "on") n.addEventListener(k.slice(2), attrs[k]);
      else n.setAttribute(k, attrs[k]);
    });
    (kids || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }

  function sifreEki(form, kayit) {
    var pass = form.querySelector('input[type="password"],input[data-ppg-sifre]');
    if (!pass) return;
    pass.setAttribute("data-ppg-sifre", "1");
    var lab = pass.parentNode;
    var ipucu = null;
    if (kayit) {
      ipucu = el("div", { class: "ppg-ip", id: "ppg-ip", text: "En az 8 karakter." });
      pass.setAttribute("aria-describedby", "ppg-ip");
    }
    var goster = el("button", { class: "ppa-link", type: "button", "aria-pressed": "false", text: "Şifreyi göster", onclick: function () {
      var gizli = pass.type === "password";
      pass.type = gizli ? "text" : "password";
      goster.textContent = gizli ? "Şifreyi gizle" : "Şifreyi göster";
      goster.setAttribute("aria-pressed", gizli ? "true" : "false");
    } });
    if (ipucu) lab.appendChild(ipucu);
    lab.parentNode.insertBefore(goster, lab.nextSibling);
  }

  function degerOnerisi(lead) {
    return el("ul", { class: "ppg-vp", "aria-label": "Proofpath ne sunar" }, [
      el("li", { text: "Hedefini seç: ağ, siber güvenlik, yazılım, test, DevOps ya da iş İngilizcesi." }),
      el("li", { text: "Her ders dört adım: ısınma, anlatım, mini sınav, alıştırma. Haftada 3, 5 ya da 8 saatlik plan." }),
      el("li", { text: "İlerlemen, notların ve projelerin yalnız senin hesabında durur." })
    ]);
  }

  function dersVerisi() {
    var L = window.PP_LESSONS && window.PP_LESSONS.ccna && window.PP_LESSONS.ccna[1];
    return L && Array.isArray(L.quiz) && L.quiz.length ? L : null;
  }

  /* Hesapsız deneme: tamamen bellekte; sunucu çağrısı, çerez ya da depolama yok. */
  function denemeAc(wrap, form) {
    var L = dersVerisi();
    var kart = el("section", { class: "ppa-card ppg-demo", "aria-labelledby": "ppg-bsl" });
    var bsl = el("h2", { id: "ppg-bsl", tabindex: "-1", text: "Deneme dersi: Ağ nedir? Cihazlar ve kablolar" });
    kart.appendChild(bsl);
    function geri() { kart.remove(); form.hidden = false; var b = form.querySelector("button,input"); if (b) b.focus(); }
    function kayitaGit() {
      geri();
      var btns = form.querySelectorAll("button.ppa-link");
      for (var i = 0; i < btns.length; i++) if (/kayıt ol/i.test(btns[i].textContent)) { btns[i].click(); break; }
    }
    var altSatir = el("div", { style: "display:grid;gap:8px" }, [
      el("button", { class: "ppa-btn", type: "button", text: "Hesap oluştur", onclick: kayitaGit }),
      el("button", { class: "ppa-link", type: "button", text: "Giriş ekranına dön", onclick: geri })
    ]);
    if (!L) {
      kart.appendChild(el("p", { text: "Deneme dersi şu an yüklenemedi. Hesap oluşturup tüm derslere ulaşabilirsin." }));
      kart.appendChild(altSatir);
    } else {
      kart.appendChild(el("p", { text: "Bu deneme yalnız bu sayfada çalışır: hiçbir şey kaydedilmez, internete gönderilmez." }));
      kart.appendChild(el("p", { text: L.hook || "" }));
      var kavramlar = (L.warmup && L.warmup.concepts) || [];
      kavramlar.slice(0, 3).forEach(function (c) {
        kart.appendChild(el("div", { class: "ppg-kv" }, [el("b", { text: c.term + (c.tr ? " · " + c.tr : "") }), el("span", { text: c.summary + (c.example ? " Örnek: " + c.example : "") })]));
      });
      var alan = el("div", { style: "display:grid;gap:8px" });
      kart.appendChild(alan);
      var i = 0, dogru = 0;
      var soru = function () {
        alan.textContent = "";
        if (i >= L.quiz.length) {
          alan.appendChild(el("div", { class: "ppg-fb", role: "status", text: "Mini sınav bitti: " + dogru + " / " + L.quiz.length + " doğru. Devamı, tüm dersler, planın ve ilerlemen için hesap oluştur." }));
          alan.appendChild(altSatir);
          return;
        }
        var q = L.quiz[i], cevaplandi = false;
        alan.appendChild(el("div", { style: "font-weight:700", text: "Mini sınav " + (i + 1) + " / " + L.quiz.length + ": " + q.q }));
        var fb = el("div", { role: "status" });
        var secenekler = q.options.map(function (o) {
          var b = el("button", { class: "ppg-opt", type: "button", text: o, onclick: function () {
            if (cevaplandi) return;
            cevaplandi = true;
            var ok = o === q.answer;
            if (ok) dogru++;
            b.className = "ppg-opt " + (ok ? "iyi" : "kotu");
            secenekler.forEach(function (x) { if (x.textContent === q.answer) x.className = "ppg-opt iyi"; x.disabled = true; });
            fb.className = "ppg-fb";
            fb.textContent = (ok ? "Doğru. " : "Doğrusu: " + q.answer + ". ") + (q.why || "");
            var sonraki = el("button", { class: "ppa-btn", type: "button", text: i + 1 < L.quiz.length ? "Sonraki soru" : "Sonucu gör", onclick: function () { i++; soru(); var h = alan.firstChild; if (h) { h.setAttribute("tabindex", "-1"); h.focus(); } } });
            alan.appendChild(sonraki);
            sonraki.focus();
          } });
          return b;
        });
        secenekler.forEach(function (b) { alan.appendChild(b); });
        alan.appendChild(fb);
      };
      soru();
      kart.appendChild(el("button", { class: "ppa-link", type: "button", text: "Giriş ekranına dön", onclick: geri }));
    }
    form.hidden = true;
    wrap.appendChild(kart);
    bsl.focus();
  }

  function kartiTamamla(wrap) {
    var form = wrap.querySelector("form.ppa-card:not([data-ppg])");
    if (!form) return;
    form.setAttribute("data-ppg", "1");
    var bsl = (form.querySelector("h1") || {}).textContent || "";
    var kayit = /Hesap oluştur/.test(bsl), giris = /giriş/i.test(bsl), yeni = /Yeni şifre/.test(bsl);
    sifreEki(form, kayit || yeni);
    if (kayit || giris) {
      var lead = form.querySelector("p");
      if (lead) lead.parentNode.insertBefore(degerOnerisi(lead), lead.nextSibling);
      var gz = el("details", { class: "ppg-gz" }, [el("summary", { text: "Gizlilik: neyi saklıyoruz?" }), el("p", { text: NOT_GIZLILIK })]);
      var sonLink = form.querySelectorAll("button.ppa-link");
      var yer = sonLink.length ? sonLink[sonLink.length - 1] : null;
      var deneme = el("button", { class: "ppa-link", type: "button", text: "Hesapsız bir ders dene", onclick: function () { denemeAc(wrap, form); } });
      if (yer) { yer.parentNode.insertBefore(deneme, yer.nextSibling); deneme.parentNode.insertBefore(gz, deneme.nextSibling); }
      else { form.appendChild(deneme); form.appendChild(gz); }
    }
  }

  function tara() {
    var w = document.querySelector(".ppa-wrap");
    if (!w) return;
    root.classList.add("ppg-kart");
    var k = kabuk();
    if (k) k.setAttribute("inert", "");
    kartiTamamla(w);
  }
  function izle() {
    if (!window.MutationObserver) return;
    new MutationObserver(tara).observe(document.body, { childList: true, subtree: true });
    tara();
  }
  if (document.body) izle(); else document.addEventListener("DOMContentLoaded", izle);
})();

"use strict";
/* ALAN: Ayarlar > Güven merkezi, çevrimdışı (PWA) mod (PP.cevrimdisi).
   NE YAPAR: Varsayılan kapalı service worker kabuğunu açar/kapatır; kapatınca önbelleği siler.
   SORUN OLURSA: Bayrak localStorage pp_pwa (ya da ?pwa=1); yalnız https ve localhost'ta çalışır; sw.js ve manifest göreli adreslenir. Arayüz js/atolye/guven-ui.js. Önbellek URL listesini tests/faz9_cevrimdisi.js denetler.
   YENİ ÖZELLİK: Önbelleğe yeni dosya eklenecekse sw.js listesi güncellenir; tests/faz9_cevrimdisi.js çalıştırılır. */
/* ---- PWA / çevrimdışı kabuk (Faz 9) — varsayılan KAPALI ----
   Açmak: Ayarlar > Güven merkezi > "Çevrimdışı mod" ya da adres sonuna ?pwa=1. Kapatmak service worker'ı kaldırır ve kabuk önbelleğini siler.
   Yalnız https ve localhost'ta çalışır (tarayıcı kuralı). GitHub Pages alt yolu korunur: sw.js ve manifest göreli adreslenir. */
(function (g) {
  var PP = g.PP = g.PP || {}, BAYRAK = "pp_pwa";

  function depo() { try { return g.localStorage; } catch (e) { return null; } }
  function acik() { var d = depo(); try { return !!d && d.getItem(BAYRAK) === "1"; } catch (e) { return false; } }
  function destek() { return !!(g.navigator && g.navigator.serviceWorker) && (g.isSecureContext === true); }

  function manifestEkle() {
    if (g.document.querySelector("link[rel=manifest]")) return;
    var l = g.document.createElement("link"); l.rel = "manifest"; l.href = "manifest.webmanifest"; g.document.head.appendChild(l);
  }
  function guncellemeBildir(reg) {
    if (!reg || !reg.waiting) return;
    PP.cevrimdisi.bekleyenSurum = true;
    try { g.dispatchEvent(new Event("pp-yeni-surum")); } catch (e) { /* eski tarayıcı */ }
  }
  function kaydet() {
    if (!destek()) return Promise.resolve(null);
    manifestEkle();
    return g.navigator.serviceWorker.register("sw.js").then(function (reg) {
      guncellemeBildir(reg);
      reg.addEventListener("updatefound", function () {
        var w = reg.installing;
        if (w) w.addEventListener("statechange", function () { if (w.state === "installed" && g.navigator.serviceWorker.controller) guncellemeBildir(reg); });
      });
      return reg;
    }, function () { return null; });
  }
  function ac() { var d = depo(); if (d) d.setItem(BAYRAK, "1"); return kaydet(); }
  function kapat() {
    var d = depo(); if (d) d.removeItem(BAYRAK);
    if (!destek()) return Promise.resolve({ ok: true, kaldirilan: 0 });
    return g.navigator.serviceWorker.getRegistrations().then(function (rs) {
      return Promise.all(rs.map(function (r) { return r.unregister(); }));
    }).then(function () {
      return g.caches ? g.caches.keys().then(function (ks) { var s = ks.filter(function (k) { return k.indexOf("pp-kabuk-") === 0; }); return Promise.all(s.map(function (k) { return g.caches.delete(k); })).then(function () { return { ok: true, kaldirilan: s.length }; }); }) : { ok: true, kaldirilan: 0 };
    });
  }
  /* Yeni sürümü uygula: bekleyen işçi devralır, sayfa yenilenir (kullanıcı eylemiyle) */
  function guncelle() {
    return g.navigator.serviceWorker.getRegistration().then(function (r) {
      if (!r || !r.waiting) return false;
      g.navigator.serviceWorker.addEventListener("controllerchange", function () { g.location.reload(); }, { once: true });
      r.waiting.postMessage({ tip: "guncelle" });
      return true;
    });
  }
  function durum() {
    if (!destek()) return Promise.resolve({ destek: false, acik: acik(), kontrol: false, surum: null });
    return g.navigator.serviceWorker.getRegistration().then(function (r) {
      return { destek: true, acik: acik(), kontrol: !!(r && g.navigator.serviceWorker.controller), bekleyen: !!(r && r.waiting) };
    });
  }

  PP.cevrimdisi = { acik: acik, destek: destek, ac: ac, kapat: kapat, guncelle: guncelle, durum: durum, bekleyenSurum: false };
  try {
    if (/[?&]pwa=1\b/.test(g.location.search)) { var d0 = depo(); if (d0) d0.setItem(BAYRAK, "1"); }
    if (acik()) kaydet();
  } catch (e) { /* kayıt başarısız: uygulama normal çalışır */ }
})(typeof window !== "undefined" ? window : globalThis);

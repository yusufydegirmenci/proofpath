/* Proofpath service worker (Faz 9) — YALNIZ uygulama kabuğu ve statik içerik önbelleği.
   - Kullanıcı verisi (Supabase API, oturum, ya_* yerel veri) burada ÖNBELLEKLENMEZ.
   - Strateji: ağ önce, önbellek yedek (çevrimiçi kullanıcı hep güncel dosyayı alır; çevrimdışıyken son görülen sürüm açılır).
   - Kapsam: sw.js'nin bulunduğu klasör (GitHub Pages alt yolu korunur; mutlak "/" yolu kullanılmaz).
   - Yeni sürüm kendiliğinden devralmaz: istemci "guncelle" iletisi gönderirse skipWaiting yapılır (yarım kalan işi bölmemek için). */
var SURUM = "2026-10-12-1";
var KABUK = "pp-kabuk-" + SURUM;
var SERBEST_DIS = /^https:\/\/(cdn\.jsdelivr\.net|fonts\.googleapis\.com|fonts\.gstatic\.com)\//;

function ayikla(html, taban) {
  var liste = [], re = /(?:src|href)=["']([^"']+)["']/g, m;
  while ((m = re.exec(html))) {
    var u = m[1];
    if (/^(data:|#|mailto:|javascript:)/.test(u)) continue;
    var tam;
    try { tam = new URL(u, taban).href; } catch (e) { continue; }
    var ayni = tam.indexOf(new URL(taban).origin) === 0;
    if (ayni || SERBEST_DIS.test(tam)) liste.push(tam);
  }
  return liste.filter(function (x, i) { return liste.indexOf(x) === i; });
}

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(KABUK).then(function (c) {
      var kok = new URL("./", self.location).href, idx = new URL("index.html", self.location).href;
      return fetch(idx, { cache: "reload" }).then(function (r) {
        if (!r.ok) throw new Error("index.html alınamadı");
        return r.clone().text().then(function (html) {
          var liste = ayikla(html, idx).concat([kok, idx, new URL("manifest.webmanifest", self.location).href, new URL("ikon.svg", self.location).href]);
          liste = liste.filter(function (x, i) { return liste.indexOf(x) === i; });
          /* Tek tek: bir dosya alınamazsa kurulum yarım kalmaz, eksik dosya çevrimdışı sayfada eksik olur */
          return Promise.all(liste.map(function (u) {
            return fetch(u, { cache: "reload", mode: SERBEST_DIS.test(u) ? "cors" : "same-origin" }).then(function (x) { if (x.ok) return c.put(u, x); }).catch(function () {});
          }));
        });
      });
    })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (ks) {
      return Promise.all(ks.filter(function (k) { return k.indexOf("pp-kabuk-") === 0 && k !== KABUK; }).map(function (k) { return caches.delete(k); }));
    })
  );
});

self.addEventListener("message", function (e) {
  if (e.data && e.data.tip === "guncelle") self.skipWaiting();
  if (e.data && e.data.tip === "surum" && e.source) e.source.postMessage({ tip: "surum", surum: SURUM });
});

self.addEventListener("fetch", function (e) {
  var r = e.request;
  if (r.method !== "GET") return;
  var u = new URL(r.url);
  var ayni = u.origin === self.location.origin;
  if (!ayni && !SERBEST_DIS.test(r.url)) return;   /* Supabase API ve diğer her şey: tarayıcıya bırak, önbellekleme */
  e.respondWith(
    fetch(r).then(function (x) {
      if (x && x.ok) { var kopya = x.clone(); caches.open(KABUK).then(function (c) { c.put(r, kopya); }); }
      return x;
    }).catch(function () {
      return caches.match(r, { ignoreSearch: false }).then(function (m) {
        if (m) return m;
        if (r.mode === "navigate") return caches.match(new URL("index.html", self.location).href);
        return new Response("", { status: 504, statusText: "Çevrimdışı ve önbellekte yok" });
      });
    })
  );
});

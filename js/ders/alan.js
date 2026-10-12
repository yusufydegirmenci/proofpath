"use strict";
/* ---- PP.alan: ortak "uygulama alanı" (her derste kod yaz → canlı sonuç gör) — Faz 10 tur 2 ----
   Türler: sql (SQLite/WASM, sql.js), python (Pyodide), js (izole işçi), sim (kod çalışmaz; yalnız kural kontrolü).
   Etiket dürüsttür: çalışan = "gerçek çalışır", sim = "simülasyon"; çalıştırma kullanılamıyorsa bunu açıkça söyler.
   Güvenlik/sınırlar:
   - Kod yalnız bu tarayıcıda çalışır (Web Worker); sunucuya gitmez. Çalıştırma başladığında işçide ağ API'leri kaldırılır (en iyi çaba).
   - Dış kütüphane: sürümü sabit, jsDelivr; yükleyici betiği SHA-384 ile doğrulanmadan çalıştırılmaz. Doğrulanamazsa/ulaşılamazsa dürüst hata.
     SINIR: Pyodide'ın kendi çekirdek dosyaları (asm.js/wasm/stdlib) sürüm sabit ama bu modülde ayrıca hash'lenmez (yalnız yükleyici + sql.js tam doğrulanır).
   - Zaman sınırı (varsayılan 5 sn): aşılırsa işçi sonlandırılır (sonsuz döngü kesilir). Çıktı/satır/kod uzunluğu sınırlıdır; SQLite sayfa sayısı sınırlıdır.
     Tarayıcıda sert bellek sınırı konulamaz (Python için yok); bu bir sınırlamadır.
   - Cevap anahtarı: kontrol fonksiyonu, öğrencinin sonucunu veriden hesaplanan beklenenle karşılaştırır; sabit cevap metni tutulmaz.
     Değişmiş (varyant) veriyle ikinci kez çalıştırılır: sabit değer yazan ("SELECT 2") çözüm geçmez. */
(function (g) {
  var PP = g.PP = g.PP || {};

  var KAYNAK = {
    sql: {
      ad: "sql.js 1.10.3 (SQLite/WASM)",
      js: { url: "https://cdn.jsdelivr.net/npm/sql.js@1.10.3/dist/sql-wasm.js", sri: "sha384-8D3Rsfo535FqoC1pHCCQMrNf75UgzyoG/HQm9zOzITRrz3QKzecc2E7JXKGCXoWu" },
      wasm: { url: "https://cdn.jsdelivr.net/npm/sql.js@1.10.3/dist/sql-wasm.wasm", sri: "sha384-kSm0AH9ho89napVfNFf/kCRTH6xBoCS3qf/ATGJeYFQFKiegBMLhQ3aUIZBlYLpa" }
    },
    python: {
      ad: "Pyodide 0.26.4 (Python/WASM)",
      js: { url: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js", sri: "sha384-i3R37b3tF+HWudsUf1VSEOY2YxwSNMqY8DQa9Z0O3xh+NkJ9o+yjcGyIi5huj+nB" },
      taban: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/"
    }
  };
  var TURLER = ["sql", "python", "js", "sim"];
  var ETIKET = {
    sql: "gerçek çalışır · SQLite (sql.js 1.10.3, WASM) bu tarayıcıda",
    python: "gerçek çalışır · Python (Pyodide 0.26.4, WASM) bu tarayıcıda",
    js: "gerçek çalışır · JavaScript (izole işçi) bu tarayıcıda",
    sim: "simülasyon · kod çalıştırılmaz; yalnız kural tabanlı kontrol"
  };
  var SINIR = { kodUzunluk: 20000, satir: 200, cikti: 20000, zamanMs: 5000, yuklemeMs: 120000, sayfa: 2000 };

  /* ---------- İşçi gövdesi (Blob olarak çalışır; kendi kendine yeten olmalı) ---------- */
  function iscaGovdesi() {
    var hazir = {};
    function hata(neden, mesaj) { var e = new Error(mesaj); e.neden = neden; return e; }
    function b64(buf) { var s = "", b = new Uint8Array(buf); for (var i = 0; i < b.length; i++) s += String.fromCharCode(b[i]); return btoa(s); }
    function getir(d) {
      return fetch(d.url, { mode: "cors", credentials: "omit" }).then(function (r) {
        if (!r.ok) throw hata("ag", "HTTP " + r.status + " (" + d.url + ")");
        return r.arrayBuffer();
      }, function () { throw hata("ag", "Ağ hatası: " + d.url + " alınamadı"); }).then(function (buf) {
        if (!self.crypto || !self.crypto.subtle) throw hata("sri", "Bütünlük doğrulaması (SubtleCrypto) bu bağlamda yok; güvenli olmayan yükleme yapılmadı.");
        return self.crypto.subtle.digest("SHA-384", buf).then(function (dg) {
          if ("sha384-" + b64(dg) !== d.sri) throw hata("sri", "Bütünlük (SRI) doğrulaması başarısız: " + d.url + "; çalıştırılmadı.");
          return buf;
        });
      });
    }
    /* Ağ ve kalıcı depo API'lerini kaldır (en iyi çaba): öğrenci kodu kendi verisini dışarı yollayamasın */
    function kilitle() {
      var adlar = ["fetch", "XMLHttpRequest", "WebSocket", "EventSource", "importScripts", "Worker", "SharedWorker", "indexedDB", "caches", "BroadcastChannel", "WebTransport", "Request"], p = self, n = 0;
      while (p && n++ < 8) { adlar.forEach(function (a) { try { delete p[a]; } catch (e) { /* yoksay */ } try { Object.defineProperty(p, a, { value: undefined, configurable: true, writable: true }); } catch (e2) { /* yoksay */ } }); p = Object.getPrototypeOf(p); }
    }
    function sutunTipi(satirlar, i) {
      var tip = "TEXT";
      for (var k = 0; k < satirlar.length; k++) { var v = satirlar[k][i]; if (v === null || v === undefined) continue; if (typeof v === "number") tip = Math.floor(v) === v ? "INTEGER" : "REAL"; else tip = "TEXT"; break; }
      return tip;
    }
    function sqlHazirla(m) {
      if (hazir.sql) return hazir.sql;
      var k = m.kaynak.sql;
      hazir.sql = Promise.all([getir(k.js), getir(k.wasm)]).then(function (a) {
        var init = new Function(new TextDecoder().decode(a[0]) + "\n;return typeof initSqlJs!=='undefined'?initSqlJs:null;")();
        if (!init) throw hata("ag", "sql.js yükleyicisi beklenen biçimde değil");
        return init({ wasmBinary: a[1] });
      }).catch(function (e) { hazir.sql = null; throw e.neden ? e : hata("ag", "sql.js başlatılamadı: " + e.message); });
      return hazir.sql;
    }
    function pyHazirla(m) {
      if (hazir.py) return hazir.py;
      var k = m.kaynak.python;
      hazir.py = getir(k.js).then(function (buf) {
        (0, eval)(new TextDecoder().decode(buf));
        if (typeof self.loadPyodide !== "function") throw hata("ag", "Pyodide yükleyicisi beklenen biçimde değil");
        return self.loadPyodide({ indexURL: k.taban });
      }).catch(function (e) { hazir.py = null; throw e.neden ? e : hata("ag", "Pyodide başlatılamadı: " + (e && e.message)); });
      return hazir.py;
    }
    function kisalt(s, n) { s = String(s); return s.length > n ? s.slice(0, n) + "…[kısaltıldı]" : s; }

    function sqlCalistir(SQL, m) {
      var db = new SQL.Database(), v = m.veri;
      try {
        db.run("PRAGMA max_page_count=" + m.sinir.sayfa);
        db.run("CREATE TABLE siparis (" + v.sutunlar.map(function (c, i) { return c + " " + sutunTipi(v.satirlar, i); }).join(", ") + ")");
        var st = db.prepare("INSERT INTO siparis VALUES (" + v.sutunlar.map(function () { return "?"; }).join(",") + ")");
        v.satirlar.forEach(function (r) { st.run(r); });
        st.free();
        Object.keys(v.ek || {}).forEach(function (ad) {
          var t = v.ek[ad];
          db.run("CREATE TABLE " + ad + " (" + t.sutunlar.map(function (c, i) { return c + " " + sutunTipi(t.satirlar, i); }).join(", ") + ")");
          var s2 = db.prepare("INSERT INTO " + ad + " VALUES (" + t.sutunlar.map(function () { return "?"; }).join(",") + ")");
          t.satirlar.forEach(function (r) { s2.run(r); });
          s2.free();
        });
        var rs = db.exec(m.kod), son = rs.length ? rs[rs.length - 1] : null;
        if (!son) return { sutunlar: [], satirlar: [], kesildi: false, mesaj: "Sorgu çalıştı ama sonuç satırı döndürmedi." };
        return { sutunlar: son.columns, satirlar: son.values.slice(0, m.sinir.satir), kesildi: son.values.length > m.sinir.satir };
      } finally { db.close(); }
    }
    function pyCalistir(py, m) {
      var cikti = [], v = m.veri, ns = py.toPy({});
      py.setStdout({ batched: function (s) { cikti.push(s); } });
      py.setStderr({ batched: function (s) { cikti.push(s); } });
      try {
        var satirlar = v.satirlar.map(function (r) { var o = {}; v.sutunlar.forEach(function (c, i) { o[c] = r[i]; }); return o; });
        ns.set("siparisler", py.toPy(satirlar)); ns.set("sutunlar", py.toPy(v.sutunlar));
        var tablolar = {};
        Object.keys(v.ek || {}).forEach(function (ad) { var t = v.ek[ad]; tablolar[ad] = t.satirlar.map(function (r) { var o = {}; t.sutunlar.forEach(function (c, i) { o[c] = r[i]; }); return o; }); });
        ns.set("tablolar", py.toPy(tablolar));
        try { py.runPython(m.kod, { globals: ns }); }
        catch (e) { var t = String(e && e.message || e).trim().split("\n"); throw hata("kod", t.slice(-4).join("\n")); }
        var deger = null, tanimli = false;
        try { var js = py.runPython("import json\njson.dumps(sonuc, default=str)", { globals: ns }); deger = JSON.parse(js); tanimli = true; } catch (e2) { tanimli = false; }
        return { deger: deger, sonucTanimli: tanimli, cikti: kisalt(cikti.join("\n"), m.sinir.cikti) };
      } finally { try { ns.destroy(); } catch (e3) { /* yoksay */ } }
    }
    function jsCalistir(m) {
      var cikti = [], kon = { log: function () { cikti.push(Array.prototype.map.call(arguments, function (a) { try { return typeof a === "string" ? a : JSON.stringify(a); } catch (e) { return String(a); } }).join(" ")); } };
      var f, deger;
      try { f = new Function("veri", "console", '"use strict";\n' + m.kod); } catch (e) { throw hata("kod", "Sözdizimi hatası: " + e.message); }
      try { deger = f(m.veri, kon); } catch (e2) { throw hata("kod", String(e2 && e2.message || e2)); }
      var js; try { js = JSON.stringify(deger === undefined ? null : deger); JSON.parse(js); } catch (e3) { throw hata("kod", "Dönüş değeri JSON'a çevrilemedi"); }
      return { deger: JSON.parse(js), sonucTanimli: deger !== undefined, cikti: kisalt(cikti.join("\n"), m.sinir.cikti) };
    }

    self.onmessage = function (e) {
      var m = e.data;
      var once = m.tur === "sql" ? sqlHazirla(m) : m.tur === "python" ? pyHazirla(m) : Promise.resolve(null);
      once.then(function (rt) {
        self.postMessage({ id: m.id, asama: "calisiyor" });
        kilitle();
        var r = m.tur === "sql" ? sqlCalistir(rt, m) : m.tur === "python" ? pyCalistir(rt, m) : jsCalistir(m);
        r.id = m.id; r.ok = true; self.postMessage(r);
      }).catch(function (err) {
        var msj = String(err && err.message || err);
        self.postMessage({ id: m.id, ok: false, neden: err && err.neden || "kod", mesaj: kisalt(msj, 2000) });
      });
    };
  }

  /* ---------- Ana taraf: işçi yönetimi ---------- */
  var iscilar = {}, sira = { sql: Promise.resolve(), python: Promise.resolve(), js: Promise.resolve() }, sayac = 0, blobUrl = null;

  function iscaUret() {
    if (typeof g.Worker === "undefined" || typeof g.Blob === "undefined" || !g.URL || !g.URL.createObjectURL) return null;
    try {
      if (!blobUrl) blobUrl = g.URL.createObjectURL(new g.Blob(["(" + iscaGovdesi.toString() + ")();"], { type: "text/javascript" }));
      return new g.Worker(blobUrl);
    } catch (e) { return null; }
  }
  function cevrimdisi() { return typeof g.navigator !== "undefined" && g.navigator.onLine === false; }

  function veriHazirla(v) {
    var o = { sutunlar: v.sutunlar.slice(), satirlar: v.satirlar.map(function (r) { return r.map(function (x) { return x === "" ? null : x; }); }) };
    if (v.ek && typeof v.ek === "object") { o.ek = {}; Object.keys(v.ek).forEach(function (ad) { var t = v.ek[ad]; if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(ad)) o.ek[ad] = { sutunlar: t.sutunlar.slice(), satirlar: t.satirlar.map(function (r) { return r.map(function (x) { return x === "" ? null : x; }); }) }; }); }
    return o;
  }

  /* Tek çalıştırma. Döner: Promise<{ok, calisti, ...}>; ok=false & calisti=false → çalıştırma ortamı yok/yüklenemedi (öğrenci hatası değil) */
  function calistirTek(tur, kod, veri, opts) {
    opts = opts || {};
    var zaman = opts.zamanMs || SINIR.zamanMs, yukleme = opts.yuklemeMs || SINIR.yuklemeMs;
    return new Promise(function (coz) {
      if (TURLER.indexOf(tur) < 0 || tur === "sim") return coz({ ok: false, calisti: false, neden: "tur", mesaj: "Bu tür çalıştırılamaz: " + tur });
      if (typeof kod !== "string" || !kod.trim()) return coz({ ok: false, calisti: true, neden: "bos", mesaj: "Kod boş." });
      if (kod.length > SINIR.kodUzunluk) return coz({ ok: false, calisti: true, neden: "uzun", mesaj: "Kod en fazla " + SINIR.kodUzunluk + " karakter olabilir." });
      var w = iscilar[tur], taze = false;
      if (!w) {
        if (cevrimdisi() && tur !== "js") return coz({ ok: false, calisti: false, neden: "cevrimdisi", mesaj: "Çevrimdışısın: çalıştırma için kütüphane (" + KAYNAK[tur].ad + ") ilk kez indirilmeli. Bağlanınca tekrar dene; şimdilik simülasyon laboratuvarı kullanılabilir." });
        w = iscaUret();
        if (!w) return coz({ ok: false, calisti: false, neden: "isci-yok", mesaj: "Bu tarayıcı/bağlamda izole çalıştırma (Web Worker) kullanılamıyor; gerçek çalıştırma yok." });
        iscilar[tur] = w; taze = true;
      }
      var id = ++sayac, bitti = false, sayici = null, asama = "yukleniyor";
      function bitir(r) {
        if (bitti) return; bitti = true; clearTimeout(sayici); w.onmessage = null; w.onerror = null;
        if (r.sonlandir) { try { w.terminate(); } catch (e) { /* yoksay */ } if (iscilar[tur] === w) delete iscilar[tur]; }
        coz(r);
      }
      if (opts.durum) try { opts.durum(taze && tur !== "js" ? "yukleniyor" : "calisiyor"); } catch (e1) { /* yoksay */ }
      sayici = setTimeout(function () { bitir({ ok: false, calisti: false, neden: "yukleme-zaman", sonlandir: true, mesaj: KAYNAK[tur] ? KAYNAK[tur].ad + " zamanında yüklenemedi (ağ yavaş ya da engelli)." : "Zamanında başlamadı." }); }, tur === "js" ? zaman : yukleme);
      w.onmessage = function (e) {
        var m = e.data || {};
        if (m.id !== id) return;
        if (m.asama === "calisiyor") {
          asama = "calisiyor"; clearTimeout(sayici);
          if (opts.durum) try { opts.durum("calisiyor"); } catch (e2) { /* yoksay */ }
          sayici = setTimeout(function () { bitir({ ok: false, calisti: true, neden: "zaman", sonlandir: true, mesaj: "Zaman sınırı (" + Math.round(zaman / 1000) + " sn) aşıldı; çalıştırma kesildi (sonsuz döngü olabilir)." }); }, zaman);
          return;
        }
        if (m.ok) { m.calisti = true; m.sure = 0; return bitir(m); }
        var yuk = m.neden === "ag" || m.neden === "sri";
        bitir({ ok: false, calisti: !yuk, neden: m.neden, mesaj: yuk ? "Gerçek çalıştırma kullanılamıyor: " + m.mesaj : m.mesaj, sonlandir: yuk });
      };
      w.onerror = function (ev) { bitir({ ok: false, calisti: false, neden: "isci", sonlandir: true, mesaj: "Çalıştırma ortamı hatası: " + (ev && ev.message || "bilinmiyor") }); };
      w.postMessage({ id: id, tur: tur, kod: kod, veri: veriHazirla(veri), kaynak: KAYNAK, sinir: SINIR });
    });
  }
  /* Aynı türden çalıştırmalar sıraya girer (tek işçi) */
  function calistir(tur, kod, veri, opts) {
    var s = sira[tur] || Promise.resolve();
    var p = s.then(function () { return calistirTek(tur, kod, veri, opts); });
    sira[tur] = p.then(function () {}, function () {});
    return p;
  }

  /* ---------- Tanım ve değerlendirme ---------- */
  var kayit = {};
  function tanimla(d) {
    if (!d || typeof d !== "object") return { ok: false, neden: "tanim-yok" };
    if (typeof d.id !== "string" || !d.id) return { ok: false, neden: "id-yok" };
    if (typeof d.ders !== "string" || !d.ders) return { ok: false, neden: "ders-yok" };
    if (TURLER.indexOf(d.tur) < 0) return { ok: false, neden: "tur-gecersiz" };
    if (typeof d.baslangic !== "string") return { ok: false, neden: "baslangic-yok" };
    if (typeof d.kontrol !== "function") return { ok: false, neden: "kontrol-yok" };
    if (d.tur !== "sim" && !(d.veri && Array.isArray(d.veri.sutunlar) && Array.isArray(d.veri.satirlar))) return { ok: false, neden: "veri-yok" };
    if (d.varyant != null && typeof d.varyant !== "function") return { ok: false, neden: "varyant-gecersiz" };
    var x = { id: d.id, ders: d.ders, tur: d.tur, baslik: d.baslik || "", gorev: d.gorev || "", baslangic: d.baslangic, kontrol: d.kontrol, varyant: d.varyant || null,
      ipucu: Array.isArray(d.ipucu) ? d.ipucu.slice() : [], veri: d.veri || null, etiket: ETIKET[d.tur] };
    kayit[x.id] = x;
    return { ok: true, alan: x };
  }
  function bul(id) { return kayit[id] || null; }
  function kontrolSar(d, sonuc, veri) {
    var r; try { r = d.kontrol(sonuc, veri); } catch (e) { return { dogru: false, mesaj: "Kontrol çalışmadı: " + (e && e.message) }; }
    return { dogru: !!(r && r.dogru), mesaj: String(r && r.mesaj || "") };
  }
  /* Çalıştır + kontrol et. Gerçek veriyle çalışır; varyant tanımlıysa değişmiş veriyle ikinci kez çalıştırıp aynı mantığı arar. */
  function degerlendir(d, girdi, opts) {
    if (!d || typeof d.kontrol !== "function") return Promise.resolve({ ok: false, neden: "tanim-yok", mesaj: "Alan tanımı yok." });
    if (d.tur === "sim") {
      var rs = kontrolSar(d, { tur: "sim", girdi: String(girdi == null ? "" : girdi) }, null);
      return Promise.resolve({ ok: true, calisti: false, dogru: rs.dogru, mesaj: rs.mesaj, sonuc: null });
    }
    return calistir(d.tur, girdi, d.veri, opts).then(function (r) {
      if (!r.ok) return { ok: false, calisti: r.calisti, neden: r.neden, mesaj: r.mesaj, dogru: false };
      var sonuc = Object.assign({ tur: d.tur }, r), k = kontrolSar(d, sonuc, d.veri);
      if (!k.dogru || !d.varyant) return { ok: true, calisti: true, dogru: k.dogru, mesaj: k.mesaj, sonuc: sonuc };
      var v2; try { v2 = d.varyant(d.veri); } catch (e) { v2 = null; }
      if (!v2) return { ok: true, calisti: true, dogru: k.dogru, mesaj: k.mesaj, sonuc: sonuc };
      return calistir(d.tur, girdi, v2, opts).then(function (r2) {
        if (!r2.ok) return { ok: true, calisti: true, dogru: false, mesaj: "Sonuç doğru ama kodun başka veriyle de çalışması gerekiyor: " + r2.mesaj, sonuc: sonuc };
        var k2 = kontrolSar(d, Object.assign({ tur: d.tur }, r2), v2);
        return { ok: true, calisti: true, dogru: k2.dogru, mesaj: k2.dogru ? k.mesaj : "Sonuç bu veride doğru görünüyor ama değiştirilmiş veride tutmadı (sabit değer yazmış olabilirsin): " + k2.mesaj, sonuc: sonuc };
      });
    });
  }
  /* Kanıt: kontrol doğruysa `lab` kanıtı (istemci doğrulaması; bağımsızlık kanıtı değil). İpuçlu çözüm ayrı kimlik alır. */
  function kanitKaydet(d, ipucu) {
    var O = PP.ogr;
    if (!O || !O.depo || !d) return { ok: false, neden: "depo-yok" };
    return O.depo.kanitEkle({ id: "alan-" + d.id + (ipucu ? "-ipucu" : ""), tur: "lab", hedef: "lab:" + d.ders + ":" + d.id, dogrulama: "istemci" });
  }
  function sifirlaMetni(d) { return d && typeof d.baslangic === "string" ? d.baslangic : ""; }

  function durumOzet() {
    return { cevrimici: !cevrimdisi(), isci: typeof g.Worker !== "undefined", kaynaklar: { sql: KAYNAK.sql.ad, python: KAYNAK.python.ad }, sinir: SINIR };
  }
  /* Testler/Çıkış: çalışan işçileri sonlandır */
  function kapat() { Object.keys(iscilar).forEach(function (t) { try { iscilar[t].terminate(); } catch (e) { /* yoksay */ } delete iscilar[t]; }); }

  /* ---------- Arayüz ---------- */
  function tabloEl(s) {
    var hh = g.h;
    if (!s.sutunlar.length) return hh("div", { class: "small mute" }, s.mesaj || "Sonuç yok.");
    return hh("div", { style: "overflow:auto;max-width:100%" }, hh("table", { class: "small mono", "data-alan-tablo": "1", style: "border-collapse:collapse" },
      hh("tr", null, s.sutunlar.map(function (c) { return hh("th", { style: "padding:2px 6px;text-align:left;border-bottom:1px solid var(--line)" }, c); })),
      s.satirlar.map(function (r) { return hh("tr", null, r.map(function (x) { return hh("td", { style: "padding:2px 6px" }, x === null ? "NULL" : String(x)); })); })),
      s.kesildi ? hh("div", { class: "small mute" }, "İlk " + SINIR.satir + " satır gösterildi.") : null);
  }
  /* kur(d, opts): çalışan bir alan paneli döndürür; opts.onDogru(ipucuKullanildi) kanıt sonrası çağrılır; opts.yenile() yeniden çizim */
  function kur(d, opts) {
    var hh = g.h; opts = opts || {};
    var ta = hh("textarea", { class: "mono", rows: d.tur === "sim" ? 4 : 6, spellcheck: "false", autocapitalize: "off", autocomplete: "off", "aria-label": "Kod: " + (d.baslik || d.id), "data-alan-kod": d.id, style: "width:100%;box-sizing:border-box;font-size:13px;tab-size:2" });
    ta.value = d.baslangic;
    var cikis = hh("div", { role: "status", "aria-live": "polite", "data-alan-sonuc": d.id });
    var ipEl = hh("div", { class: "lbox warn", "data-alan-ipucu": d.id, style: "display:none" });
    var etiket = hh("div", { class: "lab-et", "data-alan-etiket": d.id }, d.etiket);
    var ipAcik = false, mesgul = false, btn;
    function yaz() { cikis.textContent = ""; Array.prototype.slice.call(arguments).forEach(function (x) { if (x) cikis.appendChild(typeof x === "string" ? g.document.createTextNode(x) : x); }); }
    function calistirTikla() {
      if (mesgul) return; mesgul = true; btn.disabled = true; btn.textContent = "Çalışıyor…";
      yaz(hh("div", { class: "small", "data-alan-durum": "calisiyor" }, d.tur === "sim" ? "Kontrol ediliyor…" : "Çalıştırılıyor…"));
      degerlendir(d, ta.value, { durum: function (a) { if (a === "yukleniyor") yaz(hh("div", { class: "small", "data-alan-durum": "yukleniyor" }, "Kütüphane yükleniyor (" + (d.tur === "python" ? "~10 MB, ilk seferde birkaç saniye" : "~0,7 MB") + ")… Kod yalnız bu tarayıcıda çalışır.")); } }).then(function (r) {
        mesgul = false; btn.disabled = false; btn.textContent = d.tur === "sim" ? "Kontrol et" : "Çalıştır";
        if (r.ok === false && r.calisti === true) {
          etiket.textContent = d.etiket;
          return yaz(hh("pre", { class: "mono small", style: "white-space:pre-wrap;overflow-wrap:anywhere;margin:4px 0", "data-alan-durum": "hata" }, r.mesaj), hh("div", { class: "small warn", "data-alan-kontrol": "yanlis" }, "✗ Kod hata verdi ya da kesildi; düzeltip tekrar çalıştır."));
        }
        if (!r.ok) {
          etiket.textContent = "simülasyon · gerçek çalıştırma şu an kullanılamıyor";
          return yaz(hh("div", { class: "lbox warn", "data-alan-durum": "kullanilamiyor" }, r.mesaj || "Çalıştırma kullanılamıyor."), hh("div", { class: "small mute" }, "Sayfadaki simülasyon laboratuvarı bundan etkilenmez."));
        }
        etiket.textContent = d.etiket;
        var s = r.sonuc, gor = null;
        if (s && d.tur === "sql") gor = tabloEl(s);
        else if (s) gor = hh("pre", { class: "mono small", style: "white-space:pre-wrap;overflow-wrap:anywhere;margin:4px 0" }, (s.cikti ? s.cikti + "\n" : "") + (s.sonucTanimli ? "sonuc = " + JSON.stringify(s.deger) : ""));
        var dogru = r.dogru, kanit = null;
        if (dogru) { var kr = kanitKaydet(d, ipAcik); kanit = kr && kr.ok ? "Kanıt kaydedildi (istemci doğrulaması)." : "Kanıt kaydedilemedi."; if (opts.onDogru) try { opts.onDogru(ipAcik); } catch (e) { /* yoksay */ } }
        yaz(gor, hh("div", { class: "small " + (dogru ? "ok" : "warn"), "data-alan-kontrol": dogru ? "dogru" : "yanlis" }, (dogru ? "✓ Doğru. " : "✗ Henüz değil. ") + r.mesaj), kanit ? hh("div", { class: "small mute" }, kanit) : null);
      });
    }
    btn = hh("button", { class: "btn", type: "button", "data-alan": "calistir", onclick: calistirTikla }, d.tur === "sim" ? "Kontrol et" : "Çalıştır");
    var ipBtn = hh("button", { class: "btn ghost", type: "button", "data-alan": "ipucu", onclick: function () { ipAcik = true; ipEl.style.display = ""; ipEl.textContent = ""; ipEl.appendChild(hh("div", { class: "label" }, "İpuçları")); ipEl.appendChild(hh("ul", { class: "lr-ul" }, d.ipucu.map(function (x) { return hh("li", null, x); }))); } }, "İpucu");
    var sfBtn = hh("button", { class: "btn ghost", type: "button", "data-alan": "sifirla", onclick: function () { ta.value = sifirlaMetni(d); ipAcik = false; ipEl.style.display = "none"; yaz(); } }, "Sıfırla");
    return hh("div", { class: "lbox", "data-alan": d.id, "data-alan-tur": d.tur }, hh("div", { class: "label" }, "Kodla dene · " + (d.baslik || d.id)), etiket,
      d.gorev ? hh("p", { class: "small" }, d.gorev) : null, ta,
      hh("div", { class: "row", style: "gap:6px;flex-wrap:wrap;margin:6px 0" }, btn, d.ipucu.length ? ipBtn : null, sfBtn), ipEl, cikis,
      hh("div", { class: "small mute" }, d.tur === "sim" ? "Bu alan kodu çalıştırmaz; yalnız yazdığını kurallarla denetler." : "Kod yalnız bu tarayıcıda çalışır, sunucuya gönderilmez. Zaman sınırı " + Math.round(SINIR.zamanMs / 1000) + " sn; sonsuz döngü kesilir."));
  }

  PP.alan = { TURLER: TURLER, ETIKET: ETIKET, SINIR: SINIR, KAYNAK: KAYNAK, tanimla: tanimla, bul: bul, calistir: calistir, degerlendir: degerlendir, kanitKaydet: kanitKaydet, sifirla: sifirlaMetni, durum: durumOzet, kapat: kapat, kur: kur };
})(typeof window !== "undefined" ? window : globalThis);

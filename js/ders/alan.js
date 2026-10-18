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
  var SINIR = { kodUzunluk: 20000, satir: 200, cikti: 20000, zamanMs: 5000, yuklemeMs: 120000, sayfa: 2000,
    adim: 300, deger: 80, izleMs: 3000 };   /* adım izi (E2): en fazla adım, değer metni uzunluğu, Python içi süre sınırı (işçi zaman sınırından kısa: kesilirse o ana kadarki iz gösterilir) */

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
    function pyVeriKoy(py, ns, v) {
      var satirlar = v.satirlar.map(function (r) { var o = {}; v.sutunlar.forEach(function (c, i) { o[c] = r[i]; }); return o; });
      ns.set("siparisler", py.toPy(satirlar)); ns.set("sutunlar", py.toPy(v.sutunlar));
      var tablolar = {};
      Object.keys(v.ek || {}).forEach(function (ad) { var t = v.ek[ad]; tablolar[ad] = t.satirlar.map(function (r) { var o = {}; t.sutunlar.forEach(function (c, i) { o[c] = r[i]; }); return o; }); });
      ns.set("tablolar", py.toPy(tablolar));
    }
    /* Adım izi (E2): kullanıcı kodu aynı işçide, aynı kilitli ortamda (kilitle() çağrıldı) ve aynı ad alanı kurulumuyla çalışır; yalnız sys.settrace ile satır/dönüş olayları toplanır.
       Yardımcı Python kodu sabittir (öğrenci kodu '<izle>' dosyası olarak derlenir; yalnız o dosyanın çerçeveleri izlenir). Sınırlar: adım sayısı, süre, değer uzunluğu, çıktı boyu.
       Adım alanları: s satır no · y çağrı yığını (ad listesi) · v değişkenler {ad: kısa metin} · o o ana dek yazılan çıktı uzunluğu · r dönüş adımı (1) · g dönüş değeri.
       Hata yayılırken Python'un ürettiği sahte "return" olayı atlanır (istisna kümesi); kodun kendi yakaladığı hata normal akıştır (sonraki 'line' olayı kümeden çıkarır).
       Sınır aşımı BaseException ile durdurur (öğrencinin "except Exception" bloğu yutmasın); "except:" ile yutulsa bile işçi zaman sınırı en son çare olarak işçiyi sonlandırır. */
    var IZLE_PY = [
      "import sys, time, json, types, reprlib",
      "class Sinir(BaseException): pass",
      "R = reprlib.Repr()",
      "R.maxlevel = 2",
      "R.maxlist = R.maxtuple = R.maxset = R.maxfrozenset = R.maxdeque = R.maxarray = 6",
      "R.maxdict = 5",
      "R.maxstring = R.maxother = R.maxlong = 40",
      "class Cikti:",
      "    def __init__(self): self.p = []; self.n = 0",
      "    def write(self, s):",
      "        s = str(s); k = 4000 - self.n",
      "        if k > 0: self.p.append(s[:k]); self.n += min(len(s), k)",
      "        return len(s)",
      "    def flush(self): pass",
      "def goster(v, n):",
      "    if isinstance(v, types.FunctionType): return 'fonksiyon ' + v.__name__",
      "    if isinstance(v, type): return 'sınıf ' + v.__name__",
      "    try: s = R.repr(v)",
      "    except Exception: s = '<gösterilemedi>'",
      "    return s if len(s) <= n else s[:n - 1] + '…'",
      "def izle(kod, ns, azami, sure_ms, n):",
      "    try: kodobj = compile(kod, '<izle>', 'exec')",
      "    except SyntaxError as e:",
      "        return json.dumps({'adimlar': [], 'hata': {'tur': 'SyntaxError', 'ileti': str(e.msg), 'satir': e.lineno}, 'sinir': None, 'cikti': ''}, ensure_ascii=False)",
      "    haric = set(ns.keys()); adimlar = []; cikti = Cikti(); bitis = time.monotonic() + sure_ms / 1000.0; istisna = set()",
      "    def yigin(f):",
      "        a = []",
      "        while f is not None:",
      "            if f.f_code.co_filename == '<izle>': a.append('ana program' if f.f_code.co_name == '<module>' else f.f_code.co_name[:40])",
      "            f = f.f_back",
      "        a.reverse(); return a[-20:]",
      "    def iz(frame, olay, arg):",
      "        if frame.f_code.co_filename != '<izle>': return None",
      "        if olay == 'exception': istisna.add(id(frame)); return iz",
      "        if olay == 'line': istisna.discard(id(frame))",
      "        if olay == 'return' and id(frame) in istisna: return iz",
      "        if olay == 'line' or olay == 'return':",
      "            if len(adimlar) >= azami: raise Sinir('adim')",
      "            if time.monotonic() > bitis: raise Sinir('sure')",
      "            ana = frame.f_code.co_name == '<module>'; v = {}",
      "            for k, x in list(frame.f_locals.items()):",
      "                if k.startswith('__') or isinstance(x, types.ModuleType) or (ana and k in haric): continue",
      "                if len(v) >= 30: break",
      "                v[k] = goster(x, n)",
      "            a = {'s': frame.f_lineno, 'y': yigin(frame), 'v': v, 'o': cikti.n}",
      "            if olay == 'return':",
      "                a['r'] = 1",
      "                if not ana: a['g'] = goster(arg, n)",
      "            adimlar.append(a)",
      "        return iz",
      "    hata = None; sinir = None; eski = sys.stdout; sys.stdout = cikti",
      "    sys.settrace(iz)",
      "    try: exec(kodobj, ns)",
      "    except Sinir as e: sinir = e.args[0]",
      "    except SystemExit: pass",
      "    except Exception as e:",
      "        sys.settrace(None); satir = None; tb = e.__traceback__",
      "        while tb is not None:",
      "            if tb.tb_frame.f_code.co_filename == '<izle>': satir = tb.tb_lineno",
      "            tb = tb.tb_next",
      "        hata = {'tur': type(e).__name__, 'ileti': str(e)[:200], 'satir': satir}",
      "    finally:",
      "        sys.settrace(None); sys.stdout = eski",
      "    return json.dumps({'adimlar': adimlar, 'hata': hata, 'sinir': sinir, 'cikti': ''.join(cikti.p)}, ensure_ascii=False)",
      "izle"
    ].join("\n");
    function pyIzle(py, m) {
      var ns = py.toPy({}), s = m.sinir;
      try {
        pyVeriKoy(py, ns, m.veri);
        if (!hazir.izle) hazir.izle = py.runPython(IZLE_PY, { globals: py.toPy({}) });
        var r = JSON.parse(hazir.izle(m.kod, ns, s.adim, s.izleMs, s.deger));
        return { izle: true, adimlar: r.adimlar, hata: r.hata, kesildi: r.sinir, cikti: r.cikti };
      } finally { try { ns.destroy(); } catch (e3) { /* yoksay */ } }
    }
    function pyCalistir(py, m) {
      var cikti = [], v = m.veri, ns = py.toPy({});
      py.setStdout({ batched: function (s) { cikti.push(s); } });
      py.setStderr({ batched: function (s) { cikti.push(s); } });
      try {
        pyVeriKoy(py, ns, v);
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
        var r = m.tur === "sql" ? sqlCalistir(rt, m) : m.tur === "python" ? (m.izle ? pyIzle(rt, m) : pyCalistir(rt, m)) : jsCalistir(m);
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
      w.postMessage({ id: id, tur: tur, kod: kod, veri: veriHazirla(veri), kaynak: KAYNAK, sinir: SINIR, izle: opts.izle === true && tur === "python" });
    });
  }
  /* Aynı türden çalıştırmalar sıraya girer (tek işçi) */
  function calistir(tur, kod, veri, opts) {
    var s = sira[tur] || Promise.resolve();
    var p = s.then(function () { return calistirTek(tur, kod, veri, opts); });
    sira[tur] = p.then(function () {}, function () {});
    return p;
  }
  /* Adım izi (E2): yalnız Python. Kontrol/kanıt yok; iz öğrenme içindir. Döner: calistir ile aynı biçim + {adimlar, hata, kesildi, cikti} */
  function izle(d, kod, opts) {
    if (!d || d.tur !== "python") return Promise.resolve({ ok: false, calisti: false, neden: "tur", mesaj: "Adım izi yalnız Python alanlarında var." });
    return calistir("python", kod, d.veri, Object.assign({}, opts, { izle: true }));
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
      ipucu: Array.isArray(d.ipucu) ? d.ipucu.slice() : [], adimla: typeof d.adimla === "string" ? d.adimla : "", veri: d.veri || null, etiket: ETIKET[d.tur],
      cozum: typeof d.cozum === "string" ? d.cozum : (g.PP_VA && g.PP_VA.alanCozum && typeof g.PP_VA.alanCozum[d.id] === "string" ? g.PP_VA.alanCozum[d.id] : "") };
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
    if (PP.cubuk && !PP.cubuk.kanitSayilir("alan:" + d.id)) return { ok: false, neden: "cozum-goruldu" };
    return O.depo.kanitEkle({ id: "alan-" + d.id + (ipucu ? "-ipucu" : ""), tur: "lab", hedef: "lab:" + d.ders + ":" + d.id, dogrulama: "istemci" });
  }
  function sifirlaMetni(d) { return d && typeof d.baslangic === "string" ? d.baslangic : ""; }

  function durumOzet() {
    return { cevrimici: !cevrimdisi(), isci: typeof g.Worker !== "undefined", kaynaklar: { sql: KAYNAK.sql.ad, python: KAYNAK.python.ad }, sinir: SINIR };
  }
  /* Testler/Çıkış: çalışan işçileri sonlandır */
  function kapat() { Object.keys(iscilar).forEach(function (t) { try { iscilar[t].terminate(); } catch (e) { /* yoksay */ } delete iscilar[t]; }); }

  /* Aynı dersin SQL kod alanı ile Parsons "Sıra alıştırması" çözüm durumu TEK yerden hesaplanır; iki panel de aynı satırı gösterir.
     çözüldü = istemci kanıtı var (çözüm görülmemiş); çözüm görüldü = kanıt sayılmaz; yoksa henüz çözülmedi. */
  function kanitVar(kimlik) {
    try { return PP.ogr.depo.oku().kanitlar.some(function (k) { return k.id === kimlik || k.id === kimlik + "-ipucu"; }); } catch (e) { return false; }
  }
  function durumKelimesi(cid, kanitId) {
    if (PP.cubuk && PP.cubuk.durum(cid).cozum) return "çözüm görüldü (kanıt sayılmaz)";
    return kanitVar(kanitId) ? "çözüldü ✓" : "henüz çözülmedi";
  }
  function siraDurumu(ders, sqlId) {
    var sira = PP.parsons ? PP.parsons.dersIcin(ders) : [];
    return { sql: durumKelimesi("alan:" + sqlId, "alan-" + sqlId), sira: sira.map(function (p) { return { id: p.id, durum: durumKelimesi("parsons:" + p.id, "parsons-" + p.id) }; }) };
  }
  function siraDurumMetni(ders, sqlId) {
    var x = siraDurumu(ders, sqlId);
    return "Bu dersin SQL çalışması · Kod alanı: " + x.sql + " · Sıra alıştırması: " + (x.sira.length ? x.sira.map(function (p) { return p.durum; }).join(", ") : "yok");
  }
  function siraDurumSatiri(ders, sqlId) {
    var hh = g.h, el = hh("div", { class: "small", role: "status", "data-alan-sira-durum": ders });
    function guncelle() { el.textContent = siraDurumMetni(ders, sqlId); }
    guncelle();
    if (g.document && g.document.addEventListener) g.document.addEventListener("pp-cubuk", guncelle);
    return el;
  }

  /* ---------- Kod editörü (CodeMirror 6; E1) ----------
     Yerel paket (vendor/), SHA-384 SRI, yalnız ilk kod alanı kurulunca yüklenir. Yüklenemezse/doğrulanamazsa düz textarea kalır.
     Uyum katmanı: textarea DOM'da kalır (data-alan-kod); .value okuma/yazma editöre yönlenir, böylece eski kod ve testler değişmez.
     shortcut: yükleme başarısızsa tekrar denenmez (sayfa yenilenene kadar), sonraki alanlar da textarea kalır. */
  var CM = { dosya: "vendor/codemirror-6.43.14.js", sri: "sha384-W7yte/Ea6VGWkmH2ilUOm4ZrSPaFgHyPIxrQTgcEudlXjCrcPDDC0UhrcgAd/6U1", sozu: null, zamanMs: 15000 };
  function cmYukle() {
    if (g.PPCM) return Promise.resolve(g.PPCM);
    if (CM.sozu) return CM.sozu;
    CM.sozu = new Promise(function (coz) {
      var s, bitti = false, bitir = function (v) { if (bitti) return; bitti = true; coz(v); };
      try {
        s = g.document.createElement("script");
        s.src = new URL(CM.dosya, g.document.baseURI).href; s.integrity = CM.sri; s.crossOrigin = "anonymous";
        s.onload = function () { bitir(g.PPCM || null); }; s.onerror = function () { bitir(null); };
        g.document.head.appendChild(s); g.setTimeout(function () { bitir(g.PPCM || null); }, CM.zamanMs);
      } catch (e) { bitir(null); }
    });
    return CM.sozu;
  }
  var DIL = { sql: "sql", python: "python", js: "js" };
  function editorEkle(ta, kap, d, calistir) {
    if (!DIL[d.tur]) return;
    cmYukle().then(function (M) {
      if (!M || ta.__cm) return;
      try {
        var ev = g.document.createElement("div"), ilk = ta.value;
        kap.appendChild(ev);
        var ed = M.kur(ev, { dil: DIL[d.tur], deger: ilk, etiket: "Kod: " + (d.baslik || d.id), calistir: calistir });
        Object.defineProperty(ta, "value", { configurable: true, get: function () { return ed.oku(); }, set: function (v) { ed.yaz(v); } });
        ta.style.display = "none"; ta.setAttribute("aria-hidden", "true"); ta.tabIndex = -1; ta.__cm = ed; kap.setAttribute("data-alan-editor", d.id);
      } catch (e) { /* editör kurulamadı: textarea çalışmaya devam eder */ }
    });
  }
  /* ---------- Arayüz ---------- */
  function tabloEl(s) {
    var hh = g.h;
    if (!s.sutunlar.length) return hh("div", { class: "small mute" }, s.mesaj || "Sonuç yok.");
    return hh("div", { style: "overflow:auto;max-width:100%" }, hh("table", { class: "small mono", "data-alan-tablo": "1", style: "border-collapse:collapse" },
      hh("tr", null, s.sutunlar.map(function (c) { return hh("th", { style: "padding:2px 6px;text-align:left;border-bottom:1px solid var(--line)" }, c); })),
      s.satirlar.map(function (r) { return hh("tr", null, r.map(function (x) { return hh("td", { style: "padding:2px 6px" }, x === null ? "NULL" : String(x)); })); })),
      s.kesildi ? hh("div", { class: "small mute" }, "İlk " + SINIR.satir + " satır gösterildi.") : null);
  }
  function yokMesaji(r) {
    return r.neden === "ag" ? "Gerçek çalıştırma şu an kullanılamıyor: kütüphane indirilemedi. İnternet bağlantını kontrol edip tekrar dene."
      : r.neden === "yukleme-zaman" ? "Gerçek çalıştırma şu an kullanılamıyor: kütüphane zamanında yüklenemedi. Bağlantını kontrol edip tekrar dene."
      : r.neden === "sri" ? "Gerçek çalıştırma şu an kullanılamıyor: kütüphane doğrulanamadı, güvenlik için çalıştırılmadı. Biraz sonra tekrar dene."
      : (r.mesaj || "Çalıştırma kullanılamıyor.");
  }

  /* ---------- Adım izi arayüzü (E2) ----------
     Satır vurgusu: paket (vendor/) bu fazın dosya listesinde olmadığı için editöre dekorasyon API'si eklenmedi; CodeMirror'ın çizdiği .cm-line öğesine sınıf verilir
     (yalnız kodun tüm satırları çizilmişse; kısa alıştırma kodlarında hep böyle). Textarea yedeğinde satır seçilir. Panel her adımda satırı kendisi de yazar (vurgu olmasa da anlaşılır).
     shortcut: uzun kodda (sanal kaydırma) editör vurgusu atlanır, panelin "satır" kutusu kalır; dekorasyon için paket yeniden derlenmeli. */
  var HATA_AD = { SyntaxError: "Sözdizimi hatası", NameError: "Tanımsız ad", TypeError: "Tür hatası", ValueError: "Değer hatası", IndexError: "Dizin hatası", KeyError: "Anahtar hatası", ZeroDivisionError: "Sıfıra bölme", AttributeError: "Özellik hatası", RecursionError: "Çok derin özyineleme" };
  function hataMetni(h) { return (h.satir ? "Satır " + h.satir + ": " : "") + (HATA_AD[h.tur] || "Hata") + " (" + h.tur + ")" + (h.ileti ? " — " + h.ileti : ""); }
  function izVurgula(ta, kap, kod, n, onceki) {
    if (onceki) onceki.classList.remove("pp-izle-satir");
    var ls = kod.split("\n");
    if (ta.__cm) {
      var L = kap.querySelectorAll(".cm-content > .cm-line");
      if (L.length !== ls.length || !L[n - 1]) return null;
      var el = L[n - 1], sc = kap.querySelector(".cm-scroller");
      el.classList.add("pp-izle-satir");
      if (sc) { var rs = sc.getBoundingClientRect(), rl = el.getBoundingClientRect(); if (rl.top < rs.top) sc.scrollTop -= rs.top - rl.top; else if (rl.bottom > rs.bottom) sc.scrollTop += rl.bottom - rs.bottom; }
      return el;
    }
    var bas = 0; for (var i = 0; i < n - 1; i++) bas += ls[i].length + 1;
    try { ta.setSelectionRange(bas, bas + (ls[n - 1] || "").length); } catch (e) { /* yoksay */ }
    return null;
  }
  /* izPaneli: r = izle() sonucu (ok, adimlar dolu). kapat(odakDon) paneli kaldırır. */
  function izPaneli(r, ta, kap, kapat) {
    var hh = g.h, kod = ta.value, n = r.adimlar.length, i = 0, vur = null;
    var baslik = hh("strong", { role: "status", "aria-live": "polite", "data-izle": "baslik" });
    var satir = hh("div", { class: "mono small izle-satir", "data-izle": "satir" });
    var not = hh("div", { class: "small mute", "data-izle": "not" });
    var yigin = hh("div", { class: "small mute", "data-izle": "yigin" });
    var tablo = hh("div", { class: "izle-tablo", "data-izle": "degiskenler" });
    var cikti = hh("pre", { class: "mono small izle-cikti", "data-izle": "cikti" });
    var kay = hh("input", { type: "range", min: 1, max: n, value: 1, class: "izle-kay", "aria-label": "Adım seç", "data-izle": "kaydirici" });
    var geri = hh("button", { class: "btn ghost", type: "button", "data-izle": "geri", onclick: function () { git(i - 1); } }, "‹ Geri");
    var ileri = hh("button", { class: "btn", type: "button", "data-izle": "ileri", onclick: function () { git(i + 1); } }, "İleri ›");
    var kpt = hh("button", { class: "btn ghost", type: "button", "data-izle": "kapat", onclick: function () { kapat(true); } }, "Kapat (Esc)");
    var uyar = [];
    if (r.hata) uyar.push("Kod " + hataMetni(r.hata) + ". Adımlar hataya kadar gösteriliyor.");
    if (r.kesildi === "adim") uyar.push("İzleme en fazla " + SINIR.adim + " adımla sınırlı; ilk " + SINIR.adim + " adım gösteriliyor.");
    if (r.kesildi === "sure") uyar.push("Süre sınırı (" + Math.round(SINIR.izleMs / 1000) + " sn) aşıldı; o ana kadarki adımlar gösteriliyor (sonsuz döngü olabilir).");
    var el = hh("div", { class: "lbox izle-panel", role: "region", "aria-label": "Adım adım izleme", "data-alan-izle-panel": "1" },
      hh("div", { class: "izle-ust" }, baslik, kpt),
      uyar.length ? hh("div", { class: "small warn", "data-izle": "uyari" }, uyar.join(" ")) : null,
      hh("div", { class: "izle-kontrol" }, geri, ileri, kay),
      satir, not, yigin, tablo, cikti,
      hh("div", { class: "small mute" }, "● işaretli değişken bu adımda yeni ya da değişti. İpucu: ← → tuşları da adım atar."));
    function ciz() {
      var a = r.adimlar[i], onc = i > 0 ? r.adimlar[i - 1] : null, ayni = onc && onc.y.length === a.y.length && onc.y[onc.y.length - 1] === a.y[a.y.length - 1];
      var ad = a.y.length ? a.y[a.y.length - 1] : "ana program";
      baslik.textContent = "Adım " + (i + 1) + " / " + n + " · satır " + a.s;
      kay.value = String(i + 1); kay.setAttribute("aria-valuetext", baslik.textContent);
      satir.textContent = a.s + ": " + ((kod.split("\n")[a.s - 1] || "").replace(/\s+$/, "") || "(boş satır)");
      not.textContent = a.r ? (a.g !== undefined ? "Bu işlev biter; döndürdüğü değer: " + a.g : "Program biter; aşağıdakiler son değerlerdir.") : "Bu satır henüz çalışmadı; aşağıda satırdan ÖNCEKİ değerler var.";
      yigin.textContent = "Çağrı yığını: " + (a.y.length ? a.y.join(" › ") : "ana program") + " · gösterilen değişkenler: " + ad;
      var ks = Object.keys(a.v);
      tablo.textContent = "";
      if (!ks.length) tablo.appendChild(hh("div", { class: "small mute" }, "Henüz değişken yok."));
      else tablo.appendChild(hh("table", { class: "small mono", "data-izle-tablo": "1" },
        hh("tr", null, hh("th", null, "Değişken"), hh("th", null, "Değer")),
        ks.map(function (k) { var yeni = !ayni || onc.v[k] !== a.v[k]; return hh("tr", { "data-izle-degisken": k, class: yeni ? "izle-yeni" : null }, hh("td", null, (yeni ? "● " : "") + k), hh("td", null, a.v[k])); })));
      cikti.textContent = (r.cikti || "").slice(0, a.o); cikti.style.display = cikti.textContent ? "" : "none";
      vur = izVurgula(ta, kap, kod, a.s, vur);
    }
    function git(k) { i = Math.max(0, Math.min(n - 1, k)); ciz(); }
    kay.addEventListener("input", function () { git(parseInt(kay.value, 10) - 1); });
    el.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); kapat(true); }
      else if (e.target !== kay && e.key === "ArrowRight") { e.preventDefault(); git(i + 1); }
      else if (e.target !== kay && e.key === "ArrowLeft") { e.preventDefault(); git(i - 1); }
    });
    ciz();
    return { el: el, ileri: ileri, git: git, temizle: function () { if (vur) vur.classList.remove("pp-izle-satir"); vur = null; } };
  }

  /* kur(d, opts): çalışan bir alan paneli döndürür; opts.onDogru(ipucuKullanildi) kanıt sonrası çağrılır; opts.yenile() yeniden çizim */
  function kur(d, opts) {
    var hh = g.h; opts = opts || {};
    var ta = hh("textarea", { class: "mono", rows: d.tur === "sim" ? 4 : 6, spellcheck: "false", autocapitalize: "off", autocomplete: "off", "aria-label": "Kod: " + (d.baslik || d.id), "data-alan-kod": d.id, style: "width:100%;box-sizing:border-box;font-size:13px;tab-size:2" });
    ta.value = d.baslangic;
    var kap = hh("div", { style: "min-width:0" }, ta);
    var cikis = hh("div", { role: "status", "aria-live": "polite", "data-alan-sonuc": d.id });
    var etiket = hh("div", { class: "lab-et", "data-alan-etiket": d.id }, d.etiket);
    var cid = "alan:" + d.id, mesgul = false, btn, cubuk;
    var izKap = hh("div", { "data-alan-izle": d.id }), izBtn = null, izAcik = null, izMesgul = false;
    function izKapat(odakDon) { if (izAcik) { izAcik.temizle(); izAcik = null; } izKap.textContent = ""; if (odakDon && izBtn) izBtn.focus(); }
    function izMesaj(metin, sinif, ek) { izKap.textContent = ""; izKap.appendChild(hh("div", { class: "lbox " + (sinif || ""), role: "status", "data-izle-durum": ek || "mesaj" }, metin)); }
    function izleTikla() {
      if (izMesgul) return; izMesgul = true; izBtn.disabled = true; izBtn.textContent = "İzleniyor…"; izKapat(false);
      izMesaj("Kod adım adım çalıştırılıyor…", "", "calisiyor");
      izle(d, ta.value, { durum: function (a) { if (a === "yukleniyor") izMesaj("Python kütüphanesi yükleniyor (~10 MB, ilk seferde birkaç saniye)… Kod yalnız bu tarayıcıda çalışır.", "", "yukleniyor"); } }).then(function (r) {
        izMesgul = false; izBtn.disabled = false; izBtn.textContent = "Adım adım göster";
        if (r.ok === false && !r.calisti) { izMesaj(yokMesaji(r).replace("Gerçek çalıştırma", "Adım adım gösterim") + " Düğmeye tekrar basarak yeniden dene.", "warn", "kullanilamiyor"); return izBtn.focus(); }
        if (r.ok === false) { izMesaj(r.neden === "zaman" ? "Zaman sınırı aşıldı; kod sonsuz döngüde olabilir. Düzeltip tekrar dene." : r.mesaj, "warn", "hata"); return izBtn.focus(); }
        if (!r.adimlar.length) { izMesaj(r.hata ? "Kodda " + hataMetni(r.hata) + ". Önce düzelt, sonra tekrar dene." : "İzlenecek satır yok (kod boş ya da yalnız yorum).", "warn", "hata"); return izBtn.focus(); }
        izKap.textContent = ""; izAcik = izPaneli(r, ta, kap, izKapat); izKap.appendChild(izAcik.el); izAcik.ileri.focus();
      }).catch(function () { izMesgul = false; izBtn.disabled = false; izBtn.textContent = "Adım adım göster"; izMesaj("Adım izi beklenmedik biçimde başarısız oldu. Sayfayı yenileyip tekrar dene.", "warn", "hata"); });
    }
    if (d.tur === "python") izBtn = hh("button", { class: "btn ghost", type: "button", "data-alan": "adimla", onclick: izleTikla }, "Adım adım göster");
    kap.addEventListener("input", function () { if (izAcik) izKapat(false); });   /* kod değişti: eski iz artık bu kodla uyuşmaz */
    function yaz() { cikis.textContent = ""; Array.prototype.slice.call(arguments).forEach(function (x) { if (x) cikis.appendChild(typeof x === "string" ? g.document.createTextNode(x) : x); }); }
    function calistirTikla() {
      if (mesgul) return; mesgul = true; btn.disabled = true; btn.textContent = "Çalışıyor…";
      yaz(hh("div", { class: "small", "data-alan-durum": "calisiyor" }, d.tur === "sim" ? "Kontrol ediliyor…" : "Çalıştırılıyor…"));
      degerlendir(d, ta.value, { durum: function (a) { if (a === "yukleniyor") yaz(hh("div", { class: "small", "data-alan-durum": "yukleniyor" }, "Kütüphane yükleniyor (" + (d.tur === "python" ? "~10 MB, ilk seferde birkaç saniye" : "~0,7 MB") + ")… Kod yalnız bu tarayıcıda çalışır.")); } }).then(function (r) {
        mesgul = false; btn.disabled = false; btn.textContent = d.tur === "sim" ? "Kontrol et" : "Çalıştır";
        if (r.ok === false && r.calisti === true) {
          etiket.textContent = d.etiket;
          PP.cubuk.yanlis(cid);
          return yaz(hh("pre", { class: "mono small", style: "white-space:pre-wrap;overflow-wrap:anywhere;margin:4px 0", "data-alan-durum": "hata" }, r.mesaj), hh("div", { class: "small warn", "data-alan-kontrol": "yanlis" }, "✗ Kod hata verdi ya da kesildi; düzeltip tekrar çalıştır."));
        }
        if (!r.ok) {
          etiket.textContent = "simülasyon · gerçek çalıştırma şu an kullanılamıyor";
          var kisa = yokMesaji(r);
          var tekrar = (r.neden === "ag" || r.neden === "sri" || r.neden === "cevrimdisi" || r.neden === "yukleme-zaman") ? hh("button", { class: "btn ghost", type: "button", "data-alan": "tekrar", onclick: calistirTikla }, "Tekrar dene") : null;
          return yaz(hh("div", { class: "lbox warn", "data-alan-durum": "kullanilamiyor" }, kisa), tekrar, hh("div", { class: "small mute" }, "Sayfadaki simülasyon laboratuvarı bundan etkilenmez."));
        }
        etiket.textContent = d.etiket;
        var s = r.sonuc, gor = null;
        if (s && d.tur === "sql") gor = tabloEl(s);
        else if (s) gor = hh("pre", { class: "mono small", style: "white-space:pre-wrap;overflow-wrap:anywhere;margin:4px 0" }, (s.cikti ? s.cikti + "\n" : "") + (s.sonucTanimli ? "sonuc = " + JSON.stringify(s.deger) : ""));
        var dogru = r.dogru, kanit = null, ipAcik = PP.cubuk.ipucuKullanildi(cid);
        if (!dogru) PP.cubuk.yanlis(cid);
        else if (!PP.cubuk.kanitSayilir(cid)) kanit = "Çözüm görüldüğü için kanıt kaydedilmedi.";
        else { var kr = kanitKaydet(d, ipAcik); kanit = kr && kr.ok ? "Kanıt kaydedildi (istemci doğrulaması)." : "Kanıt kaydedilemedi."; if (opts.onDogru) try { opts.onDogru(ipAcik); } catch (e) { /* yoksay */ } }
        yaz(gor, hh("div", { class: "small " + (dogru ? "ok" : "warn"), "data-alan-kontrol": dogru ? "dogru" : "yanlis" }, (dogru ? "✓ Doğru. " : "✗ Henüz değil. ") + r.mesaj), kanit ? hh("div", { class: "small mute" }, kanit) : null);
        PP.cubuk.degisti(cid);
      });
    }
    btn = hh("button", { class: "btn", type: "button", "data-alan": "calistir", onclick: calistirTikla }, d.tur === "sim" ? "Kontrol et" : "Çalıştır");
    var sfBtn = hh("button", { class: "btn ghost", type: "button", "data-alan": "sifirla", onclick: function () { ta.value = sifirlaMetni(d); cubuk.gizle(); yaz(); izKapat(false); } }, "Sıfırla");
    cubuk = PP.cubuk.kur({ id: cid, ipucu: d.ipucu, cozum: function () { return d.cozum; }, birincilEl: btn, sifirlaEl: sfBtn, ipucuAttr: { "data-alan-ipucu": d.id }, ipucuDugmeAttr: { "data-alan": "ipucu" } });
    ta.addEventListener("keydown", function (e) { if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); calistirTikla(); } });
    editorEkle(ta, kap, d, calistirTikla);
    var parsons = d.tur === "sql" && PP.parsons ? PP.parsons.panelDers(d.ders) : null;
    if (parsons) parsons = hh("div", { class: "lbox", "data-alan-sira": d.ders, style: "margin-top:10px" }, hh("div", { class: "label" }, "Sıra alıştırması"),
      hh("div", { class: "small mute" }, "Ayrı bir alıştırma: kod yazmazsın, karışık SQL satırlarını doğru sıraya dizersin. Yukarıdaki kod alanıyla aynı dersin parçasıdır; çözüm durumu ikisinde de aynı görünür."), siraDurumSatiri(d.ders, d.id), parsons);
    return hh("div", { class: "lbox", "data-alan": d.id, "data-alan-tur": d.tur }, hh("div", { class: "label" }, "Kodla dene · " + (d.baslik || d.id)), etiket,
      d.gorev ? hh("p", { class: "small" }, d.gorev) : null, kap,
      cubuk, izBtn ? hh("div", { class: "izle-satir-kap" }, izBtn, d.adimla ? hh("span", { class: "small", "data-alan-adimla": d.id }, "Öneri: " + d.adimla) : null) : null, izKap, cikis, parsons ? siraDurumSatiri(d.ders, d.id) : null,
      hh("div", { class: "small mute" }, d.tur === "sim" ? "Bu alan kodu çalıştırmaz; yalnız yazdığını kurallarla denetler." : "Kod yalnız bu tarayıcıda çalışır, sunucuya gönderilmez. Zaman sınırı " + Math.round(SINIR.zamanMs / 1000) + " sn; sonsuz döngü kesilir."), parsons);
  }

  PP.alan = { TURLER: TURLER, ETIKET: ETIKET, SINIR: SINIR, KAYNAK: KAYNAK, tanimla: tanimla, bul: bul, calistir: calistir, izle: izle, degerlendir: degerlendir, kanitKaydet: kanitKaydet, sifirla: sifirlaMetni, durum: durumOzet, kapat: kapat, siraDurumu: siraDurumu, siraDurumMetni: siraDurumMetni, kur: kur };
})(typeof window !== "undefined" ? window : globalThis);

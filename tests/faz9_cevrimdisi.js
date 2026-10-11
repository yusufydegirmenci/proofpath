// Faz 9 (2/2): supabase-shim.js senkron/çakışma/yalıtım (sahte supabase istemcisi) ve service worker/PWA (yerel http sunucu, alt yol /proofpath/).
// Gerçek Supabase'e bağlanılmaz. Hata → çıkış 1.
const path = require('path');
const fs = require('fs');
const http = require('http');
const { INIT, chromium } = require('./stub.js');
const ROOT = path.join(__dirname, '..');
let fails = 0;
const ok = (c, m) => { console.log((c ? 'OK    ' : 'HATA  ') + m); if (!c) fails++; };
const eq = (a, b, m) => { const s = JSON.stringify(a) === JSON.stringify(b); ok(s, m + (s ? '' : '  → beklenen ' + JSON.stringify(b) + ', gelen ' + JSON.stringify(a))); };
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.webmanifest': 'application/manifest+json', '.png': 'image/png' };

let swSurum = null;   // sunucu, sw.js içindeki SURUM değerini bununla değiştirir (güncelleme testi)
const sunucu = http.createServer((req, res) => {
  const u = decodeURIComponent(req.url.split('?')[0]);
  if (!u.startsWith('/proofpath/')) { res.writeHead(404); return res.end('yok'); }
  let rel = u.slice('/proofpath/'.length) || 'index.html';
  const f = path.join(ROOT, rel);
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end('yok'); }
  let body = fs.readFileSync(f);
  if (rel === 'sw.js' && swSurum) body = Buffer.from(body.toString('utf8').replace(/var SURUM = "[^"]+"/, 'var SURUM = "' + swSurum + '"'));
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
  res.end(body);
});

/* Sahte supabase-js: veriler sayfanın localStorage'ında (__fakedb) durur ki yenilemeden etkilenmesin; ağ anahtarı __fakenet='off' */
const SAHTE = `
(function () {
  function db() { try { return JSON.parse(localStorage.getItem('__fakedb') || '[]'); } catch (e) { return []; } }
  function kaydet(r) { localStorage.setItem('__fakedb', JSON.stringify(r)); }
  var sayac = 0;
  if (!localStorage.getItem('__fakedb')) kaydet(['uA', 'uB'].map(function (u) { return { path: 'data/users/' + u + '/pp/prefs/onb', coll: 'data/users/' + u + '/pp/prefs', doc_id: 'onb', owner: u, data: { done: true, goal: 'ccna' }, updated_at: '2026-10-01T00:00:00.000Z' }; }));
  function zaman() { sayac++; return new Date(Date.UTC(2026, 9, 12, 0, 0, 0) + (Date.now() % 1e7) + sayac).toISOString(); }
  function agKapali() { return localStorage.getItem('__fakenet') === 'off'; }
  function Q(tablo) {
    var q = { tablo: tablo, mod: 'select', f: [], donus: false, tek: false, aralik: null, yuk: null };
    var self = {
      select: function () { if (q.mod !== 'select') q.donus = true; return self; },
      eq: function (k, v) { q.f.push([k, v]); return self; },
      order: function () { return self; }, range: function (a, b) { q.aralik = [a, b]; return self; }, in: function () { return self; },
      maybeSingle: function () { q.tek = true; return self; },
      insert: function (y) { q.mod = 'insert'; q.yuk = y; return self; }, update: function (y) { q.mod = 'update'; q.yuk = y; return self; },
      upsert: function (y) { q.mod = 'upsert'; q.yuk = y; localStorage.setItem('__fakeupsert', String(+(localStorage.getItem('__fakeupsert') || 0) + 1)); return self; },
      delete: function () { q.mod = 'delete'; return self; },
      then: function (ok_, red_) { return Promise.resolve().then(function () { return calistir(q); }).then(ok_, red_); }
    };
    return self;
  }
  function eslesir(r, f) { return f.every(function (x) { return r[x[0]] === x[1]; }); }
  function calistir(q) {
    if (q.tablo === 'profiles') return { data: null };
    if (agKapali()) return { data: null, error: { message: 'TypeError: Failed to fetch', code: '' } };
    var sat = db(), red = localStorage.getItem('__fakered');
    if (q.mod !== 'select' && red && q.f.concat([['path', (q.yuk && q.yuk.path) || '']]).some(function (x) { return x[0] === 'path' && x[1].indexOf(red) === 0; })) return { data: null, error: { message: 'new row violates row-level security policy', code: '42501' } };
    if (q.mod === 'select') {
      var r = sat.filter(function (x) { return eslesir(x, q.f); });
      if (q.aralik) r = r.slice(q.aralik[0], q.aralik[1] + 1);
      if (q.tek) return { data: r[0] || null };
      return { data: JSON.parse(JSON.stringify(r)) };
    }
    if (q.mod === 'insert') {
      if (sat.some(function (x) { return x.path === q.yuk.path; })) return { data: null, error: { message: 'duplicate key', code: '23505' } };
      sat.push(JSON.parse(JSON.stringify(q.yuk))); kaydet(sat); return { data: q.donus ? [{ updated_at: q.yuk.updated_at }] : null };
    }
    if (q.mod === 'upsert') {
      var i = sat.findIndex(function (x) { return x.path === q.yuk.path; });
      if (i >= 0) sat[i] = JSON.parse(JSON.stringify(q.yuk)); else sat.push(JSON.parse(JSON.stringify(q.yuk)));
      kaydet(sat); return { data: null };
    }
    if (q.mod === 'update') {
      var hit = [];
      sat.forEach(function (x) { if (eslesir(x, q.f)) { Object.assign(x, JSON.parse(JSON.stringify(q.yuk))); hit.push({ updated_at: x.updated_at }); } });
      kaydet(sat); return { data: q.donus ? hit : null };
    }
    if (q.mod === 'delete') {
      var sil = sat.filter(function (x) { return eslesir(x, q.f); });
      kaydet(sat.filter(function (x) { return !eslesir(x, q.f); })); return { data: q.donus ? sil.map(function (x) { return { path: x.path }; }) : null };
    }
    return { data: null };
  }
  window.supabase = { createClient: function () {
    var uid = localStorage.getItem('__fakeuid') || 'uA';
    return {
      auth: {
        getSession: function () { return Promise.resolve({ data: { session: { user: { id: uid, email: uid + '@x.test', user_metadata: { name: uid } } } } }); },
        onAuthStateChange: function () {}, signOut: function () { localStorage.setItem('__fakesignout', '1'); return Promise.resolve({}); },
        signInWithPassword: function () { return Promise.resolve({}); }, updateUser: function () { return Promise.resolve({}); }
      },
      from: function (t) { return Q(t); }
    };
  } };
})();`;

(async () => {
  await new Promise(r => sunucu.listen(0, '127.0.0.1', r));
  const BASE = 'http://127.0.0.1:' + sunucu.address().port + '/proofpath/index.html';
  const b = await chromium.launch();

  /* ===== A) Shim + sahte supabase ===== */
  async function sayfaAc(ctx, hedef) {
    const p = await ctx.newPage();
    p.errs = []; p.on('pageerror', e => p.errs.push(e.message));
    await p.goto(hedef || BASE);
    await p.waitForTimeout(1800);
    return p;
  }
  async function baglamYap(onKur) {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: 'block' });
    await ctx.route('**/@supabase/**', r => r.fulfill({ status: 200, contentType: 'application/javascript', body: '' }));
    await ctx.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
    await ctx.addInitScript(SAHTE);
    if (onKur) await ctx.addInitScript(onKur);
    return ctx;
  }
  const dbSatir = (p, yol) => p.evaluate(y => { const s = JSON.parse(localStorage.getItem('__fakedb') || '[]').filter(x => x.path === y)[0]; return s ? { t: s.data.t, v: s.updated_at } : null; }, yol);
  const docSet = (p, yol, d) => p.evaluate(([y, d]) => window.claude.use('db').then(db => db.doc(y).set(d)).then(() => 'tamam', e => 'hata:' + (e.code || e.message)), [yol, d]);
  const docUpd = (p, yol, d) => p.evaluate(([y, d]) => window.claude.use('db').then(db => db.doc(y).update(d)).then(() => 'tamam', e => 'hata:' + (e.code || e.message)), [yol, d]);
  const docGet = (p, yol) => p.evaluate(y => window.claude.use('db').then(db => db.doc(y).get()).then(s => s.exists ? s.data() : null), yol);
  const motor = (p) => p.evaluate(() => { const m = window.__ppShim && window.__ppShim.motor(); return m ? { d: m.durum(), l: m.liste().map(k => [k.id, k.durum]) } : null; });
  const rozet = (p) => p.evaluate(() => { const e = document.getElementById('pp-sync-rozet'); return e ? e.textContent : null; });

  // A1) Bayrak kapalı (varsayılan): eski davranış, rozet/kuyruk yok
  {
    const ctx = await baglamYap();
    const p = await sayfaAc(ctx);
    ok(await p.evaluate(() => typeof window.claude === 'object' && !!window.__ppShim), 'A1: shim sahte supabase ile devrede');
    eq(await docSet(p, 'notes/n1', { t: 'x' }), 'tamam', 'A1: yazma başarılı');
    eq(await dbSatir(p, 'notes/n1').then(s => s && s.t), 'x', 'A1: satır sunucuya yazıldı');
    eq(await p.evaluate(() => localStorage.getItem('__fakeupsert')), '1', 'A1: eski yol (upsert) kullanıldı');
    eq([await rozet(p), await motor(p), await p.evaluate(() => Object.keys(localStorage).filter(k => /^pp_(kuyruk|onbellek)/.test(k)))], [null, null, []], 'A1: bayrak kapalıyken rozet, kuyruk ve çevrimdışı önbellek yok');
    eq(await p.evaluate(() => localStorage.getItem('pp_aktif_uid')), 'uA', 'A1: aktif kullanıcı kaydedildi (sahipsiz veri atandı)');
    ok(p.errs.length === 0, 'A1: sayfa hatası yok ' + p.errs.join('|'));
    await ctx.close();
  }

  // A2–A5) Bayrak açık
  {
    const ctx = await baglamYap('localStorage.setItem("pp_senkron","1")');
    let p = await sayfaAc(ctx);
    eq(await docSet(p, 'notes/n1', { t: 'bir' }), 'tamam', 'A2: çevrimiçi yeni belge yazıldı (taban sürümsüz insert)');
    const s1 = await dbSatir(p, 'notes/n1');
    eq(await docUpd(p, 'notes/n1', { t: 'iki' }), 'tamam', 'A2: güncelleme taban sürümüyle yazıldı');
    const s2 = await dbSatir(p, 'notes/n1');
    ok(s1 && s2 && s2.t === 'iki' && s2.v !== s1.v, 'A2: sunucu satırı güncellendi ve sürümü değişti');
    eq((await motor(p)).d.bekleyen, 0, 'A2: kuyruk boş');
    eq(await rozet(p), 'Senkronize', 'A2: rozet "Senkronize"');
    ok(await p.evaluate(() => Object.keys(localStorage).some(k => k === 'pp_onbellek:uA:notes')), 'A2: çevrimdışı görüntü (son bilinen sunucu verisi) saklandı');

    // A3) Çevrimdışı: yazma kuyruğa girer, hata atmaz, yerel görünür; yenilemede çevrimdışı açılır; dönünce gönderilir
    await p.evaluate(() => localStorage.setItem('__fakenet', 'off'));
    await p.evaluate(() => window.dispatchEvent(new Event('offline')));
    eq(await docSet(p, 'notes/n2', { t: 'cevrimdisi' }), 'tamam', 'A3: çevrimdışı yazma hata vermedi');
    await p.waitForTimeout(300);
    eq((await motor(p)).d.bekleyen, 1, 'A3: değişiklik kuyrukta bekliyor');
    ok(/Çevrimdışı · 1 bekliyor/.test(await rozet(p)), 'A3: rozet "Çevrimdışı · 1 bekliyor"');
    eq(await docGet(p, 'notes/n2'), { t: 'cevrimdisi' }, 'A3: yerel görünüm yeni değeri gösteriyor');
    eq(await dbSatir(p, 'notes/n2'), null, 'A3: sunucuya henüz gitmedi');
    await p.reload(); await p.waitForTimeout(1800);
    eq(await docGet(p, 'notes/n1'), { t: 'iki' }, 'A3: çevrimdışı yenilemede son bilinen veri okunuyor');
    eq((await motor(p)).d.bekleyen, 1, 'A3: kuyruk yenilemeden sonra da duruyor');
    await p.evaluate(() => { localStorage.removeItem('__fakenet'); window.dispatchEvent(new Event('online')); });
    await p.waitForTimeout(800);
    eq([(await motor(p)).d.bekleyen, (await dbSatir(p, 'notes/n2') || {}).t], [0, 'cevrimdisi'], 'A3: yeniden bağlanınca bir kez gönderildi');
    eq(await rozet(p), 'Senkronize', 'A3: rozet tekrar "Senkronize"');

    // A4) Çakışma: başka cihaz aynı belgeyi değiştirmiş → sessiz üzerine yazma YOK, Güven merkezinde seçilir
    await docSet(p, 'notes/n3', { t: 'ilk' });
    await p.evaluate(() => { const d = JSON.parse(localStorage.getItem('__fakedb')); const s = d.filter(x => x.path === 'notes/n3')[0]; s.data = { t: 'baska-cihaz' }; s.updated_at = '2030-01-01T00:00:00.000Z'; localStorage.setItem('__fakedb', JSON.stringify(d)); });
    eq(await docUpd(p, 'notes/n3', { t: 'benim' }), 'tamam', 'A4: çakışmalı yazma çağıran tarafa hata atmaz (iki sürüm saklanır)');
    await p.waitForTimeout(300);
    eq((await dbSatir(p, 'notes/n3')).t, 'baska-cihaz', 'A4: sunucudaki başka cihaz verisi EZİLMEDİ');
    eq((await motor(p)).l, [['n3', 'cakisma']], 'A4: kuyrukta çakışma kaydı');
    ok(/1 çakışma/.test(await rozet(p)), 'A4: rozet çakışmayı söylüyor');
    await p.evaluate(() => goTab('ayar')); await p.waitForTimeout(400);
    ok(await p.evaluate(() => !!document.querySelector('[data-kuyruk=cakisma]') && /ÇAKIŞMA/.test(document.querySelector('[data-kuyruk=cakisma]').textContent)), 'A4: Güven merkezinde çakışma ve seçenekler görünür');
    await p.evaluate(() => document.querySelector('[data-gvn=benim]').click()); await p.waitForTimeout(600);
    eq([(await dbSatir(p, 'notes/n3')).t, (await motor(p)).d.cakisma], ['benim', 0], 'A4: "Benimkini koru" seçilince yazıldı');
    // ikinci çakışma: "sunucudakini al"
    await docSet(p, 'notes/n4', { t: 'ilk' });
    await p.evaluate(() => { const d = JSON.parse(localStorage.getItem('__fakedb')); const s = d.filter(x => x.path === 'notes/n4')[0]; s.data = { t: 'sunucu-surumu' }; s.updated_at = '2031-01-01T00:00:00.000Z'; localStorage.setItem('__fakedb', JSON.stringify(d)); });
    await docUpd(p, 'notes/n4', { t: 'benim2' }); await p.waitForTimeout(300);
    await p.evaluate(() => { goTab('bugun'); goTab('ayar'); }); await p.waitForTimeout(300);
    await p.evaluate(() => document.querySelector('[data-gvn=sunucu]').click()); await p.waitForTimeout(400);
    eq([await docGet(p, 'notes/n4'), (await dbSatir(p, 'notes/n4')).t, (await motor(p)).d.cakisma], [{ t: 'sunucu-surumu' }, 'sunucu-surumu', 0], 'A4: "Sunucudakini al": yerel görünüm sunucu verisine döndü, benimki atıldı');

    // A5) Sunucu reddi: kuyruk kalmaz, yerel değişiklik geri alınır, çağırana hata gider
    await p.evaluate(() => localStorage.setItem('__fakered', 'locked/'));
    eq(await docSet(p, 'locked/x', { t: 'yasak' }), 'hata:sync-hata', 'A5: reddedilen yazma çağırana hata verir');
    eq([await docGet(p, 'locked/x'), (await motor(p)).d.hata, (await motor(p)).d.bekleyen], [null, 0, 0], 'A5: yerel değişiklik geri alındı, kuyrukta kalıntı yok');
    ok(p.errs.length === 0, 'A2-A5: sayfa hatası yok ' + p.errs.join('|'));
    await ctx.close();
  }

  // A6) Kullanıcı yalıtımı (aynı tarayıcıda hesap değişimi)
  {
    const ctx = await baglamYap('if(!localStorage.__seeded){localStorage.setItem("__seeded","1");localStorage.setItem("ya_pp_ogr","A-VERISI");localStorage.setItem("ya_lc","A-LC")}');
    let p = await sayfaAc(ctx);
    eq(await p.evaluate(() => [localStorage.getItem('ya_pp_ogr'), localStorage.getItem('pp_aktif_uid')]), ['A-VERISI', 'uA'], 'A6: A girişi: veri A\'ya atandı');
    await p.evaluate(() => localStorage.setItem('__fakeuid', 'uB'));
    await p.reload(); await p.waitForTimeout(2500);
    const b1 = await p.evaluate(() => ({ ogr: localStorage.getItem('ya_pp_ogr'), lc: localStorage.getItem('ya_lc'), aktif: localStorage.getItem('pp_aktif_uid'), stash: !!localStorage.getItem('pp_stash:uA') }));
    eq(b1, { ogr: null, lc: null, aktif: 'uB', stash: true }, 'A6: B girince A\'nın yerel verisi B\'ye görünmez (A saklasında)');
    await p.evaluate(() => localStorage.setItem('ya_pp_ogr', 'B-VERISI'));
    await p.evaluate(() => localStorage.setItem('__fakeuid', 'uA'));
    await p.reload(); await p.waitForTimeout(2500);
    eq(await p.evaluate(() => [localStorage.getItem('ya_pp_ogr'), localStorage.getItem('ya_lc'), localStorage.getItem('pp_aktif_uid'), JSON.parse(localStorage.getItem('pp_stash:uB')).ya_pp_ogr]), ['A-VERISI', 'A-LC', 'uA', 'B-VERISI'], 'A6: A dönünce kendi verisi geri geldi, B\'ninki ayrıldı (kayıp yok)');
    ok(p.errs.length === 0, 'A6: sayfa hatası yok ' + p.errs.join('|'));
    await ctx.close();
  }

  // A7) Paylaşılan cihaz: çıkışta bu hesabın yerel verisi silinir
  {
    const ctx = await baglamYap('if(!localStorage.__seeded){localStorage.setItem("__seeded","1");localStorage.setItem("ya_pp_ogr","GIZLI");localStorage.setItem("pp_paylasilan_cihaz","1");localStorage.setItem("pp_kuyruk:uA","[{\\"n\\":1}]")}');
    const p = await sayfaAc(ctx);
    let mesaj = '';
    p.on('dialog', d => { mesaj = d.message(); d.accept(); });
    await p.evaluate(() => document.getElementById('ppa-out').click());
    await p.waitForTimeout(2500);
    ok(/Gönderilmemiş 1 değişiklik/.test(mesaj) && /Paylaşılan cihaz modu açık/.test(mesaj), 'A7: çıkış uyarısı bekleyen değişikliği ve paylaşılan cihaz silmesini söyler');
    eq(await p.evaluate(() => [localStorage.getItem('ya_pp_ogr'), localStorage.getItem('pp_kuyruk:uA'), localStorage.getItem('__fakesignout')]), [null, null, '1'], 'A7: çıkıştan sonra yerel veri ve kuyruk silindi (oturum kapatıldı)');
    await ctx.close();
  }
  {
    const ctx = await baglamYap('if(!localStorage.__seeded){localStorage.setItem("__seeded","1");localStorage.setItem("ya_pp_ogr","KALIR")}');
    const p = await sayfaAc(ctx);
    p.on('dialog', d => d.accept());
    await p.evaluate(() => document.getElementById('ppa-out').click());
    await p.waitForTimeout(2500);
    eq(await p.evaluate(() => localStorage.getItem('ya_pp_ogr')), 'KALIR', 'A7: paylaşılan cihaz modu kapalıysa çıkış veriyi silmez (kullanıcıya özel saklanır)');
    await ctx.close();
  }

  /* ===== B) Service worker / PWA (yerel http, alt yol /proofpath/) ===== */
  const swKaynak = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
  ok(!/supabase\.co/.test(swKaynak) && /cdn\\\.jsdelivr\\\.net/.test(swKaynak) && /method !== "GET"/.test(swKaynak), 'B0: SW kaynağı Supabase API\'ye ve GET dışı isteklere dokunmaz');
  ok(!/respondWith\(\s*caches\.match\(r\)/.test(swKaynak) && /fetch\(r\)\.then/.test(swKaynak), 'B0: strateji ağ önce, önbellek yedek');
  const man = JSON.parse(fs.readFileSync(path.join(ROOT, 'manifest.webmanifest'), 'utf8'));
  ok(man.start_url === './' && man.scope === './' && man.display === 'standalone' && man.icons.length > 0 && fs.existsSync(path.join(ROOT, man.icons[0].src)), 'B0: manifest göreli (alt yol korunur), ikon dosyası var');

  const location0 = BASE.replace(/index.html$/, '');
  {
    // Varsayılan: SW kayıtlı değil
    const ctx0 = await b.newContext({ viewport: { width: 390, height: 844 } });
    await ctx0.addInitScript(INIT);
    const p0 = await sayfaAc(ctx0);
    eq(await p0.evaluate(async () => [(await navigator.serviceWorker.getRegistrations()).length, !!document.querySelector('link[rel=manifest]'), PP.cevrimdisi.acik()]), [0, false, false], 'B1: varsayılan: service worker ve manifest yok (canlıyı etkilemez)');
    await ctx0.close();

    const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
    await ctx.addInitScript(INIT);
    await ctx.addInitScript('if(!localStorage.__pwa){localStorage.setItem("__pwa","1");localStorage.setItem("pp_pwa","1")}');
    const p = await sayfaAc(ctx);
    await p.waitForFunction(() => navigator.serviceWorker.getRegistration().then(r => !!(r && r.active)), null, { timeout: 20000 });
    await p.reload(); await p.waitForTimeout(1500);
    const bilgi = await p.evaluate(async () => {
      const r = await navigator.serviceWorker.getRegistration(), ks = await caches.keys(), c = await caches.open(ks[0]), tum = (await c.keys()).map(x => x.url), urls = tum.map(x => new URL(x).pathname);
      return { tum, scope: new URL(r.scope).pathname, kontrol: !!navigator.serviceWorker.controller, ks, manifest: !!document.querySelector('link[rel=manifest]'), urls };
    });
    eq([bilgi.scope, bilgi.kontrol, bilgi.ks, bilgi.manifest], ['/proofpath/', true, ['pp-kabuk-2026-10-12-1'], true], 'B2: SW alt yolda (/proofpath/) kayıtlı ve sayfayı denetliyor; manifest bağlandı');
    ok(['/proofpath/index.html', '/proofpath/content/lessons/net-ek.js', '/proofpath/js/ogrenme/koc.js', '/proofpath/css/genel.css', '/proofpath/manifest.webmanifest'].every(u => bilgi.urls.includes(u)), 'B2: uygulama kabuğu ve ders içeriği önbelleğe alındı');
    ok(bilgi.tum.every(u => u.indexOf(location0) === 0 || /^https:\/\/(cdn\.jsdelivr\.net|fonts\.googleapis\.com|fonts\.gstatic\.com)\//.test(u)), 'B2: önbellekte yalnız uygulama dosyaları ve izinli statik CDN var');

    // Çevrimdışı: yenile → önbellekten açılır, ders içeriği erişilebilir
    await ctx.setOffline(true);
    await p.reload(); await p.waitForTimeout(2500);
    const off = await p.evaluate(() => ({ pp: typeof PP === 'object', ek: !!(window.PP_EK && PP_EK.net && PP_EK.net[3]), ders: !!(window.PP_LESSONS && PP_LESSONS.ccna && PP_LESSONS.ccna[1]), metin: document.body.innerText.length }));
    ok(off.pp && off.ek && off.ders && off.metin > 100, 'B3: çevrimdışı yenilemede uygulama ve ders içeriği açıldı');
    await p.evaluate(() => goTab('ders')); await p.waitForTimeout(500);
    ok(await p.evaluate(() => document.querySelector('#view').innerText.length > 50), 'B3: çevrimdışı Ders sekmesi çalışıyor');
    await ctx.setOffline(false);

    // Güncelleme: yeni sürüm kendiliğinden devralmaz; kullanıcı onayıyla uygulanır, eski önbellek silinir
    swSurum = '2026-10-12-2';
    await p.evaluate(async () => { const r = await navigator.serviceWorker.getRegistration(); await r.update(); });
    await p.waitForFunction(() => PP.cevrimdisi.bekleyenSurum === true, null, { timeout: 20000 });
    eq(await p.evaluate(async () => [(await caches.keys()).sort(), !!(await navigator.serviceWorker.getRegistration()).waiting]), [['pp-kabuk-2026-10-12-1', 'pp-kabuk-2026-10-12-2'], true], 'B4: yeni sürüm bekliyor, eski sürüm hâlâ devrede (sessiz değişim yok)');
    await p.evaluate(() => goTab('ayar')); await p.waitForTimeout(400);
    ok(await p.evaluate(() => !!document.querySelector('[data-gvn=yeni-surum]')), 'B4: Güven merkezinde "yeni sürüm hazır" bildirimi');
    await Promise.all([p.waitForNavigation({ timeout: 20000 }), p.evaluate(() => PP.cevrimdisi.guncelle())]);
    await p.waitForTimeout(1500);
    eq(await p.evaluate(async () => (await caches.keys()).sort()), ['pp-kabuk-2026-10-12-2'], 'B4: onaydan sonra yeni sürüm devraldı, eski önbellek silindi');

    // Kapat: SW ve önbellek kaldırılır
    const kp = await p.evaluate(async () => { const r = await PP.cevrimdisi.kapat(); return [r.ok, (await navigator.serviceWorker.getRegistrations()).length, (await caches.keys()).filter(k => k.indexOf('pp-kabuk-') === 0).length, localStorage.getItem('pp_pwa')]; });
    eq(kp, [true, 0, 0, null], 'B5: kapatınca service worker, önbellek ve bayrak kaldırıldı');
    await ctx.close();
  }

  await b.close();
  sunucu.close();
  console.log(fails ? '\nKALDI: ' + fails : '\nGEÇTİ');
  process.exit(fails ? 1 : 0);
})();

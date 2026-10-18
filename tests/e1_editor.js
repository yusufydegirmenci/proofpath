// E1: alan egzersizlerinde CodeMirror 6 editörü — açılış (SQL/Python/JS), yazma/okuma uyumu, Ctrl+Enter, Esc, geri dönüş (404 / SRI bozuk),
// dış ağ yok, SRI sabiti dosyayla aynı, 390 px ve koyu tema. Editör SRI'li <script> ile yüklendiği için sayfa http://127.0.0.1 üzerinden açılır.
const path = require('path'), fs = require('fs'), http = require('http'), crypto = require('crypto');
const { INIT, chromium } = require('./stub.js');
const KOK = path.join(__dirname, '..');
let fails = 0;
const ok = (c, m) => { console.log((c ? 'OK    ' : 'HATA  ') + m); if (!c) fails++; };
const eq = (a, b, m) => { const s = JSON.stringify(a) === JSON.stringify(b); ok(s, m + (s ? '' : '  → beklenen ' + JSON.stringify(b) + ', gelen ' + JSON.stringify(a))); };
const TUR = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.json': 'application/json', '.webmanifest': 'application/manifest+json' };

(async () => {
  const sunucu = http.createServer((q, r) => {
    const p = path.join(KOK, decodeURIComponent(q.url.split('?')[0]).replace(/^\/+/, '') || 'index.html');
    if (!p.startsWith(KOK) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { r.writeHead(404); return r.end(); }
    r.writeHead(200, { 'content-type': TUR[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(r);
  });
  await new Promise(c => sunucu.listen(0, '127.0.0.1', c));
  const taban = 'http://127.0.0.1:' + sunucu.address().port + '/';
  const b = await chromium.launch();

  // 0) SRI sabiti ile dosya aynı mı (derleme sonrası alan.js güncellenmeyi unutursa yakalanır)
  const meta = JSON.parse(fs.readFileSync(path.join(KOK, 'vendor', 'codemirror.sri.json'), 'utf8'));
  const dosya = fs.readFileSync(path.join(KOK, 'vendor', meta.dosya));
  const sriGercek = 'sha384-' + crypto.createHash('sha384').update(dosya).digest('base64');
  const alanJs = fs.readFileSync(path.join(KOK, 'js', 'ders', 'alan.js'), 'utf8');
  ok(sriGercek === meta.sri, 'vendor: codemirror.sri.json dosyanın gerçek SHA-384 değeriyle aynı');
  ok(alanJs.includes('"' + meta.sri + '"') && alanJs.includes('vendor/' + meta.dosya), 'alan.js: SRI ve dosya adı derlenen paketle aynı (sürüm sabit: ' + meta.dosya + ')');
  ok(Object.values(meta.paketler).every(v => /^\d+\.\d+\.\d+$/.test(v)), 'derleme: tüm paket sürümleri tam sabit (^ ~ yok)');
  ok(fs.existsSync(path.join(KOK, 'vendor', 'LICENSE-codemirror.txt')), 'lisans notu var');
  console.log('INFO  paket boyutu: ' + (dosya.length / 1024).toFixed(1) + ' KB (ham), ' + (require('zlib').gzipSync(dosya).length / 1024).toFixed(1) + ' KB (gzip)');

  const ac = async (w, ek, renk) => {
    const ctx = await b.newContext({ viewport: { width: w, height: 844 }, colorScheme: renk || 'light' });
    await ctx.addInitScript('window.__guest=true'); await ctx.addInitScript(INIT); if (ek) await ek(ctx);
    const p = await ctx.newPage(), errs = [], dis = [], yerel = [];
    p.on('pageerror', e => errs.push(e.message));
    p.on('request', q => { if (q.url().startsWith(taban)) yerel.push(q.url()); if (!q.url().startsWith(taban) && !/^(data|blob):/.test(q.url())) dis.push(q.url()); });
    await p.goto(taban + 'index.html#atolye'); await p.waitForTimeout(1200);
    await p.evaluate(() => { localStorage.removeItem('ya_pp_ogr'); S.va = null; S.at2.sec = 'va'; goTab('atolye'); }); await p.waitForTimeout(300);
    await p.evaluate(() => document.querySelector('[data-va-ders="va0-1"]').click()); await p.waitForTimeout(300);
    return { ctx, p, errs, dis, yerel };
  };

  // 1) Normal yol: editör üç dilde açılır
  const A = await ac(390);
  const p = A.p, ev = (f, a) => p.evaluate(f, a);
  await p.waitForSelector('[data-alan="va0-1-sql"] .cm-editor', { timeout: 15000 });
  await p.waitForSelector('[data-alan="va0-1-py"] .cm-editor', { timeout: 15000 });
  ok(true, 'SQL ve Python alanında .cm-editor açıldı');
  eq(await ev(() => [...document.querySelectorAll('[data-alan-kod]')].map(t => getComputedStyle(t).display)), ['none', 'none'], 'textarea gizli ama DOM\'da (data-alan-kod uyum katmanı)');
  ok(await ev(() => !!document.querySelector('[data-alan="va0-1-sql"] .cm-lineNumbers')), 'satır numarası var');
  // üç dilde sözdizimi renkleri: her dilin anahtar sözcüğü ayrı token olarak boyanır
  const renk = await ev(() => {
    const k = PPCM.kur, o = {};
    for (const [dil, kod, an] of [['sql', "SELECT 'a' FROM t -- x", 'SELECT'], ['python', "def f():\n  return 'a'  # x", 'def'], ['js', "const x = 'a'; // x", 'const']]) {
      const h = document.createElement('div'); document.body.appendChild(h); const e = k(h, { dil, deger: kod });
      const sp = [...h.querySelectorAll('.cm-line span')].filter(s => s.textContent === an && getComputedStyle(s).color !== getComputedStyle(h.querySelector('.cm-content')).color);
      o[dil] = [sp.length > 0, h.querySelectorAll('.cm-line span').length > 1, e.oku() === kod]; e.yoket(); h.remove();
    }
    return o;
  });
  eq(renk, { sql: [true, true, true], python: [true, true, true], js: [true, true, true] }, 'SQL/Python/JS: anahtar sözcük renkli, değer geri okunur');

  // 2) Uyum katmanı: .value yaz/oku, yazma = editörde görünür
  await ev(() => { document.querySelector('[data-alan-kod="va0-1-sql"]').value = 'SELECT 1;\nSELECT 2;'; });
  eq(await ev(() => [document.querySelector('[data-alan-kod="va0-1-sql"]').value, document.querySelectorAll('[data-alan="va0-1-sql"] .cm-line').length]), ['SELECT 1;\nSELECT 2;', 2], 'ta.value yazılınca editör güncellenir, okununca aynı metin (2 satır)');
  await p.click('[data-alan="va0-1-sql"] .cm-content'); await p.keyboard.press('Control+A'); await p.keyboard.type('SELECT COUNT(*) FROM siparis;');
  eq(await ev(() => document.querySelector('[data-alan-kod="va0-1-sql"]').value), 'SELECT COUNT(*) FROM siparis;', 'klavye ile yazılan metin ta.value ile okunur');
  // Python otomatik girinti
  await p.click('[data-alan="va0-1-py"] .cm-content'); await p.keyboard.press('Control+A'); await p.keyboard.type('if True:'); await p.keyboard.press('Enter'); await p.keyboard.type('x = 1');
  eq(await ev(() => document.querySelector('[data-alan-kod="va0-1-py"]').value), 'if True:\n  x = 1', 'Python: iki nokta sonrası Enter otomatik girinti (2 boşluk)');
  // Ctrl+Enter çalıştırır (durum satırı hemen belirir; ağ gerekmez)
  await p.keyboard.press('Control+Enter');
  await p.waitForSelector('[data-alan-sonuc="va0-1-py"] [data-alan-durum]', { timeout: 5000 });
  ok(true, 'Ctrl+Enter çalıştırmayı başlattı (durum: ' + await ev(() => document.querySelector('[data-alan-sonuc="va0-1-py"] [data-alan-durum]').dataset.alanDurum) + ')');
  // Esc odaktan çıkarır
  await p.click('[data-alan="va0-1-sql"] .cm-content'); await p.keyboard.press('Escape');
  ok(await ev(() => !document.querySelector('[data-alan="va0-1-sql"] .cm-editor').contains(document.activeElement)), 'Esc editör odağını bırakır');
  // Sıfırla başlangıç metnini editöre yazar
  await ev(() => document.querySelector('[data-alan="va0-1-sql"] [data-alan=sifirla]').click());
  eq(await ev(() => document.querySelector('[data-alan-kod="va0-1-sql"]').value === PP.alan.sifirla(PP.alan.bul('va0-1-sql'))), true, 'Sıfırla: editör başlangıç metnine döner');
  // 390 px: taşma yok
  ok(await ev(() => [...document.querySelectorAll('[data-alan-editor]')].every(e => e.getBoundingClientRect().right <= innerWidth + 1) && document.documentElement.scrollWidth <= innerWidth + 1), '390 px: editör ve sayfa yatay taşmaz');
  ok(await ev(() => document.querySelector('[data-alan="va0-1-sql"] .cm-content').getBoundingClientRect().height >= 60), '390 px: editör yüksekliği kullanılabilir (>= 60 px)');
  eq(A.dis.filter(u => /codemirror|lezer|unpkg|esm\.sh|skypack/i.test(u)), [], 'editör için dış ağ isteği yok (uygulamanın eski yazı tipi/Supabase/Pyodide istekleri bu testin konusu değil)');
  ok(A.yerel.some(u => u.includes('/vendor/' + meta.dosya)), 'editör paketi yerel vendor/ dosyasından yüklendi');
  eq(A.errs, [], 'sayfa hatası yok');
  await A.ctx.close();

  // 3) Koyu tema: editör zemini sayfa paneliyle aynı
  const K = await ac(390, null, 'dark');
  await K.p.waitForSelector('[data-alan="va0-1-sql"] .cm-editor', { timeout: 15000 });
  ok(await K.p.evaluate(() => { const e = document.querySelector('[data-alan="va0-1-sql"] .cm-editor'), pn = getComputedStyle(document.querySelector('.lbox')).backgroundColor; const bg = getComputedStyle(e).backgroundColor; return bg !== 'rgba(0, 0, 0, 0)' && getComputedStyle(e).color !== bg && /^rgb\((\d+)/.test(bg) && +bg.match(/\d+/)[0] < 90; }), 'koyu tema: editör zemini koyu, yazı ondan farklı');
  await K.ctx.close();

  // 4) Geri dönüş: dosya yok (404) → düz textarea, değer ve Ctrl+Enter çalışır
  const G = await ac(390, c => c.route('**/vendor/codemirror-*.js', r => r.fulfill({ status: 404, body: '' })));
  await G.p.waitForTimeout(1500);
  eq(await G.p.evaluate(() => [!!document.querySelector('.cm-editor'), getComputedStyle(document.querySelector('[data-alan-kod="va0-1-sql"]')).display !== 'none', typeof window.PPCM]), [false, true, 'undefined'], '404: editör yok, textarea görünür');
  await G.p.fill('[data-alan-kod="va0-1-sql"]', 'SELECT 5;');
  eq(await G.p.evaluate(() => document.querySelector('[data-alan-kod="va0-1-sql"]').value), 'SELECT 5;', '404: textarea yazma/okuma normal');
  await G.p.keyboard.press('Control+Enter');
  await G.p.waitForSelector('[data-alan-sonuc="va0-1-sql"] [data-alan-durum]', { timeout: 5000 });
  ok(true, '404: textarea\'da da Ctrl+Enter çalıştırır');
  eq(G.errs, [], '404: sayfa hatası yok');
  await G.ctx.close();

  // 5) Geri dönüş: dosya bozulmuş (SRI uyuşmaz) → tarayıcı çalıştırmaz, textarea kalır
  const S2 = await ac(390, c => c.route('**/vendor/codemirror-*.js', r => r.fulfill({ status: 200, contentType: 'text/javascript', body: 'window.PPCM={kur(){throw new Error("kötü")}};' })));
  await S2.p.waitForTimeout(1500);
  eq(await S2.p.evaluate(() => [typeof window.PPCM, !!document.querySelector('.cm-editor'), getComputedStyle(document.querySelector('[data-alan-kod="va0-1-sql"]')).display !== 'none']), ['undefined', false, true], 'SRI uyuşmaz: bozuk paket çalıştırılmadı, textarea kaldı');
  await S2.ctx.close();

  await b.close(); sunucu.close();
  console.log(fails ? '\n' + fails + ' HATA' : '\nTÜMÜ GEÇTİ');
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });

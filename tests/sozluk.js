// Faz 31: sözlük. Birleşik liste (GLOS + ders kavram kartları + content/sozluk-ek.js): tekrar yok, açıklamalar dolu, alfabetik,
// ek terimlerin ilk arama adı belirtilen dersin metninde GERÇEKTEN geçer (uydurma terim yok), eski girdiler korunur.
const fs = require('fs'), path = require('path'), vm = require('vm');
let n = 0, fails = 0;
const ok = (c, m) => { n++; console.log((c ? 'OK    ' : 'HATA  ') + m); if (!c) fails++; };
const eq = (a, b, m) => { const s = JSON.stringify(a) === JSON.stringify(b); ok(s, m + (s ? '' : '  → beklenen ' + JSON.stringify(b) + ', gelen ' + JSON.stringify(a))); };
const R = (...p) => path.join(__dirname, '..', ...p);
const html = fs.readFileSync(R('index.html'), 'utf8');
const win = {}, ctx = { window: win, console }; ctx.self = ctx.globalThis = win; vm.createContext(ctx);
[...html.matchAll(/<script src="(content\/lessons\/[^"]+|content\/sozluk-ek\.js|js\/yardim\/sozluk-birlestir\.js)"/g)].forEach(m => vm.runInContext(fs.readFileSync(R(m[1]), 'utf8'), ctx, { filename: m[1] }));
ok(/content\/sozluk-ek\.js/.test(html) && /sozluk-birlestir\.js/.test(html), 'index.html sözlük ek verisini ve birleştiriciyi yüklüyor');
const src = fs.readFileSync(R('js', 'yardim', 'rehber-sozluk.js'), 'utf8');
const a = src.indexOf('var GLOS=['), b = src.indexOf('function glossFor');
const GLOS = vm.runInNewContext(src.slice(a, b) + ';GLOS');
const P = win.PP_SOZLUK, EK = win.PP_SOZLUK_EK || [];
const liste = P.birlestir(GLOS, win.PP_LESSONS, EK);
ok(liste.length >= GLOS.length + 300, 'sözlük genişledi: ' + liste.length + ' terim (eski ' + GLOS.length + ')');
// eski girdiler korunur
const adlar = new Set(liste.map(x => P.norm(x.ad)));
eq(GLOS.filter(g => !adlar.has(P.norm(g[1]))).map(g => g[0]), [], 'eski sözlük girdilerinin hepsi duruyor');
// tekrar yok, açıklama dolu
const gorulen = {}, tekrar = [];
liste.forEach(x => { const k = P.norm(x.ad); if (gorulen[k]) tekrar.push(x.ad); gorulen[k] = 1; });
eq(tekrar, [], 'tekrarlanan terim yok');
eq(liste.filter(x => !x.ad || !x.tx || x.tx.length < 15).map(x => x.ad), [], 'her terimin adı ve açıklaması (≥15 karakter) dolu');
const sirali = liste.map(x => x.ad).slice().sort((p, q) => p.localeCompare(q, 'tr'));
eq(liste.map(x => x.ad), sirali, 'liste alfabetik (tr)');
// ek terimler: yapı + ders metninde geçiyor
const flat = o => typeof o === 'string' ? o : Array.isArray(o) ? o.map(flat).join(' ') : o && typeof o === 'object' ? Object.values(o).map(flat).join(' ') : '';
const dersMetni = id => { const [h, no] = id.split('-'), d = win.PP_LESSONS[h] && win.PP_LESSONS[h][no]; return d ? flat([d.hook, d.warmup, d.blocks, d.objectives, d.summary, d.vocab, d.quiz && d.quiz.map(q => q.q)]).toLowerCase() : null; };
const yapi = [], yok = [], gecmiyor = [];
EK.forEach(x => {
  if (!(Array.isArray(x) && x.length === 6 && [0, 1, 3, 4, 5].every(i => typeof x[i] === 'string' && x[i]) && Array.isArray(x[2]) && x[2].length)) { yapi.push(x[0]); return; }
  const t = dersMetni(x[4]); if (t === null) { yok.push(x[0] + '→' + x[4]); return; }
  if (!t.includes(x[2][0].toLowerCase())) gecmiyor.push(x[0] + ' ✗ ' + x[4]);
});
eq(yapi, [], 'ek terim satırları 6 alanlı');
eq(yok, [], 'ek terimlerin dersi var');
eq(gecmiyor, [], 'ek terimin ilk arama adı bağlı dersin metninde geçiyor (uydurma yok)');
// kullanıcı örnekleri aranabilir
const bul = q => liste.some(x => x.ad.toLowerCase().includes(q) || x.ara.some(s => s.includes(q)));
eq(['load balancer', 'cache', 'cdn', 'property', 'api', 'queue', 'idempoten'].filter(q => !bul(q)), [], 'load balancer, cache, CDN, property, API, queue, idempotency aranabilir');
ok(liste.filter(x => x.ders).length >= 300, 'terimlerin çoğu ders bilgisi taşıyor: ' + liste.filter(x => x.ders).length);
ok(P.dersEtiket('bk-32') === 'Backend/AWS · ders 32' && P.dersEtiket('') === '', 'ders etiketi');
console.log('\n' + n + ' kontrol, ' + fails + ' hata'); process.exit(fails ? 1 : 0);

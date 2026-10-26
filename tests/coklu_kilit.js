// Faz 35: çoklu seçim (multi) soru elemanlarını kilitler. Denetimde "8 çok-cevaplı soru testle kilitlenmemiş" bulgusu vardı:
// ders sınavlarında tam bu 8 soru multi taşır, hiçbiri eksik/fazla değildir; multi 2-4, seçenek sayısı multi+1 veya fazlası, kimlikler benzersiz.
// Yeni bir çoklu soru eklenirse bu listeye de eklenmelidir (bilerek: sessizce çoğalmasın).
const fs = require('fs'), path = require('path'), vm = require('vm');
let n = 0, fails = 0;
const ok = (c, m) => { n++; console.log((c ? 'OK    ' : 'HATA  ') + m); if (!c) fails++; };
const BEKLENEN = { 'bk-13': '3f95592c', 'bk-30': '81a2852e', 'bk-42': '811ba62c', 'bk-44': 'eb136ae5', 'sec-3': 'a22ac518', 'sec-10': 'ea7c5971', 'sec-24': 'c018eaae', 'sec-31': 'd20cc644' };
const KOK = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(KOK, 'index.html'), 'utf8');
const win = {}, ctx = { window: win, console }; ctx.self = ctx.globalThis = win; vm.createContext(ctx);
[...html.matchAll(/<script src="(content\/lessons\/[^"]+)"/g)].forEach(m => vm.runInContext(fs.readFileSync(path.join(KOK, m[1]), 'utf8'), ctx, { filename: m[1] }));
const bulunan = {}, kimlikler = new Set(); let tekrar = 0, bozuk = [];
for (const yol in win.PP_LESSONS) for (const no in win.PP_LESSONS[yol]) (win.PP_LESSONS[yol][no].quiz || []).forEach(q => {
  if (kimlikler.has(q.id)) tekrar++; kimlikler.add(q.id);
  if (q.multi === undefined) return;
  bulunan[yol + '-' + no] = q.id;
  if (!(Number.isInteger(q.multi) && q.multi >= 2 && q.multi <= 4 && q.options.length >= q.multi + 1)) bozuk.push(yol + '-' + no);
});
const sirala = o => JSON.stringify(Object.keys(o).sort().map(k => [k, o[k]]));
ok(sirala(bulunan) === sirala(BEKLENEN), 'multi taşıyan sorular tam olarak beklenen 8 (ders:id): ' + JSON.stringify(bulunan));
ok(bozuk.length === 0, 'multi 2-4 ve seçenek sayısı ≥ multi+1' + (bozuk.length ? ': ' + bozuk.join(',') : ''));
ok(tekrar === 0, 'ders sınavı soru kimlikleri benzersiz');
// Gizli tohum yan klasörde varsa: doğru cevap sıralı JSON dizisi ve tam multi tane seçenek (ogrenme.js ile aynı kural, burada 8 soruya özel)
const tohum = path.join(KOK, '..', 'proofpath-ops', 'kayitlar', 'seed', 'faz-22-coklu.sql');
if (fs.existsSync(tohum)) {
  const yol = fs.readFileSync(tohum, 'utf8'); let sorun = [];
  for (const [d, id] of Object.entries(BEKLENEN)) {
    const [h, no] = d.split('-'), q = win.PP_LESSONS[h][no].quiz.find(x => x.id === id);
    const m = new RegExp("'ders:" + h + ':' + no + ":sinav', 'v1', '" + id + "', '(\\[[^\\n]*?\\])', 1").exec(yol);
    let dg = null; try { dg = m && JSON.parse(m[1].replace(/''/g, "'")); } catch (e) { dg = null; }
    if (!Array.isArray(dg) || dg.length !== q.multi || new Set(dg).size !== dg.length || dg.some(x => q.options.indexOf(x) < 0) || JSON.stringify(dg.slice().sort()) !== JSON.stringify(dg)) sorun.push(d);
  }
  ok(sorun.length === 0, 'tohumdaki 8 çoklu anahtar sıralı JSON dizisi, tam multi tane, hepsi seçenek' + (sorun.length ? ': ' + sorun.join(',') : ''));
} else console.log('ATLANDI  gizli tohum (proofpath-ops/kayitlar/seed/faz-22-coklu.sql) bu makinede yok');
console.log('\n' + n + ' kontrol, ' + fails + ' hata'); process.exit(fails ? 1 : 0);

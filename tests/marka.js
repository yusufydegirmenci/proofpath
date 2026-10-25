// Kullanım: node tests/marka.js
// Ad ve logo tek yerden (marka.js) gelir: statik dosyalar eşit mi, arayüz kodunda sabit yazılmış ad kaldı mı?
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const KOK = path.join(__dirname, '..');
let hata = 0;
const ok = (k, m) => { console.log((k ? 'TAMAM ' : 'HATA  ') + m); if (!k) hata++; };

const M = require(path.join(KOK, 'marka.js'));
ok(['ad', 'kisaAd', 'dosya', 'logo', 'buyuk'].every(k => typeof M[k] === 'string' && M[k]), 'marka.js tüm alanları dolu');
ok(/^[a-z0-9-]+$/.test(M.dosya), 'dosya ön eki yalnız küçük harf, rakam, tire');
ok(fs.existsSync(path.join(KOK, M.logo)), 'logo dosyası var: ' + M.logo);

const d = spawnSync(process.execPath, [path.join(KOK, 'tools', 'marka-esitle.js'), '--denetle'], { encoding: 'utf8' });
ok(d.status === 0, 'statik dosyalar marka.js ile eşit ' + (d.stdout || d.stderr).trim());

const idx = fs.readFileSync(path.join(KOK, 'index.html'), 'utf8');
ok(idx.indexOf('src="marka.js"') > -1 && idx.indexOf('src="marka.js"') < idx.indexOf('<script src="config.js"'), 'index.html marka.js\'i diğer betiklerden önce yükler');

// Görünen metinlerde ad sabit yazılmamalı (yorumlar ve konsol iletileri serbest).
const tara = dir => fs.readdirSync(path.join(KOK, dir), { withFileTypes: true }).flatMap(e =>
  e.isDirectory() ? tara(path.join(dir, e.name)) : e.name.endsWith('.js') ? [path.join(dir, e.name)] : []);
const sabit = [];
tara('js').concat(tara('content'), ['supabase-shim.js']).forEach(f => {
  fs.readFileSync(path.join(KOK, f), 'utf8').split('\n').forEach((l, i) => {
    if (/^\s*(\/\/|\/\*|\*)/.test(l) || /console\.(warn|error|log)\(/.test(l)) return;
    if (/["'`][^"'`\n]*proofpath/i.test(l)) sabit.push(f + ':' + (i + 1));
  });
});
ok(sabit.length === 0, 'arayüz kodunda sabit "Proofpath" metni yok' + (sabit.length ? ': ' + sabit.join(', ') : ''));

if (hata) { console.log(hata + ' hata'); process.exit(1); }
console.log('marka testi geçti');

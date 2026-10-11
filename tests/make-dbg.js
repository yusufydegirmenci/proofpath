// Kullanım: node tests/make-dbg.js
// index.html'i okur, ana IIFE'nin son "})();" satırından önce hata ayıklama kancalarını ekler
// ve tests/page_dbg.html üretir (git'e girmez). index.html değiştirilmez.
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const NAMES = [
  'draw', 'cleanLesson', 'TMAP', 'QB', 'STARTER', 'tmFor', 'NW_RX', 'baseQuiz', 'nwFor', 'nwFuzzy',
  'FK_SC', 'FK_DF', 'FK_KD', 'FK_DK', 'FK_CM', 'FK_BL',
  'fkBuild', 'fkBuy', 'fkLaunch', 'fkMod', 'fkNeighbors', 'fkRel', 'fkTick',
  'streakInfo', 'today', 'VD_CU', 'vdScore', 'vdOpts', 'vdCloseOpts',
];
// Eski test adları (Faz 1B'de koddan kalkmış/yeniden adlandırılmış) yeni sembollere bağlanır; testler değişmez.
const ALIAS = { ST: 'STARTER', tf: 'tmFor', QBX: 'QB', cl: 'cleanLesson' };
const hook =
  'window.__S=S;window.__X={' +
  NAMES.map(n => `${n}:typeof ${n}!=="undefined"?${n}:undefined`).join(',') +
  ',' + Object.keys(ALIAS).map(a => `${a}:typeof ${ALIAS[a]}!=="undefined"?${a === 'ST' ? 'function(){return STARTER}' : ALIAS[a]}:undefined`).join(',') +
  ',QBALL:typeof QB!=="undefined"?function(){return QB}:undefined' +
  '};';
// window.__store tests/stub.js tarafından tanımlanır (sahte db deposu); burada ezilmez.

const lines = src.split('\n');
let idx = -1;
for (let i = lines.length - 1; i >= 0; i--) {
  if (lines[i].replace(/\r$/, '') === '})();') { idx = i; break; }
}
if (idx < 0) { console.error('Ana IIFE kapanışı bulunamadı'); process.exit(1); }
lines.splice(idx, 0, hook);
let out = lines.join('\n');
// page_dbg.html tests/ altında durur: göreli betik yollarını kökten çöz.
out = out.replace(/(<script[^>]*\ssrc=")(?!https?:|data:|\/|#|\.\.\/)/g, '$1../');
fs.writeFileSync(path.join(__dirname, 'page_dbg.html'), out);
console.log('tests/page_dbg.html üretildi (', NAMES.length, 'ad)');

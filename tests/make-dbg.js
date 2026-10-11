// Kullanım: node tests/make-dbg.js
// index.html'i okur, uygulama betiklerinden sonra hata ayıklama kancalarını ekler
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

// Kanca, tüm uygulama betiklerinden sonra ayrı bir betik olarak </body> öncesine eklenir (uygulama kodu küresel kapsamdadır).
let out = src.replace(/\n<\/body>/, '\n<script>\n"use strict";\n' + hook + '\n</script>\n</body>');
if (out === src) { console.error('</body> bulunamadı'); process.exit(1); }
// page_dbg.html tests/ altında durur: göreli betik/stil yollarını kökten çöz.
out = out.replace(/(<script[^>]*\ssrc=")(?!https?:|data:|\/|#|\.\.\/)/g, '$1../');
out = out.replace(/(<link[^>]*\shref=")(?!https?:|data:|\/|#|\.\.\/)/g, '$1../');
fs.writeFileSync(path.join(__dirname, 'page_dbg.html'), out);
console.log('tests/page_dbg.html üretildi (', NAMES.length, 'ad)');

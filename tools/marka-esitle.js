// Kullanım: npm run marka            (marka.js'teki ad/logoyu statik dosyalara yazar)
//           npm run marka -- --denetle (yalnız denetler; eşit değilse çıkış 1)
// JS okuyamayan dosyalar: index.html ve 404.html başlığı + sekme simgesi, manifest.webmanifest, sw.js önbellek listesi.
const fs = require('fs');
const path = require('path');

const KOK = path.join(__dirname, '..');
const M = require(path.join(KOK, 'marka.js'));
const DENETLE = process.argv.includes('--denetle');
const TUR = { svg: 'image/svg+xml', png: 'image/png', webp: 'image/webp', ico: 'image/x-icon' };
const logoTur = TUR[path.extname(M.logo).slice(1).toLowerCase()] || 'image/png';

const oku = f => fs.readFileSync(path.join(KOK, f), 'utf8');
const ikonEtiketi = `<link rel="icon" href="${M.logo}" type="${logoTur}">`;
const ikonDegis = s => s.replace(/<link rel="icon"[^>]*>/, ikonEtiketi);

const yeni = {
  'index.html': ikonDegis(oku('index.html').replace(/<title>[^<]*<\/title>/, `<title>${M.ad}</title>`)),
  '404.html': ikonDegis(oku('404.html').replace(/<title>([^<]*· )?[^<]*<\/title>/, (t, on) => `<title>${on || ''}${M.ad}</title>`)),
  'sw.js': oku('sw.js').replace(/new URL\("[^"]+", self\.location\)\.href,\n(\s+new URL\("vendor)/, `new URL(${JSON.stringify(M.logo)}, self.location).href,\n$1`),
};
const man = JSON.parse(oku('manifest.webmanifest'));
man.name = M.ad;
man.short_name = M.kisaAd;
man.icons = [{ src: M.logo, sizes: logoTur === 'image/svg+xml' ? 'any' : '512x512', type: logoTur, purpose: 'any' }];
yeni['manifest.webmanifest'] = JSON.stringify(man, null, 2).replace(/\{\n\s+("src"[^]*?)\n\s+\}/, (_, ic) => '{ ' + ic.replace(/,\n\s+/g, ', ') + ' }') + '\n';

const farkli = Object.keys(yeni).filter(f => yeni[f] !== oku(f));
if (DENETLE) {
  if (farkli.length) { console.error('marka.js ile eşit değil: ' + farkli.join(', ') + ' → npm run marka'); process.exit(1); }
  console.log('marka eşit: ' + M.ad + ' · ' + M.logo);
  process.exit(0);
}
if (!fs.existsSync(path.join(KOK, M.logo))) { console.error('Logo dosyası yok: ' + M.logo); process.exit(1); }
if (farkli.length) {
  // Kabuk önbelleği yenilensin: telefona yüklü uygulama da yeni adı/logoyu alır.
  const g = new Date().toISOString().slice(0, 10);
  yeni['sw.js'] = yeni['sw.js'].replace(/var SURUM = "([^"]+)"/, (t, eski) => {
    const n = eski.startsWith(g) ? (parseInt(eski.slice(11), 10) || 0) + 1 : 1;
    return `var SURUM = "${g}-${n}"`;
  });
  ['sw.js'].concat(farkli).filter((f, i, a) => a.indexOf(f) === i).forEach(f => fs.writeFileSync(path.join(KOK, f), yeni[f]));
}
console.log(farkli.length ? 'güncellendi: ' + farkli.join(', ') : 'zaten eşit');

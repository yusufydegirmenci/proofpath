// Aylık kaynak raporu (AĞ GEREKİR, elle çalıştırılır; zamanlanmış iş yok): `npm run kaynak:aylik [-- --ops=<raporlar klasörü>] [--json=<denetle.js çıktısı>]`
// denetle.js'i çalıştırır ve sonucu ../proofpath-ops/raporlar/kaynak-<tarih>.md dosyasına yazar.
// Rapor public repoya YAZILMAZ: hedef klasör bu reponun dışında ve var olmalı (oluşturulmaz).
// --json verilirse ağa çıkılmaz, yalnız o dosya rapora çevrilir.
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const { KOK } = require('./toplayici.js');

const hucre = s => String(s == null ? '' : s).replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim();
function tablo(baslik, satirlar, kolonlar) {
  if (!satirlar.length) return '';
  return '\n## ' + baslik + ' (' + satirlar.length + ')\n\n| ' + kolonlar.map(k => k[0]).join(' | ') + ' |\n|' + kolonlar.map(() => '---').join('|') + '|\n' +
    satirlar.map(s => '| ' + kolonlar.map(k => hucre(k[1](s))).join(' | ') + ' |').join('\n') + '\n';
}
function markdown(r, tarih) {
  return '# Kaynak denetimi ' + tarih + '\n\n' +
    'Toplam ' + r.toplam + ' tekil adres · HTTP 200: ' + r.ok + ' · belirsiz (bot engeli): ' + r.belirsiz.length + ' · bozuk: ' + r.bozuk.length + ' · başlık uyumsuz (elle bak): ' + r.baslikUyumsuz.length + '\n' +
    'Yöntem: yalnız GET (`npm run kaynak:aylik`); 200 dönmesi içeriğin doğru olduğunu göstermez, yalnız adresin açıldığını.\n' +
    tablo('Bozuk', r.bozuk, [['Durum', s => s.durum || s.hata], ['Adres', s => s.url], ['Girdi', s => s.baslik], ['Yer', s => (s.yer || [])[0]]]) +
    tablo('Belirsiz', r.belirsiz, [['Durum', s => s.durum], ['Adres', s => s.url], ['Girdi', s => s.baslik]]) +
    tablo('Başlık uyumsuz', r.baslikUyumsuz, [['Adres', s => s.url], ['Girdi başlığı', s => s.girdiBasligi], ['Sayfa başlığı', s => s.sayfaBasligi]]);
}
const disarida = dir => { const rel = path.relative(KOK, path.resolve(dir)); return rel.startsWith('..') || path.isAbsolute(rel); };
module.exports = { markdown, disarida };

if (require.main === module) {
  const arg = n => (process.argv.slice(2).find(a => a.startsWith('--' + n + '=')) || '').slice(n.length + 3);
  const hedef = path.resolve(arg('ops') || path.join(KOK, '..', 'proofpath-ops', 'raporlar'));
  if (!disarida(hedef)) { console.error('Hedef proofpath reposunun içinde olamaz (rapor public repoya yazılmaz): ' + hedef); process.exit(2); }
  if (!fs.existsSync(hedef)) { console.error('Rapor klasörü yok: ' + hedef + ' (proofpath-ops klonu proofpath yanında olmalı ya da --ops= ver)'); process.exit(2); }
  let jsonYol = arg('json');
  if (!jsonYol) {
    jsonYol = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'pp-kaynak-')), 'rapor.json');
    spawnSync(process.execPath, [path.join(__dirname, 'denetle.js'), '--cikti=' + jsonYol], { stdio: 'inherit' });   /* çıkış 1 = bozuk adres var, yine de rapor yazılır */
  }
  if (!fs.existsSync(jsonYol)) { console.error('Denetim çıktısı oluşmadı: ' + jsonYol); process.exit(2); }
  const d = new Date(), p = n => String(n).padStart(2, '0'), tarih = d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
  const dosya = path.join(hedef, 'kaynak-' + tarih + '.md');
  fs.writeFileSync(dosya, markdown(JSON.parse(fs.readFileSync(jsonYol, 'utf8')), tarih));
  console.log('Rapor yazıldı: ' + dosya);
}

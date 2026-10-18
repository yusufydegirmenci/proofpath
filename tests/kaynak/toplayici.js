// Ders ve proje verisinden dış kaynak girdilerini toplar (ağsız). Hem tests/kaynak/denetle.js (ağlı, `npm run kaynak`)
// hem tests/kaynak_etiket.js (ağsız, npm test) kullanır.
// Girdi = adres taşıyan nesne ({url|u|href|link} + yanındaki başlık alanı). Dönen: {girdiler:[{yer,baslik,url}], adressiz:[{yer,ne}]}
const fs = require('fs'), path = require('path'), vm = require('vm');
const KOK = path.join(__dirname, '..', '..');
const ADRES = /^https?:\/\//i;
const ADRES_ALANLARI = ['url', 'u', 'href', 'link'];
const BASLIK_ALANLARI = ['title', 't', 'ad', 'baslik', 'name', 'text'];

function betikler() {
  const html = fs.readFileSync(path.join(KOK, 'index.html'), 'utf8');
  return [...html.matchAll(/<script src="((?:content|js\/veri)\/[^"?]+\.js)"/g)].map(m => m[1])
    .concat(['docs/projects.js', 'docs/proj_bk4.js', 'docs/proj_qa4.js', 'docs/proj_sec4.js', 'docs/atlas_bk.js', 'docs/atlas_sec.js'].filter(f => fs.existsSync(path.join(KOK, f))));
}

function yukle() {
  const win = {}, ctx = { window: win, console: { log() {}, warn() {}, error() {} }, document: { addEventListener() {}, getElementById() { return null; }, querySelector() { return null; }, createElement() { return {}; } }, localStorage: { getItem() { return null; }, setItem() {} } };
  ctx.self = ctx.globalThis = win; vm.createContext(ctx);
  const hatali = [];
  betikler().forEach(f => { try { vm.runInContext(fs.readFileSync(path.join(KOK, f), 'utf8'), ctx, { filename: f }); } catch (e) { hatali.push(f + ': ' + String(e.message).slice(0, 80)); } });
  return { win, hatali };
}

function topla() {
  const { win, hatali } = yukle(), girdiler = [], adressiz = [], gorulen = new Set();
  (function yuru(o, yol, derinlik) {
    if (!o || typeof o !== 'object' || derinlik > 14 || gorulen.has(o)) return;
    gorulen.add(o);
    if (!Array.isArray(o)) {
      const ak = ADRES_ALANLARI.find(k => typeof o[k] === 'string' && ADRES.test(o[k]));
      if (ak) {
        const bk = BASLIK_ALANLARI.find(k => typeof o[k] === 'string' && o[k] !== o[ak]);
        girdiler.push({ yer: yol, baslik: bk ? o[bk] : '', url: o[ak] });
      }
      /* kaynak/sertifika benzeri iddia nesnesi adressizse: doğrulanmadı etiketi aranır */
      if (o.sertifika && typeof o.sertifika === 'object' && !Array.isArray(o.sertifika)) {
        const s = o.sertifika, adresli = ADRES_ALANLARI.some(k => typeof s[k] === 'string' && ADRES.test(s[k]));
        adressiz.push({ yer: yol + '.sertifika', ne: s.ad || '', adresli, durum: s.durum || '' });
      }
    }
    Object.keys(o).forEach(k => { try { yuru(o[k], yol + (Array.isArray(o) ? '[' + k + ']' : '.' + k), derinlik + 1); } catch (e) { /* getter */ } });
  })(win, 'w', 0);
  return { girdiler, adressiz, hatali };
}
module.exports = { topla, KOK };
if (require.main === module) { const r = topla(); console.log(r.girdiler.length + ' adresli girdi, ' + new Set(r.girdiler.map(g => g.url)).size + ' tekil adres; sertifika iddiası ' + r.adressiz.length + '; yüklenemeyen ' + r.hatali.length); r.hatali.slice(0, 10).forEach(h => console.log(' ! ' + h)); }

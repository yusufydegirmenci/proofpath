// Sertifika kodu/sürümü tutarlılığı (Faz 41d). Kullanım: node tests/sertifika_surum.js
// Tek doğruluk kaynağı bu tablodur: içerikte geçen sınav kodları yalnız burada izinli olanlar olabilir.
// Yeni sürüm yayımlanınca ÖNCE bu tablo (ve analiz/faz-43d-sertifika-kapsam.md) güncellenir, sonra içerik.
const fs = require('fs'), path = require('path');
const kok = path.join(__dirname, '..');
const TARA = ['content', 'js/veri', 'docs', 'index.html'];
const IZINLI = {
  'CompTIA Security+': { re: /SY0-\d{3}/g, izin: ['SY0-701', 'SY0-801'] },
  'Cisco CCNA': { re: /\b200-\d{3}\b/g, izin: ['200-301', '200-201'] },         // 200-201: CCNA Cybersecurity (eski CyberOps), yollar.js
  'AWS Solutions Architect Associate': { re: /SAA-C\d{2}/g, izin: ['SAA-C03'] },
  'AWS Cloud Practitioner': { re: /CLF-C\d{2}/g, izin: [] },                      // hatta kullanılmıyor; geçiyorsa bilinçli ekle
  'Python Institute PCEP': { re: /PCEP-\d{2}-\d{2}/g, izin: ['PCEP-30-02', 'PCEP-30-03'] },
  'ISTQB CTFL': { re: /CTFL[ -]?v?(\d+\.\d+(?:\.\d+)?)/g, izin: ['4.0', '4.0.1'], grup: 1 }
};
const YASAK = [/SY0-601/, /SAA-C02/, /200-125|100-105|200-125/, /CTFL[ -]?v?3\.1/, /Foundation Level 2018/];
function dosyalar(p, out = []) {
  const t = path.join(kok, p); if (!fs.existsSync(t)) return out;
  const s = fs.statSync(t);
  if (s.isFile()) { if (/\.(js|html|md|txt)$/.test(t)) out.push(t); return out; }
  for (const f of fs.readdirSync(t)) dosyalar(path.join(p, f), out);
  return out;
}
let hata = 0;
const ok = (c, m) => { console.log((c ? 'OK    ' : 'HATA  ') + m); if (!c) hata++; };
const bulunan = {};
for (const f of TARA.flatMap(p => dosyalar(p))) {
  const s = fs.readFileSync(f, 'utf8');
  for (const [ad, k] of Object.entries(IZINLI)) {
    for (const m of s.matchAll(k.re)) {
      const v = k.grup ? m[k.grup] : m[0];
      (bulunan[ad] = bulunan[ad] || {})[v] = (bulunan[ad][v] || 0) + 1;
      if (!k.izin.includes(v)) { ok(false, ad + ': izinsiz kod/sürüm "' + v + '" (' + path.relative(kok, f) + ')'); }
    }
  }
  for (const r of YASAK) if (r.test(s)) ok(false, 'eski/yanlış sürüm ' + r + ' (' + path.relative(kok, f) + ')');
}
for (const [ad, k] of Object.entries(IZINLI)) ok(true, ad + ' bulunanlar: ' + JSON.stringify(bulunan[ad] || {}));
// Security+ : V7 ve V8 birlikte anılıyorsa içerikte geçiş tarihi (17 Kasım 2026) geçmeli
const sec1 = fs.readFileSync(path.join(kok, 'content/lessons/sec-1.js'), 'utf8');
ok(/SY0-801/.test(sec1) && /SY0-701/.test(sec1), 'sec-1: SY0-701 ve SY0-801 sürüm notu birlikte');
ok(/17 Kasım 2026/.test(sec1), 'sec-1: Security+ V8 yürürlük tarihi (17 Kasım 2026) yazılı (CompTIA sayfası, doğrulama 2026-11-06)');
console.log('\n' + (hata ? hata + ' hata' : 'hepsi geçti'));
process.exit(hata ? 1 : 0);

// Kullanım: cd tools/cm && npm ci && node derle.js
// Çıktı: ../../vendor/codemirror-<paket sürümü>.js (tek IIFE, minify) + SHA-384 (SRI) + LICENSE-codemirror.txt
const esbuild = require('esbuild'), fs = require('fs'), path = require('path'), crypto = require('crypto');
const pkg = require('./package.json');
const pj = p => JSON.parse(fs.readFileSync(path.join(__dirname, 'node_modules', p, 'package.json'), 'utf8'));
const cmSurum = pj('@codemirror/view').version;
const cikis = path.join(__dirname, '..', '..', 'vendor');
const ad = `codemirror-${cmSurum}.js`;
fs.mkdirSync(cikis, { recursive: true });
for (const f of fs.readdirSync(cikis)) if (/^codemirror-.*\.js$/.test(f) && f !== ad) fs.unlinkSync(path.join(cikis, f));
esbuild.buildSync({ entryPoints: [path.join(__dirname, 'entry.js')], bundle: true, minify: true, format: 'iife', target: 'es2020', legalComments: 'none', outfile: path.join(cikis, ad), logLevel: 'warning' });
const buf = fs.readFileSync(path.join(cikis, ad));
const sri = 'sha384-' + crypto.createHash('sha384').update(buf).digest('base64');
fs.writeFileSync(path.join(cikis, 'codemirror.sri.json'), JSON.stringify({ dosya: ad, sri, bayt: buf.length, paketler: pkg.dependencies }, null, 2) + '\n');
const lic = Object.keys(pkg.dependencies).map(p => { const d = path.join(__dirname, 'node_modules', p); const l = fs.readdirSync(d).find(x => /^LICENSE/i.test(x)); return `=== ${p}@${pj(p).version} ===\n` + (l ? fs.readFileSync(path.join(d, l), 'utf8') : '(lisans dosyası yok)') + '\n'; });
fs.writeFileSync(path.join(cikis, 'LICENSE-codemirror.txt'), 'CodeMirror 6 ve Lezer: MIT lisansı (aşağıda her paketin kendi metni). Bu paket derlemeye gömülüdür; yalnız derleme zamanında npm ile indirilir.\n\n' + lic.join('\n'));
console.log(ad, buf.length + ' bayt (' + (buf.length / 1024).toFixed(1) + ' KB), gzip ~' + (require('zlib').gzipSync(buf).length / 1024).toFixed(1) + ' KB', sri);


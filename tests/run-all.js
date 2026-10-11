// Kullanım: npm test  (ya da: node tests/run-all.js [--timeout=90] [desen])
// Her test dosyasını ayrı süreçte, sırayla çalıştırır. Ekran görüntüleri geçici klasöre yazılır.
// Durumlar: GEÇTİ (çıkış 0) · KALDI (çıkış ≠ 0) · ZAMAN AŞIMI · ÇÖKTÜ (test hiç başlayamadı: modül/tarayıcı yok)
// UYARI: GEÇTİ yalnızca çıkış kodu 0 demektir. Çoğu eski test assert etmez, sadece yazdırır (bkz. TESTING.md).
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');

const args = process.argv.slice(2);
const tArg = args.find(a => a.startsWith('--timeout='));
const TIMEOUT = (tArg ? parseInt(tArg.slice(10), 10) : 420) * 1000;
const filter = args.find(a => !a.startsWith('--'));
const SKIP = new Set(['stub.js', 'run-all.js', 'make-dbg.js']);

// page_dbg.html (hata ayıklama kancalı kopya) testlerden önce üretilir.
const gen = require('child_process').spawnSync(process.execPath, [path.join(__dirname, 'make-dbg.js')], { encoding: 'utf8' });
console.log((gen.stdout || gen.stderr || '').trim());
if (gen.status !== 0) process.exit(1);

const files = fs.readdirSync(__dirname)
  .filter(f => f.endsWith('.js') && !SKIP.has(f) && (!filter || f.includes(filter)))
  .sort();
const work = fs.mkdtempSync(path.join(os.tmpdir(), 'proofpath-tests-'));

const emekli = fs.existsSync(path.join(__dirname, 'emekli'))
  ? fs.readdirSync(path.join(__dirname, 'emekli')).filter(f => f.endsWith('.js') && (!filter || f.includes(filter))).sort()
  : [];

function run(file, dir = '') {
  return new Promise(resolve => {
    const t0 = Date.now();
    let out = '';
    let timedOut = false;
    const child = spawn(process.execPath, [path.join(__dirname, dir, file)], { cwd: work });
    child.stdout.on('data', d => (out += d));
    child.stderr.on('data', d => (out += d));
    const timer = setTimeout(() => {
      timedOut = true;
      child.kill('SIGKILL');
    }, TIMEOUT);
    child.on('close', code => {
      clearTimeout(timer);
      const sn = Math.round((Date.now() - t0) / 1000);
      let status;
      if (timedOut) status = 'ZAMAN AŞIMI';
      else if (code === 0) status = 'GEÇTİ';
      else if (/Cannot find module|Executable doesn't exist|SyntaxError/.test(out)) status = 'ÇÖKTÜ';
      else status = 'KALDI';
      resolve({ file, status, sn, out });
    });
  });
}

(async () => {
  const results = [];
  for (const f of files) {
    const r = await run(f);
    results.push(r);
    const last = r.out.trim().split('\n').filter(l => !/^\s+at /.test(l)).slice(-1)[0] || '';
    console.log(`${r.status.padEnd(12)} ${f.padEnd(24)} ${String(r.sn).padStart(3)}s  ${last.slice(0, 90)}`);
  }
  // Emekli testler (eski akış): ayrı sayılır, çıkış kodunu etkilemez.
  const retired = [];
  for (const f of emekli) {
    const r = await run(f, 'emekli');
    retired.push(r);
    console.log(`EMEKLİ(${r.status})`.padEnd(12), ('emekli/' + f).padEnd(24), String(r.sn).padStart(3) + 's');
  }
  const count = s => results.filter(r => r.status === s).length;
  console.log('\n=== ÖZET ===');
  for (const s of ['GEÇTİ', 'KALDI', 'ZAMAN AŞIMI', 'ÇÖKTÜ']) console.log(s.padEnd(12), count(s));
  console.log('TOPLAM'.padEnd(12), results.length);
  console.log('EMEKLİ'.padEnd(12), retired.length, '(sayıma dahil değil)');
  const logDir = path.join(work, 'loglar');
  fs.mkdirSync(logDir, { recursive: true });
  for (const r of results) fs.writeFileSync(path.join(logDir, r.file + '.log'), r.out);
  console.log('Ayrıntılı loglar:', logDir);
  process.exit(results.every(r => r.status === 'GEÇTİ') ? 0 : 1);
})();

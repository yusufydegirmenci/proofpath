// Faz 12 V1: ders kod bloklarını "okudum" değil ÇALIŞTIRARAK doğrulama. Ağ yok, CDN yok, tarayıcı gerekmez.
//   SQL → node:sqlite (bellekte) · Python → `python -I` (zaman sınırlı, ağ soketi kapalı) · JS → acorn (modül) ayrıştırması
//   bash → `bash -n` · YAML (PyYAML varsa) / JSON → sözdizimi. Çalışması beklenmeyen blok içerikte açıkça işaretlidir
//   (`calistirma: "atla <neden>"`) ve sayılır. Kaynaklar: content/lessons (ders), PP_EK, PP_VA, PP_SENARYO, js/veri/tmap.js, proje dosyaları.
// Ayrıca Veri Analitiği alan çözümlerini (PP_VA.alanCozum + tests/va-cozumler-*.json) PP.alan'ın kontrol/varyant işlevleriyle çevrimdışı çalıştırır.
const fs = require('fs');
const os = require('os');
const path = require('path');
const vm = require('vm');
const { spawnSync } = require('child_process');
const acorn = require('acorn');

const KOK = path.join(__dirname, '..');
let n = 0, fails = 0;
const ok = (c, m) => { n++; console.log((c ? 'OK    ' : 'HATA  ') + m); if (!c) fails++; };
const eq = (a, b, m) => { const s = JSON.stringify(a) === JSON.stringify(b); ok(s, m + (s ? '' : '  → beklenen ' + JSON.stringify(b) + ', gelen ' + JSON.stringify(a))); };

/* ---------- içerik yükleme (index.html'deki sıra) ---------- */
function yukle() {
  const html = fs.readFileSync(path.join(KOK, 'index.html'), 'utf8');
  const srcs = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]);
  const win = {};
  const ctx = { window: win, console, document: {}, navigator: {}, localStorage: { getItem() { return null; }, setItem() {} } };
  ctx.self = ctx.globalThis = win; vm.createContext(ctx);
  for (const s of srcs.filter(x => /^content\/(lessons|veri-analitigi|senaryo)\//.test(x) || /^js\/veri\/(tmap|proje-)/.test(x))) {
    const kod = fs.readFileSync(path.join(KOK, s), 'utf8');
    // js/veri/tmap.js `var TMAP=` tanımlar; vm bağlamında küresel olur
    vm.runInContext(kod, ctx, { filename: s });
  }
  return { win, TMAP: vm.runInContext('typeof TMAP!=="undefined"?TMAP:null', ctx) };
}
const { win, TMAP } = yukle();

/* ---------- yürütücüler ---------- */
const GECICI = fs.mkdtempSync(path.join(os.tmpdir(), 'pp-kod-'));
process.on('exit', () => { try { fs.rmSync(GECICI, { recursive: true, force: true }); } catch (e) { /* yoksay */ } });
const temiz = { ...process.env }; ['HTTP_PROXY', 'HTTPS_PROXY', 'ALL_PROXY', 'http_proxy', 'https_proxy', 'all_proxy'].forEach(k => delete temiz[k]);

function calis(komut, args, girdi, ms) {
  return spawnSync(komut, args, { input: girdi, encoding: 'utf8', timeout: ms || 15000, env: temiz, cwd: GECICI, windowsHide: true });
}
// Python: ilk çalışan 3.x yorumlayıcı (Windows'ta python3 Microsoft Store kısayolu olabilir; bu yüzden sürüm basarak sınanır)
let PY = null;
for (const ad of ['python3', 'python', 'py']) {
  const r = calis(ad, ['-I', '-c', 'import sys;print(sys.version_info[0])'], '', 8000);
  if (r.status === 0 && String(r.stdout).trim() === '3') { PY = ad; break; }
}
const BASH = (() => { const r = calis('bash', ['-n'], 'true\n', 8000); return r.status === 0 ? 'bash' : null; })();
let SQLITE = null;
try { process.removeAllListeners('warning'); SQLITE = require('node:sqlite'); } catch (e) { SQLITE = null; }
const PYYAML = PY ? calis(PY, ['-I', '-c', 'import yaml'], '', 8000).status === 0 : false;

// Python koşum betiği: mod "ders" (kodu çalıştır ya da yalnız derle), mod "alan" (veri yükle, sonuc oku). Ağ soketleri kapatılır.
const HARNESS = path.join(GECICI, 'kos.py');
fs.writeFileSync(HARNESS, [
  'import sys, json, ast, socket',
  'def _ag_yok(*a, **k): raise OSError("ağ kapalı")',
  'socket.socket.connect = _ag_yok; socket.create_connection = _ag_yok; socket.getaddrinfo = _ag_yok',
  'mod = sys.argv[1]',
  'girdi = json.loads(sys.stdin.read())',
  'kod = girdi["kod"]',
  'if mod == "derle":',
  '    ast.parse(kod); print(json.dumps({"durum": "sozdizimi"}))',
  'elif mod == "ders":',
  '    agac = ast.parse(kod)',
  '    std = sys.stdlib_module_names',
  '    dis = sorted({(a.name if isinstance(x, ast.Import) else (x.module or "")).split(".")[0] for x in ast.walk(agac) if isinstance(x, (ast.Import, ast.ImportFrom)) for a in (x.names if isinstance(x, ast.Import) else [x])} - set(std))',
  '    dis = [d for d in dis if d]',
  '    if dis: print(json.dumps({"durum": "sozdizimi", "neden": "standart dışı modül: " + ", ".join(dis)}))',
  '    else:',
  '        exec(compile(agac, "<ders>", "exec"), {"__name__": "__ders__"}); print(json.dumps({"durum": "calisti"}))',
  'elif mod == "yaml":',
  '    import yaml',
  '    class Y(yaml.SafeLoader): pass',
  '    Y.add_multi_constructor("!", lambda l, s, n: None)',
  '    yaml.load(kod, Loader=Y); print(json.dumps({"durum": "sozdizimi"}))',
  'elif mod == "alan":',
  '    import io, contextlib',
  '    ns = {"siparisler": girdi["siparisler"], "sutunlar": girdi["sutunlar"], "tablolar": girdi["tablolar"]}',
  '    tampon = io.StringIO()',
  '    with contextlib.redirect_stdout(tampon), contextlib.redirect_stderr(tampon): exec(compile(kod, "<alan>", "exec"), ns)',
  '    try: deger = json.loads(json.dumps(ns["sonuc"], default=str)); tanimli = True',
  '    except Exception: deger = None; tanimli = False',
  '    print(json.dumps({"deger": deger, "sonucTanimli": tanimli, "cikti": tampon.getvalue()[:20000]}))',
  ''
].join('\n'), 'utf8');
function py(mod, girdi) {
  const r = calis(PY, ['-I', '-X', 'utf8', HARNESS, mod], JSON.stringify(girdi), 15000);
  if (r.error && r.error.code === 'ETIMEDOUT') return { hata: 'zaman sınırı (15 sn)' };
  if (r.status !== 0) return { hata: String(r.stderr || r.stdout || 'bilinmeyen').trim().split('\n').slice(-3).join(' | ') };
  try { return JSON.parse(String(r.stdout).trim().split('\n').pop()); } catch (e) { return { hata: 'çıktı okunamadı: ' + String(r.stdout).slice(0, 120) }; }
}

/* ---------- SQL ---------- */
const SORGU = /^\s*(select|with|pragma|explain|values)\b/i;
const DERS_SEMASI = [
  'CREATE TABLE customers (id INTEGER PRIMARY KEY, ad TEXT)', 'CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, tarih TEXT, tutar REAL)',
  "INSERT INTO customers VALUES (1,'Ali'),(2,'Ayşe')", "INSERT INTO orders VALUES (1,1,'2026-09-03',10),(2,1,'2026-09-05',20),(3,2,'2026-10-01',5)"
];
function sqlCalistir(kod, hazirlik) {
  const db = new SQLITE.DatabaseSync(':memory:');
  try {
    (hazirlik || []).forEach(s => db.exec(s));
    const parcalar = kod.split(/;\s*(?:\n|$)/).map(x => x.trim()).filter(Boolean);
    let son = null;
    parcalar.forEach(p => { const st = db.prepare(p); if (SORGU.test(p)) son = st.all(); else st.run(); });
    return { satirlar: son ? son.map(r => Object.values(r)) : [], sutunlar: son && son.length ? Object.keys(son[0]) : [] };
  } finally { db.close(); }
}
function sutunTipi(satirlar, i) {
  let tip = 'TEXT';
  for (const r of satirlar) { const v = r[i]; if (v === null || v === undefined) continue; tip = typeof v === 'number' ? (Math.floor(v) === v ? 'INTEGER' : 'REAL') : 'TEXT'; break; }
  return tip;
}
function veriHazirla(v) { // alan.js veriHazirla ile aynı: '' → null
  const o = { sutunlar: v.sutunlar.slice(), satirlar: v.satirlar.map(r => r.map(x => (x === '' ? null : x))) };
  if (v.ek) { o.ek = {}; Object.keys(v.ek).forEach(ad => { const t = v.ek[ad]; o.ek[ad] = { sutunlar: t.sutunlar.slice(), satirlar: t.satirlar.map(r => r.map(x => (x === '' ? null : x))) }; }); }
  return o;
}
function alanSql(kod, veri) { // alan.js sqlCalistir ile aynı kurulum
  const v = veriHazirla(veri), db = new SQLITE.DatabaseSync(':memory:');
  try {
    db.exec('CREATE TABLE siparis (' + v.sutunlar.map((c, i) => c + ' ' + sutunTipi(v.satirlar, i)).join(', ') + ')');
    const ekle = (ad, t) => { const st = db.prepare('INSERT INTO ' + ad + ' VALUES (' + t.sutunlar.map(() => '?').join(',') + ')'); t.satirlar.forEach(r => st.run(...r)); };
    ekle('siparis', v);
    Object.keys(v.ek || {}).forEach(ad => {
      db.exec('CREATE TABLE ' + ad + ' (' + v.ek[ad].sutunlar.map((c, i) => c + ' ' + sutunTipi(v.ek[ad].satirlar, i)).join(', ') + ')');
      ekle(ad, v.ek[ad]);
    });
    const parcalar = kod.split(/;\s*(?:\n|$)/).map(x => x.trim()).filter(Boolean);
    let son = null;
    parcalar.forEach(p => {
      const st = db.prepare(p);
      if (!SORGU.test(p)) { st.run(); return; }
      const r = st.all(); /* node:sqlite (22.x) sütun listesi vermez: adlar ilk satırdan; satır yoksa sütun adı bilinmez */
      son = { sutunlar: r.length ? Object.keys(r[0]) : [], satirlar: r.map(x => Object.values(x)) };
    });
    if (!son) return { tur: 'sql', sutunlar: [], satirlar: [], kesildi: false, mesaj: 'Sorgu çalıştı ama sonuç satırı döndürmedi.' };
    return { tur: 'sql', sutunlar: son.sutunlar, satirlar: son.satirlar.slice(0, 200), kesildi: son.satirlar.length > 200 };
  } finally { db.close(); }
}
function alanPy(kod, veri) {
  const v = veriHazirla(veri), tablolar = {};
  const sozluk = (cols, rows) => rows.map(r => Object.fromEntries(cols.map((c, i) => [c, r[i]])));
  Object.keys(v.ek || {}).forEach(ad => { tablolar[ad] = sozluk(v.ek[ad].sutunlar, v.ek[ad].satirlar); });
  const r = py('alan', { kod, siparisler: sozluk(v.sutunlar, v.satirlar), sutunlar: v.sutunlar, tablolar });
  if (r.hata) return { hata: r.hata };
  return { tur: 'python', deger: r.deger, sonucTanimli: r.sonucTanimli, cikti: r.cikti };
}

/* ---------- blok toplama ---------- */
const TURLER = ['sql', 'python', 'js', 'bash', 'yaml', 'json', 'dockerfile', 'ios', 'cmd', 'text', 'graphql', 'cwli'];
function bloklar(kok, ad) { // t === 'cmd' ya da {lang, kod/text} taşıyan her nesneyi derinlemesine bulur
  const out = [];
  (function gez(o, yol) {
    if (Array.isArray(o)) return o.forEach((v, i) => gez(v, yol + '[' + i + ']'));
    if (!o || typeof o !== 'object') return;
    if (o.t === 'cmd' && typeof o.text === 'string') out.push({ kaynak: ad, yer: yol, lang: o.lang, calistirma: o.calistirma, text: o.text });
    for (const k of Object.keys(o)) gez(o[k], yol + '.' + k);
  })(kok, '');
  return out;
}
const dersBlok = [];
for (const yol of Object.keys(win.PP_LESSONS || {})) for (const no of Object.keys(win.PP_LESSONS[yol])) bloklar(win.PP_LESSONS[yol][no].blocks, 'ders').forEach(b => { b.yer = yol + '-' + no + b.yer; dersBlok.push(b); });
const ekBlok = bloklar(win.PP_EK, 'ek'), vaBlok = bloklar(win.PP_VA, 'va'), senBlok = bloklar(win.PP_SENARYO, 'senaryo');
const tmapBlok = bloklar(TMAP, 'tmap'), projeBlok = bloklar(win.PP_PROJ, 'proje');

/* ---------- blok denetimi ---------- */
function blokDene(b) { // → {durum: calisti|sozdizimi|atlandi|dustu, neden}
  if (!TURLER.includes(b.lang)) return { durum: 'dustu', neden: 'lang etiketi yok ya da bilinmiyor: ' + b.lang };
  if (b.calistirma !== undefined) {
    if (!/^atla .{12,}/.test(b.calistirma)) return { durum: 'dustu', neden: 'calistirma "atla <neden>" biçiminde değil' };
    return { durum: 'atlandi', neden: b.calistirma.slice(5) };
  }
  const t = b.text;
  try {
    if (b.lang === 'json') { JSON.parse(t.replace(/^(#[^\n]*\n)+/, '')); return { durum: 'sozdizimi' }; }
    if (b.lang === 'js') { acorn.parse(t, { ecmaVersion: 'latest', sourceType: 'module' }); return { durum: 'sozdizimi' }; }
    if (b.lang === 'bash') {
      if (!BASH) return { durum: 'atlandi', neden: 'bash bulunamadı' };
      const r = calis('bash', ['-n'], t + '\n', 8000);
      return r.status === 0 ? { durum: 'sozdizimi' } : { durum: 'dustu', neden: 'bash -n: ' + String(r.stderr).trim().split('\n')[0] };
    }
    if (b.lang === 'yaml') {
      if (!PYYAML) return { durum: 'atlandi', neden: 'PyYAML yok (yaml sözdizimi denetlenemedi)' };
      const r = py('yaml', { kod: t });
      return r.hata ? { durum: 'dustu', neden: r.hata } : { durum: 'sozdizimi' };
    }
    if (b.lang === 'dockerfile') {
      const kom = /^(FROM|RUN|CMD|LABEL|MAINTAINER|EXPOSE|ENV|ADD|COPY|ENTRYPOINT|VOLUME|USER|WORKDIR|ARG|ONBUILD|STOPSIGNAL|HEALTHCHECK|SHELL)\b/i;
      const kotu = t.split('\n').map(s => s.trim()).filter(s => s && !s.startsWith('#')).find(s => !kom.test(s) && !/\\$/.test(s));
      return kotu && !/^\s/.test(kotu) ? { durum: 'dustu', neden: 'bilinmeyen Dockerfile komutu: ' + kotu } : { durum: 'sozdizimi' };
    }
    if (b.lang === 'python') {
      if (!PY) return { durum: 'atlandi', neden: 'python 3 bulunamadı' };
      const r = py('ders', { kod: t });
      return r.hata ? { durum: 'dustu', neden: r.hata } : { durum: r.durum, neden: r.neden };
    }
    if (b.lang === 'sql') {
      if (!SQLITE) return { durum: 'atlandi', neden: 'node:sqlite yok (Node ≥ 22.5 gerekir)' };
      const r = sqlCalistir(t, DERS_SEMASI);
      return r.satirlar.length ? { durum: 'calisti' } : { durum: 'dustu', neden: 'sorgu çalıştı ama örnek şemada satır dönmedi' };
    }
  } catch (e) { return { durum: 'dustu', neden: String(e && e.message || e).split('\n')[0] }; }
  return { durum: 'dustu', neden: 'bu dil için yürütücü yok: ' + b.lang };
}

/* ====================================================================================================================== */
console.log('Yürütücüler: python=' + (PY || 'YOK') + ', bash=' + (BASH || 'YOK') + ', node:sqlite=' + (SQLITE ? 'var' : 'YOK') + ', PyYAML=' + (PYYAML ? 'var' : 'YOK'));
ok(!!win.PP_LESSONS && dersBlok.length >= 40, 'ders içeriği yüklendi: ' + dersBlok.length + ' kod bloğu (content/lessons)');

// 1) Kaynaklar ve blok sayıları (dürüst kapsam)
console.log('\nKaynak            blok');
const kaynaklar = [['ders (PP_LESSONS)', dersBlok], ['ek (PP_EK)', ekBlok], ['VA dersleri (PP_VA)', vaBlok], ['senaryo (PP_SENARYO)', senBlok], ['tmap (js/veri/tmap.js)', tmapBlok], ['proje (js/veri/proje-*.js)', projeBlok]];
kaynaklar.forEach(([a, l]) => console.log('  ' + a.padEnd(26) + l.length));
ok(TMAP && Object.keys(TMAP).length > 0 && win.PP_PROJ && win.PP_PROJ.yeni.length > 0, 'tmap ve proje verisi yüklendi (taranan kaynaklar boş değil)');
// ek/tmap/proje/VA/senaryo'da ayrı kod bloğu yok; çıkarsa etiket zorunlu olur (aşağıdaki döngü hepsini kapsar)
const tumu = [].concat(...kaynaklar.map(k => k[1]));

// 2) Her blok etiketli ve doğrulanır
const sonuc = { calisti: 0, sozdizimi: 0, atlandi: 0, dustu: 0 }; const dusenler = [], atlananlar = {}, sozdizimiNedenleri = [], dilSay = {};
for (const b of tumu) {
  const r = blokDene(b);
  sonuc[r.durum]++;
  dilSay[b.lang || '?'] = (dilSay[b.lang || '?'] || 0) + 1;
  if (r.durum === 'dustu') dusenler.push(b.kaynak + ' ' + b.yer + ' [' + b.lang + ']: ' + r.neden);
  if (r.durum === 'atlandi') atlananlar[r.neden] = (atlananlar[r.neden] || 0) + 1;
  if (r.durum === 'sozdizimi' && r.neden) sozdizimiNedenleri.push(b.yer + ' (' + r.neden + ')');
}
eq(dusenler, [], 'her kod bloğu etiketli ve (çalıştı ya da sözdizimi geçti ya da gerekçeli atlandı)');
console.log('\nBlok özeti: toplam ' + tumu.length + ' · çalıştı ' + sonuc.calisti + ' · yalnız sözdizimi/derleme ' + sonuc.sozdizimi + ' · atlandı (gerekçeli) ' + sonuc.atlandi + ' · düştü ' + sonuc.dustu);
console.log('Dile göre: ' + JSON.stringify(dilSay));
Object.keys(atlananlar).forEach(k => console.log('  atlandı ×' + atlananlar[k] + ': ' + k));
if (sozdizimiNedenleri.length) console.log('  yalnız derlendi (çalıştırılamadı): ' + sozdizimiNedenleri.join('; '));
ok(sonuc.calisti >= 3, 'en az 3 blok gerçekten çalıştırıldı (SQL/Python): ' + sonuc.calisti);
if (!PY) console.log('ATLANDI  python 3 yok: Python blokları "atlandı" sayıldı (test edilmedi)');
if (!SQLITE) console.log('ATLANDI  node:sqlite yok: SQL blokları "atlandı" sayıldı (test edilmedi)');

// 3) Etiket kuralı kendini sınar: yanlış bloklar yakalanıyor mu? (testin testi)
const kontrolBloklar = [
  [{ lang: 'json', text: '{"a": }' }, 'dustu'], [{ lang: 'bash', text: 'if then fi' }, 'dustu'], [{ lang: 'python', text: 'def f(:\n  pass' }, 'dustu'],
  [{ lang: 'js', text: 'const = ;' }, 'dustu'], [{ lang: 'sql', text: 'SELEKT 1' }, 'dustu'], [{ text: 'x' }, 'dustu'],
  [{ lang: 'text', text: 'x', calistirma: 'atla' }, 'dustu'], [{ lang: 'text', text: 'x', calistirma: 'atla e-posta metni; kod değil' }, 'atlandi'],
  [{ lang: 'json', text: '{"a": 1}' }, 'sozdizimi'], [{ lang: 'python', text: 'print(1+1)' }, 'calisti'], [{ lang: 'sql', text: 'SELECT 1 AS x' }, 'calisti']
];
for (const [b, beklenen] of kontrolBloklar) {
  if ((b.lang === 'python' && !PY) || (b.lang === 'sql' && !SQLITE) || (b.lang === 'bash' && !BASH)) continue;
  eq(blokDene(Object.assign({ yer: 'sinama' }, b)).durum, beklenen, 'sınama bloğu "' + (b.lang || 'etiketsiz') + ': ' + b.text.slice(0, 18).replace(/\n/g, '↵') + '" → ' + beklenen);
}
if (PY) { // ağ kilidi: Python bloğu ağa çıkamaz
  const r = py('ders', { kod: "import socket\ntry:\n    socket.create_connection(('example.com', 80), 2)\n    raise SystemExit('AĞ AÇIK')\nexcept OSError:\n    pass" });
  ok(!r.hata && r.durum === 'calisti', 'Python bloğunda ağ bağlantısı kurulamaz ' + JSON.stringify(r));
  const z = calis(PY, ['-I', '-c', 'while True: pass'], '', 1500);
  ok(z.error && z.error.code === 'ETIMEDOUT', 'sonsuz döngü zaman sınırıyla durdurulur');
}

// 4) Veri Analitiği alan çözümleri: gösterilen çözüm (PP_VA.alanCozum) + test çözümleri, PP.alan kontrol/varyant işleviyle, çevrimdışı
const alanlar = (win.PP_VA && win.PP_VA.alanlar) || [];
const cozumDosyalari = fs.readdirSync(__dirname).filter(f => /^va-cozumler-.*\.json$/.test(f)).flatMap(f => JSON.parse(fs.readFileSync(path.join(__dirname, f), 'utf8')));
function alanKos(a, kod) {
  const veri = a.veri || win.PP_VA.veri;
  const kos = (kodx, vx) => (a.tur === 'sql' ? alanSql(kodx, vx) : alanPy(kodx, vx));
  let r1; try { r1 = kos(kod, veri); } catch (e) { return { dogru: false, neden: 'çalışma hatası: ' + String(e.message).split('\n')[0] }; }
  if (r1.hata) return { dogru: false, neden: 'çalışma hatası: ' + r1.hata };
  let k; try { k = a.kontrol(r1, veri); } catch (e) { return { dogru: false, neden: 'kontrol çöktü: ' + e.message }; }
  if (!k || !k.dogru) return { dogru: false, neden: 'kontrol reddetti: ' + (k && k.mesaj) };
  if (typeof a.varyant === 'function') {
    let v2 = null; try { v2 = a.varyant(veri); } catch (e) { v2 = null; }
    if (v2) {
      let r2; try { r2 = kos(kod, v2); } catch (e) { return { dogru: false, neden: 'varyant verisinde çalışma hatası: ' + String(e.message).split('\n')[0] }; }
      if (r2.hata) return { dogru: false, neden: 'varyant verisinde çalışma hatası: ' + r2.hata };
      const k2 = a.kontrol(r2, v2);
      if (!k2 || !k2.dogru) return { dogru: false, neden: 'varyant verisinde kontrol reddetti (sabit değer?): ' + (k2 && k2.mesaj) };
    }
  }
  return { dogru: true };
}
const kosulabilir = alanlar.filter(a => (a.tur === 'sql' && SQLITE) || (a.tur === 'python' && PY));
let gosterilen = 0, testCozum = 0, yanlisRed = 0; const alanHata = [], atlananAlan = [];
for (const a of kosulabilir) {
  const cozum = win.PP_VA.alanCozum && win.PP_VA.alanCozum[a.id];
  if (typeof cozum === 'string') {
    const kod = cozum.split(/\n\nNeden:/)[0];
    const r = alanKos(a, kod); gosterilen++;
    if (!r.dogru) alanHata.push(a.id + ' (gösterilen çözüm): ' + r.neden);
  } else atlananAlan.push(a.id);
  const c = cozumDosyalari.find(x => x.id === a.id);
  if (c) {
    const r = alanKos(a, c.cozum); testCozum++;
    if (!r.dogru) alanHata.push(a.id + ' (test çözümü): ' + r.neden);
    for (const y of c.yanlis || []) { const q = alanKos(a, y); if (q.dogru) alanHata.push(a.id + ' yanlış cevap kabul edildi: ' + y.slice(0, 50)); else yanlisRed++; }
  }
}
eq(alanHata, [], 'VA alanları çevrimdışı çalıştırıldı: gösterilen çözüm ' + gosterilen + ', test çözümü ' + testCozum + ', reddedilen yanlış ' + yanlisRed + ' (çalıştırılabilir alan ' + kosulabilir.length + '/' + alanlar.length + ')');
if (atlananAlan.length) console.log('  çözüm metni yok (yalnız test çözümü varsa sınandı): ' + atlananAlan.join(', '));
ok(gosterilen + testCozum >= 20 || (!SQLITE && !PY), 'VA alanlarında en az 20 çözüm gerçekten çalıştırıldı (' + (gosterilen + testCozum) + ')');
const simler = alanlar.filter(a => a.tur === 'sim').length;
console.log('  çalıştırılmayan: ' + simler + ' simülasyon (tur: sim; kural kontrolü, kod çalışmaz), ' + alanlar.filter(a => a.tur === 'js').length + ' js alanı (yalnız tarayıcı işçisinde çalışır)');

console.log('\n' + n + ' kontrol, ' + fails + ' hata');
process.exit(fails ? 1 : 0);

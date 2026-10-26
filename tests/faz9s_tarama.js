// Faz 9 sunucu: sınav cevap anahtarının istemcide/içerikte KALMADIĞINI tarar + hedef tohumu tutarlılığı + gizli tohumun izlenmediği.
// Gerçek içeriği okur; gizli anahtar tohumu (supabase/seed/*_anahtar.sql) bu makinede varsa ek sızıntı taraması da çalışır (yoksa ATLANDI yazılır).
// "BİLİNEN RİSK" satırları hata sayılmaz ama rapora girer (kapsam dışı dosyalar). Hata → çıkış 1.
const fs = require('fs'), path = require('path'), vm = require('vm'), cp = require('child_process');
const acorn = require('acorn');
const T = require('../tools/cevap-anahtari.js');
const KOK = path.join(__dirname, '..');
let n = 0, fails = 0, bilinen = 0;
const ok = (c, m) => { n++; console.log((c ? 'OK    ' : 'HATA  ') + m); if (!c) fails++; };
const eq = (a, b, m) => { const s = JSON.stringify(a) === JSON.stringify(b); ok(s, m + (s ? '' : '  → beklenen ' + JSON.stringify(b) + ', gelen ' + JSON.stringify(a))); };
const risk = (m) => { bilinen++; console.log('BİLİNEN RİSK  ' + m); };
const oku = (f) => fs.readFileSync(path.join(KOK, f), 'utf8');
const norm = (s) => String(s).normalize('NFC').replace(/\s+/g, ' ').trim();
const adi = (p) => (p.key.type === 'Identifier' ? p.key.name : String(p.key.value));
function dosyalar(dir, sonek) { const out = []; (function g(d) { for (const e of fs.readdirSync(path.join(KOK, d), { withFileTypes: true })) { const r = d + '/' + e.name; if (e.isDirectory()) { if (!/node_modules|\.omc|\.git$/.test(e.name)) g(r); } else if (sonek.test(e.name)) out.push(r); } })(dir); return out; }
function gez(d, f, atalar) { atalar = atalar || []; if (!d || typeof d.type !== 'string') return; f(d, atalar); const y = atalar.concat(d); for (const k of Object.keys(d)) { const v = d[k]; if (Array.isArray(v)) v.forEach((x) => gez(x, f, y)); else if (v && typeof v === 'object' && typeof v.type === 'string') gez(v, f, y); } }
const YASAK = ['answer', 'why', 'whyNot', 'a', 'w', 'dogru', 'correct', 'cevap', 'aciklama'];

// ---- 1) Yapı taraması: id'li sınav soruları cevap alanı taşımaz; ders/VA/seviye sınav dizileri eksiksiz id'li
{
  let idli = 0; const ihlal = [], idsiz = [];
  for (const f of dosyalar('content', /\.js$/).concat(dosyalar('js', /\.js$/))) {
    const src = oku(f); let ast; try { ast = acorn.parse(src, { ecmaVersion: 'latest' }); } catch (e) { continue; }
    gez(ast, (d, atalar) => {
      if (d.type !== 'ObjectExpression') return;
      const ad = d.properties.filter((p) => p.type === 'Property').map(adi);
      const idP = d.properties.find((p) => p.type === 'Property' && adi(p) === 'id');
      if (idP && idP.value.type === 'Literal' && /^[0-9a-f]{8}$/.test(String(idP.value.value)) && ad.includes('q')) {
        idli++; const kotu = ad.filter((k) => YASAK.includes(k)); if (kotu.length) ihlal.push(f + ': ' + kotu.join(','));
      }
      // quiz / sorular dizilerinin elemanları
      const ust = atalar[atalar.length - 1], pp = atalar[atalar.length - 2];
      if (ust && ust.type === 'ArrayExpression' && pp && pp.type === 'Property') {
        const an = adi(pp);
        if (/^content\/lessons\//.test(f) && an === 'quiz' && !(idP && ad.includes('q'))) idsiz.push(f + ' quiz elemanı id\'siz');
        if (/^content\/veri-analitigi\/(seviye0|seviye1|sinav2)\.js$/.test(f) && an === 'sorular' && !(idP && ad.includes('q'))) idsiz.push(f + ' sorular elemanı id\'siz');
      }
    });
  }
  ok(idli >= 678, 'yapı taraması: id\'li sınav sorusu sayısı ≥ 678 (' + idli + ')');
  eq(ihlal, [], 'id\'li sınav sorularında cevap/açıklama alanı yok (answer, why, whyNot, a, w, dogru, correct, cevap, aciklama)');
  eq(idsiz, [], 'ders quiz ve VA sınav dizilerinde id\'siz (anahtarı hâlâ içerikte olabilecek) soru yok');
  const sv = {}; sv.window = sv; vm.createContext(sv); vm.runInContext(oku(T.SEVIYE_DOSYA), sv);
  const seviye = sv.PP_SINAV.seviye;
  ok(Object.keys(seviye).length >= 7 && Object.values(seviye).every((s) => s.sorular.length >= 6 && s.sorular.every((q) => Object.keys(q).sort().join() === 'd,id,o,q')), 'seviye sınavı: ' + Object.keys(seviye).length + ' yol, her soruda yalnız id,d,q,o');
  global.__seviye = seviye;
}

// ---- 2) Seviye sınavı soruları soru bankasından ayrıldı (yer tutucu, indeks kaymadı)
{
  const seviye = global.__seviye, qbc = {}; vm.createContext(qbc); vm.runInContext(oku('js/veri/soru-bankasi.js') + ';this.__QB=QB;', qbc);
  const QB = qbc.__QB, tomb = QB.filter((q) => q.t === '_'), sorular = Object.values(seviye).flatMap((s) => s.sorular);
  eq(tomb.length, sorular.length, 'soru bankasında yer tutucu sayısı = seviye sınavı soru sayısı (' + sorular.length + ')');
  ok(tomb.every((q) => q.q === '' && Array.isArray(q.o) && q.o.length === 0), 'yer tutucular boş (soru metni/seçenek/cevap yok)');
  const qbMetin = new Set(QB.filter((q) => q.t !== '_').map((q) => norm(q.q)));
  eq(sorular.filter((q) => qbMetin.has(norm(q.q))).map((q) => q.id), [], 'seviye sınavı sorularından HİÇBİRİ soru bankasında (cevaplı) kalmadı');
  ok(QB.length >= 346, 'soru bankası uzunluğu korunmuş (dizin kaymadı): ' + QB.length);
}

// ---- 3) Metin sızıntısı: sınav sorusu başka izlenen dosyada (cevabıyla) geçiyor mu
const sorularTum = new Map(); // id -> {q, kaynak}
{
  for (const f of dosyalar('content/lessons', /\.js$/)) {
    const w = { PP_LESSONS: {} }; w.window = w; vm.createContext(w); vm.runInContext(oku(f), w);
    for (const tr in w.PP_LESSONS) for (const no in w.PP_LESSONS[tr]) (w.PP_LESSONS[tr][no].quiz || []).forEach((q) => sorularTum.set(q.id, { q: q.q, kaynak: f, hedef: 'ders:' + tr + ':' + no + ':sinav' }));
  }
  for (const [f, k] of [['seviye0', 'sinav0'], ['seviye1', 'sinav1'], ['sinav2', 'sinav2']]) {
    const w = {}; w.window = w; vm.createContext(w); vm.runInContext(oku('content/veri-analitigi/' + f + '.js'), w);
    w.PP_VA[k].sorular.forEach((q) => sorularTum.set(q.id, { q: q.q, kaynak: 'content/veri-analitigi/' + f + '.js', hedef: w.PP_VA[k].id }));
  }
  for (const y in global.__seviye) global.__seviye[y].sorular.forEach((q) => sorularTum.set(q.id, { q: q.q, kaynak: T.SEVIYE_DOSYA, hedef: 'seviye:' + y }));
  eq(sorularTum.size, 1513, 'taranan sınav sorusu: 1422 ders (Faz 20: +67 CCNA/Ağ NetAcad hizası; Faz 19b: +115 DevOps/Kubernetes LFS158 ve KCNA; Faz 19a: +114 QA ISTQB; Faz 18: +62 Python; Faz 17b: +25 AWS SAA-C03 karşılaştırma; Faz 17: +21 AWS SAA-C03; Faz 16: +52 Security+ V8) + 21 VA + 70 seviye = 1513');
  let izlenen;
  /* izlenen + henüz eklenmemiş ama .gitignore'a takılmayan (yani commit'e girebilecek) dosyalar */
  try { izlenen = cp.execSync('git ls-files --cached --others --exclude-standard', { cwd: KOK, encoding: 'utf8' }).split('\n').filter(Boolean); } catch (e) { izlenen = null; }
  const adaylar = (izlenen || dosyalar('.', /\.(js|html|json|md|sql|txt|css)$/)).filter((f) => /\.(js|html|json|md|sql|txt|css)$/.test(f) && !/package-lock/.test(f));
  const izinli = (f) => /^content\/lessons\/[^/]+\.js$/.test(f) || f === T.SEVIYE_DOSYA || /^js\/veri\/atlas-[^/]+\.js$/.test(f) || /^content\/veri-analitigi\//.test(f);
  const bilinenDosya = (f) => /^docs\/qb_[a-z]+\.js$/.test(f);
  const yeniSizinti = [], bilinenSay = new Set();
  for (const f of adaylar) {
    let s; try { s = oku(f); } catch (e) { continue; }
    const sn = norm(s).replace(/\\"/g, '"');
    for (const [id, m] of sorularTum) {
      if (f === m.kaynak) continue;
      const a = norm(m.q); if (a.length < 25) continue;
      if (!(s.includes(m.q) || sn.includes(a))) continue;
      if (bilinenDosya(f)) bilinenSay.add(f + '#' + id); else if (!izinli(f)) yeniSizinti.push(id + ' ' + m.q.slice(0, 50) + ' → ' + f);
    }
  }
  eq(yeniSizinti, [], 'sınav sorusu metni izin verilen dosyalar dışında (QB, js/, tests/, vb.) geçmiyor');
  if (bilinenSay.size) risk('docs/qb_*.js (kapsam dışı, halka açık) ' + bilinenSay.size + ' seviye sınavı sorusunu CEVAPLARIYLA taşıyor: ' + [...new Set([...bilinenSay].map((x) => x.split('#')[0]))].join(', ') + ' — silmek/özele taşımak kullanıcı kararı');
  global.__izlenen = izlenen;
}

// ---- 4) Hedef tohumu (halka açık metadata) içerikle birebir
{
  const seedDir = 'supabase/seed', hedefDosya = fs.readdirSync(path.join(KOK, seedDir)).filter((f) => /_ogr_hedefler\.sql$/.test(f));
  eq(hedefDosya.length, 1, 'tek hedef tohumu dosyası var');
  const sql = oku(seedDir + '/' + hedefDosya[0]);
  const idler = [...sql.matchAll(/^\s*\('([^']+)', '([^']+)', (true|false), ([0-9.]+), '([^']+)', array\['([^']+)'\]::text\[\]\)/gm)].map((m) => m[1]).sort();
  const beklenen = [...new Set([...sorularTum.values()].map((m) => m.hedef))].sort();
  eq(idler, beklenen, 'hedef tohumundaki ogr_hedef kimlikleri = içerikteki sınav hedefleri (' + beklenen.length + ')');
  const kapilar = [...sql.matchAll(/\('(ders-ustalik:[a-z]+:\d+)', 'L1', 0\.8\)/g)].map((m) => m[1]).sort();
  eq(kapilar, beklenen.filter((h) => /^ders:/.test(h)).map((h) => 'ders-ustalik:' + h.split(':')[1] + ':' + h.split(':')[2]).sort(), 'her ders sınavı için bir ders-ustalik kapısı');
  const sur = [...sql.matchAll(/'(2026-10-v1)', array\['(eski-1)'\]/g)];
  ok(sur.length === idler.length, 'tüm hedeflerde sürüm 2026-10-v1 / uyumlu eski-1');
  ok(oku('js/ogrenme/program.js').includes('surum: "' + T.SURUM + '"') && /SURUM *= *"eski-1"/.test(oku('js/ogrenme/eski.js')) && T.ESKI_SURUM === 'eski-1', 'tohumdaki sürümler istemci sabitleriyle (program.js, eski.js) aynı');
  ok(!/dogru|cevap anahtar/i.test(sql.replace(/--.*$/gm, '')), 'halka açık hedef tohumunda cevap alanı yok');
}

// ---- 5) Gizli anahtar tohumu halka açık repoya girmiyor
{
  let izlenen = global.__izlenen;
  if (izlenen) {
    ok(!izlenen.some((f) => /_anahtar\.sql/.test(f)), 'git: anahtar tohumu (*_anahtar.sql) İZLENMİYOR');
    ok(izlenen.includes('supabase/seed/.gitignore') && izlenen.some((f) => /_ogr_hedefler\.sql$/.test(f)), 'git: seed/.gitignore ve public hedef tohumu izleniyor');
    let yoksayilan = false; try { cp.execSync('git check-ignore -q supabase/seed/20261018_2_ogr_anahtar.sql', { cwd: KOK }); yoksayilan = true; } catch (e) { yoksayilan = false; }
    ok(yoksayilan, 'git check-ignore: supabase/seed/*_anahtar.sql yoksayılıyor');
  } else console.log('ATLANDI  git bulunamadı: izleme denetimi yapılamadı');
}

// ---- 6) Gizli tohum bu makinedeyse: açıklama metinleri başka hiçbir izlenen dosyada geçmiyor
{
  const seedDir = path.join(KOK, 'supabase', 'seed'), anahtarDosyalari = fs.existsSync(seedDir) ? fs.readdirSync(seedDir).filter((f) => /_anahtar\.sql$/.test(f)) : [];
  if (!anahtarDosyalari.length) console.log('ATLANDI  gizli anahtar tohumu bu makinede yok: açıklama sızıntı taraması yapılmadı (özel depodan kopyalayıp yeniden çalıştırın)');
  else {
    const satirlar = anahtarDosyalari.flatMap((f) => T.anahtarSqlOku(fs.readFileSync(path.join(seedDir, f), 'utf8')));
    const metinler = []; satirlar.forEach((r) => { const a = r[5]; if (!a) return; if (a.why && a.why.length >= 30) metinler.push(a.why); if (a.whyNot) Object.values(a.whyNot).forEach((x) => { if (x.length >= 30) metinler.push(x); }); });
    ok(metinler.length > 500, 'sızıntı taraması ' + metinler.length + ' açıklama metniyle çalışıyor');
    const izlenen = global.__izlenen || dosyalar('.', /\.(js|html|json|md|sql|txt|css)$/);
    const bulunan = [], ogretimle = new Set();   // ogretimle: açıklama cümlesi dersin kendi öğretim metninde de geçiyor (içerik/veri); anahtar sızıntısı değil, bilgi olarak sayılır
    for (const f of izlenen) {
      if (!/\.(js|html|json|md|sql|txt|css)$/.test(f) || /package-lock|_anahtar\.sql/.test(f)) continue;
      let s; try { s = oku(f); } catch (e) { continue; }
      if (/^docs\/qb_[a-z]+\.js$/.test(f) || f === 'js/veri/soru-bankasi.js') continue;   // QB açıklamaları (pratik) ayrı denetlenir
      const sn = s.replace(/\\"/g, '"');
      const ogretim = /^(content|js\/veri)\//.test(f);
      for (const m of metinler) if (s.includes(m) || sn.includes(m)) { if (ogretim) ogretimle.add(f); else bulunan.push(f + ' ← ' + m.slice(0, 50)); break; }
    }
    eq(bulunan, [], 'sınav açıklamaları (why/whyNot) öğretim içeriği dışında (js kodu, tests, docs, kök dosyalar) hiçbir izlenen dosyada yok');
    console.log('BİLGİ  açıklama cümlesi dersin öğretim metniyle örtüşen dosya sayısı: ' + ogretimle.size + ' (content/, js/veri/; doğal örtüşme)');
  }
}

// ---- 7) Bilgi: sınav dışı çözümler (kapsam kararı b: istemcide kalır)
{
  const coz = fs.readdirSync(path.join(KOK, 'tests')).filter((f) => /^va-cozumler-.*\.json$/.test(f));
  const kullanan = fs.readdirSync(path.join(KOK, 'tests')).filter((f) => /\.js$/.test(f) && f !== 'faz9s_tarama.js' && fs.readFileSync(path.join(KOK, 'tests', f), 'utf8').includes('va-cozumler-'));
  console.log('BİLGİ  tests/va-cozumler-*.json: ' + coz.length + ' dosya (ders içi uygulama alanı çözümleri; sınav değil, kapsam kararı b). Kullanan testler: ' + (kullanan.join(', ') || 'yok'));
  ok(coz.length === 3, 'tests/va-cozumler-*.json 3 dosya (silinmedi; özel depoya taşıma kararı kullanıcıda)');
}

console.log(`\n${n} kontrol, ${fails} hata, ${bilinen} bilinen risk`);
process.exit(fails ? 1 : 0);

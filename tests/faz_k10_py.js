// Faz K10 / Faz 18: Python hattı (PCEP düzeyi, ders 1-16; ders 9-10 faz-k11, ders 11-16 faz-18). İçerik şeması, müfredat eşlemesi, uygulama alanı kontrolleri (elle yazılmış beklenenler), sunucu tohumu ve ders odasında alan paneli.
// Python çalıştırmak ağ (Pyodide) ister; burada yalnız kontrol/varyant mantığı ve panelin çizimi sınanır. Çalıştırma doğrulaması kod örnekleri için CPython ile elle yapıldı (rapor).
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { INIT, chromium } = require('./stub.js');
const KOK = path.join(__dirname, '..');
let n = 0, fails = 0;
const ok = (c, m) => { n++; console.log((c ? 'OK    ' : 'HATA  ') + m); if (!c) fails++; };
const eq = (a, b, m) => { const s = JSON.stringify(a) === JSON.stringify(b); ok(s, m + (s ? '' : '  → beklenen ' + JSON.stringify(b) + ', gelen ' + JSON.stringify(a))); };

(async () => {
  // ---- 1. İçerik: index.html'deki sırayla yükle ----
  const html = fs.readFileSync(path.join(KOK, 'index.html'), 'utf8');
  const win = {}, ctx = { window: win, console }; ctx.self = ctx.globalThis = win; vm.createContext(ctx);
  [...html.matchAll(/<script src="(content\/lessons\/[^"]+)"/g)].forEach(m => vm.runInContext(fs.readFileSync(path.join(KOK, m[1]), 'utf8'), ctx, { filename: m[1] }));
  const P = win.PP_LESSONS.py, A = win.PP_PY;
  eq(Object.keys(P).map(Number), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], 'py hattı: 16 ders (1-16)');
  const baslik = vm.runInNewContext('(function(){' + fs.readFileSync(path.join(KOK, 'js/sinif/sinif.js'), 'utf8').match(/var STARTER=[\s\S]*?(?=\nfunction starterTopics)/)[0] + ';return STARTER.py})()');
  eq(baslik.map(x => x[0]), ['Değişkenler ve veri türleri', 'Giriş, çıkış ve metin biçimlendirme', 'Operatörler', 'Koşullar: if, elif, else', 'Döngüler: while ve for', 'Liste ve demet (tuple)', 'Sözlük ve küme', 'Fonksiyonlar', 'Hatalar: try, except, finally', 'Dize yöntemleri', 'Ders 0: Python nedir ve nasıl çalışır', 'Mantık ve bit operatörleri', 'Basit algoritmalar', 'İç içe listeler ve liste kavrayışı', 'Özyineleme ve üreteçler', 'Test ve hata ayıklama'], 'STARTER.py: 10 konu, sırası belirli');
  const tm = vm.runInNewContext(fs.readFileSync(path.join(KOK, 'js/veri/tmap.js'), 'utf8').replace('"use strict";', '') + ';TMAP').py;
  eq(tm.map(e => e.n[0]), baslik.map(x => x[0]), 'TMAP.py başlıkları STARTER.py ile birebir (ders 1-16 eşlemesi)');
  ok(tm.every(e => e.m.length === 4 && e.f.length === 2 && e.u.length === 3 && e.p.length === 3 && e.u.every(u => u.length === 4)), 'TMAP.py: her konuda 4 terim, 2 hata satırı, 3 hızlı soru, 3 hedef');

  const alanId = new Set(A.alanlar.map(a => a.id));
  for (let no = 1; no <= 16; no++) {
    const d = P[no], k = 'py-' + no;
    const ekSoru = { 1: 3, 5: 2, 6: 3, 8: 3, 9: 3 }[no] || 0;
    ok(d.quiz.length === 8 + ekSoru, k + ': ' + (8 + ekSoru) + ' soru (8 temel + ' + ekSoru + ' Faz 18 ek konu sorusu)');
    ok(d.quiz.every(q => /^[0-9a-f]{8}$/.test(q.id) && q.answer === undefined && q.why === undefined && q.whyNot === undefined && q.options.length === 4 && new Set(q.options).size === 4), k + ': sorular sunucuya ayrılmış (id var, answer/why/whyNot içerikte yok), 4 ayrı seçenek');
    const hid = d.objectives.map(o => o.id);
    ok(d.objectives.length === 4 && d.quiz.every(q => hid.indexOf(q.obj) >= 0) && hid.every(h => d.quiz.filter(q => q.obj === h).length >= 2), k + ': 4 ölçülebilir hedef, her hedefe en az 2 soru');
    ok(d.objectives.every(o => /(bilirsin|edebilirsin|yazabilirsin|bulabilirsin|söyleyebilirsin|ayırt edebilirsin|izleyebilirsin|açıklayabilirsin|kullanabilirsin|düzeltebilirsin|yapabilirsin|kurabilirsin|tanıyıp|belirleyebilirsin|yazabilirsin)/.test(o.text)), k + ': hedefler "... yapabilirsin" fiiliyle biter');
    eq(d.prereq, no === 11 ? [] : no > 11 ? [{ 12: 3, 13: 5, 14: 6, 15: 8, 16: 9 }[no]] : no === 1 ? [] : [no - 1], k + ': önkoşul (1-10 doğrusal zincir; Ders 0 önkoşulsuz; 12-16 ilgili temel ders)');
    const kod = d.blocks.filter(b => b.t === 'cmd' && b.lang === 'python' && !b.calistirma);
    ok(kod.length >= 2, k + ': en az 2 çalıştırılabilir Python örneği (' + kod.length + ')');
    const alan = d.blocks.filter(b => b.t === 'alan');
    ok(alan.length === 1 && alanId.has(alan[0].id) && alan[0].id.indexOf(k + '-') === 0, k + ': tek "alan" bloğu ve tanımı var (' + (alan[0] && alan[0].id) + ')');
    const bozuk = d.blocks.findIndex(b => b.t === 'h' && /Bozuk kodu bul/.test(b.text));
    ok(bozuk >= 0 && d.blocks[bozuk + 1].t === 'steps' && d.blocks[bozuk + 1].items.length >= 3 && d.blocks[bozuk + 1].items.every(s => s.indexOf('→') > 0), k + ': hata ayıklama bölümü (bozuk → düzeltilmiş, ≥3 madde)');
    ok(/^2026-10-2[456]$/.test(d.sonDogrulama) && d.surum === '2026-10-v1' && d.summary.length >= 3 && d.summary.length <= 5 && d.minutes >= 25, k + ': sonDogrulama, surum, özet (3-5), süre');
    ok(d.sources.length >= 2 && d.sources.every(s => /^https:\/\/(docs\.python\.org|pythoninstitute\.org)\//.test(s.url)), k + ': kaynaklar resmî (docs.python.org / pythoninstitute.org)');
  }

  // ---- 2. Uygulama alanı: elle yazılmış beklenenler (bağımsız) + varyant sabit değeri yakalar ----
  const V = A.veri;
  eq(V.satirlar.map(r => r[0]), ['kalem', 'defter', 'silgi', 'cetvel', 'makas'], 'alan verisi: 5 sipariş');
  const beklenen = {
    'py-1-tutar': 90,
    'py-2-fis': 'kalem: 12 adet, 7.50 TL',
    'py-3-koli': [5, 7],
    'py-4-etiket': ['toptan', 'az', 'toptan', 'normal', 'normal'],
    'py-5-ciro': 588,
    'py-6-liste': [['cetvel', 'defter', 'kalem', 'makas', 'silgi'], ['makas', 45.5]],
    'py-7-sozluk': [{ kalem: 12, defter: 4, silgi: 30, cetvel: 6, makas: 5 }, 4],
    'py-8-islev': [227.5, 'makas'],
    'py-9-hatali': [64, 1],
    'py-10-satir': [['kalem', 'defter', 'silgi', 'cetvel', 'makas'], 588],
    'py-11-tur': ['int', 'float', 'str'],
    'py-12-bit': [4, 1],
    'py-13-sirala': [[4, 5, 6, 12, 30], 6],
    'py-14-tablo': [['kalem', 90], ['silgi', 97.5], ['cetvel', 45]],
    'py-15-ozyin': [57, 90, 128],
    'py-16-ortalama': 11.4
  };
  eq(A.alanlar.map(a => a.id), Object.keys(beklenen), 'alan sırası: ders 1-16, her derste 1 alan');
  A.alanlar.forEach(a => {
    const dogru = (s, v) => a.kontrol({ sonucTanimli: s !== undefined, deger: s }, v).dogru;
    ok(a.tur === 'python' && typeof a.kontrol === 'function' && typeof a.varyant === 'function' && a.ipucu.length === 3 && /\n\nNeden:/.test(a.cozum), a.id + ': tanım tam (tür python, kontrol, varyant, 3 kademeli ipucu, gerekçeli çözüm)');
    ok(dogru(beklenen[a.id], V), a.id + ': elle hesaplanan doğru sonuç geçer');
    ok(!dogru(undefined, V) && !dogru(null, V) && !dogru('yanlış', V), a.id + ': tanımsız / boş / yanlış sonuç geçmez');
    ok(!dogru(beklenen[a.id], a.varyant(V)), a.id + ': varyant verisinde sabit (eski) sonuç geçmez (sabit değer yazan çözüm yakalanır)');
  });

  // ---- 3. Sunucu tohumu (halka açık): hedef metadata var, cevap yok ----
  const tohum = fs.readFileSync(path.join(KOK, 'supabase', 'seed', '20261018_1_ogr_hedefler.sql'), 'utf8');
  const say = (re) => (tohum.match(re) || []).length;
  eq([say(/\('ders:py:([1-9]|1[0-6]):sinav', 'yet:py:([1-9]|1[0-6])'/g), say(/\('ders-ustalik:py:([1-9]|1[0-6])', 'L1'/g), say(/\('ders-ustalik:py:([1-9]|1[0-6])', 'ders:py:([1-9]|1[0-6]):sinav'\)/g)], [16, 16, 16], 'hedef tohumu: 16 hedef + 16 kapı + 16 kapı-hedef (py)');
  ok(!/ogr_cevap_anahtari/.test(tohum), 'hedef tohumunda cevap anahtarı yok');
  const gitignore = fs.readFileSync(path.join(KOK, 'supabase', 'seed', '.gitignore'), 'utf8');
  ok(/^ek-k\*\.sql$/m.test(gitignore) && /^!ek-k\*-hedef\.sql$/m.test(gitignore), 'seed .gitignore: ek-k*.sql (anahtar) dışarıda, yalnız *-hedef.sql izlenebilir');

  // ---- 4. Tarayıcı: hat tanımlı, dersler açılır, alan paneli çizilir ----
  const b = await chromium.launch(), c = await b.newContext({ viewport: { width: 390, height: 844 } });
  await c.addInitScript(INIT); await c.addInitScript("localStorage.ya_gm_seen='1';");
  const p = await c.newPage(), errs = []; p.on('pageerror', e => { errs.push(e.message); console.log('PAGEERR ' + e.message); });
  await p.goto(require('url').pathToFileURL(path.join(KOK, 'index.html')).href + '#ders'); await p.waitForTimeout(3500);
  const ev = (f, a) => p.evaluate(f, a);
  eq(await ev(() => [TRKS.indexOf('py') >= 0, TRN.py, TRK.py.cert, ROSTER.py.every(i => !!CH[i]), starterTopics('py').length]), [true, 'Python', 'Python Institute PCEP', true, 16], 'hat tanımlı: TRKS, ad, sertifika, koç kadrosu, 16 konu');
  for (let no = 1; no <= 16; no++) {
    const r = await ev(async (no) => {
      const l = lessonForTopic('py', 's-py-' + no); if (!S.lessons.some(x => x.id === l.id)) S.lessons.push(l);
      S.les.track = 'py'; lcSet(lessonKey(l), 'w', 'py'); lrClose(); lrOpen(l, 'anlat'); await new Promise(r => setTimeout(r, 60));
      const al = document.querySelectorAll('[data-alan]'), pa = document.querySelector('[data-alan="' + PP_PY.alanlar[no - 1].id + '"]');
      return { baslik: l.title, ders: !!document.querySelector('.lr-sec'), say: [...al].filter(e => e.getAttribute('data-alan-tur')).length, tur: pa && pa.getAttribute('data-alan-tur'),
        kod: !!(pa && pa.querySelector('textarea[data-alan-kod]')), dugme: !!(pa && pa.querySelector('button[data-alan="calistir"]')), tasma: document.documentElement.scrollWidth <= innerWidth + 1, sabit: l.quiz ? l.quiz.length : 0 };
    }, no);
    ok(r.ders && r.say === 1 && r.tur === 'python' && r.kod && r.dugme, 'py-' + no + ' (' + r.baslik + '): ders odasında Python alanı çizildi (kod kutusu + Çalıştır)');
    ok(r.tasma, 'py-' + no + ': 390 px yatay taşma yok');
  }
  eq(errs, [], 'sayfa hatası yok');
  await b.close();
  console.log('\n' + n + ' kontrol, ' + fails + ' hata'); process.exit(fails ? 1 : 0);
})();

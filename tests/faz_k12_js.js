// Faz K12: JavaScript hattı (ders 1-8). İçerik şeması, müfredat eşlemesi, uygulama alanı kontrolleri (elle yazılmış beklenenler), sunucu tohumu ve ders odasında alan paneli.
// JS alanı yerel çalışır; burada kontrol/varyant mantığı ve panelin çizimi sınanır. Kod örneklerinin çıktıları node ile doğrulandı (rapor).
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
  const P = win.PP_LESSONS.js, A = win.PP_JS;
  eq(Object.keys(P).map(Number), [1, 2, 3, 4, 5, 6, 7, 8], 'js hattı: 8 ders (1-8)');
  const baslik = vm.runInNewContext('(function(){' + fs.readFileSync(path.join(KOK, 'js/sinif/sinif.js'), 'utf8').match(/var STARTER=[\s\S]*?(?=\nfunction starterTopics)/)[0] + ';return STARTER.js})()');
  eq(baslik.map(x => x[0]), ['Değişkenler ve veri türleri (let/const)', 'Metin ve şablon dizesi', 'Operatörler ve karşılaştırma (== ve ===)', 'Koşullar: if, else if, else', 'Döngüler: for, while, for...of', 'Dizi yöntemleri: map, filter, forEach', 'Nesneler', 'Fonksiyonlar ve ok fonksiyonları'], 'STARTER.js: 8 konu, sırası belirli');
  const tm = vm.runInNewContext(fs.readFileSync(path.join(KOK, 'js/veri/tmap.js'), 'utf8').replace('"use strict";', '') + ';TMAP').js;
  eq(tm.map(e => e.n[0]), baslik.map(x => x[0]), 'TMAP.js başlıkları STARTER.js ile birebir (ders 1-8 eşlemesi)');
  ok(tm.length === 8 && tm.every(e => e.m.length === 4 && e.f.length === 2 && e.u.length === 3 && e.p.length === 3 && e.u.every(u => u.length === 4)), 'TMAP.js: her konuda 4 terim, 2 hata satırı, 3 hızlı soru, 3 hedef');

  const alanId = new Set(A.alanlar.map(a => a.id));
  for (let no = 1; no <= 8; no++) {
    const d = P[no], k = 'js-' + no;
    ok(d.quiz.length === 8, k + ': 8 soru');
    ok(d.quiz.every(q => /^[0-9a-f]{8}$/.test(q.id) && q.answer === undefined && q.why === undefined && q.whyNot === undefined && q.options.length === 4 && new Set(q.options).size === 4), k + ': sorular sunucuya ayrılmış (id var, answer/why/whyNot içerikte yok), 4 ayrı seçenek');
    const hid = d.objectives.map(o => o.id);
    ok(d.objectives.length === 4 && d.quiz.every(q => hid.indexOf(q.obj) >= 0) && hid.every(h => d.quiz.filter(q => q.obj === h).length === 2), k + ': 4 ölçülebilir hedef, her hedefe tam 2 soru');
    ok(d.objectives.every(o => /(bilirsin|edebilirsin|yazabilirsin|bulabilirsin|söyleyebilirsin|ayırt edebilirsin|izleyebilirsin|açıklayabilirsin|kullanabilirsin|düzeltebilirsin|yapabilirsin|kurabilirsin|tanıyıp|belirleyebilirsin)/.test(o.text)), k + ': hedefler "... yapabilirsin" fiiliyle biter');
    eq(d.prereq, no === 1 ? [] : [no - 1], k + ': önkoşul bir önceki ders (doğrusal zincir)');
    const kod = d.blocks.filter(b => b.t === 'cmd' && b.lang === 'javascript' && !b.calistirma);
    ok(kod.length >= 2, k + ': en az 2 çalıştırılabilir JavaScript örneği (' + kod.length + ')');
    const alan = d.blocks.filter(b => b.t === 'alan');
    ok(alan.length === 1 && alanId.has(alan[0].id) && alan[0].id.indexOf(k + '-') === 0, k + ': tek "alan" bloğu ve tanımı var (' + (alan[0] && alan[0].id) + ')');
    const bozuk = d.blocks.findIndex(b => b.t === 'h' && /Bozuk kodu bul/.test(b.text));
    ok(bozuk >= 0 && d.blocks[bozuk + 1].t === 'steps' && d.blocks[bozuk + 1].items.length >= 3 && d.blocks[bozuk + 1].items.every(s => s.indexOf('→') > 0), k + ': hata ayıklama bölümü (bozuk → düzeltilmiş, ≥3 madde)');
    ok(d.sonDogrulama === '2026-10-25' && d.surum === '2026-10-v1' && d.summary.length >= 3 && d.summary.length <= 5 && d.minutes >= 25, k + ': sonDogrulama, surum, özet (3-5), süre');
    ok(d.sources.length >= 2 && d.sources.every(s => /^https:\/\/(developer\.mozilla\.org|tc39\.es)\//.test(s.url)), k + ': kaynaklar resmî (developer.mozilla.org / tc39.es)');
  }

  // ---- 2. Uygulama alanı: elle yazılmış beklenenler (bağımsız) + varyant sabit değeri yakalar ----
  const V = A.veri;
  eq(V.satirlar.map(r => r[0]), ['kalem', 'defter', 'silgi', 'cetvel', 'makas'], 'alan verisi: 5 sipariş');
  const beklenen = {
    'js-1-tutar': 90,
    'js-2-fis': 'kalem: 12 adet, 7.50 TL',
    'js-3-esik': [1, 0],
    'js-4-etiket': ['toptan', 'az', 'toptan', 'normal', 'normal'],
    'js-5-ciro': 588,
    'js-6-liste': [['cetvel', 'defter', 'kalem', 'makas', 'silgi'], ['makas', 45.5]],
    'js-7-nesne': [{ kalem: 12, defter: 4, silgi: 30, cetvel: 6, makas: 5 }, 4],
    'js-8-islev': [227.5, 'makas']
  };
  eq(A.alanlar.map(a => a.id), Object.keys(beklenen), 'alan sırası: ders 1-8, her derste 1 alan');
  A.alanlar.forEach(a => {
    const dogru = (s, v) => a.kontrol({ sonucTanimli: s !== undefined, deger: s }, v).dogru;
    ok(a.tur === 'js' && typeof a.kontrol === 'function' && typeof a.varyant === 'function' && a.ipucu.length === 3 && /\n\nNeden:/.test(a.cozum), a.id + ': tanım tam (tür js, kontrol, varyant, 3 kademeli ipucu, gerekçeli çözüm)');
    ok(dogru(beklenen[a.id], V), a.id + ': elle hesaplanan doğru sonuç geçer');
    ok(!dogru(undefined, V) && !dogru(null, V) && !dogru('yanlış', V), a.id + ': tanımsız / boş / yanlış sonuç geçmez');
    ok(!dogru(beklenen[a.id], a.varyant(V)), a.id + ': varyant verisinde sabit (eski) sonuç geçmez (sabit değer yazan çözüm yakalanır)');
    // çözüm kodunu gerçekten çalıştır (tarayıcıdaki new Function sözleşmesi): hem özgün hem varyant veride kontrol geçmeli
    const kod = a.cozum.split('\n\nNeden:')[0], calis = (v) => { const d = new Function('veri', 'console', '"use strict";\n' + kod)(JSON.parse(JSON.stringify(v)), { log() { } }); return JSON.parse(JSON.stringify(d)); };
    const Vv = a.varyant(V);
    ok(dogru(calis(V), V) && dogru(calis(Vv), Vv), a.id + ': cozum kodu çalıştırılınca özgün ve varyant veride kontrolü geçer');
  });

  // ---- 3. Sunucu tohumu (halka açık): hedef metadata var, cevap yok ----
  const tohum = fs.readFileSync(path.join(KOK, 'supabase', 'seed', '20261018_1_ogr_hedefler.sql'), 'utf8');
  const say = (re) => (tohum.match(re) || []).length;
  eq([say(/\('ders:js:[1-8]:sinav', 'yet:js:[1-8]'/g), say(/\('ders-ustalik:js:[1-8]', 'L1'/g), say(/\('ders-ustalik:js:[1-8]', 'ders:js:[1-8]:sinav'\)/g)], [8, 8, 8], 'hedef tohumu: 8 hedef + 8 kapı + 8 kapı-hedef (js)');
  ok(!/ogr_cevap_anahtari/.test(tohum), 'hedef tohumunda cevap anahtarı yok');
  const gitignore = fs.readFileSync(path.join(KOK, 'supabase', 'seed', '.gitignore'), 'utf8');
  ok(/^ek-k\*\.sql$/m.test(gitignore) && /^!ek-k\*-hedef\.sql$/m.test(gitignore), 'seed .gitignore: ek-k*.sql (anahtar) dışarıda, yalnız *-hedef.sql izlenebilir');

  // ---- 4. Tarayıcı: hat tanımlı, dersler açılır, alan paneli çizilir ----
  const b = await chromium.launch(), c = await b.newContext({ viewport: { width: 390, height: 844 } });
  await c.addInitScript(INIT); await c.addInitScript("localStorage.ya_gm_seen='1';");
  const p = await c.newPage(), errs = []; p.on('pageerror', e => { errs.push(e.message); console.log('PAGEERR ' + e.message); });
  await p.goto(require('url').pathToFileURL(path.join(KOK, 'index.html')).href + '#ders'); await p.waitForTimeout(3500);
  const ev = (f, a) => p.evaluate(f, a);
  eq(await ev(() => [TRKS.indexOf('js') >= 0, TRN.js, !!TRK.js, ROSTER.js.every(i => !!CH[i]), starterTopics('js').length]), [true, 'JavaScript', true, true, 8], 'hat tanımlı: TRKS, ad, hat kaydı, koç kadrosu, 8 konu');
  for (let no = 1; no <= 8; no++) {
    const r = await ev(async (no) => {
      const l = lessonForTopic('js', 's-js-' + no); if (!S.lessons.some(x => x.id === l.id)) S.lessons.push(l);
      S.les.track = 'js'; lcSet(lessonKey(l), 'w', 'js'); lrClose(); lrOpen(l, 'anlat'); await new Promise(r => setTimeout(r, 60));
      const al = document.querySelectorAll('[data-alan]'), pa = document.querySelector('[data-alan="' + PP_JS.alanlar[no - 1].id + '"]');
      return { baslik: l.title, ders: !!document.querySelector('.lr-sec'), say: [...al].filter(e => e.getAttribute('data-alan-tur')).length, tur: pa && pa.getAttribute('data-alan-tur'),
        kod: !!(pa && pa.querySelector('textarea[data-alan-kod]')), dugme: !!(pa && pa.querySelector('button[data-alan="calistir"]')), tasma: document.documentElement.scrollWidth <= innerWidth + 1, sabit: l.quiz ? l.quiz.length : 0 };
    }, no);
    ok(r.ders && r.say === 1 && r.tur === 'js' && r.kod && r.dugme, 'js-' + no + ' (' + r.baslik + '): ders odasında JS alanı çizildi (kod kutusu + Çalıştır)');
    ok(r.tasma, 'js-' + no + ': 390 px yatay taşma yok');
  }
  eq(errs, [], 'sayfa hatası yok');
  await b.close();
  console.log('\n' + n + ' kontrol, ' + fails + ' hata'); process.exit(fails ? 1 : 0);
})();

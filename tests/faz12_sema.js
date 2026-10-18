// Faz 12 V1: ders şeması isteğe bağlı alanları gerçek sayfada (390 px): hedefler ders başında, özet okuma sonunda,
// whyNot yalnız mini sınavda YANLIŞ cevaptan sonra ve yalnız seçilen seçenek için, "son doğrulama" etiketi ve 6 ay bayat uyarısı.
// Pilot dersler (bk-1..3, ccna-1..3, sec-1..3, eng-1) alanlı; diğer dersler eski haliyle (alan yok) görünür.
// Beklenenler elle yazıldı (content/lessons içeriğinden okunmaz).
const path = require('path');
const { INIT, chromium } = require('./stub.js');
const { SAHTE_INIT } = require('./sunucu_sahte.js');
const U = require('url').pathToFileURL(path.join(__dirname, '..', 'index.html')).href;
let fails = 0;
const ok = (c, m) => { console.log((c ? 'OK    ' : 'HATA  ') + m); if (!c) fails++; };
const eq = (a, b, m) => { const s = JSON.stringify(a) === JSON.stringify(b); ok(s, m + (s ? '' : '  → beklenen ' + JSON.stringify(b) + ', gelen ' + JSON.stringify(a))); };

(async () => {
  const b = await chromium.launch(), ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.addInitScript(INIT); await ctx.addInitScript(SAHTE_INIT); await ctx.addInitScript("localStorage.ya_gm_seen='1';");
  const p = await ctx.newPage(), errs = []; p.on('pageerror', e => { errs.push(e.message); console.log('PAGEERR ' + e.message); });
  await p.goto(U + '#ders'); await p.waitForTimeout(3500);
  const ev = (f, a) => p.evaluate(f, a);
  const ac = (t, n, adim) => ev(([t, n, adim]) => { const l = lessonForTopic(t, 's-' + t + '-' + n); if (!S.lessons.some(x => x.id === l.id)) S.lessons.push(l); S.les.track = t; lcSet(lessonKey(l), 'w', t); lrOpen(l, adim); return !!l; }, [t, n, adim]);
  const tasma = () => ev(() => document.documentElement.scrollWidth <= innerWidth + 1);
  const hedef = () => ev(() => [...document.querySelectorAll('[data-ders-hedef] li')].map(e => e.textContent));
  const ozet = () => ev(() => [...document.querySelectorAll('[data-ders-ozet] li')].map(e => e.textContent));

  // 1) Anlatım: pilot derste hedefler (başta) ve özet (okuma panelinden sonra); eski derste ikisi de yok
  ok(await ac('bk', 1, 'anlat'), 'bk-1 dersi bulundu'); await p.waitForTimeout(300);
  eq((await hedef()).length, 4, 'bk-1 anlatımı: 4 hedef görünür');
  ok((await hedef())[1].startsWith('Bir durum kodunun ailesine bakarak'), 'bk-1: ikinci hedef metni doğru');
  eq((await ozet()).length, 5, 'bk-1 anlatımı: 5 maddelik özet görünür');
  ok(await ev(() => { const h = document.querySelector('[data-ders-hedef]'), r = document.querySelector('.lr-read'), o = document.querySelector('[data-ders-ozet]'); return !!(h && r && o) && !!(h.compareDocumentPosition(r) & Node.DOCUMENT_POSITION_FOLLOWING) && !!(r.compareDocumentPosition(o) & Node.DOCUMENT_POSITION_FOLLOWING); }), 'sıra: hedefler → ders metni → özet');
  ok(await ev(() => /Dersin sonunda şunları yapabilirsin/.test(document.querySelector('[data-ders-hedef]').textContent)), 'hedef kutusunun etiketi okunur');
  ok(await tasma(), 'bk-1: 390 px yatay taşma yok');
  await ac('bk', 30, 'anlat'); await p.waitForTimeout(250);
  eq([(await hedef()).length, (await ozet()).length], [0, 0], 'bk-30 (alan henüz yok): hedef ve özet kutusu yok, ders eski haliyle');
  ok(await ev(() => document.querySelectorAll('.lr-read').length === 1), 'bk-30: ders metni yine görünür');

  // 2) Mini sınav (Faz 9 sunucu): cevap anahtarı istemcide yok; şıklar seçilir, sunucuya gönderilir. Sunucu GEÇİNCE doğru cevabı ve whyNot'u açar,
  //    KALINCA hiçbir şey açmaz. whyNot yalnız yanlış seçilen seçenek için görünür. (Sentetik sunucu: tests/sunucu_sahte.js — gerçek anahtar repoda yok.)
  await ac('bk', 1, 'sinav'); await p.waitForTimeout(300);
  const tikla = (soru, secenek) => ev(([s, j]) => document.querySelectorAll('.qz')[s].querySelectorAll('.qz-o')[j].click(), [soru, secenek]);
  const neden = (soru) => ev((s) => { const e = document.querySelectorAll('.qz')[s].querySelector('[data-whynot]'); return e ? e.textContent : null; }, soru);
  const plan = await ev(() => { const l = lessonForTopic('bk', 's-bk-1'); return l.quiz.map(q => { const d = q.options.indexOf(window.__sentetikDogru(q)); return { dogru: d, yanlis: q.options.findIndex((x, i) => i !== d) }; }); });
  const gonder = () => ev(() => document.querySelector('[data-sunucu-gonder]').click());
  ok(await ev(() => !document.querySelector('.qz-fb') && document.querySelectorAll('.qz-o').length > 0), 'mini sınav açılışında hiçbir doğru cevap/açıklama görünmez');
  eq(await ev(() => document.querySelector('[data-sunucu-gonder]').disabled), true, 'tüm sorular cevaplanmadan gönder düğmesi kapalı');
  // 2a) KALMA: 6 sorudan 3'ü yanlış → sunucu açmaz
  for (let i = 0; i < plan.length; i++) await tikla(i, i < 3 ? plan[i].yanlis : plan[i].dogru);
  await gonder(); await p.waitForTimeout(500);
  eq(await ev(() => document.querySelector('[data-kapi]').dataset.kapi), 'kaldi', 'yanlışlar çoğunlukta: sunucu kararı kaldı');
  ok(await ev(() => !document.querySelector('.qz-fb') && !document.querySelector('[data-whynot]') && !/Doğrusu/.test(document.querySelector('#ls-sinav').textContent)), 'kalınca doğru cevap ve nedenleri sızmaz');
  // 2b) GEÇME: ilk soru yanlış (açıklaması olan ilk yanlış şık), kalanı doğru → 5/6 ≥ %80
  await ev(() => document.querySelector('.qz-res button.btn').click()); await p.waitForTimeout(200);
  for (let i = 0; i < plan.length; i++) await tikla(i, i === 1 ? plan[i].yanlis : plan[i].dogru);
  await gonder(); await p.waitForTimeout(500);
  eq(await ev(() => document.querySelector('[data-kapi]').dataset.kapi), 'gecti', 'geçilince sunucu kararı geçti');
  const n1 = await neden(1);
  ok(n1 && /Seçtiğin cevap neden olmadı: /.test(n1) && /sentetik neden/.test(n1), 'yanlış cevap (geçtikten sonra): seçilen seçeneğin nedeni gösterilir');
  ok(await ev(() => /Doğrusu: /.test(document.querySelectorAll('.qz')[1].querySelector('.qz-fb').textContent)), 'geçilince doğru cevap ve genel açıklama sunucudan görünür');
  eq(await neden(0), null, 'doğru cevapta whyNot satırı yok');
  ok(await tasma(), 'bk-1 mini sınav: 390 px yatay taşma yok');
  // pilot dışı soru (whyNot alanı yok): neden satırı üretilmez; alanlı soruda yalnız yanlış seçenek için üretilir
  const fn = await ev(() => { const q = { options: ['A', 'B', 'C'], answer: 'A', why: 'w' }, w = { options: ['A', 'B', 'C'], answer: 'A', why: 'w', whyNot: { B: 'b nedeni' } }; return [qzWhyNot(q, 'B'), qzWhyNot(w, 'B'), qzWhyNot(w, 'A'), qzWhyNot(w, 'C'), qzWhyNot(null, 'B')]; });
  eq(fn, [null, 'b nedeni', null, null, null], 'qzWhyNot: alan yoksa null; yalnız yanlış ve açıklanmış seçenek için metin');
  eq(await ev(() => [lrHedefler({}), lrOzet({}), lrOzet({ summary: [] }), lrHedefler({ objectives: [] })]), [null, null, null, null], 'alanı olmayan derste hedef ve özet kutusu üretilmez');

  // 3) "son doğrulama" etiketi: güncel / bayat (6 ay) / yok
  const etiket = await ev(() => {
    const bugun = PP.ogr.gun.bugun(), eski = PP.ogr.gun.ekle(bugun, -200), yeni = PP.ogr.gun.ekle(bugun, -10);
    const f = (l) => { const e = lrDogrulama(l); return e ? { metin: e.textContent, durum: e.dataset.dogrulama } : null; };
    return { yok: f({}), gecersiz: f({ sonDogrulama: 'dün' }), yeni: f({ sonDogrulama: yeni, surum: '2.1' }), eski: f({ sonDogrulama: eski }), yeniTarih: yeni, eskiTarih: eski };
  });
  eq(etiket.yok, null, 'son doğrulama yoksa etiket yok');
  eq(etiket.gecersiz, null, 'geçersiz tarihte etiket yok (hata vermez)');
  eq(etiket.yeni, { metin: 'son doğrulama: ' + etiket.yeniTarih + ' · sürüm 2.1', durum: 'guncel' }, '10 günlük doğrulama: güncel etiket, sürüm yazılı');
  ok(etiket.eski && etiket.eski.durum === 'bayat' && /6 aydan eski/.test(etiket.eski.metin) && etiket.eski.metin.startsWith('son doğrulama: ' + etiket.eskiTarih), '200 günlük doğrulama: bayat uyarısı (6 aydan eski) görünür');

  // 4) Kayıtlı eski ders (yeni alan yok) cleanLesson'dan geçer: alanlar boş, hata yok; yeni alanlar geçerliyse korunur
  const temiz = await ev(() => {
    const eski = cleanLesson({ track: 'bk', title: 'x', quiz: [{ q: 'S?', options: ['A', 'B'], answer: 'A', why: 'w' }], blocks: [] });
    const yeni = cleanLesson({ track: 'bk', title: 'x', objectives: ['a', 'b'], summary: ['1', '2', '3'], minutes: 12, quiz: [{ q: 'S?', options: ['A', 'B'], answer: 'A', why: 'w', obj: 'h1', whyNot: { B: 'neden', C: 5 } }], blocks: [] });
    return { eski: [eski.objectives, eski.summary, eski.minutes, eski.quiz[0].whyNot === undefined], yeni: [yeni.objectives.map(x => x.id), yeni.summary.length, yeni.minutes, yeni.quiz[0].obj, yeni.quiz[0].whyNot] };
  });
  eq(temiz.eski, [[], [], 0, true], 'eski ders cleanLesson sonrası: hedef/özet boş, whyNot yok');
  eq(temiz.yeni, [['h1', 'h2'], 3, 12, 'h1', { B: 'neden' }], 'yeni alanlar korunur; metin olmayan whyNot girdisi atılır');
  ok(await ev(() => { const l = { blocks: [{ text: 'a b c', h: '', items: [], parts: [] }], quiz: [], interview: [], minutes: 17 }; return lessonMinutes(l) === 17; }), 'minutes alanı varsa tahmini süre onu kullanır');

  ok(errs.length === 0, 'sayfa hatası yok ' + errs.join('|'));
  await b.close();
  console.log(fails ? '\nKALDI: ' + fails : '\nGEÇTİ');
  process.exit(fails ? 1 : 0);
})();

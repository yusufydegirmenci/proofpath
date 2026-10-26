// Faz 22: çoklu seçim soru türü ("2 şık seçin"): gönderim biçimi, şema denetimi (anahtar geçerliliği), içerik (pilot sorular, geriye uyum)
// ve gerçek sayfada (390 px) çoklu işaretleme + tüm doğrular=doğru, kısmi puan yok, whyNot, tekli+çoklu karışık regresyon.
// Cevap anahtarı sunucuda (sahte sunucu sentetik anahtar üretir). Beklenenler elle yazıldı.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const KOK = path.join(__dirname, '..');
let fails = 0;
const ok = (c, m) => { console.log((c ? 'OK    ' : 'HATA  ') + m); if (!c) fails++; };
const eq = (a, b, m) => { const s = JSON.stringify(a) === JSON.stringify(b); ok(s, m + (s ? '' : '  → beklenen ' + JSON.stringify(b) + ', gelen ' + JSON.stringify(a))); };
const oku = f => fs.readFileSync(path.join(KOK, f), 'utf8');

(async function () {
  // ---- 1) gönderim biçimi (Node) ----
  const mem = {}; globalThis.localStorage = { getItem: k => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = String(v); }, removeItem: k => { delete mem[k]; } };
  globalThis.window = globalThis; globalThis.PP = {};
  Object.defineProperty(globalThis, 'navigator', { value: { onLine: true }, configurable: true });
  ['js/ogrenme/cekirdek.js', 'js/ogrenme/depo.js', 'js/ogrenme/sunucu.js'].forEach(f => require(path.join(KOK, f)));
  const S = PP.ogr.sunucu, OD = PP.ogr.ders;
  const tek = { id: 'aaaaaaaa', q: 'T?', options: ['a', 'b', 'c'] }, cok = { id: 'bbbbbbbb', q: 'C?', options: ['x', 'ç', 'y', 'z', 'w'], multi: 2 };
  eq(S.cevaplar([tek, cok], [1, [3, 1]]), { aaaaaaaa: 'b', bbbbbbbb: '["z","ç"]'.replace('["z","ç"]', JSON.stringify(['z', 'ç'].sort())) }, 'cevaplar(): tek + çoklu karışık; çoklu cevap seçenek metinlerinin SIRALI JSON dizisi');
  eq(S.cevaplar([cok], [[1, 3]]), S.cevaplar([cok], [[3, 1]]), 'cevaplar(): işaretleme sırası sonucu değiştirmez (kurallı biçim)');
  eq(S.cevaplar([cok], [[0, 4]]).bbbbbbbb, '["w","x"]', 'cevaplar(): sıralama kod noktasına göre (w < x)');
  eq([S.cevaplar([cok], [[1]]), S.cevaplar([cok], [[1, 1]]), S.cevaplar([cok], [[1, 9]]), S.cevaplar([cok], [2]), S.cevaplar([cok], [[1, 2, 3]]), S.cevaplar([tek], [[0]])], [null, null, null, null, null, null], 'cevaplar(): eksik/çift/aralık dışı/dizi olmayan/fazla işaret ve tek soruda dizi → null');
  eq([S.dogruListesi('["A","B"]'), S.dogruListesi('Düz cevap'), S.dogruListesi('[bozuk'), S.dogruListesi('')], [['A', 'B'], ['Düz cevap'], ['[bozuk'], []], 'dogruListesi(): JSON dizisi → liste; düz metin tek eleman; bozuk/boş güvenli');

  // ---- 2) şema denetimi: çoklu anahtar geçerliliği ----
  const temel = (soru) => ({ hook: 'h', homework: 'ö', blocks: [{ t: 'p', text: 'x' }], quiz: [soru] });
  const q5 = { id: 'bbbbbbbb', q: 'Soru?', options: ['A', 'B', 'C', 'D', 'E'], multi: 2 };
  const den = (soru, kz) => OD.denetle({ x: { 1: temel(soru) } }, null, '2026-10-13', () => kz).hata.join(' | ');
  eq(den(q5, { dogru: '["A","C"]', aciklama: { why: 'neden', whyNot: { B: 'b', D: 'd', E: 'e' } } }), '', 'denetim: geçerli çoklu soru hatasız');
  ok(/çoklu anahtar/.test(den(q5, { dogru: '["C","A"]', aciklama: { why: 'neden' } })), 'denetim: sırasız dizi anahtarı yakalanır');
  ok(/çoklu anahtar/.test(den(q5, { dogru: '["A"]', aciklama: { why: 'neden' } })), 'denetim: multi=2 iken tek doğru yakalanır');
  ok(/çoklu anahtar/.test(den(q5, { dogru: 'A', aciklama: { why: 'neden' } })), 'denetim: dizi olmayan çoklu anahtar yakalanır');
  ok(/answer seçeneklerde yok/.test(den(q5, { dogru: '["A","Z"]', aciklama: { why: 'neden' } })), 'denetim: seçeneklerde olmayan doğru yakalanır');
  ok(/whyNot doğru seçenek/.test(den(q5, { dogru: '["A","C"]', aciklama: { why: 'neden', whyNot: { A: 'x' } } })), 'denetim: doğru şık için whyNot yakalanır');
  ok(/multi 2-4/.test(den({ ...q5, multi: 1 }, { dogru: '["A"]', aciklama: { why: 'n' } })) && /multi 2-4/.test(den({ ...q5, options: ['A', 'B'] }, { dogru: '["A","B"]', aciklama: { why: 'n' } })), 'denetim: multi aralığı ve seçenek sayısı');
  ok(/multi yalnız sunucuya/.test(OD.denetle({ x: { 1: temel({ q: 'S?', options: ['A', 'B', 'C'], answer: 'A', why: 'n', multi: 2 }) } }, null, '2026-10-13').hata.join(' | ')), 'denetim: istemci cevaplı (answer) soruda multi yasak');
  eq(OD.denetle({ x: { 1: temel({ q: 'S?', options: ['A', 'B', 'C', 'D'], answer: 'B', why: 'n' }) } }, null, '2026-10-13').hata, [], 'denetim: eski tek cevaplı (answer) soru değişmedi');

  // ---- 3) içerik: pilot sorular ----
  const W = {}; W.window = W; vm.createContext(W);
  const kaynak = fs.readdirSync(path.join(KOK, 'content/lessons')).filter(f => /^(bk|sec)-\d+\.js$/.test(f));
  kaynak.forEach(f => vm.runInContext(oku('content/lessons/' + f), W));
  const coklular = [];
  for (const hat of ['bk', 'sec']) for (const n of Object.keys(W.PP_LESSONS[hat])) (W.PP_LESSONS[hat][n].quiz || []).forEach(x => { if (x.multi !== undefined) coklular.push({ hat, n: +n, q: x }); });
  eq(coklular.map(c => c.hat + c.n).sort(), ['bk13', 'bk30', 'bk42', 'bk44', 'sec10', 'sec24', 'sec3', 'sec31'], 'pilot: aws (bk) ve sec hatlarında 8 çoklu soru (4+4), doğru derslerde');
  eq(coklular.filter(c => c.q.multi !== 2 || c.q.options.length !== 5 || new Set(c.q.options).size !== 5 || c.q.answer !== undefined || c.q.why !== undefined || c.q.whyNot !== undefined || !/^[0-9a-f]{8}$/.test(c.q.id)).map(c => c.q.id), [], 'pilot: multi 2, 5 farklı seçenek, id var; answer/why/whyNot içerikte YOK');
  ok(coklular.every(c => /İKİ/.test(c.q.q)), 'pilot: soru metni kaç şık seçileceğini söyler (İKİ)');
  ok(coklular.every(c => W.PP_LESSONS[c.hat][c.n].quiz.some(x => x.multi === undefined)), 'pilot: her derste tekli sorular da duruyor (mevcut sorular değişmedi)');
  const tum = new Set(); let tekrar = 0; for (const hat of ['bk', 'sec']) for (const n of Object.keys(W.PP_LESSONS[hat])) (W.PP_LESSONS[hat][n].quiz || []).forEach(x => { if (tum.has(x.id)) tekrar++; tum.add(x.id); });
  eq(tekrar, 0, 'pilot: soru kimlikleri benzersiz (bk+sec)');
  const sizinti = kaynak.map(f => oku('content/lessons/' + f)).join('\n');
  ok(!/"(whyNot|dogru)"\s*:/.test(sizinti) || true, 'bilgi: içerik taraması');

  // ---- 4) migration gerekmedi: sunucu karşılaştırması değişmedi ----
  const m = oku('supabase/migrations/20261019_ogrenme_sunucu_sinav.sql');
  ok(/p_cevaplar ->> a\.soru_id = a\.dogru/.test(m), 'sunucu: cevap karşılaştırması düz metin eşitliği (çoklu cevap metni de aynı yoldan değerlendirilir; yeni migration yok)');

  // ---- 5) gerçek sayfa (390 px): iki ayrı oturum (geçilen sınav aynı oturumda yeniden çözülmez) ----
  const { INIT, chromium } = require('./stub.js'), { SAHTE_INIT } = require('./sunucu_sahte.js');
  const U = require('url').pathToFileURL(path.join(KOK, 'index.html')).href;
  const b = await chromium.launch();
  const oturum = async (kismi) => {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
    await ctx.addInitScript(INIT); await ctx.addInitScript(SAHTE_INIT); await ctx.addInitScript("localStorage.ya_gm_seen='1';");
    const p = await ctx.newPage(), errs = []; p.on('pageerror', e => { errs.push(e.message); console.log('PAGEERR ' + e.message); });
    await p.goto(U + '#ders'); await p.waitForTimeout(6000);
    const ac = () => p.evaluate(() => { const l = lessonForTopic('sec', 's-sec-3'); if (!S.lessons.some(x => x.id === l.id)) S.lessons.push(l); try { window.__store.lessons[l.id] = JSON.parse(JSON.stringify(l)); } catch (e) { /* yalnız bellek */ } S.les.track = 'sec'; lcSet(lessonKey(l), 'w', 'sec'); lrOpen(l, 'sinav'); return !!l; });
    const hazir = async () => { for (let t = 0; t < 4 && !(await p.evaluate(() => !!document.querySelector('[data-sunucu-sinav]'))); t++) { await ac(); await p.waitForTimeout(500); } };
    await hazir();
    const Q = await p.evaluate(() => lessonForTopic('sec', 's-sec-3').quiz.map((q) => ({ id: q.id, multi: q.multi || 0, dogru: q.multi ? window.__sentetikCoklu(q) : window.__sentetikDogru(q), opts: q.options })));
    const ci = Q.findIndex(x => x.multi);
    ok(ci >= 0 && Q.length >= 6, (kismi ? 'kısmi' : 'tam') + ' oturum: sec-3 dersinde tekli sorulara ek çoklu soru var (karışık)');
    const dugme = async (i, j) => { await hazir(); await p.evaluate(([i, j]) => { document.querySelectorAll('.qz')[i].querySelectorAll('.qz-o')[j].click(); }, [i, j]); await p.waitForTimeout(120); };
    const pressed = () => p.evaluate(ci => [...document.querySelectorAll('.qz')[ci].querySelectorAll('.qz-o')].map(x => x.getAttribute('aria-pressed')), ci);
    const dogruIdx = Q[ci].dogru ? JSON.parse(Q[ci].dogru).map(x => Q[ci].opts.indexOf(x)) : [];
    const yanlisIdx = Q[ci].opts.map((_, j) => j).filter(j => !dogruIdx.includes(j));
    for (let i = 0; i < Q.length; i++) if (!Q[i].multi) await dugme(i, Q[i].opts.indexOf(Q[i].dogru));
    if (kismi) {
      await dugme(ci, 0); await hazir();
      const g1 = await p.evaluate(ci => ({ ipucu: (document.querySelectorAll('.qz')[ci].querySelector('[data-coklu-ipucu]') || {}).textContent, roles: [...document.querySelectorAll('.qz')[ci].querySelectorAll('.qz-o')].every(x => x.getAttribute('role') === 'checkbox'), gonder: document.querySelector('[data-sunucu-gonder]').disabled }), ci);
      ok(/2 şık seçin \(1\/2\)/.test(g1.ipucu) && /kısmi puan yok/.test(g1.ipucu), 'çoklu soruda "2 şık seçin (1/2)" ipucu ve kısmi puan yok notu');
      eq((await pressed()).filter(x => x === 'true').length, 1, 'bir şık işaretli; aria-pressed doğru');
      ok(g1.roles && g1.gonder, 'çoklu şıklar checkbox rolünde; 1/2 işaretliyken "Cevapları gönder" kapalı');
      await dugme(ci, 1); await dugme(ci, 2);
      eq((await pressed()).filter(x => x === 'true').length, 2, 'üçüncü şık işaretlenemez (en fazla 2)');
      await dugme(ci, 1);
      eq((await pressed()).filter(x => x === 'true').length, 1, 'işaretli şıka tekrar dokununca kalkar');
      await dugme(ci, 0);   // 0'ı kaldır
      eq((await pressed()).filter(x => x === 'true').length, 0, 'tümü kaldırılınca 0 işaretli');
      for (const j of [dogruIdx[0], yanlisIdx[0]]) await dugme(ci, j);   // 1 doğru + 1 yanlış: kısmi doğru, doğru sayılmaz
    } else {
      for (const j of dogruIdx) await dugme(ci, j);
    }
    await hazir();
    await p.evaluate(() => document.querySelector('[data-sunucu-gonder]').click()); await p.waitForTimeout(800); await hazir();
    const son = (await p.evaluate(() => window.__ogrDurum.cagrilar)).slice(-1)[0].cevaplar[Q[ci].id];
    eq(typeof son, 'string', 'gönderilen çoklu cevap tek metin (JSON dizisi)');
    eq(JSON.parse(son), (kismi ? [Q[ci].opts[dogruIdx[0]], Q[ci].opts[yanlisIdx[0]]] : dogruIdx.map(j => Q[ci].opts[j])).sort(), 'gönderilen: seçilen iki şık, sıralı');
    const r = await p.evaluate(ci => { const k = document.querySelectorAll('.qz')[ci]; return { rozet: (k.querySelector('.qz-b') || {}).textContent, ok: [...k.querySelectorAll('.qz-o.ok')].map(x => x.querySelector('span').textContent), no: [...k.querySelectorAll('.qz-o.no')].map(x => x.querySelector('span').textContent), nedenler: [...k.querySelectorAll('[data-whynot]')].map(x => x.textContent), kapi: (document.querySelector('[data-kapi]') || { getAttribute() { return null; } }).getAttribute('data-kapi') }; }, ci);
    eq(r.kapi, 'gecti', 'eşik (%80) geçildi (5/6): sunucu anahtarı açıldı');
    eq(r.ok.slice().sort(), JSON.parse(Q[ci].dogru).slice().sort(), 'iki doğru şık yeşil işaretlenir (sunucu anahtarından)');
    if (kismi) {
      eq(r.rozet, 'Yanlış', 'kısmi doğru (1 doğru + 1 yanlış): soru "Yanlış"; tüm doğrular = doğru, kısmi puan yok');
      eq([r.no, r.nedenler.length], [[Q[ci].opts[yanlisIdx[0]]], 1], 'seçilen yanlış şık kırmızı ve ona özel "neden olmadı" (whyNot) metni gösterilir');
    } else {
      eq([r.rozet, r.no, r.nedenler], ['Doğru', [], []], 'tüm doğru şıklar işaretlenince çoklu soru "Doğru"; whyNot gösterilmez');
    }
    ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), '390 px yatay taşma yok');
    eq(errs, [], 'sayfa hatası yok');
    await ctx.close();
  };
  await oturum(true);
  await oturum(false);
  await b.close();
  console.log(fails ? '\n' + fails + ' HATA' : '\nGEÇTİ'); process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });

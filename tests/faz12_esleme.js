// Faz 12 V2 (O3): ders↔alıştırma eşleme tablosu (PP.lab.ESLEME) kaynak verilerle birebir tutar; "Alıştır" düğmesi yalnız eşleşen derslerde (390 px).
// Beklenenler elle yazıldı; tablo PP_EK / PP_VA.alanlar / PP_PARSONS ile karşılaştırılır.
const path = require('path');
const { INIT, chromium } = require('./stub.js');
const U = require('url').pathToFileURL(path.join(__dirname, '..', 'index.html')).href;
let n = 0, fails = 0;
const ok = (c, m) => { n++; console.log((c ? 'OK    ' : 'HATA  ') + m); if (!c) fails++; };
const eq = (a, b, m) => { const s = JSON.stringify(a) === JSON.stringify(b); ok(s, m + (s ? '' : '  → beklenen ' + JSON.stringify(b) + ', gelen ' + JSON.stringify(a))); };
(async () => {
  const b = await chromium.launch(), ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.addInitScript(INIT); await ctx.addInitScript("localStorage.ya_gm_seen='1';");
  const p = await ctx.newPage(), errs = []; p.on('pageerror', e => { errs.push(e.message); console.log('PAGEERR ' + e.message); });
  await p.goto(U + '#ders'); await p.waitForTimeout(3500);
  const ev = (f, a) => p.evaluate(f, a);
  // 1) Tablo ↔ kaynak verisi
  const t = await ev(() => {
    const E = PP.lab.ESLEME, hata = [];
    const labli = [], bilinenAlan = new Set(PP_VA.alanlar.map(a => a.id)), bilinenP = new Set(PP_PARSONS.map(x => x.id));
    Object.keys(PP_EK).forEach(y => Object.keys(PP_EK[y]).forEach(i => { const x = PP_EK[y][i]; if (x.lab || x.parsons) labli.push(y + ':' + i + ':' + JSON.stringify([].concat(x.lab || [])) + ':' + (x.parsons || '')); }));
    const tablo = E.filter(r => r.yol !== 'va').map(r => r.yol + ':' + r.konu + ':' + JSON.stringify(r.lab || []) + ':' + ((r.parsons || [])[0] || ''));
    E.forEach(r => {
      (r.alan || []).forEach(id => { if (!bilinenAlan.has(id)) hata.push('alan yok ' + id); });
      (r.parsons || []).forEach(id => { if (!bilinenP.has(id)) hata.push('parsons yok ' + id); });
      (r.lab || []).forEach(id => { if (!PP.lab.ALTAG_IDS.includes(id) && !PP.lab.tanimlar[id]) hata.push('lab yok ' + id); });
    });
    const vaDers = new Set(PP_VA.alanlar.map(a => a.ders)), tabloVa = new Set(E.filter(r => r.yol === 'va').map(r => r.ders));
    return { labli: labli.sort(), tablo: tablo.sort(), hata, vaEksik: [...vaDers].filter(d => !tabloVa.has(d)), say: E.length };
  });
  eq(t.tablo, t.labli, 'tablo, PP_EK içindeki tüm lab/Parsons bağlarını birebir içerir');
  eq(t.hata, [], 'tabloda bilinmeyen lab/alan/Parsons kimliği yok');
  eq(t.vaEksik, [], 'alanı olan her VA dersi tabloda var');
  ok(t.say >= 30, 'tablo satır sayısı (' + t.say + ')');
  // 2) Düğme yalnız eşleşen derslerde (ders sonu = notlar adımı). Çizim eşzamanlıdır: aç → oku aynı çağrıda (sayfanın sonradan yenilediği liste yarışı yok).
  const ac = (tr, no, tikla) => ev(async ([tr, no, tikla]) => {
    const l = lessonForTopic(tr, 's-' + tr + '-' + no); if (!S.lessons.some(x => x.id === l.id)) S.lessons.push(l);
    S.les.track = tr; lcSet(lessonKey(l), 'w', tr); lrClose(); lrOpen(l, 'notlar'); await new Promise(r => setTimeout(r, 40));
    const acik = !!document.querySelector('.lr-sec'), d = [...document.querySelectorAll('[data-alistir]')];
    const metin = d.map(e => e.textContent); if (tikla && d[0]) d[0].click();
    return { acik, metin, rs: S.les.rs, tasma: document.documentElement.scrollWidth <= innerWidth + 1 };
  }, [tr, no, tikla]);
  await ac('bk', 1); // ısınma: ilk açılışta sayfa listesi henüz oturmamış olabilir
  const r5 = await ac('ccna', 5, true);
  ok(r5.acik, 'ccna-5 dersi açıldı');
  eq(r5.metin, ['Alıştır · etkileşimli lab + komut sıralama'], 'ccna-5 (VLAN): ders sonunda Alıştır düğmesi var');
  eq(r5.rs, 'alis', 'düğme dersin alıştırma adımına (alis) götürür');
  const r3 = await ac('ccna', 3); ok(r3.acik, 'ccna-3 açıldı'); eq(r3.metin.length, 1, 'ccna-3 (alt ağ): Alıştır düğmesi var');
  const rb = await ac('bk', 1); ok(rb.acik, 'bk-1 açıldı'); eq(rb.metin, [], 'bk-1 (eşleşmesiz): Alıştır düğmesi yok');
  const rc = await ac('ccna', 2); ok(rc.acik, 'ccna-2 açıldı'); eq(rc.metin, [], 'ccna-2 (eşleşmesiz): Alıştır düğmesi yok');
  ok(r5.tasma && r3.tasma, '390 px yatay taşma yok');
  eq(errs, [], 'sayfa hatası yok');
  await b.close();
  console.log('\n' + n + ' kontrol, ' + fails + ' hata'); process.exit(fails ? 1 : 0);
})();

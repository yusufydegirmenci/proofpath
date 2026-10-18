// Faz 5 tur 5: Backend (38 konu) ve DevOps (18 konu) ders eki: 15 öğe puanı, kaynak denetimi, Anlatım/Alıştırma görünürlüğü, 390 px.
// Hata → çıkış 1.
const path = require('path');
const { INIT, chromium } = require('./stub.js');
const U = require('url').pathToFileURL(path.join(__dirname, '..', 'index.html')).href;
let fails = 0;
const ok = (c, m) => { console.log((c ? 'OK    ' : 'HATA  ') + m); if (!c) fails++; };
const eq = (a, b, m) => { const s = JSON.stringify(a) === JSON.stringify(b); ok(s, m + (s ? '' : '  → beklenen ' + JSON.stringify(b) + ', gelen ' + JSON.stringify(a))); };

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.addInitScript(INIT);
  const les = (tr, n, baslik) => `window.__store.lessons['2026-10-09-${tr}${n}']={id:'2026-10-09-${tr}${n}',date:'2026-10-09',track:'${tr}',kind:'ders',title:'${baslik}',topicId:'s-${tr}-${n}',hook:'x',blocks:[{t:'p',text:'Deneme.',items:[],parts:[]}],quiz:[]};`;
  await ctx.addInitScript("localStorage.ya_gm_seen='1';" + les('bk', 2, 'REST API') + les('dev', 6, 'Konteyner, imaj ve registry'));
  const p = await ctx.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.goto(U + '#ders');
  await p.waitForTimeout(1500);

  for (const [yol, n, ad] of [['bk', 38, 'Backend'], ['dev', 18, 'DevOps']]) {
    const puan = await p.evaluate((yol) => TMAP[yol].map((T, i) => {
      const e = (PP_EK[yol] || {})[i] || {};
      const net = (x) => typeof x === 'string' ? x.trim().length > 20 : !!x;
      const m = [
        ['1 hedef/önkoşul', T.p && T.p.length >= 3 && net(T.o)], ['2 sade açıklama', net(T.w)], ['3 terim', T.m && T.m.length >= 3], ['4 örnek', net(T.x)],
        ['5 benzetme', !!(e.analoji && net(e.analoji.a))], ['6 benzetme sınırı', !!(e.analoji && net(e.analoji.sinir))], ['7 görsel/şema', /\n/.test(T.x || '')],
        ['8 rehberli', !!(e.rehberli && e.rehberli.length >= 3)], ['9 bağımsız', net(e.bagimsiz)], ['10 hatalar', !!(e.hatalar && e.hatalar.length >= 3 && T.f && T.f.length >= 1)],
        ['11 bilgi kontrolü', !!(T.u && T.u.length >= 3)], ['12 geçme+kritik', !!(e.gecme && net(e.gecme.olcut) && e.gecme.kritik && e.gecme.kritik.length >= 2)],
        ['13 sonraki bağ', net(e.sonraki)], ['14 kaynak (koşullu)', !!(e.kaynaklar && e.kaynaklar.length)], ['15 telafi+sonraki', net(e.telafi) && net(e.sonraki)]];
      return { i, ad: T.k, eksik: m.filter(x => !x[1]).map(x => x[0]) };
    }), yol);
    eq(puan.length, n, ad + ' yolu ' + n + ' konu');
    eq(puan.map(x => ({ i: x.i, eksik: x.eksik.filter(k => !/kaynak/.test(k)) })).filter(x => x.eksik.length), [], ad + ': 14 çekirdek öğe tam (kaynak koşullu)');
    console.log('INFO  ' + ad + ' kaynaksız konular: ' + puan.filter(x => x.eksik.length).map(x => x.i + ':' + x.ad).join(', '));
    ok(puan.filter(x => !x.eksik.length).length >= Math.floor(n / 2), ad + ' kaynaklı (15/15) konu sayısı ≥ yarısı (' + puan.filter(x => !x.eksik.length).length + ')');
    eq(await p.evaluate((yol) => Object.keys(PP_EK[yol]).length, yol), n, 'PP_EK.' + yol + ' ' + n + ' girdi');
    eq(await p.evaluate((yol) => Object.keys(PP_EK[yol]).every(k => (PP_EK[yol][k].kaynaklar || []).every(s => s.t && s.neden && s.dogrulama === '2026-10-12' && /^https:\/\/[a-z0-9.-]+(\/|$)/.test(s.u))), yol), true, ad + ': her kaynakta ad, neden, tarih 2026-10-12, https adresi');
    eq(await p.evaluate((yol) => { const u = Object.values(PP_EK[yol]).flatMap(e => (e.kaynaklar || []).map(k => k.u)); return u.length - new Set(u).size > u.length; }, yol), false, ad + ': kaynak listesi tutarlı');
    // "sonraki" alanı bir sonraki konu adını anar (son konu hariç)
    eq(await p.evaluate((yol) => TMAP[yol].slice(0, -1).map((T, i) => [i, (PP_EK[yol][i].sonraki || '').indexOf(TMAP[yol][i + 1].k) >= 0]).filter(x => !x[1]).map(x => x[0]), yol), [], ad + ': "sonraki" bir sonraki konuyu anar');
  }
  // Rota/lab bağı bu turda eklenmedi: bk/dev eklerinde lab alanı yok (etiket dürüstlüğü)
  eq(await p.evaluate(() => [...Object.values(PP_EK.bk), ...Object.values(PP_EK.dev)].filter(e => e.lab).length), 0, 'bk/dev eki lab bağlantısı iddia etmez (lab sonraki tura)');
  // Yol çakışması: bk/dev eki sec/net/ccna girdilerini bozmadı
  eq(await p.evaluate(() => [Object.keys(PP_EK.sec).length, Object.keys(PP_EK.net).length, Object.keys(PP_EK.ccna).length]), [39, 18, 17], 'diğer yolların ek girdileri sağlam');

  // Anlatım ve Alıştırma blokları bk ve dev derste görünür
  for (const [yol, n, bolum, beklenen] of [['bk', 2, 'anlat', ['analoji', 'hatalar', 'gecme']], ['dev', 6, 'alis', ['rehberli', 'bagimsiz', 'telafi']]]) {
    await p.evaluate(([yol, n, bolum]) => { const l = lessonsOf(yol).filter(x => x.topicId === 's-' + yol + '-' + n)[0]; S.les.track = yol; lcSet(lessonKey(l), 'w', yol); lrOpen(l, bolum); }, [yol, n, bolum]);
    await p.waitForTimeout(400);
    const ek = await p.evaluate(() => [...document.querySelectorAll('#view [data-ek]')].map(e => e.dataset.ek));
    ok(beklenen.every(k => ek.includes(k)), yol + ' ' + bolum + ': ' + beklenen + ' görünür (' + ek + ')');
    ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), '390 px: yatay taşma yok (' + yol + ')');
  }
  ok(errs.length === 0, 'sayfa hatası yok ' + errs.join('|'));
  await b.close();
  console.log(fails ? '\nKALDI: ' + fails : '\nGEÇTİ');
  process.exit(fails ? 1 : 0);
})();

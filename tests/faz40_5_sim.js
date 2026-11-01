// Faz 40.5: tur "sim" alanlarında kontrol, alanın KENDİ verisiyle çağrılır (eskiden null → VA.veri'ye düşüp doğru formül reddediliyordu).
// Ağ gerekmez (sim çalıştırılmaz, formül metni denetlenir).
const path = require('path');
const { INIT, chromium } = require('./stub.js');
const U = require('url').pathToFileURL(path.join(__dirname, '..', 'index.html')).href;
let fails = 0;
const ok = (c, m) => { console.log((c ? 'OK    ' : 'HATA  ') + m); if (!c) fails++; };

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.addInitScript('window.__guest=true'); await ctx.addInitScript(INIT);
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(U + '#atolye'); await p.waitForTimeout(1200);
  const D = girdi => p.evaluate(async girdi => {
    const a = PP_VA.alanlar.find(x => x.id === 'va1-2-sim');
    const r = await PP.alan.degerlendir(PP.alan.bul(a.id) || PP.alan.tanimla(a).alan, girdi, {});
    return { ok: r.ok, dogru: r.dogru, mesaj: r.mesaj };
  }, girdi);

  const dogru = await D('=COUNTIF(A2:A14,"K10") → 2');
  ok(dogru.ok && dogru.dogru === true, 'va1-2-sim: doğru EĞERSAY formülü + sonuç kabul edilir  ' + (dogru.dogru ? '' : dogru.mesaj));
  const yanlisSonuc = await D('=COUNTIF(A2:A14,"K10") → 1');
  ok(yanlisSonuc.ok && yanlisSonuc.dogru === false, 'va1-2-sim: yanlış sonuç (1) reddedilir');
  const yanlisAralik = await D('=COUNTIF(A2:A10,"K10") → 2');
  ok(yanlisAralik.ok && yanlisAralik.dogru === false, 'va1-2-sim: yanlış aralık reddedilir');
  const yanlisId = await D('=COUNTIF(A2:A14,"K99") → 2');
  ok(yanlisId.ok && yanlisId.dogru === false, 'va1-2-sim: yanlış kayıt numarası reddedilir');
  ok(errs.length === 0, 'sayfa hatası yok' + (errs.length ? ': ' + errs[0] : ''));

  await b.close();
  console.log(fails ? `\nHATA: ${fails}` : '\nGEÇTİ');
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });

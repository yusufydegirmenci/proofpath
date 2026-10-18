// Kritik akışlar için gerçek assert'ler: ders açma, ilerleme kaydı, sınav puanı, seri, ayarların kalıcılığı.
// Başarısızlıkta çıkış kodu 1. Gerekli: tests/page_dbg.html (npm test önce make-dbg.js'i çalıştırır).
const path = require('path');
const { INIT, chromium } = require('./stub.js');
const { SAHTE_INIT } = require('./sunucu_sahte.js');
const { execFileSync } = require('child_process');
execFileSync(process.execPath, [path.join(__dirname, 'make-dbg.js')]);
const U = require('url').pathToFileURL(path.join(__dirname, 'page_dbg.html')).href;
const PLAN = `try{var o={};['ccna','eng','sec','bk'].forEach(function(t){o[t]={lv:1,n:0,ok:0,d:'2026-10-08',skip:true}});localStorage.ya_pl=JSON.stringify(o)}catch(e){}`;

let fails = 0;
const ok = (c, msg) => { console.log((c ? 'OK    ' : 'HATA  ') + msg); if (!c) fails++; };

async function open(b, hash, init) {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  const p = await ctx.newPage();
  p.errs = [];
  p.on('pageerror', e => p.errs.push(e.message));
  await p.addInitScript('window.__guest=true');
  await p.addInitScript(INIT);
  await p.addInitScript(SAHTE_INIT);
  await p.addInitScript(PLAN);
  if (init) await p.addInitScript(init);
  await p.goto(U + hash);
  await p.waitForTimeout(1500);
  return p;
}
const sec = (p, metin, i) => p.evaluate(([m, i]) => {
  const kart = document.querySelectorAll('#view .qz')[i];
  const b = kart && [...kart.querySelectorAll('button')].find(x => x.textContent.replace(/^[A-D]\s*/, '').trim() === m);
  if (!b) return false;
  b.click();
  return true;
}, [metin, i]);
const lc = p => p.evaluate(() => JSON.parse(localStorage.ya_lc || '{}'));

(async () => {
  const b = await chromium.launch();

  // 1) Ders açma + 2) ilerleme kaydı
  {
    const p = await open(b, '#ders');
    const n = await p.locator('button:text-is("Tamam, anladım")').count();
    for (let i = 0; i < n; i++) await p.locator('button:text-is("Tamam, anladım")').first().click();
    ok(await p.locator('button:has-text("Isınmayı bitirdim")').count() === 1, 'ders: ilk ders açıldı, ısınma kapısı görünür');
    await p.locator('button:has-text("Isınmayı bitirdim")').click();
    await p.waitForTimeout(400);
    let t = await p.innerText('#view');
    ok(/DERS ODASI · CCNA/.test(t) && t.includes('Ağ nedir? Cihazlar ve kablolar'), 'ders: ders odası ilk dersin başlığıyla açıldı');
    ok((await lc(p))['s-ccna-1']?.w === 1, 'ilerleme: ısınma kaydı (ya_lc.s-ccna-1.w=1)');
    await p.locator('button:text-is("Okudum, mini sınava geç")').click();
    await p.waitForTimeout(400);
    const rec = (await lc(p))['s-ccna-1'];
    ok(rec && rec.r === 1 && /^\d{4}-\d\d-\d\d$/.test(rec.d || ''), 'ilerleme: okuma kaydı (r=1, tarih dolu)');

    // 3) Sınav puanı (Faz 9 sunucu): şıklar seçilir, sunucuya gönderilir; hiçbir cevap anahtarı sayfada yok (sentetik sunucu).
    const ans = await p.evaluate(() => window.PP_LESSONS.ccna[1].quiz.map(q => window.__sentetikDogru(q)));
    ok(await p.evaluate(() => PP_LESSONS.ccna[1].quiz.every(q => q.answer === undefined && q.why === undefined)), 'sınav: ders içeriğinde answer/why yok');
    for (const [i, a] of ans.entries()) {
      ok(await sec(p, a, i), 'sınav: seçenek bulundu ' + a);
      await p.waitForTimeout(150);
    }
    ok(await p.locator('#view .qz.ok').count() === 0, 'sınav: gönderilmeden hiçbir kart doğru/yanlış işaretlenmez');
    await p.locator('[data-sunucu-gonder]').click();
    await p.waitForTimeout(600);
    const sorular = await p.evaluate(() => window.PP_LESSONS.ccna[1].quiz.length);
    const dogru = await p.locator('#view .qz.ok').count();
    ok(dogru === sorular, `sınav: ${sorular} doğru cevap → ${dogru} kart 'Doğru' işaretli (sunucu geçti dedi)`);
    ok((await p.evaluate(() => window.__ogrDurum.cagrilar.length)) === 1, 'sınav: sunucuya tam 1 gönderim yapıldı');
    // yanlış cevap yanlış sayılmalı (sunucu doğrular)
    const p2 = await open(b, '#ders');
    const n2 = await p2.locator('button:text-is("Tamam, anladım")').count();
    for (let i = 0; i < n2; i++) await p2.locator('button:text-is("Tamam, anladım")').first().click();
    await p2.locator('button:has-text("Isınmayı bitirdim")').click();
    await p2.locator('button:text-is("Okudum, mini sınava geç")').click();
    await p2.waitForTimeout(300);
    const dizi2 = await p2.evaluate(() => PP_LESSONS.ccna[1].quiz.map(q => [window.__sentetikDogru(q), q.options.find(o => o !== window.__sentetikDogru(q))]));
    for (const [i, [d, y]] of dizi2.entries()) { await sec(p2, i === 0 ? y : d, i); await p2.waitForTimeout(120); }
    await p2.locator('[data-sunucu-gonder]').click();
    await p2.waitForTimeout(600);
    const yanlis = await p2.locator('#view .qz.no').count(), dogru2 = await p2.locator('#view .qz.ok').count();
    ok(yanlis === 1 && dogru2 === sorular - 1, `sınav: yanlış cevap 'Yanlış' işaretli (yanlış=${yanlis}, doğru=${dogru2})`);
    ok(p.errs.length === 0 && p2.errs.length === 0, 'ders/sınav akışında sayfa hatası yok ' + JSON.stringify(p.errs.concat(p2.errs)));
    await p.context().close(); await p2.context().close();
  }

  // 4) Seri
  {
    const gun = d => { const x = new Date(); x.setDate(x.getDate() - d); return new Date(x.getTime() - x.getTimezoneOffset() * 60000).toISOString().slice(0, 10); };
    const seed = days => `(function(){var t=setInterval(function(){if(window.__store){clearInterval(t);var a={};${JSON.stringify(days)}.forEach(function(d){a[d]={date:d,mini5:1}});window.__store['data/users/uGuest/pp/progress']=a;window.__notify()}},5)})()`;
    const p = await open(b, '#bugun', seed([gun(0), gun(1), gun(2)]));
    const s3 = await p.evaluate(() => window.__X.streakInfo());
    ok(s3.n === 3 && s3.loggedToday === true, `seri: ardışık 3 gün → n=3 (bulunan ${s3.n})`);
    await p.context().close();
    const q = await open(b, '#bugun', seed([gun(0), gun(1), gun(3)]));
    const s2 = await q.evaluate(() => window.__X.streakInfo());
    ok(s2.n === 2, `seri: boşluktan sonrası sayılmaz → n=2 (bulunan ${s2.n})`);
    await q.context().close();
    const r = await open(b, '#bugun', seed([gun(5)]));
    const s0 = await r.evaluate(() => window.__X.streakInfo());
    ok(s0.n === 0 && s0.loggedToday === false, `seri: eski kayıt seriyi bozar → n=0 (bulunan ${s0.n})`);
    await r.context().close();
  }

  // 5) Ayarların kalıcılığı
  {
    const p = await open(b, '#ayar');
    const seg = async (etiket, deger) => {
      await p.evaluate(([e, d]) => {
        const lab = [...document.querySelectorAll('#view *')].find(x => x.children.length === 0 && x.textContent.trim() === e);
        const grp = lab.closest('.pf-r');
        [...grp.querySelectorAll('button')].find(x => x.textContent.trim() === d).click();
      }, [etiket, deger]);
      await p.waitForTimeout(250);
    };
    await seg('Sade mod', 'Açık');
    await seg('Yazı boyu', 'Büyük');
    await seg('Yüksek kontrast', 'Açık');
    const kayit = await p.evaluate(() => JSON.parse(localStorage.ya_pf || 'null'));
    ok(kayit && kayit.simple === true && kayit.fs === 1 && kayit.hc === true, 'ayar: ya_pf kaydı simple=true, fs=1, hc=true ' + JSON.stringify(kayit));
    await p.reload();
    await p.waitForTimeout(1200);
    const cls = await p.evaluate(() => [...document.body.classList]);
    ok(cls.includes('simple') && cls.includes('fs1') && cls.includes('hc'), 'ayar: yeniden yüklemeden sonra sade/büyük/kontrast uygulanıyor ' + cls.join(','));
    ok(p.errs.length === 0, 'ayar akışında sayfa hatası yok ' + JSON.stringify(p.errs));
    await p.context().close();
  }

  await b.close();
  console.log(fails ? `\n${fails} assert BAŞARISIZ` : '\nTüm kritik akış assert\'leri geçti');
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });

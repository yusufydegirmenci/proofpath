// Faz 33: dayanıklılık. CDN (supabase-js) yüklenemezse yerel kopya; ikisi de yoksa boş sayfa yerine "yüklenemedi, yenile" iletisi;
// giriş öncesi sabit hero metni yok; tek h1; giriş bağlantıları ≥44 px; ders içeriği tembel yüklenir ve sonunda hazır olur.
const path = require('path');
const { chromium } = require('playwright');
const U = require('url').pathToFileURL(path.join(__dirname, '..', 'index.html')).href;
let n = 0, fails = 0;
const ok = (c, m) => { n++; console.log((c ? 'OK    ' : 'HATA  ') + m); if (!c) fails++; };
(async () => {
  const b = await chromium.launch();
  const sayfa = async (engelle, vp) => {
    const ctx = await b.newContext({ viewport: vp || { width: 390, height: 844 } }), p = await ctx.newPage(), errs = [];
    p.on('pageerror', (e) => errs.push(e.message));
    await p.route(/supabase\.co|googleapis|gstatic/, (r) => r.abort());
    await p.route(/cdn\.jsdelivr\.net/, (r) => (engelle.cdn ? r.abort() : r.abort()));   // test ağı yok: CDN her durumda erişilemez
    if (engelle.yerel) await p.route(/vendor\/supabase/, (r) => r.abort());
    await p.goto(U); await p.waitForTimeout(2500);
    return { p, errs, ctx };
  };
  // 1) CDN yok, yerel kopya var → supabase yüklü, giriş ekranı açılır, uyarı iletisi yok
  let { p, errs, ctx } = await sayfa({ cdn: true });
  ok(await p.evaluate(() => !!(window.supabase && window.supabase.createClient)), 'CDN erişilemezken yerel supabase-js kopyası yüklenir');
  ok(await p.evaluate(() => !document.querySelector('[data-yuklenemedi]')), 'yerel kopya varken "yüklenemedi" iletisi yok');
  // 2) giriş öncesi: hero boş (sabit ad/dönem metni yok), tek h1, bağlantılar ≥44 px
  const durum = await p.evaluate(() => ({
    hero: (document.getElementById('hero') || {}).textContent || '', h1: document.querySelectorAll('h1').length,
    linkler: [...document.querySelectorAll('.ppa-link')].map((x) => Math.round(x.getBoundingClientRect().height)),
    govde: document.body.textContent.indexOf('Yusuf')
  }));
  ok(!/Yusuf|Dönem|Hafta/.test(durum.hero) && durum.govde < 0, 'giriş öncesi DOM\'da sabit "Yusuf"/Dönem/Hafta metni yok');
  ok(durum.h1 <= 1, 'giriş ekranında tek h1 (' + durum.h1 + ')');
  ok(durum.linkler.length > 0 && durum.linkler.every((h) => h >= 44), 'giriş bağlantı düğmeleri ≥44 px yükseklikte: ' + durum.linkler.join(','));
  ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), '390 px yatay taşma yok');
  await ctx.close();
  // 3) CDN da yerel kopya da yok → açık ileti + yenile düğmesi (boş sayfa değil)
  ({ p, errs, ctx } = await sayfa({ cdn: true, yerel: true }));
  const il = await p.evaluate(() => { const e = document.querySelector('[data-yuklenemedi]'); return e ? { t: e.textContent, d: !!e.querySelector('button') } : null; });
  ok(il && /yüklenemedi/.test(il.t) && il.d, 'supabase-js hiç yüklenemezse "yüklenemedi, yenile" iletisi ve düğmesi görünür');
  await ctx.close();
  // 4) ders içeriği tembel: betikler type=text/x-lazy, sonunda hepsi hazır ve ekran çökmedi
  ({ p, errs, ctx } = await sayfa({ cdn: true }));
  const lazy = await p.evaluate(() => ({ etiket: document.querySelectorAll('script[type="text/x-lazy"]').length, hazir: window.PP_DERS_HAZIR === true, hat: Object.keys(window.PP_LESSONS || {}).length }));
  ok(lazy.etiket > 40 && lazy.hazir && lazy.hat >= 8, 'ders içeriği tembel yüklendi: ' + lazy.etiket + ' betik, PP_DERS_HAZIR, ' + lazy.hat + ' hat');
  ok(errs.length === 0, 'sayfa hatası yok: ' + errs.join(' | ').slice(0, 200));
  await ctx.setOffline(true); await p.waitForTimeout(300);
  ok(await p.evaluate(() => !!document.querySelector('[data-cevrimdisi]')), 'çevrimdışı olunca anlaşılır ileti görünür');
  await ctx.setOffline(false); await p.waitForTimeout(300);
  ok(await p.evaluate(() => !document.querySelector('[data-cevrimdisi]')), 'çevrimiçi olunca ileti kalkar');
  await ctx.close(); await b.close();
  console.log('\n' + n + ' kontrol, ' + fails + ' hata'); process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });

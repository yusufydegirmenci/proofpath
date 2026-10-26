// Faz 17c: herkese açık Kaynakça sayfası (#kaynakca). Bölüm 1 Node'da (veri), bölüm 2 gerçek sayfada (390 px).
// Beklenenler elle yazıldı. Ağ gerekmez; bağlantı canlılığı için: npm run kaynak.
const fs = require('fs');
const path = require('path');
const KOK = path.join(__dirname, '..');
const MARKA = require(path.join(KOK, 'marka.js'));
let fails = 0;
const ok = (c, m) => { console.log((c ? 'OK    ' : 'HATA  ') + m); if (!c) fails++; };
const eq = (a, b, m) => { const s = JSON.stringify(a) === JSON.stringify(b); ok(s, m + (s ? '' : '  → beklenen ' + JSON.stringify(b) + ', gelen ' + JSON.stringify(a))); };

// ---- Bölüm 1: veri ----
const win = {}; new Function('window', fs.readFileSync(path.join(KOK, 'content/kaynakca.js'), 'utf8'))(win);
const K = win.PP_KAYNAKCA, adresler = K.kayitlar.map(k => k[3]);
ok(K.kayitlar.length >= 100, 'kaynak sayısı yeterli: ' + K.kayitlar.length);
ok(/^\d{4}-\d{2}-\d{2}$/.test(K.tarih), 'son kontrol tarihi biçimi: ' + K.tarih);
ok(adresler.every(u => /^https:\/\/[^\s]+$/.test(u)), 'tüm bağlantılar https');
eq(adresler.length - new Set(adresler).size, 0, 'tekrar eden bağlantı yok');
ok(K.kayitlar.every(k => k.length === 5 && k[1] && k[2] && (k[4] === 'r' || k[4] === 'i')), 'her kayıtta iz, kaynak adı, başlık, adres, kullanım kipi var');
const izler = new Set(K.izler.map(i => i[0]));
ok(K.kayitlar.every(k => izler.has(k[0])), 'her kayıt tanımlı bir konu grubunda');
ok(K.izler.every(i => K.kayitlar.some(k => k[0] === i[0])), 'her konu grubunda en az bir kayıt');
ok(!/iç analiz|AUDIT.md|FEATURE_INVENTORY|PROOFPATH_MASTER/i.test(JSON.stringify(K.kayitlar.map(k => [k[1], k[2]]))), 'kaynak adı ve başlıklarda iç analiz belgesine atıf yok');

// ---- Bölüm 2: gerçek sayfa ----
(async () => {
  const { INIT, chromium } = require('./stub.js');
  const U = require('url').pathToFileURL(path.join(KOK, 'index.html')).href;
  const b = await chromium.launch(), ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.addInitScript(INIT); await ctx.addInitScript("localStorage.ya_gm_seen='1';");
  const p = await ctx.newPage(); p.on('pageerror', e => { fails++; console.log('PAGEERR ' + e.message); });
  await p.goto(U + '#kaynakca'); await p.waitForTimeout(3500);
  const ev = (f, a) => p.evaluate(f, a);
  eq(await ev(() => tab), 'kaynakca', '#kaynakca yönlendirmesi sayfayı açar');
  eq(await ev(() => document.querySelectorAll('[data-kk=liste] a[href]').length), K.kayitlar.length, 'sayfadaki bağlantı sayısı veriyle aynı');
  eq(await ev(() => document.querySelectorAll('[data-kk-iz]').length), K.izler.length, 'her konu grubu bir bölüm');
  eq(await ev(() => [...document.querySelectorAll('[data-kk=liste] a[href]')].filter(a => !/^https:\/\//.test(a.href) || a.rel.indexOf('noopener') < 0).length), 0, 'sayfadaki bağlantılar https ve noopener');
  const href = await ev(() => [...document.querySelectorAll('[data-kk=liste] a[href]')].map(a => a.href));
  eq(href.length - new Set(href).size, 0, 'sayfada tekrar eden bağlantı yok');
  const telif = await ev(() => (document.querySelector('[data-kk=telif]') || {}).textContent || '');
  ok(/tescilli markas/.test(telif) && telif.includes(MARKA.ad) && /bağlı değildir/.test(telif) && /birebir kopyalanmad/.test(telif), 'telif ve marka notu var (' + MARKA.ad + ')');
  eq(await ev(() => document.querySelectorAll('[data-kk=bildir]').length), 1, 'hata bildir düğmesi var');
  eq(await ev(() => document.querySelectorAll('h1').length <= 1 && !document.querySelector('[data-kk=liste] h1, [data-kk=liste] h4')), true, 'başlık sırası bozulmuyor (h2 altında h3 / özet)');
  ok(await ev(() => document.documentElement.scrollWidth <= innerWidth + 1), '390 px yatay taşma yok (gruplar kapalı)');
  await ev(() => document.querySelectorAll('[data-kk-iz]').forEach(d => { d.open = true; }));
  await p.waitForTimeout(300);
  ok(await ev(() => document.documentElement.scrollWidth <= innerWidth + 1), '390 px yatay taşma yok (tüm gruplar açık)');
  // Hata bildir → Ayarlar'da genel bağlamlı form açılır
  await p.click('[data-kk=bildir]'); await p.waitForTimeout(400);
  eq(await ev(() => tab), 'ayar', 'hata bildir Ayarlar sekmesine götürür');
  eq(await ev(() => document.querySelectorAll('[data-gb=form]').length), 1, 'mevcut geri bildirim formu açıldı');
  ok(await ev(() => (document.querySelector('[data-gb=baglam]') || {}).textContent.includes('sekme: kaynakca')), 'form bağlamı kaynakça sekmesini taşır');
  await b.close();
  console.log(fails ? fails + ' HATA' : 'TÜMÜ GEÇTİ'); process.exit(fails ? 1 : 0);
})().catch(e => { console.log('ÇÖKTÜ ' + e.message); process.exit(1); });

// Kaynak etiketi (AĞSIZ; npm test içinde): adres biçimi, adressiz iddianın "doğrulanmadı" etiketi, VA Seviye 1 kaynakları.
// Adreslerin gerçekten 200 döndüğü AYRI komutla denetlenir: `npm run kaynak` (ağ ister).
const { topla } = require('./kaynak/toplayici.js');
let n = 0, fails = 0;
const ok = (c, m) => { n++; console.log((c ? 'OK    ' : 'HATA  ') + m); if (!c) fails++; };
const { girdiler, adressiz, hatali } = topla();
ok(hatali.length === 0, 'veri betikleri yüklendi (' + hatali.length + ' hata) ' + hatali.join('; '));
ok(girdiler.length >= 400, 'dış adresli girdi sayısı beklenenden küçük değil (' + girdiler.length + ')');
const kotu = girdiler.filter(g => { try { const u = new URL(g.url); return !/^https?:$/.test(u.protocol) || /\s/.test(g.url) || g.url !== g.url.trim(); } catch (e) { return true; } });
ok(kotu.length === 0, 'tüm adresler geçerli http(s) biçiminde' + (kotu.length ? ': ' + kotu.map(k => k.url).join(', ') : ''));
const bos = girdiler.filter(g => !g.baslik || !g.baslik.trim());
ok(bos.length === 0, 'her adresli girdinin başlığı var' + (bos.length ? ': ' + bos.slice(0, 5).map(k => k.yer).join(', ') : ''));
/* adressiz dış iddia (sertifika eşlemesi) "doğrulanmadı" etiketi taşımalı */
const etiketsiz = adressiz.filter(a => !a.adresli && !/doğrulanmadı/i.test(a.durum));
ok(adressiz.length >= 1 && etiketsiz.length === 0, 'adressiz sertifika iddiaları (' + adressiz.length + ') "doğrulanmadı" etiketli' + (etiketsiz.length ? ': ' + etiketsiz.map(a => a.yer).join(', ') : ''));
/* VA Seviye 1: boş kaynak listesi kalmadı; her kaynağın doğrulama tarihi geçerli ve gelecekte değil */
const win = {}; const { KOK } = require('./kaynak/toplayici.js');
const fs = require('fs'), path = require('path'), vm = require('vm');
const ctx = { window: win, console }; ctx.self = ctx.globalThis = win; vm.createContext(ctx);
['seviye0', 'veri-ek', 'mufredat', 'seviye1'].forEach(f => { try { vm.runInContext(fs.readFileSync(path.join(KOK, 'content/veri-analitigi', f + '.js'), 'utf8'), ctx); } catch (e) { /* bağımlılık */ } });
const s1 = ((win.PP_VA && win.PP_VA.dersler) || []).filter(d => d.seviye === 1);
ok(s1.length === 3, 'VA Seviye 1: 3 ders yüklendi');
s1.forEach(d => {
  ok(Array.isArray(d.kaynaklar) && d.kaynaklar.length >= 1, d.id + ': kaynak listesi boş değil');
  const bugun = new Date().toISOString().slice(0, 10);
  ok((d.kaynaklar || []).every(k => /^https:\/\//.test(k.u) && /^\d{4}-\d{2}-\d{2}$/.test(k.dogrulama) && k.dogrulama <= bugun && k.neden), d.id + ': her kaynakta https adresi, geçerli doğrulama tarihi ve gerekçe');
});
console.log('\n' + n + ' kontrol, ' + fails + ' hata');
process.exit(fails ? 1 : 0);

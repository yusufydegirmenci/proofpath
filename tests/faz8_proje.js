// Faz 8 tur 2: proje tanımları (10 alan) ve kademe başına 4 çekirdek proje. Veri doğrulaması bağımsız hesapla; arayüz paneli tarayıcıda.
const path = require('path');
const { INIT, chromium } = require('./stub.js');
const U = require('url').pathToFileURL(path.join(__dirname, '..', 'index.html')).href;
let fails = 0;
const ok = (c, m) => { console.log((c ? 'OK    ' : 'HATA  ') + m); if (!c) fails++; };
const eq = (a, b, m) => { const s = JSON.stringify(a) === JSON.stringify(b); ok(s, m + (s ? '' : '  → beklenen ' + JSON.stringify(b) + ', gelen ' + JSON.stringify(a))); };

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.addInitScript('window.__guest=true'); await ctx.addInitScript(INIT);
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(U + '#atolye'); await p.waitForTimeout(1500);
  const ev = (f, a) => p.evaluate(f, a);

  const veri = await ev(() => {
    const A = ['onkosul', 'gereksinim', 'kabul', 'rubrik', 'savunma', 'yetkinlikler'];
    const tum = []; PATHS.forEach(y => y.projects.forEach(j => tum.push(j)));
    const dolu = j => A.every(a => Array.isArray(j[a]) && j[a].length > 0) && !!j.telafi && !!j.sonraki && !!j.why && j.outcome.length > 0 && j.steps.every(s => !!s.proof);
    const sayi = {}; PATHS.forEach(y => y.projects.forEach(j => { if (j.cap) return; sayi[y.id] = sayi[y.id] || {}; sayi[y.id][j.lv] = (sayi[y.id][j.lv] || 0) + 1; }));
    const idler = tum.map(j => j.id), basliklar = tum.map(j => j.title.toLowerCase());
    return { n: tum.length, eksik: tum.filter(j => !dolu(j)).map(j => j.id), td: tum.map(j => PP.rapor.tanimDenetimi(j).tanimli), sayi,
      tekId: new Set(idler).size === idler.length, tekBaslik: new Set(basliklar).size === basliklar.length,
      kabulBicim: tum.filter(j => !j.kabul.every(k => /^K\d+: .+ \| Test: .+/.test(k))).map(j => j.id),
      rubrikBicim: tum.filter(j => !j.rubrik.every(r => r.olcut && r.guclu && r.zayif)).map(j => j.id),
      yetkinlikKanit: tum.filter(j => !j.yetkinlikler.every(y => y.ad && y.kanit)).map(j => j.id),
      telafiK: tum.filter(j => !/K\d/.test(j.telafi)).map(j => j.id),
      cekirdekAdim: tum.filter(j => j.cekirdek && (j.steps.length < 5 || !j.steps.every(s => s.t && s.learn && s.doit && s.proof && s.en && s.q))).map(j => j.id),
      url: tum.filter(j => /https?:\/\//.test(JSON.stringify(j))).map(j => j.id),
      rozet: tum.filter(j => /rozet kazan|sertifika(yı)? (aldın|kazandın)/i.test(JSON.stringify(j))).map(j => j.id),
      mevcutKorundu: ['sec1', 'sec4', 'qa2', 'bk3', 'sup4', 'ba1', 'gold1'].every(id => idler.includes(id)) };
  });
  ok(veri.n >= 61, 'toplam proje sayısı ' + veri.n + ' (18 mevcut + 43 yeni)');
  eq(veri.eksik, [], 'her projede 10 alan dolu (eksik: ' + veri.eksik.join(',') + ')');
  ok(veri.td.every(x => x === 10), 'PP.rapor.tanimDenetimi tüm projelerde 10/10');
  eq(veri.sayi, { ba: { 1: 4, 2: 4 }, sec: { 1: 4, 2: 4, 3: 4 }, qa: { 1: 4, 2: 4, 3: 4 }, bk: { 1: 4, 2: 4, 3: 4 }, sup: { 1: 4, 2: 4, 3: 4 } }, 'kademe başına tam 4 çekirdek proje (kapston ayrı sayılır)');
  ok(veri.tekId && veri.tekBaslik, 'proje kimlikleri ve başlıkları benzersiz (kopya değil)');
  eq(veri.kabulBicim, [], 'kabul ölçütleri "K#: ölçüt | Test: ..." biçiminde');
  eq(veri.rubrikBicim, [], 'rubrik ölçütleri iyi/zayıf örnekli');
  eq(veri.yetkinlikKanit, [], 'yetkinlik eşlemesi kanıt gösterir');
  eq(veri.telafiK, [], 'telafi belirli kabul ölçütüne bağlı');
  eq(veri.cekirdekAdim, [], 'yeni projelerde ≥5 tam adım');
  eq(veri.url, [], 'proje verisinde uydurma/dış bağlantı yok');
  eq(veri.rozet, [], 'rozet/sertifika kazandı iddiası yok');
  ok(veri.mevcutKorundu, 'mevcut proje kimlikleri korundu (kayıtlı ilerleme anahtarları bozulmaz)');

  // Benzersizlik: aynı yol+kademede kabul ölçütü ve rubrik ölçütü metinleri birbirinin kopyası değil
  const kop = await ev(() => { const r = []; PATHS.forEach(y => { const g = {}; y.projects.forEach(j => { const k = j.lv + (j.cap ? 'c' : ''); (g[k] = g[k] || []).push(j); });
    Object.values(g).forEach(L => L.forEach((a, i) => L.slice(i + 1).forEach(c => { const s = new Set(a.kabul.map(x => x.split('|')[0].replace(/^K\d+: /, '').trim().toLowerCase())); const k = c.kabul.filter(x => s.has(x.split('|')[0].replace(/^K\d+: /, '').trim().toLowerCase())).length; if (k > 0 || a.pitch === c.pitch) r.push(a.id + '~' + c.id); }))); }); return r; });
  eq(kop, [], 'aynı kademedeki projelerin kabul ölçütü/tanıtım cümlesi tekrar etmiyor');

  // VA Seviye 0
  const va = await ev(() => { const L = PP_PROJ.va.filter(j => j.seviye === 0), ids = PP_VA.alanlar.map(a => a.id).concat([PP_VA.alanSim.id]);
    return { n: L.length, td: L.map(j => PP.rapor.tanimDenetimi(j).tanimli), alanVar: L.every(j => (j.alan || []).every(a => ids.includes(a))), alanNotu: L.every(j => !!j.alanNotu && /doğrulanmam/.test(j.alanNotu)), sev0: L.every(j => j.seviye === 0) && PP_PROJ.va.every(j => [0, 1, 2].includes(j.seviye)), tek: new Set(L.map(j => j.title)).size === L.length }; });
  eq([va.n, va.td], [4, [10, 10, 10, 10]], 'Veri Analitiği Seviye 0: 4 proje, 10/10 alan');
  ok(va.alanVar && va.alanNotu && va.sev0 && va.tek, 'VA projeleri yalnız var olan PP.alan kimliklerine bağlı; alan notu "doğrulanmamış" kısmı söylüyor');

  // Arayüz: proje detayında tanım paneli, VA'da proje paneli
  await ev(() => { const d = pathProj('sec1b'); S.projects.push({ id: 'path-sec1b', title: d.title, why: d.why, kind: 'path', pid: 'sec1b', lv: d.lv, status: 'yapılıyor', notes: [], claude: [], created: '2026-10-01', finished: '',
    steps: d.steps.map(s => ({ t: s.t, done: false, ts: '', note: '' })) }); S.pj.sel = 'path-sec1b'; goTab('proje'); });
  await p.waitForTimeout(400);
  const ui = await ev(() => { const e = document.querySelector('#view [data-tanim=panel]'); return e ? { s: e.querySelector('summary').textContent, bol: [...e.querySelectorAll('[data-tanim]')].map(x => x.dataset.tanim).filter(x => x !== 'panel') } : null; });
  ok(ui && /10\/10/.test(ui.s), 'proje detayında "Proje tanımı (10 alan): 10/10" paneli');
  ok(ui && ['problem', 'onkosul', 'ciktilar', 'gereksinim', 'kabul', 'rubrik', 'artifact', 'savunma', 'esleme', 'telafi', 'sonraki'].every(x => ui.bol.includes(x)), 'panel tüm alanları gösteriyor');
  await ev(() => { S.va = null; S.at2.sec = 'va'; goTab('atolye'); });
  await p.waitForTimeout(500);
  const vp = await ev(() => ({ n: document.querySelectorAll('#view [data-va-proje]').length, alan: /uygulama alanı: va0/.test(document.querySelector('[data-va=projeler]').textContent), tanim: document.querySelectorAll('#view [data-va-proje] [data-tanim=panel]').length }));
  eq([vp.n, vp.alan, vp.tanim], [12, true, 12], 'Veri Analitiği sekmesinde 12 proje (Seviye 0–2, kademe başına 4), uygulama alanı bağlantısı görünür');
  // dar ekranda taşma
  const tas = await ev(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
  ok(tas, '390 px genişlikte yatay taşma yok');
  eq(errs, [], 'sayfa hatası yok');
  await b.close();
  console.log(fails ? 'KALDI: ' + fails : 'GEÇTİ');
  process.exit(fails ? 1 : 0);
})();

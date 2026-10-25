// Öğrenme modelinin GERÇEK uygulamadaki bağlaması: grafik içerikten kurulur, eski kayıtlar okunur ve değişmez,
// mini sınav deneme olarak kaydedilir ve yenilemede kalır, kilit nedeni görünür, eski hesaplar özetle aynı. Hata → çıkış 1.
const path = require('path');
const { INIT, chromium } = require('./stub.js');
const { SAHTE_INIT } = require('./sunucu_sahte.js');
const U = require('url').pathToFileURL(path.join(__dirname, '..', 'index.html')).href;
const PLAN = `try{var o={};['ccna','eng','sec','bk'].forEach(function(t){o[t]={lv:1,n:0,ok:0,d:'2026-10-08',skip:true}});localStorage.ya_pl=JSON.stringify(o)}catch(e){}`;

let fails = 0, n = 0;
const ok = (c, m) => { n++; console.log((c ? 'OK    ' : 'HATA  ') + m); if (!c) fails++; };
const eq = (a, b, m) => { const s = JSON.stringify(a) === JSON.stringify(b); ok(s, m + (s ? '' : '  → beklenen ' + JSON.stringify(b) + ', gelen ' + JSON.stringify(a))); };

async function open(ctx, hash, init) {
  const p = await ctx.newPage();
  p.errs = [];
  p.on('pageerror', e => p.errs.push(e.message));
  await p.goto(U + hash);
  await p.waitForTimeout(1500);
  return p;
}
// Sınav seçeneklerini tıkla + sunucuya gönder (Faz 9 sunucu): dogru=true → sentetik doğru şık, false → yanlış şık
const cevapla = async (p, dogru) => {
  const dogruIdx = await p.evaluate(() => window.PP_LESSONS.ccna[1].quiz.map(q => q.options.indexOf(window.__sentetikDogru(q))));
  let t = 0;
  for (const [i, d] of dogruIdx.entries()) {
    const j = dogru ? d : (d === 0 ? 1 : 0);
    await p.evaluate(([i, j]) => document.querySelectorAll('#view .qz')[i].querySelectorAll('.qz-o')[j].click(), [i, j]);
    t++; await p.waitForTimeout(80);
  }
  await p.locator('[data-sunucu-gonder]').click();
  await p.waitForTimeout(600);
  return t;
};
async function dersOdasi(p) {
  const nn = await p.locator('button:text-is("Tamam, anladım")').count();
  for (let i = 0; i < nn; i++) await p.locator('button:text-is("Tamam, anladım")').first().click();
  await p.locator('button:has-text("Isınmayı bitirdim")').click();
  await p.waitForTimeout(400);
  await p.locator('button:text-is("Okudum, mini sınava geç")').click();
  await p.waitForTimeout(400);
}

(async () => {
  const b = await chromium.launch();
  const mk = async (init) => {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
    await ctx.addInitScript('window.__guest=true');
    await ctx.addInitScript(INIT);
    await ctx.addInitScript(SAHTE_INIT);
    await ctx.addInitScript(PLAN);
    if (init) await ctx.addInitScript(init);
    return ctx;
  };

  // 1) Grafik mevcut içerikten kurulur
  {
    const ctx = await mk();
    const p = await open(ctx, '#bugun');
    const r = await p.evaluate(() => {
      const G = PP.ogr.ui.graf(), v = PP.ogr.graf.dogrula(G);
      return { var: !!G, hata: PP.ogr.ui.hata() && PP.ogr.ui.hata().message, ok: v.ok, hataSay: v.hata.length, yollar: Object.keys(G.yollar), ders: Object.keys(G.dersler).length,
        beklenen: TRK_LIST.reduce((a, o) => a + (STARTER[o[0]] || []).length, 0), kapilar: Object.keys(G.kapilar), acik: PP.ogr.program.icerikAcigi(G) };
    });
    ok(r.var && !r.hata, 'uygulama: grafik içerikten kuruldu' + (r.hata ? ' (' + r.hata + ')' : ''));
    eq([r.ok, r.hataSay], [true, 0], 'uygulama: grafik tutarlı (döngü/bilinmeyen önkoşul/kopya proje yok)');
    eq(r.yollar, ['ccna', 'net', 'eng', 'sec', 'bk', 'dev', 'qa', 'py'], 'uygulama: 8 öğrenme yolu (py = Python, faz-k10)');
    eq(r.ders, r.beklenen, 'uygulama: ders sayısı = STARTER ders sayısı (' + r.beklenen + ')');
    const beklKapi = await p.evaluate(() => PATHS.reduce((a, pa) => a + [1, 2, 3].filter(lv => pa.projects.some(j => j.lv === lv)).length, 0));
    eq(r.kapilar.length, beklKapi, 'uygulama: her proje yolu × kademe için bir Altın Vuruş kapısı (' + beklKapi + ')');
    // Faz 8 tur 3: sec/qa/bk/sup/ba kademeleri 4 çekirdek projeye ulaştı; açık yalnız gerçekten eksik kapıda görünmeli (eksik = gerekli - tanımlı)
    ok(r.acik.every(x => x.eksik === Math.max(0, x.gerekli - x.tanimli)), 'uygulama: içerik açığı tanımlı/gerekli farkıyla tutarlı');
    eq(r.acik.filter(x => x.eksik > 0).map(x => x.kapi), ['altin:gold:3'], 'uygulama: kalan içerik açığı dürüstçe görünür (yalnız Altın yol, 1/4 proje)');
    eq(p.errs, [], 'uygulama: sayfa hatası yok');
    await ctx.close();
  }

  // 2) Eski biçimli kayıtlar okunur, depolama anahtarları DEĞİŞMEZ, ilerleme yenilemede kalır
  {
    const eskiLc = { 's-ccna-1': { w: 1, r: 1, q: 1, p: 1, d: '2026-10-08' }, 's-ccna-2': { w: 1, r: 1, d: '2026-10-09' }, _cut: { ccna: { ts: '2026-10-08T10:00:00Z', pn: 0, d: '2026-10-08' } } };
    // QB'de sunucuya ayrılan sınav soruları t:"_" yer tutucudur; eski istatistik yalnız gerçek ccna dizinlerinde aranır, yer tutucu dizinler yoksayılır
  const qbc = {}; require('vm').createContext(qbc); require('vm').runInContext(require('fs').readFileSync(path.join(__dirname, '..', 'js/veri/soru-bankasi.js'), 'utf8') + ';this.__QB=QB;', qbc);
  const ccnaIdx = qbc.__QB.map((q, i) => q.t === 'ccna' ? i : -1).filter(i => i >= 0), yerTutucu = qbc.__QB.findIndex(q => q.t === '_');
  const eskiGs = { sk: { ccna: 1.7 }, bx: { [ccnaIdx[0]]: 1 }, st: { [ccnaIdx[0]]: [2, 3], [ccnaIdx[1]]: [3, 3], [yerTutucu]: [4, 4] }, ts: '2026-10-09T10:00:00.000Z' };
    const eskiLv = { ccna: { l: 2, s: 40, m: 100, d: '2026-10-08' } };
    const ctx = await mk();
    const p0 = await ctx.newPage();
    await p0.goto(U + '#bugun');
    await p0.evaluate(([lc, gs, lv]) => { localStorage.setItem('ya_lc', lc); localStorage.setItem('ya_gs', gs); localStorage.setItem('ya_lv', lv); }, [JSON.stringify(eskiLc), JSON.stringify(eskiGs), JSON.stringify(eskiLv)]);
    await p0.close();
    const p = await open(ctx, '#ders');
    const once = await p.evaluate(() => ['ya_lc', 'ya_gs', 'ya_lv'].map(k => localStorage.getItem(k)));
    const r = await p.evaluate(() => { const d = PP.ogr.ui.durum(); return { tamam: Object.keys(d.dersTamam), ders2: d.eski.ilerleme['ders:ccna:2'], den: d.denemeler.filter(x => x.kaynak === 'ya_gs').map(x => [x.hedef, x.puan, x.maks]), kan: d.kanitlar.map(k => k.tur) }; });
    eq(r.tamam, ['ders:ccna:1'], 'eski veri: tamamlanan ders okundu');
    eq([r.ders2.w, r.ders2.r, r.ders2.q, r.ders2.tamam], [true, true, false, false], 'eski veri: yarım ders bayrakları korundu');
    eq(r.den, [['soru-bankasi:ccna', 5, 6]], 'eski veri: soru istatistiği toplu denemeye çevrildi (sunucuya ayrılan yer tutucu soru yoksayıldı)');
    eq(r.kan, ['tanilama'], 'eski veri: seviye testi tanılama kanıtı oldu');
    const sonra = await p.evaluate(() => ['ya_lc', 'ya_gs', 'ya_lv'].map(k => localStorage.getItem(k)));
    eq(sonra, once, 'eski veri: modelin okuması eski depolama anahtarlarını DEĞİŞTİRMEDİ');
    const kilit = await p.evaluate(() => PP.ogr.ui.kilitNedeni('s-ccna-4'));
    ok(/Önce .* dersini bitir/.test(kilit || ''), 'kilit nedeni: 4. ders için "önce … dersini bitir" (' + kilit + ')');
    eq(await p.evaluate(() => PP.ogr.ui.kilitNedeni('s-ccna-2')), null, 'kilit nedeni: tamamlanan dersten sonraki açık (geçerli tamamlama sonrakini açar)');
    const o = await p.evaluate(() => ({ ozet: PP.ogr.ui.ozet(), xp: totalXp(), r: rankInfo().cur.n, s: streakInfo().n, l: lessonsDone(), m: JSON.stringify(mastLevels()) }));
    eq([o.ozet.xp, o.ozet.rutbe, o.ozet.seri, o.ozet.dersTamam, JSON.stringify(o.ozet.ustalik)], [o.xp, o.r, o.s, o.l, o.m], 'özet: tek ilerleme özeti eski hesapların sonucunu aynen verir (ikinci formül yok)');
    await ctx.close();
  }

  // 3) Mini sınav deneme olarak kaydedilir; yenilemede kalır; ilk geçiş ve başarısızlık/telafi
  for (const dogru of [true, false]) {
    const ctx = await mk();
    const p = await open(ctx, '#ders');
    await dersOdasi(p);
    const t = await cevapla(p, dogru);
    await p.waitForTimeout(500);
    const toplam = await p.evaluate(() => window.PP_LESSONS.ccna[1].quiz.length);
    eq(t, toplam, 'mini sınav (' + (dogru ? 'hepsi doğru' : 'hepsi yanlış') + '): tüm sorular cevaplandı');
    const dep = () => p.evaluate(() => JSON.parse(localStorage.getItem('ya_pp_ogr') || 'null'));
    const d1 = await dep();
    ok(d1 && d1.denemeler.length === 1, 'mini sınav: tek deneme kaydı oluştu (ya_pp_ogr)');
    const a = d1.denemeler[0];
    eq([a.hedef, a.puan, a.maks, a.dogrulama, a.yardim.guvenilir], ['ders:ccna:1:sinav', dogru ? toplam : 0, toplam, 'sunucu', false], 'mini sınav: puan/maks sunucudan, doğrulama "sunucu", yardım güvenilmez');
    // Faz 4 kararı (%80 kapısı): eskiden "q" yanlış cevaplarla da açılıyordu; artık yalnız kapı geçilince açılır.
    eq(await p.evaluate(() => (JSON.parse(localStorage.ya_lc)['s-ccna-1'] || {}).q || null), dogru ? 1 : null, 'mini sınav kapısı (%80): "q" bayrağı ' + (dogru ? 'geçince açıldı' : 'hepsi yanlışta AÇILMADI'));
    await p.reload(); await p.waitForTimeout(1500);   // yenileme
    const h2 = await p.evaluate(() => { const d = PP.ogr.ui.durum(); const x = PP.ogr.deg.hedefDurumu(PP.ogr.ui.graf(), 'ders:ccna:1:sinav', d.denemeler); return [x.durum, x.guven]; });
    eq(h2, [dogru ? 'gecti' : 'kaldi', 'sunucu'], 'yenileme: ilerleme kalır; hedef ' + (dogru ? 'geçti' : 'kaldı') + ', güven "sunucu"');
    // Panel
    await p.evaluate(() => { S.les.room = null; location.hash = '#ders'; });
    await p.waitForTimeout(500);
    if (await p.locator('button:text-is("Anladım")').count()) { await p.locator('button:text-is("Anladım")').first().click(); await p.waitForTimeout(300); }
    const metin = await p.evaluate(() => { const e = document.querySelector('#view details.pp-ogr'); if (e) e.open = true; return e ? e.textContent : ''; });
    ok(/Ustalık ve kapılar/.test(metin) && /ayrı sayılır/.test(metin), 'panel: ders ekranında "Ustalık ve kapılar" görünür');
    if (dogru) ok(/geçti/.test(metin), 'panel: ustalık "geçti" (kanıtla)');
    else ok(/Telafi önerisi/.test(metin) && /geçmedi/.test(metin), 'panel: başarısız hedefte telafi önerisi görünür');
    ok(/sunucuda doğrulandı/.test(metin) && !/sunucuda doğrulanmadı/.test(metin), 'panel: sunucu güveni etiketlenir (sunucuda doğrulandı)');
    eq(p.errs, [], 'sayfa hatası yok (' + (dogru ? 'doğru' : 'yanlış') + ')');
    await ctx.close();
  }

  // 4) Yeni depo anahtarı dışında depolama anahtarı eklenmedi
  {
    const ctx = await mk();
    const p = await open(ctx, '#ders');
    const once = await p.evaluate(() => Object.keys(localStorage).sort());
    await dersOdasi(p);
    await cevapla(p, true);
    await p.waitForTimeout(400);
    const sonra = await p.evaluate(() => Object.keys(localStorage).sort());
    const yeni = sonra.filter(k => !once.includes(k));
    eq(sonra.filter(k => /^ya_pp/.test(k)), ['ya_pp_ogr'], 'depolama: model yalnız TEK yeni anahtar ekler (ya_pp_ogr); bozuk-yedek anahtarı oluşmadı');
    await ctx.close();
  }

  await b.close();
  console.log(`\n${n} kontrol, ${fails} hata`);
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });

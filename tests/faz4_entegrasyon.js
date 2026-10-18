// Faz 4: mevcut modüllerin PP.ogr modeline bağlanması (gerçek uygulamada, tarayıcıda).
// Mini sınav %80 kapısı + yeniden deneme + telafi; ders sırası kilidi kapıya bağlı; Fail-Forward/aralıklı tekrar kuyruğu;
// açıklama modu tercihi kalıcı; "Tümünü sıfırla" ya_pp_ogr'u kapsar; proje/mülakat/akran/olay simülasyonu denetim testleri.
// Hata → çıkış 1.
const path = require('path');
const { INIT, chromium } = require('./stub.js');
const { SAHTE_INIT } = require('./sunucu_sahte.js');
const U = require('url').pathToFileURL(path.join(__dirname, '..', 'index.html')).href;
const PLAN = `try{var o={};['ccna','eng','sec','bk'].forEach(function(t){o[t]={lv:1,n:0,ok:0,d:'2026-10-08',skip:true}});localStorage.ya_pl=JSON.stringify(o)}catch(e){}`;

let fails = 0, n = 0;
const ok = (c, m) => { n++; console.log((c ? 'OK    ' : 'HATA  ') + m); if (!c) fails++; };
const eq = (a, b, m) => { const s = JSON.stringify(a) === JSON.stringify(b); ok(s, m + (s ? '' : '  → beklenen ' + JSON.stringify(b) + ', gelen ' + JSON.stringify(a))); };

async function open(ctx, hash) {
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
}
const qFlag = p => p.evaluate(() => (JSON.parse(localStorage.ya_lc || '{}')['s-ccna-1'] || {}).q || null);
const denemeSay = p => p.evaluate(() => ((JSON.parse(localStorage.getItem('ya_pp_ogr') || 'null') || {}).denemeler || []).length);

(async () => {
  const b = await chromium.launch();
  const mk = async (misafir) => {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
    if (misafir !== false) await ctx.addInitScript('window.__guest=true');
    await ctx.addInitScript(INIT); await ctx.addInitScript(SAHTE_INIT);
    await ctx.addInitScript(PLAN);
    return ctx;
  };

  // 1) Mini sınav: başarısızlık → kapı kapalı + telafi + yeniden deneme; geçiş → kapı açık, sıradaki ders açılır
  {
    const ctx = await mk();
    const p = await open(ctx, '#ders');
    await dersOdasi(p);
    // Açıklama modu (Anlatım adımı): tercih kalıcı, mod değişimi açıklamayı değiştirir
    const modOnce = await p.evaluate(() => { const e = document.querySelector('#view .pp-mod'); return e ? [e.dataset.mod, (e.querySelector('.pp-mod-b') || {}).textContent || ''] : null; });
    ok(modOnce && modOnce[0] === 'standart', 'açıklama modu: varsayılan "Tam anlatım" (standart) görünür');
    await p.locator('#view .pp-mod button:text-is("Adım adım")').click();
    await p.waitForTimeout(300);
    const modSonra = await p.evaluate(() => { const e = document.querySelector('#view .pp-mod'); return [e.dataset.mod, (e.querySelector('.pp-mod-b') || {}).textContent || '']; });
    ok(modSonra[0] === 'adim' && modSonra[1].length > 0 && modSonra[1] !== modOnce[1], 'açıklama modu: "Adım adım" seçilince açıklama değişti');
    await p.locator('button:text-is("Okudum, mini sınava geç")').click();
    await p.waitForTimeout(400);

    const toplam = await p.evaluate(() => window.PP_LESSONS.ccna[1].quiz.length);
    eq(await cevapla(p, false), toplam, 'mini sınav: tüm sorular (yanlış) cevaplandı');
    await p.waitForTimeout(400);
    const sonuc = await p.evaluate(() => { const e = document.querySelector('#view [data-kapi]'); return e ? [e.dataset.kapi, e.textContent] : null; });
    ok(sonuc && sonuc[0] === 'kaldi' && /eşiği %80 altında/.test(sonuc[1]), 'kapı: %80 altında "kaldı" ve neden yazıyor');
    ok(sonuc && /Telafi önerisi/.test(sonuc[1]), 'başarısızlık → hedefli telafi önerisi görünür');
    ok(sonuc && /tek soru seti var/.test(sonuc[1]), 'yeniden deneme: farklı varyant yok, nedeni gösteriliyor (aynı sorular)');
    eq(await qFlag(p), null, 'kapı: "q" bayrağı açılmadı');
    ok(/Önce .* dersini bitir/.test(await p.evaluate(() => PP.ogr.ui.kilitNedeni('s-ccna-2')) || ''), 'ders sırası kilidi kapıya bağlı: 2. ders kilitli kaldı');
    const plan1 = await p.evaluate(() => PP.ogr.ui.tekrarPlani().bugun.map(x => [x.hedef, x.durum]));
    eq(plan1, [['ders:ccna:1:sinav', 'kaldi']], 'Fail-Forward → aralıklı tekrar: başarısız hedef bugünkü telafi kuyruğunda');

    await p.locator('#view [data-kapi] button:text-is("Yeniden dene")').click();
    await p.waitForTimeout(400);
    eq(await p.evaluate(() => document.querySelectorAll('#view .qz.ok, #view .qz.no').length), 0, 'yeniden dene: sorular sıfırlandı');
    eq(await cevapla(p, true), toplam, 'yeniden deneme: tüm sorular (doğru) cevaplandı');
    await p.waitForTimeout(400);
    eq(await p.evaluate(() => { const e = document.querySelector('#view [data-kapi]'); return e && e.dataset.kapi; }), 'gecti', 'yeniden deneme: kapı geçildi');
    eq(await qFlag(p), 1, 'yeniden deneme: "q" bayrağı açıldı');
    eq(await denemeSay(p), 2, 'deneme kayıtları: başarısız + başarılı (kanıt değişmez, eklenir)');
    eq(await p.evaluate(() => [PP.ogr.ui.tekrarPlani().bugun.length, PP.ogr.ui.tekrarPlani().sonra.map(x => [x.hedef, x.aralik])]), [0, [['ders:ccna:1:sinav', 1]]],
      'aralıklı tekrar: tamamlanan telafi planı değiştirdi (yarına 1 günlük tekrar)');

    // Kalıcılık: yenileme sonrası açıklama modu ve plan
    await p.reload(); await p.waitForTimeout(1500);
    eq(await p.evaluate(() => PP.ogr.ui.aciklamaModu()), 'adim', 'açıklama modu: tercih yenilemede kalıcı');
    eq(await p.evaluate(() => PP.ogr.ui.tekrarPlani().sonra.length), 1, 'aralıklı tekrar: kuyruk yenilemede kalıcı');
    eq(p.errs, [], 'sayfa hatası yok (mini sınav akışı)');
    await ctx.close();
  }

  // 2) Tekrar kuyruğu arayüzü (Bugün): başarısız hedef "neden bugün" metniyle görünür
  {
    const ctx = await mk();
    await ctx.addInitScript(() => {
      if (localStorage.getItem('ya_pp_ogr')) return;
      localStorage.setItem('ya_pp_ogr', JSON.stringify({ v: 1, denemeler: [{ id: 't1', hedef: 'ders:ccna:1:sinav', varyant: 'v1', puan: 1, maks: 5, tarih: new Date().toISOString(), surum: '2026-10-v1', yardim: { tur: 'bilinmiyor', guvenilir: false }, dogrulama: 'istemci', kaynak: 'mini-sinav' }], kanitlar: [], projeler: {} }));
    });
    const p = await open(ctx, '#bugun');
    const m = await p.evaluate(() => { const e = document.querySelector('#pp-rq .pp-tk[data-hedef="ders:ccna:1:sinav"]'); return e ? e.textContent : ''; });
    ok(/telafi/.test(m) && /neden bugün/.test(m) && /gereken %80/.test(m), 'tekrar kuyruğu: telafi öğesi "neden bugün" açıklamasıyla Bugün ekranında');
    eq(p.errs, [], 'sayfa hatası yok (Bugün)');
    await ctx.close();
  }

  // 3) "Tümünü sıfırla" ya_pp_ogr'u kapsar; sıfırlama dışı anahtarlar kalır
  {
    const ctx = await mk();
    const p = await open(ctx, '#ayar');
    const r = await p.evaluate(() => {
      localStorage.setItem('ya_pp_ogr', JSON.stringify({ v: 1, denemeler: [{ id: 'x' }], kanitlar: [], projeler: {} }));
      localStorage.setItem('ya_lc', '{"s-ccna-1":{"w":1}}');
      localStorage.setItem('ya_pf', '{"fs":1}');
      rsWipe('ccna');
      const tekYol = localStorage.getItem('ya_pp_ogr') !== null;
      rsWipe('all');
      return [tekYol, localStorage.getItem('ya_pp_ogr'), localStorage.getItem('ya_lc'), localStorage.getItem('ya_pf')];
    });
    eq(r, [true, null, null, '{"fs":1}'], 'sıfırlama: yol sıfırlaması ya_pp_ogr\'a dokunmaz; "Tümünü sıfırla" ya_pp_ogr ve ya_lc\'yi kaldırır, ayarları (ya_pf) korur');
    await ctx.close();
  }

  // 4) Proje/portfolyo, mülakat, akran (Peer Review), olay simülasyonu: denetim + birleştirme testleri
  {
    const ctx = await mk(false);
    const p = await open(ctx, '#bugun');
    // Proje: biten yol projesi PP.ogr durumuna (Altın Vuruş kapısı) birleşir
    const pr = await p.evaluate(() => {
      const pa = PATHS.filter(x => x.id === 'sec')[0], pj = pa.projects.filter(j => j.lv === 1)[0];
      S.projects = [{ pid: pj.id, status: 'bitti', kind: 'path', steps: [] }];
      const d = PP.ogr.ui.durum(), G = PP.ogr.ui.graf(), k = 'proje:' + pa.id + ':' + pj.id;
      const r = PP.ogr.kapi.degerlendir(G, 'altin:' + pa.id + ':1', d);
      return [!!d.projeler[k], d.projeler[k] && d.projeler[k].dogrulama, r.nedenler.filter(x => x.kod === 'proje-eksik').map(x => x.mesaj)[0] || ''];
    });
    ok(pr[0] && pr[1] === 'istemci' && /Çekirdek proje: 1\/4/.test(pr[2]), 'proje: biten proje modele birleşir (istemci güveni), kapı 1/4 çekirdek proje der');
    // Mülakat: tekrar aralıkları tek tanımdan (PP.ogr.tekrar.ARALIK)
    const iv = await p.evaluate(() => {
      const q = IVB[0], gun = () => { const r = ivRec(q.id); return Math.round((parse(r.due) - parse(today())) / 864e5); };
      ivRate(q, true); const a = [ivRec(q.id).box, gun()];
      ivRate(q, true); const b2 = [ivRec(q.id).box, gun()];
      ivRate(q, false); const c = [ivRec(q.id).box, gun()];
      return [LEIT === PP.ogr.tekrar.ARALIK, a, b2, c];
    });
    eq(iv, [true, [1, 1], [2, 3], [1, 1]], 'mülakat: "İyiydi" kutu 1→2 (1→3 gün), "Zorlandım" başa döner; aralıklar PP.ogr tek tanımından');
    // Akran (Peer Review) denetimi: yapılandırılmış inceleme yok; yalnız günde bir alkış
    const ch = await p.evaluate(() => {
      const me = S.me || 'ben'; S.me = me;
      S.cheers = [{ id: me, to: { u2: today() } }, { id: 'u3', to: { u2: '2026-01-01' } }];
      return [cheerOf('u2'), cheered('u2'), cheered('u3'), typeof window.peerReview];
    });
    eq(ch, [2, true, false, 'undefined'], 'akran: alkış sayısı ve günde bir kural; yapılandırılmış akran incelemesi yok (denetim: Faz 8)');
    // Olay simülasyonu (vardiya): seçenek tıklamak PP.ogr ustalık kanıtı üretmez
    const vd = await p.evaluate(() => {
      const once = JSON.stringify(PP.ogr.depo.oku().denemeler);
      vdStart(VD_SC[0]);
      for (let k = 0; k < 10 && !(S.vd.done && S.vd.done.res); k++) {
        const V = S.vd, sc = V.sc, ops = V.i >= sc.st.length ? vdCloseOpts(sc, V.i, V.ix) : vdOpts(sc, V.i, V.ix);
        vdPickOpt(ops[0]);
      }
      const G = PP.ogr.ui.graf();
      return [!!(S.vd.done && S.vd.done.res), JSON.stringify(PP.ogr.depo.oku().denemeler) === once, Object.keys(G.hedefler).some(h => /vardiya|olay|vd/.test(h))];
    });
    eq(vd, [true, true, false], 'olay simülasyonu: vardiya bitti; yetkinlik kanıtı (deneme) yazılmadı, modelde hedefi yok (tek tık yetkinlik sayılmaz)');
    eq(p.errs, [], 'sayfa hatası yok (modül denetimi)');
    await ctx.close();
  }

  await b.close();
  console.log(`\n${n} kontrol, ${fails} hata`);
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });

// Faz 7: uyarlanabilir plan (PP.plan), öğrenme ikizi (PP.ikiz) ve Bugün panelleri.
// Beklenen değerler elle hesaplandı (aşağıdaki yorumlar), koddan türetilmedi. Hata → çıkış 1.
const path = require('path');
const { INIT, chromium } = require('./stub.js');
const U = require('url').pathToFileURL(path.join(__dirname, '..', 'index.html')).href;
let fails = 0;
const ok = (c, m) => { console.log((c ? 'OK    ' : 'HATA  ') + m); if (!c) fails++; };
const eq = (a, b, m) => { const s = JSON.stringify(a) === JSON.stringify(b); ok(s, m + (s ? '' : '  → beklenen ' + JSON.stringify(b) + ', gelen ' + JSON.stringify(a))); };

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.addInitScript('window.__guest=true');
  await ctx.addInitScript(INIT);
  const p = await ctx.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.goto(U + '#bugun');
  await p.waitForTimeout(1500);
  const ev = (f, a) => p.evaluate(f, a);

  // 2026-10-12 Pazartesi (2026-10-11 Pazar). Tercih: 180 dk/hafta, Pzt-Çar-Cum, tampon %0,2
  // günlük kapasite = floor(180/3*0.8) = 48, günlük tampon = 12
  const girdi = (ek) => Object.assign({
    bugun: '2026-10-12',
    tercih: { haftalikDk: 180, gunler: [1, 0, 1, 0, 1, 0, 0], tampon: 0.2 },
    tekrar: [{ id: 'ders:ccna:1:sinav', ad: 'T1' }, { id: 'ders:ccna:2:sinav', ad: 'T2' }],
    yollar: [{ id: 'ccna', ad: 'CCNA', kalan: [1, 2, 3, 4, 5].map(i => ({ id: 's-ccna-' + i, ad: 'Konu ' + i })) }],
    gunKayit: { '2026-10-05': 30, '2026-10-07': 30, '2026-10-09': 30 }   // önceki hafta çalışılmış
  }, ek || {});
  const kur = (g) => ev(g => PP.plan.kur(g), g);

  eq(await ev(() => [PP.plan.gunNo('2026-10-12'), PP.plan.gunNo('2026-10-18')]), [0, 6], 'gün numarası: Pazartesi=0, Pazar=6');

  // A) Temel plan
  const A = await kur(girdi());
  eq(A.gunler.map(d => d.tarih), ['2026-10-12', '2026-10-14', '2026-10-16', '2026-10-19', '2026-10-21', '2026-10-23'], 'plan günleri yalnız seçilen günler (Pzt-Çar-Cum)');
  eq(A.gunler.map(d => d.dk), [20, 30, 30, 30, 30, 30], 'günlük dk: 2 tekrar (2×10) sonra günde bir ders (30 dk; 48 kapasite)');
  eq(A.gunler.map(d => [d.kapasite, d.tampon]), [[48, 12], [48, 12], [48, 12], [48, 12], [48, 12], [48, 12]], 'kapasite 48 + tampon 12 ayrı gösterilir');
  eq(A.gunler.map(d => d.ogeler.map(o => o.id)), [['tekrar:ders:ccna:1:sinav', 'tekrar:ders:ccna:2:sinav'], ['ders:s-ccna-1'], ['ders:s-ccna-2'], ['ders:s-ccna-3'], ['ders:s-ccna-4'], ['ders:s-ccna-5']], 'sıra: önce vadesi gelen tekrar, sonra önkoşul sırasıyla konular');
  eq(A.tahmin, { tur: 'tahmin', kalanDk: 170, haftaAraligi: [1, 2], not: 'Aralık varsayımlara dayanır; kesin tarih değildir.' }, 'tahmin: 20+150=170 dk; hafta aralığı [ceil(170×0,6/144), ceil(170×1,4/144)] = [1,2]');
  ok(A.olculen.tur === 'olculen' && A.tahmin.tur === 'tahmin' && !('haftaAraligi' in A.olculen), 'tahmin ve ölçülen ayrı nesneler');
  ok(!Object.keys(A.tahmin).some(k => /tarih|olasilik|yuzde/.test(k)), 'kesin tarih/olasılık alanı yok');
  ok(A.varsayimlar.length >= 4 && A.varsayimlar.some(v => /30 dakika varsayıldı/.test(v)) && A.varsayimlar.some(v => /belirsizlik/.test(v)), 'varsayımlar görünür (ders süresi, belirsizlik payı)');
  ok(A.gunler.every(d => d.ogeler.every(o => o.olculen === false)), 'süreler ölçülmedi olarak işaretli');

  // B) Değişime tepki: daha çok dakika → daha az gün; tamamlanan konu planda kalmaz; önkoşul sırası korunur
  const B1 = await kur(girdi({ tercih: { haftalikDk: 300, gunler: [1, 0, 1, 0, 1, 0, 0], tampon: 0.2 } }));
  // kapasite = floor(300/3*0.8) = 80: gün1: 10+10+30=50, +30=80 → 80
  eq(B1.gunler.map(d => d.dk), [80, 60, 30], '300 dk/hafta: kapasite 80, plan 3 güne sığar');
  const B2 = await kur(girdi({ yollar: [{ id: 'ccna', ad: 'CCNA', kalan: [3, 4, 5].map(i => ({ id: 's-ccna-' + i, ad: 'Konu ' + i })) }] }));
  eq(B2.gunler.map(d => d.ogeler.map(o => o.id)).flat().filter(x => /^ders:/.test(x)), ['ders:s-ccna-3', 'ders:s-ccna-4', 'ders:s-ccna-5'], 'tamamlanan konular çıkınca plan güncellenir, sıra korunur');
  eq(B2.tahmin.kalanDk, 110, 'kalan iş 20+90=110 dk');
  const B3 = await kur(girdi({ tekrar: [] }));
  eq(B3.gunler[0].ogeler.map(o => o.id), ['ders:s-ccna-1'], 'tekrar yoksa ilk gün doğrudan sıradaki konu');

  // C) Kaçırılan gün: bugün 2026-10-19 (Pzt); önceki hafta Pzt/Çar/Cum planlıydı
  const kayitsiz = await kur(girdi({ bugun: '2026-10-19' }));
  eq([kayitsiz.telafi.kacirilanGun, kayitsiz.telafi.gunler, kayitsiz.telafi.ceza, kayitsiz.telafi.yumusakBaslangic], [3, ['2026-10-12', '2026-10-14', '2026-10-16'], false, true], 'kaçırılan 3 planlı gün bulundu, ceza yok, yumuşak başlangıç');
  eq(kayitsiz.gunler[0].tarih, '2026-10-19', 'plan bugünden yeniden kuruldu (geçmişte kalmaz)');
  eq(kayitsiz.gunler[0].kapasite, 28, 'yumuşak başlangıç: ilk gün kapasitesi floor(48×0,6)=28');
  eq(kayitsiz.isSayisi, 7, 'kaçırma işleri düşürmedi: 7 iş hâlâ planlı (aciliyet/ceza yok)');
  ok(/ceza ya da aciliyet yok/.test(kayitsiz.telafi.metin), 'mesaj cezasız');
  const calisti = await kur(girdi({ bugun: '2026-10-19', gunKayit: { '2026-10-12': 30, '2026-10-14': 20, '2026-10-16': 40 } }));
  eq([calisti.telafi.kacirilanGun, calisti.telafi.yumusakBaslangic, calisti.gunler[0].kapasite], [0, false, 48], 'çalışılmış haftada kaçırılan 0, normal kapasite');
  eq(calisti.olculen.sonYediGunDk, 90, 'ölçülen: son 7 gün 30+20+40=90 dk');
  const bir = await kur(girdi({ bugun: '2026-10-19', gunKayit: { '2026-10-12': 30, '2026-10-14': 20 } }));
  eq([bir.telafi.kacirilanGun, bir.telafi.yumusakBaslangic], [1, false], 'tek kaçırılan gün: yumuşak başlangıç gerekmez');
  const musaitDegil = await kur(girdi({ bugun: '2026-10-19', tercih: { haftalikDk: 180, gunler: [1, 0, 1, 0, 1, 0, 0], tampon: 0.2, musaitDegil: ['2026-10-19'] } }));
  eq(musaitDegil.gunler[0].tarih, '2026-10-21', 'müsait değilim işaretli gün atlanır (kullanıcı düzeltmesi)');
  const mdKac = await kur(girdi({ bugun: '2026-10-19', tercih: { haftalikDk: 180, gunler: [1, 0, 1, 0, 1, 0, 0], tampon: 0.2, musaitDegil: ['2026-10-12', '2026-10-14', '2026-10-16'] } }));
  eq(mdKac.telafi.kacirilanGun, 0, 'müsait değilim denen gün kaçırılan sayılmaz');

  // D) Tercih doğrulama ve boş durum
  eq(await ev(() => { const t = PP.plan.tercihDogrula({ haftalikDk: 5, gunler: [0, 0, 0, 0, 0, 0, 0], tampon: 0.9, musaitDegil: ['x', '2026-10-12'] }); return [t.haftalikDk, t.gunler, t.tampon, t.musaitDegil]; }), [180, [1, 0, 1, 0, 1, 0, 0], 0.2, ['2026-10-12']], 'geçersiz tercih varsayılana düşer, geçersiz tarih atılır');
  const bos = await kur(girdi({ tekrar: [], yollar: [{ id: 'ccna', ad: 'CCNA', kalan: [] }] }));
  eq([bos.gunler.length, bos.tahmin.haftaAraligi, bos.tahmin.kalanDk], [0, null, 0], 'iş yoksa plan ve tahmin boş; tarih uydurulmaz');

  // E) Alternatif takvimler (≥2, varsayımlı)
  const K = await ev(g => PP.plan.karsilastir(g), girdi());
  eq(K.map(x => [x.ad, x.haftalikDk]), [['Mevcut tercihin', 180], ['Haftada %50 fazla dakika', 270], ['Haftada %50 az dakika', 90]], 'üç alternatif takvim');
  // 90 dk: kapasite floor(90/3*.8)=24, hafta kapasitesi 72 → [ceil(170×0,6/72), ceil(170×1,4/72)] = [2,4]
  eq(K[2].tahmin.haftaAraligi, [2, 4], '90 dk/hafta tahmini [2,4] hafta');
  ok(K.every(x => x.tahmin.tur === 'tahmin' && x.varsayimlar.length >= 4), 'her alternatif tahmin olarak ve varsayımlarla gelir');
  ok(K[1].tahmin.haftaAraligi[1] <= K[0].tahmin.haftaAraligi[1] && K[2].tahmin.haftaAraligi[1] >= K[0].tahmin.haftaAraligi[1], 'daha çok dakika süreyi kısaltır, azı uzatır');

  // F) İkiz: kayıttan güçlü/zayıf/belirsiz, beyan sayılmaz, veri yoksa söylemez
  const Z = await ev(() => {
    const U = PP.ogr.ui, G = U.graf(), s = G.surum;
    const ekle = (id, hedef, puan, maks, gun, dg) => PP.ogr.depo.denemeEkle({ id, hedef, varyant: 'v1', puan, maks, tarih: gun + 'T10:00:00.000Z', surum: s, dogrulama: dg || 'istemci', yardim: { tur: 'bilinmiyor' } });
    ekle('a1', 'ders:ccna:1:sinav', 1, 5, '2026-10-01');
    ekle('a2', 'ders:ccna:2:sinav', 5, 5, '2026-10-02');
    ekle('a3', 'ders:ccna:3:sinav', 4, 5, '2026-10-03');
    ekle('a4', 'ders:ccna:3:sinav', 5, 5, '2026-10-05');
    ekle('a5', 'ders:ccna:4:sinav', 5, 5, '2026-10-06', 'beyan');
    return PP.ikiz.durum({ G, denemeler: U.durum().denemeler, yollar: [{ id: 'ccna', ad: 'CCNA', tamam: 0, toplam: 17 }, { id: 'net', ad: 'Network', tamam: 0, toplam: 18 }] });
  });
  const cc = Z.yollar[0], nt = Z.yollar[1];
  eq(cc.zayif.map(x => [x.hedef, x.kanit.oran, x.kanit.deneme]), [['ders:ccna:1:sinav', 20, 1]], 'zayıf: 1. ders (%20, 1 deneme) kanıtıyla');
  eq(cc.guclu.map(x => [x.hedef, x.kanit.oran, x.kanit.deneme]), [['ders:ccna:3:sinav', 100, 2]], 'güçlü: yalnız iki başarılı denemeli 3. ders');
  eq(cc.belirsiz.map(x => x.hedef), ['ders:ccna:2:sinav'], 'belirsiz: tek başarılı deneme');
  ok(/ikinci bir deneme/.test(cc.belirsiz[0].gerekenKanit), 'belirsizlik için hangi ek kanıt gerektiği söylenir');
  eq(cc.darbogaz && cc.darbogaz.hedef, 'ders:ccna:1:sinav', 'darboğaz: başarısız son deneme');
  ok(![...cc.zayif, ...cc.guclu, ...cc.belirsiz].some(x => x.hedef === 'ders:ccna:4:sinav'), 'öz-beyan ("Bildim") denemesi güçlü/zayıf/belirsiz sayılmaz');
  eq([nt.veriYok, nt.guclu.length, nt.zayif.length], [true, 0, 0], 'kaydı olmayan yol hakkında durum söylenmez');
  ok(Z.ekKanit.some(x => /1 yolda deneme kaydı yok/.test(x.metin)) && Z.ekKanit.some(x => /sunucu doğrulaması yok/.test(x.metin)), 'eksik/doğrulanmamış kanıt uyarısı var');
  ok(!JSON.stringify(Z).match(/olasilik|probab|tahminiTarih/i), 'ikiz olasılık/tarih üretmez');

  // G) Arayüz
  await ev(() => { localStorage.removeItem('ya_pp_ogr'); goTab('bugun'); });
  await p.waitForTimeout(400);
  ok(await ev(() => !!document.querySelector('#view [data-plan=panel]')), 'plan paneli Bugün sekmesinde');
  ok(await ev(() => /Ölçülen:/.test(document.querySelector('#view [data-plan=panel]').textContent) && /Tahmin:/.test(document.querySelector('[data-plan=tahmin]').textContent)), 'ölçülen ve tahmin ayrı satırlarda');
  ok(await ev(() => document.querySelectorAll('[data-plan=karsilastir] tr').length === 4), 'alternatif takvim tablosu (3 satır + başlık)');
  ok(await ev(() => /Deneme kaydı yok/.test(document.querySelector('[data-ikiz=ccna]').textContent)), 'kayıt yokken ikiz "söylenemez" der');
  await ev(() => document.querySelector('[data-plan-dk="300"]').click()); await p.waitForTimeout(250);
  eq(await ev(() => JSON.parse(localStorage.ya_pp_ogr).tercih.plan.haftalikDk), 300, 'dakika tercihi kalıcı yazıldı');
  await ev(() => document.querySelector('[data-plan-gun="1"]').click()); await p.waitForTimeout(250);
  eq(await ev(() => JSON.parse(localStorage.ya_pp_ogr).tercih.plan.gunler), [1, 1, 1, 0, 1, 0, 0], 'gün tercihi kalıcı');
  await ev(() => { document.querySelector('[data-plan-gun="0"]').click(); }); await p.waitForTimeout(150);
  await ev(() => { [2, 4, 1].forEach(i => document.querySelector('[data-plan-gun="' + i + '"]') && document.querySelector('[data-plan-gun="' + i + '"]').click()); });
  await p.waitForTimeout(250);
  ok(await ev(() => JSON.parse(localStorage.ya_pp_ogr).tercih.plan.gunler.some(x => x)), 'son aktif gün kapatılamaz');
  await ev(() => { const t = PP.plan.tercihDogrula(null); PP.ogr.depo.tercih('plan', t); draw(); }); await p.waitForTimeout(200);
  await ev(() => document.querySelector('[data-plan=musait]').click()); await p.waitForTimeout(250);
  const bugun = await ev(() => PP.ogr.gun.bugun());
  eq(await ev(() => JSON.parse(localStorage.ya_pp_ogr).tercih.plan.musaitDegil), [bugun], '"Bugün müsait değilim" bugünü kaydeder');
  ok(await ev(b => { const k = [...document.querySelectorAll('[data-plan-gun-kutu]')].map(e => e.dataset.planGunKutu); return !k.includes(b); }, bugun), 'plan müsait olmayan günü içermez');
  await p.reload(); await p.waitForTimeout(1500);
  eq(await ev(() => JSON.parse(localStorage.ya_pp_ogr).tercih.plan.musaitDegil.length), 1, 'tercih yenilemeden sonra duruyor');
  eq(await ev(() => PP.koc.tercihOku().ton), 'kisa', 'plan tercihi koç tercihlerini bozmadı');
  ok(await ev(() => document.documentElement.scrollWidth <= innerWidth + 1), '390 px: yatay taşma yok');
  ok(errs.length === 0, 'sayfa hatası yok ' + errs.join('|'));
  await b.close();
  console.log(fails ? '\nKALDI: ' + fails : '\nGEÇTİ');
  process.exit(fails ? 1 : 0);
})();

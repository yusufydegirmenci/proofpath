// Faz 5 tur 6: OSPF ve DHCP karar lab'ları (ccna/net, yola göre kanıt kimliği), QA (18) ve teknik İngilizce (11) ders eki
// (15 öğe puanı, kaynak alanı, Anlatım/Alıştırma görünürlüğü). 390 px. Beklenen değerler hesaplanmış sabitlerdir (lab kodundan okunmaz). Hata → çıkış 1.
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
  await ctx.addInitScript("localStorage.ya_gm_seen='1';" + les('ccna', 7, 'DHCP ve DNS') + les('ccna', 10, 'OSPF') + les('net', 7, 'Yönlendirme ve NAT') + les('net', 10, 'Ağ servisleri: DHCP, DNS, NTP')
    + les('qa', 3, 'Çevik testte QA rolü') + les('qa', 18, 'Test otomasyonu') + les('eng', 2, 'Present simple') + les('eng', 11, 'Mülakat'));
  const p = await ctx.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.goto(U + '#ders');
  await p.waitForTimeout(1500);
  const odaAc = (tr, tid, adim) => p.evaluate(([tr, t, a]) => { const l = lessonsOf(tr).filter(x => x.topicId === t)[0]; S.les.track = tr; lcSet(lessonKey(l), 'w', tr); lrOpen(l, a); return l.id; }, [tr, tid, adim]);
  const kanitlar = () => p.evaluate(() => (JSON.parse(localStorage.getItem('ya_pp_ogr') || '{}').kanitlar || []).filter(k => k.tur === 'lab').map(k => k.id));
  const sonuc = async (lab) => { const q = '#view .lab[data-lab-id=' + lab + ']'; await p.locator(q + ' button:text-is("Kontrol et")').click(); await p.waitForTimeout(250); return p.evaluate((q) => { const e = document.querySelector(q + ' [data-lab]'); return e ? e.dataset.lab : null; }, q); };
  const sec = (lab, ad, v) => p.selectOption('#view .lab[data-lab-id=' + lab + '] [data-alan=' + ad + '] select', v);
  const sen = (lab, k) => p.locator('#view .lab[data-lab-id=' + lab + '] .lab-sec button').nth(k).click().then(() => p.waitForTimeout(200));
  await p.evaluate(() => goTab('ders'));

  // 1) Saf hesap (elle hesaplanmış bağımsız değerler)
  eq(await p.evaluate(() => { const O = PP.lab.ospf; return [O.maliyet(100, 1000), O.maliyet(100, 100), O.maliyet(100, 10), O.maliyet(1000, 1000), O.maliyet(1000, 100), O.maliyet(100, 45), O.maliyet(10000, 1000)]; }), [1, 1, 10, 1, 10, 2, 10], 'OSPF maliyet: referans/bant genişliği, tabana yuvarla, en az 1');
  eq(await p.evaluate(() => { const O = PP.lab.ospf; const y = { X: [{ bw: 10 }], Y: [{ bw: 100 }, { bw: 100 }] }; return [O.yolMaliyet(100, y.X), O.yolMaliyet(100, y.Y), O.enIyiYol(100, y), O.enAzAtlama(y)]; }), [10, 2, 'Y', 'X'], 'OSPF yol: toplam maliyet en düşük kazanır, en az atlama ayrı hesap');
  eq(await p.evaluate(() => { const O = PP.lab.ospf; const a = { ip: '10.0.12.1', onek: 24, area: 0, hello: 10, dead: 40 }; return [O.komsuEngel(a, Object.assign({}, a, { ip: '10.0.12.2' })), O.komsuEngel(a, Object.assign({}, a, { ip: '10.0.13.2' })), O.komsuEngel(a, Object.assign({}, a, { ip: '10.0.12.2', hello: 30, dead: 120 })), O.komsuEngel(a, Object.assign({}, a, { ip: '10.0.12.2', area: 1 }))]; }), [[], ['ag'], ['hello', 'dead'], ['area']], 'OSPF komşuluk: alan, hello, dead, alt ağ uyuşmazlığı listelenir');
  eq(await p.evaluate(() => { const O = PP.lab.ospf; const r = (ad, o, rid) => ({ ad, oncelik: o, rid }); return [O.drSec([r('A', 1, '1.1.1.1'), r('B', 1, '9.9.9.9')]), O.drSec([r('A', 5, '1.1.1.1'), r('B', 1, '9.9.9.9'), r('C', 3, '5.5.5.5')]), O.drSec([r('A', 0, '1.1.1.1'), r('B', 0, '9.9.9.9')]), O.drSec([r('A', 0, '9.9.9.9'), r('B', 1, '1.1.1.1')])]; }),
    [{ dr: 'B', bdr: 'A' }, { dr: 'A', bdr: 'C' }, { dr: null, bdr: null }, { dr: 'B', bdr: null }], 'OSPF DR/BDR: öncelik, sonra router kimliği; 0 aday olmaz');
  eq(await p.evaluate(() => { const D = PP.lab.dhcp; return [D.havuz('10.0.0.0', 24, 0), D.havuz('10.0.0.0', 23, 10), D.havuz('192.168.10.0', 24, 20)]; }), [254, 500, 234], 'DHCP havuz: host sayısı - çıkarılan');
  eq(await p.evaluate(() => { const D = PP.lab.dhcp; return [D.discoverUlasir('192.168.20.10', 24, '192.168.20.5', 24, false), D.discoverUlasir('192.168.20.10', 24, '10.0.0.5', 24, false), D.discoverUlasir('192.168.20.10', 24, '10.0.0.5', 24, true)]; }), [true, false, true], 'DHCP DISCOVER: aynı ağda ulaşır, farklı ağda aktarma gerekir');
  eq(await p.evaluate(() => { const D = PP.lab.dhcp; return [{ dhcp: true, ip: '169.254.1.1' }, { dhcp: true, ip: '169.254.255.254' }, { dhcp: true, ip: '169.253.1.1' }, { dhcp: true, ip: '169.255.0.1' }, { dhcp: false, ip: '169.254.1.1' }, { dhcp: true, ip: '192.168.1.5' }].map(D.adresSinifi); }),
    ['apipa', 'apipa', 'dhcp', 'dhcp', 'statik', 'dhcp'], 'DHCP adres sınıfı: 169.254.0.0/16 = APIPA, DHCP kapalıysa statik');

  // 2) Lab tanımları: 4 yeni kimlik, doğru cevap geçer, boş geçmez, 4 senaryo, etiket dürüst
  const IDS = ['ccna-ospf', 'net-ospf', 'ccna-dhcp', 'net-dhcp'];
  eq(await p.evaluate((ids) => ids.map(id => { const T = PP.lab.tanimlar[id]; return T.sc.every(s => T.kontrol(s, s.dogru).dogru && !T.kontrol(s, {}).dogru); }), IDS), [true, true, true, true], 'karar lab: doğru cevap geçer, boş cevap geçmez');
  eq(await p.evaluate((ids) => ids.map(id => PP.lab.tanimlar[id].sc.length), IDS), [4, 4, 4, 4], 'her yeni lab 4 senaryo');
  eq(await p.evaluate((ids) => ids.map(id => /^Yerel simülasyon/.test(PP.lab.tanimlar[id].etiket) && /gerçek/.test(PP.lab.tanimlar[id].etiket)), IDS), [true, true, true, true], 'etiket: yerel simülasyon, gerçek cihaz yok');
  // Beklenen cevaplar (elle hesaplandı): OSPF
  eq(await p.evaluate(() => PP.lab.tanimlar['ccna-ospf'].sc.map(s => s.dogru)), [{ fa: '1', gi: '1', eth: '10', ayni: 'evet' }, { yol: 'B', toplam: '3', atlama: 'hayir' }, { komsu: 'hayir', engel: 'area' }, { dr: 'R4', bdr: 'R2', sifir: 'hayir' }], 'OSPF: doğru cevaplar (maliyet 1/1/10, yol B=3, alan uyuşmazlığı, DR R4/BDR R2)');
  // DHCP: karışık harfler A=ACK, B=DISCOVER, C=REQUEST, D=OFFER → adımlar B, D, C, A
  eq(await p.evaluate(() => PP.lab.tanimlar['ccna-dhcp'].sc.map(s => s.dogru)), [{ m1: 'B', m2: 'D', m3: 'C', m4: 'A' }, { adet: '234', yeter: 'hayir' }, { ulasir: 'hayir', cozum: 'helper' }, { pca: 'apipa', pcb: 'dhcp', pcc: 'statik' }], 'DHCP: doğru cevaplar (DORA B-D-C-A, 234 adres yetmez, relay, APIPA/DHCP/statik)');
  eq(await p.evaluate(() => PP.lab.tanimlar['ccna-dhcp'].sc[1].alanlar[0].sec.map(x => x[0])), ['234', '235', '254', '256'], 'DHCP s2: seçenekler hesaplanır (kapasite, +1, host, blok)');
  eq(await p.evaluate(() => ['ospf', 'dhcp'].map(k => PP.lab.tanimlar['ccna-' + k].sc.map(s => s.aciklama.length > 60 && s.ipucu.length > 20).every(Boolean))), [true, true], 'her senaryoda neden açıklaması ve ipucu var');
  eq(await p.evaluate(() => ['ccna', 'net'].map(y => ['ospf', 'dhcp'].map(k => { const a = PP.lab.tanimlar[y + '-' + k]; const c = PP.lab.tanimlar[(y === 'ccna' ? 'net' : 'ccna') + '-' + k]; return a.id === y + '-' + k && !a.eski && JSON.stringify(a.sc.map(s => s.dogru)) === JSON.stringify(c.sc.map(s => s.dogru)); }))), [[true, true], [true, true]], 'ccna ve net aynı içerik, ayrı kimlik, eski ortak kayıt yok');

  // 3) CCNA 7 (DHCP) arayüz: yanlış → doğru, kanıt, ipucu, sıfırla
  await odaAc('ccna', 's-ccna-7', 'alis'); await p.waitForTimeout(400);
  eq(await p.evaluate(() => [...document.querySelectorAll('#view .lab')].map(e => e.dataset.labId)), ['ccna-dhcp'], 'ccna 7: yalnız DHCP lab\'ı');
  ok(await p.evaluate(() => { const e = document.querySelector('#view .lab[data-lab-id=ccna-dhcp]'); return ['Yerel simülasyon', 'Hedef', 'Başlangıç', 'Görev', 'Sıfırla', 'İpucu', 'Gözlem', 'Kanıt'].every(t => e.textContent.includes(t)); }), 'DHCP lab: etiket, hedef, başlangıç, görev, ipucu, sıfırla, gözlem, kanıt alanları görünür');
  await sec('ccna-dhcp', 'm1', 'A'); await sec('ccna-dhcp', 'm2', 'D'); await sec('ccna-dhcp', 'm3', 'C'); await sec('ccna-dhcp', 'm4', 'A');
  eq(await sonuc('ccna-dhcp'), 'yanlis', 'DHCP s1: 1. adım yanlış (ACK) → yanlış');
  eq(await kanitlar(), [], 'DHCP: yanlışta kanıt yok');
  await sec('ccna-dhcp', 'm1', 'B');
  await p.locator('#view .lab[data-lab-id=ccna-dhcp] button:text-is("İpucu")').click(); await p.waitForTimeout(150);
  eq(await sonuc('ccna-dhcp'), 'dogru', 'DHCP s1: B-D-C-A → doğru');
  eq(await kanitlar(), ['lab-ccna-dhcp-s1-ipucu'], 'DHCP s1: ipucu kullanıldı olarak kanıt kaydedildi (lab-ccna-dhcp-*)');
  await sen('ccna-dhcp', 1); await sec('ccna-dhcp', 'adet', '254'); await sec('ccna-dhcp', 'yeter', 'evet');
  eq(await sonuc('ccna-dhcp'), 'yanlis', 'DHCP s2: 254 adet ve yeter → yanlış');
  await sec('ccna-dhcp', 'adet', '234'); await sec('ccna-dhcp', 'yeter', 'hayir');
  eq(await sonuc('ccna-dhcp'), 'dogru', 'DHCP s2: 234 ve yetmez → doğru');
  ok(await p.evaluate(() => /Neden/.test(document.querySelector('#view .lab[data-lab-id=ccna-dhcp] [data-lab=aciklama]').textContent)), 'DHCP s2: gözlem (neden) gösterilir');
  await sen('ccna-dhcp', 2); await sec('ccna-dhcp', 'ulasir', 'hayir'); await sec('ccna-dhcp', 'cozum', 'sunucu');
  eq(await sonuc('ccna-dhcp'), 'yanlis', 'DHCP s3: yanlış arayüze helper → yanlış');
  await sec('ccna-dhcp', 'cozum', 'helper');
  eq(await sonuc('ccna-dhcp'), 'dogru', 'DHCP s3: istemci arayüzünde helper → doğru');
  await sen('ccna-dhcp', 3); await sec('ccna-dhcp', 'pca', 'apipa'); await sec('ccna-dhcp', 'pcb', 'dhcp'); await sec('ccna-dhcp', 'pcc', 'statik');
  eq(await sonuc('ccna-dhcp'), 'dogru', 'DHCP s4: APIPA/DHCP/statik → doğru');
  eq((await kanitlar()).filter(k => /^lab-ccna-dhcp-s\d/.test(k)).length, 4, 'DHCP: 4 senaryo kanıtı');
  await p.locator('#view .lab[data-lab-id=ccna-dhcp] button:text-is("Sıfırla")').click(); await p.waitForTimeout(150);
  eq(await p.evaluate(() => [...document.querySelectorAll('#view .lab select')].map(i => i.value).join('')), '', 'DHCP lab: sıfırla alanları temizler');
  eq((await kanitlar()).length, 4, 'DHCP lab: sıfırla kanıtı silmez');
  ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), '390 px: yatay taşma yok (DHCP lab)');

  // 4) CCNA 10 (OSPF)
  await odaAc('ccna', 's-ccna-10', 'alis'); await p.waitForTimeout(400);
  eq(await p.evaluate(() => [...document.querySelectorAll('#view .lab')].map(e => e.dataset.labId)), ['ccna-ospf'], 'ccna 10: yalnız OSPF lab\'ı');
  await sec('ccna-ospf', 'fa', '1'); await sec('ccna-ospf', 'gi', '0'); await sec('ccna-ospf', 'eth', '10'); await sec('ccna-ospf', 'ayni', 'evet');
  eq(await sonuc('ccna-ospf'), 'yanlis', 'OSPF s1: Gigabit maliyeti 0 → yanlış (en az 1)');
  await sec('ccna-ospf', 'gi', '1');
  eq(await sonuc('ccna-ospf'), 'dogru', 'OSPF s1: 1, 1, 10, aynı → doğru');
  await sen('ccna-ospf', 1); await sec('ccna-ospf', 'yol', 'A'); await sec('ccna-ospf', 'toplam', '11'); await sec('ccna-ospf', 'atlama', 'evet');
  eq(await sonuc('ccna-ospf'), 'yanlis', 'OSPF s2: en az atlamalı yol A seçilmez → yanlış');
  await sec('ccna-ospf', 'yol', 'B'); await sec('ccna-ospf', 'toplam', '3'); await sec('ccna-ospf', 'atlama', 'hayir');
  eq(await sonuc('ccna-ospf'), 'dogru', 'OSPF s2: yol B, 3, atlama sayısına bakmaz → doğru');
  await sen('ccna-ospf', 2); await sec('ccna-ospf', 'komsu', 'hayir'); await sec('ccna-ospf', 'engel', 'hello');
  eq(await sonuc('ccna-ospf'), 'yanlis', 'OSPF s3: engel hello değil → yanlış');
  await sec('ccna-ospf', 'engel', 'area');
  eq(await sonuc('ccna-ospf'), 'dogru', 'OSPF s3: alan uyuşmazlığı → doğru');
  await sen('ccna-ospf', 3); await sec('ccna-ospf', 'dr', 'R3'); await sec('ccna-ospf', 'bdr', 'R4'); await sec('ccna-ospf', 'sifir', 'hayir');
  eq(await sonuc('ccna-ospf'), 'yanlis', 'OSPF s4: öncelik 0 olan R3 DR seçilmez → yanlış');
  await sec('ccna-ospf', 'dr', 'R4'); await sec('ccna-ospf', 'bdr', 'R2');
  eq(await sonuc('ccna-ospf'), 'dogru', 'OSPF s4: DR R4, BDR R2 → doğru');
  eq((await kanitlar()).filter(k => /^lab-ccna-ospf-s\d/.test(k)).length, 4, 'OSPF: 4 senaryo kanıtı (lab-ccna-ospf-*)');
  ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), '390 px: yatay taşma yok (OSPF lab)');

  // 5) Network: net 7 üç lab, net 10 DHCP; kanıt yola göre ayrı, ccna kayıtları net'e sızmaz
  await odaAc('net', 's-net-7', 'alis'); await p.waitForTimeout(400);
  eq(await p.evaluate(() => [...document.querySelectorAll('#view .lab')].map(e => e.dataset.labId)), ['net-rota', 'net-nat', 'net-ospf'], 'net 7: rota + NAT + OSPF lab\'ları');
  ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), '390 px: yatay taşma yok (net 7, üç lab)');
  await sec('net-ospf', 'fa', '1'); await sec('net-ospf', 'gi', '1'); await sec('net-ospf', 'eth', '10'); await sec('net-ospf', 'ayni', 'evet');
  eq(await sonuc('net-ospf'), 'dogru', 'net OSPF s1: doğru');
  ok((await kanitlar()).includes('lab-net-ospf-s1'), 'net OSPF: kanıt lab-net-ospf-s1 (yola göre ayrı)');
  eq(await p.evaluate(() => [PP.lab.tamamlanan('net-ospf'), PP.lab.tamamlanan('ccna-ospf').length], []), [['s1'], 4], 'OSPF: net kaydı ccna sayacına eklenmez, ccna 4 senaryo');
  await odaAc('net', 's-net-10', 'alis'); await p.waitForTimeout(400);
  eq(await p.evaluate(() => [...document.querySelectorAll('#view .lab')].map(e => e.dataset.labId)), ['net-dhcp'], 'net 10: DHCP lab\'ı');
  await sec('net-dhcp', 'm1', 'B'); await sec('net-dhcp', 'm2', 'D'); await sec('net-dhcp', 'm3', 'C'); await sec('net-dhcp', 'm4', 'A');
  eq(await sonuc('net-dhcp'), 'dogru', 'net DHCP s1: doğru');
  eq(await p.evaluate(() => [PP.lab.tamamlanan('net-dhcp'), PP.lab.tamamlanan('ccna-dhcp').length], []), [['s1'], 4], 'DHCP: net kaydı ccna sayacına eklenmez');

  // 6) Bilgi grafiği önerisi yeni lab'ları tanır (lab kapı değil, öneri)
  const du0 = { dersTamam: {}, denemeler: [], kanitlar: [], projeler: {} };
  const tam = (tr, n) => { const o = {}; for (let i = 1; i <= n; i++) o['ders:' + tr + ':' + i] = true; return o; };
  const lk = (id, n) => Array.from({ length: n }, (_, i) => ({ id: 'k' + id + i, tur: 'lab', hedef: 'lab:' + id + ':s' + (i + 1), kapi: null, dogrulama: 'istemci' }));
  const oneri = (yol, du) => p.evaluate(([yol, du]) => { const r = PP.ogr.oneri.sonraki(PP.ogr.ui.graf(), yol, du); return r && [r.tip, r.lab, r.ders]; }, [yol, du]);
  const hepsiCcna = [].concat(lk('ccna-altag', 4), lk('ccna-rota', 4), lk('ccna-acl', 6), lk('ccna-vlan', 4), lk('ccna-nat', 4));
  eq(await oneri('ccna', { ...du0, dersTamam: tam('ccna', 23), kanitlar: hepsiCcna.concat(lk('ccna-ospf', 4)) }), ['lab', 'ccna-dhcp', 'ders:ccna:7'], 'graf: ccna dersleri tamam, DHCP lab eksik → DHCP önerilir (blok değil)');
  eq(await oneri('ccna', { ...du0, dersTamam: tam('ccna', 23), kanitlar: hepsiCcna.concat(lk('ccna-dhcp', 4)) }), ['lab', 'ccna-ospf', 'ders:ccna:10'], 'graf: DHCP tamam, OSPF lab eksik → OSPF önerilir');
  eq(await oneri('ccna', { ...du0, dersTamam: tam('ccna', 23), kanitlar: hepsiCcna.concat(lk('ccna-dhcp', 4), lk('ccna-ospf', 3)) }), ['lab', 'ccna-ospf', 'ders:ccna:10'], 'graf: OSPF 3/4 senaryo → hâlâ öneri');
  eq(await oneri('ccna', { ...du0, dersTamam: tam('ccna', 23), kanitlar: hepsiCcna.concat(lk('ccna-dhcp', 4), lk('ccna-ospf', 4)) }), ['tamam', null, null], 'graf: hepsi tamam → tamam');
  eq(await oneri('ccna', { ...du0, dersTamam: tam('ccna', 23), kanitlar: hepsiCcna.concat(lk('net-dhcp', 4), lk('net-ospf', 4)) }), ['lab', 'ccna-ospf', 'ders:ccna:10'], 'graf: net DHCP/OSPF kanıtları ccna önerisini kapatmaz (sızıntı yok; en sondaki eksik lab önerilir)');
  eq(await p.evaluate((du) => { const r = PP.ogr.oneri.sonrakiLab(PP.ogr.ui.graf(), 'net', du); return r && r.lab; }, { ...du0, dersTamam: tam('net', 7), kanitlar: lk('net-rota', 4).concat(lk('net-nat', 4)) }), 'net-ospf', 'graf: net 7 tamam, OSPF lab eksik → öneri');
  eq(await p.evaluate((du) => { const r = PP.ogr.oneri.sonrakiLab(PP.ogr.ui.graf(), 'net', du); return r && r.lab; }, { ...du0, dersTamam: tam('net', 10), kanitlar: lk('net-rota', 4).concat(lk('net-nat', 4), lk('net-ospf', 4), lk('net-vlan', 4)) }), 'net-dhcp', 'graf: net 10 tamam, DHCP lab eksik → öneri');

  // 7) QA (18) ve teknik İngilizce (11) ders eki: 15 öğe puanı
  for (const [yol, n, ad, kaynaksizBeklenen] of [['qa', 34, 'QA', []], ['eng', 15, 'İngilizce', [0, 9, 10]]]) {
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
    eq(puan.filter(x => x.eksik.length).map(x => x.i), kaynaksizBeklenen, ad + ': kaynaksız konular beklenen (doğrulanamayan sayfa eklenmedi)');
    eq(await p.evaluate((yol) => Object.keys(PP_EK[yol]).length, yol), n, 'PP_EK.' + yol + ' ' + n + ' girdi');
    eq(await p.evaluate((yol) => Object.keys(PP_EK[yol]).every(k => (PP_EK[yol][k].kaynaklar || []).every(s => s.t && s.neden && ['2026-10-12', '2026-10-19', '2026-10-26'].includes(s.dogrulama) && /^https:\/\/[a-z0-9.-]+(\/|$)/.test(s.u))), yol), true, ad + ': her kaynakta ad, neden, tarih 2026-10-12, https adresi');
    eq(await p.evaluate((yol) => { const u = Object.values(PP_EK[yol]).flatMap(e => (e.kaynaklar || []).map(k => k.u)); return u.length > 0 && Object.values(PP_EK[yol]).every(e => { const x = (e.kaynaklar || []).map(k => k.u); return x.length === new Set(x).size; }); }, yol), true, ad + ': bir konuda aynı kaynak iki kez yok');
    eq(await p.evaluate((yol) => TMAP[yol].slice(0, -1).map((T, i) => [i, (PP_EK[yol][i].sonraki || '').indexOf(TMAP[yol][i + 1].k) >= 0]).filter(x => !x[1]).map(x => x[0]), yol), [], ad + ': "sonraki" bir sonraki konuyu anar');
    eq(await p.evaluate((yol) => /Yolun sonu/.test(PP_EK[yol][Object.keys(PP_EK[yol]).length - 1].sonraki), yol), true, ad + ': son konu "Yolun sonu" der');
    // her cümle alanı kısa değil (çok kısa metin yok)
    eq(await p.evaluate((yol) => { const kisa = []; Object.keys(PP_EK[yol]).forEach(k => { const e = PP_EK[yol][k]; [['analoji.a', e.analoji.a, 40], ['analoji.sinir', e.analoji.sinir, 40], ['bagimsiz', e.bagimsiz, 60], ['gecme.olcut', e.gecme.olcut, 40], ['telafi', e.telafi, 40], ['sonraki', e.sonraki, 40]].forEach(x => { if (x[1].length < x[2]) kisa.push(k + ':' + x[0]); }); e.rehberli.forEach((r, j) => { if (r.length < 25) kisa.push(k + ':rehberli' + j); }); }); return kisa; }, yol), [], ad + ': çok kısa metin yok');
    eq(await p.evaluate((yol) => Object.values(PP_EK[yol]).filter(e => e.lab).length, yol), 0, ad + ' eki lab bağlantısı iddia etmez');
  }
  // İngilizce: sınav ya da seviye iddiası yok; QA'da sertifika iddiası yalnız sayfa bağlantısı
  eq(await p.evaluate(() => /IELTS|TOEFL|CEFR|\bPTE\b|\b[ABC][12]\b|sınav puanı|sertifika puanı/.test(JSON.stringify(PP_EK.eng))), false, 'İngilizce eki sınav/seviye/puan iddiası içermez');
  eq(await p.evaluate(() => [Object.keys(PP_EK.sec).length, Object.keys(PP_EK.net).length, Object.keys(PP_EK.ccna).length, Object.keys(PP_EK.bk).length, Object.keys(PP_EK.dev).length]), [39, 18, 23, 51, 22], 'diğer yolların ek girdileri sağlam');

  // Anlatım ve Alıştırma blokları qa ve eng derste görünür
  for (const [yol, n, bolum, beklenen] of [['qa', 3, 'anlat', ['analoji', 'hatalar', 'gecme', 'kaynaklar']], ['qa', 18, 'alis', ['rehberli', 'bagimsiz', 'telafi']], ['eng', 2, 'anlat', ['analoji', 'hatalar', 'gecme', 'kaynaklar', 'sonraki']], ['eng', 11, 'alis', ['rehberli', 'bagimsiz', 'telafi']]]) {
    await odaAc(yol, 's-' + yol + '-' + n, bolum);
    await p.waitForTimeout(400);
    const ek = await p.evaluate(() => [...document.querySelectorAll('#view [data-ek]')].map(e => e.dataset.ek));
    ok(beklenen.every(k => ek.includes(k)), yol + ' ' + n + ' ' + bolum + ': ' + beklenen + ' görünür (' + ek + ')');
    eq(await p.evaluate(() => document.querySelectorAll('#view .lab').length), 0, yol + ' ' + n + ': lab iddiası yok');
    ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), '390 px: yatay taşma yok (' + yol + ' ' + n + ')');
  }
  // Kaynak bağlantıları güvenli açılır
  ok(await p.evaluate(() => [...document.querySelectorAll('#view [data-ek=kaynaklar] a, #view a[href^="https"]')].every(a => a.rel.includes('noopener') && a.target === '_blank')), 'kaynak bağlantıları noopener ile yeni sekmede');

  ok(errs.length === 0, 'sayfa hatası yok ' + errs.join('|'));
  await b.close();
  console.log(fails ? '\nKALDI: ' + fails : '\nGEÇTİ');
  process.exit(fails ? 1 : 0);
})();

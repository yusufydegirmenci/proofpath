// Faz 5 tur 4: VLAN/STP ve NAT/PAT karar lab'ları, kanıt kimliklerinin yola göre ayrılması (geriye uyumla),
// siber ders eki (15 öğe, kaynak denetimi). 390 px. Hata → çıkış 1.
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
  const lesC = (n, baslik) => `window.__store.lessons['2026-10-09-c${n}']={id:'2026-10-09-c${n}',date:'2026-10-09',track:'ccna',kind:'ders',title:'${baslik}',topicId:'s-ccna-${n}',hook:'x',blocks:[{t:'p',text:'Deneme.',items:[],parts:[]}],quiz:[]};`;
  const lesN = (n, baslik) => `window.__store.lessons['2026-10-09-n${n}']={id:'2026-10-09-n${n}',date:'2026-10-09',track:'net',kind:'ders',title:'${baslik}',topicId:'s-net-${n}',hook:'x',blocks:[{t:'p',text:'Deneme.',items:[],parts:[]}],quiz:[]};`;
  await ctx.addInitScript("localStorage.ya_gm_seen='1';" + lesC(5, 'VLAN') + lesC(8, 'NAT') + lesC(14, 'STP ve EtherChannel') + lesN(7, 'Yönlendirme ve NAT') + lesN(8, 'Switching, VLAN ve STP'));
  const p = await ctx.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.goto(U + '#ders');
  await p.waitForTimeout(1500);

  // 1) Saf hesap: doğru cevaplar sabit değil, hesaptan çıkar
  eq(await p.evaluate(() => { const V = PP.lab.vlan; return [V.kokKopru([{ ad: 'A', oncelik: 32768, mac: '0000.0000.0002' }, { ad: 'B', oncelik: 32768, mac: '0000.0000.0001' }]).ad, V.kokKopru([{ ad: 'A', oncelik: 4096, mac: '0000.0000.00FF' }, { ad: 'B', oncelik: 32768, mac: '0000.0000.0001' }]).ad]; }), ['B', 'A'], 'kök köprü: önce öncelik, eşitse MAC');
  eq(await p.evaluate(() => PP.lab.vlan.kokPort([{ port: 'a', maliyet: 19 }, { port: 'b', maliyet: 8 }]).port), 'b', 'kök port: en düşük toplam maliyet');
  eq(await p.evaluate(() => [PP.lab.vlan.trunkGecer([10, 20], 30), PP.lab.vlan.trunkGecer([10, 20], 10)]), [false, true], 'trunk: yalnız izinli VLAN geçer');
  eq(await p.evaluate(() => [PP.lab.nat.donus(PP.lab.nat.TABLO, '203.0.113.2', 60002).il, PP.lab.nat.donus(PP.lab.nat.TABLO, '203.0.113.2', 60099)]), ['192.168.1.11', null], 'NAT: dönüş tablodan eşlenir, kayıt yoksa null');
  eq(await p.evaluate(() => ['192.168.1.10', '10.1.1.1', '172.16.5.5', '172.32.0.1', '203.0.113.2'].map(PP.lab.nat.ozel)), [true, true, true, false, false], 'NAT: RFC 1918 özel adres ayrımı');
  // her senaryonun doğru cevabı kendi kontrolünden geçer, boş cevap geçmez
  eq(await p.evaluate(() => ['ccna-vlan', 'ccna-nat', 'net-vlan', 'net-nat'].map(id => { const T = PP.lab.tanimlar[id]; return T.sc.every(s => T.kontrol(s, s.dogru).dogru && !T.kontrol(s, {}).dogru); })), [true, true, true, true], 'karar lab: doğru cevap geçer, boş cevap geçmez (4 senaryo)');
  eq(await p.evaluate(() => ['ccna-vlan', 'ccna-nat', 'net-vlan', 'net-nat'].map(id => PP.lab.tanimlar[id].sc.length)), [4, 4, 4, 4], 'her yeni lab 4 senaryo');
  eq(await p.evaluate(() => { const L = PP.ogr.oneri.LAB; return [L['ders:net:8'][0].toplam, L['ders:net:7'][1].toplam, L['ders:ccna:5'][0].toplam, L['ders:ccna:8'][0].toplam, L['ders:ccna:14'][0].toplam]; }), [4, 4, 4, 4, 4], 'oneri.LAB: yeni lab toplamları');
  eq(await p.evaluate(() => { const L = PP.ogr.oneri.LAB, T = PP.lab.tanimlar; return Object.keys(L).every(k => L[k].every(x => (T[x.id] || x.id === 'net-altag') && (x.id === 'net-altag' || T[x.id].sc.length === x.toplam))); }), true, 'oneri.LAB: her lab tanımlı, toplam = senaryo sayısı');

  const odaAc = (tr, tid, adim) => p.evaluate(([tr, t, a]) => { const l = lessonsOf(tr).filter(x => x.topicId === t)[0]; S.les.track = tr; lcSet(lessonKey(l), 'w', tr); lrOpen(l, a); return l.id; }, [tr, tid, adim]);
  const kanitlar = () => p.evaluate(() => (JSON.parse(localStorage.getItem('ya_pp_ogr') || '{}').kanitlar || []).filter(k => k.tur === 'lab').map(k => k.id));
  const sonuc = async (lab) => { const q = '#view .lab[data-lab-id=' + lab + ']'; await p.locator(q + ' button:text-is("Kontrol et")').click(); await p.waitForTimeout(250); return p.evaluate((q) => { const e = document.querySelector(q + ' [data-lab]'); return e ? e.dataset.lab : null; }, q); };
  const sec = (lab, ad, v) => p.selectOption('#view .lab[data-lab-id=' + lab + '] [data-alan=' + ad + '] select', v);
  const sen = (lab, k) => p.locator('#view .lab[data-lab-id=' + lab + '] .lab-sec button').nth(k).click().then(() => p.waitForTimeout(200));
  await p.evaluate(() => goTab('ders'));

  // 2) CCNA 4 (VLAN): arayüz, yanlış → doğru, kanıt
  await odaAc('ccna', 's-ccna-5', 'alis'); await p.waitForTimeout(400);
  eq(await p.evaluate(() => { const e = document.querySelector('#view .lab'); return [e.dataset.labId, e.textContent.includes('Yerel simülasyon'), e.textContent.includes('gerçek switch/router yok'), e.textContent.includes('Sıfırla'), e.textContent.includes('İpucu'), e.querySelectorAll('.lab-sat').length]; }), ['ccna-vlan', true, true, true, true, 3], 'ccna 4: VLAN lab\'ı (etiket, sıfırla, ipucu, durum tablosu)');
  await sec('ccna-vlan', 'ab', 'evet'); await sec('ccna-vlan', 'ac', 'evet');
  eq(await sonuc('ccna-vlan'), 'yanlis', 'VLAN s1: farklı VLAN\'a evet → yanlış');
  eq(await p.evaluate(() => [...document.querySelectorAll('#view .lab .lab-f')].map(e => e.classList.contains('ok') ? 'ok' : e.classList.contains('no') ? 'no' : '-')), ['ok', 'no'], 'VLAN s1: alan bazlı işaret');
  eq(await kanitlar(), [], 'VLAN s1: yanlışta kanıt yok');
  await sec('ccna-vlan', 'ac', 'hayir');
  eq(await sonuc('ccna-vlan'), 'dogru', 'VLAN s1: doğru');
  ok(await p.evaluate(() => /Neden/.test(document.querySelector('#view .lab [data-lab=aciklama]').textContent)), 'VLAN s1: kontrolden sonra neden açıklanır');
  eq(await kanitlar(), ['lab-ccna-vlan-s1'], 'VLAN s1: kanıt kaydedildi (lab-ccna-vlan-s1)');
  await sen('ccna-vlan', 2);
  await sec('ccna-vlan', 'kok', 'SW2'); await sec('ccna-vlan', 'esit', 'SW1');
  eq(await sonuc('ccna-vlan'), 'yanlis', 'STP s3: eşit öncelikte büyük MAC → yanlış');
  await sec('ccna-vlan', 'esit', 'SW3');
  eq(await sonuc('ccna-vlan'), 'dogru', 'STP s3: kök SW2, eşitlikte SW3 → doğru');
  await sen('ccna-vlan', 3);
  await p.locator('#view .lab[data-lab-id=ccna-vlan] button:text-is("İpucu")').click(); await p.waitForTimeout(150);
  await sec('ccna-vlan', 'kokport', 'Gi0/2'); await sec('ccna-vlan', 'diger', 'engelli');
  eq(await sonuc('ccna-vlan'), 'dogru', 'STP s4: kök port Gi0/2, diğeri engelli → doğru');
  ok((await kanitlar()).includes('lab-ccna-vlan-s4-ipucu'), 'STP s4: ipucu kullanılan senaryo ayrı işaretle');
  await p.locator('#view .lab[data-lab-id=ccna-vlan] button:text-is("Sıfırla")').click(); await p.waitForTimeout(150);
  eq(await p.evaluate(() => [...document.querySelectorAll('#view .lab select')].map(i => i.value).join('')), '', 'VLAN lab: sıfırla alanları temizler');
  eq((await kanitlar()).length, 3, 'VLAN lab: sıfırla kanıtı silmez');
  ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), '390 px: yatay taşma yok (VLAN lab)');

  // 3) CCNA 7 (NAT)
  await odaAc('ccna', 's-ccna-8', 'alis'); await p.waitForTimeout(400);
  eq(await p.evaluate(() => [...document.querySelectorAll('#view .lab')].map(e => e.dataset.labId)), ['ccna-nat'], 'ccna 7: NAT lab\'ı bağlı (yalnız bu)');
  await sec('ccna-nat', 'kaynak', '192.168.1.10'); await sec('ccna-nat', 'hedef', 'hayir');
  eq(await sonuc('ccna-nat'), 'yanlis', 'NAT s1: kaynak çevrilmedi → yanlış');
  await sec('ccna-nat', 'kaynak', '203.0.113.2');
  eq(await sonuc('ccna-nat'), 'dogru', 'NAT s1: kaynak genel adrese çevrilir → doğru');
  await sen('ccna-nat', 1); await sec('ccna-nat', 'host', '192.168.1.11'); await sec('ccna-nat', 'port', '60002');
  eq(await sonuc('ccna-nat'), 'yanlis', 'NAT s2: iç port 51000 olmalı → yanlış');
  await sec('ccna-nat', 'port', '51000');
  eq(await sonuc('ccna-nat'), 'dogru', 'NAT s2: dönüş tablodan eşlenir → doğru');
  await sen('ccna-nat', 2); await sec('ccna-nat', 'kayit', 'hayir'); await sec('ccna-nat', 'karar', 'atar');
  eq(await sonuc('ccna-nat'), 'dogru', 'NAT s3: kayıt yok → atılır → doğru');
  await sen('ccna-nat', 3); await sec('ccna-nat', 'a', 'local'); await sec('ccna-nat', 'b', 'global'); await sec('ccna-nat', 'c', 'dis');
  eq(await sonuc('ccna-nat'), 'dogru', 'NAT s4: inside local / inside global / outside global → doğru');
  eq((await kanitlar()).filter(k => /^lab-ccna-nat-s\d$/.test(k)).length, 4, 'NAT: 4 senaryo kanıtı (lab-ccna-nat-*)');
  ok(await p.evaluate(() => (JSON.parse(localStorage.getItem('ya_pp_ogr') || '{}').kanitlar || []).filter(k => k.tur === 'lab').every(k => k.kapi == null && k.dogrulama === 'istemci')), 'lab kanıtları kapı değil, istemci doğrulaması');

  // 4) CCNA 13 (STP) aynı lab, aynı kimlik
  await odaAc('ccna', 's-ccna-14', 'alis'); await p.waitForTimeout(400);
  eq(await p.evaluate(() => [...document.querySelectorAll('#view .lab')].map(e => e.dataset.labId)), ['ccna-vlan'], 'ccna 13 (STP): VLAN/STP lab\'ı bağlı');

  // 5) Network: yola göre ayrı kimlik; ccna kanıtı net'e sızmaz
  const once = (await kanitlar()).length;
  await odaAc('net', 's-net-8', 'alis'); await p.waitForTimeout(400);
  eq(await p.evaluate(() => [...document.querySelectorAll('#view .lab')].map(e => e.dataset.labId)), ['net-vlan'], 'net 7: VLAN/STP lab\'ı net kimliğiyle');
  eq(await p.evaluate(() => document.querySelector('#view .lab').textContent.includes('0 / 4 senaryo kanıtlı')), true, 'net VLAN lab: ccna VLAN kanıtı net sayacına karışmaz');
  await sec('net-vlan', 'ab', 'evet'); await sec('net-vlan', 'ac', 'hayir');
  eq(await sonuc('net-vlan'), 'dogru', 'net VLAN s1: doğru');
  ok((await kanitlar()).includes('lab-net-vlan-s1') && (await kanitlar()).length === once + 1, 'net VLAN: kanıt lab-net-vlan-s1 olarak ayrı kaydedildi');
  await odaAc('net', 's-net-7', 'alis'); await p.waitForTimeout(400);
  eq(await p.evaluate(() => [...document.querySelectorAll('#view .lab')].map(e => e.dataset.labId)), ['net-rota', 'net-nat'], 'net 6: rota + NAT lab\'ları');
  ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), '390 px: yatay taşma yok (net 6, iki lab)');

  // 6) Geriye uyum: eski ortak kayıtlar (lab:ccna-rota:*) iki yolda da sayılır; yeni net kaydı ccna'ya sızmaz
  const lk = (id, n) => Array.from({ length: n }, (_, i) => ({ id: 'k' + id + i, tur: 'lab', hedef: 'lab:' + id + ':s' + (i + 1), kapi: null, dogrulama: 'istemci' }));
  const labDurum = (lab, kan) => p.evaluate(([lab, kan]) => PP.ogr.oneri.labDurum(kan, lab), [lab, kan]);
  eq((await labDurum({ id: 'net-rota', eski: 'ccna-rota', toplam: 4 }, lk('ccna-rota', 3))).yapilan, 3, 'geriye uyum: eski lab:ccna-rota:* kayıtları net-rota\'da sayılır');
  eq((await labDurum({ id: 'ccna-rota', toplam: 4 }, lk('ccna-rota', 4))).tamam, true, 'geriye uyum: ccna-rota eski kayıtlarla tamam');
  eq((await labDurum({ id: 'ccna-rota', toplam: 4 }, lk('net-rota', 4))).yapilan, 0, 'ayrım: yeni net-rota kaydı ccna-rota\'ya sayılmaz');
  eq((await labDurum({ id: 'net-rota', eski: 'ccna-rota', toplam: 4 }, lk('ccna-rota', 2).concat(lk('net-rota', 3)))).yapilan, 3, 'eski + yeni aynı senaryoyu çift saymaz');
  eq(await p.evaluate(() => { PP.ogr.depo.kanitEkle({ id: 'lab-ccna-rota-s1', tur: 'lab', hedef: 'lab:ccna-rota:s1', dogrulama: 'istemci' }); return [PP.lab.tamamlanan('net-rota'), PP.lab.tamamlanan('ccna-rota'), PP.lab.tamamlanan('net-nat')]; }), [['s1'], ['s1'], []], 'arayüz: eski lab:ccna-rota:s1 kaydı iki yolun sayacında görünür');
  // eski kayıt hâlâ okunur: depo şeması değişmedi
  ok(await p.evaluate(() => (JSON.parse(localStorage.getItem('ya_pp_ogr') || '{}').kanitlar || []).some(k => k.id === 'lab-ccna-rota-s1')), 'eski kayıt silinmedi / biçim değişmedi');

  // 7) Bilgi grafiği: ccna 4 tamam, VLAN lab eksik → öneri
  const du0 = { dersTamam: {}, denemeler: [], kanitlar: [], projeler: {} };
  const tam = (tr, n) => { const o = {}; for (let i = 1; i <= n; i++) o['ders:' + tr + ':' + i] = true; return o; };
  eq(await p.evaluate((du) => { const r = PP.ogr.oneri.sonrakiLab(PP.ogr.ui.graf(), 'ccna', du); return r && [r.tip, r.lab, r.ders]; }, { ...du0, dersTamam: tam('ccna', 5) }), ['lab', 'ccna-vlan', 'ders:ccna:5'], 'graf: ccna 5 tamam, VLAN lab eksik → lab önerisi');
  eq(await p.evaluate((du) => { const r = PP.ogr.oneri.sonrakiLab(PP.ogr.ui.graf(), 'net', du); return r && [r.tip, r.lab, r.ders]; }, { ...du0, dersTamam: tam('net', 8) }), ['lab', 'net-vlan', 'ders:net:8'], 'graf: net 8 tamam, VLAN/STP lab eksik → lab önerisi');

  // 8) Siber ders eki (15 öğe puanı) ve kaynak denetimi
  const puan = await p.evaluate(() => TMAP.sec.map((T, i) => {
    const e = (PP_EK.sec || {})[i] || {};
    const net = (x) => typeof x === 'string' ? x.trim().length > 20 : !!x;
    const m = [
      ['1 hedef/önkoşul', T.p && T.p.length >= 3 && net(T.o)], ['2 sade açıklama', net(T.w)], ['3 terim', T.m && T.m.length >= 3], ['4 örnek', net(T.x)],
      ['5 benzetme', !!(e.analoji && net(e.analoji.a))], ['6 benzetme sınırı', !!(e.analoji && net(e.analoji.sinir))], ['7 görsel/şema', /\n/.test(T.x || '')],
      ['8 rehberli', !!(e.rehberli && e.rehberli.length >= 3)], ['9 bağımsız', net(e.bagimsiz)], ['10 hatalar', !!(e.hatalar && e.hatalar.length >= 3 && T.f && T.f.length >= 1)],
      ['11 bilgi kontrolü', !!(T.u && T.u.length >= 3)], ['12 geçme+kritik', !!(e.gecme && net(e.gecme.olcut) && e.gecme.kritik && e.gecme.kritik.length >= 2)],
      ['13 lab/sonraki bağ', net(e.sonraki)], ['14 kaynak (koşullu)', !!(e.kaynaklar && e.kaynaklar.length)], ['15 telafi+sonraki', net(e.telafi) && net(e.sonraki)]];
    return { i, ad: T.k, eksik: m.filter(x => !x[1]).map(x => x[0]) };
  }));
  eq(puan.length, 31, 'Siber yolu 31 konu');
  eq(puan.map(x => ({ i: x.i, eksik: x.eksik.filter(k => !/kaynak/.test(k)) })).filter(x => x.eksik.length), [], 'Siber 31 konu: 14 çekirdek öğe tam (kaynak koşullu)');
  console.log('INFO  siber kaynaksız konular: ' + puan.filter(x => x.eksik.length).map(x => x.i + ':' + x.ad).join(', '));
  ok(puan.filter(x => !x.eksik.length).length >= 15, 'kaynaklı (15/15) siber konu sayısı ≥ 15 (' + puan.filter(x => !x.eksik.length).length + ')');
  const bad = await p.evaluate(() => Object.values(PP_EK.sec).flatMap(e => (e.kaynaklar || []).map(k => k.u + '|' + k.dogrulama))
    .filter(s => !/^https:\/\/(www\.rfc-editor\.org\/rfc\/rfc\d+|csrc\.nist\.gov\/pubs\/(sp\/800|fips\/180-4|ai\/100)\/[0-9a-z\/-]+\/final|owasp\.org\/www-(project|community)[0-9A-Za-z\/_-]*)\|2026-10-12$/.test(s)));
  eq(bad, [], 'siber kaynaklar: yalnız doğrulanmış alanlar ve doğrulama tarihi 2026-10-12');
  eq(await p.evaluate(() => Object.keys(PP_EK.sec).every(k => !(PP_EK.sec[k].kaynaklar || []).some(s => !s.neden || !s.t))), true, 'siber: her kaynakta ad ve neden var');
  eq(await p.evaluate(() => Object.keys(PP_EK.sec).length), 31, 'PP_EK.sec 31 girdi');
  // Anlatım ve Alıştırma blokları siber derste görünür
  await p.evaluate(() => { const l = { id: 'x-sec', date: '2026-10-09', track: 'sec', kind: 'ders', title: 'CIA üçlüsü', topicId: 's-sec-2', hook: 'x', blocks: [{ t: 'p', text: 'Deneme.', items: [], parts: [] }], quiz: [] }; S.lessons.push(l); });
  await p.evaluate(() => { const l = lessonsOf('sec').filter(x => x.topicId === 's-sec-2')[0]; S.les.track = 'sec'; lcSet(lessonKey(l), 'w', 'sec'); lrOpen(l, 'anlat'); });
  await p.waitForTimeout(400);
  const ek = await p.evaluate(() => [...document.querySelectorAll('#view [data-ek]')].map(e => e.dataset.ek));
  ok(['analoji', 'hatalar', 'gecme'].every(k => ek.includes(k)), 'siber 1 Anlatım: benzetme+sınır, hatalar, geçme görünür (' + ek + ')');

  ok(errs.length === 0, 'sayfa hatası yok ' + errs.join('|'));
  await b.close();
  console.log(fails ? '\nKALDI: ' + fails : '\nGEÇTİ');
  process.exit(fails ? 1 : 0);
})();

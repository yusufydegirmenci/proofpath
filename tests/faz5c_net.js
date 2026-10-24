// Faz 5 tur 3 (Network yolu 4–17): 15 öğe puanı (18 konu), dış kaynak denetimi, lab bağlantıları (rota, ACL),
// dev/net/qa önkoşul sırası denetimi (STARTER = TMAP sırası, zincir), 390 px. Hata → çıkış 1.
const path = require('path');
const fs = require('fs');
const { INIT, chromium } = require('./stub.js');
const U = require('url').pathToFileURL(path.join(__dirname, '..', 'index.html')).href;
let fails = 0;
const ok = (c, m) => { console.log((c ? 'OK    ' : 'HATA  ') + m); if (!c) fails++; };
const eq = (a, b, m) => { const s = JSON.stringify(a) === JSON.stringify(b); ok(s, m + (s ? '' : '  → beklenen ' + JSON.stringify(b) + ', gelen ' + JSON.stringify(a))); };

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.addInitScript(INIT);
  const les = (n, baslik) => `window.__store.lessons['2026-10-09-n${n}']={id:'2026-10-09-n${n}',date:'2026-10-09',track:'net',kind:'ders',title:'${baslik}',topicId:'s-net-${n}',hook:'x',blocks:[{t:'p',text:'Deneme.',items:[],parts:[]}],quiz:[]};`;
  await ctx.addInitScript("localStorage.ya_gm_seen='1';" + les(5, 'IPv6 ve trafik türleri') + les(7, 'Yönlendirme ve NAT') + les(14, 'Güvenlik duvarı, VPN ve kimlik doğrulama') + les(8, 'Switching, VLAN ve STP'));
  const p = await ctx.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.goto(U + '#ders');
  await p.waitForTimeout(1500);

  // 1) 15 öğe puanı: TMAP + PP_EK (yapısal kontrol; içerik doğruluğu değil)
  const puan = await p.evaluate(() => TMAP.net.map((T, i) => {
    const e = (PP_EK.net || {})[i] || {};
    const net = (x) => typeof x === 'string' ? x.trim().length > 20 : !!x;
    const m = [
      ['1 hedef/önkoşul', T.p && T.p.length >= 3 && net(T.o)], ['2 sade açıklama', net(T.w)], ['3 terim', T.m && T.m.length >= 3], ['4 örnek', net(T.x)],
      ['5 benzetme', !!(e.analoji && net(e.analoji.a))], ['6 benzetme sınırı', !!(e.analoji && net(e.analoji.sinir))], ['7 görsel/şema', /\n/.test(T.x || '')],
      ['8 rehberli', !!(e.rehberli && e.rehberli.length >= 3)], ['9 bağımsız', net(e.bagimsiz)], ['10 hatalar', !!(e.hatalar && e.hatalar.length >= 3 && T.f && T.f.length >= 1)],
      ['11 bilgi kontrolü', !!(T.u && T.u.length >= 3)], ['12 geçme+kritik', !!(e.gecme && net(e.gecme.olcut) && e.gecme.kritik && e.gecme.kritik.length >= 2)],
      ['13 lab/sonraki bağ', net(e.sonraki)], ['14 kaynak (koşullu)', !!(e.kaynaklar && e.kaynaklar.length)], ['15 telafi+sonraki', net(e.telafi) && net(e.sonraki)]];
    return { i, ad: T.k, eksik: m.filter(x => !x[1]).map(x => x[0]) };
  }));
  eq(puan.length, 18, 'Network yolu 18 konu');
  const cekirdek = puan.map(x => ({ i: x.i, eksik: x.eksik.filter(k => !/kaynak/.test(k)) })).filter(x => x.eksik.length);
  eq(cekirdek, [], 'Network 18 konu: 14 çekirdek öğe tam (kaynak koşullu)');
  console.log('INFO  kaynaksız konular (doğrulanabilir kaynak yok): ' + puan.filter(x => x.eksik.length).map(x => x.i + ':' + x.ad).join(', '));
  const kaynakli = puan.filter(x => !x.eksik.length).map(x => x.i);
  ok(kaynakli.length >= 10, 'kaynaklı (15/15) konu sayısı ≥ 10 (' + kaynakli.length + ')');
  const bad = await p.evaluate(() => Object.values(PP_EK.net).flatMap(e => (e.kaynaklar || []).map(k => k.u + '|' + k.dogrulama))
    .filter(s => !/^https:\/\/(www\.rfc-editor\.org\/rfc\/rfc\d+|www\.iana\.org\/assignments\/[a-z0-9-]+\/[a-z0-9-]+\.xhtml|csrc\.nist\.gov\/pubs\/sp\/800\/145\/final)\|2026-10-1[12]$/.test(s)));
  eq(bad, [], 'kaynaklar yalnız doğrulanmış alanlar ve doğrulama tarihi (2026-10-11/12)');
  eq(await p.evaluate(() => Object.keys(PP_EK.net).filter(k => +k >= 4).every(k => !(PP_EK.net[k].kaynaklar || []).some(s => !s.neden || !s.t))), true, 'her kaynakta ad ve neden var');
  eq(await p.evaluate(() => [7, 8, 14, 16].map(k => (PP_EK.net[k].kaynaklar || []).length)), [0, 0, 0, 0], 'IEEE/CompTIA konularına kaynak eklenmedi (doğrulanamadı)');
  eq(await p.evaluate(() => [6, 7, 13].map(k => PP_EK.net[k].lab)), [['net-rota', 'net-nat', 'net-ospf'], 'net-vlan', 'net-acl'], 'net 6, 7 ve 13 lab bağlı (yola göre kimlik)');

  // 2) Ders odası: Anlatım + Alıştırma blokları (net 4, IPv6)
  const odaAc = (n, adim) => p.evaluate(([n, a]) => { const l = lessonsOf('net').filter(x => x.topicId === 's-net-' + n)[0]; S.les.track = 'net'; lcSet(lessonKey(l), 'w', 'net'); lrOpen(l, a); return l.id; }, [n, adim]);
  await p.evaluate(() => goTab('ders'));
  await odaAc(5, 'anlat'); await p.waitForTimeout(400);
  const ek = await p.evaluate(() => [...document.querySelectorAll('#view [data-ek]')].map(e => e.dataset.ek));
  ok(['analoji', 'hatalar', 'gecme', 'kaynaklar'].every(k => ek.includes(k)), 'net 4 Anlatım: benzetme+sınır, hatalar, geçme, kaynaklar görünür (' + ek + ')');
  ok((await p.evaluate(() => document.querySelector('#view [data-ek=kaynaklar]').textContent)).includes('2026-10-12'), 'kaynak son doğrulama tarihi yazılı');
  await odaAc(5, 'alis'); await p.waitForTimeout(400);
  ok(await p.evaluate(() => ['rehberli', 'bagimsiz', 'telafi'].every(k => document.querySelector('#view [data-ek=' + k + ']'))), 'net 4 Alıştırma: rehberli, bağımsız, telafi görünür');
  eq(await p.evaluate(() => document.querySelectorAll('#view .lab').length), 0, 'lab olmayan derste lab paneli yok');
  await odaAc(8, 'alis'); await p.waitForTimeout(400);
  eq(await p.evaluate(() => [...document.querySelectorAll('#view .lab')].map(e => e.dataset.labId)), ['net-vlan'], 'net 7 (VLAN/STP): form tabanlı karar lab (tur 4)');

  // 3) net 6: rota lab'ı (ccna ile paylaşılır)
  const kanitlar = () => p.evaluate(() => (JSON.parse(localStorage.getItem('ya_pp_ogr') || '{}').kanitlar || []).filter(k => k.tur === 'lab').map(k => k.id));
  const sonuc = async (lab) => { const q = '#view .lab' + (lab ? '[data-lab-id=' + lab + ']' : ''); await p.locator(q + ' button:text-is("Kontrol et")').click(); await p.waitForTimeout(250); return p.evaluate((q) => { const e = document.querySelector(q + ' [data-lab]'); return e ? e.dataset.lab : null; }, q); };
  await odaAc(7, 'alis'); await p.waitForTimeout(400);
  eq(await p.evaluate(() => { const e = document.querySelector('#view .lab[data-lab-id=net-rota]'); return [e.dataset.labId, e.textContent.includes('Yerel simülasyon'), e.textContent.includes('Sıfırla'), e.textContent.includes('İpucu')]; }), ['net-rota', true, true, true], 'net 6: rota lab\'ı, yerel simülasyon etiketi, sıfırla, ipucu');
  await p.fill('#view .lab[data-lab-id=net-rota] [data-alan=eslesen] input', '4'); await p.selectOption('#view .lab[data-lab-id=net-rota] [data-alan=satir] select', '1');
  eq(await sonuc('net-rota'), 'yanlis', 'net 6 lab: yanlış satır → yanlış');
  eq(await kanitlar(), [], 'net 6 lab: yanlışta kanıt yok');
  await p.selectOption('#view .lab[data-lab-id=net-rota] [data-alan=satir] select', '3');
  eq(await sonuc('net-rota'), 'dogru', 'net 6 lab: doğru satır');
  eq(await kanitlar(), ['lab-net-rota-s1'], 'net 6 lab: kanıt yola göre ayrı kimlikle kaydedildi (lab-net-rota-*)');

  // 4) net 13: ACL lab'ı
  await odaAc(14, 'alis'); await p.waitForTimeout(400);
  eq(await p.evaluate(() => document.querySelector('#view .lab').dataset.labId), 'net-acl', 'net 13: ACL lab\'ı bağlı');
  await p.selectOption('#view .lab [data-alan=karar] select', 'deny'); await p.selectOption('#view .lab [data-alan=satir] select', '1');
  eq(await sonuc(), 'dogru', 'net 13 lab: telnet deny satır 1');
  ok((await kanitlar()).includes('lab-net-acl-s1'), 'net 13 lab: kanıt kaydedildi');
  ok(await p.evaluate(() => (JSON.parse(localStorage.getItem('ya_pp_ogr') || '{}').kanitlar || []).filter(k => k.tur === 'lab').every(k => k.kapi == null)), 'lab kanıtları kapı kanıtı değil');
  ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), '390 px: yatay taşma yok (ACL lab, net)');

  // 5) Bilgi grafiği: net'te eksik lab önerisi (kapı değil)
  const du0 = { dersTamam: {}, denemeler: [], kanitlar: [], projeler: {} };
  const tam = (n) => { const o = {}; for (let i = 1; i <= n; i++) o['ders:net:' + i] = true; return o; };
  const lk = (id, n) => Array.from({ length: n }, (_, i) => ({ id: 'k' + id + i, tur: 'lab', hedef: 'lab:' + id + ':s' + (i + 1), kapi: null, dogrulama: 'istemci' }));
  eq(await p.evaluate((du) => { const r = PP.ogr.oneri.sonrakiLab(PP.ogr.ui.graf(), 'net', du); return r && [r.tip, r.lab, r.ders]; }, { ...du0, dersTamam: tam(7) }), ['lab', 'net-rota', 'ders:net:7'], 'graf: net ders 7 tamam, rota lab eksik → lab önerisi');
  eq(await p.evaluate((du) => PP.ogr.oneri.sonrakiLab(PP.ogr.ui.graf(), 'net', du), { ...du0, dersTamam: tam(7), kanitlar: lk('net-rota', 4).concat(lk('net-nat', 4), lk('net-ospf', 4)) }), null, 'graf: rota, NAT ve OSPF lab kanıtı tamam → öneri kalkar');
  eq(await p.evaluate((du) => { const r = PP.ogr.oneri.sonrakiLab(PP.ogr.ui.graf(), 'net', du); return r && r.lab; }, { ...du0, dersTamam: tam(14), kanitlar: lk('net-rota', 4) }), 'net-acl', 'graf: net ders 14 tamam → ACL lab önerisi');
  eq(await p.evaluate(() => { const L = PP.ogr.oneri.LAB, T = PP.lab.tanimlar; return Object.keys(L).every(k => L[k].every(x => T[x.id] || x.id === 'net-altag')); }), true, 'oneri.LAB tüm lab\'lar tanımlı');
  eq(await p.evaluate(() => { const L = PP.ogr.oneri.LAB; return [L['ders:net:7'][0].toplam === PP.lab.karar.ROTA.length, L['ders:net:14'][0].toplam === PP.lab.karar.ACL_SEN.length]; }), [true, true], 'oneri.LAB senaryo sayıları lab tanımıyla aynı');

  // 6) Önkoşul sırası denetimi (dev, net, qa): STARTER sırası = TMAP sırası; grafik zinciri doğrusal
  const sira = await p.evaluate(() => ['net', 'dev', 'qa'].map(tr => {
    const norm = x => String(x || '').toLowerCase().replace(/[^a-zçğıöşü0-9]+/g, ' ').trim();
    const sorun = STARTER[tr].map((r, k) => { const i = TMAP[tr].findIndex(e => e.n.some(x => norm(x) === norm(r[0]))); return i === k ? null : [k, r[0], i]; }).filter(Boolean);
    const G = PP.ogr.ui.graf(); let zincir = true, n = 0;
    Object.keys(G.dersler).filter(id => id.indexOf('ders:' + tr + ':') === 0).forEach(id => {
      n++; const d = G.dersler[id], k = +id.split(':')[2], beklenen = k > 1 ? 'ders:' + tr + ':' + (k - 1) : null;
      const yet = G.yetkinlikler[d.yetkinlikler[0]];
      if (d.onceki !== beklenen || (yet.onkosullar[0] || null) !== (beklenen ? 'yet:' + tr + ':' + (k - 1) : null)) zincir = false;
    });
    return { tr, starter: STARTER[tr].length, tmap: TMAP[tr].length, ders: n, sorun, zincir };
  }));
  eq(sira, [{ tr: 'net', starter: 18, tmap: 18, ders: 18, sorun: [], zincir: true }, { tr: 'dev', starter: 22, tmap: 22, ders: 22, sorun: [], zincir: true }, { tr: 'qa', starter: 22, tmap: 22, ders: 22, sorun: [], zincir: true }], 'önkoşul sırası: STARTER=TMAP, ders ve yetkinlik zinciri doğrusal (net, dev, qa)');
  eq(await p.evaluate(() => PP.ogr.graf.dogrula(PP.ogr.ui.graf()).hata), [], 'müfredat grafiği: tutarlılık hatası yok');

  ok(errs.length === 0, 'sayfa hatası yok ' + errs.join('|'));
  await b.close();
  console.log(fails ? '\nKALDI: ' + fails : '\nGEÇTİ');
  process.exit(fails ? 1 : 0);
})();

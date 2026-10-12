// Faz 5 tur 2 (CCNA yolu): 15 öğe puanlaması (17 konu), rota/ACL lab hesabı (bağımsız sabitlerle), lab arayüzü,
// bilgi grafiği "en küçük sonraki adım" (lab kanıtı öneriyi etkiler, kapıyı etkilemez), 390 px. Hata → çıkış 1.
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
  const les = (n, tid, baslik) => `window.__store.lessons['2026-10-09-c${n}']={id:'2026-10-09-c${n}',date:'2026-10-09',track:'ccna',kind:'ders',title:'${baslik}',topicId:'${tid}',hook:'x',blocks:[{t:'p',text:'Deneme.',items:[],parts:[]}],quiz:[]};`;
  await ctx.addInitScript("localStorage.ya_gm_seen='1';" + les(3, 's-ccna-3', 'Subnetting (alt ağlara bölme)') + les(6, 's-ccna-6', 'Router ve yönlendirme (static route)') + les(9, 's-ccna-9', 'ACL (erişim listesi)') + les(1, 's-ccna-1', 'Ağ nedir? Cihazlar ve kablolar'));
  const p = await ctx.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.goto(U + '#ders');
  await p.waitForTimeout(1500);

  // 1) 15 öğe puanı: TMAP + PP_EK (yapısal kontrol; içerik doğruluğu değil)
  const puan = await p.evaluate(() => TMAP.ccna.map((T, i) => {
    const e = (PP_EK.ccna || {})[i] || {};
    const net = (x) => typeof x === 'string' ? x.trim().length > 20 : !!x;
    const m = [
      ['1 hedef/önkoşul', T.p && T.p.length >= 3 && net(T.o)], ['2 sade açıklama', net(T.w)], ['3 terim', T.m && T.m.length >= 3], ['4 örnek', net(T.x)],
      ['5 benzetme', !!(e.analoji && net(e.analoji.a))], ['6 benzetme sınırı', !!(e.analoji && net(e.analoji.sinir))], ['7 görsel/şema', /\n/.test(T.x || '')],
      ['8 rehberli', !!(e.rehberli && e.rehberli.length >= 3)], ['9 bağımsız', net(e.bagimsiz)], ['10 hatalar', !!(e.hatalar && e.hatalar.length >= 3 && T.f && T.f.length >= 1)],
      ['11 bilgi kontrolü', !!(T.u && T.u.length >= 3)], ['12 geçme+kritik', !!(e.gecme && net(e.gecme.olcut) && e.gecme.kritik && e.gecme.kritik.length >= 2)],
      ['13 lab/sonraki bağ', net(e.sonraki)], ['14 kaynak (koşullu)', !!(e.kaynaklar && e.kaynaklar.length)], ['15 telafi+sonraki', net(e.telafi) && net(e.sonraki)]];
    return { i, ad: T.k, eksik: m.filter(x => !x[1]).map(x => x[0]) };
  }));
  const cekirdek = puan.map(x => ({ i: x.i, eksik: x.eksik.filter(k => !/kaynak/.test(k)) })).filter(x => x.eksik.length);
  eq(cekirdek, [], 'CCNA 17 konu: 14 çekirdek öğe tam (kaynak koşullu)');
  console.log('INFO  kaynaksız konular (doğrulanabilir kaynak yok): ' + puan.filter(x => x.eksik.length).map(x => x.i + ':' + x.ad).join(', '));
  ok(puan.filter(x => !x.eksik.length).length >= 8, 'kaynaklı (15/15) konu sayısı ≥ 8');
  const bad = await p.evaluate(() => Object.values(PP_EK.ccna).flatMap(e => (e.kaynaklar || []).map(k => k.u + '|' + k.dogrulama)).filter(s => !/^https:\/\/(www\.rfc-editor\.org\/rfc\/rfc\d+|www\.iana\.org\/)/.test(s) || !/2026-10-12$/.test(s)));
  eq(bad, [], 'kaynaklar yalnız doğrulanmış alanlar ve doğrulama tarihi 2026-10-12');

  // 2) Saf hesap (elle doğrulanmış bağımsız değerler)
  const K = (f, ...a) => p.evaluate(([f, a]) => PP.lab.karar[f](...a), [f, a]);
  const T = [{ net: '10.0.0.0', onek: 8 }, { net: '10.1.0.0', onek: 16 }, { net: '10.1.2.0', onek: 24 }, { net: '0.0.0.0', onek: 0 }];
  eq(await K('rotaSec', T, '10.1.2.77'), { eslesenler: [1, 2, 3, 4], secilen: 3 }, 'rota: 10.1.2.77 → /24 (4 uyan)');
  eq(await K('rotaSec', T, '10.1.9.5'), { eslesenler: [1, 2, 4], secilen: 2 }, 'rota: 10.1.9.5 → /16');
  eq(await K('rotaSec', T, '10.200.0.1'), { eslesenler: [1, 4], secilen: 1 }, 'rota: 10.200.0.1 → /8');
  eq(await K('rotaSec', T, '8.8.8.8'), { eslesenler: [4], secilen: 4 }, 'rota: 8.8.8.8 → default');
  eq(await K('rotaSec', T.slice(0, 3), '172.16.0.9'), { eslesenler: [], secilen: 0 }, 'rota: default yok → atılır');
  eq(await K('rotaSec', [{ net: '10.1.2.0', onek: 24 }, { net: '10.1.2.0', onek: 25 }], '10.1.2.200'), { eslesenler: [1], secilen: 1 }, 'rota: /25 hedefi kapsamıyorsa seçilmez');
  const A = await p.evaluate(() => PP.lab.karar.ACL);
  eq(await K('aclKarar', A, { proto: 'tcp', kaynak: '192.168.10.5', port: 23 }), { act: 'deny', satir: 1 }, 'ACL: telnet → satır 1 deny');
  eq(await K('aclKarar', A, { proto: 'tcp', kaynak: '192.168.10.5', port: 80 }), { act: 'permit', satir: 2 }, 'ACL: http → satır 2 permit');
  eq(await K('aclKarar', A, { proto: 'udp', kaynak: '192.168.20.7', port: 53 }), { act: 'permit', satir: 3 }, 'ACL: ip satırı udp de uyar → satır 3');
  eq(await K('aclKarar', A, { proto: 'tcp', kaynak: '192.168.30.9', port: 80 }), { act: 'deny', satir: 0 }, 'ACL: hiçbiri → örtük deny');
  eq(await K('aclKarar', A, { proto: 'udp', kaynak: '192.168.10.5', port: 80 }), { act: 'deny', satir: 0 }, 'ACL: tcp satırı udp ile uymaz');
  eq(await p.evaluate(() => [26, 24, 8, 20, 32, 0, 30].map(n => PP.lab.karar.wcOnek(n))), ['0.0.0.63', '0.0.0.255', '0.255.255.255', '0.0.15.255', '0.0.0.0', '255.255.255.255', '0.0.0.3'], 'wildcard: /26 /24 /8 /20 /32 /0 /30');
  eq(await K('wcUyar', '192.168.10.100', '192.168.10.0', '0.0.0.127'), true, 'wcUyar: .100 /25 içi');
  eq(await K('wcUyar', '192.168.10.130', '192.168.10.0', '0.0.0.127'), false, 'wcUyar: .130 /25 dışı');
  eq(await K('wcUyar', '192.168.10.100', '192.168.10.0', '0.0.0.63'), false, 'wcUyar: .100 /26 dışı');

  // 3) Ders odası: ek bloklar + lab
  const odaAc = (tid, adim) => p.evaluate(([t, a]) => { const l = lessonsOf('ccna').filter(x => x.topicId === t)[0]; S.les.track = 'ccna'; lcSet(lessonKey(l), 'w', 'ccna'); lrOpen(l, a); return l.id; }, [tid, adim]);
  await p.evaluate(() => goTab('ders'));
  await odaAc('s-ccna-1', 'anlat'); await p.waitForTimeout(400);
  const ek = await p.evaluate(() => [...document.querySelectorAll('#view [data-ek]')].map(e => e.dataset.ek));
  ok(['analoji', 'hatalar', 'gecme'].every(k => ek.includes(k)), 'ccna 1 Anlatım: benzetme+sınır, hatalar, geçme görünür (' + ek + ')');
  await odaAc('s-ccna-1', 'alis'); await p.waitForTimeout(400);
  ok(await p.evaluate(() => ['rehberli', 'bagimsiz', 'telafi'].every(k => document.querySelector('#view [data-ek=' + k + ']'))), 'ccna 1 Alıştırma: rehberli, bağımsız, telafi görünür');
  eq(await p.evaluate(() => document.querySelectorAll('#view .lab').length), 0, 'lab olmayan derste lab paneli yok');

  const kanitlar = () => p.evaluate(() => (JSON.parse(localStorage.getItem('ya_pp_ogr') || '{}').kanitlar || []).filter(k => k.tur === 'lab').map(k => k.id));
  const sonuc = async () => { await p.locator('#view .lab button:text-is("Kontrol et")').click(); await p.waitForTimeout(250); return p.evaluate(() => { const e = document.querySelector('#view .lab [data-lab]'); return e ? e.dataset.lab : null; }); };

  // ccna 3: alt ağ lab'ı (net ile paylaşılır)
  await odaAc('s-ccna-3', 'alis'); await p.waitForTimeout(400);
  eq(await p.evaluate(() => document.querySelector('#view .lab').dataset.labId), 'net-altag', 'ccna 3: alt ağ lab\'ı bağlı');

  // ccna 6: rota lab'ı
  await odaAc('s-ccna-6', 'alis'); await p.waitForTimeout(400);
  eq(await p.evaluate(() => { const e = document.querySelector('#view .lab'); return [e.dataset.labId, e.textContent.includes('Yerel simülasyon'), e.textContent.includes('Sıfırla'), e.textContent.includes('İpucu'), e.querySelectorAll('select,input').length, e.querySelectorAll('.lab-sat').length]; }), ['ccna-rota', true, true, true, 2, 4], 'rota lab: etiket, sıfırla, ipucu, 2 alan, 4 satır');
  await p.fill('#view .lab [data-alan=eslesen] input', '4');
  await p.selectOption('#view .lab [data-alan=satir] select', '2');
  eq(await sonuc(), 'yanlis', 'rota lab: yanlış satır → yanlış');
  eq(await p.evaluate(() => [...document.querySelectorAll('#view .lab .lab-f')].map(e => e.classList.contains('ok') ? 'ok' : e.classList.contains('no') ? 'no' : '-')), ['ok', 'no'], 'rota lab: alan bazlı işaret');
  ok(await p.evaluate(() => /seçilen/.test(document.querySelector('#view .lab .lab-tab').textContent) && /uyuyor/.test(document.querySelector('#view .lab .lab-tab').textContent)), 'rota lab: eşleşme izi gösterilir');
  eq(await kanitlar(), [], 'rota lab: yanlışta kanıt yok');
  await p.selectOption('#view .lab [data-alan=satir] select', '3');
  eq(await sonuc(), 'dogru', 'rota lab: doğru');
  eq(await kanitlar(), ['lab-ccna-rota-s1'], 'rota lab: kanıt kaydedildi');
  await p.locator('#view .lab .lab-sec button').nth(3).click(); await p.waitForTimeout(200);
  await p.locator('#view .lab button:text-is("İpucu")').click(); await p.waitForTimeout(200);
  await p.fill('#view .lab [data-alan=eslesen] input', '0'); await p.selectOption('#view .lab [data-alan=satir] select', '0');
  eq(await sonuc(), 'dogru', 'rota lab: default yok, paket atılır → doğru');
  ok((await kanitlar()).includes('lab-ccna-rota-s4-ipucu'), 'rota lab: ipucu kullanılan senaryo ayrı işaretle');
  await p.locator('#view .lab button:text-is("Sıfırla")').click(); await p.waitForTimeout(200);
  eq(await p.evaluate(() => [...document.querySelectorAll('#view .lab input')].map(i => i.value).join('') + [...document.querySelectorAll('#view .lab select')].map(i => i.value).join('')), '', 'rota lab: sıfırla alanları temizler');
  eq((await kanitlar()).length, 2, 'rota lab: sıfırla kanıtı silmez');

  // ccna 9: ACL lab'ı
  await odaAc('s-ccna-9', 'alis'); await p.waitForTimeout(400);
  eq(await p.evaluate(() => { const e = document.querySelector('#view .lab'); return [e.dataset.labId, e.querySelectorAll('.lab-sat').length, e.textContent.includes('deny ip any any')]; }), ['ccna-acl', 4, true], 'ACL lab: 3 satır + gizli son satır');
  await p.selectOption('#view .lab [data-alan=karar] select', 'permit'); await p.selectOption('#view .lab [data-alan=satir] select', '1');
  eq(await sonuc(), 'yanlis', 'ACL lab: telnet permit → yanlış');
  await p.selectOption('#view .lab [data-alan=karar] select', 'deny');
  eq(await sonuc(), 'dogru', 'ACL lab: telnet deny satır 1 → doğru');
  await p.locator('#view .lab .lab-sec button').nth(3).click(); await p.waitForTimeout(200);
  await p.selectOption('#view .lab [data-alan=karar] select', 'deny'); await p.selectOption('#view .lab [data-alan=satir] select', '0');
  eq(await sonuc(), 'dogru', 'ACL lab: örtük deny → doğru');
  await p.locator('#view .lab .lab-sec button').nth(4).click(); await p.waitForTimeout(200);
  eq(await p.evaluate(() => document.querySelectorAll('#view .lab select').length), 0, 'ACL lab: wildcard senaryosunda seçim alanı yok');
  await p.fill('#view .lab [data-alan=wc] input', '0.0.0.255');
  eq(await sonuc(), 'yanlis', 'ACL lab: /26 için 0.0.0.255 → yanlış');
  await p.fill('#view .lab [data-alan=wc] input', '0.0.0.63');
  eq(await sonuc(), 'dogru', 'ACL lab: 0.0.0.63 → doğru');
  eq((await kanitlar()).filter(x => /acl/.test(x)).sort(), ['lab-ccna-acl-s1', 'lab-ccna-acl-s4', 'lab-ccna-acl-s5'], 'ACL lab: kanıt kayıtları');
  ok(await p.evaluate(() => (JSON.parse(localStorage.getItem('ya_pp_ogr') || '{}').kanitlar || []).filter(k => k.tur === 'lab').every(k => k.kapi == null)), 'lab kanıtları kapı kanıtı değil');
  ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), '390 px: yatay taşma yok (ACL lab)');

  // 4) Bilgi grafiği: en küçük sonraki adım
  const S0 = (du, yol) => p.evaluate(([du, yol]) => { const s = PP.ogr.oneri.sonraki(PP.ogr.ui.graf(), yol || 'ccna', du); return s && { tip: s.tip, ders: s.ders, lab: s.lab || null, blok: !!s.blok, neden: !!s.neden }; }, [du, yol]);
  const du0 = { dersTamam: {}, denemeler: [], kanitlar: [], projeler: {} };
  eq(await S0(du0), { tip: 'ders', ders: 'ders:ccna:1', lab: null, blok: false, neden: true }, 'graf: ilerleme yok → ilk ders');
  const tam = (n) => { const o = {}; for (let i = 1; i <= n; i++) o['ders:ccna:' + i] = true; return o; };
  const lk = (id, n) => Array.from({ length: n }, (_, i) => ({ id: 'k' + id + i, tur: 'lab', hedef: 'lab:' + id + ':s' + (i + 1), kapi: null, dogrulama: 'istemci' }));
  eq(await S0({ ...du0, dersTamam: tam(3) }), { tip: 'ders', ders: 'ders:ccna:4', lab: null, blok: false, neden: true }, 'graf: ders 3 tamam → sıradaki ders 4 (lab öneri ekidir, sırayı kilitlemez)');
  eq(await p.evaluate((du) => { const r = PP.ogr.oneri.sonrakiLab(PP.ogr.ui.graf(), 'ccna', du); return r && [r.tip, r.lab, r.ders]; }, { ...du0, dersTamam: tam(3) }), ['lab', 'net-altag', 'ders:ccna:3'], 'graf: son tamamlanan derste lab kanıtı yoksa lab önerilir');
  eq(await p.evaluate((du) => PP.ogr.oneri.sonrakiLab(PP.ogr.ui.graf(), 'ccna', du), { ...du0, dersTamam: tam(3), kanitlar: lk('net-altag', 4) }), null, 'graf: lab kanıtı tamam → lab önerisi kalkar (kanıt öneriyi değiştirir)');
  eq(await p.evaluate((du) => { const r = PP.ogr.oneri.sonrakiLab(PP.ogr.ui.graf(), 'ccna', du); return r && r.adim; }, { ...du0, dersTamam: tam(3), kanitlar: lk('net-altag', 3) }), 'Lab: Alt ağ laboratuvarı (3/4 senaryo).', 'graf: 3/4 senaryo → lab hâlâ önerilir');
  eq(await S0({ ...du0, dersTamam: tam(17), kanitlar: [].concat(lk('net-altag', 4), lk('ccna-rota', 4), lk('ccna-acl', 6), lk('ccna-vlan', 4), lk('ccna-nat', 4)) }), { tip: 'tamam', ders: null, lab: null, blok: false, neden: true }, 'graf: hepsi tamam');
  eq(await S0({ ...du0, dersTamam: tam(17), kanitlar: lk('net-altag', 4) }), { tip: 'lab', ders: 'ders:ccna:14', lab: 'ccna-vlan', blok: false, neden: true }, 'graf: dersler tamam, eksik lab (en sondaki önce; tur 4 VLAN/STP lab en sonda)');
  eq(await S0({ ...du0, dersTamam: tam(17), kanitlar: [].concat(lk('net-altag', 4), lk('ccna-vlan', 4), lk('ccna-nat', 4)) }), { tip: 'lab', ders: 'ders:ccna:9', lab: 'ccna-acl', blok: false, neden: true }, 'graf: VLAN ve NAT lab tamam → ACL lab önerilir');
  // lab kanıtı kapıyı etkilemez
  eq(await p.evaluate(() => { const G = PP.ogr.ui.graf(), a = PP.ogr.kapi.dersAcik(G, 'ders:ccna:4', { dersTamam: {}, denemeler: [], kanitlar: [], projeler: {} }).acik, b = PP.ogr.kapi.dersAcik(G, 'ders:ccna:4', { dersTamam: {}, denemeler: [], kanitlar: [{ id: 'z', tur: 'lab', hedef: 'lab:net-altag:s1', kapi: null, dogrulama: 'istemci' }], projeler: {} }).acik; return [a, b]; }), [false, false], 'kapı: lab kanıtı ders kilidini açmaz');
  // Kritik hedef geçilmedi → telafi (blok nedeniyle)
  eq(await p.evaluate(() => {
    const G = PP.ogr.program.kur({ surum: '1', yollar: [{ id: 't', ad: 'T', dersler: [{ ad: 'A', modul: 'M' }, { ad: 'B', modul: 'M' }] }] });
    G.hedefler['ders:t:1:sinav'].kritik = true;
    const d = { id: 'x1', hedef: 'ders:t:1:sinav', varyant: 'v1', puan: 1, maks: 5, tarih: new Date().toISOString(), surum: PP.ogr.eski.SURUM, yardim: { tur: 'bilinmiyor', guvenilir: false }, dogrulama: 'istemci', kaynak: 'mini-sinav' };
    const s = PP.ogr.oneri.sonraki(G, 't', { dersTamam: { 'ders:t:1': true }, denemeler: [d], kanitlar: [], projeler: {} }, {});
    return [s.tip, s.ders, !!s.blok];
  }), ['telafi', 'ders:t:1', true], 'graf: kritik hedef geçilmedi → telafi + blok nedeni');
  // ui.sonrakiAdim + koç önerisi
  eq(await p.evaluate(() => { const r = PP.ogr.ui.sonrakiAdim('ccna'); return r && [r.yol, r.adim.tip, !!r.adim.adim]; }), ['ccna', 'ders', true], 'ui.sonrakiAdim: ccna → ders');
  eq(await p.evaluate(() => { const o = PP.koc.oneriler({ tekrar: { bugun: [] }, labKanit: [], kisisel: [], sonraki: PP.ogr.ui.sonrakiAdim('ccna') }, { oneri: 'acik' }); return o.liste.length; }), 0, 'koç: düz müfredat sırası (ilerleme kaydı yok) öneri sayılmaz');
  eq(await p.evaluate(() => { const du = { dersTamam: { 'ders:ccna:1': true, 'ders:ccna:2': true, 'ders:ccna:3': true }, denemeler: [], kanitlar: [], projeler: {} }, G = PP.ogr.ui.graf(); const o = PP.koc.oneriler({ tekrar: { bugun: [] }, labKanit: [], kisisel: [], sonraki: { yol: 'ccna', adim: PP.ogr.oneri.sonraki(G, 'ccna', du), lab: PP.ogr.oneri.sonrakiLab(G, 'ccna', du) } }, { oneri: 'acik' }); return o.liste.map(x => [x.id, PP.koc.eylemGecerli(x.eylem, G, [])]); }), [['lab:ders:ccna:3', true]], 'koç: ders tamam + lab kanıtı yok → geçerli eylemli lab önerisi');
  eq(await p.evaluate(() => PP.koc.oneriler({ tekrar: { bugun: [] }, labKanit: [], kisisel: [] }, { oneri: 'acik' }).liste.length), 0, 'koç: sonraki yoksa öneri yok (uydurma yok)');

  // 5) Ders sayfası "Ustalık ve kapılar" paneli: en küçük sonraki adım (ders listesinde, details içinde)
  ok(await p.evaluate(() => { const l = lessonsOf('ccna').filter(x => x.topicId === 's-ccna-9')[0]; const e = PP.ogr.ui.panel('ccna', l); return !!(e && e.querySelector('[data-sonraki=ders]') && /En küçük sonraki adım/.test(e.textContent)); }), 'panel: "En küçük sonraki adım" (ders) görünür');

  // 6) Mobil taşma ve hata
  ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), '390 px: yatay taşma yok');
  ok(errs.length === 0, 'sayfa hatası yok ' + errs.join('|'));
  await b.close();
  console.log(fails ? '\nKALDI: ' + fails : '\nGEÇTİ');
  process.exit(fails ? 1 : 0);
})();

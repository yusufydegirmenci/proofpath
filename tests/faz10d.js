// Faz 10 tur 4: ortak alıştırma çubuğu (PP.cubuk), Parsons (PP.parsons), günün sorusu (PP.gunSorusu), seri dondurma (PP.ogr.seri), arayüz.
// Beklenenler elle hesaplandı; uygulama kodundan türetilmedi. Bölüm 1 Node'da (tarayıcısız), bölüm 2 gerçek sayfada.
const path = require('path');
const { INIT, chromium } = require('./stub.js');
const U = require('url').pathToFileURL(path.join(__dirname, '..', 'index.html')).href;
let fails = 0;
const ok = (c, m) => { console.log((c ? 'OK    ' : 'HATA  ') + m); if (!c) fails++; };
const eq = (a, b, m) => { const s = JSON.stringify(a) === JSON.stringify(b); ok(s, m + (s ? '' : '  → beklenen ' + JSON.stringify(b) + ', gelen ' + JSON.stringify(a))); };

// ---- Bölüm 1: saf mantık (Node) ----
(function () {
  const mem = {}; globalThis.localStorage = { getItem: k => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = String(v); }, removeItem: k => { delete mem[k]; } };
  globalThis.PP = {};
  const yuk = f => require(path.join(__dirname, '..', f));
  ['js/ogrenme/cekirdek.js', 'js/ogrenme/depo.js', 'js/ders/cubuk.js', 'js/ders/parsons.js', 'js/bugun/gunsorusu.js'].forEach(yuk);
  const C = PP.cubuk, P = PP.parsons, G = PP.gunSorusu;
  eq(C.durum('x'), { yanlis: 0, ipucu: 0, cozum: false, cozumTarih: null }, 'çubuk: yeni alıştırma sıfır durumda');
  C.yanlis('x'); eq(C.cozumAcik('x'), false, 'çubuk: 1 yanlışta çözüm kapalı');
  eq(C.cozumGor('x'), false, 'çubuk: kapalıyken çözüm görülemez');
  C.yanlis('x'); eq(C.cozumAcik('x'), true, 'çubuk: 2 yanlıştan sonra çözüm açılır');
  eq(C.kanitSayilir('x'), true, 'çubuk: çözüm görülmeden kanıt sayılır');
  eq(C.cozumGor('x'), true, 'çubuk: açıkken çözüm görülür'); eq(C.kanitSayilir('x'), false, 'çubuk: çözüm görülünce kanıt SAYILMAZ');
  C.ipucuAc('y', 1); C.ipucuAc('y', 2); C.ipucuAc('y', 9); eq(C.durum('y').ipucu, 3, 'çubuk: ipucu kademesi en çok 3 ve kayıtlı');
  C.ipucuAc('y', 1); eq(C.durum('y').ipucu, 3, 'çubuk: kademe geri düşmez');
  eq(C.kademeler(['a', 'b', 'c', 'd']), ['a', 'b', 'c'], 'çubuk: ipucu 3 kademeye kırpılır'); eq(C.kademeler('tek'), ['tek'], 'çubuk: tek dize 1 kademe');
  eq(JSON.parse(mem.ya_pp_ogr).tercih.cubuk.x.cg, 1, 'çubuk: durum ya_pp_ogr.tercih.cubuk içinde (yeni anahtar yok)');
  eq(Object.keys(mem), ['ya_pp_ogr'], 'çubuk: yalnız mevcut ya_pp_ogr anahtarına yazar');

  const d = { id: 't', ders: 'd', dogru: ['a', 'b', 'c', 'd'], yanlis: ['z'] };
  eq(P.tanimla(d).ok, true, 'parsons: geçerli tanım');
  eq([P.tanimla({ id: 'u', ders: 'd', dogru: ['a', 'b'] }).neden, P.tanimla({ id: 'u', ders: 'd', dogru: ['a', 'b', 'c'], yanlis: ['x', 'y', 'z'] }).neden, P.tanimla({ id: 'u', ders: 'd', dogru: ['a', 'b', 'a'] }).neden], ['dogru-gecersiz', 'yanlis-gecersiz', 'satir-tekrar'], 'parsons: az satır / 3 yanlış satır / tekrar reddedilir');
  const k = P.karisik(d); eq(k.slice().sort(), ['l0', 'l1', 'l2', 'l3', 'l4'], 'parsons: karışık görünüm tüm satırları içerir'); eq(P.karisik(d), k, 'parsons: karışım deterministik');
  ok(!k.slice(0, 4).every((x, i) => x === 'l' + i), 'parsons: karışık sıra doğru sıradan farklı');
  eq(P.kontrol(d, ['l0', 'l1', 'l2', 'l3']).dogru, true, 'parsons: doğru sıra kabul');
  eq(P.kontrol(d, ['l1', 'l0', 'l2', 'l3']).dogru, false, 'parsons: yer değişmiş sıra reddedilir'); eq(P.kontrol(d, ['l1', 'l0', 'l2', 'l3']).dogruYerde, 2, 'parsons: 2 satır doğru yerde');
  eq(P.kontrol(d, ['l0', 'l1', 'l2', 'l3', 'l4']).dogru, false, 'parsons: fazladan yanlış satır reddedilir');
  eq(P.kontrol(d, ['l0', 'l1', 'l2']).dogru, false, 'parsons: eksik satır reddedilir'); eq(P.kontrol(d, ['l0', 'l1', 'l2']).eksik, 1, 'parsons: 1 satır eksik');

  const gunler = ['2026-10-13', '2026-10-14', '2026-10-15', '2026-10-16', '2026-10-17', '2026-10-18', '2026-10-19'], hav = Array.from({ length: 50 }, (_, i) => i);
  eq(gunler.map(g => G.sec(g, hav)), gunler.map(g => G.sec(g, hav.slice().reverse())), 'günün sorusu: aynı gün aynı soru (havuz sırasından bağımsız)');
  ok(new Set(gunler.map(g => G.sec(g, hav))).size >= 4, 'günün sorusu: günler değişince soru değişir (7 günde ≥4 farklı)');
  eq(G.sec('2026-10-13', []), null, 'günün sorusu: boş havuz null');
  G.cevapla('2026-10-13', 'qb7', 2); eq([G.cevap('2026-10-13', 'qb7'), G.cevap('2026-10-14', 'qb7'), G.cevap('2026-10-13', 'qb8')], [2, null, null], 'günün sorusu: cevap yalnız aynı gün+soru için okunur');
})();

// ---- Bölüm 2: gerçek sayfa ----
(async () => {
  const b = await chromium.launch(), ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.addInitScript('window.__guest=true'); await ctx.addInitScript(INIT);
  const p = await ctx.newPage(), errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(U + '#atolye'); await p.waitForTimeout(1200);
  const ev = (f, a) => p.evaluate(f, a);
  await ev(() => { localStorage.removeItem('ya_pp_ogr'); S.va = null; S.at2.sec = 'va'; goTab('atolye'); }); await p.waitForTimeout(300);
  await ev(() => document.querySelector('[data-va-ders="va0-1"]').click()); await p.waitForTimeout(300);

  const sira = () => ev(() => [...document.querySelectorAll('[data-alan="va0-1-sql"] .cubuk [role=group] button')].map(x => x.textContent.replace(/\s*\(.*$/, '')));
  eq(await sira(), ['Çalıştır', 'İpucu', 'Çözümü gör', 'Sıfırla'], 'alan çubuğu: sıra Çalıştır · İpucu · Çözümü gör · Sıfırla');
  eq(await ev(() => [...document.querySelectorAll('[data-alan="va0-1-sql"] .cubuk button')].filter(x => /^İpucu/.test(x.textContent)).length), 1, 'alan çubuğu: İpucu düğmesi yinelenmiyor');
  ok(await ev(() => document.querySelector('[data-alan="va0-1-sql"] [data-cubuk=cozum]').disabled), 'alan çubuğu: çözüm başta kapalı');
  for (let i = 1; i <= 3; i++) { await ev(() => document.querySelector('[data-alan="va0-1-sql"] [data-alan=ipucu]').click()); eq(await ev(() => document.querySelectorAll('[data-alan-ipucu="va0-1-sql"] li').length), i, 'ipucu kademe ' + i + ' açıldı'); }
  ok(await ev(() => document.querySelector('[data-alan="va0-1-sql"] [data-alan=ipucu]').disabled), 'ipucu 3. kademeden sonra tükenir');
  eq(await ev(() => PP.cubuk.durum('alan:va0-1-sql').ipucu), 3, 'ipucu kademesi kayıtlı');
  eq(await ev(() => document.querySelectorAll('[data-cubuk-ordek="alan:va0-1-sql"] textarea').length), 3, 'ördeğe anlat: 3 soru kutusu, yapay zekâ çağrısı yok');
  await ev(() => { PP.cubuk.yanlis('alan:va0-1-sql'); PP.cubuk.yanlis('alan:va0-1-sql'); });
  ok(await ev(() => !document.querySelector('[data-alan="va0-1-sql"] [data-cubuk=cozum]').disabled), '2 yanlıştan sonra çözüm düğmesi açılır');
  await ev(() => document.querySelector('[data-alan="va0-1-sql"] [data-cubuk=cozum]').click());
  eq(await ev(() => PP.cubuk.durum('alan:va0-1-sql').cozum), false, 'çözüm ilk tıkta açılmaz, onay ister');
  await ev(() => document.querySelector('[data-alan="va0-1-sql"] [data-cubuk=cozum]').click());
  ok(await ev(() => PP.cubuk.durum('alan:va0-1-sql').cozum && /ustalık ve kanıt olarak sayılmaz/.test(document.querySelector('[data-cubuk-cozum="alan:va0-1-sql"]').textContent)), 'çözüm onaydan sonra gösterilir ve "çözüm görüldü" kaydedilir');
  eq(await ev(() => { const d = PP.alan.bul('va0-1-sql'); const r = PP.alan.kanitKaydet(d, false); return [r.ok, r.neden]; }), [false, 'cozum-goruldu'], 'çözüm görülen alıştırma kanıt yazmaz');
  eq(await ev(() => (JSON.parse(localStorage.ya_pp_ogr).kanitlar || []).length), 0, 'depoda kanıt yok');

  // Parsons (va2-2): yalnız düğmelerle çöz
  await ev(() => { S.va = null; S.at2.sec = 'va'; goTab('atolye'); }); await p.waitForTimeout(300);
  await ev(() => document.querySelector('[data-va-ders="va2-2"]').click()); await p.waitForTimeout(300);
  ok(await ev(() => !!document.querySelector('[data-parsons="p-va2-2"]')), 'Parsons: va2-2 dersinde görünür');
  eq(await ev(() => document.querySelectorAll('[data-alan-tur]').length), await ev(() => PP_VA.alanlar.filter(a => a.ders === 'va2-2').length), 'Parsons alan sayısını değiştirmez (data-alan-tur = dersin alan sayısı)');
  const dogru = await ev(() => PP.parsons.bul('p-va2-2').dogru);
  const ekle = metin => ev(m => { const li = [...document.querySelectorAll('[data-parsons="p-va2-2"] [data-parsons-havuz]')].find(x => x.querySelector('code').textContent === m); li.querySelector('button').focus(); li.querySelector('button').click(); }, metin);
  await ekle(dogru[1]); await ekle(dogru[0]);
  eq(await ev(() => [...document.querySelectorAll('[data-parsons="p-va2-2"] [data-parsons-cozum] code')].map(x => x.textContent)), [dogru[1], dogru[0]], 'Parsons: Ekle sırayla ekler');
  await p.locator('[data-parsons="p-va2-2"] [data-parsons-sira="1"] button:text-is("↓")').focus(); await p.keyboard.press('Enter');
  eq(await ev(() => [...document.querySelectorAll('[data-parsons="p-va2-2"] [data-parsons-cozum] code')].map(x => x.textContent)), [dogru[0], dogru[1]], 'Parsons: klavyeyle (Enter) ↓ satırı aşağı taşır');
  for (let i = 2; i < dogru.length; i++) await ekle(dogru[i]);
  await ev(() => document.querySelector('[data-parsons-kontrol="p-va2-2"]').click());
  eq(await ev(() => document.querySelector('[data-parsons-sonuc="p-va2-2"] [data-parsons-durum]').dataset.parsonsDurum), 'dogru', 'Parsons: doğru sıra kabul edilir (yalnız düğmelerle)');
  ok(await ev(() => (JSON.parse(localStorage.ya_pp_ogr).kanitlar || []).some(k => k.id === 'parsons-p-va2-2')), 'Parsons: kanıt yazıldı');
  await ev(() => document.querySelector('[data-parsons-sifirla="p-va2-2"]').click());
  const yanlisSat = await ev(() => PP.parsons.bul('p-va2-2').yanlis[0]);
  if (yanlisSat) {
    await ekle(yanlisSat); await ev(() => document.querySelector('[data-parsons-kontrol="p-va2-2"]').click());
    eq(await ev(() => document.querySelector('[data-parsons-sonuc="p-va2-2"] [data-parsons-durum]').dataset.parsonsDurum), 'yanlis', 'Parsons: yanlış satır reddedilir');
    eq(await ev(() => PP.cubuk.durum('parsons:p-va2-2').yanlis), 1, 'Parsons: yanlış deneme sayılır');
  }

  // Lab çubuğu: aynı sıra
  const labSira = id => ev(i => { const el = PP.lab.kararPanel({}, i); return [...el.querySelectorAll('.cubuk [role=group] button')].map(x => x.textContent.replace(/\s*\(.*$/, '')); }, id);
  eq(await labSira('ccna-rota'), ['Kontrol et', 'İpucu', 'Çözümü gör', 'Sıfırla'], 'lab çubuğu (rota): Kontrol · İpucu · Çözümü gör · Sıfırla');
  eq(await labSira('ccna-nat'), ['Kontrol et', 'İpucu', 'Çözümü gör', 'Sıfırla'], 'lab çubuğu (NAT): aynı sıra');
  eq(await ev(() => Object.keys(PP.lab.tanimlar).filter(k => PP.lab.tanimlar[k].tip === 'genel').every(k => PP.lab.tanimlar[k].sc.every(s => PP.lab.kararKademeleri(PP.lab.tanimlar[k], s).length === 3))), true, 'her karar laboratuvarı senaryosunda 3 kademe ipucu var');
  eq(await ev(() => ['ccna-rota', 'ccna-acl'].every(k => PP.lab.tanimlar[k].sc.every(s => PP.lab.kararKademeleri(PP.lab.tanimlar[k], s).length === 3))), true, 'rota/ACL senaryolarında 3 kademe');
  eq(await ev(() => PP.lab.altag.SENARYOLAR.every(s => PP.lab.altag.ipucuKademeleri(s).length === 3 && /Ağ adresi/.test(PP.lab.altag.cozumMetni(s)))), true, 'alt ağ: 3 kademe + çözüm metni');

  eq(await ev(() => PP_VA.alanlar.filter(a => !(Array.isArray(a.ipucu) && a.ipucu.length === 3)).map(a => a.id)), [], 'tüm VA alanlarında tam 3 kademeli ipucu');
  eq(await ev(() => PP_VA.alanlar.filter(a => !(PP_VA.alanCozum && PP_VA.alanCozum[a.id])).map(a => a.id)), [], 'tüm VA alanlarının çözüm metni var');

  // va2-12: EXPLAIN QUERY PLAN kontrolü plan metni biçiminden bağımsız (sürümler arası), ama sahte "detail" sütunu plan sayılmaz
  eq(await ev(() => {
    const a = PP_VA.alanlar.find(x => x.id === 'va2-12-sql'), plan = (detail, sut) => a.kontrol({ sutunlar: sut || ['id', 'parent', 'notused', 'detail'], satirlar: [(sut || ['id', 'parent', 'notused', 'detail']).map((c, k, arr) => (k === arr.length - 1 ? detail : 0))] }, PP_VA.veriSql).dogru;
    return [plan('SEARCH siparis USING INDEX idx_siparis_musteri (musteri_id=?)'), plan('SEARCH TABLE siparis USING INDEX idx_siparis_musteri (musteri_id=?)'), plan('SEARCH siparis USING COVERING INDEX idx_siparis_musteri (musteri_id=?)'),
      plan('search siparis using index idx_siparis_musteri (musteri_id=?)', ['id', 'parent', 'detail']), plan('SCAN siparis'), plan('SCAN TABLE siparis'), plan('SEARCH siparis USING INDEX baska_indeks (musteri_id=?)'),
      plan('SEARCH siparis USING INDEX idx_siparis_musteri (musteri_id=?)', ['detail'])];
  }), [true, true, true, true, false, false, false, false], 'va2-12: plan biçiminden bağımsız (eski/yeni/COVERING/küçük harf kabul; SCAN, başka indeks, sahte tek sütun red)');

  // Günün sorusu ve seri satırı (Bugün)
  await ev(() => { localStorage.removeItem('ya_pp_ogr'); localStorage.removeItem('ya_gq'); S.days = []; for (let n = 0; n < 8; n++) if (n !== 1) S.days.push({ date: addDays(today(), -n), minutes: 5 }); goTab('bugun'); }); await p.waitForTimeout(500);
  const gk = await ev(() => document.querySelector('[data-gun-sorusu]') && document.querySelector('[data-gun-sorusu]').dataset.gunSorusu);
  ok(!!gk, 'Bugün: günün sorusu tekrar kuyruğunda satır olarak görünür');
  eq(await ev(() => document.querySelectorAll('[data-gun-sorusu]').length), 1, 'Bugün: günün sorusu tek satır (yeni panel yok)');
  const ilkMetin = await ev(() => document.querySelector('[data-gun-sorusu] .rq-q').textContent);
  await ev(() => { goTab('rehber'); goTab('bugun'); }); await p.waitForTimeout(300);
  eq(await ev(() => document.querySelector('[data-gun-sorusu] .rq-q').textContent), ilkMetin, 'günün sorusu: yeniden çizimde aynı soru');
  const dogruSik = await ev(() => { const i = +document.querySelector('[data-gun-sorusu]').dataset.gunSorusu.slice(2); return gmQB(i, rngf(i * 13 + dayNum(today())), false).a; });
  const yanlisSik = dogruSik === 0 ? 1 : 0;
  await ev(j => document.querySelector('[data-gun-sec="' + j + '"]').click(), yanlisSik); await p.waitForTimeout(300);
  ok(await ev(k => !!JSON.parse(localStorage.ya_gq || '{}')[k], gk), 'günün sorusu: yanlış cevap oyun tekrar kuyruğuna girer');
  ok(await ev(() => document.querySelectorAll('[data-gun-sec][disabled]').length > 0), 'günün sorusu: cevaplanınca kilitlenir');
  // Sayfa yeniden veri yükleyebildiği için ayarla + oku aynı eşzamanlı çağrıda yapılır
  eq(await ev(() => { S.days = [0, 2, 3, 4, 5, 6, 7, 8].map(n => ({ date: addDays(today(), -n), minutes: 5 })); goTab('bugun'); const e = document.querySelector('[data-seri-dondurma]'); return e ? e.textContent.slice(0, 25) : null; }), 'Seri 8 gün · dondurma 0/2', 'Bugün: seri 8 gün (1 boş gün dondurmayla köprülendi), dondurma satırı görünür');
  eq(await ev(() => { S.pf.simple = true; S.days = [0, 1, 2, 3, 4, 5, 6].map(n => ({ date: addDays(today(), -n), minutes: 5 })); goTab('bugun'); const r = [document.querySelectorAll('[data-seri-dondurma]').length, document.querySelectorAll('[data-seri-kutlama]').length]; S.pf.simple = false; return r; }), [0, 0], 'Sade modda seri satırı/kutlama yok');
  eq(await ev(() => { localStorage.removeItem('ya_pp_ogr'); S.days = [0, 1, 2, 3, 4, 5, 6].map(n => ({ date: addDays(today(), -n), minutes: 5 })); goTab('bugun'); return document.querySelectorAll('[data-seri-kutlama="7"]').length; }), 1, '7. günde kutlama görünür');
  eq(await ev(() => { S.days = [0, 1, 2, 3, 4, 5, 6].map(n => ({ date: addDays(today(), -n), minutes: 5 })); goTab('bugun'); document.querySelector('[data-seri-kutlama] button').click(); return document.querySelectorAll('[data-seri-kutlama]').length; }), 0, 'kutlama kapatılınca bir daha çıkmaz');
  ok(await ev(() => document.documentElement.scrollWidth <= innerWidth + 1), '390 px: yatay taşma yok');
  ok(errs.length === 0, 'sayfa hatası yok ' + errs.join('|'));
  await b.close();
  console.log(fails ? fails + ' HATA' : 'hepsi geçti'); process.exit(fails ? 1 : 0);
})();

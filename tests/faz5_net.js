// Faz 5 tur 1 (Network yolu): ders eki (M§7 öğeleri) + etkileşimli alt ağ lab'ı (M§8.2).
// Saf hesap bağımsız sabitlerle, arayüz gerçek uygulamada. Hata → çıkış 1.
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
  await ctx.addInitScript("localStorage.ya_gm_seen='1';window.__store.lessons['2026-10-09-n4']={id:'2026-10-09-n4',date:'2026-10-09',track:'net',kind:'ders',title:'IPv4 adresleme ve alt ağlar',topicId:'s-net-4',hook:'x',blocks:[{t:'p',text:'Deneme.',items:[],parts:[]}],quiz:[]}");
  const p = await ctx.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.goto(U + '#ders');
  await p.waitForTimeout(1500);

  // 1) Saf hesap: elle (bağımsız) doğrulanmış değerler
  const A = (f, ...a) => p.evaluate(([f, a]) => PP.lab.altag[f](...a), [f, a]);
  eq(await A('hesapla', '192.168.1.70', 26), { ag: '192.168.1.64', yayin: '192.168.1.127', ilk: '192.168.1.65', son: '192.168.1.126', host: 62, blok: 64 }, 'hesap: 192.168.1.70/26');
  eq(await A('hesapla', '10.20.30.200', 25), { ag: '10.20.30.128', yayin: '10.20.30.255', ilk: '10.20.30.129', son: '10.20.30.254', host: 126, blok: 128 }, 'hesap: 10.20.30.200/25');
  eq(await A('hesapla', '172.16.5.0', 28), { ag: '172.16.5.0', yayin: '172.16.5.15', ilk: '172.16.5.1', son: '172.16.5.14', host: 14, blok: 16 }, 'hesap: 172.16.5.0/28');
  eq(await A('hesapla', '10.1.77.9', 16), { ag: '10.1.0.0', yayin: '10.1.255.255', ilk: '10.1.0.1', son: '10.1.255.254', host: 65534, blok: 65536 }, 'hesap: /16 sınırı');
  const onek = await p.evaluate(() => [50, 12, 62, 63, 2, 254, 255, 1000].map(n => PP.lab.altag.enKucukOnek(n)));
  eq(onek, [26, 28, 26, 25, 30, 24, 23, 22], 'en küçük önek: 50→26, 12→28, 62→26, 63→25, 2→30, 254→24, 255→23, 1000→22');
  eq(await A('hesapla', '300.1.1.1', 24), null, 'geçersiz IP reddedilir');
  eq(await A('hesapla', '10.0.0.1', 31), null, '/31 ve üstü kapsam dışı');

  // 2) Ders odası: Anlatım adımında ek bloklar
  const odaAc = (adim) => p.evaluate((a) => {  const l = lessonsOf('net').filter(x => x.topicId === 's-net-4')[0]; S.les.track = 'net'; lcSet(lessonKey(l), 'w', 'net'); lrOpen(l, a); return l.id; }, adim);
  await p.evaluate(() => goTab('ders'));
  await odaAc('anlat');
  await p.waitForTimeout(400);
  const ek = await p.evaluate(() => [...document.querySelectorAll('#view [data-ek]')].map(e => e.dataset.ek));
  ok(['analoji', 'hatalar', 'gecme', 'kaynaklar'].every(k => ek.includes(k)), 'Anlatım: benzetme+sınır, hatalar, geçme ölçütü, kaynaklar görünür  (' + ek + ')');
  const kay = await p.evaluate(() => [...document.querySelectorAll('#view [data-ek=kaynaklar] a')].map(a => [a.href, a.rel]));
  ok(kay.length === 3 && kay.every(k => /^https:\/\/www\.(rfc-editor\.org|iana\.org)\//.test(k[0]) && /noopener/.test(k[1])), 'kaynaklar yalnız doğrulanmış alanlar, noopener');
  ok((await p.evaluate(() => document.querySelector('#view [data-ek=kaynaklar]').textContent)).includes('2026-10-11'), 'kaynak son doğrulama tarihi yazılı');

  // 3) Alıştırma: lab
  await odaAc('alis');
  await p.waitForTimeout(400);
  const lab = await p.evaluate(() => { const e = document.querySelector('#view .lab'); return e ? [e.textContent.includes('Yerel simülasyon'), e.textContent.includes('Sıfırla'), e.textContent.includes('İpucu'), e.querySelectorAll('input').length] : null; });
  ok(lab && lab[0] && lab[1] && lab[2] && lab[3] === 5, 'lab: etiket (yerel simülasyon), sıfırla, ipucu, 5 alan (senaryo 1)');
  const doldur = async (v) => { for (const [k, x] of Object.entries(v)) await p.fill(`#view .lab [data-alan=${k}] input`, x); };
  const kontrol = async () => { await p.locator('#view .lab button:text-is("Kontrol et")').click(); await p.waitForTimeout(250); return p.evaluate(() => { const e = document.querySelector('#view .lab [data-lab]'); return e ? e.dataset.lab : null; }); };
  const kanitlar = () => p.evaluate(() => (JSON.parse(localStorage.getItem('ya_pp_ogr') || '{}').kanitlar || []).filter(k => k.tur === 'lab').map(k => k.id));

  await doldur({ onek: '/26', ag: '192.168.10.0', yayin: '192.168.10.64', ilk: '192.168.10.1', son: '192.168.10.62' });
  eq(await kontrol(), 'yanlis', 'lab: yanlış yayın adresi → yanlış');
  eq(await p.evaluate(() => [...document.querySelectorAll('#view .lab .lab-f')].map(e => e.classList.contains('ok') ? 'ok' : e.classList.contains('no') ? 'no' : '-')), ['ok', 'ok', 'no', 'ok', 'ok'], 'lab: yalnız yayın alanı işaretli yanlış');
  eq(await kanitlar(), [], 'lab: yanlış cevapta kanıt kaydedilmez');
  await p.fill('#view .lab [data-alan=yayin] input', '192.168.10.63');
  eq(await kontrol(), 'dogru', 'lab: düzeltilince doğru');
  eq(await kanitlar(), ['lab-network-altag-s1'], 'lab: doğru senaryo kanıtı kaydedildi (ipucusuz)');
  await p.locator('#view .lab button:text-is("Kontrol et")').click(); await p.waitForTimeout(200);
  eq((await kanitlar()).length, 1, 'lab: aynı senaryo tekrar doğrulanınca kanıt çoğalmaz');

  // ipucu → ayrı işaret; sıfırla
  await p.locator('#view .lab .lab-sec button').nth(1).click(); await p.waitForTimeout(200);
  await p.locator('#view .lab button:text-is("İpucu")').click(); await p.waitForTimeout(200);
  ok(await p.evaluate(() => /Kullanılabilir host = 2\^/.test(document.querySelector('#view .lab').textContent)), 'lab: ipucu formülü gösterir');
  await doldur({ onek: '28', ag: '172.16.5.0', yayin: '172.16.5.15', ilk: '172.16.5.1', son: '172.16.5.14' });
  eq(await kontrol(), 'dogru', 'lab: senaryo 2 doğru');
  ok((await kanitlar()).includes('lab-network-altag-s2-ipucu'), 'lab: ipucu kullanılan senaryo ayrı işaretle kaydedildi');
  await p.locator('#view .lab button:text-is("Sıfırla")').click(); await p.waitForTimeout(200);
  eq(await p.evaluate(() => [...document.querySelectorAll('#view .lab input')].map(i => i.value).join('')), '', 'lab: sıfırla alanları temizler');
  eq((await kanitlar()).length, 2, 'lab: sıfırla kayıtlı kanıtı silmez');

  // senaryo 3 (adres tipi): önek alanı yok
  await p.locator('#view .lab .lab-sec button').nth(2).click(); await p.waitForTimeout(200);
  eq(await p.evaluate(() => document.querySelectorAll('#view .lab input').length), 4, 'lab: adres senaryosunda önek alanı yok');
  await doldur({ ag: '192.168.1.64', yayin: '192.168.1.127', ilk: '192.168.1.65', son: '192.168.1.126' });
  eq(await kontrol(), 'dogru', 'lab: senaryo 3 doğru');

  // 4) ek verisi olmayan ders (eng; ccna tur 2'de ek aldı) etkilenmez; kanıt kapı hesabına karışmaz
  await p.evaluate(() => { const l = lessonsOf('eng')[0] || lessonForTopic('eng', 's-eng-1'); S.les.track = 'eng'; lrOpen(l, 'alis'); });
  await p.waitForTimeout(300);
  eq(await p.evaluate(() => document.querySelectorAll('#view .lab,#view [data-ek]').length), 0, 'ek verisi olmayan derste ek/lab yok');
  const kapiEtkisi = await p.evaluate(() => (JSON.parse(localStorage.getItem('ya_pp_ogr') || '{}').kanitlar || []).filter(k => k.tur === 'lab').every(k => k.kapi == null));
  ok(kapiEtkisi, 'lab kanıtları kapı kanıtı olarak işaretlenmedi');

  // 5) 390 px yatay taşma
  await odaAc('alis'); await p.waitForTimeout(300);
  ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), '390 px: yatay taşma yok');
  ok(errs.length === 0, 'sayfa hatası yok ' + errs.join('|'));
  await b.close();
  console.log(fails ? '\nKALDI: ' + fails : '\nGEÇTİ');
  process.exit(fails ? 1 : 0);
})();

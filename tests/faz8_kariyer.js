// Faz 8: kanıta dayalı rapor, 8 kademeli durum, CV/boşluk, mülakat rubriği, akran incelemesi, paylaşım/iptal (sahte depo, sahte veri).
// Sunucu SQL dosyası yalnız statik denetlenir (psql yok: çalıştırılmadı). Hata → çıkış 1.
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
  await ctx.addInitScript('window.__guest=true');
  await ctx.addInitScript(INIT);
  const p = await ctx.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.goto(U + '#bugun');
  await p.waitForTimeout(1500);
  const ev = (f, a) => p.evaluate(f, a);

  const DEF = { id: 'x1', title: 'API testi', path: 'qa', why: 'Neden', tools: 'Postman, SQL', outcome: ['Test yaz', 'Hata raporla'], pitch: 'I tested an API.',
    steps: [{ t: 'Adım 1', proof: 'ekran görüntüsü', en: 'test case' }, { t: 'Adım 2', proof: 'rapor', en: 'bug report' }, { t: 'Adım 3', proof: 'liste', en: 'regression' }] };
  const kayit = (n, not) => ({ id: 'path-x1', pid: 'x1', title: 'API testi', steps: DEF.steps.map((s, i) => ({ t: s.t, done: i < n, ts: i < n ? '2026-10-0' + (i + 1) + 'T10:00:00Z' : '', note: i < n && not ? not : '' })) });
  const rapor = (kay, kan) => ev(([d, k, kn]) => PP.rapor.olustur({ def: d, kayit: k, kanitlar: kn, bugun: '2026-10-11', surum: '1' }), [DEF, kay, kan || []]);

  // 1) Tanım denetimi: gerçek yol verisi, bağımsız hesap
  const td = await ev(() => { const d = pathProj("sec1"); const g = PP.rapor.tanimDenetimi(d); const var_ = ["why","onkosul","outcome","gereksinim","kabul","rubrik","savunma","yetkinlikler"].filter(k => Array.isArray(d[k]) ? d[k].length > 0 : !!d[k]).length + (d.steps.every(s => s.proof) ? 1 : 0) + (d.telafi && d.sonraki ? 1 : 0); return { g: [g.tanimli, g.toplam], beklenen: var_ }; });
  eq(td.g, [td.beklenen, 10], "gerçek proje tanımında 10 alanın veride olanları sayılır (" + td.g[0] + "/10, bağımsız hesapla)");
  ok(td.g[0] === 10, "Faz 8 tur 2: mevcut proje tanımı 10/10 (eksik olsaydı panelde görünürdü; eksik tanım testi aşağıda sahte tanımla)");
  const tdEksik = await ev(() => { const g = PP.rapor.tanimDenetimi({ why: "x", outcome: ["a"], steps: [{ proof: "p" }] }); return [g.tanimli, g.eksik.length]; });
  eq(tdEksik, [3, 7], "eksik tanım alanları dürüstçe görünür (sahte tanım 3/10)");

  // 2) Rapor: durumlar kanıta bağlı
  const r0 = await rapor(kayit(0));
  eq([r0.genelDurum, r0.yetkinlikler.map(y => y.durum)], ['yok', ['yok', 'yok']], 'adım yok → değerlendirilmedi');
  const r1 = await rapor(kayit(1, 'GIZLI-NOT'));
  eq(r1.genelDurum, 'kismi', '1/3 adım → kısmen gösterildi');
  const r3 = await rapor(kayit(3, 'GIZLI-NOT'));
  eq(r3.genelDurum, 'rehberli', 'tüm adımlar işaretli → yalnız "rehberli uygulama" (bağımsız DEĞİL)');
  ok(['bagimsiz', 'cikti', 'yeni', 'savunma'].every(d => r3.dogrulanmamis.some(x => x.id === 'yok-' + d)), 'bağımsız/çıktı/alışılmadık/savunma iddiaları kanıtsız → doğrulanmamış listesinde');
  ok(r3.iddialar.every(x => x.kanit.length > 0 || x.durum === 'dogrulanmamis'), 'her iddia ya kanıta bağlı ya da doğrulanmamış');
  ok(r3.iddialar.filter(x => /^adim-/.test(x.id)).every(x => x.durum === 'oz-beyan' && x.guven === 'beyan'), 'adım tamamlama öz-beyan olarak etiketli (doğrulandı değil)');
  ok(/YOK/.test(r3.yontem) && r3.sinirlamalar.length >= 3 && /vaat etmez/.test(r3.sinirlamalar.join(' ')), 'yöntem ve sınırlamalar yazılı, iş vaadi yok');
  eq(r3.araclar, { planlanan: 'Postman, SQL', kullanilan: 'kayıtlı değil' }, 'araçlar: planlanan ile kullanılan ayrı');
  // istemci/öz-beyan kanıt kaydı durumu yükseltmez; sunucu doğrulaması yükseltir
  const kIst = [{ tur: 'bagimsiz-gorev', hedef: 'proje:x1', dogrulama: 'istemci', tarih: '2026-10-09T10:00:00Z' }];
  const rIst = await rapor(kayit(3), kIst);
  eq(rIst.genelDurum, 'rehberli', 'istemci kaydı "bağımsız görev" olsa da durum yükselmez');
  ok(rIst.iddialar.some(x => /sunucu doğrulaması yok/.test(x.metin) && x.durum === 'oz-beyan'), 'istemci kaydı "doğrulama yok" etiketiyle listelenir');
  const rSun = await rapor(kayit(3), [{ tur: 'bagimsiz-gorev', hedef: 'proje:x1', dogrulama: 'sunucu', tarih: '2026-10-09T10:00:00Z' }]);
  eq(rSun.genelDurum, 'bagimsiz', 'sunucu doğrulamalı kanıt → "bağımsız görev gösterildi"');
  ok(rSun.iddialar.some(x => x.durum === 'dogrulandi'), 'doğrulandı yalnız sunucu kanıtıyla');
  eq(await ev(() => PP.rapor.DURUMLAR.map(d => d.id)), ['bilgi', 'rehberli', 'bagimsiz', 'cikti', 'yeni', 'savunma', 'kismi', 'yok'], '8 kademeli kanıt durumu tanımlı');

  // 3) İşveren görünümü özel veri sızdırmaz
  const isv = await ev(r => PP.rapor.isverenGorunumu(r), r3);
  const js = JSON.stringify(isv);
  ok(!/GIZLI-NOT/.test(js) && !/Neden/.test(js) && !/kanıt yok/.test(js), 'işveren görünümünde özel not, proje gerekçesi ve kanıtsız iddia metni yok');
  eq(isv.dogrulanmamisSayisi, 4, 'doğrulanmamış iddia sayısı açık (4)');
  ok(isv.iddialar.every(x => x.durum !== 'dogrulanmamis'), 'işveren görünümü yalnız kanıtı olan iddiaları taşır');

  // 4) CV, boşluk, İngilizce
  const cvR = await ev(r => PP.rapor.cv([r]), r3), cv0 = await ev(r => PP.rapor.cv([r]), r0);
  ok(cvR.satirlar.length === 2 && cvR.satirlar.every(s => s.guven === 'oz-beyan'), 'CV satırları yalnız kanıtlı yetkinliklerden ve öz-beyan etiketli');
  eq([cv0.satirlar.length, cv0.eklemeyin.length], [0, 1], 'kayıtsız projeden CV satırı çıkmaz');
  const bs = await ev(([r, d]) => PP.rapor.bosluk({ name: 'QA', sk: ['Postman', 'SQL', 'Selenium'] }, [r], [d]), [r3, DEF]);
  eq([bs.kapsanan.map(x => x.beceri), bs.eksik, bs.oncelik], [['Postman', 'SQL'], ['Selenium'], ['Selenium']], 'boşluk: kayıtlı projelerde geçen beceriler / eksikler');
  ok(/vaat edilmez/.test(bs.uyari) && /doğrulaması değildir/.test(bs.uyari), 'boşluk analizi iş vaadi vermez, doğrulama olmadığını söyler');
  const en = await ev(([d, k]) => PP.rapor.ingilizce(d, k, null), [DEF, kayit(2)]);
  eq(en.terimler, ['test case', 'bug report'], 'teknik İngilizce yalnız tamamlanan adımlardan');
  ok(/kanıtı değildir/.test(en.not), 'örnek tanıtım cümlesi kanıt değil olarak etiketli');

  // 5) Mülakat rubriği
  eq(await ev(() => [PP.mulakat.sonucYap({ puanlar: { kavram: 5 } }).ok, PP.mulakat.sonucYap({ puanlar: { kavram: 1.5 } }).ok, PP.mulakat.sonucYap({ puanlar: {} }).ok, PP.mulakat.sonucYap(null).ok]), [false, false, false, false], 'geçersiz rubrik puanı/boş sonuç reddedilir');
  const tek = await ev(() => PP.mulakat.sonucYap({ kaynak: 'ai', puanlar: { kavram: 4, hata: 2 }, tarih: '2026-10-05' }));
  eq([tek.sonuc.ortalama, tek.sonuc.kaynakAd], [3, 'Yapay zekâ geri bildirimi (insan değil)'], 'ortalama ve kaynak ayrımı (AI ≠ insan)');
  ok(/aksan/.test(tek.sonuc.sinirlama) && /garantisi değildir/.test(tek.sonuc.sinirlama), 'değerlendirme sınırlaması sonuca yazılır');
  await ev(() => { [['2026-10-01', 1, 3], ['2026-10-03', 1, 2], ['2026-10-05', 3, 2]].forEach(([t, k, h]) => PP.mulakat.kaydet({ tarih: t, puanlar: { kavram: k, hata: h } })); });
  const zy = await ev(() => PP.mulakat.zayiflik());
  eq(zy.map(z => [z.kriter, z.kez, z.toplam, z.telafi.eylem.sekme]), [['kavram', 2, 3, 'ders']], 'tekrarlayan zayıflık: 3 mülakatın 2\'sinde kavram ≤1 → telafi eylemi bağlı');
  eq(await ev(() => PP.mulakat.kaydet({ tarih: '2026-10-01', puanlar: { kavram: 1, hata: 3 } }).tekrar === true), true, 'aynı kayıt tekrar eklenmez');
  eq(await ev(() => PP.mulakat.oku().length), 3, 'kayıtlı mülakat sayısı 3');

  // 6) Akran incelemesi
  const A = (f, ...a) => ev(([f, a]) => PP.akran[f](...a), [f, a]);
  const rub = await A('rubrikKur', DEF);
  eq(rub.map(x => x.id), ['adim-0', 'adim-1', 'adim-2', 'readme', 'hata', 'sinir'], 'rubrik proje kanıt adımlarından + genel ölçütlerden kurulur');
  const ince = (o) => ev(([x, r]) => PP.akran.incelemeYap(x, r), [Object.assign({ proje: 'x1', sahip: 'ayse', inceleyen: 'mehmet', kaynak: 'insan', puanlar: { 'adim-0': 2, readme: 1 }, yorum: 'Somut öneri' }, o || {}), rub]);
  ok((await ince()).ok, 'geçerli insan incelemesi kabul edilir');
  eq((await ince({ kaynak: undefined })).neden, 'kaynak-belirtilmeli', 'AI/insan kaynağı belirtilmeden inceleme reddedilir');
  eq((await ince({ inceleyen: 'ayse' })).neden, 'kendi-incelemesi-akran-degil', 'kendi projesine insan incelemesi akran sayılmaz');
  eq((await ince({ puanlar: { yok: 1 } })).neden, 'bilinmeyen-olcut', 'rubrikte olmayan ölçüt reddedilir');
  eq((await ince({ puanlar: { readme: 3 } })).neden, 'puan-gecersiz', 'rubrik puanı 0-2 dışına çıkamaz');
  const ai = await ince({ kaynak: 'ai', inceleyen: 'sistem' });
  eq(ai.inceleme.etiket, 'Yapay zekâ geri bildirimi (insan değil)', 'AI incelemesi etiketli');
  const inc = (await ince()).inceleme;
  eq(await Promise.all([A('gorunur', inc, 'ayse'), A('gorunur', inc, 'mehmet'), A('gorunur', inc, 'yabanci'), A('gorunur', inc, null)]), [true, true, false, false], 'inceleme yalnız proje sahibine ve yazarına görünür');
  const proje = { title: 'API testi', steps: [{ t: 'Adım 1', note: 'GIZLI-DEFTER' }, { t: 'Adım 2', note: 'GIZLI-DEFTER-2' }] };
  const gor = await A('incelenebilirIcerik', proje, { adimlar: [0] });
  ok(JSON.stringify(gor.adimlar.map(a => a.t)) === '["Adım 1"]' && !/GIZLI/.test(JSON.stringify(gor)), 'izin verilmeyen adım ve özel not inceleyene gitmez');
  ok(/GIZLI-DEFTER/.test(JSON.stringify(await A('incelenebilirIcerik', proje, { adimlar: [0], notlar: true }))) && !/GIZLI-DEFTER-2/.test(JSON.stringify(await A('incelenebilirIcerik', proje, { adimlar: [0], notlar: true }))), 'not paylaşımı yalnız açıkça izin verilen adım için');
  eq(await ev(i => { const a = PP.akran.coz(i, 'mehmet'), c = PP.akran.itirazEt(i, 'ayse', ''), d = PP.akran.itirazEt(i, 'ayse', 'Bu madde yanlış değerlendirildi'); return [a.neden, c.neden, d.ok, i.durum]; }, inc), ['yetki-yok', 'neden-gerekli', true, 'itiraz'], 'çözme yalnız sahipte; itiraz gerekçeli');
  eq(await ev(() => PP.akran.guvenEtkisi().degisir), false, 'inceleme güvenilir yetkinlik durumunu değiştirmez');
  eq((await rapor(kayit(3))).genelDurum, 'rehberli', 'inceleme sonrası rapor durumu aynı');

  // 7) Paylaşım ve iptal (sahte depo)
  const P = await ev(async (rp) => {
    const depo = PP.paylasim.bellekDepo(), T0 = 1000000000000, gun = 864e5, out = {};
    const r = await PP.paylasim.olustur(depo, 'ayse', rp, 7, T0);
    out.belirtecUzun = r.belirtec.length;
    out.depoToken = depo._hepsi().indexOf(r.belirtec) >= 0;
    out.gecerli = (await PP.paylasim.erisim(depo, r.belirtec, T0 + gun)).ok;
    out.yanlis = (await PP.paylasim.erisim(depo, r.belirtec.slice(0, -1) + (r.belirtec.slice(-1) === 'a' ? 'b' : 'a'), T0 + gun)).neden;
    out.kisa = (await PP.paylasim.erisim(depo, 'abc', T0)).neden;
    out.bos = (await PP.paylasim.erisim(depo, null, T0)).neden;
    out.sureDoldu = (await PP.paylasim.erisim(depo, r.belirtec, T0 + 8 * gun)).neden;
    out.baskasiIptal = (await PP.paylasim.iptal(depo, r.id, 'mehmet', T0 + gun)).neden;
    out.halaGecerli = (await PP.paylasim.erisim(depo, r.belirtec, T0 + gun)).ok;
    out.sahipIptal = (await PP.paylasim.iptal(depo, r.id, 'ayse', T0 + 2 * gun)).ok;
    out.iptalSonrasi = (await PP.paylasim.erisim(depo, r.belirtec, T0 + 2 * gun + 1)).neden;
    out.yok = (await PP.paylasim.iptal(depo, 'p-yok', 'ayse')).neden;
    out.ozel = [PP.paylasim.ozelRapor(rp, 'ayse', 'ayse').ok, PP.paylasim.ozelRapor(rp, 'ayse', 'mehmet').ok, PP.paylasim.ozelRapor(rp, 'ayse', null).ok];
    const uzun = await PP.paylasim.olustur(depo, 'ayse', rp, 365, T0);
    out.azamiGun = Math.round((uzun.bitis - T0) / gun);
    return out;
  }, isv);
  eq([P.belirtecUzun, P.depoToken], [48, false], 'belirteç 48 hane; depoda ham belirteç yok (yalnız özet)');
  eq([P.gecerli, P.yanlis, P.kisa, P.bos], [true, 'gecersiz', 'gecersiz', 'gecersiz'], 'geçerli belirteç erişir; yanlış/kısa/boş erişemez');
  eq(P.sureDoldu, 'suresi-doldu', 'süresi dolan paylaşım erişim vermez');
  eq([P.baskasiIptal, P.halaGecerli], ['yetki-yok', true], 'sahibi olmayan paylaşımı iptal edemez');
  eq([P.sahipIptal, P.iptalSonrasi], [true, 'iptal'], 'iptal edilen paylaşım erişim vermez');
  eq(P.yok, 'yok', 'olmayan paylaşım iptali hata verir');
  eq(P.ozel, [true, false, false], 'özel rapor yalnız sahibine açık; yetkisiz/anonim göremez');
  eq(P.azamiGun, 14, 'geçersiz gün sayısı varsayılan 14 güne düşer (azami 90)');

  // 8) Sunucu politikası: statik denetim (çalıştırılmadı)
  const sql = fs.readFileSync(path.join(__dirname, '..', 'supabase', 'migrations', '20261013_paylasim_politikasi.sql'), 'utf8');
  const kod = sql.split('\n').filter(l => !/^\s*--/.test(l)).join('\n').toLowerCase();
  ok(/enable row level security/.test(kod) && /revoke all on public\.rapor_paylasim from anon/.test(kod), 'SQL: RLS açık, anon doğrudan erişemez');
  ok(/owner = auth\.uid\(\)/.test(kod) && !/using \(true\)/.test(kod), 'SQL: tablo politikaları yalnız sahibine');
  ok(/revoked_at is null/.test(kod) && /expires_at > now\(\)/.test(kod) && /sha256\(/.test(kod), 'SQL: rapor_gor iptal/süre kontrolü yapar ve özetle karşılaştırır');
  ok(/iptal geri alinamaz/.test(kod) && /yalniz revoked_at degistirilebilir/.test(kod), 'SQL: yalnız iptal alanı değişir, iptal geri alınamaz');
  ok(!/\bdrop\s|\btruncate\b|\bdelete\s+from\b|\bupdate\s+public\.|alter table .* drop/.test(kod), 'SQL: yıkıcı ifade yok (drop/truncate/delete/update)');
  ok(!/\btoken\s+text/.test(kod) && /token_ozet\s+text/.test(kod), 'SQL: ham belirteç sütunu yok, yalnız özet');

  // 9) Arayüz
  await ev(() => {
    const d = pathProj('sec1');
    S.projects.push({ id: 'path-sec1', title: d.title, why: d.why, kind: 'path', pid: 'sec1', lv: d.lv, status: 'yapılıyor', notes: [], claude: [], created: '2026-10-01', finished: '',
      steps: d.steps.map((s, i) => ({ t: s.t, done: i < 2, ts: i < 2 ? '2026-10-0' + (i + 1) + 'T10:00:00Z' : '', note: '' })) });
    S.pj.sel = 'path-sec1'; goTab('proje');
  });
  await p.waitForTimeout(400);
  const rp = await ev(() => { const e = document.querySelector('#view [data-rapor=panel]'); return e ? { genel: document.querySelector('[data-rapor=genel]').textContent, iddia: [...document.querySelectorAll('[data-iddia]')].map(x => x.dataset.iddia) } : null; });
  ok(rp && /Yetkinlik kısmen gösterildi/.test(rp.genel) && rp.iddia.includes('oz-beyan') && rp.iddia.includes('dogrulanmamis'), 'proje detayında kanıt raporu: kısmen gösterildi, öz-beyan + doğrulanmamış iddialar');
  ok(await ev(() => /bağlantı oluşturma kapalı/.test(document.querySelector('[data-rapor=panel]').textContent)), 'paylaşım arayüzü sunucu politikası uygulanana kadar kapalı ve bunu söyler');
  ok(await ev(() => document.documentElement.scrollWidth <= innerWidth + 1), 'proje raporu 390 px taşmıyor');
  // tamamlama rozet değil kanıt kaydı üretir (öz-beyan etiketli; durumu yükseltmez)
  await ev(() => { const q = S.projects[0]; const son = q.steps.length - 1; q.steps.forEach((s, i) => { s.done = i < son; }); pjToggle(q, son); });
  await p.waitForTimeout(200);
  eq(await ev(() => PP.ogr.depo.oku().kanitlar.filter(k => k.tur === 'proje-kaydi').map(k => [k.id, k.hedef, k.dogrulama])), [['proje-kaydi-sec1', 'proje:sec1', 'beyan']], 'proje tamamlanınca kanıt kaydı yazılır (öz-beyan)');
  await ev(() => { const q = S.projects[0]; q.steps.forEach(s => { s.done = true; }); });
  eq(await ev(() => PP.rapor.olustur({ def: pathProj('sec1'), kayit: S.projects[0], kanitlar: PP.ogr.depo.oku().kanitlar, bugun: '2026-10-11' }).genelDurum), 'rehberli', 'tamamlama kaydı bağımsızlık/çıktı durumuna yükseltmez');
  await ev(() => { S.projects = []; localStorage.removeItem('ya_pp_ogr'); goTab('mul'); });
  await p.waitForTimeout(400);
  ok(await ev(() => !!document.querySelector('#view [data-rubrik=panel]')), 'mülakat sekmesinde rubrik paneli');
  const kayitUi = async (kavram) => { await ev(k => { document.querySelector('[data-puan="kavram=' + k + '"]').click(); }, kavram); await p.waitForTimeout(150); await ev(() => document.querySelector('[data-rubrik=kaydet]').click()); await p.waitForTimeout(200); };
  await kayitUi(1);
  ok(await ev(() => /Kaydedildi \(öz değerlendirme\)/.test(document.querySelector('[data-rubrik=msg]').textContent)), 'rubrik sonucu kaydedilir (öz değerlendirme)');
  await ev(() => { const l = PP.mulakat.oku(); l[0].tarih = '2026-10-01'; PP.ogr.depo.tercih('mulakat', l); draw(); });
  await kayitUi(0);
  eq(await ev(() => PP.mulakat.oku().length), 2, 'ikinci mülakat sonucu kaydedildi');
  ok(await ev(() => !!document.querySelector('[data-zayiflik=kavram]')), 'tekrarlayan zayıflık görünür');
  await ev(() => [...document.querySelectorAll('[data-zayiflik=kavram] button')][0].click()); await p.waitForTimeout(300);
  eq(await ev(() => tab), 'ders', 'zayıflık telafi düğmesi ilgili sekmeye götürür');
  ok(errs.length === 0, 'sayfa hatası yok ' + errs.join('|'));
  await b.close();
  console.log(fails ? '\nKALDI: ' + fails : '\nGEÇTİ');
  process.exit(fails ? 1 : 0);
})();

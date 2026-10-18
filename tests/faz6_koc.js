// Faz 6: Koç (PP.koc + panel). İzin/onay, hata/zaman aşımı, köken (kanıt), cevap-sızdırmama testleri. Sahte sağlayıcı; gerçek AI yok.
// Hata → çıkış 1.
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
  const depo = () => ev(() => localStorage.getItem('ya_pp_ogr'));

  // 1) Veri yok: öneri yok, uydurma geçmiş yok
  ok(await ev(() => !!document.querySelector('#view [data-koc=panel]')), 'panel Bugün sekmesinde görünür');
  eq(await ev(() => document.querySelectorAll('#view [data-oneri]').length), 0, 'kayıt yokken öneri üretilmez');
  ok(await ev(() => /Henüz öneri çıkaracak kayıt yok/.test(document.querySelector('[data-koc=bos]').textContent)), 'kayıt yokken "veri yok" denir');

  // 2) Gerçek kayıttan öneri + kanıt
  await ev(() => { PP.ogr.depo.sunucuEkle({ id: 'sv-test-1', hedef: 'ders:ccna:1:sinav', varyant: 'v1', puan: 1, maks: 5, surum: PP.ogr.ui.graf().surum, kaynak: 'sunucu' }); draw(); });   // ccna-1 artık sunucuya bağlı: başarısız deneme sunucu önbellek kaydı olarak eklenir
  await p.waitForTimeout(300);
  const o = await ev(() => { const e = document.querySelector('#view [data-oneri]'); return e ? { id: e.dataset.oneri, t: e.textContent } : null; });
  ok(o && o.id === 'tekrar:ders:ccna:1:sinav', 'başarısız mini sınavdan telafi önerisi çıktı');
  ok(o && /%20/.test(o.t) && /%80/.test(o.t) && /deneme kaydı/.test(o.t), 'öneri kanıtını gösterir: oran %20, eşik %80, kaynak "deneme kaydı"');

  // 3) Gezinme: geçerli hedef çalışır; geçersiz hedef/sekme reddedilir
  eq(await ev(() => PP.koc.calistir({ tip: 'gezin', eylem: { tip: 'hedef', hedef: 'ders:yok:99:sinav' } })), { ok: false, neden: 'gecersiz-hedef' }, 'gezinme: olmayan hedef reddedilir');
  eq(await ev(() => PP.koc.calistir({ tip: 'gezin', eylem: { tip: 'sekme', sekme: 'yok-sekme' } })), { ok: false, neden: 'gecersiz-hedef' }, 'gezinme: bilinmeyen sekme reddedilir');
  await p.locator('#view [data-oneri] button:text-is("Git")').first().click();
  await p.waitForTimeout(400);
  eq(await ev(() => [tab, S.les.track, S.les.id]), ['ders', 'ccna', 'base-s-ccna-1'], 'gezinme: öneri sahibi derse gider');
  await ev(() => goTab('bugun')); await p.waitForTimeout(300);

  // 4) Tercih: değiştir, kalıcı, onaysız sıfırlanmaz, onayla sıfırlanır; ilerleme silinmez
  const denemeOnce = await ev(() => PP.ogr.depo.oku().denemeler.length);
  await p.locator('#view [data-koc=panel] details summary:text-is("Koç tercihleri")').click(); await p.waitForTimeout(300);
  await ev(() => document.querySelector('[data-tercih="ton=ayrintili"]').click()); await p.waitForTimeout(200);
  ok(await ev(() => document.querySelector('[data-koc=panel] > details').open), 'tercih değişince bölüm açık kalır');
  eq(await ev(() => PP.koc.tercihOku().ton), 'ayrintili', 'tercih değişti');
  await p.reload(); await p.waitForTimeout(1500);
  eq(await ev(() => PP.koc.tercihOku().ton), 'ayrintili', 'tercih yenilemeden sonra kalıcı');
  eq(await ev(() => PP.koc.tercihYaz('ton', 'bilinmeyen')), false, 'geçersiz tercih değeri reddedilir');
  eq(await ev(() => PP.koc.calistir({ tip: 'tercih-sifirla' })), { ok: false, neden: 'onay-gerekli' }, 'sıfırlama onaysız yapılmaz');
  eq(await ev(() => PP.koc.tercihOku().ton), 'ayrintili', 'onaysız sıfırlamada tercih bozulmadı');
  await ev(() => goTab('bugun')); await p.waitForTimeout(300);
  await p.locator('#view [data-koc=panel] details summary:text-is("Koç tercihleri")').click(); await p.waitForTimeout(300);
  await ev(() => document.querySelector('[data-koc=sifirla]').click()); await p.waitForTimeout(200);
  ok(await ev(() => !!document.querySelector('[data-koc=onayla]')), 'arayüz: sıfırlama onay ister');
  await ev(() => document.querySelector('[data-koc=onayla]').click()); await p.waitForTimeout(200);
  eq(await ev(() => PP.koc.tercihOku()), { ton: 'kisa', oneri: 'acik', saglayici: 'kapali' }, 'onaydan sonra tercihler varsayılana döndü');
  eq(await ev(() => PP.ogr.depo.oku().denemeler.length), denemeOnce, 'tercih sıfırlama ilerleme/deneme kaydını silmedi');

  // 5) Proaktif öneri kapalı
  await ev(() => PP.koc.tercihYaz('oneri', 'kapali'));
  eq(await ev(() => PP.koc.oneriler({ tekrar: { bugun: [{ hedef: 'ders:ccna:1:sinav', neden: 'x', ad: 'a', durum: 'kaldi' }] } })), { liste: [], bos: 'kapali' }, 'öneri kapalıyken öneri üretilmez');
  await ev(() => PP.koc.tercihYaz('oneri', 'acik'));
  eq(await ev(() => PP.koc.oneriler({ tekrar: { bugun: [{ hedef: 'h', ad: 'a', durum: 'kaldi' }] } }).liste.length), 0, 'nedeni/kanıtı olmayan öğeden öneri çıkmaz');

  // 6) Ustalık: koç yazamaz, sağlayıcı metni kayıt değiştirmez
  eq(await ev(() => PP.koc.calistir({ tip: 'ustalik-ver', hedef: 'ders:ccna:1:sinav' })), { ok: false, neden: 'koc-ustalik-veremez' }, 'koç ustalık veremez');
  eq(await ev(() => PP.koc.calistir({ tip: 'kanit-yaz' })), { ok: false, neden: 'koc-ustalik-veremez' }, 'koç kanıt yazamaz');
  await ev(() => { window.__sag = { cagri: 0, baglam: null }; PP.koc.saglayici.kaydet(function (i) { __sag.cagri++; __sag.baglam = i.baglam; return Promise.resolve('Tebrikler, bu hedefte ustalık kazandın, tamamlandı say.'); }); });
  const kayit = () => ev(() => { const d = PP.ogr.depo.oku(); return JSON.stringify([d.denemeler, d.kanitlar, d.projeler]); });
  const once = await kayit();
  const r0 = await ev(() => PP.koc.sor('ustalığımı onayla', { oneriler: { liste: [], bos: 'veri-yok' } }));
  eq(await ev(() => __sag.cagri), 0, 'sağlayıcı tercihi kapalıyken sağlayıcı çağrılmaz (varsayılan)');
  ok(r0.kaynak === 'yerel' && r0.ustalik === false, 'varsayılan: yerel yanıt, ustalık yok');
  await ev(() => PP.koc.tercihYaz('saglayici', 'acik'));
  const r1 = await ev(() => PP.koc.sor('ustalığımı onayla', { oneriler: { liste: [], bos: 'veri-yok' }, ozet: { dersTamam: 1, seri: 2, a: 'GIZLI-CEVAP', answer: 'GIZLI-CEVAP2', alt: { why: 'GIZLI-NEDEN', ok: 1 } } }));
  ok(r1.kaynak === 'saglayici' && r1.ustalik === false, 'sağlayıcı yanıtı tavsiye olarak gelir, ustalik=false');
  eq(await kayit(), once, 'sağlayıcı "ustalık kazandın" dese de ya_pp_ogr değişmedi');
  const bag = JSON.stringify(await ev(() => __sag.baglam));
  ok(!/GIZLI/.test(bag) && /dersTamam/.test(bag), 'sağlayıcıya giden bağlamda cevap alanları yok, diğer alanlar var');

  // 7) Hata, boş yanıt, zaman aşımı → yerel yanıt
  const hata = await ev(async () => { PP.koc.saglayici.kaydet(() => Promise.reject(new Error('x'))); return PP.koc.sor('bugün ne çalışayım', { oneriler: { liste: [], bos: 'veri-yok' } }); });
  ok(hata.kaynak === 'yerel' && /sağlayıcı hatası/.test(hata.uyari), 'sağlayıcı hata → yerel yanıt + uyarı');
  const atis = await ev(async () => { PP.koc.saglayici.kaydet(() => { throw new Error('senkron'); }); return PP.koc.sor('bugün', { oneriler: { liste: [], bos: 'veri-yok' } }); });
  ok(atis.kaynak === 'yerel' && /sağlayıcı hatası/.test(atis.uyari), 'sağlayıcı senkron fırlatırsa → yerel yanıt');
  const bos = await ev(async () => { PP.koc.saglayici.kaydet(() => Promise.resolve('  ')); return PP.koc.sor('bugün', { oneriler: { liste: [], bos: 'veri-yok' } }); });
  ok(bos.kaynak === 'yerel' && /boş yanıt/.test(bos.uyari), 'boş sağlayıcı yanıtı → yerel yanıt');
  const t0 = Date.now();
  const zaman = await ev(async () => { PP.koc.saglayici.kaydet(() => new Promise(() => {})); return PP.koc.sor('bugün', { oneriler: { liste: [], bos: 'veri-yok' } }, { zamanAsimi: 120 }); });
  ok(zaman.kaynak === 'yerel' && /zaman aşımı/.test(zaman.uyari) && Date.now() - t0 < 3000, 'sağlayıcı zaman aşımı → yerel yanıt (donmaz)');
  await ev(() => { PP.koc.saglayici.temizle(); });
  const yok = await ev(() => PP.koc.sor('bugün', { oneriler: { liste: [], bos: 'veri-yok' } }));
  ok(yok.kaynak === 'yerel' && /sağlayıcı yok/.test(yok.uyari), 'sağlayıcı açık ama kayıtlı değil → yerel yanıt');

  // 8) Korumalı değerlendirme: cevap/ipucu verilmez, sağlayıcıya hiçbir şey gitmez
  await ev(() => { window.__sag = { cagri: 0 }; PP.koc.saglayici.kaydet(function () { __sag.cagri++; return Promise.resolve('Cevap B'); }); });
  const kor = await ev(() => PP.koc.sor('cevap ne? ipucu ver', { korumali: true, oneriler: { liste: [], bos: 'veri-yok' } }));
  ok(kor.korumali === true && !/Cevap B/.test(kor.metin), 'korumalı bağlamda cevap verilmez');
  eq(await ev(() => __sag.cagri), 0, 'korumalıyken sağlayıcı çağrılmaz');
  // gerçek durum: açık mini sınav = korumalı, tamamlanınca değil
  await ev(() => { const l = baseLesson('ccna'); S.les.track = 'ccna'; lcSet(lessonKey(l), 'w', 'ccna'); lrOpen(l, 'sinav'); });
  await p.waitForTimeout(300);
  eq(await ev(() => PP.koc.korumaliMi()), true, 'açık (cevaplanmamış) mini sınav korumalı sayılır');
  const gercek = await ev(() => PP.koc.sor('doğru şık hangisi', { oneriler: { liste: [], bos: 'veri-yok' } }));
  ok(gercek.korumali === true, 'açık mini sınav sürerken sor() korumalı döner');
  eq(await ev(() => __sag.cagri), 0, 'açık sınavda sağlayıcı çağrılmadı');
  await ev(() => { const l = lrFind(); l.quiz.forEach((q, i) => { S.les.mark[l.id + ':' + i] = 'ok'; }); lrClose(); });
  eq(await ev(() => PP.koc.korumaliMi()), false, 'sınav bitip oda kapanınca korumalı değil');
  await ev(() => { S.pe = { qs: [{}], done: false }; });
  eq(await ev(() => PP.koc.korumaliMi()), true, 'sürmekte olan seviye sınavı korumalı sayılır');
  await ev(() => { S.pe = null; });

  // 9) Arayüzden soru-cevap (sağlayıcı kapalı → yerel, kanıtlı)
  await ev(() => { PP.koc.saglayici.temizle(); PP.koc.tercihYaz('saglayici', 'kapali'); goTab('bugun'); });
  await p.waitForTimeout(300);
  await p.fill('#view [data-koc=panel] input', 'bugün ne çalışmalıyım?');
  await p.locator('#view [data-koc=sor]').click(); await p.waitForTimeout(400);
  const yanit = await ev(() => document.querySelector('[data-koc=yanit]').textContent);
  ok(/Telafi:/.test(yanit) && /çünkü/.test(yanit), 'arayüz: yanıt kayıttan, nedeniyle birlikte');
  await p.fill('#view [data-koc=panel] input', 'yarın hava nasıl?');
  await p.locator('#view [data-koc=sor]').click(); await p.waitForTimeout(300);
  ok(/göremiyorum/.test(await ev(() => document.querySelector('[data-koc=yanit]').textContent)), 'arayüz: kayıtta olmayan soruya uydurma cevap yok');

  // 10) 390 px ve hata
  ok(await ev(() => document.documentElement.scrollWidth <= innerWidth + 1), '390 px: yatay taşma yok');
  ok(errs.length === 0, 'sayfa hatası yok ' + errs.join('|'));
  await b.close();
  console.log(fails ? '\nKALDI: ' + fails : '\nGEÇTİ');
  process.exit(fails ? 1 : 0);
})();

// W1: PP.senaryo (ders sonu İngilizce iş senaryosu, pilot: VA Seviye 0, Backend 1–5, Siber 1–5) + Faz 10 tur 4 açıkları (VA lab çubuğu, Sıra alıştırması).
// Beklenenler elle yazıldı. Bölüm 1 Node'da (tarayıcısız), bölüm 2 gerçek sayfada (390 px).
const fs = require('fs');
const path = require('path');
const { INIT, chromium } = require('./stub.js');
const KOK = path.join(__dirname, '..');
const U = require('url').pathToFileURL(path.join(KOK, 'index.html')).href;
let fails = 0;
const ok = (c, m) => { console.log((c ? 'OK    ' : 'HATA  ') + m); if (!c) fails++; };
const eq = (a, b, m) => { const s = JSON.stringify(a) === JSON.stringify(b); ok(s, m + (s ? '' : '  → beklenen ' + JSON.stringify(b) + ', gelen ' + JSON.stringify(a))); };

const DERSLER = ['va0-1', 'va0-2', 'va0-3', 'bk-1', 'bk-2', 'bk-3', 'bk-4', 'bk-5', 'sec-1', 'sec-2', 'sec-3', 'sec-4', 'sec-5'];

// ---- Bölüm 1: saf mantık (Node) ----
(function () {
  const mem = {}; globalThis.localStorage = { getItem: k => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = String(v); }, removeItem: k => { delete mem[k]; } };
  globalThis.window = globalThis; globalThis.PP = {};
  ['js/ogrenme/cekirdek.js', 'js/ogrenme/depo.js', 'js/ogrenme/rapor.js', 'js/ogrenme/senaryo.js', 'content/senaryo/va0.js', 'content/senaryo/bk.js', 'content/senaryo/sec.js'].forEach(f => require(path.join(KOK, f)));
  const S = PP.senaryo, K = S.hepsi();

  eq(K.map(k => k.ders).sort(), DERSLER.slice().sort(), 'pilot: 13 ders, ders başına tam 1 kart (VA 3 + Backend 5 + Siber 5)');
  eq([K.filter(k => k.yol === 'va0').length, K.filter(k => k.yol === 'bk').length, K.filter(k => k.yol === 'sec').length], [3, 5, 5], 'pilot dağılımı 3 / 5 / 5');
  eq(new Set(K.map(k => k.id)).size, K.length, 'kart kimlikleri benzersiz');
  eq(K.filter(k => !/^sn-/.test(k.id) || k.id !== 'sn-' + k.ders).map(k => k.id), [], 'kart kimliği "sn-" + ders');
  eq(window.PP_SENARYO.length, K.length, 'tüm tanımlar geçerli (reddedilen kart yok)');
  eq(K.map(k => S.kelimeSay(k.belge.metin)).filter(n => n < 80 || n > 180), [], 'her belge 80–180 kelime');
  eq(K.map(k => k.sozluk.length).filter(n => n < 6 || n > 10), [], 'her kartta 6–10 terimlik mini sözlük');
  eq(K.map(k => k.kontrol.length).filter(n => n < 5 || n > 6), [], 'her kartta 5–6 maddelik kontrol listesi');
  ok(K.every(k => k.kaliplar.length >= 3 && k.ipucuTr.length > 20 && k.mustMention.length >= 3), 'her kartta ≥3 cümle kalıbı, Türkçe ipucu ve ≥3 anahtar kavram');
  eq(K.filter(k => /@|\+?\d{10,}|https?:\/\//.test(k.belge.metin + k.belge.kimden + k.belge.konu)).map(k => k.id), [], 'belgelerde e-posta adresi, telefon ya da bağlantı yok (kişisel veri yok)');
  eq(K.map(k => k.sablon).filter(x => !S.SABLONLAR[x]), [], 'her kart bilinen şablonu kullanır');
  eq(Object.keys(S.SABLONLAR).sort(), ['bug', 'inceleme', 'soru', 'yanit'], 'şablonlar: bug, inceleme, soru (açıklayıcı soru), yanıt');

  // Örnek iyi cevap kendi denetimini geçer; boş/alakasız cevap geçmez
  K.forEach(k => {
    const y = S.yapiDenetimi(k, k.ornek), kv = S.kavramDenetimi(k, k.ornek), bos = S.kavramDenetimi(k, {}), kisa = S.yapiDenetimi(k, Object.fromEntries(Object.keys(k.ornek).map(a => [a, 'ok'])));
    ok(y.ok && kv.eksik.length === 0 && bos.bulunan.length === 0 && !kisa.ok, k.id + ': örnek yapı+kavram tam; boş cevap 0 kavram; tek kelimelik cevap yapıyı geçemez');
  });

  // Kavram denetimi: eş anlamlı, büyük/küçük harf, tire, önek, tam kelime sınırı
  const bk1 = S.bul('sn-bk-1'), y = (t) => ({ problem: t, cause: '', fix: '', verified: '', next: '' });
  eq(S.kavramDenetimi(bk1, y('The call returned NOT FOUND.')).bulunan, ['404 Not Found durumu'], 'kavram: eş anlamlı ("not found") büyük harfle de bulunur');
  eq(S.kavramDenetimi(bk1, y('The route was a Wrong-Path in the client.')).bulunan.sort(), ['hata istemcide', 'yanlış yol (/user ≠ /users)'].sort(), 'kavram: tire boşluk sayılır ("wrong-path"), ayrı kavramlar ayrı bulunur');
  eq(S.kavramDenetimi(bk1, y('error 4040 and unclient')).bulunan, [], 'kavram: tam kelime sınırı (4040, unclient eşleşmez)');
  const bk2 = S.bul('sn-bk-2');
  eq(S.kavramDenetimi(bk2, { observation: 'Do not deleteOrder via GET', why: '', suggestion: '' }).bulunan, [], 'kavram: "deleteOrder" tek kelime DELETE kavramını saymaz');
  eq(S.kavramDenetimi(bk2, { observation: '', why: '', suggestion: 'Use DELETE /orders/{id}' }).bulunan.sort(), ['DELETE yöntemi', 'yollarda isim/kaynak kullanımı'].sort(), 'kavram: "DELETE /orders/{id}" iki kavramı birden karşılar');
  eq(S.kavramDenetimi(S.bul('sn-sec-1'), { problem: 'The data was unencrypted and exposed.', cause: '', fix: '', verified: '', next: '' }).bulunan.sort(), ['risk / veri ifşası', 'zafiyet (şifrelenmemiş disk)'].sort(), 'kavram: "unencrypted"/"exposed" eş anlamları');
  eq(S.kelimeSay("Don't panic: it's 5xx, not 4xx."), 6, 'kelime sayımı: kesme işareti ve rakamlı kelimeler tek kelime');

  // Yapı denetimi
  const yp = S.yapiDenetimi(bk1, { problem: 'a b c', cause: 'a b', fix: 'a b c', verified: 'a b c', next: 'a b c' });
  eq([yp.ok, yp.eksik, yp.toplam], [false, ['Cause'], 14], 'yapı: bir alan 3 kelimeden kısaysa o başlık eksik listelenir');
  eq(S.yapiDenetimi(bk1, { problem: 'a b c', cause: 'a b c', fix: 'a b c', verified: 'a b c', next: 'a b c' }).ok, false, 'yapı: alanlar dolu ama toplam 45 kelimenin altındaysa tamam değil');
  eq(S.yapiDenetimi(S.bul('sn-bk-3'), { reply: 'word '.repeat(39) }).ok, false, 'yapı: yanıt şablonu 40 kelimeden kısa → tamam değil');
  eq(S.yapiDenetimi(S.bul('sn-bk-3'), { reply: 'word '.repeat(40) }).ok, true, 'yapı: yanıt şablonu tam 40 kelimede tamam (sınır)');

  // Yerel kayıt: yalnız ya_pp_ogr.tercih.senaryo; denemeler/kanıtlar boş; kapı/not/ustalık sayılmaz
  PP.ogr.gun = PP.ogr.gun || { bugun: () => '2026-10-13' };
  eq(S.SAYILIR, { kapi: false, not: false, ustalik: false, kanit: false }, 'sonuç kapı, not, ustalık ya da kanıt SAYILMAZ (sabit)');
  eq(S.gonder('sn-bk-3', { reply: '' }), { ok: false, neden: 'bos-cevap' }, 'boş cevap gönderilemez');
  eq(S.gonder('sn-yok', { reply: 'x' }), { ok: false, neden: 'bilinmeyen-kart' }, 'bilinmeyen kart reddedilir');
  eq(S.taslak('sn-bk-3', { reply: 'draft text' }).ok, true, 'taslak kaydedilir');
  eq([S.oku('sn-bk-3').g, S.oku('sn-bk-3').c.reply], [0, 'draft text'], 'taslak gönderilmiş sayılmaz');
  eq(S.portfoyKayitlari(), [], 'taslak portföye girmez');
  const g1 = S.gonder('sn-bk-3', S.bul('sn-bk-3').ornek);
  ok(g1.ok && g1.yapi.ok && g1.kavram.eksik.length === 0 && !!g1.ornek.reply, 'gönder: yapı + kavram denetimi ve örnek cevap döner');
  eq(S.oku('sn-bk-3').g, 1, 'gönderilen cevap "gönderildi" işaretlenir');
  const depo = JSON.parse(mem.ya_pp_ogr);
  eq([depo.denemeler.length, depo.kanitlar.length, Object.keys(depo.tercih)], [0, 0, ['senaryo']], 'depoda deneme/kanıt yok; yalnız tercih.senaryo');
  eq(Object.keys(mem), ['ya_pp_ogr'], 'yeni depolama anahtarı yok');
  eq(S.kontrolIsaretle('sn-bk-3', 1, true).ok && S.kontrolIsaretle('sn-bk-3', 4, true).ok, true, 'öz-karşılaştırma maddeleri işaretlenir');
  eq(S.oku('sn-bk-3').k, [0, 1, 0, 0, 1, 0], 'öz-karşılaştırma durumu kayıtlı (6 madde)');
  eq(S.kontrolIsaretle('sn-bk-3', 9, true), { ok: false, neden: 'gecersiz-madde' }, 'geçersiz madde reddedilir');
  S.gonder('sn-sec-2', S.bul('sn-sec-2').ornek);
  eq(S.portfoyKayitlari().map(x => x.id), ['sn-bk-3', 'sn-sec-2'], 'portföy kayıtları yalnız gönderilenler (tarih, kimlik sırasıyla)');

  // Portföy ("İş yazışmalarım") — PP.rapor: doğrulanmamış etiket, gizli ve özel not dışarıda
  mem.ya_nt = JSON.stringify({ 'l:x': { t: 'ÖZELNOT-GİZLİ-123' } });
  S.gizle('sn-sec-2', true);
  const kay = S.portfoyKayitlari(), r = PP.rapor.isYazismalari(kay), m = PP.rapor.isYazismalariMetni(kay);
  eq([r.etiket, r.sayi, r.gizli, r.iddialar.map(x => x.durum), r.iddialar.map(x => x.etiket)], ['doğrulanmamış', 1, 1, ['dogrulanmamis'], ['doğrulanmamış']], 'rapor: İş yazışmalarım yalnız "doğrulanmamış" iddia üretir; gizli sayılmaz');
  ok(/doğrulanmamış/.test(m) && /Kind regards/.test(m) && !/Oscar|CIA|confidentiality/i.test(m) && !/ÖZELNOT/.test(m), 'dışa aktarma metni: etiketli, gizli yazıyı ve özel notu içermez');
  eq(r.iddialar.every(x => x.kanit[0].guven === 'beyan'), true, 'rapor: kanıt güveni "beyan" (sunucu/istemci doğrulaması değil)');
  eq(PP.rapor.isYazismalari([]).sayi, 0, 'rapor: boş liste sorunsuz');
  S.yenidenYaz('sn-bk-3');
  eq([S.oku('sn-bk-3').g, S.oku('sn-bk-3').k, S.oku('sn-bk-3').c.reply.length > 40], [0, [], true], 'yeniden yaz: gönderildi kalkar, öz-karşılaştırma sıfırlanır, metin korunur');
  eq(S.portfoyKayitlari().map(x => x.id), ['sn-sec-2'], 'yeniden yazılan kart portföyden çıkar');
  mem.ya_pp_ogr = '{bozuk'; eq(S.oku('sn-bk-3').c.reply, '', 'bozuk depo hata fırlatmaz');
})();

// ---- Bölüm 2: gerçek sayfa ----
(async () => {
  const b = await chromium.launch(), ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  const les = (tr, n, ad) => `window.__store.lessons['2026-10-09-${tr}${n}']={id:'2026-10-09-${tr}${n}',date:'2026-10-09',track:'${tr}',kind:'ders',title:'${ad}',topicId:'s-${tr}-${n}',hook:'x',blocks:[{t:'p',text:'Deneme.',items:[],parts:[]}],quiz:[]};`;
  let fx = ''; for (const t of ['bk', 'sec']) for (let n = 1; n <= 6; n++) fx += les(t, n, 'Ders ' + n);
  await ctx.addInitScript(INIT); await ctx.addInitScript("localStorage.ya_gm_seen='1';" + fx);
  const p = await ctx.newPage(), errs = []; p.on('pageerror', e => { errs.push(e.message); console.log('PAGEERR ' + e.message); });
  await p.goto(U + '#ders'); await p.waitForTimeout(1500);
  const ev = (f, a) => p.evaluate(f, a);
  const ac = (t, n) => ev(([t, n]) => { const l = lessonsOf(t).filter(x => x.topicId === 's-' + t + '-' + n)[0]; S.les.track = t; lcSet(lessonKey(l), 'w', t); lrOpen(l, 'notlar'); }, [t, n]);
  const kart = () => ev(() => [...document.querySelectorAll('#view [data-senaryo^="sn-"]')].map(e => e.dataset.senaryo));
  const tasma = () => ev(() => document.documentElement.scrollWidth <= innerWidth + 1);

  // Backend ve Siber ilk 5 ders: kart var; 6. derste yok
  for (const [t, n] of [['bk', 1], ['bk', 2], ['bk', 3], ['bk', 4], ['bk', 5], ['sec', 1], ['sec', 2], ['sec', 3], ['sec', 4], ['sec', 5], ['bk', 6], ['sec', 6]]) {
    await ac(t, n); await p.waitForTimeout(250);
    eq(await kart(), n <= 5 ? ['sn-' + t + '-' + n] : [], t + ' ders ' + n + (n <= 5 ? ': ders sonunda kart var' : ': pilot dışı, kart yok'));
    ok(await tasma(), t + ' ' + n + ': 390 px yatay taşma yok');
  }

  // Bir kartı baştan sona kullan (bk-3)
  await ac('bk', 3); await p.waitForTimeout(250);
  ok(await ev(() => /Not, kapı ya da ustalık sayılmaz/.test(document.querySelector('[data-senaryo-not]').textContent) && /yapay zekâ geri bildirimi yok/.test(document.querySelector('[data-senaryo-not]').textContent)), 'kart: "kapı/not/ustalık sayılmaz" ve "AI geri bildirimi yok" açıkça yazıyor');
  ok(await ev(() => /Elena/.test(document.querySelector('[data-senaryo-belge]').textContent) && /Halden Parts/.test(document.querySelector('[data-senaryo-belge]').textContent)), 'kart: gelen belge (e-posta) görünür');
  eq(await ev(() => [document.querySelectorAll('[data-senaryo-sozluk] li').length, document.querySelectorAll('[data-senaryo-kalip] li').length]), [9, 4], 'kart: mini sözlük (9) ve cümle kalıpları (4) görünür');
  eq(await ev(() => document.querySelectorAll('[data-senaryo-ipucu]').length), 0, 'Türkçe ipucu varsayılan KAPALI');
  await ev(() => document.querySelector('[data-senaryo-tr]').click()); await p.waitForTimeout(150);
  eq(await ev(() => document.querySelectorAll('[data-senaryo-ipucu]').length), 1, 'Türkçe ipucu onay kutusuyla açılır');
  eq(await ev(() => [document.querySelectorAll('[data-senaryo-ornek]').length, document.querySelectorAll('[data-senaryo-sonuc]').length]), [0, 0], 'gönderilmeden örnek cevap ve kavram sonucu GÖRÜNMEZ');
  await ev(() => document.querySelector('[data-senaryo="gonder"]').click()); await p.waitForTimeout(150);
  ok(await ev(() => /en az bir alana yaz/.test(document.querySelector('[data-senaryo-mesaj]').textContent)), 'boş cevap gönderilemez ve nedeni söylenir');
  await p.fill('[data-senaryo-alan="reply"]', 'Hello Elena, the body has single quotes.'); await p.waitForTimeout(100);
  eq(await ev(() => document.querySelector('[data-senaryo-sayac="reply"]').textContent), '7 kelime', 'canlı kelime sayacı');
  await ev(() => document.querySelector('[data-senaryo="yapi"]').click()); await p.waitForTimeout(150);
  ok(await ev(() => /✗ Toplam: 7 kelime \(asgari 40\)/.test(document.querySelector('[data-senaryo-onyapi]').textContent) && !document.querySelector('[data-senaryo-ornek]')), 'ön yapı denetimi eksikliği söyler ama örnek cevabı açmaz');
  ok(await ev(() => document.querySelector('[data-senaryo-alan="reply"]').value.length > 10), 'yazılan metin yapı denetimiyle kaybolmaz');
  await ev(() => document.querySelector('[data-senaryo="gonder"]').click()); await p.waitForTimeout(200);
  eq(await ev(() => [document.querySelectorAll('[data-senaryo-ornek]').length, document.querySelectorAll('[data-senaryo-benim]').length, document.querySelectorAll('[data-senaryo-sonuc]').length]), [1, 1, 1], 'gönderince örnek cevap, kendi cevabın ve denetim sonucu yan yana açılır');
  ok(await ev(() => /doğru\/yanlış hükmü vermez/.test(document.querySelector('[data-senaryo-sonuc]').textContent) && /[Aa]nlamı, doğruluğu ve dilbilgisini değerlendirmez/.test(document.querySelector('[data-senaryo-sonuc]').textContent)), 'denetim dürüst etiketli: anlamı değerlendirmez, hüküm vermez');
  eq(await ev(() => document.querySelector('[data-senaryo-kavram]').dataset.senaryoKavram), '1/4', 'kavram denetimi: "single quotes" 1/4 anahtar kavramı buldu');
  eq(await ev(() => document.querySelectorAll('[data-senaryo-kontrol] input').length), 6, 'öz-karşılaştırma 6 madde');
  await ev(() => document.querySelector('[data-senaryo-madde="2"]').click()); await p.waitForTimeout(150);
  ok(await ev(() => /\(1\/6\)/.test(document.querySelector('[data-senaryo-kontrol] .label').textContent)), 'öz-karşılaştırma işareti sayılır (1/6)');
  ok(await ev(() => document.querySelector('[data-senaryo-alan="reply"]').readOnly), 'gönderilmiş cevap salt okunur (yeniden yaz ile açılır)');
  eq(await ev(() => { const d = JSON.parse(localStorage.ya_pp_ogr); return [d.denemeler.length, d.kanitlar.length, Object.keys(d.tercih.senaryo)]; }), [0, 0, ['sn-bk-3']], 'sayfada: depoda deneme/kanıt yok, kayıt yalnız tercih.senaryo');
  ok(await tasma(), 'sonuç görünümü: 390 px yatay taşma yok');
  // İş yazışmalarım
  eq(await ev(() => document.querySelector('[data-senaryo-liste]').dataset.senaryoListe), '1', 'İş yazışmalarım listesi 1 kayıt gösterir');
  ok(await ev(() => /doğrulanmamış/.test(document.querySelector('[data-senaryo-liste] summary').textContent) && /ders notların ve özel notların dahil edilmez/.test(document.querySelector('[data-senaryo-liste]').textContent)), 'liste "doğrulanmamış" etiketli ve özel notların dahil edilmediğini söyler');
  ok(await ev(() => /Hello Elena/.test(document.querySelector('[data-senaryo-disa]').value) && /doğrulanmamış/.test(document.querySelector('[data-senaryo-disa]').value)), 'dışa aktarma metni yazıyı ve etiketi içerir');
  await ev(() => document.querySelector('[data-senaryo-gizle]').click()); await p.waitForTimeout(150);
  eq(await ev(() => document.querySelector('[data-senaryo-disa]').value.includes('Hello Elena')), false, 'gizle işaretlenince dışa aktarma metninden çıkar');
  // Yeniden yükleme sonrası kalıcılık ve taslak
  await ev(() => document.querySelector('[data-senaryo="yeniden"]').click()); await p.waitForTimeout(150);
  await p.fill('[data-senaryo-alan="reply"]', 'Draft that survives reload with enough words to count.'); await p.locator('[data-senaryo-alan="reply"]').blur(); await p.waitForTimeout(150);
  await p.reload(); await p.waitForTimeout(1500); await ac('bk', 3); await p.waitForTimeout(300);
  eq(await ev(() => document.querySelector('[data-senaryo-alan="reply"]').value), 'Draft that survives reload with enough words to count.', 'taslak yeniden yüklemeden sonra korunur (change olayıyla yerelde saklanır)');
  // Kapı/ustalık etkilenmez
  eq(await ev(() => [PP.ogr.depo.oku().denemeler.length, PP.ogr.depo.oku().kanitlar.length]), [0, 0], 'kart hiçbir deneme ya da kanıt üretmez');

  // Siber kartı: tüm şablon alanları (bug) ve boş alan denetimi
  await ac('sec', 1); await p.waitForTimeout(250);
  eq(await ev(() => [...document.querySelectorAll('[data-senaryo-alan]')].map(e => e.dataset.senaryoAlan)), ['problem', 'cause', 'fix', 'verified', 'next'], 'siber kartı: bug şablonunun 5 başlığı');
  ok(await ev(() => { const k = PP.senaryo.bul('sn-sec-1'); const o = k.ornek; Object.keys(o).forEach(a => { const t = document.querySelector('[data-senaryo-alan="' + a + '"]'); t.value = o[a]; t.dispatchEvent(new Event('input')); t.dispatchEvent(new Event('change')); }); document.querySelector('[data-senaryo="gonder"]').click(); return true; }), 'siber kartına örnek cevap yazılıp gönderildi');
  await p.waitForTimeout(200);
  eq(await ev(() => [document.querySelector('[data-senaryo-kavram]').dataset.senaryoKavram, document.querySelectorAll('[data-senaryo-kavram-ad=yok]').length]), ['5/5', 0], 'siber kartı: örnek cevap 5/5 anahtar kavram');
  eq(await ev(() => document.querySelector('[data-senaryo-liste]').dataset.senaryoListe), '1', 'liste yalnız gönderilmiş cevapları sayar (sec-1; bk-3 yeniden yazılıyor)');
  ok(await tasma(), 'siber kartı: 390 px taşma yok');

  // VA Seviye 0: dersler (3) kart; Seviye 1–2 derslerinde kart yok
  await ev(() => { localStorage.removeItem('ya_pp_ogr'); PP.senaryoUi.sifirlaTaslak(); S.va = null; S.at2.sec = 'va'; goTab('atolye'); }); await p.waitForTimeout(400);
  for (const d of ['va0-1', 'va0-2', 'va0-3', 'va1-1', 'va2-1']) {
    await ev(d => { S.va = null; S.at2.sec = 'va'; goTab('atolye'); document.querySelector('[data-va-ders="' + d + '"]').click(); }, d); await p.waitForTimeout(250);
    eq(await kart(), /^va0/.test(d) ? ['sn-' + d] : [], d + (/^va0/.test(d) ? ': VA dersinde kart var' : ': pilot dışı, kart yok'));
    ok(await tasma(), d + ': 390 px taşma yok');
  }

  // Madde 0a: VA Seviye 0 lab → ortak çubuk (g1–g3)
  await ev(() => { localStorage.removeItem('ya_pp_ogr'); S.va = null; S.at2.sec = 'va'; goTab('atolye'); }); await p.waitForTimeout(300);
  eq(await ev(() => document.querySelectorAll('[data-va=ipucu], [data-va=sifirla]').length), 0, 'eski lab ipucu/sıfırla düğmeleri kalktı');
  for (const g of ['g1', 'g2', 'g3']) {
    eq(await ev(g => [...document.querySelectorAll('[data-va-gorev=' + g + '] .cubuk [role=group] button')].map(x => x.textContent.replace(/\s*\(.*$/, '')), g), ['Kontrol et', 'İpucu', 'Çözümü gör', 'Sıfırla'], 'lab ' + g + ' çubuğu: Kontrol · İpucu · Çözümü gör · Sıfırla');
    for (let i = 1; i <= 3; i++) { await ev(g => document.querySelector('[data-va-gorev=' + g + '] [data-cubuk=ipucu]').click(), g); eq(await ev(g => document.querySelectorAll('[data-va-ipucu=' + g + '] li').length, g), i, 'lab ' + g + ' ipucu kademe ' + i); }
    ok(await ev(g => document.querySelector('[data-va-gorev=' + g + '] [data-cubuk=cozum]').disabled, g), 'lab ' + g + ': çözüm başta kapalı');
  }
  eq(await ev(() => PP_VA.lab.kademe.g1.length + PP_VA.lab.kademe.g2.length + PP_VA.lab.kademe.g3.length), 9, 'her lab görevinde tam 3 kademe ipucu');
  // 3. kademe cevabı doğrudan vermez: görev 2'nin 10 sütun türünü tek tek içermez
  ok(await ev(() => !PP_VA.lab.kademe.g2[2].includes('siparis_id') && !/adet → |birim_fiyat → /.test(PP_VA.lab.kademe.g2[2]) && !PP_VA.lab.kademe.g1[2].includes('odeme_turu')), 'lab 3. kademe ipucu cevabı doğrudan vermez');
  // İki yanlıştan sonra çözüm, onay, çözüm görüldü → ilerleme var, kanıt yok
  await ev(() => { document.querySelector('[data-va=g3]').click(); }); await p.waitForTimeout(100);
  await ev(() => { document.querySelector('[data-va=g3]').click(); }); await p.waitForTimeout(100);
  eq(await ev(() => PP.cubuk.durum('va-lab:g3').yanlis), 2, 'yanlış kontrol çubuğa yanlış deneme olarak yazılır');
  ok(await ev(() => !document.querySelector('[data-va-gorev=g3] [data-cubuk=cozum]').disabled), '2 yanlıştan sonra lab çözümü açılır');
  await ev(() => document.querySelector('[data-va-gorev=g3] [data-cubuk=cozum]').click()); await p.waitForTimeout(100);
  await ev(() => document.querySelector('[data-va-gorev=g3] [data-cubuk=cozum]').click()); await p.waitForTimeout(150);
  ok(await ev(() => PP.cubuk.durum('va-lab:g3').cozum && /Desteklemez/.test(document.querySelector('[data-cubuk-cozum="va-lab:g3"]').textContent)), 'lab çözümü onaydan sonra görünür ve "çözüm görüldü" kaydedilir');
  await ev(() => { PP_VA.lab.gorev3.forEach(i => document.querySelector('[data-va-ifade="' + i.id + ':' + i.destekler + '"]').click()); }); await p.waitForTimeout(100);
  await ev(() => document.querySelector('[data-va=g3]').click()); await p.waitForTimeout(200);
  eq(await ev(() => { const d = PP.va.durum().lab[2]; return [d.tamam, d.cozum]; }), [true, true], 'çözüm görülen görev ilerleme olarak kayıtlı ama "çözüm görüldü" işaretli');
  eq(await ev(() => PP.ogr.depo.oku().kanitlar.filter(k => /^lab-va0/.test(k.id)).length), 0, 'çözüm görülen lab görevi KANIT yazmaz');
  ok(await ev(() => /çözüm görüldü; kanıt sayılmaz/.test(document.querySelector('[data-va-gorev=g3] .label').textContent)), 'lab başlığı çözüm görüldüğünü söyler');
  // Çözüm görülmeyen görev kanıt yazar
  await ev(() => { ['k1:sehir', 'k1:adet', 'k1:birim_fiyat', 'k2:musteri_id', 'k3:odeme_turu', 'k3:iade'].forEach(x => document.querySelector('[data-va-sut="' + x + '"]').click()); }); await p.waitForTimeout(100);
  await ev(() => document.querySelector('[data-va=g1]').click()); await p.waitForTimeout(200);
  eq(await ev(() => PP.ogr.depo.oku().kanitlar.filter(k => /^lab-va0-g1/.test(k.id)).length), 1, 'çözüm görülmeyen lab görevi kanıt yazar (ipucu kullanıldıysa -ipucu kimliğiyle)');
  ok(await tasma(), 'VA lab: 390 px taşma yok');

  // Madde 0b: Parsons "Sıra alıştırması" + ortak çözüm durumu
  await ev(() => { localStorage.removeItem('ya_pp_ogr'); S.va = null; S.at2.sec = 'va'; goTab('atolye'); document.querySelector('[data-va-ders="va2-2"]').click(); }); await p.waitForTimeout(400);
  eq(await ev(() => [...document.querySelectorAll('[data-alan-sira] > .label')].map(e => e.textContent)), ['Sıra alıştırması'], 'Parsons ayrı "Sıra alıştırması" başlığıyla gösterilir');
  ok(await ev(() => !!document.querySelector('[data-alan="va2-2-sql"] [data-alan-sira] [data-parsons="p-va2-2"]')), 'Parsons, SQL alan panelinin içinde ama ayrı kutuda');
  eq(await ev(() => document.querySelectorAll('[data-alan-tur]').length), await ev(() => PP_VA.alanlar.filter(a => a.ders === 'va2-2').length), 'Parsons alan sayısını değiştirmez');
  eq(await ev(() => [...document.querySelectorAll('[data-alan="va2-2-sql"] [data-alan-sira-durum]')].map(e => e.textContent)), ['Bu dersin SQL çalışması · Kod alanı: henüz çözülmedi · Sıra alıştırması: henüz çözülmedi', 'Bu dersin SQL çalışması · Kod alanı: henüz çözülmedi · Sıra alıştırması: henüz çözülmedi'], 'ortak durum satırı iki yerde (kod alanı ve Sıra alıştırması) aynı metni gösterir');
  const dogru = await ev(() => PP.parsons.bul('p-va2-2').dogru);
  for (const m of dogru) await ev(m => { const li = [...document.querySelectorAll('[data-parsons="p-va2-2"] [data-parsons-havuz]')].find(x => x.querySelector('code').textContent === m); li.querySelector('button').click(); }, m);
  await ev(() => document.querySelector('[data-parsons-kontrol="p-va2-2"]').click()); await p.waitForTimeout(200);
  eq(await ev(() => [...document.querySelectorAll('[data-alan="va2-2-sql"] [data-alan-sira-durum]')].map(e => /Sıra alıştırması: çözüldü ✓/.test(e.textContent) && /Kod alanı: henüz çözülmedi/.test(e.textContent))), [true, true], 'Parsons çözülünce durum iki satırda da güncellenir (kod alanı hâlâ çözülmedi)');
  await ev(() => { PP.cubuk.yanlis('alan:va2-2-sql'); PP.cubuk.yanlis('alan:va2-2-sql'); PP.cubuk.cozumGor('alan:va2-2-sql'); }); await p.waitForTimeout(150);
  ok(await ev(() => [...document.querySelectorAll('[data-alan="va2-2-sql"] [data-alan-sira-durum]')].every(e => /Kod alanı: çözüm görüldü \(kanıt sayılmaz\)/.test(e.textContent))), 'kod alanında çözüm görülünce durum iki satırda da "çözüm görüldü" olur');
  ok(await tasma(), 'VA SQL ders: 390 px taşma yok');

  ok(errs.length === 0, 'sayfa hatası yok ' + errs.join('|'));
  await b.close();
  console.log(fails ? fails + ' HATA' : 'hepsi geçti'); process.exit(fails ? 1 : 0);
})();

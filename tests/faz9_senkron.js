// Faz 9 (1/2): senkron motoru (kuyruk, çevrimdışı, kesilen istek, çakışma), cihaz yalıtımı, güven merkezi mantığı — sahte arka uç ve sahte depo.
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

  // Sahte depo + sahte arka uç (sürümlü sunucu) sayfa içinde kurulur
  await ev(() => {
    window.SahteDepo = function () { var m = {}; return { getItem: k => (k in m ? m[k] : null), setItem: (k, v) => { m[k] = String(v); }, removeItem: k => { delete m[k]; }, key: i => Object.keys(m)[i] || null, get length() { return Object.keys(m).length; }, _m: m }; };
    window.SahteSunucu = function () {
      var s = { satir: {}, cagri: [], ag: false, red: null, t: 0 };
      s.sira = () => { s.t++; return '2026-10-12T00:00:' + String(10 + s.t).padStart(2, '0') + 'Z'; };
      var gonder = (k) => {
        s.cagri.push(k.path + '|' + k.tur + '|' + JSON.stringify(k.data));
        if (s.ag) { var e = new Error('Failed to fetch'); e.ag = true; throw e; }
        if (s.red) return { red: true, mesaj: s.red };
        var var_ = s.satir[k.path];
        if (k.tur === 'delete') { if (var_ && k.taban != null && var_.updated_at !== k.taban) return { cakisma: true, sunucu: JSON.parse(JSON.stringify(var_)) }; delete s.satir[k.path]; return { ok: true }; }
        if (k.taban == null ? !!var_ : !var_ || var_.updated_at !== k.taban) return { cakisma: true, sunucu: var_ ? JSON.parse(JSON.stringify(var_)) : null };
        s.satir[k.path] = { data: JSON.parse(JSON.stringify(k.data)), updated_at: s.sira() };
        return { ok: true };
      };
      s.arka = { yaz: k => Promise.resolve().then(() => gonder(k)), sil: k => Promise.resolve().then(() => gonder(Object.assign({}, k, { tur: 'delete' }))) };
      return s;
    };
  });

  // ---- 1) Çevrimdışı yazma kuyruğa girer, kalıcıdır; çevrimiçi olunca bir kez gönderilir
  const R1 = await ev(async () => {
    const d = SahteDepo(), sv = SahteSunucu(), o = {};
    let m = PP.sync.Motor({ depo: d, uid: 'A', arka: sv.arka });
    sv.ag = true;
    m.ekle({ path: 'data/users/A/pp/notes/n1', coll: 'data/users/A/pp/notes', id: 'n1', tur: 'set', data: { t: 'bir' }, taban: null });
    await m.isle();
    o.cevrimdisi = m.durum();
    const m2 = PP.sync.Motor({ depo: d, uid: 'A', arka: sv.arka });   // sayfa yenilendi: kuyruk kalıcı
    o.kalici = m2.durum().bekleyen;
    sv.ag = false; sv.cagri.length = 0;
    await m2.isle();
    o.sonra = m2.durum(); o.cagri = sv.cagri.slice(); o.satir = sv.satir['data/users/A/pp/notes/n1'] && sv.satir['data/users/A/pp/notes/n1'].data;
    await m2.isle(); o.tekrarCagri = sv.cagri.length;
    return o;
  });
  eq([R1.cevrimdisi.cevrimici, R1.cevrimdisi.bekleyen, R1.cevrimdisi.son], [false, 1, 'cevrimdisi'], 'çevrimdışı: yazma bekliyor, durum "çevrimdışı"');
  eq(R1.kalici, 1, 'kuyruk sayfa yenilemesinden sonra kalıcı');
  eq([R1.sonra.bekleyen, R1.sonra.cakisma, R1.sonra.hata, R1.sonra.son], [0, 0, 0, 'basarili'], 'yeniden bağlanınca gönderildi: durum başarılı');
  eq([R1.cagri.length, R1.satir], [1, { t: 'bir' }], 'tek gönderim, sunucuda doğru veri');
  eq(R1.tekrarCagri, 1, 'kuyruk boşken yeniden çalışınca çift gönderim yok');

  // ---- 2) Aynı yola bekleyen yazmalar birleşir; sıra korunur; kesilen istek kalanları bozmaz
  const R2 = await ev(async () => {
    const d = SahteDepo(), sv = SahteSunucu(), o = {};
    const m = PP.sync.Motor({ depo: d, uid: 'A', arka: sv.arka });
    const e = (id, t, taban) => m.ekle({ path: 'c/' + id, coll: 'c', id, tur: 'set', data: { t }, taban: taban || null });
    e('x', 'v1'); e('x', 'v2'); e('y', 'y1'); e('z', 'z1');
    o.birlesti = m.liste().map(k => [k.id, k.data.t]);
    let n = 0; const gercek = sv.arka.yaz;
    sv.arka.yaz = k => { n++; return n === 2 ? Promise.reject(Object.assign(new Error('Failed to fetch'), { ag: true })) : gercek(k); };   // 2. istek yolda kesilir
    await m.isle();
    o.kesilince = { sunucuda: Object.keys(sv.satir), kuyrukta: m.liste().map(k => k.id), bekleyen: m.durum().bekleyen };
    sv.arka.yaz = gercek; sv.cagri.length = 0;
    await m.isle();
    o.sonunda = { sunucuda: Object.keys(sv.satir).sort(), kuyruk: m.liste().length, cagri: sv.cagri.map(c => c.split('|')[0]) };
    return o;
  });
  eq(R2.birlesti, [['x', 'v2'], ['y', 'y1'], ['z', 'z1']], 'aynı yola iki yazma tek kayıtta birleşti (son değer)');
  eq(R2.kesilince, { sunucuda: ['c/x'], kuyrukta: ['y', 'z'], bekleyen: 2 }, 'kesilen istek: önceki gitti, kalanlar bekliyor');
  eq(R2.sonunda, { sunucuda: ['c/x', 'c/y', 'c/z'], kuyruk: 0, cagri: ['c/y', 'c/z'] }, 'bağlanınca yalnız kalanlar gönderildi, sıra korundu');

  // ---- 3) Çakışma: sunucu bizden sonra değişmişse SESSİZ ÜZERİNE YAZMA YOK, iki sürüm saklanır, kullanıcı seçer
  const R3 = await ev(async () => {
    const d = SahteDepo(), sv = SahteSunucu(), o = {};
    sv.satir['p/d'] = { data: { t: 'v0' }, updated_at: 'V1' };
    const m = PP.sync.Motor({ depo: d, uid: 'A', arka: sv.arka });
    // başka cihaz sunucuyu V2 yaptı; bu cihaz taban V1 ile yazıyor
    sv.satir['p/d'] = { data: { t: 'baska-cihaz' }, updated_at: 'V2' };
    m.ekle({ path: 'p/d', coll: 'p', id: 'd', tur: 'update', data: { t: 'benim' }, taban: 'V1' });
    await m.isle();
    o.durum = m.durum(); o.sunucuDegismedi = sv.satir['p/d'].data.t; o.kayit = m.liste()[0];
    o.benimSaklandi = o.kayit.data.t; o.sunucuSaklandi = o.kayit.sunucu && o.kayit.sunucu.data.t;
    // "benim" → sunucu sürümü taban, yeniden gönder
    m.coz(o.kayit.n, 'benim'); await m.isle();
    o.benimSonra = { sunucu: sv.satir['p/d'].data.t, kuyruk: m.liste().length };
    // ikinci çakışma, bu kez "sunucu"
    sv.satir['p/e'] = { data: { t: 's0' }, updated_at: 'W1' };
    m.ekle({ path: 'p/e', coll: 'p', id: 'e', tur: 'update', data: { t: 'benim2' }, taban: 'W0' });
    await m.isle();
    const k2 = m.liste()[0], r = m.coz(k2.n, 'sunucu');
    o.sunucuSecimi = { sunucuVeri: r.sunucu.data.t, sunucuSatiri: sv.satir['p/e'].data.t, kuyruk: m.liste().length };
    // olmayan satıra taban'lı yazma (başka cihaz sildi) → çakışma, sessiz yeniden oluşturma yok
    m.ekle({ path: 'p/f', coll: 'p', id: 'f', tur: 'update', data: { t: 'x' }, taban: 'Z1' });
    await m.isle();
    o.silinmis = { durum: m.durum().cakisma, satirVar: !!sv.satir['p/f'] };
    // yeni belge ama sunucuda zaten var → çakışma
    sv.satir['p/g'] = { data: { t: 'var' }, updated_at: 'G1' };
    m.ekle({ path: 'p/g', coll: 'p', id: 'g', tur: 'set', data: { t: 'yeni' }, taban: null });
    await m.isle();
    o.zatenVar = { sunucu: sv.satir['p/g'].data.t };
    return o;
  });
  eq([R3.durum.cakisma, R3.durum.bekleyen, R3.durum.son], [1, 0, 'sorun'], 'çakışma görünür: 1 çakışma');
  eq([R3.sunucuDegismedi, R3.benimSaklandi, R3.sunucuSaklandi], ['baska-cihaz', 'benim', 'baska-cihaz'], 'çakışmada sunucu verisi ezilmedi, iki sürüm de saklı');
  eq(R3.benimSonra, { sunucu: 'benim', kuyruk: 0 }, '"benimkini koru": yalnız kullanıcı seçince yazılır');
  eq(R3.sunucuSecimi, { sunucuVeri: 's0', sunucuSatiri: 's0', kuyruk: 0 }, '"sunucudakini al": benimki atılır, sunucu verisi döner, kuyruk boşalır');
  eq(R3.silinmis, { durum: 1, satirVar: false }, 'başka cihazda silinmiş belgeye yazma çakışma sayılır, sessizce yeniden oluşturulmaz');
  eq(R3.zatenVar.sunucu, 'var', 'yeni belge ama sunucuda var: ezilmedi');

  // ---- 4) Sunucu reddi (yetki vb.) kullanıcıya görünür, sessizce atılmaz; yeniden dene / at
  const R4 = await ev(async () => {
    const d = SahteDepo(), sv = SahteSunucu(), o = {};
    const m = PP.sync.Motor({ depo: d, uid: 'A', arka: sv.arka });
    sv.red = 'RLS reddetti';
    m.ekle({ path: 'q/a', coll: 'q', id: 'a', tur: 'set', data: { t: 1 }, taban: null });
    await m.isle();
    o.hata = m.durum(); o.mesaj = m.liste()[0].mesaj;
    sv.red = null;
    const n = m.liste()[0].n; m.hataIsle(n, 'yeniden'); await m.isle();
    o.sonra = { kuyruk: m.liste().length, satir: !!sv.satir['q/a'] };
    sv.red = 'tekrar red'; m.ekle({ path: 'q/b', coll: 'q', id: 'b', tur: 'set', data: { t: 2 }, taban: null }); await m.isle();
    m.hataIsle(m.liste()[0].n, 'at'); o.atildi = m.liste().length;
    return o;
  });
  eq([R4.hata.hata, R4.hata.bekleyen, R4.mesaj], [1, 0, 'RLS reddetti'], 'sunucu reddi "hata" olarak görünür, nedeniyle');
  eq(R4.sonra, { kuyruk: 0, satir: true }, 'yeniden dene → gönderildi');
  eq(R4.atildi, 0, '"at" kaydı kaldırır (yalnız kullanıcı eylemiyle)');

  // ---- 5) Kullanıcılar arası yalıtım
  const R5 = await ev(async () => {
    const d = SahteDepo(), sv = SahteSunucu();
    const a = PP.sync.Motor({ depo: d, uid: 'A', arka: sv.arka }), bb = PP.sync.Motor({ depo: d, uid: 'B', arka: sv.arka });
    sv.ag = true;
    a.ekle({ path: 'c/a1', coll: 'c', id: 'a1', tur: 'set', data: { gizli: 'A-VERISI' }, taban: null }); await a.isle();
    const o = { bGorur: bb.liste().length, bDepo: JSON.stringify(d._m).indexOf('A-VERISI') >= 0 && Object.keys(d._m).filter(k => k === 'pp_kuyruk:B').length };
    bb.temizle(); o.aYerinde = a.liste().length;
    a.temizle(); o.aTemiz = a.liste().length;
    return o;
  });
  eq([R5.bGorur, R5.aYerinde, R5.aTemiz], [0, 1, 0], 'B kullanıcısı A kuyruğunu görmez; B temizlemesi A\'ya dokunmaz; A temizleyince gider');

  // ---- 6) Cihaz yalıtımı (paylaşılan cihaz)
  const R6 = await ev(() => {
    const d = SahteDepo(), o = {};
    d.setItem('ya_pp_ogr', 'A-ILERLEME'); d.setItem('ya_lc', 'A-LC'); d.setItem('baska', 'dokunma');
    o.ilk = PP.cihaz.gec('A', d);                              // sahipsiz veri ilk girene atanır
    o.ilkVeri = d.getItem('ya_pp_ogr');
    o.ayni = PP.cihaz.gec('A', d).degisti;
    o.b = PP.cihaz.gec('B', d);                                // başka hesap: A'nın verisi ayrılır
    o.bGorur = [d.getItem('ya_pp_ogr'), d.getItem('ya_lc')];
    d.setItem('ya_pp_ogr', 'B-ILERLEME');
    o.geri = PP.cihaz.gec('A', d);                             // A döner: kendi verisi geri gelir, B'nin ayrılır
    o.aVeri = [d.getItem('ya_pp_ogr'), d.getItem('ya_lc')];
    o.stashB = !!d.getItem('pp_stash:B') && JSON.parse(d.getItem('pp_stash:B')).ya_pp_ogr;
    o.baska = d.getItem('baska');
    return o;
  });
  eq([R6.ilk.degisti, R6.ilk.sahipsizAtandi, R6.ilkVeri, R6.ayni], [false, true, 'A-ILERLEME', false], 'sahipsiz ilk veri ilk giren hesaba atanır; aynı hesap değişiklik yapmaz');
  eq([R6.b.degisti, R6.bGorur], [true, [null, null]], 'başka hesap girince önceki kullanıcının yerel verisi aktif alandan çıkar');
  eq([R6.geri.degisti, R6.geri.geriYuklenen, R6.aVeri], [true, true, ['A-ILERLEME', 'A-LC']], 'A dönünce kendi verisi geri gelir (veri kaybı yok)');
  eq([R6.stashB, R6.baska], ['B-ILERLEME', 'dokunma'], 'B\'nin verisi kendi saklasında; ya_ dışı anahtarlara dokunulmaz');
  const R6b = await ev(() => {
    const d = SahteDepo(); d.setItem('ya_pp_ogr', 'X'); d.setItem('pp_aktif_uid', 'A'); d.setItem('pp_kuyruk:A', '[{"n":1}]'); d.setItem('pp_kuyruk:B', '[{"n":2}]'); d.setItem('pp_stash:A', '{}');
    const o = { kapali: PP.cihaz.cikis('A', d), veri: d.getItem('ya_pp_ogr'), bek: PP.cihaz.bekleyenSayisi('A', d) };
    PP.cihaz.paylasilan(true, d);
    o.acik = PP.cihaz.cikis('A', d); o.kalan = Object.keys(d._m).sort();
    return o;
  });
  eq([R6b.kapali.temizlendi, R6b.veri, R6b.bek], [false, 'X', 1], 'paylaşılan cihaz modu kapalıyken çıkış veriyi silmez; bekleyen değişiklik sayısı görünür');
  eq([R6b.acik.temizlendi, R6b.kalan], [true, ['pp_kuyruk:B', 'pp_paylasilan_cihaz']], 'paylaşılan cihaz modu: çıkışta yalnız bu hesabın verisi/kuyruğu silinir, başka hesabın kuyruğu kalır');

  // ---- 7) Güven merkezi mantığı: dışa aktarma, silme (sahte depoda) onay kapıları
  const R7 = await ev(() => {
    const d = SahteDepo(); d.setItem('ya_pp_ogr', '{"v":1}'); d.setItem('ya_nt', 'not'); d.setItem('baska', 'x'); d.setItem('pp_kuyruk:A', '[1]');
    const o = {};
    const dx = JSON.parse(PP.guven.disaAktar(d, 'A'));
    o.disa = [Object.keys(dx.anahtarlar).sort(), dx.kuyruk, /sunucu kayıtları dahil değil/.test(dx.kapsam)];
    o.ozet = PP.guven.kayitOzeti(d).map(x => x.anahtar);
    o.onaysiz = PP.guven.sil({ kapsam: 'yerel' }, d, 'A');
    o.oneri = PP.guven.sil({ kapsam: 'yerel', onay: true }, d, 'A');
    o.sunucu = PP.guven.sil({ kapsam: 'sunucu', onay: true, disaAktarmaOnerisiGoruldu: true }, d, 'A');
    o.hicSilinmedi = d.length;
    o.ok = PP.guven.sil({ kapsam: 'yerel', onay: true, disaAktarmaOnerisiGoruldu: true }, d, 'A');
    o.kalan = Object.keys(d._m).sort();
    return o;
  });
  eq(R7.disa, [['ya_nt', 'ya_pp_ogr'], '[1]', true], 'dışa aktarma yerel ya_* verisini ve kuyruğu içerir, kapsamı dürüstçe yazar');
  eq(R7.ozet, ['ya_nt', 'ya_pp_ogr'], 'kayıt özeti yalnız ya_* alanlarını listeler');
  eq([R7.onaysiz.neden, R7.oneri.neden, R7.sunucu.neden, R7.hicSilinmedi], ['onay-gerekli', 'disa-aktarma-onerisi-gerekli', 'kapsam-desteklenmiyor', 4], 'silme: onay + dışa aktarma önerisi olmadan hiçbir şey silinmez; sunucu silme desteklenmez');
  eq([R7.ok.ok, R7.ok.silinen, R7.kalan], [true, 2, ['baska']], 'onaylı silme yalnız yerel ya_* alanlarını ve bu hesabın kuyruğunu siler');
  const metinler = await ev(() => JSON.stringify([PP.guven.ENVANTER, PP.guven.TURLER, PP.guven.SINIRLAR]));
  ok(!/şifrelenir|tamamen güvenli|kimse göremez|garanti ederiz|%100/i.test(metinler) && /şifresiz/.test(metinler) && /okuyabilir/.test(metinler), 'güven metinlerinde vaat edilemeyen garanti yok; sınırlar dürüstçe yazılı');
  eq(await ev(() => PP.guven.aiVerisi().gider), false, 'sağlayıcı kapalıyken AI\'ya veri gitmediği yazılır');
  await ev(() => PP.koc.tercihYaz('saglayici', 'acik'));
  const ai = await ev(() => PP.guven.aiVerisi());
  ok(ai.gider === true && /Cevap anahtarları/.test(ai.metin) && /açık sınav sırasında hiçbir şey gönderilmez/.test(ai.metin), 'sağlayıcı açıkken neyin gittiği ve gitmediği yazılır');
  await ev(() => PP.koc.tercihSifirla());

  // ---- 8) Arayüz: Ayarlar'da Güven merkezi; silme akışı (gerçek tarayıcı deposu, test verisi)
  await ev(() => { localStorage.setItem('ya_test_alan', 'deneme'); goTab('ayar'); });
  await p.waitForTimeout(400);
  ok(await ev(() => !!document.querySelector('#view [data-gvn=panel]')), 'Ayarlar sekmesinde Güven merkezi');
  ok(await ev(() => /Harici yapay zekâ sağlayıcısı kapalı/.test(document.querySelector('[data-gvn=ai]').textContent) && /kapalı/.test(document.querySelector('[data-gvn=portfolyo]').textContent)), 'AI verisi ve portfolyo görünürlüğü yazılı');
  ok(await ev(() => document.querySelectorAll('[data-gvn=sinirlar] li').length === 4), 'sınırlar listesi görünür');
  await ev(() => document.querySelector('[data-gvn=sil]').click()); await p.waitForTimeout(200);
  ok(await ev(() => !!document.querySelector('[data-gvn=sil-onay]') && /Geri alınamaz/.test(document.querySelector('[data-gvn=sil-onay]').textContent)), 'silme etkisi ve geri alınamazlık onay ekranında');
  await ev(() => document.querySelector('[data-gvn=sil-evet]').click()); await p.waitForTimeout(200);
  ok(await ev(() => /önce dışa aktarma önerisini gördüğünü işaretle/.test(document.querySelector('[data-gvn=msg]').textContent)) && await ev(() => localStorage.getItem('ya_test_alan') === 'deneme'), 'onay kutusu işaretlenmeden silme reddedilir, veri duruyor');
  await ev(() => document.querySelector('[data-gvn=disa]').click()); await p.waitForTimeout(300);
  ok(await ev(() => localStorage.getItem('ya_test_alan') === 'deneme'), 'dışa aktarma veriyi silmez');
  await ev(() => { document.querySelector('[data-gvn=sil]') && document.querySelector('[data-gvn=sil]').click(); }); await p.waitForTimeout(200);
  await ev(() => { const c = document.querySelector('[data-gvn=goruldu]'); c.checked = true; c.dispatchEvent(new Event('change')); });
  await ev(() => { window.__reload = 0; }); // sayfa yeniden yüklenecek; yalnız veri silinmesini doğrula
  await p.evaluate(() => { window.addEventListener('beforeunload', () => {}); });
  await ev(() => document.querySelector('[data-gvn=sil-evet]').click());
  await p.waitForTimeout(150);
  eq(await ev(() => localStorage.getItem('ya_test_alan')), null, 'onay + öneri görüldü işaretiyle bu cihazdaki yerel veri silindi');
  await p.waitForTimeout(1500);
  ok(errs.length === 0, 'sayfa hatası yok ' + errs.join('|'));
  await b.close();
  console.log(fails ? '\nKALDI: ' + fails : '\nGEÇTİ');
  process.exit(fails ? 1 : 0);
})();

// Faz 10 tur 2: PP.alan (uygulama alanı) — SQL (sql.js/WASM), Python (Pyodide), JS (izole işçi), simülatör; zaman sınırı, ağ kilidi,
// SRI/ağ hatası/çevrimdışı dürüst mesajları, kanıt kaydı, arayüz (390 px + masaüstü). Beklenenler veri setinden BAĞIMSIZ elle hesaplandı.
// Gerçek çalıştırma jsDelivr'den kütüphane indirir; ağ yoksa o bölümler "ATLANDI" yazılır (geçti sayılmaz, sayılır).
const path = require('path');
const { INIT, chromium } = require('./stub.js');
const U = require('url').pathToFileURL(path.join(__dirname, '..', 'index.html')).href;
let fails = 0, atlandi = 0;
const ok = (c, m) => { console.log((c ? 'OK    ' : 'HATA  ') + m); if (!c) fails++; };
const eq = (a, b, m) => { const s = JSON.stringify(a) === JSON.stringify(b); ok(s, m + (s ? '' : '  → beklenen ' + JSON.stringify(b) + ', gelen ' + JSON.stringify(a))); };

(async () => {
  const b = await chromium.launch();
  const yeni = async (w, ek) => {
    const ctx = await b.newContext({ viewport: { width: w, height: 844 } });
    await ctx.addInitScript('window.__guest=true'); await ctx.addInitScript(INIT); if (ek) await ek(ctx);
    const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.goto(U + '#atolye'); await p.waitForTimeout(1200); return { ctx, p, errs };
  };
  const { p, errs } = await yeni(390);
  const ev = (f, a) => p.evaluate(f, a);
  const D = (id, kod, o) => ev(async ([id, kod, o]) => { const d = PP.alan.bul(id) || PP.alan.tanimla(Object.assign({}, PP_VA.alanlar.find(a => a.id === id), { veri: PP_VA.veri })).alan; const r = await PP.alan.degerlendir(d, kod, o || {}); return { ok: r.ok, calisti: r.calisti, dogru: r.dogru, neden: r.neden, mesaj: r.mesaj }; }, [id, kod, o]);

  // 1) Tanım doğrulama (ağsız)
  const tanimlar = await ev(() => {
    const kk = () => ({ dogru: true, mesaj: '' }), v = PP_VA.veri, base = { id: 'x', ders: 'd', tur: 'sql', baslangic: '', kontrol: kk, veri: v };
    const t = o => PP.alan.tanimla(Object.assign({}, base, o)).neden || 'ok';
    return [t({}), t({ id: '' }), t({ ders: '' }), t({ tur: 'cobol' }), t({ baslangic: null }), t({ kontrol: null }), t({ veri: null }), t({ varyant: 5 }), PP.alan.tanimla(null).neden, PP.alan.ETIKET];
  });
  eq(tanimlar.slice(0, 9), ['ok', 'id-yok', 'ders-yok', 'tur-gecersiz', 'baslangic-yok', 'kontrol-yok', 'veri-yok', 'varyant-gecersiz', 'tanim-yok'], 'tanımlama: geçersiz tanımlar nedenle reddedilir');
  ok(/^gerçek çalışır/.test(tanimlar[9].sql) && /^gerçek çalışır/.test(tanimlar[9].python) && /^simülasyon/.test(tanimlar[9].sim), 'etiketler dürüst: çalışan = "gerçek çalışır", sim = "simülasyon"');
  eq(await ev(() => PP_VA.alanlar.filter(a => a.id.startsWith('va0-')).map(a => a.id + ':' + a.tur)), ['va0-1-sql:sql', 'va0-1-py:python', 'va0-2-sql:sql', 'va0-2-py:python', 'va0-3-sql:sql', 'va0-3-py:python'], '3 ders × (SQL + Python) alan tanımı');
  ok(await ev(() => PP_VA.alanlar.every(a => !/cevap|anahtar|beklenen/i.test(Object.keys(a).join(',')) && a.kontrol.length === 2)), 'alan tanımlarında sabit cevap alanı yok; kontrol (sonuç, veri) alır');
  // Bağımsız beklenenler (elle sayım: iade evet = S003, S007; indirim boş = S007; 12 satır, 12 benzersiz id)
  const ham = await ev(() => PP_VA.veri.satirlar.map(r => r.join('|')).join('\n'));
  const L = ham.split('\n').map(s => s.split('|'));
  eq([L.filter(r => r[9] === 'evet').length, L.filter(r => r[7] === '').map(r => r[0]), L.length, new Set(L.map(r => r[0])).size], [2, ['S007'], 12, 12], 'bağımsız sayım: iade 2, boş indirim [S007], 12 satır / 12 benzersiz');

  // 2) Gerçek SQL ve Python
  const agVar = await ev(async () => { try { const r = await fetch('https://cdn.jsdelivr.net/npm/sql.js@1.10.3/dist/sql-wasm.js', { method: 'HEAD', mode: 'cors' }); return r.ok; } catch (e) { return false; } });
  if (!agVar) { atlandi++; console.log('ATLANDI  ağ yok: gerçek SQL/Python çalıştırma testleri yapılmadı (test edilmedi)'); }
  else {
    let r = await D('va0-1-sql', "SELECT COUNT(*) FROM siparis WHERE iade = 'evet';");
    ok(r.ok && r.calisti && r.dogru === true, 'SQL gerçekten çalışır: iade sayısı doğru kabul edilir ' + JSON.stringify(r));
    r = await D('va0-1-sql', "SELECT COUNT(*) FROM siparis WHERE iade = 'hayır';"); ok(r.ok && r.dogru === false, 'SQL: yanlış sorgu reddedilir (10 ≠ 2)');
    r = await D('va0-1-sql', 'SELECT 2;'); ok(r.ok && r.dogru === false && /değiştirilmiş veride/.test(r.mesaj), 'SQL: sabit "SELECT 2" gerçek veride doğru görünür ama varyant veride reddedilir');
    r = await D('va0-1-sql', 'SELEKT *'); ok(r.ok === false && r.calisti === true && r.dogru === false && /syntax|SELEKT/i.test(r.mesaj), 'SQL: sözdizimi hatası öğrenciye gösterilir ' + r.mesaj);
    r = await D('va0-2-sql', 'SELECT siparis_id FROM siparis WHERE indirim_orani IS NULL;'); ok(r.dogru === true, 'SQL: boş (NULL) hücre sorgusu doğru');
    r = await D('va0-2-sql', 'SELECT siparis_id FROM siparis WHERE indirim_orani = 0;'); ok(r.dogru === false, 'SQL: NULL ile 0 karıştırılırsa reddedilir');
    r = await D('va0-3-sql', 'SELECT COUNT(*), COUNT(DISTINCT siparis_id) FROM siparis;'); ok(r.dogru === true, 'SQL: toplam + benzersiz sayısı doğru');
    r = await D('va0-3-sql', 'SELECT 12, 12;'); ok(r.dogru === false, 'SQL: sabit [12,12] tekrarlı varyantta reddedilir');
    r = await D('va0-1-sql', 'WITH RECURSIVE t(x) AS (SELECT 1 UNION ALL SELECT x+1 FROM t) SELECT COUNT(*) FROM t;', { zamanMs: 1500 });
    ok(r.ok === false && r.neden === 'zaman' && r.calisti === true && /Zaman sınırı/.test(r.mesaj), 'SQL: sonsuz özyineleme zaman sınırında kesilir');
    r = await D('va0-1-sql', "SELECT COUNT(*) FROM siparis WHERE iade = 'evet';"); ok(r.dogru === true, 'SQL: kesilmeden sonra işçi yeniden kurulur ve çalışır');
    r = await D('va0-1-py', "sonuc = len([s for s in siparisler if s['iade'] == 'evet'])");
    ok(r.ok && r.calisti && r.dogru === true, 'Python (Pyodide) gerçekten çalışır: iade sayısı doğru ' + JSON.stringify(r));
    r = await D('va0-1-py', 'sonuc = 2'); ok(r.dogru === false && /değiştirilmiş veride/.test(r.mesaj), 'Python: sabit değer varyant veride reddedilir');
    r = await D('va0-1-py', 'sonuc = ('); ok(r.ok === false && r.calisti === true && r.dogru === false && /Syntax/i.test(r.mesaj), 'Python: sözdizimi hatası gösterilir ' + r.mesaj);
    r = await D('va0-1-py', 'x = 1'); ok(r.ok && r.dogru === false && /Bulduğun/.test(r.mesaj), 'Python: sonuc tanımsızsa reddedilir');
    r = await D('va0-2-py', "sonuc = [s['siparis_id'] for s in siparisler if s['indirim_orani'] is None]"); ok(r.dogru === true, 'Python: None kontrolü doğru');
    r = await D('va0-3-py', "ids = [s['siparis_id'] for s in siparisler]\nsonuc = [len(ids), len(set(ids))]"); ok(r.dogru === true, 'Python: toplam + benzersiz doğru');
    r = await D('va0-1-py', 'while True:\n    pass', { zamanMs: 1500 }); ok(r.ok === false && r.neden === 'zaman' && /Zaman sınırı/.test(r.mesaj), 'Python: sonsuz döngü zaman sınırında kesilir');
    r = await D('va0-1-py', "sonuc = len([s for s in siparisler if s['iade'] == 'evet'])"); ok(r.dogru === true, 'Python: kesilmeden sonra yeniden kurulup çalışır');
    const kil = await ev(async () => { const d = PP.alan.tanimla({ id: 'kilit-py', ders: 'x', tur: 'python', baslangic: '', veri: PP_VA.veri, kontrol: s => ({ dogru: true, mesaj: JSON.stringify(s.deger) }) }).alan; const r = await PP.alan.degerlendir(d, "import js\nsonuc = [str(getattr(js, 'fetch', None)), str(getattr(js, 'XMLHttpRequest', None)), str(getattr(js, 'importScripts', None))]"); return r.mesaj; });
    ok(/\["(None|undefined)","(None|undefined)","(None|undefined)"\]/.test(kil), 'Python: çalıştırma sırasında fetch/XHR/importScripts kapalı ' + kil);
  }

  // 3) JS (izole işçi) — ağsız çalışır
  const jsd = await ev(async () => {
    const d = PP.alan.tanimla({ id: 'js1', ders: 'x', tur: 'js', baslangic: '', veri: PP_VA.veri, kontrol: s => ({ dogru: s.deger === 12, mesaj: String(s.cikti) }) }).alan;
    const a = await PP.alan.degerlendir(d, 'console.log("merhaba"); return veri.satirlar.length;');
    const sinsiz = await PP.alan.degerlendir(d, 'while(true){}', { zamanMs: 800 });
    const net = await PP.alan.degerlendir(PP.alan.tanimla({ id: 'js2', ders: 'x', tur: 'js', baslangic: '', veri: PP_VA.veri, kontrol: s => ({ dogru: true, mesaj: JSON.stringify(s.deger) }) }).alan,
      'return [typeof fetch, typeof XMLHttpRequest, typeof WebSocket, typeof importScripts, typeof indexedDB, typeof Worker, typeof Object.getPrototypeOf(self).fetch, typeof document, typeof localStorage];');
    const hata = await PP.alan.degerlendir(d, 'throw new Error("elle")');
    return { a: [a.ok, a.dogru, a.mesaj], sinsiz: [sinsiz.ok, sinsiz.neden], net: net.mesaj, hata: [hata.ok, hata.calisti, hata.mesaj] };
  });
  eq(jsd.a, [true, true, 'merhaba'], 'JS işçi: kod çalışır, console.log yakalanır, kontrol geçer');
  eq(jsd.sinsiz, [false, 'zaman'], 'JS işçi: sonsuz döngü kesilir');
  eq(JSON.parse(jsd.net), Array(9).fill('undefined'), 'JS işçi: ağ/depo/DOM API\'leri erişilemez (fetch, XHR, WebSocket, importScripts, indexedDB, Worker, prototip fetch, document, localStorage)');
  eq(jsd.hata, [false, true, 'elle'], 'JS işçi: fırlatılan hata öğrenciye gösterilir');

  // 4) Simülatör türü: kod çalışmaz, etiket "simülasyon"
  const sim = await ev(async () => { const t = PP.alan.tanimla(PP_VA.alanSim).alan; const a = await PP.alan.degerlendir(t, 'Cevap: 2'), b2 = await PP.alan.degerlendir(t, 'Cevap: 7'); return [a.calisti, a.dogru, b2.dogru, t.etiket]; });
  eq(sim.slice(0, 3), [false, true, false], 'simülatör: kod çalıştırılmaz (calisti=false), kural kontrolü doğru/yanlış ayırır');
  ok(/^simülasyon/.test(sim[3]), 'simülatör etiketi "simülasyon"');

  // 5) SRI hatası / çevrimdışı / CDN engelli: dürüst mesaj, çökme yok
  if (agVar) {
    const sri = await ev(async () => { PP.alan.kapat(); const k = PP.alan.KAYNAK.sql.js.sri; PP.alan.KAYNAK.sql.js.sri = 'sha384-' + 'A'.repeat(64); const r = await PP.alan.degerlendir(PP.alan.bul('va0-1-sql'), 'SELECT 1', { yuklemeMs: 20000 }); PP.alan.KAYNAK.sql.js.sri = k; PP.alan.kapat(); return [r.ok, r.calisti, r.neden, r.mesaj]; });
    ok(sri[0] === false && sri[1] === false && sri[2] === 'sri' && /SRI|Bütünlük/.test(sri[3]), 'SRI uyuşmazlığı: çalıştırılmaz, dürüst hata ' + sri[3]);
  } else { atlandi++; console.log('ATLANDI  SRI testi (ağ yok)'); }
  const off = await ev(async () => { PP.alan.kapat(); Object.defineProperty(navigator, 'onLine', { value: false, configurable: true }); const r = await PP.alan.degerlendir(PP.alan.bul('va0-1-py'), 'sonuc = 1'); delete navigator.onLine; return [r.ok, r.calisti, r.neden, r.mesaj]; });
  ok(off[0] === false && off[1] === false && off[2] === 'cevrimdisi' && /Çevrimdışı/.test(off[3]) && /simülasyon/.test(off[3]), 'çevrimdışı: anlaşılır mesaj ve simülasyona yönlendirme');
  const eng = await yeni(390, async c => { await c.route(/cdn\.jsdelivr\.net/, r => r.abort()); });
  const engr = await eng.p.evaluate(async () => { const d = PP.alan.tanimla(Object.assign({}, PP_VA.alanlar[0], { veri: PP_VA.veri })).alan; const r = await PP.alan.degerlendir(d, 'SELECT 1', { yuklemeMs: 20000 }); return [r.ok, r.calisti, r.neden, r.mesaj]; });
  ok(engr[0] === false && engr[1] === false && engr[2] === 'ag' && /kullanılamıyor/.test(engr[3]), 'CDN engelli: "gerçek çalıştırma kullanılamıyor" mesajı (çökme yok) ' + engr[3]);
  ok(eng.errs.length === 0, 'CDN engelliyken sayfa hatası yok ' + eng.errs.join('|'));
  await eng.ctx.close();

  // 6) Arayüz: Atölye > Veri Analitiği > ders 1; 390 px
  await ev(() => { localStorage.removeItem('ya_pp_ogr'); S.va = null; S.at2.sec = 'va'; goTab('atolye'); }); await p.waitForTimeout(300);
  await ev(() => document.querySelector('[data-va-ders="va0-1"]').click()); await p.waitForTimeout(300);
  eq(await ev(() => [...document.querySelectorAll('[data-alan-tur]')].map(e => e.dataset.alan + ':' + e.dataset.alanTur)), ['va0-1-sql:sql', 'va0-1-py:python'], 'ders 1: SQL + Python alanı görünür');
  ok(await ev(() => /gerçek çalışır/.test(document.querySelector('[data-alan-etiket="va0-1-sql"]').textContent) && /Kodla dene \(0\/2/.test(document.querySelector('[data-va-alanlar]').textContent)), 'UI: "gerçek çalışır" etiketi ve 0/2 çözüldü');
  if (agVar) {
    await ev(() => { document.querySelector('[data-alan-kod="va0-1-sql"]').value = "SELECT COUNT(*) FROM siparis WHERE iade = 'evet';"; document.querySelector('[data-alan="va0-1-sql"] [data-alan=calistir]').click(); });
    await p.waitForSelector('[data-alan-kontrol]', { timeout: 30000 });
    ok(await ev(() => document.querySelector('[data-alan-kontrol]').dataset.alanKontrol === 'dogru' && !!document.querySelector('[data-alan-tablo]') && /Kanıt kaydedildi/.test(document.querySelector('[data-alan-sonuc="va0-1-sql"]').textContent)), 'UI: SQL sonucu canlı tablo + ✓ Doğru + kanıt');
    eq(await ev(() => { const d = PP.ogr.depo.oku(); return [d.kanitlar.filter(k => k.id === 'alan-va0-1-sql').length, (d.kanitlar.find(k => k.id === 'alan-va0-1-sql') || {}).tur, PP.va.durum().alanlar.filter(a => a.tamam).map(a => a.id)]; }), [1, 'lab', ['va0-1-sql']], 'UI: kanıt (lab, istemci) ve çözüm kaydı tek');
    await ev(() => { document.querySelector('[data-alan-kod="va0-1-py"]').value = 'while True: pass'; document.querySelector('[data-alan="va0-1-py"] [data-alan=calistir]').click(); });
    await p.waitForFunction(() => /Zaman sınırı|kullanılamıyor/.test(document.querySelector('[data-alan-sonuc="va0-1-py"]').textContent), null, { timeout: 120000 });
    ok(await ev(() => /Zaman sınırı/.test(document.querySelector('[data-alan-sonuc="va0-1-py"]').textContent)), 'UI: Python sonsuz döngüsü kullanıcıya "Zaman sınırı" olarak bildirilir');
    await ev(() => { document.querySelector('[data-alan-kod="va0-1-sql"]').value = 'SELEKT'; document.querySelector('[data-alan="va0-1-sql"] [data-alan=calistir]').click(); });
    await p.waitForSelector('[data-alan-sonuc="va0-1-sql"] [data-alan-durum=hata]', { timeout: 20000 });
    ok(await ev(() => /syntax/i.test(document.querySelector('[data-alan-sonuc="va0-1-sql"]').textContent) && !/kullanılamıyor/.test(document.querySelector('[data-alan-etiket="va0-1-sql"]').textContent)), 'UI: SQL hatası öğrenciye gösterilir, etiket "gerçek çalışır" kalır');
    await ev(() => { document.querySelector('[data-alan="va0-1-sql"] [data-alan=ipucu]').click(); });
    ok(await ev(() => document.querySelector('[data-alan-ipucu="va0-1-sql"]').style.display !== 'none'), 'UI: ipucu açılır');
    await ev(() => { document.querySelector('[data-alan="va0-1-sql"] [data-alan=sifirla]').click(); });
    ok(await ev(() => /LIMIT 5/.test(document.querySelector('[data-alan-kod="va0-1-sql"]').value) && document.querySelector('[data-alan-ipucu="va0-1-sql"]').style.display === 'none'), 'UI: sıfırla başlangıç kodunu geri getirir');
    await ev(() => { document.querySelector('[data-alan-kod="va0-1-sql"]').value = 'benim kodum'; document.querySelector('[data-va=okudum]').click(); }); await p.waitForTimeout(300);
    ok(await ev(() => document.querySelector('[data-alan-kod="va0-1-sql"]').value === 'benim kodum'), 'UI: yeniden çizimde yazılan kod kaybolmaz');
  }
  ok(await ev(() => document.documentElement.scrollWidth <= innerWidth + 1), '390 px: yatay taşma yok');
  ok(await ev(() => [...document.querySelectorAll('[data-alan-kod]')].every(t => t.getBoundingClientRect().right <= innerWidth + 1)), '390 px: alan metin kutuları ekrana sığar');
  ok(errs.length === 0, 'sayfa hatası yok ' + errs.join('|'));
  await ev(() => PP.alan.kapat());
  // 7) Masaüstü
  const m = await yeni(1280);
  await m.p.evaluate(() => { S.va = null; S.at2.sec = 'va'; goTab('atolye'); }); await m.p.waitForTimeout(300);
  await m.p.evaluate(() => document.querySelector('[data-va-ders="va0-3"]').click()); await m.p.waitForTimeout(300);
  ok(await m.p.evaluate(() => document.querySelectorAll('[data-alan-tur]').length === 2 && document.documentElement.scrollWidth <= innerWidth + 1), 'masaüstü: ders 3 iki alan, taşma yok');
  ok(m.errs.length === 0, 'masaüstü sayfa hatası yok'); await m.ctx.close();
  await b.close();
  console.log((fails ? '\nKALDI: ' + fails : '\nGEÇTİ') + (atlandi ? ' (ATLANAN bölüm: ' + atlandi + ' — ağ yok)' : ''));
  process.exit(fails ? 1 : 0);
})();

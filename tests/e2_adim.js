// E2: Python adım izi (sys.settrace, Pyodide işçisi) + sw.js kabuk listesi.
// Motor: gerçek Pyodide ile beklenen adım dizileri ELLE türetildi (kod okunarak), sınırlar (300 adım, 80 karakter, süre), hata, ağ kilidi, işçinin sonradan sağlam kalması.
// Arayüz: ileri/geri/kaydırıcı/klavye/Esc, editörde satır vurgusu, kod değişince kapanma, 390 px, CDN yoksa dürüst mesaj, izleme kapalıyken Çalıştır davranışı aynı.
// Gerçek çalıştırma jsDelivr'den Pyodide indirir; ağ yoksa o bölümler "ATLANDI" yazılır (geçti sayılmaz).
const path = require('path'), fs = require('fs'), http = require('http');
const { INIT, chromium } = require('./stub.js');
const KOK = path.join(__dirname, '..');
let fails = 0, atlandi = 0;
const ok = (c, m) => { console.log((c ? 'OK    ' : 'HATA  ') + m); if (!c) fails++; };
const eq = (a, b, m) => { const s = JSON.stringify(a) === JSON.stringify(b); ok(s, m + (s ? '' : '  → beklenen ' + JSON.stringify(b) + ', gelen ' + JSON.stringify(a))); };
const TUR = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.json': 'application/json', '.webmanifest': 'application/manifest+json' };
const oku = f => fs.readFileSync(path.join(KOK, f), 'utf8');

(async () => {
  // 0) Statik denetimler (ağsız)
  const sw = oku('sw.js'), alanJs = oku('js/ders/alan.js');
  const cmDosya = /dosya: "([^"]+)"/.exec(alanJs)[1];
  ok(sw.includes('new URL("' + cmDosya + '", self.location)'), 'sw.js: kod editörü paketi (' + cmDosya + ') kabuk listesinde, alan.js CM.dosya ile aynı ad');
  ok(/var SURUM = "(\d{4}-\d{2}-\d{2}-\d+)"/.test(sw) && !/var SURUM = "2026-10-12-1"/.test(sw), 'sw.js: SURUM artırıldı (eski önbellek kurulumda temizlenir)');
  const adimlilar = [];
  const b = await chromium.launch();
  const sunucu = http.createServer((q, r) => {
    const p = path.join(KOK, decodeURIComponent(q.url.split('?')[0]).replace(/^\/+/, '') || 'index.html');
    if (!p.startsWith(KOK) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { r.writeHead(404); return r.end(); }
    r.writeHead(200, { 'content-type': TUR[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(r);
  });
  await new Promise(c => sunucu.listen(0, '127.0.0.1', c));
  const taban = 'http://127.0.0.1:' + sunucu.address().port + '/';
  const ac = async (w, ek, renk) => {
    const ctx = await b.newContext({ viewport: { width: w, height: 844 }, colorScheme: renk || 'light' });
    await ctx.addInitScript('window.__guest=true'); await ctx.addInitScript(INIT); if (ek) await ek(ctx);
    const p = await ctx.newPage(), errs = [];
    p.on('pageerror', e => errs.push(e.message));
    await p.goto(taban + 'index.html#atolye'); await p.waitForTimeout(1200);
    await p.evaluate(() => { localStorage.removeItem('ya_pp_ogr'); S.va = null; S.at2.sec = 'va'; goTab('atolye'); }); await p.waitForTimeout(300);
    return { ctx, p, errs };
  };

  const A = await ac(390);
  const p = A.p, ev = (f, a) => p.evaluate(f, a);

  // 1) Tanım / içerik (ağsız)
  const tan = await ev(() => {
    const ad = PP_VA.alanlar.filter(a => a.tur === 'python' && typeof a.adimla === 'string' && a.adimla);
    return { ids: ad.map(a => a.id), kisa: ad.every(a => a.adimla.length <= 200 && /Adım adım göster/.test(a.adimla)), sinir: [PP.alan.SINIR.adim, PP.alan.SINIR.deger, PP.alan.SINIR.izleMs],
      kopya: PP.alan.tanimla(Object.assign({}, PP_VA.alanlar.find(a => a.id === 'va2-5-py'), { veri: PP_VA.veri })).alan.adimla, sqlYok: PP_VA.alanlar.filter(a => a.tur !== 'python').every(a => !a.adimla),
      tur: null };
  });
  ok(tan.ids.length >= 3, 'en az 3 Python alanında "adım adım" önerisi var: ' + tan.ids.join(', '));
  ok(['va2-5-py', 'va2-8-py', 'va2-4-py'].every(i => tan.ids.includes(i)), 'öneri: döngü (va2-5), işlev (va2-8), liste (va2-4) alıştırmalarında');
  ok(tan.kisa && tan.sqlYok, 'öneri metinleri kısa (≤200 karakter), Türkçe ve düğmeyi anıyor; SQL/JS/sim alanlarında yok');
  eq(tan.sinir, [300, 80, 3000], 'sınırlar: 300 adım, değer 80 karakter, Python içi süre 3 sn');
  ok(typeof tan.kopya === 'string' && tan.kopya.length > 0, 'tanimla: adimla alanı korunur');
  const tur = await ev(async () => { const r = await PP.alan.izle({ tur: 'sql' }, 'SELECT 1'); return [r.ok, r.calisti, r.neden]; });
  eq(tur, [false, false, 'tur'], 'izle: yalnız Python (SQL alanında "tur" reddi)');

  // 2) Motor: gerçek Pyodide
  const agVar = await ev(async () => { try { const r = await fetch('https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js', { method: 'HEAD', mode: 'cors' }); return r.ok; } catch (e) { return false; } });
  const T = (kod, o) => ev(async ([kod, o]) => { const r = await PP.alan.izle({ tur: 'python', veri: PP_VA.veri }, kod, o || {}); return r; }, [kod, o]);
  const ozet = r => r.adimlar.map(a => [a.s, a.r ? 'R' : '', a.v]);
  if (!agVar) { atlandi++; console.log('ATLANDI  ağ yok: gerçek Pyodide adım izi testleri yapılmadı (test edilmedi)'); }
  else {
    // 2a) döngü: toplam=0; for i in range(3): toplam += i; print. Elle: satır olayları 1,2,3,2,3,2,3,2,4 + program dönüşü; değerler "satırdan önceki" durumdur.
    let r = await T('toplam = 0\nfor i in range(3):\n    toplam += i\nprint(toplam)');
    eq(ozet(r), [[1, '', {}], [2, '', { toplam: '0' }], [3, '', { toplam: '0', i: '0' }], [2, '', { toplam: '0', i: '0' }], [3, '', { toplam: '0', i: '1' }], [2, '', { toplam: '1', i: '1' }],
      [3, '', { toplam: '1', i: '2' }], [2, '', { toplam: '3', i: '2' }], [4, '', { toplam: '3', i: '2' }], [4, 'R', { toplam: '3', i: '2' }]], 'döngü: adım sırası ve değişken değerleri elle türetilenle aynı');
    eq([r.ok, r.hata, r.kesildi, r.cikti, r.adimlar[8].o, r.adimlar[9].o], [true, null, null, '3\n', 0, 2], 'döngü: çıktı "3", yalnız print satırından sonra görünür (ofset 0 → 2)');
    ok(r.adimlar.every(a => a.y.length === 1 && a.y[0] === 'ana program'), 'döngü: çağrı yığını yalnız "ana program"');
    // 2b) işlev: iki çağrı; çağrı yığını ve dönüş değerleri (3*3=9, 4*4=16, toplam 25)
    r = await T('def kare(x):\n    return x * x\n\nsonuc = kare(3) + kare(4)');
    eq(r.adimlar.map(a => [a.s, a.y.join('>'), a.r ? 'R' : '', a.g === undefined ? null : a.g]), [[1, 'ana program', '', null], [4, 'ana program', '', null], [2, 'ana program>kare', '', null], [2, 'ana program>kare', 'R', '9'],
      [2, 'ana program>kare', '', null], [2, 'ana program>kare', 'R', '16'], [4, 'ana program', 'R', null]], 'işlev: çağrı yığını (ana program>kare) ve dönüş değerleri 9 ve 16');
    eq([r.adimlar[2].v, r.adimlar[4].v, r.adimlar[6].v], [{ x: '3' }, { x: '4' }, { kare: 'fonksiyon kare', sonuc: '25' }], 'işlev: yerel x her çağrıda ayrı; son durumda sonuc = 25, işlev "fonksiyon kare" diye gösterilir');
    // 2c) liste/yinelenen yapı kısaltma ve değer uzunluğu
    r = await T("liste = list(range(100))\ns = 'a' * 500\nd = {i: i for i in range(50)}\nic = [[[1, 2, [3, [4, [5]]]]]]");
    const son = r.adimlar[r.adimlar.length - 1].v;
    ok(Object.values(son).every(x => x.length <= 80), 'kısaltma: hiçbir değer metni 80 karakteri aşmaz ' + JSON.stringify(son));
    ok(/\.\.\./.test(son.liste) && /^\[0, 1, 2/.test(son.liste) && !/99/.test(son.liste), 'kısaltma: 100 elemanlı liste "[0, 1, 2, ...]" biçiminde özetlenir');
    ok(/\.\.\./.test(son.ic), 'kısaltma: derin iç içe yapı özetlenir ' + son.ic);
    // 2d) adım sınırı: 1000 turluk döngü 300 adımda kesilir, ok kalır, işlev sonradan çalışır
    r = await T('for i in range(1000):\n    x = i');
    eq([r.ok, r.adimlar.length, r.kesildi, r.hata], [true, 300, 'adim', null], 'sınır: 1000 turluk döngü tam 300 adımda kesilir (kesildi = "adim")');
    r = await T('while True:\n    pass');
    eq([r.ok, r.adimlar.length, r.kesildi], [true, 300, 'adim'], 'sınır: sonsuz döngü (Python satırları) adım sınırında durur, işçi kesilmez');
    // 2e) süre sınırı (Python içi): SINIR.izleMs kısaltılır; 200 tur × 10 ms uyku > 300 ms
    r = await ev(async () => { PP.alan.SINIR.izleMs = 300; try { return await PP.alan.izle({ tur: 'python', veri: PP_VA.veri }, 'import time\nfor i in range(200):\n    time.sleep(0.01)'); } finally { PP.alan.SINIR.izleMs = 3000; } });
    ok(r.ok && r.kesildi === 'sure' && r.adimlar.length > 3 && r.adimlar.length < 300, 'sınır: süre aşımı "sure" ile kesilir, o ana kadarki adımlar döner (' + r.adimlar.length + ' adım)');
    // 2f) işçi zaman sınırı son çare: C düzeyinde uzun işlem satır olayı üretmez; işçi sonlandırılır, sonra yeniden kurulup çalışır
    r = await T('x = sum(range(10**11))', { zamanMs: 1500 });
    ok(r.ok === false && r.neden === 'zaman' && r.calisti === true && /Zaman sınırı/.test(r.mesaj), 'sınır: satır olayı üretmeyen uzun işlem işçi zaman sınırıyla kesilir ' + r.mesaj);
    r = await T('a = 1\nb = a + 1');
    eq([r.ok, r.adimlar.length, r.adimlar[2].v], [true, 3, { a: '1', b: '2' }], 'kesilmeden sonra işçi yeniden kurulur ve izleme çalışır');
    // 2g) hata: yürütme durur, hataya kadarki adımlar ve hata bilgisi döner; hata dönüş adımı SAHTE "Program biter" üretmez
    r = await T('x = 1\ny = x / 0\nz = 2');
    eq([r.ok, ozet(r), r.hata], [true, [[1, '', {}], [2, '', { x: '1' }]], { tur: 'ZeroDivisionError', ileti: 'division by zero', satir: 2 }], 'hata: satır 2\'de ZeroDivisionError; satır 3 hiç izlenmez, sahte dönüş adımı yok');
    r = await T('def f():\n    return 1 / 0\nf()');
    eq([r.hata.tur, r.hata.satir, r.adimlar.some(a => a.r)], ['ZeroDivisionError', 2, false], 'hata: işlev içinden yayılan hata; hiçbir dönüş adımı eklenmez');
    r = await T('try:\n    y = 1 / 0\nexcept ZeroDivisionError:\n    y = -1\nz = y');
    eq([r.hata, r.adimlar.filter(a => a.r).length, r.adimlar[r.adimlar.length - 1].v], [null, 1, { y: '-1', z: '-1' }], 'hata: kodun kendi yakaladığı hata normal akıştır (hata yok, tek dönüş adımı)');
    r = await T('sonuc = (');
    eq([r.ok, r.adimlar.length, r.hata.tur, r.hata.satir], [true, 0, 'SyntaxError', 1], 'hata: sözdizimi hatası adım üretmeden bildirilir');
    r = await T('print("a")\nraise SystemExit');
    eq([r.ok, r.hata, r.cikti], [true, null, 'a\n'], 'exit/SystemExit hata sayılmaz');
    // 2h) güvenlik / yalıtım
    r = await T("import js\nprint(str(getattr(js, 'fetch', None)), str(getattr(js, 'XMLHttpRequest', None)), str(getattr(js, 'importScripts', None)))");
    ok(/^(None|undefined) (None|undefined) (None|undefined)\n$/.test(r.cikti), 'yalıtım: adım izinde de fetch/XHR/importScripts kapalı ' + JSON.stringify(r.cikti));
    r = await T('print(sutunlar[0], len(siparisler))');
    ok(r.ok && /^siparis_id 12\n$/.test(r.cikti), 'veri: siparisler/sutunlar aynı kurulumla gelir (çıktı: ' + JSON.stringify(r.cikti) + ')');
    r = await T('x = 1');
    ok(!('siparisler' in r.adimlar[r.adimlar.length - 1].v) && !('tablolar' in r.adimlar[r.adimlar.length - 1].v), 'tablo: enjekte edilen veri adları (siparisler, tablolar) değişkenler tablosunu doldurmaz');
    r = await T('import sys\nsys.settrace(None)\nx = 1\ny = 2');
    ok(r.ok && r.adimlar.length >= 1 && r.adimlar.length < 5, 'kod izlemeyi kapatsa bile işçi çökmez, sonuç döner (' + r.adimlar.length + ' adım)');
    r = await T('while True:\n    try:\n        while True:\n            pass\n    except BaseException:\n        pass', { zamanMs: 1500 });
    ok(r.ok === false && r.neden === 'zaman', 'kod sınır istisnasını yutsa bile (sonsuz döngü) işçi zaman sınırı son çare olarak keser (' + r.neden + ')');
    r = await T('def ' + 'f'.repeat(500) + '(n):\n    return n\n' + 'f'.repeat(500) + '(1)');
    ok(r.ok && r.adimlar.every(a => a.y.every(x => x.length <= 40) && a.y.length <= 20), 'yığın adları 40 karakter, yığın en çok 20 çerçeve ile sınırlı');
    // 2i) izleme sonrası normal çalıştırıcı bozulmaz: iz kapalı, doğru çözüm geçer, sabit değer varyantta reddedilir
    const norm = await ev(async () => {
      await PP.alan.izle({ tur: 'python', veri: PP_VA.veri }, 'for i in range(5):\n    pass');
      const g1 = await PP.alan.calistir('python', 'import sys\nsonuc = sys.gettrace() is None', PP_VA.veri);
      const d = PP.alan.bul('va0-1-py') || PP.alan.tanimla(Object.assign({}, PP_VA.alanlar.find(a => a.id === 'va0-1-py'), { veri: PP_VA.veri })).alan;
      const dogru = await PP.alan.degerlendir(d, "sonuc = len([s for s in siparisler if s['iade'] == 'evet'])");
      const sabit = await PP.alan.degerlendir(d, 'sonuc = 2');
      return [g1.deger, dogru.dogru, sabit.dogru];
    });
    eq(norm, [true, true, false], 'izleme sonrası: sys.gettrace() None, doğru çözüm geçer, sabit değer reddedilir (mevcut çalıştırıcı aynı)');
  }

  // 3) Arayüz (390 px, SRI'li editör yüklenir)
  await ev(() => document.querySelector('[data-va-ders="va0-1"]').click()); await p.waitForTimeout(300);
  ok(await ev(() => !document.querySelector('[data-alan="va0-1-sql"] [data-alan=adimla]') && !!document.querySelector('[data-alan="va0-1-py"] [data-alan=adimla]')), 'UI: "Adım adım göster" yalnız Python alanında');
  if (!agVar) { atlandi++; console.log('ATLANDI  ağ yok: arayüz adım izi testleri yapılmadı'); }
  else {
    await p.waitForSelector('[data-alan="va0-1-py"] .cm-editor', { timeout: 15000 });
    const kod = 'toplam = 0\nfor i in range(3):\n    toplam += i\nprint(toplam)';
    await ev(k => { document.querySelector('[data-alan-kod="va0-1-py"]').value = k; }, kod);
    const BTN = '[data-alan="va0-1-py"] [data-alan=adimla]', PAN = '[data-alan="va0-1-py"] [data-alan-izle-panel]';
    await p.click(BTN); await p.waitForSelector(PAN, { timeout: 120000 });
    const txt = s => ev(s => (document.querySelector('[data-alan="va0-1-py"] [data-izle=' + s + ']') || {}).textContent, s);
    eq(await txt('baslik'), 'Adım 1 / 10 · satır 1', 'UI: panel açıldı, "Adım 1 / 10 · satır 1"');
    ok(/^1: toplam = 0$/.test(await txt('satir')) && /henüz çalışmadı/.test(await txt('not')), 'UI: geçerli satır metni ve "henüz çalışmadı" açıklaması');
    ok(await ev(() => document.activeElement === document.querySelector('[data-alan="va0-1-py"] [data-izle=ileri]')), 'UI: odak İleri düğmesine geçer (klavyeyle hemen adımlanır)');
    await p.click('[data-alan="va0-1-py"] [data-izle=ileri]'); await p.click('[data-alan="va0-1-py"] [data-izle=ileri]');
    eq(await txt('baslik'), 'Adım 3 / 10 · satır 3', 'UI: İleri iki kez → adım 3, satır 3');
    eq(await ev(() => [...document.querySelectorAll('[data-alan="va0-1-py"] [data-izle-degisken]')].map(e => e.dataset.izleDegisken + '=' + e.lastChild.textContent + (e.classList.contains('izle-yeni') ? '*' : ''))), ['toplam=0', 'i=0*'], 'UI: değişkenler tablosu (i bu adımda yeni, * ile işaretli)');
    ok(await ev(() => /^● i$/.test(document.querySelector('[data-izle-degisken=i] td').textContent)), 'UI: değişen değişken yalnız renkle değil "●" işaretiyle de ayırt edilir');
    // editörde satır vurgusu
    const vur = () => ev(() => [...document.querySelectorAll('[data-alan="va0-1-py"] .cm-line.pp-izle-satir')].map(e => e.textContent));
    eq(await vur(), ['    toplam += i'], 'UI: editörde geçerli satır (3) vurgulu, başka satır vurgulu değil');
    await p.click('[data-alan="va0-1-py"] [data-izle=geri]');
    eq([await txt('baslik'), await vur()], ['Adım 2 / 10 · satır 2', ['for i in range(3):']], 'UI: Geri → vurgu satır 2\'ye taşınır');
    // kaydırıcı
    await ev(() => { const k = document.querySelector('[data-alan="va0-1-py"] [data-izle=kaydirici]'); k.value = '10'; k.dispatchEvent(new Event('input', { bubbles: true })); });
    ok(/^Adım 10 \/ 10/.test(await txt('baslik')) && /3\n/.test(await txt('cikti')) && /Program biter/.test(await txt('not')), 'UI: kaydırıcı son adıma götürür; çıktı "3" ve "Program biter" görünür');
    ok(await ev(() => document.querySelector('[data-alan="va0-1-py"] [data-izle=cikti]').style.display !== 'none'), 'UI: çıktı kutusu çıktı olunca görünür');
    await p.click('[data-alan="va0-1-py"] [data-izle=kaydirici]'); await p.keyboard.press('Home');
    ok(/^Adım 1 \/ 10/.test(await txt('baslik')), 'UI: kaydırıcı klavyeyle de çalışır (Home → adım 1)');
    ok(await ev(() => getComputedStyle(document.querySelector('[data-alan="va0-1-py"] [data-izle=cikti]')).display === 'none'), 'UI: ilk adımda çıktı kutusu gizli (henüz print yok)');
    // klavye: İleri'ye odak + ArrowRight
    await p.focus('[data-alan="va0-1-py"] [data-izle=ileri]'); await p.keyboard.press('ArrowRight');
    ok(/^Adım 2 \/ 10/.test(await txt('baslik')), 'UI: ArrowRight adım atar');
    await p.keyboard.press('ArrowLeft');
    ok(/^Adım 1 \/ 10/.test(await txt('baslik')), 'UI: ArrowLeft geri adım atar');
    // 390 px
    const g390 = await ev(() => { const k = document.querySelector('[data-alan="va0-1-py"] [data-alan-izle-panel]').getBoundingClientRect(); return [document.documentElement.scrollWidth <= innerWidth + 1, k.right <= innerWidth + 1, k.left >= 0, [...document.querySelectorAll('[data-alan="va0-1-py"] [data-izle=geri],[data-alan="va0-1-py"] [data-izle=ileri],[data-alan="va0-1-py"] [data-izle=kapat],[data-alan="va0-1-py"] [data-alan=adimla]')].every(e => e.getBoundingClientRect().height >= 40)]; });
    eq(g390, [true, true, true, true], '390 px: yatay taşma yok, panel ekrana sığar, düğmeler ≥40 px yüksek');
    // Esc kapatır, odak düğmeye döner, vurgu temizlenir
    await p.keyboard.press('Escape');
    ok(await ev(() => !document.querySelector('[data-alan-izle-panel]') && document.activeElement === document.querySelector('[data-alan="va0-1-py"] [data-alan=adimla]') && !document.querySelector('.cm-line.pp-izle-satir')), 'UI: Esc paneli kapatır, odak "Adım adım göster" düğmesine döner, vurgu kalkar');
    // kod değişince kapanır
    await p.click(BTN); await p.waitForSelector(PAN, { timeout: 30000 });
    await p.click('[data-alan="va0-1-py"] .cm-content'); await p.keyboard.press('End'); await p.keyboard.type(' ');
    await p.waitForTimeout(150);
    ok(await ev(() => !document.querySelector('[data-alan-izle-panel]') && !document.querySelector('.cm-line.pp-izle-satir')), 'UI: kod düzenlenince eski iz kapanır (artık kodla uyuşmaz)');
    // Sıfırla kapatır
    await p.click(BTN); await p.waitForSelector(PAN, { timeout: 30000 });
    await p.click('[data-alan="va0-1-py"] [data-alan=sifirla]');
    ok(await ev(() => !document.querySelector('[data-alan-izle-panel]')), 'UI: Sıfırla izi kapatır');
    // hata: Türkçe, panel yok
    await ev(() => { document.querySelector('[data-alan-kod="va0-1-py"]').value = 'x = (\ny = 2'; });
    await p.click(BTN); await p.waitForSelector('[data-alan-izle="va0-1-py"] [data-izle-durum=hata]', { timeout: 30000 });
    const mh = await ev(() => document.querySelector('[data-alan-izle="va0-1-py"]').textContent);
    ok(/Sözdizimi hatası/.test(mh) && /Önce düzelt/.test(mh) && await ev(() => !document.querySelector('[data-alan-izle-panel]')), 'UI: sözdizimi hatası anlaşılır Türkçe mesajla, panel açılmadan ' + mh);
    await ev(() => { document.querySelector('[data-alan-kod="va0-1-py"]').value = 'x = 1\ny = x / 0'; });
    await p.click(BTN); await p.waitForSelector(PAN, { timeout: 30000 });
    ok(await ev(() => /Satır 2: Sıfıra bölme \(ZeroDivisionError\)/.test(document.querySelector('[data-izle=uyari]').textContent)), 'UI: çalışma hatası panelde Türkçe uyarı olarak (ZeroDivisionError → "Sıfıra bölme")');
    await p.keyboard.press('Escape');
    // sınır uyarısı
    await ev(() => { document.querySelector('[data-alan-kod="va0-1-py"]').value = 'for i in range(1000):\n    x = i'; });
    await p.click(BTN); await p.waitForSelector(PAN, { timeout: 30000 });
    ok(await ev(() => /en fazla 300 adımla sınırlı/.test(document.querySelector('[data-izle=uyari]').textContent) && /\/ 300 /.test(document.querySelector('[data-izle=baslik]').textContent)), 'UI: 300 adım sınırı kullanıcıya söylenir');
    await p.keyboard.press('Escape');
    // izleme kapalıyken mevcut davranış: Çalıştır doğru çözümü kanıtlar
    await ev(() => { document.querySelector('[data-alan-kod="va0-1-py"]').value = "sonuc = len([s for s in siparisler if s['iade'] == 'evet'])"; document.querySelector('[data-alan="va0-1-py"] [data-alan=calistir]').click(); });
    await p.waitForSelector('[data-alan="va0-1-py"] [data-alan-kontrol]', { timeout: 60000 });
    ok(await ev(() => document.querySelector('[data-alan="va0-1-py"] [data-alan-kontrol]').dataset.alanKontrol === 'dogru' && !document.querySelector('[data-alan-izle-panel]')), 'UI: iz kullanıldıktan sonra Çalıştır aynı şekilde çalışır (✓ Doğru)');
    ok(A.errs.length === 0, 'sayfa hatası yok ' + A.errs.join('|'));
  }
  // öneri metni arayüzde
  await ev(() => { S.va = null; S.at2.sec = 'va'; goTab('atolye'); }); await p.waitForTimeout(300);
  const lessonVar = await ev(() => !!document.querySelector('[data-va-ders="va2-5"]'));
  if (lessonVar) {
    await ev(() => document.querySelector('[data-va-ders="va2-5"]').click()); await p.waitForTimeout(400);
    ok(await ev(() => /Adım adım göster/.test((document.querySelector('[data-alan-adimla="va2-5-py"]') || {}).textContent || '')), 'UI: va2-5 (döngü) Python alanında "Öneri: …" metni görünür');
  } else { atlandi++; console.log('ATLANDI  va2-5 dersi bu görünümde tıklanamıyor; öneri metni arayüzde doğrulanmadı'); }
  await A.ctx.close();

  // 4) CDN yoksa: dürüst mesaj, çökme yok
  const E = await ac(390, async c => { await c.route(/cdn\.jsdelivr\.net/, r => r.abort()); });
  await E.p.evaluate(() => document.querySelector('[data-va-ders="va0-1"]').click()); await E.p.waitForTimeout(300);
  await E.p.click('[data-alan="va0-1-py"] [data-alan=adimla]');
  await E.p.waitForSelector('[data-alan-izle="va0-1-py"] [data-izle-durum=kullanilamiyor]', { timeout: 130000 });
  const em = await E.p.evaluate(() => document.querySelector('[data-alan-izle="va0-1-py"]').textContent);
  ok(/Adım adım gösterim şu an kullanılamıyor/.test(em) && /tekrar dene/.test(em) && !/Gerçek çalıştırma/.test(em), 'CDN engelli: "Adım adım gösterim şu an kullanılamıyor" (Türkçe, yeniden dene yönlendirmesi) ' + em);
  ok(await E.p.evaluate(() => document.activeElement === document.querySelector('[data-alan="va0-1-py"] [data-alan=adimla]') && !document.querySelector('[data-alan="va0-1-py"] [data-alan=adimla]').disabled), 'CDN engelli: düğme yeniden etkin, odak düğmede');
  ok(E.errs.length === 0, 'CDN engelliyken sayfa hatası yok ' + E.errs.join('|'));
  await E.ctx.close();

  // 5) Karanlık tema: vurgu ve panel okunur (değişkenler tanımlı; aşırı kontrast kaybı yok)
  if (agVar) {
    const K = await ac(390, null, 'dark');
    await K.p.evaluate(() => document.querySelector('[data-va-ders="va0-1"]').click()); await K.p.waitForSelector('[data-alan="va0-1-py"] .cm-editor', { timeout: 15000 });
    await K.p.evaluate(() => { document.querySelector('[data-alan-kod="va0-1-py"]').value = 'a = 1\nb = 2'; });
    await K.p.click('[data-alan="va0-1-py"] [data-alan=adimla]'); await K.p.waitForSelector('[data-alan-izle-panel]', { timeout: 120000 });
    const kr = await K.p.evaluate(() => { const s = document.querySelector('.cm-line.pp-izle-satir'); return s ? [getComputedStyle(s).backgroundColor !== 'rgba(0, 0, 0, 0)', document.documentElement.scrollWidth <= innerWidth + 1] : null; });
    eq(kr, [true, true], 'karanlık tema: vurgulu satır arka planı var, yatay taşma yok');
    ok(K.errs.length === 0, 'karanlık tema: sayfa hatası yok');
    await K.ctx.close();
  }

  await b.close(); sunucu.close();
  console.log('\n' + (fails ? 'KALDI: ' + fails + ' hata' : 'GEÇTİ') + (atlandi ? '  (ATLANDI bölüm: ' + atlandi + ')' : ''));
  process.exit(fails ? 1 : (atlandi && process.env.CI ? 3 : 0));
})().catch(e => { console.error('ÇÖKTÜ', e); process.exit(2); });

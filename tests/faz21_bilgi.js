// Faz 21: bölüm sonu "bilgi testi" (ayrı hafif katman): istemci mantığı, içerik şeması (anahtar yok, ders sınavıyla çakışma yok),
// migration DOSYASI (metin denetimi) ve gerçek sayfada (390 px) anlık geri bildirim; deneme/ustalık kaydı YAZILMAZ. Beklenenler elle yazıldı.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const KOK = path.join(__dirname, '..');
let fails = 0;
const ok = (c, m) => { console.log((c ? 'OK    ' : 'HATA  ') + m); if (!c) fails++; };
const eq = (a, b, m) => { const s = JSON.stringify(a) === JSON.stringify(b); ok(s, m + (s ? '' : '  → beklenen ' + JSON.stringify(b) + ', gelen ' + JSON.stringify(a))); };
const oku = f => fs.readFileSync(path.join(KOK, f), 'utf8');

(async function () {
  // ---- 1) istemci mantığı (Node, sahte istemci) ----
  const mem = {}; globalThis.localStorage = { getItem: k => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = String(v); }, removeItem: k => { delete mem[k]; } };
  globalThis.window = globalThis; globalThis.PP = {};
  Object.defineProperty(globalThis, 'navigator', { value: { onLine: true }, configurable: true });
  ['js/ogrenme/cekirdek.js', 'js/ogrenme/depo.js', 'js/ogrenme/sunucu.js'].forEach(f => require(path.join(KOK, f)));
  const S = PP.ogr.sunucu, D = PP.ogr.depo;
  const sahte = (yanit) => { const c = { cagri: [], gonder() {}, bilgi: async (h, i, a) => { c.cagri.push([h, i, a]); if (yanit instanceof Error) throw yanit; return yanit; } }; return c; };
  const kur = (c, ek) => S.yapilandir(Object.assign({ istemci: () => c, cevrimici: () => true, oturum: () => true }, ek || {}));
  const H = 'bolum:ccna:1:bilgi';
  let c = sahte({ data: { ok: false, dogru: 'B şıkkı', why: 'Neden.', whyNot: { 'A şıkkı': 'Çünkü.' } }, error: null }); kur(c);
  let r = await S.bilgi(H, 'aaaaaaaa', 'A şıkkı');
  eq([r.ok, r.dogruMu, r.dogru, r.why, r.whyNot], [true, false, 'B şıkkı', 'Neden.', { 'A şıkkı': 'Çünkü.' }], 'bilgi(): yanlış cevap → dogruMu false, doğru şık + why + whyNot geri bildirimi');
  eq(c.cagri, [[H, 'aaaaaaaa', 'A şıkkı']], 'bilgi(): sunucuya tek çağrı, (hedef, soru, cevap)');
  eq([D.oku().denemeler.length, D.oku().denemeler.filter(x => x.hedef === H).length], [0, 0], 'bilgi(): deneme/ustalık kaydı YAZILMAZ');
  kur(sahte({ data: { ok: true, dogru: 'X' }, error: null }));
  r = await S.bilgi(H, 'aaaaaaaa', 'X');
  eq([r.ok, r.dogruMu, r.why, r.whyNot], [true, true, '', null], 'bilgi(): doğru cevap, açıklama yoksa boş metin ve null');
  eq([(await S.bilgi('ders:ccna:1:sinav', 'aaaaaaaa', 'x')).neden, (await S.bilgi('seviye:ccna', 'a', 'x')).neden, (await S.bilgi(H, '', 'x')).neden, (await S.bilgi(H, 'a', 3)).neden], ['gecersiz', 'gecersiz', 'gecersiz', 'gecersiz'], 'bilgi(): ders sınavı/seviye hedefi, boş soru, metin olmayan cevap istemcide reddedilir (sunucuya gitmez)');
  c = sahte({ data: null, error: null }); kur(c, { cevrimici: () => false });
  eq([(await S.bilgi(H, 'a', 'x')).neden, c.cagri.length], ['cevrimdisi', 0], 'bilgi(): çevrimdışı → sunucuya gitmez');
  kur(c, { oturum: () => false });
  eq([(await S.bilgi(H, 'a', 'x')).neden, c.cagri.length], ['misafir', 0], 'bilgi(): misafir → sunucuya gitmez');
  kur(sahte({ data: null, error: { code: '22023', message: 'bu hedef icin soru yok' } }));
  eq((await S.bilgi(H, 'a', 'x')).neden, 'sunucu-hazir-degil', 'bilgi(): tohum yoksa "sunucu hazır değil"');
  kur(sahte({ data: { ok: 'evet' }, error: null }));
  eq((await S.bilgi(H, 'a', 'x')).neden, 'hata', 'bilgi(): bozuk yanıt hata sayılır');
  kur(sahte(new TypeError('Failed to fetch')));
  eq((await S.bilgi(H, 'a', 'x')).neden, 'cevrimdisi', 'bilgi(): ağ hatası → çevrimdışı mesajı');
  S.yapilandir({ istemci: () => ({ gonder() {} }), cevrimici: () => true, oturum: () => true });
  eq((await S.bilgi(H, 'a', 'x')).neden, 'yetenek-yok', 'bilgi(): istemcide bilgi yoksa "yetenek yok"');

  // ---- 2) içerik şeması ----
  const W = {}; W.window = W; vm.createContext(W);
  fs.readdirSync(path.join(KOK, 'content/bilgi')).forEach(f => vm.runInContext(oku('content/bilgi/' + f), W));
  const dersMetni = fs.readdirSync(path.join(KOK, 'content/lessons')).filter(f => /.js$/.test(f)).map(f => oku('content/lessons/' + f)).join('\n');
  const BIL = W.PP_BILGI, tumId = new Set();
  ok(BIL && BIL.ccna, 'PP_BILGI.ccna yüklendi (pilot hat)');
  for (const hat of Object.keys(BIL)) {
    const nler = Object.keys(BIL[hat]).map(Number).sort((a, b) => a - b);
    eq(nler, nler.map((_, i) => i + 1), hat + ': bölüm numaraları 1..N ardışık');
    let onceki = 0; const kotu = [];
    for (const n of nler) {
      const b = BIL[hat][n], [a, z] = b.dersler;
      if (!(a > onceki && z >= a)) kotu.push(n + ': ders aralığı ' + a + '-' + z);
      onceki = z;
      if (!(b.sorular.length >= 3 && b.sorular.length <= 4)) kotu.push(n + ': 3-4 soru olmalı');
      if (!/^[A-ZÇĞİÖŞÜ]/.test(b.baslik)) kotu.push(n + ': başlık');
      for (const q of b.sorular) {
        if (!/^[0-9a-f]{8}$/.test(q.id) || tumId.has(q.id)) kotu.push(n + ': kimlik ' + q.id);
        tumId.add(q.id);
        if (new Set(q.options).size !== 4 || q.options.some(o => typeof o !== 'string' || !o)) kotu.push(n + ': 4 farklı seçenek ' + q.id);
        if (Object.keys(q).sort().join() !== 'id,options,q') kotu.push(n + ': yalnız id/q/options olmalı (anahtar sızıntısı) ' + q.id);
        if (dersMetni.includes('id: "' + q.id + '"')) kotu.push(n + ': ders sınavı kimliğiyle çakışıyor ' + q.id);
        if (dersMetni.includes(q.q)) kotu.push(n + ': ders sınavı sorusunun kopyası ' + q.id);
      }
    }
    eq(kotu, [], hat + ': bölüm/ders aralığı, soru sayısı, kimlik, seçenek, anahtar yok, ders sınavıyla çakışma yok');
  }
  const sizinti = fs.readdirSync(path.join(KOK, 'content/bilgi')).map(f => oku('content/bilgi/' + f)).join('\n');
  ok(!/"(dogru|answer|why|whyNot|aciklama)"/.test(sizinti), 'content/bilgi: cevap/açıklama alanı yok');

  // ---- 3) migration dosyası ----
  const m = oku('supabase/migrations/20261026_ogr_bilgi_testi.sql').replace(/--.*$/gm, '');
  ok(/create or replace function public\.ogr_bilgi_kontrol\(p_hedef text, p_soru_id text, p_cevap text\)/.test(m) && /security definer/.test(m), 'migration: ogr_bilgi_kontrol security definer');
  ok(/\^bolum:\[a-z\]\+:\[0-9\]\+:bilgi\$/.test(m), 'migration: yalnız bolum:<yol>:<n>:bilgi hedefi (ders sınavı anahtarı sorgulanamaz)');
  ok(/revoke all on function public\.ogr_bilgi_kontrol[^;]*from public, anon/.test(m) && /grant execute on function public\.ogr_bilgi_kontrol[^;]*to authenticated/.test(m), 'migration: anon yetkisi yok, authenticated var');
  ok(!/insert\s+into|update\s+public|delete\s+from|drop\s+table|truncate/i.test(m), 'migration: hiçbir tabloya yazmaz (deneme/ustalık kaydı yok), silme yok');
  ok(/auth\.uid\(\) is null/.test(m), 'migration: oturum şartı');
  ok(/bilgi: function \(hedef, soruId, cevap\)[\s\S]*?ogr_bilgi_kontrol/.test(oku('supabase-shim.js')), 'shim: ogr yeteneğinde bilgi → ogr_bilgi_kontrol');

  // ---- 4) gerçek sayfa (390 px) ----
  const { INIT, chromium } = require('./stub.js'), { SAHTE_INIT } = require('./sunucu_sahte.js');
  const U = require('url').pathToFileURL(path.join(KOK, 'index.html')).href;
  const b = await chromium.launch(), ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.addInitScript(INIT); await ctx.addInitScript(SAHTE_INIT); await ctx.addInitScript("localStorage.ya_gm_seen='1';");
  const p = await ctx.newPage(), errs = []; p.on('pageerror', e => { errs.push(e.message); console.log('PAGEERR ' + e.message); });
  await p.goto(U + '#ders'); await p.waitForTimeout(3500);
  const ac = (n, adim) => p.evaluate(([n, adim]) => { const l = lessonForTopic('ccna', 's-ccna-' + n); if (!S.lessons.some(x => x.id === l.id)) S.lessons.push(l); S.les.track = 'ccna'; lcSet(lessonKey(l), 'w', 'ccna'); lrOpen(l, adim); return !!l; }, [n, adim]);
  const panel = () => p.evaluate(() => { const e = document.querySelector('[data-bilgi-testi]'); return e ? { hedef: e.getAttribute('data-bilgi-testi'), soru: e.querySelectorAll('[data-bilgi-soru]').length } : null; });
  await ac(5, 'notlar'); await p.waitForTimeout(400);
  eq(await panel(), null, 'ccna-5 (bölümün son dersi değil): bilgi testi yok');
  await ac(6, 'notlar'); await p.waitForTimeout(500);
  eq(await panel(), { hedef: 'bolum:ccna:1:bilgi', soru: 4 }, 'ccna-6 (bölüm 1 sonu) Notlar adımı: bilgi testi 4 soruyla görünür');
  const once = await p.evaluate(() => ({ den: (PP.ogr.depo.oku().denemeler || []).length, g: (window.__ogrDurum.cagrilar || []).length }));
  // Test ortamı: sahte depo bir süre sonra S.lessons'ı yeniler ve odayı kapatır; bilgi durumu (S.les.bilgi) korunur, oda yeniden açılır.
  const hazir = async () => { if (!(await panel())) { await ac(6, 'notlar'); await p.waitForTimeout(300); } };
  const sec = async (soruIdx, sikIdx) => { await hazir(); return p.evaluate(([i, j]) => { document.querySelectorAll('[data-bilgi-soru]')[i].querySelectorAll('.qz-o')[j].click(); }, [soruIdx, sikIdx]); };
  const dogruIdx = (i) => p.evaluate((i) => { const q = PP_BILGI.ccna[1].sorular[i]; return parseInt(q.id.slice(0, 8), 16) % q.options.length; }, i);
  const k0 = await dogruIdx(0);
  await sec(0, (k0 + 1) % 4); await p.waitForTimeout(500);
  await hazir();
  const y = await p.evaluate(() => { const e = document.querySelectorAll('[data-bilgi-soru]')[0]; return { cls: e.className, fb: (e.querySelector('.qz-fb') || {}).textContent || '', kilit: [...e.querySelectorAll('.qz-o')].every(x => x.disabled) }; });
  ok(/\bno\b/.test(y.cls) && /sentetik açıklama/.test(y.fb) && /Doğrusu:/.test(y.fb) && y.kilit, 'yanlış şık: anında kırmızı geri bildirim + doğru şık + açıklama, şıklar kilitlenir');
  await sec(1, await dogruIdx(1)); await p.waitForTimeout(500);
  await hazir();
  ok(await p.evaluate(() => /\bok\b/.test(document.querySelectorAll('[data-bilgi-soru]')[1].className)), 'doğru şık: yeşil geri bildirim');
  await hazir();
  eq(await p.evaluate(() => document.querySelector('[data-bilgi-testi] .pill').textContent), '1/2 doğru', 'başlıkta canlı sayaç (puan değil, doğru/çözülen)');
  const sonra = await p.evaluate(() => ({ den: (PP.ogr.depo.oku().denemeler || []).length, g: (window.__ogrDurum.cagrilar || []).length, b: window.__ogrDurum.bilgiCagrilari.length }));
  eq([sonra.den - once.den, sonra.g - once.g, sonra.b], [0, 0, 2], 'ilerleme/ustalık/sınav (gonder) kaydı yok; yalnız 2 bilgi çağrısı');
  await hazir();
  await p.evaluate(() => document.querySelector('[data-bilgi-yenile]').click()); await p.waitForTimeout(400);
  eq(await p.evaluate(() => [document.querySelectorAll('[data-bilgi-soru] .qz-o:disabled').length, !!document.querySelector('[data-bilgi-yenile]')]), [0, false], '"Yeniden çöz": tüm şıklar yeniden açılır (sınırsız tekrar)');
  await hazir();
  ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), '390 px yatay taşma yok');
  await p.evaluate(() => { window.__ogrDurum.cevrimdisi = true; });
  await sec(2, 0); await p.waitForTimeout(500); await hazir();
  ok(await p.evaluate(() => !!document.querySelector('[data-bilgi-hata]') && !document.querySelectorAll('[data-bilgi-soru]')[2].querySelector('.qz-fb')), 'çevrimdışı: hata mesajı, soru cevapsız kalır (tekrar denenebilir)');
  eq(errs, [], 'sayfa hatası yok');
  await b.close();
  console.log(fails ? '\n' + fails + ' HATA' : '\nGEÇTİ'); process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });

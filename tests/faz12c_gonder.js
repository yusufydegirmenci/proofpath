// Faz 12 V5: onaylı geri bildirim gönderme (sahte Supabase istemcisi), güvenlik sertleştirme migration DOSYASI (metin denetimi), ısınma atlama (O1).
// Gerçek Supabase'e bağlanılmaz. Beklenenler elle yazıldı. Hata → çıkış 1.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const KOK = path.join(__dirname, '..');
let fails = 0;
const ok = (c, m) => { console.log((c ? 'OK    ' : 'HATA  ') + m); if (!c) fails++; };
const eq = (a, b, m) => { const s = JSON.stringify(a) === JSON.stringify(b); ok(s, m + (s ? '' : '  → beklenen ' + JSON.stringify(b) + ', gelen ' + JSON.stringify(a))); };
const oku = f => fs.readFileSync(path.join(KOK, f), 'utf8');
const gecerli = { tur: 'hata', baslik: 'The Save button does nothing', aciklama: 'Problem: nothing happens.\nExpected: it saves.', onem: 'orta' };
const dersB = { tur: 'ders', sekme: 'ders', id: 'bk-1', baslik: 'HTTP temelleri', adim: 'anlat' };

// ---- Bölüm 1: gönderme mantığı (Node, sahte istemci) ----
(async function () {
  const mem = {}; globalThis.localStorage = { getItem: k => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = String(v); }, removeItem: k => { delete mem[k]; } };
  globalThis.window = globalThis; globalThis.PP = {};
  ['js/ogrenme/cekirdek.js', 'js/ogrenme/depo.js', 'js/ogrenme/geri-bildirim.js'].forEach(f => require(path.join(KOK, f)));
  const G = PP.ogr.gb;
  const sahte = (sonuc) => { const c = { cagri: [], gonder: async (s) => { c.cagri.push(s); return typeof sonuc === 'function' ? sonuc() : sonuc; } }; return c; };

  // kaydetmek asla göndermez
  const istemci0 = sahte({ error: null }); globalThis.claude = { use: async n => (n === 'geri_bildirim' ? istemci0 : null) };
  const r1 = G.kaydet(gecerli, dersB).kayit;
  eq(istemci0.cagri.length, 0, 'kaydet/düzenle sunucuya HİÇBİR şey göndermez (yalnız açık gonder çağrısı)');
  eq((await G.istemciAl()) === istemci0, true, 'istemciAl: claude.use("geri_bildirim") istemciyi verir');

  // satır: tabloda önem sütunu yok → bağlamın içinde; ek alan yok
  eq(G.satir(r1), { tur: 'hata', baslik: 'The Save button does nothing', aciklama: 'Problem: nothing happens.\nExpected: it saves.', baglam: { tur: 'ders', sekme: 'ders', id: 'bk-1', baslik: 'HTTP temelleri', adim: 'anlat', onem: 'orta' } }, 'gönderilen satır: tür, başlık, açıklama, bağlam (önem bağlamda); id/owner/durum yok');
  ok(JSON.stringify(G.satir(r1).baglam).length <= 1000, 'bağlam migration sınırı (1000 bayt) içinde');

  // başarı: gönderildi işareti, yerel kopya durur, ikinci gönderme reddedilir
  const r = await G.gonder(r1.id, istemci0);
  ok(r.ok && r.kayit.durum === 'gonderildi' && /^\d{4}-\d{2}-\d{2}T/.test(r.kayit.gonderildi), 'başarılı gönderme: durum "gonderildi" + zaman damgası');
  eq(istemci0.cagri.length, 1, 'istemci tam 1 kez çağrıldı');
  eq(G.liste().filter(k => k.id === r1.id).length, 1, 'yerel kopya silinmedi');
  eq((await G.gonder(r1.id, istemci0)).neden, 'zaten', 'gönderilmiş kayıt tekrar gönderilmez');
  eq(istemci0.cagri.length, 1, 'tekrar denemede istemci çağrılmadı');

  // sunucu hataları: kayıt yerel kalır, anlaşılır Türkçe mesaj
  const k2 = G.kaydet({ ...gecerli, baslik: 'Second report here' }, dersB).kayit;
  const lim = await G.gonder(k2.id, sahte({ error: { code: 'P0001', message: 'geri_bildirim: gunluk sinir (10) asildi' } }));
  ok(!lim.ok && /Günlük gönderme sınırına \(10\)/.test(lim.mesaj) && /bu cihazda duruyor/.test(lim.mesaj), 'günlük sınır: anlaşılır mesaj');
  eq(G.liste().find(k => k.id === k2.id).durum, 'yerel', 'sınır hatasında kayıt "yerel" kalır');
  const agk = await G.gonder(k2.id, sahte({ error: { message: 'TypeError: Failed to fetch' } }));
  ok(!agk.ok && /Bağlantı kurulamadı/.test(agk.mesaj), 'ağ hatası: bağlantı mesajı');
  const at = await G.gonder(k2.id, { gonder: async () => { throw new Error('boom network'); } });
  ok(!at.ok && /Bağlantı kurulamadı/.test(at.mesaj) && G.liste().find(k => k.id === k2.id).durum === 'yerel', 'istemci istisna atarsa çökmez, kayıt yerel kalır');
  ok(/yetkin yok/.test((await G.gonder(k2.id, sahte({ error: { code: '42501', message: 'new row violates row-level security policy' } }))).mesaj), 'RLS reddi: yetki mesajı');
  ok(/Oturumun süresi/.test((await G.gonder(k2.id, sahte({ error: { code: 'PGRST301', message: 'JWT expired' } }))).mesaj), 'süresi dolmuş oturum: yeniden giriş mesajı');
  ok(/sunucu hatası/.test((await G.gonder(k2.id, sahte({ error: { code: '500', message: 'oops' } }))).mesaj), 'bilinmeyen hata: genel mesaj');
  eq(G.liste().length, 2, 'hiçbir hatada yerel kopya silinmedi');

  // istemci yok (oturum yok / misafir / Artifact): yerel kalır
  eq((await G.gonder(k2.id, null)).neden, 'istemci-yok', 'istemci yoksa gönderilmez');
  ok(/bu cihazda kalır/.test((await G.gonder(k2.id, null)).mesaj), 'istemci yok: "yerel kalır" mesajı');
  globalThis.claude = { use: async () => undefined }; eq(await G.istemciAl(), null, 'use(...) değer vermezse istemci null');
  globalThis.claude = { use: async () => { throw new Error('x'); } }; eq(await G.istemciAl(), null, 'use(...) hata verirse istemci null (çökmez)');
  delete globalThis.claude; eq(await G.istemciAl(), null, 'window.claude yoksa istemci null');
  eq((await G.gonder('yok-id', istemci0)).neden, 'kayit-yok', 'olmayan kayıt gönderilmez');

  // eşzamanlı çift tık: tek istek
  let coz; const yavas = { cagri: 0, gonder: () => { yavas.cagri++; return new Promise(r => { coz = r; }); } };
  const k3 = G.kaydet({ ...gecerli, baslik: 'Third report here' }, dersB).kayit;
  const p1 = G.gonder(k3.id, yavas), p2 = await G.gonder(k3.id, yavas);
  eq(p2.neden, 'mesgul', 'gönderim sürerken ikinci istek reddedilir');
  coz({ error: null }); const s1 = await p1;
  ok(s1.ok && yavas.cagri === 1, 'çift tıkta sunucuya tek istek gitti');

  // yerel işaret yazılamazsa uyarı
  const k4 = G.kaydet({ ...gecerli, baslik: 'Fourth report here' }, dersB).kayit;
  const bozKay = { gonder: async () => { localStorage.setItem = () => { throw new Error('dolu'); }; return { error: null }; } };
  const s4 = await G.gonder(k4.id, bozKay);
  ok(s4.ok && /tekrar gönderme/.test(s4.uyari || ''), 'sunucuya gitti ama yerel işaret yazılamadı: uyarı döner');
})().then(() => {
  // ---- Bölüm 2: shim (sahte supabase-js) yalnız insert sunar ----
  const calls = [];
  const sb = {
    auth: { getSession: async () => ({ data: { session: { user: { id: 'u1', email: 'a@b.co', user_metadata: {} } } } }), onAuthStateChange: () => {}, signOut: async () => {} },
    from: (t) => { const q = { t, ops: [] }; const self = { select: () => self, eq: () => self, maybeSingle: () => self, insert: (y) => { q.ops.push(['insert', y]); calls.push(q); return Promise.resolve({ error: null }); }, update: () => { q.ops.push(['update']); calls.push(q); return self; }, delete: () => { q.ops.push(['delete']); calls.push(q); return self; }, upsert: () => { q.ops.push(['upsert']); calls.push(q); return self; }, then: (a, b) => Promise.resolve({ data: null }).then(a, b) }; return self; }
  };
  const doc = { getElementById: () => ({}), createElement: () => ({ style: {}, append() {}, appendChild() {} }), addEventListener() {}, body: { appendChild() {} }, head: { appendChild() {} } };
  const win = { PP_CONFIG: { url: 'https://x.supabase.co', anonKey: 'k' }, supabase: { createClient: () => sb }, addEventListener() {}, location: { hash: '', origin: 'https://x', pathname: '/' } };
  const ctx = vm.createContext({ window: win, document: doc, location: win.location, navigator: { onLine: true }, console, setInterval: () => 0, setTimeout, clearTimeout, Promise, JSON, Object, Array, String, Number, Date, Math, Error, Blob: function () {}, URL: { createObjectURL() {}, revokeObjectURL() {} }, localStorage: globalThis.localStorage, crypto: {} });
  vm.runInContext(oku('supabase-shim.js'), ctx);
  return win.claude.use('geri_bildirim').then(async (api) => {
    ok(api && typeof api.gonder === 'function', 'shim: claude.use("geri_bildirim") gönder işlevi verir');
    eq(Object.keys(api).sort(), ['gonder'], 'shim: istemci yalnız "gonder" sunar (okuma/güncelleme/silme yok)');
    const sonuc = await api.gonder({ tur: 'hata', baslik: 'Baslik burada', aciklama: 'Aciklama burada yeterince uzun', baglam: { tur: 'genel' }, owner: 'baskasi', durum: 'kapandi', id: 'x' });
    const gb = calls.filter(c => c.t === 'geri_bildirim');
    eq(gb.length, 1, 'shim: geri_bildirim tablosuna tam 1 işlem');
    eq(gb[0].ops.map(o => o[0]), ['insert'], 'shim: işlem yalnız insert');
    eq(Object.keys(gb[0].ops[0][1]).sort(), ['aciklama', 'baglam', 'baslik', 'tur'], 'shim: owner/durum/id istemciden gönderilmez (sunucu belirler)');
    ok(sonuc && sonuc.error === null, 'shim: sunucu sonucu çağırana döner');
    eq(calls.filter(c => c.t !== 'geri_bildirim' && c.ops.length).length, 0, 'shim: geri bildirim gönderirken başka tabloya yazılmadı');
  });
}).then(() => {
  // ---- Bölüm 3: güvenlik sertleştirme migration DOSYASI (metin denetimi, uygulanmaz) ----
  const dosya = fs.readdirSync(path.join(KOK, 'supabase/migrations')).filter(f => /guvenlik_sertlestirme/.test(f));
  eq(dosya.length, 1, 'tek güvenlik sertleştirme migration dosyası var');
  const sql = oku('supabase/migrations/' + dosya[0]), kod = sql.replace(/--.*$/gm, '');
  const deyimler = kod.split(';').map(s => s.trim().replace(/\s+/g, ' ')).filter(Boolean);
  eq(deyimler, [
    'revoke execute on function public.handle_new_user() from public, anon, authenticated',
    'revoke execute on function public.rls_auto_enable() from public, anon, authenticated',
    'alter function public.rapor_paylasim_guncelle_kilidi() set search_path = public'
  ], 'dosya tam olarak 3 deyim içerir: 2 revoke execute + 1 alter function set search_path');
  eq(kod.match(/\b(drop|delete|truncate|insert|update|create|grant)\b/gi), null, 'drop/delete/truncate/insert/update/create/grant yok (veri ve nesne değişimi yok)');
  eq(kod.match(/\b(rapor_gor|ogr_deneme_gonder|ogr_kapi_degerlendir)\b/g), null, 'tasarım gereği açık fonksiyonlara dokunulmaz');
  ok(/UYGULANMADI/.test(sql), 'dosya başlığı "UYGULANMADI" der');
}).then(async () => {
  // ---- Bölüm 4: gerçek sayfa (390 px): onaylı Gönder + ısınma atlama ----
  const { INIT, chromium } = require('./stub.js');
  const U = require('url').pathToFileURL(path.join(KOK, 'index.html')).href;
  const b = await chromium.launch(), ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.addInitScript(INIT); await ctx.addInitScript("localStorage.ya_gm_seen='1';");
  const p = await ctx.newPage(), errs = []; p.on('pageerror', e => { errs.push(e.message); console.log('PAGEERR ' + e.message); });
  await p.goto(U + '#ayar'); await p.waitForTimeout(3500);
  const ev = (f, a) => p.evaluate(f, a);
  const say = s => ev(s => document.querySelectorAll(s).length, s);
  const tasma = () => ev(() => document.documentElement.scrollWidth <= innerWidth + 1);

  // sahte sunucu istemcisi: sonuç sırası window.__sonuc'tan okunur
  await ev(() => {
    window.__cagri = []; window.__sonuc = { error: null }; window.__istemciVar = false;
    const orig = window.claude.use.bind(window.claude);
    window.claude.use = n => n === 'geri_bildirim' ? Promise.resolve(window.__istemciVar ? { gonder: async s => { window.__cagri.push(s); return window.__sonuc; } } : null) : orig(n);
    PP.ogr.gb.kaydet({ tur: 'hata', baslik: 'The Save button does nothing', aciklama: 'Problem: nothing happens.\nExpected: it saves.', onem: 'yuksek' }, { tur: 'ders', sekme: 'ders', id: 'bk-1', baslik: 'HTTP temelleri', adim: 'anlat' });
    goTab('ayar');
  });
  await p.waitForTimeout(400);
  eq(await say('[data-gb-kayit] [data-gb=gonder]'), 1, 'kayıtta "Gönder" düğmesi var');
  ok(await ev(() => /bu cihazda, gönderilmedi/.test(document.querySelector('[data-gb-kayit]').textContent)), 'gönderilmemiş kayıtta durum yazısı');

  // oturum yok: önizleme açılmaz, "yerel kalır"
  await p.click('[data-gb=gonder]'); await p.waitForTimeout(250);
  eq(await say('[data-gb=onizleme]'), 0, 'istemci yoksa önizleme açılmaz');
  ok(await ev(() => /bu cihazda kalır/.test(document.querySelector('[data-gb=gonder-mesaj]').textContent)), 'oturum yok/misafir: "bu cihazda kalır" mesajı');
  eq(await ev(() => window.__cagri.length), 0, 'istemci yokken hiçbir şey gönderilmedi');

  // oturum var: önizleme + uyarı, onay olmadan gitmez
  await ev(() => { window.__istemciVar = true; });
  await p.click('[data-gb=gonder]'); await p.waitForTimeout(250);
  eq(await say('[data-gb=onizleme]'), 1, 'istemci varsa önizleme açılır');
  const onz = await ev(() => document.querySelector('[data-gb=onizleme]').textContent);
  ok(/sunucuya gider/.test(onz) && /başkaları göremez/.test(onz), 'önizleme: "sunucuya gider … başkaları göremez" uyarısı');
  ok(onz.includes('The Save button does nothing') && onz.includes('nothing happens') && onz.includes('HTTP temelleri') && /önem: Yüksek/.test(onz), 'önizleme gidecek metni (başlık, açıklama, bağlam, önem) gösterir');
  eq(await ev(() => window.__cagri.length), 0, 'önizleme açıkken onay yok → hiçbir şey gitmedi');
  ok(await tasma(), 'önizleme açıkken 390 px yatay taşma yok');
  await p.click('[data-gb=gonder-vazgec]'); await p.waitForTimeout(200);
  eq([await say('[data-gb=onizleme]'), await ev(() => window.__cagri.length)], [0, 0], 'Vazgeç: önizleme kapanır, hiçbir şey gitmez');

  // sınır hatası: mesaj görünür, kayıt yerel kalır
  await ev(() => { window.__sonuc = { error: { code: 'P0001', message: 'geri_bildirim: gunluk sinir (10) asildi' } }; });
  await p.click('[data-gb=gonder]'); await p.waitForTimeout(250); await p.click('[data-gb=gonder-evet]'); await p.waitForTimeout(350);
  ok(await ev(() => /Günlük gönderme sınırına \(10\)/.test(document.querySelector('[data-gb=gonder-mesaj]').textContent)), 'günlük sınırda anlaşılır Türkçe mesaj');
  eq(await ev(() => [window.__cagri.length, PP.ogr.gb.liste()[0].durum, PP.ogr.gb.liste().length]), [1, 'yerel', 1], 'sınır hatasında istek 1 kez gitti, kayıt yerel ve duruyor');

  // başarı
  await ev(() => { window.__sonuc = { error: null }; });
  await p.click('[data-gb=gonder]'); await p.waitForTimeout(250); await p.click('[data-gb=gonder-evet]'); await p.waitForTimeout(350);
  const gonderilen = await ev(() => window.__cagri[1]);
  eq(Object.keys(gonderilen).sort(), ['aciklama', 'baglam', 'baslik', 'tur'], 'sunucuya yalnız tür, başlık, açıklama, bağlam gitti');
  eq(await ev(() => [PP.ogr.gb.liste()[0].durum, PP.ogr.gb.liste().length, document.querySelector('[data-gb=durum]').textContent.startsWith('gönderildi')]), ['gonderildi', 1, true], 'başarıda kayıt "gönderildi" işaretli, yerel kopya duruyor');
  eq(await say('[data-gb-kayit] [data-gb=gonder]'), 0, 'gönderilmiş kayıtta "Gönder" düğmesi yok');
  eq(await say('[data-gb-kayit] [data-gb=duzenle]'), 0, 'gönderilmiş kayıt düzenlenemez (çift kayıt önlenir)');
  eq(await say('[data-gb-kayit] [data-gb=kopyala]'), 1, 'gönderilmiş kayıt yine kopyalanabilir');
  ok(await tasma(), 'gönderim sonrası 390 px yatay taşma yok');

  // ---- O1: ısınma atlama ----
  const ac = (t, n, adim) => ev(([t, n, adim]) => { const l = lessonForTopic(t, 's-' + t + '-' + n); if (!S.lessons.some(x => x.id === l.id)) S.lessons.push(l); S.les.track = t; lrOpen(l, adim); return l.id + '|' + lessonKey(l); }, [t, n, adim]);
  await ev(() => goTab('ders')); await p.waitForTimeout(300);
  const [, key] = (await ac('bk', 20, 'isinma')).split('|'); await p.waitForTimeout(300);
  eq(await ev(k => [lcHas(k, 'w'), lcHas(k, 'w-atla'), lcDone(k)], key), [false, false, false], 'başlangıç: ısınma/atlama/ders-tamam yok');
  eq(await say('[data-atla]'), 1, 'ısınma adımında "Isınmayı atla" düğmesi var');
  await p.click('[data-atla]'); await p.waitForTimeout(300);
  eq(await ev(k => [lcHas(k, 'w'), lcHas(k, 'w-atla'), S.les.rs], key), [false, true, 'anlat'], 'atlayınca yalnız w-atla yazılır ("w" yazılmaz), anlatım açılır');
  eq(await ev(k => lcW(k), key), true, 'ısınma kapısı atlamayla açıldı (kimse bloklanmaz)');
  eq(await ev(() => /Anlatım, ısınmayı bitirince açılır/.test(document.body.textContent)), false, 'anlatım adımı kilitli değil');
  // ders-tamam: w-atla + r + q + p
  eq(await ev(k => { const o = lcLoad(); o[k] = { 'w-atla': 1, r: 1, q: 1, p: 1 }; return PP.ogr.ilerleme.dersTamam(o[k]); }, key), true, 'ders-tamam = (w-atla) + okuma + mini sınav kapısı + alıştırma');
  eq(await ev(() => [PP.ogr.ilerleme.dersTamam({ r: 1, q: 1, p: 1 }), PP.ogr.ilerleme.dersTamam({ w: 1, r: 1, q: 1, p: 1 }), PP.ogr.ilerleme.dersTamam({ 'w-atla': 1, r: 1, p: 1 }), PP.ogr.ilerleme.dersTamam({ 'w-atla': 1, r: 1, q: 1 })]), [false, true, false, false], 'ısınma ya da atlama olmadan, ya da sınav/alıştırma eksikken ders tamam değil');

  // telafi önerisi: atlayıp %80 altı alan
  const [lid2, key2] = (await ac('bk', 21, 'sinav')).split('|'); await p.waitForTimeout(300);
  const n2 = await ev(([lid2, key2]) => { const l = lessonForTopic('bk', 's-bk-21'); lcSet(key2, 'w-atla', 'bk'); const n = (l.quiz || []).length; return n; }, [lid2, key2]);
  ok(n2 >= 2, 'test dersinin mini sınavı var (' + n2 + ' soru)');
  const telafi = async (dogru) => { await ev(([lid2, n, dogru]) => { for (let i = 0; i < n; i++) S.les.mark[lid2 + ':' + i] = i < dogru ? 'ok' : 'no'; lrSet(lrFind(), 'sinav'); }, [lid2, n2, dogru]); await p.waitForTimeout(300); return say('[data-telafi=isinma]'); };
  eq(await telafi(0), 1, 'atlayıp %80 altı → "2 dakikalık ısınmayı yap" telafi önerisi çıkar');
  ok(await ev(() => /2 dakikalık ısınmayı yap/.test(document.querySelector('[data-telafi]').textContent) && !document.querySelector('[data-telafi]').closest('[disabled]')), 'telafi önerisi metni; kilit değil');
  eq(await telafi(n2), 0, '%80 ve üstü → telafi önerisi yok');
  await ev(([key2]) => { lcUnset(key2, 'w-atla'); lcSet(key2, 'w', 'bk'); }, [key2]);
  eq(await telafi(0), 0, 'ısınmayı yapmış (w) biri için telafi önerisi çıkmaz');

  // senkron: uzak ya_lc'den w-atla bayrağı korunur (oyun/altin-vurus.js birleştirmesi)
  ok(oku('js/oyun/altin-vurus.js').includes('["w","w-atla","r","q","p"]'), 'cihazlar arası ders adımı birleştirmesi w-atla bayrağını da taşır');

  ok(errs.length === 0, 'sayfa hatası yok ' + errs.join('|'));
  await b.close();
}).then(() => {
  console.log(fails ? '\nKALDI: ' + fails : '\nGEÇTİ');
  process.exit(fails ? 1 : 0);
}).catch(e => { console.log('HATA  beklenmeyen: ' + (e && e.stack || e)); process.exit(1); });

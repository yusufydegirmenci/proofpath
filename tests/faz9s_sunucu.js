// Faz 9 sunucu: güvenilir sınav yolu istemcisi (PP.ogr.sunucu), yerel önbellek güveni, shim "ogr" yeteneği ve ek migration DOSYASI (metin denetimi).
// Gerçek Supabase'e bağlanılmaz; sunucu yanıtları sahtedir. Beklenenler elle yazıldı. Hata → çıkış 1.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const KOK = path.join(__dirname, '..');
let n = 0, fails = 0;
const ok = (c, m) => { n++; console.log((c ? 'OK    ' : 'HATA  ') + m); if (!c) fails++; };
const eq = (a, b, m) => { const s = JSON.stringify(a) === JSON.stringify(b); ok(s, m + (s ? '' : '  → beklenen ' + JSON.stringify(b) + ', gelen ' + JSON.stringify(a))); };
const oku = f => fs.readFileSync(path.join(KOK, f), 'utf8');

(async function () {
  // ---- Bölüm 1: istemci mantığı (Node) ----
  let mem = {}; globalThis.localStorage = { getItem: k => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = String(v); }, removeItem: k => { delete mem[k]; } };
  globalThis.window = globalThis; globalThis.PP = {};
  Object.defineProperty(globalThis, 'navigator', { value: { onLine: true }, configurable: true });
  ['js/ogrenme/cekirdek.js', 'js/ogrenme/depo.js', 'js/ogrenme/sunucu.js'].forEach(f => require(path.join(KOK, f)));
  const S = PP.ogr.sunucu, D = PP.ogr.depo;
  const sorular = [{ id: 'aaaaaaaa', q: 'Soru 1?', options: ['a', 'b', 'c'] }, { id: 'bbbbbbbb', q: 'Soru 2?', options: ['x', 'y'] }];
  const sahte = (yanit) => { const c = { cagri: [], gonder: async (h, v, cev, y) => { c.cagri.push({ h, v, cev, y }); const r = typeof yanit === 'function' ? yanit() : yanit; if (r instanceof Error) throw r; return r; }, kapi: async (k) => { c.cagri.push({ kapi: k }); return typeof yanit === 'function' ? yanit() : yanit; } }; return c; };
  const kur = (c, ek) => S.yapilandir(Object.assign({ istemci: () => c, cevrimici: () => true, oturum: () => true }, ek || {}));
  const g = (ek) => S.gonder(Object.assign({ hedef: 'ders:ccna:1:sinav', varyant: 'v1', cevaplar: { aaaaaaaa: 'b', bbbbbbbb: 'x' } }, ek || {}));
  const denemeler = () => D.oku().denemeler;

  eq(S.cevaplar(sorular, [1, 0]), { aaaaaaaa: 'b', bbbbbbbb: 'x' }, 'cevaplar(): seçilen şık indeksi → {soru_id: seçenek metni}');
  eq([S.cevaplar(sorular, [1]), S.cevaplar(sorular, [1, 5]), S.cevaplar(sorular, [1, undefined]), S.cevaplar([{ options: ['a'] }], [0])], [null, null, null, null], 'cevaplar(): eksik/aralık dışı cevap ya da id\'siz soru null');
  eq(S.cevaplar([{ id: 'cccccccc', o: ['p', 'q'] }], [1], 'o'), { cccccccc: 'q' }, 'cevaplar(): seçenek alanı adı verilebilir (seviye/VA sınavı "o")');
  eq(S.dersKapisi('ders:bk:37:sinav'), 'ders-ustalik:bk:37', 'dersKapisi(): ders hedefi → sunucu kapı kimliği');
  eq([S.dersKapisi('seviye:ccna'), S.dersKapisi(null)], [null, null], 'dersKapisi(): ders olmayan hedef null');

  // geçersiz girdi
  kur(sahte({ data: null, error: null }));
  eq([(await S.gonder(null)).neden, (await S.gonder({ hedef: 'h', varyant: 'v1', cevaplar: {} })).neden, (await S.gonder({ hedef: 'h', varyant: 'v1', cevaplar: { a: 3 } })).neden, (await S.gonder({ hedef: '', varyant: 'v1', cevaplar: { a: 'x' } })).neden],
    ['gecersiz', 'gecersiz', 'gecersiz', 'gecersiz'], 'gonder(): boş girdi / boş cevaplar / metin olmayan cevap / hedefsiz → gecersiz (sunucuya gitmez)');

  // durum mesajları: çevrimdışı, misafir, yetenek yok
  let c = sahte({ data: null, error: null }); kur(c, { cevrimici: () => false });
  let r = await g();
  eq([r.ok, r.neden, c.cagri.length, denemeler().length], [false, 'cevrimdisi', 0, 0], 'çevrimdışı: sunucuya gitmez, kayıt yazılmaz');
  ok(/Çevrimdışısın/.test(r.mesaj) && /ustalığa sayılmaz/.test(r.mesaj), 'çevrimdışı mesajı Türkçe ve net ("ustalığa sayılmaz")');
  c = sahte({ data: null, error: null }); kur(c, { oturum: () => false });
  r = await g();
  eq([r.neden, c.cagri.length], ['misafir', 0], 'misafir/hesapsız: sunucuya gitmez');
  ok(/Giriş|giriş/.test(r.mesaj) && /sunucuda doğrulanır/.test(r.mesaj), 'misafir mesajı: giriş yapınca sunucuda doğrulanır');
  S.yapilandir({ istemci: () => null, cevrimici: () => true, oturum: () => true });
  eq((await g()).neden, 'yetenek-yok', 'sınav yeteneği yoksa (claude.use("ogr") null): yetenek-yok');
  S.yapilandir({ istemci: () => { throw new Error('patladı'); }, cevrimici: () => true, oturum: () => true });
  eq((await g()).neden, 'yetenek-yok', 'claude.use hata fırlatırsa: çökmez, yetenek-yok');

  // hata eşleme
  const hatali = async (e) => { kur(sahte({ data: null, error: e })); return (await g()).neden; };
  eq([await hatali({ code: '54000', message: 'cok sik deneme; biraz bekle' }), await hatali({ code: '28000', message: 'oturum gerekli' }), await hatali({ code: '22023', message: 'bilinmeyen hedef' }),
    await hatali({ code: 'PGRST202', message: 'Could not find the function' }), await hatali({ code: '22023', message: 'bu hedef icin soru yok' }), await hatali({ message: 'garip' })],
    ['cok-sik', 'oturum', 'sunucu-hazir-degil', 'sunucu-hazir-degil', 'sunucu-hazir-degil', 'hata'], 'sunucu hata kodları → neden (çok sık, oturum, sunucu hazır değil ×3, genel)');
  ok(/saatte en çok 5/.test(S.MESAJ['cok-sik']) && /henüz hazır değil/.test(S.MESAJ['sunucu-hazir-degil']) && /ustalığa sayılmaz/.test(S.MESAJ['sunucu-hazir-degil']), 'çok sık / sunucu hazır değil mesajları anlaşılır');
  kur(sahte(new TypeError('Failed to fetch')));
  eq((await g()).neden, 'cevrimdisi', 'ağ hatası (TypeError: Failed to fetch) → cevrimdisi');
  kur(sahte({ data: { varyant_atandi: 'v2', puan: null }, error: null }));
  r = await g();
  eq([r.neden, r.atanan, denemeler().length], ['varyant', 'v2', 0], 'sunucu başka varyant atadıysa: neden varyant + atanan; kayıt yazılmaz');
  const bozuklar = [{ data: { puan: 9, maks: 6, gecti: true }, error: null }, { data: { puan: 'x', maks: 6, gecti: true }, error: null }, { data: { puan: 1, maks: 0, gecti: false }, error: null }, { data: { puan: 1, maks: 6 }, error: null }, { data: null, error: null }];
  const bn = []; for (const b of bozuklar) { kur(sahte(b)); bn.push((await g()).neden); }
  eq([bn, denemeler().length], [['hata', 'hata', 'hata', 'hata', 'hata'], 0], 'tutarsız sunucu yanıtı (puan>maks, sayı değil, maks 0, gecti yok, boş) → hata; kayıt yazılmaz');

  // başarılı yol: GEÇTİ
  const anahtar = { aaaaaaaa: { dogru: 'b', ok: true, why: 'çünkü b', whyNot: { a: 'a değil' } }, bbbbbbbb: { dogru: 'y', ok: false, why: 'çünkü y' } };
  c = sahte({ data: { puan: 5, maks: 6, oran: 0.8333, gecti: true, dogru_sayisi: 5, soru_sayisi: 6, esik: 0.8, surum: '2026-10-v1', anahtar }, error: null }); kur(c);
  r = await g({ yardim: { tur: 'ai', guvenilir: true, fazlalik: 1 } });
  eq([r.ok, r.gecti, r.puan, r.maks, r.dogruSayisi, r.soruSayisi, r.surum], [true, true, 5, 6, 5, 6, '2026-10-v1'], 'başarı: sunucu puanı ve doğru sayısı aynen döner');
  eq(c.cagri[0], { h: 'ders:ccna:1:sinav', v: 'v1', cev: { aaaaaaaa: 'b', bbbbbbbb: 'x' }, y: { tur: 'ai' } }, 'sunucuya yalnız hedef, varyant, cevaplar ve {tur} gider (yardım beyanı süzülür)');
  let d = denemeler();
  eq([d.length, d[0].hedef, d[0].varyant, d[0].puan, d[0].maks, d[0].dogrulama, d[0].surum, d[0].yardim.guvenilir, d[0].kaynak], [1, 'ders:ccna:1:sinav', 'v1', 5, 6, 'sunucu', '2026-10-v1', false, 'sunucu'], 'yerel kayıt: dogrulama "sunucu", yardım güvenilmez, sunucu sürümü');
  eq(S.aciklama('ders:ccna:1:sinav'), anahtar, 'geçince sunucunun açtığı anahtar/açıklama yerelde saklanır ve okunur');
  eq(S.aciklama('ders:baska:9:sinav'), null, 'başka hedef için açıklama yok');

  // başarılı yol: KALDI (sunucu yanlışlıkla anahtar gönderse bile istemci saklamaz)
  mem = {}; globalThis.localStorage = { getItem: k => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = String(v); }, removeItem: k => { delete mem[k]; } };
  c = sahte({ data: { puan: 2, maks: 6, oran: 0.3333, gecti: false, dogru_sayisi: 2, soru_sayisi: 6, esik: 0.8, surum: '2026-10-v1', anahtar }, error: null }); kur(c);
  r = await g();
  eq([r.ok, r.gecti, r.anahtar], [true, false, null], 'kalınca: sonuç gecti=false ve anahtar null (istemci sızıntıyı kesin)');
  eq([denemeler().length, denemeler()[0].puan, S.aciklama('ders:ccna:1:sinav')], [1, 2, null], 'kalınca deneme (kanıt) yazılır ama açıklama saklanmaz');

  // yerel güven: denemeEkle "sunucu" kabul etmez
  const eklenen = D.denemeEkle({ id: 'x1', hedef: 'ders:ccna:2:sinav', puan: 6, maks: 6, dogrulama: 'sunucu', kaynak: 'hile' });
  eq(eklenen.deneme.dogrulama, 'istemci', 'denemeEkle: dogrulama "sunucu" istenirse "istemci"ye indirilir');
  eq(D.denemeEkle({ id: 'x2', hedef: 'ders:ccna:2:sinav', puan: 6, maks: 6 }, undefined, true).deneme.dogrulama, 'istemci', 'denemeEkle: üçüncü argümanla sunucu güveni istenemez');
  eq(D.sunucuEkle({ id: 'x3', hedef: 'ders:ccna:2:sinav', puan: 6, maks: 6 }).deneme.dogrulama, 'sunucu', 'yalnız sunucuEkle (PP.ogr.sunucu) "sunucu" yazar');
  eq(D.sunucuEkle({ id: 'x4', hedef: 'ders:ccna:2:sinav', puan: 9, maks: 6 }).ok, false, 'sunucuEkle de puan>maks kaydını reddeder');

  // sunucu kapı kararı
  c = sahte({ data: { kapi: 'ders-ustalik:ccna:1', acik: true, nedenler: [] }, error: null }); kur(c);
  const k1 = await S.kapi('ders-ustalik:ccna:1'), k2 = await S.kapi('ders-ustalik:ccna:1');
  eq([k1.ok, k1.acik, k2.acik, c.cagri.length], [true, true, true, 1], 'kapı: sunucu kararı döner; 60 sn içinde ikinci sorgu önbellekten (tek RPC)');
  kur(sahte({ data: { kapi: 'ders-ustalik:ccna:2', acik: false, nedenler: [{ kod: 'hedef-denenmedi', ref: 'x' }] }, error: null }));
  const k3 = await S.kapi('ders-ustalik:ccna:2');
  eq([k3.acik, k3.nedenler.length], [false, 1], 'kapı kapalı: nedenler iletilir');
  kur(sahte({ data: null, error: { code: '22023', message: 'bilinmeyen kapi' } }), {});
  eq((await S.kapi('ders-ustalik:ccna:3')).ok, false, 'kapı: sunucu hatasında çökmez');
  kur(sahte({ data: null, error: null }), { cevrimici: () => false });
  eq((await S.kapi('ders-ustalik:ccna:4')).neden, 'cevrimdisi', 'kapı: çevrimdışı mesajı');
  eq((await S.kapi('')).neden, 'gecersiz', 'kapı: boş kimlik geçersiz');

  // ---- Bölüm 2: shim — claude.use("ogr") yalnız üç RPC/okuma sunar ----
  const calls = [];
  const sb = {
    auth: { getSession: async () => ({ data: { session: { user: { id: 'u1', email: 'a@b.co', user_metadata: {} } } } }), onAuthStateChange: () => {}, signOut: async () => {} },
    rpc: (ad, arg) => { calls.push({ rpc: ad, arg }); return Promise.resolve({ data: { ok: 1 }, error: null }); },
    from: (t) => { const q = { t, ops: [] }; const self = { select: (s) => { q.ops.push(['select', s]); calls.push(q); return self; }, order: () => self, limit: () => Promise.resolve({ data: [], error: null }), eq: () => self, maybeSingle: () => self, insert: () => { q.ops.push(['insert']); calls.push(q); return self; }, update: () => { q.ops.push(['update']); calls.push(q); return self; }, delete: () => { q.ops.push(['delete']); calls.push(q); return self; }, upsert: () => { q.ops.push(['upsert']); calls.push(q); return self; }, then: (a, b) => Promise.resolve({ data: null }).then(a, b) }; return self; }
  };
  const doc = { getElementById: () => ({}), createElement: () => ({ style: {}, append() {}, appendChild() {} }), addEventListener() {}, body: { appendChild() {} }, head: { appendChild() {} } };
  const win = { PP_CONFIG: { url: 'https://x.supabase.co', anonKey: 'k' }, supabase: { createClient: () => sb }, addEventListener() {}, location: { hash: '', origin: 'https://x', pathname: '/' } };
  const ctx = vm.createContext({ window: win, document: doc, location: win.location, navigator: { onLine: true }, console, setInterval: () => 0, setTimeout, clearTimeout, Promise, JSON, Object, Array, String, Number, Date, Math, Error, Blob: function () {}, URL: { createObjectURL() {}, revokeObjectURL() {} }, localStorage: globalThis.localStorage, crypto: {} });
  vm.runInContext(oku('supabase-shim.js'), ctx);
  const api = await win.claude.use('ogr');
  eq(Object.keys(api).sort(), ['denemelerim', 'gonder', 'kapi'], 'shim: ogr yeteneği yalnız gonder, kapi, denemelerim sunar (tablo yazma/silme yok)');
  await api.gonder('ders:ccna:1:sinav', 'v1', { aaaaaaaa: 'b' }, { tur: 'yok' });
  await api.kapi('ders-ustalik:ccna:1');
  await api.denemelerim(50);
  eq(calls.filter(x => x.rpc).map(x => [x.rpc, Object.keys(x.arg).sort()]), [['ogr_deneme_gonder', ['p_cevaplar', 'p_hedef', 'p_varyant', 'p_yardim']], ['ogr_kapi_degerlendir', ['p_kapi']]], 'shim: RPC adları ve parametreleri (ogr_deneme_gonder, ogr_kapi_degerlendir)');
  eq(calls.filter(x => x.t && x.t !== 'profiles').map(x => [x.t, x.ops.map(o => o[0])]), [['ogr_deneme', ['select']]], 'shim: ogr yeteneği tablolara yalnız ogr_deneme SELECT (kendi satırların; RLS) yapar (profiles: oturum açılışı adı okur)');
  ok(calls.filter(x => x.t).every(x => x.ops.every(o => o[0] === 'select')), 'shim: ogr çağrılarında hiçbir tabloya insert/update/delete/upsert gitmedi');
  ok(!/ogr_cevap_anahtari/.test(oku('supabase-shim.js')), 'shim: ogr_cevap_anahtari tablosuna hiç başvurmaz');

  // ---- Bölüm 3: ek migration DOSYASI (metin denetimi; uygulanmaz) ----
  const mig = oku('supabase/migrations/20261019_ogrenme_sunucu_sinav.sql'), kod = mig.replace(/--.*$/gm, '');
  eq(kod.match(/\b(drop|delete|truncate|update)\b/gi), null, 'migration: drop/delete/truncate/update komutu yok (yalnız ek)');
  eq(kod.match(/\binsert into [a-z_.]+/gi), ['insert into public.ogr_deneme'], 'migration: tek insert var, o da ogr_deneme\'ye (fonksiyonun deneme kaydı)');
  ok(/alter table public\.ogr_cevap_anahtari add column if not exists agirlik numeric/.test(kod) && /add column if not exists aciklama jsonb/.test(kod), 'migration: ogr_cevap_anahtari.agirlik ve .aciklama eklenir');
  ok(/create or replace function public\.ogr_deneme_gonder\(p_hedef text, p_varyant text, p_cevaplar jsonb, p_yardim jsonb default/.test(kod), 'migration: ogr_deneme_gonder aynı imzayla create or replace');
  ok(/security definer/.test(kod) && /set search_path = public, pg_temp/.test(kod), 'migration: security definer + sabit search_path');
  ok(/revoke all on function public\.ogr_deneme_gonder\(text, text, jsonb, jsonb\) from public, anon;/.test(kod) && /grant execute on function public\.ogr_deneme_gonder\(text, text, jsonb, jsonb\) to authenticated;/.test(kod), 'migration: yürütme yalnız authenticated');
  ok(/if uid is null then raise exception/.test(kod) && /pg_column_size\(p_cevaplar\) > 65536/.test(kod) && /v_sinir >= 5/.test(kod), 'migration: oturum şartı, yanıt boyut sınırı, saatte 5 deneme sınırı');
  ok(/if v_gecti then[\s\S]*jsonb_object_agg/.test(kod) && !/jsonb_build_object\([^)]*'anahtar', *\(select/.test(kod), 'migration: anahtar/açıklama yalnız "if v_gecti" bloğunda üretilir');
  ok(/auth\.uid\(\)/.test(kod) && !/p_user|p_uid|user_id *:=/.test(kod.replace(/insert into public\.ogr_deneme \(user_id/, '')), 'migration: kullanıcı kimliği auth.uid()\'den; istemci kimlik parametresi yok');
  ok(!/create policy|grant (select|insert|update|delete)[^;]* to (anon|authenticated)/i.test(kod), 'migration: ogr_cevap_anahtari için istemci politikası/yetkisi eklenmez');
  ok(/eksik ya da fazla cevap/.test(kod) && /jsonb_object_keys\(p_cevaplar\)/.test(kod), 'migration: cevaplar varyantın tüm sorularını içermeli, fazlası olmamalı (tek soru yoklama engeli)');
  ok(/in \('yok', 'ipucu', 'ai'\)/.test(kod), 'migration: yardim.tur yalnız izinli değerler');
  ok(/Geri alma/.test(mig) && /UYGULANMADI/.test(mig), 'migration: UYGULANMADI ve geri alma notu başlıkta');

  console.log(`\n${n} kontrol, ${fails} hata`);
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });

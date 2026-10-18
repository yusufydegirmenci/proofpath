// Faz 12 V4: "Bu hatalı" düğmesi + geri bildirim formu (yerel kuyruk) + güncel tutma etiketi/sayacı + geri_bildirim migration DOSYASI + aylık kaynak raporu (V5 gönderme: faz12c_gonder.js).
// Beklenenler elle yazıldı. Bölüm 1 Node'da (tarayıcısız), bölüm 2 gerçek sayfada (390 px).
const fs = require('fs');
const path = require('path');
const KOK = path.join(__dirname, '..');
let fails = 0;
const ok = (c, m) => { console.log((c ? 'OK    ' : 'HATA  ') + m); if (!c) fails++; };
const eq = (a, b, m) => { const s = JSON.stringify(a) === JSON.stringify(b); ok(s, m + (s ? '' : '  → beklenen ' + JSON.stringify(b) + ', gelen ' + JSON.stringify(a))); };
const oku = f => fs.readFileSync(path.join(KOK, f), 'utf8');
const gecerli = { tur: 'hata', baslik: 'The Save button does nothing', aciklama: 'Problem: nothing happens.\nExpected: it saves.\nActual: no reaction.', onem: '' };
const dersB = { tur: 'ders', sekme: 'ders', id: 'bk-1', baslik: 'HTTP temelleri', adim: 'anlat', eposta: 'a@b.co' };

// ---- Bölüm 1: saf mantık (Node) ----
(function () {
  const mem = {}; globalThis.localStorage = { getItem: k => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = String(v); }, removeItem: k => { delete mem[k]; } };
  globalThis.window = globalThis; globalThis.PP = {};
  ['js/ogrenme/cekirdek.js', 'js/ogrenme/depo.js', 'js/ogrenme/geri-bildirim.js'].forEach(f => require(path.join(KOK, f)));
  const G = PP.ogr.gb, D = PP.ogr.depo;

  // doğrulama
  eq(G.kontrol(gecerli).ok, true, 'geçerli form kabul');
  eq(G.kontrol({ ...gecerli, tur: 'x' }).ok, false, 'bilinmeyen tür reddedilir');
  eq(G.kontrol({ ...gecerli, baslik: 'ab' }).ok, false, '2 karakterlik başlık reddedilir');
  eq(G.kontrol({ ...gecerli, baslik: 'x'.repeat(81) }).ok, false, '81 karakterlik başlık reddedilir');
  eq(G.kontrol({ ...gecerli, aciklama: 'kısa' }).ok, false, '10 karakterden kısa açıklama reddedilir');
  eq(G.kontrol({ ...gecerli, aciklama: 'x'.repeat(2001) }).ok, false, '2001 karakterlik açıklama reddedilir');
  eq(G.kontrol({ ...gecerli, onem: 'acil' }).ok, false, 'bilinmeyen önem reddedilir');
  eq(G.kontrol({ ...gecerli, onem: 'yuksek' }).ok, true, 'önem isteğe bağlı: yuksek kabul');
  eq(G.kontrol({ ...gecerli, aciklama: 'mail me at ali@example.com please' }).uyari.length, 1, 'e-posta: engellemez ama uyarır');
  eq(G.kontrol({ ...gecerli, aciklama: 'my password: hunter2 is shown on screen' }).uyari.length, 1, 'şifre=değer biçimi uyarır');
  eq(G.kontrol(gecerli).uyari, [], 'normal metinde uyarı yok');
  eq(G.kontrol(null).ok, false, 'null form hata vermez, reddedilir');

  // bağlam: yalnız bilinen alanlar (e-posta/ad gibi ek alanlar atılır), kısaltılır
  eq(G.baglam(dersB), { tur: 'ders', sekme: 'ders', id: 'bk-1', baslik: 'HTTP temelleri', adim: 'anlat' }, 'bağlam: bilinmeyen alan (eposta) atılır');
  eq(G.baglam(null), { tur: 'genel', sekme: '', id: '', baslik: '', adim: '' }, 'bağlam: boş girdi genel olur');
  eq(G.baglam({ tur: 'proje', id: 'p'.repeat(200) }).id.length, 60, 'bağlam: kimlik 60 karaktere kısalır');
  eq(G.baglamMetni(dersB), 'ders bk-1 (HTTP temelleri) · adım: anlat · sekme: ders', 'bağlam metni okunur');

  // kuyruk: ekle, listele, düzenle, sil
  eq(G.liste(), [], 'başlangıçta kuyruk boş');
  const r1 = G.kaydet(gecerli, dersB);
  ok(r1.ok && r1.kayit.durum === 'yerel' && r1.kayit.baglam.id === 'bk-1' && r1.kayit.baglam.eposta === undefined, 'kaydet: yerel durumlu kayıt, bağlamlı, e-posta yok');
  eq(G.kaydet({ ...gecerli, baslik: '' }, dersB).ok, false, 'geçersiz form kuyruğa girmez');
  eq(G.liste().length, 1, 'kuyrukta 1 kayıt');
  const r2 = G.kaydet({ ...gecerli, tur: 'oneri', baslik: 'Add dark mode toggle' }, { tur: 'genel', sekme: 'ayar' });
  eq(G.liste().length, 2, 'ikinci kayıt eklendi');
  ok(G.liste()[0].olusturma >= G.liste()[1].olusturma, 'liste yeniden eskiye sıralı');
  const d1 = G.kaydet({ ...gecerli, baslik: 'Save button broken (edited)' }, null, r1.kayit.id);
  ok(d1.ok && d1.kayit.id === r1.kayit.id && d1.kayit.olusturma === r1.kayit.olusturma && d1.kayit.baglam.id === 'bk-1', 'düzenleme: aynı kayıt, bağlam ve ilk tarih korunur');
  eq(G.liste().length, 2, 'düzenleme yeni kayıt açmaz');
  eq(G.kaydet(gecerli, null, 'yok-id').neden, 'kayit-yok', 'olmayan kaydı düzenleme reddedilir');
  eq(G.sil(r2.kayit.id), true, 'sil: kayıt silindi');
  eq(G.sil('yok-id'), false, 'sil: olmayan kayıt false');
  eq(G.liste().map(k => k.id), [r1.kayit.id], 'silmeden sonra yalnız diğer kayıt kalır');

  // depo: başka alanlara dokunmaz, tek anahtar ya_pp_ogr
  D.denemeEkle({ id: 'x1', hedef: 'h', puan: 4, maks: 5, tarih: '2026-10-11T10:00:00Z', surum: '1' });
  G.kaydet({ ...gecerli, baslik: 'Another one here' }, { tur: 'proje', id: 'p1' });
  const ham = JSON.parse(mem.ya_pp_ogr);
  ok(ham.denemeler.length === 1 && ham.geriBildirim.kuyruk.length === 2, 'geri bildirim yazımı denemelere dokunmaz; ikisi aynı ya_pp_ogr anahtarında');
  eq(Object.keys(mem).filter(k => !/^ya_pp_ogr/.test(k)), [], 'başka depolama anahtarı oluşmadı');

  // taslak: bağlam başına, kaydedince silinir, boş taslak kayıt bırakmaz
  G.taslakKaydet({ tur: 'istek', baslik: 'Half typed', aciklama: 'abc' }, dersB);
  eq(G.taslak(dersB).baslik, 'Half typed', 'taslak geri okunur');
  eq(G.taslak({ tur: 'ders', id: 'bk-2' }), null, 'taslak bağlama özel (başka derste görünmez)');
  G.taslakKaydet({ tur: 'hata', baslik: '', aciklama: '' }, dersB);
  eq(G.taslak(dersB), null, 'boş taslak kaydı siler');
  G.taslakKaydet({ ...gecerli }, dersB); G.kaydet(gecerli, dersB);
  eq(G.taslak(dersB), null, 'kaydedilen bağlamın taslağı silinir');
  G.taslakKaydet({ ...gecerli }, dersB); G.kaydet(gecerli, null, G.liste()[0].id);
  ok(G.taslak(dersB) !== null, 'düzenleme taslağı silmez (düzenleme ayrı iştir)');
  for (let i = 0; i < 25; i++) G.taslakKaydet({ tur: 'hata', baslik: 'taslak ' + i, aciklama: 'x' }, { tur: 'ders', id: 'd' + i });
  ok(Object.keys(D.geriBildirim().taslaklar).length <= G.SINIR.taslak, 'taslak sayısı ' + G.SINIR.taslak + ' ile sınırlı');

  // kuyruk sınırı
  mem.ya_pp_ogr = JSON.stringify({ v: 1, denemeler: [], kanitlar: [], projeler: {} });
  let son = null; for (let i = 0; i < G.SINIR.kuyruk + 1; i++) son = G.kaydet(gecerli, { tur: 'genel' });
  ok(son.ok === false && son.neden === 'dolu' && G.liste().length === G.SINIR.kuyruk, 'kuyruk ' + G.SINIR.kuyruk + ' kayıtta dolar, fazlası reddedilir');

  // dışa aktarma biçimleri
  mem.ya_pp_ogr = JSON.stringify({ v: 1, denemeler: [], kanitlar: [], projeler: {} });
  const k = G.kaydet({ ...gecerli, onem: 'orta' }, dersB).kayit;
  const md = G.markdown(k);
  ok(md.startsWith('## [Hata] The Save button does nothing\n- Bağlam: ders bk-1') && /- Önem: Orta/.test(md) && /Problem: nothing happens/.test(md), 'markdown: başlık, bağlam, önem, gövde');
  ok(!/a@b\.co/.test(md), 'markdown e-posta içermez');
  const js = JSON.parse(G.jsonHepsi(G.liste()));
  ok(js.surum === 1 && js.kayitlar.length === 1 && js.kayitlar[0].id === k.id, 'json: sürüm ve kayıtlar');
  ok(G.markdownHepsi(G.liste()).startsWith('# Proofpath geri bildirimleri'), 'markdownHepsi başlıklı');

  eq(G.kontrol({ ...gecerli, aciklama: G.SABLON }).ok, false, 'boş şablon (yalnız etiketler) açıklama sayılmaz');
  eq(G.kontrol({ ...gecerli, aciklama: G.SABLON + 'x' }).ok, false, 'şablon + 1 karakter yetmez');
  eq(G.kontrol({ ...gecerli, aciklama: 'Problem: the button stays disabled.\n\nExpected:\n\nActual:\n\nSteps:\n1. ' }).ok, true, 'şablonun bir alanı doldurulmuşsa kabul');
  // bozuk elemanlı kuyruk: çökmez, bozuk elemanlar süzülür
  mem.ya_pp_ogr = JSON.stringify({ v: 1, denemeler: [], kanitlar: [], projeler: {}, geriBildirim: { kuyruk: [null, { id: 'a' }, { id: 'b', baslik: 'x', aciklama: 'y', olusturma: '2026-10-18T10:00:00Z', tur: 'hata', baglam: {} }], taslaklar: { k1: null, k2: { baslik: 'z' } } } });
  eq(G.liste().map(k => k.id), ['b'], 'bozuk kuyruk elemanları süzülür, liste çökmez');
  eq(D.geriBildirim().taslaklar, {}, 'bozuk taslaklar süzülür');
  eq(G.onemEtiket('yuksek'), 'Yüksek', 'önem etiketi Türkçe');
  // bozuk depo çökertmez
  mem.ya_pp_ogr = '{bozuk';
  eq(G.liste(), [], 'bozuk depo: boş kuyruk, hata yok');

  // içerik güncelliği özeti
  const bugun = PP.ogr.gun.bugun();
  const L = { a: { 1: { sonDogrulama: PP.ogr.gun.ekle(bugun, -10) }, 2: { sonDogrulama: PP.ogr.gun.ekle(bugun, -200) }, 3: {}, 4: { sonDogrulama: 'dün' } }, b: { 1: {} } };
  eq(PP.ogr.ders.dogrulamaOzeti(L, bugun), { toplam: 5, bayat: 1, dogrulanmadi: 3 }, 'özet: güncel 1, bayat 1, doğrulanmadı 3 (boş + geçersiz tarih)');
  eq(PP.ogr.ders.dogrulamaOzeti(null, bugun), { toplam: 0, bayat: 0, dogrulanmadi: 0 }, 'özet: boş girdi hata vermez');
})();

// ---- Migration DOSYASI (uygulanmaz): yalnız metin denetimi ----
(function () {
  const dosya = fs.readdirSync(path.join(KOK, 'supabase/migrations')).filter(f => /geri_bildirim/.test(f));
  eq(dosya.length, 1, 'tek geri_bildirim migration dosyası var');
  const sql = oku('supabase/migrations/' + dosya[0]), kod = sql.replace(/--.*$/gm, '');
  ok(/create table if not exists public\.geri_bildirim\b/i.test(kod), 'YENİ tablo geri_bildirim oluşturur');
  ['id', 'owner', 'tur', 'baslik', 'aciklama', 'baglam', 'durum', 'created_at'].forEach(c => ok(new RegExp('^\\s+' + c + '\\s', 'm').test(kod), 'kolon: ' + c));
  ok(/owner\s+uuid not null default auth\.uid\(\)/i.test(kod), 'owner auth.uid() varsayılanlı');
  ok(/enable row level security/i.test(kod), 'RLS açık');
  eq((kod.match(/create table/gi) || []).length, 1, 'yalnız bir tablo oluşturulur');
  eq(kod.match(/\b(drop|truncate)\b/gi), null, 'drop/truncate yok');
  eq(kod.match(/\bdelete\s+from\b/gi), null, 'delete from yok');
  eq(kod.match(/\bupdate\s+[\w.]+\s+set\b/gi), null, 'update … set (veri güncelleme) yok');
  eq(kod.match(/\balter\s+table\s+(?!public\.geri_bildirim\b)/gi), null, 'başka tabloya alter yok');
  const pol = kod.match(/create policy[\s\S]*?;/gi) || [];
  eq(pol.length, 2, 'tam 2 politika (select, insert)');
  ok(pol.every(p => /to authenticated/i.test(p)), 'her politika yalnız authenticated rolüne');
  ok(pol.every(p => /owner = auth\.uid\(\)/i.test(p)), 'her politika owner = auth.uid() ile sınırlı');
  eq(pol.map(p => (p.match(/for (\w+)/i) || [])[1].toLowerCase()).sort(), ['insert', 'select'], 'politikalar yalnız select ve insert (update/delete politikası yok)');
  ok(!/\bto\s+(anon|public)\b/i.test(kod.replace(/revoke[^;]*;/gi, '')), 'anon/public rolüne izin yok (revoke satırları hariç)');
  ok(/revoke all on public\.geri_bildirim from anon/i.test(kod), 'anon erişimi açıkça kaldırılır');
  ok(!/grant[^;]*\b(update|delete|truncate)\b/i.test(kod), 'update/delete/truncate yetkisi verilmez');
  ok(/check \(tur in \('hata', 'istek', 'sikayet', 'oneri'\)\)/i.test(kod) && /char_length\(btrim\(baslik\)\) between 3 and 80/i.test(kod) && /char_length\(btrim\(aciklama\)\) between 10 and 2000/i.test(kod), 'tür/başlık/açıklama CHECK kısıtları istemciyle aynı sınırlarda');
  ok(/before insert on public\.geri_bildirim/i.test(kod) && />= 10/.test(kod) && /interval '24 hours'/i.test(kod), 'günlük satır sınırı tetikleyicisi (10 / 24 saat)');
  ok(/new\.created_at := now\(\)/i.test(kod), 'created_at sunucuda zorlanır (geçmişe tarihleme ile sınır atlatılamaz)');
  ok(!/\b(email|e_posta|eposta|ad_soyad|telefon)\b/i.test(kod), 'kişisel veri kolonu yok');
  // istemci sınırları migration ile aynı olmalı
  ok(PP.ogr.gb.SINIR.baslik === 80 && PP.ogr.gb.SINIR.aciklama === 2000, 'istemci sınırları (80 / 2000) SQL ile aynı');
})();

// ---- Tablo adı yalnız gönderme mantığında ve shim'de (V5: onaylı gönderme); arayüz dosyasında ağ/GitHub kodu yok ----
(function () {
  const dosyalar = [];
  (function gez(d) { fs.readdirSync(path.join(KOK, d), { withFileTypes: true }).forEach(e => { if (e.isDirectory()) gez(d + '/' + e.name); else if (/\.(js|html)$/.test(e.name)) dosyalar.push(d + '/' + e.name); }); })('js');
  ['index.html', 'sw.js', 'config.js', 'supabase-shim.js'].forEach(f => dosyalar.push(f));
  eq(dosyalar.filter(f => /geri_bildirim/.test(oku(f))).sort(), ['js/ogrenme/geri-bildirim.js', 'supabase-shim.js'], '"geri_bildirim" tablo adı yalnız gönderme mantığında (js/ogrenme/geri-bildirim.js) ve shim içinde geçer; arayüz, sw.js, config.js, index.html çağırmaz');
  const gb = oku('js/ogrenme/geri-bildirim.js') + oku('js/ders/geri-bildirim-ui.js');
  eq(gb.match(/\bfetch\s*\(|XMLHttpRequest|sendBeacon|supabase|window\.claude|github\.com|\.from\s*\(/gi), null, 'geri bildirim kodu doğrudan ağ/Supabase/GitHub çağrısı içermez (gönderme yalnız claude.use istemcisiyle)');
})();

// ---- Aylık kaynak raporu: dönüştürücü ve yol koruması (ağsız) ----
(function () {
  const A = require(path.join(KOK, 'tests/kaynak/aylik.js'));
  const r = { toplam: 3, ok: 1, belirsiz: [{ url: 'https://b.example/x', durum: 403, yer: 'y', baslik: 'B | pipe' }], bozuk: [{ url: 'https://a.example/', durum: 404, yer: ['ccna-1'], baslik: 'A' }], baslikUyumsuz: [] };
  const md = A.markdown(r, '2026-10-18');
  ok(md.startsWith('# Kaynak denetimi 2026-10-18') && /Toplam 3 tekil adres · HTTP 200: 1 · belirsiz \(bot engeli\): 1 · bozuk: 1/.test(md), 'rapor başlığı ve özet satırı');
  ok(/## Bozuk \(1\)/.test(md) && /\| 404 \| https:\/\/a\.example\/ \| A \| ccna-1 \|/.test(md), 'bozuk tablo satırı');
  ok(/B \\\| pipe/.test(md), 'tablo hücresindeki | kaçırılır');
  ok(!/## Başlık uyumsuz/.test(md), 'boş bölüm yazılmaz');
  eq([A.disarida(KOK), A.disarida(path.join(KOK, 'raporlar')), A.disarida(path.join(KOK, '..', 'proofpath-ops', 'raporlar'))], [false, false, true], 'hedef klasör repo dışında olmalı (içi reddedilir)');
  const { spawnSync } = require('child_process');
  const ic = spawnSync(process.execPath, [path.join(KOK, 'tests/kaynak/aylik.js'), '--ops=' + path.join(KOK, 'tests')], { encoding: 'utf8' });
  ok(ic.status === 2 && /public repoya yazılmaz/.test(ic.stderr), 'repo içi hedef: betik hata verip yazmadan çıkar');
  const yok = spawnSync(process.execPath, [path.join(KOK, 'tests/kaynak/aylik.js'), '--ops=' + path.join(require('os').tmpdir(), 'pp-yok-' + Date.now())], { encoding: 'utf8' });
  ok(yok.status === 2 && /Rapor klasörü yok/.test(yok.stderr), 'olmayan hedef klasör oluşturulmaz, hata verir');
  const tmp = fs.mkdtempSync(path.join(require('os').tmpdir(), 'pp-aylik-')), js = path.join(tmp, 'r.json'); fs.writeFileSync(js, JSON.stringify(r));
  const yaz = spawnSync(process.execPath, [path.join(KOK, 'tests/kaynak/aylik.js'), '--ops=' + tmp, '--json=' + js], { encoding: 'utf8' });
  const cikti = fs.readdirSync(tmp).filter(f => /^kaynak-\d{4}-\d{2}-\d{2}\.md$/.test(f));
  ok(yaz.status === 0 && cikti.length === 1 && /# Kaynak denetimi/.test(fs.readFileSync(path.join(tmp, cikti[0]), 'utf8')), '--json ile ağsız: kaynak-<tarih>.md yazılır');
})();

// ---- Bölüm 2: gerçek sayfa (390 px) ----
(async () => {
  const { INIT, chromium } = require('./stub.js');
  const U = require('url').pathToFileURL(path.join(KOK, 'index.html')).href;
  const b = await chromium.launch(), ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.addInitScript(INIT); await ctx.addInitScript("localStorage.ya_gm_seen='1';");
  const p = await ctx.newPage(), errs = []; p.on('pageerror', e => { errs.push(e.message); console.log('PAGEERR ' + e.message); });
  await p.goto(U + '#ders'); await p.waitForTimeout(3500);
  const ev = (f, a) => p.evaluate(f, a);
  const say = s => ev(s => document.querySelectorAll(s).length, s);
  const tasma = () => ev(() => document.documentElement.scrollWidth <= innerWidth + 1);
  const ac = (t, n, adim) => ev(([t, n, adim]) => { const l = lessonForTopic(t, 's-' + t + '-' + n); if (!S.lessons.some(x => x.id === l.id)) S.lessons.push(l); S.les.track = t; lcSet(lessonKey(l), 'w', t); lrOpen(l, adim); return l.id + '|' + l.title; }, [t, n, adim]);

  // 1) Ders odasında "Bu hatalı" → form bağlamla açılır
  const [lid, ltitle] = (await ac('bk', 1, 'anlat')).split('|'); await p.waitForTimeout(300);
  eq(await say('.lr-head [data-gb=ac]'), 1, 'ders odası başlığında "Bu hatalı" düğmesi var');
  eq(await say('[data-gb=form]'), 0, 'form başta kapalı');
  await p.click('[data-gb=ac]'); await p.waitForTimeout(200);
  eq(await say('[data-gb=form]'), 1, 'düğmeye basınca form açılır');
  const bag = await ev(() => document.querySelector('[data-gb=baglam]').textContent);
  ok(bag.includes('ders ' + lid) && bag.includes('(' + ltitle + ')') && bag.includes('adım: anlat') && bag.includes('sekme: ders'), 'bağlam otomatik dolu: ' + bag);
  eq(await say('[data-gb-tur]'), 4, 'dört tür seçeneği');
  ok(await tasma(), 'form açıkken 390 px yatay taşma yok');

  // 2) Taslak kaybolmaz: yaz, formu kapat, sayfayı yenile, tekrar aç
  await p.fill('[data-gb=baslik]', 'Quiz answer looks wrong'); await p.fill('[data-gb=aciklama]', 'Question 2 shows the wrong option as correct.');
  await p.click('[data-gb-tur=sikayet]');
  await p.click('[data-gb=vazgec]'); await p.waitForTimeout(150);
  eq(await say('[data-gb=form]'), 0, 'Kapat formu kapatır');
  await p.reload(); await p.waitForTimeout(3500);
  await ac('bk', 1, 'anlat'); await p.waitForTimeout(300); await p.click('[data-gb=ac]'); await p.waitForTimeout(200);
  eq(await ev(() => [document.querySelector('[data-gb=baslik]').value, document.querySelector('[data-gb=aciklama]').value, document.querySelector('[data-gb-tur=sikayet]').getAttribute('aria-pressed')]), ['Quiz answer looks wrong', 'Question 2 shows the wrong option as correct.', 'true'], 'yenilemeden sonra taslak (başlık, açıklama, tür) geri geldi');
  await ac('bk', 2, 'anlat'); await p.waitForTimeout(250); await p.click('[data-gb=ac]'); await p.waitForTimeout(150);
  eq(await ev(() => document.querySelector('[data-gb=baslik]').value), '', 'başka dersin formu boş (taslak bağlama özel)');
  await ac('bk', 1, 'anlat'); await p.waitForTimeout(250); await p.click('[data-gb=ac]'); await p.waitForTimeout(150);

  // 3) Doğrulama hatası, şablon, kaydet
  await p.fill('[data-gb=baslik]', 'ab'); await p.click('[data-gb=kaydet]'); await p.waitForTimeout(150);
  ok(await ev(() => /en az 3/.test((document.querySelector('[data-gb=hata]') || {}).textContent || '')), 'kısa başlıkta hata mesajı görünür, kayıt eklenmez');
  eq(await ev(() => PP.ogr.gb.liste().length), 0, 'geçersiz form kuyruğa girmedi');
  await p.fill('[data-gb=baslik]', 'Quiz answer looks wrong'); await p.fill('[data-gb=aciklama]', ''); await p.click('[data-gb=sablon]'); await p.waitForTimeout(150);
  ok(await ev(() => /^Problem:\n\nExpected:\n\nActual:\n\nSteps:/.test(document.querySelector('[data-gb=aciklama]').value)), 'şablon Problem / Expected / Actual / Steps ekler');
  await p.fill('[data-gb=aciklama]', 'Problem: option B is marked correct.\nExpected: option C.\nActual: B.\nSteps: open quiz, answer question 2.');
  await p.click('[data-gb=kaydet]'); await p.waitForTimeout(250);
  eq(await say('[data-gb=form]'), 0, 'kaydedince form kapanır');
  const k0 = await ev(() => PP.ogr.gb.liste());
  ok(k0.length === 1 && k0[0].tur === 'sikayet' && k0[0].durum === 'yerel' && k0[0].baglam.id === lid && k0[0].baglam.adim === 'anlat', 'kuyrukta 1 yerel kayıt, bağlamıyla');
  eq(await ev(() => PP.ogr.gb.taslak({ tur: 'ders', id: PP.ogr.gb.liste()[0].baglam.id })), null, 'kaydedilen bağlamın taslağı temizlendi');
  eq(await ev(() => Object.keys(JSON.parse(localStorage.ya_pp_ogr)).includes('geriBildirim')), true, 'kayıt ya_pp_ogr altında');

  // 4) Hassas bilgi uyarısı: ilk basış uyarır, ikinci basış kaydeder
  await p.click('[data-gb=ac]'); await p.waitForTimeout(150);
  await p.fill('[data-gb=baslik]', 'Login page shows my key'); await p.fill('[data-gb=aciklama]', 'It prints api key: sk-12345 on the page.');
  await p.click('[data-gb=kaydet]'); await p.waitForTimeout(150);
  ok(await ev(() => /kişisel bilgi/.test(document.querySelector('[data-gb=hata]').textContent)) && (await ev(() => PP.ogr.gb.liste().length)) === 1, 'gizli bilgi benzeri metinde ilk basış uyarır, kaydetmez');
  await p.click('[data-gb=kaydet]'); await p.waitForTimeout(200);
  eq(await ev(() => PP.ogr.gb.liste().length), 2, 'ikinci basış kaydeder (uyarı engel değil)');

  // 5) Ayarlar: liste, düzenle, kopyala, dışa aktar, sil
  await ev(() => goTab('ayar')); await p.waitForTimeout(400);
  eq(await say('[data-gb-kayit]'), 2, 'Ayarlar\'da 2 kayıt listelenir');
  ok(await ev(() => /bu cihazda, gönderilmedi/.test(document.querySelector('[data-gb-kayit]').textContent)), 'kayıtta "bu cihazda, gönderilmedi" yazar');
  ok(await tasma(), 'Ayarlar kuyruk listesi: 390 px yatay taşma yok');
  await p.locator('[data-gb-kayit]').last().locator('[data-gb=duzenle]').click(); await p.waitForTimeout(200);
  eq(await say('[data-gb=form]'), 1, 'Düzenle formu açar');
  const eskiBaslik = await ev(() => document.querySelector('[data-gb=baslik]').value);
  await p.fill('[data-gb=baslik]', 'Quiz answer is wrong (edited)'); await p.click('[data-gb=kaydet]'); await p.waitForTimeout(200);
  eq(await ev(() => PP.ogr.gb.liste().length), 2, 'düzenleme kayıt sayısını artırmaz');
  ok(await ev((e) => PP.ogr.gb.liste().some(k => k.baslik === 'Quiz answer is wrong (edited)') && !PP.ogr.gb.liste().some(k => k.baslik === e), eskiBaslik), 'düzenlenen başlık kaydedildi');
  // dışa aktarma: S.dl.save'e giden içerik
  await ev(() => { window.__dl = []; S.dl = { save: async (o) => { window.__dl.push(o); } }; });
  await p.click('[data-gb=json]'); await p.click('[data-gb=md]'); await p.waitForTimeout(200);
  const dl = await ev(() => window.__dl);
  ok(dl.length === 2 && /^proofpath-geri-bildirim-\d{4}-\d{2}-\d{2}\.json$/.test(dl[0].filename) && JSON.parse(dl[0].data).kayitlar.length === 2, 'JSON dışa aktarma: dosya adı ve 2 kayıt');
  ok(/\.md$/.test(dl[1].filename) && dl[1].data.startsWith('# Proofpath geri bildirimleri') && (dl[1].data.match(/^## \[/gm) || []).length === 2, 'Markdown dışa aktarma: 2 başlık');
  // S.dl yokken bağlantı ile indirme
  await ev(() => { S.dl = null; });
  const [indirme] = await Promise.all([p.waitForEvent('download', { timeout: 5000 }), p.click('[data-gb=md]')]);
  ok(/^proofpath-geri-bildirim-.*\.md$/.test(indirme.suggestedFilename()), 'S.dl yoksa tarayıcı indirmesi çalışır');
  // kopyala: pano yoksa yedek yol hata vermez
  await ev(() => { window.__kop = null; Object.defineProperty(navigator, 'clipboard', { value: { writeText: async (t) => { window.__kop = t; } }, configurable: true }); });
  await p.click('[data-gb-kayit] [data-gb=kopyala]'); await p.waitForTimeout(250);
  ok(await ev(() => typeof window.__kop === 'string' && window.__kop.startsWith('## [')), 'Kopyala: kaydın markdown metni panoya gider');
  await p.click('[data-gb=hepsini-kopyala]'); await p.waitForTimeout(250);
  ok(await ev(() => window.__kop.startsWith('# Proofpath geri bildirimleri')), 'Hepsini kopyala: toplu markdown');
  // sil: iki adım
  await p.click('[data-gb-kayit] [data-gb=sil]'); await p.waitForTimeout(150);
  eq(await ev(() => PP.ogr.gb.liste().length), 2, 'Sil ilk basışta silmez (onay ister)');
  await p.click('[data-gb=sil-evet]'); await p.waitForTimeout(200);
  eq(await ev(() => PP.ogr.gb.liste().length), 1, 'onaydan sonra silinir');
  // genel geri bildirim
  await p.click('[data-gb=yeni]'); await p.waitForTimeout(150);
  ok(await ev(() => /genel · sekme: ayar/.test(document.querySelector('[data-gb=baglam]').textContent)), 'Ayarlar\'dan açılan form genel bağlamlı');

  // 6) Proje ekranında "Bu hatalı"
  await ev(() => { goTab('proje'); pjStart(PATHS[0].projects[0].id); }); await p.waitForTimeout(400);
  eq(await say('.pjhead [data-gb=ac]'), 1, 'proje ekranında "Bu hatalı" düğmesi var');
  await p.click('.pjhead [data-gb=ac]'); await p.waitForTimeout(200);
  ok(await ev((pid) => { const t = document.querySelector('[data-gb=baglam]').textContent; return t.includes('proje ' + pid) && t.includes('sekme: proje'); }, await ev(() => PATHS[0].projects[0].id)), 'proje formu proje kimliğiyle açılır');
  ok(await tasma(), 'proje ekranı + form: 390 px yatay taşma yok');
  // kendi projesi: başlık bağlama girmez (kişisel olabilir)
  const kendi = await ev(() => { const g = PP.ogr.gb.baglam({ tur: 'proje', id: 'pabc', baslik: '', sekme: 'proje' }); return PP.ogr.gb.baglamMetni(g); });
  eq(kendi, 'proje pabc · sekme: proje', 'kendi projesinde başlık bağlamda yok');

  // 7) VA ders ekranında düğme
  const va = await ev(() => { if (!window.PP_VA || !PP.va) return null; S.va = null; renderVeriAnalitigi(); S.va.ders = PP_VA.dersler[0].id; const root = document.createElement('div'); renderVeriAnalitigi().forEach(x => root.append(x)); return root.querySelectorAll('[data-va-acik] [data-gb=ac]').length; });
  eq(va, 1, 'Veri Analitiği açık dersinde "Bu hatalı" düğmesi var');

  // 8) Güncel tutma: etiket ve sayaç
  await ev(() => goTab('ders')); await ac('bk', 20, 'anlat'); await p.waitForTimeout(250);
  eq(await ev(() => { const e = document.querySelector('.lr-meta [data-dogrulama]'); return e ? [e.dataset.dogrulama, e.textContent] : null; }), ['yok', 'doğrulanmadı'], 'sonDogrulama boşsa derste "doğrulanmadı" etiketi (tarih uydurulmaz)');
  const etk = await ev(() => { const t = PP.ogr.gun.ekle(PP.ogr.gun.bugun(), -10), e = PP.ogr.gun.ekle(PP.ogr.gun.bugun(), -200); return [lrDogrulamaEtiket({ sonDogrulama: t }).dataset.dogrulama, lrDogrulamaEtiket({ sonDogrulama: e }).dataset.dogrulama, lrDogrulamaEtiket({ sonDogrulama: 'dün' }).dataset.dogrulama]; });
  eq(etk, ['guncel', 'bayat', 'yok'], 'etiket: güncel / bayat / geçersiz tarih = doğrulanmadı');
  await ev(() => { S.les.room = null; S.les.view = 'ders'; goTab('ders'); }); await p.waitForTimeout(400);
  eq(await say('[data-guncellik]'), 1, 'Dersler listesinde güncellik satırı var');
  await ev(() => goTab('bugun')); await p.waitForTimeout(400);
  eq(await say('[data-guncellik]'), 1, 'Bugün ekranında güncellik satırı var');
  const sayac = await ev(() => { const o = PP.ogr.ders.dogrulamaOzeti(window.PP_LESSONS), e = document.querySelector('[data-guncellik]'); return { o, metin: e.textContent }; });
  ok(sayac.o.toplam > 50 && sayac.o.bayat === 0 && sayac.o.dogrulanmadi === sayac.o.toplam, 'şu an hiçbir derste tarih yok: bayat 0, hepsi doğrulanmadı (' + JSON.stringify(sayac.o) + ')');
  ok(sayac.metin.includes(sayac.o.toplam + ' ders') && sayac.metin.includes('0 bayat (6 ay+)') && sayac.metin.includes(sayac.o.dogrulanmadi + ' doğrulanmadı'), 'sayaç metni özetle aynı: ' + sayac.metin);
  const bayat = await ev(() => { const L = window.PP_LESSONS.bk; L[9999] = { sonDogrulama: PP.ogr.gun.ekle(PP.ogr.gun.bugun(), -250) }; const e = gbGuncellik(); delete L[9999]; const s = e.querySelector('[data-guncellik-bayat]'); return [s.dataset.guncellikBayat, s.style.color, s.textContent]; });
  eq(bayat, ['1', 'var(--bad)', '1 bayat (6 ay+)'], 'bir ders 6 aydan eskiyse sayaç 1 bayat gösterir ve kırmızılaşır');
  ok(await tasma(), 'Bugün: 390 px yatay taşma yok');

  ok(errs.length === 0, 'sayfa hatası yok ' + errs.join('|'));
  await b.close();
  console.log(fails ? '\nKALDI: ' + fails : '\nGEÇTİ');
  process.exit(fails ? 1 : 0);
})();

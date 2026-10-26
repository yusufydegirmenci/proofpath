// Faz 13: günlük lig puanı sunucuda hesaplanır. (1) tohum/migration/istemci dosyalarının statik denetimi, (2) gerçek sayfada akış (sahte sunucuyla):
// istemci ham puan göndermez/yazmaz, puan sunucu yanıtından gelir, çevrimdışı/yetenek-yok durumunda cevap kaydedilmez, aynı sıra tekrar cevaplanmaz.
// Gerçek Supabase'e bağlanılmaz; SQL Postgres'te ÇALIŞTIRILMADI (bu test migration'ı yalnız metin olarak denetler). Hata → çıkış 1.
const fs = require('fs'), path = require('path');
const { INIT, chromium } = require('./stub.js');
const { SAHTE_INIT } = require('./sunucu_sahte.js');
const T = require('../tools/lig-anahtar.js');
const KOK = path.join(__dirname, '..');
const oku = (f) => fs.readFileSync(path.join(KOK, f), 'utf8');
const U = require('url').pathToFileURL(path.join(KOK, 'index.html')).href;
let n = 0, fails = 0;
const ok = (c, m) => { n++; console.log((c ? 'OK    ' : 'HATA  ') + m); if (!c) fails++; };
const eq = (a, b, m) => { const s = JSON.stringify(a) === JSON.stringify(b); ok(s, m + (s ? '' : '  → beklenen ' + JSON.stringify(b) + ', gelen ' + JSON.stringify(a))); };

(async () => {
  // ---- Bölüm 1: statik ----
  const seed = oku('supabase/seed/20261025_lig_soru_tohumu.sql');
  ok(seed.replace(/\r\n/g, '\n') === T.uret(), 'tohum QB ile güncel (node tools/lig-anahtar.js)');
  const QB = T.qbKur(), beklenen = QB.filter((q) => q.t === 'ccna' || q.t === 'eng').length;
  eq([(seed.match(/^  \(\d+, '(ccna|eng)', [123], [0-5]\)/gm) || []).length, beklenen > 100], [beklenen, true], 'tohum: her ccna/eng sorusu için tam bir satır (' + beklenen + ')');
  // elle seçilmiş bir soru: QB'deki gerçek zorluk/doğru şık tohumda aynı
  const i0 = QB.findIndex((q) => q.t === 'eng' && q.d === 3);
  ok(seed.includes('  (' + i0 + ", 'eng', 3, " + QB[i0].a + ')'), 'tohum: QB[' + i0 + '] (eng, zor) doğru şıkla birebir');

  const mig = oku('supabase/migrations/20261025_lig_sunucu.sql');
  ok(/create or replace function public\.ogr_lig_gonder/.test(mig) && /security definer/.test(mig) && /set search_path = public, pg_temp/.test(mig), 'migration: ogr_lig_gonder security definer + sabit search_path');
  ok(/revoke all on function public\.ogr_lig_gonder[^;]*from public, anon/.test(mig) && /grant execute on function public\.ogr_lig_gonder[^;]*to authenticated/.test(mig), 'migration: RPC yalnız authenticated');
  ok(/alter table public\.ogr_lig_soru enable row level security/.test(mig) && /revoke all on public\.ogr_lig_soru from anon, authenticated/.test(mig), 'migration: anahtar tablosu istemciye kapalı');
  ok(/auth\.uid\(\)/.test(mig) && /oturum gerekli/.test(mig), 'migration: oturum şartı');
  ok(/'bu soru zaten cevaplandi'/.test(mig) && /'tur bitti'/.test(mig) && /not between 1 and 10/.test(mig), 'migration: sıra başına tek cevap, gün başına ≤10 soru');
  ok(/round\(10 \* v_c\)/.test(mig) && /v_pts \+ 5/.test(mig) && /when 1 then 1 when 2 then 1\.5 else 2/.test(mig), 'migration: puan kuralı sunucuda (10×katsayı, tam doğruya +5)');
  ok(/create trigger docs_lig_koru before insert or update on public\.docs/.test(mig) && /new\.data - 'd'/.test(mig), 'migration: tetikleyici istemci "d" yazımını yok sayar');
  ok(!/update public\.docs set[^;]*updated_at/.test(mig), 'migration: RPC updated_at\'e dokunmaz (istemci taban sürümü bozulmaz)');
  ok(!/\b(drop table|delete from|truncate)\b/i.test(mig.replace(/--.*$/gm, '')), 'migration: yalnızca ek (rollback yorumda)');

  const lig = ['lig-profil', 'lig-isler', 'lig-gazete', 'lig-ekran'].map((x) => oku('js/lig/' + x + '.js')).join(' ');
  ok(/ligGonder\(today\(\)/.test(lig), 'istemci: cevap ogr.ligGonder ile gönderilir');
  ok(!/day\.(pts|ok|wok|tot|w)\s*=(?!=)/.test(lig), 'istemci: puan/doğru sayısı alanlarını artık yerelde hesaplamaz');
  const kabuk = oku('supabase-shim.js');
  ok(/ligGonder:[\s\S]{0,200}sb\.rpc\("ogr_lig_gonder"/.test(kabuk), 'shim: ogr yeteneği ogr_lig_gonder RPC\'sini açar');

  // ---- Bölüm 2: tarayıcı ----
  const b = await chromium.launch();
  const sayfa = async (ek) => {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
    await ctx.addInitScript(INIT); await ctx.addInitScript(SAHTE_INIT);
    if (ek) await ctx.addInitScript(ek);
    const p = await ctx.newPage(); p.errs = []; p.on('pageerror', (e) => p.errs.push(e.message));
    await p.goto(U + '#lig'); await p.waitForTimeout(1500);
    return p;
  };
  const bugun = (p) => p.evaluate(() => { const d = new Date(), z = (x) => String(x).padStart(2, '0'); return d.getFullYear() + '-' + z(d.getMonth() + 1) + '-' + z(d.getDate()); });
  const tikla = async (p, soru, sik) => { await p.evaluate(([s, k]) => document.querySelectorAll('#view .qc')[s].querySelectorAll('.qo')[k].click(), [soru, sik]); await p.waitForTimeout(250); };
  const benim = (p, gun) => p.evaluate((g) => { const l = window.__store.league.uOwner; return l && l.d ? l.d[g] : null; }, gun);

  // 2a) mutlu yol: ilk cevap soru listesini bildirir, sonrakiler bildirmez; puan sunucu yanıtıdır
  let p = await sayfa();
  const gun = await bugun(p);
  const N = await p.evaluate(() => document.querySelectorAll('#view .qc').length);
  ok(N >= 3, 'lig sekmesi günün sorularını gösteriyor (' + N + ')');
  const qs0 = await p.evaluate(() => { const L = window.__ogrDurum; return L && L.ligCagrilari ? L.ligCagrilari.length : 0; });
  eq(qs0, 0, 'cevap öncesi sunucuya lig çağrısı yok');
  await tikla(p, 0, 0);
  let D = await p.evaluate(() => window.__ogrDurum);
  eq([D.ligCagrilari.length, D.ligCagrilari[0].gun, D.ligCagrilari[0].sira, D.ligCagrilari[0].secenek, Array.isArray(D.ligCagrilari[0].sorular) && D.ligCagrilari[0].sorular.length === N],
    [1, gun, 0, 0, true], 'ilk cevap: sunucuya gün, sıra, SEÇİM (ve soru listesi) gider');
  ok(!('pts' in D.ligCagrilari[0]) && Object.keys(D.ligCagrilari[0]).every((k) => ['gun', 'sira', 'secenek', 'sorular', 'tekrar', 'seviye'].includes(k)), 'istemci sunucuya puan/doğru bilgisi göndermez');
  let d1 = await benim(p, gun);
  const sunucudaki = await p.evaluate((g) => window.__ogrDurum.lig[g], gun);
  eq(d1, sunucudaki, 'yerel belge, sunucu yanıtıyla birebir (puan sunucudan)');
  await tikla(p, 1, 1);
  D = await p.evaluate(() => window.__ogrDurum);
  eq([D.ligCagrilari.length, D.ligCagrilari[1].sorular], [2, null], 'ikinci cevap: soru listesi tekrar gönderilmez');
  eq((await benim(p, gun)).tot, 2, 'iki cevap sonrası tot = 2 (sunucu sayımı)');
  // aynı soruya ikinci kez tıklama: istemci zaten yollamaz
  await p.evaluate(() => { const o = document.querySelectorAll('#view .qc')[0].querySelectorAll('.qo')[2]; if (o) o.click(); });   // yanlışsa kart çevrilmiştir, şık yoktur
  eq((await p.evaluate(() => window.__ogrDurum.ligCagrilari.length)), 2, 'cevaplanmış soru tekrar tıklanınca sunucuya gitmez');
  ok(p.errs.length === 0, 'sayfa hatası yok: ' + p.errs.join('|'));
  await p.context().close();

  // 2b) sunucu "yanlış" derse istemci kendi QB\'sine bakıp puan YAZMAZ
  p = await sayfa(() => { const t = setInterval(() => { if (window.__ogrDurum) { clearInterval(t); window.__ogrDurum.ligZorlaYanlis = true; } }, 5); });
  const g2 = await bugun(p);
  await p.evaluate(() => {   // QB'deki doğru şıkkı tıkla (istemci yerelde doğru sanır)
    const kart = document.querySelectorAll('#view .qc')[0], metin = kart.querySelector('.qq').textContent;
    const q = window.QB.find((x) => x.q === metin); kart.querySelectorAll('.qo')[q.a].click();
  });
  await p.waitForTimeout(300);
  const d2 = await benim(p, g2);
  eq([d2.tot, d2.ok, d2.pts], [1, 0, 0], 'sunucu yanlış derse yerel puan 0 (istemci doğruluğu kendisi hesaplamaz)');
  await p.context().close();

  // 2c) çevrimdışı: cevap kaydedilmez, mesaj görünür, soru açık kalır, yeniden denenebilir
  p = await sayfa(() => { const t = setInterval(() => { if (window.__ogrDurum) { clearInterval(t); window.__ogrDurum.cevrimdisi = true; } }, 5); });
  const g3 = await bugun(p);
  await tikla(p, 0, 0);
  eq(await benim(p, g3), null, 'çevrimdışı: yerel belgeye puan yazılmadı');
  const metin = await p.textContent('#view');
  ok(/Cevap kaydedilmedi/.test(metin) && /sunucuda hesaplanır/.test(metin), 'çevrimdışı: Türkçe mesaj görünüyor');
  eq(await p.evaluate(() => document.querySelectorAll('#view .qc')[0].querySelectorAll('.qo:disabled').length), 0, 'çevrimdışı: şıklar yeniden denemek için açık');
  await p.evaluate(() => { window.__ogrDurum.cevrimdisi = false; });
  await tikla(p, 0, 0);
  eq((await benim(p, g3) || {}).tot, 1, 'bağlantı gelince yeniden deneme kaydedilir');
  await p.context().close();

  // 2d) sunucu yeteneği yok (örn. Artifact ortamı): kayıt yok, mesaj var
  p = await sayfa(() => { window.__ogrSahte = null; });
  const g4 = await bugun(p);
  await tikla(p, 0, 0);
  eq(await benim(p, g4), null, 'yetenek yok: puan yazılmadı');
  ok(/bu ortamda sunucu yok/.test(await p.textContent('#view')), 'yetenek yok: Türkçe mesaj');
  await p.context().close();

  // 2e) sunucu hazır değil (RPC yok): özel mesaj
  p = await sayfa(() => { const t = setInterval(() => { if (window.__ogrDurum) { clearInterval(t); window.__ogrDurum.hata = { code: 'PGRST202', message: 'Could not find the function' }; } }, 5); });
  await tikla(p, 0, 0);
  ok(/henüz hazır değil/.test(await p.textContent('#view')), 'RPC yoksa "henüz hazır değil" mesajı');
  await p.context().close();

  await b.close();
  console.log('\n' + n + ' kontrol, ' + fails + ' hata');
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });

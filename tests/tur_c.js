// Tur C (canlı öncesi düzeltme): Y3 sahip adı sızmaz, Y2 hedef tek kaynak, Y5 seviye testi açılır, Y1 giriş kartı + hesapsız deneme, O7, O6b, D4.
// Beklenenler uygulama kodundan değil, kurallardan (hedef kimliği, sabit sayılar, metinler) elle yazıldı.
// Gerçek hesapla kayıt / e-posta onayı / gerçek veritabanı bu testte YOK (sahte supabase istemcisi): "doğrulanamadı".
const fs = require('fs');
const path = require('path');
const { INIT, chromium } = require('./stub.js');
const kok = path.join(__dirname, '..');
const U = require('url').pathToFileURL(path.join(kok, 'index.html')).href;
let fails = 0;
const ok = (c, m) => { console.log((c ? 'OK    ' : 'HATA  ') + m); if (!c) fails++; };
const eq = (a, b, m) => { const s = JSON.stringify(a) === JSON.stringify(b); ok(s, m + (s ? '' : '  → beklenen ' + JSON.stringify(b) + ', gelen ' + JSON.stringify(a))); };

const GOALS = { ccna: 'CCNA', net: 'Network', qa: 'Test Uzmanı', bk: 'Backend', dev: 'DevOps', sec: 'Siber', eng: 'İngilizce' };

(async () => {
  /* ---------- Y3: sahip adı, statik tarama ---------- */
  const html = fs.readFileSync(path.join(kok, 'index.html'), 'utf8');
  const yerel = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]).filter(s => !/^https?:/.test(s));
  const dosyalar = yerel.concat(['index.html', '404.html', 'config.js', 'manifest.webmanifest', 'supabase-shim.js']);
  fs.readdirSync(path.join(kok, 'content', 'nwscenes')).forEach(f => dosyalar.push('content/nwscenes/' + f));
  // Yalnız kurucu hesabında (S.nonOwner=false) görünen dallar: kimlik adı. Yeni kullanıcıya gitmez (aşağıdaki çalışma-zamanı taraması bunu doğrular).
  const IZIN = [
    /S\.nonOwner\?\(\(S\.names&&S\.me&&S\.names\[S\.me\]\)\|\|""\):"Yusuf"/g,
    /S\.nonOwner\?"Kullanıcı":"Yusuf"/g,
    /:"Yusuf Ankara'da[^"]*"/g
  ];
  const sizan = [];
  dosyalar.forEach(f => {
    let s = fs.readFileSync(path.join(kok, f), 'utf8');
    IZIN.forEach(r => { s = s.replace(r, ''); });
    if (/yusuf|degirmenci|yyd251|@gmail\.com/i.test(s)) sizan.push(f);
  });
  eq(sizan, [], 'Y3: yüklenen kodda/içerikte sahip adı, kullanıcı adı, e-posta yok (izinli: kurucu dalı)');
  ok(/proofpath-kimlik\.png/.test(fs.readFileSync(path.join(kok, 'js/arayuz/cila-kimlik.js'), 'utf8')), 'Y3: kimlik dosyası adı proofpath-kimlik.png');

  const b = await chromium.launch();
  const yeni = async (w, ek, onsoz) => {
    const ctx = await b.newContext({ viewport: { width: w, height: 844 } });
    await ctx.addInitScript('window.__guest=true'); if (onsoz) await ctx.addInitScript(onsoz); await ctx.addInitScript(INIT); if (ek) await ek(ctx);
    const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.goto(U + '#bugun'); await p.waitForTimeout(1500); return { ctx, p, errs };
  };

  /* ---------- Y3: yeni kullanıcı çıktısı + git komutları ---------- */
  {
    const { ctx, p, errs } = await yeni(390);
    const metin = await p.evaluate(() => {
      const ids = TABS.map(t => t[0]).concat(['proje', 'mul', 'rehber', 'sozluk', 'oduller', 'ayar']), out = {};
      ids.forEach(id => { try { goTab(id); out[id] = document.body.innerText; } catch (e) { out[id] = 'HATA ' + e.message; } });
      return out;
    });
    const sizdi = Object.keys(metin).filter(k => /yusuf/i.test(metin[k]));
    eq(sizdi, [], 'Y3: yeni kullanıcı çıktısında tüm sekmelerde "Yusuf" yok');
    const pn = await p.evaluate(() => {
      goTab('proje');
      const def = PATHS[0].projects[0], panel = exportPanel({ title: def.title, steps: [], notes: [] }, def);
      document.body.appendChild(panel);
      const pre = panel.querySelector('pre.lcode'), inp = panel.querySelector('input[type=text]');
      const once = pre.textContent, uyari0 = panel.textContent;
      inp.value = 'ornek-kisi'; inp.dispatchEvent(new Event('input', { bubbles: true }));
      return { once, uyari0, sonra: pre.textContent, gh: S.pj.gh, bos: inp.getAttribute('placeholder') };
    });
    ok(/github\.com\/<GitHub-kullanıcı-adın>\//.test(pn.once) && /Önce GitHub kullanıcı adını yaz/.test(pn.uyari0), 'Y3: ad boşken komutta yer tutucu + "önce adını yaz" uyarısı');
    ok(/github\.com\/ornek-kisi\//.test(pn.sonra) && !/<GitHub/.test(pn.sonra), 'Y3: ad yazılınca komutlar anında güncellenir');
    ok(!/yusuf/i.test(pn.once + pn.sonra), 'Y3: komutlarda sahip adı yok');
    eq(errs, [], 'Y3: sayfa hatası yok');
    await ctx.close();
  }

  /* ---------- Y2: her hedefte plan hedefe uygun ---------- */
  for (const g of Object.keys(GOALS)) {
    const { ctx, p, errs } = await yeni(390);
    const r = await p.evaluate(g => {
      S.nonOwner = true; S.onb = { goal: g, hrs: 5, done: true }; onbApply(S.onb);
      const TN = trName(g), cevap = { goal: goalTrack(), set: goalSet(), pr: S.pr.track, les: S.les.track, pl: S.pl.track };
      goTab('bugun');
      const v = document.getElementById('view').innerText;
      const tile = (document.querySelector('.bg-t.bg-c') || {}).innerText || '';
      const planEl = document.querySelector('[data-plan="panel"]');
      const plan = planEl ? planEl.innerText : '';
      const kisisel = [...document.querySelectorAll('.panel')].filter(x => /Sıradaki ders:/.test(x.innerText)).map(x => x.innerText)[0] || '';
      const N = cityTopics(g).length;
      goTab('oyun'); goTab('bugun'); // yeniden çiz
      const marka = (document.querySelector('.awm span') || {}).textContent;
      const karne = [...document.querySelectorAll('.kcell .kl')].map(x => x.textContent);
      const idS = idStats();
      goTab('atolye'); S.at2.sec = 'alistirma'; draw();
      const sayilar = (() => { try { return renderNumbers().map(x => x.textContent).join('|'); } catch (e) { return 'HATA ' + e.message; } })();
      return { TN, cevap, tile, plan, kisisel, N, marka, karne, idS: { gn: idS.gn, t: idS.ccnaT }, sayilar, trks: personalInput().tracks.map(t => t.track), var: !!(window.PP_LESSONS && PP_LESSONS[g] && STARTER[g]), brand: brandLine() };
    }, g);
    const TN = GOALS[g];
    eq(r.cevap, { goal: g, set: g === 'eng' ? ['eng'] : [g, 'eng'], pr: g, les: g, pl: g }, `Y2/${g}: goalTrack tek kaynak; Alıştırma/Ders/Seviye testi varsayılanı hedef`);
    ok(r.N > 0 && new RegExp('\\b' + r.N + ' bina').test(r.tile), `Y2/${g}: Bugün şehir kartı hedefin ${r.N} konusunu sayar ("${r.tile.replace(/\n/g, ' ')}")`);
    ok(r.plan.indexOf('Plan yolu: ' + TN) >= 0, `Y2/${g}: "Plan yolu: ${TN}"`);
    ok(r.trks.every(t => t === g || t === 'eng') && (r.trks.indexOf(g) >= 0 || !r.var), `Y2/${g}: kişisel plan yalnız hedef + İngilizce izlerinden ("${r.trks}")`);
    if (r.kisisel) ok(r.kisisel.indexOf(TN + ' rotasında') >= 0 || r.kisisel.indexOf('İngilizce rotasında') >= 0, `Y2/${g}: "Sıradaki ders" kartı hedef rotasını anar`);
    if (g !== 'ccna') {
      ok(!/CCNA/.test(r.plan) && !/CCNA/.test(r.tile) && !/CCNA/.test(r.kisisel), `Y2/${g}: Bugün plan/şehir/kişisel kartlarında CCNA yok`);
      ok(!/CCNA/.test(r.idS.gn), `Y2/${g}: Kimlik kartı etiketi hedefe bağlı (${r.idS.gn})`);
      ok(!/CCNA/.test(r.sayilar) || /Network/.test(TN), `Y2/${g}: Sayılar'da CCNA başlığı yok`);
    }
    ok(r.sayilar.indexOf(TN + ' deneme sınavları') >= 0 && r.sayilar.indexOf(TN + ' konu alanları') >= 0, `Y2/${g}: Sayılar başlıkları ${TN}`);
    ok(r.karne[0] === TN, `Y2/${g}: karne ilk hücre ${TN} ("${r.karne[0]}")`);
    ok(r.marka === r.brand && (g === 'ccna' || g === 'net' || !/^Ağ ve/.test(r.marka)), `Y2/${g}: marka alt satırı hedefe bağlı ("${r.marka}")`);
    eq(errs, [], `Y2/${g}: sayfa hatası yok`);
    await ctx.close();
  }

  /* ---------- Y5: onboarding → seviye testi gerçekten açılır; "sıfırdan" cevabı yeniden sorulmaz ---------- */
  for (const yol of ['test', 'sifirdan']) {
    const { ctx, p, errs } = await yeni(390, null, 'window.__noOnb=true');
    await p.waitForTimeout(500);
    const on = await p.evaluate(() => ({ goal: [...document.querySelectorAll('button')].some(x => /Siber güvenlik/.test(x.textContent)) }));
    ok(on.goal, `Y5/${yol}: onboarding hedef seçimi görünür`);
    await p.click('button:has-text("Siber güvenlik")'); await p.click('button:has-text("5 saat")');
    if (yol === 'test') {
      await p.click('button:has-text("Seviye testini yap")'); await p.waitForTimeout(900);
      const s = await p.evaluate(() => {
        const el = document.getElementById('pp-seviye'), r = el ? el.getBoundingClientRect() : null;
        return { on: S.pl.on, track: S.pl.track, var: !!el, gorunur: !!r && r.top >= 0 && r.top < innerHeight, odak: !!el && el.contains(document.activeElement), soru: el ? /· 1 \/ 6/.test(el.innerText) : false, tab: tab };
      });
      ok(s.on && s.track === 'sec' && s.var && s.soru, 'Y5/test: test açıldı (Siber, 1 / 6)');
      ok(s.gorunur, 'Y5/test: seviye testi görünüme kaydırıldı (ekranda)');
      ok(s.odak, 'Y5/test: odak test başlığında');
    } else {
      await p.click('button:has-text("Sıfırdan başlıyorum")'); await p.waitForTimeout(300);
      const s = await p.evaluate(() => {
        S.les.track = 'sec'; goTab('ders'); const d = document.getElementById('view').innerText;
        goTab('bugun'); const b = document.getElementById('view').innerText;
        return { pl: plLoad().sec, ders: /nereden başlayalım/.test(d), bugunSor: /Seviyeni belirle|Yeni misin\?/.test(b) && /· 1 \/ 6/.test(b) };
      });
      ok(s.pl && s.pl.skip === true, 'Y5/sıfırdan: onboarding cevabı seviye kaydına yazıldı');
      ok(!s.ders, 'Y5/sıfırdan: Ders ekranı seviyeyi yeniden sormuyor');
    }
    eq(errs, [], `Y5/${yol}: sayfa hatası yok`);
    await ctx.close();
  }

  /* ---------- Y1: giriş kartı (gerçek shim + sahte supabase istemcisi) ---------- */
  {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
    await ctx.route('**/supabase.js', r => r.abort());
    await ctx.addInitScript(() => {
      window.__sbCalls = 0; window.__ag = 0;
      const say = () => { window.__sbCalls++; return Promise.resolve({ data: { session: null }, error: null }); };
      const yak = new Proxy(function () {}, { get: (_, k) => (k === 'then' ? undefined : yak), apply: () => { window.__sbCalls++; return Promise.resolve({ data: { session: null }, error: null }); } });
      window.supabase = { createClient: () => ({ auth: { getSession: say, onAuthStateChange() { window.__sbCalls++; return { data: { subscription: {} } }; }, signInWithPassword: say, signUp: say, resetPasswordForEmail: say, updateUser: say, signOut: say }, from: () => yak }) };
      const f = window.fetch; window.fetch = function () { window.__ag++; return f.apply(this, arguments); };
    });
    const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.goto(U); await p.waitForTimeout(1500);
    const k = await p.evaluate(() => {
      const w = document.querySelector('.wrap'), c = document.querySelector('.ppa-wrap');
      return { kart: !!c, inert: !!w && w.inert === true, gizli: !!w && getComputedStyle(w).display === 'none', gorunen: document.body.innerText, vp: document.querySelectorAll('.ppg-vp li').length,
        gizlilik: !!document.querySelector('.ppg-gz summary'), deneme: !![...document.querySelectorAll('.ppa-link')].find(x => /Hesapsız bir ders dene/.test(x.textContent)), gosterVar: !![...document.querySelectorAll('.ppa-link')].find(x => /Şifreyi göster/.test(x.textContent)) };
    });
    ok(k.kart && k.inert && k.gizli, 'Y1: oturum yokken uygulama kabuğu inert ve gizli');
    await p.waitForTimeout(13500);
    const gec = await p.evaluate(() => ({ inert: document.querySelector('.wrap').inert, gizli: getComputedStyle(document.querySelector('.wrap')).display === 'none', kart: !!document.querySelector('.ppa-wrap') }));
    ok(gec.kart && gec.inert && gec.gizli, 'Y1: kart 12 sn’den uzun açık kalsa da kabuk inert/gizli kalır (yedek zamanlayıcı kabuğu açmaz)');
    ok(!/İyi (akşamlar|günler)|Günaydın|Yusuf/i.test(k.gorunen), 'Y1: giriş ekranında sahip adı/selamı görünmüyor');
    eq(k.vp, 3, 'Y1: 3 satır değer önerisi');
    ok(k.gizlilik && k.deneme && k.gosterVar, 'Y1: gizlilik notu, "Hesapsız bir ders dene", şifre göster var');
    const sifre = await p.evaluate(() => { const i = document.querySelector('input[type=password]'); const b = [...document.querySelectorAll('.ppa-link')].find(x => /Şifreyi göster/.test(x.textContent)); b.click(); const a = i.type; b.click(); return [a, i.type]; });
    eq(sifre, ['text', 'password'], 'Y1: şifre göster/gizle çalışır');
    await p.click('button:has-text("Hesabım yok, kayıt ol")'); await p.waitForTimeout(200);
    const kayit = await p.evaluate(() => ({ ip: (document.getElementById('ppg-ip') || {}).textContent, vp: document.querySelectorAll('.ppg-vp li').length, desc: document.querySelector('input[type=password]').getAttribute('aria-describedby') }));
    eq(kayit, { ip: 'En az 8 karakter.', vp: 3, desc: 'ppg-ip' }, 'Y1: kayıt formunda "en az 8 karakter" ipucu (aria-describedby) ve değer önerisi');
    // Hesapsız deneme: yerel, kayıtsız, sunucuya gitmez
    const once = await p.evaluate(() => ({ sb: window.__sbCalls, ag: window.__ag, ls: Object.keys(localStorage).sort(), ss: Object.keys(sessionStorage).sort() }));
    await p.click('button:has-text("Hesapsız bir ders dene")'); await p.waitForTimeout(200);
    const demo = await p.evaluate(() => ({ baslik: (document.querySelector('.ppg-demo h2') || {}).textContent, odak: document.activeElement && document.activeElement.tagName, form: document.querySelector('form.ppa-card').hidden }));
    ok(/Deneme dersi/.test(demo.baslik) && demo.form === true, 'Y1: hesapsız deneme açıldı');
    for (let i = 0; i < 6; i++) {
      await p.click('.ppg-demo .ppg-opt >> nth=0'); await p.waitForTimeout(80);
      const fb = await p.evaluate(() => (document.querySelector('.ppg-demo .ppg-fb') || {}).textContent || '');
      if (i === 0) ok(/^(Doğru\.|Doğrusu:)/.test(fb) && fb.length > 20, 'Y1: deneme sınavı anında açıklamalı geri bildirim verir');
      await p.click('.ppg-demo button.ppa-btn'); await p.waitForTimeout(60);
    }
    const son = await p.evaluate(() => (document.querySelector('.ppg-demo .ppg-fb') || {}).textContent);
    ok(/Mini sınav bitti: \d \/ 6 doğru/.test(son || ''), 'Y1: deneme sonunda sonuç ve hesap açma çağrısı');
    const sonra = await p.evaluate(() => ({ sb: window.__sbCalls, ag: window.__ag, ls: Object.keys(localStorage).sort(), ss: Object.keys(sessionStorage).sort() }));
    eq(sonra, once, 'Y1: hesapsız deneme sunucu çağrısı, ağ isteği ve depolama yazımı yapmaz');
    await p.click('.ppg-demo button.ppa-btn:has-text("Hesap oluştur")'); await p.waitForTimeout(200);
    const don = await p.evaluate(() => ({ demo: !!document.querySelector('.ppg-demo'), baslik: document.querySelector('form.ppa-card h1').textContent }));
    eq(don, { demo: false, baslik: 'Hesap oluştur' }, 'Y1: "Hesap oluştur" denemeyi kapatıp kayıt formuna döner');
    eq(errs, [], 'Y1: sayfa hatası yok');
    await ctx.close();
  }

  /* ---------- Y1: oturum açıkken (stub) kabuk açık ---------- */
  {
    const { ctx, p } = await yeni(390);
    const s = await p.evaluate(() => { const w = document.querySelector('.wrap'); return { acik: ppGate.acik(), inert: w.inert, sinif: document.documentElement.className, bekle: !!document.getElementById('ppg-bekle') }; });
    ok(s.acik && !s.inert && !/ppg-kapali/.test(s.sinif) && !s.bekle, 'Y1: oturum/hesap türü belli olunca kabuk açılır');
    await ctx.close();
  }

  /* ---------- O7: veri yokken hazırlık puanı ---------- */
  {
    const { ctx, p } = await yeni(390);
    const r = await p.evaluate(() => {
      S.nonOwner = true; GS.sk = trkMap(1.5); GS.st = {}; GS.bx = {}; S.projects = []; S.interview = [];
      const bos = atJobs().map(x => x.textContent).join('|');
      GS.st = { 0: [1, 1] }; const dolu = atJobs().map(x => x.textContent).join('|');
      return { bos: /Hazırlık puanı\s*Henüz ölçülmedi/.test(bos) && /Soru çöz ya da seviye testi yap/.test(bos) && !/Hazırlık puanı\s*\d+ \/ 100/.test(bos), dolu: /Hazırlık puanı\s*\d+ \/ 100/.test(dolu) };
    });
    ok(r.bos, 'O7: veri yokken "Henüz ölçülmedi" (9 / 100 yok)');
    ok(r.dolu, 'O7: veri varken sayısal puan görünür');
    await ctx.close();
  }

  /* ---------- O6(b): CDN hatası kısa Türkçe + Tekrar dene ---------- */
  {
    const { ctx, p } = await yeni(390, c => c.route('**/cdn.jsdelivr.net/**', r => r.abort()));
    const r = await p.evaluate(async () => {
      const a = PP_VA.alanlar.find(x => x.tur === 'sql'); const kutu = PP.alan.kur(PP.alan.tanimla(Object.assign({}, a, { veri: PP_VA.veri })).alan, {});
      document.body.appendChild(kutu); kutu.querySelector('[data-alan="calistir"]').click();
      for (let i = 0; i < 60 && !kutu.querySelector('[data-alan-durum="kullanilamiyor"]'); i++) await new Promise(r => setTimeout(r, 200));
      const d = kutu.querySelector('[data-alan-durum="kullanilamiyor"]');
      return { metin: d ? d.textContent : null, tekrar: !!kutu.querySelector('[data-alan="tekrar"]') };
    });
    ok(r.metin && /kullanılamıyor/.test(r.metin) && !/https?:|jsdelivr/.test(r.metin), 'O6b: CDN hatası URL göstermeden kısa Türkçe mesaj: ' + r.metin);
    ok(r.tekrar, 'O6b: "Tekrar dene" düğmesi var');
    await ctx.close();
  }

  /* ---------- D4: 404.html ---------- */
  {
    const h404 = fs.readFileSync(path.join(kok, '404.html'), 'utf8');
    ok(/<html lang="tr"/.test(h404) && /Ana sayfaya dön/.test(h404) && /href="\.\/"/.test(h404), 'D4: 404.html Türkçe, ana sayfaya dönüş bağlantısı var');
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
    const p = await ctx.newPage();
    await p.goto(require('url').pathToFileURL(path.join(kok, '404.html')).href);
    const t = await p.evaluate(() => ({ h1: document.querySelector('h1').textContent, a: document.getElementById('ana').getAttribute('href'), tasma: document.documentElement.scrollWidth > innerWidth }));
    ok(/bulunamadı/.test(t.h1) && !t.tasma && /^\/|\.\//.test(t.a), 'D4: 404 sayfası açılır, taşma yok (' + t.a + ')');
    await ctx.close();
  }

  await b.close();
  console.log(fails ? '\n' + fails + ' HATA' : '\nTur C testleri geçti');
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error('ÇÖKTÜ', e); process.exit(2); });

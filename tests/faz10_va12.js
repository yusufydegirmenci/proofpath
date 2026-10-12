// Faz 10 tur 3: Veri Analitiği Seviye 1 (elektronik tablo) + Seviye 2 (SQL): 16 ders (15 öğe), her derste çalışan alan, kontrol veriden sayar,
// varyant testi (sabit cevap reddedilir), değerlendirmeler, 8 proje, arayüz (390 px). Çözümler tests/va-cozumler-*.json (public kodda cevap yok).
// Gerçek çalıştırma jsDelivr'den sql.js/Pyodide indirir; ağ yoksa o bölümler "ATLANDI" yazar (geçti sayılmaz).
const path = require('path'), fs = require('fs');
const { INIT, chromium } = require('./stub.js');
const U = require('url').pathToFileURL(path.join(__dirname, '..', 'index.html')).href;
let fails = 0;
const ok = (c, m) => { console.log((c ? 'OK    ' : 'HATA  ') + m); if (!c) fails++; };
const eq = (a, b, m) => { const s = JSON.stringify(a) === JSON.stringify(b); ok(s, m + (s ? '' : '  → beklenen ' + JSON.stringify(b) + ', gelen ' + JSON.stringify(a))); };

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.addInitScript('window.__guest=true'); await ctx.addInitScript(INIT);
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(U + '#atolye'); await p.waitForTimeout(1500);
  const ev = (f, a) => p.evaluate(f, a);

  // 1) Müfredat: Seviye 1–2 hazır, SQL 13 alt konu = 13 ders
  eq(await ev(() => PP_VA.mufredatDogrula(PP_VA.mufredat)), [], 'müfredat/önkoşul grafiği tutarlı');
  const ids = await ev(() => PP_VA.dersler.filter(d => d.seviye).map(d => d.id));
  eq(ids, ['va1-1', 'va1-2', 'va1-3'].concat(Array.from({ length: 13 }, (_, i) => 'va2-' + (i + 1))), 'Seviye 1: 3 ders; Seviye 2: 13 ders (SQL alt konu sırasıyla)');
  eq(await ev(() => PP_VA.dersler.filter(d => d.seviye === 2).length), 13, 'Seviye 2 dersleri seviye=2 işaretli');

  // 2) Dersler: 15 öğe + geçerli bilgi kontrolü + kaynak
  const ders = await ev(() => PP_VA.dersler.filter(d => d.seviye).map(d => ({
    id: d.id,
    n: [!!(d.hedefler && d.hedefler.length >= 2 && d.onkosul), !!d.aciklama, !!(d.terimler && d.terimler.length >= 4), !!(d.ornek && d.ornek.length >= 3), !!(d.analoji && d.analoji.a), !!(d.analoji && d.analoji.sinir), !!d.gorsel,
      !!(d.rehberli && d.rehberli.length >= 3), !!d.bagimsiz, !!(d.hatalar && d.hatalar.length >= 3), !!(d.kontrol && d.kontrol.length >= 4), !!(d.gecme && d.gecme.olcut && d.gecme.kritik && d.gecme.kritik.length >= 2), true, Array.isArray(d.kaynaklar), !!(d.telafi && d.sonraki)].filter(Boolean).length,
    kontrolGecerli: d.kontrol.every(q => q.o.length === 4 && q.a >= 0 && q.a < 4 && q.why && q.bolum && new Set(q.o).size === 4),
    kaynak: d.kaynaklar.every(k => /^https:\/\/(www\.sqlite\.org|www\.postgresql\.org|support\.google\.com|support\.microsoft\.com|learn\.microsoft\.com|docs\.python\.org)\//.test(k.u) && /^\d{4}-\d{2}-\d{2}$/.test(k.dogrulama) && k.neden),
    uzun: JSON.stringify(d).length
  })));
  eq(ders.map(d => d.n), ders.map(() => 15), '16 ders M§7 15 öğesinin hepsini taşıyor (' + ders.filter(d => d.n !== 15).map(d => d.id).join(',') + ')');
  ok(ders.every(d => d.kontrolGecerli), 'bilgi kontrolü: 4 farklı şık, geçerli cevap, neden ve bölüm: ' + ders.filter(d => !d.kontrolGecerli).map(d => d.id).join(','));
  ok(ders.every(d => d.kaynak), 'dış kaynaklar izinli alan adı + https + doğrulama tarihi');
  ok(ders.every(d => d.uzun > 2500), 'her ders içeriği boş değil (>2500 karakter)');
  const dag = await ev(() => { const h = [0, 0, 0, 0]; PP_VA.dersler.filter(d => d.seviye).forEach(d => d.kontrol.forEach(q => h[q.a]++)); return h; });
  ok(dag.filter(x => x > 0).length >= 3, 'doğru şık konumları çeşitli ' + JSON.stringify(dag));

  // 3) Veri setleri: bağımsız sayım
  const veri = await ev(() => {
    const k = PP_VA.veriKirli, s = PP_VA.veriSql, ix = (v, c) => v.sutunlar.indexOf(c);
    const kimlik = k.satirlar.map(r => r.join('|')), tek = new Set(kimlik);
    return { kN: k.satirlar.length, kTekrar: kimlik.length - tek.size, kMetinAdet: k.satirlar.filter(r => typeof r[ix(k, 'adet')] === 'string').length, kBosFiyat: k.satirlar.filter(r => r[ix(k, 'fiyat')] === '').length,
      kSehir: [...new Set(k.satirlar.map(r => r[ix(k, 'sehir')]))].length, sN: s.satirlar.length, mus: s.ek.musteri.satirlar.length, urun: s.ek.urun.satirlar.length, hedef: s.ek.hedef.satirlar.length,
      siparisMusteri: new Set(s.satirlar.map(r => r[ix(s, 'musteri_id')])).size, musteriFk: s.satirlar.every(r => s.ek.musteri.satirlar.some(m => m[0] === r[ix(s, 'musteri_id')])), urunFk: s.satirlar.every(r => s.ek.urun.satirlar.some(u => u[0] === r[ix(s, 'urun')])) };
  });
  eq(veri, { kN: 13, kTekrar: 1, kMetinAdet: 1, kBosFiyat: 1, kSehir: 6, sN: 12, mus: 9, urun: 5, hedef: 4, siparisMusteri: 8, musteriFk: true, urunFk: true }, 'sentetik veri: kirli set ve SQL seti tutarlı');

  // 4) Alan tanımları
  const al = await ev(() => PP_VA.alanlar.filter(a => /^va[12]-/.test(a.id)).map(a => ({ id: a.id, ders: a.ders, tur: a.tur, varyant: typeof a.varyant === 'function', kon: a.kontrol.length, ip: (a.ipucu || []).length, anahtar: Object.keys(a).filter(k => /cevap|anahtar|beklenen|cozum|çözüm/i.test(k)) })));
  ok(al.length >= 16, 'Seviye 1–2 alan sayısı ' + al.length);
  const dersAlan = await ev(() => PP_VA.dersler.filter(d => d.seviye).map(d => [d.id, PP_VA.alanlar.filter(a => a.ders === d.id && (a.tur === 'sql' || a.tur === 'python')).length]));
  eq(dersAlan.filter(x => x[1] < 1).map(x => x[0]), [], 'her derste en az 1 SQL/Python alanı');
  eq(al.filter(a => a.tur !== 'sim' && !a.varyant).map(a => a.id), [], 'çalışan her alanda varyant tanımlı (sabit cevap testi)');
  eq(al.filter(a => a.anahtar.length || a.kon !== 2 || a.ip < 2).map(a => a.id), [], 'alan tanımlarında cevap alanı yok; kontrol (sonuç, veri); en az 2 ipucu');
  const sim = await ev(() => PP_VA.alanlar.filter(a => /^va1-/.test(a.id) && a.tur === 'sim').map(a => PP.alan.tanimla(Object.assign({}, a, { veri: a.veri || PP_VA.veri })).alan.etiket));
  ok(sim.length >= 3 && sim.every(e => /^simülasyon/.test(e)), 'elektronik tablo alanları "simülasyon" etiketli (' + sim.length + ')');
  eq(await ev(() => PP_VA.alanlar.filter(a => /^va[12]-/.test(a.id)).every(a => PP.alan.tanimla(Object.assign({}, a, { veri: a.veri || PP_VA.veri })).ok)), true, 'alan tanımları PP.alan.tanimla ile geçerli');
  eq(await ev(() => { const k = PP_VA.alanlar.filter(a => /^va2-/.test(a.id)).map(a => a.id); return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].filter(n => !k.includes('va2-' + n + '-sql')); }), [], 'Seviye 2: her ders için va2-N-sql var');

  // 5) Değerlendirmeler
  const sn = await ev(() => [1, 2].map(L => { const S = PP_VA['sinav' + L], dg = PP_VA.dersler.filter(d => d.seviye === L).map(d => d.id); return { n: S.sorular.length, esik: S.esik, gecerli: S.sorular.every(q => q.o.length === 4 && q.a >= 0 && q.a < 4 && dg.includes(q.bolum)), farkli: new Set(S.sorular.map(q => q.bolum)).size, konum: [...new Set(S.sorular.map(q => q.a))].length, bos: !PP.va.sinav([], L).ok, tam: PP.va.sinav(S.sorular.map(q => q.a), L), yanlis: PP.va.sinav(S.sorular.map(q => (q.a + 1) % 4), L) }; }));
  ok(sn[0].n === 6 && sn[1].n === 10 && sn.every(x => x.esik === 0.8 && x.gecerli && x.bos && x.konum >= 2), 'sinav1 (6 soru) ve sinav2 (10 soru): geçerli, bölüm eşlemesi doğru, eşik %80');
  ok(sn[1].farkli >= 7, 'sinav2 en az 7 farklı dersi kapsar (' + sn[1].farkli + ')');
  ok(sn.every(x => x.tam.ok && x.tam.gecti && !x.yanlis.gecti && x.yanlis.yanlis.length === x.yanlis.maks && x.yanlis.yanlis.every(y => y.telafi && y.dersId)), 'değerlendirme: hepsi doğru geçer, hepsi yanlış kalır ve telafi derse bağlanır');

  // 6) İlerleme
  await ev(() => localStorage.removeItem('ya_pp_ogr'));
  eq(await ev(() => { const D = PP.va.durum(); return [D.seviyeler[1].tamam, D.seviyeler[2].tamam, D.seviyeler[1].bekleyen.length, D.seviyeler[2].alanToplam > 10]; }), [false, false, 2, true], 'başlangıç: Seviye 1–2 tamam değil');
  await ev(() => { PP_VA.dersler.filter(d => d.seviye === 1).forEach(d => PP.va.dersOkundu(d.id)); });
  eq(await ev(() => PP.va.durum().seviyeler[1].tamam), false, 'Seviye 1: dersleri okumak tek başına tamamlamaz');
  await ev(() => PP.va.sinavKaydet(PP.va.sinav(PP_VA.sinav1.sorular.map(q => q.a), 1)));
  eq(await ev(() => [PP.va.durum().seviyeler[1].tamam, PP.va.durum().seviyeler[1].sinavDenemesi, PP.va.durum().seviyeler[2].tamam, PP.va.durum().sinavDenemesi]), [true, 1, false, 0], 'Seviye 1: ders + değerlendirme → tamam; Seviye 0/2 kaydı ayrı');
  eq(await ev(() => PP.va.alanKaydet('va2-1-sql', false).ok), true, 'Seviye 2 alanı kaydedilir');
  eq(await ev(() => PP.va.durum().seviyeler[2].alanCozulen), 1, 'alan çözüldü sayısı artar ama Seviye 2 tamam saymaz');

  // 7) Projeler
  const pr = await ev(() => {
    const L = PP_PROJ.va.filter(j => j.seviye === 1 || j.seviye === 2), tum = PP_VA.alanlar.map(a => a.id).concat([PP_VA.alanSim.id]);
    const A = ['onkosul', 'gereksinim', 'kabul', 'rubrik', 'savunma', 'yetkinlikler'];
    return { n: L.length, sev: [1, 2].map(s => L.filter(j => j.seviye === s).length), td: L.map(j => PP.rapor.tanimDenetimi(j).tanimli), eksik: L.filter(j => !A.every(a => Array.isArray(j[a]) && j[a].length) || !j.telafi || !j.sonraki).map(j => j.id),
      adim: L.map(j => j.steps.length), kabulBicim: L.filter(j => !j.kabul.every(k => /^K\d+: .+ \| Test: .+/.test(k))).map(j => j.id), telafiK: L.filter(j => !j.kabul.every((k, i) => new RegExp('K' + (i + 1) + '(?!\\d)').test(j.telafi))).map(j => j.id),
      alanVar: L.every(j => (j.alan || []).length && j.alan.every(a => tum.includes(a))), alanNotu: L.every(j => /doğrulanmam/.test(j.alanNotu || '')), acilir: L.filter(j => /açılır/.test(j.sonraki)).map(j => j.id), url: L.filter(j => /https?:\/\//.test(JSON.stringify(j))).map(j => j.id),
      rozet: L.filter(j => /rozet kazan|sertifika(yı)? (aldın|kazandın)/i.test(JSON.stringify(j))).map(j => j.id), tek: new Set(L.map(j => j.title.toLowerCase())).size === L.length && new Set(PP_PROJ.va.map(j => j.id)).size === PP_PROJ.va.length,
      belge: L.filter(j => !['README', 'sözlü', 'metodoloji|varsayım', 'test|doğrula|kontrol', 'sınırlama'].every(r => new RegExp(r, 'i').test(j.steps.map(s => s.t).join(' | ')))).map(j => j.id) };
  });
  eq([pr.n, pr.sev], [8, [4, 4]], 'Seviye 1: 4 proje, Seviye 2: 4 proje');
  ok(pr.td.every(x => x === 10) && !pr.eksik.length, 'projelerde 10/10 alan, telafi ve sonraki dolu ' + pr.eksik.join(','));
  ok(pr.adim.every(x => x === 7) && !pr.kabulBicim.length, 'her projede 7 adım; kabul ölçütleri "K#: … | Test: …"');
  eq(pr.telafiK, [], 'telafi her K ölçütünü sayıyor');
  ok(pr.alanVar && pr.alanNotu, 'projeler yalnız var olan alan kimliklerine bağlı; alan notu "doğrulanmamış" kısmı söylüyor');
  eq([pr.acilir, pr.url, pr.rozet], [[], [], []], 'projelerde "açılır" (kilit zorlanmıyor), dış bağlantı, rozet/sertifika iddiası yok');
  ok(pr.tek, 'proje kimlikleri ve başlıkları benzersiz');
  eq(pr.belge, [], 'her projede README/sözlük/metodoloji/test/sınırlama adımı bulunuyor');
  const tmz = await ev(() => { const out = {}, eks = []; PATHS.forEach(y => y.projects.forEach(j => { if (['sup1b', 'sup4c'].includes(j.id)) out[j.id] = /açılır/.test(j.sonraki); if (j.cekirdek && j.kabul) j.kabul.forEach((k, i) => { if (!new RegExp('K' + (i + 1) + '(?!\\d)').test(j.telafi)) eks.push(j.id + ':K' + (i + 1)); }); })); return { out, eks }; });
  eq(tmz.out, { sup1b: false, sup4c: false }, 'sup1b/sup4c "sonraki" metni "açılır" demiyor');
  eq(tmz.eks, [], 'tüm çekirdek projelerde telafi her K ölçütünü sayıyor');

  // 8) Gerçek SQL/Python
  const agVar = await ev(async () => { try { const r = await fetch('https://cdn.jsdelivr.net/npm/sql.js@1.10.3/dist/sql-wasm.js', { method: 'HEAD', mode: 'cors' }); return r.ok; } catch (e) { return false; } });
  const cozum = fs.readdirSync(__dirname).filter(f => /^va-cozumler-.*\.json$/.test(f)).flatMap(f => JSON.parse(fs.readFileSync(path.join(__dirname, f), 'utf8')));
  ok(cozum.length >= 16, 'çözüm dosyalarında ' + cozum.length + ' alan çözümü');
  const kapsam = await ev(() => PP_VA.alanlar.filter(a => /^va[12]-/.test(a.id) && a.tur !== 'sim').map(a => a.id));
  eq(kapsam.filter(id => !cozum.some(c => c.id === id)), [], 'çalışan her alan için test çözümü var');
  if (!agVar) { console.log('ATLANDI  ağ yok: gerçek SQL/Python çalıştırma testleri yapılmadı (test edilmedi)'); }
  else {
    let dogru = 0, yanlisRed = 0, sabitRed = 0, sabitDene = 0; const hatali = [];
    for (const c of cozum.filter(x => x.tur === 'sql' || x.tur === 'python')) {
      const r = await ev(async ([id, kod, yanlislar]) => {
        const a = PP_VA.alanlar.find(x => x.id === id); if (!a) return { yok: true };
        const d = PP.alan.tanimla(Object.assign({}, a, { veri: a.veri || PP_VA.veri })).alan;
        const ana = await PP.alan.degerlendir(d, kod, { yuklemeMs: 60000 });
        const y = []; for (const k of yanlislar || []) { const q = await PP.alan.degerlendir(d, k, { yuklemeMs: 60000 }); y.push(q.dogru === true); }
        let sabit = null;
        if (ana.dogru && ana.sonuc) {
          let kod2 = null;
          if (d.tur === 'sql' && ana.sonuc.satirlar && ana.sonuc.satirlar.length) kod2 = ana.sonuc.satirlar.map(r => 'SELECT ' + r.map(x => x === null ? 'NULL' : typeof x === 'number' ? String(x) : "'" + String(x).replace(/'/g, "''") + "'").join(', ')).join(' UNION ALL ');
          if (d.tur === 'python' && ana.sonuc.sonucTanimli) kod2 = 'import json\nsonuc = json.loads(' + JSON.stringify(JSON.stringify(ana.sonuc.deger)) + ')';
          if (kod2) { const s = await PP.alan.degerlendir(d, kod2, { yuklemeMs: 60000 }); sabit = s.dogru === true; }
        }
        return { ok: ana.ok, dogru: ana.dogru, mesaj: ana.mesaj, yanlis: y, sabit };
      }, [c.id, c.cozum, c.yanlis]);
      if (r.yok) { hatali.push(c.id + ':alan-yok'); continue; }
      if (r.dogru) dogru++; else hatali.push(c.id + ':çözüm-reddedildi ' + String(r.mesaj).slice(0, 120));
      r.yanlis.forEach(y => { if (!y) yanlisRed++; else hatali.push(c.id + ':yanlış-kabul'); });
      if (r.sabit !== null) { sabitDene++; if (r.sabit === false) sabitRed++; else hatali.push(c.id + ':sabit-kabul'); }
    }
    eq(hatali, [], 'gerçek çalıştırma: çözümler kabul, yanlışlar ve sabit cevaplar reddedilir (doğru ' + dogru + ', yanlış-reddedilen ' + yanlisRed + ', sabit-reddedilen ' + sabitRed + '/' + sabitDene + ')');
    ok(dogru >= 16 && sabitDene >= 16, 'en az 16 alan gerçekten çalıştırıldı ve sabit-cevap sınandı (' + dogru + '/' + sabitDene + ')');
  }

  // 9) Arayüz (390 px)
  await ev(() => { localStorage.removeItem('ya_pp_ogr'); S.va = null; S.at2.sec = 'va'; goTab('atolye'); }); await p.waitForTimeout(400);
  ok(await ev(() => document.querySelectorAll('[data-va-ders]').length === 19), 'arayüzde 19 ders başlığı (3 + 3 + 13)');
  ok(await ev(() => !!document.querySelector('[data-va=sinav1]') && !!document.querySelector('[data-va=sinav2]') && !!document.querySelector('[data-va=projeler1]') && !!document.querySelector('[data-va=projeler2]')), 'Seviye 1–2 değerlendirme ve proje panelleri görünür');
  ok(await ev(() => document.querySelectorAll('[data-va-proje]').length === 12), '12 proje (4 + 4 + 4) listede');
  for (const id of ['va1-2', 'va2-5']) {
    await ev(id => document.querySelector('[data-va-ders="' + id + '"]').click(), id); await p.waitForTimeout(300);
    const r = await ev(id => { const el = document.querySelector('[data-va-acik="' + id + '"]'); return { kodla: el.querySelectorAll('[data-va-alanlar]').length, paneller: el.querySelectorAll('[data-va-alanlar] > .lbox, [data-va-alanlar] > div').length, metin: /sentetik/i.test(el.textContent), tasma: document.documentElement.scrollWidth <= innerWidth + 1 }; }, id);
    ok(r.kodla === 1 && r.metin && r.tasma, id + ': "Kodla dene" bölümü, sentetik veri notu, yatay taşma yok ' + JSON.stringify(r));
  }
  ok(await ev(() => /Seviye 0–2 hazır/.test(document.querySelector('[data-va=ozet]').textContent) && !/sertifika(yı)? (aldın|kazandın|hak ettin)/i.test(document.body.innerText)), 'özet Seviye 0–2 hazır der; sertifika kazanıldı iddiası yok');
  ok(await ev(() => /doğrulanmadı/.test(document.querySelector('[data-va=sertifika]').textContent)), 'PL-300 "doğrulanmadı"');
  await ev(() => PP_VA.sinav2.sorular.forEach((q, i) => document.querySelector('[data-va-sec="2:' + i + ':' + ((q.a + 1) % 4) + '"]').click())); await p.waitForTimeout(200);
  await ev(() => document.querySelector('[data-va=sinav-bitir2]').click()); await p.waitForTimeout(250);
  ok(await ev(() => document.querySelector('[data-va=sinav2] [data-va-sinav]').dataset.vaSinav === 'kaldi' && /Telafi:/.test(document.querySelector('[data-va=sinav2]').textContent)), 'Seviye 2 değerlendirmesi: yanlışlarda kaldı + telafi');
  await ev(() => document.querySelector('[data-va=yeniden2]').click()); await p.waitForTimeout(200);
  await ev(() => PP_VA.sinav2.sorular.forEach((q, i) => document.querySelector('[data-va-sec="2:' + i + ':' + q.a + '"]').click())); await p.waitForTimeout(150);
  await ev(() => document.querySelector('[data-va=sinav-bitir2]').click()); await p.waitForTimeout(250);
  ok(await ev(() => document.querySelector('[data-va=sinav2] [data-va-sinav]').dataset.vaSinav === 'gecti' && PP.va.durum().seviyeler[2].sinavGecti), 'Seviye 2 değerlendirmesi: doğrularla geçti ve kaydedildi');
  ok(await ev(() => document.documentElement.scrollWidth <= innerWidth + 1), '390 px: yatay taşma yok');
  ok(errs.length === 0, 'sayfa hatası yok ' + errs.join('|'));
  await b.close();
  console.log(fails ? '\nKALDI: ' + fails : '\nGEÇTİ');
  process.exit(fails ? 1 : 0);
})();

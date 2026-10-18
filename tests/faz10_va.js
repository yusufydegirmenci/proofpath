// Faz 10 tur 1: Veri Analitiği yolu — müfredat/önkoşul grafiği, Seviye 0 dersleri (15 öğe), lab doğrulaması, değerlendirme + telafi, ilerleme ve arayüz.
// Beklenen değerler veri setinden bağımsız elle hesaplandı. Hata → çıkış 1.
const path = require('path');
const { INIT, chromium } = require('./stub.js');
const { SAHTE_INIT } = require('./sunucu_sahte.js');
const U = require('url').pathToFileURL(path.join(__dirname, '..', 'index.html')).href;
let fails = 0;
const ok = (c, m) => { console.log((c ? 'OK    ' : 'HATA  ') + m); if (!c) fails++; };
const eq = (a, b, m) => { const s = JSON.stringify(a) === JSON.stringify(b); ok(s, m + (s ? '' : '  → beklenen ' + JSON.stringify(b) + ', gelen ' + JSON.stringify(a))); };

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.addInitScript('window.__guest=true');
  await ctx.addInitScript(INIT); await ctx.addInitScript(SAHTE_INIT);
  const p = await ctx.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.goto(U + '#atolye');
  await p.waitForTimeout(1500);
  const ev = (f, a) => p.evaluate(f, a);

  // 1) Müfredat ve önkoşul grafiği
  eq(await ev(() => PP_VA.mufredatDogrula(PP_VA.mufredat)), [], 'müfredat grafiği tutarlı (önkoşullar var, geriye dönük, hazır seviyenin önkoşulu hazır, SQL 13 alt konu)');
  const kotu = await ev(() => { const m = JSON.parse(JSON.stringify(PP_VA.mufredat)); m.seviyeler[1].durum = 'yok'; m.seviyeler[4].onkosul = [9]; m.seviyeler[2].konular.pop(); return PP_VA.mufredatDogrula(m); });
  ok(kotu.length === 3 && kotu.some(x => /hazır değil/.test(x)) && kotu.some(x => /bilinmeyen önkoşul/.test(x)) && kotu.some(x => /12 \(13 olmalı\)/.test(x)), 'bozuk müfredat (hazır ama önkoşulu yok, bilinmeyen önkoşul, 12 SQL konusu) yakalanır');
  eq(await ev(() => PP_VA.mufredat.seviyeler.map(s => [s.id, s.durum])), [[0, 'hazir'], [1, 'hazir'], [2, 'hazir'], [3, 'yok'], [4, 'yok'], [5, 'yok'], [6, 'yok'], [7, 'yok'], [8, 'yok']], 'Seviye 0–2 hazır; 3–8 dürüstçe "yok"');
  eq(await ev(() => PP_VA.mufredat.seviyeler[2].konular.slice(0, 3)), ['Veritabanı, tablo, ilişki, şema', 'SELECT, WHERE, ORDER BY, LIMIT, DISTINCT, NULL', 'CASE WHEN'], 'SQL alt konuları M§15.2 sırasıyla');
  eq(await ev(() => PP_VA.mufredat.sertifika.durum), 'doğrulanmadı', 'PL-300 eşlemesi "doğrulanmadı" olarak işaretli');

  // 2) Dersler: 15 öğe
  const ders = await ev(() => PP_VA.dersler.filter(d => !d.seviye).map(d => ({
    id: d.id,
    ogeler: [!!(d.hedefler && d.hedefler.length && d.onkosul), !!d.aciklama, !!(d.terimler && d.terimler.length >= 4), !!(d.ornek && d.ornek.length >= 3), !!(d.analoji && d.analoji.a), !!(d.analoji && d.analoji.sinir), !!d.gorsel,
      !!(d.rehberli && d.rehberli.length), !!d.bagimsiz, !!(d.hatalar && d.hatalar.length >= 3), !!(d.kontrol && d.kontrol.length >= 4), !!(d.gecme && d.gecme.olcut && d.gecme.kritik.length), true /* lab/proje bağlantısı: sonraki alanı */, Array.isArray(d.kaynaklar), !!(d.telafi && d.sonraki)].filter(Boolean).length,
    kontrolGecerli: d.kontrol.every(q => q.o.length === 4 && q.a >= 0 && q.a < 4 && q.why && q.bolum),
    kaynakGecerli: d.kaynaklar.every(k => /^https:\/\//.test(k.u) && /^\d{4}-\d{2}-\d{2}$/.test(k.dogrulama) && k.neden)
  })));
  eq(ders.map(d => d.ogeler), [15, 15, 15], '3 ders M§7\'nin 15 öğesinin hepsini taşıyor');
  ok(ders.every(d => d.kontrolGecerli && d.kaynakGecerli), 'bilgi kontrolü soruları (4 şık, geçerli cevap, neden) ve kaynaklar (https + doğrulama tarihi) geçerli');
  const dagilim = await ev(() => [...new Set(PP_VA.dersler.filter(d => !d.seviye).flatMap(d => d.kontrol.map(q => q.a)).concat(PP_VA.sinav0.sorular.map(q => q.a)))].sort());
  ok(dagilim.length >= 2, 'doğru şık hep aynı konumda değil');
  eq(await ev(() => [PP_VA.dersler.filter(d => !d.seviye).every(d => d.kaynaklar.every(k => /^https:\/\/(www\.rfc-editor\.org|www\.postgresql\.org|www\.kvkk\.gov\.tr)\//.test(k.u))), PP_VA.dersler.filter(d => !d.seviye).map(d => d.kaynaklar.length)]), [true, [0, 3, 1]], 'dış kaynaklar yalnız doğrulanmış alanlar (RFC, PostgreSQL, KVKK)');

  // 3) Veri seti ve derslerdeki iddialar tutarlı (bağımsız sayım)
  const veri = await ev(() => {
    const v = PP_VA.veri, i = c => v.sutunlar.indexOf(c), s = v.satirlar;
    return { n: s.length, genislik: s.every(r => r.length === v.sutunlar.length), musteri: new Set(s.map(r => r[i('musteri_id')])).size,
      nakit: s.filter(r => r[i('odeme_turu')] === 'nakit').length, nakitIade: s.filter(r => r[i('odeme_turu')] === 'nakit' && r[i('iade')] === 'evet').length,
      kart: s.filter(r => r[i('odeme_turu')] === 'kart').length, kartIade: s.filter(r => r[i('odeme_turu')] === 'kart' && r[i('iade')] === 'evet').length,
      bosIndirim: s.filter(r => r[i('indirim_orani')] === '').map(r => r[0]), benzersizId: new Set(s.map(r => r[0])).size };
  });
  eq(veri, { n: 12, genislik: true, musteri: 8, nakit: 3, nakitIade: 2, kart: 7, kartIade: 0, bosIndirim: ['S007'], benzersizId: 12 }, 'sentetik veri: 12 sipariş, 8 müşteri, nakit 2/3 iade, kart 0/7, tek boş indirim (S007)');
  ok(await ev(() => /3 nakit siparişte 2 iade/.test(PP_VA.dersler[2].ornek.join(' ')) && /nakit 3 siparişte 2 iade; kart 7 siparişte 0/.test(PP_VA.lab.gorev3[4].neden) && /S007/.test(PP_VA.dersler[1].ornek.join(' '))), 'derslerdeki sayısal iddialar veri setiyle aynı');

  // 4) Lab doğrulaması
  const L1 = await ev(() => ({
    dogru: PP.va.gorev1({ k1: ['sehir', 'adet', 'birim_fiyat'], k2: ['musteri_id'], k3: ['odeme_turu', 'iade'] }),
    istege: PP.va.gorev1({ k1: ['sehir', 'adet', 'birim_fiyat', 'indirim_orani'], k2: ['musteri_id'], k3: ['odeme_turu', 'iade'] }).hepsi,
    eksik: PP.va.gorev1({ k1: ['sehir', 'adet'], k2: ['musteri_id'], k3: ['odeme_turu', 'iade'] }).k1,
    fazla: PP.va.gorev1({ k1: ['sehir', 'adet', 'birim_fiyat'], k2: ['musteri_id', 'siparis_id'], k3: ['odeme_turu', 'iade'] }).k2,
    bos: PP.va.gorev1(null).hepsi, bilinmeyen: PP.va.gorev1({ k2: ['yok_sutun'], k1: [], k3: [] }).k2
  }));
  eq([L1.dogru.hepsi, L1.istege], [true, true], 'görev 1: doğru kümeler ve isteğe bağlı sütun kabul edilir');
  eq(L1.eksik, { dogru: false, eksik: ['birim_fiyat'], fazla: [] }, 'görev 1: eksik sütun adıyla bildirilir');
  eq(L1.fazla, { dogru: false, eksik: [], fazla: ['siparis_id'] }, 'görev 1: fazla sütun adıyla bildirilir');
  eq([L1.bos, L1.bilinmeyen.dogru], [false, false], 'görev 1: boş/bilinmeyen sütun kabul edilmez, çökmez');
  const L2 = await ev(() => { const d = Object.assign({}, PP_VA.lab.gorev2); const yanlis = Object.assign({}, d, { siparis_id: 'tam sayı' }); return [PP.va.gorev2(d).hepsi, PP.va.gorev2(yanlis).hepsi, PP.va.gorev2(yanlis).siparis_id, PP.va.gorev2(null).hepsi, d.siparis_id, d.musteri_id, d.adet, d.birim_fiyat, d.iade]; });
  eq(L2, [true, false, false, false, 'tanımlayıcı', 'tanımlayıcı', 'tam sayı', 'ondalık sayı', 'evet/hayır'], 'görev 2: doğru türler; tanımlayıcıyı tam sayı saymak yanlış');
  const L3 = await ev(() => ({ d: PP.va.gorev3({ i1: true, i2: false, i3: false, i4: false, i5: true }), y: PP.va.gorev3({ i1: true, i2: false, i3: true, i4: false, i5: true }), e: PP.va.gorev3({ i1: true }).hepsi, s: PP.va.gorev3({ i1: 'true', i2: 0, i3: null, i4: undefined, i5: 1 }).hepsi }));
  eq([L3.d.hepsi, L3.y.hepsi, L3.y.i3, L3.e, L3.s], [true, false, false, false, false], 'görev 3: nedensellik iddiası "destekler" işaretlenirse yanlış; eksik/tip dışı cevap kabul edilmez');

  // 5) Değerlendirme + telafi
  const dogruCev = await ev(() => PP_VA.sinav0.sorular.map(q => q.o.indexOf(window.__sentetikDogru(q))));   // sentetik sunucu anahtarı (gerçek anahtar repoda yok)
  await ev(() => { window.__ogrDurum.sinir = 100; });
  const S = (cev) => ev(c => PP.va.sinavGonder(c), cev);
  const tam = await S(dogruCev);
  eq([tam.ok, tam.puan, tam.maks, tam.gecti, tam.yanlis.length], [true, 5, 5, true, 0], 'hepsi doğru → geçti');
  const bir = await S(dogruCev.map((a, i) => i === 1 ? (a + 1) % 4 : a));
  eq([bir.puan, bir.oran, bir.gecti], [4, 0.8, true], '4/5 = tam eşik (%80) → geçti');
  eq(bir.yanlis.map(y => [y.soru, y.dersId]), [[2, 'va0-2']], 'yanlış soru ilgili derse bağlanır');
  ok(/tablodan bir sütun/i.test(bir.yanlis[0].telafi) && bir.yanlis[0].dogruSik.length > 0, 'telafi metni ve doğru şık verilir');
  const uc = await S(dogruCev.map((a, i) => i < 3 ? (a + 1) % 4 : a));
  eq([uc.puan, uc.gecti, uc.yanlis.length], [2, false, 0], '2/5 → kaldı; sunucu hangi soruların yanlış olduğunu AÇMAZ (yanlış listesi boş, doğru şık sızmaz)');
  eq(uc.telafiDersler.map(d => d.dersId), await ev(() => [...new Set(PP_VA.sinav0.sorular.map(q => q.bolum))]), 'kalınca telafi sınavın tüm bölümlerine verilir (hangi sorunun yanlış olduğu açılmadığı için)');
  ok(/aynı sorular gelir/.test(uc.varyantNotu), 'tek soru seti sınırlaması dürüstçe yazılı');
  eq([(await S([0, 1])).neden, (await S([0, 0, 0, 0, -1])).neden, (await S(null)).neden], ['eksik-cevap', 'eksik-cevap', 'eksik-cevap'], 'eksik/geçersiz cevap kümesi reddedilir');

  // 6) İlerleme ve kanıt kaydı
  await ev(() => localStorage.removeItem('ya_pp_ogr'));
  const D0 = await ev(() => PP.va.durum());
  eq([D0.tamam, D0.bekleyen.length, D0.sonrakiSeviye.acik], [false, 3, true], 'başlangıç: tamam değil, 3 bekleyen koşul, öneri Seviye 0 (kilit zorlanmıyor)');
  eq(await ev(() => PP.va.dersOkundu('yok-ders')), { ok: false, neden: 'bilinmeyen-ders' }, 'bilinmeyen ders işaretlenemez');
  await ev(() => { PP.va.dersOkundu('va0-1'); PP.va.dersOkundu('va0-2'); PP.va.dersOkundu('va0-3'); });
  eq(await ev(() => PP.va.durum().tamam), false, 'dersleri okumak tek başına Seviye 0\'ı tamamlamaz');
  eq(await ev(() => [PP.va.labKaydet('g1', false), PP.va.labKaydet('g2', true), PP.va.labKaydet('g9')]), [{ ok: true, tamam: false }, { ok: true, tamam: false }, { ok: false, neden: 'bilinmeyen-gorev' }], 'lab görevleri kaydedilir; bilinmeyen görev reddedilir');
  await ev(() => PP.va.labKaydet('g3', false));
  eq(await ev(() => PP.va.durum().tamam), false, 'ders + lab tamam ama değerlendirme geçilmedi → Seviye 0 tamam DEĞİL');
  await ev(async () => PP.va.sinavKaydet(await PP.va.sinavGonder(PP_VA.sinav0.sorular.map(q => (q.o.indexOf(window.__sentetikDogru(q)) + 1) % 4))));
  eq(await ev(() => [PP.va.durum().sinavGecti, PP.va.durum().tamam]), [false, false], 'başarısız deneme sayılır ama geçti saymaz');
  await ev(async () => PP.va.sinavKaydet(await PP.va.sinavGonder(PP_VA.sinav0.sorular.map(q => q.o.indexOf(window.__sentetikDogru(q))))));
  const D1 = await ev(() => PP.va.durum());
  eq([D1.tamam, D1.sinavDenemesi, D1.bekleyen, D1.sonrakiSeviye.id], [true, 2, [], 1], 'ders + lab + geçilen değerlendirme → Seviye 0 tamam; önerilen sıradaki Seviye 1 (kilit zorlanmıyor)');
  eq(await ev(() => PP.ogr.depo.oku().kanitlar.filter(k => /^lab-va0/.test(k.id)).map(k => [k.id, k.tur, k.kapi, k.dogrulama]).sort()), [['lab-va0-g1', 'lab', null, 'istemci'], ['lab-va0-g2-ipucu', 'lab', null, 'istemci'], ['lab-va0-g3', 'lab', null, 'istemci'], ['lab-va0-tamam', 'lab', null, 'istemci']], 'lab kanıtları istemci doğrulamalı, kapı kanıtı değil; ipuçlu görev ayrı işaretli');

  // 7) Arayüz (temiz durum)
  await ev(() => { localStorage.removeItem('ya_pp_ogr'); S.va = null; S.at2.sec = 'va'; goTab('atolye'); });
  await p.waitForTimeout(400);
  ok(await ev(() => !!document.querySelector('#view [data-va=ozet]') && /Seviye 0–2 hazır/.test(document.querySelector('[data-va=ozet]').textContent)), 'Atölye > Veri Analitiği: özet "Seviye 0–2 hazır" diyor');
  eq(await ev(() => [...document.querySelectorAll('[data-va-seviye]')].map(e => /YOK/.test(e.textContent))), [false, false, false, true, true, true, true, true, true], 'arayüzde Seviye 3–8 "YOK" olarak görünür');
  ok(await ev(() => /doğrulanmadı/.test(document.querySelector('[data-va=sertifika]').textContent) && !/sertifika(yı)? (aldın|kazandın|hak ettin)/i.test(document.body.innerText)), 'PL-300 "doğrulanmadı"; sertifika kazanıldığı iddiası yok');
  await ev(() => document.querySelector('[data-va-ders="va0-1"]').click()); await p.waitForTimeout(250);
  const acik = await ev(() => [...document.querySelectorAll('[data-va-acik] .label')].map(e => e.textContent));
  ok(['Sade açıklama', 'Terimler', 'Adım adım örnek', 'Benzetme ve sınırı', 'Görsel', 'Rehberli alıştırma', 'Bağımsız görev', 'Yaygın hatalar ve düzeltme', 'Bilgi kontrolü', 'Geçme ölçütü ve kritik yanlış anlamalar', 'Takıldıysan (telafi)'].every(x => acik.includes(x)), 'ders arayüzü 15 öğenin bölümlerini gösteriyor');
  await ev(() => document.querySelector('[data-va-kontrol="va0-1:0"] .qz-o:nth-child(1)').click()); await p.waitForTimeout(200);
  ok(await ev(() => /Doğrusu/.test(document.querySelector('[data-va-kontrol="va0-1:0"]').textContent)), 'bilgi kontrolü yanlış şıkta doğruyu ve nedeni gösterir');
  await ev(() => document.querySelector('[data-va=okudum]').click()); await p.waitForTimeout(250);
  ok(await ev(() => /✓ Analist/.test(document.querySelector('[data-va-ders="va0-1"]').textContent)), 'okundu işareti kalıcı görünür');

  // Lab arayüzü: yanlış → doğru
  const sec = (k, c) => ev(([k, c]) => document.querySelector('[data-va-sut="' + k + ':' + c + '"]').click(), [k, c]);
  await sec('k1', 'sehir'); await sec('k2', 'musteri_id'); await sec('k3', 'odeme_turu'); await sec('k3', 'iade');
  await ev(() => document.querySelector('[data-va=g1]').click()); await p.waitForTimeout(200);
  ok(await ev(() => /k1: eksik adet, birim_fiyat/.test(document.querySelector('[data-va-sonuc=g1]').textContent)), 'lab görev 1: eksik sütunlar adıyla bildirilir');
  eq(await ev(() => PP.ogr.depo.oku().kanitlar.filter(k => /^lab-va0/.test(k.id)).length), 0, 'yanlış görevde kanıt yazılmaz');
  await sec('k1', 'adet'); await sec('k1', 'birim_fiyat');
  await ev(() => document.querySelector('[data-va=g1]').click()); await p.waitForTimeout(200);
  ok(await ev(() => /Doğru: tüm sorular/.test(document.querySelector('[data-va-sonuc=g1]').textContent)), 'lab görev 1 doğru');
  await ev(() => { const T = PP_VA.lab.gorev2; Object.keys(T).forEach(c => { const s = document.querySelector('[data-va-tur="' + c + '"]'); s.value = T[c]; s.dispatchEvent(new Event('change')); }); });
  await ev(() => { const s = document.querySelector('[data-va-tur="siparis_id"]'); s.value = 'tam sayı'; s.dispatchEvent(new Event('change')); });
  await ev(() => document.querySelector('[data-va=g2]').click()); await p.waitForTimeout(200);
  ok(await ev(() => /Yanlış\/eksik: siparis_id/.test(document.querySelector('[data-va-sonuc=g2]').textContent)), 'lab görev 2: tanımlayıcıyı tam sayı seçmek yanlış');
  await ev(() => { const s = document.querySelector('[data-va-tur="siparis_id"]'); s.value = 'tanımlayıcı'; s.dispatchEvent(new Event('change')); });
  await ev(() => document.querySelector('[data-va=g2]').click()); await p.waitForTimeout(200);
  await ev(() => document.querySelector('[data-va-gorev=g3] [data-cubuk=ipucu]').click()); await p.waitForTimeout(150);
  await ev(() => { PP_VA.lab.gorev3.forEach(i => document.querySelector('[data-va-ifade="' + i.id + ':' + i.destekler + '"]').click()); });
  await p.waitForTimeout(150);
  await ev(() => document.querySelector('[data-va=g3]').click()); await p.waitForTimeout(250);
  eq(await ev(() => PP.va.durum().lab.map(l => [l.tamam, l.ipucu])), [[true, false], [true, false], [true, true]].map((x, i) => i === 1 ? [true, false] : x), 'üç lab görevi kaydedildi (ipucu yalnız sonradan açılan görevlerde işaretli)');
  ok(await ev(() => /İpuçları/.test(document.querySelector('[data-va=lab]').textContent) && /yerel simülasyon/i.test(document.querySelector('[data-va=lab]').textContent)), 'lab ipucu gösterir ve "yerel simülasyon" etiketini taşır');
  await ev(() => ['g1', 'g2', 'g3'].forEach(g => document.querySelector('[data-va=sifirla-' + g + ']').click())); await p.waitForTimeout(200);
  eq(await ev(() => document.querySelectorAll('[data-va-sonuc]').length), 0, 'lab sıfırla cevapları temizler');
  eq(await ev(() => PP.va.durum().lab.every(l => l.tamam)), true, 'sıfırla kayıtlı ilerlemeyi silmez');

  // Değerlendirme arayüzü: kaldı → telafi → yeniden → geçti
  await ev(() => PP_VA.sinav0.sorular.forEach((q, i) => document.querySelector('[data-va-sec="' + i + ':' + ((q.o.indexOf(window.__sentetikDogru(q)) + 1) % 4) + '"]').click()));
  await ev(() => document.querySelector('[data-va=sinav-bitir]').click()); await p.waitForTimeout(700);
  ok(await ev(() => document.querySelector('[data-va-sinav]').dataset.vaSinav === 'kaldi' && /Telafi:/.test(document.querySelector('[data-va=sinav]').textContent)), 'değerlendirme: kalınca telafi ve derse yönlendirme');
  await ev(() => document.querySelector('[data-va=yeniden]').click()); await p.waitForTimeout(200);
  await ev(() => PP_VA.sinav0.sorular.forEach((q, i) => document.querySelector('[data-va-sec="' + i + ':' + q.o.indexOf(window.__sentetikDogru(q)) + '"]').click()));
  await ev(() => document.querySelector('[data-va=sinav-bitir]').click()); await p.waitForTimeout(700);
  ok(await ev(() => document.querySelector('[data-va-sinav]').dataset.vaSinav === 'gecti'), 'değerlendirme: yeniden denemede geçti');
  await ev(() => { PP.va.dersOkundu('va0-2'); PP.va.dersOkundu('va0-3'); draw(); }); await p.waitForTimeout(250);
  ok(await ev(() => /Seviye 0:\s*tamam/.test(document.querySelector('[data-va=ozet]').textContent) && /Seviye 1/.test(document.querySelector('[data-va=sonraki]').textContent) && !/kilitli/.test(document.querySelector('[data-va=sonraki]').textContent)), 'özet: Seviye 0 tamam, sonraki Seviye 1 önerilir, "kilitli" denmez');
  ok(await ev(() => document.documentElement.scrollWidth <= innerWidth + 1), '390 px: yatay taşma yok');
  ok(errs.length === 0, 'sayfa hatası yok ' + errs.join('|'));
  await b.close();
  console.log(fails ? '\nKALDI: ' + fails : '\nGEÇTİ');
  process.exit(fails ? 1 : 0);
})();

// Öğrenme modeli (js/ogrenme/) birim testleri: puan, eşik, kritik hedef, kapı, telafi, varyant, aktarım, depo, eski veri dönüştürücü.
// Tarayıcı gerekmez (saf mantık). Hata → çıkış 1. Beklenen değerler bağımsız ve elle yazılmıştır.
const fs = require('fs');
const path = require('path');
for (const f of ['cekirdek', 'graf', 'degerlendirme', 'kapi', 'depo', 'ilerleme', 'eski', 'program', 'ustalik', 'seri', 'tekrar', 'aciklama'])
  new Function(fs.readFileSync(path.join(__dirname, '..', 'js', 'ogrenme', f + '.js'), 'utf8')).call(globalThis);
const O = globalThis.PP.ogr, G_ = O.graf, D = O.deg, K = O.kapi;

let n = 0, fails = 0;
const ok = (c, m) => { n++; console.log((c ? 'OK    ' : 'HATA  ') + m); if (!c) fails++; };
const eq = (a, b, m) => { const s = JSON.stringify(a) === JSON.stringify(b); ok(s, m + (s ? '' : '  → beklenen ' + JSON.stringify(b) + ', gelen ' + JSON.stringify(a))); };
const kodlar = r => r.nedenler.map(x => x.kod);
const mem = () => { const m = {}; return { m, getItem: k => (k in m ? m[k] : null), setItem: (k, v) => { m[k] = String(v); } }; };
let sayac = 0;
const dn = (hedef, puan, maks, o) => Object.assign({ id: 'd' + (++sayac), hedef, varyant: null, puan, maks, tarih: '2026-10-' + String(10 + sayac).padStart(2, '0'), surum: '1', yardim: { tur: 'bilinmiyor', guvenilir: false }, dogrulama: 'istemci' }, o || {});

// ---- Örnek müfredat: bir yol, iki yetkinlik, kritik + kritik olmayan hedef ----
function ornek() {
  const G = G_.yeni('1');
  G_.yetkinlikEkle(G, { id: 'y1', ad: 'Adresleme' });
  G_.yetkinlikEkle(G, { id: 'y2', ad: 'Yönlendirme', onkosullar: ['y1'] });
  G_.hedefEkle(G, { id: 'h-maske', ad: 'Alt ağ maskesi', yetkinlik: 'y1', kritik: true, varyantlar: ['A', 'B', 'C'] });
  G_.hedefEkle(G, { id: 'h-sozluk', ad: 'Terimler', yetkinlik: 'y1' });
  G_.hedefEkle(G, { id: 'h-rota', ad: 'Rota tablosu', yetkinlik: 'y2', kritik: true });
  return G;
}

// ---- 1. Varsayılanlar ----
eq([O.ESIK, O.KRITIK_ESIK, O.CEKIRDEK_PROJE], [0.8, 0.8, 4], 'varsayılan eşik %80, kritik eşik %80, kademe başına 4 çekirdek proje');
eq(Object.keys(O.SEVIYE), ['L0', 'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8'], 'L0–L8 ilerleme seviyeleri tanımlı');
eq(O.JOKER_GEREKLER.length, 7, 'Joker 7 ayrı gereksinim türü ister');

// ---- 2. Puan ve eşik ----
{
  const G = ornek();
  eq(D.hedefDurumu(G, 'h-sozluk', [dn('h-sozluk', 4, 5)]).durum, 'gecti', 'puan: 4/5 = %80 sınırda GEÇER');
  eq(D.hedefDurumu(G, 'h-sozluk', [dn('h-sozluk', 79, 100)]).durum, 'kaldi', 'puan: %79 KALIR');
  eq(D.hedefDurumu(G, 'h-sozluk', []).durum, 'denenmedi', 'puan: deneme yoksa "denenmedi" (ustalık değil)');
  eq(D.hedefDurumu(G, 'h-sozluk', [dn('h-sozluk', 6, 5)]).gecmis[0].neden, 'gecersiz-puan', 'puan: puan > maks geçersiz, sayılmaz');
  eq(D.hedefDurumu(G, 'h-sozluk', [dn('h-sozluk', 1, 0)]).durum, 'denenmedi', 'puan: maks 0 geçersiz');
  const son = D.hedefDurumu(G, 'h-sozluk', [dn('h-sozluk', 5, 5), dn('h-sozluk', 2, 5)]);
  eq([son.durum, son.oran], ['kaldi', 0.4], 'puan: son sayılan deneme belirler (gerileme ustalığı düşürür)');
  G.hedefler['h-sozluk'].esik = 0.9;
  eq(D.hedefDurumu(G, 'h-sozluk', [dn('h-sozluk', 4, 5)]).durum, 'kaldi', 'eşik: hedef kendi eşiğini yükseltebilir (%90)');
  G.hedefler['h-sozluk'].esik = 0.5; G.hedefler['h-maske'].esik = 0.5;
  eq([D.hedefDurumu(G, 'h-sozluk', [dn('h-sozluk', 3, 5)]).durum, D.hedefDurumu(G, 'h-maske', [dn('h-maske', 3, 5)]).durum], ['gecti', 'kaldi'], 'eşik: kritik hedefin eşiği %80\'in altına indirilemez');
  G.hedefler['h-sozluk'].minMaks = 20;
  eq(D.hedefDurumu(G, 'h-sozluk', [dn('h-sozluk', 5, 5)]).gecmis[0].neden, 'yetersiz-kanit', 'eşik: minimum kanıt miktarı (1/1 ustalık sayılmaz)');
}

// ---- 3. Kritik hedef ortalamaya gömülmez ----
{
  const G = ornek();
  const d = [dn('h-maske', 2, 5), dn('h-sozluk', 5, 5)];       // kritik %40, diğer %100 → ortalama %70
  const y = D.yetkinlikDurumu(G, 'y1', d);
  eq([y.gecti, y.kritikBasarisiz, Math.round(y.ortalama * 100)], [false, ['h-maske'], 70], 'kritik: ortalama bilgi amaçlı; kritik başarısızlık yetkinliği geçirmez');
  const y2 = D.yetkinlikDurumu(G, 'y1', [dn('h-maske', 5, 5), dn('h-sozluk', 5, 5)]);
  eq([y2.gecti, y2.kritikBasarisiz], [true, []], 'kritik: hepsi geçince yetkinlik geçer');
  eq(D.yetkinlikDurumu(G, 'y1', [dn('h-sozluk', 5, 5)]).kritikEksik, ['h-maske'], 'kritik: denenmemiş kritik hedef eksik sayılır');
  const bos = G_.yeni('1'); G_.yetkinlikEkle(bos, { id: 'z' });
  eq(D.yetkinlikDurumu(bos, 'z', []).gecti, false, 'yetkinlik: ölçüt (hedef) yoksa geçmiş sayılmaz');
}

// ---- 4. Sürüm, doğrulama, bağımsızlık ----
{
  const G = ornek();
  const a = D.hedefDurumu(G, 'h-sozluk', [dn('h-sozluk', 5, 5, { surum: '0' })]);
  eq([a.durum, a.gecmis[0].neden], ['denenmedi', 'eski-surum'], 'sürüm: eski müfredat sürümü kanıtı korunur ama sayılmaz');
  G.hedefler['h-sozluk'].uyumluSurumler = ['0'];
  eq(D.hedefDurumu(G, 'h-sozluk', [dn('h-sozluk', 5, 5, { surum: '0' })]).durum, 'gecti', 'sürüm: uyumlu ilan edilen eski sürüm sayılır');
  eq(D.hedefDurumu(G, 'h-sozluk', [dn('h-sozluk', 5, 5, { surum: null })]).gecmis[0].neden, 'surum-yok', 'sürüm: sürümsüz kayıt sayılmaz');
  eq(D.hedefDurumu(G, 'h-sozluk', [dn('h-sozluk', 5, 5)], { sunucuGerek: true }).gecmis[0].neden, 'sunucu-dogrulamasi-yok', 'doğrulama: sunucu istenince istemci kaydı sayılmaz');
  eq(D.hedefDurumu(G, 'h-sozluk', [dn('h-sozluk', 5, 5, { dogrulama: 'sunucu' })], { sunucuGerek: true }).guven, 'sunucu', 'doğrulama: sunucu kaydı sayılır, güven "sunucu"');
  eq(D.hedefDurumu(G, 'h-sozluk', [dn('h-sozluk', 5, 5, { dogrulama: 'beyan' })]).gecmis[0].neden, 'beyan-sayilmaz', 'doğrulama: öz-beyan ("Bildim") ustalık kanıtı sayılmaz');
  eq(D.hedefDurumu(G, 'h-sozluk', [dn('h-sozluk', 5, 5, { dogrulama: 'beyan' })], { beyanKabul: true }).durum, 'gecti', 'doğrulama: öz-beyan yalnız açıkça kabul edilirse sayılır');
  eq(D.hedefDurumu(G, 'h-sozluk', [dn('h-sozluk', 5, 5)], { bagimsizGerek: true }).gecmis[0].neden, 'bagimsizlik-kaniti-yok', 'bağımsızlık: tamamlama bağımsızlık kanıtı değildir');
  eq(D.hedefDurumu(G, 'h-sozluk', [dn('h-sozluk', 5, 5, { yardim: { tur: 'yok', guvenilir: false } })], { bagimsizGerek: true }).durum, 'denenmedi', 'bağımsızlık: güvenilmeyen "yardım yok" beyanı sayılmaz');
  eq(D.hedefDurumu(G, 'h-sozluk', [dn('h-sozluk', 5, 5, { yardim: { tur: 'yok', guvenilir: true } })], { bagimsizGerek: true }).bagimsiz, true, 'bağımsızlık: yalnız güvenilir "yardım yok" kaydı kabul');
}

// ---- 5. Varyant ve telafi ----
{
  const G = ornek();
  eq(D.varyantSec(G, 'h-maske', []).varyant, 'A', 'varyant: ilk seçim ilk varyant (belirleyici)');
  eq(D.varyantSec(G, 'h-maske', [dn('h-maske', 1, 5, { varyant: 'A' })]).varyant, 'B', 'varyant: son kullanılan tekrarlanmaz');
  eq(D.varyantSec(G, 'h-maske', [dn('h-maske', 1, 5, { varyant: 'A' }), dn('h-maske', 1, 5, { varyant: 'B' })]).varyant, 'C', 'varyant: en az kullanılan seçilir');
  eq(D.varyantSec(G, 'h-sozluk', []).uyari, 'varyant-yok', 'varyant: tanımsızsa uyarı');
  G.hedefler['h-sozluk'].varyantlar = ['X'];
  eq(D.varyantSec(G, 'h-sozluk', [dn('h-sozluk', 1, 5, { varyant: 'X' })]).uyari, 'tek-varyant', 'varyant: tek varyantta uyarı (ezber riski)');
  const kal = [dn('h-maske', 1, 5, { varyant: 'A' })];
  const ayni = D.hedefDurumu(G, 'h-maske', kal.concat([dn('h-maske', 5, 5, { varyant: 'A' })]));
  eq([ayni.durum, ayni.gecmis[0].neden], ['kaldi', 'ayni-varyant-tekrari'], 'varyant: kaldığın varyantı ezberleyip geçmek sayılmaz');
  const farkli = D.hedefDurumu(G, 'h-maske', kal.concat([dn('h-maske', 5, 5, { varyant: 'B' })]));
  eq(farkli.durum, 'gecti', 'varyant: farklı varyantla geçmek sayılır');
  const t = D.telafi(G, 'h-maske', kal);
  eq([t.gerekli, t.adimlar.map(a => a.tur), t.sonrakiVaryant], [true, ['yanlis-anlama', 'yeniden-anlat', 'ornek', 'rehberli-gorev', 'bagimsiz-gorev', 'yeniden-sinav'], 'B'], 'telafi: 6 adım (§11.1), yeniden sınav FARKLI varyantla');
  eq(D.telafi(G, 'h-maske', kal.concat([dn('h-maske', 5, 5, { varyant: 'B' })])).gerekli, false, 'telafi: hedef geçilince telafi gerekmez (düzelen hata bloklamaz)');
  eq(D.telafi(G, 'h-maske', []).neden, 'hedef-denenmedi', 'telafi: denenmemiş hedef için telafi yok');
  eq(D.telafiGerekenler(G, kal.concat([dn('h-sozluk', 1, 5)])).map(x => x.hedef), ['h-maske', 'h-sozluk'], 'telafi: başarısız tüm hedefler listelenir');
}

// ---- 6. Kapılar: nedenler, açılma, bloklama ----
function kapiOrnek() {
  const G = ornek();
  for (const p of ['p1', 'p2', 'p3', 'p4']) G_.projeEkle(G, { id: p, ad: 'Proje ' + p, hedefler: ['h-' + p], yetkinlikler: ['y1'] });
  G_.kapiEkle(G, { id: 'temel', ad: 'Temel kapısı', seviye: 'L3', hedefler: ['h-maske', 'h-sozluk'] });
  K.kademeAltin(G, { id: 'altin1', ad: 'Kademe 1 Altın Vuruş', kademe: 'k1', hedefler: ['h-maske', 'h-sozluk'], cekirdekProjeler: ['p1', 'p2', 'p3', 'p4'], onkosulKapilar: ['temel'] });
  return G;
}
{
  const G = kapiOrnek(), du = (d, pr) => ({ denemeler: d, projeler: pr || {}, kanitlar: [] });
  const r0 = K.degerlendir(G, 'temel', du([]));
  eq([r0.acik, kodlar(r0)], [false, ['kritik-denenmedi', 'hedef-denenmedi']], 'kapı: hiç kanıt yokken kilitli; her hedef için neden var');
  ok(r0.nedenler.every(x => typeof x.mesaj === 'string' && x.mesaj.length > 10 && x.ref), 'kapı: her kilit okunur bir neden mesajı ve başvuru taşır');
  const r1 = K.degerlendir(G, 'temel', du([dn('h-maske', 2, 5), dn('h-sozluk', 5, 5)]));
  eq([r1.acik, kodlar(r1)], [false, ['kritik-basarisiz']], 'kapı: ortalama yüksek olsa da başarısız kritik hedef kapıyı bloklar');
  ok(/%40/.test(r1.nedenler[0].mesaj) && /%80/.test(r1.nedenler[0].mesaj) && /Ortalama/.test(r1.nedenler[0].mesaj), 'kapı: mesaj puanı, gereken eşiği ve ortalamanın telafi etmediğini söyler');
  const r2 = K.degerlendir(G, 'temel', du([dn('h-maske', 5, 5), dn('h-sozluk', 5, 5)]));
  eq([r2.acik, kodlar(r2)], [true, []], 'kapı: geçerli tamamlama kapıyı açar');
  const r3 = K.degerlendir(G, 'temel', du([dn('h-maske', 5, 5), dn('h-sozluk', 4, 5)]));
  eq(r3.acik, true, 'kapı: kritik olmayan hedefte %80 yeterli');
  G.hedefler['h-sozluk'].esik = 0.8;
  const BAG = { yardim: { tur: 'yok', guvenilir: true } };
  const hepsi = [dn('h-maske', 5, 5, BAG), dn('h-sozluk', 5, 5, BAG)];
  eq(kodlar(K.degerlendir(G, 'altin1', du([dn('h-maske', 5, 5), dn('h-sozluk', 5, 5)]))).filter(k => k === 'bagimsizlik-kaniti-yok').length > 0, true, 'Altın Vuruş: yardımsız yapıldığına dair güvenilir kayıt olmadan açılmaz (tamamlama bağımsızlık değildir)');
  const a0 = K.degerlendir(G, 'altin1', du(hepsi));
  eq(kodlar(a0), ['proje-eksik'], 'Altın Vuruş: temel geçildi ama 4 çekirdek proje yok → neden proje-eksik');
  ok(/0\/4/.test(a0.nedenler[0].mesaj), 'Altın Vuruş: mesaj "0/4" söyler');
  const pr = { p1: { bitti: true }, p2: { bitti: true }, p3: { bitti: true } };
  eq(K.degerlendir(G, 'altin1', du(hepsi, pr)).nedenler[0].mesaj.indexOf('3/4') >= 0, true, 'Altın Vuruş: 3/4 proje yetmez');
  pr.p4 = { bitti: true };
  const a1 = K.degerlendir(G, 'altin1', du(hepsi, pr));
  eq([a1.acik, kodlar(a1)], [true, []], 'Altın Vuruş: temel + 4 ayrı proje + kritik değerlendirmeler (güvenilir bağımsızlık kaydıyla) → açık');
  const a2 = K.degerlendir(G, 'altin1', du([dn('h-maske', 5, 5, BAG), dn('h-sozluk', 5, 5, BAG), dn('h-maske', 1, 5, BAG)], pr));
  eq(kodlar(a2).sort(), ['kritik-basarisiz', 'onkosul-kapi'], 'Altın Vuruş: projeler tamam olsa bile sonradan kritik gerileme hem kapıyı hem önkoşulu bloklar');
  const sunucu = K.degerlendir(G, 'altin1', du(hepsi, pr), { sunucuGerek: true });
  ok(kodlar(sunucu).includes('sunucu-dogrulama-yok') || kodlar(sunucu).includes('onkosul-kapi'), 'kapı: sunucu doğrulaması istenince istemci kanıtı yetmez');
  eq(K.degerlendir(G, 'temel', du(hepsi)).bilgi.map(b => b.kod), ['dogrulanmamis', 'dogrulanmamis'], 'kapı: istemci sonuçları "doğrulanmamış" etiketiyle gelir (güvenli yetkilendirme değil)');
}

// ---- 7. Çekirdek projeler gerçekten ayrı olmalı ----
{
  const G = G_.yeni('1');
  G_.yetkinlikEkle(G, { id: 'y' });
  G_.projeEkle(G, { id: 'a', ad: 'Ağ Lab', hedefler: ['x'], yetkinlikler: ['y'] });
  G_.projeEkle(G, { id: 'b', ad: 'ağ  lab!', hedefler: ['z'], yetkinlikler: ['q'] });
  G_.projeEkle(G, { id: 'c', ad: 'Başka ad', hedefler: ['x'], yetkinlikler: ['y'] });
  G_.projeEkle(G, { id: 'd', ad: 'Dördüncü', hedefler: ['t'], yetkinlikler: ['u'] });
  K.kademeAltin(G, { id: 'k', ad: 'k', cekirdekProjeler: ['a', 'b', 'c', 'd'] });
  const v = G_.dogrula(G);
  ok(!v.ok && v.hata.some(h => /aynı adı/.test(h)) && v.hata.some(h => /aynı hedef\/yetkinlik/.test(h)), 'proje: yeniden adlandırılmış kopya ve aynı hedef kümesi hata olarak yakalanır');
  const G2 = G_.yeni('1'); G_.projeEkle(G2, { id: 'a', ad: 'A' }); K.kademeAltin(G2, { id: 'k', ad: 'k', cekirdekProjeler: ['a'] });
  const v2 = G_.dogrula(G2);
  eq([v2.ok, v2.uyari], [true, ['kapı k: 1/4 çekirdek proje tanımlı']], 'proje: eksik içerik hata değil UYARI (dürüst durum)');
  eq(kodlar(K.degerlendir(G2, 'k', { denemeler: [], projeler: { a: { bitti: true } } })), ['proje-tanimi-eksik', 'proje-eksik'], 'proje: tanım eksikse kilit nedeni içeriğin eksik olduğunu söyler');
}

// ---- 8. Bütünleşik ve Joker ----
{
  const G = kapiOrnek();
  G_.kapiEkle(G, { id: 'diger', ad: 'Diğer alan', seviye: 'L5', hedefler: ['h-rota'] });
  let hata = null; try { K.butunlesik(G, { id: 'b0', ad: 'x', onkosulKapilar: ['temel'] }); } catch (e) { hata = e.message; }
  ok(/en az iki/.test(hata || ''), 'bütünleşik: tek önkoşullu kapı reddedilir (anlamlı birleşim yok)');
  K.butunlesik(G, { id: 'bn', ad: 'Bütünleşik', onkosulKapilar: ['temel', 'diger'] });
  K.joker(G, { id: 'jk', ad: 'Joker', onkosulKapilar: ['bn'] });
  const du = (d, k) => ({ denemeler: d, projeler: {}, kanitlar: k || [] });
  const hepsi = [dn('h-maske', 5, 5), dn('h-sozluk', 5, 5), dn('h-rota', 5, 5)];
  eq(kodlar(K.degerlendir(G, 'bn', du([dn('h-maske', 5, 5), dn('h-sozluk', 5, 5)]))), ['onkosul-kapi'], 'bütünleşik: bir önkoşul kapı eksikse kilitli');
  eq(K.degerlendir(G, 'bn', du(hepsi)).acik, true, 'bütünleşik: tüm önkoşul kapılar geçilince açık');
  const j0 = K.degerlendir(G, 'jk', du(hepsi));
  eq(kodlar(j0), O.JOKER_GEREKLER.map(() => 'kanit-yok'), 'Joker: 7 gereksinimin her biri ayrı kanıt ister (şablonu tamamlamak yetmez)');
  const kan = O.JOKER_GEREKLER.slice(0, 6).map(t => ({ tur: t, kapi: 'jk', dogrulama: 'istemci' }));
  eq(K.degerlendir(G, 'jk', du(hepsi, kan)).nedenler.map(x => x.ref), ['savunma'], 'Joker: eksik tek gereksinim (savunma) açıkça söylenir');
  kan.push({ tur: 'savunma', kapi: 'jk', dogrulama: 'istemci' });
  eq(K.degerlendir(G, 'jk', du(hepsi, kan)).acik, true, 'Joker: tüm gereksinim kanıtları varsa açık');
  eq(K.degerlendir(G, 'jk', du(hepsi, kan.map(k => Object.assign({}, k, { kapi: 'baska' })))).acik, false, 'Joker: başka kapıya ait kanıt sayılmaz');
  const dongu = G_.yeni('1'); G_.kapiEkle(dongu, { id: 'a', ad: 'a', onkosulKapilar: ['b'] }); G_.kapiEkle(dongu, { id: 'b', ad: 'b', onkosulKapilar: ['a'] });
  ok(kodlar(K.degerlendir(dongu, 'a', { denemeler: [], projeler: {} })).join() === 'onkosul-kapi' && K.degerlendir(dongu, 'b', { denemeler: [], projeler: {} }).acik === false, 'kapı: döngüsel önkoşul sonsuz döngüye girmez, kilitli kalır');
}

// ---- 9. Önkoşul grafiği incelenebilir ----
{
  const G = ornek();
  eq(G_.onkosulKapanisi(G, 'y2'), ['y1'], 'önkoşul: doğrudan ve dolaylı önkoşullar listelenir');
  G_.yetkinlikEkle(G, { id: 'y3', ad: 'Y3', onkosullar: ['y2'] });
  eq(G_.onkosulKapanisi(G, 'y3'), ['y1', 'y2'], 'önkoşul: kapanış sıralı (en temelden)');
  G.yetkinlikler.y1.onkosullar = ['y3'];
  const v = G_.dogrula(G);
  ok(!v.ok && v.hata.some(h => /döngü/.test(h)), 'önkoşul: döngü hata olarak yakalanır');
  eq(G_.onkosulKapanisi(G, 'y3').slice().sort(), ['y1', 'y2', 'y3'].filter(x => x !== 'y3' || G.yetkinlikler.y1.onkosullar.includes('y3')).sort(),  'önkoşul: döngülü grafikte kapanış sonlanır');
  const G2 = G_.yeni('1'); G_.yetkinlikEkle(G2, { id: 'a', onkosullar: ['yok'] }); G_.hedefEkle(G2, { id: 'h', yetkinlik: 'yok2' });
  eq(G_.dogrula(G2).hata.length, 2, 'önkoşul: bilinmeyen önkoşul ve yetkinlik hata');
  let yinelen = null; try { G_.yetkinlikEkle(G2, { id: 'a' }); } catch (e) { yinelen = e.message; }
  ok(/yinelenen/.test(yinelen || ''), 'graf: yinelenen kimlik reddedilir');
}

// ---- 10. Yollar arası aktarım: yalnız gerçekten eşleşen kanıt ----
{
  const G = G_.yeni('1');
  G_.yetkinlikEkle(G, { id: 'sec-y' }); G_.yetkinlikEkle(G, { id: 'qa-y' });
  G_.hedefEkle(G, { id: 'sec:log', yetkinlik: 'sec-y', kritik: true, esdegerler: ['qa:log'] });
  G_.hedefEkle(G, { id: 'qa:log', yetkinlik: 'qa-y', kritik: true, esdegerler: ['sec:log'] });
  G_.hedefEkle(G, { id: 'qa:rapor', yetkinlik: 'qa-y' });
  G_.hedefEkle(G, { id: 'sec:zayif', yetkinlik: 'sec-y', esik: 0.5, esdegerler: ['qa:strict'] });
  G_.hedefEkle(G, { id: 'qa:strict', yetkinlik: 'qa-y', esik: 0.9, esdegerler: ['sec:zayif'] });
  eq(G_.dogrula(G).ok, true, 'aktarım: karşılıklı ilan edilmiş eşdeğerlikler geçerli');
  eq(D.hedefDurumu(G, 'qa:log', [dn('sec:log', 5, 5)]).durum, 'gecti', 'aktarım: açıkça eşdeğer hedefte geçiş diğer yolda sayılır');
  eq(D.hedefDurumu(G, 'qa:rapor', [dn('sec:log', 5, 5)]).durum, 'denenmedi', 'aktarım: eşdeğer ilan edilmeyen hedefe otomatik geçiş YOK');
  eq(D.hedefDurumu(G, 'qa:strict', [dn('sec:zayif', 3, 5)]).gecmis[0].neden, 'aktarim-esik-dusuk', 'aktarım: daha düşük eşikle geçilen kanıt daha sıkı hedefe aktarılmaz');
  G.hedefler['qa:log'].kritik = true; G.hedefler['sec:log'].kritik = false;
  eq(D.hedefDurumu(G, 'qa:log', [dn('sec:log', 5, 5)]).gecmis[0].neden, 'aktarim-kritik-degil', 'aktarım: kritik olmayan kanıt kritik hedefe aktarılmaz');
  G.hedefler['qa:log'].esdegerler = [];
  ok(G_.dogrula(G).hata.some(h => /karşılıklı/.test(h)), 'aktarım: tek yönlü eşdeğerlik hata');
}

// ---- 11. Ders sırası (ilerleme) ≠ ustalık ----
{
  const G = G_.yeni('1');
    const T = { surum: 's', yollar: [{ id: 't', ad: 'T', dersler: [{ ad: 'Bir', modul: 'M1' }, { ad: 'İki', modul: 'M1' }, { ad: 'Üç', modul: 'M2' }] }], projeYollari: [] };
  const P = O.program.kur(T);
  eq([Object.keys(P.dersler), Object.keys(P.moduller)], [['ders:t:1', 'ders:t:2', 'ders:t:3'], ['modul:t:1', 'modul:t:2']], 'program: dersler ve modüller mevcut içerikten kurulur');
  eq(P.yetkinlikler['yet:t:2'].onkosullar, ['yet:t:1'], 'program: ders yetkinliği önceki dersin yetkinliğini önkoşul alır');
  eq(G_.dogrula(P).ok, true, 'program: kurulan grafik tutarlı');
  const du = (dt, d) => ({ denemeler: d || [], dersTamam: dt || {}, projeler: {}, kanitlar: [] });
  const a0 = K.dersAcik(P, 'ders:t:2', du());
  eq([a0.acik, kodlar(a0)], [false, ['onceki-ders-bitmedi']], 'ders sırası: önceki ders bitmeden ikinci ders kilitli');
  ok(/Bir/.test(a0.nedenler[0].mesaj), 'ders sırası: kilit nedeni önceki dersi adıyla söyler');
  eq(K.dersAcik(P, 'ders:t:1', du()).acik, true, 'ders sırası: ilk ders her zaman açık');
  const a1 = K.dersAcik(P, 'ders:t:2', du({ 'ders:t:1': true }));
  eq([a1.acik, a1.ustalik.durum, a1.bilgi.map(b => b.kod)], [true, 'kanit-yok', ['eski-kayit']], 'ders sırası: eski tamamlama sonrakini açar ama ustalık "kanıt yok" (sayfa açmak ≠ ustalık)');
  const kal = K.dersAcik(P, 'ders:t:2', du({ 'ders:t:1': true }, [dn('ders:t:1:sinav', 1, 5, { surum: 's' })]));
  eq([kal.acik, K.ustalik(P, 'ders:t:1', du({ 'ders:t:1': true }, [dn('ders:t:1:sinav', 1, 5, { surum: 's' })])).durum], [true, 'kismi'], 'ders sırası: kritik olmayan düşük sınav sonraki dersi bloklamaz ama ustalık "kısmi" ve telafi önerilir');
  P.hedefler['ders:t:1:sinav'].kritik = true;
  const kr = K.dersAcik(P, 'ders:t:2', du({ 'ders:t:1': true }, [dn('ders:t:1:sinav', 1, 5, { surum: 's' })]));
  eq([kr.acik, kodlar(kr)], [false, ['kritik-basarisiz']], 'ders sırası: kritik hedef başarısızsa sonraki ders bloklanır (telafi gerekir)');
  const iyi = K.dersAcik(P, 'ders:t:2', du({ 'ders:t:1': true }, [dn('ders:t:1:sinav', 1, 5, { surum: 's' }), dn('ders:t:1:sinav', 5, 5, { surum: 's' })]));
  eq([iyi.acik, K.ustalik(P, 'ders:t:1', du({ 'ders:t:1': true }, [dn('ders:t:1:sinav', 1, 5, { surum: 's' }), dn('ders:t:1:sinav', 5, 5, { surum: 's' })])).durum], [true, 'gecti'], 'ders sırası: telafiden sonra geçen yeni deneme engeli kaldırır');
}

// ---- 12. Depo: kalıcılık, değişmezlik, bozuk veri ----
{
  const S1 = mem();
  const r = O.depo.denemeEkle({ id: 'x1', hedef: 'h', puan: 4, maks: 5, tarih: '2026-10-11T10:00:00Z', surum: '1' }, S1);
  eq([r.ok, O.depo.oku(S1).denemeler.length], [true, 1], 'depo: deneme kaydedilir');
  eq(O.depo.oku(S1).denemeler[0].dogrulama, 'istemci', 'depo: doğrulama varsayılanı "istemci"; yardım varsayılanı güvenilmez');
  eq(O.depo.oku(S1).denemeler[0].yardim, { tur: 'bilinmiyor', guvenilir: false }, 'depo: yardım bilinmiyor/güvenilmez (bağımsızlık çıkarılmaz)');
  const t = O.depo.denemeEkle({ id: 'x1', hedef: 'h', puan: 0, maks: 5 }, S1);
  eq([t.tekrar, O.depo.oku(S1).denemeler.length, O.depo.oku(S1).denemeler[0].puan], [true, 1, 4], 'depo: aynı kimlikli kayıt eskisini ezmez (kanıt değişmez)');
  const taze = O.depo.oku(S1);   // "yenileme": depodan yeniden okuma
  eq(taze.denemeler[0].id, 'x1', 'depo: yenileme/yeniden girişte kayıt durur');
  eq([O.depo.denemeEkle({ hedef: 'h', puan: 6, maks: 5 }, S1).neden, O.depo.denemeEkle({ hedef: 'h', puan: 1, maks: 0 }, S1).neden, O.depo.denemeEkle({ puan: 1, maks: 2 }, S1).neden, O.depo.denemeEkle(null, S1).neden],
    ['puan-gecersiz', 'maks-gecersiz', 'hedef-yok', 'bos'], 'depo: geçersiz denemeler reddedilir');
  { const f = O.depo.denemeEkle({ id: 'sahte', hedef: 'h', puan: 1, maks: 2, dogrulama: 'sunucu', yardim: { tur: 'yok', guvenilir: true } }, S1).deneme;
    eq([f.dogrulama, f.yardim.guvenilir], ['istemci', false], 'depo: istemci "sunucu" doğrulaması ve "güvenilir yardım" iddiasını yazamaz (sahteleme engeli)'); }
  const S2 = mem(); S2.m.ya_pp_ogr = '{bozuk';
  eq([O.depo.oku(S2).denemeler.length, S2.m.ya_pp_ogr_bozuk], [0, '{bozuk'], 'depo: bozuk içerik hata vermez ve yedeklenir');
  O.depo.projeIsaretle('p', { tarih: 'T' }, S2); O.depo.projeIsaretle('p', { tarih: 'U' }, S2);
  eq(O.depo.oku(S2).projeler.p.tarih, 'T', 'depo: proje bitişi bir kez yazılır');
  eq(O.depo.kanitEkle({ id: 'k1', tur: 'savunma', kapi: 'jk' }, S2).ok && O.depo.kanitEkle({ id: 'k1', tur: 'x' }, S2).tekrar, true, 'depo: kanıt kimliği tekrarlanmaz');
  const yok = { getItem() { throw new Error('x'); }, setItem() { throw new Error('kota'); } };
  eq([O.depo.oku(yok).denemeler.length, O.depo.denemeEkle({ hedef: 'h', puan: 1, maks: 2 }, yok).ok], [0, false], 'depo: erişilemeyen depo hata fırlatmaz');
}

// ---- 13. Eski veri dönüştürücü: gerçek eski biçimli örnek ----
{
  const eskiLc = { 's-ccna-1': { w: 1, r: 1, q: 1, p: 1, d: '2026-10-08' }, 's-ccna-2': { w: 1, r: 1, d: '2026-10-09' }, 'l-ozel': { w: 1, r: 1, q: 1, p: 1 }, _cut: { ccna: { d: '2026-10-08', pn: 0 } }, kotu: 5 };
  const eskiGs = { sk: { ccna: 1.6 }, bx: { 3: 2 }, st: { 3: [3, 3], 4: [1, 4], 7: [2, 2], 9: [5, 2], x: [1, 1], 11: [1, 1] }, ts: '2026-10-09T12:00:00.000Z' };
  const eskiLv = { ccna: { l: 2, s: 40, m: 100, d: '2026-10-08' }, sec: { l: 1 } };
  const eskiPl = { ccna: { lv: 2.3, n: 3, ok: 2, d: '2026-10-08' }, eng: { lv: 1, n: 0, ok: 0, d: 'x', skip: true } };
  const girdi = { lc: eskiLc, gs: eskiGs, lv: eskiLv, pl: eskiPl };
  const ham = JSON.stringify(girdi);
  const yol = i => ({ 3: 'ccna', 4: 'ccna', 7: 'sec', 9: 'sec', 11: null }[i] || null);
  const c = O.eski.cevir(girdi, yol);
  eq(JSON.stringify(girdi), ham, 'eski: dönüştürme girdiyi DEĞİŞTİRMEZ');
  eq(Object.keys(c.ilerleme), ['ders:ccna:1', 'ders:ccna:2', 'ders:ozel:l-ozel'], 'eski: ders anahtarları (s-<yol>-<n> → ders:<yol>:<n>); "_" iç kayıtları ve bozuk giriş atlanır');
  eq(c.dersTamam, { 'ders:ccna:1': true, 'ders:ozel:l-ozel': true }, 'eski: yalnız dört bayrağın hepsi tamam olan ders "tamam" (ya_lc kuralı)');
  eq(c.ilerleme['ders:ccna:2'], { w: true, r: true, q: false, p: false, tarih: '2026-10-09', tamam: false, kaynak: 'ya_lc' }, 'eski: yarım ders bayrakları aynen taşınır');
  const gs = c.denemeler.filter(d => d.kaynak === 'ya_gs');
  eq(gs.map(d => [d.hedef, d.puan, d.maks]), [['soru-bankasi:ccna', 4, 7], ['soru-bankasi:sec', 2, 2]], 'eski: soru istatistikleri yol başına toplanır; bozuk ([5,2]) ve yolu bilinmeyen atlanır');
  ok(gs.every(d => d.dogrulama === 'istemci' && d.surum === O.eski.SURUM && d.yardim.guvenilir === false), 'eski: toplu denemeler "istemci" güveniyle ve eski sürüm etiketiyle gelir');
  eq(c.kanitlar.map(k => [k.id, k.tur, k.seviye, k.oran]), [['eski-lv-ccna', 'tanilama', 2, 0.4], ['eski-pl-ccna', 'yerlestirme', 2.3, 2 / 3]], 'eski: seviye testi ve yerleştirme tanılama kanıtı olur; atlanmış yerleştirme ve ölçümsüz seviye kaydı alınmaz');
  eq(c.atlanan > 0, true, 'eski: atlanan bozuk kayıt sayısı bildirilir (sessiz kayıp yok)');
  eq(JSON.stringify(O.eski.cevir(girdi, yol)), JSON.stringify(c), 'eski: dönüştürme belirleyici (aynı girdi aynı çıktı)');
  eq(O.eski.cevir(null, null).denemeler, [], 'eski: boş/null girdi güvenli');
  // Eski depodan canlı okuma: depoya hiçbir şey yazılmaz
  const depo = { m: { ya_lc: JSON.stringify(eskiLc), ya_gs: JSON.stringify(eskiGs), ya_lv: JSON.stringify(eskiLv), ya_pl: JSON.stringify(eskiPl) }, getItem(k) { return k in this.m ? this.m[k] : null; }, setItem() { throw new Error('YAZMA YASAK'); }, removeItem() { throw new Error('SİLME YASAK'); } };
  const once = JSON.stringify(depo.m);
  const c2 = O.eski.oku(depo, yol);
  eq([JSON.stringify(depo.m) === once, c2.denemeler.length, Object.keys(c2.dersTamam).length], [true, 2, 2], 'eski: canlı okuma eski anahtarlara yazmaz, silmez, biçimi değiştirmez');
  eq(O.eski.oku({ getItem() { return '{bozuk'; } }, yol).denemeler, [], 'eski: bozuk JSON güvenli');
  // Dönüştürülen eski kayıt yeni model üzerinde: ilerleme ≠ ustalık, soru bankası kanıtı yeterli miktarda ise sayılır
  const P = O.program.kur({ surum: '1', yollar: [{ id: 'ccna', ad: 'CCNA', dersler: [{ ad: 'Ağ', modul: 'T' }, { ad: 'IP', modul: 'A' }, { ad: 'Switch', modul: 'A' }] }, { id: 'sec', ad: 'Siber', dersler: [] }], projeYollari: [] });
  const du = O.program.durumKur(O.depo.oku(mem()), c, [], null);
  eq(K.dersAcik(P, 'ders:ccna:2', du).acik, true, 'eski+yeni: eski tamamlanan ders sonrakini açar (geriye uyum)');
  eq(K.dersAcik(P, 'ders:ccna:3', du).acik, false, 'eski+yeni: tamamlanmamış dersin sonrakisi kilitli kalır');
  eq(K.dersAcik(P, 'ders:ccna:2', du).ustalik.durum, 'kanit-yok', 'eski+yeni: eski tamamlama ustalık sayılmaz');
  eq(D.hedefDurumu(P, 'soru-bankasi:ccna', du.denemeler).gecmis.map(x => x.neden), ['yetersiz-kanit'], 'eski+yeni: 7 soruluk eski kanıt (<20) ustalık için yetersiz');
  const buyuk = { lc: {}, gs: { st: { 1: [18, 20], 2: [9, 10] } } };
  const d2 = O.program.durumKur(O.depo.oku(mem()), O.eski.cevir(buyuk, () => 'ccna'), [], null);
  const sb = D.hedefDurumu(P, 'soru-bankasi:ccna', d2.denemeler);
  eq([sb.durum, sb.oran, sb.guven], ['gecti', 0.9, 'istemci'], 'eski+yeni: 30 soruda %90 eski kanıt geçer ama güven "istemci"');
}

// ---- 13b. Düzeltme regresyonları (inceleme bulguları) ----
{
  // %80 ortalama ondalık hatası: (1+1+0.4)/3 = 0.7999… kapıyı kilitlememeli
  const G = G_.yeni('1'); G_.yetkinlikEkle(G, { id: 'y' });
  ['a', 'b', 'c'].forEach(x => G_.hedefEkle(G, { id: x, yetkinlik: 'y', esik: 0.1 }));
  G_.kapiEkle(G, { id: 'k', ad: 'k', hedefler: ['a', 'b', 'c'] });
  const r = K.degerlendir(G, 'k', { denemeler: [dn('a', 1, 1), dn('b', 1, 1), dn('c', 2, 5)], projeler: {}, kanitlar: [] });
  eq([r.acik, kodlar(r)], [true, []], 'kapı: kritik olmayan ortalama tam %80 iken ondalık hatası kapıyı kilitlemez');
  // Kapı eşiği kritik hedefi de yükseltir
  const G2 = G_.yeni('1'); G_.yetkinlikEkle(G2, { id: 'y' }); G_.hedefEkle(G2, { id: 'c', yetkinlik: 'y', kritik: true });
  G_.kapiEkle(G2, { id: 'k', ad: 'k', hedefler: ['c'], esik: 0.9 });
  eq(kodlar(K.degerlendir(G2, 'k', { denemeler: [dn('c', 17, 20)], projeler: {}, kanitlar: [] })), ['kritik-basarisiz'], 'kapı: kapı eşiği %90 iken %85 kritik hedef geçmez');
  // Tüm varyantlarda kalınca kalıcı kilit olmamalı
  const G3 = ornek();
  const de = D.hedefDurumu(G3, 'h-maske', [dn('h-maske', 1, 5, { varyant: 'A' }), dn('h-maske', 1, 5, { varyant: 'B' }), dn('h-maske', 1, 5, { varyant: 'C' }), dn('h-maske', 5, 5, { varyant: 'A' })]);
  eq(de.durum, 'gecti', 'varyant: tüm varyantlarda kalındıktan sonra yeni tur sayılır (kalıcı kilit yok)');
  // Aynı gün aynı puanlı ikinci deneme ayrı kayıt olur, son deneme belirler
  const M = mem();
  O.depo.denemeEkle({ id: 'dq-1', hedef: 'h', puan: 4, maks: 5, tarih: '2026-10-11T10:00:00Z' }, M);
  O.depo.denemeEkle({ id: 'dq-2', hedef: 'h', puan: 2, maks: 5, tarih: '2026-10-11T11:00:00Z' }, M);
  O.depo.denemeEkle({ id: 'dq-3', hedef: 'h', puan: 4, maks: 5, tarih: '2026-10-11T12:00:00Z' }, M);
  eq(O.depo.oku(M).denemeler.map(d => d.puan), [4, 2, 4], 'depo: aynı gün aynı puanlı tekrar ayrı deneme olarak kaydedilir (benzersiz kimlikle)');
}

// ---- 14. Program kurucu: proje yolları, kademe kapıları, içerik açığı ----
{
  const T = { surum: 'v', yollar: [], projeYollari: [{ id: 'sec', ad: 'Siber', projeler: [{ id: 'sec1', ad: 'A', lv: 1 }, { id: 'sec2', ad: 'B', lv: 2 }, { id: 'sec3', ad: 'C', lv: 3 }, { id: 'sec4', ad: 'D', lv: 3, cap: true }] }] };
  const G = O.program.kur(T);
  eq(Object.keys(G.kapilar), ['altin:sec:1', 'altin:sec:2', 'altin:sec:3'], 'program: her kademe için bir Altın Vuruş kapısı');
  eq(G.kapilar['altin:sec:2'].onkosulKapilar, ['altin:sec:1'], 'program: kademeler sıralı (2. kademe 1. kademeyi ister)');
  eq(O.program.icerikAcigi(G).map(x => [x.kapi, x.tanimli, x.gerekli, x.eksik]), [['altin:sec:1', 1, 4, 3], ['altin:sec:2', 1, 4, 3], ['altin:sec:3', 2, 4, 2]], 'program: içerik açığı dürüstçe raporlanır (kademe başına 4 çekirdek proje yok)');
  const r = K.degerlendir(G, 'altin:sec:2', { denemeler: [], projeler: {}, kanitlar: [] });
  eq(kodlar(r).sort(), ['onkosul-kapi', 'proje-eksik', 'proje-tanimi-eksik'], 'program: 2. kademe kilidi: önkoşul kapı + çekirdek proje + eksik içerik');
  const dk = O.program.durumKur({ denemeler: [], projeler: {} }, { denemeler: [], dersTamam: {} }, [{ pid: 'sec1', status: 'bitti' }, { pid: 'sec2', status: 'yapılıyor' }], pid => 'proje:sec:' + pid);
  eq(Object.keys(dk.projeler), ['proje:sec:sec1'], 'program: biten projeler graf anahtarıyla eşlenir');
}

// ======== Faz 4: tek tanımlar (ilerleme/ustalık/seri), mini sınav kapısı, telafi, aralıklı tekrar, açıklama modları ========
// ---- 15. İlerleme (ders tamam) tek tanımı ----
{
  const I = O.ilerleme;
  eq([I.dersTamam({ w: 1, r: 1, q: 1, p: 1 }), I.dersTamam({ w: 1, r: 1, q: 1 }), I.dersTamam(null), I.dersTamam('x')], [true, false, false, false], 'ilerleme: ders tamam = w+r+q+p dördü');
  eq(I.tamamSayisi({ a: { w: 1, r: 1, q: 1, p: 1 }, b: { w: 1 }, _cut: { w: 1, r: 1, q: 1, p: 1 } }, [{ id: 'a', status: 'built' }, { id: 'k', status: 'built' }, { id: 'm', status: 'building' }]), 2,
    'ilerleme: tamamlanan ders = ya_lc tamamı ∪ built konu; aynı kimlik (a) bir kez; "_" iç kayıt ve building sayılmaz');
  eq([{ status: 'built' }, { status: 'building', mastery: 40 }, { status: 'building', mastery: 39.9 }, { status: 'next' }, { status: 'locked' }, null].map(I.asama), [4, 3, 2, 1, 0, 0], 'ilerleme: konu aşaması tek formül (stageOf)');
  const sd = I.sabitDurumlar(5, i => i === 2, 2);
  eq(sd.map(x => [x.durum, x.kaynak, x.ustalik]), [['built', 'yerlestirme', 60], ['built', 'yerlestirme', 60], ['built', 'ders', 60], ['next', null, 0], ['open', null, 0]],
    'ilerleme: yerleştirmeyle atlanan dersler "built" görünür ama kaynak "yerlestirme" (tamamlama değil); ilk açık ders "next"');
}
// ---- 16. Ustalık tanılama ölçüleri (tek yer) ----
{
  const U = O.ustalik;
  eq([U.soruDuzeyi([3, 3], 3), U.soruDuzeyi([2, 2], 0), U.soruDuzeyi([7, 10], 0), U.soruDuzeyi([69, 100], 4), U.soruDuzeyi([0, 0], 0)], [3, 2, 1, 0, null], 'ustalık: soru düzeyi (Usta/Yeterli/Aşina/Denendi; denenmemiş null)');
  eq([U.beceriAdim(1.5, 2, true), U.beceriAdim(1.5, 1, true), U.beceriAdim(1.5, 1, false), U.beceriAdim(1.5, 2, false), U.beceriAdim(2.98, 3, true), U.beceriAdim(1.02, 1, false)].map(x => Math.round(x * 100) / 100),
    [1.59, 1.54, 1.36, 1.43, 3, 1], 'ustalık: beceri tahmini adımı ±(0.09/0.04 | 0.14/0.07), [1,3] sınırı');
  eq([U.kutuAdim(3, true), U.kutuAdim(4, true), U.kutuAdim(2, false), U.kutuAdim(undefined, true)], [4, 4, 0, 1], 'ustalık: tekrar kutusu 0–4');
  eq([U.yerlestirmeDuzeyi([{ d: 1 }, { d: 2 }, { d: 3 }], [1, 0, 1]), U.yerlestirmeDuzeyi([], []), U.yerlestirmeBandi(1.49), U.yerlestirmeBandi(1.5), U.yerlestirmeBandi(2.3)], [2.3, 1, 0, 1, 2], 'ustalık: yerleştirme düzeyi ve bandı');
  eq([U.seviyeSinavDuzeyi(0.62), U.seviyeSinavDuzeyi(0.61), U.seviyeSinavDuzeyi(0.32), U.seviyeSinavDuzeyi(0.31), U.SEVIYE_BECERI[3]], [3, 2, 2, 1, 2.5], 'ustalık: seviye sınavı düzeyi');
  const G = ornek();
  eq(U.hedef(G, 'h-sozluk', [dn('h-sozluk', 4, 5)]).durum, 'gecti', 'ustalık: kanıta dayalı geçti/kaldı tek kaynaktan (PP.ogr.deg)');
}
// ---- 17. Seri: tek sayaç, adlandırılmış türler ----
{
  const S = O.seri, B = '2026-10-11', g = n => O.gun.ekle(B, -n), set = a => { const o = {}; a.forEach(n => { o[g(n)] = 1; }); return o; };
  eq([S.calisma(set([0, 1, 2]), {}, B), S.calisma(set([1, 2]), {}, B), S.calisma(set([0, 2]), set([1]), B), S.calisma(set([0, 3]), {}, B), S.calisma({}, {}, B)], [3, 2, 2, 1, 0],
    'seri (çalışma): bugün dahil; bugün yoksa dünden; joker köprüler ama sayılmaz; boşluk keser');
  eq([S.oyun(d => set([0, 1])[d] === 1, B), S.masa(set([1, 2, 3]), B), S.lig({ [g(0)]: { tot: 3 }, [g(1)]: { tot: 0 } }, B)], [2, 3, 1], 'seri: oyun/masa/lig türleri aynı sayaçla');
  eq(S.oyun(() => true, B), 400, 'seri (oyun): eski üst sınır 400 gün korunur');
  eq([O.gun.ekle('2026-03-01', -1), O.gun.ekle('2024-12-31', 1), O.gun.fark('2026-10-11', '2026-10-01')], ['2026-02-28', '2025-01-01', 10], 'gün yardımcıları: ay/yıl geçişi, fark');
}
// ---- 18. Mini sınav kapısı (%80) ve telafi metni ----
{
  const ms = K.miniSinav;
  eq([ms(4, 5).gecti, ms(3, 5).gecti, ms(3, 5).neden, ms(5, 5, 4).neden, ms(0, 0).gecti, ms(9, 10, 10, 0.95).gecti], [true, false, 'esik-altinda', 'cevaplanmadi', true, false],
    'mini sınav kapısı: %80 sınırda geçer, %60 kalır, eksik cevap kalır, sorusuz açık, hedef eşiği yükseltebilir');
  const t1 = D.telafiAdimlari('X', 0.4, 0.8, { varyant: 'v1', uyari: 'tek-varyant' }), t2 = D.telafiAdimlari('X', 0.4, 0.8, { varyant: 'B', uyari: null });
  ok(/farklı varyant yok/.test(t1[5].metin) && /farklı bir varyantla \(B\)/.test(t2[5].metin), 'telafi: tek varyantta "aynı sorular" dürüstçe söylenir; çok varyantta farklı varyant');
  eq(t1.length, 6, 'telafi: 6 adım');
  eq(K.rutbeKosullari({ q: 40, acc: 0.8, les: 3 }, { soru: { n: 40, acc: 0.8 }, ders: 3, proje: 0, seviyeTesti: false, prova: { n: 0, avg: 0 } }).map(x => x.ok), [true, true], 'rütbe kapısı koşulları PP.ogr.kapi altında');
}
// ---- 19. Aralıklı tekrar planı (Fail-Forward telafisine bağlı) ----
{
  const G = ornek(), B = '2026-10-20';
  const d = (h, p, m, t, v) => dn(h, p, m, { tarih: t, varyant: v || null });
  let ds = [d('h-maske', 2, 5, '2026-10-18T10:00:00Z', 'A')];
  let pl = O.tekrar.plan(G, ds, B);
  eq([pl.bugun.length, pl.bugun[0].hedef, pl.bugun[0].durum, pl.bugun[0].varyant], [1, 'h-maske', 'kaldi', 'B'], 'tekrar: başarısız hedef bugün vadeli, telafi sonrası FARKLI varyant (B)');
  ok(/gereken %80/.test(pl.bugun[0].neden) && pl.bugun[0].telafi.length === 6, 'tekrar: "neden bugün" metni ve telafi adımları');
  ds = ds.concat([d('h-maske', 5, 5, '2026-10-20T10:00:00Z', 'B')]);
  pl = O.tekrar.plan(G, ds, B);
  eq([pl.bugun.length, pl.sonra[0].vade, pl.sonra[0].aralik], [0, '2026-10-21', 1], 'tekrar: tamamlanan tekrar planı değiştirir (geçince 1 gün sonraya)');
  ds = ds.concat([d('h-maske', 5, 5, '2026-10-21T10:00:00Z', 'C')]);
  pl = O.tekrar.plan(G, ds, '2026-10-21');
  eq([pl.sonra[0].vade, pl.sonra[0].aralik], ['2026-10-24', 3], 'tekrar: art arda ikinci geçiş aralığı 3 gün');
  eq(O.tekrar.plan(G, ds, '2026-10-24').bugun.map(x => [x.hedef, x.durum]), [['h-maske', 'gecti']], 'tekrar: vadesi gelen geçmiş hedef yeniden kuyruğa girer');
  ds = ds.concat([d('h-maske', 1, 5, '2026-10-24T10:00:00Z', 'B')]);
  eq(O.tekrar.plan(G, ds, '2026-10-24').bugun.map(x => x.durum), ['kaldi'], 'tekrar: başarısız öğe geri gelir (yeniden telafi)');
  const pr = O.tekrar.plan(G, [d('h-sozluk', 1, 5, '2026-10-19T10:00:00Z'), d('h-maske', 3, 5, '2026-10-19T10:00:00Z', 'A')], B);
  eq(pr.bugun.map(x => x.hedef), ['h-maske', 'h-sozluk'], 'tekrar: kritik hedef önce (aynı durumda, oran daha yüksek olsa da)');
  const M = mem();
  ds.forEach(x => O.depo.denemeEkle(x, M));
  eq(JSON.stringify(O.tekrar.plan(G, O.depo.oku(M).denemeler, '2026-10-24')), JSON.stringify(O.tekrar.plan(G, ds.map(x => O.depo.normalle(x).deneme), '2026-10-24')), 'tekrar: kuyruk kalıcı depodan aynen yeniden kurulur');
  eq(O.tekrar.plan(G, [], B), { bugun: [], sonra: [] }, 'tekrar: deneme yoksa kuyruk boş (cezasız, uydurma öğe yok)');
}
// ---- 20. Açıklama modları ve kalıcı tercih ----
{
  const A = O.aciklama, k = { baslik: 'Ağ', neden: 'Cihazlar konuşur. İkinci cümle.', cikti: 'Ofis ağını çizersin', adimlar: [['Switch', 'aynı ağ'], ['Router', 'farklı ağlar']], ornek: 'PC → Switch', arizalar: [['Router bozulursa', 'internet yok']], durumlar: [['İki şube', 'Router', 'Switch']], benzetme: 'Posta gibi', mulakat: [{ q: 'Switch nedir?', a: 'Aynı ağı bağlar' }] };
  eq(A.MODLAR.length, 8, 'açıklama: 8 mod');
  const ciktilar = A.MODLAR.map(m => JSON.stringify(A.icerik(m[0], k).maddeler));
  eq(new Set(ciktilar).size, 8, 'açıklama: aynı kaynaktan 8 mod 8 farklı açıklama üretir (mod değişimi anlamlı)');
  eq(A.icerik('kisa', k).maddeler, ['Ofis ağını çizersin', 'Cihazlar konuşur.'], 'açıklama: kısa özet = çıktı + ilk cümle (kaynaktan, uydurma yok)');
  eq([A.icerik('yok', k).mod, A.icerik('ornek', {}).bos], ['standart', true], 'açıklama: bilinmeyen mod standart; içerik yoksa "boş" (uydurmaz)');
  const M = mem();
  O.depo.denemeEkle({ id: 'x1', hedef: 'h', puan: 1, maks: 1 }, M);
  ok(O.depo.tercih('aciklama', 'adim', M), 'tercih: yazıldı');
  eq([O.depo.tercih('aciklama', undefined, M), O.depo.oku(M).denemeler.length, JSON.parse(M.m.ya_pp_ogr).tercih.aciklama], ['adim', 1, 'adim'], 'tercih: kalıcı (ya_pp_ogr.tercih), denemeleri bozmaz');
  O.depo.denemeEkle({ id: 'x2', hedef: 'h', puan: 1, maks: 1 }, M);
  eq(O.depo.tercih('aciklama', undefined, M), 'adim', 'tercih: sonraki deneme yazımı tercihi korur');
  const R = mem(); R.removeItem = k2 => { delete R.m[k2]; }; R.setItem('ya_pp_ogr', '{}'); R.setItem('ya_lc', '{"a":1}');
  ok(O.depo.sifirla(R) && !('ya_pp_ogr' in R.m) && R.m.ya_lc === '{"a":1}', 'depo.sifirla: yalnız ya_pp_ogr kaldırılır, başka anahtar silinmez');
}

// ---- Faz 12 V1: ders şeması (isteğe bağlı alanlar) ve ders içeriği denetimi (content/lessons) ----
{
  const vm = require('vm');
  const OD = O.ders;
  const temel = (ek) => Object.assign({ hook: 'h', homework: 'ö', blocks: [{ t: 'p', text: 'x' }], quiz: [{ q: 'Soru?', options: ['A', 'B', 'C', 'D'], answer: 'B', why: 'çünkü' }] }, ek || {});
  const bugun = '2026-10-13';
  // eski ders (yeni alan yok) hata vermez; yalnız "eksik" sayılır
  let r = OD.denetle({ x: { 1: temel() } }, null, bugun);
  eq(r.hata, [], 'şema: yeni alanı olmayan eski ders hatasız');
  eq([r.eksik[0].objectivesYok, r.eksik[0].ozetYok, r.eksik[0].whyNotEksik, r.eksik[0].dogrulamaYok], [true, true, 3, true], 'şema: eksik raporu hedef, özet, whyNot (3 yanlış seçenek) ve doğrulama eksiğini söyler');
  // geçerli yeni alanlar
  const tam = temel({ objectives: ['Bir isteği okuyabilir', { id: 'h2', text: 'Durum kodunu yorumlayabilir' }], summary: ['a', 'b', 'c'], prereq: [], minutes: 20, sonDogrulama: '2026-10-01', surum: '1',
    quiz: [{ q: 'Soru?', options: ['A', 'B', 'C', 'D'], answer: 'B', why: 'çünkü', obj: 'h1', whyNot: { A: 'a değil', C: 'c değil', D: 'd değil' } }] });
  r = OD.denetle({ x: { 1: tam, 2: temel({ prereq: [1] }) } }, null, bugun);
  eq(r.hata, [], 'şema: geçerli objectives/summary/prereq/minutes/sonDogrulama/surum/obj/whyNot hatasız');
  eq([r.say.hedefli, r.say.ozetli, r.say.dogrulamali, r.say.whyNotVar], [1, 1, 1, 3], 'şema: sayaçlar (hedefli, özetli, doğrulamalı, whyNot)');
  eq(r.eksik[0].hedefSorusuz, ['h2'], 'şema: soru eşlemesi olmayan hedef (h2) raporlanır');
  eq(OD.hedefler(tam).map(x => x.id + ':' + x.text), ['h1:Bir isteği okuyabilir', 'h2:Durum kodunu yorumlayabilir'], 'hedefler: dizgi ve nesne biçimi aynı sonuca normalleşir');
  eq([OD.secenekNedeni(tam.quiz[0], 'A'), OD.secenekNedeni(tam.quiz[0], 'B'), OD.secenekNedeni(tam.quiz[0], 'yok'), OD.secenekNedeni(temel().quiz[0], 'A')], ['a değil', null, null, null], 'secenekNedeni: yalnız yanlış seçenek için, doğru seçenek ve alan yokken null');
  // bozuk alanlar yakalanır (her biri ayrı)
  const kotu = (ek, parca, m) => { const x = OD.denetle({ x: { 1: temel(ek), 2: temel() } }, null, bugun).hata.join(' | '); ok(x.indexOf(parca) >= 0, 'şema hatası yakalanır: ' + m + (x.indexOf(parca) >= 0 ? '' : ' → ' + x)); };
  const q = (ek) => [Object.assign({ q: 'S?', options: ['A', 'B'], answer: 'B', why: 'w' }, ek)];
  kotu({ objectives: ['tek'] }, 'objectives 2-4', 'tek hedef');
  kotu({ objectives: ['a', 'b', 'c', 'd', 'e'] }, 'objectives 2-4', 'beş hedef');
  kotu({ objectives: ['a', ''] }, 'objectives 2-4', 'boş hedef metni');
  kotu({ quiz: q({ obj: 'h9' }), objectives: ['a', 'b'] }, 'bilinmeyen hedefe', 'olmayan hedefe obj');
  kotu({ quiz: q({ whyNot: { Z: 'x' } }) }, 'seçenek değil', 'whyNot anahtarı seçenek değil');
  kotu({ quiz: q({ whyNot: { B: 'x' } }) }, 'doğru seçenek için', 'whyNot doğru seçenek için');
  kotu({ quiz: q({ whyNot: { A: ' ' } }) }, 'metni boş', 'whyNot boş metin');
  kotu({ quiz: q({ answer: 'Z' }) }, 'answer seçeneklerde yok', 'cevap seçeneklerde yok');
  kotu({ summary: ['a', 'b'] }, 'summary 3-5', 'iki maddelik özet');
  kotu({ prereq: [9] }, 'bilinmeyen ders', 'olmayan önkoşul');
  kotu({ prereq: [1] }, 'kendi önkoşulu', 'kendi önkoşulu');
  kotu({ minutes: 0 }, 'minutes 1-120', 'sıfır dakika');
  kotu({ sonDogrulama: '2026-13-40' }, 'sonDogrulama YYYY-AA-GG', 'geçersiz tarih');
  kotu({ sonDogrulama: '2027-01-01' }, 'gelecekte', 'gelecek tarihli doğrulama');
  kotu({ hook: '' }, 'hook yok', 'zorunlu alan: hook');
  kotu({ quiz: [] }, 'quiz yok', 'zorunlu alan: quiz');
  // döngü ve kopya başlık
  const dong = OD.denetle({ x: { 1: temel({ prereq: [2] }), 2: temel({ prereq: [1] }) } }, null, bugun).hata.join(' | ');
  ok(/önkoşul döngüsü/.test(dong), 'önkoşul döngüsü yakalanır: ' + dong);
  eq(OD.denetle({ x: { 1: temel(), 2: temel() } }, { x: ['Aynı', 'Aynı'] }, bugun).hata.length, 1, 'kopya ders başlığı yakalanır');
  // son doğrulama etiketi ve bayat uyarısı (6 ay = 183 gün)
  eq([OD.dogrulamaDurumu({ sonDogrulama: '2026-10-01' }, bugun), OD.dogrulamaDurumu({}, bugun), OD.dogrulamaDurumu({ sonDogrulama: 'x' }, bugun)], [{ bayat: false, gun: 12, etiket: 'son doğrulama: 2026-10-01' }, null, null], 'doğrulama durumu: güncel / yok / geçersiz');
  eq([OD.dogrulamaDurumu({ sonDogrulama: '2026-04-12' }, bugun).bayat, OD.dogrulamaDurumu({ sonDogrulama: '2026-04-13' }, bugun).bayat], [true, false], 'doğrulama durumu: 183 günden eski = bayat (2026-04-12 = 184 gün bayat, 2026-04-13 = 183 gün değil)');

  // gerçek içerik: content/lessons/*.js, index.html'deki sırayla
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  const win = {}, ctx = { window: win, console }; ctx.self = ctx.globalThis = win; vm.createContext(ctx);
  [...html.matchAll(/<script src="(content\/lessons\/[^"]+)"/g)].forEach(m => vm.runInContext(fs.readFileSync(path.join(__dirname, '..', m[1]), 'utf8'), ctx, { filename: m[1] }));
  const sinif = fs.readFileSync(path.join(__dirname, '..', 'js', 'sinif', 'sinif.js'), 'utf8');
  const bas = sinif.indexOf('var STARTER='), bit = sinif.indexOf('function starterTopics', bas);
  const basliklar = {};
  if (bas >= 0 && bit > bas) { const S_ = vm.runInNewContext('(function(){' + sinif.slice(bas, bit) + ';return STARTER})()'); Object.keys(S_).forEach(y => { basliklar[y] = S_[y].map(x => x[0]); }); }
  ok(Object.keys(basliklar).length >= 4, 'ders başlıkları (STARTER) okundu: ' + Object.keys(basliklar).join(','));
  // Cevap anahtarı sunucuda (Faz 9): yerelde gizli tohum varsa (supabase/seed/*_anahtar.sql; halka açık repoda YOK) answer/why/whyNot denetimi de çalışır;
  // yoksa açıkça ATLANDI yazılır (sessizce geçmez).
  const seedDir = path.join(__dirname, '..', 'supabase', 'seed'), anahtarDosyalari = fs.existsSync(seedDir) ? fs.readdirSync(seedDir).filter(f => /_anahtar\.sql$/.test(f)) : [];
  let cozucu = null;
  if (anahtarDosyalari.length) {
    const harita = new Map();
    anahtarDosyalari.forEach(f => require('../tools/cevap-anahtari.js').anahtarSqlOku(fs.readFileSync(path.join(seedDir, f), 'utf8')).forEach(r => harita.set(r[0] + '|' + r[1] + '|' + r[2], { dogru: r[3], aciklama: r[5] || {} })));
    cozucu = (yol, no, id) => harita.get('ders:' + yol + ':' + no + ':sinav|v1|' + id) || null;
  }
  /* gerçek içerik gerçek bugüne göre denetlenir (sabit `bugun` yalnız yukarıdaki sahte örnekler içindir); aksi halde yeni yazılan dersin sonDogrulama tarihi "gelecekte" sayılırdı */
  const g = OD.denetle(win.PP_LESSONS, basliklar, O.gun.bugun(), cozucu);
  eq(g.hata, [], 'ders içeriği (content/lessons): ' + g.say.ders + ' ders, ' + g.say.soru + ' soru; zorunlu alanlar, soru/cevap, whyNot/obj/summary/prereq geçerliliği, önkoşul döngüsü ve kopya başlık yok');
  ok(g.say.sunucuSoru === g.say.soru, 'tüm ders sınavı soruları sunucuya ayrılmış (içerikte answer/why yok, id var): ' + g.say.sunucuSoru + '/' + g.say.soru);
  if (cozucu) ok(g.say.anahtarDenetimiAtlandi === 0, 'cevap anahtarı denetimi (yerel gizli tohum): ' + g.say.sunucuSoru + ' sorunun hepsi answer/why/whyNot kurallarıyla denetlendi');
  else console.log('ATLANDI  cevap anahtarı denetimi: gizli tohum (supabase/seed/*_anahtar.sql) bu makinede yok; ' + g.say.anahtarDenetimiAtlandi + ' soruda yalnız yapı denetlendi');
  ok(g.say.ders >= 90 && g.say.soru >= 400, 'ders içeriği kapsamı beklenenden küçük değil (' + g.say.ders + ' ders, ' + g.say.soru + ' soru)');
}

console.log(`\n${n} kontrol, ${fails} hata`);
process.exit(fails ? 1 : 0);

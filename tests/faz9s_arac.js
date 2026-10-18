// Faz 9 sunucu: tools/cevap-anahtari.js davranışı (sentetik mini proje üzerinde; gerçek içeriğe ve veritabanına dokunmaz).
// Beklenenler elle yazıldı. Çıkış kodu: hata varsa 1.
const fs = require('fs'), os = require('os'), path = require('path'), vm = require('vm');
const T = require('../tools/cevap-anahtari.js');
let n = 0, fails = 0;
const ok = (c, m) => { n++; console.log((c ? 'OK    ' : 'HATA  ') + m); if (!c) fails++; };
const eq = (a, b, m) => { const s = JSON.stringify(a) === JSON.stringify(b); ok(s, m + (s ? '' : '  → beklenen ' + JSON.stringify(b) + ', gelen ' + JSON.stringify(a))); };
const hata = (f) => { try { f(); return null; } catch (e) { return e.message; } };

// ---- sentetik proje
const kok = fs.mkdtempSync(path.join(os.tmpdir(), 'pp-arac-'));
const yaz = (rel, s) => { const p = path.join(kok, rel); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, s); };
const oku = (rel) => fs.readFileSync(path.join(kok, rel), 'utf8');
const ders = `(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).xx = (window.PP_LESSONS.xx || {}));
  L[1] = {
    hook: "kanca", homework: "ödev",
    quiz: [
      { q: "DNS'de alan adını IPv4'e çeviren kayıt?", options: ["MX", "CNAME", "A", "PTR"], answer: "A", why: "A kaydı isim→IPv4. 'Tırnaklı' metin; ünicode: ğüşiöç.", obj: "h1", whyNot: { MX: "e-posta", PTR: "ters" } },
      { q: "Geçersiz adres hangisi?", options: ["2001:db8::1", "::1", "2001::db8::1", "fe80::1"], answer: "2001::db8::1", why: "İki '::' olmaz." },
      { q: "Harf cevabı?", options: ["alfa", "beta", "gama", "delta"], answer: "C) gama", why: "üçüncü" }
    ],
    interview: [{ q: "açık uçlu", a: "model cevap" }]
  };
  L[2] = {
    hook: "k2", homework: "ö2",
    quiz: [
      { q: "Tek soru?", options: ["x", "y"], answer: "y", why: "çünkü" }
    ]
  };
})();
`;
const va = (ad, id, qs) => `(function () { var VA = (window.PP_VA = window.PP_VA || {}); VA.${ad} = { id: "${id}", ad: "Deneme", esik: 0.8, sorular: [\n${qs.map((q) => '  ' + JSON.stringify(q)).join(',\n')}\n] }; })();\n`;
const vaS = (k) => [{ q: k + " soru 1?", o: ["a", "b", "c", "d"], a: 2, bolum: "v-1" }, { q: k + " soru 2?", o: ["a", "b", "c", "d"], a: 0, bolum: "v-2" }];
function qb() {
  const e = (t, d, i) => ({ t: t, d: d, q: t + d + " soru " + i, o: ["s1", "s2", "s3", "s4"], a: i % 4, w: "açıklama " + t + d + i });
  const A = [], B = [], C = [];
  for (let i = 0; i < 6; i++) A.push(e('aa', 1, i)); for (let i = 0; i < 6; i++) A.push(e('aa', 2, i));
  for (let i = 0; i < 4; i++) B.push(e('aa', 3, i)); for (let i = 0; i < 2; i++) B.push(e('bb', 1, i)); for (let i = 0; i < 2; i++) B.push(e('bb', 2, i));
  C.push(e('aa', 1, 99));
  return `"use strict";\nvar QB=[\n ${A.map((x) => JSON.stringify(x)).join(',\n ')}\n];\nvar QB_SEC=[\n ${B.map((x) => JSON.stringify(x)).join(',\n ')}\n];\nQB=QB.concat(QB_SEC);\nQB=QB.concat([${C.map((x) => JSON.stringify(x)).join(',')}]);\n`;
}
yaz('content/lessons/xx-1.js', ders);
yaz('content/veri-analitigi/seviye0.js', va('sinav0', 'v0-sinav', vaS('s0')));
yaz('content/veri-analitigi/seviye1.js', va('sinav1', 'v1-sinav', vaS('s1')));
yaz('content/veri-analitigi/sinav2.js', va('sinav2', 'v2-sinav', vaS('s2')));
yaz('js/veri/soru-bankasi.js', qb());
const qbOnce = vm.runInNewContext(oku('js/veri/soru-bankasi.js') + ';QB', {});
const dersOnce = oku('content/lessons/xx-1.js');

(async () => {
  // 1) kimlik ve doğru seçenek
  const q1 = { q: ' Soru   metni ', options: ['a', 'b'] };
  eq(T.soruKimligi(q1.q, q1.options), T.soruKimligi('Soru metni', ['a', 'b']), 'soru kimliği boşluk farklarından etkilenmez');
  ok(/^[0-9a-f]{8}$/.test(T.soruKimligi('x', ['a', 'b'])), 'soru kimliği 8 onaltılık hane');
  ok(T.soruKimligi('x', ['a', 'b']) !== T.soruKimligi('x', ['b', 'a']) && T.soruKimligi('x', ['a', 'b']) !== T.soruKimligi('y', ['a', 'b']), 'metin ya da seçenek değişince kimlik değişir');
  eq([T.dogruIndeks({ options: ['MX', 'CNAME', 'A', 'PTR'], answer: 'A' }), T.dogruIndeks({ options: ['2001:db8::1', '::1', '2001::db8::1', 'fe80::1'], answer: '2001::db8::1' })], [2, 2],
    'doğru seçenek TAM eşleşmeyle bulunur ("A" şık harfi sanılmaz; noktalama düşüren eşleme yanlış şıkkı seçmez)');
  eq(T.dogruIndeks({ options: ['alfa', 'beta', 'gama', 'delta'], answer: 'C) gama' }), 2, 'tam eşleşme yoksa harf biçimi çözülür ("C) gama")');
  eq(T.dogruIndeks({ options: ['a', 'b'], answer: 'z' }), -1, 'çözülemeyen cevap -1');

  // 2) istemci qzCorrect ile eşlik (gerçek js/ders/ders-odasi.js kaynağından)
  const dsrc = fs.readFileSync(path.join(__dirname, '..', 'js', 'ders', 'ders-odasi.js'), 'utf8');
  const bas = dsrc.indexOf('function qzNorm'), bit = dsrc.indexOf('function qzPick');
  const istemci = vm.runInNewContext(dsrc.slice(bas, bit) + ';qzCorrect', {});
  const orn = [{ options: ['MX', 'CNAME', 'A', 'PTR'], answer: 'A' }, { options: ['2001:db8::1', '::1', '2001::db8::1', 'fe80::1'], answer: '2001::db8::1' }, { options: ['alfa', 'beta', 'gama', 'delta'], answer: 'C) gama' },
    { options: ['x', 'y'], answer: 'y' }, { options: ['Switch', 'Router'], answer: 'switch' }, { options: ['a', 'b', 'c'], answer: 'B' }];
  eq(orn.map((q) => istemci(q)), orn.map((q) => T.dogruIndeks(q)), 'araç doğru seçenek kararı = istemci qzCorrect (tam eşleşme önceliği iki tarafta da)');

  // 3) kuru çalışma hiçbir şeye dokunmaz
  const kuru = T.calistir(kok, {});
  eq([kuru.ozet.dersSoru, kuru.ozet.vaSoru, kuru.ozet.seviyeSoru, kuru.yazilan.length], [4, 6, 10, 0], 'kuru çalışma: 4 ders sorusu, 6 VA sorusu, 10 seviye sorusu (yalnız yetecek yol); dosya yazmaz');
  eq([oku('content/lessons/xx-1.js') === dersOnce, fs.existsSync(path.join(kok, 'supabase'))], [true, false], 'kuru çalışma: içerik değişmedi, tohum dizini oluşmadı');

  // 4) yazma
  const r = T.calistir(kok, { yaz: true, tarih: '20990101' });
  ok(r.yazilan.length >= 8, 'yazma: tohumlar + içerik dosyaları yazıldı (' + r.yazilan.length + ')');
  const anahtarSql = oku('supabase/seed/20990101_2_ogr_anahtar.sql'), hedefSql = oku('supabase/seed/20990101_1_ogr_hedefler.sql');
  const satirlar = T.anahtarSqlOku(anahtarSql);
  eq(satirlar.length, 20, 'anahtar tohumu: 4 ders + 6 VA + 10 seviye = 20 satır');
  const bul = (hedef, i) => satirlar.filter((x) => x[0] === hedef)[i];
  eq(bul('ders:xx:1:sinav', 0).slice(1, 2).concat([bul('ders:xx:1:sinav', 0)[3]]), ['v1', 'A'], 'ders sorusu: varyant v1, doğru cevap metni "A"');
  eq(bul('ders:xx:1:sinav', 0)[5].why.indexOf("'Tırnaklı' metin; ünicode: ğüşiöç.") >= 0, true, 'tırnaklı ve ünicode açıklama kayıpsız (SQL kaçışı)');
  eq(Object.keys(bul('ders:xx:1:sinav', 0)[5].whyNot), ['MX', 'PTR'], 'whyNot anahtara taşındı');
  eq(bul('ders:xx:1:sinav', 2)[3], 'gama', 'harf biçimli cevap seçenek metnine çözüldü');
  eq(bul('v0-sinav', 0)[3], 'c', 'VA sınavı: a=2 → "c"');
  ok(/insert into public\.ogr_hedef/.test(hedefSql) && /ders-ustalik:xx:1/.test(hedefSql) && /on conflict/.test(hedefSql), 'hedef tohumu: ogr_hedef + ders ustalık kapısı + idempotent');
  ok(!/dogru|cevap/i.test(hedefSql.replace(/--.*\n/g, '')), 'hedef tohumunda (public) doğru cevap alanı yok');
  ok(/delete from public.ogr_cevap_anahtari where hedef = 'ders:xx:1:sinav' and varyant = 'v1' and soru_id <> all/.test(anahtarSql), 'anahtar tohumu: artık (içerikten çıkan) soru satırlarını temizler');
  ok(/begin;/.test(anahtarSql) && /commit;/.test(anahtarSql) && /GIZLI/.test(anahtarSql), 'anahtar tohumu işlem içinde ve "GIZLI" uyarılı');

  // 5) içerik: anahtar silindi, yapı korundu
  const w = { PP_LESSONS: {} }; w.window = w; vm.createContext(w); vm.runInContext(oku('content/lessons/xx-1.js'), w);
  const x = w.PP_LESSONS.xx;
  ok(x[1].quiz.concat(x[2].quiz).every((q) => /^[0-9a-f]{8}$/.test(q.id) && q.answer === undefined && q.why === undefined && q.whyNot === undefined), 'ders içeriği: answer/why/whyNot yok, id var');
  eq([x[1].quiz[0].obj, x[1].quiz[0].options, x[1].hook, x[1].interview[0].a], ['h1', ['MX', 'CNAME', 'A', 'PTR'], 'kanca', 'model cevap'], 'soru dışı içerik (obj, seçenekler, hook, mülakat cevabı) değişmedi');
  const v = { }; v.window = v; vm.createContext(v); vm.runInContext(oku('content/veri-analitigi/seviye0.js'), v);
  ok(v.PP_VA.sinav0.sorular.every((q) => q.a === undefined && /^[0-9a-f]{8}$/.test(q.id) && q.bolum && q.o.length === 4), 'VA içeriği: a yok, id ve bölüm var');
  const qbSonra = vm.runInNewContext(oku('js/veri/soru-bankasi.js') + ';QB', {});
  eq(qbSonra.length, qbOnce.length, 'QB uzunluğu aynı (dizin kaymaz)');
  const degisen = qbSonra.map((q, i) => (JSON.stringify(q) !== JSON.stringify(qbOnce[i]) ? i : -1)).filter((i) => i >= 0);
  eq(degisen.length, 10, 'yalnız 10 QB sorusu yer tutucu oldu (aa: 3+4+3); bb yetersiz → dokunulmadı');
  ok(degisen.every((i) => qbSonra[i].t === '_' && qbSonra[i].o.length === 0 && qbSonra[i].q === ''), 'yer tutucu: t "_", boş soru/seçenek');
  ok(qbOnce.every((q, i) => degisen.includes(i) || JSON.stringify(q) === JSON.stringify(qbSonra[i])), 'diğer tüm QB soruları birebir aynı');
  const sv = {}; sv.window = sv; vm.createContext(sv); vm.runInContext(oku(T.SEVIYE_DOSYA), sv);
  const aa = sv.PP_SINAV.seviye.aa;
  eq([aa.hedef, aa.varyant, aa.sorular.length, aa.sorular.filter((q) => q.d === 1).length, aa.sorular.filter((q) => q.d === 2).length, aa.sorular.filter((q) => q.d === 3).length], ['seviye:aa', 'v1', 10, 3, 4, 3], 'seviye sınavı: 3 kolay + 4 orta + 3 zor');
  ok(aa.sorular.every((q) => Object.keys(q).sort().join() === 'd,id,o,q') && !sv.PP_SINAV.seviye.bb, 'seviye sorusunda yalnız id,d,q,o; yetersiz yol (bb) için sınav yok');
  const seviyeSat = satirlar.filter((s) => s[0] === 'seviye:aa');
  eq([seviyeSat.length, seviyeSat.map((s) => s[4]).sort().join('')], [10, '1112222333'.split('').sort().join('')], 'seviye ağırlığı = zorluk (1,2,3)');

  // 6) yeniden çalıştırma: değişiklik yok
  const dersSonra = oku('content/lessons/xx-1.js');
  const r2 = T.calistir(kok, { yaz: true, tarih: '20990101' });
  eq([r2.ozet.kayitSayisi, r2.yazilan.length, oku('content/lessons/xx-1.js') === dersSonra], [0, 0, true], 'ikinci çalıştırma: yeni kayıt yok, hiçbir dosya yazılmaz');
  eq(T.anahtarSqlOku(oku('supabase/seed/20990101_2_ogr_anahtar.sql')).length, 20, 'ikinci çalıştırma tohumu bozmadı');

  // 7) yeni soru eklenince tohum BİRLEŞİR (eski anahtarlar kaybolmaz)
  yaz('content/lessons/xx-1.js', oku('content/lessons/xx-1.js').replace(/(\{ id: "[0-9a-f]{8}", q: "Tek soru\?"[^\n]*\})\n/, (m, g) => m).replace('quiz: [\n      { id:', 'quiz: [\n      { q: "Yeni soru?", options: ["p", "q"], answer: "p", why: "yeni" },\n      { id:'));
  const r3 = T.calistir(kok, { yaz: true, tarih: '20990101' });
  eq(r3.ozet.dersSoru, 1, 'yeni soru: yalnız yeni soru işlendi');
  const s3 = T.anahtarSqlOku(oku('supabase/seed/20990101_2_ogr_anahtar.sql'));
  eq([s3.length, s3.some((s) => s[3] === 'p'), s3.some((s) => s[3] === 'A')], [21, true, true], 'tohum birleşti: eski 20 + yeni 1; eski anahtarlar kaybolmadı');
  eq(fs.readdirSync(path.join(kok, 'supabase', 'seed')).filter((f) => /onceki/.test(f)), [], 'yedek dosya (.onceki) bırakılmaz');

  // 8) hata yolları
  const dene = (ad, dersMetni, beklenen) => {
    const k2 = fs.mkdtempSync(path.join(os.tmpdir(), 'pp-arac2-'));
    for (const rel of ['content/lessons/xx-1.js', 'content/veri-analitigi/seviye0.js', 'content/veri-analitigi/seviye1.js', 'content/veri-analitigi/sinav2.js', 'js/veri/soru-bankasi.js']) {
      fs.mkdirSync(path.dirname(path.join(k2, rel)), { recursive: true }); fs.writeFileSync(path.join(k2, rel), rel === 'content/lessons/xx-1.js' ? dersMetni : fs.readFileSync(path.join(kok, rel), 'utf8'));
    }
    const m = hata(() => T.dersTara(k2));
    ok(m && m.indexOf(beklenen) >= 0, 'hata yolu: ' + ad + (m ? '' : ' (hata fırlatmadı)'));
  };
  dene('yinelenen seçenek reddedilir', ders.replace('["x", "y"]', '["x", "x"]'), 'yinelenen ya da eksik seçenek');
  dene('çözülemeyen cevap reddedilir', ders.replace('answer: "y", why: "çünkü"', 'answer: "z", why: "çünkü"'), 'çözülemedi');
  dene('sabit olmayan quiz elemanı (çağrı) reddedilir', ders.replace('{ q: "Tek soru?"', 'ekle({ q: "Tek soru?"').replace('why: "çünkü" }', 'why: "çünkü" })'), 'çalıştırılamadı');
  dene('değişken içeren soru reddedilir', ders.replace('["x", "y"]', 'SECENEKLER'), 'çalıştırılamadı');

  // 9) araç ağa/veritabanına bağlanmaz
  const kaynak = fs.readFileSync(path.join(__dirname, '..', 'tools', 'cevap-anahtari.js'), 'utf8');
  ok(!/require\(["'](https?|net|tls|dgram|child_process|pg|@supabase[^"']*)["']\)|fetch\(|XMLHttpRequest|WebSocket/.test(kaynak), 'araç ağ/veritabanı/süreç modülü kullanmaz');

  fs.rmSync(kok, { recursive: true, force: true });
  console.log(`\n${n} kontrol, ${fails} hata`);
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });

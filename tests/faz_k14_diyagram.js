// Faz K14: SVG şema çizici (js/cekirdek/diyagram.js). Yerleşim, ok sınırı, XSS kaçışı, hata durumları; beklenenler elle yazıldı.
const path = require('path');
const D = require(path.join(__dirname, '..', 'js', 'cekirdek', 'diyagram.js'));
let n = 0, fails = 0;
const ok = (c, m) => { n++; console.log((c ? 'OK    ' : 'HATA  ') + m); if (!c) fails++; };
const thr = f => { try { f(); return null; } catch (e) { return e.message; } };

{ // temel çıktı
  const s = D.ciz([{ id: 'a', etiket: 'A' }, { id: 'b', etiket: 'B', sekil: 'daire' }], [{ kimden: 'a', kime: 'b', etiket: 'x' }]);
  ok(/^<svg [^>]*viewBox="0 0 /.test(s) && /<\/svg>$/.test(s), 'geçerli svg kökü');
  ok((s.match(/<rect /g) || []).length === 1 && (s.match(/<ellipse /g) || []).length === 1, 'kutu ve daire birer tane');
  ok((s.match(/<line /g) || []).length === 1 && /marker-end/.test(s) && !/marker-start/.test(s), 'tek yönlü ok: yalnız marker-end');
  ok(/>x<\/text>/.test(s), 'ok etiketi yazılır');
}
{ // ızgara: 2 sütun, 3 düğüm -> (0,0) (1,0) (0,1); x=20+60, 20+250 ; ikinci satır y=20+28+116
  const s = D.ciz([{ id: 'a' }, { id: 'b' }, { id: 'c' }], [], { sut: 2 });
  ok(/<rect x="20" y="20" /.test(s) && /<rect x="210" y="20" /.test(s) && /<rect x="20" y="136" /.test(s), 'otomatik ızgara koordinatları (2 sütun)');
  ok(/viewBox="0 0 350 212"/.test(s), 'viewBox içeriğe göre: 350x212');
}
{ // elle konum ve çakışma atlama
  const s = D.ciz([{ id: 'a', sut: 0, satir: 0 }, { id: 'b' }], [], { sut: 3 });
  ok(/<rect x="20" y="20" /.test(s) && /<rect x="210" y="20" /.test(s), 'dolu hücre atlanır, b ikinci sütuna gider');
}
{ // ok uçları düğüm sınırında: a(0,0) -> b(1,0): sol kutu sağ kenarı x=140, sağ kutu sol kenarı x=210
  const s = D.ciz([{ id: 'a' }, { id: 'b' }], [{ kimden: 'a', kime: 'b', cift: 1 }], { sut: 2 });
  ok(/x1="140\.0" y1="48\.0" x2="210\.0" y2="48\.0"/.test(s), 'yatay ok kutu kenarından kenarına');
  ok(/marker-start/.test(s), 'cift:1 ise iki uçlu');
}
{ // XSS: tüm metin alanları kaçışlanır, ham etiket üretilmez
  const kotu = '<img src=x onerror=alert(1)>"\'&';
  const s = D.ciz([{ id: 'a', etiket: kotu }, { id: 'b', etiket: '</text><script>1</script>' }], [{ kimden: 'a', kime: 'b', etiket: kotu }], { baslik: kotu });
  ok(!/<img|<script|<\/text><script/i.test(s), 'etiket/baslik içinde ham tag yok');
  ok(!/onerror=alert\(1\)>/.test(s) && /&lt;img src=x onerror=alert\(1\)&gt;&quot;&#39;&amp;/.test(s), 'etiket kaçışlanmış metin olarak durur');
  const t = D.ciz([{ id: '"><script>', etiket: undefined }], []);
  ok(!/<script/.test(t) && /&quot;&gt;&lt;script&gt;/.test(t), 'etiket yoksa id yedek metin olur ve o da kaçışlanır');
  const sut = D.ciz([{ id: 'a', sut: '"><script>', satir: {} }], []);
  ok(!/<script/.test(sut) && /<rect x="20" y="20"/.test(sut), 'sayısal olmayan sut/satir sayıya çevrilir, enjekte olmaz');
}
{ // hatalar
  ok(/yinelenen/.test(thr(() => D.ciz([{ id: 'a' }, { id: 'a' }], []))), 'yinelenen id hata verir');
  ok(/eksik/.test(thr(() => D.ciz([{}], []))), 'id yoksa hata verir');
  ok(/tanımsız düğüm/.test(thr(() => D.ciz([{ id: 'a' }], [{ kimden: 'a', kime: 'z' }]))), 'olmayan düğüme ok hata verir');
  ok(D.ciz().includes('<svg'), 'argümansız çağrı boş svg döner');
}
{ // ders kaydı: tüm kayıtlar geçerli çizilir
  const k = Object.keys(D.kayit);
  ok(k.length >= 1 && k.every(id => { const r = D.kayit[id]; return /^<svg/.test(D.ciz(r.dugumler, r.oklar, { baslik: r.baslik, sut: r.sut })); }), 'kayıtlı ders şemalarının hepsi çizilir (' + k.join(',') + ')');
  ok(D.ders({ topicId: 'yok' }) === null && D.ders(null) === null, 'kayıtsız ders null döner');
}
console.log('\n' + n + ' kontrol, ' + fails + ' hata'); process.exit(fails ? 1 : 0);

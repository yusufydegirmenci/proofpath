// Faz 13: günlük lig soru bankasından (QB: ccna + eng) sunucu tohumunu üretir ya da denetler.
//   node tools/lig-anahtar.js          → tohum dosyası güncel mi? (değilse çıkış 1)
//   node tools/lig-anahtar.js --yaz    → supabase/seed/20261025_lig_soru_tohumu.sql dosyasını yazar
// QB istemcide zaten açıktır (oyun/tekrar kullanır); tohum yeni bir sır içermez. Sıra = QB indeksi, bu yüzden QB'ye soru eklerken SONA ekle.
const fs = require('fs'), path = require('path'), vm = require('vm');
const KOK = path.join(__dirname, '..');
const HEDEF = path.join(KOK, 'supabase', 'seed', '20261025_lig_soru_tohumu.sql');

function qbKur() {
  const ctx = vm.createContext({ console });
  vm.runInContext(fs.readFileSync(path.join(KOK, 'js/veri/soru-bankasi.js'), 'utf8'), ctx);
  const sat = fs.readFileSync(path.join(KOK, 'js/lig/lig-profil.js'), 'utf8').split(/\r?\n/);
  const son = sat.findIndex((s) => s === '})();');   // QB'yi dolduran ilk IIFE'nin sonu
  const yard = sat.filter((s) => /^function (rngf|shuf)\(/.test(s));
  if (son < 0 || yard.length !== 2) throw new Error('lig-profil.js yapısı değişti: QB bloğu bulunamadı');
  vm.runInContext(sat.slice(0, son + 1).concat(yard).join('\n'), ctx);
  return vm.runInContext('QB', ctx);
}

function uret() {
  const QB = qbKur();
  const satir = [];
  QB.forEach((q, i) => {
    if (q.t !== 'ccna' && q.t !== 'eng') return;
    if (!(q.d >= 1 && q.d <= 3) || !(q.a >= 0 && q.a < q.o.length)) throw new Error('QB[' + i + '] geçersiz zorluk/doğru şık');
    satir.push('  (' + i + ", '" + q.t + "', " + q.d + ', ' + q.a + ')');
  });
  return '-- Faz 13: günlük lig soruları için sunucu tohumu (araç: tools/lig-anahtar.js, elle düzenleme). UYGULANMADI.\n' +
    '-- Kaynak QB istemcide zaten halka açık; bu dosya yeni bir cevap sızıntısı değildir. Önce 20261025_lig_sunucu.sql uygulanmalı.\n' +
    'insert into public.ogr_lig_soru (soru, tur, zorluk, dogru) values\n' + satir.join(',\n') + '\n' +
    'on conflict (soru) do update set tur = excluded.tur, zorluk = excluded.zorluk, dogru = excluded.dogru;\n';
}

module.exports = { uret, qbKur, HEDEF };
if (require.main === module) {
  const s = uret();
  if (process.argv.includes('--yaz')) { fs.writeFileSync(HEDEF, s); console.log('yazıldı: ' + HEDEF + ' (' + (s.match(/^  \(/gm) || []).length + ' soru)'); }
  else if (!fs.existsSync(HEDEF) || fs.readFileSync(HEDEF, 'utf8') !== s) { console.error('tohum güncel değil: node tools/lig-anahtar.js --yaz'); process.exit(1); }
  else console.log('tohum güncel');
}

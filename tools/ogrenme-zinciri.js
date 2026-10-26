// npm run test:ogrenme: öğrenme/içerik testlerini SIRAYLA çalıştırır, biri düşse de hepsini koşar, sonda özet verir (çıkış 1 = en az biri düştü).
// Eski zincir `a && b && c` idi: ilk hata geri kalanı hiç koşturmuyordu ve yeni testler listeye eklenmemişti. Yeni test eklerken aşağıdaki listeye yaz.
const { spawnSync } = require('child_process');
const path = require('path');
const LISTE = ['ogrenme', 'hesaplar', 'sozluk', 'ogrenme_tarayici', 'faz4_entegrasyon', 'faz5_net', 'faz5b_ccna', 'faz5c_net', 'faz5d_lab', 'faz5e_ek', 'faz5f_lab', 'faz6_koc', 'faz7_plan', 'faz8_kariyer',
  'faz9_senkron', 'faz9_cevrimdisi', 'faz10_va', 'faz10_alan', 'faz10_va12', 'faz8_proje', 'faz_w1', 'faz12_kod', 'faz12_sema', 'faz12_esleme', 'kaynak_etiket', 'faz12b_geri_bildirim', 'faz21_bilgi',
  'faz_k10_py', 'faz_k12_js', 'faz_k13_git', 'faz_k14_diyagram', 'faz_17c_kaynakca', 'coklu_kilit', 'faz27_belge', 'faz33_dayaniklilik', 'marka'];
const kalan = [];
for (const t of LISTE) {
  const r = spawnSync(process.execPath, [path.join(__dirname, '..', 'tests', t + '.js')], { stdio: 'inherit' });
  if (r.status !== 0) kalan.push(t);
}
console.log('\n' + (kalan.length ? 'KALDI: ' + kalan.join(', ') : 'Hepsi geçti (' + LISTE.length + ')'));
process.exit(kalan.length ? 1 : 0);

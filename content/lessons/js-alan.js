/* JavaScript yolu · uygulama alanları (PP.alan, tür "js"): her derste 1 alıştırma. Dersin "alan" bloğu bu tanıma id ile bağlanır (rota-ders.js lblock).
   Veri: 5 satırlık sentetik sipariş listesi (Python alanıyla aynı); kod tarayıcıda new Function("veri","console",kod) ile çalışır, sonuç `return` ile döner (JSON'a çevrilebilir olmalı).
   Başlangıç kodunda `siparisler` (nesne dizisi) hazır kurulur. prompt/alert bu alanda çalışmaz; console.log kullanılır.
   Kontrol işlevleri sabit cevap metni TUTMAZ: beklenen değer verilen veriden hesaplanır; varyant ile veri değiştirilip kod ikinci kez çalıştırılır (sabit değer yazan çözüm geçmez).
   Dürüstlük: JS alanı yerel izole işçide çalışır; ağ gerekmez. */
(function () {
  var JS = (window.PP_JS = window.PP_JS || {});
  JS.veri = {
    sutunlar: ["urun", "adet", "fiyat"],
    satirlar: [["kalem", 12, 7.5], ["defter", 4, 32], ["silgi", 30, 3.25], ["cetvel", 6, 7.5], ["makas", 5, 45.5]]
  };
  function kopya(v) { return { sutunlar: v.sutunlar.slice(), satirlar: v.satirlar.map(function (r) { return r.slice(); }) }; }
  function degistir(v, sira, sutun, deger) { var w = kopya(v); w.satirlar[sira][sutun] = deger; return w; }
  function deger(s) { return s.sonucTanimli ? s.deger : undefined; }
  function gos(x) { try { return JSON.stringify(x); } catch (e) { return String(x); } }
  function esit(a, b) {
    if (typeof a === "number" && typeof b === "number") return Math.abs(a - b) < 1e-9;
    if (Array.isArray(a) && Array.isArray(b)) return a.length === b.length && a.every(function (x, i) { return esit(x, b[i]); });
    if (a && b && typeof a === "object" && typeof b === "object" && !Array.isArray(a) && !Array.isArray(b)) {
      var ka = Object.keys(a).sort(), kb = Object.keys(b).sort();
      return ka.length === kb.length && ka.every(function (k, i) { return k === kb[i] && esit(a[k], b[k]); });
    }
    return a === b;
  }
  function bak(s, bek, ipucu) { var d = esit(deger(s), bek); return { dogru: d, mesaj: d ? "Sonuç veriyle uyuşuyor." : "Bulduğun: " + gos(deger(s)) + ". " + ipucu }; }
  function tutarlar(v) { return v.satirlar.map(function (r) { return r[1] * r[2]; }); }
  var HAZIR = "// hazır: siparisler = [{urun, adet, fiyat}, ...] (veriden kurulu, dokunma)\nconst siparisler = veri.satirlar.map(([urun, adet, fiyat]) => ({ urun, adet, fiyat }));\n";

  JS.alanlar = [
    { id: "js-1-tutar", ders: "js-1", tur: "js", baslik: "JavaScript · ilk siparişin tutarı",
      gorev: "Hazır: `siparisler` dizisi kurulu; `siparisler[0]` ilk siparişin nesnesidir, `siparisler[0].adet` adedini, `siparisler[0].fiyat` fiyatını verir. Tutarı (adet çarpı fiyat) `sonuc` değişkenine ata ve `return sonuc` ile döndür.",
      baslangic: HAZIR + "const ilk = siparisler[0];\nconsole.log(ilk);\nlet sonuc = null;\nreturn sonuc;",
      ipucu: ["Önce ilk siparişin adedini ve fiyatını nesneden oku; özellik adları adet ve fiyat.", "İki sayı çarpılır: ilk.adet * ilk.fiyat.", "Çarpma * ile yapılır: ilk.adet ile ilk.fiyat'ı çarp ve sonucu sonuc'a ata (let ile tanımlı, yeniden atanabilir)."],
      adimla: "console.log(ilk) satırının çıktısına bak: nesnenin hangi özellikleri var, değerleri hangi türde?",
      cozum: HAZIR + "const ilk = siparisler[0];\nconst sonuc = ilk.adet * ilk.fiyat;\nreturn sonuc;\n\nNeden: nesne özelliği nokta ile okunur; iki number çarpılınca number çıkar. Değişmeyecek değer const ile tutulur.",
      kontrol: function (s, v) { var r = v.satirlar[0]; return bak(s, r[1] * r[2], "İlk siparişin adet ve fiyatını çarpmalısın."); },
      varyant: function (v) { return degistir(degistir(v, 0, 1, 5), 0, 2, 8.5); } },
    { id: "js-2-fis", ders: "js-2", tur: "js", baslik: "JavaScript · fiş satırı",
      gorev: "Hazır: `siparisler[0]` ilk sipariş nesnesidir; `siparisler[0].urun`, `.adet`, `.fiyat` değerlerini verir. İlk siparişi şablon dizesiyle 'kalem: 12 adet, 7.50 TL' biçiminde bir metne çevirip `return` et (fiyat iki ondalık basamaklı).",
      baslangic: HAZIR + "const ilk = siparisler[0];\nlet sonuc = null;\nreturn sonuc;",
      ipucu: ["Metin, ürün adı iki nokta adet ve fiyatın birleşiminden oluşur.", "Ters tırnak kullan: `${ilk.urun}: ...`. Fiyat için toFixed(2) iki ondalık basamak yazar.", "Üç parçayı (ürün, adet, fiyat) aynı ters tırnaklı metne ${...} ile göm; fiyat parçasında toFixed(n) çağır, n'i kendin seç."],
      adimla: "Önce ilk nesneyi console.log ile yazdır, sonra şablon dizesini tek satırda kur.",
      cozum: HAZIR + "const ilk = siparisler[0];\nconst sonuc = `${ilk.urun}: ${ilk.adet} adet, ${ilk.fiyat.toFixed(2)} TL`;\nreturn sonuc;\n\nNeden: ${...} içine her ifade gömülür; toFixed(2) sayıyı iki ondalıklı METİN yapar, 7.5 yerine 7.50 yazar.",
      kontrol: function (s, v) { var r = v.satirlar[0]; return bak(s, r[0] + ": " + r[1] + " adet, " + r[2].toFixed(2) + " TL", "Biçim tam olarak 'ürün: adet adet, fiyat TL' olmalı; fiyatta iki ondalık basamak var."); },
      varyant: function (v) { var w = degistir(v, 0, 0, "boya"); w.satirlar[0][1] = 9; w.satirlar[0][2] = 18.25; return w; } },
    { id: "js-3-esik", ders: "js-3", tur: "js", baslik: "JavaScript · == ile === farkı",
      gorev: "Hazır: `siparisler[3].adet` dördüncü siparişin adedidir. Bir formdan gelen adetlerin bir kısmı sayı, bir kısmı metindir (`girilen`). `aranan` adedi `girilen` içinde == ile eşleşenlerin sayısını ve === ile eşleşenlerin sayısını bul. `return [esnek, siki]` ver. İpucu: true sayı olarak 1, false 0 sayılır; karşılaştırmaları (a == b) + (c == d) diye toplayarak eşleşme sayısını bulabilirsin.",
      baslangic: HAZIR + "// form: 2. ve 4. adet metin olarak gelmiş (sayı + \"\" metne çevirir)\nconst girilen = [siparisler[0].adet, siparisler[1].adet + \"\", siparisler[2].adet, siparisler[3].adet + \"\", siparisler[4].adet];\nconst aranan = siparisler[3].adet;\nconsole.log(girilen, aranan);\nlet esnek = 0, siki = 0;\nreturn [esnek, siki];",
      ipucu: ["girilen içinde hem number hem string var; == önce türü çevirmeye çalışır, === çevirmez.", "Beş elemanın her biri için iki karşılaştırma gerekir: girilen[0] == aranan ve girilen[0] === aranan, sonra girilen[1] ... diye devam et.", "esnek için beş karşılaştırmayı + ile topla, siki için aynısını === ile kur: (girilen[0] ____ aranan) + (girilen[1] ____ aranan) + ... ; boşluklara işleci yaz."],
      adimla: "console.log çıktısında hangi elemanların tırnaklı (metin) olduğuna bak, sonra tek tek karşılaştır.",
      cozum: HAZIR + "const girilen = [siparisler[0].adet, siparisler[1].adet + \"\", siparisler[2].adet, siparisler[3].adet + \"\", siparisler[4].adet];\nconst aranan = siparisler[3].adet;\nconst esnek = (girilen[0] == aranan) + (girilen[1] == aranan) + (girilen[2] == aranan) + (girilen[3] == aranan) + (girilen[4] == aranan);\nconst siki = (girilen[0] === aranan) + (girilen[1] === aranan) + (girilen[2] === aranan) + (girilen[3] === aranan) + (girilen[4] === aranan);\nreturn [esnek, siki];\n\nNeden: == türleri çevirip \"6\" ile 6'yı eşit sayar; === ise tür de aynı olmalıdır. Tür farkını yakalamak istiyorsan === kullanılır.",
      kontrol: function (s, v) {
        var g = v.satirlar.map(function (r, i) { return i % 2 === 0 ? r[1] : String(r[1]); }), a = v.satirlar[3][1];
        return bak(s, [g.filter(function (x) { return x == a; }).length, g.filter(function (x) { return x === a; }).length], "[== ile eşleşen sayı, === ile eşleşen sayı] sırasıyla iki sayı vermelisin.");
      },
      varyant: function (v) { return degistir(v, 4, 1, 6); } },
    { id: "js-4-etiket", ders: "js-4", tur: "js", baslik: "JavaScript · sipariş etiketi",
      gorev: "Hazır: `siparisler` bir dizidir; başlangıç kodundaki `for (const s of siparisler) { ... }` döngüsü siparişleri sırayla `s` olarak verir (`s.adet` o siparişin adedi; döngüleri ders 5'te ayrıntılı göreceksin) ve `etiketler.push(x)` diziye x elemanını ekler. Her sipariş için bir etiket belirle: adet 10 ve üstü 'toptan', 5 ve üstü 'normal', altı 'az'. Etiketleri sipariş sırasıyla bir diziye koyup `return` et.",
      baslangic: HAZIR + "const etiketler = [];\nfor (const s of siparisler) {\n  // burada if / else if / else kur\n}\nreturn etiketler;",
      ipucu: ["Her sipariş için adet'e bakıp üç durumdan birini seçeceksin; if, else if, else uygun.", "Büyük eşiği (10) önce yaz; aksi halde 12 adet 'normal' çıkar.", "Sırayla: önce adet 10 ve üstü mü, değilse 5 ve üstü mü, kalan hepsi else; her dalda etiketler.push ile ilgili etiketi ekle."],
      adimla: "Döngüde her turun hangi dala girdiğini console.log ile yazdır.",
      cozum: HAZIR + "const etiketler = [];\nfor (const s of siparisler) {\n  if (s.adet >= 10) {\n    etiketler.push('toptan');\n  } else if (s.adet >= 5) {\n    etiketler.push('normal');\n  } else {\n    etiketler.push('az');\n  }\n}\nreturn etiketler;\n\nNeden: koşullar yukarıdan aşağı denenir, ilk doğru dal çalışır; büyük eşik önce yazılmalı.",
      kontrol: function (s, v) { return bak(s, v.satirlar.map(function (r) { return r[1] >= 10 ? "toptan" : r[1] >= 5 ? "normal" : "az"; }), "Her sipariş için bir etiket, sipariş sırasıyla; eşikleri ve sırayı kontrol et."); },
      varyant: function (v) { return degistir(degistir(v, 1, 1, 10), 4, 1, 2); } },
    { id: "js-5-ciro", ders: "js-5", tur: "js", baslik: "JavaScript · toplam ciro",
      gorev: "Hazır: `siparisler` kurulu; döngüde `s` o anki siparişin nesnesidir (`s.adet`, `s.fiyat`). for...of döngüsüyle bütün siparişlerin tutarını (adet çarpı fiyat) topla ve toplamı `return` et.",
      baslangic: HAZIR + "let toplam = 0;\nfor (const s of siparisler) {\n  // her turda toplam'a bir tutar ekle\n}\nreturn toplam;",
      ipucu: ["Her turda bir siparişin tutarını toplam değişkenine eklemelisin.", "Tutar s.adet * s.fiyat. Eklemek için += kullanılır.", "Döngü gövdesine ({ } içine) toplam'a s.adet ile s.fiyat'ın çarpımını ekleyen tek satır yaz."],
      adimla: "toplam değişkeninin her turda nasıl arttığını console.log(toplam) ile izle.",
      cozum: HAZIR + "let toplam = 0;\nfor (const s of siparisler) {\n  toplam += s.adet * s.fiyat;\n}\nreturn toplam;\n\nNeden: toplama satırı döngünün gövdesindedir; return döngüden sonra gelir. Her turda değişen toplam let ile, tur değişkeni s const ile tanımlanır.",
      kontrol: function (s, v) { return bak(s, tutarlar(v).reduce(function (a, b) { return a + b; }, 0), "Her siparişin adet çarpı fiyatını toplamalısın; toplama satırı döngünün içinde olmalı."); },
      varyant: function (v) { return degistir(degistir(v, 3, 1, 10), 1, 2, 28.5); } },
    { id: "js-6-liste", ders: "js-6", tur: "js", baslik: "JavaScript · ürün listesi ve en pahalı",
      gorev: "Hazır: `siparisler` kurulu; `adlar` dizisi ürün adlarını map ile verir. `return [alfabetik_sıralı_ürün_adları, [en_pahalı_ürünün_adı, birim_fiyatı]]` ver. Sıralama için `adlar.sort()` diziyi yerinde alfabetik sıralar; en pahalıyı forEach ile bul. Bir ürünün fiyatı diğerlerinden yüksektir.",
      baslangic: HAZIR + "const adlar = siparisler.map(s => s.urun);\nlet pahali = siparisler[0];\n// forEach ile her siparişi pahali ile karşılaştır\nreturn null;",
      ipucu: ["adlar zaten map ile üretilmiş yeni bir dizidir; adlar.sort() onu alfabetik sıralar.", "pahali ilk siparişle başlıyor; siparisler.forEach ile her s için fiyatı pahali.fiyat ile karşılaştır, daha yüksekse pahali'yı s yap.", "siparisler.forEach(s => { if (____) { pahali = s; } }); sonra [sıralı adlar, [pahali'nın ürün adı, fiyatı]] dizisini döndür."],
      adimla: "adlar dizisini console.log ile yazdır; sort() öncesi ve sonrası sırayı karşılaştır.",
      cozum: HAZIR + "const adlar = siparisler.map(s => s.urun);\nlet pahali = siparisler[0];\nsiparisler.forEach(s => {\n  if (s.fiyat > pahali.fiyat) {\n    pahali = s;\n  }\n});\nadlar.sort();\nreturn [adlar, [pahali.urun, pahali.fiyat]];\n\nNeden: map her elemandan yeni bir dizi üretir; forEach her elemana bir kez uğrar, burada şimdiye kadarki en yüksek fiyatlı nesne pahali'da tutulur.",
      kontrol: function (s, v) {
        var adlar = v.satirlar.map(function (r) { return r[0]; }).sort(), p = v.satirlar.slice().sort(function (a, b) { return b[2] - a[2]; })[0];
        return bak(s, [adlar, [p[0], p[2]]], "[sıralı adlar, [en pahalı ürün, fiyatı]] biçiminde iki öğe olmalı; adlar alfabetik sıralı.");
      },
      varyant: function (v) { return degistir(v, 1, 2, 60); } },
    { id: "js-7-nesne", ders: "js-7", tur: "js", baslik: "JavaScript · stok nesnesi ve farklı fiyatlar",
      gorev: "Hazır: `siparisler` kurulu; döngüde `s` o anki siparişin nesnesidir. Yeni araçlar: `nesne[anahtar] = değer` nesneye anahtar ekler (anahtar bir değişkenden gelebilir), `Object.keys(nesne)` anahtarların dizisini verir. `return [stok_nesnesi, farklı_fiyat_sayısı]` ver. stok nesnesinde anahtar ürün adı, değer adettir. Farklı fiyat sayısını, fiyatları anahtar yaptığın ikinci bir nesneden bul.",
      baslangic: HAZIR + "const stok = {};\nconst fiyatlar = {};\nfor (const s of siparisler) {\n  // stok ve fiyatlar nesnelerini doldur\n}\nreturn null;",
      ipucu: ["Her turda stok nesnesine urun anahtarıyla adeti, fiyatlar nesnesine fiyat anahtarıyla bir işaret eklemelisin.", "nesne[anahtar] = değer biçimini kullan: stok için anahtar ürün adı, değer adet; fiyatlar için anahtar fiyat, değer true gibi bir işaret. Aynı anahtar tekrar yazılırsa üzerine yazılır, yani tek kalır.", "Dönüş [stok, sayı] olmalı; sayı için Object.keys(...) dizisinin .length değerini al, hangi nesneye bakacağını düşün."],
      adimla: "stok ve fiyatlar nesnelerinin her turda nasıl değiştiğini console.log ile izle.",
      cozum: HAZIR + "const stok = {};\nconst fiyatlar = {};\nfor (const s of siparisler) {\n  stok[s.urun] = s.adet;\n  fiyatlar[s.fiyat] = true;\n}\nreturn [stok, Object.keys(fiyatlar).length];\n\nNeden: köşeli ayraçla değişkenden gelen ad özellik anahtarı yapılır; nesnede aynı anahtar bir kez bulunur, Object.keys(...).length farklı fiyat sayısını verir.",
      kontrol: function (s, v) {
        var stok = {}, f = {}; v.satirlar.forEach(function (r) { stok[r[0]] = r[1]; f[r[2]] = 1; });
        return bak(s, [stok, Object.keys(f).length], "[nesne, sayı] biçiminde iki öğe ver; sayı fiyat nesnesindeki farklı anahtarların adedi olmalı.");
      },
      varyant: function (v) { return degistir(degistir(v, 4, 2, 3.25), 0, 1, 20); } },
    { id: "js-8-islev", ders: "js-8", tur: "js", baslik: "JavaScript · tutar fonksiyonu",
      gorev: "Hazır: `siparisler` kurulu; `siparis.adet` ve `siparis.fiyat` bir siparişin adet ve fiyatıdır. Bir siparişin tutarını (adet çarpı fiyat) döndüren bir `tutar` ok fonksiyonu yaz. Sonra `return [en_yüksek_tutar, o_siparişin_ürün_adı]` ver.",
      baslangic: HAZIR + "const tutar = (siparis) => {\n  // buraya return ekle\n};\n\nlet en = siparisler[0];\n// döngüyle en yüksek tutarlı siparişi bul\nreturn null;",
      ipucu: ["Önce fonksiyonun gövdesine return ile adet çarpı fiyatı yaz; return olmazsa sonuç undefined olur.", "en ilk siparişle başlıyor; for (const s of siparisler) döngüsünde tutar(s) ile tutar(en)'i karşılaştır, büyükse en = s yap.", "Döngüden sonra [tutar(en), ürün adı] dizisini döndür; ürün adı en nesnesinin bir özelliği."],
      adimla: "tutar fonksiyonunu tek bir siparişle çağırıp console.log ile sonucuna bak; undefined çıkıyorsa return eksiktir.",
      cozum: HAZIR + "const tutar = (siparis) => siparis.adet * siparis.fiyat;\nlet en = siparisler[0];\nfor (const s of siparisler) {\n  if (tutar(s) > tutar(en)) {\n    en = s;\n  }\n}\nreturn [tutar(en), en.urun];\n\nNeden: gövdesi tek ifade olan ok fonksiyonu sonucu kendiliğinden döndürür; süslü parantezli gövdede return yazmak gerekir. Aynı fonksiyon döngüde her sipariş için yeniden çağrılabilir.",
      kontrol: function (s, v) {
        var t = tutarlar(v), i = t.indexOf(Math.max.apply(null, t));
        return bak(s, [t[i], v.satirlar[i][0]], "[en yüksek tutar, o siparişin ürün adı] biçiminde ver; fonksiyon return ile değer döndürmeli.");
      },
      varyant: function (v) { return degistir(v, 4, 1, 2); } }
  ];
})();

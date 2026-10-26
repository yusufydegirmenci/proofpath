/* Python yolu · uygulama alanları (PP.alan, tür "python"): her derste 1 alıştırma (ders 1-16). Dersin "alan" bloğu bu tanıma id ile bağlanır (rota-ders.js lblock).
   Veri: 5 satırlık sentetik sipariş listesi; Python tarafında `siparisler` (sözlük listesi) ve `sutunlar` hazırdır. input() bu alanda çalışmaz.
   Kontrol işlevleri sabit cevap metni TUTMAZ: beklenen değer verilen veriden hesaplanır; varyant ile veri değiştirilip kod ikinci kez çalıştırılır (sabit değer yazan çözüm geçmez).
   Dürüstlük: çalıştırma Pyodide'a bağlıdır; ulaşılamazsa alan bunu açıkça söyler (PP.alan). */
(function () {
  var PY = (window.PP_PY = window.PP_PY || {});
  PY.veri = {
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
  function toplamAdet(v) { return v.satirlar.reduce(function (t, r) { return t + r[1]; }, 0); }
  function tutarlar(v) { return v.satirlar.map(function (r) { return r[1] * r[2]; }); }

  PY.alanlar = [
    { id: "py-1-tutar", ders: "py-1", tur: "python", baslik: "Python · ilk siparişin tutarı",
      gorev: "`siparisler[0]` ilk siparişin sözlüğüdür (urun, adet, fiyat). Tutarı (adet çarpı fiyat) `sonuc` değişkenine ata.",
      baslangic: "# siparisler: sözlük listesi\nilk = siparisler[0]\nprint(ilk)\nsonuc = None",
      ipucu: ["Önce ilk siparişin adedini ve fiyatını sözlükten oku; anahtarlar 'adet' ve 'fiyat'.", "İki sayı çarpılır: ilk['adet'] * ilk['fiyat'].", "sonuc = ilk['adet'] * ____ ; boşluğa fiyat anahtarını yaz."],
      adimla: "Adım adım göster'e basıp ilk satırdan sonra ilk değişkeninin ne tuttuğunu izle.",
      cozum: "ilk = siparisler[0]\nsonuc = ilk['adet'] * ilk['fiyat']\n\nNeden: sözlükten değer anahtarla okunur; int ile float çarpımı float verir.",
      kontrol: function (s, v) { var r = v.satirlar[0]; return bak(s, r[1] * r[2], "İlk siparişin adet ve fiyatını çarpmalısın."); },
      varyant: function (v) { return degistir(degistir(v, 0, 1, 5), 0, 2, 8.5); } },
    { id: "py-2-fis", ders: "py-2", tur: "python", baslik: "Python · fiş satırı",
      gorev: "İlk siparişi f-string ile 'kalem: 12 adet, 7.50 TL' biçiminde bir metne çevirip `sonuc` değişkenine ata (fiyat iki ondalık basamaklı).",
      baslangic: "# siparisler[0]: ilk sipariş\nilk = siparisler[0]\nsonuc = None",
      ipucu: ["Metin, ürün adı iki nokta adet ve fiyatın birleşiminden oluşur.", "f-string kullan: f\"{ilk['urun']}: ...\". Fiyat için :.2f biçimi iki ondalık yazar.", "sonuc = f\"{ilk['urun']}: {ilk['adet']} adet, {ilk['fiyat']:____} TL\" ; boşluğa iki ondalık basamak biçimini yaz."],
      adimla: "Önce ilk sözlüğü yazdır, sonra f-string'i tek satırda kur.",
      cozum: "ilk = siparisler[0]\nsonuc = f\"{ilk['urun']}: {ilk['adet']} adet, {ilk['fiyat']:.2f} TL\"\n\nNeden: f-string içinde sözlük anahtarı için ayrı tırnak türü kullanılır; :.2f iki ondalık basamak yazar.",
      kontrol: function (s, v) { var r = v.satirlar[0]; return bak(s, r[0] + ": " + r[1] + " adet, " + r[2].toFixed(2) + " TL", "Biçim tam olarak 'ürün: adet adet, fiyat TL' olmalı; fiyatta iki ondalık basamak var."); },
      varyant: function (v) { var w = degistir(v, 0, 0, "boya"); w.satirlar[0][1] = 9; w.satirlar[0][2] = 18.25; return w; } },
    { id: "py-3-koli", ders: "py-3", tur: "python", baslik: "Python · koli hesabı",
      gorev: "Tüm siparişlerin toplam adedi 10'luk kolilere konuyor. `sonuc` değişkenine [tam_koli_sayısı, artan_adet] listesini ata.",
      baslangic: "# toplam adedi bul, sonra // ve % kullan\ntoplam = 0\nsonuc = None",
      ipucu: ["Önce bütün siparişlerin adetlerini toplamak gerekiyor; bir döngü ya da sum() işe yarar.", "Tam koli sayısı tam bölmeyle (//), artan adet kalanla (%) bulunur.", "sonuc = [toplam // ____, toplam % ____] ; boşluğa koli boyutunu yaz."],
      adimla: "Toplam hesaplanırken toplam değişkeninin nasıl büyüdüğünü izle.",
      cozum: "toplam = sum(s['adet'] for s in siparisler)\nsonuc = [toplam // 10, toplam % 10]\n\nNeden: // aşağı yuvarlayan tam bölmedir, % kalanı verir.",
      kontrol: function (s, v) { var t = toplamAdet(v); return bak(s, [Math.floor(t / 10), t % 10], "[tam_koli, artan] sırasıyla iki sayı vermelisin; toplam adet üzerinden // ve % kullan."); },
      varyant: function (v) { return degistir(v, 2, 1, 41); } },
    { id: "py-4-etiket", ders: "py-4", tur: "python", baslik: "Python · sipariş etiketi",
      gorev: "Her sipariş için bir etiket belirle: adet 10 ve üstü 'toptan', 5 ve üstü 'normal', altı 'az'. Etiketleri sipariş sırasıyla bir listeye koyup `sonuc` değişkenine ata.",
      baslangic: "etiketler = []\nfor s in siparisler:\n    pass\nsonuc = etiketler",
      ipucu: ["Her sipariş için adet'e bakıp üç durumdan birini seçeceksin; if, elif, else uygun.", "Büyük eşiği (10) önce yaz; aksi halde 12 adet 'normal' çıkar.", "if s['adet'] >= ____: ... elif s['adet'] >= 5: ... else: ... ; sonunda etiketler.append(...) ile ekle."],
      adimla: "Döngüde her turun hangi dala girdiğini izle.",
      cozum: "etiketler = []\nfor s in siparisler:\n    if s['adet'] >= 10:\n        etiketler.append('toptan')\n    elif s['adet'] >= 5:\n        etiketler.append('normal')\n    else:\n        etiketler.append('az')\nsonuc = etiketler\n\nNeden: koşullar yukarıdan aşağı denenir; büyük eşik önce yazılmalı.",
      kontrol: function (s, v) { return bak(s, v.satirlar.map(function (r) { return r[1] >= 10 ? "toptan" : r[1] >= 5 ? "normal" : "az"; }), "Her sipariş için bir etiket, sipariş sırasıyla; eşikleri ve sırayı kontrol et."); },
      varyant: function (v) { return degistir(degistir(v, 1, 1, 10), 4, 1, 2); } },
    { id: "py-5-ciro", ders: "py-5", tur: "python", baslik: "Python · toplam ciro",
      gorev: "for döngüsüyle bütün siparişlerin tutarını (adet çarpı fiyat) topla ve `sonuc` değişkenine ata.",
      baslangic: "toplam = 0\nfor s in siparisler:\n    pass\nsonuc = toplam",
      ipucu: ["Her turda bir siparişin tutarını toplam değişkenine eklemelisin.", "Tutar s['adet'] * s['fiyat']. Eklemek için += kullanılır.", "toplam += s['adet'] * ____ ; boşluğa fiyat anahtarını yaz ve satırı döngünün içine (girintili) koy."],
      adimla: "toplam değişkeninin her turda nasıl arttığını izle.",
      cozum: "toplam = 0\nfor s in siparisler:\n    toplam += s['adet'] * s['fiyat']\nsonuc = toplam\n\nNeden: toplama satırı döngünün içindedir; sonuc ataması döngüden sonra gelir.",
      kontrol: function (s, v) { return bak(s, tutarlar(v).reduce(function (a, b) { return a + b; }, 0), "Her siparişin adet çarpı fiyatını toplamalısın; toplama satırı döngünün içinde olmalı."); },
      varyant: function (v) { return degistir(degistir(v, 3, 1, 10), 1, 2, 28.5); } },
    { id: "py-6-liste", ders: "py-6", tur: "python", baslik: "Python · ürün listesi ve en pahalı",
      gorev: "`sonuc` değişkenine [alfabetik_sıralı_ürün_adları, [en_pahalı_ürünün_adı, birim_fiyatı]] atamasını yap. Bir ürünün fiyatı diğerlerinden yüksektir.",
      baslangic: "adlar = []\nfor s in siparisler:\n    adlar.append(s['urun'])\nsonuc = None",
      ipucu: ["Adları toplamak için döngü yeterli; sıralamak için sorted() yeni liste verir.", "En pahalıyı bulmak için ürünleri fiyata göre karşılaştır: max(siparisler, key=lambda s: s['fiyat'])", "sonuc = [sorted(adlar), [pahali['urun'], ____]] ; boşluğa fiyat anahtarını yaz."],
      adimla: "adlar listesinin her turda nasıl büyüdüğünü izle.",
      cozum: "adlar = []\nfor s in siparisler:\n    adlar.append(s['urun'])\npahali = max(siparisler, key=lambda s: s['fiyat'])\nsonuc = [sorted(adlar), [pahali['urun'], pahali['fiyat']]]\n\nNeden: sorted() yeni liste döndürür; max(..., key=...) en büyük anahtarlı elemanı verir.",
      kontrol: function (s, v) {
        var adlar = v.satirlar.map(function (r) { return r[0]; }).sort(), p = v.satirlar.slice().sort(function (a, b) { return b[2] - a[2]; })[0];
        return bak(s, [adlar, [p[0], p[2]]], "[sıralı adlar, [en pahalı ürün, fiyatı]] biçiminde iki öğe olmalı; adlar alfabetik sıralı.");
      },
      varyant: function (v) { return degistir(v, 1, 2, 60); } },
    { id: "py-7-sozluk", ders: "py-7", tur: "python", baslik: "Python · stok sözlüğü ve farklı fiyatlar",
      gorev: "`sonuc` değişkenine [stok_sözlüğü, farklı_fiyat_sayısı] ata. Sözlükte anahtar ürün adı, değer adettir. Farklı fiyat sayısı için küme kullan.",
      baslangic: "stok = {}\nfiyatlar = set()\nfor s in siparisler:\n    pass\nsonuc = None",
      ipucu: ["Her turda sözlüğe urun anahtarıyla adeti, kümeye fiyatı eklemelisin.", "stok[s['urun']] = s['adet'] ve fiyatlar.add(s['fiyat']). Küme tekrarları tek sayar.", "sonuc = [stok, len(____)] ; boşluğa kümenin adını yaz."],
      adimla: "stok sözlüğü ve fiyatlar kümesi her turda nasıl değişiyor, izle.",
      cozum: "stok = {}\nfiyatlar = set()\nfor s in siparisler:\n    stok[s['urun']] = s['adet']\n    fiyatlar.add(s['fiyat'])\nsonuc = [stok, len(fiyatlar)]\n\nNeden: sözlük ürün adından adede gider; küme aynı fiyatı bir kez tutar, len() farklı fiyat sayısını verir.",
      kontrol: function (s, v) {
        var stok = {}, f = {}; v.satirlar.forEach(function (r) { stok[r[0]] = r[1]; f[r[2]] = 1; });
        return bak(s, [stok, Object.keys(f).length], "[sözlük, sayı] biçiminde iki öğe ver; sayı kümedeki farklı fiyatların adedi olmalı.");
      },
      varyant: function (v) { return degistir(degistir(v, 4, 2, 3.25), 0, 1, 20); } },
    { id: "py-8-islev", ders: "py-8", tur: "python", baslik: "Python · tutar fonksiyonu",
      gorev: "Bir siparişin tutarını (adet çarpı fiyat) döndüren tutar(siparis) fonksiyonunu yaz. Sonra `sonuc` değişkenine [en_yüksek_tutar, o_siparişin_ürün_adı] ata.",
      baslangic: "def tutar(siparis):\n    pass\n\nsonuc = None",
      ipucu: ["Önce fonksiyonun gövdesine return ile adet çarpı fiyatı yaz; return olmazsa sonuç None olur.", "En yüksek tutarı bulmak için max(siparisler, key=tutar) çağrısı fonksiyonu anahtar olarak kullanır.", "en = max(siparisler, key=tutar) ; sonuc = [tutar(en), en['____']] ; boşluğa ürün adı anahtarını yaz."],
      adimla: "tutar fonksiyonuna girince siparis parametresinin ne tuttuğunu izle.",
      cozum: "def tutar(siparis):\n    return siparis['adet'] * siparis['fiyat']\n\nen = max(siparisler, key=tutar)\nsonuc = [tutar(en), en['urun']]\n\nNeden: return değeri çağırana verir; fonksiyon, max'e anahtar olarak verilebilir.",
      kontrol: function (s, v) {
        var t = tutarlar(v), i = t.indexOf(Math.max.apply(null, t));
        return bak(s, [t[i], v.satirlar[i][0]], "[en yüksek tutar, o siparişin ürün adı] biçiminde ver; fonksiyon return ile değer döndürmeli.");
      },
      varyant: function (v) { return degistir(v, 4, 1, 2); } },
    { id: "py-9-hatali", ders: "py-9", tur: "python", baslik: "Python · hatalı girdileri yakala",
      gorev: "`girdiler` listesi siparişlerin adetlerini metin olarak ve iki ek değeri (\"on\" ile \"7\") tutar. Her değeri int() ile sayıya çevir; çevrilemeyenleri try/except ile yakala. `sonuc` değişkenine [geçerli_sayıların_toplamı, hatalı_değer_sayısı] ata.",
      baslangic: "girdiler = [str(s['adet']) for s in siparisler] + [\"on\", \"7\"]\ntoplam = 0\nhatali = 0\nfor g in girdiler:\n    pass\nsonuc = None",
      ipucu: ["Döngüde int(g) çağrısı bazı değerlerde hata fırlatır; çağrıyı try bloğuna al.", "int(\"on\") ValueError verir. except ValueError: bloğunda hatalı sayacını artır, try içinde toplamı artır.", "try: toplam += int(g) ; except ValueError: hatali += 1 ; sonra sonuc = [toplam, ____] ; boşluğa hatalıları sayan değişkenin adını yaz."],
      adimla: "Döngüde \"on\" değerine gelince akışın try'dan except'e nasıl atladığını izle.",
      cozum: "girdiler = [str(s['adet']) for s in siparisler] + [\"on\", \"7\"]\ntoplam = 0\nhatali = 0\nfor g in girdiler:\n    try:\n        toplam += int(g)\n    except ValueError:\n        hatali += 1\nsonuc = [toplam, hatali]\n\nNeden: int(\"on\") ValueError fırlatır; except onu yakalayınca döngü kesilmez ve diğer değerler toplanmaya devam eder.",
      kontrol: function (s, v) {
        return bak(s, [toplamAdet(v) + 7, 1], "[toplam, hatalı sayısı] biçiminde ver; toplam yalnız çevrilebilen değerleri içermeli, \"on\" hatalı sayılmalı.");
      },
      varyant: function (v) { return degistir(v, 0, 1, 20); } },
    { id: "py-10-satir", ders: "py-10", tur: "python", baslik: "Python · ham satırları ayrıştır",
      gorev: "`ham` listesi her siparişi ' URUN ; adet ; fiyat ' biçiminde bir metin satırı olarak tutar. Her satırı strip ve split ile parçala, ürün adını küçük harfe çevir. `sonuc` değişkenine [ürün_adları_listesi, tüm_siparişlerin_toplam_tutarı] ata (tutar = adet çarpı fiyat).",
      baslangic: "ham = [\" \" + s['urun'].upper() + \" ; \" + str(s['adet']) + \" ; \" + str(s['fiyat']) + \" \" for s in siparisler]\nurunler = []\ntoplam = 0\nfor satir in ham:\n    pass\nsonuc = None",
      ipucu: ["Her satırı ayraçtan parçala: satir.split(';') üç parça verir; parçaların başındaki ve sonundaki boşluğu strip ile at.", "ad, adet, fiyat = [p.strip() for p in satir.split(';')] ; adı lower() ile küçült; adet ve fiyat hâlâ metindir, int() ve float() ile çevir.", "urunler.append(ad.lower()) ; toplam += int(adet) * float(____) ; boşluğa fiyat parçasının adını yaz."],
      adimla: "Bir satırın strip, split ve lower adımlarından geçerken nasıl değiştiğini izle.",
      cozum: "ham = [\" \" + s['urun'].upper() + \" ; \" + str(s['adet']) + \" ; \" + str(s['fiyat']) + \" \" for s in siparisler]\nurunler = []\ntoplam = 0\nfor satir in ham:\n    ad, adet, fiyat = [p.strip() for p in satir.split(';')]\n    urunler.append(ad.lower())\n    toplam += int(adet) * float(fiyat)\nsonuc = [urunler, toplam]\n\nNeden: split metni parçalara ayırır, strip kenar boşluklarını atar, lower küçük harfe çevirir; adet ve fiyat metin olduğu için hesaptan önce int() ve float() ile sayıya çevrilir.",
      kontrol: function (s, v) {
        var t = tutarlar(v), top = t.reduce(function (a, b) { return a + b; }, 0);
        return bak(s, [v.satirlar.map(function (r) { return r[0].toLowerCase(); }), top], "[ad listesi, toplam tutar] biçiminde ver; adlar küçük harfli, toplam adet çarpı fiyatların toplamı olmalı.");
      },
      varyant: function (v) { return degistir(degistir(v, 3, 2, 9), 0, 0, "Kurşun"); } },
    { id: "py-11-tur", ders: "py-11", tur: "python", baslik: "Python · alanların türleri",
      gorev: "İlk siparişin adet, fiyat ve ürün alanlarının türlerini `type(...).__name__` ile bu sırayla bir listeye koyup `sonuc` değişkenine ata.",
      baslangic: "ilk = siparisler[0]\nprint(ilk)\nsonuc = None",
      ipucu: ["Bir değerin türünü type() verir; type(x).__name__ tür adını metin olarak (örneğin 'int') döndürür.", "Üç değeri sırayla bir listeye koy: önce adet, sonra fiyat, sonra urun alanının türü.", "sonuc = [type(ilk['adet']).__name__, type(ilk['fiyat']).__name__, type(ilk['____']).__name__] ; boşluğa ürün adı anahtarını yaz."],
      adimla: "Önce ilk sözlüğü yazdır, sonra her alanın type() sonucunu ayrı ayrı yazdırıp izle.",
      cozum: "ilk = siparisler[0]\nsonuc = [type(ilk['adet']).__name__, type(ilk['fiyat']).__name__, type(ilk['urun']).__name__]\n\nNeden: type() değerin türünü, __name__ ise tür adını verir; sayı tam ise int, ondalıklı ise float, tırnaklı metin ise str çıkar.",
      kontrol: function (s, v) { var r = v.satirlar[0]; function tur(x) { return typeof x === "string" ? "str" : Number.isInteger(x) ? "int" : "float"; } return bak(s, [tur(r[1]), tur(r[2]), tur(r[0])], "Üç tür adını [adet, fiyat, ürün] sırasıyla, 'int', 'float', 'str' gibi metin olarak ver."); },
      varyant: function (v) { return degistir(degistir(v, 0, 1, 12.5), 0, 2, 8); } },
    { id: "py-12-bit", ders: "py-12", tur: "python", baslik: "Python · tek ve çift adetler (bit ile)",
      gorev: "Her siparişin adedine `adet & 1` ile bakarak çift ve tek adetli sipariş sayısını bul. `sonuc` değişkenine [çift_sayısı, tek_sayısı] ata.",
      baslangic: "cift = 0\ntek = 0\nfor s in siparisler:\n    pass\nsonuc = [cift, tek]",
      ipucu: ["Bir sayının en düşük biti 1 ise sayı tektir; adet & 1 bu biti verir (1 ya da 0).", "Her turda adet & 1 doğruysa tek'i, yanlışsa cift'i artır.", "if s['adet'] & ____: tek += 1 ; boşluğa en düşük biti seçen maskeyi yaz ve else dalında cift += 1 yap."],
      adimla: "Döngüde adet & 1 değerinin her sipariş için 0 mı 1 mi çıktığını izle.",
      cozum: "cift = 0\ntek = 0\nfor s in siparisler:\n    if s['adet'] & 1:\n        tek += 1\n    else:\n        cift += 1\nsonuc = [cift, tek]\n\nNeden: ikilik düzende tek sayıların en düşük biti 1'dir; & 1 yalnız bu biti bırakır, sonuç 0 ise sayı çifttir.",
      kontrol: function (s, v) { var tek = v.satirlar.filter(function (r) { return r[1] % 2 === 1; }).length; return bak(s, [v.satirlar.length - tek, tek], "[çift_sayısı, tek_sayısı] sırasıyla iki sayı ver; her adet için adet & 1 sonucuna bak."); },
      varyant: function (v) { return degistir(v, 0, 1, 13); } },
    { id: "py-13-sirala", ders: "py-13", tur: "python", baslik: "Python · kabarcık sıralama",
      gorev: "Siparişlerin adetlerini kabarcık sıralamayla küçükten büyüğe sırala ve yaptığın takas sayısını say. `sonuc` değişkenine [sıralı_adetler, takas_sayısı] ata. sorted() kullanma.",
      baslangic: "a = [s['adet'] for s in siparisler]\ntakas = 0\n# komşuları karşılaştır, yanlış sıradaysa yer değiştir ve takas'ı artır\nsonuc = None",
      ipucu: ["İç içe iki döngü kur: dıştaki tur sayısını, içteki komşu çiftleri gezer.", "a[i] > a[i + 1] ise yer değiştir: a[i], a[i + 1] = a[i + 1], a[i] ve takas += 1.", "for tur in range(len(a) - 1): for i in range(len(a) - 1 - tur): ... ; en sonda sonuc = [a, ____] ; boşluğa takas sayacını yaz."],
      adimla: "Her takastan sonra a listesinin nasıl değiştiğini izle.",
      cozum: "a = [s['adet'] for s in siparisler]\ntakas = 0\nfor tur in range(len(a) - 1):\n    for i in range(len(a) - 1 - tur):\n        if a[i] > a[i + 1]:\n            a[i], a[i + 1] = a[i + 1], a[i]\n            takas += 1\nsonuc = [a, takas]\n\nNeden: her tur en büyük elemanı sona taşır; her takas tek bir ters çifti düzeltir, bu yüzden takas sayısı listedeki ters çiftlerin sayısına eşittir.",
      kontrol: function (s, v) {
        var a = v.satirlar.map(function (r) { return r[1]; }), t = 0;
        for (var i = 0; i < a.length; i++) for (var j = i + 1; j < a.length; j++) if (a[i] > a[j]) t++;
        return bak(s, [a.slice().sort(function (x, y) { return x - y; }), t], "[sıralı adetler, takas sayısı] biçiminde ver; liste küçükten büyüğe sıralı, takas sayısı yapılan yer değiştirmelerin adedi olmalı.");
      },
      varyant: function (v) { return degistir(v, 0, 1, 1); } },
    { id: "py-14-tablo", ders: "py-14", tur: "python", baslik: "Python · kavrayışla sipariş tablosu",
      gorev: "Liste kavrayışıyla adedi 6 ve üzeri olan siparişleri [ürün, tutar] çiftleri olarak (sipariş sırasıyla) bir iç içe listeye koy. Tutar adet çarpı fiyattır. Sonucu `sonuc` değişkenine ata.",
      baslangic: "# [[urun, tutar], ...] biçiminde bir liste kavrayışı yaz\nsonuc = None",
      ipucu: ["Kavrayış kalıbı: [ifade for s in siparisler if koşul]. Koşul adedin 6 ve üzeri olmasıdır.", "İfade iki elemanlı bir liste olmalı: [s['urun'], s['adet'] * s['fiyat']].", "sonuc = [[s['urun'], s['adet'] * s['fiyat']] for s in siparisler if s['adet'] >= ____] ; boşluğa eşik değerini yaz."],
      adimla: "Önce yalnız süzgeçle uyan siparişleri listele, sonra ifadeyi çift haline getir.",
      cozum: "sonuc = [[s['urun'], s['adet'] * s['fiyat']] for s in siparisler if s['adet'] >= 6]\n\nNeden: for ile sipariş sırası korunur, if yalnız eşiği geçenleri bırakır, baştaki köşeli ifade her siparişi [ürün, tutar] çiftine çevirir.",
      kontrol: function (s, v) { return bak(s, v.satirlar.filter(function (r) { return r[1] >= 6; }).map(function (r) { return [r[0], r[1] * r[2]]; }), "[[ürün, tutar], ...] biçiminde ver; yalnız adedi 6 ve üzeri olan siparişler, sipariş sırasıyla olmalı."); },
      varyant: function (v) { return degistir(v, 1, 1, 8); } },
    { id: "py-15-ozyin", ders: "py-15", tur: "python", baslik: "Python · özyineleme ve üreteç",
      gorev: "Özyinelemeli topla(liste) işlevini (boş liste 0) ve her siparişin tutarını sırayla veren tutarlar() üretecini yaz. `sonuc` değişkenine [adetlerin_toplamı, ilk_tutar, ikinci_tutar] ata; tutarlar için next() kullan.",
      baslangic: "adetler = [s['adet'] for s in siparisler]\n\ndef topla(liste):\n    pass\n\ndef tutarlar():\n    pass\n\ng = tutarlar()\nsonuc = None",
      ipucu: ["topla'da taban durumu boş listedir (0 döner); diğer durumda ilk eleman ile kalanın toplamını topla.", "tutarlar() içinde bir döngü kur ve return yerine yield kullan: yield s['adet'] * s['fiyat'].", "return liste[0] + topla(liste[1:]) ; sonuc = [topla(adetler), next(g), ____] ; boşluğa ikinci tutarı verecek çağrıyı yaz."],
      adimla: "topla çağrılarının her seferinde listeyi nasıl kısalttığını ve next'in üreteci nasıl ilerlettiğini izle.",
      cozum: "adetler = [s['adet'] for s in siparisler]\n\ndef topla(liste):\n    if not liste:\n        return 0\n    return liste[0] + topla(liste[1:])\n\ndef tutarlar():\n    for s in siparisler:\n        yield s['adet'] * s['fiyat']\n\ng = tutarlar()\nsonuc = [topla(adetler), next(g), next(g)]\n\nNeden: topla her çağrıda listeyi kısaltır ve boş listede durur (taban durumu); yield işlevi duraklatır, her next bir sonraki tutarı verir.",
      kontrol: function (s, v) { var r = v.satirlar; return bak(s, [toplamAdet(v), r[0][1] * r[0][2], r[1][1] * r[1][2]], "[adet toplamı, ilk tutar, ikinci tutar] biçiminde üç sayı ver; topla özyinelemeli, tutarlar ise yield ile üreteç olmalı."); },
      varyant: function (v) { return degistir(degistir(v, 0, 1, 5), 1, 1, 10); } },
    { id: "py-16-ortalama", ders: "py-16", tur: "python", baslik: "Python · hatalı ortalamayı ayıkla",
      gorev: "Aşağıdaki ortalama() işlevi bozuk: sonuç yanlış çıkıyor. Hatayı bul ve düzelt, sonra `sonuc` değişkenine adetlerin ortalamasını ata.",
      baslangic: "adetler = [s['adet'] for s in siparisler]\n\ndef ortalama(liste):\n    toplam = 0\n    for i in range(1, len(liste)):\n        toplam += liste[i]\n    return toplam / len(liste)\n\nsonuc = ortalama(adetler)",
      ipucu: ["Önce toplam ve eleman sayısını print ile yazdır; toplamı elle hesaplanan değerle karşılaştır.", "range(1, len(liste)) 0. sıradaki elemanı atlar; liste sıra numarası 0'dan başlar.", "for i in range(____, len(liste)) ; boşluğa ilk sıra numarasını yaz (ya da doğrudan for x in liste kullan)."],
      adimla: "Döngünün hangi sıra numaralarını gezdiğini ve toplamın neden eksik kaldığını izle.",
      cozum: "adetler = [s['adet'] for s in siparisler]\n\ndef ortalama(liste):\n    toplam = 0\n    for x in liste:\n        toplam += x\n    return toplam / len(liste)\n\nsonuc = ortalama(adetler)\n\nNeden: hata, ilk elemanı atlayan range(1, ...) idi. Doğrudan elemanları gezmek (for x in liste) bu tür sıra numarası hatalarından korur.",
      kontrol: function (s, v) { return bak(s, toplamAdet(v) / v.satirlar.length, "Ortalama bütün adetleri içermeli: adetlerin toplamı bölü sipariş sayısı. Döngünün ilk elemanı da gezdiğinden emin ol."); },
      varyant: function (v) { return degistir(v, 0, 1, 17); } }
  ];
})();

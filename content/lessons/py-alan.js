/* Python yolu · uygulama alanları (PP.alan, tür "python"): her derste 1 alıştırma. Dersin "alan" bloğu bu tanıma id ile bağlanır (rota-ders.js lblock).
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
      varyant: function (v) { return degistir(degistir(v, 3, 2, 9), 0, 0, "Kurşun"); } }
  ];
})();

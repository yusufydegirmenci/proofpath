/* Veri Analitiği · Seviye 0 uygulama alanları (PP.alan tanımları): her ders için 1 SQL + 1 Python.
   Bu dosya yalnız VERİ ve kontrol işlevleridir; PP.alan'a va-ui.js kaydeder (yükleme sırası). Sentetik 12 siparişlik veri seti.
   Kontrol işlevleri sabit cevap metni TUTMAZ: beklenen değer, verilen veriden (PP.alan'ın çalıştırdığı gerçek ve değiştirilmiş veri) sayılır. */
(function () {
  var VA = (window.PP_VA = window.PP_VA || {});
  function ix(v, ad) { return v.sutunlar.indexOf(ad); }
  function say(v, f) { var n = 0; v.satirlar.forEach(function (r) { if (f(r)) n++; }); return n; }
  function iadeSayisi(v) { var i = ix(v, "iade"); return say(v, function (r) { return r[i] === "evet"; }); }
  function bosIndirimId(v) { var i = ix(v, "indirim_orani"), k = ix(v, "siparis_id"), o = []; v.satirlar.forEach(function (r) { if (r[i] === "" || r[i] === null) o.push(r[k]); }); return o; }
  function toplamEsiz(v) { var k = ix(v, "siparis_id"), s = {}; v.satirlar.forEach(function (r) { s[r[k]] = 1; }); return [v.satirlar.length, Object.keys(s).length]; }
  function kopya(v) { return { sutunlar: v.sutunlar.slice(), satirlar: v.satirlar.map(function (r) { return r.slice(); }) }; }
  function varyantIade(v) { var w = kopya(v), i = ix(w, "iade"), k = ix(w, "siparis_id"); w.satirlar.forEach(function (r) { if (r[k] === "S001") r[i] = "evet"; }); return w; }
  function varyantBos(v) { var w = kopya(v), i = ix(w, "indirim_orani"), k = ix(w, "siparis_id"); w.satirlar.forEach(function (r) { if (r[k] === "S004") r[i] = ""; }); return w; }
  function varyantTekrar(v) { var w = kopya(v); w.satirlar.push(w.satirlar[0].slice()); return w; }

  /* Sonuç normalleştirme: sql → ilk sütun değerleri / ilk hücre; python,js → sonuc değeri */
  function sqlTek(s) { return s.satirlar.length === 1 && s.sutunlar.length === 1 ? s.satirlar[0][0] : undefined; }
  function sqlIlkSutun(s) { return s.satirlar.map(function (r) { return r[0]; }); }
  function ayniKume(a, b) { if (!Array.isArray(a) || a.length !== b.length) return false; var x = a.slice().sort(), y = b.slice().sort(); return x.every(function (e, i) { return e === y[i]; }); }
  function gosterim(x) { try { return JSON.stringify(x); } catch (e) { return String(x); } }
  function sayiKontrol(bulunan, bek) { var d = typeof bulunan === "number" && bulunan === bek; return { dogru: d, mesaj: d ? "Sonuç veriyle uyuşuyor." : "Bulduğun değer: " + gosterim(bulunan) + ". Soruyu ve koşulu yeniden oku; tek bir sayı döndürmelisin." }; }
  function kumeKontrol(bulunan, bek) { var d = ayniKume(bulunan, bek); return { dogru: d, mesaj: d ? "Liste veriyle uyuşuyor." : "Bulduğun: " + gosterim(bulunan) + ". Boş (NULL) hücreyi ve yalnız siparis_id sütununu düşün." }; }
  function ciftKontrol(bulunan, bek) { var d = Array.isArray(bulunan) && bulunan.length === 2 && bulunan[0] === bek[0] && bulunan[1] === bek[1]; return { dogru: d, mesaj: d ? "Toplam ve benzersiz sayı veriyle uyuşuyor." : "Bulduğun: " + gosterim(bulunan) + ". [toplam satır, benzersiz siparis_id] sırasıyla iki sayı döndür." }; }
  function simKontrol(s) { var m = /(\d+)/.exec(s.girdi || ""), d = !!m && Number(m[1]) === iadeSayisi(VA.veri); return { dogru: d, mesaj: d ? "Sayı veriyle uyuşuyor (kural tabanlı kontrol)." : "Yazdığında verideki iade sayısı yok." }; }
  function degerOf(s) { return s.sonucTanimli ? s.deger : undefined; }

  VA.alanlar = [
    { id: "va0-1-sql", ders: "va0-1", tur: "sql", baslik: "SQL · iade sayısı", gorev: "Tablo `siparis`. İade edilen (iade sütunu 'evet') siparişlerin sayısını tek bir sayı olarak döndür.",
      baslangic: "-- siparis tablosu: siparis_id, tarih, musteri_id, sehir, urun, adet, birim_fiyat, indirim_orani, odeme_turu, iade\nSELECT * FROM siparis LIMIT 5;",
      ipucu: ["Saymak için COUNT(*) kullanılır.", "Koşul: WHERE iade = 'evet'", "Metin değerleri tek tırnakla yazılır."],
      kontrol: function (s, v) { return sayiKontrol(sqlTek(s), iadeSayisi(v)); }, varyant: varyantIade },
    { id: "va0-1-py", ders: "va0-1", tur: "python", baslik: "Python · iade sayısı", gorev: "`siparisler` bir sözlük listesidir (her sipariş bir sözlük). İade edilenlerin sayısını `sonuc` değişkenine ata.",
      baslangic: "# siparisler: sözlük listesi, sutunlar: sütun adları\nprint(sutunlar)\nprint(siparisler[0])\nsonuc = None",
      ipucu: ["Bir sipariş için s['iade'] metindir: 'evet' ya da 'hayır'.", "Liste kapsamı ile sayabilirsin: len([s for s in siparisler if ...])"],
      kontrol: function (s, v) { return sayiKontrol(degerOf(s), iadeSayisi(v)); }, varyant: varyantIade },
    { id: "va0-2-sql", ders: "va0-2", tur: "sql", baslik: "SQL · boş (NULL) hücre", gorev: "indirim_orani sütunu boş olan (NULL) siparişlerin siparis_id değerlerini listele (yalnız o sütun).",
      baslangic: "SELECT siparis_id, indirim_orani FROM siparis;",
      ipucu: ["Boşluk için = değil IS NULL kullanılır.", "Yalnız siparis_id sütununu seç."],
      kontrol: function (s, v) { return kumeKontrol(sqlIlkSutun(s), bosIndirimId(v)); }, varyant: varyantBos },
    { id: "va0-2-py", ders: "va0-2", tur: "python", baslik: "Python · boş (None) hücre", gorev: "indirim_orani boş (None) olan siparişlerin siparis_id değerlerinden bir liste yap ve `sonuc`a ata.",
      baslangic: "for s in siparisler:\n    print(s['siparis_id'], s['indirim_orani'])\nsonuc = []",
      ipucu: ["Python'da boş değer None'dır; `is None` ile denetlenir.", "[s['siparis_id'] for s in siparisler if ...]"],
      kontrol: function (s, v) { return kumeKontrol(degerOf(s), bosIndirimId(v)); }, varyant: varyantBos },
    { id: "va0-3-sql", ders: "va0-3", tur: "sql", baslik: "SQL · tekrar var mı?", gorev: "Veri kalitesi kontrolü: tek satırda iki sayı döndür: toplam satır sayısı ve benzersiz siparis_id sayısı (bu sırayla).",
      baslangic: "SELECT COUNT(*) FROM siparis;",
      ipucu: ["COUNT(DISTINCT sütun) benzersiz değerleri sayar.", "İki ifadeyi virgülle ayırıp aynı SELECT içine yaz."],
      kontrol: function (s, v) { var r = s.satirlar.length === 1 && s.sutunlar.length === 2 ? s.satirlar[0] : undefined; return ciftKontrol(r, toplamEsiz(v)); }, varyant: varyantTekrar },
    { id: "va0-3-py", ders: "va0-3", tur: "python", baslik: "Python · tekrar var mı?", gorev: "`sonuc` = [toplam satır sayısı, benzersiz siparis_id sayısı] (bu sırayla).",
      baslangic: "ids = [s['siparis_id'] for s in siparisler]\nprint(ids)\nsonuc = None",
      ipucu: ["set(liste) tekrarları atar.", "len(ids) ve len(set(ids))"],
      kontrol: function (s, v) { return ciftKontrol(degerOf(s), toplamEsiz(v)); }, varyant: varyantTekrar }
  ];
  /* Simülatör örneği (kod çalışmaz): etiket "simülasyon" */
  VA.alanSim = { id: "va0-sim", ders: "va0-1", tur: "sim", baslik: "Simülasyon · iade sayısı", gorev: "Veri tablosuna bakıp iade edilen sipariş sayısını yaz (kod çalışmaz).", baslangic: "Cevap: ", ipucu: ["iade sütunundaki 'evet' değerlerini say."], kontrol: simKontrol };
})();

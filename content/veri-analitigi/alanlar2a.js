/* Veri Analitiği · Seviye 2 (SQL) uygulama alanları va2-1 … va2-7 (+ va2-4-py, va2-5-py).
   Bağımlılık: VA.yd ve VA.veriSql (veri-ek.js). Kontrol işlevleri sabit cevap TUTMAZ: beklenen değer, verilen (gerçek ya da değiştirilmiş) veriden JS ile hesaplanır.
   SQL: SQLite (sql.js); çok tablolu alanlarda veri: VA.veriSql (siparis + musteri, urun, hedef). Python: Pyodide, yalnız standart kütüphane. */
(function () {
  var VA = (window.PP_VA = window.PP_VA || {});
  VA.alanlar = VA.alanlar || [];
  var yd = VA.yd;

  function nes(v, ad) { return yd.nesneler(v, ad); }
  function net(o) { return o.adet * o.birim_fiyat * (1 - (o.indirim_orani === null ? 0 : o.indirim_orani)); }
  function brut(o) { return o.adet * o.birim_fiyat; }
  function degistir(w, id, alan, deger) { var i = yd.ix(w, alan), k = yd.ix(w, "siparis_id"); w.satirlar.forEach(function (r) { if (r[k] === id) r[i] = deger; }); }
  var YENI_SIPARIS = function () { return ["S013", "2026-04-02", "M09", "Bursa", "Fare", 1, 250.0, 0.0, "kart", "hayır"]; };

  /* ---- Ders 1: şema keşfi ---- */
  function tabloAdlari(v) { return ["siparis"].concat(Object.keys(v.ek || {})); }
  function varyant1(v) { var w = yd.kopya(v); w.ek.kargo = { sutunlar: ["kargo_id", "firma"], satirlar: [["K1", "Demo Lojistik"]] }; return w; }

  /* ---- Ders 2: iade edilmeyen, brüt tutarı en yüksek 3 sipariş ---- */
  function ilk3(v) {
    var L = nes(v).filter(function (o) { return o.iade === "hayır"; }).map(function (o) { return [o.siparis_id, brut(o)]; });
    L.sort(function (a, b) { return b[1] - a[1] || (a[0] < b[0] ? -1 : 1); });
    return L.slice(0, 3);
  }
  function varyant2(v) { var w = yd.kopya(v); degistir(w, "S003", "adet", 10); degistir(w, "S004", "adet", 20); return w; }

  /* ---- Ders 3: indirim sınıfı ---- */
  function sinif(o) { var d = o.indirim_orani; return d === null ? "bilinmiyor" : d === 0 ? "yok" : d < 0.10 ? "dusuk" : "yuksek"; }
  function sinifSatirlari(v) { return nes(v).map(function (o) { return [o.siparis_id, sinif(o)]; }); }
  function varyant3(v) { var w = yd.kopya(v); degistir(w, "S002", "indirim_orani", ""); degistir(w, "S004", "indirim_orani", 0.10); return w; }

  /* ---- Ders 4: toplam net ciro (SQL) ve iade edilmeyenlerin ortalama brüt tutarı (Python) ---- */
  function toplamNet(v) { return nes(v).reduce(function (t, o) { return t + net(o); }, 0); }
  function varyant4s(v) { var w = yd.kopya(v); degistir(w, "S007", "adet", 4); degistir(w, "S002", "indirim_orani", ""); return w; }
  function ortBrutIadesiz(v) { var L = nes(v).filter(function (o) { return o.iade === "hayır"; }); return L.reduce(function (t, o) { return t + brut(o); }, 0) / L.length; }
  function varyant4p(v) { var w = yd.kopya(v); degistir(w, "S001", "iade", "evet"); degistir(w, "S012", "adet", 10); return w; }

  /* ---- Ders 5: ürün bazında sayı/adet + HAVING (SQL); şehir bazında iade edilmeyen brüt ciro (Python) ---- */
  function urunOzet(v) {
    var g = {}, sira = [];
    nes(v).forEach(function (o) { if (!g[o.urun]) { g[o.urun] = [o.urun, 0, 0]; sira.push(o.urun); } g[o.urun][1] += 1; g[o.urun][2] += o.adet; });
    return sira.map(function (k) { return g[k]; }).filter(function (r) { return r[2] >= 5; });
  }
  function varyant5s(v) { var w = yd.kopya(v); degistir(w, "S002", "adet", 3); degistir(w, "S006", "adet", 5); return w; }
  function sehirBrut(v) { var g = {}; nes(v).forEach(function (o) { if (o.iade === "hayır") g[o.sehir] = (g[o.sehir] || 0) + brut(o); }); return g; }
  function varyant5p(v) { var w = yd.kopya(v); var r = w.satirlar[0].slice(); r[0] = "S013"; r[yd.ix(w, "sehir")] = "Bursa"; w.satirlar.push(r); return w; }
  function sozlukKontrol(bulunan, bek) {
    var tam = bulunan !== null && typeof bulunan === "object" && !Array.isArray(bulunan), k = Object.keys(bek), d = tam && Object.keys(bulunan).length === k.length && k.every(function (a) { return yd.yakin(bulunan[a], bek[a]); });
    return { dogru: d, mesaj: d ? "Sözlük veriyle uyuşuyor." : "Bulduğun: " + yd.gosterim(bulunan) + ". Her şehir için tek değer taşıyan bir sözlük ({şehir: toplam}) döndür; iade koşulunu ve eksik şehir olup olmadığını kontrol et." };
  }

  /* ---- Ders 6: hiç siparişi olmayan müşteriler ---- */
  function siparissiz(v) {
    var var_ = {}; nes(v).forEach(function (o) { var_[o.musteri_id] = 1; });
    return nes(v, "musteri").filter(function (m) { return !var_[m.musteri_id]; }).map(function (m) { return [m.musteri_id, m.segment]; });
  }
  function varyant6(v) { var w = yd.kopya(v); w.ek.musteri.satirlar.push(["M10", "kurumsal", "Bursa", "2026-04-01"]); w.satirlar.push(YENI_SIPARIS()); return w; }

  /* ---- Ders 7: hedef ve gerçekleşen net ciro ---- */
  function hedefTablosu(v) {
    return nes(v, "hedef").map(function (h) {
      var g = nes(v).filter(function (o) { return o.tarih.slice(0, 7) === h.ay; }).reduce(function (t, o) { return t + net(o); }, 0);
      return [h.ay, h.hedef_ciro, g, g - h.hedef_ciro];
    });
  }
  function varyant7(v) { var w = yd.kopya(v); w.ek.hedef.satirlar.forEach(function (r) { if (r[0] === "2026-03") r[1] = 6000; }); w.ek.hedef.satirlar.push(["2026-05", 4000]); w.satirlar.push(YENI_SIPARIS()); return w; }

  VA.alanlar.push(
    { id: "va2-1-sql", ders: "va2-1", tur: "sql", veri: VA.veriSql, baslik: "SQL · şema keşfi: tablo adları", gorev: "Veritabanında hangi tablolar var? sqlite_master sistem tablosundan yalnız tablo adlarını (tek sütun: name) listele; indeks ve sistem kayıtları gelmesin.",
      baslangic: "-- sqlite_master: type, name, tbl_name, sql sütunları\nSELECT type, name FROM sqlite_master;",
      ipucu: ["sqlite_master içinde type sütunu 'table', 'index' gibi değerler taşır.", "Koşul: WHERE type = 'table'", "Sütun listesini yalnız name yap. Tablonun sütunları için ayrıca SELECT * FROM pragma_table_info('musteri') deneyebilirsin."],
      kontrol: function (s, v) { return yd.satirlar(s.satirlar.map(function (r) { return [r[0]]; }), tabloAdlari(v).map(function (a) { return [a]; }), "Yalnız type = 'table' olan kayıtların name değerini al (tek sütun). Eksik ya da fazla bir tablo var mı?"); },
      varyant: varyant1 },
    { id: "va2-2-sql", ders: "va2-2", tur: "sql", baslik: "SQL · en büyük 3 sipariş", gorev: "İade edilmemiş (iade = 'hayır') siparişler arasından brüt tutarı (adet * birim_fiyat) en yüksek 3 siparişin siparis_id ve tutar sütunlarını, tutara göre büyükten küçüğe döndür. Tutar eşitse siparis_id artan sıralansın.",
      baslangic: "SELECT siparis_id, adet * birim_fiyat AS tutar\nFROM siparis;",
      ipucu: ["Önce WHERE ile iade koşulunu yaz.", "ORDER BY tutar DESC, siparis_id; ardından LIMIT 3.", "Metin sabitleri tek tırnakla yazılır: 'hayır'."],
      kontrol: function (s, v) { return yd.satirlar(s.satirlar, ilk3(v), "Satır sayısı 3 mi? Sıralama (büyükten küçüğe, eşitte siparis_id artan), iade koşulu ve sütun sırası (siparis_id, tutar) doğru mu?", true); },
      varyant: varyant2 },
    { id: "va2-3-sql", ders: "va2-3", tur: "sql", baslik: "SQL · indirim sınıfı (CASE WHEN)", gorev: "Her sipariş için siparis_id ve indirim_sinifi döndür: indirim_orani boşsa 'bilinmiyor', 0 ise 'yok', 0.10'dan küçükse 'dusuk', diğer durumlarda 'yuksek'. Etiketleri tam bu yazımla kullan.",
      baslangic: "SELECT siparis_id,\n       indirim_orani  -- bunu CASE WHEN ... END AS indirim_sinifi ile değiştir\nFROM siparis;",
      ipucu: ["CASE WHEN koşul THEN 'etiket' ... ELSE 'etiket' END", "NULL için dalı en başa koy: WHEN indirim_orani IS NULL THEN 'bilinmiyor'", "Koşullar yukarıdan aşağıya denenir; 0'ı '< 0.10' dalından önce yakala."],
      kontrol: function (s, v) { return yd.satirlar(s.satirlar, sinifSatirlari(v), "12 satır ve iki sütun (siparis_id, sınıf) bekleniyor. NULL indirimli satır 'bilinmiyor' mu? Koşul sırasını ve etiket yazımını kontrol et."); },
      varyant: varyant3 },
    { id: "va2-4-sql", ders: "va2-4", tur: "sql", baslik: "SQL · toplam net ciro", gorev: "Tüm siparişlerin toplam net cirosunu tek sayı olarak döndür: SUM(adet * birim_fiyat * (1 - indirim_orani)). İndirim oranı bilinmeyen (boş) siparişler indirimsiz (0) sayılsın.",
      baslangic: "SELECT SUM(adet * birim_fiyat * (1 - indirim_orani)) AS net_ciro\nFROM siparis;",
      ipucu: ["Boş (NULL) indirim bu ifadeyi NULL yapar ve SUM o satırı atlar.", "COALESCE(indirim_orani, 0) NULL'ı 0'a çevirir.", "Tek sütun, tek satır döndür."],
      kontrol: function (s, v) { return yd.sayi(yd.sqlTek(s), toplamNet(v), "Tek bir sayı bekleniyor. NULL indirimli satırlar toplamdan düşmüş olabilir; COALESCE ile 0 say."); },
      varyant: varyant4s },
    { id: "va2-4-py", ders: "va2-4", tur: "python", baslik: "Python · ortalama brüt tutar", gorev: "`siparisler` bir sözlük listesidir. İade edilmemiş (iade == 'hayır') siparişlerin ortalama brüt tutarını (adet * birim_fiyat) `sonuc` değişkenine ata (yuvarlama yapma).",
      baslangic: "# siparisler: sözlük listesi (her sipariş bir sözlük)\nprint(siparisler[0])\nsonuc = None",
      ipucu: ["Önce iade edilmemişleri bir listeye ayır.", "Ortalama = toplam / eleman sayısı; sum() ve len() kullan.", "Her sipariş için s['adet'] * s['birim_fiyat'] hesapla."],
      kontrol: function (s, v) { return yd.sayi(yd.degerOf(s), ortBrutIadesiz(v), "Tek bir sayı (ortalama) bekleniyor. Yalnız iade == 'hayır' siparişleri mi aldın ve doğru sayıya mı böldün?"); },
      varyant: varyant4p },
    { id: "va2-5-sql", ders: "va2-5", tur: "sql", baslik: "SQL · ürün bazında özet + HAVING", gorev: "Ürün bazında siparis_sayisi (COUNT) ve toplam_adet (SUM(adet)) hesapla; yalnız toplam adedi en az 5 olan ürünleri döndür. Sütun sırası: urun, siparis_sayisi, toplam_adet.",
      baslangic: "SELECT urun, COUNT(*) AS siparis_sayisi\nFROM siparis\nGROUP BY urun;",
      ipucu: ["Her ürün için bir satır: GROUP BY urun.", "İkinci toplama: SUM(adet) AS toplam_adet.", "Grup koşulu HAVING ile yazılır: HAVING SUM(adet) >= 5."],
      kontrol: function (s, v) { return yd.satirlar(s.satirlar, urunOzet(v), "Üç sütun (urun, siparis_sayisi, toplam_adet) bekleniyor. Toplam adedi 5'in altında kalan ürünler elendi mi? Koşulu WHERE'e değil HAVING'e yaz."); },
      varyant: varyant5s },
    { id: "va2-5-py", ders: "va2-5", tur: "python", baslik: "Python · şehir bazında brüt ciro", gorev: "İade edilmemiş (iade == 'hayır') siparişlerin brüt cirosunu (adet * birim_fiyat) şehir bazında toplayıp `sonuc` değişkenine {şehir: toplam} biçiminde bir sözlük olarak ata.",
      baslangic: "sonuc = {}\nfor s in siparisler:\n    print(s['sehir'], s['iade'])",
      ipucu: ["Boş sözlükle başla, her sipariş için ilgili şehrin değerine ekle.", "sonuc.get(sehir, 0) anahtar yoksa 0 verir.", "iade koşulu için if s['iade'] == 'hayır' kullan."],
      kontrol: function (s, v) { return sozlukKontrol(yd.degerOf(s), sehirBrut(v)); },
      varyant: varyant5p },
    { id: "va2-6-sql", ders: "va2-6", tur: "sql", veri: VA.veriSql, baslik: "SQL · hiç siparişi olmayan müşteriler", gorev: "musteri tablosunda olup siparis tablosunda hiç siparişi bulunmayan müşterilerin musteri_id ve segment sütunlarını döndür (tercihen JOIN).",
      baslangic: "-- musteri: musteri_id, segment, sehir, kayit_tarihi\n-- siparis.musteri_id → musteri.musteri_id\nSELECT m.musteri_id, m.segment\nFROM musteri m;",
      ipucu: ["Tüm müşterileri korumak için LEFT JOIN siparis s ON s.musteri_id = m.musteri_id.", "Eşleşmeyen satırda s.siparis_id NULL olur.", "WHERE s.siparis_id IS NULL"],
      kontrol: function (s, v) { return yd.satirlar(s.satirlar, siparissiz(v), "İki sütun (musteri_id, segment) bekleniyor. INNER JOIN eşleşmeyen müşteriyi eler; LEFT JOIN ve IS NULL dene."); },
      varyant: varyant6 },
    { id: "va2-7-sql", ders: "va2-7", tur: "sql", veri: VA.veriSql, baslik: "SQL · hedef ve gerçekleşen net ciro", gorev: "hedef tablosundaki her ay için ay, hedef_ciro, gerceklesen (o ayın toplam net cirosu: adet * birim_fiyat * (1 - indirim_orani); NULL indirim 0 sayılsın; siparişi olmayan ay 0) ve fark (gerceklesen - hedef_ciro) döndür. Ay eşleşmesi için substr(tarih, 1, 7) kullan.",
      baslangic: "-- hedef: ay ('YYYY-MM'), hedef_ciro\nSELECT h.ay, h.hedef_ciro\nFROM hedef h;",
      ipucu: ["hedef tablosundan başla ve LEFT JOIN siparis s ON substr(s.tarih, 1, 7) = h.ay yaz.", "NULL indirim için COALESCE(s.indirim_orani, 0); siparişsiz ay için COALESCE(SUM(...), 0).", "GROUP BY h.ay, h.hedef_ciro; fark sütununu aynı SELECT'te hesapla."],
      kontrol: function (s, v) { return yd.satirlar(s.satirlar, hedefTablosu(v), "Dört sütun (ay, hedef_ciro, gerceklesen, fark) ve hedef tablosundaki her ay için bir satır bekleniyor. Siparişi olmayan ay kayboldu ya da NULL kaldıysa LEFT JOIN ve COALESCE'i kontrol et."); },
      varyant: varyant7 }
  );
})();

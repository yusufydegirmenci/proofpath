/* Veri Analitiği · Seviye 2b uygulama alanları (dersler va2-8 … va2-13): hepsi çok tablolu VA.veriSql üzerinde.
   Kontrol işlevleri sabit cevap TUTMAZ: beklenen değer verilen veriden (v) hesaplanır; varyant(v) beklenen sonucu değiştirir.
   SQL: SQLite uyumlu (sql.js). Python: Pyodide, yalnız standart kütüphane. Tüm veri sentetiktir. */
(function () {
  var VA = (window.PP_VA = window.PP_VA || {});
  VA.alanlar = VA.alanlar || [];
  function yd() { return VA.yd; }
  function say(v) { return yd().nesneler(v); }
  function net(o) { return o.adet * o.birim_fiyat * (1 - (o.indirim_orani || 0)); }
  function degistir(v, id, sutun, deger) { var w = yd().kopya(v), i = yd().ix(w, sutun), k = yd().ix(w, "siparis_id"); w.satirlar.forEach(function (r) { if (r[k] === id) r[i] = deger; }); return w; }
  function ekle(v, satir) { var w = yd().kopya(v); w.satirlar.push(satir); return w; }
  function yakinSatirlar(a, b, tol) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
    var f = function (L) { return L.slice().sort(function (p, q) { return String(p[0]) < String(q[0]) ? -1 : 1; }); }, x = f(a), y = f(b);
    return x.every(function (r, i) { return r.length === y[i].length && r.every(function (e, j) { return typeof e === "number" && typeof y[i][j] === "number" ? Math.abs(e - y[i][j]) <= tol : String(e) === String(y[i][j]); }); });
  }
  function aynilar(a, b) { return JSON.stringify(a) === JSON.stringify(b); }
  function sozluk(bulunan, bek, ipucu) {
    if (bulunan === null || typeof bulunan !== "object" || Array.isArray(bulunan)) return { dogru: false, mesaj: "Bulduğun: " + yd().gosterim(bulunan) + ". `sonuc` bir sözlük olmalı (anahtar: değer)." };
    var kotu = Object.keys(bek).filter(function (k) { var a = bulunan[k], b = bek[k]; if (Array.isArray(b)) return !Array.isArray(a) || !aynilar(a.slice().sort(), b.slice().sort()); if (typeof b === "number" && typeof a === "number") return Math.abs(a - b) > 1e-9; return a !== b; });
    var fazla = Object.keys(bulunan).filter(function (k) { return !(k in bek); });
    if (!kotu.length && !fazla.length) return { dogru: true, mesaj: "Sonuç veriyle uyuşuyor." };
    return { dogru: false, mesaj: "Bulduğun: " + yd().gosterim(bulunan) + ". Uyuşmayan/eksik anahtarlar: " + (kotu.length ? kotu.join(", ") : "yok") + (fazla.length ? "; fazla anahtarlar: " + fazla.join(", ") : "") + ". " + (ipucu || "") };
  }

  /* ---- ders 8: alt sorgu ve CTE ---- */
  function altiOrtalama(v) {
    var o = say(v), n = o.map(net), ort = n.reduce(function (a, b) { return a + b; }, 0) / n.length;
    return { ort: ort, satirlar: o.filter(function (x) { return net(x) < ort; }).map(function (x) { return [x.siparis_id, net(x)]; }), ust: o.filter(function (x) { return net(x) > ort; }).length };
  }
  var VA8SQL = { id: "va2-8-sql", ders: "va2-8", tur: "sql", baslik: "SQL · ortalamanın altındaki siparişler", veri: VA.veriSql,
    gorev: "Net tutar = adet × birim_fiyat × (1 − indirim_orani); boş (NULL) indirim, indirimsiz (0) sayılır. Tüm siparişlerin ortalama net tutarının ALTINDA kalan siparişleri `siparis_id` ve `net_tutar` sütunlarıyla (bu sırayla) listele. Ortalamayı sabit yazma: alt sorgu ya da CTE ile hesapla.",
    baslangic: "-- net tutar için: adet * birim_fiyat * (1 - COALESCE(indirim_orani, 0))\nSELECT siparis_id, adet * birim_fiyat AS brut FROM siparis;",
    ipucu: ["Ortalamayı sabit yazamazsın: sorgu önce ortalamayı hesaplamalı, sonra her siparişin net tutarını onunla karşılaştırmalı.", "Net tutar adet * birim_fiyat * (1 - COALESCE(indirim_orani, 0)); ortalama için WHERE içinde skaler alt sorgu kullan: (SELECT AVG(<aynı ifade>) FROM siparis).", "WITH n AS (SELECT siparis_id, ____ AS net_tutar FROM siparis) SELECT siparis_id, net_tutar FROM n WHERE net_tutar < (SELECT ____(net_tutar) FROM n) ; boşlukları net tutar ifadesi ve ortalama işleviyle doldur."],
    kontrol: function (s, v) {
      var b = altiOrtalama(v), bul = s.satirlar;
      var d = s.sutunlar.length === 2 && yd().ayniSatirlar(bul, b.satirlar);
      return { dogru: d, mesaj: d ? "Sonuç veriyle uyuşuyor." : "Bulduğun: " + bul.length + " satır, " + s.sutunlar.length + " sütun. İki sütun (siparis_id, net_tutar) bekleniyor; boş indirimli satırı ve ortalamanın hangi satırlarla hesaplandığını kontrol et." };
    },
    varyant: function (v) { return degistir(v, "S010", "adet", 5); } };
  var VA8PY = { id: "va2-8-py", ders: "va2-8", tur: "python", adimla: "«Adım adım göster»e bas: `net(s)` işlevine her girişte `s` ve `ind` değerlerinin nasıl değiştiğini ve işlevin ne döndürdüğünü gör.", baslik: "Python · ortalama net tutar ve üstündekiler", veri: VA.veriSql,
    gorev: "`siparisler` sözlük listesidir. Net tutar = adet × birim_fiyat × (1 − indirim_orani); indirim_orani None ise 0 say. `sonuc` = [ortalama net tutar (2 ondalığa yuvarlı), ortalamanın ÜSTÜNDE kalan sipariş sayısı] (bu sırayla).",
    baslangic: "def net(s):\n    ind = s['indirim_orani'] or 0\n    return s['adet'] * s['birim_fiyat'] * (1 - ind)\n\nnetler = [net(s) for s in siparisler]\nprint(netler)\nsonuc = None",
    ipucu: ["Önce her siparişin net tutarını bir listede topla; ortalamayı bu listeden çıkar, sonra ortalamayı aşanları say.", "None indirimi (s['indirim_orani'] or 0) ile 0 say; ortalama = sum(netler) / len(netler); iki ondalık için round(x, 2); sonuc iki elemanlı liste: [ortalama, üstündekilerin sayısı].", "ort = sum(netler) / len(netler); sonuc = [round(ort, 2), len([n for n in netler if ____])] ; boşluğa 'ortalamanın üstünde' koşulunu yaz."],
    kontrol: function (s, v) {
      var b = altiOrtalama(v), f = yd().degerOf(s), bek = [Math.round(b.ort * 100) / 100, b.ust];
      var d = Array.isArray(f) && f.length === 2 && typeof f[0] === "number" && Math.abs(f[0] - bek[0]) < 0.011 && f[1] === bek[1];
      return { dogru: d, mesaj: d ? "Sonuç veriyle uyuşuyor." : "Bulduğun: " + yd().gosterim(f) + ". [ortalama, üstündeki sayısı] biçiminde iki değer ver; boş indirimli (None) siparişi atlayıp atlamadığını kontrol et." };
    },
    varyant: function (v) { return degistir(v, "S010", "adet", 5); } };

  /* ---- ders 9: tarih ve metin ---- */
  function aylik(v) {
    var g = {}; say(v).forEach(function (o) { var a = o.tarih.slice(0, 7); g[a] = g[a] || [a, 0, 0]; g[a][1]++; g[a][2] += net(o); });
    return Object.keys(g).sort().map(function (a) { return g[a]; });
  }
  var VA9SQL = { id: "va2-9-sql", ders: "va2-9", tur: "sql", baslik: "SQL · aylık sipariş sayısı ve net ciro", veri: VA.veriSql,
    gorev: "Tarih metnini aya çevirip ay bazında özetle: `ay` ('YYYY-AA'), `siparis_sayisi`, `net_ciro` (adet × birim_fiyat × (1 − indirim_orani); NULL indirim 0 sayılır) — bu sırayla, aya göre artan sırada.",
    baslangic: "SELECT tarih, strftime('%Y-%m', tarih) AS ay FROM siparis LIMIT 5;",
    ipucu: ["Tarihler günlük; aylık özet için her tarihi önce 'YYYY-AA' ay anahtarına çevirip bu anahtara göre gruplamalısın.", "strftime('%Y-%m', tarih) AS ay; COUNT(*) sipariş sayısını, SUM(adet * birim_fiyat * (1 - COALESCE(indirim_orani, 0))) net ciroyu verir; zaman sırası için ORDER BY ay.", "SELECT strftime('____', tarih) AS ay, COUNT(*) AS siparis_sayisi, SUM(____) AS net_ciro FROM siparis GROUP BY ay ORDER BY ____ ; boşlukları biçim kalıbı, net tutar ifadesi ve sıralama sütunuyla doldur."],
    kontrol: function (s, v) { var d = s.sutunlar.length === 3; return d ? yd().satirlar(s.satirlar, aylik(v), "Ay sayısını, her aydaki sipariş sayısını ve indirimi boş olan satırın cirosunu kontrol et.", true) : { dogru: false, mesaj: "3 sütun (ay, siparis_sayisi, net_ciro) bekleniyor; bulduğun sütun sayısı: " + s.sutunlar.length + "." }; },
    varyant: function (v) { return ekle(v, ["S013", "2026-04-09", "M04", "Ankara", "Fare", 4, 250.0, 0.20, "kart", "hayır"]); } };

  /* ---- ders 10: pencere fonksiyonları ---- */
  function aylikFark(v) { var a = aylik(v); return a.map(function (r, i) { return [r[0], r[2], i === 0 ? null : r[2] - a[i - 1][2]]; }); }
  var VA10SQL = { id: "va2-10-sql", ders: "va2-10", tur: "sql", baslik: "SQL · önceki aya göre değişim (LAG)", veri: VA.veriSql,
    gorev: "Aylık net ciroyu (adet × birim_fiyat × (1 − indirim_orani); NULL indirim 0) ve bir önceki aya göre farkı listele: `ay`, `net_ciro`, `onceki_aya_fark` (= bu ay − önceki ay). İlk ayın farkı NULL kalmalı (önceki ay yok). Aya göre artan sırada olsun.",
    baslangic: "-- önce aylık ciroyu CTE'de hazırla, sonra LAG(...) OVER (ORDER BY ...) ekle\nSELECT strftime('%Y-%m', tarih) AS ay, SUM(adet * birim_fiyat) AS brut FROM siparis GROUP BY 1;",
    ipucu: ["Önce aylık ciroyu bir CTE'de hazırla; farkı o tablonun üstünde, önceki satırı gösteren bir pencere işleviyle hesapla.", "Bir önceki satırın değerini getiren bir pencere işlevi vardır; OVER içindeki sıralama zaman sırasında (aya göre artan) olmalı, yoksa 'önceki' satır yanlış aya denk gelir. İlk ayın önceki satırı olmadığından orada NULL döner; fark = bu ay - önceki ay.", "WITH aylik AS (SELECT strftime('%Y-%m', tarih) AS ay, SUM(____) AS net_ciro FROM siparis GROUP BY ay) SELECT ay, net_ciro, net_ciro - ____(net_ciro) OVER (ORDER BY ay) AS onceki_aya_fark FROM aylik ORDER BY ay ; boşlukları net tutar ifadesi ve pencere işleviyle doldur."],
    kontrol: function (s, v) { var d = s.sutunlar.length === 3; return d ? yd().satirlar(s.satirlar, aylikFark(v), "İlk ayın farkı NULL olmalı; fark = bu ay − önceki ay (işaretine ve OVER içindeki sıralamaya dikkat).", true) : { dogru: false, mesaj: "3 sütun (ay, net_ciro, onceki_aya_fark) bekleniyor; bulduğun: " + s.sutunlar.length + "." }; },
    varyant: function (v) { return degistir(v, "S008", "adet", 1); } };
  function sehirEnBuyuk(v) {
    var g = {}, en = {}; say(v).forEach(function (o) { var n = net(o); if (!(o.sehir in en) || n > en[o.sehir]) { en[o.sehir] = n; g[o.sehir] = o.siparis_id; } }); return g;
  }
  var VA10PY = { id: "va2-10-py", ders: "va2-10", tur: "python", baslik: "Python · şehirde en yüksek net tutarlı sipariş", veri: VA.veriSql,
    gorev: "(Python bilgisi varsayar; SQL ile çalışmayı seçtiysen va2-10-sql alanı alternatiftir.) Her şehir için net tutarı (adet × birim_fiyat × (1 − indirim_orani); None indirim 0) EN YÜKSEK olan siparişin `siparis_id` değerini bul. `sonuc` = {şehir: siparis_id} sözlüğü. (SQL'de ROW_NUMBER() OVER (PARTITION BY sehir ORDER BY net DESC) = 1 filtresinin Python karşılığı.)",
    baslangic: "def net(s):\n    return s['adet'] * s['birim_fiyat'] * (1 - (s['indirim_orani'] or 0))\n\nsonuc = {}\nfor s in siparisler:\n    print(s['sehir'], s['siparis_id'], net(s))",
    ipucu: ["Her şehir için 'şimdiye kadarki en iyi' bir kayıt tutacaksın; yeni sipariş daha yüksek net tutarlıysa kaydı değiştirirsin.", "Sözlükte şehir → (en yüksek net, siparis_id) tut; şehir ilk kez görülüyorsa ya da net(s) kayıttakini aşıyorsa güncelle. Sonda yalnız siparis_id değerlerini bırak.", "en = {}; for s in siparisler: n = net(s); if s['sehir'] not in en or n ____ en[s['sehir']][0]: en[s['sehir']] = (n, s['siparis_id']); sonra sonuc = {k: t[1] for k, t in en.items()} ; boşluğa karşılaştırma işlecini yaz."],
    kontrol: function (s, v) { return sozluk(yd().degerOf(s), sehirEnBuyuk(v), "Her şehir için yalnız bir sipariş_id döndür; net tutarı indirimle hesapla."); },
    varyant: function (v) { return degistir(degistir(degistir(v, "S001", "adet", 10), "S001", "indirim_orani", 0.5), "S011", "adet", 10); } };

  /* ---- ders 11: koşullu toplama ve veri kalitesi ---- */
  function iadeOrani(v) {
    var g = {}; say(v).forEach(function (o) { var k = o.odeme_turu; g[k] = g[k] || [k, 0, 0, 0]; g[k][1]++; if (o.iade === "evet") g[k][2]++; });
    return Object.keys(g).map(function (k) { g[k][3] = g[k][2] / g[k][1]; return g[k]; });
  }
  var VA11SQL = { id: "va2-11-sql", ders: "va2-11", tur: "sql", baslik: "SQL · ödeme türüne göre iade oranı", veri: VA.veriSql,
    gorev: "Ödeme türü başına: `odeme_turu`, `siparis_sayisi`, `iade_sayisi` (iade = 'evet' olanlar) ve `iade_orani` (iade_sayisi / siparis_sayisi, 0–1 arası ondalık). İadesi hiç olmayan ödeme türleri de listede 0 ile görünmeli. Koşullu toplama kullan.",
    baslangic: "SELECT odeme_turu, COUNT(*) AS siparis_sayisi\nFROM siparis\nGROUP BY odeme_turu;",
    ipucu: ["Her ödeme türünde iade edilenleri ayrıca saymalısın; WHERE ile süzersen iadesiz türler listeden kaybolur, bu yüzden sayımı koşullu yap.", "Koşullu sayım için SUM içine koşula göre 1 ya da 0 üreten bir CASE ifadesi koy. Oranda iki tamsayı bölününce sonuç tamsayıya kırpılır (0 çıkar); payı ondalık sayıya çeviren bir çarpan ya da dönüşüm gerekir.", "SELECT odeme_turu, COUNT(*) AS siparis_sayisi, SUM(CASE WHEN iade = 'evet' THEN 1 ELSE 0 END) AS iade_sayisi, ____ * SUM(CASE WHEN iade = 'evet' THEN 1 ELSE 0 END) / COUNT(*) AS iade_orani FROM siparis GROUP BY odeme_turu ; boşluğa tamsayı bölmesini önleyen çarpanı yaz."],
    kontrol: function (s, v) {
      var d = s.sutunlar.length === 4 && yakinSatirlar(s.satirlar, iadeOrani(v), 0.0051);
      return { dogru: d, mesaj: d ? "Sonuç veriyle uyuşuyor." : "Bulduğun: " + yd().gosterim(s.satirlar) + ". 4 sütun ve her ödeme türü için tek satır bekleniyor; iadesiz grupların kaybolup kaybolmadığını ve oranın tamsayı bölmesine düşüp düşmediğini kontrol et (2 ondalığa yuvarlama kabul)." };
    },
    varyant: function (v) { return degistir(v, "S002", "iade", "evet"); } };
  function kalite(v) {
    var o = say(v), ids = {}, mus = {}, urun = {}, satilan = {}, sip = {};
    yd().nesneler(v, "musteri").forEach(function (m) { mus[m.musteri_id] = 1; });
    yd().nesneler(v, "urun").forEach(function (u) { urun[u.urun] = 1; });
    o.forEach(function (x) { ids[x.siparis_id] = (ids[x.siparis_id] || 0) + 1; satilan[x.urun] = 1; sip[x.musteri_id] = 1; });
    return {
      bos_indirim: o.filter(function (x) { return x.indirim_orani === null; }).length,
      tekrar_id: o.length - Object.keys(ids).length,
      yetim_musteri: o.filter(function (x) { return !mus[x.musteri_id]; }).length,
      siparissiz_musteri: Object.keys(mus).filter(function (m) { return !sip[m]; }).length,
      satilmayan_urun: Object.keys(urun).filter(function (u) { return !satilan[u]; })
    };
  }
  var VA11PY = { id: "va2-11-py", ders: "va2-11", tur: "python", baslik: "Python · veri kalitesi raporu", veri: VA.veriSql,
    gorev: "`siparisler` ve `tablolar['musteri']`, `tablolar['urun']` sözlük listeleridir. `sonuc` sözlüğünde 5 anahtar ver: `bos_indirim` (indirim_orani boş/None sipariş sayısı), `tekrar_id` (toplam satır − benzersiz siparis_id sayısı), `yetim_musteri` (musteri tablosunda karşılığı OLMAYAN musteri_id'li sipariş sayısı), `siparissiz_musteri` (hiç siparişi olmayan müşteri sayısı), `satilmayan_urun` (urun tablosunda olup hiç satılmamış ürün adları listesi).",
    baslangic: "musteri_idleri = {m['musteri_id'] for m in tablolar['musteri']}\nprint(len(siparisler), len(musteri_idleri))\nsonuc = {}",
    ipucu: ["Beş ayrı sayım var; her birini ayrı bir ifadeyle hesaplayıp sonunda sözlüğe koy. Birkaçı küme işlemleriyle (üyelik, fark) kolayca çözülür.", "Müşteri ve ürün adlarını kümelere al: yetim_musteri, müşteri kümesinde olmayan müşteri numaralı siparişlerdir; siparissiz_musteri, müşteri kümesi eksi siparişteki müşterilerdir; satilmayan_urun, katalog eksi satılanlar (sorted ile liste). Boş indirim için None'a özgü denetimi kullan; 0 ile karıştırma.", "sonuc = {'bos_indirim': ____, 'tekrar_id': ____, 'yetim_musteri': ____, 'siparissiz_musteri': ____, 'satilmayan_urun': ____} ; musteri_idleri başlangıç kodunda hazır. Sayımları liste kapsamı ve len() ile, 'siparişsiz' ve 'satılmayan' gibi farkları küme çıkarmasıyla kur; gerekli diğer kümeleri (siparişteki müşteriler, katalog, satılanlar) kendin tanımla."],
    kontrol: function (s, v) { return sozluk(yd().degerOf(s), kalite(v), "Her anahtarı ayrı hesapla; None ile 0'ın farklı olduğunu unutma."); },
    varyant: function (v) { return ekle(v, ["S001", "2026-04-02", "M99", "Bursa", "Kamera", 1, 900.0, "", "kart", "hayır"]); } };

  /* ---- ders 12: sorgu planı ve indeks ---- */
  var VA12SQL = { id: "va2-12-sql", ders: "va2-12", tur: "sql", baslik: "SQL · indeks sonrası sorgu planı", veri: VA.veriSql,
    gorev: "`siparis` tablosunda `musteri_id` ile arama yapan sorgu tablonun tamamını tarar (SCAN). 1) `idx_siparis_musteri` adlı indeksi `siparis(musteri_id)` üzerinde oluştur (tekrar çalıştırmaya dayanıklı: IF NOT EXISTS). 2) EN SON ifade olarak `EXPLAIN QUERY PLAN SELECT * FROM siparis WHERE musteri_id = 'M01'` çalıştır. Plan çıktısında indeksin adı görünmeli.",
    baslangic: "-- önce indeks yokken planı gör:\nEXPLAIN QUERY PLAN SELECT * FROM siparis WHERE musteri_id = 'M01';",
    ipucu: ["İki adım sırayla çalışmalı: önce indeksi oluştur, sonra planı iste; plan istemek sorguyu çalıştırmaz, nasıl çalışacağını gösterir.", "CREATE INDEX IF NOT EXISTS ile tablo(sütun) üzerinde idx_siparis_musteri adlı indeksi aç; EXPLAIN QUERY PLAN SELECT ... son ifade olsun. Plan 'detail' sütununda SCAN yerine SEARCH ... USING INDEX görünmeli.", "CREATE INDEX IF NOT EXISTS idx_siparis_musteri ON ____(____); EXPLAIN QUERY PLAN SELECT * FROM siparis WHERE musteri_id = 'M01' ; boşluklara tablo ve sütun adını yaz."],
    kontrol: function (s, v) {
      /* Plan metninin biçimine bağlı kalma (SCAN/SEARCH ve indeks adı gevşek eşleşir), ama gerçek plan çıktısı şart: EXPLAIN QUERY PLAN
         "id/parent/(notused)/detail" sütunlarını verir; yalnız "detail" adlı sahte bir SELECT plan sayılmaz (sabit cevap). */
      var i = s.sutunlar.indexOf("detail");
      if (i < 0 || s.sutunlar.indexOf("parent") < 0 || s.sutunlar.length < 3) return { dogru: false, mesaj: "Sonuç bir sorgu planı değil (sütunlar: " + s.sutunlar.join(", ") + "). Son ifade EXPLAIN QUERY PLAN SELECT ... olmalı." };
      var d = s.satirlar.map(function (r) { return String(r[i]); }).join(" | ");
      var indeksli = /\bUSING\s+(COVERING\s+)?INDEX\s+idx_siparis_musteri\b/i.test(d);
      if (/\bSCAN\b/i.test(d) && !indeksli) return { dogru: false, mesaj: "Plan: " + d + ". Hâlâ tablo taranıyor (SCAN): indeks oluşturuldu mu ve ad doğru mu? CREATE INDEX, EXPLAIN'den ÖNCE çalışmalı." };
      var d2 = /\bSEARCH\b/i.test(d) && /\bsiparis\b/i.test(d) && indeksli && /musteri_id/i.test(d);
      return { dogru: d2, mesaj: d2 ? "Plan indeksi kullanıyor: " + d : "Plan: " + d + ". Beklenen: siparis üzerinde idx_siparis_musteri ile musteri_id aramasında SEARCH." };
    },
    varyant: function (v) { return ekle(v, ["S013", "2026-04-02", "M09", "Bursa", "Kamera", 1, 900.0, 0.0, "kart", "hayır"]); } };

  /* ---- ders 13: iş sorusunu sorguya çevirmek ---- */
  function enIyi(v) {
    var seg = {}, g = {}; yd().nesneler(v, "musteri").forEach(function (m) { seg[m.musteri_id] = m.segment; });
    say(v).forEach(function (o) { if (o.iade === "evet") return; g[o.musteri_id] = (g[o.musteri_id] || 0) + net(o); });
    return Object.keys(g).map(function (k) { return [k, seg[k], g[k]]; }).sort(function (a, b) { return b[2] - a[2]; }).slice(0, 3);
  }
  var VA13SQL = { id: "va2-13-sql", ders: "va2-13", tur: "sql", baslik: "SQL · 'en iyi müşteriler' sorusunu tanımla ve sorgula", veri: VA.veriSql,
    gorev: "İş sorusu belirsiz: 'En iyi 3 müşterimiz kim?'. Bu görevde TANIM verilmiştir: en iyi = iade EDİLMEMİŞ siparişlerin net cirosu (adet × birim_fiyat × (1 − indirim_orani); NULL indirim 0) en yüksek 3 müşteri. Sütunlar: `musteri_id`, `segment` (musteri tablosundan), `net_ciro`; net ciroya göre azalan sırada.",
    baslangic: "-- tanım: iade = 'hayır' siparişler; net ciro; müşteri başına topla; segment için musteri tablosu\nSELECT * FROM musteri;",
    ipucu: ["Tanım verilmiş; adımlar: iadeli siparişleri çıkar, müşteri başına net ciroyu topla, segmenti müşteri tablosundan getir, sırala ve üçte kes.", "siparis ile musteri'yi ortak musteri_id üzerinden JOIN et; iade koşulu satırları toplamdan önce eler (WHERE); müşteri başına toplam için GROUP BY (segment de gruba girer); boş indirim NULL'ı yedek değerle değiştiren işlevle 0 sayılır; sıralama ve ilk üçte kesme için ORDER BY ile LIMIT kullan, en yüksek ciro en üstte olmalı.", "SELECT s.musteri_id, m.segment, SUM(____) AS net_ciro FROM siparis s JOIN musteri m ON ____ WHERE s.iade = 'hayır' GROUP BY s.musteri_id, m.segment ORDER BY net_ciro ____ LIMIT 3 ; boşlukları net tutar ifadesi, birleştirme koşulu ve sıralama yönüyle doldur."],
    kontrol: function (s, v) { var d = s.sutunlar.length === 3; return d ? yd().satirlar(s.satirlar, enIyi(v), "İadeli siparişleri dışlayıp dışlamadığını, net cirenin indirimi içerdiğini ve sıralamayı kontrol et.", true) : { dogru: false, mesaj: "3 sütun (musteri_id, segment, net_ciro) bekleniyor; bulduğun: " + s.sutunlar.length + "." }; },
    varyant: function (v) { return degistir(v, "S010", "iade", "evet"); } };

  [VA8SQL, VA8PY, VA9SQL, VA10SQL, VA10PY, VA11SQL, VA11PY, VA12SQL, VA13SQL].forEach(function (a) { VA.alanlar.push(a); });
})();

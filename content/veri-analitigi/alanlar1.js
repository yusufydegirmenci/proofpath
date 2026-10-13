/* Veri Analitiği · Seviye 1 uygulama alanları (PP.alan tanımları): elektronik tablo dersleri için SQL/Python karşılıkları + kural tabanlı `sim` alanları.
   Yükleme sırası: seviye0.js, veri-ek.js (VA.yd, VA.veriKirli), alanlar.js, bu dosya.
   Elektronik tablo GERÇEKTEN çalıştırılmaz: `sim` alanları yalnız yazılan formül metnini ve sonucu kural tabanlı denetler.
   SQL/Python alanları "aynı işin SQL/Python karşılığı"dır. Kontrol işlevleri sabit cevap TUTMAZ; beklenen değer verilen veriden (v) hesaplanır.
   Çözümler tests/va-cozumler-s1.json içindedir. Veri SENTETİKTİR. */
(function () {
  var VA = (window.PP_VA = window.PP_VA || {});
  VA.alanlar = VA.alanlar || [];
  var yd = VA.yd;

  /* ---------- ortak yardımcılar ---------- */
  function net(r) { return r.adet * r.birim_fiyat * (1 - (r.indirim_orani || 0)); }
  function varsayilan(v) { return v && v.sutunlar ? v : VA.veri; }
  function yuvarla2(x) { return Math.round(x * 100) / 100; }
  function sutunHarfi(v, ad) { return String.fromCharCode(65 + v.sutunlar.indexOf(ad)); }
  function aralik(v, ad) { var h = sutunHarfi(v, ad); return h + "2:" + h + (v.satirlar.length + 1); }

  /* Tekrarsız satırlar (kayit_no'ya göre ilk görülen) ve adedi sayıya çevirme (kirli veri) */
  function tekilKirli(v) {
    var seen = {}, o = [];
    yd.nesneler(v).forEach(function (r) { if (!seen[r.kayit_no]) { seen[r.kayit_no] = 1; o.push(r); } });
    return o;
  }
  function adetSayi(a) { if (typeof a === "number") return a; var m = /\d+/.exec(String(a)); return m ? Number(m[0]) : 0; }
  function tekilAdetToplam(v) { return tekilKirli(v).reduce(function (t, r) { return t + adetSayi(r.adet); }, 0); }
  function kirliSayilar(v) {
    var o = yd.nesneler(v), ids = {}, bos = 0;
    o.forEach(function (r) { ids[r.kayit_no] = 1; if (r.fiyat === null) bos++; });
    return [o.length, Object.keys(ids).length, bos];
  }
  /* En çok tekrarlanan kayit_no (eşitlikte ilk görülen) ve sayısı */
  function enCokTekrar(v) {
    var o = yd.nesneler(v), c = {}, sira = [], en = null;
    o.forEach(function (r) { if (!c[r.kayit_no]) { c[r.kayit_no] = 0; sira.push(r.kayit_no); } c[r.kayit_no]++; });
    sira.forEach(function (k) { if (en === null || c[k] > c[en]) en = k; });
    return { id: en, sayi: c[en] };
  }
  function sehirNet(v) {
    var m = {}, sira = [];
    yd.nesneler(v).forEach(function (r) { if (!(r.sehir in m)) { m[r.sehir] = 0; sira.push(r.sehir); } m[r.sehir] += net(r); });
    return sira.map(function (k) { return [k, yuvarla2(m[k])]; });
  }
  function sehirNetBosHaric(v) {
    var m = {}, sira = [];
    yd.nesneler(v).forEach(function (r) { if (!(r.sehir in m)) { m[r.sehir] = 0; sira.push(r.sehir); } if (r.indirim_orani !== null) m[r.sehir] += net(r); });
    return sira.map(function (k) { return [k, yuvarla2(m[k])]; });
  }

  /* ---------- varyantlar (beklenen sonucu değiştirir; sabit değerli çözüm bu veride kalır) ---------- */
  function varyantAnkara(v) { var w = yd.kopya(v), i = yd.ix(w, "adet"), k = yd.ix(w, "siparis_id"); w.satirlar.forEach(function (r) { if (r[k] === "S002") r[i] = 3; }); return w; }
  function varyantKulaklik(v) { var w = yd.kopya(v), i = yd.ix(w, "adet"), k = yd.ix(w, "siparis_id"); w.satirlar.forEach(function (r) { if (r[k] === "S003") r[i] = 5; }); return w; }
  function varyantKirliAdet(v) {
    var w = yd.kopya(v), a = yd.ix(w, "adet"), k = yd.ix(w, "kayit_no");
    w.satirlar.forEach(function (r) { if (r[k] === "K03") r[a] = 6; if (r[k] === "K05") r[a] = "3 adet"; });
    w.satirlar.push(w.satirlar[0].slice()); /* K01 kopyası: tekil toplam değişmez, kopyayı sayan çözüm şaşar */
    return w;
  }
  function varyantKirliSayim(v) {
    var w = yd.kopya(v), f = yd.ix(w, "fiyat"), k = yd.ix(w, "kayit_no");
    w.satirlar.push(w.satirlar[0].slice()); /* ikinci kopya satır */
    w.satirlar.forEach(function (r) { if (r[k] === "K02") r[f] = ""; });
    return w;
  }
  function varyantKopya3(v) {
    var w = yd.kopya(v), k = yd.ix(w, "kayit_no"), s = null;
    w.satirlar.forEach(function (r) { if (r[k] === "K03") s = r.slice(); });
    w.satirlar.push(s.slice()); w.satirlar.push(s.slice());
    return w;
  }
  function varyantSehir(v) { var w = yd.kopya(v), i = yd.ix(w, "adet"), k = yd.ix(w, "siparis_id"); w.satirlar.forEach(function (r) { if (r[k] === "S006") r[i] = 2; }); return w; }
  function varyantKart(v) { var w = yd.kopya(v), i = yd.ix(w, "adet"), k = yd.ix(w, "siparis_id"); w.satirlar.forEach(function (r) { if (r[k] === "S012") r[i] = 4; }); return w; }

  /* ---------- sim (kural tabanlı formül denetimi) yardımcıları ---------- */
  var TR = { "İ": "i", "I": "i", "ı": "i", "ğ": "g", "Ğ": "g", "ş": "s", "Ş": "s", "ç": "c", "Ç": "c", "ö": "o", "Ö": "o", "ü": "u", "Ü": "u" };
  function norm(s) { return String(s).replace(/[İIığĞşŞçÇöÖüÜ]/g, function (c) { return TR[c]; }).toLowerCase(); }

  /* Girdiyi {formul, sonuc} olarak ayır: ilk satır formül + sonraki satırlar sonuç, ya da tek satırda → / -> / => / "sonuç" ayırıcısı */
  function ayir(girdi) {
    var t = String(girdi || "").trim();
    if (!t) return { hata: "Boş bıraktın. Formülünü '=' ile başlatıp yanına sonucu yaz (ör. formül → sonuç)." };
    if (t.charAt(0) !== "=") return { hata: "Formül '=' işaretiyle başlamalı." };
    var satirlar = t.split(/\r?\n/), formul, sonuc;
    if (satirlar.length > 1) { formul = satirlar[0]; sonuc = satirlar.slice(1).join(" "); }
    else {
      /* "sonuç" sözcüğü: \b Türkçe ç ile bozulduğu için sözcük sınırı elle denetlenir; tırnak içindeki eşleşme ayırıcı sayılmaz */
      var re = /(→|->|=>|sonu[çc]u?(?![\wçğıöşüÇĞİÖŞÜ]))/gi, m = null, e;
      while ((e = re.exec(t)) !== null) {
        var onceki = e.index ? t.charAt(e.index - 1) : "", tirnakSay = (t.slice(0, e.index).match(/["“”]/g) || []).length;
        if (tirnakSay % 2 === 0 && !(/^sonu/i.test(e[0]) && /[\wçğıöşüÇĞİÖŞÜ]/.test(onceki))) { m = e; break; }
      }
      if (!m || m.index < 2) return { hata: "Formülün yanına ya da altına sonucunu da yaz (ör. '=... → 12' ya da ikinci satıra 'sonuç: 12')." };
      formul = t.slice(0, m.index); sonuc = t.slice(m.index + m[0].length);
    }
    sonuc = sonuc.trim();
    if ((sonuc.match(/\d+(?:[.,]\d+)*/g) || []).length > 1) return { hata: "Sonuç kısmında birden çok sayı var; yalnız tek bir sayı yaz (formülün bulduğu sonuç)." };
    return { formul: formul.trim(), sonuc: sonuc };
  }
  /* Ölçüt tırnaklı olmalı: tırnaksız yazım (ör. K10) bir hücre başvurusudur, metin ölçüt değildir. Tırnaklıysa normalleştirilmiş iç metin, değilse null. */
  function tirnakIc(s) { var m = /^\s*["“”]([\s\S]*)["“”]\s*$/.exec(String(s)); return m ? norm(m[1]).trim() : null; }
  var TIRNAK_MESAJ = " Ölçüt çift tırnak içinde olmalı: tırnaksız yazılan ad (ör. K10) bir hücre başvurusu sayılır, metin ölçütü değil.";
  /* Sonuç metnindeki sayıları (Türkçe 1.234,5 ya da İngilizce 1,234.5 yazımı) aday değerler olarak çıkar */
  function sayilar(metin) {
    var out = [];
    (String(metin).match(/\d+(?:[.,]\d+)*/g) || []).forEach(function (tok) {
      out.push(Number(tok.replace(/\./g, "").replace(",", ".")));
      out.push(Number(tok.replace(/,/g, "")));
    });
    return out.filter(function (x) { return isFinite(x); });
  }
  function sonucVarMi(metin, bek) { return sayilar(metin).some(function (x) { return Math.abs(x - bek) < 0.005; }); }
  /* Formülün işlev adı ve bağımsız değişkenleri (tırnak içindeki ayırıcılar bölmez) */
  function formulCoz(f) {
    var g = f.replace(/\s+/g, " ").trim(), m = /^=\s*([A-Za-zÇĞİÖŞÜçğıöşü]+)\s*\(/.exec(g);
    if (!m) return null;
    var son = g.lastIndexOf(")");
    if (son < m[0].length) return null;
    var ic = g.slice(m[0].length, son), args = [], cur = "", q = false;
    for (var i = 0; i < ic.length; i++) {
      var c = ic.charAt(i);
      if (c === '"' || c === "“" || c === "”") q = !q;
      if ((c === ";" || c === ",") && !q) { args.push(cur.trim()); cur = ""; } else cur += c;
    }
    args.push(cur.trim());
    return { ad: norm(m[1]), args: args.map(function (a) { return a.replace(/\$/g, ""); }) };
  }
  function ayniAralik(a, b) { return norm(a).replace(/\s/g, "") === norm(b).replace(/\s/g, ""); }
  function simMesaj(ok, formulOk, formulMesaj, sonucMesaj) {
    if (ok && formulOk) return { dogru: true, mesaj: "Formül biçimi ve sonuç veriyle uyuşuyor (kural tabanlı denetim; formül gerçekten çalıştırılmadı)." };
    return { dogru: false, mesaj: formulOk ? sonucMesaj : formulMesaj + (ok ? "" : " " + sonucMesaj) };
  }

  /* ETOPLA/SUMIF(ürün aralığı; "Kulaklık"; adet aralığı) */
  var URUN = "Kulaklık";
  function bekKulaklik(v) { return yd.nesneler(v).reduce(function (t, r) { return t + (r.urun === URUN ? r.adet : 0); }, 0); }
  function kontrolEtopla(s, v) {
    v = varsayilan(v);
    var a = ayir(s.girdi); if (a.hata) return { dogru: false, mesaj: a.hata };
    var f = formulCoz(a.formul), bek = bekKulaklik(v), ok = true, fm = "";
    if (!f || (f.ad !== "sumif" && f.ad !== "etopla")) { ok = false; fm = "Koşullu toplam için ETOPLA (SUMIF) kullanmalısın."; }
    else if (f.args.length !== 3) { ok = false; fm = "ETOPLA üç bağımsız değişken ister: ölçüt aralığı, ölçüt, toplam aralığı."; }
    else if (!ayniAralik(f.args[0], aralik(v, "urun"))) { ok = false; fm = "Ölçüt aralığı ürün sütununun tüm veri satırlarını kapsamalı (başlık hariç)."; }
    else if (tirnakIc(f.args[1]) === null) { ok = false; fm = "Ölçüt tırnaklı olmalı." + TIRNAK_MESAJ; }
    else if (tirnakIc(f.args[1]) !== norm(URUN)) { ok = false; fm = "Ölçütü tırnak içinde, soruda geçen ürün adıyla yaz."; }
    else if (!ayniAralik(f.args[2], aralik(v, "adet"))) { ok = false; fm = "Toplam aralığı adet sütununun tüm veri satırları olmalı."; }
    return simMesaj(sonucVarMi(a.sonuc, bek), ok, fm, "Yazdığın sonuç verideki ürün adedi toplamıyla uyuşmuyor; satırları tek tek say.");
  }

  /* ÇOKETOPLA/SUMIFS(adet; şehir aralığı; "İstanbul"; ödeme aralığı; "kart") */
  var SEHIR = "İstanbul", ODEME = "kart";
  function bekKart(v) { return yd.nesneler(v).reduce(function (t, r) { return t + (r.sehir === SEHIR && r.odeme_turu === ODEME ? r.adet : 0); }, 0); }
  function kontrolCoketopla(s, v) {
    v = varsayilan(v);
    var a = ayir(s.girdi); if (a.hata) return { dogru: false, mesaj: a.hata };
    var f = formulCoz(a.formul), bek = bekKart(v), ok = true, fm = "";
    if (!f || (f.ad !== "sumifs" && f.ad !== "coketopla")) { ok = false; fm = "Birden çok ölçüt için ÇOKETOPLA (SUMIFS) kullanmalısın."; }
    else if (f.args.length !== 5) { ok = false; fm = "İki ölçüt için beş bağımsız değişken gerekir: toplam aralığı + (aralık, ölçüt) × 2."; }
    else if (!ayniAralik(f.args[0], aralik(v, "adet"))) { ok = false; fm = "ÇOKETOPLA'da ilk bağımsız değişken toplanacak (adet) aralığıdır; tüm veri satırlarını kapsamalı."; }
    else {
      var cift = [[f.args[1], f.args[2]], [f.args[3], f.args[4]]];
      var sehirOk = cift.some(function (c) { return ayniAralik(c[0], aralik(v, "sehir")) && tirnakIc(c[1]) === norm(SEHIR); });
      var odemeOk = cift.some(function (c) { return ayniAralik(c[0], aralik(v, "odeme_turu")) && tirnakIc(c[1]) === norm(ODEME); });
      var tirnaksizVar = cift.some(function (c) { return tirnakIc(c[1]) === null; });
      if (tirnaksizVar) { ok = false; fm = "Ölçüt tırnaklı olmalı." + TIRNAK_MESAJ; }
      else if (!sehirOk) { ok = false; fm = "Şehir ölçütü eksik ya da yanlış: şehir sütununun tüm aralığı ve tırnak içinde şehir adı."; }
      else if (!odemeOk) { ok = false; fm = "Ödeme türü ölçütü eksik ya da yanlış: ödeme sütununun tüm aralığı ve tırnak içinde değer."; }
    }
    return simMesaj(sonucVarMi(a.sonuc, bek), ok, fm, "Yazdığın sonuç iki koşulu birlikte sağlayan satırların adet toplamıyla uyuşmuyor.");
  }

  /* EĞERSAY/COUNTIF(kayit_no aralığı; en çok tekrarlanan kayit_no) */
  function kontrolEgersay(s, v) {
    v = varsayilan(v);
    var a = ayir(s.girdi); if (a.hata) return { dogru: false, mesaj: a.hata };
    var f = formulCoz(a.formul), t = enCokTekrar(v), ok = true, fm = "";
    if (!f || (f.ad !== "countif" && f.ad !== "egersay")) { ok = false; fm = "Bir değerin kaç kez geçtiğini saymak için EĞERSAY (COUNTIF) kullanmalısın."; }
    else if (f.args.length !== 2) { ok = false; fm = "EĞERSAY iki bağımsız değişken ister: aralık ve ölçüt."; }
    else if (!ayniAralik(f.args[0], aralik(v, "kayit_no"))) { ok = false; fm = "Aralık kayit_no sütununun tüm veri satırları olmalı (başlık hariç)."; }
    else if (tirnakIc(f.args[1]) === null) { ok = false; fm = "Ölçüt tırnaklı olmalı." + TIRNAK_MESAJ; }
    else if (tirnakIc(f.args[1]) !== norm(t.id)) { ok = false; fm = "Ölçüt, tabloda birden fazla geçen kayıt numarası olmalı (tırnak içinde); tabloya bakıp hangisi olduğunu bul."; }
    return simMesaj(sonucVarMi(a.sonuc, t.sayi), ok, fm, "Yazdığın sayı o kaydın tabloda kaç kez geçtiğiyle uyuşmuyor.");
  }

  /* ---------- Alanlar ---------- */
  VA.alanlar.push(
    { id: "va1-1-py", ders: "va1-1", tur: "python", baslik: "İsteğe bağlı · Python · ETOPLA'nın karşılığı (Ankara net ciro)",
      gorev: "İsteğe bağlı: aynı işin SQL/Python karşılığı (Seviye 2/4'te öğrenilen araçların ön izlemesi; zorunlu değil, elektronik tablo çözümü esastır). Aynı işin Python karşılığı (elektronik tablo ETOPLA/EĞERSAY mantığı): `siparisler` sözlük listesidir. Şehri 'Ankara' olan siparişlerin NET ciro toplamını (adet × birim_fiyat × (1 − indirim_orani)) `sonuc`a ata. indirim_orani boşsa (None) 0 say; bu bir varsayımdır.",
      baslangic: "# siparisler: sözlük listesi; sutunlar: sütun adları\nprint(sutunlar)\nprint(siparisler[0])\nsonuc = None",
      ipucu: ["ETOPLA'nın Python karşılığı: önce ölçüte uyan siparişleri seç (şehir), sonra her birinin net tutarını toplama ekle.", "Ölçüt s['sehir'] == 'Ankara'; net tutar adet * birim_fiyat * (1 - indirim). Boş indirim None gelir ve None ile aritmetik yapılamaz; 'boşsa yerine 0 al' diyen bir Python ifadesiyle onu 0'a çevirmelisin.", "sonuc = sum(s['adet'] * s['birim_fiyat'] * (1 - (____)) for s in siparisler if s['sehir'] == 'Ankara') ; boşluğa None'ı 0'a çeviren ifadeyi yaz."],
      kontrol: function (s, v) {
        var o = yd.nesneler(v).filter(function (r) { return r.sehir === "Ankara"; }), bek = o.reduce(function (t, r) { return t + net(r); }, 0);
        var bulunan = yd.degerOf(s), brut = o.reduce(function (t, r) { return t + r.adet * r.birim_fiyat; }, 0);
        var r1 = yd.sayi(bulunan, bek, "Yalnız Ankara satırlarını toplamalı ve indirimi uygulamalısın.");
        if (!r1.dogru && yd.yakin(bulunan, brut)) r1.mesaj += " İndirim uygulanmamış görünüyor.";
        return r1;
      }, varyant: varyantAnkara },
    { id: "va1-1-sim", ders: "va1-1", tur: "sim", baslik: "Simülasyon · ETOPLA formülü (ürün adedi)",
      gorev: "SİMÜLASYON (elektronik tablo çalıştırılmaz; yazdığın formül kural tabanlı denetlenir). Tablo A1'den başlar: A siparis_id, B tarih, C musteri_id, D sehir, E urun, F adet, G birim_fiyat, H indirim_orani, I odeme_turu, J iade; veri 2. satırdan son satıra kadar. 'Kulaklık' ürününün toplam adedini hesaplayan ETOPLA (SUMIF) formülünü yaz; yanına bulduğun sayıyı da yaz (ör. formül → sonuç).",
      baslangic: "=", ipucu: ["Koşula uyan satırların adetlerini toplayacaksın: tek ölçütlü koşullu toplam işlevini ara, düz TOPLA ya da EĞERSAY değil.", "ETOPLA(ölçüt_aralığı; ölçüt; toplam_aralığı): ölçüt aralığı ürün sütunu (E), toplam aralığı adet sütunu (F); başlık satırını aralığa alma, ayırıcı ',' ya da ';' olabilir.", "=ETOPLA(E2:E13; ____ ; F2:F13) → ____ ; boşluğa ölçütü tırnak içinde yaz, sonucu da Kulaklık satırlarının adetlerini elle toplayarak doğrula."],
      kontrol: kontrolEtopla, varyant: varyantKulaklik },
    { id: "va1-2-py", ders: "va1-2", tur: "python", baslik: "İsteğe bağlı · Python · temizleme: tekrarsız adet toplamı", veri: VA.veriKirli,
      gorev: "İsteğe bağlı: aynı işin SQL/Python karşılığı (Seviye 2/4'te öğrenilen araçların ön izlemesi; zorunlu değil, elektronik tablo çözümü esastır). Aynı işin Python karşılığı (temizleme; kirli veri): `siparisler` sözlük listesidir (sütunlar: kayit_no, tarih, sehir, urun, adet, fiyat, odeme). Kopya (aynı kayit_no) satırları bir kez say ve 'adet' sütunundaki metin sayıları ('2 adet' gibi) sayıya çevirerek toplam adedi `sonuc`a ata. Yaptığın iki dönüşümü kod yorumuyla açıkla (ne yaptın, neden).",
      baslangic: "# Temizleme: önce neyi düzelteceğini yorum satırlarıyla yaz\nfor s in siparisler:\n    print(s['kayit_no'], repr(s['adet']))\nsonuc = None",
      ipucu: ["İki ayrı temizlik var: tekrar eden kaydı bir kez saymak ve metin biçimindeki adedi sayıya çevirmek; kayit_no ilkinin anahtarıdır.", "Görülen kayit_no'ları bir kümede (set) tut, ikinci kez görünce continue ile atla. Adet bazen int bazen '2 adet' gibi metindir: isinstance(a, str) ile ayırıp ilk sözcüğü int()'e çevir.", "seen = set(); toplam = 0; for s in siparisler: kayıt görüldüyse continue; seen.add(...); a = s['adet']; if isinstance(a, str): a = ____ ; toplam += a. Sonra sonuc = toplam; her iki dönüşüme '# ...' yorumu yaz."],
      kontrol: function (s, v) {
        var bek = tekilAdetToplam(v), bulunan = yd.degerOf(s);
        var r1 = yd.sayi(bulunan, bek, "Kopya satırı bir kez saymalı ve metin adetleri sayıya çevirmelisin.");
        if (!r1.dogru && yd.yakin(bulunan, bek + (function () { var seen = {}, f = 0; yd.nesneler(v).forEach(function (r) { if (seen[r.kayit_no]) f += adetSayi(r.adet); seen[r.kayit_no] = 1; }); return f; })())) r1.mesaj += " Kopya satır birden fazla sayılmış olabilir.";
        return r1;
      }, varyant: varyantKirliAdet },
    { id: "va1-2-sql", ders: "va1-2", tur: "sql", baslik: "İsteğe bağlı · SQL · temizleme: tekrar ve boş değer sayımı", veri: VA.veriKirli,
      gorev: "İsteğe bağlı: aynı işin SQL/Python karşılığı (Seviye 2/4'te öğrenilen araçların ön izlemesi; zorunlu değil, elektronik tablo çözümü esastır). Aynı işin SQL karşılığı (kirli veri; tablo `siparis`). Tek satırda üç sayı döndür, bu sırayla: (1) toplam satır sayısı, (2) benzersiz kayit_no sayısı, (3) fiyatı boş (NULL) olan satır sayısı. İlk iki sayının farkı kopya satır sayısını gösterir.",
      baslangic: "-- siparis: kayit_no, tarih, sehir, urun, adet, fiyat, odeme (kirli veri)\nSELECT * FROM siparis;",
      ipucu: ["Tek satırda üç sayı istiyor: tüm satırlar, benzersiz kayıtlar ve boş fiyatlar; ilk ikisinin farkı kopya sayısını verir.", "COUNT(*) tüm satırları sayar; benzersizler için COUNT içinde tekrarları eleyen bir sözcük gerekir. Boş fiyat NULL'dır ve COUNT(sütun) NULL hücreleri atlar; bu farktan ya da NULL denetiminden yararlanıp boş fiyatları sayabilirsin.", "SELECT COUNT(*), COUNT(____ kayit_no), ____ FROM siparis; ilk boşluk tekrarları eleyen sözcük, ikinci boşluk fiyatı NULL olan satırları sayan ifade olmalı."],
      kontrol: function (s, v) {
        var bek = kirliSayilar(v), r = s.satirlar.length === 1 && s.sutunlar.length === 3 ? s.satirlar[0] : null;
        if (!r) return { dogru: false, mesaj: "Tek satır, üç sütun döndürmelisin. Şu an " + s.satirlar.length + " satır, " + s.sutunlar.length + " sütun var." };
        var ad = ["toplam satır", "benzersiz kayit_no", "boş fiyat"], yanlis = [];
        bek.forEach(function (b, i) { if (r[i] !== b) yanlis.push((i + 1) + ". değer (" + ad[i] + ") = " + yd.gosterim(r[i])); });
        return yanlis.length ? { dogru: false, mesaj: "Uyuşmayan: " + yanlis.join("; ") + ". Sırayı ve NULL/DISTINCT kullanımını kontrol et." } : { dogru: true, mesaj: "Üç sayı veriyle uyuşuyor." };
      }, varyant: varyantKirliSayim },
    { id: "va1-2-sim", ders: "va1-2", tur: "sim", baslik: "Simülasyon · kopya kaydı EĞERSAY ile bulma", veri: VA.veriKirli,
      gorev: "SİMÜLASYON (elektronik tablo çalıştırılmaz; formül metni kural tabanlı denetlenir). Kirli tablo A1'den başlar: A kayit_no, B tarih, C sehir, D urun, E adet, F fiyat, G odeme; veri 2. satırdan son satıra kadar. Tabloya bakıp hangi kayit_no'nun birden fazla geçtiğini bul; EĞERSAY (COUNTIF) ile o kaydın kaç kez geçtiğini hesaplayan formülü ve sonucunu yaz (ör. formül → sonuç). Bu, temizlemeden önce kopyayı kanıtlama adımıdır.",
      baslangic: "=", ipucu: ["Önce tabloya bakıp hangi kayıt numarasının iki kez yazıldığını gözle bul; sonra o numarayı sayan bir formül kur.", "EĞERSAY(aralık; ölçüt): aralık, kayit_no sütununun A2'den son veri satırına kadar olan kısmıdır (kopya satır da dahil); ölçüt tırnak içinde kayıt numarasıdır.", "=EĞERSAY(A2:A14; \"____\") → ____ ; boşluklara kopya olan kayıt numarasını ve formülün bulduğu sayıyı yaz (1'den büyük çıkmalı)."],
      kontrol: kontrolEgersay, varyant: varyantKopya3 },
    { id: "va1-3-sql", ders: "va1-3", tur: "sql", baslik: "İsteğe bağlı · SQL · özet tablonun karşılığı (şehir bazında net ciro)",
      gorev: "İsteğe bağlı: aynı işin SQL/Python karşılığı (Seviye 2/4'te öğrenilen araçların ön izlemesi; zorunlu değil, elektronik tablo çözümü esastır). Aynı işin SQL karşılığı (özet tablo = GROUP BY). Tablo `siparis`. Her şehir için NET ciro toplamını döndür: iki sütun (sehir, net_ciro); net ciro = adet × birim_fiyat × (1 − indirim_orani). Boş (NULL) indirimi 0 say (varsayım). net_ciro'yu 2 ondalığa yuvarla.",
      baslangic: "-- siparis: siparis_id, tarih, musteri_id, sehir, urun, adet, birim_fiyat, indirim_orani, odeme_turu, iade\nSELECT sehir, COUNT(*) FROM siparis GROUP BY sehir;",
      ipucu: ["Özet tablonun SQL karşılığı gruplamadır: her şehir için tek satır ve yanında o şehrin net ciro toplamı.", "GROUP BY sehir her şehre tek satır verir. Net tutar adet * birim_fiyat * (1 - indirim) olur; ama NULL ile çarpım NULL verir ve boş indirimli satır toplamdan düşer, bu yüzden NULL'ı yedek bir değerle değiştiren SQL işlevinden yararlan.", "SELECT sehir, ROUND(SUM(adet * birim_fiyat * (1 - ____(indirim_orani, 0))), 2) AS net_ciro FROM siparis GROUP BY sehir; boşluğa boş indirimi 0'a çeviren işlevin adını yaz."],
      kontrol: function (s, v) {
        var bek = sehirNet(v);
        if (s.sutunlar.length !== 2) return { dogru: false, mesaj: "İki sütun (sehir, net_ciro) döndürmelisin; şu an " + s.sutunlar.length + "." };
        var bul = s.satirlar.map(function (r) { return [r[0], typeof r[1] === "number" ? yuvarla2(r[1]) : r[1]]; });
        var d = yd.ayniSatirlar(bul, bek);
        if (d) return { dogru: true, mesaj: "Şehir bazında net ciro veriyle uyuşuyor." };
        var m = "Bulduğun: " + yd.gosterim(bul) + ". Her şehir tek satır olmalı ve net ciro indirimi uygulamalı.";
        if (yd.ayniSatirlar(bul, sehirNetBosHaric(v))) m += " Boş indirimli satır toplamdan düşmüş görünüyor: NULL ile çarpım NULL olur.";
        return { dogru: false, mesaj: m };
      }, varyant: varyantSehir },
    { id: "va1-3-sim", ders: "va1-3", tur: "sim", baslik: "Simülasyon · ÇOKETOPLA formülü (şehir + ödeme)",
      gorev: "SİMÜLASYON (elektronik tablo çalıştırılmaz; formül metni kural tabanlı denetlenir). Tablo A1'den başlar: A siparis_id, B tarih, C musteri_id, D sehir, E urun, F adet, G birim_fiyat, H indirim_orani, I odeme_turu, J iade; veri 2. satırdan son satıra kadar. Şehri 'İstanbul' VE ödeme türü 'kart' olan siparişlerin toplam adedini hesaplayan ÇOKETOPLA (SUMIFS) formülünü yaz; yanına sonucu da yaz (ör. formül → sonuç).",
      baslangic: "=", ipucu: ["İki koşulun birlikte sağlanması gerekiyor (şehir VE ödeme türü); tek ölçütlü ETOPLA yetmez, çok ölçütlü sürümünü kullan.", "ÇOKETOPLA(toplam_aralığı; ölçüt_aralığı1; ölçüt1; ölçüt_aralığı2; ölçüt2): toplanacak adet sütunu (F) ilk gelir, şehir sütunu D, ödeme sütunu I; başlıksız aralıklar 2. satırdan başlar.", "=ÇOKETOPLA(F2:F13; D2:D13; \"____\"; I2:I13; \"____\") → ____ ; boşlukları şehir adı, ödeme türü ve bulduğun sayıyla doldur."],
      kontrol: kontrolCoketopla, varyant: varyantKart }
  );
})();

"use strict";
/* ---- PP.senaryo: ders sonu İngilizce iş senaryosu (W1) — saf mantık + yerel kayıt ----
   Kart: gerçekçi İngilizce belge (ticket, bug raporu, Slack mesajı…) + kısa İngilizce yanıt görevi. Sunucusuz, yapay zekâsız.
   Denetim yalnız YAPIYI (şablon alanları, asgari uzunluk) ve ANAHTAR KAVRAMI (mustMention, eş anlamlılarla) sayar; anlamı, doğruluğu ve dilbilgisini DEĞERLENDİRMEZ.
   Sonuç kapı, not, mini sınav ya da ustalık SAYILMAZ (SAYILIR hepsi false): denemeler/kanıtlar listesine hiçbir şey yazılmaz.
   Cevaplar yalnız ya_pp_ogr.tercih.senaryo içinde (yeni anahtar yok): {id: {c:{alan:metin}, t:tarih, g:1 gönderildi, k:[0|1…] öz-karşılaştırma, x:1 dışa aktarmada gizli}}.
   Model cevap ve anahtarlar istemcidedir (SECURITY P2-1): bu yüzden kart hiçbir yerde kanıt kapısı değildir.
   Veri: window.PP_SENARYO (content/senaryo/*.js). */
(function (g) {
  var PP = g.PP = g.PP || {}, TERCIH = "senaryo", ALAN_MAKS = 1200;
  var SAYILIR = { kapi: false, not: false, ustalik: false, kanit: false };

  /* Şablonlar: alanlar [anahtar, başlık]; asgari = tüm alanlarda toplam kelime, alanBasi = bir alandaki asgari kelime */
  var SABLONLAR = {
    bug: { ad: "Bug / olay raporu", alanlar: [["problem", "Problem"], ["cause", "Cause"], ["fix", "Fix"], ["verified", "How I verified"], ["next", "Next steps"]], asgari: 45, alanBasi: 3 },
    yanit: { ad: "Müşteriye / ekibe yanıt", alanlar: [["reply", "Reply"]], asgari: 40, alanBasi: 40 },
    inceleme: { ad: "İnceleme yorumu", alanlar: [["observation", "Observation"], ["why", "Why it matters"], ["suggestion", "Suggestion"]], asgari: 35, alanBasi: 5 },
    soru: { ad: "Açıklayıcı soru", alanlar: [["questions", "Clarifying questions"], ["meanwhile", "What I can do meanwhile"]], asgari: 30, alanBasi: 8 }
  };
  var TURLER = { ticket: "Destek talebi", bug: "Bug raporu", slack: "Slack mesajı", eposta: "Müşteri e-postası", olay: "Olay notu", pr: "PR yorumu" };

  function kelimeSay(s) { var m = String(s == null ? "" : s).match(/[A-Za-z0-9ÇĞİÖŞÜçğıöşü][A-Za-z0-9ÇĞİÖŞÜçğıöşü'’.\-\/]*/g); return m ? m.length : 0; }
  /* Arama biçimi: küçük harf, noktalama (tire, eğik çizgi dahil) boşluk olur: "root-cause" = "root cause"; "*" yalnız önek işareti olarak kalır */
  function duz(s) { return String(s == null ? "" : s).toLowerCase().replace(/[’`]/g, "'").replace(/[^a-z0-9ğüşöçı'*]+/g, " ").replace(/\s+/g, " ").trim(); }

  /* ---------- Veri ---------- */
  var kayit = {};
  function tanimla(k) {
    if (!k || typeof k !== "object") return { ok: false, neden: "tanim-yok" };
    if (typeof k.id !== "string" || !/^sn-[a-z0-9-]+$/.test(k.id)) return { ok: false, neden: "id-gecersiz" };
    if (typeof k.yol !== "string" || !k.yol) return { ok: false, neden: "yol-yok" };
    if (typeof k.ders !== "string" || !/^[a-z0-9]+-\d+$/.test(k.ders)) return { ok: false, neden: "ders-gecersiz" };
    if (typeof k.baslik !== "string" || !k.baslik) return { ok: false, neden: "baslik-yok" };
    var sb = SABLONLAR[k.sablon];
    if (!sb) return { ok: false, neden: "sablon-bilinmiyor" };
    var b = k.belge;
    if (!b || !TURLER[b.tur] || typeof b.konu !== "string" || !b.konu || typeof b.kimden !== "string" || !b.kimden || typeof b.metin !== "string") return { ok: false, neden: "belge-gecersiz" };
    var kw = kelimeSay(b.metin);
    if (kw < 80 || kw > 180) return { ok: false, neden: "belge-uzunluk", kelime: kw };
    if (typeof k.gorev !== "string" || kelimeSay(k.gorev) < 6) return { ok: false, neden: "gorev-yok" };
    if (typeof k.ipucuTr !== "string" || !k.ipucuTr) return { ok: false, neden: "ipucu-yok" };
    if (!Array.isArray(k.sozluk) || k.sozluk.length < 6 || k.sozluk.length > 10 || k.sozluk.some(function (x) { return !Array.isArray(x) || typeof x[0] !== "string" || typeof x[1] !== "string" || !x[0] || !x[1]; })) return { ok: false, neden: "sozluk-gecersiz" };
    if (!Array.isArray(k.kaliplar) || k.kaliplar.length < 3 || k.kaliplar.some(function (x) { return typeof x !== "string" || !x; })) return { ok: false, neden: "kalip-gecersiz" };
    if (!Array.isArray(k.mustMention) || k.mustMention.length < 3 || k.mustMention.some(function (m) { return !m || typeof m.ad !== "string" || !m.ad || !Array.isArray(m.es) || !m.es.length || m.es.some(function (e) { return typeof e !== "string" || !duz(e); }); })) return { ok: false, neden: "anahtar-gecersiz" };
    if (!Array.isArray(k.kontrol) || k.kontrol.length < 5 || k.kontrol.length > 6 || k.kontrol.some(function (x) { return typeof x !== "string" || !x; })) return { ok: false, neden: "kontrol-gecersiz" };
    if (!k.ornek || typeof k.ornek !== "object" || sb.alanlar.some(function (a) { return typeof k.ornek[a[0]] !== "string" || kelimeSay(k.ornek[a[0]]) < 1; })) return { ok: false, neden: "ornek-eksik" };
    var x = { id: k.id, yol: k.yol, ders: k.ders, baslik: k.baslik, sablon: k.sablon, belge: { tur: b.tur, konu: b.konu, kimden: b.kimden, metin: b.metin }, gorev: k.gorev, ipucuTr: k.ipucuTr,
      sozluk: k.sozluk.map(function (s) { return [s[0], s[1]]; }), kaliplar: k.kaliplar.slice(), mustMention: k.mustMention.map(function (m) { return { ad: m.ad, es: m.es.slice() }; }), kontrol: k.kontrol.slice(), ornek: {} };
    sb.alanlar.forEach(function (a) { x.ornek[a[0]] = k.ornek[a[0]]; });
    kayit[x.id] = x;
    return { ok: true, kart: x };
  }
  function yukle() { (Array.isArray(g.PP_SENARYO) ? g.PP_SENARYO : []).forEach(function (k) { if (!kayit[k && k.id]) tanimla(k); }); }
  function bul(id) { yukle(); return kayit[id] || null; }
  function hepsi() { yukle(); return Object.keys(kayit).map(function (k) { return kayit[k]; }); }
  function dersIcin(ders) { return hepsi().filter(function (k) { return k.ders === ders; })[0] || null; }
  function sablon(k) { return SABLONLAR[k.sablon]; }

  /* ---------- Denetimler (anlam değerlendirilmez) ---------- */
  function cevapDuz(k, cevap) { var o = {}; sablon(k).alanlar.forEach(function (a) { o[a[0]] = cevap && typeof cevap[a[0]] === "string" ? cevap[a[0]] : ""; }); return o; }
  function yapiDenetimi(k, cevap) {
    var sb = sablon(k), c = cevapDuz(k, cevap), alanlar = {}, toplam = 0, eksik = [];
    sb.alanlar.forEach(function (a) {
      var n = kelimeSay(c[a[0]]), tamam = n >= sb.alanBasi;
      alanlar[a[0]] = { baslik: a[1], kelime: n, tamam: tamam }; toplam += n;
      if (!tamam) eksik.push(a[1]);
    });
    var yeter = toplam >= sb.asgari;
    return { ok: !eksik.length && yeter, alanlar: alanlar, toplam: toplam, asgari: sb.asgari, alanBasi: sb.alanBasi, eksik: eksik, yeter: yeter };
  }
  /* "verif*" öneki, diğerleri tam kelime/öbek; sayı ve kodlar (404, 5xx) olduğu gibi aranır */
  function eslesir(metin, e) {
    var p = duz(e), onek = /\*$/.test(p);
    if (onek) p = p.slice(0, -1);
    if (!p) return false;
    var m = " " + metin + " ";
    return onek ? m.indexOf(" " + p) >= 0 : m.indexOf(" " + p + " ") >= 0;
  }
  function kavramDenetimi(k, cevap) {
    var c = cevapDuz(k, cevap), t = duz(sablon(k).alanlar.map(function (a) { return c[a[0]]; }).join(" ")), bulunan = [], eksik = [];
    k.mustMention.forEach(function (m) { (m.es.some(function (e) { return eslesir(t, e); }) ? bulunan : eksik).push(m.ad); });
    return { bulunan: bulunan, eksik: eksik, oran: k.mustMention.length ? bulunan.length / k.mustMention.length : 0, toplam: k.mustMention.length };
  }

  /* ---------- Yerel kayıt ---------- */
  function ogr() { return g.PP && g.PP.ogr ? g.PP.ogr : null; }
  function haritaOku() { var t = null, O = ogr(); try { t = O && O.depo ? O.depo.tercih(TERCIH) : null; } catch (e) { t = null; } return t && typeof t === "object" && !Array.isArray(t) ? t : {}; }
  function haritaYaz(m) { var O = ogr(); try { return !!(O && O.depo && O.depo.tercih(TERCIH, m)); } catch (e) { return false; } }
  function bugun() { try { return ogr().gun.bugun(); } catch (e) { return ""; } }
  function oku(id) {
    var e = haritaOku()[id], k = bul(id);
    if (!k || !e || typeof e !== "object") return { c: k ? cevapDuz(k, {}) : {}, t: null, g: 0, k: [], x: 0 };
    return { c: cevapDuz(k, e.c), t: typeof e.t === "string" ? e.t : null, g: e.g ? 1 : 0, k: Array.isArray(e.k) ? e.k.map(function (v) { return v ? 1 : 0; }) : [], x: e.x ? 1 : 0 };
  }
  function guncelle(id, f) {
    var k = bul(id); if (!k) return { ok: false, neden: "bilinmeyen-kart" };
    var m = haritaOku(), e = oku(id); f(e); m[id] = e;
    return haritaYaz(m) ? { ok: true, kayit: e } : { ok: false, neden: "yazilamadi" };
  }
  function kirp(k, cevap) { var c = cevapDuz(k, cevap); Object.keys(c).forEach(function (a) { c[a] = c[a].slice(0, ALAN_MAKS); }); return c; }
  /* Taslak: gönderilmiş durumu değiştirmez */
  function taslak(id, cevap) { var k = bul(id); if (!k) return { ok: false, neden: "bilinmeyen-kart" }; return guncelle(id, function (e) { e.c = kirp(k, cevap); }); }
  /* Gönder: yapı boşsa da kaydedilir mi? Hayır: tamamen boş cevap gönderilemez */
  function gonder(id, cevap) {
    var k = bul(id); if (!k) return { ok: false, neden: "bilinmeyen-kart" };
    var c = kirp(k, cevap);
    if (!sablon(k).alanlar.some(function (a) { return kelimeSay(c[a[0]]) > 0; })) return { ok: false, neden: "bos-cevap" };
    var r = guncelle(id, function (e) { e.c = c; e.g = 1; e.t = bugun(); e.k = []; });
    if (!r.ok) return r;
    return { ok: true, yapi: yapiDenetimi(k, c), kavram: kavramDenetimi(k, c), ornek: k.ornek, kayit: r.kayit };
  }
  function yenidenYaz(id) { return guncelle(id, function (e) { e.g = 0; e.k = []; }); }
  function kontrolIsaretle(id, i, deger) {
    var k = bul(id); if (!k || !(i >= 0 && i < k.kontrol.length)) return { ok: false, neden: "gecersiz-madde" };
    return guncelle(id, function (e) { var a = []; for (var j = 0; j < k.kontrol.length; j++) a.push(e.k[j] ? 1 : 0); a[i] = deger ? 1 : 0; e.k = a; });
  }
  function gizle(id, gizli) { return guncelle(id, function (e) { e.x = gizli ? 1 : 0; }); }

  /* Portföy kayıtları: yalnız gönderilmiş cevaplar. Özel not, ders notu ve kullanıcı kimliği yok. */
  function portfoyKayitlari() {
    var m = haritaOku(), out = [];
    hepsi().forEach(function (k) {
      var e = m[k.id]; if (!e || !e.g) return;
      var d = oku(k.id), sb = sablon(k), yapi = yapiDenetimi(k, d.c), kv = kavramDenetimi(k, d.c);
      out.push({ id: k.id, ders: k.ders, yol: k.yol, baslik: k.baslik, belgeKonu: k.belge.konu, sablon: sb.ad, tarih: d.t, kelime: yapi.toplam, yapiTamam: yapi.ok,
        kavram: kv.bulunan.length + "/" + kv.toplam, kontrolOz: d.k.filter(Boolean).length + "/" + k.kontrol.length, gizli: !!d.x,
        metin: sb.alanlar.map(function (a) { return sb.alanlar.length > 1 ? a[1] + ": " + d.c[a[0]] : d.c[a[0]]; }).join("\n") });
    });
    return out.sort(function (a, b) { return String(a.tarih).localeCompare(String(b.tarih)) || (a.id < b.id ? -1 : 1); });
  }

  PP.senaryo = { SAYILIR: SAYILIR, SABLONLAR: SABLONLAR, TURLER: TURLER, ALAN_MAKS: ALAN_MAKS, kelimeSay: kelimeSay, tanimla: tanimla, bul: bul, hepsi: hepsi, dersIcin: dersIcin, sablon: sablon,
    yapiDenetimi: yapiDenetimi, kavramDenetimi: kavramDenetimi, oku: oku, taslak: taslak, gonder: gonder, yenidenYaz: yenidenYaz, kontrolIsaretle: kontrolIsaretle, gizle: gizle, portfoyKayitlari: portfoyKayitlari };
})(typeof window !== "undefined" ? window : globalThis);

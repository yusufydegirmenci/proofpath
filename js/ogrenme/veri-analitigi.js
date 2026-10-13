"use strict";
/* ---- Veri Analitiği yolu (Faz 10 tur 1: Seviye 0) — doğrulama, değerlendirme, telafi, ilerleme ----
   Veri/içerik: content/veri-analitigi/*.js (PP_VA). Kayıt: ya_pp_ogr.tercih.va (ders okundu, lab görevleri, sınav denemeleri) + lab kanıtları (tur "lab").
   Tüm doğrulamalar istemcide ve kural tabanlıdır (simülasyon); bağımsızlık ya da ustalık kanıtı DEĞİLDİR. */
(function (g) {
  var PP = g.PP = g.PP || {}, O = PP.ogr, V = g.PP_VA;

  function dizi(x) { return Array.isArray(x) ? x : []; }
  function kume(a) { var o = {}; dizi(a).forEach(function (x) { o[x] = 1; }); return o; }

  /* Görev 1: soru → sütunlar. Gerekli olanların tümü seçilmeli; gerekli/isteğe bağlı dışında sütun seçilmemeli. */
  function gorev1(cevap) {
    var out = {}, sut = kume(V.veri.sutunlar);
    V.lab.gorev1.forEach(function (k) {
      var sec = dizi(cevap && cevap[k.id]).filter(function (c) { return sut[c]; }), s = kume(sec), g1 = kume(k.gerekli), ist = kume(k.istege);
      var eksik = k.gerekli.filter(function (c) { return !s[c]; }), fazla = sec.filter(function (c) { return !g1[c] && !ist[c]; });
      out[k.id] = { dogru: !eksik.length && !fazla.length, eksik: eksik, fazla: fazla };
    });
    out.hepsi = V.lab.gorev1.every(function (k) { return out[k.id].dogru; });
    return out;
  }
  function gorev2(cevap) {
    var out = {};
    Object.keys(V.lab.gorev2).forEach(function (c) { out[c] = !!cevap && cevap[c] === V.lab.gorev2[c]; });
    out.hepsi = Object.keys(V.lab.gorev2).every(function (c) { return out[c]; });
    return out;
  }
  function gorev3(cevap) {
    var out = {};
    V.lab.gorev3.forEach(function (i) { out[i.id] = !!cevap && (cevap[i.id] === true || cevap[i.id] === false) && cevap[i.id] === i.destekler; });
    out.hepsi = V.lab.gorev3.every(function (i) { return out[i.id]; });
    return out;
  }

  /* Değerlendirme: cevaplar = seçilen şık indeksleri; telafi yanlış sorunun ait olduğu derse ve bölümüne bağlanır */
  function sinavOf(sev) { return sev === 1 ? V.sinav1 : sev === 2 ? V.sinav2 : V.sinav0; }
  function sinav(cevaplar, seviye) {
    var sev = seviye === 1 || seviye === 2 ? seviye : 0, S0 = sinavOf(sev);
    if (!S0 || !Array.isArray(S0.sorular)) return { ok: false, neden: "sinav-yok" };
    var n = S0.sorular.length, dogru = 0, yanlis = [];
    if (!Array.isArray(cevaplar) || cevaplar.length !== n || cevaplar.some(function (c) { return !(c >= 0); })) return { ok: false, neden: "eksik-cevap" };
    S0.sorular.forEach(function (q, i) {
      if (cevaplar[i] === q.a) dogru++;
      else { var d = V.dersler.filter(function (x) { return x.id === q.bolum; })[0]; yanlis.push({ soru: i + 1, ders: d ? d.ad : q.bolum, dersId: q.bolum, dogruSik: q.o[q.a], telafi: d ? d.telafi : "" }); }
    });
    var oran = dogru / n;
    return { ok: true, seviye: sev, puan: dogru, maks: n, oran: oran, esik: S0.esik, gecti: oran + 1e-9 >= S0.esik, yanlis: yanlis,
      varyantNotu: "Tek soru seti var: yeniden denemede aynı sorular gelir (farklı varyant yok); ezberle geçmek mümkündür, bu bir sınırlamadır." };
  }

  function kayit() { var t = null; try { t = O.depo.tercih("va"); } catch (e) { t = null; } return t && typeof t === "object" ? t : { ders: {}, lab: {}, sinav: [] }; }
  function yaz(t) { return O.depo.tercih("va", t) === true; }

  function dersOkundu(id) {
    if (!V.dersler.some(function (d) { return d.id === id; })) return { ok: false, neden: "bilinmeyen-ders" };
    var t = kayit(); t.ders = t.ders || {}; t.ders[id] = O.gun.bugun(); return yaz(t) ? { ok: true } : { ok: false, neden: "yazilamadi" };
  }
  /* Lab görevi doğruysa kaydet: tercih + lab kanıtı (ipucusu için ayrı kimlik).
     cozum=true (çözüm görüldü, PP.cubuk): görev ilerleme kaydı olarak sayılır (Seviye 0 tamamlama yine istemci kaydıdır) ama lab KANITI yazılmaz. */
  function labKaydet(gorev, ipucu, cozum) {
    if (["g1", "g2", "g3"].indexOf(gorev) < 0) return { ok: false, neden: "bilinmeyen-gorev" };
    var t = kayit(); t.lab = t.lab || {};
    t.lab[gorev] = cozum ? { tarih: O.gun.bugun(), ipucu: !!ipucu, cozum: true } : { tarih: O.gun.bugun(), ipucu: !!ipucu };
    if (!cozum) O.depo.kanitEkle({ id: "lab-va0-" + gorev + (ipucu ? "-ipucu" : ""), tur: "lab", hedef: "lab:va0-lab:" + gorev, dogrulama: "istemci" });
    var hepsi = ["g1", "g2", "g3"].every(function (x) { return !!t.lab[x]; }), temiz = hepsi && ["g1", "g2", "g3"].every(function (x) { return !t.lab[x].cozum; });
    if (temiz) O.depo.kanitEkle({ id: "lab-va0-tamam", tur: "lab", hedef: "lab:va0-lab", dogrulama: "istemci" });
    return yaz(t) ? { ok: true, tamam: hepsi } : { ok: false, neden: "yazilamadi" };
  }
  /* Uygulama alanı (PP.alan) çözümü: tercih.va.alan[id] (kanıtı PP.alan kaydeder); seviye tamamlama koşulu DEĞİL */
  function alanKaydet(id, ipucu) {
    if (!V.alanlar.some(function (a) { return a.id === id; })) return { ok: false, neden: "bilinmeyen-alan" };
    var t = kayit(); t.alan = t.alan && typeof t.alan === "object" ? t.alan : {};
    t.alan[id] = { tarih: O.gun.bugun(), ipucu: !!ipucu };
    return yaz(t) ? { ok: true } : { ok: false, neden: "yazilamadi" };
  }
  function sinavKaydet(r) {
    if (!r || !r.ok) return { ok: false, neden: "gecersiz-sonuc" };
    var t = kayit(), giris = { tarih: O.gun.bugun(), puan: r.puan, maks: r.maks, gecti: !!r.gecti };
    if (r.seviye === 1 || r.seviye === 2) { t.sinavS = t.sinavS && typeof t.sinavS === "object" ? t.sinavS : {}; t.sinavS[r.seviye] = dizi(t.sinavS[r.seviye]); t.sinavS[r.seviye].push(giris); t.sinavS[r.seviye] = t.sinavS[r.seviye].slice(-20); }
    else { t.sinav = dizi(t.sinav); t.sinav.push(giris); t.sinav = t.sinav.slice(-20); }
    return yaz(t) ? { ok: true } : { ok: false, neden: "yazilamadi" };
  }

  /* Seviye 0 durumu: tamam = 3 ders okundu + 3 lab görevi + son/en iyi sınav ≥ eşik. Seviye 1+ "yok" (önkoşul kapısı). */
  function durum() {
    var t = kayit(), dersler = V.dersler.filter(function (d) { return !d.seviye; }).map(function (d) { return { id: d.id, ad: d.ad, okundu: !!(t.ders && t.ders[d.id]) }; });
    var lab = ["g1", "g2", "g3"].map(function (x) { return { gorev: x, tamam: !!(t.lab && t.lab[x]), ipucu: !!(t.lab && t.lab[x] && t.lab[x].ipucu), cozum: !!(t.lab && t.lab[x] && t.lab[x].cozum) }; });
    var den = dizi(t.sinav), gecti = den.some(function (x) { return x.gecti; });
    var tamam = dersler.every(function (d) { return d.okundu; }) && lab.every(function (l) { return l.tamam; }) && gecti;
    var bekleyen = [];
    if (!dersler.every(function (d) { return d.okundu; })) bekleyen.push("Üç dersi oku ve 'Okudum' işaretle");
    if (!lab.every(function (l) { return l.tamam; })) bekleyen.push("Laboratuvarın üç görevini doğru tamamla");
    if (!gecti) bekleyen.push("Değerlendirmede %80 ya da üstü al");
    var alanlar = V.alanlar.map(function (a) { return { id: a.id, ders: a.ders, tur: a.tur, tamam: !!(t.alan && t.alan[a.id]) }; });
    var okunduHepsi = {}; V.dersler.forEach(function (d) { okunduHepsi[d.id] = !!(t.ders && t.ders[d.id]); });
    var sev = {};
    [1, 2].forEach(function (n) {
      var S = sinavOf(n), ds = V.dersler.filter(function (d) { return d.seviye === n; }).map(function (d) { return { id: d.id, ad: d.ad, okundu: !!(t.ders && t.ders[d.id]) }; });
      var dn = dizi(t.sinavS && t.sinavS[n]), g = dn.some(function (x) { return x.gecti; }), al = V.alanlar.filter(function (a) { return /^va\d-/.test(a.id) && a.id.indexOf("va" + n + "-") === 0; });
      var cozulen = al.filter(function (a) { return !!(t.alan && t.alan[a.id]); }).length, bk = [];
      if (!ds.length) bk.push("içerik yok");
      else {
        if (!ds.every(function (d) { return d.okundu; })) bk.push("Dersleri oku ve 'Okudum' işaretle");
        if (!S) bk.push("Değerlendirme yok"); else if (!g) bk.push("Değerlendirmede %80 ya da üstü al");
      }
      sev[n] = { dersler: ds, alanToplam: al.length, alanCozulen: cozulen, sinavDenemesi: dn.length, sinavGecti: g, tamam: !!ds.length && !bk.length, bekleyen: bk };
    });
    var siradaki = !tamam ? { id: 0, ad: "Temeller", acik: true, neden: "Önce Seviye 0'ı tamamla (öneri; kilit zorlanmıyor)." }
      : !sev[1].tamam ? { id: 1, ad: "Elektronik tablolar", acik: true, neden: "Önerilen sıra: Seviye 1 (kilit zorlanmıyor; istemci kaydı)." }
      : !sev[2].tamam ? { id: 2, ad: "SQL", acik: true, neden: "Önerilen sıra: Seviye 2 (kilit zorlanmıyor; istemci kaydı)." }
      : { id: 3, ad: "İstatistik ve analitik düşünme", acik: false, neden: "Seviye 3 içeriği henüz hazırlanmadı." };
    return { dersler: dersler, lab: lab, alanlar: alanlar, sinavDenemesi: den.length, sinavGecti: gecti, tamam: tamam, bekleyen: bekleyen, seviyeler: sev, okundu: okunduHepsi, sonrakiSeviye: siradaki };
  }

  PP.va = { gorev1: gorev1, gorev2: gorev2, gorev3: gorev3, sinav: sinav, dersOkundu: dersOkundu, labKaydet: labKaydet, alanKaydet: alanKaydet, sinavKaydet: sinavKaydet, durum: durum };
})(typeof window !== "undefined" ? window : globalThis);

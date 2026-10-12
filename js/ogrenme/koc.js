"use strict";
/* ---- Koç (M§9): tek modül. Yerel kural motoru (PP.ogr + PPPersonal) + isteğe bağlı sağlayıcı (varsayılan KAPALI) ----
   İlkeler (test edilir):
   - Yalnız gerçek kayıttan konuşur; her öneri kanıtını taşır; veri yoksa "veri yok" der (uydurma geçmiş yok).
   - Koç ilerleme/ustalık/kanıt YAZAMAZ: bu modülde PP.ogr.depo'ya deneme/kanıt/proje yazan hiçbir yol yoktur; sağlayıcı metni yalnız tavsiyedir.
   - Önemli işlem (tercih sıfırlama) onaysız yapılmaz; ustalık verme isteği her zaman reddedilir.
   - Korumalı değerlendirme (açık mini sınav/seviye sınavı) sürerken cevap/ipucu verilmez, sağlayıcıya hiçbir şey gitmez.
   - Sağlayıcıya giden bağlamdan cevap alanları çıkarılır; sağlayıcı yok/hata/zaman aşımı → yerel yanıta düşer.
   Gerçek AI servisine bağlanılmaz; sağlayıcı PP.koc.saglayici.kaydet ile dışarıdan verilir (testte sahte). */
(function (g) {
  var PP = g.PP = g.PP || {}, O = PP.ogr;

  var SECENEKLER = { ton: ["kisa", "ayrintili"], oneri: ["acik", "kapali"], saglayici: ["kapali", "acik"] };
  var VARSAYILAN = { ton: "kisa", oneri: "acik", saglayici: "kapali" };
  var ISLEM_ONAY = { "tercih-sifirla": true };
  var YASAK_ISLEM = { "ustalik-ver": 1, "ilerleme-yaz": 1, "kanit-yaz": 1, "deneme-yaz": 1 };
  var CEVAP_ALANLARI = { a: 1, answer: 1, cevap: 1, dogru: 1, correct: 1, why: 1, aciklama: 1 };
  var CEVAP_ISTEGI = /(cevab[ıi]n?\b|cevap ne|doğru (şık|cevap)|dogru (sik|cevap)|hangisi doğru|ipucu ver|çöz(er misin|ümü)|answer)/i;

  var depoTercih = function (ad, deger) { return O.depo.tercih(ad, deger); };

  function tercihOku() {
    var t = null;
    try { t = depoTercih("koc"); } catch (e) { t = null; }
    var o = {};
    Object.keys(VARSAYILAN).forEach(function (k) { o[k] = t && SECENEKLER[k].indexOf(t[k]) >= 0 ? t[k] : VARSAYILAN[k]; });
    return o;
  }
  function tercihYaz(ad, deger) {
    if (!SECENEKLER[ad] || SECENEKLER[ad].indexOf(deger) < 0) return false;
    var t = tercihOku(); t[ad] = deger;
    return depoTercih("koc", t) === true;
  }
  function tercihSifirla() { return depoTercih("koc", null) === true; }

  /* Korumalı değerlendirme: açık mini sınav (cevaplanmamış soru var) ya da sürmekte olan seviye sınavı */
  function korumaliMi(durum) {
    if (durum && typeof durum.korumali === "boolean") return durum.korumali;
    try {
      if (typeof S === "undefined") return false;
      if (S.pe && S.pe.qs && !S.pe.done) return true;
      var L = S.les;
      if (L && L.room && L.rs === "sinav") {
        var l = typeof lrFind === "function" ? lrFind() : null, qs = l && Array.isArray(l.quiz) ? l.quiz : [];
        var cevaplanan = qs.filter(function (q, i) { return L.mark && L.mark[l.id + ":" + i]; }).length;
        return qs.length > 0 && cevaplanan < qs.length;
      }
    } catch (e) { /* durum okunamadı: korumasız sayma, aşağıda sağlayıcıya yine cevap alanı gitmez */ }
    return false;
  }

  /* Sağlayıcıya gidecek bağlamdan cevap alanlarını (her derinlikte) çıkarır; girdiyi değiştirmez. */
  function temizle(x) {
    if (Array.isArray(x)) return x.map(temizle);
    if (x && typeof x === "object") {
      var o = {};
      Object.keys(x).forEach(function (k) { if (!CEVAP_ALANLARI[k]) o[k] = temizle(x[k]); });
      return o;
    }
    return x;
  }

  /* girdi: {tekrar:{bugun:[plan öğeleri]}, labKanit:[kanıt kayıtları], kisisel:[PPPersonal öğeleri]} → {liste, bos}
     Her öneri: {id, baslik, neden, kanit:[{kaynak, ayrinti}], eylem:{tip, ...}}; kanıtsız öneri üretilmez. */
  function oneriler(girdi, tercih) {
    tercih = tercih || tercihOku();
    if (tercih.oneri === "kapali") return { liste: [], bos: "kapali" };
    var l = [];
    ((girdi && girdi.tekrar && girdi.tekrar.bugun) || []).slice(0, 5).forEach(function (t) {
      if (!t || !t.hedef || !t.neden) return;
      var yz = typeof t.oran === "number" ? Math.round(t.oran * 100) : null;
      l.push({ id: "tekrar:" + t.hedef, baslik: (t.durum === "kaldi" ? "Telafi: " : "Tekrar: ") + (t.ad || t.hedef), neden: t.neden,
        kanit: [{ kaynak: "deneme kaydı", ayrinti: yz == null ? t.neden : "son oran %" + yz + (t.kritik ? " (kritik hedef)" : "") }], eylem: { tip: "hedef", hedef: t.hedef } });
    });
    var sn = girdi && girdi.sonraki;
    if (sn && sn.adim && sn.adim.ders && (sn.adim.tip === "telafi" || sn.adim.tip === "blok")) { /* düz müfredat sırası ("ders") kanıtlı öneri sayılmaz */
      var sa = sn.adim;
      l.push({ id: "yol:" + sa.ders, baslik: (sa.tip === "lab" ? "Lab: " : sa.tip === "telafi" ? "Telafi: " : "Sıradaki: ") + sa.ad, neden: sa.adim + " " + sa.neden,
        kanit: [{ kaynak: sa.kanit, ayrinti: sa.neden + (sa.blok ? " Blok: " + sa.blok[0] : "") }], eylem: { tip: "hedef", hedef: sa.ders + ":sinav" } });
    }
    if (sn && sn.lab && sn.lab.ders) {
      var sb = sn.lab;
      l.push({ id: "lab:" + sb.ders, baslik: "Lab: " + sb.ad, neden: sb.adim + " " + sb.neden, kanit: [{ kaynak: sb.kanit, ayrinti: sb.neden }], eylem: { tip: "hedef", hedef: sb.ders + ":sinav" } });
    }
    ((girdi && girdi.kisisel) || []).slice(0, 3).forEach(function (k) {
      if (!k || !k.id || !k.title || !k.detail || !k.act || k.kind === "next") return; /* "sıradaki ders" geçmiş kaydı değil, müfredat sırasıdır: kanıtlı öneri sayılmaz */
      l.push({ id: "kisisel:" + k.id, baslik: k.title, neden: k.detail, kanit: [{ kaynak: "kişisel plan (yanlış/soru geçmişi)", ayrinti: k.detail }], eylem: { tip: "kisisel", act: k.act } });
    });
    var labSay = ((girdi && girdi.labKanit) || []).filter(function (k) { return k && k.tur === "lab"; }).length;
    if (!l.length) return { liste: [], bos: "veri-yok", labKanit: labSay };
    return { liste: l, bos: null, labKanit: labSay };
  }

  /* Gezinme: yalnız grafikte var olan hedefe ya da bilinen sekmeye */
  function eylemGecerli(e, G, sekmeler) {
    if (!e || typeof e !== "object") return false;
    if (e.tip === "hedef") return !!(G && G.hedefler && G.hedefler[e.hedef] && O.ui.hedefYeri(e.hedef));
    if (e.tip === "sekme") return (sekmeler || []).indexOf(e.sekme) >= 0;
    if (e.tip === "kisisel") return !!(e.act && typeof e.act.type === "string");
    return false;
  }

  /* islem: {tip, ...}; sec: {onay:true, nav:{git:function(e)}} */
  function calistir(islem, sec) {
    sec = sec || {};
    if (!islem || typeof islem.tip !== "string") return { ok: false, neden: "gecersiz-islem" };
    if (YASAK_ISLEM[islem.tip]) return { ok: false, neden: "koc-ustalik-veremez" };
    if (ISLEM_ONAY[islem.tip] && sec.onay !== true) return { ok: false, neden: "onay-gerekli" };
    if (islem.tip === "tercih-yaz") return tercihYaz(islem.ad, islem.deger) ? { ok: true } : { ok: false, neden: "gecersiz-tercih" };
    if (islem.tip === "tercih-sifirla") return tercihSifirla() ? { ok: true } : { ok: false, neden: "yazilamadi" };
    if (islem.tip === "gezin") {
      var G = null, tabs = [];
      try { G = O.ui.graf(); } catch (e) { G = null; }
      try { tabs = TABS.map(function (t) { return t[0]; }); } catch (e) { tabs = []; }
      if (!eylemGecerli(islem.eylem, G, tabs)) return { ok: false, neden: "gecersiz-hedef" };
      var nav = sec.nav || varsayilanNav();
      try { nav.git(islem.eylem); } catch (e) { return { ok: false, neden: "gezinme-hatasi" }; }
      return { ok: true };
    }
    return { ok: false, neden: "bilinmeyen-islem" };
  }
  function varsayilanNav() {
    return { git: function (e) {
      if (e.tip === "sekme") { goTab(e.sekme); return; }
      if (e.tip === "kisisel") { ppGo(e.act); return; }
      var y = O.ui.hedefYeri(e.hedef);
      if (y.atolye) { S.at2.sec = "alistirma"; S.pr.track = y.yol; goTab("atolye"); return; }
      S.les.track = y.yol; S.les.id = "base-" + y.konu; goTab("ders");
    } };
  }

  /* ---- Sağlayıcı (isteğe bağlı) ---- */
  var SAG = null;
  var saglayici = { kaydet: function (fn) { SAG = typeof fn === "function" ? fn : null; }, temizle: function () { SAG = null; }, varMi: function () { return !!SAG; } };

  function yerelYanit(soru, durum) {
    var q = String(soru || "").toLowerCase(), on = durum && durum.oneriler ? durum.oneriler : { liste: [], bos: "veri-yok" };
    var ilk = on.liste && on.liste[0];
    if (/(bugün|bugun|ne çalış|ne calis|sırada|sirada|öner|oner)/.test(q)) {
      if (on.bos === "kapali") return "Öneriler tercihinden kapalı. Açmak için Koç tercihlerini değiştirebilirsin.";
      if (!ilk) return "Henüz öneri çıkaracak kayıt yok: bir mini sınav çözünce neye çalışman gerektiğini kayıtlarından söyleyebilirim.";
      return ilk.baslik + " — çünkü: " + ilk.neden;
    }
    if (/(neden|niye|kanıt|kanit)/.test(q)) {
      if (!ilk) return "Açıklayacak bir önerim yok; elimde kayıt yok.";
      return "Dayanak: " + ilk.kanit.map(function (k) { return k.kaynak + " → " + k.ayrinti; }).join("; ");
    }
    if (/(ilerleme|durum|kaç ders|kac ders)/.test(q) && durum && durum.ozet) return "Kayıtlara göre " + durum.ozet.dersTamam + " ders tamam, seri " + durum.ozet.seri + ".";
    return "Bunu kayıtlarında göremiyorum. Sorabileceklerin: bugün ne çalışmalıyım, neden bu öneri, ilerleme durumum.";
  }

  /* Dönüş her zaman çözülür: {metin, kaynak:"yerel"|"saglayici", ustalik:false, uyari?}. Sağlayıcı hiçbir zaman ilerleme yazmaz. */
  function sor(soru, durum, sec) {
    sec = sec || {};
    var zaman = typeof sec.zamanAsimi === "number" ? sec.zamanAsimi : 8000, tercih = sec.tercih || tercihOku();
    var yerel = function (uyari) { var o = { metin: yerelYanit(soru, durum), kaynak: "yerel", ustalik: false }; if (uyari) o.uyari = uyari; return o; };
    if (korumaliMi(durum)) {
      return Promise.resolve({ metin: "Değerlendirme sürerken cevap ya da ipucu veremem; bitirince açıklarım.", kaynak: "yerel", ustalik: false, korumali: true });
    }
    if (CEVAP_ISTEGI.test(String(soru || "")) && durum && durum.korumaliHedef) {
      return Promise.resolve({ metin: "Bu soru değerlendirme kapsamında; cevabını vermem.", kaynak: "yerel", ustalik: false, korumali: true });
    }
    if (!SAG || tercih.saglayici !== "acik") return Promise.resolve(yerel(tercih.saglayici === "acik" && !SAG ? "sağlayıcı yok; yerel yanıt" : null));
    var bag = temizle({ oneriler: durum && durum.oneriler, ozet: durum && durum.ozet });
    return new Promise(function (coz) {
      var bitti = false, tm = setTimeout(function () { if (!bitti) { bitti = true; coz(yerel("sağlayıcı zaman aşımı; yerel yanıt")); } }, zaman);
      var p;
      try { p = Promise.resolve(SAG({ soru: String(soru || ""), baglam: bag })); } catch (e) { p = Promise.reject(e); }
      p.then(function (m) {
        if (bitti) return; bitti = true; clearTimeout(tm);
        if (typeof m !== "string" || !m.trim()) { coz(yerel("sağlayıcı boş yanıt verdi; yerel yanıt")); return; }
        coz({ metin: m.slice(0, 2000), kaynak: "saglayici", ustalik: false });
      }, function () { if (bitti) return; bitti = true; clearTimeout(tm); coz(yerel("sağlayıcı hatası; yerel yanıt")); });
    });
  }

  PP.koc = { SECENEKLER: SECENEKLER, VARSAYILAN: VARSAYILAN, tercihOku: tercihOku, tercihYaz: tercihYaz, tercihSifirla: tercihSifirla, korumaliMi: korumaliMi, temizle: temizle,
    oneriler: oneriler, eylemGecerli: eylemGecerli, calistir: calistir, saglayici: saglayici, sor: sor, yerelYanit: yerelYanit };
})(typeof window !== "undefined" ? window : globalThis);

"use strict";
/* ---- Akran incelemesi (M§13) ve rapor paylaşımı (M§8.6, M§12) — istemci modeli; sunucu politikası supabase/migrations/20261013_* ----
   Akran: rubrik proje adımlarından; AI/insan ayrımı zorunlu; görünürlük yalnız ilgililere; inceleme güvenilir yetkinlik durumunu DEĞİŞTİRMEZ.
   Paylaşım: belirteç yalnız oluşturulurken bir kez görünür, depoda yalnız özeti (SHA-256) tutulur; iptal edilen/süresi dolan paylaşım erişim vermez.
   Depo soyutlaması (kaydet/getir/guncelle) sayesinde testte sahte veri; gerçek sunucu bağlantısı bu fazda yok. */
(function (g) {
  var PP = g.PP = g.PP || {};

  /* ---------- Akran incelemesi ---------- */
  var GENEL = [["readme", "README ve kurulum yönergesi anlaşılır"], ["hata", "Hata yönetimi ve sınırlar belirtilmiş"], ["sinir", "Bilinen sınırlamalar dürüstçe yazılmış"]];
  function rubrikKur(def) {
    var k = [];
    ((def && def.steps) || []).forEach(function (s, i) { if (s.proof) k.push({ id: "adim-" + i, ad: "Kanıt: " + s.t, ipucu: s.proof }); });
    GENEL.forEach(function (x) { k.push({ id: x[0], ad: x[1], ipucu: "" }); });
    return k;
  }
  var REHBER = "Somut ol: neyi gördün, hangi ölçüte göre eksik/iyi, nasıl düzeltilir. Kişiyi değil çalışmayı değerlendir; saygılı ve yapıcı yaz.";

  /* inc: {id, proje, sahip, inceleyen, kaynak:"insan"|"ai", puanlar:{kriter:0|1|2}, yorum} */
  function incelemeYap(x, rubrik) {
    if (!x || typeof x !== "object") return { ok: false, neden: "bos" };
    if (x.kaynak !== "insan" && x.kaynak !== "ai") return { ok: false, neden: "kaynak-belirtilmeli" };   /* AI/insan ayrımı zorunlu */
    if (!x.proje || !x.sahip || !x.inceleyen) return { ok: false, neden: "alan-eksik" };
    if (x.kaynak === "insan" && x.inceleyen === x.sahip) return { ok: false, neden: "kendi-incelemesi-akran-degil" };
    var ids = (rubrik || []).map(function (r) { return r.id; }), p = {}, n = 0;
    for (var k in (x.puanlar || {})) {
      if (ids.indexOf(k) < 0) return { ok: false, neden: "bilinmeyen-olcut", olcut: k };
      var v = x.puanlar[k];
      if (!(v === 0 || v === 1 || v === 2)) return { ok: false, neden: "puan-gecersiz", olcut: k };
      p[k] = v; n++;
    }
    if (!n) return { ok: false, neden: "puan-yok" };
    var yorum = String(x.yorum || "").slice(0, 1500);
    return { ok: true, inceleme: { id: x.id || "inc-" + x.proje + "-" + x.inceleyen + "-" + n, proje: x.proje, sahip: x.sahip, inceleyen: x.inceleyen, kaynak: x.kaynak,
      etiket: x.kaynak === "ai" ? "Yapay zekâ geri bildirimi (insan değil)" : "İnsan geri bildirimi", puanlar: p, yorum: yorum, durum: "acik", itiraz: null } };
  }
  /* Görünürlük: yalnız proje sahibi ve incelemeyi yazan; paylaşılmamış özel içerik başkasına gitmez */
  function gorunur(inc, kullanici) { return !!kullanici && !!inc && (kullanici === inc.sahip || kullanici === inc.inceleyen); }
  function incelenebilirIcerik(proje, izin) {
    var ok = izin && Array.isArray(izin.adimlar) ? izin.adimlar : [];
    return { ad: proje.title || proje.ad, adimlar: (proje.steps || []).filter(function (s, i) { return ok.indexOf(i) >= 0; }).map(function (s) { return { t: s.t, kanit: izin.notlar === true ? s.note || "" : "" }; }) };
  }
  function coz(inc, kullanici) { if (!inc || kullanici !== inc.sahip) return { ok: false, neden: "yetki-yok" }; inc.durum = "cozuldu"; return { ok: true }; }
  function itirazEt(inc, kullanici, neden) { if (!inc || kullanici !== inc.sahip) return { ok: false, neden: "yetki-yok" }; if (!String(neden || "").trim()) return { ok: false, neden: "neden-gerekli" }; inc.durum = "itiraz"; inc.itiraz = String(neden).slice(0, 500); return { ok: true }; }
  /* İnceleme güvenilir yetkinlik durumunu kendiliğinden değiştirmez (M§13) */
  function guvenEtkisi() { return { degisir: false, neden: "Akran görüşü ustalık kanıtı değildir; durum yalnız geçerli bir değerlendirmeyle değişir." }; }
  PP.akran = { rubrikKur: rubrikKur, REHBER: REHBER, incelemeYap: incelemeYap, gorunur: gorunur, incelenebilirIcerik: incelenebilirIcerik, coz: coz, itirazEt: itirazEt, guvenEtkisi: guvenEtkisi };

  /* ---------- Paylaşım ---------- */
  function hex(buf) { var a = new Uint8Array(buf), s = ""; for (var i = 0; i < a.length; i++) s += (a[i] < 16 ? "0" : "") + a[i].toString(16); return s; }
  function ozet(metin) { return g.crypto.subtle.digest("SHA-256", new TextEncoder().encode(metin)).then(hex); }
  function rastgele() { var a = new Uint8Array(24); g.crypto.getRandomValues(a); return hex(a); }

  /* depo: {kaydet(kayit)→Promise, getirOzet(ozet)→Promise<kayit|null>, guncelle(id, yama)→Promise}; kayit: {id, sahip, ozet, rapor, olusturma, bitis, iptal} */
  function olustur(depo, sahip, rapor, gun, simdi) {
    if (!sahip) return Promise.reject(new Error("sahip-yok"));
    var tok = rastgele(), t0 = typeof simdi === "number" ? simdi : Date.now(), gunSayi = gun > 0 && gun <= 90 ? gun : 14;
    return ozet(tok).then(function (oz) {
      var k = { id: "p-" + oz.slice(0, 12), sahip: sahip, ozet: oz, rapor: rapor, olusturma: t0, bitis: t0 + gunSayi * 864e5, iptal: null };
      return depo.kaydet(k).then(function () { return { id: k.id, belirtec: tok, bitis: k.bitis }; });
    });
  }
  function erisim(depo, belirtec, simdi) {
    var t0 = typeof simdi === "number" ? simdi : Date.now();
    if (typeof belirtec !== "string" || belirtec.length < 16) return Promise.resolve({ ok: false, neden: "gecersiz" });
    return ozet(belirtec).then(function (oz) { return depo.getirOzet(oz); }).then(function (k) {
      if (!k) return { ok: false, neden: "gecersiz" };
      if (k.iptal) return { ok: false, neden: "iptal" };
      if (t0 >= k.bitis) return { ok: false, neden: "suresi-doldu" };
      return { ok: true, rapor: k.rapor };
    });
  }
  function iptal(depo, id, kullanici, simdi) {
    return depo.getirId(id).then(function (k) {
      if (!k) return { ok: false, neden: "yok" };
      if (k.sahip !== kullanici) return { ok: false, neden: "yetki-yok" };
      return depo.guncelle(id, { iptal: typeof simdi === "number" ? simdi : Date.now() }).then(function () { return { ok: true }; });
    });
  }
  /* Özel (öğrenci) rapor: yalnız sahibi görür */
  function ozelRapor(rapor, sahip, kullanici) { return kullanici && kullanici === sahip ? { ok: true, rapor: rapor } : { ok: false, neden: "yetki-yok" }; }

  /* Sahte/yerel depo (test ve yerel önizleme için; sunucu DEĞİL) */
  function bellekDepo() {
    var m = {};
    return {
      kaydet: function (k) { m[k.id] = JSON.parse(JSON.stringify(k)); return Promise.resolve(); },
      getirOzet: function (oz) { var r = null; Object.keys(m).forEach(function (i) { if (m[i].ozet === oz) r = JSON.parse(JSON.stringify(m[i])); }); return Promise.resolve(r); },
      getirId: function (id) { return Promise.resolve(m[id] ? JSON.parse(JSON.stringify(m[id])) : null); },
      guncelle: function (id, y) { if (m[id]) for (var k in y) m[id][k] = y[k]; return Promise.resolve(); },
      _hepsi: function () { return JSON.stringify(m); }
    };
  }
  PP.paylasim = { olustur: olustur, erisim: erisim, iptal: iptal, ozelRapor: ozelRapor, bellekDepo: bellekDepo };
})(typeof window !== "undefined" ? window : globalThis);

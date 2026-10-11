"use strict";
/* ---- Değerlendirme (M§11): puan, eşik, kritik hedef, varyant, telafi, eşdeğerlik (yollar arası aktarım) ----
   Tüm işlevler saftır: (grafik, denemeler) → sonuç. Depolamaya yazmaz. */
(function (g) {
  var O = g.PP.ogr, sayi = O.sayi;

  /* Deneme = {id, hedef, varyant, puan, maks, tarih, surum, yardim:{tur,guvenilir}, dogrulama:'sunucu'|'istemci'|'beyan', kaynak}
     Tüm denemeler kaydedilir; hangisinin SAYILDIĞI aşağıda belirlenir ve nedeni yazılır. */
  function oran(d) { return d && sayi(d.maks) > 0 && sayi(d.puan) >= 0 && d.puan <= d.maks ? d.puan / d.maks : null; }
  function esikOf(h) { var e = h.esik != null ? h.esik : O.ESIK; return h.kritik ? Math.max(e, O.KRITIK_ESIK) : e; }
  function sirala(a) { return a.slice().sort(function (x, y) { return String(x.tarih || "").localeCompare(String(y.tarih || "")) || String(x.id || "").localeCompare(String(y.id || "")); }); }

  /* Bağımsızlık yalnız güvenilir "yardım yok" kaydıyla kabul edilir; tamamlama bağımsızlık kanıtı değildir (M§11.2). */
  function bagimsizMi(d) { return !!(d && d.yardim && d.yardim.tur === "yok" && d.yardim.guvenilir === true); }

  /* Bir hedef için denemeleri topla: kendi denemeleri + AÇIKÇA eşdeğer ilan edilmiş hedeflerin denemeleri.
     Eşdeğer deneme yalnız kaynak hedef bu hedeften zayıf değilse (eşik ve kritiklik) geçerlidir. */
  function adaylar(G, h, denemeler) {
    var esd = {}; h.esdegerler.forEach(function (e) { esd[e] = 1; });
    var out = [];
    denemeler.forEach(function (d) {
      if (d.hedef === h.id) out.push({ d: d, ret: null });
      else if (esd[d.hedef] && G.hedefler[d.hedef]) {
        var k = G.hedefler[d.hedef], ret = null;
        if (esikOf(k) < esikOf(h)) ret = "aktarim-esik-dusuk";
        else if (h.kritik && !k.kritik) ret = "aktarim-kritik-degil";
        out.push({ d: d, ret: ret });
      }
    });
    return out.sort(function (a, b) { return String(a.d.tarih || "").localeCompare(String(b.d.tarih || "")) || String(a.d.id || "").localeCompare(String(b.d.id || "")); });
  }

  function hedefDurumu(G, hedefId, denemeler, sec) {
    sec = sec || {};
    var h = G.hedefler[hedefId];
    if (!h) throw new Error("PP.ogr: bilinmeyen hedef " + hedefId);
    var esik = esikOf(h), gecmis = [], sayilan = [];
    var cokVaryant = h.varyantlar.length > 1, basarisizVaryant = {};
    adaylar(G, h, denemeler).forEach(function (a) {
      var d = a.d, r = oran(d), neden = a.ret;
      if (!neden && r === null) neden = "gecersiz-puan";
      if (!neden) {
        var surumOk = d.surum === h.surum || h.uyumluSurumler.indexOf(d.surum) >= 0;
        if (!surumOk) neden = d.surum == null ? "surum-yok" : "eski-surum";
      }
      if (!neden && h.minMaks && d.maks < h.minMaks) neden = "yetersiz-kanit";
      if (!neden && d.dogrulama === "beyan" && !sec.beyanKabul) neden = "beyan-sayilmaz";   /* "Bildim" gibi öz-beyan ustalık kanıtı değildir */
      if (!neden && sec.sunucuGerek && d.dogrulama !== "sunucu") neden = "sunucu-dogrulamasi-yok";
      if (!neden && sec.bagimsizGerek && !bagimsizMi(d)) neden = "bagimsizlik-kaniti-yok";
      /* Başarısız olunan varyantın aynısıyla yeniden deneme sayılmaz (ezberlenmiş soru ustalık değildir), yeni varyant varsa. */
      if (!neden && cokVaryant && d.varyant != null && basarisizVaryant[d.varyant]) neden = "ayni-varyant-tekrari";
      if (neden) { gecmis.push({ id: d.id, neden: neden }); return; }
      sayilan.push({ d: d, oran: r });
      if (r < esik && d.varyant != null) basarisizVaryant[d.varyant] = 1;
    });
    var son = sayilan.length ? sayilan[sayilan.length - 1] : null;
    var durum = !son ? "denenmedi" : son.oran >= esik ? "gecti" : "kaldi";
    var guven = !son ? "yok" : son.d.dogrulama === "sunucu" ? "sunucu" : "istemci";
    return { hedef: hedefId, ad: h.ad || hedefId, yetkinlik: h.yetkinlik, kritik: h.kritik, esik: esik, durum: durum, oran: son ? son.oran : null,
      sayilan: sayilan.length, gecmis: gecmis, son: son ? son.d.id : null, guven: guven, bagimsiz: son ? bagimsizMi(son.d) : false };
  }

  /* Yetkinlik: tüm hedefleri geçilmiş olmalı; kritik hedefler TEK TEK geçmeli. Ortalama bilgi içindir, geçişi belirlemez. */
  function yetkinlikDurumu(G, yetkinlikId, denemeler, sec) {
    var ids = Object.keys(G.hedefler).filter(function (k) { return G.hedefler[k].yetkinlik === yetkinlikId; });
    var ds = ids.map(function (k) { return hedefDurumu(G, k, denemeler, sec); });
    var denenen = ds.filter(function (x) { return x.oran != null; });
    var ort = denenen.length ? denenen.reduce(function (a, x) { return a + x.oran; }, 0) / denenen.length : null;
    return {
      yetkinlik: yetkinlikId, gecti: ds.length > 0 && ds.every(function (x) { return x.durum === "gecti"; }), olcutYok: ds.length === 0,
      ortalama: ort, hedefler: ds,
      kritikBasarisiz: ds.filter(function (x) { return x.kritik && x.durum === "kaldi"; }).map(function (x) { return x.hedef; }),
      kritikEksik: ds.filter(function (x) { return x.kritik && x.durum === "denenmedi"; }).map(function (x) { return x.hedef; }),
      kaldi: ds.filter(function (x) { return x.durum === "kaldi"; }).map(function (x) { return x.hedef; }),
      eksik: ds.filter(function (x) { return x.durum === "denenmedi"; }).map(function (x) { return x.hedef; })
    };
  }

  /* Bir sonraki varyant: en az kullanılan, art arda aynısına dönmeden; belirleyici (rastgelelik yok). */
  function varyantSec(G, hedefId, denemeler) {
    var h = G.hedefler[hedefId], kul = {}, sonV = null, liste = h.varyantlar.slice();
    if (!liste.length) return { varyant: null, uyari: "varyant-yok" };
    liste.forEach(function (v) { kul[v] = 0; });
    sirala(denemeler.filter(function (d) { return d.hedef === hedefId; })).forEach(function (d) { if (kul[d.varyant] != null) kul[d.varyant]++; sonV = d.varyant; });
    var aday = liste.filter(function (v) { return v !== sonV || liste.length === 1; });
    aday.sort(function (a, b) { return kul[a] - kul[b] || liste.indexOf(a) - liste.indexOf(b); });
    return { varyant: aday[0], uyari: liste.length === 1 ? "tek-varyant" : null };
  }

  /* Hedefli telafi (M§11.1): başarısız hedefi bul, hatayı açıkla, yeniden anlat, çalışılmış örnek, rehberli görev,
     taze bağımsız görev, FARKLI varyantla yeniden sına. Durum güncellemesi yeni deneme gelince hedefDurumu ile olur. */
  function telafi(G, hedefId, denemeler, sec) {
    var d = hedefDurumu(G, hedefId, denemeler, sec), h = G.hedefler[hedefId];
    if (d.durum !== "kaldi") return { hedef: hedefId, gerekli: false, neden: d.durum === "gecti" ? "hedef-gecildi" : "hedef-denenmedi", adimlar: [] };
    var v = varyantSec(G, hedefId, denemeler), ad = h.ad || hedefId;
    return { hedef: hedefId, gerekli: true, oran: d.oran, esik: d.esik, kritik: d.kritik, sonDeneme: d.son, sonrakiVaryant: v.varyant, uyari: v.uyari,
      adimlar: [
        { no: 1, tur: "yanlis-anlama", metin: "Başarısız hedef: " + ad + " (%" + Math.round(d.oran * 100) + ", gereken %" + Math.round(d.esik * 100) + ")." },
        { no: 2, tur: "yeniden-anlat", metin: ad + " kavramını yeniden oku; terimleri kendi cümlenle anlat." },
        { no: 3, tur: "ornek", metin: "Çalışılmış bir örneği adım adım izle." },
        { no: 4, tur: "rehberli-gorev", metin: "İpuçlu, rehberli bir görevi tamamla." },
        { no: 5, tur: "bagimsiz-gorev", metin: "Yardımsız yeni bir görev çöz." },
        { no: 6, tur: "yeniden-sinav", metin: "Aynı hedefi " + (v.varyant != null ? "farklı bir varyantla (" + v.varyant + ")" : "yeniden") + " sına.", varyant: v.varyant }
      ] };
  }
  function telafiGerekenler(G, denemeler, sec) {
    return Object.keys(G.hedefler).map(function (k) { return telafi(G, k, denemeler, sec); }).filter(function (t) { return t.gerekli; });
  }

  O.deg = { oran: oran, esikOf: esikOf, bagimsizMi: bagimsizMi, hedefDurumu: hedefDurumu, yetkinlikDurumu: yetkinlikDurumu, varyantSec: varyantSec, telafi: telafi, telafiGerekenler: telafiGerekenler };
})(typeof window !== "undefined" ? window : globalThis);

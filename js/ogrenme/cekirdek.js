"use strict";
/* ---- Faz 3: öğrenme modeli çekirdeği. Tek ad alanı: window.PP.ogr (başka küresel ad yok). ----
   Saf mantık: DOM'a ve uygulamanın eski küresellerine dokunmaz (Node'da da yüklenebilir).
   Model belgesi: proofpath-ops kayitlar/DATA_MODEL.md */
(function (g) {
  var PP = g.PP = g.PP || {};
  var O = PP.ogr = PP.ogr || {};
  O.SURUM = 1;            /* depo/model şema sürümü */
  O.ESIK = 0.8;           /* varsayılan geçme eşiği (M§11.1) */
  O.KRITIK_ESIK = 0.8;    /* kritik hedefler tek tek bu eşiği geçmeli; hedef kendi eşiğini yükseltebilir */
  O.CEKIRDEK_PROJE = 4;   /* kademe başına ayrı çekirdek proje (M§6.1) */
  O.SEVIYE = {
    L0: "Hazırlık", L1: "Bilgi", L2: "Rehberli pratik", L3: "Bağımsız pratik", L4: "Ana proje",
    L5: "Kademe Altın Vuruş", L6: "Bütünleşik Altın Vuruş", L7: "Joker kapstonu", L8: "Portfolyo ve kariyer kanıtı"
  };
  /* Joker (L7) gereksinim türleri: her biri ayrı kanıt ister (M§6.1). */
  O.JOKER_GEREKLER = ["gereksinim-analizi", "tasarim", "uygulama", "test", "guvenlik", "hata-ayiklama", "savunma"];
  O.sayi = function (x) { return typeof x === "number" && isFinite(x) ? x : 0; };
  O.yuzde = function (x) { return Math.round(x * 100) + "%"; };
  O.kopya = function (x) { return x == null ? x : JSON.parse(JSON.stringify(x)); };
  /* Yerel takvim günü "YYYY-AA-GG" (uygulamanın today/iso/parse/addDays işlevleriyle aynı kural). */
  function iki(n) { return (n < 10 ? "0" : "") + n; }
  function gunIso(d) { return d.getFullYear() + "-" + iki(d.getMonth() + 1) + "-" + iki(d.getDate()); }
  function gunAyir(s) { var p = String(s || "").split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  O.gun = {
    iso: gunIso, ayir: gunAyir,
    bugun: function () { return gunIso(new Date()); },
    ekle: function (s, n) { var d = gunAyir(s); d.setDate(d.getDate() + n); return gunIso(d); },
    fark: function (a, b) { return Math.round((gunAyir(a) - gunAyir(b)) / 864e5); }   /* a - b, gün */
  };

  /* Faz 12 V1: ders şeması yardımcıları. Hepsi isteğe bağlı: objectives, summary, prereq, minutes, sonDogrulama, surum;
     quiz sorusunda obj ve whyNot. Alan yoksa eski ders aynen çalışır. Saf mantık. */
  var BAYAT_GUN = 183;    /* "son doğrulama" 6 aydan eskiyse bayat uyarısı */
  function gecerliTarih(s) { return typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s) && gunIso(gunAyir(s)) === s; }
  /* objectives: ["metin"] ya da [{id, text}] → [{id, text}] (kimlik yoksa h1, h2…) */
  function hedefler(l) {
    var a = l && Array.isArray(l.objectives) ? l.objectives : [];
    return a.map(function (x, i) {
      var t = typeof x === "string" ? x : x && x.text, id = x && typeof x === "object" && x.id ? String(x.id) : "h" + (i + 1);
      return typeof t === "string" && t.trim() ? { id: id, text: t.trim() } : null;
    }).filter(Boolean);
  }
  /* Yanlış seçilen seçeneğin nedeni (whyNot[seçenek metni]); doğru seçenek için ve yoksa null. */
  function secenekNedeni(q, secenek) {
    if (!q || !q.whyNot || typeof q.whyNot !== "object" || secenek === q.answer) return null;
    var t = q.whyNot[secenek];
    return typeof t === "string" && t.trim() ? t.trim() : null;
  }
  /* {bayat, gun, etiket}; sonDogrulama yoksa ya da geçersizse null */
  function dogrulamaDurumu(l, bugun) {
    var d = l && l.sonDogrulama;
    if (!gecerliTarih(d)) return null;
    var gun = O.gun.fark(bugun || O.gun.bugun(), d);
    return { bayat: gun > BAYAT_GUN, gun: gun, etiket: "son doğrulama: " + d };
  }
  /* L = {yol: {no: ders}} → {toplam, bayat, dogrulanmadi}; tarih alanı boş ya da geçersiz ders "doğrulanmadı" sayılır. */
  function dogrulamaOzeti(L, bugun) {
    var o = { toplam: 0, bayat: 0, dogrulanmadi: 0 };
    Object.keys(L || {}).forEach(function (yol) {
      Object.keys(L[yol]).forEach(function (no) {
        var d = dogrulamaDurumu(L[yol][no], bugun);
        o.toplam++;
        if (!d) o.dogrulanmadi++; else if (d.bayat) o.bayat++;
      });
    });
    return o;
  }
  /* Şema denetimi. L = {yol: {no: ders}}, basliklar = {yol: [başlık,…]} (isteğe bağlı; ders no = sıra + 1).
     Dönen: {hata:[metin], eksik:[{yol,no,…}], say:{…}}. hata = bozuk içerik (test düşürür); eksik = yalnız rapor. */
  function denetle(L, basliklar, bugun, anahtar) {
    var hata = [], eksik = [], say = { ders: 0, soru: 0, yanlisSecenek: 0, whyNotVar: 0, hedefli: 0, ozetli: 0, dogrulamali: 0, sunucuSoru: 0, anahtarDenetimiAtlandi: 0 };
    Object.keys(L || {}).forEach(function (yol) {
      var gor = {}, renk = {};
      Object.keys(L[yol]).forEach(function (no) {
        var d = L[yol][no], k = yol + "-" + no, e = { yol: yol, no: no, objectivesYok: false, whyNotEksik: 0, ozetYok: false, hedefSorusuz: [], dogrulamaYok: false };
        say.ders++;
        if (typeof d.hook !== "string" || !d.hook) hata.push(k + ": hook yok");
        if (typeof d.homework !== "string" || !d.homework) hata.push(k + ": homework yok");
        if (!Array.isArray(d.blocks) || !d.blocks.length) hata.push(k + ": blocks yok");
        var qs = Array.isArray(d.quiz) ? d.quiz : [];
        if (!qs.length) hata.push(k + ": quiz yok");
        var hs = hedefler(d), hid = {};
        if (d.objectives !== undefined && (!Array.isArray(d.objectives) || hs.length < 2 || hs.length > 4 || hs.length !== d.objectives.length)) hata.push(k + ": objectives 2-4 geçerli madde olmalı");
        hs.forEach(function (h) { if (h.id in hid) hata.push(k + ": objectives kimliği yinelenir " + h.id); hid[h.id] = 0; });
        qs.forEach(function (q, i) {
          var s = k + " soru " + (i + 1), o = Array.isArray(q.options) ? q.options : [];
          say.soru++;
          /* Faz 9 sunucu: cevap anahtarı sunucuya ayrılmış soru (answer yok, id var). Anahtar denetimi için isteğe bağlı çözücü: anahtar(yol, no, id) → {dogru, aciklama:{why, whyNot}} */
          var sunucu = q.answer === undefined, ans = q.answer, why = q.why, wnot = q.whyNot;
          if (sunucu) {
            say.sunucuSoru++;
            if (typeof q.id !== "string" || !/^[0-9a-f]{8}$/.test(q.id)) hata.push(s + ": sunucu sorusunda id (8 onaltılık) yok");
            if (q.why !== undefined || q.whyNot !== undefined) hata.push(s + ": sunucuya ayrılmış soruda why/whyNot içerikte kalmış");
            var kz = typeof anahtar === "function" ? anahtar(yol, no, q.id) : null;
            if (typeof anahtar === "function") {
              if (!kz) hata.push(s + ": cevap anahtarı sunucu tohumunda yok (id " + q.id + ")");
              else { ans = kz.dogru; why = kz.aciklama && kz.aciklama.why; wnot = kz.aciklama && kz.aciklama.whyNot; }
            } else say.anahtarDenetimiAtlandi++;
          }
          var anahtarVar = !sunucu || (typeof anahtar === "function" && ans !== undefined);
          if (typeof q.q !== "string" || !q.q) hata.push(s + ": soru metni yok");
          if (o.length < 2) hata.push(s + ": seçenek yok");
          else if (anahtarVar && o.indexOf(ans) < 0) hata.push(s + ": answer seçeneklerde yok");
          if (anahtarVar && (typeof why !== "string" || !why)) hata.push(s + ": why yok");
          if (q.obj !== undefined) { if (!(q.obj in hid)) hata.push(s + ": obj bilinmeyen hedefe işaret ediyor (" + q.obj + ")"); else hid[q.obj]++; }
          if (anahtarVar && wnot !== undefined) {
            if (!wnot || typeof wnot !== "object" || Array.isArray(wnot)) hata.push(s + ": whyNot nesne olmalı");
            else Object.keys(wnot).forEach(function (sx) {
              if (o.indexOf(sx) < 0) hata.push(s + ": whyNot anahtarı seçenek değil (" + sx + ")");
              else if (sx === ans) hata.push(s + ": whyNot doğru seçenek için yazılamaz");
              else if (typeof wnot[sx] !== "string" || !wnot[sx].trim()) hata.push(s + ": whyNot metni boş (" + sx + ")");
            });
          }
          if (anahtarVar) {
            var yanlis = o.filter(function (x) { return x !== ans; }), var_ = yanlis.filter(function (x) { var t = wnot && typeof wnot === "object" ? wnot[x] : null; return typeof t === "string" && t.trim(); }).length;
            say.yanlisSecenek += yanlis.length; say.whyNotVar += var_; e.whyNotEksik += yanlis.length - var_;
          }
        });
        if (!hs.length) e.objectivesYok = true;
        else { say.hedefli++; hs.forEach(function (h) { if (!hid[h.id]) e.hedefSorusuz.push(h.id); }); }
        if (d.summary !== undefined) {
          if (!Array.isArray(d.summary) || d.summary.length < 3 || d.summary.length > 5 || d.summary.some(function (x) { return typeof x !== "string" || !x.trim(); })) hata.push(k + ": summary 3-5 dolu madde olmalı");
          else say.ozetli++;
        } else e.ozetYok = true;
        if (d.prereq !== undefined) {
          if (!Array.isArray(d.prereq)) hata.push(k + ": prereq dizi olmalı");
          else d.prereq.forEach(function (p) { if (!L[yol][p]) hata.push(k + ": prereq bilinmeyen ders " + p); else if (String(p) === String(no)) hata.push(k + ": kendi önkoşulu"); });
        }
        if (d.minutes !== undefined && !(typeof d.minutes === "number" && d.minutes >= 1 && d.minutes <= 120)) hata.push(k + ": minutes 1-120 sayı olmalı");
        if (d.sonDogrulama !== undefined) {
          if (!gecerliTarih(d.sonDogrulama)) hata.push(k + ": sonDogrulama YYYY-AA-GG olmalı");
          else if (O.gun.fark(bugun || O.gun.bugun(), d.sonDogrulama) < 0) hata.push(k + ": sonDogrulama gelecekte");
          else say.dogrulamali++;
        } else e.dogrulamaYok = true;
        if (d.surum !== undefined && (typeof d.surum !== "string" || !d.surum)) hata.push(k + ": surum metin olmalı");
        var b = basliklar && basliklar[yol] && basliklar[yol][+no - 1];
        if (b) { if (gor[b]) hata.push(k + ": başlık yinelenir (" + b + ")"); gor[b] = 1; }
        eksik.push(e);
      });
      /* önkoşul döngüsü (DFS) */
      Object.keys(L[yol]).forEach(function (no) { dfs(no, []); });
      function dfs(no, yolu) {
        if (renk[no] === 2) return;
        if (renk[no] === 1) { hata.push(yol + ": önkoşul döngüsü " + yolu.concat(no).join(" → ")); return; }
        renk[no] = 1;
        ((L[yol][no] && Array.isArray(L[yol][no].prereq) && L[yol][no].prereq) || []).forEach(function (p) { if (L[yol][p] && String(p) !== String(no)) dfs(String(p), yolu.concat(no)); });
        renk[no] = 2;
      }
    });
    return { hata: hata, eksik: eksik, say: say };
  }
  O.ders = { BAYAT_GUN: BAYAT_GUN, hedefler: hedefler, secenekNedeni: secenekNedeni, dogrulamaDurumu: dogrulamaDurumu, dogrulamaOzeti: dogrulamaOzeti, gecerliTarih: gecerliTarih, denetle: denetle };
})(typeof window !== "undefined" ? window : globalThis);

"use strict";
/* ---- Geriye uyumlu OKUMA dönüştürücüsü (M§17.1) ----
   Eski depolama anahtarlarını (ya_lc, ya_gs, ya_lv, ya_pl) yeni modele çevirir. Eski anahtarlara ASLA yazmaz, silmez, biçimini değiştirmez.
   Eski kayıtların niteliği korunur:
   - ya_lc bayrakları (ısınma/okuma/mini sınav/alıştırma) İLERLEME'dir (sayfa açma); ustalık kanıtı değildir.
   - ya_gs soru istatistikleri toplu denemedir (zaman damgasız, istemcide yazılmış): güven "istemci".
   - ya_lv / ya_pl tanılama kanıtıdır (seviye belirleme), ustalık geçişi değildir. */
(function (g) {
  var O = g.PP.ogr, ESKI_SURUM = "eski-1";

  function dersId(k) {
    var m = /^s-([a-z]+)-(\d+)$/.exec(k);
    return m ? "ders:" + m[1] + ":" + m[2] : "ders:ozel:" + k;
  }
  function nesne(x) { return x && typeof x === "object" && !Array.isArray(x) ? x : {}; }
  function s(x) { return typeof x === "string" ? x : ""; }

  /* girdi: {lc, gs, lv, pl} (ham ayrıştırılmış JSON), soruYol: soru indeksi → yol kimliği (örn. QB[i].t). Girdiyi DEĞİŞTİRMEZ. */
  function cevir(girdi, soruYol) {
    girdi = girdi || {};
    var out = { ilerleme: {}, dersTamam: {}, denemeler: [], kanitlar: [], atlanan: 0, surum: ESKI_SURUM };
    var lc = nesne(girdi.lc), gs = nesne(girdi.gs), lv = nesne(girdi.lv), pl = nesne(girdi.pl);

    Object.keys(lc).forEach(function (k) {
      if (k.charAt(0) === "_") return;            /* _cut vb. iç kayıtlar */
      var v = lc[k];
      if (!v || typeof v !== "object") { out.atlanan++; return; }
      var id = dersId(k), tamam = !!(v.w && v.r && v.q && v.p);
      out.ilerleme[id] = { w: !!v.w, r: !!v.r, q: !!v.q, p: !!v.p, tarih: s(v.d) || null, tamam: tamam, kaynak: "ya_lc" };
      if (tamam) out.dersTamam[id] = true;
    });

    /* Soru bankası: yol başına toplu deneme (hedef soru-bankasi:<yol>) */
    var toplam = {};
    Object.keys(nesne(gs.st)).forEach(function (k) {
      var v = gs.st[k], yol = soruYol ? soruYol(+k) : null;
      if (!yol || !Array.isArray(v) || v.length !== 2 || !(v[0] >= 0) || !(v[1] >= v[0]) || !(v[1] > 0)) { out.atlanan++; return; }
      var t = toplam[yol] || (toplam[yol] = { ok: 0, n: 0 });
      t.ok += v[0] | 0; t.n += v[1] | 0;
    });
    Object.keys(toplam).forEach(function (yol) {
      out.denemeler.push({ id: "eski-gs-" + yol, hedef: "soru-bankasi:" + yol, varyant: null, puan: toplam[yol].ok, maks: toplam[yol].n, tarih: s(gs.ts), surum: ESKI_SURUM,
        yardim: { tur: "bilinmiyor", guvenilir: false }, dogrulama: "istemci", kaynak: "ya_gs" });
    });

    /* Seviye testi / yerleştirme: tanılama kanıtı */
    Object.keys(lv).forEach(function (yol) {
      var v = lv[yol];
      if (!v || !(v.m > 0) || !(v.s >= 0)) { out.atlanan++; return; }
      out.kanitlar.push({ id: "eski-lv-" + yol, tur: "tanilama", yol: yol, seviye: v.l | 0, oran: v.s / v.m, tarih: s(v.d), dogrulama: "istemci", kaynak: "ya_lv" });
    });
    Object.keys(pl).forEach(function (yol) {
      var v = pl[yol];
      if (!v || v.skip || typeof v.lv !== "number") return;   /* atlanmış yerleştirme kanıt değildir */
      out.kanitlar.push({ id: "eski-pl-" + yol, tur: "yerlestirme", yol: yol, seviye: v.lv, oran: v.n > 0 ? (v.ok | 0) / v.n : null, tarih: s(v.d), dogrulama: "istemci", kaynak: "ya_pl" });
    });
    return out;
  }

  /* Canlı okuma: gerçek depodan (yalnız getItem). soruYol uygulamadaki soru bankasından verilir. */
  function oku(depo, soruYol) {
    function j(k) { try { return JSON.parse(depo.getItem(k) || "null"); } catch (e) { return null; } }
    return cevir({ lc: j("ya_lc"), gs: j("ya_gs"), lv: j("ya_lv"), pl: j("ya_pl") }, soruYol);
  }

  O.eski = { SURUM: ESKI_SURUM, cevir: cevir, oku: oku, dersId: dersId };
})(typeof window !== "undefined" ? window : globalThis);

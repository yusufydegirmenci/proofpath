"use strict";
/* ---- Kalıcı depo: yalnız YENİ anahtar ya_pp_ogr. Mevcut depolama anahtarlarına yazmaz, hiçbir şeyi silmez. ----
   Biçim: {v:1, denemeler:[], kanitlar:[], projeler:{}}  (denemeler yalnız eklenir; düzeltme yeni kayıttır) */
(function (g) {
  var O = g.PP.ogr, KEY = "ya_pp_ogr", DOGRULAMA = { sunucu: 1, istemci: 1, beyan: 1 }, YARDIM = { yok: 1, ipucu: 1, ai: 1, bilinmiyor: 1 };

  function bos() { return { v: O.SURUM, denemeler: [], kanitlar: [], projeler: {} }; }
  function varsayilanDepo() { try { return g.localStorage || null; } catch (e) { return null; } }

  /* Okuma: bozuk/yabancı içerik hata fırlatmaz ve ÜZERİNE YAZILMAZ (bir sonraki yazma başarılıysa eski içerik zaten okunamadığı için kayıp sayılır;
     bu yüzden bozuk içerik "ya_pp_ogr_bozuk" altına bir kez yedeklenir). */
  function oku(depo) {
    depo = depo || varsayilanDepo();
    if (!depo) return bos();
    var ham = null;
    try { ham = depo.getItem(KEY); } catch (e) { return bos(); }
    if (!ham) return bos();
    try {
      var o = JSON.parse(ham);
      if (!o || typeof o !== "object" || !Array.isArray(o.denemeler)) throw new Error("biçim");
      o.kanitlar = Array.isArray(o.kanitlar) ? o.kanitlar : [];
      o.projeler = o.projeler && typeof o.projeler === "object" ? o.projeler : {};
      o.v = o.v || 1;
      return o;
    } catch (e) {
      try { if (!depo.getItem(KEY + "_bozuk")) depo.setItem(KEY + "_bozuk", ham); } catch (e2) { /* kota */ }
      return bos();
    }
  }
  function yaz(depo, d) {
    depo = depo || varsayilanDepo();
    if (!depo) return false;
    try { depo.setItem(KEY, JSON.stringify(d)); return true; } catch (e) { return false; }
  }

  /* Denemeyi doğrula ve normalleştir. Dönüş {ok, deneme} ya da {ok:false, neden}. */
  function normalle(d) {
    if (!d || typeof d !== "object") return { ok: false, neden: "bos" };
    if (typeof d.hedef !== "string" || !d.hedef) return { ok: false, neden: "hedef-yok" };
    if (!(typeof d.maks === "number" && d.maks > 0 && isFinite(d.maks))) return { ok: false, neden: "maks-gecersiz" };
    if (!(typeof d.puan === "number" && d.puan >= 0 && d.puan <= d.maks)) return { ok: false, neden: "puan-gecersiz" };
    var y = d.yardim && typeof d.yardim === "object" ? d.yardim : {};
    var tarih = typeof d.tarih === "string" && d.tarih ? d.tarih : new Date().toISOString();
    return { ok: true, deneme: {
      id: typeof d.id === "string" && d.id ? d.id : "d-" + tarih + "-" + d.hedef,
      hedef: d.hedef, varyant: d.varyant == null ? null : String(d.varyant), puan: d.puan, maks: d.maks, tarih: tarih,
      surum: d.surum == null ? null : String(d.surum),
      yardim: { tur: YARDIM[y.tur] ? y.tur : "bilinmiyor", guvenilir: false },   /* istemci yardım beyanı güvenilir sayılmaz */
      dogrulama: d.dogrulama === "beyan" ? "beyan" : "istemci",   /* "sunucu" istemci yazımında KABUL EDİLMEZ: yalnız sunucudan okunan kayıt güvenilir olabilir */
      kaynak: typeof d.kaynak === "string" ? d.kaynak.slice(0, 40) : "uygulama"
    } };
  }

  /* Ekle: aynı kimlikli kayıt varsa yenisi eskisini EZMEZ (kanıt değişmez). */
  function denemeEkle(deneme, depo) {
    var n = normalle(deneme);
    if (!n.ok) return n;
    var d = oku(depo);
    if (d.denemeler.some(function (x) { return x.id === n.deneme.id; })) return { ok: true, tekrar: true, deneme: n.deneme };
    d.denemeler.push(n.deneme);
    return yaz(depo, d) ? { ok: true, deneme: n.deneme } : { ok: false, neden: "yazilamadi" };
  }
  function projeIsaretle(projeId, bilgi, depo) {
    if (typeof projeId !== "string" || !projeId) return { ok: false, neden: "proje-yok" };
    var d = oku(depo), eski = d.projeler[projeId];
    if (eski && eski.bitti) return { ok: true, tekrar: true };
    d.projeler[projeId] = { bitti: true, tarih: (bilgi && bilgi.tarih) || new Date().toISOString(), dogrulama: "istemci" };
    return yaz(depo, d) ? { ok: true } : { ok: false, neden: "yazilamadi" };
  }
  function kanitEkle(k, depo) {
    if (!k || typeof k.tur !== "string" || !k.tur) return { ok: false, neden: "tur-yok" };
    var d = oku(depo), id = typeof k.id === "string" && k.id ? k.id : "k-" + k.tur + "-" + (k.kapi || "") + "-" + d.kanitlar.length;
    if (d.kanitlar.some(function (x) { return x.id === id; })) return { ok: true, tekrar: true };
    d.kanitlar.push({ id: id, tur: k.tur, kapi: k.kapi || null, hedef: k.hedef || null, tarih: k.tarih || new Date().toISOString(), dogrulama: k.dogrulama === "beyan" ? "beyan" : "istemci" });
    return yaz(depo, d) ? { ok: true } : { ok: false, neden: "yazilamadi" };
  }

  /* Tercihler (örn. açıklama modu): ya_pp_ogr.tercih altında; bilinmeyen alanlar korunur. */
  function tercih(ad, deger, depo) {
    var d = oku(depo), t = d.tercih && typeof d.tercih === "object" ? d.tercih : {};
    if (deger === undefined) return Object.prototype.hasOwnProperty.call(t, ad) ? t[ad] : null;
    t[ad] = deger; d.tercih = t;
    return yaz(depo, d);
  }
  /* Geri bildirim (Faz 12 V4, yalnız yerel): ya_pp_ogr.geriBildirim = {kuyruk:[], taslaklar:{anahtar: taslak}}. Argümansız okur, nesne verilirse yazar. */
  function geriBildirim(yeni, depo) {
    var d = oku(depo), gb = d.geriBildirim && typeof d.geriBildirim === "object" ? d.geriBildirim : {};
    gb.kuyruk = Array.isArray(gb.kuyruk) ? gb.kuyruk : [];
    gb.taslaklar = gb.taslaklar && typeof gb.taslaklar === "object" && !Array.isArray(gb.taslaklar) ? gb.taslaklar : {};
    if (yeni === undefined) return gb;
    d.geriBildirim = yeni;
    return yaz(depo, d);
  }
  /* Yalnız kullanıcının "Tümünü sıfırla" eylemi çağırır: ya_pp_ogr anahtarını kaldırır (bozuk yedeğe dokunmaz). */
  function sifirla(depo) {
    depo = depo || varsayilanDepo();
    if (!depo) return false;
    try { depo.removeItem(KEY); return true; } catch (e) { return false; }
  }

  O.depo = { varsayilan: varsayilanDepo, KEY: KEY, oku: oku, normalle: normalle, denemeEkle: denemeEkle, projeIsaretle: projeIsaretle, kanitEkle: kanitEkle, tercih: tercih, geriBildirim: geriBildirim, sifirla: sifirla };
})(typeof window !== "undefined" ? window : globalThis);

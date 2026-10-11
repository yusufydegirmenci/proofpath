"use strict";
/* ---- Paylaşılan cihaz: kullanıcılar arası yerel veri yalıtımı (M§8.9, P1-7) ----
   Uygulamanın yerel verisi (ya_* anahtarları) tek bir tarayıcı deposundadır. Hesap değişince önceki kullanıcının verisi SİLİNMEZ ama
   aktif alandan çıkarılıp o kullanıcının kimliğiyle ayrı bir sakla alanına (pp_stash:<uid>) alınır; yeni kullanıcı yalnız kendi saklasını görür.
   Sahipsiz (kimliksiz) ilk veri, ilk giriş yapan hesaba atanır (bu cihazın sahibi varsayımı; paylaşılan cihazda risk olarak raporlanır).
   Kuyruk (pp_kuyruk:<uid>) zaten kullanıcıya göre ayrıdır. Paylaşılan cihaz modu açıksa çıkışta bu hesabın yerel verisi ve kuyruğu temizlenir
   (önce dışa aktarma önerilir; uyarı arayüzdedir). Sunucuya yazmaz. */
(function (g) {
  var PP = g.PP = g.PP || {};
  var AKTIF = "pp_aktif_uid", STASH = "pp_stash:", PAYLASILAN = "pp_paylasilan_cihaz", KUYRUK = "pp_kuyruk:";

  function depoVar() { try { return g.localStorage || null; } catch (e) { return null; } }
  function anahtarlar(d) { var a = []; for (var i = 0; i < d.length; i++) a.push(d.key(i)); return a; }
  function yerel(k) { return /^ya_/.test(k); }

  /* Aktif hesabı bildirir. Dönüş {degisti:bool, onceki:uid|null, geriYuklenen:bool}. degisti=true ise uygulama yeniden yüklenmelidir. */
  function gec(uid, depo) {
    depo = depo || depoVar();
    if (!depo || !uid) return { degisti: false, onceki: null, geriYuklenen: false };
    var onceki = depo.getItem(AKTIF);
    if (onceki === uid) return { degisti: false, onceki: onceki, geriYuklenen: false };
    if (!onceki) { depo.setItem(AKTIF, uid); return { degisti: false, onceki: null, geriYuklenen: false, sahipsizAtandi: true }; }
    var paket = {};
    anahtarlar(depo).filter(yerel).forEach(function (k) { paket[k] = depo.getItem(k); });
    depo.setItem(STASH + onceki, JSON.stringify(paket));
    Object.keys(paket).forEach(function (k) { depo.removeItem(k); });
    var geri = false, st = depo.getItem(STASH + uid);
    if (st) { try { var o = JSON.parse(st); Object.keys(o).forEach(function (k) { if (yerel(k)) depo.setItem(k, o[k]); }); geri = true; } catch (e) { /* bozuk saklama: yeni kullanıcı temiz başlar */ } depo.removeItem(STASH + uid); }
    depo.setItem(AKTIF, uid);
    return { degisti: true, onceki: onceki, geriYuklenen: geri };
  }

  function paylasilan(deger, depo) {
    depo = depo || depoVar();
    if (!depo) return false;
    if (deger === undefined) return depo.getItem(PAYLASILAN) === "1";
    if (deger) depo.setItem(PAYLASILAN, "1"); else depo.removeItem(PAYLASILAN);
    return deger === true;
  }

  /* Çıkış: paylaşılan cihazda bu hesabın yerel verisi/kuyruğu/sakla alanı kaldırılır; değilse yalıtılmış olarak kalır. Dönüş {temizlendi, silinenAnahtar} */
  function cikis(uid, depo) {
    depo = depo || depoVar();
    if (!depo) return { temizlendi: false, silinenAnahtar: 0 };
    if (!paylasilan(undefined, depo)) return { temizlendi: false, silinenAnahtar: 0 };
    var n = 0;
    anahtarlar(depo).filter(function (k) { return yerel(k) || k === KUYRUK + uid || k === STASH + uid || k === AKTIF; }).forEach(function (k) { depo.removeItem(k); n++; });
    return { temizlendi: true, silinenAnahtar: n };
  }

  /* Çıkış öncesi uyarı: gönderilmemiş değişiklik sayısı */
  function bekleyenSayisi(uid, depo) {
    depo = depo || depoVar();
    try { var l = JSON.parse(depo.getItem(KUYRUK + uid) || "[]"); return Array.isArray(l) ? l.length : 0; } catch (e) { return 0; }
  }

  PP.cihaz = { gec: gec, paylasilan: paylasilan, cikis: cikis, bekleyenSayisi: bekleyenSayisi };
})(typeof window !== "undefined" ? window : globalThis);

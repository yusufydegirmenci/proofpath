/* FORNEX bitirme belgesi: doğrulama kodu = SHA-256("fornex-belge|ad|hat|tarih") ilk 12 hane. Sunucu gerektirmez;
   shortcut: kod gizli anahtarsız, kasıtlı bir sahte belge üretimini engellemez; belge "bağımsız eğitim belgesi"dir, resmî sertifika değildir. */
(function (g) {
  function norm(s) { return String(s == null ? "" : s).replace(/\s+/g, " ").trim(); }
  function kod(ad, hat, tarih) {
    var m = ["fornex-belge", norm(ad), norm(hat), norm(tarih)].join("|");
    return g.crypto.subtle.digest("SHA-256", new TextEncoder().encode(m)).then(function (b) {
      return Array.from(new Uint8Array(b)).map(function (x) { return ("0" + x.toString(16)).slice(-2); }).join("").slice(0, 12).toUpperCase();
    });
  }
  function dogrula(ad, hat, tarih, girilen) { return kod(ad, hat, tarih).then(function (k) { return k === norm(girilen).replace(/-/g, "").toUpperCase(); }); }
  function tarihGecerli(t) { return /^\d{4}-\d{2}-\d{2}$/.test(t) && !isNaN(Date.parse(t)); }
  g.PPBelge = { kod: kod, dogrula: dogrula, norm: norm, tarihGecerli: tarihGecerli };
})(typeof window !== "undefined" ? window : globalThis);

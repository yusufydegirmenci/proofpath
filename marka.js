/* Uygulamanın adı ve logosu TEK YERDEN buradan değişir.
 * Arayüzdeki tüm metinler, indirilen dosya adları ve kimlik kartı bu değerleri okur.
 * Statik dosyalar (index.html / 404.html başlığı, manifest.webmanifest) JS okuyamaz:
 * bu dosyayı değiştirdikten sonra `npm run marka` çalıştır, onları da eşitler. */
(function (g) {
  var M = {
    ad: "Proofpath",          // görünen ad
    kisaAd: "Proofpath",      // telefona yüklenince ikonun altında görünen ad (12 harfi geçmesin)
    dosya: "proofpath",       // indirilen dosyaların ön eki: <dosya>-yedek-2026-10-25.json
    logo: "ikon.svg"          // uygulama ikonu ve sekme simgesi (kare, en az 512x512)
  };
  M.buyuk = M.ad.toLocaleUpperCase("tr-TR");   // üst şerit ve kimlik kartındaki büyük harfli yazı
  g.PP_MARKA = M;
  if (typeof module === "object" && module.exports) module.exports = M;
})(typeof globalThis !== "undefined" ? globalThis : this);

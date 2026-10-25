/* Uygulamanın adı ve logosu TEK YERDEN buradan değişir.
 * Arayüzdeki tüm metinler, indirilen dosya adları ve kimlik kartı bu değerleri okur.
 * Statik dosyalar (index.html / 404.html başlığı, manifest.webmanifest) JS okuyamaz:
 * bu dosyayı değiştirdikten sonra `npm run marka` çalıştır, onları da eşitler. */
(function (g) {
  var M = {
    ad: "FORNEX",             // görünen ad
    kisaAd: "FORNEX",         // telefona yüklenince ikonun altında görünen ad (12 harfi geçmesin)
    dosya: "fornex",          // indirilen dosyaların ön eki: <dosya>-yedek-2026-10-25.json
    slogan: "Ideas take form.",
    logo: "ikon.svg",         // uygulama ikonu ve sekme simgesi (kare, en az 512x512)
    /* Katlanmış F amblemi (üst şerit, kimlik kartı). Kutu 0..100 x 0..146; her parça: köşeler + gradyan [x1,y1,x2,y2, renk1, renk2].
       marka/ klasöründeki SVG'ler aynı geometriden tools/marka-svg.py ile üretilir. */
    amblem: [
      ["0,49.2 100,0 100,33.3 0,81", [100, 0, 0, 80, "#5EB6FF", "#3B82F6"]],
      ["25.4,81 60.3,64.4 100,81 100,115.9", [25, 70, 100, 116, "#8B5CF6", "#A9A2FA"]],
      ["0,88.6 50.8,112.7 50.8,146 0,116.2", [0, 90, 51, 146, "#6366F1", "#8B5CF6"]]
    ]
  };
  M.buyuk = M.ad.toLocaleUpperCase("tr-TR");   // üst şerit ve kimlik kartındaki büyük harfli yazı
  g.PP_MARKA = M;
  if (typeof module === "object" && module.exports) module.exports = M;
})(typeof globalThis !== "undefined" ? globalThis : this);

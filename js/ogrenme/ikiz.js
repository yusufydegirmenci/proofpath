"use strict";
/* ---- Öğrenme ikizi (M§8.8): kanıta dayalı durum özeti — karar desteği, bilimsel kopya DEĞİL. Saf hesap, depolamaya yazmaz. ----
   Yalnız deneme kayıtlarını (PP.ogr.deg.hedefDurumu kuralları: öz-beyan sayılmaz, eski sürüm sayılmaz) ve verilen ölçülen değerleri kullanır.
   Her madde kanıtını taşır; tek deneme ya da doğrulanmamış kayıt "belirsiz"dir. Olasılık/kesin tarih üretmez. */
(function (g) {
  var PP = g.PP = g.PP || {}, O = PP.ogr;

  function kanit(d) { return { kaynak: "deneme kaydı", deneme: d.sayilan, oran: d.oran == null ? null : Math.round(d.oran * 100), esik: Math.round(d.esik * 100), guven: d.guven }; }

  /* girdi: {G, denemeler, yollar:[{id,ad,tamam,toplam}], gunKayit} → {yollar:[{...}], olculen, ekKanit:[]} */
  function durum(girdi) {
    var G = girdi.G, den = girdi.denemeler || [], out = { yollar: [], olculen: { denemeSayisi: den.length }, ekKanit: [] };
    (girdi.yollar || []).forEach(function (y) {
      var ids = Object.keys(G.hedefler).filter(function (k) { return k.indexOf("ders:" + y.id + ":") === 0 && /:sinav$/.test(k); })
        .sort(function (a, b) { return +a.split(":")[2] - +b.split(":")[2]; });
      var ds = ids.map(function (k) { return O.deg.hedefDurumu(G, k, den); }).filter(function (d) { return d.durum !== "denenmedi"; });
      var guclu = [], zayif = [], belirsiz = [];
      ds.forEach(function (d) {
        var k = kanit(d);
        if (d.durum === "kaldi") zayif.push({ hedef: d.hedef, ad: d.ad, kanit: k });
        else if (d.sayilan >= 2) guclu.push({ hedef: d.hedef, ad: d.ad, kanit: k });
        if (d.durum === "gecti" && d.sayilan < 2) belirsiz.push({ hedef: d.hedef, ad: d.ad, neden: "tek başarılı deneme: tesadüf olabilir", gerekenKanit: "aynı hedefte ikinci bir deneme (tercihen farklı gün)", kanit: k });
        if (d.guven === "istemci" && d.durum === "gecti") out.ekKanit.push({ hedef: d.hedef, metin: "Bu kayıt istemcide üretildi; sunucu doğrulaması yok." });
      });
      var ilkKalan = zayif[0] || null;
      out.yollar.push({
        id: y.id, ad: y.ad, tamam: y.tamam, toplam: y.toplam,
        veriYok: ds.length === 0,
        guclu: guclu, zayif: zayif, belirsiz: belirsiz,
        darbogaz: ilkKalan ? { hedef: ilkKalan.hedef, neden: "Başarısız son deneme: sıradaki konular önkoşul gereği bunu bekler", kanit: ilkKalan.kanit } : null
      });
    });
    var yoksa = out.yollar.filter(function (y) { return y.veriYok; }).length;
    if (yoksa) out.ekKanit.push({ metin: yoksa + " yolda deneme kaydı yok; bu yollar hakkında durum söylenemez." });
    return out;
  }

  PP.ikiz = { durum: durum };
})(typeof window !== "undefined" ? window : globalThis);

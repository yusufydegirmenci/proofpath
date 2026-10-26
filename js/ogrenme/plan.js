"use strict";
/* ALAN: Uyarlanabilir çalışma planı (PP.plan).
   NE YAPAR: Tekrar kuyruğu, yolun kalan konuları ve müsaitlikten saf hesapla hafta ARALIĞI planı çıkarır; tahmin ile ölçülen ayrı etiketlenir; depolamaya yazmaz.
   SORUN OLURSA: PP.ogr.tekrar ve önkoşul sıralamasına bağlıdır; arayüz js/atolye/plan-ui.js (ikiz.js ile birlikte). Kaçırılan gün cezasızdır, kesin tarih üretilmez.
   YENİ ÖZELLİK: Yeni varsayım/kural plan.js'e eklenir, plan-ui.js'te gösterilir; tests/faz7_plan.js güncellenir. */
/* ---- Uyarlanabilir plan (M§16, M§8.4) — saf hesap ----
   Girdi gerçek duruma bağlıdır: tekrar kuyruğu (PP.ogr.tekrar) + yoldaki kalan konular (sıralı önkoşul) + öğrencinin müsaitliği.
   İlkeler: tahmin ölçülenden ayrı etiketlenir; kesin tarih/olasılık yok (hafta ARALIĞI); varsayımlar listelenir;
   kaçırılan gün cezasız, aciliyet üretilmez; plan öğrencinin günlerini sessizce değiştirmez. Depolamaya yazmaz. */
(function (g) {
  var PP = g.PP = g.PP || {}, O = PP.ogr;

  var VARSAYILAN = { haftalikDk: 180, gunler: [1, 0, 1, 0, 1, 0, 0], tampon: 0.2, musaitDegil: [], yol: null };
  var DERS_DK = 30, TEKRAR_DK = 10, BELIRSIZLIK = 0.4, UFUK = 14;
  var VARSAYIMLAR = [
    "Her ders adımı için " + DERS_DK + " dakika varsayıldı (ders başına ölçülmüş süre kaydı yok).",
    "Her tekrar öğesi için " + TEKRAR_DK + " dakika varsayıldı.",
    "Süre tahminine ±%" + Math.round(BELIRSIZLIK * 100) + " belirsizlik payı eklendi (varsayım; ölçülmüş doğruluk değil).",
    "Tampon, günlük kapasiteden ayrılır ve zor konulara/telafiye kullanılır; plana doldurulmaz."
  ];

  function say(x) { return typeof x === "number" && isFinite(x) ? x : 0; }
  function gunNo(iso) { var d = new Date(String(iso) + "T00:00:00Z").getUTCDay(); return (d + 6) % 7; }   /* 0=Pzt … 6=Paz */

  /* Tercih doğrulama: geçersiz alanlar varsayılana düşer. */
  function tercihDogrula(t) {
    t = t && typeof t === "object" ? t : {};
    var gunler = Array.isArray(t.gunler) && t.gunler.length === 7 ? t.gunler.map(function (x) { return x ? 1 : 0; }) : VARSAYILAN.gunler.slice();
    var hd = say(t.haftalikDk), tm = typeof t.tampon === "number" ? t.tampon : VARSAYILAN.tampon;
    return {
      haftalikDk: hd >= 30 && hd <= 3000 ? Math.round(hd) : VARSAYILAN.haftalikDk,
      gunler: gunler.some(function (x) { return x; }) ? gunler : VARSAYILAN.gunler.slice(),
      tampon: tm >= 0 && tm <= 0.5 ? tm : VARSAYILAN.tampon,
      musaitDegil: Array.isArray(t.musaitDegil) ? t.musaitDegil.filter(function (s) { return /^\d{4}-\d{2}-\d{2}$/.test(s); }).slice(0, 60) : [],
      yol: typeof t.yol === "string" ? t.yol : null
    };
  }

  /* girdi: {bugun, tercih, tekrar:[{id,ad,dk?}], yollar:[{id,ad,kalan:[{id,ad,dk?}]}], gunKayit:{iso:dk}} (gunKayit ÖLÇÜLEN çalışma dakikası) */
  function kur(girdi) {
    var tc = tercihDogrula(girdi && girdi.tercih), bugun = girdi.bugun, gk = girdi.gunKayit || {};
    var yol = (girdi.yollar || []).filter(function (y) { return !tc.yol || y.id === tc.yol; })[0] || null;
    var aktifGun = tc.gunler.reduce(function (a, x) { return a + x; }, 0);
    var gunKap = Math.floor(tc.haftalikDk / aktifGun * (1 - tc.tampon)), gunTampon = Math.round(tc.haftalikDk / aktifGun * tc.tampon);

    /* Kaçırılan: son 7 günde (bugün hariç) planlı olup hiç çalışma kaydı olmayan, müsaitsiz olmayan günler. Cezasız. */
    var kacirilan = [];
    for (var i = 7; i >= 1; i--) {
      var gd = O.gun.ekle(bugun, -i);
      if (tc.gunler[gunNo(gd)] && tc.musaitDegil.indexOf(gd) < 0 && !say(gk[gd])) kacirilan.push(gd);
    }
    var yumusak = kacirilan.length >= 2;   /* 2+ kaçırılan günden sonra ilk gün hafif başlar (rutin, düşük riskli ayar; öğrenci görür) */

    var isler = [];
    (girdi.tekrar || []).forEach(function (t) { isler.push({ id: "tekrar:" + t.id, ad: t.ad || t.id, tur: "tekrar", dk: say(t.dk) > 0 ? t.dk : TEKRAR_DK, olculen: say(t.dk) > 0, neden: "Vadesi gelmiş tekrar/telafi" }); });
    var kalan = yol ? yol.kalan || [] : [];
    kalan.forEach(function (k, i) { isler.push({ id: "ders:" + k.id, ad: k.ad || k.id, tur: "ders", dk: say(k.dk) > 0 ? k.dk : DERS_DK, olculen: say(k.dk) > 0, neden: i === 0 ? "Yoldaki sıradaki konu (önkoşullar tamam)" : "Önkoşul sırası: önceki konudan sonra" }); });

    var gunler = [], i2 = 0, ilkGun = true;
    for (var d = 0; d < UFUK && i2 < isler.length; d++) {
      var gd2 = O.gun.ekle(bugun, d);
      if (!tc.gunler[gunNo(gd2)] || tc.musaitDegil.indexOf(gd2) >= 0) continue;
      var cap = ilkGun && yumusak ? Math.floor(gunKap * 0.6) : gunKap, doldu = 0, liste = [];
      while (i2 < isler.length && (liste.length === 0 || doldu + isler[i2].dk <= cap)) {
        var it = isler[i2++]; liste.push(it); doldu += it.dk;
      }
      gunler.push({ tarih: gd2, dk: doldu, kapasite: cap, tampon: gunTampon, ogeler: liste, uzun: liste.some(function (x) { return x.dk > cap; }) });
      ilkGun = false;
    }

    var toplamDk = isler.reduce(function (a, x) { return a + x.dk; }, 0);
    var haftaKap = Math.max(1, gunKap * aktifGun);
    var tahmin = toplamDk > 0
      ? { tur: "tahmin", kalanDk: toplamDk, haftaAraligi: [Math.max(1, Math.ceil(toplamDk * (1 - BELIRSIZLIK) / haftaKap)), Math.max(1, Math.ceil(toplamDk * (1 + BELIRSIZLIK) / haftaKap))],
          not: "Aralık varsayımlara dayanır; kesin tarih değildir." }
      : { tur: "tahmin", kalanDk: 0, haftaAraligi: null, not: "Planlanacak kalan iş görünmüyor." };
    var olculen = { tur: "olculen", sonYediGunDk: [1, 2, 3, 4, 5, 6, 7].reduce(function (a, n) { return a + say(gk[O.gun.ekle(bugun, -n)]); }, 0), aktifGun: [1, 2, 3, 4, 5, 6, 7].filter(function (n) { return say(gk[O.gun.ekle(bugun, -n)]) > 0; }).length };
    return {
      bugun: bugun, tercih: tc, yol: yol ? { id: yol.id, ad: yol.ad } : null, gunler: gunler, isSayisi: isler.length,
      varsayimlar: VARSAYIMLAR.slice(), tahmin: tahmin, olculen: olculen,
      telafi: { kacirilanGun: kacirilan.length, gunler: kacirilan, ceza: false, yumusakBaslangic: yumusak,
        metin: kacirilan.length ? kacirilan.length + " planlı gün çalışılmadı; ceza ya da aciliyet yok. Kalan iş yeniden dağıtıldı" + (yumusak ? ", ilk gün hafif başlıyor." : ".") : "Kaçırılan planlı gün yok." },
      gerekce: gunler.length ? "Sıra: önce vadesi gelen tekrar/telafi, sonra yoldaki konular önkoşul sırasıyla. Günlük kapasite = haftalık dakika × (1 − tampon) ÷ aktif gün." : "Planlanacak iş ya da müsait gün yok."
    };
  }

  /* Alternatif takvimler: aynı iş, farklı müsaitlik. Hepsi TAHMİN; varsayımlarıyla birlikte. */
  function karsilastir(girdi, secenekler) {
    var tc = tercihDogrula(girdi.tercih);
    secenekler = secenekler && secenekler.length >= 2 ? secenekler : [
      { ad: "Mevcut tercihin", degis: {} },
      { ad: "Haftada %50 fazla dakika", degis: { haftalikDk: Math.round(tc.haftalikDk * 1.5) } },
      { ad: "Haftada %50 az dakika", degis: { haftalikDk: Math.round(tc.haftalikDk * 0.5) } }
    ];
    return secenekler.map(function (s) {
      var t = {}; Object.keys(tc).forEach(function (k) { t[k] = tc[k]; }); Object.keys(s.degis || {}).forEach(function (k) { t[k] = s.degis[k]; });
      var p = kur({ bugun: girdi.bugun, tercih: t, tekrar: girdi.tekrar, yollar: girdi.yollar, gunKayit: girdi.gunKayit });
      return { ad: s.ad, haftalikDk: p.tercih.haftalikDk, aktifGun: p.tercih.gunler.reduce(function (a, x) { return a + x; }, 0), tahmin: p.tahmin, varsayimlar: p.varsayimlar, ilkGun: p.gunler[0] ? p.gunler[0].tarih : null };
    });
  }

  PP.plan = { VARSAYILAN: VARSAYILAN, DERS_DK: DERS_DK, TEKRAR_DK: TEKRAR_DK, BELIRSIZLIK: BELIRSIZLIK, tercihDogrula: tercihDogrula, kur: kur, karsilastir: karsilastir, gunNo: gunNo };
})(typeof window !== "undefined" ? window : globalThis);

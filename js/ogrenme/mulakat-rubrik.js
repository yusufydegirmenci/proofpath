"use strict";
/* ALAN: Mülakat Antrenmanı rubrik sonucu ve tekrarlayan zayıflık (PP.mulakat).
   NE YAPAR: Mevcut mülakat ekranına rubrik ölçütleriyle sonuç kaydeder; aksan, uzunluk, özgüven puanlanmaz; kaynak (öz/insan/yapay zekâ) etiketlidir.
   SORUN OLURSA: Kayıt ya_pp_ogr.tercih.mulakat (son 30). Arayüz js/proje/rapor-ui.js (renderRubrikPaneli, ivRubrikKaydet); ekran js/mulakat/sinav-haritasi.js'te.
   YENİ ÖZELLİK: Yeni ölçüt KRITERLER'e eklenir, rapor-ui.js'te gösterilir; tests/faz8_kariyer.js güncellenir. */
/* ---- Mülakat rubrik sonucu ve tekrarlayan zayıflık (M§8.7) — mevcut "Mülakat Antrenmanı"na eklenir, onu çoğaltmaz ----
   Değerlendirme yalnız rubrik ölçütleriyle yapılır; aksan, söz uzunluğu, özgüven ya da üslup puanlanmaz.
   Sonuç kaynağı etiketlidir (öz/insan/yapay zekâ); hiçbiri işe alım sonucu garantisi değildir. Kayıt: ya_pp_ogr.tercih.mulakat (son 30). */
(function (g) {
  var PP = g.PP = g.PP || {}, O = PP.ogr;

  var KRITERLER = [
    ["kavram", "Kavram doğruluğu", "ders", "Konunun mini sınavına ve açıklama modlarına dön"],
    ["uygulama", "Uygulayarak açıklama (ezber tanım değil)", "atolye", "Atölye'de alıştırma çöz, sonra örnekle anlat"],
    ["karar", "Tasarım kararı ve ödünleşim (trade-off)", "proje", "Proje adımında bir kararını gerekçesiyle yaz"],
    ["hata", "Hata ayıklama yaklaşımı", "atolye", "Hata defterinden bir hatayı kök nedenle yeniden çöz"],
    ["guvenlik", "Güvenlik ve test düşüncesi", "ders", "Siber/QA yolundaki ilgili konuyu tekrar et"],
    ["degisen", "Değişen gereksinime uyum", "proje", "Aynı projede bir gereksinimi değiştirip yeniden tasarla"]
  ];
  var SINIRLAMA = "Yalnız rubrik ölçütleri puanlanır; aksan, söz uzunluğu, özgüven ve üslup puanlanmaz. Geri bildirim (öz, insan ya da yapay zekâ) işe alım sonucu garantisi değildir.";
  var KAYNAK = { oz: "Öz değerlendirme", insan: "İnsan geri bildirimi", ai: "Yapay zekâ geri bildirimi (insan değil)" };

  function sonucYap(g0) {
    if (!g0 || typeof g0 !== "object") return { ok: false, neden: "bos" };
    var puanlar = {}, n = 0, top = 0;
    for (var i = 0; i < KRITERLER.length; i++) {
      var k = KRITERLER[i][0], v = g0.puanlar ? g0.puanlar[k] : undefined;
      if (v === undefined || v === null) continue;
      if (!(typeof v === "number" && v >= 0 && v <= 4 && v === Math.floor(v))) return { ok: false, neden: "puan-gecersiz", kriter: k };
      puanlar[k] = v; n++; top += v;
    }
    if (!n) return { ok: false, neden: "puan-yok" };
    var kaynak = KAYNAK[g0.kaynak] ? g0.kaynak : "oz";
    var tarih = typeof g0.tarih === "string" && /^\d{4}-\d{2}-\d{2}/.test(g0.tarih) ? g0.tarih.slice(0, 10) : O.gun.bugun();
    return { ok: true, sonuc: { id: typeof g0.id === "string" && g0.id ? g0.id : "m-" + tarih + "-" + n + "-" + top, tarih: tarih, rol: typeof g0.rol === "string" ? g0.rol.slice(0, 20) : null, puanlar: puanlar, ortalama: Math.round(top / n * 100) / 100, kaynak: kaynak, kaynakAd: KAYNAK[kaynak], sinirlama: SINIRLAMA } };
  }

  function oku() { var l = null; try { l = O.depo.tercih("mulakat"); } catch (e) { l = null; } return Array.isArray(l) ? l : []; }
  function kaydet(g0) {
    var r = sonucYap(g0);
    if (!r.ok) return r;
    var l = oku();
    if (l.some(function (x) { return x.id === r.sonuc.id; })) return { ok: true, tekrar: true, sonuc: r.sonuc };
    l.push(r.sonuc); l = l.slice(-30);
    return O.depo.tercih("mulakat", l) === true ? { ok: true, sonuc: r.sonuc } : { ok: false, neden: "yazilamadi" };
  }

  /* Tekrarlayan zayıflık: son 5 mülakatın en az 2'sinde puan ≤ 1 olan ölçüt; her biri telafi eylemine bağlı (Koç/gezinme biçiminde) */
  function zayiflik(liste) {
    var son = (liste || oku()).slice(-5), out = [];
    KRITERLER.forEach(function (k) {
      var kez = son.filter(function (s) { return s.puanlar && typeof s.puanlar[k[0]] === "number" && s.puanlar[k[0]] <= 1; });
      if (kez.length >= 2) out.push({ kriter: k[0], ad: k[1], kez: kez.length, toplam: son.length, son: kez[kez.length - 1].tarih, telafi: { metin: k[3], eylem: { tip: "sekme", sekme: k[2] } } });
    });
    return out;
  }

  PP.mulakat = { KRITERLER: KRITERLER, SINIRLAMA: SINIRLAMA, KAYNAK: KAYNAK, sonucYap: sonucYap, oku: oku, kaydet: kaydet, zayiflik: zayiflik };
})(typeof window !== "undefined" ? window : globalThis);

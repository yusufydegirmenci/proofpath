"use strict";
/* ---- Kapılar (M§6.1–6.2): önkoşul, eşik, kritik hedefler tek tek, kanıt, her kilidin nedeni ----
   İki ayrı katman: (1) İLERLEME = sayfa/ders açma (dersAcik), (2) USTALIK = kanıtla kapı geçme (degerlendir).
   Sayfa açmak ya da düğmeye basmak ustalık sayılmaz. İstemci tarafı kapı güvenli yetkilendirme DEĞİLDİR (bkz. sunucu taslağı). */
(function (g) {
  var O = g.PP.ogr, D = O.deg;

  function neden(kod, mesaj, ref) { return { kod: kod, mesaj: mesaj, ref: ref || null }; }
  function yz(x) { return Math.round(x * 100); }

  /* durum: {denemeler:[], projeler:{projeId:{bitti:true, dogrulama, tarih}}, kanitlar:[{tur,kapi,dogrulama}]} */
  function degerlendir(G, kapiId, durum, sec, _yigin) {
    sec = sec || {};
    var K = G.kapilar[kapiId];
    if (!K) throw new Error("PP.ogr: bilinmeyen kapı " + kapiId);
    _yigin = _yigin || [];
    if (_yigin.indexOf(kapiId) >= 0) return { kapi: kapiId, acik: false, nedenler: [neden("dongu", "Kapı önkoşulları döngü oluşturuyor: " + _yigin.concat(kapiId).join(" → "))], ilerleme: {} };
    var sunucu = K.sunucuDogrulamasi || sec.sunucuGerek, nedenler = [], bilgi = [];
    var dsec = { sunucuGerek: sunucu, bagimsizGerek: K.bagimsizGerek };

    K.onkosulKapilar.forEach(function (p) {
      var r = degerlendir(G, p, durum, sec, _yigin.concat(kapiId));
      if (!r.acik) nedenler.push(neden("onkosul-kapi", "Önkoşul kapı geçilmedi: " + (G.kapilar[p].ad || p), p));
    });
    (K.onkosulYetkinlikler || []).forEach(function (y) {
      var s = D.yetkinlikDurumu(G, y, durum.denemeler, dsec);
      if (!s.gecti) nedenler.push(neden("onkosul-yetkinlik", "Önkoşul yetkinlik tamam değil: " + ((G.yetkinlikler[y] || {}).ad || y), y));
    });

    var hs = K.hedefler.map(function (k) { return D.hedefDurumu(G, k, durum.denemeler, dsec); });
    hs.forEach(function (x) {
      if (x.kritik) {
        if (x.durum === "denenmedi") nedenler.push(neden("kritik-denenmedi", "Kritik hedef henüz denenmedi: " + x.ad, x.hedef));
        else if (x.durum === "kaldi" || x.oran + 1e-9 < Math.max(x.esik, K.esik != null ? K.esik : 0)) nedenler.push(neden("kritik-basarisiz", "Kritik hedef geçilmedi: " + x.ad + " %" + yz(x.oran) + " (en az %" + yz(x.esik) + "). Ortalama bunu telafi etmez.", x.hedef));
      } else if (x.durum === "denenmedi") nedenler.push(neden("hedef-denenmedi", "Hedef henüz denenmedi: " + x.ad, x.hedef));
      if (x.gecmis.length && x.durum === "denenmedi") {
        x.gecmis.forEach(function (gm) {
          if (gm.neden === "sunucu-dogrulamasi-yok") nedenler.push(neden("sunucu-dogrulama-yok", "Bu kapı sunucuda doğrulanmış sonuç ister; yalnız istemci kaydı var: " + x.ad, x.hedef));
          else if (gm.neden === "bagimsizlik-kaniti-yok") nedenler.push(neden("bagimsizlik-kaniti-yok", "Yardımsız yapıldığına dair güvenilir kayıt yok: " + x.ad, x.hedef));
          else if (gm.neden === "eski-surum") nedenler.push(neden("surum-eski", "Kanıt eski müfredat sürümünden (korundu, sayılmadı): " + x.ad, x.hedef));
        });
      }
      if (x.guven === "istemci" && x.durum === "gecti") bilgi.push(neden("dogrulanmamis", "Sonuç istemcide kaydedildi, sunucuda doğrulanmadı: " + x.ad, x.hedef));
    });
    /* Kritik olmayan hedefler: hepsi denenmiş ve ortalama eşik üstünde olmalı (kritik başarısızlık ortalamayla örtülmez). */
    var krit = hs.filter(function (x) { return !x.kritik && x.oran != null; });
    if (krit.length) {
      var ort = krit.reduce(function (a, x) { return a + x.oran; }, 0) / krit.length, e = K.esik != null ? K.esik : O.ESIK;
      if (ort + 1e-9 < e) nedenler.push(neden("esik-altinda", "Kritik olmayan hedeflerin ortalaması %" + yz(ort) + " (en az %" + yz(e) + ").", kapiId));
    }

    var cp = K.cekirdekProjeler || [];
    if (cp.length || K.minCekirdekProje) {
      var gerek = K.minCekirdekProje != null ? K.minCekirdekProje : O.CEKIRDEK_PROJE;
      if (cp.length < gerek) nedenler.push(neden("proje-tanimi-eksik", "Bu kapı için yalnız " + cp.length + "/" + gerek + " çekirdek proje tanımlı (içerik eksik).", kapiId));
      var bitti = cp.filter(function (p) {
        var x = (durum.projeler || {})[p];
        return x && x.bitti && (!sunucu || x.dogrulama === "sunucu");
      });
      if (bitti.length < gerek) nedenler.push(neden("proje-eksik", "Çekirdek proje: " + bitti.length + "/" + gerek + " tamam." + (sunucu ? " (sunucuda doğrulanmış olmalı)" : ""), kapiId));
    }
    (K.gereksinimler || []).forEach(function (gr) { /* Joker: her gereksinim türü ayrı kanıt ister */
      var var_ = (durum.kanitlar || []).some(function (k) { return k.kapi === kapiId && k.tur === gr && (!sunucu || k.dogrulama === "sunucu"); });
      if (!var_) nedenler.push(neden("kanit-yok", "Gerekli kanıt yok: " + gr, gr));
    });

    return { kapi: kapiId, ad: K.ad || kapiId, seviye: K.seviye || null, acik: nedenler.length === 0, nedenler: nedenler, bilgi: bilgi,
      ilerleme: { hedefGecen: hs.filter(function (x) { return x.durum === "gecti"; }).length, hedefToplam: hs.length } };
  }

  /* İlerleme katmanı: ders açma. Önceki ders tamamlandıysa sonraki açılır (mevcut sıralı kilit davranışı korunur).
     Yeni biçimli kritik başarısızlık varsa sonraki ders bloklanır; eski kayıtlarda (hedef denemesi yok) engellenmez ve "eski kayıt" etiketi alır.
     Dönüş.ustalik: dersin kanıta dayalı durumu (acik ile karıştırılmaz). */
  function dersAcik(G, dersId, durum, sec) {
    var d = G.dersler[dersId];
    if (!d) throw new Error("PP.ogr: bilinmeyen ders " + dersId);
    var nedenler = [], bilgi = [];
    var onceki = d.onceki ? G.dersler[d.onceki] : null;
    if (onceki) {
      var tamam = !!((durum.dersTamam || {})[onceki.id]);
      if (!tamam) nedenler.push(neden("onceki-ders-bitmedi", "Önce \"" + (onceki.ad || onceki.id) + "\" dersini bitir (ısınma, oku, mini sınav, alıştırma).", onceki.id));
      (onceki.yetkinlikler || []).forEach(function (y) {
        var s = D.yetkinlikDurumu(G, y, durum.denemeler, sec);
        s.kritikBasarisiz.forEach(function (h) { nedenler.push(neden("kritik-basarisiz", "\"" + (onceki.ad || onceki.id) + "\" dersinde kritik hedef geçilmedi: " + (G.hedefler[h].ad || h) + ". Önce telafi et.", h)); });
        if (tamam && !s.gecti && !s.kritikBasarisiz.length) bilgi.push(neden(s.eksik.length === s.hedefler.length ? "eski-kayit" : "ustalik-tamam-degil", "\"" + (onceki.ad || onceki.id) + "\" tamamlandı ama ustalık kanıtı eksik/doğrulanmadı.", y));
      });
    }
    return { ders: dersId, acik: nedenler.length === 0, nedenler: nedenler, bilgi: bilgi, ustalik: ustalik(G, dersId, durum, sec) };
  }
  function ustalik(G, dersId, durum, sec) {
    var d = G.dersler[dersId], ys = d.yetkinlikler || [];
    var ss = ys.map(function (y) { return D.yetkinlikDurumu(G, y, durum.denemeler, sec); });
    var denenmis = ss.some(function (s) { return s.hedefler.some(function (h) { return h.durum !== "denenmedi"; }); });
    return { durum: !ss.length ? "olcut-yok" : !denenmis ? "kanit-yok" : ss.every(function (s) { return s.gecti; }) ? "gecti" : ss.some(function (s) { return s.kritikBasarisiz.length; }) ? "kritik-basarisiz" : "kismi", guven: ss.length && denenmis ? (ss.every(function (s) { return s.hedefler.every(function (h) { return h.guven !== "istemci"; }); }) ? "sunucu" : "istemci") : "yok" };
  }

  /* ---- Kapı üreticileri (M§6.1) ---- */
  /* L5 Kademe Altın Vuruşu: kademenin 4 çekirdek projesi + kademenin kritik değerlendirmeleri. */
  function kademeAltin(G, o) {
    return O.graf.kapiEkle(G, { id: o.id, ad: o.ad, seviye: "L5", kademe: o.kademe, hedefler: o.hedefler || [], cekirdekProjeler: o.cekirdekProjeler || [], minCekirdekProje: o.minCekirdekProje != null ? o.minCekirdekProje : O.CEKIRDEK_PROJE,
      onkosulKapilar: o.onkosulKapilar || [], onkosulYetkinlikler: o.onkosulYetkinlikler || [], esik: o.esik, sunucuDogrulamasi: !!o.sunucuDogrulamasi, bagimsizGerek: o.bagimsizGerek !== false });
  }
  /* L6 Bütünleşik: tanımlı önkoşul kapıların (kademeler/alanlar) hepsi. */
  function butunlesik(G, o) {
    if (!o.onkosulKapilar || o.onkosulKapilar.length < 2) throw new Error("PP.ogr: bütünleşik kapı en az iki önkoşul kapı ister");
    return O.graf.kapiEkle(G, { id: o.id, ad: o.ad, seviye: "L6", hedefler: o.hedefler || [], onkosulKapilar: o.onkosulKapilar, onkosulYetkinlikler: o.onkosulYetkinlikler || [], esik: o.esik, sunucuDogrulamasi: !!o.sunucuDogrulamasi, bagimsizGerek: o.bagimsizGerek !== false });
  }
  /* L7 Joker: önkoşul kapılar + her gereksinim türü için ayrı kanıt (şablon tamamlamak yetmez). */
  function joker(G, o) {
    return O.graf.kapiEkle(G, { id: o.id, ad: o.ad, seviye: "L7", hedefler: o.hedefler || [], onkosulKapilar: o.onkosulKapilar || [], gereksinimler: (o.gereksinimler || O.JOKER_GEREKLER).slice(), sunucuDogrulamasi: !!o.sunucuDogrulamasi, bagimsizGerek: true });
  }

  /* Mini sınav kapısı (Faz 4 kararı): tüm sorular cevaplanmış VE doğru oranı ≥ eşik (varsayılan %80).
     Bu kapı İLERLEME bayrağını ("q") açar; ustalık ayrıca kanıtla (deneme kaydı) değerlendirilir.
     Sorusuz derste kapı açıktır (eski davranış). Dönüş {gecti, oran, esik, eksik, neden}. */
  function miniSinav(dogru, toplam, cevaplanan, esik) {
    esik = esik != null ? esik : O.ESIK;
    if (!(toplam > 0)) return { gecti: true, oran: null, esik: esik, eksik: 0, neden: "soru-yok" };
    var cev = cevaplanan != null ? cevaplanan : toplam, eksik = Math.max(0, toplam - cev), r = dogru / toplam;
    if (eksik) return { gecti: false, oran: r, esik: esik, eksik: eksik, neden: "cevaplanmadi" };
    return { gecti: r + 1e-9 >= esik, oran: r, esik: esik, eksik: 0, neden: r + 1e-9 >= esik ? null : "esik-altinda" };
  }

  /* Rütbe kapısı koşulları (g1–g4). tanim: {q, acc, les, proj, lv, mock, mn}; olcum: {soru:{n,acc}, ders, proje, seviyeTesti:bool, prova:{n,avg}}.
     Dönüş [{t, have, ok}] (metin ve sıra eski gateList ile aynı). */
  function rutbeKosullari(tanim, olcum) {
    var Gt = tanim, m = olcum, L = [];
    if (!Gt) return L;
    L.push({ t: Gt.q + " soruda en az %" + Math.round(Gt.acc * 100) + " doğruluk", have: m.soru.n + " soru, %" + Math.round(m.soru.acc * 100), ok: m.soru.n >= Gt.q && m.soru.acc >= Gt.acc });
    L.push({ t: Gt.les + " ders tamamla", have: m.ders + " ders", ok: m.ders >= Gt.les });
    if (Gt.proj) L.push({ t: Gt.proj + " proje bitir", have: m.proje + " proje", ok: m.proje >= Gt.proj });
    if (Gt.lv) L.push({ t: "Bir seviye testinde 2/3", have: m.seviyeTesti ? "tamam" : "henüz yok", ok: !!m.seviyeTesti });
    if (Gt.mn) L.push({ t: Gt.mn + " mülakat provasında ortalama " + Gt.mock, have: m.prova.n + " prova, ort. " + (Math.round(m.prova.avg * 10) / 10), ok: m.prova.n >= Gt.mn && m.prova.avg >= Gt.mock });
    return L;
  }

  O.kapi = { degerlendir: degerlendir, dersAcik: dersAcik, ustalik: ustalik, kademeAltin: kademeAltin, butunlesik: butunlesik, joker: joker, miniSinav: miniSinav, rutbeKosullari: rutbeKosullari };
})(typeof window !== "undefined" ? window : globalThis);

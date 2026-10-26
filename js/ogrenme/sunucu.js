"use strict";
/* ---- Güvenilir sınav yolu (Faz 9 sunucu) ----
   Ustalığa/kapıya sayılan sınavlarda (ders mini sınavı, seviye sınavı, Veri Analitiği sınavları) cevap anahtarı bu dosyada da içerikte de YOK:
   istemci yalnız cevaplarını claude.use("ogr") → ogr_deneme_gonder'e yollar; puanı ve geçti kararını sunucu verir. Kapı kararı: ogr_kapi_degerlendir.
   Sunucu cevap anahtarını ve açıklamaları yalnız GEÇİNCE döndürür; kalınca yalnız puan/doğru sayısı gelir.
   Yerel kayıt (ya_pp_ogr) sunucu yanıtının ÖNBELLEĞİDİR (dogrulama:"sunucu"); kullanıcı denetimindedir, güvenilir karar sunucudadır.
   Durum/neden kodları → Türkçe mesaj: çevrimdışı, misafir, oturum, yetenek yok, sunucu hazır değil, çok sık deneme. */
(function (g) {
  var O = g.PP.ogr, AYAR = { istemci: null, cevrimici: null, oturum: null }, KAPI_ONBELLEK = {}, KAPI_SURE = 60000;

  var MESAJ = {
    cevrimdisi: "Çevrimdışısın. Sınav puanı sunucuda hesaplanır; bağlantı gelince yeniden gönder. Şimdilik bu deneme ustalığa sayılmaz.",
    misafir: "Misafir görünümünde ya da hesapsızken sınav puanlanmaz. Hesabınla giriş yaptığında cevapların sunucuda doğrulanır ve ustalığa sayılır.",
    oturum: "Oturumun doğrulanamadı. Çıkış yapıp yeniden giriş yap, sonra tekrar dene. Bu deneme ustalığa sayılmadı.",
    "yetenek-yok": "Bu ortamda sınav sunucusu yok; bu deneme ustalığa sayılmaz.",
    "sunucu-hazir-degil": "Sınav sunucusu henüz hazır değil; bu deneme ustalığa sayılmaz. Daha sonra yeniden dene.",
    "cok-sik": "Bu sınava saatte en çok 5 kez girilebilir. Biraz bekleyip yeniden dene; bu arada dersi tekrar oku.",
    varyant: "Sunucu bu sınav için başka bir soru seti istedi. Sayfayı yenileyip yeniden dene.",
    hata: "Sunucuya ulaşılamadı; bu deneme ustalığa sayılmadı. Yeniden dene.",
    gecersiz: "Cevaplar eksik ya da geçersiz."
  };
  function hata(neden, ek) { var o = { ok: false, neden: neden, mesaj: MESAJ[neden] || MESAJ.hata }; if (ek) for (var k in ek) o[k] = ek[k]; return o; }

  /* Ortam/test enjeksiyonu: istemci() → ogr yetenek nesnesi (ya da söz), cevrimici() → bool, oturum() → bool */
  function yapilandir(a) { AYAR = { istemci: (a && a.istemci) || null, cevrimici: (a && a.cevrimici) || null, oturum: (a && a.oturum) || null }; KAPI_ONBELLEK = {}; }
  function cevrimici() { if (AYAR.cevrimici) return !!AYAR.cevrimici(); return !(g.navigator && g.navigator.onLine === false); }
  function oturumVar() {
    if (AYAR.oturum) return !!AYAR.oturum();
    try { return !(typeof S !== "undefined" && S && S.guest); } catch (e) { return true; }
  }
  function istemciAl() {
    var c = null;
    try { c = AYAR.istemci ? AYAR.istemci() : (g.claude && typeof g.claude.use === "function" ? g.claude.use("ogr") : null); } catch (e) { c = null; }
    return Promise.resolve(c).then(function (x) { return x && typeof x.gonder === "function" ? x : null; }, function () { return null; });
  }

  /* Sunucu/ağ hatasını kodlu nedene çevir */
  function eslestir(e) {
    var kod = e && (e.code != null ? e.code : e.status), msg = String((e && (e.message || e.details)) || e || "");
    if (kod === "54000" || /cok sik deneme/.test(msg)) return hata("cok-sik");
    if (kod === "28000" || kod === 401 || /oturum gerekli|JWT/i.test(msg)) return hata("oturum");
    if (kod === "PGRST202" || kod === "42883" || kod === 404 || /bilinmeyen hedef|soru yok|Could not find the function|does not exist/i.test(msg)) return hata("sunucu-hazir-degil");
    if ((typeof TypeError !== "undefined" && e instanceof TypeError) || /Failed to fetch|NetworkError|network|timeout/i.test(msg)) return hata("cevrimdisi");
    return hata("hata");
  }

  function sayi(x) { return typeof x === "number" && isFinite(x); }
  /* Açıklama önbelleği (yalnız GEÇİLEN sınavda sunucunun açtığı anahtar/açıklama): ya_pp_ogr.tercih.sinavAcik[hedef] */
  function acikOku() { var o = null; try { o = O.depo.tercih("sinavAcik"); } catch (e) { o = null; } return o && typeof o === "object" && !Array.isArray(o) ? o : {}; }
  function acikYaz(hedef, sonuc) {
    var o = acikOku(); o[hedef] = { tarih: new Date().toISOString(), surum: sonuc.surum || null, sorular: sonuc.anahtar };
    try { O.depo.tercih("sinavAcik", o); } catch (e) { /* kota */ }
  }
  function aciklama(hedef) { var k = acikOku()[hedef]; return k && k.sorular && typeof k.sorular === "object" ? k.sorular : null; }

  /* girdi: {hedef, varyant, cevaplar:{soru_id: seçenek metni}, yardim?:{tur}}.
     Dönüş (söz): {ok:true, puan, maks, oran, gecti, dogruSayisi, soruSayisi, esik, surum, anahtar|null}  ya da  {ok:false, neden, mesaj} */
  function gonder(girdi) {
    var c = girdi && girdi.cevaplar;
    if (!girdi || typeof girdi.hedef !== "string" || !girdi.hedef || typeof girdi.varyant !== "string" || !c || typeof c !== "object" || Array.isArray(c) || !Object.keys(c).length) return Promise.resolve(hata("gecersiz"));
    var temiz = {}, gecerli = true;
    Object.keys(c).forEach(function (k) { if (typeof c[k] === "string") temiz[k] = c[k]; else gecerli = false; });
    if (!gecerli) return Promise.resolve(hata("gecersiz"));
    if (!cevrimici()) return Promise.resolve(hata("cevrimdisi"));
    if (!oturumVar()) return Promise.resolve(hata("misafir"));
    var yardim = { tur: girdi.yardim && typeof girdi.yardim.tur === "string" ? girdi.yardim.tur : "bilinmiyor" };
    return istemciAl().then(function (api) {
      if (!api) return hata("yetenek-yok");
      return Promise.resolve(api.gonder(girdi.hedef, girdi.varyant, temiz, yardim)).then(function (r) {
        if (r && r.error) return eslestir(r.error);
        var d = r && r.data;
        if (!d || typeof d !== "object") return hata("hata");
        if (d.varyant_atandi) return hata("varyant", { atanan: String(d.varyant_atandi) });
        if (!sayi(d.puan) || !sayi(d.maks) || d.maks <= 0 || d.puan < 0 || d.puan > d.maks || typeof d.gecti !== "boolean") return hata("hata");
        var s = { ok: true, hedef: girdi.hedef, varyant: girdi.varyant, puan: d.puan, maks: d.maks, oran: sayi(d.oran) ? d.oran : d.puan / d.maks, gecti: d.gecti,
          dogruSayisi: sayi(d.dogru_sayisi) ? d.dogru_sayisi : null, soruSayisi: sayi(d.soru_sayisi) ? d.soru_sayisi : null, esik: sayi(d.esik) ? d.esik : null,
          surum: typeof d.surum === "string" ? d.surum : null, anahtar: d.gecti && d.anahtar && typeof d.anahtar === "object" ? d.anahtar : null };
        var tarih = new Date().toISOString();
        O.depo.sunucuEkle({ id: "sv-" + girdi.hedef + "-" + tarih, hedef: girdi.hedef, varyant: girdi.varyant, puan: s.puan, maks: s.maks, tarih: tarih, surum: s.surum,
          yardim: yardim, kaynak: "sunucu" });
        if (s.anahtar) acikYaz(girdi.hedef, s);
        return s;
      }, eslestir);
    });
  }

  /* Kapı kararı sunucudan: {ok:true, acik, nedenler[]} ya da {ok:false, neden, mesaj}. 60 sn önbellek (çizim başına sorgu yok). */
  function kapi(kapiId) {
    if (typeof kapiId !== "string" || !kapiId) return Promise.resolve(hata("gecersiz"));
    var onb = KAPI_ONBELLEK[kapiId];
    if (onb && Date.now() - onb.t < KAPI_SURE) return Promise.resolve(onb.s);
    if (!cevrimici()) return Promise.resolve(hata("cevrimdisi"));
    if (!oturumVar()) return Promise.resolve(hata("misafir"));
    return istemciAl().then(function (api) {
      if (!api || typeof api.kapi !== "function") return hata("yetenek-yok");
      return Promise.resolve(api.kapi(kapiId)).then(function (r) {
        if (r && r.error) return eslestir(r.error);
        var d = r && r.data;
        if (!d || typeof d.acik !== "boolean") return hata("hata");
        var s = { ok: true, kapi: kapiId, acik: d.acik, nedenler: Array.isArray(d.nedenler) ? d.nedenler : [] };
        KAPI_ONBELLEK[kapiId] = { t: Date.now(), s: s };
        return s;
      }, eslestir);
    });
  }
  /* Ders hedefi → sunucu kapı kimliği (tohum: ders-ustalik:<yol>:<n>) */
  function dersKapisi(hedef) { var m = /^ders:([a-z]+):(\d+):sinav$/.exec(hedef || ""); return m ? "ders-ustalik:" + m[1] + ":" + m[2] : null; }

  /* Çoklu seçim (Faz 22): q.multi = N → cevap, seçilen N şık metninin sıralı JSON dizisi metnidir (anahtardaki dogru ile aynı kurallı biçim;
     sunucu karşılaştırması değişmez: p_cevaplar ->> soru_id = dogru). Tek cevaplı sorular eskisi gibi düz seçenek metni. */
  function coklu(metinler) { return JSON.stringify(metinler.slice().sort()); }
  /* Sorular(id'li) ve seçilen şık indekslerinden gönderim cevapları: {soru_id: seçenek metni}; eksik cevap varsa null.
     Çoklu soruda secimler[i] tam q.multi tane farklı indeks dizisidir. */
  function cevaplar(sorular, secimler, secenekAlani) {
    var o = {}, alan = secenekAlani || "options";
    for (var i = 0; i < sorular.length; i++) {
      var q = sorular[i], j = secimler[i];
      if (!q || typeof q.id !== "string" || !Array.isArray(q[alan])) return null;
      if (q.multi !== undefined) {
        if (!Array.isArray(j) || j.length !== q.multi || new Set(j).size !== j.length) return null;
        for (var t = 0; t < j.length; t++) if (typeof j[t] !== "number" || j[t] < 0 || j[t] >= q[alan].length) return null;
        o[q.id] = coklu(j.map(function (x) { return q[alan][x]; }));
      } else {
        if (typeof j !== "number" || j < 0 || j >= q[alan].length) return null;
        o[q.id] = q[alan][j];
      }
    }
    return o;
  }
  /* Anahtar/cevap metni → seçenek metinleri dizisi ("[" ile başlıyorsa çoklu, değilse tek elemanlı) */
  function dogruListesi(d) {
    if (typeof d === "string" && d.charAt(0) === "[") { try { var a = JSON.parse(d); if (Array.isArray(a)) return a.map(String); } catch (e) { /* düz metin */ } }
    return d == null || d === "" ? [] : [String(d)];
  }

  /* Bölüm sonu bilgi testi (Faz 21): tek soru, anlık geri bildirim; puansız, deneme/ustalık kaydı YOK (depo.sunucuEkle çağrılmaz).
     Dönüş (söz): {ok:true, dogruMu, dogru, why, whyNot} ya da {ok:false, neden, mesaj} */
  function bilgi(hedef, soruId, cevap) {
    if (!/^bolum:[a-z]+:\d+:bilgi$/.test(hedef || "") || typeof soruId !== "string" || !soruId || typeof cevap !== "string") return Promise.resolve(hata("gecersiz"));
    if (!cevrimici()) return Promise.resolve(hata("cevrimdisi"));
    if (!oturumVar()) return Promise.resolve(hata("misafir"));
    return istemciAl().then(function (api) {
      if (!api || typeof api.bilgi !== "function") return hata("yetenek-yok");
      return Promise.resolve(api.bilgi(hedef, soruId, cevap)).then(function (r) {
        if (r && r.error) return eslestir(r.error);
        var d = r && r.data;
        if (!d || typeof d.ok !== "boolean" || (d.ok && typeof d.dogru !== "string")) return hata("hata");   /* yanlışta sunucu doğru şıkkı ve why'ı VERMEZ (Faz 32) */
        return { ok: true, dogruMu: d.ok, dogru: d.ok ? d.dogru : "", why: d.ok && typeof d.why === "string" ? d.why : "", whyNot: d.whyNot && typeof d.whyNot === "object" ? d.whyNot : null };
      }, eslestir);
    });
  }

  O.sunucu = { MESAJ: MESAJ, yapilandir: yapilandir, gonder: gonder, kapi: kapi, bilgi: bilgi, dersKapisi: dersKapisi, aciklama: aciklama, cevaplar: cevaplar, coklu: coklu, dogruListesi: dogruListesi, eslestir: eslestir, cevrimici: cevrimici, oturumVar: oturumVar };
})(typeof window !== "undefined" ? window : globalThis);

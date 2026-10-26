"use strict";
/* ALAN: Kanıta dayalı yetkinlik raporu, proje kanıt raporu ve işveren görünümü (PP.rapor).
   NE YAPAR: Saf hesapla iddiaları kanıta bağlar (doğrulandı/öz-beyan/doğrulanmamış), 8 kademeli durum verir; özel notlar işveren görünümüne girmez; iş/maaş vaadi yok.
   SORUN OLURSA: Depoya yazmaz; kanıtlar ya_pp_ogr.kanitlar'dan gelir. Arayüz js/proje/rapor-ui.js ve js/ders/senaryo-ui.js.
   YENİ ÖZELLİK: Yeni iddia/durum rapor.js'e eklenir, rapor-ui.js'te gösterilir; tests/faz8_proje.js, faz8_kariyer.js, faz_w1.js güncellenir. */
/* ---- Kanıta dayalı yetkinlik raporu (M§12, M§12.1, M§12.2) — saf hesap, depolamaya yazmaz ----
   İlkeler: her iddia kanıta bağlıdır ya da açıkça "doğrulanmamış"tır; adım işaretleme öz-beyandır (bağımsızlık/çıktı doğrulaması sayılmaz);
   8 kademeli durum yalnız kanıt türü varsa verilir; işveren görünümü yalnız doğrulanabilir/etiketli iddiaları taşır, özel notları taşımaz;
   iş/maaş/işe alım vaadi yok, doğrulanmış yetkinlik ile hazırlık tavsiyesi ayrı. */
(function (g) {
  var PP = g.PP = g.PP || {};

  var DURUMLAR = [
    { id: "bilgi", ad: "Bilgi anlaşıldı" },
    { id: "rehberli", ad: "Rehberli uygulama tamamlandı" },
    { id: "bagimsiz", ad: "Bağımsız görev gösterildi" },
    { id: "cikti", ad: "Pratik çıktı doğrulandı" },
    { id: "yeni", ad: "Alışılmadık görev çözüldü" },
    { id: "savunma", ad: "Karar açıklandı ve savunuldu" },
    { id: "kismi", ad: "Yetkinlik kısmen gösterildi" },
    { id: "yok", ad: "Değerlendirilmedi / doğrulanmadı" }
  ];
  /* Bu kanıt türleri yalnız SUNUCU doğrulamasıyla ilgili duruma geçirir; istemci/öz-beyan kaydı "kayıtlı ama doğrulanmamış" kalır. */
  var TUR_DURUM = { "bagimsiz-gorev": "bagimsiz", "cikti-dogrulama": "cikti", "yeni-gorev": "yeni", "savunma": "savunma" };

  /* M§8.6: proje başına 10 tanım alanı. Mevcut yol verisi hangilerini taşıyor? (alan adları proje tanımındaki anahtarlar) */
  var TANIM_ALANLARI = [
    ["problem", "Problem ve kullanıcı/iş senaryosu", function (d) { return !!d.why; }],
    ["onkosul", "Önkoşullar", function (d) { return Array.isArray(d.onkosul) && d.onkosul.length > 0; }],
    ["ciktilar", "Öğrenme çıktıları", function (d) { return Array.isArray(d.outcome) && d.outcome.length > 0; }],
    ["gereksinim", "İşlevsel/işlevsel olmayan gereksinimler", function (d) { return Array.isArray(d.gereksinim) && d.gereksinim.length > 0; }],
    ["kabul", "Kabul ölçütleri ve test durumları", function (d) { return Array.isArray(d.kabul) && d.kabul.length > 0; }],
    ["rubrik", "Rubrik / projeye özgü değerlendirme", function (d) { return Array.isArray(d.rubrik) && d.rubrik.length > 0; }],
    ["artifact", "Gerekli artifact ve belgeler", function (d) { return Array.isArray(d.steps) && d.steps.length > 0 && d.steps.every(function (s) { return !!s.proof; }); }],
    ["savunma", "Açıklama / savunma gereksinimi", function (d) { return Array.isArray(d.savunma) && d.savunma.length > 0; }],
    ["esleme", "Kanıt ve yetkinlik eşlemesi", function (d) { return Array.isArray(d.yetkinlikler) && d.yetkinlikler.length > 0; }],
    ["telafi", "Telafi ve sonraki aşama kilidi", function (d) { return !!d.telafi && !!d.sonraki; }]
  ];
  function tanimDenetimi(def) {
    var eksik = [], var_ = [];
    TANIM_ALANLARI.forEach(function (a) { (a[2](def || {}) ? var_ : eksik).push({ id: a[0], ad: a[1] }); });
    return { tanimli: var_.length, toplam: TANIM_ALANLARI.length, var: var_, eksik: eksik };
  }

  function iddia(id, metin, kanit) {
    kanit = (kanit || []).filter(Boolean);
    var enGuclu = kanit.some(function (k) { return k.guven === "sunucu"; }) ? "sunucu" : kanit.some(function (k) { return k.guven === "istemci"; }) ? "istemci" : kanit.length ? "beyan" : null;
    return { id: id, metin: metin, kanit: kanit, durum: !kanit.length ? "dogrulanmamis" : enGuclu === "sunucu" ? "dogrulandi" : "oz-beyan", guven: enGuclu };
  }

  /* girdi: {def (yol projesi tanımı), kayit (S.projects öğesi), kanitlar (ya_pp_ogr.kanitlar), bugun, surum} */
  function olustur(girdi) {
    var def = girdi.def || {}, kayit = girdi.kayit || { steps: [] }, kan = girdi.kanitlar || [];
    var pid = def.id || kayit.pid || kayit.id, adimlar = kayit.steps || [];
    var biten = adimlar.filter(function (s) { return s.done; }), toplam = (def.steps && def.steps.length) || adimlar.length;
    var iddialar = [];

    var stepKan = function (s) { return { kaynak: "adım işaretleme", ayrinti: s.t + (s.ts ? " (" + String(s.ts).slice(0, 10) + ")" : ""), guven: "beyan" }; };
    biten.forEach(function (s, i) { iddialar.push(iddia("adim-" + i, "Adım tamamlandı: " + s.t, [stepKan(s)])); });
    adimlar.filter(function (s) { return s.done && s.note; }).forEach(function (s, i) { iddialar.push(iddia("not-" + i, "Kanıt notu yazıldı: " + s.t, [{ kaynak: "kanıt notu", ayrinti: "not kaydı var (içeriği doğrulanmadı)", guven: "beyan" }])); });

    /* Sunucu/istemci kanıt kayıtları: yalnız bu türler 3–6. durumları verir */
    var projeKan = kan.filter(function (k) { return k && k.hedef === "proje:" + pid && TUR_DURUM[k.tur]; });
    var durumlar = {};
    projeKan.forEach(function (k) {
      var d = TUR_DURUM[k.tur], dogru = k.dogrulama === "sunucu";
      iddialar.push(iddia("kanit-" + k.tur, DURUMLAR.filter(function (x) { return x.id === d; })[0].ad + (dogru ? "" : " (kayıtlı, sunucu doğrulaması yok)"),
        [{ kaynak: "kanıt kaydı: " + k.tur, ayrinti: k.tarih ? String(k.tarih).slice(0, 10) : "", guven: dogru ? "sunucu" : k.dogrulama === "beyan" ? "beyan" : "istemci" }]));
      if (dogru) durumlar[d] = true;
    });

    /* Bağımsızlık/çıktı/savunma iddiaları KANITSIZ ise açıkça doğrulanmamış listelenir (tamamlama ≠ bağımsızlık) */
    ["bagimsiz", "cikti", "yeni", "savunma"].forEach(function (d) {
      if (!durumlar[d]) iddialar.push(iddia("yok-" + d, DURUMLAR.filter(function (x) { return x.id === d; })[0].ad + ": kanıt yok", []));
    });

    /* Yetkinlik satırları: çıktı–adım eşlemesi tanımlı değil → durum proje geneline göre; yalnız kanıtlanabilen duruma çıkar */
    var oran = toplam ? biten.length / toplam : 0;
    var genel = durumlar.savunma ? "savunma" : durumlar.yeni ? "yeni" : durumlar.cikti ? "cikti" : durumlar.bagimsiz ? "bagimsiz" : oran >= 1 ? "rehberli" : oran > 0 ? "kismi" : "yok";
    var yetkinlikler = (def.outcome || []).map(function (o) {
      return { ad: o, durum: genel, durumAd: DURUMLAR.filter(function (x) { return x.id === genel; })[0].ad,
        neden: genel === "rehberli" ? "Tüm adımlar öz-beyanla tamamlandı; bağımsızlık/çıktı doğrulaması yok." : genel === "kismi" ? biten.length + "/" + toplam + " adım öz-beyanla tamamlandı." : genel === "yok" ? "Kayıtlı adım yok." : "Sunucu doğrulamalı kanıt kaydı var." };
    });

    var guclu = iddialar.filter(function (x) { return x.durum !== "dogrulanmamis" && /^adim-/.test(x.id); }).slice(0, 5);
    var bosluklar = adimlar.filter(function (s) { return !s.done; }).slice(0, 5).map(function (s, i) { return iddia("bosluk-" + i, "Henüz yapılmadı: " + s.t, [{ kaynak: "adım listesi", ayrinti: "tamamlanmadı", guven: "istemci" }]); });
    var td = tanimDenetimi(def);

    return {
      kimlik: { id: pid, ad: def.title || kayit.title || pid, surum: girdi.surum || "1", yol: def.path || null },
      tarih: girdi.bugun || null, yontem: "Öz-beyan adım işaretleme ve kayıtlı kanıt kayıtları; otomatik doğrulama, test çalıştırma ya da kod incelemesi YOK.",
      yetkinlikler: yetkinlikler, genelDurum: genel,
      araclar: { planlanan: def.tools || null, kullanilan: "kayıtlı değil" },
      yardim: "Güvenilir yardım düzeyi kaydı yok; bağımsız çalışma iddia edilmez.",
      guclu: guclu, bosluklar: bosluklar, iddialar: iddialar,
      dogrulanmamis: iddialar.filter(function (x) { return x.durum === "dogrulanmamis"; }),
      tanim: td,
      sonraki: bosluklar.length ? "Sıradaki adım: " + adimlar.filter(function (s) { return !s.done; })[0].t : "Tüm adımlar işaretli; bağımsız görev, çıktı doğrulaması ve savunma için sunucu doğrulamalı kanıt gerekir.",
      sinirlamalar: ["Adım işaretleme öz-beyandır; bağımsız çalışma, kod kalitesi ya da çalışan çıktı kanıtı değildir.", "Proje tanımı " + td.tanimli + "/" + td.toplam + " zorunlu alanı taşıyor; eksik alanlar değerlendirmeyi sınırlar.", "Bu rapor iş, maaş ya da işe alım sonucu vaat etmez."]
    };
  }

  /* İşveren görünümü: özel not, claude notu, "neden" metni ve kullanıcı kimliği yok; yalnız kanıtı olan iddialar (öz-beyan etiketli) */
  function isverenGorunumu(r) {
    return {
      kimlik: { ad: r.kimlik.ad, surum: r.kimlik.surum }, tarih: r.tarih, genelDurum: r.genelDurum,
      yetkinlikler: r.yetkinlikler.map(function (y) { return { ad: y.ad, durumAd: y.durumAd }; }),
      iddialar: r.iddialar.filter(function (x) { return x.durum !== "dogrulanmamis"; }).map(function (x) { return { metin: x.metin, durum: x.durum, kaynak: x.kanit.map(function (k) { return k.kaynak; }) }; }),
      dogrulanmamisSayisi: r.dogrulanmamis.length,
      sinirlamalar: r.sinirlamalar
    };
  }

  /* CV: yalnız kanıta bağlı iddialar; öz-beyan etiketli; doğrulanmamışlar ayrı "ekleme" listesinde */
  function cv(raporlar) {
    var satirlar = [], ekleme = [];
    (raporlar || []).forEach(function (r) {
      if (r.genelDurum === "yok") { ekleme.push(r.kimlik.ad + ": kayıtlı adım yok"); return; }
      r.yetkinlikler.slice(0, 3).forEach(function (y) { satirlar.push({ metin: r.kimlik.ad + " projesi: " + y.ad, guven: y.durum === "rehberli" || y.durum === "kismi" ? "oz-beyan" : "dogrulandi", durum: y.durumAd }); });
      r.dogrulanmamis.forEach(function (x) { ekleme.push(r.kimlik.ad + ": " + x.metin); });
    });
    return { satirlar: satirlar, eklemeyin: ekleme, not: "Öz-beyan satırlarını CV'de 'proje çıktısı' olarak yaz; 'uzman' ya da 'bağımsız' gibi doğrulanmamış sıfatlar ekleme." };
  }

  /* Rol bazlı boşluk (M§12.2): beceri, tamamlanan projelerin araç/başlık metninde ve rapor kanıtında aranır */
  function bosluk(rol, raporlar, defler) {
    var tum = (raporlar || []).filter(function (r) { return r.genelDurum !== "yok"; }).map(function (r) {
      var d = (defler || []).filter(function (x) { return x.id === r.kimlik.id; })[0] || {};
      return { ad: r.kimlik.ad, metin: ((d.tools || "") + " " + (d.title || r.kimlik.ad)).toLowerCase(), durum: r.genelDurum };
    });
    var kapsanan = [], eksik = [];
    (rol.sk || []).forEach(function (b) {
      var m = tum.filter(function (t) { return t.metin.indexOf(String(b).toLowerCase()) >= 0; })[0];
      if (m) kapsanan.push({ beceri: b, kanit: m.ad + " (" + m.durum + ")" }); else eksik.push(b);
    });
    return { rol: rol.name, kapsanan: kapsanan, eksik: eksik, oncelik: eksik.slice(0, 3),
      uyari: "Bu liste proje kayıtlarında geçen araç/başlıklara bakar; yetkinlik doğrulaması değildir. İş, maaş ya da işe alım sonucu vaat edilmez; pazar tavsiyesi ayrıdır." };
  }

  /* Teknik İngilizce: yalnız tamamlanan adımların İngilizce terimleri; örnek tanıtım cümlesi doğrulanmış yetkinlik DEĞİLDİR */
  function ingilizce(def, kayit, rol) {
    var terimler = [];
    ((def && def.steps) || []).forEach(function (s, i) { if (kayit && kayit.steps && kayit.steps[i] && kayit.steps[i].done && s.en) terimler.push(s.en); });
    return { terimler: terimler.slice(0, 8), ornekTanitim: (def && def.pitch) || (rol && rol.en1) || null, not: "Örnek tanıtım cümlesi bir şablondur; İngilizce yetkinliğin kanıtı değildir (İngilizce yolundaki sınavlar ayrıdır)." };
  }

  /* W1: "İş yazışmalarım" — ders sonu İngilizce iş senaryosu cevapları (PP.senaryo.portfoyKayitlari). Hepsi "doğrulanmamış": otomatik denetim yapı ve anahtar kavramı sayar,
     anlamı/dilbilgisini değerlendirmez; kimse okumadı. Yetkinlik durumu (DURUMLAR) üretmez, genelDurum'u etkilemez. Gizli işaretli kayıtlar dışa aktarmaya girmez; özel not/ders notu bu işleve hiç verilmez. */
  function isYazismalari(kayitlar) {
    var hepsi = (kayitlar || []).filter(function (k) { return k && typeof k.id === "string"; }), acik = hepsi.filter(function (k) { return !k.gizli; });
    var iddialar = acik.map(function (k) {
      return { id: "yazi-" + k.id, metin: "İş yazışması taslağı yazıldı: " + k.baslik + " (" + k.sablon + ", " + k.kelime + " kelime)", durum: "dogrulanmamis", etiket: "doğrulanmamış",
        kanit: [{ kaynak: "iş yazışması (yerel kayıt)", ayrinti: (k.tarih || "") + " · yapı " + (k.yapiTamam ? "tamam" : "eksik") + " · anahtar kavram " + k.kavram + " · öz-karşılaştırma " + k.kontrolOz, guven: "beyan" }] };
    });
    return { baslik: "İş yazışmalarım", etiket: "doğrulanmamış", sayi: acik.length, gizli: hepsi.length - acik.length, iddialar: iddialar,
      not: "Bu yazılar öz-beyandır: otomatik denetim yalnız yapıyı ve anahtar kavramı sayar, anlamı ve dilbilgisini değerlendirmez; yetkinlik, not ya da ustalık kanıtı sayılmaz." };
  }
  function isYazismalariMetni(kayitlar) {
    var r = isYazismalari(kayitlar), acik = (kayitlar || []).filter(function (k) { return k && !k.gizli; });
    var parca = acik.map(function (k) { return "## " + k.baslik + " (" + k.tarih + ") — doğrulanmamış\nŞablon: " + k.sablon + " · " + k.kelime + " kelime\n\n" + k.metin; });
    return "# İş yazışmalarım (doğrulanmamış)\n" + r.not + "\n\n" + (parca.length ? parca.join("\n\n---\n\n") : "Dışa aktarılacak yazışma yok.") + "\n";
  }

  PP.rapor = { isYazismalari: isYazismalari, isYazismalariMetni: isYazismalariMetni, DURUMLAR: DURUMLAR, TANIM_ALANLARI: TANIM_ALANLARI, tanimDenetimi: tanimDenetimi, olustur: olustur, isverenGorunumu: isverenGorunumu, cv: cv, bosluk: bosluk, ingilizce: ingilizce };
})(typeof window !== "undefined" ? window : globalThis);

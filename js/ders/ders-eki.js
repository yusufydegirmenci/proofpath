"use strict";
/* ---- Faz 5: ders eki (M§7 öğeleri) + etkileşimli alt ağ lab'ı (M§8.2) ----
   Ek veri: window.PP_EK[yol][TMAP dizini] (content/lessons/net-ek.js). Lab: tarayıcıda yerel simülasyon; gerçek cihaz yok.
   Lab saf hesabı PP.lab.altag; kanıt PP.ogr.depo.kanitEkle (tur "lab", kapı kanıtı değildir). */
(function (g) {
  var PP = g.PP = g.PP || {}, LAB = PP.lab = PP.lab || {};

  /* ---- Saf alt ağ hesabı (32 bit işaretsiz tam sayı) ---- */
  function ipAyir(s) {
    var m = /^\s*(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\s*$/.exec(String(s));
    if (!m) return null;
    var p = m.slice(1, 5).map(Number);
    if (p.some(function (x) { return x > 255; })) return null;
    return ((p[0] * 16777216) + (p[1] * 65536) + (p[2] * 256) + p[3]);
  }
  function ipYaz(n) { return [Math.floor(n / 16777216) % 256, Math.floor(n / 65536) % 256, Math.floor(n / 256) % 256, n % 256].join("."); }
  function hesapla(ip, onek) {
    var a = ipAyir(ip);
    if (a == null || !(onek >= 1 && onek <= 30) || onek !== Math.floor(onek)) return null;
    var blok = Math.pow(2, 32 - onek), ag = Math.floor(a / blok) * blok, yayin = ag + blok - 1;
    return { ag: ipYaz(ag), yayin: ipYaz(yayin), ilk: ipYaz(ag + 1), son: ipYaz(yayin - 1), host: blok - 2, blok: blok };
  }
  /* En az n kullanılabilir host için en uzun (en küçük blok) önek */
  function enKucukOnek(n) {
    if (!(n >= 1) || n > 2147483646) return null;
    for (var p = 30; p >= 1; p--) if (Math.pow(2, 32 - p) - 2 >= n) return p;
    return null;
  }

  /* Senaryolar: ihtiyac → önek de sorulur; adres → önek verilir. Beklenen değerler hesaplanır (testte bağımsız sabitlerle denetlenir). */
  var SENARYOLAR = [
    { id: "s1", tip: "ihtiyac", ip: "192.168.10.0", n: 50, ozet: "192.168.10.0 ağını bölüyorsun. Muhasebe bölümünde 50 cihaz var. En küçük yeterli bloğu seç." },
    { id: "s2", tip: "ihtiyac", ip: "172.16.5.0", n: 12, ozet: "172.16.5.0 ağında yönetim bölümünde 12 cihaz var. En küçük yeterli bloğu seç." },
    { id: "s3", tip: "adres", ip: "192.168.1.70", p: 26, ozet: "Bir cihazın adresi 192.168.1.70/26. Bulunduğu ağı ve sınırlarını yaz." },
    { id: "s4", tip: "adres", ip: "10.20.30.200", p: 25, ozet: "Bir cihazın adresi 10.20.30.200/25. Bulunduğu ağı ve sınırlarını yaz." }
  ];
  function beklenen(s) {
    var p = s.tip === "ihtiyac" ? enKucukOnek(s.n) : s.p, r = hesapla(s.ip, p);
    r.onek = p;
    return r;
  }
  function onekAyir(v) { var m = /^\s*\/?(\d{1,2})\s*$/.exec(String(v)); return m ? +m[1] : null; }
  /* cevap: {onek, ag, yayin, ilk, son} (metin) → {alanlar:{ad:true|false}, dogru:bool} */
  function kontrol(s, cevap) {
    var b = beklenen(s), a = {};
    if (s.tip === "ihtiyac") a.onek = onekAyir(cevap.onek) === b.onek;
    ["ag", "yayin", "ilk", "son"].forEach(function (k) {
      var x = ipAyir(cevap[k]), y = ipAyir(b[k]);
      a[k] = x != null && x === y;
    });
    var dogru = Object.keys(a).every(function (k) { return a[k]; });
    return { alanlar: a, dogru: dogru };
  }
  var IPUCU = {
    ihtiyac: "Kullanılabilir host = 2^(host biti) - 2. İhtiyacı karşılayan en küçük host bitini bul, önek = 32 - host biti. Sonra blok boyutu = 2^(host biti); ağ adresi bloğun ilk adresi, yayın son adresidir.",
    adres: "Blok boyutu = 2^(32 - önek). IP'nin değişen sekizlisini blok boyutuna bölüp aşağı yuvarla, tekrar blok boyutuyla çarp: ağ adresi. Yayın = ağ + blok - 1; ilk host = ağ + 1; son host = yayın - 1."
  };
  LAB.altag = { ipAyir: ipAyir, ipYaz: ipYaz, hesapla: hesapla, enKucukOnek: enKucukOnek, SENARYOLAR: SENARYOLAR, beklenen: beklenen, kontrol: kontrol, IPUCU: IPUCU };

  /* ---- Lab tanımı (9 öğe, M§8.2) ---- */
  LAB.tanimlar = {
    "net-altag": {
      id: "net-altag", ad: "Alt ağ laboratuvarı", etiket: "Yerel simülasyon · tarayıcıda hesap, gerçek cihaz/ağ yok",
      hedef: "Verilen ihtiyaç ya da adresten doğru ön eki, ağ/yayın adresini ve kullanılabilir host aralığını bulmak.",
      baslangic: "Her senaryoda boş cevap kutuları; yalnız senaryo bilgisi verilir.",
      gorev: "4 senaryonun her biri için istenen alanları doldur ve 'Kontrol et'e bas.",
      gozlem: "Her alan doğru/yanlış olarak işaretlenir; hepsi doğruysa senaryo tamam sayılır.",
      sifirla: "'Sıfırla' kutuları temizler (kayıtlı kanıt silinmez).",
      kanit: "Doğrulanan her senaryo, ipucu kullanıldıysa ayrı işaretle, kanıt olarak kaydedilir (istemci doğrulaması; öz-beyan değil ama sunucu kanıtı da değil)."
    }
  };

  /* ---- Arayüz ---- */
  var ST = {};
  function durum(lid) { return ST[lid] || (ST[lid] = { i: 0, cevap: {}, sonuc: null, ipucu: false }); }
  function kanitId(sid, ipucu) { return "lab-net-altag-" + sid + (ipucu ? "-ipucu" : ""); }
  function kayit(sid, ipucu) {
    try { return PP.ogr.depo.kanitEkle({ id: kanitId(sid, ipucu), tur: "lab", hedef: "lab:net-altag:" + sid, dogrulama: "istemci" }); } catch (e) { return { ok: false }; }
  }
  function tamamlanan() {
    try { var d = PP.ogr.depo.oku(); return d.kanitlar.filter(function (k) { return k.tur === "lab" && /^lab:net-altag:/.test(k.hedef || ""); }).map(function (k) { return k.hedef.split(":")[2]; }); } catch (e) { return []; }
  }

  function labPanel(l) {
    var T = LAB.tanimlar["net-altag"], A = LAB.altag, st = durum(l.id), S0 = A.SENARYOLAR, s = S0[st.i], bitti = tamamlanan();
    var kutu = function (ad, etiket, ph) {
      var sn = st.sonuc && st.sonuc.alanlar[ad];
      return h("label", { class: "lab-f" + (sn === true ? " ok" : sn === false ? " no" : ""), "data-alan": ad }, h("span", null, etiket),
        h("input", { type: "text", inputmode: "text", autocomplete: "off", placeholder: ph, "aria-label": etiket, value: st.cevap[ad] || "", oninput: function (e) { st.cevap[ad] = e.target.value; } }),
        sn === true ? h("i", { class: "lab-m", "aria-hidden": "true" }, "✓") : sn === false ? h("i", { class: "lab-m", "aria-hidden": "true" }, "✗") : null);
    };
    var alanlar = [];
    if (s.tip === "ihtiyac") alanlar.push(kutu("onek", "Önek (/n)", "/26"));
    alanlar.push(kutu("ag", "Ağ adresi", "192.168.1.0"), kutu("yayin", "Yayın adresi", "192.168.1.255"), kutu("ilk", "İlk kullanılabilir host", "192.168.1.1"), kutu("son", "Son kullanılabilir host", "192.168.1.254"));
    var sec = h("div", { class: "lab-sec", role: "group", "aria-label": "Senaryo seç" }, S0.map(function (x, k) {
      return h("button", { type: "button", class: "opt" + (k === st.i ? " on" : ""), "aria-pressed": k === st.i ? "true" : "false", onclick: function () { st.i = k; st.cevap = {}; st.sonuc = null; st.ipucu = false; draw(); } },
        (k + 1) + (bitti.indexOf(x.id) >= 0 ? " ✓" : ""));
    }));
    var sonucEl = st.sonuc ? h("div", { class: "qz-sum " + (st.sonuc.dogru ? "all" : "low"), role: "status", "data-lab": st.sonuc.dogru ? "dogru" : "yanlis" },
      h("b", null, st.sonuc.dogru ? "Doğru" : "Eksik/yanlış"),
      h("span", null, st.sonuc.dogru ? "Senaryo tamam; kanıt kaydedildi" + (st.ipucu ? " (ipucu kullanıldı olarak)." : ".") : "İşaretli alanları yeniden hesapla; ipucu cezasızdır.")) : null;
    return h("div", { class: "panel lab", "data-lab-id": T.id },
      h("div", { class: "label" }, "Lab · " + T.ad), h("div", { class: "lab-et" }, T.etiket),
      h("div", { class: "small mute", style: "margin-top:6px" }, h("b", null, "Hedef: "), T.hedef),
      h("div", { class: "small mute" }, h("b", null, "Başlangıç: "), T.baslangic),
      h("div", { class: "small mute" }, h("b", null, "Görev: "), T.gorev),
      sec,
      h("p", { class: "lab-ozet" }, s.ozet),
      h("div", { class: "lab-fs" }, alanlar),
      st.ipucu ? h("div", { class: "lbox warn" }, h("div", { class: "label" }, "İpucu"), h("p", null, A.IPUCU[s.tip])) : null,
      sonucEl,
      h("div", { class: "row", style: "margin-top:8px;gap:8px;flex-wrap:wrap" },
        h("button", { class: "btn", type: "button", onclick: function () {
          st.sonuc = A.kontrol(s, st.cevap);
          if (st.sonuc.dogru) kayit(s.id, st.ipucu);
          draw();
        } }, "Kontrol et"),
        h("button", { class: "btn ghost", type: "button", onclick: function () { st.ipucu = true; draw(); } }, "İpucu"),
        h("button", { class: "btn ghost", type: "button", onclick: function () { st.cevap = {}; st.sonuc = null; st.ipucu = false; draw(); } }, "Sıfırla")),
      h("div", { class: "small mute", style: "margin-top:8px" }, h("b", null, "Gözlem: "), T.gozlem, " ", h("b", null, "Kanıt: "), T.kanit),
      h("div", { class: "small mute" }, bitti.length + " / " + S0.length + " senaryo kanıtlı."));
  }

  function ekBul(l) {
    var T; try { T = tmFor(l); } catch (e) { T = null; }
    var E = T && g.PP_EK && g.PP_EK[l.track];
    return E && E[T.i] ? E[T.i] : null;
  }
  function liste(b, items) { return h("ul", { class: "lr-ul" }, items.map(function (x) { return h("li", null, x); })); }

  /* bolum "anlat": benzetme+sınır, yaygın hatalar, geçme ölçütü, kaynaklar, sonraki adım · "alis": rehberli, bağımsız, lab, telafi */
  g.lrEk = function (l, bolum) {
    var e = ekBul(l);
    if (!e) return null;
    var out = [];
    if (bolum === "anlat") {
      if (e.analoji) out.push(h("div", { class: "lbox", "data-ek": "analoji" }, h("div", { class: "label" }, "Benzetme ve sınırı"), h("p", null, e.analoji.a), h("p", { class: "small mute" }, h("b", null, "Nerede yetersiz: "), e.analoji.sinir)));
      if (e.hatalar && e.hatalar.length) out.push(h("div", { class: "lbox warn", "data-ek": "hatalar" }, h("div", { class: "label" }, "Yaygın hatalar ve nasıl düzeltilir"), liste(null, e.hatalar.map(function (x) { return h("span", null, h("b", null, x[0] + ": "), x[1]); }))));
      if (e.gecme) out.push(h("div", { class: "lbox", "data-ek": "gecme" }, h("div", { class: "label" }, "Geçme ölçütü ve kritik yanlış anlamalar"), h("p", null, e.gecme.olcut), liste(null, e.gecme.kritik)));
      if (e.kaynaklar && e.kaynaklar.length) out.push(h("div", { class: "lbox", "data-ek": "kaynaklar" }, h("div", { class: "label" }, "Dış kaynaklar (isteğe bağlı; bu ders tek başına yeter)"),
        h("ul", { class: "lr-ul" }, e.kaynaklar.map(function (k) { return h("li", null, h("a", { href: k.u, target: "_blank", rel: "noopener noreferrer" }, k.t), " — " + k.neden + " (son doğrulama: " + k.dogrulama + ")"); }))));
      if (e.sonraki) out.push(h("div", { class: "small mute", "data-ek": "sonraki" }, e.sonraki));
    } else if (bolum === "alis") {
      if (e.rehberli) out.push(h("div", { class: "panel", "data-ek": "rehberli" }, h("div", { class: "label" }, "Rehberli alıştırma"), h("ol", { class: "lr-ul" }, e.rehberli.map(function (x) { return h("li", null, x); }))));
      if (e.bagimsiz) out.push(h("div", { class: "panel", "data-ek": "bagimsiz" }, h("div", { class: "label" }, "Bağımsız görev"), h("p", null, e.bagimsiz)));
      [].concat(e.lab || []).forEach(function (lid) {
        if (lid === "net-altag") out.push(labPanel(l));
        else if (g.PP.lab.kararPanel && g.PP.lab.tanimlar[lid]) out.push(g.PP.lab.kararPanel(l, lid));
      });
      if (e.telafi) out.push(h("div", { class: "lbox", "data-ek": "telafi" }, h("div", { class: "label" }, "Takıldıysan (telafi)"), h("p", null, e.telafi)));
    }
    return out.length ? out : null;
  };
})(typeof window !== "undefined" ? window : globalThis);

"use strict";
/* ---- Bilgi grafiğine dayalı "en küçük sonraki adım" (M§8.1, Faz 5 tur 2) ----
   Girdi: müfredat grafiği (önkoşullar), ustalık durumu (kanıtla), lab kanıtları. Çıktı: tek adım + neden + (varsa) blok nedeni.
   Sıra: (1) tamamlanmış ama kritik hedefi geçilmemiş ders → telafi; (2) ilk bitmemiş ders (kilitliyse nedeni ve önce yapılacak adım);
   (3) yolun en son tamamlanan dersinde eksik lab → lab önerisi (kilit DEĞİL, öneridir); (4) hepsi tamam. Lab kanıtı öneriyi etkiler, kapıyı etkilemez. */
(function (g) {
  var O = g.PP.ogr, oneri = {};
  /* ders kimliği → lab'lar (senaryo sayısı lab tanımıyla aynı olmalı; tests/faz5b_ccna.js denetler) */
  oneri.LAB = {
    "ders:net:4": [{ id: "net-altag", ad: "Alt ağ laboratuvarı", toplam: 4 }],
    "ders:net:7": [{ id: "net-rota", eski: "ccna-rota", ad: "Rota seçimi laboratuvarı", toplam: 4 }, { id: "net-nat", ad: "NAT/PAT karar laboratuvarı", toplam: 4 }],
    "ders:net:8": [{ id: "net-vlan", ad: "VLAN ve STP karar laboratuvarı", toplam: 4 }],
    "ders:net:14": [{ id: "net-acl", eski: "ccna-acl", ad: "ACL laboratuvarı", toplam: 6 }],
    "ders:ccna:3": [{ id: "net-altag", ad: "Alt ağ laboratuvarı", toplam: 4 }],
    "ders:ccna:5": [{ id: "ccna-vlan", ad: "VLAN ve STP karar laboratuvarı", toplam: 4 }],
    "ders:ccna:8": [{ id: "ccna-nat", ad: "NAT/PAT karar laboratuvarı", toplam: 4 }],
    "ders:ccna:14": [{ id: "ccna-vlan", ad: "VLAN ve STP karar laboratuvarı", toplam: 4 }],
    "ders:ccna:6": [{ id: "ccna-rota", ad: "Rota seçimi laboratuvarı", toplam: 4 }],
    "ders:ccna:9": [{ id: "ccna-acl", ad: "ACL laboratuvarı", toplam: 6 }]
  };
  function labDurum(kanitlar, lab) {
    var re = new RegExp("^lab:(" + lab.id + (lab.eski ? "|" + lab.eski : "") + "):([^:]+)$"), set = {};
    /* eski: yola göre ayrılmadan önce ortak yazılmış kayıtlar (lab:ccna-rota:*) geçerli kalır; senaryo kimliğiyle tekilleşir */
    (kanitlar || []).forEach(function (k) { var m = k && k.tur === "lab" && re.exec(k.hedef || ""); if (m) set[m[2]] = 1; });
    var n = Object.keys(set).length;
    return { yapilan: Math.min(n, lab.toplam), toplam: lab.toplam, tamam: n >= lab.toplam };
  }
  function adim(tip, d, metin, neden, ekstra) {
    var o = { tip: tip, ders: d ? d.id : null, ad: d ? d.ad : null, adim: metin, neden: neden, blok: null, kanit: "müfredat önkoşul grafiği" };
    Object.keys(ekstra || {}).forEach(function (k) { o[k] = ekstra[k]; });
    return o;
  }

  /* G: grafik, yolId: "ccna" gibi, du: PP.ogr.ui.durum() çıktısı */
  oneri.sonraki = function (G, yolId, du, haritaLab) {
    var LB = haritaLab || oneri.LAB;
    var ds = Object.keys(G.dersler).map(function (k) { return G.dersler[k]; }).filter(function (d) { return d.yol === yolId; }).sort(function (a, b) { return a.sira - b.sira; });
    if (!ds.length) return null;
    var sonTamam = null, i, d;
    for (i = 0; i < ds.length; i++) {
      d = ds[i];
      var tamam = !!(du.dersTamam || {})[d.id], us = O.kapi.ustalik(G, d.id, du).durum;
      if (!tamam) {
        var ac = O.kapi.dersAcik(G, d.id, du);
        if (!ac.acik) {
          var n0 = ac.nedenler[0];
          return adim("blok", d, n0.kod === "kritik-basarisiz" ? "Önce telafi et: " + n0.mesaj : "Önce önceki dersi bitir: " + n0.mesaj,
            "\"" + d.ad + "\" dersi kilitli.", { blok: ac.nedenler.map(function (x) { return x.mesaj; }), kanit: "önkoşul: " + n0.kod });
        }
        return adim("ders", d, "\"" + d.ad + "\" dersini bitir (ısınma, oku, mini sınav, alıştırma).", sonTamam ? "Önceki dersler tamam; yolda sıradaki ders bu." : "Yolun ilk bitmemiş dersi.");
      }
      if (us === "kritik-basarisiz") return adim("telafi", d, "\"" + d.ad + "\" mini sınavını tekrar et ve kritik hedefi geç.", "Bu ders tamamlandı ama kritik hedef geçilmedi; sonraki ders kilitli kalır.", { blok: ["kritik hedef geçilmedi"], kanit: "deneme kaydı" });
      sonTamam = d;
    }
    /* Bitmemiş ders yok: son derste ve öncekilerde eksik lab */
    for (i = ds.length - 1; i >= 0; i--) {
      var ls = LB[ds[i].id] || [];
      for (var j = 0; j < ls.length; j++) {
        var st = labDurum(du.kanitlar, ls[j]);
        if (!st.tamam) return adim("lab", ds[i], "Lab: " + ls[j].ad + " (" + st.yapilan + "/" + st.toplam + " senaryo).", "Ders tamam; uygulamalı kanıt (lab) eksik. Lab kapı değildir, öneridir.", { lab: ls[j].id, kanit: "lab kanıtları" });
      }
    }
    return adim("tamam", null, "Bu yoldaki dersler ve labler tamam.", "Önkoşul grafiğinde bekleyen adım yok.");
  };
  /* Bitmemiş derslerin arasında, en son tamamlanan dersin eksik lab'ı da önerilir (kapı değil) */
  oneri.sonrakiLab = function (G, yolId, du, haritaLab) {
    var LB = haritaLab || oneri.LAB, son = null;
    Object.keys(G.dersler).map(function (k) { return G.dersler[k]; }).filter(function (d) { return d.yol === yolId; }).sort(function (a, b) { return a.sira - b.sira; })
      .forEach(function (d) { if ((du.dersTamam || {})[d.id]) son = d; });
    if (!son) return null;
    var ls = LB[son.id] || [];
    for (var j = 0; j < ls.length; j++) { var st = labDurum(du.kanitlar, ls[j]); if (!st.tamam) return adim("lab", son, "Lab: " + ls[j].ad + " (" + st.yapilan + "/" + st.toplam + " senaryo).", "Son tamamladığın dersin uygulamalı kanıtı eksik. Lab kapı değildir, öneridir.", { lab: ls[j].id, kanit: "lab kanıtları" }); }
    return null;
  };
  oneri.labDurum = labDurum;
  O.oneri = oneri;

  /* Uygulama bağlama: aktif yol (yoksa ilerleme olan ilk yol) için adım */
  if (O.ui) O.ui.sonrakiAdim = function (yolId) {
    var Gr = O.ui.graf();
    if (!Gr) return null;
    var yol = yolId || (typeof S !== "undefined" && S.les && S.les.track && Gr.yollar[S.les.track] ? S.les.track : null);
    var du = O.ui.durum();
    if (!yol) { yol = Object.keys(Gr.yollar).filter(function (y) { return Object.keys(Gr.dersler).some(function (k) { return Gr.dersler[k].yol === y && du.dersTamam[k]; }); })[0] || null; }
    if (!yol) return null;
    var s = oneri.sonraki(Gr, yol, du);
    return s ? { yol: yol, adim: s, lab: s.tip === "lab" ? null : oneri.sonrakiLab(Gr, yol, du) } : null;
  };
})(typeof window !== "undefined" ? window : globalThis);

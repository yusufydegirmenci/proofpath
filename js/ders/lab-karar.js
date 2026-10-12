"use strict";
/* ---- Faz 5 tur 2: CCNA karar lab'ları (M§8.2): rota seçimi (en uzun önek) ve ACL değerlendirme ----
   Tarayıcıda yerel simülasyon; gerçek cihaz/ağ yok. Saf hesap PP.lab.karar, arayüz PP.lab.kararPanel.
   Kanıt: PP.ogr.depo.kanitEkle (tur "lab", kapı kanıtı değildir; istemci doğrulaması). Alt ağ hesabı ders-eki.js'ten (PP.lab.altag) gelir. */
(function (g) {
  var PP = g.PP = g.PP || {}, LAB = PP.lab = PP.lab || {};
  function ip(s) { return LAB.altag.ipAyir(s); }
  function oktet(n) { return [Math.floor(n / 16777216) % 256, Math.floor(n / 65536) % 256, Math.floor(n / 256) % 256, n % 256]; }

  /* ---- Rota seçimi ---- */
  function eslesir(hedef, net, onek) {
    var a = ip(hedef), n = ip(net);
    if (a == null || n == null) return false;
    var blok = Math.pow(2, 32 - onek);
    return Math.floor(a / blok) === Math.floor(n / blok);
  }
  /* tablo: [{net, onek, sonraki}] (1 tabanlı sıra) → {eslesenler:[satır no], secilen: satır no | 0} */
  function rotaSec(tablo, hedef) {
    var es = [], en = 0, best = -1;
    tablo.forEach(function (r, i) {
      if (eslesir(hedef, r.net, r.onek)) { es.push(i + 1); if (r.onek > best) { best = r.onek; en = i + 1; } }
    });
    return { eslesenler: es, secilen: en };
  }
  var T_VAR = [
    { net: "10.0.0.0", onek: 8, sonraki: "192.0.2.1" }, { net: "10.1.0.0", onek: 16, sonraki: "192.0.2.2" },
    { net: "10.1.2.0", onek: 24, sonraki: "192.0.2.3" }, { net: "0.0.0.0", onek: 0, sonraki: "192.0.2.254" }];
  var T_YOK = T_VAR.slice(0, 3);
  var ROTA = [
    { id: "s1", tablo: T_VAR, hedef: "10.1.2.77", ozet: "Hedef 10.1.2.77. Rota tablosunda kaç satır bu hedefe uyar ve router hangi satırı seçer?" },
    { id: "s2", tablo: T_VAR, hedef: "10.1.9.5", ozet: "Hedef 10.1.9.5. Kaç satır uyar, hangisi seçilir?" },
    { id: "s3", tablo: T_VAR, hedef: "8.8.8.8", ozet: "Hedef 8.8.8.8. Kaç satır uyar, hangisi seçilir?" },
    { id: "s4", tablo: T_YOK, hedef: "172.16.0.9", ozet: "Bu tabloda default rota yok. Hedef 172.16.0.9. Kaç satır uyar ve paket ne olur? (Seçilen satır: 0 = paket atılır)" }
  ];
  function rotaKontrol(s, c) {
    var b = rotaSec(s.tablo, s.hedef), a = {};
    a.eslesen = String(c.eslesen == null ? "" : c.eslesen).trim() === String(b.eslesenler.length);
    a.satir = String(c.satir == null ? "" : c.satir).trim() === String(b.secilen);
    return { alanlar: a, dogru: a.eslesen && a.satir, iz: s.tablo.map(function (r, i) { return b.eslesenler.indexOf(i + 1) >= 0; }), secilen: b.secilen };
  }

  /* ---- ACL değerlendirme ---- */
  var ACL = [
    { act: "deny", proto: "tcp", kaynak: "192.168.10.0", wc: "0.0.0.255", hedef: "any", port: 23 },
    { act: "permit", proto: "tcp", kaynak: "192.168.10.0", wc: "0.0.0.255", hedef: "any", port: 80 },
    { act: "permit", proto: "ip", kaynak: "192.168.20.0", wc: "0.0.0.255", hedef: "any", port: null }];
  function wcUyar(adres, net, wc) {
    var a = ip(adres), n = ip(net), w = ip(wc);
    if (a == null || n == null || w == null) return false;
    var A = oktet(a), N = oktet(n), W = oktet(w);
    for (var i = 0; i < 4; i++) if (((A[i] ^ N[i]) & (255 - W[i])) !== 0) return false;
    return true;
  }
  function aclMetin(s, i) {
    return (i + 1) + "  " + s.act + " " + s.proto + " " + s.kaynak + " " + s.wc + " " + s.hedef + (s.port ? " eq " + s.port : "");
  }
  /* paket: {proto, kaynak, port} → {act, satir: 1 tabanlı | 0 (örtük deny)} */
  function satirUyar(r, p) {
    return (r.proto === "ip" || r.proto === p.proto) && wcUyar(p.kaynak, r.kaynak, r.wc) && (!r.port || r.port === p.port);
  }
  function aclKarar(acl, p) {
    for (var i = 0; i < acl.length; i++) if (satirUyar(acl[i], p)) return { act: acl[i].act, satir: i + 1 };
    return { act: "deny", satir: 0 };
  }
  function wcOnek(onek) {
    if (!(onek >= 0 && onek <= 32)) return null;
    var m = Math.pow(2, 32 - onek) - 1;
    return oktet(m).join(".");
  }
  var ACL_SEN = [
    { id: "s1", tip: "paket", p: { proto: "tcp", kaynak: "192.168.10.5", port: 23 }, ozet: "Paket: TCP, kaynak 192.168.10.5, hedef port 23 (Telnet). Karar ve eşleşen satır?" },
    { id: "s2", tip: "paket", p: { proto: "tcp", kaynak: "192.168.10.5", port: 80 }, ozet: "Paket: TCP, kaynak 192.168.10.5, hedef port 80 (HTTP). Karar ve eşleşen satır?" },
    { id: "s3", tip: "paket", p: { proto: "udp", kaynak: "192.168.20.7", port: 53 }, ozet: "Paket: UDP, kaynak 192.168.20.7, hedef port 53 (DNS). Karar ve eşleşen satır?" },
    { id: "s4", tip: "paket", p: { proto: "tcp", kaynak: "192.168.30.9", port: 80 }, ozet: "Paket: TCP, kaynak 192.168.30.9, hedef port 80. Karar ve eşleşen satır? (Hiç satır uymazsa satır 0 = örtük deny)" },
    { id: "s5", tip: "wildcard", ag: "192.168.10.64", onek: 26, ozet: "192.168.10.64/26 ağını ACL satırında yazmak için wildcard maskını yaz." },
    { id: "s6", tip: "wildcard", ag: "172.16.16.0", onek: 20, ozet: "172.16.16.0/20 ağını ACL satırında yazmak için wildcard maskını yaz." }
  ];
  function aclKontrol(s, c) {
    var a = {};
    if (s.tip === "paket") {
      var b = aclKarar(ACL, s.p);
      a.karar = String(c.karar || "") === b.act;
      a.satir = String(c.satir == null ? "" : c.satir).trim() === String(b.satir);
      return { alanlar: a, dogru: a.karar && a.satir, bekleyenSatir: b.satir };
    }
    var x = ip(c.wc), y = ip(wcOnek(s.onek));
    a.wc = x != null && x === y;
    return { alanlar: a, dogru: a.wc };
  }

  LAB.karar = { eslesir: eslesir, rotaSec: rotaSec, rotaKontrol: rotaKontrol, wcUyar: wcUyar, aclKarar: aclKarar, wcOnek: wcOnek, aclKontrol: aclKontrol, ACL: ACL, ROTA: ROTA, ACL_SEN: ACL_SEN };

  /* ---- Lab tanımları (9 öğe, M§8.2) ---- */
  var TAN = {
    "ccna-rota": {
      id: "ccna-rota", ad: "Rota seçimi laboratuvarı", etiket: "Yerel simülasyon · tarayıcıda hesap, gerçek router yok", sc: ROTA, kontrol: rotaKontrol,
      hedef: "Bir hedef IP için rota tablosunda uyan satırları bulup router'ın en uzun önek kuralıyla seçtiği satırı belirlemek.",
      baslangic: "Her senaryoda rota tablosu ve hedef IP verilir; cevap alanları boştur.",
      gorev: "4 senaryoda uyan satır sayısını ve seçilen satır numarasını yaz, 'Kontrol et'e bas.",
      gozlem: "Kontrolden sonra her tablo satırı için uyuyor/uymuyor işareti ve seçilen satır gösterilir.",
      kanit: "Doğrulanan her senaryo (ipucu kullanıldıysa ayrı işaretle) kanıt olarak kaydedilir; istemci doğrulamasıdır, sunucu kanıtı değildir.",
      ipucu: "Her satırın önek uzunluğu kadar ilk bitini hedefle karşılaştır. Uyan satırlar arasında en büyük önek (en özgül satır) seçilir; hiçbiri uymazsa paket atılır (0)."
    },
    "ccna-acl": {
      id: "ccna-acl", ad: "ACL laboratuvarı", etiket: "Yerel simülasyon · tarayıcıda hesap, gerçek router yok", sc: ACL_SEN, kontrol: aclKontrol,
      hedef: "Bir ACL'nin paketi nasıl değerlendirdiğini (ilk eşleşme, örtük deny) ve ağ için wildcard maskını yazmayı kavramak.",
      baslangic: "ACL satırları ve paket (ya da ağ) verilir; cevap alanları boştur.",
      gorev: "4 pakette karar ile eşleşen satırı, 2 ağda wildcard maskını yaz; 'Kontrol et'e bas.",
      gozlem: "Kontrolden sonra alan bazlı doğru/yanlış gösterilir; paket senaryolarında satır satır eşleşme izi görünür.",
      kanit: "Doğrulanan her senaryo (ipucu kullanıldıysa ayrı işaretle) kanıt olarak kaydedilir; istemci doğrulamasıdır, sunucu kanıtı değildir.",
      ipucu: { paket: "ACL satırlarını yukarıdan aşağı oku; kaynak adres wildcard'a, protokole ve porta uyan ilk satırda dur. Hiçbiri uymazsa karar deny, satır 0 (örtük deny).", wildcard: "Wildcard maskı alt ağ maskının tersidir: blok boyutu - 1 değerini ilgili sekizlide yaz (ör. /26 → 0.0.0.63)." }
    }
  };
  LAB.tanimlar = LAB.tanimlar || {};
  Object.keys(TAN).forEach(function (k) { LAB.tanimlar[k] = TAN[k]; });

  /* ---- Arayüz ---- */
  var ST = {};
  function durum(id) { return ST[id] || (ST[id] = { i: 0, cevap: {}, sonuc: null, ipucu: false }); }
  function kanitId(lid, sid, ipucu) { return "lab-" + lid + "-" + sid + (ipucu ? "-ipucu" : ""); }
  function kayit(lid, sid, ipucu) {
    try { return PP.ogr.depo.kanitEkle({ id: kanitId(lid, sid, ipucu), tur: "lab", hedef: "lab:" + lid + ":" + sid, dogrulama: "istemci" }); } catch (e) { return { ok: false }; }
  }
  function tamamlanan(lid) {
    try { var d = PP.ogr.depo.oku(), re = new RegExp("^lab:" + lid + ":"); return d.kanitlar.filter(function (k) { return k.tur === "lab" && re.test(k.hedef || ""); }).map(function (k) { return k.hedef.split(":")[2]; }); } catch (e) { return []; }
  }
  /* Bir ders için tamamlanan senaryo sayısı (bilgi grafiği önerisi okur) */
  LAB.tamamlanan = tamamlanan;

  function sec(ad, etiket, st, secenekler) {
    var sn = st.sonuc && st.sonuc.alanlar[ad];
    var s = h("select", { "aria-label": etiket, onchange: function (e) { st.cevap[ad] = e.target.value; } },
      [h("option", { value: "" }, "Seç…")].concat(secenekler.map(function (o) { return h("option", { value: o[0] }, o[1]); })));
    s.value = st.cevap[ad] == null ? "" : st.cevap[ad];
    return h("label", { class: "lab-f" + (sn === true ? " ok" : sn === false ? " no" : ""), "data-alan": ad }, h("span", null, etiket), s,
      sn === true ? h("i", { class: "lab-m", "aria-hidden": "true" }, "✓") : sn === false ? h("i", { class: "lab-m", "aria-hidden": "true" }, "✗") : null);
  }
  function metin(ad, etiket, ph, st) {
    var sn = st.sonuc && st.sonuc.alanlar[ad];
    return h("label", { class: "lab-f" + (sn === true ? " ok" : sn === false ? " no" : ""), "data-alan": ad }, h("span", null, etiket),
      h("input", { type: "text", inputmode: "text", autocomplete: "off", placeholder: ph, "aria-label": etiket, value: st.cevap[ad] || "", oninput: function (e) { st.cevap[ad] = e.target.value; } }),
      sn === true ? h("i", { class: "lab-m", "aria-hidden": "true" }, "✓") : sn === false ? h("i", { class: "lab-m", "aria-hidden": "true" }, "✗") : null);
  }

  function tabloEl(id, s, st) {
    if (id === "ccna-rota") {
      var iz = st.sonuc && st.sonuc.iz;
      return h("div", { class: "lab-tab", role: "table", "aria-label": "Rota tablosu" }, s.tablo.map(function (r, i) {
        var m = iz ? (iz[i] ? " uyuyor" + (st.sonuc.secilen === i + 1 ? " · seçilen" : "") : " uymuyor") : "";
        return h("div", { class: "lab-sat", role: "row" }, (i + 1) + "  " + r.net + "/" + r.onek + " → " + r.sonraki + m);
      }));
    }
    var paket = s.tip === "paket";
    return h("div", { class: "lab-tab", role: "table", "aria-label": "ACL" }, ACL.map(function (r, i) {
      var iz = paket && st.sonuc ? (satirUyar(r, s.p) ? "  ← uyuyor" : "  (uymuyor)") : "";
      return h("div", { class: "lab-sat", role: "row" }, aclMetin(r, i) + iz);
    }).concat([h("div", { class: "lab-sat mute", role: "row" }, "(sonda gizli) deny ip any any")]));
  }

  LAB.kararPanel = function (l, id) {
    var T = TAN[id], st = durum(id), s = T.sc[st.i], bitti = tamamlanan(id);
    var alanlar = [];
    if (id === "ccna-rota") {
      alanlar.push(metin("eslesen", "Uyan satır sayısı", "sayı yaz", st), sec("satir", "Seçilen satır", st, s.tablo.map(function (r, i) { return [String(i + 1), "Satır " + (i + 1) + " (" + r.net + "/" + r.onek + ")"]; }).concat([["0", "Hiçbiri: paket atılır"]])));
    } else if (s.tip === "paket") {
      alanlar.push(sec("karar", "Karar", st, [["permit", "permit (izin)"], ["deny", "deny (red)"]]), sec("satir", "Eşleşen satır", st, ACL.map(function (r, i) { return [String(i + 1), "Satır " + (i + 1)]; }).concat([["0", "Hiçbiri (örtük deny)"]])));
    } else alanlar.push(metin("wc", "Wildcard maskı", "0.0.0.255", st));
    var ipc = id === "ccna-acl" ? (s.tip === "paket" ? T.ipucu.paket : T.ipucu.wildcard) : T.ipucu;
    var secEl = h("div", { class: "lab-sec", role: "group", "aria-label": "Senaryo seç" }, T.sc.map(function (x, k) {
      return h("button", { type: "button", class: "opt" + (k === st.i ? " on" : ""), "aria-pressed": k === st.i ? "true" : "false", onclick: function () { st.i = k; st.cevap = {}; st.sonuc = null; st.ipucu = false; draw(); } }, (k + 1) + (bitti.indexOf(x.id) >= 0 ? " ✓" : ""));
    }));
    var sonucEl = st.sonuc ? h("div", { class: "qz-sum " + (st.sonuc.dogru ? "all" : "low"), role: "status", "data-lab": st.sonuc.dogru ? "dogru" : "yanlis" },
      h("b", null, st.sonuc.dogru ? "Doğru" : "Eksik/yanlış"),
      h("span", null, st.sonuc.dogru ? "Senaryo tamam; kanıt kaydedildi" + (st.ipucu ? " (ipucu kullanıldı olarak)." : ".") : "İşaretli alanları gözden geçir; ipucu cezasızdır.")) : null;
    return h("div", { class: "panel lab", "data-lab-id": T.id },
      h("div", { class: "label" }, "Lab · " + T.ad), h("div", { class: "lab-et" }, T.etiket),
      h("div", { class: "small mute", style: "margin-top:6px" }, h("b", null, "Hedef: "), T.hedef),
      h("div", { class: "small mute" }, h("b", null, "Başlangıç: "), T.baslangic),
      h("div", { class: "small mute" }, h("b", null, "Görev: "), T.gorev),
      secEl, h("p", { class: "lab-ozet" }, s.ozet), tabloEl(id, s, st),
      h("div", { class: "lab-fs" }, alanlar),
      st.ipucu ? h("div", { class: "lbox warn" }, h("div", { class: "label" }, "İpucu"), h("p", null, ipc)) : null,
      sonucEl,
      h("div", { class: "row", style: "margin-top:8px;gap:8px;flex-wrap:wrap" },
        h("button", { class: "btn", type: "button", onclick: function () { st.sonuc = T.kontrol(s, st.cevap); if (st.sonuc.dogru) kayit(id, s.id, st.ipucu); draw(); } }, "Kontrol et"),
        h("button", { class: "btn ghost", type: "button", onclick: function () { st.ipucu = true; draw(); } }, "İpucu"),
        h("button", { class: "btn ghost", type: "button", onclick: function () { st.cevap = {}; st.sonuc = null; st.ipucu = false; draw(); } }, "Sıfırla")),
      h("div", { class: "small mute", style: "margin-top:8px" }, h("b", null, "Gözlem: "), T.gozlem, " ", h("b", null, "Kanıt: "), T.kanit),
      h("div", { class: "small mute" }, bitti.length + " / " + T.sc.length + " senaryo kanıtlı."));
  };
})(typeof window !== "undefined" ? window : globalThis);

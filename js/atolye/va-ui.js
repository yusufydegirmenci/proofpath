"use strict";
/* ---- Veri Analitiği yolu arayüzü (Faz 10 tur 1: Seviye 0) — Atölye > "Veri Analitiği" ---- */
function vaLi(items) { return h("ul", { class: "lr-ul" }, items.map(function (x) { return h("li", null, x); })); }

/* Uygulama alanları (PP.alan): ders başına 1 SQL + 1 Python; panel DOM'u önbelleklenir (yeniden çizimde yazılan kod kaybolmaz) */
function vaAlanlar(d, st) {
  if (!window.PP || !PP.alan) return h("div", { class: "lbox warn" }, "Uygulama alanı yüklenemedi; simülasyon laboratuvarı aşağıdadır.");
  st.alanEl = st.alanEl || {};
  var liste = PP_VA.alanlar.filter(function (a) { return a.ders === d.id; }), cozulen = PP.va.durum().alanlar;
  var paneller = liste.map(function (a) {
    if (!st.alanEl[a.id]) {
      var t = PP.alan.tanimla({ id: a.id, ders: a.ders, tur: a.tur, baslik: a.baslik, gorev: a.gorev, baslangic: a.baslangic, kontrol: a.kontrol, varyant: a.varyant, ipucu: a.ipucu, veri: PP_VA.veri });
      if (!t.ok) return h("div", { class: "lbox warn" }, "Alan tanımı geçersiz: " + t.neden);
      st.alanEl[a.id] = PP.alan.kur(t.alan, { onDogru: function (ip) { PP.va.alanKaydet(a.id, ip); } });
    }
    return st.alanEl[a.id];
  });
  var tamam = cozulen.filter(function (x) { return x.ders === d.id && x.tamam; }).length;
  return h("div", { class: "lbox", "data-va-alanlar": d.id }, h("div", { class: "label" }, "Kodla dene (" + tamam + "/" + liste.length + " çözüldü)"),
    h("div", { class: "small mute" }, "SQL ve Python bu tarayıcıda gerçekten çalışır; çalışmazsa bunu açıkça söyler. Aynı 12 siparişlik sentetik veri kullanılır."), paneller);
}

function vaDers(d, st) {
  var acik = st.ders === d.id, okundu = PP.va.durum().dersler.filter(function (x) { return x.id === d.id; })[0].okundu;
  var baslik = h("button", { type: "button", class: "btn ghost", "data-va-ders": d.id, "aria-expanded": acik ? "true" : "false", onclick: function () { st.ders = acik ? null : d.id; draw(); } }, (okundu ? "✓ " : "") + d.ad);
  if (!acik) return h("div", { class: "va-ders" }, baslik);
  var kp = function (a) { return h("div", { class: "lbox" }, h("div", { class: "label" }, a[0]), a[1]); };
  var kontrol = d.kontrol.map(function (q, i) {
    var k = d.id + ":" + i, pk = st.kp[k];
    return h("div", { class: "qz" + (pk != null ? (pk === q.a ? " ok" : " no") : ""), "data-va-kontrol": k },
      h("div", { class: "qz-h" }, h("span", { class: "qz-n" }, String(i + 1)), h("span", { class: "qz-q" }, q.q)),
      h("div", { class: "qz-os" }, q.o.map(function (o, j) {
        var c = "qz-o"; if (pk != null) { if (j === q.a) c += " ok"; else if (j === pk) c += " no"; else c += " dim"; }
        return h("button", { type: "button", class: c, disabled: pk != null, onclick: function () { st.kp[k] = j; draw(); } }, h("b", null, String.fromCharCode(65 + j)), h("span", null, o));
      })),
      pk != null ? h("div", { class: "qz-fb " + (pk === q.a ? "ok" : "no") }, h("b", null, pk === q.a ? "Doğru. " : "Doğrusu: " + q.o[q.a] + ". "), q.why, pk !== q.a ? " (Tekrar için bölüm: " + q.bolum + ")" : "") : null);
  });
  return h("div", { class: "va-ders panel", "data-va-acik": d.id }, baslik,
    h("div", { class: "small mute" }, h("b", null, "Hedefler: "), d.hedefler.join("; "), h("br"), h("b", null, "Önkoşul: "), d.onkosul),
    kp(["Sade açıklama", h("p", null, d.aciklama)]),
    kp(["Terimler", vaLi(d.terimler.map(function (t) { return t[0] + ": " + t[1]; }))]),
    kp(["Adım adım örnek", vaLi(d.ornek)]),
    kp(["Benzetme ve sınırı", h("div", null, h("p", null, d.analoji.a), h("p", { class: "small mute" }, h("b", null, "Nerede yetersiz: "), d.analoji.sinir))]),
    kp(["Görsel", h("pre", { class: "mono small", style: "white-space:pre-wrap;overflow-wrap:anywhere;margin:0" }, d.gorsel)]),
    kp(["Rehberli alıştırma", vaLi(d.rehberli)]),
    vaAlanlar(d, st),
    kp(["Bağımsız görev", h("p", null, d.bagimsiz)]),
    kp(["Yaygın hatalar ve düzeltme", vaLi(d.hatalar.map(function (x) { return x[0] + " → " + x[1]; }))]),
    h("div", { class: "label" }, "Bilgi kontrolü"), kontrol,
    kp(["Geçme ölçütü ve kritik yanlış anlamalar", h("div", null, h("p", null, d.gecme.olcut), vaLi(d.gecme.kritik))]),
    d.kaynaklar.length ? kp(["Dış kaynaklar (isteğe bağlı)", vaLi(d.kaynaklar.map(function (k) { return h("span", null, h("a", { href: k.u, target: "_blank", rel: "noopener noreferrer" }, k.t), " — " + k.neden + " (son doğrulama: " + k.dogrulama + ")"); }))]) : null,
    kp(["Takıldıysan (telafi)", h("p", null, d.telafi)]),
    h("div", { class: "small mute" }, d.sonraki),
    h("div", { class: "row" }, h("button", { class: "btn", type: "button", "data-va": "okudum", onclick: function () { PP.va.dersOkundu(d.id); draw(); } }, okundu ? "Okudum (güncelle)" : "Okudum")));
}

function vaLab(st) {
  var L = PP_VA.lab, T = PP.va.durum().lab, ip = st.labIp;
  var tablo = h("div", { style: "overflow:auto;max-width:100%" }, h("table", { class: "small mono", style: "border-collapse:collapse", "data-va": "veri" },
    h("tr", null, PP_VA.veri.sutunlar.map(function (c) { return h("th", { style: "padding:2px 6px;text-align:left;border-bottom:1px solid var(--line)" }, c); })),
    PP_VA.veri.satirlar.slice(0, 12).map(function (r) { return h("tr", null, r.map(function (x) { return h("td", { style: "padding:2px 6px" }, x === "" ? "∅" : String(x)); })); })));
  var sonuc = function (g, kapsa) { return st.lab[g] ? h("div", { class: "small", role: "status", "data-va-sonuc": g }, kapsa(st.lab[g])) : null; };
  var g1 = h("div", { class: "lbox", "data-va-gorev": "g1" }, h("div", { class: "label" }, "Görev 1 · Soru → gerekli sütunlar" + (T[0].tamam ? " ✓" : "")),
    L.gorev1.map(function (k) {
      return h("div", { style: "margin:6px 0" }, h("b", { class: "small" }, k.soru),
        h("div", { class: "row", style: "gap:4px;flex-wrap:wrap" }, PP_VA.veri.sutunlar.map(function (c) {
          var on = (st.g1[k.id] || []).indexOf(c) >= 0;
          return h("button", { type: "button", class: "btn ghost" + (on ? " on" : ""), "aria-pressed": on ? "true" : "false", "data-va-sut": k.id + ":" + c, onclick: function () {
            var l = st.g1[k.id] || []; st.g1[k.id] = on ? l.filter(function (x) { return x !== c; }) : l.concat([c]); draw();
          } }, c);
        })));
    }),
    h("div", { class: "row" }, h("button", { class: "btn", type: "button", "data-va": "g1", onclick: function () { var r = PP.va.gorev1(st.g1); st.lab.g1 = r; if (r.hepsi) PP.va.labKaydet("g1", ip); draw(); } }, "Kontrol et")),
    sonuc("g1", function (r) { return r.hepsi ? "Doğru: tüm sorular için gerekli sütunlar seçildi." : L.gorev1.filter(function (k) { return !r[k.id].dogru; }).map(function (k) { return k.id + ": " + (r[k.id].eksik.length ? "eksik " + r[k.id].eksik.join(", ") : "") + (r[k.id].fazla.length ? " fazla " + r[k.id].fazla.join(", ") : ""); }).join(" · "); }));
  var g2 = h("div", { class: "lbox", "data-va-gorev": "g2" }, h("div", { class: "label" }, "Görev 2 · Sütun → veri türü" + (T[1].tamam ? " ✓" : "")),
    PP_VA.veri.sutunlar.map(function (c) {
      return h("div", { class: "row", style: "gap:6px;align-items:center;flex-wrap:wrap" }, h("span", { class: "small mono", style: "min-width:110px" }, c),
        h("select", { "aria-label": c + " türü", "data-va-tur": c, onchange: function (e) { st.g2[c] = e.target.value; } },
          h("option", { value: "" }, "seç…"), L.turler.map(function (t) { return h("option", { value: t, selected: st.g2[c] === t ? "" : null }, t); })));
    }),
    h("div", { class: "row" }, h("button", { class: "btn", type: "button", "data-va": "g2", onclick: function () { var r = PP.va.gorev2(st.g2); st.lab.g2 = r; if (r.hepsi) PP.va.labKaydet("g2", ip); draw(); } }, "Kontrol et")),
    sonuc("g2", function (r) { return r.hepsi ? "Doğru: tüm türler doğru." : "Yanlış/eksik: " + Object.keys(L.gorev2).filter(function (c) { return !r[c]; }).join(", "); }));
  var g3 = h("div", { class: "lbox", "data-va-gorev": "g3" }, h("div", { class: "label" }, "Görev 3 · Veri bunu destekliyor mu?" + (T[2].tamam ? " ✓" : "")),
    L.gorev3.map(function (i) {
      return h("div", { class: "row", style: "gap:6px;align-items:center;flex-wrap:wrap" }, h("span", { class: "small", style: "flex:1;min-width:60%" }, i.ifade),
        [[true, "Destekler"], [false, "Desteklemez"]].map(function (o) { return h("button", { type: "button", class: "btn ghost" + (st.g3[i.id] === o[0] ? " on" : ""), "aria-pressed": st.g3[i.id] === o[0] ? "true" : "false", "data-va-ifade": i.id + ":" + o[0], onclick: function () { st.g3[i.id] = o[0]; draw(); } }, o[1]); }));
    }),
    h("div", { class: "row" }, h("button", { class: "btn", type: "button", "data-va": "g3", onclick: function () { var r = PP.va.gorev3(st.g3); st.lab.g3 = r; if (r.hepsi) PP.va.labKaydet("g3", ip); draw(); } }, "Kontrol et")),
    sonuc("g3", function (r) { return r.hepsi ? "Doğru. " + L.gorev3.map(function (i) { return i.neden; }).join(" ") : "Yanlış/eksik: " + L.gorev3.filter(function (i) { return !r[i.id]; }).map(function (i) { return i.id; }).join(", "); }));
  return h("div", { class: "panel", "data-va": "lab" }, h("div", { class: "label" }, "Lab · " + L.ad), h("div", { class: "lab-et" }, L.etiket),
    h("div", { class: "small mute", style: "margin-top:6px" }, h("b", null, "Hedef: "), L.hedef), h("div", { class: "small mute" }, h("b", null, "Başlangıç: "), L.baslangic), h("div", { class: "small mute" }, h("b", null, "Görev: "), L.gorev),
    tablo, g1, g2, g3,
    st.labIp ? h("div", { class: "lbox warn" }, h("div", { class: "label" }, "İpuçları"), vaLi(L.ipucu)) : null,
    h("div", { class: "row", style: "gap:6px;flex-wrap:wrap" }, h("button", { class: "btn ghost", type: "button", "data-va": "ipucu", onclick: function () { st.labIp = true; draw(); } }, "İpucu"),
      h("button", { class: "btn ghost", type: "button", "data-va": "sifirla", onclick: function () { st.g1 = {}; st.g2 = {}; st.g3 = {}; st.lab = {}; st.labIp = false; draw(); } }, "Sıfırla")),
    h("div", { class: "small mute" }, h("b", null, "Gözlem: "), L.gozlem, " ", h("b", null, "Kanıt: "), L.kanit));
}

function vaSinav(st) {
  var S0 = PP_VA.sinav0, r = st.sinavSonuc;
  var sorular = S0.sorular.map(function (q, i) {
    return h("div", { class: "qz", "data-va-sq": String(i) }, h("div", { class: "qz-h" }, h("span", { class: "qz-n" }, String(i + 1)), h("span", { class: "qz-q" }, q.q)),
      h("div", { class: "qz-os" }, q.o.map(function (o, j) { return h("button", { type: "button", class: "qz-o" + (st.sc[i] === j ? " ok" : ""), "aria-pressed": st.sc[i] === j ? "true" : "false", "data-va-sec": i + ":" + j, disabled: !!r, onclick: function () { st.sc[i] = j; draw(); } }, h("b", null, String.fromCharCode(65 + j)), h("span", null, o)); })));
  });
  var sonuc = r ? (r.ok ? h("div", { class: "qz-res", "data-va-sinav": r.gecti ? "gecti" : "kaldi" },
    h("div", { class: "qz-sum " + (r.gecti ? "all" : "low") }, h("b", null, r.puan + " / " + r.maks), h("span", null, r.gecti ? "Geçildi (eşik %" + Math.round(r.esik * 100) + ")." : "Eşik %" + Math.round(r.esik * 100) + " altında: Seviye 0 tamamlanmadı.")),
    r.yanlis.length ? h("div", { class: "small", style: "margin-top:6px" }, h("b", null, "Telafi: "), r.yanlis.map(function (y) { return "Soru " + y.soru + " → «" + y.ders + "» dersini tekrar et: " + y.telafi; }).join(" | ")) : null,
    h("div", { class: "small mute" }, r.varyantNotu),
    h("button", { class: "btn", type: "button", "data-va": "yeniden", onclick: function () { st.sinavSonuc = null; st.sc = []; draw(); } }, "Yeniden dene")) : h("div", { class: "small", role: "status" }, "Tüm soruları cevapla.")) : null;
  return h("div", { class: "panel", "data-va": "sinav" }, h("div", { class: "label" }, "Seviye 0 değerlendirmesi"), h("div", { class: "small mute" }, "Ders sorularından farklı durum soruları; geçme eşiği %" + Math.round(S0.esik * 100) + "."), sorular,
    r && r.ok ? sonuc : h("div", null, h("button", { class: "btn", type: "button", "data-va": "sinav-bitir", onclick: function () { var cev = S0.sorular.map(function (q, i) { return st.sc[i] == null ? -1 : st.sc[i]; }), x = PP.va.sinav(cev); st.sinavSonuc = x; if (x.ok) PP.va.sinavKaydet(x); draw(); } }, "Bitir ve değerlendir"), sonuc));
}

function renderVeriAnalitigi() {
  if (!window.PP || !PP.va || !window.PP_VA) return [h("div", { class: "panel" }, "Veri Analitiği yolu yüklenemedi.")];
  S.va = S.va || { ders: null, kp: {}, g1: {}, g2: {}, g3: {}, lab: {}, labIp: false, sc: [], sinavSonuc: null };
  var st = S.va, m = PP_VA.mufredat, D = PP.va.durum();
  var seviyeler = m.seviyeler.map(function (s) {
    return h("li", { "data-va-seviye": String(s.id) }, h("b", null, "Seviye " + s.id + " — " + s.ad + ": "), s.durum === "hazir" ? "hazır (3 ders, 1 lab, değerlendirme)" : "YOK (henüz hazırlanmadı)", s.onkosul.length ? " · önkoşul: Seviye " + s.onkosul.join(", ") : "");
  });
  return [
    h("div", { class: "panel", "data-va": "ozet" }, h("div", { class: "label" }, "Veri Analitiği yolu"), h("h2", null, "Tur 1: yalnız Seviye 0 (Temeller) hazır"),
      h("div", { class: "small mute" }, "Hiçbir ön bilgi gerekmez. Sıra: ders → lab → değerlendirme → telafi. Seviye 1–8 henüz yok; yol bitmiş değildir."),
      h("ul", { class: "lr-ul" }, seviyeler),
      h("div", { class: "small" }, h("b", null, "Seviye 0: "), D.tamam ? "tamam (istemci kaydı; ustalık/sertifika kanıtı değil)." : "devam ediyor — kalan: " + D.bekleyen.join("; ") + "."),
      h("div", { class: "small mute", "data-va": "sonraki" }, "Sonraki: Seviye " + D.sonrakiSeviye.id + " (" + D.sonrakiSeviye.ad + ") kilitli — " + D.sonrakiSeviye.neden),
      h("div", { class: "small mute", "data-va": "sertifika" }, h("b", null, m.sertifika.ad + ": "), m.sertifika.durum + ". " + m.sertifika.not)),
    h("div", { class: "label" }, "Dersler")
  ].concat(PP_VA.dersler.map(function (d) { return vaDers(d, st); })).concat([vaLab(st), vaSinav(st)]);
}

"use strict";
/* ---- Uygulama bağlama katmanı: model ↔ mevcut uygulama. Eski hesapları YENİDEN YAZMAZ; ilgili işlevleri çağırıp tek özet verir. ----
   Eski küreseller (S, h, QB, pathOf, totalXp, rankInfo, streakInfo, lessonsDone) yalnız çağrı anında kullanılır. */
(function (g) {
  var O = g.PP.ogr, ui = {}, G = null, hata = null;

  /* Grafik ilk kullanımda kurulur (içerik statik; yükleme anında hiçbir eski küresele dokunulmaz). */
  ui.graf = function () {
    if (G || hata) return G;
    try { G = O.program.kur(O.program.uygulamadan()); } catch (e) { hata = e; G = null; }
    return G;
  };
  ui.hata = function () { return hata; };

  ui.durum = function () {
    var depo = O.depo.varsayilan();
    var yeni = O.depo.oku(depo);
    var eski = O.eski.oku(depo, function (i) { var q = typeof QB !== "undefined" ? QB[i] : null; return q ? q.t : null; });
    /* Yerleştirme ofseti / "built" konular İLERLEME sayılır (ustalık değil): mevcut sıralı kilitle uyum */
    try { TRKS.forEach(function (tr) { starterTopics(tr).forEach(function (t) { if (t.status === "built" && /^s-[a-z]+-\d+$/.test(t.id)) eski.dersTamam[O.eski.dersId(t.id)] = true; }); }); } catch (e) { /* eski küresel yok */ }
    return O.program.durumKur(yeni, eski, typeof S !== "undefined" ? S.projects : [], function (pid) { var pa = typeof pathOf === "function" ? pathOf(pid) : null; return pa ? "proje:" + pa.id + ":" + pid : null; });
  };

  /* Tek ilerleme özeti: eski hesapların sonucunu AYNEN verir (ikinci bir formül yok). */
  ui.ozet = function () {
    var r = rankInfo(), sr = streakInfo();
    return { xp: totalXp(), rutbe: r.cur.n, rutbeIdx: r.idx, seri: sr.n, dersTamam: lessonsDone(), projeTamam: projDoneN(), ustalik: mastLevels() };
  };

  /* Ders kimliği: yalnız sabit ders kütüphanesi (s-<yol>-<n>) modelde yer alır. */
  ui.dersKimligi = function (l) {
    var k = l && (l.topicId || l.id), m = /^s-([a-z]+)-(\d+)$/.exec(k || "");
    return m ? O.eski.dersId(k) : null;
  };

  /* Ders yolundaki kilitli satır için neden metni (yoksa null → eski metin kalır). */
  ui.kilitNedeni = function (topicId) {
    var Gr = ui.graf(), id = /^s-([a-z]+)-(\d+)$/.test(topicId || "") ? O.eski.dersId(topicId) : null;
    if (!Gr || !id || !Gr.dersler[id]) return null;
    var r = O.kapi.dersAcik(Gr, id, ui.durum());
    return r.acik ? null : r.nedenler[0].mesaj;
  };

  /* Mini sınav sonucu: yalnız TÜM sorular cevaplandığında ve sabit dersler için deneme kaydı (aynı gün + aynı puan tekrar yazılmaz). */
  ui.dersSinavi = function (l, ok, toplam, oto) {
    var Gr = ui.graf(), did = ui.dersKimligi(l);
    if (!Gr || !did || !Gr.hedefler[did + ":sinav"] || !(toplam > 0)) return null;
    return O.depo.denemeEkle({ id: "dq-" + did + "-" + new Date().toISOString() + "-" + ok + "-" + toplam, hedef: did + ":sinav", varyant: "v1", puan: ok, maks: toplam, tarih: new Date().toISOString(), surum: Gr.surum,
      yardim: { tur: "bilinmiyor", guvenilir: false }, dogrulama: oto ? "istemci" : "beyan", kaynak: "mini-sinav" });
  };

  var ETIKET = { gecti: "geçti", kismi: "kısmi", "kritik-basarisiz": "kritik başarısız", "kanit-yok": "kanıt yok", "olcut-yok": "ölçüt yok" };
  ui.panel = function (tr, l) {
    var Gr = ui.graf(), did = ui.dersKimligi(l);
    if (!Gr || !did || !Gr.dersler[did]) return null;
    var du = ui.durum(), d = Gr.dersler[did], yet = d.yetkinlikler[0];
    var kok = O.graf.onkosulKapanisi(Gr, yet);
    var satir = function (yid) {
      var ders = Object.keys(Gr.dersler).filter(function (k) { return Gr.dersler[k].yetkinlikler.indexOf(yid) >= 0; })[0];
      var tamam = ders && du.dersTamam[ders], u = ders ? O.kapi.ustalik(Gr, ders, du) : null;
      return h("div", { class: "small" }, (tamam ? "✓ " : "○ ") + Gr.yetkinlikler[yid].ad, h("span", { class: "mute" }, " · ilerleme: " + (tamam ? "tamam" : "bitmedi") + " · ustalık: " + (u ? ETIKET[u.durum] : "-")));
    };
    var ac = O.kapi.dersAcik(Gr, did, du), us = ac.ustalik, hd = O.deg.hedefDurumu(Gr, did + ":sinav", du.denemeler);
    var kutu = [h("div", { class: "small mute" }, "Bu ders açık: " + (ac.acik ? "evet" : "hayır") + ". Ustalık ayrı sayılır: " + ETIKET[us.durum] + (us.guven === "istemci" ? " (istemcide kaydedildi, sunucuda doğrulanmadı)" : "") + ".")];
    if (!ac.acik) ac.nedenler.forEach(function (n) { kutu.push(h("div", { class: "small" }, "🔒 " + n.mesaj)); });
    if (hd.durum !== "denenmedi") kutu.push(h("div", { class: "small" }, "Mini sınav hedefi: %" + Math.round(hd.oran * 100) + " (gereken %" + Math.round(hd.esik * 100) + ") → " + (hd.durum === "gecti" ? "geçti" : "geçmedi")));
    else if (hd.gecmis.length) kutu.push(h("div", { class: "small mute" }, "Kayıtlı ama sayılmayan deneme: " + hd.gecmis[0].neden));
    if (hd.durum === "kaldi") {
      var t = O.deg.telafi(Gr, did + ":sinav", du.denemeler);
      kutu.push(h("div", { class: "small" }, h("b", null, "Telafi önerisi: "), t.adimlar.slice(1).map(function (a) { return a.metin; }).join(" → ")));
    }
    if (kok.length) { kutu.push(h("div", { class: "small", style: "margin-top:6px" }, h("b", null, "Önkoşullar"))); kok.slice(-4).forEach(function (y) { kutu.push(satir(y)); }); }
    var altin = Object.keys(Gr.kapilar).filter(function (k) { return k.indexOf("altin:" + tr + ":") === 0; });
    var siradaki = altin.filter(function (k) { return !O.kapi.degerlendir(Gr, k, du).acik; });
    if (altin.length) {
      if (siradaki.length) altin = siradaki;
      var ra = O.kapi.degerlendir(Gr, altin[0], du);
      kutu.push(h("div", { class: "small", style: "margin-top:6px" }, h("b", null, "Sıradaki kapı: "), Gr.kapilar[altin[0]].ad + (ra.acik ? " (açık)" : " (kilitli)")));
      ra.nedenler.slice(0, 3).forEach(function (n) { kutu.push(h("div", { class: "small mute" }, "🔒 " + n.mesaj)); });
    }
    kutu.push(h("div", { class: "small mute", style: "margin-top:6px" }, "Not: bu görünüm istemcide hesaplanır; güvenli yetkilendirme değildir. Güvenilir ustalık kaydı sunucu tarafı ister."));
    return h("details", { class: "panel pp-ogr" }, h("summary", null, h("b", null, "Ustalık ve kapılar "), h("span", { class: "small mute" }, "önkoşullar, kilit nedenleri")), kutu);
  };

  O.ui = ui;
})(typeof window !== "undefined" ? window : globalThis);

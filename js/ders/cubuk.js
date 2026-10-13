"use strict";
/* ---- PP.cubuk: ortak alıştırma çubuğu (Faz 10 tur 4) ----
   Sıra her alıştırma türünde aynıdır: Çalıştır/Kontrol · İpucu · Çözümü gör (+ Sıfırla). Mevcut düğmeler çoğaltılmaz; çubuk onların yerine geçer.
   - İpucu 3 kademelidir (1 yön, 2 daha belirgin, 3 neredeyse çözüm); her kademe kayıtlıdır (ya_pp_ogr.tercih.cubuk[id].ip).
   - "Çözümü gör" ilk ESIK (2) yanlış denemeden sonra açılır. Görülen çözüm "çözüm görüldü" diye kaydedilir; o alıştırma ustalık/kanıt SAYILMAZ (kanitSayilir).
   - "Ördeğe anlat": yapay zekâ yok; kutu yalnız "ne denedin, ne bekledin, ne oldu" sorar, yazılanlar saklanmaz ve gönderilmez.
   Saf durum işlevleri Node'da da çalışır; arayüz yalnız tarayıcıda (g.h) kurulur. Depolama anahtarı yeni değildir: mevcut ya_pp_ogr.tercih içine yazılır. */
(function (g) {
  var PP = g.PP = g.PP || {}, ESIK = 2, KADEME = 3, TERCIH = "cubuk";

  function ogr() { return g.PP && g.PP.ogr ? g.PP.ogr : null; }
  function depoOku() {
    var t = null, O = ogr();
    try { t = O && O.depo ? O.depo.tercih(TERCIH) : null; } catch (e) { t = null; }
    return t && typeof t === "object" ? t : {};
  }
  function depoYaz(m) { var O = ogr(); try { return !!(O && O.depo && O.depo.tercih(TERCIH, m)); } catch (e) { return false; } }
  function bugun() { try { return ogr().gun.bugun(); } catch (e) { return ""; } }
  function guncelle(id, f) { var m = depoOku(), e = Object.assign({}, m[id] || {}); f(e); m[id] = e; return depoYaz(m); }

  var yenileyici = {};   /* id → çubuğu yeniden çizen son işlev (yanlış deneme kaydedilince düğme durumu güncellensin) */
  function yenile(id) { if (yenileyici[id]) try { yenileyici[id](); } catch (e) { /* yoksay */ } }

  function durum(id) {
    var e = depoOku()[id] || {};
    return { yanlis: e.y | 0, ipucu: Math.min(KADEME, e.ip | 0), cozum: !!e.cg, cozumTarih: e.cgt || null };
  }
  function yanlis(id) { guncelle(id, function (e) { e.y = (e.y | 0) + 1; }); yenile(id); return durum(id); }
  function ipucuAc(id, n) { guncelle(id, function (e) { e.ip = Math.max(e.ip | 0, Math.min(KADEME, n | 0)); }); yenile(id); return durum(id); }
  function cozumAcik(id) { return durum(id).yanlis >= ESIK; }
  function cozumGor(id) {
    if (!cozumAcik(id)) return false;
    if (!durum(id).cozum) guncelle(id, function (e) { e.cg = 1; e.cgt = bugun(); });
    yenile(id);
    return true;
  }
  /* Kanıt/ustalık yalnız çözüm GÖRÜLMEMİŞ alıştırmada sayılır */
  function kanitSayilir(id) { return !durum(id).cozum; }
  function ipucuKullanildi(id) { return durum(id).ipucu > 0; }
  function kademeler(ipucu) { return (Array.isArray(ipucu) ? ipucu : typeof ipucu === "string" && ipucu ? [ipucu] : []).filter(function (x) { return typeof x === "string" && x; }).slice(0, KADEME); }
  function ozet() {
    var m = depoOku(), r = { alistirma: 0, yanlis: 0, ipucu: 0, cozum: 0 };
    Object.keys(m).forEach(function (k) { var d = durum(k); r.alistirma++; r.yanlis += d.yanlis; r.ipucu += d.ipucu; if (d.cozum) r.cozum++; });
    return r;
  }

  /* ---------- Arayüz ---------- */
  var SORULAR = ["Ne denedin? (yazdığın kod, seçtiğin cevap ya da adımlar)", "Ne olmasını bekliyordun?", "Gerçekte ne oldu? (hata mesajı ya da çıkan sonuç)"];
  var onay = {};   /* id → çözüm onayı bekleniyor */
  var acikIp = {}, acikCz = {};   /* id → panel açık (laboratuvarlar her eylemde yeniden çizilir; açık panel kaybolmasın) */

  /* kur(o): {id, ipucu:[…], cozum: ()→ metin|düğüm, birincilEl: Çalıştır/Kontrol düğmesi (çağıran kurar, çubuk yeniden çizilince aynı düğüm taşınır), sifirlaEl, ipucuAttr, ipucuDugmeAttr}
     Dönüş: kutu elemanı; kutu.yenile() çizimi tazeler, kutu.gizle() açık ipucu/çözüm panelini kapatır. */
  function kur(o) {
    var hh = g.h, id = o.id, tier = kademeler(o.ipucu), gorunen = !!acikIp[id], cozumGoster = !!acikCz[id] && durum(id).cozum;
    var kutu = hh("div", { class: "cubuk", "data-cubuk": id });
    var ipEl = hh("div", { class: "lbox warn", "data-cubuk-ipucu": id, role: "status", style: "display:none" });
    if (o.ipucuAttr) Object.keys(o.ipucuAttr).forEach(function (k) { ipEl.setAttribute(k, o.ipucuAttr[k]); });
    var czEl = hh("div", { class: "lbox", "data-cubuk-cozum": id, style: "display:none" });
    var satir = hh("div", { class: "row", style: "gap:6px;flex-wrap:wrap;margin:6px 0", role: "group", "aria-label": "Alıştırma çubuğu" });
    var not = hh("div", { class: "small mute", "data-cubuk-not": id, role: "status" });

    function dugme(etiket, attrs, tikla, devre) {
      var a = Object.assign({ class: "btn ghost", type: "button", onclick: tikla }, attrs || {});
      if (devre) { a.disabled = true; a["aria-disabled"] = "true"; }
      return hh("button", a, etiket);
    }
    function ipucuCiz(d) {
      ipEl.textContent = "";
      if (!gorunen || d.ipucu < 1) { ipEl.style.display = "none"; return; }
      ipEl.style.display = "";
      ipEl.appendChild(hh("div", { class: "label" }, "İpuçları (" + Math.min(d.ipucu, tier.length) + "/" + tier.length + ")"));
      ipEl.appendChild(hh("ol", { class: "lr-ul" }, tier.slice(0, d.ipucu).map(function (x, i) {
        return hh("li", { "data-cubuk-kademe": String(i + 1) }, hh("b", null, ["Yön: ", "Daha belirgin: ", "Neredeyse çözüm: "][i] || ""), x);
      })));
    }
    function cozumCiz(d) {
      czEl.textContent = "";
      if (!cozumGoster || !d.cozum) { czEl.style.display = "none"; return; }
      var c = typeof o.cozum === "function" ? o.cozum() : o.cozum;
      czEl.style.display = "";
      czEl.appendChild(hh("div", { class: "label" }, "Çözüm"));
      if (c == null || c === "") czEl.appendChild(hh("p", { class: "small mute" }, "Bu alıştırma için kayıtlı çözüm yok."));
      else if (typeof c === "string") czEl.appendChild(hh("pre", { class: "mono small", style: "white-space:pre-wrap;overflow-wrap:anywhere;margin:4px 0" }, c));
      else czEl.appendChild(c);
      czEl.appendChild(hh("div", { class: "small warn", "data-cubuk-goruldu": "1" }, "Çözüm görüldü: bu alıştırma ustalık ve kanıt olarak sayılmaz. İstersen sıfırla ve çözümü görmeden yeniden dene; yine de sayılmaz, ama öğrenmeye yarar."));
    }
    function cozumVar() { var c; try { c = typeof o.cozum === "function" ? o.cozum() : o.cozum; } catch (e) { c = null; } return c != null && c !== ""; }
    function ciz() {
      var ae = g.document && g.document.activeElement, odakKey = ae && ae.getAttribute && kutu.contains(ae) ? (ae.getAttribute("data-cubuk") || "") : "";
      var d = durum(id), acik = d.yanlis >= ESIK && (cozumVar() || d.cozum), ipDev = !tier.length || d.ipucu >= tier.length;
      satir.textContent = "";
      if (o.birincilEl) satir.appendChild(o.birincilEl);
      if (tier.length) {
        satir.appendChild(dugme(d.ipucu === 0 ? "İpucu" : ipDev ? "İpuçları (" + tier.length + "/" + tier.length + ")" : "Sonraki ipucu (" + (d.ipucu + 1) + "/" + tier.length + ")",
          Object.assign({ "data-cubuk": "ipucu" }, o.ipucuDugmeAttr || {}), function () { gorunen = true; acikIp[id] = true; ipucuAc(id, Math.min(tier.length, durum(id).ipucu + 1)); }, ipDev && gorunen));
      }
      var cz = onay[id] && acik && !d.cozum;
      satir.appendChild(dugme(d.cozum ? (cozumGoster ? "Çözümü gizle" : "Çözümü göster") : cz ? "Evet, çözümü göster (kanıt sayılmaz)" : "Çözümü gör", { "data-cubuk": "cozum", title: acik ? "" : "İlk " + ESIK + " yanlış denemeden sonra açılır" }, function () {
        var dd = durum(id);
        if (dd.cozum) { cozumGoster = !cozumGoster; acikCz[id] = cozumGoster; return ciz(); }
        if (!onay[id]) { onay[id] = true; return ciz(); }
        onay[id] = false; cozumGoster = true; acikCz[id] = true; cozumGor(id);
      }, !acik));
      if (o.sifirlaEl) satir.appendChild(o.sifirlaEl);
      not.textContent = d.cozum ? "Bu alıştırmada çözüm görüldü; ustalık/kanıt sayılmaz." : acik ? (cz ? "Çözümü görürsen bu alıştırma ustalık ve kanıt sayılmaz; onaylamak için düğmeye bir kez daha bas." : "Çözüm açıldı. Önce ipuçlarını denemeni öneririz.") : "Çözümü gör: " + d.yanlis + "/" + ESIK + " yanlış denemeden sonra açılır. İpucu cezasızdır.";
      ipucuCiz(d); cozumCiz(d);
      if (odakKey) { var yeni = satir.querySelector('[data-cubuk="' + odakKey + '"]'); if (yeni && !yeni.disabled && yeni.focus) yeni.focus(); }
    }
    var ordek = hh("details", { class: "small", "data-cubuk-ordek": id },
      hh("summary", null, "Ördeğe anlat"),
      hh("div", { class: "lbox" },
        hh("p", { class: "small mute", style: "margin:0 0 6px" }, "Sorunu bir lastik ördeğe anlatır gibi yaz. Cevap vermem: yapay zekâ yok, yazdıkların kaydedilmez ve hiçbir yere gönderilmez. Çoğu zaman yazarken sorunu kendin görürsün."),
        SORULAR.map(function (s, i) {
          return hh("label", { class: "field", style: "display:block;margin:4px 0" }, hh("span", { class: "label" }, s), hh("textarea", { rows: 2, maxlength: 600, "data-cubuk-ordek-alan": String(i + 1), style: "width:100%;box-sizing:border-box;font-size:13px", "aria-label": s }));
        })));
    kutu.appendChild(satir); kutu.appendChild(not); kutu.appendChild(ipEl); kutu.appendChild(czEl); kutu.appendChild(ordek);
    kutu.yenile = ciz;
    kutu.gizle = function () { gorunen = false; cozumGoster = false; acikIp[id] = false; acikCz[id] = false; onay[id] = false; ciz(); };
    yenileyici[id] = ciz;
    ciz();
    return kutu;
  }

  PP.cubuk = { ESIK: ESIK, KADEME: KADEME, durum: durum, yanlis: yanlis, ipucuAc: ipucuAc, cozumAcik: cozumAcik, cozumGor: cozumGor, kanitSayilir: kanitSayilir, ipucuKullanildi: ipucuKullanildi, kademeler: kademeler, ozet: ozet, kur: kur, SORULAR: SORULAR };
})(typeof window !== "undefined" ? window : globalThis);

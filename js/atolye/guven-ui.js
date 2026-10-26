"use strict";
/* ALAN: Ayarlar sekmesi, Güven merkezi ve senkron durum rozeti. NE YAPAR: senkronRozet çevrimdışı/senkron durumunu gösterir, renderGuven Güven merkezini ve veri dışa aktarımını (gvnDisaAktar) sunar; mantık js/ogrenme/senkron.js ve guven.js içindedir.
   SORUN OLURSA: localStorage pp_senkron anahtarı ve window.__ppShim.motor() (supabase-shim.js) kullanılır; motor yoksa senkronMotoru null döner. renderGuven ders/kullanim-turu.js içinden çağrılır. Yükleme sırası tests/sira.js ile denetlenir.
   YENİ ÖZELLİK: Yeni güven/senkron ayarı: renderGuven + ogrenme/senkron.js. Testler: tests/faz9_senkron.js, tests/faz9_cevrimdisi.js. */
/* ---- Faz 9 arayüz: senkron durum rozeti ve Güven merkezi (Ayarlar sekmesi) ---- */
function senkronMotoru() { try { return window.__ppShim && window.__ppShim.motor ? window.__ppShim.motor() : null; } catch (e) { return null; } }

function senkronRozet() {
  var el = document.getElementById("pp-sync-rozet");
  var m = senkronMotoru(), acik = false;
  try { acik = PP.sync.acik(); } catch (e) { acik = false; }
  if (!acik) { if (el) el.remove(); return; }
  var d = m ? m.durum() : { cevrimici: navigator.onLine !== false, bekleyen: 0, cakisma: 0, hata: 0, son: null, calisiyor: false };
  var cevrimici = navigator.onLine !== false && d.cevrimici !== false;
  var metin = d.cakisma ? d.cakisma + " çakışma: seçim gerekli" : d.hata ? d.hata + " hata" : !cevrimici ? "Çevrimdışı" + (d.bekleyen ? " · " + d.bekleyen + " bekliyor" : "") : d.bekleyen ? d.bekleyen + " bekliyor" : d.calisiyor ? "Gönderiliyor…" : "Senkronize";
  var sinif = d.cakisma || d.hata ? "bad" : !cevrimici || d.bekleyen ? "warn" : "ok";
  if (!el) {
    el = document.createElement("button");
    el.id = "pp-sync-rozet"; el.type = "button";
    el.setAttribute("aria-live", "polite");
    el.style.cssText = "position:fixed;right:10px;bottom:10px;z-index:60;font:inherit;font-size:12px;padding:6px 10px;border-radius:999px;border:1px solid var(--line,#d9d1c0);background:var(--panel,#f9f6ef);color:var(--mute,#6a655b);cursor:pointer";
    el.addEventListener("click", function () { if (typeof goTab === "function") goTab("ayar"); });
    document.body.appendChild(el);
  }
  el.dataset.durum = sinif; el.textContent = metin;
  el.style.borderColor = sinif === "bad" ? "var(--bad,#b04545)" : sinif === "warn" ? "var(--rust,#c07a2c)" : "var(--ok,#2d7d4f)";
}
(function () {
  window.addEventListener("online", senkronRozet); window.addEventListener("offline", senkronRozet);
  window.addEventListener("pp-sync-hazir", function () { var m = senkronMotoru(); if (m) m.dinle(function () { senkronRozet(); if (typeof S !== "undefined" && S.gvn && S.gvn.ac) { try { draw(); } catch (e) { /* çizim hatası rozeti etkilemez */ } } }); senkronRozet(); });
  setInterval(senkronRozet, 5000);
  document.addEventListener("DOMContentLoaded", senkronRozet);
})();

function gvnDisaAktar() {
  var uid = null; try { uid = S.me; } catch (e) { uid = null; }
  var metin = PP.guven.disaAktar(null, uid), ad = PP_MARKA.dosya + "-yedek-" + new Date().toISOString().slice(0, 10) + ".json";
  S.gvn.yedekAlindi = true;
  if (S.dl && S.dl.save) { Promise.resolve(S.dl.save({ filename: ad, data: metin })).catch(function () {}); }
  else {
    var a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([metin], { type: "application/json" })); a.download = ad; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
  }
  draw();
}

function renderGuven() {
  if (!window.PP || !PP.guven || !PP.cihaz) return null;
  S.gvn = S.gvn || { ac: false, onay: false, goruldu: false, yedekAlindi: false, msg: "" };
  var G = S.gvn, ai = PP.guven.aiVerisi(), ozet = PP.guven.kayitOzeti(), m = senkronMotoru(), kuyruk = m ? m.liste() : [];
  var pay = PP.cihaz.paylasilan(), pwa = PP.cevrimdisi ? PP.cevrimdisi.acik() : false, syn = PP.sync ? PP.sync.acik() : false;
  var tg = function (ad, deger, ac, kapat, etiket) {
    return h("div", { class: "row", style: "gap:6px;align-items:center;flex-wrap:wrap" }, h("span", { class: "small", style: "min-width:55%" }, ad),
      h("button", { type: "button", class: "btn ghost" + (deger ? " on" : ""), "aria-pressed": deger ? "true" : "false", "data-gvn": etiket, onclick: deger ? kapat : ac }, deger ? "Açık (kapat)" : "Kapalı (aç)"));
  };
  var envanter = h("table", { class: "small", style: "width:100%;border-collapse:collapse", "data-gvn": "envanter" },
    h("tr", null, ["Veri", "Neden", "Nerede", "Türü"].map(function (x) { return h("th", { style: "text-align:left;padding:3px" }, x); })),
    PP.guven.ENVANTER.map(function (e) { return h("tr", null, h("td", { style: "padding:3px" }, h("b", null, e[0]), h("div", { class: "mute" }, e[1])), h("td", { style: "padding:3px" }, e[2]), h("td", { style: "padding:3px" }, e[3]), h("td", { style: "padding:3px" }, e[4])); }));
  var kuyrukEl = kuyruk.length ? kuyruk.map(function (k) {
    var ad = k.path.split("/").slice(-2).join("/");
    return h("div", { class: "lbox" + (k.durum === "cakisma" || k.durum === "hata" ? " warn" : ""), "data-kuyruk": k.durum },
      h("b", null, ad + " — " + (k.durum === "bekliyor" ? "gönderilmeyi bekliyor" : k.durum === "cakisma" ? "ÇAKIŞMA: sunucuda daha yeni bir sürüm var" : "sunucu reddetti: " + (k.mesaj || ""))),
      k.durum === "cakisma" ? h("div", { class: "row", style: "gap:6px" },
        h("button", { class: "btn", type: "button", "data-gvn": "benim", onclick: function () { m.coz(k.n, "benim"); m.isle().then(function () { draw(); }); } }, "Benimkini koru"),
        h("button", { class: "btn ghost", type: "button", "data-gvn": "sunucu", onclick: function () { var r = m.coz(k.n, "sunucu"); if (r.ok) window.__ppShim.sunucuyuUygula(k.path, r.sunucu); draw(); } }, "Sunucudakini al")) : null,
      k.durum === "hata" ? h("div", { class: "row", style: "gap:6px" },
        h("button", { class: "btn ghost", type: "button", onclick: function () { m.hataIsle(k.n, "yeniden"); m.isle().then(function () { draw(); }); } }, "Yeniden dene"),
        h("button", { class: "btn ghost", type: "button", onclick: function () { m.hataIsle(k.n, "at"); draw(); } }, "At")) : null);
  }) : [h("div", { class: "small mute" }, syn ? "Gönderilmeyi bekleyen değişiklik yok." : "Çevrimdışı senkron kapalı; değişiklikler anında sunucuya gider, bağlantı yoksa yazma başarısız olur.")];
  var sil = G.onay
    ? h("div", { class: "lbox warn", "data-gvn": "sil-onay" }, h("div", { class: "label" }, "Yerel veriyi sil"), h("p", null, PP.guven.etki("yerel")),
        h("label", { class: "small", style: "display:flex;gap:6px;align-items:center" }, h("input", { type: "checkbox", "data-gvn": "goruldu", checked: G.goruldu ? "" : null, onchange: function (e) { G.goruldu = e.target.checked; } }), "Dışa aktarma önerisini gördüm" + (G.yedekAlindi ? " (yedek indirildi)" : "")),
        h("div", { class: "row", style: "gap:6px" },
          h("button", { class: "btn ghost", type: "button", "data-gvn": "yedek", onclick: gvnDisaAktar }, "Önce dışa aktar"),
          h("button", { class: "btn", type: "button", "data-gvn": "sil-evet", onclick: function () {
            var r = PP.guven.sil({ kapsam: "yerel", onay: true, disaAktarmaOnerisiGoruldu: G.goruldu === true }, null, S.me);
            G.msg = r.ok ? r.silinen + " yerel kayıt silindi." : "Silinmedi: " + (r.neden === "disa-aktarma-onerisi-gerekli" ? "önce dışa aktarma önerisini gördüğünü işaretle." : r.neden);
            if (r.ok) { G.onay = false; setTimeout(function () { location.reload(); }, 600); }
            draw();
          } }, "Evet, bu cihazdaki veriyi sil"),
          h("button", { class: "btn ghost", type: "button", onclick: function () { G.onay = false; G.goruldu = false; draw(); } }, "Vazgeç")))
    : h("button", { class: "btn ghost", type: "button", "data-gvn": "sil", onclick: function () { G.onay = true; draw(); } }, "Bu cihazdaki yerel veriyi sil…");
  return h("div", { class: "panel guven", "data-gvn": "panel" }, h("div", { class: "label" }, "Güven merkezi"), h("h2", null, "Verin, nerede, neden"),
    h("div", { class: "small mute" }, "Neyi sakladığımızı, neye dayandığımızı ve verini nasıl yönetebileceğini burada görürsün. Aşağıdaki sınırlar da gerçektir."),
    h("details", { class: "more", open: G.ac ? true : null, ontoggle: function (e) { G.ac = e.target.open; } }, h("summary", null, "Saklanan veri ve nedeni (" + ozet.length + " yerel alan)"), h("div", { class: "morebox" }, envanter)),
    h("details", { class: "more" }, h("summary", null, "Ölçülen / çıkarım / doğrulanmamış"), h("div", { class: "morebox" }, h("ul", { class: "lr-ul" }, PP.guven.TURLER.map(function (t) { return h("li", null, h("b", null, t[0] + ": "), t[1]); })),
      h("div", { class: "small mute" }, "Her öneri 'Dayanak' ile kaynağını gösterir; plan tahminleri ölçülen değerlerden ayrı ve 'tahmin' etiketli yazılır."))),
    h("div", { class: "small", "data-gvn": "ai" }, h("b", null, "Yapay zekâya giden veri: "), ai.metin),
    h("div", { class: "small", "data-gvn": "portfolyo" }, h("b", null, "Portfolyo görünürlüğü: "), "Kanıt raporun yalnız sende görünür; paylaşım bağlantısı sunucu politikası uygulanana kadar kapalı."),
    h("div", { style: "display:grid;gap:8px;margin-top:8px" },
      tg("Paylaşılan cihaz modu (çıkışta bu cihazdaki verin silinir)", pay, function () { PP.cihaz.paylasilan(true); draw(); }, function () { PP.cihaz.paylasilan(false); draw(); }, "paylasilan"),
      tg("Çevrimdışı senkron — deneysel (yazmalar kuyruğa girer, çakışmada sana sorulur; yeniden yüklemeyle etkinleşir)", syn, function () { localStorage.setItem("pp_senkron", "1"); location.reload(); }, function () { localStorage.removeItem("pp_senkron"); if (window.__ppShim) window.__ppShim.onbellekTemizle(); location.reload(); }, "senkron"),
      PP.cevrimdisi && PP.cevrimdisi.destek() ? tg("Çevrimdışı kabuk — uygulamayı kurulabilir yapar, derslere bağlantısız erişim (deneysel)", pwa, function () { PP.cevrimdisi.ac().then(function () { draw(); }); }, function () { PP.cevrimdisi.kapat().then(function () { draw(); }); }, "pwa")
        : h("div", { class: "small mute" }, "Çevrimdışı kabuk bu bağlamda kullanılamıyor (https gerekir).")),
    PP.cevrimdisi && PP.cevrimdisi.bekleyenSurum ? h("div", { class: "lbox", "data-gvn": "yeni-surum" }, h("b", null, "Yeni sürüm hazır. "), h("button", { class: "btn", type: "button", onclick: function () { PP.cevrimdisi.guncelle(); } }, "Şimdi yenile")) : null,
    h("div", { class: "label", style: "margin-top:10px" }, "Senkron kuyruğu"), kuyrukEl,
    h("div", { class: "row", style: "margin-top:10px;gap:6px;flex-wrap:wrap" }, h("button", { class: "btn ghost", type: "button", "data-gvn": "disa", onclick: gvnDisaAktar }, "Verimi dışa aktar (JSON)"), sil),
    G.msg ? h("div", { class: "small", role: "status", "data-gvn": "msg" }, G.msg) : null,
    h("ul", { class: "lr-ul small mute", "data-gvn": "sinirlar" }, PP.guven.SINIRLAR.map(function (x) { return h("li", null, x); })));
}

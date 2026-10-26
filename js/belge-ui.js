(function () {
  var $ = function (i) { return document.getElementById(i); }, B = window.PPBelge, q = new URLSearchParams(location.search);
  var M = window.PP_MARKA; if (M) { document.title = "Bitirme belgesi · " + M.ad; document.querySelectorAll("[data-marka]").forEach(function (e) { e.textContent = M.ad; }); }
  var kes = function (s) { return String(s || "").slice(0, 80); };   // URL'den gelen ad/yol input maxlength'ini aşmasın
  $("ad").value = kes(q.get("ad")); $("hat").value = kes(q.get("hat"));
  var dogrulaKipi = !!q.get("kod"), tGecerli = B.tarihGecerli(q.get("t") || "");
  $("t").value = tGecerli ? q.get("t") : (dogrulaKipi ? "" : new Date().toISOString().slice(0, 10));   // doğrulamada tarih sessizce bugüne dönmez
  if ((dogrulaKipi || q.has("t")) && !tGecerli) $("sonuc").textContent = "Bağlantıda tarih (?t=) yok ya da geçersiz; doğrulamak için belgenin tarihini kendin gir.";
  if (dogrulaKipi) { $("kodK").hidden = false; $("kodG").value = q.get("kod"); $("b").textContent = "Doğrula"; }
  function goster(ad, hat, t, k) {
    $("oAd").textContent = ad; $("oHat").textContent = hat; $("oT").textContent = t; $("oKod").textContent = k; $("belge").hidden = false;
  }
  $("f").addEventListener("submit", function (e) {
    e.preventDefault();
    var ad = B.norm($("ad").value), hat = B.norm($("hat").value), t = $("t").value, s = $("sonuc");
    if (!ad || !hat || !B.tarihGecerli(t)) { s.textContent = "Ad, yol ve geçerli bir tarih gir."; return; }
    if (!window.crypto || !crypto.subtle) { s.textContent = "Bu tarayıcıda (ya da güvenli olmayan bağlantıda) kod üretilemiyor."; return; }
    if (!$("kodK").hidden) {
      B.dogrula(ad, hat, t, $("kodG").value).then(function (ok) {
        s.textContent = ok ? "Kod bu ad, yol ve tarihle eşleşiyor." : "Kod bu ad, yol ve tarihle EŞLEŞMİYOR.";
        if (ok) B.kod(ad, hat, t).then(function (k) { goster(ad, hat, t, k); });
      });
    } else B.kod(ad, hat, t).then(function (k) { s.textContent = "Belge hazır. Doğrulamak için: " + location.origin + location.pathname + "?kod=" + k + "&ad=" + encodeURIComponent(ad) + "&hat=" + encodeURIComponent(hat) + "&t=" + t; goster(ad, hat, t, k); });
  });
  $("pr").addEventListener("click", function () { window.print(); });
})();

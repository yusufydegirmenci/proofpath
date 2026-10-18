"use strict";
/* ---- Faz 12 V4: geri bildirim, yalnız yerel kuyruk (ya_pp_ogr.geriBildirim). Sunucuya ya da GitHub'a hiçbir şey göndermez.
   Kişisel veri toplanmaz: bağlam yalnız sekme, ders/proje kimliği, adım ve (hazır ders/proje için) başlıktır. Saf mantık, DOM yok. ---- */
(function (g) {
  var O = g.PP.ogr;
  var TURLER = [["hata", "Hata"], ["istek", "İstek"], ["sikayet", "Şikayet"], ["oneri", "Öneri"]];
  var ONEMLER = [["", "Belirtme"], ["dusuk", "Düşük"], ["orta", "Orta"], ["yuksek", "Yüksek"]];
  var SINIR = { baslik: 80, aciklama: 2000, kuyruk: 100, taslak: 20 };
  var SABLON = "Problem:\n\nExpected:\n\nActual:\n\nSteps:\n1. ";
  /* e-posta ya da "şifre/token/anahtar = değer" biçimi: engellemez, formda uyarı çıkarır */
  var GIZLI = /[\w.+-]+@[\w-]+\.[\w.-]+|(password|passwd|şifre|sifre|parola|token|secret|api[_ -]?key|anahtar)\s*[:=]\s*\S+/i;

  function yeniId() { return "gb-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7); }
  function dizge(x, en) { return typeof x === "string" ? x.trim().slice(0, en) : ""; }
  function bilinen(liste, v) { return liste.some(function (x) { return x[0] === v; }); }

  /* Bağlam: yalnız bilinen alanlar, kısaltılmış. tur: ders | proje | genel */
  function baglam(b) {
    b = b && typeof b === "object" ? b : {};
    var tur = b.tur === "ders" || b.tur === "proje" ? b.tur : "genel";
    return { tur: tur, sekme: dizge(b.sekme, 20), id: dizge(b.id, 60), baslik: dizge(b.baslik, 100), adim: dizge(b.adim, 20) };
  }
  function anahtar(b) { b = baglam(b); return b.tur + ":" + b.id; }

  /* {ok, hata:[…], uyari:[…]}; hata varsa kaydedilmez */
  function kontrol(f) {
    var hata = [], uyari = [];
    f = f && typeof f === "object" ? f : {};
    if (!bilinen(TURLER, f.tur)) hata.push("Bir tür seç.");
    var b = dizge(f.baslik, 1000), a = dizge(f.aciklama, 100000);
    if (b.length < 3) hata.push("Başlık en az 3 karakter olmalı.");
    if (b.length > SINIR.baslik) hata.push("Başlık en fazla " + SINIR.baslik + " karakter.");
    if (a.length < 10) hata.push("Açıklama en az 10 karakter olmalı.");
    if (a.length > SINIR.aciklama) hata.push("Açıklama en fazla " + SINIR.aciklama + " karakter.");
    if (f.onem && !bilinen(ONEMLER, f.onem)) hata.push("Önem geçersiz.");
    if (GIZLI.test(b + " " + a)) uyari.push("E-posta, şifre ya da anahtar gibi görünen bir şey var; kişisel bilgi yazma.");
    return { ok: !hata.length, hata: hata, uyari: uyari };
  }

  function gb(depo) { return O.depo.geriBildirim(undefined, depo); }
  function yaz(x, depo) { return O.depo.geriBildirim(x, depo); }
  function liste(depo) { return gb(depo).kuyruk.slice().sort(function (a, b) { return a.olusturma < b.olusturma ? 1 : -1; }); }

  /* Ekle ya da (duzId verilirse) düzenle. Dönüş {ok, kayit} ya da {ok:false, hata|neden} */
  function kaydet(f, b, duzId, depo) {
    var k = kontrol(f);
    if (!k.ok) return { ok: false, hata: k.hata };
    var d = gb(depo), simdi = new Date().toISOString(), ix = duzId ? d.kuyruk.findIndex(function (x) { return x.id === duzId; }) : -1;
    if (duzId && ix < 0) return { ok: false, neden: "kayit-yok" };
    var temiz = { tur: f.tur, baslik: dizge(f.baslik, SINIR.baslik), aciklama: dizge(f.aciklama, SINIR.aciklama), onem: f.onem || "" };
    var kayit;
    if (ix >= 0) kayit = d.kuyruk[ix] = Object.assign({}, d.kuyruk[ix], temiz, { guncelleme: simdi });
    else {
      if (d.kuyruk.length >= SINIR.kuyruk) return { ok: false, neden: "dolu", hata: ["Kuyruk dolu (" + SINIR.kuyruk + "). Önce dışa aktar, sonra eskileri sil."] };
      kayit = Object.assign({ id: yeniId(), baglam: baglam(b), durum: "yerel", olusturma: simdi, guncelleme: simdi }, temiz);
      d.kuyruk.push(kayit);
    }
    if (!duzId) delete d.taslaklar[anahtar(b)];
    return yaz(d, depo) ? { ok: true, kayit: kayit } : { ok: false, neden: "yazilamadi" };
  }
  function sil(kid, depo) {
    var d = gb(depo), n = d.kuyruk.length;
    d.kuyruk = d.kuyruk.filter(function (x) { return x.id !== kid; });
    return d.kuyruk.length < n && yaz(d, depo);
  }

  /* Taslak: bağlam anahtarı başına bir tane; gönderilmemiş yazı yenilemede ya da sekme değişiminde kaybolmaz. */
  function taslakKaydet(f, b, depo) {
    var d = gb(depo), k = anahtar(b), bos = !dizge(f && f.baslik, 200) && !dizge(f && f.aciklama, 5000);
    if (bos) delete d.taslaklar[k];
    else {
      d.taslaklar[k] = { tur: bilinen(TURLER, f.tur) ? f.tur : "hata", baslik: dizge(f.baslik, SINIR.baslik), aciklama: dizge(f.aciklama, SINIR.aciklama), onem: bilinen(ONEMLER, f.onem) ? f.onem : "", tarih: new Date().toISOString() };
      var ks = Object.keys(d.taslaklar);
      if (ks.length > SINIR.taslak) ks.sort(function (a, c) { return d.taslaklar[a].tarih < d.taslaklar[c].tarih ? -1 : 1; }).slice(0, ks.length - SINIR.taslak).forEach(function (x) { delete d.taslaklar[x]; });
    }
    return yaz(d, depo);
  }
  function taslak(b, depo) { return gb(depo).taslaklar[anahtar(b)] || null; }
  function taslakSil(b, depo) { var d = gb(depo); delete d.taslaklar[anahtar(b)]; return yaz(d, depo); }

  function baglamMetni(b) {
    b = baglam(b);
    return (b.tur === "ders" ? "ders" : b.tur === "proje" ? "proje" : "genel") + (b.id ? " " + b.id : "") + (b.baslik ? " (" + b.baslik + ")" : "") + (b.adim ? " · adım: " + b.adim : "") + (b.sekme ? " · sekme: " + b.sekme : "");
  }
  function markdown(k) {
    var t = (TURLER.filter(function (x) { return x[0] === k.tur; })[0] || [0, k.tur])[1];
    return "## [" + t + "] " + k.baslik + "\n- Bağlam: " + baglamMetni(k.baglam) + "\n" + (k.onem ? "- Önem: " + k.onem + "\n" : "") + "- Tarih: " + k.olusturma.slice(0, 10) + "\n\n" + k.aciklama + "\n";
  }
  function markdownHepsi(l) { return "# Proofpath geri bildirimleri\n\n" + l.map(markdown).join("\n"); }
  function jsonHepsi(l) { return JSON.stringify({ surum: 1, kayitlar: l }, null, 2); }

  O.gb = { TURLER: TURLER, ONEMLER: ONEMLER, SINIR: SINIR, SABLON: SABLON, baglam: baglam, anahtar: anahtar, baglamMetni: baglamMetni, kontrol: kontrol, liste: liste, kaydet: kaydet, sil: sil,
    taslakKaydet: taslakKaydet, taslak: taslak, taslakSil: taslakSil, markdown: markdown, markdownHepsi: markdownHepsi, jsonHepsi: jsonHepsi };
})(typeof window !== "undefined" ? window : globalThis);

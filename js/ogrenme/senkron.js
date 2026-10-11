"use strict";
/* ---- Değişiklik kuyruğu ve senkron (M§8.9) — arka uçtan bağımsız motor ----
   - Yazma kuyruğa alınır, kalıcıdır (kullanıcı kimliğine göre ayrı anahtar), sırayla gönderilir.
   - Durumlar: bekliyor (çevrimdışı/ağ hatası), çakışma (sunucu bizden sonra değişmiş), hata (sunucu reddetti), başarılı.
   - Çakışmada SESSİZ ÜZERİNE YAZMA YOK: taban sürümü (updated_at) sunucudakiyle eşleşmezse iki sürüm de saklanır, kullanıcı seçer.
   - Kesilen istek tekrar denenir; aynı değişiklik iki kez uygulanmaz (taban sürümüyle karşılaştırmalı yazma).
   Arka uç (adaptör): oku(path)→{updated_at,data}|null · yaz(kayit)→{ok,updated_at}|{cakisma,sunucu} · sil(kayit)→ aynısı. Ağ hatası = fırlatılan hata
   (e.ag=true ya da TypeError/“fetch” ), sunucu reddi = {red:true,mesaj}. Etkin değilse hiçbir şey yapmaz (varsayılan KAPALI: localStorage pp_senkron=1). */
(function (g) {
  var PP = g.PP = g.PP || {};
  var ON = "pp_kuyruk:";

  function depoVar() { try { return g.localStorage || null; } catch (e) { return null; } }
  function acik() { var d = depoVar(); try { return !!d && d.getItem("pp_senkron") === "1"; } catch (e) { return false; } }

  function Motor(sec) {
    sec = sec || {};
    var depo = sec.depo || depoVar(), uid = sec.uid || null, arka = sec.arka || null, simdi = sec.simdi || function () { return new Date().toISOString(); };
    var dinleyiciler = [], calisiyor = false, cevrimici = sec.cevrimici !== false, son = null;
    var anahtar = function () { return ON + uid; };

    function oku() { if (!depo || !uid) return []; try { var l = JSON.parse(depo.getItem(anahtar()) || "[]"); return Array.isArray(l) ? l : []; } catch (e) { return []; } }
    function yaz(l) { if (!depo || !uid) return false; try { depo.setItem(anahtar(), JSON.stringify(l)); return true; } catch (e) { return false; } }
    function bildir() { var d = durum(); dinleyiciler.slice().forEach(function (f) { try { f(d); } catch (e) { /* dinleyici hatası kuyruğu bozmaz */ } }); }

    function durum() {
      var l = oku();
      return { cevrimici: cevrimici, bekleyen: l.filter(function (x) { return x.durum === "bekliyor"; }).length, cakisma: l.filter(function (x) { return x.durum === "cakisma"; }).length,
        hata: l.filter(function (x) { return x.durum === "hata"; }).length, son: son, calisiyor: calisiyor };
    }

    /* kayit: {path, coll, id, tur:"set"|"update"|"delete", data, taban} — aynı yola bekleyen kayıt varsa birleşir (en eski taban korunur) */
    function ekle(k) {
      if (!uid) return { ok: false, neden: "oturum-yok" };
      var l = oku(), var_ = l.filter(function (x) { return x.path === k.path && x.durum === "bekliyor"; })[0];
      if (var_) { var_.data = k.data; var_.tur = k.tur === "delete" ? "delete" : var_.tur === "delete" ? "set" : k.tur; var_.ts = simdi(); }
      else l.push({ n: (l.length ? Math.max.apply(null, l.map(function (x) { return x.n || 0; })) : 0) + 1, path: k.path, coll: k.coll, id: k.id, tur: k.tur, data: k.data == null ? null : k.data, taban: k.taban == null ? null : k.taban, ts: simdi(), durum: "bekliyor", deneme: 0 });
      var ok = yaz(l); bildir();
      return { ok: ok };
    }

    function agHatasi(e) { return !!e && (e.ag === true || e instanceof TypeError || /fetch|network|ağ/i.test(String(e && e.message))); }

    /* Sırayla gönderir; ağ hatasında durur (kalanlar bekliyor). */
    function isle() {
      if (calisiyor || !arka || !uid) return Promise.resolve(durum());
      calisiyor = true; bildir();
      function sira() {
        var l = oku(), k = l.filter(function (x) { return x.durum === "bekliyor"; })[0];
        if (!k) { calisiyor = false; son = durum().cakisma || durum().hata ? "sorun" : "basarili"; bildir(); return Promise.resolve(durum()); }
        k.deneme = (k.deneme || 0) + 1;
        var is = k.tur === "delete" ? arka.sil(k) : arka.yaz(k);
        return Promise.resolve(is).then(function (r) {
          var l2 = oku(), x = l2.filter(function (y) { return y.n === k.n; })[0];
          if (!x) return sira();
          if (r && r.ok) l2 = l2.filter(function (y) { return y.n !== k.n; });
          else if (r && r.cakisma) { x.durum = "cakisma"; x.sunucu = r.sunucu || null; }
          else { x.durum = "hata"; x.mesaj = String((r && r.mesaj) || "sunucu reddetti").slice(0, 200); }
          yaz(l2); cevrimici = true; bildir();
          return sira();
        }, function (e) {
          if (agHatasi(e)) { cevrimici = false; calisiyor = false; son = "cevrimdisi"; bildir(); return durum(); }   /* kesilen istek: bekliyor kalır, tekrar denenir */
          var l3 = oku(), x2 = l3.filter(function (y) { return y.n === k.n; })[0];
          if (x2) { x2.durum = "hata"; x2.mesaj = String(e && e.message || e).slice(0, 200); yaz(l3); }
          bildir(); return sira();
        });
      }
      return sira();
    }

    /* Çakışma çözümü: "benim" → sunucudaki sürüm taban alınır ve yeniden sıraya girer; "sunucu" → benimki atılır, sunucu verisi döner */
    function coz(n, secim) {
      var l = oku(), x = l.filter(function (y) { return y.n === n && y.durum === "cakisma"; })[0];
      if (!x) return { ok: false, neden: "yok" };
      if (secim === "benim") { x.taban = x.sunucu ? x.sunucu.updated_at : null; x.durum = "bekliyor"; x.sunucu = null; yaz(l); bildir(); return { ok: true }; }
      if (secim === "sunucu") { var s = x.sunucu; yaz(l.filter(function (y) { return y.n !== n; })); bildir(); return { ok: true, sunucu: s }; }
      return { ok: false, neden: "gecersiz-secim" };
    }
    /* Hata (reddedilen) kayıt: yeniden dene ya da at — yalnız kullanıcı eylemiyle */
    function hataIsle(n, secim) {
      var l = oku(), x = l.filter(function (y) { return y.n === n && y.durum === "hata"; })[0];
      if (!x) return { ok: false, neden: "yok" };
      if (secim === "yeniden") { x.durum = "bekliyor"; yaz(l); bildir(); return { ok: true }; }
      if (secim === "at") { yaz(l.filter(function (y) { return y.n !== n; })); bildir(); return { ok: true }; }
      return { ok: false, neden: "gecersiz-secim" };
    }
    function cevrimiciYap(v) { cevrimici = !!v; bildir(); }
    function dinle(f) { dinleyiciler.push(f); return function () { var i = dinleyiciler.indexOf(f); if (i >= 0) dinleyiciler.splice(i, 1); }; }
    /* Çıkış: kuyruğu SİLMEZ (başka hesap anahtarıyla göremez); paylaşılan cihaz modunda temizle() çağrılır */
    function temizle() { if (depo && uid) { try { depo.removeItem(anahtar()); } catch (e) { return false; } } bildir(); return true; }
    return { ekle: ekle, isle: isle, coz: coz, hataIsle: hataIsle, durum: durum, liste: oku, dinle: dinle, cevrimiciYap: cevrimiciYap, temizle: temizle };
  }

  PP.sync = { Motor: Motor, acik: acik, ANAHTAR_ON_EKI: ON };
})(typeof window !== "undefined" ? window : globalThis);

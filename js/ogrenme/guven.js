"use strict";
/* ALAN: Ayarlar > Güven merkezi, veri envanteri, dışa aktarma ve yerel silme (PP.guven).
   NE YAPAR: Hangi verinin nerede, neden saklandığını listeler; silme yalnız açık onayla ve yalnız bu cihazın yerel verisini kapsar.
   SORUN OLURSA: Envanter anahtar önekleri üzerinden çalışır (ya_gm, ya_gs, ya_lc, ya_nt, ya_pl, ya_pp_ogr, pp_kuyruk); yeni yerel anahtar burada listelenmezse dışa aktarma/silme onu atlar. Arayüz js/atolye/guven-ui.js.
   YENİ ÖZELLİK: Yeni anahtar ENVANTER'e eklenir; tests/faz9_senkron.js güncellenir. */
/* ---- Güven merkezi (M§8.10): neyin nerede saklandığı, neden, nasıl dışa aktarılır/silinir ----
   Vaat edilemeyecek garanti yazılmaz (şifreleme, "tamamen güvenli", "kimse göremez" yok). Silme yalnız açık onay + dışa aktarma önerisi görüldükten sonra;
   yalnız bu cihazın yerel verisini kapsar (sunucu/hesap silme bu sürümde YOK ve öyle söylenir). */
(function (g) {
  var PP = g.PP = g.PP || {};

  /* Saklanan veri: anahtar öneki, ne, neden, nerede, türü (ölçülen / beyan / tercih / içerik) */
  var ENVANTER = [
    ["ya_pp_ogr", "Öğrenme kayıtları: mini sınav/seviye denemeleri, lab kanıtları, proje kayıtları, koç/plan/mülakat tercihleri", "İlerlemeyi, tekrarı, raporu ve planı hesaplamak", "cihaz", "ölçülen + beyan"],
    ["ya_lc", "Ders adımı bayrakları (ısınma, okuma, sınav, alıştırma)", "Hangi ders adımında kaldığını göstermek", "cihaz", "beyan"],
    ["ya_pl", "Yerleştirme ve alan seviyesi sonuçları", "Başlangıç noktasını ayarlamak", "cihaz", "ölçülen"],
    ["ya_gs", "Oyun/Lig yerel istatistikleri ve seri", "Seri ve oyun ilerlemesini göstermek", "cihaz", "ölçülen"],
    ["ya_gm", "Oyun merkezi durumu", "Oyun ilerlemesini sürdürmek", "cihaz", "ölçülen"],
    ["ya_nt", "Ders notların", "Notlarını saklamak (senin yazdığın metin)", "cihaz", "kullanıcı metni"],
    ["ya_*", "Diğer yerel tercihler (tema, görünüm, yardım, kartlar)", "Arayüzü ve tekrar kartlarını hatırlamak", "cihaz", "tercih"],
    ["docs (sunucu)", "Hesabına bağlı bulut kayıtları: projeler, günlük/ilerleme, notlar, ayarlar", "Cihazlar arası senkron ve Koç görevleri", "sunucu", "ölçülen + beyan"],
    ["lig/destek (sunucu)", "Lig profilin (görünen ad, XP, seri özeti)", "Arkadaşlarla sıralama; «Özetimi arkadaşlara göster» kapalıysa özet gizlenir", "sunucu (diğer üyelere okunabilir)", "ölçülen"]
  ];
  var TURLER = [
    ["Ölçülen", "Yaptığın denemelerin ve süren kayıtların kendisi (örn. mini sınav puanı)."],
    ["Çıkarım", "Kayıtlardan hesaplanan öneri, plan ve tahminler; ölçülmüş gerçek değildir (örn. kaç haftada biter)."],
    ["Doğrulanmamış / beyan", "Senin işaretlediğin ama sistemin doğrulamadığı şeyler (örn. 'tamamladım' işareti); yetkinlik kanıtı sayılmaz."]
  ];
  var SINIRLAR = [
    "Yerel veriler tarayıcı depolamasında şifresiz tutulur; bu cihazı ve tarayıcı profilini kullanan biri geliştirici araçlarıyla okuyabilir.",
    "Silme yalnız bu cihazdaki yerel veriyi kapsar. Sunucudaki hesap kayıtlarını silme bu sürümde yok.",
    "Lig özetin açıksa diğer üyeler görebilir; kapatmak önceki görüntülemeleri geri almaz.",
    "Dışa aktarma bir yedektir; başka bir hesaba otomatik içe aktarılamaz."
  ];

  function depoVar() { try { return g.localStorage || null; } catch (e) { return null; } }
  function yerelAnahtarlar(d) { var a = []; for (var i = 0; i < d.length; i++) if (/^ya_/.test(d.key(i))) a.push(d.key(i)); return a; }

  /* AI/harici sağlayıcıya giden veri: Koç tercihine göre */
  function aiVerisi() {
    var t = null; try { t = PP.koc.tercihOku(); } catch (e) { t = null; }
    if (!t || t.saglayici !== "acik") return { gider: false, metin: "Harici yapay zekâ sağlayıcısı kapalı: hiçbir veri dışarı gönderilmiyor." };
    return { gider: true, metin: "Sağlayıcı AÇIK: Koça yazdığın soru ile özet ilerleme sayıları ve öneri başlıkları gönderilir. Cevap anahtarları, ders notların ve proje notların gönderilmez; açık sınav sırasında hiçbir şey gönderilmez." };
  }

  function kayitOzeti(depo) {
    depo = depo || depoVar();
    if (!depo) return [];
    return yerelAnahtarlar(depo).sort().map(function (k) { return { anahtar: k, bayt: (depo.getItem(k) || "").length }; });
  }

  /* Dışa aktarma: bu cihazdaki yerel veri + kuyruk; JSON metni */
  function disaAktar(depo, uid) {
    depo = depo || depoVar();
    var o = { surum: 1, tarih: new Date().toISOString(), kapsam: "bu cihazdaki yerel veri (sunucu kayıtları dahil değil)", anahtarlar: {}, kuyruk: null };
    if (!depo) return JSON.stringify(o);
    yerelAnahtarlar(depo).forEach(function (k) { o.anahtarlar[k] = depo.getItem(k); });
    if (uid && depo.getItem("pp_kuyruk:" + uid)) o.kuyruk = depo.getItem("pp_kuyruk:" + uid);
    return JSON.stringify(o, null, 1);
  }

  /* Etki metni: onay ekranında gösterilir */
  function etki(kapsam, depo) {
    var n = kayitOzeti(depo).length;
    if (kapsam === "yerel") return "Bu cihazdaki " + n + " yerel kayıt alanı (ilerleme, notlar, tercihler) silinir. Sunucudaki hesabın etkilenmez; senkron açıksa gönderilmemiş değişiklikler de kaybolur. Geri alınamaz; önce dışa aktarmanı öneririz.";
    return "Bilinmeyen kapsam.";
  }

  /* Silme: yalnız yerel kapsam; onay === true ve dışa aktarma önerisi görülmüş olmalı. Testte yalnız sahte depo kullanılır. */
  function sil(sec, depo, uid) {
    sec = sec || {};
    depo = depo || depoVar();
    if (sec.kapsam !== "yerel") return { ok: false, neden: "kapsam-desteklenmiyor" };
    if (sec.onay !== true) return { ok: false, neden: "onay-gerekli" };
    if (sec.disaAktarmaOnerisiGoruldu !== true) return { ok: false, neden: "disa-aktarma-onerisi-gerekli" };
    if (!depo) return { ok: false, neden: "depo-yok" };
    var anah = yerelAnahtarlar(depo);
    anah.forEach(function (k) { depo.removeItem(k); });
    if (uid) depo.removeItem("pp_kuyruk:" + uid);
    return { ok: true, silinen: anah.length };
  }

  PP.guven = { ENVANTER: ENVANTER, TURLER: TURLER, SINIRLAR: SINIRLAR, aiVerisi: aiVerisi, kayitOzeti: kayitOzeti, disaAktar: disaAktar, etki: etki, sil: sil };
})(typeof window !== "undefined" ? window : globalThis);

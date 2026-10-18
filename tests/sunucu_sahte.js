// Sahte sınav sunucusu (tarayıcı testleri için). GERÇEK cevap anahtarı repoda yok; bu sunucu her soru için kimlikten türeyen SENTETİK doğru şık seçer
// (seçenek dizisindeki sıra = kimliğin ilk 8 onaltılık hanesi mod seçenek sayısı). Gerçek RPC ile aynı yanıt biçimi: ogr_deneme_gonder.
// Kullanım: ctx.addInitScript(SAHTE_INIT) (stub.js INIT'ten sonra). Sayfadan: window.__ogrDurum (çağrı kaydı, ayarlar), window.__sentetikDogru(soru).
const SAHTE_INIT = () => {
  const durum = window.__ogrDurum = { cagrilar: [], kapiCagrilari: [], sinir: 5, deneme: {}, cevrimdisi: false, hata: null, gecikme: 0 };
  const kimlikSayisi = (id) => parseInt(String(id).slice(0, 8), 16);
  const secenekler = (q) => q.options || q.o;
  window.__sentetikDogru = (q) => secenekler(q)[kimlikSayisi(q.id) % secenekler(q).length];
  function sorular(hedef) {
    let m;
    if ((m = /^ders:([a-z]+):(\d+):sinav$/.exec(hedef))) { const d = (window.PP_LESSONS[m[1]] || {})[m[2]]; return d && d.quiz && d.quiz.map((q) => ({ id: q.id, o: q.options, agirlik: 1 })); }
    if ((m = /^seviye:([a-z]+)$/.exec(hedef))) { const s = (window.PP_SINAV && PP_SINAV.seviye || {})[m[1]]; return s && s.sorular.map((q) => ({ id: q.id, o: q.o, agirlik: q.d })); }
    for (const k of ['sinav0', 'sinav1', 'sinav2']) if (window.PP_VA && PP_VA[k] && PP_VA[k].id === hedef) return PP_VA[k].sorular.map((q) => ({ id: q.id, o: q.o, agirlik: 1 }));
    return null;
  }
  const bekle = (ms) => new Promise((r) => setTimeout(r, ms));
  const api = {
    gonder: async (hedef, varyant, cevaplar, yardim) => {
      durum.cagrilar.push({ hedef, varyant, cevaplar: JSON.parse(JSON.stringify(cevaplar)), yardim });
      if (durum.gecikme) await bekle(durum.gecikme);
      if (durum.cevrimdisi) throw new TypeError('Failed to fetch');
      if (durum.hata) return { data: null, error: durum.hata };
      const S = sorular(hedef);
      if (!S || !S.length) return { data: null, error: { code: '22023', message: 'bilinmeyen hedef' } };
      const n = (durum.deneme[hedef] = (durum.deneme[hedef] || 0) + 1);
      if (n > durum.sinir) return { data: null, error: { code: '54000', message: 'cok sik deneme; biraz bekle' } };
      let maks = 0, puan = 0, dogruN = 0;
      S.forEach((q) => { maks += q.agirlik; if (cevaplar[q.id] === q.o[kimlikSayisi(q.id) % q.o.length]) { puan += q.agirlik; dogruN++; } });
      const gecti = puan / maks >= 0.8;
      let anahtar = null;
      if (gecti) {
        anahtar = {};
        S.forEach((q) => {
          const dogru = q.o[kimlikSayisi(q.id) % q.o.length], yanlisIlk = q.o.find((x) => x !== dogru);
          anahtar[q.id] = { dogru, ok: cevaplar[q.id] === dogru, why: 'sentetik açıklama ' + q.id, whyNot: { [yanlisIlk]: 'sentetik neden ' + q.id } };
        });
      }
      return { data: { puan, maks, oran: Math.round((puan / maks) * 10000) / 10000, gecti, dogru_sayisi: dogruN, soru_sayisi: S.length, esik: 0.8, surum: '2026-10-v1', anahtar }, error: null };
    },
    kapi: async (kapi) => {
      durum.kapiCagrilari.push(kapi);
      if (durum.cevrimdisi) throw new TypeError('Failed to fetch');
      return { data: { kapi, acik: !!durum.kapiAcik, nedenler: durum.kapiAcik ? [] : [{ kod: 'hedef-denenmedi', ref: 'x' }] }, error: null };
    }
  };
  window.__ogrSahte = api;
};
module.exports = { SAHTE_INIT };

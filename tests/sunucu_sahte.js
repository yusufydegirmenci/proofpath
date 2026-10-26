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
    // Lig (Faz 13): ogr_lig_gonder'in JS yansıması. Doğru şık = QB'deki gerçek şık (durum.ligZorlaYanlis: sunucu hep yanlış der → puanı istemcinin değil sunucunun belirlediğini sınar). Puan kuralı SQL ile aynı (10/15/20, tam doğruya +5).
    ligGonder: async (gun, sira, secenek, sorular, tekrar, seviye) => {
      durum.ligCagrilari = durum.ligCagrilari || [];
      durum.ligCagrilari.push({ gun, sira, secenek, sorular: sorular && sorular.slice(), tekrar, seviye });
      if (durum.cevrimdisi) throw new TypeError('Failed to fetch');
      if (durum.hata) return { data: null, error: durum.hata };
      const L = durum.lig = durum.lig || {};
      let g = L[gun];
      if (!g || !g.qs) {
        if (!Array.isArray(sorular) || !sorular.length || sorular.length > 10 || new Set(sorular).size !== sorular.length) return { data: null, error: { code: '22023', message: 'soru listesi gecersiz' } };
        g = L[gun] = { ok: 0, tot: 0, w: 0, wok: 0, pts: 0, a: [], v: 2, qs: sorular.slice(), rv: (tekrar || []).filter((x) => sorular.includes(x)), n: sorular.length, lv: seviye || 0 };
      }
      if (!(sira >= 0 && sira < g.n) || g.a[sira] != null) return { data: null, error: { code: '23505', message: 'bu soru zaten cevaplandi' } };
      const soru = g.qs[sira], dogru = durum.ligZorlaYanlis ? -1 : window.QB[soru].a, zor = window.QB[soru].d, c = [0, 1, 1.5, 2][zor];
      g.a[sira] = secenek; g.tot++; g.w += c;
      if (secenek === dogru) { g.ok++; g.wok += c; g.pts += Math.round(10 * c); }
      if (g.tot === g.n && g.ok === g.tot) g.pts += 5;
      return { data: { gun: JSON.parse(JSON.stringify(g)), dogru: secenek === dogru, dogru_secenek: dogru, tarih: gun }, error: null };
    },
    // Bölüm sonu bilgi testi (Faz 21): ogr_bilgi_kontrol'ün yansıması; deneme sayacına dokunmaz. Doğru şık = kimlikten türeyen sentetik şık.
    bilgi: async (hedef, soruId, cevap) => {
      (durum.bilgiCagrilari = durum.bilgiCagrilari || []).push({ hedef, soruId, cevap });
      if (durum.cevrimdisi) throw new TypeError('Failed to fetch');
      const m = /^bolum:([a-z]+):(\d+):bilgi$/.exec(hedef), b = m && ((window.PP_BILGI || {})[m[1]] || {})[m[2]], q = b && b.sorular.find((x) => x.id === soruId);
      if (!q) return { data: null, error: { code: '22023', message: 'bu hedef icin soru yok' } };
      const dogru = q.options[kimlikSayisi(q.id) % q.options.length], yanlisIlk = q.options.find((x) => x !== dogru);
      return { data: { ok: cevap === dogru, dogru, why: 'sentetik açıklama ' + q.id, whyNot: { [yanlisIlk]: 'sentetik neden ' + q.id } }, error: null };
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

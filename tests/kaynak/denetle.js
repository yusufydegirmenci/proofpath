// Kaynak denetimi (AĞ GEREKİR): `npm run kaynak [-- --cikti=rapor.json] [--sadece=alt-dize]`
// Ders/proje girdilerindeki dış adreslere YALNIZ GET atar (yazma yok); HTTP 200 dışını ve başlığı konuyla eşleşmeyenleri listeler.
// `npm test` bu betiği ÇALIŞTIRMAZ (tests/ kökünde değil). Bot engelleyen siteler (403/429/999) "belirsiz" sayılır, hata değil.
const fs = require('fs');
const { topla } = require('./toplayici.js');
const args = process.argv.slice(2), arg = n => (args.find(a => a.startsWith('--' + n + '=')) || '').slice(n.length + 3);
const SADECE = arg('sadece'), CIKTI = arg('cikti');
const UA = 'Mozilla/5.0 (compatible; ProofPathKaynakDenetimi/1.0; yalniz GET)';
const ZAMAN = 25000, EN_COK_ESZAMANLI = 8, HOST_ESZAMANLI = 2;

const katla = s => String(s || '').toLocaleLowerCase('tr').replace(/[çÇ]/g, 'c').replace(/[ğĞ]/g, 'g').replace(/[ıİ]/g, 'i').replace(/[öÖ]/g, 'o').replace(/[şŞ]/g, 's').replace(/[üÜ]/g, 'u')
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const DUR = new Set('ile icin veya olan gibi nasil nedir kaynak resmi resmî guide guides the and for with from your what how docs documentation official dokuman dokumani rehber rehberi bolum sayfa sayfasi ucretsiz kurs course video tutorial reference tur turkce english'.split(' '));
const belirtec = s => katla(s).replace(/[^a-z0-9+#.]+/g, ' ').split(' ').map(x => x.replace(/^\.+|\.+$/g, '')).filter(x => x.length >= 4 && !DUR.has(x));

async function getir(url) {
  const ac = new AbortController(), t = setTimeout(() => ac.abort(), ZAMAN);
  try {
    const r = await fetch(url, { method: 'GET', redirect: 'follow', signal: ac.signal, headers: { 'user-agent': UA, 'accept': 'text/html,application/xhtml+xml,*/*;q=0.8', 'accept-language': 'en,tr;q=0.8' } });
    let govde = '';
    if (r.body && /html|xml|text|json/i.test(r.headers.get('content-type') || '')) {
      const rd = r.body.getReader(), dec = new TextDecoder('utf-8', { fatal: false });
      while (govde.length < 250000) { const { done, value } = await rd.read(); if (done) break; govde += dec.decode(value, { stream: true }); }
      try { await rd.cancel(); } catch (e) { /* kapandı */ }
    } else if (r.body) { try { await r.body.cancel(); } catch (e) { /* kapandı */ } }
    const al = re => { const m = govde.match(re); return m ? m[1].replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim() : ''; };
    const baslik = [al(/<title[^>]*>([\s\S]*?)<\/title>/i), al(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)["']/i), al(/<h1[^>]*>([\s\S]*?)<\/h1>/i)].filter(Boolean).join(' | ');
    return { durum: r.status, son: r.url, baslik: baslik.slice(0, 200) };
  } catch (e) { return { durum: 0, hata: (e.cause && e.cause.code) || e.name || String(e.message).slice(0, 60), baslik: '' }; }
  finally { clearTimeout(t); }
}
async function dene(url) {
  let s = await getir(url);
  if (s.durum === 0 || s.durum >= 500 || s.durum === 429) { await new Promise(r => setTimeout(r, 2500)); const s2 = await getir(url); if (s2.durum === 200 || s.durum === 0) s = s2; }
  return s;
}

(async () => {
  const { girdiler } = topla();
  let liste = girdiler.filter(g => !SADECE || g.url.includes(SADECE));
  const tekil = new Map(); liste.forEach(g => { if (!tekil.has(g.url)) tekil.set(g.url, []); tekil.get(g.url).push(g); });
  /* örnek/yer tutucu adresler (example.com, abc123..., ornek.com) kaynak değildir */
  const YER_TUTUCU = /^https?:\/\/([^/]*\.)?(example\.(com|org|net)|ornek\.com|abc123\.[^/]*)/i;
  const adresler = [...tekil.keys()].filter(u => !YER_TUTUCU.test(u));
  console.log(adresler.length + ' tekil adres denetleniyor (yalnız GET)...');
  const sonuc = new Map(), kuyruk = adresler.slice(), hostSay = {};
  const host = u => u.replace(/^https?:\/\//, '').split('/')[0];
  async function isci() {
    while (kuyruk.length) {
      const i = kuyruk.findIndex(u => (hostSay[host(u)] || 0) < HOST_ESZAMANLI);
      if (i < 0) { await new Promise(r => setTimeout(r, 150)); continue; }
      const u = kuyruk.splice(i, 1)[0], h = host(u); hostSay[h] = (hostSay[h] || 0) + 1;
      sonuc.set(u, await dene(u)); hostSay[h]--;
    }
  }
  await Promise.all(Array.from({ length: EN_COK_ESZAMANLI }, isci));
  const rapor = { toplam: adresler.length, ok: 0, belirsiz: [], bozuk: [], baslikUyumsuz: [] };
  adresler.forEach(u => {
    const s = sonuc.get(u), g = tekil.get(u);
    if (s.durum === 200) {
      rapor.ok++;
      g.forEach(x => {
        const bt = belirtec(x.baslik), sayfa = katla(s.baslik + ' ' + s.son);
        if (bt.length && s.baslik && !bt.some(b => sayfa.includes(b))) rapor.baslikUyumsuz.push({ url: u, girdiBasligi: x.baslik, sayfaBasligi: s.baslik, yer: x.yer });
      });
    } else if ([401, 403, 405, 429, 999].includes(s.durum)) rapor.belirsiz.push({ url: u, durum: s.durum, yer: g[0].yer, baslik: g[0].baslik });
    else rapor.bozuk.push({ url: u, durum: s.durum, hata: s.hata || '', son: s.son || '', yer: g.map(x => x.yer), baslik: g[0].baslik });
  });
  console.log('Toplam ' + rapor.toplam + ' · 200: ' + rapor.ok + ' · belirsiz (bot engeli): ' + rapor.belirsiz.length + ' · bozuk: ' + rapor.bozuk.length + ' · başlık uyumsuz (elle bak): ' + rapor.baslikUyumsuz.length);
  rapor.bozuk.forEach(b => console.log('BOZUK  ' + (b.durum || b.hata) + '  ' + b.url + '  [' + b.baslik + ']  ' + b.yer[0]));
  rapor.belirsiz.forEach(b => console.log('BELİRSİZ ' + b.durum + '  ' + b.url));
  rapor.baslikUyumsuz.forEach(b => console.log('BAŞLIK?  ' + b.url + '\n     girdi: ' + b.girdiBasligi + '\n     sayfa: ' + b.sayfaBasligi));
  if (CIKTI) fs.writeFileSync(CIKTI, JSON.stringify(rapor, null, 2));
  process.exit(rapor.bozuk.length ? 1 : 0);
})();

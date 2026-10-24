// faz-k7: "Dinle" modu (js/ders/sesli-ders.js). Tarayıcı gerekmez: saf işlevler + sahte speechSynthesis ile oynatma akışı.
const fs = require('fs'), path = require('path'), vm = require('vm');
const KOK = path.join(__dirname, '..');
let n = 0, fails = 0;
const ok = (c, m) => { n++; console.log((c ? 'OK    ' : 'HATA  ') + m); if (!c) fails++; };

const kaynak = fs.readFileSync(path.join(KOK, 'js/ders/sesli-ders.js'), 'utf8');
const SES = require('../js/ders/sesli-ders.js');

/* ---- saf işlevler ---- */
ok(SES.hizSinir(0.1) === 0.8 && SES.hizSinir(9) === 1.5 && SES.hizSinir('x') === 1 && SES.hizSinir(1.23) === 1.25, 'hizSinir 0.8-1.5 aralığına kısar');
ok(SES.dilBul('Ağ nedir? Cihazlar') === 'tr-TR', 'dilBul: Türkçe harfli → tr-TR');
ok(SES.dilBul("Hi, I'm Mark. Nice to meet you!") === 'en-US', 'dilBul: İngilizce cümle → en-US');
ok(SES.dilBul('Router ve switch farkı') === 'tr-TR', 'dilBul: Türkçe/teknik karışık → tr-TR');
const v = [{ lang: 'en_US', name: 'a' }, { lang: 'tr-TR', name: 'b' }, { lang: 'en-GB', name: 'c' }];
ok(SES.sesBul(v, 'tr-TR').name === 'b' && SES.sesBul(v, 'en-US').name === 'a' && SES.sesBul([v[0]], 'tr-TR') === null, 'sesBul: dil eşler, yoksa null');
ok(SES.cumleler('192.168.1.1 adresi. İkinci cümle! Üçüncü?').length === 3, 'cumleler: IP içindeki noktada bölmez');

const l = { title: 'Deneme', blocks: [
  { t: 'h', text: 'Başlık' }, { t: 'p', text: 'Bir. İki.' }, { t: 'cmd', text: 'show ip interface brief\nconf t' },
  { t: 'box', h: 'Not', text: 'Kutu metni.' }, { t: 'steps', h: 'Adımlar', items: ['1) A', '2) B'] }] };
const P = SES.parcala(l), hepsi = P.map(p => p.t).join(' | ');
ok(!/show ip|conf t/.test(hepsi) && P.some(p => p.kod && /kod bloğu/i.test(p.t)), 'parcala: kod okunmaz, "Kod bloğu" denir');
ok(['Deneme', 'Başlık', 'Bir.', 'İki.', 'Not', 'Kutu metni.', 'Adımlar', '1) A', '2) B'].every(x => hepsi.includes(x)), 'parcala: başlık, kutu etiketi ve adımlar dahil');

/* ---- gerçek dersler ---- */
const win = {}; vm.runInNewContext(fs.readdirSync(path.join(KOK, 'content/lessons')).filter(f => f.endsWith('.js')).map(f => fs.readFileSync(path.join(KOK, 'content/lessons', f), 'utf8')).join('\n'), { window: win, console });
let ders = 0, bos = 0, kodSizdi = 0;
Object.values(win.PP_LESSONS || {}).forEach(iz => Object.values(iz).forEach(d => {
  ders++; const p = SES.parcala(d); if (!p.length) bos++;
  (d.blocks || []).filter(b => b && b.t === 'cmd' && b.text).forEach(b => { const ilk = b.text.split('\n')[0].trim(); if (ilk.length > 8 && p.some(x => x.t.includes(ilk))) kodSizdi++; });
}));
ok(ders > 100 && bos === 0, 'gerçek dersler: ' + ders + ' ders, hepsinde okunacak metin var');
ok(kodSizdi === 0, 'gerçek dersler: hiçbir kod satırı okunacak metne sızmıyor');

/* ---- bağlantılar ---- */
const html = fs.readFileSync(path.join(KOK, 'index.html'), 'utf8'), oda = fs.readFileSync(path.join(KOK, 'js/ders/ders-odasi.js'), 'utf8');
ok(html.includes('<script src="js/ders/sesli-ders.js"></script>'), 'index.html betiği yüklüyor');
ok(/lrDinle\(l\)/.test(oda), 'ders odası anlatım adımı Dinle çubuğunu çağırıyor');
ok(!/fetch\(|XMLHttpRequest|new Audio|\.mp3/.test(kaynak), 'sunucu/dış ses dosyası yok');

/* ---- sahte tarayıcıyla oynatma akışı ---- */
class El {
  constructor(t, a) { this.tag = t; this.a = a || {}; this.children = []; this.cls = new Set(String(this.a.class || '').split(' ')); this.isConnected = true; this.hidden = !!this.a.hidden; this.style = {}; this.open = false; this.disabled = false; this.textContent = ''; }
  append(c) { this.children.push(c); } setAttribute(k, v) { this.a[k] = v; } scrollIntoView() {}
  get classList() { const s = this.cls; return { toggle: (c, f) => (f ? s.add(c) : s.delete(c)), contains: c => s.has(c) }; }
}
function h(tag, a) {
  const e = new El(tag, a);
  for (let i = 2; i < arguments.length; i++) [].concat(arguments[i]).forEach(x => { if (x != null && x !== false) e.append(x); });
  return e;
}
const konus = []; let bitir = [];
const synth = { get speaking() { return bitir.length > 0; }, speak(u) { konus.push(u); bitir.push(u); }, cancel() { bitir = []; }, getVoices: () => [{ lang: 'tr-TR' }], addEventListener() {} };
const ses = {}; const ctx = { window: ses, console, h, document: {}, SpeechSynthesisUtterance: function (t) { this.text = t; }, speechSynthesis: synth, navigator: { mediaSession: { setActionHandler() {} } }, lessonListFor: () => ({ list: [{ id: 'a' }, { id: 'b', title: 'Sonraki' }] }), lrOpen: id => { ctx.acildi = id; } };
Object.assign(ses, ctx); ctx.globalThis = ses; ses.window = ses; ses.h = h; ses.document = ctx.document;
vm.runInNewContext(kaynak, ctx);
const kok = ctx.window.lrDinle({ id: 'a', track: 'x', title: 'T', blocks: [{ t: 'p', text: 'Bir. İki.' }] });
const dugme = (k, i) => { const d = []; (function g(e) { if (e.tag === 'button') d.push(e); e.children.forEach(c => c.children && g(c)); })(k); return d[i]; };
ok(!!kok && kok.a['aria-label'] && dugme(kok, 0).a['aria-label'], 'Dinle çubuğu aria-label taşır');
const oynat = dugme(kok, 0), sonrakiBitis = () => { const u = bitir.shift(); u.onend(); };
oynat.a.onclick();
ok(konus.length === 1 && konus[0].text === 'T' && konus[0].lang === 'tr-TR' && konus[0].rate === 1, 'Dinle: ilk cümle okunur (tr-TR, hız 1)');
sonrakiBitis(); sonrakiBitis();
ok(konus.map(u => u.text).join('|') === 'T|Bir.|İki.', 'cümle bitince sıradaki cümleye geçer');
oynat.a.onclick(); // oynarken → duraklat
ok(bitir.length === 0 && /Devam|Dinle/.test(oynat.textContent), 'Duraklat konuşmayı keser');
oynat.a.onclick();
ok(konus[konus.length - 1].text === 'İki.', 'Devam: kalınan cümleden sürer');
sonrakiBitis();
const bitti = kok.children[kok.children.length - 1];
ok(bitti.hidden === false && bitti.children.some(c => c.tag === 'button' && c.children[0].startsWith('Sonraki ders')), 'ders bitince "sonraki ders" önerisi çıkar');
bitti.children.find(c => c.tag === 'button').a.onclick();
ok(ctx.acildi && ctx.acildi.id === 'b', 'öneri sonraki dersi açar');
if (fails) { console.log(fails + ' HATA / ' + n); process.exit(1); } else console.log('\nTAMAM ' + n);

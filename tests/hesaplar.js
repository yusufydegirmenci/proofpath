// Mevcut ilerleme / XP / seviye / seri / sınav hesaplarını SABİTLEYEN (karakterizasyon) testi.
// Beklenen değerler uygulama kodunu çağırarak değil, elle ve bağımsız hesaplanır.
// Hesap envanteri: proofpath-ops kayitlar/HESAP_ENVANTERI.md. Hata → çıkış 1.
const path = require('path');
const { INIT, chromium } = require('./stub.js');
const U = require('url').pathToFileURL(path.join(__dirname, '..', 'index.html')).href;
const PLAN = `try{var o={};['ccna','eng','sec','bk'].forEach(function(t){o[t]={lv:1,n:0,ok:0,d:'2026-10-08',skip:true}});localStorage.ya_pl=JSON.stringify(o)}catch(e){}`;

let fails = 0, n = 0;
const ok = (c, msg) => { n++; console.log((c ? 'OK    ' : 'HATA  ') + msg); if (!c) fails++; };
const eq = (a, b, msg) => ok(JSON.stringify(a) === JSON.stringify(b), msg + (JSON.stringify(a) === JSON.stringify(b) ? '' : '  → beklenen ' + JSON.stringify(b) + ', gelen ' + JSON.stringify(a)));
const yakin = (a, b, msg) => ok(Math.abs(a - b) < 1e-9, msg + (Math.abs(a - b) < 1e-9 ? '' : '  → beklenen ' + b + ', gelen ' + a));

// Sayfa içi ortak başlangıç: S alanlarını sıfırla (eşzamanlı çalışır; anlık görüntü güncellemeleri araya giremez).
const SIFIR = `
  function T(n){return addDays(today(),-n)}
  S.days=[];S.exams=[];S.badges=[];S.attempts=[];S.reports=[];S.progress=[];S.projects=[];S.topics=[];S.mock=[];
  S.treplies=[];S.treviews=[];S.profile=S.profile||{};S.profile.gates={};S.profile.jokerDates=[];
  S._ld=null;S.ready2=false;
  localStorage.removeItem('ya_lc');
  GS.sk=trkMap(1.5);GS.bx={};GS.st={};
`;
const run = (p, body) => p.evaluate(new Function(SIFIR + body));

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  const p = await ctx.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.addInitScript('window.__guest=true');
  await p.addInitScript(INIT);
  await p.addInitScript(PLAN);
  await p.goto(U);
  await p.waitForTimeout(1500);

  // ---- XP bileşenleri ----
  eq(await run(p, `S.attempts=[{date:T(0),xp:60},{date:T(0),xp:70},{date:T(1),xp:30}];return attemptXpByDate()`),
    await p.evaluate(() => { const t = today(), d = addDays(t, -1); return { [t]: 100, [d]: 30 }; }),
    'attemptXpByDate: günlük XP 100 ile sınırlı, ayrı günler toplanmaz');
  eq(await run(p, `S.progress=[{id:T(0),g_xp:100},{id:T(1),g_xp:10}];return gameXp()`), 50, 'gameXp: gün başına 40 sınır (GM_CAP) → 40+10');
  eq(await run(p, `S.progress=[{id:T(0),rtxp:500},{id:T(1),rtxp:20}];return rtXp()`), 320, 'rtXp: gün başına 300 sınır → 300+20');
  eq(await run(p, `S.projects=[{steps:[{done:true},{done:true},{done:false}],status:'yapılıyor',lv:2},{steps:[{done:true},{done:true},{done:true}],status:'bitti',lv:1}];return [pjXp(S.projects[0]),pjXp(S.projects[1]),projXp(),projDoneN()]`),
    [40, 90, 130, 1], 'proje XP: (adım*10 + bitti?60) * seviye; bitenler sayılır');
  eq(await run(p, `S.days=[{xp:10},{xp:5}];S.exams=[{xp:20}];S.badges=[{xp:7}];
      S.attempts=[{date:T(0),xp:60},{date:T(0),xp:70},{date:T(1),xp:30}];
      S.projects=[{steps:[{done:true},{done:true},{done:false}],status:'yapılıyor',lv:2},{steps:[{done:true},{done:true},{done:true}],status:'bitti',lv:1}];
      S.progress=[{id:T(0),g_xp:100,rtxp:500},{id:T(1),g_xp:10,rtxp:20}];return totalXp()`),
    672, 'totalXp: gün 15 + sınav 20 + rozet 7 + deneme 130 + proje 130 + oyun 50 + rota 320');

  // ---- seri (streak) ----
  eq(await run(p, `S.days=[{date:T(0),minutes:10},{date:T(1),minutes:5},{date:T(2),minutes:5}];var s=streakInfo();return [s.n,s.loggedToday,s.jokersLeft]`),
    [3, true, 1], 'streakInfo: bugün dahil 3 gün, joker hakkı 1');
  eq(await run(p, `S.days=[{date:T(1),minutes:10},{date:T(2),minutes:5}];var s=streakInfo();return [s.n,s.loggedToday]`),
    [2, false], 'streakInfo: bugün yoksa dünden geriye sayılır');
  eq(await run(p, `S.days=[{date:T(0),minutes:10},{date:T(2),minutes:5}];S.profile.jokerDates=[T(1)];return streakInfo().n`),
    2, 'streakInfo: joker günü seriyi köprüler ama sayılmaz (bugün+2 gün önce = 2)');
  eq(await run(p, `S.days=[{date:T(0),minutes:10},{date:T(3),minutes:5}];return streakInfo().n`), 1, 'streakInfo: boşluk seriyi keser');
  eq(await run(p, `S.days=[{date:T(0),minutes:0}];return [streakInfo().n,Object.keys(loggedDates()).length]`), [0, 0], 'loggedDates: 0 dakika sayılmaz');
  eq(await run(p, `var t0=Date.parse('2026-10-01T10:00:00Z');S.attempts=[0,3,20].map(function(m){return {date:T(0),ts:new Date(t0+m*6e4).toISOString(),xp:1}});return liveMinutes()[T(0)]`),
    6, 'liveMinutes: aralığı ≤8 dk olanlar eklenir (1 + 1+3 + 1 = 6)');
  eq(await run(p, `S.progress=[{id:T(0),g_runs:1},{id:T(1),g_runs:2},{id:T(2),g_runs:1}];return gmStreak()`), 3, 'gmStreak: oyun serisi 3 gün');
  eq(await run(p, `S.progress=[{id:T(1),g_runs:2},{id:T(2),g_runs:1}];return gmStreak()`), 2, 'gmStreak: bugün oynanmadıysa dünden sayar');
  eq(await run(p, `S.progress=[{id:T(0),g_runs:1},{id:T(2),g_runs:1}];return gmStreak()`), 1, 'gmStreak: boşluk keser');

  // ---- masa (destek hattı) seviyesi ve serisi ----
  eq(await run(p, `S.treplies=[1,2,3].map(function(i){return {id:'r'+i,level:1,hints:i===3?2:0,score:90,date:T(0),ts:'2026-10-0'+i}});var d=deskState();return [d.level,d.good,d.need,d.n,d.streak]`),
    [1, 2, 3, 3, 1], 'deskState: 2 ipucu sınırı aşan cevap "iyi" sayılmaz → seviye 1, good 2');
  eq(await run(p, `S.treplies=[1,2,3].map(function(i){return {id:'r'+i,level:1,hints:1,score:80,date:T(i-1),ts:'2026-10-0'+i}});var d=deskState();return [d.level,d.good,d.csat,d.streak]`),
    [2, 0, 80, 3], 'deskState: 3 iyi cevap (puan ≥80, ipucu ≤1) seviye 2 açar; csat ortalama; seri 3');
  eq(await run(p, `S.treplies=[{id:'a',level:1,hints:0,date:T(0),ts:'2026-10-01'}];S.treviews=[{id:'a',score:79}];var d=deskState();return [d.good,tScore('a')]`),
    [0, 79], 'deskState: değerlendirme puanı cevap puanını ezer; 79 < 80 iyi sayılmaz');

  // ---- ders tamamlama ----
  eq(await run(p, `localStorage.ya_lc=JSON.stringify({'s-ccna-1':{w:1,r:1,q:1,p:1,d:T(0)},'s-ccna-2':{w:1,r:1,q:1},_cut:{ccna:{d:T(0)}}});
      return [lcDone('s-ccna-1'),lcDone('s-ccna-2'),lcDone('yok'),lessonsDone()]`),
    [true, false, false, 1], 'lcDone: w,r,q,p dördü gerekir; "_" anahtarları sayılmaz; lessonsDone = 1');
  eq(await run(p, `localStorage.ya_lc=JSON.stringify({'s-ccna-1':{w:1,r:1,q:1,p:1}});S.topics=[1,2,3].map(function(i){return {id:'t'+i,status:'built'}}).concat([{id:'t4',status:'building'}]);return lessonsDone()`),
    3, 'lessonsDone: max(tamamlanan ders, "built" konu) = max(1, 3)');
  eq(await run(p, `localStorage.ya_lc=JSON.stringify({'s-ccna-1':{w:1,r:1,q:1,p:1,d:T(0)},'s-ccna-2':{w:1,r:1,q:1,p:1,d:T(2)}});S.topics=[{id:'t',status:'built'}];return lessonsDone()`),
    2, 'lessonsDone: tamamlanan ders sayısı built konudan büyükse o');
  eq(await run(p, `var a=lcSet('k1','w'),b=lcSet('k1','w'),c=lcSet('','w');var o=lcLoad();var u=lcHas('k1','w');lcUnset('k1','w');return [a,b,c,o.k1.w,o.k1.d===today(),u,lcHas('k1','w')]`),
    [true, false, false, 1, true, true, false], 'lcSet: ilk yazım true, tekrar false, boş anahtar false, tarih damgası; lcUnset siler');
  eq(await run(p, `var l={id:'L1',track:'ccna',topicId:'s-ccna-9',quiz:[{},{},{}]};S.les.mark={};lcSync(l);var a=lcHas('s-ccna-9','q');
      S.les.mark={'L1:0':'no','L1:1':'ok'};lcSync(l);var b=lcHas('s-ccna-9','q');
      S.les.mark={'L1:0':'no','L1:1':'no','L1:2':'no'};lcSync(l);var c=lcHas('s-ccna-9','q');return [a,b,c]`),
    [false, false, true], 'lcSync: mini sınav kapısı = tüm soruların İŞARETLENMESİ; doğruluk oranına bakmaz (üç yanlış da "q" açar)');
  eq(await run(p, `var l={id:'L2',track:'ccna',topicId:'s-ccna-8',quiz:[]};S.les.mark={};lcSync(l);var a=lcHas('s-ccna-8','q');
      S.progress=[{id:T(0),prac_n:5}];lcSync(l);return [a,lcHas('s-ccna-8','p')]`),
    [true, true], 'lcSync: sorusuz ders "q" açar; bugünkü 5 alıştırma "p" açar');
  eq(await run(p, `var l={id:'L3',track:'ccna',topicId:'s-ccna-7',quiz:[]};S.progress=[{id:T(0),prac_n:4}];lcSync(l);return lcHas('s-ccna-7','p')`),
    false, 'lcSync: 4 alıştırma yetmez');
  eq(await run(p, `var l={topicId:'s-ccna-1',id:'x'};var m={};
      ['w','r','q','p'].forEach(function(f){m[f]=0});
      var o1=lrDone(l,'isinma'),o2=lrDone(l,'sinav');lcSet('s-ccna-1','w');lcSet('s-ccna-1','q');return [o1,o2,lrDone(l,'isinma'),lrDone(l,'sinav'),lrDone(l,'anlat'),lrDone(l,'notlar')]`),
    [false, false, true, true, false, false], 'lrDone: adım = ilgili lc bayrağı; "notlar" = dördü tamam');
  eq(await run(p, `var q={options:['Switch','Router','Yazıcı'],answer:'Router'};var r=[qzCorrect(q),qzCorrect({options:['Switch','Router'],answer:'B) Router'}),qzCorrect({options:['a1','b2'],answer:'zzz'})];return r`),
    [1, 1, -1], 'qzCorrect: birebir metin, "B)" önekli, eşleşmeyen = -1');

  // ---- konu aşaması, aralıklı hatırlama ----
  eq(await run(p, `return [stageOf({status:'built'}),stageOf({status:'building',mastery:40}),stageOf({status:'building',mastery:39}),stageOf({status:'next'}),stageOf({status:'locked'})]`),
    [4, 3, 2, 1, 0], 'stageOf: built 4; building ≥40 → 3, altı 2; next 1; kilitli 0');
  yakin(await run(p, `return recallOf({status:'built',mastery:4,lastReview:T(2)})`), Math.exp(-2 / (3 + 4 * 0.25)), 'recallOf: exp(-gün/(3+mastery*0.25))');
  eq(await run(p, `return [recallOf({status:'locked',mastery:4,lastReview:T(2)}),recallOf({status:'built',mastery:0,lastReview:T(2)}),recallOf({status:'built',mastery:4,lastReview:null})]`),
    [null, null, null], 'recallOf: kilitli/ustalık 0/tarihsiz → null');
  eq(await run(p, `S.topics=[{id:'a',status:'built',mastery:4,lastReview:T(10)},{id:'b',status:'built',mastery:4,lastReview:T(0)},{id:'c',status:'built',mastery:4,lastReview:T(3)}];return riskTopics().map(function(x){return x.t.id})`),
    ['a', 'c'], 'riskTopics: hatırlama <0.85 olanlar, en düşük önce (a: 10 gün, c: 3 gün)');

  // ---- soru bankası ustalığı (GS) ----
  const qb = await p.evaluate(() => { const o = {}; QB.forEach((q, i) => { (o[q.t] = o[q.t] || []).push([i, q.d]); }); const tr = Object.keys(o).find(t => o[t].length >= 4); return { tr, ix: o[tr].slice(0, 4) }; });
  const [i0, d0] = qb.ix[0];
  {
    let th = 1.5; th += d0 >= th ? 0.09 : 0.04; th = Math.max(1, Math.min(3, th));
    const r = await run(p, `gsAnswer('qb${i0}',true);return [GS.sk['${qb.tr}'],GS.bx[${i0}],GS.st[${i0}]]`);
    yakin(r[0], th, 'gsAnswer: doğru → beceri tahmini +0.09 (soru ≥ tahmin) ya da +0.04');
    eq([r[1], r[2]], [1, [1, 1]], 'gsAnswer: kutu 1, istatistik [doğru, toplam] = [1,1]');
    let th2 = th; th2 -= d0 <= th2 ? 0.14 : 0.07; th2 = Math.max(1, Math.min(3, th2));
    const r2 = await run(p, `gsAnswer('qb${i0}',true);var s1=GS.sk['${qb.tr}'];gsAnswer('qb${i0}',false);return [s1,GS.sk['${qb.tr}'],GS.bx[${i0}],GS.st[${i0}]]`);
    yakin(r2[0], th, 'gsAnswer: (sıfırlanmış durumdan) doğru → ilk adım aynı artış');
    const a = th;
    let c = a; c -= d0 <= c ? 0.14 : 0.07; yakin(r2[1], Math.max(1, Math.min(3, c)), 'gsAnswer: yanlış → beceri tahmini düşer (soru ≤ tahmin ise -0.14, değilse -0.07)');
    eq([r2[2], r2[3]], [0, [1, 2]], 'gsAnswer: yanlış kutuyu sıfırlar; istatistik [doğru 1, toplam 2]');
  }
  eq(await run(p, `GS.sk['${qb.tr}']=2.95;for(var i=0;i<5;i++)gsAnswer('qb${i0}',true);var hi=GS.sk['${qb.tr}'],bx=GS.bx[${i0}];GS.sk['${qb.tr}']=1.05;for(var j=0;j<10;j++)gsAnswer('qb${i0}',false);return [hi,bx,GS.sk['${qb.tr}']]`),
    [3, 4, 1], 'gsAnswer: beceri tahmini [1,3] ile sınırlı; kutu en çok 4');
  eq(await run(p, `gsAnswer('abc',true);gsAnswer('qb999999',true);return [Object.keys(GS.st).length,Object.keys(GS.bx).length]`), [0, 0], 'gsAnswer: geçersiz/yok soru anahtarı yok sayılır');
  {
    const [a, b2, c, d] = qb.ix.map(x => x[0]);
    eq(await run(p, `GS.st[${a}]=[3,3];GS.bx[${a}]=3;GS.st[${b2}]=[2,2];GS.st[${c}]=[3,4];GS.st[${d}]=[1,4];var m=mastLevels()['${qb.tr}'];return m`),
      [1, 1, 1, 1, 4], 'mastLevels: Usta (≥3 kutu, ≥%85, ≥3 deneme), Yeterli (%100, ≥2), Aşina (≥%70), Denendi; toplam');
    eq(await run(p, `GS.st[${a}]=[3,3];GS.bx[${a}]=2;var m=mastLevels()['${qb.tr}'];return m`), [0, 0, 1, 0, 1], 'mastLevels: kutu 2 ise %100 doğruluk ve 3 deneme "Yeterli"');
    eq(await run(p, `GS.st[${a}]=[7,10];return mastLevels()['${qb.tr}']`), [0, 1, 0, 0, 1], 'mastLevels: %70 sınırı "Aşina"');
    eq(await run(p, `GS.st[${a}]=[69,100];return mastLevels()['${qb.tr}']`), [1, 0, 0, 0, 1], 'mastLevels: %69 "Denendi"');
    eq(await run(p, `GS.st[${a}]=[3,3];GS.st[${b2}]=[1,2];return gsTotals()`), { n: 5, ok: 4, acc: 0.8 }, 'gsTotals: toplam soru, doğru, oran');
  }

  // ---- seviye testleri ----
  eq(await run(p, `return [[1,2,3].map(function(d){return d}),plLevel({qs:[{d:1},{d:2},{d:3}],ok:[1,0,1]}),plLevel({qs:[{d:1},{d:2},{d:3}],ok:[0,0,0]}),plLevel({qs:[{d:1},{d:2},{d:3}],ok:[1,1,1]}),plLevel({qs:[],ok:[]})].slice(1)`),
    [2.3, 1, 3, 1], 'plLevel: 1 + 2*kazanılan/maks, 0.1 hassasiyet; boş = 1');
  eq(await run(p, `return [plBand(1.4)[0],plBand(1.5)[0],plBand(2.2)[0],plBand(2.3)[0]]`),
    ['Sıfırdan başla', 'Temel var, boşlukları kapat', 'Temel var, boşlukları kapat', 'İleri başlangıç'], 'plBand: sınırlar 1.5 ve 2.3');
  for (const [sc, beklenen, sk] of [[62, 3, 2.5], [61, 2, 1.8], [32, 2, 1.8], [31, 1, 1.0], [0, 1, 1.0], [100, 3, 2.5]]) {
    const r = await run(p, `S.pe={tr:'ccna',qs:[{},{}],i:1,pk:0,sc:${sc},mx:100,ok:0,done:false};peNext();return [S.pe.l,lvOf('ccna').l,lvOf('ccna').s,lvOf('ccna').m,GS.sk.ccna]`);
    eq(r, [beklenen, beklenen, sc, 100, sk], `seviye sınavı: ${sc}/100 → düzey ${beklenen} (${['', 'Çırak', 'Kalfa', 'Usta'][beklenen]}), beceri tahmini ${sk}`);
  }
  eq(await run(p, `lvSave({});var a=lvOf('ccna');lvSave({ccna:{l:2,s:5,m:10,d:'x'}});return [a,lvOf('ccna').l,lvOf('net')]`), [null, 2, null], 'lvOf: kayıt yoksa null');

  // ---- mülakat provası ve rütbe kapıları ----
  eq(await run(p, `S.mock=[{avg:5},{avg:7},{avg:8},{avg:9}];var m=mockInfo();return [m.n,m.avg]`), [4, 8], 'mockInfo: son 3 provanın ortalaması (7,8,9 → 8), toplam sayı 4');
  eq(await run(p, `S.mock=[];var m=mockInfo();return [m.n,m.avg]`), [0, 0], 'mockInfo: boş');
  eq(await run(p, `GS.st={'1':[34,40]};S.topics=[1,2,3].map(function(i){return {id:'t'+i,status:'built'}});return gateList('g1').map(function(x){return x.ok})`),
    [true, true], 'gateList g1: 40 soruda %80 ve 3 ders');
  eq(await run(p, `GS.st={'1':[31,40]};S.topics=[1,2,3].map(function(i){return {id:'t'+i,status:'built'}});return [gateList('g1').map(function(x){return x.ok}),gateAuto('g1')]`),
    [[false, true], false], 'gateList g1: %77.5 doğruluk kapıyı açmaz');
  eq(await run(p, `GS.st={'1':[40,40]};S.topics=[1,2].map(function(i){return {id:'t'+i,status:'built'}});return gateAuto('g1')`), false, 'gateAuto g1: 2 ders yetmez');
  eq(await run(p, `return [gateAuto('yok'),gateOk('yok'),gateList('g2').length,gateList('g3').length,gateList('g4').length]`), [false, false, 4, 4, 4], 'gateList: g2 (soru, ders, proje, seviye testi), g3/g4 (soru, ders, proje, mülakat provası) = 4 koşul');
  eq(await run(p, `S.profile.gates={g1:true};return [gateOk('g1'),gateAuto('g1')]`), [true, false], 'gateOk: elle açılan kapı (kurucu sınavı) otomatik şartlardan bağımsız');

  // ---- rütbe ----
  const RUTBE = (xpPerDay, gunSayisi, kosul) => `
    S.days=[];for(var i=0;i<${gunSayisi};i++)S.days.push({date:T(i),minutes:10,xp:${xpPerDay}});
    ${kosul || ''}
    var r=rankInfo();return [r.idx,r.cur.n,r.ad,r.xp,r.demoted,r.warn]`;
  const G1 = `GS.st={'1':[34,40]};S.topics=[1,2,3].map(function(i){return {id:'t'+i,status:'built'}});`;
  eq(await run(p, RUTBE(65, 14, G1)), [1, 'Uzman Yardımcısı', 14, 910, false, false], 'rankInfo: 910 XP, 14 gün, g1 otomatik → Uzman Yardımcısı');
  eq(await run(p, RUTBE(64, 14, G1)), [0, 'Stajyer', 14, 896, false, false], 'rankInfo: 896 XP (<900) → Stajyer');
  eq(await run(p, RUTBE(70, 13, G1)), [0, 'Stajyer', 13, 910, false, false], 'rankInfo: 13 aktif gün (<14) → Stajyer');
  eq(await run(p, RUTBE(65, 14, '')), [0, 'Stajyer', 14, 910, false, false], 'rankInfo: kapı g1 sağlanmazsa XP ve gün yetmez');
  eq(await run(p, RUTBE(65, 14, `S.profile.gates={g1:true};`)), [1, 'Uzman Yardımcısı', 14, 910, false, false], 'rankInfo: elle açılmış kapı yeter');
  eq(await run(p, `S.days=[];for(var i=40;i<54;i++)S.days.push({date:T(i),minutes:10,xp:65});${G1}S._ld={progress:1,attempts:1};S.ready2=true;var r=rankInfo();return [r.idx,r.demoted,r.warn,r.gap]`),
    [0, true, false, 40], 'rankInfo: 30+ gün boşlukta bir rütbe düşer (demoted)');
  eq(await run(p, `S.days=[];for(var i=20;i<34;i++)S.days.push({date:T(i),minutes:10,xp:65});${G1}S._ld={progress:1,attempts:1};S.ready2=true;var r=rankInfo();return [r.idx,r.demoted,r.warn,r.gap]`),
    [1, false, true, 20], 'rankInfo: 14-29 gün boşlukta uyarı, düşüş yok');
  eq(await run(p, `S.days=[];for(var i=40;i<54;i++)S.days.push({date:T(i),minutes:10,xp:65});${G1}var r=rankInfo();return [r.idx,r.demoted]`),
    [1, false], 'rankInfo: veri yüklenmeden (S._ld yok) düşürme yapılmaz');
  eq(await run(p, `S.days=[{date:T(0),minutes:5,xp:0}];S.attempts=[{date:T(1)}];S.progress=[{id:T(2),mini5:1},{id:T(3),g_runs:0}];S.reports=[{date:T(4)}];return Object.keys(activeDaySet()).length`),
    4, 'activeDaySet: gün kaydı, deneme, ilerleme alanları ve rapor günleri; boş ilerleme sayılmaz');

  // ---- hafta özeti ----
  eq(await run(p, `S.days=[{date:T(0),minutes:20},{date:T(0),minutes:10}];var w=weekInfo();return [w.days,w.min]`), [1, 30], 'weekInfo: aynı gün dakikaları toplanır, gün 1');

  ok(errs.length === 0, 'sayfa hatası yok' + (errs.length ? ': ' + errs[0] : ''));
  await b.close();
  console.log(`\n${n} kontrol, ${fails} hata`);
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });

// AI'sız akış: sample YOK iken ders (sabit içerik), ders içinde arama, anlatım karşılaştırma, ticket ön kontrolü.
const path=require('path');const {INIT,chromium}=require('./stub.js');
const URL='file://'+path.resolve(__dirname,'../index.html');
(async()=>{
  const b=await chromium.launch();const errs=[];let fail=0;const ok=(c,m)=>{console.log((c?'OK  ':'FAIL ')+m);if(!c)fail++};
  const ctx=await b.newContext({viewport:{width:420,height:900}});const p=await ctx.newPage();
  p.on('pageerror',e=>errs.push(e.message));
  await p.addInitScript('window.__guest=true');await p.addInitScript(INIT);
  await p.addInitScript(()=>{const u=window.claude.use;window.claude.use=async n=>n==='sample'?null:u(n)});
  await p.goto(URL+'#ders');await p.waitForTimeout(2000);
  await p.click('button:text-is("Sıfırdan başlıyorum")').catch(()=>{});await p.waitForTimeout(500);
  for(let i=0;i<8;i++){const bt=await p.$('button:text-is("Tamam, anladım")');if(!bt)break;await bt.click();await p.waitForTimeout(120)}
  await p.click('button:has-text("Isınmayı bitirdim")').catch(()=>{});await p.waitForTimeout(600);
  await p.click('button:has-text("Derslere dön")').catch(()=>{});await p.waitForTimeout(600);
  const txt=async()=>await p.evaluate(()=>document.body.innerText);
  let t=await txt();
  ok(await p.evaluate(()=>/Ders içinde ara/.test(document.body.textContent)),'ders içinde ara paneli var');
  ok(!/Koça sor/.test(t),'"Koça sor" kalmadı');
  const jsClick=txt=>p.evaluate(t=>{const b=[...document.querySelectorAll('button')].find(x=>x.textContent.trim()===t);b&&b.click();return !!b},txt);
  const ask=await p.$('#l-ask');ok(!!ask,'#l-ask var');
  if(ask){await p.evaluate(()=>{document.querySelector('#l-ask').value='switch ile router farkı'});await jsClick('Ara');await p.waitForTimeout(300);
    const r=await p.evaluate(()=>document.querySelector('#l-ask').closest('.panel').textContent);ok(/•/.test(r),'arama sonuç getirdi: '+r.slice(0,140).replace(/\n/g,' | '))}
  const tb=await p.$('#l-tb');
  if(tb){await p.evaluate(()=>{document.querySelector('#l-tb').value='Switch aynı ağdaki cihazları MAC adresine göre bağlar, router ise farklı ağları IP adresine göre birbirine ve internete bağlar.'});
    await p.evaluate(()=>{document.querySelector('#l-tb').dispatchEvent(new Event('input'))});await jsClick('Anlatımımı karşılaştır');await p.waitForTimeout(300);
    const r=await p.evaluate(()=>document.querySelector('#l-tb').closest('.panel').textContent);ok(/Anahtar kavram kıyası/.test(r),'anlatım kıyası: '+r.slice(0,200).replace(/\n/g,' | '))}
  // ticket masası
  const p2=await (await b.newContext({viewport:{width:420,height:900}})).newPage();p2.on('pageerror',e=>errs.push(e.message));
  await p2.addInitScript('window.__guest=true');await p2.addInitScript(INIT);
  await p2.addInitScript(()=>{const u=window.claude.use;window.claude.use=async n=>n==='sample'?null:u(n)});
  await p2.goto(URL+'#masa');await p2.waitForTimeout(1800);
  await p2.click('button:text-is("İngilizce talepler")').catch(()=>{});await p2.waitForTimeout(500);
  const rows=await p2.$$('.trow');ok(rows.length>=10,'hazır ticket satırı: '+rows.length);
  if(rows.length){await p2.evaluate(()=>document.querySelector('.trow').click());await p2.waitForTimeout(300);
    await p2.fill('#tk-ans','Hello, sorry about the problem. Please restart the printer and I will check it today. Thanks.');
    await p2.click('button:text-is("3 · Ön kontrol")');await p2.waitForTimeout(300);
    const fb=await p2.evaluate(()=>[...document.querySelectorAll('.fb')].map(x=>x.innerText).join(' || '));ok(/Ön kontrol: \d+\/100/.test(fb),'ön kontrol: '+fb.slice(0,160).replace(/\n/g,' '));
    await p2.click('button:text-is("Gönder")');await p2.waitForTimeout(500);
    const t2=await p2.evaluate(()=>document.body.innerText);ok(/Puanın: \d+\/100/.test(t2),'gönderince puan görünür');ok(/Örnek iyi cevap/.test(t2),'örnek cevap görünür')}
  console.log('sayfa hataları',errs);await b.close();process.exit(fail||errs.length?1:0);
})();

// Kullanım: npm i playwright && node tests/smoke.js
// Sahte (stub) veritabanıyla her sekmeyi açar; sayfa hatası ve yatay taşma arar.
const path=require('path');
const {INIT,chromium}=require('./stub.js');
(async()=>{
  const b=await chromium.launch();
  const tabs=['bugun','ders','sinif','sehir','ofis','oku','masa','lig','mul','proje','sozluk','rehber','ayar','sayilar','oduller'];
  let bad=0;
  for(const [w,scheme] of [[400,'dark'],[1100,'light']]){
    for(const t of tabs){
      const ctx=await b.newContext({viewport:{width:w,height:900},colorScheme:scheme});
      const p=await ctx.newPage();const errs=[];
      p.on('pageerror',e=>errs.push(e.message));
      await p.addInitScript('window.__guest=false');await p.addInitScript(INIT);
      await p.goto('file://'+path.resolve(__dirname,'../index.html')+'?t='+Math.random()+'#'+t);
      await p.waitForTimeout(2200);
      const ovf=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
      if(errs.length||ovf){bad++;console.log('SORUN',w,scheme,t,errs,ovf?'yatay taşma':'')}
      await ctx.close();
    }
  }
  await b.close();
  console.log(bad?bad+' sorun var':'Tüm sekmeler temiz');
  process.exit(bad?1:0);
})();

const {INIT,chromium}=require(process.cwd()+'/repo/tests/stub.js');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const [w,m] of [[320,true],[390,true],[1100,false]]){
const ctx=await b.newContext({viewport:{width:w,height:844},isMobile:m,hasTouch:m,colorScheme:'dark'});const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript(INIT);await p.addInitScript("localStorage.ya_gm_seen='1'");
await p.goto('file://'+process.cwd()+'/page_dbg.html#oyun');await p.waitForTimeout(900);
await p.evaluate(()=>{__S.gtab='fetih';__X.draw()});await p.waitForTimeout(300);
console.log(w,'daily card',await p.$$eval('.fk-daily',a=>a.length),await p.$eval('.fk-daily h3',e=>e.textContent),'ovf',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
if(w===390)await p.screenshot({path:'s59g-daily.png',fullPage:true});
// play daily and win
await p.evaluate(()=>{[...document.querySelectorAll('.fk-daily .btn')][0].click()});await p.waitForTimeout(800);
console.log(' started daily',await p.evaluate(()=>!!__S.fk&&__S.fk.daily&&!!__S.fk.opt.kd));
await p.evaluate(()=>{const G=__S.fk;G.t=100;let c=0;for(let i=0;i<G.own.length;i++)if(G.own[i]>=0){G.own[i]=1;c++}G.N.forEach((x,k)=>{x.cells=k?0:c})});await p.waitForTimeout(1200);
console.log(' over',await p.evaluate(()=>__S.fk.over),'ya_fkd',await p.evaluate(()=>localStorage.ya_fkd));
await p.evaluate(()=>{__S.fk=null;__X.draw()});await p.waitForTimeout(300);
console.log(' board rows',await p.$$eval('.fk-board li',a=>a.map(x=>x.textContent)));
// assist: lose twice
await p.evaluate(()=>{const o=JSON.parse(localStorage.ya_fk||'{}');const id=__X.FK_SC[0].id;o['lose'+id]=2;delete o['star'+id];Object.keys(o).forEach(k=>{if(k.indexOf(id)===0&&/Kolay|Normal|Zor/.test(k))delete o[k]});localStorage.ya_fk=JSON.stringify(o)});
await p.evaluate(()=>{__X.draw()});await p.waitForTimeout(300);
await p.evaluate(()=>{[...document.querySelectorAll('.fk-card .btn')][0].click()});await p.waitForTimeout(400);
console.log(' assist card',await p.$$eval('.fk-pc',a=>a.filter(x=>/Yardım modu/.test(x.textContent)).length));
if(w===390)await p.screenshot({path:'s59g-assist.png',fullPage:true});
await p.evaluate(()=>{[...document.querySelectorAll('.fk-pc')].find(x=>/Yardım modu/.test(x.textContent)).click()});await p.waitForTimeout(200);
await p.evaluate(()=>{[...document.querySelectorAll('button')].find(b=>/Seferi başlat/.test(b.textContent)).click()});await p.waitForTimeout(600);
console.log(' assisted',await p.evaluate(()=>!!__S.fk.opt.as),'gro mod',await p.evaluate(()=>__X.fkMod?__X.fkMod(__S.fk,'gro').toFixed(2):'n/a'));
console.log(er);await ctx.close()}
await b.close()})();

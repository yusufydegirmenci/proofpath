const {INIT,chromium}=require(process.cwd()+'/repo/tests/stub.js');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const [w,m] of [[320,true],[390,true],[1100,false]]){
const ctx=await b.newContext({viewport:{width:w,height:844},isMobile:m,hasTouch:m,colorScheme:'dark'});const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript(INIT);await p.addInitScript("localStorage.ya_gm_seen='1'");
await p.goto('file://'+process.cwd()+'/page_dbg.html#oyun');await p.waitForTimeout(900);
await p.evaluate(()=>{[...document.querySelectorAll('button')].find(x=>/Fetih/.test(x.textContent)&&x.getAttribute('aria-pressed')!==null||/^Fetih/.test(x.textContent.trim())).click()}).catch(()=>{});
await p.waitForTimeout(300);
console.log(w,'cards',await p.$$eval('.fk-card',a=>a.length),'locked',await p.$$eval('.fk-card.lock',a=>a.length),'bd',await p.$$eval('.fk-bd',a=>a.length),'ovf',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
if(w===390)await p.screenshot({path:'s58-fkhub.png',fullPage:true});
await p.evaluate(()=>{[...document.querySelectorAll('.fk-card .btn')][0].click()});await p.waitForTimeout(1200);
console.log(' game: cv',await p.$$eval('.fk-cv',a=>a.length),'chips',await p.$$eval('.fk-chip',a=>a.length),'ovf',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
// attack via chip
await p.evaluate(()=>{document.querySelector('.fk-chip').click()});await p.waitForTimeout(300);
console.log(' attacks',await p.evaluate(()=>__S.fk.at.length),'hint',await p.$eval('.fk-hint',e=>e.textContent));
// panel tabs
await p.evaluate(()=>{[...document.querySelectorAll('.fk-ctl .seg button')].find(b=>b.textContent==='Külliye').click()});await p.waitForTimeout(300);
console.log(' kul rows',await p.$$eval('.fk-pan .fk-row',a=>a.length));
await p.evaluate(()=>{__S.fk.gold=500});await p.waitForTimeout(500);
await p.evaluate(()=>{document.querySelector('.fk-pan .fk-row .btn').click()});await p.waitForTimeout(300);
console.log(' bought', await p.evaluate(()=>JSON.stringify(__S.fk.bl)),'gold',await p.evaluate(()=>Math.round(__S.fk.gold)));
await p.evaluate(()=>{[...document.querySelectorAll('.fk-ctl .seg button')].find(b=>b.textContent==='Diplomasi').click()});await p.waitForTimeout(300);
console.log(' dip rows',await p.$$eval('.fk-pan .fk-row',a=>a.length));
await p.evaluate(()=>{document.querySelector('.fk-pan .fk-row .btn').click()});await p.waitForTimeout(300);
console.log(' rel',await p.evaluate(()=>JSON.stringify(__S.fk.dp)),'msg',await p.evaluate(()=>__S.fk.msg[0].t));
if(w===390)await p.screenshot({path:'s58-fkgame.png',fullPage:true});
// event
await p.evaluate(()=>{__S.fk.ecd=0});await p.waitForTimeout(600);
console.log(' event shown',await p.evaluate(()=>!document.querySelector('.fk-ask:not([hidden])')?false:true),await p.evaluate(()=>!!__S.fk.ev));
if(w===390)await p.screenshot({path:'s58-fkevent.png',fullPage:true});
await p.evaluate(()=>{document.querySelector('.fk-ask:not([hidden]) .gm-ab:last-child').click()});await p.waitForTimeout(300);
console.log(' ev cleared',await p.evaluate(()=>!__S.fk.ev));
// divan
await p.evaluate(()=>{__S.fk.qcd=0});await p.waitForTimeout(400);
await p.evaluate(()=>{[...document.querySelectorAll('.fk-ctl .btn')].find(b=>/Divan/.test(b.textContent)).click()});await p.waitForTimeout(300);
console.log(' divan shown',await p.$$eval('.fk-ask:not([hidden]) .gm-ab',a=>a.length));
await p.evaluate(()=>{document.querySelector('.fk-ask:not([hidden]) .gm-ab').click()});await p.waitForTimeout(200);
console.log(' dv',await p.evaluate(()=>JSON.stringify({ok:__S.fk.dv.ok,no:__S.fk.dv.no})));
// force win
await p.evaluate(()=>{const G=__S.fk;G.dv.ok=3;G.t=100;const n=G.own.length;let c=0;for(let i=0;i<n&&c<G.land;i++){if(G.own[i]>=0){G.own[i]=1;c++}}G.N.forEach((x,k)=>{x.cells=k?0:c});G.N[0].cells=c;});await p.waitForTimeout(1200);
console.log(' dbg',await p.evaluate(()=>{const G=__S.fk;return JSON.stringify({st:G.state,loop:G.loop,pa:G.paused,pq:!!G.pq,ev:!!G.ev,c:G.N[0].cells,land:G.land,goal:G.goal,conn:G.cv.isConnected,t:G.t})}));
console.log(' over',await p.evaluate(()=>__S.fk.over),'banner',await p.$$eval('.fk-ban',a=>a.map(x=>x.textContent)),'stars',await p.$$eval('.fk-stars i.on',a=>a.length),'next btn',await p.$$eval('.fk-res .btn.big',a=>a.map(x=>x.textContent)),'ovf',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
if(w===390)await p.screenshot({path:'s58-fkres.png',fullPage:true});
console.log(' ya_fk',await p.evaluate(()=>localStorage.ya_fk));
console.log(er);await ctx.close()}
await b.close()})();

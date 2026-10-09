const {INIT,chromium}=require(process.cwd()+'/repo/tests/stub.js');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const [w,m] of [[320,true],[390,true],[1100,false]]){
const ctx=await b.newContext({viewport:{width:w,height:844},isMobile:m,hasTouch:m,colorScheme:'dark'});const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript(INIT);await p.addInitScript("localStorage.ya_gm_seen='1'");
await p.goto('file://'+process.cwd()+'/page_dbg.html#oyun');await p.waitForTimeout(900);
await p.evaluate(()=>{__S.gtab='arcade';__X.draw()});await p.waitForTimeout(200);
console.log(w,'modes',await p.$$eval('.gt',a=>a.length));
await p.evaluate(()=>{[...document.querySelectorAll('.gt')].find(b=>/Sonsuz/.test(b.textContent)).click()});await p.waitForTimeout(500);
await p.evaluate(()=>{[...document.querySelectorAll('.gm-card .btn.big')].find(b=>/Başla/.test(b.textContent)).click()});
// auto-play: answer correctly, steer irrelevant
let maxQ=0;
for(let i=0;i<150;i++){await p.waitForTimeout(120);
 const st=await p.evaluate(()=>{const R=__S.gm.run;if(!R)return null;if(R.ask&&!R.ask.jq&&R.ask.gi!=null){const q=R.qs[R.ask.gi];const bt=document.querySelectorAll('.gm-ask .gm-ab');bt.forEach(x=>{});[...bt].find(x=>x.classList.contains('c'+q.a))?.click()}
  else if(R.ask&&R.ask.jq){document.querySelector('.gm-ask .gm-ab')?.click()}
  R.lives=3; return {n:R.qs.length,c:R.correct,s:R.state,gi:R.gi,over:R.over}});
 if(!st)break;maxQ=Math.max(maxQ,st.n);if(st.c>=17)break}
const fin=await p.evaluate(()=>{const R=__S.gm.run;return R?{n:R.qs.length,c:R.correct,tier:R.correct/8|0,ds:R.qs.map(q=>q.d).join('')}:null});
console.log(' endless',JSON.stringify(fin),'maxQ',maxQ);
await p.evaluate(()=>{const R=__S.gm.run;if(R){R.lives=0;R.end=.1}});await p.waitForTimeout(900);
console.log(' result xp cell',await p.$$eval('.gm-res .kcell b',a=>a.map(x=>x.textContent).join('|')).catch(()=>null),'note',await p.$$eval('.gm-res .lbox p',a=>a.map(x=>x.textContent).filter(t=>/Sonsuz/.test(t))));
// dino
await p.evaluate(()=>{__S.gm.run=null;__S.gtab='dino';__X.draw()});await p.waitForTimeout(300);
console.log(' dino cv',await p.$$eval('.dn-cv',a=>a.length),'ovf',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
await p.evaluate(()=>{document.querySelector('.dn-j').click()});await p.waitForTimeout(2500);
await p.evaluate(()=>{document.querySelector('.dn-j').click()});await p.waitForTimeout(300);
console.log(' dino state',await p.evaluate(()=>__S.dn.state+' sc '+Math.floor(__S.dn.sc)+' lives '+__S.dn.lives));
if(w===390)await p.screenshot({path:'s59-dino.png',fullPage:true});
await p.evaluate(()=>{__S.dn.sc=__S.dn.gate});await p.waitForTimeout(400);
console.log(' ask',await p.evaluate(()=>__S.dn.state),await p.$$eval('.dn-ask .gm-ab',a=>a.length));
await p.evaluate(()=>{const D=__S.dn;document.querySelector('.dn-ask .gm-ab.c'+D.ask.a).click()});await p.waitForTimeout(300);
console.log(' after ok',await p.evaluate(()=>{const D=__S.dn;return D.state+' ok '+D.ok+' shield '+D.shield}));
await p.evaluate(()=>{__S.dn.lives=1;__S.dn.sc=__S.dn.gate});await p.waitForTimeout(300);
await p.evaluate(()=>{const D=__S.dn;const q=D.ask;[...document.querySelectorAll('.dn-ask .gm-ab')].find(x=>!x.classList.contains('c'+q.a)).click()});await p.waitForTimeout(500);
console.log(' over',await p.evaluate(()=>__S.dn.state),'res',await p.$eval('.dn-res h2',e=>e.textContent).catch(()=>null),'best',await p.evaluate(()=>localStorage.ya_dino),'ovf',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
console.log(er);await ctx.close()}
await b.close()})();

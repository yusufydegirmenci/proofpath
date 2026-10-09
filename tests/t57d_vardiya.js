const {INIT,chromium}=require(process.cwd()+'/repo/tests/stub.js');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const [w,m] of [[320,true],[390,true],[1100,false]]){
const ctx=await b.newContext({viewport:{width:w,height:844},isMobile:m,hasTouch:m,colorScheme:w===1100?'light':'dark'});const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript(INIT);await p.addInitScript("localStorage.ya_gm_seen='1'");
await p.goto('file://'+process.cwd()+'/page_dbg.html#masa');await p.waitForTimeout(1000);
console.log(w,'list',await p.$$eval('.vd-c',a=>a.length),'ovf',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
if(w===390)await p.screenshot({path:'s57-vd-list.png',fullPage:true});
for(const ix of [0,2,4]){
 await p.evaluate(i=>{window.__ix=i},ix);
 for(const pol of ['best','worst']){
  await p.evaluate(()=>document.querySelector('.vd-c').click());await p.waitForTimeout(250);
  for(let k=0;k<6;k++){
   if(await p.$('.vd-res'))break;
   const texts=await p.$$eval('.vd-o',a=>a.map(x=>x.innerText));
   const idx=await p.evaluate(pol=>{const V=__S.vd,sc=V.sc,tp=__X.VD_CU[sc.c].tp;const ops=V.i>=sc.st.length?__X.vdCloseOpts(sc,V.i,V.ix):__X.vdOpts(sc,V.i,V.ix);const sc2=ops.map(o=>__X.vdScore(o.tags,tp,V.ix,false).d);const t=pol==='best'?Math.max(...sc2):Math.min(...sc2);return sc2.indexOf(t)},pol);
   await p.evaluate(i=>document.querySelectorAll('.vd-o')[i].click(),idx);await p.waitForTimeout(250)}
  const r=(await p.innerText('.vd-res')).replace(/\n/g,' | ').slice(0,140);
  console.log(w,'ix',ix,pol,r);
  if(w===390&&ix===4&&pol==='best')await p.screenshot({path:'s57-vd-res.png',fullPage:true});
  if(w===390&&ix===0&&pol==='worst')await p.screenshot({path:'s57-vd-bad.png',fullPage:true});
  console.log(' ovf',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
  await p.evaluate(()=>[...document.querySelectorAll('.btn.ghost')].find(b=>b.textContent==='Yeni müşteri').click());await p.waitForTimeout(250);
 }}
console.log(w,er);await ctx.close()}
await b.close()})();

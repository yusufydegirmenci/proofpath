const {INIT,chromium}=require(process.cwd()+'/repo/tests/stub.js');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});let fail=0;
for(const [w,m] of [[320,true],[390,true],[1100,false]]){
const ctx=await b.newContext({viewport:{width:w,height:844},isMobile:m,hasTouch:m,colorScheme:m?'dark':'light'});const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript(INIT);await p.addInitScript("localStorage.ya_gm_seen='1'");
await p.goto('file://'+process.cwd()+'/page_dbg.html#ders');await p.waitForTimeout(900);
await p.evaluate(()=>{__S.les.view='nw';__X.draw()});await p.waitForTimeout(250);
const hub=await p.evaluate(()=>({tiles:document.querySelectorAll('.nw-tile').length,chips:[...document.querySelectorAll('.nw-chip2')].map(x=>x.textContent.trim()),ovf:document.documentElement.scrollWidth>innerWidth}));
console.log(w,'hub',JSON.stringify(hub));if(hub.ovf)fail++;
await p.click('.nw-chip2:has-text("DevOps")');await p.waitForTimeout(150);
console.log(' dev tiles',await p.$$eval('.nw-tile',a=>a.length));
if(w===390)await p.screenshot({path:'s60-nwhub.png'});
for(const id of ['defgw','sc-tls','dv-ci','qa-bva','en-standup','bk-queue','ipclass','congestion']){
 await p.evaluate((id)=>{__S.nw.f='all';__S.nw.open=id;__X.draw()},id);await p.waitForTimeout(200);
 await p.evaluate(()=>{[...document.querySelectorAll('.nw .btn')].find(b=>/Oynat/.test(b.textContent)).click()});await p.waitForTimeout(1200);
 const n=await p.$$eval('.nw-dots button',a=>a.length);
 for(let i=0;i<n;i++){await p.evaluate((i)=>document.querySelectorAll('.nw-dots button')[i].click(),i);await p.waitForTimeout(40)}
 const info=await p.evaluate(()=>({cap:document.querySelector('.nw-cap').textContent.slice(0,30),res:!!document.querySelector('.nw-res'),ovf:document.documentElement.scrollWidth>innerWidth,q:document.querySelectorAll('.qz').length}));
 console.log(' ',id,'steps',n,JSON.stringify(info));if(info.ovf)fail++;
}
await p.evaluate(()=>{__S.nw.open='defgw';__X.draw()});await p.waitForTimeout(150);
await p.evaluate(()=>{document.querySelectorAll('.qz')[0].querySelectorAll('.qz-o')[0].click()});await p.waitForTimeout(80);
await p.evaluate(()=>{document.querySelectorAll('.qz')[1].querySelectorAll('.qz-o')[0].click()});await p.waitForTimeout(80);
console.log(' ls',await p.evaluate(()=>localStorage.ya_nw));
if(w===390)await p.screenshot({path:'s60-nwscene.png',fullPage:true});
console.log(' errors',er);if(er.length)fail++;await ctx.close()}
console.log('FAIL',fail);await b.close()})();

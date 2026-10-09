const {INIT,chromium}=require(process.cwd()+'/repo/tests/stub.js');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const [w,m] of [[320,true],[390,true],[1100,false]]){
const ctx=await b.newContext({viewport:{width:w,height:844},isMobile:m,hasTouch:m,colorScheme:'dark'});const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript(INIT);await p.addInitScript("localStorage.ya_gm_seen='1'");
await p.goto('file://'+process.cwd()+'/page_dbg.html#ders');await p.waitForTimeout(900);
await p.evaluate(()=>{__S.les.view='nw';__X.draw()});await p.waitForTimeout(300);
console.log(w,'tiles',await p.$$eval('.nw-tile',a=>a.length),'ovf',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
if(w===390)await p.screenshot({path:'s59-nwhub.png'});
for(const id of ['hash','ipclass','tcp']){
 await p.evaluate((id)=>{__S.nw.open=id;__X.draw()},id);await p.waitForTimeout(200);
 await p.evaluate(()=>{[...document.querySelectorAll('.nw .btn')].find(b=>/Oynat/.test(b.textContent)).click()});await p.waitForTimeout(1500);
 if(w===390&&id!=='tcp')await p.locator('.nw').screenshot({path:'s59-nw-'+id+'.png'});
 const n=await p.$$eval('.nw-dots button',a=>a.length);
 for(let i=0;i<n;i++){await p.evaluate((i)=>document.querySelectorAll('.nw-dots button')[i].click(),i)}
 console.log(' ',id,'steps',n,'cap',(await p.$eval('.nw-cap',e=>e.textContent)).slice(0,40),'chips',await p.$$eval('.nw-chip',a=>a.length));
}
await p.evaluate(()=>{__S.nw.open='dns';__X.draw()});await p.waitForTimeout(150);
await p.evaluate(()=>{document.querySelectorAll('.qz')[0].querySelectorAll('.qz-o')[0].click()});await p.waitForTimeout(100);
await p.evaluate(()=>{document.querySelectorAll('.qz')[1].querySelectorAll('.qz-o')[1].click()});await p.waitForTimeout(100);
console.log(' marks',await p.$$eval('.qz.ok',a=>a.length),await p.$$eval('.qz.no',a=>a.length),'ls',await p.evaluate(()=>localStorage.ya_nw),'ovf',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
console.log(er);await ctx.close()}
await b.close()})();

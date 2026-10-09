const {INIT,chromium}=require(process.cwd()+'/repo/tests/stub.js');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const ctx=await b.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript(INIT);await p.addInitScript("localStorage.ya_gm_seen='1'");
await p.goto('file://'+process.cwd()+'/page_dbg.html#oyun');await p.waitForTimeout(900);
for(const t of ['arena','arcade','dino','fetih']){await p.evaluate(t=>{__S.gtab=t;__X.draw()},t);await p.waitForTimeout(250);
 const n=await p.$$eval('.fb',a=>a.length);
 await p.evaluate(()=>{const d=document.querySelector('.fb');d.open=true;[...d.querySelectorAll('button')][0].click();d.querySelector('textarea').value='Daha hızlı olsun';[...d.querySelectorAll('button')].find(b=>/Notu/.test(b.textContent)).click()});
 console.log(t,'fb',n,await p.$eval('.fb .small.mute',e=>e.textContent),'ovf',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth))}
await p.evaluate(()=>{__S.gtab='gorev';__X.draw()});await p.waitForTimeout(250);
console.log('summary',await p.$$eval('.panel li',a=>a.map(x=>x.textContent).filter(x=>/Eğlenceli/.test(x))));
await p.screenshot({path:'fb.png',fullPage:true});console.log(er);await b.close()})();

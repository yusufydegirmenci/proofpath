const {INIT,chromium}=require(process.cwd()+'/repo/tests/stub.js');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const ctx=await b.newContext({viewport:{width:360,height:640},isMobile:true,hasTouch:true,deviceScaleFactor:3});
const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));const cdp=await ctx.newCDPSession(p);
await p.addInitScript(INIT);await p.addInitScript("localStorage.ya_gm_seen='1'");
await p.goto('file://'+process.cwd()+'/page_dbg.html#oyun');await p.waitForTimeout(900);
// small buttons on each game tab
for(const t of ['arena','arcade','dino','fetih','gorev','kart']){await p.evaluate(t=>{__S.gtab=t;__X.draw()},t);await p.waitForTimeout(250);
 const s=await p.$$eval('button',a=>a.filter(b=>{const r=b.getBoundingClientRect();return r.width>0&&r.height>0&&r.height<40}).map(b=>b.textContent.trim().slice(0,18)+':'+Math.round(b.getBoundingClientRect().height)));console.log(t,'small',JSON.stringify(s))}
// Dino touch
await p.evaluate(()=>{__S.gtab='dino';__X.draw()});await p.waitForTimeout(300);
await p.evaluate(()=>document.querySelector('.dn-cv,canvas').scrollIntoView({block:'center'}));await p.waitForTimeout(200);const cv=await p.$eval('.dn-cv,canvas',e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height}});console.log('dino cv',JSON.stringify(cv));
async function tap(x,y){await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]})}
await tap(cv.x+cv.w/2,cv.y+cv.h/2);await p.waitForTimeout(400);
for(let i=0;i<8;i++){await tap(cv.x+cv.w/2,cv.y+cv.h/2);await p.waitForTimeout(700)}
console.log('dino after taps',await p.evaluate(()=>{const t=document.querySelector('.dn-hud,.dn-top');return t?t.textContent.slice(0,60):'no hud'}));
await p.screenshot({path:'touch-dino.png'});console.log(er);await b.close()})();

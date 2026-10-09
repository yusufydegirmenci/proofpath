const {INIT,chromium}=require(process.cwd()+'/repo/tests/stub.js');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const ctx=await b.newContext({viewport:{width:360,height:640},isMobile:true,hasTouch:true,deviceScaleFactor:3,userAgent:'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 Chrome/120 Mobile Safari/537.36'});
const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));const cdp=await ctx.newCDPSession(p);
await p.addInitScript(INIT);await p.addInitScript("localStorage.ya_gm_seen='1'");
await p.goto('file://'+process.cwd()+'/page_dbg.html#oyun');await p.waitForTimeout(900);
async function swipe(x0,y0,x1,y1){await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:x0,y:y0}]});for(let i=1;i<=6;i++)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x0+(x1-x0)*i/6,y:y0+(y1-y0)*i/6}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await p.waitForTimeout(120)}
// Arcade
await p.evaluate(()=>{__S.gtab='arcade';__X.draw()});await p.waitForTimeout(300);
await p.evaluate(()=>{document.querySelector('.gt:not([disabled])').click()});await p.waitForTimeout(600);
await p.evaluate(()=>{const b=[...document.querySelectorAll('button')].find(x=>/^Başla|Yola çık|Başlat/.test(x.textContent.trim()));b&&b.click()});await p.waitForTimeout(800);
const box=await p.$eval('.gm-panel canvas',e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height}});console.log('cv',JSON.stringify(box));
const cx=box.x+box.w/2,cy=box.y+box.h/2;
const lane=()=>p.evaluate(()=>{function f(o,d){if(!o||d>3)return null;for(const k in o){try{if(k==='lane'&&typeof o[k]==='number')return o[k];const v=f(o[k],d+1);if(v!==null)return v}catch(e){}}return null}return f(__S,0)});
console.log('lane0',await lane());
await swipe(cx,cy,cx+90,cy);console.log('after swipe right',await lane());
await swipe(cx,cy,cx-90,cy);await swipe(cx,cy,cx-90,cy);console.log('after 2 swipes left',await lane());
await swipe(cx,cy,cx,cy-90);console.log('jump swipe ok');
// tap left half
await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:box.x+20,y:cy}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await p.waitForTimeout(100);console.log('after left tap',await lane());
console.log('ovf',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),'btn sizes <44:',await p.$$eval('button',a=>a.filter(b=>{const r=b.getBoundingClientRect();return r.width>0&&(r.height<36)}).length));
await p.screenshot({path:'touch-arcade.png'});
console.log(er);await b.close()})();

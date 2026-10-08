const {INIT,chromium}=require('/tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/repo/tests/stub.js');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const [w,m] of [[390,true],[1100,false]]){
const ctx=await b.newContext({viewport:{width:w,height:844},isMobile:m,hasTouch:m});const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript('window.__guest=true');await p.addInitScript(INIT);
const U='file:///tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/page.html';
await p.goto(U+'?a='+w+'#atolye');await p.waitForTimeout(1500);
const nav=await p.locator('nav button, .tabs button, #tabs button').allInnerTexts();console.log(w,'nav',nav.join('|').slice(0,120));
console.log(w,'atolye visible',(await p.locator('.lscroll button:text-is("CV")').count())>0);
await p.locator('.lscroll button:text-is("CV")').click();await p.waitForTimeout(300);
await p.locator('input[type=text] >> nth=0').fill('Arkadaş Kişi');await p.locator('input[type=text] >> nth=0').blur();await p.waitForTimeout(400);
const keys=await p.evaluate(()=>Object.keys(window.__store).filter(k=>/^data\/users/.test(k)||k==='prefs'));console.log(w,'store keys',keys);
const cvPersonal=await p.evaluate(()=>JSON.stringify((window.__store['data/users/uGuest/pp/prefs']||{}).cv||{}).slice(0,60));console.log(w,'cv personal',cvPersonal,'shared prefs.cv leaked',await p.evaluate(()=>!!((window.__store.prefs||{}).cv)));
await p.goto(U+'?b='+w+'#ders');await p.waitForTimeout(1200);console.log(w,'ders ok',(await p.innerText('#view')).length>200);
await p.goto(U+'?c='+w+'#lig');await p.waitForTimeout(1200);console.log(w,'lig ok',(await p.innerText('#view')).length>100,'ovf',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
console.log(w,'errors',er);await ctx.close()}
await b.close()})();

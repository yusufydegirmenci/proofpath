const {INIT,chromium}=require('/tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/repo/tests/stub.js');
const U='file:///tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/page.html';
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const [w,g] of [[390,false],[1100,true]]){
const ctx=await b.newContext({viewport:{width:w,height:844},isMobile:w<500,hasTouch:w<500});const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript('window.__guest='+g);await p.addInitScript(INIT);
await p.addInitScript(`try{var st={},bx={};for(var i=0;i<400;i++){st[i]=[2,2];bx[i]=1}localStorage.ya_gs=JSON.stringify({sk:{},st:st,bx:bx});localStorage.ya_pl=JSON.stringify({sec:{lv:2.2,n:6,ok:4,d:"2026-10-08"}})}catch(e){}`);
const key=g?'data/users/uGuest/pp/prefs':'prefs';
await p.addInitScript(`(function(){var t=setInterval(function(){if(window.__store){window.__store['${key}']=Object.assign(window.__store['${key}']||{},{mock:{rows:[{d:'2026-10-07',n:5,avg:6.5}]}${g?",onb:{done:true,goal:'sec',hrs:5}":""}});clearInterval(t)}},0)})()`);
await p.goto(U+'?e'+w+'#atolye');await p.waitForTimeout(1500);
await p.locator('.lscroll button:text-is("İşe hazırlık")').click();await p.waitForTimeout(400);
let t=await p.innerText('#view');console.log(w,g,'cüzdan paneli',/Kanıtların \(\d+\)/.test(t),'satır',(t.match(/yeterli düzey[^\n]*/g)||[]).length,'seviye testi',/seviye testi: 2\.2/.test(t),'prova',/Mülakat provası: 1 tur/.test(t));
await p.locator('.lscroll button:text-is("CV")').click();await p.waitForTimeout(400);
t=await p.innerText('#view');console.log(w,'CV bölümü',/ÖĞRENME KANITLARI/i.test(t),/yeterli düzey/.test(t));
await p.click('.seg[aria-label="Kanıtlar"] button:text-is("Hayır")');await p.waitForTimeout(300);
t=await p.innerText('#view');console.log(w,'kapatınca yok',!/yeterli düzey/.test(t));
await p.click('.seg[aria-label="CV dili"] button:text-is("English")');await p.click('.seg[aria-label="Kanıtlar"] button:text-is("Evet")');await p.waitForTimeout(300);
t=await p.innerText('#view');console.log(w,'EN',/proficient level/.test(t),'ovf',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),er);
await ctx.close()}
await b.close()})();

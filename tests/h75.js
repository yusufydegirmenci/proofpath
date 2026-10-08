const {INIT,chromium}=require('/tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/repo/tests/stub.js');
const U='file:///tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/page.html';
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const td=new Date().toISOString().slice(0,10);
for(const [w,g] of [[390,true],[1100,false]]){
const ctx=await b.newContext({viewport:{width:w,height:844},isMobile:w<500,hasTouch:w<500});const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript('window.__guest='+g);await p.addInitScript(INIT);
const pk=g?'data/users/uGuest/pp/progress':'progress';
await p.addInitScript(`(function(){var t=setInterval(function(){if(window.__store){${g?"window.__store['data/users/uGuest/pp/prefs']={onb:{done:true,goal:'sec',hrs:5}};":""}window.__store['${pk}']=window.__store['${pk}']||{};window.__store['${pk}']['${td}']={read_sec:true,prac_n:5,date:'${td}'};clearInterval(t)}},0)})()`);
await p.goto(U+'?r'+w+'#bugun');await p.waitForTimeout(4200);
let t=await p.innerText('#view');
const stops=(t.match(/\d+ \/ \d+ durak/)||[''])[0];
console.log(w,g,'harita',/buradasın/i.test(t),stops,'| siber ders durağı',/Siber: dersi oku/.test(t),'| sınıf-ccna yok',!/CCNA: 5 canlı soru/.test(t),'| oyun',/Oyun: günün koşusu/.test(t),'gazete',/Gazete: 1 haber/.test(t),'proje',/Proje: 1 adım/.test(t));
const doc=await p.evaluate(([k,d])=>JSON.stringify(window.__store[k]&&window.__store[k][d]),[pk,td]);console.log(w,'progress',doc);
console.log(w,'toast',await p.locator('.rt-toast').count(),'xp özeti',(t.match(/bugün \d+ XP/)||[''])[0],'ovf',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
await p.screenshot({path:'v41-route-'+w+'.png',fullPage:false});
// tema
const th0=await p.evaluate(()=>document.documentElement.getAttribute('data-theme'));
await p.click('button.orb');await p.waitForTimeout(200);const th1=await p.evaluate(()=>document.documentElement.getAttribute('data-theme'));
await p.click('button.orb');await p.waitForTimeout(200);const th2=await p.evaluate(()=>document.documentElement.getAttribute('data-theme'));
console.log(w,'tema',th0,'->',th1,'->',th2,er);
await ctx.close()}
await b.close()})();

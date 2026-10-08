const {INIT,chromium}=require('/tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/repo/tests/stub.js');
const U='file:///tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/page.html';
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const w of [390,1100]){
const ctx=await b.newContext({viewport:{width:w,height:844},isMobile:w<500,hasTouch:w<500});const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript('window.__guest=true;window.__noOnb=true');await p.addInitScript(INIT);
await p.goto(U+'?a'+w);await p.waitForTimeout(1500);
let t=await p.innerText('#view');console.log(w,'onb göründü',t.includes('Önce hedefini seçelim'),'tabs gizli',await p.evaluate(()=>document.getElementById('tabs').hidden));
await p.screenshot({path:'v37-onb1-'+w+'.png'});
await p.click('button:has-text("Backend ve .NET")');await p.waitForTimeout(200);
console.log(w,'adım2',(await p.innerText('#view')).includes('Haftada kaç saat'));
await p.click('button:has-text("8 saat")');await p.waitForTimeout(200);
console.log(w,'adım3',(await p.innerText('#view')).includes('Seviyeni ölçelim mi'),'ovf',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
await p.screenshot({path:'v37-onb3-'+w+'.png'});
await p.click('button:has-text("Seviye testini yap")');await p.waitForTimeout(500);
t=await p.innerText('#view');console.log(w,'test başladı',/Soru 1|1 \/ 6|Seviye testi/i.test(t),'tabs görünür',!(await p.evaluate(()=>document.getElementById('tabs').hidden)));
const onb=await p.evaluate(()=>JSON.stringify(((window.__store['data/users/uGuest/pp/prefs']||{}).onb)||null));console.log(w,'kayıt',onb);


// aynı store yeni sayfada yok; kalıcılık için store taşı
await ctx.close();
// ikinci cihaz: kayıtla aç
const c2=await b.newContext({viewport:{width:w,height:844}});const q=await c2.newPage();
await q.addInitScript('window.__guest=true;window.__noOnb=true');await q.addInitScript(INIT);
await q.addInitScript(`(function(){var t=setInterval(function(){if(window.__store){window.__store['data/users/uGuest/pp/prefs']={onb:${onb}};clearInterval(t)}},0)})()`);
await q.goto(U+'?c'+w+'#ders');await q.waitForTimeout(1400);
console.log(w,'2. cihaz onb yok',!(await q.innerText('#view')).includes('Önce hedefini'),'Ders seg Backend seçili',await q.evaluate(()=>[...document.querySelectorAll('.seg button')].filter(x=>x.getAttribute('aria-pressed')==='true').map(x=>x.textContent).join(',')),er);
// sahip: onboarding yok
const c3=await b.newContext({viewport:{width:w,height:844}});const o=await c3.newPage();await o.addInitScript('window.__guest=false');await o.addInitScript(INIT);await o.goto(U+'?d'+w);await o.waitForTimeout(1200);
console.log(w,'sahip onb yok',!(await o.innerText('#view')).includes('Önce hedefini'));
await b.contexts().length;await c2.close();await c3.close()}
await b.close()})();

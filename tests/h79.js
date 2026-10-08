const {INIT,chromium}=require('/tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/repo/tests/stub.js');
const U='file:///tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/page.html';
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript('window.__guest=true');await p.addInitScript(INIT);
await p.addInitScript(`try{var q=['ccna','eng','sec','bk'],o={};q.forEach(function(t){o[t]={lv:1,n:0,ok:0,d:'2026-10-08',skip:true}});localStorage.ya_pl=JSON.stringify(o)}catch(e){}`);
const today=new Date().toISOString().slice(0,10);
await p.addInitScript(`(function(){var t=setInterval(function(){if(window.__store){clearInterval(t);var a={};for(var i=0;i<5;i++)a['a'+i]={date:'${today}',track:'ccna',q:'x'+i,ok:true,topicId:'s-ccna-1',ts:'${today}T10:0'+i+':00Z'};window.__store['data/users/uGuest/pp/attempts']=a}},5)})()`);
await p.goto(U+'#ders');await p.waitForTimeout(1500);
for(const n=await p.locator('button:text-is("Tamam, anladım")').count();;){break}
const n=await p.locator('button:text-is("Tamam, anladım")').count();for(let i=0;i<n;i++){await p.locator('button:text-is("Tamam, anladım")').first().click();await p.waitForTimeout(100)}
await p.locator('button:has-text("Isınmayı bitirdim")').click();await p.waitForTimeout(400);
// quiz: reveal & mark all
let k=await p.locator('button:text-is("Cevabı göster")').count();console.log('quiz q',k);
for(let i=0;i<k;i++){await p.locator('button:text-is("Cevabı göster")').first().click();await p.waitForTimeout(80);await p.locator('button:text-is("Bildim")').last().click();await p.waitForTimeout(80)}
await p.locator('button:text-is("Dersi okudum")').click();await p.waitForTimeout(600);
await p.goto(U+'?z#ders');await p.waitForTimeout(1500);
const t=await p.textContent('#view');
console.log('lc',await p.evaluate(()=>localStorage.ya_lc));
console.log('now topic2 gate',t.includes('Kilitli: önce'),'t2',t.includes('IP adresi'),'er',er);
await b.close()})();

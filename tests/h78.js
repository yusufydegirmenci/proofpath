const {INIT,chromium}=require('/tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/repo/tests/stub.js');
const U='file:///tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/page.html';
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const w of [390,1100]){
const ctx=await b.newContext({viewport:{width:w,height:844},isMobile:w<500,hasTouch:w<500});const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript('window.__guest=true');await p.addInitScript(INIT);
await p.addInitScript(`try{var q=['ccna','eng','sec','bk'],o={};q.forEach(function(t){o[t]={lv:1,n:0,ok:0,d:'2026-10-08',skip:true}});localStorage.ya_pl=JSON.stringify(o)}catch(e){}`);
await p.goto(U+'?a'+w+'#ders');await p.waitForTimeout(1500);
let t=await p.textContent('#view');
console.log(w,'locked gate',t.includes('Kilitli: önce ısınma'),'yol',t.includes('Ders yolu'),'no body',(await p.locator('#ls-ders').count())===0,'title',t.includes('Ağ nedir'));
// warm-up cards
const n=await p.locator('button:text-is("Tamam, anladım")').count();console.log(w,'cards',n);
console.log(w,'btn disabled before',await p.locator('button:has-text("Isınmayı bitirdim")').isDisabled());
for(let i=0;i<n;i++){await p.locator('button:text-is("Tamam, anladım")').first().click();await p.waitForTimeout(150)}
// hazırım remains; ensure enabled
console.log(w,'btn disabled after',await p.locator('button:has-text("Isınmayı bitirdim")').isDisabled());
await p.locator('button:has-text("Isınmayı bitirdim")').click();await p.waitForTimeout(400);
t=await p.textContent('#view');console.log(w,'opened',(await p.locator('#ls-ders').count())===1,t.includes('Anlatım'),'gate gone',!t.includes('Kilitli: önce'));
// reload: warm-up remembered
await p.goto(U+'?b'+w+'#ders');await p.waitForTimeout(1200);t=await p.textContent('#view');console.log(w,'remembered',(await p.locator('#ls-ders').count())===1);
// complete topic 1 via seeded flags -> topic 2 locked again
await p.evaluate(()=>{localStorage.ya_lc=JSON.stringify({'s-ccna-1':{w:1,r:1,q:1,p:1,d:'2026-10-08'}})});
await p.goto(U+'?c'+w+'#ders');await p.waitForTimeout(1200);t=await p.textContent('#view');
console.log(w,'topic2 gated',t.includes('Kilitli: önce'),'title2',t.includes('IP adresi'),'path ✓',/✓/.test(t));
// eng: no concept items
await p.locator('.seg button:text-is("İngilizce")').first().click();await p.waitForTimeout(400);t=await p.textContent('#view');
console.log(w,'eng gate',t.includes('Kilitli: önce'),'btn enabled',!(await p.locator('button:has-text("Isınmayı bitirdim")').isDisabled()));
// generate button available for friend when no real lesson
console.log(w,'gen btn',await p.locator('button:text-is("Şimdi ders üret")').count());
console.log(w,'ovf',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),er);
await ctx.close()}
await b.close()})();

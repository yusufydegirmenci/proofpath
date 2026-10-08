const {INIT,chromium}=require('/tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/repo/tests/stub.js');
const U='file:///tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/page.html';
const td=new Date().toISOString().slice(0,10);
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const w of [390,1100]){
const ctx=await b.newContext({viewport:{width:w,height:844},isMobile:w<500,hasTouch:w<500});const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript('window.__guest=true');await p.addInitScript(INIT);
await p.addInitScript(`try{var q=['ccna','eng','sec','bk'],o={};q.forEach(function(t){o[t]={lv:1,n:0,ok:0,d:'${td}',skip:true}});localStorage.ya_pl=JSON.stringify(o);localStorage.ya_rt=JSON.stringify(['sec','bk','eng'])}catch(e){}`);
// A: route has Siber + Backend blocks
await p.goto(U+'?a'+w+'#bugun');await p.waitForTimeout(1800);
let t=await p.textContent('#view');
console.log(w,'siber',t.includes('Siber: ısınma'),'backend',t.includes('Backend: ısınma'),'ccna yok',!t.includes('CCNA: ısınma'),'x',await p.locator('.tn.tre').count());
await p.locator('button:has-text("Bütün haritayı göster")').click();await p.waitForTimeout(300);t=await p.textContent('#view');
console.log(w,'all: okuma',t.includes('Okuma: bir hikâye'),'mülakat',t.includes('Mülakat: 1 soru'),'atölye(prac yok çünkü alis)',!t.includes('Atölye: karışık 5 soru'),'alis',t.includes('Siber: 5 karışık'));
// B: start Siber lesson (warm-up done) -> other tracks locked
await p.evaluate((d)=>{localStorage.ya_lc=JSON.stringify({'s-sec-1':{w:1,d:d}})},td);
await p.goto(U+'?b'+w+'#ders');await p.waitForTimeout(1500);
await p.locator('.seg button:text-is("Backend")').first().click();await p.waitForTimeout(400);t=await p.textContent('#view');
console.log(w,'backend locked',t.includes('Önce bunu bitir'),'dönüş btn',await p.locator('button:text-is("Derse dön")').count());
await p.locator('button:text-is("Derse dön")').click();await p.waitForTimeout(400);t=await p.textContent('#view');
console.log(w,'back to siber',await p.locator('.seg button[aria-pressed="true"]').first().textContent(),'dersi açık',await p.locator('#ls-ders').count());
await p.goto(U+'?c'+w+'#bugun');await p.waitForTimeout(1500);
console.log(w,'route: kilitli durak',await p.locator('.tl.lock').count(),'şu an notu',(await p.textContent('#view')).includes('adımları bitmeden başka derse geçilmez'));
// C: finish siber lesson -> unlock
await p.evaluate((d)=>{localStorage.ya_lc=JSON.stringify({'s-sec-1':{w:1,r:1,q:1,p:1,d:d}})},td);
await p.goto(U+'?d'+w+'#ders');await p.waitForTimeout(1500);
await p.locator('.seg button:text-is("Backend")').first().click();await p.waitForTimeout(400);t=await p.textContent('#view');
console.log(w,'backend açık',!t.includes('Önce bunu bitir'),'kapı ısınma',t.includes('Kilitli: önce ısınma'));
// D: Daha sheet
await p.goto(U+'?e'+w+'#bugun');await p.waitForTimeout(1200);
await p.locator('button:has-text("Daha")').last().click();await p.waitForTimeout(400);
console.log(w,'daha tiles',await p.locator('.mt2').count(),'ovf',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),er);
await ctx.close()}
await b.close()})();

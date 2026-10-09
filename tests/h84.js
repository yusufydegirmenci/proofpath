const {INIT,chromium}=require('/tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/repo/tests/stub.js');
const U='file:///tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/page.html';
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const w of [390,1100]){
 const ctx=await b.newContext({viewport:{width:w,height:844},isMobile:w<500,hasTouch:w<500});const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
 await p.addInitScript(INIT);await p.addInitScript("localStorage.ya_gm_seen='1';localStorage.ya_gq=JSON.stringify({qb3:{s:0,due:'2026-10-01',t:1},qb8:{s:1,due:'2026-10-02',t:1}})");
 await p.goto(U+'?e'+w+'#bugun');await p.waitForTimeout(1500);
 let t=await p.innerText('#view');console.log(w,'bugün tekrar paneli',t.includes('Oyundan tekrar'),'2 soru',t.includes('2 soru seni bekliyor'));
 await p.locator('.gqp .gqo button >> nth=0').click();await p.waitForTimeout(300);
 const gq=await p.evaluate(()=>JSON.parse(localStorage.ya_gq));console.log(w,'kuyruk',JSON.stringify(gq));
 await p.goto(U+'?f'+w+'#oyun');await p.waitForTimeout(1200);
 await p.click('.gh-nav button:text-is("Görevler")');await p.waitForTimeout(300);t=await p.innerText('#view');console.log(w,'sezon',t.includes('Haftalık sezon yolu'),t.includes('Çaylak Kurye'));
 await p.click('.gh-nav button:text-is("Arcade")');await p.click('.gt >> nth=3');await p.waitForTimeout(400);
 t=await p.innerText('.gm-card');console.log(w,'en kart',t.includes('İŞ İNGİLİZCESİ'),t.includes('Ofiste bir gün'));
 await p.click('.gm-card button:text-is("Başla")');
 for(let i=0;i<120;i++){await p.waitForTimeout(250);if(await p.locator('.gm-ask.on').count())break}
 console.log(w,'ilk soru',(await p.innerText('.gm-aq')).slice(0,110),'| nokta',(await p.innerText('.gm-trl')).replace(/\n/g,' '));
 console.log(w,'hata',er);await ctx.close()}
await b.close()})();

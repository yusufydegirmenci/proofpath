const {INIT,chromium}=require('/tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/repo/tests/stub.js');
const U='file:///tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/page.html';
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const w of [390,1100]){
const ctx=await b.newContext({viewport:{width:w,height:844},isMobile:w<500,hasTouch:w<500});const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript('window.__guest=false');await p.addInitScript(INIT);
await p.goto(U+'?a'+w+'#atolye');await p.waitForTimeout(1300);
await p.locator('.lscroll button:text-is("Alıştırma")').click();await p.waitForTimeout(300);
await p.locator('.seg button:text-is("Karışık")').click();await p.locator('button:text-is("Turu başlat")').click();await p.waitForTimeout(300);
const tracks=[];let wrongSeen=false,whyOk=false,laterOk=false;
for(let i=0;i<5;i++){
 const lab=await p.locator('.panel .label:has-text("Soru")').first().innerText();tracks.push(lab.split('·')[1]?.trim());
 // her zaman 2. şıkkı seç (çoğu yanlış olur)
 await p.locator('.lsn .opt >> nth='+(i%3)).click();await p.waitForTimeout(200);
 if(await p.locator('button:text-is("Seçtiğim şık neden yanlış?")').count()){wrongSeen=true;
   if(!whyOk){await p.click('button:text-is("Seçtiğim şık neden yanlış?")');await p.waitForTimeout(600);whyOk=/Yapay zekâ açıklaması/.test(await p.innerText('#view'))}}
 if(!laterOk&&await p.locator('button:text-is("Bunu tekrar sor")').count()){await p.click('button:text-is("Bunu tekrar sor")');await p.waitForTimeout(150);laterOk=await p.locator('button:text-is("Tekrar listesinde")').count()>0}
 await p.locator('button:text-is("Sonraki"), button:text-is("Bitir")').first().click();await p.waitForTimeout(150);
}
console.log(w,'alanlar',tracks.join(','),'| farklı alan',new Set(tracks).size,'| yanlış görüldü',wrongSeen,'| neden',whyOk,'| tekrar',laterOk);
const gs=await p.evaluate(()=>JSON.parse(localStorage.ya_gs));console.log(w,'bx sıfırlanan',Object.values(gs.bx).filter(v=>v===0).length,'ovf',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),er);
await ctx.close()}
await b.close()})();

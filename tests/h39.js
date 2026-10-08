const {INIT,chromium}=require('/tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/repo/tests/stub.js');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const [w,m] of [[390,true],[1100,false]]){
const ctx=await b.newContext({viewport:{width:w,height:844},isMobile:m,hasTouch:m,colorScheme:'dark'});const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript('window.__guest=false');await p.addInitScript(INIT);
await p.goto('file:///tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/page.html#oyun');await p.waitForTimeout(1300);
await p.screenshot({path:'v27-oyun-lobi-'+w+'.png',fullPage:true});
for(const skin of ['Koşucu','Sürücü']){
 await p.click('.gh-nav button:text-is("Arcade")');await p.click('.seg button:text-is("'+skin+'")');await p.click('.gh-nav button:text-is("Arcade")');await p.click('.gt >> nth=0');await p.waitForTimeout(400);
 await p.click('.gm-card button:text-is("Başla")');await p.waitForTimeout(3500);
 await p.screenshot({path:'v27-oyun-'+skin+'-'+w+'.png'});
 // steer around: random lane moves for 40s max
 let t0=Date.now();
 while(Date.now()-t0<60000){ if(await p.$('.gm-res'))break; await p.keyboard.press(Math.random()<.5?'ArrowLeft':'ArrowRight'); if(Math.random()<.3)await p.keyboard.press('ArrowUp'); await p.waitForTimeout(500)}
 const res=await p.$('.gm-res');console.log(w,skin,'ended',!!res, res?(await res.innerText()).replace(/\n+/g,' | ').slice(0,160):'');
 await p.screenshot({path:'v27-oyun-son-'+skin+'-'+w+'.png',fullPage:true});
 await p.click('.gm-res button:text-is("Oyun alanına dön")');await p.waitForTimeout(300);
}
console.log(w,'errors',er,'ovf',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
await ctx.close()}
await b.close()})();

const {INIT,chromium}=require('/tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/repo/tests/stub.js');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const ctx=await b.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const p=await ctx.newPage();p.on('pageerror',e=>console.log('ERR',e.message));
await p.addInitScript('window.__guest=false');await p.addInitScript(INIT);
await p.goto('file:///tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/page.html#oyun');await p.waitForTimeout(1200);
await p.click('.gh-nav button:text-is("Arcade")');await p.click('.gt >> nth=0');await p.click('.gm-card button:text-is("Başla")');await p.waitForTimeout(800);
await p.evaluate(()=>{window.__cv=document.querySelector('.gm-cv')});
for(let i=0;i<5;i++){await p.evaluate(()=>{window.__notify&&window.__notify('progress');window.__notify&&window.__notify('league')});await p.waitForTimeout(300)}
console.log('same canvas',await p.evaluate(()=>window.__cv===document.querySelector('.gm-cv')&&window.__cv.isConnected),'overlay on',await p.evaluate(()=>document.querySelector('.gm-ov').classList.contains('on')));
// switch tab away and back
await p.click('.tab[data-t="ders"]');await p.waitForTimeout(500);await p.click('.tab[data-t="oyun"]');await p.waitForTimeout(500);
console.log('paused overlay',await p.evaluate(()=>document.querySelector('.gm-ov').innerText.slice(0,40)));
await p.click('.gm-card button:text-is("Devam et")');await p.waitForTimeout(600);
console.log('resumed',await p.evaluate(()=>!document.querySelector('.gm-ov').classList.contains('on')));
await b.close()})();

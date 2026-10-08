const {INIT,chromium}=require('/tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/repo/tests/stub.js');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const ctx=await b.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const p=await ctx.newPage();p.on('pageerror',e=>console.log('ERR',e.message));
await p.addInitScript('window.__guest=false');await p.addInitScript(INIT);
await p.goto('file:///tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/page.html#oyun');await p.waitForTimeout(1200);
await p.screenshot({path:'v28-gm-home.png',fullPage:true});
for(const t of ['Siber','Backend','CCNA','İngilizce','Karışık']){
 await p.click('.gh-nav button:text-is("Arcade")');await p.click('.seg button:text-is("'+t+'")');await p.waitForTimeout(150);
 console.log(t,'btn disabled',await p.evaluate(()=>document.querySelector('.gt').disabled))}
await p.click('.gh-nav button:text-is("Arcade")');await p.click('.seg button:text-is("Siber")');await p.click('.gh-nav button:text-is("Arcade")');await p.click('.seg button:text-is("Hızlı")');
await p.click('.gh-nav button:text-is("Arcade")');await p.click('.gt >> nth=0');await p.click('.gm-card button:text-is("Başla")');
let shot=false;
for(let i=0;i<260;i++){
 if(i%3==0)await p.keyboard.press(['ArrowLeft','ArrowRight','ArrowRight','ArrowLeft'][Math.floor(Math.random()*4)]);
 await p.waitForTimeout(250);
 if(!shot&&i>=14){await p.screenshot({path:'v28-gm-play.png'});shot=true;console.log('q',await p.innerText('.gm-qt'),'| ex',await p.innerText('.gm-ex').catch(()=>''))}
 if(await p.$('.gm-res'))break}
console.log('res',(await p.innerText('.gm-res')).slice(0,300).replace(/\n/g,' | '));
await p.screenshot({path:'v28-gm-res.png',fullPage:true});
console.log('prog',JSON.stringify(Object.values(await p.evaluate(()=>window.__store.progress||{}))));
console.log('miss',JSON.stringify(await p.evaluate(()=>(window.__store.league||{}).uOwner)));
await b.close()})();

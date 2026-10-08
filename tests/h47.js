const {INIT,chromium}=require('/tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/repo/tests/stub.js');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const ctx=await b.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,colorScheme:'dark'});const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript('window.__guest=false');await p.addInitScript(INIT);
await p.goto('file:///tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/page.html#oyun');await p.waitForTimeout(1200);
await p.click('.gh-nav button:text-is("Arcade")');await p.click('.seg button:text-is("Hızlı")');await p.click('.gh-nav button:text-is("Arcade")');await p.click('.gt >> nth=2');await p.click('.gm-card button:text-is("Başla")');
let holds=0,shot=false,was=false;
for(let i=0;i<500;i++){
 if(i%5==0)await p.keyboard.press(['ArrowLeft','ArrowRight'][Math.floor(Math.random()*2)]);
 await p.waitForTimeout(120);
 const h=await p.evaluate(()=>document.querySelector('.gm-ex')&&document.querySelector('.gm-ex').classList.contains('hold'));
 if(h&&!was){holds++;if(!shot){await p.waitForTimeout(300);await p.screenshot({path:'v29-hold.png'});shot=true}}was=h;
 if(await p.$('.gm-res'))break}
console.log('holds',holds,'res',!!(await p.$('.gm-res')),er);await b.close()})();

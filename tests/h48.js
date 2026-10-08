const {INIT,chromium}=require('/tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/repo/tests/stub.js');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const [w,m] of [[390,true],[1100,false]]){
const ctx=await b.newContext({viewport:{width:w,height:844},isMobile:m,hasTouch:m,colorScheme:'dark'});const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript('window.__guest=false');await p.addInitScript(INIT);
await p.goto('file:///tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/page.html#oyun');await p.waitForTimeout(1200);
await p.click('.gh-nav button:text-is("Arcade")');await p.click('.seg button:text-is("Hızlı")');await p.click('.gh-nav button:text-is("Arcade")');await p.click('.gt >> nth=2');await p.click('.gm-card button:text-is("Başla")');
let asks=0,shot=false,waited=false;
for(let i=0;i<600;i++){
 await p.waitForTimeout(150);
 const on=await p.evaluate(()=>document.querySelector('.gm-ask')&&document.querySelector('.gm-ask').classList.contains('on'));
 if(on){asks++;
  if(!shot){await p.screenshot({path:'v31-ask-'+w+'.png'});shot=true;
    const t1=await p.evaluate(()=>document.querySelector('.gm-ask').innerText.slice(0,40));await p.waitForTimeout(4000);
    const still=await p.evaluate(()=>document.querySelector('.gm-ask').classList.contains('on'));console.log(w,'waits 4s still asking',still);
    const ovf=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth);console.log('ovf',ovf)}
  if(asks%2)await p.click('.gm-ab:not([disabled]) >> nth=0');else await p.keyboard.press('ArrowRight');
  await p.waitForTimeout(300)}
 if(await p.$('.gm-res'))break}
console.log(w,'asks',asks,'res',(await p.innerText('.gm-res').catch(()=>'none')).slice(0,120).replace(/\n/g,' | '),er);
await ctx.close()}
await b.close()})();

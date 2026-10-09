const {INIT,chromium}=require('/tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/repo/tests/stub.js');
const SP='/tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/';
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const [w,m] of [[390,true],[1100,false]]){
const ctx=await b.newContext({viewport:{width:w,height:844},isMobile:m,hasTouch:m,colorScheme:'dark'});const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript('window.__guest=false');await p.addInitScript(INIT);
await p.goto('file://'+SP+'page_dbg.html#oyun');await p.waitForTimeout(1200);
await p.click('.gh-nav button:text-is("Arcade")');
await p.click('.sk-w summary');await p.waitForTimeout(300);
console.log(w,'tiles',await p.$$eval('.sk-t',a=>a.length),'locked',await p.$$eval('.sk-t.lk',a=>a.length),'ovf',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
await p.locator('.sk-w').screenshot({path:SP+'s57-ward-'+w+'.png'});
await p.click('.seg button:text-is("Hızlı")');await p.click('.gh-nav button:text-is("Arcade")');
await p.click('.gt >> nth=2');await p.click('.gm-card button:text-is("Başla")');
let gem=0,asks=0,used=false,shot=false;
for(let i=0;i<900;i++){
 await p.waitForTimeout(120);
 await p.evaluate(()=>{const R=__S.gm.run;if(R&&R.lives<50)R.lives=99});
 const st=await p.evaluate(()=>{const a=document.querySelector('.gm-ask');return a&&a.classList.contains('on')?(a.querySelector('.gm-jlab')?'j':'g'):''});
 if(st==='j'){gem++;if(!shot){await p.screenshot({path:SP+'s57-gem-'+w+'.png'});shot=true}await p.click('.gm-ab >> nth=0');await p.waitForTimeout(300);
   const jb=await p.$$eval('.gm-jb:not(.z)',a=>a.length);if(jb&&!used){await p.keyboard.press('1');await p.keyboard.press('2');await p.keyboard.press('3');used=true;await p.waitForTimeout(400);await p.screenshot({path:SP+'s57-act-'+w+'.png'});console.log('active',await p.$$eval('.gm-jb.on',a=>a.length))}}
 else if(st==='g'){asks++;await p.click('.gm-ab:not([disabled]) >> nth='+(asks%3===0?1:0)).catch(()=>{});await p.waitForTimeout(300)}
 if(await p.$('.gm-res'))break}
console.log(w,'gems',gem,'asks',asks,'res',(await p.innerText('.gm-res').catch(()=>'none')).slice(0,200).replace(/\n/g,' | '),er);
console.log('ps',await p.evaluate(()=>localStorage.getItem('ya_gm')));
await ctx.close()}
await b.close()})();

const {INIT,chromium}=require('/tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/repo/tests/stub.js');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const [w,m,cs] of [[390,true,'dark'],[1100,false,'light']]){
const ctx=await b.newContext({viewport:{width:w,height:844},isMobile:m,hasTouch:m,colorScheme:cs});const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript('window.__guest=false');await p.addInitScript(INIT);
await p.goto('file:///tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/page.html#oyun');await p.waitForTimeout(1200);
await p.screenshot({path:'v29-home-'+w+'.png',fullPage:true});
console.log(w,'home ovf',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
await p.click('.gh-nav button:text-is("Arcade")');await p.click('.seg button:text-is("Backend")');await p.click('.gh-nav button:text-is("Arcade")');await p.click('.seg button:text-is("Hızlı")');
await p.click('.gh-nav button:text-is("Arcade")');await p.click('.gt >> nth=2');await p.waitForTimeout(500);
console.log(w,'preview',(await p.innerText('.gm-card')).slice(0,260).replace(/\n/g,' | '));
await p.screenshot({path:'v29-ready-'+w+'.png'});
await p.click('.gm-card button:text-is("Başla")');
let shot=false,tfSeen=false;
for(let i=0;i<300;i++){
 if(i%4==0)await p.keyboard.press(['ArrowLeft','ArrowRight'][Math.floor(Math.random()*2)]);
 await p.waitForTimeout(220);
 const q=await p.innerText('.gm-qt').catch(()=>'');if(/Doğru mu, yanlış mı/.test(q)&&!tfSeen){tfSeen=true;await p.screenshot({path:'v29-tf-'+w+'.png'});console.log(w,'TF',q.slice(0,90))}
 if(!shot&&i>20){await p.screenshot({path:'v29-play-'+w+'.png'});shot=true}
 if(await p.$('.gm-res'))break}
console.log(w,'res',(await p.innerText('.gm-res')).slice(0,380).replace(/\n/g,' | '),'ovf',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
await p.screenshot({path:'v29-res-'+w+'.png',fullPage:true});
console.log(w,'GS',await p.evaluate(()=>localStorage.getItem('ya_gs')),er);
await ctx.close()}
await b.close()})();

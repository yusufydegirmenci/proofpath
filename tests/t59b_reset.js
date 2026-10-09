const {INIT,chromium}=require(process.cwd()+'/repo/tests/stub.js');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const [w,m] of [[320,true],[390,true],[1100,false]]){
const ctx=await b.newContext({viewport:{width:w,height:844},isMobile:m,hasTouch:m,colorScheme:'dark'});const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript(INIT);await p.addInitScript("localStorage.ya_gm_seen='1';localStorage.ya_lc=JSON.stringify({'s-ccna-3':{w:1,r:1}});localStorage.ya_nw=JSON.stringify({dns:2})");
await p.goto('file://'+process.cwd()+'/page_dbg.html#ayar');await p.waitForTimeout(900);
console.log(w,'lv rows',await p.$$eval('.lv-r',a=>a.length),'ovf',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
await p.evaluate(()=>{[...document.querySelectorAll('.lv-r .btn')][0].click()});await p.waitForTimeout(300);
console.log(' exam q',await p.$$eval('.qz',a=>a.length),await p.evaluate(()=>__S.pe.qs.length));
for(let i=0;i<10;i++){await p.evaluate(()=>{const P=__S.pe;document.querySelectorAll('.qz-o')[P.qs[P.i].a].click()});await p.waitForTimeout(60);
 await p.evaluate(()=>{[...document.querySelectorAll('.btn.big')].pop().click()});await p.waitForTimeout(60)}
console.log(' result',await p.$eval('.pe-res h2',e=>e.textContent),'lv',await p.evaluate(()=>localStorage.ya_lv),'sk',await p.evaluate(()=>JSON.stringify(__S&&localStorage.ya_gs&&JSON.parse(localStorage.ya_gs).sk)));
if(w===390)await p.screenshot({path:'s59-pe.png'});
await p.goto('about:blank');await p.goto('file://'+process.cwd()+'/page_dbg.html#ayar');await p.waitForTimeout(900);
await p.evaluate(()=>{[...document.querySelectorAll('.rs-p .btn')].find(b=>/CCNA sıfırla/.test(b.textContent)).click()});await p.waitForTimeout(200);
await p.evaluate(()=>{document.querySelector('.rs-go').click()});await p.waitForTimeout(800);
console.log(' track reset lc',await p.evaluate(()=>localStorage.ya_lc),'lv',await p.evaluate(()=>localStorage.ya_lv),'rs',await p.evaluate(()=>localStorage.ya_rs));
await p.evaluate(()=>{document.querySelector('.rs-all').click()});await p.waitForTimeout(200);
if(w===390)await p.screenshot({path:'s59-rs.png',fullPage:true});
await p.evaluate(()=>{document.querySelector('.rs-go').click()});await p.waitForTimeout(1500);
console.log(' all reset keys',await p.evaluate(()=>['ya_nw','ya_gs','ya_lc','ya_fk'].map(k=>k+'='+localStorage[k]).join(' ')),'msg',await p.$eval('.rs-p .lbox p',e=>e.textContent).catch(()=>null),'progress',await p.evaluate(()=>__S.progress.length));
await p.goto('about:blank');await p.goto('file://'+process.cwd()+'/page_dbg.html#rehber');await p.waitForTimeout(700);
console.log(' guide',await p.$$eval('.gd-d',a=>a.length),'ovf',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
if(w===390)await p.screenshot({path:'s59-guide.png'});
console.log(er);await ctx.close()}
await b.close()})();

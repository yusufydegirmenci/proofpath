const {INIT,chromium}=require(process.cwd()+'/repo/tests/stub.js');
const SEC=+process.argv[2]||90;
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--enable-precise-memory-info']});
const ctx=await b.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript(INIT);await p.addInitScript("localStorage.ya_gm_seen='1'");
await p.goto('file://'+process.cwd()+'/page_dbg.html#oyun');await p.waitForTimeout(900);
await p.evaluate(()=>{__S.gtab='dino';__X.draw()});await p.waitForTimeout(300);
await p.evaluate(()=>{window.__bot=setInterval(()=>{const D=__S.dn;if(!D)return;
 if(D.state==='ready'||D.state==='over'){const bt=[...document.querySelectorAll('button')].find(x=>/Başla|Yeniden|Tekrar/.test(x.textContent));if(D.state==='over'){window.__runs=(window.__runs||0)+1}if(bt)bt.click();else D.jump&&D.jump();return}
 if(D.state==='ask'){const q=D.ask;const idx=(Math.random()<.75)?q.a:Math.floor(Math.random()*q.o.length);const bt=document.querySelector('.c'+idx);if(bt)bt.click();return}
 if(D.state==='play'){const o=D.obs.find(o=>o.x+o.w>40&&o.x<40+D.v*.32+30);if(o){if(o.k==='d'){if(o.y>=40)D.jump();else D.duckSet&&D.duckSet(true)}else D.jump()}else if(D.duckSet)D.duckSet(false)}},25)});
const t0=Date.now();let last=null;
while(Date.now()-t0<SEC*1000){await p.waitForTimeout(15000);
 last=await p.evaluate(()=>{const D=__S.dn;return {st:D.state,sc:Math.round(D.sc),tier:D.tier,lives:D.lives,ok:D.ok,no:D.no,runs:window.__runs||0,nodes:document.getElementsByTagName('*').length,heap:Math.round((performance.memory||{}).usedJSHeapSize/1e6)}});console.log(JSON.stringify(last))}
console.log('xp keys',await p.evaluate(()=>Object.keys(localStorage).filter(k=>/dino|prog|gm/.test(k)).map(k=>k+'='+String(localStorage[k]).slice(0,80))));
console.log(er);await b.close()})();

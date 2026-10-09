const {INIT,chromium}=require(process.cwd()+'/repo/tests/stub.js');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const ctx=await b.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript(INIT);await p.addInitScript("localStorage.ya_gm_seen='1'");
await p.goto('file://'+process.cwd()+'/page_dbg.html#ders');await p.waitForTimeout(900);
for(const t of ['net','dev','qa','ccna','sec']){
 await p.evaluate((t)=>{__S.les.track=t;__S.les.id=null;__S.les.view='ders';__X.draw()},t);await p.waitForTimeout(250);
 const info=await p.evaluate((t)=>({txt:document.body.innerText.length,cert:!!document.querySelector('details.panel summary'),qb:__X.QBX.filter(q=>q.t===t).length,tm:(__X.TMAP[t]||[]).length,st:__X.ST()[t].length,ovf:document.documentElement.scrollWidth>innerWidth}),t);
 console.log(t,JSON.stringify(info));
 await p.evaluate((t)=>{__S.les.view='atlas';__S.at.tr=t;__X.draw()},t);await p.waitForTimeout(200);
 console.log('  atlas cards',await p.$$eval('.at-list > *',a=>a.length));
}
await p.screenshot({path:'s60-atlas.png'});
await p.evaluate(()=>{__S.les.track='net';__S.les.view='ders';__X.draw()});await p.waitForTimeout(300);await p.screenshot({path:'s60-ders-net.png'});
console.log(er);await b.close()})();

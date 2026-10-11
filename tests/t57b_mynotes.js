const {INIT,chromium}=require('./stub.js');
// Ekran görüntüsünden önce eleman kararlı olmalı: aynı DOM düğümü 400 ms boyunca yerinde kalsın (yeniden çizim yarışı).
const kararli=(p,sel)=>p.waitForFunction(s=>{const e=document.querySelector(s);if(!e||!e.isConnected)return false;const w=window.__kr||(window.__kr={});if(w.e!==e){w.e=e;w.t=Date.now();return false}return Date.now()-w.t>=400},sel,{polling:100,timeout:5000}).catch(()=>{});
const goruntu=async(p,sel,yol)=>{for(let i=0;i<3;i++){await kararli(p,sel);try{await p.locator(sel).screenshot({path:yol});return}catch(e){if(i===2||!/not attached|detached/i.test(e.message))throw e}}};
(async()=>{const b=await chromium.launch();
for(const [w,hh,m] of [[320,700,true],[390,844,true],[1100,800,false]]){
const ctx=await b.newContext({viewport:{width:w,height:hh},isMobile:m,hasTouch:m});const p=await ctx.newPage();
const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript(INIT);await p.addInitScript("localStorage.ya_gm_seen='1';localStorage.ya_nt=JSON.stringify({'t:ccna:0':'eski düz not'})");
await p.goto(require("url").pathToFileURL(require("path").join(__dirname,"..","index.html")).href+'#ders');await p.waitForTimeout(1000);
await p.click('.seg button:text-is("Notlar")');await p.waitForTimeout(300);
console.log(w,'migrated cards',await p.$$eval('.my-c',a=>a.length));
for(const [k,txt,pen] of [['Yapışkan','Subnet maskesini tekrar et. Çok uzun bir kelime denemesi aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa','po'],['Dikkat','Trunk portta VLAN unutma!','pr'],['Soru','Router ile switch farkı neydi?','pb']]){
 await p.click('.my-kinds button:text-is("'+k+'")');await p.click('.my-pn.'+pen);await p.fill('.my-new textarea',txt);await p.click('.my-new .btn');}
console.log('cards',await p.$$eval('.my-c',a=>a.length),'ovf',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),'stored',await p.evaluate(()=>JSON.parse(localStorage.ya_nt)['t:ccna:0'].length));
await p.locator('.nt-my').scrollIntoViewIfNeeded();await goruntu(p,'.nt-my','s57-my-'+w+'.png');
await p.click('.my-act button >> nth=0');await p.fill('.my-c.ed textarea','düzenlendi');await p.click('.my-c.ed .btn:text-is("Kaydet")');
await p.click('.my-act button[aria-label="Notu sil"] >> nth=0');
console.log('after edit/del',await p.$$eval('.my-c',a=>a.length),er);
await ctx.close()}
await b.close()})();

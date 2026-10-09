const {INIT,chromium}=require(process.cwd()+'/repo/tests/stub.js');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const ctx=await b.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript(INIT);await p.addInitScript("localStorage.ya_gm_seen='1'");
await p.goto('file://'+process.cwd()+'/page_dbg.html#ayar');await p.waitForTimeout(900);
console.log('rows',await p.$$eval('.lv-r',a=>a.map(x=>x.querySelector('b').textContent)));
for(const t of ['Network','DevOps','Test Uzmanı','CCNA']){
 await p.locator('.lv-r:has(b:text-is("'+t+'")) button').click();await p.waitForTimeout(250);
 let n=0;
 for(let i=0;i<12;i++){const c=await p.locator('.qz-o:not([disabled])').count();if(!c)break;n++;await p.locator('.qz-o:not([disabled])').nth(i%c).click();await p.waitForTimeout(80);
  await p.locator('button:text-matches("Sıradaki soru|Sonucu gör")').first().click();await p.waitForTimeout(100)}
 const txt=await p.evaluate(()=>document.querySelector('#view').innerText.replace(/Dersin okunduğu[\s\S]*?Anladım/,'').slice(0,200).replace(/\n/g,' | '));
 console.log(t,'q',n,'=>',txt);
 await p.goto('file://'+process.cwd()+'/page_dbg.html?'+Math.random()+'#ayar');await p.waitForTimeout(700);
}
console.log('lv',await p.evaluate(()=>localStorage.ya_lv),er);await b.close()})();

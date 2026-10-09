const {INIT,chromium}=require(process.cwd()+'/repo/tests/stub.js');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const er=[];
for(const g of ['net','dev','qa']){
const ctx=await b.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const p=await ctx.newPage();p.on('pageerror',e=>er.push(e.message));
await p.addInitScript('window.__guest=true;window.__noOnb=true');await p.addInitScript(INIT);await p.addInitScript("localStorage.ya_gm_seen='1'");
await p.goto('file://'+process.cwd()+'/page_dbg.html');await p.waitForTimeout(1300);
const names={net:'Network',dev:'DevOps',qa:'Test Uzmanı'};
await p.click('button:has-text("'+names[g]+'")');await p.waitForTimeout(200);await p.click('button:has-text("5 saat")');await p.waitForTimeout(200);
await p.click('button:has-text("Sıfırdan başlıyorum")');await p.waitForTimeout(900);
const st=await p.evaluate(()=>({tr:__S.les.track,rt:JSON.stringify(__S.onb&&__S.onb.goal)}));
await p.evaluate(()=>{location.hash='#ders'});await p.waitForTimeout(700);
const t=await p.innerText('#view');
const seg=await p.evaluate(()=>[...document.querySelectorAll('.seg button')].filter(x=>x.getAttribute('aria-pressed')==='true').map(x=>x.textContent).join(','));
console.log(g,JSON.stringify(st),'seg',seg,'ders metni',t.length,'ovf',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
console.log('  ',t.replace(/\n+/g,' | ').slice(0,300));
await ctx.close()}
console.log(er);await b.close()})();

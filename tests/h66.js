const {INIT,chromium}=require('/tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/repo/tests/stub.js');
const U='file:///tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/page.html';
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const g of [false,true]){
// cihaz A: yerelde ilerleme var -> db'ye yazılmalı
let c1=await b.newContext({viewport:{width:390,height:844}});let a=await c1.newPage();const er=[];a.on('pageerror',e=>er.push(e.message));
await a.addInitScript('window.__guest='+g);await a.addInitScript(INIT);
await a.addInitScript(`try{localStorage.ya_gs=JSON.stringify({sk:{ccna:2.5,eng:1.5,sec:1.5,bk:1.5},st:{"1":[3,3],"2":[2,3],"5":[3,3]},bx:{"1":3,"5":2}});localStorage.ya_atlas=JSON.stringify({"k1":1,"k2":1});localStorage.ya_pl=JSON.stringify({sec:{lv:2.2,n:6,ok:3,d:"2026-10-08"}})}catch(e){}`);
await a.goto(U+'?a'+g+'#ders');await a.waitForTimeout(2500);
const key=g?'data/users/uGuest/pp/prefs':'prefs';
const sync=await a.evaluate(k=>JSON.stringify((window.__store[k]||{}).sync||null),key);
console.log('guest',g,'A pushed',sync&&sync.length>50,sync&&JSON.parse(sync).gs.st["1"].join(','),sync&&Object.keys(JSON.parse(sync).atlas).length,'errs',er);
// cihaz B: boş localStorage, db'de sync var
let c2=await b.newContext({viewport:{width:390,height:844}});let p=await c2.newPage();const er2=[];p.on('pageerror',e=>er2.push(e.message));
await p.addInitScript('window.__guest='+g);await p.addInitScript(INIT);
await p.addInitScript(`window.__seedSync=${sync};`);
await p.addInitScript(`(function(){var f=function(){if(window.__store&&window.__seedSync){window.__store['${key}']=window.__store['${key}']||{};window.__store['${key}'].sync=window.__seedSync;delete window.__seedSync}};var t=setInterval(function(){if(window.__store){f();clearInterval(t)}},1);})()`);
await p.goto(U+'?b'+g+'#atolye');await p.waitForTimeout(2500);
const ls=await p.evaluate(()=>({gs:localStorage.ya_gs,at:localStorage.ya_atlas,pl:localStorage.ya_pl}));
console.log('guest',g,'B merged st1',/"1":\[3,3\]/.test(ls.gs),'bx',/"bx":\{[^}]*"1":3/.test(ls.gs),'sk',/"ccna":2.5/.test(ls.gs),'atlas',ls.at,'pl',/"sec"/.test(ls.pl||''),er2);
await p.locator('.lscroll button:text-is("Analiz")').click();await p.waitForTimeout(300);
console.log(' ustalik on B',(await p.innerText('#view')).includes('Soruları ne kadar biliyorsun'));
await c1.close();await c2.close()}
await b.close()})();

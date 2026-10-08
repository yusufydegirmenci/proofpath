const {INIT,chromium}=require('/tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/repo/tests/stub.js');
const U='file:///tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/page.html';
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const good of [true,false]){
const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript('window.__guest=true');await p.addInitScript(INIT);
await p.addInitScript(`try{var st={},bx={};for(var i=0;i<30;i++){st[i]=[${good?3:1},3];bx[i]=1}localStorage.ya_gs=JSON.stringify({sk:{},st:st,bx:bx})}catch(e){}`);
const td=new Date().toISOString().slice(0,10);
await p.addInitScript(`(function(){var t=setInterval(function(){if(window.__store){window.__store['data/users/uGuest/pp/progress']={'${td}':{rtxp:300,date:'${td}'},'2026-10-01':{rtxp:300,date:'2026-10-01'}};clearInterval(t)}},0)})()`);
await p.goto(U+'?g'+good+'#bugun');await p.waitForTimeout(1600);
const t=await p.innerText('#view'),h=await p.innerText('#hero');
console.log('doğruluk yüksek',good,'| rütbe',(h.match(/Stajyer|Destek Uzmanı/)||[''])[0],'|',(h.match(/Sonraki:[^\n]*/)||[''])[0],er);
await ctx.close()}
await b.close()})();

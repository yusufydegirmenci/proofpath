const {INIT,chromium}=require('/tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/repo/tests/stub.js');
const U='file:///tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/page.html';
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const [w,g] of [[390,false],[1100,true]]){
const ctx=await b.newContext({viewport:{width:w,height:844},isMobile:w<500,hasTouch:w<500});const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript('window.__guest='+g);await p.addInitScript(INIT);
await p.addInitScript(`try{localStorage.ya_gs=JSON.stringify({sk:{},st:{"1":[3,3],"2":[2,3]},bx:{}})}catch(e){}`);
if(g)await p.addInitScript(`(function(){var t=setInterval(function(){if(window.__store){window.__store['data/users/uGuest/pp/prefs']={onb:{done:true,goal:'ccna',hrs:5}};clearInterval(t)}},0)})()`);
await p.goto(U+'?s'+w+'#bugun');await p.waitForTimeout(2800);
const t=await p.innerText('#view');console.log(w,g,'bugün satırı',/Eşitlendi|Eşitleme bekliyor/.test(t),t.match(/[✓!] (Eşitlendi|Eşitleme bekliyor)[^\n]*/)?.[0]);
await p.goto(U+'?s2'+w+'#ayar');await p.waitForTimeout(1500);
const a=await p.innerText('#view');console.log(w,'ayar panel',a.includes('Cihazlar arası'),'|',(a.match(/Soru ilerlemesi[^\n]*\n[^\n]*/)||[''])[0].replace(/\n/g,' '));
await p.screenshot({path:'v38-sync-'+w+'.png'});
console.log(w,'ovf',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),er);await ctx.close()}
await b.close()})();

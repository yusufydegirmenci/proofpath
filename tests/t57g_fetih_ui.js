const {INIT,chromium}=require(process.cwd()+'/repo/tests/stub.js');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const [w,m] of [[320,true],[390,true],[1100,false]]){
const ctx=await b.newContext({viewport:{width:w,height:844},isMobile:m,hasTouch:m});const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript(INIT);await p.addInitScript("localStorage.ya_gm_seen='1'");
await p.goto('file://'+process.cwd()+'/page_dbg.html#oyun');await p.waitForTimeout(1000);
await p.evaluate(()=>[...document.querySelectorAll('.gh-nav button')].find(b=>b.textContent.startsWith('Fetih')).click());await p.waitForTimeout(300);
console.log(w,'hub ovf',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),'nav',await p.evaluate(()=>{const n=document.querySelector('.gh-nav');return n.scrollWidth>n.clientWidth}));
if(w===390)await p.screenshot({path:'s57-fk-hub.png',fullPage:true});
await p.evaluate(()=>document.querySelector('.fk-card .btn.big').click());await p.waitForTimeout(500);
// tap on a neutral/neighbour region: find cell via state
for(let i=0;i<6;i++){await p.evaluate(()=>{const G=__S.fk;const nb=__X.fkNeighbors(G,1);const t=nb.includes(0)?0:nb[0];let cell=-1;for(let p=0;p<G.own.length;p++){if(G.own[p]!==t)continue;const x=p%36,y=(p-x)/36;const ns=[[1,0],[-1,0],[0,1],[0,-1]].some(d=>{const nx=x+d[0],ny=y+d[1];return nx>=0&&ny>=0&&nx<36&&ny<26&&G.own[ny*36+nx]===1});if(ns){cell=p;break}}
 const r=G.cv.getBoundingClientRect();const x=cell%36,y=Math.floor(cell/36);G.cv.dispatchEvent(new MouseEvent('click',{clientX:r.left+(x+.5)/36*r.width,clientY:r.top+(y+.5)/26*r.height,bubbles:true}))});await p.waitForTimeout(700)}
await p.evaluate(()=>{__S.fk.speed=3});await p.waitForTimeout(6000);
console.log(w,'status',await p.evaluate(()=>document.querySelector('.fk-top').innerText.replace(/\n/g,' ')),'ovf',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
await p.locator('.fk-wrap').screenshot({path:'s57-fk-'+w+'.png'});
// question
await p.evaluate(()=>{__S.fk.qcd=0});await p.waitForTimeout(400);
await p.evaluate(()=>[...document.querySelectorAll('.fk-wrap .btn')].find(b=>b.textContent.startsWith('Divan')).click());await p.waitForTimeout(300);
console.log('ask shown',await p.evaluate(()=>!document.querySelector('.fk-ask').hidden));
await p.evaluate(()=>document.querySelector('.fk-ask .gm-ab').click());await p.waitForTimeout(300);
console.log('ask hidden',await p.evaluate(()=>document.querySelector('.fk-ask').hidden),er);
await ctx.close()}
await b.close()})();

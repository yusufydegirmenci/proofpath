const {INIT,chromium}=require(process.cwd()+'/repo/tests/stub.js');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript(INIT);await p.addInitScript("localStorage.ya_gm_seen='1'");
await p.goto('file://'+process.cwd()+'/page_dbg.html#oyun');await p.waitForTimeout(1000);
const REP=+process.argv[2]||6;
const res=await p.evaluate((REP)=>{const out=[];
 function bot(G,skill){ // skill: 0 naive, 1 uses buildings+diplomacy sensibly
  let nx=0,bx=0;
  while(G.state==='play'&&G.t<1500){nx-=.1;bx-=.1;
   if(skill&&bx<=0){bx=4;const order=['kis','han','tal','his','med'];for(const id of order){if(G.bl[id]<(G.t<120?1:3)){const c=__X.FK_BL.find(x=>x.id===id).c[G.bl[id]];if(G.gold>=c+10){__X.fkBuy(G,id);break}}}}
   if(nx<=0){nx=2.5;const nb=__X.fkNeighbors(G,1).filter(o=>o===0||__X.fkRel(G,o)==='war');if(nb.length){const ws=nb.filter(o=>o>0).sort((a,b)=>G.N[a-1].troops/G.N[a-1].cells-G.N[b-1].troops/G.N[b-1].cells);const t=nb.includes(0)&&Math.random()<.5?0:(ws[0]!==undefined?ws[0]:0);__X.fkLaunch(G,1,t,60)}}
   __X.fkTick(G,.1)}
 }
 for(const dk of ['k','n','z'])for(const sk of [0,1])for(const sc of __X.FK_SC){let w=0,tt=0,n=0,st=0;for(let rep=0;rep<REP;rep++){const G=__X.fkBuild(sc,__X.FK_DF[dk],{dk:__X.FK_DK[Math.floor(Math.random()*__X.FK_DK.length)],cm:__X.FK_CM[Math.floor(Math.random()*__X.FK_CM.length)],kd:__X.FK_KD[Math.floor(Math.random()*__X.FK_KD.length)]});if(!G)continue;bot(G,sk);n++;if(G.over==='win'){w++;tt+=G.t;st+=G.stars}}
  out.push(dk+' sk'+sk+' '+sc.id.padEnd(13)+' win '+w+'/'+n+(w?' avg '+Math.round(tt/w)+'s par '+sc.par+' stars '+(st/w).toFixed(1):''))}
 return out},REP);
console.log(res.join('\n'));console.log(er);await b.close()})();

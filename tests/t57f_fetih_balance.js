const {INIT,chromium}=require(process.cwd()+'/repo/tests/stub.js');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript(INIT);await p.addInitScript("localStorage.ya_gm_seen='1'");
await p.goto('file://'+process.cwd()+'/page_dbg.html#oyun');await p.waitForTimeout(1000);
const res=await p.evaluate(()=>{const out=[];for(const dk of ['k','n','z'])for(const sc of __X.FK_SC){const wins=[];for(let rep=0;rep<4;rep++){const G=__X.fkBuild(sc,__X.FK_DF[dk]);if(!G){wins.push('nomap');continue}
 let nx=0;while(G.state==='play'&&G.t<1500){nx-=.1;if(nx<=0){nx=2.5;const nb=__X.fkNeighbors(G,1);if(nb.length){const ws=nb.filter(o=>o>0).sort((a,b)=>G.N[a-1].troops/G.N[a-1].cells-G.N[b-1].troops/G.N[b-1].cells);const t=nb.includes(0)&&Math.random()<.5?0:(ws[0]!==undefined?ws[0]:0);__X.fkLaunch(G,1,t,60)}}
  __X.fkTick(G,.1)}
 wins.push(G.over+':'+Math.round(G.t)+'s:'+Math.round(G.N[0].cells/G.land*100)+'%')}
 out.push(dk+' '+sc.id+' '+wins.join(' '))}return out});
console.log(res.join('\n'));console.log(er);await b.close()})();

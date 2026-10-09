const {INIT,chromium}=require(process.cwd()+'/repo/tests/stub.js');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await (await b.newContext()).newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript(INIT);await p.goto('file://'+process.cwd()+'/page_dbg.html');await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const X=__X,o=[];const ST=X.ST();Object.keys(X.TMAP).forEach(tr=>{(ST[tr]||[]).forEach((s,i)=>{const sc=X.nwFor({track:tr,title:s[0],topicId:'s-'+tr+'-'+(i+1)});o.push([tr,s[0],sc&&sc.id])})});return o});
const by={};r.forEach(x=>{(by[x[0]]=by[x[0]]||[0,0]);by[x[0]][1]++;if(x[2])by[x[0]][0]++});console.log(JSON.stringify(by));
r.forEach(x=>console.log(x[0].padEnd(5),(x[1]).slice(0,48).padEnd(50),x[2]||'-'));console.log(er);await b.close()})();

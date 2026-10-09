const {INIT,chromium}=require(process.cwd()+'/repo/tests/stub.js');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await (await b.newContext()).newPage();
await p.addInitScript(INIT);await p.goto('file://'+process.cwd()+'/page_dbg.html');await p.waitForTimeout(800);
console.log(await p.evaluate(()=>{const Q=__X.QBX;let bad=[],dup=[];Q.forEach((q,i)=>{if(!q.o||q.o.some(x=>x==null||x==='')||q.a<0||q.a>=q.o.length)bad.push(i);if(new Set(q.o).size!==q.o.length)dup.push(i)});const c={};Q.forEach(q=>{c[q.t]=(c[q.t]||0)+1});return JSON.stringify({n:Q.length,bad:bad,dup:dup,c:c})}));
await b.close()})();

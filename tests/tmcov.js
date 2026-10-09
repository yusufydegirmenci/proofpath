const {INIT,chromium}=require(process.cwd()+'/repo/tests/stub.js');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await (await b.newContext()).newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript(INIT);await p.goto('file://'+process.cwd()+'/page_dbg.html');await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const S=__X.ST(),o=[];Object.keys(S).forEach(tr=>S[tr].forEach((x,i)=>{const T=__X.tf({track:tr,topicId:'s-'+tr+'-'+(i+1),title:x[0]});if(!T)o.push(tr+'|'+i+'|'+x[0])}));return {miss:o,n:Object.keys(S).map(k=>k+':'+S[k].length)}});
console.log(JSON.stringify(r));
const q=await p.evaluate(()=>{const Q=__X.QBALL?__X.QBALL():null;return Q?Q.length:'n/a'});console.log('qb',q,er);
await b.close()})();

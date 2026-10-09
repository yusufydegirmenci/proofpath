const {INIT,chromium}=require(process.cwd()+'/repo/tests/stub.js');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await (await b.newContext()).newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript(INIT);await p.goto('file://'+process.cwd()+'/page_dbg.html');await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const X=__X,ST=X.ST(),bad=[];let n=0;Object.keys(X.TMAP||{}).concat(Object.keys(ST)).filter((v,i,a)=>a.indexOf(v)===i).forEach(tr=>{(ST[tr]||[]).forEach((s,i)=>{const t={id:'s-'+tr+'-'+(i+1),name:s[0],area:s[1]};const q=X.baseQuiz(tr,t);n++;
 if(q.length<4)bad.push([tr,s[0],'kısa '+q.length]);q.forEach(x=>{if(!x.options||x.options.length<2||x.options.indexOf(x.answer)<0||new Set(x.options).size!==x.options.length)bad.push([tr,s[0],'bozuk: '+x.q.slice(0,50)])})})});return {n,bad}});
console.log(JSON.stringify(r));console.log(er);await b.close()})();

const {INIT,chromium}=require(process.cwd()+'/repo/tests/stub.js');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await (await b.newContext()).newPage();
await p.addInitScript(INIT);await p.goto('file://'+process.cwd()+'/page_dbg.html');await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const X=__X,o=[];Object.keys(X.TMAP).forEach(tr=>X.TMAP[tr].forEach(t=>{const s=t.k+' '+(t.h||'')+' '+(t.m||[]).map(m=>m[0]+' '+m[1]).join(' ');let rx=null;for(const [id,re] of X.NW_RX)if(re.test(t.k+' '+(t.n||[]).join(' '))){rx=id;break}
 const fz=X.nwFuzzy(t.k+' '+(t.m||[]).map(m=>m[0]).join(' '));o.push([tr,t.k,rx,fz&&fz.id])}));return o});
let n=0,f=0;r.forEach(x=>{if(x[2])n++;else if(x[3]){f++;console.log('FUZZY',x[0],'|',x[1],'=>',x[3])}});console.log('total',r.length,'regex',n,'fuzzy',f);
r.filter(x=>x[2]).forEach(x=>console.log('RX',x[0],'|',x[1],'=>',x[2]));
await b.close()})();

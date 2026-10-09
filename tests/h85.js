const {INIT,chromium}=require(process.cwd()+'/repo/tests/stub.js');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
let bad=0,pages=0,tms=0;
for(const [w,hh,m] of [[320,700,true],[390,844,true],[768,900,false],[1100,800,false]]){
const ctx=await b.newContext({viewport:{width:w,height:hh},isMobile:m,hasTouch:m});const p=await ctx.newPage();
const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript(INIT);await p.addInitScript("localStorage.ya_gm_seen='1'");
await p.goto('file://'+process.cwd()+'/page_dbg.html#ders');await p.waitForTimeout(1000);
await p.click('.seg button:text-is("Notlar")');await p.waitForTimeout(300);
for(const t of ['CCNA','İngilizce','Siber','Backend']){
 await p.click('.seg button:text-is("'+t+'")');await p.waitForTimeout(200);
 const vals=await p.locator('select option').evaluateAll(o=>o.map(x=>x.value));
 for(const v of vals){
  await p.selectOption('select',v);await p.waitForTimeout(40);pages++;
  const r=await p.evaluate(()=>{var nb=document.querySelector('.nb'),o=[];if(!nb)return {err:'nonb'};var R=nb.getBoundingClientRect();
    nb.querySelectorAll('*').forEach(function(e){if(e.closest('.k-tw')||e.closest('.k-sk')||e.classList.contains('nb-tape')||e.classList.contains('nt-tp'))return;var r=e.getBoundingClientRect();if(r.width&&r.right>R.right+14)o.push(e.className+':'+Math.round(r.right-R.right))});
    return {doc:document.documentElement.scrollWidth>innerWidth,nb:nb.scrollWidth>nb.clientWidth+1,o:o.slice(0,3),txt:/undefined|NaN|\[object/.test(nb.innerText)}});
  if(r.err||r.doc||r.nb||(r.o&&r.o.length)||r.txt){bad++;console.log('BAD',w,t,v,JSON.stringify(r))}
 }}
// tmap panel on fake lessons
await p.click('.seg button:text-is("Dersler")');await p.waitForTimeout(200);
for(const tr of ['ccna','eng','sec','bk']){
 const n=await p.evaluate(tr=>__X.ST()[tr].length,tr);
 for(let i=0;i<n;i++){
  await p.evaluate(([tr,i])=>{var S=__S,st=__X.ST()[tr][i];var l=__X.cl({id:'fk-'+tr+i,track:tr,date:new Date().toISOString().slice(0,10),title:st[0],topicId:'s-'+tr+'-'+(i+1),blocks:[{t:'p',text:'a'}],quiz:[],warmup:null});S.lessons=[l].concat(S.lessons.filter(function(x){return x.track!==tr}));S.les.track=tr;S.les.view="ders";S.les.id=l.id;__X.draw()},[tr,i]);
  await p.waitForTimeout(25);tms++;
  const r=await p.evaluate(()=>{var e=document.querySelector('#ls-harita');if(!e)return {err:'noharita'};var R=e.getBoundingClientRect(),o=[];e.querySelectorAll('*').forEach(function(x){if(x.closest('.lp-tw'))return;var r=x.getBoundingClientRect();if(r.width&&r.right>R.right+2)o.push(x.className+':'+Math.round(r.right-R.right))});return {doc:document.documentElement.scrollWidth>innerWidth,o:o.slice(0,3)}});
  if(r.err||r.doc||(r.o&&r.o.length)){bad++;console.log('BAD tm',w,tr,i,JSON.stringify(r))}
 }}
if(er.length)console.log('ERR',w,er.slice(0,2));
await ctx.close()}
console.log('pages',pages,'tm',tms,'bad',bad);await b.close()})();

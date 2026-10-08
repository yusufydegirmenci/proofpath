const {INIT,chromium}=require('/tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/repo/tests/stub.js');
const U='file:///tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/page.html';
const SAMPLE=`(function(){var t2=setInterval(function(){if(window.claude&&!window.__w){window.__w=1;var o=window.claude.use;window.claude.use=async function(n){var r=await o(n);if(n==='sample'&&r){var j=async function(pr){window.__prompts=(window.__prompts||[]).concat([pr]);if(/işe alım/.test(pr))return {qs:[1,2,3,4,5].map(function(i){return {q:'Soru '+i+' nedir?',look:'kavram',model:'Örnek cevap '+i}})};if(/Bir BT mülakatında/.test(pr))return {score:7,good:'Yapı iyi',fix:'Örnek ekle'};return {}};return Object.assign(async function(){return {text:'ok'}},{json:j})}return r};clearInterval(t2)}},0)})()`;
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const [w,g] of [[390,false],[1100,true]]){
const ctx=await b.newContext({viewport:{width:w,height:844},isMobile:w<500,hasTouch:w<500});const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript('window.__guest='+g);await p.addInitScript(INIT);await p.addInitScript(SAMPLE);
if(g)await p.addInitScript(`(function(){var t=setInterval(function(){if(window.__store){window.__store['data/users/uGuest/pp/prefs']={onb:{done:true,goal:'ccna',hrs:5}};clearInterval(t)}},0)})()`);
await p.addInitScript(`try{localStorage.ya_gs=JSON.stringify({sk:{},st:{"3":[0,3],"5":[1,4],"9":[1,3]},bx:{"3":0}})}catch(e){}`);
await p.goto(U+'?m'+w+'#mul');await p.waitForTimeout(1500);
let t=await p.innerText('#view');console.log(w,g,'panel',/takıldığın sorulardan/i.test(t),'buton',await p.locator('button:text-is("5 soru hazırla")').count());
await p.click('button:text-is("5 soru hazırla")');await p.waitForTimeout(800);console.log('after gen',(await p.innerText('#view')).slice(0,600).replace(/\n/g,' | '),await p.evaluate(()=>(window.__prompts||[]).length));
for(let i=0;i<5;i++){
  await p.fill('textarea','Bu kavram şudur ve örneği şöyledir, kullanım amacı budur.');await p.waitForTimeout(100);
  await p.click('button:text-is("Cevabımı değerlendir")');await p.waitForTimeout(400);
  await p.click('button:text-is("Sonraki"), button:text-is("Bitir")');await p.waitForTimeout(300);
}
t=await p.innerText('#view');console.log(w,'sonuç',/ortalama 7/.test(t),'ovf',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
const key=g?'data/users/uGuest/pp/prefs':'prefs';console.log(w,'kayıt',await p.evaluate(k=>JSON.stringify(((window.__store[k]||{}).mock||{}).rows||null),key),er);
await p.screenshot({path:'v39-mock-'+w+'.png'});await ctx.close()}
await b.close()})();

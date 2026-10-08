const {INIT,chromium}=require('/tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/repo/tests/stub.js');
const U='file:///tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/page.html';
const dateJS=n=>`(function(){var off=${n}*864e5,R=Date;function D(){var a=arguments;if(!a.length)return new R(R.now()+off);return new (Function.prototype.bind.apply(R,[null].concat([].slice.call(a))))}D.prototype=R.prototype;D.now=function(){return R.now()+off};D.UTC=R.UTC;D.parse=R.parse;window.Date=D})();`;
async function session(b,ctx,dump,day,actions){
  const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
  await p.addInitScript('window.__guest=false');await p.addInitScript(dateJS(day));await p.addInitScript(INIT);
  if(dump)await p.addInitScript(`(function(){var t=setInterval(function(){if(window.__store){var d=${JSON.stringify(dump)};Object.keys(d).forEach(function(k){window.__store[k]=d[k]});clearInterval(t)}},0)})()`);
  await p.goto(U+'?d'+day+'#oyun');await p.waitForTimeout(1500);
  await actions(p);
  await p.waitForTimeout(2000);
  const out=await p.evaluate(()=>({store:JSON.stringify(window.__store),gs:JSON.parse(localStorage.ya_gs||'{}')}));
  const view=await p.innerText('#view');
  await p.close();
  return {dump:JSON.parse(out.store),gs:out.gs,er,view};
}
async function playRound(p){
  await p.click('.gh-nav button:text-is("Arcade")');await p.click('.gt >> nth=0').catch(()=>{});await p.waitForTimeout(500);
  await p.click('.gm-card button:text-is("Başla")');
  for(let i=0;i<400;i++){if(i%4==0)await p.keyboard.press(['ArrowLeft','ArrowRight'][Math.floor(Math.random()*2)]);await p.waitForTimeout(200);if(await p.$('.gm-res'))break}
}
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const pc=await b.newContext({viewport:{width:1100,height:800}});
let dump=null;const base=new Date().toISOString().slice(0,10);
for(let day=0;day<4;day++){
  const r=await session(b,pc,dump,day,async p=>{
    await playRound(p);
    // CV'ye isim yaz (ilk gün)
    if(day===0){await p.goto(U+'?cv#atolye');await p.waitForTimeout(1200);await p.locator('.lscroll button:text-is("CV")').click();await p.locator('input[type=text] >> nth=0').fill('Yusuf Test');await p.locator('input[type=text] >> nth=0').blur();await p.waitForTimeout(500)}
  });
  dump=r.dump;
  const me=(dump.league||{}).uOwner||{};
  console.log('PC gün',day+1,'| cevaplanan soru',Object.keys(r.gs.st||{}).length,'| toplam deneme',Object.values(r.gs.st||{}).reduce((a,v)=>a+v[1],0),'| lig günleri',Object.keys(me.d||{}).length,'| sync doc',!!(dump.prefs||{}).sync,'| hata',r.er.length);
}
const pcGs=JSON.parse(await (async()=>{const pg=await pc.newPage();await pg.goto(U+'?x');const v=await pg.evaluate(()=>localStorage.ya_gs||'{}');await pg.close();return v})());
// 5. gün: telefon, boş tarayıcı
const phone=await b.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
const r5=await session(b,phone,dump,4,async p=>{});
const me5=(r5.dump.league||{}).uOwner||{};
const sum=g=>Object.values(g.st||{}).reduce((a,v)=>a+v[1],0);
console.log('progress günleri',Object.keys(r5.dump.progress||{}).filter(k=>/^20\d\d-/.test(k)).length,Object.keys(r5.dump.progress||{}).slice(-6).join(','));console.log('TELEFON gün 5 | cevaplanan soru',Object.keys(r5.gs.st||{}).length,'(PC:',Object.keys(pcGs.st||{}).length+')','| toplam deneme',sum(r5.gs),'(PC:',sum(pcGs)+')','| hata',r5.er.length);
// telefonda Analiz ve CV
const p=await phone.newPage();await p.addInitScript('window.__guest=false');await p.addInitScript(dateJS(4));await p.addInitScript(INIT);
await p.addInitScript(`(function(){var t=setInterval(function(){if(window.__store){var d=${JSON.stringify(r5.dump)};Object.keys(d).forEach(function(k){window.__store[k]=d[k]});clearInterval(t)}},0)})()`);
await p.goto(U+'?ph#atolye');await p.waitForTimeout(1800);
await p.locator('.lscroll button:text-is("Analiz")').click();await p.waitForTimeout(400);
console.log('telefon Analiz: Ustalık paneli',(await p.innerText('#view')).includes('Soruları ne kadar biliyorsun'));
await p.locator('.lscroll button:text-is("CV")').click();await p.waitForTimeout(400);
console.log('telefon CV adı',await p.locator('input[type=text] >> nth=0').inputValue());
await p.goto(U+'?ph2#oyun');await p.waitForTimeout(1200);
console.log('telefon Oyun hafta pill:',(await p.innerText('#view')).match(/\d+ gün[^\n]*/g));
await p.screenshot({path:'sim-phone.png'});
await b.close()})();

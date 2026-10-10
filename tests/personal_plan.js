// Kişiye özel plan: farklı geçmişi olan iki kullanıcı farklı plan görür.
const path=require('path');const {INIT,chromium}=require('./stub.js');
const URL='file://'+path.resolve(__dirname,'../index.html');
async function run(b,label,setup){
  const ctx=await b.newContext({viewport:{width:420,height:900}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.addInitScript('window.__guest=true');await p.addInitScript(INIT);
  await p.addInitScript(()=>{const u=window.claude.use;window.claude.use=async n=>n==='sample'?null:u(n)});
  await p.addInitScript(setup);
  await p.goto(URL+'#bugun');await p.waitForTimeout(2200);
  const out=await p.evaluate(()=>{const e=document.querySelector('.pp-me');return e?e.textContent.replace(/\s+/g,' ').slice(0,700):'(panel yok)'});
  console.log('['+label+'] '+out);
  const t=await p.evaluate(()=>document.body.textContent);
  await ctx.close();return {out,errs};
}
(async()=>{
  const b=await chromium.launch();let fail=0;
  const A=await run(b,'yeni kullanıcı',()=>{});
  const B=await run(b,'zayıf kullanıcı',()=>{
    localStorage.setItem('ya_gs',JSON.stringify({sk:{},bx:{0:0,1:0,2:0,3:0},st:{0:[0,2],1:[0,1],2:[1,3],3:[0,2]},ts:new Date().toISOString()}));
    window.__store['data/users/uGuest/pp/mistakes']={m1:{track:'ccna',q:'Switch hangi adrese göre karar verir?',answer:'MAC',why:'',lesson:'MAC adresi ve Switch',date:'2026-10-01',box:1,due:'2026-10-02',done:false,ts:'2026-10-01T00:00:00Z'}};
  });
  if(A.errs.length||B.errs.length){fail++;console.log('HATA',A.errs,B.errs)}
  if(A.out===B.out){fail++;console.log('FAIL planlar aynı')}
  if(!/Tekrar/.test(B.out)){fail++;console.log('FAIL tekrar maddesi yok')}
  console.log(fail?'BAŞARISIZ':'TAMAM');await b.close();process.exit(fail?1:0);
})();

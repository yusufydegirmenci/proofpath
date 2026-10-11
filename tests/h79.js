const {INIT,chromium}=require('./stub.js');
const U=require('url').pathToFileURL(require('path').join(__dirname,'..','index.html')).href;
(async()=>{const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript('window.__guest=true');await p.addInitScript(INIT);
await p.addInitScript(`try{var q=['ccna','eng','sec','bk'],o={};q.forEach(function(t){o[t]={lv:1,n:0,ok:0,d:'2026-10-08',skip:true}});localStorage.ya_pl=JSON.stringify(o)}catch(e){}`);
const today=new Date().toISOString().slice(0,10);
await p.addInitScript(`(function(){var t=setInterval(function(){if(window.__store){clearInterval(t);var a={};for(var i=0;i<5;i++)a['a'+i]={date:'${today}',track:'ccna',q:'x'+i,ok:true,topicId:'s-ccna-1',ts:'${today}T10:0'+i+':00Z'};window.__store['data/users/uGuest/pp/attempts']=a}},5)})()`);
await p.goto(U+'#ders');await p.waitForTimeout(1500);
for(const n=await p.locator('button:text-is("Tamam, anladım")').count();;){break}
const n=await p.locator('button:text-is("Tamam, anladım")').count();for(let i=0;i<n;i++){await p.locator('button:text-is("Tamam, anladım")').first().click();await p.waitForTimeout(100)}
await p.locator('button:has-text("Isınmayı bitirdim")').click();await p.waitForTimeout(400);
// quiz: reveal & mark all
// v58 Ders Odası: ısınma -> "Okudum, mini sınava geç" -> mini sınavın tüm soruları (ya_lc: w,r,q; p = bugün 5 deneme tohumdan)
await p.locator('button:text-is("Okudum, mini sınava geç")').click();await p.waitForTimeout(400);
const ans=await p.evaluate(()=>window.PP_LESSONS.ccna[1].quiz.map(q=>q.answer));console.log('quiz q',ans.length);
for(const [i,a] of ans.entries()){await p.evaluate(([m,i])=>{const kart=document.querySelectorAll('#view .qz')[i];const b=kart&&[...kart.querySelectorAll('button')].find(x=>x.textContent.replace(/^[A-D]s*/,'').trim()===m);b.click()},[a,i]);await p.waitForTimeout(150)}
await p.waitForTimeout(400);
await p.goto(U+'?z#ders');await p.waitForTimeout(1500);
const t=await p.textContent('#view');
console.log('lc',await p.evaluate(()=>localStorage.ya_lc));
console.log('lc done keys',JSON.stringify(await p.evaluate(()=>JSON.parse(localStorage.ya_lc||'{}')['s-ccna-1'])));
console.log('now topic2 gate',t.includes('Kilitli: önce'),'t2',t.includes('IP adresi'),'er',er);
const lcs=await p.evaluate(()=>JSON.parse(localStorage.ya_lc||'{}')['s-ccna-1']||{});
if(!(lcs.w&&lcs.r&&lcs.q&&lcs.p&&t.includes('IP adresi'))||er.length){console.log('HATA: ders tamamlanmadı ya da ikinci ders açılmadı');process.exitCode=1}
await b.close()})();

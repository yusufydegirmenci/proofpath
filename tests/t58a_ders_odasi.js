const {INIT,chromium}=require(process.cwd()+'/repo/tests/stub.js');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const [w,m] of [[320,true],[390,true],[1100,false]]){
const ctx=await b.newContext({viewport:{width:w,height:844},isMobile:m,hasTouch:m,colorScheme:'dark'});const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript(INIT);await p.addInitScript("localStorage.ya_gm_seen='1';window.__store.lessons['2026-10-09-fk']={id:'2026-10-09-fk',date:'2026-10-09',track:'ccna',kind:'ders',title:'Switch dersi',topicId:'s-ccna-3',hook:'Kısaca bir benzetme',blocks:[{t:'p',text:'Deneme paragrafı.'}],quiz:[{q:'Switch hangi adrese bakar?',options:['IP','MAC','Port','DNS'],answer:'B) MAC',why:'Switch MAC tablosu kullanır.'},{q:'Router hangi katman?',options:['Katman 1','Katman 2','Katman 3'],answer:'Katman 3',why:'IP ile çalışır.'},{q:'Açık uçlu soru?',answer:'Cevap',why:'y'}]}");
await p.goto('file://'+process.cwd()+'/page_dbg.html#ders');await p.waitForTimeout(1000);
const fake=async(step,unlock)=>{await p.evaluate(([step,unlock])=>{const S=__S;if(false){const st=__X.ST().ccna[2];const l=__X.cl({id:'2026-10-09-fk',track:'ccna',date:new Date().toISOString().slice(0,10),title:st[0],topicId:'s-ccna-3',blocks:[{t:'p',text:'Deneme paragrafı.'}],quiz:[{q:'Switch hangi adrese bakar?',options:['IP','MAC','Port','DNS'],answer:'B) MAC',why:'Switch MAC tablosu kullanır.'},{q:'Router hangi katman?',options:['Katman 1','Katman 2','Katman 3'],answer:'Katman 3',why:'IP ile çalışır.'},{q:'Açık uçlu soru?',answer:'Cevap',why:'y'}],hook:'Kısaca bir benzetme'});S.lessons.push(l)}S.les.id='2026-10-09-fk';S.les.room='2026-10-09-fk';S.les.rs=step;if(unlock)localStorage.ya_lc=JSON.stringify({'s-ccna-3':{w:1,r:1}});__X.draw()},[step,unlock]);await p.waitForTimeout(250)};
await fake('isinma',false);
console.log(w,'room',await p.$$eval('.lr-head',a=>a.length),'cta in list? (n/a)','ovf',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
if(w===390)await p.screenshot({path:'s58-room1.png',fullPage:true});
await fake('anlat',true);
console.log('anim',await p.$$eval('.an',a=>a.length));
await p.evaluate(()=>[...document.querySelectorAll('.an .btn')].find(b=>/Başlat/.test(b.textContent)).click());await p.waitForTimeout(500);
console.log('active',await p.$$eval('.an-r.on',a=>a.length));
if(w===390)await p.locator('.an').screenshot({path:'s58-anim.png'});
await p.evaluate(()=>{for(let i=0;i<3;i++)[...document.querySelectorAll('.an .btn')].find(b=>/Devam|▶/.test(b.textContent)||b.getAttribute('aria-label')==='Sonraki adım').click()});
await fake('sinav',true);
console.log('quiz cards',await p.$$eval('.qz',a=>a.length),'opts',await p.$$eval('.qz-o',a=>a.length));
await p.evaluate(()=>{const os=document.querySelectorAll('.qz-o');os[0].click();const q2=document.querySelectorAll('.qz')[1];if(q2)q2.querySelectorAll('.qz-o')[2].click()});await p.waitForTimeout(100);
console.log('marked ok/no',await p.$$eval('.qz.ok',a=>a.length),await p.$$eval('.qz.no',a=>a.length),'ovf',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
if(w===390)await p.screenshot({path:'s58-quiz.png',fullPage:true});
await fake('notlar',true);
console.log('notes nb',await p.$$eval('.nb',a=>a.length),'miss',await p.$$eval('.lr-miss',a=>a.length),'ovf',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
if(w===390)await p.screenshot({path:'s58-notes.png',fullPage:true});
await fake('alis',true);
console.log(er);await ctx.close()}
await b.close()})();

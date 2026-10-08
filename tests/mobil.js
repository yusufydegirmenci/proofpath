const path=require('path');
const {INIT,chromium}=require('./stub.js');
(async()=>{
  const b=await chromium.launch();
  const tabs=['bugun','ders','sinif','sehir','ofis','oku','masa','lig','mul','proje','sozluk','rehber','ayar','sayilar','oduller'];
  const devs=[['se',320,568,2],['pixel',360,780,3],['promax',430,932,3]];
  const prefs=[{fs:2,simple:0,hc:0},{fs:1,simple:1,hc:1},{fs:2,simple:1,hc:0}];
  let bad=0,n=0;
  for(const [dn,w,h,dpr] of devs)for(const pf of prefs)for(const t of tabs){
    const ctx=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:dpr,isMobile:true,hasTouch:true,colorScheme:'light'});
    const p=await ctx.newPage();const errs=[];
    p.on('pageerror',e=>errs.push(e.message));
    await p.addInitScript('window.__guest=false');
    await p.addInitScript(`try{localStorage.setItem('ya_pf',${JSON.stringify(JSON.stringify({fs:pf.fs,simple:pf.simple,hc:pf.hc,pace:'normal'}))});localStorage.setItem('ya_seen','1')}catch(e){}`);
    await p.addInitScript(INIT);
    await p.goto('file://'+path.resolve(__dirname,'../index.html')+'?t='+Math.random()+'#'+t);
    await p.waitForTimeout(1500);
    const r=await p.evaluate(()=>{const de=document.documentElement;let wide=[];document.querySelectorAll('#view *').forEach(e=>{const b=e.getBoundingClientRect();if(b.width>0&&b.right>innerWidth+2&&!e.closest('[style*="overflow"],.scroll,.tabs,nav')&&getComputedStyle(e).position!=='fixed')wide.push(e.tagName+'.'+(e.className||'').toString().slice(0,30))});return{ovf:de.scrollWidth>innerWidth,wide:wide.slice(0,3)}});
    n++;
    if(errs.length||r.ovf){bad++;console.log('SORUN',dn,JSON.stringify(pf),t,errs.slice(0,1),r.ovf?'taşma':'',r.wide)}
    if(t==='bugun'&&pf.fs===2&&dn==='se')await p.screenshot({path:'m-se-fs2-bugun.png'});
    await ctx.close();
  }
  await b.close();console.log('bakılan',n,'sorun',bad);
})();

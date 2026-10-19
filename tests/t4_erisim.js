// Tur 4: 390 px dokunma hedefi >= 44 px (chip/seg/not/nw-chip2/sn) ve koyu temada yardım şeridi kontrastı >= 4.5.
const path=require('path');
const {INIT,chromium}=require('./stub.js');
(async()=>{
  const b=await chromium.launch();let bad=0;
  const ok=(c,m)=>{if(!c){bad++;console.log('KALDI',m)}else console.log('ok',m)};
  for(const scheme of ['light','dark']){
    const ctx=await b.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,colorScheme:scheme});
    const p=await ctx.newPage();
    await p.addInitScript('window.__guest=false');
    await p.addInitScript("try{localStorage.setItem('ya_seen','1')}catch(e){}");
    await p.addInitScript(INIT);
    await p.goto('file://'+path.resolve(__dirname,'../index.html')+'#ayar');
    await p.waitForSelector('.seg button',{timeout:15000});
    const r=await p.evaluate(()=>{
      const v=document.getElementById('view');
      const mk=(tag,cls,wrap)=>{const w=document.createElement('div');if(wrap)w.className=wrap;const e=document.createElement(tag);e.className=cls;e.type='button';e.textContent='x';w.appendChild(e);v.appendChild(w);return e};
      const sizes={};
      [['chip','button','chip'],['kinds','button','','my-kinds'],['pn','button','my-pn'],['nw','button','nw-chip2'],['sn','button','sn'],['gh','button','','gh-nav']].forEach(a=>{
        const e=mk('button',a[2],a[3]);const bb=e.getBoundingClientRect();sizes[a[0]]=[bb.width,bb.height]});
      const seg=[...document.querySelectorAll('.seg button')].map(e=>e.getBoundingClientRect().height);
      const lum=c=>{const f=x=>{x/=255;return x<=.03928?x/12.92:Math.pow((x+.055)/1.055,2.4)};return .2126*f(c[0])+.7152*f(c[1])+.0722*f(c[2])};
      const rgb=s=>{const m=s.match(/rgba?\(([^)]+)\)/);return m?m[1].split(/[ ,]+/).map(Number):null};
      return{sizes,seg,hlp:!!document.querySelector('.hlp-i'),icon:(()=>{const e=document.querySelector('.hlp-i');if(!e)return null;const f=rgb(getComputedStyle(e).color),g=rgb(getComputedStyle(e).backgroundColor);if(!f||!g)return null;const a=lum(f),c=lum(g);return (Math.max(a,c)+.05)/(Math.min(a,c)+.05)})()};
    });
    for(const k in r.sizes)ok(r.sizes[k][1]>=44,scheme+' '+k+' yükseklik '+Math.round(r.sizes[k][1]));
    ok(r.sizes.pn[0]>=44&&r.sizes.sn[0]>=44&&r.sizes.gh[0]>=44,scheme+' genişlik pn/sn/gh >= 44');
    ok(r.seg.length>0&&r.seg.every(h=>h>=44),scheme+' ayar .seg düğmeleri >= 44 ('+r.seg.length+')');
    ok(r.icon!=null,'hlp-i bulundu');
    if(r.icon!=null)ok(r.icon>=4.5,scheme+' yardım "?" simgesi kontrast '+r.icon.toFixed(2));
    await ctx.close();
  }
  await b.close();
  if(bad){console.log('SORUN',bad);process.exit(1)}console.log('t4_erisim tamam');
})();

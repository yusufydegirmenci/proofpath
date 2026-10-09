const {INIT,chromium}=require(process.cwd()+'/repo/tests/stub.js');
const seed=+process.argv[2]||1,steps=+process.argv[3]||250,w=+process.argv[4]||390;
let s=seed;function rnd(){s=(s*1664525+1013904223)>>>0;return s/4294967296}
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const ctx=await b.newContext({viewport:{width:w,height:844},isMobile:w<600,hasTouch:w<600});const p=await ctx.newPage();const er=[];
p.on('pageerror',e=>er.push('PE '+e.message));p.on('console',m=>{if(m.type()==='error'&&!/ERR_TUNNEL|Failed to load resource/.test(m.text()))er.push('CE '+m.text())});
await p.addInitScript(INIT);await p.addInitScript("localStorage.ya_gm_seen='1'");
await p.goto('file://'+process.cwd()+'/page_dbg.html');await p.waitForTimeout(900);
const H=process.argv[5]||'';const trail=[];let ovf=0;
for(let i=0;i<steps;i++){ if(H&&i%30===0){await p.evaluate(h=>{location.hash=h},H);await p.waitForTimeout(300)}
 const info=await p.evaluate((r)=>{const bs=[...document.querySelectorAll('button,a[href],[role=tab],summary,input[type=checkbox],input[type=radio]')].filter(e=>{const q=e.getBoundingClientRect();return q.width>0&&q.height>0&&!e.disabled&&getComputedStyle(e).visibility!=='hidden'});if(!bs.length)return null;const e=bs[Math.floor(r*bs.length)];const t=(e.textContent||e.getAttribute('aria-label')||e.tagName).trim().slice(0,30);
 if(/sıfırla|Sil|Çıkış|sign/i.test(t)&&!/Seç/.test(t))return {skip:t};
 e.scrollIntoView({block:'center'});e.click();return {t:t,h:location.hash,o:document.documentElement.scrollWidth>innerWidth+1}},rnd()).catch(e=>({err:e.message}));
 if(!info)break;if(info.o){ovf++;trail.push('OVF after '+info.t+' @'+info.h)}trail.push(info.t||info.skip||info.err);
 await p.waitForTimeout(60+Math.floor(rnd()*140));
 if(er.length>0&&er.length<4)console.log('ERR at step',i,'last:',trail.slice(-6).join(' > '),'|',er[er.length-1].slice(0,200));
 if(er.length>=4)break}
console.log('seed',seed,'w',w,'steps',trail.length,'ovf',ovf,'errors',er.length);[...new Set(er)].slice(0,6).forEach(e=>console.log('  ',e.slice(0,220)));
console.log('  ovf trail',trail.filter(x=>/^OVF/.test(x)).slice(0,5).join(' | '));
await b.close()})();

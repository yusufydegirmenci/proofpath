const {INIT,chromium}=require('/tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/repo/tests/stub.js');
const U='file:///tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/page.html';
const SAMPLE=`window.__prompts=[];(function(){var t2=setInterval(function(){if(window.claude&&!window.__w){window.__w=1;var o=window.claude.use;window.claude.use=async function(n){var r=await o(n);if(n==='sample'&&r){var j=async function(pr,op){window.__prompts.push(pr);return {title:'Test dersi',hook:'özet',blocks:[{t:'h',text:'Baslik'},{t:'p',text:'metin'},{t:'p',text:'metin2'}],quiz:[{q:'s?',options:['a','b','c'],answer:'b',why:'w'}],interview:[],vocab:[],homework:'x',resources:[]}};return Object.assign(async function(pr){return {text:'ok'}},{json:j})}return r};clearInterval(t2)}},0)})()`;
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const w of [390,1100]){
const ctx=await b.newContext({viewport:{width:w,height:844},isMobile:w<500,hasTouch:w<500});const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript('window.__guest=true');await p.addInitScript(INIT);await p.addInitScript(SAMPLE);
await p.goto(U+'?p'+w+'#ders');await p.waitForTimeout(1500);
let t=await p.innerText('#view');console.log(w,'yerleştirme paneli',/nereden başlayalım/i.test(t),'ders gizli',!/Şimdi ders üret/.test(t));
await p.click('button:text-is("Seviye testini yap (3 dakika)")');await p.waitForTimeout(400);
for(let i=0;i<6;i++){await p.locator('.lsn .opt >> nth=1').click();await p.waitForTimeout(120);await p.click('button:text-is("Sonraki"), button:text-is("Sonucu gör")');await p.waitForTimeout(150)}
t=await p.innerText('#view');console.log(w,'sonuç',/Derse başla/.test(t),(t.match(/seviye [\d.]+ \/ 3/)||[''])[0]);
await p.click('button:text-is("Derse başla")');await p.waitForTimeout(400);
t=await p.innerText('#view');await p.click('button:text-is("Şimdi ders üret")');await p.waitForTimeout(700);t=await p.innerText('#view');console.log(w,'rehber (ders sonrası)',/Bu dersi nasıl çalışmalısın/.test(t));console.log(w,'rehber kartı',/Bu dersi nasıl çalışmalısın/.test(t),'üret düğmesi',/Şimdi ders üret/.test(t),'ovf',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
const pr=await p.evaluate(()=>window.__prompts.slice(-1)[0]||'');console.log(w,'komutta seviye',/Seviye testi sonucu/.test(pr),'konu',(pr.match(/KONU: ([^(]{0,50})/)||[])[1]);
await p.screenshot({path:'v41-ders-'+w+'.png'});console.log(w,er);await ctx.close()}
await b.close()})();

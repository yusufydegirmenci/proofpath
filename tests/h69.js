const {INIT,chromium}=require('/tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/repo/tests/stub.js');
const U='file:///tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/page.html';
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const w of [390,1100]){
const ctx=await b.newContext({viewport:{width:w,height:844},isMobile:w<500,hasTouch:w<500});const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript('window.__guest=true');await p.addInitScript(INIT);await p.addInitScript(`try{localStorage.ya_pl=JSON.stringify({ccna:{lv:1,n:0,ok:0,d:'2026-10-08',skip:true},eng:{lv:1,n:0,ok:0,d:'2026-10-08',skip:true},sec:{lv:1,n:0,ok:0,d:'2026-10-08',skip:true},bk:{lv:1,n:0,ok:0,d:'2026-10-08',skip:true}})}catch(e){}`);
await p.addInitScript(`window.__prompts=[];(function(){var t=setInterval(function(){if(window.__store){['topics','days','lessons','inbox','progress','tickets','ticket_replies','ticket_reviews','audit','profile','story','prefs','desk'].forEach(function(k){delete window.__store[k]});clearInterval(t)}},0);var t2=setInterval(function(){if(window.claude&&!window.__w){window.__w=1;var o=window.claude.use;window.claude.use=async function(n){var r=await o(n);if(n==='sample'&&r){var f=r;var j=async function(pr,op){window.__prompts.push(pr);return {title:'Test dersi',hook:'özet',blocks:[{t:'h',text:'Baslik'},{t:'p',text:'metin'},{t:'p',text:'metin2'}],quiz:[{q:'s?',options:['a','b','c'],answer:'b',why:'w'}],interview:[],vocab:[],homework:'x',resources:[]}};var g=Object.assign(async function(pr){window.__prompts.push(pr);return {text:'ok'}},{json:j});return g}return r};clearInterval(t2)}},0)})()`);
await p.goto(U+'?a'+w+'#ders');await p.waitForTimeout(1500);
console.log(w,'ders empty text',(await p.innerText('#view')).includes('Henüz dersin yok'));
for(const tr of ['CCNA','İngilizce','Siber','Backend']){
 await p.locator('.seg button:text-is("'+tr+'")').first().click().catch(()=>console.log('no seg',tr));await p.waitForTimeout(200);
 await p.locator('button:text-is("Şimdi ders üret")').click();await p.waitForTimeout(700);
 const t=await p.innerText('#view');console.log(w,tr,'ders var',t.includes('Test dersi'));
}
const lessons=await p.evaluate(()=>Object.values(window.__store['data/users/uGuest/pp/lessons']||{}).map(l=>l.track+':'+l.topicId));console.log(w,'saved',lessons.join(','));
const pr=await p.evaluate(()=>window.__prompts.map(x=>(x.match(/KONU: ([^(\n]{0,50})/)||[])[1]));console.log(w,'topics',pr.join(' | '));
// 2. ders CCNA farklı konu
await p.locator('.seg button:text-is("CCNA")').first().click();await p.waitForTimeout(200);
await p.locator("button:text-is(\"Şimdi ders üret\")").click();await p.waitForTimeout(700);console.log(w,"ikinci ders konusu",await p.evaluate(()=>window.__prompts.slice(-1)[0].match(/KONU: ([^(\n]{0,50})/)[1]),await p.evaluate(()=>Object.keys(window.__store["data/users/uGuest/pp/lessons"]).filter(k=>k.indexOf("ccna")>0).length));
await p.goto(U+'?m'+w+'#masa');await p.waitForTimeout(900);console.log(w,'masa txt',(await p.innerText('#view')).includes('Henüz ticket yok. Aşağıdan'));
await p.goto(U+'?o'+w+'#ofis');await p.waitForTimeout(900);console.log(w,'ofis txt',(await p.innerText('#view')).includes('Hikâye ve Müdür raporu'),'ovf',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),er);
await ctx.close()}
await b.close()})();

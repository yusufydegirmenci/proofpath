const {INIT,chromium}=require('/tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/repo/tests/stub.js');
const U='file:///tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/page.html';
const td=new Date().toISOString().slice(0,10);
async function play(p,n){for(let i=0;i<n;i++){await p.locator('.du-o').first().click();await p.waitForTimeout(80);await p.locator('button:has-text("Sonraki soru"), button:has-text("Sonucu gör")').click();await p.waitForTimeout(80)}}
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const w of [390,1100]){
const ctx=await b.newContext({viewport:{width:w,height:844},isMobile:w<500,hasTouch:w<500});const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.addInitScript(INIT);
await p.goto(U+'?a'+w+'#oyun');await p.waitForTimeout(1800);
let t=await p.textContent('#view');
console.log(w,'arena',t.includes('Meydan oku!'),'bots',await p.locator('.ar-bot').count(),'eski Oyna',await p.locator('button:text-is("Oyna")').count()>=1,'ovf',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
// CPU duel (zor)
await p.locator('.ar-bot').nth(2).click();await p.waitForTimeout(300);
console.log(w,'duel ekranı',await p.locator('.du-q').count(),'timer',await p.locator('#du-bar').count());
await play(p,8);await p.waitForTimeout(300);
t=await p.textContent('#view');console.log(w,'sonuç',/ZAFER|Yenildin|Berabere/.test(t),'ya_dz',await p.evaluate(()=>{var o=JSON.parse(localStorage.ya_dz||'{}');return o.w+'/'+o.l+'/'+o.d+' r'+o.r}));
await p.locator('button:text-is("Arenaya dön")').click();await p.waitForTimeout(300);
// kolay: kazan şansı; XP
await p.locator('.ar-bot').nth(0).click();await p.waitForTimeout(300);await play(p,8);
console.log(w,'2. maç tamam',/ZAFER|Yenildin|Berabere/.test(await p.textContent('#view')));
await p.locator('button:text-is("Arenaya dön")').click();await p.waitForTimeout(300);
// arkadaşa gönder (herkese açık)
await p.locator('button:text-is("Meydan oku, ilk ben oynarım")').click();await p.waitForTimeout(300);await play(p,8);await p.waitForTimeout(300);
t=await p.textContent('#view');console.log(w,'gönderildi',t.includes('Meydan okuma gönderildi'));
const mine=await p.evaluate(()=>{var l=window.__store.league&&window.__store.league.uOwner;return l&&l.dz?Object.keys(l.dz.ch||{}).length+' ch, r'+l.dz.r:'yok'});console.log(w,'league doc',mine);
await p.locator('button:text-is("Arenaya dön")').click();await p.waitForTimeout(300);
await ctx.close();
const ctx2=await b.newContext({viewport:{width:w,height:844},isMobile:w<500,hasTouch:w<500});const p2=await ctx2.newPage();const er2=[];p2.on('pageerror',e=>er2.push(e.message));
await p2.addInitScript(INIT);
await p2.addInitScript(`(function(){var t=setInterval(function(){if(window.__store&&window.__store.league){clearInterval(t);var L=window.__store.league,now=new Date().toISOString();
L.uOwner={since:'2026-09-01',d:{},dz:{r:1000,w:0,l:0,d:0,st:0,cpu:{},re:{},set:{},ch:{ab1:{to:'*',trk:'ccna',dd:2,seed:5,sc:500,rs:[],ts:now}}}};
L.uF1.dz={r:1000,w:0,l:0,d:0,ch:{},set:{},re:{ab1:{from:'uOwner',sc:600,rs:[],ts:now}}};
L.uF2=L.uF2||{since:'2026-09-01',d:{}};L.uF2.dz={r:1100,w:2,l:1,d:0,re:{},set:{},ch:{zz1:{to:'uOwner',trk:'ccna',dd:2,seed:12345,sc:700,rs:[[1,5],[1,6],[0,9],[1,4],[1,7],[0,8],[1,6],[1,5]],ts:now}}}}},2)})()`);
await p2.goto(U+'?c'+w+'#oyun');await p2.waitForTimeout(2200);
t=await p2.textContent('#view');console.log(w,'geçmiş sonuç',t.includes('Kaybettin 500–600'),'elif',t.includes('Elif'),'gelen',t.includes('Seni bekleyen'),'kabul',await p2.locator('button:text-is("Kabul et")').count());
console.log(w,'reyting yazıldı',await p2.evaluate(()=>{var d=window.__store.league.uOwner.dz;return d.r+' set '+Object.keys(d.set||{}).join(',')+' l'+d.l}));
await p2.locator('button:text-is("Kabul et")').first().click();await p2.waitForTimeout(300);await play(p2,8);await p2.waitForTimeout(300);
t=await p2.textContent('#view');console.log(w,'cevap sonucu',/ZAFER|Yenildin|Berabere/.test(t),'re yazıldı',await p2.evaluate(()=>Object.keys((window.__store.league.uOwner.dz||{}).re||{}).join(',')));
console.log(w,'ovf',await p2.evaluate(()=>document.documentElement.scrollWidth>innerWidth),er,er2);
await ctx2.close();continue;
console.log(w,'ovf',await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),er);
await ctx.close()}
await b.close()})();

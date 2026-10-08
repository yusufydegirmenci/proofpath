const {INIT,chromium}=require('/tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/repo/tests/stub.js');
const U='file:///tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/page.html';
const dts=n=>{const o=[];for(let i=0;i<n;i++){const d=new Date(Date.now()-i*864e5);o.push(d.toISOString().slice(0,10))}return o};
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const w of [390,1100]){
 // 1) yeni kullanıcı: terfi dosyası + şehir + daha menüsü
 let ctx=await b.newContext({viewport:{width:w,height:844},isMobile:w<500,hasTouch:w<500});let p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
 await p.addInitScript('window.__guest=true');await p.addInitScript(INIT);
 await p.addInitScript(`try{var q=['ccna','eng','sec','bk'],o={};q.forEach(function(t){o[t]={lv:1,n:0,ok:0,d:'2026-10-08',skip:true}});localStorage.ya_pl=JSON.stringify(o)}catch(e){}`);
 await p.goto(U+'?r'+w+'#oduller');await p.waitForTimeout(1500);let t=await p.textContent('#view');
 console.log(w,'terfi dosyası',t.includes('Terfi dosyası'),'Stajyer → Uzman Yardımcısı',t.includes('Stajyer → Uzman Yardımcısı'),'satır',await p.locator('.panel:has-text("Terfi dosyası") .cov-r').count());
 await p.goto(U+'?s'+w+'#sehir');await p.waitForTimeout(1500);t=await p.textContent('#view');console.log(w,'şehir (arkadaş)',t.includes('bina tamam'),t.includes('Şehir henüz boş'));
 await p.goto(U+'?t'+w+'#bugun');await p.waitForTimeout(1500);t=await p.textContent('#view');console.log(w,'bugün şehir kartı',t.includes('bina ayakta'),'aktif gün kaldı',t.includes('aktif gün'));
 await p.locator('button:has-text("Daha")').last().click();await p.waitForTimeout(400);t=await p.textContent('.msheet');console.log(w,'daha: şehir/masa/gazete',t.includes('Ağ Şehri'),t.includes('Masa'),t.includes('Gazete'));
 console.log(w,'hata',er);await ctx.close();
 // 2) uzun ara: kıdem kaybı uyarısı (owner)
 ctx=await b.newContext({viewport:{width:w,height:844}});p=await ctx.newPage();const er2=[];p.on('pageerror',e=>er2.push(e.message));
 await p.addInitScript(INIT);await p.goto(U+'?o'+w+'#oduller');await p.waitForTimeout(1500);t=await p.textContent('#view');
 console.log(w,'sahip terfi dosyası',t.includes('Terfi dosyası'),'rütbe satırı',/Stajyer|Uzman/.test(t),er2);await ctx.close();
}
await b.close()})();

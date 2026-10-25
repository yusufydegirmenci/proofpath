"use strict";
/* ---- v34: kilitli aşamalar (Altın Vuruş) ---- */
var GATE_AT={ba:"Başlangıç",sw:"Yazılım & Test",en:"İngilizce",sec:"Siber",bk:"Backend",ccna:"CCNA",net:"Network",dev:"DevOps",qa:"Test Uzmanı"};
function gateEval(g){
  var rows=String(g||"").split(";").filter(Boolean).map(function(x){
    var a=x.split(":"),k=a[0],ok=false,t="",go=null;
    if(k==="sk"){var have=GS.sk[a[1]]||1,need=+a[2];ok=have>=need;t="Oyun seviyesi, "+(GM_TN[a[1]]||a[1])+": "+have.toFixed(1)+" / "+need.toFixed(1);go=["Oyuna git",function(){goTab("oyun")}]}
    else if(k==="at"){var kn=atlasKnown(),L=atlasList(a[1]),n=L.filter(function(i){return kn[atlasKey(a[1],i)]===2}).length,need2=+a[2];ok=n>=need2;t="Kavram Atlası, "+(GATE_AT[a[1]]||a[1])+": "+n+" / "+need2+" kavram 'anladım'";go=["Atlas'a git",function(){S.at.tr=a[1];S.at.g="";S.at.open=null;S.at.q="";S.les.view="atlas";goTab("ders")}]}
    else if(k==="pj"){var d=pathProj(a[1]);ok=!!d&&pathStats(d).done;t=(d?d.title.split(":")[0]:a[1])+" projesi bitmeli";go=["Projeye git",function(){goTab("proje");if(d)pjStart(d.id)}]}
    return {ok:ok,t:t,go:go};
  });
  return {ok:rows.every(function(r){return r.ok}),rows:rows};
}
function gateBox(G){
  return h("div",{class:"rs-b do"},h("small",null,"Bu aşama kilitli"),h("p",null,"Aşağıdakileri tamamlayınca açılır. Kilit, bu adımın dayandığı dersleri öğrenmeden ilerlemeyesin diye var."),
    G.rows.map(function(r){return h("div",{class:"cov-r"+(r.ok?" ok":"")},h("span",{class:"cov-c"},r.ok?"✓":""),h("span",null,r.t,r.ok||!r.go?null:h("div",{style:"margin-top:6px"},h("button",{class:"btn ghost",type:"button",onclick:r.go[1]},r.go[0]))))}),
    h("div",{class:"small mute"},"Oyun seviyesi ve Atlas ilerlemesi hesabına kaydedilir."));
}

/* cihazlar arası eşitleme: oyun/soru ilerlemesi, Atlas, seviye testi */
S._syncReady=false;S._syncLast="";S._syncT=null;
function syncOut(){return {gs:{sk:GS.sk,bx:GS.bx,st:GS.st,ts:GS.ts||""},atlas:atlasKnown(),pl:plLoad(),lc:lcLoad(),cd:gmCards(),gq:gqLoad(),gseen:gmSeen()?1:0,gk:{sk:S.gm.sk,ps:gmPS()},nt:ntSyncPack(),vd:vdPack(),fk:fkLoad(),nw:nwLoad(),rs:rsLoad(),lv:lvLoad()}}
function syncPush(){
  if(!S._syncReady||!S.db||!S.canWrite||S.guest)return;
  clearTimeout(S._syncT);
  S._syncT=setTimeout(function(){
    var o=syncOut(),str=JSON.stringify(o);if(str===S._syncLast)return;if(!Object.keys(o.gs.st).length&&!Object.keys(o.gs.bx).length&&!Object.keys(o.atlas).length&&!Object.keys(o.pl).length&&!Object.keys(o.lc||{}).length&&!Object.keys(o.cd||{}).length&&!Object.keys(o.gq||{}).length)return;
    if(str.length>400000)return;
    S._syncLast=str;o.ts=new Date().toISOString();
    S.db.doc("prefs/sync").set(o).then(function(){S._syncAt=new Date().toISOString();S._syncFail=false;S._syncRemoteN=Object.keys(o.gs.st).length;sched()}).catch(function(){S._syncLast="";S._syncFail=true;sched()});
  },1200);
}
function syncApply(r){
  var ch=false;
  try{
    if(r&&typeof r==="object"){
      if(r.rs&&rsApplyRemote(r.rs))ch=true;
      if(r.lv&&typeof r.lv==="object"){var lo=lvLoad(),lcg=false;LV_TR.forEach(function(t){var v=r.lv[t[0]];if(v&&(v.l|0)>=1&&(v.l|0)<=3&&String(v.d||"")>String((lo[t[0]]||{}).d||"")){lo[t[0]]={l:v.l|0,s:+v.s||0,m:+v.m||0,d:String(v.d).slice(0,10)};lcg=true}});if(lcg){try{localStorage.setItem(LV_KEY,JSON.stringify(lo))}catch(e){}ch=true}}
      var g=r.gs;
      if(g&&typeof g==="object"){
        if(g.st&&typeof g.st==="object")Object.keys(g.st).slice(0,800).forEach(function(k){
          var v=g.st[k];if(!(/^\d+$/.test(k)&&Array.isArray(v)&&v.length===2&&v[0]>=0&&v[1]>=v[0]&&v[1]<5000))return;
          var l=GS.st[k];if(!l||v[1]>l[1]||(v[1]===l[1]&&v[0]>l[0])){GS.st[k]=[v[0]|0,v[1]|0];ch=true}});
        if(g.bx&&typeof g.bx==="object"&&((g.ts&&String(g.ts)>(GS.ts||""))||!Object.keys(GS.bx).length)){
          Object.keys(g.bx).slice(0,400).forEach(function(k){
            var v=g.bx[k];if(/^\d+$/.test(k)&&typeof v==="number"&&v>=0&&v<=4&&GS.bx[k]!==v){GS.bx[k]=v;ch=true}});
          Object.keys(GS.bx).forEach(function(k){if(g.bx[k]===undefined&&g.ts&&String(g.ts)>(GS.ts||"")){delete GS.bx[k];ch=true}})}
        if(g.ts&&String(g.ts)>(GS.ts||"")&&g.sk&&typeof g.sk==="object"){
          TRKS.forEach(function(t){var v=g.sk[t];if(typeof v==="number"&&v>=1&&v<=3&&GS.sk[t]!==v){GS.sk[t]=v;ch=true}});
          GS.ts=String(g.ts)}
      }
      if(r.atlas&&typeof r.atlas==="object"){
        var a=atlasKnown(),ac=false;
        Object.keys(r.atlas).slice(0,600).forEach(function(k){if(!a[k]&&r.atlas[k]){a[k]=r.atlas[k];ac=true}});
        if(ac){try{localStorage.setItem("ya_atlas",JSON.stringify(a))}catch(e){}ch=true}
      }
      if(r.pl&&typeof r.pl==="object"){
        var p=plLoad(),pc=false;
        Object.keys(r.pl).slice(0,8).forEach(function(t){var v=r.pl[t];if(v&&typeof v==="object"&&typeof v.lv==="number"&&(!p[t]||String(v.d||"")>String(p[t].d||""))&&!(v.skip&&p[t]&&!p[t].skip)){p[t]={lv:v.lv,n:v.n|0,ok:v.ok|0,d:String(v.d||"").slice(0,10)};if(v.skip)p[t].skip=true;pc=true}});
        if(pc){try{localStorage.setItem(PL_KEY,JSON.stringify(p))}catch(e){}ch=true}
      }
      if(r.cd&&typeof r.cd==="object"){
        var cd=gmCards(),cdc=false;
        Object.keys(r.cd).slice(0,60).forEach(function(k){var v=r.cd[k];if(!v||typeof v!=="object"||!GM_FACTS[k])return;var l=cd[k]||(cd[k]={ok:0,n:0});
          var ok=Math.min(9999,v.ok|0),n=Math.min(99999,v.n|0);if(ok>l.ok){l.ok=ok;cdc=true}if(n>l.n){l.n=n;cdc=true}if(v.d&&(!l.d||String(v.d)<l.d)){l.d=String(v.d).slice(0,10);cdc=true}if(v.t&&(!l.t||v.t>l.t))l.t=v.t|0});
        if(cdc){try{localStorage.setItem(GM_CARD_KEY,JSON.stringify(cd))}catch(e){}ch=true}
      }
      if(r.gq&&typeof r.gq==="object"){
        var gqo=gqLoad(),gqc=false;
        Object.keys(r.gq).slice(0,300).forEach(function(k){var v=r.gq[k];if(!/^qb\d+$/.test(k)||!v||typeof v!=="object")return;var l=gqo[k];if(!l||(v.t||0)>(l.t||0)){gqo[k]={s:Math.max(0,Math.min(9,v.s|0)),due:String(v.due||"").slice(0,10),t:v.t|0};gqc=true}});
        if(gqc){try{localStorage.setItem(GQ_KEY,JSON.stringify(gqo))}catch(e){}ch=true}
      }
      if(r.gseen&&!gmSeen())gmSeen(1);
      if(r.fk&&typeof r.fk==="object"){
        var fo=fkLoad(),fc=false;Object.keys(r.fk).slice(0,80).forEach(function(k){if(!/^[a-z]+[A-Za-z]{0,12}$/.test(k))return;var v=Math.min(99999,r.fk[k]|0);if(v>num(fo[k])){fo[k]=v;fc=true}});
        if(fc){try{localStorage.setItem(FK_KEY,JSON.stringify(fo))}catch(e){}ch=true}
      }
      if(r.nw&&typeof r.nw==="object"){var no=nwLoad(),nc=false;Object.keys(r.nw).slice(0,60).forEach(function(k){if(!/^[a-z0-9]{1,12}$/.test(k))return;var v=Math.min(2,r.nw[k]|0);if(v>num(no[k])){no[k]=v;nc=true}});if(nc){nwSave(no);ch=true}}
      if(Array.isArray(r.vd)){
        var vo=vdLoad(),vk={},vc=false;vo.h.forEach(function(e){vk[e.k+"|"+e.t]=1});
        r.vd.slice(0,40).forEach(function(e){if(!e||!VD_SC.some(function(z){return z.id===e.k}))return;var t=+e.t||0;if(!t||vk[e.k+"|"+t])return;vo.h.push({k:e.k,d:String(e.d||"").slice(0,10),m:Math.max(0,Math.min(100,e.m|0)),r:Math.max(0,Math.min(4,e.r|0)),ok:e.ok?1:0,t:t});vc=true});
        if(vc){vo.h.sort(function(a,b){return a.t-b.t});try{localStorage.setItem(VD_KEY,JSON.stringify({h:vo.h.slice(-60)}))}catch(e){}ch=true}
      }
      if(r.nt&&typeof r.nt==="object"){
        var ntl=ntMine(),ntc=false;
        Object.keys(r.nt).slice(0,300).forEach(function(k){if(!/^[a-z]:[\w:\- ığüşöçİĞÜŞÖÇ]{1,60}$/i.test(k)||ntl[k]!==undefined)return;var v=r.nt[k];if(!Array.isArray(v))return;
          var a=v.filter(function(n){return n&&typeof n.t==="string"&&n.t.trim()}).slice(0,30).map(function(n){return {k:NT_KINDS.some(function(z){return z[0]===n.k})?n.k:"n",c:NT_PENS.indexOf(n.c)>=0?n.c:"pp",t:n.t.slice(0,600),d:String(n.d||"").slice(0,5)}});
          if(a.length){ntl[k]=a;ntc=true}});
        if(ntc){try{localStorage.setItem("ya_nt",JSON.stringify(ntl))}catch(e){}ch=true}
      }
      if(r.gk&&typeof r.gk==="object"){
        var gkc=false,pp=gmPS();
        if(r.gk.ps&&typeof r.gk.ps==="object")["tc","runs","kr","boss","S"].forEach(function(k){var v=Math.max(0,Math.min(99999,r.gk.ps[k]|0));if(v>pp[k]){pp[k]=v;gkc=true}});
        if(r.gk.sk&&typeof r.gk.sk==="object"&&!S.gm.skTouched)["run","drive"].forEach(function(k){var v=r.gk.sk[k];if(typeof v==="string"&&GM_SK[k].some(function(a){return a.id===v})&&S.gm.sk[k]!==v&&S.gm.sk[k]===GM_SK[k][0].id){S.gm.sk[k]=v;gkc=true}});
        if(gkc){try{localStorage.setItem("ya_gm",JSON.stringify({trk:S.gm.trk,mute:S.gm.mute,sk:S.gm.sk,ps:S.gm.ps}))}catch(e){}ch=true}
      }
      if(r.lc&&typeof r.lc==="object"){
        var lc=lcLoad(),lcc=false;
        Object.keys(r.lc).slice(0,400).forEach(function(k){var v=r.lc[k];if(!v||typeof v!=="object")return;["w","w-atla","r","q","p"].forEach(function(f){if(v[f]){lc[k]=lc[k]||{};if(!lc[k][f]){lc[k][f]=1;lc[k].d=String(v.d||"").slice(0,10);lcc=true}}})});
        if(lcc){try{localStorage.setItem(LC_KEY,JSON.stringify(lc))}catch(e){}ch=true}
      }
    }
  }catch(e){}
  if(ch){try{localStorage.setItem("ya_gs",JSON.stringify(GS))}catch(e){}}
  S._syncReady=true;S._syncRemoteN=(r&&r.gs&&r.gs.st)?Object.keys(r.gs.st).length:0;
  if(r){var o=syncOut(),cp=JSON.parse(JSON.stringify(r));delete cp.ts;S._syncLast=JSON.stringify(cp)}
  syncPush();
  if(ch)sched();
}

/* yeni kullanıcı karşılama akışı */
S.onb=null;S.onbLoaded=false;S.ob={step:0,goal:"",hrs:5,lvl:false};
var OB_GOALS=[["ccna","CCNA ve ağ","Switch, IP, VLAN: ağ yöneticisi ve destek rolleri","ccna","sup"],
 ["net","Network","OSI, IP, alt ağlar, kablolar, ağ cihazları: Network+ temeli","net","sup"],
 ["qa","Test Uzmanı (QA)","Test tasarımı, hata raporu, otomasyon: ISTQB CTFL temeli","qa","qa"],
 ["bk","Backend ve .NET","API, veritabanı, Git: yazılım geliştirme temeli","bk","bk"],
 ["dev","DevOps","Linux, Git, CI/CD, Docker, Kubernetes: KCNA temeli","dev","bk"],
 ["sec","Siber güvenlik","Güvenlik kavramları, Security+ temeli","sec","sec"],
 ["eng","İş İngilizcesi","Destek talepleri, e-posta ve mülakat İngilizcesi","eng","sup"]];
function onbNeeded(){return !!(S.nonOwner&&!S.guest&&S.onbLoaded&&!(S.onb&&(S.onb.done||S.onb.skip)))}
function onbApply(o){
  if(!o||!o.goal)return;
  var g=OB_GOALS.filter(function(x){return x[0]===o.goal})[0];if(!g)return;
  S.les.track=g[3];S.pl.track=g[3];S.pr.track=g[3];if(STARTER[g[3]])S.cls.track=g[3];
  if(JR.some(function(r){return r.id===g[4]}))S.jr.role=g[4];
  if(o.hrs===3||o.hrs===5||o.hrs===8)S.plan.hrs=o.hrs;
}
function onbSave(patch,lvl){
  var o={goal:S.ob.goal,hrs:S.ob.hrs,ts:new Date().toISOString()};for(var k in patch)o[k]=patch[k];
  S.onb=o;onbApply(o);
  var og=OB_GOALS.filter(function(x){return x[0]===o.goal})[0],ot=og?og[3]:o.goal;
  if(!lvl&&ot){var pl=plLoad();if(!pl[ot]){pl[ot]={lv:1,n:0,ok:0,d:today(),skip:true};plSave(pl)}}
  if(S.db&&S.canWrite)S.db.doc("prefs/onb").set(o).catch(function(){});
  if(lvl){S.pl.track=ot||S.pl.track;plStart()}else draw();
  goTab("bugun");
  if(lvl)plFocus();
}
function renderOnboarding(){
  var O=S.ob,st=O.step,out=[];
  var dots=h("div",{class:"row",style:"gap:6px","aria-label":"Adım "+(st+1)+" / 3"},[0,1,2].map(function(i){return h("span",{class:"pill"+(i<=st?" ok":"")},String(i+1))}));
  if(st===0){
    out.push(h("div",{class:"panel welcome"},h("div",{class:"label"},"Hoş geldin"),h("h2",null,"Önce hedefini seçelim"),dots,
      h("div",{class:"small mute"},"Üç kısa soru: hedef, haftalık süre, seviye. Sonra sana göre ders, soru ve plan hazırlanır. Her şey sadece senin hesabında kalır."),
      h("div",{style:"display:grid;gap:8px"},OB_GOALS.map(function(g){
        return h("button",{class:"btn"+(O.goal===g[0]?"":" ghost"),type:"button","aria-pressed":O.goal===g[0]?"true":"false",style:"text-align:left;white-space:normal",onclick:function(){O.goal=g[0];O.step=1;draw()}},h("b",null,g[1]),h("div",{class:"small",style:"font-weight:400"},g[2]))})),
      h("div",{class:"row"},h("button",{class:"btn ghost",type:"button",onclick:function(){S.onb={skip:true};if(S.db&&S.canWrite)S.db.doc("prefs/onb").set({skip:true,ts:new Date().toISOString()}).catch(function(){});draw()}},"Şimdilik geç"))));
  }else if(st===1){
    out.push(h("div",{class:"panel welcome"},h("div",{class:"label"},"Hoş geldin"),h("h2",null,"Haftada kaç saat ayırabilirsin?"),dots,
      h("div",{class:"small mute"},"Gerçekçi ol. Az ama düzenli, çok ama kesik kesikten iyidir. Sonra Atölye'deki Haftalık plan buna göre bitiş tarihi hesaplar."),
      h("div",{style:"display:grid;gap:8px"},[[3,"3 saat","Yoğun dönem: haftada 3-4 kısa oturum"],[5,"5 saat","Dengeli: hemen her gün 40-45 dakika"],[8,"8 saat","Hızlı: günde 1 saat ve hafta sonu uzun çalışma"]].map(function(x){
        return h("button",{class:"btn"+(O.hrs===x[0]?"":" ghost"),type:"button","aria-pressed":O.hrs===x[0]?"true":"false",style:"text-align:left;white-space:normal",onclick:function(){O.hrs=x[0];S.pf.pace=x[0]===3?"rahat":x[0]===8?"hizli":"normal";savePf();O.step=2;draw()}},h("b",null,x[1]),h("div",{class:"small",style:"font-weight:400"},x[2]))})),
      h("div",{class:"row"},h("button",{class:"btn ghost",type:"button",onclick:function(){O.step=0;draw()}},"Geri"))));
  }else{
    var g=OB_GOALS.filter(function(x){return x[0]===O.goal})[0]||OB_GOALS[0];
    out.push(h("div",{class:"panel welcome"},h("div",{class:"label"},"Hoş geldin"),h("h2",null,"Seviyeni ölçelim mi?"),dots,
      h("div",{class:"small mute"},"Hedefin: "+g[1]+" · haftada "+O.hrs+" saat. 6 soruluk kısa bir test seviyeni belirler, yanlışın seni cezalandırmaz. İstersen sıfırdan başla; sonra Bugün ekranından da yapabilirsin."),
      h("div",{style:"display:grid;gap:8px"},
        h("button",{class:"btn",type:"button",onclick:function(){onbSave({goal:O.goal,hrs:O.hrs,done:true},true)}},"Seviye testini yap (5 dakika)"),
        h("button",{class:"btn ghost",type:"button",onclick:function(){onbSave({goal:O.goal,hrs:O.hrs,done:true},false)}},"Sıfırdan başlıyorum")),
      h("div",{class:"row"},h("button",{class:"btn ghost",type:"button",onclick:function(){O.step=1;draw()}},"Geri"))));
  }
  return out;
}

/* eşitleme durumu */
S._syncAt="";S._syncRemoteN=null;S._syncFail=false;
function syncRows(){
  var dev=Object.keys(GS.st).length,rem=S._syncRemoteN,rows=[],ok;
  ok=!!S.db&&S.canWrite&&!S.guest;
  rows.push(["Kayıt izni",ok?"var":"yok (salt okunur)",ok]);
  var hasData=dev>0||Object.keys(atlasKnown()).length>0;
  var syncOk=!hasData||(rem!==null&&rem>=dev&&!S._syncFail);
  rows.push(["Soru ilerlemesi",dev+" soru bu cihazda"+(rem===null?" · hesap bilgisi bekleniyor":" · hesapta "+rem),syncOk]);
  rows.push(["Günlük kayıtlar",S.progress.length+" gün hesapta",true]);
  var cvn=S.cv&&S.cv.name;rows.push(["CV",cvn?"kayıtlı: "+cvn:"henüz boş",true]);
  var st=0;try{st=gmStreak()}catch(e){}rows.push(["Oyun serisi",st+" gün",true]);
  var wk=null;try{wk=gmWeek()}catch(e){}rows.push(["Haftalık sayaç",wk?wk.days+" gün · Patron "+(wk.boss?"yenildi":"bekliyor"):"–",true]);
  var me=null;try{me=myLeague()}catch(e){}rows.push(["Lig kaydı",me?"katıldın":"henüz katılmadın",true]);
  return rows;
}
function syncAgo(){if(!S._syncAt)return "bu oturumda yazma olmadı";var m=Math.round((Date.now()-new Date(S._syncAt).getTime())/60000);return m<1?"az önce":m+" dk önce"}
function syncPanel(){
  var rows=syncRows(),bad=rows.filter(function(r){return !r[2]}).length;
  return h("div",{class:"panel"},h("div",{class:"label"},"Cihazlar arası"),h("h2",null,bad?"Eşitleme: bir şey bekliyor":"Eşitleme: tamam"),
    h("div",{class:"small mute"},"Başka cihazda açtığında aşağıdakiler aynı gelmeli. Son yazma: "+syncAgo()+". Eksik görürsen önce aşağıdaki düğmeye bas, sonra diğer cihazda sayfayı yenile."),
    rows.map(function(r){return h("div",{style:"display:flex;justify-content:space-between;gap:10px;padding:6px 0;border-top:1px solid var(--line)"},h("span",null,r[0]),h("span",{class:"small "+(r[2]?"mute":"")},(r[2]?"✓ ":"! ")+r[1]))}),
    h("div",{class:"row"},h("button",{class:"btn",type:"button",disabled:!S.db||!S.canWrite||S.guest,onclick:function(){S._syncLast="";syncPush();setTimeout(sched,1600)}},"Şimdi eşitle")));
}
function syncLine(){
  var bad=syncRows().filter(function(r){return !r[2]}).length;
  return h("div",{class:"small mute",style:"text-align:center"},(bad?"! Eşitleme bekliyor · ":"✓ Eşitlendi · ")+"son yazma "+syncAgo()+" · ",h("button",{class:"btn ghost",type:"button",style:"padding:2px 8px",onclick:function(){goTab("ayar")}},"ayrıntı"));
}

/* zayıf konulardan mülakat */
S.wm={busy:false,qs:[],i:0,ans:"",fb:null,err:"",res:[],fbBusy:false};S.mock=[];
function wmWeak(){
  var a=[];Object.keys(GS.st).forEach(function(k){var q=QB[+k],s=GS.st[k];if(!q||!s||!s[1])return;var acc=s[0]/s[1];if(acc<.7||GS.bx[k]===0)a.push([+k,acc,s[1]])});
  a.sort(function(x,y){return x[1]-y[1]||y[2]-x[2]});return a.slice(0,8).map(function(x){return QB[x[0]]});
}
function wmGen(){
  var W=S.wm,weak=wmWeak();if(W.busy||!weak.length)return;
  W.err="";W.i=0;W.ans="";W.fb=null;W.res=[];
  W.qs=weak.slice(0,5).map(function(q){var cor=q.o[q.a];return {q:"Mülakatçı soruyor: "+q.q,look:"Doğru çekirdek: "+cor,model:cor+". "+(q.w||""),core:cor}});
  draw();
}
function wmJudge(){
  var W=S.wm,q=W.qs[W.i];if(W.fbBusy||!q||W.ans.trim().length<10||!window.PPLocal)return;
  var g=PPLocal.grade(W.ans,q.model,[q.core]);
  var gotCore=PPLocal.coverage(W.ans,[q.core]).hit.length>0,sc=g.score;if(!gotCore)sc=Math.min(sc,5);
  W.fb={score:sc,good:g.hit.length?"Yakaladığın kavramlar: "+g.hit.slice(0,5).join(", ")+".":"Anahtar kavramlardan henüz biri geçmedi.",
    fix:g.miss.length?"Örnek cevapta geçen ama seninkinde olmayan: "+g.miss.slice(0,4).join(", ")+". Örnek cevabı aç ve kendi cümlenle yeniden yaz.":"Anahtar kavramların hepsi var. Örnek cevapla karşılaştır."};
  W.res.push({q:q.q.slice(0,120),score:sc,t:q.core});draw();
}
function wmNext(){
  var W=S.wm;
  if(W.i+1<W.qs.length){W.i++;W.ans="";W.fb=null;draw();return}
  var avg=W.res.length?W.res.reduce(function(a,x){return a+x.score},0)/W.res.length:0;
  var row={d:today(),n:W.res.length,avg:Math.round(avg*10)/10};
  S.mock=(S.mock||[]).concat([row]).slice(-30);
  if(S.db&&S.canWrite&&!S.guest)S.db.doc("prefs/mock").set({rows:S.mock,ts:new Date().toISOString()}).catch(function(){});
  W.done=row;W.qs=[];draw();
}
function wmPanel(){
  var W=S.wm,weak=wmWeak(),out=[];
  var head=h("div",{class:"label"},"Zayıf konulardan mülakat");
  if(W.done){
    var d=W.done;return h("div",{class:"panel"},head,h("h2",null,"Tur bitti: ortalama "+d.avg+" / 10"),
      h("div",{class:"small mute"},d.avg>=7?"İyi gidiyor. Aynı konular bir gün sonra tekrar sorulursa daha da oturur.":"Zorlandığın kavramlar Alıştırma'daki 'Bunu tekrar sor' listesinde. Önce onları çalış, sonra tekrar dene."),
      S.wm.res.map(function(r){return h("div",{style:"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--line);padding:6px 0"},h("span",{class:"small"},r.q),h("b",{class:"mono"},r.score+"/10"))}),
      h("div",{class:"row"},h("button",{class:"btn",type:"button",onclick:function(){W.done=null;W.res=[];draw()}},"Tamam")));
  }
  if(W.qs.length){
    var q=W.qs[W.i];
    return h("div",{class:"panel ivq"},head,h("div",{class:"small mute"},"Soru "+(W.i+1)+" / "+W.qs.length),h("b",{class:"qq"},q.q),
      h("textarea",{rows:5,"aria-label":"Cevabın",placeholder:"3-5 cümleyle anlat. Sesli prova yaptıysan ana hatlarını yaz.",value:W.ans,style:"width:100%",oninput:function(e){W.ans=e.target.value}}),
      W.fb?h("div",{class:"fb"+(W.fb.score>=6?"":" bad")},h("b",null,W.fb.score+" / 10. "),W.fb.good,h("div",{class:"small",style:"margin-top:6px"},"Geliştir: "+W.fb.fix),h("details",null,h("summary",{class:"small"},"Örnek cevap"),h("p",{class:"small"},q.model))):null,
      W.err?h("div",{class:"fb bad"},W.err):null,
      h("div",{class:"row"},W.fb?h("button",{class:"btn",type:"button",onclick:wmNext},W.i+1<W.qs.length?"Sonraki":"Bitir"):h("button",{class:"btn",type:"button",onclick:wmJudge},"Cevabımı karşılaştır"),
        h("button",{class:"btn ghost",type:"button",onclick:function(){W.qs=[];W.fb=null;draw()}},"Çık")));
  }
  return h("div",{class:"panel"},head,h("h2",null,"Takıldığın sorulardan mülakat"),
    weak.length?h("div",{class:"small mute"},"Alıştırma ve oyunda zorlandığın "+weak.length+" konudan 5 mülakat sorusu hazırlanır. Cevabını yazarsın; kod anahtar kavramları örnek cevapla kıyaslar. Kesin hüküm değil, yönlendirmedir."):
      h("div",{class:"small mute"},"Henüz zayıf konu çıkmadı. Alıştırma ya da Oyun'da birkaç soru çöz; takıldıkların burada mülakat sorusuna dönüşür."),
    weak.length?h("div",{class:"small mute"},"Örnek: "+weak.slice(0,2).map(function(q){return q.q.slice(0,60)}).join(" · ")):null,
    W.err?h("div",{class:"fb bad"},W.err):null,
    S.mock&&S.mock.length?h("div",{class:"small mute"},"Son turlar: "+S.mock.slice(-4).map(function(x){return x.d.slice(5)+" "+x.avg}).join(" · ")):null,
    h("div",{class:"row"},h("button",{class:"btn",type:"button",disabled:!weak.length,onclick:wmGen},"5 soru hazırla")));
}

/* kanıt cüzdanı */
var EV_TN={py:["Python","Python"],js:["JavaScript","JavaScript"],ccna:["Ağ (CCNA)","Networking (CCNA)"],eng:["İş İngilizcesi","Workplace English"],sec:["Siber güvenlik","Cybersecurity"],bk:["Backend / yazılım","Backend / software"],net:["Ağ (Network+)","Networking (Network+)"],dev:["DevOps","DevOps"],qa:["Yazılım testi","Software testing"]};
function evSolid(t){var M=mastLevels()[t];return M?M[2]+M[3]:0}
function evLines(en){
  var M=mastLevels(),out=[],PL=plLoad();
  TRK_LIST.forEach(function(o){var m=M[o[0]];if(!m||m[2]+m[3]<3)return;var nm=EV_TN[o[0]][en?1:0];
    out.push(en?(nm+": "+(m[2]+m[3])+" of "+m[4]+" practised questions at proficient level"):(nm+": çözdüğü "+m[4]+" sorudan "+(m[2]+m[3])+" tanesinde yeterli düzey"))});
  Object.keys(PL).forEach(function(t){var v=PL[t];if(!v||typeof v.lv!=="number"||!(v.n>=3)||!EV_TN[t])return;
    out.push(en?(EV_TN[t][1]+" placement test: "+v.lv.toFixed(1)+" / 3 ("+v.ok+"/"+v.n+" correct)"):(EV_TN[t][0]+" seviye testi: "+v.lv.toFixed(1)+" / 3 ("+v.n+" sorudan "+v.ok+" doğru)"))});
  if(S.mock&&S.mock.length){var l=S.mock[S.mock.length-1];out.push(en?("Mock interviews: "+S.mock.length+" rounds, latest average "+l.avg+" / 10"):("Mülakat provası: "+S.mock.length+" tur, son ortalama "+l.avg+" / 10"))}
  return out;
}
function evBonus(R){var b=0;(R.tr||[]).forEach(function(t){b+=Math.min(4,evSolid(t)/3)});return Math.round(Math.min(8,b))}
function evPanel(R){
  var L=evLines(false),gaps=(R.tr||[]).filter(function(t){return evSolid(t)<3}).map(function(t){return EV_TN[t][0]});
  return h("div",{class:"panel"},h("div",{class:"label"},"Kanıt cüzdanı"),h("h2",null,L.length?"Kanıtların ("+L.length+")":"Henüz kanıt yok"),
    h("div",{class:"small mute"},"Çözdüğün sorulardan, seviye testlerinden ve mülakat provalarından otomatik toplanır. CV'ne 'Öğrenme kanıtları' bölümü olarak eklenir ve ilan eşleşmesine en çok +"+evBonus(R)+" puan katar. Sadece senin cevaplarından hesaplanır; sertifika yerine geçmez."),
    L.length?h("ul",{style:"margin:0;padding-left:20px"},L.map(function(x){return h("li",{class:"small"},x)})):h("div",{class:"small"},"Alıştırma > Karışık turda ve Oyun'da soru çöz; bir alanda en az 3 soruda 'Yeterli' düzeye ulaşınca burada görünür."),
    gaps.length?h("div",{class:"lbox warn"},h("div",{class:"label"},"Bu rol için eksik kanıt"),h("p",{class:"small"},gaps.join(", ")+" alanında henüz yeterli kanıt yok. Alıştırma'daki Karışık tura ve Mülakat'taki zayıf konu provasına bak.")):null,
    h("div",{class:"row"},h("button",{class:"btn ghost",type:"button",onclick:function(){S.at2.sec="cv";draw()}},"CV'de gör"),h("button",{class:"btn ghost",type:"button",onclick:function(){goTab("mul")}},"Mülakat provası")));
}

/* ===== rota haritası, durak XP, kapılar, tema ===== */
var RT_BONUS=20;

"use strict";
/* ---- v49: Meydan oku (bilgisayara ve arkadaşa karşı düello) ---- */
var DU_N=8,DU_LIM=15,DZ_KEY="ya_dz";
var DU_DIFF={k:{n:"Kolay",bot:"Çaylak Bot",ini:"Ç",p:.5,t:[5,12],dd:1,xp:4,r:900,c:"#2fe08a"},o:{n:"Orta",bot:"Kıdemli Bot",ini:"K",p:.72,t:[3.5,9],dd:2,xp:8,r:1100,c:"#ffc233"},z:{n:"Zor",bot:"Usta Bot",ini:"U",p:.9,t:[2.2,6],dd:3,xp:14,r:1300,c:"#ff5d7d"}};
var DU_TR=[["all","Karışık"]].concat(trkSorulu());
S.du={run:null,trk:"all",fdd:2,to:"*",msg:"",iv:null};
function dzLocal(){try{var o=JSON.parse(localStorage.getItem(DZ_KEY)||"null");return o&&typeof o==="object"?o:{}}catch(e){return {}}}
function dzNorm(o){o=o||{};return {r:num(o.r)||1000,w:num(o.w),l:num(o.l),d:num(o.d),st:num(o.st),cpu:(o.cpu&&typeof o.cpu==="object")?o.cpu:{},ch:(o.ch&&typeof o.ch==="object")?o.ch:{},re:(o.re&&typeof o.re==="object")?o.re:{},set:(o.set&&typeof o.set==="object")?o.set:{}}}
function dzGet(){var m=myLeague(),a=dzNorm(m&&m.dz),b=dzNorm(dzLocal());function g(x){return x.w+x.l+x.d+Object.keys(x.ch).length+Object.keys(x.re).length}return g(a)>=g(b)?a:b}
function dzCanShare(){return !!(S.db&&S.me&&S.canWrite&&!S.guest&&S.lgLoaded)}
function dzSave(D){try{localStorage.setItem(DZ_KEY,JSON.stringify(D))}catch(e){}if(dzCanShare())saveMe({dz:D})}
function duRatingOf(uid){var x=S.league.filter(function(q){return q.id===uid})[0];return x&&x.dz?(num(x.dz.r)||1000):1000}
function duTitle(r){return r>=1400?"Şampiyon":r>=1250?"Efsane":r>=1100?"Usta":r>=1000?"Rakip":"Çaylak"}
function duQs(seed,trk,dd){
  var r=rngf(seed),pool=[];QB.forEach(function(q,i){if(q.t!=="_"&&(trk==="all"||q.t===trk))pool.push(i)});   /* "_" = sunucuya ayrılan sınav sorusunun yer tutucusu */
  var okd=dd===1?[1]:dd===2?[1,2]:[2,3],f=pool.filter(function(i){return okd.indexOf(QB[i].d)>=0});if(f.length<DU_N+2)f=pool;if(f.length<DU_N)return [];
  return shuf(f,r).slice(0,DU_N).map(function(i){return gmQB(i,r,false)});
}
function duBot(seed,qs,k){var D=DU_DIFF[k],r=rngf(seed*31+7);return qs.map(function(q){var it=QB[+String(q.k).slice(2)],d=it?it.d:1,ok=r()<Math.max(.2,D.p-.05*(d-1)),sec=D.t[0]+r()*(D.t[1]-D.t[0]);return [ok?1:0,Math.round(sec*10)/10]})}
function duPts(ok,sec){return ok?100+Math.max(0,Math.round((DU_LIM-Math.min(sec,DU_LIM))/DU_LIM*50)):0}
function duExit(){var U=S.du;clearInterval(U.iv);U.run=null;draw();window.scrollTo(0,0)}
function duStart(c){
  var U=S.du,seed,trk=c.trk||"all",dd=c.dd||2,opp=null,oname="",orat=1000;
  if(c.mode==="reply"){seed=c.e.seed;trk=c.e.trk;dd=c.e.dd;opp=Array.isArray(c.e.rs)?c.e.rs:null;oname=nameOf(c.from);orat=duRatingOf(c.from)}
  else if(c.mode==="cpu"){seed=Math.floor(Math.random()*1e9);dd=DU_DIFF[c.k].dd;oname=DU_DIFF[c.k].bot;orat=DU_DIFF[c.k].r}
  else{seed=Math.floor(Math.random()*1e9);oname=c.to==="*"?"Herkese açık":nameOf(c.to)}
  var qs=duQs(seed,trk,dd);if(qs.length<DU_N){U.msg="Bu konuda yeterli soru yok, başka bir konu seç.";draw();return}
  if(c.mode==="cpu")opp=duBot(seed,qs,c.k);
  U.msg="";U.run={mode:c.mode,k:c.k,seed:seed,trk:trk,dd:dd,qs:qs,i:0,sc:0,osc:0,rs:[],os:opp,ph:"ask",pick:-1,t0:Date.now(),oname:oname,orat:orat,from:c.from,id:c.id||null,to:c.to||"*",res:null};
  duTimer();draw();window.scrollTo(0,0);
}
function duTimer(){
  var U=S.du;clearInterval(U.iv);
  U.iv=setInterval(function(){var R=U.run;if(!R||R.ph!=="ask"){clearInterval(U.iv);return}
    var el=(Date.now()-R.t0)/1000,b=document.getElementById("du-bar"),t=document.getElementById("du-t");
    if(b)b.style.width=Math.max(0,(1-el/DU_LIM)*100)+"%";if(t)t.textContent=String(Math.max(0,Math.ceil(DU_LIM-el)));
    if(el>=DU_LIM)duAnswer(-1)},100);
}
function duAnswer(i){
  var R=S.du.run;if(!R||R.ph!=="ask")return;
  var q=R.qs[R.i],sec=Math.min(DU_LIM,(Date.now()-R.t0)/1000),ok=i===q.a;
  R.pick=i;R.rs.push([ok?1:0,Math.round(sec*10)/10]);R.sc+=duPts(ok,sec);
  var o=R.os&&R.os[R.i];if(o)R.osc+=duPts(o[0]===1,o[1]);
  try{gqMark([[q.k,ok]])}catch(e){}
  try{var nm_=gmClass(q);if(GM_FACTS[nm_]){var C_=gmCards(),c_=C_[nm_]||(C_[nm_]={ok:0,n:0});c_.n++;if(ok){c_.ok++;if(gmCardLv(c_.ok)===1&&!c_.d)c_.d=today()}c_.t=Date.now();gmCardSave(C_)}}catch(e){}
  R.ph="rev";clearInterval(S.du.iv);gmBeep(ok?660:220,.15);draw();
}
function duNext(){var R=S.du.run;if(!R)return;R.i++;if(R.i>=R.qs.length){duFinish();return}R.ph="ask";R.pick=-1;R.t0=Date.now();duTimer();draw()}
function duElo(r,or,res){var E=1/(1+Math.pow(10,(or-r)/400)),Sx=res==="w"?1:res==="d"?.5:0;return Math.round(r+24*(Sx-E))}
function duFinish(){
  var R=S.du.run;if(!R||R.ph==="end")return;R.ph="end";clearInterval(S.du.iv);
  var D=dzGet(),res=R.os?(R.sc>R.osc?"w":R.sc<R.osc?"l":"d"):null;R.res=res;
  if(res){var nr=duElo(D.r,R.orat,res);R.dr=nr-D.r;D.r=nr;D[res]++;if(res==="w")D.st++;else D.st=0}
  if(R.mode==="cpu"){
    if(res==="w")D.cpu[R.k]=(D.cpu[R.k]||0)+1;
    var P=prog(),wins=num(P.du_w);R.xp=0;
    if(res==="w"){if(wins<3){var room=Math.max(0,GM_CAP-num(P.g_xp)),xp=Math.min(DU_DIFF[R.k].xp,room);R.xp=xp;setProg({du_w:wins+1,g_xp:num(P.g_xp)+xp})}else R.capped=true}
  }else if(R.mode==="reply"){
    R.id=R.id||"";D.re[R.id]={from:R.from,sc:R.sc,rs:R.rs,ts:new Date().toISOString()};D.set[R.id]=1;
    var ks=Object.keys(D.re).sort(function(a,b){return String(D.re[b].ts).localeCompare(String(D.re[a].ts))});ks.slice(20).forEach(function(k){delete D.re[k]});
  }else if(R.mode==="send"){
    var id=Date.now().toString(36)+Math.floor(Math.random()*1296).toString(36);R.id=id;
    D.ch[id]={to:R.to,trk:R.trk,dd:R.dd,seed:R.seed,sc:R.sc,rs:R.rs,ts:new Date().toISOString()};
    var k2=Object.keys(D.ch).sort(function(a,b){return String(D.ch[b].ts).localeCompare(String(D.ch[a].ts))});k2.slice(12).forEach(function(k){delete D.ch[k]});
  }
  dzSave(D);draw();
}
function duFindReply(id){
  for(var i=0;i<S.league.length;i++){var x=S.league[i];if(x.id===S.me)continue;var re=x.dz&&x.dz.re&&x.dz.re[id];if(re&&re.from===S.me)return {uid:x.id,e:re}}return null;
}
function duSettle(){
  if(!S.lgLoaded||!S.me||S.du._st)return;
  var D=dzGet(),ch=false;
  Object.keys(D.ch).forEach(function(id){if(D.set[id])return;var e=D.ch[id],rp=duFindReply(id);if(!rp)return;
    var res=e.sc>rp.e.sc?"w":e.sc<rp.e.sc?"l":"d";D.r=duElo(D.r,duRatingOf(rp.uid),res);D[res]++;if(res==="w")D.st++;else D.st=0;D.set[id]=1;ch=true});
  if(ch){S.du._st=true;dzSave(D);setTimeout(function(){S.du._st=false},1500)}
}
function duIncoming(){
  var D=dzGet(),out=[],now=Date.now();
  S.league.forEach(function(x){if(x.id===S.me||!x.dz||!x.dz.ch)return;
    Object.keys(x.dz.ch).forEach(function(id){var e=x.dz.ch[id];if(!e||(e.to!==S.me&&e.to!=="*"))return;if(D.re[id])return;
      var t=Date.parse(e.ts||"")||0;if(now-t>14*864e5)return;out.push({id:id,uid:x.id,e:e,t:t})})});
  return out.sort(function(a,b){return b.t-a.t});
}
function duTrkName(t){for(var i=0;i<DU_TR.length;i++)if(DU_TR[i][0]===t)return DU_TR[i][1];return "Karışık"}
function duBoard(){
  var rows=S.league.filter(function(x){return x.dz&&(num(x.dz.w)+num(x.dz.l)+num(x.dz.d))>0&&x.id!==S.me}).map(function(x){return {id:x.id,r:num(x.dz.r)||1000,w:num(x.dz.w),l:num(x.dz.l),d:num(x.dz.d)}});
  var D=dzGet();if(D.w+D.l+D.d>0)rows.push({id:S.me||"me",r:D.r,w:D.w,l:D.l,d:D.d,me:true});
  return rows.sort(function(a,b){return b.r-a.r}).slice(0,8);
}
function duLobby(){
  duSettle();
  var U=S.du,D=dzGet(),out=[],canF=dzCanShare(),inc=canF?duIncoming():[];
  function chips(list,cur,fn){return h("div",{class:"ar-row"},list.map(function(o){return h("button",{type:"button",class:"ar-chip","aria-pressed":cur===o[0]?"true":"false",onclick:function(){fn(o[0])}},o[1])}))}
  out.push(h("div",{class:"arena"},h("span",{class:"ar-tag"},"ARENA"),h("h2",{class:"ar-h"},"Meydan oku!"),
    h("div",{class:"ar-sub"},"Bilgisayara ya da arkadaşına karşı yarış. Her turda "+DU_N+" soru, "+DU_LIM+" saniye. Doğru cevap 100 puan, hızlı cevap +50 bonus."),
    h("div",{class:"ar-stats"},[[D.r,"reyting"],[D.w+"-"+D.l+"-"+D.d,"G-M-B"],[D.st,"galibiyet serisi"],[duTitle(D.r),"unvan"]].map(function(a){return h("div",{class:"ar-st"},h("b",null,String(a[0])),h("small",null,a[1]))}))));
  out.push(h("div",{class:"ar-sec"},h("h3",null,"Bilgisayara karşı"),h("div",{class:"sub"},"Konu seç, rakibini seç. Zor botu yenmek gerçekten zor; her gün ilk 3 galibiyet XP verir."),
    chips(DU_TR,U.trk,function(v){U.trk=v;draw()}),
    h("div",{class:"ar-bots"},["k","o","z"].map(function(k){var b=DU_DIFF[k],beat=num(D.cpu[k]);
      return h("button",{type:"button",class:"ar-bot",style:"--bc:"+b.c,"aria-label":b.bot+", "+b.n+", reyting "+b.r,onclick:function(){duStart({mode:"cpu",k:k,trk:U.trk})}},
        h("span",{class:"av"},b.ini),h("b",null,b.n),h("small",null,b.bot),h("small",null,"reyting "+b.r+" · +"+b.xp+" XP"),h("small",null,beat?"✓ "+beat+" kez yenildi":"yenilmedi"))})),
    U.msg?h("div",{class:"sub",style:"color:#ffd0d8"},U.msg):null));
  var friends=S.league.filter(function(x){return x.id!==S.me});
  out.push(h("div",{class:"ar-sec"},h("h3",null,"Arkadaşa meydan oku"),
    !canF?h("div",{class:"sub"},S.guest?"Bu görünümde yazma izni yok, arkadaş düellosu kapalı. Bilgisayara karşı oynayabilirsin.":"Arkadaş düellosu için hesabına bağlan; Lig açıldığında burada belirir."):[
      h("div",{class:"sub"},"Sen önce oynarsın, aynı sorular arkadaşına gider. Arkadaşın oynayınca kazanan belli olur ve ikinizin reytingi değişir. Arkadaşın Lig'e katılmış olmalı."),
      h("div",{class:"sub"},"Kime?"),
      h("div",{class:"ar-row"},[["*","Herkese açık"]].concat(friends.map(function(x){return [x.id,nameOf(x.id)]})).slice(0,9).map(function(o){return h("button",{type:"button",class:"ar-chip","aria-pressed":U.to===o[0]?"true":"false",onclick:function(){U.to=o[0];draw()}},o[1])})),
      h("div",{class:"sub"},"Konu"),chips(DU_TR,U.trk,function(v){U.trk=v;draw()}),
      h("div",{class:"sub"},"Zorluk"),chips([[1,"Kolay"],[2,"Orta"],[3,"Zor"]],U.fdd,function(v){U.fdd=v;draw()}),
      h("div",{class:"ar-row"},h("button",{type:"button",class:"ar-btn",onclick:function(){duStart({mode:"send",to:U.to,trk:U.trk,dd:U.fdd})}},"Meydan oku, ilk ben oynarım"))]));
  if(inc.length)out.push(h("div",{class:"ar-sec"},h("h3",null,"Seni bekleyen meydan okumalar ",h("span",{class:"ar-tag",style:"transform:none"},String(inc.length))),
    h("div",{class:"ar-list"},inc.slice(0,5).map(function(x){return h("div",{class:"ar-item"},h("div",null,h("b",null,nameOf(x.uid)),h("div",{class:"sub"},duTrkName(x.e.trk)+" · "+["","kolay","orta","zor"][x.e.dd||2]+" · skoru oynayınca görürsün")),
      h("button",{type:"button",class:"ar-btn",onclick:function(){duStart({mode:"reply",id:x.id,from:x.uid,e:x.e})}},"Kabul et"))}))));
  var hist=[];
  Object.keys(D.ch).forEach(function(id){var e=D.ch[id],rp=duFindReply(id);hist.push({t:Date.parse(e.ts||"")||0,tx:"Meydan okuman ("+(e.to==="*"?"herkese açık":nameOf(e.to))+")",st:rp?(e.sc>rp.e.sc?"Kazandın":e.sc<rp.e.sc?"Kaybettin":"Berabere")+" "+e.sc+"–"+rp.e.sc+" · "+nameOf(rp.uid):"Henüz cevaplanmadı · "+e.sc+" puanın bekliyor"})});
  Object.keys(D.re).forEach(function(id){var e=D.re[id],c=null,u=S.league.filter(function(x){return x.id===e.from})[0];if(u&&u.dz&&u.dz.ch)c=u.dz.ch[id];
    hist.push({t:Date.parse(e.ts||"")||0,tx:nameOf(e.from)+" seni çağırmıştı",st:c?(e.sc>c.sc?"Kazandın":e.sc<c.sc?"Kaybettin":"Berabere")+" "+e.sc+"–"+c.sc:"Oynadın · "+e.sc+" puan"})});
  hist.sort(function(a,b){return b.t-a.t});
  if(hist.length)out.push(h("div",{class:"ar-sec"},h("h3",null,"Düello geçmişi"),h("div",{class:"ar-list"},hist.slice(0,6).map(function(x){return h("div",{class:"ar-item"},h("div",null,h("b",null,x.tx),h("div",{class:"sub"},x.st)))}))));
  var bd=duBoard();
  if(bd.length>1)out.push(h("div",{class:"ar-sec"},h("h3",null,"Düello sıralaması"),h("div",{class:"ar-list"},bd.map(function(x,i){
    return h("div",{class:"ar-item"+(x.me?" me":"")},h("div",null,h("b",null,(["🥇","🥈","🥉"][i]||String(i+1)+".")+" "+(x.me?"Sen":nameOf(x.id))),h("div",{class:"sub"},duTitle(x.r)+" · "+x.w+"G "+x.l+"M "+x.d+"B")),h("b",{class:"mono"},String(x.r)))}))));
  return out;
}
function renderDuel(){
  var R=S.du.run,q=R.qs[R.i],out=[];
  var me=MYN()||"Sen",oi=(R.oname||"?").charAt(0).toUpperCase();
  function marks(arr,cmp){return h("div",{class:"du-dots","aria-hidden":"true"},R.qs.map(function(_,i){var a=arr&&arr[i];return h("i",{class:a?(a[0]?"ok":"bad"):(i===R.i&&R.ph!=="end"?"cur":"")})}))}
  out.push(h("div",{class:"arena"},
    h("div",{class:"ar-row",style:"justify-content:space-between"},h("span",{class:"ar-tag"},R.mode==="cpu"?"VS "+DU_DIFF[R.k].bot.toLocaleUpperCase("tr"):R.mode==="reply"?"MEYDAN OKUMA":"MEYDAN OKU"),h("button",{type:"button",class:"ar-chip",onclick:duExit},"Vazgeç")),
    h("div",{class:"du-top"},
      h("div",{class:"du-p"},h("div",{class:"du-av"},me.charAt(0).toUpperCase()),h("b",null,me),h("span",{class:"du-sc"},String(R.sc))),
      h("div",{class:"du-vs"},R.ph==="end"?"VS":"VS",h("small",null,(Math.min(R.i+(R.ph==="end"?0:1),R.qs.length))+"/"+R.qs.length)),
      h("div",{class:"du-p opp"},h("div",{class:"du-av o"},oi),h("b",null,R.oname||"Rakip"),h("span",{class:"du-sc"},R.os?String(R.osc):"?"))),
    h("div",{class:"du-dd"},marks(R.rs),R.os?marks(R.os.slice(0,R.rs.length)):null)));
  if(R.ph==="end"){
    var res=R.res,title=R.mode==="send"?"Meydan okuma gönderildi":res==="w"?"ZAFER!":res==="l"?"Yenildin":"Berabere";
    out.push(h("div",{class:"arena"},h("h2",{class:"ar-h"},title),
      h("div",{class:"ar-stats"},[[R.sc,"senin puanın"],[R.os?R.osc:"—","rakip"],[R.rs.filter(function(a){return a[0]}).length+"/"+R.qs.length,"doğru"],[R.dr!=null?(R.dr>=0?"+":"")+R.dr:"—","reyting"]].map(function(a){return h("div",{class:"ar-st"},h("b",null,String(a[0])),h("small",null,a[1]))})),
      R.mode==="send"?h("div",{class:"ar-sub"},"Aynı "+R.qs.length+" soru "+(R.to==="*"?"Lig'teki herkese açık":nameOf(R.to)+" adlı arkadaşına")+" gitti. O oynayınca sonuç bu ekrandaki geçmişte belirir ve reytingin güncellenir."):null,
      R.mode==="cpu"?h("div",{class:"ar-sub"},R.xp?"Galibiyet ödülü: +"+R.xp+" XP":R.capped?"Bugünkü 3 ödüllü galibiyet doldu; reyting yine işliyor.":res==="w"?"XP günlük sınıra ulaştı.":"Bir dahaki sefere!"):null,
      R.mode==="reply"?h("div",{class:"ar-sub"},"Sonuç ikinizin hesabına yazıldı."):null,
      h("div",{class:"ar-row"},R.mode==="cpu"?h("button",{type:"button",class:"ar-btn",onclick:function(){duStart({mode:"cpu",k:R.k,trk:R.trk})}},"Rövanş"):null,h("button",{type:"button",class:"ar-chip",onclick:duExit},"Arenaya dön"))));
    var wr=R.qs.map(function(qq,i){var a=R.rs[i];return a&&!a[0]?qq:null}).filter(Boolean);
    if(wr.length)out.push(h("div",{class:"panel"},h("h3",null,"Doğrusu şuydu"),wr.map(function(qq){return h("div",{class:"lbox"},h("p",{style:"margin:0 0 4px;font-weight:600"},qq.q),h("p",{style:"margin:0"},"Doğru: "+qq.o[qq.a]),qq.w?h("p",{class:"small mute",style:"margin:4px 0 0"},qq.w):null)})));
    return out;
  }
  var rev=R.ph==="rev",o=R.os&&R.os[R.i],a=R.rs[R.i];
  out.push(h("div",{class:"arena du-card"},
    !rev?h("div",{class:"du-tm"},h("div",{class:"du-tb"},h("i",{id:"du-bar",style:"width:"+Math.max(0,(1-(Date.now()-R.t0)/1000/DU_LIM)*100)+"%"})),h("b",{id:"du-t",class:"mono"},String(DU_LIM))):null,
    h("div",{class:"du-q"},q.q),
    h("div",{class:"du-os"},q.o.map(function(t,i){var cls="du-o"+(rev?(i===q.a?" ok":i===R.pick?" bad":""):"");
      return h("button",{type:"button",class:cls,disabled:rev,onclick:function(){duAnswer(i)}},h("span",{class:"du-l"},String.fromCharCode(65+i)),h("span",null,t))})),
    rev?h("div",{class:"du-fb"},
      h("div",null,h("b",null,(a[0]?"Doğru":"Yanlış")+" · +"+duPts(a[0]===1,a[1])+" puan"),h("span",{class:"mono"}," ("+a[1]+" sn)")),
      o?h("div",null,h("b",null,R.oname+": "+(o[0]?"doğru":"yanlış")+" · +"+duPts(o[0]===1,o[1])+" puan"),h("span",{class:"mono"}," ("+o[1]+" sn)")):h("div",{class:"ar-sub"},"Rakibin cevabı, oynayınca burada görünecek."),
      q.w?h("div",{class:"ar-sub"},q.w):null,
      GM_FACTS[gmClass(q)]?h("div",{class:"ar-sub",style:"color:#ffe14d"},"Kural · "+gmClass(q)+": "+GM_FACTS[gmClass(q)].k):null,
      h("button",{type:"button",class:"ar-btn",onclick:duNext},R.i+1>=R.qs.length?"Sonucu gör":"Sonraki soru")):null));
  return out;
}
function renderGame(){
  var G=S.gm,R=G.run;
  if(S.du.run)return renderDuel();
  if(R){
    if(!G.stage)G.stage=gmStage(R);
    var out=[];
    if(R.over){out.push(gmResults(R))}
    else{out.push(G.stage);gmOverlay(R);gmHud(R);if(R.state==="play"&&!R.loopOn){R.last=0;gmLoop(R)}}
    return out;
  }
  var wk=gmWeek(),dn=gmDay(today()),mq=gmBuild("daily").length;
  var modes=[["daily","Günün koşusu","12 kapı · yaklaşık 4 dk","Kaçırdığın sorular, son derslerin kelimeleri ve Atlas'tan sorular. Her gün aynı set, herkes için adil."],["boss","Haftalık Patron","20 kapı · yaklaşık 7 dk","Haftanın en zor seti, 4 patron kapısı çift puan. Haftada bir kez yen."],["free","Akıllı tur","12 kapı · XP yok · seviyene göre","Soruları senin seviyene göre seçer: yeni, zorlandığın ve tekrar zamanı gelen sorular öne çıkar. Doğru bildikçe seviyen yükselir."],["en","İş İngilizcesi hattı","12 kapı · yaklaşık 5 dk","E-posta, toplantı, destek masası ve müşteri cümleleri. Her kapıda gerçek bir ofis durumu."],["sonsuz","Sonsuz sefer","Can bitene kadar · kademe atlar","Sorular kolay başlar, her 8 doğruda zorlaşır; 5 doğruda bir can kazanırsın. XP ilk 16 doğruya kadar, sonrası rekor için."]];
  var skin=h("div",{class:"seg",role:"group","aria-label":"Oyun türü"},[["run","Koşucu"],["drive","Sürücü"]].map(function(o){return h("button",{type:"button","aria-pressed":G.skin===o[0]?"true":"false",onclick:function(){G.skin=o[0];draw()}},o[1])}));
  var trk=h("div",{class:"seg",role:"group","aria-label":"Konu"},GM_TRK.map(function(o){return h("button",{type:"button","aria-pressed":G.trk===o[0]?"true":"false",onclick:function(){G.trk=o[0];gmSave();draw()}},o[1])}));
  var snd=h("div",{class:"seg",role:"group","aria-label":"Ses"},[[false,"Açık"],[true,"Kapalı"]].map(function(o){return h("button",{type:"button","aria-pressed":G.mute===o[0]?"true":"false",onclick:function(){G.mute=o[0];gmSave();draw()}},o[1])}));
  var cur=G.speed||(S.pf.pace==="rahat"?.72:S.pf.pace==="hizli"?1.25:1);
  var spd=h("div",{class:"seg",role:"group","aria-label":"Hız"},[[.72,"Rahat"],[1,"Normal"],[1.25,"Hızlı"]].map(function(o){return h("button",{type:"button","aria-pressed":cur===o[0]?"true":"false",onclick:function(){G.speed=o[0];draw()}},o[1])}));
  var old=[h("div",{class:"ar-strip"},h("span",null,"ARCADE"),h("small",null,"Koş, sür, kapılarda soru çöz")),
    h("div",{class:"panel"},h("div",{class:"label"},"Oyun alanı"),h("h2",null,"Ağ Koşusu ve Ağ Sürüşü"),
      h("div",{class:"small mute"},"Üç şeritli yolda koş ya da sür. Kapılarda soru çıkar, doğru cevabın şeridine geç. Öğrendiklerin oyunun yakıtı: kaçırdığın sorular tekrar karşına çıkar."),
      h("div",{class:"gm-opt"},h("b",null,"Konu"),trk),h("div",{class:"gm-opt"},h("b",null,"Tür"),skin),h("div",{class:"gm-opt"},h("b",null,"Hız"),spd),h("div",{class:"gm-opt"},h("b",null,"Ses ve titreşim"),snd)),
    h("div",{class:"panel"},h("div",{class:"label"},"Seviyen ve oyun serisi"),h("div",{class:"gm-lv"},TRKS.map(function(t){var v=GS.sk[t],pc=Math.round((v-1)/2*100);return h("div",{class:"gm-l"},h("span",null,GM_TN[t]),h("span",{class:"xpbar"},h("i",{style:"width:"+Math.max(4,pc)+"%"})),h("small",{class:"mute"},v<1.7?"Başlangıç":v<2.35?"Orta":"İleri"))})),h("div",{class:"small mute"},"Oyun serisi: "+gmStreak()+" gün. Seviye hesabına kaydedilir ve Akıllı turu belirler.")),
    h("div",{class:"panel"},h("div",{class:"label"},"Bugünün görevleri"),h("div",{class:"gm-ms"},gmMissions(dn).map(function(m){var ok=m.have>=m.need;return h("div",{class:"gm-m"+(ok?" ok":"")},h("span",{class:"cov-c"},ok?"✓":""),h("span",null,m.t,h("small",{class:"mute"}," · "+Math.min(m.have,m.need)+"/"+m.need)))})),h("div",{class:"small mute"},"Her görev +5 XP. Haftalık sandık: 4 gün oyna ve Patron'u yen, +20 XP"+(wk.dates.some(function(d){return gmDay(d).g_chest})?" (bu hafta açıldı).":"."))),
    h("div",{class:"gm-modes"},modes.map(function(m){
      var done=m[0]==="daily"?num(dn.g_runs)>0:m[0]==="boss"?wk.boss:false;
      return h("div",{class:"panel gm-mode"},h("div",{style:"display:flex;justify-content:space-between;gap:8px;align-items:center"},h("h3",null,m[1]),done?h("span",{class:"pill ok"},"tamam"):h("span",{class:"pill"},m[2])),
        h("div",{class:"small mute"},m[3]),h("button",{class:"btn big",type:"button",disabled:mq<4,onclick:function(){gmStart(m[0])}},"Oyna"))})),
    h("div",{class:"panel"},h("div",{class:"label"},"Bu hafta"),h("h2",null,wk.champ?"Haftalık Şampiyon":"Haftalık zincir"),
      h("div",{class:"gm-week"},wk.dates.map(function(d,i){var p=gmDay(d),on=num(p.g_runs)>0;return h("div",{class:"gm-d"+(on?" on":"")+(d===today()?" now":"")},h("span",null,["Pzt","Sal","Çar","Per","Cum","Cmt","Paz"][i]),h("i",null,on?"✓":""))})),
      h("div",{class:"gm-grid"},[["Oynanan gün",wk.days+" / 7"],["Patron",wk.boss?"yenildi":"bekliyor"],["En iyi skor",wk.best],["Doğruluk",wk.tot?Math.round(wk.ok/wk.tot*100)+"%":"—"]].map(function(a){return h("div",{class:"kcell"},h("small",{class:"mute"},a[0]),h("b",{class:"mono"},String(a[1])))})),
      h("div",{class:"small mute"},"Hedef: haftada en az 4 gün oyna ve Patron'u yen. Günlük oyun XP'si en çok "+GM_CAP+".")),
    h("div",{class:"panel"},h("h3",null,"Nasıl oynanır?"),h("ol",{class:"lsteps"},[h("li",null,"Başla'ya bas. Yol akmaya başlar."),h("li",null,"Yolda engellerden kaç: parmağını sağa ya da sola kaydır, ya da Sol/Sağ düğmeleri. Koşucuda yukarı kaydırarak zıpla."),h("li",null,"Kapıya yaklaşınca yol durur, soru ekranı kaplar. Süre yok: cevabına dokun ya da ← ↑ → tuşlarına bas (A sol, B orta, C sağ)."),h("li",null,"Koşucu seçtiğin şeritten kapıdan geçer. Doğruysa puan, yanlışsa can kaybedersin. 3 canın var."),h("li",null,"Bitince yanlış cevaplarının doğrusunu görürsün; kaçırdıkların ertesi gün tekrar gelir.")]))
  ];
  return gameHub(old,modes,mq);
}

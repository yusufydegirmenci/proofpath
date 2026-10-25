"use strict";
/* ---- v32: kalite döngüsü, seri koruma, 5 dakika, haftalık özet, işe hazırlık ---- */
S.qf={};
function qbFlag(q){
  var m=/^qb(\d+)$/.exec(q&&q.k||"");if(!m||S.qf[q.k])return;var it=QB[+m[1]];if(!it)return;
  S.qf[q.k]=1;
  if(S.db&&S.canWrite&&!S.guest)S.db.collection("flags").add({date:today(),kind:"qb",track:it.t,idx:+m[1],q:it.q,options:it.o,correct:it.a,explanation:it.w||"",ts:new Date().toISOString()}).catch(function(){});
  draw();
}
function qbFlagBtn(q){
  if(!q||!/^qb\d+$/.test(q.k||""))return null;
  return S.qf[q.k]?h("span",{class:"small mute"},"Bildirildi, teşekkürler."):h("button",{class:"btn ghost",type:"button",onclick:function(){qbFlag(q)}},"Hata var");
}
function qstPack(){
  var a=Object.keys(GS.st).filter(function(k){return GS.st[k][1]>=3}).sort(function(x,y){return GS.st[x][0]/GS.st[x][1]-GS.st[y][0]/GS.st[y][1]}).slice(0,60),o={};
  a.forEach(function(k){o[k]=GS.st[k]});return o;
}
/* seri koruma */
function jokerOffer(){
  if(S.guest||!S.db||!S.canWrite)return null;
  var st=streakInfo(),L=loggedDates(),J=S.profile.jokerDates||[],y=addDays(today(),-1),y2=addDays(today(),-2);
  if(L[y]||J.indexOf(y)>=0||st.jokersLeft<1)return null;
  if(!(L[y2]||J.indexOf(y2)>=0))return null;
  return y;
}
function jokerUse(y){
  var arr=(S.profile.jokerDates||[]).concat([y]).slice(-30);S.profile.jokerDates=arr;
  S.db.doc("profile/main").update({jokerDates:arr}).catch(function(){S.db.doc("profile/main").set(Object.assign({},S.profile,{jokerDates:arr})).catch(function(){})});
  draw();
}
function jokerCard(){
  var y=jokerOffer();if(!y)return null;
  return h("div",{class:"alert warn"},h("b",null,"Dün kaçtı. "),"Haftalık 1 seri dondurma hakkın var; kullanırsan serin kopmaz. ",h("button",{class:"btn",type:"button",onclick:function(){jokerUse(y)}},"Dünü koru"));
}
/* 5 dakika */
var M5_AT={ccna:"ccna",net:"net",eng:"en",sec:"sec",bk:"bk",dev:"dev",qa:"qa",py:"py"};
S.m5={on:false,step:0,qs:[],ans:null,ok:0,fin:false,track:"ccna",c:null};
function m5Start(){
  var M=S.m5,r=rngf(Date.now()%1e9),pool=[];
  QB.forEach(function(q,i){if(q.t===M.track&&q.d<=2)pool.push(i)});
  if(pool.length<3){QB.forEach(function(q,i){if(q.t===M.track&&pool.indexOf(i)<0)pool.push(i)})}
  var idx=shuf(pool,r).slice(0,3),L=atlasList(M5_AT[M.track]||"sw");
  M.c=L.length?L[(dayNum(today())+Math.floor(r()*L.length))%L.length]:null;
  M.qs=idx.map(function(i){var q=gmQB(i,r);q.i=i;return q});
  M.on=true;M.step=M.c?0:1;M.ans=null;M.ok=0;M.fin=false;draw();
}
function m5Pick(c){
  var M=S.m5,q=M.qs[M.step-1];if(M.ans!==null||!q)return;M.ans=c;if(c===q.a)M.ok++;gsAnswer(q.k,c===q.a);draw();
}
function m5Next(){
  var M=S.m5;
  if(M.step===0){M.step=1;draw();return}
  if(M.step<M.qs.length){M.step++;M.ans=null;draw();return}
  setProg({mini5:num(prog().mini5)+1});
  if(S.db&&S.me&&S.canWrite&&!S.guest)saveMe({qst:qstPack()});
  M.fin=true;M.step=99;draw();
}
function m5Panel(){
  var M=S.m5,done=num(prog().mini5)>0;
  if(!M.on){
    var seg=h("div",{class:"seg",role:"group","aria-label":"Alan"},trkSorulu().map(function(o){return h("button",{type:"button","aria-pressed":M.track===o[0]?"true":"false",onclick:function(){M.track=o[0];draw()}},o[1])}));
    return h("div",{class:"panel"},h("div",{style:"display:flex;justify-content:space-between;gap:8px;align-items:center;flex-wrap:wrap"},h("div",null,h("div",{class:"label"},"Yorgun musun?"),h("h2",null,"Sadece 5 dakika")),done?h("span",{class:"pill ok"},"bugün tamam"):null),
      h("div",{class:"small mute"},"1 kavram ve 3 soru. Bitirirsen bugün seri için sayılır."),seg,h("div",{class:"row"},h("button",{class:"btn",type:"button",onclick:m5Start},done?"Bir tur daha":"5 dakikayı başlat")));
  }
  if(M.fin)return h("div",{class:"panel"},h("div",{class:"label"},"5 dakika"),h("h2",null,M.ok+" / "+M.qs.length+" doğru. Bugün tamam."),h("div",{class:"small mute"},"Küçük adım da seriyi taşır. Güçlüysen Oyun'a geç."),h("div",{class:"row"},h("button",{class:"btn",type:"button",onclick:function(){M.on=false;draw()}},"Kapat"),h("button",{class:"btn ghost",type:"button",onclick:function(){M.on=false;goTab("oyun")}},"Oyuna geç")));
  if(M.step===0&&M.c)return h("div",{class:"panel"},h("div",{class:"label"},"1 / "+(M.qs.length+1)+" · Kavram"),h("h2",null,M.c.t),h("p",{style:"margin:0 0 6px;font-weight:600"},M.c.tr),h("div",{class:"small"},M.c.d),M.c.b?h("div",{class:"lbox"},h("p",{style:"margin:0"},M.c.b)):null,h("div",{class:"row"},h("button",{class:"btn",type:"button",onclick:m5Next},"Sorulara geç")));
  var q=M.qs[M.step-1];
  return h("div",{class:"panel"},h("div",{class:"label"},"Soru "+M.step+" / "+M.qs.length),h("h2",{style:"font-size:17px"},q.q),
    h("div",{class:"lsn"},q.o.map(function(o,i){if(!o)return null;var cls="opt"+(M.ans!==null?(i===q.a?" good":(i===M.ans?" bad":"")):"");return h("button",{type:"button",class:cls,disabled:M.ans!==null,onclick:function(){m5Pick(i)}},String.fromCharCode(65+i)+". "+o)})),
    M.ans!==null?h("div",{class:"fb"+(M.ans===q.a?"":" bad")},h("b",null,M.ans===q.a?"Doğru. ":"Doğrusu "+String.fromCharCode(65+q.a)+". "),q.w):null,
    M.ans!==null?h("div",{class:"row"},h("button",{class:"btn",type:"button",onclick:m5Next},M.step<M.qs.length?"Sonraki":"Bitir"),qbFlagBtn(q)):null);
}
/* v35 seviye testi */
var PL_KEY="ya_pl";
S.pl={on:false,track:"ccna",qs:[],step:0,ans:null,ok:[],fin:false,msg:""};
function plLoad(){try{var o=JSON.parse(localStorage.getItem(PL_KEY)||"null");return o&&typeof o==="object"?o:{}}catch(e){return {}}}
function plSave(o){try{localStorage.setItem(PL_KEY,JSON.stringify(o))}catch(e){}syncPush()}
function plStart(){
  var P=S.pl,r=rngf(Date.now()%1e9),pick=[];
  [1,2,3].forEach(function(d){
    var pool=[];QB.forEach(function(q,i){if(q.t===P.track&&q.d===d)pool.push(i)});
    shuf(pool,r).slice(0,2).forEach(function(i){pick.push(i)});
  });
  if(pick.length<3){P.msg="Bu alanda yeterli soru yok.";draw();return}
  P.qs=pick.map(function(i){var q=gmQB(i,r);q.i=i;q.d=QB[i].d;return q});
  P.on=true;P.step=1;P.ans=null;P.ok=[];P.fin=false;P.msg="";draw();
}
function plPick(c){
  var P=S.pl,q=P.qs[P.step-1];if(P.ans!==null||!q)return;
  P.ans=c;P.ok.push(c===q.a?1:0);gsAnswer(q.k,c===q.a);draw();
}
function plLevel(P){
  return PP.ogr.ustalik.yerlestirmeDuzeyi(P.qs,P.ok);
}
function plNext(){
  var P=S.pl;
  if(P.step<P.qs.length){P.step++;P.ans=null;draw();return}
  var lv=plLevel(P);GS.sk[P.track]=lv;gsSave();
  var o=plLoad();o[P.track]={lv:lv,n:P.qs.length,ok:P.ok.reduce(function(a,b){return a+b},0),d:today()};plSave(o);
  P.fin=true;P.step=99;draw();
}
function plBand(lv){
  var b=PP.ogr.ustalik.yerlestirmeBandi(lv);
  return b===0?["Sıfırdan başla","Önce Atölye > Atlas > Başlangıç kartlarını oku, sonra Başlangıç yolunun ilk projesini yap. Her gün 5 dakika yeter."]
    :b===1?["Temel var, boşlukları kapat","Akıllı turda oyna; yanlış yaptıkların otomatik tekrar gelir. Yol projesinde 2. aşamaya geç."]
    :["İleri başlangıç","Zor sorulara ağırlık ver, yol projesini GitHub'a yükle ve İşe hazırlık sekmesinden CV'ni çıkar."];
}
function plShare(track,lv){
  var nm=(GM_TN[track]||track),t=PP_MARKA.ad+" seviye testi: "+nm+" "+lv.toFixed(1)+" / 3."+(ARTIFACT_URL?" Sen de dene: "+ARTIFACT_URL:"");
  try{navigator.clipboard.writeText(t).then(function(){S.pl.msg="Kopyalandı.";draw()},function(){S.pl.msg=t;draw()})}catch(e){S.pl.msg=t;draw()}
}
function plFocus(){plOdak();setTimeout(plOdak,150);setTimeout(plOdak,500)}
function plOdak(){if(!S.pl.on)return;var el=document.getElementById("pp-seviye");if(!el||el.contains(document.activeElement))return;try{el.scrollIntoView({behavior:"smooth",block:"start"})}catch(e){el.scrollIntoView()}var hd=el.querySelector("h2");if(hd){hd.setAttribute("tabindex","-1");try{hd.focus({preventScroll:true})}catch(e){hd.focus()}}}
function plPanel(){var el=plPanelIc();if(el&&el.setAttribute)el.setAttribute("id","pp-seviye");return el}
function plPanelIc(){
  var P=S.pl,saved=plLoad(),has=Object.keys(saved).some(function(k){return saved[k]&&!saved[k].skip});
  if(!P.on){
    var seg=h("div",{class:"seg",role:"group","aria-label":"Alan"},trkSorulu().map(function(o){return h("button",{type:"button","aria-pressed":P.track===o[0]?"true":"false",onclick:function(){P.track=o[0];P.msg="";draw()}},o[1])}));
    var rows=has?TRK_LIST.filter(function(o){return saved[o[0]]&&!saved[o[0]].skip}).map(function(o){var s=saved[o[0]];return h("span",{class:"pill"},o[1]+" "+s.lv.toFixed(1)+"/3")}):[];
    return h("div",{class:"panel"},h("div",{class:"label"},has?"Seviyen":"Yeni misin?"),h("h2",null,has?"Seviye testini tekrarla":"Seviyeni belirle"),
      h("div",{class:"small mute"},"6 kısa soru. Sonuca göre nereden başlayacağını söylerim; bilmediğin soruda tahmin etmen yeter."),
      rows.length?h("div",{class:"row"},rows):null,seg,
      h("div",{class:"row"},h("button",{class:"btn",type:"button",onclick:plStart},"Testi başlat")),
      P.msg?h("div",{class:"small mute"},P.msg):null);
  }
  if(P.fin){
    var lv=plLevel(P),b=plBand(lv),n=P.ok.reduce(function(a,c){return a+c},0);
    return h("div",{class:"panel"},h("div",{class:"label"},"Sonuç · "+(GM_TN[P.track]||P.track)),h("h2",null,b[0]),
      h("div",{class:"small"},n+" / "+P.qs.length+" doğru · seviye "+lv.toFixed(1)+" / 3"),
      h("div",{class:"lbox"},h("p",{style:"margin:0"},b[1])),
      h("div",{class:"row"},h("button",{class:"btn",type:"button",onclick:function(){P.on=false;goTab(S.nonOwner?"ders":"atolye")}},S.nonOwner?"Derse başla":"Atölyeye git"),
        h("button",{class:"btn ghost",type:"button",onclick:function(){plShare(P.track,lv)}},"Sonucu kopyala"),
        h("button",{class:"btn ghost",type:"button",onclick:function(){P.on=false;P.msg="";draw()}},"Kapat")),
      P.msg?h("div",{class:"small mute"},P.msg):null);
  }
  var q=P.qs[P.step-1];
  return h("div",{class:"panel"},h("div",{class:"label"},"Seviye testi · "+P.step+" / "+P.qs.length),h("h2",{style:"font-size:17px"},q.q),
    h("div",{class:"lsn"},q.o.map(function(o,i){if(!o)return null;var cls="opt"+(P.ans!==null?(i===q.a?" good":(i===P.ans?" bad":"")):"");return h("button",{type:"button",class:cls,disabled:P.ans!==null,onclick:function(){plPick(i)}},String.fromCharCode(65+i)+". "+o)})),
    P.ans!==null?h("div",{class:"fb"+(P.ans===q.a?"":" bad")},h("b",null,P.ans===q.a?"Doğru. ":"Doğrusu "+String.fromCharCode(65+q.a)+". "),q.w):null,
    P.ans!==null?h("div",{class:"row"},h("button",{class:"btn",type:"button",onclick:plNext},P.step<P.qs.length?"Sonraki":"Sonucu gör")):null);
}

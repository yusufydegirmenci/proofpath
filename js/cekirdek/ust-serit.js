"use strict";
/* ---- üst şerit ---- */
function skyline(){
  var G=goalTrack(),C=topicsOf(G),E=G==="eng"?[]:topicsOf("eng"),items=[];
  C.forEach(function(t){items.push({t:t,k:G})});
  if(C.length&&E.length)items.push({gap:true});
  E.forEach(function(t){items.push({t:t,k:"eng"})});
  if(!C.length&&!E.length)for(var z=0;z<26;z++)items.push({t:{status:"locked",mastery:0},k:G});
  var step=13,W=items.length*step+8,H=120,g=sv("g",null),i=0,x=4;
  var svg=sv("svg",{class:"skyline-svg",viewBox:"0 0 "+W+" "+H,preserveAspectRatio:"xMidYMax meet","aria-hidden":"true"});
  items.forEach(function(it,idx){
    if(it.gap){x+=step;return}
    var t=it.t,m=Math.round(num(t.mastery)),a=daysAgo(t.lastReview),locked=t.status==="locked",nxt=t.status==="next";
    var rust=(t.status==="built"||t.status==="building")&&m>0&&a!=null&&a>7;
    var bh=(it.k==="eng"?34:40)+((idx*53)%7)*(it.k==="eng"?7:9);
    var y=H-bh,w=11,cols=2,rows=Math.max(2,Math.floor((bh-8)/6)),tot=rows*cols,lit=locked?0:Math.round(m/100*tot);
    var grp=sv("g",{class:lit?"glowg":""});
    grp.append(sv("rect",{x:x,y:y,width:w,height:bh,rx:1.5,fill:"var(--bld2)",opacity:locked?.32:1}));
    if(!locked){
      for(var r=0;r<rows;r++)for(var c=0;c<cols;c++){
        var n=r*cols+c,isLit=n<lit;/* alttan yukarı: satır 0 en altta */
        var wy=y+bh-6-r*6;
        if(wy<y+3)continue;
        grp.append(sv("rect",{x:x+2+c*4.5,y:wy,width:3,height:3.4,rx:.6,class:"win"+(isLit?" lit "+(rust?"rust":it.k):"")}));
      }
    }
    if(t.status==="built")grp.append(sv("line",{x1:x+w/2,x2:x+w/2,y1:y,y2:y-5,stroke:"var(--mute)","stroke-width":.8}));
    if(nxt)grp.append(sv("circle",{cx:x+w/2,cy:y-3,r:2,class:"beacon"+(it.k==="eng"?" eng":"")}));
    svg.append(grp);x+=step;
  });
  svg.append(sv("rect",{x:0,y:H-1.5,width:W,height:1.5,fill:"var(--bld)"}));
  return svg;
}
function ringBig(pct,gate){
  var r=44,c=2*Math.PI*r,v=Math.max(0,Math.min(100,pct))/100;
  return sv("svg",{viewBox:"0 0 104 104","aria-hidden":"true"},
    sv("circle",{cx:52,cy:52,r:r,fill:"none",stroke:"color-mix(in srgb,var(--ink) 14%,transparent)","stroke-width":8}),
    sv("circle",{cx:52,cy:52,r:r,fill:"none",stroke:gate?"var(--warn)":"var(--net)","stroke-width":8,"stroke-linecap":"round","stroke-dasharray":(c*v)+" "+c,transform:"rotate(-90 52 52)"}));
}
function countUp(el,to){
  var from=S._xpShown==null?to:S._xpShown;S._xpShown=to;
  if(from===to||window.matchMedia&&window.matchMedia("(prefers-reduced-motion:reduce)").matches){el.textContent=to;return}
  var t0=performance.now(),d=Math.min(900,300+Math.abs(to-from)*3);
  (function f(t){var k=Math.min(1,(t-t0)/d),e=1-Math.pow(1-k,3);el.textContent=Math.round(from+(to-from)*e);if(k<1)requestAnimationFrame(f)})(t0);
}
function greeting(){
  var hr=new Date().getHours();
  return hr>=5&&hr<11?"Günaydın":hr>=11&&hr<17?"İyi günler":hr>=17&&hr<22?"İyi akşamlar":"İyi geceler";
}
function heroMessage(st,rust){
  var hr=new Date().getHours();
  if(st.loggedToday)return "Bugün kayıtlı, seri "+st.n+" gün. Fazlası bonus: Sınıf'ta bir tur daha çöz.";
  if(st.n>0)return st.n+" günlük serin duruyor. Bugünü ekle, "+(st.n+1)+". gün olsun."+(rust?" "+rust+" bina pas tutuyor, bir tekrar yeter.":"");
  if(rust)return rust+" bina pas tutuyor. Bir tekrar turu hepsini parlatır.";
  return hr>=22||hr<5?"Geç oldu; 20 dakikalık bir tur bile şehre ışık yakar.":"Şehir henüz sessiz. İlk ışığı bugün yak: 20 dakika yeter.";
}
var FLAME="M12 2c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z";
function mi(d,col){return sv("svg",{viewBox:"0 0 24 24",fill:col||"none",stroke:col?"none":"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true"},sv("path",{d:d,fill:col||"none"}))}
function teaserChip(){
  var ds=districtsOf(goalTrack()),nx=ds.filter(function(d){return d.state==="next"})[0],ac=ds.filter(function(d){return d.state==="active"})[0];
  if(!nx)return null;
  return h("button",{class:"hchip teaser",type:"button",title:"Sıradaki semt, ilerledikçe açılır",onclick:function(){goTab("sehir")}},mi("M3 11l9-8 9 8v9H3z"),"Sıradaki semt: ",maskName(nx.name,ac?ac.avg:0));
}
function crest(){
  return sv("svg",{viewBox:"0 0 40 46",class:"crest","aria-hidden":"true"},
    sv("path",{d:"M20 2 36 8v14c0 11-7 19-16 22C11 41 4 33 4 22V8z",fill:"color-mix(in srgb,var(--gold) 14%,transparent)",stroke:"var(--gold)","stroke-width":2.2,"stroke-linejoin":"round"}),
    sv("path",{d:"M20 15 12.5 28M20 15 27.5 28M12.5 28h15",stroke:"var(--gold)","stroke-width":1.4,fill:"none"}),
    sv("circle",{cx:20,cy:15,r:2.8,fill:"var(--gold)"}),sv("circle",{cx:12.5,cy:28,r:2.8,fill:"var(--net)"}),sv("circle",{cx:27.5,cy:28,r:2.8,fill:"var(--eng)"}));
}
function termWeek(){
  var ds=S.days.map(function(d){return d.date}).filter(Boolean).sort();
  var st=ds.length?ds[0]:"2026-10-07",n=Math.max(0,Math.floor((parse(today())-parse(st))/864e5/7))+1;
  return "Dönem 1 · Hafta "+n;
}
function academyBar(){
  return h("div",{class:"abar"},crest(),
    h("div",{class:"awm"},h("b",null,PP_MARKA.buyuk),h("span",null,brandLine())),
    h("div",{class:"ameta mono"},termWeek()));
}
function karne(){
  var G=goalTrack(),C=topicsOf(G),E=G==="eng"?[]:topicsOf("eng"),wk=weekInfo();
  var cb=C.filter(PP.ogr.ilerleme.konuTamam).length,eb=E.filter(PP.ogr.ilerleme.konuTamam).length;
  var cn=C.length||27,en=E.length||13,wp=wk.tDays?Math.min(100,wk.days/wk.tDays*100):0;
  var cells=[[trName(G),cb+"/"+cn,G==="eng"?"basamak oturdu":"bina tamam",cb/cn*100,G==="eng"?"var(--eng)":"var(--net)"]].concat(G==="eng"?[]:[["İngilizce",eb+"/"+en,"basamak oturdu",eb/en*100,"var(--eng)"]]).concat([["Bu hafta",wk.days+(wk.tDays?"/"+wk.tDays:""),"çalışılan gün",wp,"var(--gold)"]]);
  return h("div",{class:"karne",role:"group","aria-label":"Dönem karnesi"},cells.map(function(c){
    return h("div",{class:"kcell"},h("div",{class:"kl"},c[0]),h("div",{class:"kv mono"},c[1]),h("div",{class:"ks"},c[2]),h("div",{class:"kb"},h("i",{style:"width:"+Math.max(3,c[3])+"%;background:"+c[4]})))}));
}
function coachBubble(st,rust){
  var hr=new Date().getHours(),risk=!st.loggedToday&&st.n>0&&hr>=18;
  var mood=st.loggedToday?"happy":(risk||rust)?"worried":"calm";
  return h("div",{class:"cbub"},h("div",{class:"cav"},figure("kocag",mood)),
    h("div",{class:"cmsg"},h("div",{class:"cwho"},"Koç Ağ"),h("div",null,heroMessage(st,rust))));
}
function renderHero(){
  if(tab!=="bugun"||S.pf.simple){hero.classList.add("mini");return miniHero()}
  hero.classList.remove("mini");
  var R=rankInfo(),st=streakInfo(),wk=weekInfo(),rust=rustList().length,td=new Date();
  var pct=R.nxt?Math.max(0,Math.min(100,(R.xp-R.cur.xp)/(R.nxt.xp-R.cur.xp)*100)):100;
  var gateMissing=R.nxt&&R.xp>=R.nxt.xp&&R.ad>=R.nxt.days&&!gateOk(R.nxt.gate);
  var steps=routeSteps(),nxt=steps.filter(function(x){return !x.d})[0],done=steps.filter(function(x){return x.d}).length;
  var xpEl=h("b",null,R.xp);
  var stars=h("div",{class:"stars","aria-hidden":"true"},[[8,14],[18,40],[27,9],[36,26],[47,12],[58,36],[66,8],[74,22],[83,44],[91,16],[13,58],[52,52],[96,34],[42,30]].map(function(p){return h("i",{style:"left:"+p[0]+"%;top:"+p[1]+"px"})}));
  var days=["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"],mons=["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
  hero.replaceChildren(h("div",{class:"aurora","aria-hidden":"true"},h("i"),h("i")),stars,h("button",{class:"orb",type:"button","aria-label":"Temayı değiştir. Şu an: "+themeName(),title:"Tema: "+themeName()+" (dokun, değiştir)",onclick:themeCycle}),
    h("div",{class:"hero-in"},
      academyBar(),
      h("div",{class:"greet"},h("div",{class:"label"},days[td.getDay()]+" · "+td.getDate()+" "+mons[td.getMonth()]),
        h("h1",null,greeting()+(MYN()?", "+MYN():"")),coachBubble(st,rust),h("p",{class:"mantra"},mantra())),
      h("div",{class:"hero-row"},
        h("div",{class:"rankring"},ringBig(pct,gateMissing),h("div",{class:"c"},h("div",null,xpEl,h("br"),h("span",null,"XP")))),
        h("div",{style:"display:grid;gap:10px;min-width:0"},
          h("div",null,h("div",{class:"rankname"},R.cur.n),
            h("div",{class:"nextline"},R.demoted?"Uzun ara verdin, kıdemin bir kademe düştü. Çalışınca geri gelir.":R.prob!=null?"Deneme süresi uyarısı: son 14 günde "+R.prob+"/5 aktif gün.":R.warn?"Uzun süredir yoksun, kıdemin eriyor.":R.nxt?("Sonraki: "+R.nxt.n+" · "+Math.max(0,R.nxt.xp-R.xp)+" XP, "+Math.max(0,R.nxt.days-R.ad)+" aktif gün kaldı"+(gateMissing?" · terfi şartları bekliyor":"")):"En üst rütbedesin.")),
          h("div",{class:"chipsrow"},
            h("span",{class:"hchip"+((!st.loggedToday&&st.n>0&&new Date().getHours()>=18)?" risk":""),title:"Seri"},mi(FLAME,st.n>0?"var(--rust)":"var(--mute)"),st.n+" gün"+((!st.loggedToday&&st.n>0&&new Date().getHours()>=18)?" · risk":"")),
            h("span",{class:"hchip",title:"Bu hafta"},"hafta "+wk.days+(wk.tDays?"/"+wk.tDays:"")),
            h("span",{class:"hchip",title:"Joker: bir gün ara verirsen serinin bozulmaması için hak"},"izin günü "+st.jokersLeft),
            rust?h("span",{class:"hchip",style:"color:var(--rust)",title:"Tekrarı geciken konu sayısı"},"tekrar "+rust):null,teaserChip()))),
      karne(),
      h("div",{class:"hero-cta"},nxt?h("button",{class:"btn big",type:"button",onclick:function(){(nxt.go||nxt.toggle)()}},"Başla · "+nxt.t+" ("+done+"/"+steps.length+")"):
        h("div",{class:"hchip"},"Bugünkü rota tamam · "+steps.length+"/"+steps.length))),
    skyline());
  countUp(xpEl,R.xp);
}

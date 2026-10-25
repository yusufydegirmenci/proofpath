"use strict";
/* ---- kademe, semt ve sis sistemi ---- */
var HS=[46,50,62,84,108];
function stageOf(t){return PP.ogr.ilerleme.asama(t)}
function districtsOf(track){
  var T=cityTopics(track),by={},order=[];
  T.forEach(function(t){var a=t.area||"Genel";if(!by[a]){by[a]={name:a,topics:[]};order.push(a)}by[a].topics.push(t)});
  var ds=order.map(function(a){var d=by[a];
    d.avg=Math.round(d.topics.reduce(function(s,t){return s+num(t.mastery)},0)/d.topics.length);
    d.built=d.topics.filter(PP.ogr.ilerleme.konuTamam).length;
    d.done=d.built===d.topics.length;return d});
  var cur=-1;for(var i=0;i<ds.length;i++){if(!ds[i].done){cur=i;break}}
  ds.forEach(function(d,i){d.state=cur===-1||i<cur?"done":i===cur?"active":i===cur+1?"next":"far"});
  return ds;
}
function revealK(name,pct){
  var L=String(name).replace(/\s/g,"").length;
  if(pct>=100)return L;
  return pct<=0?0:Math.min(L-1,Math.max(1,Math.round(L*pct/100)));
}
function maskText(name,k){
  var seen=0,out="";
  String(name).split("").forEach(function(c){if(c===" "){out+=c;return}if(seen<k){out+=c;seen++}else out+="•"});
  return out;
}
function maskName(name,pct){return h("span",{class:"mname",title:"Semt adı ilerledikçe açılır"},maskText(name,revealK(name,pct)))}
function stageCopy(ev){
  var t=ev.t||{},nm=t.name||"Bu bina";
  if(ev.kind==="district")return ["SEMT TAMAMLANDI",ev.d.name+" ayakta","Bu semtteki "+ev.d.topics.length+" bina da tamam. Sis dağılıyor, yeni semt kapıda."];
  if(ev.kind==="quiz")return ["KADEME AŞILDI","Mini sınavı geçtin","Bugünkü dersten "+ev.ok+"/"+ev.tot+" doğru. Işıklar yandı. Resmî ustalığı koç akşam hesaplar, bu an senin kendi kademen."];
  if(ev.to===4)return ["BİNA TAMAM",nm,"Kapı eşiğini geçtin ve şehre yeni bir kule dikildi. Sıradaki binadan sis çekiliyor."];
  if(ev.to===3)return ["GÖVDE YÜKSELDİ",nm,"Ustalık %"+Math.round(num(t.mastery))+". Bina artık şehrin silüetinde görünüyor."];
  if(ev.to===2)return ["İSKELE KURULDU",nm,"Temel atıldı. Her çözülen soru bir kat daha çıkarır."];
  return ["YENİ BİNA AÇILDI",nm,"Sis bu binanın üzerinden kalktı. Sıra sende."];
}
function msScene(ev){
  var tr=ev.track,T=topicsOf(tr),foc=ev.t;
  var group=T;
  if(foc&&tr==="ccna")group=T.filter(function(x){return (x.area||"Genel")===(foc.area||"Genel")});
  if(ev.kind==="district")group=ev.d.topics;
  if(!group.length)group=T.slice(0,6);
  var fi=-1;group.forEach(function(x,i){if(foc&&x.id===foc.id)fi=i});
  if(fi>7){group=group.slice(fi-6,fi+2);fi=6}
  group=group.slice(0,8);
  if(fi<0&&ev.kind==="quiz"){group.forEach(function(x,i){if(fi<0&&(x.status==="building"||x.status==="next"))fi=i})}
  var n=group.length,bw=Math.max(20,Math.min(30,Math.floor(272/n)-7)),gap=7,W=n*(bw+gap)-gap,x0=(300-W)/2,gy=132;
  var svg=sv("svg",{viewBox:"0 0 300 150",class:"ms-svg","aria-hidden":"true"});
  svg.append(sv("defs",null,sv("filter",{id:"msb",x:"-30%",y:"-30%",width:"160%",height:"160%"},sv("feGaussianBlur",{stdDeviation:"3.2"}))));
  var col=tr==="eng"?"eng":"ccna";
  /* uzak tepeler */
  svg.append(sv("path",{d:"M0 118 Q40 92 80 112 T160 104 T240 110 T300 98 V150 H0Z",fill:"var(--bld)",opacity:".35"}));
  var after=[];
  group.forEach(function(t,i){
    var isF=i===fi,st=ev.kind==="district"?4:isF?(ev.kind==="quiz"?Math.max(2,stageOf(t)):ev.to):stageOf(t);
    var prevSt=isF?(ev.kind==="quiz"?Math.max(2,stageOf(t)):ev.from):st;
    var bh=HS[st],x=x0+i*(bw+gap),y=gy-bh,g=sv("g",isF?{class:"ms-rise",style:"--d:"+(HS[st]-HS[prevSt])+"px"}:null);
    if(st===0){
      g.append(sv("rect",{x:x,y:y,width:bw,height:bh,rx:2,fill:"none",stroke:"var(--mute)","stroke-width":1,"stroke-dasharray":"3 3",opacity:.6}));
    }else{
      g.append(sv("rect",{x:x,y:y,width:bw,height:bh,rx:2,fill:"var(--bld2)"}));
      var cols=bw>=24?3:2,rows=Math.max(2,Math.floor((bh-10)/10)),tot=rows*cols;
      var frac=st===4?1:st===3?.62:st===2?.25:0,lit=Math.round(tot*frac);
      var prevLit=isF?Math.round(tot*(prevSt===4?1:prevSt===3?.62:prevSt===2?.25:0)):lit;
      for(var r=0;r<rows;r++)for(var c=0;c<cols;c++){
        var k=r*cols+c,on=k<lit,newly=isF&&on&&k>=prevLit;
        g.append(sv("rect",{x:x+3+c*((bw-6)/cols),y:y+bh-9-r*10,width:(bw-6)/cols-2.2,height:5,rx:1,class:"win"+(on?" lit "+col+(newly?" wnew":""):""),style:newly?"animation-delay:"+(1.05+(k-prevLit)*.07)+"s":null}));
      }
      if(isF&&ev.to===4||ev.kind==="district"){
        g.append(sv("line",{x1:x+bw/2,x2:x+bw/2,y1:y,y2:y-14,stroke:"var(--ink)","stroke-width":1}));
        g.append(sv("path",{d:"M"+(x+bw/2)+" "+(y-14)+"l9 3.5-9 3.5z",fill:"var(--"+(tr==="eng"?"eng":"net")+")",class:isF?"ms-flag":""}));
      }else if(isF){
        g.append(sv("line",{x1:x+bw+3,x2:x+bw+3,y1:y-12,y2:y+bh,stroke:"var(--warn)","stroke-width":1.2}));
        g.append(sv("line",{x1:x-6,x2:x+bw+14,y1:y-12,y2:y-12,stroke:"var(--warn)","stroke-width":1.2}));
      }
    }
    svg.append(g);
    if(isF)svg.append(sv("ellipse",{cx:x+bw/2,cy:gy,rx:bw*.9,ry:4,class:"ms-ring"}));
    /* sis: kilitli bina kalıcı, yeni açılan bina animasyonla dağılır */
    var fog=null;
    if(st===0)fog={cls:"ms-fog"};
    else if(ev.kind==="stage"&&ev.to===4&&fi>=0&&i===fi+1&&st===1)fog={cls:"ms-fog ms-fogout"};
    else if(ev.kind==="stage"&&ev.to===1&&isF)fog={cls:"ms-fog ms-fogout"};
    if(fog)after.push(sv("rect",{x:x-6,y:gy-HS[Math.max(st,1)]-12,width:bw+12,height:HS[Math.max(st,1)]+14,rx:8,class:fog.cls,filter:"url(#msb)"}));
  });
  after.forEach(function(f){svg.append(f)});
  svg.append(sv("rect",{x:0,y:gy,width:300,height:18,fill:"var(--panel2)"}));
  svg.append(sv("rect",{x:0,y:gy,width:300,height:1.5,fill:"var(--line)"}));
  return svg;
}
function teaserFor(ev){
  var ds=districtsOf(ev.track==="eng"?"none":"ccna");
  if(!ds.length)return null;
  if(ev.kind==="district"){
    var cur=ds.filter(function(d){return d.state==="active"})[0];
    return cur?{d:cur,pct:Math.max(30,cur.avg),label:"Yeni semt kapıda"}:null;
  }
  var nx=ds.filter(function(d){return d.state==="next"})[0],ac=ds.filter(function(d){return d.state==="active"})[0];
  return nx?{d:nx,pct:ac?ac.avg:0,label:"Sıradaki semt"}:null;
}
function openMilestone(){
  if(S.ms.open||!S.ms.queue.length)return;
  var ev=S.ms.queue.shift(),cp=stageCopy(ev),tz=teaserFor(ev);
  S.ms.open=true;
  var prevFocus=document.activeElement;
  var nameEl=h("span",{class:"mname big"});
  var nxt=null;
  if(tz){
    var k1=revealK(tz.d.name,tz.pct),k0=Math.max(0,(S._rev&&S._rev[tz.d.name]!=null)?S._rev[tz.d.name]:k1-2);
    S._rev=S._rev||{};S._rev[tz.d.name]=k1;
    nameEl.textContent=maskText(tz.d.name,k0);
    var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    if(reduce)nameEl.textContent=maskText(tz.d.name,k1);
    else{var cur=k0;ev._iv=setInterval(function(){if(cur>=k1){clearInterval(ev._iv);return}cur++;nameEl.textContent=maskText(tz.d.name,cur)},420);
      if(k0>=k1)clearInterval(ev._iv)}
    nxt=h("div",{class:"ms-next"},h("div",{class:"label"},tz.label),nameEl,
      h("div",{class:"xpbar"},h("i",{style:"width:"+Math.max(4,tz.pct)+"%"})),
      h("div",{class:"small mute"},"Bu semt, şu anki semtteki ilerlemen arttıkça harf harf açılır."));
  }
  var close=function(go){
    if(ev._iv)clearInterval(ev._iv);
    ov.remove();document.removeEventListener("keydown",onKey);S.ms.open=false;
    if(go)goTab(go);else draw();
    try{if(prevFocus&&prevFocus.focus)prevFocus.focus()}catch(e){}
    if(S.ms.queue.length)setTimeout(openMilestone,500);
  };
  var onKey=function(e){if(e.key==="Escape")close()};
  var okBtn=h("button",{class:"btn big",type:"button",onclick:function(){close()}},"Devam");
  var ov=h("div",{class:"ms",role:"dialog","aria-modal":"true","aria-label":cp[0]},
    h("div",{class:"ms-card"+(ev.track==="eng"?" eng":"")},
      h("div",{class:"ms-scene"},msScene(ev)),
      h("div",{class:"ms-kick"},cp[0]),h("h2",null,cp[1]),h("p",null,cp[2]),nxt,
      h("div",{class:"ms-act"},okBtn,ev.track==="ccna"?h("button",{class:"btn ghost",type:"button",onclick:function(){close("sehir")}},"Şehre bak"):null)));
  document.body.append(ov);document.addEventListener("keydown",onKey);
  try{okBtn.focus()}catch(e){}
  burst();try{if(navigator.vibrate)navigator.vibrate([30,40,60])}catch(e){}
}
function seenLoad(){var o=null;try{o=JSON.parse(localStorage.getItem("ya_seen_v2")||"null")}catch(e){}return o||S._seenMem||null}
function seenSave(o){S._seenMem=o;try{localStorage.setItem("ya_seen_v2",JSON.stringify(o))}catch(e){}}
function checkMilestones(){
  if(!S.topics.length)return;
  var cur={},dn={};
  S.topics.forEach(function(t){cur[t.id]=stageOf(t)});
  var dsAll=districtsOf("ccna");dsAll.forEach(function(d){dn[d.name]=d.done});
  var base=seenLoad();
  if(!base||!base.s){seenSave({s:cur,d:dn,q:{}});return}
  var ch=false,evs=[];
  S.topics.forEach(function(t){
    var o=base.s[t.id];
    if(o==null){base.s[t.id]=cur[t.id];ch=true;return}
    if(cur[t.id]>o)evs.push({kind:"stage",t:t,from:o,to:cur[t.id],track:t.track});
    if(cur[t.id]!==o){base.s[t.id]=cur[t.id];ch=true}
  });
  base.d=base.d||{};
  dsAll.forEach(function(d){
    if(d.done&&base.d[d.name]===false){
      evs=evs.filter(function(e){return !(e.kind==="stage"&&e.track==="ccna"&&(e.t.area||"Genel")===d.name)});
      evs.push({kind:"district",d:d,track:"ccna"});
    }
    if(base.d[d.name]!==d.done){base.d[d.name]=d.done;ch=true}
  });
  if(ch)seenSave(base);
  /* tek kutlama: semt > en yüksek kademe; "yeni bina açıldı" zaten sahnede sis olarak çekiliyor */
  evs.sort(function(a,b){return ((a.kind==="district"?9:a.to)-(b.kind==="district"?9:b.to))||0});
  if(evs.length)S.ms.queue.push(evs[evs.length-1]);
  if(S.ms.queue.length&&!S.ms.open)setTimeout(openMilestone,350);
}
function quizMilestone(l,ok,tot){
  if(!tot||!PP.ogr.kapi.miniSinav(ok,tot).gecti)return;
  var base=seenLoad()||{s:{},d:{},q:{}};base.q=base.q||{};
  if(base.q[l.id])return;base.q[l.id]=true;seenSave(base);
  var tp=topicsOf(l.track).filter(function(t){return t.status==="building"||t.status==="next"})[0]||null;
  S.ms.queue.push({kind:"quiz",t:tp,track:l.track,ok:ok,tot:tot});
  if(!S.ms.open)setTimeout(openMilestone,250);
}
S.ms={queue:[],open:false};

/* koç çıktısı bozuk gelirse sayfa çökmesin: tipleri zorla */
function str(x){return typeof x==="string"?x:typeof x==="number"?String(x):""}
function objs(a){return Array.isArray(a)?a.filter(function(x){return x&&typeof x==="object"&&!Array.isArray(x)}):[]}
function pick(o,keys){var r={};keys.forEach(function(k){r[k]=str(o[k])});return r}
function cleanLesson(l){
  l.date=str(l.date);l.track=TRK[l.track]?l.track:"ccna";
  ["title","hook","homework","coachNote","kind"].forEach(function(k){l[k]=str(l[k])});
  l.blocks=objs(l.blocks).map(function(b){
    var r=pick(b,["t","text","h","tr","result"]);if(b.t==="alan")r.id=str(b.id);   /* Python hattı: alan bloğu PP_PY.alanlar kimliğiyle bağlanır */
    r.items=Array.isArray(b.items)?b.items.map(str):[];
    r.parts=objs(b.parts).map(function(p){return pick(p,["tr","q","en"])});
    return r});
  l.quiz=objs(l.quiz).map(function(q){var sv=typeof q.id==="string"&&q.id&&q.answer===undefined;   /* Faz 9 sunucu: cevap anahtarı sunucuda; answer/why boş metne ÇEVRİLMEZ, id korunur */
    var r=pick(q,sv?["q","obj"]:["q","answer","why","obj"]);if(sv)r.id=q.id;r.options=Array.isArray(q.options)?q.options.map(str):null;
    if(q.whyNot&&typeof q.whyNot==="object"&&!Array.isArray(q.whyNot)){r.whyNot={};Object.keys(q.whyNot).forEach(function(k){if(typeof q.whyNot[k]==="string")r.whyNot[k]=q.whyNot[k]})}
    return r});
  l.interview=objs(l.interview).map(function(x){return pick(x,["q","a"])});
  l.vocab=objs(l.vocab).map(function(x){return pick(x,["term","tr","ex"])});
  l.resources=objs(l.resources).map(function(x){return pick(x,["title","url","query","type","why","length","level","lang"])});
  l.sources=objs(l.sources).map(function(x){return pick(x,["title","url"])});
  l.warmup=cleanWarm(l.warmup);
  /* Faz 12 V1: isteğe bağlı şema alanları (yoksa boş; eski dersler aynen çalışır) */
  l.objectives=window.PP&&PP.ogr&&PP.ogr.ders?PP.ogr.ders.hedefler(l):[];
  l.summary=Array.isArray(l.summary)?l.summary.map(str).filter(Boolean):[];
  l.prereq=Array.isArray(l.prereq)?l.prereq.map(str).filter(Boolean):[];
  l.minutes=typeof l.minutes==="number"&&l.minutes>0?l.minutes:0;
  l.sonDogrulama=str(l.sonDogrulama);l.surum=str(l.surum);
  l.story=l.story&&typeof l.story==="object"&&!Array.isArray(l.story)?pick(l.story,["title","text","question"]):null;
  return l;
}

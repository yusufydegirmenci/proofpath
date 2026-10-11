"use strict";
var TABS=[["bugun","Bugün"],["ders","Ders"],["sinif","Sınıf"],["sehir","Ağ Şehri"],["oyun","Oyun"],["atolye","Atölye"],["ofis","Ofis"],["oku","Okuma"],["masa","Masa"],["lig","Lig"],["gazete","Gazete"],["mul","Mülakat"],["proje","Proje"],["sozluk","Sözlük"],["rehber","Rehber"],["ayar","Ayarlar"],["sayilar","Sayılar"],["oduller","Ödüller"]];
var CH={
 ayse:{n:"Ayşe",role:"Muhasebe. Teknik bilmez, acelecidir.",skin:"#e8b48f",hair:"#3b2a22",top:"#c2547a"},
 demir:{n:"Bay Demir",role:"Bölüm müdürü. Kısa konuşur, 'neden' diye sorar.",skin:"#d9a07c",hair:"#8c8c92",top:"#34506b"},
 zeynep:{n:"Zeynep",role:"Yeni stajyer. Senden öğrenmek ister.",skin:"#f0c4a2",hair:"#7a3f1e",top:"#3a9a7d"},
 elnur:{n:"Elnur",role:"Bakü'deki iş ortağı. İngilizce konuşur.",skin:"#cf9a76",hair:"#1f1b1a",top:"#7a5ab0"},
 kocag:{n:"Koç Ağ",role:"CCNA koçu. Sınav sorusu sorar.",skin:"#e2ac86",hair:"#2a3340",top:"#0b8f80"}
};
CH.kalkan={n:"Koç Kalkan",role:"Siber güvenlik koçu. Önce savunmayı sorar.",skin:"#d9a07c",hair:"#1f2430",top:"#6d4ae0"};
CH.paket={n:"Koç Paket",role:"Network koçu. Katmanı sorar.",skin:"#d9a07c",hair:"#2a2a2a",top:"#b9770e"};CH.hat={n:"Koç Hat",role:"DevOps koçu. Otomasyon ister.",skin:"#e2ac86",hair:"#4a3524",top:"#2e8b57"};CH.kusur={n:"Koç Kusur",role:"Test koçu. Hatayı arar.",skin:"#e2ac86",hair:"#2a2230",top:"#b23a68"};
CH.servis={n:"Koç Servis",role:"Backend koçu. Çalışan kod ister.",skin:"#e2ac86",hair:"#3b2a22",top:"#1769c7"};
var ROSTER={ccna:["ayse","demir","zeynep","kocag","ayse"],eng:["elnur","ayse","demir","zeynep","elnur"],sec:["ayse","demir","zeynep","kalkan","demir"],bk:["zeynep","demir","ayse","servis","zeynep"],net:["demir","ayse","zeynep","paket","demir"],dev:["zeynep","demir","ayse","hat","zeynep"],qa:["ayse","zeynep","demir","kusur","ayse"]};
var TRK_LIST=[["ccna","CCNA"],["net","Network"],["eng","İngilizce"],["sec","Siber"],["bk","Backend"],["dev","DevOps"],["qa","Test Uzmanı"]];var TRKS=TRK_LIST.map(function(o){return o[0]});var TRN={};TRK_LIST.forEach(function(o){TRN[o[0]]=o[1]});function trkMap(v){var o={};TRKS.forEach(function(t){o[t]=typeof v==="function"?v():v});return o}
var TRK={ccna:{n:"CCNA",cert:"CCNA 200-301"},eng:{n:"İngilizce",cert:"İngilizce"},sec:{n:"Siber",cert:"CompTIA Security+ SY0-801"},bk:{n:"Backend",cert:"AWS Certified Developer – Associate"},net:{n:"Network",cert:"CompTIA Network+ N10-009"},dev:{n:"DevOps",cert:"Linux Foundation KCNA"},qa:{n:"Test Uzmanı",cert:"ISTQB CTFL v4.0"}};
function trName(t){return (TRK[t]||TRK.ccna).n}
function certName(t){return (TRK[t]||TRK.ccna).cert}
var ARTIFACT_URL="";
var RANKS=[
 {n:"Stajyer",xp:0,days:0,gate:null,req:"Deneme süresi: düzenli gel, işini bırakma"},
 {n:"Uzman Yardımcısı",xp:900,days:14,gate:"g1",req:"14 aktif gün, 40 soruda %80, 3 ders"},
 {n:"Uzman",xp:3000,days:45,gate:"g2",req:"45 aktif gün, 150 soruda %82, 15 ders, 1 proje"},
 {n:"Kıdemli Uzman",xp:7000,days:90,gate:"g3",req:"90 aktif gün, 350 soruda %85, 40 ders, 2 proje, mülakat 7.5"},
 {n:"Ağ Mimarı",xp:12000,days:150,gate:"g4",req:"150 aktif gün, 700 soruda %88, 80 ders, 3 proje, mülakat 8"}
];
var S={profile:{},story:null,topics:[],days:[],exams:[],rewards:[],badges:[],reports:[],attempts:[],lessons:[],inbox:[],progress:[],gen:{busy:false,err:null,ctl:null},les:{track:"ccna",id:null,rev:{},mark:{},ask:{busy:false,ans:null,err:null}},ready:false,db:null,canWrite:true,sample:null,mcp:null,dl:null,
  cls:{track:"ccna",topicId:null,phase:"idle",qs:[],i:0,res:[],err:null,msg:null,after:null,ctl:null}};
var tab=(location.hash||"").replace("#","");
if(!TABS.some(function(t){return t[0]===tab}))tab="bugun";
var view=document.getElementById("view"),hero=document.getElementById("hero"),tabsEl=document.getElementById("tabs");

function h(tag,a){
  var e=document.createElement(tag);
  if(a)for(var k in a){var v=a[k];if(v==null||v===false)continue;
    if(k==="class")e.className=v;else if(k==="style")e.style.cssText=v;
    else if(k.slice(0,2)==="on")e.addEventListener(k.slice(2),v);
    else e.setAttribute(k,v===true?"":v);}
  for(var i=2;i<arguments.length;i++){var c=arguments[i];
    (Array.isArray(c)?c:[c]).forEach(function(x){if(x==null||x===false)return;e.append(x.nodeType?x:document.createTextNode(String(x)));});}
  return e;
}
var NS="http://www.w3.org/2000/svg";
function sv(tag,a){
  var e=document.createElementNS(NS,tag);
  if(a)for(var k in a)e.setAttribute(k,a[k]);
  for(var i=2;i<arguments.length;i++){var c=arguments[i];if(c==null)continue;e.append(c.nodeType?c:document.createTextNode(String(c)));}
  return e;
}
function pad(n){return (n<10?"0":"")+n}
function iso(d){return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate())}
function parse(s){var p=String(s||"").split("-");return new Date(+p[0],+p[1]-1,+p[2])}
function today(){return iso(new Date())}
function daysAgo(s){if(!s)return null;return Math.round((parse(today())-parse(s))/864e5)}
var WEB=!!(window.PP_CONFIG&&window.PP_CONFIG.url);
function num(x){return typeof x==="number"&&isFinite(x)?x:0}
function mondayOf(d){var x=new Date(d.getFullYear(),d.getMonth(),d.getDate());var w=(x.getDay()+6)%7;x.setDate(x.getDate()-w);return x}
function short(s){var d=parse(s);return pad(d.getDate())+"."+pad(d.getMonth()+1)}

/* ---- türetilmiş veriler ---- */
function attemptXpByDate(){
  var by={};
  S.attempts.forEach(function(a){if(a.date)by[a.date]=(by[a.date]||0)+num(a.xp)});
  Object.keys(by).forEach(function(k){by[k]=Math.min(by[k],100)});
  return by;
}
function totalXp(){
  var t=0;
  S.days.forEach(function(d){t+=num(d.xp)});
  S.exams.forEach(function(d){t+=num(d.xp)});
  S.badges.forEach(function(d){t+=num(d.xp)});
  var ab=attemptXpByDate();Object.keys(ab).forEach(function(k){t+=ab[k]});
  t+=projXp();t+=gameXp();t+=rtXp();
  return t;
}
function liveMinutes(){
  var by={},out={};
  S.attempts.forEach(function(a){if(a.date)(by[a.date]=by[a.date]||[]).push(Date.parse(a.ts)||0)});
  Object.keys(by).forEach(function(d){
    var arr=by[d].sort(function(x,y){return x-y}),m=0;
    arr.forEach(function(t,i){m+=1;if(i>0){var g=(t-arr[i-1])/6e4;if(g<=8)m+=g}});
    out[d]=Math.round(m);
  });
  return out;
}
function loggedDates(){
  var o={};
  S.days.forEach(function(d){if(d.date&&num(d.minutes)>0)o[d.date]=(o[d.date]||0)+num(d.minutes)});
  S.reports.forEach(function(r){if(r.date&&num(r.minutes)>0&&!o[r.date])o[r.date]=num(r.minutes)});
  S.progress.forEach(function(p){var dd=p.date||p.id;if(dd&&num(p.mini5)>0)o[dd]=Math.max(o[dd]||0,5)});
  var lm=liveMinutes();Object.keys(lm).forEach(function(k){o[k]=Math.max(o[k]||0,lm[k])});
  return o;
}
function todayAttempts(){return S.attempts.filter(function(a){return a.date===today()}).sort(function(a,b){return String(a.ts).localeCompare(String(b.ts))})}
function streakInfo(){
  var L=loggedDates(),J={};
  (S.profile.jokerDates||[]).forEach(function(d){J[d]=1});
  var d=parse(today()),n=0;
  if(!L[iso(d)]&&!J[iso(d)])d.setDate(d.getDate()-1);
  while(L[iso(d)]||J[iso(d)]){if(L[iso(d)])n++;d.setDate(d.getDate()-1)}
  var mon=mondayOf(new Date()),used=(S.profile.jokerDates||[]).filter(function(x){return parse(x)>=mon}).length;
  return {n:n,jokersLeft:Math.max(0,1-used),loggedToday:!!L[today()]};
}
function activeDaySet(){
  var o={};
  S.attempts.forEach(function(x){if(x.date)o[x.date]=1});
  S.progress.forEach(function(p){var d=p.date||p.id;if(!d)return;if(num(p.rtxp)>0||num(p.g_runs)>0||num(p.mini5)>0||num(p.prac_n)>0||num(p.mul_n)>0||num(p.proj_n)>0||num(p.ticket_n)>0||num(p.vd_n)>0||num(p.fk_n)>0)o[d]=1});
  S.days.forEach(function(d){if(d.date&&(num(d.minutes)>0||num(d.xp)>0))o[d.date]=1});
  S.reports.forEach(function(r){if(r.date)o[r.date]=1});
  try{var lc=lcLoad();Object.keys(lc).forEach(function(k){if(k.charAt(0)!=="_"&&lc[k]&&lc[k].d)o[lc[k].d]=1})}catch(e){}
  return o;
}
function lessonsDone(){
  var n=0;try{var lc=lcLoad();Object.keys(lc).forEach(function(k){if(k.charAt(0)!=="_"&&lcDone(k))n++})}catch(e){}
  var built=S.topics.filter(function(t){return t.status==="built"}).length;
  return Math.max(n,built);
}
function projDoneN(){return S.projects.filter(function(p){return p.status==="bitti"}).length}
function mockInfo(){var m=(S.mock||[]).slice(-3),a=0;m.forEach(function(x){a+=num(x.avg)});return {n:(S.mock||[]).length,avg:m.length?a/m.length:0}}
function rankInfo(){
  var xp=totalXp(),g=S.profile.gates||{},days=Object.keys(activeDaySet()).sort(),ad=days.length,idx=0;
  for(var i=1;i<RANKS.length;i++){var r=RANKS[i];if(xp>=r.xp&&ad>=r.days&&(g[r.gate]===true||gateAuto(r.gate)))idx=i;else break}
  var loaded=!!(S._ld&&S._ld.progress&&S._ld.attempts&&S.ready2),last=days.length?days[days.length-1]:null,gap=last?daysAgo(last):null,first=days.length?days[0]:null;
  var demoted=false,warn=false,prob=null;
  if(loaded&&gap!=null){
    if(idx>0&&gap>=30){idx--;demoted=true}
    else if(idx>0&&gap>=14)warn=true;
  }
  if(loaded&&idx===0&&first&&daysAgo(first)>=14){var rec=days.filter(function(d){var a=daysAgo(d);return a!=null&&a<14}).length;if(rec<5)prob=rec}
  var cur=RANKS[idx],nxt=RANKS[idx+1]||null;
  return {xp:xp,cur:cur,nxt:nxt,idx:idx,ad:ad,gap:gap,demoted:demoted,warn:warn,prob:prob};
}
function weekInfo(){
  var mon=mondayOf(new Date()),L=loggedDates(),days=0,min=0;
  Object.keys(L).forEach(function(k){if(parse(k)>=mon){days++;min+=L[k]}});
  var c=S.profile.commit||{};
  return {days:days,min:min,tDays:num(c.days),tMin:num(c.minutes)};
}
function rustList(){
  return S.topics.filter(function(t){
    var a=daysAgo(t.lastReview);
    return (t.status==="built"||t.status==="building")&&num(t.mastery)>0&&a!=null&&a>7;
  });
}
function cityTopics(track){
  var T=topicsOf(track);
  if(T.length||!S.nonOwner||!STARTER[track])return T;
  return starterTopics(track).map(function(t){var o=Object.assign({},t);if(o.status==="open")o.status="locked";return o});
}
function topicsOf(track){
  return S.topics.filter(function(t){return t.track===track}).sort(function(a,b){
    return (num(a.areaOrder)-num(b.areaOrder))||(num(a.order)-num(b.order))});
}

/* ---- parçalar ---- */
function heartSvg(on){
  return sv("svg",{width:18,height:18,viewBox:"0 0 24 24","aria-hidden":"true"},
    sv("path",{d:"M12 21s-7.5-4.7-9.6-9.2C.9 8.4 3 5 6.2 5c2 0 3.4 1 5.8 3.3C14.4 6 15.8 5 17.8 5 21 5 23.1 8.4 21.6 11.8 19.5 16.3 12 21 12 21z",
      fill:on?"var(--bad)":"none",stroke:on?"var(--bad)":"var(--mute)","stroke-width":1.6}));
}
function ringSvg(p,color){
  var r=14,c=2*Math.PI*r,v=Math.max(0,Math.min(100,p))/100;
  return sv("svg",{class:"ring",viewBox:"0 0 34 34","aria-hidden":"true"},
    sv("circle",{cx:17,cy:17,r:r,fill:"none",stroke:"var(--panel2)","stroke-width":4}),
    sv("circle",{cx:17,cy:17,r:r,fill:"none",stroke:color,"stroke-width":4,"stroke-linecap":"round",
      "stroke-dasharray":(c*v)+" "+c,transform:"rotate(-90 17 17)"}));
}
function lineChart(pts,cls){
  var W=340,H=170,l=30,r=10,t=10,b=24,w=W-l-r,hh=H-t-b;
  var svg=sv("svg",{class:"chart "+(cls||""),viewBox:"0 0 "+W+" "+H,width:"100%",role:"img","aria-label":"Sınav sonuçları grafiği"});
  [0,25,50,75,100].forEach(function(v){
    var y=t+hh-hh*v/100;
    svg.append(sv("line",{class:"grid",x1:l,x2:W-r,y1:y,y2:y}),sv("text",{x:l-5,y:y+3,"text-anchor":"end"},v));
  });
  var gy=t+hh-hh*0.8;
  svg.append(sv("line",{class:"goal",x1:l,x2:W-r,y1:gy,y2:gy}));
  if(!pts.length){svg.append(sv("text",{x:W/2,y:H/2,"text-anchor":"middle"},"Henüz sınav yok"));return svg}
  var n=pts.length,xs=function(i){return n===1?l+w/2:l+w*i/(n-1)},ys=function(v){return t+hh-hh*Math.max(0,Math.min(100,v))/100};
  var d=pts.map(function(p,i){return (i?"L":"M")+xs(i)+" "+ys(p.pct)}).join(" ");
  svg.append(sv("path",{class:"ln",d:d}));
  var step=Math.ceil(n/6);
  pts.forEach(function(p,i){
    svg.append(sv("circle",{class:"dot",cx:xs(i),cy:ys(p.pct),r:3.5}));
    if(i%step===0||i===n-1)svg.append(sv("text",{x:xs(i),y:H-8,"text-anchor":"middle"},short(p.date)));
  });
  var last=pts[n-1];
  svg.append(sv("text",{x:Math.min(xs(n-1),W-r-10),y:ys(last.pct)-8,"text-anchor":"end",style:"fill:var(--ink);font-weight:600"},Math.round(last.pct)+"%"));
  return svg;
}
function heatmap(){
  var L=loggedDates(),mon=mondayOf(new Date()),start=new Date(mon);
  start.setDate(start.getDate()-7*11);
  var box=h("div",{class:"heat",role:"img","aria-label":"Son 12 haftanın çalışma haritası"});
  for(var c=0;c<12;c++)for(var r=0;r<7;r++){
    var d=new Date(start);d.setDate(start.getDate()+c*7+r);
    var k=iso(d),m=L[k]||0,lv=m===0?0:m<30?1:m<60?2:m<90?3:4;
    var future=d>new Date();
    box.append(h("div",{class:"cell l"+lv+(k===today()?" today":""),title:short(k)+" · "+m+" dk",style:future?"opacity:.35":null}));
  }
  return box;
}
function areaBars(track){
  var T=cityTopics(track).filter(function(t){return t.area}),by={},order=[];
  T.forEach(function(t){if(!by[t.area]){by[t.area]=[];order.push(t.area)}by[t.area].push(num(t.mastery))});
  var box=h("div",{class:"bars"});
  if(!order.length)return h("div",{class:"empty"},"Konu haritası henüz yok.");
  order.forEach(function(a){
    var arr=by[a],avg=Math.round(arr.reduce(function(x,y){return x+y},0)/arr.length);
    box.append(h("div",{class:"barrow"},h("span",null,a),
      h("div",{class:"track"},h("i",{style:"width:"+avg+"%;background:"+(track==="eng"?"var(--eng)":"var(--net)")})),
      h("span",{class:"mono"},avg+"%")));
  });
  return box;
}

"use strict";
/* ---- v27 Oyun Salonu: Ağ Koşusu / Ağ Sürüşü ---- */
S.gm={mode:"daily",skin:"run",speed:null,run:null,stage:null,mute:false,loop:0,trk:"all",sk:{run:"stj",drive:"std"},ps:{}};
try{var _g=JSON.parse(localStorage.getItem("ya_gm")||"null");if(_g){if(["all"].concat(TRKS).indexOf(_g.trk)>=0)S.gm.trk=_g.trk;S.gm.mute=!!_g.mute;if(_g.sk&&typeof _g.sk==="object"){["run","drive"].forEach(function(k){if(typeof _g.sk[k]==="string")S.gm.sk[k]=_g.sk[k].slice(0,12)})}if(_g.ps&&typeof _g.ps==="object"){["tc","runs","kr","boss","S"].forEach(function(k){S.gm.ps[k]=Math.max(0,Math.min(99999,_g.ps[k]|0))})}}}catch(e){}
function gmSave(){try{localStorage.setItem("ya_gm",JSON.stringify({trk:S.gm.trk,mute:S.gm.mute,sk:S.gm.sk,ps:S.gm.ps}))}catch(e){}try{syncPush()}catch(e){}}
var GM_TRK=[["all","Karışık"]].concat(TRK_LIST);
function gmMissions(p){return [{t:"8 doğru cevap ver",have:num(p.g_ok),need:8},{t:"25 altın topla",have:num(p.g_coins),need:25},{t:"2 tur oyna",have:num(p.g_runs),need:2}]}
function gmMDone(p){return gmMissions(p).filter(function(m){return m.have>=m.need}).length}
var GM_CAP=40;
function gmWeekDates(){var w=weekStart(today()),o=[];for(var i=0;i<7;i++)o.push(addDays(w,i));return o}
function gmDay(d){return S.progress.filter(function(p){return p.id===d})[0]||{}}
function gameXp(){var t=0;S.progress.forEach(function(p){t+=Math.min(GM_CAP,num(p.g_xp))});return t}
function gmStreak(){return PP.ogr.seri.oyun(function(d){return num(gmDay(d).g_runs)>0},today())}
function gmWeek(){
  var ds=gmWeekDates(),runs=0,days=0,boss=false,best=0,ok=0,tot=0,coins=0;
  ds.forEach(function(d){var p=gmDay(d);if(num(p.g_runs)>0){days++;runs+=num(p.g_runs)}if(p.g_boss)boss=true;best=Math.max(best,num(p.g_best));ok+=num(p.g_ok);tot+=num(p.g_tot);coins+=num(p.g_coins)});
  return {dates:ds,days:days,runs:runs,boss:boss,best:best,ok:ok,tot:tot,coins:coins,champ:days>=4&&boss};
}
var GS={sk:trkMap(1.5),bx:{},st:{}};
try{var _gs=JSON.parse(localStorage.getItem("ya_gs")||"null");if(_gs&&typeof _gs==="object"){TRKS.forEach(function(t){var v=_gs.sk&&_gs.sk[t];if(typeof v==="number"&&v>=1&&v<=3)GS.sk[t]=v});if(_gs.st&&typeof _gs.st==="object"){Object.keys(_gs.st).slice(0,800).forEach(function(k){var v=_gs.st[k];if(/^\d+$/.test(k)&&Array.isArray(v)&&v.length===2&&v[0]>=0&&v[1]>=v[0]&&v[1]<5000)GS.st[k]=[v[0]|0,v[1]|0]})}if(_gs.bx&&typeof _gs.bx==="object"){Object.keys(_gs.bx).slice(0,400).forEach(function(k){var v=_gs.bx[k];if(/^\d+$/.test(k)&&typeof v==="number"&&v>=0&&v<=4)GS.bx[k]=v})}}}catch(e){}
function gsSave(){GS.ts=new Date().toISOString();try{localStorage.setItem("ya_gs",JSON.stringify(GS))}catch(e){}syncPush()}
function gsAnswer(k,ok){
  var m=/^qb(\d+)$/.exec(k||"");if(!m)return;var i=+m[1],it=QB[i];if(!it)return;
  GS.bx[i]=PP.ogr.ustalik.kutuAdim(GS.bx[i],ok);var st_=GS.st[i]||(GS.st[i]=[0,0]);st_[1]++;if(ok)st_[0]++;
  var th=GS.sk[it.t];if(typeof th==="number")GS.sk[it.t]=PP.ogr.ustalik.beceriAdim(th,it.d,ok);
  gsSave();
}
var GM_TN={ccna:"CCNA",net:"Network",eng:"İngilizce",sec:"Siber",bk:"Backend",dev:"DevOps",qa:"Test Uzmanı",sw:"Yazılım",en:"İngilizce",v:"Kelime"};
function gmQB(i,r,tf){
  var it=QB[i],cor=it.o[it.a];
  if(tf){var good=r()<.5,wr=shuf(it.o.filter(function(_,j){return j!==it.a}),r)[0],shown=good?cor:wr;
    return {q:"Cevap doğru mu? "+it.q+"  Cevap: “"+shown+"”",o:["Doğru","","Yanlış"],a:good?0:2,w:(good?"":"Doğrusu: "+cor+". ")+(it.w||""),k:"qb"+i,t:it.t,tf:1}}
  var w=shuf(it.o.filter(function(_,j){return j!==it.a}),r).slice(0,2),o=shuf([cor].concat(w),r);
  return {q:it.q,o:o,a:o.indexOf(cor),w:it.w||"",k:"qb"+i,t:it.t};
}
function gmAtlas(tr,it,r){
  var L=atlasList(tr),others=L.filter(function(x){return x!==it&&x.tr!==it.tr}).map(function(x){return x.tr}),w=shuf(others,r).slice(0,2),o=shuf([it.tr].concat(w),r);
  return {q:"“"+it.t+"” kısaca ne demek?",o:o,a:o.indexOf(it.tr),w:it.d,k:"at"+tr+it.t,t:tr,term:it.t};
}
function gmVocab(){
  var out=[];S.lessons.slice().sort(function(a,b){return String(b.date).localeCompare(String(a.date))}).slice(0,4).forEach(function(l){(l.vocab||[]).forEach(function(v){if(v.term&&v.tr)out.push({term:v.term,tr:v.tr,ex:v.ex||""})})});
  return out;
}
function gmSmartOrder(pool,r){
  var q2=[];QB.forEach(function(q,i){var GT0=S.gm.trk||"all";if(q.t==="_")return;if(GT0!=="all"&&q.t!==GT0)return;q2.push(i)});
  if(q2.length)pool=q2;
  var me=myLeague(),ms={};((me&&Array.isArray(me.miss))?me.miss:[]).forEach(function(m){if(m&&typeof m.i==="number")ms[m.i]=1});
  var sc=pool.map(function(i){var it=QB[i],th=GS.sk[it.t]||1.5,box=GS.bx[i],near=Math.exp(-Math.abs(it.d-th)*1.4),w=near*(box==null?1.4:box>=3?.35:box===0?2.2:1.2)*(ms[i]?3:1);return [i,Math.pow(r()||.001,1/Math.max(.05,w))]});
  sc.sort(function(a,b){return b[1]-a[1]});return sc.map(function(x){return x[0]});
}
function gmBuildEn(){
  var r=rngf(Math.floor(Math.random()*1e9)),out=[],seen={},ws=WORDS.slice();
  function add(q){if(!q||!q.o||q.o.length<3||seen[q.q])return;seen[q.q]=1;out.push(q)}
  shuf(ws,r).slice(0,9).forEach(function(w,i){
    var others=shuf(ws.filter(function(x){return x[0]!==w[0]}),r),ty=i%3,o,q;
    if(ty===0){var t=shuf([w[1]].concat(others.slice(0,2).map(function(x){return x[1]})),r);add({q:"“"+w[0]+"” kelimesinin Türkçesi hangisi? ("+w[3]+")",o:t,a:t.indexOf(w[1]),w:"“"+w[0]+"” = "+w[1]+". Örnek: "+w[3]+" → "+w[4],k:"v"+w[0],t:"v",term:w[0]})}
    else if(ty===1){var t2=shuf([w[4]].concat(others.slice(0,2).map(function(x){return x[4]})),r);add({q:"“"+w[3]+"” cümlesinin Türkçesi hangisi?",o:t2,a:t2.indexOf(w[4]),w:w[3]+" → "+w[4],k:"v"+w[0],t:"v"})}
    else{var re=new RegExp(w[0].replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"i"),bl=w[3].replace(re,"___");if(bl===w[3]){var t3=shuf([w[1]].concat(others.slice(0,2).map(function(x){return x[1]})),r);add({q:"“"+w[0]+"” ne demek?",o:t3,a:t3.indexOf(w[1]),w:w[3]+" → "+w[4],k:"v"+w[0],t:"v"})}
      else{var t4=shuf([w[0]].concat(others.slice(0,2).map(function(x){return x[0]})),r);add({q:"Boşluğa hangisi gelir? “"+bl+"”  ("+w[4]+")",o:t4,a:t4.indexOf(w[0]),w:w[3]+" → "+w[4],k:"v"+w[0],t:"v"})}}
  });
  var qe=[];QB.forEach(function(q,i){if(q.t==="eng")qe.push(i)});
  shuf(qe,r).slice(0,6).forEach(function(i){add(gmQB(i,r,false))});
  return gmArrange(shuf(out,r).slice(0,12),"en");
}
function gmBuild(mode){
  if(mode==="en")return gmBuildEn();
  var N=mode==="boss"?20:12,seed=mode==="daily"?dayNum(today())*3+1:mode==="boss"?dayNum(weekStart(today()))*7+5:Math.floor(Math.random()*1e9);
  var r=rngf(seed),out=[],seen={};
  function add(q){if(!q||q.a<0||q.o.length<3||seen[q.q])return;seen[q.q]=1;out.push(q)}
  var me=myLeague(),miss=(me&&Array.isArray(me.miss)?me.miss:[]).filter(function(m){return m&&typeof m.i==="number"&&QB[m.i]});
  shuf(miss,r).slice(0,mode==="boss"?5:3).forEach(function(m){add(gmQB(m.i,r,r()<.2))});
  var vs=gmVocab();
  if(vs.length>=3)shuf(vs,r).slice(0,mode==="boss"?4:3).forEach(function(v){
    var w=shuf(vs.filter(function(x){return x.tr!==v.tr}).map(function(x){return x.tr}),r).slice(0,2);if(w.length<2)return;
    var o=shuf([v.tr].concat(w),r);add({q:"“"+v.term+"” Türkçesi nedir?",o:o,a:o.indexOf(v.tr),w:v.ex||"",k:"v"+v.term,t:"v"})});
  var qb=[];QB.forEach(function(q,i){var GT0=S.gm.trk||"all";if(q.t==="_")return;if(GT0!=="all"&&q.t!==GT0&&!(GT0==="sw"&&q.t==="sw"))return;if(mode==="boss"?q.d>=2:q.d<=2)qb.push(i)});
  var qbs=mode==="free"?gmSmartOrder(qb,r):shuf(qb,r);var GT=S.gm.trk||"all",ap=[];if(GT==="all"||GT==="eng"||GT==="sw"){ap=ATLAS_SW.map(function(x){return ["sw",x]}).concat(ATLAS_EN.map(function(x){return ["en",x]}))}if(GT==="all"||GT==="sec")ap=ap.concat(ATLAS_SEC.map(function(x){return ["sec",x]}));if(GT==="all"||GT==="bk")ap=ap.concat(ATLAS_BK.map(function(x){return ["bk",x]}));if(GT==="eng")ap=ATLAS_EN.map(function(x){return ["en",x]});if(GT==="all"||GT==="ccna")ap=ap.concat(ATLAS_CCNA.map(function(x){return ["ccna",x]}));if(GT==="all"||GT==="net")ap=ap.concat(ATLAS_NET.map(function(x){return ["net",x]}));if(GT==="all"||GT==="dev")ap=ap.concat(ATLAS_DEV.map(function(x){return ["dev",x]}));if(GT==="all"||GT==="qa")ap=ap.concat(ATLAS_QA.map(function(x){return ["qa",x]}));
  var ats=shuf(ap,r),a=0,b=0;
  while(out.length<N&&(a<qbs.length||b<ats.length)){
    if(a<qbs.length&&(out.length%2===0||b>=ats.length)){var qi=qbs[a++];add(gmQB(qi,r,r()<.25))}
    else if(b<ats.length)add(gmAtlas(ats[b][0],ats[b][1],r)),b++;
  }
  out=gmArrange(shuf(out.slice(0,N),r),mode);
  if(mode==="boss")[4,9,14,19].forEach(function(i){if(out[i])out[i].boss=true});
  return out;
}
function gmBeep(f,d,t){
  if(S.gm.mute)return;try{var C=window.AudioContext||window.webkitAudioContext;if(!C)return;var a=S.gm.ac||(S.gm.ac=new C()),o=a.createOscillator(),g=a.createGain();
    o.type=t||"sine";o.frequency.value=f;g.gain.value=.05;o.connect(g);g.connect(a.destination);o.start();g.gain.exponentialRampToValueAtTime(.0001,a.currentTime+d);o.stop(a.currentTime+d)}catch(e){}
}

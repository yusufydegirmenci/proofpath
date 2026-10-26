"use strict";
/* ALAN: Oyun sekmesi, Ağ Koşusu oyun motoru, jokerler ve skinler. NE YAPAR: gmStart/gmStage/gmLoop koşu-sürüş oyununu (canvas çizim, kapı soruları, sonuç ekranı gmResults) çalıştırır; GM_JK bilgi kristali jokerlerini, GM_SK koşucu/araba skinlerini ve gmWardrobe gardırobu yönetir.
   SORUN OLURSA: Skin/oyuncu tercihi S.gm.sk ve S.gm.ps ile ya_gm içinde saklanır (gmSave, ag-kosusu.js). Oyun sonu gmCardsUpdate ve gqMark çağırır (bilgi-kartlari.js, tekrar-kuyrugu.js: önce yüklenmiş olmalı). Yükleme sırası tests/sira.js ile denetlenir.
   YENİ ÖZELLİK: Yeni joker GM_JK/GM_JKS, yeni skin GM_SK ve gmDraw*. Test: tests/t57a_joker_skin.js ve tests/t59c_games.js. */
/* ---- v57: jokerler (bilgi kristali) ve skinler ---- */
var GM_JK={mag:{n:"Mıknatıs",t:8,d:"8 sn altınları sana çeker"},slow:{n:"Yavaşlat",t:8,d:"8 sn yol yavaşlar"},x2:{n:"×2 Puan",t:10,d:"10 sn her puan iki katı"}};
var GM_JKS=["mag","slow","x2"];
var GM_SK={
run:[
{id:"stj",n:"Stajyer",d:"Başlangıç kıyafeti",need:null,c:{sh:"@net",pn:"#2b3a67",hd:"#f1c27d",ac:"@eng"}},
{id:"hood",n:"Hoodie",d:"Kapüşonlu mor sweatshirt",need:["tc",60],c:{sh:"#7c4dff",pn:"#22204a",hd:"#f1c27d",ac:"#c9b8ff"},f:"hood"},
{id:"ninja",n:"Siber Ninja",d:"Kara kıyafet, kırmızı bandana",need:["runs",5],c:{sh:"#1d1f2b",pn:"#14151d",hd:"#f1c27d",ac:"#ff3d5a"},f:"ninja"},
{id:"admin",n:"Sistem Yöneticisi",d:"Takım elbise ve kravat",need:["kr",5],c:{sh:"#34416b",pn:"#1f2744",hd:"#f1c27d",ac:"#e53950"},f:"suit"},
{id:"astro",n:"Astronot",d:"Beyaz kıyafet, miğfer",need:["tc",300],c:{sh:"#eef2ff",pn:"#cfd6f2",hd:"#f1c27d",ac:"#27e0ff"},f:"astro"},
{id:"altin",n:"Altın Zırh",d:"Patronu iki kez yen",need:["boss",2],c:{sh:"#e0a526",pn:"#a8741a",hd:"#f1c27d",ac:"#fff2b0"},f:"gold"}],
drive:[
{id:"std",n:"Standart",d:"Başlangıç aracı",need:null,c:{b:"@net",s:"@bad",r:"@bg"}},
{id:"taksi",n:"Taksi",d:"Sarı taksi, tepe lambası",need:["tc",60],c:{b:"#ffc61a",s:"#1b1b1b",r:"#fff6c8"},f:"taxi"},
{id:"polis",n:"Devriye",d:"Mavi beyaz, çakar lamba",need:["runs",5],c:{b:"#f2f5ff",s:"#2f6bff",r:"#9fc0ff"},f:"siren"},
{id:"spor",n:"Spor",d:"Kırmızı, kanatlı, şeritli",need:["kr",5],c:{b:"#e5243b",s:"#fff",r:"#ffd0d6"},f:"spoiler"},
{id:"neon",n:"Neon Gece",d:"Siyah gövde, camgöbeği ışık",need:["tc",300],c:{b:"#12131c",s:"#27e0ff",r:"#27e0ff"},f:"neon"},
{id:"altin",n:"Altın Prototip",d:"Patronu iki kez yen",need:["boss",2],c:{b:"#e0a526",s:"#fff2b0",r:"#fff2b0"},f:"gold"}]};
var GM_PSN={tc:"altın",runs:"oyun",kr:"kristal sorusu",boss:"patron"};
function gmPS(){var p=S.gm.ps||(S.gm.ps={});["tc","runs","kr","boss","S"].forEach(function(k){p[k]=num(p[k])});return p}
function gmUnl(s){if(!s.need)return true;return gmPS()[s.need[0]]>=s.need[1]}
function gmSkinOf(kind){var L=GM_SK[kind],id=S.gm.sk&&S.gm.sk[kind],s=L.filter(function(a){return a.id===id})[0]||L[0];return gmUnl(s)?s:L[0]}
function gmColor(C,v){return v&&v.charAt(0)==="@"?C[v.slice(1)]:v}
function gmDrawRunner(x,px,py,u2,s,C,t){
  var c=s.c,sh=gmColor(C,c.sh),pn=gmColor(C,c.pn),hd=gmColor(C,c.hd),ac=gmColor(C,c.ac),f=s.f||"",sw=Math.sin(t*14)*u2*.25;
  x.save();
  x.fillStyle=pn;rr(x,px-u2*.22+sw,py-u2*.5,u2*.18,u2*.5,u2*.05);x.fill();rr(x,px+u2*.04-sw,py-u2*.5,u2*.18,u2*.5,u2*.05);x.fill();
  x.fillStyle="#fff";x.globalAlpha=.9;x.fillRect(px-u2*.24+sw,py-u2*.07,u2*.22,u2*.07);x.fillRect(px+u2*.02-sw,py-u2*.07,u2*.22,u2*.07);x.globalAlpha=1;
  if(f==="hood"){x.fillStyle=sh;x.beginPath();x.arc(px,py-u2*1.36,u2*.31,Math.PI*.95,Math.PI*2.05);x.fill()}
  x.fillStyle=sh;rr(x,px-u2*.3,py-u2*1.15,u2*.6,u2*.7,u2*.12);x.fill();
  if(f==="astro"){x.fillStyle="#cfd6f2";rr(x,px-u2*.36,py-u2*1.05,u2*.12,u2*.45,u2*.04);x.fill()}
  x.fillStyle=hd;x.beginPath();x.arc(px,py-u2*1.35,u2*.22,0,7);x.fill();
  if(f==="ninja"){x.fillStyle="#14151d";x.beginPath();x.arc(px,py-u2*1.35,u2*.22,.1,Math.PI-.1);x.fill();x.fillStyle=ac;x.fillRect(px-u2*.24,py-u2*1.46,u2*.48,u2*.08);x.beginPath();x.moveTo(px+u2*.24,py-u2*1.44);x.lineTo(px+u2*.5,py-u2*1.3+Math.sin(t*12)*u2*.05);x.lineTo(px+u2*.24,py-u2*1.38);x.fill()}
  else if(f==="hood"){x.fillStyle=sh;x.beginPath();x.arc(px,py-u2*1.38,u2*.24,Math.PI*1.02,Math.PI*1.98);x.fill();x.fillStyle=hd;x.beginPath();x.arc(px,py-u2*1.33,u2*.16,0,7);x.fill()}
  else if(f==="astro"){x.strokeStyle="#9fb0e8";x.lineWidth=Math.max(1,u2*.06);x.fillStyle="rgba(120,220,255,.28)";x.beginPath();x.arc(px,py-u2*1.35,u2*.33,0,7);x.fill();x.stroke();x.beginPath();x.moveTo(px,py-u2*1.68);x.lineTo(px,py-u2*1.85);x.stroke();x.fillStyle=ac;x.beginPath();x.arc(px,py-u2*1.87,u2*.05,0,7);x.fill()}
  else if(f==="suit"){x.fillStyle="#1a2140";x.beginPath();x.arc(px,py-u2*1.4,u2*.22,Math.PI*1.05,Math.PI*1.95);x.fill();x.fillStyle="#fff";x.beginPath();x.moveTo(px-u2*.1,py-u2*1.15);x.lineTo(px+u2*.1,py-u2*1.15);x.lineTo(px,py-u2*1.0);x.closePath();x.fill();x.fillStyle=ac;x.beginPath();x.moveTo(px-u2*.045,py-u2*1.05);x.lineTo(px+u2*.045,py-u2*1.05);x.lineTo(px+u2*.06,py-u2*.72);x.lineTo(px,py-u2*.66);x.lineTo(px-u2*.06,py-u2*.72);x.closePath();x.fill()}
  else if(f==="gold"){x.fillStyle=ac;x.beginPath();x.moveTo(px-u2*.22,py-u2*1.5);x.lineTo(px-u2*.12,py-u2*1.72);x.lineTo(px,py-u2*1.52);x.lineTo(px+u2*.12,py-u2*1.72);x.lineTo(px+u2*.22,py-u2*1.5);x.closePath();x.fill();x.globalAlpha=.55+.4*Math.sin(t*6);x.fillRect(px-u2*.28,py-u2*1.05,u2*.56,u2*.06);x.globalAlpha=1}
  else{x.fillStyle="#3b2a1a";x.beginPath();x.arc(px,py-u2*1.38,u2*.22,Math.PI*1.05,Math.PI*1.95);x.fill()}
  if(f!=="suit"&&f!=="ninja"){x.fillStyle=ac;rr(x,px-u2*.26,py-u2*1.12,u2*.52,u2*.1,u2*.04);x.fill()}
  x.restore();
}
function gmDrawCar(x,px,py,u2,s,C,t,rot){
  var c=s.c,b=gmColor(C,c.b),st=gmColor(C,c.s),rf=gmColor(C,c.r),f=s.f||"";
  x.save();x.translate(px,py);x.rotate(rot||0);
  if(f==="neon"){var g=x.createRadialGradient(0,0,u2*.1,0,0,u2*1.1);g.addColorStop(0,"rgba(39,224,255,.55)");g.addColorStop(1,"rgba(39,224,255,0)");x.fillStyle=g;x.beginPath();x.ellipse(0,-u2*.05,u2*1.05,u2*.3,0,0,7);x.fill()}
  if(f==="spoiler"){x.fillStyle=st;x.fillRect(-u2*.58,-u2*.98,u2*1.16,u2*.1);x.fillRect(-u2*.5,-u2*.9,u2*.08,u2*.14);x.fillRect(u2*.42,-u2*.9,u2*.08,u2*.14)}
  x.fillStyle=b;rr(x,-u2*.62,-u2*.85,u2*1.24,u2*.8,u2*.14);x.fill();
  if(f==="gold"){var gg=x.createLinearGradient(-u2*.6,-u2*.85,u2*.6,-u2*.05);gg.addColorStop(0,"#fff2b0");gg.addColorStop(.5,"#e0a526");gg.addColorStop(1,"#a8741a");x.fillStyle=gg;rr(x,-u2*.62,-u2*.85,u2*1.24,u2*.8,u2*.14);x.fill()}
  if(f==="spoiler"||f==="siren"||f==="taxi"||f==="neon"){x.fillStyle=st;x.globalAlpha=f==="neon"?.9:1;if(f==="spoiler"){x.fillRect(-u2*.08,-u2*.85,u2*.16,u2*.8)}else if(f==="siren"){x.fillRect(-u2*.62,-u2*.42,u2*1.24,u2*.1)}else if(f==="taxi"){for(var k=0;k<6;k++){x.fillStyle=k%2?"#fff":"#1b1b1b";x.fillRect(-u2*.62+k*u2*.2067,-u2*.2,u2*.2067,u2*.07)}}else{x.fillRect(-u2*.62,-u2*.12,u2*1.24,u2*.05)}x.globalAlpha=1}
  x.fillStyle=f==="gold"||f==="spoiler"||f==="siren"||f==="taxi"?"rgba(30,40,70,.75)":C.bg;x.globalAlpha=f==="neon"?.5:.7;rr(x,-u2*.46,-u2*.78,u2*.92,u2*.3,u2*.08);x.fill();x.globalAlpha=1;
  if(f==="neon"){x.strokeStyle=rf;x.lineWidth=Math.max(1,u2*.04);x.globalAlpha=.7+.3*Math.sin(t*5);rr(x,-u2*.62,-u2*.85,u2*1.24,u2*.8,u2*.14);x.stroke();x.globalAlpha=1}
  if(f==="taxi"){x.fillStyle="#fff";rr(x,-u2*.18,-u2*.98,u2*.36,u2*.16,u2*.04);x.fill();x.fillStyle="#1b1b1b";x.fillRect(-u2*.12,-u2*.93,u2*.24,u2*.05)}
  if(f==="siren"){var on=Math.floor(t*6)%2;x.fillStyle=on?"#ff2d4e":"#2f6bff";x.fillRect(-u2*.3,-u2*.98,u2*.28,u2*.14);x.fillStyle=on?"#2f6bff":"#ff2d4e";x.fillRect(u2*.02,-u2*.98,u2*.28,u2*.14)}
  if(f==="gold"){x.fillStyle="#fff";x.globalAlpha=.5+.5*Math.sin(t*6);x.fillRect(u2*.3,-u2*.8,u2*.1,u2*.1);x.globalAlpha=1}
  x.fillStyle=f==="neon"?"#27e0ff":C.bad;x.fillRect(-u2*.56,-u2*.32,u2*.22,u2*.12);x.fillRect(u2*.34,-u2*.32,u2*.22,u2*.12);x.fillStyle="#111";x.fillRect(-u2*.7,-u2*.2,u2*.2,u2*.24);x.fillRect(u2*.5,-u2*.2,u2*.2,u2*.24);
  x.restore();
}
function gmSkinPrev(kind,s,lock){
  var cv=h("canvas",{class:"sk-cv"+(lock?" lk":""),width:168,height:168,"aria-hidden":"true"}),x=cv.getContext("2d"),C=gmPrefs();
  if(kind==="run")gmDrawRunner(x,84,156,84,s,C,.2);else gmDrawCar(x,84,140,84,s,C,.4,0);
  return cv;
}
function gmSkinSet(kind,id){S.gm.sk=S.gm.sk||{};S.gm.skTouched=1;S.gm.sk[kind]=id;gmSave();draw()}
function gmWardrobe(){
  var ps=gmPS(),tot=0,have=0;
  var grp=["run","drive"].map(function(kind){
    var L=GM_SK[kind],cur=gmSkinOf(kind);
    return h("div",{class:"sk-g"},h("div",{class:"label"},kind==="run"?"Koşucu kıyafetleri":"Sürücü araçları"),
      h("div",{class:"sk-grid"},L.map(function(s){
        var ok=gmUnl(s),on=cur.id===s.id;tot++;if(ok)have++;
        var st=on?"Giyili":ok?"Seç":s.need[1]-Math.min(ps[s.need[0]],s.need[1])+" "+GM_PSN[s.need[0]]+" kaldı";
        return h("button",{type:"button",class:"sk-t"+(on?" on":"")+(ok?"":" lk"),disabled:!ok,"aria-pressed":on?"true":"false","aria-label":s.n+(ok?"":", kilitli"),onclick:function(){gmSkinSet(kind,s.id)}},
          gmSkinPrev(kind,s,!ok),h("b",null,s.n),h("small",null,ok?s.d:(s.need[0]==="boss"?"Patronu "+s.need[1]+" kez yen":s.need[0]==="runs"?s.need[1]+" oyun bitir":s.need[0]==="kr"?s.need[1]+" kristal sorusunu doğru bil":"Toplam "+s.need[1]+" altın topla")),
          h("span",{class:"sk-st"+(on?" on":"")},st))})))});
  return h("details",{class:"gh-set sk-w"},h("summary",null,"Gardırop: kıyafet ve araba skinleri ("+gmWdCount()+")"),h("div",{class:"small mute",style:"margin:6px 0"},"Oynadıkça yenileri açılır. Seçtiğin görünüm oyunda ve diğer cihazlarında da geçerli olur."),grp);
}
function gmWdCount(){var n=0,t=0;["run","drive"].forEach(function(k){GM_SK[k].forEach(function(s){t++;if(gmUnl(s))n++})});return n+"/"+t+" açık"}
function gmAdd(R,n){R.score+=(R.jf&&R.jf.x2>0)?n*2:n}
function gmJkRender(R){
  var jk=R.ui&&R.ui.jk;if(!jk)return;
  var items=GM_JKS.map(function(k,i){
    var n=R.jk[k],act=R.jf[k]>0,d=GM_JK[k];
    return h("button",{type:"button",class:"gm-jb j-"+k+(act?" on":"")+(n?"":" z"),disabled:!n||act,"aria-label":d.n+": "+d.d+" ("+n+" adet)",onclick:function(){gmJkUse(R,k)}},
      h("b",null,d.n),h("small",{class:"mono"},act?Math.ceil(R.jf[k])+" sn":"×"+n+" · "+(i+1)),act?h("i",{style:"width:"+Math.round(R.jf[k]/d.t*100)+"%"}):null)});
  jk.replaceChildren.apply(jk,items.concat([h("span",{class:"gm-jh"},"Mavi kristali topla, soruyu bil, joker kazan")]));
}
function gmJkUse(R,k){
  if(R.state!=="play"||R.ask||R.hold>0||R.cd>0||!R.jk[k]||R.jf[k]>0)return;
  R.jk[k]--;R.jf[k]=GM_JK[k].t;R.toast=GM_JK[k].n+" açıldı: "+GM_JK[k].d;R.tt=1.3;gmBeep(740,.12);gmBeep(990,.14);gmJkRender(R);
}
function gmJokerAsk(R,o){
  var q0=R.qs[o.gi],nm=q0?gmClass(q0):null,F=nm&&GM_FACTS[nm];if(!F)return;
  var names=Object.keys(GM_FACTS).filter(function(k){return k!==nm&&GM_FACTS[k].k!==F.k});
  var d=[];while(d.length<2&&names.length){var i=Math.floor(Math.random()*names.length);d.push(GM_FACTS[names.splice(i,1)[0]].k)}
  var opts=d.concat([F.k]);for(var a=opts.length-1;a>0;a--){var b=Math.floor(Math.random()*(a+1)),tmp=opts[a];opts[a]=opts[b];opts[b]=tmp}
  var q={q:nm+" için en önemli kural hangisi?",o:opts,a:opts.indexOf(F.k),w:F.t+" "+F.e,nd:nm,k:"jk"+nm};
  R.ask={jq:q,gi:-1};R.lock=0;R.jn=(R.jn||0)+1;
  var u=R.ui,box=u.ask,btns=opts.map(function(t,i){return h("button",{type:"button",class:"gm-ab c"+i,onclick:function(){gmPick(R,i)}},h("b",null,"ABC".charAt(i)),h("span",null,t),h("small",{class:"mono"},["←","↑","→"][i]))});
  box.replaceChildren(h("div",{class:"label gm-jlab"},"Bilgi kristali · joker sorusu"),h("div",{class:"small"},h("b",null,nm+": "),F.t),h("div",{class:"gm-aq"},q.q),h("div",{class:"gm-abs"},btns),h("div",{class:"small mute"},"Doğru bilirsen joker kazanırsın. Yanlışsa ceza yok, doğrusunu görürsün."));
  box.classList.add("on");gmHud(R);
}
function gmJkPick(R,i){
  var q=R.ask.jq,ok=i===q.a;R.ask=null;R.ui.ask.classList.remove("on");R.last=0;
  if(ok){
    R.jr=(R.jr||0)+1;gmAdd(R,25);
    var pool=GM_JKS.slice();if(R.lives<3)pool.push("heart","heart");var k=pool[Math.floor(Math.random()*pool.length)];
    if(k==="heart"){R.lives=Math.min(3,R.lives+1);R.toast="Doğru! +1 can kazandın"}
    else{R.jk[k]=Math.min(2,R.jk[k]+1);R.toast="Doğru! Joker: "+GM_JK[k].n}
    R.tt=1.8;gmBeep(660,.14);gmBeep(990,.18);gmBurst(R,0,14);R.flash=.25;R.fcol="ok";
  }else{R.toast="Doğrusu: "+q.o[q.a].slice(0,40)+(q.o[q.a].length>40?"…":"");R.tt=2.2;gmBeep(220,.2,"triangle")}
  gmEx(R,q,ok);gmHud(R);
}
function gmStart(mode){
  var G=S.gm,sn={},qs=mode==="sonsuz"?gmBuildTier(0,sn,8):gmBuild(mode);if(qs.length<4)return;
  var sp=G.speed||(S.pf.pace==="rahat"?.72:S.pf.pace==="hizli"?1.25:1),r=rngf(Date.now()%1e6),seq=[],CYC=2.0;
  qs.forEach(function(q,g){gmSeqQ(G.skin,r,q,g,seq)});
  seq.sort(function(a,b){return a.wz-b.wz});
  G.run={mode:mode,endless:mode==="sonsuz",seen:sn,skin:G.skin,qs:qs,seq:seq,si:0,objs:[],d:0,sp:sp,lives:3,coins:0,jk:{mag:0,slow:0,x2:0},jf:{mag:0,slow:0,x2:0},jr:0,jn:0,correct:0,score:0,combo:0,best:0,wrong:[],lane:0,laneF:0,jt:0,inv:0,gi:0,t:0,adj:1,shield:0,hintFor:-1,hintIdx:-1,lp:9,right:[],over:false,state:"ready",hist:[],bossHit:0,cd:0,flash:0,fcol:"",toast:"",tt:0,end:0,k:6,shake:0};
  G.stage=null;draw();
}
function gmExit(){var G=S.gm;if(G.run)G.run.over=true;G.run=null;G.stage=null;draw();window.scrollTo(0,0)}
function gmPrefs(){
  var cs=getComputedStyle(document.documentElement),g=function(n){return cs.getPropertyValue(n).trim()||"#888"};
  var tk=S.gm.trk,acc=tk==="sec"?g("--sec"):tk==="bk"?g("--bk"):tk==="eng"?g("--eng"):tk==="ccna"?g("--net"):tk==="net"?g("--tnet"):tk==="dev"?g("--tdev"):tk==="qa"?g("--qa"):null;
  return {acc:acc,star:g("--star")==="1",bk:g("--bk"),sky1:g("--sky1"),sky2:g("--sky2"),bld:g("--bld"),bld2:g("--bld2"),road:g("--panel2"),line:g("--line"),net:g("--net"),eng:g("--eng"),sec:g("--sec"),ink:g("--ink"),ok:g("--ok"),bad:g("--bad"),gold:g("--gold"),bg:g("--bg")};
}
var GM_LC=["net","eng","sec"];
function gmStage(R){
  var C=gmPrefs(),cv=h("canvas",{class:"gm-cv",width:480,height:560,"aria-label":"Oyun alanı. Soldaki, ortadaki ve sağdaki şeritlerden doğru cevabın şeridine geç."}),
    q=h("div",{class:"gm-qt"}),opts=[0,1,2].map(function(i){return h("div",{class:"gm-o c"+i},h("b",null,"ABC".charAt(i)),h("span",null,""))}),
    hud=h("div",{class:"gm-hud"}),jk=h("div",{class:"gm-jk","aria-label":"Jokerler"}),trk=h("div",{class:"gm-trk","aria-label":"Rota ilerlemesi"}),ov=h("div",{class:"gm-ov"}),ask=h("div",{class:"gm-ask","aria-live":"polite"}),ex=h("div",{class:"gm-ex","aria-live":"polite"},"Kapıdan geçince doğru cevabın açıklaması burada çıkar."),box=h("div",{class:"gm-stage"},hud,jk,trk,h("div",{class:"gm-qwrap"},q,h("div",{class:"gm-opts"},opts)),cv,ex,ask,ov);
  function lane(d){if(R.state!=="play"||R.hold>0||R.lock||R.ask)return;R.lane=Math.max(-1,Math.min(1,R.lane+d))}
  function jump(){if(R.state==="play"&&R.skin==="run"&&R.jt<=0)R.jt=.62}
  var ctl=h("div",{class:"gm-ctl"},
    h("button",{type:"button",class:"btn ghost","aria-label":"Sola geç",onclick:function(){lane(-1)}},mi("M15 6l-6 6 6 6"),h("span",null,"Sol")),
    R.skin==="run"?h("button",{type:"button",class:"btn ghost","aria-label":"Zıpla",onclick:jump},mi("M6 14l6-6 6 6"),h("span",null,"Zıpla")):h("div",{class:"gm-spd mono"},"0 km/s"),
    h("button",{type:"button",class:"btn ghost","aria-label":"Sağa geç",onclick:function(){lane(1)}},h("span",null,"Sağ"),mi("M9 6l6 6-6 6")));
  var x0=0,y0=0;
  cv.addEventListener("touchstart",function(e){var t=e.touches[0];x0=t.clientX;y0=t.clientY},{passive:true});
  cv.addEventListener("touchmove",function(e){e.preventDefault()},{passive:false});
  cv.addEventListener("touchend",function(e){var t=e.changedTouches[0],dx=t.clientX-x0,dy=t.clientY-y0;
    if(Math.abs(dx)>24&&Math.abs(dx)>Math.abs(dy))lane(dx>0?1:-1);else if(dy<-24)jump();else if(Math.abs(dx)<12&&Math.abs(dy)<12){var r=cv.getBoundingClientRect();lane(t.clientX<r.left+r.width/2?-1:1)}},{passive:true});
  R.ui={jk:jk,trk:trk,ask:ask,ex:ex,cv:cv,q:q,opts:opts,hud:hud,ov:ov,box:box,ctl:ctl,C:C,lane:lane,jump:jump};
  return h("div",{class:"panel gm-panel"},box,ctl,h("div",{class:"gm-keys small mute"},"Klavye: ← → şerit · "+(R.skin==="run"?"Boşluk zıpla · ":"")+"P duraklat · kapıda A B C ya da ← ↑ →"));
}
function gmPreview(R){
  var ts=[];R.qs.forEach(function(q){if(q.term&&ts.indexOf(q.term)<0)ts.push(q.term)});
  var tf=R.qs.some(function(q){return q.tf});
  if(!ts.length&&!tf)return null;
  return h("div",{class:"gm-pre-w"},ts.length?h("div",{class:"small mute"},"Bu turda karşına çıkacak kavramlardan bazıları:"):null,ts.length?h("div",{class:"gm-pre"},ts.slice(0,4).map(function(t){return h("span",null,t)})):null,tf?h("div",{class:"small mute",style:"margin-top:6px"},"Bazı kapılarda yalnız iki cevap var: sol Doğru, sağ Yanlış."):null);
}
function gmOverlay(R){
  var ov=R.ui.ov,G=S.gm;ov.replaceChildren();
  if(R.state==="play"){ov.classList.remove("on");return}
  ov.classList.add("on");
  if(R.state==="ready"){var ST=GM_STORY[R.mode]||GM_STORY.free;
    ov.append(h("div",{class:"gm-card gm-ready"},h("span",{class:"gm-tag"},ST.tag),
      h("h2",null,ST.n),h("div",{class:"small mute"},(R.skin==="run"?"Ağ Koşusu":"Ağ Sürüşü")+" · "+R.qs.length+" ağ noktası · paketin yolu şafaktan geceye uzanır"),
      h("p",{class:"small"},ST.brief),
      h("details",{class:"gm-hw",open:!gmSeen()},h("summary",null,"Nasıl oynanır?"),
      h("ol",{class:"gm-how"},h("li",null,h("b",null,"1"),"Kaydır ya da Sol/Sağ ile şerit değiştir. Engellerden kaç, altın topla."+(R.skin==="run"?" Alçak engelden zıplayabilirsin.":"")),
        h("li",null,h("b",null,"2"),"Kapıda yol durur. Soruyu oku, cevabına dokun. Süre yok."),
        h("li",null,h("b",null,"3"),"Yanlış cevap ve çarpma can götürür. 3 canın var; 3 doğru üst üste kalkan verir.")),
      gmPreview(R)),
      h("details",{class:"gm-hw gm-nl"},h("summary",null,"Yola çıkmadan öğren: bu turun ağ noktaları"),(function(){var seen=[],o=[];R.qs.forEach(function(q,i){var nm=gmClass(q);if(seen.indexOf(nm)<0&&GM_FACTS[nm]){seen.push(nm);o.push(h("div",{class:"small",style:"margin-bottom:6px"},h("b",null,nm+": "),GM_FACTS[nm].t))}});return o})()),
      h("button",{class:"btn big",type:"button",onclick:function(){gmSeen(1);R.state="play";R.last=0;R.cd=1.8;gmOverlay(R);if(!G.ac)gmBeep(1,.01);gmLoop(R);try{window.scrollTo({top:Math.max(0,R.ui.box.getBoundingClientRect().top+window.scrollY-10),behavior:"smooth"})}catch(e){}}},"Başla")));gmTrack(R)}
  if(R.state==="pause")ov.append(h("div",{class:"gm-card"},h("h2",null,"Duraklatıldı"),h("div",{class:"small mute"},"Burada ilerlemen kaybolmaz."),h("button",{class:"btn big",type:"button",onclick:function(){R.state="play";R.last=0;R.cd=1.2;gmOverlay(R);gmLoop(R)}},"Devam et"),h("button",{class:"btn ghost",type:"button",onclick:function(){G.mute=!G.mute;gmSave();gmOverlay(R)}},G.mute?"Sesi aç":"Sesi kapat"),h("button",{class:"btn ghost",type:"button",onclick:gmExit},"Çık")));
}
function gmLoop(R){
  if(R.loopOn)return;R.loopOn=true;
  function f(ts){
    if(S.gm.run!==R||R.over||R.state!=="play"){R.loopOn=false;return}
    if(!R.ui.cv.isConnected){R.state="pause";R.loopOn=false;return}
    var dt=Math.min(.05,R.last?(ts-R.last)/1000:.016);R.last=ts;gmStep(R,dt);gmDraw(R);
    requestAnimationFrame(f);
  }
  requestAnimationFrame(f);
}
function gmBurst(R,lane,n){R.pt=R.pt||[];for(var i=0;i<n;i++){var a=Math.random()*6.283,sp=.25+Math.random()*.6;R.pt.push({x:R.laneF*.6,y:.55,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-.35,l:.7+Math.random()*.4,c:i%3})}}
function gmAskShow(R,gi){
  var q=R.qs[gi],u=R.ui,box=u.ask;if(!q)return;
  var keys=q.tf?["←  D","→  Y"]:["←","↑","→"];
  var btns=[0,1,2].map(function(i){
    if(!q.o[i])return null;
    var b=h("button",{type:"button",class:"gm-ab c"+i,onclick:function(){gmPick(R,i)}},h("b",null,q.tf?(i===0?"D":"Y"):"ABC".charAt(i)),h("span",null,q.o[i]),h("small",{class:"mono"},q.tf?(i===0?"←":"→"):["←","↑","→"][i]));
    if(R.hintFor===R.gi&&R.hintIdx===i){b.classList.add("x");b.disabled=true}
    return b}).filter(Boolean);
  u.askBtns=[];btns.forEach(function(b){u.askBtns.push(b)});
  var nmn=q.boss?"Muhafız · "+gmClass(q):gmClass(q),F=GM_FACTS[gmClass(q)];
  box.replaceChildren(h("div",{class:"label"},(q.boss?"PATRON · ":"")+"Kapı "+(gi+1)+"/"+R.qs.length+" · cevabını seç"),
    F?h("details",{class:"gm-nodeinfo",ontoggle:function(e){if(e.target.open){R.read=R.read||{};R.read[gi]=1}}},h("summary",null,h("b",null,nmn),": "+F.t),h("div",{class:"small"},h("b",null,"Gerçek hayatta: "),F.e),h("div",{class:"small"},h("b",null,"Kural: "),F.k),h("div",{class:"small mute"},"Bunu açıp okursan doğru cevapta +20 bilgi bonusu.")):null,
    h("div",{class:"gm-aq"},q.q),h("div",{class:"gm-abs"},btns),h("div",{class:"small mute"},"Dokun ya da ok tuşlarını kullan: "+keys.join("   ")+". Süre yok, rahat düşün."));
  box.classList.add("on");gmHud(R);
}
function gmPick(R,i){
  if(!R.ask||R.hold>0)return;if(R.ask.jq){gmJkPick(R,i);return}var q=R.qs[R.ask.gi];if(!q||!q.o[i])return;if(R.hintFor===R.gi&&R.hintIdx===i)return;
  R.ask=null;R.lane=i-1;R.lock=1;R.ui.ask.classList.remove("on");R.last=0;gmBeep(500,.06);
}
function gmVib(n){try{if(!S.gm.mute&&navigator.vibrate)navigator.vibrate(n)}catch(e){}}
function gmEx(R,q,ok){var e=R.ui&&R.ui.ex;if(!e)return;e.className="gm-ex "+(ok?"ok":"bad");var F=GM_FACTS[gmClass(q)];e.replaceChildren(h("b",null,(ok?"Doğru. ":"Doğrusu: "+q.o[q.a]+". ")),document.createTextNode(String(q.w||"").slice(0,260)),F?h("div",{class:"gm-rule"},"Kural: "+F.k):null)}
function gmCur(R){return R.qs[R.gi]||null}
function gmHint(R){var q=gmCur(R);if(!q||R.hold>0||R.ask&&R.ask.jq||R.coins<5||R.hintFor===R.gi)return;var w=[0,1,2].filter(function(i){return i!==q.a});R.coins-=5;R.hintFor=R.gi;R.hintIdx=w[Math.floor(Math.random()*w.length)];gmBeep(520,.1);gmHud(R);var ab=R.ui.askBtns&&R.ui.askBtns.filter(function(b){return b.classList.contains("c"+R.hintIdx)})[0];if(ab){ab.classList.add("x");ab.disabled=true}}
function gmHud(R){
  var u=R.ui,g2=(R.hold>0&&R.gi>0)?R.gi-1:R.gi,q=R.qs[g2]||null;
  if(q){u.q.textContent=(q.boss?"PATRON · ":"")+"Kapı "+(g2+1)+"/"+R.qs.length+" · "+q.q;u.opts.forEach(function(o,i){o.lastChild.textContent=q.o[i]||"";o.firstChild.textContent=q.tf?(i===0?"D":"Y"):"ABC".charAt(i);o.classList.toggle("x",!R.hold&&R.hintFor===R.gi&&R.hintIdx===i);o.classList.toggle("e",!q.o[i])})}
  u.hud.replaceChildren.apply(u.hud,[h("span",{class:"gm-h"},[0,1,2].map(function(i){return heartSvg(i<R.lives)})),h("span",{class:"mono"},String(R.score)),h("span",{class:"mono gold"},"● "+R.coins),R.combo>1?h("span",{class:"pill ok"},"seri ×"+R.combo):null,R.endless?h("span",{class:"pill"},GM_TIER[gmTierOf(R.correct)]):null,R.shield?h("span",{class:"pill ok"},"kalkan"):null,R.hintFor===R.gi?null:h("button",{class:"btn ghost gm-x gm-hint",type:"button",disabled:R.coins<5,"aria-label":"İpucu: bir yanlış cevabı ele, 5 altın",onclick:function(){gmHint(R)}},"İpucu 5"),
    h("button",{class:"btn ghost gm-x",type:"button","aria-label":"Duraklat",onclick:function(){R.state="pause";gmOverlay(R)}},"Duraklat")].filter(Boolean));
  gmTrack(R);gmJkRender(R);
  var sp=document.querySelector(".gm-spd");if(sp)sp.textContent=Math.round(R.sp*(1+R.gi*.015)*100)+" km/sa";
}
function gmStep(R,dt){
  if(R.cd>0){R.cd-=dt;R.last=R.last;return}
  var v=.42*R.sp*R.adj*Math.min(1.5,1+R.gi*.02)*(R.jf.slow>0?.55:1);R.t+=dt;
  if(R.hold>0){R.hold-=dt;if(R.flash>0)R.flash-=dt;if(R.shake>0)R.shake-=dt;if(R.pt){R.pt.forEach(function(p){p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=.9*dt;p.l-=dt});R.pt=R.pt.filter(function(p){return p.l>0})}
    if(R.end>0){R.end-=dt;if(R.end<=0)gmFinish(R)}
    if(R.hold<=0){R.hold=0;R.last=0;R.tt=0;R.lock=0;gmHud(R);if(R.ui&&R.ui.ex)R.ui.ex.classList.remove("hold")}
    return}
  if(R.ask){if(R.flash>0)R.flash-=dt;return}
  if(R.endless&&R.qs.length-R.gi<3)gmExtend(R);
  var ng=null;R.objs.forEach(function(o){if(!ng&&o.t==="gate"&&!o.done&&!o.asked&&o.wz-R.d<=.42)ng=o});
  if(ng){ng.asked=true;R.ask=ng;R.lock=0;gmAskShow(R,ng.gi);return}
  R.d+=v*dt;
  var jany=false;GM_JKS.forEach(function(k){if(R.jf[k]>0){R.jf[k]=Math.max(0,R.jf[k]-dt);jany=true}});
  if(jany||R.jwas){R.jtk=(R.jtk||0)-dt;if(R.jtk<=0||(R.jwas&&!jany)){R.jtk=.25;gmJkRender(R)}R.jwas=jany}
  R.laneF+=(R.lane-R.laneF)*Math.min(1,dt*12);
  if(R.pt){R.pt.forEach(function(p){p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=.9*dt;p.l-=dt});R.pt=R.pt.filter(function(p){return p.l>0})}R.tr=R.tr||[];R.tr.push(R.laneF);if(R.tr.length>6)R.tr.shift();
  if(R.jt>0)R.jt=Math.max(0,R.jt-dt);if(R.inv>0)R.inv-=dt;if(R.flash>0)R.flash-=dt;if(R.tt>0)R.tt-=dt;if(R.shake>0)R.shake-=dt;
  while(R.si<R.seq.length&&R.seq[R.si].wz-R.d<1.0){R.objs.push(Object.assign({},R.seq[R.si]));R.si++}
  var lanePos=Math.round(R.laneF);if(R.ui&&R.lp!==lanePos){R.lp=lanePos;R.ui.opts.forEach(function(o,i){o.classList.toggle("on",i===lanePos+1)})}
  R.objs.forEach(function(o){
    o.z=o.wz-R.d;if(o.done)return;
    if(o.t==="co"&&R.jf.mag>0&&o.z<.55&&o.z>0){o.lane+=(R.laneF-o.lane)*Math.min(1,dt*7)}
    if(o.t==="gate"){
      if(o.z<=0){o.done=true;var q=R.qs[o.gi],ok=(lanePos+1)===q.a;o.pick=lanePos;o.ok=ok;R.hold=ok?1.1:2.6;R.lane=lanePos;
        R.tl=R.tl||{};var tt=q.t||"x";R.tl[tt]=R.tl[tt]||{ok:0,n:0};R.tl[tt].n++;if(ok)R.tl[tt].ok++;gsAnswer(q.k,ok);
        if(ok){R.correct++;R.combo++;if(R.endless&&R.correct%5===0&&R.lives<3)R.lives++;R.best=Math.max(R.best,R.combo);gmAdd(R,(q.boss?200:100)+R.combo*10);if(R.read&&R.read[o.gi]){gmAdd(R,20);R.reads=(R.reads||0)+1}R.flash=.4;R.fcol="ok";R.toast="Doğru! +"+((q.boss?200:100)+R.combo*10)+" · "+gmNode(R,o.gi)+" geçildi";if(q.boss)R.bossHit=(R.bossHit||0)+1;R.tt=1;R.right.push(q.k);R.adj=Math.min(1.2,R.adj+.03);if(R.combo===3&&!R.shield){R.shield=1;R.toast="Doğru! Kalkan kazandın";R.tt=1.6}gmBeep(660,.18);gmBeep(880,.2);gmEx(R,q,true);gmBurst(R,0,18)}
        else{R.lives--;R.combo=0;R.wrong.push(q);R.flash=.5;R.fcol="bad";R.shake=.3;R.toast=q.tf?"Doğrusu: "+q.o[q.a]:"Doğrusu: "+"ABC".charAt(q.a)+") "+(q.o[q.a].length>20?q.o[q.a].slice(0,19)+"…":q.o[q.a]);R.tt=2.2;R.adj=Math.max(.75,R.adj-.1);gmBeep(160,.3,"sawtooth");gmVib(80);gmEx(R,q,false)}
        R.hist.push(ok?1:0);R.gi++;R.lp=9;gmHud(R);if(R.lives<=0||R.gi>=R.qs.length)R.end=R.end||(R.hold+.3);if(R.ui&&R.ui.ex)R.ui.ex.classList.add("hold")}
      return}
    if(o.z<=.05&&o.z>=-.03&&Math.abs(R.laneF-o.lane)<.55){
      if(o.t==="gem"){o.done=true;gmBeep(880,.1);gmJokerAsk(R,o)}
      else if(o.t==="co"){o.done=true;R.coins++;gmAdd(R,5);gmBeep(1040,.07,"square");gmHud(R)}
      else if(o.t==="ob"&&R.inv<=0){
        if(o.kind==="low"&&R.jt>.1)return;
        if(R.shield){o.done=true;R.shield=0;R.inv=.8;R.flash=.25;R.fcol="ok";R.toast="Kalkan seni korudu";R.tt=1;gmBeep(300,.15,"triangle");gmHud(R);return}
        o.done=true;R.lives--;gmVib(60);R.combo=0;R.inv=1.1;R.shake=.35;R.flash=.35;R.fcol="bad";R.toast="Çarptın!";R.tt=1;gmBeep(120,.25,"sawtooth");gmHud(R);if(R.lives<=0)R.end=R.end||.6}}
  });
  R.objs=R.objs.filter(function(o){return o.z>-.06});
  if(R.end>0){R.end-=dt;if(R.end<=0)gmFinish(R)}
}
function gmFinish(R){
  if(R.over)return;R.over=true;R.state="over";
  var all=R.gi>=R.qs.length&&R.lives>0,xp=0;
  if(R.mode!=="free"){
    xp=Math.min(R.mode==="boss"?30:20,R.correct*2)+(all?(R.mode==="boss"?10:5):0);
    if(R.mode==="sonsuz")xp=Math.min(16,R.correct);var cur=gmDay(today()),room=Math.max(0,GM_CAP-num(cur.g_xp));xp=Math.min(xp,room);
  }
  try{var ps=gmPS(),before={};["run","drive"].forEach(function(kd){GM_SK[kd].forEach(function(sk){before[kd+sk.id]=gmUnl(sk)})});
    ps.tc+=R.coins;ps.runs++;ps.kr+=R.jr||0;if(R.mode==="boss"&&all)ps.boss++;if(gmRank(R)==="S")ps.S++;
    R.newSk=[];["run","drive"].forEach(function(kd){GM_SK[kd].forEach(function(sk){if(!before[kd+sk.id]&&gmUnl(sk))R.newSk.push((kd==="run"?"Koşucu: ":"Sürücü: ")+sk.n)})});gmSave()}catch(e){}
  gmCardsUpdate(R);try{gqMark(R.wrong.map(function(q){return [q.k,false]}).concat(R.right.map(function(k){return [k,true]})))}catch(e){}
  R.xp=xp;R.all=all;R.capped=R.mode!=="free"&&num(gmDay(today()).g_xp)>=GM_CAP;
  var p=gmDay(today()),o={g_runs:num(p.g_runs)+1,g_best:Math.max(num(p.g_best),R.score),g_ok:num(p.g_ok)+R.correct,g_tot:num(p.g_tot)+Math.min(R.gi,R.qs.length),g_coins:num(p.g_coins)+R.coins,g_xp:num(p.g_xp)+xp};if(R.endless)o.g_endbest=Math.max(num(p.g_endbest),R.correct);
  if(R.mode==="boss"&&all)o.g_boss=true;
  var md=gmMDone(o),nb=Math.max(0,md-num(p.g_mdone));R.bonus=nb*5;if(nb>0){o.g_mdone=md;o.g_xp+=R.bonus}
  var wk=gmWeek(),played=wk.dates.some(function(d){return d===today()&&num(gmDay(d).g_runs)>0}),days=wk.days+(played?0:1),bossOk=wk.boss||(R.mode==="boss"&&all),hasChest=wk.dates.some(function(d){return gmDay(d).g_chest});
  if(days>=4&&bossOk&&!hasChest){o.g_chest=true;o.g_xp+=20;R.chest=true}
  if(S.db&&S.me&&S.canWrite&&!S.guest&&(R.wrong.length||R.right.length)){var me=myLeague()||{id:S.me},ri=R.right.filter(function(k){return /^qb\d+$/.test(k)}).map(function(k){return +k.slice(2)}),wi=R.wrong.filter(function(q){return /^qb\d+$/.test(q.k)}).map(function(q){return +q.k.slice(2)});
    var miss=(Array.isArray(me.miss)?me.miss:[]).filter(function(m){return m&&ri.indexOf(m.i)<0&&wi.indexOf(m.i)<0});wi.forEach(function(i){miss.push({i:i,d:today()})});saveMe({miss:miss.slice(-20),qst:qstPack()})}
  setProg(o);gmBeep(all?880:330,.4);
  draw();
}
/* --- çizim --- */
function gmDraw(R){
  var u=R.ui,cv=u.cv,C=u.C,cs=cv.clientWidth||480,dpr=Math.min(2,window.devicePixelRatio||1),W=Math.round(cs*dpr),H=Math.round(Math.max(260,cs*.95)*dpr);
  if(cv.width!==W||cv.height!==H){cv.width=W;cv.height=H}
  var x=cv.getContext("2d"),hor=H*.3,yb=H*.8,cx=W/2,lw=W*.25,k=R.k;
  var sh=R.shake>0?(Math.random()-.5)*8*dpr:0;
  x.save();x.translate(sh,0);
  function S_(z){return 1/(1+z*k)}
  function Y(s){return hor+(yb-hor)*s}
  var g=x.createLinearGradient(0,0,0,hor);g.addColorStop(0,C.sky1);g.addColorStop(1,C.sky2);x.fillStyle=g;x.fillRect(-20,0,W+40,hor+1);
  var pr=Math.min(1,R.d/Math.max(1,R.qs.length*2)),KF=[[0,255,170,100,.34],[.35,255,235,160,.10],[.7,255,100,90,.36],[1,15,25,90,.46]],ka=KF[0],kb=KF[1];
  for(var ki=0;ki<KF.length-1;ki++)if(pr>=KF[ki][0]){ka=KF[ki];kb=KF[ki+1]}
  var kt=Math.max(0,Math.min(1,(pr-ka[0])/Math.max(.001,kb[0]-ka[0])));
  x.fillStyle="rgba("+Math.round(ka[1]+(kb[1]-ka[1])*kt)+","+Math.round(ka[2]+(kb[2]-ka[2])*kt)+","+Math.round(ka[3]+(kb[3]-ka[3])*kt)+","+(ka[4]+(kb[4]-ka[4])*kt)+")";x.fillRect(-20,0,W+40,hor+1);
  var night=Math.max(0,Math.min(1,(pr-.62)/.3));
  if(night>0){x.fillStyle="#fff";for(var sn=0;sn<30;sn++){var snx=((sn*61)%100)/100*W,sny=((sn*29)%100)/100*hor*.75;x.globalAlpha=night*(.3+.4*Math.sin(R.t*2+sn));x.fillRect(snx,sny,dpr*1.6,dpr*1.6)}x.globalAlpha=1}
  var sx0=W*(.12+.76*pr),sy0=hor*(.66-.46*Math.sin(pr*Math.PI));
  if(pr<.82){x.fillStyle=C.gold;x.globalAlpha=.5;x.beginPath();x.arc(sx0,sy0,hor*.17,0,7);x.fill();x.globalAlpha=1}
  else{x.fillStyle="#e9edff";x.globalAlpha=.75;x.beginPath();x.arc(W*.8,hor*.3,hor*.12,0,7);x.fill();x.fillStyle="rgba(15,25,90,.9)";x.beginPath();x.arc(W*.8+hor*.05,hor*.3-hor*.02,hor*.1,0,7);x.fill();x.globalAlpha=1}
  x.fillStyle="#fff";for(var cl=0;cl<4;cl++){var clx=((cl*.29+R.t*.006*(1+cl*.4))%1.3-.15)*W,cly=hor*(.2+cl*.13),clw=hor*(.34+cl*.05);x.globalAlpha=(.10+.06*(cl%2))*(1-night*.7);x.beginPath();x.ellipse(clx,cly,clw,clw*.2,0,0,7);x.ellipse(clx+clw*.5,cly-clw*.1,clw*.55,clw*.18,0,0,7);x.fill()}x.globalAlpha=1;
  if(C.star){x.fillStyle=C.ink;for(var st=0;st<26;st++){var sx=((st*97)%100)/100*W,sy=((st*53)%100)/100*hor*.8,tw=.35+.35*Math.sin(R.t*2+st);x.globalAlpha=tw;x.fillRect(sx,sy,dpr*1.5,dpr*1.5)}x.globalAlpha=1}
  if(C.acc){var ag=x.createLinearGradient(0,hor*.55,0,hor);ag.addColorStop(0,"transparent");ag.addColorStop(1,C.acc);x.globalAlpha=.22;x.fillStyle=ag;x.fillRect(0,hor*.55,W,hor*.45);x.globalAlpha=1}
  x.fillStyle=C.bld;x.fillRect(-20,hor,W+40,H-hor);
  /* uzak şehir */
  for(var i=0;i<14;i++){var bw=W/14,bh=hor*(.15+((i*37)%10)/40);x.fillStyle=C.bld2;x.fillRect(i*bw,hor-bh,bw-3,bh)}
  /* yol */
  var sF=S_(1.2),sN=S_(-.1);
  x.fillStyle=C.road;x.beginPath();x.moveTo(cx-1.5*lw*sF,Y(sF));x.lineTo(cx+1.5*lw*sF,Y(sF));x.lineTo(cx+1.5*lw*sN,Y(sN));x.lineTo(cx-1.5*lw*sN,Y(sN));x.closePath();x.fill();
  x.strokeStyle=C.ink;x.globalAlpha=.55;x.lineWidth=2*dpr;
  [-1.5,1.5].forEach(function(e){x.beginPath();x.moveTo(cx+e*lw*sF,Y(sF));x.lineTo(cx+e*lw*sN,Y(sN));x.stroke()});
  x.globalAlpha=.16+.06*Math.sin(R.t*3);x.strokeStyle=C.net;x.lineWidth=7*dpr;[-1.5,1.5].forEach(function(e){x.beginPath();x.moveTo(cx+e*lw*sF,Y(sF));x.lineTo(cx+e*lw*sN,Y(sN));x.stroke()});
  x.strokeStyle=C.ink;x.globalAlpha=.4;
  var step=.12,off=R.d%step;
  for(var z=-.1+(-off);z<1.2;z+=step){[-.5,.5].forEach(function(e){var z1=Math.max(-.05,z),z2=z+.05;if(z2<-.05)return;var s1=S_(z1),s2=S_(z2);x.lineWidth=Math.max(1,3*s1*dpr*2);x.beginPath();x.moveTo(cx+e*lw*s1,Y(s1));x.lineTo(cx+e*lw*s2,Y(s2));x.stroke()})}
  x.globalAlpha=1;
  /* yan binalar */
  var bs=.14,boff=R.d%bs,bi=Math.floor(R.d/bs);
  for(var zz=1.2;zz>-.1;zz-=bs){var zr=zz-boff,s=S_(zr),idx=bi+Math.round(zz/bs);if(s>1.5)continue;
    [-1,1].forEach(function(sd){var hh=lw*s*(1+((idx*7+(sd>0?3:0))%5)*.35),ww=lw*s*.9,bx=cx+sd*(2.1*lw*s)+(sd>0?0:-ww)+sd*ww*.25;
      x.fillStyle=C.bld2;x.fillRect(bx,Y(s)-hh,ww,hh);x.fillStyle=(idx+sd)%3?(C.acc||C.net):C.eng;x.globalAlpha=.45;x.fillRect(bx+ww*.2,Y(s)-hh*.8,ww*.18,hh*.1);x.fillRect(bx+ww*.6,Y(s)-hh*.5,ww*.18,hh*.1);x.globalAlpha=1})}
  /* lambalar */
  for(var lz=1.2;lz>-.1;lz-=bs){var lr=lz-boff,ls=S_(lr);if(ls>1.5)continue;[-1,1].forEach(function(sd){var lx=cx+sd*1.62*lw*ls,ly=Y(ls),lh=lw*ls*.95;x.strokeStyle=C.ink;x.globalAlpha=.5;x.lineWidth=Math.max(1,lw*ls*.05);x.beginPath();x.moveTo(lx,ly);x.lineTo(lx,ly-lh);x.stroke();x.globalAlpha=.35+.15*night;x.fillStyle=C.gold;x.beginPath();x.arc(lx,ly-lh,Math.max(1.5,lw*ls*.1),0,7);x.fill();x.globalAlpha=.07+.08*night;x.beginPath();x.arc(lx,ly-lh,Math.max(3,lw*ls*.38),0,7);x.fill();x.globalAlpha=1})}
  /* nesneler */
  R.objs.slice().sort(function(a,b){return b.z-a.z}).forEach(function(o){
    if(o.done&&o.t!=="gate")return;var s=S_(o.z);if(o.z>1.05||s>1.4)return;var y=Y(s),ox=cx+(o.lane||0)*lw*s,u1=lw*s;
    if(o.t==="gem"){var gy=y-u1*(.55+.06*Math.sin(R.t*4+o.wz)),gr=u1*.26;x.save();x.translate(ox,gy);var gg2=x.createRadialGradient(0,0,gr*.2,0,0,gr*2.2);gg2.addColorStop(0,"rgba(39,224,255,.55)");gg2.addColorStop(1,"rgba(39,224,255,0)");x.fillStyle=gg2;x.fillRect(-gr*2.2,-gr*2.2,gr*4.4,gr*4.4);x.fillStyle="#27e0ff";x.strokeStyle="#fff";x.lineWidth=Math.max(1,gr*.12);x.beginPath();x.moveTo(0,-gr*1.1);x.lineTo(gr*.9,-gr*.2);x.lineTo(0,gr*1.0);x.lineTo(-gr*.9,-gr*.2);x.closePath();x.fill();x.stroke();x.fillStyle="rgba(255,255,255,.6)";x.beginPath();x.moveTo(0,-gr*1.1);x.lineTo(gr*.35,-gr*.2);x.lineTo(0,gr*.2);x.lineTo(-gr*.35,-gr*.2);x.closePath();x.fill();if(gr>7){x.fillStyle="#0b1d3a";x.font="900 "+Math.round(gr*.9)+"px system-ui,sans-serif";x.textAlign="center";x.textBaseline="middle";x.fillText("?",0,gr*.05)}x.restore()}
    else if(o.t==="co"){x.fillStyle=C.gold;x.beginPath();x.ellipse(ox,y-u1*.5,Math.max(u1*.03,u1*.17*Math.abs(Math.cos(R.t*6+o.wz*20))),u1*.17,0,0,7);x.fill();x.strokeStyle=C.bg;x.lineWidth=Math.max(1,u1*.03);x.stroke()}
    else if(o.t==="ob"){
      if(R.skin==="run"){
        if(o.kind==="low"){x.fillStyle=C.bad;x.fillRect(ox-u1*.4,y-u1*.38,u1*.8,u1*.16);x.fillStyle=C.ink;x.fillRect(ox-u1*.4,y-u1*.38,u1*.1,u1*.38);x.fillRect(ox+u1*.3,y-u1*.38,u1*.1,u1*.38)}
        else{x.fillStyle=C.bad;x.fillRect(ox-u1*.4,y-u1*.9,u1*.8,u1*.9);x.fillStyle=C.ink;for(var j=0;j<3;j++)x.fillRect(ox-u1*.4,y-u1*.9+j*u1*.3+u1*.05,u1*.8,u1*.08)}}
      else{var col=[C.sec,C.eng,C.net][(Math.abs(Math.round(o.wz*10)))%3];
        x.fillStyle=col;rr(x,ox-u1*.34,y-u1*.52,u1*.68,u1*.5,u1*.08);x.fill();x.fillStyle=C.bg;x.globalAlpha=.6;x.fillRect(ox-u1*.24,y-u1*.46,u1*.48,u1*.16);x.globalAlpha=1;x.fillStyle=C.bad;x.fillRect(ox-u1*.3,y-u1*.2,u1*.12,u1*.07);x.fillRect(ox+u1*.18,y-u1*.2,u1*.12,u1*.07);x.fillStyle="#111";x.fillRect(ox-u1*.34,y-u1*.06,u1*.14,u1*.08);x.fillRect(ox+u1*.2,y-u1*.06,u1*.14,u1*.08)}}
    else if(o.t==="gate"){
      var q=R.qs[o.gi];if(!q)return;var gh=u1*1.05;
      if(!o.done&&o.z<.6){x.fillStyle=q.boss?C.bad:C.gold;x.globalAlpha=(.1+.08*Math.sin(R.t*8))*(1-o.z/.6);x.fillRect(cx-1.5*u1,y-gh,3*u1,gh+u1*.3);x.globalAlpha=1}
      x.fillStyle=C.ink;x.globalAlpha=.8;x.fillRect(cx-1.5*u1-u1*.04,y-gh-u1*.08,3*u1+u1*.08,u1*.08);x.globalAlpha=1;
      if(u1>16*dpr)gmIcon(x,gmNode(R,o.gi),cx,y-gh-u1*.62,u1*.32,q.boss?C.bad:C.net,C.ink,C.gold,C.bad);
      if(u1>26*dpr){x.fillStyle=q.boss?C.gold:C.ink;x.font="800 "+Math.max(9*dpr,u1*.2)+"px system-ui,sans-serif";x.textAlign="center";x.textBaseline="alphabetic";x.fillText((q.boss?"★ ":"")+gmNode(R,o.gi),cx,y-gh-u1*.16)}
      if(q.boss){x.strokeStyle=C.gold;x.lineWidth=Math.max(2,u1*.05);x.strokeRect(cx-1.5*u1,y-gh-u1*.03,3*u1,gh+u1*.03)}
      for(var l=0;l<3;l++){var gx=cx+(l-1)*u1,col2=C[GM_LC[l]];
        if(!q.o[l]){x.fillStyle=C.line;x.globalAlpha=.25;x.fillRect(gx-u1*.44,y-gh,u1*.88,gh);x.globalAlpha=1;continue}
        x.fillStyle=col2;x.globalAlpha=o.done?.35:.92;x.fillRect(gx-u1*.44,y-gh,u1*.88,gh);x.globalAlpha=1;
        x.fillStyle=C.bg;x.font="800 "+Math.max(10,u1*.55)+"px system-ui,sans-serif";x.textAlign="center";x.textBaseline="middle";x.fillText(q.tf?(l===0?"D":"Y"):"ABC".charAt(l),gx,y-gh*.5);
        if(o.done&&o.pick!==undefined){var isP=(l-1)===o.pick,isC=l===q.a;if(isC||isP){x.lineWidth=Math.max(2,u1*.06);x.strokeStyle=isC?C.ok:C.bad;x.globalAlpha=1;x.strokeRect(gx-u1*.44,y-gh,u1*.88,gh);if(isC){x.fillStyle=C.ok;x.globalAlpha=.35;x.fillRect(gx-u1*.44,y-gh,u1*.88,gh);x.globalAlpha=1}}}}
    }
  });
  if(R.tr&&R.tr.length>1){for(var ti=0;ti<R.tr.length-1;ti++){var tx=cx+R.tr[ti]*lw;x.fillStyle=C.acc||C.net;x.globalAlpha=.05+ti*.025;x.beginPath();x.ellipse(tx,yb-lw*.2,lw*.16,lw*.3,0,0,7);x.fill()}x.globalAlpha=1}
  /* oyuncu */
  var px=cx+R.laneF*lw,jh=R.jt>0?Math.sin((1-R.jt/.62)*Math.PI)*lw*.7:0,u2=lw*.42,py=yb-jh,blink=R.inv>0&&Math.floor(R.t*14)%2===0;
  var pg=x.createRadialGradient(px,py-u2*.5,u2*.1,px,py-u2*.5,u2*1.5);pg.addColorStop(0,C.net);pg.addColorStop(1,"transparent");x.globalAlpha=.22+(R.combo>=3?.12:0);x.fillStyle=pg;x.fillRect(px-u2*1.6,py-u2*2.1,u2*3.2,u2*3.2);x.globalAlpha=1;
  x.fillStyle="rgba(0,0,0,.35)";x.beginPath();x.ellipse(px,yb+u2*.05,u2*.55*(1-jh/(lw*2)),u2*.14,0,0,7);x.fill();
  if(!blink){
    var SKN=R.sk||(R.sk=gmSkinOf(R.skin));
    if(R.skin==="run")gmDrawRunner(x,px,py,u2,SKN,C,R.t);else gmDrawCar(x,px,py,u2,SKN,C,R.t,(R.lane-R.laneF)*.18);
  }
  if(R.pt){R.pt.forEach(function(p){x.fillStyle=[C.gold,C.ok,C.acc||C.net][p.c];x.globalAlpha=Math.max(0,Math.min(1,p.l));x.fillRect(cx+p.x*lw*2-dpr*2,H*p.y-dpr*2,dpr*4,dpr*4)});x.globalAlpha=1}
  if(R.jf.mag>0){x.strokeStyle="#b36bff";x.lineWidth=2.5*dpr;x.setLineDash([6*dpr,6*dpr]);x.globalAlpha=.8;x.beginPath();x.arc(px,py-u2*.7,u2*(1.25+.1*Math.sin(R.t*8)),R.t*3,R.t*3+6.283);x.stroke();x.setLineDash([]);x.globalAlpha=1}
  if(R.jf.x2>0){x.fillStyle=C.gold;x.font="900 "+Math.round(20*dpr)+"px system-ui,sans-serif";x.textAlign="center";x.textBaseline="middle";x.globalAlpha=.9;x.fillText("×2",px+u2*.75,py-u2*1.6-Math.sin(R.t*5)*3*dpr);x.globalAlpha=1}
  if(R.jf.slow>0){x.strokeStyle="#7fd4ff";x.lineWidth=dpr*1.5;x.globalAlpha=.35;for(var sl=0;sl<6;sl++){var sly=hor+((R.t*.5+sl*.17)%1)*(H-hor);x.beginPath();x.moveTo(cx-lw*1.4,sly);x.lineTo(cx-lw*0.9,sly);x.moveTo(cx+lw*0.9,sly);x.lineTo(cx+lw*1.4,sly);x.stroke()}x.globalAlpha=1}
  if(R.shield){x.strokeStyle=C.ok;x.lineWidth=3*dpr;x.globalAlpha=.8;x.beginPath();x.arc(px,py-u2*.7,u2*.95,0,7);x.stroke();x.globalAlpha=1}
  if(R.combo>=3){x.strokeStyle=C.ink;x.globalAlpha=.25;x.lineWidth=dpr*1.5;for(var si=0;si<8;si++){var sa=((R.t*2+si*.37)%1),sx=cx+(si%2?1:-1)*(lw*(.6+si*.17)),sy=hor+(H-hor)*sa;x.beginPath();x.moveTo(sx,sy);x.lineTo(sx+(si%2?1:-1)*lw*.08*sa,sy+lw*.35*sa);x.stroke()}x.globalAlpha=1}
  x.restore();
  if(R.flash>0){x.fillStyle=R.fcol==="ok"?C.ok:C.bad;x.globalAlpha=Math.min(.35,R.flash);x.fillRect(0,0,W,H);x.globalAlpha=1}
  if(R.cd>0){var cn=Math.ceil(R.cd/.6);x.fillStyle="rgba(0,0,0,.45)";x.fillRect(0,0,W,H);x.font="900 "+Math.round(96*dpr)+"px system-ui,sans-serif";x.textAlign="center";x.textBaseline="middle";x.fillStyle="#fff";x.fillText(String(cn),cx,H*.45);x.font="800 "+Math.round(16*dpr)+"px system-ui,sans-serif";x.fillText(R.hist.length?"Devam ediyoruz":"Hazır ol",cx,H*.45+70*dpr)}
  if(R.tt>0&&R.toast){x.font="800 "+Math.round(20*dpr)+"px system-ui,sans-serif";x.textAlign="center";x.fillStyle="rgba(0,0,0,.55)";var tw=x.measureText(R.toast).width+24*dpr;rr(x,cx-tw/2,H*.1,tw,32*dpr,10*dpr);x.fill();x.fillStyle="#fff";x.textBaseline="middle";x.fillText(R.toast,cx,H*.1+16*dpr)}
}
document.addEventListener("visibilitychange",function(){var R=S.gm&&S.gm.run;if(document.hidden&&R&&R.state==="play"&&R.ui&&R.ui.ov){R.state="pause";gmOverlay(R)}});
function rr(x,a,b,w,hh,r){x.beginPath();x.moveTo(a+r,b);x.arcTo(a+w,b,a+w,b+hh,r);x.arcTo(a+w,b+hh,a,b+hh,r);x.arcTo(a,b+hh,a,b,r);x.arcTo(a,b,a+w,b,r);x.closePath()}
document.addEventListener("keydown",function(e){
  var R=S.gm.run;if(!R||R.state!=="play"||tab!=="oyun"||!R.ui)return;
  if(e.key==="p"||e.key==="P"||e.key==="Escape"){R.state="pause";gmOverlay(R);e.preventDefault();return}
  if(R.ask){var q0=R.qs[R.ask.gi],mp=e.key==="ArrowLeft"||e.key==="a"||e.key==="1"?0:(e.key==="ArrowUp"||e.key==="ArrowDown"||e.key==="b"||e.key==="2")?1:(e.key==="ArrowRight"||e.key==="d"||e.key==="c"||e.key==="3")?2:-1;
    if(q0&&q0.tf&&mp===1)mp=-1;if(mp>=0){gmPick(R,mp);e.preventDefault()}return}
  if(e.key==="ArrowLeft"||e.key==="a"){R.ui.lane(-1);e.preventDefault()}
  else if(e.key==="ArrowRight"||e.key==="d"){R.ui.lane(1);e.preventDefault()}
  else if(e.key==="ArrowUp"||e.key===" "){R.ui.jump();e.preventDefault()}
  else if(e.key==="1"||e.key==="2"||e.key==="3"){gmJkUse(R,GM_JKS[+e.key-1]);e.preventDefault()}
});
function gmStars(R){var n=Math.max(1,Math.min(R.gi,R.qs.length)),p=R.correct/n;return R.lives>0&&R.gi>=R.qs.length?(p>=.9?3:p>=.7?2:1):(p>=.7?2:1)}
function gmBreak(R){
  var tl=R.tl||{},ks=Object.keys(tl);if(!ks.length)return null;
  var weak=null;ks.forEach(function(k){var a=tl[k];if(a.n>=2&&a.ok/a.n<.7&&(!weak||a.ok/a.n<tl[weak].ok/tl[weak].n))weak=k});
  var go=null;
  if(ATLAS_MAP[weak])go=function(){S.at.tr=weak;S.at.g="";S.at.open=null;S.at.q="";S.les.view="atlas";goTab("ders")};
  else if(weak==="ccna"||weak==="eng")go=function(){S.at2.sec="alistirma";goTab("atolye")};
  return h("div",{class:"lbox"},h("div",{class:"label"},"Konu konu sonuç"),h("div",{class:"gm-lv"},ks.map(function(k){var a=tl[k];return h("div",{class:"gm-l"},h("span",null,GM_TN[k]||k),h("span",{class:"xpbar"},h("i",{style:"width:"+Math.round(a.ok/a.n*100)+"%"})),h("small",{class:"mute"},a.ok+"/"+a.n))})),
    weak?h("p",{style:"margin:6px 0 0"},"En çok zorlandığın: "+(GM_TN[weak]||weak)+". Birkaç dakika çalışıp tekrar dene."):h("p",{style:"margin:6px 0 0"},"Dengeli gidiyorsun."),
    go?h("button",{class:"btn ghost",type:"button",onclick:go},"Bu konuyu çalış"):null);
}
function gmResults(R){
  var pct=R.qs.length?Math.round(R.correct/Math.max(1,Math.min(R.gi,R.qs.length))*100):0;
  var title=R.all?(R.mode==="boss"?"Patron yenildi!":"Koşuyu bitirdin!"):"Koşu bitti";
  var tale=R.mode==="en"?(R.all?"Ofis gününü sorunsuz bitirdin, mesajların hepsi yerine ulaştı.":"Gün yarıda kaldı. Hatalardan öğrenip yeniden dene."):R.all?(R.mode==="boss"?"Firewall Muhafızı yıkıldı, paket hedef sunucuya sızdı.":"Paket hedef sunucuya sağ salim ulaştı."):(R.lives<=0?"Paket yolda kayboldu. Hatalardan öğrenip yeniden gönder.":"Hat yarıda kaldı.");
  var rk=gmRank(R),np=Math.min(R.gi,R.qs.length);
  return h("div",{class:"panel gm-res"},h("div",{class:"label"},R.skin==="run"?"Ağ Koşusu":"Ağ Sürüşü"),h("h2",null,title),h("div",{class:"gm-tale"},h("span",{class:"gm-rk r"+rk},rk),h("span",null,tale,h("small",{class:"mute"},np+" / "+R.qs.length+" ağ noktası geçildi"))),h("div",{class:"gm-star","aria-label":gmStars(R)+" yıldız"},"★★★".slice(0,gmStars(R))+"☆☆☆".slice(0,3-gmStars(R))),
    h("div",{class:"gm-grid"},[["Skor",R.score],["Doğru",R.correct+"/"+Math.min(R.gi,R.qs.length)],["Altın",R.coins],["En iyi seri","×"+R.best],["Kazanılan XP",R.mode==="free"?"—":"+"+R.xp]].map(function(a){return h("div",{class:"kcell"},h("small",{class:"mute"},a[0]),h("b",{class:"mono"},String(a[1])))})),
    R.endless?h("div",{class:"lbox"},h("p",{style:"margin:0"},"Sonsuz sefer · kademe: "+GM_TIER[gmTierOf(R.correct)]+" · "+R.correct+" doğru. XP ilk 16 doğru cevap için verilir, sonrası rekor içindir.")):null,
    R.jn?h("div",{class:"lbox"},h("p",{style:"margin:0"},"Bilgi kristali: "+R.jn+" sorudan "+(R.jr||0)+" doğru"+(R.jr?" · joker kazandın":""))):null,
    R.newSk&&R.newSk.length?h("div",{class:"lbox sk-new"},h("div",{class:"label"},"Yeni skin açıldı"),R.newSk.map(function(n){return h("p",{style:"margin:4px 0;font-weight:700"},n)}),h("button",{class:"btn ghost",type:"button",onclick:function(){S.gtab="arcade";gmExit()}},"Gardıroba bak")):null,
    R.bonus?h("div",{class:"lbox"},h("p",{style:"margin:0"},"Günlük görev bonusu: +"+R.bonus+" XP")):null,R.chest?h("div",{class:"lbox"},h("p",{style:"margin:0;font-weight:600"},"Haftalık sandık açıldı: +20 XP. Haftanın şampiyonusun."),h("p",{class:"small mute",style:"margin:4px 0 0"},"4 gün oynadın ve Patron’u yendin.")):null,R.capped?h("div",{class:"small mute"},"Bugünkü oyun XP sınırına ulaştın (en çok "+GM_CAP+"). Serbest modda yine oynayabilirsin."):null,
    (R.newCards&&R.newCards.length)||(R.upCards&&R.upCards.length)||R.reads?h("div",{class:"lbox"},h("div",{class:"label"},"Bu turdan öğrendiklerin"),R.newCards&&R.newCards.length?h("p",{style:"margin:4px 0"},"Yeni kart: "+R.newCards.join(", ")):null,R.upCards&&R.upCards.length?h("p",{style:"margin:4px 0"},"Kart seviyesi yükseldi: "+R.upCards.join(", ")):null,R.reads?h("p",{style:"margin:4px 0"},"Bilgi bonusu: "+R.reads+" kartı okuyup doğru cevapladın (+"+R.reads*20+" puan)."):null,h("button",{class:"btn ghost",type:"button",onclick:function(){S.gtab="kart";gmExit()}},"Kartlarıma bak")):null,
    gmBreak(R),R.wrong.length?h("div",{class:"gm-wrong"},h("h3",null,"Doğrusu şuydu"),R.wrong.map(function(q){return h("div",{class:"lbox"},h("p",{style:"margin:0 0 4px;font-weight:600"},q.q),h("p",{style:"margin:0"},"Doğru: "+q.o[q.a]),q.w?h("p",{class:"small mute",style:"margin:4px 0 0"},q.w):null,qbFlagBtn(q))})):h("p",{style:"margin:0"},"Hepsi doğru. Harika."),
    h("div",{class:"row"},h("button",{class:"btn",type:"button",onclick:function(){gmStart(R.mode)}},"Tekrar oyna"),h("button",{class:"btn ghost",type:"button",onclick:gmExit},"Oyun alanına dön")));
}

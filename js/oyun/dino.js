"use strict";
/* ---- v59: sonsuz kademe soruları ve Dino Koşusu ---- */
var GM_TIER=["Çırak","Kalfa","Usta","Üstat","Efsane"];
function gmTierOf(n){return Math.min(4,Math.floor(n/8))}
function gmBuildTier(tier,seen,n){
  var r=rngf(Math.floor(Math.random()*1e9)),GT=S.gm.trk||"all",ds=tier<=0?[1]:tier===1?[1,2]:tier===2?[2]:tier===3?[2,3]:[3],pool=[];
  QB.forEach(function(q,i){if(q.t==="_"||ds.indexOf(q.d)<0)return;if(GT!=="all"&&q.t!==GT)return;pool.push(i)});
  var fresh=pool.filter(function(i){return !seen[i]});if(fresh.length<n){pool.forEach(function(i){delete seen[i]});fresh=pool}
  var out=[];shuf(fresh,r).slice(0,n).forEach(function(i){seen[i]=1;var q=gmQB(i,r,r()<.18);if(q&&q.o.length>=3)out.push(q)});
  return out;
}
function gmSeqQ(skin,r,q,g,seq){
  var CYC=2.0,b=g*CYC,L1=Math.floor(r()*3)-1,L2=Math.floor(r()*3)-1,kind=skin==="run"&&r()<.5?"low":"tall";
  seq.push({wz:b+.45,t:"ob",kind:kind,lane:L1});
  if(r()<.45){var alt=[-1,0,1].filter(function(l){return l!==L1});seq.push({wz:b+.45,t:"ob",kind:"tall",lane:alt[Math.floor(r()*2)]})}
  var free=[-1,0,1].filter(function(l){return !seq.some(function(o){return o.t==="ob"&&o.wz===b+.45&&o.lane===l})});
  var cl=free[Math.floor(r()*free.length)];for(var c=0;c<4;c++)seq.push({wz:b+.75+c*.07,t:"co",lane:cl});
  seq.push({wz:b+1.05,t:"ob",kind:kind==="low"?"tall":"low",lane:L2});
  if(skin!=="run")seq[seq.length-1].kind="tall";
  seq.push({wz:b+1.65,t:"gate",gi:g});
  if(g%2===1&&GM_FACTS[gmClass(q)])seq.push({wz:b+.2,t:"gem",lane:Math.floor(r()*3)-1,gi:g});
}
function gmExtend(R){
  if(!R.endless)return;
  var add=gmBuildTier(gmTierOf(R.correct),R.seen,8),g0=R.qs.length,ns=[],r=rngf(Date.now()%1e6+g0);
  add.forEach(function(q,k){R.qs.push(q);gmSeqQ(R.skin,r,q,g0+k,ns)});
  ns.sort(function(a,b){return a.wz-b.wz});ns.forEach(function(o){R.seq.push(o)});
}
/* Dino */
var DN_KEY="ya_dino";
function dnBest(){try{return num(localStorage.getItem(DN_KEY))}catch(e){return 0}}
function dnSaveBest(v){if(v>dnBest()){try{localStorage.setItem(DN_KEY,String(v))}catch(e){}}}
S.dn=S.dn||null;
function dnNew(){
  var cv=h("canvas",{class:"dn-cv",width:480,height:200,"aria-label":"Dino koşusu. Zıpla ya da eğil."}),
    D={cv:cv,state:"ready",y:0,vy:0,duck:false,x:0,sc:0,v:250,obs:[],nx:420,lives:3,inv:0,t:0,ok:0,no:0,seen:{},qs:[],gate:450,ask:null,tier:0,shield:0,best:dnBest(),msg:"",over:false,loop:false,last:0,askbox:h("div",{class:"panel dn-ask",hidden:true}),res:h("div",{class:"dn-res"})};
  var tid=null;
  function jump(){if(D.state==="ready"){dnGo(D);return}if(D.state!=="play")return;if(D.y===0&&!D.duck){D.vy=-540;try{gmBeep(520,.05,"square")}catch(e){}}}
  function duck(on){if(D.state==="play")D.duck=on}
  var y0=0;
  cv.addEventListener("touchstart",function(e){y0=e.touches[0].clientY;e.preventDefault()},{passive:false});
  cv.addEventListener("touchend",function(e){var dy=e.changedTouches[0].clientY-y0;if(dy>28){D.duck=true;setTimeout(function(){D.duck=false},520)}else jump();e.preventDefault()},{passive:false});
  cv.addEventListener("mousedown",function(){jump()});
  D.jump=jump;D.duckSet=duck;
  if(!window.__dnKeys){window.__dnKeys=1;document.addEventListener("keydown",function(e){var d=S.dn;if(!d||tab!=="oyun")return;if(e.key===" "||e.key==="ArrowUp"){e.preventDefault();d.jump()}else if(e.key==="ArrowDown"){e.preventDefault();d.duckSet(true)}});
    document.addEventListener("keyup",function(e){var d=S.dn;if(d&&e.key==="ArrowDown")d.duckSet(false)})}
  return D;
}
function dnGo(D){D.state="play";D.last=0;D.res.replaceChildren();try{D.cv.scrollIntoView({block:"center",behavior:"smooth"})}catch(e){}dnLoop(D)}
function dnAsk(D){
  if(!D.qs.length)D.qs=gmBuildTier(D.tier,D.seen,6);
  var q=D.qs.shift();if(!q){return}
  D.state="ask";D.ask=q;var box=D.askbox;
  box.replaceChildren(h("div",{class:"label"},"Bilgi kapısı · kademe: "+GM_TIER[D.tier]),h("div",{class:"gm-aq"},q.q),h("div",{class:"gm-abs"},q.o.map(function(t,i){return t?h("button",{type:"button",class:"gm-ab c"+i,onclick:function(){dnAnswer(D,i)}},h("b",null,q.tf?(i===0?"D":"Y"):"ABC".charAt(i)),h("span",null,t)):null}).filter(Boolean)));
  box.hidden=false;
}
function dnAnswer(D,i){
  var q=D.ask;if(!q)return;var ok=i===q.a;try{gsAnswer(q.k,ok)}catch(e){}
  if(ok){D.ok++;D.sc+=60;D.shield=1;D.msg="Doğru! +60 puan, kalkan kazandın";try{gmBeep(780,.12)}catch(e){}}
  else{D.no++;D.lives--;D.inv=1.5;D.msg="Doğrusu: "+q.o[q.a];try{gmBeep(180,.2,"sawtooth")}catch(e){}if(q.w)D.msg+=" · "+String(q.w).slice(0,120)}
  D.tier=Math.min(4,Math.floor(D.ok/6));
  D.ask=null;D.askbox.hidden=true;D.obs=D.obs.filter(function(o){return o.x>D.x+120||o.x<D.x-40});
  if(D.lives<=0){dnEnd(D);return}
  D.state="play";D.last=0;D.gate=D.sc+450+Math.min(250,D.tier*60);dnLoop(D);
}
function dnEnd(D){
  D.state="over";D.over=true;dnSaveBest(Math.floor(D.sc));
  var xp=0;try{var cur=gmDay(today()),room=Math.max(0,GM_CAP-num(cur.g_xp));xp=Math.min(room,Math.min(D.ok,12));
    setProg({g_xp:num(cur.g_xp)+xp,g_ok:num(cur.g_ok)+D.ok,g_tot:num(cur.g_tot)+D.ok+D.no,g_dino:Math.max(num(cur.g_dino),Math.floor(D.sc))})}catch(e){}
  D.xp=xp;
  D.res.replaceChildren(h("div",{class:"panel"},h("div",{class:"label"},"Koşu bitti"),h("h2",null,Math.floor(D.sc)+" puan"),
    h("div",{class:"gm-grid"},[["Rekor",dnBest()],["Doğru",D.ok+"/"+(D.ok+D.no)],["Kademe",GM_TIER[D.tier]],["XP","+"+xp]].map(function(a){return h("div",{class:"kcell"},h("small",{class:"mute"},a[0]),h("b",{class:"mono"},String(a[1])))})),
    h("div",{class:"small mute"},"XP en çok ilk 12 doğru cevap için verilir. Sonrası sadece rekor ve eğlence için."),
    h("button",{class:"btn big",type:"button",onclick:function(){S.dn=null;draw()}},"Tekrar oyna")));
}
function dnTick(D,dt){
  if(D.state!=="play")return;
  D.t+=dt;D.v=Math.min(640,250+D.sc*.07);D.sc+=D.v*dt/11;
  D.vy+=1500*dt;D.y+=D.vy*dt;if(D.y>=0){D.y=0;D.vy=0}
  if(D.inv>0)D.inv-=dt;
  D.nx-=D.v*dt;
  if(D.nx<=0){
    var fly=D.sc>260&&Math.random()<.32;
    if(fly)D.obs.push({k:"d",x:480,w:30,h:16,y:Math.random()<.5?24:50});
    else{var n=1+Math.floor(Math.random()*(D.sc>400?3:2)),w=0;for(var i=0;i<n;i++){var bw=14+Math.floor(Math.random()*12),bh=22+Math.floor(Math.random()*24);D.obs.push({k:"b",x:480+w,w:bw,h:bh,y:0});w+=bw+3}}
    D.nx=Math.max(170,260+Math.random()*260-D.v*.15)+60;
  }
  D.obs.forEach(function(o){o.x-=D.v*dt});D.obs=D.obs.filter(function(o){return o.x>-60});
  var ph=D.duck&&D.y===0?18:34,px=40,pw=D.duck&&D.y===0?34:26,pt=D.y-ph;
  if(D.inv<=0)D.obs.forEach(function(o){
    var ox=o.x+3,ow=o.w-6,oy=-(o.y)-o.h+3,oh=o.h-6;
    if(px+pw-4>ox&&px+4<ox+ow&&pt<oy+oh&&pt+ph>oy){
      o.x=-999;if(D.shield){D.shield=0;D.inv=.8;D.msg="Kalkan seni korudu"}else{D.lives--;D.inv=1.3;D.msg="Çarptın!";try{gmBeep(120,.2,"sawtooth")}catch(e){}if(D.lives<=0)dnEnd(D)}}
  });
  if(D.state==="play"&&D.sc>=D.gate)dnAsk(D);
}
function dnDraw(D){
  var cv=D.cv,cs=cv.clientWidth||340,dpr=Math.min(2,window.devicePixelRatio||1),W=Math.round(cs*dpr),H=Math.round(cs*200/480*dpr);
  if(cv.width!==W||cv.height!==H){cv.width=W;cv.height=H}
  var x=cv.getContext("2d"),k=W/480,cstyle=getComputedStyle(document.documentElement),ink=cstyle.getPropertyValue("--ink").trim()||"#222",bg=cstyle.getPropertyValue("--panel2").trim()||"#eee";
  x.setTransform(k,0,0,k,0,0);x.fillStyle=bg;x.fillRect(0,0,480,200);
  var gy=165;x.strokeStyle=ink;x.globalAlpha=.55;x.lineWidth=2;x.beginPath();x.moveTo(0,gy);x.lineTo(480,gy);x.stroke();
  x.globalAlpha=.25;for(var i=0;i<14;i++){var gx=((i*71-D.t*D.v*.9)%500+500)%500;x.fillRect(gx,gy+6+(i%3)*5,6+(i%4)*3,2)}x.globalAlpha=1;
  /* bulutlar */
  x.globalAlpha=.3;for(i=0;i<3;i++){var cx=((i*190-D.t*28)%560+560)%560-40;x.fillRect(cx,28+i*22,46,9);x.fillRect(cx+10,22+i*22,26,9)}x.globalAlpha=1;
  D.obs.forEach(function(o){var oy=gy-o.y-o.h;
    if(o.k==="b"){x.fillStyle="#7a5a3a";x.fillRect(o.x,oy,o.w,o.h);x.fillStyle="#a67c52";x.fillRect(o.x+2,oy+2,o.w-4,5);x.fillStyle="rgba(0,0,0,.25)";x.fillRect(o.x,oy+o.h*.5,o.w,2)}
    else{x.fillStyle="#5b6cff";x.fillRect(o.x,oy+4,o.w,o.h-6);x.fillStyle=ink;var fl=Math.floor(D.t*18)%2;x.fillRect(o.x-4,oy+(fl?0:2),o.w+8,3);x.fillStyle="#ffd54a";x.fillRect(o.x+o.w-8,oy+7,5,4)}});
  /* karakter: paketçi dino */
  var ph=D.duck&&D.y===0?18:34,top=gy+D.y-ph;if(D.inv>0&&Math.floor(D.t*14)%2)x.globalAlpha=.35;
  var px=40,body="#3fb37f",dk="#2a7d58";
  if(D.duck&&D.y===0){x.fillStyle=body;x.fillRect(px,top+4,34,14);x.fillStyle=dk;for(i=0;i<4;i++)x.fillRect(px+4+i*7,top,4,5);x.fillStyle="#fff";x.fillRect(px+28,top+7,4,4);x.fillStyle="#222";x.fillRect(px+30,top+8,2,2)}
  else{x.fillStyle=body;x.fillRect(px+4,top+10,20,16);x.fillRect(px+16,top,12,14);x.fillRect(px+26,top+4,4,8);
    x.fillStyle=dk;for(i=0;i<3;i++)x.fillRect(px+6+i*6,top+6,4,5);
    x.fillStyle="#fff";x.fillRect(px+22,top+3,4,4);x.fillStyle="#222";x.fillRect(px+24,top+4,2,2);
    x.fillStyle="#d9a441";x.fillRect(px-2,top+12,8,9);x.fillStyle="#8a5a1d";x.fillRect(px-2,top+15,8,2);
    var st=D.y<0?0:Math.floor(D.t*12)%2;x.fillStyle=dk;x.fillRect(px+8,top+26,5,8-(D.y<0?0:st*3));x.fillRect(px+16,top+26,5,5+(D.y<0?0:st*3));x.fillRect(px-6,top+16,6,5)}
  x.globalAlpha=1;if(D.shield){x.strokeStyle="#4da3ff";x.lineWidth=2;x.beginPath();x.arc(px+14,top+ph/2,26,0,6.3);x.stroke()}
  x.fillStyle=ink;x.font="bold 14px monospace";x.textAlign="right";x.fillText("HI "+String(Math.max(D.best,dnBest())).padStart(5,"0")+"  "+String(Math.floor(D.sc)).padStart(5,"0"),472,22);
  x.textAlign="left";x.fillText("♥".repeat(Math.max(0,D.lives)),10,22);
  if(D.state==="ready"){x.textAlign="center";x.font="bold 15px sans-serif";x.fillText("Başlamak için dokun ya da Boşluk",240,100);x.textAlign="left"}
}
function dnLoop(D){
  if(D.loop)return;D.loop=true;
  function f(ts){
    if(S.dn!==D||!D.cv.isConnected){D.loop=false;return}
    var dt=Math.min(.04,D.last?(ts-D.last)/1000:.016);D.last=ts;
    dnTick(D,dt);dnDraw(D);
    if(D.state==="ask"||D.state==="over"){D.loop=false;dnDraw(D);if(D.state==="over")draw();return}
    var h2=D.msgEl;if(h2&&D.msg){h2.textContent=D.msg;if(!D.mt)D.mt=setTimeout(function(){D.msg="";D.mt=null;if(D.msgEl)D.msgEl.textContent=""},2600)}
    requestAnimationFrame(f)}
  requestAnimationFrame(f);
}
function renderDino(){
  if(!S.dn)S.dn=dnNew();var D=S.dn;D.msgEl=h("div",{class:"small dn-msg","aria-live":"polite"},D.msg||"");
  setTimeout(function(){dnDraw(D)},0);
  var kids=[h("div",{class:"dn-hero"},h("span",{class:"gh-k"},"DİNO KOŞUSU"),h("h2",null,"Bayt'la koş, zıpla, eğil"),h("div",{class:"small"},"Kutuların üstünden zıpla, dronların altından eğil. Belli aralıklarda bilgi kapısı çıkar: doğru bilirsen kalkan kazanırsın, yanlışta can gider. Sorular kademeyle zorlaşır, oyun sonsuz sürer.")),
    h("div",{class:"panel dn-p"},D.cv,D.msgEl,
      h("div",{class:"dn-ctl"},h("button",{type:"button",class:"btn big dn-j",onclick:function(){D.jump()}},"Zıpla"),h("button",{type:"button",class:"btn ghost dn-d",onmousedown:function(){D.duckSet(true)},onmouseup:function(){D.duckSet(false)},onmouseleave:function(){D.duckSet(false)},ontouchstart:function(e){D.duckSet(true);e.preventDefault()},ontouchend:function(){D.duckSet(false)}},"Eğil")),
      h("div",{class:"small mute"},"Klavye: Boşluk ya da ↑ zıpla, ↓ eğil. Telefonda: dokun zıpla, aşağı kaydır eğil.")),
    D.askbox,D.res];
  return kids;
}
function rtToast(msg){var d=document.createElement("div");d.className="rt-toast";d.setAttribute("role","status");d.textContent=msg;document.body.appendChild(d);setTimeout(function(){d.remove()},2800)}
var RT_KEY="ya_rt",RT_ALL=TRKS.slice(),RT_TN=TRN;
function rtTracks(){
  try{var a=JSON.parse(localStorage.getItem(RT_KEY)||"null");if(Array.isArray(a)){a=a.filter(function(x){return RT_ALL.indexOf(x)>=0});if(a.length)return a}}catch(e){}
  var m={ccna:["ccna","eng"],net:["net","eng"],dev:["dev","eng"],qa:["qa","bk","eng"],py:["py","eng"],bk:["bk","eng"],sec:["sec","eng"],eng:["eng"]},g=S.onb&&S.onb.goal;
  return (S.nonOwner&&m[g])?m[g]:RT_ALL.slice();
}
function rtTrackSet(T,on){
  var a=rtTracks().filter(function(x){return x!==T});if(on)a.push(T);if(!a.length)return;
  a=RT_ALL.filter(function(x){return a.indexOf(x)>=0});
  try{localStorage.setItem(RT_KEY,JSON.stringify(a))}catch(e){}draw();
}
function rtXpOf(x){return x.xp||0}
function routeSteps(){
  var td=today(),P=prog(),steps=[],sel=rtTracks().slice(),act=activeLesson(),order=sel.slice();
  if(act&&order.indexOf(act.track)<0)order.push(act.track);
  order.sort(function(a,b){
    if(act){if(a===act.track&&b!==act.track)return -1;if(b===act.track&&a!==act.track)return 1}
    var la=lastStudy(a),lb=lastStudy(b);return la<lb?-1:la>lb?1:order.indexOf(a)-order.indexOf(b)});
  var blocks=order.slice(0,2),hasBk=false;
  blocks.forEach(function(T){
    var l=lessonListFor(T).list[0];if(!l)return;
    var k=lessonKey(l),lockd=!!(act&&act.track!==T&&!lcDone(k)),cls=(T==="ccna"||T==="eng"),pre=RT_TN[T]+": ";
    lcSync(l);
    var go=function(){S.les.track=T;S.les.id=l.id;S.les.view="ders";goTab("ders")},nt=lockd?"Önce "+act.l.title+" dersini bitir":null;
    steps.push({id:"isi-"+T,xp:5,tr:T,t:pre+"ısınma",d:lcGrand(l)||lcW(k),locked:lockd,go:go,b:"Isınmaya git",note:nt||l.title});
    steps.push({id:"ders-"+T,xp:10,tr:T,t:pre+"dersi oku",d:lcGrand(l)?!!P["read_"+T]:lcHas(k,"r"),locked:lockd,go:go,b:"Dersi aç",note:nt});
    if(Array.isArray(l.quiz)&&l.quiz.length)steps.push({id:"quiz-"+T,xp:5,tr:T,t:pre+"mini sınav",d:lcHas(k,"q"),locked:lockd,go:go,b:"Sınava git",note:nt});
    if(cls){var n=S.attempts.filter(function(a){return a.date===td&&a.track===T}).length;
      steps.push({id:"sinif-"+T,xp:15,tr:T,t:pre+"5 canlı soru",d:lcHas(k,"p")||prNow(T,lcCut(T)),prog:Math.min(n,5)+"/5",locked:lockd,go:function(){S.cls.track=T;S.cls.topicId=null;S.cls.phase="idle";goTab("sinif")},b:"Soruları çöz",note:nt})}
    else{hasBk=true;steps.push({id:"alis-"+T,xp:15,tr:T,t:pre+"5 karışık alıştırma",d:lcHas(k,"p")||prNow(T,lcCut(T)),locked:lockd,go:function(){S.at2.sec="alistirma";S.pr.track="mix";S.pr.qs=[];S.pr.res=null;goTab("atolye")},b:"Turu aç",note:nt})}
  });
  var eng=sel.indexOf("eng")>=0||blocks.indexOf("eng")>=0;
  if(!hasBk)steps.push({id:"prac",xp:10,tr:"",t:"Atölye: karışık 5 soru",d:num(P.prac_n)>=5,go:function(){S.at2.sec="alistirma";S.pr.track="mix";S.pr.qs=[];S.pr.res=null;goTab("atolye")},b:"Turu aç",note:"Alanlar iç içe gelir; yanlışlar sonra tekrar çıkar."});
  if(eng){
    steps.push({id:"masa",xp:15,tr:"eng",t:"İngilizce: 1 destek talebi yanıtla",d:num(P.ticket_n)>=1,go:function(){goTab("masa")},b:"Talebi aç"});
    steps.push({id:"oku",xp:5,tr:"eng",t:"Okuma: bir hikâyeyi oku, 1 soruyu aç",d:num(P.oku_n)>=1||S.reading.some(function(r){return String(r.ts||"").slice(0,10)===td}),go:function(){goTab("oku")},b:"Okumaya git"});
    steps.push({id:"ses",xp:5,tr:"eng",t:"İngilizce: 3 cümleyi sesli tekrar et",d:!!P.voice,toggle:function(){setProg({voice:!P.voice})},b:P.voice?"Geri al":"Yaptım, işaretle",note:"telefona kaydet, dinle"});
  }
  steps.push({id:"oyun",xp:10,tr:"",t:"Oyun: günün koşusu",d:num(gmDay(td).g_runs)>0,go:function(){goTab("oyun")},b:"Oyna"});
  steps.push({id:"mul",xp:10,tr:"",t:"Mülakat: 1 soru prova et",d:num(P.mul_n)>=1||(S.mock||[]).some(function(x){return x&&x.d===td}),go:function(){goTab("mul")},b:"Soruya git"});
  steps.push({id:"gz",xp:5,tr:"",t:"Gazete: 1 haber ya da etkinlik oku",d:num(P.gz_n)>=1,go:function(){S.lg=S.lg||{};goTab("gazete")},b:"Gazeteye git"});
  steps.push({id:"proj",xp:20,tr:"",t:"Proje: 1 adım ilerle",d:num(P.proj_n)>=1,go:function(){goTab("proje")},b:"Projeye git"});
  var rep=S.reports.filter(function(r){return r.date===td})[0];
  steps.push({id:"rapor",xp:5,tr:"",t:"Bugünün 3 satırını kaydet",d:!!rep,go:function(){var el=document.getElementById("reportForm");if(el)el.scrollIntoView({behavior:"smooth",block:"center"});else goTab("bugun")},b:"Raporu doldur"});
  return steps;
}
S._rtSent={};S._rtAcc={};S._ld={};
function rtAward(){
  if(!S.db||!S.canWrite||S.guest||!S.ready2||!S._ld.progress||!S._ld.attempts)return;
  var td=today(),P=prog(),steps=routeSteps(),O={},gain=0,names=[];
  steps.forEach(function(x){var k=td+x.id;if(x.d&&!P["rt_"+x.id]&&!S._rtSent[k]){S._rtSent[k]=1;O["rt_"+x.id]=1;gain+=x.xp;names.push(x.t)}});
  if(steps.length&&steps.every(function(x){return x.d})&&!P.rt_all&&!S._rtSent[td+"all"]){S._rtSent[td+"all"]=1;O.rt_all=1;gain+=RT_BONUS;names.push("rota bonusu")}
  if(!gain)return;
  var base=Math.max(num(P.rtxp),num(S._rtAcc[td]));S._rtAcc[td]=base+gain;O.rtxp=base+gain;setProg(O);
  rtToast("+"+gain+" XP · "+(names.length>1?names.length+" durak geçildi":names[0]));
}
function rtXp(){var t=0;S.progress.forEach(function(p){t+=Math.min(300,num(p.rtxp))});return t}
function rtPossible(steps){var t=RT_BONUS;steps.forEach(function(x){t+=x.xp});return t}
var RT_ICO={isi:"rehber",ders:"ders",quiz:"sinif",sinif:"sinif",alis:"atolye",prac:"atolye",masa:"masa",oku:"oku",ses:"mul",oyun:"oyun",mul:"mul",gz:"gazete",proj:"proje",rapor:"ofis"};
function rtIconOf(x){var k=String(x.id).split("-")[0];return (NAV[RT_ICO[k]||"bugun"]||NAV.bugun)[1]}
var RT_LOCK="M7 11V8a5 5 0 0 1 10 0v3 M5 11h14v10H5z",RT_CHECK="M5 12.5l4.5 4.5L19 7.5";
var INK="#4a2f14";
var RT_SVG={
 compass:'<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="none" stroke="#5b3d1a" stroke-width="1.8"/><circle cx="50" cy="50" r="39" fill="none" stroke="#5b3d1a" stroke-width=".8" stroke-dasharray="2 2"/><path d="M50 50 L72 28 M50 50 L28 28 M50 50 L28 72 M50 50 L72 72" stroke="#5b3d1a" stroke-width="1.2"/><path d="M50 4 L57 43 L96 50 L57 57 L50 96 L43 57 L4 50 L43 43Z" fill="#7a2a18" opacity=".88"/><path d="M50 20 L54 46 L80 50 L54 54 L50 80 L46 54 L20 50 L46 46Z" fill="#ecd9a8" stroke="#5b3d1a" stroke-width=".8"/><circle cx="50" cy="50" r="4" fill="#5b3d1a"/><g font-family="Georgia,serif" font-weight="700" font-size="11" fill="#3b2713" text-anchor="middle"><text x="50" y="17">K</text><text x="50" y="97">G</text><text x="8" y="54">B</text><text x="92" y="54">D</text></g></svg>',
 ship:'<svg viewBox="0 0 80 70"><path d="M2 60 q6-5 12 0 t12 0 t12 0 t12 0 t12 0 t12 0" fill="none" stroke="#5b3d1a" stroke-width="1.5"/><path d="M8 46 Q40 64 72 46 L66 40 H14Z" fill="#d9bb82" stroke="#3b2713" stroke-width="2"/><path d="M40 40 V5 M24 40 V15 M56 40 V15" stroke="#3b2713" stroke-width="2"/><path d="M40 8 Q60 18 55 36 H40Z M24 18 Q37 24 35 36 H24Z M56 18 Q43 24 45 36 H56Z" fill="#f6e8c4" stroke="#3b2713" stroke-width="1.5"/><path d="M40 5 L52 9 L40 13Z" fill="#a8321f"/></svg>',
 serpent:'<svg viewBox="0 0 130 60"><path d="M2 54 q6-5 12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0" fill="none" stroke="#5b3d1a" stroke-width="1.4"/><path d="M6 44 Q18 8 32 44 T60 44 T88 44" fill="none" stroke="#3b2713" stroke-width="6" stroke-linecap="round"/><path d="M6 44 Q18 8 32 44 T60 44 T88 44" fill="none" stroke="#d9bb82" stroke-width="2.5" stroke-linecap="round"/><path d="M88 44 Q96 12 112 16 Q124 20 118 30 Q110 36 104 30 Q100 34 98 42Z" fill="#d9bb82" stroke="#3b2713" stroke-width="2"/><circle cx="112" cy="21" r="2" fill="#3b2713"/><path d="M20 20 l-3 -8 l6 5 M46 20 l-3 -8 l6 5 M74 20 l-3 -8 l6 5" fill="none" stroke="#3b2713" stroke-width="2"/></svg>',
 mount:'<svg viewBox="0 0 90 50"><path d="M2 46 L22 12 L42 46Z M30 46 L54 6 L78 46Z M60 46 L76 24 L88 46Z" fill="#d9bb82" stroke="#3b2713" stroke-width="1.6" stroke-linejoin="round"/><path d="M22 12 L27 46 M54 6 L61 46 M76 24 L80 46 M22 12 L16 40 M54 6 L47 40" stroke="#6b4a22" stroke-width="1" fill="none"/></svg>',
 palm:'<svg viewBox="0 0 40 50"><path d="M18 48 Q20 30 22 14" stroke="#3b2713" stroke-width="3.2" fill="none" stroke-linecap="round"/><path d="M22 14 Q34 5 38 17 M22 14 Q10 3 3 15 M22 14 Q31 22 37 30 M22 14 Q12 22 5 30 M22 14 Q22 4 24 2" stroke="#4a5a2a" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>',
 skull:'<svg viewBox="0 0 110 100"><path d="M18 90 L92 40 M92 90 L18 40" stroke="#3b2713" stroke-width="5" stroke-linecap="round"/><path d="M18 90 L92 40 M92 90 L18 40" stroke="#d9bb82" stroke-width="2" stroke-linecap="round"/><path d="M14 38 Q55 -8 96 38 Q55 26 14 38Z" fill="#3b2713"/><circle cx="55" cy="54" r="22" fill="#f1e2bd" stroke="#3b2713" stroke-width="3"/><rect x="43" y="68" width="24" height="14" rx="3" fill="#f1e2bd" stroke="#3b2713" stroke-width="3"/><circle cx="46" cy="52" r="6" fill="#3b2713"/><circle cx="64" cy="52" r="6" fill="#3b2713"/><path d="M55 58 L52 64 H58Z" fill="#3b2713"/><path d="M49 70 V80 M55 70 V80 M61 70 V80" stroke="#3b2713" stroke-width="2"/></svg>',
 isle:'<svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M12 38 C8 20 30 8 48 12 C60 6 82 10 88 28 C96 40 90 60 82 70 C86 84 66 94 50 90 C34 96 14 88 16 72 C6 62 8 48 12 38Z" fill="rgba(170,130,70,.20)" stroke="#6b4a22" stroke-width="1.4" vector-effect="non-scaling-stroke"/><path d="M20 40 C18 26 34 18 48 20 C60 16 78 20 80 32 C88 44 82 58 76 66 C78 78 62 84 50 82 C38 86 24 80 26 70 C16 62 18 50 20 40Z" fill="none" stroke="#8a6a3a" stroke-width="1" stroke-dasharray="3 3" vector-effect="non-scaling-stroke"/><path d="M30 44 C30 34 42 30 50 32 C60 30 70 34 70 42 C76 50 70 60 64 64 C64 72 54 74 48 72 C40 74 32 70 34 62 C26 56 28 50 30 44Z" fill="none" stroke="#9a7a45" stroke-width=".9" stroke-dasharray="2 3" vector-effect="non-scaling-stroke"/></svg>'
};
function svgEl(str,cls,sty){var d=document.createElement("div");d.innerHTML=str;var e=d.firstChild;e.setAttribute("class",cls||"");if(sty)e.setAttribute("style",sty);e.setAttribute("aria-hidden","true");return e}
function tornClip(seed){var r=rngf(seed),p=[],n=22,i,J=function(){return (1+r()*7).toFixed(1)+"px"};
  for(i=0;i<=n;i++)p.push((i/n*100).toFixed(1)+"% "+J());
  for(i=1;i<=n;i++)p.push("calc(100% - "+J()+") "+(i/n*100).toFixed(1)+"%");
  for(i=n-1;i>=0;i--)p.push((i/n*100).toFixed(1)+"% calc(100% - "+J()+")");
  for(i=n-1;i>=1;i--)p.push(J()+" "+(i/n*100).toFixed(1)+"%");
  return "polygon("+p.join(",")+")"}
function rtDecor(H){
  var d=[];for(var q=0,yy=50;yy<H-120;q++,yy+=470){d.push(svgEl(RT_SVG.isle,"tmx","left:"+(q%2?10:3)+"%;top:"+yy+"px;width:88%;height:430px;opacity:.9"))}
  d=d.concat([
    svgEl(RT_SVG.mount,"tmx","left:60%;top:"+Math.round(H*.18)+"px;width:96px;opacity:.7"),
    svgEl(RT_SVG.mount,"tmx","left:6%;top:"+Math.round(H*.58)+"px;width:80px;opacity:.65"),
    svgEl(RT_SVG.palm,"tmx","left:78%;top:"+Math.round(H*.46)+"px;width:34px;opacity:.75"),
    svgEl(RT_SVG.palm,"tmx","left:12%;top:"+Math.round(H*.32)+"px;width:30px;opacity:.7"),
    svgEl(RT_SVG.skull,"tmx","right:14px;top:10px;width:78px;opacity:.85"),
    svgEl(RT_SVG.compass,"tmx","left:12px;bottom:14px;width:96px;opacity:.82"),
    svgEl(RT_SVG.ship,"tmx","right:10px;bottom:16px;width:88px;opacity:.85"),
    svgEl(RT_SVG.ship,"tmx","left:8px;top:"+Math.round(H*.12)+"px;width:62px;opacity:.7;transform:scaleX(-1)"),
    svgEl(RT_SVG.serpent,"tmx","left:2%;top:"+Math.round(H*.76)+"px;width:118px;opacity:.75")]);
  [["Paket Burnu",8,.2],["Switch Koyu",70,.36],["VLAN Dağları",58,.14],["Kök Zindanı",8,.52],["Gateway Limanı",44,.88],["Sis Denizi",30,.7]].forEach(function(p){d.push(h("span",{class:"tm-nm",style:"left:"+p[1]+"%;top:"+Math.round(H*p[2])+"px"},p[0]))});
  var ticks=[];for(var i=0;i<6;i++){ticks.push(h("span",{class:"tm-ct",style:"left:"+(8+i*17)+"%;top:3px"},String(47-i)));ticks.push(h("span",{class:"tm-ct",style:"left:5px;top:"+(Math.round(H*(.1+i*.16)))+"px"},String(18-i)))}
  return d.concat(ticks);
}
function rtMap(vis,nxt,steps,tail){
  var STEP=100,TOP=68,XS=[22,72,30,76,26,68,36],m=vis.length+(tail?1:0),H=TOP+m*STEP+90;
  function px(j){return XS[j%XS.length]}
  function py(j){return TOP+j*STEP+34}
  function pathTo(k){var d="M"+px(0)+" "+py(0);for(var j=1;j<=k;j++){var y1=py(j-1),y2=py(j);d+=" C"+px(j-1)+" "+(y1+STEP/2)+" "+px(j)+" "+(y2-STEP/2)+" "+px(j)+" "+y2}return d}
  var ci=-1;vis.forEach(function(o,j){if(o.x===nxt)ci=j});if(ci<0)ci=vis.every(function(o){return o.x.d})?vis.length-1:0;
  var svg=sv("svg",{class:"tm-path",viewBox:"0 0 100 "+H,preserveAspectRatio:"none","aria-hidden":"true"},
    sv("path",{d:pathTo(m-1),class:"tp-ahead","vector-effect":"non-scaling-stroke"}),
    ci>0?sv("path",{d:pathTo(ci),class:"tp-walk","vector-effect":"non-scaling-stroke"}):null);
  var kids=[svg].concat(rtDecor(H));
  kids.push(h("div",{class:"tm-title","aria-hidden":"true"},h("span",null,"HAZİNE HARİTASI")));
  vis.forEach(function(o,j){
    var x=o.x,X=px(j),Y=py(j),left=X<50;
    var st=x.d?" done":x.locked?" lock":x===nxt?" cur":"";
    kids.push(h("div",{class:"tn"+st,style:"left:"+X+"%;top:"+Y+"px","aria-hidden":"true"},mi(x.d?RT_CHECK:x.locked?RT_LOCK:rtIconOf(x))));
    var sty="top:"+Y+"px;"+(left?"left:calc("+X+"% + 32px);max-width:calc(100% - "+X+"% - 42px)":"right:calc("+(100-X)+"% + 32px);max-width:calc("+X+"% - 42px)");
    kids.push(h("button",{type:"button",class:"tl"+st+(left?"":" r"),style:sty,disabled:!!x.locked,"aria-label":x.t+(x.d?", tamam":x.locked?", kilitli":"")+", "+x.xp+" XP",onclick:function(){S._rtOpen=false;(x.go||x.toggle)()}},
      x===nxt?h("span",{class:"tg"},"buradasın"):null,
      h("span",{class:"tt"},x.t+(x.prog&&!x.d?" ("+x.prog+")":"")),
      x.note&&(x===nxt||x.locked)&&!x.d?h("span",{class:"tx2"},x.note):null,
      h("span",{class:"tx"},(x.d?"✓ ":x.locked?"🔒 ":"+")+x.xp+" XP")));
  });
  if(tail){var j=vis.length,X=px(j),Y=py(j),all=steps.every(function(q){return q.d});
    kids.push(h("div",{class:"tn tre"+(all?" done":""),style:"left:"+X+"%;top:"+Y+"px","aria-hidden":"true"},sv("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":4,"stroke-linecap":"round"},sv("path",{d:"M5 5l14 14 M19 5L5 19"}))));
    var left=X<50;kids.push(h("div",{class:"tl tre"+(left?"":" r"),style:"top:"+Y+"px;"+(left?"left:calc("+X+"% + 34px)":"right:calc("+(100-X)+"% + 34px)")},h("span",{class:"tt"},all?"Hazine bulundu!":"Hazine: rota bonusu"),h("span",{class:"tx"},(all?"✓ ":"+")+RT_BONUS+" XP")));}
  var wrap=h("div",{class:"tmw"},h("div",{class:"tmap",style:"height:"+H+"px;clip-path:"+tornClip(7)},kids));
  return wrap;
}
/* küçük önizleme: tıklayınca tam harita açılır */
function rtPreview(steps,nxt,done){
  var n=steps.length,W=360,Hh=150,pts=[];
  for(var i=0;i<n;i++){var t=n>1?i/(n-1):0;pts.push([40+t*(W-100),72+Math.sin(t*Math.PI*2.4)*24])}
  
  var d="M"+pts[0][0].toFixed(1)+" "+pts[0][1].toFixed(1);
  for(var j=1;j<pts.length;j++){var a=pts[j-1],b=pts[j],mx=(a[0]+b[0])/2;d+=" C"+mx.toFixed(1)+" "+a[1].toFixed(1)+" "+mx.toFixed(1)+" "+b[1].toFixed(1)+" "+b[0].toFixed(1)+" "+b[1].toFixed(1)}
  var ni=steps.indexOf(nxt);if(ni<0)ni=n-1;
  var dw="M"+pts[0][0].toFixed(1)+" "+pts[0][1].toFixed(1);for(var k=1;k<=ni&&k<pts.length;k++){var a2=pts[k-1],b2=pts[k],m2=(a2[0]+b2[0])/2;dw+=" C"+m2.toFixed(1)+" "+a2[1].toFixed(1)+" "+m2.toFixed(1)+" "+b2[1].toFixed(1)+" "+b2[0].toFixed(1)+" "+b2[1].toFixed(1)}
  var dots=pts.map(function(p,q){var x=steps[q],c=x.d?"#4f7a3b":x.locked?"#9d8a62":q===ni?"#a8321f":"#f6e8c4";return '<circle cx="'+p[0].toFixed(1)+'" cy="'+p[1].toFixed(1)+'" r="'+(q===ni?9:5.5)+'" fill="'+c+'" stroke="#4a2f14" stroke-width="'+(q===ni?2.5:1.8)+'"/>'+(q===ni?'<circle cx="'+p[0].toFixed(1)+'" cy="'+p[1].toFixed(1)+'" r="14" fill="none" stroke="#a8321f" stroke-opacity=".35" stroke-width="3"><animate attributeName="r" values="11;18;11" dur="2s" repeatCount="indefinite"/><animate attributeName="stroke-opacity" values=".5;0;.5" dur="2s" repeatCount="indefinite"/></circle>':'')}).join("");
  var last=pts[pts.length-1],X='<path d="M'+(last[0]+14)+' '+(last[1]-8)+' l14 14 M'+(last[0]+28)+' '+(last[1]-8)+' l-14 14" stroke="#a8321f" stroke-width="5" stroke-linecap="round"/>';
  var svgS='<svg viewBox="0 0 '+W+' '+Hh+'" preserveAspectRatio="xMidYMid slice"><path d="M10 96 C6 50 60 24 120 34 C170 20 250 26 292 52 C346 70 346 118 300 134 C240 150 120 150 60 138 C24 132 12 120 10 96Z" fill="rgba(170,130,70,.22)" stroke="#6b4a22" stroke-width="1.4" stroke-dasharray="4 3"/><path d="M'+d.slice(1)+'" fill="none"/><path d="'+d+'" fill="none" stroke="#a8321f" stroke-width="3" stroke-dasharray="3 7" stroke-linecap="round"/>'+(ni>0?'<path d="'+dw+'" fill="none" stroke="#3f6b3a" stroke-width="4" stroke-linecap="round"/>':'')+dots+X+'</svg>';
  var cur=nxt?nxt.t:"Hazine bulundu";
  var wrap=h("button",{type:"button",class:"tprev","aria-label":"Haritayı aç. "+done+" / "+n+" durak. "+cur,onclick:function(){S._rtOpen=true;draw()}},
    h("div",{class:"tpv-bg"}),svgEl(svgS,"tpv-svg"),svgEl(RT_SVG.compass,"tmx","right:8px;top:30px;width:46px;opacity:.75"),svgEl(RT_SVG.ship,"tmx","left:8px;bottom:30px;width:46px;opacity:.8"),
    h("span",{class:"tpv-rib"},"GÜNÜN ROTASI · "+done+"/"+n),
    h("span",{class:"tpv-now"},h("small",null,nxt?"buradasın":"tamam"),h("b",null,cur)),
    h("span",{class:"tpv-open"},"Aç ⤢"));
  wrap.style.clipPath=tornClip(11);
  return h("div",{class:"tmw"},wrap);
}
function rtOverlay(){
  var steps=routeSteps(),nxt=steps.filter(function(x){return !x.d&&!x.locked})[0]||steps.filter(function(x){return !x.d})[0];
  var vis=steps.map(function(x,i){return {x:x,i:i}});
  function close(){S._rtOpen=false;draw()}
  return h("div",{class:"tov",role:"dialog","aria-label":"Günün rotası haritası",onclick:function(e){if(e.target===e.currentTarget)close()}},
    h("div",{class:"tov-hd"},h("b",null,"Günün rotası"),h("button",{class:"mx",type:"button","aria-label":"Haritayı kapat",onclick:close},"×")),
    h("div",{class:"tov-in"},rtMap(vis,nxt,steps,true)));
}
function renderRoute(){
  var steps=routeSteps(),done=steps.filter(function(x){return x.d}).length,nxt=steps.filter(function(x){return !x.d&&!x.locked})[0]||steps.filter(function(x){return !x.d})[0],P=prog();
  var earned=Math.max(num(P.rtxp),num(S._rtAcc[today()])),poss=rtPossible(steps),act=activeLesson(),sel=rtTracks();
  var R=rankInfo(),gate=R.nxt&&R.nxt.gate?gateReq(R.nxt.gate):"";
  return h("div",{class:"panel route"},
    h("div",{style:"display:flex;justify-content:space-between;gap:8px;align-items:center;flex-wrap:wrap"},h("h2",null,"Bugünün rotası"),h("span",{class:"pill"+(done===steps.length?" ok":"")},done+" / "+steps.length+" durak")),
    h("div",{class:"small mute"},"Haritaya dokun, tam ekran açılsın. Her durak XP verir; hazineye ulaşırsan +"+RT_BONUS+" bonus. Rota, seçtiğin derslere ve başladığın derse göre kurulur."),
    act?h("div",{class:"lbox"},h("div",{class:"label"},"Şu an"),h("p",null,RT_TN[act.track]+": "+(act.l.title||"ders")+". Bu dersin adımları bitmeden başka derse geçilmez; adımları bitirince sıradaki ders açılır.")):null,
    h("div",{class:"xpbar"},h("i",{style:"width:"+Math.min(100,earned/poss*100)+"%"})),
    h("div",{class:"small mono",style:"display:flex;justify-content:space-between"},h("span",null,"bugün "+earned+" XP"),h("span",{class:"mute"},"en çok "+poss)),
    rtPreview(steps,nxt,done),
    nxt&&!nxt.locked?h("div",{class:"row"},h("button",{class:"btn",type:"button",onclick:function(){(nxt.go||nxt.toggle)()}},nxt.b||"Devam et"),h("button",{class:"btn ghost",type:"button",onclick:function(){S._rtOpen=true;draw()}},"Haritayı aç")):null,
    h("details",null,h("summary",{class:"small"},"Rotada hangi dersler olsun?"),
      h("div",{class:"small mute",style:"margin:6px 0"},"Seçtiklerin sırayla rotaya girer. Her gün en çok iki ders gelir; en az çalıştığın alan önce çıkar."),
      h("div",{class:"chips"},RT_ALL.map(function(T){var on=sel.indexOf(T)>=0;return h("button",{type:"button",class:"chip","aria-pressed":on?"true":"false",style:on?"border-color:var(--net);color:var(--net);font-weight:700":"",onclick:function(){rtTrackSet(T,!on)}},(on?"✓ ":"")+RT_TN[T])}))),
    h("details",null,h("summary",{class:"small"},"XP nasıl kazanılır, adil mi?"),
      h("div",{class:"small mute"},"Herkes için aynı kurallar: rota durakları yukarıdaki değerlerde (günde en çok "+poss+"). Her ders dört adımdır: ısınma 5, okuma 10, mini sınav 5, alıştırma 15. Sınıfta cevap başına 5-15 XP, günlük en çok 100. Oyun günlük en çok "+GM_CAP+" (haftalık bonuslar ayrı). Proje adımı 10 XP × seviye, proje bitince +60 × seviye. Her XP bir iş yapınca gelir; bekleyerek ya da aynı şeyi tekrarlayarak artmaz."),
      gate?h("div",{class:"small mute",style:"margin-top:6px"},"Sonraki rütbe şartları: "+gate+". Ayrıntı: Ödüller sayfasındaki Terfi dosyası."):null,
      h("div",{class:"small mute",style:"margin-top:6px"},"Not: kurucunun hesabında günlük koç görevleri ek XP yazar; bu uygulama içi XP ile ayrı sayılır ve rütbe kapıları iki yoldan da açılabilir.")));
}
/* rütbe kapıları: kurucu sınavı ya da uygulama içi başarı */
function gsTotals(){var n=0,ok=0;Object.keys(GS.st).forEach(function(k){n+=GS.st[k][1];ok+=GS.st[k][0]});return {n:n,ok:ok,acc:n?ok/n:0}}
var GATES={g1:{q:40,acc:.8,les:3,proj:0,mock:0,mn:0},g2:{q:150,acc:.82,les:15,proj:1,mock:0,mn:0,lv:2},g3:{q:350,acc:.85,les:40,proj:2,mock:7.5,mn:2},g4:{q:700,acc:.88,les:80,proj:3,mock:8,mn:3}};
function gateList(g){
  var G=GATES[g];if(!G)return [];
  var PL=plLoad(),lvok=Object.keys(PL).some(function(k){return PL[k]&&PL[k].lv>=2&&PL[k].n>=3});
  return PP.ogr.kapi.rutbeKosullari(G,{soru:gsTotals(),ders:lessonsDone(),proje:projDoneN(),seviyeTesti:lvok,prova:mockInfo()});
}
function gateAuto(g){var L=gateList(g);return L.length>0&&L.every(function(x){return x.ok})}
function gateOk(g){return (S.profile&&S.profile.gates||{})[g]===true||gateAuto(g)}
function gateReq(g){return gateList(g).map(function(x){return x.t+" (şimdi: "+x.have+")"}).join("; ")}
/* tema */
function themeGet(){try{return localStorage.getItem("ya_theme")||"auto"}catch(e){return "auto"}}
function themeApply(){
  var t=themeGet(),r=document.documentElement;
  if(S._hostTheme===undefined)S._hostTheme=r.getAttribute("data-theme");
  if(t==="auto"){if(S._hostTheme)r.setAttribute("data-theme",S._hostTheme);else r.removeAttribute("data-theme")}else r.setAttribute("data-theme",t);
}
function themeSet(t){try{localStorage.setItem("ya_theme",t)}catch(e){}themeApply();draw()}
function themeCycle(){var o=["auto","light","dark"],t=themeGet();themeSet(o[(o.indexOf(t)+1)%3])}
function themeName(){return {auto:"otomatik",light:"açık",dark:"koyu"}[themeGet()]}
themeApply();
/* ders girişi: seviye testi ve yönlendirme */
function plOffset(track,N){var v=plLoad()[track];if(!v||v.skip||typeof v.lv!=="number")return 0;var b=PP.ogr.ustalik.yerlestirmeBandi(v.lv);return b===0?0:b===1?Math.round(N*.25):Math.round(N*.5)}
function plHint(track){var v=plLoad()[track];if(!v||v.skip||typeof v.lv!=="number")return "";return " Seviye testi sonucu: "+v.lv.toFixed(1)+"/3 ("+plBand(v.lv)[0]+"); anlatımı buna göre ayarla."}
function lessonPlacement(tr){
  var tn=TRN[tr]||tr;
  return h("div",{class:"panel welcome"},h("div",{class:"label"},"Derse başlamadan"),h("h2",null,tn+": nereden başlayalım?"),
    h("div",{class:"small mute"},"6 kısa soruyla seviyeni ölçerim. Bildiğin kısımları atlar, ilk dersi sana uygun konudan başlatırım. Bilmediğin soruda tahmin etmen yeter, puan kırılmaz."),
    h("div",{style:"display:grid;gap:8px"},
      h("button",{class:"btn",type:"button",onclick:function(){S.pl.track=tr;plStart();plFocus()}},"Seviye testini yap (3 dakika)"),
      h("button",{class:"btn ghost",type:"button",onclick:function(){var o=plLoad();o[tr]={lv:1,n:0,ok:0,d:today(),skip:true};plSave(o);draw()}},"Sıfırdan başlıyorum")));
}
function lessonGuide(tr,l){
  var P=prog(),L=S.les,qs=(l&&Array.isArray(l.quiz))?l.quiz:[],marked=0;qs.forEach(function(q,i){if(L.mark[l.id+":"+i])marked++});
  var cls=(tr==="ccna"||tr==="eng");
  var gk=l?lessonKey(l):"",st=[
   {t:"Isınma",d:lcW(gk)||(l&&lcGrand(l)),h:"Önceki konuyu hatırla, bugünün kavramlarına göz at. Bitirmeden ders açılmaz.",go:function(){var el=document.getElementById("ls-isinma");if(el)el.scrollIntoView({behavior:"smooth"})}},
   {t:"Dersi oku",d:(l&&lcGrand(l))?!!P["read_"+tr]:lcHas(gk,"r"),h:"Isınma, anlatım, sonra en altta 'Dersi okudum'. Ders yoksa aşağıdan üret.",go:function(){var el=document.getElementById("ls-ders");if(el)el.scrollIntoView({behavior:"smooth"})}},
   {t:"Mini sınav",d:(qs.length>0&&marked>=qs.length)||lcHas(gk,"q"),h:"Cevabı önce kendin düşün, sonra aç ve dürüstçe işaretle.",go:function(){var el=document.getElementById("ls-sinav");if(el)el.scrollIntoView({behavior:"smooth"})}},
   cls?{t:"Sınıfta 5 soru çöz",d:lcHas(gk,"p")||S.attempts.filter(function(a){return a.date===today()&&a.track===tr}).length>=5,h:"Öğrendiğini gerçek iş durumlarında dene.",go:function(){S.cls.track=tr;S.cls.topicId=null;S.cls.phase="idle";goTab("sinif")}}:
      {t:"Alıştırmada karışık tur",d:lcHas(gk,"p")||num(P.prac_n)>=5,h:"Alanlar iç içe gelir; unutmaya karşı en iyi yöntem budur.",go:function(){S.at2.sec="alistirma";S.pr.track="mix";S.pr.qs=[];S.pr.res=null;goTab("atolye")}}];
  if(tr==="eng"||tr==="ccna")st.push({t:"Masada bir talebi yanıtla",d:num(P.ticket_n)>=1,h:"İş yerindeki gibi İngilizce yaz; ipucu ve puan alırsın.",go:function(){goTab("masa")}});
  st.push({t:"Zorlandığın şeyi tekrar sor",d:false,h:"Yanlış yaptığın soruda 'Bunu tekrar sor' de; sistem onu yarın karşına çıkarır.",go:function(){S.at2.sec="alistirma";goTab("atolye")},opt:true});
  var nx=st.filter(function(x){return !x.d&&!x.opt})[0];
  return h("details",{class:"panel",open:S._lgOpen!==false,ontoggle:function(e){S._lgOpen=e.target.open}},h("summary",null,h("b",null,"Bu dersi nasıl çalışmalısın? "),h("span",{class:"small mute"},nx?"Sıradaki: "+nx.t:"Hepsi tamam")),
    h("div",{class:"small mute"},"Sıra önemli: önce anla (ders), sonra hatırla (mini sınav), sonra kullan (sınıf ya da masa). Dört adım bitince sıradaki konu açılır. Hepsini aynı gün yapman gerekmez; kendi hızında ilerle."),
    h("div",{class:"jmap"},st.map(function(x,i){return h("div",{class:"jst"+(x.d?" done":"")+(x===nx?" cur":"")},h("div",{class:"jn"},x.d?"✓":String(i+1)),
      h("div",{class:"jb"},x===nx?h("span",{class:"jtag"},"sıradaki"):null,h("div",{class:"t"},x.t+(x.opt?" (isteğe bağlı)":"")),h("div",{class:"small mute"},x.h),h("button",{class:"btn ghost",type:"button",style:"justify-self:start;margin-top:4px",onclick:x.go},"Git")),h("div",null))})));
}

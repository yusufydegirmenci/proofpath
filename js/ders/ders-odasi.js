"use strict";
/* ---- v58: ders odası, tıklanır sınav, adım adım animasyon ---- */
function qzNorm(s){return String(s==null?"":s).toLowerCase().replace(/[^a-z0-9çğıöşü ]+/g," ").replace(/\s+/g," ").trim()}
function qzCorrect(q){
  var o=Array.isArray(q.options)?q.options:null;if(!o||o.length<2)return -1;
  var a=String(q.answer==null?"":q.answer).trim(),m=/^([A-Da-d])(?:[\)\.\:\-]|\s|$)/.exec(a);
  if(m){var li=m[1].toUpperCase().charCodeAt(0)-65;if(li<o.length&&(a.length<=3||qzNorm(o[li]).length&&qzNorm(a).indexOf(qzNorm(o[li]))>=0))return li}
  var na=qzNorm(a),i;
  for(i=0;i<o.length;i++)if(qzNorm(o[i])===na)return i;
  for(i=0;i<o.length;i++){var no=qzNorm(o[i]);if(no&&na&&(na.indexOf(no)>=0||no.indexOf(na)>=0))return i}
  if(m){var lj=m[1].toUpperCase().charCodeAt(0)-65;if(lj<o.length)return lj}
  return -1;
}
function qzPick(l,i,q,j){
  var L=S.les,k=l.id+":"+i;L.pick=L.pick||{};if(L.pick[k]!=null)return;
  var c=qzCorrect(q),ok=j===c;L.pick[k]=j;L.mark[k]=ok?"ok":"no";
  if(ok)unnoteMistake(l,i);else noteMistake(l,i,q);
  saveMarks(l);try{gmBeep(ok?780:180,.15,ok?"sine":"sawtooth")}catch(e){}draw();
}
function lessonQuiz(l){
  var L=S.les,qs=Array.isArray(l.quiz)?l.quiz:[];if(!qs.length)return null;L.pick=L.pick||{};
  var done=0,ok=0;qs.forEach(function(q,i){var m=L.mark[l.id+":"+i];if(m){done++;if(m==="ok")ok++}});
  var items=qs.map(function(q,i){
    var k=l.id+":"+i,m=L.mark[k],c=qzCorrect(q),opts=Array.isArray(q.options)&&q.options.length>=2&&c>=0?q.options:null,pk=L.pick[k];
    var card=h("div",{class:"qz"+(m==="ok"?" ok":m==="no"?" no":"")},
      h("div",{class:"qz-h"},h("span",{class:"qz-n"},String(i+1)),h("span",{class:"qz-q"},q.q||""),m?h("span",{class:"qz-b "+m},m==="ok"?"Doğru":"Yanlış"):null));
    if(opts){
      card.append(h("div",{class:"qz-os"},opts.map(function(o,j){
        var cls="qz-o";if(pk!=null){if(j===c)cls+=" ok";else if(j===pk)cls+=" no";else cls+=" dim"}
        return h("button",{type:"button",class:cls,disabled:pk!=null,"aria-pressed":pk===j?"true":"false",onclick:function(){qzPick(l,i,q,j)}},h("b",null,String.fromCharCode(65+j)),h("span",null,o),pk!=null&&j===c?h("i",{"aria-hidden":"true"},"✓"):pk===j?h("i",{"aria-hidden":"true"},"✗"):null)})));
      if(pk!=null)card.append(h("div",{class:"qz-fb "+(m==="ok"?"ok":"no")},h("b",null,m==="ok"?"Doğru! ":"Doğrusu: "+opts[c]+". "),q.why||""))
    }else{
      var shown=L.rev[k+":a"];
      if(Array.isArray(q.options)&&q.options.length)card.append(h("div",{class:"qz-os"},q.options.map(function(o,j){return h("div",{class:"qz-o static"},h("b",null,String.fromCharCode(65+j)),h("span",null,o))})));
      if(!shown)card.append(h("button",{class:"btn ghost",type:"button",onclick:function(){L.rev[k+":a"]=true;draw()}},"Önce kendin düşün, sonra cevabı göster"));
      else card.append(h("div",{class:"qz-fb "+(m==="ok"?"ok":m==="no"?"no":"")},h("div",null,h("b",null,"Cevap: "),String(q.answer==null?"":q.answer)),q.why?h("div",{class:"small"},q.why):null,
        h("div",{class:"qz-mk"},h("button",{class:"btn qz-g"+(m==="ok"?" on":""),type:"button",onclick:function(){L.mark[k]="ok";unnoteMistake(l,i);saveMarks(l);draw()}},"Bildim"),h("button",{class:"btn qz-r"+(m==="no"?" on":""),type:"button",onclick:function(){L.mark[k]="no";noteMistake(l,i,q);saveMarks(l);draw()}},"Kaçırdım"))));
    }
    return card});
  return h("div",{class:"panel",id:"ls-sinav"},h("div",{style:"display:flex;justify-content:space-between;gap:8px;align-items:center"},h("h2",null,"Mini sınav"),
      h("span",{class:"pill"+(done?(ok===qs.length?" ok":""):"")},done?(ok+"/"+qs.length+" doğru"):qs.length+" soru")),
    h("div",{class:"small mute"},"Şıklara dokun: doğruysa yeşil, yanlışsa kırmızı yanar ve nedenini görürsün. Yanlışların ertesi gün tekrar karşına gelir."),
    h("div",{class:"qz-list"},items),
    done===qs.length?h("div",{class:"qz-sum "+(ok===qs.length?"all":ok>=qs.length/2?"mid":"low")},h("b",null,ok+" / "+qs.length),h("span",null,ok===qs.length?"Mükemmel, hepsi doğru.":ok>=qs.length/2?"İyi gidiyorsun. Yanlışlar tekrar listene eklendi.":"Konuyu bir daha oku; yanlışlar tekrar listende.")):null);
}
/* adım adım animasyon */
function renderAnim(E,opt){
  opt=opt||{};S.an=S.an||{};var n=E.m.length,key=(opt.nb?"n:":"l:")+E.n[0],st=S.an[key]||(S.an[key]={i:-1,play:false,tm:null}),box=h("div",{class:"an"+(opt.nb?" nb":"")});
  function stop(){st.play=false;clearTimeout(st.tm)}
  function go(i){st.i=Math.max(-1,Math.min(n,i));paint()}
  function tick(){clearTimeout(st.tm);if(!st.play)return;st.tm=setTimeout(function(){if(!box.isConnected){return}if(st.i>=n-1){st.play=false;paint();return}st.i++;paint();tick()},3400)}
  function paint(){
    var cur=st.i,rows=E.m.map(function(x,k){
      var s=k<cur?"done":k===cur?"on":"todo";
      return h("li",{class:"an-r "+s+" c"+(k%4)},h("div",{class:"an-l"},h("span",{class:"an-d"},k<cur?"✓":String(k+1)),k<n-1?h("i",{class:"an-ln"},k===cur?h("em",{class:"an-pk"}):null):null),
        h("div",{class:"an-t"},h("b",null,x[0]),s==="on"?h("span",{class:"an-ds"},x[1]):s==="done"?h("span",{class:"an-ds mini"},x[1].length>70?x[1].slice(0,68)+"…":x[1]):null))});
    var end=cur>=n-1;
    var ctl=h("div",{class:"an-c"},h("button",{type:"button",class:"btn ghost","aria-label":"Önceki adım",disabled:cur<0,onclick:function(){stop();go(cur-1)}},"◀"),
      h("button",{type:"button",class:"btn","aria-label":st.play?"Duraklat":"Oynat",onclick:function(){if(st.play){stop();paint()}else{if(cur>=n-1)st.i=-1;st.play=true;st.i++;paint();tick()}}},st.play?"Duraklat":(cur<0?"Başlat":end?"Baştan oynat":"Devam")),
      h("button",{type:"button",class:"btn ghost","aria-label":"Sonraki adım",disabled:end,onclick:function(){stop();go(cur+1)}},"▶"),
      h("span",{class:"an-p mono"},Math.max(0,cur+1)+" / "+n));
    var kids=[h("div",{class:"an-hd"},h("b",null,opt.title||"Adım adım anlat"),h("small",null,"Paket her adımda bir sonraki durağa ilerler")),h("ol",{class:"an-fl"},rows),ctl];
    if(end)kids.push(h("div",{class:"an-end"},h("div",{class:"an-ex"},h("b",null,"Örnek"),h("pre",null,E.x)),E.f&&E.f[0]?h("div",{class:"an-fail"},h("b",null,"Bozulursa: "+E.f[0][0]),h("span",null,E.f[0][1])):null));
    box.replaceChildren.apply(box,kids);
  }
  paint();if(st.play)tick();return box;
}
/* ders odası */
var LR_STEPS=[["isinma","Isınma"],["anlat","Anlatım"],["sinav","Mini sınav"],["alis","Alıştırma"],["notlar","Notlar"]];
function lrFind(){var L=S.les,list=lessonListFor(L.track).list;return list.filter(function(x){return x.id===L.room})[0]||null}
function lrOpen(l,step){var L=S.les;L.room=l.id;L.track=l.track;L.rs=step||lrAuto(l);draw();window.scrollTo(0,0)}
function lrClose(){S.les.room=null;draw();window.scrollTo(0,0)}
function lrAuto(l){var k=lessonKey(l);if(!lcGrand(l)&&!lcHas(k,"w"))return "isinma";if(!lcGrand(l)&&!lcHas(k,"r"))return "anlat";if(!lcHas(k,"q"))return "sinav";if(!lcHas(k,"p"))return "alis";return "notlar"}
function lrDone(l,s){var k=lessonKey(l);return s==="isinma"?lcHas(k,"w"):s==="anlat"?lcHas(k,"r"):s==="sinav"?lcHas(k,"q"):s==="alis"?lcHas(k,"p"):lcDone(k)}
function lrSet(l,s){S.les.rs=s;draw();window.scrollTo(0,0)}
function renderLessonRoom(){
  var L=S.les,l=lrFind();if(!l){L.room=null;return null}
  var tr=l.track,k=lessonKey(l),grand=lcGrand(l);lcSync(l);
  if(!l.warmup&&!(L.wg[l.id]&&L.wg[l.id].w)){L.wg[l.id]=L.wg[l.id]||{};L.wg[l.id].w=localWarm(l)}
  var rs=L.rs||lrAuto(l),idx=LR_STEPS.map(function(x){return x[0]}).indexOf(rs);if(idx<0){idx=0;rs="isinma"}
  var dn=LR_STEPS.filter(function(x){return lrDone(l,x[0])}).length,out=[];
  var T=tmFor(l);
  out.push(h("div",{class:"lr-head lr-"+tr},
    h("button",{class:"lr-back",type:"button",onclick:lrClose},"← Derslere dön"),
    h("div",{class:"lr-k"},"DERS ODASI · "+trName(tr)),h("h2",null,l.title||"Ders"),
    h("div",{class:"lr-meta"},h("span",null,"≈ "+lessonMinutes(l)+" dk"),h("span",null,dn+"/5 adım tamam")),
    h("div",{class:"lr-bar"},h("i",{style:"width:"+Math.round(dn/5*100)+"%"})),
    h("div",{class:"lr-steps",role:"tablist"},LR_STEPS.map(function(x,i){var d=lrDone(l,x[0]);return h("button",{type:"button",role:"tab","aria-selected":x[0]===rs?"true":"false",class:"lr-s"+(d?" done":""),onclick:function(){lrSet(l,x[0])}},h("b",null,d?"✓":String(i+1)),h("span",null,x[1]))}))));
  var body=[];
  function nextBtn(label,to,cls){return h("button",{class:"btn big"+(cls||""),type:"button",onclick:function(){lrSet(l,to)}},label)}
  if(rs==="isinma"){
    body.push(h("div",{class:"lr-sec"},h("div",{class:"label"},"1 · Isınma"),h("h3",null,"Önce haritayı gör"),h("div",{class:"small mute"},"Kısa bir bakış: konu neden var, nerede kullanılır. Sonra kavramları ısıt.")));
    if(l.hook)body.push(h("div",{class:"lbox"+(tr==="eng"?" eng":"")},h("div",{class:"label"},"Bir cümleyle"),h("p",null,l.hook)));
    var tm=renderTMap(l,false);if(tm)body.push(tm);
    var wu=renderWarmup(l);if(wu)body.push(wu);
    var ww=l.warmup||(L.wg[l.id]&&L.wg[l.id].w),its=ww?(tr==="eng"?ww.words:ww.concepts)||[]:[],rdy=0;its.forEach(function(x,i){if(L.wk[l.id+":"+i])rdy++});
    var allr=rdy>=its.length;
    body.push(h("div",{class:"panel"},h("button",{class:"btn big",type:"button",disabled:!allr&&!lcHas(k,"w"),onclick:function(){lcSet(k,"w",tr);rtToast("Isınma tamam. Anlatım açıldı.");lrSet(l,"anlat")}},lcHas(k,"w")?"Anlatıma geç":"Isınmayı bitirdim, derse gir"),
      h("div",{class:"small mute",style:"margin-top:6px"},its.length&&!allr&&!lcHas(k,"w")?"Kartlarda 'Hazırım' de, sonra ders açılır. ("+rdy+"/"+its.length+")":"Hazırsın.")));
  }else if(rs==="anlat"){
    if(!grand&&!lcHas(k,"w")){body.push(h("div",{class:"panel"},h("div",{class:"label"},"Kilitli"),h("h3",null,"Önce ısınma"),h("div",{class:"small mute"},"Anlatım, ısınmayı bitirince açılır."),nextBtn("Isınmaya git","isinma")))}
    else{
      body.push(h("div",{class:"lr-sec"},h("div",{class:"label"},"2 · Anlatım"),h("h3",null,l.title||"Ders")));
      if(T)body.push(h("div",{class:"panel"},renderAnim(T.m)));
      var nsc=l&&/^(eng|ing)/i.test(String(l.track||l.tr||""))?null:nwFor(l);if(nsc)body.push(h("div",{class:"panel"},h("div",{class:"label"},"Hareketli anlatım"),h("h3",null,nsc.t),nwPlayer(nsc)));
      var blocks=(Array.isArray(l.blocks)?l.blocks:[]).map(lblock).filter(Boolean);
      body.push(h("div",{class:"panel lr-read"},h("div",{class:"lsn"},blocks),l.homework?h("div",{class:"lbox warn"},h("div",{class:"label"},"Bugünün görevi"),h("p",null,l.homework)):null));
      var lt=lessonTerms(l);if(lt)body.push(lt);
      var vc=Array.isArray(l.vocab)?l.vocab:[];
      if(vc.length)body.push(h("div",{class:"panel"},h("h2",null,"Kelimeler"),vc.map(function(v){return h("div",{style:"display:grid;gap:2px;border-top:1px solid var(--line);padding-top:8px"},h("div",null,h("b",null,v.term||""),v.tr?" · "+v.tr:""),v.ex?h("div",{class:"small mute"},v.ex):null)})));
      if(l.coachNote)body.push(h("div",{class:"lbox"+(tr==="eng"?" eng":"")},h("div",{class:"label"},"Koçun notu"),h("p",null,l.coachNote)));
      var rd=lcHas(k,"r");
      body.push(h("div",{class:"panel"},h("button",{class:"btn big",type:"button",onclick:function(){if(!grand){lcSet(k,"r",tr)}var o={};o["read_"+tr]=true;setProg(o);lrSet(l,"sinav")}},rd?"Mini sınava geç":"Okudum, mini sınava geç")));
    }
  }else if(rs==="sinav"){
    body.push(h("div",{class:"lr-sec"},h("div",{class:"label"},"3 · Mini sınav"),h("h3",null,"Öğrendiğini dene")));
    var q=lessonQuiz(l);body.push(q||h("div",{class:"panel"},h("div",{class:"small mute"},"Bu derste mini sınav yok.")));
    body.push(h("div",{class:"panel"},nextBtn("Alıştırmaya geç","alis")));
  }else if(rs==="alis"){
    var pd=lcHas(k,"p");
    body.push(h("div",{class:"lr-sec"},h("div",{class:"label"},"4 · Alıştırma"),h("h3",null,pd?"Alıştırma tamam":"Şimdi pratik zamanı"),
      h("div",{class:"small mute"},"Öğrenme pratikle oturur. Atölye'de birkaç soru çöz, ders sayılır.")));
    body.push(h("div",{class:"panel"},pd?h("div",{class:"qz-sum all"},h("b",null,"✓"),h("span",null,"Bu ders için alıştırmanı yaptın.")):null,
      h("button",{class:"btn big",type:"button",onclick:function(){goTab("atolye")}},pd?"Atölye'de daha çöz":"Atölye'ye git"),
      h("div",{style:"height:8px"}),nextBtn("Ders notlarına geç","notlar"," ghost")));
  }else{
    body.push(h("div",{class:"lr-sec"},h("div",{class:"label"},"5 · Eğitici notları"),h("h3",null,"Bu dersten geriye kalanlar"),h("div",{class:"small mute"},"Dersin özeti defter sayfası olarak burada. Kendi notunu da ekleyebilirsin; Notlar bölümünde de görünür.")));
    var qsx=Array.isArray(l.quiz)?l.quiz:[],miss=qsx.filter(function(q,i){return L.mark[l.id+":"+i]==="no"});
    var tk=[];if(T){tk=T.m.p.slice()}
    body.push(h("div",{class:"panel lr-take"},h("div",{class:"label"},"Aklında kalsın"),
      T?h("ul",{class:"lr-ul"},[h("li",null,h("b",null,"Ana fikir: "),T.m.h),h("li",null,h("b",null,"Sonunda bileceklerin: "),T.m.o)].concat(T.m.u.slice(0,3).map(function(u){return h("li",null,h("b",null,"Nerede? "),u[0]+" → "+u[1])}))):(l.hook?h("p",null,l.hook):null),
      miss.length?h("div",{class:"lr-miss"},h("div",{class:"label",style:"color:var(--bad)"},"Kaçırdıkların (tekrar listende)"),miss.map(function(q){return h("div",{class:"qz-fb no"},h("b",null,q.q),h("div",null,"Doğru: "+String(q.answer==null?"":q.answer)),q.why?h("div",{class:"small"},q.why):null)})):(qsx.length?h("div",{class:"qz-sum all"},h("b",null,"✓"),h("span",null,"Kaçırdığın soru yok.")):null)));
    body.push(h("div",{class:"nb"},h("i",{class:"nb-tape"}),ntPageEl({id:"l:"+l.id,grp:"Ders notları",title:l.title||"Ders",kind:"l",d:l})));
    var dd=lcDone(k);
    body.push(h("div",{class:"panel"},dd?h("div",{class:"qz-sum all"},h("b","✓"),h("span",null,"Ders tamamlandı. Sıradaki konu açıldı.")):h("div",{class:"small mute"},"Eksik adımlar: "+LR_STEPS.slice(0,4).filter(function(x){return !lrDone(l,x[0])}).map(function(x){return x[1]}).join(", ")),
      h("div",{class:"row",style:"margin-top:8px"},h("button",{class:"btn big",type:"button",onclick:lrClose},"Derslere dön"),
        h("button",{class:"btn ghost",type:"button",onclick:function(){S.les.room=null;S.les.view="not";S.nt.tr=tr;S.nt.pid="l:"+l.id;draw();window.scrollTo(0,0)}},"Defterde aç"))));
  }
  if(idx>0||idx<LR_STEPS.length-1)body.push(h("div",{class:"lr-nav"},idx>0?h("button",{class:"btn ghost",type:"button",onclick:function(){lrSet(l,LR_STEPS[idx-1][0])}},"‹ "+LR_STEPS[idx-1][1]):h("span"),idx<LR_STEPS.length-1?h("button",{class:"btn ghost",type:"button",onclick:function(){lrSet(l,LR_STEPS[idx+1][0])}},LR_STEPS[idx+1][1]+" ›"):h("span")));
  return out.concat(body);
}

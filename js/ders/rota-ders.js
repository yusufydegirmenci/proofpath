"use strict";
/* ---- ilerleme / rota / kaynak / canlı ders ---- */
function goTab(t){tab=t;try{history.replaceState(null,"","#"+t)}catch(e){}draw();window.scrollTo(0,0)}
function prog(){return S.progress.filter(function(p){return p.id===today()})[0]||{}}
function setProg(patch){
  if(!S.db||!S.canWrite)return;
  var cur=prog(),d={};for(var k in cur)if(k!=="id")d[k]=cur[k];
  for(var k2 in patch)d[k2]=patch[k2];d.date=today();d.ts=new Date().toISOString();
  S.db.doc("progress/"+today()).set(d).catch(function(){});
}
function qTotals(){var p=prog(),ok=0,tot=0;["ccna","eng"].forEach(function(t){ok+=num(p["q_"+t+"_ok"]);tot+=num(p["q_"+t+"_total"])});return {ok:ok,tot:tot}}
var RTYPE={video:"Video",doc:"Doküman",lab:"Lab",podcast:"Podcast",tool:"Araç",practice:"Alıştırma",book:"Kitap"};
function resUrl(r){return safeUrl(r&&r.url)||(r&&r.query?"https://www.youtube.com/results?search_query="+encodeURIComponent(String(r.query).slice(0,120)):null)}
function renderResources(l){
  var rs=(Array.isArray(l.resources)?l.resources:[]).filter(function(r){return r&&r.title&&resUrl(r)}).slice(0,8);
  if(!rs.length)return null;
  return h("div",{class:"panel",id:"ls-kaynak"},h("h2",null,"Derinleşmek için"),
    h("div",{class:"small mute"},"Bu dersin bağlamına göre seçilmiş kaynaklar. Hepsi gerekmez; önce ilkini dene."),
    rs.map(function(r,i){var u=resUrl(r),direct=!!safeUrl(r.url);
      return h("div",{class:"rcard"},
        h("div",{style:"display:flex;gap:8px;align-items:center;flex-wrap:wrap"},h("span",{class:"pill"+(i===0?" ok":"")},i===0?"önce bu":(RTYPE[r.type]||"Kaynak")),i===0&&RTYPE[r.type]?h("span",{class:"pill"},RTYPE[r.type]):null,
          r.length?h("span",{class:"mono mute small"},r.length):null,r.level?h("span",{class:"mono mute small"},r.level):null,r.lang?h("span",{class:"mono mute small"},r.lang):null),
        h("a",{href:u,target:"_blank",rel:"noopener"},r.title+(direct?"":" (YouTube'da ara)")),
        r.why?h("div",{class:"small mute"},"Neden bu: "+r.why):null)}));
}
function genLessonPrompt(track,t){
  var T=topicsOf(track);if(!T.length)T=starterTopics(track);var known=T.filter(function(x){return x.status==="built"||x.status==="building"}).map(function(x){return x.name});
  var eng=track==="eng";
  return "Sen "+UN()+"'ın "+certName(track)+" koçusun. "+UN()+" bu alanda SIFIRDAN başlayan biri; küçümseme, 'kolay/basit' deme. Bugünkü KONU: "+t.name+" (alan: "+(t.area||"")+"). Benzetme ipucu: "+(t.analogy||"yok")+". "+UN()+"'ın bildiği konular: "+(known.join(", ")||"henüz yok")+". Yalnız bilinenlerle ve bu konuyla anlat; aynı anda en çok 1-2 yeni kavram."+plHint(track)+"\n"+
  ((track==="sec"||track==="bk"||track==="dev"||track==="net"||track==="qa")?"Yöntem: gerçek bir iş olayıyla başla (ör. 'API bir saat yanıt vermedi' ya da 'çalışan şüpheli e-posta aldı') → neden böyle oldu → savunma/uygulama adımları → sınav hedefine bağla ("+certName(track)+") → günlük hayat benzetmesi ('Yani ...') → benzetmenin bozulduğu yer (warn) → 3-5 komut ya da kod (cmd; yalnız kendi izole labında, doğru olmayan komut yazma). Dış kaynak kullanırsan metinde [1], [2] işareti koy ve sources dizisine {title,url} yaz (yalnız doğruladığın HTTPS bağlantı).\n":eng?"Yöntem: Türkçe cümleyi eklerine parçala, her parçanın İngilizcesini bul, sırala (ör. 'Kendinizi tanıtabilir misiniz?' → tanıt + -abil + -siniz → introduce + can + you → Can you introduce yourself?). split bloklarında bu yöntemi kullan (3 adet). Gramer ve kelime %100 doğru olsun.\n":"Yöntem: önce 'Sana şu talep gelebilir' → olası sebepler → çözüm adımları → 'işte bunun için öğrendin' zinciri; sonra günlük hayat benzetmesi ('Yani ...'), benzetmenin bozulduğu yer (warn), 3-5 komut (cmd, doğru olmayan komut yazma). Sorular özgün olsun, gerçek sınav sorusu kullanma.\n")+
  "ÇIKTI: yalnızca JSON nesnesi: {\"title\":\"kısa başlık\",\"hook\":\"tek cümle özet\",\"blocks\":[{\"t\":\"h\",\"text\":\"\"},{\"t\":\"p\",\"text\":\"\"},{\"t\":\"box\",\"h\":\"\",\"text\":\"\"},{\"t\":\"warn\",\"h\":\"\",\"text\":\"\"},{\"t\":\"steps\",\"h\":\"\",\"items\":[\"\"]},{\"t\":\"cmd\",\"text\":\"\"}"+(eng?",{\"t\":\"split\",\"tr\":\"\",\"parts\":[{\"tr\":\"\",\"q\":\"\",\"en\":\"\"}],\"result\":\"\"}":"")+"] (8-14 blok, düz metin, markdown yok),\"quiz\":[5 öğe {\"q\":\"\",\"options\":[\"\",\"\",\"\"],\"answer\":\"doğru cevap\",\"why\":\"sebep\"}],\"interview\":[2 öğe {\"q\":\"\",\"a\":\"\"}],\"vocab\":[5 öğe {\"term\":\"\",\"tr\":\"\",\"ex\":\"\"}],\"homework\":\"Sınıf sekmesinde 5 soru çöz + ...\",\"resources\":[3 öğe {\"title\":\"\",\"query\":\"YouTube'da aranacak somut arama ifadesi\",\"type\":\"video\",\"why\":\"neden bu\",\"length\":\"\",\"level\":\"başlangıç\"}] } . URL uydurma; yalnız query ver."+warmInstr(track);
}
function genLesson(track){
  var G=S.gen;if(!S.sample||G.busy)return;
  var tid=defaultTopic(track),t=topicById(tid);
  if(!t){G.err="Konu haritası henüz açılmadı.";draw();return}
  G.busy=true;G.err=null;G.ctl=new AbortController();draw();
  S.sample.json(genLessonPrompt(track,t),{signal:G.ctl.signal,cache:false}).then(function(o){
    if(!o||typeof o.title!=="string"||!Array.isArray(o.blocks)||o.blocks.length<3)throw {code:"invalid_json"};
    var okT={h:1,p:1,box:1,warn:1,steps:1,cmd:1,split:1,eng:1};
    var doc={id:today()+"-"+track+"-live"+(S.nonOwner?"-"+t.id:""),date:today(),track:track,kind:"canlı ders",generated:true,title:o.title.slice(0,80),hook:String(o.hook||"").slice(0,200),
      blocks:o.blocks.filter(function(b){return b&&okT[b.t]}).slice(0,16),quiz:(Array.isArray(o.quiz)?o.quiz:[]).slice(0,6),interview:(Array.isArray(o.interview)?o.interview:[]).slice(0,4),
      vocab:(Array.isArray(o.vocab)?o.vocab:[]).slice(0,10),warmup:cleanWarm(o.warmup),homework:String(o.homework||"").slice(0,300),resources:(Array.isArray(o.resources)?o.resources:[]).slice(0,4),topicId:t.id,ts:new Date().toISOString()};
    S.les.track=track;S.les.id=doc.id;
    S.lessons=S.lessons.filter(function(x){return x.id!==doc.id}).concat([doc]);
    if(S.db)S.db.doc("lessons/"+doc.id).set(doc).catch(function(){});
  }).catch(function(e){G.err=sampleErr(e)}).then(function(){G.busy=false;G.ctl=null;draw()});
}
function routeStepsOld(){
  var td=today(),P=prog(),steps=[],rep=S.reports.filter(function(r){return r.date===td})[0];
  [["ccna","CCNA"],["eng","İngilizce"]].forEach(function(tr){
    var T=tr[0],has=lessonsOf(T).some(function(l){return l.date===td}),n=S.attempts.filter(function(a){return a.date===td&&a.track===T}).length;
    steps.push({tr:T,t:tr[1]+": dersi oku",d:!!P["read_"+T],go:function(){S.les.track=T;S.les.id=null;goTab("ders")},b:"Dersi aç",note:(has||WEB)?null:"Bugünün dersi akşam hazırlanır. Beklemek istemezsen Ders ekranından hemen üretebilirsin."});
    steps.push({tr:T,t:tr[1]+": 5 canlı soru",d:n>=5,prog:Math.min(n,5)+"/5",go:function(){S.cls.track=T;S.cls.topicId=null;S.cls.phase="idle";goTab("sinif")},b:"Soruları çöz"});
  });
  TRK_LIST.filter(function(o){return o[0]!=="ccna"&&o[0]!=="eng"}).forEach(function(tr){var T=tr[0];if(lessonsOf(T).some(function(l){return l.date===td}))steps.push({tr:T,t:tr[1]+": dersi oku",d:!!P["read_"+T],go:function(){S.les.track=T;S.les.id=null;S.les.view="ders";goTab("ders")},b:"Dersi aç"})});
  steps.push({tr:"eng",t:"İngilizce: 1 ticket yanıtla",d:num(P.ticket_n)>=1,go:function(){goTab("masa")},b:"Talebi aç"});
  steps.push({tr:"eng",t:"İngilizce: 3 cümleyi sesli tekrar et",d:!!P.voice,toggle:function(){setProg({voice:!P.voice})},b:P.voice?"Geri al":"Yaptım, işaretle",note:"telefona kaydet, dinle"});
  steps.push({tr:"",t:"Bugünün 3 satırını kaydet",d:!!rep,go:function(){var el=document.getElementById("reportForm");if(el)el.scrollIntoView({behavior:"smooth",block:"center"});else goTab("bugun")},b:"Raporu doldur"});
  return steps;
}
function burst(){
  var box=h("div",{class:"confetti","aria-hidden":"true"}),cols=["var(--net)","var(--eng)","var(--rust)","#8b6cff","var(--ok)"];
  for(var i=0;i<36;i++)box.append(h("i",{style:"left:"+(Math.random()*100)+"%;background:"+cols[i%cols.length]+";animation-delay:"+(Math.random()*.5)+"s;animation-duration:"+(1.4+Math.random()*1)+"s;transform:rotate("+(Math.random()*180)+"deg)"}));
  document.body.append(box);setTimeout(function(){box.remove()},3000);
}
function renderRouteOld(){
  var steps=routeSteps(),done=steps.filter(function(x){return x.d}).length,nxt=steps.filter(function(x){return !x.d})[0];
  return h("div",{class:"panel route"},
    h("div",{style:"display:flex;justify-content:space-between;gap:8px;align-items:center;flex-wrap:wrap"},h("h2",null,"Bugünün rotası"),h("span",{class:"pill"+(done===steps.length?" ok":"")},done+" / "+steps.length)),
    h("div",{class:"xpbar"},h("i",{style:"width:"+(done/steps.length*100)+"%"})),
    nxt?null:h("div",{class:"lbox"},h("p",null,"Bugünkü rota tamam. Seri korundu, koçlar yarın buna göre ders kurar.")),
    steps.map(function(x){return h("div",{class:"rstep"+(x.d?" done":"")+(x===nxt?" cur":""),"data-track":x.tr||""},h("div",{class:"l"},h("span",{class:"dot"}),h("div",null,h("div",{class:"t"},x.t+(x.prog?" ("+x.prog+")":"")),x.note&&!x.d?h("div",{class:"small mute"},x.note):null)),
      h("button",{class:"btn ghost",type:"button",onclick:function(){(x.go||x.toggle)()}},x.b))}));
}

/* ---- Ders ---- */
function lessonsOf(track){return S.lessons.filter(function(l){return l.track===track}).sort(function(a,b){return String(b.date).localeCompare(String(a.date))})}
function safeUrl(u){return typeof u==="string"&&/^https:\/\//.test(u)?u:null}
/* Python ve JavaScript hattı: dersin "alan" bloğu PP_PY/PP_JS.alanlar tanımını PP.alan paneline çevirir; panel önbelleklenir (yeniden çizimde yazılan kod kaybolmaz) */
var PY_EL={};
function pyAlan(id){
  var K=[window.PP_PY,window.PP_JS].filter(function(k){return k&&k.alanlar.some(function(x){return x.id===id})})[0],a=K&&K.alanlar.filter(function(x){return x.id===id})[0];
  if(!a||!window.PP||!PP.alan)return h("div",{class:"lbox warn"},"Uygulama alanı yüklenemedi; kod örneklerini kendi bilgisayarında dene.");
  if(!PY_EL[id]){var t=PP.alan.tanimla(Object.assign({},a,{veri:K.veri}));if(!t.ok)return h("div",{class:"lbox warn"},"Alan tanımı geçersiz: "+t.neden);PY_EL[id]=PP.alan.kur(t.alan,{})}
  return PY_EL[id];
}
function lblock(b){
  if(!b||typeof b!=="object")return null;
  if(b.t==="alan")return pyAlan(b.id);
  var t=b.t,txt=typeof b.text==="string"?b.text:"",items=Array.isArray(b.items)?b.items:[];
  if(t==="h")return h("h3",null,txt);
  if(t==="p")return h("p",null,fnText(txt));
  if(t==="box"||t==="warn"||t==="eng")return h("div",{class:"lbox"+(t==="box"?"":" "+t)},b.h?h("div",{class:"label"},b.h):null,h("p",null,fnText(txt)));
  if(t==="steps")return h("div",null,b.h?h("div",{class:"label",style:"margin-bottom:6px"},b.h):null,h("ol",{class:"lsteps"},items.map(function(x){return h("li",null,String(x))})));
  if(t==="cmd")return h("pre",{class:"lcode"},txt||items.join("\n"));
  if(t==="split"){
    var parts=Array.isArray(b.parts)?b.parts:[];
    return h("div",{class:"lbox eng"},h("div",{class:"label"},"Parçala"),h("div",{style:"font-size:17px"},b.tr||""),
      h("div",{class:"chips"},parts.map(function(p){return h("div",{class:"chip"},h("span",{class:"small mute"},p.tr||""),h("i",null,p.q||""),h("b",null,p.en||""))})),
      b.result?h("div",{style:"font:600 18px var(--f-body)"},"→ "+b.result):null);
  }
  return null;
}
function revBtn(key,label,content){
  var L=S.les,on=L.rev[key];
  return h("div",{class:"fb"+(on?"":" "),style:on?"":"border-left-color:transparent;padding-left:0"},
    h("button",{class:"btn ghost",type:"button",onclick:function(){L.rev[key]=!L.rev[key];draw()}},on?"Gizle":label),on?content:null);
}
function saveMarks(l){
  var qs=Array.isArray(l.quiz)?l.quiz:[],ok=0,L=S.les;
  qs.forEach(function(q,i){if(L.mark[l.id+":"+i]==="ok")ok++});
  var o={};o["q_"+l.track+"_ok"]=ok;o["q_"+l.track+"_total"]=qs.length;setProg(o);var mk=0;qs.forEach(function(q,i){if(L.mark[l.id+":"+i])mk++});if(mk===qs.length)quizMilestone(l,ok,qs.length);if(mk===qs.length)try{PP.ogr.ui.dersSinavi(l,ok,qs.length,qs.every(function(q,i){return L.pick&&L.pick[l.id+":"+i]!=null}))}catch(e){}
}
function askCoach(l,text){
  var A=S.les.ask;if(!text.trim())return;
  var r=window.PPLocal?PPLocal.searchLesson(l,text):[];
  A.err=null;
  A.ans=r.length?r.map(function(c){return "• "+c.k+": "+c.t}).join("\n\n"):"Bu derste eşleşen bir yer bulamadım. Soruyu başka kelimelerle yaz ya da aşağıdaki kaynaklara bak.";
  draw();
}
function lessonMinutes(l){
  if(typeof l.minutes==="number"&&l.minutes>0)return Math.round(l.minutes);
  var w=0;(l.blocks||[]).forEach(function(b){w+=(b.text+" "+b.h+" "+b.items.join(" ")+" "+b.parts.map(function(p){return p.tr+p.q+p.en}).join(" ")).split(/\s+/).length});
  return Math.max(5,Math.ceil(w/150)+(l.quiz||[]).length*2+(l.interview||[]).length);
}
function lessonNav(l){
  var items=[["ls-isinma","Isınma",(l.warmup||(S.les.wg[l.id]&&S.les.wg[l.id].w))?1:0],["ls-ders","Anlatım"],["ls-sinav","Mini sınav",(l.quiz||[]).length],["ls-mulakat","Mülakat",(l.interview||[]).length],["ls-kaynak","Kaynaklar",(l.resources||[]).length]].filter(function(x){return x[2]===undefined||x[2]>0});
  return h("div",{class:"lnav",role:"navigation","aria-label":"Ders bölümleri"},items.map(function(x){
    return h("button",{type:"button",class:"opt",onclick:function(){var el=document.getElementById(x[0]);if(el)el.scrollIntoView({behavior:"smooth",block:"start"})}},x[1])}));
}

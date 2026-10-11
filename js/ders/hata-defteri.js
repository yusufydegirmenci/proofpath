"use strict";
/* ---- hata defteri (Leitner), tekrar kuyruğu, anlat-öğren, odak ---- */
var LEIT=PP.ogr.tekrar.ARALIK;   /* tek aralık tanımı: 1, 3, 7, 14, 30 gün */
function addDays(s,n){var d=parse(s);d.setDate(d.getDate()+n);return iso(d)}
function mistakeId(l,i){return String(l.id+"-"+i).replace(/[^A-Za-z0-9_-]/g,"_").slice(0,80)}
function mistakeOf(id){return S.mistakes.filter(function(m){return m.id===id})[0]}
function noteMistake(l,i,q){
  if(!S.db||!S.canWrite)return;
  S.db.doc("mistakes/"+mistakeId(l,i)).set({track:l.track,q:q.q,answer:q.answer,why:q.why||"",lesson:l.title||"",date:today(),box:1,due:addDays(today(),1),done:false,ts:new Date().toISOString()}).catch(function(){});
}
function unnoteMistake(l,i){
  var m=mistakeOf(mistakeId(l,i));
  if(m&&m.date===today()&&m.box===1&&S.db&&S.canWrite)S.db.doc("mistakes/"+m.id).delete().catch(function(){});
}
function mistakesDue(){return S.mistakes.filter(function(m){return !m.done&&String(m.due||"")<=today()}).sort(function(a,b){return String(a.due).localeCompare(String(b.due))})}
function reviewMistake(m,ok){
  if(!S.db||!S.canWrite)return;
  var box=ok?num(m.box)+1:1,done=box>LEIT.length,b=Math.min(box,LEIT.length);
  S.mrev[m.id]=false;
  S.db.doc("mistakes/"+m.id).update({box:b,due:addDays(today(),LEIT[b-1]),done:done,ts:new Date().toISOString()}).catch(function(){});
  if(ok)setProg({mrev_ok:num(prog().mrev_ok)+1});
}
function recallOf(t){
  var a=daysAgo(t.lastReview);
  if(a==null||t.status==="locked"||t.status==="next"||num(t.mastery)<=0)return null;
  return Math.exp(-a/(3+num(t.mastery)*.25));
}
function riskTopics(){
  return S.topics.map(function(t){return {t:t,r:recallOf(t)}}).filter(function(x){return x.r!=null&&x.r<.85}).sort(function(a,b){return a.r-b.r}).slice(0,3);
}
/* Faz 4: PP.ogr telafi + aralıklı tekrar planı (ya_pp_ogr denemelerinden; kalıcı, cezasız) */
function ogrPlanItems(){
  var P;try{P=PP.ogr.ui.tekrarPlani()}catch(e){return []}
  return P.bugun.slice(0,3).map(function(x){
    var yer=PP.ogr.ui.hedefYeri(x.hedef);
    function git(){if(!yer)return;if(yer.atolye){goTab("atolye");return}var l=lessonForTopic(yer.yol,yer.konu);if(l){goTab("ders");lrOpen(l,"sinav")}}
    return h("div",{class:"rq pp-tk"+(x.durum==="kaldi"?" risk":""),"data-hedef":x.hedef},h("div",{style:"min-width:0"},
      h("div",{class:"small mute"},(x.durum==="kaldi"?"telafi":"aralıklı tekrar")+(x.kritik?" · kritik":"")+" · neden bugün?"),
      h("div",null,x.ad),h("div",{class:"small"},x.neden),
      x.telafi&&x.telafi.length?h("details",{class:"small"},h("summary",null,"Telafi adımları"),h("ol",null,x.telafi.slice(1).map(function(a){return h("li",null,a.metin)}))):null),
      yer?h("button",{class:"btn ghost",type:"button",onclick:git},x.durum==="kaldi"?"Telafi et":"Tekrarla"):null);
  });
}
function renderReviewQueue(){
  var due=mistakesDue(),risk=riskTopics(),pl=ogrPlanItems(),total=due.length+risk.length+pl.length;
  var items=pl.slice();
  due.slice(0,3).forEach(function(m){
    var on=S.mrev[m.id];
    items.push(h("div",{class:"rq "+(m.track==="eng"?"eng":"")},
      h("div",{class:"small mute"},trName(m.track)+" · hata defteri · kutu "+num(m.box)+"/5"),
      h("div",{class:"rq-q"},m.q||""),
      on?h("div",{class:"fb"},h("div",null,h("b",null,"Cevap: "),m.answer||""),m.why?h("div",{class:"small mute"},m.why):null,
        h("div",{style:"display:flex;gap:6px;margin-top:8px;flex-wrap:wrap"},
          h("button",{class:"btn",type:"button",onclick:function(){reviewMistake(m,true)}},"Hatırladım"),
          h("button",{class:"btn ghost",type:"button",onclick:function(){reviewMistake(m,false)}},"Unuttum"))):
      h("button",{class:"btn ghost",type:"button",onclick:function(){S.mrev[m.id]=true;draw()}},"Önce kendin cevapla, sonra göster")));
  });
  risk.forEach(function(x){
    items.push(h("div",{class:"rq risk"},h("div",{style:"min-width:0"},h("div",null,x.t.name),
      h("div",{class:"small mute"},"tahmini hatırlama %"+Math.round(x.r*100)+" · son tekrar "+daysAgo(x.t.lastReview)+" g önce")),
      h("button",{class:"btn ghost",type:"button",onclick:function(){S.cls.track=x.t.track;S.cls.topicId=x.t.id;S.cls.phase="idle";goTab("sinif")}},"Çöz")));
  });
  return h("div",{class:"panel"},
    h("div",{style:"display:flex;justify-content:space-between;gap:8px;align-items:center;flex-wrap:wrap"},h("h2",null,"Tekrar kuyruğu"),h("span",{class:"pill"+(total?" eng":" ok")},total?total+" bekliyor":"temiz")),
    items.length?items:h("div",{class:"empty"},"Şimdilik temiz. Mini sınavda kaçırdığın sorular burada, unutmanın tam başladığı günde geri gelir."),
    h("div",{class:"small mute"},"Yanlışlar 1, 3, 7, 14 ve 30. günde sorulur; hatırlarsan bir kutu ilerler, unutursan başa döner. Konu önerisi bir tahmindir (ustalık ve son tekrar günü), ölçüm değil. Telafi ve tekrar öğeleri mini sınav denemelerinden hesaplanır; kaçırmak ceza getirmez."));
}
function teachBack(l,text){
  var T=S.les.tb[l.id]=S.les.tb[l.id]||{busy:false,ans:null,err:null},eng=l.track==="eng";
  if(T.busy||text.trim().length<20||!window.PPLocal)return;
  var g=PPLocal.grade(text,"",PPLocal.lessonTerms(l),{only:true,target:eng?3:4,max:18});
  var lines=[];
  lines.push("Anahtar kavram kıyası: "+g.score+"/10 ("+g.hit.length+" kavram yakaladın)");
  if(g.hit.length)lines.push("Yakaladığın: "+g.hit.slice(0,8).join(", "));
  if(g.miss.length)lines.push("Derste olup anlatımda geçmeyen: "+g.miss.slice(0,6).join(", "));
  if(eng){
    var m=[];if(/(^|[.!?]\s+)[a-z]/.test(text.trim()))m.push("cümleleri büyük harfle başlat");if(/\bi\b/.test(text))m.push("'I' büyük yazılır");if(!/[.!?]\s*$/.test(text.trim()))m.push("cümleyi nokta ile bitir");
    if(m.length)lines.push("Yazım: "+m.join("; "));
  }
  lines.push("\nÖrnek anlatım (kendi cümlelerinle karşılaştır):\n"+PPLocal.lessonModel(l));
  lines.push("\nBu bir anahtar kelime kıyasıdır, kesin ölçü değildir. Kendi sözlerinle doğru anlatmış olabilirsin.");
  T.ans=lines.join("\n");T.err=null;
  var o={teach_ok:num(prog().teach_ok)+(g.score>=5?1:0)};
  var tk=prog().teach_log;tk=(tk&&typeof tk==="object")?tk:{};tk=JSON.parse(JSON.stringify(tk));tk[l.id]={score:g.score,miss:g.miss.slice(0,6),ts:Date.now()};
  var ks=Object.keys(tk);if(ks.length>60){ks.sort(function(a,b){return tk[a].ts-tk[b].ts}).slice(0,ks.length-60).forEach(function(k){delete tk[k]})}
  o.teach_log=tk;setProg(o);draw();
}
function renderTeach(l){
  var T=S.les.tb[l.id]=S.les.tb[l.id]||{busy:false,ans:null,err:null,text:""},eng=l.track==="eng";
  var ta=h("textarea",{id:"l-tb",maxlength:900,placeholder:eng?"Write 3-4 sentences in English using today's pattern":"Bir arkadaşına anlatır gibi 3-5 cümle yaz",oninput:function(e){T.text=e.target.value}});ta.value=T.text||"";
  return h("div",{class:"panel"},h("h2",null,"Kendi cümlenle anlat"),
    h("div",{class:"small mute"},"Anlatabiliyorsan öğrenmişsindir. Okuduğunu tekrar okumaktan çok daha güçlü bir tekrar bu. En az 20 karakter yaz."),ta,
    h("div",{style:"display:flex;gap:8px;align-items:center;flex-wrap:wrap"},h("button",{class:"btn",type:"button",onclick:function(){teachBack(l,ta.value)}},"Anlatımımı karşılaştır")),
    T.err?h("div",{class:"fb bad"},T.err):null,T.ans?h("div",{class:"fb"},h("p",{style:"margin:0;white-space:pre-wrap;line-height:1.55"},T.ans)):null);
}
/* odak sayacı */
function fmtT(s){return pad(Math.floor(s/60))+":"+pad(s%60)}
function focusStart(min){
  var F=S.focus;if(F.run)return;
  F.run=true;F.end=Date.now()+min*60000;F.min=min;
  try{if(navigator.wakeLock)navigator.wakeLock.request("screen").then(function(w){F.wl=w},function(){})}catch(e){}
  F.iv=setInterval(function(){
    var left=Math.max(0,Math.round((F.end-Date.now())/1000)),el=document.getElementById("focus-t");
    if(el)el.textContent=fmtT(left);
    var bar=document.getElementById("focus-b");if(bar)bar.style.width=(100-left/(F.min*60)*100)+"%";
    if(left<=0)focusStop(true);
  },500);
  draw();
}
function focusStop(done){
  var F=S.focus;clearInterval(F.iv);F.run=false;try{if(F.wl)F.wl.release()}catch(e){}F.wl=null;
  if(done){setProg({focus_min:num(prog().focus_min)+F.min});burst();try{if(navigator.vibrate)navigator.vibrate([60,40,60])}catch(e){}}
  draw();
}
function renderFocus(){
  var F=S.focus,fm=num(prog().focus_min);
  return h("div",{class:"panel focus"},h("div",{style:"display:flex;justify-content:space-between;gap:8px;align-items:center;flex-wrap:wrap"},h("h2",null,"Odak"),h("span",{class:"pill"+(fm?" ok":"")},"bugün "+fm+" dk")),
    F.run?h("div",{class:"ftime"},h("span",{id:"focus-t",class:"mono"},fmtT(Math.max(0,Math.round((F.end-Date.now())/1000)))),h("div",{class:"xpbar"},h("i",{id:"focus-b",style:"width:0"}))):
      h("div",{class:"small mute"},"Telefonu bırak, tek göreve gir. 25 dakika bitince dinlenme ve toplam dakikana eklenir. Bitirmeden durdurursan eklenmez."),
    h("div",{style:"display:flex;gap:8px;flex-wrap:wrap"},F.run?h("button",{class:"btn ghost",type:"button",onclick:function(){focusStop(false)}},"Bırak"):
      [[25,"25 dk odak"],[15,"15 dk mini"],[45,"45 dk derin"]].map(function(x,i){return h("button",{class:"btn"+(i?" ghost":""),type:"button",onclick:function(){focusStart(x[0])}},x[1])})));
}
var MANTRA=["Unutmak öğrenmenin parçası. Geri çağırmak onu kalıcı yapar.","Okumak değil, hatırlamaya çalışmak öğretir.","Yarım saat kendine sormak, iki saat okumaktan değerlidir.","Yanlış cevap kayıp değil; beynin bir sonrakini daha sıkı tutması.","Küçük ve düzenli, büyük ve nadirden güçlüdür.","Kendi cümlenle anlatamıyorsan henüz tam oturmamıştır.","Zorlanıyorsan doğru yerdesin. Kolay gelen şey genelde kalıcı olmaz.","Aralıklarla tekrar, sınav gecesi ezberinden hep daha uzun yaşar.","Her lab, bir yıl okumaya bedeldir. Yaz, çalıştır, bozdur, düzelt.","Bugünün 20 dakikası, yarının mülakat cevabı.","Hata defterin sınav günü en sadık arkadaşın olur.","Önce tahmin et, sonra bak. Tahmin hatası en iyi öğretmen."];
function mantra(){var d=parse(today()),n=Math.floor((d-new Date(d.getFullYear(),0,0))/864e5);return MANTRA[n%MANTRA.length]}
S.mistakes=[];S.mrev={};S.focus={run:false,end:0,min:25,iv:0,wl:null};S.les.tb={};

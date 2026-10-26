"use strict";
/* ALAN: Masa (destek hattı, İngilizce ticket) ve Müdür paneli.
   NE YAPAR: S.tickets, S.treplies, S.treviews, S.audit, S.avotes durumunu temizler; ticket cevabını denetler/gönderir (checkReply, submitReply); müdür panelini (renderManager) çizer.
   SORUN OLURSA: Küresel S, str/num/pick/objs ve PP.ogr.seri.masa kullanılır (seri S.treplies[].date'ten); renderManager'ı js/bugun/ofis.js çağırır; bulut senkronu syncDesk.
   YENİ ÖZELLİK: Yeni ticket alanı cleanTicket'e eklenir; bu dosyaya özel test yok, seri için tests/hesaplar.js güncellenir. */
/* ---- v14: Masa (ticket) + Müdür ---- */
var LV=[["1","A1","Tek cümle"],["2","A2","Kısa bildirim"],["3","A2-B1","Adım adım yönlendirme"],["4","B1","Profesyonel e-posta"],["5","B1+","Escalation ve yabancı ekip"]];
S.tickets=[];S.treplies=[];S.treviews=[];S.audit=[];S.avotes=[];S.desk={};
S.dk={id:null,draft:{},hint:{},busy:{},fb:{},err:{},gen:{busy:false,err:null},msg:""};
function cleanProjectX(x){return x}
function cleanTicket(t){
  t.date=str(t.date);t.level=Math.max(1,Math.min(5,Math.round(num(t.level))||1));
  ["subject","body","goal","skeleton","model","category","tip"].forEach(function(k){t[k]=str(t[k])});
  var f=t.from&&typeof t.from==="object"&&!Array.isArray(t.from)?t.from:{};t.from=pick(f,["name","role","country"]);
  t.keywords=objs(t.keywords).map(function(x){return pick(x,["w","tr"])}).filter(function(x){return x.w});
  return t.subject&&t.body?t:null;
}
function cleanAudit(a){
  a.week=str(a.week||a.id);a.date=str(a.date);a.verdict=/^(iyi|dikkat|sorun)$/.test(a.verdict)?a.verdict:"dikkat";a.headline=str(a.headline);a.note=str(a.note);
  a.checks=objs(a.checks).map(function(c){var r=pick(c,["name","evidence"]);r.status=/^(ok|warn|bad)$/.test(c.status)?c.status:"warn";return r}).filter(function(c){return c.name});
  a.findings=(Array.isArray(a.findings)?a.findings:[]).map(str).filter(Boolean);
  a.proposals=objs(a.proposals).map(function(p,i){var r=pick(p,["id","text","why"]);r.id=r.id||("p"+(i+1));r.risk=p.risk==="high"?"high":"low";r.applied=!!p.applied;return r}).filter(function(p){return p.text});
  return a;
}
function replyOf(id){return S.treplies.filter(function(r){return r.id===id})[0]||null}
function reviewOf(id){return S.treviews.filter(function(r){return r.id===id})[0]||null}
function tScore(id){var v=reviewOf(id),r=replyOf(id);if(v&&typeof v.score==="number")return v.score;if(r&&typeof r.score==="number")return r.score;return null}
function deskState(){
  var lvl=1,need=3,hist=[];
  for(var L=1;L<=5;L++){
    var good=S.treplies.filter(function(r){return num(r.level)===L&&num(r.hints)<=1&&(tScore(r.id)||0)>=80}).length;
    hist[L]={good:good};
    if(L===lvl&&good>=need&&L<5)lvl=L+1;
  }
  var sc=S.treplies.map(function(r){return {d:String(r.ts||""),s:tScore(r.id)}}).filter(function(x){return x.s!=null}).sort(function(a,b){return b.d.localeCompare(a.d)}).slice(0,10);
  var csat=sc.length?Math.round(sc.reduce(function(a,x){return a+x.s},0)/sc.length):null;
  var days={};S.treplies.forEach(function(r){if(r.date)days[r.date]=1});
  var st=PP.ogr.seri.masa(days,today());
  return {level:lvl,good:(hist[lvl]||{good:0}).good,need:need,csat:csat,streak:st,n:S.treplies.length};
}
function syncDesk(){
  if(!S.db||!S.canWrite)return;
  var ds=deskState();if(!S.treplies.length)return;
  if(num(S.desk.level)===ds.level&&num(S.desk.answered)===ds.n)return;
  S.desk.level=ds.level;S.desk.answered=ds.n;
  S.db.doc("desk/main").set({level:ds.level,answered:ds.n,csat:ds.csat,streak:ds.streak,good_at_level:ds.good,need:ds.need,ts:new Date().toISOString()}).catch(function(){});
}
function allTickets(){
  var have={};S.tickets.forEach(function(t){have[t.id]=1});
  var st=(window.PP_TICKETS||[]).filter(function(t){return !have[t.id]}).map(function(t){return cleanTicket(JSON.parse(JSON.stringify(t)))}).filter(Boolean);
  return S.tickets.concat(st);
}
function ticketsOpen(){
  var ds=deskState();
  return allTickets().sort(function(a,b){return (b.date||"").localeCompare(a.date||"")||a.level-b.level});
}
function deskPrompt(level,hint){
  return "Sen "+UN()+"'ın İngilizce koçusun. "+(S.nonOwner?"Kullanıcı bilişim alanında çalışan veya çalışmak isteyen biri; İngilizcesi A1-A2, kelime bilgisi zayıf. ":"Yusuf Ankara'da bir uluslararası şirketin (bir uluslararası şirket) IT yöneticisi; İngilizcesi A1-A2, kelime bilgisi zayıf. ")+"Ona gerçekçi bir destek talebi (ticket) yaz. Seviye "+level+"/5 ("+LV[level-1][1]+": "+LV[level-1][2]+").\n"+
   "Yalnız JSON nesnesi ver: {\"subject\":\"kısa konu (EN)\",\"from\":{\"name\":\"...\",\"role\":\"...\",\"country\":\"...\"},\"body\":\"talep metni (EN, seviyeye uygun basit)\",\"goal\":\"Türkçe: cevap neyi başarmalı\",\"keywords\":[{\"w\":\"kelime\",\"tr\":\"anlam\"} 4-6 adet],\"skeleton\":\"I'm sorry for ___. We will ___ by ___.\",\"model\":\"örnek iyi cevap (EN)\",\"category\":\"printer|vpn|account|network|email|onboarding\"}. Seviye 1 gövde en çok 12 kelime, seviye 5 en çok 90 kelime."+(hint?" Konu ipucu: "+hint:"");
}
function genTicket(){
  var ds=deskState(),G=S.dk.gen;
  var open=allTickets().filter(function(t){return t.level===ds.level&&!replyOf(rid(t))});
  if(!open.length)open=allTickets().filter(function(t){return t.level<=ds.level&&!replyOf(rid(t))});
  if(!open.length){G.err="Bu seviyedeki tüm hazır ticketları yanıtladın. Önceki ticketları yeniden gönderip puanını yükseltebilirsin.";draw();return}
  G.err=null;S.dk.id=open[0].id;draw();window.scrollTo(0,0);
}
function hintCount(id){var h=S.dk.hint[id]||{};return (h.words?1:0)+(h.skel?1:0)}
function openHint(t,kind){
  var H=S.dk.hint[t.id]=S.dk.hint[t.id]||{};
  if(H[kind])return;
  if(kind==="words"&&!t.keywords.length&&window.PPLocal)t.keywords=PPLocal.ticketKeywords(t).map(function(w){return {w:w,tr:""}});
  if(kind==="skel"&&!t.skeleton&&window.PPLocal)t.skeleton=PPLocal.ticketSkeleton(t);
  H[kind]=true;draw();
}
function checkReply(t,text){
  if(!window.PPLocal)return;
  if(text.trim().length<8){S.dk.err[t.id]="Önce en az bir cümle yaz.";draw();return}
  var f=PPLocal.ticketFeedback(t,text);
  S.dk.fb[t.id]={score:f.score,good:f.good,fix:f.fix,better:f.better,words:f.missing.map(function(w){var k=t.keywords.filter(function(x){return PPLocal.norm(x.w)===PPLocal.norm(w)})[0];return {w:w,tr:k?k.tr:""}})};
  S.dk.err[t.id]=null;draw();
}
function submitReply(t,text){
  if(!S.db||!S.canWrite)return;
  if(text.trim().length<8){S.dk.err[t.id]="Önce en az bir cümle yaz.";draw();return}
  var fb=S.dk.fb[t.id]||null,old=replyOf(t.id),id=t.id.replace(/[^A-Za-z0-9_-]/g,"_");
  var doc={ticket:t.id,level:t.level,date:today(),answer:text.slice(0,1500),hints:Math.max(hintCount(t.id),old?num(old.hints):0),track:"eng",ts:new Date().toISOString()};
  if(fb){doc.score=fb.score;doc.fb={good:fb.good,fix:fb.fix,better:fb.better}}
  else if(old&&typeof old.score==="number"&&old.answer===doc.answer){doc.score=old.score;if(old.fb)doc.fb=old.fb}
  S.db.doc("ticket_replies/"+id).set(doc).catch(function(){});
  doc.id=id;S.treplies=S.treplies.filter(function(r){return r.id!==id}).concat([doc]);
  setProg({ticket_n:S.treplies.filter(function(r){return r.date===today()}).length});
  S.dk.msg="Ticket kaydedildi. Puanın ve örnek cevap aşağıda.";
  burst();draw();
}
function ticketStatus(t){var r=replyOf(t.id.replace(/[^A-Za-z0-9_-]/g,"_"));if(!r)return "open";return reviewOf(t.id.replace(/[^A-Za-z0-9_-]/g,"_"))?"done":"sent"}
function rid(t){return t.id.replace(/[^A-Za-z0-9_-]/g,"_")}
function levelLadder(ds){
  return h("div",{class:"ladder"},LV.map(function(x,i){
    var n=i+1,st=n<ds.level?"done":n===ds.level?"cur":"lock";
    return h("div",{class:"lstep "+st},h("b",null,"L"+x[0]),h("span",null,x[1]),h("small",null,x[2]),
      n===ds.level&&n<5?h("div",{class:"lbar","aria-label":"yükselme ilerlemesi"},h("i",{style:"width:"+Math.min(100,Math.round(ds.good/ds.need*100))+"%"})):null)}));
}
function renderTicket(t){
  var id=rid(t),r=replyOf(id),rv=reviewOf(id),D=S.dk,H=D.hint[t.id]||{},fb=D.fb[t.id],busy=D.busy[t.id];
  var cur=D.draft[t.id]!=null?D.draft[t.id]:(r?r.answer:"");
  var ta=h("textarea",{id:"tk-ans",maxlength:1500,placeholder:"Write your reply in English...",oninput:function(e){D.draft[t.id]=e.target.value}});ta.value=cur;
  var mine=S.words.slice(-6).reverse();
  var out=[h("button",{class:"btn ghost",type:"button",onclick:function(){D.id=null;draw()}},"← Masaya dön"),
   h("div",{class:"panel tk"},h("div",{class:"tk-top"},h("span",{class:"pill eng"},"L"+t.level+" · "+LV[t.level-1][1]),t.category?h("span",{class:"pill"},t.category):null,t.generated?h("span",{class:"pill"},"canlı"):null),
    h("h2",null,t.subject),
    t.from.name?h("div",{class:"tk-from"},t.from.name+(t.from.role?" · "+t.from.role:"")+(t.from.country?" · "+t.from.country:"")):null,
    h("p",{class:"tk-body"},t.body),
    t.goal?h("div",{class:"tk-goal"},h("b",null,"Cevap şunu yapmalı: "),t.goal):null)];
  out.push(h("div",{class:"panel"},h("h2",null,"Yardım merdiveni"),
    h("div",{class:"small mute"},"Önce kendin dene. İpucu aldıkça seviye atlama puanı etkilenir (en fazla 1 ipucu sayılır)."),
    h("div",{class:"row"},
      h("button",{class:"btn ghost",type:"button",disabled:!!H.words||busy,onclick:function(){openHint(t,"words")}},H.words?"1 · Kelimeler açık":"1 · Kelime ipucu"),
      h("button",{class:"btn ghost",type:"button",disabled:!!H.skel||busy,onclick:function(){openHint(t,"skel")}},H.skel?"2 · İskelet açık":"2 · Cümle iskeleti")),
    H.words?h("div",{class:"words"},t.keywords.map(function(k){return h("button",{class:"pill eng kw",type:"button",title:k.tr,onclick:function(){speak(k.w)}},k.w+" = "+k.tr)})):null,
    H.skel?h("div",{class:"skel"},t.skeleton):null,
    D.err[t.id]?h("div",{class:"fb bad"},D.err[t.id]):null));
  out.push(h("div",{class:"panel"},h("h2",null,"Cevabın"),ta,
    mine.length?h("div",{class:"small mute"},"Defterindeki kelimeleri kullan:"):null,
    mine.length?h("div",{class:"words"},mine.map(function(w){return h("button",{class:"pill kw",type:"button",onclick:function(){ta.value=(ta.value?ta.value.replace(/\s*$/," "):"")+w.w;D.draft[t.id]=ta.value;ta.focus()}},w.w)})):null,
    h("div",{class:"row"},
      h("button",{class:"btn ghost",type:"button",onclick:function(){D.draft[t.id]=ta.value;checkReply(t,ta.value)}},"3 · Ön kontrol"),
      h("button",{class:"btn",type:"button",disabled:!S.canWrite,onclick:function(){D.draft[t.id]=ta.value;submitReply(t,ta.value)}},r?"Yeniden gönder":"Gönder")),
    h("div",{class:"small mute"},"Ön kontrol kod ile çalışır: anahtar kelime, eylem, ton ve yazım kontrolü yapar. Anlamı yargılamaz; örnek cevapla kendi cevabını karşılaştır."),
    D.msg&&r?h("div",{class:"fb good"},D.msg):null,
    fb?h("div",{class:"fb"},h("b",null,"Ön kontrol: "+fb.score+"/100"),fb.good?h("p",{style:"margin:0"},"Güzel: "+fb.good):null,fb.fix?h("p",{style:"margin:0"},"Düzelt: "+fb.fix):null,
      fb.better?h("p",{style:"margin:0"},h("i",null,fb.better)):null,
      fb.words.length?h("div",{class:"words"},fb.words.map(function(w){return h("button",{class:"pill eng kw",type:"button",onclick:function(){saveWord({w:w.w,tr:w.tr,sentence:fb.better||""})}},"+ "+w.w+" = "+w.tr)})):null):null));
  if(r){
    out.push(h("div",{class:"panel"},h("h2",null,"Değerlendirme"),
      rv?h("div",{class:"fb good"},h("b",null,"Koç puanı: "+num(rv.score)+"/100"),rv.good?h("p",{style:"margin:0"},"Güzel: "+str(rv.good)):null,rv.fix?h("p",{style:"margin:0"},"Düzelt: "+str(rv.fix)):null,rv.better?h("p",{style:"margin:0"},h("i",null,str(rv.better))):null,rv.levelNote?h("p",{class:"small mute",style:"margin:0"},str(rv.levelNote)):null)
        :h("div",{class:"small mute"},(typeof r.score==="number"?"Puanın: "+r.score+"/100 (kod ile hesaplandı).":"Önce ön kontrolü çalıştırıp gönder; puan oluşur.")),
      t.model?h("details",{class:"more",open:!rv},h("summary",null,"Örnek iyi cevap"),h("p",{style:"margin:8px 0 0"},t.model)):null));
  }
  return out;
}
function renderDeskEn(){
  var ds=deskState(),D=S.dk,out=[];
  if(D.id){var t=allTickets().filter(function(x){return x.id===D.id})[0];if(t)return renderTicket(t);D.id=null}
  out.push(h("div",{class:"panel desk-hero"},h("div",{class:"label"},"Destek Masası"),h("h2",null,"İngilizce talepleri yanıtla"),
    h("div",{class:"small mute"},"Gerçek ofis talepleri gibi. Basitten zora 5 seviye. Önce kendin yaz, takılırsan merdivenden yardım al; puanı kod hesaplar, örnek cevapla karşılaştırırsın."),
    levelLadder(ds),
    h("div",{class:"dstats"},
      h("div",null,h("b",null,ds.csat==null?"–":ds.csat),h("small",null,"memnuniyet")),
      h("div",null,h("b",null,ds.streak),h("small",null,"gün üst üste")),
      h("div",null,h("b",null,ds.n),h("small",null,"yanıtlanan")),
      h("div",null,h("b",null,ds.level<5?ds.good+"/"+ds.need:"MAX"),h("small",null,"seviye atlama")))));
  var list=ticketsOpen();
  if(!list.length)out.push(h("div",{class:"empty"},"Henüz ticket yok."));
  else out.push(h("div",{class:"panel"},h("h2",null,"Kuyruk"),h("div",{class:"tlist"},list.slice(0,30).map(function(t){
    var s=ticketStatus(t),lock=t.level>ds.level+1;
    return h("button",{class:"trow "+s,type:"button",disabled:lock,onclick:function(){D.id=t.id;D.msg="";draw();window.scrollTo(0,0)}},
      h("span",{class:"pill eng"},"L"+t.level),h("span",{class:"tt"},h("b",null,t.subject),h("small",null,t.date||"hazır ticket")),
      h("span",{class:"pill "+(s==="done"?"ok":"")},s==="open"?(lock?"kilitli":"açık"):s==="sent"?"gönderildi":(tScore(rid(t))!=null?tScore(rid(t))+"/100":"değerlendi")))}))));
  out.push(h("div",{class:"panel"},h("h2",null,"Sıradaki ticket"),
    h("div",{class:"small mute"},"Seviyene ("+LV[ds.level-1][1]+") uygun, henüz yanıtlamadığın ilk talebi açar."),
    h("button",{class:"btn",type:"button",onclick:genTicket},"Yeni ticket"),
    D.gen.err?h("div",{class:"fb bad"},D.gen.err):null));
  return out;
}
/* müdür */
function latestAudit(){return S.audit.slice().sort(function(a,b){return String(b.date||b.week).localeCompare(String(a.date||a.week))})[0]||null}
function voteOf(a,p){return S.avotes.filter(function(v){return v.id===a.week+"-"+p.id})[0]||null}
function pendingProposals(){var a=latestAudit();if(!a)return 0;return a.proposals.filter(function(p){return p.risk==="high"&&!p.applied&&!voteOf(a,p)}).length}
function vote(a,p,d){
  if(!S.db||!S.canWrite)return;
  var id=(a.week+"-"+p.id).replace(/[^A-Za-z0-9_-]/g,"_"),doc={week:a.week,proposal:p.id,decision:d,text:p.text.slice(0,300),ts:new Date().toISOString()};
  S.db.doc("audit_votes/"+id).set(doc).catch(function(){});
  doc.id=a.week+"-"+p.id;S.avotes=S.avotes.filter(function(v){return v.id!==doc.id}).concat([doc]);draw();
}
function renderManager(){
  var a=latestAudit();
  if(!a)return h("div",{class:"panel mgr"},h("div",{class:"label"},"Akademi Müdürü"),h("h2",null,"İlk rapor pazar akşamı"),
    h("div",{class:"small mute"},"Müdür haftada bir iki koçu denetler: dersler, ticketlar, puanlar, kaynaklar. Önerilerini burada onayına sunar; senin verin ve kararın her zaman önde."));
  var vm={iyi:"Yolunda",dikkat:"Dikkat",sorun:"Sorun var"};
  return h("div",{class:"panel mgr "+a.verdict},h("div",{class:"label"},"Akademi Müdürü · "+a.week),
    h("h2",null,a.headline||vm[a.verdict]),h("span",{class:"pill mv "+a.verdict},vm[a.verdict]),
    a.checks.length?h("ul",{class:"chk"},a.checks.map(function(c){return h("li",{class:c.status},h("i",null),h("span",null,h("b",null,c.name),c.evidence?h("small",null,c.evidence):null))})):null,
    a.findings.length?h("div",null,h("div",{class:"label"},"Bulgular"),h("ul",{class:"fnd"},a.findings.map(function(f){return h("li",null,f)}))):null,
    a.proposals.length?h("div",null,h("div",{class:"label"},"Öneriler"),a.proposals.map(function(p){
      var v=voteOf(a,p);
      return h("div",{class:"prop"},h("div",null,h("b",null,p.text),p.why?h("small",null,p.why):null),
        p.risk==="low"?h("span",{class:"pill ok"},p.applied?"uygulandı":"küçük, otomatik"):
        v?h("span",{class:"pill "+(v.decision==="approve"?"ok":"")},v.decision==="approve"?"onayladın":"reddettin"):
        h("div",{class:"row"},h("button",{class:"btn",type:"button",disabled:!S.canWrite,onclick:function(){vote(a,p,"approve")}},"Onayla"),h("button",{class:"btn ghost",type:"button",disabled:!S.canWrite,onclick:function(){vote(a,p,"reject")}},"Reddet")))})):null,
    a.note?h("div",{class:"small mute"},a.note):null,
    h("div",{class:"small mute"},"Müdür de bir yapay zekâ; bulguları tahmindir. Sayılabilir kontrollere dayanır, son söz sende."));
}

"use strict";
function pathProj(pid){var r=null;PATHS.forEach(function(p){p.projects.forEach(function(j){if(j.id===pid)r=j})});return r}
function pathOf(pid){var r=null;PATHS.forEach(function(p){p.projects.forEach(function(j){if(j.id===pid)r=p})});return r}
S.projects=[];S.pj={sel:null,form:null,busy:false,err:null,nstep:"",nnote:"",open:{},snote:{},confirmDel:null};
function cleanProject(x){
  if(!x||typeof x!=="object"||!str(x.title))return null;
  var steps=(Array.isArray(x.steps)?x.steps:[]).map(function(s){return s&&typeof s==="object"&&str(s.t)?{t:str(s.t).slice(0,160),done:!!s.done,ts:str(s.ts),note:str(s.note).slice(0,300)}:null}).filter(Boolean).slice(0,40);
  var notes=(Array.isArray(x.notes)?x.notes:[]).map(function(s){return s&&str(s.text)?{text:str(s.text).slice(0,600),ts:str(s.ts),by:str(s.by)||"ben"}:null}).filter(Boolean).slice(-30);
  var cl=(Array.isArray(x.claude)?x.claude:[]).map(function(s){return s&&str(s.text)?{text:str(s.text).slice(0,1200),ts:str(s.ts)}:null}).filter(Boolean).slice(-10);
  var lv=Math.max(1,Math.min(3,Math.round(num(x.lv))||1));
  return {id:x.id,title:str(x.title).slice(0,100),why:str(x.why).slice(0,400),kind:str(x.kind)||"serbest",pid:str(x.pid),lv:lv,status:x.status==="bitti"?"bitti":"yapılıyor",steps:steps,notes:notes,claude:cl,created:str(x.created),finished:str(x.finished)};
}
function pjDone(p){return p.steps.filter(function(s){return s.done}).length}
function pjXp(p){return (pjDone(p)*10+(p.status==="bitti"?60:0))*p.lv}
function projXp(){var t=0;S.projects.forEach(function(p){t+=pjXp(p)});return t}
function pjSave(p){
  if(!S.db||!S.canWrite)return;
  var d={title:p.title,why:p.why,kind:p.kind,pid:p.pid||"",lv:p.lv,status:p.status,steps:p.steps,notes:p.notes,claude:p.claude,created:p.created,finished:p.finished||"",ts:new Date().toISOString()};
  S.db.doc("projects/"+p.id).set(d).catch(function(){});
  S.projects=S.projects.filter(function(x){return x.id!==p.id}).concat([p]);
}
function pjNew(t){
  var id="p"+Date.now().toString(36),p=cleanProject({id:id,title:t.title,why:t.why||"",kind:t.kind||"serbest",steps:(t.steps||[]).map(function(s){return {t:s,done:false}}),created:today()});
  if(!p)return;pjSave(p);S.pj.sel=id;S.pj.form=null;S.pj.err=null;draw();
}
function pjStart(pid){
  var def=pathProj(pid);if(!def)return;var id="path-"+pid,ex=S.projects.filter(function(x){return x.id===id})[0];
  if(!ex){if(!S.canWrite)return;var pa=pathOf(pid);ex=cleanProject({id:id,title:def.title,why:def.why,kind:"path",pid:pid,lv:def.lv,steps:def.steps.map(function(s){return {t:s.t,done:false}}),created:today()});pjSave(ex)}
  S.pj.sel=id;S.pj.err=null;draw();window.scrollTo(0,0);
}
function pjToggle(p,i){
  var s=p.steps[i];if(!s)return;
  var _d=pathProj(p.pid),_g=_d&&_d.steps[i]&&_d.steps[i].g;if(_g&&!s.done&&!gateEval(_g).ok){draw();return}s.done=!s.done;s.ts=s.done?new Date().toISOString():"";
  var all=p.steps.length&&pjDone(p)===p.steps.length;
  if(all&&p.status!=="bitti"){p.status="bitti";p.finished=today();burst();try{PP.ogr.depo.kanitEkle({id:"proje-kaydi-"+(p.pid||p.id),tur:"proje-kaydi",hedef:"proje:"+(p.pid||p.id),dogrulama:"beyan"})}catch(e){}}else if(!all&&p.status==="bitti"){p.status="yapılıyor";p.finished=""}
  if(s.done){var n=0;S.projects.forEach(function(q){q.steps.forEach(function(x){if(x.done&&String(x.ts).slice(0,10)===today())n++})});setProg({proj_n:n})}
  pjSave(p);draw();
}
function pjAskClaude(p){
  var P=S.pj;if(!S.sample||P.busy)return;P.busy=true;P.err=null;draw();
  var prompt="Sen "+UN()+"'un sıcak ama net mentorusun. "+UN()+" CCNA ve İngilizce öğrenen bir BT yöneticisi, tam başlangıç seviyesinde ve junior yazılım/test/güvenlik işleri arıyor. Aşağıdaki proje durumuna bak ve Türkçe, 4-6 cümleyle yaz: (1) şu ana kadar iyi giden, (2) bir sonraki tek somut adım, (3) varsa takıldığı yer için basit bir benzetme. Düz metin yaz, madde işareti ve başlık kullanma.\n\nPROJE: "+p.title+"\nNEDEN: "+p.why+"\nADIMLAR:\n"+p.steps.map(function(s){return (s.done?"[x] ":"[ ] ")+s.t+(s.note?" (notu: "+s.note+")":"")}).join("\n")+"\nNOTLAR:\n"+p.notes.slice(-6).map(function(n){return "- "+n.text}).join("\n");
  S.sample(prompt,{cache:false}).then(function(r){
    var t=str(r&&r.text).trim();if(!t)throw {code:"empty"};
    p.claude=p.claude.concat([{text:t.slice(0,1200),ts:new Date().toISOString()}]).slice(-10);pjSave(p);
  }).catch(function(e){P.err=sampleErr(e)}).then(function(){P.busy=false;draw()});
}
function pjDraft(){
  var P=S.pj,F=P.form;if(!S.sample||P.busy||!F||!str(F.title))return;P.busy=true;P.err=null;draw();
  S.sample.json(""+UN()+" (BT yöneticisi, CCNA ve İngilizce'de tam başlangıç) şu projeyi yapmak istiyor: \""+F.title+"\". Türü: "+F.kind+". Amacı: "+(F.why||"belirtilmedi")+".\nBunu 5-7 küçük, tek oturumda yapılabilir, somut adıma böl. SADECE JSON nesnesi döndür: {\"steps\":[\"adım\",...]} Adımlar Türkçe ve kısa (en fazla 90 karakter) olsun.",{cache:false}).then(function(o){
    var a=o&&Array.isArray(o.steps)?o.steps.map(str).filter(Boolean).slice(0,8):[];if(!a.length)throw {code:"invalid_json"};
    F.steps=a;
  }).catch(function(e){P.err=sampleErr(e)}).then(function(){P.busy=false;draw()});
}
var TRI={sec:"M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z M9 12l2 2 4-4",qa:"M9 3h6v4l4 9a3 3 0 0 1-3 4H8a3 3 0 0 1-3-4l4-9z M8 14h8",bk:"M4 5h16v5H4z M4 14h16v5H4z M7 7.5h.01 M7 16.5h.01",ba:"M4 5h16v11H4z M9 20h6 M12 16v4",gold:"M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.5 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z",sup:"M4 13a8 8 0 0 1 16 0 M4 13v3a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 1 M20 13v3a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 1"};
function pathStats(def){var p=S.projects.filter(function(x){return x.id==="path-"+def.id})[0];return {p:p,n:p?pjDone(p):0,tot:def.steps.length,done:!!p&&p.status==="bitti"}}
function renderTrack(P){
  var done=P.projects.filter(function(j){return pathStats(j).done}).length;
  return h("div",{class:"panel trk "+P.col},
    h("div",{class:"trk-h"},h("span",{class:"trk-ic"},mi(TRI[P.col])),h("div",{class:"trk-t"},h("b",null,P.name),h("small",null,P.short)),h("span",{class:"pill"},done+"/"+P.projects.length+" tamam")),
    h("p",{class:"trk-b"},P.blurb),
    h("div",{class:"trk-road"},P.projects.reduce(function(acc,j,ix){var st=pathStats(j),pct=st.tot?Math.round(st.n/st.tot*100):0,state=st.done?"d":(st.p?"a":"");
      var prev=ix?P.projects[ix-1]:null;if(P.projects.length>6&&(!prev||prev.lv!==j.lv))acc.push(h("div",{class:"small mute",style:"margin:10px 2px 2px;font-weight:600"},LVN[j.lv]+" kademesi"));
      acc.push(h("button",{class:"trk-stop "+state,type:"button",onclick:function(){pjStart(j.id)}},
        h("span",{class:"trk-n"},st.done?"✓":String(j.lv)),
        h("span",{class:"trk-m"},h("small",null,(j.cap?"Kapston · ":"")+LVN[j.lv]+" · ~"+j.weeks+" hafta · "+j.steps.length+" adım"),h("b",null,j.title),
          h("span",{class:"xb"},h("i",{style:"width:"+Math.max(st.p?3:0,pct)+"%"}))),
        h("span",{class:"trk-go"},st.done?"Tamam":st.p?"Devam":"Başla")));return acc},[]))
  );
}
function renderProject(){
  var P=S.pj,out=[],ps=S.projects.slice().sort(function(a,b){return (a.status==="bitti")-(b.status==="bitti")||String(b.created).localeCompare(String(a.created))});
  var sel=P.sel&&S.projects.filter(function(p){return p.id===P.sel})[0];
  if(sel)return renderPjDetail(sel);
  if(!S.canWrite)out.push(h("div",{class:"panel"},h("div",{class:"small mute"},"Bu hesapta yazma izni yok; projeler sadece görüntülenir.")));
  var done=ps.filter(function(p){return p.status==="bitti"}).length;
  out.push(h("div",{class:"panel pjhero"},h("div",{class:"label"},"Proje atölyesi"),h("h2",null,"Yaparak öğren"),
    h("div",{class:"small mute"},"Kervan yolda düzülür: her projede konuyu adım adım yapıp öğrenirsin. Zor seviye daha çok XP verir (başlangıç ×1, orta ×2, zor ×3)."),
    h("div",{class:"xr"},h("div",{class:"xbig"},h("b",null,String(ps.length)),h("small",null,"proje")),
      h("div",{class:"xmeta"},h("div",null,done+" bitti"),h("div",null,projXp()+" proje XP'si")))));
  out.push(h("div",{class:"label pjsec"},"Yetkinlik yolları"));
  PATHS.forEach(function(p){out.push(renderTrack(p))});
  var mine=ps.filter(function(p){return !p.pid});
  out.push(h("div",{class:"label pjsec"},"Kendi projelerim"));
  if(!P.form)out.push(h("div",{class:"panel"},h("div",{class:"small mute"},"Kendi fikrin için proje aç, adımlara böl, ben de bakıp yorum yazayım."),
    h("button",{class:"btn",type:"button",disabled:!S.canWrite,onclick:function(){P.form={title:"",why:"",kind:"serbest",steps:[]};P.err=null;draw()}},"Yeni proje")));
  if(P.form)out.push(renderPjForm());
  mine.forEach(function(p){var n=pjDone(p),tot=p.steps.length,pct=tot?Math.round(n/tot*100):0,k=(PJK.filter(function(x){return x[0]===p.kind})[0]||[0,"Serbest"])[1];
    out.push(h("div",{class:"panel pjc",onclick:function(){P.sel=p.id;P.err=null;draw()}},
      h("div",{class:"chiprow"},h("span",{class:"pill"},k),h("span",{class:"pill"+(p.status==="bitti"?" ok":"")},p.status==="bitti"?"bitti":"yapılıyor")),
      h("h3",null,p.title),h("div",{class:"xb"},h("i",{style:"width:"+Math.max(2,pct)+"%"})),
      h("div",{class:"small mute"},n+"/"+tot+" adım · "+pjXp(p)+" XP"+(p.claude.length?" · mentor notu var":""))))});
  return out;
}
function renderPjForm(){
  var P=S.pj,F=P.form;
  var ti=h("input",{type:"text",maxlength:100,placeholder:"Proje adı, örn. Ofis ağı için VLAN planı",oninput:function(e){F.title=e.target.value}});ti.value=F.title;
  var wy=h("textarea",{maxlength:300,placeholder:"Neden? (isteğe bağlı)",oninput:function(e){F.why=e.target.value}});wy.value=F.why;
  return h("div",{class:"panel"},h("div",{class:"label"},"Yeni proje"),ti,wy,
    h("div",{class:"chiprow"},PJK.map(function(k){return h("button",{class:"fchip"+(F.kind===k[0]?" on":""),type:"button",onclick:function(){F.kind=k[0];draw()}},k[1])})),
    F.steps.length?h("ol",{class:"pjsteps"},F.steps.map(function(s,i){return h("li",null,s,h("button",{class:"x",type:"button","aria-label":"Sil",onclick:function(){F.steps.splice(i,1);draw()}},"×"))})):h("div",{class:"small mute"},"Adımları ben taslak çıkarabilirim ya da sonra kendin eklersin."),
    P.err?h("div",{class:"small warnt"},P.err):null,
    h("div",{class:"row"},
      S.sample?h("button",{class:"btn ghost",type:"button",disabled:P.busy||!str(F.title),onclick:pjDraft},P.busy?"Düşünüyorum…":"Adımları taslakla"):null,
      h("button",{class:"btn",type:"button",disabled:!str(F.title),onclick:function(){pjNew(F)}},"Oluştur"),
      h("button",{class:"btn ghost",type:"button",onclick:function(){P.form=null;draw()}},"Vazgeç")));
}
function stepKey(p,i){return p.id+":"+i}
function renderRoadStep(p,def,i){
  var s=p.steps[i],P=S.pj,k=stepKey(p,i),det=def&&def.steps[i]&&def.steps[i].t===s.t?def.steps[i]:null,open=!!P.open[k];
  var G=det&&det.g?gateEval(det.g):null,locked=!!G&&!G.ok&&!s.done;
  var cur=!s.done&&p.steps.slice(0,i).every(function(x){return x.done});
  var head=h("div",{class:"rs-h"},
    h("label",{class:"rs-ck"},h("input",{type:"checkbox",checked:s.done,disabled:!S.canWrite||locked,"aria-label":"Adım tamam",onchange:function(){pjToggle(p,i)}}),h("span",{class:"rs-dot"},s.done?"✓":locked?"🔒":String(i+1))),
    h("button",{class:"rs-t",type:"button","aria-expanded":open?"true":"false",onclick:function(){P.open[k]=!open;draw()}},h("b",null,s.t),cur&&!open?h("small",null,"Sıradaki adım"):null,h("span",{class:"rs-chev"},open?"–":"+")));
  var body=null;
  if(open){
    var items=[];
    if(locked)items.push(gateBox(G));
    if(det&&!locked){
      items.push(h("div",{class:"rs-b"},h("small",null,"Öğren"),h("p",null,det.learn)));
      items.push(h("div",{class:"rs-b do"},h("small",null,"Yap"),h("p",null,det.doit)));
      items.push(h("div",{class:"rs-b"},h("small",null,"Kanıt"),h("p",null,det.proof)));
      var cc=cptChips(det);if(cc)items.push(cc);
      if(det.en)items.push(h("div",{class:"rs-b en"},h("small",null,"İngilizce terimler"),h("p",null,det.en)));
      if(det.q)items.push(h("div",{class:"rs-links"},h("a",{href:"https://www.youtube.com/results?search_query="+encodeURIComponent(det.q),target:"_blank",rel:"noopener noreferrer"},"Video ara"),h("a",{href:"https://www.google.com/search?q="+encodeURIComponent(det.q),target:"_blank",rel:"noopener noreferrer"},"Web'de ara")));
    }
    var ni=h("input",{type:"text",maxlength:300,placeholder:"Kanıt veya not (örn. GitHub bağlantısı)",onchange:function(e){s.note=e.target.value.slice(0,300);pjSave(p);P.snote[k]=s.note}});ni.value=s.note||"";
    if(!locked)items.push(h("div",{class:"rs-b"},h("small",null,"Notum"),ni));
    body=h("div",{class:"rs-body"},items);
  }
  return h("div",{class:"rs"+(s.done?" done":"")+(cur?" cur":"")},head,body);
}
function renderPjDetail(p){
  var P=S.pj,n=pjDone(p),tot=p.steps.length,pct=tot?Math.round(n/tot*100):0,out=[],def=p.pid?pathProj(p.pid):null,pa=p.pid?pathOf(p.pid):null,col=pa?pa.col:"";
  var si=h("input",{type:"text",maxlength:160,placeholder:"Yeni adım ekle",oninput:function(e){P.nstep=e.target.value}});si.value=P.nstep;
  var addStep=function(){var t=str(P.nstep).trim();if(!t||!S.canWrite)return;p.steps.push({t:t.slice(0,160),done:false,ts:"",note:""});if(p.status==="bitti"){p.status="yapılıyor";p.finished=""}P.nstep="";pjSave(p);draw()};
  si.addEventListener("keydown",function(e){if(e.key==="Enter")addStep()});
  var ni=h("textarea",{maxlength:600,placeholder:"Bugün ne yaptın, nerede takıldın?",oninput:function(e){P.nnote=e.target.value}});ni.value=P.nnote;
  var head=[h("button",{class:"btn ghost",type:"button",onclick:function(){P.sel=null;P.err=null;draw()}},"← Projelerim"),
    h("div",{class:"chiprow"},pa?h("span",{class:"pill trkp "+col},pa.name):h("span",{class:"pill"},(PJK.filter(function(x){return x[0]===p.kind})[0]||[0,"Serbest"])[1]),def?h("span",{class:"pill"},LVN[def.lv]+" · ~"+def.weeks+" hafta"):null,h("span",{class:"pill"+(p.status==="bitti"?" ok":"")},p.status==="bitti"?"bitti":"yapılıyor")),
    h("h2",null,p.title),p.why?h("div",{class:"small mute"},p.why):null,
    typeof gbBtn==="function"?h("div",{class:"row"},gbBtn({tur:"proje",id:p.pid||p.id,baslik:p.pid?p.title:"",sekme:"proje"})):null,
    h("div",{class:"xb big"},h("i",{style:"width:"+Math.max(2,pct)+"%"})),h("div",{class:"small mute"},n+"/"+tot+" adım · "+pjXp(p)+" XP · her adım "+10*p.lv+" XP, bitirince +"+60*p.lv)];
  if(def){
    head.push(h("div",{class:"pj-out"},h("small",null,"Bu projeyi bitirince"),h("ul",null,def.outcome.map(function(x){return h("li",null,x)}))));
    head.push(h("div",{class:"small mute"},"Araçlar: "+def.tools));
    head.push(h("div",{class:"pj-pitch"},h("small",null,"Mülakatta tek cümle (İngilizce)"),h("i",null,"\""+def.pitch+"\""),S.canWrite?h("button",{class:"btn ghost",type:"button",onclick:function(){speak(def.pitch)}},"Dinle"):null));
  }
  out.push(h("div",{class:"panel pjhead "+col},head));
  var gbF=typeof gbFormYer==="function"?gbFormYer("proje",p.pid||p.id):null;if(gbF)out.push(gbF);
  if(def)out.push(h("div",{class:"label pjsec"},"Yol haritası"));
  out.push(h("div",{class:"road "+col},p.steps.map(function(s,i){return renderRoadStep(p,def,i)}),
    h("div",{class:"row road-add"},si,h("button",{class:"btn ghost",type:"button",disabled:!S.canWrite,onclick:addStep},"Adım ekle"))));
  var tnB=def&&typeof renderTanimBlok==="function"?renderTanimBlok(def):null;if(tnB)out.push(h("div",{class:"panel"},tnB));
  if(def&&def.maps)out.push(certPanel(p,def));
  if(def)out.push(exportPanel(p,def));
  var rpP=typeof renderRaporPaneli==="function"?renderRaporPaneli(p,def):null;if(rpP)out.push(rpP);
  out.push(h("div",{class:"panel"},h("h3",null,"Günlük"),ni,
    h("button",{class:"btn ghost",type:"button",disabled:!S.canWrite,onclick:function(){var t=str(P.nnote).trim();if(!t)return;p.notes.push({text:t.slice(0,600),ts:new Date().toISOString(),by:"ben"});P.nnote="";pjSave(p);draw()}},"Nota ekle"),
    p.notes.slice().reverse().map(function(x){return h("div",{class:"pjn"},h("small",{class:"mute"},String(x.ts).slice(0,10)),h("div",null,x.text))})));
  out.push(h("div",{class:"panel"},h("h3",null,"Mentor"),
    p.claude.length?p.claude.slice().reverse().map(function(x){return h("div",{class:"pjn cl"},h("small",{class:"mute"},String(x.ts).slice(0,10)),h("div",null,x.text))}):h("div",{class:"small mute"},"Henüz yorum yok. Takıldığında iste; ben de akşam proje listene bakıp not bırakabilirim."),
    P.err?h("div",{class:"small warnt"},P.err):null,
    S.sample?h("button",{class:"btn",type:"button",disabled:P.busy||!S.canWrite,onclick:function(){pjAskClaude(p)}},P.busy?"Düşünüyorum…":"Mentora göster"):null,
    h("button",{class:"btn ghost",type:"button",disabled:!S.canWrite,onclick:function(){if(P.confirmDel===p.id){S.db.doc("projects/"+p.id).delete().catch(function(){});S.projects=S.projects.filter(function(x){return x.id!==p.id});P.sel=null;P.confirmDel=null}else P.confirmDel=p.id;draw()}},P.confirmDel===p.id?"Emin misin? Tekrar dokun":"Projeyi sil")));
  return out;
}

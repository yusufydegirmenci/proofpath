"use strict";
/* ---- v33: kavram-proje bağlantısı, CV oluşturucu ---- */
var _cptCache=null;
function cptAll(){
  if(_cptCache)return _cptCache;var o=[];
  [["ba",ATLAS_BA],["sw",ATLAS_SW],["en",ATLAS_EN],["sec",ATLAS_SEC],["bk",ATLAS_BK],["ccna",ATLAS_CCNA],["net",ATLAS_NET],["dev",ATLAS_DEV],["qa",ATLAS_QA]].forEach(function(a){a[1].forEach(function(it){
    var t=String(it.t||"").toLowerCase(),keys=[],m=/^(.*?)\s*\((.*)\)\s*$/.exec(t);
    if(m){if(m[1].length>=4)keys.push(m[1]);if(m[2].length>=4)keys.push(m[2])}else if(t.length>=4)keys.push(t);
    if(keys.length)o.push({tr:a[0],it:it,keys:keys});
  })});
  _cptCache=o;return o;
}
function cptHit(text,c){return c.keys.some(function(k){return text.indexOf(k)>=0})}
function pjConcepts(det){
  if(!det)return [];if(det._cp)return det._cp;
  var text=(det.t+" "+det.learn+" "+det.doit+" "+(det.en||"")).toLowerCase(),r=[];
  cptAll().forEach(function(c){if(cptHit(text,c))r.push(c)});
  r.sort(function(a,b){return b.keys[0].length-a.keys[0].length});
  det._cp=r.slice(0,4);return det._cp;
}
function pjUses(tr,it){
  var c=cptAll().filter(function(x){return x.it===it})[0],r=[];if(!c)return r;
  PATHS.forEach(function(P){P.projects.forEach(function(j){j.steps.forEach(function(s,i){
    if(r.length<3&&cptHit((s.t+" "+s.learn+" "+s.doit+" "+(s.en||"")).toLowerCase(),c)&&!r.some(function(x){return x.j===j}))r.push({j:j,i:i,s:s})})})});
  return r;
}
function cptOpen(c){S.at.tr=c.tr;S.at.open=atlasKey(c.tr,c.it);S.at.g="";S.at.q="";S.les.view="atlas";goTab("ders")}
function cptChips(det){
  var L=pjConcepts(det);if(!L.length)return null;
  return h("div",{class:"rs-b"},h("small",null,"Ders bağlantısı: bu adımda kullanılan kavramlar"),h("div",{class:"lscroll",style:"margin-top:6px"},L.map(function(c){return h("button",{type:"button",class:"opt",onclick:function(){cptOpen(c)}},c.it.t.split(" (")[0])})));
}
function cptUses(tr,it){
  var U=pjUses(tr,it);if(!U.length)return null;
  return h("div",{class:"lbox"},h("div",{class:"label"},"Projede kullan"),h("p",{class:"small",style:"margin:0 0 6px"},"Öğrendiğini hemen somutlaştır:"),
    U.map(function(u){return h("button",{class:"btn ghost",type:"button",style:"margin:0 6px 6px 0",onclick:function(){goTab("proje");pjStart(u.j.id)}},u.j.title.split(":")[0]+" · adım "+(u.i+1))}));
}
/* CV */
S.cv={name:"",city:"",email:"",phone:"",github:"",linkedin:"",role:"qa",lang:"tr",summary:"",skills:"",edu:"",exp:"",langs:"",certs:"",ts:"",ev:true};S.cvMsg="";S.cvSh=false;
function cvLoad(d){if(!d||typeof d!=="object")return;["name","city","email","phone","github","linkedin","role","lang","summary","skills","edu","exp","langs","certs"].forEach(function(k){if(typeof d[k]==="string")S.cv[k]=d[k].slice(0,1200)});if(typeof d.ev==="boolean")S.cv.ev=d.ev}
function cvSave(){if(S.db&&S.canWrite&&!S.guest){S.cv.ts=new Date().toISOString();S.db.doc("prefs/cv").set(S.cv).catch(function(){})}}
function cvProjects(){
  var gh=/github\.com\/[\w.-]+\/[\w.-]+/i,r=[];
  S.projects.forEach(function(p){if(p.kind!=="path")return;var def=pathProj(p.pid);if(!def)return;
    var d=pjDone(p);if(!(p.status==="bitti"||(p.steps.length&&d/p.steps.length>=.5)))return;
    var link="";p.notes.forEach(function(x){var m=gh.exec(x.text);if(m)link="https://"+m[0]});p.steps.forEach(function(s){var m=gh.exec(s.note||"");if(m)link="https://"+m[0]});
    r.push({tr:def.title,en:def.pitch,out:def.outcome||[],tools:def.tools||"",done:p.status==="bitti",link:link});
  });
  return r;
}
function cvDoc(){
  var C=S.cv,en=C.lang==="en",R=JR.filter(function(r){return r.id===C.role})[0]||JR[0],P=cvProjects();
  var T=en?{sum:"Summary",sk:"Skills",ex:"Experience",pj:"Projects",ed:"Education",lg:"Languages",ce:"Certifications"}:{sum:"Özet",sk:"Beceriler",ex:"Deneyim",pj:"Projeler",ed:"Eğitim",lg:"Diller",ce:"Sertifikalar"};
  var sum=C.summary.trim()||(en?R.en1:R.tr1);
  var sec=[];
  sec.push([T.sum,[sum]]);
  if(C.skills.trim())sec.push([T.sk,[C.skills.trim()]]);
  if(C.exp.trim())sec.push([T.ex,C.exp.trim().split(/\n+/)]);
  if(P.length)sec.push([T.pj,P.map(function(p){return (en?p.en:p.tr)+(p.done?"":(en?" (in progress)":" (devam ediyor)"))+(p.link?" — "+p.link:"")})]);
  if(C.ev!==false){var EVL=evLines(en);if(EVL.length)sec.push([en?"Learning evidence (Proofpath)":"Öğrenme kanıtları (Proofpath)",EVL])}
  if(C.edu.trim())sec.push([T.ed,C.edu.trim().split(/\n+/)]);
  if(C.certs.trim())sec.push([T.ce,C.certs.trim().split(/\n+/)]);
  if(C.langs.trim())sec.push([T.lg,[C.langs.trim()]]);
  var contact=[C.city,C.email,C.phone,C.github,C.linkedin].filter(function(x){return x&&x.trim()}).join(" | ");
  var txt=(C.name.trim()||(en?"Your Name":"Adın Soyadın"))+"\n"+(R.name)+"\n"+contact+"\n\n"+sec.map(function(s){return s[0].toUpperCase()+"\n"+s[1].map(function(l){return (s[1].length>1?"- ":"")+l}).join("\n")}).join("\n\n")+"\n";
  function E(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}
  var html='<!doctype html><html lang="'+(en?"en":"tr")+'"><head><meta charset="utf-8"><title>'+E(C.name||"CV")+'</title><style>body{font:13px/1.5 Arial,sans-serif;max-width:720px;margin:24px auto;padding:0 20px;color:#111}h1{margin:0;font-size:24px}h2{font-size:13px;letter-spacing:.08em;border-bottom:1px solid #bbb;padding-bottom:3px;margin:18px 0 6px}p{margin:0 0 4px}.s{color:#444}ul{margin:0;padding-left:18px}</style></head><body><h1>'+E(C.name.trim()||(en?"Your Name":"Adın Soyadın"))+'</h1><div class="s">'+E(R.name)+'</div><div class="s">'+E(contact)+'</div>'+sec.map(function(s){return "<h2>"+E(s[0].toUpperCase())+"</h2>"+(s[1].length>1?"<ul>"+s[1].map(function(l){return "<li>"+E(l)+"</li>"}).join("")+"</ul>":"<p>"+E(s[1][0])+"</p>")}).join("")+"</body></html>";
  return {txt:txt,html:html,projects:P.length};
}
function cvDownload(kind){
  var d=cvDoc(),nm=pjSlug(S.cv.name||"cv");
  if(!S.dl){S.cvMsg="Bu görünümde indirme yok. Metni kopyalayıp bir belgeye yapıştır.";draw();return}
  var blob=new Blob([kind==="html"?d.html:d.txt],{type:kind==="html"?"text/html":"text/plain"});
  S.dl.save({filename:nm+"-cv."+(kind==="html"?"html":"txt"),data:blob}).then(function(){S.cvMsg=kind==="html"?"Kaydedildi. Dosyayı tarayıcıda aç, Yazdır > PDF olarak kaydet.":"Kaydedildi.";draw()},function(e){S.cvMsg=(e&&e.code==="declined")?"Vazgeçtin.":"Kaydedilemedi.";draw()});
}
function cvPortfolio(){
  var C=S.cv,en=C.lang==="en",R=JR.filter(function(r){return r.id===C.role})[0]||JR[0],P=cvProjects();
  function E(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}
  function url(u){u=String(u||"").trim();if(!u)return "";if(!/^https?:\/\//i.test(u))u="https://"+u;return /^https:\/\/[^\s"'<>]+$/i.test(u)?u:""}
  var T=en?{pj:"Projects",sk:"Skills",ct:"Contact",pr:"in progress",ln:"Code on GitHub",sub:"Built with Proofpath"}:{pj:"Projeler",sk:"Beceriler",ct:"İletişim",pr:"devam ediyor",ln:"GitHub'da kod",sub:"Proofpath ile hazırlandı"};
  var nm=C.name.trim()||(en?"Your Name":"Adın Soyadın"),sum=C.summary.trim()||(en?R.en1:R.tr1);
  var sk=C.skills.trim()?C.skills.split(/[,\n;]+/).map(function(x){return x.trim()}).filter(Boolean):R.sk;
  var links=[];if(url(C.github))links.push('<a href="'+E(url(C.github))+'">GitHub</a>');if(url(C.linkedin))links.push('<a href="'+E(url(C.linkedin))+'">LinkedIn</a>');
  if(C.email.trim())links.push(E(C.email.trim()));if(C.city.trim())links.push(E(C.city.trim()));
  var css=':root{--bg:#f4f1ea;--pn:#fbf9f4;--ink:#2b2a26;--mu:#6b685f;--ac:#2d7d74;--ln:#ddd8cb}@media(prefers-color-scheme:dark){:root{--bg:#1a1d21;--pn:#23272c;--ink:#dcd9d1;--mu:#9b978d;--ac:#6cc0b2;--ln:#343a40}}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.6 system-ui,-apple-system,Segoe UI,sans-serif}main{max-width:760px;margin:0 auto;padding:32px 16px 48px}h1{font-size:32px;margin:0 0 4px;line-height:1.15}h2{font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:var(--mu);margin:32px 0 12px}.role{color:var(--ac);font-weight:600;margin:0 0 12px}.sum{font-size:17px;margin:0 0 12px}.ct{color:var(--mu);font-size:14px}.ct a{color:var(--ac)}.ct span+span:before,.ct a+a:before,.ct a+span:before{content:" · "}.chips{display:flex;flex-wrap:wrap;gap:8px;padding:0;margin:0;list-style:none}.chips li{background:var(--pn);border:1px solid var(--ln);border-radius:999px;padding:4px 12px;font-size:14px}.card{background:var(--pn);border:1px solid var(--ln);border-radius:12px;padding:16px;margin:0 0 12px}.card h3{margin:0 0 4px;font-size:17px}.card p{margin:0 0 8px}.card ul{margin:0 0 8px;padding-left:20px}.card a{color:var(--ac);font-weight:600}.tools{color:var(--mu);font-size:13px}.badge{font-size:12px;color:var(--mu);border:1px solid var(--ln);border-radius:999px;padding:1px 8px;margin-left:6px}footer{margin-top:40px;color:var(--mu);font-size:12px}';
  var body='<main><h1>'+E(nm)+'</h1><p class="role">'+E(R.name)+'</p><p class="sum">'+E(sum)+'</p><div class="ct">'+links.join(" ")+'</div>'
   +'<h2>'+T.sk+'</h2><ul class="chips">'+sk.slice(0,24).map(function(x){return "<li>"+E(x)+"</li>"}).join("")+'</ul>'
   +(P.length?'<h2>'+T.pj+'</h2>'+P.map(function(p){return '<div class="card"><h3>'+E(en?p.en:p.tr)+(p.done?"":'<span class="badge">'+T.pr+'</span>')+'</h3>'+(p.out&&p.out.length?'<ul>'+p.out.slice(0,4).map(function(o){return "<li>"+E(o)+"</li>"}).join("")+'</ul>':"")+(p.tools?'<div class="tools">'+E(p.tools)+'</div>':"")+(url(p.link)?'<p><a href="'+E(url(p.link))+'">'+T.ln+'</a></p>':"")+'</div>'}).join(""):"")
   +'<footer>'+T.sub+'</footer></main>';
  return '<!doctype html><html lang="'+(en?"en":"tr")+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+E(nm)+'</title><style>'+css+'</style></head><body>'+body+'</body></html>';
}
function cvPortDownload(){
  if(!S.dl){S.cvMsg="Bu görünümde indirme yok.";draw();return}
  var blob=new Blob([cvPortfolio()],{type:"text/html"});
  S.dl.save({filename:"index.html",data:blob}).then(function(){S.cvMsg="Kaydedildi. Bu dosyayı GitHub'da kullanıcıadın.github.io adlı herkese açık bir repoya index.html olarak yükle; Settings > Pages'ten yayınla.";draw()},function(e){S.cvMsg=(e&&e.code==="declined")?"Vazgeçtin.":"Kaydedilemedi.";draw()});
}
function cvField(k,label,ph,multi){
  var el=multi?h("textarea",{rows:3,maxlength:1200,placeholder:ph||"",onchange:function(e){S.cv[k]=e.target.value;cvSave()}}):h("input",{type:"text",maxlength:200,placeholder:ph||"",onchange:function(e){S.cv[k]=e.target.value;cvSave()}});
  el.value=S.cv[k]||"";
  return h("div",{class:"field"},h("label",{class:"label"},label),el);
}
function atCv(){
  var C=S.cv,R=JR.filter(function(r){return r.id===C.role})[0]||JR[0];
  var roleSeg=h("div",{class:"seg",role:"group","aria-label":"Hedef rol"},JR.map(function(o){return h("button",{type:"button","aria-pressed":C.role===o.id?"true":"false",onclick:function(){C.role=o.id;cvSave();draw()}},o.name)}));
  var langSeg=h("div",{class:"seg",role:"group","aria-label":"CV dili"},[["tr","Türkçe"],["en","English"]].map(function(o){return h("button",{type:"button","aria-pressed":C.lang===o[0]?"true":"false",onclick:function(){C.lang=o[0];cvSave();draw()}},o[1])}));
  var sugg=h("div",{class:"lscroll",style:"margin-top:6px"},(R.sk||[]).map(function(s){return h("button",{type:"button",class:"opt",onclick:function(){var a=C.skills.split(",").map(function(x){return x.trim()}).filter(Boolean);if(a.indexOf(s)<0)a.push(s);C.skills=a.join(", ");cvSave();draw()}},"+ "+s)}));
  var d=cvDoc();
  return [
    h("div",{class:"panel"},h("div",{class:"label"},"CV oluşturucu"),h("h2",null,"Birkaç bilgi ver, CV'in hazır"),
      h("div",{class:"small mute"},"Boş bıraktığın yerleri atlarım. Projelerin ve GitHub bağlantıların CV'ye kendiliğinden eklenir. Bilgiler sadece senin panonda saklanır."),
      h("div",{class:"gm-opt"},h("b",null,"Hedef rol"),roleSeg),h("div",{class:"gm-opt"},h("b",null,"CV dili"),langSeg),h("div",{class:"gm-opt"},h("b",null,"Öğrenme kanıtlarını ekle"),h("div",{class:"seg",role:"group","aria-label":"Kanıtlar"},[[true,"Evet"],[false,"Hayır"]].map(function(o){return h("button",{type:"button","aria-pressed":(C.ev!==false)===o[0]?"true":"false",onclick:function(){C.ev=o[0];cvSave();draw()}},o[1])})))),
    h("div",{class:"panel"},h("h3",null,"Kim olduğun"),cvField("name","Ad soyad"),cvField("city","Şehir","Şehrin"),cvField("email","E-posta"),cvField("phone","Telefon"),cvField("github","GitHub bağlantın","github.com/kullanici"),cvField("linkedin","LinkedIn bağlantın")),
    h("div",{class:"panel"},h("h3",null,"Kısa özet"),cvField("summary","Kendini 1-2 cümleyle anlat (boşsa hazır cümleyi kullanırım)","",true),h("div",{class:"small mute"},"Hazır cümle: "+(C.lang==="en"?R.en1:R.tr1)),
      h("h3",{style:"margin-top:12px"},"Beceriler"),cvField("skills","Virgülle ayır","",true),sugg,
      h("div",{class:"small mute"},"Sadece gerçekten bildiklerini yaz; mülakatta sorulur.")),
    h("div",{class:"panel"},h("h3",null,"Deneyim, eğitim, diller"),cvField("exp","Deneyim (her satır bir iş: 'Şirket, görev, yıl, ne yaptın')","",true),cvField("edu","Eğitim (her satır bir okul)","",true),cvField("certs","Sertifikalar veya hazırlandıkların","",true),cvField("langs","Diller","Türkçe (anadil), İngilizce (A2)")),
    h("div",{class:"panel"},h("div",{class:"label"},"Önizleme"),h("pre",{class:"lcode",style:"white-space:pre-wrap"},d.txt),
      h("div",{class:"small mute"},d.projects?d.projects+" proje CV'ye eklendi.":"Henüz bitirdiğin ya da yarısını geçtiğin proje yok; yol projelerini yaptıkça burası kendiliğinden dolar."),
      h("div",{class:"row"},h("button",{class:"btn",type:"button",onclick:function(){jrCopy(d.txt)}},"Metni kopyala"),h("button",{class:"btn ghost",type:"button",onclick:function(){cvDownload("html")}},"PDF için HTML kaydet"),h("button",{class:"btn ghost",type:"button",onclick:function(){cvDownload("txt")}},"Düz metin kaydet"),h("button",{class:"btn ghost",type:"button",onclick:cvPortDownload},"Portfolyo sayfası (index.html)")),
      S.cvMsg?h("div",{class:"small mute"},S.cvMsg):null,S.jr.msg?h("div",{class:"small mute"},S.jr.msg):null)
  ];
}

"use strict";
/* ---- kişiye özel plan (kod ile, yapay zekâsız) ---- */
function ppWeakIdx(){
  var a=[];Object.keys(GS.st).forEach(function(k){var q=QB[+k],s=GS.st[k];if(!q||!s||!s[1])return;var acc=s[0]/s[1];if(acc<.7||GS.bx[k]===0)a.push({i:+k,acc:acc,n:s[1]})});
  a.sort(function(x,y){return x.acc-y.acc||y.n-x.n});return a;
}
function weakIdxFill(r){
  var idx=ppWeakIdx().slice(0,5).map(function(x){return x.i});
  if(idx.length<5){prSmartMix(r).forEach(function(i){if(idx.length<5&&idx.indexOf(i)<0)idx.push(i)})}
  return shuf(idx,r);
}
function ppTeachLog(){
  var m={};S.progress.forEach(function(p){var tl=p&&p.teach_log;if(!tl||typeof tl!=="object")return;Object.keys(tl).forEach(function(k){var v=tl[k];if(v&&(!m[k]||num(v.ts)>num(m[k].ts)))m[k]=v})});
  return m;
}
function ppTracks(){return Object.keys(window.PP_LESSONS||{}).filter(function(t){return STARTER[t]})}
function ppTitle(tr,n){var T=starterTopics(tr)[n-1];return T?T.name:""}
function personalInput(){
  var tracks=ppTracks().map(function(tr){var T=starterTopics(tr),nx=T.filter(function(t){return t.status==="next"})[0],idx=nx?T.indexOf(nx)+1:0;
    return {track:tr,name:trName(tr),nextN:idx,nextTitle:nx?nx.name:"",done:T.filter(PP.ogr.ilerleme.konuTamam).length,total:T.length,last:lastStudy(tr)}});
  var cache={};
  function match(tr,text){
    var L=window.PP_LESSONS&&window.PP_LESSONS[tr];if(!L||!window.PPLocal)return null;
    var b=PPLocal.bestLesson(tr,L,text);if(!b)return null;
    var tp=starterTopics(tr)[b.n-1];if(!tp||tp.status==="open"||tp.status==="locked")return null;
    return {n:b.n,title:tp.name};
  }
  var weakQs=ppWeakIdx().slice(0,12).map(function(x){var q=QB[x.i];return {i:x.i,q:q.q,a:q.o[q.a],t:q.t,acc:x.acc,n:x.n}});
  var mis=S.mistakes.filter(function(m){return !m.done}).slice(0,20).map(function(m){
    var T=starterTopics(m.track),ix=-1;T.forEach(function(t,i){if(ix<0&&t.name===m.lesson&&t.status!=="open"&&t.status!=="locked")ix=i});
    if(ix<0&&m.q){var mm=match(m.track,m.q+" "+(m.answer||""));if(mm)ix=mm.n-1}
    return {track:m.track,q:m.q,lesson:ix>=0?T[ix].name:(m.lesson||""),lessonN:ix>=0?ix+1:0}});
  var tl=ppTeachLog(),teach=Object.keys(tl).map(function(id){var m=/^base-s-([a-z]+)-(\d+)$/.exec(id);if(!m)return null;var v=tl[id];return {id:id,track:m[1],n:+m[2],title:ppTitle(m[1],+m[2]),score:num(v.score),miss:Array.isArray(v.miss)?v.miss:[]}}).filter(Boolean);
  var sc=S.treplies.map(function(r){return {d:String(r.ts||""),s:tScore(r.id)}}).filter(function(x){return x.s!=null}).sort(function(a,b){return b.d.localeCompare(a.d)}).slice(0,8);
  var avg=sc.length?Math.round(sc.reduce(function(a,x){return a+x.s},0)/sc.length):null;
  var engT=tracks.filter(function(t){return t.track==="eng"})[0];
  return {tracks:tracks,weakQs:weakQs,mistakes:mis,due:mistakesDue().length,teach:teach,desk:{answered:sc.length,avg:avg},engStarted:!!(engT&&engT.done>0),match:match,trackName:trName};
}
function ppGo(a){
  if(a.type==="review"){var el=document.getElementById("pp-rq");if(el)el.scrollIntoView({behavior:"smooth",block:"start"});return}
  if(a.type==="lesson"){
    var T=starterTopics(a.track),t=T[a.n-1];
    S.les.track=a.track;S.les.ask={busy:false,ans:null,err:null};
    S.les.id=(!a.next&&t&&t.status!=="open"&&t.status!=="locked")?"base-"+t.id:null;
    goTab("ders");return;
  }
  if(a.type==="drill"){S.at2.sec="alistirma";S.pr.track=a.track;S.pr.qs=[];S.pr.res=null;goTab("atolye");return}
  if(a.type==="tab")goTab(a.tab);
}
function renderPersonal(){
  if(!window.PPPersonal||!window.PPLocal)return null;
  var R;try{R=PPPersonal.analyze(personalInput())}catch(e){return null}
  if(!R.items.length)return null;
  var KIND={review:"Tekrar",relesson:"Konu tekrarı",drill:"Alıştırma",reteach:"Anlatım",desk:"Masa",next:"Yeni ders"};
  var rows=R.items.map(function(it){
    return h("div",{class:"pp-it",style:"display:grid;gap:4px;border-top:1px solid var(--line);padding:10px 0"},
      h("div",{style:"display:flex;gap:8px;align-items:center;flex-wrap:wrap"},h("span",{class:"pill"+(it.kind==="next"?" ok":"")},KIND[it.kind]||"Plan"),h("b",null,it.title),h("span",{class:"small mute"},"≈ "+it.minutes+" dk")),
      h("div",{class:"small mute"},it.detail),
      h("div",{class:"row"},h("button",{class:"btn"+(it===R.items[0]?"":" ghost"),type:"button",onclick:function(){ppGo(it.act)}},it.act.type==="review"?"Tekrar kuyruğuna git":it.act.type==="drill"?"Turu aç":it.act.type==="tab"?"Aç":it.act.next?"Derse başla":"Dersi aç")))});
  var weak=R.weak.slice(0,4).map(function(w){return h("div",{class:"small",style:"display:flex;justify-content:space-between;gap:10px;border-top:1px solid var(--line);padding:6px 0"},
    h("span",null,w.q),h("span",{class:"mono mute",style:"white-space:nowrap"},"%"+w.acc+" · "+w.n+" deneme"))});
  return h("div",{class:"panel pp-me"},h("div",{class:"label"},"Sana özel"),h("h2",null,"Bugün için planın · ≈ "+R.minutes+" dk"),
    h("div",{class:"small mute"},"Kendi yanlışlarına, soru geçmişine, anlatım denemelerine ve ticket puanlarına göre kodla hazırlanır. Her kullanıcıda farklıdır; yanlışların azaldıkça plan değişir."),
    rows,
    weak.length?h("details",{class:"more"},h("summary",null,"En çok takıldığın sorular ("+R.weakCount+")"),h("div",{class:"morebox"},weak)):null);
}
/* v35 ustalık düzeyleri ve haftalık plan */
function mastLevels(){
  var tr=trkMap(function(){return [0,0,0,0,0]});
  Object.keys(GS.st).forEach(function(k){
    var q=QB[+k],s=GS.st[k];if(!q||!tr[q.t]||!s||!s[1])return;
    var lv=PP.ogr.ustalik.soruDuzeyi(s,GS.bx[k]);
    tr[q.t][lv]++;tr[q.t][4]++;
  });
  return tr;
}
function mastPanel(){
  var M=mastLevels(),any=false,names=["Denendi","Aşina","Yeterli","Usta"];
  var rows=TRK_LIST.map(function(o){
    var m=M[o[0]];if(!m||!m[4])return null;any=true;
    return h("div",{style:"margin-top:10px"},h("div",{style:"display:flex;justify-content:space-between"},h("b",null,o[1]),h("span",{class:"small mono"},m[4]+" soru")),
      h("div",{class:"gm-grid"},names.map(function(n,i){return h("div",{class:"kcell"},h("small",{class:"mute"},n),h("b",{class:"mono"},String(m[i])))})));
  }).filter(Boolean);
  if(!any)return null;
  return h("div",{class:"panel"},h("div",{class:"label"},"Ustalık"),h("h2",null,"Soruları ne kadar biliyorsun"),
    h("div",{class:"small mute"},"Denendi: doğruluk %70 altı. Aşina: %70 ve üstü. Yeterli: en az 2 denemede hepsi doğru. Usta: en az 3 deneme, %85 üstü doğruluk ve aralıklı tekrarda ilerlemiş. Hesabındaki cevaplardan hesaplanır; yanlış yapınca düzey düşer."),rows);
}
S.plan={hrs:5,role:"",msg:""};
function planSteps(R){
  var P=PATHS.filter(function(p){return p.id===R.path})[0];if(!P)return [];
  var out=[];
  P.projects.forEach(function(j){
    var pr=S.projects.filter(function(x){return x.id==="path-"+j.id})[0];
    j.steps.forEach(function(s,i){var dn=pr&&pr.steps&&pr.steps[i]&&pr.steps[i].done;if(!dn)out.push({j:j,i:i,t:s.t})});
  });
  return out;
}
function planPanel(R){
  var Q=S.plan,steps=planSteps(R),per=Math.max(1,Math.round(Q.hrs*60/45));
  var wks=Math.ceil(steps.length/per),end=addDays(today(),wks*7);
  var days=["Pazartesi","Çarşamba","Cumartesi"],out=[h("div",{class:"panel"},h("div",{class:"label"},"Haftalık plan"),h("h2",null,R.name+" yolu: "+steps.length+" adım kaldı"),
    h("div",{class:"seg",role:"group","aria-label":"Haftalık süre"},[3,5,8].map(function(n){return h("button",{type:"button","aria-pressed":Q.hrs===n?"true":"false",onclick:function(){Q.hrs=n;draw()}},n+" saat/hafta")})),
    h("div",{class:"small mute",style:"margin-top:8px"},steps.length?("Bir adım ortalama 45 dakika varsayıldı; haftada ~"+per+" adım. Bu hızla tahmini bitiş: "+end+" ("+wks+" hafta). Tahmindir; takıldığın adımda yavaşlamak normal."):"Bu yoldaki adımların hepsini bitirmişsin. Sıradaki yola ya da İşe hazırlık'taki 3 hamleye geç."))];
  if(steps.length){
    var wk=[];for(var w=0;w<2;w++){var ch=steps.slice(w*per,(w+1)*per);if(!ch.length)break;wk.push(h("div",{class:"lbox"},h("div",{class:"label"},(w+1)+". hafta"),h("ol",{style:"margin:0;padding-left:20px"},ch.map(function(x,ix){return h("li",{class:"small"},days[Math.min(2,Math.floor(ix*3/ch.length))]+": "+x.j.title.split(":")[0]+" · "+String(x.t).slice(0,70))}))))}
    out.push(h("div",{class:"panel"},h("h3",null,"İlk iki hafta"),wk,h("div",{class:"row"},h("button",{class:"btn",type:"button",onclick:function(){goTab("proje")}},"Projelere git"))));
  }
  return out;
}
/* haftalık özet */
function wkSum(mon){
  var L=loggedDates(),o={mon:mon,days:0,min:0,go:0,gt:0,po:0,pn:0,m5:0,runs:0};
  for(var i=0;i<7;i++){var d=addDays(mon,i),p=gmDay(d);if(L[d]){o.days++;o.min+=L[d]}o.go+=num(p.g_ok);o.gt+=num(p.g_tot);o.po+=num(p.prac_ok);o.pn+=num(p.prac_n);o.m5+=num(p.mini5);o.runs+=num(p.g_runs)}
  return o;
}
function wkPanel(prev){
  var mon=prev?addDays(weekStart(today()),-7):weekStart(today()),w=wkSum(mon);
  var ga=w.gt?Math.round(w.go/w.gt*100)+"%":"—",pa=w.pn?Math.round(w.po/w.pn*100)+"%":"—";
  var msg=w.days>=5?"Çok iyi bir hafta. Bu ritmi koru.":w.days>=3?"İyi gidiyor. Bir gün daha eklersen hafta tam olur.":"Hafta hafif geçti. Günde 5 dakika bile seriyi taşır; küçük başla.";
  return h("div",{class:"panel"},h("div",{class:"label"},prev?"Geçen haftanın özeti":"Bu haftanın özeti"),
    h("div",{class:"gm-grid"},[["Aktif gün",w.days+" / 7"],["Dakika",w.min],["Oyun doğruluğu",ga],["Alıştırma",pa],["5 dakika",w.m5]].map(function(a){return h("div",{class:"kcell"},h("small",{class:"mute"},a[0]),h("b",{class:"mono"},String(a[1])))})),
    h("div",{class:"small mute"},msg));
}
function hardQs(){
  var a=Object.keys(GS.st).filter(function(k){var s=GS.st[k];return QB[+k]&&s[1]>=3&&s[0]/s[1]<.5}).sort(function(x,y){return GS.st[x][0]/GS.st[x][1]-GS.st[y][0]/GS.st[y][1]}).slice(0,5);
  if(!a.length)return null;
  return h("div",{class:"panel"},h("h2",null,"Zorlandığın sorular"),h("div",{class:"small mute"},"Hesabında en az 3 kez karşılaştığın ve yarısından azını bildiğin sorular."),
    a.map(function(k){var it=QB[+k],s=GS.st[k];return h("div",{class:"lbox"},h("p",{style:"margin:0 0 4px;font-weight:600"},it.q),h("p",{style:"margin:0"},"Doğru: "+it.o[it.a]+" · "+s[0]+"/"+s[1]+" doğru"),it.w?h("p",{class:"small mute",style:"margin:4px 0 0"},it.w):null)}));
}
/* işe hazırlık */
var JR=[
{id:"qa",name:"QA / Test",path:"qa",sk:["Manuel test","Test senaryosu","Hata raporu","Jira","Postman","SQL","Selenium","Playwright"],tr:["eng","ccna"],kw:["test","qa","kalite","quality","selenium","automation","otomasyon","istqb"],
 tr1:"Test senaryosu, hata raporu ve test planı hazırlayan; ISTQB CTFL müfredatıyla çalışan, BT destek geçmişinden gelen bir test adayıyım.",
 en1:"I am an aspiring QA engineer with an IT support background. I write test cases, bug reports and test plans, and I am studying for ISTQB CTFL."},
{id:"sup",name:"BT destek",path:"sup",sk:["Sorun giderme","Bilet sistemi","Windows","Active Directory","Ağ temelleri","Bilgi bankası","İngilizce yazışma"],tr:["ccna","eng"],kw:["destek","help desk","helpdesk","support","servis","sistem","network","ağ"],
 tr1:"Ağ temelleri (CCNA seviyesi), kullanıcı desteği ve İngilizce iletişimle uluslararası bir ekipte BT destek veriyorum.",
 en1:"I provide IT support in an international team, with networking fundamentals at CCNA level and daily English communication."},
{id:"bk",name:"Backend / .NET",path:"bk",sk:["C#","ASP.NET Core","REST API","SQL","Git","AWS","Docker","xUnit"],tr:["bk","eng"],kw:[".net","c#","asp.net","backend","api","sql","dotnet","aws"],
 tr1:"C# ve ASP.NET Core ile REST API geliştiren, veritabanı ve bulut temellerini projelerle pekiştiren bir backend adayıyım.",
 en1:"I am an aspiring backend developer building REST APIs with C# and ASP.NET Core, backed by hands-on database and cloud projects."},
{id:"sec",name:"Siber güvenlik",path:"sec",sk:["Ağ güvenliği","Log analizi","SIEM","Parola ve kimlik yönetimi","Olay müdahalesi","Linux","Wireshark"],tr:["sec","ccna"],kw:["güvenlik","security","soc","siber","cyber","analyst","analist"],
 tr1:"Ağ ve güvenlik temelleriyle (Security+ müfredatı) küçük bir güvenlik operasyon laboratuvarı kuran, olay müdahale playbook'ları yazan bir adayım.",
 en1:"I am an aspiring security analyst with network and Security+ fundamentals, building a small home SOC lab and writing incident response playbooks."}
];
S.jr={role:"qa",msg:"",city:""};S.jobs=null;
function jrRole(){return JR.filter(function(r){return r.id===S.jr.role})[0]||JR[0]}
function jrScore(R){
  var T=R.tr,sk=0;T.forEach(function(t){sk+=((GS.sk[t]||1)-1)/2});sk/=T.length;
  var ok=0,n=0;Object.keys(GS.st).forEach(function(k){var q=QB[+k];if(q&&T.indexOf(q.t)>=0){ok+=GS.st[k][0];n+=GS.st[k][1]}});
  var acc=n?(ok/n)*Math.min(1,n/20):0;
  var pjs=S.projects.filter(function(p){var pa=pathOf(p.pid);return R.path?(pa&&pa.id===R.path):p.kind==="path"});
  /* Faz 8 tur 2: ek çekirdek projeler paydayı büyütmez (hazırlık puanı anlamı korunur); ilerleme yine toplanır, 1'de kırpılır */
  var tot=R.path?(PATHS.filter(function(p){return p.id===R.path})[0]||{projects:[1,1,1,1]}).projects.filter(function(j){return !j.cekirdek}).length:2,pr=0;
  pjs.forEach(function(p){pr+=p.steps.length?Math.min(1,pjDone(p)/p.steps.length):0});pr=Math.min(1,pr/tot);
  var iv=Math.min(1,S.interview.filter(function(r){return num(r.box)>=2}).length/8);
  var gh=/github\.com\/[\w.-]+\/[\w.-]+/i,pf=0;
  pjs.forEach(function(p){p.notes.forEach(function(x){if(gh.test(x.text))pf=1});p.steps.forEach(function(s){if(gh.test(s.note||""))pf=1})});
  var parts=[["sk","Bilgi seviyesi",sk,.35],["acc","Soru doğruluğu",acc,.2],["pr","Proje ilerlemesi",pr,.25],["iv","Mülakat pratiği",iv,.1],["pf","GitHub kanıtı",pf,.1]];
  var s=0;parts.forEach(function(p){s+=p[2]*p[3]});
  return {score:Math.round(s*100),parts:parts,n:n};
}
function jrActions(R,J){
  var A={sk:["Bu hafta 3 gün Akıllı tur oyna; seviyen sorulara göre yükselir.","Oyuna git",function(){goTab("oyun")}],
    acc:["Zorlandığın soruları Alıştırma'da çöz; nedenini oku.","Alıştırmaya git",function(){S.pr.track=R.tr[0];S.pr.qs=[];S.pr.res=null;S.at2.sec="alistirma";draw()}],
    pr:["Yol projende bu hafta 2 adım bitir ve kanıtını not et.","Projelere git",function(){goTab("proje")}],
    iv:["3 mülakat sorusunu sesli cevapla (60 saniye) ve kendine puan ver.","Mülakata git",function(){goTab("mul")}],
    pf:["Bir projeyi GitHub'a yükle ve linkini proje notuna yapıştır.","Projelere git",function(){goTab("proje")}]};
  return J.parts.slice().sort(function(a,b){return (1-b[2])*b[3]-(1-a[2])*a[3]}).slice(0,3).map(function(p){return A[p[0]]});
}
function jrCopy(t){
  var done=function(ok){S.jr.msg=ok?"Kopyalandı.":"Kopyalanamadı. Metni elle seçip kopyala.";draw()};
  try{navigator.clipboard.writeText(t).then(function(){done(true)},function(){done(false)})}catch(e){done(false)}
}
function atJobs(){
  var R=jrRole(),J=jrScore(R),band=J.score<35?"Temeli atıyorsun":J.score<65?"Gelişiyorsun":"Başvuruya yakınsın";
  var seg=h("div",{class:"seg",role:"group","aria-label":"Hedef rol"},JR.map(function(o){return h("button",{type:"button","aria-pressed":S.jr.role===o.id?"true":"false",onclick:function(){S.jr.role=o.id;S.jr.msg="";draw()}},o.name)}));
  var out=[h("div",{class:"panel"},h("div",{class:"label"},"İşe hazırlık"),h("h2",null,"Hedef rolün: "+R.name),seg,
    h("div",{class:"gm-grid"},[["Hazırlık puanı",J.score+" / 100"],["Durum",band]].map(function(a){return h("div",{class:"kcell"},h("small",{class:"mute"},a[0]),h("b",{class:"mono"},String(a[1])))})),
    J.parts.map(function(p){return h("div",{style:"margin-top:8px"},h("div",{style:"display:flex;justify-content:space-between"},h("span",{class:"small"},p[1]),h("span",{class:"small mono"},Math.round(p[2]*100)+"%")),h("div",{class:"xpbar"},h("i",{style:"width:"+Math.max(3,Math.round(p[2]*100))+"%"})))}),
    h("div",{class:"small mute",style:"margin-top:8px"},"Puan: bilgi seviyesi, soru doğruluğu, yol projesi ilerlemesi, mülakat pratiği ve GitHub kanıtı. Bu bir tahmin; iş garantisi değil."))];
  out.push(h("div",{class:"panel"},h("h2",null,"Bu haftanın 3 hamlesi"),jrActions(R,J).map(function(a){return h("div",{class:"lbox"},h("p",{style:"margin:0 0 6px"},a[0]),h("button",{class:"btn ghost",type:"button",onclick:a[2]},a[1]))})));
  planPanel(R).forEach(function(x){out.push(x)});out.push(evPanel(R));
  out.push(h("div",{class:"panel"},h("h2",null,"CV ve LinkedIn cümlesi"),h("div",{class:"lbox"},h("p",{style:"margin:0"},R.tr1),h("button",{class:"btn ghost",type:"button",onclick:function(){jrCopy(R.tr1)}},"Türkçe kopyala")),h("div",{class:"lbox"},h("p",{style:"margin:0"},R.en1),h("button",{class:"btn ghost",type:"button",onclick:function(){jrCopy(R.en1)}},"English kopyala")),S.jr.msg?h("div",{class:"small mute"},S.jr.msg):null,h("div",{class:"small mute"},"Cümleyi gerçekten yaptığın işlere göre düzenle; yapmadığını yazma.")));
  var jb=S.jobs,sc=jb&&jb.skillCounts&&typeof jb.skillCounts==="object"?jb.skillCounts:null,items=jb&&Array.isArray(jb.items)?jb.items:[];
  var cities=[];items.forEach(function(x){var c=String(x.city||"").trim();if(c&&cities.indexOf(c)<0)cities.push(c)});
  var rel=items.filter(function(x){var s=(String(x.title||"")+" "+String(x.skills||"")).toLowerCase();return R.kw.some(function(k){return s.indexOf(k)>=0})&&(!S.jr.city||String(x.city||"").trim()===S.jr.city)}).slice(0,8);
  if(!sc&&!items.length)out.push(h("div",{class:"panel"},h("h2",null,"İş ilanı haritası"),h("div",{class:"empty"},"İlan görevi henüz harita verisini yazmadı. Her gün 11:48'de çalışınca burada ilanların en çok istediği beceriler çıkacak.")));
  else{
    var ks=sc?Object.keys(sc).sort(function(a,b){return num(sc[b])-num(sc[a])}).slice(0,10):[],mx=ks.length?num(sc[ks[0]])||1:1;
    out.push(h("div",{class:"panel"},h("div",{class:"label"},"İş ilanı haritası"+(jb.date?" · "+jb.date:"")),h("h2",null,"İlanlar en çok bunu istiyor"),
      ks.map(function(k){return h("div",{style:"margin-top:6px"},h("div",{style:"display:flex;justify-content:space-between"},h("span",{class:"small"},k),h("span",{class:"small mono"},String(num(sc[k])))),h("div",{class:"xpbar"},h("i",{style:"width:"+Math.max(4,Math.round(num(sc[k])/mx*100))+"%"})))}),
      cities.length>1?h("div",{class:"lscroll",style:"margin-top:10px"},[""].concat(cities).map(function(c){return h("button",{type:"button",class:"opt","aria-pressed":S.jr.city===c?"true":"false",onclick:function(){S.jr.city=c;draw()}},c||"Türkiye geneli")})):null,
      rel.length?h("div",null,h("h3",null,"Rolüne uyan ilanlar"),rel.map(function(x){var u=safeUrl(x.url);return h("div",{class:"lbox"},h("p",{style:"margin:0;font-weight:600"},String(x.title||"").slice(0,90)),h("p",{class:"small mute",style:"margin:2px 0 0"},[x.company,x.city,x.level].filter(Boolean).join(" · ").slice(0,120)),u?h("a",{href:u,target:"_blank",rel:"noopener"},"İlanı aç"):null)})):null));
  }
  return out;
}

"use strict";
/* ALAN: Ders sekmesi, hazır ders akışı (ısınma kapısı, sıralı kilit, ders yolu, sertifika paneli, renderLessonBase). NE YAPAR: Dersin hangi adımlarının tamamlandığını (ısınma, okuma, mini sınav, alıştırma) ders başına bayraklarla izler ve sıradaki dersi açar.
   SORUN OLURSA: Bayraklar localStorage ya_lc içinde (lcSet/lcHas/lcDone); eski ya_lc js/ogrenme/eski.js ile OKUNUR, oraya yazılmaz; S.les ortak durumdur, S.nonOwner/S.sample yolları farklı davranır.
   YENİ ÖZELLİK: Yeni ders adımı lcSet bayrağı ve renderLessonBase'e eklenir; tests/hesaplar.js (ilerleme hesapları) ve tests/ogrenme.js güncellenir. */
/* ---- v47: hazır ders, sıralı kilit, ısınma kapısı ---- */
var LC_KEY="ya_lc",LC_FROM="2026-10-08";
function lcLoad(){try{var o=JSON.parse(localStorage.getItem(LC_KEY)||"null");return o&&typeof o==="object"?o:{}}catch(e){return {}}}
function lcHas(k,f){var o=lcLoad()[k];return !!(o&&o[f])}
function lcW(k){return lcHas(k,"w")||lcHas(k,"w-atla")}
function lcAtla(k,tr){lcSet(k,"w-atla",tr);rtToast("Isınma atlandı. Anlatım açıldı. Mini sınavda %80'in altında kalırsan 2 dakikalık ısınmayı önereceğim.")}
function lcSet(k,f,tr){if(!k||lcHas(k,f))return false;var o=lcLoad();o[k]=o[k]||{};o[k][f]=1;o[k].d=today();try{localStorage.setItem(LC_KEY,JSON.stringify(o))}catch(e){return false}syncPush();
  if(tr&&lcDone(k)){lcCut(tr,{ts:new Date().toISOString(),pn:num(prog().prac_n),d:today()});setTimeout(function(){rtToast("Ders tamam. Sıradaki konu açıldı.");sched()},50)}return true}
function lcUnset(k,f){var o=lcLoad();if(o[k]&&o[k][f]){delete o[k][f];try{localStorage.setItem(LC_KEY,JSON.stringify(o))}catch(e){}}}
function lcCut(tr,v){var o=lcLoad();if(v){o._cut=o._cut||{};o._cut[tr]=v;try{localStorage.setItem(LC_KEY,JSON.stringify(o))}catch(e){}}return (o._cut&&o._cut[tr])||null}
function lcDone(k){return PP.ogr.ilerleme.dersTamam(lcLoad()[k])}
function lessonKey(l){return l.topicId||l.id}
function lcGrand(l){return !l.virtual&&String(l.date||"")<LC_FROM}
function lessonListFor(tr){
  var real=lessonsOf(tr),list=real,bl=baseLesson(tr);
  if(bl&&!list.some(function(x){return x.topicId===bl.topicId})&&(S.nonOwner||!list.some(function(x){return x.date===today()})))list=[bl].concat(list);
  if(S.nonOwner&&window.PP_LESSONS&&window.PP_LESSONS[tr]){
    var have={};list.forEach(function(x){have[x.topicId]=1});
    starterTopics(tr).filter(function(t){return PP.ogr.ilerleme.konuTamam(t)&&!have[t.id]&&/^s-[a-z]+-\d+$/.test(t.id)}).reverse().forEach(function(t){var q=lessonForTopic(tr,t.id);if(q){q.review=true;list=list.concat([q])}});
  }
  return {list:list,real:real,bl:bl};
}
function keyTrack(k){
  var m=/^s-([a-z]+)-\d+$/.exec(k);if(m)return m[1];
  var x=S.lessons.filter(function(l){return l.topicId===k||l.id===k})[0];if(x)return x.track;
  var t=S.topics.filter(function(q){return q.id===k})[0];return t&&t.track?t.track:null;
}
function lastStudy(T){var o=lcLoad(),best="";Object.keys(o).forEach(function(k){if(k.charAt(0)==="_")return;if(o[k]&&o[k].d&&keyTrack(k)===T&&String(o[k].d)>best)best=String(o[k].d)});return best}
function activeLesson(){
  var o=lcLoad(),best=null;
  Object.keys(o).forEach(function(k){
    if(k.charAt(0)==="_")return;var v=o[k];if(!v||!(v.w||v["w-atla"])||lcDone(k))return;
    var tr=keyTrack(k);if(!tr)return;
    var l=lessonListFor(tr).list.filter(function(x){return lessonKey(x)===k&&!lcGrand(x)})[0];if(!l)return;
    if(!best||String(v.d||"")>String(best.d||""))best={l:l,track:tr,key:k,d:v.d};
  });
  return best;
}
function prNow(tr,cut){
  var P=prog(),a=(tr==="ccna"||tr==="eng")&&S.attempts.filter(function(x){return x.date===today()&&x.track===tr&&(!cut||String(x.ts||"")>cut.ts)}).length>=5;
  return a||(num(P.prac_n)-(cut&&cut.d===today()?cut.pn:0))>=5;
}
function lcSync(l){
  var tr=l.track,k=lessonKey(l),P=prog(),qs=Array.isArray(l.quiz)?l.quiz:[],mk=0,ok=0,was=lcDone(k),c=false,cut=lcCut(tr);
  qs.forEach(function(q,i){var m=S.les.mark[l.id+":"+i];if(m){mk++;if(m==="ok")ok++}});
  /* Faz 4: "q" yalnız mini sınav kapısı (%80) geçilince; eski "q" kayıtları geçerli kalır */
  if(PP.ogr.kapi.miniSinav(ok,qs.length,mk).gecti&&lcSet(k,"q",tr))c=true;
  var pr=prNow(tr,cut);
  if(pr&&lcSet(k,"p",tr))c=true;
  return c;
}
var BQ_IX={};
function bqAsk(t){
  t=String(t).trim();var b=t.replace(/[.?!]+$/,"");
  if(/\b(nedir|hangisi|hangisidir|hangileridir|kullanılır|ne yapar|ne demektir|ne demek|nasıl|neyi|ne ad|ne der|nerede|nereden|neden|ne ifade|ne işe|belirler|sağlar|tutulur|hesaplanır|nelerdir)\b/i.test(b))return b+"?";
  if(b.split(/\s+/).length<=5)return "\u201c"+b+"\u201d için doğru cevap hangisi?";
  return "Durum: "+b+". En olası cevap hangisi?";
}
function bqSame(a,b){var x=tmStems(a),y=tmStems(b),kx=Object.keys(x),ky=Object.keys(y),n=0;kx.forEach(function(k){if(y[k])n++});return Math.min(kx.length,ky.length)>0&&n/Math.min(kx.length,ky.length)>=.6}
function bqEntryStems(e){
  var t=[e.k,e.h,e.w,e.x,e.o,(e.p||[]).join(" "),(e.n||[]).join(" "),e.m.map(function(x){return x[0]+" "+x[1]}).join(" "),(e.f||[]).map(function(x){return x.join(" ")}).join(" "),
    (e.u||[]).map(function(x){return x.join(" ")}).join(" "),e.c?(e.c.a+" "+e.c.b+" "+(e.c.r||[]).map(function(x){return x.join(" ")}).join(" ")):""].join(" ");
  return tmStems(t);
}
function bqOwner(tr,x){
  var ix=BQ_IX[tr]||(BQ_IX[tr]=TMAP[tr].map(bqEntryStems)),q=tmStems(x.q+" "+x.o[x.a]+" "+(x.w||"")),ks=Object.keys(q),best=-1,bs=0,sec=0;
  if(ks.length<3)return {i:-1,s:0};
  ix.forEach(function(st,i){var n=0;ks.forEach(function(k){if(st[k])n++});if(n>bs){sec=bs;bs=n;best=i}else if(n>sec)sec=n});
  return {i:(bs>=4&&bs/ks.length>=.45&&bs>sec)?best:-1,s:bs};
}
function baseQuiz(tr,t){
  var tm=TMAP[tr]?tmFor({track:tr,topicId:t.id,title:t.name}):null,out=[];
  function add(q,o,c,why){out.push({q:q,options:o,answer:o[c],why:why||""})}
  if(tm){
    var e=tm.m,why0="Dersin '"+e.k+"' bölümünde geçiyor: "+e.w;
    (e.u||[]).slice(0,3).forEach(function(u,k){var o=tmOpts(t.id+":u"+k,u);add(bqAsk(u[0]),o.o,o.c,"Doğrusu: "+u[1]+". "+why0)});
    TMAP[tr].forEach(function(en,i){if(en!==e)return;var nq=0;QB.forEach(function(x){if(x.t!==tr||out.length>=5||nq>=2)return;var ow=bqOwner(tr,x);if(ow.i===i&&!out.some(function(y){return bqSame(y.q,x.q)})){nq++;add(x.q,x.o.slice(),x.a,x.w||"")}})});
    var M=e.m;
    if(out.length<5&&M.length>=3){
      [0,Math.floor(M.length/2)].forEach(function(k){
        if(out.length>=5)return;var m=M[k],oth=M.filter(function(y,j){return j!==k}).slice(0,2),opts=[m[1]].concat(oth.map(function(y){return y[1]})),r=ntHash(t.id+":m"+k)%3,o=[],c=(3-r)%3;
        for(var p=0;p<3;p++)o.push(opts[(p+r)%3]);
        add("Bu derste öğrendiğin \""+m[0]+"\" için hangisi doğrudur?",o,c,"Dersteki büyük haritada: "+m[0]+" = "+m[1]+".")})
    }
    if(out.length<5&&e.c&&e.c.r&&e.c.r.length){
      var r0=e.c.r[0],ra=ntHash(t.id+":c")%2,o2=ra?[r0[2],r0[1]]:[r0[1],r0[2]];
      add(e.c.a+" ile "+e.c.b+" karşılaştırmasında \""+r0[0]+"\" satırı "+e.c.a+" için hangisidir?",o2,ra?1:0,"Dersteki karşılaştırma tablosunda: "+e.c.a+" → "+r0[1]+"; "+e.c.b+" → "+r0[2]+".")
    }
    if(out.length)return out.slice(0,5);
  }
  var tok=(t.name+" "+(t.area||"")).toLowerCase().split(/[^a-zçğıöşü0-9]+/).filter(function(w){return w.length>3});
  var cand=QB.filter(function(x){return x.t===tr}).map(function(x){var tx=(x.q+" "+(x.w||"")).toLowerCase(),sc=0;tok.forEach(function(w){if(tx.indexOf(w)>=0)sc++});return {x:x,sc:sc}});
  cand.sort(function(a,b){return b.sc-a.sc||a.x.d-b.x.d});
  return cand.slice(0,4).map(function(c){var x=c.x;return {q:x.q,options:x.o.slice(),answer:x.o[x.a],why:x.w||""}});
}
function localWarm(l){
  var t=l.topicId?topicById(l.topicId):null,nm=(t&&t.name)||l.title||"Bu konu",an=(t&&t.analogy)||l.hook||"";
  var pv=null;if(t){var T=S.topics.length?topicsOf(l.track):starterTopics(l.track);for(var i=0;i<T.length;i++){if(T[i].id===t.id)break;pv=T[i]}}
  var o={recap:[],concepts:[],words:[]};
  if(pv)o.recap.push({point:"Önceki konu: "+pv.name,example:pv.analogy||""});
  if(l.track!=="eng"&&nm)o.concepts.push({term:nm,tr:(t&&t.area)||"",summary:an||"Bugünün ana kavramı.",example:""});
  var TMW=tmFor({track:l.track,topicId:l.topicId,title:l.title});
  if(TMW){
    if(l.track!=="eng")o.concepts=TMW.m.m.map(function(x){return {term:x[0],tr:x[1],summary:"",example:""}});
    var pe=null;if(TMW.prev&&TMAP[l.track])TMAP[l.track].forEach(function(e){if(!pe&&e.n.indexOf(TMW.prev)>=0)pe=e});
    if(pe){o.recap=[{point:"Önceki konu: "+pe.n[0],example:pe.w}]}
  }
  return (o.recap.length||o.concepts.length)?o:{recap:[{point:"Bugünkü konuya geçmeden önce geçen çalıştığın şeyi bir cümleyle kendine anlat.",example:""}],concepts:[],words:[]};
}
function baseLesson(tr){var tid=defaultTopic(tr);return tid?lessonForTopic(tr,tid):null}
function lessonForTopic(tr,tid){
  var t=tid?topicById(tid):null;if(!t)return null;
  var st=["Isınmayı bitir: bir önceki konuyu ve bugünkü kavramı gözden geçir.","Anlatımı oku, benzetmeyi kendi cümlenle yeniden anlat.","Mini sınavı cevabı açmadan önce yanıtla.",(tr==="ccna"||tr==="eng")?"Sınıfta 5 soru çöz.":"Alıştırmada 5 karışık soru çöz."];
  var l={id:"base-"+t.id,virtual:true,generated:true,date:today(),track:tr,kind:"hazır ders",title:t.name,hook:t.analogy||"",topicId:t.id,
    blocks:[{t:"h",text:"Bugünkü konu"},{t:"p",text:t.name+(t.area?" ("+t.area+" bölümü)":"")+" konusunu öğreniyorsun. Önce büyük resmi gör, sonra soruyla pekiştir."},
      t.analogy?{t:"box",h:"Benzetme",text:t.analogy}:{t:"p",text:"Konuyu kendi cümlenle anlatabilir hale gelmek hedef."},
      {t:"steps",h:"Bu konuyu şöyle çalış",items:st},
      {t:"warn",h:"Hazır temel ders",text:"Bu ders her an hazır bekleyen temel çerçevedir. Daha zengin anlatım, örnek ve mülakat soruları için aşağıdan 'Ders üret' ile derinleştirebilirsin."}],
    quiz:baseQuiz(tr,t),interview:[],vocab:[],resources:[],sources:[],warmup:localWarm({track:tr,topicId:t.id,title:t.name}),homework:(tr==="ccna"||tr==="eng")?"Sınıfta 5 soru çöz.":"Alıştırmada 5 karışık soru çöz.",coachNote:"",story:null};
  /* Sabit ders kütüphanesi (content/lessons/*.js): varsa genel çerçeve yerine yazılmış tam ders gelir. */
  var SLm=/^s-[a-z]+-(\d+)$/.exec(t.id||""),SL=SLm&&window.PP_LESSONS&&window.PP_LESSONS[tr]?window.PP_LESSONS[tr][SLm[1]]:null;
  if(SL&&Array.isArray(SL.blocks)&&SL.blocks.length){
    l.kind="hazır ders";l.hook=SL.hook||l.hook;l.blocks=SL.blocks.slice();l.homework=SL.homework||l.homework;
    if(Array.isArray(SL.quiz)&&SL.quiz.length)l.quiz=SL.quiz;
    l.interview=SL.interview||[];l.vocab=SL.vocab||[];l.resources=SL.resources||[];l.sources=SL.sources||[];
    l.warmup=cleanWarm(SL.warmup)||l.warmup;l.story=SL.story||null;l.staticLesson=true;
    ["objectives","summary","prereq","minutes","sonDogrulama","surum"].forEach(function(k){if(SL[k]!==undefined)l[k]=SL[k]});
    return cleanLesson(l);
  }
  var TM=tmFor(l);
  if(TM){var E=TM.m,add=[{t:"h",text:"Neden var?"},{t:"p",text:E.w},{t:"h",text:"Büyük harita"},{t:"steps",h:"Parçalar",items:E.m.map(function(x){return x[0]+": "+x[1]})},{t:"h",text:"Örnek"},{t:"cmd",text:E.x}];
    E.f.forEach(function(f){add.push({t:"box",h:f[0],text:f[1]})});
    add.push({t:"h",text:"Nerede kullanılır?"},{t:"steps",h:"Durum ve cevabı",items:E.u.map(function(u){return u[0]+" → "+u[1]})});
    var at=-1;l.blocks.forEach(function(b,i){if(b.t==="steps"&&at<0)at=i});if(at<0)at=l.blocks.length-1;
    l.blocks=l.blocks.slice(0,at).concat(add,l.blocks.slice(at));}
  return cleanLesson(l);
}
function lessonPath(tr,cur){
  var T=S.topics.length?topicsOf(tr):starterTopics(tr);if(!T.length)return null;
  var ci=0;for(var i=0;i<T.length;i++){if(cur&&T[i].id===cur.topicId){ci=i;break}}
  if(!cur){for(var j=0;j<T.length;j++){if(T[j].status==="next"){ci=j;break}}}
  var from=Math.max(0,ci-1),rows=T.slice(from,from+7),k=cur?lessonKey(cur):"";
  var lab=[["w","Isınma"],["r","Oku"],["q","Mini sınav"],["p","Alıştırma"]];
  return h("details",{class:"panel",open:S._lpOpen!==false,ontoggle:function(e){S._lpOpen=e.target.open}},h("summary",null,h("b",null,"Ders yolu "),h("span",{class:"small mute"},"sıradakini açmak için bu dersi bitir")),
    h("div",{class:"small mute"},"Her konuda: Isınma, Oku, Mini sınav, Alıştırma. Dördü bitince sıradaki ders açılır. Ne zaman çalışacağın sana kalmış; kilit sadece sırayı korur."),
    h("div",{style:"display:grid;gap:6px;margin-top:8px"},rows.map(function(t,i){
      var idx=from+i,cu=cur&&t.id===cur.topicId,done=PP.ogr.ilerleme.konuTamam(t)||(cu&&lcDone(k)),lock=!done&&!cu&&t.status!=="next";
      return h("div",{class:"jst"+(done?" done":"")+(cu?" cur":"")},h("div",{class:"jn"},done?"✓":lock?"🔒":String(idx+1)),
        h("div",{class:"jb"},h("div",{class:"t"},t.name),
          cu?h("div",{class:"small mute"},lab.map(function(x){return (lcHas(k,x[0])?"✓ ":"○ ")+x[1]}).join("  ")):lock?h("div",{class:"small mute"},(function(){try{return window.PP&&PP.ogr&&PP.ogr.ui&&PP.ogr.ui.kilitNedeni(t.id)}catch(e){return null}})()||"Önceki ders bitince açılır"):null),h("div",null))})));
}
var TRK_CERT_PLACEHOLDER=1;
var TRK_CERT={"net":{"lines":["Sınav kodu N10-009 (Network+ V9), 20 Haziran 2024'te yayımlandı. Resmî sayfada başka bir sürüm (N10-010) duyurusu görünmüyor.","En çok 90 soru (çoktan seçmeli ve performansa dayalı), 90 dakika, geçme puanı 720 (100-900 ölçeğinde).","Alan ağırlıkları: Ağ kavramları %23, Ağ uygulaması %20, Ağ operasyonları %19, Ağ güvenliği %14, Sorun giderme %24.","Önerilen deneyim: CompTIA A+ ve 9-12 ay ağ destek deneyimi (zorunlu değil). Sınav ücreti resmî sayfada listelenmiyor; güncel fiyat için sayfaya bakın."],"link":"https://www.comptia.org/en-us/certifications/network/","label":"CompTIA Network+ N10-009 resmî sayfası","blurb":"Satıcıdan bağımsız ağ temelini sıfırdan kurar: OSI, IP, yönlendirme, güvenlik ve sorun giderme. CompTIA Network+ sınavına ve ağ destek işlerine hazırlar.","name":"Network","cert":"CompTIA Network+ N10-009"},"dev":{"lines":["Sınav: Kubernetes and Cloud Native Associate (KCNA), Linux Foundation ve CNCF. Online gözetimli, çoktan seçmeli, giriş seviyesi; ön koşul yok.","Süre 90 dakika. Soru sayısı yaklaşık 60, geçme puanı %75 olarak yaygın biçimde bildirilir; bu iki bilgi resmî ürün sayfasında yazmaz, kayıttan önce Candidate Handbook'tan teyit et.","Alan ağırlıkları: Kubernetes Fundamentals %44, Container Orchestration %28, Cloud Native Application Delivery %16, Cloud Native Architecture %12.","Ücret 250 ABD doları (bir ücretsiz yeniden deneme dahil). Sertifika 2 yıl geçerli; sınavı planlamak için kayıttan sonra 12 ay süre var. Fiyat değişebilir, sayfadan kontrol et.","Sonraki adım: HashiCorp Terraform Associate (004), Terraform 1.12 konularını sınar, 1 saat sürer, geçerlilik 2 yıl. Kubernetes uygulamalı sertifikaları (CKA, CKAD) bir sonraki seviyedir."],"link":"https://training.linuxfoundation.org/certification/kubernetes-cloud-native-associate/","label":"Linux Foundation KCNA (Kubernetes and Cloud Native Associate) resmî sayfası","blurb":"Sıfırdan DevOps: Linux, Git, CI/CD, Docker, Kubernetes, kod olarak altyapı ve gözlemlenebilirlik. KCNA sınavına hazırlanırken gerçek iş akışını da kavratır.","name":"DevOps","cert":"Linux Foundation KCNA (Kubernetes and Cloud Native Associate)"},"qa":{"lines":["Sınav: ISTQB Certified Tester Foundation Level (CTFL) v4.0. Müfredatın güncel yayımı v4.0.1'dir. Resmî ISTQB sayfasında (Ekim 2026) v4.0'ın yerini alan daha yeni bir CTFL sürümü görünmüyor.","Biçim: 40 çoktan seçmeli soru, toplam 40 puan, 60 dakika. Geçme puanı 26/40 (en az yüzde 65). Sınavı anadili olmayan bir dilde alan adaylara yüzde 25 ek süre (75 dakika) tanınır.","Altı bölüm ve müfredattaki asgari eğitim süresi: Test temelleri 180 dk, Yaşam döngüsü boyunca test 130, Statik test 80, Test analizi ve tasarımı 390, Test faaliyetlerinin yönetimi 335, Test araçları 20 dk (toplam 1135 dk).","Ağırlık: test teknikleri (Bölüm 4) ve test yönetimi (Bölüm 5) en büyük paydır; bu derste de en çok konu bunlara ayrıldı. Bölüm 6 kısadır ama işe girişte gereken araç pratiği için genişletildi.","Bilişsel düzeyler: CTFL'de öğrenme hedefleri K1 (hatırlama), K2 (anlama), K3 (uygulama) düzeyindedir. K4 (analiz) Foundation'da yoktur, ileri düzeylerdedir. Sorular bu mantığa göre kolaydan zora dizildi."],"link":"https://www.istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0","label":"ISTQB Certified Tester Foundation Level (CTFL) v4.0 resmî sayfası","blurb":"Yazılım testinin temelini ISTQB CTFL müfredatıyla öğretir: test tasarım teknikleri, hata raporu, API ve SQL ile doğrulama. Junior QA işine başvurmak için gereken ortak dili ve pratiği kazandırır.","name":"Test Uzmanı","cert":"ISTQB Certified Tester Foundation Level (CTFL) v4.0"}};
function certPanel(tr){
  var c=TRK_CERT[tr];if(!c)return null;
  return h("details",{class:"panel",style:"padding:10px 14px"},h("summary",{style:"cursor:pointer;font-weight:700;min-height:40px;display:flex;align-items:center"},"Sınav bilgisi: "+c.cert),
    h("div",{class:"small mute",style:"margin:6px 0"},c.blurb),
    h("ul",{style:"margin:6px 0;padding-left:18px;display:grid;gap:4px"},c.lines.map(function(x){return h("li",{class:"small"},x)})),
    h("a",{href:c.link,target:"_blank",rel:"noopener noreferrer",class:"small"},c.label));
}
function renderLessonBase(){
  var L=S.les,tr=L.track,LL=lessonListFor(tr),list=LL.list,realList=LL.real,out=[];
  var seg=h("div",{class:"seg",role:"group","aria-label":"Koç"},TRK_LIST.map(function(o){
    return h("button",{type:"button","aria-pressed":tr===o[0]?"true":"false",onclick:function(){L.track=o[0];L.id=null;L.ask={busy:false,ans:null,err:null};draw()}},o[1])}));
  var l=list.filter(function(x){return x.id===L.id})[0]||list[0];
  var head=h("div",{class:"panel"},h("h2",null,"Ders"),
    h("div",{class:"small mute"},"Sıra: önce Isınma, sonra Anlatım, Mini sınav, Alıştırma. Hazır ders her an var; dört adım bitince sıradaki konu açılır."),seg,
    list.length?h("div",{class:"lscroll"},list.slice(0,14).map(function(x){return h("button",{type:"button",class:"opt","aria-pressed":x===l?"true":"false",onclick:function(){L.id=x.id;L.ask={busy:false,ans:null,err:null};draw()}},(x.review?"tekrar":x.date.slice(5)+(x.generated?" · hazır":""))+" · "+(x.title||"Ders").slice(0,22))})):null);
  out.push(head);var _cp=certPanel(tr);if(_cp)out.push(_cp);
  if(S.nonOwner&&S.pl.on&&S.pl.track===tr){out.push(plPanel());return out}
  if(S.nonOwner&&!plLoad()[tr]){out.push(lessonPlacement(tr));return out}
  var G=S.gen,genBtn=h("div",{class:"panel"},h("div",{class:"small mute"},S.nonOwner?"Seviyene ve sıradaki konuya göre ders hazırlanır; yaklaşık yarım dakika sürer. Her ders bir sonraki konuya geçer.":"Bugünün dersi akşam hazırlanır. Beklemek istemezsen şimdi bir ders ürettirebilirsin; yaklaşık yarım dakika sürer."),
    h("div",{style:"display:flex;gap:8px;align-items:center;flex-wrap:wrap"},
      G.busy?h("button",{class:"btn ghost",type:"button",onclick:function(){if(G.ctl)G.ctl.abort()}},"Durdur"):h("button",{class:"btn",type:"button",disabled:!S.sample,onclick:function(){genLesson(tr)}},"Şimdi ders üret"),
      G.busy?h("span",{class:"small mute"},"Hazırlanıyor..."):null,!S.sample?h("span",{class:"small mute"},"Bu görünümde kullanılamıyor."):null),
    G.err?h("div",{class:"fb bad"},G.err):null);
  if(!l){out.push(h("div",{class:"empty"},(!S.sample?"Bu rota için dersler hazırlanıyor. Şimdilik Sınıf ve Alıştırma sekmelerinden soru çözebilirsin.":S.nonOwner?"Henüz dersin yok. Aşağıdan ilk dersini üret; sıradaki konuya göre hazırlanır.":"Henüz ders yok. Koç akşam çalışınca ilk ders burada görünür.")));if(S.sample)out.push(genBtn);out.push(lessonGuide(tr,null));return out}
  var curT=defaultTopic(tr),hasCur=realList.some(function(x){return x.topicId===curT});if(S.nonOwner?!hasCur:!realList.some(function(x){return x.date===today()}))if(S.sample)out.push(genBtn);
  var blocks=(Array.isArray(l.blocks)?l.blocks:[]).map(lblock).filter(Boolean);
  var lk=lessonKey(l),act=activeLesson();
  if(act&&!lcGrand(l)&&act.key!==lk&&!lcDone(lk)){
    out.push(h("div",{class:"panel"},h("div",{class:"label"},"Önce bunu bitir"),h("h2",null,act.l.title||"Ders"),
      h("div",{class:"small mute"},trName(act.track)+" dersine başladın. Daldan dala atlamak öğrenmeyi dağıtır. Bu dersin dört adımı (Isınma, Oku, Mini sınav, Alıştırma) bitince diğer dersler açılır. Bitirdiğin eski dersleri istediğin zaman tekrar açabilirsin."),
      h("button",{class:"btn",type:"button",onclick:function(){S.les.track=act.track;S.les.id=act.l.id;draw()}},"Derse dön")));
    return out;
  }
  if(!l.warmup&&!(S.les.wg[l.id]&&S.les.wg[l.id].w)){S.les.wg[l.id]=S.les.wg[l.id]||{};S.les.wg[l.id].w=localWarm(l)}
  lcSync(l);
  var ctaK=lessonKey(l),ctaS=lrAuto(l),ctaD=lcDone(ctaK),ctaN=LR_STEPS.filter(function(x){return lrDone(l,x[0])}).length;
  out.push(h("div",{class:"lr-cta"},h("div",{class:"label",style:"color:rgba(255,255,255,.8)"},"Ders odası"),h("h2",null,l.title||"Ders"),
    h("div",{class:"small"},ctaD?"Bu dersi tamamladın. İstersen notlarına dön ya da tekrar aç.":"Isınma, anlatım, mini sınav, alıştırma ve ders notları tek odak ekranında. "+(ctaN?ctaN+"/5 adım tamam.":"≈ "+lessonMinutes(l)+" dk.")),
    h("button",{class:"btn big",type:"button",onclick:function(){lrOpen(l,ctaD?"notlar":ctaS)}},ctaD?"Odayı aç":ctaN?"Derse devam et":"Derse gir")));
  var ctaIx=out.length;
  out.push(lessonGuide(tr,l));
  var lp=lessonPath(tr,l);if(lp)out.push(lp);try{var ppo=PP.ogr.ui.panel(tr,l);if(ppo)out.push(ppo)}catch(e){}
  var pvl=list[list.indexOf(l)+1];
  if(!lcGrand(l)&&!lcW(lk)){
    var wu0=renderWarmup(l),ww=l.warmup||S.les.wg[l.id].w,its=ww?(tr==="eng"?ww.words:ww.concepts)||[]:[],rdy=0;
    its.forEach(function(x,i){if(S.les.wk[l.id+":"+i])rdy++});
    var allr=rdy>=its.length;
    out.push(h("div",{class:"panel"},h("div",{class:"label"},"Kilitli: önce ısınma"),h("h2",null,l.title||"Ders"),
      h("div",{class:"small mute"},"Derse girmeden önce kısa bir ısınma yap. Bu, öğrendiklerini hatırlatır ve anlatımı çok daha kolay anlamanı sağlar. Hazır olunca anlatım ve mini sınav açılır. İstediğin saatte, kendi hızında yapabilirsin.")));
    if(pvl){var rcp0=recapCard(pvl,"Bir önceki ders");if(rcp0)out.push(rcp0)}
    var tmP=renderTMap(l,false);if(tmP)out.push(tmP);
    if(wu0)out.push(wu0);
    out.push(h("div",{class:"panel"},h("button",{class:"btn",type:"button",disabled:!allr,onclick:function(){lcSet(lk,"w",tr);rtToast("Isınma tamam. Ders açıldı.");lrOpen(l,"anlat")}},"Isınmayı bitirdim, derse gir"),
      h("div",{class:"small mute",style:"margin-top:6px"},its.length?(allr?"Hazırsın.":"Kartlarda 'Hazırım' de, sonra ders açılır. ("+rdy+"/"+its.length+")"):"Yukarıdaki özeti oku, sonra devam et."),
      h("button",{class:"btn ghost",type:"button","data-atla":"1",onclick:function(){lcAtla(lk,tr);lrOpen(l,"anlat")}},"Isınmayı atla")));
    return out;
  }
  out.push(lessonNav(l));
  if(pvl){var rcp=recapCard(pvl,"Bir önceki ders");if(rcp)out.push(rcp)}
  var tmQ=renderTMap(l,true);if(tmQ)out.push(tmQ);
  var wu=renderWarmup(l);if(wu)out.push(wu);
  out.push(h("div",{class:"panel",id:"ls-ders"},
    h("div",{style:"display:flex;gap:8px;align-items:center;flex-wrap:wrap"},h("span",{class:"pill"+(tr==="eng"?" eng":" ok")},l.kind||"ders"),h("span",{class:"mono mute small"},l.date),h("span",{class:"pill",title:"Tahmini süre"},"≈ "+lessonMinutes(l)+" dk")),
    h("h2",null,l.title||"Ders"),
    l.hook?h("div",{class:"lbox"+(tr==="eng"?" eng":"")},h("div",{class:"label"},"Bir cümleyle"),h("p",null,l.hook)):null,
    h("div",{class:"lsn"},blocks),
    l.homework?h("div",{class:"lbox warn"},h("div",{class:"label"},"Bugünün görevi"),h("p",null,l.homework)):null));
  var lt=lessonTerms(l);if(lt)out.push(lt);
  var q=lessonQuiz(l);if(q)out.push(q);
  var iv=Array.isArray(l.interview)?l.interview:[];
  if(iv.length)out.push(h("div",{class:"panel",id:"ls-mulakat"},h("h2",null,"Mülakat çantası"),h("div",{class:"small mute"},"Önce sesli cevap ver, sonra örnek cevabı aç."),
    iv.map(function(c,i){return h("div",{class:"lsn",style:"border-top:1px solid var(--line);padding-top:12px"},h("div",null,h("b",null,c.q||"")),
      revBtn(l.id+":iv"+i,"Örnek cevap",h("p",null,c.a||"")))})));
  var vc=Array.isArray(l.vocab)?l.vocab:[];
  if(vc.length)out.push(h("div",{class:"panel"},h("h2",null,"Kelimeler"),
    vc.map(function(v){return h("div",{style:"display:grid;gap:2px;border-top:1px solid var(--line);padding-top:8px"},h("div",null,h("b",null,v.term||""),v.tr?" · "+v.tr:""),v.ex?h("div",{class:"small mute"},v.ex):null)})));
  if(l.story&&l.story.text)out.push(h("div",{class:"panel"},h("div",{class:"label"},(MYN()||"Senin")+(MYN()?"'un":"")+" Ofisi"),h("h2",null,l.story.title||"Bölüm"),h("p",{style:"margin:0;white-space:pre-wrap;line-height:1.55"},l.story.text),
    l.story.question?h("div",{class:"lbox eng"},h("div",{class:"label"},"Cevapla"),h("p",null,l.story.question)):null));
  if(l.coachNote)out.push(h("div",{class:"lbox"+(tr==="eng"?" eng":"")},h("div",{class:"label"},"Koçun notu"),h("p",null,l.coachNote)));
  var rc=renderResources(l);if(rc)out.push(rc);
  var srcs=Array.isArray(l.sources)?l.sources:[];
  if(srcs.some(function(x){return safeUrl(x&&x.url)}))out.push(h("div",{class:"panel",id:"ls-dipnot"},h("h2",null,"Dipnotlar"),h("div",{class:"small mute"},"Metindeki [n] işaretleri buradaki kaynağa gider."),h("ol",{class:"lsteps"},srcs.map(function(x,i){return safeUrl(x&&x.url)?h("li",{id:"fn-"+(i+1)},h("a",{href:x.url,target:"_blank",rel:"noopener"},x.title||x.url)):null}))));
  var P=prog(),rd=lcGrand(l)?!!P["read_"+tr]:lcHas(lessonKey(l),"r");
  out.push(h("div",{class:"panel"},h("div",{style:"display:flex;gap:8px;align-items:center;flex-wrap:wrap"},
    h("button",{class:"btn"+(rd?" ghost":""),type:"button",disabled:!S.db||!S.canWrite,onclick:function(){if(!lcGrand(l)){if(rd)lcUnset(lessonKey(l),"r");else lcSet(lessonKey(l),"r",tr)}setProg((function(){var o={};o["read_"+tr]=!rd;return o})());if(!lcGrand(l))sched()}},rd?"Okundu (geri al)":"Dersi okudum"),
    h("span",{class:"small mute"},rd?"Rotada işaretlendi.":"Bitirince işaretle; Bugün sekmesindeki rota güncellenir."))));
  /* koça sor + not */
  var A=L.ask,ta=h("textarea",{id:"l-ask",maxlength:500,placeholder:"Anlamadığın yeri yaz"}),ta2=h("textarea",{id:"l-note",maxlength:800,placeholder:"Not: örn. 'VLAN trunk kısmını tekrar oku', 'bu mülakat sorusunu sevdim'",oninput:function(e){L.noteText=e.target.value}});ta2.value=L.noteText||"";
  var msg=h("span",{class:"small mute",id:"l-msg"});
  out.push(h("div",{class:"panel"},h("h2",null,"Ders içinde ara"),
    h("div",{class:"small mute"},"Sorunu yaz; bu dersin içinde en çok eşleşen yerleri getiririm (anlatım, quiz notları, mülakat, kelimeler)."),ta,
    h("div",{style:"display:flex;gap:8px;align-items:center"},h("button",{class:"btn",type:"button",onclick:function(){askCoach(l,ta.value)}},"Ara")),
    A.err?h("div",{class:"fb bad"},A.err):null,A.ans?h("div",{class:"fb"},h("p",{style:"margin:0;white-space:pre-wrap;line-height:1.55"},A.ans)):null));
  out.push(renderTeach(l));
  var mine=S.inbox.filter(function(x){return x.track===tr}).sort(function(a,b){return String(b.ts).localeCompare(String(a.ts))}).slice(0,6);
  out.push(h("div",{class:"panel"},h("h2",null,"Kendine not bırak"),
    h("div",{class:"small mute"},"Bu derse dair takıldığın yeri ya da hatırlamak istediğini yaz; burada kalır."),ta2,
    h("div",{style:"display:flex;gap:8px;align-items:center"},h("button",{class:"btn",type:"button",disabled:!S.db||!S.canWrite,onclick:function(){
      var v=ta2.value.trim();if(!v)return;
      S.db.collection("inbox").add({track:tr,lessonId:l.id,date:today(),text:v.slice(0,800),status:"new",ts:new Date().toISOString()}).then(function(){ta2.value="";L.noteText="";msg.textContent="Bırakıldı."},function(){msg.textContent="Kaydedilemedi."});
    }},"Notu kaydet"),msg),
    mine.map(function(x){return h("div",{style:"border-top:1px solid var(--line);padding-top:8px;display:grid;gap:4px"},
      h("div",{class:"small"},h("span",{class:"mono mute"},(x.date||"")+" · "),x.text),
      x.reply?h("div",{class:"lbox"+(tr==="eng"?" eng":"")},h("div",{class:"label"},"Koç cevabı"),h("p",null,x.reply)):null)})));
  var _restL=out.splice(ctaIx);out.push(h("details",{class:"panel lr-old"},h("summary",null,"Tüm ders tek sayfada (klasik görünüm), ders içinde ara, mülakat, kaynaklar"),_restL));
  return out;
}

"use strict";
/* ---- veri ---- */
function listen(db,name,key){
  db.collection(name).onSnapshot(function(s){
    S._ld=S._ld||{};S._ld[key]=1;S[key]=s.docs.map(function(d){var x=d.data()||{};x.id=d.id;return key==="lessons"?cleanLesson(x):key==="tickets"?cleanTicket(x):key==="audit"?cleanAudit(x):key==="projects"?cleanProject(x):x}).filter(Boolean);sched();
  },function(){});
}
S.ready2=false;setTimeout(function(){S.ready2=true;sched()},2500);
S._t0=Date.now();
S.kimlik=!(window.claude&&window.claude.use);   /* artifact/çevrimdışı ortamda hemen true; web'de oturum çözülünce */
draw();
if(window.claude&&window.claude.use){
  Promise.all([window.claude.use("db"),window.claude.use("user")]).then(function(r){
    var db0=r[0],user=r[1];
    if(!db0){if(window.ppGate)ppGate.ac();return}
    var nonOwner=false;try{nonOwner=!!(user&&user.isOwner&&user.isOwner()===false)}catch(e){}
    S.kimlik=true;S.nonOwner=nonOwner;try{draw()}catch(e){}if(window.ppGate)ppGate.ac();
    return Promise.resolve(user&&user.id?user.id():null).catch(function(){return null}).then(function(uid){
    var db=db0;
    if(nonOwner&&uid){
      var PFX="data/users/"+uid+"/pp/",SHD={league:1,cheers:1,league_notes:1,jobpool:1,gazete:1};
      db={collection:function(n){return SHD[n]?db0.collection(n):db0.collection(PFX+n)},doc:function(q){return SHD[String(q).split("/")[0]]?db0.doc(q):db0.doc(PFX+q)}};
    }
    S.db=db;S.userCap=user||null;S.me=uid||null;sched();if(nonOwner&&user&&user.me){try{Promise.resolve(user.me()).then(function(m){if(uid&&m&&m.name){S.names[uid]=m.name;sched()}}).catch(function(){})}catch(e){}}
    if(user&&user.can){try{var w=user.can("data.write");Promise.resolve(w).then(function(v){if(v===false){S.canWrite=false;if(nonOwner)S.guest=true;sched()}})}catch(e){}}
    db.doc("profile/main").onSnapshot(function(s){S.profile=s.exists?(s.data()||{}):{};sched()},function(){});
    db.doc("story/main").onSnapshot(function(s){S.story=s.exists?s.data():null;sched()},function(){});
    listen(db,"topics","topics");listen(db,"jobpool","pool");db.collection("gazete").onSnapshot(function(s){S.gz=s.docs.map(function(d){var x=d.data()||{};x.id=d.id;return gzClean(x)}).filter(Boolean);sched()},function(){});listen(db,"projects","projects");listen(db,"days","days");listen(db,"exams","exams");
    listen(db,"rewards","rewards");listen(db,"lessons","lessons");listen(db,"progress","progress");listen(db,"inbox","inbox");listen(db,"badges","badges");listen(db,"mistakes","mistakes");listen(db,"reading","reading");listen(db,"words","words");listen(db,"reports","reports");listen(db,"tickets","tickets");listen(db,"interview","interview");listen(db,"ticket_replies","treplies");listen(db,"ticket_reviews","treviews");listen(db,"audit","audit");listen(db,"audit_votes","avotes");
    db.collection("league").onSnapshot(function(s){S.league=s.docs.map(function(d){var x=d.data()||{};x.id=d.id;return x});S.lgLoaded=true;resolveNames();sched()},function(){});
    db.collection("cheers").onSnapshot(function(s){S.cheers=s.docs.map(function(d){var x=d.data()||{};x.id=d.id;return x});sched()},function(){});
    db.collection("league_notes").onSnapshot(function(s){S.lnotes=s.docs.map(function(d){var x=d.data()||{};x.id=d.id;return x});sched()},function(){});
    db.doc("prefs/onb").onSnapshot(function(s){S.onb=s.exists?(s.data()||null):null;S.onbLoaded=true;onbApply(S.onb);sched()},function(){S.onbLoaded=true;sched()});db.doc("prefs/mock").onSnapshot(function(s){var d=s.exists?(s.data()||{}):{};S.mock=Array.isArray(d.rows)?d.rows.filter(function(x){return x&&typeof x.d==="string"&&typeof x.avg==="number"}).slice(-30):[];sched()},function(){});db.doc("prefs/sync").onSnapshot(function(s){syncApply(s.exists?s.data():null)},function(){syncApply(null)});db.doc("prefs/jobs").onSnapshot(function(s){S.jobs=s.exists?(s.data()||null):null;sched()},function(){});
    db.doc("prefs/cv").onSnapshot(function(s){if(s.exists){cvLoad(s.data())}sched()},function(){});
    db.doc("prefs/notes").onSnapshot(function(s){S.pn=s.exists?(s.data()||{}):{};sched()},function(){});
    db.doc("desk/main").onSnapshot(function(s){S.desk=s.exists?(s.data()||{}):{};sched()},function(){});
    db.collection("attempts").orderBy("ts","desc").limit(400).onSnapshot(function(s){
      S._ld=S._ld||{};S._ld.attempts=1;S.attempts=s.docs.map(function(d){var x=d.data()||{};x.id=d.id;return x});sched();
    },function(){});
    });
  }).catch(function(){if(window.ppGate)ppGate.hata()});
  window.claude.use("sample").then(function(f){S.sample=f||null;sched()},function(){});
  window.claude.use("mcp").then(function(m){S.mcp=m||null;sched()},function(){});
  window.claude.use("downloads").then(function(d){S.dl=d||null;sched()},function(){});
}
/* Ders içeriği (content/lessons, ~2,2 MB) ilk açılışı bloklamasın diye type="text/x-lazy" ile bekletilir; bütün betikler paralel iner, SIRAYLA çalışır (async=false), bitince ekran yenilenir. Testler index.html'den src listesini okur. */
(function(){
  var l=[].slice.call(document.querySelectorAll('script[type="text/x-lazy"]')),kalan=l.length;
  function bitti(){if(--kalan>0)return;window.PP_DERS_HAZIR=true;try{_glAll=null}catch(e){}try{draw()}catch(e){}}
  if(!kalan){window.PP_DERS_HAZIR=true;return}
  l.forEach(function(o){var s=document.createElement("script");s.async=false;s.onload=s.onerror=bitti;s.src=o.getAttribute("src");document.head.appendChild(s)});
})();
/* Çevrimdışı iletisi (servis çalışanı varsayılan KAPALI; yalnız açıklama): bağlantı koparsa okuma sürer, giriş/kayıt/sunucu işleri beklemeli. */
(function(){
  var k=null;
  function goster(){
    if(navigator.onLine!==false){if(k){k.remove();k=null}return}
    if(k)return;
    k=document.createElement("div");k.setAttribute("role","status");k.setAttribute("data-cevrimdisi","1");
    k.style.cssText="position:fixed;left:8px;right:8px;bottom:8px;z-index:9000;padding:10px 14px;border-radius:10px;background:#1F2937;color:#F9FAFB;font:14px system-ui,sans-serif;text-align:center";
    k.textContent="Çevrimdışısın. Açık ekranı okuyabilirsin; giriş, kayıt ve sınav gönderimi bağlantı gelince çalışır.";
    document.body.appendChild(k);
  }
  window.addEventListener("offline",goster);window.addEventListener("online",goster);goster();
})();

"use strict";
/* ---- veri ---- */
function listen(db,name,key){
  db.collection(name).onSnapshot(function(s){
    S._ld=S._ld||{};S._ld[key]=1;S[key]=s.docs.map(function(d){var x=d.data()||{};x.id=d.id;return key==="lessons"?cleanLesson(x):key==="tickets"?cleanTicket(x):key==="audit"?cleanAudit(x):key==="projects"?cleanProject(x):x}).filter(Boolean);sched();
  },function(){});
}
S.ready2=false;setTimeout(function(){S.ready2=true;sched()},2500);
S._t0=Date.now();
draw();
if(window.claude&&window.claude.use){
  Promise.all([window.claude.use("db"),window.claude.use("user")]).then(function(r){
    var db0=r[0],user=r[1];
    if(!db0){if(window.ppGate)ppGate.ac();return}
    var nonOwner=false;try{nonOwner=!!(user&&user.isOwner&&user.isOwner()===false)}catch(e){}
    S.nonOwner=nonOwner;try{draw()}catch(e){}if(window.ppGate)ppGate.ac();
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

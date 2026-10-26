"use strict";
/* ALAN: Ders > önizleme ve konu haritası (renderTMap, renderWarmup). NE YAPAR: Dersin konu eşlemesini (TMAP) bulanık eşleştirerek ders metnine bağlar ve önizleme gövdesini çizer.
   SORUN OLURSA: TMAP js/veri/tmap-js.js'ten gelir (ÖNCE yüklenmeli); eşleme kök (ilk 5 harf) ve TM_STOP durdurma sözcükleriyle yapılır, yeni konu eşleşmiyorsa buraya bak; S.les ortak durumdur.
   YENİ ÖZELLİK: Yeni eşleme kuralı tmFuzzy/tmFor'a eklenir; tests/tmcov.js ve tests/t60b_cov.js güncellenir. */
/* ---- v56: Ders önizlemesi ve konu haritası ---- */
function tmNorm(x){return String(x||"").toLowerCase().replace(/[^a-zçğıöşü0-9]+/g," ").trim()}
var TM_STOP={"temel":1,"konu":1,"ders":1,"nedir":1,"kavra":1,"farki":1,"farkı":1,"nasil":1,"nasıl":1,"ornek":1,"örnek":1,"genel":1,"giris":1,"giriş":1,"bolum":1,"bölüm":1,"hazir":1,"hazır":1,"aws":1,"api":1,"güven":1,"guven":1,"cloud":1,"bulut":1,"yazil":1,"yazıl":1};
function tmStems(x){var o={};tmNorm(x).split(" ").forEach(function(w){if(w.length>=3){var k=w.slice(0,5);if(!TM_STOP[k]&&!TM_STOP[w])o[k]=1}});return o}
function tmFuzzy(tr,txt){
  var q=tmStems(txt),sc=[];
  TMAP[tr].forEach(function(e,i){var a=tmStems(e.n.join(" ")),b=tmStems(e.k),c=tmStems(e.m.map(function(x){return x[0]}).join(" ")),n=0;
    Object.keys(q).forEach(function(k){if(a[k])n+=2;else if(b[k])n+=1.5;else if(c[k])n+=.5});sc.push([n,i])});
  sc.sort(function(x,y){return y[0]-x[0]});
  return sc[0][0]>=1&&sc[0][0]>sc[1][0]+.4?sc[0][1]:-1;
}
function tmFor(l){
  var tr=l&&l.track;if(!TMAP[tr]||!STARTER[tr])return null;
  var t=l.topicId?topicById(l.topicId):null,nm=tmNorm((t&&t.name)||l.title),m=/^s-([a-z]+)-(\d+)$/.exec(l.topicId||""),i=-1;
  TMAP[tr].forEach(function(e,k){if(i<0&&e.n.some(function(x){return tmNorm(x)===nm}))i=k});
  if(i<0)i=tmFuzzy(tr,((t&&t.name)||"")+" "+(l.title||""));
  if(i<0&&!t&&m&&m[1]===tr&&STARTER[tr][+m[2]-1]){var sn=tmNorm(STARTER[tr][+m[2]-1][0]);TMAP[tr].forEach(function(e,k){if(i<0&&e.n.some(function(x){return tmNorm(x)===sn}))i=k})}
  if(i<0)return null;
  var e=TMAP[tr][i],nm0=(t&&t.name)||e.n[0],pos=-1;
  STARTER[tr].forEach(function(r,k){if(pos<0&&e.n.indexOf(r[0])>=0)pos=k});
  return {m:e,i:i,tr:tr,name:nm0,prev:pos>0?STARTER[tr][pos-1][0]:"",next:pos>=0&&STARTER[tr][pos+1]?STARTER[tr][pos+1][0]:""};
}
S.les.tm={};
function tmSec(cls,label,body){return h("section",{class:"lp-sec "+cls},h("div",{class:"lp-lb"},label),body)}
function tmOpts(key,u){
  var r=ntHash(key)%3,o=[],c=(3-r)%3;for(var p=0;p<3;p++)o.push(u[1+((p+r)%3)]);return {o:o,c:c};
}
function tmBody(l,T){
  var m=T.m,L=S.les,out=[];
  out.push(h("div",{class:"lp-hero lp-"+T.tr},h("div",{class:"lp-k"},"DERS ÖNİZLEMESİ"),h("h2",null,T.name),
    h("div",{class:"lp-hook"},h("span",{class:"lp-q","aria-hidden":"true"},"?"),h("span",null,m.h)),
    h("div",{class:"lp-two"},
      h("div",{class:"lp-box"},h("b",null,"Bu derste"),h("ul",null,m.p.map(function(x){return h("li",null,x)}))),
      h("div",{class:"lp-box"},h("b",null,"Sonunda"),h("p",null,m.o)))));
  out.push(tmSec("lp-path","Yolculuk",h("div",{class:"lp-pathr"},
    T.prev?h("span",{class:"lp-chip"},T.prev):h("span",{class:"lp-chip mute"},"Başlangıç"),h("i",{"aria-hidden":"true"},"→"),
    h("span",{class:"lp-chip now"},"Bugün: "+T.name),h("i",{"aria-hidden":"true"},"→"),
    T.next?h("span",{class:"lp-chip"},T.next):h("span",{class:"lp-chip mute"},"Son durak"))));
  out.push(tmSec("lp-map","Büyük harita",h("ol",{class:"lp-flow"},m.m.map(function(x,i){return h("li",{class:"lp-n c"+(i%4)},h("span",{class:"lp-no"},String(i+1)),h("div",null,h("b",null,x[0]),h("span",null,x[1])))}))));
  if(m.c)out.push(tmSec("lp-cmp","Karşılaştır",h("div",{class:"lp-tw"},h("table",{class:"lp-t"},h("thead",null,h("tr",null,h("th",null,""),h("th",{class:"a"},m.c.a),h("th",{class:"b"},m.c.b))),
    h("tbody",null,m.c.r.map(function(r){return h("tr",null,h("th",null,r[0]),h("td",null,r[1]),h("td",null,r[2]))}))))));
  out.push(tmSec("lp-why","Neden var?",h("p",null,m.w)));
  out.push(tmSec("lp-ex","Örnek",h("pre",{class:"lp-code"},m.x)));
  out.push(tmSec("lp-fail","Bozulursa ya da yanlış yapılırsa ne olur?",h("div",{class:"lp-two"},m.f.map(function(f,i){return h("div",{class:"lp-f f"+i},h("b",null,f[0]),h("span",null,f[1]))}))));
  var okn=0,tot=m.u.length;
  m.u.forEach(function(u,i){if(L.tm[l.id+":"+i]!==undefined&&L.tm[l.id+":"+i]===tmOpts(l.id+":"+i,u).c)okn++});
  out.push(tmSec("lp-use","Nerede kullanılır? Durumu kavramla eşleştir ("+okn+"/"+tot+")",h("div",{class:"lp-uses"},m.u.map(function(u,i){
    var key=l.id+":"+i,oo=tmOpts(key,u),pk=L.tm[key],done=pk!==undefined;
    return h("div",{class:"lp-u"+(done?(pk===oo.c?" ok":" bad"):"")},h("div",{class:"lp-s"},u[0]),
      h("div",{class:"lp-os"},oo.o.map(function(o,j){return h("button",{type:"button",class:"lp-o"+(done&&j===oo.c?" right":"")+(done&&pk===j&&j!==oo.c?" wrong":""),"aria-pressed":pk===j?"true":"false",disabled:done,onclick:function(){L.tm[key]=j;draw()}},o)})),
      done?h("div",{class:"lp-fb"},pk===oo.c?"✓ Doğru.":"✗ Doğrusu: "+oo.o[oo.c]):null)}))));
  return out;
}
function renderTMap(l,fold){
  var T=tmFor(l);if(!T)return null;
  var body=tmBody(l,T);
  if(fold)return h("details",{class:"panel lp lp-fold"},h("summary",null,h("b",null,"Konu haritası ve önizleme"),h("span",{class:"small mute"}," harita, örnek, eşleştirme")),body);
  return h("div",{class:"panel lp",id:"ls-harita"},body);
}
function renderWarmup(l){
  var wg=S.les.wg[l.id]||{},w=l.warmup||wg.w,eng=l.track==="eng";
  if(!w){
    if(l.generated)return null;
    return h("div",{class:"panel wu",id:"ls-isinma"},h("div",{class:"label"},"Isınma"),
      h("div",{class:"small mute"},eng?"Bu ders için kelime ısınması henüz yok. Üretince bugünün kelimeleri, anlamları ve cümle içinde kullanımı çıkar.":"Bu ders için kavram ısınması henüz yok. Üretince geçen dersten özet ve bugün kullanılacak kavramlar çıkar."),
      h("div",{style:"display:flex;gap:8px;align-items:center;flex-wrap:wrap"},h("button",{class:"btn",type:"button",disabled:!S.sample||wg.busy,onclick:function(){genWarm(l)}},wg.busy?"Hazırlanıyor...":"Isınmayı hazırla"),
        !S.sample?h("span",{class:"small mute"},"Bu görünümde kullanılamıyor."):null),wg.err?h("div",{class:"fb bad"},wg.err):null);
  }
  var L=S.les,items=eng?w.words:w.concepts,ready=0;
  items.forEach(function(x,i){if(L.wk[l.id+":"+i])ready++});
  var out=[h("div",{style:"display:flex;justify-content:space-between;gap:8px;align-items:center;flex-wrap:wrap"},h("h2",null,"Isınma"),
    items.length?h("span",{class:"pill"+(ready===items.length?" ok":"")},ready+" / "+items.length+(eng?" kelime hazır":" kavram hazır")):null)];
  if(w.recap.length)out.push(h("div",{class:"wu-sec"},h("div",{class:"label"},"Geçen dersten aklında kalması gerekenler"),
    h("ul",{class:"wu-recap"},w.recap.map(function(r){return h("li",null,h("div",null,r.point),r.example?h("div",{class:"small mute"},"Örnek: "+r.example):null)}))));
  if(items.length){
    out.push(h("div",{class:"wu-sec"},h("div",{class:"label"},eng?"Bugün derste kullanacağımız kelimeler":"Bugün derste kullanacağımız kavramlar"),
      eng?h("div",{style:"display:flex;gap:8px;flex-wrap:wrap;align-items:center"},h("button",{class:"btn ghost",type:"button","aria-pressed":L.wuHide?"true":"false",onclick:function(){L.wuHide=!L.wuHide;draw()}},L.wuHide?"Anlamları göster":"Kendini sına (anlamları gizle)")):null,
      h("div",{class:"wu-cards"},items.map(function(x,i){
        var k=l.id+":"+i,ok=!!L.wk[k];
        if(eng){
          var saved=S.words.some(function(y){return y.w===wordKey(x.word)});
          return h("div",{class:"wcard"+(ok?" ok":"")},
            h("div",{class:"wc-top"},h("b",{class:"wc-w"},x.word),x.pos?h("span",{class:"pill"},x.pos):null,x.level?h("span",{class:"pill eng"},x.level):null,
              h("button",{type:"button",class:"btn ghost sp",title:"Dinle","aria-label":"Dinle",onclick:function(){speak(x.word)}},"▶")),
            h("div",{class:"wc-tr"},L.wuHide&&!L.wuOpen[k]?h("button",{type:"button",class:"btn ghost",onclick:function(){L.wuOpen[k]=true;draw()}},"Anlamı göster"):x.tr),
            x.ex?h("div",{class:"wc-ex"},h("div",{class:"sent-en",style:"--rfs:17px"},hlWord(x.ex,x.word)),x.exTr?h("div",{class:"small mute"},x.exTr):null,
              h("button",{type:"button",class:"btn ghost sp",title:"Cümleyi dinle",onclick:function(){speak(x.ex)}},"Cümleyi dinle")):null,
            x.use?h("div",{class:"wc-use"},h("span",{class:"label"},"Cümlede nasıl kurulur"),h("div",null,x.use)):null,
            h("div",{style:"display:flex;gap:6px;flex-wrap:wrap"},
              h("button",{type:"button",class:"btn"+(ok?"":" ghost"),onclick:function(){L.wk[k]=!L.wk[k];draw()}},ok?"Hazırım":"Tamam, biliyorum"),
              h("button",{type:"button",class:"btn ghost",disabled:saved||!S.db||!S.canWrite,onclick:function(){addWordToBank(x.word,x.tr,x.ex,"lesson:"+l.id)}},saved?"Defterinde":"Defterime ekle")));
        }
        return h("div",{class:"wcard"+(ok?" ok":"")},
          h("div",{class:"wc-top"},h("b",{class:"wc-w"},x.term),x.prereq?h("span",{class:"pill",title:"Bağlı olduğu kavram"},"önce: "+x.prereq):null),
          x.tr?h("div",{class:"wc-tr"},x.tr):null,
          x.summary?h("p",{class:"wc-sum"},x.summary):null,
          x.example?h("div",{class:"lbox"},h("div",{class:"label"},"Örnek"),h("p",null,x.example)):null,
          h("button",{type:"button",class:"btn"+(ok?"":" ghost"),onclick:function(){L.wk[k]=!L.wk[k];draw()}},ok?"Hazırım":"Tamam, anladım"));
      }))));
  }
  return h("div",{class:"panel wu"+(eng?" eng":""),id:"ls-isinma"},out);
}
S.les.wg={};S.les.wk={};S.les.wuOpen={};S.les.wuHide=false;

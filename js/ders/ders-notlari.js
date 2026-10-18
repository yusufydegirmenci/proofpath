"use strict";
/* ---- v55 Ders Notları: el yazısı defter ---- */
var NT_SVG={
star:'<svg viewBox="0 0 24 24"><path d="M12 2.5l2.8 6.4 6.9.6-5.2 4.5 1.6 6.8-6.1-3.7-6.1 3.7 1.6-6.8L2.3 9.5l6.9-.6z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round" stroke-linecap="round"/></svg>',
bulb:'<svg viewBox="0 0 24 24"><path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0012 3z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 0v1M3.5 4l.8.8M20.5 4l-.8.8M1 11h1M22 11h1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
excl:'<svg viewBox="0 0 24 24"><path d="M12 3l1 12h-2zM12 19v2" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
arrow:'<svg viewBox="0 0 48 24"><path d="M3 15c10-12 24-12 38-2M41 13l-7-5M41 13l-8 5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
pencil:'<svg viewBox="0 0 24 24"><path d="M4 20l1-5L16 4l4 4L9 19zM14 6l4 4" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round" stroke-linecap="round"/></svg>',
ask:'<svg viewBox="0 0 24 24"><path d="M8.5 8.5a3.5 3.5 0 117 0c0 2.5-3.5 2.5-3.5 5.5M12 18.5v1" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
wave:'<svg viewBox="0 0 120 10" preserveAspectRatio="none"><path d="M2 5q8-6 16 0t16 0 16 0 16 0 16 0 16 0 16 0" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>'};
NT_SVG.bigq='<svg viewBox="0 0 34 44"><path d="M7 14c0-6 4-10 10-10s10 4 10 9c0 9-9 9-9 17M17 38v4" fill="none" stroke="currentColor" stroke-width="4.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
NT_SVG.check='<svg viewBox="0 0 24 24"><path d="M4 13l5 5L20 6" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
NT_SVG.cross='<svg viewBox="0 0 24 24"><path d="M5 5l14 14M19 5L5 19" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/></svg>';
NT_SVG.spark='<svg viewBox="0 0 24 24"><path d="M12 2l2 8 8 2-8 2-2 8-2-8-8-2 8-2z" fill="currentColor" opacity=".75"/></svg>';
NT_SVG.moon='<svg viewBox="0 0 24 24"><path d="M16 3a9 9 0 100 18 7 7 0 01-4-6 7 7 0 014-12z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>';
NT_SVG.bolt='<svg viewBox="0 0 24 24"><path d="M13 2L5 14h6l-1 8 8-12h-6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>';
function ntD(n,cls){return svgEl(NT_SVG[n],"nt-d "+(cls||""))}
function ntKey(t){var m=String(t||"").match(/^([^(]+)\(([^)]+)\)/);return m?m[1].trim():String(t||"").trim()}
function ntHl(txt,terms,cls){
  txt=String(txt||"");var low=txt.toLowerCase(),best=-1,bl=0;
  (Array.isArray(terms)?terms:[terms]).forEach(function(t){t=String(t||"").trim();if(t.length<3)return;var i=low.indexOf(t.toLowerCase());if(i>=0&&(best<0||i<best)){best=i;bl=t.length}});
  if(best<0)return [txt];
  return [txt.slice(0,best),h("mark",{class:"nt-hl "+(cls||"hy")},txt.slice(best,best+bl)),txt.slice(best+bl)];
}
function ntHash(str){var n=0;for(var i=0;i<str.length;i++)n=(n*31+str.charCodeAt(i))%9973;return n}
function ntTitle(t,sub,tag,seed){
  var cols=["pb","pr","pg","pp","po"],c=cols[seed%cols.length];
  return h("div",{class:"nt-ttl-w"},h("h2",{class:"nt-ttl "+c},t,h("span",{class:"nt-wv"},ntD("wave"))),sub?h("div",{class:"nt-sub pk"},sub):null,tag?h("span",{class:"nt-tag"},tag):null);
}
function ntSec(label,pen,body,icon){
  return h("div",{class:"nt-sec"},h("div",{class:"nt-lb "+pen},icon?ntD(icon):null,h("span",null,label)),h("div",{class:"nt-tx "+pen},body));
}
function ntSticky(label,body){return h("div",{class:"nt-st"},label?h("b",null,label):null,h("div",null,body))}
function ntWarn(label,body){return h("div",{class:"nt-warn pr"},h("span",{class:"nt-wl"},ntD("excl"),label||"DİKKAT!"),h("div",null,body))}
function ntCode(txt){return h("div",{class:"nt-code"},h("i",{class:"nt-tp"}),String(txt))}
function ntQuiz(items){
  return h("div",{class:"nt-sec"},h("div",{class:"nt-lb pp"},ntD("ask"),h("span",null,"Kendini dene")),items.map(function(it){
    return h("details",{class:"nt-dq"},h("summary",{class:"pk"},it.q),h("div",{class:"pg"},h("b",null,"Cevap: "),it.a,it.why?h("div",{class:"nt-why pb"},it.why):null))}));
}
function ntPageEl(pg){
  var d=pg.d,seed=ntHash(pg.id),out=[];
  if(pg.kind==="t"){
    var E=d,TCN=TRN[S.nt.tr]||"";
    out.push(h("div",{class:"k-top"},h("div",{class:"k-rb k"+(seed%4)},E.n[0]),h("div",{class:"k-hatch"}),h("span",{class:"nt-tag"},TCN+" · ders notu")));
    out.push(h("div",{class:"k-cl"},h("span",{class:"k-q"},ntD("bigq")),h("div",{class:"pb"},E.h)));
    out.push(h("div",{class:"k-two"},
      h("div",{class:"k-hb"},h("div",{class:"k-hd pg"},ntD("check"),h("span",null,"Bu derste")),h("ul",{class:"k-ul pk"},E.p.map(function(x){return h("li",null,x)}))),
      h("div",{class:"k-st"},h("i",{class:"k-star"},ntD("star")),h("div",{class:"k-hd pp"},"Sonunda"),h("div",{class:"pk"},E.o))));
    out.push(h("div",{class:"nt-sec"},h("div",{class:"nt-lb pb"},ntD("pencil"),h("span",null,"Büyük harita")),
      h("div",{class:"k-fl"},E.m.map(function(x,i){return h("div",{class:"k-nd c"+(i%4),"data-n":String(i+1)},h("b",null,x[0]),h("span",null,x[1]))}))));
    if(E.c)out.push(h("div",{class:"nt-sec"},h("div",{class:"nt-lb pr"},ntD("arrow"),h("span",null,"Karşılaştır")),
      h("div",{class:"k-tw"},h("table",{class:"k-t"},h("thead",null,h("tr",null,h("th",null,""),h("th",{class:"a"},E.c.a),h("th",{class:"b"},E.c.b))),
        h("tbody",null,E.c.r.map(function(r){return h("tr",null,h("th",null,r[0]),h("td",null,r[1]),h("td",null,r[2]))}))))));
    out.push(h("div",{class:"nt-sec"},h("div",{class:"nt-lb pg"},ntD("bolt"),h("span",null,"Animasyonla izle")),renderAnim(E,{nb:1,title:"Adım adım"})));
    out.push(ntSec("Neden var?","pp",E.w,"bulb"));
    out.push(h("div",{class:"nt-sec"},h("div",{class:"nt-lb po"},ntD("pencil"),h("span",null,"Örnek")),ntCode(E.x)));
    out.push(h("div",{class:"nt-sec"},h("div",{class:"nt-lb pr"},ntD("excl"),h("span",null,"Bozulursa ne olur?")),
      h("div",{class:"k-fail"},E.f.map(function(f,i){return h("div",{class:"k-hb"+(i?"":" r"),style:i?"border-color:#d65f0a":""},h("div",{class:"k-hd "+(i?"po":"pr")},ntD(i?"bolt":"cross"),h("span",null,f[0])),h("div",{class:"pk"},f[1]))}))));
    out.push(h("div",{class:"nt-sec"},h("div",{class:"nt-lb pp"},ntD("star"),h("span",null,"Nerede kullanılır?")),
      h("ul",{class:"k-use"},E.u.map(function(u){return h("li",null,u[0]+" ",h("span",{class:"nt-ar pk"},ntD("arrow")),h("span",{class:"ans"},u[1]))}))));
    out.push(h("div",{class:"k-sk","aria-hidden":"true"},[0,1,2,3,4,5,6].map(function(i){return h("i",{style:"transform:rotate("+((i*37)%30-15)+"deg)"},ntD(i%3===0?"spark":i%3===1?"star":"moon"))})));
  }else if(pg.kind==="a"){
    var keys=[ntKey(d.t)],m=String(d.t).match(/\(([^)]+)\)/);if(m)keys.push(m[1]);
    out.push(ntTitle(d.t,d.tr,(d.g||"")+" · seviye "+(d.l||1),seed));
    out.push(ntSec("Kısaca","pb",ntHl(d.d,keys,"hy"),"star"));
    if(d.b)out.push(ntSec("Aklında kalsın","pg",d.b,"bulb"));
    if(d.x)out.push(ntCode(d.x));
    if(d.s)out.push(ntSec("Cümle","pp","“"+d.s+"”","pencil"));
    if(d.e)out.push(ntWarn("SIK YAPILAN HATA",d.e));
    if(d.q&&d.a)out.push(ntQuiz([{q:d.q,a:d.a}]));
  }else if(pg.kind==="n"){
    var F=GM_FACTS[d];
    out.push(h("div",{class:"nt-ic"},h("canvas",{class:"gc-ic",width:72,height:72,"data-n":d})));
    out.push(ntTitle(d,"Ağ Kuryesi · bilgi kartı","",seed));
    out.push(ntSec("Kısaca","pb",ntHl(F.t,[d],"hy"),"star"));
    out.push(ntSec("Gerçek hayatta","pg",F.e,"bulb"));
    out.push(ntWarn("EZBERLE!",F.k));
    var c=gmCards()[d];out.push(h("div",{class:"nt-stamp "+(gmCardLv(c&&c.ok||0)?"on":"")},gmCardLv(c&&c.ok||0)?"Kartın: "+GM_LVN[gmCardLv(c.ok)]:"Oyunda aç"));
  }else{
    var l=d;
    out.push(ntTitle(l.title||"Ders",l.virtual?"Hazır temel ders":(l.date||""),(TRK[l.track]?TRK[l.track].n:(l.track||"")),seed));
    var _hk=(l.blocks||[]).some(function(b){return (b.t==="box"||b.t==="eng")&&String(b.text||"").indexOf(String(l.hook||"~~"))>=0});if(l.hook&&!_hk)out.push(ntSec("Benzetme","pg",l.hook,"bulb"));
    var hi=0,pens=["pb","pr","pg","pp","po"];
    (l.blocks||[]).forEach(function(b){
      var t=b.t,tx=b.text||"";
      if(t==="h"){out.push(h("h3",{class:"nt-h "+pens[(hi++)%5]},tx,h("span",{class:"nt-wv"},ntD("wave"))))}
      else if(t==="p"){out.push(h("p",{class:"nt-p pb"},tx))}
      else if(t==="box"||t==="eng"){out.push(ntSticky(b.h,tx))}
      else if(t==="warn"){if(l.virtual)return;out.push(ntWarn(b.h||"DİKKAT!",tx))}
      else if(t==="steps"){out.push(h("div",{class:"nt-sec"},b.h?h("div",{class:"nt-lb po"},ntD("pencil"),h("span",null,b.h)):null,h("ol",{class:"nt-ol po"},(b.items||[]).map(function(x){return h("li",null,String(x))}))))}
      else if(t==="cmd"){out.push(ntCode(tx||(b.items||[]).join("\n")))}
      else if(t==="split"){out.push(ntSticky("Parçala",[b.tr||"",h("div",{class:"pp"},(b.parts||[]).map(function(p){return h("span",{class:"nt-chip"},(p.en||"")+" ",h("small",null,p.tr||""))})),b.result?h("div",{class:"pg"},"→ "+b.result):null]))}
    });
    if((l.vocab||[]).length)out.push(ntSec("Kelimeler","pr",h("div",null,l.vocab.slice(0,12).map(function(v){return h("div",{class:"nt-vo"},h("b",{class:"pr"},v.term||""),h("span",{class:"nt-ar pk"},ntD("arrow")),h("span",{class:"pb"},v.tr||""),v.ex?h("small",{class:"pk"},"“"+v.ex+"”"):null)})),"star"));
    var qs=(l.quiz||[]).slice(0,3).map(function(q){var kz=typeof qzAnahtar==="function"?qzAnahtar(l,q):{dogru:q.answer,why:q.why};return {q:q.q,a:kz.dogru,why:kz.why}}).filter(function(x){return x.q&&x.a});
    if(qs.length)out.push(ntQuiz(qs));
    if(l.homework)out.push(ntSec("Ödev","po",l.homework,"star"));
  }
  out.push(ntMineEl(pg));
  return h("div",{class:"nt-pg",style:"--rot:"+(((seed%5)-2)*.25)+"deg"},out);
}

var NT_KINDS=[["n","Not"],["s","Yapışkan"],["w","Dikkat"],["q","Soru"]],NT_PENS=["pb","pr","pg","pp","po"],NT_PENN={pb:"mavi",pr:"kırmızı",pg:"yeşil",pp:"mor",po:"turuncu"};
function ntNotes(id){var v=ntMine()[id];if(typeof v==="string")return v.trim()?[{k:"n",c:"pp",t:v.slice(0,1200),d:""}]:[];return Array.isArray(v)?v.filter(function(n){return n&&typeof n.t==="string"&&n.t.trim()}).slice(0,30):[]}
function ntSaveNotes(id,arr){var o=ntMine();if(arr.length)o[id]=arr.slice(0,30);else delete o[id];try{localStorage.setItem("ya_nt",JSON.stringify(o))}catch(e){}try{syncPush()}catch(e){}}
function ntMineEl(pg){
  var box=h("div",{class:"nt-sec nt-my"}),kind="n",pen="pp",edit=-1,draft="";
  function card(n,i){
    var k=NT_KINDS.some(function(a){return a[0]===n.k})?n.k:"n",c=NT_PENS.indexOf(n.c)>=0?n.c:"pp";
    var act=h("span",{class:"my-act"},h("button",{type:"button","aria-label":"Notu düzenle",onclick:function(){edit=i;paint()}},ntD("pencil")),h("button",{type:"button","aria-label":"Notu sil",onclick:function(){var a=ntNotes(pg.id);a.splice(i,1);ntSaveNotes(pg.id,a);paint()}},"×"));
    if(edit===i){var ta=h("textarea",{class:"my-ta my-"+k+" "+c,rows:3,maxlength:600,"aria-label":"Notu düzenle"});ta.value=n.t;
      return h("div",{class:"my-c my-"+k+" "+c+" ed"},ta,h("div",{class:"my-row"},h("button",{type:"button",class:"btn",onclick:function(){var a=ntNotes(pg.id);if(ta.value.trim()){a[i].t=ta.value.slice(0,600);ntSaveNotes(pg.id,a)}edit=-1;paint()}},"Kaydet"),h("button",{type:"button",class:"btn ghost",onclick:function(){edit=-1;paint()}},"Vazgeç")))}
    var body=h("div",{class:"my-t"},n.t);
    return h("div",{class:"my-c my-"+k+" "+c,style:k==="s"?"--r:"+(((i*7)%5)-2)*.6+"deg":null},
      k==="w"?h("span",{class:"nt-wl my-wl"},ntD("excl"),"DİKKAT!"):null,k==="q"?h("span",{class:"my-qm"},ntD("bigq")):null,k==="s"?h("i",{class:"my-tp"}):null,body,n.d?h("small",{class:"my-d"},n.d):null,act)}
  function paint(){
    var arr=ntNotes(pg.id),ta=h("textarea",{class:"my-ta my-"+kind+" "+pen,rows:3,maxlength:600,placeholder:"Kendi notunu yaz: neyi anlamadın, neyi aklında tutmak istiyorsun?","aria-label":"Yeni not",oninput:function(e){draft=e.target.value}});ta.value=draft;
    var kinds=h("div",{class:"my-kinds",role:"group","aria-label":"Not türü"},NT_KINDS.map(function(o){return h("button",{type:"button","aria-pressed":kind===o[0]?"true":"false",onclick:function(){draft=ta.value;kind=o[0];paint()}},o[1])})),
      pens=h("div",{class:"my-pens",role:"group","aria-label":"Kalem rengi"},NT_PENS.map(function(c){return h("button",{type:"button",class:"my-pn "+c,"aria-label":"Kalem: "+NT_PENN[c],"aria-pressed":pen===c?"true":"false",onclick:function(){draft=ta.value;pen=c;paint()}},h("i",null))}));
    var add=h("button",{type:"button",class:"btn",onclick:function(){var t=ta.value.trim();if(!t)return;var a=ntNotes(pg.id),dt=new Date();a.push({k:kind,c:pen,t:t.slice(0,600),d:("0"+dt.getDate()).slice(-2)+"."+("0"+(dt.getMonth()+1)).slice(-2)});ntSaveNotes(pg.id,a);draft="";paint()}},"Deftere ekle");
    box.replaceChildren.apply(box,[h("div",{class:"nt-lb pp"},ntD("pencil"),h("span",null,"Benim notlarım"))].concat(arr.map(card),[h("div",{class:"my-new"},kinds,pens,ta,add)]));
  }
  paint();return box;
}
function ntSyncPack(){var o=ntMine(),out={},n=0;Object.keys(o).forEach(function(k){var a=ntNotes(k);if(a.length&&n<300){out[k]=a;n++}});return out}
function ntMine(){try{var o=JSON.parse(localStorage.getItem("ya_nt")||"null");return o&&typeof o==="object"?o:{}}catch(e){return {}}}
S.nt={tr:"ccna",pid:"",dir:0};
function ntPages(tr){
  var out=[];
  (TMAP[tr]||[]).forEach(function(e,i){var ar="";(STARTER[tr]||[]).forEach(function(r){if(!ar&&e.n.indexOf(r[0])>=0)ar=r[1]});out.push({id:"t:"+tr+":"+i,grp:"Konu defteri"+(ar?" · "+ar:""),title:e.n[0],kind:"t",d:e})});
  try{lessonListFor(tr).list.slice(0,40).forEach(function(l){out.push({id:"l:"+l.id,grp:"Ders notları",title:(l.date&&!l.virtual?String(l.date).slice(5)+" · ":"")+(l.title||"Ders"),kind:"l",d:l})})}catch(e){}
  var A=tr==="eng"?ATLAS_EN:tr==="sec"?ATLAS_SEC:tr==="bk"?ATLAS_BK.concat(ATLAS_SW):(ATLAS_MAP[tr]||[]);
  A.forEach(function(a,i){out.push({id:"a:"+tr+":"+i,grp:"Kavram · "+a.g,title:a.t,kind:"a",d:a})});
  (tr==="ccna"?GM_ORDER.slice(0,12):tr==="eng"?GM_ORDER.slice(12):[]).forEach(function(n){out.push({id:"n:"+n,grp:tr==="ccna"?"Ağ noktaları":"Ofis durumları",title:n,kind:"n",d:n})});
  return out;
}
function renderNotes(){
  var N=S.nt,pages=ntPages(N.tr);
  if(!pages.length)return [h("div",{class:"panel"},h("div",{class:"empty"},"Bu alanda henüz not sayfası yok."))];
  var ix=pages.map(function(p){return p.id}).indexOf(N.pid);if(ix<0){ix=0;N.pid=pages[0].id}
  var pg=pages[ix];
  function go(i){N.dir=i>ix?1:-1;N.pid=pages[Math.max(0,Math.min(pages.length-1,i))].id;draw();window.scrollTo({top:0,behavior:"smooth"})}
  var trk=h("div",{class:"seg",role:"group","aria-label":"Not defteri alanı"},TRK_LIST.map(function(o){return h("button",{type:"button","aria-pressed":N.tr===o[0]?"true":"false",onclick:function(){N.tr=o[0];N.pid="";draw()}},o[1])}));
  var sel=h("select",{"aria-label":"Sayfa seç",onchange:function(e){N.dir=0;N.pid=e.target.value;draw()}});
  var grp=null,og=null;pages.forEach(function(p){if(p.grp!==grp){grp=p.grp;og=h("optgroup",{label:grp});sel.append(og)}og.append(h("option",{value:p.id,selected:p.id===N.pid?true:null},p.title))});
  var nav=h("div",{class:"nt-nav"},h("button",{type:"button",class:"btn ghost",disabled:ix===0,onclick:function(){go(ix-1)}},"‹ Önceki"),h("span",{class:"mono small"},(ix+1)+" / "+pages.length),h("button",{type:"button",class:"btn ghost",disabled:ix===pages.length-1,onclick:function(){go(ix+1)}},"Sonraki ›"));
  var out=[h("div",{class:"panel nt-ctl"},trk,h("div",{class:"small mute"},"Kareli deftere renkli kalemlerle tutulmuş ders notları: soru, harita, karşılaştırma, örnek ve kullanım yeri. Altta kendi notunu da yazabilirsin."),sel,nav),
    h("div",{class:"nb"+(N.dir?" fl"+(N.dir>0?"n":"p"):""),key:pg.id},h("i",{class:"nb-tape"}),ntPageEl(pg)),
    h("div",{class:"nt-nav"},h("button",{type:"button",class:"btn ghost",disabled:ix===0,onclick:function(){go(ix-1)}},"‹ Önceki"),h("span",{class:"mono small"},(ix+1)+" / "+pages.length),h("button",{type:"button",class:"btn ghost",disabled:ix===pages.length-1,onclick:function(){go(ix+1)}},"Sonraki ›"))];
  setTimeout(function(){gmPaintIcons(document)},0);
  return out;
}

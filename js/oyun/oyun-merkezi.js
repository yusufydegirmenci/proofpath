"use strict";
/* ---- v50 oyun merkezi ---- */
var GH_TABS=[["arena","Arena"],["arcade","Arcade"],["dino","Dino"],["fetih","Fetih"],["gorev","Görevler"],["kart","Kartlar"]];
function ghCell(v,k){return h("div",{class:"gh-c"},h("b",null,String(v)),h("small",null,k))}
function gameHub(old,modes,mq){
  var D=dzGet(),dn=gmDay(today()),wk=gmWeek(),ms=gmMissions(dn),okN=ms.filter(function(m){return m.have>=m.need}).length,R=rankInfo();
  var t=S.gtab||"arena";if(t==="rehber")t="arcade";
  var hud=h("div",{class:"gh"},
    h("div",{class:"gh-top"},h("div",{style:"min-width:0"},h("span",{class:"gh-k"},"OYUNCU KARTI"),h("b",{class:"gh-n"},MYN()||"Sen"),h("small",null,R.cur.n+" · "+duTitle(D.r))),
      h("div",{class:"gh-xp"},h("b",null,String(R.xp)),h("small",null,"XP"))),
    h("div",{class:"gh-cells"},[ghCell(D.r,"reyting"),ghCell(okN+"/"+ms.length,"görev"),ghCell(wk.days+"/7","bu hafta"),ghCell(D.st,"seri")]));
  var nav=h("div",{class:"gh-nav",role:"tablist","aria-label":"Oyun bölümleri"},GH_TABS.map(function(o){
    return h("button",{type:"button",role:"tab","aria-selected":t===o[0]?"true":"false",onclick:function(){S.gtab=o[0];draw()}},o[1],o[0]==="gorev"&&okN<ms.length?h("i",{class:"gh-dot"},String(ms.length-okN)):null)}));
  var out=t==="dino"?[nav]:[hud,nav],body=[];
  if(t==="arena")body=duLobby();
  else if(t==="arcade"){
    var cols=["linear-gradient(150deg,#ff7a45,#c2185b)","linear-gradient(150deg,#7c4dff,#2b1166)","linear-gradient(150deg,#00bfa5,#0b5d7a)","linear-gradient(150deg,#1e88e5,#43a047)","linear-gradient(150deg,#ff9800,#e91e63)"],ic=["GÜN","PATRON","TUR","ENG","∞"];
    body.push(h("div",{class:"ar-strip"},h("span",null,"ARCADE"),h("small",null,"Koş, sür, kapılarda soru çöz")));
    var dn_=gmDailyNode(),dc_=gmCards()[dn_];
    body.push(h("div",{class:"gdaily"},h("span",{class:"gh-k"},"GÜNÜN AĞ NOKTASI"),gmCardEl(dn_,dc_,true),h("div",{class:"small mute"},"Oynamadan önce oku. Bu noktadan geçerken doğru cevap verirsen kartın seviyesi yükselir.")));
    setTimeout(function(){gmPaintIcons(document)},0);
    body.push(h("div",{class:"gt-list"},modes.map(function(m,i){
      var done=m[0]==="daily"?num(dn.g_runs)>0:m[0]==="boss"?wk.boss:false;
      return h("button",{type:"button",class:"gt",style:"--gc:"+cols[i%5],disabled:mq<4,onclick:function(){gmStart(m[0])}},
        h("span",{class:"gt-i"},ic[i%5]),h("span",{class:"gt-b"},h("b",null,m[1]),h("small",null,m[2]),h("em",null,m[3])),h("span",{class:"gt-go"},done?"✓":"▶"))})));
    body.push(gmWardrobe());
    body.push(h("details",{class:"gh-set",open:true},h("summary",null,"Oyun ayarları: konu, tür, hız, ses"),old[1]));
    body.push(h("details",{class:"gh-set"},h("summary",null,"Nasıl oynanır?"),old[6]));
  }
  else if(t==="gorev"){
    body.push(h("div",{class:"gq"},h("div",{class:"gq-h"},h("b",null,"Bugünün görevleri"),h("span",{class:"gq-chest"+(okN===ms.length?" open":"")},okN===ms.length?"Sandık açıldı":"Sandık kilitli · "+okN+"/"+ms.length)),
      ms.map(function(m){var ok=m.have>=m.need,pc=Math.min(100,Math.round(m.have/m.need*100));return h("div",{class:"gq-m"+(ok?" ok":"")},h("div",{class:"gq-t"},h("span",null,m.t),h("small",null,Math.min(m.have,m.need)+"/"+m.need)),h("span",{class:"gq-bar"},h("i",{style:"width:"+pc+"%"})))})));
    body.push(gmSeasonEl());body.push(old[5]);body.push(old[2]);
  }
  else if(t==="kart")body=gmCardsTab();
  else if(t==="dino")body=renderDino();
  else if(t==="fetih")body=S.fk?fkScreen():S.fkPrep?fkPrepScreen():fkHub();
  if((t==="arena"||t==="arcade"||t==="dino"||(t==="fetih"&&!S.fk)))body.push(fbEl(t));
  if(t==="gorev")body.push(fbSummary());
  return out.concat(body);
}
var FB_KEY="ya_fb",FB_N={arena:"Arena",arcade:"Arcade",dino:"Dino",fetih:"Fetih"};
function fbLoad(){try{return JSON.parse(localStorage.getItem(FB_KEY)||"{}")||{}}catch(e){return {}}}
function fbSave(o){try{localStorage.setItem(FB_KEY,JSON.stringify(o))}catch(e){}}
function fbCounts(t){var o=fbLoad()[t]||{};return "Eğlenceli "+num(o.g)+" · Fena değil "+num(o.o)+" · Sıkıcı "+num(o.b)}
function fbEl(t){
  var cnt=h("div",{class:"small mute"},fbCounts(t)),ta=h("textarea",{rows:2,maxlength:200,placeholder:"Neyi değiştirelim? (isteğe bağlı)","aria-label":"Geri bildirim notu"}),msg=h("div",{class:"small",role:"status"});
  ta.value=(fbLoad()[t]||{}).note||"";
  function vote(k){var o=fbLoad(),x=o[t]||{};x[k]=num(x[k])+1;o[t]=x;fbSave(o);cnt.textContent=fbCounts(t);msg.textContent="Kaydedildi."}
  return h("details",{class:"panel fb"},h("summary",null,"Bu bölümü nasıl buldun?"),
    h("div",{class:"row",style:"flex-wrap:wrap"},[["g","😀 Eğlenceli"],["o","😐 Fena değil"],["b","😞 Sıkıcı"]].map(function(a){return h("button",{type:"button",class:"btn ghost",onclick:function(){vote(a[0])}},a[1])})),
    ta,h("div",{class:"row"},h("button",{type:"button",class:"btn ghost",onclick:function(){var o=fbLoad(),x=o[t]||{};x.note=ta.value.slice(0,200);o[t]=x;fbSave(o);msg.textContent="Not kaydedildi."}},"Notu kaydet"),msg),cnt);
}
function fbSummary(){
  var o=fbLoad(),keys=Object.keys(FB_N);
  return h("div",{class:"panel"},h("h3",null,"Oyun geri bildirimlerin"),
    keys.some(function(k){return o[k]})?h("ul",{class:"small"},keys.filter(function(k){return o[k]}).map(function(k){return h("li",null,h("b",null,FB_N[k]+": "),fbCounts(k)+(o[k].note?" · Not: "+o[k].note:""))})):h("div",{class:"small mute"},"Oyunların altındaki \"Bu bölümü nasıl buldun?\" kutusundan oy ver; burada toplanır. Bu bilgiler yalnız bu cihazda durur."));
}

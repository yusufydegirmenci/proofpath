"use strict";
function atlasMatch(it){
  var q=S.at.q.trim().toLowerCase();
  if(S.at.g&&it.g!==S.at.g)return false;
  if(!q)return true;
  return (it.t+" "+it.tr+" "+it.d+" "+it.g).toLowerCase().indexOf(q)>=0;
}
function atlasCard(tr,it){
  var k=atlasKey(tr,it),kn=atlasKnown()[k],open=S.at.open===k,eng=tr==="en";
  var head=h("button",{type:"button",class:"at-h","aria-expanded":open?"true":"false",onclick:function(){S.at.open=open?null:k;draw()}},
    h("span",{class:"at-t"},h("b",null,it.t),h("span",{class:"small mute"},it.tr)),
    h("span",{class:"at-m"},kn===2?h("span",{class:"pill ok"},"anladım"):kn===1?h("span",{class:"pill"},"tekrar"):null,h("span",{class:"pill"+(it.l===1?"":" eng")},it.l===1?"temel":"staj")));
  var c=h("div",{class:"at-c"+(open?" open":"")},head,
    h("div",{class:"small",style:"padding:0 14px 12px"},it.d));
  if(open){
    c.append(h("div",{class:"at-b"},
      h("div",{class:"lbox"+(eng?" eng":"")},h("div",{class:"label"},"Benzetme"),h("p",null,it.b)),
      h("div",null,h("div",{class:"label",style:"margin-bottom:6px"},eng?"Örnek":"Kod / örnek"),h("pre",{class:"lcode"},it.x)),
      h("div",{class:"lbox"},h("div",{class:"label"},eng?"Toplantıda / mülakatta söyle":"Mülakatta böyle söyle"),h("p",{style:"font-weight:600"},it.s),
        h("button",{class:"btn ghost",type:"button",onclick:function(){speak(it.s)}},"Sesli oku")),
      h("div",{class:"lbox warn"},h("div",{class:"label"},"Sık yapılan hata"),h("p",null,it.e)),
      cptUses(tr,it),
      h("div",null,h("div",{class:"label",style:"margin-bottom:6px"},"Kendini dene"),h("p",{style:"margin:0 0 8px"},it.q),
        revBtn("at:"+k,"Cevabı göster",h("p",{style:"margin:0"},it.a))),
      h("div",{class:"row"},
        h("button",{class:"btn"+(kn===2?"":" ghost"),type:"button",onclick:function(){atlasSave(k,2);if(kn!==2){var pg=prog();setProg({a_atlas:num(pg.a_atlas)+1})}draw()}},"Anladım"),
        h("button",{class:"btn"+(kn===1?"":" ghost"),type:"button",onclick:function(){atlasSave(k,1);draw()}},"Tekrar edeceğim"))));
  }
  return c;
}
function atlasCards(tr){
  var L=atlasList(tr).filter(atlasMatch);
  if(!L.length)return [h("div",{class:"empty"},"Eşleşen kavram yok. Aramayı kısalt veya grubu 'Hepsi' yap.")];
  return L.map(function(it){return atlasCard(tr,it)});
}
function renderAtlas(){
  var tr=S.at.tr,L=atlasList(tr),kn=atlasKnown(),done=L.filter(function(i){return kn[atlasKey(tr,i)]===2}).length;
  var groups=[];L.forEach(function(i){if(groups.indexOf(i.g)<0)groups.push(i.g)});
  var day=L[dayNum(today())%L.length];
  var seg=h("div",{class:"seg",role:"group","aria-label":"Alan"},[["ba","Başlangıç"],["ccna","CCNA"],["net","Network"],["sw","Yazılım & Test"],["en","İngilizce"],["sec","Siber"],["bk","Backend"],["dev","DevOps"],["qa","Test Uzmanı"]].map(function(o){
    return h("button",{type:"button","aria-pressed":tr===o[0]?"true":"false",onclick:function(){S.at.tr=o[0];S.at.g="";S.at.open=null;S.at.q="";draw()}},o[1])}));
  var listBox=h("div",{class:"at-list"},atlasCards(tr));
  var inp=h("input",{type:"search",class:"at-q",placeholder:tr==="ba"?"Kavram ara: dosya, klasör, e-posta...":tr==="sec"?"Kavram ara: hash, MFA, SIEM...":tr==="bk"?"Kavram ara: IAM, Lambda, idempotent...":tr==="ccna"?"Kavram ara: VLAN, OSPF, NAT...":tr==="net"?"Kavram ara: DNS, MTU, PoE...":tr==="dev"?"Kavram ara: pod, pipeline, image...":tr==="qa"?"Kavram ara: regresyon, sınır değer...":"Kavram ara: commit, API, present...","aria-label":"Kavram ara",value:S.at.q,oninput:function(e){S.at.q=e.target.value;listBox.replaceChildren.apply(listBox,atlasCards(tr))}});
  var out=[h("div",{class:"panel"},h("div",{class:"label"},"Kavram Atlası"),h("h2",null,tr==="ba"?"Sıfırdan başlayanlar atlası":tr==="en"?"İş İngilizcesi atlası":tr==="sec"?"Siber güvenlik atlası":tr==="bk"?"Backend atlası":tr==="ccna"?"CCNA ağ atlası":tr==="net"?"Network atlası":tr==="dev"?"DevOps atlası":tr==="qa"?"Test uzmanı atlası":"Stajyerin yazılım ve test atlası"),
    h("div",{class:"small mute"},"Her kavramda: tanım, günlük benzetme, örnek, mülakatta söylenişi, sık hata ve küçük bir soru var. Aç, oku, soruyu cevapla, işaretle."),seg,
    h("div",{style:"display:flex;justify-content:space-between;gap:8px;align-items:center;flex-wrap:wrap"},h("span",{class:"pill ok"},done+" / "+L.length+" anladım"),h("span",{class:"small mute"},"İlerlemen hesabına kaydedilir, her cihazda aynı gelir")),
    h("div",{class:"xpbar"},h("i",{style:"width:"+Math.round(done/L.length*100)+"%"}))),
    h("div",{class:"panel"},h("div",{class:"label"},"Günün kavramı"),h("h2",null,day.t),h("div",{class:"small"},day.d),
      h("div",{class:"row"},h("button",{class:"btn",type:"button",onclick:function(){S.at.open=atlasKey(tr,day);S.at.g="";S.at.q="";draw()}},"Aç ve öğren"))),
    h("div",{class:"panel"},inp,h("div",{class:"lscroll",style:"margin-top:8px"},[""].concat(groups).map(function(g){
      return h("button",{type:"button",class:"opt","aria-pressed":S.at.g===g?"true":"false",onclick:function(){S.at.g=g;draw()}},g||"Hepsi")}))),
    listBox];
  return out;
}

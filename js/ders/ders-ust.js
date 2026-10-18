"use strict";
/* ---- v54: küçük renkli geçit şeridi ---- */
function miniTiles(list){
  return h("div",{class:"bg-grid mini"},list.map(function(x){return h("button",{type:"button",class:"bg-t "+x.c,onclick:x.go},h("small",null,x.k),h("b",null,x.t),h("span",null,x.s))}));
}
function renderLessonTop(){
  if(S.les.room){var rr0=renderLessonRoom();if(rr0)return rr0}
  var vw=S.les.view==="atlas"?"atlas":S.les.view==="not"?"not":S.les.view==="nw"?"nw":S.les.view==="lv"?"lv":"ders";
  if(vw==="lv")return renderPe();
  var top=h("div",{class:"panel",style:"padding:10px"},h("div",{class:"seg",role:"group","aria-label":"Ders bölümü"},[["ders","Dersler"],["nw","Animasyon"],["atlas","Kavram Atlası"],["not","Notlar"]].map(function(o){
    return h("button",{type:"button","aria-pressed":o[0]===vw?"true":"false",onclick:function(){S.les.view=o[0];draw()}},o[1])})));
  var mt=miniTiles([{c:"bg-c",k:"KAVRAMLAR",t:"Kavram Atlası",s:"Örnek ve mini sorularla",go:function(){S.les.view="atlas";draw()}},{c:"bg-n",k:"DEFTER",t:"Ders Notları",s:"Renkli kalemli el yazısı",go:function(){S.les.view="not";draw()}},{c:"bg-c",k:"ANİMASYON",t:"Animasyon Atölyesi",s:"Her dersin hareketli sahneleri",go:function(){S.les.view="nw";draw()}},{c:"bg-n",k:"KADEME",t:"Seviye sınavı",s:"Seviyeni ölç",go:function(){goTab("ayar")}}]);
  var gu=vw==="ders"&&typeof gbGuncellik==="function"?gbGuncellik():null;
  return [mt,top].concat(gu?[gu]:[]).concat(vw==="not"?renderNotes():vw==="atlas"?renderAtlas():vw==="nw"?renderNw():renderLessonBase());
}

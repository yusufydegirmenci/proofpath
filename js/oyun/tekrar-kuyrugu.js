"use strict";
/* ---- v55 oyundan tekrar kuyruğu (Leitner) ---- */
var GQ_KEY="ya_gq",GQ_STEPS=[1,3,7,14];
function gqLoad(){try{var o=JSON.parse(localStorage.getItem(GQ_KEY)||"null");return o&&typeof o==="object"?o:{}}catch(e){return {}}}
function gqSave(o){try{localStorage.setItem(GQ_KEY,JSON.stringify(o))}catch(e){}try{syncPush()}catch(e){}}
function gqMark(list){
  /* list: [[k,ok]] */
  var G=gqLoad(),ch=false,td=today();
  list.forEach(function(p){var k=p[0],ok=p[1];if(!/^qb\d+$/.test(k))return;var e=G[k];
    if(!ok){G[k]={s:0,due:addDays(td,1),t:Date.now()};ch=true}
    else if(e&&e.s<9){e.s++;if(e.s>=GQ_STEPS.length){e.s=9;e.due="9999-12-31"}else e.due=addDays(td,GQ_STEPS[e.s]);e.t=Date.now();ch=true}});
  if(ch)gqSave(G);
}
function gqDue(){var G=gqLoad(),td=today();return Object.keys(G).filter(function(k){return G[k].s<9&&String(G[k].due)<=td&&QB[+k.slice(2)]}).sort(function(a,b){return String(G[a].due).localeCompare(String(G[b].due))})}
function gqPanel(){
  var due=gqDue();if(!due.length)return null;
  var A=S.gqa=S.gqa||{},show=due.slice(0,3);
  return h("div",{class:"panel gqp"},h("div",{style:"display:flex;justify-content:space-between;gap:8px;align-items:center;flex-wrap:wrap"},h("div",null,h("div",{class:"label"},"Oyundan tekrar"),h("h2",{style:"margin:2px 0 0"},due.length+" soru seni bekliyor")),h("span",{class:"pill"},"1-3-7-14 gün")),
    h("div",{class:"small mute"},"Oyunda kaçırdığın sorular birkaç gün sonra buraya döner. Doğru bilirsen aralık uzar, yanlış bilirsen başa döner."),
    show.map(function(k){var i=+k.slice(2),q=gmQB(i,rngf(i*13+dayNum(today())),false),done=A[k]!=null,pick=A[k];
      return h("div",{class:"lbox"},h("p",{style:"margin:0 0 6px;font-weight:600"},q.q),
        h("div",{class:"gqo"},q.o.map(function(t,j){return h("button",{type:"button",class:"btn ghost"+(done?(j===q.a?" okb":j===pick?" badb":""):""),disabled:done,onclick:function(){A[k]=j;gqMark([[k,j===q.a]]);draw()}},t)})),
        done?h("div",{class:"small",style:"margin-top:6px"},h("b",null,pick===q.a?"Doğru. ":"Doğrusu: "+q.o[q.a]+". "),q.w||""):null)}));
}

"use strict";
S.at={tr:"sw",q:"",g:"",open:null,rev:{}};
function atlasKnown(){try{return JSON.parse(localStorage.getItem("ya_atlas")||"{}")||{}}catch(e){return {}}}
function atlasSave(k,v){var o=atlasKnown();if(v)o[k]=v;else delete o[k];try{localStorage.setItem("ya_atlas",JSON.stringify(o))}catch(e){}syncPush()}

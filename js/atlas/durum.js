"use strict";
/* ALAN: Atlas durumu ve bilinen terim kaydı.
   NE YAPAR: S.at başlangıç durumunu kurar; atlasKnown/atlasSave bilinen terimleri okur/yazar ve syncPush çağırır.
   SORUN OLURSA: localStorage ya_atlas; S ve syncPush önceden tanımlı olmalı; atlas-1.js sonrası, atlas-2.js öncesi yüklenir. Sıfırlama (js/seviye/seviye-sinavi.js RS_LS) ya_atlas'ı da siler.
   YENİ ÖZELLİK: Yeni atlas durum alanı S.at'a eklenir; tests/h66.js ve h83.js güncellenir. */
S.at={tr:"sw",q:"",g:"",open:null,rev:{}};
function atlasKnown(){try{return JSON.parse(localStorage.getItem("ya_atlas")||"{}")||{}}catch(e){return {}}}
function atlasSave(k,v){var o=atlasKnown();if(v)o[k]=v;else delete o[k];try{localStorage.setItem("ya_atlas",JSON.stringify(o))}catch(e){}syncPush()}

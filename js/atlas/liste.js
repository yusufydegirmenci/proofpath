"use strict";
/* ALAN: Atlas terim listesi seçimi ve anahtar üretimi.
   NE YAPAR: atlasList yol koduna göre ATLAS_MAP listesini (yoksa ATLAS_SW) verir; atlasKey yol:terim anahtarı üretir.
   SORUN OLURSA: ATLAS_MAP js/veri/atlas-2.js'te tanımlanır, bu dosya ondan sonra yüklenmeli; anahtar biçimi değişirse ya_atlas'taki eski kayıtlar eşleşmez.
   YENİ ÖZELLİK: Yeni yol atlası ATLAS_MAP'e eklenir (js/veri/atlas-2.js); tests/h66.js, t60a_tracks.js güncellenir. */
function atlasList(tr){return ATLAS_MAP[tr]||ATLAS_SW}
function atlasKey(tr,t){return tr+":"+t.t}

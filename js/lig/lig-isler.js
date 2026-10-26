"use strict";
/* ALAN: Lig sekmesi · iş havuzu. NE YAPAR: S.pool durumu, ilan puanlama (poolScore), yaş etiketi (poolAge) ve renderJobsPool ekranı.
   SORUN OLURSA: S.pool/S.pq bu dosyanın başında açılır; lig-profil.js'ten sonra yüklenmeli (sira.js denetler). YENİ ÖZELLİK: ilan alanı ekleyeceksen poolScore'u ve renderJobsPool'u birlikte güncelle. */
S.pool=[];S.pq={city:"",remote:false};
function poolScore(x,R){
  var s=(String(x.title||"")+" "+String(x.skills||"")).toLowerCase(),hit=0,kw=R.kw||[];
  kw.forEach(function(k){if(s.indexOf(k)>=0)hit++});
  var own=(R.sk||[]).filter(function(k){return s.indexOf(String(k).toLowerCase())>=0});
  var role=x.role===R.id?40:0;
  var sc=Math.min(100,role+Math.min(3,hit)*12+Math.min(4,own.length)*6+(role?evBonus(R):0));
  var lv=String(x.level||"").toLowerCase();if(/senior|kıdemli|lead/.test(lv+" "+String(x.title||"").toLowerCase()))sc=0;
  return {sc:sc,own:own};
}
function poolAge(x){var d=String(x.date||"").slice(0,10);if(!/^\d{4}-\d\d-\d\d$/.test(d))return 99;return Math.max(0,Math.round((new Date(today())-new Date(d))/864e5))}
function renderJobsPool(){
  var R=jrRole(),all=S.pool.filter(function(x){return x&&x.title&&safeUrl(x.url)&&poolAge(x)<=21});
  var seg=h("div",{class:"seg",role:"group","aria-label":"Hedef rol"},JR.map(function(o){return h("button",{type:"button","aria-pressed":S.jr.role===o.id?"true":"false",onclick:function(){S.jr.role=o.id;draw()}},o.name)}));
  var cities=[];all.forEach(function(x){var c=String(x.city||"").trim();if(c&&cities.indexOf(c)<0)cities.push(c)});cities.sort();
  var L=all.map(function(x){var m=poolScore(x,R);return {x:x,m:m}}).filter(function(o){return o.m.sc>=30&&(!S.pq.city||String(o.x.city||"").trim()===S.pq.city)&&(!S.pq.remote||o.x.remote===true)});
  L.sort(function(a,b){return b.m.sc-a.m.sc||poolAge(a.x)-poolAge(b.x)});
  var out=[h("div",{class:"panel"},h("div",{class:"label"},"İlanlar"),h("h2",null,"Rolüne uyan güncel ilanlar"),seg,
    cities.length?h("div",{class:"lscroll",style:"margin-top:8px"},[""].concat(cities).map(function(c){return h("button",{type:"button",class:"opt","aria-pressed":S.pq.city===c?"true":"false",onclick:function(){S.pq.city=c;draw()}},c||"Türkiye geneli")}).concat([h("button",{type:"button",class:"opt","aria-pressed":S.pq.remote?"true":"false",onclick:function(){S.pq.remote=!S.pq.remote;draw()}},"Uzaktan")])):null,
    h("div",{class:"small mute",style:"margin-top:8px"},"İlanlar her gün otomatik toplanır ve herkes için aynıdır; uyum puanı seçtiğin role ve ilandaki becerilere göre bu cihazda hesaplanır. Başvurmadan önce ilanı kendin doğrula."))];
  if(!all.length)out.push(h("div",{class:"panel"},h("div",{class:"empty"},"İlan havuzu henüz boş. Günlük toplama görevi çalıştıkça burada ilanlar birikecek.")));
  else if(!L.length)out.push(h("div",{class:"panel"},h("div",{class:"empty"},"Bu filtreyle uyan ilan yok. Şehri ya da rolü değiştir.")));
  else out.push(h("div",{class:"panel"},L.slice(0,20).map(function(o){var x=o.x,u=safeUrl(x.url),age=poolAge(x);
    var miss=String(x.skills||"").split(/[,;]+/).map(function(z){return z.trim()}).filter(function(z){return z&&!o.m.own.some(function(k){return z.toLowerCase().indexOf(String(k).toLowerCase())>=0})}).slice(0,3);
    return h("div",{class:"lbox"},h("div",{style:"display:flex;justify-content:space-between;gap:8px;align-items:flex-start"},h("p",{style:"margin:0;font-weight:600"},String(x.title).slice(0,90)),h("span",{class:"pill"},"%"+o.m.sc)),
      h("p",{class:"small mute",style:"margin:2px 0 0"},[x.company,x.city,x.remote?"uzaktan":"",x.level,age===0?"bugün":age+" gün önce"].filter(Boolean).join(" · ").slice(0,140)),
      miss.length?h("p",{class:"small",style:"margin:4px 0 0"},"Bakılacak beceriler: "+miss.join(", ")):null,
      h("a",{href:u,target:"_blank",rel:"noopener noreferrer"},"İlana git"))})));
  return out;
}
/* v35 gazete: haberler ve etkinlikler (herkes okur, görev yazar) */

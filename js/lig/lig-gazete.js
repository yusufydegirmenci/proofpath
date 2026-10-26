"use strict";
/* ALAN: Lig sekmesi · gazete. NE YAPAR: S.gz durumu, etiketler (GZ_TAGS), temizleme (gzClean), takvime ekleme (gzAddCal), kart ve ekran (gzCard, renderGazete).
   SORUN OLURSA: dış kaynaklı metin gzClean'den geçmeden DOM'a yazılmamalı (XSS). YENİ ÖZELLİK: yeni etiket → GZ_TAGS + gzCard; yeni görünüm → S.gzq.view. */
S.gz=[];S.gzq={tag:"",view:"haber",msg:""};
var GZ_TAGS=[["","Hepsi"],["qa","Test/QA"],["bk","Backend"],["sec","Siber"],["ai","Yapay zeka"],["cloud","Bulut"],["ag","Ağ/BT"],["kariyer","Kariyer"]];
function gzClean(d){
  if(!d||typeof d!=="object")return null;
  var items=Array.isArray(d.items)?d.items:[];
  var out=[];items.slice(0,60).forEach(function(x){
    if(!x||typeof x!=="object"||!x.title)return;
    var u=safeUrl(x.url);if(!u)return;
    out.push({kind:x.kind==="etkinlik"?"etkinlik":"haber",title:String(x.title).slice(0,160),source:String(x.source||"").slice(0,60),url:u,summary:String(x.summary||"").slice(0,420),why:String(x.why||"").slice(0,320),tag:String(x.tag||"").slice(0,12),when:/^\d{4}-\d\d-\d\d/.test(String(x.when||""))?String(x.when).slice(0,16):"",where:String(x.where||"").slice(0,80),talk:String(x.talk||"").slice(0,420),cost:String(x.cost||"").slice(0,40),lang:String(x.lang||"").slice(0,4)});
  });
  return {id:String(d.id||""),date:String(d.date||d.id||"").slice(0,10),headline:String(d.headline||"").slice(0,200),items:out};
}
function gzEvents(){
  var seen={},o=[];
  S.gz.slice().sort(function(a,b){return b.date.localeCompare(a.date)}).slice(0,14).forEach(function(e){e.items.forEach(function(x){if(x.kind!=="etkinlik"||seen[x.url])return;seen[x.url]=1;o.push(x)})});
  return o;
}
function gzDay(s){return String(s||"").slice(0,10)}
function gzAddCal(x){
  if(!S.mcp||!S.canWrite||S.guest||!x.when){return}
  var d=gzDay(x.when),hm=/T(\d\d:\d\d)/.exec(x.when),st=hm?hm[1]:"10:00",eh=String((+st.slice(0,2)+2)%24).padStart(2,"0");
  S.gzq.msg="Ekleniyor";draw();
  S.mcp.callTool("Google Calendar","create_event",{summary:x.title.slice(0,100),startTime:d+"T"+st+":00",endTime:(+eh<+st.slice(0,2)?(function(){var n=new Date(d+"T12:00:00");n.setDate(n.getDate()+1);return n.getFullYear()+"-"+String(n.getMonth()+1).padStart(2,"0")+"-"+String(n.getDate()).padStart(2,"0")})():d)+"T"+eh+st.slice(2)+":00",timeZone:"Europe/Istanbul",description:(x.summary||"")+" "+x.url,location:x.where||"",useDefaultReminders:false,overrideReminders:[{method:"popup",minutes:60}]})
   .then(function(){S.gzq.msg="Takvime eklendi.";draw()},function(e){var c=e&&e.code;S.gzq.msg=(c==="not_in_manifest"||c==="approval_required")?"Takvim izni verilmedi.":"Eklenemedi.";draw()});
}
function gzCard(x,ev){
  var up=ev&&x.when&&gzDay(x.when)>=today(),past=ev&&x.when&&gzDay(x.when)<today();
  return h("div",{class:"lbox"},
    h("div",{style:"display:flex;justify-content:space-between;gap:8px;align-items:flex-start"},h("p",{style:"margin:0;font-weight:600"},x.title),x.tag?h("span",{class:"pill"},(GZ_TAGS.filter(function(t){return t[0]===x.tag})[0]||[0,x.tag])[1]):null),
    ev?h("p",{class:"small",style:"margin:4px 0 0;font-weight:600"},[x.when?gzDay(x.when)+(/T/.test(x.when)?" "+x.when.slice(11,16):""):"tarih açıklanmadı",x.where,x.cost].filter(Boolean).join(" · ")):null,
    x.summary?h("p",{class:"small",style:"margin:4px 0 0"},x.summary):null,
    ev&&x.talk?h("p",{class:"small",style:"margin:4px 0 0"},h("b",null,past?"Neler anlatıldı: ":"Neler anlatılacak: "),x.talk):null,
    x.why?h("p",{class:"small",style:"margin:4px 0 0"},h("b",null,"Neden önemli: "),x.why):null,
    h("div",{class:"row",style:"margin-top:6px"},h("a",{href:x.url,target:"_blank",rel:"noopener noreferrer",onclick:function(){if(!num(prog().gz_n))setProg({gz_n:1})}},ev?"Etkinlik sayfası":"Haberi oku"+(x.source?" · "+x.source:"")),
      up&&S.mcp&&S.canWrite&&!S.guest?h("button",{class:"btn ghost",type:"button",onclick:function(){gzAddCal(x)}},"Takvime ekle"):null));
}
function renderGazete(){
  var Q=S.gzq,eds=S.gz.slice().sort(function(a,b){return b.date.localeCompare(a.date)}),cur=eds[0];
  var seg=h("div",{class:"seg",role:"group","aria-label":"Bölüm"},[["haber","Haberler"],["etkinlik","Etkinlikler"]].map(function(o){return h("button",{type:"button","aria-pressed":Q.view===o[0]?"true":"false",onclick:function(){Q.view=o[0];Q.msg="";draw()}},o[1])}));
  var tags=h("div",{class:"lscroll",style:"margin-top:8px"},GZ_TAGS.map(function(t){return h("button",{type:"button",class:"opt","aria-pressed":Q.tag===t[0]?"true":"false",onclick:function(){Q.tag=t[0];draw()}},t[1])}));
  var out=[h("div",{class:"panel"},h("div",{class:"label"},"Gazete"+(cur?" · "+cur.date:"")),h("h2",null,cur&&cur.headline?cur.headline:"Yazılım dünyasından günün özeti"),seg,tags,
    h("div",{class:"small mute",style:"margin-top:8px"},"Haberler ve etkinlikler her sabah otomatik derlenir; bağlantılar asıl kaynağa gider. Yazılar özet ve yorumdur, kararı vermeden önce kaynağı oku."),
    Q.msg?h("div",{class:"small"},Q.msg):null)];
  if(!cur){out.push(h("div",{class:"panel"},h("div",{class:"empty"},"İlk sayı henüz hazır değil. Günlük derleme görevi çalışınca burada çıkacak.")));return out}
  if(Q.view==="haber"){
    var L=cur.items.filter(function(x){return x.kind==="haber"&&(!Q.tag||x.tag===Q.tag)});
    out.push(L.length?h("div",{class:"panel"},L.map(function(x){return gzCard(x,false)})):h("div",{class:"panel"},h("div",{class:"empty"},"Bu başlıkta bugün haber yok.")));
  }else{
    var E=gzEvents().filter(function(x){return !Q.tag||x.tag===Q.tag}),up=E.filter(function(x){return !x.when||gzDay(x.when)>=today()}).sort(function(a,b){return String(a.when||"9").localeCompare(String(b.when||"9"))}),pa=E.filter(function(x){return x.when&&gzDay(x.when)<today()}).sort(function(a,b){return b.when.localeCompare(a.when)});
    out.push(h("div",{class:"panel"},h("h3",null,"Yaklaşanlar"),up.length?up.map(function(x){return gzCard(x,true)}):h("div",{class:"empty"},"Yaklaşan etkinlik bulunamadı.")));
    if(pa.length)out.push(h("div",{class:"panel"},h("h3",null,"Geçenler ve anlatılanlar"),pa.slice(0,8).map(function(x){return gzCard(x,true)})));
  }
  return out;
}

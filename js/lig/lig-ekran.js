"use strict";
/* ALAN: Lig sekmesi · giriş ekranı. NE YAPAR: renderLeague (sekmeyi yönlendirir: bugun/sira/arkadas/ilan/gazete/profil görünümleri), renderInvite (davet) ve leagueTeaser (Bugün sekmesindeki lig özeti).
   SORUN OLURSA: goTab("lig") görünümü S.lg.view ile seçilir; yeni görünüm eklerken burada yönlendirmeyi ve ilgili render işlevini birlikte ekle. */
function renderLeague(){
  var L=S.lg,out=[];
  if(S.guest&&!L._g){L._g=1}
  out.push(seg([["bugun","Bugün"],["sira","Sıralama"],["arkadas","Arkadaşlar"],["ilan","İlanlar"],["gazete","Gazete"],["profil","Profilim"]],L.view,function(v){L.view=v;L.cmp=null}));
  if(S.guest&&L.view==="bugun"&&!(myLeague()))out.push(h("div",{class:"panel"},h("div",{class:"label"},"Misafir"),h("h2",null,PP_MARKA.ad+" Ligi'ne hoş geldin"),
    h("div",{class:"small mute"},"Önce Profilim'den başlangıç seviyeni ve haftalık hedefini seç, sonra günün 5 sorusunu çöz. Puanlar herkes için adil hesaplanır.")));
  if(L.view==="bugun")out=out.concat(renderChallenge());
  else if(L.view==="sira"){out=out.concat(renderBoard());var iv=renderInvite();if(iv)out.push(iv)}
  else if(L.view==="arkadas")out=out.concat(renderFriends());
  else if(L.view==="ilan")out=out.concat(renderJobsPool());
  else if(L.view==="gazete")out=out.concat(renderGazete());
  else out=out.concat(renderProfile());
  return out;
}
function renderInvite(){
  if(S.guest)return null;
  return h("div",{class:"panel"},h("div",{class:"label"},"Arkadaş ekle"),h("h2",null,"Birlikte çalışın"),
    h("div",{class:"small mute"},"1) Sayfanın Paylaş menüsünü aç. 2) Arkadaşını e-postasıyla ekle ve \"Contributor\" yetkisi ver. 3) Linki açınca sadece Lig'i görür; senin dersin, ticket ve notların ona kapalıdır. Tanımadığın birini ekleme."),
    h("div",{class:"small mute"},"Sadece Görüntüleyici olan sıralamayı görür ama puan yazamaz."));
}
function leagueTeaser(){
  if(S.guest||!S.me)return null;
  var s=lgStats(myLeague()),n=num(s.today.tot),TN=qsFor(today(),myTier()).length||num(s.today.n)||5,rows=S.league.map(function(x){return lgStats(x).fair}).filter(function(v){return v!=null}).sort(function(a,b){return b-a}),pos=s.fair!=null?rows.indexOf(s.fair)+1:0;
  return h("div",{class:"panel lgt"},h("div",{class:"lgt-l"},h("div",{class:"label"},"Lig"),h("b",null,n>=TN?"Bugünkü tur tamam · "+s.today.ok+"/"+TN:"Günün "+TN+" sorusu: "+n+"/"+TN),
      h("small",null,S.league.length>1&&pos?("Adil sıran: "+pos+". / "+rows.length):("Lv"+(s.lv+1)+" "+s.lvName+" · "+s.tot+" puan"))),
    h("button",{class:"btn"+(n>=TN?" ghost":""),type:"button",onclick:function(){S.lg.view=n>=TN?"sira":"bugun";goTab("lig")}},n>=TN?"Sıralama":"Çöz"));
}

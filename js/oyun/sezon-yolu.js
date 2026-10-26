"use strict";
/* ALAN: Oyun sekmesi, Görevler bölümü, haftalık sezon yolu. NE YAPAR: gmSeasonPts haftalık puanı doğru cevap, oynanan gün, patron galibiyeti ve yeni kartlardan hesaplar; gmSeasonEl unvan basamaklarını (GM_SEASON) ilerleme çubuğuyla çizer.
   SORUN OLURSA: Kendi deposu yok; gmWeek (ag-kosusu.js) ve gmCards (bilgi-kartlari.js) verisini okur, ikisinden sonra yüklenmeli. Panel oyun-merkezi.js gorev sekmesinden çağrılır. Yükleme sırası tests/sira.js ile denetlenir.
   YENİ ÖZELLİK: Yeni basamak: GM_SEASON eşik/unvan çifti; puan formülü gmSeasonPts. Özel test yok; tests/hesaplar.js gmWeek hesabını kapsar, formül değişirse oraya ekleyin. */
/* ---- v55 haftalık sezon yolu ---- */
var GM_SEASON=[[25,"Çaylak Kurye"],[60,"Hat Teknisyeni"],[110,"Ağ Operatörü"],[170,"Güvenlik Bekçisi"],[240,"Haftanın Kuryesi"]];
function gmSeasonPts(){
  var wk=gmWeek(),C=gmCards(),w0=wk.dates[0],cards=Object.keys(C).filter(function(k){return C[k].d&&String(C[k].d)>=w0}).length;
  return {pts:wk.ok+wk.days*5+(wk.boss?25:0)+cards*8,ok:wk.ok,days:wk.days,boss:wk.boss,cards:cards};
}
function gmSeasonEl(){
  var P=gmSeasonPts(),max=GM_SEASON[GM_SEASON.length-1][0],nx=GM_SEASON.filter(function(x){return P.pts<x[0]})[0],cur=GM_SEASON.filter(function(x){return P.pts>=x[0]}).pop();
  return h("div",{class:"gq gsn"},h("div",{class:"gq-h"},h("b",null,"Haftalık sezon yolu"),h("span",{class:"gq-chest"+(!nx?" open":"")},P.pts+" puan")),
    h("div",{class:"gsn-t"},h("span",{class:"gsn-l"},h("i",{style:"width:"+Math.min(100,P.pts/max*100)+"%"})),GM_SEASON.map(function(x){var on=P.pts>=x[0];return h("span",{class:"gsn-n"+(on?" on":""),style:"left:"+(x[0]/max*100)+"%"},on?"✓":"")})),
    h("div",{class:"gsn-k"},GM_SEASON.map(function(x){return h("small",{class:P.pts>=x[0]?"on":""},x[0]+" · "+x[1])})),
    h("div",{class:"small mute"},cur?"Şu anki unvanın: "+cur[1]+".":"İlk basamağa "+(GM_SEASON[0][0]-P.pts)+" puan var.",nx?" Sonraki: "+nx[1]+" ("+(nx[0]-P.pts)+" puan kaldı).":" Bu haftanın zirvesindesin."),
    h("div",{class:"small mute"},"Puan: doğru cevap ("+P.ok+") + oynadığın gün ×5 ("+P.days+") + patron galibiyeti 25 ("+(P.boss?"✓":"–")+") + yeni kart ×8 ("+P.cards+"). Her hafta sıfırlanır."));
}

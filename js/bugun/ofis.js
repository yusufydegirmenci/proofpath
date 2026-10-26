"use strict";
/* ALAN: Ofis sekmesi (renderOffice), hikâye ve müdür raporu. NE YAPAR: Sezon/bölüm hikâyesini (S.story) ve müdür panelini gösterir; kurucu olmayan hesapta hikâye yoksa açıklayıcı boş durum çizer.
   SORUN OLURSA: renderManager js/masa/masa-mudur.js'te, S.story baslat.js'te story/main belgesinden dinlenir; S.nonOwner dalı ayrıdır.
   YENİ ÖZELLİK: Yeni ofis bölümü renderOffice çıktı listesine eklenir; özel test yok, tests/run-all.js ile smoke yoklanır (tests/smoke.js). */
/* ---- Ofis ---- */
function renderOffice(){
  if(S.nonOwner&&!S.story)return [h("div",{class:"panel"},h("div",{class:"label"},"Ofis"),h("h2",null,"Hikâye ve Müdür raporu"),h("div",{class:"small mute"},"Bu bölüm kurucunun günlük koç görevlerine bağlı olduğu için senin hesabında şimdilik boş. Dersler, Masa, Sınıf, Oyun, Proje ve Atölye tam çalışıyor."),h("div",{class:"row"},h("button",{class:"btn",type:"button",onclick:function(){goTab("ders")}},"Derse git")))];
  var T=topicsOf("eng"),out=[],sy=S.story;
  out.push(renderManager());
  out.push(h("div",{class:"panel story"},h("div",{class:"label"},(MYN()||"Senin")+(MYN()?"'un":"")+" Ofisi · "+(sy&&sy.season?"Sezon "+sy.season:"Sezon 1")+(sy&&sy.episode?" · Bölüm "+sy.episode:"")),
    sy&&sy.title?h("h2",null,sy.title):h("h2",null,"Hikâye ilk bölümle başlayacak"),
    sy&&sy.recap?h("div",null,sy.recap):h("div",{class:"small mute"},"Her gün aynı ofiste devam eden kısa bir iş hikâyesi: yazıcı sorunu, sinirli müşteri, yeni müdür. Hikâye senin gördüğün kalıplarla ilerler, koç karakterleri oynar."),
    sy&&sy.cliffhanger?h("div",{class:"cliff"},sy.cliffhanger):null,
    sy&&sy.newWords&&sy.newWords.length?h("div",{class:"words"},sy.newWords.map(function(w){return h("span",{class:"pill eng"},w)})):null));
  if(!T.length){out.push(h("div",{class:"empty"},"Kalıp merdiveni henüz yok."));return out}
  var done=T.filter(PP.ogr.ilerleme.konuTamam).length;
  out.push(h("div",{class:"panel"},h("h2",null,"Kalıp merdiveni"),
    h("div",{class:"small mute"},done+" / "+T.length+" kalıp oturdu. Her basamak yeni bir ek ya da yardımcı fiil. Yeni basamak, önceki yaklaşık %80 oturunca açılır."),
    T.map(function(t){
      var m=Math.round(num(t.mastery)),a=daysAgo(t.lastReview),rust=(t.status==="built"||t.status==="building")&&m>0&&a!=null&&a>7;
      return h("div",{class:"step"},ringSvg(t.status==="locked"?0:m,rust?"var(--rust)":"var(--eng)"),
        h("div",null,h("div",null,t.name),h("div",{class:"small mute"},(t.analogy||"")+(a!=null?" · son tekrar "+a+" g önce":""))),
        h("span",{class:"pill "+(rust?"rust":t.status==="built"?"ok":t.status==="next"?"eng":"")},
          rust?"pas":t.status==="locked"?"kilitli":t.status==="next"?"sıradaki":t.status==="built"?"oturdu":m+"%"));
    })));
  return out;
}

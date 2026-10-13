"use strict";
/* ---- Ağ Şehri ---- */
function building(t,track){
  var m=Math.round(num(t.mastery)),a=daysAgo(t.lastReview),rust=(t.status==="built"||t.status==="building")&&m>0&&a!=null&&a>7;
  var cls="bld "+(track==="eng"?"eng ":"")+(t.status==="locked"?"locked":t.status==="next"?"next":"")+(rust?" rust":"");
  var height=t.status==="locked"||t.status==="next"?46:Math.max(26,26+m*0.9);
  return h("div",{class:cls,title:(t.analogy?t.analogy+" · ":"")+t.name},
    h("div",{class:"tower",style:"height:"+height+"px"},t.status==="locked"?"":t.status==="next"?"sıra":m+"%"),
    h("div",{class:"nm"},t.name),
    h("div",{class:"age"},rust?"pas · "+a+" g":(a!=null?a+" g önce":"—")));
}
function fogOf(d){return d.state==="far"?.96:d.state==="next"?Math.max(.4,.88-d.prevAvg/100*.5):0}
function renderCity(){
  var T=cityTopics(goalTrack()),out=[];
  if(!T.length)return [h("div",{class:"empty"},"Şehir henüz boş. Konu haritası ilk koç çalışmasında kurulur.")];
  var done=T.filter(PP.ogr.ilerleme.konuTamam).length;
  var ds=districtsOf(goalTrack());
  ds.forEach(function(d,i){d.prevAvg=i>0?ds[i-1].avg:0;if(d.state==="next"){var a=ds.filter(function(x){return x.state==="active"})[0];d.prevAvg=a?a.avg:0}});
  var path=h("ol",{class:"dpath","aria-label":"Semt yol haritası"},ds.map(function(d,i){
    return h("li",{class:"dp "+d.state,title:d.name},h("span",{class:"dot"},d.state==="done"?"✓":String(i+1)),
      h("span",{class:"dn"},d.state==="far"?"???":d.state==="next"?maskName(d.name,d.prevAvg):d.name));
  }));
  out.push(h("div",{class:"panel"},h("h2",null,goalCity()),
    h("div",{class:"small mute"},done+" / "+T.length+" bina tamam. Bina, kapı sınavında yaklaşık %80'i geçince tamamlanır. Boy ustalığı, kırmızı renk 7 günden uzun süredir tekrar edilmediğini gösterir. Sisli semtler, öncekini bitirdikçe açılır."),
    path,areaBars(goalTrack())));
  S._fog=S._fog||{};
  ds.forEach(function(d){
    var f=fogOf(d),old=S._fog[d.name],fog=h("div",{class:"dfog","aria-hidden":"true",style:"opacity:"+(old!=null&&old!==f?old:f)});
    if(old!=null&&old!==f){requestAnimationFrame(function(){requestAnimationFrame(function(){fog.style.opacity=f})})}
    S._fog[d.name]=f;
    var title=d.state==="far"?maskName(d.name,0):d.state==="next"?maskName(d.name,d.prevAvg):d.name;
    var badge={done:"tamam",active:"şu an buradasın",next:"sis çekiliyor",far:"sisli bölge"}[d.state];
    out.push(h("div",{class:"panel district d-"+d.state},
      h("div",{class:"dhead"},h("h3",null,title),h("span",{class:"pill "+(d.state==="done"?"ok":d.state==="active"?"eng":"")},badge),
        h("span",{class:"mono small mute"},d.state==="far"?"":"ort. "+d.avg+"%")),
      h("div",{class:"skywrap"},h("div",{class:"skyline"},d.topics.map(function(t){return building(t,goalTrack())})),fog)));
  });
  return out;
}

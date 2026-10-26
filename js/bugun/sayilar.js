"use strict";
/* ALAN: Sayılar sekmesi (renderNumbers), sınav ve çalışma istatistikleri. NE YAPAR: S.exams kayıtlarını (mock, gate, boss) tarihe göre sıralayıp grafik/özet olarak çizer; günlük kayıtlı dakikaları toplar.
   SORUN OLURSA: loggedDates, goalTrack temel.js'ten gelir; sınav türleri 'mock', 'gate', 'boss' dizgileriyle süzülür; adını değiştirirsen sayılar boşalır.
   YENİ ÖZELLİK: Yeni grafik/özet renderNumbers çıktısına eklenir; tests/tur_c.js güncellenir. */
/* ---- Sayılar ---- */
function renderNumbers(){
  var ex=S.exams.slice().sort(function(a,b){return String(a.date).localeCompare(String(b.date))});
  var mock=ex.filter(function(e){return e.track===goalTrack()&&e.kind==="mock"}).map(function(e){return {date:e.date,pct:num(e.score)}});
  var gates=ex.filter(function(e){return e.kind==="gate"}).map(function(e){return {date:e.date,pct:num(e.score)}});
  var gEng=ex.filter(function(e){return e.kind==="gate"&&e.track==="eng"}).map(function(e){return {date:e.date,pct:num(e.score)}});
  var boss=ex.filter(function(e){return e.kind==="boss"}).slice(-1)[0];
  var L=loggedDates(),tot=0,cnt=0;Object.keys(L).forEach(function(k){tot+=L[k];cnt++});
  var out=[];
  var xm=renderExamMap();if(xm)out.push(xm);
  out.push(h("div",{class:"panel"},h("h2",null,"Son 12 hafta"),heatmap(),
    h("div",{class:"small mute"},cnt?cnt+" gün çalışıldı, toplam "+tot+" dakika.":"Hücreler ilk raporla dolmaya başlar. Koyu hücre, uzun çalışılan gün.")));
  out.push(h("div",{class:"grid2"},
    h("div",{class:"panel"},h("h3",null,trName(goalTrack())+" deneme sınavları"),lineChart(mock,""),
      h("div",{class:"small mute"},"Kesikli çizgi %80 hedefi. Üst üste iki denemede bunun üstüne çıkınca sınav tarihi önerilir.")),
    h("div",{class:"panel"},h("h3",null,"İngilizce kapı sınavları"),lineChart(gEng,"eng"),
      h("div",{class:"small mute"},"Cumartesi kapı sınavı sonuçları."))));
  out.push(h("div",{class:"grid2"},
    h("div",{class:"panel"},h("h3",null,trName(goalTrack())+" konu alanları"),areaBars(goalTrack())),
    h("div",{class:"panel"},h("h3",null,"Son Kriz Gecesi"),
      boss?h("div",{style:"display:grid;gap:8px"},h("div",null,boss.title||"Kriz Gecesi"),
        h("div",{style:"display:flex;gap:4px"},[1,2,3].map(function(i){return heartSvg(i<=num(boss.lives))})),
        h("div",{class:"small mute"},short(boss.date)+" · "+(boss.note||""))):
      h("div",{class:"empty"},"Henüz Kriz Gecesi yok. Cumartesi senaryoları 3 canla oynanır: yanlış teşhis can götürür, doğru sıra bonus XP verir."))));
  out.push(downloadBlock());
  var rows=ex.slice().reverse().slice(0,12);
  out.push(h("div",{class:"panel"},h("h3",null,"Sınav kayıtları"),
    rows.length?h("div",{class:"scroll"},h("table",null,
      h("thead",null,h("tr",null,["Tarih","Koç","Tür","Skor","Not"].map(function(x){return h("th",null,x)}))),
      h("tbody",null,rows.map(function(e){return h("tr",null,
        h("td",{class:"mono"},short(e.date)),h("td",null,e.track==="eng"?"İngilizce":trName(e.track)),
        h("td",null,e.kind==="mock"?"Deneme":e.kind==="gate"?"Kapı":e.kind==="boss"?"Kriz Gecesi":e.kind||""),
        h("td",{class:"mono"},Math.round(num(e.score))+"%"),h("td",null,e.note||""))})))):
      h("div",{class:"empty"},"İlk kapı sınavı ilk Cumartesi.")));
  return out;
}

"use strict";
/* ---- entegrasyonlar ---- */
function calendarBlock(){
  var cal=(S.profile.calendar||{}).created===true;
  var msg=h("span",{class:"small mute"},cal?"Takvime eklendi.":"Her akşam için tekrar eden bir çalışma bloğu oluşturur.");
  var time=h("input",{id:"cal-time",type:"time",value:"21:30",style:"max-width:140px",disabled:cal||!S.mcp});
  var btn=h("button",{class:"btn",type:"button",disabled:cal||!S.mcp||!S.canWrite,onclick:function(){
    var tm=time.value||"21:30",d=new Date();d.setDate(d.getDate()+1);
    var day=iso(d),p=tm.split(":"),eh=(+p[0]+1)%24,end=pad(eh)+":"+p[1];
    msg.textContent="Ekleniyor";btn.disabled=true;
    S.mcp.callTool("Google Calendar","create_event",{summary:"Proofpath: günlük çalışma",startTime:day+"T"+tm+":00",endTime:(eh<+p[0]?(function(){var n=new Date(d);n.setDate(n.getDate()+1);return iso(n)})():day)+"T"+end+":00",timeZone:"Europe/Istanbul",
      recurrenceData:["RRULE:FREQ=DAILY"],description:"Panoyu aç, Sınıf sekmesinde dersi çöz, 3 satırlık raporu doldur: "+ARTIFACT_URL,useDefaultReminders:false,overrideReminders:[{method:"popup",minutes:10}]})
    .then(function(){msg.textContent="Takvime eklendi.";if(S.db)S.db.doc("profile/main").update({calendar:{created:true,time:tm,ts:new Date().toISOString()}}).catch(function(){})})
    .catch(function(e){btn.disabled=false;var c=e&&e.code;msg.textContent=(c==="not_in_manifest"||c==="approval_required")?"Takvim izni verilmedi.":(c==="server_not_connected"||c==="needs_reauth")?"Google Takvim bağlı değil. claude.ai Ayarlar > Bağlayıcılar bölümünden bağla.":"Eklenemedi, tekrar dene."});
  }},"Takvime koy");
  return h("div",{class:"panel"},h("h3",null,"Günlük çalışma saati"),
    h("div",{class:"small mute"},"Koçlar dersleri 19:32 ile 21:12 arasında hazırlar. Çalışma bloğunu bundan sonrasına koyman iyi olur."),
    h("div",{class:"row",style:"align-items:end"},h("div",{class:"field",style:"flex:0 1 150px"},h("label",{for:"cal-time",class:"label"},"Başlangıç"),time),btn,msg));
}
function weeklyMd(){
  var mon=mondayOf(new Date()),from=iso(mon),L=loggedDates(),days=0,min=0;
  Object.keys(L).forEach(function(k){if(k>=from){days++;min+=L[k]}});
  var at=S.attempts.filter(function(a){return a.date>=from}),okc=at.filter(function(a){return num(a.score)>=60}).length;
  var R=rankInfo();
  var lines=["# Akademi haftalık rapor ("+from+" haftası)","","- Rütbe: "+R.cur.n+" · toplam XP: "+R.xp,"- Çalışılan gün: "+days+" · dakika: "+min,"- Canlı sorular: "+at.length+(at.length?" · doğru oranı %"+Math.round(okc/at.length*100):""),""];
  (goalSet()||["ccna","eng"]).forEach(function(tr){
    lines.push("## "+trName(tr));
    topicsOf(tr).filter(function(t){return t.status!=="locked"}).forEach(function(t){lines.push("- "+t.name+": %"+Math.round(num(t.mastery))+" ("+t.status+(t.lastReview?", son tekrar "+t.lastReview:"")+")")});
    lines.push("");
  });
  var rust=rustList();lines.push("## Paslanan binalar",rust.length?rust.map(function(t){return "- "+t.name+" ("+daysAgo(t.lastReview)+" gün)"}).join("\n"):"- yok","");
  var ex=S.exams.filter(function(e){return e.date>=from});
  lines.push("## Sınavlar",ex.length?ex.map(function(e){return "- "+e.date+" "+trName(e.track)+" "+e.kind+": %"+Math.round(num(e.score))}).join("\n"):"- bu hafta yok");
  return lines.join("\n");
}
function downloadBlock(){
  var msg=h("span",{class:"small mute"});
  return h("div",{class:"panel"},h("h3",null,"Haftalık rapor"),
    h("div",{class:"small mute"},"Bu haftanın XP'si, konu ustalıkları, paslanan binalar ve sınavlar tek bir markdown dosyasında."),
    h("div",{class:"row",style:"align-items:center"},h("button",{class:"btn",type:"button",disabled:!S.dl,onclick:function(){
      S.dl.save({filename:"akademi-"+today()+".md",data:weeklyMd()}).then(function(){msg.textContent="Kaydedildi."},function(e){msg.textContent=(e&&e.code==="declined")?"Vazgeçtin.":"Kaydedilemedi."});
    }},"Özeti indir"),msg));
}

/* ---- çizim ---- */
var pending=false,raf=0;
function sched(){if(raf)return;raf=requestAnimationFrame(function(){raf=0;draw()})}
var NAV={bugun:["Bugün","M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z M12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"],ders:["Ders","M5 4h13v15H7a2 2 0 0 0-2 2z M9 8h6 M9 12h6"],sinif:["Sınıf","M4 5h16v11H10l-5 4v-4H4z"],atolye:["Atölye","M14 4l6 6-9 9H5v-6z M13 5l6 6 M4 21h16"],oyun:["Oyun","M6 8h12a4 4 0 0 1 4 4v2a3 3 0 0 1-5.2 2L15 14H9l-1.8 2A3 3 0 0 1 2 14v-2a4 4 0 0 1 4-4z M7 11v3 M5.5 12.5h3 M16 11.5h.01 M18 13h.01"],sehir:["Şehir","M4 21V10h6v11 M10 21V4h7v17 M3 21h18 M13 8h1 M13 12h1 M13 16h1"],ofis:["Ofis","M3 8h18v12H3z M9 8V5h6v3 M3 13h18"],sozluk:["Sözlük","M4 5h13a3 3 0 0 1 3 3v11H7a3 3 0 0 1-3-3z M8 9h8 M8 13h5"],rehber:["Rehber","M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 8v.01 M11 12h1v5h1"],ayar:["Ayarlar","M4 7h10 M18 7h2 M4 17h2 M10 17h10 M16 5v4 M8 15v4"],proje:["Proje","M3 7h7l2 2h9v10H3z M12 12v4 M10 14h4"],mul:["Mülakat","M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z M5 11a7 7 0 0 0 14 0 M12 18v3"],gazete:["Gazete","M4 5h13v14H6a2 2 0 0 1-2-2z M17 8h3v9a2 2 0 0 1-2 2 M7 9h7 M7 13h7"],lig:["Lig","M3 21h18 M5 21v-9h4v9 M10 21V6h4v15 M15 21v-6h4v6"],masa:["Masa","M3 9a2 2 0 0 0 0 6v3h18v-3a2 2 0 0 1 0-6V6H3z M14 6v12"],oku:["Okuma","M3 5h7a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H3z M21 5h-7a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h7z"],sayilar:["Sayılar","M4 20h16 M7 20v-7 M12 20V6 M17 20v-10"],oduller:["Ödüller","M7 4h10v5a5 5 0 0 1-10 0z M7 6H4v2a3 3 0 0 0 3 3 M17 6h3v2a3 3 0 0 1-3 3 M12 14v4 M8 20h8"]};

/* ---- v24: ekran yardımı, açık düğme adları ---- */
var HELPKEY="ya_help";
var TABHELP={
 bugun:["Günün başlangıç noktası","Bugün yapılacak işler sırayla burada. En üstteki büyük düğme sıradaki işi açar.","Büyük düğmeye bas. İş bitince bir sonrakine geç."],
 ders:["Dersin okunduğu yer","Sekiz dersin hepsi burada: CCNA, Network, İngilizce, Siber, Backend, DevOps, Test Uzmanı, Python. Sırası: Isınma, Anlatım, Mini sınav.","Üstten dersini seç, dersi baştan sona oku, en altta 'Dersi okudum'a bas. Üstteki 'Kavram Atlası'nda yazılım ve İngilizce kavramlarını benzetme, örnek ve mini soruyla öğrenirsin."],
 sinif:["Canlı soru çözme","Gerçek iş durumlarından sorular gelir. Cevabını yazarsın ya da şık seçersin; hemen değerlendirilir.","Dersini seç, 'Dersi başlat'a bas, 5 soruyu çöz."],
 atolye:["Günlük program ve alıştırma","Ders gelene kadar boş kalmazsın: kelime, kavram, alıştırma, defter ve kaynaklar burada.","Üstten bir bölüm seç. Program sıradaki işi söyler; 'Şimdi yap'a bas."],
 oyun:["Koş, sür, öğren","Üç şeritli yolda koşarsın ya da araba sürersin. Kapılarda soru çıkar; doğru cevabın şeridine geçersin.","Başla'ya bas, sola/sağa kaydır, doğru şeritte kal. Günlük koşu ve haftalık Patron var."],
 sehir:["İlerleme haritan","Her bina bir konu. Bina yükseldikçe konuyu daha iyi biliyorsun. Paslı bina tekrar zamanı demek.","Sadece bakman yeterli. Işıklı bina bugünkü konun."],
 ofis:["Hikâye ve haftalık denetim","Ofis hikâyesinin yeni bölümü ve Müdür'ün haftalık raporu burada. Müdür sistemi denetleyen yapay zekâdır.","Raporu oku. Öneri varsa Onayla veya Reddet'e bas; basmazsan hiçbir şey değişmez."],
 oku:["Kısa İngilizce hikâyeler","Cümleye veya kelimeye dokununca anlamını görürsün. Hoparlör düğmesi cümleyi sesli okur.","Bir hikâye seç, sesli oku, bilmediğin kelimeye dokun."],
 masa:["İş yeri simülasyonu","Şirketin BT bölümünde müşterilerle ilgilenirsin; ruh hâlleri cevaplarına göre değişir. İngilizce destek talepleri de burada.","Vardiyada bir müşteri seç, cevap seç; ruh hâli ve beklentiler rütbene göre değişir."],
 gazete:["Yazılım gazetesi","Her sabah derlenen haberler ve etkinlikler. Etkinliklerde tarih, yer, neler anlatılacağı ve neden önemli olduğu yazar; yaklaşanı takvimine ekleyebilirsin.","Haberler ya da Etkinlikler'i seç, üstten alanına göre süz, bağlantıdan kaynağı oku."],
 lig:["Arkadaş yarışması (isteğe bağlı)","Günde 8 soru çözülür. Yanlışta kartın arkasında doğru cevap ve nedeni çıkar.","Soruyu çöz. Yarışmak istemezsen sadece kendi gelişimine bak; girmek zorunda değilsin."],
 mul:["Mülakat antrenmanı","Gerçek mülakatta sorulabilecek sorular. Süre tutarak cevap prova edersin.","Bir soru seç, '60 sn başlat'a bas, sesli cevap ver, sonra model cevaba bak."],
 proje:["Proje atölyesi","Bir alan seç (siber güvenlik, test, backend) ve adım adım proje yap. Her adım: öğren, yap, kanıtla.","Seviyene uygun yolu aç, ilk adımı oku, yapınca işaretle."],
 sozluk:["Terim sözlüğü","Derste ve ekranlarda geçen terimlerin sade açıklamaları.","Arama kutusuna kelimeyi yaz."],
 rehber:["Kullanım rehberi","Burada bugünü adım adım yapabilir, saatleri ve sık sorulanları görebilirsin.","Üstteki 'Bugünü adım adım yap' listesinden başla."],
 ayar:["Ekran ayarları","Yazı boyutu, sade mod, yüksek kontrast ve öğrenme temposu.","Bir seçeneğe bas; hemen uygulanır, ayrıca kaydetmen gerekmez."],
 sayilar:["Sayılar ve sınav haritası","Çalışma süren, doğruluğun ve tahmini sınav hazırlığın.","Sadece bakman yeterli. İstersen özeti indir."],
 oduller:["Kimlik kartı ve ödüller","Akademi kimlik kartın ve kendine koyduğun ödüller burada.","İstersen kartı resim olarak kaydet ya da kendine yeni bir ödül ekle."]};
var GH_HELP={
 arena:["Arena: yarış","Bilgisayara ya da arkadaşına karşı 8 soruluk tur oynarsın. Doğru cevap puan, hızlı cevap bonus verir.","Konuyu ve botu seç. Zor botu yenmek günlük XP verir."],
 arcade:["Arcade: koş, sür, öğren","Üç şeritli yolda koşarsın ya da araba sürersin. Kapılarda soru çıkar; doğru cevabın şeridine geçersin.","Başla'ya bas, sola/sağa kaydır, doğru şeritte kal. Günlük koşu ve haftalık Patron var."],
 dino:["Dino: sonsuz koşu","Bayt kutuların üstünden zıplar, dronların altından eğilir. Bilgi kapılarında soru çıkar. Kademe arttıkça sorular zorlaşır.","Dokun ya da Boşluk ile zıpla, aşağı ok ile eğil."],
 fetih:["Fetih: strateji","Haritada komşu bölgelere saldırır, külliyeni ve teknolojini geliştirirsin. Divan soruları derslerinden gelir.","Bir sefer seç, doktrin ve komutanını belirle, 'Seferi başlat'a bas."],
 gorev:["Görevler ve sezon","Günlük görevler, haftalık zincir ve sezon yolu burada. Günlük oyun XP'si en çok 40.","Sadece bakman yeterli; görevler oynadıkça dolar."],
 kart:["Ağ kartları","Bir ağ noktasında doğru cevap verince kart açılır. 1 doğruda Bronz, 5'te Gümüş, 15'te Altın.","Kilitli kartları açmak için Arcade'de oyna."]};
function helpState(){try{return JSON.parse(localStorage.getItem(HELPKEY)||"{}")||{}}catch(e){return {}}}
function helpSave(o){try{localStorage.setItem(HELPKEY,JSON.stringify(o))}catch(e){}}
function helpStrip(t){
  var d=TABHELP[t];if(!d||t==="bugun"&&S.pf.simple)return null;
  var gk=S.gtab==="rehber"?"arcade":(S.gtab||"arena");if(t==="oyun"&&GH_HELP[gk]){d=GH_HELP[gk];var key="oyun_"+gk}else var key=t;
  var st=helpState(),hid=st[key]===1&&S._helpOpen!==key;
  if(hid)return h("div",{class:"hlp-min"},h("button",{class:"hlp-open",type:"button","aria-label":"Bu ekran ne işe yarar? Yardımı aç",onclick:function(){st[key]=0;helpSave(st);S._helpOpen=key;draw()}},"? Bu ekran ne işe yarar?"));
  return h("div",{class:"hlp",role:"note"},h("span",{class:"hlp-i","aria-hidden":"true"},"?"),
    h("div",{class:"hlp-t"},h("b",null,d[0]),h("p",null,d[1]),h("p",{class:"hlp-do"},h("b",null,"Ne yapacaksın: "),d[2])),
    h("button",{class:"btn ghost hlp-x",type:"button",onclick:function(){st[key]=1;helpSave(st);S._helpOpen=null;draw()}},"Anladım"));
}
function enhanceButtons(){
  var why=!S.canWrite?"Bu cihazda kaydetme izni yok":!S.sample?"Koça sorma özelliği şu an kapalı":"Şu an kullanılamıyor";
  [].forEach.call(document.querySelectorAll("#view button, .tabs button"),function(b){
    if(b.getAttribute("title"))return;
    var tx=(b.textContent||"").trim().replace(/\s+/g," ");
    var dt=b.getAttribute("data-t");
    if(dt&&TABHELP[dt]){b.setAttribute("title",TABHELP[dt][0]);return}
    if(b.disabled){b.setAttribute("title",why);return}
    if(tx)b.setAttribute("title",tx);
  });
}
function draw(){
  if(S.guest&&tab!=="lig")tab="lig";
  document.body.classList.toggle("guest",!!S.guest);
  var a=document.activeElement;
  if(a&&view.contains(a)&&/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)){pending=true;renderHero();return}
  pending=false;
  renderHero();
  var moreOn=!PRIMARY[tab];
  tabsEl.replaceChildren.apply(tabsEl,TABS.map(function(t){
    var nv=NAV[t[0]]||[t[1],""];
    return h("button",{class:"tab"+(PRIMARY[t[0]]?"":" sec"),"data-t":t[0],role:"tab","aria-selected":t[0]===tab?"true":"false",onclick:function(){S.more=false;tab=t[0];try{history.replaceState(null,"","#"+tab)}catch(e){}draw();window.scrollTo(0,0)}},mi(nv[1]),h("span",null,nv[0]))}).concat([
    h("button",{class:"tab moreb",type:"button","aria-label":"Daha fazla sekme","aria-expanded":S.more?"true":"false","aria-selected":moreOn?"true":"false",onclick:function(){S.more=!S.more;draw()}},mi("M5 12h.01 M12 12h.01 M19 12h.01"),h("span",null,moreOn?(TT[tab]||["Daha"])[0]:"Daha"),pendingProposals()>0?h("i",{class:"ndot"}):null)]));
  var body={bugun:renderToday,ders:renderLessonTop,sinif:renderClass,sehir:renderCity,oyun:renderGame,atolye:renderAtolye,ofis:renderOffice,oku:renderReader,masa:renderDesk,lig:renderLeague,gazete:renderGazete,mul:renderInterview,proje:renderProject,sozluk:renderGlossary,rehber:renderGuide,ayar:renderSettings,sayilar:renderNumbers,oduller:renderRewards}[tab]();
  var _on=onbNeeded();if(_on)body=renderOnboarding();tabsEl.hidden=_on;hero.hidden=_on;
  var firstVisit=S._lastTab!==tab;
  var box=h("div",{style:"display:flex;flex-direction:column;gap:16px",class:S._lastTab!==tab?"enter":""},body);
  S._lastTab=tab;
  if(firstVisit){S._helpOpen=null;var _hs=helpState();if(_hs[tab]===undefined){S._helpOpen=tab;_hs[tab]=1;helpSave(_hs)}}
  var hs=_on?null:helpStrip(tab);if(hs)box.insertBefore(hs,box.firstChild);
  if(S.more)box.append(moreSheet());
  if(S._rtOpen&&tab==="bugun")box.append(rtOverlay());
  if(tab==="oku"){var rs=STORIES.filter(function(x){return x.id===S.rd.id})[0];if(rs&&S.rd.pop)box.append(wordSheet(rs))}
  box.append(h("div",{class:"afoot"},h("span",null,"Proofpath"),h("span",null,brandLine()+" · "+termWeek())));
  view.replaceChildren(box);
  if(a&&a!==document.body&&a.isConnected&&document.activeElement!==a)try{a.focus({preventScroll:true})}catch(e){}   /* önbellekli öğe (alan paneli düğmesi) yeniden takılınca odak kaybolmasın */
  var rsd=routeSteps().every(function(x){return x.d});
  if(S._rd===false&&rsd&&Date.now()-(S._t0||0)>5000)burst();
  S._rd=rsd;
  enhanceButtons();
  checkMilestones();syncDesk();syncLeagueMe();rtAward();
}
view.addEventListener("focusout",function(){setTimeout(function(){if(pending)sched()},150)});

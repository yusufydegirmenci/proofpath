"use strict";
/* ---- Bugün ---- */
function cityCard(){
  var T=cityTopics(goalTrack());if(!T.length)return null;
  var built=T.filter(PP.ogr.ilerleme.konuTamam).length,nx=T.filter(function(t){return t.status==="next"||t.status==="building"})[0];
  var bars=T.slice().sort(function(a,b){return num(a.order)-num(b.order)}).map(function(t){var v=t.status==="built"?1:t.status==="building"?.55:t.status==="next"?.25:.1;return h("i",{style:"height:"+Math.round(8+v*34)+"px;opacity:"+(.3+v*.7)})});
  return h("div",{class:"panel"},h("div",{style:"display:flex;justify-content:space-between;gap:8px;align-items:center;flex-wrap:wrap"},h("div",null,h("div",{class:"label"},goalCity().replace("Şehri","Şehrin")),h("h2",{style:"margin:2px 0 0"},built+" / "+T.length+" bina ayakta")),
    h("button",{class:"btn ghost",type:"button",onclick:function(){goTab("sehir")}},"Şehre bak")),
    h("div",{class:"csk","aria-hidden":"true"},bars),
    h("div",{class:"small mute"},nx?"Sırada inşa edilen: "+nx.name+". Bir dersi bitirince bina yükselir.":"Her tamamlanan ders bir bina yükseltir."));
}

/* ---- v50 Bugün: üs kartları ---- */
function bgGrid(){
  var D=dzGet(),dn=gmDay(today()),gdn=num(dn.g_runs)>0,T=cityTopics(goalTrack()),built=T.filter(PP.ogr.ilerleme.konuTamam).length;
  var tiles=[];
  if(!S.guest)tiles.push({c:"bg-g",k:"OYUN",t:"Meydan oku",s:(gqDue().length?gqDue().length+" tekrar sorusu bekliyor · ":"")+(gdn?"Günün koşusu tamam · reyting "+D.r:"Günün koşusu seni bekliyor · reyting "+D.r),go:"oyun"});
  if(T.length)tiles.push({c:"bg-c",k:goalCity().toLocaleUpperCase("tr"),t:built+" / "+T.length+" bina",s:"Her ders bir bina yükseltir",go:"sehir"});
  if(!S.guest&&S.me){var s_=lgStats(myLeague()),n=num(s_.today.tot),TN=qsFor(today(),myTier()).length||num(s_.today.n)||5;tiles.push({c:"bg-l",k:"LİG",t:n>=TN?"Tur tamam":"Günün "+TN+" sorusu",s:n>=TN?s_.today.ok+"/"+TN+" doğru · sıralama":n+"/"+TN+" çözüldü",go:"lig",pre:function(){S.lg.view=n>=TN?"sira":"bugun"}})}
  tiles.push({c:"bg-m",k:"MÜLAKAT",t:"Antrenman",s:"Gerçek mülakat sorularıyla ısın",go:"mul"});
  if(tiles.length<2)return null;
  return h("div",{class:"bg-grid"},tiles.map(function(x,i){return h("button",{type:"button",class:"bg-t "+x.c+((tiles.length%2&&i===tiles.length-1)?" wide":""),onclick:function(){if(x.pre)x.pre();goTab(x.go)}},h("small",null,x.k),h("b",null,x.t),h("span",null,x.s))}));
}
/* Seri satırı (Faz 10 tur 4): seri dondurma durumu + 7/30. gün kutlaması. Sade modda gösterilmez (renderToday sade koldan önce döner). */
function seriSatiri(){
  var st=streakInfo();if(!st.n)return null;
  var J={};(S.profile.jokerDates||[]).forEach(function(d){J[d]=1});
  var Sr=PP.ogr.seri,dz=Sr.dondurma(loggedDates(),J,today()),km=Sr.kilometre(st.n),out=[];
  var key=km?km+":"+today():"",gorulen=null;try{gorulen=PP.ogr.depo.tercih("seri_kutlama")}catch(e){}
  if(km&&gorulen!==key)out.push(h("div",{class:"alert",role:"status","data-seri-kutlama":String(km)},h("b",null,km+" günlük seri. "),km===7?"Bir haftadır her gün çalıştın.":"Bir ay boyunca her gün çalıştın; bu artık bir düzen. ",
    h("button",{class:"btn ghost",type:"button",onclick:function(){try{PP.ogr.depo.tercih("seri_kutlama",key)}catch(e){}draw()}},"Kapat")));
  var korundu=Object.keys(dz.kopru).filter(function(d){return d>=addDays(today(),-2)}).length;
  out.push(h("div",{class:"small mute","data-seri-dondurma":String(dz.kalan)},"Seri "+st.n+" gün · dondurma "+dz.kalan+"/"+Sr.DONDURMA_EN_COK+". Kesintisiz her "+Sr.DONDURMA_GUN+" etkin günde 1 dondurma kazanılır; boş kalan bir günü otomatik köprüler."+
    (korundu?" Son günlerde bir boş gün dondurmayla korundu.":"")+(dz.kalan<Sr.DONDURMA_EN_COK?" Sonrakine "+(Sr.DONDURMA_GUN-dz.ilerleme)+" gün kaldı.":"")));
  return out;
}
function renderToday(){
  if(S.pf.simple)return renderSimpleToday();
  var p=S.profile,st=streakInfo(),wk=weekInfo(),rust=rustList(),out=[],alr=[];
  var hr=new Date().getHours();
  if(pendingProposals()>0)alr.push(h("div",{class:"alert warn"},h("b",null,"Müdür onayını bekliyor: "),pendingProposals()+" öneri. ",h("button",{class:"btn ghost",type:"button",onclick:function(){goTab("ofis")}},"Raporu gör ve karar ver")));
  if(rust.length)alr.push(h("div",{class:"alert"},h("b",null,"Tekrar zamanı: "),
    rust.slice(0,5).map(function(t){return t.name+" ("+daysAgo(t.lastReview)+" gün)"}).join(", ")+
    ". Bu konuları bir haftadan uzun süredir tekrar etmedin; unutmamak için bir tekrar sorusu çöz."));
  if(!st.loggedToday&&hr>=18)alr.push(h("div",{class:"alert warn"},h("b",null,"Bugün kayıt yok. "),
    "Seri gece yarısı risk altında. Yoğunsan 20 dakikalık minimum tekrar yeter, aşağıdan kaydet."));
  if(alr.length===1)out.push(alr[0]);
  else if(alr.length>1)out.push(alr[0],h("details",{class:"more bg-al"},h("summary",null,"Diğer uyarılar ("+(alr.length-1)+")"),h("div",{class:"morebox"},alr.slice(1))));
  var sk=seriSatiri();if(sk)sk.forEach(function(x){out.push(x)});
  var plOn=!!S.pl.on;if(plOn)out.push(plPanel());
  var jk=jokerCard();if(jk)out.push(jk);
  var wc=welcomeCard();if(wc)out.push(wc);
  if(!wc&&!S.guest)out.push(h("div",{class:"row",style:"justify-content:flex-end"},h("button",{class:"btn ghost",type:"button",onclick:function(){goTab("rehber")}},"Nasıl kullanırım? Adım adım tur")));
  var ppn=renderPersonal();if(ppn)out.push(ppn);
  var kocP=typeof renderKoc==="function"?renderKoc():null;if(kocP)out.push(kocP);
  var planP=typeof renderPlan==="function"?renderPlan():null;if(planP)out.push(planP);
  out.push(renderRoute());
  out.push(bgGrid());
  var gu=typeof gbGuncellik==="function"?gbGuncellik():null;if(gu)out.push(gu);
  var tools=[plOn?null:plPanel(),syncLine()];if(!S.guest)tools.push(m5Panel());
  var wd_=new Date().getDay();if(wd_===0||wd_===1)tools.unshift(wkPanel(wd_===1));
  var tl=tools.filter(function(x){return x});
  var gqp=gqPanel();if(gqp)out.push(gqp);
  out.push(h("div",{class:"grid2",id:"pp-rq"},renderReviewQueue(),renderFocus()));
  var nt=p.notes||{},coachBox=[];
  if(nt.ccna||nt.eng)coachBox.push(h("div",{class:"grid2"},
    nt.ccna?h("div",{class:"panel coach"},h("div",{class:"label"},"CCNA koçundan not"),h("div",null,nt.ccna)):null,
    nt.eng?h("div",{class:"panel coach eng"},h("div",{class:"label"},"İngilizce koçundan not"),h("div",null,nt.eng)):null));
  var t=p.today||{};
  coachBox.push(h("div",{class:"grid2"},
    h("div",{class:"panel coach"},h("div",{class:"label"},"CCNA görevi"),
      h("h3",null,(t.ccna&&t.ccna.title)||"İlk çalışmada belirlenecek"),
      h("div",{class:"small mute"},(t.ccna&&t.ccna.detail)||"Koç akşam çalışınca burası bugünün konusu, süresi ve kapı koşuluyla dolar."),
      t.ccna&&t.ccna.url?h("a",{href:t.ccna.url,target:"_blank",rel:"noopener"},"Sunumu aç"):null),
    h("div",{class:"panel coach eng"},h("div",{class:"label"},"İngilizce görevi"),
      h("h3",null,(t.eng&&t.eng.title)||"İlk çalışmada belirlenecek"),
      h("div",{class:"small mute"},(t.eng&&t.eng.detail)||"Koç akşam çalışınca burası bugünün kalıbı ve ofis hikâyesi bölümüyle dolar."),
      t.eng&&t.eng.url?h("a",{href:t.eng.url,target:"_blank",rel:"noopener"},"Sunumu aç"):null)));
  if(!WEB||nt.ccna||nt.eng)out.push(h("details",{class:"more",open:!!((t.ccna&&t.ccna.title)||(t.eng&&t.eng.title)||nt.ccna||nt.eng)},h("summary",null,"Koç notları ve günün görevleri"),h("div",{class:"morebox"},coachBox)));
  /* haftalık taahhüt */
  var tp=wk.tDays?Math.min(100,wk.days/wk.tDays*100):0;
  var more=[];
  if(!WEB)more.push(h("div",{class:"panel"},h("div",{class:"label"},"Haftalık taahhüt"),
    wk.tDays?h("div",null,h("div",{class:"xpbar"},h("i",{style:"width:"+tp+"%"})),
      h("div",{class:"small mute",style:"margin-top:6px"},wk.days+" / "+wk.tDays+" gün · "+wk.min+(wk.tMin?" / "+wk.tMin:"")+" dk. Pazar günü koç yeni hafta için sana bir hedef önerir, sen onaylarsın. Tutarsa ödül kilidi açılır.")):
      h("div",{class:"empty"},"Taahhüt henüz yok. İlk Pazar koç haftalık hedef önerecek; sen kabul edince burada ilerlemen görünür.")));
  more.push(reportForm());
  more.push(calendarBlock());
  more.push(h("details",{class:"panel"},h("summary",null,"XP nasıl kazanılır"),
    h("div",{class:"small mute",style:"margin-top:8px"},
      "Sınıfta canlı çözdüğün soru: doğru başına 5, açık uçlu cevapta puana göre en çok 15 (günde en çok 100). Koçların günlük kaydı: görev 50 · rapor 10 · simülasyon 20-60 · kapı sınavı geçiş 100 · deneme sınavı 150-300 · Kriz Gecesi 100-250 · seri bonusu günde +5 (en çok +50). Rütbe sadece XP ile değil, kapı sınavlarıyla da açılır; yani çok çalışmak tek başına yetmez, öğrendiğini göstermen gerekir.")));
  out.push(h("details",{class:"more",open:!Object.keys(plLoad()).length||S.pl.on},h("summary",null,"Çalışma araçları: seviye testi, 5 dakika, odak"),h("div",{class:"morebox"},tl)));
  out.push(h("details",{class:"more"},h("summary",null,"Daha fazla: günlük kayıt, haftalık taahhüt, takvim, XP kuralları"),h("div",{class:"morebox"},more)));
  return out;
}
function reportForm(){
  var td=today(),ex=S.reports.filter(function(r){return r.date===td})[0]||{};
  var f=h("form",{id:"reportForm"},
    h("div",{class:"row"},
      h("div",{class:"field"},h("label",{for:"r-track",class:"label"},"Hangi koç"),
        h("select",{id:"r-track"},[["both","İkisi"],["ccna","CCNA"],["eng","İngilizce"]].map(function(o){
          return h("option",{value:o[0],selected:(ex.track||"both")===o[0]},o[1])}))),
      h("div",{class:"field"},h("label",{for:"r-min",class:"label"},"Süre (dk)"),
        h("input",{id:"r-min",type:"number",min:0,max:600,inputmode:"numeric",value:ex.minutes!=null?ex.minutes:(liveMinutes()[td]||"")})),
      h("div",{class:"field"},h("label",{for:"r-dif",class:"label"},"Zorluk 1-5"),
        h("select",{id:"r-dif"},[1,2,3,4,5].map(function(n){return h("option",{value:n,selected:+ex.difficulty===n},n)})))),
    h("div",{class:"row"},
      h("div",{class:"field"},h("label",{for:"r-qc",class:"label"},"Mini sınav doğru"),
        h("input",{id:"r-qc",type:"number",min:0,max:100,inputmode:"numeric",value:ex.quizCorrect!=null?ex.quizCorrect:(qTotals().tot?qTotals().ok:"")})),
      h("div",{class:"field"},h("label",{for:"r-qt",class:"label"},"Mini sınav toplam"),
        h("input",{id:"r-qt",type:"number",min:0,max:100,inputmode:"numeric",value:ex.quizTotal!=null?ex.quizTotal:(qTotals().tot||"")})),
      h("div",{class:"field"},h("label",{for:"r-ek",class:"label"},"Sınav türü"),
        h("select",{id:"r-ek"},[["none","Yok"],["gate","Kapı sınavı"],["mock","Deneme sınavı"],["boss","Kriz Gecesi"]].map(function(o){
          return h("option",{value:o[0],selected:(ex.examKind||"none")===o[0]},o[1])}))),
      h("div",{class:"field"},h("label",{for:"r-es",class:"label"},"Skor %"),
        h("input",{id:"r-es",type:"number",min:0,max:100,inputmode:"numeric",value:ex.examScore!=null?ex.examScore:""})),
      h("div",{class:"field"},h("label",{for:"r-lv",class:"label"},"Kalan can (0-3)"),
        h("input",{id:"r-lv",type:"number",min:0,max:3,inputmode:"numeric",value:ex.lives!=null?ex.lives:""}))),
    h("div",{class:"field"},h("label",{for:"r-stuck",class:"label"},"Takıldığım yer"),
      h("input",{id:"r-stuck",type:"text",maxlength:300,value:ex.stuck||""})),
    h("div",{class:"field"},h("label",{for:"r-sent",class:"label"},(WEB?"Kendi İngilizce cümlelerim (kendin için not)":"Kendi İngilizce cümlelerim (koç düzeltir)")),
      h("textarea",{id:"r-sent",maxlength:1500},ex.sentences||"")),
    h("div",{class:"row",style:"align-items:center"},
      h("button",{class:"btn",type:"submit",disabled:!S.canWrite},"Raporu kaydet"),
      h("span",{id:"r-msg",class:"small mute"},ex.ts?"Bugün kaydedildi.":(WEB?"Kayıt Defterim'de kalır.":"Yarınki koç dersini buna göre ayarlar."))));
  f.addEventListener("submit",function(ev){
    ev.preventDefault();
    var msg=f.querySelector("#r-msg");
    if(!S.db){msg.textContent="Kayıt şu an kullanılamıyor.";return}
    var data={date:td,track:f.querySelector("#r-track").value,minutes:Math.max(0,Math.min(600,+f.querySelector("#r-min").value||0)),
      difficulty:+f.querySelector("#r-dif").value,stuck:f.querySelector("#r-stuck").value.trim(),
      sentences:f.querySelector("#r-sent").value.trim(),ts:new Date().toISOString(),
      quizCorrect:f.querySelector("#r-qc").value===""?null:+f.querySelector("#r-qc").value,
      quizTotal:f.querySelector("#r-qt").value===""?null:+f.querySelector("#r-qt").value,
      examKind:f.querySelector("#r-ek").value,
      examScore:f.querySelector("#r-es").value===""?null:+f.querySelector("#r-es").value,
      lives:f.querySelector("#r-lv").value===""?null:+f.querySelector("#r-lv").value};
    msg.textContent="Kaydediliyor";
    S.db.doc("reports/"+td).set(data).then(function(){msg.textContent="Kaydedildi."},function(e){
      msg.textContent=(e&&e.code==="invalid_argument")?"Bu görünümde yazma izni yok.":"Kaydedilemedi, tekrar dene."});
  });
  return h("div",{class:"panel"},h("h2",null,"Bugünün 3 satırı"),
    h("div",{class:"small mute"},"Süre, takıldığın yer, zorluk. Mini sınav ve sınav skorunu kendin gir."+(WEB?" Plan bölümü bu kayıtları da kullanır.":" Koçlar ertesi günü buna göre kurar.")),f);
}

"use strict";
/* ALAN: Bugün/Ayarlar, kullanım turu, saatler, sık sorulanlar, ayarlar ekranı, hoş geldin kartı. NE YAPAR: tourPanel/timesPanel/faqPanel ile günün rotasını anlatır; renderSettings rahat okuma ve sade mod tercihlerini gösterir, renderSimpleToday sade modu çizer.
   SORUN OLURSA: Tercihler S.pf (rehber-sozluk.js'te tanımlı ve ya_pf'ten yüklenir) üzerindedir, bu dosya ondan SONRA yüklenmeli; saat metinleri sabittir ve rota adımları routeSteps'e bağlıdır.
   YENİ ÖZELLİK: Yeni ayar pfSeg/renderSettings'e ve S.pf alanına (rehber-sozluk.js savePf) eklenir; tests/mobil.js ve tests/kritik_akis.js güncellenir. */
/* ---- v23: Kullanım turu, saatler, sık sorulanlar ---- */
var TOURMIN={"CCNA: dersi oku":"8 dk","İngilizce: dersi oku":"8 dk"};
function tourMin(t){return /dersi oku/.test(t)?"≈8 dk":/canlı soru/.test(t)?"≈5 dk":/ticket/.test(t)?"≈5 dk":/sesli/.test(t)?"≈2 dk":/3 satır/.test(t)?"≈1 dk":""}
function tourPanel(){
  var steps=routeSteps(),done=steps.filter(function(x){return x.d}).length,hr=new Date().getHours(),mn=new Date().getMinutes();
  var lead=hr<12?"Günaydın. Bugünün iki dersi hazır; istediğin saatte başlayabilirsin.":hr<20?"Bugünün iki dersi hazır. Akşam koçlar yeni dersi yazar; sen şimdi çalışabilirsin.":(hr===20&&mn<47)||(hr===21&&mn<12)?"Koçlar birazdan yeni dersi yazar. Şimdi bugünkü işlerini bitirebilirsin; yeni ders Ders sekmesinde belirir.":"Koçlar yeni dersi yazdı. Ders sekmesinde en üstte bugünün dersi var.";
  var list=steps.map(function(st,i){
    return h("div",{class:"tour-r"+(st.d?" done":"")},
      h("span",{class:"tour-n","aria-hidden":"true"},st.d?"✓":String(i+1)),
      h("div",{class:"tour-t"},h("b",null,st.t),h("small",null,[tourMin(st.t),st.prog?" · "+st.prog:"",st.d?" · yapıldı":""].join(""))),
      (st.go||st.toggle)?h("button",{class:"btn ghost",type:"button",onclick:function(){(st.go||st.toggle)()}},st.d&&st.toggle?"Geri al":st.b):null);
  });
  return h("div",{class:"panel tour"},h("div",{class:"label"},"Şimdi dene"),h("h2",null,"Bugünü adım adım yap"),
    h("div",{class:"small mute"},lead),
    h("div",{class:"tour-bar","aria-hidden":"true"},h("i",{style:"width:"+Math.round(done/Math.max(1,steps.length)*100)+"%"})),
    h("div",{class:"small"},done+" / "+steps.length+" adım tamam. Toplam yaklaşık 30 dakika; yoğun gün olursa sadece 1. ve 2. adım yeter."),
    list,
    h("div",{class:"small mute"},"Bir adımı yaptıkça işaretlenir. Aynı gün tekrar açınca kaldığın yerden devam eder."));
}
function timesPanel(){
  var rows=[["Her gün 20:47","CCNA koçu yeni dersi yazar (Ders sekmesi)"],["Her gün 21:12","İngilizce koçu yeni dersi ve hikâye bölümünü yazar"],["Her sabah 11:48","İş ilanı özeti hazırlanır"],["Pazar 22:31","Müdür haftalık denetim raporu yazar (Ofis sekmesi)"],["Gece yarısı","Gün biter; ertesi gün yeni Lig soruları gelir"]];
  return h("div",{class:"panel"},h("h2",null,"Ne zaman ne olur?"),h("div",{class:"small mute"},"Koçlar kendi kendine çalışır; senin bir şey yapman gerekmez. Saatler Türkiye saatidir."),
    h("div",{class:"tm-list"},rows.map(function(r){return h("div",{class:"tm-r"},h("b",null,r[0]),h("span",null,r[1]))})),
    h("div",{class:"small mute"},(WEB?"Dersler hazırdır; sıradaki ders önceki ders bitince açılır.":"Ders sabahtan hazır görünüyorsa o gün için hazırlanmış demektir; akşam koç aynı dersi daha iyi hâliyle yazarsa güncellenir.")));
}
function faqPanel(){
  var q=[["Dersi bulamıyorum.","Alttaki menüden Ders sekmesine gir. Üstte CCNA / İngilizce seçimi var; bugünün dersi en başta olur. Hâlâ yoksa Bugün ekranındaki 'Dersi aç' düğmesi seni götürür."],
   ["Yanlış yaptım, ne olacak?","Hiçbir şey olmaz; puan kaybetmezsin. Kartın arkasında doğru cevap ve nedeni yazar. 'Kaçırdım' dersen soru birkaç gün sonra tekrar karşına çıkar."],
   ["Bir terimi bilmiyorum.","Sözlük sekmesinde ara. Derste altı çizili terimlere dokunarak da bakabilirsin."],
   ["Çok zor geliyor.","Ayarlar'dan Tempo'yu 'Rahat' yap, yazıyı büyüt, Sade modu aç. Koçlar ertesi gün dersi buna göre yazar."],
   ["Bir gün aksattım.","Sorun değil. 'Joker' haftada bir günü korur. Ertesi gün kaldığın yerden devam edersin; sistem seni cezalandırmaz."],
   ["Veriler kayboldu mu?","Hayır; her şey bu sayfanın veritabanında durur. Sayfa boş görünürse yenile ve internete bağlı olduğundan emin ol."],
   ["Telefonda mı bilgisayarda mı?","İkisinde de aynı. Telefonda alttaki menü, bilgisayarda üstteki menü kullanılır."]];
  return h("div",{class:"panel"},h("h2",null,"Takılırsan"),q.map(function(x){return h("details",{class:"faq"},h("summary",null,x[0]),h("p",null,x[1]))}));
}
function renderGuide(){
  var out=[];
  out.push(tourPanel());out.push(guideManual());
  out.push(h("div",{class:"panel"},h("div",{class:"label"},"Rehber"),h("h2",null,"Burada nasıl öğrenirsin?"),
    h("div",{class:"small mute"},"Acele yok. Günde 15-20 dakika yeter. Önemli olan her gün azıcık yapmak."),
    guideStep(1,"Bugün ekranını aç","Büyük düğme sana sıradaki işi söyler. Başka bir şey aramana gerek yok."),
    guideStep(2,"Dersi oku","Önce Isınma (5 dk): geçen dersi hatırlarsın. Sonra Anlatım: günlük hayattan örneklerle konu. Anlamadığın kelimeye Sözlük'ten bak."),
    guideStep(3,"Mini sınavı çöz","Yanlış yapmak serbest. Yanlış cevapta kartın arkası doğrusunu ve nedenini gösterir; öğrenmenin asıl yeri orasıdır."),
    guideStep(4,"Kendi cümlenle anlat","Bir şeyi başkasına anlatabiliyorsan öğrenmişsindir. Anlatamadığın yer ertesi gün yeniden karşına çıkar."),
    guideStep(5,"İstersen daha fazlası","Proje, Mülakat ve Lig tamamen isteğe bağlıdır. Bunları 'Sade mod' ile gizleyebilirsin."),
    h("div",{class:"row"},h("button",{class:"btn",type:"button",onclick:function(){setSeen();goTab("bugun")}},"Bugün ekranına git"),h("button",{class:"btn ghost",type:"button",onclick:function(){goTab("ayar")}},"Yazıyı büyüt / Sade mod"))));
  out.push(h("div",{class:"panel"},h("h2",null,"Oyun kelimeleri ne demek?"),h("div",{class:"small mute"},"Ekranda gördüğün bazı sözler oyun dilidir. Hepsi basit:"),
    h("div",{class:"gl-list"},["XP","Seri","Joker","Pas","Bina","Semt","Isınma","Koç","Müdür","Lig"].map(function(k){var g=GLOS.filter(function(x){return x[0]===k})[0];return g?h("div",{class:"gl-i"},h("b",null,g[1]),h("p",null,g[3])):null}))));
  out.push(timesPanel());out.push(faqPanel());if(!S.guest&&typeof calendarBlock==='function')out.push(calendarBlock());
  return out;
}
function pfSeg(label,vals,cur,fn){
  return h("div",{class:"pf-r"},h("b",null,label),h("div",{class:"seg",role:"group","aria-label":label},vals.map(function(v){return h("button",{type:"button","aria-pressed":cur===v[0]?"true":"false",onclick:function(){fn(v[0])}},v[1])})));
}
function renderSettings(){
  return [syncPanel(),h("div",{class:"panel"},h("div",{class:"label"},"Rahat okuma"),h("h2",null,"Ekranı sana göre ayarla"),
    h("div",{class:"small mute"},"Bu ayarlar sadece bu cihazda geçerlidir ve hemen uygulanır."),
    pfSeg("Yazı boyu",[[0,"Normal"],[1,"Büyük"],[2,"Çok büyük"]],S.pf.fs,function(v){S.pf.fs=v;savePf()}),
    pfSeg("Tema",[["auto","Otomatik"],["light","Açık"],["dark","Koyu"]],themeGet(),themeSet),
    pfSeg("Sade mod",[[false,"Kapalı"],[true,"Açık"]],S.pf.simple,function(v){S.pf.simple=v;savePf()}),
    h("div",{class:"small mute"},"Sade mod: sadece Bugün, Ders ve Sınıf kalır. Oyun öğeleri, Lig, Proje, Mülakat gizlenir; ekran sakinleşir."),
    pfSeg("Yüksek kontrast",[[false,"Kapalı"],[true,"Açık"]],S.pf.hc,function(v){S.pf.hc=v;savePf()}),
    pfSeg("Öğrenme temposu",[["rahat","Rahat"],["normal","Normal"],["hizli","Hızlı"]],S.pf.pace,function(v){S.pf.pace=v;savePf()}),
    pfSeg("Özetimi arkadaşlara göster",[[true,"Göster"],[false,"Gizle"]],S.pf.share,function(v){S.pf.share=v;savePf();if(!v)syncLeagueMe()}),
    h("div",{class:"small mute"},"Lig'deki arkadaşların sıranı, XP'ni ve serini görebilir. Gizlersen sadece Lig puanın görünür. Dersin, notların ve projelerin zaten sadece sana aittir."),
    h("div",{class:"small mute"},"Rahat: her ders daha kısa, günde bir yeni kavram, daha çok tekrar. Koçlar dersleri buna göre yazar.")),
    h("div",{class:"panel"},h("h2",null,"Yardım"),h("div",{class:"row"},h("button",{class:"btn ghost",type:"button",onclick:function(){goTab("rehber")}},"Başlangıç rehberi"),h("button",{class:"btn ghost",type:"button",onclick:function(){goTab("sozluk")}},"Sözlük"),h("button",{class:"btn ghost",type:"button",onclick:function(){goTab("kaynakca")}},"Kaynakça")))].concat(renderReset()).concat(typeof renderGuven==="function"?[renderGuven()]:[]).concat(typeof renderGeriBildirim==="function"?[renderGeriBildirim()]:[]);
}
function welcomeCard(){
  if(seenWelcome()||S.guest||S.days.length>2)return null;
  return h("div",{class:"panel welcome"},h("div",{class:"label"},"Hoş geldin"),h("h2",null,"Burası öğrenme yerin"),
    h("p",{style:"margin:0"},"Ağ bilgisi ve İngilizceyi sıfırdan, günde birkaç dakikayla öğreneceksin. Önce 1 dakikalık rehbere bak, istersen ekranı da sadeleştir."),
    h("div",{class:"row"},h("button",{class:"btn",type:"button",onclick:function(){setSeen();goTab("rehber")}},"Rehberi gör"),
      h("button",{class:"btn ghost",type:"button",onclick:function(){setSeen();S.pf.simple=true;savePf()}},"Sade modda başla"),
      h("button",{class:"btn ghost",type:"button",onclick:function(){setSeen();draw()}},"Şimdilik geç")));
}
function renderSimpleToday(){
  var steps=routeSteps(),nxt=steps.filter(function(x){return !x.d})[0],done=steps.filter(function(x){return x.d}).length,out=[];
  var w=welcomeCard();if(w)out.push(w);
  if(S.pl.on)out.push(plPanel());
  out.push(h("div",{class:"panel sim-now"},h("div",{class:"label"},"Şimdi şunu yap"),
    nxt?[h("h2",null,nxt.t),nxt.note?h("div",{class:"small mute"},nxt.note):null,h("button",{class:"btn big",type:"button",onclick:function(){(nxt.go||nxt.toggle)()}},nxt.b==="Aç"?"Dersi aç":nxt.b==="Çöz"?"Soruları çöz":nxt.b)]:
      [h("h2",null,"Bugünkü işler tamam"),h("p",{style:"margin:0"},"Harikasın. Yarın yeni dersin hazır olacak.")]));
  var ppn2=renderPersonal();if(ppn2)out.push(ppn2);
  out.push(h("div",{class:"panel"},h("div",{style:"display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;align-items:center"},h("h2",null,"Bugünün işleri"),h("span",{class:"pill"},done+" / "+steps.length)),
    h("div",{class:"xpbar"},h("i",{style:"width:"+(done/steps.length*100)+"%"})),
    h("div",{class:"sim-l"},steps.map(function(s){return h("div",{class:"sim-i"+(s.d?" d":"")},h("span",{class:"sim-c"},s.d?"✓":""),h("span",null,s.t),s.d?null:h("button",{class:"btn ghost",type:"button",onclick:function(){(s.go||s.toggle)()}},s.b))}))));
  out.push(h("div",{class:"panel"},h("div",{class:"row"},h("button",{class:"btn ghost",type:"button",onclick:function(){goTab("rehber")}},"Nasıl çalışır?"),h("button",{class:"btn ghost",type:"button",onclick:function(){goTab("sozluk")}},"Sözlük"),h("button",{class:"btn ghost",type:"button",onclick:function(){goTab("ayar")}},"Ayarlar"))));
  return out;
}

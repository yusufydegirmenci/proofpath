"use strict";
/* ALAN: Seviye sınavı (yerleştirme), tüm veri sıfırlama ve kılavuz.
   NE YAPAR: Çırak/Kalfa/Usta seviyesini belirler ve saklar; sıfırlama kapsam seçimiyle yerel anahtarları siler; kılavuz el kitabını çizer.
   SORUN OLURSA: localStorage ya_lv, ya_rs; RS_LS listesindeki ya_* anahtarları sıfırlamada silinir; sınav sonucu PP.ogr.sunucu üzerinden; TRK_LIST ve syncPush küresel olarak önceden yüklenmiş olmalı (index.html'de son betiklerden).
   YENİ ÖZELLİK: Yeni yerel anahtar RS_LS'e eklenir (sıfırlama kapsamı); tests/t60d_lv.js, t59b_reset.js, hesaplar.js, ogrenme.js güncellenir. */
/* ---- v59: seviye sınavı, sıfırlama, kılavuz ---- */
var RS_KEY="ya_rs",LV_KEY="ya_lv",LV_NAMES=["Henüz belli değil","Çırak","Kalfa","Usta"],LV_TR=TRK_LIST;
function rsLoad(){try{var o=JSON.parse(localStorage.getItem(RS_KEY)||"null");return o&&typeof o==="object"?o:{}}catch(e){return {}}}
function lvLoad(){try{var o=JSON.parse(localStorage.getItem(LV_KEY)||"null");return o&&typeof o==="object"?o:{}}catch(e){return {}}}
function lvSave(o){try{localStorage.setItem(LV_KEY,JSON.stringify(o))}catch(e){}try{syncPush()}catch(e){}}
function lvOf(tr){var o=lvLoad()[tr];return o&&o.l?o:null}
var RS_LS=["ya_atlas","ya_cards","ya_gq","ya_gs","ya_lc","ya_nt","ya_nw","ya_pl","ya_vd","ya_fk","ya_gm","ya_lv"];
function rsWipe(scope){
  PY_EL={};
  try{
    if(scope==="all"){
      RS_LS.forEach(function(k){try{localStorage.removeItem(k)}catch(e){}});
      try{PP.ogr.depo.sifirla()}catch(e){}   /* Faz 4: öğrenme modeli kayıtları (ya_pp_ogr) yalnız bu "Tümünü sıfırla" eyleminde silinir */
      GS.sk=trkMap(1.5);GS.bx={};GS.st={};GS.ts="";
      S.gm.sk={run:"stj",drive:"std"};S.gm.ps={};S.fk=null;S.les.mark={};S.les.pick={};S.les.rev={};S.les.room=null;S.nw.open=null;S.nw.pick={};
    }else{
      var o=lcLoad();Object.keys(o).forEach(function(k){if(k.charAt(0)!=="_"&&keyTrack(k)===scope)delete o[k]});localStorage.setItem(LC_KEY,JSON.stringify(o));
      QB.forEach(function(q,i){if(q.t===scope){delete GS.bx[i];delete GS.st[i]}});GS.sk[scope]=1.5;GS.ts=new Date().toISOString();localStorage.setItem("ya_gs",JSON.stringify(GS));
      var lv=lvLoad();delete lv[scope];localStorage.setItem(LV_KEY,JSON.stringify(lv));S.les.room=null;
    }
  }catch(e){}
}
function rsApplyRemote(r){
  if(!r||typeof r!=="object")return false;var loc=rsLoad(),ch=false;
  Object.keys(r).slice(0,10).forEach(function(k){if(k!=="all"&&TRKS.indexOf(k)<0)return;var t=String(r[k]);if(t>String(loc[k]||"")){rsWipe(k);loc[k]=t;ch=true}});
  if(ch)try{localStorage.setItem(RS_KEY,JSON.stringify(loc))}catch(e){}
  return ch;
}
function rsRun(scope){
  var R=S.rs;R.busy=true;R.msg="Yedek hazırlanıyor…";draw();
  var now=new Date().toISOString(),bk={uyari:"Bu dosya geri bildirim metinlerini de içerir; paylaşmadan önce kontrol et.",at:now,scope:scope,progress:S.progress,days:S.days,attempts:S.attempts.slice(0,400),mistakes:S.mistakes,badges:S.badges,lc:lcLoad(),gs:GS,lv:lvLoad(),fk:fkLoad(),nw:nwLoad(),ogr:(function(){try{return PP.ogr.depo.oku()}catch(e){return null}})()};
  try{if(S.dl)S.dl.save({filename:PP_MARKA.dosya+"-yedek-"+today()+".json",data:new Blob([JSON.stringify(bk)],{type:"application/json"})}).catch(function(){})}catch(e){}
  var jobs=[];
  if(S.db&&S.canWrite){
    if(scope==="all"){
      [["progress",S.progress],["days",S.days],["attempts",S.attempts],["mistakes",S.mistakes],["badges",S.badges]].forEach(function(p){(p[1]||[]).forEach(function(d){if(d&&d.id)jobs.push(function(){return S.db.doc(p[0]+"/"+d.id).delete()})})});
      if(S.me&&!S.guest)jobs.push(function(){return S.db.doc("league/"+S.me).delete()});
    }else{(S.attempts||[]).forEach(function(d){if(d&&d.id&&d.track===scope)jobs.push(function(){return S.db.doc("attempts/"+d.id).delete()})})}
    var byT={};(S.topics||[]).forEach(function(t){if(t&&t.id&&(scope==="all"||t.track===scope)){(byT[t.track]=byT[t.track]||[]).push(t)}});
    Object.keys(byT).forEach(function(tr){byT[tr].sort(function(a,b){return num(a.order)-num(b.order)}).forEach(function(t,i){jobs.push(function(){return S.db.doc("topics/"+t.id).update({status:i===0?"next":"locked",mastery:0,lastReview:null})})})});
  }
  rsWipe(scope);var loc=rsLoad();loc[scope]=now;try{localStorage.setItem(RS_KEY,JSON.stringify(loc))}catch(e){}
  var done=0,fail=0;R.msg="Siliniyor… 0/"+jobs.length;
  function next(){
    if(!jobs.length){
      R.busy=false;R.confirm=null;R.msg="Sıfırlandı. Yeni baştan başlayabilirsin."+(fail?" ("+fail+" kayıt silinemedi)":"");
      try{if(S.db&&S.canWrite&&!S.guest){var o=syncOut();o.rs=loc;o.ts=now;S._syncLast="";S.db.doc("prefs/sync").set(o).catch(function(){})}}catch(e){}
      draw();return}
    var j=jobs.shift();done++;if(done%10===0){R.msg="Siliniyor… "+done+"/"+(done+jobs.length);draw()}
    try{j().then(next,function(){fail++;next()})}catch(e){fail++;next()}
  }
  next();
}
S.rs=S.rs||{confirm:null,busy:false,msg:""};
function renderReset(){
  var R=S.rs,tracks=LV_TR.filter(function(t){return t[0]!=="py"&&t[0]!=="js"});
  var lvRows=tracks.map(function(t){var v=lvOf(t[0]);return h("div",{class:"lv-r"},h("div",null,h("b",null,t[1]),h("small",null,v?"Kademe: "+LV_NAMES[v.l]+" · sınav "+v.s+"/"+v.m+" · "+v.d:"Seviye sınavı yapılmadı")),
    h("button",{class:"btn ghost",type:"button",onclick:function(){peStart(t[0])}},v?"Yeniden gir":"Sınava gir"))});
  var box=[h("div",{class:"panel"},h("div",{class:"label"},"Kademe"),h("h2",null,"Seviye sınavı"),h("div",{class:"small mute"},"Bir alanda 10 soruluk sınava gir. Sonuç kademeni belirler: Çırak, Kalfa ya da Usta. Oyundaki soru zorluğu da buna göre başlar."),lvRows)];
  var rb=h("div",{class:"panel rs-p"},h("div",{class:"label"},"Dikkat"),h("h2",null,"Gelişimi sıfırla"),h("div",{class:"small mute"},"Test için yaptığın kayıtları silip yeni baştan başlayabilirsin. Dersler ve koçların yazdığı içerik silinmez, sadece senin ilerlemen silinir."));
  if(R.busy)rb.append(h("div",{class:"lbox"},h("p",{style:"margin:0"},R.msg||"Çalışıyor…")));
  else if(R.confirm){
    var all=R.confirm==="all",nm=all?"HER ŞEYİ":(tracks.filter(function(t){return t[0]===R.confirm})[0]||[0,R.confirm])[1]+" alanını";
    rb.append(h("div",{class:"lbox warn"},h("div",{class:"label"},"Emin misin?"),h("p",null,nm+" sıfırlamak üzeresin. "+(all?"XP, seri, rozetler, günlük kayıtlar, ders adımları, oyun ve Fetih ilerlemesi, kavram atlası, notların kaydı silinir. Önce yedek dosyası indirilir (geri bildirim metinlerini de içerir; paylaşırsan onlar da gider). Arkadaş ekranında Lig kaydın da silinir. Bu işlem geri alınamaz.":"Bu alandaki ders adımları, oyun soru geçmişin, kademen ve alıştırma kayıtların silinir. XP kalır. Geri alınamaz."))),
      h("div",{class:"row"},h("button",{class:"btn rs-go",type:"button",onclick:function(){rsRun(R.confirm)}},"Evet, sıfırla"),h("button",{class:"btn ghost",type:"button",onclick:function(){R.confirm=null;draw()}},"Vazgeç")))}
  else{
    rb.append(h("div",{class:"row"},tracks.map(function(t){return h("button",{class:"btn ghost",type:"button",onclick:function(){R.confirm=t[0];draw()}},t[1]+" sıfırla")}),h("button",{class:"btn ghost rs-all",type:"button",onclick:function(){R.confirm="all";draw()}},"Hepsini sıfırla")));
    if(R.msg)rb.append(h("div",{class:"lbox"},h("p",{style:"margin:0"},R.msg)))}
  box.push(rb);return box;
}
/* seviye sınavı (Faz 9 sunucu): sorular content/sinav/seviye.js (cevapsız); puanı ve doğru sayısını sunucu verir, kademe sunucu oranından hesaplanır. */
S.pe=null;
function peKaynak(tr){var X=window.PP_SINAV&&window.PP_SINAV.seviye;return X&&X[tr]&&Array.isArray(X[tr].sorular)&&X[tr].sorular.length>=6?X[tr]:null}
function peStart(tr){
  var X=peKaynak(tr);
  if(!X){S.pe={tr:tr,err:"Bu alanda yeterli soru yok."};S.les.view="lv";goTab("ders");return}
  S.pe={tr:tr,hedef:X.hedef,varyant:X.varyant,qs:X.sorular.map(function(q){return {id:q.id,q:q.q,o:q.o.slice(),d:q.d}}),i:0,ans:[],busy:false,hata:null,res:null,done:false};
  S.les.view="lv";S.les.room=null;goTab("ders");
}
function peAnswer(j){var P=S.pe;if(!P||P.busy||P.done)return;P.ans[P.i]=j;P.hata=null;draw()}
function peGonder(){
  var P=S.pe;if(!P||P.busy)return;
  var cev=PP.ogr.sunucu.cevaplar(P.qs,P.ans,"o");
  if(!cev){P.hata=PP.ogr.sunucu.MESAJ.gecersiz;draw();return}
  P.busy=true;P.hata=null;draw();
  PP.ogr.sunucu.gonder({hedef:P.hedef,varyant:P.varyant,cevaplar:cev}).then(function(r){
    P.busy=false;
    if(!r.ok){P.hata=r.mesaj;draw();return}
    P.res=r;P.done=true;P.ok=r.dogruSayisi!=null?r.dogruSayisi:null;P.sc=r.puan;P.mx=r.maks;
    var l=PP.ogr.ustalik.seviyeSinavDuzeyi(r.oran);P.l=l;
    var lv=lvLoad();lv[P.tr]={l:l,s:P.sc,m:P.mx,d:today()};lvSave(lv);
    try{GS.sk[P.tr]=PP.ogr.ustalik.SEVIYE_BECERI[l];gsSave()}catch(e){}
    draw();window.scrollTo(0,0);
  },function(){P.busy=false;P.hata=PP.ogr.sunucu.MESAJ.hata;draw()});
}
function peNext(){
  var P=S.pe;if(!P||P.ans[P.i]==null||P.busy)return;
  if(P.i+1>=P.qs.length){peGonder();return}
  P.i++;draw();window.scrollTo(0,0);
}
function renderPe(){
  var P=S.pe,tn=P?(LV_TR.filter(function(t){return t[0]===P.tr})[0]||[0,P.tr])[1]:"";
  if(!P||P.err)return [h("div",{class:"panel"},h("p",null,P&&P.err||"Sınav bulunamadı."),h("button",{class:"btn",type:"button",onclick:function(){S.pe=null;S.les.view="ders";draw()}},"Geri dön"))];
  if(P.done){
    var an=P.res&&P.res.anahtar;
    return [h("div",{class:"panel pe-res","data-sunucu":"dogrulandi"},h("div",{class:"label"},tn+" seviye sınavı"),h("h2",null,"Kademen: "+LV_NAMES[P.l]),h("div",{class:"pe-st"},[1,2,3].map(function(i){return h("i",{class:i<=P.l?"on":""},"★")})),
      h("div",{class:"gm-grid"},[["Doğru",(P.ok!=null?P.ok:"?")+"/"+P.qs.length],["Puan (sunucu)",P.sc+"/"+P.mx]].map(function(a){return h("div",{class:"kcell"},h("small",{class:"mute"},a[0]),h("b",{class:"mono"},String(a[1])))})),
      h("p",{class:"small"},P.l===3?"Güçlü bir temel var. Oyunlarda sorular zor başlayacak, derslerde üst konulara bakabilirsin.":P.l===2?"Orta düzeydesin. Oyunlarda sorular orta zorlukta başlar, boşlukları derslerle kapat.":"Temelden başlıyoruz. Oyunlarda sorular kolay başlar, dersleri sırayla yap."),
      an?h("details",{class:"small","data-cevap-anahtari":"1"},h("summary",null,"Doğru cevaplar ve nedenleri (sunucu açtı: %80 ve üzeri)"),P.qs.map(function(q,i){var a=an[q.id];return a?h("div",{style:"margin:6px 0"},h("b",null,(i+1)+". "+q.q),h("div",null,"Doğru: "+a.dogru+(a.ok?" ✓":"")),a.why?h("div",{class:"mute"},a.why):null):null})):h("p",{class:"small mute"},"Doğru cevaplar %80 ve üzeri puanda sunucudan açılır; seviye sınavı yeniden girilebilir."),
      h("div",{class:"row"},h("button",{class:"btn",type:"button",onclick:function(){S.pe=null;S.les.view="ders";draw()}},"Derslere dön"),h("button",{class:"btn ghost",type:"button",onclick:function(){S.pe=null;goTab("ayar")}},"Ayarlara dön")))];
  }
  var q=P.qs[P.i],pk=P.ans[P.i],son=P.i+1>=P.qs.length;
  return [h("div",{class:"lr-head"},h("button",{type:"button",class:"btn ghost",onclick:function(){S.pe=null;S.les.view="ders";draw()}},"‹ Çık"),h("span",{class:"pill"},(P.i+1)+" / "+P.qs.length)),
    h("div",{class:"panel","data-sunucu-sinav":"seviye"},h("div",{class:"label"},tn+" seviye sınavı"),h("div",{class:"xpbar"},h("i",{style:"width:"+(P.i/P.qs.length*100)+"%"})),
      h("div",{class:"qz"},h("div",{class:"qz-h"},h("span",{class:"qz-n"},String(P.i+1)),h("span",{class:"qz-q"},q.q)),
        h("div",{class:"qz-os"},q.o.map(function(o,j){if(!o)return null;
          return h("button",{type:"button",class:"qz-o",style:pk===j?"box-shadow:inset 0 0 0 2px var(--accent,#4da3ff)":null,"aria-pressed":pk===j?"true":"false",disabled:P.busy,onclick:function(){peAnswer(j)}},h("b",null,String.fromCharCode(65+j)),h("span",null,o),pk===j?h("i",{"aria-hidden":"true"},"●"):null)}))),
      P.hata?h("div",{class:"lbox warn",role:"status","data-sunucu":"hata"},h("p",{style:"margin:0"},P.hata)):null,
      P.busy?h("div",{class:"small mute",role:"status"},"Sunucuda puanlanıyor…"):h("button",{class:"btn big",type:"button",disabled:pk==null,onclick:peNext,"data-pe-ileri":"1"},son?(P.hata?"Yeniden gönder":"Bitir ve sunucuya gönder"):"Sıradaki soru"),
      h("div",{class:"small mute"},"Bilmediğin soruda tahmin et; sınav seviyeni ölçmek için. Cevaplar sonda sunucuda puanlanır (çevrimdışı ya da hesapsızken kademe belirlenmez)."))];
}
var GUIDE_M=[
["Bugün","Her gün buradan başla",["Alttaki menüden <b>Bugün</b> sekmesine bas.","Büyük düğme sana sıradaki işi söyler. <b>Başla</b>ya bas, bitince bir sonrakine geç.","Hepsi bitince günün XP'si ve serin otomatik yazılır."]],
["Ders","Dersi gerçek ders gibi çalış",["Alt menüden <b>Ders</b> sekmesine gir.","<b>Derse gir</b> düğmesine bas: ders odası açılır.","Üstteki adımları sırayla yap: <b>Isınma → Anlatım → Mini sınav → Alıştırma → Notlar</b>.","Mini sınavda şıklara dokun: doğruysa <b>yeşil</b>, yanlışsa <b>kırmızı</b> yanar ve nedeni yazar.","Yanlış yaptığın sorular ertesi gün tekrar karşına çıkar. Sonunda <b>Notlar</b> adımında dersin özeti vardır."]],
["Animasyon Atölyesi","Hareketli sahnelerle öğren",["<b>Ders</b> sekmesinde üstteki <b>Animasyon Atölyesi</b> düğmesine bas. Üstten dersini seç.","Bir konu seç, <b>Oynat</b>a bas. Sahneyi izle, noktalardan istediğin adıma geç.","Altındaki 2 soruyu çöz. İkisi de doğruysa konu <b>tamam</b> sayılır."]],
["Seviye sınavı","Kademeni belirle",["Üst menüden <b>Daha fazla → Ayarlar</b> sayfasına git.","<b>Seviye sınavı</b> bölümünde alanını seç ve <b>Sınava gir</b>e bas.","10 soruyu çöz. Sonuç <b>Çırak, Kalfa ya da Usta</b> kademeni belirler; oyunlar buna göre başlar."]],
["Oyunlar","Koş, sür, soru çöz",["Alt menüden <b>Oyun</b> sekmesine gir.","<b>Arcade</b>: bir tür seç (Günlük, Patron, Sonsuz). Kaydır ya da <b>Sol/Sağ</b> tuşlarıyla şerit değiştir. Kapıda soruyu okuyup cevabına dokun.","<b>Sonsuz Sefer</b>: can bitene kadar oynarsın. Her 8 doğruda kademe atlar, sorular zorlaşır.","<b>Dino</b>: zıpla (dokun ya da Boşluk), eğil (aşağı kaydır), bilgi kapısında soruyu çöz.","<b>Fetih</b>: tarihî seferde komşu butonlarına dokunarak saldır. Altınla külliye yükselt, diplomasi yap."]],
["Fetih ve Günün meydanı","Strateji oyunu ve günlük skor tablosu",["<b>Oyun → Fetih</b> sekmesine gir.","Üstteki <b>Günün meydanı</b> kartı herkes için aynı koşuldur. <b>Günün meydanını oyna</b>ya bas; skorun, Lig'e katılmış arkadaşlarınla birlikte tabloda görünür.","Bir sefere çıkarken <b>doktrin</b>, <b>komutan</b> seç ve <b>Seferi başlat</b>a bas. Bir seferi iki kez kaybedersen <b>Yardım modu</b> açılır."]],
["Oyun geri bildirimi","Oyunu nasıl bulduğunu not et",["Her oyun sekmesinin altında <b>Bu bölümü nasıl buldun?</b> kutusunu aç.","😀, 😐 ya da 😞 düğmesine bas; istersen kısa bir not yaz ve <b>Notu kaydet</b>e bas.","Hepsi <b>Oyun → Görevler</b> sekmesinde toplanır. Bu bilgiler yalnız bu cihazda durur."]],
["Notlarım","Kendi defterini tut",["<b>Ders → Notlar</b> bölümüne gir.","<b>Kendi notum</b> düğmesine bas, yaz, kaydet. Notun defter sayfası gibi görünür."]],
["Okuma, Masa, Ofis","Gerçek iş hayatı gibi alıştırma",["<b>Daha fazla</b> menüsünden <b>Masa</b>'yı aç: müşteri talepleri gelir. Nazik ve doğru cevap ver, ruh hâli değişir.","<b>Okuma</b>: kısa İngilizce metin oku, kelimeye dokununca anlamı çıkar."]],
["Arkadaşınla eşitleme","Evdeki ve işteki bilgisayarda aynı ilerleme",["<b>Ayarlar</b>'ın en üstündeki <b>Eşitleme</b> bölümüne bak.","Aynı hesapla açtığında ilerlemen otomatik gelir.","Arkadaşın kendi sayfasını açınca <b>Lig</b>'de seni görür."]],
["Sıfırlama","Baştan başlamak istersen",["<b>Ayarlar → Gelişimi sıfırla</b>.","Bir alan ya da <b>Hepsini sıfırla</b> seç, <b>Evet, sıfırla</b>ya bas. Önce yedek dosyası inmeye çalışır; geri bildirim metinlerini de içerir, paylaşmadan önce kontrol et.","Dersler silinmez, sadece senin ilerlemen silinir."]]
];
function guideManual(){
  return h("div",{class:"panel gd-man"},h("div",{class:"label"},"Kılavuz"),h("h2",null,"Uygulama nasıl kullanılır?"),h("div",{class:"small mute"},"Her başlığa dokun, adımları sırayla yap."),
    GUIDE_M.map(function(g,i){return h("details",{class:"gd-d",open:i===0},h("summary",null,h("b",null,g[0]),h("small",null,g[1])),h("ol",{class:"gd-o"},g[2].map(function(t){var li=document.createElement("li");li.innerHTML=t;return li})))}));
}

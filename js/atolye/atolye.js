"use strict";
/* ---- v27 Atölye: program, alıştırma, kelimeler, kütüphane, defter, analiz ---- */
var WORDS=[
["bug","yazılım hatası","bağ","I found a bug in the login page.","Giriş sayfasında bir hata buldum."],
["fix","düzeltmek","fiks","I will fix it today.","Bugün düzelteceğim."],
["issue","sorun, kayıt","işu","Please open an issue on GitHub.","Lütfen GitHub'da bir kayıt aç."],
["request","istek","rikuest","The server sends a response to the request.","Sunucu isteğe cevap gönderir."],
["response","cevap","rispons","The response is in JSON.","Cevap JSON biçiminde."],
["error","hata","erır","The error message is clear.","Hata mesajı net."],
["test","test; denemek","test","Did you test the form?","Formu test ettin mi?"],
["deploy","yayına almak","dîploy","We deploy every Friday.","Her cuma yayına alıyoruz."],
["release","sürüm; yayınlamak","rilis","The new release is ready.","Yeni sürüm hazır."],
["update","güncelleme; güncellemek","apdeyt","Please update the app.","Lütfen uygulamayı güncelle."],
["install","kurmak","insto:l","I installed Python yesterday.","Dün Python kurdum."],
["password","şifre","pas-wörd","Reset your password.","Şifreni sıfırla."],
["username","kullanıcı adı","yuzır-neym","Enter your username.","Kullanıcı adını gir."],
["account","hesap","ıkaunt","I created an account.","Bir hesap oluşturdum."],
["access","erişim","aksıs","I don't have access to the server.","Sunucuya erişimim yok."],
["permission","izin, yetki","pırmişın","You need permission to open it.","Açmak için izne ihtiyacın var."],
["network","ağ","netwörk","The network is down.","Ağ çalışmıyor."],
["connection","bağlantı","kınekşın","The connection is slow.","Bağlantı yavaş."],
["server","sunucu","sörvır","The server is not responding.","Sunucu cevap vermiyor."],
["database","veritabanı","deytabeys","Data is stored in the database.","Veri veritabanında saklanır."],
["file","dosya","fayl","Send me the file.","Dosyayı bana gönder."],
["folder","klasör","foldır","Open the folder.","Klasörü aç."],
["backup","yedek","bekap","Make a backup first.","Önce yedek al."],
["screen","ekran","skrin","Send a screenshot of the screen.","Ekranın görüntüsünü gönder."],
["button","düğme","batın","Click the button.","Düğmeye tıkla."],
["click","tıklamak","klik","Click Save.","Kaydet'e tıkla."],
["browser","tarayıcı","brauzır","Try another browser.","Başka bir tarayıcı dene."],
["page","sayfa","peyc","The page is blank.","Sayfa boş."],
["feature","özellik","fi:çır","We added a new feature.","Yeni bir özellik ekledik."],
["requirement","gereksinim","rikwayırmınt","The requirement is not clear.","Gereksinim net değil."],
["task","görev","task","This task takes two hours.","Bu görev iki saat sürer."],
["deadline","son tarih","dedlayn","The deadline is Friday.","Son tarih cuma."],
["meeting","toplantı","mi:ting","The meeting starts at ten.","Toplantı ona başlıyor."],
["schedule","program, takvim","skecul","Let's schedule a call.","Bir görüşme planlayalım."],
["ticket","iş kaydı, bilet","tikıt","I opened a ticket.","Bir kayıt açtım."],
["priority","öncelik","prayoriti","This is high priority.","Bu yüksek öncelikli."],
["review","incelemek; inceleme","rivyu","Please review my code.","Lütfen kodumu incele."],
["feedback","geri bildirim","fi:dbek","Thanks for the feedback.","Geri bildirim için teşekkürler."],
["improve","geliştirmek","impruv","We want to improve speed.","Hızı geliştirmek istiyoruz."],
["support","destek","sıport","I work in IT support.","BT desteğinde çalışıyorum."],
["customer","müşteri","kastımır","The customer called us.","Müşteri bizi aradı."],
["report","rapor; raporlamak","ripo:t","Send me the report.","Raporu bana gönder."],
["data","veri","deytı","The data is correct.","Veri doğru."],
["secure","güvenli","sikyur","The site is secure.","Site güvenli."],
["attack","saldırı","ıtak","They blocked the attack.","Saldırıyı engellediler."],
["encrypt","şifrelemek","inkript","We encrypt the data.","Veriyi şifreliyoruz."],
["skill","beceri","skil","Communication is a key skill.","İletişim önemli bir beceri."],
["experience","deneyim","ikspiriyıns","I have one year of experience.","Bir yıllık deneyimim var."],
["improve","geliştirmek","impruv","I want to improve my English.","İngilizcemi geliştirmek istiyorum."],
["available","müsait, erişilebilir","ıveylıbıl","Are you available at three?","Saat üçte müsait misin?"],
["Could you...?","...yapar mısınız? (nazik)","kud yu","Could you send it again?","Tekrar gönderebilir misiniz?"]
];
WORDS=WORDS.filter(function(w,i,a){return a.findIndex(function(x){return x[0]===w[0]})===i});
var LIB=[
{g:"CCNA",t:"Cisco CCNA sınav sayfası",u:"https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccna.html",ty:"Resmî sayfa",lv:"hedef",lang:"EN",len:"referans",why:"Sınavın resmî konu listesi ve ağırlıkları. Çalışmanı buna göre planla.",v:1},
{g:"CCNA",t:"Cisco Packet Tracer",u:"https://www.netacad.com/cisco-packet-tracer",ty:"Araç",lv:"başlangıç",lang:"EN",len:"ücretsiz",why:"Sanal ağ kurup router ve switch'i denersin. Lab yapmadan CCNA oturmaz.",v:1},
{g:"CCNA",t:"NetAcad: Networking Basics",u:"https://www.netacad.com/courses/networking-basics",ty:"Kurs",lv:"başlangıç",lang:"EN",len:"kendi hızında",why:"Cisco'nun kendi giriş kursu. Sıfırdan başlayanlar için.",v:1},
{g:"CCNA",t:"Professor Messer (Network+ N10-009)",u:"https://www.professormesser.com/",ty:"Video",lv:"başlangıç",lang:"EN",len:"ücretsiz",why:"CCNA değil Network+ ama temel ağ kavramlarını net anlatır. CCNA'ya ek temel olarak kullan.",v:1},
{g:"CCNA",t:"Wireshark belgeleri",u:"https://www.wireshark.org/docs/",ty:"Doküman",lv:"orta",lang:"EN",len:"referans",why:"Paketleri kendi gözünle görmek ağı anlamanın en hızlı yolu.",v:0},
{g:"İngilizce",t:"British Council LearnEnglish",u:"https://learnenglish.britishcouncil.org/",ty:"Site",lv:"A1–C1",lang:"EN",len:"ücretsiz",why:"Seviyeye göre ders, dinleme ve dilbilgisi. Güvenilir ve düzenli.",v:1},
{g:"İngilizce",t:"Cambridge English: Learning English",u:"https://www.cambridgeenglish.org/learning-english/",ty:"Site",lv:"A1–C2",lang:"EN",len:"ücretsiz",why:"Sınav kurumunun kendi alıştırmaları. Seviye testi de var.",v:1},
{g:"İngilizce",t:"ELLLO",u:"https://www.elllo.org/",ty:"Dinleme",lv:"A2–B2",lang:"EN",len:"kısa kayıtlar",why:"Farklı aksanlardan gerçek konuşmalar; her kayıtta metin ve soru var.",v:1},
{g:"Siber",t:"TryHackMe",u:"https://tryhackme.com/",ty:"Lab",lv:"başlangıç",lang:"EN",len:"oyunlaştırılmış",why:"Tarayıcıda güvenli laboratuvarlar. Adım adım yönlendirir.",v:1},
{g:"Siber",t:"OWASP Juice Shop",u:"https://owasp.org/www-project-juice-shop/",ty:"Uygulama",lv:"orta",lang:"EN",len:"proje",why:"Bilerek açıklı bir web uygulaması. Saldırıyı anlayıp savunmayı öğrenirsin.",v:1},
{g:"Siber",t:"MITRE ATT&CK",u:"https://attack.mitre.org/",ty:"Referans",lv:"orta",lang:"EN",len:"referans",why:"Saldırganların yöntemlerinin ortak sözlüğü.",v:1},
{g:"Test / QA",t:"ISTQB Foundation Level",u:"https://www.istqb.org/certifications/certified-tester-foundation-level",ty:"Sertifika",lv:"başlangıç",lang:"EN",len:"müfredat",why:"Test mesleğinin ortak dili: test türleri, teknikler, hata raporu.",v:1},
{g:"Test / QA",t:"Playwright (Python)",u:"https://playwright.dev/python/",ty:"Doküman",lv:"orta",lang:"EN",len:"kurulumdan test yazmaya",why:"Web testlerini otomatikleştirmenin güncel aracı.",v:1},
{g:"Test / QA",t:"Ministry of Testing",u:"https://www.ministryoftesting.com/",ty:"Topluluk",lv:"hepsi",lang:"EN",len:"makale ve kurs",why:"Test uzmanlarının topluluğu; iş ilanı ve öğrenme kaynağı.",v:1},
{g:"Yazılım",t:"C# turu (Microsoft Learn)",u:"https://learn.microsoft.com/dotnet/csharp/tour-of-csharp/",ty:"Doküman",lv:"başlangıç",lang:"EN",len:"kısa tur",why:"Resmî C# anlatımı. Backend için temel dil.",v:1},
{g:"Yazılım",t:"ASP.NET Core: ilk web API",u:"https://learn.microsoft.com/aspnet/core/tutorials/first-web-api",ty:"Eğitim",lv:"orta",lang:"EN",len:"uygulamalı",why:"Gerçek bir API'yi adım adım kurarsın; portfolyoya girer.",v:1},
{g:"Yazılım",t:"Pro Git (kitap)",u:"https://git-scm.com/book/en/v2",ty:"Kitap",lv:"başlangıç",lang:"EN",len:"ücretsiz",why:"Git'in resmî kitabı. İlk 3 bölüm yeter.",v:1},
{g:"Öğrenme",t:"Learning How to Learn (Coursera)",u:"https://www.coursera.org/learn/learning-how-to-learn",ty:"Kurs",lv:"herkes",lang:"EN",len:"~15 saat",why:"Nasıl daha iyi öğrenileceğini bilimle anlatır: aralıklı tekrar, kendini sınama.",v:1},
{g:"Öğrenme",t:"Jeremy's IT Lab (CCNA, YouTube)",q:"Jeremy's IT Lab CCNA 200-301",ty:"Video",lv:"başlangıç",lang:"EN",len:"ücretsiz, uzun",why:"CCNA için en çok önerilen ücretsiz video serilerinden. Doğrudan bağlantı koymadım; aramayla bul.",v:0}
];
S.at2={sec:"program"};S.pr={track:"ccna",qs:[],i:0,ans:null,ok:0,res:null,wr:[]};S.wd={i:0,show:false};S.pn={};
function pnSave(){if(S.db&&S.canWrite&&!S.guest)S.db.doc("prefs/notes").set(S.pn).catch(function(){})}
function pnLessons(){S.pn.lessons=S.pn.lessons&&typeof S.pn.lessons==="object"?S.pn.lessons:{};return S.pn.lessons}
function fnText(txt,keyp){
  var parts=String(txt||"").split(/(\[\d{1,2}\])/);if(parts.length===1)return txt;
  return parts.map(function(p){var m=/^\[(\d{1,2})\]$/.exec(p);return m?h("sup",{class:"fn"},h("a",{href:"#fn-"+m[1],onclick:function(e){e.preventDefault();var el=document.getElementById("fn-"+m[1]);if(el)el.scrollIntoView({behavior:"smooth",block:"center"})}},"["+m[1]+"]")):p});
}
function firstSentence(t,n){t=String(t||"").replace(/\s+/g," ").trim();var m=/^(.{20,}?[.!?])(\s|$)/.exec(t);var s=m?m[1]:t;return s.length>n?s.slice(0,n-1)+"…":s}
function lessonKeys(l){
  var out=[];(l.blocks||[]).forEach(function(b){if(out.length>=3)return;
    if((b.t==="box"||b.t==="warn")&&(b.h||b.text))out.push(b.h?b.h+": "+firstSentence(b.text,90):firstSentence(b.text,110));
    else if(b.t==="p"&&b.text&&out.length<3&&b.text.length>30)out.push(firstSentence(b.text,110))});
  return out;
}
function recapCard(l,label){
  if(!l)return null;var keys=lessonKeys(l),q=(l.quiz||[])[0],eng=l.track==="eng";
  return h("div",{class:"panel recap"},h("div",{class:"label"},label||"Bir önceki dersten"),h("h2",null,l.title||"Ders"),
    h("div",{class:"small mute"},l.date+(l.hook?" · "+l.hook:"")),
    keys.length?h("ul",{class:"rc-l"},keys.map(function(k){return h("li",null,k)})):null,
    q?h("div",null,h("div",{class:"label",style:"margin-bottom:6px"},"Hatırla"),h("p",{style:"margin:0 0 8px"},q.q),(function(){var kz=typeof qzAnahtar==="function"?qzAnahtar(l,q):{dogru:String(q.answer==null?"":q.answer),why:q.why||""};return kz.dogru?revBtn("rc:"+l.id,"Cevabı göster",h("p",{style:"margin:0"},kz.dogru+(kz.why?" — "+kz.why:""))):h("div",{class:"small mute"},"Cevap, mini sınavı sunucuda geçince açılır.")})()):null,
    h("div",{class:"row"},h("button",{class:"btn ghost",type:"button",onclick:function(){S.les.track=l.track;S.les.id=l.id;S.les.view="ders";goTab("ders")}},"Dersi aç")));
}
/* program */
function atSlots(){
  var P=prog(),n=new Date(),hm=n.getHours()*60+n.getMinutes(),noted=!!(S.pn.days&&S.pn.days[today()]);
  var L=[
    ["08:30",510,"Sabah: günün 10 kelimesi","5 dk",num(P.a_words)>=10,"kelimeler"],
    ["12:30",750,"Öğle: bir kavram öğren (Atlas)","5 dk",num(P.a_atlas)>=1,"ders:atlas"],
    ["15:30",930,"Alıştırma: 5 soru","7 dk",num(P.prac_n)>=5,"alistirma"],
    ["17:30",1050,"Oyun: günün koşusu","4 dk",num(P.g_runs)>0,"oyun"],
    goalTrack()==="ccna"?["20:47",1247,"Akşam: CCNA dersi","25 dk",!!P.read_ccna,"ders:ccna"]:null,
    ["21:12",1272,"Akşam: İngilizce dersi","25 dk",!!P.read_eng,"ders:eng"],
    ["22:15",1335,"Gece: bugünün 3 satırı (Defterim)","3 dk",noted,"defter"]];
  if(lessonsOf("sec").length)L.push(["19:32",1172,"Akşam: Siber güvenlik dersi","25 dk",!!P.read_sec,"ders:sec"]);
  if(lessonsOf("bk").length)L.push(["20:07",1207,"Akşam: Backend dersi","25 dk",!!P.read_bk,"ders:bk"]);
  [["net","Network","20:27",1227],["dev","DevOps","20:57",1257],["qa","Test","21:32",1292]].forEach(function(x){if(lessonsOf(x[0]).length)L.push([x[2],x[3],"Akşam: "+x[1]+" dersi","25 dk",!!P["read_"+x[0]],"ders:"+x[0]])});
  L=L.filter(Boolean);L.sort(function(x,y){return x[1]-y[1]});
  var cur=-1;L.forEach(function(s,i){if(!s[4]&&cur<0&&s[1]<=hm+90)cur=i});if(cur<0)cur=L.findIndex(function(s){return !s[4]});
  return L.map(function(s,i){return {time:s[0],t:s[2],min:s[3],d:s[4],go:s[5],cur:i===cur&&!s[4]}});
}
function atGo(g){
  if(g==="kelimeler"||g==="alistirma"||g==="defter"){S.at2.sec=g;draw();return}
  if(g==="oyun"){goTab("oyun");return}
  if(g==="ders:atlas"){S.les.view="atlas";goTab("ders");return}
  if(/^ders:[a-z]+$/.test(g)&&TRKS.indexOf(g.slice(5))>=0){S.les.track=g.slice(5);S.les.id=null;S.les.view="ders";goTab("ders")}
}
function atProgram(){
  var sl=atSlots(),done=sl.filter(function(s){return s.d}).length,out=[];
  var nx=sl.filter(function(s){return !s.d})[0];
  out.push(h("div",{class:"panel"},h("div",{class:"label"},"Bugünün programı"),h("h2",null,nx?"Sıradaki: "+nx.t:"Bugünkü programın tamam"),
    h("div",{class:"small mute"},(WEB?"Ders aralarında boş kalmazsın: sabah kelime, öğle kavram, öğleden sonra alıştırma, sonra oyun. Hepsi küçük parçalar.":"Ders akşam gelene kadar boş kalmazsın: sabah kelime, öğle kavram, öğleden sonra alıştırma, sonra oyun. Hepsi küçük parçalar.")),
    h("div",{class:"xpbar"},h("i",{style:"width:"+Math.round(done/sl.length*100)+"%"})),
    nx?h("div",{class:"row"},h("button",{class:"btn big",type:"button",onclick:function(){atGo(nx.go)}},"Şimdi yap")):null,
    h("div",{class:"sim-l"},sl.map(function(s){return h("div",{class:"sim-i"+(s.d?" d":"")},h("span",{class:"sim-c"},s.d?"✓":""),h("span",null,h("b",{class:"mono"},s.time+" "),s.t,h("span",{class:"small mute"}," · "+s.min)),s.d?null:h("button",{class:"btn "+(s.cur?"":"ghost"),type:"button",onclick:function(){atGo(s.go)}},s.cur?"Şimdi":"Aç"))}))));
  TRKS.forEach(function(tr){var l=lessonsOf(tr)[0];if(l)out.push(recapCard(l,trName(tr)+" · son ders"))});
  var T=topicChoices(goalTrack()),nt=T.filter(function(t){return t.status==="next"})[0]||T[0];
  if(nt)out.push(h("div",{class:"panel"},h("div",{class:"label"},"Sıradaki konu önizlemesi"),h("h2",null,nt.name),h("div",{class:"small"},nt.analogy||""),h("div",{class:"small mute"},"Yeni ders akşam hazırlanır. Şimdiden sınıfta bu konuyla ısınabilirsin."),h("div",{class:"row"},h("button",{class:"btn ghost",type:"button",onclick:function(){S.cls.track=goalTrack();S.cls.topicId=nt.id;goTab("sinif")}},"Sınıfta çalış"))));
  return out;
}
/* alıştırma */
function prSmartMix(r){
  var sc=[];QB.forEach(function(it,i){if(!GS.sk[it.t])return;var th=GS.sk[it.t]||1.5,box=GS.bx[i],near=Math.exp(-Math.abs(it.d-th)*1.4),w=near*(box==null?1.4:box>=3?.35:box===0?2.2:1.2);sc.push([i,Math.pow(r()||.001,1/Math.max(.05,w))])});
  sc.sort(function(a,b){return b[1]-a[1]});var cnt={},out=[];
  sc.forEach(function(x){var t=QB[x[0]].t;if(out.length>=5||(cnt[t]||0)>=2)return;cnt[t]=(cnt[t]||0)+1;out.push(x[0])});
  return shuf(out,r);
}
function prStart(){
  var P=S.pr,pool=[];QB.forEach(function(q,i){if(q.t===P.track)pool.push(i)});
  var r=rngf(Date.now()%1e9),idx=P.track==="mix"?prSmartMix(r):P.track==="weak"?weakIdxFill(r):shuf(pool,r).slice(0,5);P.why={};
  P.qs=idx.map(function(i){return gmQB(i,r)});P.qs.forEach(function(q,j){q.i=idx[j]});P.i=0;P.ans=null;P.ok=0;P.res=null;P.wr=[];draw();
}
function prWhyBox(q){var W=S.pr.why&&S.pr.why[q.k];if(!W)return null;
  return W.busy?h("div",{class:"small mute"},"Açıklama hazırlanıyor..."):W.err?h("div",{class:"fb bad"},W.err):h("div",{class:"lbox"},h("div",{class:"label"},"Seçtiğin şık neden yanlış"),h("p",null,W.text),h("div",{class:"small mute"},"Şüphen varsa dersten ya da kaynaktan doğrula."))}
function prWhy(q){
  var P=S.pr;P.why=P.why||{};
  var ch=(P.ans!=null&&q.o[P.ans]!=null)?q.o[P.ans]:"";
  P.why[q.k]={text:(ch?"Seçtiğin: "+ch+"\n":"")+"Doğrusu: "+q.o[q.a]+(q.w?"\n"+q.w:"")};draw();
}
function prLaterBtn(q){
  var m=/^qb(\d+)$/.exec(q.k||"");if(!m)return null;var i=+m[1];
  var on=GS.bx[i]===0;
  return h("button",{class:"btn ghost",type:"button",disabled:on,onclick:function(){GS.bx[i]=0;gsSave();draw()}},on?"Tekrar listesinde":"Bunu tekrar sor");
}
function prAnswer(c){
  var P=S.pr,q=P.qs[P.i];if(P.ans!==null)return;P.ans=c;if(c===q.a)P.ok++;else P.wr.push(q.i);gsAnswer(q.k,c===q.a);draw();
}
function prNext(){
  var P=S.pr;if(P.i+1<P.qs.length){P.i++;P.ans=null;draw();return}
  var pg=prog();setProg({prac_n:num(pg.prac_n)+P.qs.length,prac_ok:num(pg.prac_ok)+P.ok});
  if(P.wr.length&&S.db&&S.me&&S.canWrite&&!S.guest){var me=myLeague()||{id:S.me},miss=(Array.isArray(me.miss)?me.miss:[]).filter(function(m){return m&&P.wr.indexOf(m.i)<0});
    P.wr.forEach(function(i){miss.push({i:i,d:today()})});saveMe({miss:miss.slice(-20),qst:qstPack()})}
  P.res={ok:P.ok,n:P.qs.length};draw();
}
function atPractice(){
  var P=S.pr,out=[];
  var seg=h("div",{class:"seg",role:"group","aria-label":"Alan"},trkSorulu().map(function(o){return h("button",{type:"button","aria-pressed":P.track===o[0]?"true":"false",onclick:function(){P.track=o[0];P.qs=[];P.res=null;draw()}},o[1])}));
  seg.insertBefore(h("button",{type:"button","aria-pressed":P.track==="mix"?"true":"false",onclick:function(){P.track="mix";P.qs=[];P.res=null;draw()}},"Karışık"),seg.firstChild);
  seg.insertBefore(h("button",{type:"button","aria-pressed":P.track==="weak"?"true":"false",onclick:function(){P.track="weak";P.qs=[];P.res=null;draw()}},"Zayıflarım"),seg.firstChild);
  out.push(h("div",{class:"panel"},h("div",{class:"label"},"Serbest alıştırma"),h("h2",null,"5 soruluk mini tur"),h("div",{class:"small mute"},"Her cevaptan sonra nedenini görürsün. Yanlışların Lig'de ve oyunda tekrar karşına çıkar. Karışık: alanlar iç içe gelir, seviyene ve zayıf sorularına göre seçilir; öğrenmeyi daha kalıcı yapar."),seg,
    h("div",{class:"row"},h("button",{class:"btn",type:"button",onclick:prStart},P.qs.length&&!P.res?"Yeni tur":"Turu başlat"))));
  if(P.res)out.push(h("div",{class:"panel"},h("h2",null,P.res.ok===P.res.n?"Hepsi doğru!":P.res.ok+" / "+P.res.n+" doğru"),h("div",{class:"small mute"},P.res.ok===P.res.n?"Harika. Bir tur daha ya da oyuna geç.":"Yanlışlar tekrar listene eklendi."),h("div",{class:"row"},h("button",{class:"btn",type:"button",onclick:prStart},"Yeni tur"),h("button",{class:"btn ghost",type:"button",onclick:function(){goTab("oyun")}},"Oyuna geç"))));
  else if(P.qs.length){var q=P.qs[P.i];
    out.push(h("div",{class:"panel"},h("div",{class:"label"},"Soru "+(P.i+1)+" / "+P.qs.length+(P.track==="mix"&&q.t?" · "+(GM_TN[q.t]||q.t):"")),h("h2",{style:"font-size:17px"},q.q),
      h("div",{class:"lsn"},q.o.map(function(o,i){var cls="opt"+(P.ans!==null?(i===q.a?" good":(i===P.ans?" bad":"")):"");return h("button",{type:"button",class:cls,disabled:P.ans!==null,onclick:function(){prAnswer(i)}},String.fromCharCode(65+i)+". "+o)})),
      P.ans!==null?h("div",{class:"fb"+(P.ans===q.a?"":" bad")},h("b",null,P.ans===q.a?"Doğru. ":"Doğrusu "+String.fromCharCode(65+q.a)+". "),q.w):null,
      P.ans!==null&&P.ans!==q.a?prWhyBox(q):null,
      P.ans!==null?h("div",{class:"row"},h("button",{class:"btn",type:"button",onclick:prNext},P.i+1<P.qs.length?"Sonraki":"Bitir"),P.ans!==q.a?h("button",{class:"btn ghost",type:"button",onclick:function(){prWhy(q)}},"Seçtiğim şık neden yanlış?"):null,prLaterBtn(q),qbFlagBtn(q)):null));}
  return out;
}
/* kelimeler */
function wdToday(){var n=WORDS.length,st=(dayNum(today())*10)%n,o=[];for(var i=0;i<10;i++)o.push(WORDS[(st+i)%n]);return o}
function atWords(){
  var L=wdToday(),W=S.wd,known=S.pn.wk&&typeof S.pn.wk==="object"?S.pn.wk:{},w=L[Math.min(W.i,L.length-1)],done=W.i>=L.length;
  var out=[h("div",{class:"panel"},h("div",{class:"label"},"Günün 10 kelimesi"),h("h2",null,done?"10 kelime tamam":"Kelime "+(W.i+1)+" / 10"),h("div",{class:"xpbar"},h("i",{style:"width:"+Math.min(100,W.i*10)+"%"})),
    done?h("div",null,h("p",{style:"margin:0 0 8px"},"Bugünkü kelimeleri bitirdin. Akşam derste bunları kullan."),h("div",{class:"row"},h("button",{class:"btn ghost",type:"button",onclick:function(){W.i=0;W.show=false;draw()}},"Baştan tekrar"),h("button",{class:"btn",type:"button",onclick:function(){S.at2.sec="alistirma";draw()}},"Alıştırmaya geç"))):
    h("div",{class:"wd"},h("div",{class:"wd-en"},w[0]),h("div",{class:"small mute mono"},"okunuş: "+w[2]),
      h("div",{class:"row"},h("button",{class:"btn ghost",type:"button",onclick:function(){speak(w[0])}},"Sesli oku"),h("button",{class:"btn ghost",type:"button",onclick:function(){speak(w[3])}},"Cümleyi oku")),
      W.show?h("div",{class:"lbox eng"},h("div",{class:"label"},"Türkçesi"),h("p",{style:"font-weight:700;font-size:18px"},w[1]),h("p",{style:"margin:0"},w[3]),h("p",{class:"small mute",style:"margin:4px 0 0"},w[4])):h("button",{class:"btn big",type:"button",onclick:function(){W.show=true;draw()}},"Anlamını göster"),
      W.show?h("div",{class:"row"},h("button",{class:"btn",type:"button",onclick:function(){wdMark(w[0],2)}},"Bildim"),h("button",{class:"btn ghost",type:"button",onclick:function(){wdMark(w[0],1)}},"Tekrar")):null))];
  var kn=Object.keys(known).filter(function(k){return known[k]===2}).length;
  out.push(h("div",{class:"panel"},h("div",{class:"small mute"},"Toplam "+WORDS.length+" kelime listesi · bildiklerin: "+kn),h("div",{class:"small mute"},"Her gün farklı 10 kelime gelir; tüm liste döndükçe tekrar başlar.")));
  return out;
}
function wdMark(en,v){
  S.pn.wk=S.pn.wk&&typeof S.pn.wk==="object"?S.pn.wk:{};S.pn.wk[en]=v;pnSave();
  var W=S.wd;W.i++;W.show=false;
  var pg=prog();setProg({a_words:Math.max(num(pg.a_words),W.i)});draw();
}
/* kütüphane */
/* v35 doğrulanmış ücretsiz kaynak kataloğu (2026-10-08) */
var LIB_V35=[{"g": "Yazılım testi (ücretsiz, doğrulandı)", "ty": "Doküman", "t": "Selenium Documentation", "u": "https://www.selenium.dev/documentation/", "lv": "başlangıç", "lang": "EN", "len": "ücretsiz", "why": "Web tarayıcı otomasyonunun (WebDriver, Grid, IDE) resmî ve açık kaynak dokümanı. Ücretsiz.", "v": 1}, {"g": "Yazılım testi (ücretsiz, doğrulandı)", "ty": "Doküman", "t": "Playwright - Installation (Getting Started)", "u": "https://playwright.dev/docs/intro", "lv": "başlangıç", "lang": "EN", "len": "ücretsiz", "why": "Modern uçtan uca test otomasyonuna kurulumdan ilk teste kadar adım adım giriş yaptırır. Ücretsiz.", "v": 1}, {"g": "Yazılım testi (ücretsiz, doğrulandı)", "ty": "Doküman", "t": "Get started in Postman (Postman Docs)", "u": "https://learning.postman.com/docs/getting-started/overview/", "lv": "sıfır", "lang": "EN", "len": "ücretsiz", "why": "API testi için Postman'e hızlı başlangıç; okumak için hesap gerekmiyor. Ücretsiz.", "v": 1}, {"g": "Yazılım testi (ücretsiz, doğrulandı)", "ty": "Kurs", "t": "Software Testing Tutorial (Guru99)", "u": "https://www.guru99.com/software-testing.html", "lv": "sıfır", "lang": "EN", "len": "ücretsiz", "why": "Manuel/otomasyon test, test teknikleri, hata takibi ve çevik testi tek müfredatta toplayan başlangıç serisi. Ücretsiz.", "v": 1}, {"g": "Yazılım testi (ücretsiz, doğrulandı)", "ty": "Doküman", "t": "QA Roadmap (roadmap.sh)", "u": "https://roadmap.sh/qa", "lv": "sıfır", "lang": "EN", "len": "ücretsiz", "why": "QA mühendisliği için öğrenme sırasını gösteren topluluk yol haritası; konu seçmeyi kolaylaştırır. Ücretsiz.", "v": 1}, {"g": "Yazılım testi (ücretsiz, doğrulandı)", "ty": "Doküman", "t": "The Practical Test Pyramid", "u": "https://martinfowler.com/articles/practical-test-pyramid.html", "lv": "orta", "lang": "EN", "len": "ücretsiz", "why": "Unit, entegrasyon, kontrat ve UI testlerinin hangi katmanda yazılacağını açıklayan referans makale. Ücretsiz.", "v": 1}, {"g": "Backend ve .NET (ücretsiz, doğrulandı)", "ty": "Kurs", "t": "Write your first code using C# (Get started with C#, Part 1)", "u": "https://learn.microsoft.com/en-us/training/paths/get-started-c-sharp-part-1/", "lv": "sıfır", "lang": "EN", "len": "ücretsiz", "why": "Ön koşulsuz, 4 modüllük C# temel sözdizimi yolu; sıfırdan başlayan için ideal. Ücretsiz.", "v": 1}, {"g": "Backend ve .NET (ücretsiz, doğrulandı)", "ty": "Doküman", "t": "C# documentation", "u": "https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/", "lv": "başlangıç", "lang": "EN", "len": "ücretsiz", "why": "Dil temelleri, LINQ, async ve dil referansı için resmî C# merkezi. Ücretsiz.", "v": 1}, {"g": "Backend ve .NET (ücretsiz, doğrulandı)", "ty": "Alıştırma", "t": "Tutorial: Create a controller-based web API with ASP.NET Core", "u": "https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api", "lv": "orta", "lang": "EN", "len": "ücretsiz", "why": "CRUD REST API'yi EF Core ile kurdurur; HTTP durum kodları ve DTO konularını da öğretir. Ücretsiz.", "v": 1}, {"g": "Backend ve .NET (ücretsiz, doğrulandı)", "ty": "Kurs", "t": "Query and modify data with Transact-SQL", "u": "https://learn.microsoft.com/en-us/training/paths/get-started-querying-with-transact-sql/", "lv": "başlangıç", "lang": "EN", "len": "ücretsiz", "why": "SELECT, JOIN, alt sorgu, GROUP BY ve veri değiştirmeyi 6 modülde anlatan SQL yolu. Ücretsiz.", "v": 1}, {"g": "Backend ve .NET (ücretsiz, doğrulandı)", "ty": "Alıştırma", "t": "SQL Tutorial", "u": "https://www.w3schools.com/sql/", "lv": "sıfır", "lang": "EN", "len": "ücretsiz", "why": "Tarayıcıda deneyerek SQL öğreten, hesap gerektirmeyen örnek ve alıştırmalar; sertifika ücretli kısmı ayrı. Ücretsiz.", "v": 1}, {"g": "Backend ve .NET (ücretsiz, doğrulandı)", "ty": "Alıştırma", "t": "C# Tutorial", "u": "https://www.w3schools.com/cs/index.php", "lv": "sıfır", "lang": "EN", "len": "ücretsiz", "why": "Kısa, örnekli C# anlatımı; hesapsız çalışılabilir, sertifika ve PLUS ücretli. Ücretsiz.", "v": 1}, {"g": "Backend ve .NET (ücretsiz, doğrulandı)", "ty": "Doküman", "t": "Backend Developer Roadmap", "u": "https://roadmap.sh/backend", "lv": "sıfır", "lang": "EN", "len": "ücretsiz", "why": "REST, veritabanı, Docker gibi backend konularının hangi sırayla öğrenileceğini gösterir. Ücretsiz.", "v": 1}, {"g": "Backend ve .NET (ücretsiz, doğrulandı)", "ty": "Doküman", "t": "Docker Get started", "u": "https://docs.docker.com/get-started/", "lv": "başlangıç", "lang": "EN", "len": "ücretsiz", "why": "Docker kurulumu ve uygulamayı konteynerleştirme için resmî başlangıç rehberi. Ücretsiz.", "v": 1}, {"g": "Backend ve .NET (ücretsiz, doğrulandı)", "ty": "Kurs", "t": "AWS Educate - Cloud Skills for Education", "u": "https://aws.amazon.com/education/awseducate/", "lv": "sıfır", "lang": "EN", "len": "ücretsiz hesapla", "why": "AWS temel bulut eğitimleri ve laboratuvarları; sadece e-posta ile kayıt, kredi kartı gerekmiyor. Ücretsiz hesapla.", "v": 1}, {"g": "Siber güvenlik (ücretsiz, doğrulandı)", "ty": "Doküman", "t": "OWASP Top 10", "u": "https://owasp.org/www-project-top-ten/", "lv": "başlangıç", "lang": "EN", "len": "ücretsiz", "why": "Web uygulamalarındaki en kritik güvenlik risklerinin standart referansı; sayfa tüm kaynakların ücretsiz olduğunu belirtiyor. Ücretsiz.", "v": 1}, {"g": "Siber güvenlik (ücretsiz, doğrulandı)", "ty": "Doküman", "t": "OWASP Web Security Testing Guide", "u": "https://owasp.org/www-project-web-security-testing-guide/", "lv": "orta", "lang": "EN", "len": "ücretsiz", "why": "Web güvenliği test metodolojisinin ayrıntılı rehberi; ücretsiz PDF sürümleri var (CC BY-SA 4.0). Ücretsiz.", "v": 1}, {"g": "Siber güvenlik (ücretsiz, doğrulandı)", "ty": "Video", "t": "Professor Messer's CompTIA SY0-701 Security+ Training Course", "u": "https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-comptia-security-plus-course/", "lv": "başlangıç", "lang": "EN", "len": "15.2 saat", "why": "Security+ SY0-701 konularının tamamını 121 ücretsiz videoyla (yaklaşık 15 sa) kapsar; notlar ve alıştırma sınavları ücretli. Ücretsiz.", "v": 1}, {"g": "Siber güvenlik (ücretsiz, doğrulandı)", "ty": "Lab", "t": "Web Security Academy", "u": "https://portswigger.net/web-security", "lv": "orta", "lang": "EN", "len": "ücretsiz", "why": "Sayfada %100 ücretsiz olduğu yazan, uygulamalı web güvenliği laboratuvarları ve anlatımlar sunar. Ücretsiz.", "v": 1}, {"g": "Siber güvenlik (ücretsiz, doğrulandı)", "ty": "Kurs", "t": "Introduction to Cybersecurity", "u": "https://www.netacad.com/courses/cybersecurity/introduction-cybersecurity", "lv": "sıfır", "lang": "EN", "len": "ücretsiz", "why": "Siber güvenliğe sıfırdan giriş yapan, Cisco'nun ücretsiz kursu. Ücretsiz.", "v": 1}, {"g": "Siber güvenlik (ücretsiz, doğrulandı)", "ty": "Lab", "t": "picoCTF (CyLab Security Academy)", "u": "https://picoctf.org/", "lv": "sıfır", "lang": "EN", "len": "ücretsiz", "why": "Ücretsiz, oyunlaştırılmış CTF platformu; temel güvenlik becerilerini yarışma ve görevlerle pekiştirir. Ücretsiz.", "v": 1}, {"g": "Siber güvenlik (ücretsiz, doğrulandı)", "ty": "Alıştırma", "t": "Hacksplaining - Secure coding lessons", "u": "https://www.hacksplaining.com/lessons", "lv": "sıfır", "lang": "EN", "len": "ücretsiz", "why": "SQL injection, XSS, CSRF gibi açıkları önce saldırıp sonra savunmayı öğreten 45+ ücretsiz etkileşimli ders. Ücretsiz.", "v": 1}, {"g": "Siber güvenlik (ücretsiz, doğrulandı)", "ty": "Doküman", "t": "Cyber Security Expert Roadmap", "u": "https://roadmap.sh/cyber-security", "lv": "sıfır", "lang": "EN", "len": "ücretsiz", "why": "Siber güvenlik kariyeri için konu sırasını gösteren topluluk yol haritası. Ücretsiz.", "v": 1}, {"g": "Ağ ve CCNA: ek kaynaklar (ücretsiz, doğrulandı)", "ty": "Kurs", "t": "Networking Essentials", "u": "https://www.netacad.com/courses/networking/networking-essentials", "lv": "sıfır", "lang": "EN", "len": "ücretsiz hesapla", "why": "Sayfada ücretsiz, kendi hızında kurs olarak tanımlanan temel ağ kursu; CCNA öncesi sağlam başlangıç. Ücretsiz hesapla.", "v": 1}, {"g": "Ağ ve CCNA: ek kaynaklar (ücretsiz, doğrulandı)", "ty": "Lab", "t": "Cisco Packet Tracer - Free Training and Download", "u": "https://www.netacad.com/courses/packet-tracer", "lv": "sıfır", "lang": "EN", "len": "ücretsiz hesapla", "why": "Ağ simülasyon aracını ücretsiz indirtir; CCNA laboratuvarları donanımsız yapılır. Ücretsiz hesapla.", "v": 1}, {"g": "Ağ ve CCNA: ek kaynaklar (ücretsiz, doğrulandı)", "ty": "Video", "t": "Professor Messer's CompTIA N10-009 Network+ Training Course", "u": "https://www.professormesser.com/network-plus/n10-009/n10-009-video/n10-009-training-course/", "lv": "başlangıç", "lang": "EN", "len": "12.9 saat", "why": "87 ücretsiz videoyla (yaklaşık 13 sa) ağ kavramları, uygulama, güvenlik ve sorun gidermeyi anlatır; CCNA temeli için uygun. Ücretsiz.", "v": 1}, {"g": "Ağ ve CCNA: ek kaynaklar (ücretsiz, doğrulandı)", "ty": "Doküman", "t": "freeCodeCamp - networking articles", "u": "https://www.freecodecamp.org/news/tag/networking/", "lv": "başlangıç", "lang": "EN", "len": "ücretsiz", "why": "TCP, IPv4, Ethernet, güvenlik duvarı ve VPN gibi konularda ücretsiz makaleler. Ücretsiz.", "v": 1}, {"g": "Ağ ve CCNA: ek kaynaklar (ücretsiz, doğrulandı)", "ty": "Doküman", "t": "Cloudflare Learning Center", "u": "https://www.cloudflare.com/learning/", "lv": "başlangıç", "lang": "EN", "len": "ücretsiz", "why": "DNS, TLS, DDoS ve ağ temellerini kısa, düzenli makalelerle açıklar. Ücretsiz.", "v": 1}, {"g": "Hedef: iş İngilizcesi: ek kaynaklar (ücretsiz, doğrulandı)", "ty": "Alıştırma", "t": "Business English (LearnEnglish)", "u": "https://learnenglish.britishcouncil.org/business-english", "lv": "orta", "lang": "EN", "len": "ücretsiz", "why": "İş yeri iletişimi, podcast ve mülakat içerikleri; ücretsiz, hesap sadece favori kaydetmek için. Ücretsiz.", "v": 1}, {"g": "Hedef: iş İngilizcesi: ek kaynaklar (ücretsiz, doğrulandı)", "ty": "Kurs", "t": "English for emails", "u": "https://learnenglish.britishcouncil.org/business-english/english-for-emails", "lv": "başlangıç", "lang": "EN", "len": "ücretsiz", "why": "BT çalışanının günlük e-posta yazışmalarına doğrudan yarayan A2-B1 seviyesinde seri. Ücretsiz.", "v": 1}, {"g": "Hedef: iş İngilizcesi: ek kaynaklar (ücretsiz, doğrulandı)", "ty": "Alıştırma", "t": "LearnEnglish free resources by skill", "u": "https://learnenglish.britishcouncil.org/skills", "lv": "sıfır", "lang": "EN", "len": "ücretsiz", "why": "Dinleme, okuma, yazma, konuşma ve dil bilgisi için seviyeye göre ücretsiz materyal. Ücretsiz.", "v": 1}, {"g": "Hedef: iş İngilizcesi: ek kaynaklar (ücretsiz, doğrulandı)", "ty": "Alıştırma", "t": "Business English (EnglishClub)", "u": "https://www.englishclub.com/business-english/", "lv": "başlangıç", "lang": "EN", "len": "ücretsiz", "why": "Sunum, toplantı, müzakere ve özgeçmiş gibi iş İngilizcesi konularında ücretsiz dersler. Ücretsiz.", "v": 1}, {"g": "Hedef: iş İngilizcesi: ek kaynaklar (ücretsiz, doğrulandı)", "ty": "Kurs", "t": "English for Career Development", "u": "https://www.coursera.org/learn/careerdevelopment", "lv": "orta", "lang": "EN", "len": "40 saat", "why": "Anadili İngilizce olmayanlara özgeçmiş, ön yazı ve mülakat İngilizcesi; 'Full Course, No Certificate' ile ücretsiz izlenir. Içerik ücretsiz, sertifika ücretli.", "v": 1}];
LIB_V35.forEach(function(x){LIB.push(x)});
function atLib(){
  var groups=[];LIB.forEach(function(x){if(groups.indexOf(x.g)<0)groups.push(x.g)});
  var out=[h("div",{class:"panel"},h("div",{class:"label"},"Kütüphane"),h("h2",null,"Seçilmiş kaynaklar"),h("div",{class:"small mute"},"Her kaynağın yanında neden önerildiği yazıyor. [n] numarası ders dipnotlarıyla aynı mantıkta. “doğrulandı” işareti, bağlantının Ekim 2026'da açıldığını gösterir; diğerlerinde bağlantı sonradan değişmiş olabilir.")) ];
  var n=0;groups.forEach(function(g){
    out.push(h("div",{class:"panel"},h("h3",null,g),LIB.filter(function(x){return x.g===g}).map(function(x){n++;
      var url=x.u||("https://www.youtube.com/results?search_query="+encodeURIComponent(x.q||x.t));
      return h("div",{class:"rcard",id:"lib-"+n},h("div",{style:"display:flex;gap:8px;align-items:center;flex-wrap:wrap"},h("span",{class:"mono small"},"["+n+"]"),h("span",{class:"pill"},x.ty),x.v?h("span",{class:"pill ok"},"doğrulandı"):null,h("span",{class:"mono mute small"},x.lv+" · "+x.lang+" · "+x.len)),
        h("a",{href:url,target:"_blank",rel:"noopener"},x.t+(x.u?"":" (YouTube'da ara)")),h("div",{class:"small mute"},"Neden: "+x.why))})))});
  return out;
}
/* defter */
function atNotes(){
  var all=TRKS.reduce(function(a,t){return a.concat(lessonsOf(t))},[]).sort(function(a,b){return String(b.date).localeCompare(String(a.date))}).slice(0,10),N=pnLessons();
  S.pn.days=S.pn.days&&typeof S.pn.days==="object"?S.pn.days:{};
  var key=S.at2.nl||"day",l=all.filter(function(x){return x.id===key})[0];
  var sel=h("div",{class:"lscroll"},[h("button",{type:"button",class:"opt","aria-pressed":key==="day"?"true":"false",onclick:function(){S.at2.nl="day";draw()}},"Bugünün 3 satırı")].concat(all.map(function(x){return h("button",{type:"button",class:"opt","aria-pressed":key===x.id?"true":"false",onclick:function(){S.at2.nl=x.id;draw()}},(x.track==="eng"?"İng. ":"CCNA ")+x.date.slice(5))})));
  var cur=key==="day"?(S.pn.days[today()]||""):(N[key]||"");
  var ta=h("textarea",{maxlength:1200,placeholder:key==="day"?"Bugün ne öğrendim? Neyi anlamadım? Yarın ne yapacağım?":"Bu dersle ilgili kendi cümlelerinle not al",rows:6,onblur:function(e){var v=e.target.value.trim();if(key==="day")S.pn.days[today()]=v;else N[key]=v;pnSave();if(key==="day"&&v)setProg({a_note:1})}});ta.value=cur;
  var out=[h("div",{class:"panel"},h("div",{class:"label"},"Defterim"),h("h2",null,key==="day"?"Bugünün 3 satırı":(l?l.title:"Ders notu")),h("div",{class:"small mute"},"Kendi cümlelerinle yazarsan öğrenme kalıcı olur. Kutudan çıkınca otomatik kaydedilir."),sel,ta,
    h("div",{class:"row"},h("button",{class:"btn",type:"button",onclick:function(){ta.blur()}},"Kaydet")))];
  var saved=Object.keys(N).filter(function(k){return N[k]}).slice(0,6);
  if(saved.length)out.push(h("div",{class:"panel"},h("h3",null,"Kayıtlı ders notların"),saved.map(function(k){var ls=all.filter(function(x){return x.id===k})[0];return h("div",{class:"lbox"},h("div",{class:"label"},ls?ls.title:k),h("p",{style:"white-space:pre-wrap;margin:0"},N[k]))})));
  return out;
}
/* analiz */
function atAnalysis(){
  var ds=[];for(var i=6;i>=0;i--)ds.push(addDays(today(),-i));
  var me=myLeague(),LD=me&&me.d||{};
  function pct(a,b){return b>0?Math.round(a/b*100):null}
  var rows=ds.map(function(d){var p=gmDay(d),L=LD[d]||{};
    var qo=num(p.q_ccna_ok)+num(p.q_eng_ok),qt=num(p.q_ccna_total)+num(p.q_eng_total);
    return {d:d,mini:pct(qo,qt),lig:pct(num(L.ok),num(L.tot)),prac:pct(num(p.prac_ok),num(p.prac_n)),game:pct(num(p.g_ok),num(p.g_tot))}});
  function avg(k){var a=rows.filter(function(r){return r[k]!=null}).map(function(r){return r[k]});return a.length?Math.round(a.reduce(function(x,y){return x+y},0)/a.length):null}
  var A={mini:avg("mini"),lig:avg("lig"),prac:avg("prac"),game:avg("game")};
  var names={mini:"Mini sınav (ders sonrası)",lig:"Lig (günlük)",prac:"Alıştırma",game:"Oyun"},cols={mini:"var(--net)",lig:"var(--eng)",prac:"var(--sec)",game:"var(--gold)"};
  var miss=(me&&Array.isArray(me.miss)?me.miss:[]),mc=trkMap(0);miss.forEach(function(m){var q=QB[m.i];if(q)mc[q.t]=(mc[q.t]||0)+1});
  var weak="ccna";Object.keys(mc).forEach(function(k){if(mc[k]>mc[weak])weak=k});var ins=[];
  var have=Object.keys(A).filter(function(k){return A[k]!=null});
  if(!have.length)ins.push("Henüz veri yok. Bir alıştırma ya da oyun turu oyna; burası dolacak.");
  else{
    if(A.mini!=null&&A.lig!=null)ins.push(A.mini>=A.lig+10?"Derste iyisin ama günlük sorularda düşüyorsun: tekrar eksik. Alıştırma ve oyunla pekiştir.":A.lig>=A.mini+10?"Günlük sorularda dersten daha iyisin. Derslerde ayrıntıya dikkat et.":"Ders içi ve günlük sonuçların dengeli.");
    if(A.prac!=null&&A.prac<60)ins.push("Alıştırma doğruluğun %"+A.prac+". Hızı azalt, nedenini oku, sonra tekrar çöz.");
    if(A.game!=null&&A.game>=80)ins.push("Oyunda %"+A.game+" doğruluk: bilgi oturuyor. Patron'u dene.");
    if(miss.length)ins.push("Tekrar bekleyen "+miss.length+" yanlışın var; çoğu "+trName(weak)+" alanında.");
  }
  var bars=h("div",{class:"an-bars"},ds.map(function(d,i){var r=rows[i];return h("div",{class:"an-c"},h("div",{class:"an-st"},["mini","lig","prac","game"].map(function(k){return h("i",{style:"height:"+(r[k]==null?2:Math.max(4,r[k]))+"%;background:"+cols[k],title:names[k]+": "+(r[k]==null?"veri yok":"%"+r[k])})})),h("span",{class:"small mute"},d.slice(8)))}));
  return [wkPanel(false),mastPanel(),hardQs(),h("div",{class:"panel"},h("div",{class:"label"},"Öğrenme analizi"),h("h2",null,"Son 7 gün"),h("div",{class:"small mute"},"Her renk bir öğrenme yolu. Çubuk yüksekliği doğru oranı. Boş gün: veri yok."),bars,
    h("div",{class:"an-key"},["mini","lig","prac","game"].map(function(k){return h("span",{class:"small"},h("i",{class:"an-dot",style:"background:"+cols[k]}),names[k]+(A[k]!=null?" %"+A[k]:""))}))),
   h("div",{class:"panel"},h("h2",null,"Ne yapmalı?"),ins.map(function(t){return h("div",{class:"lbox"},h("p",{style:"margin:0"},t))}),
    h("div",{class:"row"},h("button",{class:"btn",type:"button",onclick:function(){S.pr.track=weak;S.pr.qs=[];S.pr.res=null;S.at2.sec="alistirma";draw()}},"Zayıf alanı alıştır")))];
}
function renderGitSim(){
  var A=S.at2;
  if(!A.gitEl){
    var box=h("div",{"data-git-sim":"1"});
    if(window.PP_GIT&&typeof PP_GIT.mount==="function")PP_GIT.mount(box);
    else box.append(document.createTextNode("Git simülatörü yüklenemedi."));
    A.gitEl=h("div",{class:"panel"},h("h2",null,"Git Simülatörü"),h("div",{class:"small mute"},"init, add, commit, status, log, branch, checkout, merge, diff gibi komutları burada dene; gerçek bir depoya dokunmaz."),box);
  }
  return [A.gitEl];
}
function renderAtolye(){
  var A=S.at2,secs=[["program","Program"],["alistirma","Alıştırma"],["kelimeler","Kelimeler"],["kutuphane","Kütüphane"],["defter","Defterim"],["analiz","Analiz"],["ise","İşe hazırlık"],["cv","CV"],["va","Veri Analitiği"],["git","Git"]];
  var seg=h("div",{class:"panel",style:"padding:10px"},h("div",{class:"lscroll"},secs.map(function(s){return h("button",{type:"button",class:"opt","aria-pressed":A.sec===s[0]?"true":"false",onclick:function(){A.sec=s[0];draw()}},s[1])})));
  var body={program:atProgram,alistirma:atPractice,kelimeler:atWords,kutuphane:atLib,defter:atNotes,analiz:atAnalysis,ise:atJobs,cv:atCv,va:renderVeriAnalitigi,git:renderGitSim}[A.sec]();
  return [seg].concat(body).filter(Boolean);
}

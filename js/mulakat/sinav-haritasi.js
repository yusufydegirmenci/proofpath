"use strict";
/* ALAN: Sınav Haritası (CCNA alan ağırlıkları) ve Mülakat Antrenmanı sekmesi.
   NE YAPAR: CCNA konularını alan ağırlığına göre hazırlık yüzdesine çevirir (examMap/renderExamMap) ve mülakat antrenmanı ekranını çizer (renderInterview).
   SORUN OLURSA: Küresel S (S.iv, S.interview), topicsOf ve PP.ogr.ilerleme.konuTamam yüklenmiş olmalı; DOMW alan ağırlıkları elle yazılı. renderExamMap'i js/bugun/sayilar.js çağırır. Rubrik paneli js/proje/rapor-ui.js ve PP.mulakat ile ayrıdır.
   YENİ ÖZELLİK: Yeni alan DOMW'a eklenir; bu dosyaya özel test yok, tests/faz8_kariyer.js rubrik tarafını kapsar. */
/* ---- v18: Sınav Haritası + Mülakat Antrenmanı ---- */
var DOMW=[["Network Fundamentals","Ağ Temelleri",20],["Network Access","Ağ Erişimi",20],["IP Connectivity","IP Bağlantısı",25],["IP Services","IP Servisleri",10],["Security Fundamentals","Güvenlik Temelleri",15],["Automation and Programmability","Otomasyon",10]];
function examMap(){
  var T=topicsOf("ccna"),rows=DOMW.map(function(d){
    var ts=T.filter(function(t){return t.domain===d[0]}),sum=0,built=0;
    ts.forEach(function(t){sum+=num(t.mastery);if(PP.ogr.ilerleme.konuTamam(t))built++});
    return {en:d[0],tr:d[1],w:d[2],n:ts.length,built:built,avg:ts.length?Math.round(sum/ts.length):0};
  });
  var ready=Math.round(rows.reduce(function(a,r){return a+r.w*r.avg/100},0));
  var built=T.filter(PP.ogr.ilerleme.konuTamam).length,dates=[];
  S.days.forEach(function(d){if(d.date)dates.push(d.date)});T.forEach(function(t){if(t.lastReview)dates.push(t.lastReview)});
  dates.sort();var first=dates[0]||null,weeks=first?Math.max(0,(parse(today())-parse(first))/864e5/7):0;
  return {rows:rows,ready:ready,total:T.length,built:built,weeks:weeks,first:first};
}
function renderExamMap(){
  var m=examMap();if(!m.total)return null;
  var rate=m.weeks>=1&&m.built>0?m.built/m.weeks:null,left=m.total-m.built,out=[];
  function wk(r){var w=Math.ceil(left/r);var d=new Date();d.setDate(d.getDate()+w*7);return w+" hafta (~"+d.getDate()+"."+(d.getMonth()+1)+"."+d.getFullYear()+")"}
  var mocks=S.exams.filter(function(e){return e.track==="ccna"&&e.kind==="mock"}).sort(function(a,b){return String(a.date).localeCompare(String(b.date))}),lm=mocks[mocks.length-1];
  return h("div",{class:"panel xmap"},h("div",{class:"label"},"CCNA 200-301 · Sınav haritası"),h("h2",null,"Sınava ne kadar yakınsın?"),
    h("div",{class:"xr"},h("div",{class:"xbig"},h("b",null,"%"+m.ready),h("small",null,"tahmini konu hazırlığı")),
      h("div",{class:"xmeta"},h("div",null,m.built+" / "+m.total+" konu tamam"),h("div",null,lm?"Son deneme: %"+num(lm.score):"Deneme sınavı henüz yok"))),
    h("div",{class:"xd"},m.rows.map(function(r){
      return h("div",{class:"xrow"},h("div",{class:"xl"},h("b",null,r.tr),h("small",null,"sınavın %"+r.w+"'i · "+r.built+"/"+r.n+" konu")),
        h("div",{class:"xb"},h("i",{style:"width:"+Math.max(2,r.avg)+"%"})),h("span",{class:"xp"},r.avg+"%"))})),
    h("div",{class:"xpace"},h("div",{class:"label"},"Tempo tahmini"),
      rate?h("div",null,"Şimdiye kadar haftada ortalama "+(Math.round(rate*10)/10)+" konu. Bu tempoda kalan "+left+" konu için "+wk(rate)+"."):
        h("div",{class:"small mute"},"Gerçek tempo için en az bir hafta ve bir tamamlanan konu gerekir. Şimdilik senaryolar:"),
      h("div",{class:"chiprow"},[1,2,3].map(function(r){return h("span",{class:"pill"},"haftada "+r+" konu: "+wk(r))}))),
    h("div",{class:"small mute"},"Bu bir tahmin: ustalık değerlerinin sınav ağırlığıyla toplamı. Konuların bitmesi sınava hazır olmak demek değildir; lablar ve deneme sınavında üst üste %85+ ile ölçülür."));
}
var IVB=[
{id:"t1",cat:"tanis",q:"Tell me about yourself.",a:"Hello, my name is [Adın]. I am an IT administrator at an international company in [şehir]. I support users, systems and internal tools. I am learning networking and I want to grow in IT.",tr:"Kendini kısaca tanıt: ad, iş, güçlü yan, hedef."},
{id:"t2",cat:"tanis",q:"Why do you want this job?",a:"I like solving problems and helping people. This job fits my experience and my goals. I want to learn more and bring value to the team.",tr:"Neden bu iş? İlgi + katkı + öğrenme."},
{id:"t3",cat:"tanis",q:"What are your strengths?",a:"I learn fast and I stay calm with problems. I also explain technical things in a simple way. For example, I help non-technical users every day.",tr:"2 güçlü yan + 1 örnek."},
{id:"t4",cat:"tanis",q:"What is your biggest weakness?",a:"My English speaking is not perfect yet. I study every day and I practice with real work tickets. I improve a little every week.",tr:"Gerçek ama çözümü olan bir zayıflık seç ve gelişimini söyle."},
{id:"t5",cat:"tanis",q:"Tell me about a problem you solved.",a:"A user said the printer did not work. I checked the cable, then the network, then the driver. The driver was old. I updated it and the printer worked. I also wrote the steps in the ticket.",tr:"Durum, ne yaptın, sonuç (STAR)."},
{id:"t6",cat:"tanis",q:"Why should we hire you?",a:"I am reliable and I learn quickly. I know the users and the systems in a real company. I am also working on my CCNA, so I grow every month.",tr:"3 kanıt: güvenilirlik, deneyim, gelişim."},
{id:"t7",cat:"tanis",q:"Where do you see yourself in five years?",a:"I see myself as a network or systems specialist. I want to hold my CCNA and work with bigger infrastructure. I also want to help junior colleagues.",tr:"Gerçekçi hedef ve şirkete faydası."},
{id:"t8",cat:"tanis",q:"Do you work well in a team?",a:"Yes, I do. I work with people in different countries. I communicate clearly and I ask for help when I need it.",tr:"Farklı ülkelerden insanlarla çalıştığın bir örnek ver."},
{id:"t9",cat:"tanis",q:"How do you handle pressure?",a:"I make a list and I start with the most urgent problem. I tell people the status and the time. This keeps me calm and the users informed.",tr:"Önceliklendirme + iletişim."},
{id:"t10",cat:"tanis",q:"Do you have any questions for us?",a:"Yes. What does a normal day look like in this team? Which tools do you use? How do you help new people to grow?",tr:"Mutlaka 2-3 soru hazırla."},
{id:"b1",cat:"bt",q:"Bir kullanıcı 'bilgisayarım çok yavaş' diyor. Ne yaparsın?",a:"Önce ne zamandır ve hangi işlemde yavaş olduğunu sorarım. Görev yöneticisinde CPU, RAM ve disk kullanımına bakarım, başlangıç programlarını ve güncellemeleri kontrol ederim. Virüs taraması ve disk sağlığı kontrolü yaparım. Çözemezsem yedek alıp temiz kurulum veya donanım önerisi sunarım ve ticket'a yaparım.",tr:"Soru sor, ölç, en olası nedeni düzelt, belgele."},
{id:"b2",cat:"bt",q:"Parolasını unutan bir kullanıcıya nasıl yardım edersin?",a:"Önce kimliğini doğrularım (güvenlik sorusu veya yönetici onayı). Sonra parolayı sıfırlar, geçici parola verir ve ilk girişte değiştirmesini zorunlu kılarım. Parolayı mesajla düz metin yollamam. İşlemi ticket'a yazarım.",tr:"Kimlik doğrulama şart; güvenlik ilk kural."},
{id:"b3",cat:"bt",q:"Yazıcı çalışmıyor diyorlar. Adımların neler?",a:"Fiziksel: açık mı, kağıt ve kablo tamam mı? Sonra ağ: yazıcının IP'sine ping atarım. Sonra yazılım: sürücü ve yazdırma kuyruğu. Sorun tek kişide mi herkeste mi diye bakarım. Çözüm ve neden ticket'a yazılır.",tr:"Aşağıdan yukarı: kablo, ağ, yazılım."},
{id:"b4",cat:"bt",q:"Aynı anda üç acil talep geldi. Önceliği nasıl belirlersin?",a:"Etki ve aciliyete bakarım: kaç kişi etkileniyor, iş durdu mu, geçici çözüm var mı. Tüm şirketi etkileyen sorun önce gelir. Diğer kişilere durumu ve tahmini süreyi bildiririm.",tr:"Etki x aciliyet; iletişim kur."},
{id:"b5",cat:"bt",q:"Active Directory nedir, ne işe yarar?",a:"Active Directory, Microsoft'un merkezi dizin hizmetidir. Kullanıcıları, bilgisayarları ve grupları tek yerden yönetir. Kimlik doğrulama (giriş) ve yetkilendirme (kim neye erişir) yapar, grup politikasıyla ayarları dağıtır.",tr:"Merkezi kullanıcı ve yetki yönetimi."},
{id:"b6",cat:"bt",q:"Yedekleme için 3-2-1 kuralı nedir?",a:"Verinin 3 kopyası olmalı, 2 farklı ortamda saklanmalı ve 1 kopya farklı bir yerde (ofis dışında veya bulutta) durmalı. Ayrıca geri yüklemeyi düzenli test etmek gerekir.",tr:"3 kopya, 2 ortam, 1 dışarıda."},
{id:"b7",cat:"bt",q:"İyi bir ticket nasıl yazılır?",a:"Kısa ve net bir başlık, ne olduğu, ne zaman başladığı, kimleri etkilediği, denenen adımlar ve sonuç. Kapatırken kök neden ve çözüm eklenir; böylece bir sonraki kişi aynı sorunu hızlı çözer.",tr:"Başlık, etki, adımlar, çözüm."},
{id:"n1",cat:"ag",q:"OSI modelini kısaca anlat.",a:"7 katmanı vardır: Fiziksel, Veri bağı, Ağ, Taşıma, Oturum, Sunum, Uygulama. Aşağıdan yukarı her katman bir işi yapar: bitler, çerçeveler (MAC), paketler (IP), segmentler (TCP/UDP) ve en üstte uygulama. Sorun gidermede katman katman ilerlemeye yarar.",tr:"7 katman, her biri bir iş; teşhis rehberi."},
{id:"n2",cat:"ag",q:"TCP ile UDP arasındaki fark nedir?",a:"TCP bağlantı kurar, veriyi sıralı ve garantili teslim eder, kayıp paketi tekrar yollar (web, e-posta). UDP bağlantısızdır, daha hızlıdır ama garanti vermez (DNS sorguları, canlı görüntü, ses).",tr:"Güvenilir ve yavaş / hızlı ve garantisiz."},
{id:"n3",cat:"ag",q:"Router ile switch arasındaki fark nedir?",a:"Switch aynı ağdaki cihazları MAC adresine göre birbirine bağlar. Router farklı ağları birbirine bağlar ve IP adresine göre en uygun yolu seçer. İnternete çıkış kapısı (gateway) router'dır.",tr:"Aynı ağ: switch. Farklı ağlar: router."},
{id:"n4",cat:"ag",q:"DHCP nasıl çalışır?",a:"DORA adımlarıyla: cihaz Discover ile sunucu arar, sunucu Offer ile adres önerir, cihaz Request ile onu ister, sunucu Acknowledge ile onaylar. Böylece cihaz IP, maske, gateway ve DNS bilgisini otomatik alır.",tr:"Discover, Offer, Request, Acknowledge."},
{id:"n5",cat:"ag",q:"DNS nedir?",a:"DNS, alan adlarını IP adreslerine çeviren telefon rehberi gibi bir sistemdir. google.com yazınca DNS sunucusu gerçek IP adresini verir ve tarayıcı oraya bağlanır.",tr:"İsim, IP'ye çevrilir."},
{id:"n6",cat:"ag",q:"VLAN nedir, neden kullanılır?",a:"VLAN, bir fiziksel switch'i mantıksal olarak birkaç ayrı ağa bölmektir. Yayın (broadcast) alanını küçültür, güvenliği artırır ve departmanları ayırır. VLAN'lar arası iletişim için router veya L3 switch gerekir.",tr:"Mantıksal ayrım: performans ve güvenlik."},
{id:"n7",cat:"ag",q:"Subnetting neden gerekli?",a:"Büyük bir ağı küçük parçalara bölmek için. Böylece IP adresleri verimli kullanılır, yayın trafiği azalır ve güvenlik ile yönetim kolaylaşır. Örneğin her departmana ayrı alt ağ verilir.",tr:"Verimlilik, güvenlik, yönetim."},
{id:"n8",cat:"ag",q:"ping ile traceroute arasındaki fark nedir?",a:"ping, hedefe ulaşılıp ulaşılmadığını ve gecikmeyi gösterir. traceroute paketin hedefe giderken hangi router'lardan (atlamalardan) geçtiğini gösterir; yavaşlığın veya kopmanın nerede olduğunu bulmaya yarar.",tr:"Ulaşıyor mu / hangi yoldan gidiyor."},
{id:"n9",cat:"ag",q:"NAT nedir?",a:"NAT, özel (private) IP adreslerini internete çıkarken genel (public) bir adrese çevirir. Böylece ofisteki yüzlerce cihaz tek genel IP ile internete çıkabilir ve IPv4 adresleri korunur.",tr:"Özel adres, genel adrese çevrilir."},
{id:"n10",cat:"ag",q:"Bir kullanıcı internete çıkamıyor. Teşhis adımların?",a:"Önce fiziksel katman: kablo ve ışıklar. Sonra tek kişi mi herkes mi? Gateway'e ping, sonra 8.8.8.8'e ping, sonra alan adına ping. IP adresi alınmış mı (ipconfig)? Böylece sorunu yerel ağ, internet çıkışı veya DNS olarak ayırırım.",tr:"Kablo, gateway, 8.8.8.8, alan adı."},
{id:"n11",cat:"ag",q:"Firewall nedir?",a:"Firewall, ağ trafiğine kurallarla izin veren veya engelleyen güvenlik cihazı ya da yazılımdır. Kaynak, hedef, port ve protokole bakarak kapıdaki güvenlik görevlisi gibi çalışır.",tr:"Kurala göre izin ver / engelle."},
{id:"n12",cat:"ag",q:"VPN nedir?",a:"VPN, internet üzerinden şifreli bir tünel kurar. Uzaktaki çalışan şirket ağına güvenli şekilde bağlanır, trafiği dışarıdan okunamaz. Ofisler arasında da kullanılır.",tr:"Şifreli tünel, güvenli uzak erişim."},
{id:"n13",cat:"ag",q:"Switch MAC tablosunu nasıl doldurur?",a:"Gelen her çerçevenin kaynak MAC adresini ve geldiği portu tabloya yazar. Hedef MAC tabloda varsa sadece o porta gönderir, yoksa geldiği port dışındaki tüm portlara yayar (flooding).",tr:"Kaynak MAC'i öğrenir, hedefe göre iletir."}
];
var IVC=[["all","Hepsi"],["tanis","Tanışma (EN)"],["bt","BT destek"],["ag","Ağ"]];
S.interview=[];S.iv={cat:"all",id:null,show:false,left:60,run:false,iv:null};
function ivRec(id){return S.interview.filter(function(r){return r.id===id})[0]||null}
function ivNext(){
  var pool=IVB.filter(function(q){return S.iv.cat==="all"||q.cat===S.iv.cat}),td=today();
  var due=pool.filter(function(q){var r=ivRec(q.id);return r&&String(r.due||"")<=td}).sort(function(a,b){return String(ivRec(a.id).due).localeCompare(String(ivRec(b.id).due))});
  if(due.length)return due[0];
  var fresh=pool.filter(function(q){return !ivRec(q.id)});
  if(fresh.length){var r=rngf(dayNum(td)*31+S.interview.length);return fresh[Math.floor(r()*fresh.length)]}
  return pool.slice().sort(function(a,b){return String(ivRec(a.id).due).localeCompare(String(ivRec(b.id).due))})[0]||null;
}
function ivStop(){var I=S.iv;if(I.iv){clearInterval(I.iv);I.iv=null}I.run=false}
function ivStart(){
  var I=S.iv;if(I.run)return;I.run=true;I.left=60;
  I.iv=setInterval(function(){I.left=Math.max(0,I.left-1);var el=document.getElementById("iv-t");if(el)el.textContent=fmtT(I.left);if(I.left<=0){ivStop();draw()}},1000);draw();
}
function ivRate(q,good){
  if(!S.db||!S.canWrite)return;
  var r=ivRec(q.id)||{id:q.id,box:0,n:0},box=good?Math.min(5,num(r.box)+1):1,d=new Date();d.setDate(d.getDate()+LEIT[box-1]);
  var doc={q:q.id,cat:q.cat,box:box,n:num(r.n)+1,due:iso(d),last:today(),ts:new Date().toISOString()};
  S.db.doc("interview/"+q.id).set(doc).catch(function(){});
  doc.id=q.id;S.interview=S.interview.filter(function(x){return x.id!==q.id}).concat([doc]);
  setProg({mul_n:num(prog().mul_n)+1});
  ivStop();S.iv.id=null;S.iv.show=false;draw();
}
function renderInterview(){
  var I=S.iv,q=I.id&&IVB.filter(function(x){return x.id===I.id})[0]||null;
  if(!q){q=ivNext();I.id=q?q.id:null}
  var tried=S.interview.length,mast=S.interview.filter(function(r){return num(r.box)>=4}).length,today_n=num(prog().mul_n),out=[];
  out.push(h("div",{class:"panel"},h("div",{class:"label"},"Mülakat antrenmanı"),h("h2",null,"Sesli prova"),
    h("div",{class:"small mute"},"Soruyu oku, 60 saniye SESLİ cevapla, sonra model cevaba bak ve dürüstçe puanla. Zorlandıkların yarın, iyi olanlar daha seyrek geri gelir."),
    h("div",{class:"dstats"},h("div",null,h("b",null,tried+"/"+IVB.length),h("small",null,"denendi")),h("div",null,h("b",null,mast),h("small",null,"oturdu")),h("div",null,h("b",null,today_n),h("small",null,"bugün")),
      h("div",null,h("b",null,S.interview.filter(function(r){return String(r.due||"")<=today()}).length),h("small",null,"tekrar bekliyor"))),
    h("div",{class:"chiprow"},IVC.map(function(c){return h("button",{class:"fchip"+(I.cat===c[0]?" on":""),type:"button",onclick:function(){ivStop();I.cat=c[0];I.id=null;I.show=false;draw()}},c[1])}))));
  out.push(wmPanel());
  if(!q)return out.concat(h("div",{class:"empty"},"Bu grupta soru yok."));
  var rec=ivRec(q.id),en=q.cat==="tanis";
  out.push(h("div",{class:"panel ivq"},h("div",{class:"tk-top"},h("span",{class:"pill "+(en?"eng":"")},en?"İngilizce":q.cat==="bt"?"BT destek":"Ağ"),rec?h("span",{class:"pill"},"kutu "+rec.box+"/5"):h("span",{class:"pill nw"},"yeni")),
    h("b",{class:"qq"},q.q),
    h("div",{class:"ivt"},h("span",{id:"iv-t",class:"ivclock"},fmtT(I.left)),
      I.run?h("button",{class:"btn ghost",type:"button",onclick:function(){ivStop();draw()}},"Durdur"):h("button",{class:"btn",type:"button",onclick:ivStart},"60 sn başlat")),
    h("div",{class:"small mute"},"İpucu: "+q.tr),
    !I.show?h("button",{class:"btn ghost",type:"button",onclick:function(){ivStop();I.show=true;draw()}},"Model cevabı göster"):
      h("div",{class:"fb"},h("small",null,"Model cevap"),h("p",{style:"margin:0;line-height:1.55"},q.a),
        en?h("button",{class:"btn ghost",type:"button",onclick:function(){speak(q.a)}},"Dinle"):null,
        h("div",{class:"row"},h("button",{class:"btn",type:"button",disabled:!S.canWrite,onclick:function(){ivRate(q,true)}},"İyiydi"),h("button",{class:"btn ghost",type:"button",disabled:!S.canWrite,onclick:function(){ivRate(q,false)}},"Zorlandım")))));
  out.push(h("div",{class:"small mute"},"Model cevaplar benim yazdığım örneklerdir; kendi sözlerinle ve kendi deneyiminle uyarla. Kalıpları ezberlemek yerine yapısını (durum, ne yaptım, sonuç) öğren."));
  var rbP=typeof renderRubrikPaneli==="function"?renderRubrikPaneli():null;if(rbP)out.push(rbP);
  return out;
}

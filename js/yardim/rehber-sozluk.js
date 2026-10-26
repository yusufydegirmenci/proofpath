"use strict";
/* ---- v22: Rahat okuma, Sade mod, Rehber, Sözlük ---- */
var PFKEY="ya_pf";
S.pf={fs:0,simple:false,hc:false,pace:"normal",share:true};
try{var _pf=JSON.parse(localStorage.getItem(PFKEY)||"null");if(_pf&&typeof _pf==="object"){S.pf.fs=[0,1,2].indexOf(_pf.fs)>=0?_pf.fs:0;S.pf.simple=!!_pf.simple;S.pf.hc=!!_pf.hc;S.pf.share=_pf.share!==false;S.pf.pace=["rahat","normal","hizli"].indexOf(_pf.pace)>=0?_pf.pace:"normal"}}catch(e){}
function applyPf(){
  var c=document.body.classList;c.toggle("fs1",S.pf.fs===1);c.toggle("fs2",S.pf.fs===2);c.toggle("simple",!!S.pf.simple);c.toggle("hc",!!S.pf.hc);
}
function savePf(){
  try{localStorage.setItem(PFKEY,JSON.stringify(S.pf))}catch(e){}
  applyPf();
  if(S.db&&S.canWrite&&!S.guest)S.db.doc("prefs/main").set({fs:S.pf.fs,simple:S.pf.simple,hc:S.pf.hc,pace:S.pf.pace,share:S.pf.share,ts:new Date().toISOString()}).catch(function(){});
  draw();
}
applyPf();
function seenWelcome(){try{return localStorage.getItem("ya_seen")==="1"}catch(e){return true}}
function setSeen(){try{localStorage.setItem("ya_seen","1")}catch(e){}}
var GLOS=[
["Router","Router (yönlendirici)",["router","yönlendirici"],"Farklı ağları birbirine bağlayan ve paketin hangi yoldan gideceğine karar veren cihaz. Şehirler arası yol tabelası gibi: paket hedef şehre hangi yoldan gideceğini ondan öğrenir."],
["Switch","Switch (anahtar)",["switch"],"Aynı ağdaki cihazları (bilgisayar, yazıcı) birbirine bağlayan ve veriyi yalnız doğru cihaza yollayan cihaz. Apartmandaki posta görevlisi gibi: mektubu sadece ilgili daireye bırakır."],
["Hub","Hub",["hub"],"Gelen veriyi bağlı herkese yollayan eski, akılsız dağıtıcı. Bağırarak yapılan anons gibi: herkes duyar. Yerini switch aldı."],
["Modem","Modem",["modem"],"Evinizi internet sağlayıcısına (ISP) bağlayan cihaz. Binaya gelen ana su borusu gibi: sadece interneti içeri alır, dağıtmak router'ın işidir."],
["Access Point","Access Point (AP, erişim noktası)",["access point","erişim noktası"],"Kablosuz (Wi-Fi) cihazları kablolu ağa bağlayan cihaz. Kablonun havadaki uzantısıdır."],
["Firewall","Firewall (güvenlik duvarı)",["firewall","güvenlik duvarı"],"Ağa giren ve çıkan trafiği kurallara göre izin verip engelleyen koruma. Sitenin kapısındaki güvenlik görevlisi gibi."],
["IP adresi","IP adresi",["ip adresi","ip adresleri","ip"],"Ağdaki her cihazın numarası, örneğin 192.168.1.10. Evinizin posta adresi gibi: veri nereye gideceğini bununla bilir."],
["MAC adresi","MAC adresi",["mac adresi","mac"],"Ağ kartının fabrikada verilen sabit kimlik numarası. Cihazın seri numarası gibi; aynı ağ içinde bununla tanınır."],
["Alt ağ maskesi","Alt ağ maskesi (subnet mask)",["alt ağ maskesi","subnet mask","maske"],"IP adresinin hangi kısmının ağı, hangi kısmının cihazı gösterdiğini söyler. Adresteki 'mahalle' ile 'kapı numarasını' ayıran çizgi gibi."],
["Subnet","Subnet (alt ağ)",["subnet","alt ağ","subnetting"],"Büyük bir ağı küçük parçalara bölmek. Büyük bir apartman sitesini bloklara ayırmak gibi."],
["Gateway","Gateway (ağ geçidi)",["gateway","ağ geçidi","default gateway"],"Cihazın kendi ağının dışına çıkarken kullandığı kapı; çoğunlukla router. 'Bilmediğim yere buradan gönder' adresidir."],
["DNS","DNS",["dns"],"Alan adlarını (google.com) IP adresine çeviren telefon rehberi. Adı yazarsın, numarasını o bulur."],
["DHCP","DHCP",["dhcp"],"Ağa bağlanan cihazlara otomatik IP adresi dağıtan hizmet. Otelde resepsiyonun oda numarası vermesi gibi."],
["NAT","NAT",["nat","pat"],"Evdeki birçok cihazın tek genel adresle internete çıkmasını sağlar. Büyük bir ofisin tek telefon numarası ve dahili numaralarla çalışması gibi."],
["Port","Port",["port","portu","portlar"],"Bir cihazdaki kapı numarası. Hem fiziksel (kablo girişi) hem mantıksal (örneğin web için 80, 443) olabilir."],
["TCP","TCP",["tcp"],"Verinin eksiksiz ve sırayla ulaştığını kontrol eden güvenilir taşıma yöntemi. Alındı belgeli, imza karşılığı kargo gibi."],
["UDP","UDP",["udp"],"Hızlı ama onay beklemeyen taşıma yöntemi. Canlı yayın ve görüntülü görüşmede kullanılır; normal mektup gibi: kaybolursa tekrar sormaz."],
["Ping","Ping / ICMP",["ping","icmp"],"Başka bir cihaza 'orada mısın?' diye küçük bir mesaj yollayıp cevap bekleyen test komutu. Karşıya seslenip yankı beklemek gibi."],
["OSI modeli","OSI modeli",["osi","osı","katman","katmanı","katmanlar"],"Ağ iletişimini 7 kat olarak anlatan standart bir harita. Posta sisteminin adım adım aşamaları gibi: yazma, zarflama, adres, taşıma."],
["VLAN","VLAN",["vlan"],"Aynı switch'i mantıksal olarak ayrı ağlara bölmek. Aynı binadaki kat kat ayrı bölümler gibi: muhasebe ve misafir birbirini görmez."],
["Trunk","Trunk",["trunk"],"Birden fazla VLAN'ın aynı kabloda taşındığı bağlantı. Birkaç şeritli ana yol gibi."],
["STP","STP",["stp"],"Switch'ler arasında döngü oluşmasını engelleyen protokol. Bir şehirde yolların daireler çizip trafiği kilitlemesini önler."],
["EtherChannel","EtherChannel",["etherchannel"],"Birden çok kabloyu tek geniş yol gibi birleştirmek."],
["OSPF","OSPF",["ospf"],"Router'ların birbirine yol bilgisi vererek en iyi rotayı bulduğu protokol. Navigasyon uygulamasının trafiği paylaşması gibi."],
["Statik rota","Statik rota",["statik rota","static route"],"Yol tarifini elle yazmak. Navigasyon yerine 'şu sokaktan git' diye kâğıda not yazmak gibi."],
["ACL","ACL",["acl"],"Router veya switch'te 'kim girebilir, kim giremez' kurallarının listesi. Bina girişindeki isim listesi gibi."],
["VPN","VPN",["vpn"],"Güvenli olmayan ağ üzerinde şifreli özel tünel açmak. Kalabalık yolda zırhlı araç gibi."],
["SSH","SSH",["ssh"],"Bir cihaza uzaktan, şifreli ve güvenli bağlanma yöntemi."],
["Telnet","Telnet",["telnet"],"SSH'ın eski, şifresiz kardeşi. Güvenli değildir, kullanılmamalıdır."],
["LAN","LAN",["lan"],"Küçük bir alandaki (ofis, ev) yerel ağ."],
["WAN","WAN",["wan"],"Şehirler veya ülkeler arası geniş ağ; internet gibi."],
["ISP","ISP",["isp","internet sağlayıcı"],"İnternet sağlayıcınız (örneğin Türk Telekom). Evi internete bağlayan şirket."],
["Bant genişliği","Bant genişliği",["bant genişliği","bandwidth"],"Bir bağlantının bir saniyede taşıyabileceği veri miktarı. Borunun kalınlığı gibi."],
["Gecikme","Gecikme (latency)",["gecikme","latency"],"Verinin bir yerden diğerine varış süresi. Borunun uzunluğu gibi; kalın olsa da uzunsa geç gelir."],
["Paket","Paket / çerçeve",["paket","çerçeve","frame","segment"],"Verinin ağda taşınan küçük parçaları. Büyük bir kolinin küçük kutulara bölünüp gönderilmesi gibi."],
["Broadcast","Broadcast (yayın)",["broadcast","yayın"],"Ağdaki herkese birden gönderilen mesaj. Hoparlörle anons gibi."],
["Bit","Bit ve byte",["bit","byte"],"Bit, bilgisayarın en küçük birimi (0 veya 1). 8 bit = 1 byte."],
["CLI","CLI (komut satırı)",["cli","komut satırı"],"Cihaza fare ile değil yazıyla komut vermek. Telefonda tuşa basmak yerine konuşarak emir vermek gibi."],
["Konsol","Console portu",["console","konsol"],"Cihaza ilk kez bağlanıp ayar yapmak için kullanılan özel kablo girişi."],
["Router modu","Yapılandırma (config)",["yapılandırma","config","running-config","startup-config"],"Cihazın ayarları. running-config çalışırken kullanılan ayardır, startup-config cihaz kapanınca kalan kayıtlı ayardır; kayıt için 'copy running-config startup-config' yazılır."],
["Bridge","STP / Root bridge",["root bridge","bridge id"],"STP'de ağın 'merkezi' seçilen switch. En düşük numaralı olan kazanır."],
["Handshake","El sıkışma (handshake)",["el sıkışma","handshake","syn"],"TCP'de iki tarafın 'hazır mıyım, hazırım, tamam' diye üç adımda bağlantı kurması."],
["DHCP DORA","DORA",["dora"],"DHCP'nin 4 adımı: Discover (arıyorum), Offer (teklif), Request (isterim), Acknowledge (onay)."],
["Ticket","Ticket (destek talebi)",["ticket","destek talebi"],"Bir kullanıcının BT ekibine yazdığı sorun kaydı. İş yerinde çok kullanılır; kayıt numarası ile takip edilir."],
["Am/is/are","am / is / are",["am","is","are"],"İngilizcede 'olmak' fiili. I am (ben ...im), he/she/it is (o ...dir), we/you/they are (biz/siz/onlar ...iz)."],
["Can","can",["can","cannot","can't"],"'-ebilmek' demektir. I can help = Yardım edebilirim. Ardından fiil yalın gelir."],
["Will","will",["will","won't"],"Gelecek zaman. I will call = Arayacağım."],
["Should","should / must",["should","must"],"should = -malı (öneri), must = -ma zorundayım / yasak (güçlü zorunluluk)."],
["Present perfect","have / has + V3",["present perfect","have + v3","v3"],"'Daha önce yaptım' deneyimini anlatır. I have fixed it = Düzelttim (ve sonuç şimdi önemli)."],
["XP","XP (deneyim puanı)",["xp"],"Çalıştıkça kazandığın puan. Rütbe atlamak için gerekir."],
["Seri","Seri",["seri","streak"],"Üst üste çalıştığın gün sayısı."],
["Joker","Joker (izin günü)",["joker"],"Bir gün ara verirsen serinin bozulmaması için kullanabildiğin hak."],
["Pas","Pas (tekrar uyarısı)",["pas","paslanıyor","paslanan"],"Bir konuyu 7 günden uzun süre tekrar etmediğinde çıkan uyarı. Unutmaya başladığın anlamına gelir; küçük bir tekrar sorusu çözünce geçer."],
["Bina","Bina (konu)",["bina"],"Ağ Şehri'ndeki her bir konu. Bina ne kadar yüksekse konuyu o kadar iyi biliyorsun."],
["Semt","Semt / mahalle",["semt","mahalle"],"Birbirine yakın konuların grubu. Örneğin Temel Mahallesi başlangıç konularıdır."],
["Isınma","Isınma",["ısınma"],"Derse başlamadan önce geçen dersten hatırlama ve bugünkü kavramlara kısa giriş (yaklaşık 5 dakika)."],
["Koç","Koç",["koç","koçlar"],"Her akşam sana ders ve soru hazırlayan yapay zekâ yardımcısı."],
["Müdür","Müdür",["müdür"],"Haftada bir koçların işini denetleyen ve öneri sunan yapay zekâ yönetici. Önerileri sen onaylarsın."],
["Lig","Lig",["lig"],"İsteğe bağlı arkadaş yarışması. Günlük kısa soru çözüp puan toplarsın; rekabet istemiyorsan hiç girmen gerekmez."]
];
function glossFor(text){
  var tx=" "+String(text||"").toLowerCase()+" ",out=[];
  GLOS.forEach(function(g){
    if(["Am/is/are","Seri","XP","Joker","Pas","Bina","Semt","Isınma","Koç","Müdür","Lig","Bit","Bridge","Router modu"].indexOf(g[0])>=0)return;
    for(var i=0;i<g[2].length;i++){
      var a=g[2][i].toLowerCase();if(a.length<3)continue;
      var re=new RegExp("(^|[^a-zçğıöşü0-9])"+a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"([^a-zçğıöşü0-9]|$)","i");
      if(re.test(tx)){out.push(g);break}
    }
  });
  return out.slice(0,10);
}
function lessonTextOf(l){
  var parts=[l.title,l.hook,l.homework];
  (Array.isArray(l.blocks)?l.blocks:[]).forEach(function(b){if(!b)return;parts.push(b.text,b.h,b.tr,b.result);(Array.isArray(b.items)?b.items:[]).forEach(function(x){parts.push(x)});(Array.isArray(b.parts)?b.parts:[]).forEach(function(x){if(x)parts.push(x.tr,x.en)})});
  return parts.filter(Boolean).join(" ");
}
function lessonTerms(l){
  var g=glossFor(lessonTextOf(l));if(!g.length)return null;
  return h("details",{class:"panel gloss-l",id:"ls-terim"},h("summary",null,h("b",null,"Bu derste geçen terimler"),h("span",{class:"pill"},String(g.length))),
    h("div",{class:"gl-list"},g.map(function(x){return h("div",{class:"gl-i"},h("b",null,x[1]),h("p",null,x[3]))})),
    h("button",{class:"btn ghost",type:"button",onclick:function(){goTab("sozluk")}},"Tüm sözlüğü aç"));
}
S.gl={q:""};
var _glAll=null;
function glAll(){return _glAll||(_glAll=PP_SOZLUK.birlestir(GLOS,window.PP_LESSONS,window.PP_SOZLUK_EK))}
function glRows(q){
  q=String(q||"").toLowerCase().trim();
  var r=glAll().filter(function(g){return !q||g.ad.toLowerCase().indexOf(q)>=0||g.tx.toLowerCase().indexOf(q)>=0||g.en.toLowerCase().indexOf(q)>=0||g.ara.some(function(a){return a.indexOf(q)>=0})});
  if(!r.length)return [h("div",{class:"empty"},"Bu kelimeyi sözlükte bulamadım. Dersin içinde geçtiği yerde 'Anlamadığım yer' kutusuna yazabilirsin.")];
  return r.slice(0,120).map(function(x){var d=PP_SOZLUK.dersEtiket(x.ders);return h("div",{class:"gl-i"},h("b",null,x.ad),h("p",null,x.tx),d?h("div",{class:"small mute"},d):null)}).concat(r.length>120?[h("div",{class:"small mute"},"İlk 120 sonuç gösteriliyor; aramayı daralt.")]:[]);
}
function renderGlossary(){
  var list=h("div",{class:"gl-list",id:"gl-list"},glRows(S.gl.q));
  var inp=h("input",{type:"search",placeholder:"Kelime ara, örn. load balancer",maxlength:40,"aria-label":"Sözlükte ara",oninput:function(e){S.gl.q=e.target.value;var el=document.getElementById("gl-list");if(el)el.replaceChildren.apply(el,glRows(S.gl.q))}});inp.value=S.gl.q;
  return [h("div",{class:"panel"},h("div",{class:"label"},"Sözlük"),h("h2",null,"Bilmediğin kelimeye bak"),h("div",{class:"small mute"},glAll().length+" terim (A-Z), günlük dille; derste geçen kavramlar ders bilgisiyle. Bir ders sırasında takıldığında buraya gel."),inp),h("div",{class:"panel"},list)];
}
function guideStep(n,t,d){return h("div",{class:"gd-s"},h("span",{class:"gd-n"},String(n)),h("div",null,h("b",null,t),h("p",null,d)))}

"use strict";
/* ALAN: Oyun sekmesi, Fetih sekmesi (tarihî toprak fethi stratejisi). NE YAPAR: FK_SC senaryolarını, harita üretimini (fkMap), yapay zekâ saldırı döngüsünü (fkTick/fkAI), soru-kapılı satın alma/saldırıyı ve günlük meydan okumayı (fkDaily) içerir; ekranlar oyun-merkezi.js içinden açılır.
   SORUN OLURSA: localStorage ya_fk (en iyi sonuçlar) ve ya_fkd (günlük) tutulur; ya_fk altin-vurus.js syncOut ile eşitlenir. Denge sayıları FK_DF/FK_BL/FK_KD; tests/make-dbg.js bu adları __X ile açar, ad değişirse oraya da yansıtın. Yükleme sırası tests/sira.js ile denetlenir.
   YENİ ÖZELLİK: Yeni senaryo FK_SC; saldırı/ekonomi fkStepAttack/fkBuy. Testler: tests/t57f_fetih_balance.js, t57g_fetih_ui.js, t58g_fetih2.js, t59d_fk3.js, t59g.js. */
/* ---- v57: FETİH, tarihî toprak fethi stratejisi ---- */
var FK_KEY="ya_fk",FK_W=36,FK_H=26,FK_SPD=.55;
var FK_SC=[
{id:"dandanakan",n:"Dandanakan 1040",sub:"Büyük Selçuklu'nun doğuşu",yr:[1038,1055],goal:50,par:230,
 pl:{n:"Selçuklular",c:"#1d8a99",l:"Tuğrul ve Çağrı Bey",tn:"Atlı okçular",td:"Saldırı hızın %20 yüksek",md:{rate:1.2}},
 ai:[{n:"Gazneliler",c:"#8c5a2b",d:1.1,r:1.05},{n:"Karahanlılar",c:"#3c8f48"},{n:"Büveyhîler",c:"#6b3fa0",d:1.1}],
 brief:"1038. Tuğrul ve Çağrı Bey Nişabur'da Selçuklu yönetimini kurdu; karşında güçlü Gazneli ordusu var. Dandanakan'da kazanıp Büyük Selçuklu Devleti'nin temelini at. Toprağın %50'sini ele geçir.",
 notes:[[0,"1038: Tuğrul Bey Nişabur'da hükümdar ilan edildi."],[20,"Mayıs 1040: Dandanakan Savaşı. Selçuklular, Gazneli Sultan Mesud'un ordusunu yenip Horasan'a hâkim oldu."],[35,"Merv ve Nişabur gibi şehirlerle Selçuklular büyüyen bir devlete dönüştü."],[50,"1055: Tuğrul Bey Bağdat'a girdi; Abbasi halifesi ona 'Sultan' unvanını verdi."]],
 ev:[["Çöl yürüyüşü","Ordu kurak Horasan yollarında susuzluk çekiyor.",["Kuyu açtır",-40,.06,"Kuyular açıldı, ordu toparlandı."],["Hızlı yürü",0,-.07,"Ordu çabuk ulaştı ama yoruldu."]],
  ["Boy beyleri","Türkmen boy beyleri ganimetten pay istiyor.",["Pay ver",-50,.12,"Beyler memnun, yeni atlılar katıldı."],["Reddet",40,-.05,"Hazine kaldı ama bazı atlılar ayrıldı."]]]},
{id:"malazgirt",n:"Malazgirt 1071",sub:"Anadolu'nun kapıları",yr:[1071,1090],goal:55,par:240,
 pl:{n:"Büyük Selçuklu",c:"#1d8a99",l:"Alparslan",tn:"Türkmen akıncıları",td:"Saldırıda %15 az kayıp verirsin",md:{cost:.85}},
 ai:[{n:"Bizans",c:"#6b3fa0",d:1.15},{n:"Ermeni Beylikleri",c:"#c9892a"},{n:"Gürcü Krallığı",c:"#3c8f48"},{n:"Haçlı Şövalyeleri",c:"#9a9aa6",r:1.1}],
 brief:"Ağustos 1071. Sultan Alparslan, Bizans İmparatoru IV. Romanos Diogenes'i Malazgirt'te yendi. Sen şimdi Türkmen akıncılarını sevk edip Anadolu'nun kapılarını aç. Toprağın %55'ini ele geçirirsen Anadolu bir Türk yurdu olur.",
 notes:[[0,"Ağustos 1071: Malazgirt Meydan Muharebesi. Alparslan, Bizans ordusunu yenip imparatoru esir aldı."],[20,"Türkmen boyları Anadolu'ya yayılırken Danişmendliler, Saltuklular ve Mengücekler gibi beylikler kuruldu."],[40,"Kutalmışoğlu Süleymanşah, 1070'lerde İznik'i alıp Anadolu Selçuklu Devleti'nin temelini attı."],[55,"Anadolu artık bir Türk yurdu. Sonraki yüzyıllarda burada Anadolu Selçuklu ve sonra Osmanlı kurulacak."]],
 ev:[["Ağır Bizans ordusu","Bizans ordusu kalabalık ama ağır hareket ediyor.",["Hafif süvariyle yıprat",-30,.1,"Akıncılar ordunun yan kanatlarını yordu."],["Cepheden bekle",0,0,"Beklemek güvenliydi ama fırsat kaçtı."]],
  ["Hilal planı","Alparslan geri çekilir gibi yapıp düşmanı kıskaca almayı öneriyor.",["Planı uygula",-20,.15,"Kıskaç işledi, düşman dağıldı."],["Cepheden saldır",0,-.08,"Doğrudan saldırı kayıp verdirdi."]]]},
{id:"miryokefalon",n:"Miryokefalon 1176",sub:"Anadolu'yu elde tutmak",yr:[1175,1176],goal:55,par:250,
 pl:{n:"Anadolu Selçuklu",c:"#2a9d8f",l:"II. Kılıçarslan",tn:"Dar geçit pusuları",td:"Savunmada kayıp maliyeti %25 yüksek",md:{def:1.25}},
 ai:[{n:"Bizans",c:"#6b3fa0",d:1.15,r:1.1},{n:"Antakya Prensliği",c:"#9a9aa6"},{n:"Kilikya Ermenileri",c:"#c9892a"},{n:"Artuklular",c:"#3c8f48"}],
 brief:"1176. Bizans İmparatoru I. Manuel Komnenos büyük bir orduyla Konya üzerine yürüyor. II. Kılıçarslan, dar geçitlerde ordusunu pusuya düşürmek için hazırlanıyor. Bölgede hâkimiyeti sağlayıp toprağın %55'ini ele geçir.",
 notes:[[0,"1176: I. Manuel, Anadolu'yu geri almak için büyük bir ordu topladı."],[20,"Kılıçarslan, Bizans ordusunu Miryokefalon (Çivritze) yakınındaki dar geçitte sıkıştırdı."],[40,"Savaştan sonra Bizans, Anadolu içlerine ilerleme hedefinden fiilen vazgeçti."],[55,"Miryokefalon, Anadolu'nun Türk yurdu olarak kalmasını pekiştiren bir dönüm noktası sayılır."]],
 ev:[["Dar geçit","Bizans ordusu dar bir geçitte uzayıp gidiyor.",["Pusu kur",-30,.12,"Pusu işledi, düşman düzeni bozuldu."],["Açıkta karşıla",0,-.06,"Açık meydan savaşı seni yordu."]],
  ["Otlaklar","Bizans ordusunun hayvanları yoldaki otlaklara bağımlı.",["Otlakları yak",-20,.1,"Düşman yem bulamadı."],["Dokunma",30,0,"Halka dokunmadın, vergi geldi."]]]},
{id:"sogut",n:"Söğüt 1299",sub:"Bir uç beyliğinin devlete yolu",yr:[1299,1326],goal:55,par:260,
 pl:{n:"Osmanlı Beyliği",c:"#c0392b",l:"Osman Bey",tn:"Gaza ruhu",td:"Ordun %20 daha hızlı büyür",md:{gro:1.2}},
 ai:[{n:"Bizans",c:"#6b3fa0",d:1.15},{n:"Germiyanoğulları",c:"#d98a1e"},{n:"Karesioğulları",c:"#2e8b57"},{n:"İlhanlılar",c:"#2a6fb0",r:1.1}],
 brief:"1299. Söğüt'te küçük bir uç beyliği olan Osmanlı, Bizans sınırında güçleniyor. Gaza ruhuyla komşu toprakları kat ve beyliği devlete dönüştür. Toprağın %55'ine ulaş.",
 notes:[[0,"1299 civarı: Osman Bey, Bizans sınırındaki Söğüt'te bir uç beyliği yönetiyor."],[20,"1302: Koyunhisar (Bafeus) Savaşı, Osmanlı'nın Bizans karşısındaki ilk büyük başarılarından sayılır."],[40,"1326: Bursa alındı ve Osmanlı'nın ilk başkenti oldu."],[55,"Sonraki yıllarda İznik (1331) ve Karesi Beyliği (1345) Osmanlı'ya katıldı."]],
 ev:[["Uç gazileri","Komşu köylerden gaziler saflara katılmak istiyor.",["Kabul et",-25,.14,"Gaziler saflara katıldı."],["Sınırı güçlendir",0,.04,"Sınır boyları daha güvenli."]],
  ["Ticaret yolu","Bursa yolundaki bir kervan koruma arıyor.",["Koruma sağla",60,-.04,"Koruma karşılığı vergi aldın."],["Geçsin",0,0,"Kervan yoluna devam etti."]]]},
{id:"istanbul",n:"İstanbul 1453",sub:"Çağ açıp çağ kapatan fetih",yr:[1451,1453],goal:55,par:260,
 pl:{n:"Osmanlı",c:"#c0392b",l:"Fatih Sultan Mehmed",tn:"Dev toplar",td:"Rakip başkentlere saldırı %60 daha ucuz",md:{cap:.4}},
 ai:[{n:"Bizans",c:"#6b3fa0",d:1.1},{n:"Venedik",c:"#2a6fb0"},{n:"Karamanoğulları",c:"#d98a1e"},{n:"Cenova",c:"#2e8b57"}],
 brief:"1451. Genç Sultan II. Mehmed tahta çıktı ve gözünü İstanbul'a dikti. Rumeli Hisarı'nı kurdurdu, dev toplar döktürdü. Rakip güçleri sıkıştırıp topraklarını genişlet. %55'e ulaşırsan fetih tamamdır.",
 notes:[[0,"1451-52: Mehmed, Boğaz'ı kontrol etmek için Rumeli Hisarı'nı kısa sürede inşa ettirdi."],[20,"Macar topçu ustası Urban'ın döktüğü toplar surlara karşı kullanıldı."],[40,"Gemiler, Haliç'teki zinciri aşmak için kızaklarla karadan yürütüldü."],[55,"29 Mayıs 1453: İstanbul fethedildi. Bu olay Orta Çağ'ın sonu sayılır."]],
 ev:[["Rumeli Hisarı","Boğaz'ı kontrol edecek bir hisar için usta ve malzeme gerekiyor.",["Hisarı kur",-60,.12,"Hisar kısa sürede kondu; Boğaz kontrol altında."],["Ertele",30,0,"Para tasarruf ettin."]],
  ["Dev toplar","Usta Urban dev bir top dökmeyi öneriyor.",["Ustayı tut",-70,.15,"Dev toplar surların karşısında etkili oldu."],["Geleneksel kuşatma",0,-.05,"Uzun kuşatma ordunu yordu."]]]},
{id:"ridaniye",n:"Ridaniye 1517",sub:"Doğu'nun anahtarı",yr:[1514,1517],goal:58,par:270,
 pl:{n:"Osmanlı",c:"#c0392b",l:"Yavuz Sultan Selim",tn:"Hazine ve ganimet",td:"Altın gelirin %40 yüksek",md:{gold:1.4}},
 ai:[{n:"Memlükler",c:"#d98a1e",d:1.1},{n:"Safeviler",c:"#2e8b57",r:1.1},{n:"Dulkadiroğulları",c:"#2a6fb0"}],
 brief:"1514. Çaldıran'da Safevileri yenen Yavuz Sultan Selim, gözünü Memlüklere dikti. Dulkadir'i kat, Mercidabık ve Ridaniye'de Memlük ordusunu yen. Toprağın %58'ini ele geçir.",
 notes:[[0,"Ağustos 1514: Çaldıran Savaşı. Osmanlı, Safevi ordusunu topçu ve tüfekle yendi."],[20,"1515: Dulkadir Beyliği Osmanlı'ya katıldı."],[40,"Ağustos 1516: Mercidabık Savaşı. Memlük Sultanı Kansu Gavri savaşta öldü."],[58,"Ocak 1517: Ridaniye Savaşı sonrası Mısır alındı; Mekke ve Medine'nin koruyuculuğu Osmanlı'ya geçti."]],
 ev:[["Ganimet","Elde edilen ganimet hazineye ya da orduya aktarılabilir.",["Hazineyi doldur",80,-.03,"Hazine büyüdü, bir kısım asker terhis edildi."],["Orduya dağıt",0,.1,"Askerlerin morali yükseldi."]],
  ["Sina Çölü","Mısır yolundaki çölü geçmek gerekiyor.",["Su ve yem hazırla",-60,0,"Ordu çölü kayıpsız geçti."],["Hızlı geç",0,-.12,"Çölde kayıplar verildi."]]]},
{id:"mohac",n:"Mohaç 1526",sub:"Orta Avrupa'nın kapısı",yr:[1521,1526],goal:60,par:300,
 pl:{n:"Osmanlı",c:"#c0392b",l:"Kanuni Sultan Süleyman",tn:"Tecrübeli Divan",td:"Divan sorusu %40 sık, ödülü %20 büyük",md:{qcd:.6,rew:1.2}},
 ai:[{n:"Macar Krallığı",c:"#c9892a",d:1.1},{n:"Habsburglar",c:"#9a9aa6",d:1.1},{n:"Venedik",c:"#2a6fb0"},{n:"Safeviler",c:"#2e8b57",r:1.1}],
 brief:"1521. Genç Kanuni tahta çıktı, Belgrad'ı aldı, Rodos'u fethetti. Şimdi karşında Macar Krallığı ve Orta Avrupa var. Mohaç ovasına yürü ve toprağın %60'ını ele geçir.",
 notes:[[0,"1521: Kanuni Belgrad'ı fethetti; Orta Avrupa'nın kapısı açıldı."],[20,"1522: Rodos Şövalyeleri'nin adası fethedildi."],[40,"29 Ağustos 1526: Mohaç Meydan Muharebesi. Macar Kralı II. Lajos savaşta öldü."],[60,"Mohaç'tan sonra Macaristan'ın büyük bölümü Osmanlı nüfuzuna girdi; Budin 1541'de alındı."]],
 ev:[["Sava Nehri","Ordu nehir kıyısında köprü bekliyor.",["Köprü kurdur",-50,.1,"Ordu hızla karşıya geçti."],["Sal ile geç",0,-.09,"Geçiş yavaş ve kayıplı oldu."]],
  ["Yeniçeriler","Yeniçeriler bahşiş (cülus) istiyor.",["Bahşiş ver",-60,.12,"Yeniçeri morali yükseldi."],["Sert davran",0,-.1,"Disiplin sağlandı ama moral düştü."]]]}
];
var FK_EVG=[
 ["Kıtlık haberi","Kıtlık köylere yayıldı; ordunun erzağı azalıyor.",["Ambarları aç",-50,.08,"Halk rahatladı, ordunun morali yükseldi."],["Ek vergi topla",70,-.08,"Hazine doldu ama askerler homurdandı."]],
 ["Casuslar","Casuslar rakiplerin hazırlığına dair haber getirdi.",["Haberi satın al",-40,.12,"Hazırlıklı yakalandın, ordu hızlandı."],["Boş ver",0,0,"Haberi dinlemedin, hayat devam ediyor."]],
 ["Gönüllüler","Komşu köylerden gönüllüler ordu saflarına katılmak istiyor.",["Hepsini kabul et",-30,.14,"Yeni askerler katıldı."],["Seçerek al",0,.05,"Küçük ama disiplinli bir takviye geldi."]],
 ["Tüccar kervanı","Bir kervan, ordudan korunma karşılığı vergi ödemek istiyor.",["Koruma sağla",90,-.04,"Hazine doldu, birkaç asker koruma görevinde kaldı."],["Geri çevir",0,0,"Kervan başka yola saptı."]],
 ["Salgın","Ordugâhta hastalık çıktı.",["Revire ayır",-45,-.03,"Hastalar iyileşti, kayıp az oldu."],["Yürüyüşe devam",0,-.12,"Ordu ilerledi ama yorgunluk kayıp verdi."]]
];
var FK_DF={k:{n:"Kolay",ai:7,tr:1.15,m:.8},n:{n:"Normal",ai:4.5,tr:1,m:1},z:{n:"Zor",ai:2.8,tr:.9,m:1.25}};
var FK_BL=[
 {id:"kis",n:"Kışla",d:"Asker üretimi +%18",c:[70,140,240]},
 {id:"his",n:"Hisar",d:"Savunmada kayıp maliyeti +%18",c:[70,140,240]},
 {id:"tal",n:"Talimhane",d:"Saldırı hızı +%12",c:[80,160,270]},
 {id:"han",n:"Han",d:"Altın geliri +%25",c:[60,120,200]},
 {id:"med",n:"Medrese",d:"Divan sorusu %20 sık, ödülü %20 büyük",c:[80,150,250]}
];
var FK_DK=[
 {id:"akin",n:"Akıncı Düzeni",d:"Saldırı hızı +%15, ordu üretimi −%5",md:{rate:1.15,gro:.95}},
 {id:"timar",n:"Tımar Düzeni",d:"Ordu üretimi +%20, saldırı hızı −%5",md:{gro:1.2,rate:.95}},
 {id:"ticaret",n:"Ticaret Yolu",d:"Altın geliri +%35",md:{gold:1.35}},
 {id:"kale",n:"Kale Düzeni",d:"Savunmada kayıp maliyeti +%20",md:{def:1.2}},
 {id:"divan",n:"Divan Geleneği",d:"Divan sorusu %20 sık, ödülü %15 büyük",md:{qcd:.8,rew:1.15}}
];
var FK_CM=[
 {id:"fatih",n:"Fetih Ustası",d:"Rakip başkentlere saldırı %30 ucuz",md:{cap:.7}},
 {id:"mimar",n:"Baş Mimar",d:"Külliye yapıları %20 ucuz",bd:.8},
 {id:"elci",n:"Elçibaşı",d:"Diplomasi %35 ucuz",td:.65},
 {id:"gozpek",n:"Gözü Pek Bey",d:"Saldırı hızı +%10, savunma −%10",md:{rate:1.1,def:.9}},
 {id:"hazine",n:"Hazinedar",d:"70 altınla başlarsın",sg:70},
 {id:"aga",n:"Yeniçeri Ağası",d:"%25 daha büyük orduyla başlarsın",st:1.25},
 {id:"kasif",n:"Kâşif",d:"Boş topraklara yayılma %25 ucuz",ne:.75},
 {id:"hekim",n:"Baş Hekim",d:"Ordu üretimi +%10, olaylarda asker kaybı yok",md:{gro:1.1},nl:1}
];
var FK_KD=[
 {id:"bereket",n:"Bereketli Yıl",d:"Herkesin ordusu %15 hızlı büyür",md:{gro:1.15}},
 {id:"kitlik",n:"Kıtlık Yılı",d:"Herkesin ordusu %15 yavaş büyür",md:{gro:.85}},
 {id:"kis",n:"Sert Kış",d:"Herkesin saldırı hızı %15 düşer",md:{rate:.85}},
 {id:"savas",n:"Savaş Çağı",d:"Rakipler %20 sık saldırır, altın geliri %25 artar",md:{ai:.8,gm:1.25}},
 {id:"baris",n:"Barış Yılı",d:"Rakipler ilk 60 sn saldırmaz",md:{peace:60}},
 {id:"altin",n:"Altın Çağ",d:"Altın geliri %30 artar",md:{gm:1.3}}
];
var FK_TC=[
 {id:"uzengi",n:"Üzengi",d:"Saldırı hızı +%10",c:90,md:{rate:1.1}},
 {id:"barut",n:"Barut",d:"Saldırıda kayıp −%8",c:130,md:{cost:.92}},
 {id:"matbaa",n:"Matbaa",d:"Divan ödülü +%15",c:100,md:{rew:1.15}},
 {id:"kervan",n:"Kervansaray",d:"Altın geliri +%15",c:90,md:{gold:1.15}},
 {id:"sur",n:"Sur Mühendisliği",d:"Savunma +%15",c:110,md:{def:1.15}},
 {id:"tarim",n:"Tarım Reformu",d:"Ordu üretimi +%10",c:100,md:{gro:1.1}}
];
var FK_TERM=[1,1.3,1.7],FK_TERN=["Ova","Orman/tepe","Dağ"];
function fkMod(G,k){
  var v=1,a=[G.N[0].md].concat(G.mods||[]),i,b=G.bl,t=G.tech||{};
  for(i=0;i<a.length;i++)if(a[i]&&a[i][k]!=null)v*=a[i][k];
  FK_TC.forEach(function(x){if(t[x.id]&&x.md[k]!=null)v*=x.md[k]});
  if(k==="gro")v*=1+.18*b.kis;else if(k==="def")v*=1+.18*b.his;else if(k==="rate")v*=1+.12*b.tal;else if(k==="gold")v*=(1+.25*b.han)*((G.wd&&G.wd.gm)||1);
  else if(k==="qcd")v*=1-.2*b.med;else if(k==="rew")v*=1+.2*b.med;
  return v;
}
function fkBc(G,b,lv){return Math.round(b.c[lv]*((G.opt&&G.opt.cm&&G.opt.cm.bd)||1))}
function fkDc(G,c){return Math.round(c*((G.opt&&G.opt.cm&&G.opt.cm.td)||1))}
function fkTerrain(own,r,caps){
  var W=FK_W,H=FK_H,t=[],i,j;for(i=0;i<own.length;i++)t.push(0);
  var bl=[];for(j=0;j<9;j++)bl.push([r()*W,r()*H,j<4?1.2+r()*1.4:2+r()*2.2,j<4?2:1]);
  for(i=0;i<own.length;i++){if(own[i]<0)continue;var x=i%W,y=(i-x)/W;
    bl.forEach(function(b){var d=Math.sqrt((x-b[0])*(x-b[0])+(y-b[1])*(y-b[1]));if(d<b[2]&&b[3]>t[i])t[i]=b[3]});}
  (caps||[]).forEach(function(c){var cx=c%W,cy=(c-cx)/W,dx,dy;for(dy=-2;dy<=2;dy++)for(dx=-2;dx<=2;dx++){var xx=cx+dx,yy=cy+dy;if(xx>=0&&yy>=0&&xx<W&&yy<H)t[yy*W+xx]=0}});
  return t;
}
var FK_BD=[
 ["ilk","İlk Zafer","Bir seferi kazan"],
 ["hizli","Yıldırım","Bir seferi süre sınırından hızlı kazan"],
 ["usta","Üç Yıldız","Bir seferden 3 yıldız al"],
 ["bilge","Divan'ın Gözdesi","Bir seferde Divan'a üst üste 4 doğru cevap ver"],
 ["diplomat","Diplomat","Ateşkes ya da ittifak kurup kazan"],
 ["mimar","Külliye Kurucusu","Bir seferde 5 yapının hepsini en az bir seviye yükselt"],
 ["kusursuz","Sarsılmaz","Çok az bölge kaybederek (en çok 4) kazan"],
 ["zorlu","Zor Yolcu","Zor seviyede kazan"],
 ["fatih","Fatih","Tüm seferleri kazan"],
 ["ilim","İlim Meclisi","Toplamda 25 Divan sorusunu doğru bil"],
 ["cesit","Çok Yönlü","3 farklı doktrinle bir sefer kazan"],
 ["bilim","Bilge Devlet","Bir seferde 6 teknolojinin hepsini araştır"]
];

function fkLoad(){try{var o=JSON.parse(localStorage.getItem(FK_KEY)||"null");return o&&typeof o==="object"?o:{}}catch(e){return {}}}
function fkSaveBest(k,v){var o=fkLoad();if(num(o[k])>=v)return;o[k]=v;try{localStorage.setItem(FK_KEY,JSON.stringify(o))}catch(e){}try{syncPush()}catch(e){}}
function fkNoise(x,y,s){var n=Math.sin(x*12.9898+y*78.233+s*37.719)*43758.5453;return n-Math.floor(n)}
function fkMap(r,seed){
  var W=FK_W,H=FK_H,g=[],i,x,y;
  for(i=0;i<W*H;i++)g.push(-1);
  var nc=11+Math.floor(r()*4),cs=[];
  for(i=0;i<nc;i++)cs.push([W*(.12+.76*r()),H*(.18+.64*r()),3+r()*4.5]);
  for(y=0;y<H;y++)for(x=0;x<W;x++){for(i=0;i<nc;i++){var c=cs[i],d=Math.sqrt((x-c[0])*(x-c[0])+(y-c[1])*(y-c[1])*1.15);if(d<c[2]*(.78+.5*fkNoise(x,y,seed%97))){g[y*W+x]=0;break}}}
  /* en büyük kara parçası */
  var comp=[],best=[],seen={};
  for(i=0;i<W*H;i++){if(g[i]!==0||seen[i])continue;var q=[i],cur=[];seen[i]=1;while(q.length){var p=q.pop();cur.push(p);var px=p%W,py=(p-px)/W;[[1,0],[-1,0],[0,1],[0,-1]].forEach(function(dd){var nx=px+dd[0],ny=py+dd[1];if(nx<0||ny<0||nx>=W||ny>=H)return;var ni=ny*W+nx;if(g[ni]===0&&!seen[ni]){seen[ni]=1;q.push(ni)}})}if(cur.length>best.length)best=cur}
  for(i=0;i<W*H;i++)g[i]=-1;best.forEach(function(p){g[p]=0});
  return {g:g,land:best};
}
function fkNb(p){var W=FK_W,H=FK_H,x=p%W,y=(p-x)/W,o=[];if(x>0)o.push(p-1);if(x<W-1)o.push(p+1);if(y>0)o.push(p-W);if(y<H-1)o.push(p+W);return o}
function fkCount(G){G.N.forEach(function(n){n.cells=0});for(var i=0;i<G.own.length;i++){var o=G.own[i];if(o>0)G.N[o-1].cells++}}
function fkNeighbors(G,id){var res={},W=FK_W,own=G.own;for(var p=0;p<own.length;p++){if(own[p]!==id)continue;var nb=fkNb(p);for(var k=0;k<nb.length;k++){var o=own[nb[k]];if(o>=0&&o!==id)res[o]=1}}return Object.keys(res).map(Number)}
function fkLog(G,t,k){G.msg.unshift({t:t,k:k||""});if(G.msg.length>4)G.msg.pop()}
function fkYear(G){var y=G.sc.yr,t=Math.min(1,G.t/420),yy=y[0]+(y[1]-y[0])*t,mo=["Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara"];return mo[Math.floor((yy%1)*12)%12]+" "+Math.floor(yy)}
function fkPaper(cv){
  var c=document.createElement("canvas");c.width=cv.width;c.height=cv.height;var x=c.getContext("2d"),g=x.createRadialGradient(c.width/2,c.height/2,c.width*.1,c.width/2,c.height/2,c.width*.75);g.addColorStop(0,"#efe0b8");g.addColorStop(1,"#d9c08a");x.fillStyle=g;x.fillRect(0,0,c.width,c.height);
  for(var i=0;i<900;i++){x.fillStyle="rgba(120,80,30,"+(Math.random()*.06)+")";x.fillRect(Math.random()*c.width,Math.random()*c.height,1+Math.random()*2,1+Math.random()*2)}return c;
}
function fkEdge(x,dpr,a,b,x1,y1,x2,y2){var w=a<0||b<0;x.strokeStyle=w?"#5a3a14":"rgba(60,35,10,.55)";x.lineWidth=w?Math.max(1.6,dpr*1.4):Math.max(1,dpr*.9);x.beginPath();x.moveTo(x1,y1);x.lineTo(x2,y2);x.stroke()}
function fkDraw(G){
  var cv=G.cv,cs=cv.clientWidth||340,dpr=Math.min(2,window.devicePixelRatio||1),W=Math.round(cs*dpr),H=Math.round(cs*FK_H/FK_W*dpr);
  if(cv.width!==W||cv.height!==H){cv.width=W;cv.height=H;G.paper=null}
  var x=cv.getContext("2d"),c=W/FK_W;if(!G.paper)G.paper=fkPaper(cv);
  x.drawImage(G.paper,0,0);
  var own=G.own,Wc=FK_W,i,xx,yy;
  /* deniz */
  x.fillStyle="rgba(70,120,140,.34)";
  for(i=0;i<own.length;i++)if(own[i]<0){xx=i%Wc;yy=(i-xx)/Wc;x.fillRect(xx*c,yy*c,c+.6,c+.6)}
  x.strokeStyle="rgba(255,255,255,.3)";x.lineWidth=Math.max(1,dpr*.8);
  for(i=0;i<own.length;i+=3){if(own[i]<0){xx=i%Wc;yy=(i-xx)/Wc;var ph=G.t*1.5+xx*.7+yy;x.beginPath();x.arc(xx*c+c/2,yy*c+c/2,c*.22,Math.PI,Math.PI*2);x.stroke()}}
  /* kara */
  for(i=0;i<own.length;i++){var o=own[i];if(o<0)continue;xx=i%Wc;yy=(i-xx)/Wc;
    x.fillStyle=o===0?"#e5d3a2":G.N[o-1].c;x.globalAlpha=o===0?1:.86;x.fillRect(xx*c,yy*c,c+.6,c+.6);x.globalAlpha=1;
    var age=G.t-G.chg[i];if(age<.5){x.fillStyle="rgba(255,255,255,"+(.5-age)+")";x.fillRect(xx*c,yy*c,c+.6,c+.6)}}
  /* sınırlar */
  x.lineCap="round";
  for(i=0;i<own.length;i++){var o2=own[i];if(o2<0)continue;xx=i%Wc;yy=(i-xx)/Wc;
    var rt=xx<Wc-1?own[i+1]:-1,dn=yy<FK_H-1?own[i+Wc]:-1,lf=xx>0?own[i-1]:-1,up=yy>0?own[i-Wc]:-1;
    if(rt!==o2)fkEdge(x,dpr,o2,rt,(xx+1)*c,yy*c,(xx+1)*c,(yy+1)*c);
    if(dn!==o2)fkEdge(x,dpr,o2,dn,xx*c,(yy+1)*c,(xx+1)*c,(yy+1)*c);
    if(lf<0)fkEdge(x,dpr,o2,lf,xx*c,yy*c,xx*c,(yy+1)*c);
    if(up<0)fkEdge(x,dpr,o2,up,xx*c,yy*c,(xx+1)*c,yy*c)}
  if(G.ter){x.lineWidth=Math.max(1,dpr*.9);for(i=0;i<own.length;i++){var tt=G.ter[i];if(!tt||own[i]<0)continue;xx=i%Wc;yy=(i-xx)/Wc;x.strokeStyle=tt===2?"rgba(40,25,10,.8)":"rgba(40,70,25,.7)";x.beginPath();if(tt===2){x.moveTo(xx*c+c*.15,yy*c+c*.85);x.lineTo(xx*c+c*.5,yy*c+c*.2);x.lineTo(xx*c+c*.85,yy*c+c*.85)}else{x.arc(xx*c+c*.5,yy*c+c*.8,c*.32,Math.PI,0)}x.stroke()}}
  /* başkentler ve isimler */
  G.N.forEach(function(n){if(!n.alive)return;var cx=n.cap%Wc,cy=Math.floor(n.cap/Wc);if(n.id>1){var rl=fkRel(G,n.id);if(rl!=="war"){x.strokeStyle=rl==="ally"?"#2fbf5a":"#ffffff";x.lineWidth=Math.max(2,dpr*2);x.setLineDash([c*.35,c*.25]);x.beginPath();x.arc(cx*c+c/2,cy*c+c*.55,c*1.5,0,Math.PI*2);x.stroke();x.setLineDash([])}}
    x.fillStyle="#fff3c8";x.strokeStyle="#5a3a14";x.lineWidth=Math.max(1,dpr);var s=c*.9;x.fillRect(cx*c+c/2-s/2,cy*c+c*.15,s,s*.8);x.strokeRect(cx*c+c/2-s/2,cy*c+c*.15,s,s*.8);x.fillStyle="#5a3a14";for(var k=0;k<3;k++)x.fillRect(cx*c+c/2-s/2+k*s*.36,cy*c+c*.15-s*.2,s*.26,s*.22);
    if(n.cells>=26){var sx=0,sy=0,cn=0;for(var p=0;p<own.length;p+=2){if(own[p]===n.id){sx+=p%Wc;sy+=Math.floor(p/Wc);cn++}}if(cn){var lx=sx/cn*c+c/2,ly=sy/cn*c+c/2+c*.3;x.font="italic 800 "+Math.max(9*dpr,c*.95)+"px Georgia,'Times New Roman',serif";x.textAlign="center";x.textBaseline="middle";x.lineWidth=Math.max(2,dpr*2.2);x.strokeStyle="rgba(255,244,214,.85)";x.strokeText(n.n,lx,ly);x.fillStyle="#2a1707";x.fillText(n.n,lx,ly)}}});
  /* saldırı okları */
  x.setLineDash([c*.5,c*.4]);x.lineWidth=Math.max(1.5,dpr*1.6);
  G.at.forEach(function(a){x.strokeStyle=a.by===1?"#8a1d0f":"rgba(60,35,10,.7)";var from=G.N[a.by-1].cap,to=a.tgt>0?G.N[a.tgt-1].cap:null;if(to==null)return;x.globalAlpha=.55;x.beginPath();x.moveTo(from%Wc*c+c/2,Math.floor(from/Wc)*c+c/2);x.lineTo(to%Wc*c+c/2,Math.floor(to/Wc)*c+c/2);x.stroke();x.globalAlpha=1});x.setLineDash([]);
  /* kenar */
  x.strokeStyle="#b8892b";x.lineWidth=dpr*3;x.strokeRect(dpr*1.5,dpr*1.5,W-dpr*3,H-dpr*3);
}
function fkAdd(k,n){var o=fkLoad();o[k]=Math.min(99999,num(o[k])+n);try{localStorage.setItem(FK_KEY,JSON.stringify(o))}catch(e){}try{syncPush()}catch(e){}}
function fkStars(id){var o=fkLoad(),s=num(o["star"+id]);if(!s)Object.keys(FK_DF).forEach(function(k){if(num(o[id+FK_DF[k].n])>0)s=Math.max(s,1)});return s}
function fkOpen(i){return i===0||fkStars(FK_SC[i].id)>=1||fkStars(FK_SC[i-1].id)>=1}
function fkRel(G,id){var d=G.dp[id];return d&&d.until>G.t?d.k:"war"}
function fkBuild(sc,dfk,opt){
  var seed=(Date.now()%1e6)+7,tries=0,G,i;
  while(tries++<40){
    var r=rngf(seed+tries*131),m=fkMap(r,seed+tries);
    if(m.land.length<FK_W*FK_H*.34||m.land.length>FK_W*FK_H*.62)continue;
    var nat=[sc.pl].concat(sc.ai),caps=[],L=m.land;
    caps.push(L[Math.floor(r()*L.length)]);
    while(caps.length<nat.length){var bp=-1,bd=-1;L.forEach(function(p){var mn=1e9;caps.forEach(function(c){var dx=p%FK_W-c%FK_W,dy=Math.floor(p/FK_W)-Math.floor(c/FK_W);mn=Math.min(mn,dx*dx+dy*dy)});if(mn>bd){bd=mn;bp=p}});caps.push(bp)}
    var own=m.g.slice(),ok=true,cnt=[];
    nat.forEach(function(n,i){var q=[caps[i]],got=0;own[caps[i]]=i+1;got=1;var h0=0;while(h0<q.length&&got<16){var p=q[h0++];fkNb(p).forEach(function(nb){if(own[nb]===0&&got<16){own[nb]=i+1;got++;q.push(nb)}})}cnt.push(got);if(got<10)ok=false});
    if(!ok)continue;
    var N=nat.map(function(n,i){return {id:i+1,n:n.n,c:n.c,l:n.l||"",cap:caps[i],troops:70*(i===0?dfk.tr:1),cells:cnt[i],ai:i>0,alive:true,nx:r()*dfk.ai,att:[],max:0,md:n.md||null,d:n.d||1,r:n.r||1}});
    G={own:own,N:N,t:0,r:r,at:[],chg:[],msg:[],land:L.length,sc:sc,df:dfk,pct:50,speed:1,state:"play",ni:0,qi:0,qcd:12,pq:null,paused:false,over:null,stats:{att:0,lost:0,took:0},peak:0,pw:0,
      goal:sc.goal||55,gold:50,earned:0,spent:0,bl:{kis:0,his:0,tal:0,han:0,med:0},dp:{},dip:0,ev:null,ecd:45+r()*25,evq:[],evn:0,tab:null,why:"",
      dv:{ok:0,no:0,streak:0,best:0,miss:[]}};
    opt=opt||{};G.opt=opt;G.mods=[opt.dk?opt.dk.md:null,opt.cm?opt.cm.md:null,opt.as?{gro:1.2,rate:1.1}:null];G.daily=!!opt.dy;G.wd=opt.kd?opt.kd.md:{};G.tech={};G.ter=fkTerrain(own,r,caps);
    if(opt.cm){if(opt.cm.sg)G.gold+=opt.cm.sg;if(opt.cm.st)N[0].troops*=opt.cm.st}
    for(i=0;i<own.length;i++)G.chg.push(-9);
    return G;
  }
  return null;
}
function fkLaunch(G,by,tgt,pct){
  var N=G.N[by-1];if(!N.alive)return false;G.why="";
  var ex=null;G.at.forEach(function(a){if(a.by===by&&a.tgt===tgt)ex=a});
  if(!ex&&G.at.filter(function(a){return a.by===by}).length>=(by===1?3:2)){G.why="busy";return false}
  if(tgt>0){if(by===1&&fkRel(G,tgt)!=="war"){G.why="peace";return false}if(tgt===1&&by>1&&fkRel(G,by)!=="war"){G.why="peace";return false}}
  if(fkNeighbors(G,by).indexOf(tgt)<0){G.why="far";return false}
  var amt=N.troops*pct/100;if(amt<8){G.why="weak";return false}
  N.troops-=amt;if(by===1)G.stats.att++;
  if(ex)ex.left+=amt;else G.at.push({by:by,tgt:tgt,left:amt,acc:0,fresh:0});
  return true;
}
function fkStepAttack(G,a,dt){
  var by=G.N[a.by-1],df=a.tgt>0?G.N[a.tgt-1]:null,pa=a.by===1;
  if(!by.alive||(df&&!df.alive)){by.troops+=a.left;a.left=0;return}
  var rate=FK_SPD*(1.4+Math.sqrt(a.left)/4.5)*(pa?fkMod(G,"rate"):G.df.m*.8*by.r)*((G.wd&&G.wd.rate)||1);a.acc+=rate*dt;
  while(a.acc>=1&&a.left>0){
    a.acc-=1;
    var best=-1,bs=-1,W=FK_W,own=G.own;
    for(var p=0;p<own.length;p++){if(own[p]!==a.tgt)continue;var nb=fkNb(p),c=0;for(var k=0;k<nb.length;k++)if(own[nb[k]]===a.by)c++;if(!c)continue;var sc=c+G.r()*1.4;if(sc>bs){bs=sc;best=p}}
    if(best<0){by.troops+=a.left;a.left=0;break}
    var dd=df?df.troops/Math.max(1,df.cells):0,cost=df?2.2+dd*.9:1.3;
    if(df){if(pa){cost*=fkMod(G,"cost");if(best===df.cap)cost*=fkMod(G,"cap")}else if(a.tgt===1)cost*=fkMod(G,"def");else cost*=df.d}
    else if(pa)cost*=fkMod(G,"cost")*((G.opt&&G.opt.cm&&G.opt.cm.ne)||1);
    cost*=FK_TERM[G.ter&&G.ter[best]||0];
    if(a.left<cost){by.troops+=a.left;a.left=0;break}
    a.left-=cost;own[best]=a.by;G.chg[best]=G.t;by.cells++;
    if(df){df.cells--;df.troops=Math.max(1,df.troops-dd*.55);
      if(pa)G.stats.took++;if(a.tgt===1)G.stats.lost++;
      if(df.cells<=0){df.alive=false;df.troops=0;fkLog(G,df.n+" yıkıldı.","dead");break}}
  }
  if(a.left<1)a.left=0;
}
function fkAI(G,n,dt){
  n.nx-=dt;if(n.nx>0||!n.alive)return;
  n.nx=G.df.ai*((G.wd&&G.wd.ai)||1)*(.7+G.r()*.7);if(G.wd&&G.wd.peace&&G.t<G.wd.peace)return;
  var mine=G.at.filter(function(a){return a.by===n.id}).length;if(mine>=2)return;
  var nbs=fkNeighbors(G,n.id);if(!nbs.length)return;
  var dens=n.troops/Math.max(1,n.cells);if(dens<2.4)return;
  var rel=fkRel(G,n.id),pick=null,neu=nbs.indexOf(0)>=0;
  if(neu&&G.r()<.62)pick=0;
  else{var ws=nbs.filter(function(o){return o>0&&(o!==1||rel==="war")});
    if(ws.length){
      if(rel==="ally"){ws=ws.filter(function(o){return o!==1});ws.sort(function(a,b){return G.N[b-1].cells-G.N[a-1].cells});pick=ws[0]}
      else{ws.sort(function(a,b){var da=G.N[a-1].troops/G.N[a-1].cells+(a===1?-.6:0),db=G.N[b-1].troops/G.N[b-1].cells+(b===1?-.6:0);return da-db});pick=ws[0];if(G.r()<.3)pick=ws[Math.floor(G.r()*ws.length)]}
    }else if(neu)pick=0}
  if(pick==null)return;
  if(fkLaunch(G,n.id,pick,35+Math.floor(G.r()*30))&&pick===1)fkLog(G,n.n+" sana saldırıyor!","war");
}
function fkEvStart(G){
  var pool=(G.sc.ev||[]).concat(FK_EVG);
  if(!G.evq.length){var ix=[],i;for(i=0;i<pool.length;i++)ix.push(i);G.evq=shuf(ix,G.r)}
  var e=pool[G.evq.pop()];G.ev=e;G.evn++;G.ecd=55+G.r()*35;
  if(!G.ui){if(!fkEvPick(G,Math.floor(G.r()*2)))fkEvPick(G,1)}else{fkEvShow(G)}
}
function fkEvPick(G,i){
  var e=G.ev;if(!e)return;var o=e[2+i],pl=G.N[0];
  if(o[1]<0&&G.gold<-o[1]){return false}
  G.gold+=o[1];if(o[1]<0)G.spent+=-o[1];else G.earned+=o[1];
  if(o[2]&&!(o[2]<0&&G.opt&&G.opt.cm&&G.opt.cm.nl))pl.troops=Math.max(10,pl.troops*(1+o[2]));
  fkLog(G,e[0]+": "+o[3],o[2]<0&&o[1]<=0?"war":"ok");G.ev=null;
  if(G.ui){G.ui.evbox.hidden=true;fkStatus(G)}
  return true;
}
function fkBuy(G,id){
  var b=FK_BL.filter(function(x){return x.id===id})[0],lv=G.bl[id];if(!b||lv>=3)return false;
  var c=fkBc(G,b,lv);if(G.gold<c)return false;G.gold-=c;G.spent+=c;G.bl[id]=lv+1;fkLog(G,b.n+" "+(lv+1)+". seviyeye çıktı.","ok");return true;
}
function fkOffer(G,id,kind){
  var n=G.N[id-1],pl=G.N[0],cost=fkDc(G,kind==="ally"?120:60),rel=fkRel(G,id);
  if(!n||!n.alive||G.gold<cost||rel==="ally"||(rel==="truce"&&kind==="truce"))return "no";
  G.gold-=cost;G.spent+=cost;
  var r=pl.cells/Math.max(1,n.cells),p=kind==="ally"?Math.min(.8,.12+.3*r)*(rel==="truce"?1.25:.6):Math.min(.9,.3+.32*r);
  if(G.r()<p){G.dp[id]={k:kind,until:G.t+(kind==="ally"?110:50)};G.dip++;fkLog(G,n.n+(kind==="ally"?" ittifakı kabul etti.":" ateşkesi kabul etti."),"ok");return "ok"}
  G.gold+=Math.round(cost/2);G.spent-=Math.round(cost/2);fkLog(G,n.n+" teklifini reddetti.","war");return "rej";
}
function fkBreak(G,id){
  if(fkRel(G,id)==="war")return;delete G.dp[id];G.N[0].troops*=.88;G.N[id-1].nx=0;fkLog(G,"Anlaşmayı bozdun: itibar kaybı, ordun %12 azaldı.","war");
}
function fkTick(G,dt){
  if(G.state!=="play"||G.paused||G.pq)return;
  if(G.ev){if(G.ui)return;if(!fkEvPick(G,0))fkEvPick(G,1)}
  dt*=G.speed;G.t+=dt;
  var pl=G.N[0],k;
  G.N.forEach(function(n){if(!n.alive)return;var cap=n.cells*20,gr=(n.cells*.06+.4)*(1-n.troops/Math.max(1,cap));if(gr>0)n.troops+=gr*dt*(n.id===1?G.df.tr*fkMod(G,"gro"):1)*((G.wd&&G.wd.gro)||1);if(n.ai)fkAI(G,n,dt)});
  var gi=(pl.cells*.03+.5)*fkMod(G,"gold"),na=0;
  for(k in G.dp){if(G.dp[k].until<=G.t){fkLog(G,G.N[k-1].n+" ile "+(G.dp[k].k==="ally"?"ittifak":"ateşkes")+" sona erdi.","war");delete G.dp[k]}else if(G.dp[k].k==="ally")na++}
  gi+=na*.8;G.gold+=gi*dt;G.earned+=gi*dt;
  G.at.forEach(function(a){fkStepAttack(G,a,dt)});G.at=G.at.filter(function(a){return a.left>0});
  G.qcd=Math.max(0,G.qcd-dt);
  G.ecd-=dt;if(G.ecd<=0&&!G.ev&&!G.pq)fkEvStart(G);
  var pc=Math.round(pl.cells/G.land*100);G.peak=Math.max(G.peak,pc);
  while(G.ni<G.sc.notes.length&&pc>=G.sc.notes[G.ni][0]){fkLog(G,G.sc.notes[G.ni][1],"note");G.note=G.sc.notes[G.ni][1];G.ni++}
  if(!pl.alive||pl.cells<=0){fkEnd(G,"lose")}
  else if(pc>=G.goal||G.N.slice(1).every(function(n){return !n.alive}))fkEnd(G,"win");
}
function fkEnd(G,res){
  if(G.over)return;G.over=res;G.state="over";
  var pc=Math.round(G.N[0].cells/G.land*100),win=res==="win",sc=G.sc,o,k;
  G.score=Math.round(pc*10+(win?Math.max(0,600-G.t*2):0)+G.dv.ok*8);
  G.stars=0;G.newBd=[];
  if(!win)fkAdd("lose"+sc.id,1);
  if(win){
    G.stars=1;if(G.t<=sc.par)G.stars=2;if(G.stars===2&&G.stats.lost<=12&&G.dv.ok>=2&&!(G.opt&&G.opt.as))G.stars=3;
    fkSaveBest(sc.id+G.df.n,G.score);fkSaveBest("star"+sc.id,G.stars);fkAdd("wins",1);if(G.opt&&G.opt.dk)fkSaveBest("dk"+G.opt.dk.id,1);
  }
  fkAdd("taken",G.stats.took);fkAdd("divandogru",G.dv.ok);fkAdd("divantoplam",G.dv.ok+G.dv.no);
  o=fkLoad();
  var chk={ilk:win,hizli:win&&G.stars>=2,usta:G.stars>=3,bilge:G.dv.best>=4,diplomat:win&&G.dip>0,
    mimar:win&&FK_BL.every(function(b){return G.bl[b.id]>=1}),kusursuz:win&&G.stats.lost<=4,zorlu:win&&G.df.n==="Zor",
    fatih:FK_SC.every(function(s){return fkStars(s.id)>=1}),ilim:num(o.divandogru)>=25,
    cesit:FK_DK.filter(function(d){return num(o["dk"+d.id])>0}).length>=3,bilim:win&&Object.keys(G.tech||{}).length>=FK_TC.length};
  FK_BD.forEach(function(b){var key="nis"+b[0].charAt(0).toUpperCase()+b[0].slice(1);if(chk[b[0]]&&!num(o[key])){fkSaveBest(key,1);G.newBd.push(b)}});
  try{var d=gmDay(today());setProg({fk_n:num(d.fk_n)+1})}catch(e){}
  if(G.daily)fkDailySave(G,win);
}
function fkStatus(G){
  if(!G.ui)return;var pl=G.N[0],pc=Math.round(pl.cells/G.land*100),u=G.ui;
  u.top.replaceChildren(h("span",{class:"fk-yr"},fkYear(G)),h("span",null,"Ordu ",h("b",{class:"mono"},String(Math.round(pl.troops*10)))),h("span",null,"Altın ",h("b",{class:"mono fk-gold"},String(Math.floor(G.gold)))),h("span",null,"Toprak ",h("b",{class:"mono"},"%"+pc)),h("span",{class:"fk-goal"},"hedef %"+G.goal));
  u.bar.style.width=Math.min(100,pc/G.goal*100)+"%";
  u.rank.replaceChildren.apply(u.rank,G.N.slice().filter(function(n){return n.alive}).sort(function(a,b){return b.cells-a.cells}).map(function(n){return h("span",{class:"fk-n"+(n.id===1?" me":"")},h("i",{style:"background:"+n.c}),n.n+" %"+Math.round(n.cells/G.land*100))}));
  u.log.replaceChildren.apply(u.log,G.msg.slice(0,3).map(function(m){return h("div",{class:"fk-m "+m.k},m.t)}));
  u.q.disabled=G.qcd>0||!!G.pq||!!G.ev||G.state!=="play";u.q.textContent=G.qcd>0?"Divan sorusu · "+Math.ceil(G.qcd)+" sn":"Divan sorusu";
  fkChips(G);fkPanelSync(G);
}
function fkChips(G){
  var u=G.ui,pl=G.N[0],nb=fkNeighbors(G,1).sort(function(a,b){return a-b}),sig=nb.join(",");
  if(u.chsig!==sig){
    u.chsig=sig;u.chb={};
    var kids=nb.map(function(id){
      var btn=h("button",{type:"button",class:"fk-chip",onclick:function(){fkGo(G,id)}},h("i",{style:"background:"+(id?G.N[id-1].c:"#e5d3a2")}),h("b",null,id?G.N[id-1].n:"Boş topraklar"),h("small",null,""));
      u.chb[id]=btn;return btn});
    if(!kids.length)kids=[h("span",{class:"small mute"},"Komşu bölge kalmadı.")];
    u.chips.replaceChildren.apply(u.chips,kids);
  }
  nb.forEach(function(id){
    var btn=u.chb[id];if(!btn)return;var cl="fk-chip",t;
    if(id===0)t="boş toprak";
    else{var n=G.N[id-1],rel=fkRel(G,id);
      if(rel!=="war"){t=rel==="ally"?"müttefik":"ateşkes";cl+=" peace"}
      else{var ra=pl.troops*G.pct/100/Math.max(1,n.troops);t=ra>=1.1?"üstünsün":ra>=.6?"denk":"riskli";cl+=ra>=1.1?" good":ra>=.6?" mid":" bad"}}
    var sm=btn.lastChild;if(sm.textContent!==t)sm.textContent=t;if(btn.className!==cl)btn.className=cl;
  });
}
function fkPips(n){return "●●●".slice(0,n)+"○○○".slice(0,3-n)}
function fkPanel(G){
  var p=G.ui.pan,rows=[];
  if(!G.tab){p.hidden=true;p.replaceChildren();return}
  p.hidden=false;
  if(G.tab==="kul"){
    rows.push(h("div",{class:"label"},"Külliye · altınla orduna kalıcı güç ekle"));
    FK_BL.forEach(function(b){
      var lv=G.bl[b.id],btn=h("button",{type:"button",class:"btn"+(lv>=3?" ghost":""),onclick:function(){if(fkBuy(G,b.id)){fkPanel(G);fkStatus(G)}}},lv>=3?"Tam":fkBc(G,b,lv)+" altın");
      if(lv>=3)btn.disabled=true;else btn.setAttribute("data-c",fkBc(G,b,lv));
      rows.push(h("div",{class:"fk-row"},h("div",{class:"fk-rt"},h("b",null,b.n+" "),h("span",{class:"fk-pips"},fkPips(lv)),h("small",null,b.d)),btn))});
  }else if(G.tab==="tek"){
    rows.push(h("div",{class:"label"},"Teknoloji · her biri bir kez araştırılır"));
    FK_TC.forEach(function(t){var have=G.tech[t.id],btn=h("button",{type:"button",class:"btn"+(have?" ghost":""),onclick:function(){if(!G.tech[t.id]&&G.gold>=t.c){G.gold-=t.c;G.spent+=t.c;G.tech[t.id]=1;fkLog(G,t.n+" araştırıldı.","ok");fkPanel(G);fkStatus(G)}}},have?"Tamam":t.c+" altın");if(have)btn.disabled=true;else btn.setAttribute("data-c",t.c);
      rows.push(h("div",{class:"fk-row"},h("div",{class:"fk-rt"},h("b",null,t.n),h("small",null,t.d)),btn))});
  }else{
    rows.push(h("div",{class:"label"},"Diplomasi · altınla barış satın al (teklif reddedilirse yarısı geri gelir)"));
    var alive=G.N.slice(1).filter(function(n){return n.alive});
    if(!alive.length)rows.push(h("div",{class:"small"},"Kimse kalmadı."));
    alive.forEach(function(n){
      var rel=fkRel(G,n.id),bt=[];
      function offer(kind){return function(){var r=fkOffer(G,n.id,kind);G.ui.hint.textContent=r==="ok"?n.n+" kabul etti.":r==="rej"?n.n+" reddetti.":"Altının yetmiyor.";fkPanel(G);fkStatus(G)}}
      function mkb(txt,c,fn){var b=h("button",{type:"button",class:"btn ghost",onclick:fn},txt+(c?" · "+c:""));if(c)b.setAttribute("data-c",c);return b}
      if(rel==="war"){bt.push(mkb("Ateşkes",fkDc(G,60),offer("truce")));bt.push(mkb("İttifak",fkDc(G,120),offer("ally")))}
      else{if(rel==="truce")bt.push(mkb("İttifak",fkDc(G,120),offer("ally")));bt.push(mkb("Bozdur",0,function(){fkBreak(G,n.id);fkPanel(G);fkStatus(G)}))}
      var left=G.dp[n.id]?Math.max(0,Math.ceil(G.dp[n.id].until-G.t)):0;
      rows.push(h("div",{class:"fk-row"},h("div",{class:"fk-rt"},h("span",{class:"fk-n"},h("i",{style:"background:"+n.c}),n.n),h("small",{"data-rel":n.id},rel==="war"?"savaş halinde":(rel==="ally"?"müttefik · ":"ateşkes · ")+left+" sn")),h("div",{class:"fk-bt"},bt)))});
    G.ui.dsig=fkDsig(G);
  }
  p.replaceChildren.apply(p,rows);
}
function fkDsig(G){return G.N.slice(1).map(function(n){return n.alive?fkRel(G,n.id):"x"}).join("")}
function fkPanelSync(G){
  var u=G.ui;if(!G.tab||u.pan.hidden)return;
  if(G.tab==="dip"&&u.dsig!==fkDsig(G)){fkPanel(G);return}
  Array.prototype.forEach.call(u.pan.querySelectorAll("button[data-c]"),function(b){b.disabled=G.gold<+b.getAttribute("data-c")});
  Array.prototype.forEach.call(u.pan.querySelectorAll("[data-rel]"),function(s){var id=+s.getAttribute("data-rel"),rel=fkRel(G,id);if(rel!=="war")s.textContent=(rel==="ally"?"müttefik · ":"ateşkes · ")+Math.max(0,Math.ceil(G.dp[id].until-G.t))+" sn"});
}
function fkFx(o){return (o[1]?(o[1]>0?"+":"−")+Math.abs(o[1])+" altın":"")+(o[1]&&o[2]?" · ":"")+(o[2]?(o[2]>0?"+":"−")+"%"+Math.round(Math.abs(o[2])*100)+" asker":"")||"etkisiz"}
function fkEvShow(G){
  var e=G.ev,box=G.ui.evbox;
  box.replaceChildren(h("div",{class:"label"},"Tarihî olay"),h("div",{class:"gm-aq"},e[0]),h("div",{class:"small"},e[1]),
    h("div",{class:"gm-abs"},[2,3].map(function(k,i){var o=e[k],bad=o[1]<0&&G.gold<-o[1];return h("button",{type:"button",class:"gm-ab c"+i,disabled:bad,onclick:function(){if(fkEvPick(G,i)){fkStatus(G)}}},h("b",null,i?"B":"A"),h("span",null,o[0]+"  ("+fkFx(o)+")"))})));
  box.hidden=false;
}
function fkAsk(G){
  if(G.qcd>0||G.pq||G.ev||G.state!=="play")return;
  if(!G.qs||!G.qs.length){var ot=S.gm.trk;try{S.gm.trk=S.fkSel.trk||"all";G.qs=gmBuild("free")}catch(e){G.qs=[]}S.gm.trk=ot}
  var q=G.qs[G.qi++%Math.max(1,G.qs.length)];if(!q||q.o.length<2)return;G.pq=q;fkAskShow(G)
}
function fkAskShow(G){
  var q=G.pq,box=G.ui.askbox;
  box.replaceChildren(h("div",{class:"label"},"Divan sorusu · doğru bilirsen ordu ve altın takviyesi"),h("div",{class:"gm-aq"},q.q),h("div",{class:"gm-abs"},q.o.map(function(t,i){return t?h("button",{type:"button",class:"gm-ab c"+i,onclick:function(){fkAnswer(G,i)}},h("b",null,q.tf?(i===0?"D":"Y"):"ABC".charAt(i)),h("span",null,t)):null}).filter(Boolean)));
  box.hidden=false;
}
function fkAnswer(G,i){
  var q=G.pq;if(!q)return;var ok=i===q.a,pl=G.N[0],dv=G.dv;
  try{gsAnswer(q.k,ok)}catch(e){}
  if(ok){var add=Math.max(25,pl.troops*.3)*fkMod(G,"rew"),gd=Math.round(20*fkMod(G,"rew"));pl.troops+=add;G.gold+=gd;G.earned+=gd;dv.ok++;dv.streak++;dv.best=Math.max(dv.best,dv.streak);fkLog(G,"Divan haklı çıktı: +"+Math.round(add*10)+" asker, +"+gd+" altın.","ok")}
  else{pl.troops=Math.max(10,pl.troops*.9);dv.no++;dv.streak=0;dv.miss.push({q:q.q,a:q.o[q.a],w:q.w||""});fkLog(G,"Yanlış plan: ordu yıprandı. Doğrusu: "+q.o[q.a],"war")}
  G.qcd=25*Math.max(.3,fkMod(G,"qcd"));
  G.pq=null;G.ui.askbox.hidden=true;fkStatus(G);
}
function fkGo(G,tgt){
  if(G.state!=="play"||G.pq||G.ev)return;
  var ok=fkLaunch(G,1,tgt,G.pct),u=G.ui;
  var m=ok?"Saldırı: "+(tgt?G.N[tgt-1].n:"boş topraklar")+" · ordunun %"+G.pct+"'i yola çıktı."
    :G.why==="peace"?"Barış var: önce Diplomasi'den anlaşmayı bozdurmalısın.":G.why==="busy"?"Aynı anda en fazla 3 saldırı yürütebilirsin.":G.why==="weak"?"Bu saldırı için ordun az; biraz bekle ya da yüzdeyi artır.":"Sınırın oraya değmiyor.";
  u.hint.textContent=m;clearTimeout(G.ht);G.ht=setTimeout(function(){if(G.ui)G.ui.hint.textContent="Bölgeye ya da aşağıdaki komşu butonlarına dokun."},2600);fkStatus(G);
}
function fkTap(G,e){
  if(G.state!=="play"||G.pq||G.ev)return;
  var r=G.cv.getBoundingClientRect(),px=(e.clientX-r.left)/r.width*FK_W,py=(e.clientY-r.top)/r.height*FK_H,xx=Math.floor(px),yy=Math.floor(py);
  if(xx<0||yy<0||xx>=FK_W||yy>=FK_H)return;
  var o=G.own[yy*FK_W+xx];if(o<0||o===1||o===undefined)return;
  fkGo(G,o);
}
function fkLoop(G){
  if(G.loop)return;G.loop=true;var last=0;
  function f(ts){
    if(S.fk!==G||!G.cv.isConnected){G.loop=false;return}
    var dt=Math.min(.1,last?(ts-last)/1000:.016);last=ts;
    fkTick(G,dt);fkDraw(G);G.sa=(G.sa||0)+dt;if(G.sa>.25){G.sa=0;fkStatus(G)}
    if(G.state==="over"){G.loop=false;fkStatus(G);draw();return}
    requestAnimationFrame(f)}
  requestAnimationFrame(f);
}
S.fk=null;S.fkSel=S.fkSel||{sc:"malazgirt",df:"n",trk:"all"};
var FK_DY_KEY="ya_fkd";
function fkDailyGet(){try{var o=JSON.parse(localStorage.getItem(FK_DY_KEY)||"null");return o&&o.d===today()?o:null}catch(e){return null}}
function fkDaily(){
  var r=rngf(Math.floor(Date.now()/864e5)*7919+13),sc=FK_SC[Math.floor(r()*FK_SC.length)]||FK_SC[0];
  return {sc:sc,dk:FK_DK[Math.floor(r()*FK_DK.length)],cm:FK_CM[Math.floor(r()*FK_CM.length)],kd:FK_KD[Math.floor(r()*FK_KD.length)]};
}
function fkDailySave(G,win){
  var sc=G.score,cur=fkDailyGet();
  if(!cur||sc>cur.s){var o={d:today(),s:sc,w:win?1:0,n:G.sc.n};try{localStorage.setItem(FK_DY_KEY,JSON.stringify(o))}catch(e){}
    if(S.db&&S.canWrite&&myLeague())saveMe({fkd:{d:o.d,s:o.s,w:o.w,n:o.n}})}
}
function fkDailyBoard(){
  var t=today(),rows=S.league.filter(function(x){return x.fkd&&x.fkd.d===t&&isFinite(x.fkd.s)});
  var mine=fkDailyGet();if(mine&&!rows.some(function(x){return x.id===S.me}))rows.push({id:S.me,fkd:mine});
  return rows.sort(function(a,b){return b.fkd.s-a.fkd.s}).slice(0,8);
}
function fkDailyCard(){
  var D=fkDaily(),mine=fkDailyGet(),rows=fkDailyBoard();
  return h("div",{class:"panel fk-daily"},h("div",{class:"label"},"Günün meydanı · herkes için aynı koşul"),
    h("h3",null,D.sc.n),
    h("div",{class:"small mute"},"Doktrin: "+D.dk.n+" · Komutan: "+D.cm.n+" · Kader: "+D.kd.n+" · Normal zorluk"),
    h("div",{class:"row"},h("button",{type:"button",class:"btn big",onclick:function(){S.fkSel.sc=D.sc.id;fkBegin(D.sc,"n",{dk:D.dk,cm:D.cm,kd:D.kd,dy:true})}},mine?"Tekrar dene":"Günün meydanını oyna"),mine?h("span",{class:"small mute"},"Bugünkü en iyin: "+mine.s):null),
    (mine&&mine.d===today()&&S.db&&S.me&&S.canWrite&&!S.guest&&!myLeague())?h("div",{class:"row"},h("button",{type:"button",class:"btn ghost",onclick:function(){saveMe({fkd:{d:mine.d,s:mine.s,w:mine.w,n:mine.n}});draw()}},"Skorumu arkadaşlara göster"),h("span",{class:"small mute"},"İsteğe bağlı: Lig tablosuna katılırsın.")):null,
    rows.length?h("ol",{class:"fk-board"},rows.map(function(x,i){return h("li",null,h("span",null,(i+1)+". "+nameOf(x.id)),h("b",{class:"mono"},String(x.fkd.s)+(x.fkd.w?" ★":"")))})):h("div",{class:"small mute"},"Henüz kimse oynamadı. İlk skoru sen yaz."),
    h("div",{class:"small mute"},"Sıralamada Lig'e katılmış arkadaşların görünür. Harita küçük farklarla değişebilir; skor sana göre kıyaslanır."));
}
function fkStart(sc,dk){
  var r=rngf(Date.now()%1e6),cms=shuf(FK_CM.slice(),r).slice(0,4);
  S.fkPrep={sc:sc,dk:dk,dt:FK_DK[0],cm:cms[0],cms:cms,kd:FK_KD[Math.floor(r()*FK_KD.length)],re:0};S.fk=null;draw();window.scrollTo(0,0);
}
function fkBegin(sc,dk,opt){
  var G=fkBuild(sc,FK_DF[dk],opt);if(!G)return;S.fkPrep=null;
  G.cv=h("canvas",{class:"fk-cv",width:360,height:260,"aria-label":"Fetih haritası. Bir bölgeye dokunarak saldır."});
  G.cv.addEventListener("click",function(e){fkTap(G,e)});
  G.ui={top:h("div",{class:"fk-top"}),bar:h("i"),rank:h("div",{class:"fk-rank"}),log:h("div",{class:"fk-log","aria-live":"polite"}),hint:h("div",{class:"small mute fk-hint"},"Bölgeye ya da aşağıdaki komşu butonlarına dokun."),askbox:h("div",{class:"panel fk-ask",hidden:true}),evbox:h("div",{class:"panel fk-ask",hidden:true}),
    chips:h("div",{class:"fk-chips"}),pan:h("div",{class:"fk-pan",hidden:true}),
    q:h("button",{type:"button",class:"btn ghost",onclick:function(){fkAsk(G)}},"Divan sorusu")};
  fkLog(G,sc.notes[0][1],"note");G.ni=1;G.note=sc.notes[0][1];
  S.fk=G;draw();window.scrollTo(0,0);
}
function fkStarRow(n){return h("span",{class:"fk-stars","aria-label":n+" yıldız"},[1,2,3].map(function(i){return h("i",{class:i<=n?"on":""},"★")}))}
function fkDfKey(G){return Object.keys(FK_DF).filter(function(k){return FK_DF[k]===G.df})[0]}
function fkPrepScreen(){
  var P=S.fkPrep,sc=P.sc,r=rngf(Date.now()%1e6);
  function card(o,sel,fn,extra){return h("button",{type:"button",class:"fk-pc"+(sel?" on":""),"aria-pressed":sel?"true":"false",onclick:fn},h("b",null,o.n),h("small",null,o.d),extra||null)}
  return [h("div",{class:"fk-wrap"},h("div",{class:"fk-title"},h("b",null,sc.n),h("small",null,"Sefer hazırlığı")),h("div",{class:"small"},sc.brief),
    h("div",{class:"fk-trait"},h("b",null,sc.pl.tn+": "),sc.pl.td),
    h("div",{class:"label fk-lab"},"Kader · bu seferin koşulu"),
    h("div",{class:"fk-pc on kd"},h("b",null,P.kd.n),h("small",null,P.kd.d),P.re<1?h("button",{type:"button",class:"btn ghost",onclick:function(){var o=FK_KD.filter(function(k){return k!==P.kd});P.kd=o[Math.floor(Math.random()*o.length)];P.re++;draw()}},"Kaderi bir kez yeniden çek"):null),
    h("div",{class:"label fk-lab"},"Doktrin · ordunun düzeni"),
    h("div",{class:"fk-pcs"},FK_DK.map(function(d){return card(d,P.dt===d,function(){P.dt=d;draw()})})),
    h("div",{class:"label fk-lab"},"Komutan · 4 aday"),
    h("div",{class:"fk-pcs"},P.cms.map(function(c){return card(c,P.cm===c,function(){P.cm=c;draw()})})),
    h("div",{class:"small mute"},"Haritada orman/tepe (yay) ve dağ (üçgen) bölgeleri vardır: ele geçirmesi daha pahalıdır."),
    (fkStars(sc.id)===0&&num(fkLoad()["lose"+sc.id])>=2)?h("button",{type:"button",class:"fk-pc"+(P.as?" on":""),"aria-pressed":P.as?"true":"false",onclick:function(){P.as=!P.as;draw()}},h("b",null,"Yardım modu "+(P.as?"açık":"kapalı")),h("small",null,"Bu seferi iki kez kaybettin. Ordu üretimi +%20, saldırı hızı +%10. Bu seferde 3. yıldız verilmez.")):null,
    h("div",{class:"row"},h("button",{class:"btn big",type:"button",onclick:function(){fkBegin(sc,P.dk,{dk:P.dt,cm:P.cm,kd:P.kd,as:!!P.as})}},"Seferi başlat"),h("button",{class:"btn ghost",type:"button",onclick:function(){S.fkPrep=null;draw()}},"Geri")))];
}
function fkScreen(){
  var G=S.fk,sc=G.sc,out=[];
  if(G.state==="over"){
    var win=G.over==="win",pc=Math.round(G.N[0].cells/G.land*100),ni=FK_SC.indexOf(sc),nx=win&&ni>=0&&ni<FK_SC.length-1?FK_SC[ni+1]:null,tot=G.dv.ok+G.dv.no;
    return [h("div",{class:"fk-res"},h("div",{class:"fk-ban"},win?"ZAFER":"YENİLGİ"),win?h("div",{class:"fk-sr"},fkStarRow(G.stars),h("small",null,G.stars===3?"Kusursuz sefer":G.stars===2?"Hızlı zafer ("+sc.par+" sn altı)":"Zafer · 2. yıldız için "+sc.par+" sn altında bitir")):null,
      h("h2",null,win?sc.n+": hedefe ulaştın":sc.n+": toprakların elden gitti"),
      h("div",{class:"gm-grid"},[["Toprak","%"+pc],["Skor",G.score],["Süre",Math.round(G.t)+" sn"],["Fethedilen",G.stats.took+" bölge"],["Kaybedilen",G.stats.lost+" bölge"],["Harcanan altın",Math.round(G.spent)]].map(function(a){return h("div",{class:"kcell"},h("small",{class:"mute"},a[0]),h("b",{class:"mono"},String(a[1])))})),
      G.newBd&&G.newBd.length?h("div",{class:"fk-newbd"},G.newBd.map(function(b){return h("div",{class:"fk-bd on"},h("b",null,"Yeni nişan: "+b[1]),h("small",null,b[2]))})):null,
      h("div",{class:"fk-note"},h("b",null,"Tarih notu: "),G.note||sc.notes[0][1]),
      tot?h("div",{class:"fk-note"},h("b",null,"Divan karnesi: "),G.dv.ok+" / "+tot+" doğru"+(G.dv.miss.length?". Tekrar et:":". Hepsi doğru."),G.dv.miss.slice(0,4).map(function(m){return h("div",{class:"small"},"• "+m.q+" → "+m.a)})):null,
      h("div",{class:"row"},nx?h("button",{class:"btn big",type:"button",onclick:function(){S.fkSel.sc=nx.id;fkStart(nx,fkDfKey(G))}},"Sıradaki: "+nx.n):null,h("button",{class:"btn"+(nx?" ghost":""),type:"button",onclick:function(){fkStart(sc,fkDfKey(G))}},"Tekrar oyna"),h("button",{class:"btn ghost",type:"button",onclick:function(){S.fk=null;draw()}},"Seferlere dön")))]}
  var sp=h("div",{class:"seg",role:"group","aria-label":"Oyun hızı"},[1,2,3].map(function(v){return h("button",{type:"button","aria-pressed":G.speed===v?"true":"false",onclick:function(){G.speed=v;draw()}},v+"×")}));
  var pcs=h("div",{class:"seg",role:"group","aria-label":"Saldırıya ayrılan ordu yüzdesi"},[25,50,75,100].map(function(v){return h("button",{type:"button","aria-pressed":G.pct===v?"true":"false",onclick:function(){G.pct=v;draw()}},"%"+v)}));
  var tabs=h("div",{class:"seg",role:"group","aria-label":"Paneller"},[["kul","Külliye"],["tek","Teknoloji"],["dip","Diplomasi"]].map(function(t){return h("button",{type:"button","aria-pressed":G.tab===t[0]?"true":"false",onclick:function(){G.tab=G.tab===t[0]?null:t[0];fkPanel(G);draw()}},t[1])}));
  setTimeout(function(){fkStatus(G);fkPanel(G);if(G.ev)fkEvShow(G);fkDraw(G);fkLoop(G)},0);
  var pl=sc.pl;
  return [h("div",{class:"fk-wrap"},h("div",{class:"fk-title"},h("b",null,sc.n),h("small",null,pl.n+" · "+pl.l)),h("div",{class:"fk-trait"},h("b",null,pl.tn+": "),pl.td),G.opt&&G.opt.dk?h("div",{class:"fk-ch"},[["Doktrin",G.opt.dk],["Komutan",G.opt.cm],["Kader",G.opt.kd]].map(function(z){return z[1]?h("span",{class:"fk-n",title:z[1].d},z[0]+": "+z[1].n):null})):null,G.ui.top,h("div",{class:"fk-prog"},G.ui.bar),G.cv,G.ui.hint,
    G.ui.evbox,G.ui.askbox,
    h("div",{class:"label fk-lab"},"Saldır (komşuya dokun)"),G.ui.chips,
    h("div",{class:"fk-ctl"},h("span",{class:"small"},"Saldırı gücü"),pcs),
    h("div",{class:"fk-ctl"},h("span",{class:"small"},"Hız"),sp,h("button",{type:"button",class:"btn ghost",onclick:function(){G.paused=!G.paused;draw()}},G.paused?"Devam":"Duraklat")),
    h("div",{class:"fk-ctl"},G.ui.q,tabs),G.ui.pan,G.ui.rank,G.ui.log,
    h("div",{class:"fk-leg small mute"},"Kendi renginle komşuya dokun: ordunun seçtiğin yüzdesi saldırır. Altın ve Divan sorularıyla güçlen. Tarihî olaylar sadeleştirilmiş, harita hayalîdir."),
    h("button",{class:"btn ghost",type:"button",onclick:function(){S.fk=null;draw()}},"Seferi bırak"))];
}
function fkHub(){
  var best=fkLoad(),sel=S.fkSel,st=fkLoad(),out=[h("div",{class:"fk-hero"},h("span",{class:"gh-k"},"STRATEJİ · KAMPANYA"),h("h2",null,"Fetih"),h("div",{class:"small"},"Türk tarihinin dönüm noktalarında ordunu yönet. Altınla külliye kur, devletlerle barış yap, Divan'ın bilgi sorularıyla güçlen. Yapay zekâ devletlerine karşı tek kişilik; arkadaşınla en iyi skorlarını eşitleyerek yarışabilirsin."))];
  var wins=num(st.wins),tk=num(st.taken),dd=num(st.divandogru),dt=num(st.divantoplam);
  out.push(h("div",{class:"fk-stats"},[["Zafer",wins],["Fethedilen bölge",tk],["Divan",dt?Math.round(dd/dt*100)+"%":"–"],["Yıldız",FK_SC.reduce(function(a,s){return a+fkStars(s.id)},0)+"/"+FK_SC.length*3]].map(function(a){return h("div",{class:"kcell"},h("small",{class:"mute"},a[0]),h("b",{class:"mono"},String(a[1])))})));
  var df=h("div",{class:"seg",role:"group","aria-label":"Zorluk"},Object.keys(FK_DF).map(function(k){return h("button",{type:"button","aria-pressed":sel.df===k?"true":"false",onclick:function(){sel.df=k;draw()}},FK_DF[k].n)}));
  var tk2=h("div",{class:"seg",style:"flex-wrap:wrap",role:"group","aria-label":"Divan soru konusu"},GM_TRK.map(function(t){return h("button",{type:"button","aria-pressed":(sel.trk||"all")===t[0]?"true":"false",onclick:function(){sel.trk=t[0];draw()}},t[1])}));
  out.push(h("div",{class:"gm-opt"},h("b",null,"Zorluk"),df),h("div",{class:"gm-opt"},h("b",null,"Divan soruları"),tk2));
  out.push(fkDailyCard());
  FK_SC.forEach(function(sc,i){
    var open=fkOpen(i),b=best[sc.id+FK_DF[sel.df].n],stv=fkStars(sc.id);
    out.push(h("div",{class:"fk-card"+(open?"":" lock")},h("div",{class:"fk-cb"},open?sc.yr[0]:"🔒"),h("div",{class:"fk-ci"},h("h3",null,sc.n),h("small",null,sc.sub+" · "+sc.pl.n+" olarak oyna"),
      open?[h("p",{class:"small"},sc.brief),h("div",{class:"fk-trait"},h("b",null,sc.pl.tn+": "),sc.pl.td),
        h("div",{class:"fk-ch"},sc.ai.map(function(a){return h("span",{class:"fk-n"},h("i",{style:"background:"+a.c}),a.n)})),
        h("div",{class:"fk-cr"},fkStarRow(stv),h("small",null,"Hedef %"+sc.goal+" · ★★ için "+sc.par+" sn")),
        h("button",{class:"btn big",type:"button",onclick:function(){sel.sc=sc.id;fkStart(sc,sel.df)}},stv?"Yeniden çık":"Sefere çık"),b?h("div",{class:"small mute"},"En iyi skorun ("+FK_DF[sel.df].n+"): "+b):null]
      :h("p",{class:"small"},"Önceki seferi kazanınca açılır: "+FK_SC[i-1].n)
    )))});
  out.push(h("div",{class:"label fk-lab2"},"Nişanlar"));
  out.push(h("div",{class:"fk-bds"},FK_BD.map(function(b){var on=num(st["nis"+b[0].charAt(0).toUpperCase()+b[0].slice(1)])>0;return h("div",{class:"fk-bd"+(on?" on":"")},h("b",null,on?b[1]:"???"),h("small",null,b[2]))})));
  out.push(h("details",{class:"panel fk-how"},h("summary",null,"Nasıl oynanır?"),h("ul",{class:"small"},[
    "Komşu butonlarına ya da haritada bir bölgeye dokun: ordunun seçtiğin yüzdesi saldırır. Aynı anda en çok 3 saldırı yürür.",
    "Altın zamanla birikir. Külliye'den asker üretimi, savunma, saldırı hızı, gelir ve Divan gücü yükseltilir.",
    "Diplomasi ile ateşkes ya da ittifak satın alırsın. Anlaşmayı bozmak ordunu %12 azaltır.",
    "Divan sorusunu doğru bilirsen ordu ve altın kazanırsın, yanlışta ordu yıpranır. Sorular derslerinden gelir.",
    "Sefer öncesi bir doktrin, bir komutan ve (zar atar gibi) bir kader seçersin; 5×4×6 kombinasyon her seferi farklı oynatır. Haritada orman/tepe ve dağ bölgeleri ele geçirmeyi yavaşlatır. Teknoloji sekmesinden sefer içi icatlar alırsın.",
    "Her seferin hedef oranı vardır. Süre sınırından hızlı bitirirsen 2, az kayıp ve Divan başarısıyla 3 yıldız alırsın."].map(function(t){return h("li",null,t)}))));
  return out;
}

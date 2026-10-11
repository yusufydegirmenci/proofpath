"use strict";
/* ---- v53 oyunda öğren: ağ noktası bilgi kartları ---- */
var GM_FACTS={
"Ev Ağı":{t:"Evindeki ya da ofisindeki küçük ağ. Cihazlar bir switch ya da Wi-Fi erişim noktasına bağlanır.",e:"Telefonun ve bilgisayarın aynı Wi-Fi'ye bağlıysa aynı ev ağındasın.",k:"Ev ağlarında genelde 192.168.x.x gibi özel IP adresleri kullanılır."},
"Switch":{t:"Aynı ağdaki cihazları bağlar ve MAC adresine bakarak çerçeveyi yalnızca doğru porta iletir.",e:"Ofiste duvardaki ağ kablosu soketlerinin ucunda bir switch vardır.",k:"Switch MAC adresiyle (katman 2), router IP adresiyle (katman 3) çalışır."},
"Router":{t:"Farklı ağları birbirine bağlar ve paketleri IP adresine göre en uygun yoldan yönlendirir.",e:"Evdeki modem/router, ev ağını internete bağlar.",k:"Yönlendirme tablosu şunu söyler: bu hedef ağa gitmek için paketi hangi sonraki adıma (next-hop) vereyim."},
"DNS Kulesi":{t:"Alan adlarını (ör. google.com) IP adreslerine çevirir. Ağın telefon rehberi gibidir.",e:"Tarayıcıya bir adres yazınca önce DNS'e sorulur, sonra o IP'ye gidilir.",k:"DNS sorguları çoğunlukla UDP 53 portunu kullanır."},
"Güvenlik Duvarı":{t:"Kurallara göre gelen ve giden trafiğe izin verir ya da engeller.",e:"Dışarıdan şirket iç ağına gelen istenmeyen bağlantıları filtreler.",k:"Kurallar sırayla bakılır, ilk eşleşen uygulanır. Çoğu güvenlik duvarında en sonda 'geri kalan her şeyi reddet' vardır."},
"Proxy":{t:"İstemci ile sunucu arasında durur, istekleri onun adına iletir. Filtreleme ve önbellek sağlayabilir.",e:"Şirket, çalışanların internet erişimini bir proxy üzerinden denetler.",k:"Ters proxy (reverse proxy) ise tam tersi: sunucuların önünde durup gelen istekleri karşılar."},
"Gateway":{t:"Bir ağdan başka bir ağa çıkış kapısı. Hedef kendi ağında değilse paket buraya gönderilir.",e:"Bilgisayarındaki 'varsayılan ağ geçidi' genelde router'ının IP adresidir.",k:"Hedef aynı ağda değilse paket varsayılan ağ geçidine (default gateway) gider."},
"VPN Tüneli":{t:"Trafiği şifreleyerek güvensiz bir ağın üzerinden güvenli bir tünel gibi taşır.",e:"Evden çalışırken şirket ağına VPN ile bağlanırsın.",k:"VPN trafiği şifreler; yine de bağlandığın VPN hizmetine güvenmen gerekir."},
"Bulut Geçidi":{t:"Sunucuları ve uygulamaları kendi odanda değil, sağlayıcının veri merkezlerinde çalıştırırsın.",e:"Gmail, OneDrive, AWS ve Azure bulut hizmetleridir.",k:"IaaS: sunucu kiralarsın. PaaS: hazır platform kullanırsın. SaaS: hazır uygulama kullanırsın."},
"Yük Dengeleyici":{t:"Gelen istekleri birden fazla sunucuya dağıtır. Biri çökerse trafiği diğerlerine yollar.",e:"Büyük sitelerde aynı anda gelen binlerce istek birkaç sunucuya paylaştırılır.",k:"Amaç: hız ve kesintisiz hizmet (yüksek erişilebilirlik)."},
"Sunucu Odası":{t:"Sunucuların, depolamanın ve ağ cihazlarının durduğu yer. Güç, soğutma ve yedekleme kritiktir.",e:"Şirketin veritabanı ve dosya sunucuları burada çalışır.",k:"Geri yükleme test edilmemiş yedek, yedek sayılmaz."},
"Hedef Sunucu":{t:"Paketin gideceği son durak. İstek burada işlenir, cevap aynı yoldan geri döner.",e:"Bir web sitesini açtığında isteğin bir web sunucusuna ulaşır, o da sayfayı sana gönderir.",k:"İstek-cevap döngüsü: istemci ister, sunucu cevaplar."},
"Gelen Kutusu":{t:"İş e-postası kısa, net ve kibar olmalı. Konu satırı mesajın özetidir.",e:"Müşteriye 'Could you please send me the file?' (Dosyayı bana gönderebilir misiniz?) diye yazarsın.",k:"Rica için 'Could you please…?', teşekkür için 'Thank you for your help.', kapanışta 'Best regards,' kullanılır."},
"Toplantı Odası":{t:"Toplantıda gündemi, görev sahibini ve tarihi netleştirmek için sabit kalıplar kullanılır.",e:"'Let's schedule a meeting for Monday.' (Pazartesi için bir toplantı ayarlayalım.)",k:"'Could you share your screen?' = ekranını paylaşır mısın? 'Let's take this offline.' = bunu toplantıdan sonra ayrıca konuşalım."},
"Stand-up":{t:"Günlük kısa toplantı: dün ne yaptın, bugün ne yapacaksın, ilerlemeni engelleyen bir şey var mı?",e:"'Yesterday I fixed a bug. Today I will write tests.' (Dün bir hatayı düzelttim. Bugün test yazacağım.)",k:"Kalıp: Yesterday… Today… I'm blocked by… (…yüzünden ilerleyemiyorum)."},
"Destek Masası":{t:"Destek talebinde sorunu, attığın adımları ve beklediğin sonucu açıkça yazarsın.",e:"'I can't log in. I get an error after I enter my password.' (Giriş yapamıyorum. Şifreyi girince hata alıyorum.)",k:"Sorun anlatımı: ne yaptım, ne bekledim, ne oldu? (steps, expected, actual)"},
"Kod İncelemesi":{t:"Kod incelemesinde (code review) yorumlar nazik ve somut yazılır.",e:"'Could you add a test for this case?' (Bu durum için bir test ekler misin?)",k:"'LGTM' = looks good to me (bana iyi görünüyor, onaylıyorum). 'Nit:' = küçük, önemsiz öneri."},
"Müşteri Hattı":{t:"Müşteriyle konuşurken sıra şöyledir: önce anlayış gösterirsin, sonra çözüm sunarsın.",e:"'I'm sorry for the inconvenience. I'll check it right away.' (Yaşattığımız sıkıntı için özür dilerim. Hemen kontrol edeceğim.)",k:"Önce özür ya da anlayış, sonra eylem: 'I understand… I will… by tomorrow.'"},
"Muhafız Kapısı":{t:"Patron kapısı: bu konudaki en zor sorular burada.",e:"Gerçek güvenlikte de en kritik noktalar birden fazla katmanla korunur.",k:"Katmanlı savunma (defense in depth): tek bir önleme güvenme."}};
var GM_CARD_KEY="ya_cards";
function gmCards(){try{var o=JSON.parse(localStorage.getItem(GM_CARD_KEY)||"null");return o&&typeof o==="object"?o:{}}catch(e){return {}}}
function gmCardSave(o){try{localStorage.setItem(GM_CARD_KEY,JSON.stringify(o))}catch(e){}try{syncPush()}catch(e){}}
function gmCardLv(n){return n>=15?3:n>=5?2:n>=1?1:0}
var GM_LVN=["Kilitli","Bronz","Gümüş","Altın"];
function gmCardsUpdate(R){
  var C=gmCards(),nw=[],up=[];
  function credit(nm,ok){if(!GM_FACTS[nm])return;var c=C[nm]||(C[nm]={ok:0,n:0}),b=gmCardLv(c.ok);c.n++;if(ok){c.ok++}var a=gmCardLv(c.ok);if(a>b){if(!c.d)c.d=today();if(b===0&&nw.indexOf(nm)<0)nw.push(nm);else if(up.indexOf(nm)<0)up.push(nm)}c.t=Date.now()}
  (R.hist||[]).forEach(function(ok,i){var q=R.qs[i];if(!q)return;credit(gmClass(q),ok);if(q.boss)credit("Muhafız Kapısı",ok)});
  gmCardSave(C);R.newCards=nw;R.upCards=up;
}
function gmCardEl(nm,c,big){
  var F=GM_FACTS[nm],lv=gmCardLv(c&&c.ok||0);
  return h("div",{class:"gcard l"+lv+(big?" big":"")},h("div",{class:"gc-h"},h("canvas",{class:"gc-ic",width:72,height:72,"data-n":nm}),h("div",null,h("b",null,nm),h("small",null,GM_LVN[lv]+(c&&c.ok?" · "+c.ok+" doğru":"")))),
    lv>0||big?h("div",{class:"gc-b"},h("div",{class:"small"},F.t),big?h("div",{class:"small"},h("b",null,"Gerçek hayatta: "),F.e):null,big?h("div",{class:"small"},h("b",null,"Kural: "),F.k):null):null);
}
function gmPaintIcons(root){
  (root||document).querySelectorAll("canvas.gc-ic").forEach(function(cv){var x=cv.getContext("2d");x.clearRect(0,0,72,72);var lv=gmCardLv((gmCards()[cv.getAttribute("data-n")]||{}).ok||0);
    gmIcon(x,cv.getAttribute("data-n"),36,40,22,lv?"#2f8f83":"#9aa3a0",lv?"#10231f":"#6b7280",lv?"#e0a000":"#b9bfbd","#e5484d")})
}
function gmCardsTab(){
  var C=gmCards(),names=Object.keys(GM_FACTS),have=names.filter(function(n){return gmCardLv((C[n]||{}).ok||0)>0}).length,out=[];
  out.push(h("div",{class:"gq"},h("div",{class:"gq-h"},h("b",null,"Ağ Kartları"),h("span",{class:"gq-chest"+(have===names.length?" open":"")},have+" / "+names.length+" kart")),
    h("div",{class:"small mute"},"Her ağ noktasında doğru cevap verince kartı açılır. 1 doğruda Bronz, 5'te Gümüş, 15'te Altın. Kartlarda gerçek hayattan örnek ve ezberlenecek kural var.")));
  out.push(h("div",{class:"gc-grid"},names.map(function(n){return gmCardEl(n,C[n],false)})));
  setTimeout(function(){gmPaintIcons(document)},0);
  return out;
}
function gmDailyNode(){var names=Object.keys(GM_FACTS).filter(function(n){return n!=="Muhafız Kapısı"});return names[dayNum(today())%names.length]}

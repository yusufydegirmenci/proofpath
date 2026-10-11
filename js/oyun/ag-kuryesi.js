"use strict";
/* ---- v51 Ağ Kuryesi: kurgu ---- */
var GM_STORY={
 daily:{tag:"GÜNLÜK TESLİMAT",n:"Paketi hedefe ulaştır",brief:"Sen bir veri paketisin. Ağ Şehri'nin ağ noktalarından geçip hedef sunucuya varman gerek. Her kapı bir kontrol noktası: doğru cevap seni bir sonraki noktaya taşır."},
 boss:{tag:"HAFTALIK PATRON",n:"Firewall Muhafızı",brief:"Muhafız hattı kapattı. Altın çerçeveli 4 patron kapısını doğru geçersen duvarı yıkar, paketi hedefe ulaştırırsın."},
 en:{tag:"İŞ İNGİLİZCESİ HATTI",n:"Ofiste bir gün",brief:"Gelen kutusundan toplantıya, destek masasından müşteri hattına: iş yerinde gerçekten kullanacağın cümlelerle yol al. Her kapı bir ofis durumu."},
 sonsuz:{tag:"SONSUZ SEFER",n:"Ağın sonu yok",brief:"Paketin yolu bitmez. Kapılardan geçtikçe kademe atlarsın: Çırak, Kalfa, Usta, Üstat, Efsane. Her 5 doğruda bir can kazanırsın. Ne kadar uzağa gidebilirsin?"},
 free:{tag:"ANTRENMAN HATTI",n:"Serbest sürüş",brief:"Baskı yok, XP yok. Zayıf olduğun konular sık gelir; rahatça dene, hata yapınca açıklamayı oku."}};
var GM_NODES=["Switch","Router","DNS Kulesi","Güvenlik Duvarı","Proxy","Gateway","VPN Tüneli","Bulut Geçidi","Yük Dengeleyici","Sunucu Odası"];
var GM_ORDER=["Ev Ağı","Switch","Router","Gateway","DNS Kulesi","Güvenlik Duvarı","Proxy","VPN Tüneli","Bulut Geçidi","Yük Dengeleyici","Sunucu Odası","Hedef Sunucu","Gelen Kutusu","Toplantı Odası","Stand-up","Destek Masası","Kod İncelemesi","Müşteri Hattı"];
var GM_KW=[
["Ev Ağı",/wi-?fi|kablosuz|ssid|modem|ev ağı|\blan\b|ipv4|ip adres|özel ip|192\.168|alt ağ|subnet|maske|apipa|ipv6/gi],
["Switch",/switch|\bmac\b|vlan|çerçeve|\bstp\b|trunk|etherchannel|lacp|802\.1|port security|\barp\b|katman 2|ethernet|\bcdp\b|lldp|erişim portu/gi],
["Router",/router|yönlendir|ospf|\brota\b|routing|statik|eigrp|\bbgp\b|hsrp|next-hop|\bicmp\b|\bping\b|traceroute|\bttl\b|yönlendirme/gi],
["Gateway",/gateway|ağ geçidi|\bnat\b|\bpat\b|dhcp|\bntp\b|snmp|syslog|\bqos\b|\bftp\b|\btftp\b/gi],
["DNS Kulesi",/\bdns\b|alan adı|domain|nslookup|a kaydı|\bmx\b|cname/gi],
["Güvenlik Duvarı",/firewall|güvenlik duvarı|\bacl\b|erişim listesi|saldırı|injection|\bxss\b|csrf|phishing|oltalama|zararlı|malware|zafiyet|owasp|saldırgan|\bcia\b|parola|\bmfa\b|iki aşamalı|kimlik doğrulama|yetkilendirme|ransomware|fidye|güvenlik açığı|exploit|sızma|sql injection/gi],
["Proxy",/proxy|vekil|https|\btls\b|\bssl\b|sertifika|cookie|çerez|oturum|tarayıcı|durum kodu|status code|header|başlık|\bcors\b/gi],
["VPN Tüneli",/\bvpn\b|tünel|ipsec|şifrel|\bhash\b|encrypt|\bssh\b|\brsa\b|\baes\b|anahtar|dijital imza|\bsalt\b|kriptograf/gi],
["Bulut Geçidi",/bulut|cloud|\baws\b|azure|\bsaas\b|\biaas\b|\bpaas\b|docker|konteyner|container|devops|ci\/cd|kubernetes|otomasyon|python|\bjson\b|\byaml\b|\bgit\b|sanallaştır|\bnetconf\b|ansible|terraform/gi],
["Yük Dengeleyici",/yük denge|load balanc|ölçek|performans|önbellek|\bcache\b|kuyruk|\bqueue\b|asenkron|\basync\b|eşzamanlı|thread|\bindeks|\bindex\b|optimiz|gecikme|bant genişliği|trafik yoğun/gi],
["Sunucu Odası",/sunucu|\bserver\b|yedek|backup|\braid\b|\bdisk\b|veritabanı|\bsql\b|\btablo\b|\bjoin\b|\bselect\b|primary key|birincil anahtar|normalizasyon|\bacid\b|transaction|\bişlem\b|\brpo\b|\brto\b|\bnosql\b|entity|\bef core\b/gi],
["Hedef Sunucu",/\bhttp\b|\bweb\b|\bistek\b|\bcevap\b|request|response|sayfa|uygulama|frontend|backend|\btest\b|\bbug\b|hata ayıkla|\blog\b|\bc#|\.net|controller|\bapi\b|\brest\b|endpoint/gi],
["Gelen Kutusu",/e-?mail|e-?posta|regards|attach|subject line|konu satırı|\bcc\b|\bbcc\b|reply|\bforward\b/gi],
["Toplantı Odası",/meeting|toplantı|agenda|gündem|schedule|calendar|takvim|\bminutes\b|presentation|sunum/gi],
["Destek Masası",/ticket|talep|\bissue\b|support|destek|incident|olay kaydı|sorun bildir|steps to reproduce|helpdesk|bug report/gi],
["Kod İncelemesi",/code review|kod inceleme|pull request|\bcommit\b|merge|refactor|\bdeploy|branch|\blgtm\b|unit test|birim test/gi],
["Müşteri Hattı",/customer|client|müşteri|invoice|fatura|apolog|complain|şikayet|refund|iade|delivery|teslimat/gi]];
function gmClass(q){
  if(!q)return "Kontrol Noktası";if(q.nd)return q.nd;
  var tx=(q.q||"")+" "+(q.o&&q.o[q.a]||"")+" "+(q.w||"")+" "+(q.term||""),best="",bs=0;
  GM_KW.forEach(function(p){p[1].lastIndex=0;var m=tx.match(p[1]);var n=m?m.length:0;if(n>bs){bs=n;best=p[0]}});
  if(!best&&(q.t==="eng"||q.t==="en"||q.t==="v"))best="Stand-up";
  q.nd=best||"Kontrol Noktası";return q.nd;
}
function gmArrange(out,mode){
  var n=out.length;out.forEach(function(q,i){gmClass(q);q._i=i});
  function inLine(q){var k=GM_ORDER.indexOf(q.nd);return mode==="en"?k>=12:(k>=0&&k<12)}
  var known=out.filter(inLine).sort(function(a,b){return GM_ORDER.indexOf(a.nd)-GM_ORDER.indexOf(b.nd)||a._i-b._i}),gen=out.filter(function(q){return !inLine(q)}),res=new Array(n),pos={};
  gen.forEach(function(q,k){var p=Math.min(n-1,Math.floor((k+1)*n/(gen.length+1)));while(pos[p]&&p<n-1)p++;pos[p]=1;res[p]=q});
  var ki=0;for(var i=0;i<n;i++)if(!res[i])res[i]=known[ki++];
  return res.filter(Boolean);
}
function gmNode(R,gi){var q=R.qs[gi];if(!q)return "Kontrol Noktası";return q.boss?"Muhafız Kapısı":gmClass(q)}
function gmFactOf(R,gi){var q=R.qs[gi];return q?GM_FACTS[gmClass(q)]:null}
function gmIcon(x,nm,cx,cy,s,fill,ink,gold,bad){
  x.save();x.lineJoin="round";x.lineCap="round";x.lineWidth=Math.max(1,s*.08);x.strokeStyle=ink;x.fillStyle=fill;
  function box(a,b,w,h2){x.fillRect(cx+a*s,cy+b*s,w*s,h2*s);x.strokeRect(cx+a*s,cy+b*s,w*s,h2*s)}
  function ln(a,b,c,d){x.beginPath();x.moveTo(cx+a*s,cy+b*s);x.lineTo(cx+c*s,cy+d*s);x.stroke()}
  function ci(a,b,r,f){x.beginPath();x.arc(cx+a*s,cy+b*s,r*s,0,7);if(f)x.fill();x.stroke()}
  if(nm==="Ev Ağı"){box(-.5,-.2,1,.7);x.beginPath();x.moveTo(cx-.65*s,cy-.2*s);x.lineTo(cx,cy-.8*s);x.lineTo(cx+.65*s,cy-.2*s);x.closePath();x.fillStyle=gold;x.fill();x.stroke();x.fillStyle=ink;x.fillRect(cx-.1*s,cy+.1*s,.2*s,.4*s)}
  else if(nm==="Switch"){box(-.8,-.2,1.6,.5);x.fillStyle=gold;for(var i=0;i<4;i++)x.fillRect(cx+(-.65+i*.35)*s,cy-.05*s,.22*s,.2*s)}
  else if(nm==="Router"){box(-.7,0,1.4,.45);ln(-.45,0,-.6,-.6);ln(.45,0,.6,-.6);x.fillStyle=gold;ci(-.45,.22,.07,1);ci(-.2,.22,.07,1)}
  else if(nm==="DNS Kulesi"){x.beginPath();x.moveTo(cx-.3*s,cy+.5*s);x.lineTo(cx-.1*s,cy-.5*s);x.lineTo(cx+.1*s,cy-.5*s);x.lineTo(cx+.3*s,cy+.5*s);x.closePath();x.fill();x.stroke();ci(0,-.6,.1,1);x.beginPath();x.arc(cx,cy-.6*s,.3*s,-2.4,-.74);x.stroke();x.beginPath();x.arc(cx,cy-.6*s,.5*s,-2.4,-.74);x.stroke()}
  else if(nm==="Güvenlik Duvarı"){for(var r=0;r<3;r++)for(var c=0;c<3;c++){x.fillStyle=(r+c)%2?fill:gold;box(-.75+c*.5+(r%2?.25:0),-.3+r*.28,.48,.26)}x.fillStyle=bad;x.beginPath();x.moveTo(cx-.15*s,cy-.3*s);x.lineTo(cx,cy-.85*s);x.lineTo(cx+.15*s,cy-.3*s);x.closePath();x.fill()}
  else if(nm==="Proxy"||nm==="Muhafız Kapısı"){x.fillStyle=nm==="Proxy"?fill:bad;x.beginPath();x.moveTo(cx-.55*s,cy-.55*s);x.lineTo(cx+.55*s,cy-.55*s);x.lineTo(cx+.5*s,cy+.1*s);x.quadraticCurveTo(cx,cy+.8*s,cx-.5*s,cy+.1*s);x.closePath();x.fill();x.stroke();x.fillStyle=gold;ci(0,-.1,.18,1)}
  else if(nm==="Gateway"){box(-.7,-.5,.3,1);box(.4,-.5,.3,1);x.fillStyle=gold;box(-.8,-.65,1.6,.2)}
  else if(nm==="VPN Tüneli"){for(var k=3;k>=1;k--){x.fillStyle=k%2?fill:gold;x.beginPath();x.arc(cx,cy+.45*s,k*.25*s,Math.PI,0);x.lineTo(cx+k*.25*s,cy+.5*s);x.lineTo(cx-k*.25*s,cy+.5*s);x.closePath();x.fill();x.stroke()}}
  else if(nm==="Bulut Geçidi"){ci(-.35,.05,.28,1);ci(.05,-.2,.38,1);ci(.45,.05,.28,1);box(-.35,.05,.8,.28);x.fillStyle=fill;x.fillRect(cx-.33*s,cy+.04*s,.76*s,.27*s)}
  else if(nm==="Yük Dengeleyici"){ln(0,-.6,0,.5);ln(-.5,.5,.5,.5);ln(-.65,-.3,.65,-.3);x.fillStyle=gold;box(-.8,-.25,.35,.18);box(.45,-.25,.35,.18)}
  else if(nm==="Sunucu Odası"||nm==="Hedef Sunucu"){for(var u=0;u<3;u++){x.fillStyle=fill;box(-.5,-.55+u*.4,1,.34);x.fillStyle=gold;ci(.3,-.38+u*.4,.06,1)}if(nm==="Hedef Sunucu"){ln(.55,-.55,.55,-1);x.fillStyle=bad;x.beginPath();x.moveTo(cx+.55*s,cy-1*s);x.lineTo(cx+1*s,cy-.85*s);x.lineTo(cx+.55*s,cy-.7*s);x.closePath();x.fill()}}
  else if(nm==="Gelen Kutusu"){box(-.7,-.35,1.4,.9);x.beginPath();x.moveTo(cx-.7*s,cy-.35*s);x.lineTo(cx,cy+.15*s);x.lineTo(cx+.7*s,cy-.35*s);x.stroke()}
  else if(nm==="Toplantı Odası"){x.fillStyle=gold;box(-.7,0,1.4,.3);x.fillStyle=fill;ci(-.45,-.3,.2,1);ci(0,-.4,.2,1);ci(.45,-.3,.2,1)}
  else if(nm==="Stand-up"){for(var i2=0;i2<3;i2++){x.fillStyle=i2%2?gold:fill;box(-.7+i2*.5,-.4+(i2%2)*.15,.45,.6)}}
  else if(nm==="Destek Masası"){x.beginPath();x.arc(cx,cy-.1*s,.5*s,Math.PI,0);x.stroke();x.fillStyle=gold;box(-.62,-.15,.25,.4);box(.37,-.15,.25,.4);ln(.5,.25,.2,.5)}
  else if(nm==="Kod İncelemesi"){ln(-.2,-.4,-.7,0);ln(-.7,0,-.2,.4);ln(.2,-.4,.7,0);ln(.7,0,.2,.4);ln(.1,-.5,-.1,.5)}
  else if(nm==="Müşteri Hattı"){x.beginPath();x.moveTo(cx-.7*s,cy-.4*s);x.lineTo(cx+.7*s,cy-.4*s);x.lineTo(cx+.7*s,cy+.2*s);x.lineTo(cx-.1*s,cy+.2*s);x.lineTo(cx-.4*s,cy+.5*s);x.lineTo(cx-.4*s,cy+.2*s);x.lineTo(cx-.7*s,cy+.2*s);x.closePath();x.fill();x.stroke()}
  else{ln(-.6,.5,-.6,-.5);ln(.6,.5,.6,-.5);x.fillStyle=gold;box(-.7,-.35,1.4,.2);box(-.7,0,1.4,.2)}
  x.restore();
}
function gmSeen(set){try{if(set)localStorage.setItem("ya_gm_seen","1");return localStorage.getItem("ya_gm_seen")==="1"}catch(e){return false}}
function gmRank(R){var n=Math.max(1,Math.min(R.gi,R.qs.length)),p=R.correct/n;return R.lives<=0||R.gi<R.qs.length?(p>=.7?"B":"C"):(p>=.97?"S":p>=.85?"A":p>=.7?"B":"C")}
function gmTrack(R){
  var u=R.ui;if(!u||!u.trk)return;var n=R.qs.length,cur=(R.hold>0&&R.gi>0)?R.gi-1:R.gi,hist=R.hist||[];
  var kids=[];
  var line=h("div",{class:"gm-tr"},R.qs.map(function(q,i){var c=i<hist.length?(hist[i]?"ok":"bad"):i===cur?"cur":"";return h("i",{class:c+(q.boss?" boss":"")})}));
  kids.push(h("div",{class:"gm-trl"},h("span",null,"Sıradaki: "+gmNode(R,Math.min(cur,n-1))),h("small",{class:"mono"},Math.min(cur+1,n)+" / "+n)));
  kids.push(line);
  if(R.mode==="boss"){var tot=R.qs.filter(function(q){return q.boss}).length,hit=R.bossHit||0;kids.push(h("div",{class:"gm-boss"},h("span",null,"Muhafız"),h("span",{class:"xpbar"},h("i",{style:"width:"+Math.round((1-hit/Math.max(1,tot))*100)+"%"})),h("small",{class:"mono"},Math.max(0,tot-hit)+"/"+tot)))}
  u.trk.replaceChildren.apply(u.trk,kids);
}

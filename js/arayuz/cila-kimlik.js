"use strict";
/* ---- v15: cila (mini başlık, Daha menüsü, Akademi Kimliği) ---- */
var TT={bugun:["Bugün","Günlük rota"],ders:["Ders","Bugünün dersi"],sinif:["Sınıf","Canlı sorular"],sehir:["Ağ Şehri","Bina bina ilerle"],oyun:["Oyun","Koş, sür, öğren"],atolye:["Atölye","Program ve alıştırma"],masa:["Masa","Destek talepleri"],lig:["Lig","Arkadaşlarla yarış"],gazete:["Gazete","Haber ve etkinlikler"],proje:["Proje","Birlikte yapalım"],sozluk:["Sözlük","Kelimelerin anlamı"],rehber:["Rehber","Nasıl çalışır?"],ayar:["Ayarlar","Okuma"],mul:["Mülakat","Sesli prova"],oku:["Okuma","Çocuk öyküleri"],ofis:["Ofis","Hikâye ve Müdür"],sayilar:["Sayılar","İlerleme"],oduller:["Ödüller","Kimlik ve ödüller"]};
var PRIMARY={bugun:1,ders:1,sinif:1,oyun:1,atolye:1};
S.more=false;
function miniHero(){
  if(S.guest){var gs=lgStats(myLeague());hero.replaceChildren(h("div",{class:"aurora","aria-hidden":"true"},h("i"),h("i")),h("div",{class:"hero-in mini-in"},h("span",{class:"crestbtn"},crest()),h("div",{class:"mt"},h("b",null,"Akademi Ligi"),h("span",null,"Proofpath · misafir")),h("div",{class:"mchips"},h("span",{class:"hchip"},"Lv"+(gs.lv+1)+" "+gs.lvName),h("span",{class:"hchip"},mi(FLAME,gs.streak>0?"var(--rust)":"var(--mute)"),gs.streak))));return}
  var R=rankInfo(),st=streakInfo(),tt=TT[tab]||[tab,""],pct=R.nxt?Math.max(0,Math.min(100,(R.xp-R.cur.xp)/(R.nxt.xp-R.cur.xp)*100)):100;
  hero.replaceChildren(h("div",{class:"aurora","aria-hidden":"true"},h("i"),h("i")),
    h("div",{class:"hero-in mini-in"},
      h("button",{class:"crestbtn",type:"button","aria-label":"Bugün sekmesine dön",onclick:function(){goTab("bugun")}},crest()),
      h("div",{class:"mt"},h("b",null,tt[0]),h("span",null,tt[1])),
      h("div",{class:"mchips"},
        h("span",{class:"hchip",title:R.cur.n},h("span",{class:"mring",style:"--p:"+pct+"%"}),R.xp+" XP"),
        h("span",{class:"hchip",title:"Seri"},mi(FLAME,st.n>0?"var(--rust)":"var(--mute)"),st.n))));
}
function moreSheet(){
  function close(){S.more=false;draw()}
  var R=rankInfo(),C={proje:"var(--rust)",mul:"var(--net)",oku:"var(--eng)",ofis:"#8b6cff",sayilar:"var(--net)",lig:"var(--rust)",oduller:"var(--gold,#c9a227)",sehir:"var(--eng)",masa:"var(--net)",gazete:"var(--rust)",rehber:"var(--mute)",sozluk:"var(--eng)",ayar:"var(--mute)"};
  function tile(k,t,d,cls){
    var badge=k==="ofis"&&pendingProposals()>0;
    return h("button",{class:"mt2"+(cls?" "+cls:""),type:"button","data-k":k,style:"--c:"+(C[k]||"var(--net)"),onclick:function(){S.more=false;goTab(k)}},
      h("span",{class:"ic"},mi((NAV[k]||["",""])[1])),
      cls==="sm"?h("b",null,t):h("span",{style:"display:grid;gap:2px;min-width:0"},h("b",null,t),d?h("small",null,d):null),
      badge?h("span",{class:"pill ok"},"onay var"):null);
  }
  var sections;
  if(S.pf.simple){
    sections=[[null,[["rehber","Rehber","Burada nasıl öğrenirsin?"],["sozluk","Sözlük","Kelimelerin anlamı"],["ayar","Ayarlar","Yazı boyu, tema, tempo"]],""]];
  }else{
    sections=[["Şehir ve iş",[["sehir","Ağ Şehri","Her bina bir konu, ilerledikçe yükselir"],["masa","Masa","Müşterilerle ilgilen, destek talepleri"],["gazete","Gazete","Haber ve etkinlikler"],["ofis","Ofis","İş hikâyesi, Müdür raporu"]],""],
      ["Çalış ve üret",[["proje","Proje","Adımlara böl, XP kazan"],["mul","Mülakat","Sesli prova, model cevap"],["oku","Okuma","Hikâye, kelime, not"],["sayilar","Sayılar","Grafik ve ısı haritası"]],""],
      ["Takip ve ödül",[["lig","Lig","Arkadaşlarla sıralama"]],""],
      ["Yardım",[["rehber","Rehber"],["sozluk","Sözlük"],["ayar","Ayarlar"]],"sm"]];
  }
  return h("div",{class:"msheet-bg",onclick:function(e){if(e.target===e.currentTarget)close()}},
    h("div",{class:"msheet v2",role:"dialog","aria-label":"Daha fazla"},h("div",{class:"grab"}),
      h("div",{class:"mhd"},h("h2",null,"Daha fazla"),h("div",{style:"display:flex;gap:8px;align-items:center"},h("span",{class:"mrk"},R.cur.n+" · "+R.xp+" XP"),h("button",{class:"mx",type:"button","aria-label":"Kapat",onclick:close},"×"))),
      sections.map(function(sec){
        var G=sec[2]==="sm";
        var out=[sec[0]?h("div",{class:"label"},sec[0]):null,h("div",{class:"mgrid"+(G?" g3":"")},sec[1].map(function(x){return tile(x[0],x[1],x[2],G?"sm":"")}))];
        if(sec[0]==="Takip ve ödül"){out[1].append(h("button",{class:"mt2 wide",type:"button","data-k":"oduller",style:"--c:"+C.oduller,onclick:function(){S.more=false;goTab("oduller")}},
          h("span",{class:"ic"},mi(NAV.oduller[1])),h("span",{style:"display:grid;gap:2px;min-width:0"},h("b",null,"Ödüller ve Kimlik"),h("small",null,"Rozetler, Akademi Kimliği, terfi dosyası")),h("span",{class:"pill"},R.cur.n)))}
        return h("div",{class:"msec"},out)})));
}
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&S.more){S.more=false;draw()}if(e.key==="Escape"&&S._rtOpen){S._rtOpen=false;draw()}});
/* kimlik kartı */
function idStats(){
  var R=rankInfo(),st=streakInfo(),ds=deskState(),G=goalTrack(),c=cityTopics(G),e=G==="eng"?[]:topicsOf("eng");
  function built(a){return a.filter(PP.ogr.ilerleme.konuTamam).length}
  return {rank:R.cur.n,xp:R.xp,streak:st.n,ccna:built(c),ccnaT:c.length,gn:trName(G),ge:G==="eng",eng:built(e),engT:e.length,csat:ds.csat,tickets:ds.n,words:S.words.length,term:termWeek(),
    bars:c.slice().sort(function(a,b){return num(a.order)-num(b.order)}).map(function(t){return t.status==="built"?1:t.status==="building"?.55:t.status==="next"?.2:.08})};
}
function idSerial(){var d=today().replace(/-/g,"");return "YA-"+d.slice(0,4)+"-"+d.slice(4)}
function renderIdCard(){
  var s=idStats();
  function cell(v,l){return h("div",{class:"idcell"},h("b",null,String(v)),h("small",null,l))}
  var card=h("div",{class:"idc"},
    h("div",{class:"idc-in"},
      h("div",{class:"idc-top"},crest(),h("div",null,h("b",null,"PROOFPATH"),h("span",null,"AKADEMİ KİMLİĞİ"))),
      h("div",{class:"idc-name"},MYN()||"Öğrenci"),h("div",{class:"idc-rank"},s.rank),
      h("div",{class:"idc-grid"},cell(s.xp,"XP"),cell(s.streak,"gün seri"),cell(s.ccna+"/"+s.ccnaT,s.ge?"İng. basamak":s.gn+" bina"),cell(s.ge?"–":s.eng+"/"+s.engT,s.ge?"seviye":"İng. basamak"),cell(s.tickets,"ticket"),cell(s.csat==null?"–":s.csat,"memnuniyet")),
      h("div",{class:"idc-sky","aria-hidden":"true"},s.bars.map(function(v){return h("i",{style:"height:"+Math.round(10+v*38)+"px;opacity:"+(.35+v*.65)})})),
      h("div",{class:"idc-foot"},h("span",null,s.term),h("span",null,idSerial()))));
  card.addEventListener("pointermove",function(e){var r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.setProperty("--ry",(x*10)+"deg");card.style.setProperty("--rx",(-y*10)+"deg");card.style.setProperty("--gx",(x*100+50)+"%")});
  card.addEventListener("pointerleave",function(){card.style.setProperty("--ry","0deg");card.style.setProperty("--rx","0deg")});
  var IC=S.idc=S.idc||{busy:false,msg:""};
  return h("div",{class:"panel idpanel"},h("div",{class:"label"},"Kimliğin"),h("h2",null,"Akademi Kimliği"),card,
    h("div",{class:"small mute"},"Çalıştıkça dolan kartın. Resim olarak kaydedip paylaşabilirsin. Siteye bakmak isteyen olursa sayfanın Paylaş menüsünden erişim ver."),
    h("div",{class:"row"},h("button",{class:"btn",type:"button",disabled:!S.dl||IC.busy,onclick:saveIdCard},IC.busy?"Hazırlanıyor...":"Resim olarak kaydet"),!S.dl?h("span",{class:"small mute"},"Bu görünümde kaydetme yok."):null),
    IC.msg?h("div",{class:"small",style:"color:var(--mute)"},IC.msg):null);
}
function idPng(){
  var s=idStats(),W=1080,H=1350,c=document.createElement("canvas");c.width=W;c.height=H;var x=c.getContext("2d");
  var g=x.createLinearGradient(0,0,W,H);g.addColorStop(0,"#0b1630");g.addColorStop(.55,"#1d2b63");g.addColorStop(1,"#3a2a6b");x.fillStyle=g;x.fillRect(0,0,W,H);
  for(var i=0;i<70;i++){x.fillStyle="rgba(255,255,255,"+(0.15+((i*37)%10)/25)+")";x.fillRect((i*149)%W,(i*263)%620,2+(i%3),2+(i%3))}
  var gl=x.createRadialGradient(W*.8,170,10,W*.8,170,260);gl.addColorStop(0,"rgba(255,215,120,.35)");gl.addColorStop(1,"rgba(255,215,120,0)");x.fillStyle=gl;x.fillRect(0,0,W,520);
  x.strokeStyle="rgba(240,200,110,.9)";x.lineWidth=6;x.strokeRect(30,30,W-60,H-60);
  x.save();x.translate(80,90);x.scale(3.6,3.6);var P=new Path2D("M20 2 36 8v14c0 11-7 19-16 22C11 41 4 33 4 22V8z");x.fillStyle="rgba(240,200,110,.15)";x.fill(P);x.strokeStyle="#f0c86e";x.lineWidth=2.2;x.stroke(P);
  x.beginPath();x.moveTo(20,15);x.lineTo(12.5,28);x.moveTo(20,15);x.lineTo(27.5,28);x.moveTo(12.5,28);x.lineTo(27.5,28);x.lineWidth=1.4;x.stroke();
  [["#f0c86e",20,15],["#35d0c0",12.5,28],["#ffb86b",27.5,28]].forEach(function(d){x.beginPath();x.arc(d[1],d[2],2.8,0,7);x.fillStyle=d[0];x.fill()});x.restore();
  var SERIF="Fraunces, Georgia, 'Times New Roman', serif",SANS="'Familjen Grotesk', 'Segoe UI', Arial, sans-serif",MONO="'JetBrains Mono', Consolas, monospace";
  x.fillStyle="#f4f1e8";x.font="700 44px "+SANS;x.fillText("PROOFPATH",250,125);
  x.fillStyle="#f0c86e";x.font="600 26px "+MONO;x.fillText("AKADEMİ KİMLİĞİ",250,170);
  x.fillStyle="#fff";x.font="600 150px "+SERIF;x.fillText(MYN()||"Öğrenci",80,420);
  x.fillStyle="#35d0c0";x.font="700 60px "+SANS;x.fillText(s.rank,84,505);
  var cells=[[s.xp,"XP"],[s.streak,"GÜN SERİ"],[s.ccna+"/"+s.ccnaT,s.ge?"İNG. BASAMAK":s.gn.toLocaleUpperCase("tr")+" BİNA"],[s.ge?"–":s.eng+"/"+s.engT,s.ge?"SEVİYE":"İNG. BASAMAK"],[s.tickets,"TICKET"],[s.csat==null?"–":s.csat,"MEMNUNİYET"]];
  cells.forEach(function(cl,i){var cx=80+(i%3)*300,cy=600+Math.floor(i/3)*200;x.fillStyle="rgba(255,255,255,.07)";x.fillRect(cx,cy,270,170);x.strokeStyle="rgba(255,255,255,.14)";x.lineWidth=2;x.strokeRect(cx,cy,270,170);
    x.fillStyle="#fff";x.font="700 70px "+SERIF;x.fillText(String(cl[0]),cx+22,cy+95);x.fillStyle="rgba(244,241,232,.7)";x.font="600 22px "+MONO;x.fillText(cl[1],cx+22,cy+140)});
  var n=s.bars.length||1,bw=Math.floor((W-160)/n)-4;
  s.bars.forEach(function(v,i){var bh=40+v*190,bx=80+i*(bw+4);x.fillStyle="rgba(53,208,192,"+(.25+v*.75)+")";x.fillRect(bx,1200-bh,bw,bh);if(v>=1){x.fillStyle="rgba(255,220,140,.9)";for(var yy=1200-bh+12;yy<1190;yy+=26)x.fillRect(bx+bw/2-3,yy,6,8)}});
  x.fillStyle="rgba(244,241,232,.75)";x.font="500 24px "+MONO;x.fillText(s.term,80,1270);x.textAlign="right";x.fillText(idSerial(),W-80,1270);x.textAlign="left";
  return new Promise(function(res,rej){c.toBlob(function(b){b?res(b):rej(new Error("png"))},"image/png")});
}
function saveIdCard(){
  var IC=S.idc;if(!S.dl||IC.busy)return;IC.busy=true;IC.msg="";draw();
  Promise.resolve(document.fonts&&document.fonts.ready).catch(function(){}).then(idPng).then(function(b){return S.dl.save({filename:"proofpath-kimlik.png",data:b})})
    .then(function(){IC.msg="Kaydedildi."}).catch(function(e){IC.msg=e&&e.code==="declined"?"Kaydetmeyi reddettin.":"Kaydedilemedi, tekrar dene."}).then(function(){IC.busy=false;draw()});
}

/* ---- v17: Adil Lig (katsayılar, arkadaşlar, profil) ---- */

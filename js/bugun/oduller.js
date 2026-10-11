"use strict";
/* ---- Ödüller ---- */
function promoPanel(){
  var R=rankInfo(),n=R.nxt;
  var warn=R.demoted?h("div",{class:"alert warn"},h("b",null,"Kıdem kaybı: "),"30 günden uzun ara verdin, rütben bir kademe düştü. Düzenli çalışınca geri dönersin; XP'in silinmez."):
    R.prob!=null?h("div",{class:"alert warn"},h("b",null,"Deneme süresi uyarısı: "),"Stajyer olarak son 14 günde "+R.prob+" gün çalıştın. Şirkette kalmak için en az 5 gün gerekir."):
    R.warn?h("div",{class:"alert warn"},h("b",null,"Kıdemin eriyor: "),R.gap+" gündür yoksun. 30 güne ulaşırsa bir kademe düşersin."):null;
  if(!n)return h("div",{class:"panel"},h("div",{class:"label"},"Terfi dosyası"),h("h2",null,R.cur.n),h("div",{class:"small mute"},"En üst kademedesin. Kıdemini korumak için düzenli çalışmaya devam et."),warn);
  function row(t,have,need,ok,txt){return h("div",{class:"cov-r"},h("span",{class:"cov-c"},ok?"✓":""),h("div",{style:"min-width:0;flex:1"},h("div",null,t),h("div",{class:"small mute"},txt),have!=null?h("div",{class:"xpbar"},h("i",{style:"width:"+Math.max(2,Math.min(100,have/need*100))+"%"})):null))}
  var rows=[row(n.xp+" XP",R.xp,n.xp,R.xp>=n.xp,R.xp+" / "+n.xp),row(n.days+" aktif gün",R.ad,n.days,R.ad>=n.days,R.ad+" / "+n.days+" gün (çalıştığın günler)")];
  gateList(n.gate).forEach(function(x){rows.push(row(x.t,null,0,x.ok,"şimdi: "+x.have))});
  var manual=(S.profile.gates||{})[n.gate]===true;
  return h("div",{class:"panel"},h("div",{class:"label"},"Terfi dosyası"),h("h2",null,R.cur.n+" → "+n.n),
    h("div",{class:"small mute"},"Gerçek hayattaki gibi: terfi tek sınavla gelmez. Deneyim (gün), bilgi (soru doğruluğu), iş (ders ve proje) birlikte aranır. Stajyer deneme süresinde, uzmanlık aylar sürer."),
    warn,h("div",{style:"display:grid;gap:8px;margin-top:8px"},rows),
    manual?h("div",{class:"small mute",style:"margin-top:6px"},"Koçun bu kapıyı açtı; XP ve gün şartları yine aranır."):null);
}
function renderRewards(){var a=renderRewards0();return [renderIdCard(),promoPanel()].concat(a)}
function renderRewards0(){
  var xp=totalXp(),R=S.rewards.slice().sort(function(a,b){return num(a.cost)-num(b.cost)}),out=[];
  var list=h("div",{class:"panel"},h("h2",null,"Ödüller"),
    h("div",{class:"small mute"},"XP harcanmaz, eşik geçilince kilit açılır. Ödülleri sen belirlersin; ödül gerçek hayatta alınır, burada sadece 'aldım' diye işaretlenir. Örnek satırları silip kendininkileri ekleyebilirsin."),
    R.length?R.map(function(r){
      var unlocked=xp>=num(r.cost),claimed=r.claimed===true;
      return h("div",{class:"rew"},h("div",null,h("div",null,r.name,r.example?h("span",{class:"pill",style:"margin-left:8px"},"örnek"):null),
        h("div",{class:"small mute mono"},r.cost+" XP"+(r.requires?" · "+r.requires:""))),
        h("div",{style:"display:flex;gap:6px;align-items:center"},
          claimed?h("span",{class:"pill ok"},"alındı"):
          h("button",{class:"btn"+(unlocked?"":" ghost"),disabled:!unlocked||!S.canWrite,onclick:function(){claim(r)}},unlocked?"Aldım":"Kilitli · "+(num(r.cost)-xp)+" XP"),
          r.example&&!claimed?h("button",{class:"btn ghost",onclick:function(){S.db&&S.db.doc("rewards/"+r.id).delete()}},"Sil"):null));
    }):h("div",{class:"empty"},"Henüz ödül yok. Aşağıdan ilk ödülünü ekle."));
  out.push(list);
  var f=h("form",{id:"rewardForm"},h("div",{class:"row"},
    h("div",{class:"field",style:"flex:2 1 200px"},h("label",{for:"w-name",class:"label"},"Ödül"),h("input",{id:"w-name",type:"text",maxlength:80,required:true})),
    h("div",{class:"field"},h("label",{for:"w-cost",class:"label"},"Eşik (XP)"),h("input",{id:"w-cost",type:"number",min:50,max:20000,step:50,value:300,required:true}))),
    h("div",{class:"row",style:"align-items:center"},h("button",{class:"btn",type:"submit",disabled:!S.canWrite},"Ödül ekle"),h("span",{id:"w-msg",class:"small mute"})));
  f.addEventListener("submit",function(ev){
    ev.preventDefault();
    var n=f.querySelector("#w-name").value.trim(),c=+f.querySelector("#w-cost").value;
    if(!n||!S.db)return;
    S.db.collection("rewards").add({name:n,cost:c,claimed:false}).then(function(){f.reset();f.querySelector("#w-msg").textContent="Eklendi."},function(){f.querySelector("#w-msg").textContent="Eklenemedi."});
  });
  out.push(h("div",{class:"panel"},h("h3",null,"Kendi ödülünü ekle"),f));
  var B=S.badges.slice().sort(function(a,b){return String(b.date).localeCompare(String(a.date))});
  out.push(h("div",{class:"panel"},h("h3",null,"Rozetler"),
    B.length?h("div",{class:"words"},B.map(function(b){return h("div",{class:"badge"},h("b",null,b.name),h("span",{class:"small mute"},b.desc||""),h("span",{class:"mono small mute"},short(b.date)))})):
    h("div",{class:"empty"},"Rozetler koç tarafından verilir: ilk kapıyı geçmek, 7 günlük seri, ilk Kriz Gecesi galibiyeti, ilk %80 deneme.")));
  return out;
}
function claim(r){
  if(!S.db)return;
  S.db.doc("rewards/"+r.id).update({claimed:true,claimedAt:today()});
}

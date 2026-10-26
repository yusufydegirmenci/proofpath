"use strict";
/* ALAN: Okuma sekmesi (oku), çocuk öyküleri, dokun-öğren. NE YAPAR: STORIES listesindeki İngilizce öyküleri cümle cümle Türkçe karşılığıyla gösterir, kelimeye dokununca kelime sayfası açıp kelime bankasına kaydetmeyi sağlar (renderReader, wordSheet, saveWord).
   SORUN OLURSA: Durum S.rd ({id, fs, tr, show, pop...}); wordSheet draw() içinde (cizim-yardim.js) tab=oku iken eklenir; kelime/okuma kaydı S.db ve S.canWrite ister; seslendirme speak() tarayıcı sesine bağlı.
   YENİ ÖZELLİK: Yeni öykü STORIES dizisine eklenir; özel test yok, tests/faz_ses.js ve tests/run-all.js çalıştırılır. */
/* ---- Okuma köşesi: çocuk öyküleri, dokun-öğren ---- */
var STORIES=[
{id:"fox-moon",title:"The Little Fox and the Moon",tr:"Küçük Tilki ve Ay",level:"A1",
 key:{forest:"orman",moon:"ay",hill:"tepe",tall:"uzun, yüksek",far:"uzak",owl:"baykuş",lake:"göl",watched:"seyretti",sleepy:"uykulu"},
 s:[["A little fox lived in a green forest.","Küçük bir tilki yeşil bir ormanda yaşıyordu."],
 ["One night, he saw a big yellow moon.","Bir gece büyük, sarı bir ay gördü."],
 ["\"I want the moon,\" said the fox.","\"Ay'ı istiyorum,\" dedi tilki."],
 ["He ran up a tall hill, but the moon was still far away.","Uzun bir tepeye koştu ama ay hâlâ çok uzaktaydı."],
 ["He asked an owl, \"Can you help me?\"","Bir baykuşa sordu: \"Bana yardım edebilir misin?\""],
 ["The owl smiled. \"Look in the lake,\" she said.","Baykuş gülümsedi. \"Göle bak,\" dedi."],
 ["The fox looked in the lake and saw the moon in the water.","Tilki göle baktı ve suyun içinde ayı gördü."],
 ["\"Now I have the moon!\" he said happily.","\"Artık ayım var!\" dedi mutlu bir şekilde."],
 ["The fox sat by the lake and watched the moon until he was sleepy.","Tilki gölün kenarına oturdu ve uykusu gelene kadar ayı seyretti."]],
 q:[["Who helped the fox?","The owl."],["Where did the fox see the moon at last?","In the lake (in the water)."]]},
{id:"red-kite",title:"Ali's Red Kite",tr:"Ali'nin Kırmızı Uçurtması",level:"A1",
 key:{kite:"uçurtma",wind:"rüzgâr",strong:"güçlü",suddenly:"birden",string:"ip",broke:"koptu",river:"nehir",follow:"takip etmek",bridge:"köprü",tightly:"sıkıca"},
 s:[["Ali had a new red kite.","Ali'nin yeni, kırmızı bir uçurtması vardı."],
 ["On Saturday, he went to the park with his sister, Mina.","Cumartesi günü kız kardeşi Mina ile parka gitti."],
 ["The wind was strong and the kite flew high.","Rüzgâr güçlüydü ve uçurtma yükseğe uçtu."],
 ["Suddenly, the string broke.","Birden ip koptu."],
 ["The kite flew over the trees and the river.","Uçurtma ağaçların ve nehrin üzerinden uçtu."],
 ["Ali was sad. \"My kite is gone,\" he said.","Ali üzüldü. \"Uçurtmam gitti,\" dedi."],
 ["Mina said, \"Let's follow it!\"","Mina, \"Hadi onu takip edelim!\" dedi."],
 ["They ran across the bridge and found the kite in a small tree.","Köprüden karşıya koştular ve uçurtmayı küçük bir ağaçta buldular."],
 ["A kind man helped them take it down.","Nazik bir adam, onu indirmelerine yardım etti."],
 ["\"Thank you!\" said Ali. He held the string very tightly.","\"Teşekkürler!\" dedi Ali. İpi çok sıkı tuttu."]],
 q:[["Who went to the park with Ali?","His sister, Mina."],["Where did they find the kite?","In a small tree."]]},
{id:"tired-bear",title:"The Tired Bear",tr:"Yorgun Ayı",level:"A1",
 key:{tired:"yorgun",noisy:"gürültülü",loudly:"yüksek sesle",frogs:"kurbağalar",quiet:"sessiz",sorry:"üzgün, özür dileyen",moved:"taşındı",honey:"bal",brought:"getirdi"},
 s:[["Big Bear was very tired.","Koca Ayı çok yorgundu."],
 ["He wanted to sleep, but it was noisy in the forest.","Uyumak istiyordu ama ormanda gürültü vardı."],
 ["The birds sang loudly.","Kuşlar yüksek sesle ötüyordu."],
 ["The frogs jumped and made a lot of noise.","Kurbağalar zıpladı ve çok gürültü yaptı."],
 ["\"Please, be quiet,\" said Big Bear.","\"Lütfen, sessiz olun,\" dedi Koca Ayı."],
 ["The animals said they were sorry.","Hayvanlar özür dilediklerini söylediler."],
 ["They moved to the other side of the river.","Nehrin diğer tarafına taşındılar."],
 ["Now the forest was quiet.","Şimdi orman sessizdi."],
 ["Big Bear closed his eyes and slept for a long time.","Koca Ayı gözlerini kapadı ve uzun süre uyudu."],
 ["In the morning, the animals brought him honey.","Sabah hayvanlar ona bal getirdi."]],
 q:[["Why couldn't Big Bear sleep?","Because the forest was noisy."],["What did the animals bring in the morning?","Honey."]]},
{id:"clever-crow",title:"The Clever Crow",tr:"Zeki Karga",level:"A2",
 key:{thirsty:"susamış",streams:"dereler",jar:"kavanoz",beak:"gaga",heavy:"ağır",idea:"fikir",stones:"taşlar",dropped:"attı, düşürdü",slowly:"yavaşça",clever:"zeki"},
 s:[["It was a very hot summer, and Crow was thirsty.","Çok sıcak bir yazdı ve Karga susamıştı."],
 ["She looked everywhere for water, but the streams were dry.","Her yerde su aradı ama dereler kurumuştu."],
 ["At last, she found a tall jar under a tree.","Sonunda bir ağacın altında uzun bir kavanoz buldu."],
 ["There was a little water at the bottom, but her beak was too short.","Dibinde biraz su vardı ama gagası çok kısaydı."],
 ["She tried to tip the jar, but it was too heavy.","Kavanozu devirmeye çalıştı ama çok ağırdı."],
 ["Then she had an idea.","Sonra bir fikri oldu."],
 ["She picked up small stones and dropped them into the jar, one by one.","Küçük taşlar topladı ve onları tek tek kavanoza attı."],
 ["Slowly, the water came up to the top.","Yavaş yavaş su yukarı doğru çıktı."],
 ["Crow drank until she was no longer thirsty.","Karga artık susuz kalmayana kadar içti."],
 ["\"Being clever is better than being strong,\" she thought.","\"Akıllı olmak güçlü olmaktan daha iyidir,\" diye düşündü."]],
 q:[["Why couldn't Crow drink at first?","Her beak was too short for the little water."],["How did she get the water up?","She dropped small stones into the jar."]]},
{id:"rainy-picnic",title:"The Rainy Day Picnic",tr:"Yağmurlu Gün Pikniği",level:"A2",
 key:{picnic:"piknik",planned:"planladı",packed:"paketledi, hazırladı",ruined:"mahvolmuş",blanket:"battaniye",spread:"serdi",joined:"katıldı",cookies:"kurabiyeler",rain:"yağmur"},
 s:[["Emma and her brother Tom planned a picnic for Sunday.","Emma ve erkek kardeşi Tom pazar günü için bir piknik planladı."],
 ["They made sandwiches and packed juice and apples.","Sandviç yaptılar ve meyve suyu ile elmaları hazırladılar."],
 ["But in the morning, it started to rain.","Ama sabah yağmur yağmaya başladı."],
 ["\"Our picnic is ruined,\" said Tom.","\"Pikniğimiz mahvoldu,\" dedi Tom."],
 ["Emma thought for a moment. \"We can have it inside,\" she said.","Emma bir an düşündü. \"Evin içinde yapabiliriz,\" dedi."],
 ["They spread a blanket on the living room floor.","Oturma odasının zeminine bir battaniye serdiler."],
 ["They ate their sandwiches and listened to the rain on the window.","Sandviçlerini yediler ve penceredeki yağmuru dinlediler."],
 ["Their mother joined them with a plate of cookies.","Anneleri bir tabak kurabiyeyle onlara katıldı."],
 ["\"This is the best picnic ever,\" said Tom, smiling.","\"Bu şimdiye kadarki en iyi piknik,\" dedi Tom gülümseyerek."]],
 q:[["Why did they have the picnic inside?","Because it was raining."],["Who joined them with cookies?","Their mother."]]},
{id:"lost-robot",title:"The Lost Robot",tr:"Kayıp Robot",level:"A2",
 key:{robot:"robot",built:"yaptı, inşa etti",carry:"taşımak",gate:"kapı (bahçe kapısı)",lost:"kaybolmuş",searched:"aradı",remembered:"hatırladı",tiny:"minicik",carefully:"dikkatlice",following:"takip eden"},
 s:[["Mia built a small robot called Bolt.","Mia, Bolt adında küçük bir robot yaptı."],
 ["Bolt could walk, talk, and carry small things.","Bolt yürüyebiliyor, konuşabiliyor ve küçük şeyleri taşıyabiliyordu."],
 ["One day, Bolt walked out of the garden gate and got lost.","Bir gün Bolt bahçe kapısından çıktı ve kayboldu."],
 ["Mia searched the street, but she could not find him.","Mia sokağı aradı ama onu bulamadı."],
 ["She remembered that Bolt had a tiny light on his head.","Bolt'un kafasında minicik bir ışık olduğunu hatırladı."],
 ["That night, she went outside and looked carefully.","O gece dışarı çıktı ve dikkatlice baktı."],
 ["Far away, she saw a small blue light moving between the houses.","Uzakta, evlerin arasında hareket eden küçük mavi bir ışık gördü."],
 ["It was Bolt! He was following a cat.","Bolt'tu! Bir kediyi takip ediyordu."],
 ["\"Come home, Bolt,\" said Mia. \"It's dinner time.\"","\"Eve gel Bolt,\" dedi Mia. \"Yemek vakti.\""],
 ["Bolt turned around and said, \"I am sorry. I only wanted to say hello.\"","Bolt arkasını döndü ve \"Üzgünüm. Ben sadece merhaba demek istemiştim,\" dedi."]],
 q:[["What helped Mia find Bolt?","The tiny light on his head."],["What was Bolt following?","A cat."]]}
];
S.rd={id:null,fs:19,tr:false,show:{},pop:null,qrev:{},notes:{},msg:""};
function wordsOf(st){var n=0;st.s.forEach(function(x){n+=x[0].split(/\s+/).length});return n}
function readingOf(id){return S.reading.filter(function(r){return r.id===id})[0]||null}
function speak(t){try{if(!window.speechSynthesis)return;window.speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(t);u.lang="en-US";u.rate=.85;window.speechSynthesis.speak(u)}catch(e){}}
function wordKey(w){return String(w).toLowerCase().replace(/[’]/g,"'").replace(/^[^a-z']+|[^a-z']+$/g,"")}
function saveWord(p){
  if(!S.db||!S.canWrite||!p||!p.tr)return;
  var id=wordKey(p.w).replace(/[^a-z]/g,"_").slice(0,40)||"w";
  S.db.doc("words/"+id).set({w:wordKey(p.w),tr:String(p.tr).slice(0,120),story:S.rd.id||"",sentence:String(p.sentence||"").slice(0,300),date:today(),ts:new Date().toISOString()}).catch(function(){});
  p.saved=true;draw();
}
function openWord(st,raw,sentence){
  var w=wordKey(raw);if(!w)return;
  var p={w:w,sentence:sentence,tr:st.key[w]||null,busy:false,err:null,saved:S.words.some(function(x){return x.w===w})};
  S.rd.pop=p;
  if(!p.tr&&S.sample){
    p.busy=true;
    var q="Cümle: \""+sentence+"\"\nKelime: \""+w+"\"\nBu kelimenin bu cümledeki Türkçe karşılığını yaz. En çok 8 kelime, başka açıklama ekleme.";
    S.sample(q,{cache:true}).then(function(r){p.tr=((r&&r.text)||"").trim().replace(/^["'\s]+|["'\s]+$/g,"").slice(0,100)}).catch(function(e){p.err=sampleErr(e)}).then(function(){p.busy=false;draw()});
  }
  draw();
}
function wordSheet(st){
  var p=S.rd.pop;if(!p)return null;
  return h("div",{class:"wsheet",role:"dialog","aria-label":"Kelime anlamı"},
    h("div",{class:"ws-top"},h("b",{class:"ws-w"},p.w),h("button",{class:"btn ghost",type:"button",onclick:function(){speak(p.w)}},"Dinle"),h("button",{class:"btn ghost",type:"button","aria-label":"Kapat",onclick:function(){S.rd.pop=null;draw()}},"Kapat")),
    h("div",{class:"ws-tr"},p.busy?"Anlamı getiriliyor...":p.tr?p.tr:(p.err||"Bu kelime listede yok. Canlı çeviri bu görünümde kullanılamıyor.")),
    p.tr?h("button",{class:"btn"+(p.saved?" ghost":""),type:"button",disabled:p.saved||!S.db||!S.canWrite,onclick:function(){saveWord(p)}},p.saved?"Defterinde":"Kelime defterime ekle"):null);
}
function sentenceEl(st,i){
  var x=st.s[i],en=x[0],tr=x[1],on=S.rd.tr||S.rd.show[st.id+":"+i];
  var toks=en.split(" ").map(function(t,k){
    var m=t.match(/^([^A-Za-z']*)(.*?)([^A-Za-z']*)$/),core=m?m[2]:t,key=wordKey(core)&&st.key[wordKey(core)];
    return [m?m[1]:"",h("span",{class:"w"+(key?" key":""),role:"button",tabindex:"0",onclick:function(){openWord(st,core,en)},onkeydown:function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();openWord(st,core,en)}}},core),m?m[3]:"",k<en.split(" ").length-1?" ":""];
  });
  return h("div",{class:"sent"},
    h("div",{class:"sent-tools"},h("button",{type:"button",class:"sn",title:"Çeviriyi göster/gizle","aria-label":"Cümle "+(i+1)+" çeviri",onclick:function(){S.rd.show[st.id+":"+i]=!S.rd.show[st.id+":"+i];draw()}},String(i+1)),
      h("button",{type:"button",class:"sn spk",title:"Dinle","aria-label":"Cümleyi dinle",onclick:function(){speak(en)}},"▶")),
    h("div",{class:"sent-b"},h("div",{class:"sent-en"},[].concat.apply([],toks)),on?h("div",{class:"sent-tr"},tr):null));
}
function renderReader(){
  var R=S.rd,out=[],st=STORIES.filter(function(x){return x.id===R.id})[0];
  if(!st){
    var done=STORIES.filter(function(x){var r=readingOf(x.id);return r&&r.done}).length;
    out.push(h("div",{class:"panel"},h("h2",null,"Okuma köşesi"),
      h("div",{class:"small mute"},"Kısa, sade çocuk öyküleri. Bir kelimeye dokun, anlamını gör; önemli kelimeler altın renkli. Cümle numarasına dokunursan Türkçesi açılır, ok işaretine dokunursan okunuşunu dinlersin. "+done+" / "+STORIES.length+" öykü bitti.")));
    out.push(h("div",{class:"grid2"},STORIES.map(function(x){
      var r=readingOf(x.id),mins=Math.max(1,Math.round(wordsOf(x)/90));
      return h("button",{type:"button",class:"panel scard"+(r&&r.done?" done":""),onclick:function(){R.id=x.id;R.pop=null;window.scrollTo(0,0);draw()}},
        h("div",{style:"display:flex;justify-content:space-between;gap:8px;align-items:center"},h("span",{class:"pill eng"},x.level),r&&r.done?h("span",{class:"pill ok"},"bitti"):h("span",{class:"mono small mute"},"≈ "+mins+" dk")),
        h("h3",null,x.title),h("div",{class:"small mute"},x.tr+" · "+wordsOf(x)+" kelime"));
    })));
    out.push(wordBank());
    return out;
  }
  var r=readingOf(st.id),mins=Math.max(1,Math.round(wordsOf(st)/90));
  out.push(h("div",{class:"panel"},
    h("div",{style:"display:flex;gap:8px;align-items:center;flex-wrap:wrap"},h("button",{class:"btn ghost",type:"button",onclick:function(){R.id=null;R.pop=null;draw()}},"Tüm öyküler"),h("span",{class:"pill eng"},st.level),h("span",{class:"pill"},"≈ "+mins+" dk")),
    h("h2",{style:"margin-top:10px"},st.title),h("div",{class:"small mute"},st.tr),
    h("div",{class:"rd-tools"},
      h("button",{class:"btn ghost",type:"button","aria-pressed":R.tr?"true":"false",onclick:function(){R.tr=!R.tr;draw()}},R.tr?"Türkçeyi gizle":"Türkçeyi göster"),
      h("button",{class:"btn ghost",type:"button","aria-label":"Yazıyı küçült",onclick:function(){R.fs=Math.max(16,R.fs-2);draw()}},"A−"),
      h("button",{class:"btn ghost",type:"button","aria-label":"Yazıyı büyüt",onclick:function(){R.fs=Math.min(28,R.fs+2);draw()}},"A+"),
      h("button",{class:"btn ghost",type:"button",onclick:function(){speak(st.s.map(function(x){return x[0]}).join(" "))}},"Hepsini dinle"))));
  out.push(h("div",{class:"panel rd",style:"--rfs:"+R.fs+"px"},st.s.map(function(_,i){return sentenceEl(st,i)})));
  out.push(h("div",{class:"panel"},h("h2",null,"Önemli kelimeler"),h("div",{class:"small mute"},"Metinde altın renkle işaretli. Dokununca defterine ekleyebilirsin."),
    h("div",{class:"chips"},Object.keys(st.key).map(function(w){
      return h("button",{type:"button",class:"chip kchip",onclick:function(){openWord(st,w,(st.s.filter(function(x){return x[0].toLowerCase().indexOf(w)>=0})[0]||[w])[0])}},h("b",null,w),h("span",{class:"small mute"},st.key[w]))}))));
  out.push(h("div",{class:"panel"},h("h2",null,"Anladın mı?"),
    st.q.map(function(q,i){var k=st.id+":q"+i;return h("div",{class:"lsn",style:"border-top:1px solid var(--line);padding-top:10px"},h("div",null,h("span",{class:"mono mute"},(i+1)+". "),q[0]),
      h("button",{class:"btn ghost",type:"button",onclick:function(){if(!R.qrev[k])setProg({oku_n:num(prog().oku_n)+1});R.qrev[k]=!R.qrev[k];draw()}},R.qrev[k]?"Gizle":"Cevabı göster"),R.qrev[k]?h("div",{class:"fb"},q[1]):null)})));
  var ta=h("textarea",{id:"rd-note","aria-label":"Okuma notların",maxlength:900,placeholder:"Notların: anlamadığın yer, sevdiğin cümle, koçuna sorun",oninput:function(e){R.notes[st.id]=e.target.value}});
  ta.value=R.notes[st.id]!=null?R.notes[st.id]:(r&&r.notes)||"";
  var msg=h("span",{class:"small mute"},R.msg||"");
  out.push(h("div",{class:"panel"},h("h2",null,"Notlarım"),ta,
    h("div",{style:"display:flex;gap:8px;flex-wrap:wrap;align-items:center"},
      h("button",{class:"btn",type:"button",disabled:!S.db||!S.canWrite,onclick:function(){
        S.db.doc("reading/"+st.id).set({notes:ta.value.slice(0,900),done:!!(r&&r.done),date:(r&&r.date)||today(),title:st.title,ts:new Date().toISOString()}).then(function(){R.msg="Kaydedildi.";msg.textContent=R.msg},function(){msg.textContent="Kaydedilemedi."})}},"Notu kaydet"),
      h("button",{class:"btn ghost",type:"button",disabled:!S.db||!S.canWrite,onclick:function(){
        var v=ta.value.trim();if(!v){msg.textContent="Önce bir not yaz.";return}
        S.db.collection("inbox").add({track:"eng",lessonId:"story-"+st.id,date:today(),text:("Okuma notu ("+st.title+"): "+v).slice(0,800),status:"new",ts:new Date().toISOString()}).then(function(){msg.textContent="Koça iletildi."},function(){msg.textContent="İletilemedi."})}},"Koça ilet"),msg)));
  out.push(h("div",{class:"panel"},h("div",{style:"display:flex;gap:8px;align-items:center;flex-wrap:wrap"},
    h("button",{class:"btn"+(r&&r.done?" ghost":""),type:"button",disabled:!S.db||!S.canWrite,onclick:function(){
      var was=!!(r&&r.done);
      S.db.doc("reading/"+st.id).set({notes:(R.notes[st.id]!=null?R.notes[st.id]:(r&&r.notes)||"").slice(0,900),done:!was,date:today(),title:st.title,ts:new Date().toISOString()}).catch(function(){});
      if(!was){setProg({story_read:num(prog().story_read)+1});burst()}}},r&&r.done?"Bitti (geri al)":"Öyküyü bitirdim"),
    h("span",{class:"small mute"},"İşaretlediğinde günlük ilerlemene 1 öykü eklenir; İngilizce koçu bunu görür."))));
  return out;
}
function wordBank(){
  var W=S.words.slice().sort(function(a,b){return String(b.ts).localeCompare(String(a.ts))});
  return h("div",{class:"panel"},h("div",{style:"display:flex;justify-content:space-between;gap:8px;align-items:center;flex-wrap:wrap"},h("h2",null,"Kelime defterim"),
      h("button",{class:"btn ghost",type:"button","aria-pressed":S.rd.hide?"true":"false",onclick:function(){S.rd.hide=!S.rd.hide;draw()}},S.rd.hide?"Anlamları göster":"Kendini sına (anlamları gizle)")),
    W.length?h("div",{class:"wbank"},W.slice(0,60).map(function(w){
      var on=!S.rd.hide||S.rd.open&&S.rd.open[w.id];
      return h("div",{class:"wrow"},h("b",null,w.w),h("span",{class:"mute"},on?w.tr:"•••"),
        h("button",{type:"button",class:"btn ghost",title:"Dinle",onclick:function(){speak(w.w)}},"▶"),
        S.rd.hide?h("button",{type:"button",class:"btn ghost",onclick:function(){S.rd.open=S.rd.open||{};S.rd.open[w.id]=!S.rd.open[w.id];draw()}},"Göster"):null)})):
      h("div",{class:"empty"},"Defter boş. Bir öyküde kelimeye dokun, \"Kelime defterime ekle\" de."));
}
S.reading=[];S.words=[];

const {chromium}=require('playwright');
const INIT=()=>{
 const store={};const subs=[];
 const notify=()=>subs.forEach(f=>f());
 function coll(n){return {
  onSnapshot(cb){const f=()=>cb({docs:Object.entries(store[n]||{}).map(([id,d])=>({id,data:()=>d}))});subs.push(f);f();return()=>{}},
  orderBy(){return this},limit(){return this},
  add(d){store[n]=store[n]||{};store[n]['a'+Math.random()]=d;notify();return Promise.resolve()}}}
 function doc(path){const pp=path.split('/');const i=pp.pop();const c=pp.join('/');return {
  onSnapshot(cb){const f=()=>{const d=(store[c]||{})[i];cb({exists:!!d,data:()=>d,id:i})};subs.push(f);f();return()=>{}},
  set(d){store[c]=store[c]||{};store[c][i]=d;notify();return Promise.resolve()},
  update(d){store[c]=store[c]||{};store[c][i]=Object.assign(store[c][i]||{},d);notify();return Promise.resolve()},
  delete(){delete (store[c]||{})[i];notify();return Promise.resolve()}}}
 const AREA=o=>o<=9?'Temel Mahallesi':o<=18?'IP Mahallesi':'Güvenlik Mahallesi';
 const t=(id,tr,name,st,ord)=>({track:tr,area:AREA(ord),domain:'NF',areaOrder:1,order:ord,name,analogy:'su-tesisat',status:st,mastery:0,lastReview:null});
 store.topics={};
 for(let k=1;k<=27;k++){const st=k<9?'built':k<11?'building':k===11?'next':'locked';const o=t('c'+k,'ccna','Konu '+k,st,k);o.mastery=st==='built'?88:st==='building'?55-k:0;o.lastReview=st==='locked'?null:(k===5?'2026-09-20':'2026-10-06');store.topics['c'+k]=o;}
 for(let k=1;k<=13;k++){const st=k<3?'built':k<5?'building':k===5?'next':'locked';const o=t('e'+k,'eng','Kalip '+k,st,k);o.mastery=st==='built'?85:st==='building'?40:0;o.lastReview=st==='locked'?null:'2026-10-06';store.topics['e'+k]=o;}
 store.days={'2026-10-05-ccna':{date:'2026-10-05',track:'ccna',minutes:40,xp:120},'2026-10-06-eng':{date:'2026-10-06',track:'eng',minutes:30,xp:90}};
 store.profile={main:{notes:{ccna:'selam'}}};
 const q=[{kind:'mcq',situation:'Muhasebe yazıcıyı göremiyor',situation_tr:'x',question:'Önce ne kontrol edersin?',options:['A','B','C'],correct:1,explanation:'e',analogy:'a',why:'w'},
 {kind:'open',situation:'s',question:'Anlat',model:'model cevap',explanation:'e'}];
 store.lessons={'2026-10-07-ccna':{id:'x',date:'2026-10-07',track:'ccna',kind:'yeni konu',title:'Modem ile router farkı',hook:'Modem getirir, router dağıtır.',blocks:[{t:'h',text:'Neden öğreniyoruz'},{t:'box',h:'Talep',text:'"İnternet yok" diyorlar.'},{t:'p',text:'Modem binaya gelen su...'},{t:'steps',h:'Çözüm',items:['Kabloya bak','Işıkları kontrol et']},{t:'cmd',text:'ipconfig /all\nping 8.8.8.8'},{t:'warn',h:'Tuzak',text:'Benzetme burada bozulur'}],quiz:[{q:'Router ne yapar?',options:['a','b'],answer:'B',why:'dağıtır'}],interview:[{q:'Modem nedir?',a:'Gelen interneti alan cihaz.'}],vocab:[{term:'gateway',tr:'ağ geçidi',ex:'The gateway is down.'}],homework:'Sınıf sekmesinde 5 soru',resources:[{title:'Jeremy IT Lab',url:'https://www.youtube.com/@JeremysITLab',type:'video',why:'sıfırdan anlatır',length:'20 dk',level:'başlangıç',lang:'EN'},{title:'Cisco doc',url:'https://www.cisco.com',type:'doc',why:'resmi'}],sources:[{title:'Cisco',url:'https://www.cisco.com'}]},
'2026-10-07-eng':{date:'2026-10-07',track:'eng',kind:'yeni kalıp',title:'Can you ...?',hook:'-abil = can',blocks:[{t:'split',tr:'Kendinizi tanıtabilir misiniz?',parts:[{tr:'tanıt',q:'Ne?',en:'introduce'},{tr:'-abil',q:'Ne yapabilir?',en:'can'},{tr:'-siniz',q:'Kim?',en:'you'}],result:'Can you introduce yourself?'}],story:{title:'Bölüm 1',text:'Ayşe geldi.',question:'What does Ayşe need?'}}};
 window.__store=store;store.league={
 uF1:{since:'2026-09-01',cfg:{target:5,mins:30,start:'orta'},d:{'2026-10-08':{ok:4,tot:5,w:8,wok:6.5,pts:65,a:[0,0,0,0,0],lv:2},'2026-10-07':{ok:3,tot:5,w:8,wok:5,pts:50},'2026-10-06':{ok:4,tot:5,w:8,wok:6,pts:60},'2026-10-05':{ok:3,tot:5,w:8,wok:5,pts:50},'2026-10-04':{ok:3,tot:5,w:8,wok:5,pts:50},'2026-09-29':{ok:3,tot:5,w:8,wok:5,pts:40}},acad:{rank:'Stajyer',xp:300,streak:2,ccna:3,eng:1}},
 uNew:{since:'2026-10-08',cfg:{target:3,mins:15,start:'yeni'},d:{'2026-10-08':{ok:5,tot:5,w:5,wok:5,pts:55,a:[0,0,0,0,0],lv:0}}},
 uF2:{since:'2026-09-20',d:{'2026-10-06':{ok:2,tot:5,w:5,wok:2,pts:20}}},bad:null};
 store.tickets={'2026-10-08-1':{date:'2026-10-08',level:1,subject:'Printer not working',from:{name:'Aylin',role:'Sales',country:'TR'},body:'My printer is not working. Can you help?',goal:'Kabul et ve yardım edeceğini söyle',keywords:[{w:'help',tr:'yardım'},{w:'check',tr:'kontrol etmek'}],skeleton:'Yes, I can ___ you.',model:'Yes, I can help you. I will check it now.',category:'printer'},
  '2026-10-08-2':{date:'2026-10-08',level:2,subject:'VPN problem',from:{name:'Elnur',role:'Manager',country:'AZ'},body:'I cannot connect to VPN since this morning.',goal:'Durumu bildir',keywords:[],skeleton:'',model:''},
  '2026-10-08-3':{date:'2026-10-08',level:5,subject:'Escalation',body:'Long mail',goal:'g'},
  'bad':{date:5,level:'x'},'bad2':null};
 store.ticket_replies={'2026-10-07-1':{ticket:'2026-10-07-1',level:1,date:'2026-10-07',answer:'Yes I can help',hints:0,score:90,ts:'2026-10-07T10:00:00Z'},'2026-10-06-1':{level:1,date:'2026-10-06',answer:'ok',hints:1,score:85,ts:'2026-10-06T10:00:00Z'},'2026-10-05-1':{level:1,date:'2026-10-05',answer:'ok',hints:0,score:70,ts:'2026-10-05T10:00:00Z'}};
 store.ticket_reviews={'2026-10-05-1':{score:88,good:'g',fix:'f',better:'b'}};
 store.audit={'2026-W41':{week:'2026-W41',date:'2026-10-11',verdict:'dikkat',headline:'Koçlar çalışıyor, bir uyarı var',checks:[{name:'warmup yazıldı',status:'ok',evidence:'5/5 ders'},{name:'link doğruluğu',status:'warn',evidence:'1 kaynak doğrulanamadı'},null,{status:'bad'}],findings:['Ticket seviyesi biraz kolay',7],proposals:[{id:'p1',text:'Günlük ticket sayısını 3 yap',risk:'low',applied:true},{id:'p2',text:'Seviye atlamayı 4 ticket yap',why:'3 çok kolay',risk:'high'}],note:'n'}};
window.__notify=notify;
 window.claude={use:async n=>({db:{collection:coll,doc},user:{isOwner:()=>!window.__guest,canEdit:()=>!window.__guest,id:async()=>window.__guest?'uGuest':'uOwner',me:async()=>({name:window.__guest?'Arkadaş':'Yusuf'}),profiles:async(ids)=>Object.fromEntries(ids.map(i=>[i,{name:i==='uF1'?'Elif':i==='uF2'?'Mert':'Biri'}]))},
  sample:Object.assign(async()=>({text:'cevap'}),{json:async(p,o)=>{ if(/destek talebi/.test(p)&&/JSON nesnesi/.test(p)) return {subject:'New laptop',from:{name:'Can',role:'HR',country:'TR'},body:'I need a laptop.',goal:'g',keywords:[{w:'laptop',tr:'dizüstü'}],skeleton:'We will ___.',model:'m',category:'onboarding'}; if(/JSON nesnesi/.test(p)) return {title:'Canlı Ders',hook:'h',blocks:[{t:'h',text:'a'},{t:'p',text:'b'},{t:'box',h:'x',text:'y'}],quiz:[{q:'q',answer:'a'}],interview:[],vocab:[],homework:'x',resources:[{title:'Ara',query:'vlan nedir',type:'video',why:'neden'}]}; if(/YUSUF'UN CEVABI/.test(p)) return {score:80,good:'g',fix:'f',better:'b'}; if(/destek talebi/.test(p)&&/JSON nesnesi/.test(p)) return {subject:'New laptop',from:{name:'Can',role:'HR',country:'TR'},body:'I need a laptop.',goal:'g',keywords:[{w:'laptop',tr:'dizüstü'}],skeleton:'We will ___.',model:'m',category:'onboarding'}; if(/Cevap için 4-6/.test(p)) return {keywords:[{w:'fix',tr:'düzeltmek'}]}; if(/Yusuf bir destek talebine/.test(p)) return {score:82,good:'Net yazdın',fix:'will kullan',better:'I will check it.',words:[{w:'check',tr:'kontrol'}]}; return q}}),
  mcp:{callTool:async()=>({payload:{}})},downloads:{save:async()=>{}}})[n]||null};
};




module.exports={INIT,chromium};

/* ---- v28 UI: sertifika haritası + portfolyo paketi ---- */
S.pj.gh="yusufydegirmenci";S.pj.msg="";
var CRC_T=null;
function crc32(u8){if(!CRC_T){CRC_T=[];for(var n=0;n<256;n++){var c=n;for(var k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;CRC_T[n]=c>>>0}}var c2=0xFFFFFFFF;for(var i=0;i<u8.length;i++)c2=CRC_T[(c2^u8[i])&255]^(c2>>>8);return (c2^0xFFFFFFFF)>>>0}
function zipFiles(files){
  var enc=new TextEncoder(),parts=[],cd=[],off=0;
  files.forEach(function(f){
    var name=enc.encode(f.path),data=enc.encode(f.data),crc=crc32(data),lh=new Uint8Array(30+name.length),dv=new DataView(lh.buffer);
    dv.setUint32(0,0x04034b50,true);dv.setUint16(4,20,true);dv.setUint16(6,0x0800,true);dv.setUint16(8,0,true);dv.setUint16(10,0,true);dv.setUint16(12,0x21,true);dv.setUint32(14,crc,true);dv.setUint32(18,data.length,true);dv.setUint32(22,data.length,true);dv.setUint16(26,name.length,true);dv.setUint16(28,0,true);lh.set(name,30);
    parts.push(lh,data);
    var ch=new Uint8Array(46+name.length),cv=new DataView(ch.buffer);
    cv.setUint32(0,0x02014b50,true);cv.setUint16(4,20,true);cv.setUint16(6,20,true);cv.setUint16(8,0x0800,true);cv.setUint16(10,0,true);cv.setUint16(12,0,true);cv.setUint16(14,0x21,true);cv.setUint32(16,crc,true);cv.setUint32(20,data.length,true);cv.setUint32(24,data.length,true);cv.setUint16(28,name.length,true);cv.setUint32(42,off,true);ch.set(name,46);cd.push(ch);
    off+=lh.length+data.length});
  var cds=cd.reduce(function(a,c){return a+c.length},0),end=new Uint8Array(22),ev=new DataView(end.buffer);
  ev.setUint32(0,0x06054b50,true);ev.setUint16(8,files.length,true);ev.setUint16(10,files.length,true);ev.setUint32(12,cds,true);ev.setUint32(16,off,true);
  return new Blob(parts.concat(cd,[end]),{type:"application/zip"});
}
function pjCoverage(p,def){
  var rows=(def&&def.maps||[]).map(function(m){var ns=(String(m[2]).match(/\d+/g)||[]).map(Number),ok=ns.length&&ns.every(function(n){return p.steps[n-1]&&p.steps[n-1].done});return {a:m[0],b:m[1],c:m[2],ok:!!ok}});
  return rows;
}
function pjSlug(t){return String(t||"proje").toLowerCase().replace(/ç/g,"c").replace(/ğ/g,"g").replace(/ı/g,"i").replace(/ö/g,"o").replace(/ş/g,"s").replace(/ü/g,"u").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,48)||"proje"}
function pjRepo(def){return (def.repo&&def.repo.name)||pjSlug(def.title)}
function pjReadme(p,def){
  var pa=pathOf(def.id),done=pjDone(p),L=[];
  L.push("# "+p.title,"","> "+def.pitch,"");
  L.push("## Özet (Türkçe)","",def.why,"");
  L.push("## Summary (English)","",def.pitch,"");
  L.push("## Bu projede neler yapıldı","");def.outcome.forEach(function(x){L.push("- "+x)});L.push("");
  L.push("## Araçlar","",def.tools,"");
  if(def.cert){L.push("## Sertifika hedefi","","**"+def.cert+"**","","| Sınav alanı / hedef | Konu | Kanıt adımı | Durum |","|---|---|---|---|");pjCoverage(p,def).forEach(function(r){L.push("| "+r.a+" | "+r.b+" | "+r.c+" | "+(r.ok?"✓":"…")+" |")});L.push("")}
  L.push("## Adımlar ve kanıtlar","","İlerleme: "+done+" / "+p.steps.length,"");
  p.steps.forEach(function(s,i){var d=def.steps[i];L.push("### "+(i+1)+". "+s.t+(s.done?"  ✓":""),"");if(d){L.push("- **Yapılan iş:** "+d.doit,"- **Kanıt:** "+d.proof)}if(s.note)L.push("- **Notum:** "+s.note);L.push("")});
  var notes=(p.notes||[]).slice(-10);if(notes.length){L.push("## Günlük","");notes.forEach(function(n){L.push("- "+String(n.ts).slice(0,10)+": "+n.text)});L.push("")}
  L.push("## Klasörler","");((def.repo&&def.repo.folders)||["docs/","src/","evidence/"]).forEach(function(f){L.push("- `"+f+"`")});L.push("");
  L.push("## Nasıl çalıştırılır","","Buraya projeyi çalıştırma adımlarını yaz (kurulum, komutlar, beklenen çıktı).","");
  L.push("## Güvenlik notu","","Bu repoda parola, API anahtarı, AWS gizli anahtarı, kişisel veri ya da gerçek müşteri verisi YOKTUR. Tüm denemeler kendi izole ortamımda yapıldı.","");
  L.push("---","Bu proje Yusuf Akademi ile adım adım yapılmıştır.");
  return L.join("\n");
}
function pjGitignore(){return "# Gizli bilgiler asla repoya girmesin\n.env\n*.pem\n*.key\n*.pfx\n.aws/\ncredentials\nsecrets.*\n\n# Derleme ve geçici dosyalar\nbin/\nobj/\nnode_modules/\n__pycache__/\n*.pyc\n.venv/\n.vscode/\n.idea/\n*.log\n*.vdi\n*.ova\n.DS_Store\nThumbs.db\n"}
function pjEvidence(p,def){
  var L=["# Kanıt listesi","","Her adımın kanıtını `evidence/` klasörüne koy (ekran görüntüsü, rapor, tablo). Dosya adı: `adim-NN-kisa-ad.ext`.","","- [ ] Ekran görüntülerinde şifre, anahtar, e-posta, IP/hesap numarası var mı? Karart.",""];
  p.steps.forEach(function(s,i){var d=def.steps[i];L.push("- ["+(s.done?"x":" ")+"] **Adım "+(i+1)+": "+s.t+"** → "+(d?d.proof:""))});
  return L.join("\n");
}
function pjFiles(p,def){
  var folders=(def.repo&&def.repo.folders)||["docs/","src/","evidence/"],F=[];
  F.push({path:"README.md",data:pjReadme(p,def)},{path:".gitignore",data:pjGitignore()},{path:"evidence/KANIT-LISTESI.md",data:pjEvidence(p,def)});
  folders.forEach(function(f){if(f!=="evidence/")F.push({path:f+".gitkeep",data:""})});
  return F;
}
function pjDownload(p,def){
  if(!S.dl){S.pj.msg="Bu görünümde indirme yok. README'yi kopyalayıp elle kaydedebilirsin.";draw();return}
  var blob=zipFiles(pjFiles(p,def));
  S.dl.save({filename:pjRepo(def)+".zip",data:blob}).then(function(){S.pj.msg="Paket kaydedildi. Zip'i aç; klasördeki dosyalar GitHub'a yüklenecek.";draw()},function(e){S.pj.msg=(e&&e.code==="declined")?"Vazgeçtin.":"Kaydedilemedi.";draw()});
}
function pjCopy(txt){
  var done=function(ok){S.pj.msg=ok?"Kopyalandı.":"Kopyalanamadı. Metni elle seçip kopyala.";draw()};
  try{navigator.clipboard.writeText(txt).then(function(){done(true)},function(){done(false)})}catch(e){done(false)}
}
function certPanel(p,def){
  if(!def||!def.maps)return null;
  var cf=CERT_FACTS[def.id]||{lines:[]},rows=pjCoverage(p,def),n=rows.filter(function(r){return r.ok}).length;
  return h("div",{class:"panel"},h("div",{class:"label"},"Sertifika haritası"),h("h2",null,def.cert),
    h("ul",{class:"rc-l"},cf.lines.map(function(x){return h("li",null,x)})),
    cf.link?h("a",{href:cf.link,target:"_blank",rel:"noopener noreferrer"},cf.label||"Resmî sayfa"):null,
    h("div",{class:"small mute"},"Sınav bilgileri değişebilir; kayıt olmadan önce resmî sayfadan doğrula."),
    h("div",{style:"display:flex;justify-content:space-between;gap:8px;align-items:center"},h("b",null,"Hedef kapsamı"),h("span",{class:"pill"+(n===rows.length?" ok":"")},n+" / "+rows.length)),
    h("div",{class:"xpbar"},h("i",{style:"width:"+Math.round(n/Math.max(1,rows.length)*100)+"%"})),
    h("div",{class:"cov"},rows.map(function(r){return h("div",{class:"cov-r"+(r.ok?" ok":"")},h("span",{class:"cov-c"},r.ok?"✓":""),h("span",null,h("b",null,r.a),h("small",{class:"mute"}," · "+r.b+" · "+r.c)))})),
    h("div",{class:"small mute"},"Bir hedef, bağlı adımların hepsini bitirince ✓ olur. Bütün hedefler ✓ olunca sınava hazırlık için kendini sınama adımına geç."));
}
function exportPanel(p,def){
  if(!def)return null;var P=S.pj,repo=pjRepo(def),gh=(P.gh||"kullanici").replace(/[^A-Za-z0-9-]/g,"")||"kullanici";
  var inp=h("input",{type:"text",maxlength:39,"aria-label":"GitHub kullanıcı adı",oninput:function(e){P.gh=e.target.value}});inp.value=P.gh;
  var cmds="cd "+repo+"\ngit init\ngit add .\ngit commit -m \""+p.title.replace(/"/g,"'")+": ilk sürüm\"\ngit branch -M main\ngit remote add origin https://github.com/"+gh+"/"+repo+".git\ngit push -u origin main";
  var li=pjCopyText(def,p);
  return h("div",{class:"panel"},h("div",{class:"label"},"Portfolyo"),h("h2",null,"Emeğini herkese göster"),
    h("div",{class:"small mute"},"Projeyi bitirdikçe kanıtların GitHub'da durur; işverene gösterebileceğin gerçek bir iş olur. Paketin içinde hazır README, .gitignore (şifreleri korur) ve kanıt listesi var."),
    h("div",{class:"row"},h("button",{class:"btn",type:"button",onclick:function(){pjDownload(p,def)}},"Repo paketini indir (.zip)"),h("button",{class:"btn ghost",type:"button",onclick:function(){pjCopy(pjReadme(p,def))}},"README'yi kopyala")),
    P.msg?h("div",{class:"small",role:"status"},P.msg):null,
    h("div",{class:"lbox"},h("div",{class:"label"},"Git bilmiyorsan: web ile yükle"),h("ol",{class:"lsteps"},[
      h("li",null,"github.com/new adresine git. Repository name: "+repo+". Public ya da Private seç. Create repository'ye bas."),
      h("li",null,"Açılan sayfada “uploading an existing file” bağlantısına tıkla."),
      h("li",null,"İndirdiğin zip'i aç. İçindeki dosya ve klasörleri sayfaya sürükle."),
      h("li",null,"En altta “Commit changes”e bas. Bitti; projen yayında.")])),
    h("div",{class:"lbox"},h("div",{class:"label"},"Git ile yükle (6 komut)"),h("div",{class:"small mute"},"GitHub kullanıcı adın:"),inp,h("pre",{class:"lcode"},cmds),h("button",{class:"btn ghost",type:"button",onclick:function(){pjCopy(cmds)}},"Komutları kopyala")),
    h("div",{class:"lbox eng"},h("div",{class:"label"},"CV / LinkedIn cümlesi"),h("p",{style:"margin:0 0 6px"},li.en),h("p",{style:"margin:0 0 8px"},li.tr),h("button",{class:"btn ghost",type:"button",onclick:function(){pjCopy(li.en+"\n"+li.tr)}},"Kopyala")),
    h("div",{class:"lbox warn"},h("div",{class:"label"},"Yüklemeden önce"),h("p",null,"Parola, API anahtarı, AWS gizli anahtarı, kişisel veri ve gerçek müşteri verisi repoya girmesin. Ekran görüntülerinde e-posta ve hesap numaralarını karart. Emin değilsen repoyu önce Private aç.")));
}
function pjCopyText(def,p){
  var n=pjDone(p),t=p.steps.length;
  return {en:def.pitch+(def.cert?" (Preparing for: "+def.cert+")":""),tr:"Proje: "+p.title+" — "+n+"/"+t+" adım tamamlandı. Araçlar: "+def.tools+"."};
}

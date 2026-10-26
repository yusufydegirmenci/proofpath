"use strict";
/* ---- Kaynakça sayfası (#kaynakca): veri content/kaynakca.js (PP_KAYNAKCA). Yalnız künye gösterilir: bağlantı, kaynak adı, kullanım, kontrol tarihi. ---- */
function renderKaynakca(){
  var K=window.PP_KAYNAKCA||{izler:[],kayitlar:[],tarih:""},ad=PP_MARKA.ad;
  var kip={r:"Referans",i:"İlham"};
  var grup=K.izler.map(function(iz){
    var l=K.kayitlar.filter(function(k){return k[0]===iz[0]});if(!l.length)return null;
    return h("details",{class:"more","data-kk-iz":iz[0]},
      h("summary",null,iz[1]+" ("+l.length+")"),
      h("ul",{style:"list-style:none;margin:0;padding:0 0 12px;display:flex;flex-direction:column;gap:10px"},l.map(function(k){
        return h("li",{style:"min-width:0;overflow-wrap:anywhere"},
          h("a",{href:k[3],target:"_blank",rel:"noopener noreferrer",style:"color:var(--net);font-weight:600"},k[2]),
          h("div",{class:"small mute"},k[1]+" · "+kip[k[4]]+" · kontrol: "+K.tarih));
      })));
  });
  return [
    h("div",{class:"panel"},h("div",{class:"label"},"Kaynakça"),h("h2",null,"Dersler hangi kaynaklara dayanıyor?"),
      h("div",{class:"small mute"},K.kayitlar.length+" kaynak, konulara göre gruplu. Her kayıtta bağlantı, kaynağın adı, nasıl kullanıldığı ve son kontrol tarihi (HTTP 200 doğrulaması: "+K.tarih+") yazar. Referans: ders içeriğinde doğruluğu denetlemek için bakılan resmî belge ya da standart. İlham: konu seçimi ve anlatım fikri için bakılan eğitim ya da topluluk kaynağı.")),
    h("div",{class:"panel","data-kk":"telif"},h("h3",{style:"margin:0"},"Telif ve marka notu"),
      h("div",{class:"small"},"Bu kaynaklardan telifli metin birebir kopyalanmadı; dersler, sorular ve açıklamalar özgün olarak yazıldı, kaynaklar yalnız ilham ve referans olarak anılır. Sertifika adları ve ürün adları (CompTIA, Cisco, CCNA, AWS, ISTQB, Python Institute, Linux Foundation, Kubernetes ve benzerleri) ilgili sahiplerinin tescilli markasıdır; "+ad+" bu kuruluşlarla bağlı değildir ve onlarca onaylanmamıştır. Sınava hazırlanırken her zaman sahibinin yayımladığı güncel sınav kılavuzunu esas al.")),
    h("div",{class:"panel","data-kk":"hata"},h("h3",{style:"margin:0"},"Hata ya da kırık bağlantı mı gördün?"),
      h("div",{class:"small"},"Yanlış bilgi, çalışmayan bağlantı ya da eksik atıf için geri bildirim formunu kullan. Form Ayarlar sekmesinde açılır; kayıt yalnız bu cihazda durur, göndermek için ayrıca onay verirsin."),
      h("div",{class:"row"},h("button",{class:"btn",type:"button","data-kk":"bildir",onclick:function(){if(typeof gbAc==="function"&&window.PP&&PP.ogr&&PP.ogr.gb){gbAc({tur:"genel",sekme:"kaynakca"});goTab("ayar")}else goTab("ayar")}},"Hata bildir"))),
    h("div",{class:"panel","data-kk":"liste"},h("h2",null,"Kaynaklar"),grup)
  ];
}

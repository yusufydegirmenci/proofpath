"use strict";
/* ALAN: Ders > CCNA/ağ, VLAN/STP ve NAT/PAT karar lab'ları. NE YAPAR: Aynı VLAN, trunk geçişi, kök köprü, kök port ve NAT tablosu cevaplarını saf hesapla üretir; yerel simülasyon, gerçek switch/router yok.
   SORUN OLURSA: Arayüz ve kanıt kaydı lab-karar.js'tedir (tip 'genel'), kanıt kapı değildir; lab-karar.js'ten SONRA yüklenir ve PP.lab'a eklenir; cevap sabiti elle yazılmaz.
   YENİ ÖZELLİK: Yeni hesap fonksiyonu burada yazılıp genel tipe bağlanır; tests/faz5d_lab.js (VLAN/STP, NAT/PAT) güncellenir. */
/* ---- Faz 5 tur 4: VLAN/STP ve NAT/PAT karar lab'ları (M§8.2) ----
   Form tabanlı karar lab'ı; tarayıcıda yerel simülasyon, gerçek switch/router yok. Kanıt kapı değildir (istemci doğrulaması).
   Doğru cevaplar saf hesaptan (kök köprü, kök port, NAT tablosu) çıkar; elle yazılmış sabit yok. Arayüz ve kanıt: lab-karar.js (tip "genel"). */
(function (g) {
  var PP = g.PP = g.PP || {}, LAB = PP.lab = PP.lab || {};
  var EH = [["evet", "Evet"], ["hayir", "Hayır"]];

  /* ---- VLAN / STP hesapları ---- */
  function ayniVlan(portlar, a, b) { return portlar[a] != null && portlar[a] === portlar[b]; }
  function trunkGecer(izinli, vlan) { return izinli.indexOf(vlan) >= 0; }
  function macSayi(m) { return parseInt(String(m).replace(/\./g, ""), 16); }
  /* köprü: {ad, oncelik, mac}; küçük (öncelik, sonra MAC) kazanır */
  function daha(a, b) { return a.oncelik !== b.oncelik ? a.oncelik < b.oncelik : macSayi(a.mac) < macSayi(b.mac); }
  function kokKopru(liste) { return liste.reduce(function (en, x) { return daha(x, en) ? x : en; }); }
  /* kök köprüye giden yollar: [{port, maliyet}] → en düşük toplam maliyetli port kök port, diğerleri engellenir (alternate) */
  function kokPort(yollar) { return yollar.reduce(function (en, x) { return x.maliyet < en.maliyet ? x : en; }); }
  /* klasik (kısa) STP yol maliyeti: 10 Mb/s=100, 100 Mb/s=19, 1 Gb/s=4, 10 Gb/s=2 */
  var MALIYET = { 10: 100, 100: 19, 1000: 4, 10000: 2 };

  var KOPRULER = [{ ad: "SW1", oncelik: 32768, mac: "0000.0000.00AA" }, { ad: "SW2", oncelik: 4096, mac: "0000.0000.00FF" }, { ad: "SW3", oncelik: 32768, mac: "0000.0000.0011" }];
  var YOLLAR = [{ port: "Fa0/1", ad: "Fa0/1 (SW2'ye doğrudan, 100 Mb/s)", maliyet: MALIYET[100] }, { port: "Gi0/2", ad: "Gi0/2 (SW1 üzerinden: 1 Gb/s + 1 Gb/s)", maliyet: MALIYET[1000] + MALIYET[1000] }];
  var PORTLAR = { "Fa0/1": 10, "Fa0/2": 10, "Fa0/3": 20 };
  var IZINLI = [10, 20];

  var kopruSec = KOPRULER.map(function (x) { return [x.ad, x.ad]; });
  var rootK = kokKopru(KOPRULER), esit = KOPRULER.filter(function (x) { return x.oncelik === 32768; }), esitKazanan = kokKopru(esit);
  var rootP = kokPort(YOLLAR);
  function hd(b) { return b ? "evet" : "hayir"; }

  var VLAN_SC = [
    { id: "s1", ozet: "Tek switch, router yok. Portlar ve VLAN'lar aşağıda. PC-A (Fa0/1) ile PC-B (Fa0/2) ve PC-A ile PC-C (Fa0/3) arasında 2. katmanda iletişim olur mu?",
      tabloAd: "Switch portları", satirlar: ["Fa0/1  PC-A  access VLAN 10", "Fa0/2  PC-B  access VLAN 10", "Fa0/3  PC-C  access VLAN 20"],
      alanlar: [{ ad: "ab", etiket: "PC-A ↔ PC-B haberleşir mi?", sec: EH }, { ad: "ac", etiket: "PC-A ↔ PC-C haberleşir mi?", sec: EH }],
      dogru: { ab: hd(ayniVlan(PORTLAR, "Fa0/1", "Fa0/2")), ac: hd(ayniVlan(PORTLAR, "Fa0/1", "Fa0/3")) },
      aciklama: "Aynı VLAN aynı yayın alanıdır; PC-A ve PC-B konuşur. PC-C başka VLAN'dadır; ancak bir router (ya da 3. katman switch) VLAN'lar arası yönlendirme yaparsa konuşabilirler.", ipucu: "Her port tek bir VLAN'a aittir; yalnız aynı VLAN numarasındaki portlar 2. katmanda birbirini görür.",
      ipucu2: "Tabloda her satırın sonundaki VLAN numarasını oku: Fa0/1 → VLAN " + PORTLAR["Fa0/1"] + ", Fa0/2 → VLAN " + PORTLAR["Fa0/2"] + ", Fa0/3 → VLAN " + PORTLAR["Fa0/3"] + ". Her soru için iki portun numarasını yan yana yaz.",
      ipucu3: "PC-A ile PC-B: " + PORTLAR["Fa0/1"] + " ve " + PORTLAR["Fa0/2"] + "; PC-A ile PC-C: " + PORTLAR["Fa0/1"] + " ve " + PORTLAR["Fa0/3"] + ". Numaralar aynıysa aynı yayın alanıdır; farklıysa router olmadan geçiş yoktur. İki karşılaştırmayı bu kurala göre kapat." },
    { id: "s2", ozet: "İki switch arasındaki bağlantı trunk'tır. VLAN 30'daki bir PC'nin trafiği diğer switch'e geçer mi? VLAN 10 çerçevesi (native VLAN 1) trunk'ta nasıl taşınır?",
      tabloAd: "Trunk ayarı", satirlar: ["Gi0/1  mode trunk", "allowed VLAN: " + IZINLI.join(", "), "native VLAN: 1"],
      alanlar: [{ ad: "gecer", etiket: "VLAN 30 trunk'tan geçer mi?", sec: EH }, { ad: "etiket", etiket: "VLAN 10 çerçevesi trunk'ta", sec: [["etiketli", "802.1Q etiketli"], ["etiketsiz", "Etiketsiz"]] }],
      dogru: { gecer: hd(trunkGecer(IZINLI, 30)), etiket: "etiketli" },
      aciklama: "Trunk yalnız izinli VLAN listesindekileri taşır; 30 listede yok, geçmez. Native VLAN (burada 1) etiketsiz gider; VLAN 10 native olmadığı için 802.1Q etiketiyle taşınır.", ipucu: "Önce izinli VLAN listesine bak. Etiketsiz giden tek VLAN native VLAN'dır.",
      ipucu2: "Tablodaki 'allowed VLAN' satırına (" + IZINLI.join(", ") + ") ve 'native VLAN: 1' satırına bak. Birinci soru için listede 30 var mı diye ara; ikinci soru için VLAN 10'un native VLAN ile aynı olup olmadığını karşılaştır.",
      ipucu3: "Trunk'ın izinli listesi: " + IZINLI.join(", ") + "; native VLAN: 1. Birinci soruda 30'un bu listede olup olmadığına, ikinci soruda VLAN 10'un native VLAN ile aynı olup olmadığına bak. Sonra kuralı uygula: native VLAN trunk'ta etiketsiz gider, diğer VLAN'lar 802.1Q etiketiyle taşınır." },
    { id: "s3", ozet: "Üç switch'in köprü kimliği (STP öncelik, MAC) aşağıda. Kök köprü hangisi olur? SW1 ve SW3'ün önceliği eşit; bunların arasında hangisi daha iyi köprü kimliğine sahiptir?",
      tabloAd: "Köprü kimlikleri", satirlar: KOPRULER.map(function (x) { return x.ad + "  öncelik " + x.oncelik + "  MAC " + x.mac; }),
      alanlar: [{ ad: "kok", etiket: "Kök köprü", sec: kopruSec }, { ad: "esit", etiket: "SW1 ve SW3 arasında üstün olan", sec: [["SW1", "SW1"], ["SW3", "SW3"]] }],
      dogru: { kok: rootK.ad, esit: esitKazanan.ad },
      aciklama: "Önce en küçük öncelik kazanır (SW2: 4096). Öncelik eşitse en küçük MAC adresi kazanır (0011 < 00AA, SW3).", ipucu: "Önce öncelik, sonra MAC; her ikisinde de küçük olan kazanır.",
      ipucu2: "Tablodaki öncelik sütununu oku: " + KOPRULER.map(function (x) { return x.ad + " " + x.oncelik; }).join(", ") + ". En küçük sayı kök köprüyü verir. İkinci soru için öncelikleri eşit olan iki köprünün MAC satırına geç.",
      ipucu3: "Kök köprü sorusu en küçük öncelikte biter. Eşit öncelikli " + esit.map(function (x) { return x.ad; }).join(" ve ") + " için MAC'leri karşılaştır: " + esit[0].mac + " ile " + esit[1].mac + ". Soldan sağa ilk farklı basamağa bak; küçük olan köprü üstündür." },
    { id: "s4", ozet: "SW3 kök değildir ve kök köprüye iki yoldan ulaşır (klasik STP maliyetleri: 100 Mb/s = 19, 1 Gb/s = 4). Hangi port kök port olur? Diğer port ne olur?",
      tabloAd: "SW3'ün kök köprüye yolları", satirlar: YOLLAR.map(function (y) { return y.ad + " → toplam maliyet " + y.maliyet; }),
      alanlar: [{ ad: "kokport", etiket: "Kök port", sec: YOLLAR.map(function (y) { return [y.port, y.port]; }) }, { ad: "diger", etiket: "Diğer portun durumu", sec: [["engelli", "Engellenir (alternate)"], ["ileten", "İletir"]] }],
      dogru: { kokport: rootP.port, diger: "engelli" },
      aciklama: "Kök köprüye en düşük toplam yol maliyeti olan port kök port olur (Gi0/2: 8 < 19). Aynı segmentte döngü oluşmaması için diğer yol engellenir.", ipucu: "Her yol için bağlantı maliyetlerini topla; en küçük toplam kök porttur.",
      ipucu2: "Tablodaki her satırın sonundaki toplam maliyeti oku; satır açıklamasındaki bağlantı hızlarını kontrol et (100 Mb/s = " + MALIYET[100] + ", 1 Gb/s = " + MALIYET[1000] + "). Her portun toplamını yan yana yaz.",
      ipucu3: YOLLAR[0].port + " yolu: " + YOLLAR[0].maliyet + "; " + YOLLAR[1].port + " yolu: " + MALIYET[1000] + " + " + MALIYET[1000] + " (iki hat toplanır). İki sayıyı karşılaştır: küçük olan kök port olur. Kök port seçilince aynı switch'te kalan yolun durumu döngüyü önleme kuralıyla belli olur." }
  ];

  /* ---- NAT / PAT hesapları ---- */
  var NAT_TABLO = [{ il: "192.168.1.10", ilp: 51000, ig: "203.0.113.2", igp: 60001 }, { il: "192.168.1.11", ilp: 51000, ig: "203.0.113.2", igp: 60002 }];
  /* gelen paket (dış → iç): hedef inside global adres:port → kayıt ya da null (kayıt yoksa paket atılır) */
  function donus(tablo, adres, port) { for (var i = 0; i < tablo.length; i++) if (tablo[i].ig === adres && tablo[i].igp === port) return tablo[i]; return null; }
  function ozel(a) { return /^10\./.test(a) || /^192\.168\./.test(a) || /^172\.(1[6-9]|2\d|3[01])\./.test(a); }
  var DIS = "198.51.100.7", GENEL = "203.0.113.2";
  function sat(r) { return r.il + ":" + r.ilp + "  ↔  " + r.ig + ":" + r.igp; }
  var kayit2 = donus(NAT_TABLO, GENEL, 60002), kayitYok = donus(NAT_TABLO, GENEL, 60099);

  var NAT_SC = [
    { id: "s1", ozet: "İç ağdaki 192.168.1.10:51000 hosttan dış sunucuya (" + DIS + ":443) paket çıkıyor. Router dış arayüz adresi " + GENEL + " (PAT). Çıkışta hangi adres çevrilir?",
      tabloAd: "Paket", satirlar: ["kaynak: 192.168.1.10:51000", "hedef: " + DIS + ":443", "router dış adres: " + GENEL],
      alanlar: [{ ad: "kaynak", etiket: "Çevrilen kaynak adres", sec: [["192.168.1.10", "192.168.1.10"], [GENEL, GENEL], [DIS, DIS]] }, { ad: "hedef", etiket: "Hedef adres de çevrilir mi?", sec: EH }],
      dogru: { kaynak: GENEL, hedef: "hayir" },
      aciklama: "Standart çıkış NAT/PAT yalnız kaynağı çevirir: özel kaynak adres, router'ın genel adresine dönüşür. Hedef değişmez.", ipucu: "Özel adresler internette yönlendirilmez; o yüzden çıkışta özel olan kaynak adres değişir.",
      ipucu2: "Tablodaki 'kaynak' satırına bak: 192.168.1.10 özel aralıkta (RFC 1918). 'router dış adres' satırındaki " + GENEL + " ile 'hedef' satırındaki " + DIS + " adreslerini ayır; kaynak sorusunda üç seçenekten biri hedefin adresidir.",
      ipucu3: "Hedef adres " + DIS + " zaten karşı tarafın adresi, kaynak olamaz. Kalan iki seçenekten biri özel (RFC 1918) adrestir ve internette yönlendirilmez. Paket internete çıkarken router kaynak olarak hangi adresini kullanır? Tablodaki satırlardan hangisi router'a ait? İkinci soruda çıkışta NAT'ın hedef alanına dokunup dokunmadığını düşün." },
    { id: "s2", ozet: "NAT tablosu aşağıda. Dış sunucudan " + GENEL + ":60002 adresine yanıt geldi. Hangi iç hosta ve hangi iç porta çevrilir?",
      tabloAd: "NAT tablosu (iç yerel ↔ iç genel)", satirlar: NAT_TABLO.map(sat),
      alanlar: [{ ad: "host", etiket: "İç host", sec: NAT_TABLO.map(function (r) { return [r.il, r.il]; }) }, { ad: "port", etiket: "İç port", sec: [["51000", "51000"], ["60002", "60002"]] }],
      dogru: { host: kayit2.il, port: String(kayit2.ilp) },
      aciklama: "Router dönüş paketini tablodaki satırdan eşler: " + sat(kayit2) + ". İki iç host aynı iç portu kullansa bile PAT onları farklı dış portla ayırır.", ipucu: "Önce tabloda dış (inside global) adres ve port çiftini ara; yanındaki iç çifti geri yaz.",
      ipucu2: "Gelen paketin hedefi " + GENEL + ":60002. Tabloda her satırın '↔' işaretinin SAĞ tarafındaki çifte bak ve " + GENEL + ":60002 yazan satırı bul.",
      ipucu3: "Aradığın satır tablonun " + (NAT_TABLO.indexOf(kayit2) + 1) + ". satırı: sağında " + kayit2.ig + ":" + kayit2.igp + " var. Router dönüşte bu satırın SOL tarafındaki iç çifti geri yazar; o çiftin adresini ve portunu iki alana taşı." },
    { id: "s3", ozet: "Dışarıdan (" + DIS + ":443) " + GENEL + ":60099 adresine, içeriden hiçbir isteğe karşılık olmayan bir paket geliyor. Tabloda bu çifte uyan satır var mı? Router ne yapar?",
      tabloAd: "NAT tablosu (iç yerel ↔ iç genel)", satirlar: NAT_TABLO.map(sat),
      alanlar: [{ ad: "kayit", etiket: "Tabloda satır var mı?", sec: EH }, { ad: "karar", etiket: "Router paketi", sec: [["atar", "Atar (çeviri kaydı yok)"], ["iletir", "İç ağa iletir"]] }],
      dogru: { kayit: hd(!!kayitYok), karar: kayitYok ? "iletir" : "atar" },
      aciklama: "Çeviri kaydı yoksa router paketi hangi iç hosta vereceğini bilemez ve atar. Bu bir yan etkidir; NAT bir güvenlik duvarı değildir (kalıcı/statik eşleme ya da port yönlendirme olsaydı paket içeri girebilirdi).", ipucu: "Kayıt, içeriden çıkan bir paketle oluşur. 60099 portu için içeriden bir paket çıkmadıysa tabloda satır yoktur.",
      ipucu2: "Tablodaki satırların sağ tarafındaki dış portlara bak: " + NAT_TABLO.map(function (r) { return r.igp; }).join(" ve ") + ". Gelen paket " + GENEL + ":60099 adresine gidiyor; bu port çifti listede var mı?",
      ipucu3: "Gelen çift: " + GENEL + ":60099. Tablodaki her satırın sağ tarafındaki çiftle (" + NAT_TABLO.map(function (r) { return r.ig + ":" + r.igp; }).join(" ve ") + ") bu çifti tek tek karşılaştır ve ne bulduğunu yaz. Router kararı için: tabloda eşleşen kayıt olmasaydı ve statik eşleme ya da port yönlendirme tanımlı olmasaydı router paketi hangi iç hosta verebilirdi?" },
    { id: "s4", ozet: "Adres türlerini eşle: 192.168.1.10 (iç host), " + GENEL + " (iç hostun dışarıdan göründüğü adres), " + DIS + " (dış sunucu).",
      tabloAd: "Sözlük", satirlar: ["Inside local: iç hostun iç ağdaki adresi", "Inside global: iç hostun dışarıdan görünen adresi", "Outside global: dış hostun adresi"],
      alanlar: [["a", "192.168.1.10", "local"], ["b", GENEL, "global"], ["c", DIS, "dis"]].map(function (x) { return { ad: x[0], etiket: x[1], sec: [["local", "Inside local"], ["global", "Inside global"], ["dis", "Outside global"]] }; }),
      dogru: { a: ozel("192.168.1.10") ? "local" : "global", b: "global", c: "dis" },
      aciklama: "Özel (RFC 1918) adres iç hostun iç adresidir: inside local. Router'ın genel adresi iç hostun dışarıdaki görüntüsüdür: inside global. Dış sunucunun adresi outside global'dir.", ipucu: "Önce hostun hangi tarafta olduğuna (iç/dış), sonra adresin hangi ağdan göründüğüne (iç/dış) bak.",
      ipucu2: "Sözlükteki üç satırı oku. Her adres için iki soru sor: host iç ağda mı, dış dünyada mı? Adres iç ağdan mı yoksa dışarıdan mı görünen adres? 192.168.1.10 özel aralıkta; " + GENEL + " router'ın dış adresi; " + DIS + " dış sunucu.",
      ipucu3: "Her adres için tabloyla karşılaştır: bu adres iç ağda mı geçerli, yoksa dış dünyada mı görünüyor? Adresler: 192.168.1.10, " + GENEL + ", " + DIS + ". Sözlükteki üç tanımın başındaki sözcükleri (Inside/Outside, local/global) bu görünümlerle kendin eşle." }
  ];

  LAB.vlan = { ayniVlan: ayniVlan, trunkGecer: trunkGecer, kokKopru: kokKopru, kokPort: kokPort, MALIYET: MALIYET, SC: VLAN_SC };
  LAB.nat = { donus: donus, ozel: ozel, TABLO: NAT_TABLO, SC: NAT_SC };

  var ET = "Yerel simülasyon · form tabanlı karar, gerçek switch/router yok";
  var KANIT = "Doğrulanan her senaryo (ipucu kullanıldıysa ayrı işaretle) kanıt olarak kaydedilir; istemci doğrulamasıdır, sunucu kanıtı değildir ve kapı değildir.";
  function tanim(id, ad, sc, hedef, gorev, gozlem) {
    LAB.tanimlar = LAB.tanimlar || {};
    LAB.tanimlar[id] = { id: id, tip: "genel", ad: ad, etiket: ET, sc: sc, kontrol: LAB.genelKontrol, hedef: hedef, baslangic: "Her senaryoda durum tablosu ve sorular verilir; cevap alanları boştur.", gorev: gorev, gozlem: gozlem, kanit: KANIT,
      ipucu: "Önce tabloyu oku, sonra kuralı uygula; ipucu cezasızdır." };
  }
  /* Yola göre ayrı kimlik: ccna-* ve net-* aynı içeriği kendi kanıt kimliğiyle kaydeder */
  ["ccna", "net"].forEach(function (yol) {
    tanim(yol + "-vlan", "VLAN ve STP karar laboratuvarı", VLAN_SC, "VLAN erişimini, trunk'ın izinli listesini, kök köprü ve kök port seçimini hesaplamak.",
      "4 senaryoda soruları cevapla, 'Kontrol et'e bas.", "Kontrolden sonra alan bazlı doğru/yanlış ve nedeni gösterilir.");
    tanim(yol + "-nat", "NAT/PAT karar laboratuvarı", NAT_SC, "NAT/PAT'ın çıkışta kaynak adresi nasıl çevirdiğini, dönüşte tablodan nasıl eşlediğini ve kayıt yoksa ne olduğunu öğrenmek.",
      "4 senaryoda soruları cevapla, 'Kontrol et'e bas.", "Kontrolden sonra alan bazlı doğru/yanlış ve nedeni gösterilir.");
  });
})(typeof window !== "undefined" ? window : globalThis);

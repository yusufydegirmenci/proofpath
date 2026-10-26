"use strict";
/* ALAN: Ders > CCNA/ağ proje alıştırması, ev ağı karar lab'ı (PP.lab, tip 'genel'). NE YAPAR: Form tabanlı karar sorularının doğru cevabını saf hesaptan (güvenlik, havuz, PAT, sertleştirme) üretir; gerçek router yok, yerel simülasyondur.
   SORUN OLURSA: Arayüz ve kanıt kaydı lab-karar.js'te (kararPanel); o dosyadan SONRA yüklenir, PP.lab nesnesine kendini ekler; cevap sabiti elle yazılmaz, hesap değişirse sorular birlikte değişir.
   YENİ ÖZELLİK: Yeni karar sorusu bu dosyada hesap + kayıt olarak eklenir (lab-karar.js'in genel tipine bağlanır); tests/faz5b_ccna.js ve tests/faz5f_lab.js güncellenir. */
/* ---- Faz 20: Ev ağı karar lab'ı (proje: ev ağını kur) ----
   Form tabanlı karar lab'ı; tarayıcıda yerel simülasyon, gerçek router/Wi-Fi yok, başkasının ağına dokunulmaz. Kanıt kapı değildir (istemci doğrulaması).
   Doğru cevaplar saf hesaptan çıkar (en güçlü ortak güvenlik, havuz boyutu, PAT görünümü, sertleştirme kuralı); elle yazılmış sabit yok.
   Arayüz ve kanıt: lab-karar.js (tip "genel"). */
(function (g) {
  var PP = g.PP = g.PP || {}, LAB = PP.lab = PP.lab || {};
  var EH = [["evet", "Evet"], ["hayir", "Hayır"]];
  function hd(b) { return b ? "evet" : "hayir"; }

  /* ---- hesaplar ---- */
  var GUC = ["acik", "wep", "wpa2", "wpa3"]; /* zayıftan güçlüye */
  /* her cihaz kendi desteklediği en güçlü modda bağlanabilsin: hepsi wpa3 biliyorsa wpa3, hepsi en az wpa2 biliyor ve en az biri wpa3 biliyorsa geçiş kipi */
  function guvenlikModu(cihazlar) {
    var min = cihazlar.reduce(function (m, c) { return Math.min(m, GUC.indexOf(c.en)); }, GUC.length), maks = cihazlar.reduce(function (m, c) { return Math.max(m, GUC.indexOf(c.en)); }, 0);
    if (min >= GUC.indexOf("wpa3")) return "wpa3";
    if (min >= GUC.indexOf("wpa2")) return maks >= GUC.indexOf("wpa3") ? "gecis" : "wpa2";
    return "zayif";
  }
  function havuzBoyu(bas, son) { return son - bas + 1; }
  function cakisir(sabit, bas, son) { return sabit >= bas && sabit <= son; }
  /* PAT: iç cihazların hepsi aynı genel adresle görünür; tabloda kayıt/port yönlendirme yoksa gelen paket düşer */
  function disGorunum(genel, cihazlar) { return cihazlar.map(function () { return genel; }); }
  function gelenKabul(kayit, yonlendirme) { return !!(kayit || yonlendirme); }
  var KURAL = { yonetici: "degistir", wps: "kapat", uzak: "kapat", surum: "guncelle" };
  function eylem(oge) { return KURAL[oge]; }

  var CIHAZ = [{ ad: "Telefon", en: "wpa3" }, { ad: "Dizüstü", en: "wpa3" }, { ad: "Eski TV", en: "wpa2" }, { ad: "Yazıcı", en: "wpa2" }];
  var MOD_SEC = [["wpa3", "Yalnız WPA3"], ["gecis", "WPA2/WPA3 geçiş"], ["wpa2", "Yalnız WPA2"], ["wep", "WEP"], ["acik", "Açık ağ"]];
  var BAS = 100, SON = 199, SABIT = 20, CIHAZ_SAYISI = 12;
  var GENEL = "203.0.113.7", ICLER = [{ ad: "Telefon", ip: "192.168.1.101" }, { ad: "Dizüstü", ip: "192.168.1.102" }, { ad: "TV", ip: "192.168.1.103" }];
  var GOR = disGorunum(GENEL, ICLER);
  var GENEL_SEC = [[GENEL, GENEL + " (router'ın genel adresi)"], ["192.168.1.101", "192.168.1.101 (özel adres)"], ["192.168.1.1", "192.168.1.1 (ağ geçidi)"]];
  var BOY_SEC = function () { var b = havuzBoyu(BAS, SON); return Array.from(new Set([b - 1, b, b + 1, 254])).sort(function (a, c) { return a - c; }).map(function (n) { return [String(n), String(n)]; }); };
  var EYLEM_SEC = [["degistir", "Varsayılandan değiştir"], ["kapat", "Kapat"], ["guncelle", "Güncelle"], ["ac", "Aç"]];

  var SC = [
    { id: "s1", ozet: "Evde dört cihaz var; her birinin desteklediği en güçlü Wi-Fi güvenliği tabloda. Hangi mod seçilmeli ve WEP kabul edilebilir mi?",
      tabloAd: "Cihazlar", satirlar: CIHAZ.map(function (c) { return c.ad + "  en güçlü mod: " + c.en.toUpperCase(); }),
      alanlar: [{ ad: "mod", etiket: "Seçilecek güvenlik modu", sec: MOD_SEC }, { ad: "wep", etiket: "WEP kabul edilebilir mi?", sec: EH }],
      dogru: { mod: guvenlikModu(CIHAZ), wep: hd(false) },
      aciklama: "Telefon ve dizüstü WPA3 biliyor, ama TV ve yazıcı yalnız WPA2 biliyor: yalnız WPA3 seçilirse eski cihazlar bağlanamaz. WPA2/WPA3 geçiş kipi her cihazın kendi desteklediği en güçlü modda bağlanmasını sağlar. WEP kolay kırıldığı için hiçbir durumda kabul edilmez.",
      ipucu: "Önce tüm cihazların ortak desteklediği en güçlü modu bul; sonra bunun en az bir cihazın daha güçlüsünü kısıtlayıp kısıtlamadığına bak.",
      ipucu2: "Tabloda iki cihaz WPA3, iki cihaz WPA2. Yalnız WPA3 seçersen hangi cihazlar dışarıda kalır? Yalnız WPA2 seçersen WPA3 destekleyen cihazlar neyi kaybeder? İki grubu birlikte barındıran mod hangisi?",
      ipucu3: "En düşük ortak mod: " + (CIHAZ.some(function (c) { return c.en === "wpa2"; }) ? "WPA2" : "WPA3") + ". En yüksek mod WPA3. Düşük ve yüksek farklıysa, ikisini birlikte yürüten geçiş kipini seç. WEP için güvenlik düzeyine bak: kırılması kolay mı?" },
    { id: "s2", ozet: "192.168.1.0/24 ev ağında DHCP havuzu " + BAS + "-" + SON + " (uçlar dahil). Yazıcı için sabit adres 192.168.1." + SABIT + " verilecek. Havuzda kaç adres var ve sabit adres havuzla çakışır mı?",
      tabloAd: "Plan", satirlar: ["Ağ: 192.168.1.0/24, ağ geçidi 192.168.1.1", "DHCP havuzu: 192.168.1." + BAS + " - 192.168.1." + SON, "Yazıcı (sabit): 192.168.1." + SABIT, "Ağdaki cihaz sayısı: " + CIHAZ_SAYISI],
      alanlar: [{ ad: "adet", etiket: "Havuzdaki adres sayısı", sec: BOY_SEC() }, { ad: "cakisma", etiket: "Yazıcının sabit adresi havuzla çakışır mı?", sec: EH }, { ad: "yeter", etiket: "Havuz " + CIHAZ_SAYISI + " cihaza yeter mi?", sec: EH }],
      dogru: { adet: String(havuzBoyu(BAS, SON)), cakisma: hd(cakisir(SABIT, BAS, SON)), yeter: hd(havuzBoyu(BAS, SON) >= CIHAZ_SAYISI) },
      aciklama: "Havuz büyüklüğü son eksi baş artı bir: " + SON + " - " + BAS + " + 1 = " + havuzBoyu(BAS, SON) + ". Sabit adres " + SABIT + " bu aralığın dışında olduğu için çakışmaz; sabit adresler havuz dışında tutulmalıdır. " + havuzBoyu(BAS, SON) + " adres " + CIHAZ_SAYISI + " cihaza fazlasıyla yeter.",
      ipucu: "Havuzun adet sayısını bulurken iki uç adresi de say; sonra sabit adresin bu aralığa düşüp düşmediğine bak.",
      ipucu2: "Uç dahil sayıda son eksi baş sayısına bir eklenir. Sabit adres baş ile son arasındaysa çakışır. Cihaz sayısını adet ile karşılaştır.",
      ipucu3: "Baş " + BAS + ", son " + SON + ", sabit " + SABIT + ", cihaz " + CIHAZ_SAYISI + ". Hesap: son - baş + 1; sabit adres aralığın içinde mi; adet >= cihaz mı." },
    { id: "s3", ozet: "Üç ev cihazı router'ın PAT'ı arkasından internete çıkıyor. Dışarıdaki bir sunucu bu cihazları hangi adresle görür? Ayrıca dışarıdan, NAT tablosunda kaydı olmayan ve port yönlendirme tanımsız bir paket gelirse kabul edilir mi?",
      tabloAd: "Ev cihazları", satirlar: ICLER.map(function (c) { return c.ad + "  " + c.ip; }).concat(["Router genel adresi: " + GENEL, "NAT tablosunda kayıt: yok", "Port yönlendirme: yok"]),
      alanlar: [{ ad: "gorunen", etiket: "Dışarıdaki sunucu cihazları hangi adresle görür?", sec: GENEL_SEC }, { ad: "kabul", etiket: "Kaydı olmayan gelen paket kabul edilir mi?", sec: EH }],
      dogru: { gorunen: GOR[0], kabul: hd(gelenKabul(false, false)) },
      aciklama: "PAT özel adresleri router'ın tek genel adresi arkasına saklar: dışarıya hepsi " + GENEL + " olarak görünür, cihazları birbirinden port numaraları ayırır. Gelen paket için tabloda eşleşen kayıt ve tanımlı bir port yönlendirme yoksa router hangi iç cihaza vereceğini bilemez ve paketi düşürür.",
      ipucu: "Özel adresler internette yönlendirilmez; dışarıya çıkarken ne olur? Gelen pakete karşılık gelen bir giden bağlantı var mı?",
      ipucu2: "PAT'ta kaç genel adres kullanılır? Router gelen paketi hangi tabloya bakarak iç cihaza verir? Tabloda kayıt yoksa ve yönlendirme de yoksa ne yapabilir?",
      ipucu3: "Genel adres: " + GENEL + ". Tablo kaydı: yok. Yönlendirme: yok. Hem kayıt hem yönlendirme yoksa paket hiçbir cihaza eşlenemez." },
    { id: "s4", ozet: "Yeni alınan ev router'ının dört ayarı için doğru eylemi seç.",
      tabloAd: "Ayarlar", satirlar: ["Yönetici parolası: fabrika varsayılanı", "WPS PIN yöntemi: açık", "Uzaktan yönetim (internetten): açık", "Yazılım sürümü: eski, güncelleme var"],
      alanlar: [{ ad: "yonetici", etiket: "Yönetici parolası", sec: EYLEM_SEC }, { ad: "wps", etiket: "WPS PIN", sec: EYLEM_SEC }, { ad: "uzak", etiket: "Uzaktan yönetim", sec: EYLEM_SEC }, { ad: "surum", etiket: "Yazılım sürümü", sec: EYLEM_SEC }],
      dogru: { yonetici: eylem("yonetici"), wps: eylem("wps"), uzak: eylem("uzak"), surum: eylem("surum") },
      aciklama: "Varsayılan yönetici parolası herkesçe bilinir: değiştirilir. WPS PIN yöntemi zayıflıklarıyla bilinir: kullanılmayacaksa kapatılır. Uzaktan yönetim gerekmedikçe kapalı olmalıdır, açık yönetim sayfası saldırı yüzeyidir. Eski yazılım bilinen açıklar taşır: güncellenir.",
      ipucu: "Her ayar için sor: bu ayar saldırı yüzeyi mi, bilinen bir zayıflık mı, yoksa eskimiş yazılım mı?",
      ipucu2: "Varsayılan parola herkesçe bilinir. PIN yöntemi tasarım zayıflığı taşır. Uzaktan yönetim ev kullanıcısı için genelde gereksizdir. Eski sürümde yama olabilir.",
      ipucu3: "Eşleştirme: bilinen parola -> değiştir; zayıf yöntem -> kapat; gereksiz açık servis -> kapat; eski sürüm -> güncelle." }
  ];

  LAB.evag = { guvenlikModu: guvenlikModu, havuzBoyu: havuzBoyu, cakisir: cakisir, disGorunum: disGorunum, gelenKabul: gelenKabul, SC: SC };

  var ET = "Yerel simülasyon · form tabanlı karar, gerçek router ve Wi-Fi yok";
  var KANIT = "Doğrulanan her senaryo (ipucu kullanıldıysa ayrı işaretle) kanıt olarak kaydedilir; istemci doğrulamasıdır, sunucu kanıtı değildir ve kapı değildir.";
  LAB.tanimlar = LAB.tanimlar || {};
  LAB.tanimlar["ccna-evag"] = { id: "ccna-evag", tip: "genel", ad: "Ev ağı karar laboratuvarı", etiket: ET, sc: SC, kontrol: LAB.genelKontrol,
    hedef: "Ev ağı için kablosuz güvenlik modunu seçmek, DHCP havuzunu planlamak, PAT arkasındaki görünümü ve gelen paketin akıbetini söylemek ve router sertleştirme eylemlerini seçmek.",
    baslangic: "Her senaryoda durum tablosu ve sorular verilir; cevap alanları boştur.", gorev: "4 senaryoda soruları cevapla, 'Kontrol et'e bas.", gozlem: "Kontrolden sonra alan bazlı doğru/yanlış ve nedeni gösterilir.", kanit: KANIT,
    ipucu: "Önce tabloyu oku, sonra kuralı uygula; ipucu cezasızdır." };
})(typeof window !== "undefined" ? window : globalThis);

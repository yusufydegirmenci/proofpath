"use strict";
/* ALAN: Ders > CCNA/ağ, OSPF ve DHCP karar lab'ları. NE YAPAR: Maliyet, yol toplamı, komşuluk ayarı, DR seçimi, havuz kapasitesi, aktarma ulaşımı ve adres sınıfı sorularını saf hesapla üretir; yerel simülasyon, gerçek cihaz yok.
   SORUN OLURSA: Arayüz ve kanıt lab-karar.js'te (tip 'genel'), PP.lab.altag çağrı anında ders-eki.js'ten okunur; cevap sabiti elle yazılmaz; lab-karar.js'ten SONRA yüklenir.
   YENİ ÖZELLİK: Yeni soru hesap fonksiyonu olarak buraya eklenip genel tipe kaydedilir; tests/faz5f_lab.js (OSPF/DHCP) güncellenir. */
/* ---- Faz 5 tur 6: OSPF ve DHCP karar lab'ları (M§8.2) ----
   Form tabanlı karar lab'ı; tarayıcıda yerel simülasyon, gerçek router/DHCP sunucusu yok. Kanıt kapı değildir (istemci doğrulaması).
   Doğru cevaplar saf hesaptan (maliyet, yol toplamı, komşuluk ayarı karşılaştırması, DR seçimi, havuz kapasitesi, aktarma ulaşımı, adres sınıfı) çıkar;
   elle yazılmış cevap sabiti yok. Arayüz ve kanıt: lab-karar.js (tip "genel"). Alt ağ hesabı ders-eki.js'ten (PP.lab.altag) çağrı anında okunur. */
(function (g) {
  var PP = g.PP = g.PP || {}, LAB = PP.lab = PP.lab || {};
  var EH = [["evet", "Evet"], ["hayir", "Hayır"]];
  function hd(b) { return b ? "evet" : "hayir"; }
  function ipn(s) { return LAB.altag.ipAyir(s); }
  function agOf(ip, onek) { return LAB.altag.hesapla(ip, onek).ag; }

  /* ---- OSPF hesapları ---- */
  /* maliyet = referans bant genişliği / arayüz bant genişliği (Mb/s), tam sayıya aşağı yuvarlanır, en az 1 */
  function maliyet(ref, bw) { return Math.max(1, Math.floor(ref / bw)); }
  function yolMaliyet(ref, yol) { return yol.reduce(function (t, l) { return t + maliyet(ref, l.bw); }, 0); }
  /* yollar: {ad: [{hat, bw}]} → en düşük toplam maliyetli yolun adı (eşitlikte sözlük sırası, senaryolarda eşitlik yok) */
  function enIyiYol(ref, yollar) {
    return Object.keys(yollar).sort().reduce(function (en, k) { return en == null || yolMaliyet(ref, yollar[k]) < yolMaliyet(ref, yollar[en]) ? k : en; }, null);
  }
  function enAzAtlama(yollar) {
    return Object.keys(yollar).sort().reduce(function (en, k) { return en == null || yollar[k].length < yollar[en].length ? k : en; }, null);
  }
  /* iki arayüzün komşuluk için eşleşmesi gereken ayarları: alan, hello, dead, alt ağ; uyuşmayanların listesi */
  function komsuEngel(a, b) {
    var m = [];
    if (a.area !== b.area) m.push("area");
    if (a.hello !== b.hello) m.push("hello");
    if (a.dead !== b.dead) m.push("dead");
    if (agOf(a.ip, a.onek) !== agOf(b.ip, b.onek)) m.push("ag");
    return m;
  }
  /* yayın ağında DR/BDR: öncelik 0 olan aday değildir; en yüksek öncelik, eşitse en yüksek router kimliği (RID) kazanır; sonraki BDR olur */
  function drSec(liste) {
    var u = liste.filter(function (r) { return r.oncelik > 0; }).sort(function (a, b) { return b.oncelik - a.oncelik || ipn(b.rid) - ipn(a.rid); });
    return { dr: u[0] ? u[0].ad : null, bdr: u[1] ? u[1].ad : null };
  }

  var REF = 100;
  var ARAY = [{ k: "fa", ad: "FastEthernet", bw: 100 }, { k: "gi", ad: "GigabitEthernet", bw: 1000 }, { k: "eth", ad: "Ethernet (10 Mb/s)", bw: 10 }];
  var SAYI = [["0", "0"], ["1", "1"], ["10", "10"], ["100", "100"]];
  var YOLLAR = {
    A: [{ hat: "R1 → R2", bw: 10 }, { hat: "R2 → R4", bw: 100 }],
    B: [{ hat: "R1 → R3", bw: 100 }, { hat: "R3 → R5", bw: 100 }, { hat: "R5 → R4", bw: 100 }]
  };
  var tA = yolMaliyet(REF, YOLLAR.A), tB = yolMaliyet(REF, YOLLAR.B), iyi = enIyiYol(REF, YOLLAR);
  var toplamSec = Array.from(new Set([tA, tB, tA + tB, YOLLAR.B.length])).sort(function (a, b) { return a - b; }).map(function (n) { return [String(n), String(n)]; });
  var R1 = { ip: "10.0.12.1", onek: 24, area: 0, hello: 10, dead: 40 }, R2 = { ip: "10.0.12.2", onek: 24, area: 1, hello: 10, dead: 40 };
  var engel = komsuEngel(R1, R2);
  var DR_LISTE = [{ ad: "R1", oncelik: 1, rid: "10.0.0.1" }, { ad: "R2", oncelik: 1, rid: "10.0.0.2" }, { ad: "R3", oncelik: 0, rid: "10.0.0.9" }, { ad: "R4", oncelik: 1, rid: "10.0.0.4" }];
  var dr = drSec(DR_LISTE), rSec = DR_LISTE.map(function (r) { return [r.ad, r.ad]; });
  function ridOf(ad) { return DR_LISTE.filter(function (r) { return r.ad === ad; })[0].rid; }
  function toplamMetin(k) { return YOLLAR[k].map(function (l) { return maliyet(REF, l.bw); }).join(" + ") + " = " + yolMaliyet(REF, YOLLAR[k]); }
  var ENG_AD = { area: "Alan (area) numarası", hello: "Hello süresi", dead: "Dead süresi", ag: "Alt ağ / maske" };
  var ENG_SEC = Object.keys(ENG_AD).map(function (k) { return [k, ENG_AD[k]]; }).concat([["yok", "Hiçbiri (komşuluk kurulur)"]]);

  var OSPF_SC = [
    { id: "s1", ozet: "Referans bant genişliği varsayılan " + REF + " Mb/s. Üç arayüzün OSPF maliyetini (cost) bul. Gigabit ile FastEthernet'in maliyeti aynı mı çıktı?",
      tabloAd: "Arayüzler", satirlar: ["Referans bant genişliği: " + REF + " Mb/s"].concat(ARAY.map(function (a) { return a.ad + "  " + a.bw + " Mb/s"; })),
      alanlar: ARAY.map(function (a) { return { ad: a.k, etiket: a.ad + " maliyeti", sec: SAYI }; }).concat([{ ad: "ayni", etiket: "Gigabit ile FastEthernet'in maliyeti aynı mı?", sec: EH }]),
      dogru: { fa: String(maliyet(REF, 100)), gi: String(maliyet(REF, 1000)), eth: String(maliyet(REF, 10)), ayni: hd(maliyet(REF, 1000) === maliyet(REF, 100)) },
      aciklama: "Maliyet = referans bant genişliği / arayüz bant genişliği, en az 1: FastEthernet 100/100 = 1, Ethernet 100/10 = 10, Gigabit 100/1000 = 0,1 → 1. Varsayılan referansla hızlı bağlantılar birbirinden ayrılamaz; bu yüzden gerçek ağlarda referans bant genişliği yükseltilir (Cisco IOS'ta auto-cost reference-bandwidth).",
      ipucu: "Maliyeti bölme ile hesapla. Sonuç 1'den küçükse OSPF 1 kullanır; 0 olamaz.",
      ipucu2: "Tablodaki referans bant genişliğini (" + REF + " Mb/s) her arayüzün hızına böl: " + ARAY.map(function (a) { return a.ad + " için " + REF + " / " + a.bw; }).join(", ") + ". Sonuçları tam sayıya aşağı yuvarla.",
      ipucu3: "Gigabit için " + REF + " / " + ARAY[1].bw + " işlemini yap: sonuç 1'in altındaysa OSPF onu hangi değere çıkarır? FastEthernet ve Ethernet için aynı bölmeyi kendin yap. Üç maliyeti yazınca son soruda Gigabit ile FastEthernet'i karşılaştır." },
    { id: "s2", ozet: "R1'den hedef ağa iki yol var. Maliyet = her hattın çıkış arayüzü maliyetlerinin toplamı (referans " + REF + " Mb/s). OSPF hangi yolu seçer ve toplam maliyet kaç? En az atlamalı yol seçilir mi?",
      tabloAd: "Yollar", satirlar: Object.keys(YOLLAR).map(function (k) { return "Yol " + k + ": " + YOLLAR[k].map(function (l) { return l.hat + " (" + l.bw + " Mb/s)"; }).join(", "); }),
      alanlar: [{ ad: "yol", etiket: "Seçilen yol", sec: Object.keys(YOLLAR).map(function (k) { return [k, "Yol " + k]; }) }, { ad: "toplam", etiket: "Seçilen yolun toplam maliyeti", sec: toplamSec }, { ad: "atlama", etiket: "Seçilen yol en az atlamalı yol mu?", sec: EH }],
      dogru: { yol: iyi, toplam: String(yolMaliyet(REF, YOLLAR[iyi])), atlama: hd(iyi === enAzAtlama(YOLLAR)) },
      aciklama: "Yol A: " + toplamMetin("A") + ", Yol B: " + toplamMetin("B") + ". OSPF atlama sayısına değil toplam maliyete bakar; daha çok atlamalı ama hızlı hatlardan geçen Yol " + iyi + " seçilir.",
      ipucu: "Her hat için maliyeti ayrı hesapla, yol başına topla, en küçüğü seç. Atlama sayısı seçimi belirlemez.",
      ipucu2: "Tablodaki iki yolun her hattını ayrı ayrı al ve hız sütununu " + REF + " Mb/s referansa böl. Sonra her yolun hat maliyetlerini topla. Atlama sorusu için yolların hat sayısını say.",
      ipucu3: "Hat maliyetleri: " + Object.keys(YOLLAR).map(function (k) { return "Yol " + k + " = " + YOLLAR[k].map(function (l) { return maliyet(REF, l.bw); }).join(" + "); }).join("; ") + ". Toplamları hesapla, küçüğü seç. Hat sayıları: " + Object.keys(YOLLAR).map(function (k) { return "Yol " + k + " " + YOLLAR[k].length; }).join(", ") + "; seçtiğin yolun hat sayısının en küçük olup olmadığına bak." },
    { id: "s3", ozet: "R1 ve R2 aynı alt ağdaki arayüzlerinde OSPF çalıştırıyor. Komşuluk kurulur mu? Kurulmuyorsa hangi ayar uyuşmuyor?",
      tabloAd: "Arayüz ayarları", satirlar: [["R1", R1], ["R2", R2]].map(function (x) { return x[0] + "  " + x[1].ip + "/" + x[1].onek + "  area " + x[1].area + "  hello " + x[1].hello + "  dead " + x[1].dead; }),
      alanlar: [{ ad: "komsu", etiket: "Komşuluk kurulur mu?", sec: EH }, { ad: "engel", etiket: "Uyuşmayan ayar", sec: ENG_SEC }],
      dogru: { komsu: hd(engel.length === 0), engel: engel[0] || "yok" },
      aciklama: "Komşuluk için alan numarası, hello/dead süreleri ve alt ağ eşleşmelidir. Burada R1 alan 0, R2 alan 1'dedir; diğer ayarlar aynıdır, bu yüzden komşuluk kurulmaz.",
      ipucu: "İki satırı sütun sütun karşılaştır: alan, hello, dead ve aynı alt ağ. Yalnız farklı olan sütun engeldir.",
      ipucu2: "R1 ve R2 satırlarını yan yana koy ve sırayla dört sütunu karşılaştır: area, hello, dead ve ip/önek. İki satırda farklı çıkan sütun komşuluğu engeller.",
      ipucu3: "Hello: " + R1.hello + " ve " + R2.hello + ". Dead: " + R1.dead + " ve " + R2.dead + ". Alt ağ: " + agOf(R1.ip, R1.onek) + "/" + R1.onek + " ve " + agOf(R2.ip, R2.onek) + "/" + R2.onek + ". Alan: " + R1.area + " ve " + R2.area + ". Dört sütunu sırayla karşılaştır; hangisinde fark olduğunu bul ve komşuluk sorusunu buna göre kapat." },
    { id: "s4", ozet: "Aynı Ethernet segmentinde dört router var ve hepsi aynı anda açıldı (mevcut DR yok). Hangisi DR, hangisi BDR olur? Öncelik 0 olan router seçime girer mi?",
      tabloAd: "Router öncelikleri", satirlar: DR_LISTE.map(function (r) { return r.ad + "  öncelik " + r.oncelik + "  router kimliği " + r.rid; }),
      alanlar: [{ ad: "dr", etiket: "DR", sec: rSec }, { ad: "bdr", etiket: "BDR", sec: rSec }, { ad: "sifir", etiket: "Öncelik 0 olan router seçime girer mi?", sec: EH }],
      dogru: { dr: dr.dr, bdr: dr.bdr, sifir: hd(DR_LISTE.some(function (r) { return r.oncelik === 0 && (dr.dr === r.ad || dr.bdr === r.ad); })) },
      aciklama: "Önce en yüksek öncelik, eşitse en yüksek router kimliği kazanır; öncelik 0 olan router aday olamaz. R3'ün kimliği en yüksek olsa da önceliği 0'dır. Kalan üçünde öncelik eşit: DR " + dr.dr + " (" + ridOf(dr.dr) + "), BDR " + dr.bdr + " (" + ridOf(dr.bdr) + "). Gerçek ağda DR seçimi kesintiye uğramaz: sonradan gelen yüksek öncelikli router mevcut DR'yi devirmez.",
      ipucu: "Önce öncelik 0 olanları ele. Kalanları öncelikten, eşitse router kimliğinden büyükten küçüğe sırala; ilk DR, ikinci BDR.",
      ipucu2: "Tablonun öncelik sütununa bak: öncelik 0 olan router seçime girmez, onu listeden çıkar. Kalanların önceliklerini karşılaştır; eşitlerde router kimliğine bak (en büyük olan kazanır).",
      ipucu3: "Elenen: " + DR_LISTE.filter(function (r) { return r.oncelik === 0; }).map(function (r) { return r.ad; }).join(", ") + ". Kalanlar: " + DR_LISTE.filter(function (r) { return r.oncelik > 0; }).map(function (r) { return r.ad + " (öncelik " + r.oncelik + ", " + r.rid + ")"; }).join("; ") + ". Öncelikler eşitse router kimliği büyük olan öne geçer; sıralamada birinciyi DR, ikinciyi BDR yaz." }
  ];

  /* ---- DHCP hesapları ---- */
  var DORA = [{ ad: "DISCOVER", kim: "istemci", ne: "'IP veren var mı?' (yayın)" }, { ad: "OFFER", kim: "sunucu", ne: "'Sana 192.168.10.50 var'" }, { ad: "REQUEST", kim: "istemci", ne: "'Tamam, onu istiyorum'" }, { ad: "ACK", kim: "sunucu", ne: "'Kiralandı'" }];
  var KARISIK = [3, 0, 2, 1]; /* A: ACK, B: DISCOVER, C: REQUEST, D: OFFER */
  var HARF = ["A", "B", "C", "D"];
  function harfOf(adim) { return HARF[KARISIK.indexOf(adim)]; }
  /* kullanılabilir kira adresi = alt ağdaki host sayısı - havuzdan çıkarılan adresler */
  function havuz(ip, onek, dislanan) { return LAB.altag.hesapla(ip, onek).host - dislanan; }
  /* istemcinin yayın isteği sunucuya ulaşır mı: aynı ağdaysa ya da istemci tarafındaki arayüzde aktarma (relay) varsa */
  function discoverUlasir(istemciIp, istemciOnek, sunucuIp, sunucuOnek, relay) {
    return agOf(istemciIp, istemciOnek) === agOf(sunucuIp, sunucuOnek) || !!relay;
  }
  /* kira alan, APIPA (169.254.0.0/16) ya da statik */
  function adresSinifi(c) {
    if (!c.dhcp) return "statik";
    return agOf(c.ip, 16) === "169.254.0.0" ? "apipa" : "dhcp";
  }

  var DHCP_ADRES = "192.168.10.0", DHCP_ONEK = 24, DISLANAN = 20, CIHAZ = 250;
  var kapasite = havuz(DHCP_ADRES, DHCP_ONEK, DISLANAN), HOST = LAB.altag.hesapla(DHCP_ADRES, DHCP_ONEK).host;
  var KAP_SEC = function () { var h0 = LAB.altag.hesapla(DHCP_ADRES, DHCP_ONEK); return Array.from(new Set([h0.host, h0.blok, kapasite, kapasite + 1])).sort(function (a, b) { return a - b; }).map(function (n) { return [String(n), String(n)]; }); };
  var CLI = [{ ad: "PC-A", ip: "169.254.33.8", dhcp: true, ek: "DHCP etkin, kira yok" }, { ad: "PC-B", ip: "192.168.10.45", dhcp: true, ek: "DHCP etkin, kira alındı (sunucu 192.168.10.2)" }, { ad: "PC-C", ip: "10.1.1.9", dhcp: false, ek: "DHCP kapalı, elle girilmiş" }];
  var SINIF_SEC = [["dhcp", "DHCP'den adres aldı"], ["apipa", "APIPA: DHCP yanıtı alamadı"], ["statik", "Statik (elle)"]];

  var DHCP_SC = [
    { id: "s1", ozet: "Yeni bağlanan istemcinin DHCP mesajları aşağıda karışık sırada. Her adımda hangi mesaj (A-D) gider? (1: istemci ilk soruyu sorar, 4: sunucu kirayı onaylar)",
      tabloAd: "Mesajlar (karışık sırada)", satirlar: KARISIK.map(function (k, i) { return HARF[i] + ": " + DORA[k].kim + " → " + DORA[k].ne; }),
      alanlar: [0, 1, 2, 3].map(function (n) { return { ad: "m" + (n + 1), etiket: (n + 1) + ". adım", sec: HARF.map(function (x) { return [x, x]; }) }; }),
      dogru: { m1: harfOf(0), m2: harfOf(1), m3: harfOf(2), m4: harfOf(3) },
      aciklama: "DORA: Discover (istemci arar, yayın) → Offer (sunucu adres önerir) → Request (istemci öneriyi ister) → Acknowledge (sunucu kirayı onaylar). İstemcinin henüz adresi olmadığı için ilk mesaj yayın olarak gider.",
      ipucu: "DORA'nın harflerini sırala: D, O, R, A. Hangi mesajı kim gönderir: istemci mi sunucu mu? İlk mesajı kimin atabileceğini düşün.",
      ipucu2: "Tabloda her harfin yanındaki gönderen (istemci veya sunucu) ve tırnak içindeki cümleye bak. DORA sırasında istemci, sunucu, istemci, sunucu şeklinde dönüşümlü gider; hangi cümlenin sırada kaçıncı olduğunu bul.",
      ipucu3: "Gönderen sırası: " + DORA.map(function (d) { return d.kim; }).join(", ") + ". Tablodaki dört cümleyi DORA'nın " + DORA.map(function (d) { return d.ad; }).join(", ") + " sırasıyla kendin eşleştir (önce kimin gönderdiğine, sonra cümlenin anlamına bak) ve harflerini dört adıma yaz." },
    { id: "s2", ozet: DHCP_ADRES + "/" + DHCP_ONEK + " ağında DHCP havuzundan ilk " + DISLANAN + " adres (ağ geçidi, sunucular, yazıcılar) çıkarıldı. Ağda " + CIHAZ + " cihaz var. Kiralanabilir adres sayısı kaç ve havuz yeter mi?",
      tabloAd: "Havuz", satirlar: ["Ağ: " + DHCP_ADRES + "/" + DHCP_ONEK, "Havuzdan çıkarılan adres: " + DISLANAN, "Cihaz sayısı: " + CIHAZ],
      alanlar: [{ ad: "adet", etiket: "Kiralanabilir adres sayısı", sec: KAP_SEC() }, { ad: "yeter", etiket: "Havuz " + CIHAZ + " cihaza yeter mi?", sec: EH }],
      dogru: { adet: String(kapasite), yeter: hd(kapasite >= CIHAZ) },
      aciklama: "/" + DHCP_ONEK + " ağda " + HOST + " kullanılabilir host adresi vardır (blok boyutu - ağ ve yayın adresleri). " + DISLANAN + " tanesi çıkarılınca " + kapasite + " kalır; " + CIHAZ + " cihaza yetmez, " + (CIHAZ - kapasite) + " cihaz adres alamaz (APIPA adresiyle kalır). Çözüm: havuzu büyütmek, kira süresini kısaltmak ya da ağı bölmek.",
      ipucu: "Önce alt ağdaki toplam host sayısını bul (2^(32-önek) - 2), sonra çıkarılanları düş, sonra cihaz sayısıyla karşılaştır.",
      ipucu2: "Tablodaki /" + DHCP_ONEK + " önekinden host bitlerini bul (32 - " + DHCP_ONEK + " = " + (32 - DHCP_ONEK) + "). Toplam adres 2 üzeri bu sayıdır; ağ ve yayın adresi kullanılamaz, onları çıkar.",
      ipucu3: "Kullanılabilir host sayısı " + HOST + ". Buradan havuzdan çıkarılan " + DISLANAN + " adresi düş; kalan sayıyı " + CIHAZ + " cihazla karşılaştır. Bu fark sorunun iki alanını da belirler." },
    { id: "s3", ozet: "PC (192.168.20.0/24) ağındaki istemci DHCP sunucusu 10.0.0.5 (10.0.0.0/24) için DISCOVER yayınlıyor. Aralarındaki router'ın istemci arayüzünde aktarma (relay) ayarı yok. Yayın sunucuya ulaşır mı? Doğru çözüm hangisi?",
      tabloAd: "Topoloji", satirlar: ["İstemci ağı: 192.168.20.0/24 (router Gi0/1: 192.168.20.1)", "DHCP sunucusu: 10.0.0.5/24 (router Gi0/2 tarafında)", "Router Gi0/1: ip helper-address yok"],
      alanlar: [{ ad: "ulasir", etiket: "DISCOVER sunucuya ulaşır mı?", sec: EH }, { ad: "cozum", etiket: "Doğru çözüm", sec: [["helper", "İstemci tarafındaki arayüze (Gi0/1) ip helper-address 10.0.0.5"], ["sunucu", "Sunucu tarafındaki arayüze (Gi0/2) ip helper-address 192.168.20.1"], ["statik", "Tüm istemcilere statik adres girmek"]] }],
      dogru: { ulasir: hd(discoverUlasir("192.168.20.10", 24, "10.0.0.5", 24, false)), cozum: "helper" },
      aciklama: "DISCOVER bir yayındır ve router yayınları varsayılan olarak iletmez; farklı ağdaki sunucuya ulaşmaz. Çözüm istemcinin yayınını alan arayüzde aktarma ayarıdır (ip helper-address): router yayını sunucuya tekil (unicast) iletir ve istemcinin ağını bildirir (giaddr), sunucu doğru havuzdan adres verir. Statik adres de çalışır ama DHCP'nin amacını ortadan kaldırır.",
      ipucu: "DISCOVER yayını router'ın hangi arayüzüne girer ve router yayınlarla varsayılan olarak ne yapar?",
      ipucu2: "Tablodaki iki ağı ve router arayüzlerini oku: istemciler 192.168.20.0/24, sunucu 10.0.0.5/24 (farklı ağlar). Router Gi0/1 satırında 'ip helper-address yok' yazıyor. Aktarma ayarı hangi arayüzde yapılmalı: yayının girdiği arayüzde mi, çıktığı arayüzde mi? Komuta hangi adres yazılır?",
      ipucu3: "İlk soru için istemci ağı ile sunucu ağını ve router'ın yayın paketlerine yaklaşımını karşılaştır. Çözüm seçeneklerini iki ölçütle ele: (1) komut yayını alan arayüze mi yazılmış, (2) komutta verilen adres yayının gitmesi gereken yer mi? Statik adres seçeneğinin DHCP'nin amacına uyup uymadığını da düşün." },
    { id: "s4", ozet: "Üç bilgisayarın ipconfig özeti aşağıda. Her biri için adresin kaynağını belirle.",
      tabloAd: "ipconfig özeti", satirlar: CLI.map(function (c) { return c.ad + "  " + c.ip + "  " + c.ek; }),
      alanlar: CLI.map(function (c) { return { ad: c.ad.toLowerCase().replace("-", ""), etiket: c.ad + " adres kaynağı", sec: SINIF_SEC }; }),
      dogru: { pca: adresSinifi(CLI[0]), pcb: adresSinifi(CLI[1]), pcc: adresSinifi(CLI[2]) },
      aciklama: "169.254.0.0/16 (APIPA, link-local) adresi, DHCP etkin olduğu hâlde sunucudan yanıt alınamayınca istemcinin kendi kendine seçtiği adrestir: PC-A DHCP sunucusuna ulaşamamıştır (sunucu, kablo/VLAN ya da relay sorunu). PC-B kira almıştır. PC-C'de DHCP kapalıdır; adresi elle girilmiştir.",
      ipucu: "Önce DHCP etkin mi kapalı mı? Etkinse adres 169.254 ile mi başlıyor?",
      ipucu2: "Her satırın 'ek' bölümünü oku (DHCP etkin mi, kira var mı, elle mi girilmiş) ve IP'nin ilk iki sekizlisine bak. 169.254 ile başlayan adres özel bir link-local aralığıdır.",
      ipucu3: "Kural: DHCP kapalıysa adres elle girilmiştir; DHCP etkin ve adres 169.254.0.0/16 aralığındaysa istemci sunucudan yanıt alamamıştır; DHCP etkin ve adres başka bir aralıktaysa sunucudan alınmış kiradır. Her bilgisayar için DHCP durumuna ve adresin ilk iki sekizlisine bakıp kuralı kendin uygula." }
  ];

  LAB.ospf = { maliyet: maliyet, yolMaliyet: yolMaliyet, enIyiYol: enIyiYol, enAzAtlama: enAzAtlama, komsuEngel: komsuEngel, drSec: drSec, SC: OSPF_SC };
  LAB.dhcp = { havuz: havuz, discoverUlasir: discoverUlasir, adresSinifi: adresSinifi, DORA: DORA, SC: DHCP_SC };

  var ET_O = "Yerel simülasyon · form tabanlı karar, gerçek router yok";
  var ET_D = "Yerel simülasyon · form tabanlı karar, gerçek router ve DHCP sunucusu yok";
  var KANIT = "Doğrulanan her senaryo (ipucu kullanıldıysa ayrı işaretle) kanıt olarak kaydedilir; istemci doğrulamasıdır, sunucu kanıtı değildir ve kapı değildir.";
  function tanim(id, ad, et, sc, hedef, gorev, gozlem) {
    LAB.tanimlar = LAB.tanimlar || {};
    LAB.tanimlar[id] = { id: id, tip: "genel", ad: ad, etiket: et, sc: sc, kontrol: LAB.genelKontrol, hedef: hedef, baslangic: "Her senaryoda durum tablosu ve sorular verilir; cevap alanları boştur.", gorev: gorev, gozlem: gozlem, kanit: KANIT,
      ipucu: "Önce tabloyu oku, sonra kuralı uygula; ipucu cezasızdır." };
  }
  /* Yola göre ayrı kimlik: ccna-* ve net-* aynı içeriği kendi kanıt kimliğiyle kaydeder (eski ortak kayıt yok) */
  ["ccna", "net"].forEach(function (yol) {
    tanim(yol + "-ospf", "OSPF karar laboratuvarı", ET_O, OSPF_SC, "OSPF maliyetini hesaplamak, en düşük maliyetli yolu seçmek, komşuluğu engelleyen ayarı bulmak ve DR/BDR seçimini yapmak.",
      "4 senaryoda soruları cevapla, 'Kontrol et'e bas.", "Kontrolden sonra alan bazlı doğru/yanlış ve nedeni gösterilir.");
    tanim(yol + "-dhcp", "DHCP karar laboratuvarı", ET_D, DHCP_SC, "DORA sırasını, havuz kapasitesini, aktarma (relay) gereğini ve istemcinin adres kaynağını (DHCP, APIPA, statik) belirlemek.",
      "4 senaryoda soruları cevapla, 'Kontrol et'e bas.", "Kontrolden sonra alan bazlı doğru/yanlış ve nedeni gösterilir.");
  });
})(typeof window !== "undefined" ? window : globalThis);

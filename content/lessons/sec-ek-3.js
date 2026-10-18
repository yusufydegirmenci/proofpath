/* Siber güvenlik yolu · Faz 5 tur 4 devamı: yeni dersler için ek girdileri (anahtar = TMAP.sec dizini 35-38; bunlar ders no 39-42'ye karşılık gelir, ders no = anahtar + 4).
   Her girdi benzetme ve sınırı, rehberli alıştırma, bağımsız görev, yaygın hatalar, geçme ölçütü, kaynak ve telafi/sonraki adım içerir.
   Uygulamalar savunma ve politika odaklıdır; yalnızca kâğıt üzerinde ya da kendi izole ortamında yapılır. Kaynaklar sec-ek.js'te doğrulananlarla sınırlıdır. */
(function () {
  var E = ((window.PP_EK = window.PP_EK || {}).sec = (window.PP_EK.sec || {}));
  var DOG = "2026-10-12";
  var R = function (no, ad, neden) { return { t: "RFC " + no + ": " + ad, u: "https://www.rfc-editor.org/rfc/rfc" + no, dogrulama: DOG, neden: neden }; };
  var S = function (yol, ad, neden) { return { t: "NIST SP " + ad, u: "https://csrc.nist.gov/pubs/sp/800/" + yol + "/final", dogrulama: DOG, neden: neden }; };
  var K = function (t, u, neden) { return { t: t, u: u, dogrulama: DOG, neden: neden }; };

  E[35] = {
    analoji: {
      a: "Müzedeki sahte kapı: ziyaretçilerin hiç girmemesi gereken, alarm bağlı bir kapı. Biri açarsa nöbetçi hemen haberdar olur ve kişinin nereye yöneldiği anlaşılır.",
      sinir: "Sahte kapı yalnızca bir yönde işler; gerçek bir tuzak sistem saldırganı yakından görür ama yalıtılmazsa gerçek ağa sıçrama kapısı da olabilir, üstelik hukuki ve etik sınırları vardır."
    },
    rehberli: [
      "Kâğıt üzerinde bir honeytoken tasarla: sahte hesabın adı ne olur, nerede durur, kim ona dokunduğunda hangi uyarı gider?",
      "Bir honeypot için izolasyon listesi yaz: ayrı ağ, gerçek veri yok, günlükler nereye gider?",
      "Bilinen zararlı bir alan adı için DNS sinkhole'un hangi iki bilgiyi sağlayacağını yaz: iletişimi kesmek ve enfekte aday cihazları görmek."
    ],
    bagimsiz: "Kendi evde ya da laboratuvar ortamında, internete kapalı sanal makinede, kimsenin kullanmadığı sahte bir dosya adı düşün ve ona dokunulursa kime nasıl haber verileceğini kâğıda yaz. Gerçek ağda deneme yapma.",
    hatalar: [
      [
        "Tuzağı üretim ağıyla aynı segmente koymak",
        "Ele geçirilen tuzak gerçek sistemlere sıçrama noktası olur; ayrı ve yalıtılmış ağ gerekir."
      ],
      [
        "Yem olarak gerçek veri kullanmak",
        "Gerçek müşteri ya da parola verisi tuzakta açığa çıkabilir; yem için sahte ama gerçekçi içerik kullanılır."
      ],
      [
        "Hack back yapmak",
        "Saldırganın sistemlerine karşılık vermek yasa dışıdır; tuzak yalnızca kendi alanında savunma ve öğrenme içindir."
      ]
    ],
    gecme: {
      olcut: "Mini sınavda %80 ve bir honeypot kurulumunun izolasyon ve onay adımlarını sıralayabilmek.",
      kritik: [
        "Honeypot'un saldırıyı engelleyen bir araç olduğunu sanmak",
        "Tuzak kurmak için hukuki onay gerekmediğini sanmak"
      ]
    },
    kaynaklar: [
      S("61/r2", "800-61 Rev. 2: Computer Security Incident Handling Guide", "Aldatma yöntemlerini doğrudan anlatmaz; tespit, analiz ve olay yönetimi akışını gösterir. Tuzak uyarılarının nasıl ele alınacağını bu akış içinde düşünmeye yardımcı olur.")
    ],
    telafi: "Takıldıysan tek bir araç seç (honeytoken) ve üç soruyu cevapla: Ne işe yarar? Kim ona dokunmamalı? Dokunulursa kime haber gider?",
    sonraki: "Sonraki ders: Tespit ve önleme araçları (IDS/IPS, DLP, NAC, EDR/XDR). Tuzak uyarılarının yanında ağ ve uç nokta alarmlarını nasıl ayarlayacağını göreceksin."
  };

  E[36] = {
    analoji: {
      a: "Bina güvenliği: kapıdaki görevli kimliğe bakar (NAC), paket çıkışını denetleyen kişi içerik kontrolü yapar (DLP), kamera kaydı izler (IDS), müdahale eden görevli kapıyı kapatır (IPS) ve tek tek odaları gezen nöbetçi (EDR) şüpheli davranışa bakar.",
      sinir: "Binada her görevli tek bir şeye bakar ve insan olduğu için yorulur; sistemlerde araçlar sürekli çalışır ama yanlış alarm üretir ve ayar gerektirir. Hiçbir araç tek başına yeterli değildir."
    },
    rehberli: [
      "Aynı olayı iki araçla anlat: şüpheli bir paketi IDS nasıl raporlar, IPS nasıl davranır?",
      "Bir DLP kuralı yaz: hangi veri deseni, hangi kanal (e-posta, USB), hangi eylem (uyar, engelle)?",
      "802.1X'in üç rolünü (supplicant, authenticator, authentication server) bir ofis senaryosunda eşleştir."
    ],
    bagimsiz: "Kendi kuralını yaz: 'Bir tehdit avı için hipotezim şu: ...' diye başlayıp hangi günlükte hangi iz aranacağını kâğıda dök. Gerçek bir sisteme müdahale etme; yalnızca günlük örnekleri üzerinde çalış.",
    hatalar: [
      [
        "IDS ile IPS'i karıştırmak",
        "IDS izler ve uyarır; hat üzerinde duran ve engelleyen IPS'tir."
      ],
      [
        "Yanlış alarmı azaltmak için kuralı tamamen kapatmak",
        "Doğrusu eşik ve istisna ile ayarlamak ve test etmektir; kapatmak yanlış negatif riskini artırır."
      ],
      [
        "Tehdit avını alarm beklemek sanmak",
        "Tehdit avı proaktiftir ve hipotezle başlar; alarm yönetimi tepkiseldir."
      ]
    ],
    gecme: {
      olcut: "Mini sınavda %80 ve bir senaryo için doğru aracı (IPS, DLP, NAC, EDR/XDR) seçip nedenini söyleyebilmek.",
      kritik: [
        "Tek bir aracın tüm tehditleri kapsadığını sanmak",
        "Yanlış pozitifin yanlış negatiften her zaman tehlikeli olduğunu sanmak"
      ]
    },
    kaynaklar: [
      S("53/r5", "800-53 Rev. 5: Security and Privacy Controls for Information Systems and Organizations", "Tek tek araç adlarını değil, izleme ve erişim denetimi gibi kontrol ailelerini içerir. IDS/IPS ve NAC gibi araçların hangi kontrol amacına hizmet ettiğini görmeye yarar.")
    ],
    telafi: "Takıldıysan tek bir soruyla başla: bu araç neyi görür, neyi göremez? IDS, DLP, NAC ve EDR için cevabı yan yana yaz.",
    sonraki: "Sonraki ders: İş etki analizi, risk iştahı ve toleransı. Tespit ettiğin olayların işe etkisini ve toparlanma hedeflerini göreceksin."
  };

  E[37] = {
    analoji: {
      a: "Apartman yangın planı: hangi daire ne kadar çabuk tahliye edilmeli (RTO), son hangi yedek anahtar kopyasına dönülür (RPO), sigorta ne kadarını karşılar, asansör bozulursa merdiven planı var mı sorularına önceden cevap verilir.",
      sinir: "Apartmanda risk fiziksel ve görünürdür; kurumlarda kritik süreçler birbirine bağlıdır ve bir sistemin kesintisi görünmeyen başka süreçleri durdurabilir. Ayrıca iştah ve tolerans soyut kararlardır."
    },
    rehberli: [
      "Bir sürecin (ör. sipariş alma) kesinti etkisini üç yönden yaz: para, itibar, hukuk.",
      "RTO 4 saat ve RPO 1 saat olan bir sistem için yedek sıklığını ve alternatif çalışma yerini öner.",
      "Aynı riski dört yanıtla (azalt, aktar, kabul et, kaçın) yeniden yaz ve hangisini neden seçtiğini söyle."
    ],
    bagimsiz: "Kendi ev bilgisayarın için küçük bir BIA yaz: kritik dosyaların listesi, her biri için RTO ve RPO tahmini ve seçeceğin yedek yöntemi. Gerçek bir kurumun verisini kullanma.",
    hatalar: [
      [
        "RTO ile RPO'yu karıştırmak",
        "RTO geri dönüş süresidir; RPO kabul edilen veri kaybıdır ve yedek sıklığını belirler."
      ],
      [
        "Her sistem için aynı yedekleme çözümünü seçmek",
        "Çözüm BIA'daki hedeflere göre değişir; kritik olmayan sistem için pahalı sıcak site gereksizdir."
      ],
      [
        "Riski aktarınca sorumluluğun bittiğini sanmak",
        "Sigorta mali etkiyi devreder; yasal yükümlülük ve itibar kaybı kurumda kalır."
      ]
    ],
    gecme: {
      olcut: "Mini sınavda %80 ve bir BIA çıktısından yedek sıklığı ile alternatif site türünü seçebilmek.",
      kritik: [
        "Felaket kurtarmanın iş sürekliliğinden bağımsız bir plan olduğunu sanmak",
        "Artık riskin doğal riskle aynı olduğunu sanmak"
      ]
    },
    kaynaklar: [
      S("34/r1", "800-34 Rev. 1: Contingency Planning Guide for Federal Information Systems", "İş etki analizi, kurtarma stratejileri ve alternatif site kavramlarını bir arada anlatır; bu dersteki BIA, RTO/RPO ve site kararlarına en yakın mevcut kaynaktır.")
    ],
    telafi: "Takıldıysan tek bir süreç seç ve iki soruyu cevapla: Ne kadar süre kapalı kalabilir (RTO)? En fazla ne kadar veri kaybı olur (RPO)?",
    sonraki: "Sonraki ders: Sızma testi türleri ve keşif. Risk kararlarını sınamak için yetkili test sürecini göreceksin."
  };

  E[38] = {
    analoji: {
      a: "Ev sahibinin kilitçi çağırması: kilitçi hangi kapıya bakacak, ne zaman gelecek, hangi odaya girmeyecek yazılı olarak anlaşılır; iş bitince bulduğu zayıf noktaları rapor eder ve onarımdan sonra tekrar kontrol eder.",
      sinir: "Kilitçi tek bir evde çalışır; kurumlarda kapsam, hukuk, sözleşme ve üretim sistemlerinin kesintiye uğrama riski vardır. Bazı testler bilgi düzeyi ve gerçekçilik arasında denge ister."
    },
    rehberli: [
      "Bir test için kapsam belgesinin beş satırını yaz: hedefler, kapsam dışı, tarih, izinli yöntemler, acil iletişim.",
      "Aynı senaryoyu beyaz, gri ve kara kutu için karşılaştır: ekibe hangi bilgi verilir, hangisinin maliyeti daha düşüktür?",
      "Tarama çıktısı ile sızma testi raporu arasındaki üç farkı yaz."
    ],
    bagimsiz: "Kendi evindeki ağ cihazları için (yalnızca sahip olduklarına) 'yetkili test planı' yaz: kapsam, izin, hangi bilgiyi toplayacağın (yalnız açık kaynaklar), raporu kime vereceğin. Kimsenin sisteminde deneme yapma.",
    hatalar: [
      [
        "Yazılı izin almadan 'iyi niyetle' denemek",
        "Niyet ne olursa olsun yazılı izin yoksa yetkisiz erişimdir."
      ],
      [
        "Zafiyet taramasını sızma testi saymak",
        "Tarama bulguları listeler; sızma testi onları doğrular ve gerçek etkiyi gösterir."
      ],
      [
        "Düzeltmeyi yeniden test etmeden bulguyu kapatmak",
        "Doğrulama olmadan bulgunun gerçekten kapandığına dair kanıt olmaz."
      ]
    ],
    gecme: {
      olcut: "Mini sınavda %80 ve bir sızma testi için kapsam, izin ve RoE maddelerini sıralayabilmek.",
      kritik: [
        "Sözlü iznin test için yeterli olduğunu sanmak",
        "Pasif keşfin hedefte iz bıraktığını sanmak"
      ]
    },
    kaynaklar: [
      S("115", "800-115: Technical Guide to Information Security Testing and Assessment", "Güvenlik testlerinin planlanması, yürütülmesi ve raporlanması konusunu anlatır; bu dersteki sızma testi süreci, kapsam ve rapor konularıyla örtüşür.")
    ],
    telafi: "Takıldıysan test öncesi, test sırası ve test sonrası olarak üç sütun çiz ve her birine iki madde yaz.",
    sonraki: "Yolun sonu: Siber güvenlik yolunu bitirdin. Şimdi proje atölyesinde bir mini güvenlik planı hazırla ve soru bankasıyla tekrar et."
  };

})();

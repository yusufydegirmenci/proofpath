/* Siber güvenlik (Security+ SY0-801 (V8) temelli) · sabit dersler 25-30 */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).sec = (window.PP_LESSONS.sec || {}));
  var CT = { title: "CompTIA Security+ sınav hedefleri (SY0-801, V8)", url: "https://www.comptia.org/certifications/security" };
  var PM = { title: "Professor Messer: Security+ (ücretsiz video kursu, SY0-701 sürümü)", url: "https://www.professormesser.com/", type: "video", length: "Çok bölümlü", level: "başlangıç", lang: "EN" };
  var NISTG = { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", type: "doc", level: "orta", lang: "EN" };
  function res(a, why) { var o = {}; for (var k in a) o[k] = a[k]; o.why = why; return o; }

  /* 25 ──────────────────────────────────────────── Adli kanıt */
  L[25] = {
    hook: "Dijital kanıt narindir: bir yanlış tuş kanıtı bozar ve davayı ya da soruşturmayı çökertir.",
    homework: "Bir dosyanın hash değerini al, kopyala, kopyanın hash'ini al ve ikisini karşılaştır. Adli kopyanın aslına eşit olduğunu böyle kanıtlarsın.",
    warmup: {
      recap: [{ point: "Hash bütünlüğü kontrol eder.", example: "SHA-256" }],
      concepts: [
        { term: "Chain of custody", tr: "Kanıt zinciri", summary: "Kanıtın kim tarafından ne zaman alındığı, nerede saklandığı, kime verildiğinin kaydı.", example: "Teslim formu" },
        { term: "Volatilite sırası", tr: "Uçuculuk sırası", summary: "En çabuk kaybolan veriyi önce toplamak.", example: "Bellek önce, disk sonra" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Bir çalışanın veri sızdırdığından şüpheleniliyor. Bilgisayarı açıp dosyalara bakarsan zaman damgalarını bozarsın. Adli yaklaşımda kanıt kopyalanır (adli imaj), hash ile doğrulanır ve kopya üzerinde çalışılır." },
      { t: "steps", h: "Temel ilkeler", items: [
        "Kanıtı koru: orijinale dokunma, yazma korumalı bağlantı (write blocker) kullan.",
        "Adli imaj al ve hash ile aslıyla birebir olduğunu belgele.",
        "Chain of custody: kanıtı kim aldı, ne zaman, nerede saklandı, kime verildi; her devir kaydedilir.",
        "Her adımı belgele; yöntem tekrarlanabilir olsun.",
        "Yasal ve hukuki gereksinimler: izin, yetki, gizlilik, saklama (legal hold)."
      ] },
      { t: "steps", h: "Uçuculuk sırası (en uçucudan en kalıcıya)", items: [
        "1) CPU kayıtları ve önbellek.",
        "2) Bellek (RAM), çalışan süreçler, ağ bağlantıları.",
        "3) Geçici dosyalar, swap/sayfa dosyası.",
        "4) Disk (kalıcı depolama).",
        "5) Uzak loglar, yedekler, arşiv."
      ] },
      { t: "box", h: "Neden önce bellek?", text: "Cihaz kapatılınca RAM'deki şifreleme anahtarları, açık bağlantılar ve çalışan zararlı kaybolur. Bu yüzden kapatmadan önce bellek imajı alınması gerekebilir; ama karar olay müdahale ekibi ve hukukla verilir." },
      { t: "steps", h: "Diğer kavramlar", items: [
        "E-discovery: dava için elektronik verilerin bulunup korunması.",
        "Legal hold: dava ihtimali olduğunda ilgili verinin silinmesini durdurmak.",
        "Zaman damgası ve zaman dilimi: kanıtın zamanını doğru yorumlamak için.",
        "Raporlama: bulguları teknik olmayan okuyucuya anlaşılır yazmak.",
        "Geri alınan kanıt, olay müdahalesinde kök neden ve etkiyi belirler."
      ] },
      { t: "warn", h: "Tuzak", text: "Şüpheli bilgisayarı 'bir bakayım' diye karıştırmak kanıtı bozar ve mahkemede geçersiz kılabilir. Önce karar ver: kanıt mı toplanacak, yoksa sadece acil sınırlama mı?" },
      { t: "steps", h: "Adli kanıt kaynakları (V8)", items: [
        "Sistem imajı: diskin bit düzeyinde (bit-level) birebir kopyasıdır; silinmiş alanları da içerir. Analiz kopya üzerinde yapılır, asıl kanıt dokunulmadan kalır.",
        "Bellek dökümü (memory dump): RAM'in kopyasıdır; çalışan süreçler, ağ bağlantıları, şifre anahtarları ve dosyasız zararlının izi buradadır. Cihaz kapanınca kaybolur, bu yüzden diskten önce alınır. Snapshot: sanal makinenin belirli andaki durumu.",
        "Log bütünlüğü: loglar hash'lenir ve değiştirilemez depoya aktarılır; log silme ya da değiştirme kendi başına önemli bir göstergedir. Paydaşlar: İK (çalışan olayı) ve hukuk (delil geçerliliği)."
      ] }
    ],
    objectives: [
      { id: "h1", text: "Chain of custody kaydında nelerin belgelenmesi gerektiğini açıklayabilirsin." },
      { id: "h2", text: "Kanıt toplarken uçuculuk sırasını (CPU/önbellek ve bellek önce; disk ve arşivler sonra) uygulayabilirsin." },
      { id: "h3", text: "Adli imajın hash ile aslıyla aynı olduğunu ve bit düzeyi kopya, bellek dökümü ile snapshot farkını söyleyebilirsin." },
      { id: "h4", text: "Legal hold ve e-discovery kavramlarını tanımlayabilirsin." }
    ],
    summary: [
      "Kanıt korunur: orijinale dokunulmaz, write blocker ile adli imaj alınır ve hash ile doğrulanır.",
      "Chain of custody kanıtı kimin, ne zaman aldığını ve nerede saklandığını kaydeder.",
      "En uçucudan en kalıcıya: CPU/önbellek, RAM, geçici dosyalar, disk, uzak loglar ve yedekler.",
      "Legal hold dava ihtimalinde ilgili verinin silinmesini durdurur; e-discovery verinin bulunup korunmasıdır.",
      "Şüpheli bilgisayarı karıştırmak kanıtı bozar; önce kanıt mı, acil sınırlama mı karar verilir."
    ],
    quiz: [
      { id: "4c0a7564", q: "Kanıtın kim tarafından, ne zaman alındığı ve nerede saklandığının kaydına ne denir?", options: ["Chain of custody", "Playbook", "Baseline", "Lease"], obj: "h1" },
      { id: "4b3be6c9", q: "Kanıt toplarken ilk hangi veri alınmalıdır?", options: ["En uçucu olan (bellek)", "Arşivlenmiş yedekler", "Kâğıt belgeler", "Uzak sunucu"], obj: "h2" },
      { id: "b465cc1f", q: "Adli imajın aslıyla aynı olduğunu hangi yöntem kanıtlar?", options: ["Hash karşılaştırması", "Dosya boyutu", "Dosya adı", "Tarih"], obj: "h3" },
      { id: "090af604", q: "Dava ihtimali olduğunda ilgili verilerin silinmesini durdurma kararına ne denir?", options: ["Legal hold", "Sanitization", "Failover", "Rollback"], obj: "h4" },
      { id: "f5115961", q: "Bir iş istasyonunda diske yazılmadan bellekte çalışan (dosyasız) bir zararlı şüphesi var ve cihaz hâlâ açık. İlk alınması gereken kanıt hangisidir?", options: ["Bellek dökümü (RAM görüntüsü)", "Sabit diskin bit düzeyi kopyası", "Uygulama kurulum dosyaları", "Eski yedek kasetleri"], obj: "h2" }
    ],
    interview: [
      { q: "Chain of custody nedir, neden önemlidir?", a: "Kanıtın toplandığı andan itibaren kim tarafından, ne zaman, nerede saklandığının ve kime devredildiğinin kaydıdır. Kanıtın değiştirilmediğini göstererek hukuki geçerliliğini sağlar." },
      { q: "Uçuculuk sırası nedir?", a: "En çabuk kaybolan verinin önce toplanması ilkesidir: CPU/önbellek, bellek ve ağ bağlantıları, geçici dosyalar, disk ve en sonda yedek ve arşivler." }
    ],
    vocab: [
      { term: "Forensics", tr: "adli bilişim", ex: "Digital forensics found the cause." },
      { term: "Evidence", tr: "kanıt", ex: "Preserve the evidence." },
      { term: "Chain of custody", tr: "kanıt zinciri", ex: "Document the chain of custody." },
      { term: "Image", tr: "adli kopya (imaj)", ex: "Create a forensic image." },
      { term: "Volatile", tr: "uçucu", ex: "RAM is volatile." }
    ],
    resources: [
      res(PM, "Dijital adli bilişim bölümü"),
      { title: "NIST SP 800-86: Olay müdahalesine adli teknikler entegrasyonu", url: "https://csrc.nist.gov/pubs/sp/800/86/final", type: "doc", why: "Adli süreçlerin resmî rehberi", level: "ileri", lang: "EN" }
    ],
    sources: [CT]
  };

  /* 26 ──────────────────────────────────────────── Risk yönetimi */
  L[26] = {
    hook: "Her riski sıfırlayamazsın. Hangisi önce, hangisi sonra, hangisi kabul edilir: risk yönetimi bu kararların bilimidir.",
    homework: "Kendi hayatından bir riski seç (ör. telefonun çalınması). Olasılık ve etkisini 1-5 puanla, mevcut önlemi ve kalan riski yaz.",
    warmup: {
      recap: [{ point: "Zafiyet + tehdit = risk için zemin.", example: "Yamasız sunucu + aktif sömürü" }],
      concepts: [
        { term: "Risk", tr: "Olasılık × etki", summary: "Bir tehdidin zafiyeti sömürerek zarar verme ihtimali ve büyüklüğü.", example: "Yüksek olasılık, yüksek etki" },
        { term: "Artık risk", tr: "Önlem sonrası kalan", summary: "Kontroller uygulandıktan sonra hâlâ kalan risk.", example: "MFA sonrası kalan hesap riski" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Bütçen sınırlı ve 15 açık var. Hangisine para harcarsın? Risk değerlendirmesi, riskleri olasılık ve etkiye göre sıralayıp kaynakları en büyük riske yönlendirmeni sağlar." },
      { t: "steps", h: "Risk yönetimi süreci", items: [
        "Tanımla: varlık, tehdit, zafiyet.",
        "Değerlendir: olasılık ve etki (nitel: düşük/orta/yüksek; nicel: para).",
        "Önceliklendir: risk kaydı (risk register) ve ısı haritası.",
        "Ele al: dört seçenekten biri.",
        "İzle: artık risk, göstergeler (KRI), düzenli gözden geçirme."
      ] },
      { t: "steps", h: "Risk ele alma stratejileri", items: [
        "Azaltma (mitigate): kontrol uygula (MFA, yama).",
        "Aktarma (transfer): sigorta ya da dış kaynak ile riski paylaş.",
        "Kabul (accept): riski bilerek taşı; yazılı onay ve gözden geçirme.",
        "Kaçınma (avoid): riskli faaliyeti bırak (ör. hizmeti kapat)."
      ] },
      { t: "box", h: "Nicel hesaplar", text: "SLE (tek olay kaybı) = varlık değeri × maruz kalma oranı. ARO = yılda beklenen olay sayısı. ALE (yıllık beklenen kayıp) = SLE × ARO. Kontrol maliyeti ALE'den azsa mantıklıdır." },
      { t: "steps", h: "Örnek hesap", items: [
        "Varlık değeri 100.000 TL, bir olayda %50 kayıp → SLE = 50.000 TL.",
        "Yılda 0,2 kez bekleniyor (5 yılda bir) → ARO = 0,2.",
        "ALE = 50.000 × 0,2 = 10.000 TL. Yıllık 4.000 TL'lik bir kontrol ekonomik olarak anlamlıdır."
      ] },
      { t: "steps", h: "Kavramlar", items: [
        "Risk iştahı (appetite): kurumun kabul etmeye razı olduğu risk düzeyi. Risk toleransı: bu düzeyden ne kadar sapma kabul.",
        "Doğal (inherent) risk: önlem öncesi. Artık (residual) risk: önlem sonrası.",
        "BIA: iş kesintisinin etkisini ölçmek."
      ] },
      { t: "warn", h: "Tuzak", text: "Sigorta riski ortadan kaldırmaz, sadece maddi sonucunu aktarır. İtibar kaybı ve operasyon kesintisi sigortayla tam kapanmaz." }
    ],
    objectives: [
      { id: "h1", text: "SLE, ARO ve ALE değerlerini verilen sayılarla hesaplayabilirsin." },
      { id: "h2", text: "Dört risk ele alma stratejisini (azaltma, aktarma, kabul, kaçınma) ayırt edebilirsin." },
      { id: "h3", text: "Doğal ve artık risk ile risk iştahı kavramlarını tanımlayabilirsin." },
      { id: "h4", text: "Bir örnek senaryoda hangi stratejinin uygulandığını belirleyebilirsin." }
    ],
    summary: [
      "Risk yönetimi: tanımla, değerlendir, önceliklendir, ele al, izle.",
      "Dört strateji: azaltma, aktarma, kabul, kaçınma.",
      "SLE = varlık değeri × maruz kalma oranı; ALE = SLE × ARO. Kontrol maliyeti ALE'den azsa mantıklıdır.",
      "Doğal risk önlem öncesi, artık risk önlem sonrasıdır; risk iştahı kurumun razı olduğu düzeydir.",
      "Sigorta riski ortadan kaldırmaz, sadece maddi sonucunu aktarır."
    ],
    quiz: [
      { id: "4492b43d", q: "ALE nasıl hesaplanır?", options: ["SLE × ARO", "SLE + ARO", "Varlık değeri / ARO", "ARO − SLE"], obj: "h1" },
      { id: "5960a155", q: "Siber sigorta satın almak hangi risk stratejisidir?", options: ["Aktarma (transfer)", "Azaltma", "Kaçınma", "Kabul"], obj: "h2" },
      { id: "93d7e8b2", q: "Önlemler uygulandıktan sonra kalan riske ne denir?", options: ["Artık risk (residual)", "Doğal risk (inherent)", "Risk iştahı", "Risk kaydı"], obj: "h3" },
      { id: "facc759f", q: "Riskli bir hizmeti tamamen kapatmak hangi stratejidir?", options: ["Kaçınma", "Aktarma", "Azaltma", "Kabul"], obj: "h4" },
      { id: "892ffbc4", q: "Bir sunucunun değeri 400.000 TL. Bir olayda değerinin %25'ini kaybedeceği tahmin ediliyor ve olayın yılda 0,5 kez gerçekleşmesi bekleniyor. ALE kaç TL'dir?", options: ["100.000 TL", "200.000 TL", "25.000 TL", "50.000 TL"], obj: "h1" }
    ],
    interview: [
      { q: "Risk yönetimi nasıl yapılır?", a: "Varlık, tehdit ve zafiyetleri tanımlarım, olasılık ve etkiyi değerlendiririm, risk kaydında önceliklendiririm, azaltma, aktarma, kabul ya da kaçınma ile ele alırım ve artık riski izlerim." },
      { q: "ALE'yi örnek ver.", a: "Varlık 100 bin TL, bir olayda %50 kayıp olsa SLE 50 bin TL. Beş yılda bir olursa ARO 0,2. ALE 10 bin TL eder. Yıllık maliyeti 10 bin TL'den düşük bir kontrol ekonomik olarak savunulabilir." }
    ],
    vocab: [
      { term: "Risk register", tr: "risk kaydı", ex: "Add it to the risk register." },
      { term: "Likelihood", tr: "olasılık", ex: "The likelihood is high." },
      { term: "Impact", tr: "etki", ex: "The impact is severe." },
      { term: "Residual risk", tr: "artık risk", ex: "Residual risk is low." },
      { term: "Mitigate", tr: "azaltmak", ex: "Mitigate the risk with MFA." }
    ],
    resources: [res(PM, "Risk yönetimi"), res(NISTG, "Risk yönetimi çerçevesi")],
    sources: [CT]
  };

  /* 27 ──────────────────────────────────────────── Politika ve prosedürler */
  L[27] = {
    hook: "Politika 'ne ve neden', prosedür 'adım adım nasıl'. Biri olmadan diğeri tutarlı çalışmaz.",
    homework: "Şirketinin ya da okulunun kabul edilebilir kullanım politikasını bul ve oku. Aklında kalan üç kuralı yaz.",
    warmup: {
      recap: [{ point: "Yönetimsel kontroller politika ve süreçtir.", example: "Güvenlik politikası" }],
      concepts: [
        { term: "Politika", tr: "Üst düzey kural", summary: "Yönetimin onayladığı, neyin yapılıp yapılamayacağını söyleyen belge.", example: "Parola politikası" },
        { term: "Prosedür", tr: "Adım adım talimat", summary: "Bir işin nasıl yapılacağını anlatan ayrıntılı adımlar.", example: "Hesap kapatma adımları" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Çalışan: 'Kişisel telefonumdan iş e-postasına bağlanabilir miyim?' Cevap politikada yazıyorsa net, yazmıyorsa herkes farklı davranır. Politika tutarlılığı ve hesap verebilirliği sağlar." },
      { t: "steps", h: "Belge hiyerarşisi", items: [
        "Politika (policy): yönetimin onayı ile yüksek seviye zorunlu kural.",
        "Standart: politikayı destekleyen zorunlu teknik gereksinim (ör. parola en az 12 karakter).",
        "Prosedür (procedure): adım adım talimat.",
        "Kılavuz (guideline): tavsiye niteliğinde, esnek öneri."
      ] },
      { t: "steps", h: "Yaygın politikalar", items: [
        "Kabul edilebilir kullanım (AUP): kaynakları nasıl kullanacağın.",
        "Parola ve erişim politikası, uzaktan çalışma ve BYOD politikası.",
        "Bilgi sınıflandırma ve veri saklama politikası.",
        "Olay müdahale politikası, değişiklik yönetimi politikası.",
        "İşe giriş/çıkış: arka plan kontrolü, gizlilik sözleşmesi (NDA), çıkışta erişimi kapatma."
      ] },
      { t: "box", h: "Personel güvenliği", text: "Görev ayrımı (aynı kişi hem talebi açıp hem onaylamasın), zorunlu izin ve görev rotasyonu (hile tespiti), temiz masa politikası, çıkış sürecinde hesap ve cihazın alınması." },
      { t: "steps", h: "İyi politikanın nitelikleri", items: [
        "Anlaşılır ve kısa; yönetim onaylı ve duyurulmuş.",
        "Düzenli gözden geçirilir (yılda en az bir kez).",
        "İstisna süreci tanımlı; ihlalin sonucu belli.",
        "Eğitimle desteklenir ve ölçülebilir."
      ] },
      { t: "warn", h: "Tuzak", text: "Yazılmış ama kimsenin bilmediği politika işe yaramaz. 'Okudum, anladım' imzası yetmez; eğitim ve uygulama denetimi gerekir." }
    ],
    objectives: [
      { id: "h1", text: "Politika, standart, prosedür ve kılavuzu birbirinden ayırabilirsin." },
      { id: "h2", text: "Görev ayrımı, görev rotasyonu ve temiz masa gibi personel güvenliği önlemlerini açıklayabilirsin." },
      { id: "h3", text: "İşten ayrılan çalışan için yapılması gereken adımı belirleyebilirsin." }
    ],
    summary: [
      "Politika yönetim onaylı üst düzey kuraldır; standart zorunlu teknik gereksinim, prosedür adım adım talimattır.",
      "Kılavuz tavsiye niteliğindedir ve esnektir.",
      "AUP, parola, BYOD, sınıflandırma, olay müdahale ve işe giriş/çıkış süreçleri yaygın politikalardandır.",
      "Görev ayrımı, zorunlu izin, görev rotasyonu ve temiz masa personel güvenliği önlemleridir.",
      "Politika duyurulmalı, eğitimle desteklenmeli ve yılda en az bir kez gözden geçirilmelidir."
    ],
    quiz: [
      { id: "692e25d1", q: "Adım adım talimat veren belge hangisidir?", options: ["Prosedür", "Politika", "Standart", "Kılavuz"], obj: "h1" },
      { id: "c838972b", q: "Aynı kişinin hem ödeme talebini açıp hem onaylamasını engelleyen ilke nedir?", options: ["Görev ayrımı", "Görev rotasyonu", "En az yetki", "Temiz masa"], obj: "h2" },
      { id: "850733e7", q: "Tavsiye niteliğinde, esnek öneri belgesine ne denir?", options: ["Kılavuz (guideline)", "Politika", "Standart", "Prosedür"], obj: "h1" },
      { id: "e4c176ce", q: "İşten ayrılan çalışan için hangi adım zorunludur?", options: ["Erişimlerin ve hesapların hemen kapatılması", "Parolanın değiştirilmesi", "Kişisel mesajların okunması", "Hiçbiri"], obj: "h3" }
    ],
    interview: [
      { q: "Politika, standart ve prosedür farkı nedir?", a: "Politika yönetimin onayladığı üst düzey kuraldır. Standart bu kuralı destekleyen zorunlu teknik gereksinimlerdir. Prosedür işin adım adım nasıl yapılacağını anlatır. Kılavuz ise tavsiye niteliğindedir." },
      { q: "Görev ayrımı nedir?", a: "Kritik bir işin tamamının tek kişide toplanmamasıdır. Örneğin ödemeyi başlatan ve onaylayan farklı kişiler olur; hile ve hata riskini azaltır." }
    ],
    vocab: [
      { term: "Policy", tr: "politika", ex: "Read the security policy." },
      { term: "Procedure", tr: "prosedür", ex: "Follow the procedure." },
      { term: "Acceptable use", tr: "kabul edilebilir kullanım", ex: "Sign the acceptable use policy." },
      { term: "NDA", tr: "gizlilik sözleşmesi", ex: "Sign the NDA." },
      { term: "Separation of duties", tr: "görev ayrımı", ex: "Enforce separation of duties." }
    ],
    resources: [
      res(PM, "Politikalar ve personel güvenliği"),
      { title: "SANS: Güvenlik politikası şablonları", url: "https://www.sans.org/information-security-policy/", type: "doc", why: "Hazır politika şablonları", level: "orta", lang: "EN" }
    ],
    sources: [CT]
  };

  /* 28 ──────────────────────────────────────────── Üçüncü taraf riski */
  L[28] = {
    hook: "Güvenliğin senin kapıda bitmez: tedarikçin saldırıya uğrarsa senin verin de gider.",
    homework: "Kullandığın bir bulut/yazılım hizmetinin gizlilik ve güvenlik sayfasını bul. Veriyi nerede saklıyor, hangi sertifikaları var, ihlalde sana nasıl haber veriyor?",
    warmup: {
      recap: [{ point: "Tedarik zinciri zafiyeti, kullandığın üçüncü taraf yazılım ve hizmetlerdeki zafiyettir.", example: "Ele geçirilmiş yazılım güncellemesi" }],
      concepts: [
        { term: "Tedarik zinciri saldırısı", tr: "Tedarikçi üzerinden saldırı", summary: "Hedefe doğrudan değil, onun güvendiği tedarikçi üzerinden girmek.", example: "Zararlı güncelleme" },
        { term: "SLA", tr: "Hizmet seviyesi sözleşmesi", summary: "Hizmetin süre ve kalite taahhüdü.", example: "%99,9 erişilebilirlik" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Yeni bir bordro yazılımı alınacak. Tedarikçi çalışanların maaş verisine erişecek. Satın almadan önce güvenlik değerlendirmesi, sözleşmede veri koruma maddesi ve çıkışta verinin silinmesi netleşmeli." },
      { t: "steps", h: "Tedarikçi yaşam döngüsü", items: [
        "Seçim öncesi: due diligence (ön inceleme), güvenlik anketi, sertifikalar (ISO 27001, SOC 2).",
        "Sözleşme: SLA, güvenlik gereksinimleri, ihlal bildirimi süresi, denetim hakkı, veri konumu, alt yükleniciler.",
        "Süreç boyunca: düzenli gözden geçirme, performans ve güvenlik izleme.",
        "Çıkış: erişimin kapatılması, verinin iadesi ve silinmesi."
      ] },
      { t: "steps", h: "Sözleşme ve belgeler", items: [
        "MSA (çerçeve sözleşme), SOW (iş tanımı), SLA, NDA, DPA (veri işleme sözleşmesi).",
        "MOU/MOA: niyet mutabakatı. BPA: iş ortaklığı sözleşmesi.",
        "Yaptırım ve cezai şartlar, sigorta."
      ] },
      { t: "box", h: "Hak ve sorumluluk", text: "Sözleşme riski aktarmaz, sadece yükümlülük belirler. Veri sahibi sensin; tedarikçinin ihlalinden doğan itibar ve yasal sorumluluk sende kalır." },
      { t: "steps", h: "Tedarik zinciri riskleri", items: [
        "Yazılım bileşenleri: açık kaynak bağımlılıklar, SBOM (yazılım bileşen listesi).",
        "Donanım: sahte veya manipüle edilmiş cihaz.",
        "Hizmet sağlayıcı: bulut, MSP, ödeme sağlayıcı ihlalleri.",
        "Alt yükleniciler: zincirin görünmeyen halkaları."
      ] },
      { t: "warn", h: "Tuzak", text: "'Büyük firma güvenlidir' varsayımı tehlikelidir. Her tedarikçiyi riske göre değerlendir; kritik olanı daha sık ve derin incele." },
      { t: "steps", h: "Satın alma ve sözleşme ayrıntıları (V8)", items: [
        "Satıcı seçimi: RFI (bilgi isteği: pazarda ne var), RFP (teklif isteği: ayrıntılı çözüm ve fiyat), RFQ (fiyat teklifi isteği: ihtiyaç net, yalnızca fiyat), EOI (ilgi beyanı: tedarikçinin katılma isteğini bildirmesi). Gerekli özen (due diligence) ve çıkar çatışması kontrolü yapılır.",
        "Sözleşme belgeleri: MSA (çerçeve ana sözleşme), SOW (iş kapsamı ve teslimatlar), SLA (ölçülebilir hizmet seviyesi), SLO (hedef değer), MOU/MOA (niyet ve anlaşma mektubu; MOU genellikle niyet beyanıdır), NDA (gizlilik).",
        "İzleme: denetim hakkı (right to audit), hizmet seviyesi izleme, satıcı kaydı, uyum beyanı (attestation) ve sızma testi izni. Kısıtlar: satıcı bağımlılığı (vendor lock-in), yargı yetkisi, bütçe."
      ] }
    ],
    objectives: [
      { id: "h1", text: "Tedarikçi yaşam döngüsünün dört aşamasını (seçim öncesi, sözleşme, süreç boyunca, çıkış) sıralayabilirsin." },
      { id: "h2", text: "SLA, SLO, NDA, MSA, SOW ve DPA gibi sözleşme belgeleri ile RFI, RFP ve RFQ gibi satın alma isteklerini işlevlerine göre ayırt edebilirsin." },
      { id: "h3", text: "SBOM'un ne olduğunu ve yazılım tedarik zinciri riskini nasıl görünür kıldığını açıklayabilirsin." },
      { id: "h4", text: "Tedarikçi çıkışında yapılması gereken adımları (erişim kapatma, veri iadesi ve silme) belirtebilirsin." }
    ],
    summary: [
      "Tedarikçi riski seçim öncesinden çıkışa kadar tüm yaşam döngüsünde yönetilir.",
      "Seçim öncesinde due diligence, güvenlik anketi ve sertifikalar (ISO 27001, SOC 2) bakılır.",
      "Sözleşme belgeleri: MSA, SOW, SLA, NDA, DPA; sözleşme riski aktarmaz, yalnızca yükümlülük belirler.",
      "Tedarik zinciri riskleri yazılım bileşenleri (SBOM), donanım, hizmet sağlayıcılar ve alt yüklenicileri kapsar.",
      "'Büyük firma güvenlidir' varsayımı tehlikelidir; kritik tedarikçi daha sık ve derin incelenir."
    ],
    quiz: [
      { id: "770548e6", q: "Tedarikçiye satın almadan önce yapılan güvenlik incelemesine ne ad verilir?", options: ["Due diligence", "Hardening", "Patching", "Failover"], obj: "h1" },
      { id: "d3c5dd21", q: "Hizmetin erişilebilirlik ve süre taahhütlerini içeren belge hangisidir?", options: ["SLA", "NDA", "SOW", "DPA"], obj: "h2" },
      { id: "db704b8b", q: "Yazılımın içerdiği tüm bileşenlerin listesine ne denir?", options: ["SBOM", "SIEM", "SLE", "SSID"], obj: "h3" },
      { id: "4cc22294", q: "Tedarikçi ile sözleşme bittiğinde ne yapılmalıdır?", options: ["Erişim kapatılır, veri iade ve imha edilir", "Hiçbir şey", "Parola paylaşılır", "Logları silinir"], obj: "h4" },
      { id: "93d4d89a", q: "Bir kurum, ihtiyacı tamamen net olan standart donanım için birkaç tedarikçiden yalnızca fiyat teklifi almak istiyor. Hangi belgeyi yayınlamalıdır?", options: ["RFI (bilgi isteği)", "RFP (teklif isteği)", "RFQ (fiyat teklifi isteği)", "SOW (iş kapsamı belgesi)"], obj: "h2" },
      { id: "09db1679", q: "Bir ana sözleşme altında farklı projeler için her seferinde ayrı iş kapsamı ve teslimat belgeleri yazılıyor. Ortak hukuki şartları taşıyan çerçeve belge hangisidir?", options: ["SOW", "MSA (ana hizmet sözleşmesi)", "NDA", "SLO"], obj: "h2" }
    ],
    interview: [
      { q: "Üçüncü taraf riski nasıl yönetilir?", a: "Seçimden önce due diligence ve güvenlik anketi yaparım, sözleşmede SLA, ihlal bildirimi ve denetim hakkı belirlerim, süreç boyunca izler ve gözden geçiririm, çıkışta erişimi kapatıp veriyi iade ve imha ettiririm." },
      { q: "Tedarik zinciri saldırısı nedir?", a: "Hedefe doğrudan saldırmak yerine, hedefin güvendiği tedarikçi, yazılım ya da hizmet üzerinden girmektir. Örneğin zararlı kod içeren yazılım güncellemesi." }
    ],
    vocab: [
      { term: "Vendor", tr: "tedarikçi", ex: "Assess the vendor's security." },
      { term: "Supply chain", tr: "tedarik zinciri", ex: "A supply chain attack hit them." },
      { term: "SLA", tr: "hizmet seviyesi anlaşması", ex: "The SLA guarantees 99.9%." },
      { term: "Due diligence", tr: "ön inceleme", ex: "Do due diligence first." },
      { term: "Audit right", tr: "denetim hakkı", ex: "Include an audit right in the contract." }
    ],
    resources: [res(PM, "Üçüncü taraf risk yönetimi"), res(NISTG, "Tedarik zinciri risk yönetimi")],
    sources: [CT]
  };

  /* 29 ──────────────────────────────────────────── Uyum */
  L[29] = {
    hook: "Uyum 'kurala uyuyoruz' diyebilmektir; güvenlik ise gerçekten güvende olmaktır. İkisi örtüşür ama aynı şey değildir.",
    homework: "Kişisel veri işleyen bir hizmetin (ör. alışveriş sitesi) gizlilik bildirimini oku. KVKK kapsamında hangi haklarını kullanabileceğini listele.",
    warmup: {
      recap: [{ point: "Veri koruma politikası, verinin sınıfına ve yasalara bağlıdır.", example: "Kişisel veri, ödeme verisi" }],
      concepts: [
        { term: "Uyum (compliance)", tr: "Kurallara uygunluk", summary: "Yasal, düzenleyici ve sözleşmesel gereksinimleri karşılamak.", example: "KVKK, GDPR, PCI DSS" },
        { term: "Veri sorumlusu", tr: "Kişisel veriyi işleme amacını belirleyen", summary: "Verinin nasıl ve neden işleneceğine karar veren taraf.", example: "Şirket" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Müşteri verisi sızdı. Şimdi soru: kimlere ne zaman bildirim yapılacak? KVKK/GDPR ve sektör kuralları süre ve yükümlülük koyar. Uyumu bilmeyen biri hem teknik hem hukuki hata yapar." },
      { t: "steps", h: "Başlıca düzenlemeler", items: [
        "KVKK (Türkiye): kişisel verilerin korunması; veri sorumlusu, açık rıza, aydınlatma, VERBİS kaydı, ihlal bildirimi.",
        "GDPR (AB): AB vatandaşı verisini işleyen herkes; yüksek idari para cezası; 72 saat içinde ihlal bildirimi.",
        "PCI DSS: kart verisi işleyen kuruluşlar için sektör standardı.",
        "HIPAA (ABD): sağlık verisi. SOX: finansal raporlama. ",
        "ISO 27001: bilgi güvenliği yönetim sistemi sertifikası. SOC 2: hizmet kuruluşları için denetim raporu.",
        "NIST CSF, CIS Controls: çerçeve ve en iyi uygulama rehberleri (yasal zorunluluk değil)."
      ] },
      { t: "steps", h: "Kişisel veri ilkeleri", items: [
        "Hukuka ve dürüstlük kuralına uygun işleme, belirli ve meşru amaç.",
        "Veri minimizasyonu: sadece gerekeni topla.",
        "Doğruluk ve güncellik, saklama süresi sınırı.",
        "İlgili kişinin hakları: erişim, düzeltme, silme, itiraz."
      ] },
      { t: "box", h: "Uyum ≠ güvenlik", text: "Bir kuruluş PCI DSS'e uygun olup yine de ihlal yaşayabilir. Uyum asgari çıtadır; güvenlik risk temelli, sürekli çabadır. Cezalar, itibar kaybı, sözleşme kayıpları uyumsuzluğun sonuçlarıdır." },
      { t: "steps", h: "Uyum için pratikler", items: [
        "Yükümlülükleri belirle ve kontrollerle eşle.",
        "Kanıt topla (log, politika, eğitim kayıtları).",
        "İç ve dış denetim, düzeltici eylem planı.",
        "Veri envanteri ve veri akış haritası."
      ] },
      { t: "warn", h: "Tuzak", text: "Veri sorumlusu ile veri işleyen karıştırılır. Sorumlu amacı belirler, işleyen onun adına işler. İkisinin de yükümlülüğü vardır." },
      { t: "steps", h: "Gizlilik hakları ve uyum eğitimi (V8)", items: [
        "Veri öznesinin hakları: silinme ('unutulma'), düzeltme, işlemeyi kısıtlama ve itiraz; ayrıca açık rıza (opt-in) ya da çıkış (opt-out) tercihi.",
        "Veri sorumlusu (controller) amaç ve yöntemi belirler; işleyen (processor) onun adına işler. Sorumluluk işleyene devredilerek ortadan kalkmaz.",
        "Uyum eğitimi konuları: veri işleme, kara para aklamayı ve terörün finansmanını önleme (AML/CTF), rüşvetle mücadele. Uyumsuzluğun sonuçları: itibar kaybı, mali ceza, yasal yaptırım, sözleşme ihlali, yaptırımlar ve lisans kaybı."
      ] }
    ],
    objectives: [
      { id: "h1", text: "KVKK, GDPR, PCI DSS, HIPAA ve SOX gibi düzenlemeleri kapsamlarına göre eşleştirebilirsin." },
      { id: "h2", text: "GDPR'daki ihlal bildirim süresini (72 saat) söyleyebilirsin." },
      { id: "h3", text: "Veri minimizasyonu dahil kişisel veri ilkelerini ve veri öznesi haklarını (silinme, düzeltme, itiraz) örneklerle açıklayabilirsin." },
      { id: "h4", text: "Uyum ile güvenlik arasındaki farkı gerekçesiyle anlatabilirsin." }
    ],
    summary: [
      "Uyum 'kurala uyuyoruz' demektir; güvenlik gerçekten güvende olmaktır ve ikisi aynı şey değildir.",
      "KVKK Türkiye'de, GDPR AB'de kişisel veriyi korur; GDPR 72 saat içinde ihlal bildirimi ister.",
      "PCI DSS kart verisi, HIPAA sağlık verisi, SOX finansal raporlama içindir; NIST CSF ve CIS yasal zorunluluk değil rehberdir.",
      "Kişisel veri ilkeleri: meşru amaç, veri minimizasyonu, doğruluk, saklama süresi sınırı, ilgili kişi hakları.",
      "Uyum asgari çıtadır; güvenlik risk temelli ve sürekli çabadır."
    ],
    quiz: [
      { id: "5bf9249f", q: "Kartlı ödeme verisi işleyen kuruluşlara yönelik standart hangisidir?", options: ["PCI DSS", "HIPAA", "SOX", "FERPA"], obj: "h1" },
      { id: "edad8372", q: "GDPR'da ihlal bildirimi için tipik süre nedir?", options: ["72 saat", "24 saat", "30 gün", "1 yıl"], obj: "h2" },
      { id: "4dd5bdc7", q: "Veri minimizasyonu ilkesi ne demektir?", options: ["Sadece gerekli veriyi toplamak", "Veriyi sıkıştırmak", "Veriyi şifrelemek", "Yedeği silmek"], obj: "h3" },
      { id: "ce4bef03", q: "Uyum ile güvenlik arasında doğru ifade hangisidir?", options: ["Uyum asgari çıtadır, güvenlik sürekli ve risk temellidir", "İkisi aynı şeydir", "Uyum varsa ihlal olmaz", "Güvenlik yasal zorunluluktur"], obj: "h4" },
      { id: "fc2a48de", q: "Bir müşteri artık hizmet almak istemediğini belirterek şirketten kendisiyle ilgili kişisel verilerin silinmesini talep ediyor. Bu talep hangi hakka dayanır?", options: ["Yasal bekletme (legal hold)", "Veri minimizasyonu", "Silinme (unutulma) hakkı", "Açık rıza (opt-in)"], obj: "h3" },
      { id: "0f0c5a12", q: "Bulut CRM sağlayıcısı müşteri kayıtlarını yalnızca perakendecinin talimatlarına göre işliyor. Perakendeci kayıtların neden ve nasıl kullanılacağına karar veriyor. Roller hangisidir?", options: ["Perakendeci veri sorumlusu (controller), sağlayıcı veri işleyen (processor)", "Perakendeci veri işleyen, sağlayıcı veri sorumlusu", "Perakendeci veri öznesi, sağlayıcı alt işleyen", "Sağlayıcı veri sorumlusu, perakendeci veri koruyucu (custodian)"], obj: "h3" }
    ],
    interview: [
      { q: "KVKK ve GDPR'ı kısaca anlat.", a: "İkisi de kişisel verilerin korunmasına yönelik yasadır. KVKK Türkiye'de, GDPR AB vatandaşı verisini işleyen herkes için geçerlidir. Açık rıza, aydınlatma, veri minimizasyonu, ilgili kişi hakları ve ihlal bildirimi ortak konulardır." },
      { q: "Uyum ve güvenlik aynı mı?", a: "Hayır. Uyum yasal ve sektörel gereksinimlerin asgari karşılanmasıdır. Güvenlik gerçek riske göre sürekli yapılan çalışmadır. İyi bir program ikisini birlikte sağlar." }
    ],
    vocab: [
      { term: "Compliance", tr: "uyum", ex: "We need GDPR compliance." },
      { term: "Personal data", tr: "kişisel veri", ex: "Protect personal data." },
      { term: "Consent", tr: "rıza", ex: "Get explicit consent." },
      { term: "Data subject", tr: "ilgili kişi", ex: "The data subject can request deletion." },
      { term: "Breach notification", tr: "ihlal bildirimi", ex: "Breach notification is mandatory." }
    ],
    resources: [
      res(PM, "Uyum ve düzenlemeler"),
      { title: "KVKK: Kişisel Verileri Koruma Kurumu", url: "https://www.kvkk.gov.tr/", type: "doc", why: "Türkiye mevzuatı ve rehberler", level: "başlangıç", lang: "TR" }
    ],
    sources: [CT]
  };

  /* 30 ──────────────────────────────────────────── Denetim ve değerlendirme */
  L[30] = {
    hook: "Denetim 'söylediğin gibi yapıyor musun?' sorusunun cevabını kanıtla arar.",
    homework: "Bir kontrol seç (ör. parola politikası). Denetçiye göstermen gereken 3 kanıt türü yaz (ayar ekranı, politika, log).",
    warmup: {
      recap: [{ point: "Uyum, kanıtla gösterilir.", example: "Log, politika, eğitim kaydı" }],
      concepts: [
        { term: "Denetim", tr: "Bağımsız inceleme", summary: "Kontrollerin tanımlı ölçütlere uygun olup olmadığını kanıtla değerlendirmek.", example: "ISO 27001 denetimi" },
        { term: "Sızma testi", tr: "Yetkili saldırı simülasyonu", summary: "Zafiyetleri izinle sömürüp etkiyi göstermek.", example: "Dış ağ sızma testi" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Müşteri 'Güvenlik denetim raporunuzu gönderin' diyor. İç denetim, dış denetim ve sızma testi farklı şeylerdir; hangisini istediğini ve sende hangisinin olduğunu bilmek gerekir." },
      { t: "steps", h: "Denetim ve değerlendirme türleri", items: [
        "İç denetim: kurumun kendi ekibi, süreç iyileştirme için.",
        "Dış denetim: bağımsız üçüncü taraf; sertifika (ISO 27001) ve güvence raporu (SOC 2) için.",
        "Düzenleyici denetim: kurum/yasanın gerektirdiği (ör. BDDK, KVKK).",
        "Zafiyet taraması: otomatik, bilinen açıkları listeler.",
        "Sızma testi: izinle gerçek sömürü, kapsam ve kurallar yazılı."
      ] },
      { t: "steps", h: "Sızma testi türleri", items: [
        "Kara kutu (black box): hedef hakkında bilgi yok. Beyaz kutu (white box): tam bilgi. Gri kutu (gray box): kısmi bilgi.",
        "Bilinen ortam / bilinmeyen ortam, dahili / harici.",
        "Rules of Engagement (ROE): kapsam, zaman, izinli yöntemler, iletişim.",
        "Aşamalar: keşif, tarama, sömürü, kalıcılık, raporlama."
      ] },
      { t: "steps", h: "Renkli takımlar", items: [
        "Red team: saldırgan rolü. Blue team: savunma. Purple team: ikisinin birlikte öğrenmesi.",
        "Bug bounty: araştırmacılara açık ödüllü zafiyet bildirim programı."
      ] },
      { t: "box", h: "Kanıt ve bulgu", text: "Denetçi bulguyu 'gözlem, uygunsuzluk (minör/majör), iyileştirme fırsatı' diye sınıflandırır. Düzeltici eylem planı sahip, tarih ve doğrulama ile takip edilir." },
      { t: "steps", h: "Ölçümler", items: [
        "KPI/KRI: ortalama tespit süresi (MTTD), müdahale süresi (MTTR), yama süresi, phishing tıklama oranı.",
        "Olgunluk modelleri ve karşılaştırmalı değerlendirmeler."
      ] },
      { t: "warn", h: "Tuzak", text: "İzinsiz sızma testi suçtur. Yazılı onay ve kapsam olmadan test yapma, 'iyi niyet' yetmez." },
      { t: "steps", h: "Denetim ve saldırı modelleri (V8)", items: [
        "Denetim kapsamı: denetim tüzüğü (yetki, kapsam, bağımsızlık) ve sıklık. Veri toplama: örnekleme, anket, görüşme ve beyan (yönetimin 'kontrol çalışıyor' demesi, kanıtla doğrulanır).",
        "Boşluk analizi (gap analysis): mevcut durum ile hedef çerçeve ya da standart arasındaki farkı bulur. Denetim türleri: iç, dış (bağımsız üçüncü taraf) ve düzenleyici; kıyaslama (benchmarking) ise kurumu emsallerle karşılaştırır.",
        "MITRE ATT&CK: saldırgan taktik ve tekniklerinin bilgi tabanı; tespit kapsamını matriste göstermek için kullanılır. Cyber Kill Chain: saldırıyı sıralı aşamalara böler (keşif, silahlandırma, teslimat, istismar, kurulum, komuta-kontrol, hedef eylem). Diamond Model: her olayı dört köşeyle ilişkilendirir: saldırgan, yetenek, altyapı, kurban."
      ] }
    ],
    objectives: [
      { id: "h1", text: "Sızma testini kara, beyaz ve gri kutu türlerine göre bilgi düzeyine bakarak ayırt edebilirsin." },
      { id: "h2", text: "Rules of Engagement belgesinin kapsam, zaman ve izinli yöntemleri belirlediğini açıklayabilirsin." },
      { id: "h3", text: "Red, blue ve purple team rollerini birbirinden ayırabilirsin." },
      { id: "h4", text: "Zafiyet taraması ile sızma testi arasındaki farkı ve MITRE ATT&CK, Cyber Kill Chain ve Diamond Model gibi saldırı modellerini ayırt edebilirsin." }
    ],
    summary: [
      "İç denetim, dış denetim, düzenleyici denetim, zafiyet taraması ve sızma testi farklı şeylerdir.",
      "Zafiyet taraması otomatik olarak bilinen açıkları listeler; sızma testi izinle gerçek sömürü yapar.",
      "Sızma testi kara, beyaz ve gri kutu olabilir; kapsam ve kurallar Rules of Engagement'ta yazılıdır.",
      "Red team saldırır, blue team savunur, purple team ikisinin birlikte öğrenmesidir.",
      "İzinsiz sızma testi suçtur; yazılı onay ve kapsam şarttır."
    ],
    quiz: [
      { id: "bcac7a31", q: "Hedef hakkında hiçbir bilgi verilmeden yapılan sızma testi hangisidir?", options: ["Kara kutu (black box)", "Beyaz kutu", "Gri kutu", "Fiziksel"], obj: "h1" },
      { id: "918129dd", q: "Sızma testinde kapsam ve kuralları belirleyen belge hangisidir?", options: ["Rules of Engagement", "SLA", "NDA", "BIA"], obj: "h2" },
      { id: "e7679109", q: "Savunma takımının adı nedir?", options: ["Blue team", "Red team", "Purple team", "Green team"], obj: "h3" },
      { id: "a6b5844b", q: "Otomatik araçla bilinen açıkları listeleyen çalışma nedir?", options: ["Zafiyet taraması", "Sızma testi", "Bug bounty", "Red team"], obj: "h4" },
      { id: "e2c1b998", q: "Güvenlik ekibi, tespit kurallarının hangi saldırgan tekniklerini kapsayıp hangilerini kaçırdığını matris üzerinde göstermek istiyor. Hangi kaynak en uygundur?", options: ["Cyber Kill Chain", "MITRE ATT&CK", "Diamond Model", "CVSS"], obj: "h4" },
      { id: "68acc7fc", q: "Bir analist olayı saldırgan, yetenek, altyapı ve kurban arasındaki ilişkiyle çözümlüyor. Hangi model kullanılıyor?", options: ["Cyber Kill Chain", "MITRE ATT&CK", "STRIDE", "Diamond Model"], obj: "h4" }
    ],
    interview: [
      { q: "Zafiyet taraması ve sızma testi farkı nedir?", a: "Tarama otomatik ve geniş bilinen açıkları listeler. Sızma testi insanla, yetkiyle açıkları sömürüp zincirleyerek gerçek etkiyi gösterir. İkisinde de yazılı kapsam ve izin gerekir." },
      { q: "Red, blue ve purple team nedir?", a: "Red team saldırgan rolünü, blue team savunmayı üstlenir. Purple team iki tarafın işbirliğiyle bulguları paylaşıp savunmayı hızla iyileştirmesidir." }
    ],
    vocab: [
      { term: "Audit", tr: "denetim", ex: "The audit found two gaps." },
      { term: "Penetration test", tr: "sızma testi", ex: "Schedule a penetration test." },
      { term: "Finding", tr: "bulgu", ex: "Fix the critical findings." },
      { term: "Scope", tr: "kapsam", ex: "Define the scope." },
      { term: "Remediation plan", tr: "düzeltme planı", ex: "Submit a remediation plan." }
    ],
    resources: [
      res(PM, "Denetim ve değerlendirme"),
      { title: "OWASP Web Security Testing Guide", url: "https://owasp.org/www-project-web-security-testing-guide/", type: "doc", why: "Test metodolojisi için rehber", level: "ileri", lang: "EN" }
    ],
    sources: [CT]
  };
})();

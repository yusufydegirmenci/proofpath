/* Siber güvenlik (Security+ SY0-801 (V8) temelli) · sabit dersler 31-34 */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).sec = (window.PP_LESSONS.sec || {}));
  var CT = { title: "CompTIA Security+ sınav hedefleri (SY0-801, V8)", url: "https://www.comptia.org/certifications/security" };
  var PM = { title: "Professor Messer: Security+ (ücretsiz video kursu, SY0-701 sürümü)", url: "https://www.professormesser.com/", type: "video", length: "Çok bölümlü", level: "başlangıç", lang: "EN" };
  function res(a, why) { var o = {}; for (var k in a) o[k] = a[k]; o.why = why; return o; }

  /* 31 ──────────────────────────────────────────── Farkındalık eğitimi */
  L[31] = {
    hook: "En iyi güvenlik duvarı da, 'bu bağlantıya tıklayayım' diyen bir çalışanı durduramaz.",
    homework: "Son bir haftada aldığın şüpheli bir e-posta veya mesajı hatırla. Hangi işaretlerden şüphelendin? Üç işaret yaz.",
    warmup: {
      recap: [{ point: "Sosyal mühendislik insanı hedefler.", example: "Oltalama" }],
      concepts: [
        { term: "Security awareness", tr: "Güvenlik farkındalığı", summary: "Çalışanların tehditleri tanıması ve doğru davranması için süreklilik gösteren eğitim.", example: "Yıllık eğitim + aylık mini ders" },
        { term: "Phishing simulation", tr: "Oltalama simülasyonu", summary: "Sahte ama zararsız e-postalarla çalışanların tepkisini ölçmek.", example: "Tıklama oranı raporu" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Şirkette yılda bir kez 'zorunlu eğitim' yapılıyor, herkes hızla geçiyor. Üç ay sonra yine bir çalışan oltalama bağlantısına tıklıyor. Eğitim var ama davranış değişmedi. Etkili farkındalık programı sürekli, kısa, role özel ve ölçülebilir olmalıdır." },
      { t: "steps", h: "Etkili program ögeleri", items: [
        "İşe girişte temel eğitim, sonra düzenli tekrar.",
        "Role özel içerik: finans ekibine fatura dolandırıcılığı, yöneticilere hedefli oltalama (whaling), geliştiricilere güvenli kodlama.",
        "Oltalama simülasyonları ve sonuçların ölçümü.",
        "Şüpheli durumu bildirmeyi kolaylaştıran tek tuşlu 'raporla' düğmesi.",
        "Suçlamadan öğrenme: tıklayanı utandırma, raporlayanı ödüllendir.",
        "Politikalar: temiz masa, parola, ekstra cihaz, uzaktan çalışma kuralları."
      ] },
      { t: "box", h: "Ölçüm", text: "Tıklama oranı tek başına yetmez. Raporlama oranı ve raporlama süresi de ölçülür: şüpheli maili ne kadar çok kişi, ne kadar hızlı bildiriyor? Bildirim kültürü, saldırıyı erken yakalar." },
      { t: "steps", h: "Tehdit türleri (tanıma ipuçları)", items: [
        "Acele ve baskı: 'hemen', 'son uyarı', 'hesabın kapanacak'.",
        "Beklenmeyen ek veya bağlantı; gönderen adresi taklit.",
        "Yetkili kişi taklidi: 'Genel müdür adına', 'BT destek'.",
        "Alışılmadık istek: hediye kartı, acil havale, parola paylaşımı.",
        "Bağlantının üzerine gelince farklı bir adres görünmesi."
      ] },
      { t: "warn", h: "Tuzak", text: "Sadece cezalandırmaya dayalı program, insanları hatalarını saklamaya iter. Bu da olay müdahalesini geciktirir. Raporlamayı güvenli hâle getirmek en değerli kazanımdır." },
      { t: "steps", h: "Eğitim türleri ve ölçme (V8)", items: [
        "Eğitim türleri: başlangıç/oryantasyon (işe girişte), sürekli (düzenli tazeleme), hedefli (rolün özel riskine göre baştan tasarlanır, ör. finans ekibi için BEC) ve düzeltici (hata yapan kişiye olay sonrası verilir, ör. simülasyonda bağlantıya tıklayan çalışana).",
        "Etkinlik ölçme: metrikler (tıklama ve raporlama oranı), yönetim raporları ve personel davranış risk puanı (tekrarlayan hatalara göre kişi ya da birim bazında; riskli gruplara ek eğitim).",
        "Konular: sosyal mühendislik, parola ve kimlik bilgisi yönetimi, uzaktan/hibrit çalışma, BYOD, BEC, çıkarılabilir ortam ve kablolar (şüpheli USB, şarj kablosu), durumsal farkındalık ve operasyonel güvenlik (OPSEC)."
      ] }
    ],
    objectives: [
      { id: "h1", text: "Etkili bir farkındalık programının özelliklerini (sürekli, kısa, role özel, ölçülebilir) ve eğitim türlerini (başlangıç, sürekli, hedefli, düzeltici) sayabilirsin." },
      { id: "h2", text: "Oltalama simülasyonunun amacını açıklayabilirsin." },
      { id: "h3", text: "Raporlama oranı ve süresi gibi bildirim kültürünü gösteren metrikleri ayırt edebilirsin." },
      { id: "h4", text: "Whaling'i yöneticilere hedefli oltalama olarak tanıyabilirsin." }
    ],
    summary: [
      "Yılda bir yapılan zorunlu eğitim davranışı değiştirmez; program sürekli, kısa, role özel ve ölçülebilir olmalıdır.",
      "Oltalama simülasyonları sonuçların ölçülmesi için kullanılır; tıklayanı utandırma, raporlayanı ödüllendir.",
      "Tıklama oranı tek başına yetmez; raporlama oranı ve süresi de ölçülür.",
      "Tanıma ipuçları: acele ve baskı, beklenmeyen ek veya bağlantı, yetkili kişi taklidi, alışılmadık istek.",
      "Sadece cezaya dayalı program hataların saklanmasına ve olay müdahalesinin gecikmesine yol açar."
    ],
    quiz: [
      { id: "794e9218", q: "Etkili bir farkındalık programının özelliği hangisidir?", options: ["Sürekli, kısa ve role özel", "Yılda bir kez, tüm çalışanlara aynı içerikle uzun sunum", "Sadece BT ekibine yönelik teknik eğitim", "Yalnızca ceza"], obj: "h1" },
      { id: "88e771f9", q: "Oltalama simülasyonunun amacı nedir?", options: ["Çalışanların tepkisini ölçmek ve eğitmek", "Çalışanları cezalandırmak", "Ağı yavaşlatmak", "Parolaları toplamak"], obj: "h2" },
      { id: "c9895b0d", q: "Hangi metrik bildirim kültürünü gösterir?", options: ["Şüpheli maili raporlama oranı ve süresi", "Sunucu uptime'ı", "Disk boyutu", "Yedek sayısı"], obj: "h3" },
      { id: "64380148", q: "Yönetici düzeyine hedefli oltalamaya ne denir?", options: ["Whaling", "Smishing", "Tailgating", "Pharming"], obj: "h4" },
      { id: "dfd50255", q: "Oltalama simülasyonunda bağlantıya tıklayan çalışana, o olaya özel kısa bir eğitim atanıyor. Bu eğitim türü nedir?", options: ["Başlangıç (onboarding) eğitimi", "Düzeltici (corrective) eğitim", "Sürekli (ongoing) eğitim", "Hedefli (targeted) eğitim"], obj: "h1" },
      { id: "d20cc644", q: "Bildirim kültürünün güçlendiğini gösteren hangi İKİ metrik izlenmelidir?", options: ["Katılımcıların salonda geçirdiği süre", "Oltalama e-postalarını bildirme oranı", "Bildirime kadar geçen süre", "Eğitmen sayısı ve unvanları", "Eğitim videosunun toplam süresi"], multi: 2, obj: "h3" }
    ],
    interview: [
      { q: "Farkındalık eğitiminin işe yaradığını nasıl ölçersin?", a: "Oltalama simülasyonlarında tıklama oranının düşmesine ve raporlama oranının yükselmesine bakarım. Ayrıca gerçek olay sayısı ve tespit süresi gibi sonuç metriklerini izlerim." },
      { q: "Neden suçlayıcı olmayan bir kültür önemli?", a: "Çalışan hata yaptığında ceza korkusuyla saklarsa olay geç fark edilir ve zarar büyür. Hızlı raporlama sağlamak için güvenli bir ortam şarttır." }
    ],
    vocab: [
      { term: "Awareness", tr: "farkındalık", ex: "Run an awareness program." },
      { term: "Simulation", tr: "simülasyon", ex: "Launch a phishing simulation." },
      { term: "Report", tr: "bildirmek", ex: "Report suspicious emails." },
      { term: "Whaling", tr: "yöneticiye hedefli oltalama", ex: "Whaling targets executives." },
      { term: "Clean desk", tr: "temiz masa", ex: "Follow the clean desk policy." }
    ],
    resources: [
      res(PM, "Güvenlik farkındalığı ve sosyal mühendislik bölümleri"),
      { title: "CISA: Secure Our World", url: "https://www.cisa.gov/secure-our-world", type: "doc", why: "Herkes için basit güvenlik alışkanlıkları", level: "başlangıç", lang: "EN" }
    ],
    sources: [CT]
  };

  /* 32 ──────────────────────────────────────────── Yapay zekâ riskleri */
  L[32] = {
    hook: "Sohbet botuna yapıştırdığın şey, artık sadece senin değil.",
    homework: "Bir yapay zekâ aracına yapıştırmak istemeyeceğin 3 veri türünü yaz (ör. müşteri listesi, parola, kaynak kod).",
    warmup: {
      recap: [{ point: "Veri koruma sınıflandırma ister.", example: "Gizli / genel" }],
      concepts: [
        { term: "Prompt injection", tr: "Komut enjeksiyonu", summary: "Girdi içine gizlenmiş talimatlarla modelin yönlendirilmesi.", example: "Web sayfasındaki gizli metin" },
        { term: "Shadow AI", tr: "Gölge yapay zekâ", summary: "BT onayı olmadan kullanılan yapay zekâ araçları.", example: "Kişisel hesapla kaynak kod yapıştırma" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Bir geliştirici hata ayıklamak için şirketin gizli kaynak kodunu herkese açık bir sohbet botuna yapıştırıyor. Veri şirket dışına çıktı, saklama ve eğitim politikası bilinmiyor. Yapay zekâ kullanımı yararlıdır ama kendi risklerini getirir." },
      { t: "steps", h: "Başlıca riskler", items: [
        "Veri sızıntısı: gizli veri üçüncü taraf modele gönderilir.",
        "Prompt injection: dış içerik (e-posta, web sayfası) modelin davranışını kaçırır.",
        "Hatalı veya uydurma çıktı (hallucination): güvenle yazılmış yanlış bilgi.",
        "Eğitim verisi zehirleme (data poisoning) ve model hırsızlığı.",
        "Aşırı yetki: model bir araca ya da veriye gereğinden fazla erişirse zarar büyür.",
        "Saldırgan kullanımı: ikna edici oltalama, deepfake ses ve video."
      ] },
      { t: "steps", h: "Önlemler", items: [
        "Kabul edilebilir kullanım politikası: hangi veri, hangi araç.",
        "Onaylı kurumsal araçlar; kişisel hesapla kullanımı sınırla.",
        "Veri sınıflandırma ve DLP: gizli veri kontrolsüz çıkmasın.",
        "Çıktıyı doğrula: insan incelemesi, özellikle kod ve hukuki içerikte.",
        "En az yetki: yapay zekâ ajanlarına sadece gerekli araç ve veri.",
        "Deepfake'e karşı doğrulama: acil para talebini ikinci kanaldan teyit et."
      ] },
      { t: "box", h: "Ayrım", text: "Prompt injection, modelin talimatlarını girdi yoluyla değiştirmeye çalışır. SQL injection ise veritabanı sorgusunu hedefler. İkisi de 'veriyi komut gibi yorumlatma' mantığına dayanır." },
      { t: "warn", h: "Tuzak", text: "'Yapay zekâ bunu yazdı, doğrudur' diye kontrolsüz kullanmak risktir. Sorumluluk, çıktıyı kullanan insandadır." },
      { t: "steps", h: "Yapay zekâ tehdit sınıfları (V8)", items: [
        "Model manipülasyonu: zehirleme (poisoning: eğitim verisini bozup modele yanlış öğretmek), kaçınma (evasion: modeli yanıltacak girdi hazırlayıp tespiti atlatmak; model değişmez), jailbreak (güvenlik kurallarını aşmak) ve prompt injection.",
        "Veri ve gizlilik: modele yapıştırılan veri sızabilir ya da eğitimde ezberlenebilir; model çıktısı eğitim verisindeki kişisel bilgiyi açığa çıkarabilir.",
        "Güvenilirlik: önyargı (bias) eğitim verisindeki dengesizlikten doğar ve haksız kararlar üretir; açıklanabilirlik (explainability) modelin neden o kararı verdiğinin anlaşılabilmesidir, kara kutu modeller denetimi zorlaştırır; hallucination uydurma çıktıdır.",
        "Ajan riskleri: modelin bağlı olduğu araç ve eklentiler üzerinden kod çalıştırma ve oturum ele geçirme (session hijacking). Etik: izin, şeffaflık, adalet."
      ] }
    ],
    objectives: [
      { id: "h1", text: "Prompt injection saldırısını tanımlayıp SQL injection ile ortak mantığını ve zehirleme, kaçınma (evasion) ile jailbreak gibi model manipülasyon türlerini ayırt edebilirsin." },
      { id: "h2", text: "Shadow AI kavramını ve kontrolsüz yapay zekâ kullanımının veri sızıntısı riskini anlatabilirsin." },
      { id: "h3", text: "Hatalı veya uydurma çıktının (hallucination) neden doğrulama gerektirdiğini, ayrıca önyargı (bias) ve açıklanabilirlik sorunlarını açıklayabilirsin." },
      { id: "h4", text: "Yapay zekâ ajanlarına en az yetki ilkesini nasıl uygulayacağını söyleyebilirsin." }
    ],
    summary: [
      "Gizli veriyi herkese açık bir sohbet botuna yapıştırmak veriyi şirket dışına çıkarır.",
      "Başlıca riskler: veri sızıntısı, prompt injection, uydurma çıktı, veri zehirleme, aşırı yetki, saldırgan kullanımı.",
      "Prompt injection girdi yoluyla modelin talimatlarını değiştirmeye çalışır; veriyi komut gibi yorumlatma mantığı SQL injection'a benzer.",
      "Önlemler: kabul edilebilir kullanım politikası, onaylı araçlar, DLP, çıktı doğrulama, en az yetki.",
      "Sorumluluk, yapay zekâ çıktısını kullanan insandadır."
    ],
    quiz: [
      { id: "6b250285", q: "Dış içerikteki gizli talimatlarla bir modelin yönlendirilmesine ne denir?", options: ["Prompt injection", "Phishing (kullanıcıyı sahte mesajla kandırma saldırısı)", "Tailgating (yetkili birinin ardından izinsiz giriş)", "Hashing"], obj: "h1" },
      { id: "ab5c0ee0", q: "BT onayı olmadan yapay zekâ araçlarının kullanılmasına ne denir?", options: ["Shadow AI", "Zero Trust", "Failover", "Sandboxing"], obj: "h2" },
      { id: "70a7b9c4", q: "Modelin güvenle yazdığı ama yanlış olan çıktısına ne denir?", options: ["Hallucination", "Encryption (veriyi gizlemek için şifreleme işlemi)", "Replay (yakalanan mesajın yeniden gönderildiği saldırı)", "Pivoting"], obj: "h3" },
      { id: "8a1857b3", q: "Yapay zekâ ajanı için doğru yetki yaklaşımı hangisidir?", options: ["Sadece gereken araç ve veri", "Tam yönetici", "Tüm veritabanı", "Yetkisiz"], obj: "h4" },
      { id: "ad11a03c", q: "Saldırgan, bir zararlı yazılım sınıflandırıcısını yanıltmak için dosyaya modelin 'zararsız' diye öğrendiği özellikleri ekliyor ve tespit edilmeden geçiyor. Modelin kendisi ve eğitim verisi değişmiyor. Bu saldırı hangisidir?", options: ["Zehirleme (poisoning)", "Prompt injection", "Kaçınma (evasion)", "Halüsinasyon (hallucination)"], obj: "h1" },
      { id: "f8f79551", q: "İşe alım ekibinin kullandığı model, geçmiş işe alım verileriyle eğitildiği için belirli bir grubun adaylarını sistematik olarak düşük puanlıyor. Bu hangi riskin örneğidir?", options: ["Zehirleme (poisoning)", "Önyargı (bias)", "Jailbreak", "Kaçınma (evasion)"], obj: "h3" },
      { id: "fe414afc", q: "Bir banka kredi reddi kararının nedenini müşteriye ve denetçiye anlatamıyor, çünkü kullandığı model karar gerekçesini sunmuyor. Eksik olan özellik hangisidir?", options: ["Açıklanabilirlik (explainability)", "Evasion direnci", "Veri minimizasyonu", "Jailbreak koruması"], obj: "h3" }
    ],
    interview: [
      { q: "Şirkette yapay zekâ araçlarını nasıl güvenli yönetirdin?", a: "Kabul edilebilir kullanım politikası yazar, onaylı kurumsal araçlar sağlarım. Veri sınıflandırması ve DLP ile gizli verinin çıkışını kontrol eder, çıktıların insan tarafından doğrulanmasını şart koşarım." },
      { q: "Prompt injection nedir ve nasıl azaltılır?", a: "Dış içerikteki gizli talimatların modeli yönlendirmesidir. Güvenilmeyen girdiyi talimattan ayırmak, araç yetkilerini en aza indirmek ve kritik eylemlerde insan onayı istemek riski azaltır." }
    ],
    vocab: [
      { term: "Prompt", tr: "komut istemi", ex: "Do not paste secrets into a prompt." },
      { term: "Hallucination", tr: "uydurma çıktı", ex: "Check for hallucinations." },
      { term: "Data leakage", tr: "veri sızıntısı", ex: "Prevent data leakage." },
      { term: "Deepfake", tr: "sahte ses/görüntü", ex: "A deepfake call asked for money." },
      { term: "Guardrail", tr: "güvenlik sınırı", ex: "Add guardrails to the model." }
    ],
    resources: [
      res(PM, "Güncel tehdit ve veri koruma konuları"),
      { title: "OWASP Top 10 for LLM Applications", url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/", type: "doc", why: "Büyük dil modeli uygulamalarının başlıca riskleri", level: "orta", lang: "EN" }
    ],
    sources: [CT]
  };

  /* 33 ──────────────────────────────────────────── Zero Trust */
  L[33] = {
    hook: "'İç ağdasın, güvenilirsin' dönemi bitti. Zero Trust: kimse otomatik güvenilir değil.",
    homework: "Bir uygulamaya girerken geçtiğin kontrolleri say: parola, MFA, cihaz kontrolü, konum. Hangisi eksik?",
    warmup: {
      recap: [{ point: "En az yetki erişimi sınırlar.", example: "Rol bazlı yetki" }, { point: "MFA kimliği güçlendirir.", example: "Parola + kod" }],
      concepts: [
        { term: "Zero Trust", tr: "Sıfır güven", summary: "Ağ konumuna bakmadan her erişim isteğini açıkça doğrulama yaklaşımı.", example: "Her istekte kimlik, cihaz, bağlam" },
        { term: "Policy decision point", tr: "Politika karar noktası", summary: "Erişim isteğine izin verip vermeyeceğine karar veren bileşen.", example: "Policy Engine + Administrator" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Çalışan evden VPN ile bağlanıyor ve iç ağa girince her şeye erişebiliyor. Bir saldırgan o hesabı ele geçirirse ağda serbestçe gezer. Zero Trust, erişimi her istekte doğrular ve yatay hareketi sınırlar." },
      { t: "steps", h: "Temel ilkeler", items: [
        "Asla güvenme, her zaman doğrula: ağ konumu güven sağlamaz.",
        "Açık doğrulama: kimlik, cihaz sağlığı, konum ve davranış birlikte değerlendirilir.",
        "En az yetki ve tam zamanında erişim.",
        "İhlal varsayımı (assume breach): saldırgan zaten içeride olabilir; hasarı sınırla.",
        "Mikro segmentasyon: ağı küçük bölgelere ayır, bölgeler arası trafiği denetle.",
        "Sürekli izleme ve loglama."
      ] },
      { t: "steps", h: "Mimari kavramları", items: [
        "Kontrol düzlemi (control plane): kararların verildiği yer. Politika motoru ve politika yöneticisi (policy engine, policy administrator).",
        "Veri düzlemi (data plane): asıl trafiğin aktığı yer. Politika uygulama noktası (policy enforcement point) kapı bekçisi gibidir.",
        "Uyarlanabilir kimlik doğrulama: riske göre ek kontrol (yeni cihaz veya ülke → MFA iste).",
        "Tehdit kapsamı azaltma (threat scope reduction): erişilebilir yüzeyi küçültme."
      ] },
      { t: "box", h: "VPN farkı", text: "Klasik VPN: bağlandıktan sonra ağa geniş erişim. Zero Trust: her uygulama için ayrı, bağlamsal erişim. Zero Trust bir ürün değil, bir mimari yaklaşımdır." },
      { t: "warn", h: "Tuzak", text: "'Zero Trust ürünü aldık, bitti' demek yanlıştır. Kimlik yönetimi, cihaz yönetimi, segmentasyon ve izleme birlikte çalışmalıdır." },
      { t: "steps", h: "Bulut güvenlik hizmetleri ve arıza modları (V8)", items: [
        "SSE (Security Service Edge): güvenli web geçidi, bulut erişim denetimi ve sıfır güven ağ erişimi gibi güvenlik hizmetlerini buluttan sunar; kullanıcı nerede olursa olsun trafik bulutta denetlenir. SASE ise SSE'ye SD-WAN ağ işlevlerini ekleyen birleşik bulut modelidir.",
        "Arıza modları: fail-open arızada trafiğe izin verir (erişilebilirlik önceliklidir); fail-closed (fail-secure) arızada keser (güvenlik önceliklidir). Seçim varlığın değerine ve kesintinin sonucuna bağlıdır.",
        "Bant dışı yönetim (out-of-band): cihazı üretim ağından ayrı bir kanaldan (ayrı yönetim ağı, konsol) yönetmek; üretim ağı çökse ya da ele geçirilse bile yönetici erişimi sürer.",
        "Zero Trust'ta cihazın sağlığı (güncel, şifreli, yönetilen) ve envanteri de erişim kararına katılır."
      ] }
    ],
    objectives: [
      { id: "h1", text: "Zero Trust'ın temel ilkesini (asla güvenme, her zaman doğrula) açıklayabilirsin." },
      { id: "h2", text: "'Assume breach' yaklaşımını, hasarı sınırlayan önlemleri ve arıza modlarını (fail-open, fail-closed) anlatabilirsin." },
      { id: "h3", text: "Kontrol düzlemi ile veri düzleminin rollerini ayırt edebilirsin." },
      { id: "h4", text: "Mikro segmentasyonun yatay hareketi nasıl sınırladığını, SSE ile SASE farkını ve bant dışı yönetimin rolünü söyleyebilirsin." }
    ],
    summary: [
      "Zero Trust'ta ağ konumu güven sağlamaz; her istek kimlik, cihaz sağlığı ve bağlamla doğrulanır.",
      "En az yetki, tam zamanında erişim ve sürekli izleme temel ilkelerdir.",
      "Assume breach: saldırgan zaten içeride olabilir, hasarı sınırla.",
      "Mikro segmentasyon ağı küçük bölgelere ayırır ve bölgeler arası trafiği denetler.",
      "Karar kontrol düzleminde verilir, uygulama veri düzleminde olur; Zero Trust bir ürün değil mimari yaklaşımdır."
    ],
    quiz: [
      { id: "3d585d3b", q: "Zero Trust'ın temel ilkesi hangisidir?", options: ["Hiçbir isteğe otomatik güvenme, her zaman doğrula", "İç ağdakilere tam güven", "Sadece güvenlik duvarı", "Parola yeterli"], obj: "h1" },
      { id: "f31fd4b7", q: "'Assume breach' ne demektir?", options: ["İhlalin zaten olmuş olabileceğini varsayıp hasarı sınırlamak", "İhlal asla olmaz", "Sadece dışarıyı izlemek", "Logları kapatmak"], obj: "h2" },
      { id: "27f72d92", q: "Erişim kararının verildiği Zero Trust bileşeni hangisidir?", options: ["Kontrol düzlemi (politika motoru)", "Veri düzlemi kablosu", "Yazıcı", "Yedek sunucu"], obj: "h3" },
      { id: "2939120e", q: "Ağı küçük bölgelere ayırıp bölgeler arası trafiği denetlemeye ne denir?", options: ["Mikro segmentasyon", "Hashing (veriyi sabit uzunlukta özete çevirme)", "Salting (parola özetlerine rastgele değer ekleme)", "Tokenization"], obj: "h4" },
      { id: "66169b65", q: "Bir kurum, uzaktan çalışanların şirket VPN'ine bağlanmadan da web filtreleme, bulut uygulama denetimi ve erişim politikası altında olmasını; denetimin bulutta yapılmasını istiyor. Hangi mimari bu ihtiyacı karşılar?", options: ["Hava boşluğu (air gap)", "Yalnızca site-to-site IPsec VPN", "Security Service Edge (SSE)", "DMZ içinde bastion host"], obj: "h4" },
      { id: "341baf58", q: "Bir kurumun internet çıkışındaki güvenlik cihazı arızalanırsa hiç trafik geçmemeli; erişilebilirlikten çok güvenlik önceliklidir. Hangi arıza modu seçilmelidir?", options: ["Fail-open", "Aktif-aktif yedeklilik", "Fail-closed (fail-secure)", "Bölünmüş tünel (split tunnel)"], obj: "h2" },
      { id: "c74e37cf", q: "Bir kurum, şube ağ bağlantısını (SD-WAN) ve bulut tabanlı güvenlik hizmetlerini tek bir bulut hizmetinde birleştirmek istiyor. Bu birleşik model hangisidir?", options: ["Yalnızca SSE", "SASE", "Kod olarak altyapı (IaC)", "Honeynet"], obj: "h4" }
    ],
    interview: [
      { q: "Zero Trust nedir ve klasik çevre güvenliğinden farkı?", a: "Ağ konumuna güvenmeden her erişim isteğini kimlik, cihaz ve bağlama göre doğrulama yaklaşımıdır. Klasik modelde içeri giren güvenilir sayılırdı; Zero Trust'ta içeriye giriş hak vermez, her kaynak ayrıca doğrulanır." },
      { q: "Zero Trust'ı kademeli nasıl uygularsın?", a: "Önce kimlik ve MFA'yı güçlendirir, cihaz durumunu envanterlerim. Sonra kritik uygulamaları segmente edip en az yetki politikaları uygular, sürekli izleme ve loglamayla doğrularım." }
    ],
    vocab: [
      { term: "Zero Trust", tr: "sıfır güven", ex: "We adopted a Zero Trust model." },
      { term: "Enforcement point", tr: "uygulama noktası", ex: "The gateway is the enforcement point." },
      { term: "Lateral movement", tr: "yatay hareket", ex: "Segmentation limits lateral movement." },
      { term: "Verify", tr: "doğrulamak", ex: "Always verify the device." },
      { term: "Context", tr: "bağlam", ex: "Use context for access decisions." }
    ],
    resources: [
      res(PM, "Zero Trust bölümü"),
      { title: "NIST SP 800-207: Zero Trust Architecture", url: "https://csrc.nist.gov/pubs/sp/800/207/final", type: "doc", why: "Zero Trust mimarisinin resmî tanımı", level: "ileri", lang: "EN" }
    ],
    sources: [CT]
  };

  /* 34 ──────────────────────────────────────────── Değişiklik yönetimi */
  L[34] = {
    hook: "Birçok kesinti saldırıdan değil, 'küçük bir ayar değişikliğinden' çıkar.",
    homework: "Bir ayar değiştirmeden önce yazacağın 4 şeyi listele: neden, etki, geri alma planı, kim onaylar.",
    warmup: {
      recap: [{ point: "Sertleştirme yapılandırmayı sabitler.", example: "Baseline" }],
      concepts: [
        { term: "Change management", tr: "Değişiklik yönetimi", summary: "Değişikliklerin planlı, onaylı, test edilmiş ve kayıtlı yapılması.", example: "Değişiklik talebi (RFC)" },
        { term: "Rollback", tr: "Geri alma", summary: "Değişiklik sorun çıkarırsa önceki duruma dönüş planı.", example: "Eski sürüme dön" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Cuma akşamı biri güvenlik duvarına 'geçici' bir kural ekliyor, kimseye söylemiyor. Pazartesi bir servis çöküyor ve kimse nedenini bilmiyor. Kayıtsız değişiklik hem kesinti hem güvenlik açığı doğurur." },
      { t: "steps", h: "Süreç adımları", items: [
        "Talep: ne, neden, kim istiyor.",
        "Etki analizi: hangi sistemler, kullanıcılar ve bağımlılıklar etkilenir; risk nedir.",
        "Onay: değişiklik danışma kurulu (CAB) veya yetkili kişi.",
        "Test: üretim dışı ortamda dene.",
        "Planlı pencerede uygula; geri alma planı hazır olsun.",
        "Uygulama sonrası doğrulama ve belgeleme (konfigürasyon kaydı güncellenir)."
      ] },
      { t: "steps", h: "Değişiklik türleri", items: [
        "Standart: önceden onaylı, düşük riskli, tekrarlayan (parola sıfırlama).",
        "Normal: tam süreçten geçen planlı değişiklik.",
        "Acil (emergency): hızla uygulanır, sonradan gözden geçirilir."
      ] },
      { t: "box", h: "Güvenlik bağlantısı", text: "Yama yönetimi, yapılandırma değişikliği ve erişim güncellemesi değişiklik sürecinden geçmelidir. Ayrıca sürümleme ve konfigürasyon yönetimi (baseline, diyagram, sürüm kaydı) kimin neyi ne zaman değiştirdiğini gösterir." },
      { t: "warn", h: "Tuzak", text: "Geri alma planı olmayan değişiklik kumardır. 'Çalışmazsa bakarız' bir plan değildir." },
      { t: "steps", h: "Değişiklik yönetimi ayrıntıları (V8)", items: [
        "Onay süreci öğeleri: sahiplik, paydaşlar, etki analizi, test sonuçları, geri alma (backout) planı ve bakım penceresi (iş etkisinin en düşük olduğu önceden duyurulan zaman aralığı). Kurul: CAB.",
        "İleri düzeltme (fail forward): değişiklik sorun çıkarınca eski sürüme dönmek yerine sorunu yeni bir düzeltmeyle çözerek ilerlemek. Geri dönüşü zor ya da riskli değişikliklerde (ör. geri dönüşü olmayan veri dönüşümü) tercih edilir.",
        "Teknik sonuçlar: allow/deny listeleri güncellemesi, servis ve uygulama yeniden başlatma, kesinti, eski (legacy) uygulamalar ve bağımlılıklar. Belgeleme: diyagram, politika ve prosedür güncelleme; sürüm kontrolü. SOP: sık yapılan değişikliğin ayrıntılı adımları."
      ] }
    ],
    objectives: [
      { id: "h1", text: "Değişiklik yönetimi sürecinin adımlarını (talep, etki analizi, onay, test, uygulama, doğrulama) sıralayabilirsin." },
      { id: "h2", text: "Geri alma (rollback) planının neden her değişiklikte hazır olması gerektiğini ve geri dönüşün zor olduğu yerde ileri düzeltmenin (fail forward) ne olduğunu açıklayabilirsin." },
      { id: "h3", text: "Standart, normal ve acil değişiklik türlerini birbirinden ayırabilirsin." },
      { id: "h4", text: "CAB'ın değişiklik sürecindeki onay rolünü söyleyebilirsin." }
    ],
    summary: [
      "Kayıtsız değişiklik hem kesinti hem güvenlik açığı doğurur.",
      "Süreç: talep, etki analizi, onay, test, planlı pencerede uygulama, doğrulama ve belgeleme.",
      "Değişiklik türleri: standart (önceden onaylı), normal (tam süreç), acil (hızlı, sonradan gözden geçirilir).",
      "Yama, yapılandırma ve erişim güncellemeleri de değişiklik sürecinden geçmelidir.",
      "Geri alma planı olmayan değişiklik kumardır."
    ],
    quiz: [
      { id: "1b0818c3", q: "Bir değişikliğin hangi sistemleri etkileyeceğini inceleyen adıma ne denir?", options: ["Etki analizi", "Yedekleme (verinin başka yere kopyalanması)", "Şifreleme (veriyi okunamaz hale getirme işlemi)", "Hashing"], obj: "h1" },
      { id: "37e768d5", q: "Değişiklik sorun çıkarırsa önceki duruma dönmeye ne denir?", options: ["Rollback", "Failover", "Escalation", "Quarantine"], obj: "h2" },
      { id: "48efee39", q: "Önceden onaylı, düşük riskli, tekrarlayan değişiklik türü hangisidir?", options: ["Standart değişiklik", "Acil değişiklik", "Kayıtsız değişiklik", "Gizli değişiklik"], obj: "h3" },
      { id: "238ac0f4", q: "Değişiklik taleplerini inceleyip onaylayan kurulun adı nedir?", options: ["CAB", "SIEM", "SOC", "NOC"], obj: "h4" },
      { id: "4ffe9765", q: "Bir veritabanı şema dönüşümü yarıda hata verdi; eski şemaya dönmek verileri tutarsız bırakacak. Ekip hatayı hızlı bir yamayla düzeltip yeni sürümle ilerliyor. Bu yaklaşım nedir?", options: ["İleri düzeltme (fail forward)", "Geri alma (backout / rollback)", "Acil değişiklik", "Standart değişiklik"], obj: "h2" },
      { id: "23b21334", q: "Değişiklik yöneticisi, kesinti etkisini en aza indirmek için bir sunucu güncellemesini iş saatleri dışındaki, önceden duyurulmuş bir zaman aralığına planlıyor. Bu aralığa ne denir?", options: ["Geri alma penceresi", "Etki analizi", "CAB toplantısı", "Bakım penceresi (maintenance window)"], obj: "h2" }
    ],
    interview: [
      { q: "Güvenlik açısından değişiklik yönetimi neden önemli?", a: "Kayıtsız değişiklikler yanlış yapılandırma ve gizli açıklar yaratır, ayrıca olay incelemesini zorlaştırır. Süreç; etki analizi, onay, test, geri alma planı ve kayıtla hem kesintiyi hem açığı azaltır." },
      { q: "Acil değişiklikte neyi atlamazsın?", a: "Hızlı ilerlesem de yetkili onayı, kısa bir etki değerlendirmesi ve geri alma planını atlamam. Sonradan değişikliği belgeler ve gözden geçiririm." }
    ],
    vocab: [
      { term: "Change request", tr: "değişiklik talebi", ex: "Submit a change request." },
      { term: "Approval", tr: "onay", ex: "Wait for approval." },
      { term: "Rollback plan", tr: "geri alma planı", ex: "Every change needs a rollback plan." },
      { term: "Maintenance window", tr: "bakım penceresi", ex: "Deploy in the maintenance window." },
      { term: "Baseline", tr: "temel yapılandırma", ex: "Compare against the baseline." }
    ],
    resources: [
      res(PM, "Değişiklik yönetimi bölümü"),
      { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", type: "doc", why: "Yönetişim ve değişiklik süreçleri için çerçeve", level: "orta", lang: "EN" }
    ],
    sources: [CT]
  };
})();

/* Siber güvenlik (Security+ SY0-701 temelli) · sabit dersler 31-34 */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).sec = (window.PP_LESSONS.sec || {}));
  var CT = { title: "CompTIA Security+ sınav hedefleri (SY0-701)", url: "https://www.comptia.org/certifications/security" };
  var PM = { title: "Professor Messer: Security+ SY0-701 (ücretsiz video kursu)", url: "https://www.professormesser.com/", type: "video", length: "Çok bölümlü", level: "başlangıç", lang: "EN" };
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
      { t: "warn", h: "Tuzak", text: "Sadece cezalandırmaya dayalı program, insanları hatalarını saklamaya iter. Bu da olay müdahalesini geciktirir. Raporlamayı güvenli hâle getirmek en değerli kazanımdır." }
    ],
    quiz: [
      { q: "Etkili bir farkındalık programının özelliği hangisidir?", options: ["Sürekli, kısa ve role özel", "Yılda bir kez uzun sunum", "Sadece BT ekibine yönelik", "Yalnızca ceza"], answer: "Sürekli, kısa ve role özel", why: "Davranış değişimi tekrar ve ilgili içerikle gelir." },
      { q: "Oltalama simülasyonunun amacı nedir?", options: ["Çalışanların tepkisini ölçmek ve eğitmek", "Çalışanları cezalandırmak", "Ağı yavaşlatmak", "Parolaları toplamak"], answer: "Çalışanların tepkisini ölçmek ve eğitmek", why: "Zararsız sahte maillerle gerçek davranış ölçülür." },
      { q: "Hangi metrik bildirim kültürünü gösterir?", options: ["Şüpheli maili raporlama oranı ve süresi", "Sunucu uptime'ı", "Disk boyutu", "Yedek sayısı"], answer: "Şüpheli maili raporlama oranı ve süresi", why: "Çok ve hızlı raporlama saldırıyı erken yakalar." },
      { q: "Yönetici düzeyine hedefli oltalamaya ne denir?", options: ["Whaling", "Smishing", "Tailgating", "Pharming"], answer: "Whaling", why: "Whaling, üst düzey yöneticileri hedefler." }
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
      { t: "warn", h: "Tuzak", text: "'Yapay zekâ bunu yazdı, doğrudur' diye kontrolsüz kullanmak risktir. Sorumluluk, çıktıyı kullanan insandadır." }
    ],
    quiz: [
      { q: "Dış içerikteki gizli talimatlarla bir modelin yönlendirilmesine ne denir?", options: ["Prompt injection", "Phishing", "Tailgating", "Hashing"], answer: "Prompt injection", why: "Girdi içine gizlenmiş talimatlar modelin davranışını değiştirir." },
      { q: "BT onayı olmadan yapay zekâ araçlarının kullanılmasına ne denir?", options: ["Shadow AI", "Zero Trust", "Failover", "Sandboxing"], answer: "Shadow AI", why: "Gölge BT'nin yapay zekâ karşılığıdır." },
      { q: "Modelin güvenle yazdığı ama yanlış olan çıktısına ne denir?", options: ["Hallucination", "Encryption", "Replay", "Pivoting"], answer: "Hallucination", why: "Uydurma çıktı, çıktı doğrulamasını gerekli kılar." },
      { q: "Yapay zekâ ajanı için doğru yetki yaklaşımı hangisidir?", options: ["Sadece gereken araç ve veri", "Tam yönetici", "Tüm veritabanı", "Yetkisiz"], answer: "Sadece gereken araç ve veri", why: "En az yetki ilkesi hasarı sınırlar." }
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
      { t: "warn", h: "Tuzak", text: "'Zero Trust ürünü aldık, bitti' demek yanlıştır. Kimlik yönetimi, cihaz yönetimi, segmentasyon ve izleme birlikte çalışmalıdır." }
    ],
    quiz: [
      { q: "Zero Trust'ın temel ilkesi hangisidir?", options: ["Hiçbir isteğe otomatik güvenme, her zaman doğrula", "İç ağdakilere tam güven", "Sadece güvenlik duvarı", "Parola yeterli"], answer: "Hiçbir isteğe otomatik güvenme, her zaman doğrula", why: "Ağ konumu güven sağlamaz; her erişim doğrulanır." },
      { q: "'Assume breach' ne demektir?", options: ["İhlalin zaten olmuş olabileceğini varsayıp hasarı sınırlamak", "İhlal asla olmaz", "Sadece dışarıyı izlemek", "Logları kapatmak"], answer: "İhlalin zaten olmuş olabileceğini varsayıp hasarı sınırlamak", why: "Segmentasyon ve en az yetki hasarı sınırlar." },
      { q: "Erişim kararının verildiği Zero Trust bileşeni hangisidir?", options: ["Kontrol düzlemi (politika motoru)", "Veri düzlemi kablosu", "Yazıcı", "Yedek sunucu"], answer: "Kontrol düzlemi (politika motoru)", why: "Karar kontrol düzleminde, uygulama veri düzleminde olur." },
      { q: "Ağı küçük bölgelere ayırıp bölgeler arası trafiği denetlemeye ne denir?", options: ["Mikro segmentasyon", "Hashing", "Salting", "Tokenization"], answer: "Mikro segmentasyon", why: "Yatay hareketi sınırlar." }
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
      { t: "warn", h: "Tuzak", text: "Geri alma planı olmayan değişiklik kumardır. 'Çalışmazsa bakarız' bir plan değildir." }
    ],
    quiz: [
      { q: "Bir değişikliğin hangi sistemleri etkileyeceğini inceleyen adıma ne denir?", options: ["Etki analizi", "Yedekleme", "Şifreleme", "Hashing"], answer: "Etki analizi", why: "Etki analizi riski ve bağımlılıkları ortaya çıkarır." },
      { q: "Değişiklik sorun çıkarırsa önceki duruma dönmeye ne denir?", options: ["Rollback", "Failover", "Escalation", "Quarantine"], answer: "Rollback", why: "Geri alma planı her değişiklikte hazır olmalıdır." },
      { q: "Önceden onaylı, düşük riskli, tekrarlayan değişiklik türü hangisidir?", options: ["Standart değişiklik", "Acil değişiklik", "Kayıtsız değişiklik", "Gizli değişiklik"], answer: "Standart değişiklik", why: "Standart değişiklikler önceden onaylı kalıplardır." },
      { q: "Değişiklik taleplerini inceleyip onaylayan kurulun adı nedir?", options: ["CAB", "SIEM", "SOC", "NOC"], answer: "CAB", why: "Change Advisory Board değişiklikleri değerlendirir." }
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

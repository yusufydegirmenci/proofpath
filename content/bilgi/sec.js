/* Bölüm sonu bilgi testi (Faz 21) · sec. Yalnız soru ve seçenekler; doğru cevap/açıklama sunucuda (ogr_bilgi_kontrol), burada YOK. */
(window.PP_BILGI = window.PP_BILGI || {}).sec = {
 "1": {
  "baslik": "CIA, kontroller, hash, PKI ve tehdit aktörleri",
  "dersler": [
   1,
   6
  ],
  "sorular": [
   {
    "id": "acb1f2a8",
    "q": "Bir saldırgan muhasebe veritabanındaki IBAN alanlarını sessizce değiştirdi ve hash karşılaştırması bunu ortaya çıkardı. Hangi CIA öğesi ihlal edildi, hangi araç fark ettirdi?",
    "options": [
     "Erişilebilirlik; yedek sistem",
     "Bütünlük; hash karşılaştırması",
     "Gizlilik; erişim denetimi listesi",
     "Gizlilik; disk şifreleme düzeyi"
    ]
   },
   {
    "id": "07095dfc",
    "q": "Yamalanamayan eski bir üretim cihazı ayrı bir ağ segmentine alınıp erişimi kısıtlandı. Bu kontrolün işlevi hangisidir?",
    "options": [
     "Yönlendirici (directive) kontrol",
     "Caydırıcı (deterrent) kontrol",
     "Telafi edici (compensating)",
     "Düzeltici (corrective) kontrol"
    ]
   },
   {
    "id": "2475b976",
    "q": "Parola veritabanında aynı parolayı kullanan iki kullanıcının hash değerlerinin farklı çıkmasını ve hazır tabloları boşa çıkarmayı ne sağlar?",
    "options": [
     "Hash çıktısını 64 karaktere uzatmak",
     "Her parolaya eklenen benzersiz salt",
     "Hash değerini dijital imzayla imzalamak",
     "Parolayı geri çözülebilir AES ile saklamak"
    ]
   },
   {
    "id": "e3c06000",
    "q": "Bir çalışan ayrıldığında şifreli verisinin kurum tarafından kurtarılabilmesi için özel anahtarın kopyasının sıkı denetimli bir yerde tutulmasına ne denir?",
    "options": [
     "OCSP ile iptal durumu sorgusu",
     "Wildcard sertifika satın almak",
     "Anahtar emanet (key escrow)",
     "CSR üretip CA'ya imzalatma işlemi"
    ]
   }
  ]
 },
 "2": {
  "baslik": "Saldırı türleri, zafiyetler ve segmentasyon",
  "dersler": [
   7,
   12
  ],
  "sorular": [
   {
    "id": "f1dcc8a0",
    "q": "Otoparktaki ödeme makinesine yapıştırılmış sahte bir QR kod, tarayan kişileri zararlı bir siteye götürüyor. Bu saldırının adı nedir?",
    "options": [
     "Quishing",
     "Smishing",
     "Watering hole (hedef sitesini ele geçirme)",
     "Pharming"
    ]
   },
   {
    "id": "b7b54e2c",
    "q": "Saldırgan 5.000 kullanıcı hesabının her birinde yalnızca 'Yaz2026!' parolasını deniyor ve hesap kilitleme eşiğine takılmıyor. Bu saldırı hangisidir?",
    "options": [
     "Credential stuffing",
     "Password spraying",
     "Tek hesaba yönelik brute force",
     "Replay saldırısı"
    ]
   },
   {
    "id": "55dd9d7e",
    "q": "Saldırgan, bir uygulamanın 'URL'den içe aktar' özelliğini kullanıp sunucuya iç ağdaki yönetim paneline istek yaptırıyor. Bu zafiyet türü nedir?",
    "options": [
     "XSS",
     "CSRF",
     "Path traversal",
     "SSRF"
    ]
   },
   {
    "id": "f2b9a54d",
    "q": "Zafiyetlerin arkasındaki hata sınıflarını (bellek taşması, enjeksiyon, gömülü kimlik bilgisi gibi) listeleyen ortak sınıflandırma hangisidir?",
    "options": [
     "CVE",
     "CWE",
     "CVSS",
     "CISA KEV"
    ]
   }
  ]
 },
 "3": {
  "baslik": "Güvenlik duvarı, VPN, veri koruma ve dayanıklılık",
  "dersler": [
   13,
   18
  ],
  "sorular": [
   {
    "id": "6f469f03",
    "q": "Bir güvenlik duvarında 1. kural 10.1.1.5'ten sunucuya 443'ü ENGELLİYOR, 2. kural 10.1.1.0/24'ten sunucuya 443'e İZİN veriyor. 10.1.1.5'ten gelen istek ne olur?",
    "options": [
     "İzin verilir; iki kural eşleşince izin kazanır",
     "Engellenir; örtük reddetme kuralı önce çalışır",
     "İzin verilir; daha geniş kapsamlı kural önceliklidir",
     "Engellenir; ilk eşleşen kural uygulanır"
    ]
   },
   {
    "id": "936a249c",
    "q": "Çalışan evden bağlanırken yalnızca şirket trafiği VPN tüneline giriyor, diğer internet trafiği doğrudan çıkıyor. Bu yapılandırma hangisidir?",
    "options": [
     "Split tunnel",
     "Full tunnel",
     "Always-on VPN",
     "Site-to-site VPN"
    ]
   },
   {
    "id": "0c839f91",
    "q": "Bir ödeme sistemi kart numarasını anlamsız bir jetonla değiştirip asıl numarayı ayrı bir kasada tutuyor. Bu tekniğin adı nedir?",
    "options": [
     "Tokenizasyon",
     "Veri sınıflandırma",
     "Kriptografik silme",
     "Maskeleme"
    ]
   },
   {
    "id": "0fee135f",
    "q": "Fidye yazılımı bir dosya sunucusundaki dosyaları şifreledi. Sunucu RAID 1 (ayna) kullanıyor. Kurtarma için bu yeterli midir?",
    "options": [
     "Evet; ikinci disk dosyanın eski halini de saklar",
     "Hayır; şifrelenen hali de aynalanır, yedek gerekir",
     "Evet; RAID fidye yazılımını yalnızca tek diske sınırlar",
     "Hayır; yalnızca anlık görüntü (snapshot) yetersizdir"
    ]
   }
  ]
 },
 "4": {
  "baslik": "Ayrıcalıklar, izleme, varlık ve olay müdahalesi",
  "dersler": [
   19,
   24
  ],
  "sorular": [
   {
    "id": "ef701ad6",
    "q": "Muhasebeden satın almaya geçen bir çalışan eski sistemlere de erişmeye devam ediyor. Bu durum nedir, çözüm nedir?",
    "options": [
     "Ayrıcalık birikimi; eski yetkileri silmek",
     "Ayrıcalık yükseltme; yamayı hemen uygulamak",
     "Gölge BT; kullanımı tamamen yasaklamak",
     "Görev ayrımı; iki kişiye onay yetkisi vermek"
    ]
   },
   {
    "id": "643840d0",
    "q": "Aynı kullanıcı hesabı 10 dakika arayla önce İstanbul'dan, sonra Brezilya'dan oturum açıyor. Bu hangi göstergedir?",
    "options": [
     "Hesap kilitlenmesinde artış göstergesi",
     "İmkânsız seyahat göstergesi",
     "Log silme veya değiştirme göstergesi",
     "Normal çoklu oturum davranışı"
    ]
   },
   {
    "id": "bede6aea",
    "q": "Ağdaki DHCP kayıtlarında IP alan ama envanterde (IPAM) bulunmayan bir cihaz çıkıyor. En doğru yorum hangisidir?",
    "options": [
     "Yalnızca yazıcılar böyle görünür; endişe gerekmez",
     "DHCP hatasıdır; kayıt yok sayılmalıdır",
     "Normal durumdur; envanter ağı yansıtmak zorunda değil",
     "Yönetilmeyen/sahte cihaz olabilir, araştırılmalı"
    ]
   },
   {
    "id": "4b98bb23",
    "q": "Olay müdahalesinde sınırlamadan sonra zararlıyı ve kök nedeni ortadan kaldırma aşamasının adı nedir?",
    "options": [
     "Hazırlık (preparation)",
     "Yok etme (eradication)",
     "Ders çıkarma (lessons learned)",
     "Kurtarma (recovery)"
    ]
   }
  ]
 },
 "5": {
  "baslik": "Adli bilişim, risk, tedarik, uyum ve denetim",
  "dersler": [
   25,
   30
  ],
  "sorular": [
   {
    "id": "dceab7b6",
    "q": "Şüpheli bir sunucudan kanıt toplarken uçuculuk sırasına göre hangi dizi doğrudur?",
    "options": [
     "Uzak loglar, disk, geçici dosyalar, RAM",
     "Disk, RAM, geçici dosyalar, uzak loglar",
     "Geçici dosyalar, uzak loglar, disk, RAM",
     "RAM, geçici dosya, disk, uzak loglar"
    ]
   },
   {
    "id": "7bc38307",
    "q": "Varlık değeri 200.000 TL, tek olayda %25 kayıp ve yılda 0,4 kez beklenen bir risk için ALE kaçtır?",
    "options": [
     "50.000 TL",
     "100.000 TL",
     "20.000 TL",
     "80.000 TL"
    ]
   },
   {
    "id": "46397d27",
    "q": "İhtiyaç ve şartname tamamen net olduğunda, tedarikçilerden yalnızca fiyat teklifi isteyen belge hangisidir?",
    "options": [
     "EOI (tedarikçi ilgi beyanı)",
     "RFP (ayrıntılı teklif isteği)",
     "RFQ (fiyat teklif isteği)",
     "RFI (pazar bilgisi isteği formu)"
    ]
   },
   {
    "id": "bdc4e684",
    "q": "Bir şirket (veri sorumlusu) müşteri verisinin işlenmesini bulut sağlayıcıya (işleyen) devretti ve bir ihlal oldu. Sorumluluk durumu nedir?",
    "options": [
     "Sorumluluk devirle ortadan kalkmaz",
     "Sorumluluk ilgili veri öznesine ait olur",
     "Sorumluluk tamamen işleyene devredilmiş olur",
     "Sözleşme yoksa kimse sorumlu tutulamaz"
    ]
   }
  ]
 },
 "6": {
  "baslik": "Eğitim, yapay zekâ riskleri, Zero Trust ve değişiklik yönetimi",
  "dersler": [
   31,
   34
  ],
  "sorular": [
   {
    "id": "16fa4eed",
    "q": "Oltalama simülasyonunda bağlantıya tıklayan çalışana olay sonrasında verilen eğitim hangi türdür?",
    "options": [
     "Düzeltici eğitim",
     "Sürekli eğitim",
     "Hedefli eğitim",
     "Oryantasyon eğitimi"
    ]
   },
   {
    "id": "ed7696ba",
    "q": "Saldırgan, modeli yanıltacak biçimde hazırladığı girdilerle bir tespit sistemini atlatıyor; modelin kendisi değişmiyor. Bu saldırı hangisidir?",
    "options": [
     "Model hırsızlığı",
     "Veri zehirleme (poisoning)",
     "Kaçınma (evasion)",
     "Jailbreak"
    ]
   },
   {
    "id": "1064eb97",
    "q": "Zero Trust mimarisinde erişim isteğini veri düzleminde, kapıda uygulayan ve izin ya da engel kararını yürüten bileşen hangisidir?",
    "options": [
     "Politika uygulama noktası",
     "Bant dışı yönetim ağı kanalı",
     "Politika yöneticisi (oturum kurucu)",
     "Politika motoru (karar verici)"
    ]
   },
   {
    "id": "7e85e8f6",
    "q": "Geri dönüşü olmayan bir veri dönüşümü sorun çıkardı; ekip eski sürüme dönmek yerine yeni bir düzeltmeyle ilerlemeyi seçti. Bu yaklaşımın adı nedir?",
    "options": [
     "Geri alma (rollback) uygulaması",
     "Standart değişiklik (önceden onaylı)",
     "İleri düzeltme (fail forward)",
     "Bakım penceresi (önceden duyurulan)"
    ]
   }
  ]
 },
 "7": {
  "baslik": "IoT/ICS, mobil, kablosuz ağlar ve tehdit vektörleri",
  "dersler": [
   35,
   38
  ],
  "sorular": [
   {
    "id": "f0191db2",
    "q": "Bir su arıtma tesisinde pompa ve vanaları fiziksel süreci doğrudan süren programlanabilir denetleyici hangisidir?",
    "options": [
     "RADIUS sunucusu",
     "SCADA sunucusu",
     "HMI",
     "PLC"
    ]
   },
   {
    "id": "e38a05ca",
    "q": "Çalışan kişisel telefonuyla kurumsal e-postaya erişiyor ve ayrılınca yalnızca kurumsal verinin silinmesi isteniyor. Hangi yaklaşım uygundur?",
    "options": [
     "Jailbreak yapılmasına izin vermek",
     "Konteynerleştirme ile seçici silme",
     "Sideloading ile uygulama kurdurmak",
     "Cihazı fabrika ayarlarına döndürmek"
    ]
   },
   {
    "id": "658043cf",
    "q": "Kurum, her çalışanın ortak parola yerine kendi kimliğiyle Wi-Fi ağına girmesini istiyor. Hangi yapı uygundur?",
    "options": [
     "WEP ile ortak anahtar",
     "WPA-Enterprise (802.1X ve RADIUS)",
     "WPA3-Personal (SAE ile ortak parola)",
     "Captive portal ile şartları kabul etme"
    ]
   },
   {
    "id": "37f32737",
    "q": "Saldırgan hedef sistemde yeni zararlı dosya bırakmadan PowerShell ve WMI gibi var olan güvenilir araçları kullanıyor. Bu yaklaşımın adı nedir?",
    "options": [
     "Watering hole (hedef sitesini ele geçirme)",
     "Typosquatting (benzer alan adı)",
     "Living off the land",
     "Evil twin (sahte erişim noktası)"
    ]
   }
  ]
 },
 "8": {
  "baslik": "Aldatma, DKIM/DMARC, risk iştahı ve keşif",
  "dersler": [
   39,
   42
  ],
  "sorular": [
   {
    "id": "8a94ffec",
    "q": "Gerçek kullanıcısı olmayan 'yedek-yonetici' adlı sahte hesapla oturum açma denemesi anında alarm üretiyor. Bu mekanizma hangisidir?",
    "options": [
     "Honeynet (birden çok tuzak)",
     "DNS sinkhole (yönlendirme)",
     "Canary hesap (honeytoken)",
     "Sandbox (yalıtılmış ortam)"
    ]
   },
   {
    "id": "a95aebfb",
    "q": "Gönderen sunucunun iletiyi özel anahtarla imzalayıp alıcının DNS'teki açık anahtarla doğruladığı e-posta mekanizması hangisidir?",
    "options": [
     "DMARC",
     "DKIM",
     "BIMI",
     "SPF"
    ]
   },
   {
    "id": "29874f64",
    "q": "Kurumun hedeflerine ulaşmak için üstlenmeye razı olduğu genel risk miktarını ve türünü ifade eden üst yönetim kavramı hangisidir?",
    "options": [
     "Risk eşiği",
     "Risk toleransı",
     "Artık risk",
     "Risk iştahı"
    ]
   },
   {
    "id": "6e578d86",
    "q": "Sızma testi ekibi hedefe tek paket göndermeden alan adı kayıtlarını, iş ilanlarını ve sosyal medyayı inceleyerek bilgi topluyor. Bu aşama nedir?",
    "options": [
     "Yeniden test (retest)",
     "Pasif keşif (OSINT)",
     "Aktif keşif",
     "Sömürü aşaması"
    ]
   }
  ]
 }
};

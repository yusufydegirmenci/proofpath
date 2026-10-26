/* DevOps / Kubernetes yolu · sabit dersler 23-30 (monolitten mikroservise; API'ye giriş yolu: kimlik doğrulama, yetkilendirme, admission control; Service türleri; kube-proxy, ReplicaSet ve mikroservisler; kubectl ile Pod çalıştırınca ne olur; CRI, RuntimeClass, CRD ve Operator; RBAC ve Pod Security Standards; gözlemlenebilirlik yığını ve CNCF topluluğu). Faz 19b.
   Kapsam LFS158 bölüm sırası ve resmî CNCF KCNA müfredatına (cncf/curriculum, KCNA_Curriculum.pdf; alan ağırlıkları %44 / %28 / %16 / %12, 2026-10-26'da okundu) göre hazırlandı; metinler özgündür, kaynaklardan kopyalanmamıştır. Sınav soru sayısı ve geçme puanı: doğrulanmadı (sayfada yazmıyor).
   Kaynak adresleri: kubernetes.io, prometheus.io, opentelemetry.io, cncf.io, martinfowler.com, microservices.io; HTTP 200 (curl, 2026-10-26). Sayısal örnekler Node ile yeniden hesaplanarak doğrulandı.
   Numaralama: TMAP.dev dizini + 1 (mevcut 1-22 dersler korunur); ders eki: dev-ek-3.js, anahtarlar 22-29. */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).dev = (window.PP_LESSONS.dev || {}));

  /* 23 ───────────────────────────── Monolitten mikroservise */
  L[23] = {
    "hook": "Bir alışveriş sitesinde yalnız kampanya sayfası yoğun, ama tek paket olduğu için tüm siteyi büyütmek zorundasın. Bu derste uygulamayı parçalamanın neyi çözdüğünü, neyi ağırlaştırdığını ve Kubernetes'in neden bu mimarinin doğal evi olduğunu öğrenirsin.",
    "homework": "Kullandığın bir uygulamayı (yemek siparişi, sosyal ağ) beş iş yeteneğine böl. Her biri için ayrı ölçeklenmesi gerekir mi, yazılı olarak karar ver. Sonra tek bir yetenek seç ve onun kendi verisini ve diğer servislerle konuşma biçimini çiz.",
    "warmup": {
      "recap": [
        {
          "point": "Konteyner, bir uygulamayı bağımlılıklarıyla birlikte tek imajda paketler."
        },
        {
          "point": "Aynı imajdan çok sayıda kopya çalıştırılabilir."
        }
      ],
      "concepts": [
        {
          "term": "Monolit",
          "tr": "Tek parça uygulama",
          "summary": "Tüm işlevlerin tek pakette derlenip birlikte dağıtıldığı uygulamadır; çağrılar süreç içinde olduğu için hızlıdır.",
          "example": "Katalog, sepet ve ödemenin tek WAR dosyasında olması"
        },
        {
          "term": "Mikroservis",
          "tr": "Küçük bağımsız servis",
          "summary": "Tek bir iş yeteneğine odaklanan, kendi verisine sahip ve bağımsız dağıtılan servistir; ağ üzerinden API ile konuşur.",
          "example": "Yalnız sepeti yöneten ve kendi veritabanı olan bir servis"
        },
        {
          "term": "Boğucu incir",
          "tr": "Kademeli taşıma",
          "summary": "Monoliti bir kerede yazmak yerine işlevleri tek tek yeni servislere taşıyıp eskisini küçültme yaklaşımıdır.",
          "example": "Önce yalnız arama özelliğini yeni servise çıkarmak"
        }
      ]
    },
    "blocks": [
      {
        "t": "h",
        "text": "Neden öğreniyoruz?"
      },
      {
        "t": "box",
        "h": "Gerçek talep",
        "text": "Kampanya gününde yalnız sepet sayfası yüklenir. Monolitte bunu karşılamak için tüm uygulamanın kopyalarını çoğaltırsın ve her kopya katalog, ödeme ve kullanıcı kodunu da taşır. Mikroservis olsaydı yalnız sepet servisini büyütürdün."
      },
      {
        "t": "h",
        "text": "Monolit ile mikroservis"
      },
      {
        "t": "p",
        "text": "Monolit başlamak için kolaydır: tek paket, tek dağıtım, tek veritabanı. Büyüdükçe iki sorun çıkar: herkes aynı kod tabanında birbirine takılır ve tek bir hata tüm uygulamayı düşürebilir. Mikroservis bu sorunları servis sınırlarıyla çözer, ama yeni sorunlar getirir."
      },
      {
        "t": "steps",
        "h": "Monolit ile mikroservis",
        "items": [
          "Monolit: tek dağıtım birimi, süreç içi hızlı çağrı, kolay yerel hata ayıklama; ama ölçekleme ve sürüm çıkarma topluca olur.",
          "Mikroservis: servis başına bağımsız dağıtım ve ölçekleme, farklı teknoloji seçimi, hata sınırlama; ama ağ gecikmesi, dağıtık veri ve karmaşık işletim.",
          "Servis başına veri: her servis kendi verisinin sahibidir. Ortak veritabanı bağımsız dağıtımı bozar.",
          "Servisler arası iletişim senkron (HTTP, gRPC) ya da asenkron (mesaj kuyruğu) olur; senkron zincir uzadıkça toplam erişilebilirlik düşer."
        ]
      },
      {
        "t": "h",
        "text": "Konteyner ve orkestrasyon ilişkisi"
      },
      {
        "t": "steps",
        "h": "Konteyner ve orkestrasyon ilişkisi",
        "items": [
          "Her servis kendi imajına paketlenir; böylece bağımlılıklar çakışmaz ve aynı imaj her ortamda çalışır.",
          "Yüzlerce kopya elle yönetilemez: yerleştirme, yeniden başlatma, ölçekleme ve servis keşfi için orkestratör (Kubernetes) gerekir.",
          "Monoliti taşımanın güvenli yolu boğucu incir yaklaşımıdır: her adımda bir işlev yeni servise geçer, eskisi küçülür.",
          "Karar ölçütleri: ekip sayısı ve bağımsızlığı, dağıtım sıklığı, parçaların ölçek farkı. Hiçbiri yoksa modüler monolit yeterli olabilir."
        ]
      },
      {
        "t": "box",
        "h": "Dikkat",
        "text": "Zincirleme bağımlılık erişilebilirliği çarpar: üç servis %99,9 ise birlikte yaklaşık %99,70 olur. Mikroservis tek başına güvenilirlik getirmez; zaman aşımı, yeniden deneme ve devre kesici ister."
      }
    ],
    "objectives": [
      {
        "id": "h1",
        "text": "Monolit ile mikroservisin tanımını ve ana farklarını söyleyebilirsin."
      },
      {
        "id": "h2",
        "text": "Mikroservisin kazanç ve maliyetlerini sayabilirsin."
      },
      {
        "id": "h3",
        "text": "Servis başına veri ve boğucu incir yaklaşımını açıklayabilirsin."
      },
      {
        "id": "h4",
        "text": "Zincirleme servislerin toplam erişilebilirliğini hesaplayabilirsin."
      }
    ],
    "summary": [
      "Monolit tek paket, mikroservis bağımsız küçük servislerdir.",
      "Mikroservis bağımsız ölçekleme verir ama ağ ve dağıtık veri maliyeti getirir.",
      "Her servis kendi verisinin sahibi olmalıdır.",
      "Monoliti parçalamak için boğucu incir gibi kademeli yol seçilir."
    ],
    "prereq": [],
    "minutes": 25,
    "sonDogrulama": "2026-10-26",
    "surum": "2026-10-v1",
    "quiz": [
      {
        id: "b150b923",
        "q": "Bir uygulamanın tüm işlevleri tek pakette derlenip tek birim olarak dağıtılıyorsa bu mimari hangisidir?",
        "options": [
          "Mikroservis",
          "Olay güdümlü mimari",
          "Hizmet ağı (service mesh)",
          "Monolit"
        ],
        "obj": "h1"
      },
      {
        id: "b93bf308",
        "q": "Aşağıdakilerden hangisi mikroservislerin tipik bir özelliğidir?",
        "options": [
          "Her servis tek bir iş yeteneğine odaklanır ve bağımsız dağıtılabilir",
          "Tüm servisler tek veritabanı şemasını paylaşır",
          "Servisler aynı süreçte çalışır ve doğrudan fonksiyon çağırır",
          "Tüm servisler birlikte sürüm çıkarmak zorundadır"
        ],
        "obj": "h1"
      },
      {
        id: "22f2f053",
        "q": "Mikroservis mimarisi her proje için monolitten daha iyi bir seçimdir.",
        "options": [
          "Doğru; mikroservis her durumda monolitten üstündür",
          "Yanlış"
        ],
        "obj": "h1"
      },
      {
        id: "fa9d69f4",
        "q": "Mikroservislerin getirdiği maliyetlerden hangisi doğrudur?",
        "options": [
          "Tüm kodun tek depoda tutulma zorunluluğu ve tek bir dil kullanma gereği",
          "Konteyner kullanmanın yasak olması ve tüm servislerin tek süreçte çalışması",
          "Bağımsız ölçeklemenin imkânsız hale gelmesi ve ağ çağrılarının tamamen ortadan kalkması",
          "Servisler arası ağ gecikmesi, dağıtık veri tutarlılığı ve daha fazla işletim yükü"
        ],
        "obj": "h2"
      },
      {
        id: "237d16c5",
        "q": "Kampanya gününde yalnız sepet işlevi yoğun yük alıyor. Mikroservis mimarisi burada hangi avantajı sağlar?",
        "options": [
          "Tüm servisler yük altında otomatik olarak aynı hızda çalışır ve ölçeklenir",
          "Ağ gecikmesi sıfıra iner",
          "Yalnız sepet servisinin kopya sayısı artırılabilir",
          "Servisler arası veritabanı tutarlılığı kendiliğinden ve ek çaba gerektirmeden sağlanır"
        ],
        "obj": "h2"
      },
      {
        id: "a48310f9",
        "q": "Mikroservis mimarisinin yönetilmesi gereken sorunları hangileridir?",
        "options": [
          "Ağ gecikmesi ve kopması",
          "Dağıtık veri tutarlılığı",
          "Gözlem ve işletim yükü",
          "Yukarıdakilerin hepsi"
        ],
        "obj": "h2"
      },
      {
        id: "20cf644e",
        "q": "'Servis başına veri' ilkesi ne söyler?",
        "options": [
          "Her servis kendi verisinin sahibidir; başkası ona yalnız servisin API'siyle ulaşır",
          "Tüm servisler aynı tabloya doğrudan yazar ve şemayı her sürümde ortak bir değişiklik kuruluyla birlikte değiştirir",
          "Veri yalnız önbellekte tutulur ve hiçbir kalıcı veritabanı kullanılmaz",
          "Veritabanı her zaman en çok trafik alan en büyük servise aittir; diğer servisler doğrudan sorgular"
        ],
        "obj": "h3"
      },
      {
        id: "6b0fda3f",
        "q": "Büyük bir monoliti güvenli biçimde mikroservislere taşımak için hangi yaklaşım önerilir?",
        "options": [
          "Tüm sistemi sıfırdan yeniden yazıp, paralel çalıştırma yapmadan eski sistemi kapatıp tek gecede canlıya almak",
          "Monoliti olduğu gibi bırakıp hiçbir işlevi taşımamak",
          "Önce tüm veritabanını silip servisleri boş şemadan yeniden doldurarak veriyi sıfırdan üretmek",
          "Boğucu incir: işlevleri tek tek yeni servise taşıyıp monoliti küçültmek"
        ],
        "obj": "h3"
      },
      {
        id: "7c5ba3ac",
        "q": "Boğucu incir yaklaşımında eski monolit ve yeni servisler bir süre birlikte çalışır.",
        "options": [
          "Doğru",
          "Yanlış"
        ],
        "obj": "h3"
      },
      {
        id: "0dabdd19",
        "q": "İki farklı servis aynı veritabanı tablosuna doğrudan yazıyor. Bu durumun temel riski nedir?",
        "options": [
          "Servisler daha hızlı çalışır ve bağımsız dağıtım kolaylaşır",
          "Konteyner imajı boyutu büyür ve dağıtım uzar",
          "Servisler gizlice birbirine bağlanır, şema değişikliği ikisini birden bozabilir",
          "Ağ gecikmesi artar çünkü her yazma iki servise gider"
        ],
        "obj": "h3"
      },
      {
        id: "2a672d88",
        "q": "Üç servis zincirleme çağrılıyor ve her biri %99,9 ayakta. Birlikte yaklaşık erişilebilirlik nedir?",
        "options": [
          "Yaklaşık %99,70",
          "%99,90",
          "%99,99",
          "%97,00"
        ],
        "obj": "h4"
      },
      {
        id: "be6f35ba",
        "q": "Dört servis zincirleme çağrılıyor ve her biri %99,9 ayakta. Birlikte yaklaşık erişilebilirlik nedir?",
        "options": [
          "Yaklaşık %99,60",
          "%99,90",
          "%99,70",
          "%100"
        ],
        "obj": "h4"
      },
      {
        id: "1cd6af8d",
        "q": "Zincirleme servislerde toplam erişilebilirliği korumak için aşağıdakilerden hangisi doğrudur?",
        "options": [
          "Zaman aşımı koymadan çağrının dönmesini sonsuza kadar beklemek",
          "Her hatada çağrıyı hiç beklemeden sınırsız hızla tekrarlamak",
          "Çağrılara zaman aşımı koymak ve gerekirse devre kesici ile yeniden denemeyi sınırlamak",
          "Tüm servisleri tek bir sunucuya taşıyıp ağ çağrılarını kaldırmak"
        ],
        "obj": "h4"
      },
      {
        id: "2dfa0e03",
        "q": "Monolitin tipik bir avantajı aşağıdakilerden hangisidir?",
        "options": [
          "Her işlev bağımsız ölçeklenir",
          "Her parça farklı teknolojiyle yazılabilir",
          "Bileşenler arası çağrılar süreç içinde olduğu için basit ve hızlıdır",
          "Bir parçanın hatası diğerlerini hiçbir zaman etkilemez"
        ],
        "obj": "h2"
      },
      {
        id: "55d3fc08",
        "q": "Kubernetes gibi bir orkestratöre neden ihtiyaç duyulur?",
        "options": [
          "Konteynerler orkestratör olmadan hiçbir koşulda çalışmaz",
          "Orkestratör uygulama kodunu geliştiricinin yerine yazar ve derler",
          "Çok sayıda konteynerin yerleştirilmesi, yeniden başlatılması ve ölçeklenmesi elle yönetilemeyecek kadar büyür",
          "Monolit uygulamalar yalnız bir orkestratörle çalıştırılabilir"
        ],
        "obj": "h1"
      },
      {
        "id": "36694fb7",
        "q": "Twelve-Factor App ilkelerine göre uygulama yapılandırması (veritabanı adresi, parola gibi) nerede tutulmalıdır?",
        "options": [
          "Kaynak koda gömülü sabitlerde",
          "İmaj içine yazılmış bir dosyada",
          "Yalnızca geliştiricinin kendi dizüstü bilgisayarında",
          "Ortamda, koddan ayrı (ör. ortam değişkenleri)"
        ]
      }
    ],
    "interview": [
      {
        "q": "Ne zaman mikroservise geçersin?",
        "a": "Birden çok ekip aynı kod tabanında birbirini engellediğinde, parçaların ölçek ihtiyacı çok farklı olduğunda ya da bağımsız dağıtım gerektiğinde. Küçük ekipte önce modüler monolitle başlarım."
      },
      {
        "q": "Mikroservislerin en büyük bedeli nedir?",
        "a": "Dağıtık sistem karmaşıklığı: ağ gecikmesi ve kopması, veri tutarlılığı, gözlem ve işletim yükü. Bunları zaman aşımı, yeniden deneme ve izleme ile yönetirim."
      }
    ],
    "vocab": [
      {
        "term": "monolith",
        "tr": "monolit",
        "ex": "The monolith ships as a single deployable unit."
      },
      {
        "term": "microservice",
        "tr": "mikroservis",
        "ex": "Each microservice owns its own data."
      },
      {
        "term": "decoupling",
        "tr": "gevşek bağlama",
        "ex": "Decoupling lets teams deploy independently."
      }
    ],
    "sources": [
      {
        "title": "Martin Fowler: Microservices",
        "url": "https://martinfowler.com/articles/microservices.html"
      },
      {
        "title": "microservices.io: Microservice Architecture",
        "url": "https://microservices.io/patterns/microservices.html"
      }
    ]
  };

  /* 24 ───────────────────────────── API'ye giriş yolu: kimlik doğrulama, yetkilendirme ve admission control */
  L[24] = {
    "hook": "Bir geliştirici Pod oluşturmaya çalışıyor ve '403 Forbidden' görüyor. Sorun kimliğinde mi, yetkisinde mi, yoksa bir kuralda mı? Bu derste API sunucusunun üç kapısını ve sırasını öğrenirsin.",
    "homework": "Kendi bildiğin bir sistemi (okul kapısı, kütüphane) düşün ve üç kapılı bir giriş akışı çiz: kimlik, yetki, kural. Her kapıda reddedilmenin bir örneğini yaz, sonra aynı örnekleri Kubernetes'te kimlik doğrulama, yetkilendirme ve admission control ile eşleştir.",
    "warmup": {
      "recap": [
        {
          "point": "Kullanıcılar ve bileşenler kümeyle API sunucusu üzerinden konuşur."
        },
        {
          "point": "Nesneler kalıcı olarak etcd'de saklanır."
        }
      ],
      "concepts": [
        {
          "term": "Kimlik doğrulama",
          "tr": "Kimsin?",
          "summary": "İsteği gönderenin kim olduğunu belirler; sertifika ya da belirteç gibi yöntemler kullanılır, tutmazsa 401 döner.",
          "example": "Geçersiz belirteçle gelen kubectl isteği"
        },
        {
          "term": "Yetkilendirme",
          "tr": "Yapabilir misin?",
          "summary": "Kimliği belli isteğin istenen işi yapmaya hakkı olup olmadığına bakar; kipler Node, ABAC, RBAC ve Webhook'tur.",
          "example": "Kullanıcının pod oluşturma izni olmaması"
        },
        {
          "term": "Admission control",
          "tr": "Kurallara uyuyor mu?",
          "summary": "Yetkilendirmeyi geçen yazma isteklerini nesne kaydedilmeden önce değiştirir (mutating) ya da doğrular (validating).",
          "example": "Namespace kotası dolu olduğu için Pod isteğinin reddedilmesi"
        }
      ]
    },
    "blocks": [
      {
        "t": "h",
        "text": "Neden öğreniyoruz?"
      },
      {
        "t": "box",
        "h": "Gerçek talep",
        "text": "Bir ekip yeni bir ad alanında Deployment açıyor. Deployment kabul ediliyor ama 5 kopyanın yalnız 2'si oluşuyor. İstek kimlik ve yetki kapısını geçmiş, kota admission aşamasında takılmış. Aşamaları bilmeden bu hatayı bulmak saatler sürer."
      },
      {
        "t": "h",
        "text": "Üç kapı ve sıra"
      },
      {
        "t": "p",
        "text": "API sunucusuna gelen her istek üç aşamadan geçer ve sıra değişmez: önce kimlik doğrulama, sonra yetkilendirme, en son admission control. Üçünü de geçen nesne etcd'ye yazılır."
      },
      {
        "t": "steps",
        "h": "Üç kapı ve sıra",
        "items": [
          "Kimlik doğrulama: istemci sertifikası, taşıyıcı belirteç (ServiceAccount, OIDC) gibi yöntemler denenir. Biri tutarsa kimlik belli olur; hiçbiri tutmazsa 401 döner.",
          "Anonim istek: kimlik bilgisi taşımayan istek varsayılan olarak kabul edilir ve system:anonymous olarak işlenir; yetkilendirme (RBAC) ona izin vermedikçe reddedilir.",
          "Yetkilendirme: geçerli kipler Node, ABAC, RBAC ve Webhook'tur. 'Pod' bir yetkilendirici değildir. Hiçbir kip izin vermezse 403 döner.",
          "Admission control: yalnız oluşturma, değiştirme, silme ve proxy bağlantı isteklerini görür; okumaları (get, list, watch) engellemez."
        ]
      },
      {
        "t": "h",
        "text": "Admission control içinde ne var?"
      },
      {
        "t": "steps",
        "h": "Admission control içinde ne var?",
        "items": [
          "Önce mutating denetleyiciler nesneyi değiştirebilir (varsayılan değer ekler), sonra validating denetleyiciler nesneyi doğrular ya da reddeder.",
          "ResourceQuota ad alanındaki toplam kaynağı ya da nesne sayısını sınırlar ve admission aşamasında uygulanır.",
          "LimitRanger varsayılan ve en büyük kaynak değerlerini uygular; PodSecurity Pod güvenlik ayarlarını denetler.",
          "Webhook tabanlı admission, kümeye kendi kurallarını eklemeni sağlar. Reddedilen istek nesnenin etcd'ye yazılmasını engeller."
        ]
      },
      {
        "t": "box",
        "h": "Dikkat",
        "text": "Kota dolu olduğunda Deployment nesnesi kabul edilir; reddedilen, ReplicaSet'in sonradan oluşturmaya çalıştığı Pod'lardır. Deployment durumunda eksik kopya ve ReplicaSet olaylarında 'exceeded quota' mesajı görürsün."
      }
    ],
    "objectives": [
      {
        "id": "h1",
        "text": "İsteğin üç aşamadan geçme sırasını söyleyebilirsin."
      },
      {
        "id": "h2",
        "text": "Geçerli yetkilendirme kiplerini sayabilir, geçersiz olanı ayırt edebilirsin."
      },
      {
        "id": "h3",
        "text": "Anonim isteğin varsayılan davranışını ve 401/403 farkını açıklayabilirsin."
      },
      {
        "id": "h4",
        "text": "ResourceQuota ve diğer admission örneklerini doğru aşamaya yerleştirebilirsin."
      }
    ],
    "summary": [
      "Sıra: kimlik doğrulama, yetkilendirme, admission control; sonra etcd.",
      "Yetkilendirme kipleri: Node, ABAC, RBAC, Webhook.",
      "Anonim istek varsayılan olarak kabul edilir ama yetki verilmedikçe reddedilir.",
      "ResourceQuota admission control aşamasında uygulanır."
    ],
    "prereq": [],
    "minutes": 25,
    "sonDogrulama": "2026-10-26",
    "surum": "2026-10-v1",
    "quiz": [
      {
        id: "3abb509d",
        "q": "Bir istek API sunucusuna geldiğinde aşamaların doğru sırası hangisidir?",
        "options": [
          "Yetkilendirme, kimlik doğrulama, admission control",
          "Admission control, yetkilendirme, kimlik doğrulama",
          "Kimlik doğrulama, admission control, yetkilendirme",
          "Kimlik doğrulama, yetkilendirme, admission control"
        ],
        "obj": "h1"
      },
      {
        id: "b600f167",
        "q": "Bir nesne etcd'ye yazılmadan önce hangi aşama son söz sahibidir?",
        "options": [
          "Kimlik doğrulama ve istemci sertifikası denetimi",
          "Admission control",
          "Yetkilendirme (RBAC) denetimi",
          "Scheduler"
        ],
        "obj": "h1"
      },
      {
        id: "2851382e",
        "q": "Admission control aşaması get ve list gibi okuma isteklerini de engelleyebilir.",
        "options": [
          "Doğru; okuma istekleri de admission denetiminden geçer",
          "Yanlış"
        ],
        "obj": "h1"
      },
      {
        id: "48a09f6e",
        "q": "Aşağıdakilerden hangisi geçerli bir yetkilendirme kipi DEĞİLDİR?",
        "options": [
          "Pod",
          "Node",
          "ABAC",
          "RBAC"
        ],
        "obj": "h2"
      },
      {
        id: "d54f2a7c",
        "q": "Yetkilendirici, kararı kümenin dışındaki bir HTTP servisine soran kip hangisidir?",
        "options": [
          "Webhook",
          "Node",
          "RBAC",
          "AlwaysDeny"
        ],
        "obj": "h2"
      },
      {
        id: "dfbadde5",
        "q": "Hangileri Kubernetes'te geçerli yetkilendirme kipleridir?",
        "options": [
          "Node",
          "RBAC",
          "Webhook",
          "Yukarıdakilerin hepsi"
        ],
        "obj": "h2"
      },
      {
        id: "b538f54c",
        "q": "Kubernetes API sunucusu varsayılan olarak anonim istekleri kabul eder.",
        "options": [
          "Doğru",
          "Yanlış"
        ],
        "obj": "h3"
      },
      {
        id: "9b294857",
        "q": "Geçersiz bir belirteçle gelen istek hangi HTTP durum koduyla reddedilir?",
        "options": [
          "403 Forbidden",
          "401 Unauthorized",
          "404 Not Found",
          "500 Internal Server Error"
        ],
        "obj": "h3"
      },
      {
        id: "801023a4",
        "q": "Kullanıcı kimliği geçerli ama RBAC'ta pod oluşturma izni yok. Beklenen sonuç nedir?",
        "options": [
          "401 Unauthorized",
          "403 Forbidden",
          "Pod oluşur ama çalışmaz",
          "İstek admission'da kabul edilir"
        ],
        "obj": "h3"
      },
      {
        id: "ca9b753d",
        "q": "ResourceQuota hangi aşamada uygulanır?",
        "options": [
          "Kimlik doğrulama",
          "Admission control",
          "Yetkilendirme",
          "Kubelet'in imaj çekmesi sırasında"
        ],
        "obj": "h4"
      },
      {
        id: "30385326",
        "q": "Admission control sırasında mutating ve validating denetleyiciler hangi sırayla çalışır?",
        "options": [
          "Önce validating, sonra mutating çalışır",
          "İkisi aynı anda ve sırasız çalışır",
          "Yalnız validating denetleyiciler çalışır, mutating yoktur",
          "Önce mutating (nesneyi değiştirebilir), sonra validating (doğrular)"
        ],
        "obj": "h4"
      },
      {
        id: "dffec85f",
        "q": "Bir ad alanında kota 'pods=10'. Zaten 8 Pod çalışıyor ve replicas: 5 olan yeni bir Deployment oluşturuluyor. Sonuç ne olur?",
        "options": [
          "Deployment nesnesi kota nedeniyle hiç oluşmaz ve hiçbir Pod açılmaz",
          "Kota denetlenmez; 5 Pod'un tamamı oluşur ve toplam 13 Pod çalışır",
          "Kota yalnız yeni oluşturulan ad alanlarına uygulanır, mevcut ad alanlarına değil",
          "Deployment kabul edilir, ReplicaSet 2 Pod oluşturabilir, kalan 3 Pod kota nedeniyle reddedilir"
        ],
        "obj": "h4"
      },
      {
        id: "53ac7c6e",
        "q": "Aşağıdakilerden hangisi bir admission denetleyicisi örneğidir?",
        "options": [
          "LimitRanger",
          "kube-proxy",
          "etcdctl",
          "kubeadm init"
        ],
        "obj": "h4"
      },
      {
        id: "9b194f62",
        "q": "Yetkilendirme aşaması kimlik doğrulamadan sonra, admission control'den önce çalışır.",
        "options": [
          "Doğru",
          "Yanlış"
        ],
        "obj": "h2"
      }
    ],
    "interview": [
      {
        "q": "API sunucusuna gelen bir istek hangi aşamalardan geçer?",
        "a": "Önce kimlik doğrulama, sonra yetkilendirme, sonra admission control (önce mutating, sonra validating). Hepsini geçerse nesne etcd'ye yazılır."
      },
      {
        "q": "Pod oluşturamıyorum ve hata alıyorum; nereden başlarsın?",
        "a": "Hata koduna bakarım: 401 kimlik, 403 yetki ya da admission. kubectl auth can-i ile yetkiyi, ardından olay ve mesajlarla admission kurallarını (kota, güvenlik) denetlerim."
      }
    ],
    "vocab": [
      {
        "term": "authentication",
        "tr": "kimlik doğrulama",
        "ex": "Authentication proves who the caller is."
      },
      {
        "term": "authorization",
        "tr": "yetkilendirme",
        "ex": "Authorization decides what the caller may do."
      },
      {
        "term": "admission controller",
        "tr": "admission denetleyicisi",
        "ex": "An admission controller can reject a request before it is stored."
      }
    ],
    "sources": [
      {
        "title": "Kubernetes: Controlling Access to the Kubernetes API",
        "url": "https://kubernetes.io/docs/concepts/security/controlling-access/"
      },
      {
        "title": "Kubernetes: Admission Controllers Reference",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/"
      }
    ]
  };

  /* 25 ───────────────────────────── Service türleri karşılaştırma: ClusterIP, NodePort, LoadBalancer, ExternalName */
  L[25] = {
    "hook": "Aynı uygulamaya bir ekip yalnız küme içinden, diğeri internetten erişmek istiyor. Hangisine ClusterIP, hangisine LoadBalancer verirsin? Bu derste dört Service türünü yan yana koyup birbirinin üzerine nasıl kurulduğunu görürsün.",
    "homework": "Bir uygulama için üç erişim ihtiyacı yaz (iç servis, test, herkese açık site). Her biri için Service türünü seç, nedenini yaz ve bir yanlış seçimin yaratacağı sorunu bir cümleyle belirt.",
    "warmup": {
      "recap": [
        {
          "point": "Pod'lar geçicidir ve IP adresleri değişir."
        },
        {
          "point": "Service, etiket seçicisiyle Pod'ları bulur."
        }
      ],
      "concepts": [
        {
          "term": "ClusterIP",
          "tr": "Küme içi sanal IP",
          "summary": "Varsayılan Service türüdür; yalnız küme içinden erişilir.",
          "example": "Backend'in veritabanı Service'i"
        },
        {
          "term": "NodePort",
          "tr": "Düğüm portu",
          "summary": "Her düğümde aynı sabit portu açar; varsayılan aralık 30000-32767'dir ve ClusterIP'yi de içerir.",
          "example": "Yerel kümede http://düğümIP:31080"
        },
        {
          "term": "LoadBalancer",
          "tr": "Bulut yük dengeleyici",
          "summary": "Bulut sağlayıcıdan dış yük dengeleyici ister; NodePort ve ClusterIP üzerine kurulur.",
          "example": "Bulutta herkese açık web arayüzü"
        }
      ]
    },
    "blocks": [
      {
        "t": "h",
        "text": "Neden öğreniyoruz?"
      },
      {
        "t": "box",
        "h": "Gerçek talep",
        "text": "Bir ekip veritabanı Service'ini yanlışlıkla LoadBalancer yaptı ve veritabanı internete açıldı. Tür seçimi yalnız kolaylık değil, güvenlik kararıdır: yalnız içeriden erişilecek şeye ClusterIP verilir."
      },
      {
        "t": "h",
        "text": "Dört tür yan yana"
      },
      {
        "t": "p",
        "text": "Service, Pod'ların önüne sabit ad ve adres koyar. Türler birbirinin üstüne kurulur: LoadBalancer bir NodePort, NodePort da bir ClusterIP içerir."
      },
      {
        "t": "steps",
        "h": "Dört tür yan yana",
        "items": [
          "ClusterIP (varsayılan): yalnız küme içinden erişilen sanal IP. İç servisler için uygundur.",
          "NodePort: her düğümde aynı sabit port (varsayılan 30000-32767). Düğümde o Pod olmasa bile port açıktır; trafik uygun Pod'a yönlendirilir.",
          "LoadBalancer: bulut sağlayıcının dış yük dengeleyicisini ister. Yerel kümede dış IP için ek araç gerekir (örneğin minikube tunnel).",
          "ExternalName: seçici, ClusterIP ve proxy yoktur; Service adı bir DNS CNAME kaydıyla dış alan adına çevrilir."
        ]
      },
      {
        "t": "h",
        "text": "Doğru türü seçmek"
      },
      {
        "t": "steps",
        "h": "Doğru türü seçmek",
        "items": [
          "Yalnız küme içi erişim: ClusterIP. Veritabanı ve iç API'ler için güvenli varsayılan.",
          "Hızlı test ya da yerel erişim: NodePort. Üretimde tek başına tercih edilmez.",
          "Buluta açık tek servis: LoadBalancer. Her servis için ayrı yük dengeleyici maliyetlidir; çok servis için Ingress düşünülür.",
          "Dış bir hizmete küme içi ad vermek: ExternalName. Port dönüşümü ya da proxy yapmaz."
        ]
      },
      {
        "t": "box",
        "h": "Dikkat",
        "text": "NodePort aralığında 30000'den 32767'ye kadar 2768 port vardır. Port kümeyi paylaşan tüm servisler arasında benzersiz olmalıdır; aralık biterse yeni NodePort Service açılamaz."
      }
    ],
    "objectives": [
      {
        "id": "h1",
        "text": "Dört Service türünün işlevini söyleyebilirsin."
      },
      {
        "id": "h2",
        "text": "Türlerin birbiri üzerine kurulduğunu (LoadBalancer ⊃ NodePort ⊃ ClusterIP) açıklayabilirsin."
      },
      {
        "id": "h3",
        "text": "Bir senaryo için doğru türü seçebilirsin."
      },
      {
        "id": "h4",
        "text": "NodePort aralığı ve port alanlarıyla ilgili hesapları yapabilirsin."
      }
    ],
    "summary": [
      "ClusterIP varsayılandır ve yalnız küme içidir.",
      "NodePort her düğümde sabit port açar; LoadBalancer bulutta dış yük dengeleyici ister.",
      "ExternalName yalnız DNS CNAME döner, proxy yapmaz.",
      "Türü erişim kapsamı ve güvenlik ihtiyacına göre seç."
    ],
    "prereq": [],
    "minutes": 25,
    "sonDogrulama": "2026-10-26",
    "surum": "2026-10-v1",
    "quiz": [
      {
        id: "db7e09aa",
        "q": "Service türü belirtilmediğinde hangi tür kullanılır?",
        "options": [
          "ClusterIP",
          "NodePort",
          "LoadBalancer",
          "ExternalName"
        ],
        "obj": "h1"
      },
      {
        id: "0b2692f9",
        "q": "NodePort Service için varsayılan port aralığı nedir?",
        "options": [
          "30000-32767",
          "1-1023",
          "8080-8090",
          "49152-65535"
        ],
        "obj": "h1"
      },
      {
        id: "0751a442",
        "q": "Hangi Service türü seçici (selector) kullanmaz ve DNS CNAME döner?",
        "options": [
          "ExternalName",
          "ClusterIP",
          "NodePort",
          "LoadBalancer"
        ],
        "obj": "h1"
      },
      {
        id: "7a476536",
        "q": "Aşağıdaki ifadelerden hangileri doğrudur?",
        "options": [
          "LoadBalancer türü NodePort'u içerir",
          "NodePort türü ClusterIP'yi içerir",
          "ClusterIP varsayılan türdür",
          "Yukarıdakilerin hepsi"
        ],
        "obj": "h2"
      },
      {
        id: "8e6427a0",
        "q": "NodePort Service oluşturulunca aynı port kümedeki tüm düğümlerde açılır.",
        "options": [
          "Doğru",
          "Yanlış"
        ],
        "obj": "h2"
      },
      {
        id: "aeba152e",
        "q": "ExternalName türü trafiği kendi üzerinden proxy'ler.",
        "options": [
          "Doğru; ExternalName trafiği kendi üzerinden proxy'ler",
          "Yanlış"
        ],
        "obj": "h2"
      },
      {
        id: "d195b49c",
        "q": "Yalnız küme içindeki uygulamalardan erişilecek bir veritabanı Service'i için en uygun tür hangisidir?",
        "options": [
          "LoadBalancer",
          "ClusterIP",
          "NodePort",
          "ExternalName"
        ],
        "obj": "h3"
      },
      {
        id: "074be1ff",
        "q": "Bulutta çalışan bir kümede tek bir web servisini internete doğrudan açmak için hangi tür kullanılır?",
        "options": [
          "ClusterIP",
          "ExternalName",
          "Headless (clusterIP: None)",
          "LoadBalancer"
        ],
        "obj": "h3"
      },
      {
        id: "6aac7168",
        "q": "Bir ekip dış bir yönetilen veritabanına küme içinden 'veri-tabani' adıyla erişmek istiyor. En uygun yaklaşım hangisidir?",
        "options": [
          "Veritabanını NodePort yapıp düğüm IP'sine yönlendirmek",
          "Pod'a dış IP adresini elle yazmak",
          "ClusterIP oluşturup rastgele bir selector yazmak",
          "ExternalName Service ile dış alan adına CNAME vermek"
        ],
        "obj": "h3"
      },
      {
        id: "89c3e72a",
        "q": "Service YAML'ında port: 80, targetPort: 8080 yazıyor. Bu ne anlama gelir?",
        "options": [
          "Service 80 portundan alır ve trafiği Pod'daki 8080 portuna iletir",
          "Service 8080'den alır, Pod 80'den dinler (alanlar ters)",
          "İki port aynı şeydir; biri yalnız yorumdur",
          "Düğümde 80 numaralı bir NodePort açılır"
        ],
        "obj": "h3"
      },
      {
        id: "90d36731",
        "q": "NodePort varsayılan aralığında (30000-32767 dahil) kaç port vardır?",
        "options": [
          "2768",
          "2767",
          "32767",
          "1000"
        ],
        "obj": "h4"
      },
      {
        id: "bff6d314",
        "q": "3 düğümlü kümede bir NodePort Service 31080 portuyla oluşturuldu ve yalnız 1. düğümde Pod var. 3. düğümün IP'sinde 31080'e istek atılırsa ne olur?",
        "options": [
          "Bağlantı reddedilir çünkü Pod o düğümde çalışmıyor",
          "Port açıktır; istek Pod'un çalıştığı düğüme yönlendirilir",
          "İstek, uygulama tarafından 404 ile yanıtlanır",
          "Port yalnız Pod'un çalıştığı 1. düğümde açılmıştır"
        ],
        "obj": "h4"
      },
      {
        id: "c053ee63",
        "q": "Bir Service oluşturdun ama istek yanıtsız. kubectl get endpointslices çıktısı boş. En olası neden nedir?",
        "options": [
          "Service türünün ClusterIP olması",
          "etcd'nin çalışmıyor olması",
          "Kubelet'in imajı çekememesi",
          "Service seçicisi hiçbir Pod'un etiketiyle eşleşmiyor"
        ],
        "obj": "h4"
      },
      {
        id: "99e3ee63",
        "q": "Aşağıdaki Service türlerinden hangisi en çok altyapı kaynağını (bulut yük dengeleyici dahil) kullanır?",
        "options": [
          "ClusterIP",
          "ExternalName",
          "LoadBalancer",
          "Headless"
        ],
        "obj": "h4"
      },
      {
        id: "1d6a69f8",
        "q": "clusterIP: None ile oluşturulan Service'e ne ad verilir ve ne yapar?",
        "options": [
          "ExternalName; dış alan adına yönlendirir",
          "LoadBalancer; bulutta dış IP açar",
          "Headless Service; DNS sorgusunda doğrudan Pod IP'lerini döndürür",
          "NodePort; her düğümde sabit port açar"
        ],
        "obj": "h1"
      },
      {
        "id": "ab8cb4a8",
        "q": "Pod ağını kurup Pod'lara IP adresi atayan eklentilerin (ör. Calico, Cilium) uyduğu Kubernetes arayüz standardı hangisidir?",
        "options": [
          "OCI (Open Container Initiative)",
          "CSI (Container Storage Interface)",
          "CRI (Container Runtime Interface)",
          "CNI (Container Network Interface)"
        ]
      }
    ],
    "interview": [
      {
        "q": "ClusterIP, NodePort ve LoadBalancer arasındaki fark nedir?",
        "a": "ClusterIP yalnız küme içinde erişilir. NodePort her düğümde sabit bir port açar. LoadBalancer bulut sağlayıcıdan dış yük dengeleyici ister ve NodePort ile ClusterIP'yi içerir."
      },
      {
        "q": "ExternalName ne zaman kullanılır?",
        "a": "Küme içinden dış bir hizmeti (örneğin yönetilen veritabanı) kendi Service adıyla çağırmak istediğimde. Yalnız DNS CNAME döner, trafiği proxy etmez."
      }
    ],
    "vocab": [
      {
        "term": "ClusterIP",
        "tr": "küme IP'si",
        "ex": "ClusterIP is the default Service type."
      },
      {
        "term": "NodePort",
        "tr": "düğüm portu",
        "ex": "A NodePort opens the same port on every node."
      },
      {
        "term": "load balancer",
        "tr": "yük dengeleyici",
        "ex": "A cloud load balancer spreads traffic across nodes."
      }
    ],
    "sources": [
      {
        "title": "Kubernetes: Service",
        "url": "https://kubernetes.io/docs/concepts/services-networking/service/"
      },
      {
        "title": "Kubernetes: kube-proxy",
        "url": "https://kubernetes.io/docs/reference/command-line-tools-reference/kube-proxy/"
      }
    ]
  };

  /* 26 ───────────────────────────── kube-proxy, ReplicaSet ve mikroservislerin Kubernetes'te çalışması */
  L[26] = {
    "hook": "Bir Pod'u sildin ve saniyeler sonra yenisi çıktı. Service'e istek attığında ise paketler doğru Pod'a ulaştı. İkisinin arkasında iki farklı bileşen var: ReplicaSet ve kube-proxy.",
    "homework": "Bir Deployment'ın üç kopyasını ve onun önündeki Service'i çiz. Bir Pod silindiğinde ReplicaSet'in ve kube-proxy'nin sırayla ne yaptığını okla göster. Sonra replicas=8 ve %25 değerleriyle rolling update sınırlarını hesapla.",
    "warmup": {
      "recap": [
        {
          "point": "Pod geçici bir iş yükü birimidir."
        },
        {
          "point": "Service etiket seçicisiyle Pod'ları bulur."
        }
      ],
      "concepts": [
        {
          "term": "kube-proxy",
          "tr": "Düğüm ağ kuralı kurucusu",
          "summary": "Her düğümde çalışır, Service ve EndpointSlice değişikliklerini izler ve trafiği Pod'lara ileten kuralları kurar.",
          "example": "Service IP'sine gelen paketin Pod IP'sine çevrilmesi"
        },
        {
          "term": "ReplicaSet",
          "tr": "Kopya sayısı tutucu",
          "summary": "Seçiciye uyan Pod sayısını istenen sayıda tutar; eksikse açar, fazlaysa siler.",
          "example": "3 kopya isteyip bir Pod silinince yenisinin açılması"
        },
        {
          "term": "maxSurge / maxUnavailable",
          "tr": "Güncelleme sınırları",
          "summary": "Rolling update sırasında istenen sayının üstüne kaç Pod çıkılabileceğini ve en çok kaç Pod'un kullanılamaz olabileceğini belirler.",
          "example": "10 kopyada %25 değerleri 3 ek Pod ve en çok 2 kullanılamaz Pod verir"
        }
      ]
    },
    "blocks": [
      {
        "t": "h",
        "text": "Neden öğreniyoruz?"
      },
      {
        "t": "box",
        "h": "Gerçek talep",
        "text": "Bir ekip yeni sürümü yayınlarken Service'e gelen isteklerin bir kısmı hata alıyor. Sorun, hazır olmayan Pod'un EndpointSlice'a girmesi ya da güncelleme sınırlarının yanlış hesaplanması olabilir. kube-proxy ve ReplicaSet'in rolünü bilmek sorunu daraltır."
      },
      {
        "t": "h",
        "text": "kube-proxy nasıl çalışır?"
      },
      {
        "t": "p",
        "text": "Service sanal bir adrestir; ona bağlı bir süreç dinlemez. Yönlendirmeyi her düğümdeki kuralların kendisi yapar ve bu kuralları kube-proxy kurar."
      },
      {
        "t": "steps",
        "h": "kube-proxy nasıl çalışır?",
        "items": [
          "kube-proxy her düğümde çalışır (genellikle DaemonSet olarak) ve API sunucusundan Service ve EndpointSlice değişikliklerini izler.",
          "Bu bilgiye göre düğümde iptables, IPVS ya da nftables kurallarını günceller; Service IP'sine gelen paket seçilen bir Pod IP'sine çevrilir.",
          "Paketin kendisi çoğunlukla çekirdekte yönlendirilir; kube-proxy veri yolunda her paketi taşımaz.",
          "Hazır olmayan Pod EndpointSlice'ta hazır görünmez ve trafik almaz; hazırlık yoklaması bu yüzden önemlidir."
        ]
      },
      {
        "t": "h",
        "text": "ReplicaSet ve Deployment"
      },
      {
        "t": "steps",
        "h": "ReplicaSet ve Deployment",
        "items": [
          "ReplicaSet etiket seçicisi ve Pod şablonuyla tanımlanır; seçiciye uyan Pod sayısını istenen sayıda tutar.",
          "Deployment her sürüm için ayrı bir ReplicaSet yönetir; rolling update'te yenisini büyütür, eskisini küçültür.",
          "Rolling update sınırları: maxSurge yüzdede yukarı, maxUnavailable aşağı yuvarlanır. 10 kopyada %25 için 3 ve 2 çıkar: en çok 13 Pod, en az 8 hazır Pod.",
          "Mikroservislerde her servis bir Deployment ve bir Service çiftidir; servisler birbirini Service DNS adıyla bulur."
        ]
      },
      {
        "t": "box",
        "h": "Dikkat",
        "text": "ReplicaSet seçicisi geniş yazılırsa aynı etiketi taşıyan başka Pod'ları da sahiplenebilir. Her Deployment için benzersiz etiket kullan ve ReplicaSet'i doğrudan değil, Deployment üzerinden yönet."
      }
    ],
    "objectives": [
      {
        "id": "h1",
        "text": "kube-proxy'nin görevini ve çalıştığı yeri söyleyebilirsin."
      },
      {
        "id": "h2",
        "text": "ReplicaSet'in Pod sayısını nasıl koruduğunu açıklayabilirsin."
      },
      {
        "id": "h3",
        "text": "Deployment ile ReplicaSet ilişkisini anlatabilirsin."
      },
      {
        "id": "h4",
        "text": "Rolling update için maxSurge ve maxUnavailable sayılarını hesaplayabilirsin."
      }
    ],
    "summary": [
      "kube-proxy her düğümde Service için trafik kuralları kurar.",
      "ReplicaSet istenen Pod sayısını sabit tutar.",
      "Deployment sürüm başına bir ReplicaSet yönetir.",
      "Yüzde değerlerinde maxSurge yukarı, maxUnavailable aşağı yuvarlanır."
    ],
    "prereq": [
      25
    ],
    "minutes": 25,
    "sonDogrulama": "2026-10-26",
    "surum": "2026-10-v1",
    "quiz": [
      {
        id: "11e5b328",
        "q": "kube-proxy bir kümede nerede çalışır?",
        "options": [
          "Her düğümde",
          "Yalnız kontrol düzlemi düğümünde",
          "Yalnız etcd düğümlerinde",
          "Kümede tek bir kopyası vardır"
        ],
        "obj": "h1"
      },
      {
        id: "4599cd40",
        "q": "kube-proxy hangi bilgiyi izleyerek kuralları günceller?",
        "options": [
          "Konteyner imajlarını ve etiketlerini",
          "API sunucusundaki Service ve EndpointSlice nesnelerini",
          "Düğümlerin disk doluluğunu ve bellek durumunu",
          "Git depolarındaki değişiklikleri"
        ],
        "obj": "h1"
      },
      {
        id: "caa7868a",
        "q": "kube-proxy aşağıdaki kiplerden hangilerini kullanabilir?",
        "options": [
          "iptables",
          "IPVS",
          "nftables",
          "Yukarıdakilerin hepsi"
        ],
        "obj": "h1"
      },
      {
        id: "2882007e",
        "q": "Service trafiğinin yönlendirilmesi çoğunlukla çekirdekteki kurallarla yapılır; kube-proxy bu kuralları kurar.",
        "options": [
          "Doğru",
          "Yanlış"
        ],
        "obj": "h1"
      },
      {
        id: "fba752fb",
        "q": "Üç kopyalı bir ReplicaSet'in Pod'larından biri silinirse ne olur?",
        "options": [
          "ReplicaSet kayıp Pod'un yerine yenisini açar",
          "Kopya sayısı kalıcı olarak 2'ye düşer ve ReplicaSet yeni Pod açmaz",
          "Küme tamamen durur ve kalan iki Pod da otomatik sonlandırılır",
          "Service silinir"
        ],
        "obj": "h2"
      },
      {
        id: "57ab2327",
        "q": "Bir ReplicaSet'in seçicisine uyan, elle oluşturulmuş fazladan bir Pod varsa ne olur?",
        "options": [
          "ReplicaSet bu Pod'u sayıma katar; sayı fazlaysa bir Pod silinir",
          "Hiçbir şey olmaz, elle oluşturulan Pod sayıma girmez",
          "Kümedeki tüm Pod'lar silinir ve baştan açılır",
          "Pod otomatik olarak başka bir ad alanına taşınır"
        ],
        "obj": "h2"
      },
      {
        id: "3f6dc848",
        "q": "Rolling update ve geri alma ile ilgili hangisi Deployment'ın görevidir?",
        "options": [
          "Her düğümde iptables ya da IPVS ağ kuralı kurmak ve Service trafiğini Pod'lara yönlendirmek",
          "Sürüm geçişini ve geri almayı ReplicaSet'ler üzerinden yönetmek",
          "Kümenin durumunu tutan etcd'nin yedeğini düzenli almak ve gerektiğinde geri yüklemek",
          "İmaj derleyip registry'ye göndermek"
        ],
        "obj": "h2"
      },
      {
        id: "fd825ed4",
        "q": "ReplicaSet tek başına rolling update ve geri alma yapar.",
        "options": [
          "Doğru; ReplicaSet sürüm geçişini ve geri almayı kendisi yönetir",
          "Yanlış"
        ],
        "obj": "h2"
      },
      {
        id: "7498467a",
        "q": "Mikroserviste bir servisin Kubernetes karşılığı genellikle nedir?",
        "options": [
          "Bir Deployment ve önünde bir Service",
          "Tek bir Pod ve doğrudan IP",
          "Bir etcd anahtarı",
          "Bir düğüm"
        ],
        "obj": "h3"
      },
      {
        id: "ba4536b4",
        "q": "'siparis' Service'i 'odeme' ad alanında ise küme içinden tam DNS adı hangisidir?",
        "options": [
          "siparis.odeme.svc.cluster.local",
          "odeme.siparis.svc.cluster.local",
          "siparis.cluster.local.odeme",
          "siparis.odeme.pod.local"
        ],
        "obj": "h3"
      },
      {
        id: "bb5cddde",
        "q": "Bir Pod hazır değilken (readiness başarısız) Service trafiği için ne olur?",
        "options": [
          "Pod yine de diğerleriyle eşit oranda trafik almaya devam eder",
          "Service nesnesi otomatik olarak silinir",
          "Düğümdeki tüm Pod'lar yeniden başlatılır",
          "Pod trafik almaz çünkü hazır uç noktalar arasına alınmaz"
        ],
        "obj": "h3"
      },
      {
        id: "d01d10e2",
        "q": "replicas: 10, maxSurge: %25, maxUnavailable: %25 ise rolling update sırasında aynı anda en çok kaç Pod bulunabilir?",
        "options": [
          "12",
          "13",
          "10",
          "15"
        ],
        "obj": "h4"
      },
      {
        id: "8653de34",
        "q": "replicas: 10, maxSurge: %25, maxUnavailable: %25 ise güncelleme sırasında en az kaç Pod hazır kalır?",
        "options": [
          "7",
          "9",
          "10",
          "8"
        ],
        "obj": "h4"
      },
      {
        id: "0bc58c92",
        "q": "replicas: 4, maxSurge: %25, maxUnavailable: %25 için maxSurge ve maxUnavailable kaç Pod eder?",
        "options": [
          "maxSurge 2, maxUnavailable 2",
          "maxSurge 0, maxUnavailable 1",
          "maxSurge 1, maxUnavailable 0",
          "maxSurge 1, maxUnavailable 1"
        ],
        "obj": "h4"
      },
      {
        "id": "6d9a1a20",
        "q": "Bir uygulama konteyneri başlamadan önce yalnızca bir kez çalışıp biten hazırlık işi (ör. şema hazırlama, bağımlılığı bekleme) için hangi Pod özelliği kullanılır?",
        "options": [
          "DaemonSet",
          "ResourceQuota",
          "Liveness probe",
          "Init container"
        ]
      },
      {
        "id": "228e7c0d",
        "q": "Service mesh yapılarında (ör. Istio, Linkerd) her Pod'un yanına eklenip Pod'a giren ve çıkan trafiği yöneten bileşene ne denir?",
        "options": [
          "Ingress denetleyicisi",
          "Sidecar proxy",
          "kubelet",
          "etcd (küme durumu deposu)"
        ]
      }
    ],
    "interview": [
      {
        "q": "kube-proxy ne yapar?",
        "a": "Her düğümde Service ve EndpointSlice değişikliklerini izleyip iptables, IPVS ya da nftables kurallarını günceller. Böylece Service IP'sine gelen trafik Pod'lara yönlenir."
      },
      {
        "q": "ReplicaSet ile Deployment farkı nedir?",
        "a": "ReplicaSet yalnız istenen sayıda Pod'u tutar. Deployment ise sürüm geçişi, geri alma ve ölçeklemeyi ReplicaSet'ler üzerinden yönetir; pratikte Deployment kullanırım."
      }
    ],
    "vocab": [
      {
        "term": "replica",
        "tr": "kopya",
        "ex": "The ReplicaSet keeps three replicas running."
      },
      {
        "term": "rolling update",
        "tr": "kademeli güncelleme",
        "ex": "A rolling update replaces pods gradually."
      },
      {
        "term": "endpoint",
        "tr": "uç nokta",
        "ex": "An endpoint is a pod address behind a service."
      }
    ],
    "sources": [
      {
        "title": "Kubernetes: ReplicaSet",
        "url": "https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/"
      },
      {
        "title": "Kubernetes: Deployment",
        "url": "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/"
      }
    ]
  };

  /* 27 ───────────────────────────── kubectl ile Pod çalıştırınca ne olur: istekten konteynere akış */
  L[27] = {
    "hook": "kubectl run web --image=nginx yazdın ve bir Pod çalışmaya başladı. Peki bu birkaç saniyede hangi bileşen ne yaptı? Bu akışı bilmek, bir Pod Pending'de kaldığında nereye bakacağını söyler.",
    "homework": "kubectl run akışını kendi cümlelerinle altı adımda yaz. Her adımın yanına sorumlu bileşeni ve o adımın bozulursa göreceğin belirtiyi ekle (örneğin NODE sütunu boş).",
    "warmup": {
      "recap": [
        {
          "point": "API sunucusu kümenin tek kapısıdır."
        },
        {
          "point": "Nesneler etcd'de saklanır."
        }
      ],
      "concepts": [
        {
          "term": "Scheduler",
          "tr": "Yerleştirici",
          "summary": "nodeName'i boş Pod'ları izler, düğümleri eler ve puanlar, seçtiği düğümü Pod'a bağlar.",
          "example": "Yeterli bellek ve uyumlu taint bulunan düğümün seçilmesi"
        },
        {
          "term": "Kubelet",
          "tr": "Düğüm aracısı",
          "summary": "Düğümde kendisine atanan Pod'ları izler ve container runtime'a CRI üzerinden konteyner başlattırır.",
          "example": "nginx imajının çekilip konteynerin başlatılması"
        },
        {
          "term": "Denetleyici (controller)",
          "tr": "İstenen duruma getirici",
          "summary": "İstenen ve gerçek durumu karşılaştırıp aradaki farkı kapatan döngüdür.",
          "example": "Deployment'ın ReplicaSet, ReplicaSet'in Pod oluşturması"
        }
      ]
    },
    "blocks": [
      {
        "t": "h",
        "text": "Neden öğreniyoruz?"
      },
      {
        "t": "box",
        "h": "Gerçek talep",
        "text": "Bir Pod dakikalardır Pending. NODE sütunu boşsa suçlu scheduler tarafıdır (kaynak, taint). NODE doluysa ama Pod hâlâ başlamadıysa imaj çekme ya da kubelet olaylarına bakılır. Akışı bilmek aramayı yarıya indirir."
      },
      {
        "t": "h",
        "text": "Çıplak Pod'un yolculuğu"
      },
      {
        "t": "p",
        "text": "Hiçbir bileşen diğerine doğrudan komut vermez. Hepsi API sunucusundaki nesneyi izler ve kendi görevini yapar."
      },
      {
        "t": "steps",
        "h": "Çıplak Pod'un yolculuğu",
        "items": [
          "kubectl, kubeconfig'teki bilgilerle API sunucusuna bir Pod oluşturma isteği gönderir.",
          "API sunucusu isteği kimlik doğrulama, yetkilendirme ve admission control'den geçirir; geçerse Pod'u etcd'ye yazar (nodeName boş, durum Pending).",
          "Scheduler nodeName'i boş Pod'u görür, uygun olmayan düğümleri eler, kalanları puanlar ve seçtiği düğümü Pod'a bağlar. Bu yazım da API sunucusu aracılığıyla etcd'ye gider.",
          "O düğümdeki kubelet, kendisine atanan Pod'u görür; CRI üzerinden container runtime'a (containerd ya da CRI-O) imajı çektirir ve konteyneri başlattırır. Ağı CNI eklentisi kurar.",
          "Kubelet durumu API sunucusuna bildirir; Pod Running olur. kubectl describe olaylarında Scheduled, Pulling, Pulled, Created ve Started görürsün."
        ]
      },
      {
        "t": "h",
        "text": "Deployment ile fark"
      },
      {
        "t": "steps",
        "h": "Deployment ile fark",
        "items": [
          "kubectl create deployment komutunda önce Deployment nesnesi yazılır; controller manager içindeki Deployment denetleyicisi bir ReplicaSet, ReplicaSet denetleyicisi de Pod'ları oluşturur.",
          "Ondan sonrası aynıdır: scheduler yerleştirir, kubelet çalıştırır. replicas=3 için toplam 1 Deployment + 1 ReplicaSet + 3 Pod = 5 nesne oluşur.",
          "Yalnız API sunucusu etcd ile konuşur; scheduler, kubelet ve denetleyiciler API sunucusunu izler.",
          "Service varsa kube-proxy da Pod'un uç noktasını görüp düğümde trafik kuralını günceller."
        ]
      },
      {
        "t": "box",
        "h": "Dikkat",
        "text": "Scheduler konteyner başlatmaz; yalnız düğümü seçer. Konteyneri kubelet ve runtime başlatır. Bu ayrımı bilmek Pending ile ContainerCreating arasındaki farkı açıklar."
      }
    ],
    "objectives": [
      {
        "id": "h1",
        "text": "kubectl run akışındaki adımları doğru sırayla sayabilirsin."
      },
      {
        "id": "h2",
        "text": "Her bileşenin tek görevini ayırt edebilirsin."
      },
      {
        "id": "h3",
        "text": "Deployment ile oluşan nesneleri ve sayısını hesaplayabilirsin."
      },
      {
        "id": "h4",
        "text": "Pending'de kalan Pod için akışa göre arama yeri seçebilirsin."
      }
    ],
    "summary": [
      "Akış: API sunucusu, etcd, scheduler, kubelet, runtime.",
      "Yalnız API sunucusu etcd'ye yazar.",
      "Scheduler düğümü seçer, kubelet çalıştırır.",
      "Deployment ek olarak ReplicaSet ve denetleyici katmanı ekler."
    ],
    "prereq": [
      26
    ],
    "minutes": 25,
    "sonDogrulama": "2026-10-26",
    "surum": "2026-10-v1",
    "quiz": [
      {
        id: "c26827d5",
        "q": "kubectl run ile bir Pod oluşturma isteği ilk olarak hangi bileşene gider?",
        "options": [
          "Scheduler (kube-scheduler bileşeni)",
          "API sunucusu",
          "Hedef düğümdeki Kubelet",
          "etcd"
        ],
        "obj": "h1"
      },
      {
        id: "59b78b06",
        "q": "Pod nesnesi etcd'ye ilk yazıldığında nodeName alanı nasıldır?",
        "options": [
          "Kubelet tarafından Pod oluşturulduğu anda doldurulur",
          "Boştur; scheduler daha sonra doldurur",
          "kube-proxy tarafından doldurulur",
          "Her zaman API sunucusunun seçtiği rastgele bir düğüm adıdır"
        ],
        "obj": "h1"
      },
      {
        id: "30565939",
        "q": "Aşağıdakilerden hangisi kubectl run akışının doğru sırasıdır?",
        "options": [
          "Kubelet, scheduler, API sunucusu, etcd sırasıyla çalışır ve Pod bu yolla yazılır",
          "Scheduler, API sunucusu, kubelet, etcd sırasıyla çalışır, ardından Pod kaydedilir",
          "etcd, kubelet, API sunucusu, scheduler sırasıyla çalışır ve istek en sonda alınır",
          "API sunucusu, etcd'ye yazım, scheduler'ın düğüm seçmesi, kubelet'in konteyneri başlatması"
        ],
        "obj": "h1"
      },
      {
        id: "d69a471b",
        "q": "Scheduler yalnız düğümü seçer; konteyneri o düğümdeki kubelet başlatır.",
        "options": [
          "Doğru",
          "Yanlış"
        ],
        "obj": "h1"
      },
      {
        id: "f3e4ad4c",
        "q": "Düğümde imajı çekip konteyneri başlatmaktan hangi bileşen sorumludur?",
        "options": [
          "Kubelet, container runtime ile birlikte",
          "Scheduler",
          "kube-proxy",
          "etcd"
        ],
        "obj": "h2"
      },
      {
        id: "73965862",
        "q": "Hangileri yalnız API sunucusu aracılığıyla çalışır, etcd ile doğrudan konuşmaz?",
        "options": [
          "Scheduler (kube-scheduler bileşeni)",
          "Kubelet (her düğümde çalışan düğüm ajanı)",
          "Controller manager",
          "Yukarıdakilerin hepsi"
        ],
        "obj": "h2"
      },
      {
        id: "2c5dc136",
        "q": "Pod'un NODE sütunu boş ve durumu Pending. En olası neden nedir?",
        "options": [
          "Kubelet imajı registry'den çekemedi ve kapsayıcı başlatılamadı",
          "kube-proxy kural kurma sırasında çöktü",
          "Scheduler Pod için uygun bir düğüm bulamadı",
          "Container runtime düğümde yanlış sürümde çalışıyor ve Pod başlatılamıyor"
        ],
        "obj": "h2"
      },
      {
        id: "34798188",
        "q": "Bileşenler (scheduler, kubelet) etcd'ye doğrudan yazar.",
        "options": [
          "Doğru; bileşenler durumu etcd'ye doğrudan yazıp okur",
          "Yanlış"
        ],
        "obj": "h2"
      },
      {
        id: "7ae64fa7",
        "q": "kubectl create deployment web --image=nginx --replicas=3 komutu sonunda kaç nesne (Deployment, ReplicaSet ve Pod toplamı) oluşur?",
        "options": [
          "3",
          "4",
          "7",
          "5"
        ],
        "obj": "h3"
      },
      {
        id: "f8bbc0e0",
        "q": "Deployment oluşturulduğunda Pod'ları doğrudan hangi nesne oluşturur?",
        "options": [
          "Deployment doğrudan Pod oluşturur",
          "Scheduler Pod oluşturur",
          "ReplicaSet (denetleyicisi)",
          "kube-proxy Pod oluşturur"
        ],
        "obj": "h3"
      },
      {
        id: "75427123",
        "q": "Çıplak Pod (Deployment olmadan kubectl run) için hangi bileşen akışta gerekli değildir?",
        "options": [
          "API sunucusu ve etcd kaydı",
          "Scheduler'ın düğüm seçmesi",
          "ReplicaSet ve Deployment denetleyicileri",
          "Kubelet'in konteyneri başlatması"
        ],
        "obj": "h3"
      },
      {
        id: "26975579",
        "q": "kubectl describe pod çıktısındaki Events bölümünde 'Scheduled' olayı hangi bileşenden gelir?",
        "options": [
          "Scheduler",
          "Kubelet",
          "kube-proxy",
          "etcd"
        ],
        "obj": "h4"
      },
      {
        id: "dffaf646",
        "q": "Olay sırası şu şekilde: Scheduled, Pulling, Pulled, Created, Started. Pulling olayı ne anlama gelir?",
        "options": [
          "Scheduler düğüm seçmeye başladı",
          "Pod silindi",
          "Kubelet imajı çekmeye başladı",
          "Service oluşturuldu"
        ],
        "obj": "h4"
      },
      {
        id: "aa66ab0e",
        "q": "Bir Pod Pending ve NODE doluysa, ama konteyner başlamıyorsa sırasıyla nereye bakılmalı?",
        "options": [
          "Scheduler günlüklerine, çünkü düğüm henüz seçilmedi",
          "kubectl describe pod olaylarına: imaj çekme ve kubelet mesajlarına",
          "etcd yedeğini geri yüklemeye",
          "Service YAML'ındaki selector alanına"
        ],
        "obj": "h4"
      },
      {
        "id": "8acc6f17",
        "q": "Kubernetes kontrol düzleminde bulut sağlayıcıya özgü mantığı (ör. bulut yük dengeleyici oluşturma, düğüm yaşam döngüsü) çalıştıran bileşen hangisidir?",
        "options": [
          "kube-proxy (düğüm ağ kuralları)",
          "cloud-controller-manager",
          "etcd (küme durumu deposu)",
          "kube-scheduler (Pod yerleştirme)"
        ]
      }
    ],
    "interview": [
      {
        "q": "kubectl run yazınca ne olur?",
        "a": "İstek API sunucusunda kimlik, yetki ve admission'dan geçer, Pod etcd'ye yazılır. Scheduler düğümü seçer, o düğümün kubelet'i container runtime ile konteyneri başlatır ve durumu API sunucusuna bildirir."
      },
      {
        "q": "Pod Pending'de kalırsa nereye bakarsın?",
        "a": "kubectl describe pod ile olaylara bakarım. NODE boşsa scheduler (kaynak, taint, kota), atanmışsa imaj çekme ve kubelet olaylarına bakarım."
      }
    ],
    "vocab": [
      {
        "term": "scheduler",
        "tr": "yerleştirici",
        "ex": "The scheduler binds a pod to a node."
      },
      {
        "term": "kubelet",
        "tr": "düğüm aracısı",
        "ex": "The kubelet starts containers on its node."
      },
      {
        "term": "reconcile",
        "tr": "eşitlemek",
        "ex": "Controllers reconcile desired and observed state."
      }
    ],
    "sources": [
      {
        "title": "Kubernetes: Cluster Architecture",
        "url": "https://kubernetes.io/docs/concepts/architecture/"
      },
      {
        "title": "Kubernetes: kube-scheduler",
        "url": "https://kubernetes.io/docs/concepts/scheduling-eviction/kube-scheduler/"
      }
    ]
  };

  /* 28 ───────────────────────────── Kubernetes'i genişletmek: CRI, RuntimeClass, CRD ve Operator */
  L[28] = {
    "hook": "Ekip bir veritabanını Kubernetes üzerinde yedekleme ve yük devretme dahil kendi kendine yönetsin istiyor. Kubernetes'in 'Veritabanı' diye bir nesnesi yok; bu derste API'yi CRD ile genişletmeyi ve Operator desenini öğrenirsin.",
    "homework": "Kendi uygulaman için bir Yedek ya da Veritabanı CRD'sinin hangi alanları olacağını yaz. Sonra bir Operator'ın bu nesneyi izleyerek hangi üç işi otomatik yapacağını sırayla listele.",
    "warmup": {
      "recap": [
        {
          "point": "API sunucusu Kubernetes nesnelerini sunar ve etcd'de saklar."
        },
        {
          "point": "Denetleyici, istenen ile gerçek durumu eşitleyen döngüdür."
        }
      ],
      "concepts": [
        {
          "term": "CRI",
          "tr": "Runtime arayüzü",
          "summary": "Kubelet ile container runtime arasındaki standart arayüzdür; containerd ve CRI-O bunu uygular.",
          "example": "Kubelet'in containerd'den konteyner başlatmasını istemesi"
        },
        {
          "term": "RuntimeClass",
          "tr": "Runtime seçici",
          "summary": "Pod için hangi runtime yapılandırmasının (runc, gVisor, Kata) kullanılacağını runtimeClassName ile seçtirir.",
          "example": "Güvenilmeyen iş yükünü gVisor ile çalıştırmak"
        },
        {
          "term": "CRD ve Operator",
          "tr": "Yeni nesne ve onu yöneten denetleyici",
          "summary": "CRD API'ye yeni kaynak türü ekler; Operator bu kaynağı izleyen ve uygulamanın işletme işlerini yapan özel denetleyicidir.",
          "example": "Veritabanı kaynağı için yedek alıp yük devreden Operator"
        }
      ]
    },
    "blocks": [
      {
        "t": "h",
        "text": "Neden öğreniyoruz?"
      },
      {
        "t": "box",
        "h": "Gerçek talep",
        "text": "Yönetilen bir veritabanı kümesini Kubernetes'te çalıştırmak yalnız Pod açmak değildir: yedek, sürüm yükseltme, yük devretme gibi işler gerekir. Bu bilgiyi kodlayıp otomatikleştiren Operator'lar sektörde bu yüzden yaygındır."
      },
      {
        "t": "h",
        "text": "Takılabilir arayüzler"
      },
      {
        "t": "p",
        "text": "Kubernetes kendi başına konteyner çalıştırmaz, ağ kurmaz, disk bağlamaz; bu işler standart arayüzlerle dış eklentilere devredilir."
      },
      {
        "t": "steps",
        "h": "Takılabilir arayüzler",
        "items": [
          "CRI: kubelet ile container runtime (containerd, CRI-O) arasındaki arayüz. Docker Engine'e doğrudan destek (dockershim) 1.24'te kaldırıldı; imajlar OCI standardında olduğu için aynen çalışır.",
          "CNI: Pod ağını kuran eklentiler için arayüz. CSI: depolama eklentileri için arayüz.",
          "OCI: imaj ve runtime biçim standardı; runc düşük seviyeli bir OCI runtime'ıdır.",
          "RuntimeClass: Pod başına runtime yapılandırması seçtirir. handler runtime'daki adı, isteğe bağlı overhead ve scheduling alanları ek yükü ve yerleşimi belirler."
        ]
      },
      {
        "t": "h",
        "text": "CRD ve Operator"
      },
      {
        "t": "steps",
        "h": "CRD ve Operator",
        "items": [
          "CRD API'ye yeni bir kaynak türü tanıtır; yeni kaynak kubectl ile yönetilir, etcd'de saklanır, OpenAPI şemasıyla doğrulanabilir.",
          "CRD tek başına davranış getirmez; kaynağı izleyen bir denetleyici gerekir.",
          "Operator = CRD + özel denetleyici: kaynaktaki istenen durumu okuyup gerçek durumu eşitler (yedek al, kopya ekle, yükselt).",
          "Operator geliştirme için Kubebuilder ve Operator SDK gibi araçlar yaygındır. API'yi genişletmenin diğer yolu aggregated API sunucusudur; CRD daha basittir."
        ]
      },
      {
        "t": "box",
        "h": "Dikkat",
        "text": "Operator sürekli çalışan bir denetim döngüsüdür. Hatalı döngü kaynak tüketebilir ya da kaynağı tekrar tekrar değiştirebilir; yetkilerini RBAC ile en az ayrıcalığa indir."
      }
    ],
    "objectives": [
      {
        "id": "h1",
        "text": "CRI, CNI ve CSI arayüzlerinin rolünü ayırt edebilirsin."
      },
      {
        "id": "h2",
        "text": "containerd, CRI-O ve dockershim'in durumunu açıklayabilirsin."
      },
      {
        "id": "h3",
        "text": "RuntimeClass'ın işlevini ve alanlarını söyleyebilirsin."
      },
      {
        "id": "h4",
        "text": "CRD ile Operator'ı birbirinden ayırabilirsin."
      }
    ],
    "summary": [
      "CRI kubelet-runtime, CNI ağ, CSI depolama arayüzüdür.",
      "containerd ve CRI-O CRI uygular; dockershim 1.24'te kaldırıldı.",
      "RuntimeClass Pod başına runtime yapılandırması seçer.",
      "CRD yeni kaynak türüdür, Operator onu yöneten denetleyicidir."
    ],
    "prereq": [
      27
    ],
    "minutes": 25,
    "sonDogrulama": "2026-10-26",
    "surum": "2026-10-v1",
    "quiz": [
      {
        id: "cb0e4b17",
        "q": "Kubelet ile container runtime arasındaki standart arayüz hangisidir?",
        "options": [
          "CNI",
          "CRI",
          "CSI",
          "OCI imaj formatı"
        ],
        "obj": "h1"
      },
      {
        id: "386e4b03",
        "q": "Aşağıdakilerden hangisi CRI uygulayan bir container runtime'dır?",
        "options": [
          "containerd",
          "Prometheus",
          "Helm",
          "etcd"
        ],
        "obj": "h1"
      },
      {
        id: "b9c054bb",
        "q": "Kubernetes 1.24'te dockershim'in kaldırılması Docker ile oluşturulmuş imajların artık çalışmayacağı anlamına gelir.",
        "options": [
          "Doğru; Docker ile oluşturulmuş imajlar artık hiçbir çalışma zamanında çalışmaz",
          "Yanlış"
        ],
        "obj": "h1"
      },
      {
        id: "ebef7fe0",
        "q": "Aşağıdaki arayüzlerden hangileri Kubernetes'te takılabilir eklenti noktalarıdır?",
        "options": [
          "CRI (runtime)",
          "CNI (ağ)",
          "CSI (depolama)",
          "Yukarıdakilerin hepsi"
        ],
        "obj": "h1"
      },
      {
        id: "9c9c7543",
        "q": "Pod YAML'ında runtimeClassName alanı ne işe yarar?",
        "options": [
          "Pod'un hangi düğümde çalışacağını, zamanlayıcıyı atlayarak doğrudan belirler",
          "İmajın hangi registry'den ve hangi kimlik bilgisiyle çekileceğini belirler",
          "Pod'un hangi runtime yapılandırmasıyla çalışacağını seçer",
          "Pod'un kaç kopya çalışacağını belirler"
        ],
        "obj": "h2"
      },
      {
        id: "dcdcc0f6",
        "q": "Güvenilmeyen kodu daha izole bir ortamda çalıştırmak için hangi kavram uygundur?",
        "options": [
          "Daha büyük bir ConfigMap oluşturmak ve gizli değerleri koymak",
          "Pod kopya sayısını artırmak ve yük dengelemek",
          "RuntimeClass ile gVisor ya da Kata gibi bir runtime seçmek",
          "Service türünü NodePort yapıp portu kısıtlamak"
        ],
        "obj": "h2"
      },
      {
        id: "e237c815",
        "q": "RuntimeClass içinde overhead alanı, Pod'un runtime'dan kaynaklanan ek kaynak yükünü zamanlamaya yansıtmak için kullanılır.",
        "options": [
          "Doğru",
          "Yanlış"
        ],
        "obj": "h2"
      },
      {
        id: "5092b5d2",
        "q": "CRD (CustomResourceDefinition) ne yapar?",
        "options": [
          "Yeni bir düğüm ekler",
          "API'ye yeni bir kaynak türü ekler",
          "Pod'ları otomatik ölçekler",
          "Ağ kurallarını yönetir"
        ],
        "obj": "h3"
      },
      {
        id: "e2b3b0c9",
        "q": "CRD ile oluşturulan özel kaynaklar nerede saklanır?",
        "options": [
          "Yalnız kubelet'in diskinde",
          "Container registry'de",
          "Her zaman bir ConfigMap içinde",
          "Diğer Kubernetes nesneleri gibi etcd'de"
        ],
        "obj": "h3"
      },
      {
        id: "4d2e71d8",
        "q": "Yalnız bir CRD oluşturmak, kümede o kaynak için otomatik iş yapılmasını sağlar.",
        "options": [
          "Doğru; CRD oluşturulur oluşturulmaz kaynak için iş otomatik yürütülür",
          "Yanlış"
        ],
        "obj": "h3"
      },
      {
        id: "78acf122",
        "q": "Operator deseni nedir?",
        "options": [
          "Kümeye yeni düğüm ekleyen bir düğüm türü",
          "CRD ile o kaynağı izleyen özel bir denetleyicinin birleşimi",
          "OCI standardındaki konteyner imaj biçimi",
          "ClusterIP ve NodePort gibi bir Service türü"
        ],
        "obj": "h4"
      },
      {
        id: "3d5e8c53",
        "q": "Bir veritabanı Operator'ının tipik işi hangisidir?",
        "options": [
          "Kubernetes API sunucusunun kaynak kodunu değiştirip yeniden derlemek",
          "Uygulama konteyner imajlarını derleyip registry'ye göndermek",
          "Kümedeki tüm DNS kayıtlarını silmek",
          "Yedek almak, kopya eklemek ve yük devretme gibi işletme işlerini otomatikleştirmek"
        ],
        "obj": "h4"
      },
      {
        id: "cefa8459",
        "q": "Operator içindeki denetim döngüsü hangi mantıkla çalışır?",
        "options": [
          "Rastgele aralıklarla seçtiği Pod'ları silerek kaos yaratır ve dayanıklılığı test eder",
          "Yalnız log toplar ve durumu hiç değiştirmez",
          "Her değişiklikten önce kullanıcıdan manuel onay bekler ve onaysız hiçbir işlem yapmaz",
          "İstenen durumu gerçek durumla karşılaştırır ve farkı kapatır"
        ],
        "obj": "h4"
      },
      {
        id: "b96fc5d2",
        "q": "Bir CRD uygulandı ve kaynak oluşturuldu ama hiçbir şey olmuyor. En olası neden nedir?",
        "options": [
          "CRD etcd'ye hiçbir koşulda yazılamaz ve API sunucusu tarafından reddedilir",
          "Kaynağı izleyen bir denetleyici (Operator) çalışmıyor",
          "kubectl özel kaynakları hiçbir zaman göstermez",
          "Özel kaynaklar yalnız gece belirli saatlerde çalışır ve gündüz askıya alınır"
        ],
        "obj": "h4"
      },
      {
        "id": "5fae813a",
        "q": "Kullanıcı bir PersistentVolumeClaim oluşturduğunda uygun depolamanın otomatik (dinamik) hazırlanmasını hangi Kubernetes nesnesi tanımlar?",
        "options": [
          "ConfigMap",
          "StorageClass",
          "ResourceQuota",
          "Ingress"
        ]
      }
    ],
    "interview": [
      {
        "q": "Kubernetes 1.24'ten sonra Docker imajlarını çalıştırabilir mi?",
        "a": "Evet. Dockershim kaldırıldı ama imajlar OCI standardındadır; containerd ve CRI-O aynı imajları çalıştırır."
      },
      {
        "q": "Operator nedir?",
        "a": "Bir CRD ile o kaynağı izleyen özel denetleyicinin birleşimidir. Bir uygulamanın işletme bilgisini (yedek, yükseltme, yük devretme) kodlayıp istenen durumu sürekli uygular."
      }
    ],
    "vocab": [
      {
        "term": "custom resource",
        "tr": "özel kaynak",
        "ex": "A custom resource extends the Kubernetes API."
      },
      {
        "term": "operator",
        "tr": "operatör",
        "ex": "An operator automates the lifecycle of an application."
      },
      {
        "term": "runtime",
        "tr": "çalıştırma ortamı",
        "ex": "containerd is a container runtime."
      }
    ],
    "sources": [
      {
        "title": "Kubernetes: Custom Resources",
        "url": "https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/"
      },
      {
        "title": "Kubernetes: Operator pattern",
        "url": "https://kubernetes.io/docs/concepts/extend-kubernetes/operator/"
      }
    ]
  };

  /* 29 ───────────────────────────── RBAC ve Pod Security Standards ile küme güvenliği */
  L[29] = {
    "hook": "Staj yapan biri yanlışlıkla tüm kümedeki Secret'ları listeleyebiliyor, bir Pod ise root olarak ayrıcalıklı çalışıyor. Bu derste ikisini kapatan mekanizmaları öğrenirsin: RBAC ve Pod Security Standards.",
    "homework": "Bir okul kütüphanesi için üç rol tanımla (öğrenci, görevli, müdür) ve her birine hangi fiilleri hangi kaynaklarda verdiğini tabloya yaz. Sonra aynı mantıkla Kubernetes'te Role, ClusterRole ve Binding isimlerini eşleştir.",
    "warmup": {
      "recap": [
        {
          "point": "Yetkilendirme kipleri Node, ABAC, RBAC ve Webhook'tur."
        },
        {
          "point": "Admission control, yetkilendirmeden sonra çalışır."
        }
      ],
      "concepts": [
        {
          "term": "Role / ClusterRole",
          "tr": "İzin kümesi",
          "summary": "Hangi fiilin hangi kaynaklarda serbest olduğunu listeler; yalnız izin ekler, yasak yoktur.",
          "example": "pods üzerinde get, list, watch"
        },
        {
          "term": "RoleBinding / ClusterRoleBinding",
          "tr": "İzni birine bağlama",
          "summary": "Bir Role'ü kullanıcı, grup ya da ServiceAccount'a bağlar; RoleBinding ad alanı, ClusterRoleBinding küme kapsamlıdır.",
          "example": "ci ServiceAccount'una dev ad alanında okuma izni vermek"
        },
        {
          "term": "Pod Security Standards",
          "tr": "Pod güvenlik profilleri",
          "summary": "Privileged, Baseline ve Restricted profilleri; Pod Security Admission ad alanı etiketleriyle uygular.",
          "example": "dev ad alanında enforce=baseline"
        }
      ]
    },
    "blocks": [
      {
        "t": "h",
        "text": "Neden öğreniyoruz?"
      },
      {
        "t": "box",
        "h": "Gerçek talep",
        "text": "Çok sayıda küme olayı gereğinden geniş izinlerden (cluster-admin) ve ayrıcalıklı Pod'lardan doğar. Kimliği doğrulanmış her kullanıcıya kısıtlı izin ve her Pod'a güvenli varsayılanlar vermek, tek bir sızıntının yayılmasını sınırlar."
      },
      {
        "t": "h",
        "text": "RBAC'ın yapısı"
      },
      {
        "t": "p",
        "text": "RBAC varsayılan olarak reddeder; izinler yalnız Role/ClusterRole ile eklenir ve bir Binding ile birine bağlanır."
      },
      {
        "t": "steps",
        "h": "RBAC'ın yapısı",
        "items": [
          "Role bir ad alanındaki, ClusterRole küme genelindeki ya da ad alanı dışı kaynaklardaki (node gibi) izinleri tanımlar.",
          "RoleBinding izni bir ad alanında, ClusterRoleBinding tüm kümede bağlar. Bir ClusterRole'ü RoleBinding ile bağlarsan izin yalnız o ad alanı için geçerli olur.",
          "Özneler: User, Group, ServiceAccount. Pod'lar özel ServiceAccount verilmezse ad alanının default ServiceAccount'unu kullanır.",
          "kubectl auth can-i fiil kaynak --as=özne ile izin doğrulanır. RBAC'ta deny kuralı yoktur, verilmeyen izin yasaktır."
        ]
      },
      {
        "t": "h",
        "text": "Pod Security Standards"
      },
      {
        "t": "steps",
        "h": "Pod Security Standards",
        "items": [
          "Privileged: kısıtsız; tüm yetkiler serbest. Yalnız sistem ve altyapı iş yükleri için.",
          "Baseline: bilinen yetki yükseltmelerini engeller (ayrıcalıklı konteyner, hostNetwork gibi) ama yaygın iş yüklerine uyar.",
          "Restricted: sıkılaştırılmış; root olmayan kullanıcı, tüm capability'lerin düşürülmesi, seccomp profili gibi en iyi uygulamaları ister.",
          "Pod Security Admission ad alanı etiketleriyle çalışır: pod-security.kubernetes.io/enforce reddeder, audit denetim kaydı yazar, warn uyarı verir. PodSecurityPolicy 1.25'te kaldırıldı."
        ]
      },
      {
        "t": "box",
        "h": "Dikkat",
        "text": "Etiketsiz bir ad alanında, küme genelinde başka bir varsayılan ayarlanmadıysa Pod Security Admission kısıtlama uygulamaz. Üretim ad alanlarına enforce etiketini bilinçli koy; önce warn ve audit ile etkiyi gör."
      }
    ],
    "objectives": [
      {
        "id": "h1",
        "text": "Role, ClusterRole ve Binding ilişkisini açıklayabilirsin."
      },
      {
        "id": "h2",
        "text": "RBAC'ın yalnız izin eklediğini ve en az ayrıcalık ilkesini söyleyebilirsin."
      },
      {
        "id": "h3",
        "text": "Üç Pod Security profilini ayırt edebilirsin."
      },
      {
        "id": "h4",
        "text": "kubectl auth can-i ile bir Role/Binding'in sonucunu öngörebilirsin."
      }
    ],
    "summary": [
      "RBAC yalnız izin ekler; Role + Binding birlikte çalışır.",
      "RoleBinding ile ClusterRole bağlanırsa izin tek ad alanıyla sınırlı kalır.",
      "Pod Security Standards: Privileged, Baseline, Restricted.",
      "Pod Security Admission ad alanı etiketleriyle enforce, audit ve warn uygular."
    ],
    "prereq": [
      24
    ],
    "minutes": 25,
    "sonDogrulama": "2026-10-26",
    "surum": "2026-10-v1",
    "quiz": [
      {
        id: "3c5827ed",
        "q": "RBAC'ta bir ad alanı içindeki izinleri tanımlayan nesne hangisidir?",
        "options": [
          "ClusterRoleBinding",
          "ServiceAccount",
          "NetworkPolicy",
          "Role"
        ],
        "obj": "h1"
      },
      {
        id: "a1ebff85",
        "q": "Role'ü bir kullanıcıya ya da ServiceAccount'a bağlayan nesne hangisidir?",
        "options": [
          "ConfigMap",
          "Ingress",
          "RoleBinding",
          "ResourceQuota"
        ],
        "obj": "h1"
      },
      {
        id: "13b4cadf",
        "q": "RBAC'ta verilmeyen her izin yasaktır ve açıkça yasaklayan (deny) bir kural yazılamaz.",
        "options": [
          "Doğru",
          "Yanlış"
        ],
        "obj": "h1"
      },
      {
        id: "5a3a53fe",
        "q": "Bir ClusterRole, RoleBinding ile bir ad alanında bağlanırsa izin kapsamı ne olur?",
        "options": [
          "Tüm kümede geçerli olur",
          "Yalnız o ad alanıyla sınırlı kalır",
          "Hiç geçerli olmaz",
          "Yalnız kube-system'de geçerli olur"
        ],
        "obj": "h2"
      },
      {
        id: "4ce5c3c3",
        "q": "Hangileri RBAC'ta bir Binding'in özneleri (subject) olabilir?",
        "options": [
          "Kullanıcı (User), örneğin sertifika ile doğrulanan kişi",
          "Grup (Group), örneğin bir ekibin tüm üyeleri",
          "ServiceAccount",
          "Yukarıdakilerin hepsi"
        ],
        "obj": "h2"
      },
      {
        id: "9bc9e5b1",
        "q": "En az ayrıcalık ilkesine göre bir CI hesabı yalnız bir ad alanında Pod okuyacaksa ne yapılmalı?",
        "options": [
          "Tüm kümede cluster-admin ClusterRoleBinding vermek",
          "O ad alanı için get, list, watch fiilli bir Role ve RoleBinding vermek",
          "Tüm ad alanlarındaki Secret'lara okuma izni vermek",
          "İzin vermemek ve yönetici parolasını CI ile paylaşmak"
        ],
        "obj": "h2"
      },
      {
        id: "32e567be",
        "q": "Pod Security Standards'ın en kısıtlı (en sıkı) profili hangisidir?",
        "options": [
          "Restricted",
          "Privileged",
          "Baseline",
          "Default"
        ],
        "obj": "h3"
      },
      {
        id: "6c700468",
        "q": "ayrıcalıklı (privileged: true) bir konteyner hangi profilde reddedilir?",
        "options": [
          "Yalnız Privileged",
          "Hiçbirinde",
          "Baseline ve Restricted",
          "Yalnız Restricted dışındaki"
        ],
        "obj": "h3"
      },
      {
        id: "bcb94950",
        "q": "Pod Security Admission bir ad alanında profili nasıl uygular?",
        "options": [
          "Pod başına kubelet parametresiyle",
          "Ingress kuralı ile HTTP isteklerini süzerek",
          "Bir RBAC Role'ü ile fiil kısıtlayarak",
          "pod-security.kubernetes.io/enforce gibi ad alanı etiketleriyle"
        ],
        "obj": "h3"
      },
      {
        id: "71f6e1ac",
        "q": "PodSecurityPolicy hâlâ güncel Kubernetes sürümlerinde Pod güvenliğini uygulayan yerleşik mekanizmadır.",
        "options": [
          "Doğru; PodSecurityPolicy güncel sürümlerde de varsayılan güvenlik mekanizmasıdır",
          "Yanlış"
        ],
        "obj": "h3"
      },
      {
        id: "16f57ba7",
        "q": "dev ad alanında Role pod-okuyucu (pods: get, list, watch) yalnız ci ServiceAccount'una bağlı. kubectl auth can-i delete pods -n dev --as=system:serviceaccount:dev:ci çıktısı nedir?",
        "options": [
          "no",
          "yes",
          "Yalnız uyarı verir",
          "Hata: ServiceAccount yok"
        ],
        "obj": "h4"
      },
      {
        id: "4ea77d9e",
        "q": "Aynı kurulumda kubectl auth can-i list pods -n default --as=system:serviceaccount:dev:ci çıktısı nedir?",
        "options": [
          "yes",
          "Yalnız uyarı verir",
          "no",
          "Hata: Role yok"
        ],
        "obj": "h4"
      },
      {
        id: "98097fe5",
        "q": "Aynı kurulumda kubectl auth can-i list pods -n dev --as=system:serviceaccount:dev:ci çıktısı nedir?",
        "options": [
          "yes",
          "no",
          "Yalnız get için yes",
          "Yalnız watch için yes"
        ],
        "obj": "h4"
      },
      {
        id: "567dde92",
        "q": "Bir ad alanına Pod Security enforce=restricted etiketi konduktan sonra, root olarak çalışan bir Pod oluşturulmak istenirse ne olur?",
        "options": [
          "Pod çalışır ama kullanıcıya ihlal uyarısı verilir",
          "Admission aşamasında reddedilir",
          "Pod başka ad alanına taşınır",
          "Yalnız denetim loguna kaydedilir, Pod çalışır"
        ],
        "obj": "h4"
      }
    ],
    "interview": [
      {
        "q": "RBAC'ta Role ile ClusterRole farkı nedir?",
        "a": "Role bir ad alanındaki izinleri tanımlar. ClusterRole küme genelindeki ya da ad alanı dışı kaynaklardaki izinleri tanımlar; RoleBinding ile bağlanırsa yine tek ad alanıyla sınırlı kalır."
      },
      {
        "q": "Pod Security Standards'ın profilleri nelerdir?",
        "a": "Privileged kısıtsız, Baseline bilinen yetki yükseltmelerini engeller, Restricted en sıkı profildir. Pod Security Admission bunları ad alanı etiketleriyle enforce, audit ya da warn modunda uygular."
      }
    ],
    "vocab": [
      {
        "term": "least privilege",
        "tr": "en az ayrıcalık",
        "ex": "Grant least privilege to every service account."
      },
      {
        "term": "role binding",
        "tr": "rol bağı",
        "ex": "A role binding attaches a role to a subject."
      },
      {
        "term": "service account",
        "tr": "hizmet hesabı",
        "ex": "Pods use a service account to call the API."
      }
    ],
    "sources": [
      {
        "title": "Kubernetes: Using RBAC Authorization",
        "url": "https://kubernetes.io/docs/reference/access-authn-authz/rbac/"
      },
      {
        "title": "Kubernetes: Pod Security Standards",
        "url": "https://kubernetes.io/docs/concepts/security/pod-security-standards/"
      }
    ]
  };

  /* 30 ───────────────────────────── Gözlemlenebilirlik yığını ve CNCF topluluğu: Prometheus, OpenTelemetry, SIG ve KEP */
  L[30] = {
    "hook": "Gece yarısı bir uyarı geldi: hata oranı yükseldi. Hangi servis, ne zamandır ve hangi istek yolunda? Bu derste metrik, log ve iz farkını, Prometheus'un çalışma biçimini ve CNCF'nin projeleri nasıl olgunlaştırdığını öğrenirsin.",
    "homework": "Kendi bildiğin bir web uygulaması için üç metrik (örneğin saniyedeki istek, hata oranı, gecikme), iki log alanı ve izlemek istediğin bir istek yolunu yaz. Sonra KCNA'nın beş alanını sayıp bu dersin hangi alana düştüğünü işaretle.",
    "warmup": {
      "recap": [
        {
          "point": "Uygulamalar Kubernetes'te Pod'larda çalışır."
        },
        {
          "point": "kubectl logs bir konteynerin çıktısını gösterir."
        }
      ],
      "concepts": [
        {
          "term": "Metrik, log, iz",
          "tr": "Üç sinyal",
          "summary": "Metrik sayısal zaman serisidir, log olay kaydıdır, iz bir isteğin servisler arası yolunu ve süresini gösterir.",
          "example": "Saniyedeki istek sayısı (metrik), hata mesajı (log), ödeme isteğinin yolu (iz)"
        },
        {
          "term": "Prometheus",
          "tr": "Zaman serisi izleme",
          "summary": "Hedeflerin /metrics uç noktasını çeker (pull), PromQL ile sorgulanır, uyarıları Alertmanager gönderir.",
          "example": "rate(http_istek_toplam[1m])"
        },
        {
          "term": "SIG ve KEP",
          "tr": "Topluluk yapısı",
          "summary": "Kubernetes geliştirmesi konu bazlı SIG'lerle yürür; yeni özellikler KEP ile önerilir.",
          "example": "SIG Network'ün bir ağ özelliğini KEP ile önermesi"
        }
      ]
    },
    "blocks": [
      {
        "t": "h",
        "text": "Neden öğreniyoruz?"
      },
      {
        "t": "box",
        "h": "Gerçek talep",
        "text": "Bir hata geldiğinde yalnız loga bakan ekip trendi göremez; yalnız metriğe bakan ekip tek isteğin nedenini bulamaz. Üç sinyalin her biri farklı soruyu yanıtlar ve birlikte kullanılır."
      },
      {
        "t": "h",
        "text": "Üç sinyal ve araçları"
      },
      {
        "t": "p",
        "text": "Gözlemlenebilirlik, sistemin dışarı verdiği sinyallerden iç durumunu anlayabilmektir. Kubernetes ekosisteminde her sinyal için yaygın bir araç ailesi vardır."
      },
      {
        "t": "steps",
        "h": "Üç sinyal ve araçları",
        "items": [
          "Metrik: Prometheus hedeflerin /metrics uç noktasını periyodik çeker ve zaman serisi olarak saklar; PromQL ile sorgulanır, Alertmanager uyarı gönderir. Grafana görselleştirir.",
          "Kubernetes metrikleri: metrics-server kubectl top ve HPA için anlık CPU/bellek verir; kube-state-metrics nesne durumunu (kaç kopya hazır vb.) metrik yapar.",
          "Log: konteyner çıktısı düğümde dosyaya yazılır ve kubectl logs ile okunur; Fluentd ya da Fluent Bit gibi toplayıcılar merkeze taşır.",
          "İz: dağıtık izleme isteğin servisler arası yolunu ve sürelerini gösterir; OpenTelemetry vendor-nötr toplama standardıdır, Jaeger gibi araçlar izleri saklar ve gösterir."
        ]
      },
      {
        "t": "h",
        "text": "CNCF ve topluluk"
      },
      {
        "t": "steps",
        "h": "CNCF ve topluluk",
        "items": [
          "CNCF (Cloud Native Computing Foundation) Linux Foundation altında tarafsız bir vakıftır; Kubernetes, Prometheus, containerd ve diğer projeleri barındırır.",
          "Proje olgunluk aşamaları: Sandbox, Incubating, Graduated. Teknik Gözetim Kurulu (TOC) süreçten sorumludur.",
          "Kubernetes geliştirmesi SIG'lerle (ağ, depolama, güvenlik gibi konu grupları) yürür; yeni özellikler KEP belgesiyle önerilir.",
          "KCNA ağırlıkları (CNCF müfredatı): Kubernetes Fundamentals %44, Container Orchestration %28, Cloud Native Application Delivery %16, Cloud Native Architecture %12."
        ]
      },
      {
        "t": "box",
        "h": "Dikkat",
        "text": "Hata bütçesi hesabında pencere uzunluğunu doğru kullan: 30 gün 43200 dakikadır; %99,9 SLO bütçesi 43,2 dakika eder. Rate hesabında sayaç farkını süreye bölersin, değerin kendisini değil."
      }
    ],
    "objectives": [
      {
        "id": "h1",
        "text": "Metrik, log ve iz farkını ayırt edebilirsin."
      },
      {
        "id": "h2",
        "text": "Prometheus'un pull modelini ve temel parçalarını anlatabilirsin."
      },
      {
        "id": "h3",
        "text": "Sayaçtan rate ve SLO'dan hata bütçesi hesaplayabilirsin."
      },
      {
        "id": "h4",
        "text": "CNCF olgunluk aşamalarını, SIG ve KEP'i ve KCNA alan ağırlıklarını söyleyebilirsin."
      }
    ],
    "summary": [
      "Üç sinyal: metrik, log, iz.",
      "Prometheus çeker (pull), PromQL ile sorgulanır, Alertmanager uyarır.",
      "Rate = sayaç farkı / süre; hata bütçesi = pencere x (1 - SLO).",
      "CNCF aşamaları: Sandbox, Incubating, Graduated; Kubernetes SIG ve KEP ile geliştirilir."
    ],
    "prereq": [],
    "minutes": 25,
    "sonDogrulama": "2026-10-26",
    "surum": "2026-10-v1",
    "quiz": [
      {
        id: "81f5f88d",
        "q": "Gözlemlenebilirlikte birlikte kullanılan üç temel veri türü hangisidir?",
        "options": [
          "CPU, bellek ve disk",
          "Pod, Service ve Ingress gibi Kubernetes nesneleri",
          "Build, test ve deploy aşamalarından oluşan hat",
          "Metrik, log ve iz (trace)"
        ],
        "obj": "h1"
      },
      {
        id: "b72adb42",
        "q": "Bir isteğin servisler arasında hangi yolu izlediğini ve her adımda ne kadar sürdüğünü hangi sinyal gösterir?",
        "options": [
          "İz (trace)",
          "Metrik (zaman serisi sayaçlar)",
          "Log (bileşen olay kaydı)",
          "Etiket"
        ],
        "obj": "h1"
      },
      {
        id: "a3063438",
        "q": "Metrik ve log aynı şeydir; biri diğerinin yerine tam olarak geçer.",
        "options": [
          "Doğru; metrik ve log aynı veriyi sunar, biri diğerinin yerini tamamen alır",
          "Yanlış"
        ],
        "obj": "h1"
      },
      {
        id: "4dab814b",
        "q": "Prometheus varsayılan olarak metrikleri nasıl toplar?",
        "options": [
          "Hedefler Prometheus'a sürekli veri iter (push) ve Prometheus yalnız dinler",
          "Yalnız uygulama loglarını ayrıştırarak",
          "Hedeflerin /metrics uç noktasını periyodik olarak çeker (pull)",
          "Yalnız elle girilen değerlerle çalışır"
        ],
        "obj": "h2"
      },
      {
        id: "f912b3e2",
        "q": "Prometheus'ta sorgu dili hangisidir?",
        "options": [
          "PromQL",
          "SQL",
          "GraphQL",
          "YAML"
        ],
        "obj": "h2"
      },
      {
        id: "f86cf029",
        "q": "Prometheus ekosisteminde aşağıdakilerden hangileri bulunur?",
        "options": [
          "Alertmanager (uyarı yönetimi)",
          "Exporter (metrik uç noktası sağlayan bileşen)",
          "PromQL (sorgu dili)",
          "Yukarıdakilerin hepsi"
        ],
        "obj": "h2"
      },
      {
        id: "fc109732",
        "q": "kubectl top pods komutunun çalışması için genellikle hangi bileşen kurulu olmalıdır?",
        "options": [
          "Jaeger (dağıtık iz toplama aracı)",
          "Alertmanager (uyarı yönlendirme bileşeni)",
          "Helm",
          "metrics-server"
        ],
        "obj": "h2"
      },
      {
        id: "740806e8",
        "q": "Bir sayaç t=0 sn'de 1200, t=60 sn'de 1800 değerinde. rate değeri kaçtır?",
        "options": [
          "10 istek/sn",
          "600 istek/sn",
          "30 istek/sn",
          "1800 istek/sn"
        ],
        "obj": "h3"
      },
      {
        id: "73013957",
        "q": "SLO %99,9 ve pencere 30 gün ise hata bütçesi kaç dakikadır?",
        "options": [
          "43,2 dakika",
          "4,32 dakika",
          "432 dakika",
          "30 dakika"
        ],
        "obj": "h3"
      },
      {
        id: "9989041f",
        "q": "SLO %99,95 ve pencere 30 gün ise hata bütçesi kaç dakikadır?",
        "options": [
          "43,2 dakika",
          "2,16 dakika",
          "21,6 dakika",
          "216 dakika"
        ],
        "obj": "h3"
      },
      {
        id: "690ab5ef",
        "q": "OpenTelemetry'nin amacı nedir?",
        "options": [
          "Konteyner imajlarını derleyip imza ile registry'ye göndermek",
          "Kubernetes düğümlerini kurup kümeye katmak ve yükseltmek",
          "Metrik, log ve iz üretimi ve toplama için tedarikçiden bağımsız standart ve araçlar sağlamak",
          "Veritabanı yedeği alıp felaket durumunda geri yüklemek"
        ],
        "obj": "h3"
      },
      {
        id: "531570ff",
        "q": "CNCF proje olgunluk aşamaları (düşükten yükseğe) hangisidir?",
        "options": [
          "Sandbox, Incubating, Graduated",
          "Graduated, Sandbox, Incubating",
          "Beta, Stable, Archived",
          "Alpha, Beta, GA"
        ],
        "obj": "h4"
      },
      {
        id: "57e3acb4",
        "q": "Kubernetes'te konu bazlı geliştirme gruplarına (ağ, depolama, güvenlik gibi) ne denir?",
        "options": [
          "KEP",
          "SIG (Special Interest Group)",
          "TOC",
          "CRD"
        ],
        "obj": "h4"
      },
      {
        id: "2f1ab696",
        "q": "Resmî CNCF KCNA müfredatına göre en yüksek ağırlıklı alan hangisidir?",
        "options": [
          "Kubernetes Fundamentals (%44)",
          "Container Orchestration (%28)",
          "Cloud Native Application Delivery (%16)",
          "Cloud Native Architecture (%12)"
        ],
        "obj": "h4"
      },
      {
        id: "70a487ce",
        "q": "KEP, Kubernetes'e yeni bir özellik önermek için kullanılan belgedir.",
        "options": [
          "Doğru",
          "Yanlış"
        ],
        "obj": "h4"
      }
    ],
    "interview": [
      {
        "q": "Metrik, log ve iz arasındaki fark nedir?",
        "a": "Metrik zamana göre sayısal ölçümdür (trend ve uyarı için), log tek tek olayların kaydıdır (neden için), iz bir isteğin servisler arası yolunu ve sürelerini gösterir (nerede için). Üçünü birlikte kullanırım."
      },
      {
        "q": "Prometheus nasıl çalışır?",
        "a": "Hedeflerin /metrics uç noktalarını periyodik çeker, zaman serisi olarak saklar. PromQL ile sorgulanır, kurallara göre Alertmanager uyarı gönderir."
      }
    ],
    "vocab": [
      {
        "term": "observability",
        "tr": "gözlemlenebilirlik",
        "ex": "Observability helps you understand a system from its outputs."
      },
      {
        "term": "trace",
        "tr": "iz",
        "ex": "A trace follows a request across services."
      },
      {
        "term": "error budget",
        "tr": "hata bütçesi",
        "ex": "The error budget is the allowed unavailability."
      }
    ],
    "sources": [
      {
        "title": "Prometheus: Overview",
        "url": "https://prometheus.io/docs/introduction/overview/"
      },
      {
        "title": "OpenTelemetry: Observability primer",
        "url": "https://opentelemetry.io/docs/concepts/observability-primer/"
      }
    ]
  };
})();

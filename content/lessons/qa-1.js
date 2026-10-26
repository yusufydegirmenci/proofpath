/* QA (ISTQB CTFL v4.0.1 düzeyi) · sabit dersler 23-34 (doğrulama ve geçerleme; test esası ve testware; yedi test ilkesi; inceleme süreci ve rolleri; inceleme türleri; test eforu tahmini; giriş/çıkış ölçütü, DoR ve DoD; K3 hesapları: eşdeğerlik ve sınır değer, karar tablosu, durum geçişi, ifade ve dal kapsamı; risk düzeyi, onay ve regresyon). Faz 19a.
   Kapsam resmî CTFL v4.0.1 müfredatından (istqb.org, PDF 2024-09-15) okunarak doğrulandı; metinler özgündür, müfredattan kopyalanmamıştır. "Pestisit paradoksu" CTFL 4.0.1 metninde geçmez: aynı fikir 5. ilke "Testler eskir" adıyla yer alır (eski adı dersin içinde belirtildi).
   Kaynak adresleri: istqb.org PDF (indirme bağlantısı HTTP 200, curl, 2026-10-26) ve glossary.istqb.org (HTTP 200). Sayısal örnekler Node ile yeniden hesaplanarak doğrulandı.
   Numaralama: TMAP.qa dizini + 1 (mevcut 1-22 dersler korunur); ders eki: qa-ek-3.js, anahtarlar 22-33. */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).qa = (window.PP_LESSONS.qa || {}));

  /* 23 ───────────────────────────── Doğrulama ve geçerleme: ürün doğru mu yapıldı, doğru ürün mü yapıldı */
  L[23] = {
    "hook": "Ekip bütün gereksinimleri test etti, hepsi geçti ve yine de kullanıcılar ürünü beğenmedi. Bu derste testin iki ayrı soruya cevap aradığını öğrenirsin: belirtime uyuyor mu, ve gerçekten işe yarıyor mu?",
    "homework": "Sevdiğin bir uygulamadan (alışveriş, harita, not defteri) bir özellik seç. Aynı özellik için iki liste yaz: belirtime uygunluğu kontrol eden üç madde (doğrulama) ve gerçek kullanıcının işini görüp görmediğini sorgulayan üç madde (geçerleme). Sonra, listelerin hangisinin tek başına yeterli olmadığını bir cümleyle açıkla.",
    "warmup": {
      "recap": [
        {
          "point": "Test yalnız programı çalıştırıp çıktıya bakmak değildir; planlama, tasarım ve değerlendirme de testin parçasıdır."
        },
        {
          "point": "Bir kusur, çalışırken arıza olarak görünebilir."
        }
      ],
      "concepts": [
        {
          "term": "Doğrulama (verification)",
          "tr": "Belirtime uygunluk kontrolü",
          "summary": "Sistemin belirtilen gereksinimleri karşılayıp karşılamadığına bakar.",
          "example": "Şartnamede 8 karakterlik parola yazıyorsa 7 karakterin reddedildiğini görmek"
        },
        {
          "term": "Geçerleme (validation)",
          "tr": "İhtiyaca uygunluk kontrolü",
          "summary": "Sistemin kullanıcıların ve diğer paydaşların ihtiyacını işletim ortamında karşılayıp karşılamadığına bakar.",
          "example": "Gerçek bir kasiyerin ekranı yoğun saatte kullanabilmesi"
        },
        {
          "term": "Kusursuzluk yanılgısı",
          "tr": "Hata yok = başarı sanmak",
          "summary": "Tüm gereksinimleri test edip bulunan her kusuru düzeltmek, sistemin başarılı olacağını garanti etmez.",
          "example": "Hatasız ama kimsenin kullanmadığı bir uygulama"
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
        "text": "Bir mobil bankada havale limiti şartnameye birebir uygulandı, tüm testler geçti. Yayından sonra müşteriler günlük harcamaları için limiti çok düşük buldu ve şube yoğunluğu arttı. Hatasız ama işe yaramayan bir sürüm çıktı: sorun kodda değil, 'doğru şey mi yapıyoruz?' sorusunun sorulmamasındaydı."
      },
      {
        "t": "h",
        "text": "İki soru, iki bakış"
      },
      {
        "t": "p",
        "text": "Test, bir ürünün hem belirtime uyduğunu hem de gerçek ihtiyacı karşıladığını göstermeye çalışır. İlkine doğrulama, ikincisine geçerleme denir. Biri diğerinin yerine geçmez."
      },
      {
        "t": "steps",
        "h": "İki soru, iki bakış",
        "items": [
          "Doğrulama sorusu: 'Ürünü belirtime göre doğru mu yaptık?' Kaynak gereksinim, tasarım ya da kullanıcı hikâyesidir.",
          "Geçerleme sorusu: 'Doğru ürünü mü yaptık?' Kaynak gerçek kullanıcı, iş hedefi ve kullanım ortamıdır.",
          "İkisi de gerekir: belirtimi aynen uygulamak, belirtim yanlışsa yine de kullanışsız ürün üretir."
        ]
      },
      {
        "t": "h",
        "text": "Hangi etkinlik hangi tarafa yakın?"
      },
      {
        "t": "steps",
        "h": "Hangi etkinlik hangi tarafa yakın?",
        "items": [
          "Gereksinimlere karşı yazılmış test senaryoları, tasarım belgesiyle gereksinimin karşılaştırılması: ağırlıklı doğrulama.",
          "Gerçek kullanıcılarla deneme, pilot kullanım, kabul testi: ağırlıklı geçerleme. Kabul testi geçerlemeye ve dağıtıma hazır olduğunu göstermeye odaklanır.",
          "İnceleme gibi statik testler gereksinim ve tasarım belgelerine de uygulanabildiği için hem doğrulama hem geçerleme amacıyla kullanılabilir."
        ]
      },
      {
        "t": "box",
        "h": "Dikkat",
        "text": "'Tüm testler geçti' cümlesi yalnız şunu söyler: yazılmış testler geçti. Testler yanlış şeyi ölçüyorsa ya da belirtim ihtiyacı yansıtmıyorsa ürün yine de başarısız olabilir. Bu yüzden testin tanımı doğrulamayı da geçerlemeyi de içerir."
      }
    ],
    "objectives": [
      {
        "id": "h1",
        "text": "Doğrulama ile geçerlemenin tanımını söyleyip ikisini birbirinden ayırt edebilirsin."
      },
      {
        "id": "h2",
        "text": "Verilen bir durumu doğrulama ya da geçerleme sorunu olarak sınıflandırabilirsin."
      },
      {
        "id": "h3",
        "text": "Kusursuzluk yanılgısını bir örnekle açıklayabilirsin."
      },
      {
        "id": "h4",
        "text": "Kabul testi ve statik testin doğrulama ve geçerleme ile ilişkisini söyleyebilirsin."
      }
    ],
    "summary": [
      "Doğrulama belirtime uygunluğa, geçerleme ihtiyaca uygunluğa bakar.",
      "Belirtimi aynen uygulamak ihtiyacı karşılamayı garanti etmez.",
      "Kusursuzluk yanılgısı: kusurları düzeltmek başarıyı güvenceye almaz.",
      "Kabul testi geçerleme odaklıdır; statik testler ikisine de hizmet edebilir."
    ],
    "prereq": [
      1
    ],
    "minutes": 20,
    "sonDogrulama": "2026-10-26",
    "surum": "2026-10-v1",
    "quiz": [
      {
        "id": "7ac4db54",
        "q": "Bir ekip, gereksinim belgesindeki her madde için bir test yazıp hepsinin geçtiğini gösterdi. Bu çalışma hangi kavrama daha yakındır?",
        "options": [
          "Geçerleme: ürünün kullanıcı ihtiyacını karşıladığının gösterilmesi",
          "Hata ayıklama: kusurun yerinin bulunup düzeltilmesi",
          "Doğrulama: ürünün belirtime uyduğunun gösterilmesi",
          "Kapsam analizi: kodun ne kadarının koştuğunun ölçülmesi"
        ],
        "obj": "h1"
      },
      {
        "id": "256328a3",
        "q": "Geçerleme (validation) hangi soruya cevap arar?",
        "options": [
          "Kod, tasarım belgesindeki her maddeye uygun yazılmış mı?",
          "Testler yeterince hızlı mı çalışıyor?",
          "Sistem, kullanıcıların ve diğer paydaşların ihtiyacını işletim ortamında karşılıyor mu?",
          "Açık kalan hatalar kapatıldı mı?"
        ],
        "obj": "h1"
      },
      {
        "id": "54dc4a0d",
        "q": "Aşağıdaki ifadelerden hangisi doğrulama ile geçerlemeyi doğru ayırır?",
        "options": [
          "Doğrulama kullanıcıya, geçerleme belirtime bakar",
          "Doğrulama yalnız canlıda, geçerleme yalnız geliştirmede yapılır",
          "Doğrulama 'doğru mu yaptık', geçerleme 'doğru şeyi mi yaptık' sorusudur",
          "İkisi aynı etkinliğin iki adıdır"
        ],
        "obj": "h1"
      },
      {
        "id": "53cc8244",
        "q": "Şartname 'günlük havale limiti 50.000 TL' diyor. Uygulama bunu birebir yapıyor ama müşteriler günlük işleri için limiti yetersiz bulup şikâyet ediyor. Doğru yorum hangisidir?",
        "options": [
          "Doğrulama geçti; geçerleme sorunu var, çünkü belirtim ihtiyacı doğru yansıtmıyor",
          "Doğrulama başarısız; kod belirtimi yanlış uygulamış",
          "Her ikisi de başarılı; şikâyetler önemsizdir",
          "Bu bir hata ayıklama sorunudur; kodu yeniden yazmak yeter"
        ],
        "obj": "h2"
      },
      {
        "id": "b14de573",
        "q": "Hangi etkinlik ağırlıklı olarak geçerleme sayılır?",
        "options": [
          "Gereksinim belgesindeki maddeleri test senaryolarıyla satır satır eşlemek",
          "Gerçek kullanıcılarla ürünün işlerini görüp görmediğine dair deneme yapmak",
          "Tasarım belgesinin gereksinimlerle tutarlılığını kontrol etmek",
          "Derleyici uyarılarını sıfıra indirmek"
        ],
        "obj": "h2"
      },
      {
        "id": "82e91949",
        "q": "'Kusursuzluk yanılgısı' ne anlatır?",
        "options": [
          "Hiç kusur bulunmayan bir yazılımın üretilemeyeceğini",
          "Test sayısı arttıkça kusurların kendiliğinden azalacağını",
          "Tüm gereksinimleri test edip bulunan kusurları düzeltmek, sistemin kullanıcı ihtiyacını karşılayacağını garanti etmez",
          "Kusurların her zaman kodda bulunduğunu"
        ],
        "obj": "h3"
      },
      {
        "id": "2e8d0ab9",
        "q": "Ekip: 'Tüm gereksinim testleri geçti ve açık kritik hata yok, bu yüzden ürün başarılı olacak.' Bu çıkarım neden zayıftır?",
        "options": [
          "Test geçmesi hiçbir zaman bir kanıt sayılmaz",
          "Kritik hata olmaması başarının tek koşuludur",
          "Gereksinim testleri yalnız geliştirici için yazılır",
          "Doğrulama kanıtı var ama geçerleme yapılmadıysa ürün ihtiyaçlara ya da iş hedeflerine yine uymayabilir"
        ],
        "obj": "h3"
      },
      {
        "id": "305e2fad",
        "q": "CTFL 4.0.1'e göre kabul testi ağırlıklı olarak neye odaklanır?",
        "options": [
          "Yalnız bileşenler arasındaki arayüz hatalarına",
          "Kodun her satırının koşulmasına",
          "Geçerlemeye ve sistemin dağıtıma hazır olduğunu göstermeye",
          "Yalnız performans ölçümüne"
        ],
        "obj": "h4"
      },
      {
        "id": "8af70303",
        "q": "Statik test (örneğin gereksinim incelemesi) ile ilgili hangisi doğrudur?",
        "options": [
          "Yalnız doğrulama amacıyla uygulanabilir",
          "Yalnız kod yazıldıktan sonra uygulanabilir",
          "Yürütme gerektirdiği için dinamik testten sayılır",
          "Hem doğrulama hem geçerleme amacıyla uygulanabilir"
        ],
        "obj": "h4"
      }
    ],
    "interview": [
      {
        "q": "Doğrulama ile geçerleme arasındaki fark nedir?",
        "a": "Doğrulama sistemin belirtime uyup uymadığına bakar. Geçerleme sistemin kullanıcıların ve paydaşların gerçek ihtiyacını işletim ortamında karşılayıp karşılamadığına bakar. Ben ikisini de plana yazarım."
      },
      {
        "q": "Tüm gereksinim testleri geçtiyse ürün hazır mıdır?",
        "a": "Hayır, bu yalnız doğrulama kanıtıdır. Gereksinim ihtiyacı yanlış yansıtmış olabilir; bu yüzden kullanıcı denemesi gibi geçerleme kanıtı da ararım."
      }
    ],
    "vocab": [
      {
        "term": "verification",
        "tr": "doğrulama",
        "ex": "Verification checks the product against the specification."
      },
      {
        "term": "validation",
        "tr": "geçerleme",
        "ex": "Validation checks that the product meets real user needs."
      },
      {
        "term": "stakeholder",
        "tr": "paydaş",
        "ex": "Every stakeholder cares about a different quality."
      }
    ],
    "sources": [
      {
        "title": "ISTQB CTFL v4.0.1 müfredatı (PDF, istqb.org)",
        "url": "https://istqb.org/?sdm_process_download=1&download_id=3345"
      },
      {
        "title": "ISTQB Sözlüğü",
        "url": "https://glossary.istqb.org/"
      }
    ]
  };

  /* 24 ───────────────────────────── Test esası, testware ve izlenebilirlik */
  L[24] = {
    "hook": "Bir gereksinim değişti ve hangi testlerin etkilendiğini kimse bilmiyor. Test esası, testware ve izlenebilirlik kavramları bu belirsizliği ortadan kaldırır.",
    "homework": "Kendi küçük bir 'kullanıcı giriş yapar' özelliğin için üç satırlık izlenebilirlik tablosu çiz: sol sütunda gereksinim, ortada ona bağlı test durumu, sağda test sonucu. Sonra gereksinimlerden birini değiştir ve hangi satırların yeniden bakılması gerektiğini işaretle.",
    "warmup": {
      "recap": [
        {
          "point": "Test süreci planlama, izleme ve kontrol, analiz, tasarım, uygulama, yürütme ve tamamlama faaliyetlerinden oluşur."
        },
        {
          "point": "Her faaliyet bir çıktı bırakır."
        }
      ],
      "concepts": [
        {
          "term": "Test esası (test basis)",
          "tr": "Testin dayandığı bilgi",
          "summary": "Test analizi ve tasarımının temel aldığı bilgi birikimidir: gereksinim, kullanıcı hikâyesi, tasarım, risk analizi gibi.",
          "example": "Kabul ölçütleri yazılı bir kullanıcı hikâyesi"
        },
        {
          "term": "Testware",
          "tr": "Test çalışmasının çıktıları",
          "summary": "Test faaliyetlerinin ürettiği iş ürünlerinin bütünüdür: plan, test durumu, test verisi, betik, günlük, rapor.",
          "example": "Test planı, test durumları, otomasyon betiği"
        },
        {
          "term": "İzlenebilirlik (traceability)",
          "tr": "Bağları takip edebilme",
          "summary": "Test esası öğeleri, testware, test sonuçları ve kusurlar arasında iki yönlü bağ kurmaktır.",
          "example": "Gereksinim R-12 ile T-31 ve T-32 test durumlarının bağı"
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
        "text": "Ürün sahibi 'ücretsiz kargo sınırı 150 TL'den 200 TL'ye çıkıyor' dedi. İzlenebilirlik varsa bu gereksinime bağlı test durumları iki dakikada listelenir; yoksa ekip günlerce hangi testlerin bayatladığını tahmin eder."
      },
      {
        "t": "h",
        "text": "Test esası ve testware nedir?"
      },
      {
        "t": "p",
        "text": "Test esası testin 'neye göre' sorusunun cevabıdır. Testware ise testin 'ne ürettik' sorusunun cevabıdır. İkisi arasındaki bağ izlenebilirlikle kurulur."
      },
      {
        "t": "steps",
        "h": "Test esası ve testware nedir?",
        "items": [
          "Test planlama çıktıları: test planı, test takvimi, risk kaydı, giriş ve çıkış ölçütleri.",
          "Test analizi çıktıları: öncelikli test koşulları ve test esasındaki kusurlara dair kusur raporları.",
          "Test tasarımı çıktıları: öncelikli test durumları, keşifsel test bildirgesi (charter), kapsam öğeleri, test verisi ve ortam gereksinimleri.",
          "Test uygulama çıktıları: test prosedürleri, elle ve otomatik betikler, test takımları, test verisi, çalıştırma takvimi, ortam öğeleri (taslak servis, sürücü, benzetici).",
          "Test yürütme çıktıları: test günlükleri ve kusur raporları. Tamamlama çıktıları: tamamlama raporu, iyileştirme eylemleri, öğrenilen dersler, değişiklik istekleri."
        ]
      },
      {
        "t": "h",
        "text": "İzlenebilirlik ne işe yarar?"
      },
      {
        "t": "steps",
        "h": "İzlenebilirlik ne işe yarar?",
        "items": [
          "Kapsamı ölçer: test durumlarını gereksinimlere bağlayınca hangi gereksinimin testsiz kaldığı görünür.",
          "Artık riski gösterir: test sonuçlarını risklere bağlayınca hangi riskin hâlâ açık olduğu anlaşılır.",
          "Değişikliğin etkisini belirler: bir gereksinim değişince hangi testlerin güncelleneceği bulunur.",
          "Denetimi ve raporlamayı kolaylaştırır: raporlar test esası öğelerinin durumunu paydaşa anlaşılır biçimde sunar."
        ]
      },
      {
        "t": "box",
        "h": "Dikkat",
        "text": "İzlenebilirlik bir tablo doldurma işi değil, karar aracıdır. Bağlar güncel tutulmazsa yanıltır; küçük projede basit bir tablo, büyük projede araç desteği yeterlidir. Her iş ürünü için bağ kurmaya çalışmak yerine kapsamı ve riski gösteren bağlara öncelik ver."
      }
    ],
    "objectives": [
      {
        "id": "h1",
        "text": "Test esası ile testware arasındaki farkı söyleyebilirsin."
      },
      {
        "id": "h2",
        "text": "Bir test faaliyetinin çıktısını (testware) doğru faaliyete eşleyebilirsin."
      },
      {
        "id": "h3",
        "text": "İzlenebilirliğin sağladığı faydaları sayabilirsin."
      },
      {
        "id": "h4",
        "text": "Bir değişiklikten etkilenen testleri izlenebilirlik tablosundan bulabilirsin."
      }
    ],
    "summary": [
      "Test esası testin dayandığı bilgidir; testware test çalışmasının çıktılarıdır.",
      "Her test faaliyeti belirli testware üretir: plan, koşul, durum, betik, günlük, rapor.",
      "İzlenebilirlik test esası, testware, sonuç ve kusurları bağlar.",
      "Bu bağ kapsamı, artık riski ve değişikliğin etkisini görünür kılar."
    ],
    "prereq": [
      2
    ],
    "minutes": 20,
    "sonDogrulama": "2026-10-26",
    "surum": "2026-10-v1",
    "quiz": [
      {
        "id": "7064b233",
        "q": "Test analizi ve tasarımının 'neye göre' dayandığı bilgi birikimine ne denir?",
        "options": [
          "Test günlüğü",
          "Test ortamı",
          "Test esası",
          "Çıkış ölçütü"
        ],
        "obj": "h1"
      },
      {
        "id": "8cb89053",
        "q": "Hangisi test esası olabilir?",
        "options": [
          "Test yürütme günlüğü",
          "Kabul ölçütleri yazılmış bir kullanıcı hikâyesi",
          "Otomasyon betiğinin çıktısı",
          "Test tamamlama raporu"
        ],
        "obj": "h1"
      },
      {
        "id": "689a6f43",
        "q": "Testware için hangisi doğrudur?",
        "options": [
          "Yalnız otomatik test betikleridir",
          "Yalnız test planıdır",
          "Test faaliyetlerinin çıktısı olan iş ürünlerinin tamamıdır",
          "Test edilen yazılımın kaynak koduna denir"
        ],
        "obj": "h1"
      },
      {
        "id": "035313ad",
        "q": "Hangi iş ürünü test tasarımı faaliyetinin çıktısıdır?",
        "options": [
          "Öncelikli test durumları ve test verisi gereksinimleri",
          "Test günlükleri",
          "Test tamamlama raporu",
          "Test ilerleme raporu"
        ],
        "obj": "h2"
      },
      {
        "id": "a5a363fb",
        "q": "Test günlüğü hangi test faaliyetinin çıktısıdır?",
        "options": [
          "Test planlama",
          "Test yürütme",
          "Test analizi",
          "Test tamamlama"
        ],
        "obj": "h2"
      },
      {
        "id": "a07bf6d0",
        "q": "Taslak servis, sürücü ve benzetici gibi öğeler hangi grup testware'e girer?",
        "options": [
          "Test uygulama: test ortamı öğeleri",
          "Test analizi: test koşulları",
          "Test planlama: giriş ölçütleri",
          "Test tamamlama: öğrenilen dersler"
        ],
        "obj": "h2"
      },
      {
        "id": "5b1523ed",
        "q": "İzlenebilirlik aşağıdakilerden hangisini sağlar?",
        "options": [
          "Test sayısını otomatik artırmayı",
          "Test esasındaki öğelerin testlerle kapsanıp kapsanmadığını görmeyi",
          "Kusurları kendiliğinden düzeltmeyi",
          "Test ortamını kurmayı"
        ],
        "obj": "h3"
      },
      {
        "id": "d3aca03a",
        "q": "Test sonuçlarının risklere bağlanması ne sağlar?",
        "options": [
          "Test nesnesinde kalan artık riski değerlendirmeyi",
          "Test süresini kısaltmayı",
          "Gereksinimleri çoğaltmayı",
          "Kodu hızlandırmayı"
        ],
        "obj": "h3"
      },
      {
        "id": "7e5fcf5a",
        "q": "Gereksinim R-5 değişti. İzlenebilirlik tablosunda R-5 ile T-11, T-12 ve T-19 test durumları bağlı. En doğru ilk adım nedir?",
        "options": [
          "Tüm test durumlarını baştan yazmak",
          "T-11, T-12 ve T-19'u değişikliğe göre gözden geçirmek",
          "Yalnız T-11'i güncelleyip diğerlerini bırakmak",
          "Değişikliği testsiz yayınlamak"
        ],
        "obj": "h4"
      },
      {
        "id": "1d84577f",
        "q": "İzlenebilirlik tablosunda bir gereksinimin yanında hiç test durumu yoksa bu neyi gösterir?",
        "options": [
          "Gereksinimin kusursuz olduğunu",
          "Gereksinimin gereksiz olduğunu",
          "Testin otomatik koştuğunu",
          "Gereksinimin testle kapsanmadığını"
        ],
        "obj": "h4"
      },
      {
        "id": "19a00bda",
        "q": "Belirli bir test hedefine ulaşmak için test senaryolarının yürütme sırasına dizilmesi ve ilgili eylemlerin bir araya getirilmesine ne ad verilir?",
        "options": [
          "Hata raporu (sapma kaydı)",
          "Test verisi (girdi değerleri)",
          "Test prosedürü",
          "Test amacı (hedef beyanı)"
        ]
      }
    ],
    "interview": [
      {
        "q": "Testware nedir? Örnek ver.",
        "a": "Test faaliyetlerinin ürettiği iş ürünleridir: test planı, test durumları, test verisi, otomasyon betikleri, test günlükleri ve raporlar gibi. Yapılandırma yönetimiyle tutarlı ve güncel tutulmalıdır."
      },
      {
        "q": "İzlenebilirlik neden önemlidir?",
        "a": "Gereksinimin hangi testle kapsandığını, hangi riskin açık kaldığını ve bir değişiklikten hangi testlerin etkileneceğini gösterir; denetimi ve raporlamayı da kolaylaştırır."
      }
    ],
    "vocab": [
      {
        "term": "test basis",
        "tr": "test esası",
        "ex": "The test basis is what the tests are derived from."
      },
      {
        "term": "testware",
        "tr": "test iş ürünleri",
        "ex": "Testware must be kept under configuration management."
      },
      {
        "term": "traceability",
        "tr": "izlenebilirlik",
        "ex": "Traceability shows which requirement a test covers."
      }
    ],
    "sources": [
      {
        "title": "ISTQB CTFL v4.0.1 müfredatı (PDF, istqb.org)",
        "url": "https://istqb.org/?sdm_process_download=1&download_id=3345"
      },
      {
        "title": "ISTQB Sözlüğü",
        "url": "https://glossary.istqb.org/"
      }
    ]
  };

  /* 25 ───────────────────────────── Yedi test ilkesi: testler eskir (pestisit paradoksu), kusurlar kümelenir */
  L[25] = {
    "hook": "Aylardır aynı 200 test geçiyor ama kullanıcılar yeni kusurlar bildiriyor. Test ilkeleri, test çalışmasına yön veren yedi kısa tespittir ve bu durumun nedenini de açıklar.",
    "homework": "Yedi ilkeyi kendi cümlelerinle kartlara yaz. Her kart için günlük hayattan ya da bir yazılım projesinden bir örnek ekle. Özellikle 'testler eskir' kartına, aynı test setini üç ay koşturan bir ekip için ne yapılabileceğini üç madde olarak yaz.",
    "warmup": {
      "recap": [
        {
          "point": "Test kusurların varlığını gösterir; yokluğunu kanıtlayamaz."
        },
        {
          "point": "Test kaynakları sınırlıdır, bu yüzden önceliklendirme gerekir."
        }
      ],
      "concepts": [
        {
          "term": "Testler eskir (tests wear out)",
          "tr": "Aynı test zamanla az kusur bulur",
          "summary": "Aynı testler çok kez koşturulunca yeni kusurları yakalamada giderek etkisizleşir. Eski kaynaklarda 'pestisit paradoksu' adıyla geçer.",
          "example": "Aylardır değişmeyen 200 test"
        },
        {
          "term": "Kusurlar kümelenir",
          "tr": "Az bileşen çok kusur",
          "summary": "Kusurların çoğu küçük bir bileşen grubunda bulunur; Pareto ilkesinin bir örneğidir.",
          "example": "Ödeme modülünde bulunan kusurların yarısı"
        },
        {
          "term": "Kapsamlı test imkânsızdır",
          "tr": "Her şeyi denemek olmaz",
          "summary": "Önemsiz durumlar dışında her girdi ve koşulu denemek mümkün değildir; teknik, öncelik ve risk kullanılır.",
          "example": "10 alanlı bir formun tüm birleşimleri"
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
        "text": "Bir e-ticaret ekibi her sürümde aynı 300 regresyon testini koşturuyor ve hepsi geçiyor. Üç sürüm sonra müşteriler yeni bir kampanya kuralında kusur bildiriyor. Testler çalışıyor ama yalnız eski riskleri yokluyor: ilke 'testler eskir' tam olarak bunu söyler."
      },
      {
        "t": "h",
        "text": "CTFL 4.0.1'in yedi ilkesi"
      },
      {
        "t": "p",
        "text": "Müfredat yedi ilke sayar. Aşağıdaki sıra müfredattaki sıradır."
      },
      {
        "t": "steps",
        "h": "CTFL 4.0.1'in yedi ilkesi",
        "items": [
          "1. Test kusurların varlığını gösterir, yokluğunu göstermez: kusur bulunamaması doğruluk kanıtı değildir.",
          "2. Kapsamlı test imkânsızdır: teknikler, önceliklendirme ve risk tabanlı test çabayı odaklar.",
          "3. Erken test zaman ve para kazandırır: kusur erken çıkarsa türeyen kusurlar oluşmaz; statik ve dinamik testler erken başlar.",
          "4. Kusurlar kümelenir: az sayıda bileşen çoğu kusuru içerir; öngörülen ve gözlenen kümeler riskin girdisidir.",
          "5. Testler eskir: aynı testler tekrarlandıkça etkisiz kalır; test ve verilerin değiştirilmesi ya da yenilerinin yazılması gerekebilir. Bazen tekrar yararlıdır, örneğin otomatik regresyon.",
          "6. Test bağlama bağlıdır: her duruma uyan tek bir yaklaşım yoktur.",
          "7. Kusursuzluk yanılgısı: gereksinimleri tam test edip kusurları düzeltmek de sistemin başarısını garanti etmez; doğrulamanın yanında geçerleme de gerekir."
        ]
      },
      {
        "t": "h",
        "text": "Testler eskiyince ne yapılır?"
      },
      {
        "t": "steps",
        "h": "Testler eskiyince ne yapılır?",
        "items": [
          "Test verisini değiştir: aynı akışı farklı girdi birleşimleriyle koştur.",
          "Yeni testler ekle: yeni özellikler, yeni riskler ve bulunan kusurlar için test yaz; bulunan kusurun kardeşlerini de ara.",
          "Keşifsel test oturumları yap: elle ve serbest bir bakış otomatik setin görmediği yerleri bulur.",
          "Otomatik regresyonu sakın silme: orada tekrar yararlıdır, çünkü amaç eskiyi korumaktır; ek olarak yeni bakış gerekir."
        ]
      },
      {
        "t": "box",
        "h": "Dikkat",
        "text": "Eski kaynaklarda beşinci ilke 'pestisit paradoksu' diye geçer; CTFL 4.0.1 aynı fikri 'Testler eskir' başlığıyla verir. Sınavda her iki ad da karşına çıkabilir. 'Tekrar edilen testin her zaman zararsız olduğu' ya da 'her zaman işe yaramaz olduğu' sonucu çıkarma."
      }
    ],
    "objectives": [
      {
        "id": "h1",
        "text": "Yedi test ilkesini söyleyebilirsin."
      },
      {
        "id": "h2",
        "text": "Bir durumun hangi ilkeyi gösterdiğini bulabilirsin."
      },
      {
        "id": "h3",
        "text": "'Testler eskir' ilkesinin nedenini ve çözümünü açıklayabilirsin."
      },
      {
        "id": "h4",
        "text": "Kusur kümelenmesini risk tabanlı testle ilişkilendirebilirsin."
      }
    ],
    "summary": [
      "Müfredat yedi ilke sayar: varlık-yokluk, kapsamlı test, erken test, kümelenme, testlerin eskimesi, bağlam ve kusursuzluk yanılgısı.",
      "Testler eskir: aynı test seti zamanla yeni kusur bulamaz; veri ve test yenilenmelidir.",
      "Kusurlar kümelenir; bu bilgi risk tabanlı testte kullanılır.",
      "Erken test ve bağlam, çabayı nereye harcayacağını belirler."
    ],
    "prereq": [
      2
    ],
    "minutes": 20,
    "sonDogrulama": "2026-10-26",
    "surum": "2026-10-v1",
    "quiz": [
      {
        "id": "9c275fc5",
        "q": "CTFL 4.0.1'e göre test ilkeleri hangi sayıdadır?",
        "options": [
          "Beş",
          "Dokuz",
          "On iki",
          "Yedi"
        ],
        "obj": "h1"
      },
      {
        "id": "117bcb3a",
        "q": "'Test kusurların varlığını gösterir, yokluğunu göstermez' ilkesi ne söyler?",
        "options": [
          "Test hiçbir kusur bulamaz",
          "Kusur bulunursa test başarısızdır",
          "Test yalnız kusuru bulunan nesneler için gereklidir",
          "Hiç kusur bulunmaması testin nesnenin doğruluğunu kanıtladığı anlamına gelmez"
        ],
        "obj": "h1"
      },
      {
        "id": "0bb5402d",
        "q": "Erken test ilkesine göre kusur erken bulunursa ne olur?",
        "options": [
          "Test hiç gerekmez",
          "Hata raporu yazılmaz",
          "Sonraki iş ürünlerine kusur taşınmaz ve kalite maliyeti düşer",
          "Müşteri doğrudan test eder"
        ],
        "obj": "h1"
      },
      {
        "id": "66a6b1af",
        "q": "Bir ekip aylardır aynı 250 testi koşturuyor, hepsi geçiyor, ama canlıda yeni kusurlar çıkıyor. Hangi ilke en çok uyuyor?",
        "options": [
          "Testler eskir (pestisit paradoksu)",
          "Kapsamlı test imkânsızdır",
          "Bağlama bağlılık",
          "Erken test"
        ],
        "obj": "h2"
      },
      {
        "id": "32879233",
        "q": "Kusurların çoğunun ödeme modülünde çıkması hangi ilkeyi gösterir?",
        "options": [
          "Kusurlar kümelenir",
          "Testler eskir",
          "Kusursuzluk yanılgısı",
          "Erken test"
        ],
        "obj": "h2"
      },
      {
        "id": "cefb3e5f",
        "q": "Bir ekip hata bulunamayınca 'her şey test edildi' diyor. Hangi iki ilke ihlal ediliyor?",
        "options": [
          "Erken test ve kümelenme",
          "Bağlam ve yanılgı",
          "Eskime ve erken test",
          "Kusur yokluğu kanıtlanamaz ve kapsamlı test imkânsızdır"
        ],
        "obj": "h2"
      },
      {
        "id": "22f9ac44",
        "q": "'Testler eskir' ilkesinde sorunu azaltmak için hangisi önerilir?",
        "options": [
          "Testleri hiç koşturmamak",
          "Kusurları raporlamamak",
          "Yalnız birim testleri tutmak",
          "Test ve test verisini değiştirmek ya da yeni testler yazmak"
        ],
        "obj": "h3"
      },
      {
        "id": "93c84633",
        "q": "Aşağıdakilerden hangisi doğrudur?",
        "options": [
          "Tekrar her zaman zararlıdır",
          "Tekrar her zaman yeterlidir",
          "Tekrar yalnız manuel testlerde yararlıdır",
          "Bazı durumlarda aynı testi tekrarlamak yararlıdır, örneğin otomatik regresyon"
        ],
        "obj": "h3"
      },
      {
        "id": "c477ecf7",
        "q": "Risk tabanlı test planında kusur kümelerinin yeri nedir?",
        "options": [
          "Kümeler dikkate alınmaz",
          "Küme yalnız geçmiş projelere aittir",
          "Öngörülen ve gözlenen kusur kümeleri riskin önemli bir girdisidir",
          "Küme yalnız performans testinde kullanılır"
        ],
        "obj": "h4"
      },
      {
        "id": "e718e97f",
        "q": "Kusursuzluk yanılgısı ilkesinin vardığı sonuç hangisidir?",
        "options": [
          "Planlama ve raporlama",
          "Birim ve entegrasyon",
          "Statik ve dinamik analiz",
          "Doğrulamanın yanında geçerleme de gerekir"
        ],
        "obj": "h4"
      }
    ],
    "interview": [
      {
        "q": "Pestisit paradoksu nedir?",
        "a": "Aynı testleri tekrar tekrar koşturdukça yeni kusurları bulma etkilerinin azalmasıdır. CTFL 4.0.1'de 'testler eskir' ilkesi olarak geçer. Çözüm test ve verisini yenilemek, yeni testler yazmaktır."
      },
      {
        "q": "Neden kapsamlı test mümkün değildir?",
        "a": "Girdi ve koşul birleşimleri neredeyse sonsuzdur. Bu yüzden test teknikleri, önceliklendirme ve risk tabanlı test kullanılır."
      }
    ],
    "vocab": [
      {
        "term": "defect clustering",
        "tr": "kusur kümelenmesi",
        "ex": "Defect clustering helps focus the testing."
      },
      {
        "term": "exhaustive testing",
        "tr": "kapsamlı test",
        "ex": "Exhaustive testing is impossible in practice."
      },
      {
        "term": "test principle",
        "tr": "test ilkesi",
        "ex": "A test principle is general guidance for all testing."
      }
    ],
    "sources": [
      {
        "title": "ISTQB CTFL v4.0.1 müfredatı (PDF, istqb.org)",
        "url": "https://istqb.org/?sdm_process_download=1&download_id=3345"
      },
      {
        "title": "ISTQB Sözlüğü",
        "url": "https://glossary.istqb.org/"
      }
    ]
  };

  /* 26 ───────────────────────────── İnceleme süreci ve rolleri: yönetici, yazar, moderatör, kâtip, gözden geçiren */
  L[26] = {
    "hook": "Bir inceleme toplantısında herkes konuşuyor ama kararlar kayboluyor. Rollerin net olması, incelemenin kanıtlı sonuç üretmesinin ilk koşuludur.",
    "homework": "Beş kişilik hayali bir ekip için bir gereksinim belgesi incelemesi planla. Her kişiye bir rol ver (yönetici, yazar, moderatör, kâtip, gözden geçiren), her rolün tek cümlelik görevini yaz. Sonra incelemeyi süreç adımlarına böl ve her adımın çıktısını yaz.",
    "warmup": {
      "recap": [
        {
          "point": "Statik test kodu çalıştırmadan belge ve kodu inceler."
        },
        {
          "point": "Erken bulunan kusur daha ucuz düzeltilir."
        }
      ],
      "concepts": [
        {
          "term": "Kâtip (scribe/recorder)",
          "tr": "Toplantı kayıt tutucusu",
          "summary": "Gözden geçirenlerden gelen anomalileri toplar; kararları ve yeni anomalileri kaydeder.",
          "example": "Toplantıda 'madde 4 kusur sayıldı, sahibi Ayşe' notunu yazmak"
        },
        {
          "term": "Moderatör (facilitator)",
          "tr": "Toplantıyı yöneten",
          "summary": "Toplantının etkin ilerlemesini, zaman yönetimini, arabuluculuğu ve herkesin rahat konuşabildiği güvenli ortamı sağlar.",
          "example": "Süreyi aşan tartışmayı kesip sıradaki maddeye geçmek"
        },
        {
          "term": "İnceleme lideri (review leader)",
          "tr": "İncelemenin sahibi",
          "summary": "İncelemenin genel sorumluluğunu alır; kimlerin katılacağına, ne zaman ve nerede yapılacağına karar verir.",
          "example": "Katılımcıları seçmek ve toplantıyı planlamak"
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
        "text": "Bir ekip gereksinim incelemesine altı kişi aldı, kimse notu tutmadı, yazar savunmaya geçti, bulunan sekiz anomali ertesi gün unutuldu. Toplantı vardı ama inceleme sonucu yoktu: roller ve süreç eksikti."
      },
      {
        "t": "h",
        "text": "Beş süreç adımı"
      },
      {
        "t": "p",
        "text": "ISO/IEC 20246 genel inceleme sürecini tanımlar. Resmî incelemede adımların çoğu gerekir, gayriresmî incelemede azı yeter."
      },
      {
        "t": "steps",
        "h": "Beş süreç adımı",
        "items": [
          "Planlama: kapsam (amaç, incelenecek ürün, kalite özellikleri, odak alanları, çıkış ölçütleri, çaba ve takvim) belirlenir.",
          "İnceleme başlatma: herkesin ürüne erişimi, rolünü anlaması ve gerekli bilgiyi alması sağlanır.",
          "Bireysel inceleme: her gözden geçiren kontrol listesi ya da senaryo gibi bir teknikle anomalileri, önerileri ve soruları kaydeder.",
          "İletişim ve analiz: anomaliler tartışılır; her biri için durum, sahip ve eylem kararı verilir, ürünün kalite düzeyi belirlenir.",
          "Düzeltme ve raporlama: her kusur için rapor açılır; çıkış ölçütü sağlanınca ürün kabul edilir ve sonuç raporlanır."
        ]
      },
      {
        "t": "h",
        "text": "Roller"
      },
      {
        "t": "steps",
        "h": "Roller",
        "items": [
          "Yönetici: neyin inceleneceğine karar verir, kişi ve zaman gibi kaynakları sağlar.",
          "Yazar: incelenen ürünü üretir ve düzeltir.",
          "Moderatör (kolaylaştırıcı): toplantıyı yönetir, zamanı ve güvenli ortamı korur.",
          "Kâtip (kaydedici): anomalileri toplar, kararları ve yeni anomalileri kaydeder.",
          "Gözden geçiren: projeden biri, konu uzmanı ya da başka paydaş olabilir.",
          "İnceleme lideri: genel sorumluluğu alır, katılımcıları ve yeri/zamanı belirler."
        ]
      },
      {
        "t": "box",
        "h": "Dikkat",
        "text": "Katılımcıları değerlendirmek incelemenin amacı olamaz; amaç ürünü iyileştirmektir. Kişiler birden fazla rol alabilir ama inspection'da yazar inceleme lideri ya da kâtip olamaz. Moderatör ile inceleme liderini karıştırma: biri toplantıyı, öbürü incelemenin tamamını yönetir."
      }
    ],
    "objectives": [
      {
        "id": "h1",
        "text": "İnceleme sürecinin beş adımını sırasıyla söyleyebilirsin."
      },
      {
        "id": "h2",
        "text": "Bir rolün görevini (özellikle kâtibin) doğru söyleyebilirsin."
      },
      {
        "id": "h3",
        "text": "Bir durumda hangi rolün eksik olduğunu bulabilirsin."
      },
      {
        "id": "h4",
        "text": "İncelemenin başarı etkenlerinden üçünü sayabilirsin."
      }
    ],
    "summary": [
      "Süreç: planlama, başlatma, bireysel inceleme, iletişim ve analiz, düzeltme ve raporlama.",
      "Roller: yönetici, yazar, moderatör, kâtip, gözden geçiren, inceleme lideri.",
      "Kâtip anomalileri, kararları ve yeni bulguları kaydeder.",
      "Başarı: net amaç, küçük parçalar, yeterli hazırlık süresi, yönetim desteği, kişi değerlendirmemek."
    ],
    "prereq": [
      5
    ],
    "minutes": 20,
    "sonDogrulama": "2026-10-26",
    "surum": "2026-10-v1",
    "quiz": [
      {
        "id": "a413ec9d",
        "q": "ISO/IEC 20246 tabanlı genel inceleme sürecinin doğru sırası hangisidir?",
        "options": [
          "Planlama, başlatma, bireysel inceleme, iletişim ve analiz, düzeltme ve raporlama",
          "Bireysel inceleme, planlama, başlatma, raporlama, analiz",
          "Planlama, raporlama, bireysel inceleme, başlatma, analiz",
          "Başlatma, planlama, analiz, bireysel inceleme, raporlama"
        ],
        "obj": "h1"
      },
      {
        "id": "5d63497b",
        "q": "Bireysel inceleme adımında gözden geçiren ne yapar?",
        "options": [
          "Toplantıyı yönetir",
          "Bir teknik (örneğin kontrol listesi) uygulayarak anomalileri, önerileri ve soruları kaydeder",
          "Ürünü düzeltir",
          "İnceleme çıkış ölçütünü belirler"
        ],
        "obj": "h1"
      },
      {
        "id": "85f95161",
        "q": "'İletişim ve analiz' adımında her anomali için ne kararlaştırılır?",
        "options": [
          "Yalnız yazarın adı",
          "Durumu, sahibi ve gerekli eylem",
          "Yalnız ürünün kalitesi",
          "Yalnız inceleme tarihi"
        ],
        "obj": "h1"
      },
      {
        "id": "debb91f6",
        "q": "İnceleme toplantısında gözden geçirenlerin bulgularını toplayıp kararları ve yeni anomalileri kaydeden role ne denir?",
        "options": [
          "Moderatör",
          "Yazar",
          "İnceleme lideri",
          "Kâtip (scribe)"
        ],
        "obj": "h2"
      },
      {
        "id": "c5bbf81e",
        "q": "Süreyi yöneten, tartışmada arabuluculuk yapan ve herkesin rahat konuşabildiği ortamı sağlayan rol hangisidir?",
        "options": [
          "Kâtip",
          "Gözden geçiren",
          "Moderatör (kolaylaştırıcı)",
          "Yönetici"
        ],
        "obj": "h2"
      },
      {
        "id": "b6324c4f",
        "q": "İncelemenin genel sorumluluğunu alıp kimlerin katılacağına ve toplantının nerede ve ne zaman yapılacağına karar veren rol hangisidir?",
        "options": [
          "Kâtip",
          "Yazar",
          "Moderatör",
          "İnceleme lideri"
        ],
        "obj": "h2"
      },
      {
        "id": "620129c3",
        "q": "Bir ekip inceleme yaptı: herkes konuştu, kimse karar yazmadı. Bir hafta sonra bulguların çoğu unutuldu. Hangi rol eksikti?",
        "options": [
          "Kâtip (kayıt tutan)",
          "Gözden geçiren",
          "Yazar",
          "Yönetici"
        ],
        "obj": "h3"
      },
      {
        "id": "9916b68d",
        "q": "Toplantı her seferinde konudan sapıp iki saat sürüyor. En olası eksik hangisi?",
        "options": [
          "Süreyi ve akışı yöneten bir moderatör",
          "Daha çok yazar",
          "Daha çok kâtip",
          "Daha çok yönetici"
        ],
        "obj": "h3"
      },
      {
        "id": "2825e0f3",
        "q": "Aşağıdakilerden hangisi incelemenin başarı etkenlerinden değildir?",
        "options": [
          "Net amaçlar ve ölçülebilir çıkış ölçütleri",
          "İncelemeyi küçük parçalar halinde yapmak",
          "Katılımcılara hazırlık için yeterli süre vermek",
          "Katılımcıların performansını değerlendirmeyi inceleme amacı yapmak"
        ],
        "obj": "h4"
      },
      {
        "id": "55ef78b8",
        "q": "Bir inceleme sırasında bulunan anomaliler için hangisi doğrudur?",
        "options": [
          "Her anomali otomatik kusurdur",
          "Her anomali kusur olmayabilir; analiz edilip durumu belirlenir",
          "Anomaliler kaydedilmez",
          "Anomali sayısı ürünün kalitesini tek başına belirler"
        ],
        "obj": "h4"
      }
    ],
    "interview": [
      {
        "q": "İnceleme toplantısında kâtibin görevi nedir?",
        "a": "Gözden geçirenlerden gelen anomalileri toplar ve toplantıdaki kararları ve yeni bulunan anomalileri kaydeder. Moderatör toplantıyı yönetir, kâtip kaydı tutar."
      },
      {
        "q": "Anomali ile kusur aynı mıdır?",
        "a": "Hayır. İncelemede bulunan her anomali kusur olmayabilir; iletişim ve analiz adımında durumuna karar verilir, kusur olanlar için rapor açılır."
      }
    ],
    "vocab": [
      {
        "term": "scribe",
        "tr": "kâtip",
        "ex": "The scribe records decisions during the review meeting."
      },
      {
        "term": "moderator",
        "tr": "moderatör",
        "ex": "The moderator keeps the meeting on track."
      },
      {
        "term": "anomaly",
        "tr": "anomali",
        "ex": "Not every anomaly is a defect."
      }
    ],
    "sources": [
      {
        "title": "ISTQB CTFL v4.0.1 müfredatı (PDF, istqb.org)",
        "url": "https://istqb.org/?sdm_process_download=1&download_id=3345"
      },
      {
        "title": "ISTQB Sözlüğü",
        "url": "https://glossary.istqb.org/"
      }
    ]
  };

  /* 27 ───────────────────────────── İnceleme türleri: gayriresmî, walkthrough, teknik inceleme, inspection */
  L[27] = {
    "hook": "Aynı belge için çay masasında iki dakikalık bakış da yapılabilir, tutanaklı resmî inceleme de. Doğru türü seçmek amaca, riske ve kaynağa bağlıdır.",
    "homework": "Aynı gereksinim belgesi için önce gayriresmî, sonra inspection planı yaz. Her plan için amacı, rolleri, çıktıyı ve tahmini süreyi tek satırda belirt. Hangisini hangi koşulda seçeceğini iki cümleyle açıkla.",
    "warmup": {
      "recap": [
        {
          "point": "İnceleme sürecinin beş adımı vardır."
        },
        {
          "point": "Rolleri kâtip, moderatör, yazar, gözden geçiren ve inceleme lideri gibi ayrılır."
        }
      ],
      "concepts": [
        {
          "term": "Gayriresmî inceleme",
          "tr": "Süreçsiz bakış",
          "summary": "Tanımlı süreci ve zorunlu çıktısı yoktur; temel amaç anomali bulmaktır.",
          "example": "Meslektaşa belgeyi gösterip fikir sormak"
        },
        {
          "term": "Walkthrough",
          "tr": "Yazarın yönettiği geçiş",
          "summary": "Yazar yönetir; amaçları arasında kaliteyi değerlendirmek, güven kazanmak, gözden geçirenleri eğitmek, fikir birliği sağlamak ve fikir üretmek vardır. Bireysel inceleme zorunlu değildir.",
          "example": "Yazarın tasarımı ekibe adım adım anlatması"
        },
        {
          "term": "Teknik inceleme",
          "tr": "Uzmanların karar toplantısı",
          "summary": "Teknik yeterliliği olan gözden geçirenler ve bir moderatör yönetir; teknik bir konuda fikir birliği ve karar amaçlanır.",
          "example": "Mimari seçeneğin uzmanlarca tartışılması"
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
        "text": "Bir ekip yeni ödeme servisinin tasarımını, olası kusurları tek tek yakalayacak biçimde, önce meslektaşıyla gayriresmî gözden geçirdi; sonra riskli bölümü resmî bir inspection'a aldı. Aynı ürün farklı zamanlarda farklı türlerle incelenebilir."
      },
      {
        "t": "h",
        "text": "Dört yaygın tür"
      },
      {
        "t": "p",
        "text": "CTFL 4.0.1 dört yaygın türü sayar. Biçimsellik arttıkça süreç, rol ve kayıt artar."
      },
      {
        "t": "steps",
        "h": "Dört yaygın tür",
        "items": [
          "Gayriresmî inceleme: tanımlı süreç ve belgelenmiş çıktı gerekmez; ana amaç anomali bulmaktır.",
          "Walkthrough: yazar yönetir; kaliteyi değerlendirme, güven kazanma, eğitme, fikir birliği, yeni fikir üretme ve anomali bulma gibi amaçlar olabilir. Gözden geçirenler önceden bireysel inceleme yapabilir ama zorunlu değildir.",
          "Teknik inceleme: teknik açıdan yeterli gözden geçirenler katılır, moderatör yönetir; teknik konuda fikir birliği ve karar amaçlanır, anomali bulma da hedeftir.",
          "Inspection: en biçimsel türdür, genel süreç tam izlenir; amaç en fazla anomaliyi bulmaktır. Metrikler toplanır ve yazılım yaşam döngüsünü ve inspection sürecini iyileştirmede kullanılır."
        ]
      },
      {
        "t": "h",
        "text": "Hangisini seçmeli?"
      },
      {
        "t": "steps",
        "h": "Hangisini seçmeli?",
        "items": [
          "Seçim; yaşam döngüsü, süreç olgunluğu, ürünün kritikliği ve karmaşıklığı, yasal gereklilikler ve denetim izi ihtiyacına bağlıdır.",
          "Aynı ürün farklı türlerle art arda incelenebilir: önce gayriresmî, sonra daha resmî.",
          "Amaç eğitim ve fikir birliği ise walkthrough, teknik karar ise teknik inceleme, azami kusur bulmak ise inspection daha uygundur."
        ]
      },
      {
        "t": "box",
        "h": "Dikkat",
        "text": "Walkthrough'u yazarın tek yönlü sunumu sanma: gözden geçirenlerin katkısı amaçtır. Inspection'da yazar inceleme lideri ya da kâtip olamaz. Sınavda 'en resmî' dendiğinde inspection, 'yazar yönetir' dendiğinde walkthrough akla gelmelidir."
      }
    ],
    "objectives": [
      {
        "id": "h1",
        "text": "Dört inceleme türünün tanımını söyleyebilirsin."
      },
      {
        "id": "h2",
        "text": "Bir senaryoda hangi türün kullanıldığını bulabilirsin."
      },
      {
        "id": "h3",
        "text": "Walkthrough ile inspection arasındaki farkı açıklayabilirsin."
      },
      {
        "id": "h4",
        "text": "Bir amaç için uygun inceleme türünü seçebilirsin."
      }
    ],
    "summary": [
      "Dört yaygın tür: gayriresmî, walkthrough, teknik inceleme, inspection.",
      "Walkthrough'u yazar yönetir; inspection en resmî türdür ve ölçüm toplar.",
      "Teknik inceleme moderatörle ve teknik yeterli kişilerle karar/fikir birliği arar.",
      "Tür seçimi amaca, riske, olgunluğa ve denetim ihtiyacına bağlıdır."
    ],
    "prereq": [
      5
    ],
    "minutes": 20,
    "sonDogrulama": "2026-10-26",
    "surum": "2026-10-v1",
    "quiz": [
      {
        "id": "b90b17bb",
        "q": "Tanımlı bir süreci ve zorunlu belgelenmiş çıktısı olmayan, temel amacı anomali bulmak olan inceleme türü hangisidir?",
        "options": [
          "Gayriresmî inceleme",
          "Inspection",
          "Teknik inceleme",
          "Walkthrough"
        ],
        "obj": "h1"
      },
      {
        "id": "55d912ac",
        "q": "Hangi inceleme türünü yazar yönetir?",
        "options": [
          "Inspection",
          "Teknik inceleme",
          "Gayriresmî inceleme",
          "Walkthrough"
        ],
        "obj": "h1"
      },
      {
        "id": "b7431962",
        "q": "Hangi inceleme türünde yazar inceleme lideri ya da kâtip olamaz?",
        "options": [
          "Gayriresmî inceleme",
          "Walkthrough",
          "Inspection",
          "Teknik inceleme"
        ],
        "obj": "h1"
      },
      {
        "id": "2c8d05bc",
        "q": "Bir ekip yeni kişileri eğitmek ve tasarım üzerinde fikir birliği sağlamak için, tasarımı yazarın anlatımıyla adım adım gözden geçiriyor. Bu hangi türdür?",
        "options": [
          "Inspection",
          "Teknik inceleme",
          "Walkthrough",
          "Gayriresmî inceleme"
        ],
        "obj": "h2"
      },
      {
        "id": "be14ea42",
        "q": "Teknik açıdan yeterli gözden geçirenlerin, bir moderatör yönetiminde, iki mimari seçenek üzerinde karar verdiği inceleme hangisidir?",
        "options": [
          "Walkthrough",
          "Gayriresmî inceleme",
          "Teknik inceleme",
          "Inspection"
        ],
        "obj": "h2"
      },
      {
        "id": "dc2f50ca",
        "q": "Metrik toplanan ve bu metriklerin yaşam döngüsünü iyileştirmede kullanıldığı, genel süreci tam izleyen tür hangisidir?",
        "options": [
          "Walkthrough",
          "Gayriresmî inceleme",
          "Inspection",
          "Teknik inceleme"
        ],
        "obj": "h2"
      },
      {
        "id": "d7e04f49",
        "q": "Walkthrough ile inspection arasında hangisi doğrudur?",
        "options": [
          "Walkthrough daha biçimseldir",
          "Her ikisi de yazarsız yapılır",
          "İkisinin amacı aynıdır",
          "Inspection daha biçimseldir ve temel amacı en çok anomaliyi bulmaktır"
        ],
        "obj": "h3"
      },
      {
        "id": "032fd58b",
        "q": "Aşağıdakilerden hangisi walkthrough için doğrudur?",
        "options": [
          "Gözden geçirenler öncesinde bireysel inceleme yapabilir ama bu zorunlu değildir",
          "Bireysel inceleme zorunludur",
          "Yazar katılamaz",
          "Yalnız kod için yapılır"
        ],
        "obj": "h3"
      },
      {
        "id": "7b485fc4",
        "q": "Kritik, yasal denetime tabi bir gereksinim kümesi için denetim izi ve ölçüm de isteniyor. En uygun tür hangisi?",
        "options": [
          "Inspection",
          "Gayriresmî inceleme",
          "Walkthrough",
          "Hızlı koridor sohbeti"
        ],
        "obj": "h4"
      },
      {
        "id": "897d79c8",
        "q": "İnceleme türü seçimini aşağıdakilerden hangisi etkilemez?",
        "options": [
          "Ürünün kritikliği",
          "Gözden geçirenlerin boş zamanlarında hangi rengi sevdiği",
          "Yasal gereklilikler",
          "Süreç olgunluğu"
        ],
        "obj": "h4"
      }
    ],
    "interview": [
      {
        "q": "Walkthrough ile inspection arasındaki fark nedir?",
        "a": "Walkthrough'u yazar yönetir, bireysel inceleme zorunlu değildir ve amaçları geniştir. Inspection en resmî türdür, genel süreci tam izler, temel amacı en çok anomaliyi bulmaktır, metrik toplar ve yazar lider ya da kâtip olamaz."
      },
      {
        "q": "Hangi durumda gayriresmî inceleme yeterlidir?",
        "a": "Düşük riskli, hızlı geri bildirim istenen işlerde; tanımlı süreç ve belgelenmiş çıktı gerekmez. Kritik ya da denetime tabi ürünlerde daha resmî bir tür seçerim."
      }
    ],
    "vocab": [
      {
        "term": "walkthrough",
        "tr": "yazar yönetimli geçiş",
        "ex": "The author leads the walkthrough."
      },
      {
        "term": "inspection",
        "tr": "en resmî inceleme",
        "ex": "An inspection follows the full review process."
      },
      {
        "term": "technical review",
        "tr": "teknik inceleme",
        "ex": "A technical review aims at technical decisions."
      }
    ],
    "sources": [
      {
        "title": "ISTQB CTFL v4.0.1 müfredatı (PDF, istqb.org)",
        "url": "https://istqb.org/?sdm_process_download=1&download_id=3345"
      },
      {
        "title": "ISTQB Sözlüğü",
        "url": "https://glossary.istqb.org/"
      }
    ]
  };

  /* 28 ───────────────────────────── Test eforu tahmini: oran, ekstrapolasyon, Wideband Delphi, üç nokta */
  L[28] = {
    "hook": "Yönetici 'test ne kadar sürer?' diye soruyor. Tek sayı söylemek kolay, ama yöntemle ve belirsizlik payıyla söylemek güven verir.",
    "homework": "Geçen projede geliştirme 24 gün, test 12 gün sürmüş olsun. Yeni projede geliştirmeyi 30 gün tahmin ederek oran yöntemiyle test eforunu hesapla. Sonra aynı iş için en iyi, en olası ve en kötü üç süre uydur ve üç nokta formülüyle hem tahmini hem standart sapmayı bul.",
    "warmup": {
      "recap": [
        {
          "point": "Test planı efor, süre ve kaynak içerir."
        },
        {
          "point": "Küçük işlerin tahmini büyük işlere göre daha doğrudur."
        }
      ],
      "concepts": [
        {
          "term": "Orana dayalı tahmin",
          "tr": "Geçmiş orandan hesap",
          "summary": "Önceki projelerden çıkarılan standart oranlar (örneğin geliştirme:test) yeni projeye uygulanır.",
          "example": "Önceki projede 3:2 ise 600 kişi-gün geliştirmeye 400 kişi-gün test"
        },
        {
          "term": "Ekstrapolasyon",
          "tr": "Ölçümden öteye uzatma",
          "summary": "Mevcut projeden erken ölçülen verilerle kalan işin eforu matematiksel modelle öngörülür; yinelemeli yaşam döngüsünde uygundur.",
          "example": "Son üç iterasyonun ortalaması"
        },
        {
          "term": "Wideband Delphi",
          "tr": "Uzmanların gizli tur tahmini",
          "summary": "Her uzman bağımsız tahmin eder; kabul edilen sınırların dışında kalanlar tartışır; yeniden gizli tahmin yapılır; fikir birliğine kadar tekrarlanır. Planning Poker bunun çevik bir türüdür.",
          "example": "Kartlarla yapılan efor oylaması"
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
        "text": "Ürün sahibi sürümün ne zaman biteceğini soruyor. 'Dört hafta' demek yerine 'üç noktadan hesapladım, en olası 4 hafta, sapma 1 hafta' demek, belirsizliği görünür kılar ve planı gerçekçi yapar."
      },
      {
        "t": "h",
        "text": "Metrik ve uzman tabanlı teknikler"
      },
      {
        "t": "p",
        "text": "Müfredat dört tahmin tekniği anlatır: iki metrik tabanlı (oran, ekstrapolasyon) ve iki uzman tabanlı (Wideband Delphi, üç nokta)."
      },
      {
        "t": "steps",
        "h": "Metrik ve uzman tabanlı teknikler",
        "items": [
          "Orana dayalı: kurumun kendi geçmiş oranları en iyi kaynaktır. Örnek: önceki projede geliştirme:test oranı 3:2, yeni projede geliştirme 600 kişi-gün ise test 400 kişi-gün.",
          "Ekstrapolasyon: erken ölçüm ve matematiksel model; çevik/yinelemeli süreçte son birkaç iterasyonun ortalaması gibi.",
          "Wideband Delphi: her uzman izole tahmin eder, aykırı olanlar tartışır, yeniden tahmin yapılır, uzlaşıya kadar sürer. Planning Poker'da tahminler sayı kartlarıyla yapılır.",
          "Üç nokta: E = (a + 4m + b) / 6 ve SD = (b - a) / 6; sonuç E ± SD aralığıyla verilir."
        ]
      },
      {
        "t": "h",
        "text": "Hesap örnekleri"
      },
      {
        "t": "steps",
        "h": "Hesap örnekleri",
        "items": [
          "Oran: önceki oran 5:2, yeni geliştirme 100 kişi-gün ise test = 100 x 2 / 5 = 40 kişi-gün.",
          "Ekstrapolasyon: son üç iterasyonun test eforu 24, 30 ve 27 ise sonraki için ortalama (24 + 30 + 27) / 3 = 27.",
          "Üç nokta: a=4, m=7, b=16 için E = (4 + 4x7 + 16) / 6 = 48 / 6 = 8; SD = (16 - 4) / 6 = 2; aralık 6 ile 10.",
          "Büyük işi küçük parçalara bölüp ayrı ayrı tahmin et; küçük işlerin tahmini daha doğrudur."
        ]
      },
      {
        "t": "box",
        "h": "Dikkat",
        "text": "Tahmin her zaman varsayımlara dayanır ve hata payı taşır; paydaşlara bunu açıkça söyle. Üç nokta formülünde ortadaki en olası değer 4 ile çarpılır, 6'ya bölünür; standart sapmada ise (b - a) / 6 kullanılır. İkisini karıştırma."
      }
    ],
    "objectives": [
      {
        "id": "h1",
        "text": "Dört tahmin tekniğini söyleyip metrik ve uzman tabanlı olarak ayırabilirsin."
      },
      {
        "id": "h2",
        "text": "Oran ve ekstrapolasyonla test eforunu hesaplayabilirsin."
      },
      {
        "id": "h3",
        "text": "Üç nokta tahmininde E ve SD değerlerini hesaplayabilirsin."
      },
      {
        "id": "h4",
        "text": "Wideband Delphi ile Planning Poker ilişkisini ve tahminin doğası hakkında doğru ifadeyi söyleyebilirsin."
      }
    ],
    "summary": [
      "Dört teknik: orana dayalı, ekstrapolasyon, Wideband Delphi, üç nokta.",
      "Oran ve ekstrapolasyon metrik tabanlı; Wideband Delphi ile üç nokta uzman deneyimine dayanır; metrik tabanlı olanlar oran ve ekstrapolasyondur.",
      "E = (a + 4m + b) / 6 ve SD = (b - a) / 6.",
      "Planning Poker, Wideband Delphi'nin çevik bir türüdür; tahmin her zaman hata payı taşır."
    ],
    "prereq": [
      13
    ],
    "minutes": 25,
    "sonDogrulama": "2026-10-26",
    "surum": "2026-10-v1",
    "quiz": [
      {
        "id": "557198ff",
        "q": "Hangi tahmin tekniği her uzmanın izole tahmin etmesine, sapmalar için tartışmaya ve uzlaşıya kadar yeni tur yapılmasına dayanır?",
        "options": [
          "Wideband Delphi",
          "Orana dayalı tahmin",
          "Ekstrapolasyon",
          "Üç nokta tahmini"
        ],
        "obj": "h1"
      },
      {
        "id": "1724079d",
        "q": "Planning Poker için hangisi doğrudur?",
        "options": [
          "Orana dayalı bir tekniktir",
          "Wideband Delphi'nin çevik yazılımda sık kullanılan bir türüdür",
          "Yalnız performans testi tahmininde kullanılır",
          "Tahmini tek kişi yapar"
        ],
        "obj": "h4"
      },
      {
        "id": "80fe5062",
        "q": "Aşağıdakilerden hangisi metrik tabanlı tahmin tekniklerinin ikisini doğru verir?",
        "options": [
          "Wideband Delphi ve üç nokta",
          "Orana dayalı tahmin ve ekstrapolasyon",
          "Üç nokta ve ekstrapolasyon",
          "Planning Poker ve orana dayalı tahmin"
        ],
        "obj": "h1"
      },
      {
        "id": "cae4cfdd",
        "q": "Önceki projede geliştirme:test eforu oranı 3:2 idi. Yeni projede geliştirme 450 kişi-gün ise orana dayalı test eforu kaç kişi-gündür?",
        "options": [
          "675",
          "300",
          "225",
          "450"
        ],
        "obj": "h2"
      },
      {
        "id": "06b74696",
        "q": "Önceki projede geliştirme:test oranı 5:2 idi. Yeni projede geliştirme 100 kişi-gün ise test eforu kaç kişi-gündür?",
        "options": [
          "250",
          "40",
          "20",
          "70"
        ],
        "obj": "h2"
      },
      {
        "id": "86ab97ce",
        "q": "Son üç iterasyonun test eforu 24, 30 ve 27 kişi-saat. Sonraki iterasyon için son üçün ortalamasıyla ekstrapolasyon kaç verir?",
        "options": [
          "27",
          "30",
          "24",
          "81"
        ],
        "obj": "h2"
      },
      {
        "id": "151b649a",
        "q": "Üç nokta tahmininde a=4, m=7, b=16 (kişi-gün). E=(a+4m+b)/6 kaçtır?",
        "options": [
          "9",
          "7",
          "8",
          "27"
        ],
        "obj": "h3"
      },
      {
        "id": "36de255c",
        "q": "a=5, m=8, b=17 için E ve SD = (b - a) / 6 kullanılarak verilen aralık hangisidir?",
        "options": [
          "6 ile 10 arası",
          "8 ile 12 arası",
          "7 ile 11 arası (E=9, SD=2)",
          "5 ile 17 arası"
        ],
        "obj": "h3"
      },
      {
        "id": "0c008a83",
        "q": "Tahmin hakkında müfredata uygun ifade hangisidir?",
        "options": [
          "Tahmin varsayımlara dayanır, her zaman hata payı taşır; küçük işlerin tahmini genelde daha doğrudur",
          "Tahmin kesin bir taahhüttür",
          "Büyük işi parçalamak tahmini bozar",
          "Tahmin yalnız tek bir teknikle yapılabilir"
        ],
        "obj": "h4"
      }
    ],
    "interview": [
      {
        "q": "Wideband Delphi nasıl çalışır?",
        "a": "Uzmanlar izole biçimde tahmin eder, sonuçlar toplanır, aykırı olanlar tartışır ve herkes yeniden tahmin eder. Uzlaşıya kadar tekrarlanır. Planning Poker bunun çevik bir türüdür."
      },
      {
        "q": "Üç nokta formülünü açıkla.",
        "a": "E = (a + 4m + b) / 6 ağırlıklı ortalamadır, SD = (b - a) / 6 ise ölçüm hatasıdır. Sonucu E ± SD aralığı olarak veririm."
      }
    ],
    "vocab": [
      {
        "term": "estimation",
        "tr": "tahmin",
        "ex": "Every estimation has an error margin."
      },
      {
        "term": "three-point estimation",
        "tr": "üç nokta tahmini",
        "ex": "Three-point estimation gives a value and an error."
      },
      {
        "term": "Planning Poker",
        "tr": "planlama pokeri",
        "ex": "Planning Poker is a variant of Wideband Delphi."
      }
    ],
    "sources": [
      {
        "title": "ISTQB CTFL v4.0.1 müfredatı (PDF, istqb.org)",
        "url": "https://istqb.org/?sdm_process_download=1&download_id=3345"
      },
      {
        "title": "ISTQB Sözlüğü",
        "url": "https://glossary.istqb.org/"
      }
    ]
  };

  /* 29 ───────────────────────────── Giriş ve çıkış ölçütleri, Definition of Ready ve Definition of Done */
  L[29] = {
    "hook": "Henüz kabul ölçütü bile yazılmamış bir hikâye sprinte girer ve kimse ne zaman bittiğini bilmez. Hazır olma ve bitmiş olma ölçütleri bu karışıklığı önler.",
    "homework": "Bir kullanıcı hikâyesi seç. Önce sprinte almak için en az dört maddelik bir Definition of Ready yaz. Sonra hikâyenin bitmiş sayılması için en az dört ölçülebilir maddelik bir Definition of Done yaz. 'Kodlama bitti' gibi ölçülemeyen bir maddeyi sayıyla düzelt.",
    "warmup": {
      "recap": [
        {
          "point": "Kabul ölçütleri hikâyenin ne zaman karşılandığını söyler."
        },
        {
          "point": "Test planı giriş ve çıkış ölçütlerini içerir."
        }
      ],
      "concepts": [
        {
          "term": "Giriş ölçütü (entry criteria)",
          "tr": "Faaliyete başlama ön koşulu",
          "summary": "Bir faaliyet için gereken ön koşullardır; karşılanmazsa iş zorlaşır, uzar, pahalılaşır, risk artar.",
          "example": "Test verisi hazır, duman testleri geçti"
        },
        {
          "term": "Çıkış ölçütü (exit criteria)",
          "tr": "Faaliyeti bitirme koşulu",
          "summary": "Bir faaliyetin tamamlandığını ilan etmek için ulaşılması gerekenlerdir; kapsama oranı, açık kusur sayısı gibi.",
          "example": "Kapsam %90, kritik açık kusur yok"
        },
        {
          "term": "Definition of Ready",
          "tr": "Hikâye için giriş ölçütü",
          "summary": "Çevik yaşam döngüsünde bir kullanıcı hikâyesinin geliştirme ve/veya test faaliyetlerine başlayabilmesi için sağlaması gereken giriş ölçütleridir.",
          "example": "Hikâyede test edilebilir kabul ölçütü var"
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
        "text": "Bir sprintin üçüncü gününde hikâyenin kabul ölçütünün yazılmadığı, test verisinin olmadığı anlaşıldı. Giriş ölçütü (Ready) olsaydı hikâye sprinte girmeden eksikler görülecekti. Sprint sonunda ise 'bitti' kelimesi herkes için başka bir şey ifade ediyordu; Done ortak tanımı yoktu."
      },
      {
        "t": "h",
        "text": "Giriş ve çıkış ölçütleri"
      },
      {
        "t": "p",
        "text": "Giriş ve çıkış ölçütleri her test seviyesi için tanımlanır ve test hedeflerine göre değişir."
      },
      {
        "t": "steps",
        "h": "Giriş ve çıkış ölçütleri",
        "items": [
          "Tipik giriş ölçütleri: kaynakların hazır olması (kişi, araç, ortam, test verisi, bütçe, zaman), testware'in hazır olması (test esası, test edilebilir gereksinim, hikâye, test durumu) ve test nesnesinin ilk kalite düzeyi (örneğin tüm duman testleri geçti).",
          "Tipik çıkış ölçütleri: kapsamlılık ölçüleri (kapsam düzeyi, çözülmemiş kusur sayısı, kusur yoğunluğu, kalan test durumu) ve evet/hayır ölçütleri (planlanan testler koşuldu, bulunan kusurlar raporlandı, regresyon testleri otomatik).",
          "Süre ya da bütçenin bitmesi de geçerli bir çıkış ölçütü olabilir; yeter ki paydaşlar riski görüp kabul etsin."
        ]
      },
      {
        "t": "h",
        "text": "Çevik bağlam: Ready ve Done"
      },
      {
        "t": "steps",
        "h": "Çevik bağlam: Ready ve Done",
        "items": [
          "Çevik yazılım geliştirmede çıkış ölçütlerine Definition of Done denir; yayınlanabilir bir öğe için ekibin nesnel ölçüleridir.",
          "Bir hikâyenin geliştirme ve/veya test faaliyetlerine başlayabilmesi için sağlaması gereken giriş ölçütlerine Definition of Ready denir.",
          "Ready, iyileştirme (backlog refinement) toplantılarında tester, ürün sahibi ve geliştiricinin birlikte kontrol ettiği bir süzgeçtir; hikâyenin test edilebilir kabul ölçütü taşıması tipik maddedir.",
          "Done maddeleri ölçülebilir olmalıdır: 'testler yazıldı' yerine 'kabul ölçütlerinin tamamı için otomatik test geçti' gibi."
        ]
      },
      {
        "t": "box",
        "h": "Dikkat",
        "text": "Ölçüt, ölçülebilir olmadıkça işe yaramaz. 'Test süresi bitince çıkarız' tek başına sorunsuz bir ölçüt değildir; paydaşlar riski görüp kabul ediyorsa geçerlidir. Ready ile Done'ı karıştırma: Ready başlamadan önceki, Done bittikten sonraki ölçüttür."
      }
    ],
    "objectives": [
      {
        "id": "h1",
        "text": "Giriş ve çıkış ölçütü tanımlarını söyleyebilirsin."
      },
      {
        "id": "h2",
        "text": "Definition of Ready ile Definition of Done'ı ayırt edebilirsin."
      },
      {
        "id": "h3",
        "text": "Bir ölçütün giriş mi çıkış mı olduğunu söyleyebilirsin."
      },
      {
        "id": "h4",
        "text": "Ölçülemeyen bir ölçütü ölçülebilir hale getirebilirsin."
      }
    ],
    "summary": [
      "Giriş ölçütü başlamak için ön koşuldur; çıkış ölçütü bitirmek için ulaşılması gerekendir.",
      "Çevik bağlamda giriş ölçütü Definition of Ready, çıkış ölçütü Definition of Done'dır.",
      "Çıkış ölçütleri kapsamlılık ölçüleri ve evet/hayır maddeleriyle ifade edilir.",
      "Süre ya da bütçenin bitmesi, risk paydaşlarca kabul edilirse geçerli çıkış sayılabilir."
    ],
    "prereq": [
      13
    ],
    "minutes": 20,
    "sonDogrulama": "2026-10-26",
    "surum": "2026-10-v1",
    "quiz": [
      {
        "id": "a2e0b3a1",
        "q": "Bir faaliyete başlamak için sağlanması gereken ön koşullara ne denir?",
        "options": [
          "Çıkış ölçütleri",
          "Giriş ölçütleri",
          "Test esası",
          "Risk kaydı"
        ],
        "obj": "h1"
      },
      {
        "id": "d0926f2c",
        "q": "Hangisi tipik bir giriş ölçütüdür?",
        "options": [
          "Kapsam oranının ulaşılması",
          "Testlerin tamamlandığı raporu",
          "Test ortamı ve test verisinin hazır olması",
          "Çözülmemiş kusurların sıfır olması"
        ],
        "obj": "h1"
      },
      {
        "id": "ccae93bb",
        "q": "Hangisi tipik bir çıkış ölçütüdür?",
        "options": [
          "Test verisinin hazır olması",
          "Test nesnesinin duman testini geçmesi",
          "Test ortamının kurulu olması",
          "Planlanan testlerin koşulması ve bulunan kusurların raporlanması"
        ],
        "obj": "h1"
      },
      {
        "id": "15c94b5d",
        "q": "Çevik ekiplerde bir kullanıcı hikâyesinin geliştirme ya da test faaliyetlerine başlayabilmesi için sağlaması gereken ölçütlere ne denir?",
        "options": [
          "Definition of Done",
          "Test planı",
          "Risk matrisi",
          "Definition of Ready"
        ],
        "obj": "h2"
      },
      {
        "id": "78ccf3d8",
        "q": "Çevik yaşam döngüsünde yayınlanabilir bir öğe için ekibin nesnel ölçütlerine ne denir?",
        "options": [
          "Definition of Ready",
          "Test esası",
          "Definition of Done",
          "Kabul ölçütü yoktur"
        ],
        "obj": "h2"
      },
      {
        "id": "e792a169",
        "q": "Aşağıdakilerden hangisi Definition of Ready'ye uygun bir maddedir?",
        "options": [
          "Tüm otomatik testler geçmiştir",
          "Hikâyede test edilebilir kabul ölçütleri yazılmıştır",
          "Kod üretime alınmıştır",
          "Sprint gözden geçirmesi yapılmıştır"
        ],
        "obj": "h2"
      },
      {
        "id": "261ff15a",
        "q": "Bir ekip 'testler yazıldı' maddesini Done'a koymuş. Bunun en büyük sorunu nedir?",
        "options": [
          "Test yazmak gereksizdir",
          "Ölçülebilir değil; testlerin geçtiği ya da kabul ölçütlerinin karşılandığı kanıtlanmıyor",
          "Done listesinde madde olmaz",
          "Yalnız yöneticiler Done yazabilir"
        ],
        "obj": "h3"
      },
      {
        "id": "be060fd8",
        "q": "Test süresi bittiği için testi sonlandırmak ne zaman kabul edilebilir bir çıkış durumu olur?",
        "options": [
          "Hiçbir zaman olmaz",
          "Paydaşlar kalan riski gözden geçirip kabul ettiğinde",
          "Yalnız test lideri istediğinde",
          "Her zaman otomatik kabul edilir"
        ],
        "obj": "h3"
      },
      {
        "id": "120335e2",
        "q": "Aşağıdaki Done maddelerinden hangisi ölçülebilir?",
        "options": [
          "Kod güzel görünüyor",
          "Ekip memnun",
          "Tüm kabul ölçütleri için otomatik test geçti ve kritik açık kusur yok",
          "Hepimiz bittiğini düşünüyoruz"
        ],
        "obj": "h4"
      },
      {
        "id": "0222e8b5",
        "q": "Ready kontrolü genellikle hangi çalışma sırasında yapılır?",
        "options": [
          "Sprint gözden geçirmesinde",
          "Üretime alma sırasında",
          "Hata raporu yazarken",
          "Backlog iyileştirme (refinement) toplantılarında hikâye üzerinde birlikte çalışırken"
        ],
        "obj": "h4"
      },
      {
        "id": "cd2a5c2d",
        "q": "Test izleme ile test kontrolü arasındaki ilişki hangisidir?",
        "options": [
          "İzleme yalnızca proje bittikten sonra yapılır",
          "İzleme bilgi toplar, kontrol yönlendirir",
          "İkisi aynı etkinliğin iki farklı adıdır",
          "Kontrol bilgi toplar, izleme düzeltici eylem verir"
        ]
      },
      {
        "id": "da294a15",
        "q": "Test stratejisi ile bir projenin test yaklaşımı arasındaki ilişki nasıldır?",
        "options": [
          "Yaklaşım, stratejinin projeye uyarlanmış hâlidir",
          "Yaklaşım kuruluş geneli, strateji tek sprint içindir",
          "Aynı kavramın eş anlamlı iki adıdır",
          "Strateji hataları düzeltir, yaklaşım raporlar"
        ]
      }
    ],
    "interview": [
      {
        "q": "Definition of Ready ile Definition of Done arasındaki fark nedir?",
        "a": "Ready, bir kullanıcı hikâyesinin geliştirme ve test faaliyetlerine başlayabilmesi için giriş ölçütleridir. Done, yayınlanabilir bir öğe için ekibin nesnel çıkış ölçütleridir."
      },
      {
        "q": "Süre bittiği için testi bitirmek geçerli bir çıkış ölçütü olabilir mi?",
        "a": "Evet, ama yalnız paydaşlar kalan riski görüp kabul ettiyse. Bunu açıkça yazar ve raporlarım."
      }
    ],
    "vocab": [
      {
        "term": "entry criteria",
        "tr": "giriş ölçütleri",
        "ex": "Entry criteria are preconditions for starting a task."
      },
      {
        "term": "definition of done",
        "tr": "bitmişlik tanımı",
        "ex": "The team agrees on a definition of done."
      },
      {
        "term": "definition of ready",
        "tr": "hazırlık tanımı",
        "ex": "A story must meet the definition of ready first."
      }
    ],
    "sources": [
      {
        "title": "ISTQB CTFL v4.0.1 müfredatı (PDF, istqb.org)",
        "url": "https://istqb.org/?sdm_process_download=1&download_id=3345"
      },
      {
        "title": "ISTQB Sözlüğü",
        "url": "https://glossary.istqb.org/"
      }
    ]
  };

  /* 30 ───────────────────────────── K3 hesap: eşdeğerlik sınıfları ve sınır değer sayımı (2 ve 3 değerli) */
  L[30] = {
    "hook": "Sınavda 'kaç test gerekir?' ya da 'hangi değerler seçilir?' soruları hesap ister. Bu derste eşdeğerlik sınıflarını ve sınır değerleri adım adım sayıp seçmeyi çalışırsın.",
    "homework": "Bir yaş alanı düşün: 18 ile 65 arası (dahil) geçerli. Önce eşdeğerlik sınıflarını yaz ve her biri için bir değer seç. Sonra 2 değerli ve 3 değerli sınır değerleri tek tek listele. En az bir kusurlu kod örneği uydur ve hangi sınır değerin onu yakaladığını göster.",
    "warmup": {
      "recap": [
        {
          "point": "Eşdeğerlik sınıfı aynı biçimde işlenmesi beklenen değerler grubudur."
        },
        {
          "point": "Sınırlar kusurların sık görüldüğü yerlerdir."
        }
      ],
      "concepts": [
        {
          "term": "Eşdeğerlik sınıfı (partition)",
          "tr": "Aynı işlenen değerler",
          "summary": "Beklenti, bir sınıfın tüm elemanlarının aynı biçimde işlenmesidir; sınıflar çakışmaz ve boş olmaz.",
          "example": "Yaş: 17 ve altı, 18-65, 66 ve üstü"
        },
        {
          "term": "Each Choice kapsamı",
          "tr": "Her seçimi bir kez",
          "summary": "Birden çok sınıf kümesinde her kümenin her sınıfı en az bir testle kapsanır; birleşimler hesaba katılmaz.",
          "example": "Yaş 3 sınıf, üyelik 2 sınıf -> en az 3 test"
        },
        {
          "term": "2 değerli SDA",
          "tr": "Sınır ve komşusu",
          "summary": "Her sınır değer için iki kapsam öğesi: sınır değer ve bitişik sınıftaki en yakın komşusu.",
          "example": "18-65 için 17, 18, 65, 66"
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
        "text": "Kampanya 'yaş 18 ile 65 arası' diyor. Geliştirici yanlışlıkla 'yaş > 18' yazdı. Ortadaki 40 değeriyle yapılan testler hep geçti; yalnız 18 yazan kullanıcı reddedildi. Sınır değer, bu sınıf hatasını yakalayan en ucuz testtir."
      },
      {
        "t": "h",
        "text": "Eşdeğerlik sınıfları (EP)"
      },
      {
        "t": "p",
        "text": "EP, verileri aynı işlenmesi beklenen sınıflara böler; bir sınıftan bir değer yeterli sayılır."
      },
      {
        "t": "steps",
        "h": "Eşdeğerlik sınıfları (EP)",
        "items": [
          "Sınıflar çakışmaz ve boş olamaz; geçerli ve geçersiz sınıflar olabilir.",
          "Kapsam öğesi sınıfın kendisidir. Kapsam = en az bir testle sınanmış sınıf sayısı / toplam sınıf sayısı (geçersizler dahil).",
          "Örnek: sipariş adedi 1-50 geçerli ise sınıflar: 0 ve altı, 1-50, 51 ve üstü; toplam 3 sınıf. Yalnız 25 değeriyle test yapılırsa kapsam 1/3, yaklaşık %33.",
          "Birden çok girdi kümesinde Each Choice kapsamı: her kümenin her sınıfı en az bir kez. Yaş için 3, üyelik için 2 sınıf varsa en az 3 test (birleşimler zorunlu değil)."
        ]
      },
      {
        "t": "h",
        "text": "Sınır değer analizi (SDA)"
      },
      {
        "t": "steps",
        "h": "Sınır değer analizi (SDA)",
        "items": [
          "SDA yalnız sıralı sınıflarda uygulanır; sınıfın en küçük ve en büyük değeri sınır değerdir.",
          "2 değerli: her sınır için sınır değer ve komşusu. 18-65 için sınırlar 17|18 ve 65|66; test değerleri 17, 18, 65, 66 (4 değer).",
          "3 değerli: her sınır için sınır değer ve iki komşu. 18-65 için 17, 18, 19 ve 64, 65, 66 (6 değer).",
          "3 değerli daha titizdir. Örnek: 'adet <= 5' yanlışlıkla 'adet == 5' yazılırsa 2 değerli (5 ve 6) kusuru kaçırır; 3 değerlinin 4 değeri yakalar."
        ]
      },
      {
        "t": "box",
        "h": "Dikkat",
        "text": "Kapsam yüzdesi hesaplarında paydaya geçersiz sınıfları da koy. 2 değerli SDA'da 18-65 için 4 değer, 3 değerlide 6 değer çıkar; sınır sayısını (2) kapsam öğesi sayısıyla karıştırma."
      }
    ],
    "objectives": [
      {
        "id": "h1",
        "text": "Eşdeğerlik sınıfı fikrini ve sınıf özelliklerini söyleyebilirsin."
      },
      {
        "id": "h2",
        "text": "Sınıf sayısı ve kapsam yüzdesini hesaplayabilirsin."
      },
      {
        "id": "h3",
        "text": "2 değerli SDA test değerlerini bulabilirsin."
      },
      {
        "id": "h4",
        "text": "3 değerli SDA test değerlerini bulup farkını açıklayabilirsin."
      }
    ],
    "summary": [
      "EP'de bir sınıftan bir değer yeterlidir; sınıflar çakışmaz ve boş olmaz.",
      "EP kapsamı = sınanan sınıf / toplam sınıf; geçersiz sınıflar dahildir.",
      "2 değerli SDA'da 18-65 için 17, 18, 65, 66 test edilir.",
      "3 değerli SDA'da 17, 18, 19, 64, 65, 66 test edilir ve daha titizdir."
    ],
    "prereq": [
      7
    ],
    "minutes": 25,
    "sonDogrulama": "2026-10-26",
    "surum": "2026-10-v1",
    "quiz": [
      {
        "id": "789ba054",
        "q": "Eşdeğerlik sınıflarının dayandığı beklenti hangisidir?",
        "options": [
          "Her değerin ayrı işlenmesi",
          "Yalnız geçerli değerlerin işlenmesi",
          "Sınıfların birbiriyle çakışması",
          "Bir sınıftaki tüm elemanların test nesnesince aynı biçimde işlenmesi"
        ],
        "obj": "h1"
      },
      {
        "id": "71807071",
        "q": "Hangisi eşdeğerlik sınıflarının özelliğidir?",
        "options": [
          "Yalnız sayısal olabilirler",
          "Çakışmazlar ve boş küme olmazlar",
          "Her zaman sıralıdırlar",
          "Sınıf başına en az 5 test gerekir"
        ],
        "obj": "h1"
      },
      {
        "id": "aa727dae",
        "q": "Sipariş adedi 1 ile 50 arası geçerli. Sınıflar: 0 ve altı, 1-50, 51 ve üstü. Yalnız adet=25 ile test yapılırsa EP kapsamı yaklaşık kaçtır?",
        "options": [
          "%100",
          "%50",
          "%33 (1/3)",
          "%25"
        ],
        "obj": "h2"
      },
      {
        "id": "c9cdfc8d",
        "q": "Yaş için 3 sınıf, üyelik durumu için 2 sınıf var. Each Choice kapsamı için gereken en az test sayısı kaçtır?",
        "options": [
          "5",
          "6",
          "2",
          "3"
        ],
        "obj": "h2"
      },
      {
        "id": "b5c244e2",
        "q": "Bir alan 0 ile 100 arası geçerli. Sınıflar: negatif, 0-100, 100 üstü. Testlerde -5, 50 ve 120 kullanıldı. EP kapsamı nedir?",
        "options": [
          "%67",
          "%33",
          "%100",
          "%50"
        ],
        "obj": "h2"
      },
      {
        "id": "68227db1",
        "q": "Yaş 18 ile 65 arası (dahil) geçerli. 2 değerli SDA test değerleri hangileridir?",
        "options": [
          "18, 19, 64, 65",
          "17, 18, 19, 64, 65, 66",
          "17, 18, 65, 66",
          "18 ve 65"
        ],
        "obj": "h3"
      },
      {
        "id": "8078dda9",
        "q": "Yaş 18 ile 65 arası (dahil) geçerli. 3 değerli SDA ile toplam kaç farklı test değeri gerekir?",
        "options": [
          "4",
          "3",
          "6",
          "8"
        ],
        "obj": "h4"
      },
      {
        "id": "8029671e",
        "q": "Gereksinim: 'adet <= 5 ise indirim uygulanır.' Kod yanlışlıkla 'adet == 5' yazıyor. Aşağıdaki test değerlerinden hangisi, 2 değerli SDA'nın (5 ve 6) kaçırdığı bu kusuru yakalar?",
        "options": [
          "adet = 5",
          "adet = 4 (3 değerli SDA'nın eklediği komşu)",
          "adet = 6",
          "adet = 50"
        ],
        "obj": "h4"
      },
      {
        "id": "eee10aed",
        "q": "18-65 için 2 değerli SDA ile 17, 18 ve 65 değerleri sınandı; 66 sınanmadı. SDA kapsamı nedir?",
        "options": [
          "%100",
          "%75 (3/4)",
          "%50",
          "%25"
        ],
        "obj": "h3"
      }
    ],
    "interview": [
      {
        "q": "2 değerli ile 3 değerli SDA arasındaki fark nedir?",
        "a": "2 değerli her sınır için sınır değer ve bitişik sınıftaki komşuyu sınar. 3 değerli sınır değerin her iki komşusunu da ekler; bazı kusurları yalnız o yakalar."
      },
      {
        "q": "Each Choice kapsamı nedir?",
        "a": "Her girdi kümesinin her sınıfının en az bir testle kapsanmasıdır; sınıf birleşimleri hesaba katılmaz."
      }
    ],
    "vocab": [
      {
        "term": "equivalence partition",
        "tr": "eşdeğerlik sınıfı",
        "ex": "Each equivalence partition needs at least one test."
      },
      {
        "term": "boundary value",
        "tr": "sınır değer",
        "ex": "Boundary values are the minimum and maximum of a partition."
      },
      {
        "term": "coverage item",
        "tr": "kapsam öğesi",
        "ex": "A coverage item is what the technique counts."
      }
    ],
    "sources": [
      {
        "title": "ISTQB CTFL v4.0.1 müfredatı (PDF, istqb.org)",
        "url": "https://istqb.org/?sdm_process_download=1&download_id=3345"
      },
      {
        "title": "ISTQB Sözlüğü",
        "url": "https://glossary.istqb.org/"
      }
    ]
  };

  /* 31 ───────────────────────────── K3 hesap: karar tablosu sütun sayımı, okuma ve kapsam */
  L[31] = {
    "hook": "İş kuralı birkaç koşulun birleşimine göre sonuç veriyor ve hangi birleşimi unuttuğunu bilmiyorsun. Karar tablosu birleşimleri sistemli listeler, sütun sayısı ise koşulla katlanarak büyür.",
    "homework": "Üç koşullu bir kural uydur: üye mi, sepet 200 TL ve üstü mü, kupon var mı. Sonuçlar: kupon varsa indirim, üye ve sepet 200 TL üstüyse ücretsiz kargo. Sekiz sütunluk tam tabloyu çiz, her sütunun sonucunu doldur, aynı sonuçlu ve bir koşulu etkisiz sütunları işaretle (-).",
    "warmup": {
      "recap": [
        {
          "point": "Karar tablosu koşul ve eylemleri satır, kuralları sütun olarak gösterir."
        },
        {
          "point": "İş kurallarını test etmek için kullanılır."
        }
      ],
      "concepts": [
        {
          "term": "Sınırlı girişli tablo",
          "tr": "Doğru/yanlış değerleri",
          "summary": "Koşul ve eylem değerleri Boolean'dır (D/Y); gerçekçi olmayan ya da etkisiz olanlar hariç.",
          "example": "Üye: D, Kupon: Y"
        },
        {
          "term": "- (tire)",
          "tr": "Koşul etkisiz",
          "summary": "Koşulun değeri o kuralın sonucunu etkilemez.",
          "example": "Kupon yoksa üye olup olmamak indirimi etkilemez"
        },
        {
          "term": "N/A",
          "tr": "Uygulanamaz birleşim",
          "summary": "Koşul bu kural için olanaksızdır; böyle sütunlar tablodan silinebilir.",
          "example": "'18 yaş altı' ve 'emekli' birlikte olamaz"
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
        "text": "İndirim, kargo ve kupon kuralları birkaç şartın birleşimine bağlı. Ekip bazı birleşimleri unutunca üye olmayan bir müşteri yanlışlıkla ücretsiz kargo aldı. Sistemli bir tablo, 8 birleşimi tek tek gösterir."
      },
      {
        "t": "h",
        "text": "Sütun sayısı ve notasyon"
      },
      {
        "t": "p",
        "text": "Tam tablo her koşul birleşimi için bir sütun içerir. Sınırlı girişli tablolarda n tane Boolean koşul için 2 üzeri n sütun gerekir."
      },
      {
        "t": "steps",
        "h": "Sütun sayısı ve notasyon",
        "items": [
          "3 koşul: 2 x 2 x 2 = 8 sütun. 4 koşul: 16. 5 koşul: 32. Koşul eklendikçe sütun sayısı katlanarak artar.",
          "D (doğru) koşulun sağlandığını, Y (yanlış) sağlanmadığını gösterir. - değeri etkisiz, N/A uygulanamaz demektir. Eylemde X eylemin gerçekleşeceğini, boşluk gerçekleşmeyeceğini gösterir.",
          "Uygulanamaz sütunlar silinebilir; sonuçları aynı olan ve bir koşulun etkisiz olduğu sütunlar birleştirilerek tablo küçültülebilir (küçültme algoritmaları müfredat dışıdır).",
          "Kapsam öğesi uygulanabilir sütundur. Kapsam = çalıştırılan sütun / toplam uygulanabilir sütun."
        ]
      },
      {
        "t": "h",
        "text": "Okuma örneği: kupon ve kargo kuralı"
      },
      {
        "t": "steps",
        "h": "Okuma örneği: kupon ve kargo kuralı",
        "items": [
          "Kural: kupon varsa %10 indirim; üye ve sepet 200 TL üstüyse ücretsiz kargo. Koşullar sırasıyla: Üye, Sepet 200 TL ve üstü, Kupon.",
          "(D, D, D): indirim ve kargo. (D, D, Y): yalnız kargo. (D, Y, D): yalnız indirim. (D, Y, Y): hiçbiri.",
          "(Y, D, D): yalnız indirim (üye değil). (Y, D, Y): hiçbiri. (Y, Y, D): yalnız indirim. (Y, Y, Y): hiçbiri.",
          "(Y, D, Y) ile (Y, Y, Y) aynı sonucu verir ve sepet etkisizdir; birleştirince (Y, -, Y) olur."
        ]
      },
      {
        "t": "box",
        "h": "Dikkat",
        "text": "Önce tam tabloyu çıkar, sonra uygulanamazları sil, en son birleştir. Kapsam hesabında paydaya uygulanabilir sütunları koy, tüm 2 üzeri n'i değil. Tire (-) ile N/A'yı karıştırma: tire 'fark etmez', N/A 'bu birleşim olamaz'."
      }
    ],
    "objectives": [
      {
        "id": "h1",
        "text": "Karar tablosu notasyonunu (D, Y, -, N/A, X) okuyabilirsin."
      },
      {
        "id": "h2",
        "text": "Verilen koşul sayısı için tam tablo sütun sayısını hesaplayabilirsin."
      },
      {
        "id": "h3",
        "text": "Bir karar tablosundan belirli girdi birleşiminin sonucunu bulabilirsin."
      },
      {
        "id": "h4",
        "text": "Sütun birleştirme ve kapsam yüzdesini hesaplayabilirsin."
      }
    ],
    "summary": [
      "n Boolean koşul için tam tabloda 2 üzeri n sütun vardır.",
      "Tire etkisiz, N/A uygulanamaz demektir; X eylemin gerçekleştiğini gösterir.",
      "Kapsam öğesi uygulanabilir sütundur; kapsam = çalışan / uygulanabilir sütun.",
      "Aynı sonuçlu ve bir koşulu etkisiz sütunlar birleştirilebilir."
    ],
    "prereq": [
      9
    ],
    "minutes": 25,
    "sonDogrulama": "2026-10-26",
    "surum": "2026-10-v1",
    "quiz": [
      {
        "id": "1766e463",
        "q": "Sınırlı girişli karar tablosunda bir koşulun yerinde '-' varsa ne anlama gelir?",
        "options": [
          "Koşul bu birleşimde olamaz",
          "Koşulun değeri o kuralın sonucunu etkilemez",
          "Eylem gerçekleşmez",
          "Koşul doğrudur"
        ],
        "obj": "h1"
      },
      {
        "id": "9c934a60",
        "q": "'N/A' notasyonu ne anlama gelir?",
        "options": [
          "Koşulun önemi yok",
          "Eylem iki kez çalışır",
          "Koşul yanlıştır",
          "Koşul o kural için uygulanamaz (olanaksız birleşim)"
        ],
        "obj": "h1"
      },
      {
        "id": "6b7690c6",
        "q": "Dört Boolean koşullu sınırlı girişli bir karar tablosunun tam hali kaç sütun içerir?",
        "options": [
          "16",
          "8",
          "4",
          "32"
        ],
        "obj": "h2"
      },
      {
        "id": "901d3777",
        "q": "Koşul sayısı 3'ten 5'e çıkarsa tam tablodaki sütun sayısı kaç kat artar?",
        "options": [
          "2 kat",
          "4 kat (8'den 32'ye)",
          "Aynı kalır",
          "6 kat"
        ],
        "obj": "h2"
      },
      {
        "id": "b41e4dca",
        "q": "Kural: kupon varsa %10 indirim; üye ve sepet 200 TL ve üstüyse ücretsiz kargo. Koşullar sırasıyla Üye, Sepet>=200, Kupon. (D, Y, D) birleşiminde ne olur?",
        "options": [
          "İndirim ve kargo",
          "Yalnız kargo",
          "Hiçbiri",
          "Yalnız indirim"
        ],
        "obj": "h3"
      },
      {
        "id": "2db16875",
        "q": "Aynı kuralda üye olmayan, sepeti 250 TL ve kuponu olmayan müşteri (Y, D, Y) ne alır?",
        "options": [
          "Ücretsiz kargo",
          "%10 indirim",
          "Hiçbir eylem gerçekleşmez",
          "İndirim ve kargo"
        ],
        "obj": "h3"
      },
      {
        "id": "460b81a9",
        "q": "Aynı kuralda hem indirim hem ücretsiz kargo hangi birleşimde gerçekleşir?",
        "options": [
          "Üye değil, sepet 200 TL ve üstü, kupon var",
          "Üye, sepet 200 TL altı, kupon var",
          "Üye, sepet 200 TL ve üstü, kupon yok",
          "Üye, sepet 200 TL ve üstü, kupon var"
        ],
        "obj": "h3"
      },
      {
        "id": "bc9db5f6",
        "q": "(Y, D, Y) ve (Y, Y, Y) sütunlarının sonucu aynı (hiçbir eylem yok) ve 'Sepet' koşulu etkisiz. Birleştirilmiş sütun nasıl yazılır?",
        "options": [
          "(Y, D, Y)",
          "(Y, -, Y)",
          "(D, -, Y)",
          "(Y, Y, -)"
        ],
        "obj": "h4"
      },
      {
        "id": "1872e4a5",
        "q": "Bir tabloda 8 sütundan 2'si olanaksızdır (N/A). Çalıştırılan sütun sayısı 4 ise karar tablosu kapsamı yaklaşık kaçtır?",
        "options": [
          "%50 (4/8)",
          "%100",
          "%67 (4/6)",
          "%33"
        ],
        "obj": "h4"
      }
    ],
    "interview": [
      {
        "q": "Dört koşullu tam karar tablosu kaç sütun içerir?",
        "a": "2 üzeri 4, yani 16 sütun. Koşul sayısı arttıkça sütunlar katlanır; çok koşulda küçültme ya da risk tabanlı seçim kullanılır."
      },
      {
        "q": "Karar tablosunda kapsam nasıl ölçülür?",
        "a": "Çalıştırılan uygulanabilir sütun sayısı, toplam uygulanabilir sütun sayısına bölünür ve yüzde olarak ifade edilir."
      }
    ],
    "vocab": [
      {
        "term": "decision table",
        "tr": "karar tablosu",
        "ex": "A decision table lists combinations of conditions."
      },
      {
        "term": "rule",
        "tr": "kural (sütun)",
        "ex": "Each column is one decision rule."
      },
      {
        "term": "limited-entry",
        "tr": "sınırlı girişli",
        "ex": "Limited-entry tables use only true and false."
      }
    ],
    "sources": [
      {
        "title": "ISTQB CTFL v4.0.1 müfredatı (PDF, istqb.org)",
        "url": "https://istqb.org/?sdm_process_download=1&download_id=3345"
      },
      {
        "title": "ISTQB Sözlüğü",
        "url": "https://glossary.istqb.org/"
      }
    ]
  };

  /* 32 ───────────────────────────── K3 hesap: durum geçişi testi, geçiş sayımı ve kapsam yüzdesi */
  L[32] = {
    "hook": "Bir sipariş 'yeni', 'ödendi', 'kargoda', 'teslim edildi' ya da 'iptal' olabilir. Hangi geçişlerin geçerli olduğunu ve testlerin bunların kaçını kapsadığını saymak sınav ve iş için temel beceridir.",
    "homework": "Beş durumlu sipariş modelini çiz: Yeni, Ödendi, Kargoda, Teslim, İptal. Geçerli geçişleri yaz (öde, gönder, teslim al, iptal). Sonra durum tablosunu çıkar, boş hücreleri say ve 'öde, gönder, teslim al' testinin hangi durumları ve geçişleri kapsadığını yüzde olarak hesapla.",
    "warmup": {
      "recap": [
        {
          "point": "Durum diyagramı durumları ve geçerli geçişleri gösterir."
        },
        {
          "point": "Geçiş, bir olay ve isteğe bağlı koruma koşuluyla tetiklenir."
        }
      ],
      "concepts": [
        {
          "term": "Tüm durumlar kapsamı",
          "tr": "Her durum bir kez",
          "summary": "Kapsam öğeleri durumlardır; kapsam = sınanan durum / toplam durum.",
          "example": "5 durumdan 4'ü ziyaret edildi -> %80"
        },
        {
          "term": "Geçerli geçişler kapsamı",
          "tr": "0-switch",
          "summary": "Kapsam öğeleri tek tek geçerli geçişlerdir; en yaygın kullanılan ölçüttür.",
          "example": "5 geçerli geçişin 3'ü sınandı -> %60"
        },
        {
          "term": "Tüm geçişler kapsamı",
          "tr": "Geçerli ve geçersiz",
          "summary": "Durum tablosundaki tüm geçişler: geçerliler çalıştırılır, geçersizler denenir.",
          "example": "5 durum x 4 olay = 20 hücre"
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
        "text": "Sipariş sistemi 'teslim edilmiş' bir siparişin tekrar 'ödendi' durumuna dönmesine izin veriyordu. Test ekibi yalnız mutlu yolu (öde, gönder, teslim al) denemişti; geçersiz geçişleri denemek bu kusuru yakalardı."
      },
      {
        "t": "h",
        "text": "Üç kapsam ölçütü"
      },
      {
        "t": "p",
        "text": "Durum geçişi testinde testler olay dizileridir ve bir test durumu birden çok geçişi kapsar."
      },
      {
        "t": "steps",
        "h": "Üç kapsam ölçütü",
        "items": [
          "Tüm durumlar: her durumun en az bir kez ziyaret edilmesi. Valid transitions'tan zayıftır, çünkü tüm geçişler çalışmadan da sağlanabilir.",
          "Geçerli geçişler (0-switch): her geçerli geçişin çalıştırılması. En yaygın ölçüttür; tam kapsamı tüm durumlar kapsamını da sağlar.",
          "Tüm geçişler: durum tablosundaki geçerli geçişlerin hepsini çalıştırmak ve geçersizleri denemek. Hem tüm durumları hem geçerli geçişleri garantiler; güvenlik/görev kritik yazılımda asgari ölçüt olmalıdır.",
          "Geçersiz geçişler durum tablosunda boş hücre olarak görünür ve her test durumunda yalnız biri denenir (kusur maskeleme)."
        ]
      },
      {
        "t": "h",
        "text": "Sipariş modeli ile hesap"
      },
      {
        "t": "steps",
        "h": "Sipariş modeli ile hesap",
        "items": [
          "Durumlar: Yeni, Ödendi, Kargoda, Teslim, İptal (5). Olaylar: öde, gönder, teslim al, iptal (4).",
          "Geçerli geçişler: Yeni-öde->Ödendi, Yeni-iptal->İptal, Ödendi-gönder->Kargoda, Ödendi-iptal->İptal, Kargoda-teslim al->Teslim (5 geçiş).",
          "Durum tablosu 5 x 4 = 20 hücre; 5 hücre geçerli, 15 hücre geçersiz (boş). Tüm geçişler kapsam öğesi sayısı 20.",
          "'öde, gönder, teslim al' dizisi 4 durumu (Yeni, Ödendi, Kargoda, Teslim) ve 3 geçerli geçişi kapsar: tüm durumlar %80, geçerli geçişler %60."
        ]
      },
      {
        "t": "box",
        "h": "Dikkat",
        "text": "Kapsam öğesi sayısını karıştırma: tüm durumlar için durum sayısı, geçerli geçişler için geçerli ok sayısı, tüm geçişler için durum x olay hücre sayısıdır. Son durumlardan (Teslim, İptal) çıkış yoksa her biri bir testi sona erdirir; bu en az test sayısını belirler."
      }
    ],
    "objectives": [
      {
        "id": "h1",
        "text": "Üç kapsam ölçütünü ve aralarındaki gücü söyleyebilirsin."
      },
      {
        "id": "h2",
        "text": "Bir diyagramdan geçerli ve geçersiz geçişleri sayabilirsin."
      },
      {
        "id": "h3",
        "text": "Bir test dizisinin durum ve geçiş kapsamını yüzde olarak hesaplayabilirsin."
      },
      {
        "id": "h4",
        "text": "Tüm geçerli geçişler için gereken en az testi bulup kusur maskelemeyi açıklayabilirsin."
      }
    ],
    "summary": [
      "Üç ölçüt: tüm durumlar, geçerli geçişler, tüm geçişler; sonuncusu en güçlüdür.",
      "Durum tablosu geçersiz geçişleri boş hücre olarak gösterir: 5 durum x 4 olay = 20 hücre.",
      "Örnek dizi 'öde, gönder, teslim al': tüm durumlar %80, geçerli geçişler %60.",
      "Bir test durumunda tek geçersiz geçiş denenir; böylece kusur maskeleme önlenir."
    ],
    "prereq": [
      10
    ],
    "minutes": 25,
    "sonDogrulama": "2026-10-26",
    "surum": "2026-10-v1",
    "quiz": [
      {
        "id": "30742f49",
        "q": "Hangi durum geçişi kapsam ölçütünün kapsam öğeleri tek tek geçerli geçişlerdir ve en yaygın kullanılanıdır?",
        "options": [
          "Geçerli geçişler kapsamı (0-switch)",
          "Tüm durumlar kapsamı",
          "Tüm geçişler kapsamı",
          "Her seçim kapsamı"
        ],
        "obj": "h1"
      },
      {
        "id": "21c6f002",
        "q": "Tüm geçişler kapsamının %100'üne ulaşmak için ne yapılmalıdır?",
        "options": [
          "Yalnız tüm durumlar ziyaret edilmelidir",
          "Yalnız mutlu yol denenmelidir",
          "Tüm geçerli geçişler çalıştırılmalı ve geçersiz geçişler denenmelidir",
          "Yalnız geçersiz geçişler denenmelidir"
        ],
        "obj": "h1"
      },
      {
        "id": "30c431d9",
        "q": "Kapsam ölçütlerinin gücü için hangisi doğrudur?",
        "options": [
          "Tüm geçişler kapsamı hem geçerli geçişler hem de tüm durumlar kapsamını garanti eder",
          "Tüm durumlar kapsamı geçerli geçişleri garanti eder",
          "Geçerli geçişler tüm geçişlere eşittir",
          "Üçü aynı güçtedir"
        ],
        "obj": "h1"
      },
      {
        "id": "639a0306",
        "q": "Sipariş modelinde Yeni-öde->Ödendi, Yeni-iptal->İptal, Ödendi-gönder->Kargoda, Ödendi-iptal->İptal ve Kargoda-teslim al->Teslim geçişleri tanımlı. Kaç geçerli geçiş vardır?",
        "options": [
          "4",
          "20",
          "5",
          "15"
        ],
        "obj": "h2"
      },
      {
        "id": "f96e109d",
        "q": "Aynı modelde 5 durum ve 4 olay var. Durum tablosunda kaç hücre bulunur ve kaçı geçersizdir?",
        "options": [
          "9 hücre, 4'ü geçersiz",
          "20 hücre, 15'i geçersiz",
          "20 hücre, 5'i geçersiz",
          "5 hücre, 0 geçersiz"
        ],
        "obj": "h2"
      },
      {
        "id": "da7850a9",
        "q": "Aynı modelde tek test 'öde, gönder, teslim al' dizisidir. Tüm durumlar kapsamı yaklaşık kaçtır?",
        "options": [
          "%100",
          "%80 (4/5)",
          "%60",
          "%40"
        ],
        "obj": "h3"
      },
      {
        "id": "4a3a2ec9",
        "q": "Aynı test dizisinin ('öde, gönder, teslim al') geçerli geçişler kapsamı kaçtır?",
        "options": [
          "%80",
          "%100",
          "%20",
          "%60 (3/5)"
        ],
        "obj": "h3"
      },
      {
        "id": "c735e92f",
        "q": "Aynı modelde tüm geçerli geçişleri kapsamak için gereken en az test sayısı kaçtır? (Teslim ve İptal sonlanma durumlarıdır, çıkış geçişi yoktur.)",
        "options": [
          "1",
          "3",
          "2",
          "5"
        ],
        "obj": "h4"
      },
      {
        "id": "1d592038",
        "q": "Neden bir test durumunda yalnız bir geçersiz geçiş denenir?",
        "options": [
          "Kusur maskelemeyi önlemek için; bir kusur diğerinin bulunmasını engelleyebilir",
          "Test süresini uzatmak için",
          "Geçersiz geçişlerin hiç hata vermemesi için",
          "Kapsam yüzdesini düşürmek için"
        ],
        "obj": "h4"
      }
    ],
    "interview": [
      {
        "q": "Geçerli geçişler kapsamı ile tüm durumlar kapsamı arasındaki fark nedir?",
        "a": "Geçerli geçişler kapsamı her geçerli oku çalıştırmayı ister ve tam kapsamı tüm durumları da kapsar. Tüm durumlar kapsamı daha zayıftır, geçişlerin hepsini çalıştırmadan sağlanabilir."
      },
      {
        "q": "Tüm geçişler kapsamı neyi gerektirir?",
        "a": "Tüm geçerli geçişlerin çalıştırılmasını ve geçersiz geçişlerin denenmesini. Her test durumunda yalnız bir geçersiz geçiş denenir."
      }
    ],
    "vocab": [
      {
        "term": "state transition",
        "tr": "durum geçişi",
        "ex": "A state transition is triggered by an event."
      },
      {
        "term": "guard condition",
        "tr": "koruma koşulu",
        "ex": "A guard condition must be true for the transition."
      },
      {
        "term": "defect masking",
        "tr": "kusur maskeleme",
        "ex": "Defect masking hides one defect behind another."
      }
    ],
    "sources": [
      {
        "title": "ISTQB CTFL v4.0.1 müfredatı (PDF, istqb.org)",
        "url": "https://istqb.org/?sdm_process_download=1&download_id=3345"
      },
      {
        "title": "ISTQB Sözlüğü",
        "url": "https://glossary.istqb.org/"
      }
    ]
  };

  /* 33 ───────────────────────────── K3 hesap: ifade ve dal kapsamı, en az test sayısı */
  L[33] = {
    "hook": "Kod parçası verilir ve 'testler kodun yüzde kaçını kapsıyor?' diye sorulur. Önce ifadeleri, sonra karar sonuçlarını sayarsan cevap bir bölme işlemidir.",
    "homework": "Altı ifadeli, iki if içeren küçük bir işlev yaz (ya da aşağıdaki örneği kullan). Ayrı ayrı iki test girdisi için hangi ifadelerin ve hangi karar sonuçlarının koştuğunu işaretle. İfade ve dal kapsamını yüzde olarak hesapla ve %100 dal kapsamı için gereken en az test sayısını bul.",
    "warmup": {
      "recap": [
        {
          "point": "Beyaz kutu teknikleri kodun iç yapısını kullanır."
        },
        {
          "point": "Kapsam, yürütülen öğe sayısı / toplam öğe sayısıdır."
        }
      ],
      "concepts": [
        {
          "term": "İfade kapsamı",
          "tr": "Koşan ifade oranı",
          "summary": "Kapsam öğeleri yürütülebilir ifadelerdir; kapsam = koşan ifade / toplam yürütülebilir ifade.",
          "example": "6 ifadeden 5'i koştu -> yaklaşık %83"
        },
        {
          "term": "Dal kapsamı",
          "tr": "Koşan dal oranı",
          "summary": "Dal, kontrol akışında iki düğüm arası aktarımdır; koşullu (karar sonucu) ya da koşulsuz olabilir. Kapsam = koşan dal / toplam dal.",
          "example": "if için doğru ve yanlış sonuçları"
        },
        {
          "term": "Kapsama (subsume)",
          "tr": "Daha güçlü ölçüt",
          "summary": "Dal kapsamı ifade kapsamını kapsar: %100 dal kapsamı %100 ifade kapsamını da sağlar; tersi doğru değildir.",
          "example": "Tüm ifadeler koştu ama else yolu hiç denenmedi"
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
        "text": "Ekip 'kodun %100'ü test edildi' diyerek yayına çıktı. Oysa ifadelerin hepsi koşmuştu ama bir if'in else yolu hiç denenmemişti ve canlıda tam o yolda hata çıktı. İfade kapsamı ile dal kapsamının farkı burada kritikti."
      },
      {
        "t": "h",
        "text": "Tanımlar ve ilişki"
      },
      {
        "t": "p",
        "text": "İki beyaz kutu tekniği anlatılır: ifade testi ve dal testi."
      },
      {
        "t": "steps",
        "h": "Tanımlar ve ilişki",
        "items": [
          "İfade kapsamı yürütülebilir ifadeleri sayar. %100 ifade kapsamı her ifadenin en az bir kez koştuğunu gösterir ama veriye bağlı kusurları (örneğin yalnızca payda 0 iken çıkan sıfıra bölme) ve tüm karar mantığını garanti etmez.",
          "Dal kapsamı kontrol akışındaki dalları sayar; koşullu dallar if sonucu (doğru/yanlış), switch durumu ya da döngüden çıkış/devam kararıdır.",
          "Dal kapsamı ifade kapsamını kapsar. Ters yön geçerli değildir.",
          "Beyaz kutunun gücü: şartname belirsiz ya da eksik olsa da tüm uygulamayı hesaba katması. Zayıflığı: uygulanmamış gereksinimleri bulamayabilir."
        ]
      },
      {
        "t": "h",
        "text": "Hesap örneği"
      },
      {
        "t": "steps",
        "h": "Hesap örneği",
        "items": [
          "Kod: y = 0; eğer x > 5 ise y = x * 2; eğer y > 20 ise y = 20; y döndür. Yürütülebilir ifade sayısı 6 (y=0, birinci if, y=x*2, ikinci if, y=20, return).",
          "x = 10: y 20 olur, ikinci karar 20 > 20 yanlış. Koşan ifadeler 5 (y=20 koşmaz): ifade kapsamı 5/6, yaklaşık %83. Koşullu dallardan (iki if x iki sonuç = 4) doğru ve yanlış birer tane: 2/4 = %50.",
          "x = 11: y 22 olur, ikinci karar doğru ve y=20 koşar. Tüm 6 ifade koşar (%100) ama koşullu dallar yine doğru-doğru: 2/4 = %50.",
          "x = 3 eklenince iki karar da yanlış olur: koşullu dallar 4/4 = %100. Yani en az 2 test (x = 11 ve x = 3) gerekir. Burada dal sayımı yalnız koşullu dallarla yapılmıştır."
        ]
      },
      {
        "t": "box",
        "h": "Dikkat",
        "text": "Soruda dalın tanımını oku: yalnız koşullu dallar mı sayılıyor, yoksa koşulsuz aktarımlar da mı? Müfredata göre koşulsuz dallar da dal sayılır. Sınav sorusunda akış grafiği ya da açık bir tanım verilir; hesaba başlamadan önce paydayı belirle."
      }
    ],
    "objectives": [
      {
        "id": "h1",
        "text": "İfade kapsamı ile dal kapsamının tanımını ve ilişkisini söyleyebilirsin."
      },
      {
        "id": "h2",
        "text": "Verilen kod ve test girdisi için ifade kapsamı yüzdesini hesaplayabilirsin."
      },
      {
        "id": "h3",
        "text": "Koşullu dal kapsamını hesaplayabilirsin."
      },
      {
        "id": "h4",
        "text": "Kapsamı artıracak test girdisini ya da en az test sayısını bulabilirsin."
      }
    ],
    "summary": [
      "İfade kapsamı = koşan ifade / toplam yürütülebilir ifade.",
      "Dal kapsamı = koşan dal / toplam dal; ifade kapsamını kapsar.",
      "%100 ifade kapsamı tüm karar mantığının sınandığını garanti etmez.",
      "Beyaz kutu eksik gereksinim kusurlarını bulamayabilir."
    ],
    "prereq": [
      11
    ],
    "minutes": 25,
    "sonDogrulama": "2026-10-26",
    "surum": "2026-10-v1",
    "quiz": [
      {
        "id": "accde9de",
        "q": "İfade kapsamı nasıl ölçülür?",
        "options": [
          "Bulunan kusur sayısı toplam kusur sayısına bölünür",
          "Koşan test sayısı toplam test sayısına bölünür",
          "Kodun satır sayısı ifade sayısına bölünür",
          "Test durumlarının koşturduğu ifade sayısı, toplam yürütülebilir ifade sayısına bölünür"
        ],
        "obj": "h1"
      },
      {
        "id": "9a720f83",
        "q": "Dal kapsamı ile ifade kapsamı arasındaki ilişki hangisidir?",
        "options": [
          "%100 ifade kapsamı %100 dal kapsamını sağlar",
          "İkisi her zaman eşittir",
          "Birbirleriyle ilgisizdir",
          "%100 dal kapsamı %100 ifade kapsamını da sağlar; tersi doğru değildir"
        ],
        "obj": "h1"
      },
      {
        "id": "b0e7a39b",
        "q": "%100 ifade kapsamı için hangisi doğrudur?",
        "options": [
          "Tüm kusurların bulunacağını garanti eder",
          "Tüm dalların koştuğunu garanti eder",
          "Veriye bağlı kusurları mutlaka bulur",
          "Tüm karar mantığının sınandığını ve kusurların bulunacağını garanti etmez"
        ],
        "obj": "h1"
      },
      {
        "id": "4ab421f7",
        "q": "Kod:\ndef f(x):\n    y = 0\n    if x > 5:\n        y = x * 2\n    if y > 20:\n        y = 20\n    return y\nTek test x = 10 ile koşuldu. Altı yürütülebilir ifade vardır (y=0, ilk if, y=x*2, ikinci if, y=20, return). İfade kapsamı yaklaşık kaçtır?",
        "options": [
          "%100",
          "%83 (5/6)",
          "%67",
          "%50"
        ],
        "obj": "h2"
      },
      {
        "id": "edba90e8",
        "q": "Aynı kodda tek test x = 11 ile koşuldu. Yalnız koşullu dallar (iki if x doğru/yanlış = 4) sayılırsa ifade kapsamı ve dal kapsamı sırasıyla nedir?",
        "options": [
          "%100 ve %100",
          "%83 ve %50",
          "%100 ve %50",
          "%50 ve %100"
        ],
        "obj": "h2"
      },
      {
        "id": "37e023b6",
        "q": "Aynı kodda %100 koşullu dal kapsamı için gereken en az test sayısı kaçtır?",
        "options": [
          "1",
          "2 (örneğin x = 11 ve x = 3)",
          "3",
          "4"
        ],
        "obj": "h4"
      },
      {
        "id": "0bb3a5b6",
        "q": "Beyaz kutu testi için aşağıdakilerden hangisi doğrudur?",
        "options": [
          "Tüm eksik gereksinimleri bulur",
          "Şartname gerektirir ve onsuz uygulanamaz",
          "Uygulanmamış bir gereksinimden doğan eksiklik kusurlarını bulamayabilir",
          "Statik testte hiç kullanılamaz"
        ],
        "obj": "h3"
      },
      {
        "id": "31ce2147",
        "q": "Aşağıdakilerden hangisi beyaz kutu tekniklerinin ortak gücüdür?",
        "options": [
          "Gereksinimlerin eksiksiz yazılmış olmasını şart koşar",
          "Hiç kod gerektirmez",
          "Şartname belirsiz, eski ya da eksik olsa da uygulamanın tamamı hesaba katılır",
          "Kullanıcı ihtiyacını doğrular"
        ],
        "obj": "h3"
      },
      {
        "id": "e8fb2db9",
        "q": "Aynı kodda x = 10 testi koştu ve y=20 ifadesi koşmadı. Yalnızca bu ifadeyi de koşturmak için hangi girdi yeterlidir?",
        "options": [
          "x = 3",
          "x = 12",
          "x = 5",
          "x = 6"
        ],
        "obj": "h4"
      }
    ],
    "interview": [
      {
        "q": "İfade kapsamı ile dal kapsamı arasındaki fark nedir?",
        "a": "İfade kapsamı yürütülebilir ifadeleri, dal kapsamı kontrol akışındaki dalları (karar sonuçlarını) sayar. Dal kapsamı ifade kapsamını kapsar, tersi geçerli değildir."
      },
      {
        "q": "%100 ifade kapsamı yeterli midir?",
        "a": "Hayır. Else yolunu ya da veriye bağlı kusurları görmeyebilir. Daha güçlü bir ölçüt olarak dal kapsamına bakarım."
      }
    ],
    "vocab": [
      {
        "term": "statement coverage",
        "tr": "ifade kapsamı",
        "ex": "Statement coverage counts executed statements."
      },
      {
        "term": "branch coverage",
        "tr": "dal kapsamı",
        "ex": "Branch coverage subsumes statement coverage."
      },
      {
        "term": "control flow",
        "tr": "kontrol akışı",
        "ex": "Control flow shows the order of statements."
      }
    ],
    "sources": [
      {
        "title": "ISTQB CTFL v4.0.1 müfredatı (PDF, istqb.org)",
        "url": "https://istqb.org/?sdm_process_download=1&download_id=3345"
      },
      {
        "title": "ISTQB Sözlüğü",
        "url": "https://glossary.istqb.org/"
      }
    ]
  };

  /* 34 ───────────────────────────── Risk düzeyi hesabı, proje ve ürün riski, onay ve regresyon testi */
  L[34] = {
    "hook": "Zaman kıt ve yüz test var. Hangisini önce koşturursun? Cevap risk düzeyi hesabında: olasılık ile etkiyi çarp, en yükseğe önce git. Düzeltilmiş bir kusurdan sonra ise iki ayrı soru sorulur: düzeldi mi, başka bir şey bozuldu mu?",
    "homework": "Beş test fikri yaz (ödeme, giriş, arama, profil teması, parola sıfırlama). Her biri için olasılığı 0.1 ile 0.9, etkiyi 1 ile 10 arasında puanla ve risk düzeyini çarparak bul. Testleri risk sırasına diz. Sonra düzeltilmiş bir kusur için hangi testi 'onay', hangilerini 'regresyon' olarak koşacağını yaz.",
    "warmup": {
      "recap": [
        {
          "point": "Risk, olumsuz etki doğurabilecek olası bir olaydır."
        },
        {
          "point": "Test önceliği riskle belirlenebilir."
        }
      ],
      "concepts": [
        {
          "term": "Risk düzeyi",
          "tr": "Olasılık ve etki bileşimi",
          "summary": "Niceliksel yaklaşımda risk düzeyi olasılık ile etkinin çarpımıdır; niteliksel yaklaşımda risk matrisi kullanılır.",
          "example": "0.3 x 8 = 2.4"
        },
        {
          "term": "Ürün riski",
          "tr": "Ürün kalitesiyle ilgili risk",
          "summary": "Yanlış hesaplama, eksik işlev, zayıf güvenlik, kötü kullanıcı deneyimi gibi kalite özelliklerine bağlı risklerdir.",
          "example": "KDV'nin iki kez eklenmesi"
        },
        {
          "term": "Proje riski",
          "tr": "Proje yönetimiyle ilgili risk",
          "summary": "Örgütsel, insan, teknik ve tedarikçi kaynaklı sorunlardır; takvimi, bütçeyi ya da kapsamı etkiler.",
          "example": "Tedarikçinin teslimatı geciktirmesi"
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
        "text": "Bir sürümde 120 test var ve gece yarısına kadar yalnız 40 tanesini koşturmak mümkün. Hangi 40? Risk düzeyini hesaplayan ekip ödeme ve giriş testlerini öne alır, tema rengi testini sona bırakır. Hesap yapmayan ekip alfabetik sıraya göre ilerler."
      },
      {
        "t": "h",
        "text": "Risk ve risk düzeyi"
      },
      {
        "t": "p",
        "text": "Risk iki faktörle tanımlanır: olasılık (0 ile 1 arasında) ve etki. İkisinin birleşimi risk düzeyidir."
      },
      {
        "t": "steps",
        "h": "Risk ve risk düzeyi",
        "items": [
          "Niceliksel: risk düzeyi = olasılık x etki. Örnek: ödeme 0.3 x 8 = 2.4; giriş 0.5 x 4 = 2.0; profil teması 0.8 x 1 = 0.8. Sıra: ödeme, giriş, tema.",
          "Niteliksel: risk matrisi (düşük/orta/yüksek) kullanılır.",
          "Proje riskleri yönetim ve kontrolle ilgilidir: örgütsel, insan, teknik, tedarikçi sorunları. Ürün riskleri kalite özellikleriyle ilgilidir: hatalı hesaplama, eksik işlev, güvenlik açığı, zayıf kullanıcı deneyimi.",
          "Risk analizi test kapsamını, seviyeleri ve türleri, teknikleri, eforu ve önceliği etkiler."
        ]
      },
      {
        "t": "h",
        "text": "Onay ve regresyon testi"
      },
      {
        "t": "steps",
        "h": "Onay ve regresyon testi",
        "items": [
          "Onay testi özgün kusurun düzeldiğini doğrular: önceden başarısız olan testlerin tekrar koşulması ya da düzeltme için yeni test eklenmesi. Zaman kısıtlıysa hatayı yeniden üreten adımlar denenir.",
          "Regresyon testi değişikliğin (düzeltme dahil) istenmeyen sonuç doğurmadığını doğrular; aynı bileşeni, diğer bileşenleri ve bağlı sistemleri etkileyebilir.",
          "Regresyon kapsamı için önce etki analizi yapılır. Regresyon takımları çok kez koşulur ve zamanla büyür, bu yüzden otomasyon için güçlü adaydır.",
          "Düzeltme ya da değişiklik yapılan her test seviyesinde onay ve/veya regresyon testi gerekir."
        ]
      },
      {
        "t": "box",
        "h": "Dikkat",
        "text": "Risk düzeyi hesabında olasılığı 0 ile 1 arasında, etkiyi aynı ölçekte tüm maddelere uygula; farklı ölçekler karşılaştırmayı bozar. Onay ile regresyonu karıştırma: onay 'düzeldi mi', regresyon 'başka bir şey bozuldu mu' sorusudur. İkisi de gerekir."
      }
    ],
    "objectives": [
      {
        "id": "h1",
        "text": "Risk düzeyini olasılık ve etkiden hesaplayabilirsin."
      },
      {
        "id": "h2",
        "text": "Risklere göre test sırası çıkarabilirsin."
      },
      {
        "id": "h3",
        "text": "Bir durumu proje riski ya da ürün riski olarak sınıflandırabilirsin."
      },
      {
        "id": "h4",
        "text": "Onay testi ile regresyon testini ayırt edip uygun olanı seçebilirsin."
      }
    ],
    "summary": [
      "Niceliksel risk düzeyi = olasılık x etki; yüksek düzey önce test edilir.",
      "Proje riskleri yönetim, ürün riskleri kalite özellikleriyle ilgilidir.",
      "Onay testi özgün kusurun düzeldiğini, regresyon testi yan etki olmadığını doğrular.",
      "Regresyon takımları büyüdüğü için otomasyona uygundur."
    ],
    "prereq": [
      13
    ],
    "minutes": 25,
    "sonDogrulama": "2026-10-26",
    "surum": "2026-10-v1",
    "quiz": [
      {
        "id": "395bebbd",
        "q": "Niceliksel yaklaşımda risk düzeyi nasıl hesaplanır?",
        "options": [
          "Olasılık ile etkinin toplamıyla",
          "Risk olasılığı ile risk etkisinin çarpımıyla",
          "Yalnız etkiyle",
          "Yalnız olasılıkla"
        ],
        "obj": "h1"
      },
      {
        "id": "22552ea9",
        "q": "Niteliksel risk değerlendirmesinde risk düzeyi neyle belirlenir?",
        "options": [
          "Test sayısıyla",
          "Kusur yoğunluğuyla",
          "Risk matrisiyle",
          "Kod satırıyla"
        ],
        "obj": "h1"
      },
      {
        "id": "4c87bd90",
        "q": "Ödeme testinin olasılığı 0.3, etkisi 8 puan. Risk düzeyi nedir?",
        "options": [
          "8.3",
          "24",
          "0.38",
          "2.4"
        ],
        "obj": "h2"
      },
      {
        "id": "286eaf17",
        "q": "Ödeme (0.3 x 8), giriş (0.5 x 4) ve profil teması (0.8 x 1) testleri var. Risk sırasına göre ilk test hangisidir?",
        "options": [
          "Ödeme",
          "Giriş",
          "Profil teması",
          "Hepsi eşit"
        ],
        "obj": "h2"
      },
      {
        "id": "bd1b88e5",
        "q": "A işinde olasılık 0.4 ve etki 5, B işinde olasılık 0.9 ve etki 2. Hangisi daha yüksek risklidir?",
        "options": [
          "B daha yüksektir çünkü olasılığı büyük",
          "A (2.0) ve B (1.8): A daha yüksektir",
          "Eşittirler",
          "Hesaplanamaz"
        ],
        "obj": "h2"
      },
      {
        "id": "256fe5bd",
        "q": "'Tedarikçi bileşenin teslimi iki hafta gecikti ve takvim kayıyor.' Bu hangi tür risktir?",
        "options": [
          "Ürün riski",
          "Risk sayılmaz",
          "Güvenlik riski",
          "Proje riski (tedarikçi sorunu)"
        ],
        "obj": "h3"
      },
      {
        "id": "4b757312",
        "q": "'Uygulama sepet toplamında KDV'yi iki kez ekliyor.' Bu hangi tür risktir?",
        "options": [
          "Proje riski",
          "Tedarikçi riski",
          "Kişi riski",
          "Ürün riski (yanlış hesaplama)"
        ],
        "obj": "h3"
      },
      {
        "id": "3400392a",
        "q": "Bir hata düzeltildi. Önceden başarısız olan testi yeniden koşturmak hangi testtir?",
        "options": [
          "Onay testi",
          "Regresyon testi",
          "Duman testi",
          "Kabul testi"
        ],
        "obj": "h4"
      },
      {
        "id": "f58a9341",
        "q": "Düzeltmenin başka yerleri bozmadığını kontrol etmek için kapsamı belirlerken ilk adım nedir?",
        "options": [
          "Etki analizi yapmak",
          "Hiç test yapmamak",
          "Yalnız düzeltilen satırı test etmek",
          "Tüm testleri silmek"
        ],
        "obj": "h4"
      },
      {
        "id": "5da978de",
        "q": "Regresyon test takımları neden otomasyon için güçlü adaydır?",
        "options": [
          "Çok kez koşulur ve her sürümle büyür",
          "Yalnız bir kez koşulur",
          "Hiç değişmez ve hiç koşulmaz",
          "Elle yapmak imkânsızdır"
        ],
        "obj": "h4"
      },
      {
        "id": "0e0f2c79",
        "q": "Ürün riski kontrolü hangi iki etkinlikten oluşur?",
        "options": [
          "Risk puanlama ve risk raporlama",
          "Risk kabulü ve risk saklama",
          "Risk tanımlama ve risk değerlendirme",
          "Risk azaltma ve risk izleme"
        ]
      },
      {
        "id": "d482c09b",
        "q": "Ekip bir ürün riskini analiz ettikten sonra, olası zararı sözleşmeyle bir sigortacıya devretmeye karar verdi. Bu hangi risk yanıtıdır?",
        "options": [
          "Beklenmedik durum planı",
          "Testle risk azaltma",
          "Risk kabulü",
          "Risk transferi"
        ]
      }
    ],
    "interview": [
      {
        "q": "Risk düzeyi nasıl hesaplanır?",
        "a": "Niceliksel yaklaşımda olasılık ile etki çarpılır, niteliksel yaklaşımda risk matrisi kullanılır. Yüksek düzeyli risk daha erken ve daha kapsamlı test edilir."
      },
      {
        "q": "Onay testi ile regresyon testi arasındaki fark nedir?",
        "a": "Onay testi özgün kusurun düzeldiğini doğrular. Regresyon testi değişikliğin, düzeltme dahil, başka bir yerde istenmeyen etki yaratmadığını doğrular. Kapsamı etki analiziyle belirlerim."
      }
    ],
    "vocab": [
      {
        "term": "risk level",
        "tr": "risk düzeyi",
        "ex": "Risk level is likelihood times impact."
      },
      {
        "term": "confirmation testing",
        "tr": "onay testi",
        "ex": "Confirmation testing checks that the fix works."
      },
      {
        "term": "regression testing",
        "tr": "regresyon testi",
        "ex": "Regression testing checks for side effects."
      }
    ],
    "sources": [
      {
        "title": "ISTQB CTFL v4.0.1 müfredatı (PDF, istqb.org)",
        "url": "https://istqb.org/?sdm_process_download=1&download_id=3345"
      },
      {
        "title": "ISTQB Sözlüğü",
        "url": "https://glossary.istqb.org/"
      }
    ]
  };
})();

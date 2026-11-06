/* Test uzmanı temel dersleri 1-5 (ISTQB CTFL v4.0.1 çerçevesi)
   Üretim: Faz 41c (GECE-10). Kod örnekleri çalıştırılarak/ayrıştırılarak doğrulandı; kaynak adresleri HTTP ile denetlendi (sonDogrulama 2026-11-06). */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).qa = (window.PP_LESSONS.qa || {}));

  /* 1 ───────────────────────────── Test nedir ve neden gerekli */
  L[1] = {
    "hook": "Test, uçağa binmeden önce yapılan kontrol listesi gibidir: uçuşun güvenli olduğunu kanıtlamaz ama bilinen riskleri uçuştan önce yakalar.",
    "homework": "Telefonundaki bir uygulamada \"yanlış davranış\" bul (ör. hatalı toplam, kayan düğme). Üç satır yaz: kullanıcının gördüğü arıza, tahmin ettiğin kusur, bu kusura yol açmış olabilecek insan hatası.",
    "warmup": {
      "concepts": [
        {
          "term": "Error / Defect / Failure",
          "tr": "İnsan hatası / Kusur / Arıza",
          "summary": "İnsan hata yapar, hata kodda ya da belgede kusur bırakır, kusurlu kod çalışınca arıza görünür.",
          "example": "Analist KDV kuralını yanlış anlar, kod KDV'yi iki kez ekler, müşteri fazla tutar görür."
        },
        {
          "term": "Root cause",
          "tr": "Kök neden",
          "summary": "Kusuru doğuran en temel sebep; bulunursa aynı türden kusurlar önlenebilir.",
          "example": "Gereksinimin iki farklı yoruma açık yazılmış olması"
        },
        {
          "term": "Testing / Debugging",
          "tr": "Test / Hata ayıklama",
          "summary": "Test arızayı gösterir, hata ayıklama kusurun yerini bulup düzeltir.",
          "example": "Testçi toplamın yanlış çıktığını raporlar, geliştirici satırı bulup düzeltir."
        },
        {
          "term": "Verification / Validation",
          "tr": "Doğrulama / Geçerleme",
          "summary": "Doğrulama belirtime uygunluğa, geçerleme gerçek ihtiyaca bakar.",
          "example": "Parola 8 karakter mi (doğrulama), kullanıcı kolayca giriş yapabiliyor mu (geçerleme)"
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
        "h": "Gerçek iş talebi",
        "text": "İş ilanı: \"Yeni sürümü yayına almadan önce kritik akışları kontrol edecek, bulduğu sorunları geliştiricinin tekrar edebileceği şekilde raporlayacak test uzmanı aranıyor.\" Bu işin ilk adımı, bulduğun şeyin neyin belirtisi olduğunu doğru adlandırmaktır."
      },
      {
        "t": "box",
        "h": "Terim notu",
        "text": "Terimler ISTQB sözlüğüyle (glossary.istqb.org) uyumlu kullanıldı. Sözlük sayfası bu çalışmada okunamadığı için tanımların resmî metinle birebir karşılaştırması doğrulanamadı; kesin ifade gerekiyorsa sözlüğe bak."
      },
      {
        "t": "h",
        "text": "Hata, kusur, arıza"
      },
      {
        "t": "p",
        "text": "Günlük dilde her şeye \"bug\" denir. Testçi üç şeyi ayırır: insan hatası (error), yazılımdaki kusur (defect) ve çalışırken görünen arıza (failure). Her kusur arıza üretmez; kusurlu satır hiç çalışmazsa kimse fark etmez."
      },
      {
        "t": "steps",
        "h": "Zincir",
        "items": [
          "Biri gereksinimi yanlış anlar: insan hatası.",
          "Kodda yanlış satır oluşur: kusur.",
          "Kod çalışır, yanlış sonuç çıkar: arıza.",
          "Testçi arızayı görür, kusurun izini sürmeye yardım eder."
        ]
      },
      {
        "t": "cmd",
        "lang": "python",
        "calistirma": "atla elle çalıştırılıp doğrulandı: Git Bash, 2026-11-06 (Python 3.12.10). Son satırdaki assert bilerek başarısız olur (çıkış kodu 1, AssertionError); bu bir arızanın nasıl göründüğünü gösterir.",
        "text": "def toplam(fiyat, kdv_orani):\n    kdv = fiyat * kdv_orani\n    return fiyat + kdv + fiyat * kdv_orani   # kusur: KDV iki kez eklendi\n\nprint(toplam(100, 0.20))   # beklenen 120.0, görülen 140.0 (arıza)\nassert toplam(100, 0.20) == 120.0, \"arıza: beklenen 120.0\""
      },
      {
        "t": "h",
        "text": "Test neden gerekli"
      },
      {
        "t": "p",
        "text": "Test, yazılımın amaçlanan işi yaptığına dair güven verir ve kusurları erken gösterir. Amaçlar bağlama göre değişir: kusur bulmak, belirtime uygunluğu göstermek, karar vericiye bilgi sağlamak, kusuru baştan önlemek. Hepsi tek bir testin amacı olmak zorunda değildir."
      },
      {
        "t": "box",
        "h": "Test ile kalite güvencesi",
        "text": "Test, ürünü çalıştırarak ya da inceleyerek bulgu üretir. Kalite güvencesi (QA) daha geniştir: süreçlerin doğru işlediğinden emin olmaya ve kusurları önlemeye odaklanır. Test uzmanı çoğu iş yerinde ikisine de katkı verir."
      },
      {
        "t": "h",
        "text": "Test mi, hata ayıklama mı?"
      },
      {
        "t": "p",
        "text": "Test arızayı gösterir. Hata ayıklama kusurun yerini bulur, nedenini çözer ve düzeltir; genelde geliştiricinin işidir. Düzeltmeden sonra yapılan testle düzeltmenin tuttuğu görülür."
      },
      {
        "t": "h",
        "text": "Elle dene"
      },
      {
        "t": "steps",
        "h": "Elle deneme",
        "items": [
          "Yukarıdaki kodu d1.py adıyla kaydet ve çalıştır.",
          "Çıktıda 140.0 gör, beklentinin 120.0 olduğunu not et.",
          "Kusurlu satırı bul: KDV iki kez eklenmiş.",
          "`return fiyat + kdv` yap, yeniden çalıştır; assert geçer."
        ]
      },
      {
        "t": "warn",
        "h": "Tuzak",
        "text": "\"Hiç hata bulunamadı\" demek \"hatasız\" demek değildir. Test kusurların varlığını gösterebilir, yokluğunu kanıtlayamaz. Bulgu yoksa bile bu yalnız yapılan testlerin sınırlı kapsamını anlatır."
      }
    ],
    "objectives": [
      {
        "id": "h1",
        "text": "Hata, kusur ve arızayı bir örnek zincirde ayırt edebilirsin."
      },
      {
        "id": "h2",
        "text": "Testin amaçlarından en az üçünü söyleyebilirsin."
      },
      {
        "id": "h3",
        "text": "Test ile hata ayıklamanın farkını açıklayabilirsin."
      },
      {
        "id": "h4",
        "text": "Doğrulama ile geçerlemeyi bir durum için sınıflandırabilirsin."
      }
    ],
    "summary": [
      "İnsan hatası kusura, kusur çalışınca arızaya dönüşür.",
      "Test güven verir ve kusurları erken gösterir; yokluklarını kanıtlayamaz.",
      "Test arızayı gösterir, hata ayıklama kusuru bulup düzeltir.",
      "Doğrulama belirtime, geçerleme ihtiyaca bakar."
    ],
    "prereq": [],
    "minutes": 25,
    "sonDogrulama": "2026-11-06",
    "surum": "1",
    "quiz": [
      {
        "id": "462e47e8",
        "q": "Kullanıcı Öde düğmesine basınca uygulama çöküyor. Bu olay hangisidir?",
        "options": [
          "Kusur: kodda duran, henüz hiç çalışmamış olabilecek yanlış satır ya da belge cümlesi",
          "Arıza: kusurlu kodun çalışırken görünen yanlış davranışı",
          "İnsan hatası: geliştiricinin kodu yazarken yaptığı yanlış",
          "Kök neden: kusurun doğmasına yol açan süreç sorunu"
        ],
        "obj": "h1"
      },
      {
        "id": "25da4950",
        "q": "Analist bir kuralı yanlış anlıyor, geliştirici bunu koda aynen çeviriyor. Bu zincirde \"kusur\" nerededir?",
        "options": [
          "Analistin kuralı yanlış anlamış olmasında",
          "Kullanıcının ekranda gördüğü ve yanlış olduğunu fark ettiği sonuçta",
          "Yanlış kuralı taşıyan kod ya da belgedeki yanlış satırdır",
          "Testçinin hazırladığı test senaryosunda"
        ],
        "obj": "h1"
      },
      {
        "id": "63f24ae7",
        "q": "Aşağıdakilerden hangisi testin tipik amaçlarından biridir?",
        "options": [
          "Geliştiricinin yerine kodu düzeltip sürümü yayına almak",
          "Hiç kusur kalmadığını kesin olarak kanıtlamak",
          "Gereksinimleri baştan yazıp kapsamı genişletmek",
          "Karar vericilere ürün kalitesi hakkında bilgi sağlamak"
        ],
        "obj": "h2"
      },
      {
        "id": "9a7c9a9f",
        "q": "Testin kusur yokluğunu kanıtlayamamasının günlük sonucu nedir?",
        "options": [
          "Bulgu çıkmaması, yapılan testlerin ötesinde güvence vermez",
          "Bulgu çıkmayan her sürüm hatasız kabul edilir ve doğrudan yayına alınır",
          "Testin hiç yapılmamasıyla aynı sonucu verir",
          "Daha az test yazmak yeterli olur"
        ],
        "obj": "h2"
      },
      {
        "id": "7f9a97c7",
        "q": "Testçi toplam tutarın yanlış çıktığını raporluyor; geliştirici iki KDV satırını bulup siliyor. Geliştiricinin yaptığı iş nedir?",
        "options": [
          "Test yürütme: arızayı gözlemlemek ve raporlamak",
          "Hata ayıklama: kusurun yerini bulup düzeltmek",
          "Geçerleme: ürünün ihtiyacı karşıladığını göstermek",
          "Statik analiz: kodu çalıştırmadan otomatik taramak"
        ],
        "obj": "h3"
      },
      {
        "id": "eecd8a51",
        "q": "Bir ekip yalnız şartnamedeki her maddeyi test ediyor, kullanıcıyla hiç konuşmuyor. Eksik kalan bakış hangisidir?",
        "options": [
          "Doğrulama: ürünün yazılı şartnameye uyduğunun sistematik biçimde gösterilmesi",
          "Hata ayıklama: kusurun nedeninin bulunması",
          "Geçerleme: ürünün gerçek ihtiyacı karşıladığının sorgulanması",
          "Kök neden analizi: kusurların tekrarının azaltılması"
        ],
        "obj": "h4"
      },
      {
        "id": "96bebd89",
        "q": "Parola alanı şartnamede 8 karakter ister. 7 karakterin reddedildiğini görmek hangi kavrama daha yakındır?",
        "options": [
          "Geçerleme: kullanıcı ihtiyacı kontrolü",
          "Hata ayıklama: kusurun yerinin saptanması",
          "Kusursuzluk yanılgısı: hatasızlığı başarı sanmak",
          "Doğrulama: yazılı belirtime uygunluk kontrolü"
        ],
        "obj": "h4"
      }
    ],
    "interview": [
      {
        "q": "Bug, kusur ve arıza arasındaki fark nedir?",
        "a": "Kusur kodda ya da belgede duran yanlıştır. Arıza, kusurlu kod çalıştığında kullanıcının gördüğü yanlış davranıştır. İkisinin gerisinde de genelde bir insan hatası vardır."
      },
      {
        "q": "Test ile hata ayıklama aynı şey midir?",
        "a": "Hayır. Test arızayı gösterir ve raporlar. Hata ayıklama kusurun yerini bulup düzeltir. Düzeltmeden sonra tekrar test yapılır."
      },
      {
        "q": "Tüm testler geçtiyse ürün hatasızdır diyebilir miyiz?",
        "a": "Hayır. Test kusur yokluğunu kanıtlayamaz, yalnız yapılan testlerin kapsadığı yerde güven verir. Ayrıca belirtim ihtiyacı yansıtmıyorsa ürün yine de işe yaramayabilir."
      }
    ],
    "vocab": [
      {
        "term": "defect",
        "tr": "kusur",
        "ex": "The defect was introduced in the pricing module."
      },
      {
        "term": "failure",
        "tr": "arıza",
        "ex": "The failure appeared when the user clicked Pay."
      },
      {
        "term": "root cause",
        "tr": "kök neden",
        "ex": "The root cause was an ambiguous requirement."
      },
      {
        "term": "debugging",
        "tr": "hata ayıklama",
        "ex": "Debugging is usually done by the developer."
      },
      {
        "term": "verification",
        "tr": "doğrulama",
        "ex": "Verification checks that the product meets its specification."
      },
      {
        "term": "validation",
        "tr": "geçerleme",
        "ex": "Validation checks that the product meets real user needs."
      }
    ],
    "sources": [
      {
        "title": "ISTQB Glossary",
        "url": "https://glossary.istqb.org"
      },
      {
        "title": "ISTQB Certified Tester Foundation Level (CTFL)",
        "url": "https://www.istqb.org/certifications/certified-tester-foundation-level"
      },
      {
        "title": "Python unittest",
        "url": "https://docs.python.org/3/library/unittest.html"
      }
    ]
  };

  /* 2 ───────────────────────────── Test ilkeleri ve test süreci */
  L[2] = {
    "hook": "Her şeyi test etmek, bir kütüphanedeki her kitabın her satırını okumaya benzer: akıllı olan, nereye bakacağını seçmektir.",
    "homework": "Kendi yaptığın küçük bir şey için (ör. alışveriş listesi uygulaması) bir test koşulu, o koşuldan iki test senaryosu ve beklenen sonuçlarını bir kâğıda yaz. Hangi gereksinime bağlandığını da not et.",
    "warmup": {
      "recap": [
        {
          "point": "Kusurlu kod çalışınca arıza ortaya çıkar.",
          "example": "KDV iki kez eklenince müşteri fazla tutar görür."
        }
      ],
      "concepts": [
        {
          "term": "Test principles",
          "tr": "Test ilkeleri",
          "summary": "Testin ne yapabildiğini ve ne yapamadığını anlatan genel gözlemler.",
          "example": "\"Testler kusurun varlığını gösterir, yokluğunu kanıtlayamaz.\""
        },
        {
          "term": "Test condition",
          "tr": "Test koşulu",
          "summary": "Test edilecek bir özellik, olay ya da davranış.",
          "example": "\"500 TL ve üzeri sepette indirim uygulanır.\""
        },
        {
          "term": "Test case",
          "tr": "Test senaryosu",
          "summary": "Girdi, ön koşul ve beklenen sonuçtan oluşan, bir koşulu denemek için yazılmış kayıt.",
          "example": "Sepet 500 TL, beklenen tutar 450 TL"
        },
        {
          "term": "Traceability",
          "tr": "İzlenebilirlik",
          "summary": "Gereksinim, test koşulu, senaryo ve sonuç arasında kurulan bağ.",
          "example": "GER-7 gereksinimi TC-1, TC-2, TC-3 senaryolarına bağlıdır."
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
        "h": "Gerçek iş talebi",
        "text": "Mülakatta sık gelen soru: \"Bir giriş formunu ne kadar sürede test edersin, hepsini test edebilir misin?\" Cevabı bilmek, test planını seçilmiş bir riskle gerekçelendirebilmek demektir."
      },
      {
        "t": "box",
        "h": "Terim notu",
        "text": "Terimler ISTQB sözlüğüyle (glossary.istqb.org) uyumlu kullanıldı. Sözlük sayfası bu çalışmada okunamadığı için tanımların resmî metinle birebir karşılaştırması doğrulanamadı; kesin ifade gerekiyorsa sözlüğe bak."
      },
      {
        "t": "h",
        "text": "Yedi test ilkesi"
      },
      {
        "t": "p",
        "text": "CTFL 4.0.1 çerçevesinde yedi ilke vardır. Bu çalışmada ilke adları ve kapsamı daha önce okunmuş CTFL metnine göre (qa-1.js notu, 2026-10-26) alındı; ifadeler özgündür."
      },
      {
        "t": "steps",
        "h": "İlkeler (kısaca)",
        "items": [
          "Test kusurların varlığını gösterir, yokluğunu kanıtlayamaz.",
          "Her şeyi test etmek (tüm girdi ve koşullar) mümkün değildir.",
          "Erken test zaman ve para kazandırır.",
          "Kusurlar kümelenir: az sayıda modül kusurların çoğunu taşır.",
          "Testler eskir: aynı testler tekrarlandıkça yeni kusur bulmaz.",
          "Test bağlama bağlıdır: oyun ile banka uygulaması farklı test edilir.",
          "Kusursuzluk yanılgısı: kusurları bulup düzeltmek başarıyı garanti etmez."
        ]
      },
      {
        "t": "box",
        "h": "Küçük hesap",
        "text": "Bir alan yalnız 8 haneli bir sayı kabul etsin: 10^8 yani 100 milyon farklı değer vardır. Saniyede 1000 deneme yapsan bile bütün değerler yaklaşık 28 saat sürer. Gerçek formlarda çok alan olduğu için tümünü denemek pratik değildir. Bu yüzden teknikler ve risk bazlı seçim kullanılır."
      },
      {
        "t": "h",
        "text": "Test süreci"
      },
      {
        "t": "p",
        "text": "Test süreci bir dizi faaliyettir: test planlama, izleme ve kontrol, analiz, tasarım, gerçekleştirme (hazırlık), yürütme ve tamamlama. Faaliyetler art arda sıralanabilir ama çoğu projede örtüşür ya da yinelenir; sıra, her projede aynı olmak zorunda değildir."
      },
      {
        "t": "steps",
        "h": "Faaliyetlerin kısa karşılıkları",
        "items": [
          "Planlama: ne, kim, ne zaman, hangi ölçütle.",
          "İzleme ve kontrol: plana göre ilerleme, sapmada önlem.",
          "Analiz: test temelinden test koşullarını çıkarmak.",
          "Tasarım: koşulları test senaryolarına çevirmek.",
          "Gerçekleştirme: veri, ortam ve betikleri hazırlamak.",
          "Yürütme: testi çalıştırmak, sonucu kaydetmek.",
          "Tamamlama: bulguları kapatmak, dersleri toplamak."
        ]
      },
      {
        "t": "h",
        "text": "Koşuldan senaryoya ve izlenebilirlik"
      },
      {
        "t": "cmd",
        "lang": "python",
        "calistirma": "atla elle çalıştırılıp doğrulandı: Git Bash, 2026-11-06 (Python 3.12.10)",
        "text": "def indirim(tutar):\n    if tutar >= 500:\n        return tutar * 0.90\n    return tutar\n\n# test koşulu: \"500 TL ve üzeri sepete %10 indirim\"\nsenaryolar = [(\"TC-1\", 499, 499), (\"TC-2\", 500, 450), (\"TC-3\", 1000, 900)]\nizlenebilirlik = {\"GER-7: 500 TL ve üstü %10 indirim\": [\"TC-1\", \"TC-2\", \"TC-3\"]}\nfor kod, girdi, beklenen in senaryolar:\n    sonuc = indirim(girdi)\n    print(kod, \"GECTI\" if abs(sonuc - beklenen) < 1e-9 else \"KALDI\", sonuc)\nprint(izlenebilirlik)"
      },
      {
        "t": "steps",
        "h": "Elle deneme",
        "items": [
          "Kodu kaydet, çalıştır; üç senaryonun geçtiğini gör.",
          "`>= 500` ifadesini `> 500` yap ve yeniden çalıştır.",
          "TC-2 kalır; sınır değer senaryosunun neden değerli olduğunu not et.",
          "İzlenebilirlik sözlüğüne bakarak hangi gereksinimin etkilendiğini bul."
        ]
      },
      {
        "t": "warn",
        "h": "Tuzak",
        "text": "Süreç faaliyetlerini \"önce bitir, sonra sıradakine geç\" diye şelale gibi okumak. Çevik projelerde bu faaliyetler iç içe, kısa döngülerle yürür; aynı ürüne birden çok yinelemede uygulanır."
      }
    ],
    "objectives": [
      {
        "id": "h1",
        "text": "Yedi test ilkesinden en az beşini adlandırıp bir örnekle eşleştirebilirsin."
      },
      {
        "id": "h2",
        "text": "Test süreci faaliyetlerini sıralayıp her birinin amacını söyleyebilirsin."
      },
      {
        "id": "h3",
        "text": "Test koşulu ile test senaryosunu birbirinden ayırabilirsin."
      },
      {
        "id": "h4",
        "text": "Bir gereksinimden test senaryolarına izlenebilirlik kaydı kurabilirsin."
      }
    ],
    "summary": [
      "Test, kusur varlığını gösterir; tam testin imkânsızlığı yüzünden risk ve teknikle seçim yapılır.",
      "Kusurlar kümelenir, testler eskir, test bağlama bağlıdır.",
      "Süreç: planlama, izleme ve kontrol, analiz, tasarım, gerçekleştirme, yürütme, tamamlama.",
      "Koşul neyin test edileceğini, senaryo nasıl deneneceğini söyler; izlenebilirlik ikisini gereksinime bağlar."
    ],
    "prereq": [],
    "minutes": 25,
    "sonDogrulama": "2026-11-06",
    "surum": "1",
    "quiz": [
      {
        "id": "d1120c52",
        "q": "Bir ekip sürekli aynı regresyon paketini çalıştırıyor ve aylardır yeni kusur bulmuyor. Hangi ilkeyi anlatır?",
        "options": [
          "Erken test: kusurlar yaşam döngüsünde ne kadar erken bulunursa o kadar ucuza düzelir",
          "Kusurlar kümelenir: az modül çoğu kusuru taşır",
          "Testler eskir: aynı testler tekrarlandıkça yeni kusur bulma gücünü yitirir",
          "Tam test mümkün değil: bütün girdileri denemek olanaksızdır"
        ],
        "obj": "h1"
      },
      {
        "id": "bb0ba1b6",
        "q": "Gereksinimler yazılırken bir testçi belirsiz cümleyi fark edip analistle konuşuyor. Bu davranış hangi ilkeye uyar?",
        "options": [
          "Testler eskir: aynı testler tekrarlandıkça belirsizlikleri yakalama gücünü kaybeder",
          "Kusursuzluk yanılgısı: hatasız olmak başarı değildir",
          "Testler eskir: tekrar eden testler etkisini kaybeder",
          "Erken test: kusurları kod yazılmadan yakalamak maliyeti düşürür"
        ],
        "obj": "h1"
      },
      {
        "id": "112a727e",
        "q": "Test sürecinde test temelinden \"hangi koşulları test edeceğiz\" listesini çıkarmak hangi faaliyettir?",
        "options": [
          "Test analizi: temelden test koşullarının belirlenmesi",
          "Test tasarımı: koşullardan ayrıntılı senaryolar yazmak",
          "Test yürütme: senaryoların çalıştırılıp sonuçların kaydı",
          "Test tamamlama: bulguların kapatılıp derslerin toplanması"
        ],
        "obj": "h2"
      },
      {
        "id": "c1440736",
        "q": "Bir ekip, plana göre ilerleyişi ölçüp sapmalarda önlem alıyor. Bu hangi faaliyettir?",
        "options": [
          "Test planlama: kapsam, kaynak, takvim ve ölçütlerin başlangıçta belirlenmesi",
          "İzleme ve kontrol: ilerlemeyi plana göre ölçüp düzeltici adım atmak",
          "Test gerçekleştirme: ortam, veri ve betiklerin hazırlanması",
          "Test tamamlama: sürüm sonrası derslerin toplanması"
        ],
        "obj": "h2"
      },
      {
        "id": "f74f4b04",
        "q": "\"Sepet 500 TL ve üzeriyse %10 indirim uygulanır\" cümlesi için hangisi test koşuludur?",
        "options": [
          "Sepet 500 TL iken ödenecek tutar 450 TL olmalıdır, girdi ve çıktı verilmiştir",
          "TC-2 senaryosunun dün gece yürütülmüş sonucu",
          "Sepet toplamına göre indirimin uygulanıp uygulanmaması davranışı",
          "GER-7 gereksiniminin hangi senaryolara bağlandığı tablosu"
        ],
        "obj": "h3"
      },
      {
        "id": "b00982c4",
        "q": "Bir test senaryosunda mutlaka bulunması beklenen bileşim hangisidir?",
        "options": [
          "Yalnız hata raporu ve geliştirici adı",
          "Yalnızca gereksinim numarası, proje adı ve sürüm etiketi",
          "Yalnız önceki sürümün test sonuç sayısı",
          "Girdi, gerekirse ön koşul ve beklenen sonuç"
        ],
        "obj": "h3"
      },
      {
        "id": "1d693f68",
        "q": "GER-7 değişince hangi testlerin gözden geçirilmesi gerektiğini görmek için ne kurulmuş olmalıdır?",
        "options": [
          "Gereksinimden test koşuluna ve senaryolara uzanan izlenebilirlik kaydı",
          "Her senaryo için ayrı bir hata raporu şablonu ve bir sonuç tablosu",
          "Tüm senaryoların tek bir büyük tablo içinde sırayla ve numaralı biçimde listelenmesi",
          "Test ortamı için ayrı bir yedekleme zamanlaması"
        ],
        "obj": "h4"
      }
    ],
    "interview": [
      {
        "q": "Neden her şeyi test edemeyiz?",
        "a": "Girdi ve koşul kombinasyonları çok hızlı büyür; tümünü denemek zaman ve maliyet olarak olanaksızdır. Bu yüzden test teknikleri ve riske göre öncelik kullanılır."
      },
      {
        "q": "Test koşulu ile test senaryosu arasındaki fark nedir?",
        "a": "Koşul test edilecek davranıştır. Senaryo o koşulu denemek için girdi, ön koşul ve beklenen sonucu içeren somut kayıttır; bir koşuldan birden çok senaryo çıkabilir."
      },
      {
        "q": "İzlenebilirlik ne işe yarar?",
        "a": "Gereksinim ile test arasındaki bağı gösterir. Bir gereksinim değişince hangi testlerin etkilendiğini, bir test kalınca hangi gereksinimin risk altında olduğunu görmemi sağlar."
      }
    ],
    "vocab": [
      {
        "term": "test principle",
        "tr": "test ilkesi",
        "ex": "Each test principle describes a general guideline for testing."
      },
      {
        "term": "test condition",
        "tr": "test koşulu",
        "ex": "We derived three test conditions from the requirement."
      },
      {
        "term": "test case",
        "tr": "test senaryosu",
        "ex": "Each test case has an input and an expected result."
      },
      {
        "term": "test basis",
        "tr": "test temeli",
        "ex": "The requirements document is our test basis."
      },
      {
        "term": "traceability",
        "tr": "izlenebilirlik",
        "ex": "Traceability links requirements to test cases."
      },
      {
        "term": "test completion",
        "tr": "test tamamlama",
        "ex": "Test completion collects lessons learned."
      }
    ],
    "sources": [
      {
        "title": "ISTQB Certified Tester Foundation Level (CTFL)",
        "url": "https://www.istqb.org/certifications/certified-tester-foundation-level"
      },
      {
        "title": "ISTQB Glossary",
        "url": "https://glossary.istqb.org"
      }
    ]
  };

  /* 3 ───────────────────────────── Test seviyeleri, türleri ve regresyon */
  L[3] = {
    "hook": "Yeni sürüm bir bina yenilemesi gibidir: önce kapı açılıyor mu bakarsın, sonra tavanı tamir ederken duvarın bozulmadığından emin olursun.",
    "homework": "Küçük bir fonksiyon yaz (ör. KDV hesabı). İki test sınıfı kur: biri \"duman\" gibi hızlı tek test, biri önceden çalışan davranışı koruyan regresyon testleri. Sonra fonksiyonu bozup hangi testin ne dediğini gözle.",
    "warmup": {
      "recap": [
        {
          "point": "Test koşulundan test senaryosu çıkar.",
          "example": "Koşul: indirim; senaryo: 500 TL için 450 TL beklenir."
        }
      ],
      "concepts": [
        {
          "term": "Test levels",
          "tr": "Test seviyeleri",
          "summary": "Testin hangi parça düzeyinde yapıldığını gösteren gruplar: bileşen, bileşen entegrasyonu, sistem, sistem entegrasyonu, kabul.",
          "example": "Tek fonksiyon bileşen düzeyidir; sipariş ile ödeme servisinin birlikte çalışması entegrasyondur."
        },
        {
          "term": "Test types",
          "tr": "Test türleri",
          "summary": "Neyin test edildiğini gösterir: fonksiyonel, fonksiyonel olmayan, kara kutu, beyaz kutu, değişiklikle ilgili testler.",
          "example": "Giriş yapılabiliyor mu (fonksiyonel), 2 saniyede açılıyor mu (fonksiyonel olmayan)"
        },
        {
          "term": "Confirmation / Regression",
          "tr": "Onaylama / Regresyon testi",
          "summary": "Onaylama düzeltmenin tuttuğunu, regresyon değişikliğin başka yeri bozmadığını gösterir.",
          "example": "Hata 42 düzeltildi: önce aynı testi tekrarla, sonra çevresindeki testleri koş."
        },
        {
          "term": "Smoke test",
          "tr": "Duman testi",
          "summary": "Yeni yapının temel işleri ayakta mı diye hızlı bakar; kapsamı sürümden sürüme değişen yaygın kullanımdır, kurum tanımı farklı olabilir.",
          "example": "Uygulama açılıyor mu, giriş çalışıyor mu"
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
        "h": "Gerçek iş talebi",
        "text": "İş ilanı: \"Her sürümde regresyon testlerini yürütecek, hatalı bulunan düzeltmeleri tekrar test edecek QA aranıyor.\" İlan iki farklı işi ayrı sayıyor; ayrımı bilmeden ekibe sorulan sorular karışır."
      },
      {
        "t": "box",
        "h": "Terim notu",
        "text": "Terimler ISTQB sözlüğüyle (glossary.istqb.org) uyumlu kullanıldı. Sözlük sayfası bu çalışmada okunamadığı için tanımların resmî metinle birebir karşılaştırması doğrulanamadı; kesin ifade gerekiyorsa sözlüğe bak."
      },
      {
        "t": "h",
        "text": "Test seviyeleri"
      },
      {
        "t": "p",
        "text": "Test seviyeleri, hangi büyüklükte parçanın test edildiğini anlatır. CTFL çerçevesinde beş seviye vardır; her biri farklı kişi, ortam ve veriyle yapılır."
      },
      {
        "t": "steps",
        "h": "Beş seviye",
        "items": [
          "Bileşen testi: tek modül ya da fonksiyon, genelde geliştirici.",
          "Bileşen entegrasyonu: bileşenlerin birbiriyle arayüzü.",
          "Sistem testi: bütün sistemin uçtan uca davranışı.",
          "Sistem entegrasyonu: sistemin dış sistemlerle ilişkisi.",
          "Kabul testi: kullanıcının ya da müşterinin kabulü için."
        ]
      },
      {
        "t": "h",
        "text": "Test türleri"
      },
      {
        "t": "p",
        "text": "Tür, testin amacına göre ayrılır. Fonksiyonel test \"ne yapıyor\", fonksiyonel olmayan test \"ne kadar iyi yapıyor\" (hız, kullanılabilirlik, güvenlik gibi) sorusuna bakar. Kara kutuda iç yapıya bakılmaz, beyaz kutuda kodun yapısı kullanılır. Bu türler her seviyede uygulanabilir."
      },
      {
        "t": "h",
        "text": "Değişiklikle ilgili testler"
      },
      {
        "t": "p",
        "text": "Onaylama testi, düzeltilen kusurun gerçekten gittiğini tekrar çalıştırarak doğrular. Regresyon testi, değişikliğin daha önce çalışan yerleri bozup bozmadığına bakar. Duman testi ise yeni yapının temel işlevleri ayakta mı diye hızlı bir ilk bakıştır."
      },
      {
        "t": "cmd",
        "lang": "python",
        "calistirma": "atla elle çalıştırılıp doğrulandı: Git Bash, 2026-11-06 (Python 3.12.10)",
        "text": "import unittest\n\ndef kdvli(fiyat, oran=0.20):\n    return round(fiyat * (1 + oran), 2)\n\ndef indirimli(tutar):\n    return tutar * 0.90 if tutar >= 500 else tutar\n\nclass Duman(unittest.TestCase):          # hızlı: temel akış ayakta mı\n    def test_kdv(self):\n        self.assertEqual(kdvli(100), 120.0)\n\nclass Regresyon(unittest.TestCase):      # önceden çalışan davranış bozulmadı mı\n    def test_indirim_siniri(self):\n        self.assertEqual(indirimli(500), 450.0)\n    def test_indirim_yok(self):\n        self.assertEqual(indirimli(499), 499)\n\nif __name__ == \"__main__\":\n    unittest.main(verbosity=2)"
      },
      {
        "t": "steps",
        "h": "Elle deneme",
        "items": [
          "Kodu d3.py olarak kaydet, çalıştır: üç test geçer.",
          "`python -m unittest d3.Duman -v` ile yalnız duman sınıfını çalıştır.",
          "`indirimli` içinde `>= 500` yerine `> 500` yaz.",
          "Tam paketi çalıştır; Regresyon sınıfındaki sınır testi kalır.",
          "Hangi testin bozulan davranışı yakaladığını not et."
        ]
      },
      {
        "t": "box",
        "h": "Sıra",
        "text": "Hata düzeltmesinden sonra önce onaylama testi (düzeltme tuttu mu), ardından regresyon testi (başka yer bozuldu mu) yapılır. Regresyon testleri sık tekrarlandığı için otomasyona en uygun adaylardır."
      },
      {
        "t": "warn",
        "h": "Tuzak",
        "text": "Duman, sağlama (sanity) ve regresyon sözcükleri kurumdan kuruma farklı anlaşılır; özellikle \"sanity\" için tek bir tanım doğrulanamadı. Toplantıda terimi kullanmadan önce karşındakiyle ne kastettiğinizi netleştir."
      }
    ],
    "objectives": [
      {
        "id": "h1",
        "text": "Beş test seviyesini sayıp her birine bir örnek verebilirsin."
      },
      {
        "id": "h2",
        "text": "Fonksiyonel ile fonksiyonel olmayan testi bir örnekte ayırabilirsin."
      },
      {
        "id": "h3",
        "text": "Onaylama ve regresyon testini aynı hata düzeltmesinde doğru sırayla uygulayabilirsin."
      },
      {
        "id": "h4",
        "text": "Küçük bir unittest paketinde duman ve regresyon testlerini ayrı sınıflarda kurabilirsin."
      }
    ],
    "summary": [
      "Seviyeler testin parça büyüklüğünü, türler testin amacını anlatır.",
      "Fonksiyonel test \"ne yapıyor\", fonksiyonel olmayan test \"ne kadar iyi yapıyor\" sorusudur.",
      "Onaylama düzeltmeyi, regresyon çevresini sınar; önce onaylama gelir.",
      "Duman testi hızlı ilk bakıştır; terim kurumlara göre değişebilir."
    ],
    "prereq": [],
    "minutes": 25,
    "sonDogrulama": "2026-11-06",
    "surum": "1",
    "quiz": [
      {
        "id": "c362c088",
        "q": "Bir geliştirici tek bir fiyat hesaplama fonksiyonunu yalıtılmış olarak sınıyor. Hangi seviyedir?",
        "options": [
          "Sistem testi: bütün sistemin uçtan uca davranışı",
          "Kabul testi: müşterinin ürünü onaylaması için yapılır",
          "Sistem entegrasyonu: sistemin dış sistemlerle ilişkisi",
          "Bileşen testi: tek parçanın kendi başına davranışı"
        ],
        "obj": "h1"
      },
      {
        "id": "85b622a2",
        "q": "Sipariş servisinin ödeme servisine doğru veri gönderip göndermediğine bakılıyor. Bu çoğunlukla hangi seviyedir?",
        "options": [
          "Entegrasyon testi: parçalar arası arayüz ve veri alışverişi",
          "Bileşen testi: tek modülün iç mantığını yalıtılmış biçimde sınamak ve raporlamak",
          "Kabul testi: son kullanıcı onayı için yapılır",
          "Duman testi: ilk bakışta çalışıp çalışmadığını görmek"
        ],
        "obj": "h1"
      },
      {
        "id": "64e01034",
        "q": "Giriş sayfasının 2 saniyeden kısa sürede açılması hangi test türüne girer?",
        "options": [
          "Fonksiyonel test: yazılımın hangi işlevleri sağladığını belirtime göre sınamak",
          "Fonksiyonel olmayan test: performans gibi bir kalite özelliği",
          "Onaylama testi: bir düzeltmenin tuttuğunu görmek",
          "Regresyon testi: eski davranışın bozulmadığını görmek"
        ],
        "obj": "h2"
      },
      {
        "id": "9d417217",
        "q": "Kara kutu yaklaşımı için hangisi doğrudur?",
        "options": [
          "Test, kodun her satırının koşulup koşulmadığına göre tasarlanır",
          "Test yalnız geliştirici tarafından kod okunarak yapılır",
          "Test, iç yapıya bakmadan belirtimdeki davranışa göre tasarlanır",
          "Test yalnız performans ölçümü için kullanılır"
        ],
        "obj": "h2"
      },
      {
        "id": "69700542",
        "q": "Kusur 42 düzeltildi. Testçi önce hangi testi çalıştırmalıdır?",
        "options": [
          "Regresyon testi: çevresindeki tüm senaryoları koşmak",
          "Kabul testi: müşterinin onayını almak",
          "Statik analiz: kodu çalıştırmadan taramak",
          "Onaylama testi: kusuru bulan senaryoyu tekrarlamak"
        ],
        "obj": "h3"
      },
      {
        "id": "5168b010",
        "q": "Regresyon testi neden otomasyona uygundur?",
        "options": [
          "Sık tekrarlanır ve her seferinde aynı davranışı yeniden denetler",
          "Her seferinde farklı ve yeni bir davranışı baştan keşfeder ve raporlar",
          "Yalnız bir kez çalıştırıldığı için otomasyon ucuzdur",
          "İnsan gözlemi gerektirdiği için otomasyondan kaçınılır"
        ],
        "obj": "h3"
      },
      {
        "id": "f2fd798f",
        "q": "unittest paketinde yalnız bir sınıfı çalıştırmak için hangi komut biçimi kullanılır?",
        "options": [
          "python -m unittest --only SinifAdi dosya.py",
          "python -m unittest dosya.SinifAdi -v",
          "python dosya.py --class SinifAdi",
          "python -m pytest --unittest SinifAdi dosya.py"
        ],
        "obj": "h4"
      }
    ],
    "interview": [
      {
        "q": "Onaylama testi ile regresyon testi arasındaki fark nedir?",
        "a": "Onaylama düzeltilen kusurun gittiğini kanıtlar. Regresyon, değişikliğin başka yerleri bozup bozmadığını arar. Önce onaylama, sonra regresyon yapılır."
      },
      {
        "q": "Fonksiyonel ve fonksiyonel olmayan test örnekleri ver.",
        "a": "Fonksiyonel: giriş yapılabiliyor mu. Fonksiyonel olmayan: giriş sayfası kaç saniyede açılıyor, kaç eşzamanlı kullanıcıyı kaldırıyor."
      },
      {
        "q": "Duman testi nedir?",
        "a": "Yeni yapının temel işlevleri ayakta mı diye hızlı yapılan ilk kontroldür. Kapsamı kurumlara göre değişebilir; detaylı teste girmeden önce yapının test edilebilir olduğunu gösterir."
      }
    ],
    "vocab": [
      {
        "term": "test level",
        "tr": "test seviyesi",
        "ex": "Component testing is the lowest test level."
      },
      {
        "term": "regression testing",
        "tr": "regresyon testi",
        "ex": "Regression testing checks that old features still work."
      },
      {
        "term": "confirmation testing",
        "tr": "onaylama testi",
        "ex": "Confirmation testing checks whether the fix worked."
      },
      {
        "term": "smoke test",
        "tr": "duman testi",
        "ex": "The smoke test failed, so we rejected the build."
      },
      {
        "term": "black-box testing",
        "tr": "kara kutu testi",
        "ex": "Black-box testing uses the specification only."
      },
      {
        "term": "non-functional",
        "tr": "fonksiyonel olmayan",
        "ex": "Response time is a non-functional requirement."
      }
    ],
    "sources": [
      {
        "title": "ISTQB Certified Tester Foundation Level (CTFL)",
        "url": "https://www.istqb.org/certifications/certified-tester-foundation-level"
      },
      {
        "title": "Python unittest",
        "url": "https://docs.python.org/3/library/unittest.html"
      },
      {
        "title": "ISTQB Glossary",
        "url": "https://glossary.istqb.org"
      }
    ]
  };

  /* 4 ───────────────────────────── Çevik testte QA'nın rolü */
  L[4] = {
    "hook": "Çevik takımda test, sprint sonunda bir kapıdaki nöbetçi değil, yemek pişerken tuzuna bakan aşçıdır.",
    "homework": "Bir kullanıcı hikâyesi seç (\"Kullanıcı olarak parolamı sıfırlamak istiyorum\"). Kod yazmadan önce üç kabul kriteri yaz ve her birinin nasıl test edileceğini bir cümleyle belirt.",
    "warmup": {
      "recap": [
        {
          "point": "Regresyon testi değişiklikten sonra eski davranışı korur.",
          "example": "İndirim sınırı değişince 499 TL hâlâ indirimsiz mi?"
        }
      ],
      "concepts": [
        {
          "term": "Shift-left",
          "tr": "Sola kaydırma",
          "summary": "Test faaliyetlerini sürecin başına, kod yazılmadan öncesine çekmek.",
          "example": "Gereksinimde belirsiz cümleyi toplantıda yakalamak"
        },
        {
          "term": "Acceptance criteria",
          "tr": "Kabul kriterleri",
          "summary": "Bir hikâyenin bitmiş sayılması için karşılanması gereken, test edilebilir koşullar.",
          "example": "Yeni parola en az 8 karakterdir"
        },
        {
          "term": "TDD / BDD / ATDD",
          "tr": "Test güdümlü / Davranış güdümlü / Kabul testi güdümlü geliştirme",
          "summary": "Testi ya da davranış örneğini koddan önce yazan yaklaşımlar.",
          "example": "Önce başarısız test, sonra onu geçiren kod (TDD)"
        },
        {
          "term": "Test pyramid",
          "tr": "Test piramidi",
          "summary": "Alttaki hızlı testler çok, üstteki yavaş testler az olsun diyen model.",
          "example": "Çok sayıda birim testi, az sayıda uçtan uca arayüz testi"
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
        "h": "Gerçek iş talebi",
        "text": "Çevik ekiplerin QA ilanlarında sık görülen cümle: \"Sprint planlamasına katılır, kabul kriterlerini ürün sahibiyle birlikte yazar, testleri geliştirmeyle paralel yürütür.\" Yani test, planlama toplantısında başlıyor."
      },
      {
        "t": "box",
        "h": "Terim notu",
        "text": "Terimler ISTQB sözlüğüyle (glossary.istqb.org) uyumlu kullanıldı. Sözlük sayfası bu çalışmada okunamadığı için tanımların resmî metinle birebir karşılaştırması doğrulanamadı; kesin ifade gerekiyorsa sözlüğe bak."
      },
      {
        "t": "h",
        "text": "Bütün takım yaklaşımı"
      },
      {
        "t": "p",
        "text": "Çevik yazılım geliştirmede kalite herkesin işidir; buna bütün takım yaklaşımı denir. QA, testleri yalnız kendisi yürütmek yerine takıma test düşüncesini taşır: neyi, nasıl, hangi riskle test edeceğimizi birlikte seçeriz."
      },
      {
        "t": "steps",
        "h": "QA'nın tipik katkıları",
        "items": [
          "Hikâye netleştirmede belirsizlik ve eksik koşul sorar.",
          "Ürün sahibiyle test edilebilir kabul kriteri yazar.",
          "Geliştirmeyle paralel keşif ve otomasyon testi yapar.",
          "Retrospektifte süreç ve kalite iyileştirmesi önerir."
        ]
      },
      {
        "t": "h",
        "text": "Sola kaydırma"
      },
      {
        "t": "p",
        "text": "Kusur ne kadar geç bulunursa düzeltme o kadar çok iş demektir. Sola kaydırma, test faaliyetlerini zaman çizgisinde sola, yani kod yazımından önceye çekmektir: gereksinim incelemesi, kabul kriteri örnekleri, birim testi."
      },
      {
        "t": "h",
        "text": "Testi öne alan yaklaşımlar"
      },
      {
        "t": "p",
        "text": "TDD, geliştiricinin önce başarısız bir birim testi yazıp sonra onu geçiren kodu yazmasıdır. BDD, davranışı herkesin okuyabileceği örneklerle (Verilen / Olduğunda / O zaman) tarif eder. ATDD, kabul testlerini iş ve geliştirme birlikte kodlamadan önce belirler."
      },
      {
        "t": "box",
        "h": "Örnek biçim",
        "text": "Verilen: kayıtlı bir kullanıcı var. Olduğunda: 2 harfli bir kullanıcı adı girer. O zaman: \"en az 3 karakter\" uyarısı görür. Bu biçim bir kabul kriteridir ve doğrudan test senaryosuna dönüşür."
      },
      {
        "t": "cmd",
        "lang": "python",
        "calistirma": "atla elle çalıştırılıp doğrulandı: Git Bash, 2026-11-06 (Python 3.12.10)",
        "text": "import unittest\n\ndef kullanici_adi_gecerli(ad):\n    return 3 <= len(ad) <= 12 and ad.isalnum()\n\n# kabul kriteri: \"Kullanıcı adı 3-12 karakter, yalnız harf ve rakam\"\nclass Kabul(unittest.TestCase):\n    def test_gecerli(self):\n        self.assertTrue(kullanici_adi_gecerli(\"ayse42\"))\n    def test_cok_kisa(self):\n        self.assertFalse(kullanici_adi_gecerli(\"ab\"))\n    def test_ozel_karakter(self):\n        self.assertFalse(kullanici_adi_gecerli(\"ayse!\"))\n\nunittest.main(argv=[\"x\"], exit=False, verbosity=2)"
      },
      {
        "t": "h",
        "text": "Test piramidi"
      },
      {
        "t": "p",
        "text": "Alt katta hızlı, ucuz birim testleri çok olur; ortada servis ve entegrasyon testleri; en üstte yavaş ve kırılgan arayüz testleri az sayıda bulunur. Amaç, geri bildirimi hızlı tutmak. Her ekip piramidin oranını kendi bağlamına göre ayarlar."
      },
      {
        "t": "steps",
        "h": "Elle deneme",
        "items": [
          "Hikâye için üç kabul kriteri yaz.",
          "Her kriteri bir unittest metoduna çevir; önce başarısız olsun.",
          "Fonksiyonu yaz, testlerin geçmesini bekle.",
          "`len(ad) <= 12` kısmını sil; hangi kriterin testi artık bunu yakalamıyor, düşün."
        ]
      },
      {
        "t": "warn",
        "h": "Tuzak",
        "text": "Çevik takımda \"QA son sprint gününde test eder\" modelini korumak. Bu, kusurları geç bulmak ve sprinti küçük kutulara bölmeden tüm riski sona yığmak demektir."
      }
    ],
    "objectives": [
      {
        "id": "h1",
        "text": "Çevik takımda QA'nın en az üç katkısını sayabilirsin."
      },
      {
        "id": "h2",
        "text": "Sola kaydırmayı bir örnekle açıklayabilirsin."
      },
      {
        "id": "h3",
        "text": "Bir hikâye için test edilebilir kabul kriteri yazabilirsin."
      },
      {
        "id": "h4",
        "text": "TDD, BDD ve ATDD arasındaki farkı ve test piramidinin yönünü söyleyebilirsin."
      }
    ],
    "summary": [
      "Çevik testte kalite bütün takımın işidir; QA test düşüncesini ve riskleri taşır.",
      "Sola kaydırma test faaliyetlerini sürecin başına çeker.",
      "Kabul kriterleri test edilebilir ve ölçülebilir olmalıdır.",
      "TDD, BDD, ATDD testi öne alır; piramit hızlı testleri çoğaltmayı önerir."
    ],
    "prereq": [],
    "minutes": 25,
    "sonDogrulama": "2026-11-06",
    "surum": "1",
    "quiz": [
      {
        "id": "edc7c482",
        "q": "Çevik takımda QA'nın rolünü en iyi hangisi anlatır?",
        "options": [
          "Bütün takımla birlikte kaliteyi ve riskleri planlama aşamasından itibaren üstlenmek",
          "Sprint sonunda ürünü yalnız başına kabul edip reddeden bir kapı bekçisi olmak ve takımdan ayrı çalışmak",
          "Geliştiricilerin yazdığı kodu satır satır düzeltmek",
          "Yalnızca hata raporlarını toplayıp ürün sahibine iletmek"
        ],
        "obj": "h1"
      },
      {
        "id": "d2ebeb58",
        "q": "Hangisi QA'nın çevik takımdaki tipik katkılarından biri değildir?",
        "options": [
          "Hikâye netleştirme toplantısında eksik koşulları sormak ve belirsiz cümleleri açıklığa kavuşturmak",
          "Üretim ortamında canlı veritabanını kendi kararıyla silmek",
          "Ürün sahibiyle kabul kriterlerini birlikte yazmak",
          "Retrospektifte süreç ve kalite iyileştirmesi önermek"
        ],
        "obj": "h1"
      },
      {
        "id": "78fecada",
        "q": "Gereksinim toplantısında bir testçi \"ödeme başarısız olursa ne olacak?\" diye soruyor. Bu davranış neyin örneğidir?",
        "options": [
          "Regresyon testi: değişiklik sonrası eski davranışın bozulmadığını korumak ve denetlemek",
          "Duman testi: yeni yapının ayakta olup olmadığına bakmak",
          "Sola kaydırma: test düşüncesini kod yazılmadan önceye çekmek",
          "Hata ayıklama: kusurun yerini bulup düzeltmek"
        ],
        "obj": "h2"
      },
      {
        "id": "b81fbf28",
        "q": "Sola kaydırmanın ana kazanımı nedir?",
        "options": [
          "Test sayısını sıfıra indirerek zaman ve emek kazanmak ve riskleri yok saymak",
          "Kusurların hiç oluşmayacağını garanti etmek",
          "Testçinin kod yazmasını yasaklamak",
          "Kusurların daha erken bulunup düzeltme maliyetinin düşmesi"
        ],
        "obj": "h2"
      },
      {
        "id": "0f18b69c",
        "q": "\"Parola en az 8 karakter olmalı\" ifadesi için daha iyi kabul kriteri hangisidir?",
        "options": [
          "Kullanıcı 7 karakterli parola girerse \"en az 8 karakter\" uyarısını görür",
          "Parola alanı güvenli, kullanışlı ve herkes için yeterince anlaşılır olmalıdır",
          "Parola kuralları elden geldiğince sıkı tutulmalıdır",
          "Parola ekranı hızlı ve güzel görünmelidir"
        ],
        "obj": "h3"
      },
      {
        "id": "8dfbe70e",
        "q": "Verilen / Olduğunda / O zaman biçimi hangi yaklaşımla ilişkilidir?",
        "options": [
          "TDD: önce başarısız birim testi yazıp sonra kodu yazmak",
          "BDD: davranışı örneklerle tarif eden ortak dil",
          "Test piramidi: testleri katmanlara dağıtmak",
          "Statik analiz: kodu çalıştırmadan taramak"
        ],
        "obj": "h4"
      },
      {
        "id": "08ea298d",
        "q": "Test piramidinin pratik önerisi hangisidir?",
        "options": [
          "Yalnız uçtan uca arayüz testleri yazmak ve alt katmanları tamamen atlamak",
          "Her katmanda aynı sayıda test tutmak ve oranı hiç değiştirmemek",
          "Alt katmanda çok hızlı test, üst katmanda az arayüz testi",
          "Alt katmanı bırakıp yalnız elle test yapmak"
        ],
        "obj": "h4"
      }
    ],
    "interview": [
      {
        "q": "Çevik takımda QA'nın rolü ne?",
        "a": "Kalite bütün takımın işidir. QA hikâye netleştirmede soru sorar, ürün sahibiyle kabul kriteri yazar, geliştirmeyle paralel test eder, otomasyonu ve süreç iyileştirmesini destekler."
      },
      {
        "q": "Sola kaydırma ne demek?",
        "a": "Test faaliyetlerini sürecin başına, kod yazılmadan öncesine çekmek. Gereksinimde belirsizliği toplantıda yakalamak, kusuru koda girmeden önlemek gibi."
      },
      {
        "q": "İyi bir kabul kriteri nasıl olur?",
        "a": "Somut girdi ve gözlenebilir sonuç içerir, yoruma açık sıfatlardan arınmıştır. Örneğin \"7 karakterli parola için en az 8 karakter uyarısı görülür\" gibi doğrudan teste çevrilebilir."
      }
    ],
    "vocab": [
      {
        "term": "whole-team approach",
        "tr": "bütün takım yaklaşımı",
        "ex": "The whole-team approach makes quality a shared goal."
      },
      {
        "term": "shift-left",
        "tr": "sola kaydırma",
        "ex": "Shift-left moves testing earlier in the process."
      },
      {
        "term": "acceptance criteria",
        "tr": "kabul kriterleri",
        "ex": "The story needs clear acceptance criteria."
      },
      {
        "term": "user story",
        "tr": "kullanıcı hikâyesi",
        "ex": "Each user story has acceptance criteria."
      },
      {
        "term": "test pyramid",
        "tr": "test piramidi",
        "ex": "The test pyramid favors fast unit tests."
      },
      {
        "term": "retrospective",
        "tr": "retrospektif",
        "ex": "We discussed testing problems in the retrospective."
      }
    ],
    "sources": [
      {
        "title": "ISTQB Certified Tester Foundation Level (CTFL)",
        "url": "https://www.istqb.org/certifications/certified-tester-foundation-level"
      },
      {
        "title": "ISTQB Certified Tester Foundation Level Agile Tester",
        "url": "https://www.istqb.org/certifications/certified-tester-foundation-level-agile-tester"
      },
      {
        "title": "Python unittest",
        "url": "https://docs.python.org/3/library/unittest.html"
      }
    ]
  };

  /* 5 ───────────────────────────── Statik test ve gözden geçirme */
  L[5] = {
    "hook": "Yemeği tatmadan önce tarifi okuyup \"tuz yok\" demek, statik testin özüdür: çalıştırmadan bulmak.",
    "homework": "Bir arkadaşının ya da kendi eski kodunun 20 satırını seç. Çalıştırmadan okuyarak en az üç şey bul: belirsiz bir isim, olası sıfıra bölme, eksik bir kontrol. Bulduklarını gözden geçirme notu olarak yaz.",
    "warmup": {
      "recap": [
        {
          "point": "Kabul kriteri test edilebilir olmalıdır.",
          "example": "\"7 karakterli parola reddedilir\" gibi somut bir cümle"
        }
      ],
      "concepts": [
        {
          "term": "Static testing",
          "tr": "Statik test",
          "summary": "Yazılımı çalıştırmadan; belge ve kodu inceleyerek ya da araçla tarayarak yapılan test.",
          "example": "Gereksinim incelemesi, kod incelemesi, statik analiz aracı"
        },
        {
          "term": "Dynamic testing",
          "tr": "Dinamik test",
          "summary": "Yazılımı çalıştırarak yapılan test.",
          "example": "Giriş formuna veri girip sonucu görmek"
        },
        {
          "term": "Review",
          "tr": "Gözden geçirme",
          "summary": "İnsanların bir iş ürününü kusur, eksik ve iyileştirme açısından incelemesi; gayriresmî, walkthrough, teknik inceleme ve inspection türleri vardır.",
          "example": "Gereksinim belgesini ekiple gözden geçirmek"
        },
        {
          "term": "Static analysis",
          "tr": "Statik analiz",
          "summary": "Kodu çalıştırmadan bir araçla, kusur kalıplarını aramak.",
          "example": "Sıfıra bölme, kullanılmayan değişken, söz dizimi hatası"
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
        "h": "Gerçek iş talebi",
        "text": "İş ilanı: \"Gereksinim belgelerini ve kod değişikliklerini gözden geçirecek, otomatik analiz araçlarının sonuçlarını yorumlayacak QA mühendisi.\" Kod hiç çalışmadan bile, belgeden kusur çıkarmak istenen bir beceridir."
      },
      {
        "t": "box",
        "h": "Terim notu",
        "text": "Terimler ISTQB sözlüğüyle (glossary.istqb.org) uyumlu kullanıldı. Sözlük sayfası bu çalışmada okunamadığı için tanımların resmî metinle birebir karşılaştırması doğrulanamadı; kesin ifade gerekiyorsa sözlüğe bak."
      },
      {
        "t": "h",
        "text": "Statik ve dinamik"
      },
      {
        "t": "p",
        "text": "Statik test çalıştırma gerektirmez: belge ve kod okunur ya da araçla taranır. Dinamik test yazılımı çalıştırır. İkisi birbirinin yerine geçmez; farklı kusur türlerini yakalarlar. Statik test gereksinimdeki çelişkiyi bulur, dinamik test ise ancak çalışırken ortaya çıkan davranışı görür."
      },
      {
        "t": "box",
        "h": "Neyi bulur?",
        "text": "Statik test çoğunlukla: gereksinimde çelişki ya da boşluk, tasarım hatası, kodlama standardı ihlali, tanımlanmamış ya da kullanılmayan değişken gibi kusurlardır. Zaman çizelgesinde erken kusur bulmaya uygundur."
      },
      {
        "t": "h",
        "text": "Gözden geçirme türleri"
      },
      {
        "t": "steps",
        "h": "Dört tür (kabaca resmîlik sırasıyla)",
        "items": [
          "Gayriresmî inceleme: tanımlı süreç yok; bir meslektaşa göz attırmak.",
          "Walkthrough: yazar ürünü anlatır, katılımcı öğrenir ve soru sorar.",
          "Teknik inceleme: teknik uzmanlar ortak karar ve görüş toplar.",
          "Inspection: en resmî tür; rol, ölçüt ve ölçüm tanımlıdır."
        ]
      },
      {
        "t": "h",
        "text": "Gözden geçirme süreci ve roller"
      },
      {
        "t": "steps",
        "h": "Süreç (beş faaliyet)",
        "items": [
          "Planlama: kapsam, ölçüt, rol ve takvim.",
          "İncelemeyi başlatma: ürün ve bilgiyi dağıtmak.",
          "Bireysel inceleme: herkes tek başına bulgu çıkarır.",
          "İletişim ve analiz: bulgular tartışılır, karar verilir.",
          "Düzeltme ve raporlama: düzeltmeler yapılır, rapor yazılır."
        ]
      },
      {
        "t": "p",
        "text": "Başlıca roller: yazar (ürünü hazırlayan), yönetici (kaynak ayırır), moderatör (toplantıyı yürütür), kâtip (bulguları kaydeder), gözden geçiren (bulguyu çıkarır). Bir kişi birden çok rolü üstlenebilir; rollerin adları kurumlarda biraz değişebilir."
      },
      {
        "t": "h",
        "text": "Statik analiz araçla"
      },
      {
        "t": "cmd",
        "lang": "python",
        "calistirma": "atla elle çalıştırılıp doğrulandı: Git Bash, 2026-11-06 (Python 3.12.10)",
        "text": "import ast\n\nkaynak = \"def f(a):\\n    return a / 0\\n\"\nagac = ast.parse(kaynak)          # kodu ÇALIŞTIRMADAN yalnız ayrıştırır\nfor dugum in ast.walk(agac):\n    if isinstance(dugum, ast.BinOp) and isinstance(dugum.op, ast.Div) \\\n       and isinstance(dugum.right, ast.Constant) and dugum.right.value == 0:\n        print(f\"satır {dugum.lineno}: sıfıra bölme (statik bulgu)\")\n\ntry:\n    compile(\"if x == 1\\n    pass\\n\", \"ornek.py\", \"exec\")\nexcept SyntaxError as e:\n    print(\"söz dizimi hatası, satır\", e.lineno, \"-\", e.msg)"
      },
      {
        "t": "steps",
        "h": "Elle deneme",
        "items": [
          "Kodu kaydet ve çalıştır; iki statik bulgu yazılır.",
          "`a / 0` ifadesini `a / 2` yap; ilk bulgu kaybolur.",
          "İkinci örnekteki `:` eksiğini tamamla; söz dizimi hatası gider.",
          "Kodun hiçbir yerinde `f` çağrılmadığını fark et: bulgular çalıştırılmadan geldi."
        ]
      },
      {
        "t": "warn",
        "h": "Tuzak",
        "text": "Statik analiz uyarısına körü körüne güvenmek ya da hepsini yok saymak. Araç yanlış alarm (false positive) verebilir; her bulguyu anlayarak değerlendir. Araç bulduğu kadar bulur, gözden geçirmenin yerini tutmaz."
      }
    ],
    "objectives": [
      {
        "id": "h1",
        "text": "Statik ve dinamik testi tanımlayıp aralarındaki farkı söyleyebilirsin."
      },
      {
        "id": "h2",
        "text": "Dört gözden geçirme türünü resmîlik düzeyine göre sıralayabilirsin."
      },
      {
        "id": "h3",
        "text": "Gözden geçirme sürecinin faaliyetlerini sırayla sayabilir, rolleri eşleştirebilirsin."
      },
      {
        "id": "h4",
        "text": "Küçük bir kodda araçla statik bulgu üretip yorumlayabilirsin."
      }
    ],
    "summary": [
      "Statik test çalıştırmadan, dinamik test çalıştırarak yapılır.",
      "Gayriresmî, walkthrough, teknik inceleme ve inspection resmîlik düzeyi artan türlerdir.",
      "İnceleme süreci planlamadan raporlamaya beş faaliyettir; rollerin görev dağılımı net olmalıdır.",
      "Statik analiz kodu çalıştırmadan kusur kalıbı arar; yanlış alarm olabilir."
    ],
    "prereq": [],
    "minutes": 25,
    "sonDogrulama": "2026-11-06",
    "surum": "1",
    "quiz": [
      {
        "id": "e2004568",
        "q": "Çalıştırma gerektirmeyen bir faaliyet olarak aşağıdakilerden hangisi statik test kapsamına girer?",
        "options": [
          "Giriş formuna veri girip sonucu ekranda gözlemlemek ve kaydetmek",
          "Gereksinim belgesini ekiple inceleyip çelişki aramak",
          "Uygulamayı yük altında çalıştırıp hız ölçmek",
          "Düzeltilen hatayı aynı senaryoyla tekrar denemek"
        ],
        "obj": "h1"
      },
      {
        "id": "2a7bfb0e",
        "q": "Statik testin dinamik testten ayıran temel özelliği nedir?",
        "options": [
          "Yalnız geliştiriciler tarafından yapılması",
          "Yalnız sürüm sonunda uygulanabilmesi ve çalıştırma gerektirmesi",
          "Yazılımı çalıştırmadan belge ve kodu incelemesi ya da taraması",
          "Kusur bulma amacı taşımaması"
        ],
        "obj": "h1"
      },
      {
        "id": "33fe6c1f",
        "q": "En resmî gözden geçirme türü hangisidir?",
        "options": [
          "Gayriresmî inceleme: tanımlı süreci olmayan hızlı bakış",
          "Walkthrough: yazarın ürünü anlattığı öğretici toplantı ve biçimsel ölçüm yapan inceleme",
          "Teknik inceleme: uzmanların ortak karar aradığı toplantı",
          "Inspection: tanımlı rol, ölçüt ve ölçümlerle yürüyen inceleme"
        ],
        "obj": "h2"
      },
      {
        "id": "b9512fc2",
        "q": "Yazarın ürünü anlattığı ve katılımcıların öğrenip soru sorduğu gözden geçirme türü hangisidir?",
        "options": [
          "Walkthrough: yazar liderliğinde anlatım ve geri bildirim",
          "Inspection: ölçümle yürüyen resmî inceleme ve katı rol dağılımı",
          "Gayriresmî inceleme: tanımlı süreci olmayan, tek kişilik hızlı bir bakış",
          "Statik analiz: araçla yapılan otomatik tarama"
        ],
        "obj": "h2"
      },
      {
        "id": "78c4d5b9",
        "q": "Bireysel inceleme faaliyeti nedir?",
        "options": [
          "Bulguların ortak toplantıda tartışılıp karara bağlanması ve gerekçelerin kaydı",
          "Her gözden geçirenin ürünü tek başına inceleyip bulgu çıkarması",
          "Düzeltmelerin yapılıp raporun yazılması",
          "Kapsam, takvim ve rollerin belirlenmesi"
        ],
        "obj": "h3"
      },
      {
        "id": "477c49fc",
        "q": "Toplantıyı yürüten ve tartışmayı yöneten rol hangisidir?",
        "options": [
          "Kâtip: bulguları ve kararları kaydeden ve toplantıyı yöneten kişi",
          "Yazar: ürünü hazırlamış olan kişi",
          "Moderatör: gözden geçirme toplantısını yönlendiren kişi",
          "Yönetici: kaynak ve zaman ayıran kişi"
        ],
        "obj": "h3"
      },
      {
        "id": "d35169ad",
        "q": "Python `ast.parse` ile bir koddaki `a / 0` ifadesini bulmak hangi testtir?",
        "options": [
          "Dinamik test: kod çalıştırılıp sonuç gözlemlenir",
          "Walkthrough: yazarın ürünü anlattığı toplantı",
          "Regresyon testi: değişiklik sonrası eski davranış kontrolü",
          "Statik analiz: kod çalıştırılmadan araçla taranır"
        ],
        "obj": "h4"
      }
    ],
    "interview": [
      {
        "q": "Statik test ile dinamik test arasındaki fark nedir?",
        "a": "Statik test yazılımı çalıştırmadan belge ve kodu inceler ya da araçla tarar. Dinamik test çalıştırır. İkisi farklı kusur türlerini yakalar, birbirinin yerine geçmez."
      },
      {
        "q": "Hangi gözden geçirme türlerini biliyorsun?",
        "a": "Gayriresmî inceleme, walkthrough, teknik inceleme ve inspection. Resmîlik ve ölçüm düzeyi bu sırayla artar; inspection en resmî olanıdır."
      },
      {
        "q": "Statik analiz aracı yanlış alarm verirse ne yaparsın?",
        "a": "Bulguyu körü körüne düzeltmem ya da yok saymam. Kodu okuyup gerçek bir kusur mu diye değerlendiririm; yanlış alarmsa kural ayarını ya da istisnayı belgeleyerek yönetirim."
      }
    ],
    "vocab": [
      {
        "term": "static testing",
        "tr": "statik test",
        "ex": "Static testing finds defects without running the code."
      },
      {
        "term": "review",
        "tr": "gözden geçirme",
        "ex": "The team held a review of the requirements."
      },
      {
        "term": "walkthrough",
        "tr": "yürüyüş toplantısı",
        "ex": "The author led a walkthrough of the design."
      },
      {
        "term": "inspection",
        "tr": "denetleme incelemesi",
        "ex": "An inspection follows a formal process."
      },
      {
        "term": "moderator",
        "tr": "moderatör",
        "ex": "The moderator ran the review meeting."
      },
      {
        "term": "static analysis",
        "tr": "statik analiz",
        "ex": "Static analysis flagged an unused variable."
      }
    ],
    "sources": [
      {
        "title": "ISTQB Certified Tester Foundation Level (CTFL)",
        "url": "https://www.istqb.org/certifications/certified-tester-foundation-level"
      },
      {
        "title": "ISTQB Glossary",
        "url": "https://glossary.istqb.org"
      },
      {
        "title": "Python ast",
        "url": "https://docs.python.org/3/library/ast.html"
      }
    ]
  };

})();

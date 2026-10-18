/* Siber güvenlik (Security+ SY0-701 temelli) · sabit dersler 39-42 */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).sec = (window.PP_LESSONS.sec || {}));
  var CT = { title: "CompTIA Security+ sınav hedefleri (SY0-701)", url: "https://www.comptia.org/certifications/security" };
  var PM = { title: "Professor Messer: Security+ SY0-701 (ücretsiz video kursu)", url: "https://www.professormesser.com/", type: "video", length: "Çok bölümlü", level: "başlangıç", lang: "EN" };
  function res(a, why) { var o = {}; for (var k in a) o[k] = a[k]; o.why = why; return o; }

  /* 39 ──────────────────────────────────────────── Aldatma ve bozma teknolojileri */
  L[39] = {
    hook: "Kapıyı zorlayan hırsızı yakalamanın en iyi yolu, içinde hiçbir şey olmayan ama alarmı bağlı bir odayı açık bırakmaktır.",
    homework: "Bir ağda 'normal' sayılan trafiği düşün. Meşru bir kullanıcının asla dokunmaması gereken üç şey yaz (ör. kimsenin kullanmadığı bir sunucu). Biri ona dokunursa bu neden şüpheli olurdu?",
    warmup: {
      recap: [
        {
          point: "Güvenlik operasyonları tespit eder, analiz eder ve yanıt verir.",
          example: "Günlük izleme"
        }
      ],
      concepts: [
        {
          term: "Honeypot",
          tr: "Tuzak sistem",
          summary: "Saldırganı çekmek ve davranışını izlemek için kasıtlı kurulmuş sahte sistem.",
          example: "Gerçek gibi görünen ama hiçbir üretim verisi olmayan sunucu"
        },
        {
          term: "Honeytoken",
          tr: "Tuzak kayıt / sahte kimlik bilgisi",
          summary: "Gerçek bir işlevi olmayan sahte hesap ya da veri kaydı; kullanıldığı anda uyarı üretir.",
          example: "Veritabanında hiçbir müşteriye ait olmayan sahte e-posta adresi"
        }
      ]
    },
    blocks: [
      {
        t: "h",
        text: "Neden öğreniyoruz?"
      },
      {
        t: "box",
        h: "Gerçek talep",
        text: "Güvenlik ekibi her gün binlerce alarm görüyor ve çoğu gürültü. Bir de hiç meşru kullanıcısı olmayan bir sunucu olsaydı? Ona gelen tek bir bağlantı bile dikkate değer olurdu. Aldatma teknolojileri bu mantıkla çalışır: hem erken uyarı verir hem de saldırganın ne yaptığını öğretir."
      },
      {
        t: "steps",
        h: "Aldatma araçları",
        items: [
          "Honeypot: gerçek gibi görünen tek bir tuzak sistem. Amacı çekmek ve davranışı kaydetmektir.",
          "Honeynet: birden çok honeypot'tan oluşan, gerçek bir ağı taklit eden tuzak ağ.",
          "Honeyfile: ağ paylaşımına konmuş cazip görünümlü sahte dosya. Açılırsa ya da kopyalanırsa uyarı gelir.",
          "Honeytoken: sahte kimlik bilgisi veya sahte veri kaydı. Hiçbir meşru süreç onu kullanmaz; kullanılırsa bir yerde sızıntı vardır.",
          "Sahte telemetri: saldırganın ya da zararlının gördüğü ölçüm ve yanıt verilerini yanıltıcı hale getirmek."
        ]
      },
      {
        t: "steps",
        h: "Bozma ve analiz araçları",
        items: [
          "Sandbox: şüpheli dosyayı üretim ağından yalıtılmış bir ortamda çalıştırıp davranışını (dosya, ağ, kayıt defteri) gözlemek.",
          "DNS sinkhole: bilinen zararlı alan adlarının DNS yanıtını güvenli, kontrol edilen bir adrese çevirmek. Zararlıyla iletişimi keser ve hangi cihazların sorguladığını, yani muhtemelen enfekte olduğunu gösterir.",
          "Amaç iki yönlüdür: saldırıyı yavaşlatmak ya da bozmak, ayrıca kanıt ve istihbarat toplamak."
        ]
      },
      {
        t: "box",
        h: "Yanlış alarm neden azalır?",
        text: "Meşru bir kullanıcı sahte hesabı, kullanılmayan sunucuyu ya da yem dosyayı kullanmak için bir sebep bulamaz. Bu yüzden tuzağa gelen etkileşim normal trafiğe göre çok daha yüksek ihtimalle şüphelidir. Yine de ağ tarayıcıları, yedekleme yazılımları gibi sistemler tuzağa dokunabilir; bunları baştan listelemek gerekir."
      },
      {
        t: "steps",
        h: "Güvenli kurulum ilkeleri",
        items: [
          "Tuzağı üretim ağından yalıtmak: ayrı VLAN ya da ayrı segment, üretime geçiş yolu yok.",
          "Tuzakta gerçek veri ve gerçek kimlik bilgisi bulundurmamak; yem için sahte, ama gerçekçi içerik kullanmak.",
          "Tuzağın günlüklerini ayrı ve değiştirilemez biçimde izleme sistemine (SIEM) göndermek.",
          "Kurulumdan önce hukuk, gizlilik ve yönetim onayı almak; yalnızca kendi sahip olduğun sistemlerde çalışmak."
        ]
      },
      {
        t: "warn",
        h: "Hukuki ve etik sınır",
        text: "Tuzak savunma amaçlıdır. Saldırgana karşılık olarak onun sistemlerine girmek (hack back) yasa dışıdır. Çalışanların kişisel cihazlarını haber vermeden tuzak yapmak ya da gerçek müşteri verisini yem olarak kullanmak da kabul edilemez. Tuzakta toplanan veri de gizlilik kurallarına tabidir."
      }
    ],
    objectives: [
      {
        id: "h1",
        text: "Honeypot, honeynet, honeyfile ve honeytoken'ı amaçlarına göre ayırt edebilirsin."
      },
      {
        id: "h2",
        text: "Sandbox, DNS sinkhole ve sahte telemetrinin hangi sorunu çözdüğünü bir senaryoda seçebilirsin."
      },
      {
        id: "h3",
        text: "Bir tuzak sistem tasarımında izolasyon, yanlış alarm ve hukuki sınır açısından doğru kararı seçebilirsin."
      }
    ],
    summary: [
      "Aldatma teknolojilerinin iki amacı vardır: erken uyarı vermek ve saldırgan davranışını öğrenmek.",
      "Honeypot tek bir tuzak sistemdir, honeynet tuzak sistemlerden oluşan ağdır, honeyfile sahte dosyadır, honeytoken ise sahte kimlik bilgisi ya da veri kaydıdır.",
      "Sandbox şüpheli dosyayı yalıtılmış ortamda çalıştırıp gözlemler; DNS sinkhole zararlı alan adlarını kontrollü bir adrese yönlendirerek iletişimi keser ve enfekte cihazları ortaya çıkarır.",
      "Meşru kullanıcının tuzakla işi olmadığı için tuzağa gelen etkileşim yüksek güvenle şüphelidir ve yanlış alarm azalır.",
      "Tuzak üretim ağından yalıtılmalı, gerçek veri içermemeli ve hukuki onayla, yalnızca kendi sistemlerinde kurulmalıdır."
    ],
    quiz: [
      {
        id: "d5691a61",
        q: "Saldırganı çekmek için kasıtlı olarak kurulmuş, gerçek kullanıcıların hiçbir işi olmayan sahte sistem hangisidir?",
        options: [
          "Honeypot",
          "Honeytoken",
          "Sandbox",
          "DNS sinkhole"
        ],
        obj: "h1"
      },
      {
        id: "0e04f688",
        q: "Dosya paylaşımında 'maaslar.xlsx' adında sahte bir dosya duruyor; biri açtığında güvenlik ekibine uyarı gidiyor. Bu düzenek hangisidir?",
        options: [
          "Honeynet",
          "Honeyfile",
          "DNS sinkhole",
          "Sahte telemetri"
        ],
        obj: "h1"
      },
      {
        id: "8d7599eb",
        q: "Kurumdaki birkaç bilgisayar bilinen zararlı bir alan adını sorguluyor. Ekip bu adın DNS yanıtını kendi kontrol ettiği bir sunucuya çevirip sorgulayan cihazları listelemek istiyor. Hangisi uygulanıyor?",
        options: [
          "Honeyfile",
          "Sandbox",
          "DNS sinkhole",
          "Honeytoken"
        ],
        obj: "h2"
      },
      {
        id: "de47b23c",
        q: "Gelen e-postadaki bilinmeyen bir ek zararlı olabilir. Analist, üretim ağına zarar vermeden ekin davranışını incelemek istiyor. En uygun yöntem hangisidir?",
        options: [
          "Eki kendi iş bilgisayarında açıp bakmak",
          "Eki doğrudan dosya sunucusuna kopyalayıp açmak",
          "Eke sahte kimlik bilgisi ekleyip göndericiye geri yollamak",
          "Eki yalıtılmış bir sandbox'ta çalıştırıp davranışını izlemek"
        ],
        obj: "h2"
      },
      {
        id: "be0046a8",
        q: "Ekip, üretim ağıyla aynı VLAN'a bir honeypot kurdu ve içine gerçek bir yönetici hesabının parolasını koydu. Bu tasarımdaki asıl sorun nedir?",
        options: [
          "Honeypot kullanmak başlı başına hukuka aykırıdır",
          "Tuzak sistemin günlük tutması gerekmez",
          "Tuzak üretim ağından yalıtılmamış ve gerçek kimlik bilgisi içeriyor",
          "Honeypot yalnızca bulut ortamında kurulabilir"
        ],
        obj: "h3"
      },
      {
        id: "43fcf6a1",
        q: "Honeytoken kaynaklı uyarıların yanlış alarm oranı neden genellikle düşüktür?",
        options: [
          "Saldırganın trafiğini otomatik olarak şifreleyip etkisiz hale getirir",
          "Meşru bir kullanıcının onu kullanması için bir neden yoktur, bu yüzden kullanımı büyük ihtimalle şüphelidir",
          "Ağdaki bütün tarama araçlarını kalıcı olarak devre dışı bırakır",
          "Saldırganın IP adresini kalıcı olarak değiştirir"
        ],
        obj: "h3"
      },
      {
        id: "6862dce8",
        q: "Bir kurum honeypot kurmayı planlıyor. Hukuki ve etik açıdan en doğru yaklaşım hangisidir?",
        options: [
          "Hukuk ve gizlilik birimlerinin onayıyla, yalnızca kendi sistemlerinde ve kayıt kuralları belli olarak kurmak",
          "Saldırganı yakalamak için onun sistemlerine girip delil toplamak",
          "Yem olarak gerçek müşteri verilerini kullanmak",
          "Çalışanlara haber vermeden kişisel cihazlarını tuzak olarak kullanmak"
        ],
        obj: "h3"
      }
    ],
    interview: [
      {
        q: "Honeypot ile honeytoken arasındaki fark nedir?",
        a: "Honeypot sahte bir sistemdir ve saldırganın davranışını izlemek için kullanılır. Honeytoken ise sahte bir hesap ya da veri kaydıdır; hiçbir meşru kullanımı yoktur, bu yüzden kullanıldığında doğrudan uyarı üretir."
      },
      {
        q: "Bir honeypot kurarken hangi riskleri yönetirsin?",
        a: "Tuzağı üretim ağından yalıtırım, gerçek veri ve kimlik bilgisi koymam, günlükleri ayrı bir yere gönderirim. Hukuk ve yönetim onayı alır, yalnızca kendi sistemlerimde çalışırım."
      },
      {
        q: "DNS sinkhole ne işe yarar?",
        a: "Bilinen zararlı alan adlarının DNS yanıtını kontrollü bir adrese çevirir. Böylece zararlı ile komuta sunucusu arasındaki iletişim kesilir ve sinkhole'a sorgu gönderen cihazlar enfekte aday olarak listelenir."
      }
    ],
    vocab: [
      {
        term: "Honeypot",
        tr: "tuzak sistem",
        ex: "The honeypot logged a scan."
      },
      {
        term: "Honeytoken",
        tr: "tuzak kayıt",
        ex: "A honeytoken triggered the alert."
      },
      {
        term: "Sandbox",
        tr: "yalıtılmış çalışma ortamı",
        ex: "We ran the file in a sandbox."
      },
      {
        term: "Sinkhole",
        tr: "yönlendirme çukuru",
        ex: "The domain points to a sinkhole."
      },
      {
        term: "Decoy",
        tr: "yem / aldatmaca",
        ex: "The decoy server looks real."
      },
      {
        term: "Early warning",
        tr: "erken uyarı",
        ex: "It gives an early warning."
      }
    ],
    resources: [
      res(PM, "Aldatma ve bozma teknolojileri (honeypot, honeyfile, DNS sinkhole)")
    ],
    sources: [
      CT
    ]
  };

  /* 40 ──────────────────────────────────────────── Tespit ve önleme araçları: IDS/IPS, DLP, NAC, EDR/XDR */
  L[40] = {
    hook: "Alarm çalmayan bir saldırı, çalan yüz yanlış alarmdan daha pahalıdır; araçların işi ikisini de dengelemektir.",
    homework: "Bir evi düşün: kapıda kamera, dışarı çıkan paketleri kontrol eden görevli, kapıdan içeri girenin kimliğine bakan güvenlik. Bu üç rolü ağ tarafında hangi araçlarla eşleştirirsin? Tahmin yaz.",
    warmup: {
      recap: [
        {
          point: "Aldatma araçları erken uyarı verir; asıl tespit ağ ve uç nokta izlemesine dayanır.",
          example: "Tuzak sistem uyarısı"
        }
      ],
      concepts: [
        {
          term: "IDS / IPS",
          tr: "Saldırı tespit / önleme sistemi",
          summary: "IDS şüpheli trafiği tespit edip uyarı verir; IPS ise hat üzerinde durup engelleyebilir.",
          example: "IPS, bilinen bir saldırı paketini düşürür"
        },
        {
          term: "DLP",
          tr: "Veri sızıntısı önleme",
          summary: "Hassas verinin kurum dışına izinsiz çıkmasını içerik kurallarıyla yakalayan ya da engelleyen çözüm.",
          example: "Kart numarası içeren e-postayı engellemek"
        }
      ]
    },
    blocks: [
      {
        t: "h",
        text: "Neden öğreniyoruz?"
      },
      {
        t: "box",
        h: "Gerçek talep",
        text: "Bir kurumda yüzlerce cihaz, binlerce bağlantı ve sürekli veri hareketi var. Hepsini insan gözüyle izlemek mümkün değil. Tespit ve önleme araçları ağda, uç noktada ve veri hareketinde nöbet tutar; senin işin hangi aracın hangi soruya cevap verdiğini ve nasıl ayarlanacağını bilmek."
      },
      {
        t: "steps",
        h: "IDS, IPS ve tespit yöntemleri",
        items: [
          "IDS (Intrusion Detection System): trafiği kopya olarak izler, uyarı üretir; engellemez.",
          "IPS (Intrusion Prevention System): hat üzerinde (inline) durur, kötü trafiği düşürebilir. Yanlış kural meşru trafiği de engeller.",
          "İmza tabanlı: bilinen saldırı desenleriyle eşleştirir. Hızlıdır ama yeni ve bilinmeyen saldırıyı kaçırabilir.",
          "Anomali (davranış) tabanlı: normal davranışın modelini öğrenir, sapmayı yakalar. Bilinmeyeni yakalayabilir ama daha çok yanlış alarm verebilir.",
          "Ağ tabanlı (NIDS/NIPS): ağ trafiğini izler. Konak tabanlı (HIDS): tek bir makinenin dosyalarına, günlüklerine ve süreçlerine bakar."
        ]
      },
      {
        t: "steps",
        h: "DLP ve NAC",
        items: [
          "DLP türleri: ağ DLP (hatta çıkan trafik), uç nokta DLP (USB, yazdırma, panoya kopyalama), bulut/e-posta DLP.",
          "DLP kuralları: desen eşleştirme (kart numarası biçimi), anahtar sözcük, veri sınıflandırma etiketi. Eylem: uyar, engelle, karantinaya al ya da şifrele.",
          "NAC (Network Access Control): cihaz ağa bağlanırken kimliğine ve sağlık durumuna (yama, antivirüs) bakar.",
          "802.1X: ağa kabulü, istemci (supplicant), anahtar ya da erişim noktası (authenticator) ve kimlik doğrulama sunucusu (genellikle RADIUS) üçlüsüyle yapar.",
          "Uyumsuz cihaz karantina (onarım) VLAN'ına alınır; düzelince üretim ağına geçirilir."
        ]
      },
      {
        t: "steps",
        h: "EDR, XDR ve tehdit avı",
        items: [
          "EDR (Endpoint Detection and Response): uç nokta telemetrisini toplar, şüpheli davranışı bulur, makineyi ağdan yalıtabilir.",
          "XDR (Extended Detection and Response): uç noktaya ek olarak e-posta, ağ, kimlik ve bulut verisini ilişkilendirir; tek bir olay zincirini görür.",
          "Alarm yönetimi tepkiseldir: gelen alarmı sırala, doğrula, yanıtla.",
          "Tehdit avı (threat hunting) proaktiftir ve hipotezle başlar: 'saldırgan içeride olabilir; şu iz bırakmış olmalı' diyerek veride arar. Avdan çıkan bulgu yeni tespit kuralına dönüşür."
        ]
      },
      {
        t: "box",
        h: "Yanlış pozitif ve yanlış negatif",
        text: "Yanlış pozitif: zararsız şey için alarm. Yanlış negatif: gerçek saldırı için sessizlik. Birini azaltmak çoğu zaman diğerini artırır. Ayar (tuning), kuralı kapatmak değil; eşik, istisna ve kapsamı güvenli biçimde değiştirip test etmektir. Yanlış negatif genellikle daha tehlikelidir, çünkü saldırı fark edilmez."
      },
      {
        t: "warn",
        h: "Tuzak",
        text: "IDS 'engelledi' demez; engelleyen IPS'tir. 'Tek araç yeter' de yanılgıdır: NIDS ağ trafiğini, HIDS konak dosyalarını, DLP veri hareketini, NAC cihaz kabulünü, EDR uç nokta davranışını görür. Katmanlar birbirini tamamlar."
      }
    ],
    objectives: [
      {
        id: "h1",
        text: "IDS ile IPS'i, imza ile anomali tabanlı yöntemi ve NIDS ile HIDS'i birbirinden ayırt edebilirsin."
      },
      {
        id: "h2",
        text: "Bir senaryo için DLP, NAC (802.1X) ya da EDR/XDR çözümlerinden uygun olanı seçebilirsin."
      },
      {
        id: "h3",
        text: "Tehdit avı ile alarm yönetimi farkını ve yanlış pozitif/negatif ayarını doğru yorumlayabilirsin."
      }
    ],
    summary: [
      "IDS yalnızca tespit eder ve uyarı verir; IPS hat üzerinde durup kötü trafiği engelleyebilir.",
      "İmza tabanlı tespit bilinen saldırıları yakalar, anomali tabanlı tespit normalden sapmayı arar ve bilinmeyeni yakalayabilir ama daha çok yanlış alarm üretebilir.",
      "NIDS/NIPS ağ trafiğini, HIDS tek bir konağın dosya ve günlüklerini izler.",
      "DLP içerik kurallarıyla hassas verinin dışarı çıkmasını yakalar; NAC ise 802.1X ve sağlık denetimiyle cihazı ağa kabul eder ya da karantinaya alır.",
      "EDR uç noktayı izleyip makineyi yalıtabilir, XDR birçok kaynağı ilişkilendirir; tehdit avı hipotezle başlayan proaktif araştırmadır, alarm yönetimi ise tepkiseldir."
    ],
    quiz: [
      {
        id: "8d12042b",
        q: "Trafiği hat üzerinde (inline) izleyip kötü amaçlı paketi iletmeden düşürebilen sistem hangisidir?",
        options: [
          "IDS",
          "DLP",
          "IPS",
          "NAC"
        ],
        obj: "h1"
      },
      {
        id: "1f9e1b2b",
        q: "Bilinen saldırı desenlerinin veritabanıyla eşleştirme yapan, yeni ve bilinmeyen saldırıları ise kaçırabilen tespit yöntemi hangisidir?",
        options: [
          "İmza tabanlı tespit",
          "Anomali tabanlı tespit",
          "Kural tabanlı güvenlik duvarı filtresi",
          "Konak tabanlı (HIDS) yerleşim"
        ],
        obj: "h1"
      },
      {
        id: "4bfcbe99",
        q: "Bir misafir, antivirüsü güncel olmayan dizüstü bilgisayarını kablolu porta taktı. Politika, uyumsuz cihazın iç ağa girmemesini ama güncelleme yapabilmesini şart koşuyor. NAC ne yapmalıdır?",
        options: [
          "Cihazı üretim VLAN'ına alıp yalnızca alarm üretmek",
          "Cihazı karantina (onarım) VLAN'ına alıp güncelleme sonrası yeniden değerlendirmek",
          "Kullanıcı adı sorup doğru girilirse tam erişim vermek",
          "Cihazın diskini uzaktan silmek"
        ],
        obj: "h2"
      },
      {
        id: "1deeb1ff",
        q: "Bir çalışanın kredi kartı numarası biçimindeki verileri e-postayla kurum dışına göndermesini içerik kurallarıyla yakalayıp engelleyen çözüm hangisidir?",
        options: [
          "HIDS",
          "NIDS",
          "802.1X",
          "DLP"
        ],
        obj: "h2"
      },
      {
        id: "48785d0d",
        q: "Güvenlik ekibi uç nokta, e-posta, ağ ve bulut telemetrisini tek yerde ilişkilendirip bir saldırı zincirini bütün olarak görmek istiyor. Hangi çözüm bu amaca en uygundur?",
        options: [
          "EDR",
          "XDR",
          "HIDS",
          "NAC"
        ],
        obj: "h2"
      },
      {
        id: "48a13ea4",
        q: "Hiçbir alarm yokken bir analist 'saldırgan zaten içeride olabilir ve düzenli aralıklarla dışarıya bağlantı kuruyordur' varsayımıyla ağ kayıtlarında bunu doğrulayacak izleri arıyor. Bu çalışma hangisidir?",
        options: [
          "Alarm triyajı",
          "Yanlış pozitif ayarı",
          "Zafiyet taraması",
          "Hipotez güdümlü tehdit avı"
        ],
        obj: "h3"
      },
      {
        id: "5d9b91b5",
        q: "Yeni bir IPS kuralı sonrasında yöneticinin meşru yedekleme trafiği engellendi. Bu hangi durumdur ve doğru tepki nedir?",
        options: [
          "Yanlış negatif; IPS'i kalıcı olarak kapatmak",
          "Yanlış pozitif; alarmları yok sayıp hiçbir değişiklik yapmamak",
          "Yanlış pozitif; kural için istisna ya da eşik ayarı yapıp test etmek",
          "Yanlış negatif; yedekleme trafiğini tamamen yasaklamak"
        ],
        obj: "h3"
      }
    ],
    interview: [
      {
        q: "IDS ile IPS arasındaki fark nedir?",
        a: "IDS trafiği izler ve uyarı üretir. IPS ise trafiğin geçtiği hatta durur ve kötü trafiği engelleyebilir. IPS yanlış kuralla meşru trafiği de kesebileceği için daha dikkatli ayarlanır."
      },
      {
        q: "Tehdit avı ile alarm yönetimi nasıl ayrılır?",
        a: "Alarm yönetimi tepkiseldir, gelen uyarıyı doğrular ve yanıtlar. Tehdit avı proaktiftir, bir hipotezle başlar ve alarm olmasa da veride iz arar. Avdan çıkan bulgu yeni tespit kuralına dönüşebilir."
      },
      {
        q: "Bir NAC çözümü cihazı nasıl kabul eder?",
        a: "Cihaz ağa bağlanırken 802.1X ile kimlik doğrulanır, sağlık durumu (yama, antivirüs) denetlenir. Uyumsuz cihaz karantina VLAN'ına alınır, uyumlu cihaz üretim ağına geçirilir."
      }
    ],
    vocab: [
      {
        term: "Intrusion detection",
        tr: "saldırı tespiti",
        ex: "The IDS raised an alert."
      },
      {
        term: "Signature",
        tr: "imza",
        ex: "The rule matches a known signature."
      },
      {
        term: "Anomaly",
        tr: "anomali / sapma",
        ex: "The model flagged an anomaly."
      },
      {
        term: "Endpoint",
        tr: "uç nokta",
        ex: "The endpoint was isolated."
      },
      {
        term: "Threat hunting",
        tr: "tehdit avı",
        ex: "Threat hunting starts with a hypothesis."
      },
      {
        term: "False negative",
        tr: "yanlış negatif",
        ex: "A false negative misses a real attack."
      }
    ],
    resources: [
      res(PM, "IDS/IPS, DLP, NAC ve uç nokta koruma konuları")
    ],
    sources: [
      CT
    ]
  };

  /* 41 ──────────────────────────────────────────── İş etki analizi, risk iştahı ve toleransı */
  L[41] = {
    hook: "Sistem kapandığında önemli olan 'ne bozuldu' değil, 'iş hangi dakikada durur, kaç saatlik veri kaybı kabul edilebilir' sorusudur.",
    homework: "Bir okul ya da küçük işletme seç. Üç sürecini yaz (ör. ödeme alma). Her biri için 'en fazla ne kadar süre kapalı kalabilir?' sorusuna kendi tahminini yaz.",
    warmup: {
      recap: [
        {
          point: "Risk yönetimi riski tanımlar, ölçer ve yanıt seçer.",
          example: "Risk kaydı"
        }
      ],
      concepts: [
        {
          term: "BIA (Business Impact Analysis)",
          tr: "İş etki analizi",
          summary: "Kritik süreçleri, bir kesintinin etkisini ve toparlanma hedeflerini belirleyen çalışma.",
          example: "Sipariş sistemi 15 dakikadan uzun kapalı kalamaz"
        },
        {
          term: "RTO / RPO",
          tr: "Kurtarma süresi / veri kaybı hedefi",
          summary: "RTO sürecin ne kadar sürede geri gelmesi gerektiğini, RPO en fazla ne kadarlık veri kaybının kabul edildiğini söyler.",
          example: "RTO 4 saat, RPO 1 saat"
        }
      ]
    },
    blocks: [
      {
        t: "h",
        text: "Neden öğreniyoruz?"
      },
      {
        t: "box",
        h: "Gerçek talep",
        text: "Yönetim, veri merkezinde yangın çıksa işin ne kadar süre durabileceğini soruyor ve yedekleme için bütçe ayırmak istiyor. Her sisteme en pahalı çözümü almak mümkün değil. İş etki analizi, paranın hangi sürece gitmesi gerektiğini sayılarla gösterir."
      },
      {
        t: "steps",
        h: "BIA ve ölçütler",
        items: [
          "BIA: iş süreçleri ve bağlı oldukları sistemler listelenir, kesinti etkisi (para, itibar, hukuk, güvenlik) puanlanır.",
          "Kritik süreç: durması işi hızla ve ağır biçimde etkileyen süreç; önce korunur.",
          "RTO (Recovery Time Objective): kesintiden sonra sürecin geri gelmesi için hedef süre.",
          "RPO (Recovery Point Objective): kabul edilebilir veri kaybı, zaman olarak. RPO 2 saatse yedek en geç 2 saatte bir alınmalı.",
          "MTTR (Mean Time To Repair): bir arızanın ortalama onarım süresi. MTBF (Mean Time Between Failures): iki arıza arasındaki ortalama çalışma süresi. İkisi de geçmişi ölçer, hedef koymaz."
        ]
      },
      {
        t: "box",
        h: "BC ve DR farkı",
        text: "İş sürekliliği (BC), felaket sırasında ve sonrasında işin sürmesini sağlayan geniş plandır: insan, süreç, alternatif çalışma yeri, iletişim. Felaket kurtarma (DR) bunun BT'ye odaklanan parçasıdır: sistemleri ve veriyi geri getirmek. DR, BC'nin içindedir; ikisi aynı şey değildir."
      },
      {
        t: "steps",
        h: "Risk iştahı, toleransı ve eşiği",
        items: [
          "Risk iştahı (appetite): kurumun hedeflerine ulaşmak için üstlenmeye razı olduğu risk miktarı ve türü; üst yönetim düzeyinde, genel bir ifadedir.",
          "Risk toleransı (tolerance): belirli bir hedef etrafında kabul edilen, ölçülebilir sapma payı.",
          "Risk eşiği (threshold): aşıldığında harekete geçmeyi tetikleyen belirli seviye.",
          "Doğal (inherent) risk: kontroller uygulanmadan önceki risk. Artık (residual) risk: kontrollerden sonra kalan risk.",
          "Artık risk iştahın ya da toleransın üstündeyse ek önlem alınır ya da yönetim kararla kabul eder."
        ]
      },
      {
        t: "steps",
        h: "Risk yanıtları ve BIA'dan karara",
        items: [
          "Azalt: kontrol ekle (yedekleme, çoğaltma, eğitim). Aktar: sigorta ya da hizmet sağlayıcıya devret. Kabul et: bilerek taşı ve belgele. Kaçın: riskli faaliyetten vazgeç.",
          "RTO dakikalarsa ve RPO saniyelerse: sürekli çoğaltma ve sıcak (hot) alternatif site ya da yüksek erişilebilirlik gerekir.",
          "RTO günlerle ölçülüyorsa: daha ucuz soğuk (cold) veya ılık (warm) site ve periyodik yedek yeterli olabilir.",
          "Karar maliyet ve etki karşılaştırmasıyla verilir; her sistem için aynı çözüm seçilmez."
        ]
      },
      {
        t: "warn",
        h: "Tuzak",
        text: "RTO ve RPO'yu karıştırma: RTO süredir (ne kadar sürede geri döner), RPO veri kaybıdır (ne kadar eski noktaya dönülür). Ayrıca risk aktarmak sorumluluğu kaldırmaz; sigorta mali etkiyi devreder, kurumun yükümlülüğü ve itibar kaybı sürer."
      }
    ],
    objectives: [
      {
        id: "h1",
        text: "RTO, RPO, MTTR ve MTBF'yi ve iş sürekliliği ile felaket kurtarma farkını ayırt edebilirsin."
      },
      {
        id: "h2",
        text: "Risk iştahı, risk toleransı, doğal risk ve artık riski birbirinden ayırt edebilirsin."
      },
      {
        id: "h3",
        text: "BIA çıktısına göre yedekleme, alternatif site ve risk yanıtı kararını seçebilirsin."
      }
    ],
    summary: [
      "BIA, kritik süreçleri ve kesintinin etkisini bulur; RTO ve RPO gibi toparlanma hedeflerini bu çalışma doğurur.",
      "RTO sürecin ne kadar sürede geri gelmesi gerektiğini, RPO kabul edilen veri kaybını zaman olarak söyler; MTTR ortalama onarım süresi, MTBF iki arıza arası ortalama süredir.",
      "Felaket kurtarma (DR) BT sistemlerini ve veriyi geri getirmeye odaklanır ve iş sürekliliği planının (BC) bir parçasıdır.",
      "Risk iştahı kurumun üstlenmeye razı olduğu genel risk düzeyidir, tolerans hedef çevresindeki ölçülebilir sapma payı, eşik ise harekete geçiren seviyedir.",
      "Doğal risk kontrollerden önceki, artık risk kontrollerden sonraki risktir; risk azaltılır, aktarılır, kabul edilir ya da kaçınılır."
    ],
    quiz: [
      {
        id: "f9952a8c",
        q: "Bir kesintiden sonra sürecin ne kadar sürede yeniden çalışır olması gerektiğini söyleyen hedef değer hangisidir?",
        options: [
          "RPO",
          "MTBF",
          "MTTR",
          "RTO"
        ],
        obj: "h1"
      },
      {
        id: "293dcfd2",
        q: "Son yedek 6 saat önce alınmış, kurumun RPO'su ise 2 saat. Durum nedir?",
        options: [
          "RPO aşılıyor; yedek aralığı en çok 2 saate indirilmeli",
          "RPO sağlanıyor, çünkü bir yedek mevcut",
          "Sorun RTO ile ilgilidir, yedek aralığı değişmemeli",
          "MTBF yükseltilirse sorun kendiliğinden çözülür"
        ],
        obj: "h1"
      },
      {
        id: "a1bfb5a7",
        q: "Felaket kurtarma (DR) planı, iş sürekliliği (BC) planına göre nasıl tanımlanır?",
        options: [
          "BC'den bağımsız, yalnızca yangın söndürmeyi anlatan plan",
          "Riskin sigortaya aktarılmasını anlatan mali plan",
          "BC'nin içinde yer alan, BT sistemleri ve verinin felaket sonrası geri getirilmesine odaklanan plan",
          "Yıllık risk değerlendirmesinin raporu"
        ],
        obj: "h1"
      },
      {
        id: "eae4196d",
        q: "Yönetim kurulu 'yeni pazarlarda büyümek için orta düzeyde risk almaya razıyız' diyor. Bu ifade hangi kavramı anlatır?",
        options: [
          "Artık risk",
          "Risk iştahı",
          "Doğal risk",
          "MTTR"
        ],
        obj: "h2"
      },
      {
        id: "0d33771d",
        q: "Güvenlik duvarı, eğitim ve yedekleme gibi kontroller uygulandıktan sonra geriye kalan risk nasıl adlandırılır?",
        options: [
          "Doğal (inherent) risk",
          "Risk iştahı",
          "Risk eşiği",
          "Artık (residual) risk"
        ],
        obj: "h2"
      },
      {
        id: "1b418415",
        q: "BIA'da sipariş sisteminin RTO'su 15 dakika, RPO'su birkaç saniye çıktı. Hangi çözüm bu hedefleri karşılar?",
        options: [
          "Sürekli veri çoğaltmalı sıcak (hot) site ya da yüksek erişilebilirlik",
          "Haftalık bantlı yedek ve soğuk (cold) site",
          "Ayda bir manuel disk kopyası",
          "Yalnızca sigorta yaptırmak"
        ],
        obj: "h3"
      },
      {
        id: "83a3f60d",
        q: "Deprem riski taşıyan bir bölgedeki tek veri merkezi için kurum, olası hasarın büyük bölümünü bir sigorta şirketine devrediyor. Bu risk yanıtı hangisidir?",
        options: [
          "Kaçınma",
          "Kabul etme",
          "Aktarma",
          "Azaltma"
        ],
        obj: "h3"
      }
    ],
    interview: [
      {
        q: "RTO ile RPO arasındaki fark nedir?",
        a: "RTO sürecin kesintiden sonra ne kadar sürede geri gelmesi gerektiğidir. RPO ise en fazla ne kadarlık veri kaybının kabul edildiğidir; yedek sıklığını belirler."
      },
      {
        q: "Risk iştahı ile risk toleransı nasıl ayrılır?",
        a: "İştah, kurumun hedefleri için üstlenmeye razı olduğu genel risk düzeyidir. Tolerans bunun operasyonel ve ölçülebilir karşılığıdır, yani bir hedef çevresinde kabul edilen sapma payıdır."
      },
      {
        q: "BIA sonucu bir yedekleme kararını nasıl etkiler?",
        a: "BIA kritik süreçlerin RTO ve RPO değerlerini verir. Kısa RTO ve RPO için çoğaltma ve sıcak site gerekir; uzun süreler için daha ucuz yedek ve soğuk ya da ılık site yeterli olabilir."
      }
    ],
    vocab: [
      {
        term: "Business impact analysis",
        tr: "iş etki analizi",
        ex: "The BIA ranks critical processes."
      },
      {
        term: "Recovery time objective",
        tr: "kurtarma süresi hedefi",
        ex: "The recovery time objective is four hours."
      },
      {
        term: "Recovery point objective",
        tr: "kurtarma noktası hedefi",
        ex: "The recovery point objective is one hour."
      },
      {
        term: "Residual risk",
        tr: "artık risk",
        ex: "Residual risk remains after controls."
      },
      {
        term: "Risk appetite",
        tr: "risk iştahı",
        ex: "Risk appetite is set by leadership."
      },
      {
        term: "Failover",
        tr: "yedeğe geçiş",
        ex: "Failover took ten minutes."
      }
    ],
    resources: [
      res(PM, "İş sürekliliği, felaket kurtarma ve risk yönetimi konuları")
    ],
    sources: [
      CT
    ]
  };

  /* 42 ──────────────────────────────────────────── Sızma testi türleri ve keşif */
  L[42] = {
    hook: "Kendi kapını bir uzmana yazılı izinle denettirmek, kapıyı başkasının denemesini beklemekten çok daha ucuzdur.",
    homework: "Bir kurumun sana bir sızma testi yaptıracağını düşün. Teste başlamadan önce yazılı olması gereken üç şey ne olurdu? Üç madde yaz.",
    warmup: {
      recap: [
        {
          point: "Zafiyet taraması bilinen açıkları listeler; önceliklendirme yapılır.",
          example: "CVSS puanı"
        }
      ],
      concepts: [
        {
          term: "Penetration test",
          tr: "Sızma testi",
          summary: "Kurumun yazılı iznine ve kapsamına dayanarak güvenlik önlemlerinin gerçekten aşılıp aşılamayacağını denemek ve raporlamak.",
          example: "Dışa açık web uygulamasının yetkili testi"
        },
        {
          term: "Rules of Engagement (RoE)",
          tr: "Etkileşim kuralları",
          summary: "Testin kapsamını, zamanını, izin verilen yöntemleri ve acil iletişim kurallarını yazan belge.",
          example: "Yalnızca hafta sonu 02:00-05:00, üretim veritabanına yazma yok"
        }
      ]
    },
    blocks: [
      {
        t: "h",
        text: "Neden öğreniyoruz?"
      },
      {
        t: "box",
        h: "Gerçek talep",
        text: "Yönetim 'güvenlik duvarımız ve yamalarımız var, peki gerçekten dayanıklı mıyız?' diye soruyor. Cevabı, yetkili bir ekibin kontrollü biçimde denemesi ve bulguları kanıtlı bir raporla vermesidir. Bu dersin odağı yetkili testi planlamak, kapsamı belirlemek ve raporu okuyup düzeltmeyi doğrulamaktır; saldırı adımları değil."
      },
      {
        t: "steps",
        h: "Bilgi düzeyine göre test türleri",
        items: [
          "Bilinen ortam (beyaz kutu): test ekibine ağ şeması, kaynak kod, hesaplar gibi geniş bilgi verilir. Derin ve verimli inceleme yapar.",
          "Kısmen bilinen ortam (gri kutu): sınırlı bilgi verilir, örneğin sıradan bir kullanıcı hesabı.",
          "Bilinmeyen ortam (kara kutu): neredeyse hiç bilgi verilmez; dışarıdan bir saldırganın bakış açısını taklit eder.",
          "Bilgi arttıkça süre ve maliyet çoğunlukla düşer, ama gerçekçilik azalır; seçim hedefe bağlıdır."
        ]
      },
      {
        t: "steps",
        h: "Keşif: pasif ve aktif",
        items: [
          "Pasif keşif: hedefe doğrudan dokunmadan herkese açık kaynaklardan bilgi toplamak (OSINT): alan adı kayıtları, iş ilanları, sosyal medya, arama motorları.",
          "Aktif keşif: hedefle doğrudan etkileşim kuran çalışma, örneğin canlı sistemleri ve açık servisleri bulmak. Hedefin günlüklerinde iz bırakır ve izin gerektirir.",
          "İzin yalnızca yazılı kapsamdaki sistemler için geçerlidir; kapsam dışına çıkmak yetkisiz erişimdir."
        ]
      },
      {
        t: "steps",
        h: "Yetkilendirme ve roller",
        items: [
          "Kapsam: hangi sistemler, hangi ağlar, hangi tarih ve saatler testte; hangileri kesinlikle dışarıda.",
          "Yazılı izin: testi yaptıracak yetkili kişinin imzaladığı onay. Sözlü izin yetmez.",
          "RoE: izin verilen yöntemler, acil iletişim, durdurma koşulları, veri koruma ve gizlilik.",
          "Kırmızı takım saldırgan rolünü yetkiyle oynar, mavi takım savunur, mor takım iki tarafı koordine edip tespitlerin iyileşmesini sağlar.",
          "Bug bounty: kapsamı ve kuralları yayımlanmış bir programa katılan bağımsız araştırmacıların bulgu bildirip ödül alabildiği model."
        ]
      },
      {
        t: "box",
        h: "Türler ve rapor",
        text: "Test fiziksel (bina, kapı, rozet), ağ (iç ve dış ağ cihazları) ya da çevrimiçi/uygulama (web, API) alanında olabilir. Rapor yönetici özeti, bulguların şiddet sıralaması, kanıt ve düzeltme önerisi içerir. Düzeltmeden sonra aynı bulguların gerçekten kapandığı yeniden test ile doğrulanır."
      },
      {
        t: "warn",
        h: "Tuzak",
        text: "Zafiyet taraması sızma testi değildir. Tarama bilinen açıkları otomatik listeler ve yanlış pozitif üretebilir; sızma testi insan yargısıyla bulguları doğrular, zincirler ve gerçek etkiyi gösterir. Yazılı izin ve kapsam olmadan yapılan her deneme, niyet ne olursa olsun yasa dışıdır."
      }
    ],
    objectives: [
      {
        id: "h1",
        text: "Bilinen, kısmen bilinen ve bilinmeyen ortam testlerini ve pasif ile aktif keşfi ayırt edebilirsin."
      },
      {
        id: "h2",
        text: "Kapsam, yazılı izin, RoE ile kırmızı, mavi ve mor takım ile bug bounty modelini ayırt edebilirsin."
      },
      {
        id: "h3",
        text: "Tarama ile sızma testi farkını ve rapor sonrası düzeltme doğrulama adımını seçebilirsin."
      }
    ],
    summary: [
      "Sızma testi, yazılı izin ve belirlenmiş kapsam içinde güvenlik önlemlerinin gerçekten aşılıp aşılamadığını deneyen ve raporlayan yetkili çalışmadır.",
      "Bilinen ortam (beyaz kutu) testinde geniş bilgi, kısmen bilinen (gri kutu) testte sınırlı bilgi verilir; bilinmeyen ortam (kara kutu) testinde neredeyse bilgi verilmez.",
      "Pasif keşif hedefe doğrudan dokunmadan açık kaynaklardan bilgi toplar, aktif keşif hedefle doğrudan etkileşir ve yazılı izin gerektirir.",
      "Kapsam, yazılı izin ve RoE testin sınırlarını çizer; kırmızı takım saldırı, mavi takım savunma, mor takım koordinasyon rolündedir, bug bounty ise yayımlanmış kurallarla bağımsız araştırmacıları davet eder.",
      "Zafiyet taraması sızma testi değildir; test sonunda rapor verilir ve düzeltmeler yeniden testle doğrulanır."
    ],
    quiz: [
      {
        id: "fce04be7",
        q: "Test ekibine ağ şeması, kaynak kodu ve yönetici hesabı verilerek yapılan test hangisidir?",
        options: [
          "Bilinmeyen ortam testi (kara kutu)",
          "Bilinen ortam testi (beyaz kutu)",
          "Kısmen bilinen ortam testi (gri kutu)",
          "Bug bounty programı"
        ],
        obj: "h1"
      },
      {
        id: "4a5cd137",
        q: "Test ekibi hedef kuruma doğrudan paket göndermeden alan adı kayıtlarından, iş ilanlarından ve herkese açık sosyal medya sayfalarından bilgi topluyor. Bu çalışma hangisidir?",
        options: [
          "Pasif keşif",
          "Aktif keşif",
          "Kırmızı takım operasyonu",
          "Düzeltme doğrulaması"
        ],
        obj: "h1"
      },
      {
        id: "ee513795",
        q: "Teste başlamadan önce, testin hangi sistemlerde, hangi saatlerde ve hangi yöntemlerle yapılabileceğini ve acil durumda kimlerin aranacağını belirleyen belge hangisidir?",
        options: [
          "Olay sonrası inceleme raporu",
          "İş etki analizi",
          "Zafiyet tarama çıktısı",
          "Rules of Engagement (etkileşim kuralları)"
        ],
        obj: "h2"
      },
      {
        id: "fb04f1bc",
        q: "Bir kurum, saldırgan taklidi yapan ekip ile savunma ekibinin bulgularını birlikte inceleyip tespitleri iyileştirmeyi koordine edecek bir yapı istiyor. Hangi takım rolü bunu üstlenir?",
        options: [
          "Kırmızı takım",
          "Mavi takım",
          "Mor takım",
          "Bug bounty araştırmacıları"
        ],
        obj: "h2"
      },
      {
        id: "049b4020",
        q: "Bir yönetici 'tarama aracının çıktısını aldık, yani sızma testi yaptırdık' diyor. Bu neden yanlıştır?",
        options: [
          "Tarama, sızma testinden her zaman daha derin sonuç verir",
          "Tarama bilinen açıkları listeler; sızma testi ise yetkiyle bulguları doğrulayıp gerçek etkiyi gösterir",
          "Sızma testi yalnızca otomatik araç çıktısından oluşur",
          "İkisi arasında fark yoktur, yalnızca adları farklıdır"
        ],
        obj: "h3"
      },
      {
        id: "8683e526",
        q: "Rapor sunuldu ve ekip kritik bulguları düzeltti. Sızma testi sürecinin bir sonraki adımı ne olmalıdır?",
        options: [
          "Düzeltmelerin bulguları gerçekten kapattığını yeniden testle doğrulamak",
          "Raporu arşivleyip bulguları kapalı saymak",
          "Tüm bulguları 'kabul edilen risk' olarak işaretlemek",
          "Testi yazılı izin almadan kapsam dışı sistemlere genişletmek"
        ],
        obj: "h3"
      },
      {
        id: "d4face8a",
        q: "Bug bounty programı ile kurumun sözleşmeli bir firmaya yaptırdığı sızma testi arasındaki temel fark hangisidir?",
        options: [
          "Bug bounty'de kapsam ve kural yoktur, herkes her sistemi deneyebilir",
          "Bug bounty yalnızca fiziksel güvenlik testlerini kapsar",
          "Bug bounty'de kapsam ve kuralları yayımlanmış programa çok sayıda bağımsız araştırmacı katılır; ödül genellikle bulgu karşılığı verilir",
          "Sızma testinde yazılı izin gerekmez, bug bounty'de gerekir"
        ],
        obj: "h2"
      }
    ],
    interview: [
      {
        q: "Zafiyet taraması ile sızma testi arasındaki fark nedir?",
        a: "Tarama otomatik araçla bilinen açıkları listeler ve yanlış pozitif içerebilir. Sızma testi yazılı izinle, insan yargısıyla bulguları doğrular, zincirler ve gerçek etkiyi kanıtlı bir raporla gösterir."
      },
      {
        q: "Teste başlamadan önce neleri yazılı hale getirirsin?",
        a: "Kapsamı, yazılı izni ve etkileşim kurallarını (RoE): hangi sistemler, hangi saatler, hangi yöntemler, acil iletişim kişileri, durdurma koşulları ve veri koruma kuralları."
      },
      {
        q: "Kırmızı, mavi ve mor takım nasıl ayrılır?",
        a: "Kırmızı takım yetkiyle saldırgan rolünü oynar, mavi takım savunur ve tespit eder, mor takım iki tarafın bilgisini birleştirip tespit ve savunmanın gelişmesini sağlar."
      }
    ],
    vocab: [
      {
        term: "Penetration test",
        tr: "sızma testi",
        ex: "The penetration test was authorized."
      },
      {
        term: "Scope",
        tr: "kapsam",
        ex: "The scope lists only two subnets."
      },
      {
        term: "Rules of engagement",
        tr: "etkileşim kuralları",
        ex: "The rules of engagement were signed."
      },
      {
        term: "Reconnaissance",
        tr: "keşif",
        ex: "Passive reconnaissance uses public data."
      },
      {
        term: "Bug bounty",
        tr: "açık ödül programı",
        ex: "The company runs a bug bounty."
      },
      {
        term: "Retest",
        tr: "yeniden test",
        ex: "We did a retest after the fix."
      }
    ],
    resources: [
      res(PM, "Sızma testi türleri, keşif ve rapor süreci")
    ],
    sources: [
      CT
    ]
  };

})();

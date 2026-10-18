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
      { id: "48cca087", q: "Saldırganı çekmek için kasıtlı olarak kurulmuş, gerçek kullanıcıların işi olmayan sahte sistem hangisidir?", options: ["Honeytoken (sahte kimlik kaydı)","Sandbox (yalıtılmış çalıştırma)","Honeypot (tuzak sistem)","DNS sinkhole (alan adı yönlendirme)"], obj: "h1" },
      { id: "16bddbd7", q: "Dosya paylaşımında 'maaslar.xlsx' adında sahte bir dosya duruyor; biri açtığında güvenlik ekibine uyarı gidiyor. Bu düzenek hangisidir?", options: ["Honeyfile (yem dosya)","Honeynet (tuzak ağ)","DNS sinkhole (yönlendirme)","Sahte telemetri (yanıltıcı ölçüm)"], obj: "h1" },
      { id: "5b41ca03", q: "Birkaç bilgisayar bilinen zararlı bir alan adını sorguluyor. Ekip bu adın DNS yanıtını kendi kontrol ettiği bir sunucuya çevirip sorgulayan cihazları listelemek istiyor. Hangisi uygulanıyor?", options: ["Honeyfile (yem dosya)","Sandbox (yalıtılmış ortam)","Honeytoken (sahte kimlik kaydı)","DNS sinkhole (yönlendirme)"], obj: "h2" },
      { id: "f2a1c9d4", q: "Gelen e-postadaki bilinmeyen bir ek zararlı olabilir. Analist, üretim ağına zarar vermeden ekin davranışını incelemek istiyor. En uygun yöntem hangisidir?", options: ["Eki iş bilgisayarında açıp virüs tarayıcısıyla birlikte incelemek","Eki yalıtılmış bir sandbox'ta çalıştırıp davranışını izlemek","Eki dosya sunucusuna kopyalayıp orada davranışını gözlemek","Eki göndericiye sahte kimlik bilgisiyle yanıtlayıp tepkisini izlemek"], obj: "h2" },
      { id: "55f4a5d0", q: "Ekip, üretim ağıyla aynı VLAN'a bir honeypot kurdu ve içine gerçek bir yönetici hesabının parolasını koydu. Bu tasarımdaki asıl sorun nedir?", options: ["Honeypot kullanmak başlı başına hukuka aykırıdır","Tuzakta günlük tutmak saldırganın davranışını bozduğu için gereksizdir","Tuzak üretim ağından yalıtılmamış ve gerçek kimlik bilgisi içeriyor","Honeypot yalnızca bulut ortamında, üretim ağının dışında kurulabilir"], obj: "h3" },
      { id: "177f6ac1", q: "Honeytoken kaynaklı uyarıların yanlış alarm oranı neden genellikle düşüktür?", options: ["Meşru bir kullanıcının onu kullanmak için nedeni yoktur; kullanım şüphelidir","Saldırganın trafiğini otomatik olarak şifreleyip tuzağa yönlendirerek etkisiz hale getirir","Ağ tarayıcılarını ve yedekleme yazılımlarını devre dışı bırakır","Saldırganın IP adresini değiştirip izini kaybettirir"], obj: "h3" },
      { id: "ed3403ea", q: "Bir kurum honeypot kurmayı planlıyor. Hukuki ve etik açıdan en doğru yaklaşım hangisidir?", options: ["Saldırganı yakalamak için onun sistemlerine girip delil toplayarak olayı kanıtlamak","Yem olarak gerçek müşteri kayıtlarını kullanıp tuzağı daha inandırıcı hale getirmek","Çalışanlara haber vermeden kişisel cihazlarını tuzak olarak kullanmak","Hukuk onayı alıp yalnızca kendi sistemlerinde, kayıt kuralları belli olarak kurmak"], obj: "h3" },
      { id: "0f8719fc", q: "Ekip, birden çok tuzak sunucudan oluşan ve gerçek bir kurum ağını taklit eden yalıtılmış bir ortam kuruyor. Bu düzenek hangisidir?", options: ["Honeypot (tek tuzak sistem)","Honeynet (tuzak ağ)","Honeyfile (yem dosya)","DNS sinkhole (yönlendirme)"], obj: "h1" },
      { id: "b7f3274a", q: "Savunma ekibi, saldırganın ya da zararlının gördüğü sensör ve ölçüm yanıtlarını bilerek yanıltıcı hale getiriyor. Bu teknik hangisidir?", options: ["Honeytoken (sahte kimlik kaydı)","Sandbox (yalıtılmış ortam)","Sahte telemetri (yanıltıcı ölçüm)","DNS sinkhole (yönlendirme)"], obj: "h2" }
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
      { id: "152114ac", q: "Trafiği hat üzerinde (inline) izleyip kötü amaçlı paketi iletmeden düşürebilen sistem hangisidir?", options: ["IPS (hat üzerinde engeller)","IDS (kopya trafikte uyarı verir)","DLP (veri sızıntısı önleme)","NAC (ağ erişim denetimi)"], obj: "h1" },
      { id: "2be13142", q: "Bilinen saldırı desenlerinin veritabanıyla eşleştirme yapan, yeni ve bilinmeyen saldırıları ise kaçırabilen tespit yöntemi hangisidir?", options: ["Anomali tabanlı tespit","Kural tabanlı güvenlik duvarı filtresi","Konak tabanlı (HIDS) yerleşim","İmza tabanlı tespit"], obj: "h1" },
      { id: "2eb0ecee", q: "NIDS ile HIDS farkını doğru anlatan ifade hangisidir?", options: ["NIDS tek bir makinenin dosya ve günlüklerini, HIDS ağ trafiğini izler","NIDS ağ trafiğini, HIDS tek bir makinenin dosya, süreç ve günlüklerini izler","NIDS yalnızca trafiği engeller, HIDS yalnızca uyarı verir","NIDS yalnızca bulutta, HIDS yalnızca yerel ağda çalışır"], obj: "h1" },
      { id: "03dee3d5", q: "Bir misafir, antivirüsü güncel olmayan dizüstü bilgisayarını kablolu porta taktı. Politika, uyumsuz cihazın iç ağa girmemesini ama güncelleme yapabilmesini şart koşuyor. NAC ne yapmalıdır?", options: ["Üretim VLAN'ına alıp antivirüs güncellemesi için kullanıcıya e-posta atmak","Kullanıcı kimliğini doğrulayıp sağlık denetimini sonraya bırakarak tam erişim vermek","Karantina VLAN'ına alıp güncelleme sonrası yeniden değerlendirmek","Cihazın diskini uzaktan silip işletim sistemini yeniden kurmak"], obj: "h2" },
      { id: "cf634671", q: "Bir çalışanın kredi kartı numarası biçimindeki verileri e-postayla kurum dışına göndermesini içerik kurallarıyla yakalayıp engelleyen çözüm hangisidir?", options: ["DLP (veri sızıntısı önleme)","HIDS (konak tabanlı tespit)","NIDS (ağ tabanlı tespit)","802.1X (port tabanlı kimlik doğrulama)"], obj: "h2" },
      { id: "b6568bbe", q: "Güvenlik ekibi uç nokta, e-posta, ağ ve bulut telemetrisini tek yerde ilişkilendirip bir saldırı zincirini bütün olarak görmek istiyor. Hangi çözüm bu amaca en uygundur?", options: ["EDR (uç nokta tespit ve yanıt)","HIDS (konak tabanlı tespit)","NAC (cihaz kabulü ve sağlık denetimi)","XDR (genişletilmiş tespit ve yanıt)"], obj: "h2" },
      { id: "00f0f2c5", q: "Bir dizüstü bilgisayarda şüpheli süreç davranışı görüldü. Ekip, uç nokta telemetrisini inceleyip makineyi ağdan yalıtmak istiyor. Hangi çözüm bu işi yapar?", options: ["NAC (ağ erişim denetimi)","EDR (uç nokta tespit ve yanıt)","DLP (veri sızıntısı önleme)","IDS (kopya trafikte uyarı verir)"], obj: "h2" },
      { id: "18d1a876", q: "Hiçbir alarm yokken bir analist 'saldırgan zaten içeride olabilir ve düzenli aralıklarla dışarıya bağlantı kuruyordur' varsayımıyla ağ kayıtlarında bunu doğrulayacak izleri arıyor. Bu çalışma hangisidir?", options: ["Alarm triyajı ve olay sıralaması","Yanlış pozitif oranını düşürme ayarı","Hipotez güdümlü tehdit avı","Zafiyet taraması (bilinen açık listesi)"], obj: "h3" },
      { id: "80af0261", q: "Yeni bir IPS kuralı sonrasında yöneticinin meşru yedekleme trafiği engellendi. Bu hangi durumdur ve doğru tepki nedir?", options: ["Yanlış pozitif; kurala istisna ya da eşik ayarı yapıp test etmek","Yanlış negatif; IPS'i kalıcı olarak kapatıp tüm kuralları silmek","Yanlış pozitif; alarmları yok sayıp kuralı olduğu gibi bırakmak","Yanlış negatif; yedekleme trafiğini baştan yasaklamak"], obj: "h3" }
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
          "MTTR (Mean Time To Repair): bir arızanın ortalama onarım süresi. MTBF (Mean Time Between Failures): iki arıza arasındaki ortalama çalışma süresi. İkisi çoğunlukla gözlenen ölçüm göstergeleridir; RTO ise iş için konan hedeftir."
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
      { id: "26666289", q: "Bir kesintiden sonra sürecin ne kadar sürede yeniden çalışır olması gerektiğini söyleyen hedef değer hangisidir?", options: ["RPO (hedef veri kaybı)","MTBF (arızalar arası süre)","MTTR (ortalama onarım süresi)","RTO (hedef kurtarma süresi)"], obj: "h1" },
      { id: "40f64bad", q: "Yedekler 6 saatte bir alınıyor ve son yedek 6 saat önce alınmış. Kurumun RPO'su 2 saat ise durum nedir?", options: ["RPO sağlanıyor, çünkü en son bir yedek mevcut","RPO aşılıyor; yedek aralığı en çok 2 saate indirilmeli","Sorun RTO ile ilgili, yedek aralığı olduğu gibi kalmalı","MTBF artırılırsa veri kaybı hedefi kendiliğinden sağlanır"], obj: "h1" },
      { id: "820a72e4", q: "Felaket kurtarma (DR) planı, iş sürekliliği (BC) planına göre nasıl tanımlanır?", options: ["BC'den bağımsız çalışan ve yalnızca fiziksel yangın söndürme adımlarını anlatan plan","Riskin sigortaya aktarılmasını ve prim ödemelerini düzenleyen mali plan","BC'nin parçası olan, BT sistemleri ve verinin geri getirilmesine odaklı plan","Yıllık risk değerlendirmesi sonuçlarını özetleyen rapor"], obj: "h1" },
      { id: "258cb5b8", q: "Yönetim kurulu 'yeni pazarlarda büyümek için orta düzeyde risk almaya razıyız' diyor. Bu ifade hangi kavramı anlatır?", options: ["Risk iştahı (genel risk düzeyi)","Artık risk (kontrol sonrası kalan)","Doğal risk (kontrol öncesi)","Risk eşiği (harekete geçiren seviye)"], obj: "h2" },
      { id: "331c30c0", q: "Kontroller uygulanmadan önceki risk ile kontrollerden sonra kalan risk sırasıyla nasıl adlandırılır?", options: ["Artık (residual) risk; ardından doğal (inherent) risk","Risk iştahı; risk toleransı","Risk eşiği; risk iştahı","Doğal (inherent) risk; ardından artık (residual) risk"], obj: "h2" },
      { id: "1242ac30", q: "BIA'da sipariş sisteminin RTO'su 15 dakika, RPO'su birkaç saniye çıktı. Hangi çözüm bu hedefleri karşılar?", options: ["Haftalık bantlı yedek ve gerektiğinde kurulacak soğuk (cold) site","Sürekli çoğaltmalı sıcak (hot) site ya da yüksek erişilebilirlik","Günde bir alınan bulut yedeği ve birkaç günde devreye giren ılık (warm) site","Ayda bir alınan manuel disk kopyası ve elle yeniden kurulum"], obj: "h3" },
      { id: "ab1cde10", q: "Deprem riski taşıyan bir bölgedeki tek veri merkezi için kurum, olası hasarın büyük bölümünü bir sigorta şirketine devrediyor. Bu risk yanıtı hangisidir?", options: ["Kaçınma (faaliyeti bırakma)","Kabul etme (riski taşıma)","Aktarma (sigorta)","Azaltma (kontrol ekleme)"], obj: "h3" },
      { id: "5ea6d5a5", q: "MTBF ve MTTR göstergelerini doğru tanımlayan ifade hangisidir?", options: ["MTBF arızalar arası ortalama çalışma süresi, MTTR ortalama onarım süresidir","MTBF ortalama onarım süresi, MTTR iki arıza arasındaki ortalama süredir","MTBF kabul edilen veri kaybı, MTTR hedef kurtarma süresidir","İkisi de iş için konan hedeflerdir; MTBF süreyi, MTTR ise veri kaybını sınırlar"], obj: "h1" },
      { id: "507e8f07", q: "Kurumun genel risk iştahı 'orta düzey' olarak belirlenmiş. Operasyon ekibi, belirli bir hedef için kabul edilen ölçülebilir sapma payını 'aylık toplam kesinti en çok 4 saat' diye yazdı. Bu ifade hangi kavramdır?", options: ["Risk iştahı (üst yönetimin genel risk düzeyi)","Doğal risk (kontroller uygulanmadan önceki risk)","Artık risk (kontroller sonrası kalan risk)","Risk toleransı (ölçülebilir sapma payı)"], obj: "h2" }
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
      { id: "bd43c8e5", q: "Test ekibine ağ şeması, kaynak kodu ve yönetici hesabı verilerek yapılan test hangisidir?", options: ["Bilinmeyen ortam testi (kara kutu)","Bilinen ortam testi (beyaz kutu)","Kısmen bilinen ortam testi (gri kutu)","Açık ödül programı (bug bounty)"], obj: "h1" },
      { id: "11133f32", q: "Test ekibi önce alan adı kayıtlarına, iş ilanlarına ve herkese açık sosyal medya sayfalarına bakıyor; sonra hedefin canlı sistemlerini ve açık servislerini bulmak için doğrudan sorgu gönderiyor. Bu iki aşama sırasıyla nasıl adlandırılır?", options: ["Önce aktif keşif, sonra da pasif keşif aşaması","Her iki aşama da pasif keşif sayılır","Önce pasif keşif, sonra aktif keşif","Önce kırmızı takım, sonra mavi takım çalışması"], obj: "h1" },
      { id: "b1008686", q: "Teste başlamadan önce, testin hangi sistemlerde, hangi saatlerde ve hangi yöntemlerle yapılabileceğini ve acil durumda kimlerin aranacağını belirleyen belge hangisidir?", options: ["RoE (etkileşim kuralları belgesi)","Olay sonrası inceleme raporu ve çıkarılan dersler","İş etki analizi (BIA) çalışma çıktısı","Zafiyet tarama çıktısı ve bulgu listesi"], obj: "h2" },
      { id: "08db6990", q: "Bir kurum, saldırgan taklidi yapan ekip ile savunma ekibinin bulgularını birlikte inceleyip tespitleri iyileştirmeyi koordine edecek bir yapı istiyor. Hangi takım rolü bunu üstlenir?", options: ["Kırmızı takım","Mavi takım","Bug bounty araştırmacıları","Mor takım"], obj: "h2" },
      { id: "bcd38479", q: "Bir yönetici 'tarama aracının çıktısını aldık, yani sızma testi yaptırdık' diyor. Bu neden yanlıştır?", options: ["Tarama, sızma testinden daha derin ve bağlam odaklı sonuç verdiği için testin yerini tutar","Tarama açıkları listeler; sızma testi bulguları doğrulayıp gerçek etkiyi gösterir","Sızma testi yalnızca otomatik araç çıktısının yönetici özeti biçiminde sunulmasıdır","İkisi aynı çalışmadır; fark yalnızca raporun biçiminde ve başlık düzenindedir"], obj: "h3" },
      { id: "7212e284", q: "Rapor sunuldu ve ekip kritik bulguları düzeltti. Sızma testi sürecinin bir sonraki adımı ne olmalıdır?", options: ["Raporu arşivleyip düzeltmeler uygulandığı için bulguları kapalı saymak","Düzeltilen bulguları da kabul edilen risk olarak işaretleyip dosyayı kapatmak","Düzeltmelerin bulguları gerçekten kapattığını yeniden testle doğrulamak","Testi yazılı izin almadan kapsam dışı sistemlere de genişletmek"], obj: "h3" },
      { id: "89bb853d", q: "Bug bounty programı ile kurumun sözleşmeli bir firmaya yaptırdığı sızma testi arasındaki temel fark hangisidir?", options: ["Kapsamı yayımlanmış programa bağımsız araştırmacılar katılır; ödül bulguya göre verilir","Bug bounty'de kapsam ve kural bulunmaz, katılan araştırmacılar istedikleri her sistemi deneyebilir","Bug bounty yalnızca binaların ve çalışma alanlarının fiziksel güvenlik testlerini kapsar","Sızma testi için yazılı izin gerekmez, bug bounty için gerekir"], obj: "h2" },
      { id: "a8ff6129", q: "Test ekibine yalnızca sıradan bir kullanıcı hesabı verilerek sınırlı bilgiyle yapılan test hangisidir?", options: ["Bilinen ortam testi (beyaz kutu)","Bilinmeyen ortam testi (kara kutu)","Kırmızı takım operasyonu (saldırgan rolü)","Kısmen bilinen ortam testi (gri kutu)"], obj: "h1" },
      { id: "7cff8b6a", q: "Yetkili test sırasında ekip, kapsam listesinde olmayan bir sunucunun açık olduğunu fark etti. Doğru davranış nedir?", options: ["Yöneticiden sözlü onay alıp sunucuyu da teste dahil etmek ve sonra rapora yazmak","Sunucuya dokunmadan bildirip kapsamın yazılı olarak genişletilmesini istemek","Sunucunun da kuruma ait olduğunu varsayıp hızlıca tarama yapmak","Yalnızca okuma yapacağını söyleyerek sunucuya sessizce bağlanıp bakmak"], obj: "h2" }
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

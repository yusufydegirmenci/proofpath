/* CCNA 200-301 · sabit dersler 18-20 (Ağ topolojileri ve mimarileri, Sanallaştırma/konteyner/bulut, TCP ve UDP) · ders eki: ccna-ek.js, anahtarlar 17-19 */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).ccna = (window.PP_LESSONS.ccna || {}));
  var CISCO = { title: "Cisco CCNA 200-301", url: "https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccna.html" };
  var JERE = { title: "Jeremy's IT Lab: Free CCNA 200-301 (YouTube kanalı)", url: "https://www.youtube.com/@JeremysITLab", type: "video", length: "Çok bölümlü", level: "başlangıç", lang: "EN" };
  function res(a, why) { var o = {}; for (var k in a) o[k] = a[k]; o.why = why; return o; }

  /* 18 ───────────────────────────────────────────── Ağ topolojileri ve mimarileri */
  L[18] = {
    hook: "Aynı sayıda cihazı bağlayan iki ağdan biri sorunsuz büyür, diğeri tek bir kutu bozulunca durur; fark cihazlarda değil, tasarımdadır.",
    homework: "Okulunun ya da evinin ağını kâğıda kutu-ok olarak çiz: cihazlar hangi cihaza, o cihaz hangisine bağlanıyor? Kaç katmanlı olduğunu say ve bozulursa her şeyi durduracak tek noktayı işaretle.",
    warmup: {
      recap: [
        { point: "Switch aynı ağdaki cihazları, router farklı ağları bağlar.", example: "Ofis ağı çizimi" },
        { point: "Yedeklilik, tek bir arızanın tüm ağı durdurmasını önler.", example: "İki yoldan biri kopsa da bağlantı sürer" }
      ],
      concepts: [
        { term: "Üç katmanlı model", tr: "Erişim, dağıtım ve çekirdek", summary: "Büyük bir kampüs ağını görevlerine göre üç katmana ayırır.", example: "Kat anahtarları erişim, bina toplayıcıları dağıtım, kampüs omurgası çekirdek" },
        { term: "Spine-leaf", tr: "Omurga-yaprak topolojisi", summary: "Her yaprak anahtar her omurga anahtarına bağlanır; sunucular yapraklara takılır.", example: "Veri merkezindeki sunucu rafları" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Şirket yeni bir binaya taşınıyor: 300 çalışan, 20 sunucu ve iki şube var. Sana cihaz listesini değil, bu cihazların hangi iskelet üzerinde bağlanacağını soruyorlar. Kampüs, veri merkezi, küçük ofis ve şubeler arası hat farklı mimariler ister; yanlış seçim sonradan pahalı bir yeniden tasarıma dönüşür." },
      { t: "steps", h: "Üç katmanlı kampüs modeli", items: [
        "Erişim (access): bilgisayar, telefon, yazıcı ve kablosuz erişim noktaları buraya bağlanır. VLAN üyeliği, port güvenliği ve PoE burada uygulanır.",
        "Dağıtım (distribution): erişim anahtarlarını toplar. VLAN'lar arası yönlendirme, erişim listeleri ve yedeklilik politikaları genellikle burada durur.",
        "Çekirdek (core): binaları ve dağıtım katmanlarını yüksek hızla birbirine bağlayan omurgadır. Amacı paketi olabildiğince hızlı iletmektir; ağır politika işleri buraya yüklenmez."
      ] },
      { t: "steps", h: "İki katmanlı (daraltılmış çekirdek) model", items: [
        "Küçük ve orta ölçekli kampüste dağıtım ve çekirdek görevleri aynı anahtar çiftinde birleştirilir. Buna iki katmanlı ya da daraltılmış çekirdek (collapsed core) denir.",
        "Daha az cihaz, daha düşük maliyet ve daha basit yönetim sağlar.",
        "Seçim ölçütü bina ve kablolama sayısıdır: tek bina ya da birkaç bina iki katmanlıya, çok sayıda bina üç katmanlıya uygundur. Kampüs büyüyünce ayrı bir çekirdek eklenebilir."
      ] },
      { t: "steps", h: "Spine-leaf (veri merkezi)", items: [
        "Yaprak (leaf) anahtarlara sunucular bağlanır. Omurga (spine) anahtarlar yalnızca yaprakları birbirine bağlar.",
        "Her yaprak her omurgaya bağlanır; yaprak-yaprak ve omurga-omurga doğrudan bağlantı yoktur.",
        "İki sunucu arasındaki yol hep yaprak, omurga, yaprak üzerinden geçer; atlama sayısı tahmin edilebilir ve çok sayıda eşit yol vardır.",
        "Kapasiteyi artırmak için omurga, port sayısını artırmak için yaprak eklenir."
      ] },
      { t: "box", h: "Doğu-batı ve kuzey-güney trafiği", text: "Kuzey-güney trafiği ağın içi ile dışı arasındaki akıştır (kullanıcı ile sunucu). Doğu-batı trafiği veri merkezi içinde sunucuların birbirleriyle konuşmasıdır. Sanallaştırma ve dağıtık uygulamalar doğu-batı trafiğini artırdı. Üç katmanlı yapıda bu trafik çekirdeğe çıkıp inebilir ve darboğaz yaratabilir; spine-leaf ise yolları eşitler." },
      { t: "steps", h: "SOHO ve WAN seçenekleri", items: [
        "SOHO (küçük ofis / ev ofisi): çoğunlukla tek bir kutu yönlendirici, anahtar, kablosuz erişim noktası ve güvenlik duvarı görevini birlikte görür; NAT ve DHCP de genellikle bu kutudadır.",
        "Kiralık hat (leased line): iki nokta arasında ayrılmış, sözleşmeli bir hat. Öngörülebilirdir ama pahalıdır.",
        "MPLS VPN ve metro Ethernet: sağlayıcı kendi omurgasında şubeleri özel bir hizmet olarak bağlar; hizmet seviyesi sözleşmeyle gelir.",
        "İnternet bağlantısı artı VPN: düşük maliyetli geniş bant üzerinden şifreli tünelle şube bağlanır; hat kalitesi garanti edilmez.",
        "Hücresel bağlantı yedek olarak ya da kablolu hattın ulaşmadığı yerlerde kullanılabilir."
      ] },
      { t: "steps", h: "Fiziksel topoloji biçimleri", items: [
        "Yıldız: tüm uçlar merkezdeki bir cihaza bağlanır. Ekleme ve arıza bulma kolaydır ama merkez cihaz arızalanırsa ağ durur.",
        "Tam mesh: her düğüm diğer her düğümle doğrudan bağlıdır. n düğüm için n×(n−1)/2 bağlantı gerekir; 5 düğümde 10 bağlantı. Çok dayanıklıdır ama pahalıdır.",
        "Kısmi mesh: yalnızca önemli düğümler arasında ek bağlantı vardır; maliyet ve dayanıklılık dengelenir.",
        "Merkez-uç (hub-and-spoke): şubeler merkeze bağlanır, şubeler arası trafik merkez üzerinden geçer.",
        "Noktadan noktaya: yalnızca iki uç arasında doğrudan bağlantı."
      ] },
      { t: "warn", h: "Tuzak", text: "'Daha çok katman daha iyidir' yanılgısına düşme: küçük bir ofiste üç katman gereksiz maliyettir. Spine-leaf'te yaprakların birbirine bağlanması gerekmez, tersine bağlanmaz. Mimariyi bina sayısına ve trafiğin yönüne göre seç." }
    ],
    objectives: [
      { id: "h1", text: "İki ve üç katmanlı kampüs tasarımını, erişim, dağıtım ve çekirdek katmanlarının görevini ayırt edebilirsin." },
      { id: "h2", text: "Spine-leaf yapısının nasıl bağlandığını ve neden doğu-batı trafiğine uygun olduğunu açıklayabilirsin." },
      { id: "h3", text: "SOHO ve WAN seçeneklerini (kiralık hat, MPLS VPN, internet üzerinden VPN) bir senaryoda eşleştirebilirsin." },
      { id: "h4", text: "Yıldız, tam mesh ve kısmi mesh topolojilerinin bağlantı sayısı ve arıza etkisini yorumlayabilirsin." }
    ],
    summary: [
      "Üç katmanlı kampüs modelinde erişim uç cihazları, dağıtım erişimi toplayıp politika uygular, çekirdek de hızlı omurgadır.",
      "İki katmanlı (daraltılmış çekirdek) modelde dağıtım ve çekirdek birleşir; küçük ve orta ölçekli kampüste maliyeti ve yönetim yükünü azaltır.",
      "Spine-leaf'te her yaprak her omurgaya bağlıdır, yapraklar birbirine bağlanmaz; yol hep yaprak, omurga, yaprak olduğu için doğu-batı trafiği için tahmin edilebilir ve ölçeklenebilirdir.",
      "SOHO'da tek kutu birden çok işi yapar; WAN'da kiralık hat ve MPLS VPN sözleşmeli hizmet sunar, internet üzerinden VPN ise ucuzdur ama garantisizdir.",
      "Yıldızda merkez cihaz tek arıza noktasıdır; tam mesh n×(n−1)/2 bağlantı ister, kısmi mesh maliyet ile dayanıklılığı dengeler."
    ],
    quiz: [
      { id: "f18771da", q: "Üç katmanlı kampüs modelinde bilgisayar, telefon ve yazıcıların doğrudan bağlandığı, VLAN üyeliği ve port güvenliğinin uygulandığı katman hangisidir?", options: ["Erişim katmanı","Dağıtım katmanı","Çekirdek katmanı","Omurga (spine) katmanı"], obj: "h1" },
      { id: "46d3f942", q: "Spine-leaf veri merkezinde farklı iki yaprak anahtara bağlı iki sunucu konuşuyor. Normal koşulda paket hangi yoldan gider?", options: ["Yapraktan yaprağa, aradaki doğrudan bağlantıyla","Yaprak, omurga, yaprak sırasıyla","Yaprak, çekirdek, dağıtım, yaprak sırasıyla","Omurgadan omurgaya geçip yaprağa inerek"], obj: "h2" },
      { id: "906391ab", q: "Tek binalı, birkaç yüz kullanıcılı bir okul ağında maliyeti ve yönetim yükünü azaltmak için dağıtım ve çekirdek görevlerini aynı anahtar çiftine vermek istiyorsun. Bu tasarım hangisidir?", options: ["Üç katmanlı tasarım (ayrı çekirdek)","Spine-leaf tasarım (omurga-yaprak)","İki katmanlı tasarım (daraltılmış çekirdek)","Tam mesh topoloji (herkes herkese)"], obj: "h1" },
      { id: "f7af4d1b", q: "Bir veri merkezinde sanallaştırma nedeniyle sunucuların birbirine gönderdiği (doğu-batı) trafik hızla artıyor. Hangi tasarım bu yönde ölçeklenmeye daha uygundur?", options: ["Üç katmanlı, çünkü çekirdek çok hızlıdır","Yıldız topoloji, çünkü tek merkez vardır","Noktadan noktaya, çünkü iki uç doğrudan konuşur","Spine-leaf, çünkü yollar eşit ve çoktur"], obj: "h2" },
      { id: "229b7ca5", q: "Bir şube için ayrılmış bant genişliği ve sözleşmeli hizmet seviyesi aranıyor; maliyet ikinci planda. Hangi WAN seçeneği en uygundur?", options: ["Ev tipi geniş bant internet bağlantısı","Yalnızca internet üzerinden VPN tüneli","Tek başına hücresel veri bağlantısı","Kiralık hat ya da MPLS VPN"], obj: "h3" },
      { id: "3557ad08", q: "Evden çalışan birinin kullandığı modem-router kutusu hem yönlendirme, hem anahtarlama, hem kablosuz erişim, hem de NAT ve DHCP yapıyor. Bu ağ türü hangisidir?", options: ["SOHO (küçük ofis / ev ofisi)","Veri merkezi omurga-yaprak ağı","Üç katmanlı kampüs ağı","MPLS tabanlı sağlayıcı omurgası"], obj: "h3" },
      { id: "3f076dad", q: "Beş şubenin her biri diğer dört şubeyle doğrudan bağlanacak (tam mesh). Kaç bağlantı gerekir?", options: ["5","8","10","20"], obj: "h4" },
      { id: "06ce9335", q: "Yıldız topolojide merkezdeki cihaz arızalanırsa ne olur?", options: ["Yalnızca arızalı cihaza bağlı uç etkilenir","Tüm uçlar birbirinden kopar","Trafik otomatik olarak komşu uca aktarılır","Yalnızca yönetim trafiği kesilir"], obj: "h4" }
    ],
    interview: [
      { q: "Üç katmanlı model ile spine-leaf arasındaki fark nedir?", a: "Üç katmanlı model kampüste kullanıcıdan sunucuya (kuzey-güney) trafiğe göre erişim, dağıtım ve çekirdek olarak katmanlanır. Spine-leaf veri merkezi içi sunucudan sunucuya (doğu-batı) trafiği için tasarlanır; her yaprak her omurgaya bağlıdır ve iki yaprak arasındaki yol hep eşit uzunluktadır." },
      { q: "Ne zaman iki katmanlı kampüs tasarımı seçersin?", a: "Bina ve kablolama sayısı az olduğunda. Dağıtım ve çekirdeği aynı anahtar çiftinde birleştirmek cihaz sayısını ve maliyeti azaltır. Kampüs büyüyüp tek çift yetmezse ayrı bir çekirdek eklenir." },
      { q: "Bir şube için WAN seçeneklerini nasıl karşılaştırırsın?", a: "Kiralık hat ve MPLS VPN ayrılmış kapasite ve sözleşmeli hizmet seviyesi verir ama pahalıdır. İnternet üzerinden VPN ucuz ve hızlı kurulur ama hat kalitesi garanti edilmez. Yedek olarak hücresel bağlantı eklenebilir." }
    ],
    vocab: [
      { term: "Access layer", tr: "erişim katmanı", ex: "Users plug into the access layer." },
      { term: "Distribution layer", tr: "dağıtım katmanı", ex: "The distribution layer applies policy." },
      { term: "Core layer", tr: "çekirdek katmanı", ex: "The core layer moves traffic fast." },
      { term: "Spine-leaf", tr: "omurga-yaprak topolojisi", ex: "Every leaf connects to every spine." },
      { term: "Full mesh", tr: "tam mesh", ex: "A full mesh needs many links." },
      { term: "Leased line", tr: "kiralık hat", ex: "A leased line gives dedicated bandwidth." }
    ],
    resources: [
      res(JERE, "Ağ topolojileri ve mimarileri bölümünü anlatır")
    ],
    sources: [
      CISCO
    ]
  };

  /* 19 ───────────────────────────────────────────── Sanallaştırma, konteyner ve bulut kavramları */
  L[19] = {
    hook: "Tek bir fiziksel sunucuda yirmi sunucu çalıştırıp onları saniyeler içinde açıp kapatabilmek: sanallaştırma ağ mühendisinin dünyasını da değiştirdi.",
    homework: "Telefonunda ya da bilgisayarında kullandığın bir uygulamayı seç ve üç durumda düşün: kendi sunucunda, sanal makinede ve bulutta çalışsa kim neyi yönetirdi? Üç satırda yaz.",
    warmup: {
      recap: [
        { point: "Sunucu, istemcilerin isteklerine yanıt veren bilgisayardır.", example: "Web sunucusu" },
        { point: "VLAN'lar bir anahtarı mantıksal olarak birden çok yayın alanına böler.", example: "VLAN 10 ve VLAN 20" }
      ],
      concepts: [
        { term: "Hypervisor", tr: "Sanal makine yöneticisi", summary: "Fiziksel donanımı paylaştırıp birden çok sanal makineye böler.", example: "Bir sunucuda üç ayrı işletim sistemi" },
        { term: "Konteyner", tr: "Paketlenmiş uygulama ortamı", summary: "Uygulamayı ve kütüphanelerini paketler, ana makinenin çekirdeğini paylaşır.", example: "Bir web uygulamasının imajı" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Şirket yeni bir uygulamayı hızla yayına almak istiyor ve donanım almak yerine bulutu düşünüyor. Sana şunları soruyorlar: sanal makine mi konteyner mi, hangi bulut modeli, kim neyi yönetecek, ağ nasıl bağlanacak? Kavramları ayırt edebilmek doğru soruyu doğru kişiye sormanı sağlar." },
      { t: "steps", h: "Sanal makine ve hypervisor", items: [
        "Hypervisor, fiziksel donanımı paylaştırıp her sanal makineye (VM) kendi sanal işlemcisini, belleğini, diskini ve ağ kartını verir.",
        "Tip 1 (çıplak donanım, bare-metal): doğrudan donanımın üzerinde çalışır. Veri merkezlerinde kullanılır; verimli ve yalıtımı güçlüdür.",
        "Tip 2 (barındırılan, hosted): bir işletim sisteminin üzerinde uygulama gibi çalışır. Dizüstünde deneme ve eğitim için uygundur.",
        "Her VM kendi konuk işletim sistemini taşır; bu yüzden daha ağırdır ama yalıtımı güçlüdür."
      ] },
      { t: "steps", h: "Sanal ağ", items: [
        "VM'lerin sanal ağ kartları (vNIC) sunucunun içindeki sanal anahtara (vSwitch) bağlanır.",
        "Sanal anahtar, fiziksel ağ kartı (uplink) üzerinden gerçek anahtara çıkar. Bu bağlantı birden çok VLAN taşıyorsa genellikle trunk olarak ayarlanır.",
        "Böylece VM'ler fiziksel cihazlarla aynı VLAN mantığına göre ağa dahil edilir."
      ] },
      { t: "steps", h: "Konteyner", items: [
        "Konteyner uygulamayı ve ihtiyaç duyduğu kütüphaneleri paketler; ana makinenin işletim sistemi çekirdeğini paylaşır, kendi tam işletim sistemini taşımaz.",
        "Saniyeler içinde başlar, az kaynak harcar ve aynı imajdan çok sayıda kopya çalıştırılabilir.",
        "Çekirdek ortak olduğu için yalıtım VM kadar güçlü değildir. Çok sayıda konteyneri yönetmek için orkestrasyon araçları kullanılır."
      ] },
      { t: "steps", h: "Bulut hizmet modelleri (kim neyi yönetir)", items: [
        "IaaS (altyapı hizmeti): sağlayıcı donanımı ve sanallaştırmayı verir; işletim sistemi, ara yazılım ve uygulama sende. Sanal sunucu kiralamak gibi.",
        "PaaS (platform hizmeti): sağlayıcı işletim sistemini ve çalışma ortamını da yönetir; sen uygulamanı ve verini yönetirsin.",
        "SaaS (yazılım hizmeti): hazır uygulamayı kullanırsın (e-posta, ofis yazılımı). Sunucu, işletim sistemi ve uygulama güncellemesi sağlayıcıdadır.",
        "IaaS'tan SaaS'a çıktıkça kontrolün ve yönetim yükün azalır."
      ] },
      { t: "steps", h: "Bulut dağıtım modelleri ve özellikleri", items: [
        "Genel (public) bulut: bir sağlayıcının altyapısını birden çok müşteri paylaşır.",
        "Özel (private) bulut: altyapı tek bir kuruma ayrılmıştır; kurumun kendi veri merkezinde ya da ayrılmış bir yerde olabilir.",
        "Karma (hybrid) bulut: özel altyapı ile genel bulut birlikte kullanılır ve aralarında bağlantı kurulur.",
        "Bulutun tipik özellikleri: isteğe bağlı kendi kendine hizmet, geniş ağ erişimi, kaynak havuzlama, hızlı esneklik ve ölçülü kullanım."
      ] },
      { t: "box", h: "VRF: yönlendirme tablosunu sanallaştırmak", text: "VRF (Virtual Routing and Forwarding), tek bir yönlendiricide birden çok bağımsız yönlendirme tablosu çalıştırmaktır. Her arayüz bir VRF'e atanır. İki müşteri ya da iki departman aynı IP aralığını kullansa bile tabloları ayrı olduğu için birbirini etkilemez. Yani sanallaştırma yalnız sunucuda değil, yönlendirmede de vardır." },
      { t: "warn", h: "Tuzak", text: "Konteyner 'küçük bir sanal makine' değildir; ana çekirdeği paylaşır. Bulutta 'her şeyi sağlayıcı yönetir' de yanlıştır: IaaS'ta işletim sistemini sen yönetirsin, her modelde veri ve erişim yönetimi sende kalır." }
    ],
    objectives: [
      { id: "h1", text: "Sanal makine ile konteynerin farkını (kendi işletim sistemi, ortak çekirdek) ve uygun kullanım alanını ayırt edebilirsin." },
      { id: "h2", text: "Tip 1 ve tip 2 hypervisor'ü ile sanal anahtarın (vSwitch) rolünü açıklayabilirsin." },
      { id: "h3", text: "IaaS, PaaS ve SaaS'ı sorumluluk paylaşımına göre bir senaryoda ayırt edebilirsin." },
      { id: "h4", text: "Genel, özel ve karma bulutu ve VRF'in yönlendirmedeki yerini bir senaryoda eşleştirebilirsin." }
    ],
    summary: [
      "VM kendi konuk işletim sistemini taşır; konteyner ana makinenin çekirdeğini paylaşır, bu yüzden daha hafiftir ama yalıtımı daha zayıftır.",
      "Tip 1 hypervisor doğrudan donanımda çalışır ve veri merkezinde kullanılır, tip 2 bir işletim sisteminin üzerinde çalışır.",
      "Sanal anahtar VM'lerin vNIC'lerini birbirine ve fiziksel ağ kartı üzerinden gerçek ağa bağlar.",
      "IaaS'ta işletim sistemi müşteride, PaaS'ta yalnız uygulama ve veri müşteride, SaaS'ta hazır yazılım kullanılır ve geri kalanı sağlayıcıdadır.",
      "Genel, özel ve karma bulut dağıtım modelleridir; VRF ise tek yönlendiricide bağımsız yönlendirme tabloları sağlar."
    ],
    quiz: [
      { id: "26451135", q: "Sanal makine (VM) ile konteyner arasındaki temel fark hangisidir?", options: ["İkisi de tam işletim sistemi taşır, yalnızca ağ ayarları farklıdır","VM kendi işletim sistemini taşır, konteyner ana makinenin çekirdeğini paylaşır","Konteyner kendi sanal donanımını taşır, VM ana çekirdeği paylaşır","Konteyner yalnızca fiziksel sunucuda, VM yalnızca bulutta çalışır"], obj: "h1" },
      { id: "b9e3819b", q: "Aynı uygulamanın onlarca özdeş kopyasını saniyeler içinde başlatıp kapatman ve az kaynak harcaman gerekiyor. Hangisi en uygundur?", options: ["Her kopya için ayrı fiziksel sunucu","Her kopya için tam işletim sistemli ayrı VM","Tip 2 hypervisor ile dizüstü bilgisayarda VM","Aynı imajdan çalışan konteynerler"], obj: "h1" },
      { id: "252c7056", q: "Doğrudan sunucu donanımının üzerinde çalışan ve veri merkezlerinde kullanılan hypervisor türü hangisidir?", options: ["Tip 1 (çıplak donanım)","Tip 2 (barındırılan)","Konteyner çalışma zamanı","Sanal anahtar (vSwitch)"], obj: "h2" },
      { id: "4823fba2", q: "VM'lerin sanal ağ kartlarını birbirine ve sunucunun fiziksel ağ kartına bağlayan yazılım bileşeni hangisidir?", options: ["Fiziksel erişim anahtarı","Hypervisor yönetim konsolu","Sanal anahtar (vSwitch)","Yedekli yönlendirici"], obj: "h2" },
      { id: "9dbb7e6b", q: "Bir şirket e-posta hizmetini tarayıcıdan kullanıyor; sunucu, işletim sistemi ve uygulama güncellemelerini sağlayıcı yönetiyor. Bu hizmet modeli hangisidir?", options: ["IaaS (altyapı hizmeti)","SaaS (yazılım hizmeti)","PaaS (platform hizmeti)","Özel bulut (private cloud)"], obj: "h3" },
      { id: "44576185", q: "Sağlayıcı donanımı ve sanallaştırmayı verirken işletim sistemini, ara yazılımı ve uygulamayı müşteri kuruyor ve yönetiyor. Bu model hangisidir?", options: ["SaaS (yazılım hizmeti)","PaaS (platform hizmeti)","Karma bulut (hybrid cloud)","IaaS (altyapı hizmeti)"], obj: "h3" },
      { id: "1f679188", q: "Bir şirket kritik verisini kendi veri merkezindeki özel bulutta tutuyor, ani yük artışlarında ise bir genel bulut sağlayıcısının kaynaklarını kullanıyor. Bu mimari hangisidir?", options: ["Karma bulut (hybrid cloud)","Genel bulut (public cloud)","Özel bulut (private cloud)","Topluluk bulutu (community cloud)"], obj: "h4" },
      { id: "bbb90ec2", q: "Bir yönlendirici iki müşteriye hizmet veriyor ve ikisi de 10.0.0.0/24 aralığını kullanıyor. Her müşteri için ayrı bir yönlendirme tablosu tutarak çakışmayı önleyen yapı hangisidir?", options: ["NAT aşırı yükleme (NAT overload)","VLAN etiketleme (802.1Q)","VRF (sanal yönlendirme tablosu)","Tip 1 hypervisor"], obj: "h4" }
    ],
    interview: [
      { q: "Sanal makine ile konteyner arasındaki fark nedir?", a: "VM kendi tam işletim sistemini taşır ve hypervisor üzerinde çalışır. Konteyner uygulamayı ve kütüphanelerini paketler, ana makinenin çekirdeğini paylaşır. Bu yüzden konteyner daha hafif ve hızlı başlar, VM ise daha güçlü yalıtım sağlar." },
      { q: "IaaS, PaaS ve SaaS'ı nasıl ayırırsın?", a: "Kimin neyi yönettiğine bakarım. IaaS'ta sağlayıcı donanım ve sanallaştırmayı verir, işletim sistemi bende. PaaS'ta işletim sistemi ve çalışma ortamı da sağlayıcıda, ben uygulama ve veriyi yönetirim. SaaS'ta hazır yazılımı kullanırım." },
      { q: "VRF ne işe yarar?", a: "Tek bir yönlendiricide birden çok bağımsız yönlendirme tablosu tutar. Arayüzler farklı VRF'lere atanır; böylece farklı müşteriler ya da departmanlar aynı IP aralığını çakışma olmadan kullanabilir." }
    ],
    vocab: [
      { term: "Hypervisor", tr: "sanal makine yöneticisi", ex: "The hypervisor runs three virtual machines." },
      { term: "Container", tr: "konteyner", ex: "The container starts in seconds." },
      { term: "Virtual switch", tr: "sanal anahtar", ex: "The virtual switch connects the VMs." },
      { term: "Public cloud", tr: "genel bulut", ex: "The app runs in a public cloud." },
      { term: "Hybrid cloud", tr: "karma bulut", ex: "A hybrid cloud mixes both models." },
      { term: "Elasticity", tr: "esneklik", ex: "Elasticity adds capacity on demand." }
    ],
    resources: [
      res(JERE, "Sanallaştırma, konteyner ve bulut kavramlarını anlatır")
    ],
    sources: [
      CISCO
    ]
  };

  /* 20 ───────────────────────────────────────────── TCP ve UDP */
  L[20] = {
    hook: "Bir telefon görüşmesinde kaybolan kelime tekrar edilmez, bir banka havalesinde kaybolan bayt ise asla kabul edilmez: TCP ve UDP bu iki dünyayı karşılar.",
    homework: "Bir web sitesini açarken ve görüntülü bir görüşmede hangi taşıma protokolünün kullanıldığını tahmin et. Sonra bilgisayarında 'netstat -an' komutuyla açık bağlantıları ve port numaralarını listele; 443 ve 53 numaralı portları bul.",
    warmup: {
      recap: [
        { point: "IP adresi doğru cihaza ulaştırır; cihazdaki hangi uygulamaya gideceği başka bir bilgiyle belirlenir.", example: "Aynı cihaz hem web hem e-posta sunabilir" },
        { point: "DNS, bir adı IP adresine çevirir.", example: "www.ornek.com adresinden IP adresine" }
      ],
      concepts: [
        { term: "TCP", tr: "Bağlantı yönelimli iletim denetim protokolü", summary: "Bağlantı kurar, sıra numarası ve onayla güvenilir iletim sağlar.", example: "Web sayfası, e-posta, dosya aktarımı" },
        { term: "UDP", tr: "Bağlantısız kullanıcı datagram protokolü", summary: "Bağlantı kurmaz, onay beklemez; düşük yük ve düşük gecikme sağlar.", example: "Canlı ses ve görüntü, DNS sorgusu" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Kullanıcı 'internet yavaş' diyor. Web sayfası geç açılıyor ama görüntülü toplantı kopuyor. Aynı ağda iki uygulamanın iki ayrı taşıma protokolü kullandığını bilmezsen hata ayıklamaya nereden başlayacağını bilemezsin. Güvenlik duvarı kuralı yazarken de protokol ve port çiftini bilmen gerekir." },
      { t: "steps", h: "TCP ile UDP karşılaştırması", items: [
        "TCP bağlantı yönelimlidir: veri göndermeden önce uçlar karşılıklı bir bağlantı kurar.",
        "TCP güvenilirdir: her segmente sıra numarası verir, alıcı onay (ACK) gönderir, onay gelmezse segment yeniden iletilir.",
        "UDP bağlantısızdır: bağlantı kurmaz, onay beklemez, kaybolan veriyi kendisi yeniden göndermez. Başlığı küçüktür, yükü ve gecikmesi düşüktür.",
        "TCP başlığı en az 20 bayt, UDP başlığı 8 bayttır.",
        "Doğruluğun hızdan önemli olduğu uygulamalar (web, e-posta, dosya aktarımı) TCP kullanır. Gecikmeye duyarlı ve bir miktar kaybı kaldırabilen uygulamalar (canlı ses ve görüntü, çevrimiçi oyun, DNS sorgusu) çoğunlukla UDP kullanır."
      ] },
      { t: "steps", h: "Üçlü el sıkışma ve kapanış", items: [
        "1. İstemci SYN gönderir: bağlantı isteği ve başlangıç sıra numarası.",
        "2. Sunucu SYN/ACK ile yanıtlar: isteği onaylar ve kendi sıra numarasını bildirir.",
        "3. İstemci ACK gönderir: bağlantı kurulmuştur, veri akışı başlar.",
        "Düzgün kapanış için taraflar FIN bayrağını kullanır ve karşı taraf onaylar. RST ise bağlantıyı aniden keser; örneğin kapalı bir porta gelen istek RST ile reddedilir."
      ] },
      { t: "steps", h: "Güvenilirlik ve akış denetimi", items: [
        "Sıra numarası: segmentleri alıcıda doğru sıraya dizmeyi ve eksik olanı fark etmeyi sağlar.",
        "Pencere boyutu (window): alıcı, onay beklemeden ne kadar veri alabileceğini bildirir. Alıcı yetişemiyorsa pencereyi küçültür ve gönderici yavaşlar; buna akış denetimi denir.",
        "Yeniden iletim: gönderilen segmentin onayı beklenen sürede gelmezse TCP o segmenti tekrar yollar.",
        "UDP'de bu mekanizmaların hiçbiri yoktur; gerekirse uygulama kendisi önlem alır."
      ] },
      { t: "steps", h: "Port numaraları", items: [
        "Port 16 bitlik bir sayıdır (0–65535) ve cihazdaki hangi uygulamaya gidileceğini belirler. IP adresi cihazı, port uygulamayı gösterir.",
        "İyi bilinen portlar 0–1023 aralığındadır. Örnekler: FTP 20/21, SSH 22, Telnet 23, SMTP 25, DNS 53, DHCP 67/68, TFTP 69, HTTP 80, NTP 123, SNMP 161, HTTPS 443.",
        "Kayıtlı portlar 1024–49151, geçici (ephemeral) portlar 49152–65535 aralığındadır. İstemci kaynak portu olarak genellikle yüksek numaralı geçici bir port seçer; hedef port hizmete göre bellidir.",
        "IP adresi ve port numarasının birleşimine soket denir. Bir bağlantı kaynak ve hedef soketle tanımlanır.",
        "DNS sorguları normalde UDP 53 ile gider; yanıt büyükse ya da bölge aktarımı gerekiyorsa TCP 53 kullanılır."
      ] },
      { t: "cmd", lang: "cmd", calistirma: "atla Windows komut satırı (Linux/macOS komutlarıyla karışık olabilir); bu ortamda çalıştırılmaz", text: "C:\\> netstat -an\n\n  Proto  Yerel Adres          Yabancı Adres        Durum\n  TCP    192.168.1.20:50234   203.0.113.10:443     ESTABLISHED\n  UDP    192.168.1.20:50871   *:*\n\n# Çıktı biçimi sisteme göre değişir. Yerel port yüksek ve geçici, uzak port hizmetin portudur." },
      { t: "warn", h: "Tuzak", text: "'UDP kötü, TCP iyi' yanılgısına düşme: UDP güvenilmez demek değildir, güvenilirliği uygulamaya bırakır. Port numarası da uygulamanın kendisi değildir; 443 numaralı portta başka bir hizmet çalıştırılabilir, bu yüzden port bilgisine tek başına güvenme." }
    ],
    objectives: [
      { id: "h1", text: "TCP ile UDP'yi bağlantı, güvenilirlik ve yük açısından ayırt edip uygulamaya uygun olanı seçebilirsin." },
      { id: "h2", text: "TCP üçlü el sıkışmayı (SYN, SYN/ACK, ACK) ve bağlantının FIN ile kapanışını sırasıyla açıklayabilirsin." },
      { id: "h3", text: "İyi bilinen portları, geçici kaynak portunu ve soket kavramını bir bağlantıda yorumlayabilirsin." },
      { id: "h4", text: "Sıra numarası, pencere boyutu ve yeniden iletimin TCP güvenilirliğindeki rolünü bir senaryoda seçebilirsin." }
    ],
    summary: [
      "TCP bağlantı kurar, sıra numarası ve onayla güvenilir iletim sağlar; UDP bağlantısızdır, onay beklemez ve düşük yüklüdür.",
      "Web, e-posta ve dosya aktarımı TCP kullanır; canlı ses, görüntü, oyun ve DNS sorgusu çoğunlukla UDP kullanır.",
      "TCP üçlü el sıkışması SYN, SYN/ACK ve ACK sırasıyla yapılır; düzgün kapanış FIN ile, ani kesme RST ile olur.",
      "Port 16 bittir; iyi bilinen portlar 0–1023, geçici portlar 49152–65535 aralığındadır ve istemci kaynak portu genellikle geçici bir yüksek porttur.",
      "TCP pencere boyutuyla akışı denetler, onay gelmezse segmenti yeniden iletir; bu mekanizmalar UDP'de yoktur."
    ],
    quiz: [
      { id: "ab0c1bf4", q: "Canlı görüntülü toplantıda bir ses paketi kaybolduğunda eski paketi yeniden beklemek yerine akışın sürmesi tercih ediliyor. Bu tür uygulama genellikle hangisini kullanır?", options: ["TCP, çünkü her segment onaylanır","TCP, çünkü bağlantı kurulur","UDP, çünkü yeniden iletim beklemez","UDP, çünkü sıra numarası taşır"], obj: "h1" },
      { id: "2ef18f3d", q: "Bir dosyanın eksiksiz ve doğru sırayla alınması şart. Hangi taşıma protokolü uygundur?", options: ["TCP (bağlantı yönelimli)","UDP (bağlantısız)","ICMP (hata ve denetim mesajları)","ARP (adres çözümleme)"], obj: "h1" },
      { id: "a0c2175d", q: "TCP üçlü el sıkışmada mesaj sırası hangisidir?", options: ["SYN, ACK, SYN/ACK","ACK, SYN, SYN/ACK","SYN, SYN, ACK","SYN, SYN/ACK, ACK"], obj: "h2" },
      { id: "26c3225c", q: "TCP bağlantısını düzgün biçimde sonlandırmak için taraflar hangi bayrağı kullanır?", options: ["SYN (bağlantı isteği)","FIN (düzgün kapatma)","RST (ani kesme)","URG (acil veri)"], obj: "h2" },
      { id: "9437d3f1", q: "Bir bilgisayar https://ornek.com sitesine bağlanıyor. Bağlantının kaynak ve hedef portları nasıl olur?", options: ["Kaynak 443, hedef geçici yüksek port","Kaynak 80, hedef 443","Kaynak geçici yüksek port, hedef 443","Kaynak 53, hedef 80"], obj: "h3" },
      { id: "fbb6b00b", q: "Bir DNS sorgusu normalde hangi protokol ve port ile gider?", options: ["UDP 53","TCP 25","UDP 123","TCP 22"], obj: "h3" },
      { id: "a2d2c446", q: "Alıcının tamponu dolmak üzere. TCP göndericinin hızını nasıl ayarlar?", options: ["Gönderici her segmenti iki kez yollar","Alıcı pencere boyutunu küçülterek bildirir","Alıcı bağlantıyı RST ile keser ve yeniden kurar","Gönderici sıra numaralarını sıfırlar"], obj: "h4" },
      { id: "e9d50480", q: "Bir TCP segmentinin onayı (ACK) beklenen sürede gelmedi. TCP ne yapar?", options: ["Segmenti sessizce atar ve sonrakine geçer","Bağlantıyı hemen RST ile kapatır","Üçlü el sıkışmayı baştan başlatır","Onaysız segmenti yeniden iletir"], obj: "h4" }
    ],
    interview: [
      { q: "TCP ile UDP arasındaki fark nedir?", a: "TCP bağlantı kurar, sıra numarası verir, onay bekler ve kaybolan segmenti yeniden gönderir; güvenilirdir ama daha fazla yük taşır. UDP bağlantı kurmaz, onay beklemez; daha hızlıdır ve gecikmeye duyarlı uygulamalara uygundur." },
      { q: "TCP üçlü el sıkışmayı anlat.", a: "İstemci SYN gönderir, sunucu SYN/ACK ile yanıtlar, istemci ACK ile onaylar. Bu üç adımdan sonra bağlantı kurulmuş sayılır ve veri akışı başlar." },
      { q: "Bir web isteğinde kaynak ve hedef port nasıl olur?", a: "İstemci kaynak portu olarak yüksek numaralı geçici bir port seçer. Hedef port hizmete göre bellidir; HTTPS için 443'tür. Bağlantı, iki tarafın IP adresi ve port çiftiyle (soketlerle) tanımlanır." }
    ],
    vocab: [
      { term: "Three-way handshake", tr: "üçlü el sıkışma", ex: "The three-way handshake opens a TCP session." },
      { term: "Acknowledgment", tr: "onay", ex: "The receiver sends an acknowledgment." },
      { term: "Port number", tr: "port numarası", ex: "HTTPS uses port 443." },
      { term: "Window size", tr: "pencere boyutu", ex: "The window size controls the flow." },
      { term: "Retransmission", tr: "yeniden iletim", ex: "A lost segment causes a retransmission." },
      { term: "Datagram", tr: "datagram", ex: "UDP sends each datagram on its own." }
    ],
    resources: [
      res(JERE, "TCP ve UDP, port numaraları ve el sıkışma konularını anlatır")
    ],
    sources: [
      CISCO
    ]
  };

})();

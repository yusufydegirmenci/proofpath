/* Siber güvenlik yolu · Faz 5 tur 4: konu başına ders eki (anahtar = TMAP.sec dizini, 0–30).
   M§7 listesinden TMAP'te bulunmayan öğeler: benzetme + sınırı, rehberli alıştırma, bağımsız görev, yaygın hatalar,
   geçme ölçütü + kritik yanlış anlama, dış kaynak (son doğrulama tarihiyle), telafi/sonraki adım.
   Tüm uygulamalar savunma/tespit/politika odaklıdır ve yalnız kendi izole ortamında ya da kâğıt üzerinde yapılır.
   Dış kaynak: yalnız HTTP 200 dönenler (curl, 2026-10-12); CompTIA/ISO/IEEE/ISACA sayfaları doğrulanamadığı için eklenmedi. */
(function () {
  var E = ((window.PP_EK = window.PP_EK || {}).sec = (window.PP_EK.sec || {}));
  var DOG = "2026-10-12";
  var R = function (no, ad, neden) { return { t: "RFC " + no + ": " + ad, u: "https://www.rfc-editor.org/rfc/rfc" + no, dogrulama: DOG, neden: neden }; };
  var S = function (yol, ad, neden) { return { t: "NIST SP " + ad, u: "https://csrc.nist.gov/pubs/sp/800/" + yol + "/final", dogrulama: DOG, neden: neden }; };
  var K = function (t, u, neden) { return { t: t, u: u, dogrulama: DOG, neden: neden }; };

  E[0] = {
    analoji: { a: "Ev: değerli eşyalar varlık, açık pencere zafiyet, hırsız tehdit; pencerenin açık olması ve hırsızın mahallede dolaşması birleşince risk doğar.", sinir: "Evde hırsız çoğunlukla dışarıdan gelir; siber güvenlikte tehdit içeriden (hatalı ya da kötü niyetli çalışan) de gelebilir ve zafiyet fiziksel gözle görünmez." },
    rehberli: ["Bir küçük işletmenin (kafe gibi) üç varlığını yaz: müşteri listesi, kasa bilgisayarı, Wi-Fi.", "Her varlığa bir tehdit ve bir zafiyet eşle (ör. kasa bilgisayarı / fidye yazılımı / güncellenmemiş sistem).", "Her eşleşme için 'risk = tehdit ile zafiyetin buluşması' cümlesini kur ve bir önlem yaz."],
    bagimsiz: "Kendi telefonunu bir varlık say. Bir tehdit, bir zafiyet ve ortaya çıkan riski yaz; riski azaltacak bir önlemi (ör. ekran kilidi, güncelleme) belirt. Cevabını dersteki ofis örneğiyle karşılaştır.",
    hatalar: [["Tehdit ile zafiyeti aynı şey sanmak", "Tehdit zarar verebilecek olay ya da aktördür; zafiyet o zarara izin veren açıktır."], ["Önce önlem aramak", "Önce varlığı ve değerini belirle; neyi koruduğunu bilmeden önlem seçilmez."], ["Riski sıfırlanabilir sanmak", "Risk azaltılır, aktarılır ya da kabul edilir; tamamen kaldırılması nadiren mümkündür."]],
    gecme: { olcut: "Mini sınavda %80 ve bir senaryoda varlık, tehdit, zafiyet ve riski ayrı ayrı gösterebilmek.", kritik: ["Zafiyetin tek başına risk olduğunu sanmak (tehdit ve etki olmadan risk oluşmaz)", "Tehdit ile zafiyeti birbirinin yerine kullanmak"] },
    kaynaklar: [R("4949", "Internet Security Glossary, Version 2", "Güvenlik terimlerinin (tehdit, zafiyet, risk dahil) sözlüğü.")],
    telafi: "Takıldıysan tek bir varlık seç ve yalnız üç soruyu cevapla: Neyi koruyorum? Kim zarar verebilir? Hangi açık buna izin verir?",
    sonraki: "Sıradaki konu: CIA üçlüsü."
  };

  E[1] = {
    analoji: { a: "Banka kasası: içindekini yalnız yetkili görür (gizlilik), para sayısı değişmez (bütünlük), kasa mesai saatinde açılır (erişilebilirlik).", sinir: "Kasada üç özellik kolayca birlikte sağlanır; dijitalde biri güçlendikçe diğeri zayıflayabilir (çok sıkı erişim, erişilebilirliği düşürür) ve denge her sistemde yeniden kurulur." },
    rehberli: ["Üç olayı yaz: bir e-postanın başkasınca okunması, bir faturanın tutarının değiştirilmesi, bir sitenin açılmaması.", "Her olay için hangi özelliğin (G, B, E) bozulduğunu işaretle.", "Bir hastane kayıt sistemi için üç özelliği önem sırasına koy ve nedenini bir cümleyle yaz."],
    bagimsiz: "Bir online bankacılık uygulamasını düşün. Gizlilik, bütünlük ve erişilebilirlik için birer risk örneği ve birer önlem yaz. Hangisini kaybetmenin en pahalı olduğunu gerekçelendir.",
    hatalar: [["Gizliliği tek hedef sanmak", "Verinin değişmesi ya da erişilememesi de güvenlik ihlalidir."], ["Şifrelemeyi bütünlük sağlayan araç sanmak", "Şifreleme gizlilik içindir; değişmediğini göstermek için hash ya da imza gerekir."], ["Erişilebilirliği güvenlik dışı sanmak", "Hizmet kesintisi (ör. DDoS) doğrudan güvenlik olayıdır."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen bir olay için bozulan özelliği gerekçesiyle söyleyebilmek.", kritik: ["Şifrelemenin üç özelliği de tek başına sağladığını sanmak", "Güvenlik ile erişilebilirliğin birbirinden bağımsız olduğunu sanmak"] },
    telafi: "Takıldıysan olayı tek cümleye indir ve sor: Biri okudu mu (G), biri değiştirdi mi (B), kullanılamaz oldu mu (E)?",
    sonraki: "Sıradaki konu: şifreleme ve hash."
  };

  E[2] = {
    analoji: { a: "Şifreleme kilitli kutu, hash ise parmak izidir: kutu anahtarla açılır, parmak izi ise yalnız 'aynı mı?' diye karşılaştırılır.", sinir: "Parmak izi kişiye aittir ama kişiyi geri üretemezsiniz; hash de geri döndürülemez, ancak zayıf parolalar tahmin yoluyla yine de bulunabilir (bu yüzden salt gerekir)." },
    rehberli: ["Aynı dosyanın iki kopyasını düşün; biri bir harf değişirse hash'in tamamen farklı çıkacağını kâğıtta açıkla.", "Simetrik (tek anahtar) ile asimetrik (anahtar çifti) şifrelemeyi iki sütunda karşılaştır: anahtar sayısı, hız, anahtar dağıtımı.", "Parolaların neden düz değil, salt'lı hash olarak saklanması gerektiğini bir cümleyle yaz."],
    bagimsiz: "Bir indirme sitesi dosyanın yanında hash değeri veriyorsa bunun ne işe yaradığını ve hash'in gizlilik değil bütünlük sağladığını kendi cümlelerinle yaz.",
    hatalar: [["Hash'i şifreleme sanmak", "Hash tek yönlüdür; veriyi geri çıkaramazsın, yalnız eşleşmeyi kontrol edersin."], ["Parolayı şifreleyip saklamak", "Parola salt'lı ve yavaş bir hash ile saklanır; şifrelenen veri anahtarla geri açılabilir."], ["Asimetriğin her yerde simetrikten iyi olduğunu sanmak", "Asimetrik yavaştır; genelde anahtar değişiminde, asıl veri için simetrik kullanılır."]],
    gecme: { olcut: "Mini sınavda %80 ve şifreleme ile hash'in amacını örnekle ayırabilmek.", kritik: ["Hash'in geri çözülebildiğini sanmak", "Şifrelemenin bütünlüğü tek başına garanti ettiğini sanmak"] },
    kaynaklar: [K("FIPS 180-4: Secure Hash Standard (SHS)", "https://csrc.nist.gov/pubs/fips/180-4/upd1/final", "SHA ailesi hash algoritmalarını tanımlayan resmî standart.")],
    telafi: "Takıldıysan iki soruya dön: Geri açılabilmesi gerekiyor mu (şifreleme), yoksa yalnız eşleşme mi kontrol edilecek (hash)?",
    sonraki: "Sıradaki konu: kimlik ve MFA."
  };

  E[3] = {
    analoji: { a: "Konser girişi: bilet kimliğini gösterir (doğrulama), bileklik hangi alana girebileceğini belirler (yetkilendirme).", sinir: "Konserde bilet çoğu zaman tek kez kontrol edilir; dijitalde doğrulama ve yetki sürekli yeniden değerlendirilebilir ve çalınan bir oturum bileti gibi başkasına geçebilir." },
    rehberli: ["Bildiğin, sahip olduğun ve olduğun şeyler için birer örnek yaz (parola, telefon uygulaması, parmak izi).", "Parola + SMS kodu ile parola + doğrulayıcı uygulamayı karşılaştır; hangisinin neden daha sağlam olduğunu yaz.", "Bir şirkette stajyerin neden yönetici yetkisi almaması gerektiğini 'en az yetki' ile açıkla."],
    bagimsiz: "Kendi hesaplarından birinde (e-posta gibi) ikinci faktörün açık olup olmadığını kontrol et. Kapalıysa kendi hesabında açmayı dene; hangi faktör türünü seçtiğini ve nedenini yaz.",
    hatalar: [["Doğrulama ile yetkilendirmeyi aynı sanmak", "Doğrulama 'kimsin?', yetkilendirme 'ne yapabilirsin?' sorusudur."], ["İki parolayı MFA saymak", "MFA farklı türde faktör ister; iki parola aynı türdendir (bildiğin şey)."], ["Herkese geniş yetki vermek", "En az yetki ilkesi: yalnız işin gerektirdiği kadar erişim verilir."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen iki giriş yönteminin MFA olup olmadığını gerekçeyle söyleyebilmek.", kritik: ["Parola ve güvenlik sorusunu iki farklı faktör sanmak", "Doğrulanmış kullanıcının her kaynağa erişebileceğini sanmak"] },
    kaynaklar: [S("63/3", "800-63-3: Digital Identity Guidelines", "Dijital kimlik doğrulama ve kimlik güvencesi yönergeleri."), R("6238", "TOTP: Time-Based One-Time Password Algorithm", "Zamana bağlı tek kullanımlık parola algoritması.")],
    telafi: "Takıldıysan faktör türlerini üç kutuya ayır (bildiğim, sahip olduğum, olduğum) ve verilen yöntemi kutuya yerleştir.",
    sonraki: "Sıradaki konu: tehdit aktörleri."
  };

  E[4] = {
    analoji: { a: "Mahalle güvenliği: gece bekçisi arabadan çalan, evsiz bir meraklı ve organize bir çete aynı önlemle durdurulmaz; kimin geleceğini bilmek önlemi belirler.", sinir: "Mahallede suçlu genellikle belirgindir; siber aktörlerin kimliği ve ülkesi çoğunlukla belirsizdir ve aynı araçları farklı aktörler kullanabilir." },
    rehberli: ["Dört aktör yaz: bireysel suçlu, hacktivist, devlet destekli grup, içeriden tehdit; her biri için tek motivasyon yaz.", "Küçük bir muhasebe ofisi için hangi aktörün daha olası olduğunu seç ve nedenini söyle.", "Aynı ofis için bu aktöre karşı iki savunma önceliği yaz."],
    bagimsiz: "Bir haber sitesinden gerçek bir siber olay haberi oku (saldırı yöntemi değil, olayın özeti yeterli). Aktörü, olası motivasyonunu ve bir savunma dersini üç cümleyle yaz.",
    hatalar: [["Her saldırganı 'hacker' diye tek kefeye koymak", "Aktörler motivasyon ve kaynak bakımından çok farklıdır; savunma buna göre seçilir."], ["Tehdidi yalnız dışarıdan beklemek", "İçeriden tehdit (hata ya da kötü niyet) ayrı bir kategoridir."], ["Küçük kurumun hedef olmadığını sanmak", "Toplu ve otomatik saldırılar büyüklüğe bakmadan rastgele hedef seçer."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen bir senaryoda aktör türünü ve motivasyonunu gerekçeyle söyleyebilmek.", kritik: ["Tüm saldırganların aynı yetenekte ve motivasyonda olduğunu sanmak", "İç tehdidi düşünmemek"] },
    telafi: "Takıldıysan tabloyu yeniden çiz: aktör, neden yapıyor, ne kadar kaynağı var. Sonra senaryoya dön.",
    sonraki: "Sıradaki konu: oltalama."
  };

  E[5] = {
    analoji: { a: "Kapıya gelen sahte kargocu: kıyafeti ve acele ettirmesi güven uyandırır; teknik kilit değil insan kandırılır.", sinir: "Kargocu fiziksel olarak kapıda görülür; oltalamada gönderen adresi ve bağlantı görünüşü kolayca taklit edilebilir ve saldırı aynı anda binlerce kişiye gider." },
    rehberli: ["Şüpheli bir e-postanın belirtilerini listele: acele, tehdit, beklenmedik ek, uyuşmayan gönderen adresi.", "Bir bağlantının üzerine gelince (tıklamadan) görünen adresi okumanın neden önemli olduğunu yaz.", "Şüpheli e-postayla karşılaşınca atılacak adımları sırala: tıklama, ekleme açma, bildir, sil."],
    bagimsiz: "Posta kutundaki spam klasöründen (içeriğini açmadan, yalnız konu ve gönderen bilgisine bakarak) bir örnek seç ve en az üç oltalama belirtisini işaretle. Dersteki listeyle karşılaştır.",
    hatalar: [["Yalnız yazım hatasına bakmak", "Modern oltalama kusursuz yazılabilir; acele baskısı, gönderen ve bağlantı adresi de kontrol edilir."], ["Tanıdık isimle gelen her e-postaya güvenmek", "Gönderen adı kolayca taklit edilir; beklenmedik talepleri başka kanaldan doğrula."], ["Hatayı saklamak", "Tıklandıysa hemen bildirmek hasarı küçültür; cezalandırma kültürü bildirimi azaltır."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen bir e-postadaki belirtileri gösterip doğru adımı seçebilmek.", kritik: ["Antivirüsün oltalamaya karşı yeterli olduğunu sanmak", "Tıkladıktan sonra bildirmemek"] },
    telafi: "Takıldıysan tek bir kural çalış: beklenmedik + acele ettiren + bağlantı ya da ek içeren e-posta, başka kanaldan doğrulanana kadar güvenilmezdir.",
    sonraki: "Sıradaki konu: zafiyet yönetimi."
  };

  E[6] = {
    analoji: { a: "Ev bakımı: önce hangi musluk ve kilitlerin var olduğunu yazarsın (envanter), sonra arızaları bulursun (tarama), en çok su akıtanı önce onarırsın (önceliklendirme).", sinir: "Evde tüm arızalar görünür sırayla onarılabilir; siber zafiyetler binlerce olabilir, her yama zaman ve risk getirir ve onarım sonrası doğrulama gerekir." },
    rehberli: ["Evdeki beş cihazı (telefon, router, TV...) envanter tablosuna yaz: ad, yazılım sürümü, sahibi.", "İki zafiyeti karşılaştır: biri internetten erişilen cihazda, diğeri kapalı ağdaki cihazda; hangisini önce kapatırsın?", "Yama sonrası zafiyetin gerçekten kapandığını nasıl doğrularsın? Bir cümle yaz."],
    bagimsiz: "Kendi bilgisayarının işletim sistemi güncellemelerini kontrol et. Bekleyen güncelleme varsa türünü (güvenlik/özellik) not et ve hangisini önce kuracağını gerekçelendir. Yalnız kendi cihazında çalış.",
    hatalar: [["Hepsini aynı anda kapatmaya çalışmak", "Riske göre sırala: erişilebilirlik, istismar edilebilirlik ve varlığın değeri."], ["Envanter tutmamak", "Bilmediğin cihazı taramaz ya da yamalayamazsın."], ["Yama kurulduktan sonra doğrulamamak", "Yamanın gerçekten uygulandığı yeniden tarama ile doğrulanır."]],
    gecme: { olcut: "Mini sınavda %80 ve iki zafiyeti riske göre sıralayıp gerekçesini söyleyebilmek.", kritik: ["Yüksek puanlı her zafiyetin her ortamda en acil olduğunu sanmak", "Taramanın yama yerine geçtiğini sanmak"] },
    kaynaklar: [S("40/r4", "800-40 Rev. 4: Guide to Enterprise Patch Management Planning", "Kurumsal yama yönetimi planlaması."), S("115", "800-115: Technical Guide to Information Security Testing and Assessment", "Güvenlik testi ve değerlendirme yöntemleri.")],
    telafi: "Takıldıysan tek bir zafiyet al ve sor: Dışarıdan erişilebilir mi? Değerli bir varlığı mı etkiliyor? Cevaba göre sırala.",
    sonraki: "Sıradaki konu: güvenlik duvarı ve segmentasyon."
  };

  E[7] = {
    analoji: { a: "Gemi bölmeleri: bir bölme su alırsa kapılar kapanır ve gemi batmaz; segmentasyon da zararı tek bölmeye hapseder.", sinir: "Geminin bölmeleri fiziksel ve kalıcıdır; ağ segmentleri arasındaki geçişler kural ve yapılandırmayla belirlenir, yanlış kural kapıyı açık bırakır." },
    rehberli: ["Küçük bir ofisin ağını çiz: kullanıcı PC'leri, sunucu, yazıcı, misafir Wi-Fi'ı.", "Misafir Wi-Fi'ı ayrı segmente al ve hangi kuralla (hangi yönde izin/ret) korunacağını yaz.", "Bir PC ele geçerse düz ağda ve segmentli ağda saldırganın nelere ulaşacağını iki sütunda karşılaştır."],
    bagimsiz: "Kendi ev ağında misafir ağı özelliği varsa (modem arayüzünde) etkin olup olmadığına bak ve ev cihazlarını güven düzeyine göre iki gruba ayır. Yalnız kendi cihazında çalış.",
    hatalar: [["Güvenlik duvarını tek başına yeterli sanmak", "Duvar bir katmandır; segmentasyon, izleme ve yama ile birlikte çalışır."], ["Varsayılan 'hepsine izin ver' kuralıyla bırakmak", "Önce hepsini reddet, gerekeni açıkça izin ver."], ["DMZ'yi iç ağın parçası sanmak", "DMZ, dışarıya açık hizmetlerin iç ağdan ayrı tutulduğu bölgedir."]],
    gecme: { olcut: "Mini sınavda %80 ve bir ağ çizimini segmentlere bölüp kural mantığını gerekçelendirebilmek.", kritik: ["Segmentasyonun yatay hareketi engellemediğini sanmak", "Tüm trafiğe varsayılan izin vermenin güvenli olduğunu sanmak"] },
    kaynaklar: [S("41/r1", "800-41 Rev. 1: Guidelines on Firewalls and Firewall Policy", "Güvenlik duvarı türleri ve politika yönergeleri.")],
    telafi: "Takıldıysan çizimi yeniden yap ve her segmentin hangisiyle konuşabileceğini oklarla göster; okun olmadığı yer yasaktır.",
    sonraki: "Sıradaki konu: log ve SIEM."
  };

  E[8] = {
    analoji: { a: "Güvenlik kamerası kayıtları: kaydın varlığı yetmez, birinin izlemesi ve şüpheli hareketi fark etmesi gerekir.", sinir: "Kamerada olay görüntüde açıkça görünür; logda olay binlerce satır arasına gizlenir ve eksik zaman damgası ya da kapalı log, olayı hiç göstermez." },
    rehberli: ["Üç log kaynağı yaz: işletim sistemi, güvenlik duvarı, uygulama; her biri için bir olay örneği ver.", "Aynı kullanıcıdan 5 dakikada 20 başarısız giriş logunu düşün; bir alarm kuralı cümlesi yaz.", "Logların neden tek merkezde toplanması ve saatlerin eşitlenmesi gerektiğini bir cümleyle açıkla."],
    bagimsiz: "Kendi bilgisayarında olay görüntüleyiciyi (Windows) ya da sistem günlüklerini aç ve son bir saatteki bir uyarı kaydını oku. Kaydın ne zaman, ne ürettiğini ve önem düzeyini yaz. Yalnız kendi cihazında çalış.",
    hatalar: [["Log tutup hiç bakmamak", "İzleme ve alarm olmadan log yalnızca depolamadır."], ["Her şeyi alarm yapmak", "Çok alarm yorgunluk yaratır; kural önem ve bağlama göre ayarlanır."], ["Logları sunucuda bırakmak", "Saldırgan sunucuyu ele geçirirse logu siler; merkezi ve korumalı toplama gerekir."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen bir log örneğinde şüpheli deseni gösterip alarm kuralı yazabilmek.", kritik: ["Logun kendi başına koruma sağladığını sanmak", "Saat senkronizasyonunun önemsiz olduğunu sanmak"] },
    kaynaklar: [S("92", "800-92: Guide to Computer Security Log Management", "Güvenlik günlüklerinin toplanması ve yönetimi.")],
    telafi: "Takıldıysan tek bir olay seç ve zinciri çiz: olay, log kaydı, toplama, alarm, bakan kişi.",
    sonraki: "Sıradaki konu: olay müdahalesi."
  };

  E[9] = {
    analoji: { a: "Yangın tatbikatı: kim neyi çalıştırır, nereye toplanılır önceden bellidir; panik anında karar vermek gerekmez.", sinir: "Yangında hedef çoğunlukla tahliyedir; siber olayda önce kanıtı bozmadan sınırlandırmak, sonra temizlik gerekir ve olay günlerce fark edilmemiş olabilir." },
    rehberli: ["Müdahale aşamalarını sırala: hazırlık, tespit ve analiz, sınırlama, temizleme ve kurtarma, olay sonrası.", "Bir bilgisayarda fidye notu görüldüğünü varsay: ilk üç hareketini sıralı yaz (ağdan ayırmak, kapatmamak, bildirmek).", "Olay sonrası toplantıda cevaplanacak üç soruyu yaz."],
    bagimsiz: "Kendi evin ya da küçük bir iş için bir sayfalık 'olay olursa' planı yaz: kime haber verilir, hangi cihaz ayrılır, hangi yedek geri yüklenir. Yalnız kâğıt üzerinde.",
    hatalar: [["Bilgisayarı hemen kapatmak", "Bellekteki kanıt kaybolur; önce ağdan ayır, sonra uzmana danış."], ["Planı olay anında yazmak", "Plan önceden yazılır ve tatbikatla denenir."], ["Olayı kapatıp dersleri almamak", "Olay sonrası inceleme ayrı bir aşamadır ve süreci iyileştirir."]],
    gecme: { olcut: "Mini sınavda %80 ve bir senaryoda aşamaları doğru sırayla ve gerekçesiyle sıralayabilmek.", kritik: ["Temizlemeyi sınırlamadan önce yapmak", "Müdahalede rol ve iletişim planı gerekmediğini sanmak"] },
    kaynaklar: [S("61/r2", "800-61 Rev. 2: Computer Security Incident Handling Guide", "Olay müdahalesi yaşam döngüsü ve süreç yönergesi.")],
    telafi: "Takıldıysan döngüyü bir daire olarak çiz ve bir olay için her aşamaya bir cümle yaz.",
    sonraki: "Sıradaki konu: risk yönetimi."
  };

  E[10] = {
    analoji: { a: "Sigorta kararı: riski azaltırsın (alarm), aktarırsın (sigorta), kabul edersin (küçük zarar) ya da kaçınırsın (riskli işi yapmazsın).", sinir: "Sigortada prim ve zarar para olarak nettir; siber riskte olasılık ve etki çoğu zaman tahmindir ve itibar kaybı gibi etkiler sayıya dökülemez." },
    rehberli: ["Bir riski seç ve olasılığı ile etkisini düşük/orta/yüksek olarak işaretle.", "Dört seçeneği (azalt, aktar, kabul et, kaçın) bu riske birer örnekle uygula.", "Riskin sahibini (kim karar verir) ve kabul edilen riskin kimin imzasıyla kayda geçeceğini yaz."],
    bagimsiz: "Kendi dijital hayatından üç riski (parola tekrarı, yedeksizlik, güncellemesiz cihaz) bir risk tablosuna yaz: olasılık, etki, seçenek. Önceliklendirme sırasını gerekçelendir.",
    hatalar: [["Tüm riskleri sıfırlamaya çalışmak", "Kaynak sınırlıdır; önce yüksek olasılıklı ve yüksek etkili riskler ele alınır."], ["Riski kabul etmeyi ihmal saymak", "Bilinçli, kayıtlı ve sahipli kabul geçerli bir risk kararıdır."], ["Riski yalnız BT'nin işi sanmak", "Risk sahibi iş tarafıdır; BT tavsiye ve uygulama yapar."]],
    gecme: { olcut: "Mini sınavda %80 ve bir riski dört seçenekten uygun olanla eşleyip gerekçelendirebilmek.", kritik: ["Riskin sahibi olmadan karar verilebileceğini sanmak", "Kabul etmenin görmezden gelmek anlamına geldiğini sanmak"] },
    kaynaklar: [S("30/r1", "800-30 Rev. 1: Guide for Conducting Risk Assessments", "Risk değerlendirmesi yürütme yönergesi.")],
    telafi: "Takıldıysan olasılık ve etkiyi iki eksene koy; sağ üst köşedeki riskten başla.",
    sonraki: "Sıradaki konu: yedekleme ve kurtarma."
  };

  E[11] = {
    analoji: { a: "Yedek anahtar: evin anahtarını bir komşuda, bir ofiste ve bir kasada tutarsın; biri kaybolsa girebilirsin.", sinir: "Anahtar kopyası ilk günden çalışır; yedek dosyalar bozulmuş, eksik ya da geri yüklenemez olabilir ve bunu yalnız deneyerek öğrenirsin." },
    rehberli: ["3-2-1 kuralını yaz: üç kopya, iki farklı ortam, bir kopya başka yerde.", "RPO'yu 'en çok ne kadar veri kaybı kabul edilir', RTO'yu 'en çok ne kadar sürede geri dönülür' diye kendi cümlenle yaz.", "Günlük yedekli bir küçük işletmede RPO ve RTO'nun ne olabileceğini tahmin et."],
    bagimsiz: "Önemsiz bir klasörü kendi bilgisayarında bir yere yedekle, sonra yedekten başka bir klasöre geri yüklemeyi dene ve dosyaların açıldığını doğrula. Yalnız kendi dosyanda çalış.",
    hatalar: [["Yedeği aynı diskte tutmak", "Disk bozulursa asıl veri ile yedek birlikte gider; ayrı ortam gerekir."], ["Geri yüklemeyi hiç denememek", "Denenmemiş yedek yalnız umuttur; düzenli geri yükleme testi gerekir."], ["Yedeği ağa açık bırakmak", "Fidye yazılımı bağlı yedeği de şifreleyebilir; çevrimdışı ya da değişmez kopya gerekir."]],
    gecme: { olcut: "Mini sınavda %80 ve bir senaryo için RPO, RTO ve 3-2-1 planını söyleyebilmek.", kritik: ["Yedek aldığı için geri yükleyebileceğini garanti saymak", "RPO ile RTO'yu karıştırmak"] },
    kaynaklar: [S("34/r1", "800-34 Rev. 1: Contingency Planning Guide for Federal Information Systems", "Sistem süreklilik ve kurtarma planlaması.")],
    telafi: "Takıldıysan yedeğini üç soruyla sına: Kaç kopya? Kaç farklı ortam? Hiç geri yükledim mi?",
    sonraki: "Sıradaki konu: kontrol türleri."
  };

  E[12] = {
    analoji: { a: "Evin güvenliği: kilit (teknik), aile kuralları (yönetsel), her akşam kapıları kontrol etmek (operasyonel), duvar ve çit (fiziksel).", sinir: "Evde kontrolleri tek kişi yönetir; kurumda bir önlem birden çok türe girebilir ve türler arasındaki boşluk (ör. kuralı olup teknik uygulamanın olmaması) görünmez kalabilir." },
    rehberli: ["Beş önlemi tabloya yaz: güvenlik duvarı, parola politikası, kapı kartı, güvenlik eğitimi, yedekleme prosedürü.", "Her birini teknik, yönetsel, operasyonel ya da fiziksel olarak etiketle.", "Tablo yalnız tek tür doluysa hangi boşlukların oluşacağını yaz."],
    bagimsiz: "Kendi evin ya da iş yerinin bir riski için her türden en az bir kontrol öner. Hangi türün eksik kaldığını belirt.",
    hatalar: [["Güvenliği yalnız teknik araç sanmak", "Politika, süreç ve fiziksel önlem de kontrol türüdür."], ["Aynı kontrolü tek türe sığdırmak", "Bir kontrol birden çok türe girebilir; amaca göre sınıflandır."], ["Kontrolü koyup denetlememek", "Kontrol çalışıyor mu diye düzenli ölçülmelidir."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen önlemleri doğru türlere ayırıp eksik türü gösterebilmek.", kritik: ["Yazılı politikanın kendi başına teknik önlem yerine geçtiğini sanmak", "Fiziksel güvenliğin siber güvenlikten bağımsız olduğunu sanmak"] },
    kaynaklar: [S("53/r5", "800-53 Rev. 5: Security and Privacy Controls for Information Systems and Organizations", "Güvenlik ve gizlilik kontrol kataloğu.")],
    telafi: "Takıldıysan önlemi sor: Bir cihaz mı, bir kural mı, bir alışkanlık mı, bir kapı mı? Cevap türü verir.",
    sonraki: "Sıradaki konu: sertifika ve PKI."
  };

  E[13] = {
    analoji: { a: "Pasaport: devlet (CA) kimliği doğrular, imzalar ve damga basar; sınırdaki memur devleti tanıdığı için pasaporta güvenir.", sinir: "Pasaport kaybolunca resmî olarak iptal edilir ve ülkeler bunu hızla öğrenir; sertifika iptali (CRL/OCSP) kontrol edilmezse çalınmış sertifika geçerli görünebilir." },
    rehberli: ["Sertifika zincirini çiz: kök CA, ara CA, site sertifikası.", "Tarayıcının sitenin sertifikasını neden geçerli saydığını üç kontrolle yaz: imza zinciri, süre, alan adı eşleşmesi.", "Süresi dolmuş bir sertifikanın tarayıcıda neden uyarı verdiğini açıkla."],
    bagimsiz: "Tarayıcıda güvenli bir sitenin kilit simgesine tıklayıp sertifika bilgilerini aç. Veren CA'yı, geçerlilik bitiş tarihini ve alan adını not et. Yalnız görüntüleme yap.",
    hatalar: [["Kilit simgesini sitenin güvenilir olduğu sanmak", "Kilit yalnız bağlantının şifreli ve sertifikanın geçerli olduğunu söyler; site yine zararlı olabilir."], ["Sertifika uyarısını geçmek", "Uyarı güven zincirinin bozulduğunu gösterir; devam etmeden nedeni anla."], ["Özel anahtarı paylaşmak", "Özel anahtar sertifikanın sırrıdır; sızarsa sertifika iptal edilmelidir."]],
    gecme: { olcut: "Mini sınavda %80 ve bir sertifika zincirini sıralayıp neden güvenildiğini söyleyebilmek.", kritik: ["Herkesin sertifika verebilmesinin güvenli olduğunu sanmak", "İptalin süre dolmasıyla aynı olduğunu sanmak"] },
    kaynaklar: [R("5280", "Internet X.509 Public Key Infrastructure Certificate and CRL Profile", "X.509 sertifika ve iptal listesi (CRL) profili."), R("6960", "X.509 Internet PKI Online Certificate Status Protocol (OCSP)", "Sertifika iptal durumunu çevrimiçi sorgulama.")],
    telafi: "Takıldıysan yalnız zinciri çalış: kök CA'ya güveniyorum, kök ara CA'yı imzaladı, ara CA siteyi imzaladı.",
    sonraki: "Sıradaki konu: zararlı yazılım."
  };

  E[14] = {
    analoji: { a: "Hastalıklar: virüs bir konağa ihtiyaç duyar, solucan kendi kendine yayılır, truva atı iyi görünüp içeriden zarar verir, fidye ise şantajdır.", sinir: "Gerçek hastalıklar sınıflara kesin ayrılır; modern zararlılar birkaç türün özelliğini bir arada taşır ve tür adı yerine davranışa bakmak gerekir." },
    rehberli: ["Dört türü yayılma yöntemine göre tabloya yaz: konak ister mi, kendi yayılır mı, kullanıcıyı mı kandırır?", "Her tür için tek ana savunma yaz (solucan: segmentasyon ve yama, truva: kaynak kontrolü, fidye: yedek).", "Bir kullanıcı 'ücretsiz PDF dönüştürücü' kurduktan sonra yavaşlama bildirdi: hangi türü düşünür ve ilk adımın ne olur?"],
    bagimsiz: "Antivirüsünün (Windows Güvenliği gibi) güncel olduğunu ve gerçek zamanlı korumanın açık olduğunu kendi bilgisayarında kontrol et. Sonuçları ve bir önlem önerisini yaz. Zararlı örnek indirme.",
    hatalar: [["Tüm zararlıları 'virüs' diye adlandırmak", "Tür bilgisi savunmayı belirler; solucan ve fidye farklı önlem ister."], ["Antivirüs yüklü diye tıklama özgürlüğü hissetmek", "Antivirüs yeni zararlıyı kaçırabilir; davranış ve farkındalık da gerekir."], ["Fidye ödemeyi çözüm sanmak", "Ödeme verinin dönmesini garanti etmez; çözüm temiz yedektir."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen davranış tarifini doğru zararlı türüyle ve savunmasıyla eşleyebilmek.", kritik: ["Truva atının kendi kendine yayıldığını sanmak", "Fidye yazılımına karşı en iyi savunmanın ödeme olduğunu sanmak"] },
    kaynaklar: [S("83/r1", "800-83 Rev. 1: Guide to Malware Incident Prevention and Handling for Desktops and Laptops", "Zararlı yazılım olaylarını önleme ve yönetme yönergesi.")],
    telafi: "Takıldıysan türleri tek soruyla ayır: Kendi yayılıyor mu? Kullanıcı mı kandırılıyor? Veri mi rehin alınıyor?",
    sonraki: "Sıradaki konu: ağ saldırıları."
  };

  E[15] = {
    analoji: { a: "Kalabalık bir mağaza: sahte müşteri kasaları tıkar (DDoS), bir kişi araya girip konuşmaları dinler (MITM), tabela değiştirip yönlendirir (ARP sahtekârlığı), biri raflara bakıp zayıf noktaları yoklar (keşif).", sinir: "Mağazada kalabalık gözle görülür; ağ saldırıları çoğunlukla fark edilmeden olur ve kaynağı birçok farklı cihazdan gelebilir." },
    rehberli: ["Her saldırının hangi varsayıma saldırdığını yaz: DDoS kapasiteye, MITM güvene, ARP adres eşlemesine, tarama bilgi eksikliğine.", "MITM'e karşı iki savunma yaz (şifreli bağlantı, sertifika kontrolü); ARP sahtekârlığına karşı bir savunma (switch'te ilgili koruma).", "Ağ trafiğinde ani artış görüldüğünde hangi logu ve hangi alarmı kontrol edeceğini yaz."],
    bagimsiz: "Kendi ev ağındaki cihaz listesini modem arayüzünden aç ve tanımadığın cihaz var mı bak. Varsa hangi bilgiyle tanıyacağını yaz. Başka ağda tarama yapma; yalnız kendi ağında listeye bak.",
    hatalar: [["DDoS'u yalnız tek bir güçlü saldırgan sanmak", "Çoğunlukla çok sayıda ele geçirilmiş cihazdan gelir ve kapasiteyi doldurur."], ["Halka açık Wi-Fi'da şifreli olmayan siteye girmek", "Trafik araya girilerek okunabilir; HTTPS ve VPN gerekir."], ["Taramayı saldırı olarak görmemek", "Tarama keşif aşamasıdır; sık ve sistematik tarama ön uyarıdır."]],
    gecme: { olcut: "Mini sınavda %80 ve her saldırının hedeflediği varsayımı ve bir savunmayı söyleyebilmek.", kritik: ["HTTPS kullanımının MITM'e karşı anlamsız olduğunu sanmak", "DDoS'un veriyi çaldığını sanmak (amaç erişilebilirliği bozmaktır)"] },
    telafi: "Takıldıysan tabloyu kur: saldırı, hangi varsayımı bozuyor, hangi CIA özelliğini etkiliyor, hangi savunma?",
    sonraki: "Sıradaki konu: uygulama saldırıları."
  };

  E[16] = {
    analoji: { a: "Banka gişesindeki fiş: memur fişteki her yazıyı talimat sanırsa, 'tüm parayı ver' yazılı fiş de işlenir; fişteki yazının veri olarak kalması gerekir.", sinir: "Gişede memur gözle fişi okur; uygulamada girdinin komut mu veri mi olduğuna yazılım karar verir ve bu karar kodda yanlış yapılırsa hata her kullanıcıyı etkiler." },
    rehberli: ["Üç saldırıyı etkileriyle eşle: SQL enjeksiyonu (veritabanı), XSS (başka kullanıcının tarayıcısı), CSRF (oturumdaki işlem).", "Her biri için tek savunma yaz: parametreli sorgu, çıktı kodlama, CSRF belirteci.", "Bir form alanına gelen veriyi 'doğrula, temizle, kodla' sırasıyla nasıl işleyeceğini üç adımda yaz."],
    bagimsiz: "Kendi yazdığın ya da incelediğin basit bir formda (kendi yerel ortamında) kullanıcı girdisinin nereye gittiğini izle ve doğrulanmayan yer var mı not et. Başkasının sitesinde deneme yapma; yalnız kendi izole ortamında incele.",
    hatalar: [["Girdiyi yalnız istemci tarafında doğrulamak", "Tarayıcı kontrolü atlanabilir; sunucuda da doğrulama şarttır."], ["SQL sorgusunu metin birleştirerek kurmak", "Parametreli sorgu kullan; girdi komut olarak yorumlanmaz."], ["XSS'i yalnız site sahibinin sorunu saymak", "Kurban başka kullanıcılardır; çıktı kodlama ve içerik politikası gerekir."]],
    gecme: { olcut: "Mini sınavda %80 ve her saldırı için etkisini ve ana savunmasını söyleyebilmek.", kritik: ["Yalnız istemci tarafı doğrulamanın yeterli olduğunu sanmak", "Güvenlik duvarının uygulama saldırılarını tek başına durdurduğunu sanmak"] },
    kaynaklar: [K("OWASP Top Ten", "https://owasp.org/www-project-top-ten/", "Web uygulamalarındaki en kritik güvenlik risklerinin listesi."), K("OWASP: SQL Injection", "https://owasp.org/www-community/attacks/SQL_Injection", "SQL enjeksiyonunun tanımı ve önlenmesi."), K("OWASP: Cross Site Scripting (XSS)", "https://owasp.org/www-community/attacks/xss/", "XSS'in tanımı ve savunması."), K("OWASP: Cross Site Request Forgery (CSRF)", "https://owasp.org/www-community/attacks/csrf", "CSRF'nin tanımı ve savunması.")],
    telafi: "Takıldıysan tek ilkeye dön: kullanıcıdan gelen hiçbir şey komut olarak çalışmamalı, her zaman veri olarak ele alınmalı.",
    sonraki: "Sıradaki konu: VPN (uzak erişim ve tünelleme)."
  };

  E[17] = {
    analoji: { a: "Kalabalık yolda zırhlı geçit: aracın içi dışarıdan görünmez, yolun geri kalanı herkese açıktır.", sinir: "Zırhlı geçit boyunca içeride güven vardır; VPN yalnız tünel boyunca korur, uç cihaz zararlıysa ya da hedef sunucu güvensizse tünel bunu düzeltmez." },
    rehberli: ["Tüneli çiz: cihaz, VPN geçidi, internet, iç ağ. Şifreli bölümü işaretle.", "Uzaktan erişim VPN ile siteden siteye VPN'i karşılaştır: kim bağlanır, nerede kurulur?", "VPN açıkken bile neden cihazın güncel ve tarama açısından temiz olması gerektiğini yaz."],
    bagimsiz: "Kendi cihazında VPN kullanıyorsan ya da kullanmayı düşünüyorsan hangi tehdide (halka açık Wi-Fi) karşı koruduğunu ve neyi korumadığını (ör. zararlı site) iki sütunda yaz.",
    hatalar: [["VPN'i her şeyi gizleyen araç sanmak", "VPN trafiği tünelde şifreler; hedef site ve VPN sağlayıcı yine bilgi görebilir."], ["Kimlik doğrulamasını zayıf bırakmak", "VPN girişi parola + MFA ile korunmalı; ele geçen hesap içeri doğrudan kapıdır."], ["Tüm trafiği tünele katmayı gerekçesiz kapatmak", "Hangi trafiğin tünele gireceği bilinçli seçilmelidir."]],
    gecme: { olcut: "Mini sınavda %80 ve iki VPN türünü kullanım senaryosuyla ayırabilmek.", kritik: ["VPN'in uç cihazı zararlıdan koruduğunu sanmak", "VPN kimliğini parolayla sınırlı tutmanın yeterli olduğunu sanmak"] },
    kaynaklar: [R("4301", "Security Architecture for the Internet Protocol", "IPsec'in mimarisi ve güvenlik hizmetleri."), S("77/r1", "800-77 Rev. 1: Guide to IPsec VPNs", "IPsec VPN planlama ve yapılandırma yönergesi.")],
    telafi: "Takıldıysan tüneli yeniden çiz ve şifreli bölümü kalın çizgiyle belirt; çizginin dışı korumasızdır.",
    sonraki: "Sıradaki konu: bulut ve sanallaştırma."
  };

  E[18] = {
    analoji: { a: "Apartman: bina sahibi çatı ve girişi korur (sağlayıcı), daire içindeki kilit ve eşya kiracıya aittir (müşteri).", sinir: "Apartmanda sorumluluk sözleşmeyle belirgindir; bulutta sınır hizmet modeline (IaaS/PaaS/SaaS) göre kayar ve yanlış yapılandırma bulut olaylarının sık nedenlerindendir." },
    rehberli: ["IaaS, PaaS ve SaaS için tabloda kim neyi yönetir (işletim sistemi, uygulama, veri) işaretle.", "Verinin hangi hizmet modelinde olursa olsun kimde kaldığını yaz (müşteride).", "Herkese açık bırakılmış bir depolama alanı örneğini ve nasıl önleneceğini (varsayılan kapalı, düzenli kontrol) bir cümleyle yaz."],
    bagimsiz: "Kullandığın bir bulut hizmetinde (e-posta ya da depolama) paylaşım ayarlarını aç ve herkese açık paylaşım var mı kontrol et. Gereksiz olanı kapat. Yalnız kendi hesabında çalış.",
    hatalar: [["Bulutta her şeyi sağlayıcının koruduğunu sanmak", "Veri, kimlik ve yapılandırma müşteri sorumluluğundadır."], ["Varsayılan yapılandırmaya güvenmek", "Varsayılanlar kolaylık içindir; paylaşım ve erişimi kendin gözden geçir."], ["Sanallaştırmayı fiziksel ayrım sanmak", "Sanal makineler aynı donanımı paylaşır; ayrım yazılımla sağlanır, yapılandırma önemlidir."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen bir hizmet modelinde sorumluluğun kimde olduğunu gösterebilmek.", kritik: ["Bulut sağlayıcısının müşteri verisinden tamamen sorumlu olduğunu sanmak", "Yanlış yapılandırmanın önemli bir risk olmadığını sanmak"] },
    telafi: "Takıldıysan modeli seç (IaaS/PaaS/SaaS) ve katmanları aşağıdan yukarı yaz; çizgiyi sağlayıcı ile müşteri arasına çek.",
    sonraki: "Sıradaki konu: veri koruma."
  };

  E[19] = {
    analoji: { a: "Değerli eşya: evde kasada (durağan), kargoda kilitli kolide (aktarım), elinde kullanırken (kullanımda) korunur; her durumun kendi riski vardır.", sinir: "Eşya aynı anda yalnız bir durumdadır; veri kopyalanabildiği için aynı anda birden fazla durumda bulunur ve bir kopyanın korunması diğerini korumaz." },
    rehberli: ["Bir müşteri kaydı için üç durumu yaz: veritabanında, ağda, ekranda; her biri için bir koruma ver (disk şifreleme, TLS, erişim yetkisi).", "Dört sınıflandırma düzeyi uydur (genel, dahili, gizli, çok gizli) ve her birine bir veri örneği ata.", "Sınıflandırmanın neden her veriye aynı önlemi koymaktan ucuz ve etkili olduğunu yaz."],
    bagimsiz: "Kendi bilgisayarındaki dosyaları üç gruba ayır: herkese açılabilir, kişisel, çok özel. Özel dosyalar için hangi korumayı (şifreli klasör, parola) seçeceğini yaz.",
    hatalar: [["Yalnız durağan veriyi şifrelemek", "Aktarımdaki veri de korunmalı (TLS); kullanımdaki veri için erişim kontrolü gerekir."], ["Her veriyi aynı düzeyde saklamak", "Sınıflandırma kaynak ve önlemi veriye göre ayarlamayı sağlar."], ["Silinen veriyi yok olmuş saymak", "Silme, veri kurtarılabilir kalabilir; güvenli silme ya da şifreleme gerekir."]],
    gecme: { olcut: "Mini sınavda %80 ve bir veri için üç duruma karşı koruma ve sınıflandırma düzeyini söyleyebilmek.", kritik: ["Disk şifrelemenin ağda giden veriyi de koruduğunu sanmak", "Sınıflandırmanın gereksiz bürokrasi olduğunu sanmak"] },
    telafi: "Takıldıysan verinin yolunu çiz: nerede duruyor, nasıl gidiyor, kim kullanıyor? Her noktaya bir koruma yaz.",
    sonraki: "Sıradaki konu: sertleştirme."
  };

  E[20] = {
    analoji: { a: "Yeni ev teslimi: kapılar varsayılan anahtarla gelir; taşınınca kilidi değiştirir, kullanılmayan kapıyı kapatırsın.", sinir: "Evde kapı sayısı sabittir; yazılımda her yeni özellik ve hizmet yeni yüzey ekleyebilir, sertleştirme tek seferlik değil süreklidir." },
    rehberli: ["Yeni kurulmuş bir sunucu için dört işi yaz: gereksiz hizmeti kapat, varsayılan hesap parolasını değiştir, yamaları uygula, temel yapılandırmaya uydur.", "Standart temel yapılandırmanın (baseline) neden her makinede aynı olması gerektiğini açıkla.", "Bir hizmetin neden 'kullanılmıyorsa kapat' kuralına uyması gerektiğini bir cümleyle yaz."],
    bagimsiz: "Kendi bilgisayarında kullanmadığın bir programı ya da otomatik başlayan uygulamayı kapat ya da kaldır. Neden kapatabildiğini ve riski nasıl azalttığını yaz. Yalnız kendi cihazında çalış.",
    hatalar: [["Varsayılan parolayı bırakmak", "Varsayılan hesaplar herkesçe bilinir; ilk iş değiştirilir ya da kapatılır."], ["Sertleştirmeyi bir kez yapıp bırakmak", "Yeni yama ve hizmetlerle yapılandırma sapar; düzenli kontrol gerekir."], ["Her şeyi kapatıp işi durdurmak", "Hedef gereksizi kapatmaktır; işin gerektirdiği hizmet çalışmaya devam eder."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen bir sistem için dört sertleştirme adımını örnekleyebilmek.", kritik: ["Varsayılan kurulumun güvenli olduğunu sanmak", "Sertleştirmenin yama yönetimiyle ilgisiz olduğunu sanmak"] },
    kaynaklar: [S("123", "800-123: Guide to General Server Security", "Sunucu güvenliği ve sertleştirme yönergesi.")],
    telafi: "Takıldıysan listeyi dörde indir ve sırayla soru sor: Hangi hizmet gereksiz? Hangi hesap varsayılan? Hangi yama eksik?",
    sonraki: "Sıradaki konu: güvenlik otomasyonu."
  };

  E[21] = {
    analoji: { a: "Fabrikada otomat: tekrarlanan işi makine hatasız yapar, insan istisna ve karar işine kalır.", sinir: "Fabrikada makine hata yaparsa çıktı bozuk çıkar ve fark edilir; güvenlik otomasyonu yanlış kuralda binlerce hesabı bir anda kilitleyebilir, bu yüzden onay ve geri alma gerekir." },
    rehberli: ["Üç tekrarlı işi yaz (şüpheli IP'yi engelle, zayıf parolayı tespit et, yama raporu çıkar) ve hangisinin otomatikleştirilebileceğini işaretle.", "SOAR'ın bir alarmı alıp zenginleştirip bir bilet açtığı akışı kutu-ok olarak çiz.", "Hangi adımlarda insan onayı şart olmalı? İki örnek yaz (hesap silmek, üretim sistemini kapatmak)."],
    bagimsiz: "Kendi bilgisayarında bir görevi (ör. haftalık yedek) otomatik çalışacak şekilde zamanla (zamanlanmış görev). Her çalışmada sonucu nasıl kontrol edeceğini yaz. Yalnız kendi cihazında çalış.",
    hatalar: [["Her şeyi otomatikleştirmek", "Yüksek etkili kararlar insan onayı ister."], ["Kuralı denemeden devreye almak", "Önce test ortamında ve izleme modunda dene; yanlış pozitif sayısına bak."], ["Altyapıyı elle yapılandırmak", "Kod olarak altyapı sürüm kontrollü, tekrarlanabilir ve denetlenebilirdir."]],
    gecme: { olcut: "Mini sınavda %80 ve otomatikleştirilecek ve insana bırakılacak işleri gerekçeyle ayırabilmek.", kritik: ["Otomasyonun hata yapamayacağını sanmak", "İnsan onayının otomasyonu anlamsız kıldığını sanmak"] },
    telafi: "Takıldıysan iki sütun çiz: tekrarlı ve düşük riskli (otomatik), yüksek etkili ve belirsiz (insan onaylı).",
    sonraki: "Sıradaki konu: adli kanıt."
  };

  E[22] = {
    analoji: { a: "Suç mahalli: eldiven giyilir, her nesne etiketlenir, kim aldı kime verdi yazılır; kanıt bozulursa mahkemede değeri düşer.", sinir: "Suç mahallinde eşya yerinde durur; dijital kanıt bellekte uçucudur, kapanınca yok olur; kopyanın aslıyla aynı olduğu söylemekle değil, hash eşleşmesiyle gösterilir." },
    rehberli: ["Uçuculuk sırasını yaz: bellek, ağ bağlantıları, çalışan işlemler, disk, kalıcı yedekler (en uçucudan en kalıcıya).", "Bir diskin kopyası alındıktan sonra aslıyla kopyanın hash'inin eşleşmesinin neden önemli olduğunu yaz.", "Gözetim zinciri formunda neleri belirtirsin (kim, ne zaman, neyi, kime teslim etti)?"],
    bagimsiz: "Kendi sahip olduğun önemsiz bir dosya için kâğıt üzerinde bir gözetim zinciri formu doldur: dosyanın adı, hash değerinin kaydedileceği alan, kim aldı, ne zaman, kime teslim etti. Başkasına ait cihaza dokunma.",
    hatalar: [["Kanıt olan cihazı hemen kurcalamak", "Çalışan sistemi değiştirmek kanıtı bozar; uçuculuk sırasına göre topla ve her adımı belgele."], ["Aslı üzerinde çalışmak", "Analiz kopyada yapılır; asıl korunur ve hash'i kaydedilir."], ["Gözetim zincirini sonradan yazmak", "Zincir her devirde anında kaydedilmelidir; boşluk kanıtı zayıflatır."]],
    gecme: { olcut: "Mini sınavda %80 ve uçuculuk sırasını ve gözetim zincirinin neden gerekli olduğunu söyleyebilmek.", kritik: ["Önce diski kopyalayıp belleği sonra düşünmek", "Hash'in kanıtı değiştirmeden bütünlük gösterdiğini bilmemek"] },
    kaynaklar: [S("86", "800-86: Guide to Integrating Forensic Techniques into Incident Response", "Adli tekniklerin olay müdahalesine entegrasyonu."), R("3227", "Guidelines for Evidence Collection and Archiving", "Kanıt toplama ve arşivleme yönergeleri.")],
    telafi: "Takıldıysan iki kuralı tekrarla: kanıtı değiştirme, her devri kaydet.",
    sonraki: "Sıradaki konu: politika ve prosedürler."
  };

  E[23] = {
    analoji: { a: "Trafik kuralları: yasa (politika) neyin yasak olduğunu söyler, yönetmelik (standart) ölçüyü verir, tarife (prosedür) nasıl yapılacağını adım adım gösterir.", sinir: "Trafikte kural herkese ortaktır; kurumda politika rol ve veri türüne göre değişir ve yazılı olup uygulanmayan kural kâğıt üzerinde kalır." },
    rehberli: ["Aynı konuyu dört katmanda yaz: politika ('parolalar korunur'), standart ('en az 12 karakter'), prosedür (parola sıfırlama adımları), yönerge (iyi parola önerileri).", "Hangisinin zorunlu, hangisinin tavsiye olduğunu işaretle.", "Bir politikanın uygulanabilir olması için üç koşul yaz: yazılı, ölçülebilir, uygulanabilir (sahibinin belli olması da iyi uygulamadır)."],
    bagimsiz: "Kendi evin ya da küçük bir iş için 'cihaz kullanımı' konusunda tek sayfalık bir politika, bir standart ve bir prosedür yaz. Yalnız kâğıt üzerinde.",
    hatalar: [["Politikayı prosedürle karıştırmak", "Politika ne ve neden, prosedür nasıl sorusuna cevap verir."], ["Yazıp duyurmamak", "Duyurulmayan ve eğitimi verilmeyen kural uygulanmaz."], ["Yönergeyi zorunlu saymak", "Yönerge tavsiyedir; zorunluluk politika ve standartta yer alır."]],
    gecme: { olcut: "Mini sınavda %80 ve bir metni politika, standart, prosedür ya da yönerge olarak sınıflandırabilmek.", kritik: ["Politikanın ayrıntılı adım adım talimat olduğunu sanmak", "Yazılı politikanın uygulandığı anlamına geldiğini sanmak"] },
    kaynaklar: [R("2196", "Site Security Handbook", "Site güvenlik politikası ve prosedürlerinin oluşturulmasına dair el kitabı.")],
    telafi: "Takıldıysan dört kelimeyi tek soruyla ayır: Ne? (politika) Ne kadar? (standart) Nasıl? (prosedür) Öneri? (yönerge).",
    sonraki: "Sıradaki konu: üçüncü taraf riski."
  };

  E[24] = {
    analoji: { a: "Zincirin en zayıf halkası: kendi kapına çelik kilit koyarsın ama anahtarı yaptıran çilingir güvenilmezse kilit işe yaramaz.", sinir: "Zincirde zayıf halka bellidir; tedarik zincirinde halkalar çoğu zaman görünmez (tedarikçinin tedarikçisi) ve sen yalnız sözleşme ve değerlendirmeyle güven kurabilirsin." },
    rehberli: ["Küçük bir şirketin üç tedarikçisini yaz (bulut, muhasebe yazılımı, bakım firması) ve her biri hangi veriye eriştiğini işaretle.", "Bir tedarikçi değerlendirme anketine üç soru yaz (güvenlik sertifikası, olay bildirim süresi, veri nerede tutuluyor).", "Sözleşmeye eklenecek iki güvenlik maddesini yaz (olay bildirimi, denetim hakkı)."],
    bagimsiz: "Kendi kullandığın bir uygulama ya da hizmetin gizlilik ve güvenlik sayfasını oku. Verinin nerede tutulduğunu ve olay bildiriminin nasıl yapıldığını bulup bulmadığını not et.",
    hatalar: [["Tedarikçiyi yalnız fiyata göre seçmek", "Güvenlik ve veri erişimi değerlendirmeye girmeli."], ["Bir kez değerlendirip bırakmak", "Tedarikçi sürekli izlenir; riski zamanla değişir."], ["Tedarikçinin gerçek erişimini bilmemek", "Hangi veriye ve sisteme erişebildiğinin envanteri tutulur."]],
    gecme: { olcut: "Mini sınavda %80 ve bir tedarikçi için risk, sözleşme ve izleme adımlarını sıralayabilmek.", kritik: ["Tedarikçinin güvenliğinin kendi sorumluluğu dışında olduğunu sanmak", "Sözleşmenin güvenliği tek başına sağladığını sanmak"] },
    kaynaklar: [S("161/r1", "800-161 Rev. 1: Cybersecurity Supply Chain Risk Management Practices for Systems and Organizations", "Siber tedarik zinciri risk yönetimi uygulamaları.")],
    telafi: "Takıldıysan tek tedarikçi seç ve üç soruyu cevapla: Neye erişiyor? Zarar verirse ne olur? Nasıl izlerim?",
    sonraki: "Sıradaki konu: uyum (yasa ve standartlara uygunluk)."
  };

  E[25] = {
    analoji: { a: "Araç muayenesi: kurallar yazılı, kontrol kayda geçer, belge verilir; belge aracın bir sonraki gün bozulmayacağını garanti etmez.", sinir: "Muayene aracı belirli bir anda ölçer; uyum da belirli bir andaki durumu gösterir ve sonraki gün oluşan açığı yakalamaz." },
    rehberli: ["Uyumun dört parçasını yaz: mevzuat (zorunlu kural), çerçeve (iyi uygulama), kanıt (kayıt), denetim (doğrulama).", "Bir kuralın kanıtını örnekle: 'erişim logu üç ay saklanır' için hangi kayıt kanıt olur?", "Uyumlu ama güvensiz bir sistem örneği düşün ve nedenini bir cümleyle yaz."],
    bagimsiz: "Kişisel verilerin korunmasına dair kendi ülkenin resmî sitesinden bir mevzuatın temel ilkelerini oku ve bir iş yerinin uyması gereken iki maddeyi kendi cümlelerinle yaz.",
    hatalar: [["Uyumu güvenlik sanmak", "Uyum asgari ölçütü gösterir; gerçek güvenlik ek önlemler ve izleme ister."], ["Kanıt tutmamak", "Yapılmış ama kanıtı olmayan kontrol denetimde yapılmamış sayılır."], ["Uyumu yılda bir günlük iş görmek", "Kanıt ve kontrol düzenli ve sürekli toplanır."]],
    gecme: { olcut: "Mini sınavda %80 ve uyum ile güvenlik farkını örnekle açıklayabilmek.", kritik: ["Uyumlu olmanın saldırıya karşı garanti olduğunu sanmak", "Kanıtın uyum için gereksiz olduğunu sanmak"] },
    telafi: "Takıldıysan tek bir kuralı seç ve sor: Kural ne? Nasıl uyduğumu gösteririm? Kanıtım nerede?",
    sonraki: "Sıradaki konu: denetim ve değerlendirme."
  };

  E[26] = {
    analoji: { a: "Dışarıdan gelen muayene hekimi: kendi sağlığını sen iyi sanırsın, bağımsız bakış gözünden kaçan şeyi gösterir.", sinir: "Hekim hastayı muayene edip raporu verir; denetim bulgusu yalnız rapordur, düzeltme ve takip yapılmazsa hiçbir şey değişmez." },
    rehberli: ["İç denetim, dış denetim ve sızma testini kim yapar, ne zaman gerekir diye tabloya yaz.", "Bir bulgunun üç parçasını yaz: ne bulundu, risk nedir, kim ne zamana kadar düzeltecek.", "Sızma testinin yalnız yazılı izinle ve kapsam belirlenerek yapılması gerektiğini bir cümleyle açıkla."],
    bagimsiz: "Kendi evin ya da iş yerin için bir 'mini denetim' listesi hazırla: en az beş kontrol sorusu (güncelleme açık mı, yedek var mı, MFA açık mı...). Kendi sistemini kontrol et ve bulguları sahibi ve süresiyle yaz.",
    hatalar: [["Denetimi cezalandırma sanmak", "Denetim iyileştirme içindir; açık bulgular kapatılırsa değer üretir."], ["Bulguyu raporlayıp takip etmemek", "Bulgu, sahibi ve tarihiyle kapanana kadar izlenir."], ["Sızma testini izinsiz yapmak", "İzinsiz test yasadışıdır; yazılı yetki ve kapsam şarttır."]],
    gecme: { olcut: "Mini sınavda %80 ve denetim türlerini ayırıp bir bulgunun yaşam döngüsünü sıralayabilmek.", kritik: ["Sızma testinin izin olmadan yapılabileceğini sanmak", "Denetimin bulguları kapatmayı kapsadığını sanmak"] },
    kaynaklar: [S("115", "800-115: Technical Guide to Information Security Testing and Assessment", "Güvenlik testi ve değerlendirme yöntemleri.")],
    telafi: "Takıldıysan bir bulguyu seç ve izle: bulundu, sahibi atandı, düzeltildi, doğrulandı.",
    sonraki: "Sıradaki konu: farkındalık eğitimi."
  };

  E[27] = {
    analoji: { a: "Yangın tatbikatı: herkes bir kez yapar, tekrar eder ve alarm duyulunca ne yapacağını bilir.", sinir: "Tatbikatta herkes bilgilendirilmiş katılır; siber simülasyon (ör. oltalama denemesi) habersiz olabilir ve ceza odaklı olursa insanlar hatayı saklar." },
    rehberli: ["Eğitimin dört parçasını yaz: düzenli eğitim, simülasyon, bildirim kültürü, ölçüm.", "Bir oltalama simülasyonunda hangi iki ölçüyü izlersin (tıklama oranı, bildirme oranı)?", "Bir çalışan hatayı bildirdiğinde nasıl tepki verirsin? Neden suçlamamak önemli?"],
    bagimsiz: "Aile ya da iş arkadaşların için beş maddelik bir güvenlik ipucu kartı yaz (parola yöneticisi, MFA, bağlantı kontrolü, güncelleme, bildirim). Yalnız kâğıt üzerinde.",
    hatalar: [["Yılda bir eğitimi yeterli saymak", "Kısa ve düzenli eğitim kalıcıdır; tek seferlik unutulur."], ["Hata yapanı cezalandırmak", "Ceza bildirimi azaltır; güvenli bildirim kültürü hasarı küçültür."], ["Ölçmeden eğitmek", "Tıklama ve bildirim oranı gibi ölçüler eğitimin işe yarayıp yaramadığını gösterir."]],
    gecme: { olcut: "Mini sınavda %80 ve etkili bir eğitim programının dört parçasını sayıp gerekçelendirebilmek.", kritik: ["Eğitimin teknik savunmaların yerini tutabileceğini sanmak", "Hata yapanın cezalandırılmasının bildirimi artırdığını sanmak"] },
    kaynaklar: [S("50/r1", "800-50 Rev. 1: Building a Cybersecurity and Privacy Learning Program", "Siber güvenlik ve gizlilik öğrenme programı oluşturma yönergesi.")],
    telafi: "Takıldıysan tek bir konu seç (ör. oltalama) ve üç dakikalık bir eğitim taslağı yaz: neden, ne yapılır, kime bildirilir.",
    sonraki: "Sıradaki konu: yapay zekâ riskleri."
  };

  E[28] = {
    analoji: { a: "Çok bilgili ama saf bir stajyer: her talimatı ciddiye alır, kime ait olduğunu sorgulamadan uygular ve gördüğü her şeyi anlatabilir.", sinir: "Stajyer talimatın kimden geldiğini sorar; model metin içindeki talimatı kullanıcı talimatından her zaman ayıramaz ve eğitim verisindeki bozulma sonradan fark edilmeyebilir." },
    rehberli: ["Dört riski yaz: prompt injection (metinle yönlendirme), veri sızıntısı, veri zehirleme, YZ destekli saldırı (ör. daha inandırıcı oltalama).", "Çalışanın gizli bir belgeyi herkese açık bir YZ aracına yapıştırmasının riskini ve alacağın politikayı (kural, onaylı araç) yaz.", "YZ çıktısına neden insan kontrolü eklenmesi gerektiğini bir cümleyle açıkla."],
    bagimsiz: "Kendi kullandığın bir YZ aracı için hangi tür bilgiyi (parola, kimlik, iş sırrı) asla girmeyeceğini yazılı bir kural olarak yaz. Yalnız kâğıt üzerinde.",
    hatalar: [["YZ çıktısını doğrulamadan kullanmak", "Model yanlış ya da uydurma bilgi verebilir; kritik işte insan kontrolü gerekir."], ["Gizli veriyi onaysız araca girmek", "Girilen veri aracın saklama politikasına tabidir; onaylı araç ve kural gerekir."], ["YZ'yi yalnız savunma aracı sanmak", "Saldırganlar da kullanır; oltalama daha inandırıcı hale gelir, farkındalık eğitimi güncellenmelidir."]],
    gecme: { olcut: "Mini sınavda %80 ve her YZ riskini örnekle ve bir önlemle eşleyebilmek.", kritik: ["Modelin verdiği her çıktıya güvenilebileceğini sanmak", "Prompt injection'ın yalnız teorik bir risk olduğunu sanmak"] },
    kaynaklar: [K("OWASP Top 10 for Large Language Model Applications", "https://owasp.org/www-project-top-10-for-large-language-model-applications/", "Büyük dil modeli uygulamalarındaki başlıca güvenlik risklerinin listesi."), K("NIST AI 100-2 E2023: Adversarial Machine Learning", "https://csrc.nist.gov/pubs/ai/100/2/e2023/final", "Makine öğrenmesine yönelik saldırıların ve savunmaların sınıflandırması.")],
    telafi: "Takıldıysan iki yöne ayır: kurumun kullandığı YZ'ye yönelik riskler ve saldırganın kullandığı YZ. Her birine iki örnek yaz.",
    sonraki: "Sıradaki konu: Zero Trust."
  };

  E[29] = {
    analoji: { a: "Her kapıda kimlik soran otel: lobiye girdin diye odaya girmezsin; her kat ve oda kendi kartını ister.", sinir: "Otelde kart kontrolü hızlıdır; Zero Trust'ta sürekli doğrulama kullanıcıyı yorabilir, maliyet ve karmaşıklık doğurur ve bir ürünle değil yaklaşım ve süreçle kurulur." },
    rehberli: ["Kale-hendek modeli ile Zero Trust'ı iki sütunda karşılaştır: güven nerede, saldırgan içeri girerse ne olur?", "Bir çalışanın bir uygulamaya erişimini beş soruyla değerlendir: kim, hangi cihaz, hangi konum, hangi uygulama, hangi risk?", "Mikro segmentasyonun yatay hareketi nasıl sınırladığını bir cümleyle yaz."],
    bagimsiz: "Kendi ev ya da iş ağın için 'içeri girene güvenme' ilkesini üç kuralla yaz (cihazı doğrula, MFA iste, her kullanıcıya en az yetki). Yalnız kâğıt üzerinde.",
    hatalar: [["Zero Trust'ı satın alınan bir ürün sanmak", "Bir mimari yaklaşımdır; kimlik, cihaz, ağ ve veri politikalarının birleşimidir."], ["Ağ içindekilere otomatik güvenmek", "Konum güven vermez; her istek kimlik ve bağlamla doğrulanır."], ["Tek seferlik doğrulama yeterli saymak", "Sürekli doğrulama ve en az yetki birlikte uygulanır."]],
    gecme: { olcut: "Mini sınavda %80 ve Zero Trust ilkelerini sayıp bir erişim isteğine uygulayabilmek.", kritik: ["Zero Trust'ın güvenlik duvarını gereksiz kıldığını sanmak", "Doğrulanmış kullanıcıya her kaynağın açılabileceğini sanmak"] },
    kaynaklar: [S("207", "800-207: Zero Trust Architecture", "Zero Trust mimarisinin tanımı ve ilkeleri.")],
    telafi: "Takıldıysan tek bir erişimi seç ve sor: Kim, hangi cihazdan, neye erişiyor, bu doğrulandı mı, en az yetki mi?",
    sonraki: "Sıradaki konu: değişiklik yönetimi."
  };

  E[30] = {
    analoji: { a: "Uçak bakım kontrol listesi: her değişiklik onaylanır, kaydedilir ve geri dönüş planı hazır tutulur; acele eden kalkışa izin almaz.", sinir: "Uçakta bakım yer hizmetinde yapılır ve hata hemen görülür; sistemlerde değişiklik canlı ortamı etkiler, hata günler sonra ortaya çıkabilir ve geri almak bazen mümkün olmaz." },
    rehberli: ["Bir değişiklik talebinin dört parçasını yaz: ne değişecek, neden, etkisi, geri alma planı.", "Bir güvenlik duvarı kuralı eklemek için etki analizini yaz: hangi sistemler etkilenir, risk nedir?", "Bakım penceresi ve kaydın neden gerektiğini bir cümleyle açıkla."],
    bagimsiz: "Kendi bilgisayarında büyük bir güncelleme yapmadan önce kendine bir değişiklik kaydı yaz: ne yapacaksın, ne zaman, yedek alındı mı, sorun çıkarsa nasıl geri dönersin.",
    hatalar: [["Onaysız acil değişiklik yapmak", "Acil durum için ayrı bir hızlı yol ve sonradan kayıt vardır; atlamak olay yaratır."], ["Geri alma planı yazmamak", "Değişiklik başarısız olursa dönüş yolu önceden bellidir."], ["Değişikliği kaydetmemek", "Kayıt yoksa olay anında neyin değiştiği bilinmez."]],
    gecme: { olcut: "Mini sınavda %80 ve bir değişiklik talebini dört parçasıyla doldurabilmek.", kritik: ["Değişiklik sürecinin yalnız hızı yavaşlattığını sanmak", "Geri alma planının isteğe bağlı olduğunu sanmak"] },
    kaynaklar: [S("128", "800-128: Guide for Security-Focused Configuration Management of Information Systems", "Güvenlik odaklı yapılandırma ve değişiklik yönetimi.")],
    telafi: "Takıldıysan tek bir değişiklik seç ve dört soruyu cevapla: Ne? Neden? Etkisi? Nasıl geri alırım?",
    sonraki: "Yolun sonu: Siber güvenlik yolunu bitirdin. Şimdi soru bankasıyla tekrar et ve proje atölyesinde bir mini güvenlik planı hazırla."
  };
})();

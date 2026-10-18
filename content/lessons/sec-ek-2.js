/* Siber güvenlik yolu · ders eki 2 (anahtar = TMAP.sec dizini, 31-34): IoT/ICS, mobil, kablosuz ve tehdit vektörleri.
   Her giriş: benzetme + sınırı, rehberli alıştırma, bağımsız görev, yaygın hatalar, geçme ölçütü, kaynak, telafi/sonraki adım.
   Uygulamalar savunma/politika odaklıdır ve yalnızca kâğıt üzerinde ya da kendi izole ortamında yapılır.
   Kaynaklar: yalnız sec-ek.js'te zaten doğrulanmış adresler; yeni adres eklenmedi. Dar eşleşmelerde neden 'ilgili ek okuma' diye belirtilmiştir. */
(function () {
  var E = ((window.PP_EK = window.PP_EK || {}).sec = (window.PP_EK.sec || {}));
  var DOG = "2026-10-12";
  var R = function (no, ad, neden) { return { t: "RFC " + no + ": " + ad, u: "https://www.rfc-editor.org/rfc/rfc" + no, dogrulama: DOG, neden: neden }; };
  var S = function (yol, ad, neden) { return { t: "NIST SP " + ad, u: "https://csrc.nist.gov/pubs/sp/800/" + yol + "/final", dogrulama: DOG, neden: neden }; };
  var K = function (t, u, neden) { return { t: t, u: u, dogrulama: DOG, neden: neden }; };

  E[31] = {
    analoji: { a: "Eski bir kalp pili gibi: değiştirmek için ameliyat gerekir, bu yüzden hastayı ve çevresini korursun, cihazın kendisini kurcalamazsın.", sinir: "Kalp pilinin ağı yoktur; IoT ve ICS cihazları ağa bağlıdır, bu yüzden saldırgan uzaktan da ulaşabilir ve tek bir cihazdan başka sistemlere geçebilir." },
    rehberli: ["Bir küçük fabrikada üç cihaz yaz: PLC, operatör ekranı (HMI) ve akıllı kamera. Her birinin görevini bir cümleyle belirt.", "Bu üç cihazı ofis bilgisayarlarından ayıracak bölgeleri çiz: OT bölgesi, IoT bölgesi, BT bölgesi ve aralarındaki güvenlik duvarı.", "Yamalanamayan PLC için en az üç telafi edici kontrol yaz (ör. segmentasyon, erişim listesi, fiziksel kilit)."],
    bagimsiz: "Evindeki ya da iş yerindeki bir akıllı cihazı seç. Envanter satırı yaz: ne, nerede, kim sahibi, varsayılan parola değişti mi, güncelleme alıyor mu. Sonra riskini ve bir önlemini belirt.",
    hatalar: [["Hava boşluğunu mutlak koruma sanmak", "USB bellek ve bakım dizüstüsü köprü olabilir; izleme ve çıkarılabilir ortam kuralı yine gerekir."], ["OT'yi BT gibi yönetmek", "OT'de erişilebilirlik ve fiziksel güvenlik önceliklidir; plansız yama ya da yeniden başlatma süreci durdurabilir."], ["Sırları şablona veya koda yazmak", "Sürüm geçmişi her şeyi saklar; sızan sır silinmez, yenilenir."]],
    gecme: { olcut: "Mini sınavda %80 ve bir OT cihazı için en az üç telafi edici kontrol yazabilmek.", kritik: ["Hava boşluğunun mutlak güvenlik sağladığını sanmak", "Yamalanamayan cihazın kabul edilip hiç kontrol eklenmeyebileceğini sanmak"] },
    kaynaklar: [S("128", "800-128: Guide for Security-Focused Configuration Management of Information Systems", "İlgili ek okuma: yapılandırma yönetimi ve sapma kontrolü, IaC ve değişmez altyapı fikrine dolaylı olarak bağlanır."), S("41/r1", "800-41 Rev. 1: Guidelines on Firewalls and Firewall Policy", "İlgili ek okuma: bölgeleri güvenlik duvarı ve politika ile ayırma mantığı.")],
    telafi: "Takıldıysan tek bir cihaz seç ve üç soruyu cevapla: Yamalanabiliyor mu? Hangi ağ bölgesinde? Bozulursa ne olur?",
    sonraki: "Sıradaki ders: Mobil cihaz güvenliği. Aynı mantık çalışanın cebindeki cihaz için işleyecek."
  };

  E[32] = {
    analoji: { a: "Ortak ofis dolabı: şirket evrakı kilitli bölmede, kişisel eşyalar yan raftadır; çalışan ayrılınca yalnızca evrak bölmesi boşaltılır.", sinir: "Fiziksel dolapta iki bölme ayrıdır; telefonda aynı işlemci ve bellek paylaşılır, ayrım yazılımla sağlanır ve cihaz root'lanırsa ayrım aşılabilir." },
    rehberli: ["BYOD, COBO, COPE ve CYOD için birer cümle yaz: sahip kim, kullanım nasıl?", "Kayıp telefon senaryosu için sırayla beş adım yaz: kilit, belirteç iptali, uzaktan silme, olay kaydı, çalışan bilgilendirme.", "Bir uyumluluk politikasına en az üç madde yaz: ekran kilidi, güncel işletim sistemi, jailbreak/root yok."],
    bagimsiz: "Kendi telefonun için bir mini mobil güvenlik listesi hazırla: kilit, şifreleme, güncelleme, uygulama kaynağı, konum/kamera izinleri. Her satıra 'tamam' ya da 'düzeltilecek' yaz.",
    hatalar: [["Uzaktan silmeyi tek önlem saymak", "Cihaz çevrimdışıysa silme ulaşmaz; kilit ve şifreleme önce gelir."], ["BYOD'da tüm cihazı silmeye çalışmak", "Çalışanın kişisel verisi korunur; yalnızca kurumsal konteyner silinir."], ["Sideloading ve root'u önemsememek", "Mağaza denetimini ve işletim sistemi korumalarını atlar, kurumsal veriye açılan kapıdır."]],
    gecme: { olcut: "Mini sınavda %80 ve dört dağıtım modelini sahiplik ve kontrol açısından karşılaştırabilmek.", kritik: ["BYOD ile COPE'u aynı sanmak", "Uzaktan silmenin tek başına yeterli olduğunu sanmak"] },
    kaynaklar: [S("53/r5", "800-53 Rev. 5: Security and Privacy Controls for Information Systems and Organizations", "İlgili ek okuma: erişim denetimi ve uç nokta kontrolleri; mobil cihaza özgü bir rehber değildir."), S("40/r4", "800-40 Rev. 4: Guide to Enterprise Patch Management Planning", "İlgili ek okuma: cihaz ve işletim sistemi güncelleme planlaması.")],
    telafi: "Takıldıysan tek bir kayıp telefon senaryosu seç ve şunu yaz: önce ne yaparım, sonra ne yaparım?",
    sonraki: "Sıradaki ders: Kablosuz ağ güvenliği. Telefonun bağlandığı ağın güvenliğine bakacaksın."
  };

  E[33] = {
    analoji: { a: "Apartman girişi: ortak anahtar herkesin elinde dolaşır, bir kişi çıkınca kilit değişmez; ayrı kartta ise yalnızca o kartı iptal edersin.", sinir: "Ortak anahtar fiziksel olarak kopyalanır; Wi-Fi parolası ise paylaşılınca iz bırakmadan yayılır ve havadaki trafik kapsama alanındaki herkesçe duyulabilir." },
    rehberli: ["WEP, WPA2-PSK ve WPA3-Personal için birer cümle yaz: şifreleme ve parola koruması farkı ne?", "Bir şirket Wi-Fi'ı için 802.1X akışını çiz: istemci, erişim noktası, RADIUS ve sonuç.", "Küçük bir ofiste misafir Wi-Fi tasarla: SSID, VLAN, internet çıkışı ve iç ağ erişimi kuralı."],
    bagimsiz: "Evdeki ya da iş yerindeki Wi-Fi için bir mini denetim listesi yaz: şifreleme türü, WPS durumu, yönetici parolası, yazılım güncellemesi, misafir ağı. Her satıra 'iyi' ya da 'düzeltilecek' yaz.",
    hatalar: [["SSID gizlemeyi koruma saymak", "Ağ adı trafikte yine görünür; gerçek koruma kimlik doğrulama ve şifrelemedir."], ["Ortak parolayı yıllarca değiştirmemek", "Ayrılan ya da paylaşılan parola riski sürdürür; kullanıcı bazlı kimlik doğrulama tercih edilir."], ["WPS ve eski protokolleri açık bırakmak", "WPS PIN ve WEP/TKIP kolay kırılır, kapatılmalıdır."]],
    gecme: { olcut: "Mini sınavda %80 ve WEP, WPA2 ile WPA3'ü şifreleme açısından karşılaştırabilmek.", kritik: ["WPA2-Personal ile WPA2-Enterprise'ı aynı sanmak", "Gizli SSID'nin güvenlik sağladığını sanmak"] },
    kaynaklar: [S("115", "800-115: Technical Guide to Information Security Testing and Assessment", "İlgili ek okuma: yetkili güvenlik testlerinde kablosuz ağ değerlendirmesi de ele alınır."), S("53/r5", "800-53 Rev. 5: Security and Privacy Controls for Information Systems and Organizations", "İlgili ek okuma: kablosuz erişim ve kimlik doğrulama kontrol aileleri; Wi-Fi'a özgü bir rehber değildir.")],
    telafi: "Takıldıysan yalnızca şu soruyu çöz: Ağda ortak parola mı var, kullanıcı bazlı kimlik mi? Hangisinde ayrılan kişinin erişimi kolay kesilir?",
    sonraki: "Sıradaki ders: Tehdit vektörleri ve saldırı yüzeyi. Saldırganın girebileceği tüm yolları bir arada göreceksin."
  };

  E[34] = {
    analoji: { a: "Bir kale: surlarda ne kadar çok kapı ve pencere varsa içeri girme yolu o kadar artar; kapıları kapatmak saldırganı değil, giriş yollarını azaltır.", sinir: "Kalenin kapıları görünür ve sayılabilir; dijital yüzeyde unutulmuş servis, gölge hesap ve tedarikçi bağlantıları gözden kaçabilir ve saldırgan tek tek değil otomatik tarayarak arar." },
    rehberli: ["Sekiz vektör türünden her birine kendi hayatından bir örnek yaz (e-posta, telefon çağrısı, USB, Wi-Fi gibi).", "Küçük bir ofisin saldırı yüzeyini listele: açık portlar, uzaktan erişim, e-posta, USB, tedarikçi bağlantısı.", "Listendeki üç maddeyi kapatmak için bir önlem yaz."],
    bagimsiz: "Bir haber olayını (kurgusal ya da kamuya açık) seç; vektörü, aktörü ve motivasyonunu ayrı ayrı yaz. Sonra aynı olayda saldırı yüzeyini küçültecek bir önlem öner.",
    hatalar: [["Vektör, aktör ve motivasyonu karıştırmak", "Vektör 'nasıl', aktör 'kim', motivasyon 'neden' sorusunun cevabıdır; hepsi ayrı kavramdır."], ["Saldırı yüzeyini sıfırlanabilir sanmak", "Yüzey küçültülür, ama iş yapmak için bir miktar açıklık hep kalır; amaç riski kabul edilebilir düzeye çekmektir."], ["Tedarik zinciri ve savunmasız yazılım vektörünü unutmak", "Güvenilen sağlayıcı ve eski yazılım, kullanıcı hatasından bağımsız giriş yolu açar."]],
    gecme: { olcut: "Mini sınavda %80 ve bir senaryoyu vektör, aktör ve motivasyon olarak üçe ayırabilmek.", kritik: ["Vektör ile motivasyonun aynı şey olduğunu sanmak", "Saldırı yüzeyini küçültmenin saldırgan sayısını azalttığını sanmak"] },
    kaynaklar: [S("161/r1", "800-161 Rev. 1: Cybersecurity Supply Chain Risk Management Practices for Systems and Organizations", "İlgili ek okuma: tedarik zinciri vektörünün yönetimi."), S("30/r1", "800-30 Rev. 1: Guide for Conducting Risk Assessments", "İlgili ek okuma: tehdit kaynakları ve olay senaryolarının risk değerlendirmesinde ele alınışı.")],
    telafi: "Takıldıysan bir olayı üç soruya böl: Nasıl girdi? Kim yaptı? Neden yaptı?",
    sonraki: "Sıradaki ders: Aldatma ve bozma teknolojileri (honeypot ve benzerleri). Saldırganı kendi alanında yanıltmayı öğreneceksin."
  };
})();

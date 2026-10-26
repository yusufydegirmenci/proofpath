/* CCNA yolu · Faz 20: yeni konular 24-29 için ders eki (anahtar = TMAP.ccna dizini, 23–28; ders no = anahtar + 1).
   Alanlar: benzetme + sınırı, rehberli alıştırma, bağımsız görev, yaygın hatalar, geçme ölçütü + kritik yanlış anlama, dış kaynak (son doğrulama tarihiyle), telafi/sonraki adım.
   Tüm alıştırmalar kâğıt üzerinde ya da kendi ağında/simülasyonda yapılır; başkasının sistemine dokunulmaz.
   Dış kaynak: rfc-editor.org, cisco.com, netacad.com ve wi-fi.org sayfaları HTTP 200 (curl, 2026-10-26). */
(function () {
  var E = ((window.PP_EK = window.PP_EK || {}).ccna = (window.PP_EK.ccna || {}));
  var DOG = "2026-10-26";
  var K = function (t, u, neden) { return { t: t, u: u, dogrulama: DOG, neden: neden }; };
  var CISCO = K("Cisco CCNA 200-301 sınav sayfası", "https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccna.html", "Sınavın resmi alan listesi ve genel bilgileri; madde ağırlıkları ayrıca 'sınav konuları' belgesinde.");
  var NETACAD = K("Cisco Networking Academy: Networking Basics", "https://www.netacad.com/courses/networking-basics", "Ücretsiz, kendi hızında ilerlenen temel ağ dersi; bu konunun modül karşılığına buradan bak.");

  E[23] = {
    analoji: { a: "Mektup zarfın içinde zarf: dış zarfa mahalle adresi, içindekine bina, en içtekine daire yazılır; her görevli yalnız kendi zarfını açar.", sinir: "Posta zarfları tek yönlü atılır; ağda alıcı aynı katmanları ters sırada açar ve her katman karşı tarafın aynı katmanıyla kural konuşur." },
    rehberli: ["Bir web isteği için sırayla veri, segment, paket, çerçeve, bit adlarını ve her aşamada eklenen bilgiyi (port, IP, MAC) yaz.", "OSI'nin 7 katmanını TCP/IP'nin 4 katmanına eşleyen bir tablo çiz.", "Aynı ağdaki ve başka ağdaki iki hedef için hedef MAC ve hedef IP'nin kimde olduğunu yaz."],
    bagimsiz: "Evindeki bir cihazdan bir sunucuya giden isteği kâğıtta çiz: kaç router geçer, hangi adresler değişir, hangileri sabit kalır. Hata ayıklama görevi: 'OSI yığınını kuruyoruz' cümlesindeki yanlışı bul ve düzelt.",
    hatalar: [["OSI'yi internetin çalıştığı yığın sanmak", "OSI başvuru modelidir; çalışan takım TCP/IP'dir."], ["MAC adresinin uçtan uca değişmeden gittiğini sanmak", "MAC her atlamada değişir; IP uçtan uca kalır (NAT yoksa)."], ["PDU adlarını karıştırmak", "Segment taşıma, paket ağ, çerçeve veri bağlantı katmanının birimidir."]],
    gecme: { olcut: "Mini sınavda %80 ve bir senaryoda her aşamanın PDU adını ve eklenen bilgiyi söyleyebilmek.", kritik: ["OSI'nin bir protokol yığını olduğunu sanmak", "Uzak hedefte hedef MAC'in sunucu olduğunu sanmak"] },
    kaynaklar: [K("RFC 1122: İnternet ana bilgisayar gereksinimleri", "https://www.rfc-editor.org/rfc/rfc1122", "TCP/IP katmanlı yapısının resmi tanımı."), NETACAD],
    telafi: "Takıldıysan önce yalnız PDU adlarını yaz (veri, segment, paket, çerçeve, bit). Sonra her adın yanına o aşamada eklenen bilgiyi koy.",
    sonraki: "Sıradaki konu: İkili ve onaltılık sayılar. Subnetting'e dönmeden önce IP ve maske hesaplarını ikili düzeyde yapmayı öğreneceksin."
  };

  E[24] = {
    analoji: { a: "Sekiz ışıklı bir lamba dizisi: yanan lambaların değerleri (128, 64, 32 ...) toplanır, hex ise lambaları dörderli gruplara bölüp tek harfle okumaktır.", sinir: "Lambalar yalnız yanar ya da söner; gerçek ağ cihazları ise bu bitleri maske ve adres hesabında VE işlemiyle birlikte kullanır." },
    rehberli: ["192.168.10.77 adresinin dört oktetini ikiliye çevir.", "200 ve 255 sayılarını hex'e çevir; hex 5E ve 2F'yi ondalığa çevir.", "/27 maskesini son oktette ikili yaz ve host sayısını bul."],
    bagimsiz: "Kendi bilgisayarının IP adresini ve maskesini al; ikiliye çevir ve VE işlemiyle ağ adresini bul. Hata ayıklama görevi: '255.255.255.224 maskesi /28'dir' cümlesindeki yanlışı düzelt.",
    hatalar: [["Ağırlıkları yanlış sırayla toplamak", "Soldan sağa 128, 64, 32, 16, 8, 4, 2, 1; 1 olan bitleri topla."], ["Hex B'yi 2 haneli ondalık sanmak", "B tek basamaktır ve 11'dir."], ["Host sayısında -2'yi unutmak", "Ağ ve yayın adresleri kullanılamaz."]],
    gecme: { olcut: "Mini sınavda %80 ve dört sekizlili bir adresi ikiliye çevirip ağ adresini bulabilmek.", kritik: ["Hex basamağının 8 bit olduğunu sanmak", "Maskenin ardışık 1'lerle başlamadığını düşünmek"] },
    kaynaklar: [NETACAD, CISCO],
    telafi: "Takıldıysan 128-64-32-16-8-4-2-1 satırını kâğıda yaz ve her çevirme işleminde altına bitleri koy.",
    sonraki: "Sıradaki konu: Ağ medyası: UTP, fiber ve Wi-Fi bantları. Bitlerin hangi ortamda, ne kadar uzağa gideceğini göreceksin."
  };

  E[25] = {
    analoji: { a: "Yol seçimi: UTP kısa mahalle sokağı (100 m), fiber otoyol, Wi-Fi ise herkesin kullandığı meydan.", sinir: "Meydanda herkes konuşabilir ama sırayla; Wi-Fi'da bu sırayı CSMA/CA düzenler ve kanal çakışması başarımı düşürür." },
    rehberli: ["Üç bağlantı için (ofis içi, binalar arası, gezici cihaz) uygun ortamı seç ve nedenini yaz.", "2.4 ve 5 GHz'in menzil, kanal ve hız farkını iki sütunlu tabloda göster.", "Düz ve çapraz kablonun hangi cihaz çiftlerinde kullanıldığını yaz."],
    bagimsiz: "Evindeki ya da okulundaki ağı çiz ve her bağlantının ortamını, tahmini uzunluğunu ve olası parazit kaynağını yaz. Hata ayıklama görevi: 'Cat 6 her zaman 10 Gb/s verir' cümlesini düzelt.",
    hatalar: [["100 m sınırını fiber için de sanmak", "Sınır bakır içindir; fiber çok daha uzağa gider."], ["Daha yüksek frekansın daha uzağa gittiğini sanmak", "Yüksek frekansın menzili kısa, duvar geçişi zayıftır."], ["Tek kipli fiberi yakın mesafe için seçmek", "Pahalıdır; kısa mesafede çok kipli yeter."]],
    gecme: { olcut: "Mini sınavda %80 ve bir senaryo için uygun ortamı (UTP, fiber, Wi-Fi bandı) gerekçesiyle seçebilmek.", kritik: ["UTP'nin 100 m'den uzağa gidebildiğini sanmak", "Fiberin EMI'dan etkilendiğini sanmak"] },
    kaynaklar: [K("Wi-Fi Alliance: Wi-Fi güvenliği ve sürümleri", "https://www.wi-fi.org/discover-wi-fi/security", "Wi-Fi sürümleri ve güvenlik modları için resmi kaynak."), NETACAD],
    telafi: "Takıldıysan üç satırlık karar tablosu yap: mesafe, parazit, hareketlilik. Her satıra uygun ortamı yaz.",
    sonraki: "Sıradaki konu: Sorun giderme metodolojisi. Bir bağlantı bozulduğunda hangi sırayla bakacağını ve ping, traceroute ve show çıktılarını okumayı göreceksin."
  };

  E[26] = {
    analoji: { a: "Doktorun muayenesi: önce şikâyeti dinler, sonra tahmin kurar, test ister, tedavi eder, iyileştiğini doğrular ve dosyaya yazar.", sinir: "Doktor tek hastaya bakar; ağda aynı sorun birçok kullanıcıyı ve cihazı birden etkileyebilir." },
    rehberli: ["Sıralı ping adımlarını (127.0.0.1, kendi IP, ağ geçidi, uzak IP, uzak ad) ve her adımda başarısızlığın neyi işaret ettiğini yaz.", "Altı adımlı süreci kendi örnek sorununla (ör. 'Wi-Fi bağlandı ama sayfa açılmıyor') uygula.", "up/up, up/down, down/down ve administratively down için tek cümlelik nedenleri yaz."],
    bagimsiz: "Kendi evinde ya da simülasyonda bir 'internet yok' senaryosu uydur ve sorun giderme defterine yaz: belirti, kuram, test, sonuç. Başkasının cihazına dokunma. Hata ayıklama görevi: 'Ping başarısız, o hâlde ağ bozuk' cümlesindeki eksik varsayımı bul.",
    hatalar: [["Aynı anda birden çok ayar değiştirmek", "Hangisinin işe yaradığı anlaşılmaz; tek değişken değiştir."], ["Ping başarısızlığını kesin arıza saymak", "Hedef ICMP'yi engelliyor olabilir."], ["Belgelemeyi atlamak", "Aynı sorun tekrarlarsa kayıt hız kazandırır."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen ping sonuçlarından sorunun katmanını söyleyebilmek.", kritik: ["Ping'in tek başına tanı koyduğunu sanmak", "down/down ile up/down'ı aynı saymak"] },
    kaynaklar: [K("RFC 792: Internet Control Message Protocol", "https://www.rfc-editor.org/rfc/rfc792", "ping ve traceroute'un dayandığı ICMP'nin tanımı."), NETACAD],
    telafi: "Takıldıysan yalnız ping sırasını ezberle: kendi, ağ geçidi, uzak IP, uzak ad. İlk başarısız adım sorunun yerini gösterir.",
    sonraki: "Sıradaki konu: Proje: ev ağını kur. SSID, WPA, DHCP, NAT ve güvenlik kararlarını bir ev ağı projesinde birleştireceksin."
  };

  E[27] = {
    analoji: { a: "Yeni taşınılan evde önce kapı kilidini değiştirir, sonra anahtarı kimlere vereceğini, misafir odasını ve alarmı ayarlarsın.", sinir: "Ev kilidi bir kez değişir; ağ ayarları ise yazılım güncellemeleri ve yeni cihazlarla zamanla yeniden gözden geçirilmelidir." },
    rehberli: ["Evdeki cihaz envanterini yap ve her cihazın desteklediği en güçlü Wi-Fi güvenlik modunu yaz.", "192.168.1.0/24 için DHCP havuzu ve sabit adres aralığını ayır.", "Sertleştirme listesini (yönetici parolası, WPS, uzaktan yönetim, güncelleme, misafir ağı) kendi ağın için doldur."],
    bagimsiz: "Kendi evin ya da hayali bir ev için tek sayfalık ağ planı yaz ve laboratuvardaki dört senaryoyu çöz. Hata ayıklama görevi: 'SSID'yi gizledim, ağım güvende' cümlesini düzelt. Gerçek cihaz ayarını değiştirme.",
    hatalar: [["Sabit adresleri DHCP havuzunun içine koymak", "Çakışma yaratır; havuz dışında tut."], ["WPS'i açık bırakmak", "PIN yöntemi zayıftır; kullanılmayacaksa kapat."], ["Varsayılan yönetici parolasını değiştirmemek", "Varsayılan parolalar herkesçe bilinir."]],
    gecme: { olcut: "Mini sınavda %80 ve laboratuvarda dört senaryonun tamamı doğru.", kritik: ["SSID gizlemenin güvenlik sağladığını sanmak", "NAT'ın tek başına güvenlik duvarı olduğunu sanmak"] },
    lab: "ccna-evag",
    kaynaklar: [K("Wi-Fi Alliance: Wi-Fi güvenliği","https://www.wi-fi.org/discover-wi-fi/security", "WPA2 ve WPA3 hakkında resmi bilgi."), K("RFC 1918: Özel ağlar için adres tahsisi", "https://www.rfc-editor.org/rfc/rfc1918", "192.168.0.0/16 gibi özel adres blokları."), NETACAD],
    telafi: "Takıldıysan sadece üç şeye odaklan: parola (WPA), sabit adres (DHCP dışı), yönetici parolası. Sonra diğer adımları ekle.",
    sonraki: "Sıradaki konu: Kontrol noktası: ağ temelleri. Modeller, sayı sistemleri, medya, çerçeve ve sorun giderme konularını tek sınavda ölçeceksin."
  };

  E[28] = {
    analoji: { a: "Yol haritası ara kontrolü: yarım yolda durup rotanın doğru olduğuna bakarsın.", sinir: "Harita rotayı gösterir; ara kontrol yalnız bilgini sınar, yeni bir şey öğretmez." },
    rehberli: ["Beş dersin her biri için bir cümlelik özet yaz.", "Yanlış yaptığın her soru için ilgili dersi ve bölümünü not et.", "Eksik kalan konuyu bir sonraki gün yeniden çöz."],
    bagimsiz: "Kontrol noktasından önce kendi ağını anlatan yarım sayfalık bir not yaz: modeller, adres hesabı, ortam ve sorun giderme. Sınavdan sonra eksik kalanları işaretle.",
    hatalar: [["Kontrol noktasını yeni konu sanmak", "Yeni içerik yoktur; ara ölçümdür."], ["Yanlışlara bakmadan geçmek", "Eksik kalan konu sonraki derslerde sorun çıkarır."], ["Geçince tekrarı bırakmak", "Geçsen bile yanlış yaptığın soruların dersini yeniden oku."]],
    gecme: { olcut: "Mini sınavda %80 ve yanlış yapılan her sorunun dersini yeniden okumak.", kritik: ["Yanlış yapılan konuyu tekrar etmeden devam etmek", "Kontrol noktasının yeni konu öğrettiğini sanmak"] },
    kaynaklar: [NETACAD],
    telafi: "Takıldıysan yanlış yaptığın sorunun dersine dön ve o dersin özetini yeniden oku.",
    sonraki: "Yolun sonu: CCNA yolunu bitirdin. Şimdi konuları tekrar edip deneme sınavına geç."
  };
})();

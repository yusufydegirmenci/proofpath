/* Network yolu · Faz 5 tur 1: konu başına ders eki (anahtar = TMAP.net dizini).
   M§7 listesinden TMAP'te bulunmayan öğeler: benzetme + sınırı, rehberli alıştırma, bağımsız görev, yaygın hatalar,
   geçme ölçütü + kritik yanlış anlama, dış kaynak (son doğrulama tarihiyle), telafi/sonraki adım, lab bağlantısı.
   Dış kaynak: yalnız HTTP 200 dönenler; doğrulanamayan eklenmedi. */
(function () {
  var E = ((window.PP_EK = window.PP_EK || {}).net = (window.PP_EK.net || {}));
  var DOG = "2026-10-11";

  E[0] = {
    analoji: { a: "Posta paketi: gönderen mektubu zarfa, zarfı kutuya, kutuyu koliye koyar; alıcı aynı sırayla açar.", sinir: "Postada her aşamada başka bir kişi paketi açmaz; ağda her katman yalnız kendi başlığını okur. Ayrıca gerçek ağlar OSI'nin yedi katmanını bire bir uygulamaz (TCP/IP dört katmanlıdır); OSI bir anlatma modelidir." },
    rehberli: ["Tarayıcıda bir sayfa açtığını düşün. Üstten alta yedi katmanı sırala: Uygulama, Sunum, Oturum, Taşıma, Ağ, Veri bağı, Fiziksel.", "Her katmana bir ek yaz: HTTP isteği (7), TLS (6), oturum (5), TCP başlığı ve port (4), IP başlığı (3), MAC adresli çerçeve (2), bitler (1).", "Alıcı tarafta bu sırayı tersine çevir ve her adımda hangi başlığın söküldüğünü söyle."],
    bagimsiz: "Kendi evinden bir e-posta gönderirken hangi katmanda hangi bilginin (adres, port, MAC) kullanıldığını bir tabloya yaz. Cevabı dersteki örnekle karşılaştır; en az iki farkı açıkla.",
    hatalar: [["OSI katmanlarını ezberleyip ne işe yaradıklarını söyleyememek", "Her katman için 'hangi adresi/başlığı kullanır?' sorusuyla çalış."], ["Switch'i 3. katman sanmak", "Klasik switch MAC'e bakar (2. katman); router IP'ye bakar (3. katman)."], ["TCP/IP ile OSI'yi aynı sanmak", "TCP/IP dört katman, OSI yedi katmandır; sınavda ikisinin eşlemesi sorulur."]],
    gecme: { olcut: "Mini sınavda %80 ve katmanları üstten alta sıralayıp her biri için bir örnek verebilmek.", kritik: ["Router'ın MAC adresine göre yönlendirme yaptığını sanmak", "Kapsülleme sırasının alıcıda aynı kaldığını sanmak (alıcıda ters sırayla sökülür)"] },
    telafi: "Takıldıysan önce 'Adım adım anlat' animasyonunu yeniden izle, sonra yalnız 2., 3. ve 4. katmanlara odaklan: MAC, IP, port.",
    sonraki: "Sıradaki konu: portlar ve protokoller."
  };

  E[1] = {
    analoji: { a: "Apartman: IP adresi binanın adresi, port numarası daire numarasıdır; aynı binadaki farklı daireler farklı hizmetlere bakar.", sinir: "Apartmanda daire numarasını sen seçersin; ağda iyi bilinen portlar (80, 443, 22...) standarttır ve bir hizmet farklı porta alınabilir. Port tek başına güvenlik sağlamaz." },
    rehberli: ["Şu eşleşmeleri yaz: HTTP 80, HTTPS 443, SSH 22, DNS 53, SMTP 25, RDP 3389.", "Her birinin TCP mi UDP mi kullandığını ve nedenini bir cümleyle söyle (DNS sorguları çoğunlukla UDP, web TCP).", "Bir bağlantıyı 'kaynak IP:port → hedef IP:port' olarak yaz; kaynak portun geçici (rastgele) olduğunu işaretle."],
    bagimsiz: "Bilgisayarında açık bağlantıları listele (Windows'ta 'netstat -an' veya 'Get-NetTCPConnection'). Üç bağlantı seç, her birinde hedef portu ve olası hizmeti yaz. Çıktıyı not defterine ekle; bilmediğin portu IANA kayıt listesinden ara.",
    hatalar: [["Güvenlik duvarında yalnız IP açıp port açmayı unutmak", "Kural 'kaynak, hedef, protokol, port' dörtlüsünü içermelidir."], ["TCP ve UDP'yi karıştırmak", "Sıralı ve güvenilir teslim gerekiyorsa TCP, hız ve küçük sorgu için UDP."]],
    gecme: { olcut: "Mini sınavda %80 ve altı yaygın hizmetin portunu ve protokolünü hatasız söyleyebilmek.", kritik: ["Portun yalnız bir hizmete ait ve değişmez olduğunu sanmak", "Kaynak portun da sabit 443 olduğunu sanmak"] },
    kaynaklar: [{ t: "IANA: Service Name and Transport Protocol Port Number Registry", u: "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml", dogrulama: DOG, neden: "Resmî port kayıt listesi: bir portun atanmış hizmetini buradan doğrula." }],
    telafi: "Portları üç gruba ayır (web, uzaktan erişim, ad çözümleme) ve her gruptan birini kendi bağlantı listende bul.",
    sonraki: "Sıradaki konu: kablolar, konnektörler ve topolojiler."
  };

  E[2] = {
    analoji: { a: "Yollar: bakır kablo şehir içi asfalt, fiber otoyol, Wi-Fi ise havadan açık meydan.", sinir: "Yolda araçlar birbirine çarpmadan ilerler; ağ ortamında ise ortamın türü (bakır, fiber, radyo) menzili, hızı ve girişim riskini belirler, bu benzetmeyle tam anlatılamaz." },
    rehberli: ["Bir tablo çiz: bakır (UTP), fiber, Wi-Fi sütunları; satırlar hız, menzil, girişim, maliyet.", "Düz ve çapraz kablo ayrımını anlat: modern cihazlar (Auto-MDIX) çoğu zaman kabloyu kendisi ayarlar.", "Yıldız, halka ve ağaç topolojilerinden birini seçip bir kablonun kopması halinde ne olacağını yaz."],
    bagimsiz: "Evinde ya da okulunda gördüğün bir ağ prizinden modeme kadar olan yolu kâğıda çiz; hangi ortamlar kullanılıyor (kablo, Wi-Fi) ve en zayıf halka neresi? Tek cümleyle gerekçelendir.",
    hatalar: [["Kablo uzunluğunu aşmak (UTP için tipik sınır 100 m)", "Daha uzun mesafede switch/tekrarlayıcı ya da fiber kullan."], ["Konnektör sırasını (T568A/T568B) iki uçta farklı yapmak", "İki ucu aynı standartla yap; farklı sıra çapraz kablo olur."]],
    gecme: { olcut: "Mini sınavda %80 ve bir senaryo için doğru ortamı (bakır/fiber/Wi-Fi) gerekçesiyle seçebilmek.", kritik: ["Fiberin her zaman kablosuzdan yavaş olduğunu sanmak", "Yıldız topolojide merkez cihazın arızasının yalnız bir cihazı etkilediğini sanmak"] },
    telafi: "Önce ortamları iki özellikle karşılaştır (hız ve menzil); sonra topolojilere geç.",
    sonraki: "Sıradaki konu: IPv4 adresleme ve alt ağlar (lab var)."
  };

  E[3] = {
    analoji: { a: "Mahalle ve kapı numarası: maske mahalleyi, host kısmı kapıyı gösterir. Alt ağa bölmek mahalleyi sokaklara bölmektir.", sinir: "Sokaklarda kapı numaraları ikili hesapla ayrılmaz; ağ adresi ile yayın adresi (broadcast) ise host bitlerinin tamamen 0 ve tamamen 1 olduğu özel adreslerdir, kapı numarası olarak atanamazlar." },
    rehberli: ["Önek uzunluğunu bul: 50 cihaz için 2^(host biti) - 2 >= 50 olan en küçük host bitini seç (6 bit: 62) → /26.", "Blok boyutu = 2^(host biti) = 64. Ağ adresi, IP'nin 64'ün katına yuvarlanmış halidir.", "192.168.1.70/26 için: ağ .64, yayın .127, ilk host .65, son host .126. Aynı adımları lab'daki ilk senaryoyla yeniden yap."],
    bagimsiz: "Lab'daki 4 senaryonun hepsini çöz (ipucu kullanmadan). Ardından kendi evindeki bir cihazın IP ve maskesini oku, ağ ve yayın adresini elle hesapla; sonucu 'ipconfig' veya 'ip a' çıktısıyla karşılaştır.",
    hatalar: [["Host sayısından 2 çıkarmayı unutmak", "Ağ ve yayın adresleri cihaza verilmez: kullanılabilir host = 2^(host bitleri) - 2."], ["Ağ adresini host kısmı sıfır olmayan bir adres sanmak", "Ağ adresi, host bitlerinin hepsi 0 olan adrestir; IP'yi blok boyutunun katına yuvarla."], ["Özel adres aralığını karıştırmak (172.16.0.0/12 → 172.16–172.31)", "RFC 1918 aralıklarını yaz: 10/8, 172.16/12, 192.168/16."]],
    gecme: { olcut: "Mini sınavda %80 ve lab'daki dört senaryonun tamamı doğru (ağ, yayın, ilk/son host).", kritik: ["Kullanılabilir host sayısını 2^n sanmak", "/26 ile 255.255.255.0 maskesini eşdeğer sanmak"] },
    kaynaklar: [
      { t: "RFC 1918: Address Allocation for Private Internets", u: "https://www.rfc-editor.org/rfc/rfc1918", dogrulama: DOG, neden: "Özel adres aralıklarının resmî tanımı." },
      { t: "RFC 4632: CIDR", u: "https://www.rfc-editor.org/rfc/rfc4632", dogrulama: DOG, neden: "Önek (/n) gösteriminin ve sınıfsız adreslemenin resmî tanımı." },
      { t: "RFC 3927: Link-Local (APIPA) adresleri", u: "https://www.rfc-editor.org/rfc/rfc3927", dogrulama: DOG, neden: "169.254.0.0/16 aralığının nedeni." }
    ],
    telafi: "/24 ile başla: 254 host, blok 256. Sonra her bit eklediğinde bloğun yarıya indiğini tabloya yaz (/25 → 128, /26 → 64, /27 → 32).",
    sonraki: "Sıradaki konu: IPv6 ve trafik türleri.",
    lab: "net-altag"
  };
})();

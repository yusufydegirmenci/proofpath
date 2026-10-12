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
    hatalar: [["Güvenlik duvarında yalnız IP açıp port açmayı unutmak", "Kural 'kaynak, hedef, protokol, port' dörtlüsünü içermelidir."], ["TCP ve UDP'yi karıştırmak", "Sıralı ve güvenilir teslim gerekiyorsa TCP, hız ve küçük sorgu için UDP."], ["Portu açmakla hizmetin çalıştığını aynı sanmak", "Port açık olsa da o portu dinleyen bir hizmet yoksa bağlantı reddedilir; hem kural hem çalışan hizmet gerekir."]],
    gecme: { olcut: "Mini sınavda %80 ve altı yaygın hizmetin portunu ve protokolünü hatasız söyleyebilmek.", kritik: ["Portun yalnız bir hizmete ait ve değişmez olduğunu sanmak", "Kaynak portun da sabit 443 olduğunu sanmak"] },
    kaynaklar: [{ t: "IANA: Service Name and Transport Protocol Port Number Registry", u: "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml", dogrulama: DOG, neden: "Resmî port kayıt listesi: bir portun atanmış hizmetini buradan doğrula." }],
    telafi: "Portları üç gruba ayır (web, uzaktan erişim, ad çözümleme) ve her gruptan birini kendi bağlantı listende bul.",
    sonraki: "Sıradaki konu: kablolar, konnektörler ve topolojiler."
  };

  E[2] = {
    analoji: { a: "Yollar: bakır kablo şehir içi asfalt, fiber otoyol, Wi-Fi ise havadan açık meydan.", sinir: "Yolda araçlar birbirine çarpmadan ilerler; ağ ortamında ise ortamın türü (bakır, fiber, radyo) menzili, hızı ve girişim riskini belirler; ayrıca Wi-Fi'da aynı kanalda aynı anda yayın yapanlar birbirini bozar, yolda böyle bir çarpışma yoktur." },
    rehberli: ["Bir tablo çiz: bakır (UTP), fiber, Wi-Fi sütunları; satırlar hız, menzil, girişim, maliyet.", "Düz ve çapraz kablo ayrımını anlat: modern cihazlar (Auto-MDIX) çoğu zaman kabloyu kendisi ayarlar.", "Yıldız, halka ve ağaç topolojilerinden birini seçip (dersteki üç katmanlı model ve omurga-yaprak ile de karşılaştır) bir kablonun kopması halinde ne olacağını yaz."],
    bagimsiz: "Evinde ya da okulunda gördüğün bir ağ prizinden modeme kadar olan yolu kâğıda çiz; hangi ortamlar kullanılıyor (kablo, Wi-Fi) ve en zayıf halka neresi? Tek cümleyle gerekçelendir.",
    hatalar: [["Kablo uzunluğunu aşmak (UTP için tipik sınır 100 m)", "Daha uzun mesafede switch/tekrarlayıcı ya da fiber kullan."], ["Konnektör sırasını (T568A/T568B) iki uçta farklı yapmak", "İki ucu aynı standartla yap; farklı sıra çapraz kablo olur."], ["Fiberi keskin bükmek", "Üreticinin izin verdiği kıvrım yarıçapını aşmak sinyal kaybettirir ya da lifi kırar; kabloyu yumuşak kıvır, uçlarını temiz tut."]],
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
    lab: "network-altag"
  };

  /* ---- Faz 5 tur 3: konu 4–17. Kaynaklar curl ile HTTP 200 doğrulandı (2026-10-12); IEEE/CompTIA/Cisco sayfaları doğrulanamadığı için eklenmedi. ---- */
  var DOG2 = "2026-10-12";
  var R = function (no, ad, neden) { return { t: "RFC " + no + ": " + ad, u: "https://www.rfc-editor.org/rfc/rfc" + no, dogrulama: DOG2, neden: neden }; };

  E[4] = {
    analoji: { a: "Telefon numarası: IPv4 numaraları azaldı; IPv6 hane sayısını çok artırarak herkese yetecek kadar numara sağlar.", sinir: "Telefon numarası tek türdür; IPv6'da bir arayüzün aynı anda birden çok adresi olur (link-local, global, ULA) ve IPv6'da yayın (broadcast) yoktur, yerine multicast ve NDP kullanılır." },
    rehberli: ["2001:0db8:0000:0000:0000:0000:0000:0001 adresini kısalt: her grubun başındaki sıfırları at, ardışık sıfır gruplarını '::' ile bir kez değiştir → 2001:db8::1.", "fe80::1, fc00::1, 2001:db8::1, ff02::1 adreslerinin türünü önekten söyle (link-local, ULA, global/dokümantasyon, multicast).", "Bir cihaz ağa bağlandığında hangi adresleri kendiliğinden üretir? Link-local (fe80::/10) ve SLAAC ile global adres; DHCP olmadan."],
    bagimsiz: "Bilgisayarında 'ipconfig' ya da 'ip -6 addr' çalıştır. Her IPv6 adresinin türünü önekten belirle (link-local, global, geçici). Adresi elle kısalt ve aç; sonucu çıktıyla karşılaştır.",
    hatalar: [["'::' işaretini adreste birden fazla kez kullanmak", "Yalnız bir kez kullanılabilir; yoksa kaç grubun sıfır olduğu belli olmaz."], ["IPv6'da yayın adresi aramak", "IPv6'da broadcast yoktur; multicast (ff00::/8) ve NDP kullanılır."], ["Standart alt ağı /64'ten küçük seçmek", "SLAAC /64 öneki bekler; daha küçük blok otomatik yapılandırmayı bozar."], ["Link-local adresi yönlendirilebilir sanmak", "fe80::/10 yalnız aynı bağlantıda geçerlidir; router bunu başka ağa iletmez."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen bir IPv6 adresini kısaltıp açabilmek, türünü önekinden söyleyebilmek.", kritik: ["IPv6'da broadcast olduğunu sanmak", "'::' kısaltmasının birden çok kez kullanılabildiğini sanmak"] },
    kaynaklar: [R("4291", "IP Version 6 Addressing Architecture", "Adres türlerinin ve gösterim kurallarının resmî tanımı."), R("4861", "Neighbor Discovery for IPv6", "ARP'nin yerini alan NDP."), R("4862", "IPv6 Stateless Address Autoconfiguration", "SLAAC ile adres üretimi."), R("4193", "Unique Local IPv6 Unicast Addresses", "fc00::/7 yerel adresleri.")],
    telafi: "Önce yalnız üç öneki ezberle (fe80::/10, fc00::/7, 2000::/3) ve ff00::/8'i multicast olarak ekle; sonra kısaltma kuralını tek adres üzerinde elle uygula.",
    sonraki: "Sıradaki konu: ağ cihazları ve bulut kavramları."
  };

  E[5] = {
    analoji: { a: "Şehir hizmetleri: router kavşak ve yön tabelası, switch bina içi koridor, güvenlik duvarı giriş kapısı görevlisi, yük dengeleyici kuyruğu kasalara dağıtan gişe memuru.", sinir: "Şehirde bir görevli tek işi yapar; ağda tek cihaz birkaç rolü birleştirebilir (L3 switch hem anahtarlar hem yönlendirir, güvenlik duvarı hem NAT hem VPN yapar). Bulutta ise cihazın kendisi değil, size verilen yazılımsal hizmet vardır." },
    rehberli: ["Şu cihazlar için tek cümlelik görev yaz: router, switch, güvenlik duvarı, yük dengeleyici, IDS/IPS, proxy, AP.", "Bir web sitesini düşün: istek hangi sırayla güvenlik duvarı, yük dengeleyici ve sunuculardan geçer? Çizimle göster.", "SaaS, PaaS, IaaS için birer örnek yaz ve 'hangi katmanı kim yönetir' diye işaretle (uygulama, çalışma ortamı, sanal altyapı)."],
    bagimsiz: "Evindeki ya da hayali bir küçük şirketin ağı için cihaz listesi çıkar (modem, router, switch, AP, güvenlik duvarı). Her cihazın hangi OSI katmanında çalıştığını ve bozulursa neyin duracağını yaz; dosya paylaşımı için NAS mı SAN mı uygun, tek cümleyle gerekçelendir.",
    hatalar: [["NAS ile SAN'ı karıştırmak", "NAS dosya düzeyinde (ağ üzerinden klasör paylaşımı), SAN blok düzeyinde (sunucuya disk gibi görünür) çalışır."], ["IDS'in saldırıyı engellediğini sanmak", "IDS algılar ve uyarır; engelleyen IPS'tir (hat üstünde çalışır)."], ["Bulut güvenlik grubunu 'her yere açık' bırakmak", "Yalnız gereken kaynak, port ve protokolü aç; varsayılan olarak kapat."], ["Her switch'in yalnız 2. katmanda çalıştığını sanmak", "Klasik switch 2. katmandır; L3 switch hem anahtarlar hem yönlendirir."]],
    gecme: { olcut: "Mini sınavda %80 ve bir ihtiyaç için (dosya paylaşımı, yük dağıtımı, saldırı engelleme) doğru cihazı ya da bulut modelini gerekçesiyle seçebilmek.", kritik: ["IDS ile IPS'i aynı sanmak", "SaaS'ta altyapının müşteri tarafından yönetildiğini sanmak"] },
    kaynaklar: [{ t: "NIST SP 800-145: The NIST Definition of Cloud Computing", u: "https://csrc.nist.gov/pubs/sp/800/145/final", dogrulama: DOG2, neden: "SaaS, PaaS, IaaS ve bulut dağıtım modellerinin resmî tanımı." }],
    telafi: "Cihazları iki gruba ayır: trafiği taşıyanlar (router, switch, AP) ve trafiği denetleyenler (güvenlik duvarı, IDS/IPS, proxy, yük dengeleyici); sonra her gruptan birer örnek say.",
    sonraki: "Sıradaki konu: yönlendirme ve NAT (lab var)."
  };

  E[6] = {
    analoji: { a: "Navigasyon: router adresi bilmez, rota tablosuna bakıp en özgül yol tarifine uyar; eşleşme yoksa varsayılan 'ana yola çık' tarifini kullanır.", sinir: "Navigasyon trafiğe göre rotayı sürekli yeniden hesaplar; statik rota yönetici değiştirmedikçe aynı kalır. NAT ise yönlendirme değil, adres çevirisidir." },
    rehberli: ["Rota tablosunda 10.0.0.0/8, 10.1.0.0/16 ve 10.1.2.0/24 satırları var. 10.1.2.77 hedefi için üç satır da uyar; en uzun önek (/24) seçilir.", "Seçim sırasını söyle: önce en uzun önek, eşitse düşük yönetimsel mesafe (AD), onun da eşitliğinde düşük metrik.", "PAT örneği: iç adres 192.168.1.10:50001 dış adres 203.0.113.5:40001 olarak çevrilir; çeviri tablosunda hangi bilgiler tutulur, yaz."],
    bagimsiz: "Kendi bilgisayarının rota tablosunu al ('route print' ya da 'ip route'). Default rotayı bul ve bir hedef IP için hangi satırın seçileceğini elle belirle. Ardından lab'daki dört senaryoyu çöz.",
    hatalar: [["Önce AD'ye bakmak", "Önce en uzun önek eşleşmesi; AD yalnız aynı önekli rotalar arasında devreye girer."], ["Varsayılan rota yoksa yerel ağın da gittiğini sanmak", "Yerel (bağlı) ağlar çalışır; yalnız bilinmeyen hedeflere gidilemez, paket atılır."], ["NAT'ı güvenlik duvarı sanmak", "NAT adres çevirir; kendi başına filtre sağlamaz (iç adresleri gizlemesi yan etkidir)."], ["Statik rotada sonraki adımı yanlış yazmak", "Sonraki adım router'ın doğrudan ulaşabildiği bir adres olmalıdır; yoksa trafik kaybolur."]],
    gecme: { olcut: "Mini sınavda %80 ve lab'daki dört senaryoda doğru rota satırını seçebilmek.", kritik: ["En uzun önek kuralını bilmemek", "Eşleşme yoksa paketin atıldığını bilmemek"] },
    kaynaklar: [R("3022", "Traditional IP Network Address Translator (Traditional NAT)", "NAT ve PAT'in (NAPT) tanımı."), R("2328", "OSPF Version 2", "Bağlantı-durumu yönlendirme protokolü."), R("4271", "A Border Gateway Protocol 4 (BGP-4)", "İnternetin ağlar arası yönlendirme protokolü."), R("5798", "Virtual Router Redundancy Protocol (VRRP) Version 3", "İki router'ın tek sanal IP paylaşması (FHRP örneği).")],
    telafi: "Tek bir hedef IP seç ve tablodaki her satırı sırayla 'uyuyor mu?' diye işaretle; uyanlar arasında en büyük önek uzunluğunu bul. Lab'daki ipucu cezasızdır.",
    sonraki: "Sıradaki konu: switching, VLAN ve STP.",
    lab: ["net-rota", "net-nat", "net-ospf"]
  };

  E[7] = {
    lab: "net-vlan",
    analoji: { a: "Otoyol ve trafik ışığı: VLAN'lar aynı otoyoldaki ayrı şeritler, trunk bu şeritleri etiketli taşıyan ana yoldur; STP ise çevre yolunda aynı anda yalnız bir yolu açık tutar ki araçlar daireler çizmesin.", sinir: "Şeritler fiziksel olarak ayrılmıştır; VLAN'lar mantıksal ayrımdır ve VLAN'lar arası trafik için router ya da L3 switch gerekir. STP döngüyü, yedek bağlantıyı mantıksal olarak bloklayarak önler; kablo fiziksel olarak takılı kalır." },
    rehberli: ["Bir switch'te VLAN 10 (Muhasebe) ve VLAN 20 (Satış) tanımla; port 1–4 VLAN 10, 5–8 VLAN 20 (access).", "İki switch arasındaki bağlantıyı trunk yap; çerçeveye VLAN etiketi eklendiğini (802.1Q) not et. Native VLAN'ın iki uçta aynı olması gerektiğini yaz.", "İki switch'i iki kabloyla bağladığını düşün ve STP olmadan ne olacağını yaz (yayın fırtınası); STP'nin bir kabloyu neden bloklayacağını açıkla."],
    bagimsiz: "Üç bölümlü (Muhasebe, Satış, Misafir) küçük ofis için VLAN planı çıkar: VLAN numarası, ad, alt ağ, port aralığı. Misafir VLAN'ının iç ağa erişememesi için ne gerektiğini yaz. Son olarak iki switch arasında yedek kablo eklenirse STP'nin ne yapacağını anlat.",
    hatalar: [["STP'yi 'gereksiz' diye kapatmak", "Yedek kablolar döngü yaratır; STP kapalıyken yayın fırtınası dakikalar içinde ağı çökertir."], ["Trunk'ta VLAN iznini unutmak", "İzin listesinde olmayan VLAN karşı switch'e geçmez."], ["Cihazı yanlış VLAN'a atamak", "Cihaz IP alır ama doğru kaynaklara ulaşamaz; arıza çoğu zaman portun VLAN ataması çıkar."], ["VLAN'lar arası trafiği switch'in tek başına çözeceğini sanmak", "Router veya L3 switch gerekir."]],
    gecme: { olcut: "Mini sınavda %80 ve access/trunk farkını, VLAN'lar arası konuşma için router gerektiğini ve STP'nin neden var olduğunu açıklayabilmek.", kritik: ["Access portun birden fazla VLAN taşıdığını sanmak", "STP'nin hız artırdığını sanmak (amacı döngüyü önlemektir)"] },
    telafi: "İki switch ve iki VLAN çiz; her portun access mi trunk mı olduğunu işaretle. STP için yalnız tek soruya dön: 'Aynı iki switch arasında iki yol varsa neden biri kapatılır?'",
    sonraki: "Sıradaki konu: kablosuz ağlar."
  };

  E[8] = {
    analoji: { a: "Kalabalık salonda konuşma: aynı kanalda herkes aynı anda konuşursa kimse anlaşılmaz; farklı kanallar farklı odalara benzer.", sinir: "Odalar duvarla ayrıdır; Wi-Fi'da komşu ağların radyo dalgaları duvardan geçer, mesafe ve engeller sinyali zayıflatır. Şifreleme olmadan herkes dinleyebilir." },
    rehberli: ["2,4 GHz ve 5 GHz için menzil, hız ve parazit satırlı bir karşılaştırma tablosu yaz.", "2,4 GHz'de çakışmayan kanalları (1, 6, 11) söyle; üç AP'li bir ofiste her birine hangi kanalı verirsin?", "Misafir Wi-Fi'sini ayrı SSID ve ayrı VLAN ile kurma gerekçesini yaz."],
    bagimsiz: "Telefonunla çevrendeki Wi-Fi ağlarının kanallarını incele (bir Wi-Fi analiz uygulamasıyla). En kalabalık kanalı ve kendi ağının kanalını yaz; daha az kalabalık bir kanal öner ve gerekçesini tek cümleyle açıkla.",
    hatalar: [["Komşu AP ile aynı kanalı seçmek", "Çakışma oluşur; hız düşer, kopmalar artar. Yakın AP'lere farklı kanal ver."], ["Sinyal güçlü olunca ağın hızlı olduğunu sanmak", "Kanal doluluğu ve parazit hızı belirler; güçlü sinyal çakışan kanalı kurtarmaz."], ["WEP ya da WPS'i kullanmak", "İkisi de güvensizdir; WPA2/WPA3 kullan."], ["AP'leri üst üste yığmak", "Aynı kanaldaki yakın AP'ler birbirini bastırır; kapsama iyileşmez."]],
    gecme: { olcut: "Mini sınavda %80 ve bir kapsama senaryosu için bandı ve kanalı gerekçesiyle seçebilmek.", kritik: ["2,4 GHz'in 5 GHz'den daha hızlı olduğunu sanmak", "Tüm kanalların birbirini etkilemediğini sanmak (2,4 GHz'de yalnız 1, 6, 11 çakışmaz)"] },
    telafi: "Önce iki bandı iki özellikle karşılaştır (menzil ve hız); sonra kanal çakışmasını üç AP'li küçük bir çizimle göster.",
    sonraki: "Sıradaki konu: ağ servisleri (DHCP, DNS, NTP)."
  };

  E[9] = {
    lab: "net-dhcp",
    analoji: { a: "Otel resepsiyonu: DHCP oda anahtarı verir (geçici adres), DNS telefon rehberidir (isimden numara), NTP herkesin saatini aynı duvar saatine ayarlar.", sinir: "Anahtar teslimi tek seferliktir; DHCP kirası süresi dolunca yenilenir ya da geri alınır. DNS sorgusu önbelleğe alınır, bu yüzden değişiklik hemen görünmeyebilir." },
    rehberli: ["DHCP'nin 4 adımını sırala: Discover, Offer, Request, Acknowledge (DORA). İlk mesaj neden yayın (broadcast) olarak gider (cihazın henüz IP adresi yok)?", "DNS kayıt türleri için örnek yaz: A (isim → IPv4), AAAA (IPv6), CNAME (takma ad), MX (e-posta), PTR (IP → isim).", "'IP ile açılıyor, isimle açılmıyor' belirtisi için hangi servisin bozuk olduğunu ve neden yazdığını söyle."],
    bagimsiz: "Bilgisayarında 'ipconfig /all' (ya da 'ip a') çalıştır; DHCP sunucusunu, kira süresini ve DNS sunucularını yaz. 'nslookup' ile bir sitenin A kaydını sorgula ve çıktıyı yorumla.",
    hatalar: [["DHCP kirasının süresiz olduğunu sanmak", "Kira süresi dolunca cihaz yenilemelidir; havuz dolarsa yeni cihaz IP alamaz."], ["DHCP rezervasyonu ile statik IP'yi karıştırmak", "Rezervasyon DHCP sunucusunda MAC'e bağlı sabit adrestir; statik IP cihazda elle yazılır."], ["DNS çökünce ağın çöktüğünü sanmak", "IP ile erişim sürer; yalnız isim çözümü gider."], ["Saat farkını önemsememek", "Saat kayması sertifika ve kimlik doğrulama hatası doğurur."]],
    gecme: { olcut: "Mini sınavda %80 ve DORA sırasını, temel DNS kayıtlarını ve portlarını (DHCP 67/68, DNS 53, NTP 123) hatasız söyleyebilmek.", kritik: ["DHCP'nin isim çözdüğünü sanmak", "Saat eşitlemenin önemsiz olduğunu sanmak"] },
    kaynaklar: [R("2131", "Dynamic Host Configuration Protocol", "DHCP'nin (IPv4) tanımı ve DORA akışı."), R("1034", "Domain Names: Concepts and Facilities", "DNS'in kavramları."), R("1035", "Domain Names: Implementation and Specification", "DNS kayıt türleri ve ileti biçimi."), R("5905", "Network Time Protocol Version 4", "NTP'nin tanımı.")],
    telafi: "Üç servisi üç soruyla ayır: 'Adresi kim verir?' (DHCP), 'İsmi kim çözer?' (DNS), 'Saati kim eşitler?' (NTP). Sonra her birinin bozulma belirtisini yaz.",
    sonraki: "Sıradaki konu: izleme (SNMP, syslog, flow, baseline)."
  };

  E[10] = {
    analoji: { a: "Hastane monitörü: nabız, tansiyon gibi ölçümler sürekli okunur (SNMP), olay defteri tutulur (syslog), kimin neyi ne kadar kullandığı özetlenir (flow), 'normal' değerler bilindiği için sapma fark edilir (baseline).", sinir: "Monitör tek hasta için anlık okur; ağda binlerce cihaz var ve veri toplama kendisi de ağ yükü yaratır. Baseline bir kez ölçülüp unutulmaz, ağ değiştikçe yenilenir." },
    rehberli: ["SNMP yönetici (manager) ile ajan (agent) arasındaki sorgu ve trap (cihazın kendiliğinden uyarısı) farkını anlat; portları yaz (UDP 161/162).", "Syslog önem düzeylerini 0 (emergency) → 7 (debug) sırala ve 'uyarı' ile 'hata' hangi sayılar, söyle.", "Bir ağ için baseline almak istiyorsun: hangi dört metriği (bant genişliği, CPU, hata sayacı, gecikme) hangi sıklıkla ölçersin, yaz."],
    bagimsiz: "Bilgisayarında Windows 'Olay Görüntüleyici'yi ya da Linux 'journalctl'i aç. Bir günün olaylarını önem düzeyine göre say; bir uyarıyı seç ve olası nedenini yaz. Normal bir günün CPU ve ağ kullanımını not et (kişisel baseline).",
    hatalar: [["SNMPv2c ve varsayılan topluluk adını (public) kullanmak", "Topluluk adı düz metin gider; mümkünse SNMPv3 (kimlik doğrulama + şifreleme) kullan."], ["Baseline almadan 'yüksek' demek", "Normal değer bilinmeden sapma anlamsızdır."], ["Syslog'u yalnız cihazda tutmak", "Cihaz çökerse ya da saldırgan silerse kayıt gider; merkezi sunucuya gönder."], ["Her olayı aynı önemde saymak", "Önem düzeyine göre uyarı eşiği belirle; yoksa alarm yorgunluğu olur."]],
    gecme: { olcut: "Mini sınavda %80 ve SNMP ile syslog'un yönünü, portlarını ve baseline'ın amacını söyleyebilmek.", kritik: ["SNMPv2c'nin şifreli olduğunu sanmak", "SNMP ile syslog'un yönünü karıştırmak (SNMP sorgusu yöneticiden ajana gider; trap ve syslog cihazdan sunucuya akar)"] },
    kaynaklar: [R("3411", "An Architecture for Describing SNMP Management Frameworks", "SNMP yönetici/ajan mimarisi."), R("5424", "The Syslog Protocol", "Syslog mesaj biçimi ve önem düzeyleri."), R("7011", "Specification of the IP Flow Information Export (IPFIX) Protocol", "Flow verisinin standart dışa aktarımı.")],
    telafi: "Tek bir cihaz seç ve üç soruyu yanıtla: neyi ölçeceğim (SNMP), neyi kaydedeceğim (syslog), normal değeri ne (baseline).",
    sonraki: "Sıradaki konu: yüksek erişilebilirlik, felaket kurtarma ve belgeleme."
  };

  E[11] = {
    analoji: { a: "Yangın sigortası ve tahliye planı: RTO binanın ne kadar sürede yeniden açılacağı, RPO en çok ne kadar eşyanın kaybedilebileceği; yedek site ise ikinci bir ofis.", sinir: "Sigorta parayı öder, süreyi kısaltmaz; yedek siteyi kurmak RTO'yu kısaltır ama maliyeti artırır. Hedefler iş birimi başına değişir, hepsine aynı sıcak site gerekmez." },
    rehberli: ["Bir e-ticaret sitesi için RTO = 1 saat, RPO = 5 dakika diyelim: yedek sıklığı ve site türü ne olmalı? Gerekçelendir.", "Sıcak, ılık ve soğuk siteyi hız ve maliyetle sırala; hangisi hangi RTO'ya uyar?", "Bir değişiklik talebi için adımları yaz: talep, risk, onay, bakım penceresi, uygulama, geri dönüş planı, kayıt."],
    bagimsiz: "Okulundaki ya da hayali bir şirketin üç iş sistemi (e-posta, ödeme, wiki) için RTO ve RPO hedefi belirle; her biri için hangi yedek sitenin yettiğini yaz. Bu sistemlerden biri için küçük bir ağ şeması ve envanter tablosu çıkar.",
    hatalar: [["Yedeği hiç denememek", "Yedek geri yükleme planı düzenli test edilmeli; test edilmeyen yedek varsayımdır."], ["RTO ile RPO'yu karıştırmak", "RTO süreyle, RPO veri kaybı miktarıyla ilgilidir."], ["Değişikliği geri dönüş planı olmadan yapmak", "Eski yapılandırma kaydedilmeli ve geri dönüş yolu önceden belirlenmeli."], ["Belgelemeyi sona bırakmak", "Şema, kablo haritası ve IPAM güncel değilse her arıza keşif işine döner."]],
    gecme: { olcut: "Mini sınavda %80 ve bir iş hedefine (RTO/RPO) göre site türünü gerekçesiyle seçebilmek.", kritik: ["RTO'nun veri kaybı süresi olduğunu sanmak", "Soğuk sitenin dakikalar içinde devreye girdiğini sanmak"] },
    kaynaklar: [R("5798", "Virtual Router Redundancy Protocol (VRRP) Version 3", "Ağ geçidi yedekliliği için standart FHRP protokolü; yüksek erişilebilirlik örneği.")],
    telafi: "Önce RTO ve RPO'yu iki ayrı cümleyle kendi sözlerinle yaz; sonra bir sistem için ikisini de seçip site türünü bul.",
    sonraki: "Sıradaki konu: saldırı türleri ve zafiyet."
  };

  E[12] = {
    analoji: { a: "Ev güvenliği: kilidin zayıf olması zafiyet, hırsızlık girişimi tehdit, kapıyı gerçekten açmak istismar, alarm ve kilit değişimi savunmadır.", sinir: "Evde hırsız fiziksel olarak gelir; ağda saldırı uzaktan, otomatik ve aynı anda binlerce hedefe yapılabilir. Güvenlik bir kez kurulup bitmez; yama ve izleme süreklidir." },
    rehberli: ["CIA üçlüsünü (gizlilik, bütünlük, erişilebilirlik) bir DoS saldırısı, bir ortadaki adam saldırısı ve bir dosya silme olayıyla eşle.", "ARP zehirlenmesi, DNS zehirlenmesi, MAC taşırma ve kötü AP için birer cümle yaz: hangi bilgiyi sahteler, hangi savunma azaltır (DAI, DNSSEC, port güvenliği, 802.1X).", "Bir senaryoda tehdit, zafiyet ve istismar ayrımını söyle: varsayılan parolası değişmemiş bir kamera."],
    bagimsiz: "Kendi evindeki ağ cihazlarının (modem, kamera, yazıcı) varsayılan parolalarını, güncelleme durumunu ve açık yönetim arayüzünü kontrol et. Her biri için bir zafiyet ve ona karşı bir savunma yaz; hepsini yalnız kendi cihazlarında yap.",
    hatalar: [["Zafiyet, tehdit ve istismarı aynı sanmak", "Zafiyet zayıflıktır, tehdit olası zarardır, istismar zayıflığı kullanan yöntemdir."], ["Varsayılan parolayı değiştirmemek", "Cihaz yönetim paneli kolay ele geçirilir; ilk işte değiştir."], ["Kullanılmayan portları açık bırakmak", "Yetkisiz cihaz ağa takılabilir; boş portları kapat."], ["DoS ile DDoS'u karıştırmak", "DDoS çok sayıda kaynaktan gelir; kaynağı engellemek tek başına yetmez."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen bir belirtiden olası saldırı türünü ve uygun savunmayı söyleyebilmek.", kritik: ["DDoS'u tek bir kaynaktan gelen saldırı sanmak", "Güvenlik duvarının her saldırıyı tek başına durdurduğunu sanmak"] },
    kaynaklar: [R("826", "An Ethernet Address Resolution Protocol", "ARP'nin özgün tanımı."), R("4987", "TCP SYN Flooding Attacks and Common Mitigations", "SYN seli saldırısı ve savunma yöntemleri.")],
    telafi: "Saldırıları katmana göre yeniden grupla (2. katman: ARP, MAC, VLAN; 3–4: DoS; 7: sosyal mühendislik) ve her gruba tek bir savunma eşleştir.",
    sonraki: "Sıradaki konu: güvenlik duvarı, VPN ve kimlik doğrulama (lab var)."
  };

  E[13] = {
    analoji: { a: "Apartman girişi: güvenlik duvarı kapıdaki görevli ve izin listesi, DMZ lobi (misafire açık ama içeriyi ayıran alan), VPN şifreli kapalı otobüs, AAA ise giriş kartı, hangi kata çıkabildiğin ve ziyaret defteridir.", sinir: "Görevli herkesin yüzünü tanır; güvenlik duvarı yalnız yazılı kurala bakar. Kurallar sırayla değerlendirilir ve hiçbiri uymazsa varsayılan sonuç 'red'dir (örtük deny). VPN trafiği şifreler ama uç cihazın güvenliğini sağlamaz." },
    rehberli: ["Üç bölgeli ağı çiz: iç ağ, DMZ, dış ağ. Web sunucusunu, veritabanını ve kullanıcı PC'lerini hangi bölgeye koyarsın, neden?", "ACL satırlarını yukarıdan aşağı değerlendirme sırasını ve sondaki örtük deny'i göster; aynı paket için iki satırın yerini değiştir ve sonucun değiştiğini yaz.", "RADIUS (UDP 1812/1813, yalnız parolayı şifreler) ile TACACS+ (TCP 49, tüm içeriği şifreler) farkını tek cümleyle anlat."],
    bagimsiz: "Bir ofis için güven bölgeleri planı çıkar (iç, DMZ, misafir, IoT). Her bölge için hangi yönde hangi trafiğe izin verileceğini (ör. dış → DMZ: TCP 443) üç satırlık bir kural tablosuna yaz. Ardından ACL lab'ındaki senaryoları çöz.",
    hatalar: [["ACL satırlarının tümünün değerlendirildiğini sanmak", "İlk eşleşmede durur; satır sırası sonucu belirler."], ["Örtük deny'i unutmak", "Hiçbir satıra uymayan paket reddedilir; izin vermek istediğin trafiği açıkça yaz."], ["IoT cihazlarını ana ağa koymak", "Savunmasız cihaz tüm ağa geçiş kapısı olur; ayrı segment kullan."], ["Ortak Wi-Fi parolası veya ortak admin hesabı kullanmak", "Kim ne yaptı izlenemez; ayrılan kişi hâlâ girebilir. Enterprise ağda 802.1X + RADIUS kullan."]],
    gecme: { olcut: "Mini sınavda %80 ve ACL lab'ındaki paket senaryolarında doğru karar ile eşleşen satırı bulabilmek.", kritik: ["ACL'nin tüm satırları değerlendirdiğini sanmak", "VPN'in uç cihazı da güvenli yaptığını sanmak"] },
    kaynaklar: [R("4301", "Security Architecture for the Internet Protocol", "IPsec mimarisi."), R("2865", "Remote Authentication Dial In User Service (RADIUS)", "RADIUS'un tanımı."), R("8907", "The TACACS+ Protocol", "TACACS+ protokolü."), R("4120", "The Kerberos Network Authentication Service (V5)", "Kerberos kimlik doğrulama.")],
    telafi: "Tek bir paket seç ve ACL'yi satır satır oku; ilk eşleşmede dur. Eşleşme yoksa sonucu 'red' yaz. Lab'daki ipucu cezasızdır.",
    sonraki: "Sıradaki konu: sorun giderme metodolojisi.",
    lab: "net-acl"
  };

  E[14] = {
    analoji: { a: "Doktor muayenesi: önce şikayeti dinler, tahmin yürütür, test ister, tedaviyi uygular, sonra iyileşmeyi kontrol edip kayda geçirir.", sinir: "Hasta kendi durumunu anlatır; ağ kullanıcısı çoğu zaman sorunu yanlış tanımlar ('internet bozuk'), bu yüzden belirtiyi sen doğrulamalısın. Ağda kuram birkaç kez çürütülüp yenisi kurulabilir; her zaman ilk tahmin doğru çıkmaz." },
    rehberli: ["7 adımı sırala: sorunu belirle, olası neden kuramı kur, kuramı test et, eylem planı hazırla, çözümü uygula (ya da yükselt), tam işlevi doğrula, belgele.", "Üç yaklaşımı söyle: yukarıdan aşağı, aşağıdan yukarı, böl-ve-yönet. 'Web açılmıyor' için hangisini seçersin, neden?", "Kuram test sonucu yanlış çıkarsa ne yaparsın? Yeni kuram kur ya da yükselt (escalate); bu adımı yaz."],
    bagimsiz: "Son yaşadığın bir bilgisayar ya da ağ sorununu (ör. Wi-Fi koptu) 7 adıma uygun yaz: belirti, ne değişti, kuram, test, çözüm, doğrulama, kayıt. Hangi adımı atladığını işaretle.",
    hatalar: [["Adım 1'i atlayıp doğrudan çözmeye geçmek", "Yanlış sorun çözülür; belirtiyi doğrula ve 'ne değişti?' diye sor."], ["Birden çok şeyi aynı anda değiştirmek", "Neyin işe yaradığı anlaşılmaz; bir seferde tek değişiklik yap."], ["Çözümden sonra doğrulamamak", "Sorun başka biçimde sürebilir; kullanıcıyla işlevi doğrula."], ["Belgelememek", "Aynı sorun tekrar çıktığında bilgi yoktur; bulgu, eylem ve sonucu yaz."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen bir senaryoda 7 adımı doğru sırayla ve her adımda ne yapılacağını söyleyebilmek.", kritik: ["Önce çözümü uygulayıp sonra sorunu belirlemek", "Belgelemeyi isteğe bağlı sanmak"] },
    telafi: "7 adımı üç gruba böl: anla (1–2), dene (3–5), kapat (6–7). Bir sorun seç ve her gruba bir cümle yaz.",
    sonraki: "Sıradaki konu: sorun giderme araçları (komut satırı ve analizör)."
  };

  E[15] = {
    analoji: { a: "Doktorun cihazları: ateş ölçer (ping), röntgen yolu (traceroute), rehberden isim sorgulama (nslookup), mikroskop (Wireshark).", sinir: "Cihaz tek bir şeyi ölçer; ping başarısızsa her zaman bağlantı kopuk demek değildir (ICMP bir güvenlik duvarı tarafından engellenmiş olabilir). Paket yakalama gizlilik içerdiği için yalnız yetkili ağda yapılır." },
    rehberli: ["Sırayla çalıştır ve her adımda neyi sınadığını yaz: ping 127.0.0.1 (kendi yığın) → ağ geçidi (yerel ağ) → 8.8.8.8 (internet) → bir alan adı (DNS).", "tracert/traceroute çıktısında bir satırın '* * *' olması hangi olasılıkları işaret eder, yaz.", "ipconfig /all çıktısından IP, maske, ağ geçidi, DNS ve DHCP sunucusunu bul."],
    bagimsiz: "Kendi bilgisayarında ping, ipconfig/ip a, nslookup ve tracert/traceroute komutlarını çalıştır; çıktıları bir 'ağ sağlığı' tablosuna yaz. Sonra Wireshark ya da tcpdump ile (yalnız kendi ağında) 'dns' filtreli bir sorgu yakala ve sorguyu yorumla.",
    hatalar: [["Ping başarısız = bağlantı yok sanmak", "ICMP engelli olabilir; başka bir yöntemle (TCP bağlantısı, traceroute) doğrula."], ["Yanlış komut seçmek", "İsim çözümü için nslookup/dig, yol için traceroute, port için netstat kullan."], ["Paket yakalamayı yetkisiz yapmak", "Gizlilik ve yasal sorun doğar; yalnız yetkili ağda yap."], ["nmap'i başkasının ağında çalıştırmak", "İzinsiz tarama yasal sorun yaratır; yalnız kendi ya da izinli ağda kullan."]],
    gecme: { olcut: "Mini sınavda %80 ve bir belirti için doğru komutu seçip çıktısını yorumlayabilmek.", kritik: ["Ping'in her zaman erişimi kanıtladığını sanmak", "Her ağda paket yakalamanın serbest olduğunu sanmak"] },
    kaynaklar: [R("792", "Internet Control Message Protocol", "ping'in kullandığı ICMP'nin tanımı."), R("1122", "Requirements for Internet Hosts: Communication Layers", "İstemci ağ yığınının davranışı.")],
    telafi: "Yalnız dört komuta dön (ping, ipconfig, nslookup, traceroute) ve her birinin bir cümlelik işini yaz; sonra bir 'internet yok' senaryosunda sırasını kur.",
    sonraki: "Sıradaki konu: kablo ve Wi-Fi sorunları, performans."
  };

  E[16] = {
    analoji: { a: "Su borusu: pas ve çatlak kablo hasarı, borunun kıvrılması kötü sonlandırma, pompa düşük sinyal; arıza ya borudadır ya da su yolundadır.", sinir: "Boruda sızıntı gözle görülür; kablo arızası sayaçlar ve test cihazıyla bulunur. Wi-Fi'da su yerine radyo dalgası olduğu için sorun çoğu zaman görünmez parazit ya da kanal doluluğudur." },
    rehberli: ["Bir port sayacında CRC ve giant sayılarının artması hangi sorunu düşündürür? Kablo, hız/dubleks uyumsuzluğu ve parazit olasılıklarını sırala.", "Kablo arızası türlerini söyle: açık, kısa, ters çift, kötü sonlandırma, mesafe aşımı. Her biri için hangi test aracıyla bulunur?", "Gecikme, kayıp ve jitter'ı birbirinden ayır ve hangi uygulamanın hangisinden en çok etkilendiğini yaz (ör. görüntülü görüşme ve jitter)."],
    bagimsiz: "Kendi Wi-Fi'ında üç farklı noktada (yakın, orta, uzak) sinyal gücü ve hızı ölç; sonucu tabloya yaz. En düşük noktada sorunun nedenini (mesafe, engel, kanal) tahmin et ve test et.",
    hatalar: [["Wi-Fi yavaşlığını hep sinyal gücüne bağlamak", "Kanal doluluğu ve parazit de yavaşlatır; analizörle kontrol et."], ["Dubleks uyumsuzluğunu fark etmemek", "Bir uç tam, diğer uç yarım dubleksse çarpışma ve yavaşlık olur; iki ucu eşitle."], ["Kablo uzunluğu sınırını (UTP için tipik 100 m) aşmak", "Mesafe aşımı zayıflama ve hata artışı yapar; switch ya da fiber kullan."], ["Kablo hatasında hemen kabloyu atmak", "Önce sayaç ve test cihazıyla sorunun kabloda mı portta mı olduğunu ayır."]],
    gecme: { olcut: "Mini sınavda %80 ve bir belirtiden (CRC artışı, düşük hız, kopmalar) olası fiziksel nedeni söyleyebilmek.", kritik: ["Sinyal gücü yüksekse Wi-Fi'ın sorunsuz olduğunu sanmak", "Her yavaşlığın bant genişliği eksikliği olduğunu sanmak"] },
    telafi: "Önce sorunu katmana yerleştir: kablo mu (1. katman), port ayarı mı (2. katman) yoksa Wi-Fi radyosu mu? Sonra o katmanın tek bir testini yap.",
    sonraki: "Sıradaki konu: ağ hizmetleri ve yönlendirme sorunları."
  };

  E[17] = {
    analoji: { a: "Posta teslimatı: mektup gitmediyse sırayla bak: adres yanlış mı (ağ geçidi), posta kutusu dolu mu (DHCP havuzu), yanlış mahalleye mi gitti (VLAN), kapıda engel mi var (ACL).", sinir: "Postada tek aşama başarısız olur; ağda birden çok neden aynı anda bulunabilir ve belirti birkaç farklı nedene uyabilir. Bu yüzden değişiklikleri tek tek dene." },
    rehberli: ["Tabloyu doldur: belirti 'IP 169.254.x.x' → olası neden (DHCP ulaşılamıyor/havuz dolu); 'yerel ağa ping var, internete yok' → ağ geçidi ya da default rota; 'IP ile açılıyor, isimle açılmıyor' → DNS.", "Katman katman ele: fiziksel bağlantı → IP adresi → ağ geçidi → DNS → servis/port. Her adımda hangi komutu kullanırsın?", "Tek belirtiyi seç ve iki olası nedeni yaz; bunları ayıracak tek bir test öner."],
    bagimsiz: "Aşağıdaki üç belirtiyi sırala ve her biri için ilk komutunu ve beklenen çıktıyı yaz: (1) bir PC 169.254.x.x adresi almış, (2) yalnız bir site açılmıyor, (3) bir VLAN'daki tüm cihazlar kopuk. Cevabını dersteki tabloyla karşılaştır.",
    hatalar: [["Belirtiyi tek nedene bağlamak", "Aynı belirti birkaç nedene uyabilir; her kuramı test et."], ["Birden çok ayarı aynı anda değiştirmek", "Neyin işe yaradığı kaybolur; tek seferde tek değişiklik yap."], ["APIPA adresini normal sanmak", "169.254.x.x DHCP'ye ulaşılamadığını gösterir; önce DHCP'yi ve kabloyu kontrol et."], ["ACL ve güvenlik duvarını son akla getirmek", "Yalnız belirli servis açılmıyorsa port ve kural ilk şüpheli olmalıdır."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen bir belirtiden olası nedeni ve ilk test edilecek komutu söyleyebilmek.", kritik: ["APIPA'nın (169.254.x.x) internet bağlantısı olduğunu sanmak", "Birden çok ayarı birlikte değiştirmenin sorun giderme için uygun olduğunu sanmak"] },
    kaynaklar: [R("3927", "Dynamic Configuration of IPv4 Link-Local Addresses", "169.254.0.0/16 (APIPA) adreslerinin nedeni."), R("1034", "Domain Names: Concepts and Facilities", "DNS kaynaklı belirtileri anlamak için temel kavramlar.")],
    telafi: "Belirti → olası neden tablosuna dön; yalnız iki satırı seç (APIPA ve 'IP ile açılıyor, isimle açılmıyor') ve her biri için tek komut yaz.",
    sonraki: "Network yolunun son konusu; soru bankası ve proje atölyesiyle pekiştir."
  };
})();

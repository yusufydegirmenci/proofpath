"use strict";
(function (g) {
  var K = g.PP_PROJ = g.PP_PROJ || { tanim: {}, yeni: [], va: [] };

  K.tanim["sec1"] = {
    onkosul: [
      "Önkoşul yok: bu proje Siber Güvenlik yolunun girişidir; yalnız e-posta, telefon ve tarayıcıyı günlük kullanma düzeyinde bilgi varsayılır.",
      "Kendi e-posta, banka ve sosyal hesaplarına giriş yapabilmen ve modem arayüzüne bağlanabilmen gerekir.",
      "Ekran görüntüsü alıp parola ve kod gibi gizli alanları karartabilmen gerekir."
    ],
    gereksinim: [
      "İşlevsel (zorunlu): 5 varlığı ve her biri için tehdit ile zafiyeti içeren bir varlık-tehdit tablosu hazırlanır.",
      "İşlevsel (zorunlu): En az 5 önemli hesap parola yöneticisiyle yenilenir ve 4 hesapta 2FA açılır.",
      "İşlevsel (zorunlu): Modem ayarları ile cihaz güncelleme ve disk şifreleme durumu önce/sonra notuyla belgelenir.",
      "İşlevsel (zorunlu): 3-2-1 yedek kurulur, en az 1 dosya geri yüklenir ve 1 sayfalık denetim raporu yazılır.",
      "İşlevsel (isteğe bağlı): Aile üyelerinden birinin hesabı için aynı kontrol listesi uygulanır.",
      "İşlevsel olmayan: Hiçbir rapor ve ekran görüntüsünde parola, yedek kod veya Wi-Fi şifresi görünmez.",
      "İşlevsel olmayan: Rapor tek sayfadır ve teknik terim bilmeyen biri tarafından okunabilir."
    ],
    kabul: [
      "K1: Tabloda 5 varlığın her birinde tehdit, zafiyet ve C/I/A harfi gerekçesiyle yazılıdır | Test: Tabloyu satır satır say; boş hücre kalmadığını ve her gerekçenin tek cümle olduğunu kontrol et.",
      "K2: Parola yöneticisinde 5 benzersiz parola ve 4 hesapta 2FA vardır | Test: Her hesabın güvenlik ayarı ekranını aç, 2FA'nın açık olduğunu gösteren görüntüyü kanıt notuna ekle.",
      "K3: Kontrol listesi 5 maddedir ve her madde gözlenebilir bir işaret içerir (gönderen adresi, bağlantı hedefi gibi) | Test: Listeyi 'phishing quiz' örneklerinden 3'üne uygula ve her kararın hangi maddeye dayandığını yaz.",
      "K4: Modem ve cihaz için 5 ayarın önce/sonra değeri yazılıdır | Test: Ayar ekranlarını yeniden aç ve notundaki 'sonra' değerinin gerçekle eşleştiğini doğrula.",
      "K5: Seçtiğin 1 dosya yedekten geri yüklenmiş ve açılabiliyor | Test: Geri yüklenen dosyayı aç ve özgün dosyayla boyut ile içeriğini karşılaştır.",
      "K6: Denetim raporunun her bulgusunda bulgu, risk, düzeltme ve durum alanı doludur | Test: Raporu bir arkadaşına ver; hangi bulgunun düzeldiğini 1 dakikada söyleyebiliyor mu bak."
    ],
    rubrik: [
      { olcut: "Varlık-tehdit tablosunun somutluğu", guclu: "5 varlık gerçek hesaplarına bağlıdır ve her tehdit 'kim, ne yapar' biçiminde somuttur.", zayif: "Varlıklar 'bilgisayar' gibi genel, tehditler 'hacker' gibi belirsizdir." },
      { olcut: "C/I/A seçiminin gerekçesi", guclu: "Her harf, varlık kaybedilirse ne olacağıyla bağlanmış tek cümleyle savunulur.", zayif: "Harfler gerekçesiz veya hepsi aynıdır." },
      { olcut: "Sertleştirmenin doğrulanabilirliği", guclu: "Parola, 2FA ve modem ayarlarının önce/sonra kanıtı vardır ve gizli bilgi karartılmıştır.", zayif: "Yalnız 'yaptım' denmiştir veya ekran görüntüsünde parola görünür." },
      { olcut: "Yedek ve geri yükleme", guclu: "3-2-1 kopyaların yeri yazılıdır ve geri yükleme gerçekten denenmiştir.", zayif: "Yedek alınmış ama geri yükleme hiç denenmemiştir." },
      { olcut: "Denetim raporunun önceliği", guclu: "Bulgular risk sırasındadır ve her biri bir düzeltme ve duruma bağlıdır.", zayif: "Rapor ayarların listesi gibidir, risk ve durum yoktur." }
    ],
    savunma: [
      "Neden 2FA kodu için SMS yerine uygulama seçtin; telefonun çalınması durumunda hangisi seni daha az açıkta bırakır?",
      "Parola yöneticisinin ana parolası ele geçirilirse ne olur ve bu riski hangi iki önlemle azalttın?",
      "Yedeği yalnız aynı bilgisayardaki ikinci klasöre alsaydın hangi tehdide karşı korumasız kalırdın?",
      "Raporunda hangi riski bilerek açık bıraktın ve neden kabul ettin?"
    ],
    yetkinlikler: [
      { ad: "Tehdit modelleme", kanit: "Adım 1'in 5 satırlık varlık-tehdit tablosu ve adım 2'nin C/I/A gerekçeleri." },
      { ad: "Hesap güvenliği", kanit: "Adım 3'teki yöneticide 5 benzersiz parola ve adım 4'teki 4 hesapta açık 2FA." },
      { ad: "Phishing tanıma", kanit: "Adım 5'in 5 maddelik kontrol listesinin örneklere uygulanması." },
      { ad: "Güvenlik denetimi ve raporlama", kanit: "Adım 6'nın önce/sonra notu ile adım 7'nin bulgu-risk-düzeltme-durum raporu." }
    ],
    telafi: "K1 tutmazsa → adım 1 ve 2'ye dön, varlıkları gerçek hesaplarınla yeniden yaz ve her C/I/A harfine kayıp senaryosu ekle. K2 tutmazsa → adım 3 ve 4'ü tekrar et, eksik hesapları tek tek yenile. K4 tutmazsa → adım 6'yı baştan yap ve her ayarın ekranını açıp önce/sonra değerini yeniden kaydet. K5 tutmazsa → adım 7'deki yedeği yeniden kur ve geri yüklemeyi yeniden dene.",
    sonraki: "K1-K6'nın tümü tutar ve savunma sorularını sözlü cevaplayabilirsen sec2 (Ev Laboratuvarı) açılır; sec2'nin başlıca önkoşulu K2 ve K5'tir. Tamamlama bir kanıt kaydı üretir; kanıt notuna denetim raporunu ve kendi denetimini yaz."
  };

  K.tanim["sec2"] = {
    onkosul: [
      "sec1 (Dijital Kale): tehdit, zafiyet ve C/I/A kavramlarını ve risk derecelendirmeyi bilmen gerekir.",
      "Bilgisayarda sanallaştırma yapabilecek yeterli RAM ve disk bulunması ve VirtualBox kurabilmen gerekir.",
      "Dosya gezgini dışında komut satırında bir komut yazıp çıktısını okuyabilmen gerekir."
    ],
    gereksinim: [
      "İşlevsel (zorunlu): Kali ve Ubuntu Server VM'leri izole Internal Network'te statik IP ile birbirini ping'ler.",
      "İşlevsel (zorunlu): nmap ve Wireshark çıktıları yorumlanır; HTTP ile self-signed HTTPS yakalamasının farkı açıklanır.",
      "İşlevsel (zorunlu): DVWA'da SQLi ve XSS örneği denenir ve her açığın neden oluştuğu ile düzeltmesi yazılır.",
      "İşlevsel (zorunlu): Başarısız SSH denemeleri log'da bulunur, fail2ban engeli gösterilir, UFW ve anahtarlı SSH ile önce/sonra port tablosu çıkarılır.",
      "İşlevsel (zorunlu): 3 bulguluk, risk dereceli bir bulgu raporu markdown olarak yazılır.",
      "İşlevsel (isteğe bağlı): Raporu GitHub'a koyup ilk bulgu için düzeltme kanıtı eklenir.",
      "İşlevsel olmayan: Tüm denemeler yalnız kendi izole laboratuvarında yapılır; hedef olarak dış IP veya başkasının sistemi kullanılmaz."
    ],
    kabul: [
      "K1: İki VM Internal Network'te statik IP ile birbirine ping atar ve NAT dışına çıkış kapalıdır | Test: Kali'den Ubuntu'ya ping at, sonra VM ağ ayarında internet adaptörü olmadığını ekranla göster.",
      "K2: nmap -sV çıktısındaki her açık port için servis adı ve 'gerekli mi' kararı yazılıdır | Test: Çıktıdaki port sayısıyla notundaki satır sayısını karşılaştır; eşit olmalı.",
      "K3: HTTP yakalamasında içerik okunur, HTTPS yakalamasında okunmaz ve fark 3 cümleyle yazılıdır | Test: İki yakalamayı yan yana aç, okunan metin parçasını bir ekranda işaretle.",
      "K4: SQLi ve XSS için 'neden oldu, nasıl düzelir' notunda parametreli sorgu ve çıktı kodlama geçer | Test: Notu okuyup her açığın kök nedenini tek cümleyle söyle.",
      "K5: fail2ban bir IP'yi engeller ve log satırı ile engelleme çıktısı birlikte gösterilir | Test: Yanlış parola denemeleri sonrası fail2ban-client status çıktısında engellenen IP'yi gör.",
      "K6: Önce/sonra port tablosunda en az 1 port kapanmıştır ve SSH'ın anahtarla girişi parola kapatılmadan önce denenmiştir | Test: Ayrı bir pencerede anahtarla giriş yap, sonra nmap'i yeniden çalıştırıp tabloyu karşılaştır."
    ],
    rubrik: [
      { olcut: "Laboratuvar izolasyonu", guclu: "Ağ şeması ve ayarlarıyla yalnız Internal Network kullanıldığı ve dışarıya tarama yapılmadığı gösterilir.", zayif: "Hangi ağda çalışıldığı belirsizdir veya bir VM köprülü ağdadır." },
      { olcut: "Tarama yorumunun doğruluğu", guclu: "Her açık port için servis ve gereklilik kararı gerekçelidir.", zayif: "Çıktı yapıştırılmış, yorum yoktur." },
      { olcut: "Trafik analizi", guclu: "HTTP ile HTTPS farkı yakalama kanıtıyla ve şifrelemenin neyi korumadığıyla birlikte açıklanır.", zayif: "Fark 'HTTPS güvenli' cümlesinde kalır." },
      { olcut: "Zafiyetten düzeltmeye bağ", guclu: "Her açık için kök neden, tespit işareti ve savunma ayrı ayrı yazılıdır.", zayif: "Yalnız 'saldırı çalıştı' denmiş, düzeltme yoktur." },
      { olcut: "Sertleştirme kanıtı ve risk raporu", guclu: "Önce/sonra port tablosu ve risk derecesi gerekçeli 3 bulgu vardır.", zayif: "Önce/sonra karşılaştırması yok veya riskler gerekçesizdir." }
    ],
    savunma: [
      "Laboratuvarı köprülü ağda kursaydın hangi risk doğardı ve bu seni yasal olarak nasıl etkilerdi?",
      "fail2ban yerine yalnız güçlü parola yeterli olur muydu; hangi saldırı türünde yetmez?",
      "UFW'yi açmadan önce 'allow OpenSSH' kuralını neden eklemek zorundaydın ve unutsaydın ne olurdu?",
      "Üç bulgundan birini neden yüksek, birini neden düşük risk sayıyorsun; sıralamanı hangi veri değiştirirdi?"
    ],
    yetkinlikler: [
      { ad: "Güvenli laboratuvar kurma", kanit: "Adım 1'deki karşılıklı ping ekran görüntüsü ve adım 2'deki 10 komutluk kendi cheat sheet'in." },
      { ad: "Keşif ve trafik analizi", kanit: "Adım 3'ün nmap çıktısı ile port başına notu ve adım 4'ün HTTP/HTTPS yakalama farkı." },
      { ad: "Web zafiyetini anlama", kanit: "Adım 5'in SQLi ve XSS için 'neden oldu, nasıl düzelir' notu." },
      { ad: "Tespit ve savunma", kanit: "Adım 6'nın log satırı ve engelleme kanıtı ile adım 7'nin önce/sonra port tablosu." },
      { ad: "Bulgu raporlama", kanit: "Adım 8'in risk dereceli 3 bulguluk markdown raporu." }
    ],
    telafi: "K1 tutmazsa → adım 1'e dön, ağ adaptörünü Internal Network'e alıp statik IP'leri yeniden ver. K3 tutmazsa → adım 4'ü tekrar et ve nginx'i hem HTTP hem self-signed HTTPS ile yeniden yayınlayıp yeniden yakala. K5 tutmazsa → adım 6'yı tekrar et, log yolunu yeniden bul ve fail2ban ayarını yeniden dene. K6 tutmazsa → adım 7'yi baştan yap; önce ayrı pencerede anahtarla girişi doğrula, sonra port tablosunu yeniden çıkar.",
    sonraki: "K1-K6 tutar ve savunma sorularını cevaplayabilirsen sec3 (Mini SOC) açılır; sec3 için K5'teki log okuma ve K6'daki önce/sonra karşılaştırması gereklidir. Tamamlama kanıt kaydı üretir; kanıt notuna raporu ve port tablolarını koy."
  };

  K.tanim["sec3"] = {
    onkosul: [
      "sec2 (Ev Laboratuvarı): VM ağı kurma, SSH log'u okuma, fail2ban ve bulgu raporu yazma deneyimi gerekir.",
      "Python'da dosya okuyup sözlükle sayma yapabilecek temel bilgi ve Git/GitHub kullanımı gerekir.",
      "Docker'ı bilgisayarına kurup bir konteyner çalıştırabilmen gerekir."
    ],
    gereksinim: [
      "İşlevsel (zorunlu): Wazuh kurulur ve Ubuntu ile Windows VM'lerinden 2 ajan panelde bağlı görünür.",
      "İşlevsel (zorunlu): Windows 4625 olayları üretilir ve panelde bulunur; 3 ATT&CK tekniği için tespit fikri tablosu hazırlanır.",
      "İşlevsel (zorunlu): '5 dakikada 5 başarısız SSH girişi' özel kuralı yazılır ve tetiklenir; bir yanlış alarm senaryosu değerlendirilir.",
      "İşlevsel (zorunlu): auth.log'dan IP başına başarısız giriş sayan 40 satırlık Python aracı CSV üretir.",
      "İşlevsel (zorunlu): Juice Shop'ta 3 zafiyet bulunup her biri düzeltme önerisiyle raporlanır ve 1-2 sayfalık olay playbook'u masabaşı tatbikatla sınanır.",
      "İşlevsel (isteğe bağlı): Python aracına eşik aşılınca uyarı basan bir bayrak eklenir.",
      "İşlevsel olmayan: Juice Shop ve Burp yalnız kendi bilgisayarında kullanılır; saldırı betiği paylaşılmaz, çıktılar savunma ve tespit odaklıdır."
    ],
    kabul: [
      "K1: Wazuh panelinde 2 ajan 'aktif' durumda görünür | Test: Panelin ajan listesini aç ve iki ajanın ad ve durumunu ekran görüntüsüyle kaydet.",
      "K2: 4625 olaylarının sayısı ve zaman damgası denediğin yanlış parola sayısıyla uyuşur | Test: Kaç deneme yaptığını önceden yaz, panelde aynı sayıyı say.",
      "K3: Her ATT&CK tekniği için 'hangi log'da iz kalır' ve 'nasıl yakalanır' ayrı yazılıdır | Test: 3 satırın 2 sütununu tek tek say; boş hücre olmadığını doğrula.",
      "K4: Özel kural 5 başarısız girişte uyarı üretir, 4 denemede üretmez | Test: Önce 4, sonra 5 yanlış deneme yap ve uyarı ekranını iki durum için karşılaştır.",
      "K5: Python aracı, hazırladığın örnek auth.log ile elle sayımınla aynı IP sayılarını verir | Test: Örnek logda 3 IP'nin başarısız sayısını elle say ve CSV ile karşılaştır.",
      "K6: Her Juice Shop bulgusunda zafiyet türü, nasıl görüldüğü ve düzeltme önerisi vardır ve playbook'ta ilk 15 dakikanın adımları rol sahibiyle yazılıdır | Test: Tatbikat zaman çizelgesinde her adımın bir sorumlusu olduğunu kontrol et."
    ],
    rubrik: [
      { olcut: "SIEM kurulumu ve ajan doğrulaması", guclu: "İki ajan bağlı, log akışı 4625 olaylarıyla kanıtlanmış ve zaman damgaları doğrulanmıştır.", zayif: "Panel açılmış ama ajan bağlantısı veya log akışı gösterilmemiştir." },
      { olcut: "ATT&CK eşlemesi", guclu: "Her teknik için log kaynağı, iz ve tespit mantığı somut yazılıdır.", zayif: "Teknik adları listelenmiş, tespit fikri yoktur." },
      { olcut: "Tespit kuralı kalitesi", guclu: "Eşik, süre ve kaynak mantığı açık; yanlış alarm senaryosu değerlendirilmiştir.", zayif: "Kural her başarısız girişte alarm verir ve yanlış alarm düşünülmemiştir." },
      { olcut: "Python aracı ve portfolyo", guclu: "README ile çalışan, örnek çıktılı araç ve temiz bir repo vardır.", zayif: "Script çalışmaz veya kullanım açıklaması yoktur." },
      { olcut: "Olay müdahale playbook'u", guclu: "Roller, ilk 15 dakika, sınırlama, kanıt ve iletişim zaman çizelgeli tatbikatla sınanmıştır.", zayif: "Playbook genel öğütlerden ibarettir ve tatbikat yapılmamıştır." }
    ],
    savunma: [
      "Kuralını 5 dakikada 5 yerine 1 dakikada 3 yapsan hangi yanlış alarmlar artardı ve hangi saldırıyı kaçırırdın?",
      "Seçtiğin 3 ATT&CK tekniğinden hangisini tespit etmek en zor ve bunu hangi ek log kaynağı kolaylaştırırdı?",
      "Juice Shop bulgularından birini üretimde bulsaydın önce neyi yapardın ve neden hemen düzeltmezdin?",
      "Playbook'ta sınırlamayı kanıt toplamadan önce yapmanın ne bedeli olur?"
    ],
    yetkinlikler: [
      { ad: "SIEM işletimi", kanit: "Adım 1'deki 2 ajanlı panel ve adım 2'deki 4625 pano ekran görüntüsü." },
      { ad: "Tehdit eşleme", kanit: "Adım 3'ün 3 tekniklik ATT&CK tespit fikri tablosu." },
      { ad: "Tespit mühendisliği", kanit: "Adım 4'ün kural dosyası ve uyarı ekran görüntüsü." },
      { ad: "Güvenlik otomasyonu", kanit: "Adım 5'in GitHub'daki Python scripti ve örnek CSV çıktısı." },
      { ad: "Olay müdahalesi ve raporlama", kanit: "Adım 6'nın 3 zafiyetli raporu ve adım 7'nin playbook'u ile tatbikat zaman çizelgesi." }
    ],
    telafi: "K1 tutmazsa → adım 1'e dön ve ajanları yeniden yükleyip yönetici adresini kontrol et. K2 tutmazsa → adım 2'yi tekrar et ve deneme sayısını not alarak yeniden üret. K4 tutmazsa → adım 4'e dön, kuralın eşik ve süre alanlarını düzeltip 4 ve 5 deneme senaryosunu yeniden sına. K5 tutmazsa → adım 5'te elle sayım yaparak scriptin eşleştirmesini düzelt. K6 tutmazsa → adım 6 ve 7'yi yeniden yaz; bulgulara düzeltme ve playbook'a rol ekle.",
    sonraki: "K1-K6 tutar ve savunma sorularını cevaplayabilirsen sec4 (Kapston) açılır; kapston için özellikle K4 (kural), K5 (script) ve K6 (playbook) gerekir. Tamamlama kanıt kaydı üretir; kanıt notuna repo bağlantını ve tatbikat çizelgesini yaz."
  };

  K.tanim["sec4"] = {
    onkosul: [
      "sec2 (Ev Laboratuvarı) ve sec3 (Mini SOC): VM laboratuvarı, nmap, log okuma, Wazuh kuralı ve Python scripti yazma deneyimi gerekir.",
      "Linux komut satırında kullanıcı, grup, izin ve SSH yapılandırmasını yönetebilmen gerekir.",
      "Birden fazla VM'i aynı anda çalıştıracak donanım ve kendi VM ağın dışında hiçbir sisteme dokunmama kuralını kabul etmen gerekir."
    ],
    gereksinim: [
      "İşlevsel (zorunlu): Varlık envanteri, kontrol matrisi ve tehdit aktörü ile vektör tabloları şirket profiline bağlı hazırlanır.",
      "İşlevsel (zorunlu): OpenSSL ile hash, AES şifreleme, RSA imza ve doğrulama elle yapılır ve çıktıları belgelenir.",
      "İşlevsel (zorunlu): Zafiyet taraması CVSS ve varlık kritikliğiyle önceliklendirilir; en öncelikli 3 bulgu düzeltilir.",
      "İşlevsel (zorunlu): OPNsense ile LAN, DMZ ve MGMT segmentasyonu değişiklik talebiyle kurulur; restic yedeği geri yüklenerek hash ile doğrulanır.",
      "İşlevsel (zorunlu): RBAC, TOTP MFA, Wazuh izleme, auth log script'i, olay müdahalesi tatbikatı ve risk kayıt defteri eksiksiz teslim edilir.",
      "İşlevsel (isteğe bağlı): İkinci bir tatbikat senaryosu veya ek risk kaydı eklenir.",
      "İşlevsel olmayan: Tüm tarama ve denemeler yalnız kendi VM ağında yapılır; kanıtlarda anahtar ve gerçek IP karartılır ve her dosya adım numarasıyla izlenebilir yerdedir."
    ],
    kabul: [
      "K1: Envanterdeki her varlığın sahibi, konumu, veri sınıfı ve yaşam döngüsü durumu doludur ve kontrol matrisinde boşluk analizi vardır | Test: CSV'yi aç, boş hücre ara ve 12 kontrolün kategori × tür tablosunda yerini kontrol et.",
      "K2: Hash değişimi, şifreleme-çözme ve imza doğrulama başarılı/başarısız çıktıları ekranda vardır | Test: Dosyada bir harf değiştirip imza doğrulamasının başarısız olduğunu kendi çalıştırmanla gör.",
      "K3: Zafiyet tablosunda her bulgunun CVSS, kritiklik, öncelik ve karar alanı doludur; 3 düzeltmenin tarama öncesi/sonrası farkı görünür | Test: İki taramayı yan yana aç ve düzelen bulguları işaretle.",
      "K4: Segment kuralları izinli ve yasak trafik testleriyle birlikte yazılıdır ve DMZ→LAN engellidir | Test: DMZ VM'inden LAN'a bağlantı dene ve reddedildiğini, LAN→DMZ 80/443'ün çalıştığını kaydet.",
      "K5: Geri yüklenen dosyanın hash'i özgün dosyayla eşleşir ve RBAC deneyinde her rolün yapabildi/yapamadı tablosu tutarlıdır | Test: sha256 değerlerini karşılaştır ve her rol için 'yapamaması gereken' bir eylemi dene.",
      "K6: Olay raporu zaman çizelgesi, kanıt hash'leri ve chain-of-custody formu içerir; risk kayıt defterinde en az 10 risk ısı haritasındadır | Test: Zaman çizelgesindeki her olayın log kaynağını bul ve risk satırlarını say."
    ],
    rubrik: [
      { olcut: "Kapsam ve envanterin bütünlüğü", guclu: "Şirket profili, envanter ve kontrol matrisi birbirine bağlıdır ve boşluklar adlandırılmıştır.", zayif: "Envanter yalnız VM listesidir, boşluk analizi yoktur." },
      { olcut: "Kriptografinin elle uygulanması", guclu: "Hash, şifreleme, imza ve sertifika adımlarının çıktıları ve 'hangi durumda hangisi' tablosu vardır.", zayif: "Komutlar kopyalanmış, çıktı ve yorum yoktur." },
      { olcut: "Mimari karar ve segmentasyon", guclu: "Değişiklik talebi, kural tablosu ve izinli/yasak test sonuçları tutarlıdır.", zayif: "Kural tablosu vardır ama test edilmemiştir veya geri dönüş planı yoktur." },
      { olcut: "Tespit, olay müdahalesi ve kanıt", guclu: "IoC tablosu, uyarı, zaman çizelgeli rapor ve hash'li kanıt zinciri birbirini doğrular.", zayif: "Olay anlatısı vardır ama log kanıtı ve kanıt bütünlüğü yoktur." },
      { olcut: "Yönetişim ve savunulabilirlik", guclu: "Risk puanları, kararlar, politika ve denetim listesi gerçek bulgulara dayanır ve eşleme tablosu tutarlıdır.", zayif: "Politikalar şablon gibidir, kanıt bağlantısı yoktur." }
    ],
    savunma: [
      "Segmentasyonda DMZ'den LAN'a trafiği neden yasakladın ve web sunucusu ele geçirilse yanal hareketi nasıl sınırlardı?",
      "Risk kayıt defterinde bir riski 'aktar' yerine 'azalt' diye işaretlemen hangi koşula bağlıydı?",
      "Yedek geri yükleme testini hiç yapmasaydın 3-2-1 stratejin hangi iddiayı kanıtlayamazdı?",
      "Zaman çizelgende hangi kanıtı toplamayı atlarsan olayı soruşturmak imkansız hale gelirdi?"
    ],
    yetkinlikler: [
      { ad: "Güvenlik mimarisi ve segmentasyon", kanit: "Adım 5'in değişiklik talebi, ağ diyagramı ve izinli/yasak test sonuçlu kural tablosu." },
      { ad: "Kriptografi uygulaması", kanit: "Adım 2'nin hash, şifreleme ve imza çıktıları ile 'hangi durumda hangi kriptografi' tablosu." },
      { ad: "Zafiyet yönetimi", kanit: "Adım 4'ün CVSS ve kritiklikle öncelikli zafiyet tablosu ile tarama öncesi/sonrası kanıtı." },
      { ad: "Güvenlik operasyonları", kanit: "Adım 8'in IoC tablosu, adım 9'un script'i ve adım 11'in zaman çizelgeli olay raporu." },
      { ad: "Risk ve yönetişim", kanit: "Adım 12'nin risk kayıt defteri ile adım 13'ün politika ve denetim listesi." }
    ],
    telafi: "K2 tutmazsa → adım 2'ye dön ve hash, şifreleme ile imza adımlarını baştan, çıktıları kaydederek tekrar et. K3 tutmazsa → adım 4'ü tekrar et; taramayı yeniden çalıştırıp en öncelikli 3 bulguyu düzelt. K4 tutmazsa → adım 5'e dön, kural sırasını düzeltip izinli ve yasak testleri yeniden yap. K6 tutmazsa → adım 11 ve 12'yi yeniden yap; kanıt hash'lerini ve risk puanlarını yeniden üret. Sonunda adım 14'teki hedef tablosunu yeniden doldur.",
    sonraki: "K1-K6'nın tümü tutar ve savunma sorularını sözlü anlatabilirsen bu yolun kapstonu tamamlanmış sayılır; yeni bir kademe veya proje açılmaz, portfolyo repon hazırdır. Bu projenin bağlı olduğu CompTIA Security+ hedeflerine hazırlık içeriği yalnız çalışma aracıdır; sınav hazırlığı garantisi değildir. Tamamlama kanıt kaydı üretir."
  };

  K.tanim["qa1"] = {
    onkosul: [
      "Önkoşul yok: QA yolunun giriş projesidir; yalnız tarayıcıda web sitesi kullanma ve elektronik tablo açabilme düzeyi varsayılır.",
      "Google Sheets'te tablo oluşturup sütun ekleyebilmen ve Trello'da kart açabilmen gerekir."
    ],
    gereksinim: [
      "İşlevsel (zorunlu): saucedemo.com giriş sayfası için 8 test senaryosu Sheets tablosunda tutulur.",
      "İşlevsel (zorunlu): Yaş alanı 18-65 için sınır değerler ve geçersiz sınıflar tablo olarak çıkarılır.",
      "İşlevsel (zorunlu): the-internet.herokuapp.com'da keşif testi yapılıp 2 hata raporu yazılır, biri İngilizcedir.",
      "İşlevsel (zorunlu): Senaryolar çalıştırılıp sonuç sütunu doldurulur ve bulgular Trello'da karta dönüşür.",
      "İşlevsel (zorunlu): 1 sayfalık test özet raporu ve 2 dakikalık prova yapılır.",
      "İşlevsel (isteğe bağlı): Aynı senaryoları başka bir demo sitede tekrar edip karşılaştırılır.",
      "İşlevsel olmayan: Tüm testler yalnız demo test sitelerinde yapılır; gerçek hesap veya gerçek kullanıcı verisi kullanılmaz."
    ],
    kabul: [
      "K1: 8 senaryonun her birinde adım, beklenen sonuç ve gerçek sonuç alanı doludur | Test: Tabloyu aç ve her satırı, sitede yeniden çalıştırarak sonuçla eşleştir.",
      "K2: Sınır tablosu 17, 18, 19, 64, 65, 66 değerlerini ve harf, boş, negatif girişleri içerir | Test: Her değerin beklenen sonucunu 'kabul/red' olarak yaz ve kuralla kendin karşılaştır.",
      "K3: Hata raporunda başlık, adımlar, beklenen ve gerçek sonuç, ortam ve ekran görüntüsü vardır | Test: Raporu bir arkadaşına ver ve adımları izleyip hatayı yeniden üretebildiğini doğrula.",
      "K4: İngilizce raporun adımları tek eylemlik cümlelerdir ve 'Expected' ile 'Actual' ayrıdır | Test: Raporu yüksek sesle oku; her adım tek eylem mi, say.",
      "K5: Trello panosunda her bulgu kartı bir durum listesindedir ve en az 1 kart durum değiştirmiştir | Test: Panoyu aç ve kartların geçmişinde durum değişimini gör.",
      "K6: Özet raporda koşulan, geçen ve kalan sayıları tablodaki sayılarla uyuşur | Test: Tablodaki geçen ve kalan hücreleri say ve rapordaki sayılarla karşılaştır."
    ],
    rubrik: [
      { olcut: "Senaryo çeşitliliği", guclu: "8 senaryo olumlu, olumsuz, boş ve kilitli kullanıcı gibi farklı sınıfları kapsar.", zayif: "8 senaryo aynı durumun küçük varyasyonlarıdır." },
      { olcut: "Sınır değer ve sınıf düşüncesi", guclu: "Sınırın iki yanı ve geçersiz sınıflar birlikte, beklenen sonuçla verilmiştir.", zayif: "Yalnız geçerli birkaç değer listelenmiştir." },
      { olcut: "Hata raporunun yeniden üretilebilirliği", guclu: "Başka biri raporu izleyerek hatayı aynen görür.", zayif: "Rapor 'çalışmıyor' gibi belirsiz bir cümledir." },
      { olcut: "Test takibi", guclu: "Sonuç sütunu, Trello kartları ve durum güncellemeleri birbirine bağlıdır.", zayif: "Sonuçlar tabloya yazılmamış veya kartlar açılmamıştır." },
      { olcut: "Test özeti ve sunum", guclu: "Rapor sayıları tabloyla tutarlıdır ve prova İngilizce 'we ran ... and found ...' kalıbını kullanır.", zayif: "Özet sayısız ve genel cümlelerden oluşur." }
    ],
    savunma: [
      "Neden WhatsApp örneğindeki 5 hatadan birini en riskli saydın ve bu seçimi hangi kullanıcı etkisi belirledi?",
      "Yaş alanında 17 ve 66'yı test etmeseydin hangi tür hatayı gözden kaçırabilirdin?",
      "Keşif testinde bulduğun hatanın senaryo tablosunda karşılığı yoksa bu ne anlama gelir ve tabloyu nasıl güncellersin?",
      "Test özet raporunda 'geçti' yazan bir senaryoyu yeniden çalıştırınca başarısız olursa hangi bilgiyi raporunda güncellersin?"
    ],
    yetkinlikler: [
      { ad: "Risk düşüncesi", kanit: "Adım 1'in 5 hata ve 1 risk seçimi, adım 2'nin piramit çizimi." },
      { ad: "Test tasarımı", kanit: "Adım 3'ün 8 senaryolu tablosu ve adım 4'ün sınır değer tablosu." },
      { ad: "Hata raporlama", kanit: "Adım 5'in biri İngilizce 2 hata raporu." },
      { ad: "Test yürütme ve takip", kanit: "Adım 6'nın sonuçlu tablosu ve Trello panosu." },
      { ad: "Raporlama ve sunum", kanit: "Adım 7'nin 1 sayfalık test raporu ve prova." }
    ],
    telafi: "K1 tutmazsa → adım 3'e dön ve her senaryoya adım ile beklenen sonuç ekleyip yeniden çalıştır. K2 tutmazsa → adım 4'ü tekrar et ve sınırın iki yanını ayrı ayrı tabloya yaz. K3 tutmazsa → adım 5'e dön ve raporu başka birine yeniden ürettirerek düzelt. K5 veya K6 tutmazsa → adım 6 ve 7'yi tekrar et; sonuç sütununu doldur ve sayıları tabloyla eşitle.",
    sonraki: "K1-K6 tutar ve savunma sorularını cevaplayabilirsen qa2 (Playwright ile E2E) açılır; qa2 senaryolarının temeli K1 ve K2'dir, çünkü 8 senaryoyu otomatikleştireceksin. Tamamlama kanıt kaydı üretir; kanıt notuna tablo, raporlar ve pano bağlantını yaz."
  };

  K.tanim["qa2"] = {
    onkosul: [
      "qa1 (Manuel Test): saucedemo için yazdığın 8 senaryolu tablo ve hata raporu yazma alışkanlığı gerekir; adım 5 bu senaryoları otomatikleştirir.",
      "Python'da fonksiyon, liste ve sınıf mantığına başlangıç düzeyinde hakimiyet gerekir (adım 1 bunu pekiştirir).",
      "GitHub hesabı, Git ile commit ve push yapabilme gerekir."
    ],
    gereksinim: [
      "İşlevsel (zorunlu): Playwright (Python) ve pytest kurulu bir repo ile ilk giriş testi geçer.",
      "İşlevsel (zorunlu): Giriş testi role/text locator ile yazılır ve dynamic loading için bekleme testi istikrarlı çalışır.",
      "İşlevsel (zorunlu): qa1'in 8 senaryosu tek fonksiyonda parametreyle ve giriş fixture'ıyla otomatikleştirilir.",
      "İşlevsel (zorunlu): LoginPage ve InventoryPage Page Object'leriyle 15 teste ulaşılır.",
      "İşlevsel (zorunlu): Başarısız testte ekran görüntüsü ve trace alınır; GitHub Actions testleri koşturup raporu artefakt yükler.",
      "İşlevsel (isteğe bağlı): CheckoutPage nesnesi ve ek bir ödeme akışı testi eklenir.",
      "İşlevsel olmayan: Testler yalnız demo sitelerde ve test hesabıyla koşar; gizli bilgiler depoya konmaz ve testler birbirine bağımlı olmaz."
    ],
    kabul: [
      "K1: İlk test yerelde geçer ve çıktıda 1 passed görünür | Test: Terminalde pytest'i çalıştır ve geçen test sayısını kanıt notuna yaz.",
      "K2: Girişte role/text locator kullanılır ve dynamic loading testi sabit bekleme (sleep) içermez | Test: Kodda sleep ara, bulamadığını doğrula; testi 5 kez art arda çalıştır ve hepsi geçsin.",
      "K3: 8 parametreli senaryo tek fonksiyonda koşar ve her biri ayrı test olarak raporlanır | Test: pytest -v çıktısında 8 ayrı satır say.",
      "K4: Testlerin 15'i Page Object sınıflarını kullanır ve test dosyasında ham locator yoktur | Test: Test dosyalarında doğrudan locator dizgesi ara; sayı sıfır olmalı.",
      "K5: Bilerek bozduğun testin trace dosyasında başarısızlığın nedeni görülür ve nedeni yazılıdır | Test: Trace'i aç, hata anındaki adımı göster ve nedeni tek cümleyle yaz.",
      "K6: Actions çalışması yeşildir ve rapor artefaktı indirilebilir; README rozeti gerçek çalışmayı gösterir | Test: Actions sayfasında son çalışmanın yeşil olduğunu ve artefaktı gör."
    ],
    rubrik: [
      { olcut: "Locator dayanıklılığı", guclu: "Locator'lar kullanıcı görünür rol ve metne dayanır; sınıf adı gibi kırılgan seçici yoktur.", zayif: "Uzun CSS yolları ve sabit beklemeler kullanılmıştır." },
      { olcut: "Parametrik test tasarımı", guclu: "qa1 senaryoları veriyle ayrı test olur ve fixture tekrarı kaldırır.", zayif: "Aynı test 8 kez kopyalanmıştır." },
      { olcut: "Page Object ayrımı", guclu: "Locator ve eylemler sınıfta, doğrulamalar testte durur.", zayif: "Page Object sınıfı yalnız ad olarak vardır, testler yine ham koddur." },
      { olcut: "Hata tanılama", guclu: "Trace ve ekran görüntüsüyle bozuk testin kök nedeni kanıtlanmıştır.", zayif: "Hata 'bazen geçmiyor' diye geçiştirilmiştir." },
      { olcut: "CI'da tekrarlanabilirlik", guclu: "Workflow temiz ortamda kurup koşar, artefakt yükler ve README yönergesi vardır.", zayif: "Testler yalnız kendi makinende geçer." }
    ],
    savunma: [
      "Neden sabit bekleme yerine locator beklemesi kullandın ve sayfa yavaşlarsa hangisi daha az kırılır?",
      "Page Object kalıbı küçük bir 3 testlik projede gereksiz olabilir mi; hangi sayıdan sonra faydalı olur?",
      "Testi CI'da geçip yerelde geçmeyen ya da tersi bir durumla karşılaşsan ilk hangi 3 farkı kontrol edersin?",
      "Hangi qa1 senaryosunu otomatikleştirmemeyi seçerdin ve gerekçen nedir?"
    ],
    yetkinlikler: [
      { ad: "Python temeli", kanit: "Adım 1'in GitHub'daki 5 küçük script'i." },
      { ad: "Locator stratejisi", kanit: "Adım 2'nin 6 locator tanımı ve adım 4'ün istikrarlı çalışan 3 testi." },
      { ad: "Veri güdümlü test", kanit: "Adım 5'in 8 otomatik senaryosu ve giriş fixture'ı." },
      { ad: "Test mimarisi", kanit: "Adım 6'nın Page Object'li 15 testi." },
      { ad: "Hata tanılama ve CI", kanit: "Adım 7'nin trace dosyası ve adım 8'in yeşil Actions çalışması." }
    ],
    telafi: "K2 tutmazsa → adım 4'e dön ve sleep'leri locator beklemesiyle değiştirip testi 5 kez koştur. K3 tutmazsa → adım 5'i tekrar et ve senaryo verisini parametre listesine taşı. K4 tutmazsa → adım 6'yı tekrar et ve ham locator'ları sınıflara taşı. K5 tutmazsa → adım 7'ye dön, yeni bir test boz ve trace'i yeniden oku. K6 tutmazsa → adım 8'i tekrar et ve workflow'daki kurulum sırasını düzelt.",
    sonraki: "K1-K6 tutar ve savunma sorularını cevaplayabilirsen qa3 (Kalite Stratejisi) açılır; qa3 adım 7'deki pipeline için K6'nın kurduğu Actions bilgisi gerekir. Tamamlama kanıt kaydı üretir; kanıt notuna repo bağlantını ve Actions çalışmasını yaz."
  };

  K.tanim["qa3"] = {
    onkosul: [
      "qa2 (Otomasyon: Playwright ile E2E): pytest, fixture ve GitHub Actions workflow'u yazmış olman gerekir.",
      "qa1 (Manuel Test): risk ve sınır değer düşüncesi gerekir; adım 6'daki strateji buna dayanır.",
      "Temel SQL (SELECT, WHERE) kavramı ve JSON ile HTTP istek-cevap yapısına aşinalık gerekir."
    ],
    gereksinim: [
      "İşlevsel (zorunlu): SQLite'ta 2 tablolu veritabanı ve 10 sorguluk doğrulama dosyası hazırlanır.",
      "İşlevsel (zorunlu): Postman'da 8 isteklik koleksiyon ve pytest + requests ile 6 olumlu, 6 olumsuz API testi yazılır.",
      "İşlevsel (zorunlu): En az 1 test taklit servisle (responses) dış bağımlılıktan kurtarılır ve fixture veriyi temizler.",
      "İşlevsel (zorunlu): k6 ile 20 sanal kullanıcı, 30 saniyelik yük testi yalnız izinli hedefe yapılır ve 5 cümleyle yorumlanır.",
      "İşlevsel (zorunlu): 10 özellikli risk bazlı strateji ve 3 aşamalı CI kalite kapısı kurulur.",
      "İşlevsel (isteğe bağlı): Pipeline'a coverage veya kalite metriği eklenir.",
      "İşlevsel olmayan: Yük testi yalnız kendi API'ne veya yük testine izin veren demo siteye yapılır; sahte API verisi kalıcı sayılmaz."
    ],
    kabul: [
      "K1: 10 SQL sorgusu JOIN, COUNT ve tekrar eden kayıt bulmayı kapsar ve beklenen sonuç satırıyla yazılıdır | Test: Sorguları SQLite'ta çalıştır ve elle bildiğin satır sayısıyla karşılaştır.",
      "K2: Postman koleksiyonunda hatalı veri ve yetkisiz istek senaryosu vardır ve beklenen durum kodları yazılıdır | Test: Koleksiyonu çalıştır ve her isteğin gerçek kodunu beklenenle karşılaştır.",
      "K3: pytest paketinde 12 test (6 olumlu, 6 olumsuz) geçer ve en az 1 JSON şema doğrulaması vardır | Test: pytest -v çıktısında 12 test say ve olumsuzların gerçekten hata durumunu denediğini kontrol et.",
      "K4: Taklitli test ağ bağlantısı kapalıyken de geçer ve temizlik fixture'ı testten sonra veriyi siler | Test: İnterneti kapatıp testi çalıştır; sonra veri tablosunu kontrol et.",
      "K5: k6 çıktısında p95 süresi ve hata oranı yorumda sayısal olarak anılır | Test: Çıktıdaki iki değeri yorumunla karşılaştır; yorumda geçmeyen sayı varsa ekle.",
      "K6: Stratejide 10 özelliğin her birinde risk puanı, test türü ve otomasyon kararı vardır ve pipeline'ın bir aşaması başarısızsa merge engellenir | Test: Bilerek bir testi boz, pull request'in bloklandığını gör."
    ],
    rubrik: [
      { olcut: "Veri doğrulama derinliği", guclu: "Sorgular JOIN ve kopya kayıt gibi gerçek veri hatalarını yakalar.", zayif: "Sorgular yalnız SELECT * çeşitlemesidir." },
      { olcut: "API test kapsamı", guclu: "Olumsuz testler yetki, hatalı gövde ve sınır değer gibi ayrı hata sınıflarını denetler.", zayif: "Olumsuz testler aynı hatanın tekrarıdır." },
      { olcut: "Test izolasyonu", guclu: "Taklit ve temizlik fixture'ı testi dış servisten bağımsız ve tekrarlanabilir yapar.", zayif: "Test başka testin bıraktığı veriye bağımlıdır." },
      { olcut: "Performans yorumunun dürüstlüğü", guclu: "Yorum sayıya dayanır ve ortamın sınırını söyler (demo site, tek makine).", zayif: "Yorum 'hızlı çalıştı' gibi sayısızdır." },
      { olcut: "Strateji ve kalite kapısı", guclu: "Risk puanı test türü ve otomasyon kararına gerekçeli bağlanır; pipeline merge'i gerçekten engeller.", zayif: "Strateji genel test türü listesidir ve pipeline'da engelleme yoktur." }
    ],
    savunma: [
      "Hangi özelliklere neden elle test, hangilerine otomasyon dedin; risk puanın bu kararı nasıl belirledi?",
      "Taklit servis kullanmak testi hızlandırırken hangi hatayı gizleyebilir ve bunu hangi başka testle dengelersin?",
      "k6 sonucunda p95 süresi iki katına çıksa bunu hata mı kabul edersin; hangi ek bilgi seni karar vermeye iter?",
      "Tam test setini PR'da değil zamanlanmış koşturmanın bedeli nedir?"
    ],
    yetkinlikler: [
      { ad: "Veri doğrulama", kanit: "Adım 1'in 10 sorgu dosyası." },
      { ad: "API testi", kanit: "Adım 2'nin Postman koleksiyonu ve adım 3'ün 12 testli paketi." },
      { ad: "Test izolasyonu", kanit: "Adım 4'ün taklitli testi ve temizlik fixture'ı." },
      { ad: "Performans testi", kanit: "Adım 5'in k6 çıktısı ve 5 cümlelik yorumu." },
      { ad: "Kalite stratejisi ve CI", kanit: "Adım 6'nın risk tablolu stratejisi ve adım 7'nin pipeline yaml dosyası." }
    ],
    telafi: "K3 tutmazsa → adım 3'e dön ve olumsuz testleri yeniden tasarla; her birinin farklı hata sınıfını denemesini sağla. K4 tutmazsa → adım 4'ü tekrar et ve dış çağrıyı taklitle değiştirip fixture'ı yeniden yaz. K5 tutmazsa → adım 5'i tekrar et, k6'yı yeniden koştur ve yorumu sayılarla yeniden yaz. K6 tutmazsa → adım 6 ve 7'ye dön; riskleri yeniden puanla ve branch korumasını yeniden ayarla.",
    sonraki: "K1-K6 tutar ve savunma sorularını cevaplayabilirsen qa4 (Kapston: Uçtan Uca Test Süreci) açılır; kapston için özellikle K6'nın risk ve strateji yapısı gerekir. Tamamlama kanıt kaydı üretir; kanıt notuna repo ve strateji dokümanını yaz."
  };

  K.tanim["qa4"] = {
    onkosul: [
      "qa3 (Kalite Stratejisi): risk bazlı strateji, API testi ve CI kalite kapısı deneyimi gerekir.",
      "qa2 (Playwright ile E2E): Playwright (Python) ve pytest ile yazdığın otomasyon deneyimi gerekir; kapstonda aynı aracı Python ile kullanırsın.",
      "Bilgisayarında Docker çalıştırabilmen ve Git/GitHub kullanabilmen gerekir."
    ],
    gereksinim: [
      "İşlevsel (zorunlu): Juice Shop yalnız kendi bilgisayarında çalıştırılır ve test ilkeleri uygulamayla bağlanır.",
      "İşlevsel (zorunlu): 8 gereksinim için izlenebilirlik matrisi, statik inceleme raporu ve test türleri tablosu hazırlanır.",
      "İşlevsel (zorunlu): Eşdeğerlik bölümleme, sınır değer, karar tablosu ve durum geçişi ile türetilmiş testler yazılır; iki keşif oturumu yapılır.",
      "İşlevsel (zorunlu): Risk tabanlı test planı, tahmin, 6 kusur raporu ve test özet raporu üretilir.",
      "İşlevsel (zorunlu): En yüksek riskli 8 senaryo Playwright ile otomatikleştirilir ve GitHub Actions'ta yeşil koşar.",
      "İşlevsel (isteğe bağlı): Otomasyon setine ek senaryo ve fayda/risk notuna ek araç karşılaştırması eklenir.",
      "İşlevsel olmayan: Uygulama internete açılmaz; sürüm etiketi ve ortam bilgisi her raporda yazılıdır."
    ],
    kabul: [
      "K1: Çalışan Juice Shop görüntüsü ve yedi ilkenin her biri uygulamadan bir örnekle README'dedir | Test: README'yi aç, 7 ilke ve 7 örnek say.",
      "K2: 8 test temeli maddesi R1-R8 olarak numaralı ve izlenebilirlik matrisinde her satırın en az bir testi vardır | Test: Matriste testsiz satır sayısı sıfır olmalı.",
      "K3: EP/BVA ve karar tablosundan türetilen testlerin her biri beklenen sonuçla ve ilgili gereksinim numarasıyla yazılıdır | Test: Her test için R# etiketini matriste ara.",
      "K4: Test planında 8 gereksinim risk seviyesine göre sıralıdır ve yürütme sırası bu sıraya uyar | Test: Plan sırasını yürütme kaydıyla karşılaştır.",
      "K5: 6 kusur raporunda adım, beklenen, gerçek, önem ve öncelik alanı doludur ve her biri matristeki bir teste bağlıdır | Test: Raporu başkasına ver, kusuru yeniden üretebildiğini doğrula.",
      "K6: Actions'ta 8 otomatik senaryo yeşil koşar ve test özet raporundaki sayılar kayıtlarla uyuşur | Test: Actions çıktısındaki geçen sayısını rapordaki sayıyla karşılaştır."
    ],
    rubrik: [
      { olcut: "Test temeli ve izlenebilirlik", guclu: "R1-R8 gereksinimlerinden testlere ve kusurlara çift yönlü izlenebilirlik vardır.", zayif: "Matris vardır ama boş veya güncel değildir." },
      { olcut: "Test tekniği seçimi", guclu: "Her teknik uygun alana uygulanmış ve neden bu tekniğin seçildiği yazılmıştır.", zayif: "Teknikler tanım olarak kopyalanmıştır, uygulamaya bağlanmamıştır." },
      { olcut: "Risk tabanlı plan", guclu: "Olasılık × etki puanı sıralama ve otomasyon kararını belirler.", zayif: "Risk tablosu vardır ama planı hiç etkilememiştir." },
      { olcut: "Kusur raporu kalitesi", guclu: "Rapor yeniden üretilebilir, önem ve öncelik ayrımı gerekçelidir.", zayif: "Rapor tek cümledir ve adımları yoktur." },
      { olcut: "Otomasyon ve özet rapor", guclu: "Otomasyon, en riskli senaryoları seçer; özet rapor çıkış ölçütüyle sonuçları karşılaştırır.", zayif: "Otomasyon rastgele seçilmiş ve özet rapor sayısızdır." }
    ],
    savunma: [
      "Hangi 8 senaryoyu otomatikleştirmeyi seçtin ve elle bıraktığın bir senaryoyu hangi gerekçeyle savunursun?",
      "Hata, kusur ve başarısızlık ayrımını kendi kayıtlarından birinde nasıl gösterirsin?",
      "Çevik ve şelale modelinde izlenebilirlik matrisi neden farklı sıklıkla güncellenir?",
      "Otomasyonun riski olarak neyi yazdın ve bunu azaltmak için hangi önlemi ekledin?"
    ],
    yetkinlikler: [
      { ad: "Test süreci ve izlenebilirlik", kanit: "Adım 3'ün gereksinim listesi ve izlenebilirlik matrisi, adım 11'in doldurulmuş hali." },
      { ad: "Statik test", kanit: "Adım 6'nın gereksinim inceleme raporu ve düzeltilmiş gereksinimler." },
      { ad: "Test tasarım teknikleri", kanit: "Adım 7'nin ep-bva.xlsx dosyası, adım 8'in karar tablosu ve durum diyagramı." },
      { ad: "Risk ve yönetim", kanit: "Adım 10'un test planı ve adım 11'in tahmin tablosu ile 6 kusur raporu." },
      { ad: "Test otomasyonu ve raporlama", kanit: "Adım 12'nin yeşil CI çalışması ve adım 13'ün test özet raporu." }
    ],
    telafi: "K2 tutmazsa → adım 3'e dön ve test temelini yeniden numaralandırıp matrise testleri ekle. K3 tutmazsa → adım 7 ve 8'i tekrar et; teknikleri alana yeniden uygula. K4 tutmazsa → adım 10'a dön ve riskleri yeniden puanlayıp yürütme sırasını güncelle. K5 tutmazsa → adım 11'deki kusur raporlarını başka birine yeniden ürettirerek düzelt. K6 tutmazsa → adım 12 ve 13'ü tekrar et, workflow'u düzeltip rapor sayılarını yeniden eşle.",
    sonraki: "K1-K6'nın tümü tutar ve savunma sorularını sözlü anlatabilirsen bu yolun kapstonu tamamlanmış sayılır; yeni bir kademe açılmaz, portfolyo reposu hazırdır. Bağlı olduğu ISTQB Certified Tester Foundation Level için adım 14'teki hedef tablosu yalnız çalışma aracıdır; sınav hazırlığı garantisi değildir. Tamamlama kanıt kaydı üretir."
  };

  K.tanim["bk1"] = {
    onkosul: [
      "Önkoşul yok: Backend yolunun giriş projesidir; yalnız bilgisayarda program kurup terminal açabilme düzeyi varsayılır.",
      "Kod yazmış olman gerekmez; ancak her adımda küçük bir şeyi çalıştırıp hata mesajını okumaya hazır olman gerekir."
    ],
    gereksinim: [
      "İşlevsel (zorunlu): Konsol uygulaması menüden görev ekler, listeler ve tamamlar.",
      "İşlevsel (zorunlu): Sayı olmayan girişte program çökmez ve geçersiz girişte tekrar sorar.",
      "İşlevsel (zorunlu): Görevler tasks.json dosyasında kalıcıdır; dosya yok veya bozuksa uygulama boş listeyle açılır.",
      "İşlevsel (zorunlu): LINQ ile tamamlanmamışlar tarihe göre listelenir ve servis için 5 xUnit testi geçer.",
      "İşlevsel (zorunlu): README ve .gitignore ile repo GitHub'a gönderilir.",
      "İşlevsel (isteğe bağlı): Görevlere öncelik veya son tarih alanı eklenir.",
      "İşlevsel olmayan: Kod sınıf ve metotlara bölünmüştür; metotlar tek iş yapar ve isimleri amaçlarını anlatır."
    ],
    kabul: [
      "K1: Menü 1, 2, 3 seçimleriyle ilgili metodu çağırır ve harf girilince çökmez | Test: Menüye 'abc' ve boş giriş ver; program yeniden sormalı.",
      "K2: TaskItem sınıfı Id, Başlık, Tamamlandı ve oluşturma tarihi alanlarını taşır ve ekle/tamamla/sil çalışır | Test: Bir görev ekle, tamamla, sil ve her adımda listeyi yazdır.",
      "K3: Uygulama kapatılıp açılınca görevler tasks.json'dan gelir | Test: 2 görev ekle, kapat, yeniden aç ve listede 2 görevi gör.",
      "K4: tasks.json'u bozunca (süslü parantezi sil) uygulama çökmez ve boş listeyle açılır | Test: Dosyayı elle boz ve uygulamayı başlat.",
      "K5: 5 xUnit testi (ekle, tamamla, sil, boş başlık hatası, sıralama) geçer | Test: dotnet test çalıştır ve 5 passed görünsün.",
      "K6: README'deki kurulum adımlarını sıfır klondan izleyince uygulama çalışır | Test: Repoyu yeni bir klasöre klonla ve README'yi aynen uygula."
    ],
    rubrik: [
      { olcut: "Akış çiziminin anlamlılığı", guclu: "6 adımlık akış kim, ne gönderiyor ve nerede saklanıyor sorularının üçünü de yanıtlar.", zayif: "Akış kutuları 'kullanıcı' ve 'sunucu'dan ibarettir." },
      { olcut: "Girdi doğrulama ve hata dayanıklılığı", guclu: "Geçersiz giriş ve bozuk dosya senaryoları denenmiş ve program çökmemiştir.", zayif: "Yalnız doğru girişle çalışır." },
      { olcut: "Sınıf tasarımı", guclu: "TaskItem alanları amaca uygun ve iş mantığı servis metotlarındadır.", zayif: "Her şey Main içinde yazılmıştır." },
      { olcut: "Kalıcılık", guclu: "Veri JSON'da durur ve hatalı dosyada kontrollü davranılır.", zayif: "Veri yalnız bellektedir ve kapanınca kaybolur." },
      { olcut: "Test ve teslim", guclu: "5 test farklı davranışları ölçer ve repo temiz klonda çalışır.", zayif: "Testler aynı davranışın kopyasıdır veya README eksiktir." }
    ],
    savunma: [
      "Görevleri neden bellekte tutmak yerine JSON dosyasına kaydettin ve bu seçimin sınırı nedir (aynı anda iki kullanıcı)?",
      "Mantığı Main içinde değil servis sınıfında yazmak testini nasıl değiştirdi?",
      "Bozuk dosyada boş listeyle başlamak veriyi sessizce kaybettirebilir; bunu nasıl daha güvenli yaparsın?",
      "Bu uygulamayı web API'sine dönüştürsen hangi bölümleri aynen taşırdın, hangilerini değiştirirdin?"
    ],
    yetkinlikler: [
      { ad: "Backend akışını anlatma", kanit: "Adım 1'in 6 adımlık akış çizimi." },
      { ad: "Sürüm kontrolü ve ortam", kanit: "Adım 2'deki GitHub'da ilk commit." },
      { ad: "C# temelleri ve OOP", kanit: "Adım 3'ün çalışan menüsü ve adım 4'ün sınıflı uygulaması." },
      { ad: "Veri kalıcılığı", kanit: "Adım 5'te yeniden açınca duran veri." },
      { ad: "Birim testi ve teslim", kanit: "Adım 6'nın 5 geçen testi ve adım 7'nin repo ile İngilizce özeti." }
    ],
    telafi: "K1 tutmazsa → adım 3'e dön ve girdi doğrulamayı yeniden yaz. K2 tutmazsa → adım 4'e dön ve TaskItem alanlarıyla ekle/tamamla/sil metotlarını yeniden yaz. K3 veya K4 tutmazsa → adım 5'i tekrar et; kaydet ve oku metotlarına try/catch ekleyip bozuk dosyayı yeniden dene. K5 tutmazsa → adım 6'ya dön ve her teste farklı bir davranış ata.",
    sonraki: "K1-K6 tutar ve savunma sorularını cevaplayabilirsen bk2 (REST API) açılır; bk2'nin temeli K2 (sınıflar) ve K5 (testler) olduğundan bunlar tutmadan geçme. Tamamlama kanıt kaydı üretir; kanıt notuna repo bağlantını ve İngilizce özetini yaz."
  };

  K.tanim["bk2"] = {
    onkosul: [
      "bk1 (Konsol Görev Yöneticisi): C# sınıfları, JSON kalıcılığı, xUnit ve GitHub kullanımı gerekir.",
      "HTTP'de istek-cevap, durum kodu ve JSON gövde kavramına temel düzeyde aşinalık gerekir; adım 1 bunu pekiştirir.",
      "Postman veya Swagger arayüzünden istek gönderebilmen gerekir."
    ],
    gereksinim: [
      "İşlevsel (zorunlu): 8 uçlu API taslağı hazırlanır ve /health ucu Swagger'da çalışır.",
      "İşlevsel (zorunlu): Ticket modeli DTO ve DataAnnotations doğrulamasıyla 400 hatası döndürür.",
      "İşlevsel (zorunlu): EF Core ve SQLite ile Ticket-Comment ilişkisi ve migration uygulanır.",
      "İşlevsel (zorunlu): Ticket için filtreli GET listesi, GET id, POST, PUT ve DELETE doğru durum kodlarıyla döner.",
      "İşlevsel (zorunlu): TicketService ve repository katmanları DI ile bağlanır ve WebApplicationFactory ile 8 entegrasyon testi geçer.",
      "İşlevsel (isteğe bağlı): Sayfalama ve sıralama parametreleri eklenir.",
      "İşlevsel olmayan: README'de uç nokta tablosu vardır ve Actions yeşildir; bağlantı dizesi ve gizli bilgiler depoya konmaz."
    ],
    kabul: [
      "K1: /health ucu Swagger'dan 200 döner | Test: Swagger'da /health'i çalıştır ve durum kodunu gör.",
      "K2: Boş başlıkla POST 400 ve ayrıntılı hata döner | Test: Swagger'dan boş başlıklı Ticket gönder ve cevap gövdesinde alan adını gör.",
      "K3: Migration dosyası depodadır ve veritabanında Ticket ile Comment tabloları vardır | Test: SQLite aracıyla dosyayı aç ve tabloları say.",
      "K4: 5 uç doğru kodları verir (201, 200, 204, 404 gibi) ve durum filtresi sonucu daraltır | Test: Swagger'dan her ucu çalıştırıp kodları tabloya yaz.",
      "K5: Servis ve repository arayüzlerle ayrıdır ve controller veritabanını doğrudan kullanmaz | Test: Controller dosyasında DbContext geçip geçmediğini ara; geçmemeli.",
      "K6: 8 entegrasyon testi geçer ve CI'daki build + test işi yeşildir | Test: dotnet test çıktısında 8 passed ve Actions sayfasında yeşil çalışmayı gör."
    ],
    rubrik: [
      { olcut: "REST uç tasarımı", guclu: "Kaynak adları çoğul isimdir, fiiller doğru kullanılmıştır ve 8 uç tutarlıdır.", zayif: "Uç adları eylem adıdır (getTicket gibi) ve fiiller karışıktır." },
      { olcut: "Doğrulama ve hata cevapları", guclu: "400, 404 gibi kodlar doğru yerde döner ve cevap gövdesi alanı gösterir.", zayif: "Her hata 500 veya 200 döner." },
      { olcut: "Veri modeli ve migration", guclu: "İlişki doğru kurulmuş, migration depodadır ve model-DTO ayrımı vardır.", zayif: "Modeller doğrudan dışarı verilir, migration yoktur." },
      { olcut: "Katmanlama ve DI", guclu: "İş mantığı serviste, veri erişimi repository'dedir ve arayüz bağımlılığı vardır.", zayif: "Tüm kod controller içindedir." },
      { olcut: "Test ve CI kanıtı", guclu: "Testler başarı ve hata yollarını kapsar; Actions her push'ta koşar.", zayif: "Yalnız başarı yolu test edilir ve CI yoktur." }
    ],
    savunma: [
      "Neden modeli doğrudan değil DTO ile dışarı veriyorsun ve DTO olmasaydı hangi sorun çıkardı?",
      "PUT yerine PATCH kullansaydın uçların davranışı nasıl değişirdi?",
      "SQLite bu proje için uygunken hangi koşulda başka veritabanına geçerdin?",
      "Entegrasyon testi ile birim testi arasında bu projede neyi hangisiyle sınadın ve neden?"
    ],
    yetkinlikler: [
      { ad: "REST tasarımı", kanit: "Adım 1'in 8 adreslik API taslağı ve adım 5'in 5 ucu ile doğru durum kodları." },
      { ad: "Doğrulama", kanit: "Adım 3'ün DTO'lu modeli ve 400 hatası denemesi." },
      { ad: "Veri erişimi", kanit: "Adım 4'ün migration dosyası ve oluşan veritabanı." },
      { ad: "Katmanlı mimari", kanit: "Adım 6'nın TicketService ve repository'li proje yapısı." },
      { ad: "Entegrasyon testi ve CI", kanit: "Adım 7'nin 8 geçen testi ve adım 8'in yeşil Actions çalışması." }
    ],
    telafi: "K2 tutmazsa → adım 3'e dön ve DataAnnotations kurallarını yeniden ekleyip 400 testini tekrar et. K3 tutmazsa → adım 4'ü tekrar et; migration'ı silip yeniden üret ve uygula. K4 tutmazsa → adım 5'i tekrar et ve her ucun durum kodunu Swagger'da yeniden doğrula. K5 tutmazsa → adım 6'ya dön ve controller'daki veri erişimini repository'ye taşı. K6 tutmazsa → adım 7 ve 8'i tekrar et ve test kapsamını genişlet.",
    sonraki: "K1-K6 tutar ve savunma sorularını cevaplayabilirsen bk3 (Üretim Seviyesi Servis) açılır; bk3 için K5 (katmanlar) ve K6 (testler) şarttır. Tamamlama kanıt kaydı üretir; kanıt notuna repo bağlantını ve Actions çalışmasını yaz."
  };

  K.tanim["bk3"] = {
    onkosul: [
      "bk2 (REST API: ASP.NET Core ve EF Core): CRUD API, DI, EF Core migration ve entegrasyon testi deneyimi gerekir; bk3 Ticket modelini genişletir.",
      "Komut satırında Docker'ı çalıştırabilmen ve bir Compose dosyasını okuyabilmen gerekir.",
      "HTTP başlıkları, token ve rol kavramına temel aşinalık gerekir."
    ],
    gereksinim: [
      "İşlevsel (zorunlu): ERD, katman diyagramı ve 10 gereksinim yazılır; PostgreSQL docker compose ile çalışır ve migration uygulanır.",
      "İşlevsel (zorunlu): Kayıt ve giriş uçları JWT üretir; Admin, Agent, User rolleriyle yalnız Agent ticket kapatabilir.",
      "İşlevsel (zorunlu): Global exception middleware ProblemDetails döner ve Serilog JSON loglarında correlation id bulunur.",
      "İşlevsel (zorunlu): Sayfalama, AsNoTracking, önbellek ve rate limit uygulanır; k6 önce/sonra sonuçları kaydedilir.",
      "İşlevsel (zorunlu): Birim ve Testcontainers entegrasyon testleri ile coverage raporu üretilir; multi-stage Docker imajı pipeline'la yayınlanır.",
      "İşlevsel (isteğe bağlı): Ücretsiz katmanlı bir platformda canlı adres ve kısa demo videosu eklenir.",
      "İşlevsel olmayan: Gizli anahtarlar ortam değişkenindedir ve depoda yoktur; log'larda parola veya token görünmez."
    ],
    kabul: [
      "K1: ERD'deki dört varlık ve 10 gereksinim README'dedir ve gereksinimler ölçülebilirdir | Test: Gereksinim listesini say ve her birinin 'doğrulanabilir mi' sorusuna evet de.",
      "K2: Compose ile PostgreSQL ayağa kalkar, migration uygulanır ve en çok sorgulanan alanda index vardır | Test: docker compose up çalıştırıp bir tabloya sorgu at ve index'i veritabanında göster.",
      "K3: Token'sız istek 401, User rolüyle kapatma 403, Agent rolüyle kapatma 200 döner | Test: Üç rol ile aynı ucu çağır ve kodları tabloya yaz.",
      "K4: Bilerek üretilen hata ProblemDetails döner ve aynı correlation id log'da bulunur | Test: Cevaptaki id'yi log dosyasında ara.",
      "K5: k6 önce/sonra çıktısında bir ölçü (p95 veya hata oranı) iyileşmiş ya da değişmeme gerekçesi yazılıdır | Test: İki çıktıyı yan yana koy ve değeri karşılaştır.",
      "K6: Testler ve coverage raporu üretilir ve pipeline test başarısızlığında imajı yayınlamaz | Test: Bir testi boz, pipeline'ın yayını durdurduğunu gör."
    ],
    rubrik: [
      { olcut: "Mimari ve şema kararları", guclu: "ERD, indeks ve katman çizimi gereksinimlerle uyumludur ve seçimler gerekçelidir.", zayif: "Şema bk2'den kopyadır ve gereksinimlerle bağı yoktur." },
      { olcut: "Kimlik ve yetki", guclu: "Roller ayrı testlerle sınanmıştır; 401 ve 403 farkı bilinir.", zayif: "Yetki yalnız arayüzde saklanmıştır, sunucuda denetlenmez." },
      { olcut: "Gözlemlenebilirlik", guclu: "Hata cevabı, log ve correlation id ile bir istek baştan sona izlenir.", zayif: "Hatalar ham istisna olarak döner ve log'da iz yoktur." },
      { olcut: "Performans ve güvenlik kanıtı", guclu: "Önce/sonra ölçümü, sayfalama ve gizli bilgi taşıması birlikte gösterilir.", zayif: "Optimizasyon ölçümsüz yapılmıştır." },
      { olcut: "Test ve teslim", guclu: "Test piramidi dengelidir ve pipeline yalnız geçen kodu yayınlar.", zayif: "Yalnız birim test vardır veya pipeline test sonucuna bağlı değildir." }
    ],
    savunma: [
      "Neden gizli anahtarı kodda değil ortam değişkeninde tuttun ve CI'da bunu nasıl sağlıyorsun?",
      "Önbellek eklediğin ucun hangi durumda eski veri verme riski var ve bunu nasıl azaltırsın?",
      "Testcontainers yerine bellek içi veritabanı kullansaydın hangi hatayı yakalayamazdın?",
      "Tek bir Agent'ın tüm ticket'ları kapatabilmesi bir risk midir; yetki modelini nasıl daraltırsın?"
    ],
    yetkinlikler: [
      { ad: "Mimari ve veri tasarımı", kanit: "Adım 1'in ERD ve gereksinim listesi, adım 2'nin compose dosyası ve çalışan migration'ı." },
      { ad: "Kimlik ve yetkilendirme", kanit: "Adım 3'ün rollü 3 ucu ve testleri." },
      { ad: "Hata yönetimi ve gözlemlenebilirlik", kanit: "Adım 4'ün standart hata cevabı ve log örneği." },
      { ad: "Performans ve güvenlik pekiştirme", kanit: "Adım 5'in önce/sonra k6 sonucu." },
      { ad: "Test ve dağıtım", kanit: "Adım 6'nın coverage raporu ve adım 7'nin pipeline'ı ile canlı adresi." }
    ],
    telafi: "K2 tutmazsa → adım 2'ye dön ve compose ile bağlantı dizesini yeniden kur, migration'ı tekrar uygula. K3 tutmazsa → adım 3'ü tekrar et; rol politikasını ve testlerini yeniden yaz. K4 tutmazsa → adım 4'e dön, middleware ve log şablonunu yeniden düzenleyip correlation id'yi yeniden doğrula. K5 tutmazsa → adım 5'i tekrar et; ölçümü aynı koşulda yeniden al. K6 tutmazsa → adım 6 ve 7'ye dön ve pipeline'ı test başarısızlığında durduracak şekilde düzelt.",
    sonraki: "K1-K6 tutar ve savunma sorularını cevaplayabilirsen bk4 (Kapston: Bulutta Sipariş Servisi) açılır; kapston için K3 (kimlik), K4 (log) ve K6 (pipeline) gerekir. Tamamlama kanıt kaydı üretir; kanıt notuna repo, pipeline ve STAR cevabını yaz."
  };

  K.tanim["bk4"] = {
    onkosul: [
      "bk3 (Üretim Seviyesi Servis): JWT, Docker, CI/CD, log ve test piramidi deneyimi gerekir.",
      "bk2 (REST API): C# ile API ve DTO yazma deneyimi gerekir; Lambda fonksiyonları bu mantığı taşır.",
      "Kendi AWS hesabını kurup bütçe sınırı koymayı kabul etmen gerekir; adım 1 bunu zorunlu kılar."
    ],
    gereksinim: [
      "İşlevsel (zorunlu): AWS hesabında bütçe alarmı, kök için MFA ve en az yetkili IAM kullanıcısı kurulur.",
      "İşlevsel (zorunlu): API Gateway, Lambda ve DynamoDB ile sipariş oluşturma ve okuma uçları SAM şablonuyla çalışır.",
      "İşlevsel (zorunlu): SQS + DLQ ile asenkron işleme ve SNS/EventBridge ile bildirim kurulur; DLQ'ya düşen mesaj yeniden işlenir.",
      "İşlevsel (zorunlu): Cognito authorizer, S3 ön imzalı URL, Parameter Store/Secrets Manager ve KMS ile servis güvenli hale getirilir.",
      "İşlevsel (zorunlu): GitHub Actions OIDC ile build, test ve SAM deploy yapar; sürüm ve alias ile geri alma denenir.",
      "İşlevsel (isteğe bağlı): X-Ray ve ek bir CloudWatch panosu eklenir.",
      "İşlevsel olmayan: Kaynaklar sonunda silinir ve bütçe ekranı 0 harcamayla kanıtlanır; kodda ve ekran görüntülerinde gizli bilgi bulunmaz."
    ],
    kabul: [
      "K1: Bütçe uyarısı, kök MFA ve get-caller-identity çıktısı docs/guvenlik-baslangic.md'de kanıtlıdır | Test: Üç kanıtı aç ve hesap numarası ile anahtarın karartıldığını kontrol et.",
      "K2: POST /orders 201, geçersiz JSON 400, olmayan sipariş 404 döner | Test: Postman'dan üç isteği at ve kodları docs/api.md tablosuyla karşılaştır.",
      "K3: Koşullu yazma tekrar eden kimliği reddeder ve erişim kalıbı tablosu anahtar tasarımına bağlanır | Test: Aynı kimlikle iki kez yaz ve ikinci yazmanın hata verdiğini gör.",
      "K4: Başarısız mesaj birkaç denemeden sonra DLQ'ya düşer ve redrive sonrası 'işlendi' kaydı oluşur | Test: Bilerek hatalı mesaj gönder, DLQ'da gör, düzeltip yeniden işlet.",
      "K5: Token'sız istek 401, başka kullanıcının siparişi reddedilir ve kodda gizli değer yoktur | Test: İki kullanıcıyla dene ve repoda anahtar benzeri dizgeyi ara.",
      "K6: Actions yeşildir, rollback olayı kanıtlıdır ve k6 önce/sonra ile idempotency testi sonuçları kayıtlıdır | Test: Aynı Idempotency-Key ile iki istek at, tek sipariş oluştuğunu gör ve temizlik sonrası boş kaynak listesini kontrol et."
    ],
    rubrik: [
      { olcut: "Hesap güvenliği ve maliyet kontrolü", guclu: "Bütçe, MFA ve en az yetki kanıtlıdır ve kaynaklar silinmiştir.", zayif: "Kök hesapla çalışılmıştır veya maliyet sınırı yoktur." },
      { olcut: "Mimari ve veri tasarımı", guclu: "Diyagram, API ve DynamoDB erişim kalıbı birbirine uyumludur ve seçimler gerekçelidir.", zayif: "Diyagram ile gerçek kaynaklar uyuşmaz." },
      { olcut: "Dayanıklılık ve asenkron akış", guclu: "DLQ, yeniden deneme ve idempotency birlikte gösterilmiş ve test edilmiştir.", zayif: "Yalnız mutlu yol çalışır." },
      { olcut: "Güvenlik tasarımı", guclu: "Cognito, her fonksiyon için en az yetkili rol ve KMS/gizli yönetimi tutarlıdır.", zayif: "Tüm fonksiyonlar geniş yetkili tek rolü paylaşır." },
      { olcut: "Dağıtım ve gözlemlenebilirlik", guclu: "CI/CD, alias ile geri alma, Logs Insights ve X-Ray ile sorun bulundu ve çözüldü.", zayif: "Dağıtım elle yapılmıştır ve hata ayıklama izi yoktur." }
    ],
    savunma: [
      "Sipariş akışında SQS'i araya koymak neyi çözdü ve hangi yeni karmaşıklığı getirdi?",
      "DLQ'ya düşen bir mesajı insan müdahalesiyle mi yoksa otomatik mi yeniden işletirdin; hangi risk seni karar vermeye iter?",
      "Bütün Lambdalara tek geniş IAM rolü verseydin saldırgan bir fonksiyonu ele geçirince ne olurdu?",
      "Tek tablolu DynamoDB tasarımının bu projedeki sınırı nedir; hangi sorgu yeni bir erişim kalıbı isterdi?"
    ],
    yetkinlikler: [
      { ad: "Bulut güvenliği ve maliyet", kanit: "Adım 1'in bütçe uyarısı, MFA ve get-caller-identity kanıtı ile adım 9 ve 10'un IAM izin tablosu ve KMS politikası." },
      { ad: "Serverless API", kanit: "Adım 3'ün CreateOrder kodu ve adım 4'ün çalışan uç noktaları ile API tablosu." },
      { ad: "Veri modelleme", kanit: "Adım 5'in erişim kalıbı tablosu ve koşullu yazma hata testi." },
      { ad: "Olay güdümlü mimari", kanit: "Adım 7'nin kuyruk akış şeması ve DLQ kanıtı ile adım 8'in bildirim e-postası." },
      { ad: "Dağıtım ve sorun giderme", kanit: "Adım 11'in yeşil Actions çalışması ve rollback kanıtı ile adım 12'nin Logs Insights sorgusu ve hata ayıklama notu." }
    ],
    telafi: "K1 tutmazsa → adım 1'e dön ve bütçe ile MFA'yı yeniden kur; ilerlemeden önce kanıtla. K3 tutmazsa → adım 5'i tekrar et ve erişim kalıplarını anahtar tasarımıyla yeniden eşle. K4 tutmazsa → adım 7'yi tekrar et; redrive politikasını yeniden kur ve DLQ testini yeniden yap. K5 tutmazsa → adım 9 ve 10'a dön ve izin tablosunu daralt, gizli değerleri yeniden taşı. K6 tutmazsa → adım 11 ve 13'ü tekrar et; alias, idempotency ve temizliği yeniden dene.",
    sonraki: "K1-K6'nın tümü tutar ve savunma sorularını sözlü anlatabilirsen bu yolun kapstonu tamamlanmış sayılır; yeni bir kademe açılmaz, portfolyo reposu hazırdır. Adım 14'teki alan bazlı tablo yalnız AWS Certified Developer – Associate için bir çalışma aracıdır; sınav hazırlığı garantisi değildir. Tamamlama kanıt kaydı üretir."
  };
})(window);

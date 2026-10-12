"use strict";
(function (g) {
  var K = g.PP_PROJ = g.PP_PROJ || { tanim: {}, yeni: [], va: [] };

  K.tanim["ba1"] = {
    onkosul: [
      "Önkoşul yok: bilgisayar kullanmayı bilmeden başlanır; yalnız çalışan bir Windows veya Mac bilgisayara ve bir tarayıcıya erişimin olması varsayılır.",
      "Bir parola veya PIN ile bilgisayarında oturum açabiliyor olman gerekir.",
      "Ekran görüntüsü alıp dosya olarak saklayabilecek kadar sabırlı olman yeterlidir."
    ],
    gereksinim: [
      "İşlevsel (zorunlu): Bilgisayarı açıp kapatır, fare ve klavyeyle bir metni yazıp kopyalayıp yapıştırırsın (adım 1-2).",
      "İşlevsel (zorunlu): Belgeler içinde Bilgisayar-Egitimi klasörünü açıp ilk-notum dosyasını kaydedersin (adım 4).",
      "İşlevsel (zorunlu): bilgisayar-rehberim dosyasını en az 5 başlıkla yazarsın (adım 9).",
      "İşlevsel (isteğe bağlı): Rehbere iki ekran görüntüsü ve kendi bulduğun bir klavye kısayolu eklersin.",
      "İşlevsel olmayan: Hiçbir ekran görüntüsünde parolan, PIN'in veya kişisel e-postan görünmez (adım 7).",
      "İşlevsel olmayan: Dosya ve klasör adları tutarlıdır ve rehber başkası tarafından okunabilir sadelikte yazılmıştır."
    ],
    kabul: [
      "K1: Klasörde ilk-notum dosyası ve ekran1.png bulunur | Test: Dosya Gezgini'ni aç, Bilgisayar-Egitimi içindeki iki dosyayı say ve ekran görüntüsünü kanıt notuna koy.",
      "K2: Not Defteri'nde adın iki kez görünür (kopyala-yapıştır) | Test: Yazıyı seçip Ctrl+C, Ctrl+V yap; adın iki kez göründüğü ekranı kaydet.",
      "K3: İnternet aramasında reklam satırını işaretlersin | Test: Arama sonucunun ekran görüntüsünde Reklam veya Sponsorlu yazan satırı çerçeveyle göster.",
      "K4: Hiçbir ekran görüntüsünde parola yoktur | Test: Tüm görüntüleri tek tek aç, parola veya PIN arayarak gözle tara ve notuna 'tarandı' yaz.",
      "K5: bilgisayar-rehberim belgesinde en az 5 başlık vardır | Test: Belgeyi aç, başlıkları say ve sayıyı kanıt notuna yaz."
    ],
    rubrik: [
      { olcut: "Dosya ve klasör düzeni", guclu: "Bilgisayar-Egitimi klasörü, ilk-notum ve ekran1.png yerli yerinde; adlar sade ve tutarlı.", zayif: "Dosyalar masaüstüne dağılmış veya kaydedilmemiş; klasör bulunamıyor." },
      { olcut: "Güvenli arama alışkanlığı", guclu: "Reklam satırı işaretli, adres ve kilit simgesi kontrol edilmiş, bilgi iki kaynaktan doğrulanmış.", zayif: "Reklam ile gerçek sonuç ayırt edilmemiş; kaynak kontrolü yok." },
      { olcut: "Gizlilik disiplini", guclu: "Hiçbir görüntüde parola veya kişisel bilgi yok; parola cümlesi hiçbir yere yazılmamış.", zayif: "Ekran görüntüsünde parola veya e-posta açıkta." },
      { olcut: "Kendi cümlelerinle rehber", guclu: "Beş başlığın her birinde kendi cümlelerinle 2-3 satır ve ilgili görüntü var.", zayif: "Başlıklar boş veya metin kopyalanmış; görüntü yok." }
    ],
    savunma: [
      "Bilgisayarı güç düğmesine uzun basarak kapatmak yerine Kapat menüsünü neden kullandın; yapmasaydın ne riskin olurdu?",
      "Bir sitenin kilit simgesi olması o sitenin güvenilir olduğunu kanıtlar mı; hangi sınırı var?",
      "Rehberini bir ay sonra başka birine verseydin hangi bölüm onu en çok yanıltırdı ve neden?"
    ],
    yetkinlikler: [
      { ad: "Temel bilgisayar kullanımı", kanit: "Adım 2'deki iki kez adın yazılı Not Defteri görüntüsü ve adım 3'teki küçültülmüş pencere görüntüsü." },
      { ad: "Dosya yönetimi", kanit: "Adım 4'teki klasör içi dosya görüntüsü ve adım 8'deki ekran1.png dosyası." },
      { ad: "Güvenli internet kullanımı", kanit: "Adım 6'daki reklam satırı işaretli arama görüntüsü ve adım 7'deki parolasız çıkış ekranı." },
      { ad: "Yazılı dokümantasyon", kanit: "Adım 9'daki 5 başlıklı bilgisayar-rehberim dosyası." }
    ],
    telafi: "K1 tutmazsa adım 4'e dön: klasörü ve ilk-notum dosyasını yeniden oluştur, adım 8'deki ekran1.png'yi aynı klasöre koy. K2 tutmazsa adım 2'yi tekrar et: Ctrl+C ve Ctrl+V'yi Not Defteri'nde yeniden dene. K3 tutmazsa adım 6'ya dön: yeni bir arama yapıp reklamı yeniden işaretle. K4 tutmazsa adım 7 ve 8'deki görüntüleri yeniden al.",
    sonraki: "K1-K5'in tamamı tutar ve savunma sorularını kendi cümlelerinle cevaplarsan ba2 (E-posta, Belge ve Kendi CV Taslağım) projesinin kilidi açılır; tamamlama bu kanıt notunu üretir, rozet vermez."
  };

  K.tanim["ba2"] = {
    onkosul: [
      "ba1 (Bilgisayarı Tanı: İlk Gün): dosya, klasör ve ekran görüntüsü işlemlerini bilmek gerekir.",
      "Bir tarayıcıda gezinip adres çubuğuna adres yazabilmelisin.",
      "Parola cümlesi üretme alışkanlığı (ba1 adım 7) önerilir."
    ],
    gereksinim: [
      "İşlevsel (zorunlu): Bir e-posta hesabı açar veya mevcut hesapla kendine konulu ve selamlı bir e-posta gönderirsin (adım 1-2).",
      "İşlevsel (zorunlu): Başlık, kalın yazı, liste ve 3 sütun 4 satırlık tablo içeren bir belge hazırlarsın (adım 3-5).",
      "İşlevsel (zorunlu): Belgelerim altında cv, e-posta ve egitim klasörlerini kurar, konu-ad-soyad-v1 kuralıyla adlandırırsın (adım 6).",
      "İşlevsel (zorunlu): Dört başlıklı bir CV taslağını PDF'e çevirip ek olarak gönderirsin (adım 7-8).",
      "İşlevsel (isteğe bağlı): CV'ye gerçek telefon ve adres eklersin; paylaşmak istemiyorsan boş bırakırsın.",
      "İşlevsel olmayan: CV bir sayfaya sığar ve yazım hatası içermez."
    ],
    kabul: [
      "K1: Gelen kutusunda kendi gönderdiğin e-posta görünür | Test: Gelen kutusunu aç, konunun 'Merhaba, ilk deneme e-postam' olduğunu gör ve ekran görüntüsünü kaydet.",
      "K2: Belgede Başlık 1 stili, kalın kelime, madde işaretli liste ve 3x4 tablo bulunur | Test: Belgeyi aç ve dört öğeyi tek tek say; ekran görüntüsünde göster.",
      "K3: Klasör ağacında cv, e-posta, egitim vardır ve en az bir dosya kurala uyar | Test: Dosya Gezgini ağacını aç, dosya adının konu-ad-soyad-v1 biçiminde olduğunu kontrol et.",
      "K4: CV'de Hakkımda, Eğitim, Beceriler, Projeler başlıkları vardır ve belge bir sayfadır | Test: CV'yi aç, dört başlığı say ve sayfa sayısına bak.",
      "K5: PDF dosyası açılır ve ek olarak ulaşır | Test: PDF'e çift tıkla; kendine gönderdiğin e-postada ataç simgesini gör."
    ],
    rubrik: [
      { olcut: "E-posta düzgünlüğü", guclu: "Konu satırı net, selam ve iki cümlelik gövde, kapanış ve ad var; alıcı doğru.", zayif: "Konu boş, selam ve imza yok; mesaj tek satır." },
      { olcut: "Belge biçimlendirme", guclu: "Başlık stili gerçekten uygulanmış, liste ve tablo düzgün ızgarada; boşluklar tutarlı.", zayif: "Başlık sadece büyük harfle yazılmış, tablo yok veya dağınık." },
      { olcut: "Dosya adlandırma düzeni", guclu: "Üç klasör ve kurala uyan adlar; aynı kural CV ve PDF'te de uygulanmış.", zayif: "Adlar Belge1, Yeni belge gibi; klasör yok." },
      { olcut: "CV taslağı içeriği", guclu: "Dört başlık dolu, Beceriler gerçekten öğrendiklerin, Projeler bölümünde ilk iki proje var.", zayif: "Başlıklar boş veya uydurma beceriler; iki sayfaya taşmış." },
      { olcut: "PDF teslimi", guclu: "PDF cv klasöründe, açılıyor ve ek olarak e-postayla gönderilmiş.", zayif: "Yalnız belge var; PDF üretilmemiş veya ek eklenmemiş." }
    ],
    savunma: [
      "Neden CV'yi Word dosyası yerine PDF olarak gönderiyorsun; PDF'in hangi sınırı var?",
      "Dosya adlandırma kuralını başka biçimde kurmuş olsaydın (örneğin tarih öne) ne kazanır ne kaybederdin?",
      "CV'de hangi bilgiyi bilerek yazmadın (telefon, adres) ve bu karar hangi riski azaltıyor?"
    ],
    yetkinlikler: [
      { ad: "Profesyonel e-posta yazımı", kanit: "Adım 2'deki kendine gönderilmiş, konulu ve imzalı e-postanın gelen kutusu görüntüsü." },
      { ad: "Belge biçimlendirme", kanit: "Adım 4'teki başlık ve liste görüntüsü ile adım 5'teki 3x4 tablo görüntüsü." },
      { ad: "Dosya organizasyonu", kanit: "Adım 6'daki klasör ağacı ve adlandırma örnekleri görüntüsü." },
      { ad: "CV hazırlama", kanit: "Adım 7'deki cv-ad-soyad-v1 belgesi ve adım 8'deki cv-ad-soyad-v1.pdf ile ekli e-posta." }
    ],
    telafi: "K1 tutmazsa adım 2'ye dön ve e-postayı konu, selam ve imzayla yeniden gönder. K2 tutmazsa adım 4 ve 5'i tekrar et; başlığı stil menüsünden uygula, tabloyu Ekle menüsünden yeniden kur. K3 tutmazsa adım 6'ya dön ve klasörleri ile dosya adlarını kurala göre yeniden düzenle. K4 tutmazsa adım 7'de eksik başlığı ekle ve belgeyi tek sayfaya sığdır. K5 tutmazsa adım 8'de PDF'i yeniden indir ve eki yeniden gönder.",
    sonraki: "K1-K5 tutarsa ve savunma sorularını cevaplarsan ba3 (GitHub'a İlk Adımım) projesinin kilidi açılır; CV PDF'in ba3 adım 9'da portföy bağlantısı için kullanılır. Tamamlama kanıt kaydı üretir, rozet vermez."
  };

  K.tanim["ba3"] = {
    onkosul: [
      "ba1 (Bilgisayarı Tanı: İlk Gün): dosya yükleme ve ekran görüntüsü alma işlemleri gerekir.",
      "ba2 (E-posta, Belge ve Kendi CV Taslağım): doğrulama e-postası için çalışan bir e-posta ve CV PDF'in gerekir.",
      "Önceki projelerden bilgisayar-rehberim dosyasının elinde olması gerekir (adım 6'da yüklenir)."
    ],
    gereksinim: [
      "İşlevsel (zorunlu): GitHub hesabı açar ve iki adımlı doğrulamayı (2FA) etkinleştirirsin (adım 2-3).",
      "İşlevsel (zorunlu): Public ilk-projem reposunu açar, başlıklı ve listeli bir README.md yazarsın (adım 4-5).",
      "İşlevsel (zorunlu): Web arayüzünden dosya yükler ve rehber/baslangic.md ile klasör oluşturursun (adım 6-7).",
      "İşlevsel (zorunlu): Kullanıcı adınla aynı adlı repoda profil README'sini yayınlarsın (adım 8).",
      "İşlevsel (isteğe bağlı): Repoya konu etiketleri (topics) ve kısa açıklama eklersin.",
      "İşlevsel olmayan: Hiçbir yüklenen dosyada kişisel bilgi, parola veya 2FA kurtarma kodu yoktur."
    ],
    kabul: [
      "K1: Hesabında 2FA etkin görünür | Test: Settings, Password and authentication sayfasını aç ve etkin durumunu ekran görüntüsüne al (kodlar görünmesin).",
      "K2: ilk-projem repo sayfasında README başlıklı ve 3 maddeli listeyle görünür | Test: Repo ana sayfasını aç, başlık ve madde sayısını say.",
      "K3: Repoda bilgisayar-rehberim dosyası ve rehber klasörü içinde baslangic.md bulunur | Test: Dosya listesini aç, iki öğeyi ekran görüntüsünde göster.",
      "K4: Profil sayfanda README görünür | Test: Your profile sayfasını aç, 'Merhaba, ben ...' yazısını gör.",
      "K5: Repo bağlantısı oturum açmadan açılır | Test: Gizli pencerede bağlantıyı yapıştır, sayfanın açıldığını ekran görüntüsüyle kaydet.",
      "K6: Yüklenen dosyalarda kişisel bilgi veya kurtarma kodu yoktur | Test: Her dosyayı aç ve parola, kod veya telefon numarası ara; sonucu kanıt notuna yaz."
    ],
    rubrik: [
      { olcut: "Hesap güvenliği", guclu: "2FA etkin, kurtarma kodları güvenli klasörde ve repoda yok.", zayif: "2FA kapalı veya kurtarma kodu repoya yüklenmiş." },
      { olcut: "README kalitesi", guclu: "Tek başlık, tanıtım cümlesi ve 'Neler öğrendim' altında 3 kendi cümlenle madde; önizleme kontrol edilmiş.", zayif: "README varsayılan haliyle kalmış veya başlıksız düz metin." },
      { olcut: "Repo düzeni", guclu: "Rehber dosyası ve rehber klasörü yerli yerinde, README klasöre bağlantı veriyor.", zayif: "Dosyalar ana dizinde karışık; klasör yok." },
      { olcut: "Profil vitrini", guclu: "Profil README'si kısa, kimlik sunan ve ilk-projem'e bağlantı veriyor.", zayif: "Profil README'si yok veya repo adı kullanıcı adından farklı." },
      { olcut: "Herkese açık erişim kanıtı", guclu: "Gizli pencerede açılan repo ve bağlantı CV'de duruyor.", zayif: "Repo gizli kalmış ya da bağlantı CV'ye eklenmemiş." }
    ],
    savunma: [
      "Neden repoyu Public yaptın; ne tür dosyalar asla Public bir repoya yüklenmemeli?",
      "2FA'yı açmasaydın hangi saldırı senaryosunda hesabın kaybolurdu ve kurtarma kodlarını neden saklıyorsun?",
      "Web arayüzü yerine komut satırıyla yüklemek sana ne kazandırırdı ve bu projede neden gerekmedi?"
    ],
    yetkinlikler: [
      { ad: "Sürüm kontrolü temelleri", kanit: "Adım 5-7'deki commit mesajlı README, dosya yükleme ve baslangic.md değişiklikleri." },
      { ad: "Hesap güvenliği (2FA)", kanit: "Adım 3'teki 2FA etkin durum ekran görüntüsü." },
      { ad: "Markdown ile yazım", kanit: "Adım 5'teki başlıklı, listeli README ve adım 8'deki profil README'si." },
      { ad: "Portföy sunumu", kanit: "Adım 9'daki gizli pencerede açılan repo bağlantısı ve CV'ye eklenmiş hali." }
    ],
    telafi: "K1 tutmazsa adım 3'e dön ve 2FA'yı yeniden etkinleştir. K2 tutmazsa adım 5'i tekrar et: README'yi Edit ile aç, başlığı ve 3 maddeyi Preview'da kontrol et. K3 tutmazsa adım 6 ve 7'ye dön ve dosya ile klasörü yeniden yükle. K4 tutmazsa adım 8'de repo adını kullanıcı adınla birebir eşle. K5 tutmazsa adım 9'a dön ve repoyu Public yap. K6 tutmazsa ilgili dosyayı sil ve yeniden yükle.",
    sonraki: "K1-K6'nın tamamı tutar ve savunma sorularını cevaplarsan Başlangıç yolu biter; sec1 (Dijital Kale), sup1 (Kendi Destek Masam) ve bk1 (Konsol Görev Yöneticisi) gibi lv1 projelerinin kilidi açılır. Tamamlama kanıt kaydı üretir, rozet vermez."
  };

  K.tanim["sup1"] = {
    onkosul: [
      "ba2 (E-posta, Belge ve Kendi CV Taslağım): Docs ve Sheets'te belge hazırlama alışkanlığı gerekir.",
      "ba3 (GitHub'a İlk Adımım): adım 9'da depo açıp dosya yükleyeceğin için GitHub hesabın olmalı.",
      "Bilgisayar temelleri (ba1) bilinmeli; BT bilgisi önkoşul değildir."
    ],
    gereksinim: [
      "İşlevsel (zorunlu): 8 alanlı (No, Tarih, Kullanıcı, Sorun, Kategori, Öncelik, Durum, Çözüm) bir bilet tablosu kurarsın (adım 2-3).",
      "İşlevsel (zorunlu): Kategori, Durum ve Öncelik sütunlarına veri doğrulamalı açılır liste eklersin (adım 4-5).",
      "İşlevsel (zorunlu): 10 sahte vakayı yazar, hepsini Çözüm notuyla Kapandı durumuna getirirsin (adım 6-7).",
      "İşlevsel (zorunlu): Kategoriye göre bilet sayısını gösteren pivot tablo çıkarırsın (adım 8).",
      "İşlevsel (isteğe bağlı): Kurallar sekmesine her önceliğin örnek ilk yanıt hedefini eklersin.",
      "İşlevsel olmayan: Tüm kullanıcı adları ve vakalar uydurmadır; gerçek kişi verisi yoktur."
    ],
    kabul: [
      "K1: Bilet tablosunda 8 alan vardır ve başlık satırı dondurulmuştur | Test: Sayfayı aşağı kaydır, başlık sabit kalıyorsa ve 8 sütun sayılıyorsa geçer.",
      "K2: Kategori (6), Durum (5) ve Öncelik (4) hücrelerinde açılır liste çalışır | Test: Üç sütundan birer hücreye tıkla, listeyi aç, seçenek sayılarını kanıt notuna yaz.",
      "K3: Kurallar sekmesinde 4 öncelik seviyesinin tek cümlelik tanımı vardır | Test: Sekmeyi aç, dört tanımı say ve her birinin 'Kritik = herkesin işi durdu' gibi ayırt edici olduğunu kontrol et.",
      "K4: 10 biletin hepsinde Çözüm dolu ve Durum Kapandı'dır | Test: Duruma göre filtrele; Kapandı sayısı 10 olmalı ve Çözüm sütunu boş hücre içermemeli.",
      "K5: Pivot tabloda her kategorinin bilet sayısı toplamı 10'dur | Test: Pivot toplamını tablodaki satır sayısıyla karşılaştır.",
      "K6: GitHub deposunda CSV, README ve ekran görüntüsü vardır | Test: Depo bağlantısını gizli pencerede aç ve üç öğeyi göster."
    ],
    rubrik: [
      { olcut: "Bilet şablonu tasarımı", guclu: "8 alanın her biri tanımlı, sütun adları açık ve veri doğrulamayla hatalı girişi engelliyor.", zayif: "Alanlar eksik; serbest metinle her bilet farklı yazılmış." },
      { olcut: "Öncelik ve aciliyet ayrımı", guclu: "Kurallar sekmesinde dört seviye etki cümlesiyle tanımlı; vakalara tutarlı öncelik verilmiş.", zayif: "Tüm biletler Yüksek veya tanımlar yok." },
      { olcut: "Vaka yazımı", guclu: "Her vakada belirti, başlama zamanı ve denenen adım var; çözüm 1-2 cümleyle başkasının anlayacağı biçimde yazılmış.", zayif: "Vakalar 'çalışmıyor' gibi tek kelime; çözüm notu boş." },
      { olcut: "Özet ve raporlama", guclu: "Pivot kategori dağılımını doğru gösteriyor ve toplam 10'a eşit.", zayif: "Pivot yok veya sayılar tabloyla uyuşmuyor." },
      { olcut: "Dokümantasyon", guclu: "README amaç, alan açıklamaları, öncelik tanımları ve 3 örnek bileti içeriyor.", zayif: "README boş veya yalnız depo adını yazıyor." }
    ],
    savunma: [
      "Neden açılır liste kullandın; serbest metin bırakılsaydı raporlamada ne bozulurdu?",
      "Acil ile önemli aynı şey değil: tablondan bir vakada bu farkı nasıl gösterdin ve nerede yanılmış olabilirsin?",
      "Tablo yerine gerçek bir bilet yazılımı kullanılsaydı hangi alanları otomatik kazanırdın, hangi sınırın var?"
    ],
    yetkinlikler: [
      { ad: "Bilet yönetimi", kanit: "Adım 7'deki 10 vakalı, Kapandı durumlu tam bilet tablosu." },
      { ad: "Veri doğrulama ve tablo tasarımı", kanit: "Adım 4'teki açılır listeli sütunlar ve adım 5'teki Kurallar sekmesi." },
      { ad: "Sorun tanımlama ve yazılı iletişim", kanit: "Adım 6-7'deki belirti, süre ve denenen adım içeren vakalar ile çözüm notları." },
      { ad: "Özet raporlama", kanit: "Adım 8'deki kategoriye göre pivot tablo görüntüsü." },
      { ad: "Dokümantasyon", kanit: "Adım 9'daki it-support-desk deposu: README, CSV ve ekran görüntüsü." }
    ],
    telafi: "K1 tutmazsa adım 3'e dön ve alanları ile dondurmayı yeniden kur. K2 veya K3 tutmazsa adım 4 ve 5'i tekrar et: listeleri veri doğrulamayla yeniden ekle, öncelik tanımlarını Kurallar sekmesine yaz. K4 tutmazsa adım 6 ve 7'ye dön: eksik vakanın belirti, süre ve denenen adımını yaz, çözüm notunu ekle. K5 tutmazsa adım 8'de pivotu yeniden oluştur. K6 tutmazsa adım 9'da CSV'yi yeniden indirip yükle.",
    sonraki: "K1-K6 tutar ve savunma sorularını cevaplarsan sup2 (Windows ve Ağ Sorun Giderme Günlüğü) projesinin kilidi açılır; sup1 biletlerin sup4'te kullanılacak. Tamamlama kanıt kaydı üretir, rozet vermez."
  };

  K.tanim["sup2"] = {
    onkosul: [
      "sup1 (Kendi Destek Masam): belirti ve çözüm notu yazma, bilet mantığı gerekir.",
      "ba1 (Bilgisayarı Tanı: İlk Gün): Win+R ile program açma ve ekran görüntüsü alma bilinmeli.",
      "Kendi Windows bilgisayarına erişimin olmalı; Mac ile komutların bir kısmı farklıdır, kartları Windows için yaz."
    ],
    gereksinim: [
      "İşlevsel (zorunlu): Belirti, Neden, Çözüm, Doğrulama başlıklı bir kart şablonu hazırlarsın (adım 2).",
      "İşlevsel (zorunlu): ipconfig, ping ve nslookup çıktılarını kendi bilgisayarında alıp kartlara dönüştürürsün (adım 3-5).",
      "İşlevsel (zorunlu): Disk, Aygıt Yöneticisi, güvenli mod ve Olay Görüntüleyicisi için birer kart yazarsın (adım 6-9).",
      "İşlevsel (zorunlu): 8 kartı içindekiler ile Markdown günlük olarak GitHub'a yüklersin (adım 10).",
      "İşlevsel (isteğe bağlı): Kartlara seçtiğin ek bir sorun ekler ve kendi bulduğun ikinci bir komutu yazarsın.",
      "İşlevsel olmayan: Ekran görüntülerinde IP ve ağ adı kartlarında karartılır; sürücü ve ayar değiştirmeden yalnız okursun."
    ],
    kabul: [
      "K1: 6 basamaklı sorun giderme şablonu 'Yazıcı çalışmıyor' vakasına uygulanmıştır | Test: Şablonu aç, her basamakta 1 cümle olduğunu say.",
      "K2: ping tablosu üç basamağı (127.0.0.1, ağ geçidi, 8.8.8.8) 'nerede kesilirse ne anlama gelir' ile eşleştirir | Test: Tabloda üç satır ve her satırda bir anlam cümlesi olmalı.",
      "K3: DNS kartında nslookup çıktısı ve flushdns çözümü yer alır | Test: Kartı aç; belirti, çıktı ve doğrulama bölümlerinin dolu olduğunu işaretle.",
      "K4: Sürücü ve güvenli mod kartları 'ne zaman kullanılır' sorusunu cevaplar | Test: Her kartta bir 'kullan' ve bir 'kullanma' durumu yaz ve say.",
      "K5: Olay kartında bir Event ID ve kaynak adı vardır | Test: Kartı aç, Olay Görüntüleyicisi'ndeki aynı kaydı bulabildiğini göster.",
      "K6: GitHub'daki günlükte 8 kart ve içindekiler bulunur | Test: README'yi gizli pencerede aç, kartları say."
    ],
    rubrik: [
      { olcut: "Sistematik sorun giderme", guclu: "Altı basamak sırasıyla uygulanmış; her basamak bir gözlemle bağlı.", zayif: "Doğrudan çözüme atlanmış, tahmine dayalı." },
      { olcut: "Ağ sorununu daraltma", guclu: "ping sırası (kendine, modeme, internete) ve kesilme anlam tablosu doğru ve sorunun yerini söylüyor.", zayif: "Yalnız ping google.com var; sorunun yeri belirsiz." },
      { olcut: "Kart kalitesi", guclu: "Her kartta belirti, neden, çözüm ve doğrulama ayrı; başkası tek başına uygulayabilir.", zayif: "Kartlar tek paragraf; doğrulama adımı yok." },
      { olcut: "Güvenli araç kullanımı", guclu: "Sürücü ve güvenli mod kartlarında riskli adım uyarılmış; yalnız okuma yapılmış.", zayif: "Aygıt değiştirilmiş veya risk belirtilmemiş." },
      { olcut: "Günlük derleme", guclu: "8 kart tek belgede, içindekiler ve GitHub README ile okunabilir.", zayif: "Kartlar dağınık dosyalar; içindekiler yok." }
    ],
    savunma: [
      "ping sırasını neden önce kendine, sonra modeme, sonra internete atıyorsun; sırayı tersine çevirseydin ne öğrenemezdin?",
      "ipconfig /flushdns her DNS sorununu çözer mi; çözmediği durumda sonraki adımın ne olur?",
      "Güvenli modu hangi sorun için denemezdin ve neden?"
    ],
    yetkinlikler: [
      { ad: "Ağ sorunu daraltma", kanit: "Adım 3-4'teki ipconfig çıktısı ve üç ping çıktısı ile 'nerede kesilirse' tablosu." },
      { ad: "DNS ve temel ağ bilgisi", kanit: "Adım 5'teki DNS kartı: nslookup çıktısı ve flushdns doğrulaması." },
      { ad: "Windows sistem araçları", kanit: "Adım 6-9'daki disk, Aygıt Yöneticisi, güvenli mod ve Olay Görüntüleyicisi kartları." },
      { ad: "Teknik dokümantasyon", kanit: "Adım 10'daki GitHub'da 8 kartlı, içindekili günlük." }
    ],
    telafi: "K1 tutmazsa adım 1'e dön ve altı basamağı yeniden yaz. K2 tutmazsa adım 4'ü tekrar et: üç ping'i yeniden çalıştırıp anlam tablosunu düzelt. K3 tutmazsa adım 5'te nslookup ve flushdns'i yeniden dene. K4 veya K5 tutmazsa adım 7-9'a dön ve kartı kendi bilgisayarındaki gerçek ekranla yeniden yaz. K6 tutmazsa adım 10'da kartları tek belgede topla ve README'yi yeniden yükle.",
    sonraki: "K1-K6'nın tamamı tutar ve savunma sorularını cevaplarsan sup3 (Kullanıcı Hesapları, Yetki ve Güvenlik Temelleri) projesinin kilidi açılır; kartların sup4'te bilgi bankası makalesine dönüşür. Tamamlama kanıt kaydı üretir, rozet vermez."
  };

  K.tanim["sup3"] = {
    onkosul: [
      "sup1 (Kendi Destek Masam): parola sıfırlama ve hesap kilitlenmesi biletleri yazmış olmalısın.",
      "sup2 (Windows ve Ağ Sorun Giderme Günlüğü): Windows araçlarını (Win+R komutları) ve belirti-neden-çözüm kartı yazmayı bilmelisin.",
      "Bilgisayarında VirtualBox ve bir değerlendirme sürümü ISO'sunu çalıştıracak boş disk alanı ve bellek gerekir."
    ],
    gereksinim: [
      "İşlevsel (zorunlu): VirtualBox'ta Windows değerlendirme sanal makinesi kurar ve 'temiz-kurulum' anlık görüntüsü alırsın (adım 3-4).",
      "İşlevsel (zorunlu): ayse, mehmet, deniz kullanıcılarını ve Muhasebe ile Satis gruplarını oluşturursun (adım 5).",
      "İşlevsel (zorunlu): İki klasöre grup bazlı izin verip Ayşe ile 'erişim reddedildi' sonucunu gözlersin (adım 6).",
      "İşlevsel (zorunlu): Parola sıfırlama, hesap devre dışı bırakma prosedürlerini ve 4x4 yetki matrisini yazarsın (adım 7-9).",
      "İşlevsel (isteğe bağlı): 'Ayşe'ye ikinci gruptan salt okuma izni' gibi bir istisna senaryosunu ayrıca denersin.",
      "İşlevsel olmayan: Her şey yalnız kendi sanal makinende yapılır; gerçek ağda ve gerçek kişi hesaplarında deneme yoktur, parolalar belgede açık yazılmaz."
    ],
    kabul: [
      "K1: Sanal makine listede çalışır ve anlık görüntü 'temiz-kurulum' vardır | Test: VirtualBox'ta makineyi başlat, Anlık Görüntüler listesini aç ve ekran görüntüsünü kaydet.",
      "K2: Üç kullanıcı ve iki grupta üyelikler doğrudur | Test: Muhasebe ve Satis grup ekranını aç; Ayşe yalnız Muhasebe'de, Mehmet yalnız Satis'te görünmeli.",
      "K3: Ayşe ile Satis-Belgeleri açılınca 'erişim reddedildi' çıkar | Test: Ayşe hesabıyla girip klasörü aç; hata mesajını ekran görüntüsüne al.",
      "K4: Parola sıfırlama prosedüründe kimlik doğrulama soruları ve 'ilk girişte değiştir' adımı vardır | Test: Prosedürü başka birine oku, adımları tek başına uygulayıp uygulayamadığını sor.",
      "K5: Yetki matrisinde 4 satır, 4 sütun ve her hücre Yok/Oku/Değiştir/Tam'dan biridir | Test: Matrisi say ve her hücrenin dolu olduğunu işaretle; 'en az yetki' ihlalini ara.",
      "K6: MFA duyurusu yaklaşık 120 kelimedir ve teknik terim içermez | Test: Kelimeleri say ve bir yakınına okutup anlayıp anlamadığını sor."
    ],
    rubrik: [
      { olcut: "Sanal laboratuvar güvenliği", guclu: "Her şey sanal makinede, anlık görüntü alınmış, gerçek veri ve gerçek hesap yok.", zayif: "Deneme kendi ana bilgisayarındaki hesaplarda yapılmış." },
      { olcut: "İzin tasarımı", guclu: "Grup bazlı izin verilmiş, bireysel izin yok; Ayşe-Satis reddi kanıtlı.", zayif: "İzin her kullanıcıya tek tek verilmiş veya reddedilme denenmemiş." },
      { olcut: "Prosedür yazımı", guclu: "Parola sıfırlama prosedüründe kimlik doğrulama, geçici parola, ilk girişte değiştirme ve bilet kaydı adımları var.", zayif: "Prosedür tek cümle; kimlik doğrulama adımı yok." },
      { olcut: "Yetki matrisi", guclu: "Matris en az yetki ilkesine uyuyor, her hücre gerekçeli ve Muhasebe-Satis ayrımı net.", zayif: "Herkese Tam verilmiş veya hücreler boş." },
      { olcut: "Kullanıcı iletişimi (MFA)", guclu: "120 kelimelik duyuru teknik terimsiz; SSS telefon kaybı gibi gerçek soruyu cevaplıyor.", zayif: "Duyuru jargon dolu; SSS genel geçer." }
    ],
    savunma: [
      "Neden izinleri kullanıcıya değil gruba veriyorsun; 50 kullanıcı olsaydı ne değişirdi?",
      "Parola sıfırlama isteyen kişiyi telefonda tanımadan sıfırlasaydın hangi saldırıya kapı açardın?",
      "En az yetki ilkesini matriste hangi hücrede uyguladın ve kullanıcıya zorluk çıkardığı bir örnek ver."
    ],
    yetkinlikler: [
      { ad: "Hesap ve grup yönetimi", kanit: "Adım 5'teki kullanıcı ve grup ekranı görüntüsü." },
      { ad: "Erişim kontrolü ve izin yönetimi", kanit: "Adım 6'daki izin ekranı ve 'erişim reddedildi' görüntüsü." },
      { ad: "BT süreç dokümantasyonu", kanit: "Adım 7-8'deki parola sıfırlama prosedürü ve devre dışı bırakma kartları." },
      { ad: "Yetki matrisi ve en az yetki", kanit: "Adım 9'daki 4x4 yetki matrisi." },
      { ad: "Kullanıcıya sade anlatım", kanit: "Adım 10'daki MFA duyurusu ve 5 soruluk SSS." }
    ],
    telafi: "K1 tutmazsa adım 3-4'e dön ve sanal makineyi yeniden kur, anlık görüntü al. K2 tutmazsa adım 5'te grupları sil ve yeniden kur. K3 tutmazsa adım 6'ya dön: izni gruba ver ve Ayşe ile yeniden dene. K4 tutmazsa adım 7'de prosedürü kimlik doğrulama sorularıyla yeniden yaz. K5 tutmazsa adım 9'a dön ve en az yetkiye göre matrisi yeniden doldur. K6 tutmazsa adım 10'da duyuruyu sadeleştirip yeniden yaz.",
    sonraki: "K1-K6 tutar ve savunma sorularını cevaplarsan sup4 (Kapston: Help Desk Portföyü) projesinin kilidi açılır; ayrıca sec2 gibi sanal laboratuvar projeleri için temel oluşur. Tamamlama kanıt kaydı üretir, rozet vermez."
  };

  K.tanim["sup4"] = {
    onkosul: [
      "sup1 (Kendi Destek Masam): bilet tablosu ve öncelik tanımları (SLA tablosu ve haftalık rapor buna dayanır).",
      "sup2 (Windows ve Ağ Sorun Giderme Günlüğü): bilgi bankası makalelerine dönüştürülecek 8 kart.",
      "sup3 (Kullanıcı Hesapları, Yetki ve Güvenlik Temelleri): hesap prosedürleri ve yetki matrisi (labs klasörüne gider).",
      "GitHub hesabı ve temel repo kullanımı (ba3)."
    ],
    gereksinim: [
      "İşlevsel (zorunlu): helpdesk-portfolio deposunu knowledge-base, sla, reports, process, labs klasörleriyle kurarsın (adım 1).",
      "İşlevsel (zorunlu): ITIL'in olay, talep, problem ve değişiklik kavramlarını sup1 biletlerinden örnekle ayırırsın (adım 2).",
      "İşlevsel (zorunlu): Şablona uygun 20 makalelik bilgi bankası yazarsın (adım 3-6).",
      "İşlevsel (zorunlu): SLA tablosu, 30 biletli haftalık metrik raporu ve süreç akış şeması hazırlarsın (adım 7-9).",
      "İşlevsel (isteğe bağlı): Makalelere etiketler ekleyip içindekiler dosyasında etiketle gruplarsın.",
      "İşlevsel olmayan: SLA süreleri 'örnek hedef' diye işaretlenir ve 30 bilet sahtedir; gizli bilgi taraması yapılır, kimse gerçek şirket verisi kullanmaz."
    ],
    kabul: [
      "K1: Depoda 5 klasör ve ana README bulunur | Test: Depo ana sayfasını aç, klasörleri say ve ekran görüntüsü al.",
      "K2: ITIL tablosunda 4 satır vardır ve her satırın örneği ayrı bir sup1 biletidir | Test: Tabloyu aç, 4 satırı say ve aynı örnek iki kez kullanılmış mı kontrol et.",
      "K3: knowledge-base klasöründe tam 20 makale vardır ve her biri şablonun 6 başlığını taşır | Test: Dosya sayısını say; rastgele 3 makalede başlıkları tek tek işaretle.",
      "K4: Bir arkadaşın 3 makaleden en az birini tek başına uygular ve tıkandığı yer not edilir | Test: Tıkanma notunu ve düzeltmeyi iyileştirmeler.md'ye önce/sonra olarak yaz.",
      "K5: SLA tablosunda 4 öncelik, ilk cevap ve çözüm hedefi sütunu vardır ve 'örnek hedef' etiketi bulunur | Test: Tabloyu aç, 4x2 hedef hücresini ve etiketi say.",
      "K6: Rapor 30 bilet üzerinden pivot ve grafik içerir, 5 cümlelik yorum vardır | Test: Pivot toplamını 30 ile karşılaştır, yorumda ne/neden/ne yapılmalı cümlelerini işaretle."
    ],
    rubrik: [
      { olcut: "ITIL kavram ayrımı", guclu: "Olay, talep, problem, değişiklik her biri farklı gerçek bilet örneğiyle doğru ayrılmış.", zayif: "Kavramlar aynı örnekle karıştırılmış." },
      { olcut: "Makale kullanılabilirliği", guclu: "Makale Kime Uygun ve Hâlâ Olmazsa dahil 6 başlığı taşıyor; arkadaşın tek başına uygulayabiliyor.", zayif: "Makaleler paragraf halinde; test edilmemiş." },
      { olcut: "SLA mantığı", guclu: "Her önceliğin ilk cevap ve çözüm hedefi var, sup1 önceliklerinden türemiş ve varsayım olarak etiketli.", zayif: "Süreler gerçek verilermiş gibi sunulmuş veya öncelik tanımı yok." },
      { olcut: "Metrik raporu ve yorum", guclu: "Pivot ve grafik tablodan türemiş; yorum ne, neden, ne yapılmalı sorularını cevaplıyor.", zayif: "Grafik var, yorum yok; sayılar tabloyla uyuşmuyor." },
      { olcut: "Portföy sunumu ve gizlilik", guclu: "README özet, klasör tablosu, örnek bağlantı; gizli bilgi taraması yapılmış; CV maddeleri doğru.", zayif: "README boş; CV'de olmayan başarı yazılmış." }
    ],
    savunma: [
      "Olay ile problem arasındaki farkı kendi bilgi bankandan bir örnekle savun: hangisini kapatınca öbürü kapanmaz?",
      "SLA hedeflerini başka biçimde belirleseydin (ör. hepsine aynı süre) hangi sorunlar çıkardı ve senin tablonun sınırı ne?",
      "Makaleleri arkadaşınla test ederken neyi değiştirdin; bu değişiklik makale yazma kuralını nasıl etkiledi?"
    ],
    yetkinlikler: [
      { ad: "ITIL temel kavramları", kanit: "Adım 2'deki 4 satırlık ITIL kavram tablosu." },
      { ad: "Bilgi bankası yazımı", kanit: "Adım 3-6'daki 20 makalelik knowledge-base klasörü ve içindekiler dosyası." },
      { ad: "SLA ve metrik raporlama", kanit: "Adım 7'deki SLA tablosu ve adım 8'deki pivot, grafik ve yorumlu haftalık rapor." },
      { ad: "Süreç dokümantasyonu", kanit: "Adım 9'daki akış şeması ve 1-2 sayfalık süreç belgesi." },
      { ad: "Kullanıcı testi ve iyileştirme", kanit: "Adım 10'daki iyileştirmeler.md önce/sonra kaydı." }
    ],
    telafi: "K1 tutmazsa adım 1'e dön ve klasör iskeletini yeniden kur. K2 tutmazsa adım 2'de örnekleri değiştir. K3 tutmazsa adım 3'e dön, şablonu düzelt ve eksik makaleleri adım 4-6'da tamamla. K4 tutmazsa adım 10'u başka bir arkadaşla tekrar et. K5 tutmazsa adım 7'de SLA tablosunu sup1 önceliklerinden yeniden kur. K6 tutmazsa adım 8'e dön: pivotu ve yorumu yeniden yaz.",
    sonraki: "K1-K6 tutar ve savunma sorularını cevaplarsan BT Destek yolu tamamlanır ve gold1 (Altın Vuruş) için destek masası kapsamı hazır olur; tamamlama kanıt kaydı üretir, rozet vermez. gold1'de bu bilgi bankasını ve SLA tablosunu girdi olarak kullanabilirsin."
  };

  K.tanim["gold1"] = {
    onkosul: [
      "bk1 (Konsol Görev Yöneticisi (C#)) ve bk2 (REST API: ASP.NET Core ve EF Core): C#, EF Core, Swagger ve xUnit ile API yazmayı bilmek (adım 3-4).",
      "bk3 (Üretim Seviyesi Servis: Kimlik, PostgreSQL, Docker, CI/CD): JWT, Docker ve GitHub Actions deneyimi (adım 5-6).",
      "sec1 (Dijital Kale) ve sec2 (Ev Laboratuvarı): tehdit tablosu ve parola/yetki kavramları (adım 5, 8).",
      "sup1 (Kendi Destek Masam) ve sup4 (Help Desk Portföyü): bilet alanları, öncelik ve SLA mantığı (adım 1); qa2 (Otomasyon: Playwright ile E2E) test planı için önerilir."
    ],
    gereksinim: [
      "İşlevsel (zorunlu): Bilet açan, listeleyen, tek bileti getiren ve durumunu değiştiren dört uç noktalı C# servisini yazarsın (adım 3).",
      "İşlevsel (zorunlu): Geçersiz durum geçişine 409, boş başlığa 400, olmayan bilete 404 döndürürsün (adım 3).",
      "İşlevsel (zorunlu): En az 9 otomatik test yazar ve JWT girişi, rol kontrolü ve hız sınırı ekler, testlerin yeşil kaldığını gösterirsin (adım 4-5).",
      "İşlevsel (zorunlu): Dockerfile, GitHub Actions CI ve /health ile bulutta çalışan bir adres hazırlarsın (adım 6).",
      "İşlevsel (isteğe bağlı): Dağıtımı Docker Desktop ile yerelde de çalıştırır, ağ şeması için Packet Tracer .pkt dosyasını eklersin.",
      "İşlevsel olmayan: Gizli anahtar ve parola repoda yoktur, bulutta bütçe uyarısı kuruludur, loglarda parola veya token yazmaz (adım 5, 6, 8)."
    ],
    kabul: [
      "K1: PLAN.md ve KURALLAR.md'de 3 rol, bilet alanları, durum akışı ve öncelik/süre tablosu vardır | Test: İki dosyayı aç ve her öğeyi işaretle; geçersiz geçiş örneğini bul.",
      "K2: dotnet run sonrası Swagger'da 4 uç nokta çalışır ve boş başlık 400, geçersiz geçiş 409 döner | Test: Swagger'dan dört isteği ve iki hata durumunu dene, kodları ekran görüntüsüne al.",
      "K3: dotnet test en az 9 testle yeşildir ve bir test bilerek bozulunca kırmızı olur | Test: Testi çalıştır, sayıyı yaz, bir testi boz, kırmızıyı gör, düzelt.",
      "K4: Tokensız istek 401, Kullanıcı rolünün durum değiştirmesi 403 verir, başkasının bileti görünmez ve repoda gerçek gizli değer yoktur | Test: Üç güvenlik testini çalıştır, git grep -i password ile secret ve dotnet list package --vulnerable çıktılarını GUVENLIK.md'ye yapıştır.",
      "K5: CI'da yeşil tik, bulut adresinde /health OK döner ve bütçe uyarısı kuruludur | Test: Actions sekmesinin ve /health sayfasının ekran görüntüsünü al; bütçe sayfası görüntüsü ekle.",
      "K6: README ve 4 şablon İngilizcedir, olay planında SEV1-3 ve doldurulmuş örnek vardır | Test: Dosyaları aç, başlık ve şablon sayısını say; log kesitinde parola veya token aratıp bulunmadığını yaz."
    ],
    rubrik: [
      { olcut: "Tasarım kararları ve plan", guclu: "Roller, alanlar ve durum akışı yazılmış; her durum geçişi kural tablosundan koda gerekçeyle taşınmış.", zayif: "Plan yok veya kod planla uyuşmuyor." },
      { olcut: "API doğruluğu ve test", guclu: "4 uç nokta, 3 hata kodu, 9 üstü test ve bilerek kırılan kırmızı test kanıtlı.", zayif: "Sadece mutlu yol çalışıyor; test yok veya hiç kırmızı görülmemiş." },
      { olcut: "Güvenlik uygulaması", guclu: "Parola hash'li, anahtar user-secrets'te, rol ve sahiplik kontrollü, giriş hız sınırlı; tehdit tablosu önlemlerle eşleşiyor.", zayif: "Düz parola, koda gömülü anahtar veya rol kontrolü yok." },
      { olcut: "Bulut ve maliyet disiplini", guclu: "CI yeşil, /health açık, bütçe uyarısı kurulmadan kaynak açılmamış, maliyet notu yazılmış.", zayif: "Elle yükleme; maliyet ve limit düşünülmemiş." },
      { olcut: "Operasyon, dil ve savunma", guclu: "Runbook ve olay raporu gerçek logdan türemiş; İngilizce README, demo ve mülakat anlatımı anlayarak yapılmış.", zayif: "Olay raporu uydurma; İngilizce metin anlaşılmadan kopyalanmış." }
    ],
    savunma: [
      "Neden ayrı bir ağ şeması çizdin; veri tabanı portunu dışarıya kapatmasaydın hangi saldırı mümkün olurdu ve bu projede şemanın sınırı ne (gerçek ağ değil simülasyon)?",
      "JWT yerine oturum çerezi kullansaydın tasarımın neresi değişirdi; hangi rol kontrolü hâlâ eksik kalabilirdi?",
      "Testlerin yeşil olması servisin doğru olduğunu kanıtlar mı; senin 9 testin neyi kapsamıyor?",
      "Bulutta bir şey bozulsa runbook'un hangi sırayla ilerler ve hangi veriyi kaybedebilirsin?"
    ],
    yetkinlikler: [
      { ad: "Gereksinim ve veri modeli tasarımı", kanit: "Adım 1'deki PLAN.md ve KURALLAR.md; adım 3'teki Ticket.cs, TicketRules.cs ve API.md." },
      { ad: "Ağ ve ortam mimarisi", kanit: "Adım 2'deki AG-SEMASI.md, ag-semasi.png ve port tablosu." },
      { ad: "C# web API geliştirme ve test", kanit: "Adım 3'teki çalışan Swagger uç noktaları ve adım 4'teki yeşil dotnet test çıktısı." },
      { ad: "Uygulama güvenliği", kanit: "Adım 5'teki GUVENLIK.md, güvenlik testleri ve vulnerable çıktısı." },
      { ad: "CI/CD ve bulut dağıtımı", kanit: "Adım 6'daki Dockerfile, ci.yml, DAGITIM.md ve /health ekran görüntüsü." }
    ],
    telafi: "K1 tutmazsa adım 1'e dön ve durum akışını kural tablosuyla yeniden yaz. K2 tutmazsa adım 3'e dön, TicketRules.CanMove ve uç nokta cevaplarını düzelt. K3 tutmazsa adım 4'te testleri ekle ve bilerek bozma deneyini tekrar et. K4 tutmazsa adım 5'e dön: rol kontrolünü, user-secrets'i ve tehdit tablosunu yeniden yap. K5 tutmazsa adım 6'da CI ve bütçe uyarısını yeniden kur. K6 tutmazsa adım 7-8'e dön ve İngilizce metinleri ile olay planını gerçek logla yeniden yaz.",
    sonraki: "K1-K6 tutar ve dört savunma sorusunu sesli cevaplarsan altın kapston tamamlanır; sonraki hedef bk4 (Kapston: Bulutta Sipariş Servisi) gibi lv3 kapstonlarına geçmek ve portföy sayfanı yayında tutmaktır. Tamamlama kanıt kaydı üretir, rozet vermez."
  };
})(window);

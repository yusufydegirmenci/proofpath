/* Veri Analitiği · Seviye 0 (Temeller): 3 ders (M§7'nin 15 öğesi), 1 lab (yerel simülasyon), değerlendirme + telafi.
   Dış kaynaklar yalnız HTTP 200 doğrulananlar (2026-10-12). Veri seti SENTETİKTİR; gerçek kişi/şirket verisi değildir. */
(function () {
  var VA = (window.PP_VA = window.PP_VA || {});
  var DOG = "2026-10-12";

  /* Sentetik satış verisi (12 sipariş) */
  VA.veri = {
    sutunlar: ["siparis_id", "tarih", "musteri_id", "sehir", "urun", "adet", "birim_fiyat", "indirim_orani", "odeme_turu", "iade"],
    satirlar: [
      ["S001", "2026-01-05", "M01", "İstanbul", "Kulaklık", 2, 450.0, 0.10, "kart", "hayır"],
      ["S002", "2026-01-07", "M02", "Ankara", "Klavye", 1, 800.0, 0.00, "kart", "hayır"],
      ["S003", "2026-01-12", "M03", "İzmir", "Kulaklık", 1, 450.0, 0.00, "nakit", "evet"],
      ["S004", "2026-01-15", "M01", "İstanbul", "Fare", 3, 250.0, 0.05, "kart", "hayır"],
      ["S005", "2026-02-02", "M04", "Ankara", "Klavye", 2, 800.0, 0.10, "havale", "hayır"],
      ["S006", "2026-02-09", "M05", "İstanbul", "Monitör", 1, 4200.0, 0.15, "kart", "hayır"],
      ["S007", "2026-02-14", "M02", "Ankara", "Fare", 2, 250.0, "", "nakit", "evet"],
      ["S008", "2026-02-21", "M06", "İzmir", "Kulaklık", 4, 450.0, 0.10, "kart", "hayır"],
      ["S009", "2026-03-03", "M07", "İstanbul", "Klavye", 1, 800.0, 0.00, "havale", "hayır"],
      ["S010", "2026-03-10", "M03", "İzmir", "Monitör", 1, 4200.0, 0.00, "kart", "hayır"],
      ["S011", "2026-03-18", "M08", "Ankara", "Kulaklık", 2, 450.0, 0.05, "nakit", "hayır"],
      ["S012", "2026-03-27", "M01", "İstanbul", "Fare", 1, 250.0, 0.00, "kart", "hayır"]
    ]
  };

  /* ---------- Dersler (her biri M§7'nin 15 öğesini taşır) ---------- */
  VA.dersler = [
    {
      id: "va0-1", ad: "Analist ne yapar? İş sorusunu analitik soruya çevirmek",
      hedefler: ["Veri analisti, veri mühendisi, veri bilimci ve iş analistinin işini ayırt etmek", "Bir iş problemini ölçülebilir bir soruya ve gerekli veri parçalarına çevirmek"],
      onkosul: "Yok. Bilgisayar kullanabiliyor olman yeterli; SQL, Python ya da istatistik bilmen gerekmez.",
      aciklama: "Veri analisti, mevcut veriyi inceleyip karar vericilere 'ne oldu, neden olmuş olabilir, ne yapılabilir' sorularında kanıt sunar. İşin başı sorudur: 'Satışlar neden düştü?' bir şikâyettir; 'Şubat'ta İstanbul'da kulaklık satış adedi Ocak'a göre kaç yüzde değişti?' ise veriyle cevaplanabilir bir sorudur.",
      terimler: [["Analitik soru", "Veriyle cevaplanabilir, ölçülebilir, zaman ve kapsamı belli soru."], ["Metrik", "Bir şeyi sayıya çeviren ölçü (örn. ciro = adet × birim fiyat)."], ["Boyut", "Metriği kırdığın kategori (şehir, ürün, ay)."], ["Veri mühendisi", "Veriyi toplayan, taşıyan ve güvenilir tablolar haline getiren kişi."], ["Veri bilimci", "Genellikle tahmin ve istatistiksel modelleme yapan kişi."], ["İş analisti", "Süreç ve gereksinimleri analiz eden kişi; veriyle çalışması şart değildir."]],
      ornek: ["İş problemi: 'Kulaklık satışları iyi gitmiyor gibi.'", "1. Netleştir: 'İyi gitmiyor' neye göre? Adet mi, ciro mu, hangi dönem, neyle kıyas?", "2. Analitik soru: 'Ocak–Mart arasında kulaklık toplam ciro ve adedi aylara göre nasıl değişti?'", "3. Gerekli sütunlar: tarih (ay için), urun (filtre), adet, birim_fiyat, indirim_orani (ciro için).", "4. Veri neyi cevaplayamaz: 'Neden?' sorusu; neden için kampanya, stok, rakip fiyatı gibi başka veriler gerekir."],
      analoji: { a: "Doktor muayenesi: hasta 'kendimi kötü hissediyorum' der; doktor önce ölçülebilir sorulara çevirir (ateş, tansiyon, süre).", sinir: "Doktor ölçümü kendisi yapar ve hastayı muayene eder; analist çoğu zaman başkasının topladığı veriyle çalışır ve veriyi toplama koşullarını bilmeyebilir." },
      gorsel: "İş problemi → Analitik soru → Gerekli sütunlar → Hesap → Yorum (ve sınırlar)",
      rehberli: ["'Müşteriler memnun değil' cümlesini üç ölçülebilir soruya böl (iade oranı, tekrar alışveriş, ...).", "Her soru için hangi sütunlara ihtiyaç olduğunu yaz.", "Verinin cevaplayamayacağı bir 'neden' sorusu bul."],
      bagimsiz: "Kendi çalıştığın ya da okuduğun bir yerden gerçek bir şikâyet seç. Üç analitik soru, her biri için gereken sütunlar ve verinin cevaplayamayacağı bir soru yaz.",
      hatalar: [["Soruyu belirsiz bırakmak ('iyi', 'çok', 'düştü')", "Dönemi, ölçüyü ve kıyası yaz."], ["Veride olmayan sütunu varsaymak", "Önce sütun listesine bak; yoksa 'bu soru bu veriyle cevaplanamaz' de."], ["Nedeni sayıdan çıkarmak", "Sayı 'ne' olduğunu gösterir; 'neden' için ek veri ya da deney gerekir."]],
      kontrol: [
        { q: "Hangisi veriyle cevaplanabilir bir analitik sorudur?", o: ["Satışlar neden kötü?", "Ocak-Mart arasında İstanbul'da kulaklık cirosu aylara göre nasıl değişti?", "Müşteriler bizi sever mi?", "Ürün güzel mi?"], a: 1, why: "Dönemi, ölçüyü ve kırılımı belli; veriyle hesaplanabilir.", bolum: "aciklama" },
        { q: "Ciro metriği için hangi sütunlar gerekir?", o: ["sehir ve urun", "adet ve birim_fiyat", "musteri_id ve tarih", "odeme_turu ve iade"], a: 1, why: "Ciro = adet × birim fiyat (indirim varsa ona da bakılır).", bolum: "ornek" },
        { q: "Veri tek başına hangisini kanıtlayamaz?", o: ["Hangi ürünün daha çok satıldığını", "Bir kampanyanın satışları ARTIRDIĞINI", "Ayın toplam cirosunu", "Müşteri sayısını"], a: 1, why: "Neden-sonuç için kampanya verisi ve karşılaştırma/deney gerekir.", bolum: "hatalar" },
        { q: "Boyut ile metrik farkı nedir?", o: ["Aynı şey", "Metrik ölçülen sayı, boyut onu kırdığın kategori", "Boyut sayı, metrik metin", "Boyut sadece tarihtir"], a: 1, why: "Metrik: ciro. Boyut: şehir, ürün, ay.", bolum: "terimler" }
      ],
      gecme: { olcut: "Mini sınavda %80 ve bağımsız görevde en az 3 analitik soru + gereken sütunlar.", kritik: ["Veriye bakmadan 'neden' iddiasında bulunmak", "Sütunu olmayan bir soruyu cevaplanabilir saymak"] },
      kaynaklar: [], telafi: "Takıldıysan 'Ödünç iş sorusu → analitik soru' adımını bir kez daha yap: dönem, ölçü, kıyas, kırılım dörtlüsünü ayrı ayrı yaz.", sonraki: "Sıradaki ders: satır, sütun ve veri türleri."
    },
    {
      id: "va0-2", ad: "Satır, sütun, veri türleri ve veri kaynakları",
      hedefler: ["Bir tabloda kayıt (satır), değişken (sütun) ve veri türünü ayırt etmek", "CSV, JSON, XLSX ve SQL kaynaklarının farkını anlatmak"],
      onkosul: "Ders 1 (analitik soru ve sütun fikri).",
      aciklama: "Tablo her satırda bir kayıt (örn. bir sipariş), her sütunda bir değişken (örn. şehir) tutar. Her sütunun bir veri türü vardır: tam sayı, ondalık sayı, metin (kategorik), tarih, evet/hayır ya da tanımlayıcı (kimlik). Türü yanlış bilmek yanlış hesap demektir: sipariş numarasını toplamak anlamsızdır, 'S010' bir sayı değil bir etikettir.",
      terimler: [["Kayıt (satır)", "Tek bir olay/varlık: bir sipariş."], ["Değişken (sütun)", "Kayıtların ortak bir özelliği: şehir."], ["Tanımlayıcı", "Kaydı ayırt eden etiket (siparis_id); toplanmaz, ortalaması alınmaz."], ["Kategorik", "Sınırlı değerlerden biri (şehir, ürün, ödeme türü)."], ["Yapılı veri", "Satır-sütun düzeninde (tablo, CSV, SQL)."], ["Yapısız veri", "Serbest metin, görüntü, ses; önce yapıya çevrilmeden analiz edilmez."], ["CSV", "Virgülle ayrılmış metin dosyası; tür bilgisi taşımaz."], ["JSON", "İç içe nesneler/listeler tutabilen metin biçimi."], ["XLSX", "Excel çalışma kitabı; biçimlendirme ve formül içerebilir."], ["SQL veritabanı", "Birden çok ilişkili tablo; sorguyla okunur."]],
      ornek: ["Dönemin sentetik satış verisinden ilk iki kayıt: S001 (2026-01-05, M01, İstanbul, Kulaklık, 2 adet, 450.0, indirim 0.10, kart, hayır) ve S002.", "siparis_id → tanımlayıcı; tarih → tarih; adet → tam sayı; birim_fiyat → ondalık sayı; sehir/urun/odeme_turu → kategorik metin; iade → evet/hayır.", "'indirim_orani' sütununda bazı hücreler boş: eksik değer (S007). Toplam alırken bu satırı nasıl ele alacağına bilinçli karar vermelisin.", "Aynı veri CSV'de tür bilgisi olmadan düz metin olarak gelir; türü sen (ya da araç) tahmin eder."],
      analoji: { a: "Dolap ve çekmeceler: tablo dolap, satır bir dosya, sütun etiketli bir bölme.", sinir: "Dolapta bir dosya yalnızca tek yerdedir; veride aynı bilgi (örn. müşteri adı) birçok tabloda tekrar edebilir ve tutarsız olabilir." },
      gorsel: "siparis_id | tarih | musteri_id | sehir | urun | adet | birim_fiyat | indirim_orani | odeme_turu | iade\nS001      | 2026-01-05 | M01 | İstanbul | Kulaklık | 2 | 450.0 | 0.10 | kart | hayır",
      rehberli: ["Sentetik veri setinin ilk 5 satırına bak; her sütun için türünü yaz.", "Boş olan hücreyi bul (S007 / indirim_orani) ve 'sıfır mı, bilinmiyor mu?' diye düşün.", "Aynı tabloyu JSON'a çevirsen bir siparişin nasıl görüneceğini elle yaz."],
      bagimsiz: "Kendi telefonundaki ya da çalıştığın yerdeki bir listeyi (kişiler, giderler, ders programı) tablo olarak çiz: satır neyi temsil ediyor, sütunlar ve türleri ne? Bir sütunun neden 'tanımlayıcı' olduğunu açıkla.",
      hatalar: [["Tanımlayıcıyı sayı sanıp toplamak", "Kimlik, telefon, posta kodu gibi sütunlar metin/etikettir."], ["Boş hücreyi sıfır saymak", "Boş = bilinmiyor; sıfır = ölçüldü ve sıfır. İkisi farklı sonuç verir."], ["CSV'nin türleri taşıdığını sanmak", "CSV düz metindir; tarih ve sayı biçimini sen doğrularsın."]],
      kontrol: [
        { q: "siparis_id hangi türdür?", o: ["Tam sayı (toplanır)", "Tanımlayıcı", "Tarih", "Evet/hayır"], a: 1, why: "Kaydı ayırt eder; toplamanın anlamı yok.", bolum: "terimler" },
        { q: "indirim_orani boşsa (bilinmiyor) toplama nasıl yaklaşılmalı?", o: ["Hiç dikkate alma", "Otomatik 0 say", "Bilinçli karar ver ve raporda belirt", "Satırı sil"], a: 2, why: "Boş ile sıfır farklıdır; varsayımı açıkça yazmak gerekir.", bolum: "hatalar" },
        { q: "Hangisi yapısız veridir?", o: ["Sipariş tablosu", "Müşteri yorumu (serbest metin)", "CSV dosyası", "SQL tablosu"], a: 1, why: "Serbest metin satır-sütun düzeninde değildir.", bolum: "terimler" },
        { q: "CSV hakkında doğru olan?", o: ["Her sütunun türünü saklar", "Düz metindir; türü sen doğrularsın", "Birden çok tablo içerir", "Yalnız Excel açar"], a: 1, why: "CSV tür bilgisi taşımaz.", bolum: "hatalar" }
      ],
      gecme: { olcut: "Mini sınavda %80 ve bağımsız görevdeki tabloda her sütunun türü doğru.", kritik: ["Tanımlayıcıyı toplanabilir sanmak", "Boş ile sıfırı aynı saymak"] },
      kaynaklar: [
        { t: "RFC 4180: CSV biçimi", u: "https://www.rfc-editor.org/rfc/rfc4180", dogrulama: DOG, neden: "CSV'nin düz metin yapısı; bu ders tek başına yeter." },
        { t: "RFC 8259: JSON", u: "https://www.rfc-editor.org/rfc/rfc8259", dogrulama: DOG, neden: "JSON'un resmî tanımı." },
        { t: "PostgreSQL: tablo oluşturma ve sütun türleri", u: "https://www.postgresql.org/docs/current/tutorial-table.html", dogrulama: DOG, neden: "SQL tablosu ve sütun türü örneği (Seviye 2 için ön hazırlık)." }
      ],
      telafi: "Tablodan bir sütun seç ve 'bu sütunu toplayabilir miyim, ortalamasını alabilir miyim, sayabilir miyim?' diye üç soruyu cevapla; tür buradan çıkar.", sonraki: "Sıradaki ders: veri sözlüğü, kalite, gizlilik ve yorum sınırları."
    },
    {
      id: "va0-3", ad: "Veri sözlüğü, veri kalitesi, gizlilik ve yorum sınırları",
      hedefler: ["Veri sözlüğü yazmak ve okumak", "Veri kalitesi sorunlarını (eksik, tekrar, tutarsız) tanımak", "Gizlilik/etik sınırı ve verinin desteklemediği sonucu ayırt etmek"],
      onkosul: "Ders 2 (satır, sütun, veri türleri).",
      aciklama: "Veri sözlüğü her sütunun adını, anlamını, türünü, birimini, kabul edilen değerlerini ve boş olma anlamını yazar; onsuz iki analist aynı sütunu farklı yorumlar. Veri kalitesi 'tam, tutarlı, doğru, güncel, tekrarsız mı?' sorularıdır. Gizlilik: kişiyi doğrudan ya da dolaylı tanıtan veriyi gereğinden fazla toplamamak/paylaşmamak. Yorum sınırı: veri neyi destekliyorsa onu söylemek.",
      terimler: [["Veri sözlüğü", "Sütun adı, anlam, tür, birim, geçerli değerler ve boş değer kuralı."], ["Eksik değer", "Hiç girilmemiş/bilinmeyen değer."], ["Tekrar", "Aynı kaydın birden çok girilmesi."], ["Tutarsızlık", "Aynı şeyin farklı yazımı ('İstanbul', 'istanbul', 'IST')."], ["Kişisel veri", "Bir kişiyi tanımlayan ya da tanımlanabilir kılan bilgi."], ["Örneklem", "Tüm evrenin yalnız bir kısmı; 12 sipariş tüm satışlar değildir."], ["Korelasyon ≠ nedensellik", "İki şeyin birlikte değişmesi biri diğerine neden olur demek değildir."]],
      ornek: ["Veri sözlüğü satırı: 'indirim_orani — siparişe uygulanan indirim; ondalık sayı 0–1 arası (0.10 = %10); boş = indirim bilgisi girilmemiş (sıfır değil).'", "Kalite kontrolü: S007'de indirim_orani boş → eksik değer; kararımızı yazarız.", "Gizlilik: musteri_id takma etikettir ve doğrudan kişiyi tanıtmaz; ad, telefon, adres ekleseydik kişisel veri olurdu ve gereksizse toplanmamalıdır.", "Yorum sınırı: 'Nakit ödemelerde iade oranı daha yüksek' bu 12 satırda gözlenebilir (3 nakit siparişte 2 iade), ama bu küçük örneklem tüm müşterilere genellenemez ve nedeni göstermez."],
      analoji: { a: "Tarif defteri: malzeme ölçüleri ve birimleri yazılıdır; 'bir tutam'ın ne olduğunu bilmeyen yanlış yemek yapar.", sinir: "Tarifte yanlış ölçü yemeği bozar ama herkes görür; veride yanlış tanım, görünmeden yanlış karara yol açabilir." },
      gorsel: "Sütun | Anlam | Tür | Geçerli değerler | Boş ne demek\nindirim_orani | Uygulanan indirim | ondalık | 0–1 | bilgi girilmemiş",
      rehberli: ["'iade' sütunu için bir veri sözlüğü satırı yaz (anlam, tür, geçerli değerler, boş kuralı).", "Veri setinde tekrar, eksik ve tutarsız yazım ara; bulduklarını listele.", "'Müşterilerin yaş ortalaması' sorusunu veriyle cevaplamaya çalış ve neden olmadığını açıkla."],
      bagimsiz: "Kendi tablonun (Ders 2 bağımsız görevi) üç sütunu için veri sözlüğü yaz. Tabloda hangi kişisel veri olabilir ve gerçekten gerekli mi? Bir sonucun neden genellenemeyeceğini bir örnekle anlat.",
      hatalar: [["Sütun adından anlam çıkarmak ('fiyat' KDV dahil mi?)", "Sözlükte yaz ya da veri sahibine sor."], ["Küçük örneklemden genel kural çıkarmak", "Örneklem boyutunu ve temsil gücünü belirt."], ["Birlikte değişimi nedensellik saymak", "'Birlikte görüldü' de, 'neden oldu' deme."], ["Gereğinden fazla kişisel veri toplamak/paylaşmak", "Gerekmiyorsa toplama; paylaşırken takma etiket kullan."]],
      kontrol: [
        { q: "Veri sözlüğünün temel amacı nedir?", o: ["Veriyi şifrelemek", "Her sütunun anlamını ve kurallarını herkes için aynı yapmak", "Tabloyu küçültmek", "Grafik çizmek"], a: 1, why: "Ortak anlam; aksi halde herkes farklı yorumlar.", bolum: "aciklama" },
        { q: "'Reklam kampanyası satışları artırdı' iddiası için ne gerekir?", o: ["Hiçbir şey, sayı yeter", "Kampanya verisi ve karşılaştırma/deney; tek başına satış tablosu yetmez", "Daha çok sütun", "Daha büyük font"], a: 1, why: "Neden-sonuç için kontrol/karşılaştırma gerekir.", bolum: "hatalar" },
        { q: "12 siparişte 3 nakit siparişin 2'si iade. Doğru yorum hangisi?", o: ["Nakit ödeme iadeye yol açar", "Bu örneklemde nakitte iade oranı yüksek; genellenemez ve neden gösterilmez", "Tüm nakit müşteriler iade eder", "İade yalnız nakitle olur"], a: 1, why: "Küçük örneklem ve nedensellik sınırı.", bolum: "ornek" },
        { q: "Hangisi veri kalitesi sorunu DEĞİLDİR?", o: ["Aynı siparişin iki kez girilmesi", "'İstanbul' ve 'istanbul' yazımı", "Boş indirim hücresi", "Sütun adının Türkçe olması"], a: 3, why: "Dil seçimi kalite sorunu değil; diğerleri tekrar, tutarsızlık, eksik.", bolum: "terimler" }
      ],
      gecme: { olcut: "Mini sınavda %80 ve bağımsız görevde 3 sütunluk veri sözlüğü + bir genelleme sınırı.", kritik: ["Korelasyonu nedensellik saymak", "12 satırlık örneklemden tüm müşterilere genelleme"] },
      kaynaklar: [{ t: "Kişisel Verilerin Korunması Kurumu (KVKK)", u: "https://www.kvkk.gov.tr/", dogrulama: DOG, neden: "Türkiye'de kişisel veri kurumu; hukuki danışmanlık değildir." }],
      telafi: "Her sütun için tek cümlelik 'bu sütun ... demektir; boşsa ...' kalıbını yaz; sonra veri setinde tekrar/eksik/tutarsızlığı tek tek ara.", sonraki: "Sıradaki: Seviye 0 laboratuvarı (sentetik satış verisini incele), sonra Seviye 0 değerlendirmesi."
    }
  ];

  /* ---------- Lab: sentetik satış verisini incele (YEREL SİMÜLASYON: tarayıcıda doğrulanan görevler; gerçek analiz aracı yok) ---------- */
  VA.lab = {
    id: "va0-lab", ad: "Sentetik satış verisini incele", etiket: "Yerel simülasyon · tarayıcıda kural tabanlı doğrulama; gerçek elektronik tablo/SQL/Python yok",
    hedef: "Sorulara uygun sütunları seçmek, sütun türlerini doğru atamak ve verinin desteklemediği sonuçları ayırt etmek.",
    baslangic: "12 siparişlik sentetik veri seti (yukarıdaki sütunlar); boş cevaplar.",
    gorev: "3 görev: (1) soru → gerekli sütunlar, (2) sütun → veri türü, (3) ifade → veri destekliyor mu.",
    gozlem: "Her görev doğru/yanlış ve eksik/fazla öğelerle işaretlenir; hepsi doğruysa lab tamam sayılır.",
    sifirla: "'Sıfırla' cevapları temizler (kayıtlı kanıt silinmez).",
    kanit: "Doğrulanan her görev ve lab tamamı `lab` türünde kanıt olarak kaydedilir (istemci doğrulaması; sunucu kanıtı değil, bağımsızlık kanıtı değil).",
    ipucu: ["Soruyu cevaplamak için hangi hesabı yapacağını yaz; hesaba girenler gereklidir.", "Kimlik/etiket sütunu toplanmaz; kategori metindir; tarih ayrı bir türdür.", "Veride olmayan bir sütun gerekiyorsa ya da nedensellik isteniyorsa 'desteklemez'."],
    gorev1: [
      { id: "k1", soru: "Hangi şehir en yüksek ciroyu yaptı? (ciro = adet × birim fiyat)", gerekli: ["sehir", "adet", "birim_fiyat"], istege: ["indirim_orani"] },
      { id: "k2", soru: "Kaç farklı müşteri alışveriş yaptı?", gerekli: ["musteri_id"], istege: [] },
      { id: "k3", soru: "Ödeme türüne göre iade oranı nedir?", gerekli: ["odeme_turu", "iade"], istege: [] }
    ],
    turler: ["tanımlayıcı", "kategorik metin", "tam sayı", "ondalık sayı", "tarih", "evet/hayır"],
    gorev2: { siparis_id: "tanımlayıcı", tarih: "tarih", musteri_id: "tanımlayıcı", sehir: "kategorik metin", urun: "kategorik metin", adet: "tam sayı", birim_fiyat: "ondalık sayı", indirim_orani: "ondalık sayı", odeme_turu: "kategorik metin", iade: "evet/hayır" },
    gorev3: [
      { id: "i1", ifade: "En çok satılan ürün hangisidir?", destekler: true, neden: "urun ve adet sütunları var; hesaplanabilir." },
      { id: "i2", ifade: "Müşteriler neden iade ediyor?", destekler: false, neden: "İade nedeni sütunu yok; iade yalnız evet/hayır." },
      { id: "i3", ifade: "Reklam kampanyası satışları artırdı.", destekler: false, neden: "Kampanya verisi ve karşılaştırma yok; nedensellik kurulamaz." },
      { id: "i4", ifade: "Müşterilerin yaş ortalaması nedir?", destekler: false, neden: "Yaş sütunu yok." },
      { id: "i5", ifade: "Bu 12 siparişte nakit ödemelerin iade oranı kartlı ödemelerinkinden yüksektir.", destekler: true, neden: "Bu örneklemde hesaplanabilir (nakit 3 siparişte 2 iade; kart 7 siparişte 0); genellenemez ve neden göstermez." }
    ]
  };

  /* ---------- Seviye 0 değerlendirmesi (ders sorularından bağımsız yeni durum soruları) ---------- */
  VA.sinav0 = {
    id: "va0-sinav", ad: "Seviye 0 değerlendirmesi", esik: 0.8,
    sorular: [
      { q: "Bir mağaza 'müşteri sadakati düşüyor' diyor. İlk adım ne olmalı?", o: ["Hemen dashboard yapmak", "Sadakati ölçülebilir bir soruya çevirmek (örn. tekrar alışveriş oranı, dönem, kıyas)", "Daha çok veri toplamak", "Yapay zekâ kullanmak"], a: 1, bolum: "va0-1" },
      { q: "'telefon' sütunu 05321234567 gibi değerler içeriyor. Türü nedir?", o: ["Tam sayı; ortalaması alınır", "Tanımlayıcı/metin; toplanmaz", "Tarih", "Ondalık sayı"], a: 1, bolum: "va0-2" },
      { q: "Bir CSV'de 'adet' sütununda bazı hücrelerde '2 adet' yazıyor. Sorun nedir?", o: ["Sorun yok", "Sayı sütununda metin var: temizlenmeden toplanamaz", "CSV tarih tutamaz", "Sütun adı yanlış"], a: 1, bolum: "va0-2" },
      { q: "Anket verisinde yaş sütunu %40 boş. En doğru yaklaşım hangisi?", o: ["Boşları sıfır yaparak ortalama almak", "Eksik oranını ve olası nedenini raporlayıp analizi buna göre sınırlamak", "Tüm veriyi silmek", "Eksikleri rastgele doldurmak"], a: 1, bolum: "va0-3" },
      { q: "Satışlar kampanya haftasında arttı. Hangi ifade doğrudur?", o: ["Kampanya satışları artırdı", "Artış kampanya dönemiyle çakıştı; nedensellik için karşılaştırma gerekir", "Kampanya işe yaramadı", "Satış her zaman artar"], a: 1, bolum: "va0-3" }
    ]
  };
})();

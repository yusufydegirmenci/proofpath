/* Backend yolu · Faz 5 tur 5a: konu başına ders eki (anahtar = TMAP.bk dizini, 0–18).
   Benzetme + sınırı, rehberli alıştırma, bağımsız görev, yaygın hatalar, geçme ölçütü + kritik yanlış anlama,
   dış kaynak (son doğrulama tarihiyle), telafi/sonraki adım.
   Alıştırmalar yerel makinede ya da kâğıt üzerindedir; AWS konularında yalnız konsol okuma ve kâğıt tasarım vardır,
   ücretli kaynak açılmaz. Dış kaynak: yalnız HTTP 200 dönenler (curl, 2026-10-12). */
(function () {
  var E = ((window.PP_EK = window.PP_EK || {}).bk = (window.PP_EK.bk || {}));
  var DOG = "2026-10-12";
  var K = function (t, u, neden) { return { t: t, u: u, dogrulama: DOG, neden: neden }; };
  var A = "https://docs.aws.amazon.com/";

  E[0] = {
    analoji: { a: "Restoran: müşteri (istemci) siparişi garsona verir, mutfak (sunucu) hazırlar, tabak (cevap) döner; sipariş fişi HTTP isteği gibi ortak biçimdedir.", sinir: "Restoranda garson sipariş sonrası müşteriyi hatırlar; HTTP durumsuzdur, her istek kendi bilgisini taşımak zorundadır." },
    rehberli: ["Tarayıcıda bir adres aç ve geliştirici araçlarının Ağ sekmesinde tek bir isteği seç.", "İstek satırını (yöntem, yol), başlıkları ve cevabın durum kodunu kâğıda yaz.", "Aynı isteği terminalde 'curl -i http://localhost:PORT/' ile kendi yerel sunucuna at ve çıktıyı Ağ sekmesiyle karşılaştır."],
    bagimsiz: "Kendi yerel test sunucuna (örn. python -m http.server) iki farklı yola istek at; durum kodlarını ve Content-Type başlıklarını yazıp aralarındaki farkı bir paragrafta açıkla.",
    hatalar: [["İstemci ile sunucuyu cihaz sanmak", "Roller bir istek anında belirlenir; aynı program bir yerde istemci, başka yerde sunucu olabilir."], ["200 dışındaki kodları hata saymamak", "4xx istemci, 5xx sunucu kaynaklı sorunu gösterir; kodun ailesine bak."], ["HTTP'nin önceki isteği hatırladığını sanmak", "HTTP durumsuzdur; oturum bilgisi çerez ya da token ile taşınır."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen bir istek/cevap çiftinde yöntemi, yolu ve durum kodunun anlamını söyleyebilmek.", kritik: ["Sunucunun istemciyi önceki istekten hatırladığını sanmak", "4xx ile 5xx hatasının sorumlusunu karıştırmak"] },
    kaynaklar: [K("MDN: HTTP'ye genel bakış", "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview", "İstemci-sunucu akışını ve istek/cevap yapısını anlaşılır anlatır."), K("RFC 9110: HTTP Semantics", "https://www.rfc-editor.org/rfc/rfc9110", "Yöntem ve durum kodlarının resmî tanımı; ayrıntı için başvuru kaynağı.")],
    telafi: "Takıldıysan yalnız bir istek seç ve üç şeyi yaz: kim istedi, ne istedi, hangi kodla döndü.",
    sonraki: "Sıradaki konu: REST API."
  };

  E[1] = {
    analoji: { a: "Kütüphane kataloğu: her kitabın sabit bir numarası (adres) vardır; 'getir', 'ekle', 'kaldır' gibi az sayıda standart işlemle çalışılır.", sinir: "Katalogda kitap fiziksel olarak tek yerdedir; REST'te aynı kaynak birden çok istemciye aynı anda sunulur ve yöntemlerin güvenli/yinelenebilir olması (GET, PUT) önemlidir." },
    rehberli: ["Bir 'notlar' kaynağı için beş uç noktayı kâğıda yaz: liste, tek not, ekle, değiştir, sil.", "Her uç nokta için yöntemi ve başarılı cevap kodunu (200, 201, 204) belirt.", "Yol adlarında fiil değil isim kullandığını kontrol et (örn. /notlar, /notlar/7)."],
    bagimsiz: "Bir 'kitaplar' API'si tasarla: yollar, yöntemler ve kodlar tablosunu kâğıda çiz. En az bir hata durumu (404 ve 400) ekle ve hangi koşulda döneceğini yaz.",
    hatalar: [["Yola fiil koymak (/urunSil)", "Yol kaynağı, yöntem eylemi anlatır: DELETE /urunler/42."], ["Her şey için POST kullanmak", "Okuma için GET, tam değiştirme için PUT, silme için DELETE kullan ki davranış öngörülebilir olsun."], ["Hata olsa da 200 dönmek", "Durum kodu sonucu taşır; 404, 400, 401 gibi anlamlı kodlar dön."]],
    gecme: { olcut: "Mini sınavda %80 ve bir kaynak için yöntem/yol/kod tablosunu hatasız çıkarabilmek.", kritik: ["GET isteğinin veriyi değiştirebileceğini sanmak", "Durumsuz (stateless) kavramını 'sunucu hiçbir şey saklamaz' diye anlamak"] },
    kaynaklar: [K("MDN: REST sözlük maddesi", "https://developer.mozilla.org/en-US/docs/Glossary/REST", "REST'in temel fikrini kısa ve doğru özetler."), K("MDN: HTTP durum kodları", "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status", "Hangi durumda hangi kodun dönüleceğini ailelere göre listeler.")],
    telafi: "Takıldıysan tek bir kaynak adı seç ve beş işlemi (liste, oku, ekle, değiştir, sil) HTTP yöntemleriyle eşleştir.",
    sonraki: "Sıradaki konu: JSON. Geçme ölçütünü sağladıktan sonra devam et."
  };

  E[2] = {
    analoji: { a: "Alışveriş fişi: kalem adı, adet, fiyat gibi alanlar düzenli satırlarda yazar ve herkes aynı şekilde okur.", sinir: "Fişte yazı serbesttir; JSON'da sözdizimi katıdır (çift tırnak, virgül) ve yorum satırı yoktur, tek hata tüm metni geçersiz kılar." },
    rehberli: ["Bir kişi kartını (ad, yaş, etiketler) JSON olarak kâğıda yaz.", "Dosyayı 'kisi.json' olarak kaydet ve 'node -e \"JSON.parse(require('fs').readFileSync('kisi.json','utf8'))\"' ile doğrula.", "Bir virgülü kasten sil, hata mesajını oku ve düzelt."],
    bagimsiz: "İç içe bir sipariş nesnesi yaz (müşteri nesnesi + ürünler dizisi). JSON.parse ile doğrula, sonra bir alanını kodla değiştirip JSON.stringify ile geri yazdır.",
    hatalar: [["Tek tırnak kullanmak", "JSON'da dizeler ve anahtarlar yalnız çift tırnakla yazılır."], ["Sondaki virgülü bırakmak", "Son öğeden sonra virgül geçersizdir; ayrıştırma hata verir."], ["Tarihi ve sayıyı karıştırmak", "JSON'da tarih türü yoktur; metin olarak taşınır, sayılar tırnaksız yazılır."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen bozuk bir JSON'daki hataları bulup düzeltebilmek.", kritik: ["JSON'da yorum satırı yazılabileceğini sanmak", "JSON'un bir programlama dili olduğunu sanmak (yalnız veri biçimidir)"] },
    kaynaklar: [K("RFC 8259: JSON", "https://www.rfc-editor.org/rfc/rfc8259", "JSON sözdiziminin resmî ve kısa tanımı."), K("MDN: JSON ile çalışmak", "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON", "parse ve stringify kullanımını örneklerle anlatır.")],
    telafi: "Takıldıysan JSON'u iki kurala indir: anahtarlar ve metinler çift tırnakta, öğeler virgülle ayrılır ve sonda fazladan virgül olmaz.",
    sonraki: "Sıradaki konu: Veritabanı ve SQL."
  };

  E[3] = {
    analoji: { a: "Excel çalışma kitabı: her sayfa bir tablo, her satır bir kayıt; filtre WHERE, sıralama ORDER BY gibidir.", sinir: "Excel'de hücreyi kolayca bozarsın; veritabanı kısıtlar, anahtarlar ve işlemlerle tutarlılığı zorlar, JOIN ise sayfalar arası elle arama değil bildirim temelli birleştirmedir." },
    rehberli: ["Yerelde SQLite aç ('sqlite3 deneme.db') ve 'musteriler' ile 'siparisler' tablolarını oluştur.", "Birkaç satır ekle, sonra 'SELECT ... WHERE' ile süz ve 'ORDER BY' ile sırala.", "İki tabloyu 'JOIN ... ON' ile birleştir ve sonucu kâğıttaki beklentinle karşılaştır."],
    bagimsiz: "Üç tablolu mini bir kütüphane (kitaplar, üyeler, ödünç) şeması çiz, yerel SQLite'ta kur. 'Hangi üye hangi kitabı aldı?' sorusunu JOIN ile yanıtla.",
    hatalar: [["WHERE koşulunu unutup UPDATE/DELETE çalıştırmak", "Önce aynı koşulla SELECT çalıştır, doğru satırları gör, sonra değiştir."], ["JOIN'de ON koşulunu yanlış yazmak", "Yanlış koşul satır sayısını patlatır (çapraz çarpım); sonucun satır sayısını kontrol et."], ["Kullanıcı girdisini SQL metnine yapıştırmak", "Parametreli sorgu kullan; birleştirme SQL injection açar."]],
    gecme: { olcut: "Mini sınavda %80 ve iki tablo için doğru JOIN'li bir sorguyu yerelde yazıp çalıştırabilmek.", kritik: ["WHERE'siz UPDATE/DELETE'in tüm tabloyu etkileyeceğini bilmemek", "Girdiyi sorguya metin olarak eklemenin güvenli olduğunu sanmak"] },
    kaynaklar: [K("PostgreSQL öğretici: tablodan sorgulama", "https://www.postgresql.org/docs/current/tutorial-select.html", "SELECT, WHERE ve ORDER BY'ı adım adım gösterir."), K("PostgreSQL öğretici: tablolar arası birleştirme", "https://www.postgresql.org/docs/current/tutorial-join.html", "JOIN mantığını küçük örneklerle anlatır."), K("OWASP: SQL Injection Prevention Cheat Sheet", "https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html", "Parametreli sorgunun neden gerekli olduğunu savunma odaklı anlatır.")],
    telafi: "Takıldıysan yalnız tek tabloyla SELECT-WHERE-ORDER BY üçlüsünü çalıştır; JOIN'e sonra geç.",
    sonraki: "Sıradaki konu: JWT. Önce bu konunun geçme ölçütünü sağla, sonra devam et."
  };

  E[4] = {
    analoji: { a: "Konser bileği: girişte bir kez kontrol edilir, sonra her kapıda bileğe bakılır; üzerinde bitiş saati ve mühür vardır.", sinir: "Bileği kopyalamak zordur ama JWT'de payload herkes tarafından okunabilir; imza yalnız değiştirilmediğini gösterir, içeriği gizlemez." },
    rehberli: ["Örnek bir JWT'yi üç parçaya (başlık, payload, imza) noktalardan böl.", "İlk iki parçayı Base64URL olarak çöz ('node -e' ile) ve içeriğin okunabildiğini gör.", "Payload'daki 'exp' alanını ve imzanın neyi garanti ettiğini kâğıda yaz."],
    bagimsiz: "Yerelde sahte bir gizli anahtarla kendi JWT'ni üret (örn. jsonwebtoken paketi, test amaçlı). Payload'ı değiştirip imzanın doğrulamada neden düştüğünü gözle. Gerçek parola ya da canlı anahtar kullanma.",
    hatalar: [["Payload'a parola ya da gizli bilgi koymak", "Payload şifreli değildir; yalnız kimlik ve süre gibi zararsız alanlar koy."], ["Süre (exp) kontrolünü atlamak", "İmza doğru olsa bile süresi geçmiş token reddedilmelidir."], ["İstemci tarafında imzayı kontrol edebildiğini sanmak", "Doğrulama sunucuda, gizli anahtarla yapılır."]],
    gecme: { olcut: "Mini sınavda %80 ve bir JWT'nin parçalarını ve doğrulama adımlarını sıralayabilmek.", kritik: ["JWT'nin içeriğinin şifreli olduğunu sanmak", "İmzanın geçerli olması yetkinin de doğru olduğu anlamına gelir sanmak"] },
    kaynaklar: [K("RFC 7519: JSON Web Token (JWT)", "https://www.rfc-editor.org/rfc/rfc7519", "JWT'nin talepleri (exp, sub gibi) ve yapısı için resmî tanım."), K("OWASP: Authentication Cheat Sheet", "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html", "Kimlik doğrulamada güvenli uygulama ilkelerini özetler (JWT'ye özel değildir).")],
    telafi: "Takıldıysan üç soruya dön: Token'ı kim imzaladı, süresi geçti mi, içinde gizli bir şey var mı?",
    sonraki: "Sıradaki konu: Hata yönetimi ve loglama."
  };

  E[5] = {
    analoji: { a: "Uçak kara kutusu: kaza anında ne olduğunu sonradan anlamak için yolculuk boyunca kayıt tutulur; yolcuya ise sakin ve kısa bir duyuru yapılır.", sinir: "Kara kutu yalnız kazadan sonra okunur; loglar canlı izlenip alarmla birleştirilir ve içlerine kişisel veri ya da parola yazılmamalıdır." },
    rehberli: ["Küçük bir fonksiyon yaz ve içine kasten bir hata (ör. throw new Error('deneme') ya da geçersiz girdi) koy.", "Hatayı try/catch ile yakala, ayrıntıyı log'a (hata mesajı ve bağlam) yaz, kullanıcıya yalnız genel bir mesaj dön.", "Log seviyelerini (INFO, WARN, ERROR) hangi olay için kullanacağını kâğıda eşle."],
    bagimsiz: "Yerel bir betikte üç farklı olay üret (bilgi, uyarı, hata). Her biri için uygun log seviyesini seç ve log satırında parola ya da kişisel veri bulunmadığını kontrol et.",
    hatalar: [["Hatayı boş catch ile yutmak", "En azından log'a yaz; sessiz hata sonradan bulunamaz."], ["Kullanıcıya yığın izi göstermek", "Ayrıntı log'da kalsın; kullanıcıya genel mesaj ve istenirse bir olay kodu ver."], ["Log'a parola, token ya da kişisel veri yazmak", "Hassas alanları maskele ya da hiç yazma."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen bir hata senaryosunda log mesajı ile kullanıcı mesajını ayrı ayrı doğru yazabilmek.", kritik: ["Hatayı yutmanın 'sorunu çözmek' olduğunu sanmak", "Hata ayrıntısının kullanıcıya gösterilmesinin zararsız olduğunu sanmak"] },
    kaynaklar: [K("OWASP: Logging Cheat Sheet", "https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html", "Neyin loglanıp neyin loglanmaması gerektiğini anlatır."), K("OWASP: Error Handling Cheat Sheet", "https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html", "Hata mesajlarının güvenli ele alınışını özetler.")],
    telafi: "Takıldıysan hatayı iki yere ayır: geliştirici için ayrıntılı log, kullanıcı için tek cümlelik genel mesaj.",
    sonraki: "Sıradaki konu: Birim test."
  };

  E[6] = {
    analoji: { a: "Araba servisinde tek tek kontrol listesi: frenler, farlar, lastikler ayrı ayrı denenir; bir parça bozulunca hangisi olduğu hemen bellidir.", sinir: "Parçalar ayrı çalışsa da birleşince sorun çıkabilir; birim testler tek başına yeterli değildir, entegrasyon testiyle tamamlanır." },
    rehberli: ["Küçük bir fonksiyon seç (örn. KDV ekleme) ve yerelde pytest ya da unittest kur.", "Arrange-Act-Assert düzeniyle iki test yaz: normal değer ve sınır değer (0).", "Fonksiyondaki bir sayıyı kasten bozup testin kırmızıya döndüğünü gör, sonra düzelt."],
    bagimsiz: "Üç şartlı bir fonksiyon (örn. yaş aralığına göre bilet fiyatı) yaz. Her dal için en az bir test yaz ve sınır değerleri (0, 12, 65) ayrıca dene.",
    hatalar: [["Testi yalnız mutlu yola yazmak", "Sınır değer ve hatalı girdi için de test ekle."], ["Testlerin birbirine bağlı olması", "Her test bağımsız çalışmalı; sıra değişse de sonuç aynı olmalı."], ["Gerçek ağ ya da veritabanını testte kullanmak", "Birim testte dış bağımlılığı test çifti (mock) ile değiştir."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen bir fonksiyon için sınır değerleri içeren en az üç testi yazabilmek.", kritik: ["Kapsamın (coverage) yüksek olmasının hatasızlık demek olduğunu sanmak", "Test kodunun hiçbir zaman bakım gerektirmediğini sanmak"] },
    kaynaklar: [K("pytest: başlangıç rehberi", "https://docs.pytest.org/en/stable/getting-started.html", "İlk testin yazılışını ve çalıştırılışını gösterir."), K("Python belgeleri: unittest", "https://docs.python.org/3/library/unittest.html", "Standart kütüphane test çatısının resmî belgesi.")],
    telafi: "Takıldıysan tek bir fonksiyon ve tek bir assert ile başla; çalışınca ikinci teste geç.",
    sonraki: "Sıradaki konu: Git ve CI/CD."
  };

  E[7] = {
    analoji: { a: "Ortak yazılan kitap: herkes kendi kopyasında bölüm yazar (branch), editör kontrol edip ana metne ekler (PR ve birleştirme), matbaa baskıyı otomatik çıkarır (CD).", sinir: "Kitapta çakışan cümleyi editör elle çözer; Git'te çakışma (conflict) ve geri alma kuralları vardır ve otomatik hattı bozan test hataları yayını durdurur." },
    rehberli: ["Yerelde boş bir klasörde 'git init' yap, bir dosya ekle ve ilk commit'i at.", "'git switch -c ozellik/deneme' ile yeni dal aç, değişiklik yap ve commit et.", "Ana dala geri dönüp 'git merge' ile birleştir ve 'git log --oneline' ile geçmişi oku."],
    bagimsiz: "Yerel bir depoda kasten aynı satırı iki dalda farklı değiştir ve birleştirirken çıkan çakışmayı elle çöz. Sonra kâğıda 'test geçerse yayınla' diyen basit bir CI akışı çiz.",
    hatalar: [["Her şeyi tek dev commit'te toplamak", "Küçük, tek amaçlı commit'ler geri almayı ve incelemeyi kolaylaştırır."], ["Doğrudan main'e itmek", "Dal ve PR ile değiştir, CI testleri geçtikten sonra birleştir."], ["Parola ya da anahtarı depoya commit etmek", "Gizli bilgi geçmişte kalır; .gitignore ve gizli yönetimi kullan."]],
    gecme: { olcut: "Mini sınavda %80 ve yerelde dal, commit ve birleştirme akışını hatasız uygulayabilmek.", kritik: ["Commit'lenen gizli bilginin dosyadan silince tamamen yok olduğunu sanmak", "CI ile CD'nin aynı şey olduğunu sanmak (CI doğrular, CD yayınlar)"] },
    kaynaklar: [K("Pro Git kitabı", "https://git-scm.com/book/en/v2", "Git'in temel ve ileri kullanımı için resmî kitap."), K("GitHub Docs: GitHub Actions'ı anlamak", "https://docs.github.com/en/actions/about-github-actions/understanding-github-actions", "CI/CD akışının bileşenlerini tanıtır.")],
    telafi: "Takıldıysan yalnız üç komutu tekrarla: git switch -c, git commit, git merge.",
    sonraki: "Sıradaki konu: AWS Lambda ve API Gateway."
  };

  E[8] = {
    analoji: { a: "Taksi çağırmak: araç sahibi olmazsın, yalnız yolculuk sırasında ödersin; çağrı (API Gateway) şoföre (Lambda) ulaşır.", sinir: "Taksi her çağrıda hazır bulunur; Lambda'da ilk çağrıda soğuk başlangıç gecikmesi olabilir ve çalışma süresi ile bellek sınırları vardır." },
    rehberli: ["Konsolda yeni bir şey oluşturma; yalnız Lambda ve API Gateway belge sayfalarını oku ve 'olay, handler, yanıt' kavramlarını kâğıda yaz.", "Ders örneğindeki akışı (istemci, API Gateway, Lambda, JSON cevap) kutu-ok diyagramı olarak çiz.", "Ücretsiz katman sınırını ve ücretlendirme sayfasını okuyup hangi kalemlerin ücretli olabileceğini listele."],
    bagimsiz: "Kâğıt üzerinde 'GET /selam?ad=Ali' uç noktası için Lambda handler sözde kodunu (event okuma, JSON dönme) yaz. Gerçek hesapta kaynak oluşturma; maliyet riskini ve nerede durdurulacağını da not et.",
    hatalar: [["Bağlantıyı her çağrıda handler içinde kurmak", "SDK istemcisini ve bağlantıyı handler dışında bir kez kur."], ["Zaman aşımını varsayılanda bırakıp uzun iş yapmak", "Süre sınırını ve işin süresini planla; uzun işleri başka servise ver."], ["Sunucusuz olduğu için ücret çıkmaz sanmak", "İstek sayısı ve süreye göre ücret çıkar; bütçe alarmı kur."]],
    gecme: { olcut: "Mini sınavda %80 ve bir isteğin API Gateway'den Lambda'ya ve cevaba gidişini adım adım anlatabilmek.", kritik: ["'Sunucusuz' sözünün hiç sunucu olmadığı anlamına geldiğini sanmak", "Ücretsiz katmanın sınırsız olduğunu sanmak"] },
    kaynaklar: [K("AWS Lambda: nedir", A + "lambda/latest/dg/welcome.html", "Lambda'nın olay temelli çalışma modelini tanıtır."), K("Amazon API Gateway: nedir", A + "apigateway/latest/developerguide/welcome.html", "API Gateway'in rolünü ve uç nokta türlerini anlatır."), K("AWS Lambda en iyi uygulamalar", A + "lambda/latest/dg/best-practices.html", "Handler dışı başlatma gibi performans ilkelerini içerir.")],
    telafi: "Takıldıysan akışı üç kutuya indir: istemci, API Gateway, Lambda; her okun üstüne ne taşındığını yaz.",
    sonraki: "Sıradaki konu: DynamoDB ve S3."
  };

  E[9] = {
    analoji: { a: "Arşiv deposu ile fihrist: S3 büyük kutuları (dosyaları) saklayan depo, DynamoDB ise hangi kutunun nerede olduğunu hızla bulduran fihrist kartlarıdır.", sinir: "Fihristte aradığın kartı doğrudan bulursun; DynamoDB'de de erişim anahtarla hızlıdır ama anahtar dışında sorgu için ek tasarım (indeks) gerekir." },
    rehberli: ["Konsolda kaynak oluşturma; belge sayfalarını okuyup S3'ün nesne, DynamoDB'nin tablo/kayıt modelini kâğıda yaz.", "Bir fotoğraflı profil için hangi verinin S3'te, hangisinin DynamoDB'de duracağını iki sütunda ayır.", "Kullanıcı kaydındaki 'foto' alanının S3 yolunu nasıl gösterdiğini oklarla çiz."],
    bagimsiz: "Bir 'ürün kataloğu' için kâğıt üzerinde tasarım yap: ürün görselleri S3'te, ürün bilgileri DynamoDB'de. Partition key'i seç ve nedenini bir cümleyle yaz. Gerçek kaynak açma; depolama ve istek ücretlerini not et.",
    hatalar: [["Büyük dosyayı DynamoDB kaydına gömmek", "Büyük nesneleri S3'e koy, kayıtta yalnız yolunu tut."], ["Partition key'i az farklı değerli seçmek", "Yük tek bölüme yığılır; yaygın dağılan bir anahtar seç."], ["S3 bucket'ını herkese açık bırakmak", "Varsayılan olarak erişimi kapalı tut ve yetkiyi IAM ile ver."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen bir veri için S3 mü DynamoDB mi uygun olduğunu gerekçesiyle seçebilmek.", kritik: ["DynamoDB'nin her türlü sorguyu indekssiz yapabildiğini sanmak", "S3'ün bir dosya sistemi ya da veritabanı olduğunu sanmak"] },
    kaynaklar: [K("Amazon S3: nedir", A + "AmazonS3/latest/userguide/Welcome.html", "Nesne depolama kavramlarını tanıtır."), K("Amazon DynamoDB: giriş", A + "amazondynamodb/latest/developerguide/Introduction.html", "Tablo, öğe ve anahtar kavramlarını anlatır."), K("DynamoDB: partition key tasarımı", A + "amazondynamodb/latest/developerguide/bp-partition-key-design.html", "Anahtar seçiminin dağılım ve performansa etkisini açıklar.")],
    telafi: "Takıldıysan veriyi ikiye ayır: büyük ve nadiren sorgulanan (S3), küçük ve hızlı bulunacak (DynamoDB).",
    sonraki: "Sıradaki konu: IAM ve Secrets Manager."
  };

  E[10] = {
    analoji: { a: "Otel kartı ve kasa: oda kartı yalnız kendi odanı açar (en az yetki), kıymetliler resepsiyon kasasında durur ve kapı koduna yazılmaz.", sinir: "Kart kaybolursa iptal edilir ve yenisi basılır; bulutta da anahtar sızarsa döndürmek ve geçmiş kullanımı incelemek gerekir, sızıntı sonradan geri alınamaz." },
    rehberli: ["Konsolda değişiklik yapma; IAM en iyi uygulamalar sayfasını oku ve 'en az yetki' ilkesini kendi cümlenle yaz.", "Bir Lambda'nın yalnız 'urunler' tablosunu okuması için gereken eylemi ve kaynağı kâğıda JSON politika taslağı olarak çiz.", "Koda gömülü bir parolanın neden risk olduğunu ve yerine neyin kullanılacağını yaz."],
    bagimsiz: "Kâğıt üzerinde üç servisli bir uygulama için (Lambda, DynamoDB, S3) her biri için ayrı rol ve minimum yetki listesi hazırla. Hiçbir yerde '*' kullanmadan yaz ve nedenini belirt.",
    hatalar: [["Politikada her eylem ve kaynak için '*' kullanmak", "Yalnız gereken eylemi ve belirli kaynağı yaz."], ["Sırrı kod ya da ortam dosyasıyla depoya göndermek", "Sırları Secrets Manager gibi bir kasada tut ve rol ile oku."], ["Günlük işte root kullanmak", "Root'u kilitle, MFA koy; günlük iş için dar yetkili kullanıcı/rol kullan."]],
    gecme: { olcut: "Mini sınavda %80 ve bir görev için en az yetkili politika taslağını yazabilmek.", kritik: ["Yönetici yetkisinin kolaylık için sorun olmadığını sanmak", "Silinen commit'teki sırrın artık güvende olduğunu sanmak"] },
    kaynaklar: [K("AWS IAM: en iyi uygulamalar", A + "IAM/latest/UserGuide/best-practices.html", "En az yetki ve geçici kimlik bilgisi ilkelerini toplu verir."), K("AWS Secrets Manager: giriş", A + "secretsmanager/latest/userguide/intro.html", "Sırların saklanması ve döndürülmesi fikrini açıklar."), K("OWASP: Secrets Management Cheat Sheet", "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html", "Sır yönetimini sağlayıcıdan bağımsız ilkelerle anlatır.")],
    telafi: "Takıldıysan tek bir rol seç ve sor: Bu rol yalnız hangi eylemi, hangi kaynakta yapmalı?",
    sonraki: "Sıradaki konu: CloudWatch ve hata ayıklama."
  };

  E[11] = {
    analoji: { a: "Arabanın gösterge paneli: hız ve yakıt göstergeleri metrik, uyarı lambası alarm, bakım defteri ise log'tur.", sinir: "Panel yalnız ölçülenleri gösterir; ölçülmeyen bir sorun görünmez ve alarmı çok hassas kurarsan gereksiz uyarılarla gerçek sorun gözden kaçar." },
    rehberli: ["Konsolda kaynak açmadan CloudWatch belgesini oku ve log, metrik, alarm üçlüsünü kâğıda yaz.", "Ders örneğindeki 'timeout after 3s' logundan hangi çıkarımı yapacağını adım adım yaz.", "Bir alarmın eşiğini ve bildirim yolunu (kim uyarılacak) tasarla."],
    bagimsiz: "Kâğıt üzerinde bir API için üç metrik (hata sayısı, süre, istek sayısı) ve iki alarm eşiği belirle. Her alarm tetiklenince ilk bakacağın log ve adımı sırala.",
    hatalar: [["Yalnız hata olunca log'a bakmak", "Normal durumun metriklerini de izle ki sapmayı fark edebil."], ["Eşiği keyfî seçmek", "Gerçek trafiğe bakıp makul bir eşik belirle ve zamanla ayarla."], ["Log'u sonsuza kadar saklamak", "Saklama süresini ayarla; aksi halde depolama ücreti birikir."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen bir belirtiden hangi metriğe ve loga bakılacağını söyleyebilmek.", kritik: ["Log ile metriğin aynı şey olduğunu sanmak", "Alarmın sorunu kendiliğinden çözdüğünü sanmak (yalnız haber verir)"] },
    kaynaklar: [K("Amazon CloudWatch: nedir", A + "AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html", "Metrik, alarm ve izleme kavramlarını tanıtır."), K("CloudWatch Logs: nedir", A + "AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html", "Log grubu ve akışı kavramlarını açıklar.")],
    telafi: "Takıldıysan sorunu üçe ayır: ne oldu (log), ne kadar oldu (metrik), kim haberdar edilecek (alarm).",
    sonraki: "Sıradaki konu: Bulut ve AWS hesabı."
  };

  E[12] = {
    analoji: { a: "Elektrik aboneliği: santral kurmazsın, kullandığın kadar ödersin; ama sayaca ve faturaya bakmak sana kalır, açık unutulan cihaz faturayı şişirir.", sinir: "Elektrikte tüketim fiziksel olarak sınırlıdır; bulutta hatalı bir döngü ya da unutulan kaynak beklenmedik büyüklükte fatura çıkarabilir, bu yüzden bütçe alarmı şarttır (Budgets yalnız uyarır, harcamayı kendisi durdurmaz)." },
    rehberli: ["Hesap açmadan önce AWS bulut türleri ve global altyapı sayfalarını oku; bölge ve erişilebilirlik bölgesi (AZ) farkını yaz.", "Yeni hesapta ilk dört adımı (root'a MFA, IAM kullanıcı, fatura alarmı, bölge) kâğıda sırala.", "Bütçe (Budgets) sayfasını oku ve bir aylık 10 USD'lik bütçe için uyarı eşiklerini planla."],
    bagimsiz: "Kâğıt üzerinde bir 'hesap güvenlik ve maliyet kontrol listesi' hazırla (en az sekiz madde). Kullanılmayan kaynağı durdurmak ile silmenin faturayı nasıl etkilediğini örnekle açıkla (durdurulan kaynağın diski ve sabit adresi ücretlenebilir). Gerçek hesap açma ya da kaynak başlatma.",
    hatalar: [["Günlük işte root kullanıcıyı kullanmak", "Root'a MFA koy ve kilitle; günlük iş için IAM kullanıcısı ya da rol kullan."], ["Bütçe alarmı kurmamak", "Kaynak açmadan önce Budgets ile uyarı kur."], ["Bölgeyi bilmeden kaynak açmak", "Kaynaklar bölgeye bağlıdır; hangi bölgede çalıştığını bil ve gereksiz bölgelerde kaynak bırakma."]],
    gecme: { olcut: "Mini sınavda %80 ve yeni bir hesap için güvenlik ve maliyet adımlarını doğru sırayla sayabilmek.", kritik: ["Ücretsiz katmanın her kaynak için sınırsız olduğunu sanmak", "Kaynağı kullanmadığı sürece fatura çıkmayacağını sanmak (depolama ve açık kaynaklar ücretlenir)"] },
    kaynaklar: [K("AWS: bulut bilişim türleri", A + "whitepapers/latest/aws-overview/types-of-cloud-computing.html", "Bulutun hizmet modellerini kısa özetler."), K("AWS: küresel altyapı", A + "whitepapers/latest/aws-overview/global-infrastructure.html", "Bölge ve erişilebilirlik bölgesi kavramlarını açıklar."), K("AWS Budgets: maliyetleri yönetmek", A + "cost-management/latest/userguide/budgets-managing-costs.html", "Bütçe ve uyarı kurma mantığını anlatır."), K("AWS IAM: root kullanıcı", A + "IAM/latest/UserGuide/id_root-user.html", "Root kullanıcının neden korunması gerektiğini açıklar.")],
    telafi: "Takıldıysan dört adımı ezberle: root'a MFA, IAM kullanıcısı, bütçe alarmı, bölge seçimi.",
    sonraki: "Sıradaki konu: AWS CLI ve SDK."
  };

  E[13] = {
    analoji: { a: "Restoranda menüden tek tek sipariş vermek (konsol) yerine yazılı sipariş listesi (CLI/SDK) bırakmak: her gün aynı liste, aynı sonuç.", sinir: "Liste aynı işi tekrar eder ama yanlış yazılırsa yanlışı da tekrar eder; betik gerçek hesapta silme ve ücret yaratabilir, bu yüzden önce okuma komutlarıyla başla." },
    rehberli: ["CLI kurulum ve yapılandırma sayfalarını oku; 'profil' ve kimlik bilgisi dosyasının işlevini kâğıda yaz.", "Yerelde 'aws --version' ile kurulumu kontrol et (kimlik bilgisi girmeden).", "Ders örneğindeki boto3 kodunu oku ve her satırın ne yaptığını yorumla; yalnız okuma çağrıları (list) içerdiğini işaretle."],
    bagimsiz: "Kâğıt üzerinde 'bucket'ları listele ve sayısını yazdır' betiğinin sözde kodunu yaz. Hangi komutların yalnız okuma, hangilerinin değiştirici olduğunu iki sütunda ayır ve değiştiricileri çalıştırmadan önce neyi kontrol edeceğini yaz.",
    hatalar: [["Erişim anahtarını koda ya da depoya yazmak", "Kimlik bilgisini profil dosyasında ya da rolden al; koda gömme."], ["Profili belirtmeden komut çalıştırmak", "Yanlış hesapta işlem yapabilirsin; --profile ile açık yaz."], ["Silme komutlarını önce denemeden çalıştırmak", "Önce okuma/list komutuyla neyin etkileneceğini gör."]],
    gecme: { olcut: "Mini sınavda %80 ve bir görev için doğru profil ile okuma-komutu planını yazabilmek.", kritik: ["Erişim anahtarını koda yazmanın kabul edilebilir olduğunu sanmak", "CLI komutunun her zaman geri alınabilir olduğunu sanmak"] },
    kaynaklar: [K("AWS CLI: giriş", A + "cli/latest/userguide/cli-chap-welcome.html", "CLI'nin ne işe yaradığını tanıtır."), K("AWS CLI: yapılandırma ve kimlik bilgisi dosyaları", A + "cli/latest/userguide/cli-configure-files.html", "Profil ve kimlik bilgisi dosyalarının yapısını gösterir."), K("Boto3 (AWS SDK for Python) belgeleri", "https://boto3.amazonaws.com/v1/documentation/api/latest/index.html", "Python SDK'sının kullanımı için resmî belge.")],
    telafi: "Takıldıysan yalnız bir okuma komutunu (list) ve profil kavramını çalış; değiştirici komutlara sonra geç.",
    sonraki: "Sıradaki konu: NoSQL."
  };

  E[14] = {
    analoji: { a: "Dosya dolabı ile fiş kutusu: ilişkisel veritabanı düzenli klasör ve ek formlar, belge tipi NoSQL ise her müşteri için tek bir zarfın içinde bütün evrakın durmasıdır.", sinir: "Zarf tek müşteri için hızlıdır ama 'tüm müşterilerin toplam cirosu' gibi farklı bir soru için zarfları tek tek açmak gerekir; esneklik tutarlılık ve sorgu kolaylığından ödün verir." },
    rehberli: ["Aynı veriyi (müşteri ve siparişler) önce iki tablo olarak, sonra tek bir belge olarak kâğıda yaz.", "Her biçimde 'Ali'nin siparişlerini getir' ve 'tüm siparişleri ürüne göre topla' sorularını nasıl yanıtlayacağını karşılaştır.", "Ders örneğindeki dört kavramı (anahtar-değer, belge, esnek şema, ödünleşim) birer cümleyle açıkla."],
    bagimsiz: "Bir blog için iki tasarım yap: ilişkisel (yazarlar, yazılar, yorumlar) ve belge (yazı içinde yorumlar). Hangi sorgunun hangisinde kolay olduğunu yaz ve hangisini seçeceğini gerekçelendir.",
    hatalar: [["NoSQL'de şema olmadığı için tasarım gerekmediğini sanmak", "Esnek şema da sorgu kalıplarına göre planlanmalıdır."], ["Her ilişkiyi belgeye gömmek", "Büyüyen ya da sık değişen veri ayrı tutulmalı; belge boyut sınırlarını göz önüne al."], ["NoSQL'in SQL'den her zaman hızlı olduğunu sanmak", "Hız erişim kalıbına bağlıdır; uygun sorgu için uygun model seç."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen bir senaryo için ilişkisel mi belge modeli mi uygun olduğunu gerekçeyle söyleyebilmek.", kritik: ["NoSQL'in her zaman SQL'in yerini aldığını sanmak", "Şemasız olmanın veri kalitesi sorunu çıkarmayacağı anlamına geldiğini sanmak"] },
    kaynaklar: [K("Amazon DynamoDB: giriş", A + "amazondynamodb/latest/developerguide/Introduction.html", "Anahtar-değer ve belge tabanlı NoSQL'in bir örneğini tanıtır."), K("DynamoDB: ad kuralları ve veri türleri", A + "amazondynamodb/latest/developerguide/HowItWorks.NamingRulesDataTypes.html", "Belge/liste/harita gibi veri türlerini gösterir.")],
    telafi: "Takıldıysan önce 'hangi sorguyu sık soracağım?' sorusunu yaz; modeli buna göre seç.",
    sonraki: "Sıradaki konu: DynamoDB indeks ve kapasite."
  };

  E[15] = {
    analoji: { a: "Kitabın içindekiler ve dizin sayfaları: ana düzen bölüm sırasıdır (partition key), 'konuya göre bul' için ayrı bir dizin (GSI) eklenir.", sinir: "Dizin sayfası kitabı kalınlaştırır ve güncel tutmak gerekir; GSI de ek depolama ve yazma maliyeti getirir, her sorgu için ayrı indeks açmak mantıklı değildir." },
    rehberli: ["Kâğıtta 'kullanici' tablosunu çiz (userId partition key) ve 'e-postaya göre bul' isteğinin neden Query ile yapılamadığını yaz.", "Bu istek için e-posta üzerinde GSI tasarla ve hangi alanların indekse yansıtılacağını seç.", "Kapasite sayfasını oku; on-demand ile provisioned farkını ve ne zaman hangisini seçeceğini iki satırda özetle."],
    bagimsiz: "Bir sipariş tablosu için üç erişim kalıbı yaz (kullanıcıya göre, duruma göre, tarihe göre). Hangileri için GSI gerektiğini belirle ve toplam indeks sayısını azaltmanın yollarını düşün. Gerçek tablo açma; kapasite ücretini not et.",
    hatalar: [["Scan ile her şeyi taramak", "Tüm tabloyu okumak yavaş ve pahalıdır; anahtar ya da indeksle Query kullan."], ["Her sorgu için GSI açmak", "İndeks yazma maliyetini artırır; yalnız gerçek erişim kalıpları için aç."], ["Trafiği bilmeden sabit kapasite seçmek", "Bilmiyorsan on-demand ile başla, düzeni gördükten sonra karar ver."]],
    gecme: { olcut: "Mini sınavda %80 ve ana anahtarla yanıtlanamayan bir sorgu için doğru indeks tasarımını çizebilmek.", kritik: ["Query ile Scan'in maliyetinin aynı olduğunu sanmak", "GSI'nin ücretsiz olduğunu sanmak"] },
    kaynaklar: [K("DynamoDB: Global Secondary Index", A + "amazondynamodb/latest/developerguide/GSI.html", "GSI'nin ne olduğunu ve nasıl çalıştığını anlatır."), K("DynamoDB: okuma/yazma kapasite modları", A + "amazondynamodb/latest/developerguide/capacity-mode.html", "On-demand ve provisioned modların farkını açıklar.")],
    telafi: "Takıldıysan sorguyu tek cümleye indir: 'X'e göre bul'. X ana anahtar değilse indeks gerekir.",
    sonraki: "Sıradaki konu: RDS. Önce bu konunun geçme ölçütünü sağla, sonra devam et."
  };

  E[16] = {
    analoji: { a: "Kiralık bakımlı daire: tesisat ve yama işini yönetim yapar, sen yalnız eşyalarına bakarsın; yedek daire (Multi-AZ) ana daire arızalanınca devreye girer.", sinir: "Yedek daire yalnız arıza içindir, ek oturma alanı sağlamaz; Multi-AZ okuma kapasitesini artırmaz, bunun için okuma kopyası gerekir ve yönetilen servis de sorgu performansını senin yerine ayarlamaz." },
    rehberli: ["Konsolda kaynak açma; Multi-AZ ve okuma kopyası belge sayfalarını oku ve ikisinin amacını iki sütunda ayır.", "Üretim veritabanı için gereken üç ayarı (Multi-AZ, okuma kopyası, yedek saklama süresi) kâğıda sırala ve her birinin nedenini yaz.", "Ücret kalemlerini (örnek saati, depolama, yedek, veri aktarımı) listele."],
    bagimsiz: "Kâğıt üzerinde rapor sorguları yüzünden yavaşlayan bir uygulama için çözüm tasarla. Hangisinin yedeklilik, hangisinin okuma ölçekleme olduğunu belirt. Gerçek RDS örneği açma; açık kalan örneğin maliyetini yaz.",
    hatalar: [["Multi-AZ'yi okuma ölçekleme sanmak", "Multi-AZ yedeklilik içindir; okuma yükü için okuma kopyası ekle."], ["Yedek saklama süresini kısa bırakmak", "Kurtarma ihtiyacına göre saklama süresini bilinçli seç."], ["Kullanılmayan RDS örneğini açık bırakmak", "Açık örnek saatlik ücret yazar; işin bitince durdur ya da sil."]],
    gecme: { olcut: "Mini sınavda %80 ve bir ihtiyaç için Multi-AZ mi okuma kopyası mı gerektiğini gerekçeyle seçebilmek.", kritik: ["Multi-AZ'nin okuma performansını artırdığını sanmak", "Yönetilen veritabanının yedek ve maliyet sorumluluğunu tamamen üstlendiğini sanmak"] },
    kaynaklar: [K("Amazon RDS: Multi-AZ", A + "AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html", "Multi-AZ'nin yedeklilik amacını anlatır."), K("Amazon RDS: okuma kopyaları", A + "AmazonRDS/latest/UserGuide/USER_ReadRepl.html", "Okuma yükünü dağıtmak için okuma kopyasını açıklar.")],
    telafi: "Takıldıysan tek soruyla ayır: Amaç kesintiyi önlemek mi (Multi-AZ), yoksa okuma yükünü dağıtmak mı (okuma kopyası)?",
    sonraki: "Sıradaki konu: ElastiCache."
  };

  E[17] = {
    analoji: { a: "Masanın üstündeki sık kullanılan kitaplar: raf (veritabanı) uzaktadır, sık bakılanlar masada durur ve yer dolunca ya da eskiyince yenilenir.", sinir: "Masadaki kitap eski baskı kalmış olabilir; önbellekte de veri bayatlayabilir (TTL ile sınırlanır) ve önbelleğin boşaldığı anda tüm yük veritabanına biner." },
    rehberli: ["Ders örneğindeki cache-aside akışını (get, miss ise DB'den al, set) kâğıda akış şeması olarak çiz.", "Yerelde basit bir sözlükle (dict) önbellek simüle et: ilk çağrı yavaş (sleep), ikinci çağrı hızlı olsun.", "TTL'in dolmasıyla verinin yeniden DB'den alındığını çıktıda göster."],
    bagimsiz: "Yerel bir betikte 'yavaş' bir fonksiyonu (sleep ile) önbellekle hızlandır, TTL ekle. Veri değişince önbelleğin bayat kalma riskini ve çözümünü (silme ya da kısa TTL) kısa bir notla yaz. Bulutta gerçek önbellek açma.",
    hatalar: [["TTL koymamak", "Süre koymazsan veri bayatlar ve bellek dolar; makul bir süre belirle."], ["Önbelleği asıl veri kaynağı saymak", "Önbellek geçicidir; asıl veri veritabanında olmalı."], ["Her şeyi önbelleğe almak", "Yalnız sık okunan ve nadir değişen veriyi önbelleğe al."]],
    gecme: { olcut: "Mini sınavda %80 ve cache hit/miss akışını adım adım anlatabilmek.", kritik: ["Önbellekteki verinin her zaman güncel olduğunu sanmak", "Önbelleğin veritabanının yerine geçtiğini sanmak"] },
    kaynaklar: [K("ElastiCache: önbellek stratejileri", A + "AmazonElastiCache/latest/dg/Strategies.html", "Lazy loading ve write-through gibi stratejileri ve TTL'i açıklar."), K("Redis belgeleri", "https://redis.io/docs/latest/develop/", "Redis'in veri yapıları ve kullanımı için resmî belge.")],
    telafi: "Takıldıysan akışı üç adıma indir: önce önbelleğe bak, yoksa veritabanından al, sonra önbelleğe süreyle yaz.",
    sonraki: "Sıradaki konu: Step Functions."
  };

  E[18] = {
    analoji: { a: "Trafik akış şeması ve görev panosu: her adımın sırası, başarısızlıkta ne yapılacağı ve yeniden deneme sayısı panoda yazılıdır, kimse akışı aklında tutmaz.", sinir: "Pano akışı gösterir ama işi kendisi yapmaz; her adım hâlâ bir Lambda ya da servise bağlıdır ve her durum geçişi ücretlendirilir, çok küçük işler için akış kurmak gereksiz maliyet olabilir." },
    rehberli: ["Ders örneğindeki sipariş akışını (SiparisAl, OdemeAl, Choice, StokAyir, KargoOlustur, iptal) kutu-ok olarak çiz.", "OdemeAl adımı için Retry (3 deneme) ve Catch (iptale git) kurallarını kâğıda yaz.", "Standard ile Express iş akışı farkını belge sayfasından oku ve hangisinin ne zaman uygun olduğunu bir cümleyle yaz."],
    bagimsiz: "Kâğıt üzerinde bir 'kullanıcı kaydı' akışı tasarla (doğrulama, hesap oluşturma, e-posta gönderme, hata halinde geri alma). Her adımdaki hata davranışını belirt. Gerçek state machine kurma; durum geçişi ücretini not et.",
    hatalar: [["Geçici bir hatada Retry tanımlamamak", "Ağ gibi geçici hatalar için sınırlı Retry ve bekleme tanımla."], ["Catch olmadan hatayı akışın çökmesine bırakmak", "Hata durumunda telafi adımına (iptal, bildirim) yönlendir."], ["Her işi Step Functions'a taşımak", "Tek adımlık basit işler için Lambda yeterlidir; çok adımlı ve hata yönetimi gereken işlerde kullan."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen bir iş akışını durumlar, yeniden deneme ve hata yakalamayla çizebilmek.", kritik: ["Step Functions'ın işi kendisinin yaptığını sanmak", "Retry'ın sınırsız denemenin güvenli olduğu anlamına geldiğini sanmak"] },
    kaynaklar: [K("AWS Step Functions: nedir", A + "step-functions/latest/dg/welcome.html", "State machine, durumlar ve akış mantığını tanıtır.")],
    telafi: "Takıldıysan akışı yalnız mutlu yolla çiz; sonra her adıma 'başarısız olursa ne olur?' sorusunu ekle.",
    sonraki: "Sıradaki konu: SQS ve DLQ."
  };
})();

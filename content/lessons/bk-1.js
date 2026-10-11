/* Backend / AWS · sabit dersler 1-6 */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).bk = (window.PP_LESSONS.bk || {}));
  var MDN = { title: "MDN: HTTP", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP", type: "doc", level: "başlangıç", lang: "EN" };
  var GIT = { title: "Pro Git (ücretsiz kitap)", url: "https://git-scm.com/book/en/v2", type: "doc", level: "başlangıç", lang: "EN" };
  function res(a, why) { var o = {}; for (var k in a) o[k] = a[k]; o.why = why; return o; }

  /* 1 ─────────────────────────────── HTTP ve REST */
  L[1] = {
    hook: "Tarayıcıda bir butona basınca arkada ne olur? Cevap: bir HTTP isteği gider, bir cevap döner.",
    homework: "Tarayıcıda herhangi bir sitenin Geliştirici Araçları > Ağ sekmesini aç. Bir isteğin yöntemini, durum kodunu ve bir başlığını yaz.",
    warmup: {
      recap: [{ point: "İstemci ister, sunucu cevap verir.", example: "Tarayıcı → web sunucusu" }],
      concepts: [
        { term: "HTTP method", tr: "HTTP yöntemi", summary: "İsteğin ne yapmak istediğini söyler: GET okur, POST oluşturur, PUT/PATCH günceller, DELETE siler.", example: "GET /users/5" },
        { term: "Status code", tr: "Durum kodu", summary: "Sonucu söyleyen üç haneli sayı. 2xx başarı, 4xx istemci hatası, 5xx sunucu hatası.", example: "404 Not Found" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Mobil uygulama bir kullanıcının siparişlerini göstermek istiyor. Backend'e GET /users/5/orders isteği gönderir, sunucu JSON ile 200 OK döner. Bu dili bilmeden hiçbir API'yi kullanamaz ya da yazamazsın." },
      { t: "steps", h: "Bir isteğin parçaları", items: [
        "Yöntem + yol: GET /orders/42",
        "Başlıklar (headers): Content-Type, Authorization, Accept",
        "Gövde (body): POST ve PUT ile gönderilen veri, çoğunlukla JSON",
        "Cevap: durum kodu + başlıklar + gövde"
      ] },
      { t: "steps", h: "Önemli durum kodları", items: [
        "200 OK, 201 Created, 204 No Content",
        "301/302 yönlendirme",
        "400 Bad Request (hatalı istek), 401 Unauthorized (kimlik yok), 403 Forbidden (yetki yok), 404 Not Found, 429 Too Many Requests",
        "500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable"
      ] },
      { t: "box", h: "REST fikri", text: "Kaynaklar isimle (çoğul isim) adlandırılır: /users, /orders/42. Eylemi yöntem belirler: GET okur, POST oluşturur, PUT tamamen değiştirir, PATCH kısmen günceller, DELETE siler. Sunucu istekler arasında oturum tutmaz (stateless): her istek kendine yeter." },
      { t: "box", h: "Güvenli ve idempotent", text: "GET güvenlidir (veriyi değiştirmez). GET, PUT, DELETE idempotenttir: aynı isteği 5 kez göndermek 1 kez göndermekle aynı sonucu bırakır. POST genelde idempotent değildir; bu yüzden tekrar denemede çift sipariş riski vardır." },
      { t: "warn", h: "Tuzak", text: "401 ve 403 karıştırılır. 401: kim olduğunu bilmiyorum (giriş yok/geçersiz). 403: kim olduğunu biliyorum ama yetkin yok." }
    ],
    quiz: [
      { q: "Var olan bir kaydı tamamen değiştirmek için hangi yöntem kullanılır?", options: ["PUT", "GET", "DELETE", "OPTIONS"], answer: "PUT", why: "PUT kaynağı tamamen değiştirir; kısmi güncelleme için PATCH kullanılır." },
      { q: "Kimliği doğrulanmış ama yetkisi olmayan kullanıcıya hangi kod döner?", options: ["403", "401", "404", "500"], answer: "403", why: "403 Forbidden: kimlik tamam, yetki yok. 401 kimlik doğrulama eksikliğidir." },
      { q: "Aşağıdakilerden hangisi idempotenttir?", options: ["DELETE /orders/5", "POST /orders", "Her seferinde yeni sipariş oluşturan istek", "Sayaç artıran istek"], answer: "DELETE /orders/5", why: "Aynı kaydı tekrar silmek durumu değiştirmez." },
      { q: "Başarıyla oluşturulan kaynak için tipik durum kodu hangisidir?", options: ["201", "204", "301", "503"], answer: "201", why: "201 Created, yeni kaynağın oluşturulduğunu bildirir." },
      { q: "REST'te 'stateless' ne demektir?", options: ["Sunucu istekler arasında oturum durumu tutmaz", "Veritabanı yoktur", "Sadece GET kullanılır", "Cevap boştur"], answer: "Sunucu istekler arasında oturum durumu tutmaz", why: "Her istek gereken tüm bilgiyi taşır." }
    ],
    interview: [
      { q: "PUT ve PATCH arasındaki fark nedir?", a: "PUT kaynağı gönderilen tam gövdeyle değiştirir. PATCH sadece gönderilen alanları günceller. PUT idempotenttir, PATCH tasarıma bağlıdır." },
      { q: "401 ile 403 farkı nedir?", a: "401 kimlik doğrulamanın eksik ya da geçersiz olduğunu, 403 kimliğin bilindiği ama yetkinin olmadığını söyler." },
      { q: "İdempotency neden önemli?", a: "Ağ hatasında istemci isteği tekrar dener. İşlem idempotent değilse çift kayıt veya çift ödeme oluşabilir. Bu yüzden POST için idempotency anahtarı kullanılır." }
    ],
    vocab: [
      { term: "Request", tr: "istek", ex: "Send a request to the API." },
      { term: "Response", tr: "cevap", ex: "The response contains JSON." },
      { term: "Endpoint", tr: "uç nokta", ex: "Call the /users endpoint." },
      { term: "Header", tr: "başlık", ex: "Add an Authorization header." },
      { term: "Idempotent", tr: "tekrarlanabilir (aynı sonuç)", ex: "PUT is idempotent." }
    ],
    resources: [
      res(MDN, "Yöntemler ve durum kodları için en iyi referans"),
      { title: "restfulapi.net: REST nedir?", url: "https://restfulapi.net/", type: "doc", why: "REST ilkeleri", level: "başlangıç", lang: "EN" }
    ],
    sources: [MDN]
  };

  /* 2 ─────────────────────────────── JSON */
  L[2] = {
    hook: "Servisler birbirleriyle çoğunlukla aynı dilde konuşur: JSON.",
    homework: "Kendini anlatan bir JSON yaz: ad, yaş, beceriler (liste) ve adres (iç içe nesne). Sonra bir JSON doğrulayıcıda dene.",
    warmup: {
      recap: [{ point: "API cevabının gövdesi çoğunlukla JSON'dur.", example: "Content-Type: application/json" }],
      concepts: [
        { term: "JSON", tr: "JavaScript nesne gösterimi", summary: "Anahtar-değer çiftlerinden oluşan metin tabanlı veri biçimi.", example: "{\"ad\":\"Ali\"}" },
        { term: "Serialization", tr: "Serileştirme", summary: "Bellekteki nesneyi metne (JSON) çevirmek. Tersi: ayrıştırma (parse).", example: "JSON.stringify(obj)" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Lambda'ya bir olay JSON olarak gelir, DynamoDB öğeleri, CloudFormation şablonları, IAM politikaları da JSON'dur. Bir virgül hatası dağıtımı bozar." },
      { t: "steps", h: "Kurallar", items: [
        "Anahtarlar çift tırnaklı metin olmalı: \"ad\".",
        "Değer türleri: metin, sayı, true/false, null, nesne {}, dizi [].",
        "Yorum satırı yoktur; son elemandan sonra virgül konmaz.",
        "Tek tırnak geçersizdir."
      ] },
      { t: "cmd", text: "{\n  \"id\": 42,\n  \"ad\": \"Ali\",\n  \"aktif\": true,\n  \"etiketler\": [\"aws\", \"backend\"],\n  \"adres\": { \"sehir\": \"Ankara\" },\n  \"not\": null\n}" },
      { t: "box", h: "Sık kullanılan işlemler", text: "Ayrıştırma: JSON.parse(metin) veya Python'da json.loads(metin). Metne çevirme: JSON.stringify(nesne) veya json.dumps(nesne). Komut satırında jq ile süzme: jq '.adres.sehir' dosya.json" },
      { t: "box", h: "YAML ile ilişki", text: "CloudFormation ve SAM şablonları YAML veya JSON olabilir. YAML girinti ile çalışır ve yorum destekler; JSON katıdır ama her yerde desteklenir." },
      { t: "warn", h: "Tuzak", text: "Sayı ile metin karışır: \"5\" ve 5 farklıdır. Ayrıca tarih için JSON'un özel türü yoktur; ISO 8601 metni (2026-10-11T09:00:00Z) kullanılır." }
    ],
    quiz: [
      { q: "Aşağıdakilerden hangisi geçerli JSON'dur?", options: ["{\"ad\":\"Ali\"}", "{ad:'Ali'}", "{'ad':'Ali'}", "{\"ad\":\"Ali\",}"], answer: "{\"ad\":\"Ali\"}", why: "Anahtarlar çift tırnakta olmalı ve sondaki virgül yasak." },
      { q: "JSON'da hangisi desteklenmez?", options: ["Yorum satırı", "Dizi", "null", "İç içe nesne"], answer: "Yorum satırı", why: "JSON yorum desteklemez." },
      { q: "Metni nesneye çevirmeye ne denir?", options: ["Parse (ayrıştırma)", "Stringify", "Hash", "Encrypt"], answer: "Parse (ayrıştırma)", why: "JSON.parse metni nesneye çevirir." },
      { q: "Komut satırında JSON'dan alan süzmek için hangi araç kullanılır?", options: ["jq", "ping", "curl -I", "grep -v"], answer: "jq", why: "jq JSON üzerinde sorgu yapar." }
    ],
    interview: [
      { q: "JSON ve YAML arasındaki fark nedir?", a: "JSON katı sözdizimli, her yerde desteklenen bir biçimdir; YAML girintiyle çalışır, yorum destekler ve insan için daha okunaklıdır. Konfigürasyon dosyalarında YAML, API'de JSON yaygındır." },
      { q: "Tarih JSON'da nasıl taşınır?", a: "Özel tarih türü olmadığı için ISO 8601 metni (UTC tercihli) veya epoch saniyesi olarak taşınır." }
    ],
    vocab: [
      { term: "Payload", tr: "yük (veri gövdesi)", ex: "The payload is a JSON object." },
      { term: "Parse", tr: "ayrıştırmak", ex: "Parse the response body." },
      { term: "Nested", tr: "iç içe", ex: "A nested object." },
      { term: "Schema", tr: "şema", ex: "Validate against a schema." },
      { term: "Array", tr: "dizi", ex: "The tags field is an array." }
    ],
    resources: [
      { title: "json.org: JSON tanıtımı", url: "https://www.json.org/json-en.html", type: "doc", why: "Resmî sözdizimi özeti", level: "başlangıç", lang: "EN" },
      { title: "jq kılavuzu", url: "https://jqlang.github.io/jq/manual/", type: "doc", why: "Komut satırında JSON süzme", level: "orta", lang: "EN" }
    ],
    sources: [{ title: "json.org", url: "https://www.json.org/json-en.html" }]
  };

  /* 3 ─────────────────────────────── Git */
  L[3] = {
    hook: "'final_son_gerçek_son2.zip' dönemi Git ile kapanır.",
    homework: "Boş bir klasörde git init yap, bir dosya ekle, commit et, sonra bir dal aç, değişiklik yap ve birleştir.",
    warmup: {
      recap: [{ point: "Sürüm kontrolü değişiklik geçmişini tutar.", example: "Kim, ne zaman, ne değiştirdi" }],
      concepts: [
        { term: "Commit", tr: "Kayıt noktası", summary: "Dosyaların o anki halinin açıklamalı bir anlık görüntüsü.", example: "git commit -m \"Giriş sayfası eklendi\"" },
        { term: "Branch", tr: "Dal", summary: "Ana çizgiyi bozmadan paralel çalışma hattı.", example: "feature/login" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "CodePipeline, Amplify ve çoğu CI/CD sistemi koduna Git deposundan bakar. Takım çalışması, kod incelemesi ve geri alma Git olmadan yürümez." },
      { t: "steps", h: "Günlük akış", items: [
        "git status: ne değişti?",
        "git add dosya: değişikliği hazırlık alanına al.",
        "git commit -m \"mesaj\": kaydı oluştur.",
        "git push: uzak depoya gönder; git pull: uzaktan getir ve birleştir.",
        "git switch -c yeni-dal: yeni dal aç; git merge dal: birleştir."
      ] },
      { t: "cmd", text: "git clone https://github.com/kullanici/proje.git\ngit switch -c feature/login\ngit add .\ngit commit -m \"Giriş formu eklendi\"\ngit push -u origin feature/login" },
      { t: "box", h: "Pull request", text: "Dalını ana dala birleştirmeden önce takım arkadaşına inceletirsin. Küçük, tek amaçlı ve açıklamalı PR'lar daha hızlı onaylanır." },
      { t: "box", h: "Geri alma", text: "git restore dosya: çalışma alanındaki değişikliği at. git revert KOMİT: o kaydı geri alan yeni bir kayıt üret (paylaşılan dalda güvenli). git reset --hard geçmişi ve değişiklikleri siler; paylaşılan dalda kullanma." },
      { t: "warn", h: "Tuzak", text: "Parola, erişim anahtarı ve .env dosyasını commit etme. Bir kez gittiyse geçmişten silmek zordur; anahtarı hemen iptal edip yenile. .gitignore kullan." }
    ],
    quiz: [
      { q: "Değişiklikleri uzak depoya göndermek için hangi komut kullanılır?", options: ["git push", "git pull", "git add", "git status"], answer: "git push", why: "push yerel kayıtları uzak depoya gönderir." },
      { q: "Paylaşılan dalda bir commit'i güvenle geri almanın yolu hangisidir?", options: ["git revert", "git reset --hard", "dosyayı silmek", "git init"], answer: "git revert", why: "revert geçmişi yazmadan, geri alan yeni bir kayıt ekler." },
      { q: "Yeni bir dal açmak için hangisi kullanılır?", options: ["git switch -c dal", "git clone dal", "git push dal", "git merge dal"], answer: "git switch -c dal", why: "-c yeni dal oluşturup geçer (git checkout -b ile aynı)." },
      { q: "Yanlışlıkla bir erişim anahtarı commit ettin. İlk ne yaparsın?", options: ["Anahtarı iptal edip yenisini oluştururum", "Hiçbir şey yapmam", "Sadece dosyayı silerim", "Depoyu herkese açarım"], answer: "Anahtarı iptal edip yenisini oluştururum", why: "Geçmişte kalır; anahtar ele geçmiş sayılmalı." }
    ],
    interview: [
      { q: "git merge ile git rebase farkı nedir?", a: "Merge iki dalı birleştiren bir kayıt oluşturur ve geçmişi korur. Rebase kayıtlarını başka bir dalın ucuna yeniden dizer, çizgisel temiz geçmiş verir; paylaşılan dalda kullanılmamalıdır." },
      { q: "Pull request nedir?", a: "Bir dalın ana dala birleştirilmesi için yapılan inceleme talebidir. Kod incelemesi, otomatik testler ve onay burada gerçekleşir." }
    ],
    vocab: [
      { term: "Repository", tr: "depo", ex: "Clone the repository." },
      { term: "Commit", tr: "kayıt", ex: "Write a clear commit message." },
      { term: "Merge conflict", tr: "birleştirme çakışması", ex: "Resolve the merge conflict." },
      { term: "Branch", tr: "dal", ex: "Create a feature branch." },
      { term: "Pull request", tr: "birleştirme talebi", ex: "Open a pull request." }
    ],
    resources: [
      res(GIT, "Tüm komutlar için ücretsiz kitap"),
      { title: "Learn Git Branching", url: "https://learngitbranching.js.org/", type: "interactive", why: "Dalları görsel olarak öğren", level: "başlangıç", lang: "EN" }
    ],
    sources: [GIT]
  };

  /* 4 ─────────────────────────────── SQL */
  L[4] = {
    hook: "Verinin çoğu tablolarda yaşar. SQL, onunla konuşma dilidir.",
    homework: "SQLite veya online bir SQL oyun alanında bir 'musteriler' ve 'siparisler' tablosu oluştur, 3 kayıt ekle ve JOIN ile birleştir.",
    warmup: {
      recap: [{ point: "Veri JSON'da nesne, SQL'de satırdır.", example: "Tablo = satırlar + sütunlar" }],
      concepts: [
        { term: "Primary key", tr: "Birincil anahtar", summary: "Her satırı benzersiz tanımlayan sütun.", example: "id" },
        { term: "Join", tr: "Birleştirme", summary: "İki tabloyu ortak sütun üzerinden birleştirir.", example: "orders JOIN customers" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "RDS, Aurora ve Athena'da SQL yazarsın. Bir rapor için 'son 30 günde en çok sipariş veren 10 müşteri' sorusunu tek sorguyla cevaplayabilirsin." },
      { t: "cmd", text: "SELECT c.ad, COUNT(o.id) AS siparis_sayisi\nFROM customers c\nJOIN orders o ON o.customer_id = c.id\nWHERE o.tarih >= '2026-09-01'\nGROUP BY c.ad\nORDER BY siparis_sayisi DESC\nLIMIT 10;" },
      { t: "steps", h: "Temel komutlar", items: [
        "SELECT sütunlar FROM tablo WHERE koşul: okuma.",
        "INSERT INTO tablo (...) VALUES (...): ekleme.",
        "UPDATE tablo SET ... WHERE ...: güncelleme (WHERE'i unutma!).",
        "DELETE FROM tablo WHERE ...: silme.",
        "GROUP BY + COUNT/SUM/AVG: gruplama ve toplama.",
        "ORDER BY, LIMIT: sıralama ve sınır."
      ] },
      { t: "box", h: "JOIN türleri", text: "INNER JOIN: iki tabloda da eşleşenler. LEFT JOIN: soldaki tablonun hepsi, sağda eşleşme yoksa NULL. Hiç siparişi olmayan müşterileri bulmak için LEFT JOIN ve WHERE o.id IS NULL kullanılır." },
      { t: "box", h: "İndeks ve işlem", text: "İndeks, arama sütunlarında sorguyu hızlandırır ama yazmayı biraz yavaşlatır. Transaction (BEGIN ... COMMIT) birden çok işlemi ya hep ya hiç yapar: para transferinde iki güncelleme birlikte olmalıdır." },
      { t: "warn", h: "Tuzak", text: "WHERE'siz UPDATE veya DELETE tablonun tamamını etkiler. Ayrıca kullanıcı girdisini sorguya metin olarak yapıştırma (SQL injection); parametreli sorgu kullan." }
    ],
    quiz: [
      { q: "Hiç eşleşmesi olmasa da soldaki tablonun tüm satırlarını getiren birleştirme hangisidir?", options: ["LEFT JOIN", "INNER JOIN", "CROSS APPLY", "UNION"], answer: "LEFT JOIN", why: "Eşleşme yoksa sağ taraf NULL gelir." },
      { q: "SQL injection'ı önlemenin temel yolu nedir?", options: ["Parametreli sorgu", "Tırnakları elle silmek", "Sorguyu şifrelemek", "Tabloyu gizlemek"], answer: "Parametreli sorgu", why: "Veri komuttan ayrılır." },
      { q: "Birden çok adımı ya hep ya hiç yapan yapı nedir?", options: ["Transaction", "Index", "View", "Alias"], answer: "Transaction", why: "Hata olursa ROLLBACK ile hepsi geri alınır." },
      { q: "WHERE'siz UPDATE ne yapar?", options: ["Tablodaki tüm satırları günceller", "Hiçbir şey", "Hata verir", "Sadece ilk satırı günceller"], answer: "Tablodaki tüm satırları günceller", why: "Koşul yoksa tüm satırlar etkilenir." },
      { q: "Her satırı benzersiz tanımlayan sütuna ne denir?", options: ["Primary key", "Foreign key", "Alias", "Cursor"], answer: "Primary key", why: "Birincil anahtar tekil ve boş olmayan değerdir." }
    ],
    interview: [
      { q: "INNER JOIN ile LEFT JOIN farkı nedir?", a: "INNER JOIN sadece iki tabloda da eşleşen satırları verir. LEFT JOIN soldaki tablonun tüm satırlarını verir, eşleşme yoksa sağ sütunlar NULL olur." },
      { q: "İndeks nedir, ne zaman kullanılır?", a: "Arama, filtre ve JOIN sütunlarında okumayı hızlandıran yapıdır. Yazma maliyetini ve depolamayı artırır, bu yüzden her sütuna değil sık sorgulananlara eklenir." },
      { q: "ACID nedir?", a: "Atomicity, Consistency, Isolation, Durability: bir işlemin bütün olması, tutarlılığı koruması, eşzamanlı işlemlerden izole olması ve kalıcı olması garantileridir." }
    ],
    vocab: [
      { term: "Query", tr: "sorgu", ex: "Optimize the slow query." },
      { term: "Table", tr: "tablo", ex: "Create a table." },
      { term: "Index", tr: "indeks", ex: "Add an index on email." },
      { term: "Foreign key", tr: "yabancı anahtar", ex: "orders.customer_id is a foreign key." },
      { term: "Transaction", tr: "işlem", ex: "Wrap it in a transaction." }
    ],
    resources: [
      { title: "SQLBolt: etkileşimli SQL dersleri", url: "https://sqlbolt.com/", type: "interactive", why: "Tarayıcıda alıştırma", level: "başlangıç", lang: "EN" },
      { title: "PostgreSQL öğreticisi", url: "https://www.postgresql.org/docs/current/tutorial.html", type: "doc", why: "Resmî belgelere giriş", level: "orta", lang: "EN" }
    ],
    sources: [{ title: "PostgreSQL belgeleri", url: "https://www.postgresql.org/docs/current/tutorial.html" }]
  };

  /* 5 ─────────────────────────────── NoSQL */
  L[5] = {
    hook: "Her veri tabloya sığmaz ve her uygulama JOIN'e ihtiyaç duymaz. NoSQL farklı bir takas sunar.",
    homework: "Bir 'kullanıcı profili' ve 'son 10 sipariş' ekranı için hangi verinin tek öğede tutulabileceğini düşün. Neden JOIN gerekmez?",
    warmup: {
      recap: [{ point: "SQL'de veri ilişkisel tablolardadır.", example: "customers + orders" }],
      concepts: [
        { term: "NoSQL", tr: "İlişkisel olmayan veritabanı", summary: "Sabit tablo şeması yerine anahtar-değer, doküman, sütun ailesi veya graf gibi modeller sunar.", example: "DynamoDB, MongoDB" },
        { term: "Denormalization", tr: "Normalleştirmeme", summary: "Okumayı hızlandırmak için veriyi tekrar ederek bir arada tutmak.", example: "Siparişin içine ürün adını yazmak" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Bir oyun uygulaması saniyede on binlerce skor güncellemesi alır. Büyük ölçekte tek tabloya yazmak ve milisaniyede okumak gerekir. DynamoDB gibi servisler bu iş için tasarlanmıştır." },
      { t: "steps", h: "NoSQL türleri", items: [
        "Anahtar-değer: anahtarla anında erişim (Redis, DynamoDB).",
        "Doküman: JSON benzeri esnek belgeler (MongoDB, DynamoDB öğeleri).",
        "Sütun ailesi: geniş, seyrek tablolar (Cassandra).",
        "Graf: ilişkileri düğüm ve kenar olarak tutar (Neptune)."
      ] },
      { t: "box", h: "SQL ile fark", text: "SQL: önce veriyi normalize et, sonra sorguyu esnek yaz (JOIN). NoSQL: önce erişim kalıplarını (hangi sorgular?) belirle, veriyi ona göre tasarla. Esnek ad-hoc sorgu zayıf, ölçek ve hız güçlüdür." },
      { t: "steps", h: "Seçim ipuçları", items: [
        "Karmaşık ilişkiler, raporlama, güçlü işlem garantisi: ilişkisel veritabanı.",
        "Çok yüksek ölçek, basit erişim kalıbı, esnek şema: NoSQL.",
        "Çoğu sistem ikisini birlikte kullanır (polyglot persistence)."
      ] },
      { t: "box", h: "Tutarlılık", text: "Dağıtık sistemlerde nihai tutarlılık (eventual consistency): yazma hemen tüm kopyalara yansımayabilir; okuma kısa süre eski veri görebilir. Güçlü tutarlı okuma seçeneği olabilir ama maliyetlidir." },
      { t: "warn", h: "Tuzak", text: "'NoSQL daha hızlı' genellemesi yanlıştır. Doğru tasarlanmış erişim kalıbıyla hızlıdır; yanlış tasarlanmış tabloda tam tarama pahalı ve yavaştır." }
    ],
    quiz: [
      { q: "NoSQL tasarımına neyi belirleyerek başlanır?", options: ["Erişim kalıplarını (sorguları)", "Sütun adlarını", "Dosya biçimini", "Renk şemasını"], answer: "Erişim kalıplarını (sorguları)", why: "Veri sorgulara göre şekillendirilir." },
      { q: "Anahtar-değer veritabanına örnek hangisidir?", options: ["DynamoDB", "PostgreSQL", "Excel", "MySQL"], answer: "DynamoDB", why: "DynamoDB anahtar-değer ve doküman modelini destekler." },
      { q: "Nihai tutarlılık ne demektir?", options: ["Yazma kısa süre sonra tüm kopyalara yansır", "Veri asla tutarlı olmaz", "Anında her yerde aynıdır", "Veri silinir"], answer: "Yazma kısa süre sonra tüm kopyalara yansır", why: "Okuma kısa bir süre eski veri görebilir." },
      { q: "İlişkileri düğüm ve kenar olarak tutan model hangisidir?", options: ["Graf", "Anahtar-değer", "Sütun ailesi", "Dosya"], answer: "Graf", why: "Sosyal ağ ve öneri sistemlerinde kullanılır." }
    ],
    interview: [
      { q: "Ne zaman SQL, ne zaman NoSQL seçersin?", a: "Karmaşık ilişkiler, raporlama ve güçlü işlem garantisi gerekiyorsa SQL. Çok yüksek ölçek, basit ve bilinen erişim kalıpları, esnek şema gerekiyorsa NoSQL. Çoğu zaman ikisini birlikte kullanırım." },
      { q: "Normalleştirmeme neden yapılır?", a: "NoSQL'de JOIN olmadığı için bir ekranın ihtiyaç duyduğu veriyi tek okumada getirmek amacıyla veriyi tekrar ederek bir arada tutarız. Bedeli güncellemelerde tutarlılığı elle yönetmektir." }
    ],
    vocab: [
      { term: "Schema-less", tr: "şemasız", ex: "The table is schema-less." },
      { term: "Document", tr: "doküman", ex: "Store a document per user." },
      { term: "Key-value", tr: "anahtar-değer", ex: "Redis is a key-value store." },
      { term: "Eventual consistency", tr: "nihai tutarlılık", ex: "Reads are eventually consistent." },
      { term: "Throughput", tr: "veri işleme hızı", ex: "Provision enough throughput." }
    ],
    resources: [
      { title: "AWS: NoSQL nedir?", url: "https://aws.amazon.com/nosql/", type: "doc", why: "Türler ve kullanım alanları", level: "başlangıç", lang: "EN" },
      { title: "DynamoDB Geliştirici Kılavuzu", url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html", type: "doc", why: "NoSQL'in AWS'deki ana örneği", level: "orta", lang: "EN" }
    ],
    sources: [{ title: "AWS NoSQL", url: "https://aws.amazon.com/nosql/" }]
  };

  /* 6 ─────────────────────────────── JWT ve OAuth */
  L[6] = {
    hook: "'Google ile giriş yap' butonunun arkasında parolanı hiç görmeyen bir sistem vardır.",
    homework: "Bir JWT'yi (jwt.io'daki örnek) üç parçaya ayır: header, payload, signature. Payload'daki exp alanının anlamını yaz.",
    warmup: {
      recap: [{ point: "401 kimlik doğrulama eksikliğidir.", example: "Authorization başlığı" }, { point: "403 yetki eksikliğidir.", example: "Yetkisiz rol" }],
      concepts: [
        { term: "JWT", tr: "JSON Web Token", summary: "Kimlik iddialarını (claims) taşıyan, imzalı, nokta ile ayrılmış üç parçalı belirteç.", example: "xxxxx.yyyyy.zzzzz" },
        { term: "OAuth 2.0", tr: "Yetkilendirme çerçevesi", summary: "Bir uygulamanın parolanı almadan senin adına sınırlı erişim almasını sağlar.", example: "Google ile giriş" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Cognito, API Gateway yetkilendiricileri ve çoğu modern API JWT kullanır. Kullanıcı giriş yapar, token alır, her istekte Authorization: Bearer <token> gönderir." },
      { t: "steps", h: "JWT yapısı", items: [
        "Header: algoritma ve tür (ör. RS256).",
        "Payload: claim'ler: sub (kullanıcı), exp (bitiş zamanı), iss (veren), aud (hedef).",
        "Signature: header+payload'ın imzası; değişiklik yapılırsa doğrulama başarısız olur.",
        "Payload şifreli değil, sadece Base64URL kodlu: içine gizli bilgi koyma."
      ] },
      { t: "steps", h: "OAuth 2.0 rolleri", items: [
        "Kaynak sahibi: kullanıcı.",
        "İstemci: erişim isteyen uygulama.",
        "Yetkilendirme sunucusu: token veren (Cognito, Google).",
        "Kaynak sunucu: korunan API."
      ] },
      { t: "box", h: "Authorization Code akışı", text: "Kullanıcı yetkilendirme sunucusuna yönlendirilir, giriş yapıp izin verir, uygulama bir kod alır ve bu kodu erişim token'ı ile değiştirir. Parola uygulamaya hiç gitmez. Tarayıcı ve mobil uygulamalar için PKCE eklenir." },
      { t: "box", h: "Erişim ve yenileme token'ı", text: "Erişim token'ı kısa ömürlüdür (dakikalar). Yenileme (refresh) token'ı uzun ömürlüdür ve yeni erişim token'ı almak için kullanılır; daha sıkı saklanmalıdır." },
      { t: "box", h: "OIDC", text: "OpenID Connect, OAuth üzerine kimlik katmanı ekler: 'kullanıcı kim?' sorusunu cevaplayan ID token (JWT) sağlar. OAuth yetkilendirme, OIDC kimlik doğrulamadır." },
      { t: "warn", h: "Tuzak", text: "JWT'yi tarayıcıda localStorage'da tutmak XSS ile çalınmasına açıktır. İmzayı ve exp, iss, aud alanlarını her zaman sunucuda doğrula." }
    ],
    quiz: [
      { q: "JWT'nin payload kısmı için hangisi doğrudur?", options: ["Şifreli değil, sadece kodlanmıştır", "Tamamen şifrelidir", "Parola içerir", "Boştur"], answer: "Şifreli değil, sadece kodlanmıştır", why: "Herkes okuyabilir; imza değişikliği engeller ama gizlilik sağlamaz." },
      { q: "OAuth 2.0 ne için tasarlanmıştır?", options: ["Parola paylaşmadan yetkilendirme", "Dosya sıkıştırma", "Veritabanı yedekleme", "DNS çözümleme"], answer: "Parola paylaşmadan yetkilendirme", why: "Uygulamaya sınırlı erişim verir." },
      { q: "Kullanıcının kim olduğunu söyleyen OAuth üzerindeki katman hangisidir?", options: ["OpenID Connect", "SAML şifreleme", "TLS", "VPN"], answer: "OpenID Connect", why: "OIDC ID token ile kimlik sağlar." },
      { q: "Erişim token'ı neden kısa ömürlü olur?", options: ["Çalınırsa zarar süresi sınırlı kalır", "Daha hızlıdır", "Daha ucuzdur", "Zorunlu değildir"], answer: "Çalınırsa zarar süresi sınırlı kalır", why: "Yenileme token'ı ile yeni token alınır." },
      { q: "Sunucu bir JWT'de en az neyi doğrulamalıdır?", options: ["İmza ve exp", "Sadece boyut", "Sadece tarayıcı adı", "Yalnızca header"], answer: "İmza ve exp", why: "İmza bütünlüğü, exp geçerlilik süresini kontrol eder (iss ve aud da kontrol edilir)." }
    ],
    interview: [
      { q: "Oturum çerezi ile JWT farkı nedir?", a: "Oturum çerezinde durum sunucudadır, çerez sadece kimliktir. JWT kendi kendine yeterlidir; sunucu imzayı doğrulayarak veritabanına bakmadan kimliği çözer. JWT'yi iptal etmek daha zordur; bu yüzden kısa ömürlü tutulur." },
      { q: "OAuth ve OIDC farkı nedir?", a: "OAuth 2.0 yetkilendirme (bu uygulama şu kaynağa erişebilir) içindir. OIDC onun üstünde kimlik doğrulama (kullanıcı kim) sağlar ve ID token döndürür." }
    ],
    vocab: [
      { term: "Token", tr: "belirteç", ex: "Send the token in the header." },
      { term: "Claim", tr: "iddia (token içindeki alan)", ex: "Check the exp claim." },
      { term: "Authentication", tr: "kimlik doğrulama", ex: "Authentication proves who you are." },
      { term: "Authorization", tr: "yetkilendirme", ex: "Authorization decides what you can do." },
      { term: "Scope", tr: "kapsam (izin alanı)", ex: "Request the read scope." }
    ],
    resources: [
      { title: "jwt.io: JWT tanıtımı", url: "https://jwt.io/introduction", type: "doc", why: "Yapı ve örnek", level: "başlangıç", lang: "EN" },
      { title: "OAuth 2.0 basitçe", url: "https://aaronparecki.com/oauth-2-simplified/", type: "doc", why: "Akışların sade anlatımı", level: "orta", lang: "EN" }
    ],
    sources: [{ title: "jwt.io", url: "https://jwt.io/introduction" }, { title: "OAuth 2.0", url: "https://oauth.net/2/" }]
  };
})();

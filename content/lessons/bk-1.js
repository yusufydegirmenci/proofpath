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
    objectives: [
      { id: "h1", text: "Bir HTTP isteğini yöntem, yol, başlıklar ve gövde olarak parçalarına ayırabilirsin." },
      { id: "h2", text: "Bir durum kodunun ailesine bakarak sorunun istemciden mi sunucudan mı geldiğini söyleyebilirsin." },
      { id: "h3", text: "GET, POST, PUT, PATCH ve DELETE'in ne yaptığını ve hangilerinin idempotent olduğunu gerekçesiyle açıklayabilirsin." },
      { id: "h4", text: "REST'te 'stateless' kavramının ne demek olduğunu açıklayabilirsin." }
    ],
    summary: [
      "Bir istek yöntem + yol, başlıklar ve (varsa) gövdeden oluşur; cevap durum kodu, başlıklar ve gövde taşır.",
      "Durum kodunun ilk hanesi ailesini söyler: 2xx başarı, 4xx istemci hatası, 5xx sunucu hatası.",
      "401 'seni tanımıyorum', 403 'seni tanıyorum ama yetkin yok' demektir.",
      "GET, PUT ve DELETE idempotenttir; POST değildir, bu yüzden tekrar denemede çift kayıt riski taşır.",
      "REST'te sunucu istekler arasında oturum tutmaz (stateless): her istek kendine yeter."
    ],
    quiz: [
      { id: "9fe006c7", q: "Var olan bir kaydı tamamen değiştirmek için hangi yöntem kullanılır?", options: ["PUT", "GET", "DELETE", "OPTIONS"], obj: "h3" },
      { id: "e7897668", q: "Kimliği doğrulanmış ama yetkisi olmayan kullanıcıya hangi kod döner?", options: ["403", "401", "404", "500"], obj: "h2" },
      { id: "1ec425ba", q: "Aşağıdakilerden hangisi idempotenttir?", options: ["DELETE /orders/5", "POST /orders", "POST /payments", "Sayaç artıran istek"], obj: "h3" },
      { id: "d26da497", q: "Başarıyla oluşturulan kaynak için tipik durum kodu hangisidir?", options: ["201", "204", "301", "503"], obj: "h2" },
      { id: "cbcd9e61", q: "REST'te 'stateless' ne demektir?", options: ["Sunucu istekler arasında oturum durumu tutmaz", "Veritabanı yoktur", "Sadece GET kullanılır", "Cevap boştur"], obj: "h4" },
      { id: "fb15e6ca", q: "Aşağıdakilerden hangisi bir HTTP isteğinin başlık (header) kısmına örnektir?", options: ["GET /orders/42", "Authorization: Bearer abc123", "404 Not Found", "{\"urun\": 7}"], obj: "h1" }
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
      { t: "cmd", lang: "json", text: "{\n  \"id\": 42,\n  \"ad\": \"Ali\",\n  \"aktif\": true,\n  \"etiketler\": [\"aws\", \"backend\"],\n  \"adres\": { \"sehir\": \"Ankara\" },\n  \"not\": null\n}" },
      { t: "box", h: "Sık kullanılan işlemler", text: "Ayrıştırma: JSON.parse(metin) veya Python'da json.loads(metin). Metne çevirme: JSON.stringify(nesne) veya json.dumps(nesne). Komut satırında jq ile süzme: jq '.adres.sehir' dosya.json" },
      { t: "box", h: "YAML ile ilişki", text: "CloudFormation ve SAM şablonları YAML veya JSON olabilir. YAML girinti ile çalışır ve yorum destekler; JSON katıdır ama her yerde desteklenir." },
      { t: "warn", h: "Tuzak", text: "Sayı ile metin karışır: \"5\" ve 5 farklıdır. Ayrıca tarih için JSON'un özel türü yoktur; ISO 8601 metni (2026-10-11T09:00:00Z) kullanılır." }
    ],
    objectives: [
      { id: "h1", text: "Verilen bir metnin geçerli JSON olup olmadığını kurallara bakarak söyleyebilirsin." },
      { id: "h2", text: "JSON'un desteklediği değer türlerini ve desteklemediği şeyleri (yorum, özel tarih türü) sayabilirsin." },
      { id: "h3", text: "Metni nesneye çevirmeyi (parse) metne çevirmekten (stringify) ayırt edebilirsin." },
      { id: "h4", text: "Komut satırında JSON içinden alan süzmek için jq'yu seçebilirsin." }
    ],
    summary: [
      "JSON'da anahtarlar ve metin değerler çift tırnaklıdır; yorum yoktur, son elemandan sonra virgül konmaz.",
      "Türler: metin, sayı, true/false, null, nesne {} ve dizi []; \"5\" metindir, 5 sayıdır.",
      "Tarih için özel tür yoktur; ISO 8601 metni (2026-10-11T09:00:00Z) kullanılır.",
      "Parse metni nesneye, stringify nesneyi metne çevirir; jq komut satırında JSON içinden alan süzer."
    ],
    quiz: [
      { id: "7cc83407", q: "Aşağıdakilerden hangisi geçerli JSON'dur?", options: ["{\"ad\":\"Ali\"}", "{ad:'Ali'}", "{'ad':'Ali'}", "{\"ad\":\"Ali\",}"], obj: "h1" },
      { id: "83775d46", q: "JSON'da hangisi desteklenmez?", options: ["Yorum satırı", "Dizi", "null", "İç içe nesne"], obj: "h2" },
      { id: "b81ce7b9", q: "Metni nesneye çevirmeye ne denir?", options: ["Parse (ayrıştırma)", "Stringify", "Hash", "Encrypt"], obj: "h3" },
      { id: "145b78dc", q: "Komut satırında JSON'dan alan süzmek için hangi araç kullanılır?", options: ["jq", "ping", "curl -I", "grep -v"], obj: "h4" }
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
      { t: "cmd", lang: "bash", text: "git clone https://github.com/kullanici/proje.git\ngit switch -c feature/login\ngit add .\ngit commit -m \"Giriş formu eklendi\"\ngit push -u origin feature/login" },
      { t: "box", h: "Pull request", text: "Dalını ana dala birleştirmeden önce takım arkadaşına inceletirsin. Küçük, tek amaçlı ve açıklamalı PR'lar daha hızlı onaylanır." },
      { t: "box", h: "Geri alma", text: "git restore dosya: çalışma alanındaki değişikliği at. git revert KOMİT: o kaydı geri alan yeni bir kayıt üret (paylaşılan dalda güvenli). git reset --hard geçmişi ve değişiklikleri siler; paylaşılan dalda kullanma." },
      { t: "warn", h: "Tuzak", text: "Parola, erişim anahtarı ve .env dosyasını commit etme. Bir kez gittiyse geçmişten silmek zordur; anahtarı hemen iptal edip yenile. .gitignore kullan." }
    ],
    objectives: [
      { id: "h1", text: "Günlük Git akışını (status, add, commit, push/pull) doğru sırayla uygulayıp her komutun işini söyleyebilirsin." },
      { id: "h2", text: "Yeni dal açıp birleştirebilir, paylaşılan dalda bir commit'i güvenle geri alabilirsin." },
      { id: "h3", text: "Yanlışlıkla commit edilmiş bir erişim anahtarı karşısında ilk adımı (anahtarı iptal edip yenilemek) seçebilirsin." }
    ],
    summary: [
      "Günlük akış: status ile bak, add ile hazırla, commit ile kaydet, push ile gönder, pull ile getir.",
      "Yeni dal: git switch -c ad; birleştirme: git merge dal; ana dala girmeden önce pull request ile inceletilir.",
      "Paylaşılan dalda geri almak için git revert kullan; git reset --hard geçmişi ve değişiklikleri siler.",
      "Parola ve erişim anahtarını commit etme; gittiyse anahtarı hemen iptal edip yenile, .gitignore kullan."
    ],
    quiz: [
      { id: "655e3549", q: "Değişiklikleri uzak depoya göndermek için hangi komut kullanılır?", options: ["git push", "git pull", "git add", "git status"], obj: "h1" },
      { id: "9297fa4a", q: "Paylaşılan dalda bir commit'i güvenle geri almanın yolu hangisidir?", options: ["git revert", "git reset --hard", "dosyayı silmek", "git init"], obj: "h2" },
      { id: "05b6d708", q: "Yeni bir dal açmak için hangisi kullanılır?", options: ["git switch -c dal", "git clone dal", "git push dal", "git merge dal"], obj: "h2" },
      { id: "77dcde3e", q: "feature/login dalındaki işi main dalına almak için hangisini yaparsın?", options: ["git revert feature/login", "git switch -c main", "main'e geçip git merge feature/login", "git add feature/login"], obj: "h2" },
      { id: "8a3cf7d7", q: "Yanlışlıkla bir erişim anahtarı commit ettin. İlk ne yaparsın?", options: ["Anahtarı iptal edip yenisini oluştururum", "Hiçbir şey yapmam", "Sadece dosyayı silerim", "Depoyu herkese açarım"], obj: "h3" },
      { id: "87789c84", q: "Bir değişikliği uzak depoya göndermenin doğru sırası hangisidir?", options: ["git commit, git add, git push", "git push, git add, git commit", "git add, git push, git commit", "git add, git commit, git push"], obj: "h1" }
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
      { t: "cmd", lang: "sql", text: "SELECT c.ad, COUNT(o.id) AS siparis_sayisi\nFROM customers c\nJOIN orders o ON o.customer_id = c.id\nWHERE o.tarih >= '2026-09-01'\nGROUP BY c.id, c.ad\nORDER BY siparis_sayisi DESC\nLIMIT 10;" },
      { t: "steps", h: "Temel komutlar", items: [
        "SELECT sütunlar FROM tablo WHERE koşul: okuma.",
        "INSERT INTO tablo (...) VALUES (...): ekleme.",
        "UPDATE tablo SET ... WHERE ...: güncelleme (WHERE'i unutma!).",
        "DELETE FROM tablo WHERE ...: silme.",
        "GROUP BY + COUNT/SUM/AVG: gruplama ve toplama.",
        "ORDER BY, LIMIT: sıralama ve sınır."
      ] },
      { t: "box", h: "JOIN türleri", text: "INNER JOIN: iki tabloda da eşleşenler. LEFT JOIN: soldaki tablonun hepsi, sağda eşleşme yoksa NULL. Hiç siparişi olmayan müşterileri bulmak için LEFT JOIN ve WHERE o.id IS NULL kullanılır." },
      { t: "box", h: "İndeks ve işlem", text: "İndeks, arama sütunlarında sorguyu hızlandırır ama yazmayı biraz yavaşlatır. Transaction (BEGIN ... COMMIT) birden çok işlemi ya hep ya hiç yapar: para transferinde iki güncelleme birlikte olmalıdır. Hata olursa ROLLBACK ile hepsi geri alınır." },
      { t: "warn", h: "Tuzak", text: "WHERE'siz UPDATE veya DELETE tablonun tamamını etkiler. Ayrıca kullanıcı girdisini sorguya metin olarak yapıştırma (SQL injection); parametreli sorgu kullan." }
    ],
    objectives: [
      { id: "h1", text: "Primary key'in işini söyleyebilir, INNER JOIN ile LEFT JOIN farkına bakarak doğru birleştirmeyi seçebilirsin." },
      { id: "h2", text: "WHERE'siz UPDATE veya DELETE'in tablonun tamamını etkilediğini söyleyip güvenli sorgu yazabilirsin." },
      { id: "h3", text: "Birden çok işlemin ya hep ya hiç yapılması gereken durumu (para transferi) transaction ile eşleştirebilirsin." },
      { id: "h4", text: "SQL injection'ı önlemek için parametreli sorguyu seçebilirsin." }
    ],
    summary: [
      "Primary key her satırı benzersiz tanımlar; JOIN iki tabloyu ortak sütun üzerinden birleştirir.",
      "INNER JOIN yalnız eşleşenleri verir; LEFT JOIN soldaki tablonun hepsini verir, eşleşme yoksa sağ taraf NULL olur.",
      "WHERE'siz UPDATE veya DELETE tablonun tüm satırlarını etkiler.",
      "Transaction birden çok işlemi ya hep ya hiç yapar; hata olursa ROLLBACK ile geri alınır.",
      "SQL injection'ı kullanıcı girdisini sorguya yapıştırmayarak, parametreli sorguyla önlersin."
    ],
    quiz: [
      { id: "a74238f4", q: "Hiç eşleşmesi olmasa da soldaki tablonun tüm satırlarını getiren birleştirme hangisidir?", options: ["LEFT JOIN", "INNER JOIN", "CROSS APPLY", "UNION"], obj: "h1" },
      { id: "e69d401d", q: "SQL injection'ı önlemenin temel yolu nedir?", options: ["Parametreli sorgu", "Tırnakları elle silmek", "Sorguyu şifrelemek", "Tabloyu gizlemek"], obj: "h4" },
      { id: "2be05e53", q: "Birden çok adımı ya hep ya hiç yapan yapı nedir?", options: ["Transaction", "Index", "View", "Alias"], obj: "h3" },
      { id: "4b222874", q: "WHERE'siz UPDATE ne yapar?", options: ["Tablodaki tüm satırları günceller", "Hiçbir şey", "Hata verir", "Sadece ilk satırı günceller"], obj: "h2" },
      { id: "23c6c375", q: "Her satırı benzersiz tanımlayan sütuna ne denir?", options: ["Primary key", "Foreign key", "Alias", "Cursor"], obj: "h1" },
      { id: "bd4a2d48", q: "Yalnızca id değeri 7 olan müşterinin şehrini değiştirmek için hangi sorgu güvenlidir?", options: ["UPDATE customers SET sehir = 'Ankara';", "UPDATE customers SET sehir = 'Ankara' WHERE 1 = 1;", "UPDATE customers SET sehir = 'Ankara' WHERE id = 7;", "UPDATE customers SET sehir = 'Ankara' WHERE id > 0;"], obj: "h2" }
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
      { t: "box", h: "SQL ile fark", text: "SQL: önce veriyi normalize et, sonra sorguyu esnek yaz (JOIN). NoSQL: önce erişim kalıplarını (hangi sorgular?) belirle, veriyi ona göre tasarla. Esnek ad-hoc sorgu zayıf; doğru tasarlanmış erişim kalıbında ölçek ve hız güçlüdür." },
      { t: "steps", h: "Seçim ipuçları", items: [
        "Karmaşık ilişkiler, raporlama, güçlü işlem garantisi: ilişkisel veritabanı.",
        "Çok yüksek ölçek, basit erişim kalıbı, esnek şema: NoSQL.",
        "Çoğu sistem ikisini birlikte kullanır (polyglot persistence)."
      ] },
      { t: "box", h: "Tutarlılık", text: "Dağıtık sistemlerde nihai tutarlılık (eventual consistency): yazma hemen tüm kopyalara yansımayabilir; okuma kısa süre eski veri görebilir. Güçlü tutarlı okuma seçeneği olabilir ama maliyetlidir." },
      { t: "warn", h: "Tuzak", text: "'NoSQL daha hızlı' genellemesi yanlıştır. Doğru tasarlanmış erişim kalıbıyla hızlıdır; yanlış tasarlanmış tabloda tam tarama pahalı ve yavaştır." }
    ],
    objectives: [
      { id: "h1", text: "NoSQL'in dört modelini (anahtar-değer, doküman, sütun ailesi, graf) örnekleriyle ayırt edebilirsin." },
      { id: "h2", text: "NoSQL'de tasarıma erişim kalıplarından başlandığını, SQL'de ise önce verinin normalize edildiğini karşılaştırarak anlatabilirsin." },
      { id: "h3", text: "Nihai tutarlılığın ne anlama geldiğini ve okumanın kısa süre eski veri görebileceğini açıklayabilirsin." },
      { id: "h4", text: "Bir senaryoda ilişkisel veritabanı mı NoSQL mu seçileceğini gerekçesiyle söyleyebilirsin." }
    ],
    summary: [
      "NoSQL dört model sunar: anahtar-değer, doküman, sütun ailesi ve graf.",
      "SQL'de önce veri normalize edilip sorgu esnek yazılır; NoSQL'de önce erişim kalıpları belirlenip veri ona göre tasarlanır.",
      "Nihai tutarlılıkta yazma zamanla (genellikle kısa sürede) tüm kopyalara yansır; okuma bu sürede eski veri görebilir.",
      "Karmaşık ilişki, raporlama ve güçlü işlem garantisi için ilişkisel veritabanı; çok yüksek ölçek ve basit erişim kalıbı için NoSQL seçilir."
    ],
    quiz: [
      { id: "5e4906eb", q: "NoSQL tasarımına neyi belirleyerek başlanır?", options: ["Erişim kalıplarını (sorguları)", "Sütun adlarını", "Dosya biçimini", "Renk şemasını"], obj: "h2" },
      { id: "5806aa3f", q: "Anahtar-değer veritabanına örnek hangisidir?", options: ["DynamoDB", "PostgreSQL", "Excel", "MySQL"], obj: "h1" },
      { id: "f2f20335", q: "Nihai tutarlılık ne demektir?", options: ["Yazma kısa süre sonra tüm kopyalara yansır", "Veri asla tutarlı olmaz", "Anında her yerde aynıdır", "Veri silinir"], obj: "h3" },
      { id: "8230dfd2", q: "İlişkileri düğüm ve kenar olarak tutan model hangisidir?", options: ["Graf", "Anahtar-değer", "Sütun ailesi", "Dosya"], obj: "h1" },
      { id: "e6c26f6c", q: "Karmaşık ilişkiler, raporlama ve güçlü işlem garantisi gereken bir sistem için en uygun başlangıç seçimi hangisidir?", options: ["Anahtar-değer deposu", "İlişkisel veritabanı", "Sütun ailesi deposu", "Yalnızca önbellek"], obj: "h4" }
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
      { t: "box", h: "Erişim ve yenileme token'ı", text: "Erişim token'ı kısa ömürlüdür (dakikalar). Yenileme (refresh) token'ı uzun ömürlüdür ve yeni erişim token'ı almak için kullanılır; daha sıkı saklanmalıdır: uzun ömürlü olduğu için çalınırsa saldırgan sürekli yeni erişim token'ı üretebilir." },
      { t: "box", h: "OIDC", text: "OpenID Connect, OAuth üzerine kimlik katmanı ekler: 'kullanıcı kim?' sorusunu cevaplayan ID token (JWT) sağlar. OAuth yetkilendirme, OIDC kimlik doğrulamadır." },
      { t: "warn", h: "Tuzak", text: "JWT'yi tarayıcıda localStorage'da tutmak XSS ile çalınmasına açıktır. İmzayı ve exp, iss, aud alanlarını her zaman sunucuda doğrula." }
    ],
    objectives: [
      { id: "h1", text: "JWT'nin üç parçasını (header, payload, signature) sayıp payload'ın şifreli değil yalnız kodlu olduğunu açıklayabilirsin." },
      { id: "h2", text: "OAuth 2.0'ın yetkilendirme, OpenID Connect'in kimlik doğrulama sağladığını ayırt edebilirsin." },
      { id: "h3", text: "Erişim token'ının neden kısa ömürlü, yenileme token'ının neden daha sıkı saklanması gerektiğini açıklayabilirsin." },
      { id: "h4", text: "Sunucunun bir JWT'de hangi alanları (imza, exp, iss, aud) doğrulaması gerektiğini söyleyebilirsin." }
    ],
    summary: [
      "JWT header, payload ve signature olmak üzere nokta ile ayrılmış üç parçadan oluşur.",
      "Payload şifreli değil, yalnız Base64URL kodludur; imza değişikliği fark ettirir ama gizlilik sağlamaz, içine gizli bilgi konmaz.",
      "OAuth 2.0 parolayı paylaşmadan yetkilendirme sağlar; OpenID Connect onun üstüne ID token ile kimlik doğrulamayı ekler.",
      "Erişim token'ı kısa ömürlüdür ki çalınırsa zarar süresi sınırlı kalsın; yenileme token'ı yeni erişim token'ı almak için kullanılır.",
      "Sunucu her istekte imzayı ve exp, iss, aud alanlarını doğrulamalıdır."
    ],
    quiz: [
      { id: "aa63afed", q: "JWT'nin payload kısmı için hangisi doğrudur?", options: ["Şifreli değil, sadece kodlanmıştır", "Tamamen şifrelidir", "Parola içerir", "Boştur"], obj: "h1" },
      { id: "97b7376f", q: "OAuth 2.0 ne için tasarlanmıştır?", options: ["Parola paylaşmadan yetkilendirme", "Dosya sıkıştırma", "Veritabanı yedekleme", "DNS çözümleme"], obj: "h2" },
      { id: "0436ec32", q: "Kullanıcının kim olduğunu söyleyen OAuth üzerindeki katman hangisidir?", options: ["OpenID Connect", "SAML", "TLS", "VPN"], obj: "h2" },
      { id: "ca2788eb", q: "Erişim token'ı neden kısa ömürlü olur?", options: ["Çalınırsa zarar süresi sınırlı kalır", "Daha hızlıdır", "Daha ucuzdur", "Zorunlu değildir"], obj: "h3" },
      { id: "2f391a26", q: "Sunucu bir JWT'de en az neyi doğrulamalıdır?", options: ["İmza ve exp", "Sadece boyut", "Sadece tarayıcı adı", "Yalnızca header"], obj: "h4" },
      { id: "12f50c12", q: "Yenileme token'ı erişim token'ından neden daha sıkı saklanır?", options: ["Daha kısa ömürlüdür", "Uzun ömürlüdür, çalınması riskli", "Parolanın kendisidir", "Her istekte gönderilir"], obj: "h3" },
      { id: "5dc1084e", q: "Bir JWT'nin hangi API için üretildiğini hangi claim söyler?", options: ["iss", "exp", "sub", "aud"], obj: "h4" }
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

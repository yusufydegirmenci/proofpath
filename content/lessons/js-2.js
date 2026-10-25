/* JavaScript (ES2015+, tarayıcı) · sabit dersler 5-8 (döngüler, dizi yöntemleri, nesneler, fonksiyonlar ve ok fonksiyonları). Kapsam herkese açık MDN JavaScript Kılavuzu'ndan alınmıştır; metinler özgündür.
   Dış kaynak: yalnız HTTP 200 dönenler (curl, 2026-10-25). Kod örnekleri Node ile çalıştırılarak doğrulandı; alıştırmalar PP.alan (tarayıcı JS) ile çalışır (js-alan.js). */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).js = (window.PP_LESSONS.js || {}));

  /* 5 ───────────────────────────────────────────── Döngüler: for, while, for...of */
  L[5] = {
    hook: "Aynı işi yüz kez elle yazmak yerine bir kez yaz, döngüye tekrar ettir. Asıl iş, döngünün nerede başlayıp nerede bittiğini doğru söylemektir.",
    homework: "1'den 20'ye kadar yalnız 3'e bölünen sayıları yazdıran bir for döngüsü yaz. Aynı işi while ile yap. Sonra while'ın içindeki sayacı artırmayı bilerek sil; bu 'sonsuz döngü' hatasını gözlemle (tarayıcı alanında süre dolunca kesilir) ve düzelt.",
    warmup: {
      recap: [
        { point: "Önceki derste if, else if ve else ile kod akışına karar vermeyi öğrendin.", example: "if (sayi % 2 === 0) {" }
      ],
      concepts: [
        {
          term: "for döngüsü",
          tr: "Sayaçla belli sayıda tekrar eder",
          summary: "for (başla; koşul; adım) üç parçalıdır: sayaç kurulur, koşul her tur önce denetlenir, adım her tur sonunda çalışır.",
          example: "for (let i = 0; i < 3; i++) {"
        },
        {
          term: "while döngüsü",
          tr: "Koşul doğru kaldığı sürece tekrar eder",
          summary: "Koşulu etkileyen bir değişken gövdede değişmezse döngü hiç bitmez.",
          example: "while (n <= 5) {"
        },
        {
          term: "break ve continue",
          tr: "Döngüyü kes ya da turu atla",
          summary: "break döngüyü tümden bitirir, continue sıradaki ture geçer.",
          example: "if (sayi > 5) break;"
        }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      {
        t: "box",
        h: "Gerçek talep",
        text: "Siparişlerin her biri için tutarı hesaplayıp toplamak gerekiyor. Beş sipariş için elle yazabilirsin, beş yüz için yazamazsın. Döngü, aynı adımı her kayıt için tekrarlar."
      },
      { t: "h", text: "for ve for...of" },
      {
        t: "cmd",
        lang: "javascript",
        text: "for (let i = 0; i < 3; i++) {\n  console.log(i);               // Çıktı: 0, sonra 1, sonra 2\n}\nfor (let i = 1; i <= 9; i += 4) {\n  console.log(i);               // Çıktı: 1, sonra 5, sonra 9\n}\nfor (const harf of \"abc\") {\n  console.log(harf);            // Çıktı: a, sonra b, sonra c\n}\nconsole.log(Array.from({ length: 5 }, (_, k) => k + 1));   // Çıktı: [ 1, 2, 3, 4, 5 ]"
      },
      {
        t: "steps",
        h: "for kuralı",
        items: ["for (başla; koşul; adım): koşul her turdan önce denetlenir; yanlışsa döngü biter. i < 3 ile sayaç 0, 1, 2 olur; 3 dahil değildir.", "Son değeri dahil etmek istiyorsan koşulu <= yaz (i <= 9) ya da son değeri bir artır.", "Adım i += 4 gibi atlayabilir, i-- ile geriye sayabilir. for...of ise sayaç tutmadan diziyi ve metni eleman eleman gezer."]
      },
      { t: "h", text: "while, break, continue ve do...while" },
      {
        t: "cmd",
        lang: "javascript",
        text: "let toplam = 0;\nlet n = 1;\nwhile (n <= 4) {\n  toplam += n;\n  n++;\n}\nconsole.log(toplam);            // Çıktı: 10\n\nfor (let sayi = 1; sayi <= 8; sayi++) {\n  if (sayi % 2 === 0) continue;   // çiftleri atla\n  if (sayi > 6) break;            // 6'dan büyükte döngüyü bitir\n  console.log(sayi);              // Çıktı: 1, sonra 3, sonra 5\n}\n\nlet k = 0;\ndo {\n  k++;\n} while (k < 3);\nconsole.log(k);                 // Çıktı: 3"
      },
      {
        t: "p",
        text: "do...while gövdeyi önce bir kez çalıştırır, koşulu sonra denetler; yani en az bir tur döner. Sık kullanılmaz ama 'önce dene, sonra bak' durumlarında uygundur."
      },
      { t: "h", text: "İç içe döngü, for...of ve for...in" },
      {
        t: "cmd",
        lang: "javascript",
        text: "for (let satir = 1; satir <= 3; satir++) {\n  let metin = \"\";\n  for (let sutun = 1; sutun <= 3; sutun++) metin += satir * sutun + \" \";\n  console.log(metin.trim());     // Çıktı: 1 2 3, sonra 2 4 6, sonra 3 6 9\n}\n\nconst renkler = [\"kırmızı\", \"mavi\", \"yeşil\"];\nfor (const r of renkler) console.log(r);       // Çıktı: kırmızı, mavi, yeşil\nfor (const i in renkler) console.log(i, typeof i);   // Çıktı: 0 string, 1 string, 2 string"
      },
      {
        t: "box",
        h: "Dikkat",
        text: "for...of eleman değerlerini verir, for...in ise anahtarları (dizide sıra numaralarını) ve onları METİN olarak verir. Dizi gezerken for...of kullan. Bir de sınır tuzağı var: i <= dizi.length yazarsan son turda dizi[i] undefined olur."
      },
      { t: "h", text: "Kendin dene" },
      { t: "alan", id: "js-5-ciro" },
      { t: "h", text: "Bozuk kodu bul ve düzelt" },
      {
        t: "steps",
        h: "Bozuk → düzeltilmiş",
        items: ["while (n <= 5) { ... } içinde n++ yok → sonsuz döngü. Koşulu etkileyen değişkeni gövdede değiştir.", "for (let i = 0; i < 5; i++) ile 1'den 5'e yazdırmak → 0, 1, 2, 3, 4 çıkar. for (let i = 1; i <= 5; i++) kullan.", "for (let i = 0; i <= dizi.length; i++) → son turda dizi[i] undefined. Koşulu i < dizi.length yap.", "for (const x in dizi) toplam += x → x metindir, toplam sayı yerine birleşmiş metin olur. Değerler için for (const x of dizi) yaz."]
      }
    ],
    objectives: [
      { id: "h1", text: "for (başla; koşul; adım) döngüsünün ürettiği sayıları ve kaç tur döndüğünü tam olarak yazabilirsin." },
      { id: "h2", text: "while döngüsünün kaç tur döneceğini ve sonunda değişkenin değerini hesaplayıp sonsuz döngüye yol açan eksiği bulabilirsin." },
      { id: "h3", text: "break ve continue içeren bir döngünün çıktısını sırayla yazabilirsin." },
      { id: "h4", text: "for...of ile for...in farkını ve 'bir eksik ya da fazla' sınır hatalarını (off-by-one) açıklayabilirsin." }
    ],
    summary: ["for (başla; koşul; adım) sayaçla döner; koşul her turdan önce denetlenir, i < 3 sayaçta 3'ü dahil etmez.", "while koşul doğru kaldıkça döner; koşulu değiştiren satır gövdede yoksa sonsuz döngü olur.", "break döngüyü bitirir, continue sıradaki ture geçer; do...while en az bir tur döner.", "for...of değerleri, for...in anahtarları (metin olarak) verir; dizi için for...of kullan.", "İç içe döngüde iç döngü her dış turda baştan döner; i <= dizi.length gibi sınır hataları son turda undefined üretir."],
    prereq: [4],
    minutes: 35,
    sonDogrulama: "2026-10-25",
    surum: "2026-10-v1",
    quiz: [
      {
        id: "8552bd3e",
        q: "for (let i = 0; i < 4; i++) console.log(i) hangi sayıları yazdırır?",
        options: ["1, 2, 3, 4", "0, 1, 2, 3", "0, 1, 2, 3, 4", "4"],
        obj: "h1"
      },
      {
        id: "6c7dd854",
        q: "for (let i = 10; i > 0; i -= 3) console.log(i) hangi sayıları yazdırır?",
        options: ["10, 7, 4, 1", "10, 7, 4, 1, -2", "7, 4, 1", "10, 7, 4"],
        obj: "h1"
      },
      {
        id: "012289d7",
        q: "let t = 0, n = 2 iken while (n <= 6) { t += n; n += 2; } bittiğinde t kaçtır?",
        options: ["6", "20", "12", "Sonsuz döngüdür"],
        obj: "h2"
      },
      {
        id: "cf519f83",
        q: "let n = 1; while (n <= 5) { console.log(n); } döngüsünün gövdesinde n hiç değiştirilmezse ne olur?",
        options: ["Hemen biter", "Bir kez çalışıp biter", "ReferenceError verir", "Sonsuz döngüye girer"],
        obj: "h2"
      },
      {
        id: "a5e91e9a",
        q: "for (let i = 1; i <= 9; i++) içinde i % 3 === 0 ise continue, i > 7 ise break, aksi halde console.log(i) çıktısı nedir?",
        options: ["1, 2, 4, 5", "1, 2, 4, 5, 7, 8", "1, 2, 4, 5, 7", "3, 6"],
        obj: "h3"
      },
      {
        id: "7fd7bc55",
        q: "break ile continue arasındaki fark nedir?",
        options: ["continue döngüyü tümden bitirir, break sıradaki ture geçer", "break döngüyü bitirir, continue sıradaki ture geçer", "İkisi de aynı işi yapar", "break yalnız while içinde çalışır"],
        obj: "h3"
      },
      {
        id: "3e8fa125",
        q: "for (const k in ['x', 'y']) console.log(k) ne yazdırır?",
        options: ["0 ve 1, ikisi de metin (string)", "x ve y", "0 ve 1, ikisi de sayı", "undefined, undefined"],
        obj: "h4"
      },
      {
        id: "98f47ac4",
        q: "const dizi = ['a', 'b', 'c']; for (let i = 0; i <= dizi.length; i++) console.log(dizi[i]) kodunda sorun nedir?",
        options: ["Hiçbir sorun yok", "RangeError verir", "Döngü hiç çalışmaz", "Son turda dizi[i] undefined olur; koşul < olmalıdır"],
        obj: "h4"
      }
    ],
    interview: [
      {
        q: "for ile while ne zaman tercih edilir?",
        a: "Kaç tur döneceği ya da hangi dizinin gezileceği belliyse for. Ne zaman biteceği bir koşula bağlıysa (kullanıcı çıkana kadar gibi) while."
      },
      {
        q: "for...of ile for...in arasındaki fark nedir?",
        a: "for...of değerleri verir, dizi ve metin gezmek için doğrusu odur. for...in anahtarları verir ve dizide bunlar metin olarak gelir; nesnenin anahtarlarını gezmek için kullanırım."
      }
    ],
    vocab: [
      { term: "loop", tr: "döngü", ex: "The loop runs five times." },
      { term: "iteration", tr: "tur, yineleme", ex: "Each iteration reads one order." },
      { term: "infinite loop", tr: "sonsuz döngü", ex: "A missing counter causes an infinite loop." },
      { term: "counter", tr: "sayaç", ex: "Increase the counter in each turn." },
      { term: "off-by-one", tr: "bir eksik ya da fazla hatası", ex: "Using <= instead of < is an off-by-one error." }
    ],
    sources: [
      { title: "MDN: Döngüler ve yineleme (JavaScript Kılavuzu)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration" },
      { title: "MDN: for deyimi", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for" },
      { title: "MDN: for...of deyimi", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of" },
      { title: "MDN: while deyimi", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while" }
    ]
  };

  /* 6 ───────────────────────────────────────────── Dizi yöntemleri: map, filter, forEach */
  L[6] = {
    hook: "Dizinin her elemanına aynı işi yaptırmanın üç yolu var: map yeni bir dizi üretir, filter süzer, forEach yalnız iş yapar. Hangisinin ne döndürdüğünü bilmek yarı iştir.",
    homework: "Beş sayılık bir dizi kur. map ile her sayıyı iki katına çıkar, filter ile 10'dan büyükleri ayır, forEach ile her elemanı sırasıyla yazdır. Sonra filter(...).map(...) zinciri kur. Bilerek map içinde süslü parantez açıp return yazmayı unut ve sonucun [undefined, ...] çıktığını gözlemle.",
    warmup: {
      recap: [
        { point: "Önceki derste for ve for...of ile diziyi eleman eleman gezmeyi öğrendin.", example: "for (const r of renkler) {" }
      ],
      concepts: [
        {
          term: "map",
          tr: "Her elemandan yeni bir değer üretir",
          summary: "Geri çağırma işlevinin döndürdüğü değerlerden aynı uzunlukta yeni bir dizi kurar; asıl diziyi değiştirmez.",
          example: "sayilar.map((x) => x * 2)"
        },
        {
          term: "filter",
          tr: "Koşulu sağlayan elemanları ayırır",
          summary: "İşlev doğru (truthy) değer döndürürse eleman yeni diziye girer; sonuç asıl diziden kısa olabilir.",
          example: "sayilar.filter((x) => x > 5)"
        },
        {
          term: "forEach",
          tr: "Her eleman için işlev çalıştırır",
          summary: "Yan etki içindir (yazdırmak gibi); hiçbir şey döndürmez, yani sonucu undefined'dır.",
          example: "sayilar.forEach((x) => console.log(x))"
        }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      {
        t: "box",
        h: "Gerçek talep",
        text: "Sipariş listesinden yalnız pahalı olanları ayırmak, her fiyata vergi eklemek, adları ekrana basmak gerekir. Hepsini elle yazılmış bir for yerine tek satırlık map, filter ve forEach ile okunur biçimde yaparsın."
      },
      { t: "h", text: "map, filter ve forEach" },
      {
        t: "cmd",
        lang: "javascript",
        text: "const fiyatlar = [5, 12, 8, 20];\nconst ikiKati = fiyatlar.map((f) => f * 2);\nconsole.log(ikiKati);            // Çıktı: [ 10, 24, 16, 40 ]\nconsole.log(fiyatlar);           // Çıktı: [ 5, 12, 8, 20 ]\nconsole.log(fiyatlar.filter((f) => f >= 10));   // Çıktı: [ 12, 20 ]\nfiyatlar.forEach((f, sira) => console.log(sira, f));   // Çıktı: 0 5, sonra 1 12, sonra 2 8, sonra 3 20\nconst sonuc = fiyatlar.forEach((f) => f);\nconsole.log(sonuc);              // Çıktı: undefined"
      },
      {
        t: "steps",
        h: "Üç yöntemin kuralı",
        items: ["map: her eleman için döndürülen değerlerden aynı uzunlukta YENİ dizi üretir; asıl dizi değişmez.", "filter: işlev doğru (truthy) döndüren elemanları yeni diziye alır; eleman değerini değiştirmez.", "forEach: yeni dizi vermez, sonucu undefined'dır; içinde break ya da continue kullanılamaz. Yeni dizi gerekiyorsa map, süzme gerekiyorsa filter kullan."]
      },
      { t: "h", text: "Zincirleme ve toplama" },
      {
        t: "cmd",
        lang: "javascript",
        text: "const fiyatlar = [5, 12, 8, 20];\nconsole.log(fiyatlar.filter((f) => f > 6).map((f) => f + 1));   // Çıktı: [ 13, 9, 21 ]\nconsole.log(fiyatlar.reduce((t, f) => t + f, 0));              // Çıktı: 45\n\nconsole.log([5, 6].map((x) => { x + 1 }));   // Çıktı: [ undefined, undefined ]\nconsole.log([5, 6].map((x) => x + 1));       // Çıktı: [ 6, 7 ]"
      },
      {
        t: "box",
        h: "Dikkat",
        text: "Ok fonksiyonunda süslü parantez açtıysan return'ü kendin yazmalısın; yazmazsan map [undefined, ...] üretir ve JavaScript hata vermez. Süslü parantezsiz tek ifade yazarsan değer kendiliğinden döner. Ayrıca zincirde filter'ı önce koymak, map'in daha az eleman işlemesini sağlar."
      },
      { t: "h", text: "Kendin dene" },
      { t: "alan", id: "js-6-liste" },
      { t: "h", text: "Bozuk kodu bul ve düzelt" },
      {
        t: "steps",
        h: "Bozuk → düzeltilmiş",
        items: ["sayilar.map((x) => { x * 3 }) → [undefined, ...]. Süslü parantezde return yaz: (x) => { return x * 3 } ya da parantezsiz (x) => x * 3.", "const yeni = sayilar.forEach((x) => x * 3) → yeni undefined olur. Yeni dizi istiyorsan forEach yerine map kullan.", "sayilar.filter((x) => x * 0) ile hiçbir şey ayırmak → 0 yanlış sayıldığı için boş dizi çıkar. Süzme ölçütü bir karşılaştırma olsun: filter((x) => x > 0).", "sayilar.forEach((x) => { if (x > 3) break; }) → SyntaxError. forEach döngü deyimi değildir; erken çıkmak için for...of kullan."]
      }
    ],
    objectives: [
      { id: "h1", text: "map ile bir dizinin her elemanından yeni değer üretip sonucu ve asıl dizinin değişmediğini yazabilirsin." },
      { id: "h2", text: "filter'ın hangi elemanları seçtiğini, 0 gibi yanlış sayılan değerlerin etkisiyle birlikte söyleyebilirsin." },
      { id: "h3", text: "forEach'in ne döndürdüğünü ve içinde break kullanılamayacağını açıklayabilirsin." },
      { id: "h4", text: "filter ve map zincirinin sonucunu izleyip süslü parantezde return unutma hatasını düzeltebilirsin." }
    ],
    summary: ["map her elemandan yeni bir dizi üretir; asıl dizi değişmez.", "filter, işlevi doğru (truthy) döndüren elemanları seçer; 0, '' ve undefined yanlış sayılır.", "forEach yalnız iş yapar ve undefined döndürür; içinde break ya da continue kullanılamaz.", "filter ve map zincirleme çalışır; her biri bir öncekinin döndürdüğü yeni diziyi işler.", "Ok fonksiyonunda süslü parantez açtıysan return şarttır; yoksa sonuç undefined olur ve hata görünmez."],
    prereq: [5],
    minutes: 35,
    sonDogrulama: "2026-10-25",
    surum: "2026-10-v1",
    quiz: [
      {
        id: "5bb195f2",
        q: "[3, 5, 8].map((x) => x + 1) ifadesi neye eşittir?",
        options: ["[3, 5, 8]", "[4, 6, 9]", "17", "[4]"],
        obj: "h1"
      },
      {
        id: "0377616c",
        q: "const a = [1, 2]; const b = a.map((x) => x * 10); satırlarından sonra a nedir?",
        options: ["[10, 20]", "undefined", "[1, 2]", "[1, 2, 10, 20]"],
        obj: "h1"
      },
      {
        id: "3796ceb4",
        q: "[4, 9, 12, 7].filter((x) => x > 8) ifadesi neye eşittir?",
        options: ["[4, 7]", "[9, 12]", "[true, true]", "[9, 12, 7]"],
        obj: "h2"
      },
      {
        id: "14d672fc",
        q: "[0, 1, 2].filter((x) => x) ifadesi neye eşittir?",
        options: ["[0, 1, 2]", "[]", "[0]", "[1, 2]"],
        obj: "h2"
      },
      {
        id: "73374765",
        q: "const r = [1, 2].forEach((x) => x * 2); satırından sonra r nedir?",
        options: ["[2, 4]", "[1, 2]", "undefined", "6"],
        obj: "h3"
      },
      {
        id: "78a65a21",
        q: "[1, 2, 3].forEach((x) => { if (x === 2) break; }) çalıştırılırsa ne olur?",
        options: ["İlk elemandan sonra durur, hata vermez", "İkinci elemanda döngü biter, hata vermez", "SyntaxError verir", "Sonsuz döngüye girer"],
        obj: "h3"
      },
      {
        id: "6fdf9036",
        q: "[1, 2, 3, 4].filter((x) => x % 2 === 0).map((x) => x * 10) ifadesi neye eşittir?",
        options: ["[10, 30]", "[2, 4]", "[20, 40]", "[10, 20, 30, 40]"],
        obj: "h4"
      },
      {
        id: "e327e709",
        q: "[1, 2, 3].map((x) => { x * 2 }) ifadesi neye eşittir?",
        options: ["[2, 4, 6]", "[undefined, undefined, undefined]", "SyntaxError verir", "[1, 2, 3]"],
        obj: "h4"
      }
    ],
    interview: [
      {
        q: "map ile forEach arasındaki fark nedir?",
        a: "map her elemandan yeni bir dizi üretip döndürür ve asıl diziyi değiştirmez. forEach hiçbir şey döndürmez, yalnız her eleman için bir iş yapar. Sonuç lazımsa map, yalnız yazdırmak gibi yan etki lazımsa forEach."
      },
      {
        q: "filter'a verilen işlev ne döndürmeli?",
        a: "Doğru ya da yanlış olarak yorumlanabilecek bir değer. Doğru (truthy) dönen elemanlar yeni diziye alınır. Genelde bir karşılaştırma yazarım; 0 ya da boş metin gibi yanlış sayılan değerlerin sessizce elenebileceğini bilirim."
      }
    ],
    vocab: [
      { term: "array", tr: "dizi", ex: "An array holds many values." },
      { term: "callback", tr: "geri çağırma işlevi", ex: "map takes a callback." },
      { term: "map", tr: "dönüştür (yeni dizi üret)", ex: "Use map to double each price." },
      { term: "filter", tr: "süz", ex: "Filter keeps the expensive orders." },
      { term: "truthy", tr: "doğru sayılan değer", ex: "The number 5 is truthy; 0 is not." }
    ],
    sources: [
      { title: "MDN: Array.prototype.map()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map" },
      { title: "MDN: Array.prototype.filter()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter" },
      { title: "MDN: Array.prototype.forEach()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach" },
      { title: "MDN: İndeksli koleksiyonlar (JavaScript Kılavuzu)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections" }
    ]
  };

  /* 7 ───────────────────────────────────────────── Nesneler */
  L[7] = {
    hook: "Nesne, adı olan alanlardan kurulu bir kayıttır: sıra numarası değil adı söylersin, değer gelir. Ürün, kişi, sipariş; gerçek veri hep nesnedir.",
    homework: "Ad, stok ve fiyat alanlı bir ürün nesnesi kur. Yeni bir alan ekle, stoku artır, bir alanı sil. Olmayan bir alanı oku ve ne döndüğünü gözle. Object.entries ile alanları yazdır. const ile tanımlayıp alanını değiştir; neden hata vermediğini ve b = a ile kopya almanın neden kopya olmadığını açıkla.",
    warmup: {
      recap: [
        { point: "Önceki derste dizilerde map, filter ve forEach ile eleman eleman çalışmayı gördün.", example: "sayilar.map((x) => x * 2)" }
      ],
      concepts: [
        {
          term: "Nesne (object)",
          tr: "Anahtar ve değer çiftleri",
          summary: "Süslü parantezle yazılır; değere sıra değil anahtarla erişirsin.",
          example: "{ ad: \"boya\", stok: 9 }"
        },
        {
          term: "Nokta ve köşeli parantez",
          tr: "Alana erişmenin iki yolu",
          summary: "urun.ad sabit adla, urun[degisken] ise adı bir değişkenden alarak okur.",
          example: "urun[alan]"
        },
        {
          term: "Referans",
          tr: "Nesne değil, nesneye giden adres kopyalanır",
          summary: "b = a iki adı aynı nesneye bağlar; birinden yapılan değişiklik diğerinde de görünür.",
          example: "const b = a;"
        }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      {
        t: "box",
        h: "Gerçek talep",
        text: "Bir sipariş aynı anda ürün adı, adet ve fiyat taşır. Bunları üç ayrı dizide sıra numarasına güvenerek tutmak kırılgandır. Bir nesne hepsini adıyla bir arada tutar ve okunur kalır."
      },
      { t: "h", text: "Okumak, eklemek, silmek" },
      {
        t: "cmd",
        lang: "javascript",
        text: "const urun = { ad: \"boya\", stok: 9 };\nurun.fiyat = 14.5;\nurun.stok += 3;\nconsole.log(urun);                 // Çıktı: { ad: 'boya', stok: 12, fiyat: 14.5 }\nconsole.log(urun.ad, urun[\"stok\"]);   // Çıktı: boya 12\nconst alan = \"fiyat\";\nconsole.log(urun[alan], urun.alan);   // Çıktı: 14.5 undefined\nconsole.log(urun.renk);            // Çıktı: undefined\ndelete urun.fiyat;\nconsole.log(Object.keys(urun));    // Çıktı: [ 'ad', 'stok' ]\nconsole.log(Object.values(urun));  // Çıktı: [ 'boya', 12 ]\nfor (const [anahtar, deger] of Object.entries(urun)) {\n  console.log(anahtar, deger);     // Çıktı: ad boya, sonra stok 12\n}\nconsole.log(\"ad\" in urun, \"boya\" in urun);   // Çıktı: true false"
      },
      {
        t: "steps",
        h: "Nesne kuralları",
        items: ["Olmayan alanı okumak hata vermez, undefined döndürür; bu yüzden yazım hataları sessiz kalır.", "urun.alan harfi harfine 'alan' adlı alanı arar; adı değişkenden almak için urun[alan] yaz.", "in operatörü anahtarlara bakar, değerlere değil. Object.keys, values ve entries sırayla anahtar, değer ve [anahtar, değer] çiftlerini dizi olarak verir."]
      },
      { t: "h", text: "const, referans ve kopya" },
      {
        t: "cmd",
        lang: "javascript",
        text: "const a = { n: 1, ic: { x: 1 } };\nconst b = a;                 // aynı nesneye ikinci ad\nconst c = { ...a };          // yeni nesne (yüzeysel kopya)\nb.n = 7;\nc.ic.x = 9;\nconsole.log(a.n, c.n, a.ic.x);   // Çıktı: 7 1 9\n\nconst sabit = { puan: 3 };\nsabit.puan = 4;              // hata yok: nesnenin İÇİ değişiyor\nconsole.log(sabit);          // Çıktı: { puan: 4 }\n\nconst bos = {};\nconsole.log(bos.adres?.sehir);   // Çıktı: undefined\ntry { console.log(bos.adres.sehir); } catch (e) { console.log(e.name + \": \" + e.message); }\n// Çıktı: TypeError: Cannot read properties of undefined (reading 'sehir')"
      },
      {
        t: "box",
        h: "Dikkat",
        text: "const, adın başka şeye bağlanmasını engeller; nesnenin içini dondurmaz. { ...a } yalnız üst düzey alanları kopyalar, iç içe nesne hâlâ ortaktır. Olmayan alanın içine inmek (bos.adres.sehir) TypeError verir; ?. bunu undefined'a çevirir."
      },
      { t: "h", text: "Kendin dene" },
      { t: "alan", id: "js-7-nesne" },
      { t: "h", text: "Bozuk kodu bul ve düzelt" },
      {
        t: "steps",
        h: "Bozuk → düzeltilmiş",
        items: ["urun.Stok (alan adı stok) → undefined. JavaScript büyük küçük harfi ayırır; urun.stok yaz.", "const k = 'fiyat'; urun.k → undefined. Adı değişkenden almak için urun[k] yaz.", "const kisi = {}; kisi.adres.sehir → TypeError. Önce kisi.adres = { sehir: 'Adana' } ile kur ya da kisi.adres?.sehir ile oku.", "const b = a; b.n = 5 ile a'yı korumayı beklemek → a.n de 5 olur. Ayrı nesne için const b = { ...a } yaz."]
      }
    ],
    objectives: [
      { id: "h1", text: "Nesneye alan ekleyip güncelleyebilir, nokta ve köşeli parantez erişimini doğru kullanabilirsin." },
      { id: "h2", text: "in, Object.keys, Object.values ve Object.entries işlemlerinin neyi kontrol ettiğini ya da verdiğini söyleyebilirsin." },
      { id: "h3", text: "const ile tanımlı nesnenin içinin değişebildiğini ve b = a ataması sonrasındaki değerleri açıklayabilirsin." },
      { id: "h4", text: "Olmayan alan okumanın undefined, ardından iç alana inmenin TypeError verdiğini ayırt edebilirsin." }
    ],
    summary: ["Nesne { anahtar: değer } biçimindedir; yeni alan atamayla eklenir, olan alan güncellenir.", "urun.ad sabit adı, urun[degisken] değişkendeki adı okur; olmayan alan undefined verir.", "in anahtarlara bakar; Object.keys anahtarları, values değerleri, entries [anahtar, değer] çiftlerini verir.", "const adın yeniden atanmasını engeller, nesnenin içini değil; b = a aynı nesneye ikinci addır, { ...a } yüzeysel kopyadır.", "Olmayan alanı okumak undefined, onun içine inmek TypeError verir; ?. ikincisini undefined'a çevirir."],
    prereq: [6],
    minutes: 35,
    sonDogrulama: "2026-10-25",
    surum: "2026-10-v1",
    quiz: [
      {
        id: "38a16ff4",
        q: "const o = { ad: 'Ada' }; o.yas = 30; satırlarından sonra Object.keys(o).length kaçtır?",
        options: ["1", "30", "Hata verir", "2"],
        obj: "h1"
      },
      {
        id: "c35918e6",
        q: "const k = 'renk'; const o = { renk: 'mavi', k: 'kırmızı' }; ise o[k] nedir?",
        options: ["mavi", "kırmızı", "undefined", "renk"],
        obj: "h1"
      },
      {
        id: "c63b46ab",
        q: "Object.entries({ a: 1, b: 2 }) ifadesi neye eşittir?",
        options: ["['a', 'b']", "[1, 2]", "[['a', 1], ['b', 2]]", "{ a: 1, b: 2 }"],
        obj: "h2"
      },
      {
        id: "5b1256b7",
        q: "'adet' in { adet: 5 } ve 5 in { adet: 5 } sonuçları sırasıyla nedir?",
        options: ["true, true", "false, true", "false, false", "true, false"],
        obj: "h2"
      },
      {
        id: "1aa7d0c8",
        q: "const o = { n: 1 }; o.n = 2; satırı çalıştırılırsa ne olur?",
        options: ["TypeError: Assignment to constant variable", "SyntaxError verir", "n 1 olarak kalır", "n 2 olur, hata yok"],
        obj: "h3"
      },
      {
        id: "a5108981",
        q: "const a = { n: 2 }; const b = a; b.n = 5; satırlarından sonra a.n nedir?",
        options: ["2", "undefined", "5", "Hata verir"],
        obj: "h3"
      },
      {
        id: "8e25951f",
        q: "const o = {}; o.a.b ifadesi ne yapar?",
        options: ["undefined döndürür", "TypeError verir", "null döndürür", "Boş bir nesne kurar"],
        obj: "h4"
      },
      {
        id: "9eb59d8f",
        q: "const o = { a: 1 }; o.b nedir?",
        options: ["ReferenceError verir", "null", "0", "undefined"],
        obj: "h4"
      }
    ],
    interview: [
      {
        q: "const ile tanımlı nesnenin alanını neden değiştirebiliyorum?",
        a: "const adın başka bir değere bağlanmasını engeller, nesnenin içindekini dondurmaz. Alanı değiştirmek aynı nesne üzerinde olur. İçini de korumak istersem Object.freeze kullanırım."
      },
      {
        q: "Bir nesneyi nasıl kopyalarım ve neye dikkat ederim?",
        a: "{ ...a } ile yeni bir nesne kurarım; ama bu yüzeysel kopyadır. İçindeki nesneler ortak kalır, iç nesneyi de değiştirmem gerekiyorsa onu da ayrıca kopyalarım."
      }
    ],
    vocab: [
      { term: "object", tr: "nesne", ex: "An object stores named values." },
      { term: "property", tr: "alan, özellik", ex: "The object has a price property." },
      { term: "key", tr: "anahtar", ex: "Each key is a name." },
      { term: "reference", tr: "referans", ex: "Two names can share one reference." },
      { term: "shallow copy", tr: "yüzeysel kopya", ex: "A shallow copy shares inner objects." }
    ],
    sources: [
      { title: "MDN: Nesnelerle çalışmak (JavaScript Kılavuzu)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects" },
      { title: "MDN: Object.entries()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries" },
      { title: "MDN: const deyimi", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const" }
    ]
  };

  /* 8 ───────────────────────────────────────────── Fonksiyonlar ve ok fonksiyonları */
  L[8] = {
    hook: "Fonksiyon, bir işe verdiğin addır: bir kez yaz, istediğin kadar çağır. Girdisi parametre, çıktısı return'dür; ok fonksiyonu aynı şeyin kısa yazılışıdır.",
    homework: "Bir tutar(adet, fiyat) fonksiyonu yaz ve fiyat için varsayılan değer belirle. Aynı işi ok fonksiyonuyla da yaz. Sonra bir siparişin tutarı 500'ü aşıyorsa 'indirimli' döndüren ikinci bir fonksiyon yaz. Bilerek return'ü silip sonucun undefined çıktığını, bir argümanı vermeyip NaN çıktığını görmeyi dene.",
    warmup: {
      recap: [
        { point: "Önceki derslerde değişkenleri, koşulları, döngüleri, dizileri ve nesneleri öğrendin.", example: "urunler.filter((u) => u.stok > 0)" }
      ],
      concepts: [
        {
          term: "Fonksiyon (function)",
          tr: "Adı olan, çağrılabilen kod bloğu",
          summary: "function ile tanımlanır; çağrılana kadar çalışmaz.",
          example: "function tutar(adet, fiyat) {"
        },
        {
          term: "Ok fonksiyonu (arrow function)",
          tr: "Kısa yazılışlı fonksiyon",
          summary: "Parametrelerden sonra => gelir; süslü parantezsiz tek ifade değeri kendiliğinden döndürür.",
          example: "const kare = (x) => x * x;"
        },
        {
          term: "Kapsam (scope)",
          tr: "Bir adın geçerli olduğu alan",
          summary: "Fonksiyon içinde let ya da const ile tanımlanan ad yereldir, dışarıdan görünmez.",
          example: "const yerel = 5; yalnız fonksiyon içinde geçerlidir"
        }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      {
        t: "box",
        h: "Gerçek talep",
        text: "Tutar hesabı beş farklı yerde lazım. Her yere aynı iki satırı yapıştırırsan formül değiştiğinde beş yeri düzeltmen gerekir. Bir kez yazılmış fonksiyon tek yerden düzeltilir; map ve filter'a verdiğin ok fonksiyonları da aynı fikrin kısa halidir."
      },
      { t: "h", text: "Tanımlamak ve çağırmak" },
      {
        t: "cmd",
        lang: "javascript",
        text: "function tutar(adet, fiyat = 10) {\n  return adet * fiyat;\n}\nconsole.log(tutar(3));         // Çıktı: 30\nconsole.log(tutar(3, 2.5));    // Çıktı: 7.5\n\nconst kare = (x) => x * x;\nconst topla = (a, b) => {\n  return a + b;\n};\nconsole.log(kare(6), topla(2, 3));   // Çıktı: 36 5\n\nfunction selamla(ad) {\n  console.log('Merhaba', ad);   // Çıktı: Merhaba Ada\n}\nconst s = selamla('Ada');\nconsole.log(s);                // Çıktı: undefined"
      },
      {
        t: "steps",
        h: "Temel kurallar",
        items: ["function ad(parametreler) { ... } ile tanımlanır; ok fonksiyonu (parametreler) => ifade ya da (parametreler) => { ... } biçimindedir.", "return değeri çağırana verir ve fonksiyonu hemen bitirir; return yoksa fonksiyon undefined döndürür. Süslü parantezsiz ok fonksiyonu değeri kendiliğinden döndürür.", "JavaScript'te argüman sayısı denetlenmez: verilmeyen parametre undefined olur, fazlası yok sayılır. Varsayılan değer (fiyat = 10) yalnız argüman gelmezse ya da undefined gelirse devreye girer."]
      },
      { t: "h", text: "Erken return ve kapsam" },
      {
        t: "cmd",
        lang: "javascript",
        text: "function erken(x) {\n  if (x < 0) return 'negatif';\n  return 'sıfır ya da pozitif';\n}\nconsole.log(erken(-1), erken(5));   // Çıktı: negatif sıfır ya da pozitif\n\nlet sayac = 10;\nfunction artir() {\n  let sayac = 1;      // yerel ad, dıştaki sayac değişmez\n  sayac++;\n  return sayac;\n}\nconsole.log(artir(), sayac);   // Çıktı: 2 10\n\nfunction disari() {\n  const yerel = 5;\n  return yerel;\n}\ntry { console.log(yerel); } catch (e) { console.log(e.name + ': ' + e.message); }\n// Çıktı: ReferenceError: yerel is not defined\n\nconst kare = (x) => x * x;\nconsole.log(kare());           // Çıktı: NaN"
      },
      {
        t: "box",
        h: "Dikkat",
        text: "const ya da let ile tanımlanan fonksiyon ifadesi (const f = () => ...) tanımlanmadan önce çağrılırsa 'before initialization' ReferenceError verir; function bildirimi ise yukarı taşınır. Eksik argüman hata değildir, parametre undefined olur ve hesap sessizce NaN çıkarır."
      },
      { t: "h", text: "Kendin dene" },
      { t: "alan", id: "js-8-islev" },
      { t: "h", text: "Bozuk kodu bul ve düzelt" },
      {
        t: "steps",
        h: "Bozuk → düzeltilmiş",
        items: ["function tutar(adet, fiyat) { adet * fiyat; } → sonuç undefined. Gövdeye return ekle: return adet * fiyat;", "const ikiKati = (x) => { x * 2 }; → undefined döner. Süslü parantezi kaldır: (x) => x * 2 ya da return yaz.", "tutar(3) tanımda iki parametre varken → fiyat undefined, sonuç NaN. İkisini ver ya da fiyat için varsayılan tanımla: fiyat = 10.", "yazdir('Ada') satırı const yazdir = (ad) => ... tanımından önce → ReferenceError. Önce tanımla, sonra çağır."]
      }
    ],
    objectives: [
      { id: "h1", text: "function ile varsayılan değerli parametreleri olan bir fonksiyon ve ok fonksiyonu yazıp çağrının sonucunu söyleyebilirsin." },
      { id: "h2", text: "return'ün fonksiyonu bitirip değer verdiğini ve return olmayan fonksiyonun undefined döndürdüğünü açıklayabilirsin." },
      { id: "h3", text: "Yerel ve dış adların hangi değeri göstereceğini, fonksiyon içindeki let ya da const adlarının dışarıdan görünmediğini söyleyebilirsin." },
      { id: "h4", text: "Tanım sırası, eksik argüman ve return unutma gibi hataları bulup düzeltebilirsin." }
    ],
    summary: ["function ad(parametreler) { } ya da (parametreler) => ifade ile tanımlanır; çağrılana kadar gövde çalışmaz.", "return değeri çağırana verir ve fonksiyonu bitirir; return yoksa sonuç undefined olur.", "Süslü parantezsiz ok fonksiyonu değeri kendiliğinden döndürür; süslü parantez açtıysan return şarttır.", "Fonksiyon içinde let ya da const ile tanımlanan ad yereldir; aynı adlı dış değişken değişmez.", "Eksik argüman hata vermez, parametre undefined olur; const ile tanımlı fonksiyon, tanımından önce çağrılamaz."],
    prereq: [7],
    minutes: 35,
    sonDogrulama: "2026-10-25",
    surum: "2026-10-v1",
    quiz: [
      {
        id: "ee72e4aa",
        q: "function topla(a, b = 5) { return a + b; } tanımı için topla(3) ne döndürür?",
        options: ["3", "NaN", "8", "Hata verir"],
        obj: "h1"
      },
      {
        id: "21c87c5f",
        q: "const kare = (x) => x * x; ise kare(5) ne döndürür?",
        options: ["10", "25", "undefined", "(x) => x * x"],
        obj: "h1"
      },
      {
        id: "25e9fb9e",
        q: "function yaz(m) { console.log(m); } tanımı için const s = yaz('a'); sonrasında s nedir?",
        options: ["'a'", "undefined", "null", "0"],
        obj: "h2"
      },
      {
        id: "2104bdad",
        q: "function f() { return 1; console.log('x'); } için f() çağrılınca ne olur?",
        options: ["1 döner, 'x' yazılmaz", "'x' yazılır, sonra 1 döner", "'x' yazılır, undefined döner", "SyntaxError verir"],
        obj: "h2"
      },
      {
        id: "768743dd",
        q: "let puan = 20; function f() { let puan = 4; puan += 2; return puan; } ise console.log(f(), puan) ne yazar?",
        options: ["6 6", "24 20", "6 20", "Hata verir"],
        obj: "h3"
      },
      {
        id: "10d4c08f",
        q: "function g() { const yerel = 5; } tanımından sonra g()'yi çağırıp console.log(yerel) yazılırsa ne olur?",
        options: ["5 yazılır", "undefined yazılır", "ReferenceError verir", "null yazılır"],
        obj: "h3"
      },
      {
        id: "10c05906",
        q: "karsila('Ada'); satırından SONRA const karsila = (ad) => console.log(ad); yazılırsa ne olur?",
        options: ["'Ada' yazılır", "undefined döner, hata vermez", "TypeError verir", "ReferenceError verir"],
        obj: "h4"
      },
      {
        id: "9298a576",
        q: "function carp(a, b) { return a * b; } tanımı için carp(3) ne döndürür?",
        options: ["3", "0", "Hata verir", "NaN"],
        obj: "h4"
      }
    ],
    interview: [
      {
        q: "Parametre ile argüman arasındaki fark nedir?",
        a: "Parametre fonksiyon tanımındaki addır, argüman çağrıda verdiğim değerdir. function f(x) içinde x parametre, f(5) içinde 5 argümandır."
      },
      {
        q: "function bildirimi ile const f = () => {} arasındaki fark nedir?",
        a: "function bildirimi yukarı taşınır, tanımdan önce de çağrılabilir. const ile tanımlanan ok fonksiyonu tanım satırına gelmeden çağrılırsa ReferenceError verir. Ok fonksiyonu ayrıca kısa yazılır ve map ya da filter içinde çok kullanılır."
      }
    ],
    vocab: [
      { term: "function", tr: "fonksiyon", ex: "Call the function twice." },
      { term: "parameter", tr: "parametre", ex: "The function has two parameters." },
      { term: "argument", tr: "argüman", ex: "Pass an argument when you call it." },
      { term: "return value", tr: "dönüş değeri", ex: "The return value is the total." },
      { term: "arrow function", tr: "ok fonksiyonu", ex: "An arrow function is a short function." }
    ],
    sources: [
      { title: "MDN: Fonksiyonlar (JavaScript Kılavuzu)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions" },
      { title: "MDN: Ok fonksiyonları", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions" },
      { title: "MDN: Varsayılan parametreler", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters" }
    ]
  };
})();

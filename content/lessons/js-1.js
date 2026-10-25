/* JavaScript (tarayıcı JS'i, ES2015+) · sabit dersler 1-4 (değişkenler ve türler, metin ve şablon dizesi, operatörler ve karşılaştırma, koşullar). Kapsam herkese açık MDN ve ECMAScript belgelerinden alınmıştır; metinler özgündür.
   Dış kaynak: yalnız HTTP 200 dönenler (curl, 2026-10-25). Kod örnekleri Node ile çalıştırılarak doğrulandı; alıştırmalar PP.alan (new Function) ile çalışır (js-alan.js). */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).js = (window.PP_LESSONS.js || {}));

  /* 1 ───────────────────────────────────────────── Değişkenler ve veri türleri (let/const) */
  L[1] = {
    hook: "Değişken, bir değere yapıştırdığın etikettir: kutuyu değil etiketi taşırsın. let etiketi başka değere taşıyabilir, const ise etiketi yerine çivileyerek bırakır.",
    homework: "Bir markette aldığın üç ürün için değişken tanımla: ad (string), adet (number), birim fiyat (number). Değişmeyecek olanlara const, değişecek olanlara let ver. Toplamı hesaplayıp typeof ile her değişkenin türünü yazdır. Sonra bilerek iki hata yap (rakamla başlayan ad, const'a yeniden atama), mesajları oku ve düzelt.",
    warmup: {
      recap: [
        {
          point: "Bu ilk JavaScript dersi. Daha önce kod yazmadıysan sorun değil; her örnek tek başına çalışır.",
          example: "console.log(\"merhaba\") konsola merhaba yazar"
        }
      ],
      concepts: [
        { term: "Değişken (variable)", tr: "Değere verilen ad", summary: "let ve const ile tanımlanır; eşittir işareti değeri sağdan alıp soldaki ada bağlar.", example: "let sayac = 100" },
        {
          term: "Veri türü (data type)",
          tr: "Değerin cinsi",
          summary: "number, string, boolean, undefined ve null temel türlerdir; typeof türü söyler.",
          example: "29 number, \"Defne\" string, true boolean"
        },
        {
          term: "Tür dönüşümü (type conversion)",
          tr: "Bir türü başka türe çevirmek",
          summary: "Number(), String() ve parseInt() ile yapılır; başarısız sayı dönüşümü hata değil NaN verir.",
          example: "Number(\"40\") sonucu 40"
        }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      {
        t: "box",
        h: "Gerçek talep",
        text: "Bir arkadaşın sipariş listesini toplatmak istiyor. Kod, adetleri ve fiyatları bir yerde tutmak zorunda. O yer değişkendir. Hangi türde tuttuğun, toplamın doğru çıkıp çıkmayacağını belirler."
      },
      { t: "h", text: "Değişken oluşturmak: let ve const" },
      {
        t: "steps",
        h: "Üç kural",
        items: ["Atama: let ad = değer. Eşittir 'eşit mi?' diye sormaz, sağdaki değeri soldaki ada bağlar. Değişmeyecek değerler için const kullan; const'a ikinci kez atarsan TypeError alırsın.", "Ad kuralı: harf, alt çizgi (_) ya da $ ile başlar; harf, rakam, _ ve $ içerir. net_fiyat ve $kdv geçerli, 9kutu ve net-fiyat geçersizdir.", "Büyük küçük harf ayrılır: kutu ile Kutu farklı değişkenlerdir. let, const, if gibi ayrılmış sözcükler ad olamaz. Alışkanlık olarak ad iki sözcükse küçük harfle başlayıp ikinci sözcüğü büyük yaz: birimFiyat."]
      },
      { t: "h", text: "Temel türler ve typeof" },
      {
        t: "cmd",
        lang: "js",
        text: "const ad = \"Defne\";\nlet yas = 29;\nconst boy = 1.68;\nlet ogrenciMi = true;\nlet notDefteri;\nconsole.log(ad, typeof ad);\nconsole.log(yas, typeof yas);\nconsole.log(boy, typeof boy);\nconsole.log(ogrenciMi, typeof ogrenciMi);\nconsole.log(notDefteri, typeof notDefteri);\n\n// Çıktı:\n// Defne string\n// 29 number\n// 1.68 number\n// true boolean\n// undefined undefined"
      },
      {
        t: "box",
        h: "Dikkat",
        text: "JavaScript'te tam sayı ile ondalıklı sayı ayrı tür değildir: ikisi de number. Tırnak içindeki her şey stringdir: \"42\" metin, 42 sayıdır. Değer verilmemiş bir let, undefined taşır. Ondalık ayırıcı virgül değil noktadır."
      },
      { t: "h", text: "Tür dönüşümü ve sessiz hatalar" },
      {
        t: "cmd",
        lang: "js",
        text: "let sayac = 100;\nsayac = sayac + 15;\nconsole.log(sayac);\nconsole.log(\"40\" + 2);\nconsole.log(Number(\"40\") + 2);\nconsole.log(\"40\" - 2);\nconsole.log(Number(\"kırk\"));\nconsole.log(parseInt(\"3.9\"));\nconsole.log(String(42) + \" adet\");\n\n// Çıktı:\n// 115\n// 402\n// 42\n// 38\n// NaN\n// 3\n// 42 adet"
      },
      {
        t: "p",
        text: "+ işleci bir tarafta string görürse birleştirir: \"40\" + 2 sonucu 402 olur. - işleci ise her zaman sayı bekler, o yüzden \"40\" - 2 sonucu 38'dir. Sayıya çevrilemeyen metin hata fırlatmaz, sessizce NaN (sayı değil) verir. parseInt() ondalık kısmı kırpar: 3.9 değeri 3 olur."
      },
      { t: "h", text: "Kendin dene" },
      { t: "alan", id: "js-1-tutar" },
      { t: "h", text: "Bozuk kodu bul ve düzelt" },
      {
        t: "steps",
        h: "Bozuk → düzeltilmiş",
        items: ["let 9kutu = 3; → SyntaxError. Ad rakamla başlayamaz: let kutu9 = 3;", "const kdv = 0.2; kdv = 0.18; → TypeError (Assignment to constant variable). Değişecekse let kdv = 0.2; yaz.", "let toplam = 5; console.log(toplm); → ReferenceError. Yazım hatalı ad tanımsızdır: console.log(toplam);", "let a = 1; let a = 2; → SyntaxError. Aynı ad iki kez tanımlanmaz: ikinci satırı a = 2; yap."]
      },
      {
        t: "warn",
        h: "Sık hata",
        text: "Değer atamadan okumak hata vermez, undefined verir; undefined ile hesap yapınca NaN çıkar. Hata sessizdir: sayfa çalışır ama sonuç yanlıştır. Her değişkene kullanmadan önce bir değer verdiğinden emin ol ve console.log ile ara sonucu kontrol et."
      }
    ],
    objectives: [
      { id: "h1", text: "Geçerli ve geçersiz değişken adlarını ayırt edip let ile const arasındaki farkı açıklayabilirsin." },
      { id: "h2", text: "number, string, boolean ve undefined türlerini örnek değerlere bakarak tanıyıp typeof'un ne döndüreceğini söyleyebilirsin." },
      { id: "h3", text: "Number(), String() ve parseInt() ile tür dönüşümü yapıp + ile - işleçlerinin sessiz sonuçlarını önceden söyleyebilirsin." },
      { id: "h4", text: "Birkaç satırlık bir kodda değişkenlerin her satırdan sonra aldığı değeri elle izleyebilirsin." }
    ],
    summary: ["Değişken, değere verilen addır; let ad = değer biçiminde bağlanır, değişmeyecek değer için const kullanılır.", "Ad harf, _ ya da $ ile başlar, rakam içerebilir, tire ve boşluk içermez; büyük küçük harf ayrılır.", "Temel türler: number (12, 7.5), string (\"kalem\"), boolean (true), undefined; typeof türü söyler.", "+ string görürse birleştirir, - sayıya çevirir; Number(\"abc\") hata değil NaN verir.", "Kodu çalıştırmadan önce her satırdan sonra değişkenlerin değerini kâğıda yazarak izle."],
    prereq: [],
    minutes: 30,
    sonDogrulama: "2026-10-25",
    surum: "2026-10-v1",
    quiz: [
      {
        id: "a356c359",
        q: "Hangisi geçerli bir değişken adıdır?",
        options: ["5kalem","_kalem2","kalem adi","const"],
        obj: "h1"
      },
      {
        id: "9ffb8a49",
        q: "const toplam = 0; satırından sonra toplam += 5; yazıldı. Ne olur?",
        options: ["toplam 5 olur","toplam 0 kalır, hata yok","SyntaxError verir","TypeError verir"],
        obj: "h1"
      },
      {
        id: "2bf89aa4",
        q: "typeof 3.0 ifadesi ne döndürür?",
        options: ["\"integer\"", "\"float\"", "\"number\"", "\"string\""],
        obj: "h2"
      },
      {
        id: "df5db930",
        q: "typeof \"true\" ifadesi ne döndürür? (tırnaklı yazılmış)",
        options: ["\"string\"","\"boolean\"","\"number\"","\"object\""],
        obj: "h2"
      },
      {
        id: "39ab84d4",
        q: "\"7\" + 3 ifadesinin sonucu nedir?",
        options: ["10", "NaN", "73", "Hata verir"],
        obj: "h3"
      },
      {
        id: "99a37592",
        q: "Number(\"12px\") ifadesi ne verir?",
        options: ["12", "0", "Hata verir", "NaN"],
        obj: "h3"
      },
      {
        id: "80266630",
        q: "let x = 3; let y = x * 2; x = 8; satırları sırayla çalıştı. y kaçtır?",
        options: ["6", "16", "8", "3"],
        obj: "h4"
      },
      {
        id: "1114ac96",
        q: "let n = 1; n = n + 4; n = n * 2; satırlarından sonra n kaçtır?",
        options: ["12", "10", "5", "20"],
        obj: "h4"
      }
    ],
    interview: [
      {
        q: "let ile const arasındaki fark nedir?",
        a: "İkisi de bir ada değer bağlar. let ile bağlanan ad sonradan başka değere bağlanabilir, const ile bağlanan ad yeniden atanamaz ve denersen TypeError alırım. Değişmeyecek her değer için varsayılan olarak const kullanırım."
      },
      {
        q: "\"40\" + 2 ile \"40\" - 2 neden farklı davranır?",
        a: "+ iki anlamlıdır: bir tarafta string varsa birleştirir (402). - yalnız sayısal çıkarma yapar, o yüzden metni sayıya çevirir (38). Karışıklık istemiyorsam girdiyi önce Number() ile çeviririm."
      }
    ],
    vocab: [
      { term: "variable", tr: "değişken", ex: "Store the price in a variable." },
      { term: "constant", tr: "sabit", ex: "A constant cannot be reassigned." },
      { term: "number", tr: "sayı türü", ex: "42 and 7.5 are both numbers." },
      { term: "string", tr: "metin dizisi", ex: "A string is written in quotes." },
      { term: "undefined", tr: "tanımsız (değer atanmamış)", ex: "A variable without a value is undefined." }
    ],
    sources: [
      { title: "MDN: JavaScript Rehberi · Dil bilgisi ve türler", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types" },
      { title: "MDN: const ifadesi", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const" },
      { title: "MDN: let ifadesi", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let" },
      { title: "ECMAScript dil belirtimi (TC39)", url: "https://tc39.es/ecma262/" }
    ]
  };

  /* 2 ───────────────────────────────────────────── Metin ve şablon dizesi */
  L[2] = {
    hook: "Metin, programın insanla konuştuğu dildir. Şablon dizesi (backtick) değişkenleri ve hesapları doğrudan cümlenin içine yerleştirmeni sağlar; fişin okunur çıkması buna bağlı.",
    homework: "Müşteri adını, ürün adını, adet ve birim fiyatı değişkenlerde tut. Şablon dizesiyle 'Merhaba Ada, 3 adet defter: 37.50 TL' biçiminde tek satırlık bir fiş üret; tutarı toFixed(2) ile yaz. Sonra aynı fişi + ile birleştirerek yaz ve iki yazımın hangisinin daha okunur olduğunu kendi cümlenle açıkla.",
    warmup: {
      recap: [
        { point: "Önceki derste değişkenleri, let/const farkını ve Number(), String() dönüşümlerini gördün.", example: "Number(\"40\") + 2 sonucu 42" }
      ],
      concepts: [
        {
          term: "Metin (string)",
          tr: "Tırnak içindeki karakter dizisi",
          summary: "Tek, çift tırnak ya da backtick ile yazılır; her karakterin sıra numarası (indeks) 0'dan başlar.",
          example: "\"kalem\"[0] sonucu \"k\""
        },
        {
          term: "Şablon dizesi (template literal)",
          tr: "Değer gömen backtick'li metin",
          summary: "Backtick içinde ${ifade} yazılan yer, ifadenin değeriyle dolar; ifade hesap da olabilir.",
          example: "`Toplam: ${a * b} TL`"
        },
        {
          term: "Metin yöntemi",
          tr: "Metinle işlem yapan hazır işlev",
          summary: "length, trim(), toUpperCase(), slice(), includes() gibi yöntemler yeni değer döndürür; metni yerinde değiştirmez.",
          example: "\"ab\".toUpperCase() sonucu \"AB\""
        }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      {
        t: "box",
        h: "Gerçek talep",
        text: "Kasadaki program fişi okunur biçimde yazmalı: müşteri adı, ürün, tutar ve iki ondalıklı fiyat. Yanlış biçimlendirilmiş bir fiş (37.5 yerine 37.50 TL beklerken) müşteriyi şaşırtır. Metinleri doğru kurmak da, aramak da bu dersin işi."
      },
      { t: "h", text: "Şablon dizesi ve kaçış karakterleri" },
      {
        t: "cmd",
        lang: "js",
        text: "const musteri = \"Ada\";\nconst adet = 3;\nconst birim = 12.5;\nconsole.log(`Merhaba ${musteri}`);\nconsole.log(`Toplam: ${(adet * birim).toFixed(2)} TL`);\nconsole.log(\"Satir1\\nSatir2\");\nconsole.log('Tek tirnak: \"ic\"');\nconsole.log(\"Ada\" + \" \" + \"Kaya\");\n\n// Çıktı:\n// Merhaba Ada\n// Toplam: 37.50 TL\n// Satir1\n// Satir2\n// Tek tirnak: \"ic\"\n// Ada Kaya"
      },
      {
        t: "steps",
        h: "Üç kural",
        items: ["Yalnız backtick (`) içinde ${ifade} çalışır. Çift ya da tek tırnak içinde ${...} olduğu gibi yazılır, değer gömmez.", "Kaçış karakterleri: \\n yeni satır, \\t sekme, \\\" ve \\' tırnağı, \\\\ ters bölüyü metne koyar. Her biri tek karakter sayılır.", "toFixed(n) sayıyı n ondalıkla yazar ama sonucu string yapar; hesap yapacaksan fişe basmadan önce yap."]
      },
      { t: "h", text: "Metin yöntemleri" },
      {
        t: "cmd",
        lang: "js",
        text: "const s = \"  Kırtasiye Fişi  \";\nconsole.log(s.length);\nconsole.log(s.trim().length);\nconsole.log(s.trim().toUpperCase());\nconsole.log(s.trim().slice(0, 4));\nconsole.log(s.includes(\"Fiş\"));\nconsole.log(\"a,b,c\".split(\",\"));\nconsole.log(\"kalem\"[0], \"kalem\".indexOf(\"l\"));\n\n// Çıktı:\n// 18\n// 14\n// KIRTASIYE FIŞI\n// Kırt\n// true\n// [ 'a', 'b', 'c' ]\n// k 2"
      },
      {
        t: "box",
        h: "Dikkat",
        text: "Metin değişmezdir: yöntemler yeni bir metin döndürür, eskisini bozmaz. s.trim() yazıp sonucu bir değişkene atamazsan işlem boşa gider. slice(başla, bitir) sondaki sıra numarasını dahil etmez. Sıra numarası 0'dan başlar, ilk harf [0]'dır."
      },
      { t: "h", text: "Kendin dene" },
      { t: "alan", id: "js-2-fis" },
      { t: "h", text: "Bozuk kodu bul ve düzelt" },
      {
        t: "steps",
        h: "Bozuk → düzeltilmiş",
        items: ["console.log(\"Merhaba, ${ad}\") → ad değişken değil metin olarak yazılır, çünkü tırnak ${...} çalıştırmaz. Backtick kullan: console.log(`Merhaba, ${ad}`).", "const kisa = 'Ali'nin kalemi'; → SyntaxError. Tek tırnak içinde tek tırnak metni bitirir: \"Ali'nin kalemi\" ya da 'Ali\\'nin kalemi'.", "const toplam = (3 * 4.5).toFixed(2); console.log(toplam + 1); → 13.501 yazar, 14.5 değil. toFixed string döndürür: Number(toplam) + 1."]
      }
    ],
    objectives: [
      { id: "h1", text: "Şablon dizesiyle değişkenleri ve hesapları metne gömebilir, tırnaklı metinde ${} çalışmadığını söyleyebilirsin." },
      { id: "h2", text: "length, trim, slice ve includes gibi yöntemlerin sonucunu bir metin için önceden söyleyebilirsin." },
      { id: "h3", text: "toFixed ile ondalık basamak sayısını ayarlayıp sonucun string olduğunu söyleyebilirsin." },
      { id: "h4", text: "\\n, \\t ve \\' gibi kaçış karakterlerinin metin uzunluğuna ve çıktıya etkisini önceden söyleyebilirsin." }
    ],
    summary: ["Backtick içinde `${ifade}` değer gömer; tek ya da çift tırnakta ${...} düz metindir.", "Metin yöntemleri (trim, toUpperCase, slice, includes) yeni değer döndürür, metni yerinde değiştirmez.", "Sıra numarası 0'dan başlar; slice(başla, bitir) bitiş sırasını almaz.", "toFixed(n) n ondalıklı bir string döndürür; sayısal işlem için Number() ile geri çevir.", "\\n yeni satır, \\t sekme, \\\\ ters bölü ve \\' tırnaktır; her biri tek karakter sayılır."],
    prereq: [1],
    minutes: 30,
    sonDogrulama: "2026-10-25",
    surum: "2026-10-v1",
    quiz: [
      {
        id: "8b20595d",
        q: "const k = 5; için `k: ${k + 1}` şablon dizesi ne üretir?",
        options: ["k: 5 + 1", "k: 51", "k: 6", "Hata verir"],
        obj: "h1"
      },
      {
        id: "554f21da",
        q: "const fiyat = 4; console.log('Fiyat: ${fiyat * 2} TL'); (tek tırnaklı) ne yazar?",
        options: ["Fiyat: 8 TL","Fiyat: ${fiyat * 2} TL","Fiyat: fiyat * 2 TL","Fiyat: undefined * 2 TL"],
        obj: "h1"
      },
      {
        id: "02117c09",
        q: "\"defter\".slice(1, 4) ifadesi ne döndürür?",
        options: ["efte", "def", "efter", "eft"],
        obj: "h2"
      },
      {
        id: "9d80ace2",
        q: "\"  ab \".trim().length ifadesi kaçtır? (başta iki, sonda bir boşluk var)",
        options: ["2", "5", "4", "3"],
        obj: "h2"
      },
      {
        id: "c0575626",
        q: "(4.5).toFixed(2) ifadesi ne döndürür?",
        options: ["4.5", "5", "4.50", "4.500"],
        obj: "h3"
      },
      {
        id: "00b7c3e6",
        q: "typeof (1.5).toFixed(1) ifadesi ne döndürür?",
        options: ["\"number\"", "\"string\"", "\"boolean\"", "\"undefined\""],
        obj: "h3"
      },
      {
        id: "e2bd2c1d",
        q: "\"a\\tb\".length ifadesi kaçtır?",
        options: ["3", "4", "2", "Hata verir"],
        obj: "h4"
      },
      {
        id: "027f061d",
        q: "\"x\\\\y\\nz\".length ifadesi kaçtır? (kaynak kodda ters bölü iki kez yazılmış, ardından \\n var)",
        options: ["5","4","6","Hata verir"],
        obj: "h4"
      }
    ],
    interview: [
      {
        q: "Şablon dizesinin + ile birleştirmeye göre artısı nedir?",
        a: "Değişkeni ve hesabı doğrudan metnin içine ${} ile yazarım; tırnak açıp kapatmam, boşlukları + arasında aramam. Çok satırlı metin de yazabilirim. Okunması ve hata ayıklaması kolaylaşır."
      },
      {
        q: "toFixed neden dikkatle kullanılmalı?",
        a: "Çünkü sayıyı değil string döndürür. Ekrana ya da fişe yazmak için uygundur, ama sonucu toplamaya devam edersem birleştirme yaparım. Hesaplar bittikten sonra, en son adımda biçimlerim."
      }
    ],
    vocab: [
      { term: "template literal", tr: "şablon dizesi", ex: "A template literal uses backticks." },
      { term: "index", tr: "sıra numarası", ex: "The first character has index zero." },
      { term: "escape character", tr: "kaçış karakteri", ex: "\\n is an escape character." },
      { term: "method", tr: "yöntem", ex: "The trim method removes spaces." },
      { term: "concatenation", tr: "birleştirme", ex: "Concatenation joins two strings." }
    ],
    sources: [
      { title: "MDN: Şablon dizeleri (template literals)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals" },
      { title: "MDN: String nesnesi", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String" },
      { title: "ECMAScript dil belirtimi (TC39)", url: "https://tc39.es/ecma262/" }
    ]
  };

  /* 3 ───────────────────────────────────────────── Operatörler ve karşılaştırma (== ve ===) */
  L[3] = {
    hook: "Operatör, değerler üzerinde işlem yapan işarettir. JavaScript'te asıl tuzak, == işlecinin türleri sessizce çevirip beklemediğin bir 'true' vermesidir. Karşılaştırmada varsayılan olarak === kullan.",
    homework: "Bir ürün fiyatı ve indirim yüzdesi için yeni fiyatı hesapla; her ifadenin sonucunu çalıştırmadan önce tahmin et, sonra doğrula. Ardından 0.1 + 0.2 gibi iki ondalık toplamı === ile 0.3'e karşılaştır, sonucu açıkla ve yuvarlayarak düzelt. En az bir == ifadesi yazıp aynısını === ile tekrarla, farkı kendi cümlenle anlat.",
    warmup: {
      recap: [
        { point: "Önceki derste metin yöntemlerini ve şablon dizesini gördün.", example: "`${adet} adet` metne değer gömer" }
      ],
      concepts: [
        {
          term: "Aritmetik işleç",
          tr: "Sayılarla işlem yapar",
          summary: "+ - * / % ** altı işlemdir; / her zaman gerçek bölme yapar, tam bölme için Math.floor gerekir.",
          example: "7 / 2 sonucu 3.5, 7 % 2 sonucu 1"
        },
        {
          term: "Karşılaştırma işleci",
          tr: "İki değeri kıyaslar, boolean döndürür",
          summary: "=== katı eşitlik (tür de aynı olmalı), == gevşek eşitlik (tür çevirir). Hep === tercih et.",
          example: "5 >= 5 sonucu true"
        },
        {
          term: "Mantıksal işleç",
          tr: "Koşulları birleştirir",
          summary: "&& her ikisi doğruysa, || en az biri doğruysa, ! tersini verir.",
          example: "yas >= 18 && ehliyet"
        }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      {
        t: "box",
        h: "Gerçek talep",
        text: "Mağaza, bir siparişin indirim eşiğini geçip geçmediğini kontrol edecek. Kod 'tutar eşikten büyük mü?' sorusunu hem doğru kıyaslamalı hem de metin olarak gelen bir sayıyla yanılmamalı. Bir yanlış == sizi sessizce yanlış sonuca götürür."
      },
      { t: "h", text: "Aritmetik" },
      {
        t: "cmd",
        lang: "js",
        text: "console.log(9 / 2);\nconsole.log(Math.floor(9 / 2));\nconsole.log(9 % 2);\nconsole.log(2 ** 4);\nconsole.log(2 ** 3 ** 2);\nconsole.log(10 - 2 * 4);\nconsole.log((10 - 2) * 4);\n\n// Çıktı:\n// 4.5\n// 4\n// 1\n// 16\n// 512\n// 2\n// 32"
      },
      {
        t: "steps",
        h: "Öncelik sırası (yüksekten düşüğe)",
        items: ["Parantez ( )", "Üs ** (sağdan sola: 2 ** 3 ** 2 işlemi 2 ** 9 olur)", "Çarpma, bölme, kalan: * / % (soldan sağa)", "Toplama, çıkarma: + - (soldan sağa)", "Karşılaştırmalar, sonra ===, sonra &&, en son ||."]
      },
      { t: "h", text: "Karşılaştırma, == tuzağı ve sessiz sonuçlar" },
      {
        t: "cmd",
        lang: "js",
        text: "console.log(1 == \"1\", 1 === \"1\");\nconsole.log(0 == false);\nconsole.log(null == undefined, null === undefined);\nconsole.log(0.1 + 0.2);\nconsole.log(0.1 + 0.2 === 0.3);\nconsole.log(NaN === NaN);\nconsole.log(\"5\" - 2, \"5\" + 2);\nlet say = 10;\nsay += 5;\nsay *= 2;\nconsole.log(say);\n\n// Çıktı:\n// true false\n// true\n// true false\n// 0.30000000000000004\n// false\n// false\n// 3 52\n// 30"
      },
      {
        t: "box",
        h: "Dikkat",
        text: "== bir tarafı çevirmeye çalışır: boş metin ve false da 0 gibi davranır, \"abc\" ise NaN olur. === tür farklıysa direkt false verir. NaN kendine bile eşit değildir; kontrol için Number.isNaN() kullan. Ondalık sayılar ikilik sistemde tam saklanamaz, bu yüzden === ile ondalık karşılaştırmak yerine yuvarlayarak kıyasla. Kalan (%) işleminin işareti bölünenin işaretini izler."
      },
      { t: "h", text: "Kendin dene" },
      { t: "alan", id: "js-3-esik" },
      { t: "h", text: "Bozuk kodu bul ve düzelt" },
      {
        t: "steps",
        h: "Bozuk → düzeltilmiş",
        items: ["if (x = 5) { ... } → Hata vermez ama x'e 5 atar ve koşul hep doğru sayılır. Karşılaştırma için üçlü eşittir: if (x === 5) { ... }", "const ort = a + b / 2; → öncelik hatası. b / 2 önce çalışır; parantez ekle: const ort = (a + b) / 2;", "if (girilen == 0) { ... } → girilen boş metin ya da false olsa da koşul tutar. Tür farkını gizleme: if (girilen === 0) { ... }", "if (sonuc === NaN) { ... } → hep false, çünkü NaN kendine eşit değildir. Number.isNaN(sonuc) kullan."]
      }
    ],
    objectives: [
      { id: "h1", text: "/, %, ** işlemlerinin sonucunu (eksi sayılar dahil) önceden hesaplayabilir ve / ile tam bölme yapılmadığını söyleyebilirsin." },
      { id: "h2", text: "Öncelik ve soldan sağa sırasına göre, parantezli ve parantezsiz bir ifadenin sonucunu elle bulabilirsin." },
      { id: "h3", text: "== ile === farkını örnek ifadelerde ayırt edip hangisinin true döndüreceğini söyleyebilirsin." },
      { id: "h4", text: "Sayı ile metin karışımının ve ondalık sayıların sessiz sonuçlarını önceden söyleyebilirsin." }
    ],
    summary: ["/ her zaman gerçek bölme yapar; kalan için %, üs için ** kullanılır. % işaretini bölünenden alır.", "Öncelik: parantez, **, * / %, + -, karşılaştırma, ===, &&, ||. ** sağdan sola, diğerleri soldan sağa çalışır.", "= atama, === katı eşitlik, == gevşek eşitliktir (tür çevirir). Varsayılan olarak === kullan.", "NaN kendine eşit değildir; Number.isNaN() ile sına. Ondalıklar ikilik sistemde tam saklanmaz.", "x += 2 işlemi x = x + 2 demektir. \"5\" + 2 birleştirir, \"5\" - 2 sayısal çıkarır."],
    prereq: [2],
    minutes: 30,
    sonDogrulama: "2026-10-25",
    surum: "2026-10-v1",
    quiz: [
      {
        id: "51282fde",
        q: "15 / 4 ifadesinin sonucu nedir?",
        options: ["3", "4", "3.75", "3.25"],
        obj: "h1"
      },
      {
        id: "6cad7559",
        q: "-7 % 3 ifadesinin sonucu nedir?",
        options: ["2", "-2", "1", "-1"],
        obj: "h1"
      },
      {
        id: "37f59bf6",
        q: "3 + 4 * 2 ifadesinin sonucu nedir?",
        options: ["14", "11", "24", "10"],
        obj: "h2"
      },
      {
        id: "967a8da6",
        q: "10 - 4 - 3 ifadesinin sonucu nedir?",
        options: ["3", "9", "-3", "1"],
        obj: "h2"
      },
      {
        id: "0dcaa50d",
        q: "9 == \"9.0\" ve 9 === \"9.0\" ifadeleri sırasıyla ne verir?",
        options: ["true ve true","false ve false","false ve true","true ve false"],
        obj: "h3"
      },
      {
        id: "10495227",
        q: "\"0\" == false ifadesi (metin sıfır ve false) ne verir?",
        options: ["true","false","undefined","Hata verir"],
        obj: "h3"
      },
      {
        id: "49f90761",
        q: "\"4\" * \"2\" ifadesinin sonucu nedir?",
        options: ["42", "NaN", "Hata verir", "8"],
        obj: "h4"
      },
      {
        id: "bdf4862f",
        q: "0.1 + 0.7 ifadesinin sonucu nedir?",
        options: ["0.8","0.7999999999999999","0.8000000000000001","0.71"],
        obj: "h4"
      }
    ],
    interview: [
      {
        q: "== ile === arasındaki fark nedir?",
        a: "=== tür de aynı olmak zorunda; farklıysa doğrudan false verir. == karşılaştırmadan önce türleri çevirir, bu yüzden 1 == \"1\" true olur ve sürprizler çıkar. Bu yüzden varsayılan olarak === kullanırım."
      },
      {
        q: "0.1 + 0.2 === 0.3 neden false?",
        a: "Ondalık sayılar ikilik sistemde tam saklanamaz, toplam 0.30000000000000004 çıkar. Ondalıkları === ile kıyaslamak yerine yuvarlarım ya da iki değerin farkı çok küçük mü diye bakarım."
      }
    ],
    vocab: [
      { term: "operator", tr: "işleç", ex: "The plus operator adds numbers." },
      { term: "operand", tr: "işlenen", ex: "Each side of + is an operand." },
      { term: "strict equality", tr: "katı eşitlik", ex: "Strict equality also compares the type." },
      { term: "type coercion", tr: "tür zorlaması (otomatik çevirme)", ex: "Type coercion turns a string into a number." },
      { term: "precedence", tr: "öncelik", ex: "Multiplication has higher precedence than addition." }
    ],
    sources: [
      { title: "MDN: JavaScript Rehberi · İfadeler ve işleçler", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators" },
      { title: "MDN: Eşitlik karşılaştırmaları ve aynılık", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness" },
      { title: "MDN: İşleç önceliği", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence" }
    ]
  };

  /* 4 ───────────────────────────────────────────── Koşullar: if, else if, else */
  L[4] = {
    hook: "Program, yolun çatallandığı yerde karar verir. Koşul bir soru sorar, süslü parantezler hangi satırların o soruya bağlı olduğunu söyler.",
    homework: "Bir puandan harf notu üreten kod yaz: 85 ve üstü A, 70 ve üstü B, 50 ve üstü C, kalan F. Sınır değerleri (85, 84, 70, 49, 50) için sonucu önceden tahmin et, sonra çalıştır. En az bir tane de yanlış sıralanmış else if zinciri yazıp neden hatalı çalıştığını açıkla.",
    warmup: {
      recap: [
        { point: "Önceki derste karşılaştırmaların true ya da false verdiğini, === ile == farkını ve &&, ||, ! işleçlerini gördün.", example: "sicaklik >= 10 && sicaklik < 20" }
      ],
      concepts: [
        {
          term: "Koşul (condition)",
          tr: "Doğru ya da yanlış çıkan ifade",
          summary: "if (koşul) { ... } koşul doğruysa çalışır; else if sıradaki koşulu dener; else geri kalan durumdur.",
          example: "if (stok > 0) { ... }"
        },
        {
          term: "Blok (block)",
          tr: "Süslü parantezle sınırlanan kod grubu",
          summary: "{ } içindeki satırlar birlikte çalışır; let ve const'la tanımlanan ad yalnız o blokta geçerlidir.",
          example: "if (x > 0) { console.log(x); }"
        },
        {
          term: "Doğruluk değeri (truthy / falsy)",
          tr: "Koşulda true ya da false sayılan değerler",
          summary: "false, 0, boş metin, null, undefined ve NaN koşulda false sayılır; diğer her değer true sayılır.",
          example: "if (stok) { ... }"
        }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      {
        t: "box",
        h: "Gerçek talep",
        text: "Mağaza her siparişe bir etiket yapıştıracak: büyük, orta, küçük, ya da stok uyarısı. Her durum ayrı bir karar. Kararlar kodda if, else if ve else ile yazılır; sırayı ve sınırları yanlış kurmak sessizce yanlış etiket üretir."
      },
      { t: "h", text: "if, else if, else" },
      {
        t: "cmd",
        lang: "js",
        text: "const sicaklik = 24;\nlet etiket;\nif (sicaklik >= 30) {\n  etiket = \"sıcak\";\n} else if (sicaklik >= 20) {\n  etiket = \"ılık\";\n} else if (sicaklik >= 10) {\n  etiket = \"serin\";\n} else {\n  etiket = \"soğuk\";\n}\nconsole.log(etiket);\n\n// Çıktı:\n// ılık"
      },
      {
        t: "steps",
        h: "Nasıl çalışır?",
        items: ["JavaScript koşulları yukarıdan aşağı sırayla dener, ilk doğru olanın bloğunu çalıştırır ve zincirden çıkar.", "else if ve else isteğe bağlıdır; else hiçbir koşul tutmadığında çalışır ve koşul almaz. Ayrı yazılmış if satırları ise birbirinden bağımsız denenir.", "Koşul parantez içinde yazılır. Blok süslü parantezle sınırlanır; süslü parantez yoksa if yalnız sonraki tek ifadeyi kontrol eder."]
      },
      { t: "h", text: "İç içe koşul, doğruluk değeri ve üçlü işleç" },
      {
        t: "cmd",
        lang: "js",
        text: "console.log(Boolean(0), Boolean(\"\"), Boolean(undefined));\nconsole.log(Boolean({}), Boolean(\"0\"));\nconst stok = 0;\nconsole.log(stok ? \"var\" : \"yok\");\nlet x = 15;\nif (x > 10) {\n  if (x % 2 === 0) console.log(\"büyük çift\");\n  else console.log(\"büyük tek\");\n}\nconsole.log(\"bitti\");\n\n// Çıktı:\n// false false false\n// true true\n// yok\n// büyük tek\n// bitti"
      },
      {
        t: "box",
        h: "Dikkat",
        text: "Sıra önemlidir: küçük eşiği büyük eşikten önce yazarsan büyük değerler de ilk tutan koşula takılır. Sınırlara dikkat et: >= ile > farkı tam eşik değerinde sonucu değiştirir. Süslü parantezi unutursan ikinci satır if'e bağlı kalmaz, her durumda çalışır. Boş dizi ve boş nesne ise koşulda true sayılır."
      },
      { t: "h", text: "Kendin dene" },
      { t: "alan", id: "js-4-etiket" },
      { t: "h", text: "Bozuk kodu bul ve düzelt" },
      {
        t: "steps",
        h: "Bozuk → düzeltilmiş",
        items: ["if (x = 5) { ... } → Hata vermez ama x'e 5 atar ve koşul hep doğru sayılır. if (x === 5) { ... } yaz.", "if (puan >= 50) { ... } else if (puan >= 85) { ... } → ikinci koşul hiç çalışmaz, çünkü 85 üstü puan zaten ilkine takılır. Önce büyük eşiği (85) yaz.", "if x > 5 { ... } → SyntaxError (koşul parantezsiz). if (x > 5) { ... } yaz.", "if (x > 5 && < 10) { ... } → SyntaxError. Her taraf tam koşul olmalı: if (x > 5 && x < 10) { ... }"]
      }
    ],
    objectives: [
      { id: "h1", text: "if, else if ve else zincirinde verilen değer için hangi bloğun çalışacağını, ayrı if satırlarından farkıyla söyleyebilirsin." },
      { id: "h2", text: "Süslü parantezlere bakarak bir satırın hangi bloğa ait olduğunu bulup çıktıyı yazabilirsin." },
      { id: "h3", text: "false, 0, boş metin, null, undefined ve NaN dışındaki değerlerin koşulda true sayıldığını bilerek sonucu söyleyebilirsin." },
      { id: "h4", text: "Sıralaması ya da sözdizimi bozuk bir koşul zincirini bulup düzeltebilirsin." }
    ],
    summary: ["if (koşul) { } doğruysa çalışır; else if sonraki koşulları dener, else kalan durumu karşılar.", "Koşullar yukarıdan aşağı denenir, ilk doğru olan çalışır ve zincir biter; ayrı if satırları bağımsızdır.", "Süslü parantez bloğu belirler; parantezsiz if yalnız sonraki tek ifadeyi kontrol eder.", "false, 0, \"\", null, undefined ve NaN koşulda false sayılır; boş dizi ve boş nesne dahil geri kalanlar true sayılır.", "if (x = 5) hata vermez ama atama yapar; karşılaştırma için === kullan. Sınır değerleri ve koşul sırası en sık hata kaynağıdır."],
    prereq: [3],
    minutes: 30,
    sonDogrulama: "2026-10-25",
    surum: "2026-10-v1",
    quiz: [
      {
        id: "def93440",
        q: "yas = 15 için şu zincir sonunda r nedir? if (yas >= 65) { r = \"yaşlı\"; } else if (yas >= 18) { r = \"yetişkin\"; } else if (yas >= 13) { r = \"genç\"; } else { r = \"çocuk\"; }",
        options: ["yaşlı", "yetişkin", "genç", "çocuk"],
        obj: "h1"
      },
      {
        id: "a4338dbf",
        q: "n = 5 iken (a) if (n > 3) log(\"A\"); else if (n > 1) log(\"B\"); ve (b) if (n > 3) log(\"A\"); if (n > 1) log(\"B\"); ayrı ayrı çalışırsa sırasıyla ne yazarlar?",
        options: ["A ve A", "A ve AB", "AB ve A", "AB ve AB"],
        obj: "h1"
      },
      {
        id: "1888da82",
        q: "let x = 1; if (true) { let x = 2; } console.log(x); satırları çalışınca ne yazar?",
        options: ["1", "2", "undefined", "ReferenceError verir"],
        obj: "h2"
      },
      {
        id: "bc33689d",
        q: "k = 10 iken if (k < 5) { console.log(\"p\"); console.log(\"q\"); } console.log(\"r\"); ne yazar?",
        options: ["Yalnız r","q ve r","p, q ve r","Hiçbir şey yazmaz"],
        obj: "h2"
      },
      {
        id: "fc310af0",
        q: "const x = \"false\"; if (x) { console.log(\"A\"); } else { console.log(\"B\"); } ne yazar?",
        options: ["B", "A", "Hata verir", "Hiçbir şey"],
        obj: "h3"
      },
      {
        id: "390c58e5",
        q: "if (-1) { console.log(\"A\"); } else { console.log(\"B\"); } ne yazar?",
        options: ["B","Hata verir","A","Hiçbir şey"],
        obj: "h3"
      },
      {
        id: "37104e23",
        q: "s = 120 iken if (s > 10) { e = \"az\"; } else if (s > 100) { e = \"çok\"; } else { e = \"yok\"; } sonunda e nedir?",
        options: ["az","çok","yok","Hata verir"],
        obj: "h4"
      },
      {
        id: "441951d3",
        q: "let s = 4; if (s = 0) { ... } satırında koşul ne yapar?",
        options: ["s 0'a eşit mi diye bakar, 4 olduğu için yanlıştır","SyntaxError verir","s'ye 0 atar ve koşul yanlış sayılır","s'ye 0 atar ve koşul doğru sayılır"],
        obj: "h4"
      }
    ],
    interview: [
      {
        q: "else if zinciri ile arka arkaya iki if arasındaki fark nedir?",
        a: "else if zincirinde ilk doğru koşuldan sonra kalanı denenmez. Ayrı if satırlarında her koşul bağımsız denenir; birden fazlası çalışabilir."
      },
      {
        q: "Koşulda hangi değerler false sayılır?",
        a: "false, 0, boş metin, null, undefined ve NaN. Boş dizi ve boş nesne dahil geri kalan her şey true sayılır. Emin olmadığımda === ile açıkça karşılaştırırım."
      }
    ],
    vocab: [
      { term: "condition", tr: "koşul", ex: "The condition is true." },
      { term: "branch", tr: "dal", ex: "Each branch handles one case." },
      { term: "block", tr: "kod bloğu", ex: "The block runs if the condition is true." },
      { term: "truthy", tr: "koşulda true sayılan", ex: "A non-empty string is truthy." },
      { term: "boundary value", tr: "sınır değer", ex: "Test the boundary value 50." }
    ],
    sources: [
      { title: "MDN: JavaScript Rehberi · Denetim akışı ve hata yönetimi", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling" },
      { title: "MDN: if...else ifadesi", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else" },
      { title: "MDN: Sözlük · Truthy", url: "https://developer.mozilla.org/en-US/docs/Glossary/Truthy" }
    ]
  };
})();

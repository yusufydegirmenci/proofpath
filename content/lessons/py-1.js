/* Python (PCEP düzeyi) · sabit dersler 1-4 (değişkenler ve türler, giriş-çıkış, operatörler, koşullar). Kapsam herkese açık PCEP müfredat özetinden alınmıştır; metinler özgündür.
   Dış kaynak: yalnız HTTP 200 dönenler (curl, 2026-10-24). Kod örnekleri CPython 3.12 ile çalıştırılarak doğrulandı; alıştırmalar PP.alan (Pyodide) ile çalışır (py-alan.js). */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).py = (window.PP_LESSONS.py || {}));

  /* 1 ───────────────────────────────────────────── Değişkenler ve veri türleri */
  L[1] = {
    hook: "Değişken, bir değere yapıştırdığın etikettir: kutuyu değil etiketi taşırsın. Değer değişir, etiket aynı kalır.",
    homework: "Bir markette aldığın üç ürün için değişken tanımla: ad (str), adet (int), birim fiyat (float). Toplamı hesaplayıp type() ile her değişkenin türünü yazdır. Sonra bilerek bir hata yap (rakamla başlayan ad), mesajı oku ve düzelt.",
    warmup: {
      recap: [
        {
          point: "Bu ilk Python dersi. Daha önce kod yazmadıysan sorun değil; her örnek tek başına çalışır.",
          example: "print(\"merhaba\") ekrana merhaba yazar"
        }
      ],
      concepts: [
        { term: "Değişken (variable)", tr: "Değere verilen ad", summary: "Eşittir işareti değeri sağdan alıp soldaki ada bağlar.", example: "adet = 12" },
        {
          term: "Veri türü (data type)",
          tr: "Değerin cinsi",
          summary: "Tam sayı, ondalıklı sayı, metin ve doğru/yanlış temel türlerdir.",
          example: "12 int, 7.5 float, \"kalem\" str, True bool"
        },
        {
          term: "Tür dönüşümü (type conversion)",
          tr: "Bir türü başka türe çevirmek",
          summary: "int(), float() ve str() ile yapılır; her dönüşüm başarılı olmaz.",
          example: "int(\"12\") sonucu 12"
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
      { t: "h", text: "Değişken oluşturmak" },
      {
        t: "steps",
        h: "Üç kural",
        items: ["Atama: ad = değer. Eşittir 'eşit mi?' diye sormaz, sağdaki değeri soldaki ada bağlar.", "Ad kuralı: harf ya da alt çizgiyle başlar; harf, rakam ve alt çizgi içerir. toplam_tutar geçerli, 2adet ve toplam-tutar geçersizdir.", "Büyük küçük harf ayrılır: adet ile Adet farklı değişkenlerdir. for, if, class gibi ayrılmış sözcükler ad olamaz."]
      },
      { t: "h", text: "Dört temel tür" },
      {
        t: "cmd",
        lang: "python",
        text: "ad = \"Defne\"\nyas = 29\nboy = 1.68\nogrenci_mi = True\nprint(ad, type(ad))\nprint(yas, type(yas))\nprint(boy, type(boy))\nprint(ogrenci_mi, type(ogrenci_mi))\n\n# Çıktı:\n# Defne <class 'str'>\n# 29 <class 'int'>\n# 1.68 <class 'float'>\n# True <class 'bool'>"
      },
      {
        t: "box",
        h: "Dikkat",
        text: "Tırnak içindeki her şey metindir: \"42\" bir str'dir, 42 ise int. True ve False büyük harfle başlar. Ondalık ayırıcı virgül değil noktadır."
      },
      { t: "h", text: "Tür dönüşümü" },
      {
        t: "cmd",
        lang: "python",
        text: "adet = \"12\"          # metin\nfiyat = 7.5\ntoplam = int(adet) * fiyat\nprint(toplam)         # 90.0\nprint(type(toplam))   # <class 'float'>\nprint(int(3.9))       # 3  (ondalık kısım atılır, yuvarlanmaz)\nprint(str(42) + \" adet\")   # 42 adet"
      },
      {
        t: "p",
        text: "int ile float çarpılınca sonuç float olur. int() ondalık kısmı kırpar: 3.9 değeri 3 olur. Metne dönüşüm str() ile yapılır; metin ile sayı + ile birleşmez."
      },
      { t: "h", text: "Kendin dene" },
      { t: "alan", id: "py-1-tutar" },
      { t: "h", text: "Bozuk kodu bul ve düzelt" },
      {
        t: "steps",
        h: "Bozuk → düzeltilmiş",
        items: ["2yas = 30 → SyntaxError. Ad rakamla başlayamaz: yas2 = 30 ya da yas = 30.", "print(\"Toplam: \" + 5) → TypeError. Metinle sayı toplanmaz: print(\"Toplam: \" + str(5)) ya da print(\"Toplam:\", 5).", "sayi = int(\"3.5\") → ValueError. Metin ondalıklı olduğu için doğrudan int olmaz: int(float(\"3.5\")) sonucu 3."]
      },
      {
        t: "warn",
        h: "Sık hata",
        text: "Yazım hatasıyla yeni bir değişken yaratmak: toplam yerine toplm yazarsan Python atarken itiraz etmez, eski toplam değişmez; toplm'ye atadıysan toplam eski değerinde kalır; hiç atamadığın yanlış adı okursan NameError alırsın. Ad seçerken kısa ama okunur ol."
      }
    ],
    objectives: [
      { id: "h1", text: "Geçerli ve geçersiz değişken adlarını ayırt edip bir değere ad vererek sonradan değiştirebilirsin." },
      { id: "h2", text: "int, float, str ve bool türlerini örnek değerlere bakarak tanıyıp type() ile doğrulayabilirsin." },
      { id: "h3", text: "int(), float() ve str() ile tür dönüşümü yapıp hata verecek dönüşümü önceden söyleyebilirsin." },
      { id: "h4", text: "Birkaç satırlık bir kodda değişkenlerin her satırdan sonra aldığı değeri elle izleyebilirsin." }
    ],
    summary: ["Değişken, değere verilen addır; ad = değer biçiminde bağlanır.", "Ad harf ya da alt çizgiyle başlar, rakam içerebilir, tire ve boşluk içermez; büyük küçük harf ayrılır.", "Dört temel tür: int (12), float (7.5), str (\"kalem\"), bool (True).", "int(), float(), str() tür dönüştürür; int(\"3.5\") hata verir, int(3.9) ise 3 döndürür.", "Kodu çalıştırmadan önce her satırdan sonra değişkenlerin değerini kâğıda yazarak izle."],
    prereq: [],
    minutes: 30,
    sonDogrulama: "2026-10-24",
    surum: "2026-10-v1",
    quiz: [
      {
        id: "4c32b48f",
        q: "Hangisi geçerli bir değişken adıdır?",
        options: ["2adet", "toplam_tutar", "toplam-tutar", "for"],
        obj: "h1"
      },
      {
        id: "2d158df1",
        q: "x = 5 satırından sonra x = x + 2 yazıldı. x şimdi kaçtır?",
        options: ["5", "2", "7", "Hata verir"],
        obj: "h1"
      },
      {
        id: "262f4fe9",
        q: "type(3.0) ifadesi neyi gösterir?",
        options: ["<class 'float'>", "<class 'int'>", "<class 'str'>", "<class 'bool'>"],
        obj: "h2"
      },
      {
        id: "fd5847af",
        q: "'42' değeri (tırnak içinde) hangi türdendir?",
        options: ["int", "float", "bool", "str"],
        obj: "h2"
      },
      {
        id: "395f8217",
        q: "int(\"3.5\") ifadesi ne yapar?",
        options: ["3 döndürür", "ValueError verir", "4 döndürür", "3.5 döndürür"],
        obj: "h3"
      },
      {
        id: "55850418",
        q: "Hangi satır TypeError verir?",
        options: ["print(\"Yaş:\", 30)", "print(\"Yaş: \" + str(30))", "print(\"Yaş: \" + 30)", "print(\"Yaş: \" * 2)"],
        obj: "h3"
      },
      {
        id: "c975233d",
        q: "a = 4, sonra b = a, sonra a = 9 çalıştı. b kaçtır?",
        options: ["4", "9", "13", "Tanımsızdır"],
        obj: "h4"
      },
      {
        id: "fed3c733",
        q: "x = 2, y = x * 3, x = 10 çalıştı. print(y) ne yazar?",
        options: ["30", "2", "10", "6"],
        obj: "h4"
      }
    ],
    interview: [
      {
        q: "Python'da bir değişken nedir?",
        a: "Bir değere verilen addır. ad = değer yazınca ad o değere bağlanır. Aynı ad sonradan başka bir değere bağlanabilir."
      },
      {
        q: "int(\"3.5\") neden hata verir?",
        a: "Çünkü metin ondalıklı. int() yalnız tam sayı gibi görünen metni çevirir. Önce float(\"3.5\") yapıp sonra int() ile 3 elde edilir."
      }
    ],
    vocab: [
      { term: "variable", tr: "değişken", ex: "Store the price in a variable." },
      { term: "assignment", tr: "atama", ex: "The assignment binds a name to a value." },
      { term: "integer", tr: "tam sayı", ex: "42 is an integer." },
      { term: "string", tr: "metin dizisi", ex: "A string is written in quotes." },
      { term: "boolean", tr: "doğru/yanlış değeri", ex: "A boolean is True or False." }
    ],
    sources: [
      { title: "Python Tutorial: Bir giriş (resmî belge)", url: "https://docs.python.org/3/tutorial/introduction.html" },
      { title: "Python Standart Kütüphane: Yerleşik türler", url: "https://docs.python.org/3/library/stdtypes.html" },
      { title: "Python Institute: PCEP sertifikası (güncel müfredat burada)", url: "https://pythoninstitute.org/pcep" }
    ]
  };

  /* 2 ───────────────────────────────────────────── Giriş, çıkış ve metin biçimlendirme */
  L[2] = {
    hook: "Program dünyayla iki yoldan konuşur: print ile söyler, input ile dinler. Dinlediği her şey metin olarak gelir; sayıya çevirmek senin işin.",
    homework: "Adını ve iki sayı soran, sonra 'Merhaba Ada, toplam: 90.00 TL' biçiminde yanıt veren kısa bir program yaz. Bu programı kendi bilgisayarında (Python kuruluysa ya da terminalde) çalıştır; tarayıcı alanında input() kullanma.",
    warmup: {
      recap: [
        { point: "Önceki derste değişkenleri ve int, float, str dönüşümlerini gördün.", example: "int(\"12\") * 7.5 sonucu 90.0" }
      ],
      concepts: [
        {
          term: "print()",
          tr: "Ekrana yazdırır",
          summary: "Birden fazla değeri alır; sep ayırıcıyı, end satır sonunu belirler.",
          example: "print(\"a\", \"b\", sep=\"-\") çıktısı a-b"
        },
        {
          term: "input()",
          tr: "Kullanıcıdan metin alır",
          summary: "Dönen değer her zaman str'dir; hesap için int() ya da float() gerekir.",
          example: "adet = int(input(\"Adet: \"))"
        },
        {
          term: "f-string",
          tr: "Metne değer gömen yazım",
          summary: "Tırnağın önüne f yazılır, değişkenler süslü parantez içine konur.",
          example: "f\"Toplam: {toplam:.2f} TL\""
        }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      {
        t: "box",
        h: "Gerçek talep",
        text: "Kasadaki program hem fişi okunur biçimde yazdırmalı hem de kasiyerin girdiği adedi alabilmeli. Yanlış biçimlendirilmiş bir fiş (90.0 yerine 90.00 TL beklerken) müşteriyi şaşırtır."
      },
      { t: "h", text: "print() ve biçimi" },
      {
        t: "cmd",
        lang: "python",
        text: "print(\"Python\", \"öğreniyorum\")\nprint(\"a\", \"b\", \"c\", sep=\"-\")\nprint(\"Yükleniyor\", end=\"...\")\nprint(\"bitti\")\nprint(\"Ürün\\tAdet\")\nprint(\"kalem\\t12\")\n\n# Çıktı:\n# Python öğreniyorum\n# a-b-c\n# Yükleniyor...bitti\n# Ürün    Adet\n# kalem   12"
      },
      {
        t: "steps",
        h: "Üç ayar",
        items: ["sep: değerler arasındaki ayırıcı. Varsayılan bir boşluktur.", "end: satırın sonuna eklenen. Varsayılan yeni satırdır (\\n); end=\"\" ile aynı satırda devam edersin.", "Kaçış karakterleri: \\n yeni satır, \\t sekme, \\\" ve \\\\ tırnak ile ters bölüyü metne koyar."]
      },
      { t: "h", text: "input() her zaman metin verir" },
      {
        t: "cmd",
        lang: "python",
        calistirma: "atla input() klavyeden okur; tarayıcı alanında ve testte kullanılmaz, kendi bilgisayarında dene",
        text: "ad = input(\"Adın: \")\nadet = int(input(\"Kaç adet? \"))\nfiyat = 7.5\nprint(f\"Merhaba {ad}, toplam: {adet * fiyat:.2f} TL\")\n\n# Girdi: Ada ve 12 ise çıktı:\n# Merhaba Ada, toplam: 90.00 TL"
      },
      {
        t: "box",
        h: "Tuzak",
        text: "input() 12 yazılsa bile \"12\" döndürür. Onu sayı sanıp çarparsan \"12\" * 7.5 TypeError verir; \"12\" * 3 ise 'sessizce' 121212 üretir. Girdiyi alır almaz int() ya da float() ile çevir."
      },
      { t: "h", text: "f-string ile biçimlendirme" },
      {
        t: "cmd",
        lang: "python",
        text: "urun = \"kalem\"\nadet = 12\nfiyat = 7.5\nprint(f\"{urun}: {adet} adet\")\nprint(f\"Birim: {fiyat:.2f} TL\")\nprint(f\"Toplam: {adet * fiyat:.2f} TL\")\nprint(f\"{adet=}\")\n\n# Çıktı:\n# kalem: 12 adet\n# Birim: 7.50 TL\n# Toplam: 90.00 TL\n# adet=12"
      },
      {
        t: "p",
        text: ":.2f iki ondalık basamak demektir. Süslü parantez içine yalnız değişken değil, işlem de yazılır. Python 3.8 ve sonrasında {adet=} hem adı hem değeri yazar; hata ayıklarken işine yarar."
      },
      { t: "h", text: "Kendin dene" },
      { t: "alan", id: "py-2-fis" },
      { t: "h", text: "Bozuk kodu bul ve düzelt" },
      {
        t: "steps",
        h: "Bozuk → düzeltilmiş",
        items: ["print(\"Merhaba, ad\") → ad değişken değil metin olarak yazılır. print(f\"Merhaba, {ad}\") ya da print(\"Merhaba,\", ad).", "toplam = input(\"Adet: \") * 7.5 → TypeError. input() metindir: toplam = int(input(\"Adet: \")) * 7.5.", "print(f\"Toplam: {toplam:.2}\") → .2 anlamı farklıdır (2 anlamlı basamak). İki ondalık için :.2f yaz."]
      }
    ],
    objectives: [
      { id: "h1", text: "print() ile birden fazla değeri sep ve end ayarlarıyla istediğin biçimde yazdırabilirsin." },
      { id: "h2", text: "input() dönüşünün her zaman str olduğunu bilerek girdiyi sayıya çevirip hesap yapabilirsin." },
      { id: "h3", text: "f-string ile değişkenleri ve işlemleri metne gömüp :.2f ile ondalık basamak sayısını ayarlayabilirsin." },
      { id: "h4", text: "\\n ve \\t gibi kaçış karakterlerinin çıktıya etkisini önceden söyleyebilirsin." }
    ],
    summary: ["print(a, b, sep=..., end=...) değerleri ayırıcıyla yazar; end varsayılan olarak yeni satırdır.", "input() her zaman str döndürür; sayı için int() ya da float() ile çevir.", "f\"...{değişken}...\" metne değer gömer; {x:.2f} iki ondalık basamak yazar.", "\\n yeni satır, \\t sekme, \\\" ve \\\\ tırnak ile ters bölüyü yazdırır.", "Tarayıcı alanında input() yok; girdiyi doğrudan değişkene atayarak dene."],
    prereq: [1],
    minutes: 30,
    sonDogrulama: "2026-10-24",
    surum: "2026-10-v1",
    quiz: [
      {
        id: "5913ac68",
        q: "print(\"a\", \"b\", sep=\"-\") ne yazdırır?",
        options: ["a-b", "a b", "a - b", "ab-"],
        obj: "h1"
      },
      {
        id: "932eb1e7",
        q: "print(\"x\", end=\"\") ardından print(\"y\") çalışırsa ekranda ne görünür?",
        options: ["x y", "xy", "y", "x"],
        obj: "h1"
      },
      {
        id: "4b0f44f0",
        q: "n = input() ile 12 girildi. type(n) nedir?",
        options: ["int", "float", "bool", "str"],
        obj: "h2"
      },
      {
        id: "d3696924",
        q: "a = input() ile 4, b = input() ile 5 girildi. print(a + b) ne yazar?",
        options: ["45", "9", "4 5", "Hata verir"],
        obj: "h2"
      },
      {
        id: "6768bfd9",
        q: "fiyat = 7.5 iken f\"{fiyat:.2f}\" ne üretir?",
        options: ["7.5", "7", "7.50", "7.500"],
        obj: "h3"
      },
      {
        id: "b36db475",
        q: "adet = 3 iken f\"{adet * 2}\" ne üretir?",
        options: ["adet * 2", "6", "32", "Hata verir"],
        obj: "h3"
      },
      {
        id: "8abd8eb7",
        q: "print(\"Ürün\\tAdet\") çıktısında \\t ne yapar?",
        options: ["Metni siler", "Yeni satıra geçer", "Ters bölü işaretini yazar", "Araya sekme boşluğu bırakır"],
        obj: "h4"
      },
      {
        id: "ca932b44",
        q: "print(\"a\\nb\") çıktısı kaç satırdır?",
        options: ["1", "2", "3", "Hata verir"],
        obj: "h4"
      }
    ],
    interview: [
      {
        q: "input() ile gelen değer hangi türdedir?",
        a: "Her zaman str. Sayı olarak kullanacaksam int() ya da float() ile çeviririm; yoksa toplamak yerine metinleri birleştirmiş olurum."
      },
      {
        q: "f-string'in artısı nedir?",
        a: "Değişkeni ve işlemi doğrudan metnin içine yazarım, ayrıca str() ve + ile uğraşmam. Biçim belirtici ile ondalık basamak gibi ayarları da yapabilirim."
      }
    ],
    vocab: [
      { term: "output", tr: "çıktı", ex: "The program prints the output." },
      { term: "input", tr: "girdi", ex: "The input is always a string." },
      { term: "format", tr: "biçimlendirmek", ex: "Format the price with two decimals." },
      { term: "escape character", tr: "kaçış karakteri", ex: "\\n is an escape character." },
      { term: "separator", tr: "ayırıcı", ex: "The separator is a dash." }
    ],
    sources: [
      { title: "Python Tutorial: Giriş ve çıkış (f-string, biçimlendirme)", url: "https://docs.python.org/3/tutorial/inputoutput.html" },
      { title: "Python Standart Kütüphane: Yerleşik işlevler", url: "https://docs.python.org/3/library/functions.html" },
      { title: "Python Institute: PCEP sertifikası (güncel müfredat burada)", url: "https://pythoninstitute.org/pcep" }
    ]
  };

  /* 3 ───────────────────────────────────────────── Operatörler */
  L[3] = {
    hook: "Operatör, değerler üzerinde işlem yapan işarettir. Doğru sonucu almanın sırrı, hangi işaretin neyi döndürdüğünü ve hangisinin önce çalıştığını bilmektir.",
    homework: "Toplam 47 kalemin 10'luk kolilere nasıl dağıldığını bulmak için // ve % kullan. Sonra 18 yaşından büyük ve ehliyeti olan birini kontrol eden bir mantıksal ifade yaz. Her ifadenin sonucunu çalıştırmadan önce tahmin et, sonra doğrula.",
    warmup: {
      recap: [
        { point: "Önceki derste çıktı almayı ve girdiyi sayıya çevirmeyi öğrendin.", example: "adet = int(input()) sayı verir" }
      ],
      concepts: [
        {
          term: "Aritmetik operatör",
          tr: "Sayılarla işlem yapar",
          summary: "+ - * / // % ** yedi temel işlemdir; / her zaman float verir.",
          example: "7 / 2 sonucu 3.5, 7 // 2 sonucu 3"
        },
        {
          term: "Karşılaştırma operatörü",
          tr: "İki değeri kıyaslar, bool döndürür",
          summary: "== != < > <= >= altı karşılaştırma vardır; = atama içindir, == karşılaştırma.",
          example: "5 >= 5 sonucu True"
        },
        {
          term: "Mantıksal operatör",
          tr: "Koşulları birleştirir",
          summary: "and her ikisi doğruysa, or en az biri doğruysa, not tersini verir.",
          example: "yas >= 18 and ehliyet"
        }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      {
        t: "box",
        h: "Gerçek talep",
        text: "Depodaki 47 kalem 10'luk kolilere konacak. Kaç tam koli çıkar, kaç kalem açıkta kalır? Bunu bölme ve kalan işlemleri bir satırda yanıtlar; elle sayarak hata yapmak kolaydır."
      },
      { t: "h", text: "Aritmetik" },
      {
        t: "cmd",
        lang: "python",
        text: "print(9 / 2)        # 4.5   (her zaman float)\nprint(9 // 2)       # 4     (tam bölme, aşağı yuvarlar)\nprint(-9 // 2)      # -5    (aşağı: eksi sonsuza doğru)\nprint(9 % 2)        # 1     (kalan)\nprint(2 ** 4)       # 16    (üs)\nprint(2 ** 2 ** 3)  # 256   (üs sağdan sola: 2 ** 8)\nprint(10 - 2 * 4)   # 2     (çarpma önce)\nprint((10 - 2) * 4) # 32    (parantez önce)"
      },
      {
        t: "steps",
        h: "Öncelik sırası (yüksekten düşüğe)",
        items: ["Parantez ( )", "Üs **", "Çarpma, bölme, tam bölme, kalan: * / // % (soldan sağa)", "Toplama, çıkarma: + - (soldan sağa)", "Karşılaştırmalar, sonra not, sonra and, en son or."]
      },
      { t: "h", text: "Karşılaştırma, mantık ve atama" },
      {
        t: "cmd",
        lang: "python",
        text: "yas = 20\nehliyet = True\nprint(yas >= 18 and ehliyet)    # True\nprint(not ehliyet or yas < 18)  # False\nprint(1 == 1.0, \"1\" == 1)       # True False\nprint(1 < yas < 30)             # True  (zincirleme)\nsayac = 5\nsayac += 2\nsayac *= 3\nprint(sayac)                    # 21\nprint(\"ab\" * 3, \"a\" + \"b\")      # ababab ab"
      },
      {
        t: "box",
        h: "Dikkat",
        text: "and ve or kısa devre yapar: ilk işlenen sonucu belirliyorsa ikincisi hiç bakılmaz. += gibi atama operatörleri x = x + ... işleminin kısaltmasıdır. Metinlerle + birleştirir, * tekrarlar."
      },
      { t: "h", text: "Kendin dene" },
      { t: "alan", id: "py-3-koli" },
      { t: "h", text: "Bozuk kodu bul ve düzelt" },
      {
        t: "steps",
        h: "Bozuk → düzeltilmiş",
        items: ["if x = 5: → SyntaxError. Karşılaştırma için çift eşittir: if x == 5:", "ort = (a + b) / 2 yerine ort = a + b / 2 yazmak → öncelik hatası. b / 2 önce çalışır; parantez ekle.", "print(10 / 2) ekrana 5 değil 5.0 yazar → Tam sayı istiyorsan 10 // 2 kullan."]
      }
    ],
    objectives: [
      { id: "h1", text: "/, //, %, ** işlemlerinin sonucunu (eksi sayılar dahil) önceden hesaplayıp sonucun türünü söyleyebilirsin." },
      { id: "h2", text: "Öncelik sırasına göre, parantezli ve parantezsiz bir ifadenin sonucunu elle bulabilirsin." },
      { id: "h3", text: "==, !=, <, >, <=, >= ile and, or, not'u birleştiren bir ifadenin True ya da False olduğunu söyleyebilirsin." },
      { id: "h4", text: "+=, -=, *= atamalarını ve metinlerde + ile * davranışını kullanıp sonucunu tahmin edebilirsin." }
    ],
    summary: ["/ her zaman float verir; // aşağı yuvarlayan tam bölmedir (negatifte eksi sonsuza doğru yuvarlar); % kalanı verir; ** üstür.", "Öncelik: parantez, **, * / // %, + -, karşılaştırma, not, and, or. ** sağdan sola çalışır.", "= atama, == karşılaştırmadır. Karşılaştırmalar bool döndürür; 1 < x < 10 zincirlenebilir.", "and ve or kısa devre yapar. not tersini alır.", "x += 2 işlemi x = x + 2 demektir. Metinde + birleştirir, * tekrarlar."],
    prereq: [2],
    minutes: 30,
    sonDogrulama: "2026-10-24",
    surum: "2026-10-v1",
    quiz: [
      {
        id: "257c3b0a",
        q: "7 / 2 ifadesinin sonucu nedir?",
        options: ["3", "3.5", "4", "3.0"],
        obj: "h1"
      },
      {
        id: "a52f9dff",
        q: "-7 // 2 ifadesinin sonucu nedir?",
        options: ["-4", "-3", "-3.5", "3"],
        obj: "h1"
      },
      {
        id: "484e5488",
        q: "10 - 2 * 3 sonucu nedir?",
        options: ["24", "18", "4", "-8"],
        obj: "h2"
      },
      {
        id: "3bffd543",
        q: "2 ** 3 ** 2 sonucu nedir?",
        options: ["512", "64", "36", "12"],
        obj: "h2"
      },
      {
        id: "77c69091",
        q: "yas = 20, ehliyet = False iken yas >= 18 and ehliyet nedir?",
        options: ["True", "20", "False", "Hata verir"],
        obj: "h3"
      },
      {
        id: "f20aba04",
        q: "1 == 1.0 ifadesi ve \"1\" == 1 ifadesi sırasıyla nedir?",
        options: ["True ve True", "False ve False", "False ve True", "True ve False"],
        obj: "h3"
      },
      {
        id: "c2a928e0",
        q: "sayac = 5 olsun; sayac += 2, sonra sayac *= 3 çalışırsa sayac kaçtır?",
        options: ["17", "21", "15", "10"],
        obj: "h4"
      },
      {
        id: "c39f5022",
        q: "\"ab\" * 3 ifadesi ne üretir?",
        options: ["ababab", "ab3", "ab ab ab", "Hata verir"],
        obj: "h4"
      }
    ],
    interview: [
      {
        q: "/ ile // arasındaki fark nedir?",
        a: "/ gerçek bölmedir ve her zaman float verir (9 / 2 = 4.5). // tam bölmedir ve aşağı yuvarlar (9 // 2 = 4, -9 // 2 = -5)."
      },
      {
        q: "= ile == arasındaki fark nedir?",
        a: "= atama yapar, == karşılaştırır ve True ya da False döndürür. Koşulda yanlışlıkla = yazmak SyntaxError verir."
      }
    ],
    vocab: [
      { term: "operator", tr: "işleci", ex: "The plus operator adds numbers." },
      { term: "operand", tr: "işlenen", ex: "Each side of + is an operand." },
      { term: "remainder", tr: "kalan", ex: "The remainder of 7 divided by 2 is 1." },
      { term: "precedence", tr: "öncelik", ex: "Multiplication has higher precedence than addition." },
      { term: "comparison", tr: "karşılaştırma", ex: "A comparison returns True or False." }
    ],
    sources: [
      { title: "Python Tutorial: Bir giriş (resmî belge)", url: "https://docs.python.org/3/tutorial/introduction.html" },
      { title: "Python Standart Kütüphane: Yerleşik türler", url: "https://docs.python.org/3/library/stdtypes.html" },
      { title: "Python Institute: PCEP sertifikası (güncel müfredat burada)", url: "https://pythoninstitute.org/pcep" }
    ]
  };

  /* 4 ───────────────────────────────────────────── Koşullar: if, elif, else */
  L[4] = {
    hook: "Program, yolun çatallandığı yerde karar verir. Koşul bir soru sorar, girinti hangi satırların o soruya bağlı olduğunu söyler.",
    homework: "Bir puandan harf notu üreten program yaz: 85 ve üstü A, 70 ve üstü B, 50 ve üstü C, kalan F. Sınır değerleri (85, 84, 70, 49, 50) için sonucu önceden tahmin et, sonra çalıştır. En az bir tane de yanlış sıralanmış elif zinciri yazıp neden hatalı çalıştığını açıkla.",
    warmup: {
      recap: [
        { point: "Önceki derste karşılaştırmaların True ya da False verdiğini ve and, or, not'u gördün.", example: "puan >= 70 and puan < 85" }
      ],
      concepts: [
        {
          term: "Koşul (condition)",
          tr: "Doğru ya da yanlış çıkan ifade",
          summary: "if satırı iki nokta ile biter, altındaki girintili satırlar koşul doğruysa çalışır.",
          example: "if puan >= 50:"
        },
        {
          term: "Girinti (indentation)",
          tr: "Bloğu belirleyen boşluk",
          summary: "Aynı bloktaki satırlar aynı miktarda içeriden başlar; genelde dört boşluk.",
          example: "if x > 0:\\n    print(x)"
        },
        {
          term: "Doğruluk değeri (truthiness)",
          tr: "Koşulda False sayılan değerler",
          summary: "0, 0.0, boş metin, boş liste ve None koşulda False; diğer çoğu değer True sayılır.",
          example: "if adet: stok var"
        }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      {
        t: "box",
        h: "Gerçek talep",
        text: "Kasa programı 500 TL üstü alışverişe indirim, stok bittiyse uyarı vermeli. Her durum ayrı bir karar. Kararlar kodda if, elif ve else ile yazılır."
      },
      { t: "h", text: "if, elif, else" },
      {
        t: "cmd",
        lang: "python",
        text: "puan = 72\nif puan >= 85:\n    harf = \"A\"\nelif puan >= 70:\n    harf = \"B\"\nelif puan >= 50:\n    harf = \"C\"\nelse:\n    harf = \"F\"\nprint(harf)   # B"
      },
      {
        t: "steps",
        h: "Nasıl çalışır?",
        items: ["Python koşulları yukarıdan aşağı sırayla dener ve ilk doğru olanın bloğunu çalıştırıp zincirden çıkar.", "elif ve else isteğe bağlıdır; else hiçbir koşul tutmadığında çalışır ve koşul almaz.", "Her if, elif ve else satırı iki nokta ile biter; altındaki blok girintilidir."]
      },
      { t: "h", text: "Girinti, iç içe koşul ve doğruluk değeri" },
      {
        t: "cmd",
        lang: "python",
        text: "adet = 0\nif adet:\n    print(\"stok var\")\nelse:\n    print(\"stok yok\")        # stok yok\n\nx = 15\nif x > 10:\n    if x % 2 == 0:\n        print(\"büyük çift\")\n    else:\n        print(\"büyük tek\")   # büyük tek\nprint(\"bitti\")               # her durumda çalışır"
      },
      {
        t: "box",
        h: "Dikkat",
        text: "Sıra önemlidir. Sınırlara dikkat et: puan >= 50 koşulunu 85'ten önce yazarsan 90 puan da C alır. Girintisiz son satır bloğun dışında kalır ve her zaman çalışır."
      },
      { t: "h", text: "Kendin dene" },
      { t: "alan", id: "py-4-etiket" },
      { t: "h", text: "Bozuk kodu bul ve düzelt" },
      {
        t: "steps",
        h: "Bozuk → düzeltilmiş",
        items: ["if puan >= 50 → SyntaxError (iki nokta eksik). if puan >= 50: yaz.", "if puan >= 50: satırının altındaki print aynı hizada → IndentationError. Bloğa dört boşluk gir.", "if x > 5 and < 10: → SyntaxError. Her taraf tam koşul olmalı: if x > 5 and x < 10: ya da if 5 < x < 10:", "if puan >= 50: ... elif puan >= 85: → ikinci koşul hiç çalışmaz. Önce büyük eşiği (85) yaz."]
      }
    ],
    objectives: [
      { id: "h1", text: "if, elif ve else zincirinde hangi bloğun çalışacağını verilen değer için söyleyebilirsin." },
      { id: "h2", text: "Girintiye bakarak bir satırın hangi bloğa ait olduğunu bulup iç içe koşulun çıktısını yazabilirsin." },
      { id: "h3", text: "Koşulda 0, boş metin, boş liste ve None değerlerinin False sayıldığını bilerek sonucu tahmin edebilirsin." },
      { id: "h4", text: "Sıralaması ya da sözdizimi bozuk bir koşul zincirini bulup düzeltebilirsin." }
    ],
    summary: ["if koşul: ile başlar; doğruysa girintili blok çalışır. elif sonraki koşulları dener, else kalan durumu karşılar.", "Koşullar yukarıdan aşağı denenir, ilk doğru olan çalışır ve zincir biter.", "Girinti Python'da sözdizimidir: aynı bloktaki satırlar aynı miktarda içeriden başlar.", "0, 0.0, \"\", [] ve None koşulda False sayılır; çoğu diğer değer True sayılır.", "Sınır değerleri (>= ile > farkı) ve koşulların sırası en sık hata kaynağıdır."],
    prereq: [3],
    minutes: 30,
    sonDogrulama: "2026-10-24",
    surum: "2026-10-v1",
    quiz: [
      {
        id: "30a08fe3",
        q: "puan = 72 için aşağıdaki zincir hangi harfi verir? (85 ve üstü A, 70 ve üstü B, 50 ve üstü C, kalan F)",
        options: ["A", "B", "C", "F"],
        obj: "h1"
      },
      {
        id: "001d167b",
        q: "elif ve else içeren bir zincirde ilk koşul doğruysa ne olur?",
        options: ["Diğer koşullar hiç denenmez", "Hepsi sırayla denenir", "else her zaman çalışır", "Python hata verir"],
        obj: "h1"
      },
      {
        id: "8b22c143",
        q: "x = 15 için if x > 10: if x % 2 == 0: print(\"A\") else: print(\"B\") (iç içe, iç else içteki if'e bağlı) ne yazar?",
        options: ["A", "AB", "B", "Hiçbir şey"],
        obj: "h2"
      },
      {
        id: "499e8c6d",
        q: "Python'da bir if bloğuna ait satırı belirleyen nedir?",
        options: ["Satırın girintisi", "Satırın sonundaki noktalı virgül", "Süslü parantezler", "Satırın numarası"],
        obj: "h2"
      },
      {
        id: "7213726c",
        q: "adet = 0 iken if adet: koşulu ne olur?",
        options: ["True sayılır", "Hata verir", "None döner", "False sayılır, blok çalışmaz"],
        obj: "h3"
      },
      {
        id: "a8a75030",
        q: "Hangisi koşulda False sayılır?",
        options: ["[]", "\"0\"", "[0]", "\" \""],
        obj: "h3"
      },
      {
        id: "be7a8778",
        q: "if puan >= 50: ... elif puan >= 85: ... zincirinde sorun nedir?",
        options: ["Sözdizimi hatası", "İkinci koşul hiç çalışmaz", "else eksiktir", "puan değişkeni yoktur"],
        obj: "h4"
      },
      {
        id: "009ace66",
        q: "if x > 5 and < 10: satırının sorunu nedir?",
        options: ["and'den sonra tam koşul yok", "10 yerine \"10\" yazılmalı", "Koşulda and kullanılamaz", "Satır iki noktayla bitmemiş"],
        obj: "h4"
      }
    ],
    interview: [
      {
        q: "elif ile arka arkaya iki if arasındaki fark nedir?",
        a: "elif zincirinde ilk doğru koşuldan sonra kalanı denenmez. Ayrı if satırlarında her koşul bağımsız denenir; birden fazlası çalışabilir."
      },
      {
        q: "Python bloğu nasıl belirler?",
        a: "Girinti ile. if satırı iki nokta ile biter ve altındaki girintili satırlar bloğu oluşturur. Girinti tutarsızsa IndentationError alırım."
      }
    ],
    vocab: [
      { term: "condition", tr: "koşul", ex: "The condition is True." },
      { term: "branch", tr: "dal", ex: "Each branch handles one case." },
      { term: "indentation", tr: "girinti", ex: "Python uses indentation for blocks." },
      { term: "block", tr: "kod bloğu", ex: "The block runs if the condition is true." },
      { term: "boundary value", tr: "sınır değer", ex: "Test the boundary value 50." }
    ],
    sources: [
      { title: "Python Tutorial: Denetim akışı (if, for, range, def)", url: "https://docs.python.org/3/tutorial/controlflow.html" },
      { title: "Python Standart Kütüphane: Yerleşik türler", url: "https://docs.python.org/3/library/stdtypes.html" },
      { title: "Python Institute: PCEP sertifikası (güncel müfredat burada)", url: "https://pythoninstitute.org/pcep" }
    ]
  };
})();

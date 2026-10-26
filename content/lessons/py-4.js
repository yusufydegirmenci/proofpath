/* Python (PCEP düzeyi) · sabit dersler 11-16 (Ders 0: Python nedir ve nasıl çalışır; mantık ve bit operatörleri; basit algoritmalar; iç içe listeler ve liste kavrayışı; özyineleme ve üreteçler; test ve hata ayıklama). Kapsam herkese açık PCEP müfredat özetinden alınmıştır; metinler özgündür.
   Dış kaynak: yalnız docs.python.org ve pythoninstitute.org (HTTP 200, curl, 2026-10-26). Kod örnekleri CPython 3.12 ile çalıştırılarak doğrulandı; alıştırmalar PP.alan (Pyodide) ile çalışır (py-alan.js).
   Ders metnindeki örnek kodlar, o dersin sınav sorularından farklı değerler kullanır (örnek anlatır, soru başka ifadeyle sınar).
   Numaralama: yeni dersler mevcut kimlikleri ve ilerlemeyi bozmamak için sona eklendi; "Ders 0" kavramsal olarak en başta okunabilir (önkoşulu yoktur), kimliği 11'dir. */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).py = (window.PP_LESSONS.py || {}));

  /* 11 ───────────────────────────────────────────── Ders 0: Python nedir ve nasıl çalışır */
  L[11] = {
    hook: "Python kodu kendi başına bir şey yapmaz: onu okuyup çalıştıran bir program, yani yorumlayıcı gerekir. Bu derste kod yazmadan önce o programı, çalıştırma yollarını ve hata türlerini tanırsın.",
    homework: "Terminalde python --version komutunu çalıştır (olmazsa python3 --version ya da py --version dene) ve sürüm numarasını not et. Etkileşimli kabuğu aç, 7 * 6 yaz ve cevabı gör. Sonra merhaba.py adlı bir dosyaya iki print satırı yazıp terminalden çalıştır. Son olarak ikinci satırın sonundaki parantezi sil, dosyayı yeniden çalıştır ve hata mesajının hangi satırı gösterdiğine bak.",
    warmup: {
      recap: [
        { point: "Bu ders sıfırdan başlar; daha önce kod yazmadıysan da izleyebilirsin. Diğer derslerle sıra bağımsızdır, istersen en başta bile okuyabilirsin.", example: "print(\"selam\") ekrana selam yazar" }
      ],
      concepts: [
        { term: "Yorumlayıcı (interpreter)", tr: "Kodu okuyup çalıştıran program", summary: "Python programını yorumlayıcı çalıştırır; sen kaynak kodu yazarsın, o yürütür.", example: "python merhaba.py" },
        { term: "CPython", tr: "Standart Python gerçeklemesi", summary: "C ile yazılmış, python.org'dan indirilen yorumlayıcıdır; PyPy gibi başka gerçeklemeler de vardır.", example: "python --version" },
        { term: "Sözdizimi hatası (SyntaxError)", tr: "Dilin yazım kuralına uymayan kod", summary: "Python bunu program çalışmadan önce yakalar ve hangi satırda olduğunu gösterir.", example: "print(\"selam\"" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Bir arkadaşın indirdiği betik onun bilgisayarında çalışıyor, seninkinde çalışmıyor. Python'un ne olduğunu, sürümlerin nasıl ayrıldığını ve kodun nasıl çalıştırıldığını bilirsen hatayı nerede arayacağını bilirsin." },
      { t: "h", text: "Kaynak kod, derleyici ve yorumlayıcı" },
      { t: "p", text: "Bilgisayarın işlemcisi yalnız makine kodunu anlar. Senin yazdığın okunur metne kaynak kod (source code) denir ve çalışmadan önce bir yolla çevrilmesi gerekir. Derleyici (compiler) kaynağın tamamını çalışmadan önce çevirip ayrı bir çıktı üretir. Yorumlayıcı (interpreter) ise kaynağı çalışma sırasında okuyup yürütür." },
      { t: "steps", h: "Python'da durum", items: ["Python programlarını bir yorumlayıcı çalıştırır; ayrıca bir derleme adımı çalıştırman gerekmez.","Standart yorumlayıcı kodu önce içte bayt koduna (bytecode) çevirir, sonra bunu yürütür. Bu çeviri sana görünmez.","Sonuç: sözdizimi hataları dosya çalışmadan önce bulunur, ama sıfıra bölme gibi hatalar ancak o satıra gelinince ortaya çıkar."] },
      { t: "cmd", lang: "python", text: "print(\"birinci satır\")\nprint(10 / 2)\n# print(10 / 0)   # başındaki # kalkarsa ZeroDivisionError oluşur\nprint(\"son satır\")\n\n# Çıktı:\n# birinci satır\n# 5.0\n# son satır" },
      { t: "h", text: "CPython, PyPy ve sürümler" },
      { t: "p", text: "Python bir dildir; onu çalıştıran programlara gerçekleme (implementation) denir. En yaygını C ile yazılmış CPython'dur: python.org'dan indirdiğin budur. PyPy gibi başka gerçeklemeler de aynı dili çalıştırır." },
      { t: "steps", h: "Sürümleri okumak", items: ["Sürüm numarası ana.ikincil.yama biçimindedir: 3.12.4 gibi. Örnekler bu derslerde Python 3.12 ile çalıştırıldı.","Python 2 ve Python 3 uyumsuz iki ailedir. Python 2'nin desteği 1 Ocak 2020'de bitti; yeni kod Python 3 ile yazılır.","Kullandığın sürümü terminalde aşağıdaki sürüm komutuyla görürsün. Bazı sistemlerde komut python3 ya da py olabilir."] },
      { t: "cmd", lang: "bash", text: "python --version\n# örnek çıktı: Python 3.12.10   (senin sürümün farklı olabilir)" },
      { t: "cmd", lang: "python", text: "import sys\nprint(sys.version_info.major)         # 3\nprint(sys.version_info >= (3, 8))     # True" },
      { t: "h", text: "Kodu çalıştırmanın yolları" },
      { t: "steps", h: "Üç yol", items: ["Etkileşimli kabuk (REPL): terminalde python yazınca >>> görünür. Yazdığın ifade hemen hesaplanır ve sonucu otomatik gösterilir; print gerekmez.","Betik: kodu merhaba.py gibi bir dosyaya yazar, terminalden aşağıdaki komutla çalıştırırsın. Dosyada ekrana bir şey yazmak için print gerekir.","IDLE: Python ile gelen basit geliştirme ortamıdır; hem kabuğu hem dosya düzenleyiciyi içerir. İstersen başka bir editör de kullanırsın."] },
      { t: "cmd", lang: "python", calistirma: "atla etkileşimli kabuk dökümüdür; >>> işaretleri dosyaya yazılmaz, kendi bilgisayarında yaz ve dene", text: ">>> 2 + 3\n5\n>>> adet = 4\n>>> adet * 2.5\n10.0\n>>> print(\"selam\")\nselam" },
      { t: "cmd", lang: "bash", text: "python merhaba.py" },
      { t: "h", text: "Sözdizimi, anlam, girinti ve hata türleri" },
      { t: "p", text: "Bir dilin üç katmanı vardır: sözcük bilgisi (lexis: dilin sözcükleri ve karakterleri), sözdizimi (syntax: sözcüklerin hangi kurallarla dizildiği) ve anlam (semantics: dizilimin ne ifade ettiği). Python bir bloğu parantezle değil girintiyle belirler; # ile başlayan kısım yorumdur ve atlanır." },
      { t: "cmd", lang: "python", text: "# Yorum: Python bu satırı atlar\nadet = 3\nif adet > 2:\n    print(\"çok\")      # dört boşluk girinti\nprint(\"bitti\")\n\n# Çıktı:\n# çok\n# bitti" },
      { t: "steps", h: "Üç tür hata", items: ["Sözdizimi hatası: kural bozuktur (kapanmayan parantez, eksik iki nokta). Python kodu çalıştırmadan reddeder.","Çalışma zamanı hatası (istisna): kod yazım olarak doğrudur ama çalışırken bir işlem başarısız olur (sıfıra bölme, olmayan ad). Hatadan önceki satırlar çalışmış olur.","Mantık hatası: program hata vermez ama yanlış iş yapar (toplamak yerine çıkarmak). Python bunu bulamaz; sonucu beklediğinle karşılaştırarak sen bulursun."] },
      { t: "h", text: "Kendin dene" },
      { t: "alan", id: "py-11-tur" },
      { t: "h", text: "Bozuk kodu bul ve düzelt" },
      { t: "steps", h: "Bozuk → düzeltilmiş", items: ["print(\"selam\" → SyntaxError (parantez kapanmamış). print(\"selam\") yaz.","Print(\"selam\") → NameError: Python büyük küçük harfi ayırır, yerleşik işlev print küçük harfle yazılır. print(\"selam\") yaz.","if adet > 2: satırından sonra girintisiz print(\"çok\") → IndentationError. Bloğun içindeki satırı dört boşlukla girintile.","python merhaba komutu → dosya bulunamaz, çünkü uzantı yok. Dosya adını .py uzantısıyla yaz."] }
    ],
    objectives: [
      { id: "h1", text: "Derleyici ile yorumlayıcı arasındaki farkı söyleyip Python programının bir yorumlayıcıyla çalıştığını açıklayabilirsin." },
      { id: "h2", text: "CPython, PyPy ve Python sürüm ailelerini (2 ve 3) birbirinden ayırt edebilirsin." },
      { id: "h3", text: "Bir kodun etkileşimli kabukta ve python dosya.py komutuyla çalışmasının farkını söyleyebilirsin." },
      { id: "h4", text: "Sözdizimi hatası, çalışma zamanı hatası ve mantık hatasını ayırt edebilirsin." }
    ],
    summary: ["Python programını bir yorumlayıcı çalıştırır; derleyici önce çevirir, yorumlayıcı çalışırken yürütür.","CPython standart gerçeklemedir; PyPy gibi başkaları da vardır. Yeni kod Python 3 ile yazılır, python --version sürümü gösterir.","Kod etkileşimli kabukta (sonuç otomatik görünür) ya da python dosya.py ile (print gerekir) çalıştırılır.","Üç hata türü: sözdizimi (çalışmadan önce), çalışma zamanı (çalışırken), mantık (yanlış sonuç, hata mesajı yok)."],
    prereq: [],
    minutes: 25,
    sonDogrulama: "2026-10-26",
    surum: "2026-10-v1",
    quiz: [
      {
        id: "7a8fba82",
        q: "Derleyici ile yorumlayıcı arasındaki temel fark hangisidir?",
        options: ["Derleyici yalnız Python'da, yorumlayıcı diğer dillerde bulunur", "Derleyici önce programı çevirip ayrı bir çıktı üretir; yorumlayıcı kaynağı çalıştırırken okuyup yürütür", "Derleyici kodu hiç çevirmeden doğrudan çalıştırır", "İkisi aynı işi yapar, yalnız hızları farklıdır"],
        obj: "h1"
      },
      {
        id: "45eec2a1",
        q: "print(\"bir\")\nprint(\"iki\")\nprint(\"üç\"\nprint(\"dört\")\nDosya çalıştırılırsa ne olur?",
        options: ["bir ve iki yazılır, sonra hata verir", "bir, iki, üç, dört yazılır", "Hiçbir satır çalışmaz, yalnız SyntaxError görünür", "bir, iki, üç yazılır; dördüncü satır atlanır"],
        obj: "h1"
      },
      {
        id: "b16f56cc",
        q: "CPython nedir?",
        options: ["Python kodunu C koduna çeviren bir derleyici", "Python'un yalnız web sitelerinde çalışan sürümü", "Python'un C ile yazılmış standart (referans) gerçeklemesi", "Python 2'nin başka bir adı"],
        obj: "h2"
      },
      {
        id: "fecf4ff5",
        q: "Aşağıdakilerden hangisi Python'un başka bir gerçeklemesidir?",
        options: ["PyPy", "NumPy", "pip", "IDLE"],
        obj: "h2"
      },
      {
        id: "edcf89d9",
        q: "Etkileşimli kabukta (REPL) >>> 2 + 3 yazıp Enter'a basınca ne olur?",
        options: ["Hiçbir şey görünmez, print gerekir", "Hata verir", "\"2 + 3\" metni yazılır", "5 görünür; kabuk ifadenin değerini kendisi gösterir"],
        obj: "h3"
      },
      {
        id: "ef751829",
        q: "hesap.py dosyasını terminalden çalıştırmak için hangi komut kullanılır?",
        options: ["hesap.py python", "python hesap.py", "pip install hesap.py", "python -m hesap.py"],
        obj: "h3"
      },
      {
        id: "d149cfe8",
        q: "print(\"Merhaba\" tek satırı (kapanmayan parantez) hangi hata türüne girer?",
        options: ["Sözdizimi hatası (SyntaxError)", "Çalışma zamanı hatası", "Mantık hatası", "Hata sayılmaz"],
        obj: "h4"
      },
      {
        id: "1e145017",
        q: "Program hatasız çalışıyor ama iki sayıyı toplamak yerine çıkarıyor (a - b yazılmış). Bu hangi türden hatadır?",
        options: ["Sözdizimi hatası", "Çalışma zamanı istisnası", "Derleme hatası", "Mantık (anlam) hatası: Python hata vermez, sonuç yanlış çıkar"],
        obj: "h4"
      }
    ],
    interview: [
      {
        q: "Python derlenen mi yorumlanan bir dil mi?",
        a: "Python programlarını bir yorumlayıcı çalıştırır. Standart yorumlayıcı kaynağı önce içte bayt koduna çevirir, sonra yürütür; ben ayrıca bir derleme adımı çalıştırmam. Bu yüzden sözdizimi hatası çalışmadan önce, sıfıra bölme gibi hatalar ise çalışırken görünür."
      },
      {
        q: "Sözdizimi hatası ile mantık hatası arasındaki fark nedir?",
        a: "Sözdizimi hatasında kod dilin kuralına uymaz ve Python hiç çalıştırmaz. Mantık hatasında kod çalışır ama yanlış sonuç verir; Python şikayet etmez, beklenen sonuçla karşılaştırarak bulurum."
      }
    ],
    vocab: [
      { term: "interpreter", tr: "yorumlayıcı", ex: "The interpreter runs the Python program." },
      { term: "compiler", tr: "derleyici", ex: "A compiler translates the whole source first." },
      { term: "source code", tr: "kaynak kod", ex: "Source code is the text you write." },
      { term: "syntax error", tr: "sözdizimi hatası", ex: "A syntax error stops the program before it starts." },
      { term: "indentation", tr: "girinti", ex: "Python uses indentation to mark a block." }
    ],
    sources: [
      { title: "Python Tutorial: Python yorumlayıcısı", url: "https://docs.python.org/3/tutorial/interpreter.html" },
      { title: "Python belgesi: Komut satırı ve ortam", url: "https://docs.python.org/3/using/cmdline.html" },
      { title: "Python Institute: PCEP sertifikası (güncel müfredat burada)", url: "https://pythoninstitute.org/pcep" }
    ]
  };

  /* 12 ───────────────────────────────────────────── Mantık ve bit operatörleri */
  L[12] = {
    hook: "and, or, not doğruyu ve yanlışı bağlar; &, |, ^, ~, <<, >> ise sayıların kendi bitleriyle oynar. İkisi birbirine benzer görünür ama başka iş yapar.",
    homework: "Bir izin sayısı düşün: 1 okuma, 2 yazma, 4 silme. 6 sayısının hangi izinleri taşıdığını & ile sına (6 & 1, 6 & 2, 6 & 4). Sonra 7 sayısından yazma iznini & ~2 ile kaldır. Son olarak 0 or \"ad\", 3 and 4 ve 5 and 0 or 7 ifadelerini çalıştırmadan önce sonucu tahmin et, sonra çalıştırıp karşılaştır.",
    warmup: {
      recap: [
        { point: "Karşılaştırma operatörleri (==, <, >) True ya da False üretir; koşullarda ve döngülerde bu değerler yön belirler.", example: "5 > 3 → True" }
      ],
      concepts: [
        { term: "Kısa devre (short-circuit)", tr: "Sonuç belli olunca sağ tarafı hesaplamamak", summary: "and sol taraf yanlışsa, or sol taraf doğruysa sağı hesaplamaz.", example: "False and f() → f çağrılmaz" },
        { term: "Bit operatörü", tr: "Sayının ikilik basamaklarına işlem", summary: "&, |, ^ ve ~ iki sayının bitlerini tek tek karşılaştırır ya da terslemeye yarar.", example: "6 & 3 → 2" },
        { term: "Kaydırma (shift)", tr: "Bitleri sola ya da sağa itmek", summary: "<< sola, >> sağa iter; her adım değeri ikiyle çarpar ya da böler.", example: "1 << 3 → 8" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Bir ayar kutusu birçok açık kapalı seçeneği tek bir sayıda saklar: okuma, yazma, silme. Hangisinin açık olduğunu okumak ve değiştirmek bit operatörleriyle olur. Koşullarda ise and, or, not ve onların kısa devre kuralı işini görür." },
      { t: "h", text: "and, or, not ve kısa devre" },
      { t: "cmd", lang: "python", text: "print(True and False)     # False\nprint(not 0)              # True\nprint(3 and 4)            # 4\nprint(0 or \"ad\")          # ad\nprint(\"\" or \"boş\")        # boş\n\ndef sor():\n    print(\"sor çağrıldı\")\n    return True\n\nprint(True or sor())      # True   (sor çağrılmadı)\nprint(False and sor())    # False  (sor çağrılmadı)\nprint(True and sor())     # sor çağrıldı, sonra True" },
      { t: "steps", h: "Kurallar", items: ["and ve or True ya da False değil, işlenenlerden birini döndürür: 3 and 4 sonucu 4, 0 or \"ad\" sonucu \"ad\" olur.","Yanlış sayılan değerler: False, 0, 0.0, boş metin, boş liste ve None. Gerisi doğru sayılır.","Kısa devre: and sol tarafı yanlışsa soldaki değeri verir ve sağa bakmaz; or sol tarafı doğruysa soldakini verir ve sağa bakmaz."] },
      { t: "h", text: "İşlem önceliği ve zincirleme karşılaştırma" },
      { t: "cmd", lang: "python", text: "x = 7\nprint(1 < x < 10)                 # True   (1 < x ve x < 10)\nprint(10 > x > 8)                 # False\nprint(not x == 7)                 # False  (önce ==, sonra not)\nprint(True or False and False)    # True   (önce and)\nprint((True or False) and False)  # False  (parantez önceliği değiştirir)" },
      { t: "steps", h: "Öncelik sırası", items: ["Yüksekten düşüğe: karşılaştırmalar, sonra not, sonra and, en sonra or.","Python 1 < x < 10 yazımını iki karşılaştırmanın and ile birleşimi sayar; ortadaki x yalnız bir kez hesaplanır.","Emin değilsen parantez kullan; okuyan kişi de önceliği ezberlemek zorunda kalmaz."] },
      { t: "h", text: "Bit operatörleri: &, |, ^, ~" },
      { t: "cmd", lang: "python", text: "a = 0b1100      # 12\nb = 0b1010      # 10\nprint(bin(a & b), a & b)    # 0b1000 8   (ikisinde de 1 olan bitler)\nprint(bin(a | b), a | b)    # 0b1110 14  (en az birinde 1 olan bitler)\nprint(bin(a ^ b), a ^ b)    # 0b110 6    (yalnız birinde 1 olan bitler)\nprint(~a)                   # -13        (~x = -x - 1)" },
      { t: "box", h: "Dikkat", text: "6 and 3 ile 6 & 3 aynı değildir. and mantıksaldır ve işlenenden birini döndürür (3); & ise bitleri karşılaştırır (2). Koşulda bit işlemi sonucunu kullanacaksan parantez ekle: (izin & 2) != 0." },
      { t: "h", text: "Kaydırma ve bayrak (maske) kullanımı" },
      { t: "cmd", lang: "python", text: "OKU, YAZ, SIL = 1, 2, 4\nizin = OKU | YAZ               # 3\nprint(izin)                     # 3\nprint(bool(izin & YAZ))         # True   (yazma açık mı?)\nprint(bool(izin & SIL))         # False\nizin = izin | SIL               # silmeyi aç\nizin = izin & ~YAZ              # yazmayı kapat\nprint(izin)                     # 5\nprint(1 << 3, 40 >> 2)          # 8 10\nprint(1 << 2 + 1)               # 8   (+ kaydırmadan önce işlenir)\nprint(13 & 1)                   # 1   (en düşük bit 1: sayı tek)" },
      { t: "steps", h: "Maske kalıpları", items: ["Bir bit açık mı: sayı & bayrak sıfırdan farklıysa açıktır.","Bit açmak için | , kapatmak için & ~bayrak, tersine çevirmek için ^ kullanılır.","x << n değeri x · 2ⁿ, x >> n değeri x // 2ⁿ yapar; ikilik sistemde 2'ye çarpmak ve bölmek kaydırmadır."] },
      { t: "h", text: "Kendin dene" },
      { t: "alan", id: "py-12-bit" },
      { t: "h", text: "Bozuk kodu bul ve düzelt" },
      { t: "steps", h: "Bozuk → düzeltilmiş", items: ["if adet > 2 and < 10: → SyntaxError (and'den sonra tam bir koşul gerekir). if 2 < adet < 10: ya da adet > 2 and adet < 10 yaz.","print(6 && 3) → SyntaxError; Python'da && yoktur. Mantık için 6 and 3, bit için 6 & 3 yaz.","izin = izin & YAZ (yazma iznini eklemek istenmiş) → diğer bitler silinir. Eklemek için izin = izin | YAZ ya da izin |= YAZ yaz.","if x == 1 or 2: → 2 her zaman doğru sayıldığı için koşul hep doğrudur. if x == 1 or x == 2: ya da if x in (1, 2): yaz."] }
    ],
    objectives: [
      { id: "h1", text: "and, or ve not ifadelerinin kısa devreyle hangi değeri döndürdüğünü söyleyebilirsin." },
      { id: "h2", text: "İşlem önceliği ve zincirleme karşılaştırmayı kullanarak karmaşık bir mantık ifadesinin sonucunu bulabilirsin." },
      { id: "h3", text: "&, | , ^ ve ~ operatörlerinin iki tam sayıda verdiği sonucu ikilik karşılıklarına bakarak bulabilirsin." },
      { id: "h4", text: "<< ve >> kaydırmasını ve maske ile bayrak denetimini kullanıp sonucu söyleyebilirsin." }
    ],
    summary: ["and, or ve not işlenenlerden birini döndürür; kısa devrede sağ taraf gerekmiyorsa hesaplanmaz.","Öncelik: karşılaştırma, not, and, or. 1 < x < 10 iki karşılaştırmanın and ile birleşimidir; belirsizlikte parantez kullan.","&, |, ^, ~ bitleri tek tek işler: 6 & 3 sonucu 2, ~x değeri -x - 1.","x << n değeri x · 2ⁿ, x >> n değeri x // 2ⁿ; maske ile bir bayrağın açık olup olmadığını (&), açma (|) ve kapatma (& ~) işlemlerini yaparsın."],
    prereq: [3],
    minutes: 30,
    sonDogrulama: "2026-10-26",
    surum: "2026-10-v1",
    quiz: [
      {
        id: "a6436483",
        q: "def f():\n    print(\"f\")\n    return True\nprint(False and f())\nkodu ne yazdırır?",
        options: ["f, True", "False", "f, False", "Hata verir"],
        obj: "h1"
      },
      {
        id: "a6065534",
        q: "print(5 and 0 or 7) kodu ne yazdırır?",
        options: ["0", "5", "7", "True"],
        obj: "h1"
      },
      {
        id: "da1c3d65",
        q: "print(False and True or True) kodu ne yazdırır?",
        options: ["False", "Hata verir", "True", "None"],
        obj: "h2"
      },
      {
        id: "40cd1b37",
        q: "x = 7\nprint(10 > x > 8)\nkodu ne yazdırır?",
        options: ["False", "True", "Hata verir", "7"],
        obj: "h2"
      },
      {
        id: "28722d23",
        q: "print(6 & 3) kodu ne yazdırır?",
        options: ["7", "5", "9", "2"],
        obj: "h3"
      },
      {
        id: "6a196113",
        q: "print(~5) kodu ne yazdırır?",
        options: ["-5", "-6", "6", "5"],
        obj: "h3"
      },
      {
        id: "1ffa85ed",
        q: "print(1 << 4) kodu ne yazdırır?",
        options: ["16", "8", "4", "14"],
        obj: "h4"
      },
      {
        id: "7280418c",
        q: "print(40 >> 2) kodu ne yazdırır?",
        options: ["160", "20", "38", "10"],
        obj: "h4"
      }
    ],
    interview: [
      {
        q: "and ile & arasındaki fark nedir?",
        a: "and mantıksal bir operatördür; doğru ya da yanlış sayma kuralına göre işlenenlerden birini döndürür ve kısa devre yapar. & ise sayıların bitlerini tek tek karşılaştırır ve yeni bir sayı üretir."
      },
      {
        q: "Kısa devre neden işe yarar?",
        a: "Sonucu belli olunca sağ tarafı hiç hesaplamadığı için pahalı ya da hata verebilecek bir işi korur. Örneğin x != 0 and 10 / x > 1 yazarsam x sıfırken bölme hiç yapılmaz."
      }
    ],
    vocab: [
      { term: "short-circuit", tr: "kısa devre", ex: "The and operator uses short-circuit evaluation." },
      { term: "bitwise", tr: "bit düzeyinde", ex: "A bitwise AND compares each bit." },
      { term: "mask", tr: "maske", ex: "Use a mask to test one bit." },
      { term: "shift", tr: "kaydırma", ex: "A left shift doubles the number." },
      { term: "operator precedence", tr: "işlem önceliği", ex: "Operator precedence decides which part runs first." }
    ],
    sources: [
      { title: "Python Dil Başvurusu: İfadeler (işlem önceliği)", url: "https://docs.python.org/3/reference/expressions.html" },
      { title: "Python Standart Kütüphane: Yerleşik türler (bit işlemleri)", url: "https://docs.python.org/3/library/stdtypes.html" },
      { title: "Python Institute: PCEP sertifikası (güncel müfredat burada)", url: "https://pythoninstitute.org/pcep" }
    ]
  };

  /* 13 ───────────────────────────────────────────── Basit algoritmalar */
  L[13] = {
    hook: "Algoritma, bir işi adım adım çözen kesin tariftir. Faktöriyel, asal sayı, Collatz ve kabarcık sıralama küçük ama her biri döngü, koşul ve sınır dikkati ister.",
    homework: "Önce faktoriyel(n) işlevini yaz ve 0, 1, 5 için dene. Sonra 1 ile 30 arasındaki asal sayıları bir listeye topla. Collatz adım sayısını 7 ve 27 için bul. Son olarak kabarcık sıralamayı [5, 1, 4, 2] listesi üzerinde elle izle: her turdan sonra listeyi kâğıda yaz, sonra kodunla karşılaştır.",
    warmup: {
      recap: [
        { point: "Döngüleri (for, while), koşulları ve fonksiyonları önceki derslerde gördün; algoritmalar bunları bir araya getirir.", example: "for i in range(2, n + 1)" }
      ],
      concepts: [
        { term: "Algoritma (algorithm)", tr: "Adım adım çözüm tarifi", summary: "Girdiyi alır, belirli adımlardan geçer, sonunda sonlanır ve bir sonuç verir.", example: "faktöriyel, sıralama" },
        { term: "Takas (swap)", tr: "İki değeri yer değiştirmek", summary: "Python'da a, b = b, a satırı geçici değişken olmadan takas yapar.", example: "a, b = b, a" },
        { term: "Sınır durumu", tr: "Uç değerlerde davranış", summary: "Algoritmalar çoğunlukla 0, 1, boş liste gibi uçlarda bozulur; bunları ayrıca düşün.", example: "0! = 1" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Bir arkadaşın sipariş adetlerini küçükten büyüğe dizmeni, bir kodun asal olup olmadığını denetlemeni ya da bir sayı dizisinin kaç adımda bittiğini saymanı ister. Bunlar küçük algoritmalardır ve hepsi sınır durumlarında hata yapmaya açıktır." },
      { t: "h", text: "Faktöriyel" },
      { t: "cmd", lang: "python", text: "def faktoriyel(n):\n    f = 1\n    for i in range(2, n + 1):\n        f *= i\n    return f\n\nprint(faktoriyel(5))   # 120\nprint(faktoriyel(0))   # 1\nprint(faktoriyel(1))   # 1" },
      { t: "steps", h: "Dikkat", items: ["n! = 1 · 2 · ... · n ve 0! = 1 olarak tanımlıdır; f = 1 ile başlamak bu tanıma uyar.","range(2, n + 1) n'yi de içerir; son sınır dahil olmadığı için + 1 gerekir. Eksik yazarsan bir çarpan eksik kalır.","n küçükse döngü hiç dönmez (n = 0 ya da 1) ve f = 1 olarak kalır; doğru sonuç budur."] },
      { t: "h", text: "Asal sayı" },
      { t: "cmd", lang: "python", text: "def asal_mi(n):\n    if n < 2:\n        return False\n    b = 2\n    while b * b <= n:\n        if n % b == 0:\n            return False\n        b += 1\n    return True\n\nasallar = []\nfor n in range(1, 20):\n    if asal_mi(n):\n        asallar.append(n)\nprint(asallar)      # [2, 3, 5, 7, 11, 13, 17, 19]" },
      { t: "steps", h: "Neden √n?", items: ["Bir bileşik sayının çarpanları çiftler halinde gelir (a · b = n); iki çarpanın küçüğü en çok √n olur. Bu yüzden bölenleri b * b <= n olana kadar denemek yeterlidir.","n < 2 olanlar (0, 1 ve negatifler) asal sayılmaz; ilk koşul bunları eler.","Bölen bulunca hemen False döndürülür; hiç bulunamazsa döngüden sonra True döner."] },
      { t: "h", text: "Collatz dizisi" },
      { t: "cmd", lang: "python", text: "def collatz(n):\n    adim = 0\n    while n != 1:\n        if n % 2 == 0:\n            n = n // 2\n        else:\n            n = 3 * n + 1\n        adim += 1\n    return adim\n\nprint(collatz(7))     # 16\nprint(collatz(27))    # 111" },
      { t: "box", h: "Dikkat", text: "Çift sayıyı ikiye böl, tek sayıyı 3 ile çarpıp 1 ekle: dizinin her pozitif tam sayıda 1'e ulaştığı sanılır ama bu henüz kanıtlanmamıştır. Kodun yalnız denediğin sayılar için bittiğini bilmek yeterlidir. n / 2 yazarsan float elde edersin (3.0, 10.0 gibi); tam bölme için n // 2 kullan." },
      { t: "h", text: "Kabarcık sıralama" },
      { t: "cmd", lang: "python", text: "def kabarcik(liste):\n    a = liste[:]                  # özgün listeyi bozma\n    n = len(a)\n    takas = 0\n    for tur in range(n - 1):\n        degisti = False\n        for i in range(n - 1 - tur):\n            if a[i] > a[i + 1]:\n                a[i], a[i + 1] = a[i + 1], a[i]\n                takas += 1\n                degisti = True\n        if not degisti:\n            break                 # hiç takas olmadıysa liste zaten sıralı\n    return a, takas\n\nprint(kabarcik([5, 1, 4, 2]))   # ([1, 2, 4, 5], 4)\nprint(kabarcik([1, 2, 3]))      # ([1, 2, 3], 0)\nprint(sorted([5, 1, 4, 2]))     # [1, 2, 4, 5]" },
      { t: "steps", h: "Nasıl çalışır?", items: ["Her tur komşu çiftleri karşılaştırır, yanlış sıradakini takas eder. Her turun sonunda kalan en büyük eleman yerine oturur (kabarcık gibi sona çıkar).","n elemanlı listede en çok n - 1 tur gerekir; bir turda hiç takas olmazsa liste sıralıdır ve erken durulabilir.","Karşılaştırma sayısı n² ile büyür, yani büyük listelerde yavaştır. Gerçek işte hazır sorted() ya da sort() kullanılır; kabarcık sıralama mantığı öğretir."] },
      { t: "h", text: "Kendin dene" },
      { t: "alan", id: "py-13-sirala" },
      { t: "h", text: "Bozuk kodu bul ve düzelt" },
      { t: "steps", h: "Bozuk → düzeltilmiş", items: ["for i in range(1, n): f *= i ile n! hesaplamak → n çarpana dahil edilmez. range(1, n + 1) yaz.","Asal denemesinde if n % b == 0: return True → bölen bulununca sayı asal olmaz. Bu satırda return False yaz.","a[i] = a[i + 1] ardından a[i + 1] = a[i] → ikinci satır, ilk satırın yazdığı değeri okur ve iki hücre aynı olur. a[i], a[i + 1] = a[i + 1], a[i] yaz.","Collatz'ta n = n / 2 → n float olur ve 3.0, 10.0 gibi değerler çıkar. n = n // 2 yaz."] }
    ],
    objectives: [
      { id: "h1", text: "Faktöriyeli döngüyle hesaplayıp range sınırındaki bir fazla ya da eksik hatasını bulabilirsin." },
      { id: "h2", text: "Asal sayı denemesini yazıp 1, 2 ve bölenli sayılarda sonucunu söyleyebilirsin." },
      { id: "h3", text: "Collatz kuralını uygulayıp adım sayısını ve ara değerleri izleyebilirsin." },
      { id: "h4", text: "Kabarcık sıralamanın tek turunda listenin nasıl değiştiğini yazıp iki değeri takas edebilirsin." }
    ],
    summary: ["Faktöriyel: f = 1 ile başla, range(2, n + 1) ile çarp; 0! = 1.","Asal denemesi: n < 2 asal değildir; bölenleri b * b <= n olana kadar denemek yeter, bölen bulununca False dön.","Collatz: çiftse // 2, tekse 3n + 1; 1'e ulaşana kadar geçen adımı say.","Kabarcık sıralama: komşuları karşılaştırıp yanlış sıradakini takas eder; her tur en büyüğü sona yerleştirir, en çok n - 1 tur gerekir."],
    prereq: [5],
    minutes: 35,
    sonDogrulama: "2026-10-26",
    surum: "2026-10-v1",
    quiz: [
      {
        id: "cc5ba551",
        q: "f = 1\nfor i in range(1, 5):\n    f *= i\nprint(f)\nkodu ne yazdırır?",
        options: ["120", "24", "10", "4"],
        obj: "h1"
      },
      {
        id: "b523eb52",
        q: "n = 4\nf = 1\nwhile n > 1:\n    f *= n\n    n -= 1\nprint(f, n)\nkodu ne yazdırır?",
        options: ["24 0", "120 0", "24 1", "24 4"],
        obj: "h1"
      },
      {
        id: "0dec359a",
        q: "def asal(n):\n    if n < 2:\n        return False\n    for b in range(2, n):\n        if n % b == 0:\n            return False\n    return True\nprint(asal(1), asal(9), asal(13))\nkodu ne yazdırır?",
        options: ["False True True", "True False True", "False False True", "False False False"],
        obj: "h2"
      },
      {
        id: "7c9c7572",
        q: "def asal(n):\n    if n < 2:\n        return False\n    for b in range(2, n):\n        if n % b == 0:\n            return False\n    return True\nasal(2) çağrısı ne döndürür?",
        options: ["True", "False", "None", "Hata verir"],
        obj: "h2"
      },
      {
        id: "557b9c5a",
        q: "n, adim = 6, 0\nwhile n != 1:\n    n = n // 2 if n % 2 == 0 else 3 * n + 1\n    adim += 1\nprint(adim)\nkodu ne yazdırır?",
        options: ["6", "9", "7", "8"],
        obj: "h3"
      },
      {
        id: "1aef9a07",
        q: "n = 5\nwhile n != 1:\n    print(n, end=\" \")\n    n = n // 2 if n % 2 == 0 else 3 * n + 1\nkodu ne yazdırır?",
        options: ["5 16 8 4 2 1", "5 16 8 4 2", "5 8 4 2", "16 8 4 2 1"],
        obj: "h3"
      },
      {
        id: "a74a4a0d",
        q: "a = [4, 2, 3, 1]\nfor i in range(len(a) - 1):\n    if a[i] > a[i + 1]:\n        a[i], a[i + 1] = a[i + 1], a[i]\nprint(a)\nkodu ne yazdırır?",
        options: ["[2, 3, 1, 4]", "[1, 2, 3, 4]", "[2, 4, 3, 1]", "[4, 2, 3, 1]"],
        obj: "h4"
      },
      {
        id: "cbc455e7",
        q: "a, b = 1, 2\na, b = b, a\nprint(a, b)\nkodu ne yazdırır?",
        options: ["1 2", "2 2", "1 1", "2 1"],
        obj: "h4"
      }
    ],
    interview: [
      {
        q: "Neden asal denemesinde yalnız karekökü kadar bölen denemek yeter?",
        a: "Bileşik bir sayının çarpanları çiftler halinde gelir ve bu çiftin küçüğü en çok karekök kadardır. Karekökten küçük bölen yoksa büyük bölen de yoktur."
      },
      {
        q: "Kabarcık sıralama neden gerçek işte pek kullanılmaz?",
        a: "Karşılaştırma sayısı eleman sayısının karesiyle büyür, bu yüzden büyük listelerde yavaştır. Python'da hazır sorted() çok daha hızlıdır; kabarcık sıralama daha çok mantığı öğrenmek için iyidir."
      }
    ],
    vocab: [
      { term: "algorithm", tr: "algoritma", ex: "An algorithm is a step-by-step method." },
      { term: "factorial", tr: "faktöriyel", ex: "The factorial of 5 is 120." },
      { term: "prime number", tr: "asal sayı", ex: "Seven is a prime number." },
      { term: "to swap", tr: "takas etmek", ex: "Swap the two values." },
      { term: "bubble sort", tr: "kabarcık sıralama", ex: "Bubble sort compares neighbouring items." }
    ],
    sources: [
      { title: "Python Tutorial: Denetim akışı (if, for, range, def)", url: "https://docs.python.org/3/tutorial/controlflow.html" },
      { title: "Python Tutorial: Veri yapıları (liste, demet, küme, sözlük)", url: "https://docs.python.org/3/tutorial/datastructures.html" },
      { title: "Python Institute: PCEP sertifikası (güncel müfredat burada)", url: "https://pythoninstitute.org/pcep" }
    ]
  };

  /* 14 ───────────────────────────────────────────── İç içe listeler ve liste kavrayışı */
  L[14] = {
    hook: "Gerçek veri çoğunlukla bir tablodur: satırlar ve sütunlar. Python'da bunu liste içinde liste olarak tutarsın; liste kavrayışı ise o tabloyu tek satırda süzer ve dönüştürür.",
    homework: "Üç ürünün adı ve adedini [[\"kalem\", 12], [\"defter\", 4], [\"silgi\", 30]] gibi iç içe bir listede tut. İç içe for ile her satırı yazdır. Sonra kavrayışla yalnız adedi 10 ve üzeri olanların adlarını bir listeye al. Son olarak [[0] * 3] * 2 ile bir satırı değiştir, sonucu gör ve [[0] * 3 for _ in range(2)] ile karşılaştır.",
    warmup: {
      recap: [
        { point: "Listeyi, sıra numaralarını (indeks) ve for döngüsünü bildiğini varsayıyoruz; burada listenin içine liste koyacaksın.", example: "liste[0]" }
      ],
      concepts: [
        { term: "İç içe liste (nested list)", tr: "Liste içinde liste", summary: "tablo[i][j] önce i. satırı, sonra onun j. elemanını seçer.", example: "tablo[1][0]" },
        { term: "Liste kavrayışı (list comprehension)", tr: "Tek satırda yeni liste üretmek", summary: "[ifade for ad in dizi if koşul] kalıbıyla bir diziden yeni liste kurarsın.", example: "[x * 2 for x in [1, 2]]" },
        { term: "Aynı nesne (alias)", tr: "İki adın tek listeyi göstermesi", summary: "[[0] * 3] * 2 aynı iç listeyi iki kez koyar; birini değiştirince diğeri de değişir.", example: "a is b" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Sipariş listesi bir tablodur: her satır bir ürün, her sütun bir özellik. Tabloyu dolaşmak, bir sütunu çekmek ve süzmek her gün yaptığın iştir. İç içe liste ve kavrayış bunun Python'daki karşılığıdır." },
      { t: "h", text: "İç içe listeler" },
      { t: "cmd", lang: "python", text: "tablo = [[\"kalem\", 12], [\"defter\", 4], [\"silgi\", 30]]\nprint(tablo[1])            # ['defter', 4]\nprint(tablo[1][0])         # defter\nprint(len(tablo), len(tablo[0]))   # 3 2\ntablo[2][1] = 25\nprint(tablo[2])            # ['silgi', 25]\nprint(tablo[-1][-1])       # 25" },
      { t: "h", text: "Tüm elemanları dolaşmak" },
      { t: "cmd", lang: "python", text: "tablo = [[\"kalem\", 12], [\"defter\", 4], [\"silgi\", 25]]\ntoplam = 0\nfor satir in tablo:\n    toplam += satir[1]\nprint(toplam)             # 41\n\nkare = [[7, 8], [9, 10]]\nfor i in range(len(kare)):\n    for j in range(len(kare[i])):\n        print(i, j, kare[i][j])\n# 0 0 7\n# 0 1 8\n# 1 0 9\n# 1 1 10" },
      { t: "steps", h: "Kurallar", items: ["Dıştaki döngü satırları, içteki döngü o satırın elemanlarını dolaşır.","tablo[i][j]: önce satır, sonra satırın içinde sütun. Satır sayısı len(tablo), sütun sayısı len(tablo[0]) olur.","Var olmayan sıra numarası (örneğin iki satırlı tabloda tablo[2]) IndexError verir."] },
      { t: "h", text: "Liste kavrayışı" },
      { t: "cmd", lang: "python", text: "adetler = [12, 4, 30, 6, 5]\nkatlar = [a * 2 for a in adetler]\nprint(katlar)                       # [24, 8, 60, 12, 10]\nbuyuk = [a for a in adetler if a >= 6]\nprint(buyuk)                        # [12, 30, 6]\netiket = [\"toptan\" if a >= 10 else \"az\" for a in adetler]\nprint(etiket)                       # ['toptan', 'az', 'toptan', 'az', 'az']\nprint([(a, a * a) for a in range(1, 4)])   # [(1, 1), (2, 4), (3, 9)]\nprint(adetler)                      # [12, 4, 30, 6, 5]  (özgün liste değişmez)" },
      { t: "steps", h: "Kalıp", items: ["Genel kalıp: [ifade for ad in dizi]. Sonuna if koşul eklersen yalnız koşulu sağlayan elemanlar alınır (süzme).","if ve else birlikte kullanılacaksa koşullu ifade for'dan önce yazılır: [x if koşul else y for ...]. else, sondaki süzgeçte olamaz.","Kavrayış yeni bir liste kurar, özgün diziye dokunmaz. Kavrayışın değişkeni Python 3'te dışarı sızmaz."] },
      { t: "cmd", lang: "python", text: "m = [[1, 2], [3, 4], [5, 6]]\nprint([x for satir in m for x in satir])          # [1, 2, 3, 4, 5, 6]  (düzleştirme)\nprint([[x * 10 for x in satir] for satir in m])   # [[10, 20], [30, 40], [50, 60]]\nprint([satir[0] for satir in m])                  # [1, 3, 5]  (ilk sütun)" },
      { t: "p", text: "Düzleştirmede iki for yazıldığı sırayla iç içedir: önce dıştaki (satir), sonra içteki (x) döner." },
      { t: "h", text: "Satır kopyası tuzağı" },
      { t: "cmd", lang: "python", text: "yanlis = [[0] * 3] * 2\nyanlis[0][0] = 9\nprint(yanlis)                   # [[9, 0, 0], [9, 0, 0]]\ndogru = [[0] * 3 for _ in range(2)]\ndogru[0][0] = 9\nprint(dogru)                    # [[9, 0, 0], [0, 0, 0]]\nprint(yanlis[0] is yanlis[1], dogru[0] is dogru[1])   # True False" },
      { t: "box", h: "Dikkat", text: "[0] * 3 ifadesi üç sayılı yeni bir liste üretir; dıştaki * 2 ise yeni liste üretmez, aynı iç listeyi iki kez koyar. Bağımsız satırlar için her satırı kavrayışla ayrı ayrı üret." },
      { t: "h", text: "Kendin dene" },
      { t: "alan", id: "py-14-tablo" },
      { t: "h", text: "Bozuk kodu bul ve düzelt" },
      { t: "steps", h: "Bozuk → düzeltilmiş", items: ["[x * 2 for x in liste if x > 3 else 0] → SyntaxError (else süzgeçte olmaz). [x * 2 if x > 3 else 0 for x in liste] yaz.","satirlar = [[0] * 3] * 4 ve bir hücreyi değiştirmek → dört satır birlikte değişir. [[0] * 3 for _ in range(4)] yaz.","İki satırlı bir m listesinde m[2][0] → IndexError (satır numaraları 0 ve 1). m[1][0] yaz.","kare = [x * x for x in range(1, 5)] ardından print(x) → NameError; kavrayışın değişkeni (x) dışarıda tanımlı değildir. Sonucu tutan listeyi yazdır: print(kare)."] }
    ],
    objectives: [
      { id: "h1", text: "İç içe listede tablo[i][j] ile eleman seçip satır ve sütun sayısını bulabilirsin." },
      { id: "h2", text: "İç içe for döngüsüyle tablonun elemanlarını dolaşıp toplam ya da köşegen gibi bir sonucu hesaplayabilirsin." },
      { id: "h3", text: "Koşullu liste kavrayışının ürettiği listeyi ve eleman sayısını söyleyebilirsin." },
      { id: "h4", text: "[[0] * n] * m tuzağını açıklayıp bağımsız satırlar üreten doğru ifadeyi yazabilirsin." }
    ],
    summary: ["İç içe liste tablo gibidir: tablo[i][j] önce satırı, sonra satırdaki elemanı seçer.","Tabloyu iç içe for ile dolaşırsın; dıştaki döngü satırları, içteki elemanları gezer.","Liste kavrayışı [ifade for ad in dizi if koşul] yeni bir liste kurar; if-else koşullu ifadesi for'dan önce yazılır.","[[0] * 3] * 2 aynı iç listeyi çoğaltır; bağımsız satırlar için [[0] * 3 for _ in range(2)] yaz."],
    prereq: [6],
    minutes: 30,
    sonDogrulama: "2026-10-26",
    surum: "2026-10-v1",
    quiz: [
      {
        id: "3184e23b",
        q: "m = [[1, 2, 3], [4, 5, 6]]\nprint(m[1][2])\nkodu ne yazdırır?",
        options: ["3", "6", "4", "Hata verir"],
        obj: "h1"
      },
      {
        id: "b8ce574b",
        q: "m = [[1, 2, 3], [4, 5, 6]]\nprint(len(m), len(m[0]))\nkodu ne yazdırır?",
        options: ["3 2", "6 6", "2 3", "2 2"],
        obj: "h1"
      },
      {
        id: "0117e022",
        q: "m = [[1, 2, 3], [4, 5, 6]]\nt = 0\nfor satir in m:\n    for x in satir:\n        if x % 2 == 0:\n            t += x\nprint(t)\nkodu ne yazdırır?",
        options: ["21", "6", "12", "9"],
        obj: "h2"
      },
      {
        id: "e01c447b",
        q: "n = [[1, 2], [3, 4]]\nd = 0\nfor i in range(2):\n    d += n[i][i]\nprint(d)\nkodu ne yazdırır?",
        options: ["5", "4", "10", "7"],
        obj: "h2"
      },
      {
        id: "d6eb4923",
        q: "print([x * x for x in range(1, 5) if x % 2 == 1])\nkodu ne yazdırır?",
        options: ["[1, 4, 9, 16]", "[1, 3]", "[4, 16]", "[1, 9]"],
        obj: "h3"
      },
      {
        id: "d27cece8",
        q: "print(len([i for i in range(2, 7)]))\nkodu ne yazdırır?",
        options: ["6", "5", "4", "7"],
        obj: "h3"
      },
      {
        id: "3b12945f",
        q: "s = [[0] * 2] * 2\ns[0][0] = 1\nprint(s)\nkodu ne yazdırır?",
        options: ["[[1, 0], [1, 0]]", "[[1, 0], [0, 0]]", "[[0, 0], [1, 0]]", "[[1, 1], [1, 1]]"],
        obj: "h4"
      },
      {
        id: "7f21ad4f",
        q: "Hangisi her satırı ayrı bir liste olarak üretir (satırlar birbirinden bağımsızdır)?",
        options: ["[[0] * 3] * 2", "[[0, 0, 0]] * 2", "[0 * 3 for i in range(2)]", "[[0] * 3 for i in range(2)]"],
        obj: "h4"
      }
    ],
    interview: [
      {
        q: "Liste kavrayışı ne zaman for döngüsünden daha uygundur?",
        a: "Bir diziden yeni bir liste üretirken (dönüştürme ya da süzme) tek satırda ve okunur biçimde yazılabildiğinde. Karmaşık, birden çok adımlı işlerde açık bir for döngüsü daha okunurdur."
      },
      {
        q: "[[0] * 3] * 2 neden tehlikelidir?",
        a: "Dıştaki * 2 yeni liste üretmez, aynı iç listeyi iki kez koyar. Bir satırı değiştirince diğeri de değişir. Bağımsız satırlar için her satırı kavrayışla ayrı ayrı üretirim."
      }
    ],
    vocab: [
      { term: "nested list", tr: "iç içe liste", ex: "A nested list can store a table." },
      { term: "list comprehension", tr: "liste kavrayışı", ex: "A list comprehension builds a new list." },
      { term: "row", tr: "satır", ex: "Each row holds one order." },
      { term: "column", tr: "sütun", ex: "The second column holds the quantity." },
      { term: "to flatten", tr: "düzleştirmek", ex: "Flatten the table into one list." }
    ],
    sources: [
      { title: "Python Tutorial: Veri yapıları (liste, demet, küme, sözlük)", url: "https://docs.python.org/3/tutorial/datastructures.html" },
      { title: "Python Tutorial: Denetim akışı (if, for, range, def)", url: "https://docs.python.org/3/tutorial/controlflow.html" },
      { title: "Python Institute: PCEP sertifikası (güncel müfredat burada)", url: "https://pythoninstitute.org/pcep" }
    ]
  };

  /* 15 ───────────────────────────────────────────── Özyineleme ve üreteçler */
  L[15] = {
    hook: "Özyinelemede işlev kendini daha küçük bir sorunla çağırır; üreteçte değerler ancak istendikçe üretilir. İkisi de \"bir seferde hepsini yap\" yerine \"bir adım ve devamı\" düşünmeyi öğretir.",
    homework: "geri_say(n) işlevini özyinelemeli yaz: n 0 olunca \"bitti\" yazsın. Sonra us(a, b) ile a üzeri b hesapla (taban durumunu unutma). Ardından 1'den son'a kadar sayıları veren bir üreteç yaz ve next ile üç kez çağır. Son olarak sonsuz bir özyinelemeyi bilerek çalıştır ve RecursionError mesajını oku.",
    warmup: {
      recap: [
        { point: "Fonksiyon yazmayı, return'ü ve for döngüsünü biliyorsun; burada işlev kendini çağıracak ve yield ile durup devam edecek.", example: "def f(n): return n" }
      ],
      concepts: [
        { term: "Özyineleme (recursion)", tr: "İşlevin kendini çağırması", summary: "İki parçası vardır: durma noktası (taban durumu) ve problemi küçülterek kendini çağıran adım.", example: "topla(n - 1)" },
        { term: "Taban durumu (base case)", tr: "Özyinelemenin durduğu yer", summary: "Bu yoksa işlev sonsuza kadar kendini çağırır ve RecursionError oluşur.", example: "if n == 0: return 0" },
        { term: "Üreteç (generator)", tr: "Değerleri sırayla üreten işlev", summary: "yield değeri verip işlevi duraklatır; next ile kaldığı yerden devam eder.", example: "next(g)" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "İç içe klasörlerdeki dosyaları saymak ya da bir ağaç yapısını gezmek, doğası gereği \"kendini tekrarlayan\" bir iştir. Milyonlarca satırlık bir dosyayı ise tek seferde belleğe almadan parça parça işlemek gerekir. Birincisi özyineleme, ikincisi üreteç işidir." },
      { t: "h", text: "Özyineleme: taban durumu ve adım" },
      { t: "cmd", lang: "python", text: "def geri_say(n):\n    if n == 0:             # taban durumu\n        print(\"bitti\")\n        return\n    print(n)\n    geri_say(n - 1)        # problemi küçülterek kendini çağır\n\ngeri_say(3)\n# 3\n# 2\n# 1\n# bitti\n\ndef us(a, b):              # a üzeri b, b >= 0\n    if b == 0:\n        return 1\n    return a * us(a, b - 1)\n\nprint(us(2, 5))            # 32" },
      { t: "steps", h: "Kurallar", items: ["Her özyinelemeli işlevde en az bir taban durumu (yanıtı doğrudan veren dal) ve problemi küçülten bir özyinelemeli adım bulunur.","Her çağrı çağrı yığınında yer tutar; çağrılar dönerken değerler ters sırayla birleşir.","Küçülme taban durumuna doğru gitmelidir. us(a, b + 1) yazarsan taban durumuna hiç ulaşılmaz."] },
      { t: "cmd", lang: "python", text: "def faktoriyel(n):\n    return 1 if n <= 1 else n * faktoriyel(n - 1)\n\nprint(faktoriyel(6))       # 720\n\nimport sys\nprint(sys.getrecursionlimit())   # 1000 (varsayılan; sistemde değişebilir)\n\ndef sonsuz(n):\n    return sonsuz(n + 1)\n\ntry:\n    sonsuz(0)\nexcept RecursionError:\n    print(\"derinlik sınırı aşıldı\")   # derinlik sınırı aşıldı" },
      { t: "steps", h: "Özyineleme mi döngü mü?", items: ["Her özyineleme bir döngüyle de yazılabilir. Ağaç ya da iç içe yapı gibi doğası özyinelemeli işlerde özyineleme daha okunurdur.","CPython kuyruk çağrılarını eniyilemez ve derinlik sınırı vardır; çok derin giden hesaplarda döngü daha güvenlidir.","fib(n - 1) + fib(n - 2) gibi iki dallı özyineleme aynı alt problemleri tekrar tekrar hesaplar ve n büyüdükçe çok yavaşlar."] },
      { t: "h", text: "Üreteçler ve yield" },
      { t: "cmd", lang: "python", text: "def sayac(son):\n    i = 1\n    while i <= son:\n        yield i\n        i += 1\n\ng = sayac(3)\nprint(next(g))      # 1\nprint(next(g))      # 2\nprint(list(g))      # [3]   (kalan değerler)\n\nfor x in sayac(2):\n    print(\"tur\", x)\n# tur 1\n# tur 2" },
      { t: "steps", h: "Nasıl çalışır?", items: ["İçinde yield bulunan işlev çağrılınca kodu çalıştırmaz, bir üreteç nesnesi döndürür.","next(g) işlevi bir sonraki yield'e kadar çalıştırır, değeri verir ve orada duraklar; yerel değişkenler korunur.","Üreteç tükenince next StopIteration fırlatır; for döngüsü bunu kendisi yakalar. Üreteç tek kullanımlıktır, baştan gezmek için yeniden oluşturulur."] },
      { t: "cmd", lang: "python", text: "kareler = (x * x for x in range(1, 6))   # üreteç ifadesi (parantezli)\nprint(sum(kareler))      # 55\nprint(sum(kareler))      # 0   (tükendi)" },
      { t: "box", h: "Dikkat", text: "Köşeli parantezli kavrayış bütün listeyi bellekte kurar, parantezli üreteç ifadesi ise değerleri istendikçe üretir. Çok büyük diziyi bir kez gezeceksen üreteç belleği korur. Üretecin uzunluğunu len ile alamazsın; gerekirse önce list() ile listeye çevirirsin." },
      { t: "h", text: "Kendin dene" },
      { t: "alan", id: "py-15-ozyin" },
      { t: "h", text: "Bozuk kodu bul ve düzelt" },
      { t: "steps", h: "Bozuk → düzeltilmiş", items: ["def topla(n): return n + topla(n - 1) → taban durumu yok, RecursionError. if n == 0: return 0 satırını ekle.","def sayac(): for i in range(3): return i → ilk değerde işlev biter ve üreteç olmaz. return yerine yield i yaz.","g = (x for x in range(3)); print(list(g)); print(list(g)) → ikinci list boş çıkar, üreteç tükendi. Yeniden kullanacaksan üreteci yeniden oluştur ya da sonucu listeye al.","print(len(g)) → TypeError, üretecin uzunluğu yoktur. len(list(g)) yaz (üreteç bu çağrıda tükenir)."] }
    ],
    objectives: [
      { id: "h1", text: "Özyinelemeli bir işlevde taban durumunu ve adımı tanıyıp çağrının sonucunu söyleyebilirsin." },
      { id: "h2", text: "Çağrı ve dönüş sırasına bakarak özyinelemeli işlevin çıktısını izleyebilirsin." },
      { id: "h3", text: "yield içeren işlevde her next çağrısının hangi değeri verdiğini ve tükenince ne olduğunu söyleyebilirsin." },
      { id: "h4", text: "Üretecin tek kullanımlık olduğunu ve belleği nasıl koruduğunu açıklayabilirsin." }
    ],
    summary: ["Özyinelemeli işlevin bir taban durumu ve problemi küçülten bir adımı olur; taban yoksa RecursionError oluşur.","Çağrılar yığında birikir ve ters sırayla döner; ilk print'ler iniş, ikinci print'ler dönüş sırasıyla çalışır.","yield içeren işlev üreteç döndürür; next her seferinde bir sonraki yield'e kadar çalışır, tükenince StopIteration fırlatır.","Üreteç tek kullanımlıktır ve değerleri istendikçe ürettiği için büyük dizilerde belleği korur."],
    prereq: [8],
    minutes: 35,
    sonDogrulama: "2026-10-26",
    surum: "2026-10-v1",
    quiz: [
      {
        id: "30bb27b1",
        q: "def topla(n):\n    if n == 0:\n        return 0\n    return n + topla(n - 1)\nprint(topla(4))\nkodu ne yazdırır?",
        options: ["24", "10", "4", "Hata verir"],
        obj: "h1"
      },
      {
        id: "f883a14b",
        q: "def say(n):\n    return say(n - 1)\nsay(3) çağrılırsa ne olur?",
        options: ["0 döndürür", "None döndürür", "RecursionError verir (taban durumu yok)", "Sonsuza dek sessizce çalışır"],
        obj: "h1"
      },
      {
        id: "b4099150",
        q: "def f(n):\n    if n == 0:\n        return\n    print(n, end=\" \")\n    f(n - 1)\n    print(n, end=\" \")\nf(2)\nkodu ne yazdırır?",
        options: ["2 1 2 1", "1 2 2 1", "2 1 1 2", "2 2 1 1"],
        obj: "h2"
      },
      {
        id: "b0fb8420",
        q: "def fib(n):\n    if n < 2:\n        return n\n    return fib(n - 1) + fib(n - 2)\nprint(fib(6))\nkodu ne yazdırır?",
        options: ["8", "13", "6", "5"],
        obj: "h2"
      },
      {
        id: "59dd12d5",
        q: "def say():\n    yield 1\n    yield 2\ng = say()\nprint(next(g), next(g))\nkodu ne yazdırır?",
        options: ["[1, 2]", "1 1", "Bir üreteç nesnesi yazar", "1 2"],
        obj: "h3"
      },
      {
        id: "2ee62629",
        q: "def say():\n    yield 1\ng = say()\nnext(g)\nnext(g)\nkodu çalıştırılınca ne olur?",
        options: ["1 yazdırır", "StopIteration hatası verir", "None döndürür", "Sonsuz döngüye girer"],
        obj: "h3"
      },
      {
        id: "3a605be5",
        q: "g = (x for x in range(2))\nprint(list(g))\nprint(list(g))\nkodu ne yazdırır?",
        options: ["[0, 1] ve ardından []", "[0, 1] iki kez", "Hata verir", "[] ve ardından [0, 1]"],
        obj: "h4"
      },
      {
        id: "8b6fe9fe",
        q: "Çok büyük bir diziyi tek tek işlerken belleği az kullanmak için ne yaparsın?",
        options: ["Her zaman liste kavrayışı kullanırım", "Özyinelemeli bir işlev yazarım", "Diziyi global değişkende tutarım", "Liste yerine üreteç kullanırım (yield ya da parantezli kavrayış)"],
        obj: "h4"
      }
    ],
    interview: [
      {
        q: "Taban durumu neden gereklidir?",
        a: "Özyinelemeli işlev kendini çağırmayı bırakacağı bir yer bulamazsa sonsuza kadar çağırır; Python derinlik sınırını aşınca RecursionError verir. Taban durumu hesabı doğrudan yanıtlayan ve zinciri bitiren daldır."
      },
      {
        q: "Üreteç ile liste arasındaki fark nedir?",
        a: "Liste bütün öğeleri bellekte tutar ve istediğin kadar gezilebilir. Üreteç değerleri istendikçe üretir, belleği az kullanır ama tek kullanımlıktır ve tükenince boş kalır."
      }
    ],
    vocab: [
      { term: "recursion", tr: "özyineleme", ex: "Recursion means a function calls itself." },
      { term: "base case", tr: "taban durumu", ex: "Every recursion needs a base case." },
      { term: "generator", tr: "üreteç", ex: "A generator produces values one at a time." },
      { term: "to yield", tr: "üreterek vermek", ex: "The function yields one value per step." },
      { term: "call stack", tr: "çağrı yığını", ex: "Each call adds a frame to the call stack." }
    ],
    sources: [
      { title: "Python Tutorial: Denetim akışı (if, for, range, def)", url: "https://docs.python.org/3/tutorial/controlflow.html" },
      { title: "Python Tutorial: Sınıflar (üreteçler ve üreteç ifadeleri)", url: "https://docs.python.org/3/tutorial/classes.html" },
      { title: "Python Institute: PCEP sertifikası (güncel müfredat burada)", url: "https://pythoninstitute.org/pcep" }
    ]
  };

  /* 16 ───────────────────────────────────────────── Test ve hata ayıklama */
  L[16] = {
    hook: "Programın yanlış sonuç verdiği gün hangi satırın sorumlu olduğunu tahminle değil yöntemle bulursun: hatayı yeniden üret, değerleri izle, düzelt, tekrar sına.",
    homework: "ortalama(liste) adlı bir işlev yaz ve ilk elemanı yanlışlıkla atla (range(1, len(liste))). print ile toplam ve eleman sayısını izleyerek hatayı bul, düzelt. Sonra üç assert yaz: tipik bir liste, tek elemanlı liste ve boş liste için ne olması gerektiğine karar ver. Boş listede ZeroDivisionError alırsan, işlevi bu durumu işleyecek biçimde değiştir.",
    warmup: {
      recap: [
        { point: "Önceki derslerde hata mesajlarını (SyntaxError, TypeError, ZeroDivisionError) tanıdın; şimdi bunlardan hatanın yerini bulacaksın.", example: "ZeroDivisionError: division by zero" }
      ],
      concepts: [
        { term: "Hata ayıklama (debugging)", tr: "Hatanın nedenini bulup gidermek", summary: "Hatayı yeniden üretir, değerleri izler, varsayımla gerçeği karşılaştırır ve düzeltirsin.", example: "print ile ara değer yazmak" },
        { term: "Geri izleme (traceback)", tr: "Hata mesajının çağrı izi", summary: "Son satır hata türünü ve nedenini, üstündeki satırlar hatanın dosyada nerede oluştuğunu söyler.", example: "ZeroDivisionError" },
        { term: "assert", tr: "Koşulu sınayan deyim", summary: "assert koşul, mesaj; koşul yanlışsa AssertionError fırlatır.", example: "assert tutar(2, 5) == 10" }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      { t: "box", h: "Gerçek talep", text: "Fiş toplamı bir gün yanlış çıkıyor. Kodu baştan yazmak yerine hangi satırın değeri bozduğunu bulman gerekir. Küçük bir test, hatayı hem bulur hem de aynı hatanın geri dönmesini engeller." },
      { t: "h", text: "Hata mesajını okumak" },
      { t: "cmd", lang: "python", calistirma: "atla etkileşimli kabuk dökümüdür; >>> işaretleri dosyaya yazılmaz, kendi bilgisayarında yaz ve dene", text: "Traceback (most recent call last):\n  File \"fis.py\", line 6, in <module>\n    print(toplam / adet)\nZeroDivisionError: division by zero" },
      { t: "steps", h: "Aşağıdan yukarı oku", items: ["Son satır hata türünü ve nedenini verir: ZeroDivisionError: division by zero.","Üstündeki File satırı dosyayı ve satır numarasını, altındaki girintili satır o satırın kodunu gösterir.","Hata birden çok işlevin içinden geldiyse File satırları çağrı zincirini listeler; en alttaki File satırı hatanın oluştuğu yerdir."] },
      { t: "h", text: "print ile izleme" },
      { t: "cmd", lang: "python", text: "def ortalama(liste):\n    toplam = 0\n    for x in liste:\n        toplam += x\n    print(\"DEBUG toplam:\", toplam, \"adet:\", len(liste))\n    return toplam / len(liste)\n\nprint(ortalama([10, 20, 30]))\n# DEBUG toplam: 60 adet: 3\n# 20.0" },
      { t: "steps", h: "Yöntem", items: ["Önce hatayı kesin yeniden üret ve girdiyi küçült: en küçük bozuk örnek, sorunun nerede olduğunu gösterir.","Şüpheli yerde değişkenleri yazdır ve beklediğinle gördüğünü karşılaştır; ikisinin ayrıldığı yer hatanın başladığı yerdir.","Düzelttikten sonra aynı girdiyle yeniden dene ve DEBUG yazdırmalarını sil."] },
      { t: "h", text: "assert ile küçük testler" },
      { t: "cmd", lang: "python", text: "def tutar(adet, fiyat):\n    return adet * fiyat\n\nassert tutar(2, 5) == 10\nassert tutar(0, 5) == 0, \"adet 0 ise tutar 0 olmalı\"\nassert tutar(3, 1.5) == 4.5\nprint(\"testler geçti\")        # testler geçti\n\ntry:\n    assert tutar(2, 5) == 11, \"beklenen 11 ama 10 çıkar\"\nexcept AssertionError as e:\n    print(\"test başarısız:\", e)   # test başarısız: beklenen 11 ama 10 çıkar" },
      { t: "steps", h: "Test yazarken", items: ["Beklenen değeri önce kendin elle hesapla, sonra yaz. Kodun çıktısını beklenen diye kopyalarsan hata da kopyalanmış olur.","Tipik değerlerin yanında sınırları da dene: boş liste, tek eleman, sıfır, negatif sayı.","assert geliştirme sırasında kendi varsayımlarını sınamak içindir. python -O ile çalışırken assert satırları atlanır; kullanıcı girdisini doğrulamak için if ve raise kullan."] },
      { t: "box", h: "Dikkat", text: "Testlerin çoğalınca unittest gibi bir test çerçevesine geçersin; bu ders onun mantığını (beklenen ile gerçeği karşılaştırmak) küçük ölçekte gösterir. Python'un hata ayıklayıcısı pdb ile kodu satır satır da izleyebilirsin." },
      { t: "h", text: "Kendin dene" },
      { t: "alan", id: "py-16-ortalama" },
      { t: "h", text: "Bozuk kodu bul ve düzelt" },
      { t: "steps", h: "Bozuk → düzeltilmiş", items: ["ortalama([]) → ZeroDivisionError, çünkü boş listede len 0 olur. İşlevin başında if not liste: return 0 gibi bir karar ekle.","assert (tutar(2, 5) == 11, \"mesaj\") → parantez bir demet yapar ve demet her zaman doğrudur; test hiç başarısız olmaz. assert tutar(2, 5) == 11, \"mesaj\" yaz.","def topla(a, b): print(a + b) ardından assert topla(1, 2) == 3 → işlev None döndürür, test AssertionError verir. print yerine return a + b yaz.","toplm += 1 → NameError; ad yanlış yazılmış. Hata mesajındaki adı kodla karşılaştır ve toplam += 1 yaz."] }
    ],
    objectives: [
      { id: "h1", text: "Hata ayıklamanın ne olduğunu ve NameError gibi bir hata mesajının hangi durumda oluştuğunu söyleyebilirsin." },
      { id: "h2", text: "print ile ara değerleri izleyip döngünün son satırını bulabilir ve ilk ayıklama adımını seçebilirsin." },
      { id: "h3", text: "assert ifadesinin yanlış koşulda ne yaptığını ve doğrulama için neden yeterli olmadığını açıklayabilirsin." },
      { id: "h4", text: "Geri izlemenin hangi satırının hata türünü verdiğini ve iyi bir test girdisi seçimini söyleyebilirsin." }
    ],
    summary: ["Hata ayıklamada hatayı yeniden üretir, değerleri izler, varsayımla gerçeği karşılaştırır ve düzeltirsin.","Geri izlemeyi aşağıdan yukarı oku: son satır hata türünü ve nedenini, File satırları yeri gösterir.","assert koşul, mesaj yanlış koşulda AssertionError fırlatır; python -O ile atlandığı için girdi doğrulamasında kullanılmaz.","İyi test: beklenen değeri elle hesapla, tipik değerlerin yanında boş girdi, tek eleman ve sıfır gibi sınırları da dene."],
    prereq: [9],
    minutes: 25,
    sonDogrulama: "2026-10-26",
    surum: "2026-10-v1",
    quiz: [
      {
        id: "628e477e",
        q: "Hata ayıklama (debugging) ne demektir?",
        options: ["Programı daha hızlı çalıştırmak", "Programdaki hatanın nedenini bulup gidermek", "Kodu başka bir dile çevirmek", "Programa yeni özellik eklemek"],
        obj: "h1"
      },
      {
        id: "7d55bf9d",
        q: "NameError: name 'toplm' is not defined mesajı hangi durumda oluşur?",
        options: ["Sıfıra bölündüğünde", "Girinti hatalı olduğunda", "Hiç tanımlanmamış bir ad okunduğunda", "Tür dönüşümü başarısız olduğunda"],
        obj: "h1"
      },
      {
        id: "f66c10ab",
        q: "t = 0\nfor i in range(3):\n    t += i\n    print(\"i\", i, \"t\", t)\nDöngü bitince ekranın son satırı ne olur?",
        options: ["i 3 t 6", "i 2 t 2", "i 2 t 3", "i 2 t 6"],
        obj: "h2"
      },
      {
        id: "a813b72f",
        q: "Hata bir işlevin içinde ama nerede olduğunu bilmiyorsun. print ile ayıklamada en mantıklı ilk adım hangisidir?",
        options: ["İşlevin girişinde ve çıkışında değişkenleri yazdırıp beklenen değerlerle karşılaştırmak", "Kodu baştan yazmak", "Tüm satırları yoruma almak", "Hata mesajını yok sayıp devam etmek"],
        obj: "h2"
      },
      {
        id: "a1095e67",
        q: "assert 2 + 2 == 5, \"bozuk\"\nprint(\"devam\")\nkodu çalıştırılınca ne olur?",
        options: ["devam yazdırır", "bozuk yazar, sonra devam yazar", "Hata vermez, uyarı yazar", "AssertionError verir, devam yazılmaz"],
        obj: "h3"
      },
      {
        id: "26d0c8d9",
        q: "Kullanıcıdan gelen veriyi doğrulamak için assert yeterli midir?",
        options: ["Evet, assert her zaman çalışır", "Hayır: python -O ile çalıştırılınca assert satırları atlanır", "Evet, assert girdiyi de düzeltir", "Hayır, assert yalnız döngülerde çalışır"],
        obj: "h3"
      },
      {
        id: "8e140d04",
        q: "Traceback (most recent call last):\n  File \"a.py\", line 4, in <module>\n    print(10 / x)\nZeroDivisionError: division by zero\nHata türü ve nedeni mesajın neresinde yazar?",
        options: ["Son satırda", "İlk satırda (Traceback)", "File satırında", "Mesajda yazmaz"],
        obj: "h4"
      },
      {
        id: "aa912a29",
        q: "Bir işlevi test ederken hangisi iyi bir girdi seçimidir?",
        options: ["Yalnız işlevin zaten doğru çalıştığını bildiğin bir girdi", "Rastgele seçilen tek bir girdi", "Hiç girdi vermemek", "Tipik değerlere ek olarak boş liste ve tek eleman gibi sınır durumları"],
        obj: "h4"
      }
    ],
    interview: [
      {
        q: "Bir hatayı nasıl ayıklarsın?",
        a: "Önce hatayı kesin yeniden üretirim ve girdiyi küçültürüm. Sonra şüpheli yerde değişkenleri yazdırıp beklediğimle karşılaştırırım; ayrıldığı yer hatanın başladığı yerdir. Düzeltince aynı girdiyle yeniden dener ve bir test bırakırım."
      },
      {
        q: "assert ile if ve raise arasındaki fark nedir?",
        a: "assert geliştirme sırasında kendi varsayımlarımı sınar ve python -O ile çalışınca atlanır. Kullanıcı girdisi gibi dışarıdan gelen veriyi her durumda doğrulamak için if ve raise kullanırım."
      }
    ],
    vocab: [
      { term: "bug", tr: "yazılım hatası", ex: "The bug appears only with an empty list." },
      { term: "to debug", tr: "hata ayıklamak", ex: "Print the values to debug the loop." },
      { term: "traceback", tr: "hata izi", ex: "Read the traceback from the bottom up." },
      { term: "assertion", tr: "doğrulama deyimi", ex: "The assertion failed with a message." },
      { term: "edge case", tr: "sınır durumu", ex: "An empty list is a classic edge case." }
    ],
    sources: [
      { title: "Python Tutorial: Hatalar ve istisnalar", url: "https://docs.python.org/3/tutorial/errors.html" },
      { title: "Python Dil Başvurusu: assert deyimi", url: "https://docs.python.org/3/reference/simple_stmts.html#the-assert-statement" },
      { title: "Python belgesi: pdb (Python hata ayıklayıcısı)", url: "https://docs.python.org/3/library/pdb.html" },
      { title: "Python belgesi: unittest (birim test çerçevesi)", url: "https://docs.python.org/3/library/unittest.html" }
    ]
  };
})();

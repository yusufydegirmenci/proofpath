/* Python (PCEP düzeyi) · sabit dersler 9-10 (try/except ile hata yakalama, dize yöntemleri). Kapsam herkese açık PCEP müfredat özetinden alınmıştır; metinler özgündür.
   Dış kaynak: yalnız HTTP 200 dönenler (curl, 2026-10-25). Kod örnekleri CPython 3.12 ile çalıştırılarak doğrulandı; alıştırmalar PP.alan (Pyodide) ile çalışır (py-alan.js).
   Ders metnindeki örnek kodlar, o dersin sınav sorularından farklı değerler kullanır (örnek anlatır, soru başka ifadeyle sınar). */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).py = (window.PP_LESSONS.py || {}));

  /* 9 ───────────────────────────────────────────── try / except */
  L[9] = {
    hook: "Hata, programın çökmesi demek değildir: beklediğin hatayı yakalar, yoluna devam edersin. try dener, except hatada devreye girer, finally her durumda çalışır.",
    homework: "Kullanıcıdan adet isteyen küçük bir program yaz: int() ile çevirmeyi try içine al, ValueError olursa 'sayı gir' yazıp 0 kabul et. Sonra iki sayıyı bölen bir işlev yaz ve ZeroDivisionError'ı ayrı bir except ile yakala. En sona finally ile 'işlem bitti' yazdır; hata olsa da olmasa da yazdığını gör.",
    warmup: {
      recap: [
        { point: "Önceki derslerde işlevleri ve tür dönüşümünü öğrendin; yanlış türde değer verince Python hata fırlatıyordu.", example: "int(\"on\") → ValueError" }
      ],
      concepts: [
        {
          term: "İstisna (exception)",
          tr: "Çalışma sırasında oluşan hata",
          summary: "Yakalanmazsa program durur ve hata mesajı yazılır; yakalanırsa program devam eder.",
          example: "9 / 0 → ZeroDivisionError"
        },
        {
          term: "try / except",
          tr: "Dene, hata olursa şunu yap",
          summary: "try içindeki kod hata verirse Python except bloğuna atlar; hata yoksa except atlanır.",
          example: "try: ... except ValueError: ..."
        },
        {
          term: "finally",
          tr: "Her durumda çalışan blok",
          summary: "Hata olsun olmasın, try bitince çalışır; temizlik ve kapanış işleri için kullanılır.",
          example: "finally: print(\"bitti\")"
        }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      {
        t: "box",
        h: "Gerçek talep",
        text: "Kullanıcı adet yerine 'on' yazarsa int() hata fırlatır ve program çöker. Müşterinin önünde çöken kasa programı olmaz. Beklediğin hataları yakalayıp anlamlı bir mesajla devam etmek gerekir."
      },
      { t: "h", text: "try ve except" },
      {
        t: "cmd",
        lang: "python",
        text: "def oku(metin):\n    try:\n        return int(metin)\n    except ValueError:\n        return 0\n\nprint(oku(\"15\"))   # 15\nprint(oku(\"on\"))   # 0"
      },
      {
        t: "steps",
        h: "Akış",
        items: ["Python önce try bloğunu çalıştırır. Hata çıkarsa o satırdan sonrası atlanır.", "Hata türü except'te yazılan türle uyuşuyorsa o blok çalışır, program devam eder.", "Hata çıkmazsa except bloğu hiç çalışmaz. Türü uymayan hata yakalanmaz ve program yine durur."]
      },
      { t: "h", text: "Üç sık hata türü" },
      {
        t: "steps",
        h: "Hangi iş hangi hatayı verir",
        items: ["ValueError: tür doğru ama değer uygun değil. int(\"on\") metin sayı biçiminde değildir.", "TypeError: işlem bu türle yapılamaz. len(5) sayının uzunluğu olmaz; metin ile sayı + ile toplanmaz.", "ZeroDivisionError: sıfıra bölme. / , // ve % işlemlerinin üçü de sıfır bölenle bu hatayı verir."]
      },
      { t: "h", text: "Birden çok except, else ve finally" },
      {
        t: "cmd",
        lang: "python",
        text: "def bol(a, b):\n    try:\n        sonuc = a / b\n    except ZeroDivisionError:\n        print(\"bölen sıfır olamaz\")\n        return None\n    except TypeError:\n        print(\"sayı ver\")\n        return None\n    else:\n        print(\"bölme başarılı\")\n        return sonuc\n    finally:\n        print(\"bitti\")\n\nprint(bol(9, 3))\n# bölme başarılı\n# bitti\n# 3.0\nprint(bol(9, 0))\n# bölen sıfır olamaz\n# bitti\n# None\nprint(bol(9, \"3\"))\n# sayı ver\n# bitti\n# None"
      },
      {
        t: "steps",
        h: "Kurallar",
        items: ["Birden çok except yazabilirsin; Python yukarıdan aşağı bakar ve uyan ilkini çalıştırır.", "İki türü aynı blokta yakalamak için demet kullanılır: except (KeyError, IndexError):", "else yalnız hata çıkmadığında, finally ise her durumda çalışır; return ile çıkılsa bile finally yine çalışır."]
      },
      {
        t: "box",
        h: "Dikkat",
        text: "Çıplak 'except:' her hatayı yutar; yazım hatan bile gizlenir. Yakalamak istediğin türü yaz. try tek başına olamaz: yanında en az bir except ya da finally gerekir."
      },
      { t: "h", text: "İstisna hiyerarşisi" },
      { t: "cmd", lang: "python", text: "print(issubclass(ZeroDivisionError, ArithmeticError))   # True\nprint(issubclass(KeyError, LookupError))                # True\nprint(issubclass(IndexError, LookupError))              # True\nprint(issubclass(ValueError, Exception))                # True\nprint(issubclass(KeyboardInterrupt, Exception))         # False\n\nliste = [1, 2]\ntry:\n    print(liste[5])\nexcept LookupError as e:                 # IndexError'ı da yakalar\n    print(\"arama hatası:\", type(e).__name__)    # arama hatası: IndexError\n\ntry:\n    int(\"x\")\nexcept (TypeError, ValueError) as e:     # iki tür tek blokta\n    print(\"dönüşüm:\", type(e).__name__)         # dönüşüm: ValueError" },
      { t: "steps", h: "Hiyerarşi kuralları", items: ["İstisnalar bir ağaç oluşturur: ZeroDivisionError ArithmeticError'ın, KeyError ve IndexError LookupError'ın alt türüdür; hepsi Exception'ın altındadır.","Üst türü yazan except alt türleri de yakalar. except blokları yukarıdan aşağı denenir ve ilk uyan çalışır; bu yüzden önce ayrıntılı (alt tür), sonra genel tür yazılır.","KeyboardInterrupt ve SystemExit Exception'ın değil BaseException'ın altındadır; except Exception bunları yakalamaz."] },
      { t: "h", text: "input() her zaman dize döndürür" },
      { t: "cmd", lang: "python", text: "girdi = \"12\"          # input() ile gelen değeri taklit ediyoruz\nprint(type(girdi))    # <class 'str'>\ntry:\n    print(girdi + 1)\nexcept TypeError as e:\n    print(\"TypeError:\", e)   # TypeError: can only concatenate str (not \"int\") to str\nprint(int(girdi) + 1)     # 13\nprint(girdi * 2)          # 1212\ntry:\n    print(10 / \"2\")\nexcept TypeError as e:\n    print(\"TypeError:\", e)   # TypeError: unsupported operand type(s) for /: 'int' and 'str'" },
      { t: "steps", h: "Hatırla", items: ["Kullanıcı sayı yazsa bile input() metin döndürür. Metin ile sayıyı toplayamaz ya da bölemezsin (TypeError); sayıyla işlem için önce int() ya da float() çevir.","Metin * sayı ise hata değil, tekrarlamadır: \"12\" * 2 sonucu \"1212\" olur. Bu, sessiz bir mantık hatasına yol açabilir.","Çevirme sırasında kullanıcı sayı yazmazsa ValueError oluşur; int(input()) çağrısını try bloğuna al."] },
      { t: "h", text: "Kendin dene" },
      { t: "alan", id: "py-9-hatali" },
      { t: "h", text: "Bozuk kodu bul ve düzelt" },
      {
        t: "steps",
        h: "Bozuk → düzeltilmiş",
        items: ["try: int(x) satırından sonra except ya da finally yok → SyntaxError. En az bir except bloğu ekle.", "except ZeroDivisionError: ile int(\"abc\") korunmaya çalışılıyor → ValueError yakalanmaz ve program durur. except ValueError: yaz.", "Yalnız 'except:' yazıp hatayı susturmuş → yazım hatası bile gizlenir. Tür belirt: except ValueError:", "except ValueError yazıp sonundaki iki nokta unutulmuş → SyntaxError. Satır iki nokta ile biter."]
      }
    ],
    objectives: [
      { id: "h1", text: "try, except ve sonraki satırların hangi sırayla çalıştığını izleyip çıktıyı söyleyebilirsin." },
      { id: "h2", text: "ValueError, TypeError ve ZeroDivisionError hatalarını üreten ifadeleri, input() metin döndürdüğü için oluşan TypeError dahil, ayırt edebilirsin." },
      { id: "h3", text: "Doğru türü belirterek except yazıp hiyerarşide üst türün alt türü de yakaladığını, türü uymayan hatanın yakalanmadığını bulabilirsin." },
      { id: "h4", text: "finally bloğunun ne zaman çalıştığını söyleyip eksik ya da yanlış yazılmış hata yakalamayı düzeltebilirsin." }
    ],
    summary: ["try bloğundaki hata türü except'tekiyle uyuşursa o blok çalışır ve program devam eder; hata yoksa except atlanır.", "ValueError uygunsuz değer, TypeError uygunsuz tür, ZeroDivisionError sıfıra bölmedir.", "Türü uymayan hata yakalanmaz; iki türü birlikte yakalamak için except (A, B): yazılır.", "finally hata olsun olmasın çalışır; çıplak except: hataları gizlediği için kaçınılır."],
    prereq: [8],
    minutes: 30,
    sonDogrulama: "2026-10-26",
    surum: "2026-10-v1",
    quiz: [
      {
        id: "ef005a70",
        q: "try:\n    sayi = int(\"12a\")\n    print(\"temiz\")\nexcept ValueError:\n    print(\"hatalı\")\nprint(\"son\")\nkodu ne yazdırır?",
        options: ["hatalı, ardından son", "temiz, ardından son", "Yalnız hatalı", "Program hata ile durur"],
        obj: "h1"
      },
      {
        id: "24cbc17a",
        q: "try bloğunda hiç hata çıkmazsa except bloğuna ne olur?",
        options: ["Çalışmaz, atlanır", "Her zaman çalışır", "Yalnız finally varsa çalışır", "Program durur"],
        obj: "h1"
      },
      {
        id: "ab5d59ef",
        q: "int(\"3.5\") ifadesi hangi hatayı verir?",
        options: ["ValueError", "TypeError", "ZeroDivisionError", "NameError"],
        obj: "h2"
      },
      {
        id: "533e21d2",
        q: "Hangi ifade TypeError üretir?",
        options: ["\"5\" + 2", "int(\"5\") + 2", "\"5\" * 2", "float(\"5\") + 2"],
        obj: "h2"
      },
      {
        id: "278c4c62",
        q: "try bloğunda 7 % 0 işlemi var ve yalnız except ValueError: yazılı. Ne olur?",
        options: ["ZeroDivisionError yakalanmaz, program hata ile durur", "ValueError mesajı yazılır", "Sonuç 0 olur", "except bloğu yine de çalışır"],
        obj: "h3"
      },
      {
        id: "49a9da9c",
        q: "except (ValueError, TypeError): satırı ne yapar?",
        options: ["İki türden biri oluşursa blok çalışır", "Yalnız ikisi birlikte oluşursa çalışır", "SyntaxError verir", "Yalnız ilk türü yakalar"],
        obj: "h3"
      },
      {
        id: "05af33ba",
        q: "finally bloğu ne zaman çalışır?",
        options: ["Hata olsun olmasın her durumda", "Yalnız hata olduğunda", "Yalnız hata olmadığında", "Yalnız except çalışmadıysa"],
        obj: "h4"
      },
      {
        id: "3b4e4cdf",
        q: "try:\n    n = int(\"q\")\nexcept ValueError:\n    print(\"1\")\nfinally:\n    print(\"2\")\nprint(\"3\")\nkodu ne yazdırır?",
        options: ["1, 2, 3 sırasıyla", "1, 3", "2, 3", "1, 2"],
        obj: "h4"
      },
      {
        id: "e2338db2",
        q: "try:\n    print(10 / 0)\nexcept ArithmeticError:\n    print(\"a\")\nexcept ZeroDivisionError:\n    print(\"z\")\nkodu ne yazdırır?",
        options: ["z", "a", "a, z", "Hata verir"],
        obj: "h3"
      },
      {
        id: "4ceeef22",
        q: "d = {\"a\": 1}\ntry:\n    print(d[\"b\"])\nexcept LookupError:\n    print(\"yok\")\nkodu ne yazdırır?",
        options: ["yok", "KeyError ile durur", "1", "None"],
        obj: "h3"
      },
      {
        id: "7b5b1563",
        q: "Kullanıcı x = input() satırında 4 yazıp Enter'a basıyor. print(x * 2) ne yazdırır?",
        options: ["8", "Hata verir", "4 4", "44"],
        obj: "h2"
      }
    ],
    interview: [
      {
        q: "try/except neden hata türünü belirtmeli?",
        a: "Türü belirtmezsem her hata susturulur, yazım hatası bile gizlenir. Yalnız beklediğim hatayı, örneğin ValueError'ı yakalarsam beklemediğim hata yine görünür ve düzeltebilirim."
      },
      {
        q: "finally ne işe yarar?",
        a: "Hata olsa da olmasa da çalıştığı için dosyayı kapatmak, bağlantıyı bırakmak ya da bir kayıt düşmek gibi temizlik işleri oraya konur."
      }
    ],
    vocab: [
      { term: "exception", tr: "istisna", ex: "The program raised an exception." },
      { term: "to catch", tr: "yakalamak", ex: "You can catch the error with except." },
      { term: "to raise", tr: "fırlatmak", ex: "The function raises a ValueError." },
      { term: "handler", tr: "hata işleyici", ex: "The except block is the error handler." },
      { term: "cleanup", tr: "temizlik", ex: "Use finally for cleanup." }
    ],
    sources: [
      { title: "Python Tutorial: Hatalar ve istisnalar", url: "https://docs.python.org/3/tutorial/errors.html" },
      { title: "Python Standart Kütüphane: Yerleşik istisnalar", url: "https://docs.python.org/3/library/exceptions.html" },
      { title: "Python Institute: PCEP sertifikası (güncel müfredat burada)", url: "https://pythoninstitute.org/pcep" }
    ]
  };

  /* 10 ──────────────────────────────────────────── Dize yöntemleri */
  L[10] = {
    hook: "Metin her yerde: sipariş satırı, dosya adı, kullanıcı girdisi. Dize yöntemleri metni parçalar, temizler, arar ve yeniden kurar; hepsi yeni bir metin döndürür.",
    homework: "'  Kalem ; 12 ; 7.5  ' gibi bir satırı strip ve split ile parçalayıp üç değişkene ayır. Sonra replace ile bir parçayı değiştir ve özgün değişkenin değişmediğini yazdırıp gör. Son olarak sonucu format ya da f-dize ile 'Kalem: 12 adet' biçiminde yazdır; metin ile sayıyı + ile toplamayı deneyip TypeError al.",
    warmup: {
      recap: [
        { point: "Önceki derslerde metinleri (str), tür dönüşümünü ve fonksiyonları öğrendin; hata mesajlarını da okumayı gördün.", example: "str(12) → \"12\"" }
      ],
      concepts: [
        {
          term: "Dize yöntemi (string method)",
          tr: "Metne bağlı işlev: metin.yontem()",
          summary: "Nokta ile çağrılır; dizeler değişmez olduğu için sonuç yeni bir metindir, özgün metin aynı kalır.",
          example: "ad.upper()"
        },
        {
          term: "split ve join",
          tr: "Parçala ve birleştir",
          summary: "split metni listeye ayırır, join metin listesini ayraçla tek metne birleştirir.",
          example: "\"a;b\".split(\";\") → ['a', 'b']"
        },
        {
          term: "Biçimlendirme (format, f-dize)",
          tr: "Değerleri metne yerleştirme",
          summary: "{} yer tutucuya değer girer; :.2f gibi bir biçim ondalık basamağı belirler.",
          example: "f\"{ad}: {adet}\""
        }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      {
        t: "box",
        h: "Gerçek talep",
        text: "Bir dosyadan ya da formdan gelen satır 'Kalem;12;7.5' gibi ham metindir. Önce boşlukları temizlemek, ayraçtan parçalamak, sayıya çevirmek gerekir. Sonra sonucu fişe düzgün yazdırırsın. Hepsi dize yöntemleriyle olur."
      },
      { t: "h", text: "strip, split, join, upper, lower" },
      {
        t: "cmd",
        lang: "python",
        text: "satir = \"  Kalem;Defter;silgi  \"\ntemiz = satir.strip()           # baştaki ve sondaki boşluğu atar\nprint(temiz)                    # Kalem;Defter;silgi\n\nparcalar = temiz.split(\";\")     # ayraçtan listeye ayırır\nprint(parcalar)                 # ['Kalem', 'Defter', 'silgi']\nprint(\" / \".join(parcalar))     # Kalem / Defter / silgi\n\nprint(temiz.upper())            # KALEM;DEFTER;SILGI\nprint(temiz.lower())            # kalem;defter;silgi\nprint(\"##kalem##\".strip(\"#\"))   # kalem  (yalnız uçlardaki # atılır)"
      },
      {
        t: "steps",
        h: "Temel kurallar",
        items: ["split() ayraç vermezsen boşluk(lar)dan böler ve boş öğe üretmez; split(\";\") ise ardışık ayraçlar arasında boş metin ('') bırakır.", "join'i ayraç çağırır ve listedeki her öğenin metin olmasını ister; sayı varsa önce str() ile çevir, yoksa TypeError alırsın.", "strip() yalnız uçları temizler, ortadaki boşluğa dokunmaz. strip(\"#\") ise uçlardaki # karakterlerini atar."]
      },
      { t: "h", text: "replace ve find" },
      {
        t: "cmd",
        lang: "python",
        text: "yazi = \"kalem-defter-kalem\"\nprint(yazi.replace(\"kalem\", \"kurşun\"))      # kurşun-defter-kurşun\nprint(yazi.replace(\"kalem\", \"kurşun\", 1))   # kurşun-defter-kalem\nprint(yazi)                                  # kalem-defter-kalem  (değişmedi)\n\nprint(yazi.find(\"defter\"))   # 6  (ilk bulunduğu yerin sırası)\nprint(yazi.find(\"silgi\"))    # -1 (bulunamadı)\nprint(\"defter\" in yazi)      # True"
      },
      {
        t: "steps",
        h: "Önemli ayrıntılar",
        items: ["Dizeler değişmezdir: replace, upper, strip yeni bir metin döndürür. Sonucu bir değişkene atamazsan kaybolur.", "find ilk eşleşmenin sırasını verir (saymaya 0'dan başlanır), bulamazsa -1 döner. Yalnız var mı diye bakacaksan in kullan.", "Harf büyüklüğünü yok sayarak karşılaştırmak için iki tarafı da lower() ile küçült."]
      },
      { t: "h", text: "Biçimlendirme" },
      {
        t: "cmd",
        lang: "python",
        text: "print(\"Toplam: {:.2f}\".format(2 / 3))    # Toplam: 0.67\nad = \"makas\"\nprint(f\"{ad}: {45.5:.1f}\")                 # makas: 45.5\nprint(\"{} - {}\".format(ad, 3))             # makas - 3\n\n# Metin ile sayıyı + ile birleştiremezsin:\n# print(\"Fiyat: \" + 7.5)   # TypeError\nprint(\"Fiyat: \" + str(7.5))                 # Fiyat: 7.5"
      },
      {
        t: "box",
        h: "Dikkat",
        text: "ad.upper() satırını tek başına yazarsan ad değişmez; yeni metin hesaplanır ve atılır. Sonucu kullanmak için ad = ad.upper() yaz. Metindeki tek bir harfi ad[0] = 'K' ile değiştirmeye çalışırsan da TypeError alırsın."
      },
      { t: "h", text: "Kendin dene" },
      { t: "alan", id: "py-10-satir" },
      { t: "h", text: "Bozuk kodu bul ve düzelt" },
      {
        t: "steps",
        h: "Bozuk → düzeltilmiş",
        items: ["metin.strip() tek başına yazılmış, sonra metin kullanılıyor → metin değişmedi. metin = metin.strip() yaz.", "\",\".join([10, 20]) → TypeError (sayılar metin değil). \",\".join([\"10\", \"20\"]) ya da map(str, ...) kullan.", "print(\"Kalan: \" + 3.5) → TypeError. print(\"Kalan: \" + str(3.5)) ya da f\"Kalan: {3.5}\" yaz.", "metin.find(\"x\") sonucu doğrudan koşulda (if metin.find(\"x\"):) → bulunamayınca -1 doğru sayılır, başta bulununca 0 yanlış sayılır. if \"x\" in metin: yaz."]
      }
    ],
    objectives: [
      { id: "h1", text: "split ve join sonucunu söyleyip join'in neden metin listesi istediğini açıklayabilirsin." },
      { id: "h2", text: "strip ve replace'in yeni metin döndürdüğünü, özgün metnin değişmediğini bulabilirsin." },
      { id: "h3", text: "find, upper ve lower ile arama ve karşılaştırma sonucunu söyleyebilirsin." },
      { id: "h4", text: "format ve f-dize ile metin kurup metin ile sayıyı birleştirirken oluşan hatayı düzeltebilirsin." }
    ],
    summary: ["split metni listeye ayırır, join metin listesini tek metne birleştirir; join yalnız metin öğeleriyle çalışır.", "Dizeler değişmezdir: strip, replace, upper gibi yöntemler yeni metin döndürür, özgün metin aynı kalır.", "find ilk eşleşmenin sırasını verir, bulamazsa -1 döner; var mı diye bakmak için in kullanılır.", "format ve f-dize değerleri metne yerleştirir; metin ile sayı + ile birleşmez, önce str() gerekir."],
    prereq: [9],
    minutes: 30,
    sonDogrulama: "2026-10-25",
    surum: "2026-10-v1",
    quiz: [
      {
        id: "f0d93a7a",
        q: "\"12 5  8\".split() ne döndürür?",
        options: ["['12', '5', '8']", "['12', '5', '', '8']", "['12 5  8']", "[12, 5, 8]"],
        obj: "h1"
      },
      {
        id: "deb10257",
        q: "\"-\".join([6, 7, 8]) ne olur?",
        options: ["TypeError", "6-7-8", "678", "6 7 8"],
        obj: "h1"
      },
      {
        id: "df61790c",
        q: "\"xxaxbxx\".strip(\"x\") ne döndürür?",
        options: ["axb", "ab", "xxaxbxx", "xaxbx"],
        obj: "h2"
      },
      {
        id: "f6d7ff65",
        q: "ad = \"ada\"\nad.replace(\"a\", \"e\")\nprint(ad)\nkodu ne yazdırır?",
        options: ["ada", "ede", "eda", "Hata verir"],
        obj: "h2"
      },
      {
        id: "8ec4aabf",
        q: "\"elma armut\".find(\"ar\") ne döndürür?",
        options: ["5", "4", "6", "-1"],
        obj: "h3"
      },
      {
        id: "bf6e7168",
        q: "\"Evet\".lower() == \"evet\" ifadesi ne döndürür?",
        options: ["True", "False", "'evet'", "Hata verir"],
        obj: "h3"
      },
      {
        id: "a90b6efa",
        q: "\"{:.1f}\".format(3.14159) ne döndürür?",
        options: ["3.1", "3.14", "3.2", ".1"],
        obj: "h4"
      },
      {
        id: "429ec09d",
        q: "print('Toplam: ' + 5) satırı neden hata verir?",
        options: ["Metin ile sayı + ile birleştirilemez (TypeError)", "5 çok küçük bir sayıdır", "Toplam: bir anahtar sözcüktür", "Hata vermez, Toplam: 5 yazar"],
        obj: "h4"
      }
    ],
    interview: [
      {
        q: "Dizeler değişmez olunca replace ne işe yarar?",
        a: "replace özgün metni değiştirmez, değiştirilmiş yeni bir metin döndürür. Sonucu kullanmak için ad = ad.replace(...) gibi bir değişkene atarım."
      },
      {
        q: "Bir metinde alt metin var mı diye nasıl bakarsın?",
        a: "Yalnız var mı diye bakacaksam 'x' in metin yazarım; sırasını da istersem find kullanırım ama bulunamayınca -1 döndüğünü unutmam."
      }
    ],
    vocab: [
      { term: "string", tr: "dize, metin", ex: "A string is a sequence of characters." },
      { term: "to split", tr: "parçalamak", ex: "Split the line at each semicolon." },
      { term: "to strip", tr: "uçlardan temizlemek", ex: "Strip the spaces from both ends." },
      { term: "to replace", tr: "değiştirmek", ex: "Replace the old word with a new one." },
      { term: "immutable", tr: "değişmez", ex: "Strings are immutable in Python." }
    ],
    sources: [
      { title: "Python Standart Kütüphane: Dize yöntemleri", url: "https://docs.python.org/3/library/stdtypes.html#string-methods" },
      { title: "Python Tutorial: Çıktıyı biçimlendirme", url: "https://docs.python.org/3/tutorial/inputoutput.html" },
      { title: "Python Institute: PCEP sertifikası (güncel müfredat burada)", url: "https://pythoninstitute.org/pcep" }
    ]
  };
})();

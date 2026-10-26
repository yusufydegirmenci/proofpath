/* Python (PCEP düzeyi) · sabit dersler 5-8 (döngüler, liste ve demet, sözlük ve küme, fonksiyonlar). Kapsam herkese açık PCEP müfredat özetinden alınmıştır; metinler özgündür.
   Dış kaynak: yalnız HTTP 200 dönenler (curl, 2026-10-24). Kod örnekleri CPython 3.12 ile çalıştırılarak doğrulandı; alıştırmalar PP.alan (Pyodide) ile çalışır (py-alan.js). */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).py = (window.PP_LESSONS.py || {}));

  /* 5 ───────────────────────────────────────────── Döngüler: while ve for */
  L[5] = {
    hook: "Aynı işi yüz kez elle yazmak yerine bir kez yaz, döngüye tekrar ettir. Asıl iş, döngünün nerede başlayıp nerede bittiğini doğru söylemektir.",
    homework: "1'den 20'ye kadar yalnız 3'e bölünen sayıları yazdıran bir for döngüsü yaz. Aynı işi while ile yap. Sonra while'ın içindeki sayacı artırmayı bilerek sil; bu 'sonsuz döngü' hatasını gözlemle (tarayıcı alanında 5 saniyede kesilir) ve düzelt.",
    warmup: {
      recap: [
        { point: "Önceki derste koşullarla kod akışına karar vermeyi öğrendin.", example: "if sayi % 2 == 0:" }
      ],
      concepts: [
        {
          term: "for döngüsü",
          tr: "Bir diziyi eleman eleman gezer",
          summary: "range(n) 0'dan n-1'e kadar sayı üretir; for her turda bir sonrakini alır.",
          example: "for i in range(3):"
        },
        {
          term: "while döngüsü",
          tr: "Koşul doğru kaldığı sürece tekrar eder",
          summary: "Koşulu etkileyen bir değişken gövdede değişmezse döngü hiç bitmez.",
          example: "while n <= 5:"
        },
        {
          term: "break ve continue",
          tr: "Döngüyü kes ya da turu atla",
          summary: "break döngüyü tümden bitirir, continue sıradaki ture geçer.",
          example: "if sayi > 5: break"
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
      { t: "h", text: "for ve range" },
      {
        t: "cmd",
        lang: "python",
        text: "for i in range(3):\n    print(i)            # 0, 1, 2\nfor i in range(1, 9, 2):\n    print(i)            # 1, 3, 5, 7\nfor harf in \"abc\":\n    print(harf)         # a, b, c\nprint(list(range(1, 6)))   # [1, 2, 3, 4, 5]"
      },
      {
        t: "steps",
        h: "range kuralı",
        items: ["range(son): 0'dan son-1'e kadar. range(5) sayıları 0, 1, 2, 3, 4'tür; 5 dahil değildir.", "range(başla, son): başla dahil, son hariç. range(1, 6) beş sayı verir: 1'den 5'e.", "range(başla, son, adım): adım kadar atlar. Üçüncü değer negatifse geriye sayar: range(5, 0, -1)."]
      },
      { t: "h", text: "while, break, continue ve else" },
      {
        t: "cmd",
        lang: "python",
        text: "toplam = 0\nn = 1\nwhile n <= 5:\n    toplam += n\n    n += 1\nprint(toplam)           # 15\n\nfor sayi in range(1, 8):\n    if sayi % 2 == 0:\n        continue        # çiftleri atla\n    if sayi > 5:\n        break           # 5'ten büyükte döngüyü bitir\n    print(sayi)         # 1, 3, 5\n\nfor k in range(3):\n    pass\nelse:\n    print(\"döngü break olmadan bitti\")"
      },
      {
        t: "p",
        text: "Döngünün else bloğu, döngü break ile kesilmeden bittiğinde çalışır. Hiç tur atmayan bir for için de çalışır. Sık kullanılmaz ama 'aradığım bulunamadı' durumlarında temiz bir çözümdür."
      },
      { t: "h", text: "İç içe döngü" },
      {
        t: "cmd",
        lang: "python",
        text: "for satir in range(1, 4):\n    for sutun in range(1, 4):\n        print(satir * sutun, end=\" \")\n    print()\n# 1 2 3\n# 2 4 6\n# 3 6 9"
      },
      { t: "h", text: "for-else ve while-else: arama kalıbı" },
      { t: "cmd", lang: "python", text: "for n in [4, 9, 15]:\n    if n % 7 == 0:\n        print(\"7'nin katı bulundu:\", n)\n        break\nelse:\n    print(\"listede 7'nin katı yok\")      # listede 7'nin katı yok\n\nfor n in [4, 14, 15]:\n    if n % 7 == 0:\n        print(\"7'nin katı bulundu:\", n)   # 7'nin katı bulundu: 14\n        break\nelse:\n    print(\"listede 7'nin katı yok\")      # çalışmaz, break döngüyü kesti\n\nsayi = 0\nwhile sayi < 3:\n    sayi += 1\nelse:\n    print(\"while normal bitti, sayi =\", sayi)   # sayi = 3\n\nfor x in []:\n    pass\nelse:\n    print(\"boş dizide de else çalışır\")" },
      { t: "steps", h: "else ne zaman çalışır?", items: ["for ya da while'ın else bloğu, döngü break ile kesilmeden doğal olarak biterse çalışır. Yani else \"aradığım bulunamadı\" anlamına gelir.","continue else'i engellemez; yalnız break (ve işlevde return) döngüyü kesip else'i atlatır.","Dizi boşsa döngü hiç dönmez ama normal bitmiş sayılır, else çalışır. Bu, arama kalıbında bir bulunamadı bayrağı değişkeni yazmaktan kurtarır."] },
      { t: "h", text: "Kendin dene" },
      { t: "alan", id: "py-5-ciro" },
      { t: "h", text: "Bozuk kodu bul ve düzelt" },
      {
        t: "steps",
        h: "Bozuk → düzeltilmiş",
        items: ["while n <= 5: içinde n += 1 yok → sonsuz döngü. Koşulu etkileyen değişkeni gövdede değiştir.", "for i in range(5): ile 1'den 5'e yazdırmak → 0, 1, 2, 3, 4 çıkar. range(1, 6) kullan.", "print(toplam) döngü gövdesine girintili yazılmış → her turda yazar. Yalnız sonucu istiyorsan döngünün dışına, girintisiz yaz."]
      }
    ],
    objectives: [
      { id: "h1", text: "range(son), range(başla, son) ve range(başla, son, adım) ifadelerinin ürettiği sayıları tam olarak yazabilirsin." },
      { id: "h2", text: "while döngüsünün kaç tur döneceğini ve sonunda değişkenin değerini hesaplayıp sonsuz döngüye yol açan eksiği bulabilirsin." },
      { id: "h3", text: "break ve continue içeren bir döngünün çıktısını sırayla yazabilirsin." },
      { id: "h4", text: "Döngünün else bloğunun ne zaman çalıştığını (break, boş dizi, doğal bitiş) ve \"bir eksik ya da fazla\" sınır hatalarını (off-by-one) açıklayabilirsin." }
    ],
    summary: ["for her turda bir eleman alır; range(n) 0'dan n-1'e kadardır, son değer hariçtir.", "while koşul doğru kaldıkça döner; koşulu değiştiren satır gövdede yoksa sonsuz döngü olur.", "break döngüyü bitirir, continue sıradaki ture geçer.", "for ve while'ın else bloğu, döngü break ile kesilmeden bittiğinde çalışır.", "İç içe döngüde iç döngü her dış turda baştan döner; girinti hangi döngüye ait olduğunu söyler."],
    prereq: [4],
    minutes: 35,
    sonDogrulama: "2026-10-26",
    surum: "2026-10-v1",
    quiz: [
      {
        id: "5d571644",
        q: "for i in range(3): print(i) hangi sayıları yazdırır?",
        options: ["0, 1, 2", "1, 2, 3", "0, 1, 2, 3", "3"],
        obj: "h1"
      },
      {
        id: "99cc4205",
        q: "range(2, 10, 3) hangi sayıları üretir?",
        options: ["2, 5, 8, 10", "2, 5, 8", "3, 6, 9", "2, 4, 6, 8"],
        obj: "h1"
      },
      {
        id: "f9581b38",
        q: "toplam = 0, n = 1 iken while n <= 5: toplam += n; n += 1 bittiğinde toplam kaçtır?",
        options: ["10", "5", "15", "Sonsuz döngüdür"],
        obj: "h2"
      },
      {
        id: "f4de1ac3",
        q: "n = 1 iken while n <= 5: döngüsünün gövdesinde n değiştirilmezse ne olur?",
        options: ["Sonsuz döngüye girer", "Hemen biter", "Bir kez çalışıp biter", "SyntaxError verir"],
        obj: "h2"
      },
      {
        id: "809845d0",
        q: "for sayi in range(1, 8): çift ise continue, 5'ten büyükse break, aksi halde print(sayi) çıktısı nedir?",
        options: ["1, 3, 5, 7", "2, 4", "1, 2, 3, 4, 5", "1, 3, 5"],
        obj: "h3"
      },
      {
        id: "acfdb0c1",
        q: "break ile continue arasındaki fark nedir?",
        options: ["break döngüyü bitirir, continue sıradaki ture geçer", "İkisi de aynıdır", "continue döngüyü bitirir, break sıradaki ture geçer", "break yalnız while'da çalışır"],
        obj: "h3"
      },
      {
        id: "7445e30a",
        q: "for ... else yapısında else ne zaman çalışır?",
        options: ["Döngüden önce her zaman", "Döngü break ile kesilmeden bittiğinde", "Yalnız break çalıştığında", "Yalnız döngü hiç dönmediğinde"],
        obj: "h4"
      },
      {
        id: "d42efb10",
        q: "Bir kişi 1'den 5'e kadar yazdırmak için for i in range(5) yazdı. Sorun nedir?",
        options: ["0'dan 4'e kadar yazar; range(1, 6) gerekir", "5'e kadar yazar, sorun yok", "Sözdizimi hatası", "range yalnız while ile kullanılır"],
        obj: "h4"
      },
      {
        id: "b37fa09c",
        q: "for i in range(3):\n    if i == 5:\n        break\nelse:\n    print(\"bitti\")\nprint(\"son\")\nkodu ne yazdırır?",
        options: ["son", "bitti, son", "bitti", "Hata verir"],
        obj: "h4"
      },
      {
        id: "3b7be92a",
        q: "n = 0\nwhile n < 3:\n    n += 1\n    if n == 2:\n        break\nelse:\n    print(\"else\")\nprint(n)\nkodu ne yazdırır?",
        options: ["2", "else, 2", "3", "else, 3"],
        obj: "h4"
      }
    ],
    interview: [
      {
        q: "for ile while ne zaman tercih edilir?",
        a: "Kaç tur döneceği ya da hangi dizinin gezileceği belliyse for. Ne zaman biteceği bir koşula bağlıysa (kullanıcı çıkana kadar gibi) while."
      },
      {
        q: "Sonsuz döngü neden oluşur ve nasıl bulunur?",
        a: "While koşulunu etkileyen değişken gövdede değişmezse oluşur. Kodun çalışmayı bırakmadığını görünce koşuldaki değişkeni gövdede izlerim."
      }
    ],
    vocab: [
      { term: "loop", tr: "döngü", ex: "The loop runs five times." },
      { term: "iteration", tr: "tur, yineleme", ex: "Each iteration reads one order." },
      { term: "infinite loop", tr: "sonsuz döngü", ex: "A missing counter causes an infinite loop." },
      { term: "range", tr: "sayı aralığı", ex: "range(5) produces five numbers." },
      { term: "counter", tr: "sayaç", ex: "Increase the counter in each turn." }
    ],
    sources: [
      { title: "Python Tutorial: Denetim akışı (if, for, range, def)", url: "https://docs.python.org/3/tutorial/controlflow.html" },
      { title: "Python Standart Kütüphane: Yerleşik işlevler", url: "https://docs.python.org/3/library/functions.html" },
      { title: "Python Institute: PCEP sertifikası (güncel müfredat burada)", url: "https://pythoninstitute.org/pcep" }
    ]
  };

  /* 6 ───────────────────────────────────────────── Liste ve demet (tuple) */
  L[6] = {
    hook: "Liste, değiştirebildiğin bir sıra; demet, mühürlenmiş bir sıradır. İkisinde de eleman 0'dan numaralanır.",
    homework: "Beş ürünlük bir liste kur. Sona bir ürün ekle, ortaya bir ürün sok, bir ürünü sil. Sonra ilk iki ürünü dilimle al, listeyi alfabetik sırala. Aynı listeyi b = a ve c = a[:] ile iki yoldan kopyala; birine eleman ekleyip hangisinin değiştiğini açıkla.",
    warmup: {
      recap: [
        { point: "Önceki derste for ile bir diziyi gezmeyi ve range ile saymayı gördün.", example: "for harf in \"abc\":" }
      ],
      concepts: [
        {
          term: "Liste (list)",
          tr: "Değiştirilebilir sıralı koleksiyon",
          summary: "Köşeli parantezle yazılır; ekleme, silme ve değiştirme serbesttir.",
          example: "[\"elma\", \"armut\"]"
        },
        {
          term: "Demet (tuple)",
          tr: "Değiştirilemez sıralı koleksiyon",
          summary: "Parantezle yazılır; oluşturulduktan sonra eleman atanamaz.",
          example: "(4, 7)"
        },
        {
          term: "Dilimleme (slicing)",
          tr: "Listenin bir parçasını almak",
          summary: "liste[baş:son] baş dahil, son hariç yeni bir liste verir.",
          example: "meyveler[1:3]"
        }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      {
        t: "box",
        h: "Gerçek talep",
        text: "Sipariş adlarını tek tek değişkene koymak mümkün değil; hepsini bir sırada tutup gezmek, sıralamak, birini eklemek gerekir. Koordinat gibi değişmeyecek çiftler için de demet uygundur."
      },
      { t: "h", text: "Liste işlemleri" },
      {
        t: "cmd",
        lang: "python",
        text: "meyveler = [\"elma\", \"armut\", \"kiraz\"]\nmeyveler.append(\"muz\")\nmeyveler.insert(1, \"üzüm\")\nprint(meyveler)               # ['elma', 'üzüm', 'armut', 'kiraz', 'muz']\nprint(meyveler[0], meyveler[-1])   # elma muz\nprint(meyveler[1:3])          # ['üzüm', 'armut']\nmeyveler.remove(\"armut\")\nson = meyveler.pop()\nprint(son, len(meyveler))     # muz 3\nprint(\"elma\" in meyveler)     # True"
      },
      {
        t: "steps",
        h: "Dizinleme kuralı",
        items: ["İlk eleman [0], son eleman [-1]. Olmayan sıraya erişim IndexError verir.", "liste[baş:son] baş dahil, son hariçtir; liste[:2] ilk iki, liste[2:] ikinciden sona kadar.", "append sona ekler, insert(sıra, değer) araya sokar, remove(değer) ilk eşleşeni siler, pop() sondakini çıkarıp döndürür."]
      },
      { t: "h", text: "Kopya tuzağı ve demet" },
      {
        t: "cmd",
        lang: "python",
        text: "a = [3, 1, 2]\nb = a            # aynı listeye ikinci ad\nc = a[:]         # yeni bir kopya\nb.append(9)\nprint(a, c)      # [3, 1, 2, 9] [3, 1, 2]\nprint(sorted(a), a)   # [1, 2, 3, 9] [3, 1, 2, 9]\nnokta = (4, 7)\nx, y = nokta\nprint(x, y)      # 4 7\ntek = (5,)\nprint(type(tek), type((5)))   # <class 'tuple'> <class 'int'>"
      },
      {
        t: "box",
        h: "Dikkat",
        text: "b = a kopya değil, aynı listeye ikinci addır. sorted(a) yeni liste döndürür, a.sort() ise listeyi yerinde sıralar ve None döndürür. Tek elemanlı demet için virgül şart: (5,)."
      },
      { t: "h", text: "Dilim uç durumları" },
      { t: "cmd", lang: "python", text: "s = [\"a\", \"b\", \"c\", \"d\", \"e\"]\nprint(s[1:100])      # ['b', 'c', 'd', 'e']   (sınır aşımı hata vermez)\nprint(s[-2:])        # ['d', 'e']\nprint(s[:-1])        # ['a', 'b', 'c', 'd']\nprint(s[::2])        # ['a', 'c', 'e']\nprint(s[::-1])       # ['e', 'd', 'c', 'b', 'a']\nprint(s[3:1])        # []   (başlangıç sondan büyük)\nprint(s[2:2])        # []\n# print(s[10])       # IndexError (tek sıra numarası sınır dışı)\ns[1:3] = [\"X\"]       # dilime atama: iki elemanı bir ile değiştirir\nprint(s)             # ['a', 'X', 'd', 'e']\ndel s[0]\nprint(s)             # ['X', 'd', 'e']\nprint(\"d\" in s)      # True" },
      { t: "steps", h: "Dilim kuralları", items: ["liste[baş:son:adım]: baş dahil, son dahil değil. Sınır liste uzunluğunu aşarsa hata değil, listenin sonuna kadar alınır.","Negatif adım sondan başa gezer: [::-1] listeyi ters çevirir. Başlangıç sondan büyükse (adım pozitifken) sonuç boş listedir.","Tek bir sıra numarası sınır dışıysa IndexError olur, dilim olmaz. Dilime atama listeyi uzatıp kısaltabilir; del ile eleman ya da dilim silinir; in üyeliği denetler."] },
      { t: "h", text: "Takma ad ve kopya farkı (iç içe)" },
      { t: "cmd", lang: "python", text: "a = [1, 2]\nb = a               # takma ad: iki ad, tek liste\nc = a[:]            # kopya\nd = list(a)         # kopya\na.append(3)\nprint(b, c, d)      # [1, 2, 3] [1, 2] [1, 2]\nprint(a is b, a is c)    # True False\n\nic = [[1], [2]]\nkopya = ic[:]       # yüzeysel kopya: iç listeler paylaşılır\nkopya[0].append(9)\nprint(ic)           # [[1, 9], [2]]\n\nimport copy\nderin = copy.deepcopy(ic)    # iç listeler de kopyalanır\nderin[0].append(7)\nprint(ic, derin)    # [[1, 9], [2]] [[1, 9, 7], [2]]" },
      { t: "steps", h: "Hatırla", items: ["b = a yeni liste yapmaz; ikinci bir ad ekler. Birinden yapılan değişiklik ötekinde görünür. is iki adın aynı nesneyi gösterip göstermediğine bakar.","a[:] ve list(a) yeni bir dış liste yapar ama iç listeler paylaşılır (yüzeysel kopya).","İç içe yapıda tam bağımsız kopya için copy.deepcopy kullanılır."] },
      { t: "h", text: "Kendin dene" },
      { t: "alan", id: "py-6-liste" },
      { t: "h", text: "Bozuk kodu bul ve düzelt" },
      {
        t: "steps",
        h: "Bozuk → düzeltilmiş",
        items: ["nokta = (4, 7); nokta[0] = 1 → TypeError. Demet değişmez: nokta = (1, 7) ile yeniden kur.", "liste = [10, 20, 30]; liste[3] → IndexError. Son sıra 2'dir; liste[-1] ile son elemana ulaş.", "sirali = a.sort() → sirali None olur. sirali = sorted(a) yaz ya da a.sort() çağırıp a'yı kullan."]
      }
    ],
    objectives: [
      { id: "h1", text: "Pozitif ve negatif sıra numaralarıyla eleman seçip liste[baş:son:adım] dilimini, uç durumlarıyla (sınır aşımı, negatif adım) yazabilirsin." },
      { id: "h2", text: "append, insert, remove, pop, sorted ve sort'un sonucunu söyleyip b = a ile a[:] farkını (iç içe listede yüzeysel kopya dahil) açıklayabilirsin." },
      { id: "h3", text: "Demetin değiştirilemez olduğunu bilip tek elemanlı demeti doğru yazabilirsin." },
      { id: "h4", text: "Demet açma (x, y = nokta) ve IndexError gibi hataları öngörüp düzeltebilirsin." }
    ],
    summary: ["Liste [ ] ile yazılır, değiştirilebilir; sıra 0'dan başlar, -1 sondur.", "liste[baş:son] dilimi baş dahil, son hariç yeni liste verir.", "append sona, insert araya ekler; remove değerle, pop sıradan siler; sort yerinde sıralar ve None döndürür, sorted yeni liste verir.", "b = a aynı listeye ikinci addır; kopya için a[:] ya da a.copy().", "Demet ( ) ile yazılır ve değişmez; tek elemanlı demet (5,) biçimindedir; x, y = (4, 7) demeti açar."],
    prereq: [5],
    minutes: 35,
    sonDogrulama: "2026-10-26",
    surum: "2026-10-v1",
    quiz: [
      {
        id: "3bf327a4",
        q: "m = [\"elma\", \"armut\", \"kiraz\"] iken m[-1] nedir?",
        options: ["elma", "armut", "kiraz", "Hata verir"],
        obj: "h1"
      },
      {
        id: "67126cc2",
        q: "m = [\"elma\", \"armut\", \"kiraz\"] iken m[1:3] nedir?",
        options: ["['armut', 'kiraz']", "['elma', 'armut']", "['armut']", "['elma', 'armut', 'kiraz']"],
        obj: "h1"
      },
      {
        id: "8231d74f",
        q: "a = [3, 1, 2]; b = a; b.append(9) sonrasında a nedir?",
        options: ["[3, 1, 2]", "[3, 1, 2, 9]", "[9]", "Hata verir"],
        obj: "h2"
      },
      {
        id: "3817a572",
        q: "sirali = a.sort() sonrasında sirali nedir?",
        options: ["None", "Sıralanmış yeni liste", "a'nın bir kopyası", "Hata verir"],
        obj: "h2"
      },
      {
        id: "3dde4742",
        q: "t = (5) yazıldığında type(t) nedir?",
        options: ["<class 'tuple'>", "<class 'list'>", "<class 'str'>", "<class 'int'>"],
        obj: "h3"
      },
      {
        id: "1b60039a",
        q: "nokta = (4, 7) iken nokta[0] = 1 ne yapar?",
        options: ["nokta (1, 7) olur", "TypeError verir", "IndexError verir", "ValueError verir"],
        obj: "h3"
      },
      {
        id: "dba564d2",
        q: "x, y = (4, 7) çalıştıktan sonra y kaçtır?",
        options: ["7", "4", "(4, 7)", "Hata verir"],
        obj: "h4"
      },
      {
        id: "ae1ddb54",
        q: "liste = [10, 20, 30] iken liste[3] ne yapar?",
        options: ["30 döndürür", "IndexError verir", "None döndürür", "KeyError verir"],
        obj: "h4"
      },
      {
        id: "441246ce",
        q: "s = [10, 20, 30, 40, 50]\nprint(s[3:10])\nkodu ne yazdırır?",
        options: ["Hata verir (IndexError)", "[40]", "[]", "[40, 50]"],
        obj: "h1"
      },
      {
        id: "68c70e6f",
        q: "s = [10, 20, 30, 40, 50]\nprint(s[::-2])\nkodu ne yazdırır?",
        options: ["[50, 40, 30, 20, 10]", "[50, 30, 10]", "[10, 30, 50]", "[40, 20]"],
        obj: "h1"
      },
      {
        id: "50f7f5c1",
        q: "a = [[1, 2], [3]]\nb = a[:]\nb[0].append(9)\nprint(a)\nkodu ne yazdırır?",
        options: ["[[1, 2], [3]]", "[[1, 2, 9], [3, 9]]", "[[1, 2, 9], [3]]", "Hata verir"],
        obj: "h2"
      }
    ],
    interview: [
      {
        q: "Liste ile demet arasındaki fark nedir?",
        a: "Liste değiştirilebilir, demet değiştirilemez. Değişmesini istemediğim sabit çiftler için demet, büyüyüp küçülen koleksiyonlar için liste kullanırım."
      },
      {
        q: "b = a ile b = a[:] farkı nedir?",
        a: "b = a aynı listeye ikinci ad verir; birinde yapılan değişiklik diğerinde de görünür. a[:] yeni bir kopya oluşturur."
      }
    ],
    vocab: [
      { term: "list", tr: "liste", ex: "A list can change." },
      { term: "tuple", tr: "demet", ex: "A tuple cannot change." },
      { term: "index", tr: "sıra numarası", ex: "The first index is zero." },
      { term: "slice", tr: "dilim", ex: "A slice returns part of a list." },
      { term: "mutable", tr: "değiştirilebilir", ex: "Lists are mutable." }
    ],
    sources: [
      { title: "Python Tutorial: Veri yapıları (liste, demet, küme, sözlük)", url: "https://docs.python.org/3/tutorial/datastructures.html" },
      { title: "Python Standart Kütüphane: Yerleşik türler", url: "https://docs.python.org/3/library/stdtypes.html" },
      { title: "Python Institute: PCEP sertifikası (güncel müfredat burada)", url: "https://pythoninstitute.org/pcep" }
    ]
  };

  /* 7 ───────────────────────────────────────────── Sözlük ve küme */
  L[7] = {
    hook: "Sözlük bir rehberdir: ada bakarsın, numarayı bulursun. Küme bir torbadır: aynı şeyden iki tane tutmaz.",
    homework: "Üç ürünün stok adedini bir sözlüğe yaz. Yeni ürün ekle, bir adedi artır, olmayan bir ürünü hem köşeli parantezle hem get() ile sorgula ve farkı gözle. Sonra iki kümeyle (iki müşterinin aldığı ürünler) ortak ve yalnızca birinde olan ürünleri bul.",
    warmup: {
      recap: [
        { point: "Önceki derste liste ve demetlerde sıra numarasıyla erişimi gördün.", example: "meyveler[0]" }
      ],
      concepts: [
        {
          term: "Sözlük (dict)",
          tr: "Anahtar ve değer çiftleri",
          summary: "Süslü parantezle yazılır; değere sıra değil anahtarla erişirsin.",
          example: "{\"kalem\": 12}"
        },
        {
          term: "Küme (set)",
          tr: "Tekrarsız, sırasız koleksiyon",
          summary: "Aynı değer tek sayılır; sıra numarası yoktur; birleşim, kesişim, fark işlemleri vardır.",
          example: "{1, 2, 3, 3} yalnız üç eleman"
        },
        {
          term: "Anahtar (key)",
          tr: "Sözlükte değeri bulduran ad",
          summary: "Anahtar değişmez olmalıdır: metin, sayı ve demet olur, liste olmaz.",
          example: "stok[\"kalem\"]"
        }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      {
        t: "box",
        h: "Gerçek talep",
        text: "Stokta kalem kaç tane? Sıra numarasını hatırlamak yerine ürün adıyla sormak istersin. Sözlük bunu yapar. Hangi farklı ürünler satıldı? sorusunu da küme tek adımda yanıtlar."
      },
      { t: "h", text: "Sözlük" },
      {
        t: "cmd",
        lang: "python",
        text: "stok = {\"kalem\": 12, \"defter\": 4}\nstok[\"silgi\"] = 30\nstok[\"kalem\"] += 3\nprint(stok)                    # {'kalem': 15, 'defter': 4, 'silgi': 30}\nprint(stok.get(\"makas\", 0))    # 0\nfor urun, adet in stok.items():\n    print(urun, adet)\nprint(\"defter\" in stok, 4 in stok)   # True False\ndel stok[\"defter\"]\nprint(list(stok.keys()))       # ['kalem', 'silgi']"
      },
      {
        t: "steps",
        h: "Sözlük kuralları",
        items: ["Olmayan anahtara köşeli parantezle erişmek KeyError verir; get(anahtar, varsayılan) hata vermeden varsayılanı döndürür.", "in operatörü anahtarlara bakar, değerlere değil.", "items() anahtar ve değer çiftlerini, keys() anahtarları, values() değerleri verir."]
      },
      { t: "h", text: "Küme" },
      {
        t: "cmd",
        lang: "python",
        text: "a = {1, 2, 3, 3}\nb = {3, 4}\nprint(len(a))                  # 3\nprint(sorted(a | b), sorted(a & b), sorted(a - b))   # [1, 2, 3, 4] [3] [1, 2]\na.add(7)\na.discard(99)                  # olmayanı silmeye çalışmak hata vermez\nprint(sorted(a))               # [1, 2, 3, 7]\nbos_sozluk = {}\nbos_kume = set()\nprint(type(bos_sozluk), type(bos_kume))   # <class 'dict'> <class 'set'>"
      },
      {
        t: "box",
        h: "Dikkat",
        text: "{} boş bir sözlüktür, boş küme set() ile kurulur. Kümenin sırası garanti edilmez, bu yüzden çıktıyı sorted() ile sırala. remove() olmayan elemanda KeyError verir, discard() vermez."
      },
      { t: "h", text: "Kendin dene" },
      { t: "alan", id: "py-7-sozluk" },
      { t: "h", text: "Bozuk kodu bul ve düzelt" },
      {
        t: "steps",
        h: "Bozuk → düzeltilmiş",
        items: ["stok[\"makas\"] makas yoksa → KeyError. stok.get(\"makas\", 0) yaz ya da önce \"makas\" in stok ile bak.", "bos = {} sonra bos.add(1) → AttributeError çünkü {} sözlüktür. Boş küme için bos = set().", "d = {[1, 2]: \"x\"} → TypeError (unhashable). Liste anahtar olamaz; demet kullan: {(1, 2): \"x\"}."]
      }
    ],
    objectives: [
      { id: "h1", text: "Sözlüğe anahtar ekleyip değer güncelleyebilir, get() ile olmayan anahtarı hatasız sorgulayabilirsin." },
      { id: "h2", text: "in, items(), keys() ve values() işlemlerinin neyi gezdiğini ya da kontrol ettiğini söyleyebilirsin." },
      { id: "h3", text: "Kümenin tekrarsız ve sırasız olduğunu bilerek eleman sayısını ve birleşim, kesişim, fark sonuçlarını bulabilirsin." },
      { id: "h4", text: "Boş küme ve sözlük yazımını ayırıp liste anahtar gibi hatalı kullanımları düzeltebilirsin." }
    ],
    summary: ["Sözlük {anahtar: değer} biçimindedir; yeni anahtar atamayla eklenir, olan anahtar güncellenir.", "Olmayan anahtara [ ] ile erişmek KeyError verir; get(anahtar, varsayılan) vermez.", "in anahtarları arar; items() çiftleri, keys() anahtarları, values() değerleri verir.", "Küme tekrarsızdır ve sırasızdır; | birleşim, & kesişim, - fark verir; discard hata vermez, remove verir.", "Boş sözlük {}, boş küme set(); sözlük anahtarı değişmez olmalıdır (liste olamaz)."],
    prereq: [6],
    minutes: 35,
    sonDogrulama: "2026-10-24",
    surum: "2026-10-v1",
    quiz: [
      {
        id: "5dafa688",
        q: "stok = {\"kalem\": 12} iken stok[\"silgi\"] = 30 çalıştırılınca len(stok) kaç olur?",
        options: ["1", "30", "2", "Hata verir"],
        obj: "h1"
      },
      {
        id: "7e3217c9",
        q: "stok = {\"kalem\": 12} iken stok.get(\"makas\", 0) ne döndürür?",
        options: ["0", "KeyError verir", "None", "\"makas\""],
        obj: "h1"
      },
      {
        id: "a4ebca0b",
        q: "\"kalem\" in stok ifadesi neye bakar?",
        options: ["Değerlere", "Anahtarlara", "Hem anahtar hem değere", "Yalnız ilk çifte"],
        obj: "h2"
      },
      {
        id: "6ead64cf",
        q: "for k, v in stok.items(): döngüsünde k ve v nedir?",
        options: ["Sırayla anahtar ve değer", "Sırayla değer ve anahtar", "İkisi de anahtar", "Sıra numarası ve değer"],
        obj: "h2"
      },
      {
        id: "dc9a1220",
        q: "a = {1, 2, 3, 3} iken len(a) kaçtır?",
        options: ["4", "2", "Hata verir", "3"],
        obj: "h3"
      },
      {
        id: "134cdf8a",
        q: "{1, 2, 3} & {3, 4} sonucu nedir?",
        options: ["{3}", "{1, 2, 3, 4}", "{1, 2}", "{4}"],
        obj: "h3"
      },
      {
        id: "94721a8e",
        q: "Boş bir küme nasıl oluşturulur?",
        options: ["{}", "[]", "()", "set()"],
        obj: "h4"
      },
      {
        id: "f5454700",
        q: "d = {[1, 2]: \"x\"} neden hata verir?",
        options: ["Liste değiştirilebilir, anahtar olamaz", "Sözlük anahtarı metin olmalıdır", "Değer olarak metin yazılamaz", "Sözlük en çok bir anahtar alır"],
        obj: "h4"
      }
    ],
    interview: [
      {
        q: "Sözlükte olmayan anahtara erişince ne olur?",
        a: "Köşeli parantezle KeyError alırım. get() kullanırsam hata yerine None ya da verdiğim varsayılan değer döner."
      },
      {
        q: "Liste yerine küme ne zaman kullanılır?",
        a: "Tekrarsız eleman gerekiyorsa ve sıra önemli değilse. Üyelik kontrolü (in) de kümede hızlıdır. Sıra gerekiyorsa liste kullanırım."
      }
    ],
    vocab: [
      { term: "dictionary", tr: "sözlük", ex: "A dictionary maps keys to values." },
      { term: "key", tr: "anahtar", ex: "Each key is unique." },
      { term: "value", tr: "değer", ex: "The value is the stock amount." },
      { term: "set", tr: "küme", ex: "A set has no duplicates." },
      { term: "union", tr: "birleşim", ex: "The union joins two sets." }
    ],
    sources: [
      { title: "Python Tutorial: Veri yapıları (liste, demet, küme, sözlük)", url: "https://docs.python.org/3/tutorial/datastructures.html" },
      { title: "Python Standart Kütüphane: Yerleşik türler", url: "https://docs.python.org/3/library/stdtypes.html" },
      { title: "Python Institute: PCEP sertifikası (güncel müfredat burada)", url: "https://pythoninstitute.org/pcep" }
    ]
  };

  /* 8 ───────────────────────────────────────────── Fonksiyonlar */
  L[8] = {
    hook: "Fonksiyon, bir işe verdiğin addır: bir kez yaz, istediğin kadar çağır. Girdisi parametre, çıktısı return'dür.",
    homework: "Bir tutar(adet, fiyat) fonksiyonu yaz ve fiyat için varsayılan değer belirle. Sonra bir siparişin tutarı 500'ü aşıyorsa 'indirimli' döndüren ikinci bir fonksiyon yaz. Bilerek return'ü silip sonucun None çıktığını görmeyi ve fonksiyonu tanımlamadan çağırınca NameError almayı dene.",
    warmup: {
      recap: [
        { point: "Önceki derslerde değişkenleri, koşulları, döngüleri ve koleksiyonları öğrendin.", example: "for urun, adet in stok.items():" }
      ],
      concepts: [
        {
          term: "Fonksiyon (function)",
          tr: "Adı olan, çağrılabilen kod bloğu",
          summary: "def ile tanımlanır; çağrılana kadar çalışmaz.",
          example: "def tutar(adet, fiyat):"
        },
        {
          term: "Parametre ve argüman",
          tr: "Tanımdaki ad ve çağrıdaki değer",
          summary: "Parametre fonksiyon tanımındadır, argüman çağrıda verilen değerdir.",
          example: "tutar(3, 2.5)"
        },
        {
          term: "Kapsam (scope)",
          tr: "Bir adın geçerli olduğu alan",
          summary: "Fonksiyonda atanan ad yereldir; dışarıdaki aynı adı değiştirmez.",
          example: "sayac = 1 fonksiyon içindeyse yereldir"
        }
      ]
    },
    blocks: [
      { t: "h", text: "Neden öğreniyoruz?" },
      {
        t: "box",
        h: "Gerçek talep",
        text: "Tutar hesabı beş farklı yerde lazım. Her yere aynı iki satırı yapıştırırsan formül değiştiğinde beş yeri düzeltmen gerekir. Bir kez yazılmış fonksiyon tek yerden düzeltilir."
      },
      { t: "h", text: "Tanımlamak ve çağırmak" },
      {
        t: "cmd",
        lang: "python",
        text: "def tutar(adet, fiyat=10.0):\n    return adet * fiyat\n\nprint(tutar(3))                # 30.0\nprint(tutar(3, 2.5))           # 7.5\nprint(tutar(fiyat=4, adet=2))  # 8\n\ndef selamla(ad):\n    print(\"Merhaba\", ad)\n\nsonuc = selamla(\"Ada\")         # Merhaba Ada\nprint(sonuc)                   # None"
      },
      {
        t: "steps",
        h: "Temel kurallar",
        items: ["def ad(parametreler): satırı iki nokta ile biter, gövde girintilidir.", "return değeri çağırana verir ve fonksiyonu hemen bitirir; return yoksa fonksiyon None döndürür.", "Varsayılan değerli parametreler sonda olur. Anahtar sözcüklü çağrıda (fiyat=4) sıra önemli değildir."]
      },
      { t: "h", text: "Kapsam" },
      {
        t: "cmd",
        lang: "python",
        text: "sayac = 10\n\ndef artir():\n    sayac = 1          # yerel ad, dıştaki sayac değişmez\n    sayac += 1\n    return sayac\n\nprint(artir(), sayac)  # 2 10\n\ndef sifirla():\n    global sayac       # dıştaki sayac'ı değiştireceğini söyler\n    sayac = 0\n\nsifirla()\nprint(sayac)           # 0"
      },
      {
        t: "box",
        h: "Dikkat",
        text: "Fonksiyon, çağrılmadan önce tanımlanmış olmalıdır; aksi halde NameError alırsın. Dışarıdaki değişkenleri global ile değiştirmek zorunda kalıyorsan çoğu zaman bunu parametre ve return ile yapmak daha temizdir."
      },
      { t: "h", text: "Kapsam: gölgeleme, global ve nonlocal" },
      { t: "cmd", lang: "python", text: "ad = \"genel\"\ndef golge():\n    ad = \"yerel\"        # yeni bir yerel ad; genel ad değişmez\n    return ad\nprint(golge(), ad)      # yerel genel\n\ntoplam = 0\ndef ekle(x):\n    global toplam       # genel adı değiştirmek için bildirim şart\n    toplam += x\nekle(5)\nekle(2)\nprint(toplam)           # 7\n\ndef dis():\n    n = 0\n    def ic():\n        nonlocal n      # dıştaki işlevin n'i\n        n += 10\n    ic()\n    return n\nprint(dis())            # 10\n\nprint(len(\"abc\"))       # 3\nlen = 5                 # yerleşik len adı artık bir sayıyı gösteriyor\n# print(len(\"abc\"))     # TypeError: 'int' object is not callable\ndel len                 # yerleşik len geri gelir\nprint(len(\"abc\"))       # 3" },
      { t: "steps", h: "Ad nerede aranır?", items: ["Python adı sırayla yerelde, çevreleyen işlevde, genelde ve yerleşiklerde arar (LEGB). Okurken dışarıya bakabilir; atama yaparken ise ad o işlevde yerel olur.","Genel ya da çevreleyen işlevdeki adı değiştirmek istiyorsan global ya da nonlocal bildirmen gerekir. Bildirmeden atarsan yeni bir yerel ad doğar ve UnboundLocalError ya da gölgeleme olur.","Çoğu zaman global yerine parametre ve return kullanmak daha temizdir: işlevin neye bağlı olduğu imzasında görünür."] },
      { t: "h", text: "Ayrılmış sözcük tuzağı" },
      { t: "cmd", lang: "python", text: "import keyword\nprint(keyword.iskeyword(\"in\"))       # True\nprint(keyword.iskeyword(\"print\"))    # False  (print bir yerleşik işlev)\nprint(keyword.iskeyword(\"True\"))     # True   (büyük harfle yazılan sabit de ayrılmıştır)\nprint(len(keyword.kwlist) > 30)      # True" },
      { t: "steps", h: "Kurallar", items: ["in, is, def, class, lambda, pass, for, if gibi ayrılmış sözcükler değişken ya da parametre adı olamaz. def f(in=1): satırı çalışmadan önce SyntaxError verir.","print, len, sum gibi yerleşik işlev adları ayrılmış sözcük değildir; kullanabilirsin ama gölgelersen işlev kaybolur. Bu yüzden onları ad olarak seçme.","Ad seçerken adet, fiyat_tl, toplam_tutar gibi anlamlı ve ayrılmışlarla çakışmayan adlar kullan."] },
      { t: "h", text: "Kendin dene" },
      { t: "alan", id: "py-8-islev" },
      { t: "h", text: "Bozuk kodu bul ve düzelt" },
      {
        t: "steps",
        h: "Bozuk → düzeltilmiş",
        items: ["def tutar(adet, fiyat): adet * fiyat → sonuç None. Gövdeye return ekle: return adet * fiyat.", "print(tutar(3)) tutar(adet, fiyat) tanımına karşı → TypeError (eksik argüman). İkisini ver ya da fiyat için varsayılan tanımla.", "selamla(\"Ada\") satırı def selamla'dan önce → NameError. Önce tanımla, sonra çağır.", "print(yerel) fonksiyon dışında, yerel fonksiyonun içinde atanmış → NameError. Değeri return ile dışarı çıkar."]
      }
    ],
    objectives: [
      {
        id: "h1",
        text: "def ile varsayılan değerli parametreleri olan bir fonksiyon tanımlayıp konumlu ve anahtar sözcüklü çağrıların sonucunu söyleyebilirsin."
      },
      { id: "h2", text: "return'ün fonksiyonu bitirip değer verdiğini ve return olmayan fonksiyonun None döndürdüğünü açıklayabilirsin." },
      { id: "h3", text: "Yerel, global ve nonlocal adların hangi değeri göstereceğini, global ve nonlocal'in ne zaman gerektiğini ve gölgelemeyi söyleyebilirsin." },
      { id: "h4", text: "Tanım sırası, eksik ya da fazla argüman, return unutma ve ayrılmış sözcüğü ad yapma gibi hataları bulup düzeltebilirsin." }
    ],
    summary: ["def ad(parametreler): ile tanımlanır; çağrılana kadar gövde çalışmaz.", "return değeri çağırana verir ve fonksiyonu bitirir; return yoksa sonuç None olur.", "Parametre tanımdaki addır, argüman çağrıdaki değerdir. Varsayılan değerler sondaki parametrelerde olur.", "Fonksiyon içinde atanan ad yereldir; dıştakini değiştirmek için global gerekir ama parametre ve return tercih edilir.", "Fonksiyon çağrılmadan önce tanımlanmalı; argüman sayısı tanımla uyuşmalıdır."],
    prereq: [7],
    minutes: 35,
    sonDogrulama: "2026-10-26",
    surum: "2026-10-v1",
    quiz: [
      {
        id: "e31e3ee3",
        q: "def tutar(adet, fiyat=10.0): return adet * fiyat tanımı için tutar(3) ne döndürür?",
        options: ["30.0", "3", "13.0", "Hata verir"],
        obj: "h1"
      },
      {
        id: "f66d0501",
        q: "Aynı tanımla tutar(fiyat=4, adet=2) ne döndürür?",
        options: ["6", "24", "8", "Hata verir"],
        obj: "h1"
      },
      {
        id: "ea4b15f7",
        q: "Fonksiyon selamla(ad) yalnız print yapıyor (return yok). s = selamla(\"Ada\"); print(s) ikinci satırı ne yazar?",
        options: ["Ada", "Merhaba Ada", "0", "None"],
        obj: "h2"
      },
      {
        id: "ffd47996",
        q: "return satırı çalışınca fonksiyon ne yapar?",
        options: ["Hemen sonlanır ve değeri çağırana verir", "Yalnız değeri yazdırır", "Sonraki satıra devam eder", "Programın tamamını sonlandırır"],
        obj: "h2"
      },
      {
        id: "47992240",
        q: "sayac = 10 dışarıda, fonksiyon içinde sayac = 1; sayac += 1; return sayac var. print(artir(), sayac) ne yazar?",
        options: ["2 2", "2 10", "11 11", "Hata verir"],
        obj: "h3"
      },
      {
        id: "ce3f7fe6",
        q: "Fonksiyon içinde global sayac satırı ne işe yarar?",
        options: ["Dıştaki sayac adını fonksiyonda değiştirmeyi sağlar", "Yeni bir fonksiyon tanımlar", "Değişkeni siler", "Sayacı sıfırlar"],
        obj: "h3"
      },
      {
        id: "f8efd608",
        q: "selamla(\"Ada\") satırı def selamla tanımından önce yazılırsa ne olur?",
        options: ["Python tanımı otomatik yukarı alır", "NameError", "TypeError", "None döner"],
        obj: "h4"
      },
      {
        id: "0988cacc",
        q: "Tanımı iki parametreli olan tutar(adet, fiyat) fonksiyonuna tutar(3, 2, 1) yazılırsa ne olur?",
        options: ["TypeError", "6", "NameError", "ValueError"],
        obj: "h4"
      },
      {
        id: "c0261298",
        q: "def dis():\n    n = 0\n    def ic():\n        nonlocal n\n        n += 1\n    ic()\n    ic()\n    return n\nprint(dis())\nkodu ne yazdırır?",
        options: ["0", "1", "2", "Hata verir"],
        obj: "h3"
      },
      {
        id: "8454804a",
        q: "sayac = 5\ndef artir():\n    print(sayac)\n    sayac = 6\nartir()\nkodu çalıştırılınca ne olur?",
        options: ["Hata verir (UnboundLocalError)", "5 yazar", "6 yazar", "5 yazar, sonra 6 yazar"],
        obj: "h3"
      },
      {
        id: "349c70de",
        q: "def fun(in=2, out=3):\n    return in + out\nkodu için hangisi doğrudur?",
        options: ["fun() çağrısı 5 döndürür", "Tanım geçer, hata fun() çağrılınca çıkar", "out ayrılmış sözcük olduğu için hata verir", "in ayrılmış sözcüktür: SyntaxError"],
        obj: "h4"
      }
    ],
    interview: [
      {
        q: "Parametre ile argüman arasındaki fark nedir?",
        a: "Parametre fonksiyon tanımındaki addır, argüman çağrıda verdiğim değerdir. def f(x) içinde x parametre, f(5) içinde 5 argümandır."
      },
      {
        q: "Fonksiyon neden return yerine print kullanmamalı?",
        a: "print yalnız ekrana yazar, değeri başka yerde kullanamam. return değeri çağırana verir; ben de saklayabilir, hesaplarda kullanabilir ve test edebilirim."
      }
    ],
    vocab: [
      { term: "function", tr: "fonksiyon", ex: "Call the function twice." },
      { term: "parameter", tr: "parametre", ex: "The function has two parameters." },
      { term: "argument", tr: "argüman", ex: "Pass an argument when you call it." },
      { term: "return value", tr: "dönüş değeri", ex: "The return value is the total." },
      { term: "scope", tr: "kapsam", ex: "A local name has local scope." }
    ],
    sources: [
      { title: "Python Tutorial: Denetim akışı (if, for, range, def)", url: "https://docs.python.org/3/tutorial/controlflow.html" },
      { title: "Python Standart Kütüphane: Yerleşik işlevler", url: "https://docs.python.org/3/library/functions.html" },
      { title: "Python Institute: PCEP sertifikası (güncel müfredat burada)", url: "https://pythoninstitute.org/pcep" }
    ]
  };
})();

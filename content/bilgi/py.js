/* Bölüm sonu bilgi testi (Faz 21) · py. Yalnız soru ve seçenekler; doğru cevap/açıklama sunucuda (ogr_bilgi_kontrol), burada YOK. */
(window.PP_BILGI = window.PP_BILGI || {}).py = {
 "1": {
  "baslik": "Değişkenler, giriş-çıkış, operatörler ve koşullar",
  "dersler": [
   1,
   4
  ],
  "sorular": [
   {
    "id": "28089f99",
    "q": "print(7 // 2, 7 % 2, 7 / 2) satırı ne yazdırır?",
    "options": [
     "4 1 3.5",
     "3 1 3.5",
     "3.5 1 3.5",
     "3 1 3"
    ]
   },
   {
    "id": "e1c4b4aa",
    "q": "Kullanıcı klavyeden 4 yazar. x = input() ardından print(x * 2) ne yazdırır?",
    "options": [
     "44",
     "8.0",
     "TypeError",
     "8"
    ]
   },
   {
    "id": "43c4e9cb",
    "q": "print(bool(\"\"), bool(\"0\"), bool(0.0)) ne yazdırır?",
    "options": [
     "False False False",
     "False True False",
     "True True False",
     "False True True"
    ]
   },
   {
    "id": "1d247335",
    "q": "puan = 70 iken: if puan >= 50: print(\"A\") / elif puan >= 60: print(\"B\") / else: print(\"C\") zinciri ne yazdırır?",
    "options": [
     "B",
     "A",
     "C",
     "A ve B"
    ]
   }
  ]
 },
 "2": {
  "baslik": "Döngüler, liste, sözlük, küme ve fonksiyonlar",
  "dersler": [
   5,
   8
  ],
  "sorular": [
   {
    "id": "bd67e96e",
    "q": "for i in range(2, 10, 3): print(i, end=\" \") ne yazdırır?",
    "options": [
     "2 5 8",
     "2 5 8 11",
     "2 4 6 8",
     "3 6 9"
    ]
   },
   {
    "id": "e7512808",
    "q": "a = [1, 2]; b = a; b.append(3); print(a, len(a)) ne yazdırır?",
    "options": [
     "[1, 2] 3",
     "[1, 2] 2",
     "[1, 2, 3] 2",
     "[1, 2, 3] 3"
    ]
   },
   {
    "id": "1a7938f9",
    "q": "print(len({1, 2, 2, 3, 3, 3}), len({\"a\": 1, \"a\": 2})) ne yazdırır?",
    "options": [
     "3 2",
     "6 1",
     "3 1",
     "6 2"
    ]
   },
   {
    "id": "711a2595",
    "q": "def kare(x): x * x satırından sonra print(kare(4)) çağrısı ne yazdırır?",
    "options": [
     "None",
     "Hata verir",
     "16",
     "4"
    ]
   }
  ]
 },
 "3": {
  "baslik": "İstisnalar, dizeler ve bit işlemleri",
  "dersler": [
   9,
   12
  ],
  "sorular": [
   {
    "id": "87e68af6",
    "q": "def f(): try: return \"a\" finally: print(\"b\", end=\"\") tanımından sonra print(f()) ne yazdırır?",
    "options": [
     "a",
     "ba",
     "b",
     "ab"
    ]
   },
   {
    "id": "f36b2e9d",
    "q": "s = \"  Python \"; s.strip(); print(len(s)) ne yazdırır?",
    "options": [
     "9",
     "6",
     "7",
     "8"
    ]
   },
   {
    "id": "c5c1d48f",
    "q": "print(6 & 3, 6 | 3, 6 ^ 3) ne yazdırır?",
    "options": [
     "7 2 5",
     "1 7 5",
     "2 7 5",
     "2 7 1"
    ]
   }
  ]
 },
 "4": {
  "baslik": "Algoritmalar, iç içe listeler, özyineleme ve üreteçler",
  "dersler": [
   13,
   16
  ],
  "sorular": [
   {
    "id": "c85bed14",
    "q": "t = [[0] * 2] * 2; t[0][0] = 1; print(t) ne yazdırır?",
    "options": [
     "[[1, 1], [1, 1]]",
     "[[1, 1], [0, 0]]",
     "[[1, 0], [0, 0]]",
     "[[1, 0], [1, 0]]"
    ]
   },
   {
    "id": "2eec3377",
    "q": "def f(n): return 1 if n <= 1 else n * f(n - 1) tanımından sonra print(f(5)) ne yazdırır?",
    "options": [
     "625",
     "24",
     "120",
     "15"
    ]
   },
   {
    "id": "c17edbab",
    "q": "def g(): yield 1; yield 2 tanımından sonra a = g(); print(next(a), next(a)) ne yazdırır?",
    "options": [
     "[1, 2]",
     "1 1",
     "StopIteration hatası",
     "1 2"
    ]
   },
   {
    "id": "1425d041",
    "q": "Kabarcık sıralama [5, 1, 4, 2] listesinde yalnız İLK dış turu (baştan sona komşu karşılaştırmaları) bitirdiğinde liste nedir?",
    "options": [
     "[5, 1, 4, 2]",
     "[1, 2, 4, 5]",
     "[1, 5, 4, 2]",
     "[1, 4, 2, 5]"
    ]
   }
  ]
 }
};

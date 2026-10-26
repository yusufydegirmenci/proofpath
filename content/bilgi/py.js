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
     "3 1 3",
     "4 1 3.5",
     "3.5 1 3.5",
     "3 1 3.5"
    ]
   },
   {
    "id": "e1c4b4aa",
    "q": "Kullanıcı klavyeden 4 yazar. x = input() ardından print(x * 2) ne yazdırır?",
    "options": [
     "TypeError",
     "8",
     "8.0",
     "44"
    ]
   },
   {
    "id": "43c4e9cb",
    "q": "print(bool(\"\"), bool(\"0\"), bool(0.0)) ne yazdırır?",
    "options": [
     "False True True",
     "False True False",
     "False False False",
     "True True False"
    ]
   },
   {
    "id": "1d247335",
    "q": "puan = 70 iken: if puan >= 50: print(\"A\") / elif puan >= 60: print(\"B\") / else: print(\"C\") zinciri ne yazdırır?",
    "options": [
     "B",
     "C",
     "A",
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
     "2 4 6 8",
     "2 5 8",
     "3 6 9",
     "2 5 8 11"
    ]
   },
   {
    "id": "e7512808",
    "q": "a = [1, 2]; b = a; b.append(3); print(a, len(a)) ne yazdırır?",
    "options": [
     "[1, 2] 3",
     "[1, 2, 3] 3",
     "[1, 2] 2",
     "[1, 2, 3] 2"
    ]
   },
   {
    "id": "1a7938f9",
    "q": "print(len({1, 2, 2, 3, 3, 3}), len({\"a\": 1, \"a\": 2})) ne yazdırır?",
    "options": [
     "6 1",
     "3 2",
     "3 1",
     "6 2"
    ]
   },
   {
    "id": "711a2595",
    "q": "def kare(x): x * x satırından sonra print(kare(4)) çağrısı ne yazdırır?",
    "options": [
     "4",
     "16",
     "None",
     "Hata verir"
    ]
   }
  ]
 },
 "3": {
  "baslik": "İstisnalar, dizeler, bit işlemleri ve iç içe listeler",
  "dersler": [
   9,
   16
  ],
  "sorular": [
   {
    "id": "87e68af6",
    "q": "def f(): try: return \"a\" finally: print(\"b\", end=\"\") tanımından sonra print(f()) ne yazdırır?",
    "options": [
     "ba",
     "ab",
     "b",
     "a"
    ]
   },
   {
    "id": "f36b2e9d",
    "q": "s = \"  Python \"; s.strip(); print(len(s)) ne yazdırır?",
    "options": [
     "6",
     "9",
     "8",
     "7"
    ]
   },
   {
    "id": "c5c1d48f",
    "q": "print(6 & 3, 6 | 3, 6 ^ 3) ne yazdırır?",
    "options": [
     "1 7 5",
     "7 2 5",
     "2 7 1",
     "2 7 5"
    ]
   },
   {
    "id": "4e049b0c",
    "q": "t = [[0] * 2] * 2; t[0][0] = 1; print(t) ne yazdırır?",
    "options": [
     "[[1, 1], [0, 0]]",
     "[[1, 0], [1, 0]]",
     "[[1, 1], [1, 1]]",
     "[[1, 0], [0, 0]]"
    ]
   }
  ]
 }
};

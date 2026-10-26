/* Bölüm sonu bilgi testi (Faz 21) · js. Yalnız soru ve seçenekler; doğru cevap/açıklama sunucuda (ogr_bilgi_kontrol), burada YOK. */
(window.PP_BILGI = window.PP_BILGI || {}).js = {
 "1": {
  "baslik": "Değişkenler, türler, işleçler ve doğruluk değeri",
  "dersler": [
   1,
   4
  ],
  "sorular": [
   {
    "id": "41374938",
    "q": "console.log(typeof null, typeof undefined) ne yazdırır?",
    "options": [
     "object object",
     "undefined undefined",
     "object undefined",
     "null undefined"
    ]
   },
   {
    "id": "61253beb",
    "q": "console.log(\"5\" + 3, \"5\" - 3) ne yazdırır?",
    "options": [
     "8 2",
     "53 53",
     "53 2",
     "8 8"
    ]
   },
   {
    "id": "89a71d43",
    "q": "const toplam = 10; toplam = 20; satırları çalışınca ne olur?",
    "options": [
     "TypeError fırlatılır",
     "Kod hiç çalışmaz (SyntaxError)",
     "Sessizce yok sayılır",
     "toplam 20 olur"
    ]
   },
   {
    "id": "9a06bbc4",
    "q": "console.log(Boolean(\"0\"), Boolean([]), Boolean(NaN)) ne yazdırır?",
    "options": [
     "false true false",
     "true true false",
     "false false true",
     "true false false"
    ]
   }
  ]
 },
 "2": {
  "baslik": "Döngüler, diziler, nesneler ve fonksiyonlar",
  "dersler": [
   5,
   8
  ],
  "sorular": [
   {
    "id": "56f7cb1e",
    "q": "let n = 5; do { console.log(n); n++; } while (n < 5); kodu ne yapar?",
    "options": [
     "Hiçbir şey yazmaz",
     "5 ve 6 yazar, sonra durur",
     "5, 6, 7 diye sonsuza kadar yazar",
     "5 yazar, sonra durur"
    ]
   },
   {
    "id": "e96e2fb8",
    "q": "[3, 8, 1].filter((x) => x > 2).map((x) => x * 2) ifadesinin sonucu nedir?",
    "options": [
     "[true, true, false]",
     "[3, 8]",
     "[6, 16, 2]",
     "[6, 16]"
    ]
   },
   {
    "id": "02a7ec4f",
    "q": "const a = { n: 1 }; const b = a; b.n = 2; console.log(a.n) ne yazdırır?",
    "options": [
     "undefined",
     "TypeError fırlatılır",
     "2",
     "1"
    ]
   },
   {
    "id": "abfed4f7",
    "q": "const f = (x) => { x * 2 }; console.log(f(4)) ne yazdırır?",
    "options": [
     "Hata verir",
     "undefined",
     "NaN",
     "8"
    ]
   }
  ]
 }
};

"use strict";
/* ALAN: ders konu haritası (TMAP). NE YAPAR: her hat için konu başlığı, kanca, mikro adımlar ve ön bilgi; sınıf/ders/plan sekmeleri buradan okur.
   Faz 37'de tek dosyadan (423 KB) hat başına dosyaya bölündü: bu dosya yalnız boş TMAP'i açar, js/veri/tmap-<hat>.js dosyaları hat dizilerini ekler (SIRA önemli: tmap.js önce).
   SORUN OLURSA: bir hat boş görünüyorsa index.html'de ilgili tmap-<hat>.js etiketi eksik/sırasız olabilir. YENİ HAT/KONU: ilgili tmap-<hat>.js dosyasına ekle; yeni hat için yeni dosya + index.html etiketi + STARTER (js/sinif/sinif.js) eşlemesi + tests/faz5c_net.js benzeri sayım testi. */
var TMAP={};

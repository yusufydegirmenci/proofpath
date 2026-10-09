# Proofpath içerik paketi şartnamesi

Yusuf (Ankara, BT yöneticisi, git/CCNA/İngilizcede başlangıç düzeyi, bilgisayar programcılığı ön lisans) için bir öğrenme uygulamasına yeni bir DERS (track) içeriği yazıyorsun.
Dil: TÜRKÇE (samimi ama net, "kanka" tonu YOK; sade ve saygılı), terimler ilk geçtiği yerde Türkçe açıklanıp İngilizcesi yanında. Kısa cümleler (en çok ~20 kelime). Markdown işareti (**, #, `) KULLANMA, düz metin yaz. Emoji kullanma. Uydurma bilgi, uydurma rakam, uydurma link YOK: her olgusal iddia (port, komut, sınav ağırlığı, sürüm) doğru olmalı. Emin olmadığın şeyi yazma. WebSearch/WebFetch ile resmî kaynaklardan doğrula (resmî sınav hedefleri/müfredat). Dump/ezber kaynağı önerme.

## Dosya
Şu yolda TEK bir Python dosyası yaz: `<çıktı_dizini>/<id>_pack.py`. İçinde şu değişkenler olmalı (Python 3, UTF-8, sadece düz veri; import olarak yalnızca aşağıdaki T yardımcısı):

```python
import sys; sys.path.insert(0,'/tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/tm')
from ccna import T

TRACK={"id":"net","name":"Network","cert":"CompTIA Network+ N10-009","blurb":"1-2 cümle: bu ders kime ne kazandırır"}
CERT_FACTS=["Sınav kodu ve sürüm...","Soru sayısı, süre, geçme puanı (resmî kaynaktan)","Alan ağırlıkları: ..."]   # 3-5 madde, resmî kaynaktan doğrulanmış
CERT_LINK="https://..."     # çalıştığını WebFetch ile doğrula

TOPICS=[  # 16-18 konu, öğrenme sırasıyla (temelden ileriye). Her biri (konu_adı, grup, kısa_benzetme_cümlesi, T(...))
 ("Konu adı","Grup adı","Gündelik hayattan tek cümlelik çizilebilir benzetme.",
  T("Konu başlığı (kısa)","Merak uyandıran gündelik soru?",
    [["Terim 1","kısa açıklama"],["Terim 2","..."],["Terim 3","..."],["Terim 4","..."]],   # TAM 4 terim
    "Neden öğreniyoruz: 1-2 cümle.",
    "Örnek / komut / küçük şema (çok satır \\n ile ayrılır, düz metin).",
    [["Bu bozulursa","sonuç"],["Şu yanlış yapılırsa","sonuç"]],                           # TAM 2 satır
    [["Soru?","DOĞRU cevap","yanlış 1","yanlış 2"],["...","...","...","..."],["...","...","...","..."]],  # TAM 3 soru, doğru cevap HER ZAMAN ilk eleman
    ["Hedef 1","Hedef 2","Hedef 3"],                                                       # TAM 3
    "Sonunda şunu yapabileceksin: ...",
    None)),                                                                                # istersen karşılaştırma tablosu: {"a":"A","b":"B","r":[["Satır","A değeri","B değeri"],...]}
]

QB=[  # 48-60 soru. d: 1 kolay, 2 orta (senaryo), 3 zor (karma senaryo). Dağılım: d1 en az 16, d2 en az 18, d3 en az 12.
 {"t":"net","d":1,"q":"Soru metni?","o":["A","B","C","D"],"a":2,"w":"Kısa açıklama: neden doğru, yanlışlar neden yanlış."},
]   # TAM 4 seçenek, a = doğru şıkkın indeksi (0-3), doğru şık indekslerini çeşitle (hepsi aynı olmasın), seçenekler tekrar etmesin, "Hepsi/Hiçbiri" şıkkı kullanma, sorular birbirinin kopyası olmasın.

ATLAS=[  # 26-32 kavram kartı
 {"g":"Grup","t":"Terim (English)","tr":"Gündelik kısa etiket","l":1,"d":"Tanım 1-2 cümle.","b":"Gündelik benzetme.","x":"Örnek / komut (çok satır \\n ile).","s":"One English sentence using the term in a work context.","e":"Tipik yanılgı / yaygın hata.","q":"Kendini sına sorusu?","a":"Cevap + kısa neden."},
]   # l: 1,2,3 (zorluk). Tüm alanlar zorunlu.
```

## Kalite kuralları
- Konular resmî sınav hedeflerini/müfredatı KAPSAMALI; ağırlığı yüksek alanlara daha çok konu ayır. Sınav hedefleriyle konu eşlemesini TOPICS grup adlarında yansıt.
- Teknik doğruluk: komutlar, portlar, protokol davranışları, sürüm numaraları gerçek ve güncel olmalı (şu an Ekim 2026).
- Soru bankası: gerçek mülakat/sınav mantığında; "hangisi doğrudur" kalıbına sıkışma; senaryo ve neden-sonuç sorusu çeşitli olsun. Yanlış şıklar mantıklı (makul yanılgılar) olsun. Cevap uzunluğu doğruyu ele vermesin.
- Atlas kartları kavram başına tek kart; terim adı konu başlıklarındaki adlarla uyumlu.
- Güvenlik/etik: yalnız savunma ve kendi lab ortamı.
- Maliyet riski olan bulut kaynaklarından bahsedersen silme/maliyet uyarısını ekle.

## Doğrulama
Bitirince şunu çalıştır ve hatasız geçene kadar düzelt:
`python3 /tmp/claude-0/-home-claude/2f9ec0d3-f68e-527e-8038-1b5be7abf989/scratchpad/packs/validate_pack.py <dosya>`
Sonunda kısa bir rapor yaz (kaç konu/soru/kart, hangi resmî kaynaklarla doğruladın, emin olmadığın noktalar).

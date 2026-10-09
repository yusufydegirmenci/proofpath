# Animasyon Atölyesi — v2 sahne yazım şartnamesi

Yusuf'un öğrenme uygulaması (Proofpath) için KISA HAREKETLİ SAHNELER yazıyorsun. Hedef üslup: "Networking with ..." tarzı kısa eğitim videoları — açık stüdyo zemini, gerçekçi cihaz ikonları, renkli kablolar, kablo boyunca akan parlak paketler, koyu etiket kutuları, kamera yakınlaşması, başlık kartı (renkli şerit) ve son kartta "= ..." özet cümlesi.
Sen yalnızca JSON sahne verisi yazıyorsun; motor (çizim, kamera, paket animasyonu, etiket yerleşimi) hazır.
Dil: Türkçe, sade ve saygılı (kanka tonu YOK), terimler ilk geçişte Türkçe + parantezde İngilizce. Düz metin (markdown yok). Uydurma bilgi/rakam YOK; emin olmadığın şeyi yazma (port, protokol davranışı, komut, sürüm doğru olmalı; şu an Ekim 2026).

## Dosya
`<çıktı>.json` = sahne dizisi `[ {...}, {...} ]`. Doğrulama: `python3 nwval.py <dosya>` (TAMAM çıkana kadar düzelt). Görsel kontrol: `NWPAGE=page_dbg_nw.html node nwprev.js <dosya> <senin_cikti_klasorun> 0.5` — her sahnenin her adımı için PNG üretir (`<id>-00.png` ...) ve yerleşim sorunlarını yazar (çakışma, sınır dışı, link etiketi düğüm üstünde...). PNG'leri Read ile AÇIP BAK: kompozisyon dengeli mi, okunuyor mu, hikâye anlaşılıyor mu. "problems 0" olana kadar düzelt. (Bu komutları scratchpad klasöründe çalıştır; paylaşılan page_dbg_nw.html'e DOKUNMA, akademi.html'e DOKUNMA.)
Örnek sahne: `nwscenes/ccna_example.json` (önce oku, üslubu ve alanları kopyala).

## Sahne alanları
```
{"v":2,"id":"cc-ospf","t":"Kısa ad","title":"Başlık kartı metni (en çok 46 harf)","one":"Tek cümle özet.",
 "trs":["ccna","net"],            // hangi derslerde görünür; ilki ana ders (ccna net eng sec bk dev qa)
 "rx":"ospf|komşu|link[- ]state", // bu sahneyi ders başlığına bağlayan regex (Türkçe+İngilizce anahtarlar, i bayrağıyla)
 "icon":"router",                 // (ops.) hub kartı ikonu; yoksa ilk düğüm
 "nodes":[{"id":"r1","k":"router","x":180,"y":120,"l":"R1","s2":"10.0.0.1","hide":true,"sc":1.2}],
 "links":[{"a":"r1","b":"s1","k":"eth","cv":-18,"l":"Gi0/1","lt":.5}],
 "steps":[{"c":"Adım açıklaması (en çok 170 harf)", ...}],
 "result":"Özet cümlesi (en çok 90 harf)",
 "notes":["Akılda kalsın 1","2","3"],          // 3-4 madde
 "q":[{"q":"Soru?","o":["A","B","C","D"],"a":0,"w":"Neden doğru"}] }   // 2-3 soru, TAM 4 şık, doğru şık indeksi çeşitli (hep 0 olmasın)
```
Düğüm: `k` ikon türü: router switch pc laptop phone server db cloud globe ap user people lock key doc container pod gear pipe bug check cross branch mail clip chart cube shield clock term queue bucket lambda lb code bell book printer wrench cert bulb rocket flag target firewall home office car light usb cart (+ takma adlar: workstation modem l3 internet web storage vm docker k8s ci build deploy git test dns cdn waf s3 fn api tls log email monitoring alert goal tool terminal team ...). Gerekirse `{"k":"emoji","e":"🍕"}`. `l`= alt etiket (kısa), `s2`= mono renkli ikinci satır (IP, port, sürüm), `hide:true` = başlangıçta görünmez (bir adımdaki `show` ile belirir; bağlı linkler de birlikte belirir), `sc` ölçek (0.8–1.4), `c` ikon vurgu rengi.
Link: `k`: eth (mavi kablo) cat7 (mor kablo) fiber (turuncu) wifi (kesikli gri) ser (kırmızı) vpn (yeşil kesikli) flow (ok başlı, süreç/ boru hattı akışı için) thin warn. `cv`: eğrilik (±10..30; aynı yönde iki kablo yan yana gidecekse farklı işaret). `l`: kablo üstü kısa etiket (≤16 harf), `lt`: etiketin kablo üzerindeki konumu 0..1 (düğümlerin etiketine çarpmasın). Paketler yalnızca LİNK olan düğümler arasında kablo boyunca akar; link yoksa düz çizgi çizer — mümkünse hep link tanımla.
Adım: 
- `c` açıklama (alt şeritte yazılır)
- `p`: paketler `[["kaynak","hedef","tür","etiket",["via1","via2"]]]` tür: env (zarf, mavi) data (mavi) ok (yeşil) bad (kırmızı) key (sarı) req (mor zarf) res (yeşil zarf). `via` ara düğümler (kablo zinciri). Birden çok paket sırayla 0.75 sn arayla çıkar; etiket ≤14 harf.
- `tag`: koyu etiket kutuları `[["düğüm","METİN","dark|blue|green|red|amber|light"]]` (≤48 harf; değer/ayar/başlık göstermek için: "DEFAULT GATEWAY: 192.168.1.1", "TTL = 64", "PORT 443")
- `say`: konuşma balonu `[["düğüm","METİN"]]` (≤56 harf; kişi/cihazın "ağzından" kısa cümle)
- `mark`: `[["düğüm","ok"|"x"|"?"|"!"]]` sağ üst köşe rozeti (yeşil tik, kırmızı çarpı, sarı soru, kırmızı ünlem)
- `hi`: parlayan düğümler; `dim`: soluklaşan düğümler; `show`: bu adımda belirecek gizli düğümler (kalıcı)
- `cam`: `[x,y,zoom]` elle kamera (zoom 1–1.8) ya da `0` = geniş plan; verilmezse motor hi/tag/say/paket düğümlerine otomatik yakınlaşır.
Etiketler/balonlar otomatik yerleştirilir (düğüme göre üst/alt/yan, çakışmayı kaçınır); yine de çok sayıda tag+say koyma (adım başına en çok 3 tag/say toplam).

## Tasarım kuralları (kalite çıtası)
- Tuval 360x400. Düğümleri x 40–320, y 95–315 aralığına yerleştir: ilk adımda üst-solda başlık kartı, son adımda altta özet kartı çıkar (bu bölgeleri boş bırak). Düğümler arası en az 70 birim; kalabalık yapma (en çok 9-10 düğüm; çoğu sahnede 5-8).
- Hikâye kur: gündelik bir durumla başla ("Ayşe dosyayı yazıcıya gönderiyor"), sebep→sonuç sırasıyla ilerle, yanlış/bozuk senaryoyu da göster (kırmızı paket, çarpı rozeti) ve düzeltmeyi göster. Adım 1 geniş plan (cam:0) ve sahnenin tüm oyuncularını tanıtsın; sonraki adımlar kamerayla ilgili bölgeye yakınlaşsın.
- 6-8 adım. Her adımda tek bir fikir; açıklama (`c`) Türkçe, 1-2 kısa cümle (≤170 harf). Terimi sahnede GÖSTER (paket, etiket, rozet) — sadece anlatma.
- Teknik doğruluk önce gelir: gerçek adres örnekleri (RFC 1918: 192.168.x.x, 10.x.x.x), doğru portlar, doğru sıralama. Örnek komutları sahnede kullanacaksan doğru olsun.
- Her sahne farklı bir fikir/benzetme içersin; aynı yerleşimi kopyalama (üst router, alt PC'ler şablonu tek sahnede yeter).
- Notlar (`notes`) sahneyi özetleyen 3 akılda-kalıcı cümle; sorular (`q`) sahnenin kavramını ölçsün (ezber değil, durum sorusu), şıklar makul yanıltıcı olsun, doğru şık uzunluğu ele vermesin.
- `rx`: sahneyi bağlamak istediğin DERS konularının adlarını kapsasın (`nwin/topics_by_track.txt` içinde ders konu başlıkları var; kendi dersinin başlıklarına bak). Çok genel kelime kullanma (ör. "ağ", "test" tek başına olmaz).
- id'ler tüm dersler arasında benzersiz: kendi önekini kullan (yalnız "değiştirilecek" dediğimiz v1 id'leri aynen kullanılabilir — bu durumda eski sahnenin yerine geçer; v1 listesi `nwin/v1_scenes.txt`).
- Emoji kullanma (özel `emoji` ikonu hariç), İngilizce başlık kartı yazma (Türkçe).
Sonunda kısa rapor: kaç sahne, hangileri hangi konuya bağlı, emin olmadığın teknik noktalar.

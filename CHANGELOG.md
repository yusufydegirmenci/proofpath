# CHANGELOG

## Faz 4 (dal: faz-4)
- Tek tanım: ders tamamlama, ustalık ve seri hesapları `PP.ogr` altında toplandı (`PP.ogr.ilerleme`, `PP.ogr.ustalik`, `PP.ogr.seri`, `PP.ogr.kapi.miniSinav`, `PP.ogr.kapi.rutbeKosullari`, `PP.ogr.tekrar.ARALIK`). Eski işlev adları (`lcDone`, `lessonsDone`, `starterTopics`, `stageOf`, `mastLevels`, `plLevel`, `plBand`, `gsAnswer`, `streakInfo`, `gmStreak`, `deskState`, `gateList` …) korunur ve bu tanımlara devreder. `js/ogrenme/` betikleri çekirdek koddan önce yüklenir.
- Davranış değişiklikleri: (1) tamamlanan ders sayısı artık iki kaynağın birleşimi (ders kayıtları ∪ tamamlanmış konular, aynı kimlik bir kez), eskiden büyük olanı alınıyordu; (2) mini sınav adımı yalnız en az %80 doğru ile tamamlanır (eskiden tüm soruları cevaplamak yetiyordu); daha önce tamamlanmış mini sınav kayıtları geçerli kalır; sıradaki ders bu kapıyı bekler.
- Mini sınav: sonuçta geçme eşiği, başarısızlıkta hedefli telafi önerisi ve "Yeniden dene" (farklı soru seti yoksa bu açıkça yazılır). Her deneme ayrı kayıt olarak eklenir.
- Açıklama modları: ders anlatımında 8 mod (Tam anlatım, Kısa özet, Benzetmeyle, Adım adım, Örnekle, Bozulursa ne olur, Gerçek durumlar, Mülakat dili); hepsi dersin aynı konu haritasından, tercih kalıcı.
- Tekrar kuyruğu (Bugün): kalınan mini sınavlar telafi öğesi, geçilenler 1/3/7/14/30 gün aralıkla tekrar öğesi olarak "neden bugün" açıklamasıyla görünür; deneme kayıtlarından hesaplanır (kalıcı, cezasız).
- "Tümünü sıfırla" öğrenme modeli kaydını (`ya_pp_ogr`) da kaldırır; sıfırlama yedeğine eklenir. Başka bir yerde silme yok.
- Testler: `tests/faz4_entegrasyon.js` (yeni), `tests/ogrenme.js` ve `tests/hesaplar.js` genişletildi (değişen beklenen değerler gerekçeli), `tests/t57b_mynotes.js` ekran görüntüsünden önce elemanın kararlı olmasını bekler.

## Faz 3 (dal: faz-3)
- Öğrenme modeli (`js/ogrenme/`, tek ad alanı `window.PP.ogr`): yetkinlik grafiği ve önkoşullar, değerlendirme hedefleri, deneme/kanıt kaydı, kapılar (varsayılan %80 eşik, kritik hedefler tek tek, her kilidin nedeni), Altın Vuruş / Bütünleşik / Joker üreticileri, hedefli telafi ve varyant seçimi, içerik sürümü, yollar arası aktarım kuralı.
- Mevcut ders içeriğinden (`STARTER`, `PATHS`) kurulan tek grafik; eski kayıtlar (`ya_lc`, `ya_gs`, `ya_lv`, `ya_pl`) yalnız okunur, biçimleri ve anahtarları değişmedi. Yeni depolama anahtarı: `ya_pp_ogr`.
- Arayüz: Ders ekranında "Ustalık ve kapılar" paneli (önkoşullar, kilit nedenleri, telafi önerisi); ders yolundaki kilitli satır nedenini söyler. Sıralı ders kilidi davranışı değişmedi.
- Testler: `tests/sira.js` (yükleme sırası denetimi, acorn), `tests/hesaplar.js` (mevcut XP/seri/rütbe/seviye/sınav hesaplarını sabitler), `tests/ogrenme.js` (model birim testleri), `tests/ogrenme_tarayici.js` (uygulamadaki bağlama). `.gitignore`: `/*.png`. README mimari bölümü güncellendi.
- `supabase/migrations/20261012_ogrenme_guvenilir_ustalik.sql`: sunucu tarafı puanlama/kapı taslağı (uygulanmadı).

## Faz 2B (dal: faz-2b)
- supabase-js betiği yayımlanmış dosyaya (`dist/umd/supabase.js`) çevrildi, SRI karması yeniden hesaplandı.
- `index.html` davranışı korunarak birimlere ayrıldı (2,0 MB → ~81 KB): 7 stil dosyası (`css/`), 7 veri dosyası (`js/veri/`) ve 50 kod birimi (`js/`). Uygulama artık tek bir sarmalayıcı işlev değil, küresel kapsamda sırayla yüklenen klasik betiklerdir (`"use strict"` her dosyada korunur). Derleme adımı yok; rota, URL, depolama anahtarları ve veri biçimleri değişmedi.
- Testler: bayat testler yeni akışa güncellendi (assert gevşetilmedi), `make-dbg` yeni yapıya dayanıklı, zaman aşımı varsayılanı 420 sn, `TESTING.md` yenilendi.

## Faz 1B (dal: faz-1b)
- supabase-js betiği tam sürüme (`2.117.3`) sabitlendi, bütünlük (SRI) denetimi eklendi.
- `supabase/migrations/` eklendi: `docs` politikaları için yeni migration dosyası (uygulanmadı).
- Testler: `tests/make-dbg.js` (hata ayıklama kancalı `tests/page_dbg.html` üretir), `tests/kritik_akis.js` (ders, ilerleme, sınav, seri, ayar için gerçek assert'ler), eski akış testi `tests/emekli/` altına taşındı, `npm test` varsayılan zaman aşımı 90 sn.

## Faz 2A
- Test altyapısı: `package.json`, `npm test`, `tests/run-all.js`, sabit yolların göreliye çevrilmesi, `TESTING.md`.

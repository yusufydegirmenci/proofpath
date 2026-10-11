# ProofPath faz promptları

Tarih: 2026-10-11 · Kaynak: `PROOFPATH_MASTER.md` §21 ve `master-prompt-faz-haritasi.md`.
Her blok kendi başına yeter: yürütücü Claude Code oturumuna olduğu gibi kopyalayıp yapıştır. Fazları sırayla ver; bir faz bitip raporu `faz-<N>` dalına itilmeden sonrakini verme.

## Nasıl kullanılır

- Sıra: **2A (sürüyor) → 1B → 2B → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10 → 11.** 1B, Faz 1'in yapılmayan düzeltme yarısı; 2A'nın kurduğu test ağına dayandığı için ondan sonra geliyor.
- Her faz kendi dalında çalışır ve bir önceki faz dalından açılır. `main`'e hiçbir şey gitmez; canlı siteye ne zaman geçileceğine sen karar verirsin.
- 2B, 5 ve 10 tek oturumda bitmeyebilir. Aynı promptu tekrar ver; aynı dalda devam eder, rapora yeni tur ekler.
- Her faz bitince bana "Faz N bitti" demen yeterli; raporu `faz-<N>` dalından okuyup analiz notunu notlar dalına yazarım.
- Promptlar kısa, çünkü ayrıntı repoda: rapor formatı `docs/faz-raporlari/README.md`, kabul ölçütleri `docs/analiz/master-prompt-faz-haritasi.md` §4. Yürütücü bunları `git show` ile okur, keşfi tekrarlamaz.

## Faz 2A için eklenecek not (zaten çalışan oturuma)

Faz 2A promptunda "push yok" ve "docs/'a dokunma" vardı. Yeni düzene uyması için çalışan oturuma şunu yaz:

```
Ek talimat: Push yasağı kalkıyor, yalnız bu dal için. İşin bitince (ve bundan sonra her önemli değişiklikte) commit'lerini `git push -u origin HEAD:faz-2a` ile faz-2a dalına it; main'e push, force-push ve deploy yok. Sonra `git fetch origin && git show origin/claude/project-thread-5kc0zn:docs/faz-raporlari/README.md` ile rapor formatını oku, docs/faz-raporlari/faz-2a.md raporunu o formatta yaz (docs/ yasağının tek istisnası bu klasör), commit edip aynı dala push et.
```

## Faz 1B — Stabilizasyon (Faz 1'in yarım kalan düzeltme kısmı)

Önceki faz: `faz-2a` · Dal: `faz-1b`

```
Proofpath Faz 1B: Faz 1'de raporlanan P1 sorunlarını kapat ve kayıtları repoya taşı. Uygulama davranışını değiştirme (güvenlik düzeltmeleri hariç).
Master bölümleri: §2.2, §4, §17.2–17.3, §21 Faz 1.

YAPILACAKLAR
1. Kayıtlar repoya: çalışma klasöründeki AUDIT.md, FEATURE_INVENTORY.md, NEXT_STEPS.md'yi repo köküne commit et. Eksik kayıtları oluştur: ARCHITECTURE.md, DATA_MODEL.md (docs/VERI_SEMASI.md'ye bağla, kopyalama), SECURITY.md, ROADMAP.md, IMPLEMENTATION_STATUS.md, CHANGELOG.md, REFACTOR_MAP.md (yalnız iskelet + Faz 2B için birim listesi önerisi). Kısa tut, Faz 1 bulgularını kaynak göster.
2. P1-5: index.html'deki supabase-js CDN betiğini tam sürüme sabitle ve SRI (integrity + crossorigin) ekle. smoke ile doğrula.
3. P1-1 ve P1-2: supabase/migrations/<tarih>_rls_coll.sql dosyası yaz: docs_insert/update'te coll değerinin yoldan türediğini zorla; lig için yalnız gereken alanları açan bir görünüm öner. Canlıya uygulama. SECURITY.md'ye "uygulanmadı, kullanıcı onayı ve Supabase erişimi gerekli" yaz.
4. P1-6: index.html ile content/akademi.src.html arasında kaynak kararı. Varsayılan: canlıda çalışan index.html kaynaktır. Hiçbir dosyayı silme; kararı ve farkı ARCHITECTURE.md'ye yaz.
5. P1-7 (çok cihaz çakışması): düzeltme yok; ROADMAP.md'de Faz 9'a kaydet.
6. §17.2 auth kontrolleri (çift kayıt, şifre sıfırlama, hesap silme + yeniden kayıt, izolasyon): Supabase erişimi yok; kodu okuyarak riskleri SECURITY.md'ye "test edilmedi" etiketiyle yaz.

DOKUNABİLECEĞİN DOSYALAR
index.html (yalnız supabase-js script satırı), supabase/migrations/ (yeni), repo kökündeki kayıt .md dosyaları, docs/faz-raporlari/, tests/ (yalnız yeni test eklemek için).

ORTAK KURALLAR
- Keşfi tekrarlama. Önce yalnız şunları oku:
  git fetch origin
  git show origin/main:docs/faz-raporlari/README.md || git show origin/claude/project-thread-5kc0zn:docs/faz-raporlari/README.md
  git show origin/faz-2a:docs/faz-raporlari/faz-2a.md
  git show origin/claude/project-thread-5kc0zn:docs/analiz/master-prompt-faz-haritasi.md  (yalnız §4 "Faz 1" bölümü)
  PROOFPATH_MASTER.md'den yalnız yukarıda adı geçen bölümler.
- Dal: git checkout -b faz-1b origin/faz-2a. Taban dalı yoksa dur ve bildir.
- Her önemli değişiklikten sonra: ilgili testleri koş (en az npm run test:smoke), küçük commit at, git push -u origin faz-1b. main'e push, force-push, merge ve deploy yok.
- Secret/anahtar/token isteme, kullanma, commit etme. Supabase'e veya canlı servise bağlanma; SQL değişikliği yalnız supabase/migrations/ altında dosya olarak yazılır, uygulanmaz.
- Yukarıdaki "DOKUNABİLECEĞİN DOSYALAR" dışına dokunma; kapsam dışı hata bulursan düzeltme, rapora yaz.
- Testi geçirmek için assert zayıflatma, test silme/atlama yok. Kullanıcı verisini silen/sıfırlayan değişiklik yok; depolama anahtarları ve formatları geriye uyumlu kalır.
- Yalnız gerçekten çalıştırdığın komutun sonucunu "doğrulandı" yaz; gerisi "varsayım" ya da "test edilmedi".
- Alt ajan ve oh-my-claudecode modları yok; doğrudan çalış.
- Bitiş: docs/faz-raporlari/faz-1b.md raporunu README'deki formatla yaz (yapılanlar, yapılmayanlar ve nedeni, testlerin gerçek sonuçları, doğrulanan/varsayılan, riskler, sonraki faza bağımlılıklar). NEXT_STEPS.md ve fazın kayıtlarını güncelle. Commit + push. Sonra Türkçe kısa özet: dal, son commit, test sayıları, en önemli 3 risk.
```

## Faz 2B — Modüler mimari ve refaktör (tekrarlanabilir)

Önceki faz: `faz-1b` · Dal: `faz-2b`

```
Proofpath Faz 2B: index.html monolitini davranışı koruyarak birim birim ayır.
Master bölümleri: §3, §3.1, §3.2, §21 Faz 2.

YAPILACAKLAR
1. Önce gerçek boyutu ölç (eski rapora güvenme): satır sayısı, script blokları, global fonksiyonlar. Sonucu REFACTOR_MAP.md'nin başına yaz.
2. En az bağımlı yaprak birimlerden başla (yardımcılar, sabit veri, tek sekmelik UI). Her birim için §3.1'in 12 adımı: kaynak aralığı, olay/durum/yan etki izi, envanter kontrolü, REFACTOR_MAP.md kaydı, çıkarma, çağıranları güncelleme, çift dinleyici/çift çalışma kontrolü, test, davranış karşılaştırması, commit + push.
3. Yapı derleme adımı gerektirmesin: GitHub Pages statik dosya sunuyor. Düz <script src> ya da <script type="module"> kullan; yükleme sırasını koru.
4. Rotalar, URL fragmanları, geri/ileri, depolama anahtarları ve formatları değişmez (§3.2).
5. Her birimden sonra npm test; smoke KALDI ise birimi geri al ya da düzelt, yarım birim bırakma.
6. Durum etiketi: çıkarıldı ≠ doğrulandı. Doğrulanamayan birim VERIFICATION BLOCKED ve nedeni.
7. Bütçe bitene kadar devam et; bittiğinde son birimi tamamlanmış halde bırak.

DOKUNABİLECEĞİN DOSYALAR
index.html, yeni modül klasörü (ör. js/; ARCHITECTURE.md'ye yaz), tests/ (yeni test), REFACTOR_MAP.md, ARCHITECTURE.md, TESTING.md, CHANGELOG.md, IMPLEMENTATION_STATUS.md, NEXT_STEPS.md, docs/faz-raporlari/.
YASAK: supabase-shim.js, config.js, content/, supabase/ davranışını değiştirmek; yeni özellik eklemek.

ORTAK KURALLAR
- Keşfi tekrarlama. Önce yalnız şunları oku:
  git fetch origin
  git show origin/main:docs/faz-raporlari/README.md || git show origin/claude/project-thread-5kc0zn:docs/faz-raporlari/README.md
  git show origin/faz-1b:docs/faz-raporlari/faz-1b.md
  git show origin/claude/project-thread-5kc0zn:docs/analiz/master-prompt-faz-haritasi.md  (yalnız §4 "Faz 2" bölümü)
  PROOFPATH_MASTER.md'den yalnız yukarıda adı geçen bölümler.
- Dal: git checkout -b faz-2b origin/faz-1b (bu prompt ikinci kez verildiyse: git checkout faz-2b && git pull, raporun sonuna "Tur N" bölümü ekle). Taban dalı yoksa dur ve bildir.
- Her önemli değişiklikten sonra: ilgili testleri koş (en az npm run test:smoke), küçük commit at, git push -u origin faz-2b. main'e push, force-push, merge ve deploy yok.
- Secret/anahtar/token isteme, kullanma, commit etme. Supabase'e veya canlı servise bağlanma; SQL değişikliği yalnız supabase/migrations/ altında dosya olarak yazılır, uygulanmaz.
- Yukarıdaki "DOKUNABİLECEĞİN DOSYALAR" dışına dokunma; kapsam dışı hata bulursan düzeltme, rapora yaz.
- Testi geçirmek için assert zayıflatma, test silme/atlama yok. Kullanıcı verisini silen/sıfırlayan değişiklik yok; depolama anahtarları ve formatları geriye uyumlu kalır.
- Yalnız gerçekten çalıştırdığın komutun sonucunu "doğrulandı" yaz; gerisi "varsayım" ya da "test edilmedi".
- Alt ajan ve oh-my-claudecode modları yok; doğrudan çalış.
- Bitiş: docs/faz-raporlari/faz-2b.md raporunu README'deki formatla yaz (yapılanlar, yapılmayanlar ve nedeni, testlerin gerçek sonuçları, doğrulanan/varsayılan, riskler, sonraki faza bağımlılıklar). NEXT_STEPS.md ve fazın kayıtlarını güncelle. Commit + push. Sonra Türkçe kısa özet: dal, son commit, test sayıları, en önemli 3 risk.
```

## Faz 3 — Öğrenme temelleri

Önceki faz: `faz-2b` · Dal: `faz-3`

```
Proofpath Faz 3: tek, yetkili yetkinlik grafiği + ilerleme + değerlendirme + kanıt modeli.
Master bölümleri: §5 (son paragraf), §6, §6.1, §6.2, §11, §11.1, §11.2, §17.1, §21 Faz 3.

YAPILACAKLAR
1. Mevcut ilerleme/XP/seviye/sınav hesaplarını envanterden bul; kaç ayrı hesap var, tek tabloda listele. Yenisini yazmadan önce birleştir.
2. Ortak model (§6): yol/kademe/modül/ders + içerik sürümü, yetkinlik + önkoşul, değerlendirme/deneme, kanıt kaydı. DATA_MODEL.md'ye yaz.
3. Kapılar (§6.1–6.2): sayfa açmak ustalık değildir; varsayılan %80, kritik hedefler tek tek geçmeli; her kilit nedenini söyler.
4. Mevcut kullanıcı verisi için geriye uyumlu migration (istemci tarafı okuma dönüştürücüsü); eski veriyi silme. Eski formatlı örnek veriyle test.
5. Cevap anahtarı ve "güvenilir ustalık" sunucuda olmalı (§11.2). Bunu Supabase'e bağlanmadan yapamazsın: RPC/politika taslağını supabase/migrations/ altında yaz, istemcide geçici kalanı SECURITY.md'de açık risk olarak işaretle.
6. Otomatik testler: puan, kapı, telafi, varyant kuralları; yenileme/yeniden girişte ilerleme korunur.

DOKUNABİLECEĞİN DOSYALAR
Faz 2B'de oluşan modüller, index.html (bağlama), supabase/migrations/ (yeni), tests/, kayıt .md dosyaları, docs/faz-raporlari/.

ORTAK KURALLAR
- Keşfi tekrarlama. Önce yalnız şunları oku:
  git fetch origin
  git show origin/main:docs/faz-raporlari/README.md || git show origin/claude/project-thread-5kc0zn:docs/faz-raporlari/README.md
  git show origin/faz-2b:docs/faz-raporlari/faz-2b.md
  git show origin/claude/project-thread-5kc0zn:docs/analiz/master-prompt-faz-haritasi.md  (yalnız §4 "Faz 3" bölümü)
  PROOFPATH_MASTER.md'den yalnız yukarıda adı geçen bölümler.
- Dal: git checkout -b faz-3 origin/faz-2b. Taban dalı yoksa dur ve bildir.
- Her önemli değişiklikten sonra: ilgili testleri koş (en az npm run test:smoke), küçük commit at, git push -u origin faz-3. main'e push, force-push, merge ve deploy yok.
- Secret/anahtar/token isteme, kullanma, commit etme. Supabase'e veya canlı servise bağlanma; SQL değişikliği yalnız supabase/migrations/ altında dosya olarak yazılır, uygulanmaz.
- Yukarıdaki "DOKUNABİLECEĞİN DOSYALAR" dışına dokunma; kapsam dışı hata bulursan düzeltme, rapora yaz.
- Testi geçirmek için assert zayıflatma, test silme/atlama yok. Kullanıcı verisini silen/sıfırlayan değişiklik yok; depolama anahtarları ve formatları geriye uyumlu kalır.
- Yalnız gerçekten çalıştırdığın komutun sonucunu "doğrulandı" yaz; gerisi "varsayım" ya da "test edilmedi".
- Alt ajan ve oh-my-claudecode modları yok; doğrudan çalış.
- Bitiş: docs/faz-raporlari/faz-3.md raporunu README'deki formatla yaz (yapılanlar, yapılmayanlar ve nedeni, testlerin gerçek sonuçları, doğrulanan/varsayılan, riskler, sonraki faza bağımlılıklar). NEXT_STEPS.md ve fazın kayıtlarını güncelle. Commit + push. Sonra Türkçe kısa özet: dal, son commit, test sayıları, en önemli 3 risk.
```

## Faz 4 — Mevcut modüllerin entegrasyonu

Önceki faz: `faz-3` · Dal: `faz-4`

```
Proofpath Faz 4: var olan özellikleri Faz 3 modeline bağla, kopyaları birleştir.
Master bölümleri: §5, §8.3–8.7, §10, §13, §21 Faz 4.

YAPILACAKLAR
1. Her modül için (olay simülasyonu, Fail-Forward, açıklama modları, aralıklı tekrar, proje/portfolyo, mülakat, Peer Review): haritadaki kabul ölçütüne karşı mevcut durum tablosu (var / kısmi / yok).
2. Kopya menü, ilerleme hesabı, değerlendirme motoru kalmasın: hepsi Faz 3 modelini kullansın.
3. Eksik kabul ölçütü olan her modüle test ekle (ör. başarısız deneme telafi görevi üretir; tamamlanan tekrar planı değiştirir; açıklama modu tercihi kalıcı).
4. Proje/portfolyo, mülakat, Peer Review Faz 8'de derinleşir: burada yalnız denetim + birleştirme + test.
5. Yeni büyük özellik ekleme; eksikleri ROADMAP.md'ye yaz.

DOKUNABİLECEĞİN DOSYALAR
Modül klasörü, index.html (bağlama), docs/ altındaki modül veri dosyaları (projects.js vb.; yalnız bağlama için), tests/, kayıt .md dosyaları, docs/faz-raporlari/.

ORTAK KURALLAR
- Keşfi tekrarlama. Önce yalnız şunları oku:
  git fetch origin
  git show origin/main:docs/faz-raporlari/README.md || git show origin/claude/project-thread-5kc0zn:docs/faz-raporlari/README.md
  git show origin/faz-3:docs/faz-raporlari/faz-3.md
  git show origin/claude/project-thread-5kc0zn:docs/analiz/master-prompt-faz-haritasi.md  (yalnız §4 "Faz 4" bölümü)
  PROOFPATH_MASTER.md'den yalnız yukarıda adı geçen bölümler.
- Dal: git checkout -b faz-4 origin/faz-3. Taban dalı yoksa dur ve bildir.
- Her önemli değişiklikten sonra: ilgili testleri koş (en az npm run test:smoke), küçük commit at, git push -u origin faz-4. main'e push, force-push, merge ve deploy yok.
- Secret/anahtar/token isteme, kullanma, commit etme. Supabase'e veya canlı servise bağlanma; SQL değişikliği yalnız supabase/migrations/ altında dosya olarak yazılır, uygulanmaz.
- Yukarıdaki "DOKUNABİLECEĞİN DOSYALAR" dışına dokunma; kapsam dışı hata bulursan düzeltme, rapora yaz.
- Testi geçirmek için assert zayıflatma, test silme/atlama yok. Kullanıcı verisini silen/sıfırlayan değişiklik yok; depolama anahtarları ve formatları geriye uyumlu kalır.
- Yalnız gerçekten çalıştırdığın komutun sonucunu "doğrulandı" yaz; gerisi "varsayım" ya da "test edilmedi".
- Alt ajan ve oh-my-claudecode modları yok; doğrudan çalış.
- Bitiş: docs/faz-raporlari/faz-4.md raporunu README'deki formatla yaz (yapılanlar, yapılmayanlar ve nedeni, testlerin gerçek sonuçları, doğrulanan/varsayılan, riskler, sonraki faza bağımlılıklar). NEXT_STEPS.md ve fazın kayıtlarını güncelle. Commit + push. Sonra Türkçe kısa özet: dal, son commit, test sayıları, en önemli 3 risk.
```

## Faz 5 — Öğretim ve etkileşimli pratik (tekrarlanabilir)

Önceki faz: `faz-4` · Dal: `faz-5`

```
Proofpath Faz 5: dersleri 15 öğeli tam derse, uygun laboratuvarları gerçek etkileşime getir.
Master bölümleri: §7, §7.1, §7.2, §8.1, §8.2, §11, §14, §21 Faz 5.

YAPILACAKLAR
1. Mevcut dersleri (content/lessons/) §7'nin 15 öğesine göre puanla; eksik öğe tablosu. dev/net/qa derslerinin sabit içeriği yok: önce önkoşul sırasını kur.
2. Önce ders, sonra lab (§8.2): bir konunun lab'ı dersi tamamlanmadan yazılmaz.
3. Her uygulanan alanda en az bir temsili lab: hedef, başlangıç durumu, görev, gözlenebilir değişim, doğrulama, sıfırla, ipucu, yetkinlik kaydı, "gerçek / yerel / simülasyon" etiketi.
4. Bilgi grafiği (§8.1) gerçek ilerlemeyi ve öneriyi etkilesin; blok nedeni ve en küçük sonraki adım görünsün.
5. Dış kaynaklar: uydurma URL yok; her bağlantı için son doğrulama tarihi. URL'yi doğrulayamıyorsan ekleme.
6. Bir turda bir alan bitir (önerilen sıra: IT temelleri → CCNA → siber güvenlik → backend → DevOps → QA → teknik İngilizce). Tur sonunda raporda hangi alanların kaldığını yaz.

DOKUNABİLECEĞİN DOSYALAR
content/ (ders içerikleri), modül klasörü, index.html (bağlama), tests/, kayıt .md dosyaları, docs/faz-raporlari/.

ORTAK KURALLAR
- Keşfi tekrarlama. Önce yalnız şunları oku:
  git fetch origin
  git show origin/main:docs/faz-raporlari/README.md || git show origin/claude/project-thread-5kc0zn:docs/faz-raporlari/README.md
  git show origin/faz-4:docs/faz-raporlari/faz-4.md
  git show origin/claude/project-thread-5kc0zn:docs/analiz/master-prompt-faz-haritasi.md  (yalnız §4 "Faz 5" bölümü)
  PROOFPATH_MASTER.md'den yalnız yukarıda adı geçen bölümler.
- Dal: git checkout -b faz-5 origin/faz-4 (bu prompt ikinci kez verildiyse: git checkout faz-5 && git pull, raporun sonuna "Tur N" bölümü ekle). Taban dalı yoksa dur ve bildir.
- Her önemli değişiklikten sonra: ilgili testleri koş (en az npm run test:smoke), küçük commit at, git push -u origin faz-5. main'e push, force-push, merge ve deploy yok.
- Secret/anahtar/token isteme, kullanma, commit etme. Supabase'e veya canlı servise bağlanma; SQL değişikliği yalnız supabase/migrations/ altında dosya olarak yazılır, uygulanmaz.
- Yukarıdaki "DOKUNABİLECEĞİN DOSYALAR" dışına dokunma; kapsam dışı hata bulursan düzeltme, rapora yaz.
- Testi geçirmek için assert zayıflatma, test silme/atlama yok. Kullanıcı verisini silen/sıfırlayan değişiklik yok; depolama anahtarları ve formatları geriye uyumlu kalır.
- Yalnız gerçekten çalıştırdığın komutun sonucunu "doğrulandı" yaz; gerisi "varsayım" ya da "test edilmedi".
- Alt ajan ve oh-my-claudecode modları yok; doğrudan çalış.
- Bitiş: docs/faz-raporlari/faz-5.md raporunu README'deki formatla yaz (yapılanlar, yapılmayanlar ve nedeni, testlerin gerçek sonuçları, doğrulanan/varsayılan, riskler, sonraki faza bağımlılıklar). NEXT_STEPS.md ve fazın kayıtlarını güncelle. Commit + push. Sonra Türkçe kısa özet: dal, son commit, test sayıları, en önemli 3 risk.
```

## Faz 6 — Koç ve kişiselleştirme

Önceki faz: `faz-5` · Dal: `faz-6`

```
Proofpath Faz 6: ProofPath verisine bağlı, kendi çalışma alanı olan Koç.
Master bölümleri: §9, §9.1–9.6, §21 Faz 6.

YAPILACAKLAR
1. Mevcut koç/AI kodunu ve "yapay zekasız" geri bildirim yollarını envanterden bul; tek Koç modülünde birleştir.
2. Koç yalnız gerçek öğrenci durumundan (Faz 3 modeli) konuşur; uydurma geçmiş yok. Her öneri kanıtını gösterir.
3. İç navigasyon: önerilen hedefe tek tıkla gitme. Tercihleri incele/değiştir/sıfırla.
4. Onay gerektiren işlemler onaysız yapılmaz. LLM tek başına ustalık veremez; korumalı değerlendirmede cevap sızdırmaz.
5. Sağlayıcı yoksa, hata veya zaman aşımında düzgün geri dönüş. Gerçek bir AI sağlayıcısına bağlanma; testlerde sahte sağlayıcı kullan.
6. Testler: izin, hata, köken (önerinin kanıtı), cevap sızdırmama.

DOKUNABİLECEĞİN DOSYALAR
Modül klasörü, index.html (bağlama), tests/, kayıt .md dosyaları, docs/faz-raporlari/. config.js'e anahtar ekleme.

ORTAK KURALLAR
- Keşfi tekrarlama. Önce yalnız şunları oku:
  git fetch origin
  git show origin/main:docs/faz-raporlari/README.md || git show origin/claude/project-thread-5kc0zn:docs/faz-raporlari/README.md
  git show origin/faz-5:docs/faz-raporlari/faz-5.md
  git show origin/claude/project-thread-5kc0zn:docs/analiz/master-prompt-faz-haritasi.md  (yalnız §4 "Faz 6" bölümü)
  PROOFPATH_MASTER.md'den yalnız yukarıda adı geçen bölümler.
- Dal: git checkout -b faz-6 origin/faz-5. Taban dalı yoksa dur ve bildir.
- Her önemli değişiklikten sonra: ilgili testleri koş (en az npm run test:smoke), küçük commit at, git push -u origin faz-6. main'e push, force-push, merge ve deploy yok.
- Secret/anahtar/token isteme, kullanma, commit etme. Supabase'e veya canlı servise bağlanma; SQL değişikliği yalnız supabase/migrations/ altında dosya olarak yazılır, uygulanmaz.
- Yukarıdaki "DOKUNABİLECEĞİN DOSYALAR" dışına dokunma; kapsam dışı hata bulursan düzeltme, rapora yaz.
- Testi geçirmek için assert zayıflatma, test silme/atlama yok. Kullanıcı verisini silen/sıfırlayan değişiklik yok; depolama anahtarları ve formatları geriye uyumlu kalır.
- Yalnız gerçekten çalıştırdığın komutun sonucunu "doğrulandı" yaz; gerisi "varsayım" ya da "test edilmedi".
- Alt ajan ve oh-my-claudecode modları yok; doğrudan çalış.
- Bitiş: docs/faz-raporlari/faz-6.md raporunu README'deki formatla yaz (yapılanlar, yapılmayanlar ve nedeni, testlerin gerçek sonuçları, doğrulanan/varsayılan, riskler, sonraki faza bağımlılıklar). NEXT_STEPS.md ve fazın kayıtlarını güncelle. Commit + push. Sonra Türkçe kısa özet: dal, son commit, test sayıları, en önemli 3 risk.
```

## Faz 7 — Planlama ve öğrenme ikizi

Önceki faz: `faz-6` · Dal: `faz-7`

```
Proofpath Faz 7: uyarlanabilir çalışma planı, aralıklı tekrar ve kanıta dayalı öğrenme ikizi.
Master bölümleri: §8.4, §8.8, §16, §21 Faz 7.

YAPILACAKLAR
1. Mevcut "kişiye özel plan" ve tekrar kuyruğunu bul; ayrı plan hesabı kalmasın.
2. Plan (§16): haftalık plan, günlük küçük adım, iş yükü tahmini (varsayımları görünür), tampon, kaçırılan oturum telafisi, alternatif takvim.
3. İkiz (§8.8): mevcut durum + kanıt, güçlü/zayıf, en az iki planın görünür varsayımlarla karşılaştırması, belirsizlik, kullanıcının düzeltebilmesi.
4. Her tahmin ölçülen değerden ayrı gösterilir; kesin tarih veya olasılık uydurulmaz.
5. Testler: plan önkoşul/iş yükü verisini kullanır, değişime tepki verir; kaçırılan gün planı yeniden kurar.

DOKUNABİLECEĞİN DOSYALAR
Modül klasörü, index.html (bağlama), tests/, kayıt .md dosyaları, docs/faz-raporlari/.

ORTAK KURALLAR
- Keşfi tekrarlama. Önce yalnız şunları oku:
  git fetch origin
  git show origin/main:docs/faz-raporlari/README.md || git show origin/claude/project-thread-5kc0zn:docs/faz-raporlari/README.md
  git show origin/faz-6:docs/faz-raporlari/faz-6.md
  git show origin/claude/project-thread-5kc0zn:docs/analiz/master-prompt-faz-haritasi.md  (yalnız §4 "Faz 7" bölümü)
  PROOFPATH_MASTER.md'den yalnız yukarıda adı geçen bölümler.
- Dal: git checkout -b faz-7 origin/faz-6. Taban dalı yoksa dur ve bildir.
- Her önemli değişiklikten sonra: ilgili testleri koş (en az npm run test:smoke), küçük commit at, git push -u origin faz-7. main'e push, force-push, merge ve deploy yok.
- Secret/anahtar/token isteme, kullanma, commit etme. Supabase'e veya canlı servise bağlanma; SQL değişikliği yalnız supabase/migrations/ altında dosya olarak yazılır, uygulanmaz.
- Yukarıdaki "DOKUNABİLECEĞİN DOSYALAR" dışına dokunma; kapsam dışı hata bulursan düzeltme, rapora yaz.
- Testi geçirmek için assert zayıflatma, test silme/atlama yok. Kullanıcı verisini silen/sıfırlayan değişiklik yok; depolama anahtarları ve formatları geriye uyumlu kalır.
- Yalnız gerçekten çalıştırdığın komutun sonucunu "doğrulandı" yaz; gerisi "varsayım" ya da "test edilmedi".
- Alt ajan ve oh-my-claudecode modları yok; doğrudan çalış.
- Bitiş: docs/faz-raporlari/faz-7.md raporunu README'deki formatla yaz (yapılanlar, yapılmayanlar ve nedeni, testlerin gerçek sonuçları, doğrulanan/varsayılan, riskler, sonraki faza bağımlılıklar). NEXT_STEPS.md ve fazın kayıtlarını güncelle. Commit + push. Sonra Türkçe kısa özet: dal, son commit, test sayıları, en önemli 3 risk.
```

## Faz 8 — Yetkinlik ve kariyer hazırlığı

Önceki faz: `faz-7` · Dal: `faz-8`

```
Proofpath Faz 8: kanıta dayalı rapor, portfolyo, mülakat, peer review ve kariyer önerisi.
Master bölümleri: §8.6, §8.7, §12, §12.1, §12.2, §13, §21 Faz 8.

YAPILACAKLAR
1. Proje tanımı 10 alan (§8.6); proje tamamlanması rozet değil kanıt kaydı üretir.
2. Rapor (§12): her iddia kanıta bağlı ya da "doğrulanmamış"; 8 kademeli kanıt durumu (§12.1).
3. Rol bazlı boşluk analizi, CV, teknik İngilizce (§12.2).
4. Mülakat: rubrik bazlı sonuç, tekrarlayan zayıflık takibi, telafiye bağlantı (§8.7).
5. Peer review: rubrik, AI/insan ayrımı, özel içerik sızdırmayan izinler (§13).
6. Paylaşım: yetkisiz kullanıcı özel raporu göremez, iptal edilen paylaşım erişim vermez. Sunucu tarafı politika yalnız supabase/migrations/ dosyası olarak; istemci testleri sahte veriyle.

DOKUNABİLECEĞİN DOSYALAR
Modül klasörü, index.html (bağlama), docs/ altındaki proje veri dosyaları, supabase/migrations/ (yeni), tests/, kayıt .md dosyaları, docs/faz-raporlari/.

ORTAK KURALLAR
- Keşfi tekrarlama. Önce yalnız şunları oku:
  git fetch origin
  git show origin/main:docs/faz-raporlari/README.md || git show origin/claude/project-thread-5kc0zn:docs/faz-raporlari/README.md
  git show origin/faz-7:docs/faz-raporlari/faz-7.md
  git show origin/claude/project-thread-5kc0zn:docs/analiz/master-prompt-faz-haritasi.md  (yalnız §4 "Faz 8" bölümü)
  PROOFPATH_MASTER.md'den yalnız yukarıda adı geçen bölümler.
- Dal: git checkout -b faz-8 origin/faz-7. Taban dalı yoksa dur ve bildir.
- Her önemli değişiklikten sonra: ilgili testleri koş (en az npm run test:smoke), küçük commit at, git push -u origin faz-8. main'e push, force-push, merge ve deploy yok.
- Secret/anahtar/token isteme, kullanma, commit etme. Supabase'e veya canlı servise bağlanma; SQL değişikliği yalnız supabase/migrations/ altında dosya olarak yazılır, uygulanmaz.
- Yukarıdaki "DOKUNABİLECEĞİN DOSYALAR" dışına dokunma; kapsam dışı hata bulursan düzeltme, rapora yaz.
- Testi geçirmek için assert zayıflatma, test silme/atlama yok. Kullanıcı verisini silen/sıfırlayan değişiklik yok; depolama anahtarları ve formatları geriye uyumlu kalır.
- Yalnız gerçekten çalıştırdığın komutun sonucunu "doğrulandı" yaz; gerisi "varsayım" ya da "test edilmedi".
- Alt ajan ve oh-my-claudecode modları yok; doğrudan çalış.
- Bitiş: docs/faz-raporlari/faz-8.md raporunu README'deki formatla yaz (yapılanlar, yapılmayanlar ve nedeni, testlerin gerçek sonuçları, doğrulanan/varsayılan, riskler, sonraki faza bağımlılıklar). NEXT_STEPS.md ve fazın kayıtlarını güncelle. Commit + push. Sonra Türkçe kısa özet: dal, son commit, test sayıları, en önemli 3 risk.
```

## Faz 9 — Çevrimdışı, senkron ve güven merkezi

Önceki faz: `faz-8` · Dal: `faz-9`

```
Proofpath Faz 9: PWA/çevrimdışı, güvenli senkron ve güven/şeffaflık merkezi.
Master bölümleri: §8.9, §8.10, §17.3, §21 Faz 9. Faz 1'deki P1-7 (çok cihazda son yazan kazanır) bu fazda kapanır.

YAPILACAKLAR
1. Kurulabilir uygulama (manifest + service worker), seçili derslerin çevrimdışı önbelleği, içerik sürüm kontrolü. GitHub Pages alt yolunu (base path) bozma.
2. Değişiklik kuyruğu ve senkron; görünür çevrimdışı/bekliyor/başarılı/hata durumu. Çakışmada sessiz üzerine yazma yok (P1-7: belge sürümü/updated_at kontrolü).
3. Paylaşılan cihazda kullanıcı ayrımı: çıkışta önbellek ve kuyruk diğer kullanıcıya görünmez.
4. Güven merkezi (§8.10): saklanan veri ve nedeni, önerinin kanıtı, ölçülen/çıkarım/doğrulanmamış ayrımı, AI'a giden veri, dışa aktarma/silme/sıfırlama ve etkisi, portfolyo görünürlüğü. Vaat edilemeyen gizlilik garantisi yazma.
5. Silme/sıfırlama yalnız kullanıcının açık onayıyla ve önce dışa aktarma önerisiyle.
6. Testler: çevrimdışı ders erişimi, kuyruk, yeniden bağlanma, kesilen istek, çakışma, önbellek güncelleme, çıkış, kullanıcılar arası izolasyon (sahte backend ile).

DOKUNABİLECEĞİN DOSYALAR
Modül klasörü, index.html, yeni manifest/service worker dosyaları, supabase-shim.js (yalnız senkron/çakışma için, geriye uyumlu), supabase/migrations/ (yeni), tests/, kayıt .md dosyaları, docs/faz-raporlari/.

ORTAK KURALLAR
- Keşfi tekrarlama. Önce yalnız şunları oku:
  git fetch origin
  git show origin/main:docs/faz-raporlari/README.md || git show origin/claude/project-thread-5kc0zn:docs/faz-raporlari/README.md
  git show origin/faz-8:docs/faz-raporlari/faz-8.md
  git show origin/claude/project-thread-5kc0zn:docs/analiz/master-prompt-faz-haritasi.md  (yalnız §4 "Faz 9" bölümü)
  PROOFPATH_MASTER.md'den yalnız yukarıda adı geçen bölümler.
- Dal: git checkout -b faz-9 origin/faz-8. Taban dalı yoksa dur ve bildir.
- Her önemli değişiklikten sonra: ilgili testleri koş (en az npm run test:smoke), küçük commit at, git push -u origin faz-9. main'e push, force-push, merge ve deploy yok.
- Secret/anahtar/token isteme, kullanma, commit etme. Supabase'e veya canlı servise bağlanma; SQL değişikliği yalnız supabase/migrations/ altında dosya olarak yazılır, uygulanmaz.
- Yukarıdaki "DOKUNABİLECEĞİN DOSYALAR" dışına dokunma; kapsam dışı hata bulursan düzeltme, rapora yaz.
- Testi geçirmek için assert zayıflatma, test silme/atlama yok. Kullanıcı verisini silen/sıfırlayan değişiklik yok; depolama anahtarları ve formatları geriye uyumlu kalır.
- Yalnız gerçekten çalıştırdığın komutun sonucunu "doğrulandı" yaz; gerisi "varsayım" ya da "test edilmedi".
- Alt ajan ve oh-my-claudecode modları yok; doğrudan çalış.
- Bitiş: docs/faz-raporlari/faz-9.md raporunu README'deki formatla yaz (yapılanlar, yapılmayanlar ve nedeni, testlerin gerçek sonuçları, doğrulanan/varsayılan, riskler, sonraki faza bağımlılıklar). NEXT_STEPS.md ve fazın kayıtlarını güncelle. Commit + push. Sonra Türkçe kısa özet: dal, son commit, test sayıları, en önemli 3 risk.
```

## Faz 10 — Alan tamamlama: Veri Analitiği (tekrarlanabilir)

Önceki faz: `faz-9` · Dal: `faz-10`

```
Proofpath Faz 10: Veri Analitiği yolunu §15.1 sırasıyla eksiksiz kur; diğer yolları ortak mimariyle genişlet.
Master bölümleri: §14, §15, §15.1–15.6, §21 Faz 10.

YAPILACAKLAR
1. Sırayla (§15.1): müfredat + önkoşul grafiği → tam ders → eşleşen lab → test → bağımsız değerlendirme + telafi → araç birleştirme → projeler/capstone → sertifika eşlemesi → rapor + kariyer. Bir adım bitmeden sonrakine geçme.
2. Seviye 0–8 (§15.2); SQL'in 13 alt konusu sırayla.
3. Lablar (§15.3): SQL, Python, veri temizleme, görselleştirme, Power BI/DAX. Tarayıcıda gerçekten çalışmayan şey "simülasyon" etiketli; Power BI Desktop çalışıyormuş gibi sunulmaz.
4. Kademe başına 4 ayrı proje + README/veri sözlüğü/metodoloji/test/sınırlamalar (§15.6).
5. PL-300: kapsamı resmi kaynaktan kontrol edemiyorsan "doğrulanmadı" yaz; ağırlık sabitleme, gerçek sınav sorusu kopyalama yok. "Yolu bitirmek = sertifika" asla yazma.
6. Bir turda bir seviye grubu bitir; raporda kalan seviyeleri yaz.

DOKUNABİLECEĞİN DOSYALAR
content/, modül klasörü, index.html (bağlama), tests/, kayıt .md dosyaları, docs/faz-raporlari/.

ORTAK KURALLAR
- Keşfi tekrarlama. Önce yalnız şunları oku:
  git fetch origin
  git show origin/main:docs/faz-raporlari/README.md || git show origin/claude/project-thread-5kc0zn:docs/faz-raporlari/README.md
  git show origin/faz-9:docs/faz-raporlari/faz-9.md
  git show origin/claude/project-thread-5kc0zn:docs/analiz/master-prompt-faz-haritasi.md  (yalnız §4 "Faz 10" bölümü)
  PROOFPATH_MASTER.md'den yalnız yukarıda adı geçen bölümler.
- Dal: git checkout -b faz-10 origin/faz-9 (bu prompt ikinci kez verildiyse: git checkout faz-10 && git pull, raporun sonuna "Tur N" bölümü ekle). Taban dalı yoksa dur ve bildir.
- Her önemli değişiklikten sonra: ilgili testleri koş (en az npm run test:smoke), küçük commit at, git push -u origin faz-10. main'e push, force-push, merge ve deploy yok.
- Secret/anahtar/token isteme, kullanma, commit etme. Supabase'e veya canlı servise bağlanma; SQL değişikliği yalnız supabase/migrations/ altında dosya olarak yazılır, uygulanmaz.
- Yukarıdaki "DOKUNABİLECEĞİN DOSYALAR" dışına dokunma; kapsam dışı hata bulursan düzeltme, rapora yaz.
- Testi geçirmek için assert zayıflatma, test silme/atlama yok. Kullanıcı verisini silen/sıfırlayan değişiklik yok; depolama anahtarları ve formatları geriye uyumlu kalır.
- Yalnız gerçekten çalıştırdığın komutun sonucunu "doğrulandı" yaz; gerisi "varsayım" ya da "test edilmedi".
- Alt ajan ve oh-my-claudecode modları yok; doğrudan çalış.
- Bitiş: docs/faz-raporlari/faz-10.md raporunu README'deki formatla yaz (yapılanlar, yapılmayanlar ve nedeni, testlerin gerçek sonuçları, doğrulanan/varsayılan, riskler, sonraki faza bağımlılıklar). NEXT_STEPS.md ve fazın kayıtlarını güncelle. Commit + push. Sonra Türkçe kısa özet: dal, son commit, test sayıları, en önemli 3 risk.
```

## Faz 11 — Son kalite ve yayın hazırlığı

Önceki faz: `faz-10` · Dal: `faz-11`

```
Proofpath Faz 11: tam doğrulama ve yayına hazırlık. Deploy etme; main'e geçiş kullanıcının kararı.
Master bölümleri: §18, §19, §20, §20.1–20.3, §23, §21 Faz 11.

YAPILACAKLAR
1. Önceki tüm faz raporlarının "Riskler" ve "Yapılmayanlar" bölümlerini tek tabloda topla (git show origin/faz-<X>:docs/faz-raporlari/faz-<X>.md). Hangisi kapandı, hangisi açık.
2. Testler: regresyon, entegrasyon, E2E, güvenlik, erişilebilirlik, performans; §20.1'deki 18 kapsam alanı için tablo.
3. §20.2'deki 20 adımlı öğrenci yolculuğu: her adım test edildi / engelli / yapılmadı.
4. UX (§18): ölü kontrol yok, yatay taşma yok, klavye/odak/kontrast, azaltılmış hareket; 390 px ve masaüstü.
5. Bulunan hataları düzelt (P0/P1 önce); her düzeltmeden sonra commit + push.
6. Tüm kayıtları güncelle. Yayın kontrol listesi yaz (DEPLOY_CHECKLIST.md): main'e birleştirme adımları, uygulanacak supabase/migrations/ dosyaları ve sırası, canlı sitede yapılacak doğrulamalar. Uygulama.
7. Rapor §23'teki 8 maddeyi içersin.

DOKUNABİLECEĞİN DOSYALAR
Tüm uygulama dosyaları (düzeltme için), tests/, kayıt .md dosyaları, DEPLOY_CHECKLIST.md, docs/faz-raporlari/. supabase/ altında yalnız yeni migration dosyası.

ORTAK KURALLAR
- Keşfi tekrarlama. Önce yalnız şunları oku:
  git fetch origin
  git show origin/main:docs/faz-raporlari/README.md || git show origin/claude/project-thread-5kc0zn:docs/faz-raporlari/README.md
  git show origin/faz-10:docs/faz-raporlari/faz-10.md
  git show origin/claude/project-thread-5kc0zn:docs/analiz/master-prompt-faz-haritasi.md  (yalnız §4 "Faz 11" bölümü)
  PROOFPATH_MASTER.md'den yalnız yukarıda adı geçen bölümler.
- Dal: git checkout -b faz-11 origin/faz-10. Taban dalı yoksa dur ve bildir.
- Her önemli değişiklikten sonra: ilgili testleri koş (en az npm run test:smoke), küçük commit at, git push -u origin faz-11. main'e push, force-push, merge ve deploy yok.
- Secret/anahtar/token isteme, kullanma, commit etme. Supabase'e veya canlı servise bağlanma; SQL değişikliği yalnız supabase/migrations/ altında dosya olarak yazılır, uygulanmaz.
- Yukarıdaki "DOKUNABİLECEĞİN DOSYALAR" dışına dokunma; kapsam dışı hata bulursan düzeltme, rapora yaz.
- Testi geçirmek için assert zayıflatma, test silme/atlama yok. Kullanıcı verisini silen/sıfırlayan değişiklik yok; depolama anahtarları ve formatları geriye uyumlu kalır.
- Yalnız gerçekten çalıştırdığın komutun sonucunu "doğrulandı" yaz; gerisi "varsayım" ya da "test edilmedi".
- Alt ajan ve oh-my-claudecode modları yok; doğrudan çalış.
- Bitiş: docs/faz-raporlari/faz-11.md raporunu README'deki formatla yaz (yapılanlar, yapılmayanlar ve nedeni, testlerin gerçek sonuçları, doğrulanan/varsayılan, riskler, sonraki faza bağımlılıklar). NEXT_STEPS.md ve fazın kayıtlarını güncelle. Commit + push. Sonra Türkçe kısa özet: dal, son commit, test sayıları, en önemli 3 risk.
```

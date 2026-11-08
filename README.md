# FORNEX

![HTML](https://img.shields.io/badge/HTML5-vanilla-E34F26?logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS3-themes-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-no%20build-F7DF1E?logo=javascript&logoColor=black) ![Tests](https://img.shields.io/badge/tests-Playwright-2EAD33?logo=playwright&logoColor=white)

**İçindekiler:** [Neler var](#neler-var) · [Mimari](#mimari) · [Hızlı başlangıç](#hızlı-başlangıç) · [Test](#test) · [Bilinen sınırlar](#bilinen-sınırlar) · [Senkron](#evdeki-bilgisayarda-çalışırken-kesintisiz-senkron)

Sekiz derslik, oyunlaştırılmış kişisel öğrenme uygulaması: **CCNA, Network, İngilizce, Siber güvenlik, Backend, DevOps, Test Uzmanı, Python**. Claude Artifact olarak çalışan, `index.html` + `css/` + `js/` yapısında bir uygulamadır; günlük dersleri zamanlanmış "koç" görevleri üretir, veriler artifact veritabanında tutulur.

![Bugün ekranı](docs/ekran/bugun-masaustu.png)

## Neler var

- **Bugün**: günün dersi, kısa kontrol soruları, seri ve XP.
- **Dersler**: her ders için ısınma, anlatım ve dersin kendi içeriğinden kurulan mini sınav.
- **Animasyon Atölyesi**: 70 kurgulu sahneyle ağ, güvenlik, DevOps, test ve backend kavramlarının adım adım hareketli anlatımı.
- **Kavram Atlası, Ders Notları ve Seviye sınavı**: yedi dersin hepsi için.
- **Oyunlar**: Ağ Koşusu, Fetih ve günlük "Günün meydanı".
- **Lig**: her gün 8 soru (+ yanlış yapılanlardan en fazla 2 tekrar). Yanlışta kartın arkası doğru cevabı ve nedenini gösterir.
- **Proje Atölyesi**: kendi projelerin ve 9 hazır *Yetkinlik Yolu* (siber güvenlik, test/QA, backend; her biri başlangıç, orta, zor). Her adımda Öğren, Yap, Kanıt, İngilizce terimler ve arama sorgusu bulunur.
- **Sınav Haritası** ve **Mülakat Antrenmanı**.
- **Sözlük** ve **Rehber**: ders terimlerinin sade açıklamaları.
- **Rahat okuma ve Sade mod** (Ayarlar): büyük yazı, yüksek kontrast, az sayıda düğme.

| Yetkinlik Yolları | Proje yol haritası |
|---|---|
| ![](docs/ekran/yetkinlik-yollari.png) | ![](docs/ekran/proje-yol-haritasi.png) |

## Mimari

- Ön yüz: derleme adımı olmayan, bağımlılıksız HTML/CSS/JS. `index.html` yalnız iskelet ve yükleme sırasıdır; stiller `css/` (7 dosya), uygulama kodu `js/` altında alan klasörlerine bölünmüştür (`cekirdek`, `bugun`, `ders`, `oyun`, `atolye`, `lig`, `proje`, `atlas`, `ag-atolyesi`, `seviye`, `masa`, `mulakat`, `yardim`, `arayuz`, `baslat.js`), büyük veri sabitleri `js/veri/` içindedir. Açık ve koyu tema, telefon genişliği desteklenir.
- Yükleme: betikler `index.html`'de sırayla (`defer`/`async` olmadan) yüklenir ve küresel kapsamda çalışır; yükleme anında çalışan kod yalnız önceki betiklerde bildirilen adlara başvurabilir. Bu kural `node tests/sira.js` ile denetlenir. Yeni kod tek ad alanı `window.PP` altına yazılır.
- Veri: Claude Artifact `db` yeteneği. Koleksiyonlar için [docs/VERI_SEMASI.md](docs/VERI_SEMASI.md).
- Üretim: derslere göre günlük koç görevleri ve haftalık Müdür görevi dersleri, biletleri ve raporları veritabanına yazar. Koç komutları `content/coach/`, animasyon sahneleri `content/nwscenes/` altında. Öğretim kuralları için [docs/OGRETIM_ILKELERI.md](docs/OGRETIM_ILKELERI.md).
- Tasarım kararları: [docs/UX_ANALIZ.md](docs/UX_ANALIZ.md).

> `index.html` içindeki `window.claude` çağrıları Claude Artifact ortamında çalışır. Normal bir tarayıcıda açarsan veri kaydı çalışmaz; arayüzü görmek için `tests/stub.js` içindeki sahte ortam kullanılır.

## Hızlı başlangıç

Hiç bilmeyen biri için adım adım:

1. Bilgisayarınıza [Git](https://git-scm.com/downloads) ve [Node.js](https://nodejs.org/) (LTS) kurun.
2. Depoyu indirin: `git clone https://github.com/yusufydegirmenci/proofpath`
3. Klasöre girin: `cd proofpath`
4. `index.html` dosyasını tarayıcıda açın. Derleme gerekmez.
5. Normal tarayıcıda veri kaydı çalışmaz (aşağıdaki nota bakın). Arayüzü görmek için testlerin kullandığı sahte ortam `tests/stub.js` içindedir.

## Test

```bash
npm install playwright
node tests/smoke.js
```

Yükleme sırası denetimi: `node tests/sira.js` (acorn gerekir, `npm install`).

Duman testi 15 sekmeyi 400 px koyu ve 1100 px açık temada açar; sayfa hatası ve yatay taşma arar.

Mobil taraması: `node tests/mobil.js` (3 telefon boyutu × yazı/sade/kontrast ayarları × 15 sekme).

## Bilinen sınırlar

- 172 soru, 3 bağımsız yapay zekâ incelemesinden geçti (yanlış cevap bulunmadı, 8 ifade düzeltildi); yine de insan uzman gözden geçirmedi, resmî CCNA kaynaklarıyla karşılaştır.
- Testler sahte `window.claude` ve emüle edilmiş telefonla yapıldı, gerçek cihaz testi yok.

## Evdeki bilgisayarda çalışırken (kesintisiz senkron)

Ana dal `main`. Her özellik ayrı commit olarak buraya gelir.

- Çalışmaya başlamadan önce: `git pull origin main`
- İş bitince: `git add -A && git commit -m "kısa not" && git push origin main`
- Çakışma olursa önce `git pull --rebase origin main`; tek dosya (`index.html`) olduğu için çakışmayı satır bazında çöz.
- Sıfırdan kurulum: `git clone <repo-adresi>` sonra `index.html` dosyasını tarayıcıda aç.
- Testler `tests/` altında (Playwright); `stub.js` sahte veri katmanıdır.

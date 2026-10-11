# Faz raporları: önce burayı oku

Bu klasör, ProofPath'i fazlar halinde geliştiren oturumun (yürütücü) her fazın sonunda yazdığı raporları toplar. Yeni bir faza başlayan oturum **keşfi tekrarlamaz**: aşağıdaki tablodan ihtiyacı olanı doğrudan okur.

## Nerede ne var

| Ne | Nerede | Ne zaman okunur |
|---|---|---|
| Bu dosya (rapor formatı, dal düzeni) | `origin/main:docs/faz-raporlari/README.md`, main'e girmediyse `origin/claude/project-thread-5kc0zn:docs/faz-raporlari/README.md` | Her fazın başında |
| Önceki fazın raporu | `origin/faz-<önceki>:docs/faz-raporlari/faz-<önceki>.md` | Her fazın başında; açık riskler ve "sonraki faza devredilenler" bölümü |
| Faz haritası: her fazın beklenen çıktıları ve kabul ölçütleri | `docs/analiz/master-prompt-faz-haritasi.md` §4 (notlar dalında) | Fazın kapsamını belirlerken |
| Ana plan (tam metin) | Yürütücünün çalışma klasöründeki `PROOFPATH_MASTER.md`, yalnız fazın andığı bölümler | Ayrıntı gerekince |
| Mühendislik kayıtları (`AUDIT.md`, `NEXT_STEPS.md`, `FEATURE_INVENTORY.md`, `TESTING.md` …) | Faz 1B'den sonra faz dalının kökünde | Her fazda; güncellenir |
| Bağımsız analiz notları (yürütücü dışında, gözden geçiren tarafından) | `docs/analiz/faz-<N>.md` (notlar dalında) | İsteğe bağlı; önceki fazda gözden kaçanlar |

Bir şeyi yeniden ölçmek gerekiyorsa (ör. test sayıları), önceki rapordaki değeri yaz, yeni ölçümü yanına koy ve farkı açıkla.

## Dal düzeni

- Her faz kendi dalında: `faz-2a`, `faz-1b`, `faz-2b`, `faz-3` … `faz-11`.
- Her faz dalı bir önceki faz dalından açılır: `git fetch origin && git checkout -b faz-<N> origin/faz-<önceki>`. Önceki dal yoksa dur ve bildir.
- Her önemli değişiklikten sonra testler koşulur, küçük bir commit atılır ve `git push -u origin faz-<N>` yapılır.
- `main`'e push, force-push, merge ve deploy yok. `main` canlı sitedir (GitHub Pages); oraya ne zaman geçileceğine kullanıcı karar verir.
- Aynı faz ikinci kez verilirse (büyük fazlar: 2B, 5, 10) aynı dalda devam edilir ve raporun sonuna yeni bir "Tur N" bölümü eklenir.
- Analiz notları ayrı bir notlar dalında tutulur (`claude/project-thread-5kc0zn`); yürütücü o dala yazmaz.

## Rapor dosyası

Yol: `docs/faz-raporlari/faz-<N>.md`, faz dalında. Dil Türkçe. Başlıklar şu sırada ve bu adlarla:

```markdown
# Faz <N> — <kısa ad>

Tarih: YYYY-AA-GG · Dal: faz-<N> · Taban: <önceki dal>@<kısa sha> · Son commit: <kısa sha>
Verilen prompt: <bir iki cümleyle özet; ek talimat geldiyse onu da yaz>

## Yapılanlar
Madde başına: ne değişti, hangi dosyalar, hangi commit.

## Yapılmayanlar ve nedeni
Kapsamdaki her eksik iş: neden yapılmadı (engel / kapsam dışı / zaman / izin gerekli), ne gerekiyor.

## Çalıştırılan testler (gerçek sonuçlar)
| Komut | Sonuç (GEÇTİ / KALDI / ZAMAN AŞIMI / ÇÖKTÜ sayıları) | Önceki fazla fark |
Çalıştırılmayan test varsa nedeniyle yazılır. Uydurma ya da tahmini sayı yazılmaz.

## Doğrulanan / varsayılan
| İddia | Durum: Doğrulandı (komut/çıktı) · Varsayım · Test edilmedi · Erişim yok | Kanıt |

## Değişen dosyalar
`git diff --stat <taban>..HEAD` çıktısı.

## Kayıt dosyaları
Hangileri güncellendi (`NEXT_STEPS.md` her zaman).

## Riskler
Açık P0/P1'ler dahil; her biri için etki ve öneri.

## Sonraki faza bağımlılıklar
Sonraki fazın başlamadan bilmesi veya kapatması gerekenler; kullanıcıdan beklenen kararlar/izinler.
```

## Ortak kurallar (her faz)

- Secret, anahtar, token istenmez, kullanılmaz, commit edilmez. Supabase'e veya canlı bir servise bağlanılmaz. SQL değişikliği yalnız `supabase/migrations/` altında dosya olarak yazılır, uygulanmaz.
- Fazın izin verdiği dosyaların dışına dokunulmaz. Kapsam dışı bir hata bulunursa düzeltilmez, rapora yazılır.
- Testi geçirmek için assert zayıflatılmaz, test silinmez/atlanmaz.
- Kullanıcı verisini silen ya da sıfırlayan değişiklik yok; depolama anahtarları ve formatları geriye uyumlu kalır.
- Yalnız gerçekten çalıştırılan komutun sonucu "doğrulandı" diye yazılır.

## Fazlar

| Faz | Konu | Dal | Durum |
|---|---|---|---|
| 1 | Keşif (rapor, kod değişikliği yok) | — (yerel, itilmedi) | Bitti; not: `docs/analiz/faz-1.md` |
| 2A | Test ağının onarımı | `faz-2a` | Sürüyor |
| 1B | Stabilizasyon: P1 düzeltmeleri, kayıtlar repoya | `faz-1b` | Bekliyor |
| 2B | Modüler refaktör | `faz-2b` | Bekliyor |
| 3 | Öğrenme temelleri | `faz-3` | Bekliyor |
| 4 | Mevcut modüllerin entegrasyonu | `faz-4` | Bekliyor |
| 5 | Öğretim ve etkileşimli pratik | `faz-5` | Bekliyor |
| 6 | Koç ve kişiselleştirme | `faz-6` | Bekliyor |
| 7 | Planlama ve öğrenme ikizi | `faz-7` | Bekliyor |
| 8 | Yetkinlik ve kariyer | `faz-8` | Bekliyor |
| 9 | Çevrimdışı, senkron ve güven merkezi | `faz-9` | Bekliyor |
| 10 | Alan tamamlama (Veri Analitiği) | `faz-10` | Bekliyor |
| 11 | Son kalite ve yayın hazırlığı | `faz-11` | Bekliyor |

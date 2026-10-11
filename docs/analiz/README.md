# Analiz notları

Yürütücü oturumdan bağımsız, her fazın çıktısını ana planla karşılaştıran notlar. Yürütücü bu klasöre yazmaz; kendi raporları `docs/faz-raporlari/` altındadır.

| Dosya | İçerik |
|---|---|
| [master-prompt-faz-haritasi.md](master-prompt-faz-haritasi.md) | Ana planın faz haritası: ortak kurallar, kayıt dosyaları, bağımlılık sırası, her fazın beklenen çıktıları ve kabul ölçütleri (§4), faz sonu kontrol listesi (§6), toplu yeniden analiz kapsamı (§7) |
| [faz-1.md](faz-1.md) | Faz 1 (keşif): yapılanlar, yeniden doğrulananlar, eksikler |
| [faz-2a.md](faz-2a.md) | Faz 2A (test ağı): verilen prompt, beklenenler, tuzaklar, bitiş kontrol listesi |
| [faz-promptlari.md](faz-promptlari.md) | Yürütücüye verilen faz promptları (1B–11) ve Faz 2A ek talimatı |

Her yeni faz için `faz-<N>.md` eklenir. Faz raporu `origin/faz-<N>:docs/faz-raporlari/faz-<N>.md` ile karşılaştırılır, haritanın §6 kontrol listesi uygulanır. Son fazdan sonra §7 kapsamında toplu yeniden analiz yapılır.

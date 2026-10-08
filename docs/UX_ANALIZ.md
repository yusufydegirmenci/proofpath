# UX analizi: 60 yaşında, bu alanı hiç bilmeyen biri

Yöntem: uygulamayı bu kişinin gözüyle gezdik (akıl yürütmeye dayalı simülasyon, gerçek kullanıcı testi değil) ve otomatik erişilebilirlik taraması çalıştırdık (küçük yazı, dokunma alanı, kontrast, taşma; 4 ekran boyutu × 10 sekme).

## Bulgular

| Sorun | Çözüm |
|---|---|
| Bugün ekranında XP, seri, joker, pas, semt gibi oyun terimleri; Müdür uyarısı dersin önünde | Sade mod: tek büyük düğme "Bugünkü dersi başlat"; uyarı dersin ardına alındı |
| 9,5–11 px yazılar | Gövde 16 px, etiketler 12,5 px alt sınır, Yazı boyutu seçeneği (3 kademe) |
| 38–39 px dokunma alanı | Düğmeler en az 44 px, sekmeler 50 px |
| Açık temada düşük kontrast (3,4–3,9:1) | Renk belirteçleri güncellendi, yüksek kontrast seçeneği eklendi |
| Ders sayfası yönetici açıklamasıyla başlıyordu | Ders başlığı sadeleştirildi, hedef kutusu eklendi |
| Rehber, sözlük, yazı ayarı yoktu | Rehber, Sözlük (canlı arama), Ayarlar sekmeleri |
| Yarışma ögeleri baskı yaratıyor | Tempo seçimi (rahat/normal/hızlı); sade modda lig gizli |
| 267 px'te Sayılar sekmesinde taşma | Satırlar sarılıyor |

## Hâlâ doğrulanmadı

- Gerçek telefon ve Firefox'ta `zoom` tabanlı yazı büyütme.
- Gerçek yaşlı kullanıcıyla deneme.

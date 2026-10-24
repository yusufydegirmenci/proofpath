/* Teknik İngilizce yolu · ders eki, ikinci parça (anahtar = TMAP.eng dizini, 11–12; ders no = anahtar + 1).
   Alanlar: benzetme + sınırı, rehberli alıştırma, bağımsız görev, yaygın hatalar, geçme ölçütü + kritik yanlış anlama, dış kaynak (son doğrulama tarihiyle), telafi/sonraki adım.
   Alıştırmalar kâğıt üzerinde, sesli tekrar ya da kendi çalışmanla yapılır; gerçek bir ekibin PR'ına ya da canlı bir sisteme yorum/bildirim yazmak gerekmez.
   Bu ek bir sınav seviyesi, puan ya da şirket kuralı iddia etmez; yalnız ders içindeki kalıpların kullanımını pekiştirir.
   Dış kaynak: yalnız HTTP 200 dönen ve başlığı konuyla eşleşen sayfalar (curl, 2026-10-19). */
(function () {
  var E = ((window.PP_EK = window.PP_EK || {}).eng = (window.PP_EK.eng || {}));
  var DOG = "2026-10-19";
  var K = function (t, u, neden) { return { t: t, u: u, dogrulama: DOG, neden: neden }; };

  E[11] = {
    analoji: { a: "Yola konan 'Dur' levhası yerine 'Lütfen yavaşla, önde okul var' yazan nazik bir not: aynı uyarıyı gerekçesiyle ve sürücüyü suçlamadan verir. İyi bir PR yorumu da değişikliği gerekçesiyle ve öneriyle söyler.", sinir: "Not tek yönlüdür; PR yorumu ise bir konuşmanın başlangıcıdır ve yazar yanıt verebilir. Ayrıca nezaket ciddi bir sorunu gizlememelidir: güvenlik açığı gibi bir durumda sorunun önemini açıkça belirt." },
    rehberli: ["Sert yorumu kibar hâle getir: 'Why you did not write a test?' Doğru soru sırasını, 'Did you ...?' ya da 'Could we add ...?' kalıbını ve bir gerekçeyi kullanarak kendi cümlenle kâğıda yaz.", "Bozuk yorumu düzelt: 'You must to change this variable name.' Hataları bul (must'tan sonra to, suçlayıcı You) ve 'Could we rename this variable so that it is clearer?' gibi bir sürüm yaz.", "Üç yorum yaz: biri 'Nit:', biri 'Question:', biri 'Suggestion:' etiketli olsun. Her birinde koda bakan bir gözlem ve 'because' ya da 'so that' ile bir gerekçe bulunsun; sonra sesli oku."],
    bagimsiz: "Kısa bir kodu (kendi yazdığın ya da herkese açık küçük bir örnek) incele: en az bir küçük sorun, bir soru ve bir önemli sorun bul. Her biri için etiketli, gözlem ve gerekçeli İngilizce bir yorum yaz. Sonra kendi yorumlarına karşı bir yazar gibi yanıt ver: biri için 'Good catch, thanks!', diğeri için kibar bir itiraz yaz. Metinlerde kişiyi hedef alan cümle bırakma.",
    hatalar: [["Yalnızca 'Fix this.' yazmak", "Neyi neden değiştireceğini söyle: gözlem, gerekçe ve öneri birlikte olsun."], ["Soru sırasını Türkçedeki gibi kurmak ('Why you did ...?')", "Soruda yardımcı fiil özneden önce gelir: 'Why did you ...?'; did'den sonra fiil yalın kalır."], ["'Could you to add' ya da 'Could you adding' demek", "could'tan sonra yalın fiil gelir: 'Could you add ...?'."], ["Her sorunu aynı sertlikte yazmak", "Etiket kullan: küçük notu 'Nit:' ile, ciddi sorunu gerekçesiyle ve açıkça belirt."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen bir koda küçük, soru ve önemli sorun yorumlarını ve bir itiraz yanıtını etiket, gözlem, gerekçe ve öneri parçalarıyla, doğru soru sırası ve fiil biçimiyle yazabilmek.", kritik: ["Yorumu kişiyi suçlayan 'You' cümlesiyle yazmak", "Ciddi bir sorunu nezaket uğruna belirsiz bırakmak"] },
    kaynaklar: [
      K("Google eng-practices: How to write code review comments", "https://google.github.io/eng-practices/review/reviewer/comments.html", "Yorumun kibar, açık ve gerekçeli yazılması için kısa kılavuz."),
      K("Google eng-practices: How to handle reviewer comments", "https://google.github.io/eng-practices/review/developer/handling-comments.html", "Yorumu alan yazarın yanıt vermesi ve anlaşmazlığı çözmesi için.")
    ],
    telafi: "Takıldıysan yorumu üç satıra böl: etiket, gözlem, gerekçe. Önce yalnız etiketli gözlemi yaz; gerekçeyi 'because ...' ile, öneriyi 'Could we ...?' ile sırayla ekle.",
    sonraki: "Sıradaki konu: Olay bildirimi. Gerekçeli ve olguya bağlı yazma becerini, bir kesinti sırasında durum güncellemesi yazarken kullanacaksın."
  };

  E[12] = {
    analoji: { a: "Havalimanı anonsu: uçuş gecikince hoparlör 'ne oldu, ne kadar sürecek, ne yapıyoruz, bir sonraki anons ne zaman' bilgisini kısa ve düzenli verir. İyi bir durum güncellemesi de aynı soruları cevaplar.", sinir: "Anons herkese aynı sesle okunur; olay bildiriminde ise okuyana göre ayrıntı değişir: teknik ekibe günlük ve hata kodu, müşteriye yalnız etki ve beklenen süre yazılır. Şirketinin hazır bir şablonu varsa onu kullan." },
    rehberli: ["Beş başlığı sırayla yaz: Status, Impact, What we know, Action, Next update. Uydurma bir kesinti (ör. giriş sayfası açılmıyor) için her başlığı tek kısa İngilizce cümleyle doldur.", "Bozuk güncellemeyi düzelt: 'Server broke by Ali. We fix now. Update maybe later.' Kişi adını çıkar, şimdiki zamanı doğru kur ve belirli bir sonraki güncelleme saati ver.", "Zamanı düzelt: 'The login is not working since 10.' cümlesini since ile present perfect kullanarak yeniden yaz; sonra 'It started at 10:05.' ve 'We are checking the logs.' ile birlikte sesli oku."],
    bagimsiz: "Uydurma bir kesinti seç ve iki mesaj yaz: önce 'Investigating' durumunda bir güncelleme, sonra 'Resolved' durumunda bir kapanış mesajı. Birinde bilmediğin nedeni 'We don't know the cause yet.' diye belirt. Ardından bir üst birime olayı bildiren, üç cümlelik bir yükseltme mesajı yaz. Hiçbir mesajda kişi suçlama, tahmini kesin neden gibi yazma.",
    hatalar: [["Nedeni tahminle kesin yazmak", "Kanıtın yoksa 'We think ...' ya da 'We don't know the cause yet.' de."], ["'is down since 10:05' gibi since ile yanlış zaman kullanmak", "since ile present perfect gelir: 'has been down since 10:05'."], ["Sonraki güncelleme saatini yazmamak", "'Next update at 11:00.' yaz; yeni bilgi yoksa söz verdiğin saatte 'No change yet.' yaz."], ["Bir kişiyi suçlayan cümle kurmak", "Olguyu edilgenle yaz: 'A wrong setting was released.'"]],
    gecme: { olcut: "Mini sınavda %80 ve verilen bir kesinti için beş parçalı durum güncellemesini, since ile doğru zamanlarla, tahmin ve suçlama içermeden İngilizce yazabilmek.", kritik: ["Bilmediği nedeni kesinmiş gibi yazmak", "Sonraki güncelleme saatini vermemek"] },
    kaynaklar: [
      K("Atlassian: Incident communication best practices", "https://www.atlassian.com/incident-management/incident-communication", "Olay sırasında güncellemenin kime, ne zaman ve hangi içerikle gideceği."),
      K("Google SRE Book: Postmortem culture", "https://sre.google/sre-book/postmortem-culture/", "Suçlamasız ve olgulara dayalı olay değerlendirmesi yazmak için.")
    ],
    telafi: "Takıldıysan güncellemeyi beş satıra böl ve her satırı tek kısa cümleyle doldur. Zaman karışırsa üç kalıba dön: başlangıç için 'It started at ...', süren durum için 'since ...', şu an yapılan iş için 'We are ...-ing'.",
    sonraki: "Yolun sonu: İngilizce yolunu bitirdin. PR yorumunu ve durum güncellemesini kendi işinden bir örnekle yaz, stand-up'ı ve kendini tanıtmayı sesli tekrar et; sonra toplantı sunumu ya da doküman yazma gibi yeni bir iş İngilizcesi konusunu kendin hedef seç."
  };
})();

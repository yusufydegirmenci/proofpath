/* DevOps yolu · Faz 5 tur 5: konu başına ders eki (anahtar = TMAP.dev dizini, 0–17).
   Benzetme + sınırı, rehberli alıştırma, bağımsız görev, yaygın hatalar, geçme ölçütü + kritik yanlış anlama,
   dış kaynak (son doğrulama tarihiyle), telafi/sonraki adım.
   Tüm alıştırmalar kendi makinede, yerel kapsayıcıda ya da kâğıt üzerinde yapılır; canlı/maliyetli bulut işlemi istemez.
   Dış kaynak: yalnız HTTP 200 dönenler (curl, 2026-10-12); konu 0 ve 1 için doğrulanabilir adres bulunamadığından kaynak eklenmedi. */
(function () {
  var E = ((window.PP_EK = window.PP_EK || {}).dev = (window.PP_EK.dev || {}));
  var DOG = "2026-10-12";
  var K = function (t, u, neden) { return { t: t, u: u, dogrulama: DOG, neden: neden }; };

  E[0] = {
    analoji: { a: "Restoran mutfağı: siparişi alan, pişiren ve servis eden ekip aynı tezgâhta konuşursa yemek hızlı ve sıcak çıkar; herkes kendi köşesinde çalışırsa tabaklar arada kaybolur.", sinir: "Mutfakta ekip küçük ve tek yerdedir; yazılımda ekipler, ortamlar ve dağıtımlar çoğalır, bu yüzden kültür tek başına yetmez, otomasyon da gerekir." },
    rehberli: ["Bir uygulamanın fikirden kullanıcıya ulaşana kadarki yolunu kâğıda 5 kutu olarak çiz (kod, derleme, test, yayın, izleme).", "Her kutunun yanına şu an elle yapılan bir işi yaz.", "Elle yapılan işlerden birini seç ve otomatikleşirse hangi hatanın önleneceğini bir cümleyle açıkla."],
    bagimsiz: "Bir okul ödevi projesini düşün. Kodu yazmaktan 'teslim edilmiş' olmaya kadar hangi adımlar var? Geri bildirimin hangi adımda gelmesini isterdin, nedenini yaz.",
    hatalar: [["DevOps'u bir araç ya da unvan sanmak", "DevOps bir çalışma biçimidir; araçlar bu biçimi kolaylaştırır."], ["Otomasyonu tek hedef saymak", "Amaç hızlı ve güvenli geri bildirimdir; otomasyon bunun yoludur."], ["Geliştirme ve işletmeyi ayrı sorumluluk görmek", "Aynı ekip hem yayına çıkar hem sonucunu izler."]],
    gecme: { olcut: "Mini sınavda %80 ve bir yayın sürecinde elle yapılan adımı otomasyon ve geri bildirimle ilişkilendirebilmek.", kritik: ["DevOps'un yalnız Jenkins, Docker gibi araçlardan ibaret olduğunu sanmak", "Hızlı yayının güvenlikten ödün vermek demek olduğunu sanmak"] },
    telafi: "Takıldıysan tek bir işi seç (ör. ödevi teslim etmek) ve sor: Elle mi yapıyorum, hata nerede çıkıyor, kim görüyor?",
    sonraki: "Sıradaki konu: Linux ve komut satırı."
  };

  E[1] = {
    analoji: { a: "Komut satırı, kasaya sipariş verdiğin tezgâhtır: menüdeki resimlere dokunmak yerine ne istediğini yazılı söylersin; kasiyer (kabuk) isteği çekirdeğe iletir.", sinir: "Tezgâhta yanlış sipariş yalnız yemeği bozar; komut satırında yanlış komut (ör. silme) geri alınamayabilir, bu yüzden yetki ve dikkat önemlidir." },
    rehberli: ["Kendi makinende (Linux, WSL ya da yerel kapsayıcıda) pwd, ls -l ve whoami komutlarını çalıştır.", "Bir deneme dosyası oluştur ve chmod ile okuma/yazma iznini değiştirip ls -l çıktısındaki farkı oku.", "ps ile çalışan süreçleri listele ve bir sürecin PID'sini not et."],
    bagimsiz: "Boş bir deneme klasöründe iki dosya oluştur, birini yalnız kendin yazabilecek şekilde izinlendir ve ls -l çıktısını kendi cümlelerinle yorumla. Kritik sistem klasörlerinde deneme yapma.",
    hatalar: [["Her şeyi root ile çalıştırmak", "Gerekmedikçe sıradan kullanıcıyla çalış; yetki en aza indirilir."], ["chmod 777 ile sorunu çözmek", "Önce hangi kullanıcının hangi izne ihtiyacı olduğunu bul; herkese tam yetki vermek açık bırakır."], ["Komutun ne yaptığını okumadan yapıştırmak", "Önce man ya da --help ile oku, mümkünse deneme klasöründe dene."]],
    gecme: { olcut: "Mini sınavda %80 ve ls -l çıktısındaki izinleri okuyabilmek.", kritik: ["İzinlerin yalnız dosya sahibi için olduğunu sanmak (grup ve diğerleri de vardır)", "Süreç ile programı aynı şey sanmak (süreç çalışan örnektir)"] },
    telafi: "Takıldıysan yalnız üç komutla başla: pwd (neredeyim), ls -l (burada ne var), whoami (kimim).",
    sonraki: "Sıradaki konu: Bash betikleme."
  };

  E[2] = {
    analoji: { a: "Yemek tarifi: aynı adımlar her seferinde aynı sırayla yazılır, kim yaparsa yapsın sonuç benzer çıkar.", sinir: "Tarif adım atlanırsa uyarmaz; betik de hata kodunu kontrol etmezse bozuk bir adımdan sonra çalışmaya devam eder." },
    rehberli: ["Deneme klasöründe merhaba.sh dosyası yaz: ilk satır #!/usr/bin/env bash, sonra bir değişkene ad ata ve echo ile yazdır.", "chmod +x ile çalıştırılabilir yap, çalıştır ve $? ile çıkış kodunu yazdır.", "ls olmayan_dosya komutundan sonra $? değerine bak; 0 ile farkını açıkla.","ls | wc -l ile klasördeki öğe sayısını say; | işaretinin ilk komutun çıkışını ikinci komuta bağladığını açıkla."],
    bagimsiz: "Bir klasördeki .txt dosyalarını sayıp sonucu yazan kısa bir betik yaz (yalnız deneme klasöründe). Betiğin başına set -e ekleyip ne değiştiğini kendi cümlelerinle anlat.",
    hatalar: [["Değişkeni tırnaksız kullanmak", "Boşluklu değerlerde bozulur; \"$degisken\" biçiminde tırnakla."], ["Çıkış kodunu yok saymak", "0 başarı, sıfırdan farklı hatadır; CI bu koda bakarak karar verir."], ["Betikte parolayı düz yazmak", "Parolayı ortam değişkeni ya da gizli bilgi yönetimiyle ver, dosyaya gömme."]],
    gecme: { olcut: "Mini sınavda %80 ve kısa bir betikte değişken, çıkış kodu ve boru kullanımını okuyabilmek.", kritik: ["Çıkış kodu 0'ın hata anlamına geldiğini sanmak", "Betiğin yalnız çıktısına bakıp çıkış koduna bakmamak"] },
    kaynaklar: [K("GNU Bash Reference Manual", "https://www.gnu.org/software/bash/manual/bash.html", "Değişken, çıkış durumu ve boru davranışının resmî tanımı.")],
    telafi: "Takıldıysan tek satırlık bir betik yaz (echo merhaba), çalıştır ve $? değerine bak; sonra bir satır ekle.",
    sonraki: "Sıradaki konu: Git ve takım akışı."
  };

  E[3] = {
    analoji: { a: "Ortak bir belgede 'değişiklikleri izle': her düzenleme tarihli ve imzalıdır, taslak kopyada denenir, onaylanınca ana metne işlenir.", sinir: "Belgede herkes aynı anda aynı cümleyi düzenleyebilir; Git'te aynı satırı iki kişi değiştirirse çakışma çıkar ve elle çözmen gerekir." },
    rehberli: ["Yerel bir deneme klasöründe git init yap, bir dosya ekle ve ilk commit'i at.", "git switch -c deneme ile dal aç, dosyayı değiştir, commit'le ve git log --oneline ile iki dalı karşılaştır.", "Ana dala dön, git merge deneme ile birleştir ve git revert ile son değişikliği geri al."],
    bagimsiz: "Deneme deposunda iki dalda aynı satırı farklı yaz, birleştirip çıkan çakışmayı çöz. Çakışma işaretlerinin (<<<<, ====, >>>>) ne gösterdiğini kendi cümlelerinle yaz.",
    hatalar: [["Ana dala doğrudan commit atmak", "Küçük dal aç, pull request ile gözden geçirt, sonra birleştir."], ["Paylaşılmış geçmişi force push ile değiştirmek", "Başkalarının işini bozar; yanlışı revert ile yeni commit olarak geri al."], ["Tek büyük, anlamsız commit atmak", "Küçük ve mesajı açık commit'ler geri almayı ve incelemeyi kolaylaştırır."]],
    gecme: { olcut: "Mini sınavda %80 ve dal, birleştirme ve geri almayı yerel bir depoda uygulayabilmek.", kritik: ["Git ile GitHub'ı aynı şey sanmak (Git yerel araçtır, GitHub barındırma servisidir)", "git revert ile reset'in aynı sonucu verdiğini sanmak (biri geçmişi korur)"] },
    kaynaklar: [K("Pro Git: Branches in a Nutshell", "https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell", "Dalın aslında bir işaretçi olduğunu anlatan resmî kitap bölümü."), K("git-rebase belgesi", "https://git-scm.com/docs/git-rebase", "Rebase ile merge farkını ve geçmişi yeniden yazmanın riskini okumak için.")],
    telafi: "Takıldıysan yalnız git status ve git log --oneline komutlarıyla nerede olduğunu gör, sonra tek bir dal aç.",
    sonraki: "Sıradaki konu: Ağ, DNS ve HTTP."
  };

  E[4] = {
    analoji: { a: "Posta: DNS adres defteri (isimden adres bulur), port apartman kapısı numarası, HTTP durum kodu da kargo firmasının teslim notudur.", sinir: "Posta tek yönlü ve yavaştır; ağ istekleri milisaniyede gider, önbellek (cache) yüzünden eski adres bir süre doğru görünebilir." },
    rehberli: ["Kendi makinende nslookup ya da dig ile bir alan adının IP adresini sorgula.", "curl -I ile bir sitenin yanıt başlığını al ve durum kodunu oku (200, 301, 404).", "'Siteye erişilemiyor' durumunu üç katmana böl: DNS çözülüyor mu, port açık mı, uygulama doğru yanıt veriyor mu."],
    bagimsiz: "Şu üç durumun hangi katmanın sorunu olduğunu yaz: alan adı çözülmüyor, bağlantı zaman aşımına uğruyor, sunucu 500 dönüyor. Her biri için ilk bakacağın komutu belirt.",
    hatalar: [["Her erişim sorununu uygulama hatası sanmak", "Önce DNS, sonra ağ/port, en son uygulama diye sırayla ele."], ["4xx ile 5xx'i karıştırmak", "4xx istemci tarafı, 5xx sunucu tarafı sorundur."], ["DNS değişikliğinin anında yayıldığını sanmak", "TTL ve önbellek yüzünden eski kayıt bir süre geçerli kalır."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen bir belirtiden hangi katmanın (DNS, ağ, uygulama) sorunlu olduğunu çıkarabilmek.", kritik: ["Yük dengeleyicinin uygulamayı kendi başına düzelttiğini sanmak", "404'ün sunucunun çöktüğü anlamına geldiğini sanmak"] },
    kaynaklar: [K("RFC 1034: Domain Names - Concepts and Facilities", "https://www.rfc-editor.org/rfc/rfc1034", "DNS'in temel kavramlarının orijinal tanımı."), K("RFC 9110: HTTP Semantics", "https://www.rfc-editor.org/rfc/rfc9110", "Durum kodlarının ve HTTP yöntemlerinin güncel tanımı.")],
    telafi: "Takıldıysan yalnız curl -I ile bir siteye istek at ve durum kodunun ne dediğini oku.",
    sonraki: "Sıradaki konu: CI/CD ve GitHub Actions."
  };

  E[5] = {
    analoji: { a: "Fabrikada bant sistemi: parça banda girer, kontrol istasyonlarından geçer, hatalıysa bant durur, sağlamsa paketlenip sevk edilir.", sinir: "Banttaki kontrol yalnız tanımlı testleri yapar; test yazılmamış bir hata banttan geçip yayına çıkabilir." },
    rehberli: ["Kendi deponda .github/workflows/ci.yml dosyası taslağı yaz: on: push, tek job, checkout ve bir test komutu (kâğıt ya da yerelde, yayına almadan).", "Pipeline'ı sırayla çiz: kod, derleme, test, artifact, yayın; hangi adımda durması gerektiğini işaretle.", "Bir testin kırılması durumunda yayının neden engellenmesi gerektiğini bir cümleyle yaz."],
    bagimsiz: "Küçük bir proje için üç adımlık (derle, test, paketle) bir pipeline taslağı yaz ve hangi adım başarısız olursa sonrakilerin çalışmaması gerektiğini gerekçelendir. Gizli bilgi gerektiren adımı sonraya bırak.",
    hatalar: [["CI ile CD'yi aynı şey sanmak", "CI değişikliği birleştirip test eder; CD onaylı sürümü ortama teslim eder."], ["Testsiz pipeline kurmak", "Test olmadan pipeline yalnız hatayı hızlı yayar."], ["Parolayı workflow dosyasına yazmak", "Secrets kullan; depoya düz metin gizli bilgi koyma."]],
    gecme: { olcut: "Mini sınavda %80 ve bir workflow taslağında tetikleyici, job ve adımı ayırt edebilmek.", kritik: ["Yeşil pipeline'ın hatasız yazılım demek olduğunu sanmak", "Gizli bilgiyi workflow dosyasına gömmenin sorun olmadığını sanmak"] },
    kaynaklar: [K("GitHub Actions'ı anlamak", "https://docs.github.com/en/actions/about-github-actions/understanding-github-actions", "Workflow, job ve adım kavramlarının resmî açıklaması.")],
    telafi: "Takıldıysan yalnız tek adımlı bir workflow yaz: kodu çek ve 'merhaba' yazdır.",
    sonraki: "Sıradaki konu: Konteyner, imaj ve registry."
  };

  E[6] = {
    analoji: { a: "Nakliye konteyneri: içine ne koyarsan koy, gemide, trende ya da kamyonda aynı kutu olarak taşınır.", sinir: "Nakliye konteyneri tamamen kapalı bir kutudur; yazılım konteyneri ise ana makinenin çekirdeğini paylaşır, bu yüzden sanal makine kadar yalıtılmış değildir." },
    rehberli: ["Kendi makinende (Docker ya da Podman kuruluysa) docker run hello-world çalıştır ve çıktıdaki adımları oku.", "docker images ile imajı, docker ps -a ile kapanmış konteyneri listele; imaj ile konteyner farkını yaz.", "docker rm ile konteyneri, docker rmi ile imajı temizle."],
    bagimsiz: "Bir imajın katmanlardan oluştuğunu ve registry'nin imajların saklandığı yer olduğunu kendi cümlelerinle anlat. Sonra 'imaj mı, konteyner mi?' sorusunu üç örnekle yanıtla.",
    hatalar: [["İmaj ile konteyneri karıştırmak", "İmaj kalıptır, konteyner çalışan örneğidir."], ["latest etiketine güvenmek", "Tekrarlanabilirlik için belirli sürüm etiketi ya da digest kullan."], ["Konteyneri sanal makine sanmak", "Konteynerler çekirdeği paylaşır; yalıtım farklıdır."]],
    gecme: { olcut: "Mini sınavda %80 ve imaj, konteyner ve registry arasındaki ilişkiyi bir örnekle anlatabilmek.", kritik: ["Konteyner içindeki verinin kalıcı olduğunu sanmak", "İmajın çalışan bir süreç olduğunu sanmak"] },
    kaynaklar: [K("Docker belgeleri: Docker nedir", "https://docs.docker.com/get-started/docker-overview/", "İmaj, konteyner ve registry kavramlarının resmî özeti.")],
    telafi: "Takıldıysan yalnız docker run hello-world komutunu çalıştırıp çıktıyı satır satır oku.",
    sonraki: "Sıradaki konu: Dockerfile, volume, ağ ve Compose."
  };

  E[7] = {
    analoji: { a: "Yemek kitabı (Dockerfile), kiler (volume) ve mutfak ekibini bir araya getiren iş planı (Compose): tarif yemeği yapar, kiler malzemeyi saklar, plan herkesin birlikte çalışmasını sağlar.", sinir: "Mutfakta kiler kalıcıdır; konteyner silinince yazdığı katman da silinir, kalıcı veri için volume'u bilinçli bağlamak gerekir." },
    rehberli: ["Küçük bir Dockerfile yaz: FROM, COPY ve CMD satırları; COPY (ve RUN, ADD) satırlarının dosya katmanı ürettiğini, CMD'nin katman eklemeden yalnız başlangıç komutunu belirlediğini not et.", "Yerelde docker build ile imajı derle; ardından bir volume bağlayarak konteyneri çalıştır ve konteyneri silip veri kaldı mı bak.", "İki servisli (uygulama ve veritabanı) bir compose.yaml taslağı yaz, servis adlarının birbirine ağ üzerinden erişimde ad olduğunu açıkla."],
    bagimsiz: "Bir uygulama ve bir veritabanı için compose.yaml yaz; veritabanı verisini volume'a bağla, parolayı Dockerfile'a ya da Git'e yazmak yerine ortam değişkeni ya da Compose secrets ile ver (gerçek parola kullanma, sahte değer yaz). Neden böyle yaptığını açıkla.",
    hatalar: [["Veriyi konteynerin içine yazıp kalıcı sanmak", "Kalıcı veri için volume ya da bind mount kullan."], ["Tüm projeyi kopyalayıp dev araçlarıyla büyük imaj üretmek", "Küçük taban imaj, .dockerignore ve çok aşamalı derleme kullan."], ["Konteyneri root olarak çalıştırmak", "USER ile yetkisiz kullanıcı tanımla."]],
    gecme: { olcut: "Mini sınavda %80 ve basit bir Dockerfile ile compose dosyasını okuyup ne yaptığını söyleyebilmek.", kritik: ["Volume'suz konteynerde yazılan verinin silinmeyeceğini sanmak", "Compose'un üretim ortamı orkestrasyonu olduğunu sanmak"] },
    kaynaklar: [K("Docker: Dockerfile en iyi uygulamalar", "https://docs.docker.com/build/building/best-practices/", "Küçük, güvenli ve önbellek dostu imaj yazmanın resmî önerileri."), K("Docker Compose belgeleri", "https://docs.docker.com/compose/", "Çok servisli yerel ortamı tek dosyada tanımlamanın resmî kılavuzu.")],
    telafi: "Takıldıysan yalnız FROM ve CMD içeren iki satırlık bir Dockerfile ile başla, sonra bir satır ekle.",
    sonraki: "Sıradaki konu: Kubernetes mimarisi."
  };

  E[8] = {
    analoji: { a: "Şehir yönetimi: belediye (control plane) kararları alır ve kayıt tutar, mahalleler (node'lar) işi fiilen yapar, kayıt defteri (etcd) hangi evde kim olduğunu bilir.", sinir: "Belediye kararını mahalleye bildirir ve bekler; Kubernetes ise istenen durumu sürekli karşılaştırıp kendi kendine düzeltir, yani bir kez emredip bırakılan bir sistem değildir." },
    rehberli: ["Mimariyi kâğıda çiz: control plane (API server, scheduler, controller manager, etcd) ve iki worker node (kubelet, kube-proxy, konteyner çalışma zamanı).", "'Bir Pod oluşturma isteği' yolunu sırala: istek, API server, etcd'ye yazım, scheduler'ın node seçimi, kubelet'in başlatması.", "CRI, CNI ve CSI'ın hangi alanı (çalışma zamanı, ağ, depolama) standartlaştırdığını eşle."],
    bagimsiz: "Bir node çökerse Kubernetes'in ne yapacağını, hangi bileşenin neyi fark edip hangisinin neyi başlatacağını sırala. Yerelde minikube ya da kind kurmak istersen yalnız kendi makinende dene.",
    hatalar: [["etcd'yi uygulama veritabanı sanmak", "etcd kümenin durumunu tutar; uygulama verisi için değildir."], ["Scheduler'ın Pod'u kendisi çalıştırdığını sanmak", "Scheduler yalnız node seçer; çalıştıran kubelet'tir."], ["Control plane'in her zaman node'larla aynı makinede olduğunu sanmak", "Yönetilen kümelerde control plane ayrı yönetilir."]],
    gecme: { olcut: "Mini sınavda %80 ve bir isteğin control plane bileşenlerinden geçiş sırasını söyleyebilmek.", kritik: ["Kubernetes'in konteyner imajı üreten bir araç olduğunu sanmak", "Kubernetes'in istenen durumu bir kez uygulayıp bıraktığını sanmak"] },
    kaynaklar: [K("Kubernetes: Küme mimarisi", "https://kubernetes.io/docs/concepts/architecture/", "Control plane ve node bileşenlerinin resmî açıklaması.")],
    telafi: "Takıldıysan yalnız iki kutu çiz: kararı veren (control plane) ve işi yapan (node); her birine bir bileşen yaz.",
    sonraki: "Sıradaki konu: Pod, Deployment ve ölçekleme."
  };

  E[9] = {
    analoji: { a: "Vardiya amiri: 'her an 3 görevli olsun' dersin; biri hastalanırsa yerine yenisi gelir, sen tek tek kişiyle ilgilenmezsin.", sinir: "İnsan görevli kişisel durumunu taşır; Pod'lar geçicidir ve yenisi öncekinin yerel durumunu taşımaz, bu yüzden veri Pod'un içinde tutulmamalıdır." },
    rehberli: ["Kâğıda 3 replika isteyen basit bir Deployment YAML'ı yaz (replicas, selector, template, image).", "Yerel kümede (kind/minikube) kubectl scale ile replikayı değiştirip kubectl get pods ile farkı izle; bir Pod'u silip yeniden oluştuğunu gör.", "Rolling update'te eski ve yeni Pod'ların birlikte yaşadığı süreyi readiness probe ile ilişkilendir."],
    bagimsiz: "Bir uygulama için liveness ve readiness probe'un ne zaman ayrı ayrı gerektiğini örnekle anlat. Yanlış probe'un bir Pod'u gereksiz yere yeniden başlatabileceği durumu bir cümleyle yaz.",
    hatalar: [["Pod'u kalıcı sunucu gibi görmek", "Pod silinir ve yenisi gelir; kalıcı veri için PVC kullan."], ["Probe'suz Deployment kullanmak", "Hazır olmayan Pod'a trafik gidebilir; readiness probe ekle."], ["Pod'ları elle tek tek yönetmek", "İstenen durumu Deployment'a bırak."]],
    gecme: { olcut: "Mini sınavda %80 ve replika sayısı ile rolling update'in istenen durum mantığını anlatabilmek.", kritik: ["Pod'un kendi kendine yeniden oluştuğunu (Deployment olmadan) sanmak", "Readiness ile liveness probe'un aynı işi yaptığını sanmak"] },
    kaynaklar: [K("Kubernetes: Pod'lar", "https://kubernetes.io/docs/concepts/workloads/pods/", "Pod'un en küçük dağıtım birimi olduğunu anlatan resmî sayfa."), K("Kubernetes: Deployment", "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/", "Replika, rolling update ve geri alma davranışının resmî açıklaması.")],
    telafi: "Takıldıysan yalnız 'istenen: 3, gerçek: 2' durumunu çiz ve Deployment'ın ne yapacağını yaz.",
    sonraki: "Sıradaki konu: Service, Ingress ve ağ."
  };

  E[10] = {
    analoji: { a: "Şirket santrali: çalışanlar (Pod'lar) sık değişir ama dış arayanlar hep aynı hat numarasını arar; santral (Service) çağrıyı o an uygun çalışana yönlendirir.", sinir: "Santral yalnız yönlendirir; çalışanın hazır olup olmadığını bilmez, Kubernetes'te de hazır olmayan Pod'u dışarıda bırakan şey readiness probe'dur." },
    rehberli: ["Etiketi app=web olan 3 Pod'u ve bunları selector ile seçen bir Service'i kâğıda çiz.", "ClusterIP, NodePort ve LoadBalancer türlerini 'kim erişebilir' sütunuyla karşılaştır.", "Bir NetworkPolicy taslağı yaz: yalnız 'web' etiketli Pod'lardan veritabanı Pod'una gelen trafiğe izin ver."],
    bagimsiz: "Bir web uygulaması için dışa açık Ingress, içeride ClusterIP Service ve veritabanını koruyan NetworkPolicy'den oluşan akışı çiz. Her bağlantıya neden izin verdiğini yaz.",
    hatalar: [["Pod IP'sine doğrudan güvenmek", "Pod IP'si değişir; Service adını kullan."], ["Her uygulamayı LoadBalancer ile açmak", "Ortak bir Ingress daha az maliyetli ve yönetilebilirdir."], ["NetworkPolicy tanımlamayıp ağın güvenli olduğunu sanmak", "Varsayılan olarak tüm Pod'lar birbirine erişebilir."]],
    gecme: { olcut: "Mini sınavda %80 ve bir senaryoda doğru Service türünü ve Ingress gerekip gerekmediğini seçebilmek.", kritik: ["Service'in yük dengeleyici dışında bir şey olmadığını sanmak (kararlı adres de sağlar)", "NetworkPolicy'nin her kümede kendiliğinden uygulandığını sanmak (ağ eklentisi destekliyor olmalı)"] },
    kaynaklar: [K("Kubernetes: Service", "https://kubernetes.io/docs/concepts/services-networking/service/", "Service türlerinin ve selector mantığının resmî açıklaması."), K("Kubernetes: Ingress", "https://kubernetes.io/docs/concepts/services-networking/ingress/", "Dışarıdan HTTP erişiminin nasıl yönlendirildiğinin resmî açıklaması.")],
    telafi: "Takıldıysan yalnız 'kim kime erişebilir' tablosu çiz: dış, Ingress, Service, Pod.",
    sonraki: "Sıradaki konu: ConfigMap, Secret, namespace ve depolama."
  };

  E[11] = {
    analoji: { a: "Otel odası: oda (imaj) herkese aynıdır, ayarlar (ConfigMap) misafire göre değişir, kasa (Secret) ayrı korunur, kat (namespace) ekipleri birbirinden ayırır.", sinir: "Kasa şifresi anahtarla korunur; Kubernetes Secret'ı varsayılan olarak yalnız base64 kodludur, şifreli değildir ve erişim yetkisiyle korunmalıdır." },
    rehberli: ["Aynı imajı iki ortam için (test, üretim) farklı ConfigMap değerleriyle çalıştıran bir taslak çiz.", "Bir Secret taslağında değerin base64 olduğunu, bunun şifreleme olmadığını (decode edilebildiğini) yerelde bir sahte değerle dene.", "Namespace'e göre bir ekibin yalnız kendi kaynaklarını görmesini sağlayan RBAC fikrini bir cümleyle yaz.","PVC'nin (kalıcı depolama isteği) ConfigMap ve Secret'tan farkını bir cümleyle yaz. Komut denemelerini yalnız yerel kümede (kind/minikube) yap, önce kubectl config current-context ile hangi kümeye bağlı olduğunu kontrol et; namespace silmek içindekilerin hepsini siler."],
    bagimsiz: "Veritabanı parolası, uygulama ayar dosyası ve kalıcı veri için hangisinin Secret, ConfigMap ve PVC'ye gideceğini eşleştir. Gerçek parola kullanma, sahte değer kullan.",
    hatalar: [["Ayarları imajın içine gömmek", "Yapılandırmayı ConfigMap ile dışarıdan ver; imaj her ortamda aynı kalsın."], ["Secret'ı şifreli sanmak", "Varsayılan olarak yalnız base64'tür; erişimi ve etcd şifrelemesini ayrıca düşün."], ["Secret'ı Git'e commit etmek", "Gizli bilgi depoya girmez; harici gizli bilgi yönetimi kullan."]],
    gecme: { olcut: "Mini sınavda %80 ve bir verinin ConfigMap, Secret ya da PVC'den hangisine ait olduğunu gerekçesiyle seçebilmek.", kritik: ["base64'ün güvenlik sağladığını sanmak", "Namespace'in tek başına güçlü güvenlik sınırı olduğunu sanmak"] },
    kaynaklar: [K("Kubernetes: Secret", "https://kubernetes.io/docs/concepts/configuration/secret/", "Secret'ın nasıl saklandığı ve güvenlik uyarılarının resmî açıklaması."), K("Kubernetes: Persistent Volumes", "https://kubernetes.io/docs/concepts/storage/persistent-volumes/", "PV ile PVC arasındaki ilişkinin resmî açıklaması.")],
    telafi: "Takıldıysan her veriye sor: Gizli mi (Secret), ayar mı (ConfigMap), kalıcı mı (PVC)?",
    sonraki: "Sıradaki konu: Helm ve GitOps."
  };

  E[12] = {
    analoji: { a: "Hazır yemek paketi (Helm) ve tarifi Git'te tutan bir şef (GitOps): paket kurulumu kolaylaştırır, şef mutfağın tarife uygun olup olmadığını sürekli denetler.", sinir: "Şef sapmayı fark eder ama tarifin kendisi yanlışsa yanlışı da aynen uygular; GitOps doğruluğu değil, uyumu sağlar." },
    rehberli: ["Bir values.yaml taslağı yaz (replicas, image tag) ve ortama göre hangi değerin değiştiğini işaretle.", "helm template çıktısının ne üreteceğini kâğıtta tarif et (ya da hazır küçük bir chart ile yalnız yerelde dene).", "GitOps döngüsünü sırala: Git'e değişiklik, denetleyici (Argo CD/Flux) fark eder, kümeyi eşitler; elle kubectl değişikliğinin ne olacağını yaz."],
    bagimsiz: "Geri almanın GitOps'ta nasıl yapıldığını (revert commit) ve Helm'de nasıl yapıldığını (rollback) karşılaştır, iki yaklaşımın farkını kendi cümlelerinle yaz.",
    hatalar: [["Kümede elle değişiklik yapıp Git'i güncellememek", "GitOps'ta tek doğru kaynak Git'tir; elle değişiklik geri alınır ya da sapma olur."], ["values.yaml'a parola yazmak", "Gizli bilgiyi harici yönetimle ver."], ["Chart ile release'i aynı şey sanmak", "Chart pakettir; release o paketin kümedeki çalışan örneği ve geçmişidir."]],
    gecme: { olcut: "Mini sınavda %80 ve chart, release ve GitOps döngüsünü ayırt edebilmek.", kritik: ["GitOps'un yalnız bir araç adı olduğunu sanmak (bir çalışma modelidir)", "Helm chart ile çalışan release'i aynı şey sanmak"] },
    kaynaklar: [K("Helm: Using Helm", "https://helm.sh/docs/intro/using_helm/", "Chart, release ve değer geçersiz kılmanın resmî anlatımı."), K("OpenGitOps", "https://opengitops.dev", "GitOps ilkelerinin topluluk tanımı.")],
    telafi: "Takıldıysan yalnız bir cümle yaz: 'Kümenin olması gereken hali Git'te, denetleyici onu eşitler.'",
    sonraki: "Sıradaki konu: Kod olarak altyapı: Terraform ve Ansible."
  };

  E[13] = {
    analoji: { a: "Mimari proje ve şantiye: proje (Terraform) binanın ne olacağını tarif eder, plan farkı gösterir; Ansible ise binanın içindeki mobilya düzenini yapar.", sinir: "Projede çizili olmayan bir duvar elle yıkılırsa proje bunu bilmez; Terraform state dosyası gerçeklikten saparsa plan yanıltıcı olabilir." },
    rehberli: ["Küçük bir Terraform dosyası taslağı yaz (yerel local_file gibi bulut gerektirmeyen bir kaynak) ve plan çıktısını oku.", "Plan ve apply farkını açıkla; plan'ın neden değişiklikten önce gözden geçirilmesi gerektiğini yaz.", "Ansible playbook'unda idempotent bir görevi (ör. paket kurulu olsun) tarif et ve iki kez çalıştırınca ne olacağını söyle."],
    bagimsiz: "State dosyasının ne için tutulduğunu ve içine gizli bilgi sızabileceği için neden dikkatli saklanması gerektiğini kendi cümlelerinle yaz. Gerçek bulut kaynağı oluşturma.",
    hatalar: [["terraform apply'ı plan okumadan çalıştırmak", "Önce plan'daki silme ve değiştirme satırlarını gözden geçir."], ["State dosyasını Git'e koymak", "State gizli bilgi içerebilir; uzaktan, şifreli ve kilitli bir backend kullan."], ["Ansible ile Terraform'u aynı iş sanmak", "Terraform kaynak oluşturur, Ansible sunucunun içini yapılandırır."]],
    gecme: { olcut: "Mini sınavda %80 ve plan/apply farkını ve state'in rolünü bir örnekle anlatabilmek.", kritik: ["Kodu yazınca kaynakların kendiliğinden oluştuğunu sanmak (apply gerekir)", "Idempotent'in 'her seferinde değişiklik yapar' demek olduğunu sanmak"] },
    kaynaklar: [K("Terraform: State", "https://developer.hashicorp.com/terraform/language/state", "State'in amacını ve saklama uyarılarını anlatan resmî sayfa."), K("Ansible: Giriş", "https://docs.ansible.com/ansible/latest/getting_started/introduction.html", "Playbook ve ajansız çalışma mantığının resmî tanıtımı.")],
    telafi: "Takıldıysan yalnız şunu yaz: 'Terraform ne var olmalı der, Ansible içinde ne olmalı der.'",
    sonraki: "Sıradaki konu: Gözlemlenebilirlik ve günlükleme."
  };

  E[14] = {
    analoji: { a: "Arabanın göstergeleri: hız ve yakıt göstergesi metrik, ses kaydı log, rotanın izi de trace gibidir; arıza ışığı ise alarmdır.", sinir: "Göstergeler arabayı durdurmaz; alarm yalnız doğru eşik ve doğru kişiye gidiyorsa işe yarar, gereksiz alarm yorgunluk yaratır." },
    rehberli: ["Küçük bir uygulama için üç sinyal belirle: bir metrik (istek sayısı), bir log (hata satırı), bir trace (isteğin yolu).", "Prometheus'un metrikleri çekme (pull) mantığını ve Grafana'nın görselleştirmesini iki kutu ile çiz.", "'Hata oranı %5'i aşarsa uyar' kuralı için neden anlık değil birkaç dakikalık süre koşulu koymak gerektiğini yaz."],
    bagimsiz: "Bir web uygulamasında 'yavaşladı' şikayeti geldiğinde hangi metriğe, hangi loga bakacağını sırala. Gereksiz alarmı azaltmak için iki öneri yaz.",
    hatalar: [["Her şey için alarm kurmak", "Kullanıcıyı etkileyen belirtilere alarm kur; gürültü alarm yorgunluğu yaratır."], ["Logları yapılandırmadan düz metin tutmak", "Yapılandırılmış (ör. JSON) log aramayı kolaylaştırır; gizli bilgi loglama."], ["İzlemeyi arızadan sonra eklemek", "Sistem yayına çıkmadan önce izleme düşünülmeli."]],
    gecme: { olcut: "Mini sınavda %80 ve metrik, log ve trace'i bir olay örneğinde ayırt edebilmek.", kritik: ["Logların tek başına gözlemlenebilirlik olduğunu sanmak", "Alarmın kendiliğinden sorunu çözdüğünü sanmak"] },
    kaynaklar: [K("Prometheus: Genel bakış", "https://prometheus.io/docs/introduction/overview/", "Metrik toplama mantığının ve bileşenlerinin resmî tanıtımı."), K("Prometheus: Alarm en iyi uygulamaları", "https://prometheus.io/docs/practices/alerting/", "Anlamlı alarm yazmanın resmî önerileri.")],
    telafi: "Takıldıysan tek bir soruyla başla: 'Sistem şu an sağlıklı mı?' ve bunu hangi tek sayıyla söylerdin?",
    sonraki: "Sıradaki konu: Gizli bilgi yönetimi ve DevSecOps."
  };

  E[15] = {
    analoji: { a: "Bina inşaatında güvenlik: yangın merdiveni çizimde olmalı, bina bittikten sonra eklemek hem pahalıdır hem eksik kalır.", sinir: "Merdiven bir kez yapılır; yazılımda yeni açıklar sürekli çıkar, bu yüzden güvenlik denetimi bir kerelik değil, pipeline'da sürekli çalışmalıdır." },
    rehberli: ["Bir depoda gizli bilginin (API anahtarı) kazara commit edilmesini önleyecek bir kural taslağı yaz (ör. .gitignore ve commit öncesi kontrol fikri).", "Bir pipeline çiziminde imaj taraması ve bağımlılık denetimi adımını nereye koyacağını işaretle.", "En az yetki ilkesini bir Pod ve bir CI işi için örnekle: hangi izinler gerekmez?"],
    bagimsiz: "Bir pipeline'da 'güvenlik kapısı' koy: kritik zafiyet bulunursa yayın dursun mu? Kararını ve olası yanlış alarmla nasıl başa çıkacağını yaz. Sahte değerler kullan.",
    hatalar: [["Güvenliği yayından hemen önce eklemek", "Erken ve sık denetle; hata ucuza yakalanır."], ["Aynı yüksek yetkili anahtarı her yerde kullanmak", "Her bileşene yalnız ihtiyacı kadar yetki ver, anahtarları döndür."], ["İmaj taramasını tek seferlik görmek", "Yeni zafiyetler çıktığı için tarama düzenli tekrarlanmalı."]],
    gecme: { olcut: "Mini sınavda %80 ve pipeline'ın hangi aşamasında hangi güvenlik denetiminin yapılacağını söyleyebilmek.", kritik: ["Gizli bilgiyi dosyadan silince Git geçmişinden de silinmiş sanmak", "Tarama temiz çıktıysa yazılımın güvenli olduğunu sanmak"] },
    kaynaklar: [K("OWASP Top Ten", "https://owasp.org/www-project-top-ten/", "Web uygulamalarında en sık görülen güvenlik risklerinin listesi."), K("GitHub Actions güvenlik sıkılaştırma", "https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions", "Pipeline'da gizli bilgi ve yetkileri güvenli kullanma önerileri.")],
    telafi: "Takıldıysan tek bir gizli bilgiyi seç ve yaz: Nerede saklanır, kim okur, nasıl döndürülür?",
    sonraki: "Sıradaki konu: Bulutta DevOps: AWS eşlemesi."
  };

  E[16] = {
    analoji: { a: "Kiralık araç: ihtiyacın olduğunda alırsın, kullandığın kadar öder, işin bitince iade edersin; ama kapatmayı unutursan sayaç işlemeye devam eder.", sinir: "Araçta sayaç görünür; bulutta maliyet gizli kalabilir ve unutulan kaynak fatura yazar. Bu derste canlı bulut kaynağı açmak yerine yalnız kavram eşlemesi yapılır." },
    rehberli: ["Yerel kavramları AWS karşılığıyla eşle: CI/CD ile CodePipeline/CodeBuild, imaj registry ile ECR, Kubernetes ile EKS, izleme ile CloudWatch.", "IAM'de kullanıcı, rol ve politika farkını kâğıtta çiz; en az yetki ilkesine göre örnek bir politika düşün.", "Maliyeti kontrol etmek için bütçe uyarısı ve kaynak etiketleme fikrini bir cümleyle yaz (hesap açmadan)."],
    bagimsiz: "Yerel bir Docker Compose uygulamasını AWS servisleriyle (ECR, ECS ya da EKS, CloudWatch) eşleyen bir tablo yap. Hangi servisin fatura yaratabileceğini işaretle; canlı kaynak oluşturma.",
    hatalar: [["Kök hesapla (root) çalışmak", "Gündelik işte kök hesap yerine yetkisi sınırlı kullanıcı ya da rol kullan."], ["Kullanılmayan kaynakları açık bırakmak", "Bütçe uyarısı kur ve kaynakları iş bitince kapat."], ["Servis adını öğrenmeyi kavramı öğrenmek sanmak", "Kavramlar aynıdır; adlar sağlayıcıya göre değişir."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen bir yerel bileşenin AWS karşılığını ve maliyet riskini söyleyebilmek.", kritik: ["IAM'e tam yetki vermenin kolaylık olduğunu, riski olmadığını sanmak", "Bulutta her şeyin ücretsiz deneme kapsamında kaldığını sanmak"] },
    kaynaklar: [K("AWS CodePipeline kullanıcı kılavuzu", "https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html", "AWS'te CI/CD akışının resmî tanıtımı."), K("AWS IAM en iyi uygulamalar", "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html", "En az yetki ve güvenli hesap kullanımı için resmî öneriler.")],
    telafi: "Takıldıysan yerel bir bileşeni seç (ör. imaj registry) ve AWS karşılığını tek satırda yaz.",
    sonraki: "Sıradaki konu: SRE temelleri."
  };

  E[17] = {
    analoji: { a: "Okulda devam hakkı: yıl boyunca belirli sayıda devamsızlık hakkın vardır; hakkı akıllıca kullanırsın ama bittiğinde uyarılırsın.", sinir: "Devamsızlık hakkı tek bir dersle sınırlıdır; hata bütçesi ise kullanıcıya görünen tüm hizmeti kapsar ve bütçe bitince ne yapılacağı (yayını durdurma) önceden kararlaştırılmalıdır." },
    rehberli: ["Bir web hizmeti için bir SLI seç (başarılı isteklerin oranı) ve bir SLO belirle (ör. %99,9).", "Bu SLO'nun bir ayda kaç dakikalık kesintiye izin verdiğini (hata bütçesi) hesapla.", "Küçük bir arıza için suçlama içermeyen postmortem taslağı yaz: ne oldu, neden, ne öğrendik, ne yapacağız."],
    bagimsiz: "Hata bütçesi bittiğinde ekibin yeni özellik yayınını durdurup güvenilirliğe odaklanması gerektiğini bir örnekle gerekçelendir. %100 hedefin neden istenmediğini de yaz.",
    hatalar: [["%100 güvenilirliği hedeflemek", "Maliyetli ve yeniliği durdurur; ölçülü bir SLO belirle."], ["SLI ile SLO'yu karıştırmak", "SLI ölçülen değerdir, SLO hedeftir."], ["Postmortem'de suçlu aramak", "Süreçteki boşluğu bul; suçlamasız kültür öğrenmeyi artırır."]],
    gecme: { olcut: "Mini sınavda %80 ve verilen SLO'dan hata bütçesini hesaplayabilmek.", kritik: ["SLO'nun yalnız ölçüm olduğunu, hedef ve karar aracı olmadığını sanmak", "Hata bütçesi bitince yayına devam etmenin normal olduğunu sanmak"] },
    kaynaklar: [K("Google SRE Kitabı: Service Level Objectives", "https://sre.google/sre-book/service-level-objectives/", "SLI, SLO ve hata bütçesi kavramlarının kaynak bölümü."), K("Google SRE Kitabı: Postmortem kültürü", "https://sre.google/sre-book/postmortem-culture/", "Suçlamasız postmortem yazmanın resmî rehberi."), K("Google SRE Kitabı: Embracing Risk", "https://sre.google/sre-book/embracing-risk/", "Güvenilirliğin maliyetini ve ölçülü risk fikrini açıklar.")],
    telafi: "Takıldıysan tek bir hizmet seç ve sor: Ölçtüğüm sayı ne (SLI), hedefim ne (SLO), ne kadar hata hakkım var (bütçe)?",
    sonraki: "DevOps yolunu tamamladın. Şimdi yerel bir proje seçip derle, test et, paketle ve izle; öğrendiklerini uçtan uca birleştir."
  };
})();

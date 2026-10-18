/* Seviye sınavı soruları (Faz 9 sunucu): yalnız soru metni ve seçenekler. Doğru cevap ve açıklama BURADA DEĞİL; sunucuda (ogr_cevap_anahtari).
   Bu sorular js/veri/soru-bankasi.js içinden ayrıldı (orada yer tutucu kaldı); puanı sunucu hesaplar (zorluk d = ağırlık). */
(function () {
  var S = (window.PP_SINAV = window.PP_SINAV || {});
  S.seviye = {
  "bk": { hedef: "seviye:bk", varyant: "v1", sorular: [
    {"id":"11adfb75","d":1,"q":"AWS SAM CLI ile bir Lambda fonksiyonunu buluta göndermeden kendi bilgisayarında denemek için hangi komut kullanılır?","o":["sam delete","aws s3 ls","git push","sam local invoke"]},
    {"id":"15798ba9","d":1,"q":"AWS SAM (Serverless Application Model) ne işe yarar?","o":["Sunucuların donanımını izler","Kullanıcı parolalarını saklar","Ağ trafiğini şifreler","Lambda, API Gateway, DynamoDB gibi serverless kaynakları kısa bir şablon sözdizimiyle tanımlar ve dağıtımda CloudFormation'a dönüştürür"]},
    {"id":"181f0844","d":1,"q":"Bir mesajı aynı anda birden çok aboneye yayınlayan (publish/subscribe) AWS hizmeti hangisidir?","o":["Amazon SNS","Amazon SQS","Amazon S3","AWS KMS"]},
    {"id":"0474a8b8","d":2,"q":"CodeDeploy ile Lambda dağıtımında trafiğin önce küçük bir yüzdesinin yeni versiyona gitmesi, belirli bir süre sonra kalanının tek seferde aktarılması hangi dağıtım türüdür?","o":["All-at-once","Canary","Linear","In-place"]},
    {"id":"0871c56a","d":2,"q":"Yönetilen GraphQL API hizmeti?","o":["Amazon ECR","AWS AppSync","Amazon SNS"]},
    {"id":"0fcae05c","d":2,"q":"Başka hesaptaki role geçici girmek için çağrılan eylem?","o":["Invoke","AssumeRole","PutObject"]},
    {"id":"15cc9938","d":2,"q":"CloudFormation stack'ini güncellemeden önce hangi kaynakların değişeceğini, hangilerinin silinip yeniden oluşturulacağını görmek istiyorsun. Ne kullanırsın?","o":["Stack'i silip yeniden oluşturmak","CloudWatch alarmı","Change set (değişiklik kümesi)","S3 sürümleme"]},
    {"id":"07800873","d":3,"q":"Gecikmeye duyarlı bir API'de Lambda'nın cold start (soğuk başlangıç) gecikmesi sorun oluyor. Bunu azaltmak için en doğrudan çözüm hangisidir?","o":["Fonksiyonun timeout süresini artırmak","Reserved concurrency değerini sıfıra çekmek","Provisioned concurrency (önceden hazırlanmış eşzamanlılık) yapılandırmak","CloudWatch loglarını kapatmak"]},
    {"id":"0b576e44","d":3,"q":"AWS KMS ile büyük dosyaları şifrelerken kullanılan envelope encryption (zarf şifreleme) yöntemi nasıl çalışır?","o":["Dosya bir data key (veri anahtarı) ile şifrelenir; data key de KMS anahtarıyla şifrelenip dosyanın yanında saklanır","Dosya doğrudan root hesabın parolasıyla şifrelenir","Dosya Base64 ile kodlanır ve KMS'e yüklenir","KMS anahtarı dışa aktarılıp dosyanın içine düz metin olarak gömülür"]},
    {"id":"154b1f24","d":3,"q":"CodeDeploy ile yeni versiyonu dağıtırken hata oranı artarsa dağıtımın kendiliğinden eski versiyona dönmesini istiyorsun. En uygun yapılandırma hangisidir?","o":["Hata oranı için bir CloudWatch alarmı oluşturup deployment group'ta bu alarmı ve otomatik geri dönüşü (automatic rollback) etkinleştirmek","Her dağıtımdan sonra logları elle okuyup gerekirse yeniden dağıtmak","Lambda timeout süresini artırmak","Eski versiyonu silmek"]}
  ] },
  "ccna": { hedef: "seviye:ccna", varyant: "v1", sorular: [
    {"id":"12bc2016","d":1,"q":"Aynı ağdaki cihazlara MAC adresine bakarak çerçeve ileten cihaz hangisi?","o":["Switch","Modem","Firewall","Yazıcı"]},
    {"id":"1cc69f4f","d":1,"q":"DHCP ne işe yarar?","o":["Alan adını çözer","Cihazlara otomatik IP adresi verir","Dosya paylaşır","Trafiği şifreler"]},
    {"id":"4f0b980f","d":1,"q":"Bir IPv4 adresi kaç bittir?","o":["16","32","48","128"]},
    {"id":"051067d9","d":2,"q":"Birden çok kabloyu tek mantıksal bağlantıda toplamak?","o":["VLAN","NAT","EtherChannel"]},
    {"id":"067dfdcd","d":2,"q":"IP adresleri OSI modelinin hangi katmanında çalışır?","o":["1. Fiziksel","2. Veri bağı","3. Ağ","4. Taşıma"]},
    {"id":"2557bbfa","d":2,"q":"Yeni VLAN oluşturmak için hangi HTTP yöntemi?","o":["GET","DELETE","POST"]},
    {"id":"33fc8392","d":2,"q":"Cihazdan merkeze log mesajı yollamak?","o":["Syslog","NTP","DHCP"]},
    {"id":"0daa219f","d":3,"q":"Trunk portta birden çok VLAN'ı etiketlemek için kullanılan standart hangisi?","o":["802.1X","802.1Q","802.3","802.11"]},
    {"id":"397b9d77","d":3,"q":"STP'nin temel amacı nedir?","o":["Hızı artırmak","Layer 2'de döngüyü (loop) önlemek","IP dağıtmak","Şifrelemek"]},
    {"id":"5c3d9651","d":3,"q":"Farklı VLAN'ların birbiriyle konuşması için ne gerekir?","o":["Sadece bir hub","Layer 3 cihaz (router veya L3 switch)","Daha uzun kablo","İkinci bir DNS"]}
  ] },
  "dev": { hedef: "seviye:dev", varyant: "v1", sorular: [
    {"id":"21b38c01","d":1,"q":"Konteyner ile sanal makine arasındaki temel fark hangisidir?","o":["Konteyner kendi çekirdeğini çalıştırır, VM paylaşır","Konteyner host çekirdeğini paylaşır, VM kendi çekirdeğini çalıştırır","Konteyner yalnız Windows'ta çalışır","İkisi arasında fark yoktur"]},
    {"id":"269fea87","d":1,"q":"Güvenilirlik ölçümünde SLO nedir?","o":["Hizmet için belirlenen hedef güvenilirlik düzeyi","Bir müşteri sözleşmesindeki cezalar","Bir sunucunun işlemci modeli","Bir log biçimi"]},
    {"id":"2d2c48b8","d":1,"q":"Docker imajı nedir?","o":["Konteyner çalıştırmak için kullanılan salt okunur şablon","Çalışan bir konteyner süreci","Bir sanal ağ kartı","Bir izleme panosu"]},
    {"id":"1df6790d","d":2,"q":"Bir site IP adresiyle açılıyor ama alan adıyla açılmıyor. Sorun en olası nerededir?","o":["Disk doluluğunda","Git dalı yapısında","Konteyner imaj katmanlarında","DNS çözümlemesinde"]},
    {"id":"21787390","d":2,"q":"Veritabanı konteyneri silinip yeniden oluşturulunca veriler kayboluyor. Çözüm hangisidir?","o":["Konteynere daha fazla RAM vermek","Veri dizinini bir named volume'a bağlamak","İmaj etiketini latest yapmak","Portu 5432'den değiştirmek"]},
    {"id":"24aa759d","d":2,"q":"Pipeline'da unit testler kırmızı olduğu halde imaj yayına çıktı. Neyin eksik olduğunu söylersin?","o":["Test başarısızlığında sonraki aşamaları durduran kapı","Daha büyük bir runner","Daha fazla commit mesajı","Ek bir DNS kaydı"]},
    {"id":"34d27bbd","d":2,"q":"Bir veritabanı parolasını Kubernetes'e vermek istiyorsun. Hangisi doğru yaklaşımdır?","o":["ConfigMap içinde düz metin saklamak","İmajın içine gömmek","Secret kullanıp erişimi RBAC ile kısıtlamak ve etcd şifrelemesi açmak","Pod adına yazmak"]},
    {"id":"0a5655da","d":3,"q":"Bir sayaç türü metrik (http_requests_total) için saniyedeki istek oranını görmek istiyorsun. Hangi PromQL uygundur?","o":["sum(http_requests_total) by le","up == 1","rate(http_requests_total[5m])","node_cpu_seconds_total[5m]"]},
    {"id":"10157804","d":3,"q":"Service oluşturuldu ama istekler cevap vermiyor ve kubectl get endpoints boş görünüyor. En olası sebep nedir?","o":["Cluster çok küçük","DNS sunucusu kapalı","Namespace adı uzun","Service selector'ı ile Pod etiketleri eşleşmiyor"]},
    {"id":"112b1362","d":3,"q":"Pod'ların CPU yükü arttıkça sayısını otomatik artırmak için ne kullanılır, düğüm yetmezse neyi artırır?","o":["Vertical Pod Autoscaler; ConfigMap artırır","Horizontal Pod Autoscaler; düğümleri Cluster Autoscaler artırır","Ingress; Secret artırır","Helm; namespace artırır"]}
  ] },
  "eng": { hedef: "seviye:eng", varyant: "v1", sorular: [
    {"id":"22594387","d":1,"q":"\"We ___ a meeting at 3 pm.\"","o":["have","has","is","do"]},
    {"id":"3dbee858","d":1,"q":"Hangisi daha nazik bir rica?","o":["Help me.","Could you help me, please?","You help.","Help now."]},
    {"id":"67592ccb","d":1,"q":"\"Password\" kelimesinin Türkçesi nedir?","o":["Kullanıcı adı","Parola","Ağ","Sunucu"]},
    {"id":"120da61c","d":2,"q":"Hangi cümle doğru?","o":["She don't know the password.","She doesn't knows the password.","She doesn't know the password.","She not know the password."]},
    {"id":"1a80f95b","d":2,"q":"\"We need to upgrade the system ___ it is outdated.\"","o":["because","but","or","so"]},
    {"id":"1f565776","d":2,"q":"\"Thank you for your patience.\" ne demek?","o":["Acelen için sağ ol","Sabrın için teşekkürler","Cevabın için hoşça kal","Yardımın yok"]},
    {"id":"2a52a357","d":2,"q":"\"I am sorry ___ the delay.\"","o":["for","at","to","on"]},
    {"id":"42e7c3d8","d":3,"q":"\"I will get back to you tomorrow.\" ne demek?","o":["Yarın seni ararım/dönerim","Yarın giderim","Yarın seni görmem","Yarın geri alırım"]},
    {"id":"48622843","d":3,"q":"\"If the server ___ down, call me.\"","o":["go","goes","going","gone"]},
    {"id":"80500275","d":3,"q":"\"I have worked here ___ 2024.\"","o":["for","since","from","at"]}
  ] },
  "net": { hedef: "seviye:net", varyant: "v1", sorular: [
    {"id":"12ae792d","d":1,"q":"IPv6'da hangi trafik türü yoktur?","o":["Unicast","Multicast","Anycast","Broadcast"]},
    {"id":"1a658d17","d":1,"q":"Geçerli bir MAC adresi hangi biçimdedir?","o":["AA:BB:CC:11:22:33","192.168.1.10","fe80::1","255.255.255.0"]},
    {"id":"2a33e6ea","d":1,"q":"Sorun giderme metodolojisinde ilk adım nedir?","o":["Çözümü uygulamak","Sorunu belirlemek","Belgelemek","Kuramı test etmek"]},
    {"id":"1c5d66df","d":2,"q":"Bir çalışanın bilgisayarı 169.254.33.8 adresini aldı. Aynı VLAN'daki diğerleri normal. İlk kontrol hangisi olmalı?","o":["DHCP havuzu ve DHCP sunucusuna erişim","DNS kayıtları","Router'ın OSPF komşuluğu","NTP senkronu"]},
    {"id":"416df1fd","d":2,"q":"Bir ağ yöneticisi cihaz yönetiminde komut bazında yetkilendirme ve tam paket şifreleme istiyor. Hangisini seçmelidir?","o":["RADIUS","SNMPv2c","TACACS+","Telnet"]},
    {"id":"4ae99501","d":2,"q":"Wireshark'ta yalnız DNS trafiğini görmek için hangi süzgeç mantıklıdır?","o":["http","dns","arp","icmp"]},
    {"id":"4b486ff3","d":2,"q":"Misafir Wi-Fi ve muhasebe ağını ayırmanın en yaygın ve etkili yolu hangisidir?","o":["İkisine de aynı parolayı vermek","Ayrı SSID ve ayrı VLAN ile segmentasyon","Misafir SSID'sini gizlemek","2,4 GHz'e tek kanal tahsis etmek"]},
    {"id":"0feefb10","d":3,"q":"Ağ geçidi IP'si 192.168.10.1 olan bir ağda bir istemci 192.168.10.50/16 maskesiyle yapılandırılmış. Hangi belirti beklenir?","o":["Hiçbir sorun yok","Yalnız IPv6 çalışır","Bazı yerel hedeflere ulaşım sorunları, yanlış 'aynı ağda' kararı","İstemci APIPA alır"]},
    {"id":"2e4adcf0","d":3,"q":"Bir ağ yöneticisi tracert çıktısında 4. atlamadan sonra sürekli 'Request timed out' görüyor, ama hedefe ulaşılıyor. Yorum nedir?","o":["Hedef kapalıdır","Kablo kopmuştur","Bazı router'lar ICMP yanıtlarını bastırıyor; sorun olmayabilir","DNS çalışmıyor"]},
    {"id":"354b1c56","d":3,"q":"Bir tasarımda iki router tek sanal IP paylaşıyor. Aktif router arızalanınca ağ geçidi değişti ama bazı eski bağlantılar koptu. Hangi yaklaşım sürekliliği artırır?","o":["Durum senkronizasyonu (stateful failover) olan yedeklilik","Sanal IP'yi kaldırmak","Router'ları aynı rafa koymak","Maskeyi büyütmek"]}
  ] },
  "qa": { hedef: "seviye:qa", varyant: "v1", sorular: [
    {"id":"01db28ab","d":1,"q":"Duman testinin (smoke test) amacı nedir?","o":["Derlemenin ana işlevlerinin ayrıntılı teste değer olup olmadığını hızla görmek","Tüm gereksinimleri tek tek doğrulamak","Yük altında yanıt süresini ölçmek","Kullanıcı memnuniyetini ölçmek"]},
    {"id":"06c07315","d":1,"q":"Aşağıdakilerden hangisi testin amaçlarından biridir?","o":["Yazılımda hiç kusur olmadığını kanıtlamak","Kusurları bulmak ve kalite hakkında karar vericiye bilgi sağlamak","Geliştiricilerin performansını puanlamak","Bulunan kusurları otomatik olarak düzeltmek"]},
    {"id":"18958ba8","d":1,"q":"Siparişler tablosundaki toplam satır sayısını hangi sorgu verir?","o":["SELECT SUM(*) FROM siparisler;","SELECT LENGTH(*) FROM siparisler;","SELECT COUNT(*) FROM siparisler;","COUNT TABLE siparisler;"]},
    {"id":"0531eb73","d":2,"q":"Maaş avansı tutarı 1000-5000 TL (dahil) tam sayı kabul ediyor. İki değerli BVA için hangi test değerleri gerekir?","o":["1000, 5000","999, 1001, 4999, 5001","999, 1000, 5000, 5001","1000, 3000, 5000"]},
    {"id":"0b9d9265","d":2,"q":"Bir siparişin Yeni, Ödendi, Kargoda, Teslim edildi ve İptal durumları test edilecek. Hangi teknik en uygundur?","o":["Eşdeğerlik sınıfları","İfade kapsamı","Sınır değer analizi","Durum geçişi testi"]},
    {"id":"118db329","d":2,"q":"120 testin 90'ı yürütüldü, 81'i geçti. Yürütülenler içindeki geçme oranı nedir?","o":["%68","%90","%75","%81"]},
    {"id":"1a026f1e","d":2,"q":"Durumlar: A, B, C. Geçerli geçişler: A'dan B'ye, B'den C'ye, C'den A'ya, B'den A'ya. Geçerli geçiş kapsamı için kaç geçiş denenmelidir?","o":["3","4","2","8"]},
    {"id":"080fe2e8","d":3,"q":"Üç ikili koşullu tam tabloda 8 kural var. Birinci koşul Hayır ise diğer ikisi fark etmeksizin sonuç RED. Bu 4 kural tek kurala birleştirilirse tabloda kaç kural kalır?","o":["5","4","6","7"]},
    {"id":"0e4c90b5","d":3,"q":"Mobil uygulama, ödeme sağlayıcısının sandbox ortamıyla konuşuyor. Ekip uçtan uca sipariş akışını bu ortamla deniyor. Hangi seviyedir?","o":["Bileşen testi","Kabul testi","Statik test","Sistem entegrasyon testi"]},
    {"id":"160d9bb5","d":3,"q":"Sipariş 100 TL'ye kadar (dahil) %0, 100 üstü 500'e kadar (dahil) %5, 500 üstü %10 indirimli. Tam sayı TL girişleri. İki değerli BVA ile 100 ve 500 sınırlarını kapsayan değerler hangisidir?","o":["99, 100, 499, 500","100, 500","100, 101, 500, 501","101, 499"]}
  ] },
  "sec": { hedef: "seviye:sec", varyant: "v1", sorular: [
    {"id":"010af752","d":1,"q":"Olay müdahalesinde (incident response), enfekte olduğu anlaşılan bir bilgisayarı ağdan ayırmak hangi aşamaya aittir?","o":["Kontrol altına alma (containment)","Kökünü kazıma (eradication)","Kurtarma (recovery)","Ders çıkarma (lessons learned)"]},
    {"id":"13738da6","d":1,"q":"Çalışanlara kontrollü sahte oltalama e-postaları gönderip kimin bağlantıya tıkladığını ölçmek ve tıklayanlara eğitim vermek hangi faaliyettir?","o":["Zafiyet taraması (vulnerability scan)","Masaüstü tatbikatı (tabletop exercise)","Oltalama simülasyonu kampanyası (phishing simulation)","Yedekten geri yükleme testi"]},
    {"id":"2d5be1fc","d":1,"q":"Farklı cihazlardan gelen logları tek yerde toplayan, ilişkilendiren ve şüpheli durumlarda alarm üreten sistem hangisidir?","o":["DLP","WAF","NAC","SIEM"]},
    {"id":"009de560","d":2,"q":"Bir şirket, çok yüksek riskli bulduğu eski bir uygulamayı yamalamak yerine tamamen kapatmaya karar veriyor. Bu hangi risk yanıtıdır?","o":["Devretme (transfer)","Kabul (acceptance)","Azaltma (mitigation)","Kaçınma (avoidance)"]},
    {"id":"2e764414","d":2,"q":"Yeni başlayan bir stajyerin muhasebe raporlarını okuması gerekiyor ama değiştirmemesi gerekiyor. En doğru yetkilendirme hangisidir?","o":["İşler aksamasın diye Domain Admin grubuna eklemek","Muhasebe müdürünün hesabını ortak kullandırmak","Yalnızca o raporlara okuma (read-only) yetkisi vermek","Tam yetki verip yaptıklarını loglamak"]},
    {"id":"3fe3cdb2","d":2,"q":"Bir şirket IaaS (altyapı hizmeti) bulutunda sanal sunucu kiraladı. Sunucudaki işletim sisteminin yamalarından kim sorumludur?","o":["Bulut sağlayıcı","İnternet servis sağlayıcı","Sunucu donanımının üreticisi","Müşteri (şirketin kendisi)"]},
    {"id":"49404010","d":2,"q":"Bir çağrı merkezi ekranında müşterinin kart numarası **** **** **** 1234 şeklinde gösteriliyor. Bu hangi veri koruma tekniğidir?","o":["Hashleme (hashing)","Tokenizasyon (tokenization)","Veri maskeleme (data masking)","Steganografi"]},
    {"id":"0530c6b4","d":3,"q":"Bir sistemde erişim şöyle tanımlanmış: “Yalnızca İK departmanındaki kullanıcılar, mesai saatleri içinde ve şirket tarafından yönetilen bir cihazdan personel dosyalarını açabilir.” Bu hangi erişim kontrol modelidir?","o":["RBAC (rol tabanlı erişim kontrolü)","ABAC (öznitelik tabanlı erişim kontrolü)","DAC (isteğe bağlı erişim kontrolü)","MAC (zorunlu erişim kontrolü)"]},
    {"id":"1476b7b0","d":3,"q":"Kimlik doğrulama loglarında, yüzlerce farklı hesaba her birine yalnızca bir kez aynı yaygın parolanın (ör. Yaz2026!) denendiği görülüyor. Bu hangi saldırıdır?","o":["Kimlik bilgisi doldurma (credential stuffing)","Parola püskürtme (password spraying)","Rainbow table saldırısı","Tuş kaydedici (keylogger) saldırısı"]},
    {"id":"536a5061","d":3,"q":"Bir firewall kuralları yukarıdan aşağı okur ve ilk eşleşen kuralı uygular. Kurallar: 1) deny tcp any → 10.0.0.5 port 22, 2) allow tcp 10.0.1.0/24 → any port 22, 3) deny any any. 10.0.1.7 adresinden 10.0.0.5:22'ye bağlantı ne olur?","o":["Kural 1 ile engellenir","Kural 2 ile izin verilir","Kural 3 ile engellenir","Hiçbir kurala uymadığı için izin verilir"]}
  ] }
  };
})();

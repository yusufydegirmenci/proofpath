/* DevOps temel dersleri 2-6 (Linux, Bash, Git, Ağ/DNS/HTTP, CI/CD)
   Üretim: Faz 41c (GECE-10). Kod örnekleri çalıştırılarak/ayrıştırılarak doğrulandı; kaynak adresleri HTTP ile denetlendi (sonDogrulama 2026-11-06). */
(function () {
  var L = ((window.PP_LESSONS = window.PP_LESSONS || {}).dev = (window.PP_LESSONS.dev || {}));

  /* 2 ───────────────────────────── Linux ve komut satırı */
  L[2] = {
    "hook": "Sunucuya girdiğinde ekranda fare yok, yalnızca yanıp sönen bir imleç var; komut satırı, o evin her odasını tek tek anahtarla açtığın bir kapı zinciri gibidir.",
    "homework": "Kendi makinende (Git Bash, WSL ya da Linux) boş bir klasör aç; içine iki log dosyası yaz, grep ile içlerinden ERROR satırlarını sayıp sonucu bir dosyaya yönlendir ve betik dosyasına chmod ile çalıştırma izni ver.",
    "warmup": {
      "recap": [
        {
          "point": "DevOps, geliştirme ile işletmeyi ortak sorumlulukla ve otomasyonla buluşturur.",
          "example": "Elle yapılan her adım, ileride bir betiğe dönüşmesi gereken adaydır."
        }
      ],
      "concepts": [
        {
          "term": "Kabuk (shell)",
          "tr": "Komut yorumlayıcı",
          "summary": "Yazdığın komutları alıp işletim sistemine ileten programdır; en yaygını bash.",
          "example": "ls -l yazınca kabuk ls programını çalıştırır"
        },
        {
          "term": "İzin bitleri",
          "tr": "Okuma-yazma-çalıştırma hakları",
          "summary": "Her dosyada sahip, grup ve diğerleri için r (4), w (2), x (1) hakları vardır; üç rakamın toplamı chmod değerini verir.",
          "example": "750 = sahip rwx, grup r-x, diğerleri hiçbir şey"
        },
        {
          "term": "Boru ve yönlendirme",
          "tr": "Çıktıyı bağlamak",
          "summary": "| bir komutun çıktısını sonrakinin girdisi yapar; > çıktıyı dosyaya yazar, >> sonuna ekler.",
          "example": "grep ERROR app.log | wc -l"
        },
        {
          "term": "Süreç",
          "tr": "Çalışan program",
          "summary": "Her çalışan programın bir süreç numarası (PID) vardır; sinyallerle durdurulur ya da sonlandırılır.",
          "example": "SIGTERM (15) nazikçe, SIGKILL (9) zorla sonlandırır"
        }
      ]
    },
    "blocks": [
      {
        "t": "h",
        "text": "Neden öğreniyoruz?"
      },
      {
        "t": "box",
        "h": "Gerçek talep",
        "text": "Sabah 03:00, bir ekip arkadaşın yazıyor: sitenin sunucusunda disk doldu, sunucuya grafik arayüz yok. Tek yolun SSH ile bağlanıp komut satırında hangi klasörün şiştiğini, hangi sürecin yazdığını bulmak."
      },
      {
        "t": "h",
        "text": "Dizin ağacı ve gezinme"
      },
      {
        "t": "p",
        "text": "Linux tek bir kökten (/) dallanan bir dizin ağacıdır; sürücü harfi yoktur. Ayarlar genelde /etc altında, kayıtlar (log) /var/log altında, kullanıcı klasörleri /home altındadır. pwd bulunduğun yeri, ls içeriği, cd yer değiştirmeyi gösterir."
      },
      {
        "t": "steps",
        "h": "Gezinme ve dosya komutları",
        "items": [
          "pwd: şu an hangi klasördesin.",
          "ls -l: dosyaları izinleri ve boyutlarıyla listele.",
          "cd /var/log: mutlak yola git; cd .. bir üst klasöre çık.",
          "mkdir -p a/b: ara klasörlerle birlikte oluştur.",
          "cp kaynak hedef ve mv kaynak hedef: kopyala ve taşı (yeniden adlandırma da mv)."
        ]
      },
      {
        "t": "h",
        "text": "İzinler: kim ne yapabilir"
      },
      {
        "t": "p",
        "text": "ls -l çıktısındaki -rwxr-x--- gibi dizgi dosya türünü ve üç grup izni gösterir. r=4, w=2, x=1 toplanır: 7 tam yetki, 5 okuma ve çalıştırma, 0 hiçbir şey. chmod 750 betik.sh dosyayı sahibe tam, gruba okuma+çalıştırma yapar. Başkalarına yazma izni vermek bir güvenlik açığıdır."
      },
      {
        "t": "box",
        "h": "Dikkat",
        "text": "Sorun çözemeyince chmod 777 yazmak çözüm değildir; herkese yazma ve çalıştırma hakkı verir. Önce dosyanın sahibine ve grubuna bak (ls -l), sonra gereken en dar izni ver. Windows üzerindeki Git Bash NTFS izinlerini Linux gibi göstermeyebilir; izin sonuçlarını gerçek Linux ya da WSL ile dene."
      },
      {
        "t": "h",
        "text": "Boru, yönlendirme ve süzme"
      },
      {
        "t": "cmd",
        "lang": "bash",
        "calistirma": "atla elle çalıştırılıp doğrulandı: Git Bash, 2026-11-06 (klasör ve dosya komutları geçici klasörde denendi; ls -l izin sütunu Windows dosya sisteminde Linux gibi değişmediği için izin sonucu doğrulanmadı)",
        "text": "mkdir -p proje/log && cd proje\nprintf 'INFO basladi\\nERROR disk dolu\\nINFO bitti\\nERROR baglanti koptu\\n' > log/uygulama.log\ngrep ERROR log/uygulama.log | wc -l\ngrep ERROR log/uygulama.log > hatalar.txt\necho \"ek satir\" >> hatalar.txt\nwc -l hatalar.txt\nfind . -name \"*.log\"\ntail -n 1 log/uygulama.log\ntouch betik.sh && chmod 750 betik.sh"
      },
      {
        "t": "p",
        "text": "Bu betikte ilk grep satırı iki hata bulur ve sayıyı wc ile 2 olarak yazar. > dosyayı sıfırlayıp yazar, >> mevcut dosyanın sonuna ekler; yanlış operatör mevcut log dosyasını silebilir."
      },
      {
        "t": "h",
        "text": "Süreçler ve servisler"
      },
      {
        "t": "p",
        "text": "ps ile süreçleri, top ile canlı kaynak kullanımını görürsün. kill <PID> varsayılan olarak SIGTERM (15) gönderir; program kapanmadan önce temizlik yapabilir. SIGKILL (9) yakalanamaz, çekirdek süreci hemen sonlandırır ve temizlik yapılmaz; bu yüzden son çaredir. Modern dağıtımlarda servisleri systemd yönetir."
      },
      {
        "t": "cmd",
        "lang": "bash",
        "calistirma": "atla systemctl, journalctl, ss ve df Windows Git Bash içinde bulunmuyor ya da farklı çalışıyor; yalnız Linux/WSL üzerinde denenmeli (sözdizimi man sayfalarından okundu)",
        "text": "systemctl status nginx\njournalctl -u nginx --since \"1 hour ago\"\ndf -h\ndu -sh /var/log/* | sort -h | tail -5\nss -tlnp"
      },
      {
        "t": "steps",
        "h": "Elle deneme: log süzme",
        "items": [
          "Boş bir klasör aç ve içine gir.",
          "İçine yukarıdaki gibi iki satırı ERROR olan bir log yaz.",
          "grep -c ERROR dosya komutuyla hata sayısını bul.",
          "Sonucu > ile bir dosyaya yaz, >> ile bir satır ekle.",
          "chmod 750 ile bir betik dosyasına çalıştırma izni ver ve ls -l ile bak."
        ]
      },
      {
        "t": "warn",
        "h": "Tuzak",
        "text": "Silme komutları geri dönüşsüzdür: Linux çöp kutusu yoktur. Silmeden önce aynı yolu ls ile listeleyip hedefin doğru olduğunu gör; genişletme (*) ile silerken bulunduğun klasörü pwd ile kontrol et."
      }
    ],
    "objectives": [
      {
        "id": "h1",
        "text": "Dizin ağacında pwd, ls, cd, mkdir, cp ve mv ile gezip dosya düzenleyebilirsin."
      },
      {
        "id": "h2",
        "text": "ls -l çıktısındaki izinleri okuyup chmod ile üç rakamlı izin yazabilirsin."
      },
      {
        "id": "h3",
        "text": "Boru ve yönlendirmeyle bir log dosyasından hata satırlarını süzüp sayabilirsin."
      },
      {
        "id": "h4",
        "text": "SIGTERM ile SIGKILL farkını ve bir sürecin nasıl sonlandırıldığını açıklayabilirsin."
      }
    ],
    "summary": [
      "Linux tek köklü bir dizin ağacıdır; ayar /etc, kayıt /var/log altındadır.",
      "İzin rakamı r=4, w=2, x=1 toplamıdır; en dar izni vermek güvenli yoldur.",
      "| çıktıyı sonraki komuta bağlar, > dosyayı ezer, >> sonuna ekler.",
      "kill varsayılan olarak SIGTERM (15) gönderir; SIGKILL (9) son çaredir.",
      "Silme komutlarında önce listele, sonra sil; çöp kutusu yoktur."
    ],
    "prereq": [],
    "minutes": 30,
    "sonDogrulama": "2026-11-06",
    "surum": "1",
    "quiz": [
      {
        "id": "ac700fc6",
        "q": "Bir sunucuda uygulama ayar dosyalarını genellikle hangi dizinde ararsın?",
        "options": [
          "/var/log altında; çünkü orası tüm yapılandırmayı barındırır",
          "/home altında; çünkü sunucu ayarları kullanıcı klasöründe durur",
          "/etc altında; sistem ve servis ayarları orada tutulur",
          "/bin altında; çünkü ayarlar çalıştırılabilir dosyalarla yan yana durur"
        ],
        "obj": "h1"
      },
      {
        "id": "7c80ba2d",
        "q": "chmod 750 betik.sh komutundan sonra gruptaki başka bir kullanıcı bu dosya için ne yapabilir?",
        "options": [
          "Okuyabilir, yazabilir ve çalıştırabilir; çünkü grup sahibe eşittir",
          "Hiçbir şey yapamaz; çünkü yalnız sahip erişebilir",
          "Yalnız okuyabilir; çünkü çalıştırma izni yalnız sahibe verilir",
          "Okuyabilir ve çalıştırabilir ama değiştiremez"
        ],
        "obj": "h2"
      },
      {
        "id": "cf656c6e",
        "q": "Sahip tam yetkili, grup yalnız okuyabilir, diğerlerinin hiçbir hakkı olmayacaksa hangi chmod değeri doğrudur?",
        "options": [
          "740",
          "764; çünkü diğerlerine de okuma hakkı vermiş olursun",
          "470; çünkü sahip yalnız okuyabilir, grup tam yetkili olur",
          "700; çünkü grubun da erişimi kapatılmış olur"
        ],
        "obj": "h2"
      },
      {
        "id": "fadbbb0e",
        "q": "log/uygulama.log içinde kaç satırın ERROR içerdiğini ekrana yazdırmak için hangisi uygundur?",
        "options": [
          "grep ERROR log/uygulama.log > wc -l",
          "grep ERROR log/uygulama.log | wc -l",
          "wc -l ERROR log/uygulama.log | grep",
          "grep -v ERROR log/uygulama.log | wc -l"
        ],
        "obj": "h3"
      },
      {
        "id": "17cff7f7",
        "q": "Var olan bir rapor dosyasının sonuna yeni bir satır eklemek için hangi operatörü kullanırsın?",
        "options": [
          "> ; dosyanın sonuna ekler ve eski içeriği korur",
          "| ; çıktıyı dosyanın sonuna taşır",
          ">> ; dosyanın sonuna ekler",
          "2> ; standart çıktıyı dosyanın sonuna ekler"
        ],
        "obj": "h3"
      },
      {
        "id": "2de8b2d4",
        "q": "Bir sürece SIGTERM yerine SIGKILL (9) göndermeyi neden son çare sayarız?",
        "options": [
          "Süreç SIGKILL'i yakalayıp yok sayabilir; bu yüzden etkisizdir",
          "SIGKILL yalnız yönetici hesabının çalıştırdığı süreçlere uygulanabilir",
          "SIGKILL sürecin alt süreçlerini de otomatik başlatır",
          "Süreç temizlik yapamadan sonlanır; yarım işler bozulabilir"
        ],
        "obj": "h4"
      },
      {
        "id": "8ef2a718",
        "q": "Sunucuda bir sürecin PID'sini bulduktan sonra onu nazikçe kapatmak için ne yazarsın?",
        "options": [
          "kill <PID> ; varsayılan olarak SIGTERM (15) gönderir",
          "kill -9 <PID> ; varsayılan olarak SIGTERM gönderir",
          "rm <PID> ; süreç dosyasını siler",
          "cd <PID> ; sürecin klasörüne geçer ve süreci durdurur"
        ],
        "obj": "h4"
      }
    ],
    "interview": [
      {
        "q": "Bir sunucuda disk doldu. Hangi adımlarla nedenini bulursun?",
        "a": "Önce df -h ile hangi bölümün dolduğunu görürüm, sonra du -sh ile büyük klasörleri sıralarım (çoğunlukla /var/log). Büyük log dosyasını bulunca hangi sürecin yazdığını incelerim. Kök nedeni (log döndürme yok, hata döngüsü) çözmeden dosyayı silmem."
      },
      {
        "q": "chmod 777 neden kötü bir alışkanlıktır?",
        "a": "Herkese okuma, yazma ve çalıştırma hakkı verir; başka bir kullanıcı ya da ele geçirilmiş bir süreç dosyayı değiştirebilir. Doğru yol dosya sahibini ve grubu düzeltip en dar izni vermektir."
      },
      {
        "q": "> ile >> farkı nedir ve neden önemlidir?",
        "a": "> hedef dosyayı sıfırlayıp yazar, >> sonuna ekler. Log ya da rapor dosyasında yanlış operatör eski veriyi kalıcı olarak siler."
      }
    ],
    "vocab": [
      {
        "term": "permission",
        "tr": "izin",
        "ex": "The file permission is 640, so only the owner can write."
      },
      {
        "term": "pipe",
        "tr": "boru",
        "ex": "Use a pipe to send the output of grep to wc."
      },
      {
        "term": "process",
        "tr": "süreç",
        "ex": "The process ID shows which program uses the CPU."
      },
      {
        "term": "redirect",
        "tr": "yönlendirme",
        "ex": "Redirect the output to a file for later review."
      },
      {
        "term": "signal",
        "tr": "sinyal",
        "ex": "The process received a termination signal."
      }
    ],
    "sources": [
      {
        "title": "Linux man-pages: chmod(1)",
        "url": "https://man7.org/linux/man-pages/man1/chmod.1.html"
      },
      {
        "title": "Linux man-pages: hier(7) dosya sistemi hiyerarşisi",
        "url": "https://man7.org/linux/man-pages/man7/hier.7.html"
      },
      {
        "title": "Linux man-pages: signal(7)",
        "url": "https://man7.org/linux/man-pages/man7/signal.7.html"
      }
    ]
  };

  /* 3 ───────────────────────────── Bash betikleme */
  L[3] = {
    "hook": "Aynı on komutu üçüncü kez elle yazıyorsan, bir tarif defterine tarif eklemenin vakti gelmiştir; betik, komutlarını bir kez yazıp sonsuza dek güvenle çalıştırma yoludur.",
    "homework": "Bir klasördeki .txt dosyalarını başka bir klasöre kopyalayan, klasör verilmezse kullanım mesajı yazıp 2 koduyla çıkan bir betik yaz; boşluklu bir dosya adıyla da dene.",
    "warmup": {
      "recap": [
        {
          "point": "Boru ve yönlendirme komutları birbirine bağlar.",
          "example": "grep ERROR app.log | wc -l"
        },
        {
          "point": "Dosya çalıştırma izni chmod ile verilir.",
          "example": "chmod 750 betik.sh"
        }
      ],
      "concepts": [
        {
          "term": "Çıkış kodu",
          "tr": "Komutun sonuç numarası",
          "summary": "Her komut bittiğinde 0 (başarılı) ya da sıfırdan farklı (hata) bir kod döner; $? son kodu gösterir.",
          "example": "false komutundan sonra echo $? 1 yazar"
        },
        {
          "term": "Tırnaklama",
          "tr": "Değişkeni koruma",
          "summary": "Değişken çevresine çift tırnak koymazsan boşluklu değerler parçalanır; \"$x\" değeri tek parça tutar.",
          "example": "for f in *.txt ile \"a b.txt\" tek parça kalır"
        },
        {
          "term": "set -euo pipefail",
          "tr": "Sıkı mod",
          "summary": "Hata alınca betiği durdurur (-e), tanımsız değişkende hata verir (-u) ve boru hattındaki hatayı gizlemez (pipefail).",
          "example": "false | true normalde 0, pipefail ile 1 döner"
        },
        {
          "term": "trap",
          "tr": "Çıkışta temizlik",
          "summary": "Betik nasıl biterse bitsin (hata dahil) çalışacak bir komut tanımlar; geçici dosyaları silmek için kullanılır.",
          "example": "trap 'rm -rf \"$hedef\"' EXIT"
        }
      ]
    },
    "blocks": [
      {
        "t": "h",
        "text": "Neden öğreniyoruz?"
      },
      {
        "t": "box",
        "h": "Gerçek talep",
        "text": "Takım lideri her gece 02:00'de bir klasördeki raporları yedeğe kopyalamanı, eksik klasör varsa hata kodu döndürmeni istiyor. Elle yapılan iş unutulur; betik her gece aynı şekilde çalışır ve başarısızlığını sistem anlar."
      },
      {
        "t": "h",
        "text": "Betiğin iskeleti"
      },
      {
        "t": "p",
        "text": "Bir bash betiği shebang satırıyla (#! ve yorumlayıcı yolu) başlar, dosya olarak kaydedilir ve bash betik.sh ile ya da chmod +x sonrası ./betik.sh ile çalışır. Değişken atarken eşittir işaretinin çevresinde boşluk bırakılmaz: ad=\"Ali\". Kullanırken $ad yazılır ve her zaman çift tırnakla korunur."
      },
      {
        "t": "steps",
        "h": "Temel yapı taşları",
        "items": [
          "Argümanlar: $1 ilk, $2 ikinci argüman; ${1:-varsayilan} boşsa varsayılan değer verir.",
          "Koşul: if [[ -d \"$klasor\" ]]; then ... fi; -d klasör var mı, -z boş mu, -e var mı demektir.",
          "Döngü: for dosya in *.txt; do ... done.",
          "Aritmetik: n=$((n + 1)).",
          "Hata mesajı stderr'e gider: echo \"hata\" >&2; çıkış kodu exit 2 ile verilir."
        ]
      },
      {
        "t": "h",
        "text": "Güvenli bir yedek betiği"
      },
      {
        "t": "cmd",
        "lang": "bash",
        "calistirma": "atla elle çalıştırılıp doğrulandı: Git Bash, 2026-11-06 (bash -n sözdizimi; klasör verilmezse çıkış 2, olmayan klasörde 1, normal çalışmada 0 ve dosya sayısı doğrulandı)",
        "text": "#!/usr/bin/env bash\nset -euo pipefail\n\nkaynak=\"${1:-}\"\nif [[ -z \"$kaynak\" ]]; then\n  echo \"Kullanim: $0 <klasor>\" >&2\n  exit 2\nfi\nif [[ ! -d \"$kaynak\" ]]; then\n  echo \"Klasor yok: $kaynak\" >&2\n  exit 1\nfi\n\nhedef=\"$(mktemp -d)\"\ntrap 'rm -rf \"$hedef\"' EXIT\n\nsayac=0\nfor dosya in \"$kaynak\"/*.txt; do\n  [[ -e \"$dosya\" ]] || continue\n  cp \"$dosya\" \"$hedef/\"\n  sayac=$((sayac + 1))\ndone\necho \"$sayac dosya kopyalandi\""
      },
      {
        "t": "p",
        "text": "Önce kullanıcı girdisi doğrulanır (sınır kontrolü), sonra geçici klasör açılır. trap, betik hatayla bitse bile geçici klasörün silinmesini sağlar. Silme komutu yalnız betiğin kendi oluşturduğu mktemp klasörüne uygulanır; kullanıcıdan gelen yola rm -rf yazmak güvenli değildir."
      },
      {
        "t": "box",
        "h": "Sıkı mod ne yapar?",
        "text": "set -e hata veren komutta betiği durdurur, -u tanımsız değişkende hata verir, pipefail boru hattında ortadaki hatayı yutmaz. Denemede false | true normalde 0 döndürürken, pipefail açıkken 1 döndürdü."
      },
      {
        "t": "h",
        "text": "Tırnaklama ve boşluklu adlar"
      },
      {
        "t": "cmd",
        "lang": "bash",
        "calistirma": "atla elle çalıştırılıp doğrulandı: Git Bash, 2026-11-06 (boşluklu dosya adıyla for *.txt tek parça, for $(ls) iki parça çıktı)",
        "text": "mkdir -p b && cd b\ntouch \"a b.txt\"\nfor f in *.txt; do echo \"[$f]\"; done\nfor f in $(ls); do echo \"[$f]\"; done"
      },
      {
        "t": "p",
        "text": "İlk döngü [a b.txt] yazar, ikincisi dosya adını boşlukta böler ve iki ayrı kayıt görür. Dosya listelemek için ls çıktısını döngüye vermek yerine joker karakter (*) kullan."
      },
      {
        "t": "warn",
        "h": "Tuzak",
        "text": "set -e altında ((n++)) ifadesi n sıfırken ifade değeri 0 olduğu için hata kodu 1 döndürür ve betik sessizce durur. Denemede ((n++)) betiği bitirirken n=$((n+1)) devam etti. Sayaç artırmayı atama biçiminde yaz."
      },
      {
        "t": "steps",
        "h": "Elle deneme",
        "items": [
          "yedekle.sh adlı dosyaya betiği yaz ve bash -n yedekle.sh ile sözdizimine bak.",
          "İçinde iki .txt ve bir .md olan veri klasörü hazırla.",
          "bash yedekle.sh veri çalıştır ve \"2 dosya kopyalandi\" çıktısını gör.",
          "Argümansız çalıştır ve $? ile çıkış kodunun 2 olduğunu doğrula.",
          "Olmayan bir klasör ver ve çıkış kodunun 1 olduğunu doğrula."
        ]
      }
    ],
    "objectives": [
      {
        "id": "h1",
        "text": "Değişken, argüman ve if koşulunu doğru tırnaklamayla kullanan bir betik yazabilirsin."
      },
      {
        "id": "h2",
        "text": "for döngüsüyle dosyaları boşluklu adlara dayanıklı biçimde işleyebilirsin."
      },
      {
        "id": "h3",
        "text": "set -euo pipefail seçeneklerinin neyi engellediğini ve çıkış kodlarını yorumlayabilirsin."
      },
      {
        "id": "h4",
        "text": "trap ile geçici dosyaları temizleyen ve girdisini doğrulayan bir betik tasarlayabilirsin."
      }
    ],
    "summary": [
      "Betik shebang satırıyla başlar; değişkenler her zaman çift tırnakla kullanılır.",
      "Çıkış kodu 0 başarı, diğerleri hatadır; $? son komutun kodunu verir.",
      "set -euo pipefail hataları ve tanımsız değişkenleri sessizce geçmez.",
      "trap EXIT ile geçici kaynaklar hata olsa da temizlenir.",
      "Kullanıcı girdisi doğrulanır; kullanıcı yoluna rm -rf yazılmaz."
    ],
    "prereq": [],
    "minutes": 30,
    "sonDogrulama": "2026-11-06",
    "surum": "1",
    "quiz": [
      {
        "id": "cc891316",
        "q": "Bir betiğin son komutundan sonra $? 0 ise bu ne demektir?",
        "options": [
          "Son komut hata verdi ama betik devam etti",
          "Son komut hiç çalıştırılmadı",
          "Betik 0 satır çıktı üretti",
          "Son komut başarıyla tamamlandı"
        ],
        "obj": "h3"
      },
      {
        "id": "b167538c",
        "q": "Neden \"$kaynak\" şeklinde çift tırnak kullanırız?",
        "options": [
          "Boşluklu değer tek parça olarak aktarılsın diye",
          "Değişkenin içeriğini büyük harfe çevirsin diye",
          "Değişkeni sayıya dönüştürsün diye",
          "Değişkeni yalnızca okunur (salt okunur) yapsın diye"
        ],
        "obj": "h1"
      },
      {
        "id": "dd42e9d6",
        "q": "Bir betikte klasör verilmediğinde hangi kullanım doğrudur?",
        "options": [
          "Sessizce 0 koduyla çıkmak, çünkü ortada işlenecek bir şey yok",
          "Mesajı stderr'e yazıp sıfırdan farklı kodla çıkmak",
          "Mesajı stdout'a yazıp 0 koduyla çıkmak",
          "Betiğin içinden mevcut klasörü silip yeniden kurmak"
        ],
        "obj": "h4"
      },
      {
        "id": "8e3cca99",
        "q": "Normalde false | true komutu 0 döndürür. set -o pipefail açıkken sonuç nedir?",
        "options": [
          "0 ; pipefail yalnız son komuta bakar",
          "2 ; pipefail her zaman kullanım hatası kodu verir",
          "1 ; boru hattındaki başarısız komutun kodu döner",
          "Betik hiç çalışmaz ; seçenek sözdizimi hatası üretir"
        ],
        "obj": "h3"
      },
      {
        "id": "2bd0749a",
        "q": "set -e altında n=0 iken ((n++)) neden betiği durdurabilir?",
        "options": [
          "((n++)) tanımsız değişken üretir ve -u bunu yakalar",
          "Aritmetik ifadeler bash'te yasaktır",
          "n sayısı çok büyük olduğu için taşma olur",
          "Eski değer 0 olduğundan ifade 1 kodu döndürür"
        ],
        "obj": "h3"
      },
      {
        "id": "f8bef53d",
        "q": "trap 'rm -rf \"$hedef\"' EXIT satırı ne zaman çalışır?",
        "options": [
          "Betik nasıl biterse bitsin, çıkış anında",
          "Yalnız betik 0 koduyla başarıyla bittiğinde",
          "Yalnız kullanıcı Ctrl+C'ye bastığında",
          "Her döngü adımında, dosya kopyalanmadan önce"
        ],
        "obj": "h4"
      },
      {
        "id": "214761ce",
        "q": "Boşluklu dosya adı olan bir klasörü işlerken hangi döngü güvenlidir?",
        "options": [
          "for f in $(ls); do ... done ; çünkü ls çıktısı doğru bölünür",
          "for f in *.txt; do ... \"$f\" ... done",
          "for f in `cat liste`; do ... done ; çünkü cat adları korur",
          "for f in ls; do ... done ; çünkü ls komut adı doğrudan döngüde çalışır"
        ],
        "obj": "h2"
      }
    ],
    "interview": [
      {
        "q": "Bir betiğe neden set -euo pipefail eklersin?",
        "a": "Tanımsız değişken, başarısız komut ve boru hattında gizli hata sessizce geçmesin diye. Betik yarım iş bırakıp devam etmek yerine hemen durur ve çıkış kodu CI/CD gibi çağıran araçlara hatayı bildirir. Dezavantajı: ((n++)) gibi kod 1 döndüren ifadelere dikkat gerekir."
      },
      {
        "q": "Betikte rm -rf kullanman gerekirse ne yaparsın?",
        "a": "Yalnız betiğin kendi oluşturduğu (mktemp) klasöre uygularım, değişkeni tırnaklarım ve boş olmadığını kontrol ederim. Kullanıcıdan gelen yola doğrudan silme komutu yazmam."
      },
      {
        "q": "Betiğin çıkış kodu neden önemlidir?",
        "a": "Pipeline, cron ya da CI aracı betiğin başarılı olup olmadığını yalnız çıkış kodundan anlar. Hata durumunda 0 dönersek bozuk iş başarılı görünür."
      }
    ],
    "vocab": [
      {
        "term": "script",
        "tr": "betik",
        "ex": "The script runs every night at two."
      },
      {
        "term": "exit code",
        "tr": "çıkış kodu",
        "ex": "A non-zero exit code means the command failed."
      },
      {
        "term": "variable",
        "tr": "değişken",
        "ex": "Always quote the variable to keep spaces."
      },
      {
        "term": "loop",
        "tr": "döngü",
        "ex": "The loop copies each file to the backup folder."
      },
      {
        "term": "argument",
        "tr": "argüman",
        "ex": "The first argument is the folder name."
      }
    ],
    "sources": [
      {
        "title": "GNU Bash Reference Manual",
        "url": "https://www.gnu.org/software/bash/manual/bash.html"
      },
      {
        "title": "Linux man-pages: signal(7)",
        "url": "https://man7.org/linux/man-pages/man7/signal.7.html"
      }
    ]
  };

  /* 4 ───────────────────────────── Git ve takım akışı */
  L[4] = {
    "hook": "Git, her kaydın bir fotoğraf olduğu ve her denemenin kendi paralel evreninde yapılabildiği bir zaman makinesidir; takım akışı da bu evrenlerin güvenle birleşmesi kuralıdır.",
    "homework": "Boş bir klasörde git init yap, iki commit at, bir dal aç, ana dalda aynı dosyayı değiştirip bilerek çatışma üret, çatışmayı çöz ve git log --graph ile sonucu çiz.",
    "warmup": {
      "recap": [
        {
          "point": "Betik çıkış kodları başarı ve hatayı bildirir.",
          "example": "Başarılı komut 0 döndürür"
        }
      ],
      "concepts": [
        {
          "term": "Üç alan",
          "tr": "Çalışma dizini, hazırlık, depo",
          "summary": "Değişiklik önce çalışma dizininde yapılır, git add ile hazırlık alanına (index) alınır, git commit ile depoya kaydedilir.",
          "example": "git add README.md; git commit -m \"...\""
        },
        {
          "term": "Dal (branch)",
          "tr": "Paralel çalışma hattı",
          "summary": "Dal, bir commit'i gösteren hafif bir işarettir; yeni bir dal açmak ana dalı etkilemeden deneme yapmayı sağlar.",
          "example": "git switch -c ozellik/giris"
        },
        {
          "term": "Çatışma",
          "tr": "Aynı satırda iki değişiklik",
          "summary": "İki dal aynı yeri farklı değiştirdiyse Git birleştirmeyi durdurur ve dosyaya <<<<<<<, =======, >>>>>>> işaretleri koyar.",
          "example": "AA c.txt durumu"
        },
        {
          "term": "Pull request",
          "tr": "Birleştirme isteği",
          "summary": "Bir dalın ana dala girmeden önce takımca incelendiği, testlerin çalıştığı istek sayfasıdır.",
          "example": "ozellik/giris dalından main'e PR"
        }
      ]
    },
    "blocks": [
      {
        "t": "h",
        "text": "Neden öğreniyoruz?"
      },
      {
        "t": "box",
        "h": "Gerçek talep",
        "text": "Takımdan biri cuma akşamı yayına çıkan bir değişikliğin siteyi bozduğunu söylüyor. Kimin, ne zaman, neyi değiştirdiğini görmen ve değişikliği ana dalı bozmadan geri alman gerekiyor. Git bunu satır satır kaydeder."
      },
      {
        "t": "h",
        "text": "Üç alan ve ilk commit"
      },
      {
        "t": "p",
        "text": "Git her commit'i değişmez bir kayıt olarak saklar. Kayıt içinde ne değiştiği, kimin değiştirdiği ve üst commit'in numarası vardır. Önce git add ile hangi değişikliğin kayda gireceğini seçersin, sonra git commit ile kaydedersin; böylece ilgisiz değişiklikleri aynı commit'e koymak zorunda kalmazsın."
      },
      {
        "t": "cmd",
        "lang": "bash",
        "calistirma": "atla elle çalıştırılıp doğrulandı: Git Bash, 2026-11-06 (geçici klasörde git init -b main ile gerçek depo kuruldu; çıktılar aynı sırayla alındı)",
        "text": "git init -q -b main depo && cd depo\necho \"merhaba\" > README.md\ngit add README.md\ngit commit -q -m \"Ilk commit: README\"\ngit switch -q -c ozellik/giris\necho \"giris sayfasi\" > giris.txt\ngit add giris.txt && git commit -q -m \"Giris sayfasi ekle\"\ngit switch -q main\necho \"duzeltme\" >> README.md && git commit -q -am \"README duzelt\"\ngit merge --no-edit ozellik/giris\ngit log --oneline --graph"
      },
      {
        "t": "p",
        "text": "Son komut iki dalın birleştiği bir merge commit'i ve iki dalın ortak atasını grafikte gösterir. Ana dalda başka commit olduğu için bu merge ileri sarma (fast-forward) değil, yeni bir birleştirme commit'idir."
      },
      {
        "t": "h",
        "text": "Dallar ve takım akışı"
      },
      {
        "t": "steps",
        "h": "Her iş için dal akışı",
        "items": [
          "main'den güncel başla; yeni iş için git switch -c ozellik/ad.",
          "Küçük, anlamlı commit'ler at; mesaj ne ve neden anlatsın.",
          "Dalı uzak depoya it ve pull request aç.",
          "Testler ve gözden geçirme geçince birleştir; dalı sil.",
          "main doğrudan değiştirilmez; dal koruma kuralı ile zorunlu kılınır."
        ]
      },
      {
        "t": "h",
        "text": "Çatışmayı çözmek"
      },
      {
        "t": "cmd",
        "lang": "bash",
        "calistirma": "atla elle çalıştırılıp doğrulandı: Git Bash, 2026-11-06 (iki dalda aynı dosyayı farklı yazıp git merge ile AA c.txt çatışması üretildi, git merge --abort ile temiz duruma dönüldü)",
        "text": "git switch -q -c a && echo \"A\" > c.txt && git add c.txt && git commit -q -m a\ngit switch -q main && git switch -q -c b && echo \"B\" > c.txt && git add c.txt && git commit -q -m b\ngit merge a\ngit status --short\ncat c.txt\ngit merge --abort"
      },
      {
        "t": "p",
        "text": "Çatışmada dosya iki bölüm gösterir: <<<<<<< HEAD ile ======= arası senin dalın, ======= ile >>>>>>> arası gelen dal. Hangisinin kalacağına karar verirsin, işaretleri silersin, git add yapıp commit ile bitirirsin. Emin değilsen git merge --abort birleştirmeyi başlamadan önceki duruma döndürür."
      },
      {
        "t": "h",
        "text": "Geri alma yolları"
      },
      {
        "t": "cmd",
        "lang": "bash",
        "calistirma": "atla elle çalıştırılıp doğrulandı: Git Bash, 2026-11-06 (git restore, git revert, git stash ve .gitignore geçici depoda denendi; revert yeni bir commit oluşturdu)",
        "text": "echo \"hatali\" >> README.md\ngit restore README.md\necho \"x\" > y.txt && git add y.txt && git commit -q -m \"yanlis\"\ngit revert --no-edit HEAD\necho \"wip\" >> README.md\ngit stash\ngit stash pop\nprintf \"*.log\\n.env\\n\" > .gitignore"
      },
      {
        "t": "box",
        "h": "Hangisi ne yapar?",
        "text": "git restore kaydedilmemiş değişikliği atar. git revert, bir commit'in tersini yeni commit olarak ekler ve geçmişi bozmaz. git stash yarım işi geçici saklar. .gitignore, *.log gibi desenlerle ve .env ile gizli dosyaların depoya girmesini engeller."
      },
      {
        "t": "warn",
        "h": "Tuzak",
        "text": "Parola ya da anahtar bir kere commit edilirse sonradan silsen de geçmişte kalır. Böyle bir sır sızdıysa onu değiştirmek (rotate) zorunludur. Paylaşılan dalda git push --force ile geçmişi yeniden yazmak takım arkadaşlarının işini bozar; yalnız kendi dalında ve haber vererek kullan."
      },
      {
        "t": "steps",
        "h": "Elle deneme",
        "items": [
          "Boş bir klasörde git init -b main yap ve iki commit at.",
          "git switch -c deneme ile dal aç ve bir dosya ekle.",
          "main'e dönüp aynı dosyayı farklı yaz, git merge deneme ile çatışma üret.",
          "git status ile çatışan dosyayı bul, işaretleri temizle, git add ve commit ile bitir.",
          "git log --oneline --graph ile sonucu kontrol et."
        ]
      }
    ],
    "objectives": [
      {
        "id": "h1",
        "text": "Değişikliğin çalışma dizini, hazırlık alanı ve depo arasında nasıl ilerlediğini anlatabilirsin."
      },
      {
        "id": "h2",
        "text": "Dal açıp birleştirebilir ve git log --graph çıktısını yorumlayabilirsin."
      },
      {
        "id": "h3",
        "text": "Bir birleştirme çatışmasını işaretlerden tanıyıp çözebilirsin."
      },
      {
        "id": "h4",
        "text": "restore, revert ve stash komutlarından duruma uygun olanı seçebilirsin."
      }
    ],
    "summary": [
      "Değişiklik önce çalışma dizininde, git add ile hazırlıkta, git commit ile depoda yer alır.",
      "Dal hafif bir işarettir; her iş ayrı dalda ve pull request ile ana dala girer.",
      "Çatışma aynı yerin iki farklı değişmesidir; işaretler elle çözülüp commit edilir.",
      "revert geçmişi bozmadan geri alır; restore yalnız kaydedilmemişi atar.",
      "Sır bir kere commit edilirse sızmış sayılır; .gitignore önlem, rotate çaredir."
    ],
    "prereq": [],
    "minutes": 30,
    "sonDogrulama": "2026-11-06",
    "surum": "1",
    "quiz": [
      {
        "id": "9b1cbefa",
        "q": "git add komutu tam olarak ne yapar?",
        "options": [
          "Değişikliği commit'e girecek hazırlığa alır",
          "Değişikliği doğrudan depoya kalıcı olarak kaydeder",
          "Değişikliği uzak depoya yükler",
          "Dosyayı çalışma dizininden siler"
        ],
        "obj": "h1"
      },
      {
        "id": "21f3d8a3",
        "q": "Yeni bir iş için ana dalı bozmadan denemek istersen hangi komutla başlarsın?",
        "options": [
          "git branch -d ozellik/ad ; yeni dal açar",
          "git switch -c ozellik/ad",
          "git reset --hard ; yeni dal açar",
          "git merge ozellik/ad ; yeni dal açar"
        ],
        "obj": "h2"
      },
      {
        "id": "93748408",
        "q": "Birleştirme sırasında dosyada <<<<<<< HEAD ile >>>>>>> işaretlerini görüyorsun. Bu ne demektir?",
        "options": [
          "Dosya bozulmuş ve Git onu otomatik olarak geri yüklemiştir",
          "Birleştirme eksiksiz ve başarıyla tamamlanmıştır, işlem bitmiştir",
          "Aynı yer iki dalda farklı değişmiş; birini sen seçmelisin",
          "Dosya .gitignore tarafından yoksayılmaktadır"
        ],
        "obj": "h3"
      },
      {
        "id": "061b5e87",
        "q": "Çatışma çözüm sürecini yarıda bırakıp birleştirme öncesi duruma dönmek için hangi komut kullanılır?",
        "options": [
          "git revert --abort ; birleştirmeyi geri alır",
          "git stash drop ; birleştirmeyi iptal eder",
          "git commit --amend ; birleştirmeyi iptal eder",
          "git merge --abort"
        ],
        "obj": "h3"
      },
      {
        "id": "bb7b613a",
        "q": "Yayına girmiş bir commit hatalıysa ve geçmişi bozmak istemiyorsan ne yaparsın?",
        "options": [
          "git revert ile tersini yeni commit eklersin",
          "git restore ile commit'i geçmişten silersin",
          "git stash ile commit'i sonsuza kadar saklarsın",
          "git push --force ile geçmişi yeniden yazıp commit'i silersin"
        ],
        "obj": "h4"
      },
      {
        "id": "4c539f37",
        "q": ".env dosyasının yanlışlıkla depoya girmemesi için ne yaparsın?",
        "options": [
          "git stash komutuyla dosyayı saklarsın",
          ".gitignore dosyasına .env satırı eklersin",
          "Dosyanın adını git branch ile değiştirirsin",
          "Her commit'te git revert çalıştırırsın"
        ],
        "obj": "h4"
      },
      {
        "id": "4e577814",
        "q": "Neden doğrudan main dalına değil, dal ve pull request ile çalışırız?",
        "options": [
          "Pull request commit sayısını otomatik azaltır ve geçmişi kısaltır, depo küçülür",
          "Doğrudan main'e yazmak Git tarafından teknik olarak yasaktır",
          "Değişiklik birleşmeden önce incelenir ve test edilir, main çalışır kalır",
          "Dal açmak bilgisayarın depolama alanını kat kat azaltır"
        ],
        "obj": "h2"
      }
    ],
    "interview": [
      {
        "q": "git merge ile git rebase arasındaki farkı anlat.",
        "a": "Merge iki geçmişi bir birleştirme commit'iyle bağlar ve geçmişi olduğu gibi korur. Rebase kendi commit'lerini hedef dalın ucuna yeniden uygular ve doğrusal bir geçmiş verir, fakat commit numaralarını değiştirir; bu yüzden paylaşılan dalda kullanılmaz."
      },
      {
        "q": "Yanlışlıkla commit edilmiş bir API anahtarı için ne yaparsın?",
        "a": "Önce anahtarı sağlayıcıda iptal edip yenisini üretirim (rotate), çünkü geçmişte kalmış kabul ederim. Sonra dosyayı .gitignore'a eklerim ve gerekirse geçmişi temizleme araçlarını takımla koordine ederim."
      },
      {
        "q": "Çatışmayı nasıl çözersin?",
        "a": "git status ile çatışan dosyaları bulurum, işaretlerin iki tarafını okuyup doğru sürümü seçerim ya da birleştiririm, işaretleri silerim, git add ve git commit yaparım. Kafam karışırsa git merge --abort ile başa dönerim."
      }
    ],
    "vocab": [
      {
        "term": "commit",
        "tr": "kayıt noktası",
        "ex": "Write a clear commit message for every change."
      },
      {
        "term": "branch",
        "tr": "dal",
        "ex": "Create a branch for each new feature."
      },
      {
        "term": "merge conflict",
        "tr": "birleştirme çatışması",
        "ex": "Resolve the merge conflict before the review."
      },
      {
        "term": "pull request",
        "tr": "birleştirme isteği",
        "ex": "Open a pull request so the team can review it."
      },
      {
        "term": "repository",
        "tr": "depo",
        "ex": "Clone the repository to your computer."
      }
    ],
    "sources": [
      {
        "title": "Pro Git: Basic Branching and Merging",
        "url": "https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging"
      },
      {
        "title": "Git belgeleri: gitignore",
        "url": "https://git-scm.com/docs/gitignore"
      },
      {
        "title": "Git belgeleri: git-rebase",
        "url": "https://git-scm.com/docs/git-rebase"
      }
    ]
  };

  /* 5 ───────────────────────────── Ağ, DNS ve HTTP */
  L[5] = {
    "hook": "Bir web adresi yazmak, rehberden numara bulup o numarayı aramak ve karşıdaki kişiye belli bir kalıpla soru sormak gibidir; DNS rehberdir, IP numaradır, HTTP konuşma kalıbıdır.",
    "homework": "curl ile kendi seçtiğin güvenli bir test sitesine (example.com) başlık isteği at, durum kodunu, Location ve Content-Type başlıklarını yaz; sonra olmayan bir yola istek atıp kodu karşılaştır.",
    "warmup": {
      "recap": [
        {
          "point": "Komut çıktısı boru ile süzülebilir.",
          "example": "curl -sI adres | head -3"
        }
      ],
      "concepts": [
        {
          "term": "IP adresi ve port",
          "tr": "Cihaz ve kapı numarası",
          "summary": "IP adresi ağdaki bir cihazı, port ise o cihazdaki bir hizmeti gösterir; HTTP 80, HTTPS 443, SSH 22, DNS 53 kullanır.",
          "example": "203.0.113.7:443"
        },
        {
          "term": "DNS",
          "tr": "Alan adı çözümleme",
          "summary": "Alan adını IP adresine çeviren dağıtık rehberdir; yanıtlar TTL süresi kadar önbellekte tutulur.",
          "example": "example.com -> 104.20.23.154 (denemede gözlenen adres)"
        },
        {
          "term": "HTTP istek/yanıt",
          "tr": "Web konuşma kalıbı",
          "summary": "İstemci yöntem (GET, POST), yol ve başlıkla ister; sunucu durum kodu, başlıklar ve gövde ile yanıtlar.",
          "example": "GET /yok -> 404"
        },
        {
          "term": "Durum kodu sınıfı",
          "tr": "Sonucun ailesi",
          "summary": "2xx başarı, 3xx yönlendirme, 4xx istemci hatası, 5xx sunucu hatasıdır.",
          "example": "301 yönlendirme, 503 hizmet yok"
        }
      ]
    },
    "blocks": [
      {
        "t": "h",
        "text": "Neden öğreniyoruz?"
      },
      {
        "t": "box",
        "h": "Gerçek talep",
        "text": "Yayına yeni çıkan sitede bazı kullanıcılar sayfayı açamıyor, bazıları açabiliyor. Sorunun DNS'te mi, sunucuda mı, TLS'te mi olduğunu bulmak için isteğin yolunu adım adım izleyebilmen gerekir."
      },
      {
        "t": "h",
        "text": "Bir adres yazınca ne olur"
      },
      {
        "t": "steps",
        "h": "İsteğin yolculuğu",
        "items": [
          "Tarayıcı alan adını (example.com) çözümleyiciye sorar; DNS bir IP adresi döner.",
          "İstemci o IP'nin 443 numaralı portuna TCP bağlantısı açar.",
          "HTTPS ise TLS el sıkışması yapılır; sertifika ve şifreleme anlaşılır.",
          "HTTP isteği gider: yöntem, yol ve başlıklar.",
          "Sunucu durum kodu, başlıklar ve gövdeyle yanıt verir."
        ]
      },
      {
        "t": "h",
        "text": "DNS kayıtları"
      },
      {
        "t": "p",
        "text": "A kaydı alan adını IPv4, AAAA kaydı IPv6 adresine bağlar. CNAME bir adı başka bir ada yönlendirir (takma ad). MX posta sunucusunu, TXT serbest metni (doğrulama kayıtları gibi) tutar. TTL, bir yanıtın önbellekte kaç saniye geçerli olacağını söyler; kaydı değiştirdiysen bu süre dolana kadar bazı kullanıcılar eski adresi görür."
      },
      {
        "t": "cmd",
        "lang": "bash",
        "calistirma": "atla elle çalıştırılıp doğrulandı: Git Bash, 2026-11-06 (nslookup ve python socket/urllib çalıştırıldı, example.com'a gerçek istek atıldı; dig, ss, ip bu makinede yok)",
        "text": "nslookup example.com\npython -I -c \"import socket; print(socket.getaddrinfo('example.com', 443, type=socket.SOCK_STREAM)[0][4][0])\"\npython -I -c \"from urllib.parse import urlsplit; u = urlsplit('https://api.example.com:8443/v1/users?id=7'); print(u.scheme, u.hostname, u.port, u.path, u.query)\""
      },
      {
        "t": "p",
        "text": "urlsplit denemesi https api.example.com 8443 /v1/users id=7 çıktısını verdi: adres şema, ana makine, port, yol ve sorgu parçalarından oluşur. Port yazılmazsa şemanın varsayılan portu (https için 443) kullanılır."
      },
      {
        "t": "h",
        "text": "HTTP: istek, yanıt, kodlar"
      },
      {
        "t": "cmd",
        "lang": "bash",
        "calistirma": "atla elle çalıştırılıp doğrulandı: Git Bash, 2026-11-06 (example.com'a curl ile başlık ve durum kodu istendi; 200, olmayan yolda 404, http://github.com adresinde 301 ve Location görüldü)",
        "text": "curl -sI -m 10 https://example.com | head -3\ncurl -s -o /dev/null -m 10 -w '%{http_code} %{time_total}\\n' https://example.com\ncurl -s -o /dev/null -m 10 -w '%{http_code}\\n' https://example.com/yok-sayfa-123\ncurl -sI -m 10 http://github.com | head -3"
      },
      {
        "t": "p",
        "text": "İlk komut 200 OK ile başlıkları, ikincisi durum kodu ve süreyi, üçüncüsü olmayan yol için 404'ü gösterdi. Dördüncüsü 301 Moved Permanently ve Location başlığı ile adresin https sürümüne yönlendirildiğini gösterdi. -m 10 komutun en fazla 10 saniye beklemesini sağlar."
      },
      {
        "t": "box",
        "h": "Kodları ezberleme, ailesini bil",
        "text": "200 başarılı, 301 kalıcı yönlendirme, 401 kimlik gerekli, 403 yetki yok, 404 bulunamadı, 500 sunucu hatası, 502 ağ geçidi sunucudan hatalı yanıt aldı, 503 hizmet geçici olarak kullanılamıyor. 4xx genelde isteği gönderen tarafta, 5xx sunucu tarafında aranır."
      },
      {
        "t": "cmd",
        "lang": "bash",
        "calistirma": "atla ss ve dig bu makinede yok (Windows Git Bash); örnek komutlar yalnız Linux/WSL için, man sayfalarından okundu",
        "text": "dig +short example.com\nss -tln\ncurl -v https://example.com"
      },
      {
        "t": "warn",
        "h": "Tuzak",
        "text": "\"Site çöktü\" demeden önce DNS, port ve HTTP'yi ayrı ayrı sına: DNS yanıtı yanlış ya da önbellekte eski olabilir, sunucu çalışırken port kapalı olabilir, HTTP 200 dönerken sayfa içeriği hatalı olabilir. Bir katmanda doğru görmek diğerinin sağlam olduğunu göstermez. Yalnız sahibi olduğun ya da izin aldığın sistemlere istek at."
      },
      {
        "t": "steps",
        "h": "Elle deneme",
        "items": [
          "nslookup komutuyla example.com alan adının IP adresini bul.",
          "curl -sI https://example.com ile durum kodunu ve başlıkları oku.",
          "Olmayan bir yola istek at ve 404 aldığını doğrula.",
          "http:// ile başlayan bir adrese -I ile istek at, 301 ve Location varsa not et.",
          "Sonuçları DNS, bağlantı ve HTTP katmanına göre bir tabloya yaz."
        ]
      }
    ],
    "objectives": [
      {
        "id": "h1",
        "text": "Bir web adresi yazıldığında DNS, TCP/TLS ve HTTP adımlarının sırasını söyleyebilirsin."
      },
      {
        "id": "h2",
        "text": "A, AAAA, CNAME, MX ve TXT kayıtlarının ve TTL'nin anlamını açıklayabilirsin."
      },
      {
        "id": "h3",
        "text": "HTTP durum kodlarını ailelerine göre yorumlayıp hatanın hangi tarafta aranacağını söyleyebilirsin."
      },
      {
        "id": "h4",
        "text": "curl ile durum kodu ve başlık alıp bir bağlantı sorununu katmanlara ayırabilirsin."
      }
    ],
    "summary": [
      "Adres yazınca sırasıyla DNS, TCP bağlantısı, TLS ve HTTP isteği çalışır.",
      "DNS adı IP'ye çevirir; TTL kadar önbellekte kalır, değişiklik gecikmeli yayılır.",
      "HTTP 80, HTTPS 443, SSH 22 ve DNS 53 portlarını kullanır.",
      "2xx başarı, 3xx yönlendirme, 4xx istemci, 5xx sunucu hatasıdır.",
      "Sorunu DNS, port ve HTTP katmanlarında ayrı ayrı sına."
    ],
    "prereq": [],
    "minutes": 30,
    "sonDogrulama": "2026-11-06",
    "surum": "1",
    "quiz": [
      {
        "id": "a7dc7962",
        "q": "Tarayıcı bir alan adını yazılınca ilk olarak ne yapar?",
        "options": [
          "Doğrudan HTTP yanıtını sunucudan ister ve çizer",
          "Alan adını DNS ile bir IP adresine çözümler",
          "TLS sertifikasını indirip doğrular",
          "Sayfayı önbelleğinden çizmeye başlar"
        ],
        "obj": "h1"
      },
      {
        "id": "d73f945d",
        "q": "Bir alan adının IPv4 adresini tutan DNS kaydı türü hangisidir?",
        "options": [
          "MX kaydı ; IPv4 adresini tutar",
          "CNAME kaydı ; IPv4 adresini doğrudan tutar",
          "A kaydı",
          "TXT kaydı ; IPv4 adresini tutar"
        ],
        "obj": "h2"
      },
      {
        "id": "34b8f9ca",
        "q": "DNS kaydını değiştirdin ama bazı kullanıcılar hâlâ eski adrese gidiyor. En olası neden nedir?",
        "options": [
          "DNS yeni IP adresini hiçbir zaman yayınlamaz",
          "HTTPS yalnız eski IP adreslerini kabul eder",
          "Tarayıcı portu 80'den 443'e otomatik değiştirir",
          "Eski yanıt TTL dolana kadar önbellekte kalır"
        ],
        "obj": "h2"
      },
      {
        "id": "892738e8",
        "q": "curl bir adrese istek atıp 404 aldıysa bunu nasıl yorumlarsın?",
        "options": [
          "Sunucuya ulaşıldı ama istenen yol bulunamadı",
          "DNS çözümlemesi başarısız oldu ve sunucuya ulaşılamadı",
          "Sunucu çöktü ve 5xx hatası verdi",
          "TLS el sıkışması yarıda kesildi"
        ],
        "obj": "h3"
      },
      {
        "id": "29440578",
        "q": "Hangi durum kodu \"sunucu tarafında geçici bir hizmet kesintisi var\" anlamına gelir?",
        "options": [
          "404 ; sunucu hizmet veremiyor",
          "503",
          "301 ; sunucu geçici olarak çalışmıyor",
          "403 ; sunucu kapalı"
        ],
        "obj": "h3"
      },
      {
        "id": "6a2f11d4",
        "q": "http://github.com'a curl -I ile istek atınca 301 ve Location: https://github.com/ aldın. Bu ne demektir?",
        "options": [
          "Sunucu istekten tamamen reddetti ve bağlantıyı kapattı",
          "DNS çözümlemesi başarısız oldu",
          "Adres https'e taşınmış; istemci Location'a gitmeli",
          "Sunucuda iç hata oluştu"
        ],
        "obj": "h4"
      },
      {
        "id": "866689fb",
        "q": "Sitenin açılmadığı bir şikayette sorunu katmanlara ayırmak için hangi yaklaşım doğrudur?",
        "options": [
          "Doğrudan sunucuyu yeniden başlatmak",
          "Yalnız tarayıcının önbelleğini silmek",
          "Yalnız ping atıp yanıt geliyorsa sorunu çözülmüş saymak",
          "DNS, bağlantı ve HTTP yanıtını sırayla ayrı denemek"
        ],
        "obj": "h4"
      }
    ],
    "interview": [
      {
        "q": "Tarayıcıya bir adres yazıp Enter'a basınca ağ tarafında neler olur?",
        "a": "Alan adı DNS ile IP adresine çözümlenir, istemci o IP'nin 443 portuna TCP bağlantısı açar, HTTPS ise TLS el sıkışması yapılır, ardından HTTP isteği gider ve sunucu durum kodu, başlık ve gövdeyle yanıt verir."
      },
      {
        "q": "502 ile 503 arasındaki fark nedir?",
        "a": "502 bir ara sunucunun (örneğin ters vekil) arkadaki sunucudan geçersiz yanıt aldığını söyler. 503 ise hizmetin geçici olarak kullanılamadığını, örneğin bakım ya da aşırı yük olduğunu belirtir. İkisi de 5xx'tir ve sunucu tarafında aranır."
      },
      {
        "q": "DNS kaydını değiştirdikten sonra neden hemen herkes yeni adresi görmez?",
        "a": "Çözümleyiciler yanıtı TTL süresi kadar önbellekte tutar. Taşıma öncesinde TTL'i düşürmek geçişi hızlandırır."
      }
    ],
    "vocab": [
      {
        "term": "DNS",
        "tr": "alan adı sistemi",
        "ex": "DNS maps a domain name to an IP address."
      },
      {
        "term": "status code",
        "tr": "durum kodu",
        "ex": "The server returned a status code of 404."
      },
      {
        "term": "request",
        "tr": "istek",
        "ex": "The client sends a request to the server."
      },
      {
        "term": "response",
        "tr": "yanıt",
        "ex": "The response contains headers and a body."
      },
      {
        "term": "redirect",
        "tr": "yönlendirme",
        "ex": "The server sends a redirect to the secure address."
      }
    ],
    "sources": [
      {
        "title": "MDN: HTTP genel bakış",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview"
      },
      {
        "title": "MDN: HTTP yanıt durum kodları",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status"
      },
      {
        "title": "RFC 9110: HTTP Semantics",
        "url": "https://www.rfc-editor.org/rfc/rfc9110"
      }
    ]
  };

  /* 6 ───────────────────────────── CI/CD ve GitHub Actions */
  L[6] = {
    "hook": "CI/CD, kodunu her değiştirdiğinde sıfırdan kurulan bir montaj bandında kontrol eden bir sorumlu gibidir: bantta hata varsa ürün bir sonraki istasyona geçmez.",
    "homework": "Küçük bir depoda push ve pull request olaylarında testleri çalıştıran bir .github/workflows/ci.yml yaz; dosyayı yüklemeden önce python yaml.safe_load ile ayrıştır.",
    "warmup": {
      "recap": [
        {
          "point": "Git push ile dal uzak depoya gider.",
          "example": "git push origin ozellik/giris"
        },
        {
          "point": "Betiğin sıfırdan farklı çıkış kodu hatadır.",
          "example": "exit 1"
        }
      ],
      "concepts": [
        {
          "term": "CI",
          "tr": "Sürekli bütünleştirme",
          "summary": "Her değişiklikte kodun otomatik derlenip test edilmesidir; hatalı değişiklik erken yakalanır.",
          "example": "Her push'ta npm test çalışır"
        },
        {
          "term": "CD",
          "tr": "Sürekli teslim/dağıtım",
          "summary": "Testten geçen sürümün otomatik olarak yayına hazırlanması ya da yayınlanmasıdır.",
          "example": "main dalına birleşince üretime dağıtım"
        },
        {
          "term": "Workflow / job / step",
          "tr": "İş akışı, iş, adım",
          "summary": "Workflow YAML dosyasıdır; job'lar ayrı runner'larda çalışır; step'ler bir job içinde sırayla çalışır.",
          "example": "test ve deploy iki job"
        },
        {
          "term": "Secret",
          "tr": "Gizli değer",
          "summary": "Parola ve anahtar gibi değerler depoda saklanmaz; Secrets alanında tutulur ve env üzerinden verilir.",
          "example": "DEPLOY_TOKEN"
        }
      ]
    },
    "blocks": [
      {
        "t": "h",
        "text": "Neden öğreniyoruz?"
      },
      {
        "t": "box",
        "h": "Gerçek talep",
        "text": "Takımda her cuma yayın yapılıyor ve her seferinde biri testleri unutuyor. Yöneticin \"kod main'e girmeden testler otomatik çalışsın, testi geçen kod da kendiliğinden yayınlansın\" diyor. Bunun yolu bir CI/CD boru hattıdır."
      },
      {
        "t": "h",
        "text": "CI ve CD ne işe yarar"
      },
      {
        "t": "p",
        "text": "CI, değişiklik her yapıldığında derleme ve testin otomatik çalışmasıdır. CD, testi geçen sürümün yayına gitmesini otomatikleştirir. Sürekli teslimde son adım insan onayı bekleyebilir, sürekli dağıtımda onay beklenmeden yayına çıkar. Amaç, küçük ve sık değişiklikleri güvenle akıtmaktır."
      },
      {
        "t": "h",
        "text": "GitHub Actions kavramları"
      },
      {
        "t": "steps",
        "h": "Parçalar",
        "items": [
          "Workflow: .github/workflows/ klasöründeki bir YAML dosyası.",
          "Olay (on): push, pull_request gibi tetikleyici.",
          "Job: ayrı bir runner'da çalışan iş; varsayılan olarak paralel çalışır, needs ile sıraya konur.",
          "Step: bir job içinde sırayla çalışan adım; uses hazır bir eylemi, run bir komutu çalıştırır.",
          "Runner: işi çalıştıran sanal makine; runs-on ile seçilir."
        ]
      },
      {
        "t": "h",
        "text": "Bir iş akışı örneği"
      },
      {
        "t": "cmd",
        "lang": "yaml",
        "calistirma": "atla elle çalıştırılıp doğrulandı: python yaml.safe_load, 2026-11-06 (YAML ayrıştırıldı; jobs anahtarları test ve deploy, deploy needs test, DEPLOY_TOKEN env altında okundu). GitHub Actions çalıştırıcısı üzerinde atla: bu makinede GitHub'a yüklenmedi.",
        "text": "name: ci\non:\n  push:\n    branches: [main]\n  pull_request:\n\npermissions:\n  contents: read\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 22\n          cache: npm\n      - run: npm ci\n      - run: npm test\n\n  deploy:\n    needs: test\n    if: github.ref == 'refs/heads/main'\n    runs-on: ubuntu-latest\n    environment: production\n    steps:\n      - uses: actions/checkout@v4\n      - name: Yayinla\n        env:\n          DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}\n        run: ./yayinla.sh"
      },
      {
        "t": "p",
        "text": "test job'ı her push ve pull request için çalışır. deploy job'ı needs: test sayesinde yalnız test başarılı olursa, if koşulu sayesinde yalnız main dalında çalışır. permissions: contents: read ile iş akışına yalnız okuma izni verilir (en az yetki ilkesi). environment: production, yayın öncesi onay kuralı bağlanabilen bir hedef ortamı tanımlar."
      },
      {
        "t": "box",
        "h": "YAML ayrıştırırken küçük bir sürpriz",
        "text": "PyYAML YAML 1.1 kurallarını izlediği için on anahtarını True olarak okur; denemede anahtar listesi [name, True, permissions, jobs] çıktı. Bu bir dosya hatası değil, ayrıştırıcının davranışıdır; GitHub on anahtarını normal okur. Girintiyi bozarsan yaml.safe_load \"mapping values are not allowed here\" hatası verir."
      },
      {
        "t": "h",
        "text": "Sırları güvenle kullanmak"
      },
      {
        "t": "p",
        "text": "Parola ve anahtarlar iş akışı dosyasına yazılmaz; depo ayarlarındaki Secrets alanında tutulur. Sır, ihtiyaç duyan step'in env: alanına verilir ve komut onu ortam değişkeni olarak okur. Böylece sır komut satırına gömülmez ve yanlışlıkla kopyalanıp günlüğe yazdırılma ihtimali azalır. Fork'tan gelen pull request olaylarında sırlar varsayılan olarak verilmez; bu istenen bir güvenlik davranışıdır."
      },
      {
        "t": "warn",
        "h": "Tuzak",
        "text": "Sırrı echo ile ekrana yazdırmak, base64 ile gizleyip günlüğe basmak ya da iş akışına düz metin olarak koymak sızıntıdır. Üçüncü taraf eylemlerini @main gibi hareketli bir dal yerine sürüm etiketiyle (daha güvenlisi commit SHA'sıyla) sabitle. Sızan bir sırrı silmek yetmez, yenisini üretip eskisini iptal et."
      },
      {
        "t": "steps",
        "h": "Elle deneme",
        "items": [
          ".github/workflows/ci.yml dosyasını yukarıdaki iskeletten oluştur.",
          "python -c \"import yaml; yaml.safe_load(open('.github/workflows/ci.yml'))\" ile ayrıştırmayı dene.",
          "Girintiyi bilerek bozup hata mesajını gör; sonra düzelt.",
          "Gerçek depoya yüklemeden önce deploy adımındaki betiği kendi makinende çalıştır.",
          "Depo ayarlarında DEPLOY_TOKEN sırrını oluştur; değerini hiçbir dosyaya yazma."
        ]
      }
    ],
    "objectives": [
      {
        "id": "h1",
        "text": "CI ile CD'nin farkını ve hangi sorunları çözdüğünü açıklayabilirsin."
      },
      {
        "id": "h2",
        "text": "Workflow, job, step ve runner kavramlarını bir YAML dosyasında gösterebilirsin."
      },
      {
        "id": "h3",
        "text": "needs ve if ile bir dağıtım işini teste bağlayıp yalnız main dalıyla sınırlayabilirsin."
      },
      {
        "id": "h4",
        "text": "Sırları env üzerinden güvenle kullanıp sızıntı biçimlerini sayabilirsin."
      }
    ],
    "summary": [
      "CI her değişikliği otomatik derler ve test eder; CD yayını otomatikleştirir.",
      "Workflow .github/workflows/ altında YAML; job'lar paralel, step'ler sıralı çalışır.",
      "needs sıralar, if koşula bağlar, permissions yetkiyi daraltır.",
      "Sır depoya yazılmaz; Secrets'a konur ve env ile verilir.",
      "YAML'ı yüklemeden önce ayrıştırarak dene; eylemleri sürümle sabitle."
    ],
    "prereq": [],
    "minutes": 30,
    "sonDogrulama": "2026-11-06",
    "surum": "1",
    "quiz": [
      {
        "id": "b80b68ca",
        "q": "Sürekli bütünleştirmenin (CI) temel amacı nedir?",
        "options": [
          "Trafik arttığında üretim sunucusunu otomatik olarak büyütmek",
          "Kod yazan geliştiricilerin sayısını azaltıp işleri robotlara yıkmak",
          "Her pushta otomatik derleme ve test ile hatayı erken yakalamak",
          "Tüm sürümleri biriktirip yılda bir kez toplu yayına almak"
        ],
        "obj": "h1"
      },
      {
        "id": "9b357bbb",
        "q": "Sürekli teslim ile sürekli dağıtım arasındaki ana fark hangisidir?",
        "options": [
          "Teslimde test yoktur, dağıtımda test vardır",
          "Teslim yalnız ana dal içindir, dağıtım yalnız dal içindir ve ikisi birbirinin yerine kullanılamaz",
          "Teslim yalnız Windows'ta, dağıtım yalnız Linux'ta çalışır",
          "Teslimde yayın insan onayı bekleyebilir, dağıtımda onaysız çıkar"
        ],
        "obj": "h1"
      },
      {
        "id": "3b6d4211",
        "q": "GitHub Actions'ta bir job içindeki step'ler nasıl çalışır?",
        "options": [
          "Aynı runner'da sırayla, bir öncekiyle birlikte",
          "Her step ayrı runner'da aynı anda paralel çalışır",
          "Yalnız son step çalışır, öncekiler atlanır",
          "Her step yeni bir workflow dosyası oluşturur"
        ],
        "obj": "h2"
      },
      {
        "id": "9427e602",
        "q": "deploy job'ının yalnız test job'ı başarılı olduktan sonra çalışması için hangi anahtar kullanılır?",
        "options": [
          "runs-on: test",
          "needs: test",
          "uses: test",
          "env: test"
        ],
        "obj": "h3"
      },
      {
        "id": "c6d62f4d",
        "q": "Dağıtımın yalnız main dalına yapılan push'ta çalışması için job'a ne eklenir?",
        "options": [
          "permissions: { branch: main, contents: read }",
          "runs-on: [ubuntu-latest, branch-main]",
          "if: github.ref == 'refs/heads/main'",
          "environment: { branch: main, name: production }"
        ],
        "obj": "h3"
      },
      {
        "id": "49494366",
        "q": "DEPLOY_TOKEN sırrını bir adıma güvenle vermenin doğru biçimi hangisidir?",
        "options": [
          "Sırrı kolay bulunsun diye workflow dosyasına düz metin olarak yazmak",
          "Sırrı echo ile günlüğe yazdırıp kontrol etmek",
          "Sırrı her komut satırına doğrudan gömmek",
          "env alanına ${{ secrets.DEPLOY_TOKEN }} yazıp değişkeni okumak"
        ],
        "obj": "h4"
      },
      {
        "id": "cc231296",
        "q": "Üçüncü taraf bir eylemi kullanırken güvenli yaklaşım hangisidir?",
        "options": [
          "Sürüm etiketine ya da SHA'ya sabitlemek",
          "Her zaman eylemin en yeni main dalını kullanmak",
          "Eylem kaynağını okumadan kullanmak",
          "Eylem sürümünü hiç belirtmemek"
        ],
        "obj": "h4"
      }
    ],
    "interview": [
      {
        "q": "CI/CD boru hattı bir ekibe ne kazandırır?",
        "a": "Her değişiklik aynı otomatik adımlardan geçtiği için hata erken yakalanır, yayın tekrarlanabilir ve küçük olduğu için riski düşük olur. Elle yapılan unutulabilir adımlar ortadan kalkar."
      },
      {
        "q": "Bir GitHub Actions iş akışında sırları nasıl yönetirsin?",
        "a": "Değerleri depo ya da ortam Secrets alanında tutarım, step'in env alanıyla verip komutta ortam değişkeni olarak okurum. Dosyaya ve günlüğe yazmam, izinleri permissions ile daraltırım ve sızıntı şüphesinde anahtarı hemen yenilerim."
      },
      {
        "q": "Dağıtım job'ının testten önce çalışmasını nasıl engellersin?",
        "a": "needs: test ile bağımlılık tanımlarım. İstersem if koşuluyla yalnız main dalına sınırlarım ve production ortamına onay kuralı bağlarım."
      }
    ],
    "vocab": [
      {
        "term": "pipeline",
        "tr": "boru hattı",
        "ex": "The pipeline runs tests on every push."
      },
      {
        "term": "workflow",
        "tr": "iş akışı",
        "ex": "The workflow file lives in the .github folder."
      },
      {
        "term": "runner",
        "tr": "çalıştırıcı",
        "ex": "The runner executes each job in a clean machine."
      },
      {
        "term": "secret",
        "tr": "gizli değer",
        "ex": "Store the token as a secret, never in the code."
      },
      {
        "term": "deployment",
        "tr": "dağıtım",
        "ex": "The deployment starts after all tests pass."
      }
    ],
    "sources": [
      {
        "title": "GitHub Actions belgeleri: Workflow syntax",
        "url": "https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions"
      },
      {
        "title": "GitHub Actions belgeleri: Using secrets",
        "url": "https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions"
      },
      {
        "title": "GitHub Actions belgeleri: Understanding GitHub Actions",
        "url": "https://docs.github.com/en/actions/about-github-actions/understanding-github-actions"
      }
    ]
  };

})();

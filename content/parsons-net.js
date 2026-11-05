"use strict";
/* Parsons: Cisco IOS'ta VLAN 10 oluşturma ve erişim portu atama (ccna-vlan). Şema: js/ders/parsons.js */
window.PP_PARSONS = window.PP_PARSONS || [];
window.PP_PARSONS.push({
  id: "ccna-vlan-komut",
  ders: "ccna-vlan",
  baslik: "Switch'te VLAN 10 oluştur ve porta ata",
  gorev: "Cisco IOS'ta bir switch'te SATIS adlı VLAN 10'u oluştur ve FastEthernet0/1 portunu bu VLAN'a erişim (access) portu olarak ata. Satırları doğru komut sırasına diz.",
  dogru: [
    "configure terminal",
    "vlan 10",
    "name SATIS",
    "exit",
    "interface FastEthernet0/1",
    "switchport mode access",
    "switchport access vlan 10",
    "end"
  ],
  yanlis: [
    "switchport mode trunk",
    "ip address 192.168.10.1 255.255.255.0"
  ],
  ipucu: [
    "Her komut belirli bir modda çalışır: ağ geneli komutlar global modda, VLAN'ın adı VLAN alt modunda, port ayarları arayüz alt modunda yazılır. Önce hangi komutun hangi mod türüne ait olduğunu belirle.",
    "Modlar iç içedir: önce global yapılandırma moduna girilir; VLAN tanımlayan komut seni VLAN alt moduna, arayüz seçen komut arayüz alt moduna sokar. Bir alt moddan diğerine geçmeden önce global moda dönmek gerekir. Komutların sırasını bu geçişlere göre kendin kur.",
    "İlk satır 'configure terminal', son satır 'end' olmalı; aradaki altı komutu mod geçişlerine göre kendin diz. Trunk ve IP adresi satırı bu işte yer almaz."
  ],
  aciklama: "IOS modları iç içedir: önce global yapılandırma (configure terminal), VLAN 10'un adı VLAN alt modunda verilir, 'exit' ile global moda dönülür, port ayarları arayüz alt modunda yapılır. 'switchport mode access' ile 'switchport access vlan 10' satırlarının sırası IOS'ta genelde alışkanlıktır; burada önce mod, sonra VLAN diye sırala. 'switchport mode access' bir uç cihaz portunu tek VLAN'a bağlar; 'trunk' ise switchler arası bağlantı içindir, IP adresi ise 2. katman portuna değil VLAN arayüzüne verilirdi."
});

window.PP_PARSONS.push({
  id: "ccna-ssh-kurulum",
  ders: "ccna-ssh",
  baslik: "Switch'te SSH erişimini kur",
  gorev: "Bir Cisco switch'e yalnız SSH ile yönetim erişimi kur: ana makine adı, alan adı, RSA anahtarı, yerel kullanıcı ve vty hattı. Satırları doğru komut sırasına diz.",
  dogru: [
    "configure terminal",
    "hostname S1",
    "ip domain-name sirket.local",
    "crypto key generate rsa modulus 2048",
    "username yonetici secret <guclu-sifre>",
    "line vty 0 15",
    "transport input ssh",
    "login local",
    "end"
  ],
  yanlis: [
    "transport input telnet",
    "enable password cisco"
  ],
  ipucu: [
    "RSA anahtarı bir isme bağlı üretilir: anahtarı üretmeden önce cihazın adının ve alan adının bilinmesi gerekir.",
    "Önce global moddaki ayarlar (ad, alan adı, anahtar, kullanıcı), sonra hat alt moduna girip hat ayarları gelir.",
    "Sıra: ad, alan adı, anahtar, kullanıcı, hat, yalnız SSH, yerel giriş. Telnet ve açık metin parola satırları bu işte yer almaz."
  ],
  aciklama: "RSA anahtarı üretmek için önce hostname ve ip domain-name gerekir. Kullanıcı global modda tanımlanır, sonra 'line vty' ile hat alt moduna girilir; 'transport input ssh' Telnet'i kapatır, 'login local' yerel kullanıcıyı ister. Hat içindeki iki komutun kendi aralarındaki sırası pratikte fark etmez; burada ders sırası olarak transport sonra login verilir."
});

window.PP_PARSONS.push({
  id: "ccna-arayuz-ip",
  ders: "ccna-arayuz",
  baslik: "Router arayüzüne IP ver ve aç",
  gorev: "Bir Cisco router'ın GigabitEthernet0/0 arayüzüne 192.168.10.1/24 adresini ver, arayüzü aç ve durumunu doğrula. Satırları doğru komut sırasına diz.",
  dogru: [
    "configure terminal",
    "interface GigabitEthernet0/0",
    "ip address 192.168.10.1 255.255.255.0",
    "no shutdown",
    "end",
    "show ip interface brief"
  ],
  yanlis: [
    "shutdown",
    "switchport mode access"
  ],
  ipucu: [
    "Arayüz ayarları arayüz alt modunda yapılır; önce o moda gir.",
    "Router arayüzü varsayılan olarak kapalıdır, adresi verdikten sonra açman gerekir. Doğrulamayı # modunda yaparsın.",
    "Sıra: global mod, arayüz seç, IP ver, aç, # moduna dön, doğrula. 'shutdown' ve switchport satırı bu işte yer almaz."
  ],
  aciklama: "Router arayüzleri varsayılan olarak 'administratively down' gelir; 'no shutdown' ile açılır. Show komutu # modunda çalışır, bu yüzden 'end' ile dönülür. 'switchport' komutları 2. katman switch portlarına aittir, router arayüzüne değil."
});

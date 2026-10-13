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

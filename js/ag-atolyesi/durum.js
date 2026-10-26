"use strict";
/* ALAN: Ders Odası/Atölye, Ağ Atölyesi (animasyon sahneleri) durum ve eşleme. NE YAPAR: nwLoad/nwSave/nwMark sahne başına ilerlemeyi (0-2) tutar; NW_RX ders konusunu sahneye bağlayan düzenli ifadeleri verir. motor.js ile birlikte NWENGINE_BEGIN/END işaretleri arasındadır, işaretleri silmeyin.
   SORUN OLURSA: localStorage ya_nw ({sahneId: seviye}); nwMark syncPush çağırır ve altin-vurus.js syncOut ile eşitlenir. nw-sahne-v1.js ve v2.js bu dosyadan SONRA/ARASINDA yüklenir (index.html sırası). Yükleme sırası tests/sira.js ile denetlenir.
   YENİ ÖZELLİK: Yeni konu eşlemesi NW_RX. Testler: tests/nwmap.js (nwFuzzy/NW_RX), tests/t59a_nw.js, tests/t60c_nw.js. */
/* ---- v59: Ağ Atölyesi, sahne animasyonları ---- */
var NW_KEY="ya_nw";
function nwLoad(){try{var o=JSON.parse(localStorage.getItem(NW_KEY)||"null");return o&&typeof o==="object"?o:{}}catch(e){return {}}}
function nwSave(o){try{localStorage.setItem(NW_KEY,JSON.stringify(o))}catch(e){}}
function nwMark(id,n){var o=nwLoad();if(n>num(o[id])){o[id]=n;nwSave(o);try{syncPush()}catch(e){}}}
var NW_RX=[["vlan",/vlan|trunk|802\.1q/i],["ssh",/\bssh\b|telnet|uzak yönetim/i],["ping",/\bping\b|icmp|traceroute|tracert|\bttl\b/i],["congestion",/tıkanıklık|congestion|\babs\b|akış kontrol/i],["osi",/osi/i],["packets",/paket|packet/i],["ip",/ip adres|ipv4|ip\b/i],["router",/router|yönlendir/i],["dns",/\bdns\b/i],["ports",/\bports?\b|\bport(lar|u|un|a|da)\b/i],["nat",/\bnat\b/i],["subnet",/subnet|alt ağ/i],["dhcp",/dhcp/i],["mac",/mac adres/i],["arp",/\barp\b/i],["switch",/switch/i],["tcp",/\btcp\b/i],["udp",/\budp\b/i],["http",/http/i],["tls",/\btls\b|\bssl\b|şifreli bağlantı/i],["firewall",/güvenlik duvar|firewall/i],["vpn",/\bvpn\b/i],["proxy",/proxy|vekil/i],["lb",/yük denge|load balanc/i],["ipclass",/sınıf|class[ -]?[a-e]/i],["hash",/hash|özet/i]];
/*NWENGINE_BEGIN*/

"use strict";
/* ---- v59: Ağ Atölyesi, sahne animasyonları ---- */
var NW_KEY="ya_nw";
function nwLoad(){try{var o=JSON.parse(localStorage.getItem(NW_KEY)||"null");return o&&typeof o==="object"?o:{}}catch(e){return {}}}
function nwSave(o){try{localStorage.setItem(NW_KEY,JSON.stringify(o))}catch(e){}}
function nwMark(id,n){var o=nwLoad();if(n>num(o[id])){o[id]=n;nwSave(o);try{syncPush()}catch(e){}}}
var NW_RX=[["vlan",/vlan|trunk|802\.1q/i],["ssh",/\bssh\b|telnet|uzak yönetim/i],["ping",/\bping\b|icmp|traceroute|tracert|\bttl\b/i],["congestion",/tıkanıklık|congestion|\babs\b|akış kontrol/i],["osi",/osi/i],["packets",/paket|packet/i],["ip",/ip adres|ipv4|ip\b/i],["router",/router|yönlendir/i],["dns",/\bdns\b/i],["ports",/\bports?\b|\bport(lar|u|un|a|da)\b/i],["nat",/\bnat\b/i],["subnet",/subnet|alt ağ/i],["dhcp",/dhcp/i],["mac",/mac adres/i],["arp",/\barp\b/i],["switch",/switch/i],["tcp",/\btcp\b/i],["udp",/\budp\b/i],["http",/http/i],["tls",/\btls\b|\bssl\b|şifreli bağlantı/i],["firewall",/güvenlik duvar|firewall/i],["vpn",/\bvpn\b/i],["proxy",/proxy|vekil/i],["lb",/yük denge|load balanc/i],["ipclass",/sınıf|class[ -]?[a-e]/i],["hash",/hash|özet/i]];
/*NWENGINE_BEGIN*/

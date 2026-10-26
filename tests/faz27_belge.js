"use strict";
const fs = require("fs"), assert = require("assert");
require("../js/belge.js");
const B = globalThis.PPBelge;
(async () => {
  const k = await B.kod("Ayşe  Yılmaz", "Siber Güvenlik", "2026-10-26");
  assert(/^[0-9A-F]{12}$/.test(k), "12 hane büyük hex");
  assert.strictEqual(k, await B.kod(" Ayşe Yılmaz ", "Siber Güvenlik", "2026-10-26"), "boşluklar normalleşir");
  assert.notStrictEqual(k, await B.kod("Ayşe Yılmaz", "Siber Güvenlik", "2026-10-27"), "tarih değişince kod değişir");
  assert.notStrictEqual(k, await B.kod("Ali Yılmaz", "Siber Güvenlik", "2026-10-26"), "ad değişince kod değişir");
  assert(await B.dogrula("Ayşe Yılmaz", "Siber Güvenlik", "2026-10-26", k.slice(0, 6) + "-" + k.slice(6).toLowerCase()), "tireli/küçük harf kabul");
  assert(!(await B.dogrula("Ayşe Yılmaz", "Siber Güvenlik", "2026-10-26", "000000000000")), "yanlış kod reddedilir");
  assert(B.tarihGecerli("2026-10-26") && !B.tarihGecerli("2026-13-45") && !B.tarihGecerli("<script>"), "tarih denetimi");
  const ui = fs.readFileSync(__dirname + "/../js/belge-ui.js", "utf8"), html = fs.readFileSync(__dirname + "/../belge.html", "utf8");
  assert(!/innerHTML/.test(ui), "ad/yol/kod innerHTML ile yazılmaz (XSS)");
  assert(/resmî sertifika(sı)? ya da sınav sonucu DEĞİLDİR/.test(html) && /bağımsız eğitim belgesi/.test(html), "sahte resmî iddia yok, etiket var");
  console.log("OK faz27_belge: 8 kontrol");
})().catch(e => { console.error("HATA", e.message); process.exit(1); });

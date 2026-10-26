#!/usr/bin/env node
"use strict";
/* Cevap anahtarı ayırıcı (Faz 9 sunucu).
   Sınav sorularındaki doğru cevap ve açıklamaları içerik dosyalarından çıkarır; sunucu tablosu için SQL tohumu üretir.
   Kapsam: (1) content/lessons/*.js ders mini sınavı (quiz[]), (2) content/veri-analitigi VA sınavları (sorular[]),
           (3) js/veri/soru-bankasi.js seviye sınavı sorularının ayrılması → content/sinav/seviye.js.
   Dokunmaz: ders içi alıştırma, parsons, lab, çözümü göster, oyun/tekrar için soru bankasının kalanı.

   Kullanım:
     node tools/cevap-anahtari.js                 kuru çalışma: yalnız özet yazar, hiçbir dosyaya dokunmaz
     node tools/cevap-anahtari.js --yaz           tohumları yazar + içerikten anahtarı siler + soru kimliği (id) ekler
     --kok <dizin>   proje kökü (varsayılan: bu dosyanın üst dizini)
     --seed <dizin>  tohum dizini (varsayılan: <kök>/supabase/seed)
   Yeni sınav sorusu yazma akışı: soruyu `answer`/`why` ile yaz → araç --yaz → anahtar yalnız tohumda kalır.
   UYARI: anahtar tohumu (…_anahtar.sql) HALKA AÇIK repoya girmez (supabase/seed/.gitignore); özel depoya kopyalanır.
   Araç hiçbir veritabanına bağlanmaz. GÜVENLİK: içerik dosyalarını vm ile ÇALIŞTIRIR (sandbox değil): yalnız güvendiğin, gözden geçirilmiş içerikte çalıştır. */

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const crypto = require("crypto");
const acorn = require("acorn");

const SURUM = "2026-10-v1";                 /* js/ogrenme/program.js uygulamadan().surum ile aynı olmalı (test denetler) */
const ESKI_SURUM = "eski-1";                /* O.eski.SURUM (uyumlu sürüm) — test denetler */
const ESIK = 0.8;
const SEVIYE_SAYILARI = { 1: 3, 2: 4, 3: 3 };   /* seviye sınavı: zorluk başına soru (js/seviye/seviye-sinavi.js peStart ile aynı) */
const VA_SINAVLAR = [
  { dosya: "content/veri-analitigi/seviye0.js", anahtar: "sinav0" },
  { dosya: "content/veri-analitigi/seviye1.js", anahtar: "sinav1" },
  { dosya: "content/veri-analitigi/sinav2.js", anahtar: "sinav2" }
];

/* ---------------------------------------------------------------- yardımcılar */
function norm(s) { return String(s == null ? "" : s).normalize("NFC").trim().replace(/\s+/g, " "); }
function soruKimligi(q, secenekler) {
  const h = crypto.createHash("sha1").update(norm(q) + "\u0001" + secenekler.map(norm).join("\u0001")).digest("hex");
  return h.slice(0, 8);
}
/* js/ders/ders-odasi.js qzCorrect ile AYNI çözümleme (test eşliğini denetler) */
function qzNorm(s) { return String(s == null ? "" : s).toLowerCase().replace(/[^a-z0-9çğıöşü ]+/g, " ").replace(/\s+/g, " ").trim(); }
function dogruIndeks(q) {
  const o = Array.isArray(q.options) ? q.options : null;
  if (!o || o.length < 2) return -1;
  /* Tam eşleşme ÖNCE: eski istemci (ders-odasi.js qzCorrect) "A" gibi kısa cevabı şık harfi sanıp ve noktalama düşürerek iki soruda (ccna-7 #3, ccna-13 #6)
     yanlış şıkkı doğru gösteriyordu. Anahtar, yazarın yazdığı cevap metnine göre kurulur; sezgisel çözümleme yalnız tam eşleşme yoksa. */
  const tam = o.indexOf(q.answer);
  if (tam >= 0) return tam;
  const a = String(q.answer == null ? "" : q.answer).trim(), m = /^([A-Da-d])(?:[\)\.\:\-]|\s|$)/.exec(a);
  if (m) { const li = m[1].toUpperCase().charCodeAt(0) - 65; if (li < o.length && (a.length <= 3 || (qzNorm(o[li]).length && qzNorm(a).indexOf(qzNorm(o[li])) >= 0))) return li; }
  const na = qzNorm(a); let i;
  for (i = 0; i < o.length; i++) if (qzNorm(o[i]) === na) return i;
  for (i = 0; i < o.length; i++) { const no = qzNorm(o[i]); if (no && na && (na.indexOf(no) >= 0 || no.indexOf(na) >= 0)) return i; }
  if (m) { const lj = m[1].toUpperCase().charCodeAt(0) - 65; if (lj < o.length) return lj; }
  return -1;
}
function sqlMetin(s) {
  if (s == null) return "null";
  const t = String(s);
  if (t.indexOf("\u0000") >= 0) throw new Error("NUL karakteri SQL metninde olamaz");
  return "'" + t.replace(/'/g, "''") + "'";
}
function sqlJson(o) { return o == null ? "null" : sqlMetin(JSON.stringify(o)) + "::jsonb"; }
function anahtarAdi(p) { return p.key.type === "Identifier" ? p.key.name : p.key.type === "Literal" ? String(p.key.value) : null; }
function degerlendir(kod, yer) {
  try { return vm.runInNewContext("(" + kod + ")", Object.create(null), { timeout: 2000 }); }
  catch (e) { throw new Error((yer || "soru") + ": soru sabit değil (yalnız değişmez değerler desteklenir): " + e.message); }
}

/* AST gezgini: düğüm + ata zinciri */
function gez(dugum, f, atalar) {
  atalar = atalar || [];
  if (!dugum || typeof dugum.type !== "string") return;
  f(dugum, atalar);
  const yeni = atalar.concat(dugum);
  for (const k of Object.keys(dugum)) {
    const v = dugum[k];
    if (Array.isArray(v)) v.forEach((x) => gez(x, f, yeni));
    else if (v && typeof v === "object" && typeof v.type === "string") gez(v, f, yeni);
  }
}
function parse(src, dosya) {
  try { return acorn.parse(src, { ecmaVersion: "latest", ranges: true, sourceType: "script" }); }
  catch (e) { throw new Error(dosya + ": ayrıştırılamadı: " + e.message); }
}

/* Nesne kaynağını yeniden kur: kaldırılan özellikler çıkar, ekler öne eklenir; özgün ayırıcı korunur. */
function nesneYenile(src, nesne, kaldir, ekle) {
  const ozellikler = nesne.properties.filter((p) => p.type === "Property");
  if (ozellikler.length !== nesne.properties.length) throw new Error("yayılım (spread) içeren nesne desteklenmiyor");
  const tut = ozellikler.filter((p) => kaldir.indexOf(anahtarAdi(p)) < 0);
  let ayirici = ", ";
  if (ozellikler.length >= 2) ayirici = src.slice(ozellikler[0].end, ozellikler[1].start);
  const metin = (p) => src.slice(p.start, p.end);
  const parcalar = ekle.concat(tut.map(metin));
  const ilk = src.slice(nesne.start + 1, ozellikler[0] ? ozellikler[0].start : nesne.end - 1);
  const son = src.slice(ozellikler.length ? ozellikler[ozellikler.length - 1].end : nesne.start + 1, nesne.end - 1);
  return "{" + ilk + parcalar.join(ayirici) + son + "}";
}
function duzenle(src, duzenlemeler) {
  const sirali = duzenlemeler.slice().sort((a, b) => b.bas - a.bas);
  for (let i = 1; i < sirali.length; i++) if (sirali[i].son > sirali[i - 1].bas) throw new Error("çakışan düzenleme");
  let out = src;
  sirali.forEach((d) => { out = out.slice(0, d.bas) + d.metin + out.slice(d.son); });
  return out;
}

/* ---------------------------------------------------------------- kaynak 1: ders mini sınavları */
function dersTara(kok) {
  const dir = path.join(kok, "content", "lessons"), sonuc = [];
  fs.readdirSync(dir).filter((f) => /\.js$/.test(f)).sort().forEach((f) => {
    const yol = path.join(dir, f), src = fs.readFileSync(yol, "utf8");
    if (!/\bquiz\s*:/.test(src)) return;
    const ast = parse(src, f);
    const w = { PP_LESSONS: {} }; w.window = w; vm.createContext(w);
    try { vm.runInContext(src, w, { timeout: 5000 }); } catch (e) { throw new Error(f + ": ders dosyası çalıştırılamadı (soru verisi sabit değişmez değerlerden oluşmalı): " + e.message); }
    const izler = Object.keys(w.PP_LESSONS);
    if (izler.length !== 1) throw new Error(f + ": tek yol bekleniyordu: " + izler.join(","));
    const iz = izler[0], duzen = [], kayitlar = [], hedefler = {};
    gez(ast, (d, atalar) => {
      if (d.type !== "Property" || anahtarAdi(d) !== "quiz" || !d.value || d.value.type !== "ArrayExpression") return;
      let no = null;
      for (let i = atalar.length - 1; i >= 0 && no == null; i--) {
        const a = atalar[i];
        if (a.type === "AssignmentExpression" && a.left.type === "MemberExpression" && a.left.computed && a.left.property.type === "Literal" && typeof a.left.property.value === "number") no = a.left.property.value;
      }
      if (no == null) throw new Error(f + ": quiz için ders numarası bulunamadı (L[n] = {…} bekleniyordu)");
      const beklenen = ((w.PP_LESSONS[iz][no] || {}).quiz || []).length;
      if (beklenen !== d.value.elements.length) throw new Error(f + " L[" + no + "]: quiz elemanları sabit değil (" + d.value.elements.length + "≠" + beklenen + ")");
      const hedef = "ders:" + iz + ":" + no + ":sinav";
      d.value.elements.forEach((el, i) => {
        if (!el || el.type !== "ObjectExpression") throw new Error(f + " L[" + no + "] #" + i + ": soru nesne değil");
        const q = degerlendir(src.slice(el.start, el.end), f + " L[" + no + "] #" + i);
        if (q.answer === undefined) {   /* daha önce ayrılmış */
          if (!q.id) throw new Error(f + " L[" + no + "] #" + i + ": ne answer ne id var");
          return;
        }
        if (!Array.isArray(q.options) || new Set(q.options.map(norm)).size !== q.options.length) throw new Error(f + " L[" + no + "] #" + i + ": yinelenen ya da eksik seçenek");
        const idx = dogruIndeks(q);
        if (idx < 0) throw new Error(f + " L[" + no + "] #" + i + ": doğru seçenek çözülemedi");
        const id = soruKimligi(q.q, q.options), acik = {};
        if (q.why) acik.why = q.why;
        if (q.whyNot) acik.whyNot = q.whyNot;
        kayitlar.push({ hedef: hedef, varyant: "v1", soru_id: id, dogru: q.options[idx], agirlik: 1, aciklama: Object.keys(acik).length ? acik : null });
        hedefler[hedef] = { id: hedef, yetkinlik: "yet:" + iz + ":" + no, kritik: false, esik: ESIK, surum: SURUM, uyumlu: [ESKI_SURUM] };
        duzen.push({ bas: el.start, son: el.end, metin: nesneYenile(src, el, ["answer", "why", "whyNot", "id"], ["id: " + JSON.stringify(id)]) });
      });
    });
    sonuc.push({ dosya: path.relative(kok, yol).replace(/\\/g, "/"), src: src, duzen: duzen, kayitlar: kayitlar, hedefler: hedefler });
  });
  return sonuc;
}

/* ---------------------------------------------------------------- kaynak 2: VA sınavları */
function vaTara(kok) {
  return VA_SINAVLAR.map((c) => {
    const yol = path.join(kok, c.dosya), src = fs.readFileSync(yol, "utf8"), ast = parse(src, c.dosya);
    const duzen = [], kayitlar = [], hedefler = {};
    let bulundu = false;
    gez(ast, (d, atalar) => {
      if (d.type !== "AssignmentExpression" || d.left.type !== "MemberExpression" || d.left.property.name !== c.anahtar || d.right.type !== "ObjectExpression") return;
      bulundu = true;
      const idP = d.right.properties.find((p) => anahtarAdi(p) === "id"), sorP = d.right.properties.find((p) => anahtarAdi(p) === "sorular");
      if (!idP || !sorP || sorP.value.type !== "ArrayExpression") throw new Error(c.dosya + ": id/sorular bulunamadı");
      const hedef = idP.value.value;
      sorP.value.elements.forEach((el, i) => {
        const q = degerlendir(src.slice(el.start, el.end));
        if (q.a === undefined) { if (!q.id) throw new Error(c.dosya + " #" + i + ": ne a ne id var"); return; }
        if (!Number.isInteger(q.a) || q.a < 0 || q.a >= q.o.length) throw new Error(c.dosya + " #" + i + ": a geçersiz");
        if (new Set(q.o.map(norm)).size !== q.o.length) throw new Error(c.dosya + " #" + i + ": yinelenen seçenek");
        const id = soruKimligi(q.q, q.o);
        kayitlar.push({ hedef: hedef, varyant: "v1", soru_id: id, dogru: q.o[q.a], agirlik: 1, aciklama: null });
        hedefler[hedef] = { id: hedef, yetkinlik: "yet:va:" + hedef, kritik: false, esik: ESIK, surum: SURUM, uyumlu: [ESKI_SURUM] };
        duzen.push({ bas: el.start, son: el.end, metin: nesneYenile(src, el, ["a", "id"], ["id: " + JSON.stringify(id)]) });
      });
    });
    if (!bulundu) throw new Error(c.dosya + ": " + c.anahtar + " bulunamadı");
    return { dosya: c.dosya, src: src, duzen: duzen, kayitlar: kayitlar, hedefler: hedefler };
  });
}

/* ---------------------------------------------------------------- kaynak 3: seviye sınavı (soru bankasından ayrılır) */
const SEVIYE_DOSYA = "content/sinav/seviye.js";
const TOMBSTONE = '{ t: "_", d: 1, q: "", o: [], a: 0, w: "" }';   /* indeks kayması olmasın: kayıtlı istatistikler dizin numarasına bağlı */
function seviyeTara(kok) {
  const qbYol = path.join(kok, "js", "veri", "soru-bankasi.js"), src = fs.readFileSync(qbYol, "utf8"), ast = parse(src, "soru-bankasi.js");
  const mevcutYol = path.join(kok, SEVIYE_DOSYA);
  let mevcut = {};
  if (fs.existsSync(mevcutYol)) { const w = {}; w.window = w; vm.createContext(w); vm.runInContext(fs.readFileSync(mevcutYol, "utf8"), w); mevcut = (w.PP_SINAV && w.PP_SINAV.seviye) || {}; }
  /* QB tek dizi değil: var QB / QB_SEC / QB_BK / QB_NEW ve QB.concat([...]) değişmezleri; dizin = bağlama sırası */
  const diziler = [];
  gez(ast, (d) => {
    if (d.type === "VariableDeclarator" && /^QB/.test(d.id.name) && d.init && d.init.type === "ArrayExpression") diziler.push(d.init);
    if (d.type === "CallExpression" && d.callee.type === "MemberExpression" && d.callee.object.name === "QB" && d.callee.property.name === "concat") d.arguments.forEach((a) => { if (a.type === "ArrayExpression") diziler.push(a); });
  });
  if (!diziler.length) throw new Error("soru-bankasi.js: QB dizileri bulunamadı");
  const sorular = []; diziler.forEach((dz) => dz.elements.forEach((el) => sorular.push({ el: el, q: degerlendir(src.slice(el.start, el.end)) })));
  sorular.forEach((s, i) => { s.i = i; });
  const yollar = []; sorular.forEach((s) => { if (s.q.t !== "_" && yollar.indexOf(s.q.t) < 0) yollar.push(s.q.t); });
  const yeni = {}, duzen = [], kayitlar = [], hedefler = {}, secilen = [];
  yollar.forEach((yol) => {
    if (mevcut[yol]) return;   /* daha önce ayrılmış */
    const secim = [];
    [1, 2, 3].forEach((d) => {
      const aday = sorular.filter((s) => s.q.t === yol && s.q.d === d)
        .sort((a, b) => soruKimligi(a.q.q, a.q.o).localeCompare(soruKimligi(b.q.q, b.q.o)));   /* kimlik sırası: içerikten bağımsız, kararlı seçim */
      aday.slice(0, SEVIYE_SAYILARI[d]).forEach((s) => secim.push(s));
    });
    if (secim.length < 6) return;   /* peStart ile aynı alt sınır: yetersizse alan için seviye sınavı yok */
    const hedef = "seviye:" + yol;
    yeni[yol] = { hedef: hedef, varyant: "v1", sorular: secim.map((s) => ({ id: soruKimligi(s.q.q, s.q.o), d: s.q.d, q: s.q.q, o: s.q.o.slice() })) };
    secim.forEach((s) => {
      if (!Number.isInteger(s.q.a) || s.q.a < 0 || s.q.a >= s.q.o.length) throw new Error("QB #" + s.i + ": a geçersiz");
      if (new Set(s.q.o.map(norm)).size !== s.q.o.length) throw new Error("QB #" + s.i + ": yinelenen seçenek");
      const acik = s.q.w ? { why: s.q.w } : null;
      kayitlar.push({ hedef: hedef, varyant: "v1", soru_id: soruKimligi(s.q.q, s.q.o), dogru: s.q.o[s.q.a], agirlik: s.q.d, aciklama: acik });
      duzen.push({ bas: s.el.start, son: s.el.end, metin: TOMBSTONE });
      secilen.push(s.i);
    });
    hedefler[hedef] = { id: hedef, yetkinlik: "yet:" + yol + ":sorular", kritik: false, esik: ESIK, surum: SURUM, uyumlu: [ESKI_SURUM] };
  });
  return { qb: { dosya: "js/veri/soru-bankasi.js", src: src, duzen: duzen }, yeni: yeni, mevcut: mevcut, kayitlar: kayitlar, hedefler: hedefler, secilen: secilen };
}
function seviyeDosyasi(tum) {
  const yollar = Object.keys(tum).sort();
  const g = yollar.map((yol) => {
    const o = tum[yol];
    return "  " + JSON.stringify(yol) + ": { hedef: " + JSON.stringify(o.hedef) + ", varyant: " + JSON.stringify(o.varyant) + ", sorular: [\n" +
      o.sorular.map((s) => "    " + JSON.stringify(s)).join(",\n") + "\n  ] }";
  });
  return "/* Seviye sınavı soruları (Faz 9 sunucu): yalnız soru metni ve seçenekler. Doğru cevap ve açıklama BURADA DEĞİL; sunucuda (ogr_cevap_anahtari).\n" +
    "   Bu sorular js/veri/soru-bankasi.js içinden ayrıldı (orada yer tutucu kaldı); puanı sunucu hesaplar (zorluk d = ağırlık). */\n" +
    "(function () {\n  var S = (window.PP_SINAV = window.PP_SINAV || {});\n  S.seviye = {\n" + g.join(",\n") + "\n  };\n})();\n";
}

/* ---------------------------------------------------------------- SQL */
function hedefSql(hedefler) {
  const h = Object.keys(hedefler).sort().map((k) => hedefler[k]);
  let s = "-- Sinav hedefleri (metadata; cevap ICERMEZ). UYGULANMADI. Onkosul: 20261019_ogrenme_sunucu_sinav.sql uygulanmis olmali.\n" +
    "-- Uretici: node tools/cevap-anahtari.js (ders mini sinavi, VA sinavlari, seviye sinavi). Cakisma: guncellenir (idempotent).\n" +
    "begin;\ninsert into public.ogr_hedef (id, yetkinlik, kritik, esik, surum, uyumlu_surumler) values\n";
  s += h.map((x) => "  (" + [sqlMetin(x.id), sqlMetin(x.yetkinlik), x.kritik ? "true" : "false", x.esik, sqlMetin(x.surum), "array[" + x.uyumlu.map(sqlMetin).join(",") + "]::text[]"].join(", ") + ")").join(",\n");
  s += "\non conflict (id) do update set yetkinlik = excluded.yetkinlik, kritik = excluded.kritik, esik = excluded.esik, surum = excluded.surum, uyumlu_surumler = excluded.uyumlu_surumler;\n";
  /* Ders ustalik kapisi: kapi = o dersin mini sinavi (istemcideki ders hedefiyle bire bir). Proje/kanit isteyen kapilar sunucuda tanimsiz. */
  const dersler = h.filter((x) => /^ders:[a-z]+:\d+:sinav$/.test(x.id));
  if (dersler.length) {
    s += "\ninsert into public.ogr_kapi (id, seviye, esik) values\n" +
      dersler.map((x) => "  (" + [sqlMetin("ders-ustalik:" + x.id.split(":")[1] + ":" + x.id.split(":")[2]), sqlMetin("L1"), ESIK].join(", ") + ")").join(",\n") + "\non conflict (id) do nothing;\n";
    s += "\ninsert into public.ogr_kapi_hedef (kapi, hedef) values\n" +
      dersler.map((x) => "  (" + [sqlMetin("ders-ustalik:" + x.id.split(":")[1] + ":" + x.id.split(":")[2]), sqlMetin(x.id)].join(", ") + ")").join(",\n") + "\non conflict do nothing;\n";
  }
  return s + "commit;\n";
}
function anahtarSql(kayitlar) {
  let s = "-- CEVAP ANAHTARI (GIZLI). Halka acik repoya GIRMEZ (supabase/seed/.gitignore). UYGULANMADI.\n" +
    "-- Onkosul: 20261019_ogrenme_sunucu_sinav.sql ve *_ogr_hedefler.sql uygulanmis olmali. Cakisma: guncellenir (idempotent).\n" +
    "-- Uygulama: Supabase SQL editoru (sahip hesabi) ya da psql. Geri alma: delete from public.ogr_cevap_anahtari where hedef in (...).\n" +
    "begin;\n";
  const grup = [];
  for (let i = 0; i < kayitlar.length; i += 100) grup.push(kayitlar.slice(i, i + 100));
  grup.forEach((g) => {
    s += "insert into public.ogr_cevap_anahtari (hedef, varyant, soru_id, dogru, agirlik, aciklama) values\n" +
      g.map((k) => "  (" + [sqlMetin(k.hedef), sqlMetin(k.varyant), sqlMetin(k.soru_id), sqlMetin(k.dogru), k.agirlik, sqlJson(k.aciklama)].join(", ") + ")").join(",\n") +
      "\non conflict (hedef, varyant, soru_id) do update set dogru = excluded.dogru, agirlik = excluded.agirlik, aciklama = excluded.aciklama;\n";
  });
  /* Artık soruları temizle: içerikten çıkan/değişen sorunun eski anahtar satırı sunucuda kalıp maks'ı şişirmesin */
  const gruplar = new Map();
  kayitlar.forEach((k) => { const a = k.hedef + "|" + k.varyant; (gruplar.get(a) || gruplar.set(a, []).get(a)).push(k.soru_id); });
  gruplar.forEach((idler, a) => { const [h, v] = a.split("|"); s += "delete from public.ogr_cevap_anahtari where hedef = " + sqlMetin(h) + " and varyant = " + sqlMetin(v) + " and soru_id <> all (array[" + idler.map(sqlMetin).join(",") + "]::text[]);\n"; });
  return s + "commit;\n";
}

/* ---------------------------------------------------------------- ana akış */
function calistir(kok, secenek) {
  secenek = secenek || {};
  const seedDizin = secenek.seed || path.join(kok, "supabase", "seed");
  const ders = dersTara(kok), va = vaTara(kok), sv = seviyeTara(kok);
  const kayitlar = [], hedefler = {};
  ders.concat(va).forEach((k) => { k.kayitlar.forEach((x) => kayitlar.push(x)); Object.assign(hedefler, k.hedefler); });
  sv.kayitlar.forEach((x) => kayitlar.push(x)); Object.assign(hedefler, sv.hedefler);
  /* tekil kimlik: aynı (hedef, varyant, soru_id) iki kez olamaz */
  const goruldu = new Set();
  kayitlar.forEach((k) => { const a = k.hedef + "|" + k.varyant + "|" + k.soru_id; if (goruldu.has(a)) throw new Error("yinelenen soru kimliği: " + a); goruldu.add(a); });
  const ozet = {
    dersSoru: ders.reduce((n, k) => n + k.kayitlar.length, 0), vaSoru: va.reduce((n, k) => n + k.kayitlar.length, 0), seviyeSoru: sv.kayitlar.length,
    hedefSayisi: Object.keys(hedefler).length, yeniSeviyeYollari: Object.keys(sv.yeni), kayitSayisi: kayitlar.length
  };
  if (!secenek.yaz) return { ozet: ozet, yazilan: [] };
  if (!kayitlar.length) return { ozet: ozet, yazilan: [] };
  const yazilan = [], tarih = secenek.tarih || "20261018";
  /* 1) tohumlar */
  fs.mkdirSync(seedDizin, { recursive: true });
  const hedefYol = path.join(seedDizin, tarih + "_1_ogr_hedefler.sql"), anahtarYol = path.join(seedDizin, tarih + "_2_ogr_anahtar.sql");
  fs.writeFileSync(hedefYol, hedefSql(Object.assign(hedeflerOku(hedefYol), hedefler)));
  /* Var olan tohumla BİRLEŞTİR (aynı hedef+varyant+soru_id yenisiyle güncellenir): içerikten daha önce silinmiş anahtarlar kaybolmaz */
  const birlesik = new Map();
  if (fs.existsSync(anahtarYol)) anahtarSqlOku(fs.readFileSync(anahtarYol, "utf8")).forEach((r) => birlesik.set(r[0] + "|" + r[1] + "|" + r[2], { hedef: r[0], varyant: r[1], soru_id: r[2], dogru: r[3], agirlik: r[4], aciklama: r[5] }));
  kayitlar.forEach((k) => birlesik.set(k.hedef + "|" + k.varyant + "|" + k.soru_id, k));
  fs.writeFileSync(anahtarYol, anahtarSql(Array.from(birlesik.values())));
  yazilan.push(hedefYol, anahtarYol);
  /* 2) içerik: anahtar silinir, soru kimliği eklenir */
  ders.concat(va).forEach((k) => { if (k.duzen.length) { fs.writeFileSync(path.join(kok, k.dosya), duzenle(k.src, k.duzen)); yazilan.push(k.dosya); } });
  if (Object.keys(sv.yeni).length) {
    fs.mkdirSync(path.join(kok, "content", "sinav"), { recursive: true });
    fs.writeFileSync(path.join(kok, SEVIYE_DOSYA), seviyeDosyasi(Object.assign({}, sv.mevcut, sv.yeni)));
    fs.writeFileSync(path.join(kok, sv.qb.dosya), duzenle(sv.qb.src, sv.qb.duzen));
    yazilan.push(SEVIYE_DOSYA, sv.qb.dosya);
  }
  return { ozet: ozet, yazilan: yazilan };
}
/* Var olan hedef tohumunu (yalnız metadata) koru: yeniden çalıştırmada eski hedefler silinmesin */
function hedeflerOku(yol) {
  if (!fs.existsSync(yol)) return {};
  const o = {}, s = fs.readFileSync(yol, "utf8"), re = /^\s*\('([^']+)', '([^']+)', (true|false), ([0-9.]+), '([^']+)', array\['([^']+)'\]::text\[\]\)/gm;
  let m; while ((m = re.exec(s))) o[m[1]] = { id: m[1], yetkinlik: m[2], kritik: m[3] === "true", esik: Number(m[4]), surum: m[5], uyumlu: [m[6]] };
  return o;
}

/* Anahtar tohumunu (bu aracın ürettiği biçim) satırlara ayırır: [hedef, varyant, soru_id, dogru, agirlik, aciklama|null]. Testler/denetimler içindir; veritabanına bağlanmaz. */
function anahtarSqlOku(sql) {
  const out = []; let i = 0;
  while ((i = sql.indexOf("insert into public.ogr_cevap_anahtari", i)) >= 0) {
    i = sql.indexOf("values", i) + 6;
    for (;;) {
      while (i < sql.length && /[\s,]/.test(sql[i])) i++;
      if (sql[i] !== "(") break;
      i++; const alan = [];
      for (;;) {
        while (sql[i] === " ") i++;
        if (sql[i] === "'") {
          let t = ""; i++;
          for (;;) { if (sql[i] === "'") { if (sql[i + 1] === "'") { t += "'"; i += 2; continue; } i++; break; } t += sql[i++]; }
          if (sql.startsWith("::jsonb", i)) { i += 7; alan.push(JSON.parse(t)); } else alan.push(t);
        } else if (sql.startsWith("null", i)) { alan.push(null); i += 4; if (sql.startsWith("::jsonb", i)) i += 7; }
        else { let j = i; while (!/[,)]/.test(sql[j])) j++; alan.push(Number(sql.slice(i, j))); i = j; }
        if (sql[i] === ",") { i++; continue; }
        if (sql[i] === ")") { i++; break; }
        throw new Error("anahtar tohumu ayrıştırılamadı @" + i);
      }
      if (typeof alan[5] === "string" && alan[5][0] === "{") alan[5] = JSON.parse(alan[5]); // ::jsonb eki olmayan satır (faz-17b)
      out.push(alan);
    }
  }
  return out;
}

module.exports = { anahtarSqlOku, soruKimligi, dogruIndeks, norm, sqlMetin, hedefSql, anahtarSql, calistir, dersTara, vaTara, seviyeTara, nesneYenile, duzenle, SURUM, ESKI_SURUM, ESIK, SEVIYE_DOSYA };

if (require.main === module) {
  const a = process.argv.slice(2), al = (n) => { const i = a.indexOf(n); return i >= 0 ? a[i + 1] : null; };
  const kok = path.resolve(al("--kok") || path.join(__dirname, ".."));
  try {
    const r = calistir(kok, { yaz: a.indexOf("--yaz") >= 0, seed: al("--seed") ? path.resolve(al("--seed")) : null });
    console.log(JSON.stringify(r.ozet, null, 1));
    console.log(r.yazilan.length ? "Yazılan:\n  " + r.yazilan.join("\n  ") : "Kuru çalışma: dosyaya yazılmadı (yazmak için --yaz).");
  } catch (e) { console.error("HATA: " + e.message); process.exit(1); }
}

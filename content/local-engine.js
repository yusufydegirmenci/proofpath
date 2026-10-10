/* Proofpath yerel geri bildirim motoru (yapay zekâsız).
 * Serbest metni, ders içeriğinden ve örnek cevaplardan çıkarılan anahtar kelimelerle kıyaslar.
 * Kesin hüküm vermez: "şunları yakaladın, şunlar eksik, örnek cevap bu" der. */
(function (root) {
  var STOP = {};
  ("ve ile bir bu su o icin gibi daha cok ama veya ya da de mi mu mı mü ne nasil hangi olarak olan olur olmak var yok her tum ben sen biz siz onlar " +
   "the a an and or but of to in on at for with is are was were be been it this that these those as by from not no do does did have has had can could will would should i you he she we they my your our their me us them so if then than also just very " +
   "than into over under about after before when while which who what where why how").split(/\s+/).forEach(function (w) { if (w) STOP[w] = 1; });

  function norm(s) {
    s = String(s == null ? "" : s);
    try { s = s.toLocaleLowerCase("tr"); } catch (e) { s = s.toLowerCase(); }
    return s.replace(/ı/g, "i").replace(/ş/g, "s").replace(/ğ/g, "g").replace(/ç/g, "c").replace(/ö/g, "o").replace(/ü/g, "u")
      .replace(/â/g, "a").replace(/î/g, "i").replace(/û/g, "u").replace(/([a-z])-(?=[a-z])/g, "$1").replace(/[^a-z0-9\s./+-]/g, " ").replace(/\s+/g, " ").trim();
  }
  function stem(w) { w = w.replace(/^[.\-/+]+|[.\-/+]+$/g, ""); return w.length > 5 ? w.slice(0, 5) : w; }
  function toks(s) {
    var out = [], a = norm(s).split(" ");
    for (var i = 0; i < a.length; i++) { var w = a[i]; if (!w) continue; if (w.length < 3 && !/^\d+$/.test(w) && !/^(ip|vm|os|ai|ui|db)$/.test(w)) continue; if (STOP[w]) continue; out.push(stem(w)); }
    return out;
  }
  function stemSet(s) { var o = {}; toks(s).forEach(function (t) { o[t] = 1; }); return o; }

  /* terim (çok kelimeli olabilir) kullanıcı metninde geçiyor mu */
  function hasTerm(set, term) {
    var t = toks(term);
    if (!t.length) { var nt = norm(term); return !!nt && (" " + (set.__raw || "") + " ").indexOf(" " + nt + " ") >= 0; }
    for (var i = 0; i < t.length; i++) if (!set[t[i]]) return false;
    return true;
  }
  function coverage(text, terms) {
    var set = stemSet(text), hit = [], miss = [];
    Object.defineProperty(set, "__raw", { value: norm(text), enumerable: false });
    (terms || []).forEach(function (tm) { (hasTerm(set, tm) ? hit : miss).push(tm); });
    var n = hit.length + miss.length;
    return { hit: hit, miss: miss, ratio: n ? hit.length / n : 0 };
  }
  function uniq(a) { var s = {}, o = []; a.forEach(function (x) { var k = norm(x); if (k && !s[k]) { s[k] = 1; o.push(x); } }); return o; }
  function head(s) { s = String(s || ""); var m = /^\s*(?:\d+[).]\s*)?([^:–—(=]{2,38})[:–—(=]/.exec(s); return m ? m[1].trim() : ""; }

  /* ── ders → anahtar terimler / model anlatım / arama parçaları ── */
  var GENERIC = /^(gercek|durum|kopyala|sik hata|dikkat|hazir cumle|neden|ornek|ozet|not|bonus|adim|ipucu|ders|soru|cevap)/;
  function lessonTerms(l) {
    var t = [];
    (l.vocab || []).forEach(function (v) { if (v && v.term) t.push(v.term); });
    var w = l.warmup || {};
    (w.concepts || []).forEach(function (c) { if (c && c.term) t.push(c.term); });
    (w.words || []).forEach(function (x) { if (x && x.word) t.push(x.word); });
    (l.blocks || []).forEach(function (b) {
      if (b.t === "steps") (b.items || []).forEach(function (it) { var h = head(it); if (h && h.split(" ").length <= 3 && !/^\d+$/.test(h) && !GENERIC.test(norm(h))) t.push(h); });
    });
    return uniq(t.filter(function (x) { x = String(x); return x.length >= 3 && x.length <= 40 && !GENERIC.test(norm(x)); })).slice(0, 24);
  }
  function lessonModel(l) {
    var parts = [];
    if (l.hook) parts.push(l.hook);
    var n = 0;
    (l.blocks || []).forEach(function (b) {
      if (n >= 5) return;
      if (b.t === "box" && b.text) { parts.push(b.text); n++; }
      else if (b.t === "p" && b.text) { parts.push(b.text); n++; }
      else if (b.t === "split" && b.result) { parts.push(b.result); }
      else if (b.t === "steps") { (b.items || []).slice(0, 3).forEach(function (x) { parts.push(x); }); n++; }
    });
    return parts.join(" ").slice(0, 900);
  }
  function chunks(l) {
    var c = [];
    if (l.hook) c.push({ k: "Özet", t: l.hook });
    (l.blocks || []).forEach(function (b) {
      var h = b.h || "";
      if (b.text && (b.t === "p" || b.t === "box" || b.t === "warn")) c.push({ k: h || (b.t === "warn" ? "Dikkat" : "Ders"), t: b.text });
      if (b.t === "steps") (b.items || []).forEach(function (x) { c.push({ k: h || "Adımlar", t: x }); });
      if (b.t === "cmd" && b.text) c.push({ k: "Komut", t: b.text });
      if (b.t === "split") c.push({ k: "Cümle kurma", t: (b.tr || "") + " → " + (b.result || "") });
    });
    (l.quiz || []).forEach(function (q) { if (q.why) c.push({ k: "Quiz notu", t: q.q + " " + q.why }); });
    (l.interview || []).forEach(function (q) { c.push({ k: "Mülakat", t: q.q + " " + q.a }); });
    (l.vocab || []).forEach(function (v) { c.push({ k: "Kelime", t: v.term + " = " + v.tr + (v.ex ? " (" + v.ex + ")" : "") }); });
    return c;
  }
  function searchLesson(l, question) {
    var qs = stemSet(question), keys = Object.keys(qs);
    if (!keys.length) return [];
    var sc = chunks(l).map(function (c) {
      var set = stemSet(c.k + " " + c.t), s = 0;
      keys.forEach(function (k) { if (set[k]) s++; });
      return { c: c, s: s / Math.sqrt(keys.length) };
    }).filter(function (x) { return x.s > 0; });
    sc.sort(function (a, b) { return b.s - a.s; });
    return sc.slice(0, 3).map(function (x) { return x.c; });
  }

  /* ── anlatım / mülakat cevabı: model cevapla kıyas ── */
  function modelTerms(model) {
    var seen = {}, out = [];
    String(model || "").split(/[\s,.;:!?()"“”]+/).forEach(function (w) {
      var n = norm(w);
      if (n.length < 5 || STOP[n]) return;
      var s = stem(n);
      if (seen[s]) return; seen[s] = 1; out.push(w.replace(/^[^\wÀ-ɏ]+|[^\wÀ-ɏ]+$/g, ""));
    });
    out.sort(function (a, b) { return b.length - a.length; });
    return out.slice(0, 12);
  }
  function grade(answer, model, extraTerms, opts) {
    opts = opts || {};
    var words = String(answer || "").trim().split(/\s+/).filter(Boolean).length;
    var terms = uniq((extraTerms || []).concat(opts.only ? [] : modelTerms(model))).slice(0, opts.max || 14);
    var cv = coverage(answer, terms);
    var target = opts.target || Math.max(2, Math.min(6, Math.ceil(terms.length * 0.5)));
    var ratio = Math.min(1, cv.hit.length / target);
    var lenF = Math.min(1, words / 25);
    var score = Math.round(Math.min(10, ratio * 8.5 + lenF * 1.5));
    if (words < 6) score = Math.min(score, 2);
    return { score: score, hit: cv.hit, miss: cv.miss, words: words, ratio: ratio, target: target, total: terms.length };
  }

  /* ── İngilizce ticket cevabı ── */
  var ENW = {
    greet: /\b(hi|hello|dear|good (morning|afternoon|evening))\b/i,
    close: /\b(regards|best|thanks|thank you|sincerely|cheers)\b/i,
    sorry: /\b(sorry|apolog\w*|understand|unfortunately|thank you|welcome)\b/i,
    action: /\b(will|can|could|please|let me|i'll|we'll|i will|we will|i can|we can|try|check|restart|reset|send|install|update|click|type|open|tell me|sign in|add|set up|use|ask|start)\b/i,
    when: /\b(today|tomorrow|first|then|after that|before|by|within|minutes?|hours?|monday|tuesday|wednesday|thursday|friday|soon|asap|now)\b/i,
    ask: /\b(please|could you|can you|would you|let me know|send me)\b/i
  };
  var LVL_WORDS = [5, 12, 25, 45, 70];
  function ticketKeywords(t) {
    var k = (t.keywords || []).map(function (x) { return x.w; }).filter(Boolean);
    if (k.length >= 3) return k;
    return uniq(k.concat(modelTerms(t.model || t.body)).slice(0, 8));
  }
  function ticketSkeleton(t) {
    if (t.skeleton) return t.skeleton;
    var s = String(t.model || ""), kw = ticketKeywords(t).map(norm);
    return s.split(/(\s+)/).map(function (w) { var n = norm(w); return (n && kw.indexOf(n) >= 0) ? "___" : w; }).join("");
  }
  function ticketFeedback(t, text) {
    var lvl = t.level || 1, words = String(text).trim().split(/\s+/).filter(Boolean).length;
    var kws = ticketKeywords(t), cv = coverage(text, kws);
    var need = LVL_WORDS[lvl - 1], good = [], fix = [], score = 0;
    /* görev: anahtar kelimeler (40) */
    score += Math.round(cv.ratio * 40);
    if (cv.hit.length) good.push(cv.hit.slice(0, 3).join(", ") + " kelimelerini doğru yerde kullandın.");
    /* eylem (20) */
    var act = ENW.action.test(text);
    if (act) score += 12; else fix.push("Ne yapacağını açıkça söyle (I will ... / Please ...).");
    if (lvl >= 2 && ENW.when.test(text)) score += 8; else if (lvl >= 2) fix.push("Bir zaman ya da süre ekle (today, within 1 hour, by Friday).");
    else score += 8;
    /* ton ve yapı (20) */
    if (lvl >= 3) {
      if (ENW.greet.test(text)) score += 6; else fix.push("Selamla başla (Hi / Dear ...).");
      if (ENW.close.test(text)) score += 6; else fix.push("Nazik bir kapanış ekle (Best regards / Thank you).");
      if (ENW.sorry.test(text)) score += 8; else fix.push("Önce anladığını göster (Sorry for ... / Thank you for ...).");
    } else score += 20;
    /* uzunluk (10) */
    var lr = Math.min(1, words / need);
    score += Math.round(lr * 10);
    if (words < need * 0.6) fix.push("Biraz kısa kaldı; bu seviyede yaklaşık " + need + " kelime beklenir.");
    else good.push("Uzunluk yerinde.");
    /* yazım (10) */
    var mech = 10;
    if (/(^|[.!?]\s+)[a-z]/.test(text.trim())) { mech -= 3; fix.push("Cümleleri büyük harfle başlat."); }
    if (/\bi\b/.test(text)) { mech -= 3; fix.push("'I' her zaman büyük yazılır."); }
    if (!/[.!?]\s*$/.test(text.trim())) { mech -= 2; fix.push("Cümleyi nokta ile bitir."); }
    score += Math.max(0, mech);
    score = Math.max(0, Math.min(100, score));
    var words2 = cv.miss.slice(0, 3);
    return {
      score: score,
      good: good.slice(0, 2).join(" ") || "Yazmaya başlaman en zor kısımdı.",
      fix: fix.slice(0, 2).join(" ") || (cv.miss.length ? "Şu kelimeleri de kullanmayı dene: " + cv.miss.slice(0, 3).join(", ") + "." : "Bu cevap çok iyi. Örnek cevapla kendi cümlelerini karşılaştır."),
      better: t.model || "",
      missing: words2
    };
  }


  /* ── soru metni → en uygun sabit ders ── */
  var _ix = {};
  function lessonIndex(track, lessons) {
    var key = track + ":" + Object.keys(lessons).length;
    if (_ix[key]) return _ix[key];
    var docs = {}, df = {}, N = 0;
    Object.keys(lessons).forEach(function (n) {
      var set = {};
      chunks(lessons[n]).forEach(function (c) { var st = stemSet(c.k + " " + c.t); for (var k in st) set[k] = 1; });
      docs[n] = set; N++;
      for (var k in set) df[k] = (df[k] || 0) + 1;
    });
    return (_ix[key] = { docs: docs, df: df, N: N });
  }
  function bestLesson(track, lessons, text, minScore) {
    if (!lessons) return null;
    var ix = lessonIndex(track, lessons), keys = Object.keys(stemSet(text)), best = null, second = 0;
    if (keys.length < 2) return null;
    Object.keys(ix.docs).forEach(function (n) {
      var s = 0, hits = 0;
      keys.forEach(function (k) { if (ix.docs[n][k]) { hits++; s += Math.log(1 + ix.N / (ix.df[k] || 1)); } });
      if (hits < 2) return;
      if (!best || s > best.score) { if (best) second = best.score; best = { n: +n, score: s, hits: hits }; }
      else if (s > second) second = s;
    });
    return best && best.score >= (minScore || 5) && best.score >= second * 1.12 ? best : null;
  }

  root.PPLocal = { bestLesson: bestLesson,  norm: norm, coverage: coverage, lessonTerms: lessonTerms, lessonModel: lessonModel, searchLesson: searchLesson, grade: grade, modelTerms: modelTerms,
    ticketKeywords: ticketKeywords, ticketSkeleton: ticketSkeleton, ticketFeedback: ticketFeedback };
})(typeof window !== "undefined" ? window : globalThis);

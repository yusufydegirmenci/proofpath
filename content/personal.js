/* Kişiye özel çalışma planı (yapay zekâsız).
 * Girdi: kullanıcının kendi yanlışları, soru istatistikleri, anlatım denemeleri, ticket puanları.
 * Çıktı: öncelik sırasıyla en çok 4 madde + takıldığı sorular. Kurallar sabittir, her kullanıcıda farklı sonuç verir. */
(function (root) {
  function clip(s, n) { s = String(s || ""); return s.length > n ? s.slice(0, n - 1) + "…" : s; }

  /* input:
   *  today, tracks:[{track,name,nextN,nextTitle,done,total,last}],
   *  weakQs:[{i,q,t,acc,n}], mistakes:[{track,q,lesson,lessonN}],
   *  teach:[{id,track,n,title,score,miss}], desk:{answered,avg},
   *  match(track,text)->{n,title}|null  */
  function analyze(inp) {
    var items = [], weak = [];
    var mis = inp.mistakes || [], due = inp.due || 0;

    if (due > 0) {
      items.push({ id: "review", pr: 100 + Math.min(due, 10), kind: "review", title: due + " yanlışının tekrar günü geldi",
        detail: "Unutma eğrisinin tam başladığı gün sorulunca kalıcı olur. 3-5 dakika.", minutes: Math.max(3, Math.min(10, due)), act: { type: "review" } });
    }

    /* zayıf sorular + ders içi quiz yanlışları → en uygun derse topla */
    var cl = {};
    function add(track, n, title, text, w) {
      var k = track + ":" + (n || ("t-" + track));
      var c = cl[k] || (cl[k] = { track: track, n: n || 0, title: title || "", w: 0, qs: [] });
      c.w += w; if (text && c.qs.length < 3) c.qs.push(clip(text, 90));
    }
    (inp.weakQs || []).forEach(function (q) {
      var m = inp.match ? inp.match(q.t, q.q + " " + (q.a || "")) : null;
      var w = (1 - q.acc) * Math.min(3, 1 + q.n * 0.5);
      add(q.t, m && m.n, m && m.title, q.q, w);
      weak.push({ i: q.i, q: clip(q.q, 120), acc: Math.round(q.acc * 100), n: q.n, track: q.t, lessonN: m ? m.n : 0, lessonTitle: m ? m.title : "" });
    });
    mis.forEach(function (m) { add(m.track, m.lessonN, m.lesson, m.q, 1.2); });
    var cls = Object.keys(cl).map(function (k) { return cl[k]; }).sort(function (a, b) { return b.w - a.w; });
    cls.slice(0, 2).forEach(function (c, idx) {
      if (c.w < 0.8) return;
      if (c.n) {
        items.push({ id: "re-" + c.track + c.n, pr: 90 - idx * 6 + Math.min(c.w, 5), kind: "relesson", title: "Şu dersi yeniden oku: " + c.title,
          detail: "Takıldığın sorular bu konuya düşüyor: " + c.qs.map(function (x) { return "«" + x + "»"; }).join(" "), minutes: 10, act: { type: "lesson", track: c.track, n: c.n } });
      } else {
        items.push({ id: "drill-" + c.track, pr: 80 - idx * 6 + Math.min(c.w, 5), kind: "drill", title: (inp.trackName ? inp.trackName(c.track) : c.track) + ": zayıf sorularını çöz",
          detail: "Yanlış yaptığın soruların olduğu bir tur. Her cevaptan sonra nedenini görürsün.", minutes: 5, act: { type: "drill", track: c.track } });
      }
    });

    /* anlatım denemeleri (anahtar kavram kıyası) */
    var worst = (inp.teach || []).filter(function (t) { return t.score < 5; }).sort(function (a, b) { return a.score - b.score; })[0];
    if (worst) {
      items.push({ id: "teach-" + worst.id, pr: 70, kind: "reteach", title: "Dersi kendi sözlerinle yeniden anlat: " + worst.title,
        detail: worst.miss && worst.miss.length ? "Son denemende şu kavramlar eksikti: " + worst.miss.slice(0, 4).join(", ") + "." : "Son denemende anahtar kavramlar az geçti.",
        minutes: 5, act: { type: "lesson", track: worst.track, n: worst.n } });
    }

    /* ticket masası */
    var dk = inp.desk || {};
    if (dk.answered > 0 && dk.avg != null && dk.avg < 70) {
      items.push({ id: "desk", pr: 68, kind: "desk", title: "Destek masası: ortalaman " + dk.avg + "/100",
        detail: "Örnek cevabı aç, kendi cevabınla karşılaştır ve aynı seviyedeki bir ticket'ı yeniden yaz.", minutes: 8, act: { type: "tab", tab: "masa" } });
    } else if (!dk.answered && (inp.engStarted)) {
      items.push({ id: "desk0", pr: 35, kind: "desk", title: "İlk destek talebini yanıtla",
        detail: "İngilizce derslerini gerçek bir iş talebinde dene. Ön kontrol anında geri bildirim verir.", minutes: 8, act: { type: "tab", tab: "masa" } });
    }

    /* sıradaki ders: en uzun süredir çalışılmayan rota */
    var tr = (inp.tracks || []).filter(function (t) { return t.nextN && t.done < t.total; });
    tr.sort(function (a, b) { return String(a.last || "").localeCompare(String(b.last || "")); });
    if (tr[0]) {
      var t0 = tr[0];
      items.push({ id: "next-" + t0.track, pr: 60, kind: "next", title: "Sıradaki ders: " + t0.nextTitle,
        detail: t0.name + " rotasında " + t0.done + "/" + t0.total + " ders bitti." + (t0.last ? " Son çalışma: " + t0.last + "." : ""), minutes: 15, act: { type: "lesson", track: t0.track, n: t0.nextN, next: true } });
    }

    items.sort(function (a, b) { return b.pr - a.pr; });
    var seen = {}, out = [];
    items.forEach(function (it) { if (!seen[it.id] && out.length < 4) { seen[it.id] = 1; out.push(it); } });
    weak.sort(function (a, b) { return a.acc - b.acc || b.n - a.n; });
    var tot = (inp.weakQs || []).length;
    return { items: out, weak: weak.slice(0, 6), weakCount: tot, minutes: out.reduce(function (a, x) { return a + x.minutes; }, 0) };
  }
  root.PPPersonal = { analyze: analyze };
})(typeof window !== "undefined" ? window : globalThis);

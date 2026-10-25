"use strict";
/* ---- Sunucusuz SVG şema çizici: düğüm (kutu/daire) + ok listesinden ızgara yerleşimli statik SVG. ----
   Yalnız ders içeriği gösterir; öğrenci girdisi render edilmez. Tüm metinler esc() ile kaçışlanır, ham HTML/SVG enjekte edilmez. */
(function (root) {
  var GEN = 120, YUK = 56, ARA_X = 70, ARA_Y = 60, KENAR = 20;
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function sayi(v, d) { v = Number(v); return isFinite(v) && v >= 0 ? Math.floor(v) : d; }
  var sayac = 0;

  // dugumler: [{id, etiket, sekil:"kutu"|"daire", sut?, satir?}], oklar: [{kimden, kime, etiket?, cift?}]
  // sut/satir verilmeyen düğümler sırayla, opts.sut (varsayılan 3) sütunlu ızgaraya dizilir.
  function ciz(dugumler, oklar, opts) {
    opts = opts || {}; dugumler = dugumler || []; oklar = oklar || [];
    var kol = Math.max(1, sayi(opts.sut, 3)), pos = Object.create(null), dolu = Object.create(null), sira = 0, i;
    dugumler.forEach(function (d) {
      var id = String(d && d.id);
      if (id === "undefined" || id === "" || pos[id]) throw new Error("diyagram: eksik ya da yinelenen düğüm kimliği: " + id);
      var s, r;
      if (d.sut !== undefined && d.satir !== undefined) { s = sayi(d.sut, 0); r = sayi(d.satir, 0); }
      else { while (dolu[(sira % kol) + "," + Math.floor(sira / kol)]) sira++; s = sira % kol; r = Math.floor(sira / kol); }
      dolu[s + "," + r] = 1;
      pos[id] = { d: d, cx: KENAR + s * (GEN + ARA_X) + GEN / 2, cy: KENAR + r * (YUK + ARA_Y) + YUK / 2 };
    });
    var maxX = 0, maxY = 0;
    for (i in pos) { maxX = Math.max(maxX, pos[i].cx + GEN / 2); maxY = Math.max(maxY, pos[i].cy + YUK / 2); }
    var w = maxX + KENAR, h = maxY + KENAR, uid = "ppd" + (++sayac);
    var p = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + " " + h + '" width="' + w + '" height="' + h + '" role="img" aria-label="' + esc(opts.baslik || "şema") + '" font-family="sans-serif" font-size="12" style="max-width:100%;height:auto">',
      '<defs><marker id="' + uid + '" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="currentColor"/></marker></defs>'];
    oklar.forEach(function (o) {
      var a = pos[String(o && o.kimden)], b = pos[String(o && o.kime)];
      if (!a || !b) throw new Error("diyagram: okta tanımsız düğüm: " + (o && o.kimden) + " -> " + (o && o.kime));
      var dx = b.cx - a.cx, dy = b.cy - a.cy, t1 = kesim(a, dx, dy), t2 = kesim(b, -dx, -dy);
      var x1 = a.cx + dx * t1, y1 = a.cy + dy * t1, x2 = b.cx - dx * t2, y2 = b.cy - dy * t2;
      p.push('<line x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '" stroke="currentColor" stroke-width="1.5" marker-end="url(#' + uid + ')"' + (o.cift ? ' marker-start="url(#' + uid + ')"' : "") + "/>");
      if (o.etiket) p.push('<text x="' + ((x1 + x2) / 2).toFixed(1) + '" y="' + ((y1 + y2) / 2 - 5).toFixed(1) + '" text-anchor="middle" fill="currentColor" font-size="11">' + esc(o.etiket) + "</text>");
    });
    for (i in pos) {
      var n = pos[i], d = n.d, et = esc(d.etiket !== undefined ? d.etiket : d.id);
      p.push(d.sekil === "daire"
        ? '<ellipse cx="' + n.cx + '" cy="' + n.cy + '" rx="' + GEN / 2 + '" ry="' + YUK / 2 + '" fill="none" stroke="currentColor" stroke-width="1.5"/>'
        : '<rect x="' + (n.cx - GEN / 2) + '" y="' + (n.cy - YUK / 2) + '" width="' + GEN + '" height="' + YUK + '" rx="6" fill="none" stroke="currentColor" stroke-width="1.5"/>');
      p.push('<text x="' + n.cx + '" y="' + (n.cy + 4) + '" text-anchor="middle" fill="currentColor">' + et + "</text>");
    }
    return p.join("") + "</svg>";
  }
  // Merkezden (dx,dy) yönünde düğüm sınırına kadar uzaklığın, merkezler arası uzaklığa oranı (daire: elips, kutu: dikdörtgen)
  function kesim(n, dx, dy) {
    var a = GEN / 2, b = YUK / 2, ax = Math.abs(dx), ay = Math.abs(dy);
    if (!ax && !ay) return 0;
    if (n.d.sekil === "daire") return 1 / Math.sqrt(dx * dx / (a * a) + dy * dy / (b * b));
    return Math.min(ax ? a / ax : Infinity, ay ? b / ay : Infinity);
  }

  // Ders içeriği kaydı: topicId (ör. "s-ccna-1") -> { dugumler, oklar, baslik }
  var kayit = Object.create(null);
  function ders(l) {
    var k = l && l.topicId, s = k && kayit[k];
    if (!s) return null;
    var el = document.createElement("div");
    el.className = "panel"; el.innerHTML = '<div class="label">Şema</div><h3></h3><div class="pp-diyagram" style="overflow-x:auto;color:inherit"></div>';
    el.querySelector("h3").textContent = s.baslik || "";
    el.querySelector(".pp-diyagram").innerHTML = ciz(s.dugumler, s.oklar, { baslik: s.baslik, sut: s.sut });
    return el;
  }

  kayit["s-ccna-1"] = {
    baslik: "Küçük bir ağın topolojisi", sut: 3,
    dugumler: [{ id: "pc1", etiket: "PC1 (uç cihaz)", sut: 0, satir: 0 }, { id: "sw", etiket: "Switch", sut: 1, satir: 0 }, { id: "pc2", etiket: "PC2 (uç cihaz)", sut: 2, satir: 0 },
      { id: "r", etiket: "Router", sut: 1, satir: 1 }, { id: "net", etiket: "İnternet", sekil: "daire", sut: 1, satir: 2 }],
    oklar: [{ kimden: "pc1", kime: "sw", cift: 1 }, { kimden: "pc2", kime: "sw", cift: 1 }, { kimden: "sw", kime: "r", cift: 1, etiket: "gateway" }, { kimden: "r", kime: "net", cift: 1, etiket: "ISP" }]
  };

  var api = { ciz: ciz, ders: ders, kayit: kayit, esc: esc };
  if (typeof module !== "undefined" && module.exports) module.exports = api; else root.PP_DIYAGRAM = api;
})(typeof window !== "undefined" ? window : this);

"use strict";
/* ---- Git simülatörü: bellekte obje modeli, sunucusuz. Gerçek git değil; sadeleştirmeler her komutun yanında. ---- */
(function (root) {
  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return ("0000000" + h.toString(16)).slice(-7); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function tok(line) { // tırnaklı argümanları tek parça yapar
    var a = [], re = /"([^"]*)"|'([^']*)'|(\S+)/g, m;
    while ((m = re.exec(line))) a.push(m[1] !== undefined ? m[1] : m[2] !== undefined ? m[2] : m[3]);
    return a;
  }
  function lines(t) { return t === "" ? [] : t.split("\n"); }
  function lineDiff(a, b) { // LCS tabanlı satır farkı; küçük dosyalar için yeterli
    var x = lines(a), y = lines(b), L = [], i, j, out = [];
    for (i = 0; i <= x.length; i++) { L.push(new Array(y.length + 1).fill(0)); }
    for (i = x.length - 1; i >= 0; i--) for (j = y.length - 1; j >= 0; j--) L[i][j] = x[i] === y[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
    i = 0; j = 0;
    while (i < x.length && j < y.length) {
      if (x[i] === y[j]) { out.push(" " + x[i]); i++; j++; }
      else if (L[i + 1][j] >= L[i][j + 1]) out.push("-" + x[i++]); else out.push("+" + y[j++]);
    }
    while (i < x.length) out.push("-" + x[i++]);
    while (j < y.length) out.push("+" + y[j++]);
    return out;
  }
  function same(a, b) { return JSON.stringify(a) === JSON.stringify(b); }
  function names(o) { return Object.keys(o).sort(); }

  function create() {
    var S = null; // null = henüz git init yapılmadı
    var work = {}; // çalışma dizini: ad → içerik (git'ten bağımsız, kabuk komutlarıyla değişir)
    var NOREPO = "fatal: not a git repository (or any of the parent directories): .git";

    function tree(id) { return id ? S.commits[id].tree : {}; }
    function headId() { return S.head.branch ? S.branches[S.head.branch] || null : S.head.id; }
    function ancestors(id) { var seen = {}, q = id ? [id] : []; while (q.length) { var c = q.pop(); if (seen[c]) continue; seen[c] = 1; S.commits[c].parents.forEach(function (p) { q.push(p); }); } return seen; }
    function mergeBase(a, b) { // iki ucun ortak atalarından en yeni olanı
      var A = ancestors(a), best = null;
      Object.keys(ancestors(b)).forEach(function (c) { if (A[c] && (!best || S.commits[c].seq > S.commits[best].seq)) best = c; });
      return best;
    }
    function newCommit(msg, parents, t) {
      var seq = ++S.seq, id = hash(msg + "|" + parents.join(",") + "|" + JSON.stringify(t) + "|" + seq);
      S.commits[id] = { id: id, seq: seq, msg: msg, parents: parents, tree: t };
      return id;
    }
    function advance(id) { if (S.head.branch) S.branches[S.head.branch] = id; else S.head.id = id; }
    function dirty(a, b) { return names(a).concat(names(b)).filter(function (f, i, all) { return all.indexOf(f) === i && a[f] !== b[f]; }); }
    function resolve(ref) { return S.branches[ref] || (S.commits[ref] ? ref : Object.keys(S.commits).filter(function (c) { return ref.length >= 4 && c.indexOf(ref) === 0; })[0] || null); }
    function label(id) {
      var l = [], hd = headId() === id;
      names(S.branches).forEach(function (b) { if (S.branches[b] === id) l.push(S.head.branch === b ? "HEAD -> " + b : b); });
      if (hd && !S.head.branch) l.unshift("HEAD");
      if (S.head.branch && hd) { l = l.filter(function (x) { return x.indexOf("HEAD -> ") === 0; }).concat(l.filter(function (x) { return x.indexOf("HEAD -> ") !== 0; })); }
      return l.length ? " (" + l.join(", ") + ")" : "";
    }
    function checkoutTree(target) { // çalışma dizini ve index hedef ağaca gelir
      var t = tree(target), cur = tree(headId());
      var bad = dirty(cur, t).filter(function (f) { return S.index[f] !== cur[f] || work[f] !== cur[f]; });
      if (bad.length) return "error: Your local changes to the following files would be overwritten by checkout:\n\t" + bad.join("\n\t") + "\nPlease commit your changes or stash them before you switch branches.\nAborting";
      dirty(cur, t).forEach(function (f) { if (f in t) work[f] = t[f]; else delete work[f]; });
      S.index = Object.assign({}, t);
      return null;
    }

    var G = {
      init: function () {
        if (S) return "Reinitialized existing Git repository in .git/";
        S = { commits: {}, branches: {}, head: { branch: "main", id: null }, index: {}, seq: 0 };
        return "Initialized empty Git repository in .git/";
      },
      add: function (a) {
        if (!a.length) return "Nothing specified, nothing added.\nhint: Maybe you wanted to say 'git add .'?";
        var all = a.indexOf(".") >= 0 || a.indexOf("-A") >= 0, files = all ? names(work).concat(names(S.index)) : a.filter(function (x) { return x[0] !== "-"; });
        for (var i = 0; i < files.length; i++) {
          var f = files[i];
          if (f in work) S.index[f] = work[f];
          else if (f in S.index) delete S.index[f]; // silinen dosya aşamalanır
          else return "fatal: pathspec '" + f + "' did not match any files";
        }
        return "";
      },
      commit: function (a) {
        var i = a.indexOf("-m"), msg = i >= 0 ? a[i + 1] : null;
        if (i >= 0 && !msg) return "error: switch `m' requires a value";
        var cur = headId();
        if (same(S.index, tree(cur)) && (cur || !names(S.index).length)) return "On branch " + (S.head.branch || "HEAD") + "\n" + (cur ? "nothing to commit, working tree clean" : "nothing to commit (create/copy files and use \"git add\" to track)");
        if (!msg) return "Aborting commit due to empty commit message.";
        var old = tree(cur), id = newCommit(msg, cur ? [cur] : [], Object.assign({}, S.index));
        advance(id);
        var ch = dirty(old, S.index).length;
        return "[" + (S.head.branch || "detached HEAD") + (cur ? " " : " (root-commit) ") + id + "] " + msg + "\n " + ch + " file" + (ch === 1 ? "" : "s") + " changed";
      },
      status: function () {
        var cur = tree(headId()), o = ["On branch " + S.head.branch], st = [], un = [], nt = [];
        if (!S.head.branch) o = ["HEAD detached at " + headId()];
        if (!headId()) o.push("\nNo commits yet");
        dirty(cur, S.index).forEach(function (f) { st.push("\t" + (!(f in cur) ? "new file:   " : !(f in S.index) ? "deleted:    " : "modified:   ") + f); });
        names(S.index).forEach(function (f) { if (!(f in work)) un.push("\tdeleted:    " + f); else if (work[f] !== S.index[f]) un.push("\tmodified:   " + f); });
        names(work).forEach(function (f) { if (!(f in S.index)) nt.push("\t" + f); });
        if (st.length) o.push("\nChanges to be committed:\n" + st.join("\n"));
        if (un.length) o.push("\nChanges not staged for commit:\n" + un.join("\n"));
        if (nt.length) o.push("\nUntracked files:\n" + nt.join("\n"));
        if (!st.length && !un.length && !nt.length) o.push(headId() ? "\nnothing to commit, working tree clean" : "");
        else if (!st.length) o.push("\n" + (nt.length && !un.length ? "nothing added to commit but untracked files present" : "no changes added to commit"));
        return o.join("\n");
      },
      log: function (a) {
        var id = headId();
        if (!id) return "fatal: your current branch '" + S.head.branch + "' does not have any commits yet";
        var one = a.indexOf("--oneline") >= 0, A = ancestors(id), out = [];
        Object.keys(A).map(function (c) { return S.commits[c]; }).sort(function (x, y) { return y.seq - x.seq; }).forEach(function (c) {
          out.push(one ? c.id + label(c.id) + " " + c.msg : "commit " + c.id + label(c.id) + (c.parents.length > 1 ? "\nMerge: " + c.parents.join(" ") : "") + "\n\n    " + c.msg + "\n");
        });
        return out.join("\n");
      },
      branch: function (a) {
        var d = a.indexOf("-d") >= 0 || a.indexOf("-D") >= 0, arg = a.filter(function (x) { return x[0] !== "-"; })[0];
        if (!arg) return names(S.branches).map(function (b) { return (S.head.branch === b ? "* " : "  ") + b; }).join("\n");
        if (d) {
          if (!(arg in S.branches)) return "error: branch '" + arg + "' not found.";
          if (S.head.branch === arg) return "error: cannot delete branch '" + arg + "' used by worktree at '.'";
          if (a.indexOf("-D") < 0 && !ancestors(headId())[S.branches[arg]]) return "error: the branch '" + arg + "' is not fully merged.\nIf you are sure you want to delete it, run 'git branch -D " + arg + "'";
          var was = S.branches[arg]; delete S.branches[arg];
          return "Deleted branch " + arg + " (was " + was + ").";
        }
        if (!/^[\w][\w\/.-]*$/.test(arg)) return "fatal: '" + arg + "' is not a valid branch name";
        if (arg in S.branches) return "fatal: a branch named '" + arg + "' already exists";
        if (!headId()) return "fatal: not a valid object name: '" + (S.head.branch || "HEAD") + "'";
        S.branches[arg] = headId();
        return "";
      },
      checkout: function (a) {
        var nb = a.indexOf("-b") >= 0, arg = a.filter(function (x) { return x[0] !== "-"; })[0];
        if (!arg) return nb ? "fatal: switch `b' requires a value" : "error: you must specify a branch or commit";
        if (nb) {
          if (arg in S.branches) return "fatal: a branch named '" + arg + "' already exists";
          if (!headId()) return "fatal: not a valid object name: '" + (S.head.branch || "HEAD") + "'";
          S.branches[arg] = headId(); S.head = { branch: arg, id: null };
          return "Switched to a new branch '" + arg + "'";
        }
        if (arg in S.branches) {
          if (S.head.branch === arg) return "Already on '" + arg + "'";
          var e = checkoutTree(S.branches[arg]); if (e) return e;
          S.head = { branch: arg, id: null }; return "Switched to branch '" + arg + "'";
        }
        var c = resolve(arg);
        if (!c) { // dosya geri yükleme: git checkout -- f gibi
          if (arg in S.index) { work[arg] = S.index[arg]; return ""; }
          return "error: pathspec '" + arg + "' did not match any file(s) known to git";
        }
        var e2 = checkoutTree(c); if (e2) return e2;
        S.head = { branch: null, id: c };
        return "Note: switching to '" + arg + "'.\n\nYou are in 'detached HEAD' state.\nHEAD is now at " + c + " " + S.commits[c].msg;
      },
      merge: function (a) {
        var arg = a.filter(function (x) { return x[0] !== "-"; })[0];
        if (!arg) return "fatal: No commit specified and merge.defaultToUpstream not set.";
        var t = resolve(arg), cur = headId();
        if (!t) return "merge: " + arg + " - not something we can merge";
        if (!cur) return "fatal: Cannot merge into a branch with no commits";
        if (ancestors(cur)[t]) return "Already up to date.";
        if (!same(S.index, tree(cur)) || !same(work, S.index)) {
          var wd = dirty(tree(cur), work).filter(function (f) { return dirty(tree(cur), tree(t)).indexOf(f) >= 0; });
          if (wd.length) return "error: Your local changes to the following files would be overwritten by merge:\n\t" + wd.join("\n\t") + "\nPlease commit your changes or stash them before you merge.\nAborting";
        }
        var to = tree(t);
        if (ancestors(t)[cur] && a.indexOf("--no-ff") < 0) { // ileri sarma
          dirty(tree(cur), to).forEach(function (f) { if (f in to) work[f] = to[f]; else delete work[f]; });
          S.index = Object.assign({}, to); advance(t);
          return "Updating " + cur + ".." + t + "\nFast-forward";
        }
        var base = tree(mergeBase(cur, t)), mine = tree(cur), out = {}, bad = [];
        names(Object.assign({}, base, mine, to)).forEach(function (f) {
          var b = base[f], m = mine[f], o = to[f], v;
          if (m === o) v = m; else if (m === b) v = o; else if (o === b) v = m; else { bad.push(f); return; }
          if (v !== undefined) out[f] = v;
        });
        // sadeleştirme: gerçek git çatışma işaretleri bırakır; burada birleştirme iptal edilir, dizin değişmez
        if (bad.length) return bad.map(function (f) { return "CONFLICT (content): Merge conflict in " + f; }).join("\n") + "\nAutomatic merge failed; merge aborted (simulator leaves your files unchanged). Change the file on one branch, commit, and try again.";
        var id = newCommit("Merge branch '" + arg + "'", [cur, t], out);
        advance(id); S.index = Object.assign({}, out); work = Object.assign({}, out);
        return "Merge made by the 'ort' strategy.";
      },
      diff: function (a) {
        var staged = a.indexOf("--staged") >= 0 || a.indexOf("--cached") >= 0;
        var from = staged ? tree(headId()) : S.index, to = staged ? S.index : work, o = [];
        names(Object.assign({}, from, to)).forEach(function (f) {
          if (from[f] === to[f]) return;
          if (!staged && !(f in S.index)) return; // izlenmeyen dosya diff'te görünmez
          o.push("diff --git a/" + f + " b/" + f + (!(f in from) ? "\nnew file" : !(f in to) ? "\ndeleted file" : "") + "\n--- a/" + f + "\n+++ b/" + f);
          o.push(lineDiff(from[f] || "", to[f] || "").join("\n"));
        });
        return o.join("\n");
      }
    };

    function shell(c, a) {
      if (c === "touch") { if (!a[0]) return "touch: missing file operand"; a.forEach(function (f) { if (!(f in work)) work[f] = ""; }); return ""; }
      if (c === "rm") { if (!a[0]) return "rm: missing operand"; for (var i = 0; i < a.length; i++) { if (!(a[i] in work)) return "rm: cannot remove '" + a[i] + "': No such file or directory"; delete work[a[i]]; } return ""; }
      if (c === "ls") return names(work).join("\n");
      if (c === "cat") { if (!a[0]) return "cat: missing file operand"; if (!(a[0] in work)) return "cat: " + a[0] + ": No such file or directory"; return work[a[0]]; }
      return null;
    }
    function echo(line) { // echo metin > dosya | >> dosya
      var m = line.match(/^echo\s+(.*?)\s*(>>?)\s*(\S+)\s*$/);
      if (!m) return "usage: echo text > file   (or >> to append)";
      var txt = tok(m[1]).join(" "), f = m[3];
      work[f] = m[2] === ">>" && f in work && work[f] !== "" ? work[f] + "\n" + txt : txt;
      return "";
    }

    function run(line) {
      line = String(line || "").trim();
      if (!line) return { ok: true, out: "" };
      var a = tok(line), c = a.shift(), out;
      if (c === "echo") { out = echo(line); return { ok: !out, out: out }; }
      if (c !== "git") {
        out = shell(c, a);
        return out === null ? { ok: false, out: c + ": command not found (simulator: git, echo, touch, rm, ls, cat)" } : { ok: !/^(touch|rm|cat): /.test(out), out: out };
      }
      var sub = a.shift();
      if (!sub) return { ok: false, out: "usage: git <command> [<args>]\nSupported: " + Object.keys(G).join(", ") };
      if (!G[sub]) return { ok: false, out: "git: '" + sub + "' is not a git command. See 'git --help'." };
      if (!S && sub !== "init") return { ok: false, out: NOREPO };
      out = G[sub](a);
      return { ok: !/^(fatal|error|CONFLICT|merge: )/.test(out) && out.indexOf("Automatic merge failed") < 0, out: out };
    }

    function graph() { // SVG için düğümler: yatay = commit sırası, şerit = dal
      if (!S) return { nodes: [], head: null };
      var cs = Object.keys(S.commits).map(function (i) { return S.commits[i]; }).sort(function (x, y) { return x.seq - y.seq; }), lane = {}, used = {}, n = 0;
      cs.forEach(function (c) {
        var p = c.parents[0], l = p !== undefined && !used[p] ? lane[p] : n++;
        lane[c.id] = l; if (p !== undefined) used[p] = 1;
      });
      return { nodes: cs.map(function (c, i) { return { id: c.id, msg: c.msg, parents: c.parents, x: i, lane: lane[c.id], refs: label(c.id) }; }), head: headId() };
    }
    function svg() {
      var g = graph(); if (!g.nodes.length) return "";
      var by = {}, W = 70, H = 46, lanes = 0;
      g.nodes.forEach(function (n) { by[n.id] = n; if (n.lane + 1 > lanes) lanes = n.lane + 1; });
      var w = g.nodes.length * W + 40, h = lanes * H + 50, p = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + " " + h + '" width="' + w + '" height="' + h + '" role="img" aria-label="commit grafiği" font-family="sans-serif" font-size="10">'];
      function px(n) { return 30 + n.x * W; } function py(n) { return 20 + n.lane * H; }
      g.nodes.forEach(function (n) { n.parents.forEach(function (q) { var b = by[q]; p.push('<line x1="' + px(b) + '" y1="' + py(b) + '" x2="' + px(n) + '" y2="' + py(n) + '" stroke="#888" stroke-width="2"/>'); }); });
      g.nodes.forEach(function (n) {
        p.push('<circle cx="' + px(n) + '" cy="' + py(n) + '" r="8" fill="' + (n.id === g.head ? "#d97757" : "#fff") + '" stroke="#141413" stroke-width="2"/>');
        p.push('<text x="' + px(n) + '" y="' + (py(n) + 22) + '" text-anchor="middle" fill="#141413">' + esc(n.id.slice(0, 5)) + "</text>");
        if (n.refs) p.push('<text x="' + px(n) + '" y="' + (py(n) - 13) + '" text-anchor="middle" fill="#a0522d">' + esc(n.refs.trim()) + "</text>");
      });
      return p.join("") + "</svg>";
    }

    return { run: run, graph: graph, svg: svg, files: function () { return Object.assign({}, work); }, state: function () { return S; } };
  }

  // Sayfaya bağlama: tek giriş kutusu, çıktı ve ağaç. Dışarıdan veri HTML olarak yorumlanmaz (çıktı textContent, SVG kaçışlı).
  function mount(el) {
    var sim = create(), doc = el.ownerDocument;
    el.innerHTML = '<div class="pp-git"><pre class="pp-git-out" aria-live="polite"></pre><form><input class="pp-git-in" autocomplete="off" spellcheck="false" aria-label="git komutu" placeholder="git init"><button>Çalıştır</button></form><div class="pp-git-svg"></div></div>';
    var out = el.querySelector(".pp-git-out"), inp = el.querySelector(".pp-git-in"), box = el.querySelector(".pp-git-svg");
    el.querySelector("form").onsubmit = function (e) {
      e.preventDefault();
      var r = sim.run(inp.value);
      out.appendChild(doc.createTextNode("$ " + inp.value + "\n" + (r.out ? r.out + "\n" : "")));
      box.innerHTML = sim.svg(); inp.value = "";
    };
    return sim;
  }

  var api = { create: create, mount: mount };
  if (typeof module !== "undefined" && module.exports) module.exports = api; else root.PP_GIT = api;
})(typeof window !== "undefined" ? window : this);

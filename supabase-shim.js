/* Proofpath · Supabase bağdaştırıcısı
 *
 * Uygulama, Claude Artifact ortamındaki `window.claude` katmanına yazılmıştır
 * (db, user, sample, mcp, downloads). Bu dosya, Artifact dışında (normal bir web
 * sitesi olarak) çalışırken aynı arayüzü Supabase üzerinde sağlar:
 *   - e-posta/şifre ile giriş ve kayıt ekranı
 *   - db.collection / db.doc  →  `docs` tablosu (RLS ile kullanıcıya özel)
 *   - user.id / me / profiles →  Supabase Auth + `profiles` tablosu
 *   - downloads.save          →  tarayıcı indirmesi
 *   - sample / mcp            →  bu sürümde kapalı (null döner, arayüz bunu kaldırır)
 *
 * Claude Artifact içinde ya da config.js doldurulmamışsa hiçbir şey yapmaz.
 */
(function () {
  "use strict";

  var CFG = window.PP_CONFIG;
  if (window.claude) return; // Artifact ortamı kendi katmanını getirir
  if (!CFG || !CFG.url || !CFG.anonKey) {
    console.warn("Proofpath: config.js içinde Supabase adresi yok, bağdaştırıcı kapalı.");
    return;
  }
  if (!window.supabase || !window.supabase.createClient) {
    console.error("Proofpath: supabase-js yüklenemedi.");
    return;
  }

  var sb = window.supabase.createClient(CFG.url, CFG.anonKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  });

  var SHARED_READ = { league: 1, cheers: 1, league_notes: 1, jobpool: 1, gazete: 1 };
  var uid = null;
  var myName = "";
  var isRecovery = /type=recovery/.test(location.hash || "");

  /* ---------------------------------------------------------------- yardımcılar */

  function clone(x) {
    return x === undefined ? undefined : JSON.parse(JSON.stringify(x));
  }
  function mkErr(code, msg) {
    var e = new Error(msg || code);
    e.code = code;
    return e;
  }
  function newId() {
    try {
      return crypto.randomUUID().replace(/-/g, "").slice(0, 20);
    } catch (e) {
      return Math.random().toString(36).slice(2) + Date.now().toString(36);
    }
  }
  function parsePath(p) {
    p = String(p).replace(/^\/+|\/+$/g, "");
    var i = p.lastIndexOf("/");
    return { path: p, coll: p.slice(0, i), id: p.slice(i + 1) };
  }

  /* ---------------------------------------------------------------- giriş ekranı */

  var CSS =
    ".ppa-wrap{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;padding:20px;overflow:auto;" +
    "background:var(--bg,#f1ede4);color:var(--ink,#2d2b27);font-family:'Familjen Grotesk',system-ui,sans-serif}" +
    ".ppa-card{width:100%;max-width:400px;background:var(--panel,#f9f6ef);border:1px solid var(--line,#d9d1c0);" +
    "border-radius:16px;padding:26px 22px;display:grid;gap:14px;box-shadow:0 10px 30px rgba(0,0,0,.12)}" +
    ".ppa-card h1{margin:0;font-family:var(--f-disp,Georgia,serif);font-size:28px;line-height:1.1}" +
    ".ppa-card p{margin:0;color:var(--mute,#6a655b);font-size:14px;line-height:1.45}" +
    ".ppa-card label{display:grid;gap:5px;font-size:13px;font-weight:600}" +
    ".ppa-card input{font:inherit;font-size:16px;padding:11px 12px;border-radius:10px;border:1px solid var(--line,#d9d1c0);" +
    "background:var(--bg,#fff);color:var(--ink,#2d2b27)}" +
    ".ppa-card input:focus{outline:2px solid var(--net,#2d7d74);outline-offset:1px}" +
    ".ppa-btn{font:inherit;font-weight:700;font-size:16px;padding:12px 14px;border-radius:10px;border:0;cursor:pointer;" +
    "background:var(--net,#2d7d74);color:var(--on-net,#fff)}" +
    ".ppa-btn[disabled]{opacity:.6;cursor:wait}" +
    ".ppa-link{font:inherit;font-size:13px;background:none;border:0;padding:4px 0;color:var(--net,#2d7d74);" +
    "text-decoration:underline;cursor:pointer;justify-self:start}" +
    ".ppa-msg{font-size:13px;line-height:1.4;padding:9px 11px;border-radius:9px;display:none}" +
    ".ppa-msg.err{display:block;background:var(--rust-soft,#f2d9cb);color:var(--bad,#b04545)}" +
    ".ppa-msg.ok{display:block;background:var(--net-soft,#d6e7e1);color:var(--ink,#2d2b27)}" +
    ".ppa-out{position:fixed;left:10px;bottom:10px;z-index:60;font:inherit;font-size:12px;padding:6px 10px;" +
    "border-radius:999px;border:1px solid var(--line,#d9d1c0);background:var(--panel,#f9f6ef);color:var(--mute,#6a655b);" +
    "cursor:pointer;opacity:.85}.ppa-out:hover{opacity:1}";

  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === "text") n.textContent = attrs[k];
      else if (k.slice(0, 2) === "on") n.addEventListener(k.slice(2), attrs[k]);
      else n.setAttribute(k, attrs[k]);
    });
    (kids || []).forEach(function (c) {
      if (c) n.appendChild(c);
    });
    return n;
  }

  function trErr(e) {
    var m = String((e && e.message) || e || "");
    if (/invalid login credentials/i.test(m)) return "E-posta ya da şifre yanlış.";
    if (/already registered|already been registered/i.test(m)) return "Bu e-posta ile zaten bir hesap var. Giriş yapmayı dene.";
    if (/at least \d+ characters/i.test(m)) return "Şifre en az 8 karakter olmalı.";
    if (/email not confirmed/i.test(m)) return "Önce e-postana gelen onay bağlantısına tıkla.";
    if (/rate limit|too many/i.test(m)) return "Çok fazla deneme yapıldı. Biraz bekleyip tekrar dene.";
    if (/invalid.*email|unable to validate email/i.test(m)) return "E-posta adresi geçersiz görünüyor.";
    if (/network|failed to fetch/i.test(m)) return "Bağlantı kurulamadı. İnterneti kontrol et.";
    return "Bir sorun oldu: " + m;
  }

  function showAuth(mode) {
    return new Promise(function (resolve) {
      if (!document.getElementById("ppa-style")) {
        var st = el("style", { id: "ppa-style" });
        st.textContent = CSS;
        document.head.appendChild(st);
      }
      var wrap = el("div", { class: "ppa-wrap", role: "dialog", "aria-modal": "true" });
      document.body.appendChild(wrap);

      function done(session) {
        wrap.remove();
        resolve(session);
      }

      function render(m) {
        mode = m;
        wrap.textContent = "";
        var msg = el("div", { class: "ppa-msg", role: "status" });
        function say(t, kind) {
          msg.textContent = t || "";
          msg.className = "ppa-msg" + (t ? " " + (kind || "err") : "");
        }
        var name = el("input", { type: "text", autocomplete: "nickname", maxlength: "40", placeholder: "Görünen adın" });
        var email = el("input", { type: "email", autocomplete: "email", required: "required", inputmode: "email" });
        var pass = el("input", {
          type: "password",
          required: "required",
          minlength: "8",
          autocomplete: m === "signup" || m === "recovery" ? "new-password" : "current-password"
        });
        var go = el("button", { class: "ppa-btn", type: "submit" });
        var title, lead;
        if (m === "signup") {
          title = "Hesap oluştur";
          lead = "Kendi hesabınla gir; ilerlemen, notların ve projelerin sadece sana ait olur.";
          go.textContent = "Kayıt ol";
        } else if (m === "recovery") {
          title = "Yeni şifre";
          lead = "Yeni şifreni belirle (en az 8 karakter).";
          go.textContent = "Şifreyi kaydet";
        } else {
          title = PP_MARKA.ad + " girişi";
          lead = "E-posta ve şifrenle gir.";
          go.textContent = "Giriş yap";
        }
        var form = el("form", { class: "ppa-card", novalidate: "novalidate" }, [
          el("h1", { text: title }),
          el("p", { text: lead }),
          m === "signup" ? el("label", { text: "Ad" }, [name]) : null,
          m !== "recovery" ? el("label", { text: "E-posta" }, [email]) : null,
          el("label", { text: m === "recovery" ? "Yeni şifre" : "Şifre" }, [pass]),
          msg,
          go,
          m === "login"
            ? el("button", {
                class: "ppa-link",
                type: "button",
                text: "Şifremi unuttum",
                onclick: function () {
                  var v = email.value.trim();
                  if (!v) return say("Önce e-posta adresini yaz.");
                  sb.auth
                    .resetPasswordForEmail(v, { redirectTo: location.origin + location.pathname })
                    .then(function (r) {
                      if (r.error) say(trErr(r.error));
                      else say("Şifre sıfırlama bağlantısı e-postana gönderildi.", "ok");
                    });
                }
              })
            : null,
          m !== "recovery"
            ? el("button", {
                class: "ppa-link",
                type: "button",
                text: m === "signup" ? "Zaten hesabım var" : "Hesabım yok, kayıt ol",
                onclick: function () {
                  render(m === "signup" ? "login" : "signup");
                }
              })
            : null
        ]);

        form.addEventListener("submit", function (ev) {
          ev.preventDefault();
          say("");
          var ev_ = email.value.trim(),
            pv = pass.value;
          if (m !== "recovery" && !/^\S+@\S+\.\S+$/.test(ev_)) return say("Geçerli bir e-posta yaz.");
          if ((m === "signup" || m === "recovery") && pv.length < 10) return say("Şifre en az 10 karakter olmalı.");
          if ((m === "signup" || m === "recovery") && /^\d+$/.test(pv)) return say("Şifre yalnızca sayılardan oluşmasın.");
          if ((m === "signup" || m === "recovery") && pv.toLowerCase() === ev_.toLowerCase().split("@")[0]) return say("Şifre e-posta adınla aynı olmasın.");
          if (m === "login" && !pv) return say("Şifreni yaz.");
          go.disabled = true;
          var p;
          if (m === "signup") {
            var nm = name.value.trim() || ev_.split("@")[0];
            p = sb.auth
              .signUp({
                email: ev_,
                password: pv,
                options: { data: { name: nm }, emailRedirectTo: location.origin + location.pathname }
              })
              .then(function (r) {
                if (r.error) throw r.error;
                if (r.data && r.data.session) return done(r.data.session);
                say("Hesabın oluşturuldu. E-postana gelen onay bağlantısına tıkla, sonra giriş yap.", "ok");
              });
          } else if (m === "recovery") {
            p = sb.auth.updateUser({ password: pv }).then(function (r) {
              if (r.error) throw r.error;
              return sb.auth.getSession().then(function (s) {
                history.replaceState(null, "", location.pathname + location.search);
                isRecovery = false;
                done(s.data.session);
              });
            });
          } else {
            p = sb.auth.signInWithPassword({ email: ev_, password: pv }).then(function (r) {
              if (r.error) throw r.error;
              done(r.data.session);
            });
          }
          p.catch(function (e) {
            say(trErr(e));
          }).then(function () {
            go.disabled = false;
          });
        });

        wrap.appendChild(form);
        setTimeout(function () {
          (m === "recovery" ? pass : email).focus();
        }, 30);
      }

      render(mode || "login");
    });
  }

  var sessionP = null;
  function ensureSession() {
    if (sessionP) return sessionP;
    sessionP = sb.auth
      .getSession()
      .then(function (r) {
        var s = r.data && r.data.session;
        if (s && isRecovery) return showAuth("recovery");
        if (s) return s;
        return showAuth("login");
      })
      .then(function (s) {
        uid = s.user.id;
        if (window.PP && window.PP.cihaz) {
          var gc = window.PP.cihaz.gec(uid);
          if (gc.degisti) {
            location.reload(); // önceki kullanıcının yerel verisi ayrıldı; temiz alanla yeniden yükle
            return new Promise(function () {});
          }
        }
        var meta = (s.user.user_metadata && s.user.user_metadata.name) || (s.user.email || "").split("@")[0];
        myName = meta;
        addSignOut();
        return sb
          .from("profiles")
          .select("name")
          .eq("id", uid)
          .maybeSingle()
          .then(
            function (p) {
              if (p && p.data && p.data.name) myName = p.data.name;
            },
            function () {}
          )
          .then(function () {
            motorHazirla();
            return s;
          });
      });
    return sessionP;
  }

  function addSignOut() {
    if (document.getElementById("ppa-out")) return;
    var b = el("button", {
      id: "ppa-out",
      class: "ppa-out",
      type: "button",
      text: "Çıkış",
      onclick: function () {
        var bek = window.PP && window.PP.cihaz ? window.PP.cihaz.bekleyenSayisi(uid) : 0;
        var pay = window.PP && window.PP.cihaz && window.PP.cihaz.paylasilan();
        var uy = "Çıkış yapılsın mı?" + (bek ? "\n\nGönderilmemiş " + bek + " değişiklik var." + (pay ? " Paylaşılan cihaz modu açık: çıkınca bu cihazdaki verin silinir." : " Bu cihazda saklı kalır, aynı hesapla girince gönderilir.") : pay ? "\n\nPaylaşılan cihaz modu açık: çıkınca bu cihazdaki verin silinir." : "");
        if (!confirm(uy)) return;
        var cuid = uid;
        sb.auth.signOut().then(function () {
          try { if (window.PP && window.PP.cihaz) window.PP.cihaz.cikis(cuid); } catch (e) {}
          location.reload();
        });
      }
    });
    document.body.appendChild(b);
  }

  sb.auth.onAuthStateChange(function (ev) {
    if (ev === "SIGNED_OUT" && uid) location.reload();
  });

  /* ---------------------------------------------------------------- belge deposu */

  var colls = {}; // koleksiyon yolu -> {map, loaded, loading, subs, dsubs, pending}
  var vers = {}; // koleksiyon -> {doc_id: updated_at} (çakışma denetimi için taban sürümü)

  function getC(coll) {
    return (
      colls[coll] ||
      (colls[coll] = { map: {}, loaded: false, loading: null, subs: [], dsubs: [], pending: 0 })
    );
  }

  function fetchColl(coll) {
    var out = [];
    function page(from) {
      return sb
        .from("docs")
        .select("doc_id,data,updated_at")
        .eq("coll", coll)
        .order("doc_id")
        .range(from, from + 999)
        .then(function (r) {
          if (r.error) throw r.error;
          out = out.concat(r.data || []);
          if ((r.data || []).length === 1000 && out.length < 10000) return page(from + 1000);
          var m = {};
          vers[coll] = {};
          out.forEach(function (row) {
            m[row.doc_id] = row.data || {};
            if (row.updated_at) vers[coll][row.doc_id] = row.updated_at;
          });
          return m;
        });
    }
    return page(0);
  }

  function ensureLoaded(coll) {
    var C = getC(coll);
    if (C.loaded) return Promise.resolve(C);
    if (!C.loading) {
      C.loading = fetchColl(coll).then(
        function (m) {
          if (!C.loaded) C.map = m;
          C.loaded = true;
          snapKaydet(coll, m);
          return C;
        },
        function (e) {
          var sn = snapOku(coll);
          if (sn) {
            // çevrimdışı: son bilinen sunucu görüntüsü; yazmalar kuyruğa girer, taban sürümüyle çakışma denetlenir
            if (!C.loaded) C.map = sn.map;
            vers[coll] = sn.ver || {};
            C.loaded = true;
            C.offline = true;
            return C;
          }
          C.loading = null;
          throw e;
        }
      );
    }
    return C.loading;
  }

  function snapshotFor(C, q) {
    var ids = Object.keys(C.map);
    if (q && q.o) {
      var f = q.o.f,
        sign = q.o.dir === "desc" ? -1 : 1;
      ids.sort(function (a, b) {
        var x = C.map[a] && C.map[a][f],
          y = C.map[b] && C.map[b][f];
        if (x === undefined && y === undefined) return 0;
        if (x === undefined) return 1;
        if (y === undefined) return -1;
        return (x < y ? -1 : x > y ? 1 : 0) * sign;
      });
    } else {
      ids.sort();
    }
    if (q && q.l) ids = ids.slice(0, q.l);
    return {
      docs: ids.map(function (id) {
        var d = C.map[id];
        return {
          id: id,
          exists: true,
          data: function () {
            return clone(d);
          }
        };
      }),
      size: ids.length,
      empty: !ids.length
    };
  }

  function emitSub(C, sub) {
    try {
      sub.cb(snapshotFor(C, sub.q));
    } catch (e) {
      console.error(e);
    }
  }
  function emitDoc(C, sub) {
    var d = C.map[sub.id];
    try {
      sub.cb({
        id: sub.id,
        exists: d !== undefined,
        data: function () {
          return clone(d);
        }
      });
    } catch (e) {
      console.error(e);
    }
  }
  function notify(C) {
    C.subs.slice().forEach(function (s) {
      emitSub(C, s);
    });
    C.dsubs.slice().forEach(function (s) {
      emitDoc(C, s);
    });
  }

  /* ---------------------------------------------------------------- senkron (bayrak: pp_senkron=1, varsayılan KAPALI) */

  function syncOn() {
    try { return !!(window.PP && window.PP.sync && window.PP.sync.acik() && motor); } catch (e) { return false; }
  }
  function syncMesgul(coll) {
    if (!syncOn()) return false;
    return motor.liste().some(function (x) { return x.coll === coll; });
  }
  function snapAnahtar(coll) { return "pp_onbellek:" + uid + ":" + coll; }
  function snapKaydet(coll, m) {
    try {
      if (!(window.PP && window.PP.sync && window.PP.sync.acik()) || !uid) return;
      var t = JSON.stringify({ map: m, ver: vers[coll] || {}, ts: new Date().toISOString() });
      if (t.length < 1500000) localStorage.setItem(snapAnahtar(coll), t);
    } catch (e) { /* kota dolu: çevrimdışı görüntü olmaz, veri kaybı değil */ }
  }
  function snapOku(coll) {
    try {
      if (!(window.PP && window.PP.sync && window.PP.sync.acik()) || !uid) return null;
      var t = localStorage.getItem(snapAnahtar(coll));
      return t ? JSON.parse(t) : null;
    } catch (e) { return null; }
  }
  function agHatasiMi(err) {
    var m = String((err && err.message) || err || "");
    return /fetch|network|failed|load failed|ağ/i.test(m) || (typeof navigator !== "undefined" && navigator.onLine === false);
  }
  function sunucuSatiri(path) {
    return Promise.resolve(sb.from("docs").select("data,updated_at").eq("path", path).maybeSingle()).then(function (r) {
      if (r.error) throw r.error;
      return r.data ? { data: r.data.data || {}, updated_at: r.data.updated_at } : null;
    });
  }
  /* Arka uç adaptörü: taban sürümü (updated_at) eşleşmezse YAZMAZ, çakışma döner */
  var arka = {
    yaz: function (k) {
      var now = new Date().toISOString();
      var req = k.taban == null
        ? sb.from("docs").insert({ path: k.path, coll: k.coll, doc_id: k.id, owner: uid, data: k.data, updated_at: now }).select("updated_at")
        : sb.from("docs").update({ data: k.data, updated_at: now }).eq("path", k.path).eq("updated_at", k.taban).select("updated_at");
      return Promise.resolve(req).then(function (r) {
        if (r.error) {
          if (k.taban == null && r.error.code === "23505") return sunucuSatiri(k.path).then(function (sv) { return { cakisma: true, sunucu: sv }; });
          if (agHatasiMi(r.error)) { var e = new Error(r.error.message); e.ag = true; throw e; }
          return { red: true, mesaj: r.error.message };
        }
        if (!r.data || !r.data.length) return sunucuSatiri(k.path).then(function (sv) { return { cakisma: true, sunucu: sv }; });
        (vers[k.coll] = vers[k.coll] || {})[k.id] = now;
        return { ok: true, updated_at: now };
      }, function (e) { if (agHatasiMi(e)) e.ag = true; throw e; });
    },
    sil: function (k) {
      var q = sb.from("docs").delete().eq("path", k.path);
      if (k.taban != null) q = q.eq("updated_at", k.taban);
      return Promise.resolve(q.select("path")).then(function (r) {
        if (r.error) {
          if (agHatasiMi(r.error)) { var e = new Error(r.error.message); e.ag = true; throw e; }
          return { red: true, mesaj: r.error.message };
        }
        if (k.taban != null && (!r.data || !r.data.length)) return sunucuSatiri(k.path).then(function (sv) { return sv ? { cakisma: true, sunucu: sv } : { ok: true }; });
        return { ok: true };
      }, function (e) { if (agHatasiMi(e)) e.ag = true; throw e; });
    }
  };
  var motor = null;
  function motorHazirla() {
    try {
      if (motor || !uid || !(window.PP && window.PP.sync && window.PP.sync.acik())) return;
      motor = window.PP.sync.Motor({ uid: uid, arka: arka, cevrimici: navigator.onLine !== false });
      var tekrar = function () { if (motor) { motor.cevrimiciYap(navigator.onLine !== false); motor.isle().then(function () { refreshAll(); }); } };
      window.addEventListener("online", tekrar);
      window.addEventListener("offline", function () { if (motor) motor.cevrimiciYap(false); });
      setInterval(function () { if (motor && motor.durum().bekleyen) tekrar(); }, 30000);
      motor.isle(); // önceki oturumdan kalan kuyruğu gönder
      window.dispatchEvent(new Event("pp-sync-hazir"));
    } catch (e) { motor = null; }
  }
  /* Bir yazmayı kuyruğa alır ve göndermeyi dener. Ağ yoksa kuyrukta kalır (yerel değişiklik korunur);
     sunucu reddederse çağırana hata döner (yerel değişiklik geri alınır); çakışmada iki sürüm de saklanır (sessiz üzerine yazma yok). */
  function syncYaz(pp, kind, next, C) {
    var taban = (vers[pp.coll] || {})[pp.id] || null;
    motor.ekle({ path: pp.path, coll: pp.coll, id: pp.id, tur: kind, data: kind === "delete" ? null : next, taban: taban });
    return motor.isle().then(function () {
      snapKaydet(pp.coll, C.map); // çevrimdışı görüntü yerel/gönderilmiş son durumu içersin
      var e = motor.liste().filter(function (x) { return x.path === pp.path; })[0];
      if (e && e.durum === "hata") {
        motor.hataIsle(e.n, "at");
        throw mkErr("sync-hata", e.mesaj);
      }
    });
  }
  /* Çakışma çözümünde sunucu sürümünü yerel belleğe uygula */
  function sunucuyuUygula(path, sv) {
    var pp = parsePath(path), C = getC(pp.coll);
    if (sv) { C.map[pp.id] = sv.data || {}; (vers[pp.coll] = vers[pp.coll] || {})[pp.id] = sv.updated_at; } else delete C.map[pp.id];
    notify(C);
  }
  window.__ppShim = { motor: function () { return motor; }, sunucuyuUygula: sunucuyuUygula, onbellekTemizle: function () { try { Object.keys(localStorage).filter(function (k) { return k.indexOf("pp_onbellek:") === 0; }).forEach(function (k) { localStorage.removeItem(k); }); } catch (e) {} } };

  var queues = {}; // path -> yazma sırası
  function write(pp, kind, d) {
    return ensureLoaded(pp.coll).then(function (C) {
      var cur = C.map[pp.id],
        next = null;
      if (kind === "set") {
        next = clone(d) || {};
      } else if (kind === "update") {
        if (cur === undefined) throw mkErr("not-found", "Belge yok: " + pp.path);
        next = Object.assign({}, cur, clone(d) || {});
      }
      if (kind === "delete") delete C.map[pp.id];
      else C.map[pp.id] = next;
      notify(C);

      var run = function () {
        if (syncOn()) return syncYaz(pp, kind, next, C);
        C.pending++;
        var req =
          kind === "delete"
            ? sb.from("docs").delete().eq("path", pp.path)
            : sb.from("docs").upsert(
                {
                  path: pp.path,
                  coll: pp.coll,
                  doc_id: pp.id,
                  owner: uid,
                  data: next,
                  updated_at: new Date().toISOString()
                },
                { onConflict: "path" }
              );
        return Promise.resolve(req).then(
          function (r) {
            C.pending--;
            if (r.error) throw r.error;
          },
          function (e) {
            C.pending--;
            throw e;
          }
        );
      };
      var prevQ = queues[pp.path] || Promise.resolve();
      var p = prevQ.then(run, run);
      queues[pp.path] = p.catch(function () {});
      return p.catch(function (e) {
        // sunucu reddetti: yerel durumu geri al
        if (cur === undefined) delete C.map[pp.id];
        else C.map[pp.id] = cur;
        notify(C);
        throw e;
      });
    });
  }

  function Query(coll, o, l) {
    this.c = coll;
    this.o = o || null;
    this.l = l || 0;
  }
  Query.prototype.orderBy = function (f, dir) {
    return new Query(this.c, { f: f, dir: dir || "asc" }, this.l);
  };
  Query.prototype.limit = function (n) {
    return new Query(this.c, this.o, n);
  };
  Query.prototype.add = function (d) {
    var id = newId();
    return write({ path: this.c + "/" + id, coll: this.c, id: id }, "set", d).then(function () {
      return { id: id };
    });
  };
  Query.prototype.onSnapshot = function (cb, errCb) {
    var C = getC(this.c),
      sub = { q: this, cb: cb },
      self = this;
    C.subs.push(sub);
    ensureLoaded(self.c).then(
      function () {
        if (C.subs.indexOf(sub) >= 0) emitSub(C, sub);
      },
      function (e) {
        if (errCb) errCb(e);
      }
    );
    return function () {
      var i = C.subs.indexOf(sub);
      if (i >= 0) C.subs.splice(i, 1);
    };
  };

  function docRef(p) {
    var pp = parsePath(p);
    return {
      id: pp.id,
      set: function (d) {
        return write(pp, "set", d);
      },
      update: function (d) {
        return write(pp, "update", d);
      },
      delete: function () {
        return write(pp, "delete");
      },
      get: function () {
        return ensureLoaded(pp.coll).then(function (C) {
          var d = C.map[pp.id];
          return {
            id: pp.id,
            exists: d !== undefined,
            data: function () {
              return clone(d);
            }
          };
        });
      },
      onSnapshot: function (cb, errCb) {
        var C = getC(pp.coll),
          sub = { id: pp.id, cb: cb };
        C.dsubs.push(sub);
        ensureLoaded(pp.coll).then(
          function () {
            if (C.dsubs.indexOf(sub) >= 0) emitDoc(C, sub);
          },
          function (e) {
            if (errCb) errCb(e);
          }
        );
        return function () {
          var i = C.dsubs.indexOf(sub);
          if (i >= 0) C.dsubs.splice(i, 1);
        };
      }
    };
  }

  var dbApi = {
    collection: function (name) {
      return new Query(String(name).replace(/^\/+|\/+$/g, ""));
    },
    doc: docRef
  };

  /* Sunucudaki değişiklikleri (lig, destekler vb.) yenile. */
  function refreshAll() {
    if (document.hidden || !uid) return;
    Object.keys(colls).forEach(function (k) {
      var C = colls[k];
      if (!C.loaded || C.pending > 0 || (!C.subs.length && !C.dsubs.length) || syncMesgul(k)) return;
      fetchColl(k).then(
        function (m) {
          if (C.pending > 0) return;
          if (JSON.stringify(m) === JSON.stringify(C.map)) return;
          C.map = m;
          snapKaydet(k, m);
          notify(C);
        },
        function () {}
      );
    });
  }
  setInterval(refreshAll, 45000);
  document.addEventListener("visibilitychange", refreshAll);
  window.addEventListener("online", refreshAll);

  /* ---------------------------------------------------------------- user, downloads */

  var userApi = {
    isOwner: function () {
      return false; // herkes kendi alanında "katılımcı" gibi çalışır (data/users/<uid>/pp/ öneki)
    },
    canEdit: function () {
      return true;
    },
    can: function () {
      return Promise.resolve(true);
    },
    id: function () {
      return Promise.resolve(uid);
    },
    me: function () {
      return Promise.resolve({ name: myName });
    },
    profiles: function (ids) {
      ids = (ids || []).filter(Boolean);
      if (!ids.length) return Promise.resolve({});
      return sb
        .from("profiles")
        .select("id,name")
        .in("id", ids)
        .then(function (r) {
          var o = {};
          ((r && r.data) || []).forEach(function (p) {
            o[p.id] = { name: p.name };
          });
          return o;
        });
    }
  };

  var downloadsApi = {
    save: function (o) {
      return new Promise(function (resolve, reject) {
        try {
          var d = o.data;
          var blob = d instanceof Blob ? d : new Blob([d], { type: "text/plain;charset=utf-8" });
          var a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = o.filename || "dosya";
          document.body.appendChild(a);
          a.click();
          setTimeout(function () {
            URL.revokeObjectURL(a.href);
            a.remove();
          }, 1500);
          resolve({});
        } catch (e) {
          reject(e);
        }
      });
    }
  };

  /* Geri bildirim: yalnız insert (RLS: owner = auth.uid(), günlük sınır tetikleyicide). Okuma/güncelleme/silme yok. */
  var geriBildirimApi = {
    gonder: function (satir) {
      return sb.from("geri_bildirim").insert({ tur: satir.tur, baslik: satir.baslik, aciklama: satir.aciklama, baglam: satir.baglam });
    }
  };

  /* Güvenilir sınav yolu: puanı ve kapı kararını sunucu verir (cevap anahtarı istemciye inmez). Yalnız bu dört işlev (lig puanı: ligGonder); tablolara yazma yok.
     Sonuçlar supabase-js biçimindedir: {data, error}. */
  var ogrApi = {
    gonder: function (hedef, varyant, cevaplar, yardim) {
      return sb.rpc("ogr_deneme_gonder", { p_hedef: hedef, p_varyant: varyant, p_cevaplar: cevaplar, p_yardim: yardim || {} });
    },
    ligGonder: function (gun, sira, secenek, sorular, tekrar, seviye) {
      return sb.rpc("ogr_lig_gonder", { p_gun: gun, p_sira: sira, p_secenek: secenek, p_sorular: sorular, p_tekrar: tekrar || [], p_seviye: seviye || 0 });
    },
    kapi: function (kapi) {
      return sb.rpc("ogr_kapi_degerlendir", { p_kapi: kapi });
    },
    /* Bolum sonu bilgi testi (Faz 21): puansiz anlik geri bildirim; deneme/ustalik kaydi yok */
    bilgi: function (hedef, soruId, cevap) {
      return sb.rpc("ogr_bilgi_kontrol", { p_hedef: hedef, p_soru_id: soruId, p_cevap: cevap });
    },
    denemelerim: function (limit) {
      return sb.from("ogr_deneme").select("hedef,varyant,puan,maks,surum,olusturma").order("olusturma", { ascending: false }).limit(limit || 200);
    }
  };

  /* ---------------------------------------------------------------- window.claude */

  window.claude = {
    use: function (name) {
      switch (name) {
        case "ogr":
          return ensureSession().then(function () {
            return ogrApi;
          });
        case "db":
          return ensureSession().then(function () {
            return dbApi;
          });
        case "user":
          return ensureSession().then(function () {
            return userApi;
          });
        case "geri_bildirim":
          return ensureSession().then(function () {
            return geriBildirimApi;
          });
        case "downloads":
          return Promise.resolve(downloadsApi);
        default:
          return Promise.resolve(null); // sample, mcp: bu sürümde yok
      }
    }
  };
  window.__ppShared = SHARED_READ;
})();

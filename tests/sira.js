// Kullanım: node tests/sira.js
// Statik yükleme sırası denetimi (acorn). index.html'deki yerel <script src> dosyaları sırayla ayrıştırılır;
// YÜKLEME ANINDA çalışan kod (üst düzey ifadeler, var ilklendirmeleri, hemen çağrılan işlevler, eşzamanlı
// dizi geri çağrıları) SONRAKİ bir betikte (ya da aynı betikte, kendi var'ından önce) bildirilen bir ada
// başvuruyorsa KALDI (çıkış 1). İşlev gövdeleri çalıştırılmış sayılmaz (sonradan çağrılırlar).
const fs = require('fs');
const path = require('path');
const acorn = require('acorn');

const SYNC = new Set(['forEach', 'map', 'filter', 'reduce', 'some', 'every', 'find', 'findIndex', 'sort', 'flatMap', 'reduceRight']);
const FN = new Set(['FunctionDeclaration', 'FunctionExpression', 'ArrowFunctionExpression']);

function topDecls(ast) {
  const fns = new Set(), vars = new Set();
  const pat = (p, set) => {
    if (!p) return;
    if (p.type === 'Identifier') set.add(p.name);
    else if (p.type === 'ObjectPattern') p.properties.forEach(q => pat(q.value || q.argument, set));
    else if (p.type === 'ArrayPattern') p.elements.forEach(q => pat(q, set));
    else if (p.type === 'RestElement') pat(p.argument, set);
    else if (p.type === 'AssignmentPattern') pat(p.left, set);
  };
  (function walk(n, top) {
    if (!n || typeof n.type !== 'string') return;
    if (n.type === 'FunctionDeclaration' && top) { fns.add(n.id.name); return; }
    if (FN.has(n.type)) return;
    if (n.type === 'VariableDeclaration') n.declarations.forEach(d => pat(d.id, vars));
    if (n.type === 'ClassDeclaration' && top && n.id) vars.add(n.id.name);
    for (const k in n) {
      const v = n[k];
      if (Array.isArray(v)) v.forEach(c => walk(c, top && ['Program', 'BlockStatement'].includes(n.type) && n.type === 'Program'));
      else if (v && typeof v.type === 'string') walk(v, false);
    }
  })(ast, true);
  return { fns, vars };
}

// Çalıştırılan koddaki serbest (yerel olmayan) başvuruları toplar: [{name, start}]
function liveRefs(ast) {
  const out = [];
  function patNames(p, set) {
    if (!p) return;
    if (p.type === 'Identifier') set.add(p.name);
    else if (p.type === 'ObjectPattern') p.properties.forEach(q => patNames(q.value || q.argument, set));
    else if (p.type === 'ArrayPattern') p.elements.forEach(q => patNames(q, set));
    else if (p.type === 'RestElement') patNames(p.argument, set);
    else if (p.type === 'AssignmentPattern') patNames(p.left, set);
  }
  function hoist(n, set, isRoot) {
    if (!n || typeof n.type !== 'string') return;
    if (n.type === 'FunctionDeclaration' && !isRoot) { set.add(n.id.name); return; }
    if (FN.has(n.type) && !isRoot) return;
    if (n.type === 'VariableDeclaration') n.declarations.forEach(d => patNames(d.id, set));
    if (n.type === 'CatchClause') patNames(n.param, set);
    for (const k in n) {
      const v = n[k];
      if (Array.isArray(v)) v.forEach(c => hoist(c, set, false));
      else if (v && typeof v.type === 'string') hoist(v, set, false);
    }
  }
  function enter(fn, scopes) {
    const s = new Set();
    fn.params.forEach(p => patNames(p, s));
    if (fn.type === 'FunctionExpression' && fn.id) s.add(fn.id.name);
    s.add('arguments');
    hoist(fn.body, s, true);
    return scopes.concat([s]);
  }
  function run(fn, scopes) { // işlev gövdesini çalıştırılmış say
    const sc = enter(fn, scopes);
    if (fn.body.type === 'BlockStatement') fn.body.body.forEach(x => ev(x, sc));
    else ev(fn.body, sc);
  }
  function ev(n, scopes) {
    if (!n || typeof n.type !== 'string') return;
    switch (n.type) {
      case 'Identifier':
        if (!scopes.some(s => s.has(n.name))) out.push({ name: n.name, start: n.start });
        return;
      case 'FunctionDeclaration': return; // çağrılana dek çalışmaz
      case 'FunctionExpression': case 'ArrowFunctionExpression': return;
      case 'MemberExpression':
        ev(n.object, scopes); if (n.computed) ev(n.property, scopes); return;
      case 'Property': case 'PropertyDefinition': case 'MethodDefinition':
        if (n.computed) ev(n.key, scopes); ev(n.value, scopes); return;
      case 'LabeledStatement': ev(n.body, scopes); return;
      case 'BreakStatement': case 'ContinueStatement': return;
      case 'ClassDeclaration': case 'ClassExpression': ev(n.superClass, scopes); return;
      case 'CallExpression': case 'NewExpression': {
        let c = n.callee;
        if (FN.has(c.type) && n.type === 'CallExpression') run(c, scopes); // IIFE
        else if (c.type === 'MemberExpression' && ['call', 'apply'].includes(c.property.name) && FN.has(c.object.type)) run(c.object, scopes);
        else ev(c, scopes);
        const sync = c.type === 'MemberExpression' && !c.computed && SYNC.has(c.property.name);
        n.arguments.forEach(a => (sync && FN.has(a.type)) ? run(a, scopes) : ev(a, scopes));
        return;
      }
      case 'VariableDeclarator': ev(n.init, scopes); return; // bildirilen ad başvuru değil
      case 'CatchClause': ev(n.body, scopes); return;
    }
    for (const k in n) {
      if (k === 'type' || k === 'start' || k === 'end') continue;
      const v = n[k];
      if (Array.isArray(v)) v.forEach(c => ev(c, scopes));
      else if (v && typeof v.type === 'string') ev(v, scopes);
    }
  }
  const root = new Set();
  // Üst düzey kapsam: yerel sayılmaz (küresel). Yalnız catch/blok içi let/const için hoist kullanılmaz.
  ast.body.forEach(x => ev(x, [root]));
  return out;
}

const BUILTIN = new Set(Object.getOwnPropertyNames(globalThis).concat([
  'window', 'document', 'navigator', 'localStorage', 'sessionStorage', 'location', 'history', 'screen', 'performance',
  'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval', 'requestAnimationFrame', 'cancelAnimationFrame',
  'fetch', 'Audio', 'Image', 'Event', 'CustomEvent', 'MutationObserver', 'IntersectionObserver', 'ResizeObserver',
  'URL', 'URLSearchParams', 'Blob', 'FileReader', 'XMLHttpRequest', 'HTMLElement', 'Node', 'getComputedStyle',
  'matchMedia', 'alert', 'confirm', 'prompt', 'crypto', 'indexedDB', 'caches', 'atob', 'btoa', 'self', 'top', 'parent',
  'addEventListener', 'removeEventListener', 'dispatchEvent', 'open', 'close', 'print', 'scrollTo', 'innerWidth', 'innerHeight',
  'supabase', 'undefined', 'NaN', 'Infinity', 'queueMicrotask', 'structuredClone', 'Notification', 'speechSynthesis',
  'SpeechSynthesisUtterance', 'AudioContext', 'webkitAudioContext', 'FormData', 'Headers', 'Request', 'Response',
  'AbortController', 'TextEncoder', 'TextDecoder', 'ServiceWorker', 'DOMParser', 'XMLSerializer', 'btoa',
]));

// scripts: [{ad, kaynak}] yükleme sırasıyla. Dönüş: sorun listesi.
function denetle(scripts) {
  const asts = scripts.map(s => acorn.parse(s.kaynak, { ecmaVersion: 'latest', sourceType: 'script', locations: true }));
  const decl = asts.map(topDecls);
  const first = new Map(); // ad -> ilk bildirildiği betik dizini
  decl.forEach((d, i) => [...d.fns, ...d.vars].forEach(n => { if (!first.has(n)) first.set(n, i); }));
  const sorun = [];
  asts.forEach((ast, i) => {
    const hereVarPos = new Map(); // ad -> var ilklendirmesinin başladığı konum (aynı betik)
    ast.body.forEach(st => {
      if (st.type === 'VariableDeclaration') st.declarations.forEach(d => {
        if (d.id.type === 'Identifier' && d.init) hereVarPos.set(d.id.name, st.start);
      });
    });
    for (const r of liveRefs(ast)) {
      if (BUILTIN.has(r.name)) continue;
      const f = first.get(r.name);
      if (f === undefined) continue; // bu dosyalarda bildirilmemiş (tarayıcı/harici küresel)
      const loc = acorn.getLineInfo(scripts[i].kaynak, r.start);
      if (f > i) sorun.push({ dosya: scripts[i].ad, satir: loc.line, ad: r.name, neden: `ileri başvuru (bildirim: ${scripts[f].ad})` });
      else if (f === i && !decl[i].fns.has(r.name) && hereVarPos.has(r.name) && r.start < hereVarPos.get(r.name))
        sorun.push({ dosya: scripts[i].ad, satir: loc.line, ad: r.name, neden: 'aynı betikte var ilklendirmesinden önce' });
    }
  });
  return sorun;
}

function indexScriptleri(kok) {
  const html = fs.readFileSync(path.join(kok, 'index.html'), 'utf8');
  const list = [];
  const re = /<script\b[^>]*\bsrc="([^"]+)"[^>]*>/g;
  let m;
  while ((m = re.exec(html))) {
    if (/^https?:/.test(m[1])) continue;
    list.push({ ad: m[1], kaynak: fs.readFileSync(path.join(kok, m[1]), 'utf8') });
  }
  return list;
}

module.exports = { denetle, indexScriptleri };

if (require.main === module) {
  let kotu = 0;
  const bil = (ok, ad) => { if (!ok) { kotu++; console.log('KALDI  öz-sınama: ' + ad); } else console.log('GEÇTİ  öz-sınama: ' + ad); };
  // Öz-sınama: denetçinin kendisi doğru çalışıyor mu?
  const a = (ad, kaynak) => ({ ad, kaynak });
  bil(denetle([a('a.js', 'var X = 1;'), a('b.js', 'var Y = X + 1;')]).length === 0, 'önce bildirilen ad serbest');
  bil(denetle([a('a.js', 'var Y = X + 1;'), a('b.js', 'var X = 1;')]).length === 1, 'sonra bildirilen ada yükleme anı başvurusu yakalanır');
  bil(denetle([a('a.js', 'function f(){ return X; }'), a('b.js', 'var X = 1;')]).length === 0, 'işlev gövdesi çalıştırılmış sayılmaz');
  bil(denetle([a('a.js', '(function(){ return X; })();'), a('b.js', 'var X = 1;')]).length === 1, 'hemen çağrılan işlev gövdesi sayılır');
  bil(denetle([a('a.js', '[1].forEach(function(i){ return X; });'), a('b.js', 'function X(){}')]).length === 1, 'eşzamanlı geri çağrı sayılır');
  bil(denetle([a('a.js', 'var f = function(){ return X; };'), a('b.js', 'var X = 1;')]).length === 0, 'saklanan işlev sayılmaz');
  bil(denetle([a('a.js', '(function(X){ return X; })(1);'), a('b.js', 'var X = 1;')]).length === 0, 'parametre yerel sayılır');
  bil(denetle([a('a.js', 'var A = B; var B = 2;')]).length === 1, 'aynı betikte var ilklendirmesinden önce yakalanır');
  bil(denetle([a('a.js', 'var A = B(); function B(){ return 1; }')]).length === 0, 'aynı betikte işlev bildirimi kaldırılır (hoist)');
  bil(denetle([a('a.js', 'var o = { X: 1 }; o.X; o.Y = 2;'), a('b.js', 'var X, Y;')]).length === 0, 'özellik adı başvuru değil');
  // Gerçek uygulama
  const kok = path.join(__dirname, '..');
  const scripts = indexScriptleri(kok);
  const sorun = denetle(scripts);
  console.log(`${scripts.length} yerel betik denetlendi, yükleme anı sorunu: ${sorun.length}`);
  sorun.forEach(s => console.log(`KALDI  ${s.dosya}:${s.satir} ${s.ad} — ${s.neden}`));
  if (sorun.length || kotu) process.exit(1);
  console.log('Yükleme sırası temiz.');
}

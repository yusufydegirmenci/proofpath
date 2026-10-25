// Faz K13: Git simülatörü (js/atolye/git-sim.js). Komutlar, hata iletileri, birleştirme, ağaç çizimi; beklenenler elle yazıldı.
const path = require('path');
const { create } = require(path.join(__dirname, '..', 'js', 'atolye', 'git-sim.js'));
let n = 0, fails = 0;
const ok = (c, m) => { n++; console.log((c ? 'OK    ' : 'HATA  ') + m); if (!c) fails++; };
const mk = () => { const s = create(); return { s, r: l => s.run(l), o: l => s.run(l).out }; };

{ // repo yokken
  const { r } = mk();
  ok(!r('git status').ok && /not a git repository/.test(r('git status').out), 'init öncesi git status: fatal not a git repository');
  ok(/is not a git command/.test(r('git foo').out) && !r('git foo').ok, 'bilinmeyen alt komut: "is not a git command"');
  ok(/command not found/.test(r('npm x').out), 'git dışı bilinmeyen komut anlaşılır hata verir');
}
{ // temel akış
  const { s, r, o } = mk();
  ok(/Initialized empty/.test(o('git init')) && /Reinitialized/.test(o('git init')), 'init, ikinci kez Reinitialized');
  r('echo merhaba > a.txt');
  ok(/Untracked files:\n\ta\.txt/.test(o('git status')), 'status: izlenmeyen dosya');
  ok(/pathspec 'yok\.txt' did not match/.test(o('git add yok.txt')), 'add olmayan dosya: pathspec hatası');
  r('git add a.txt');
  ok(/new file:   a\.txt/.test(o('git status')), 'status: new file (aşamalı)');
  ok(/does not have any commits/.test(o('git log')), 'ilk commit öncesi log: hata');
  ok(/not a valid object name: 'main'/.test(o('git branch x')), 'ilk commit öncesi branch: hata');
  ok(/^\[main \(root-commit\) [0-9a-f]{7}\] ilk\n 1 file changed/.test(o('git commit -m "ilk"')), 'commit -m: root-commit çıktısı');
  ok(/working tree clean/.test(o('git commit -m x')) && /working tree clean/.test(o('git status')), 'değişiklik yokken commit/status: clean');
  ok(/requires a value/.test(o('git commit -m')), 'commit -m değersiz: hata');
  r('echo ikinci >> a.txt');
  ok(/modified:   a\.txt/.test(o('git status')) && /not staged/.test(o('git status')), 'status: staged olmayan değişiklik');
  ok(/^diff --git a\/a\.txt b\/a\.txt[\s\S]*\n merhaba\n\+ikinci$/.test(o('git diff')), 'diff: eklenen satır +ikinci, bağlam satırı');
  r('git add .'); ok(o('git diff') === '' && /\+ikinci/.test(o('git diff --staged')), 'add sonrası diff boş, --staged dolu');
  r('git commit -m "iki"');
  const l = o('git log --oneline').split('\n');
  ok(l.length === 2 && /^[0-9a-f]{7} \(HEAD -> main\) iki$/.test(l[0]) && /ilk$/.test(l[1]), 'log --oneline: yeni → eski, HEAD -> main');
  ok(/^commit [0-9a-f]{7} \(HEAD -> main\)\n\n    iki/.test(o('git log')), 'log: tam biçim');
  ok(/<svg/.test(s.svg()) && (s.svg().match(/<circle/g) || []).length === 2, 'svg: 2 commit = 2 daire');
}
{ // dal, checkout, ileri sarma
  const { s, r, o } = mk();
  r('git init'); r('echo 1 > f'); r('git add f'); r('git commit -m c1');
  ok(o('git branch') === '* main', 'branch listesi');
  ok(/Switched to a new branch 'oz'/.test(o('git checkout -b oz')), 'checkout -b');
  ok(/already exists/.test(o('git checkout -b oz')) && /already exists/.test(o('git branch oz')), 'var olan dal: hata');
  r('echo 2 > g'); r('git add g'); r('git commit -m c2');
  ok(o('git branch') === '  main\n* oz', 'branch: * mevcut dal');
  ok(/Switched to branch 'main'/.test(o('git checkout main')) && !('g' in s.files()), 'checkout main: g dosyası kayboldu');
  ok(/Already on 'main'/.test(o('git checkout main')), 'Already on');
  ok(/pathspec 'nope' did not match/.test(o('git checkout nope')), 'olmayan dal: pathspec hatası');
  ok(/Fast-forward/.test(o('git merge oz')) && 'g' in s.files(), 'merge: Fast-forward, dosya geldi');
  ok(/Already up to date/.test(o('git merge oz')), 'merge: Already up to date');
  ok(/not something we can merge/.test(o('git merge yok')), 'merge olmayan dal: hata');
  ok(/Deleted branch oz/.test(o('git branch -d oz')) && /not found/.test(o('git branch -d oz')), 'branch -d, sonra bulunamadı');
  ok(/cannot delete branch 'main'/.test(o('git branch -d main')), 'geçerli dalı silme: hata');
}
{ // gerçek birleştirme, çatışma, kirli ağaçta checkout
  const { s, r, o } = mk();
  r('git init'); r('echo a > a'); r('echo b > b'); r('git add .'); r('git commit -m taban');
  r('git checkout -b x'); r('echo a2 > a'); r('git add a'); r('git commit -m "x: a"');
  r('git checkout main'); r('echo b2 > b'); r('git add b'); r('git commit -m "main: b"');
  ok(/Merge made/.test(o('git merge x')), 'ayrışmış dallar: üç yollu birleştirme');
  ok(s.files().a === 'a2' && s.files().b === 'b2', 'birleştirme: iki taraf da uygulandı');
  ok(/^[0-9a-f]{7} \(HEAD -> main\) Merge branch 'x'/.test(o('git log --oneline')) && /\nMerge: [0-9a-f]{7} [0-9a-f]{7}\n/.test(o('git log')), 'merge commit iki ebeveynli');
  ok(s.graph().nodes.filter(c => c.parents.length === 2).length === 1 && new Set(s.graph().nodes.map(c => c.lane)).size === 2, 'graph: 1 merge düğümü, 2 şerit');
  r('git checkout -b y'); r('echo y > a'); r('git add a'); r('git commit -m "y: a"');
  r('git checkout main'); r('echo m > a'); r('git add a'); r('git commit -m "m: a"');
  const c = r('git merge y');
  ok(!c.ok && /CONFLICT \(content\): Merge conflict in a/.test(c.out) && s.files().a === 'm', 'çatışma: CONFLICT iletisi, dosyalar değişmedi');
  r('git checkout y'); r('echo kirli > a');
  ok(/would be overwritten by checkout:\n\ta/.test(o('git checkout main')) && /^\* y|\n\* y/.test(o('git branch')), 'kirli dosya varken checkout reddedilir, dal değişmez');
}
{ // ayrık HEAD
  const { s, r, o } = mk();
  r('git init'); r('echo 1 > f'); r('git add f'); r('git commit -m c1'); const id = s.graph().nodes[0].id;
  r('echo 2 > f'); r('git add f'); r('git commit -m c2');
  ok(/detached HEAD/.test(o('git checkout ' + id)) && s.files().f === '1' && /HEAD detached at/.test(o('git status')), 'commit kimliğiyle checkout: detached HEAD, dosya eski hali');
}
{ // tarama düzeltmeleri
  const base = () => { const t = mk(); ['git init', 'echo a > a', 'git add .', 'git commit -m one'].forEach(t.r); return t; };
  { const { s, r, o } = base();
    ['git checkout -b f', 'echo f > f', 'git add f', 'git commit -m f', 'git checkout main', 'echo m > m', 'git add m', 'git commit -m m', 'echo precious > untracked', 'echo dirty > a'].forEach(r);
    r('git merge f'); ok(s.files().untracked === 'precious' && s.files().a === 'dirty' && s.files().f === 'f', 'birleştirme izlenmeyen dosyayı ve kirli düzenlemeyi korur'); }
  { const { r, o } = base();
    ok(!r('git checkout toString').ok && /pathspec/.test(o('git checkout toString')) && /not something/.test(o('git merge constructor')), 'prototip adları (toString, constructor) çökmez');
    ok(o('git branch constructor') === '' && /not found/.test(o('git branch -d toString')), 'constructor adlı dal oluşturulabilir');
    ok(/No such file/.test(o('rm toString')) && /did not match/.test(o('git add toString')), 'rm/add prototip adlarında hata verir');
    r('echo x > __proto__'); ok(o('cat __proto__') === 'x', '__proto__ adlı dosya düz dosya gibi çalışır'); }
  { const { s, r, o } = base();
    ['git checkout -b f', 'git checkout main', 'echo z > z', 'git add z', 'git checkout f'].forEach(r);
    ok(/Changes to be committed:\n\tnew file:   z/.test(o('git status')), 'checkout aşamalı değişikliği korur'); }
  { const { r, o } = mk(); ['git init', 'echo 1 > a', 'echo 2 > b', 'git add a b', 'git commit -m one', 'rm a', 'git add a', 'echo 1 > a', 'git add a'].forEach(r);
    ok(/nothing to commit/.test(o('git commit -m two')), 'anahtar sırası değişse de boş commit yapılmaz'); }
  { const { s, r, o } = base(); r('echo b > a');
    ok(/^\[main [0-9a-f]{7}\] two/.test(o('git commit -am two')) && s.graph().nodes.length === 2, 'commit -am izlenen değişikliği commit eder');
    r('echo c > a'); ok(/^\[main [0-9a-f]{7}\] three/.test(o('git commit -a -m three')), 'commit -a -m');
    ok(/empty commit message/.test((r('echo d > a'), r('git add a'), o('git commit -m ""'))), 'boş mesaj: Aborting'); }
  { const { r, o } = base(); ok(/not a valid branch name/.test(o('git checkout -b "a b"')) && /not a valid branch name/.test(o('git checkout -b ..')), 'checkout -b geçersiz adı reddeder');
    const t = mk(); t.r('git init'); ok(/Switched to a new branch 'x'/.test(t.o('git checkout -b x')), 'ilk commit öncesi checkout -b çalışır'); }
}
console.log(`\n${n - fails}/${n} geçti`); process.exit(fails ? 1 : 0);

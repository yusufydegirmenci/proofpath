// CodeMirror 6 giriş noktası: yalnız alan egzersizinin ihtiyacı (satır no, girinti, renk, Ctrl+Enter/Esc, 3 dil).
import { EditorState, Compartment } from "@codemirror/state";
import { EditorView, keymap, lineNumbers, highlightActiveLine, drawSelection } from "@codemirror/view";
import { defaultKeymap, history, historyKeymap, indentWithTab } from "@codemirror/commands";
import { indentOnInput, bracketMatching, syntaxHighlighting, HighlightStyle } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";
import { sql } from "@codemirror/lang-sql";
import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";

// Renkler sayfanın CSS değişkenlerinden gelir; karanlık/açık tema kendiliğinden uyar.
const vurgu = HighlightStyle.define([
  { tag: [t.keyword, t.operatorKeyword, t.modifier], color: "var(--cm-kw, #7c3aed)" },
  { tag: [t.string, t.special(t.string)], color: "var(--cm-str, #15803d)" },
  { tag: [t.number, t.bool, t.null], color: "var(--cm-num, #b45309)" },
  { tag: [t.comment, t.lineComment, t.blockComment], color: "var(--cm-yorum, #6b7280)", fontStyle: "italic" },
  { tag: [t.typeName, t.className, t.standard(t.name)], color: "var(--cm-tip, #0369a1)" },
  { tag: [t.function(t.variableName), t.propertyName], color: "var(--cm-fn, #0e7490)" }
]);
const tema = EditorView.theme({
  "&": { fontSize: "13px", border: "1px solid var(--line, #8884)", borderRadius: "6px", background: "var(--panel, transparent)", color: "var(--ink, inherit)", maxWidth: "100%" },
  "&.cm-focused": { outline: "2px solid var(--gold, #2563eb)" },
  ".cm-scroller": { fontFamily: "ui-monospace, Menlo, Consolas, monospace", lineHeight: "1.5", overflow: "auto" },
  ".cm-content": { caretColor: "currentColor", minHeight: "7em" },
  ".cm-gutters": { background: "transparent", color: "var(--mute, #888)", border: "none" },
  ".cm-activeLine": { background: "#8881" },
  ".cm-activeLineGutter": { background: "transparent" },
  "&.cm-focused .cm-selectionBackground, .cm-selectionBackground": { background: "#94701e44" }
});
const diller = { sql: () => sql(), python: () => python(), js: () => javascript() };

// kur(ust, {dil, deger, calistir, cikis, degisti}) -> {oku, yaz, odak, yoket}
function kur(ust, o) {
  const dilKutusu = new Compartment();
  const cik = () => { if (o.cikis) o.cikis(); return true; };
  const view = new EditorView({
    parent: ust,
    state: EditorState.create({
      doc: o.deger || "",
      extensions: [
        lineNumbers(), highlightActiveLine(), drawSelection(), history(), indentOnInput(), bracketMatching(),
        syntaxHighlighting(vurgu), tema, EditorState.tabSize.of(2),
        dilKutusu.of(diller[o.dil] ? diller[o.dil]() : []),
        EditorView.contentAttributes.of({ "aria-label": o.etiket || "Kod", spellcheck: "false", autocapitalize: "off", autocorrect: "off" }),
        EditorView.updateListener.of(u => { if (u.docChanged && o.degisti) o.degisti(); }),
        keymap.of([
          { key: "Mod-Enter", run: () => { if (o.calistir) o.calistir(); return true; } },
          // Esc odaktan çıkarır (klavye tuzağı olmasın); Tab girinti için kullanılır.
          { key: "Escape", run: () => { view.contentDOM.blur(); return cik(); } },
          indentWithTab, ...defaultKeymap, ...historyKeymap
        ])
      ]
    })
  });
  return {
    oku: () => view.state.doc.toString(),
    yaz: (s) => view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: String(s) } }),
    odak: () => view.focus(),
    yoket: () => view.destroy()
  };
}
window.PPCM = Object.freeze({ kur, surum: "6" });



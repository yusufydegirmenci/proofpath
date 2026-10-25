# Kullanım: python3 tools/marka-svg.py  → marka/ klasörüne amblem, logo ve ikon SVG'lerini yazar; ikon.svg kökte.
# Geometri marka.js içindeki amblem ile aynıdır (değiştirirsen ikisini birlikte değiştir).
import os, sys
KOK = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
OUT = os.path.join(KOK, "marka")
TOP = "0,49.2 100,0 100,33.3 0,81"
MID = "25.4,81 60.3,64.4 100,81 100,115.9"
BOT = "0,88.6 50.8,112.7 50.8,146 0,116.2"
EW, EH = 100, 146

def grads(p):
    return (f'<linearGradient id="{p}a" x1="100" y1="0" x2="0" y2="80" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#5EB6FF"/><stop offset="1" stop-color="#3B82F6"/></linearGradient>'
            f'<linearGradient id="{p}b" x1="25" y1="70" x2="100" y2="116" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#8B5CF6"/><stop offset="1" stop-color="#A9A2FA"/></linearGradient>'
            f'<linearGradient id="{p}c" x1="0" y1="90" x2="51" y2="146" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#6366F1"/><stop offset="1" stop-color="#8B5CF6"/></linearGradient>')

def emblem(p, mono=None, tf=""):
    f = [mono]*3 if mono else [f"url(#{p}a)", f"url(#{p}b)", f"url(#{p}c)"]
    op = ['1', '.72', '.86'] if mono else ['1', '1', '1']
    return (f'<g{tf} stroke-linejoin="round">'
            f'<polygon points="{TOP}" fill="{f[0]}" stroke="{f[0]}" stroke-width="2" opacity="{op[0]}"/>'
            f'<polygon points="{MID}" fill="{f[1]}" stroke="{f[1]}" stroke-width="2" opacity="{op[1]}"/>'
            f'<polygon points="{BOT}" fill="{f[2]}" stroke="{f[2]}" stroke-width="2" opacity="{op[2]}"/></g>')

# Wordmark: harf yüksekliği 40, çizgi 5.5; E sunumdaki gibi üç eşit çizgi.
S = 6.5; H = 40; h2 = S/2
def F(x):  return f'M{x+h2} 0V{H}M{x} {h2}H{x+30}M{x} {H/2}H{x+25}', 34
def O(x):  return f'M{x+22} {h2}a{22-h2} {H/2-h2} 0 1 0 0.01 0Z', 44
def R(x):  return f'M{x+h2} {H}V{h2}H{x+22}a{9.5} {9.5} 0 0 1 0 {19}H{x+h2}M{x+20} {h2+19}L{x+33} {H}', 34
def N(x):  return f'M{x+h2} {H}V0M{x+h2} {-2}L{x+34-h2} {H+2}M{x+34-h2} {H}V0', 34
def E(x):  return f'M{x} {h2}H{x+30}M{x} {H/2}H{x+30}M{x} {H-h2}H{x+30}', 30
def X(x):  return f'M{x+2} 0L{x+34} {H}M{x+34} 0L{x+2} {H}', 36
GAP = 20
def wordmark():
    x, d = 0, []
    for g in (F, O, R, N, E, X):
        p, w = g(x); d.append(p); x += w + GAP
    return ' '.join(d), x - GAP
WD, WW = wordmark()

def svg(w, h, body, title):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:g} {h:g}" role="img" aria-label="{title}"><title>{title}</title>{body}</svg>\n'

def logo(p, ink, sub, bg=None):
    # amblem 146 yükseklik → 0.62 ölçek; wordmark sağda, slogan altında
    sc = 0.62; ew = EW*sc; eh = EH*sc
    W = 24 + ew + 30 + WW + 24; Hh = 24 + eh + 24
    wy = 24 + eh/2 - 30
    body = (f'<rect width="{W:g}" height="{Hh:g}" fill="{bg}"/>' if bg else '')
    body += f'<defs>{grads(p)}</defs>' + emblem(p, tf=f' transform="translate(24 24) scale({sc})"')
    body += (f'<clipPath id="{p}w"><rect width="{WW+2:g}" height="{H:g}"/></clipPath>'
             f'<g transform="translate({24+ew+30:g} {wy:g})"><path d="{WD}" clip-path="url(#{p}w)" fill="none" stroke="{ink}" stroke-width="{S}"/></g>')
    body += (f'<text x="{24+ew+30+WW/2:g}" y="{wy+H+28:g}" text-anchor="middle" fill="{sub}" font-family="system-ui,-apple-system,Segoe UI,sans-serif" '
             f'font-size="13" letter-spacing="6">Ideas take form.</text>')
    return svg(W, Hh, body, "FORNEX — Ideas take form.")

def write(n, s): open(os.path.join(OUT, n), 'w').write(s)
write('amblem.svg', svg(EW+4, EH+4, f'<defs>{grads("e")}</defs>' + emblem("e", tf=' transform="translate(2 2)"'), 'FORNEX amblemi'))
write('amblem-beyaz.svg', svg(EW+4, EH+4, emblem("w", mono="#FFFFFF", tf=' transform="translate(2 2)"'), 'FORNEX amblemi'))
write('amblem-koyu.svg', svg(EW+4, EH+4, emblem("k", mono="#0F1117", tf=' transform="translate(2 2)"'), 'FORNEX amblemi'))
write('logo-koyu-zemin.svg', logo('d', '#E5E7EB', '#9CA3AF'))
write('logo-acik-zemin.svg', logo('l', '#0F1117', '#4B5563'))
write('logo-tek-renk.svg', logo('m', '#FFFFFF', '#FFFFFF').replace('url(#ma)', '#FFFFFF').replace('url(#mb)', '#FFFFFF').replace('url(#mc)', '#FFFFFF'))
# Uygulama ikonu: koyu yuvarlak kare + ortada amblem
sc = 330/EH
ik = (f'<defs>{grads("i")}<linearGradient id="ig" x1="0" y1="0" x2="0" y2="512" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#1A1F2E"/><stop offset="1" stop-color="#0F1117"/></linearGradient></defs>'
      f'<rect width="512" height="512" rx="112" fill="url(#ig)"/>' + emblem("i", tf=f' transform="translate({256-EW*sc/2:g} {91}) scale({sc:g})"'))
open(os.path.join(KOK, 'ikon.svg'), 'w').write(svg(512, 512, ik, 'FORNEX'))
print('tamam', WW)

"""Small layout engine for annotated screenshot figures.

All layout is in output pixels.  Screenshot pixels are never modified: each
source image is only cropped (title bar / window chrome) and scaled, and every
annotation is drawn on top of it.
"""
import math
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.patheffects as pe
from matplotlib import font_manager as fm
from matplotlib.patches import Circle, FancyBboxPatch, Rectangle
from PIL import Image

CJK_FONT = "/System/Library/Fonts/STHeiti Medium.ttc"
fm.fontManager.addfont(CJK_FONT)
CJK_NAME = fm.FontProperties(fname=CJK_FONT).get_name()  # "Heiti TC" (Medium face)
FAMILY = ["Helvetica Neue", CJK_NAME]  # Latin first, CJK glyphs fall back to STHeiti

RED = "#C8102E"
W = 2480            # every figure has the same pixel width ...
DPI = 400           # ... and natural print width of 6.2 in (15.7 cm)
PX_PER_PT = DPI / 72.0

LW = 2.6            # outline width, px
HALO = 3.4          # extra white under outlines, px (keeps red visible on red/dark UI)
MR = 25             # marker radius, px
NUM_FS = 7.4        # numeral size, pt
LEG_FS = 7.2        # legend text, pt
CAP_FS = 5.8        # caption text, pt
CAP_MIN = 4.8
CAP_COLOR = "#4A4A4A"
FRAME = "#BDBDBD"


def pt(px):
    return px / PX_PER_PT


_measure_fig = plt.figure(dpi=DPI)
_renderer = _measure_fig.canvas.get_renderer()


def text_width(s, fs, weight="normal"):
    t = _measure_fig.text(0, 0, s, fontsize=fs, family=FAMILY, weight=weight)
    w = t.get_window_extent(_renderer).width
    t.remove()
    return w


def wrap(s, fs, maxw):
    """Greedy word wrap measured with the real font."""
    words = s.split(" ")
    lines, cur = [], ""
    for w in words:
        trial = w if not cur else cur + " " + w
        if text_width(trial, fs) <= maxw or not cur:
            cur = trial
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def fitted_caption_fs(p):
    fs = CAP_FS
    while text_width(p.caption, fs) > p.width + p.cap_slack and fs > CAP_MIN:
        fs = round(fs - 0.1, 2)
    return fs


def caption_layout(p):
    """Caption lines at the figure-wide caption size (break at a hyphen if needed)."""
    fs = p.cap_fs or fitted_caption_fs(p)
    s = p.caption
    lines = [s]
    if text_width(s, fs) > p.width + p.cap_slack:
        cuts = [i for i, c in enumerate(s) if c in "-/ "]
        mid = len(s) / 2
        i = min(cuts, key=lambda k: abs(k - mid))
        lines = [s[: i + 1].rstrip(), s[i + 1:]]
    return fs, lines


def caption_height(p):
    fs, lines = caption_layout(p)
    return len(lines) * fs * PX_PER_PT * 1.3


class Panel:
    def __init__(self, path, crop, caption):
        self.path = path
        self.img = np.asarray(Image.open(path))
        self.crop = crop  # (x0, y0, x1, y1) in source pixels
        x0, y0, x1, y1 = crop
        self.arr = self.img[y0:y1, x0:x1]
        self.cw, self.ch = x1 - x0, y1 - y0
        self.caption = caption
        self.cap_fs = None
        self.cap_slack = 30
        self.left = self.top = 0.0
        self.s = 1.0

    @property
    def aspect(self):
        return self.cw / self.ch

    @property
    def width(self):
        return self.cw * self.s

    @property
    def height(self):
        return self.ch * self.s

    @property
    def right(self):
        return self.left + self.width

    @property
    def bottom(self):
        return self.top + self.height

    def P(self, u, v):
        """Source pixel (u, v) -> figure pixel."""
        return (self.left + (u - self.crop[0]) * self.s,
                self.top + (v - self.crop[1]) * self.s)

    def pos(self, spec):
        """Marker / point spec: (u, v) in source px; ('L'|'R', dx_px, v) for the
        gutter left/right of the panel; ('off', u, v, dx_px, dy_px) for a point
        offset in figure px from source point (u, v), e.g. just outside a box edge."""
        if spec[0] == "off":
            _, u, v, dx, dy = spec
            X, Y = self.P(u, v)
            return (X + dx, Y + dy)
        if isinstance(spec[0], str):
            side, dx, v = spec
            y = self.P(0, v)[1]
            return (self.left - dx, y) if side == "L" else (self.right + dx, y)
        return self.P(*spec)


class Figure:
    def __init__(self, height):
        self.H = int(round(height))
        self.fig = plt.figure(figsize=(W / DPI, self.H / DPI), dpi=DPI)
        self.ax = self.fig.add_axes([0, 0, 1, 1])
        self.ax.set_xlim(0, W)
        self.ax.set_ylim(self.H, 0)
        self.ax.axis("off")
        self.fig.patch.set_facecolor("white")

    # -- screenshots -------------------------------------------------------
    def place(self, p):
        self.ax.imshow(p.arr, extent=(p.left, p.right, p.bottom, p.top),
                       interpolation="lanczos", zorder=1)
        self.ax.add_patch(Rectangle((p.left, p.top), p.width, p.height, fill=False,
                                    ec=FRAME, lw=pt(1.4), zorder=2))

    def caption(self, p, y):
        fs, lines = caption_layout(p)
        for k, ln in enumerate(lines):
            self.ax.text((p.left + p.right) / 2, y + k * fs * PX_PER_PT * 1.3, ln,
                         ha="center", va="top", fontsize=fs, family=FAMILY,
                         color=CAP_COLOR, zorder=3)
        return len(lines) * fs * PX_PER_PT * 1.3

    def rule(self, x0, x1, y):
        self.ax.plot([x0, x1], [y, y], color="#D6D6D6", lw=pt(1.6), zorder=2)

    # -- annotations -------------------------------------------------------
    def _halo(self, lw):
        return [pe.Stroke(linewidth=pt(lw + HALO), foreground="white", alpha=0.95),
                pe.Normal()]

    def box(self, p, x0, y0, x1, y1, r=7):
        X0, Y0 = p.P(x0, y0)
        X1, Y1 = p.P(x1, y1)
        patch = FancyBboxPatch((X0, Y0), X1 - X0, Y1 - Y0,
                               boxstyle=f"round,pad=0,rounding_size={r}",
                               fill=False, ec=RED, lw=pt(LW), zorder=5)
        patch.set_path_effects(self._halo(LW))
        self.ax.add_patch(patch)

    def ring(self, p, cx, cy, r):
        X, Y = p.P(cx, cy)
        c = Circle((X, Y), r * p.s, fill=False, ec=RED, lw=pt(LW), zorder=5)
        c.set_path_effects(self._halo(LW))
        self.ax.add_patch(c)

    def line(self, a, b, z=6):
        ln, = self.ax.plot([a[0], b[0]], [a[1], b[1]], color=RED, lw=pt(LW),
                           solid_capstyle="round", zorder=z)
        ln.set_path_effects(self._halo(LW))

    def marker(self, p, n, at, to=()):
        """Numbered disc at `at`; optional leader line(s) to point(s) `to`."""
        X, Y = p.pos(at)
        for t in to:
            TX, TY = p.pos(t)
            d = math.hypot(TX - X, TY - Y)
            if d > MR:
                sx, sy = X + (TX - X) / d * (MR - 2), Y + (TY - Y) / d * (MR - 2)
                self.line((sx, sy), (TX, TY))
        self.disc(X, Y, n)

    def disc(self, X, Y, n, z=8):
        self.ax.add_patch(Circle((X, Y), MR, fc=RED, ec="white", lw=pt(3.0), zorder=z))
        self.ax.text(X, Y + 1, str(n), ha="center", va="center", color="white",
                     fontsize=NUM_FS, family=FAMILY, weight="bold", zorder=z + 1)

    def bracket(self, p, side, v0, v1, dx, tick=14):
        y0, y1 = p.P(0, v0)[1], p.P(0, v1)[1]
        if side == "L":
            x, tx = p.left - dx, p.left - dx + tick
        else:
            x, tx = p.right + dx, p.right + dx - tick
        pts = [(tx, y0), (x, y0), (x, y1), (tx, y1)]
        ln, = self.ax.plot([q[0] for q in pts], [q[1] for q in pts], color=RED,
                           lw=pt(LW), solid_joinstyle="round", zorder=6)
        ln.set_path_effects(self._halo(LW))
        return x, (y0 + y1) / 2

    # -- legend ------------------------------------------------------------
    def legend(self, entries, x, y, width, ncol=2, colgap=70, line_gap=1.28,
               entry_gap=26, layout_only=False):
        """entries: list of (n, text). Column-major. Returns height used."""
        colw = (width - (ncol - 1) * colgap) / ncol
        text_x = 2 * MR + 20
        lh = LEG_FS * PX_PER_PT * line_gap
        wrapped = [(n, wrap(t, LEG_FS, colw - text_x)) for n, t in entries]
        rows = math.ceil(len(wrapped) / ncol)
        cols = [wrapped[c * rows:(c + 1) * rows] for c in range(ncol)]
        heights = [sum(max(len(l) * lh, 2 * MR) for _, l in col) + entry_gap * (len(col) - 1)
                   for col in cols if col]
        total = max(heights)
        if layout_only:
            return total
        for c, col in enumerate(cols):
            yy = y
            cx = x + c * (colw + colgap)
            for n, lines in col:
                # marker aligned with the first text line
                self.disc(cx + MR, yy + lh / 2, n)
                for i, ln in enumerate(lines):
                    self.ax.text(cx + text_x, yy + lh / 2 + i * lh, ln, ha="left",
                                 va="center_baseline", fontsize=LEG_FS, family=FAMILY,
                                 color="#1A1A1A", zorder=3)
                yy += max(len(lines) * lh, 2 * MR) + entry_gap
        return total

    def save(self, path):
        self.fig.savefig(path, dpi=DPI, facecolor="white")
        plt.close(self.fig)


def layout_row(panels, x_from, x_to, gutters, max_scale=None, fixed_h=None):
    """Place panels side by side at a common height, centred in [x_from, x_to].
    gutters: list of len(panels)-1 gaps (px). Returns common height."""
    avail = (x_to - x_from) - sum(gutters)
    h = fixed_h or avail / sum(p.aspect for p in panels)
    if max_scale:
        h = min(h, min(p.ch * max_scale for p in panels))
    for p in panels:
        p.s = h / p.ch
    total = sum(p.width for p in panels) + sum(gutters)
    x = x_from + ((x_to - x_from) - total) / 2
    for i, p in enumerate(panels):
        p.left = x
        x += p.width + (gutters[i] if i < len(gutters) else 0)
    return h

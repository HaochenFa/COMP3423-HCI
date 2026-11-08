"""Build the route-results iteration strip (Figure 5.2 of the report).

usage: python3 strip_f3a.py [RAWDIR] [OUTDIR]   (defaults: raw/ and this folder)

RAWDIR holds the three captures of en-GB frame F3A (node 1:1126) taken from the
Figma version history at 28 Oct 14:39, 30 Oct 00:15 and 5 Nov 17:56. The script
covers the frame-name label the canvas draws over each capture's top-left corner,
saves the cleaned captures and lays them out side by side.
"""
import sys
from pathlib import Path
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from PIL import Image
from matplotlib import font_manager as fm

HERE = Path(__file__).parent
src = sys.argv[1] if len(sys.argv) > 1 else str(HERE / "raw")
out = sys.argv[2] if len(sys.argv) > 2 else str(HERE)
fp = fm.FontProperties(fname="/System/Library/Fonts/STHeiti Medium.ttc")

raw = [
    ("en-v1-raw.png", "F3A-route-search-v1-2026-10-28-1439.png"),
    ("en-v2-raw.png", "F3A-route-search-v2-2026-10-30-0015.png"),
    ("en-v3-raw.png", "F3A-route-search-v3-2026-11-05-1756-final.png"),
]
for r, f in raw:
    a = np.array(Image.open(f"{src}/{r}").convert("RGB"))
    # The canvas draws the frame name just above the frame; its tail overlaps the
    # top-left corner (with a soft shadow down to about y = 22). Replace that
    # block with the mirrored top-right corner, which is plain background.
    a[0:23, 0:95] = a[0:23, -95:][:, ::-1]
    # last trace of the shadow, left of the status-bar time (plain white there)
    if "v1" not in r:
        a[23:27, 0:40] = 255
    Image.fromarray(a).save(f"{out}/{f}")

panels = [
    (raw[0][1], "v1 — 28 Oct 2026, 14:39", "Initial hi-fi design (Li-En Lo)\nEnglish demo screen, 390 × 844"),
    (raw[1][1], "v2 — 30 Oct 2026, 00:15", "Improved and expanded (Haochen Fa)\nnext-bus wait added, legs listed, 402 × 874"),
    (raw[2][1], "Final — 5 Nov 2026, 17:56", "After the accessibility pass\n(Moling Kong): larger Live badge"),
]
fig, axes = plt.subplots(1, 3, figsize=(10.5, 8.6), dpi=200)
for ax, (f, title, sub) in zip(axes, panels):
    ax.imshow(Image.open(f"{out}/{f}"))
    ax.set_xticks([]); ax.set_yticks([])
    for s in ax.spines.values():
        s.set_color("#D0D0D0"); s.set_linewidth(0.8)
    ax.set_title(title, fontproperties=fp, fontsize=12, color="#1A1A1A", pad=40)
    ax.text(0.5, 1.012, sub, transform=ax.transAxes, ha="center", va="bottom", fontproperties=fp, fontsize=8.5, color="#555555")
fig.text(0.5, 0.015, "Route search results (en-GB): the same Figma frame captured from the version history at three dates.",
         ha="center", fontproperties=fp, fontsize=9, color="#555555")
plt.subplots_adjust(left=0.02, right=0.98, top=0.84, bottom=0.05, wspace=0.08)
fig.savefig(f"{out}/F3A-route-search-iteration-strip.png", facecolor="white")
print("ok")

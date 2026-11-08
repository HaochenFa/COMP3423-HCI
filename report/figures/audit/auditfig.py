import sys
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import font_manager as fm
from matplotlib.patches import Rectangle
from PIL import Image

SRC, OUT = sys.argv[1], sys.argv[2]
fp = fm.FontProperties(fname="/System/Library/Fonts/STHeiti Medium.ttc")

def crop(f, box):
    x0, y0, x1, y1 = box
    return Image.open(f"{SRC}/{f}").convert("RGB").crop((x0, y0, min(x1, 572), y1))

FAIL, PASS = "#B00020", "#1B6E3A"
panels = [
    ("t3-search-route-number-only.png", (0, 150, 576, 225),
     "1  Search placeholder 輸入路線號碼", "#DBDBDB on #FFFFFF = 1.38:1  (needs 4.5:1)", FAIL,
     [(195, 172, 375, 205)]),
    ("t5-nearby-stop-code-entry.png", (40, 688, 536, 800),
     "2  Nearby mode buttons, unselected", "#FFFFFF on #BABBBB = 1.92:1  (needs 4.5:1)", FAIL,
     [(88, 762, 166, 789), (410, 762, 488, 789)]),
    ("t2-favourites-after-save.png", (0, 145, 576, 196),
     "3  Section bar 收藏車站 (also the planner summary bar)", "#FFFFFF on #667C89 = 4.37:1  (needs 4.5:1)", FAIL,
     [(38, 156, 132, 184)]),
    ("t1-home-no-location.png", (0, 55, 576, 205),
     "4  Header text on brand red", "#FFFFFF on #D1383A = 4.84:1  (needs 4.5:1)", PASS,
     [(212, 93, 358, 132)]),
]
targets = [
    ("t2-stop-expanded-unlabelled-icons.png", (0, 565, 300, 790),
     "5  Stop action icons", "each 26 pt across, centres 33 pt apart;\nmeets WCAG 2.5.8 (24 pt), under the 44 pt guideline", [(18, 585, 58, 624), (18, 635, 58, 675), (18, 686, 58, 725), (18, 737, 58, 776)]),
    ("t4-planner-ambiguous-stops.png", (300, 90, 576, 240),
     "6  Planner clear button and favourite star", "clear button 20 pt, star box about 17 pt: both under\n24 pt and inside larger targets (field, result row)", [(443, 110, 473, 140), (527, 196, 553, 222)]),
]

fig = plt.figure(figsize=(8.3, 10.0), dpi=200)
gs = fig.add_gridspec(5, 2, height_ratios=[0.75, 1.15, 0.65, 1.55, 2.3], hspace=0.75, wspace=0.12)

def show(ax, f, box, title, sub, colour, rects, below=False):
    im = crop(f, box)
    ax.imshow(im)
    for (x0, y0, x1, y1) in rects:
        ax.add_patch(Rectangle((x0 - box[0], y0 - box[1]), x1 - x0, y1 - y0, fill=False, ec=colour, lw=1.6))
    ax.set_xticks([]); ax.set_yticks([])
    for s in ax.spines.values():
        s.set_color("#D0D0D0"); s.set_linewidth(0.8)
    if below:
        ax.set_title(title, fontproperties=fp, fontsize=10, color="#1A1A1A", loc="left", pad=6)
        ax.set_xlabel(sub, fontproperties=fp, fontsize=8.5, color=colour, loc="left")
    else:
        ax.set_title(title, fontproperties=fp, fontsize=10, color="#1A1A1A", loc="left", pad=16)
        ax.text(0, 1.02, sub, transform=ax.transAxes, ha="left", va="bottom", fontproperties=fp, fontsize=8.5, color=colour)

for i, p in enumerate(panels):
    show(fig.add_subplot(gs[i, :]), *p)
for j, (f, box, title, sub, rects) in enumerate(targets):
    show(fig.add_subplot(gs[4, j]), f, box, title, sub, "#0B5CAD", rects, below=True)

fig.text(0.5, 0.012, "App1933 v2.3.38. Contrast from pixel colours of lossless screenshots (WCAG 2.2 formula); sizes in iOS points.",
         ha="center", fontproperties=fp, fontsize=8, color="#555555")
plt.subplots_adjust(left=0.04, right=0.96, top=0.95, bottom=0.10)
fig.savefig(OUT, facecolor="white")
print("ok")

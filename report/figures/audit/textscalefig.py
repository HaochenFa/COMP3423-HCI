"""Figure D.2: App1933 Home before and after setting iOS Larger Text to the maximum.

usage: python3 textscalefig.py SCREENSHOT_DIR OUT_PNG
"""
import sys
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import font_manager as fm
from matplotlib.patches import Rectangle
from PIL import Image

SRC, OUT = sys.argv[1], sys.argv[2]
fp = fm.FontProperties(fname="/System/Library/Fonts/STHeiti Medium.ttc")
RED, BLUE = "#B00020", "#0B5CAD"

# text boxes measured in both Home captures (identical to the pixel)
BOXES = [((351, 172, 568, 203), "APP 1933: 218 × 32 px"),
         ((366, 1100, 551, 1128), "附近沒有車站: 186 × 29 px"),
         ((206, 1885, 255, 1908), "收藏: 50 × 24 px")]

panels = [
    ("t1-home-iphone-no-nearby-stops-banner-ad.png", "a  Home, 21:23", "before changing the setting", BOXES),
    ("t8-a11y-ios-larger-text-max-setting.png", "b  iOS Larger Text, 21:32", "Larger Accessibility Sizes on, slider at maximum", []),
    ("t8-a11y-home-at-max-text-size.png", "c  Home, 21:32", "at the maximum text size", BOXES),
]

fig, axes = plt.subplots(1, 3, figsize=(10.5, 8.4), dpi=200)
for ax, (f, title, sub, boxes) in zip(axes, panels):
    ax.imshow(Image.open(f"{SRC}/{f}").convert("RGB"))
    for (x0, y0, x1, y1), _ in boxes:
        ax.add_patch(Rectangle((x0 - 8, y0 - 8), x1 - x0 + 16, y1 - y0 + 16, fill=False, ec=RED, lw=1.6))
    ax.set_xticks([]); ax.set_yticks([])
    for s in ax.spines.values():
        s.set_color("#D0D0D0"); s.set_linewidth(0.8)
    ax.set_title(title, fontproperties=fp, fontsize=11, color="#1A1A1A", loc="left", pad=18)
    ax.text(0, 1.012, sub, transform=ax.transAxes, ha="left", va="bottom", fontproperties=fp, fontsize=8, color="#555555")
    ax.set_xlabel(f, fontproperties=fp, fontsize=7.5, color="#555555")

fig.text(0.5, 0.045,
         "Red boxes: text measured in a and c. Every box is the same size to the pixel: "
         + "; ".join(label for _, label in BOXES) + ".",
         ha="center", fontproperties=fp, fontsize=8.5, color=RED)
fig.text(0.5, 0.018, "App1933 v2.3.39 on iPhone, 8 Nov 2026. The app does not follow the system text size (WCAG 1.4.4).",
         ha="center", fontproperties=fp, fontsize=8.5, color="#555555")
plt.subplots_adjust(left=0.02, right=0.98, top=0.90, bottom=0.10, wspace=0.08)
fig.savefig(OUT, facecolor="white")
print("ok")

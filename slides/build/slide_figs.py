"""Build the images used by the presentation.

usage: python3 slide_figs.py            (writes img/ next to this script)

- before-F1 ... before-F5: real App1933 screenshots with numbered callouts
  (the numbers match the list printed on each feature slide);
- save-entry: the two English (en-GB) Home screens behind the save finding;
- launch-ring: the launch advert with its skip button ringed (slide 3);
- a11y-*: the three iPhone captures of the text-size check, measured text boxed;
- crop-*: the original screenshots and en-GB components cropped for the slides.

Screenshot pixels are only cropped and scaled; every mark is drawn on top.
img/layout.json records each annotated image's size and panel rectangles, so
build_slides.js can line the screenshots up with the English screens.
"""
import json
import sys
from pathlib import Path

from PIL import Image

HERE = Path(__file__).resolve().parent
REPO = HERE.parent.parent
sys.path.insert(0, str(REPO / "report" / "figures" / "annotated"))
import annotlib as A  # noqa: E402
import matplotlib.pyplot as plt  # noqa: E402

SRC = REPO / "original-app-screenshots"
SCREENS = REPO / "report" / "build" / "screens"
OUT = HERE / "img"
OUT.mkdir(exist_ok=True)

# Larger marks than the report: these images are read on a screen at a distance.
A.MR = 40
A.NUM_FS = 11.5
A.LW = 4.6
A.HALO = 4.2

PANEL_H = 1500      # every screenshot is drawn 1500 px tall (3.75 in at 400 dpi)
GAP = 100           # between screenshots
MARGIN = 100        # room for callouts outside the screenshots
MAC = (0, 54, 574, 1078)    # Mac capture: drop the title bar and frame
PHONE = (0, 0, 920, 2000)   # iPhone capture, full screen
STORE = 0.6                 # saved size relative to the drawing size
LAYOUT = {}


def mac(name):
    return A.Panel(str(SRC / name), MAC, "")


def phone(name, crop=PHONE):
    return A.Panel(str(SRC / name), crop, "")


def screen(code):
    return A.Panel(str(SCREENS / f"{code}.png"), (0, 0, 402, 874), "")


def render(name, panels, annotate, ml=MARGIN, mr=MARGIN):
    """Lay the panels out at PANEL_H, draw the marks and save img/<name>.png."""
    for p in panels:
        p.s = PANEL_H / p.ch
    width = ml + mr + sum(p.width for p in panels) + GAP * (len(panels) - 1)
    A.W = int(round(width))
    x = ml
    for p in panels:
        p.left, p.top = x, MARGIN * 0.6
        x += p.width + GAP
    f = A.Figure(PANEL_H + MARGIN * 1.2)
    for p in panels:
        f.place(p)
    if annotate:
        annotate(f, *panels)
    out = OUT / f"{name}.png"
    f.save(str(out))
    # Drawn at 400 dpi for clean marks, stored at about 250 dpi of the size
    # the slides show it at, which keeps the deck small.
    im = Image.open(out).convert("RGB")
    im = im.resize((round(im.width * STORE), round(im.height * STORE)), Image.LANCZOS)
    im.save(out, optimize=True)
    LAYOUT[name] = {"w": im.width, "h": im.height,
                    "panels": [[v * STORE for v in (p.left, p.top, p.right, p.bottom)] for p in panels]}
    print(name, im.width, "x", im.height)


# ------------------------------------------------------------ feature slides
def f1():
    launch = phone("t1-launch-fullscreen-ad.png", (0, 142, 920, 1858))
    home = A.Panel(str(SRC / "cropped" / "moling-ads-interstitial.jpeg"), (846, 0, 1269, 920), "")

    def ann(f, l, h):
        f.ring(l, 865, 197, 40)                              # 1 skip button
        f.marker(l, 1, (735, 197), to=[(825, 197)])
        f.box(h, 848, 108, 1266, 212)                        # 2 promotion banner
        f.marker(h, 2, ("L", GAP / 2, 160), to=[(848, 160)])
        f.ring(h, 1212, 655, 50)                             # 3 floating button
        f.marker(h, 3, (1128, 598))
        f.box(h, 886, 735, 1229, 794)                        # 4 advert in the list
        f.marker(h, 4, ("L", GAP / 2, 765), to=[(886, 765)])
        f.box(h, 1194, 222, 1265, 590)                       # 5 bare minutes
        f.marker(h, 5, ("R", MARGIN / 2, 406), to=[(1265, 406)])
    render("before-F1", [launch, home], ann)


def f2():
    a = mac("t2-stop-expanded-unlabelled-icons.png")
    b = mac("t2-hidden-save-stop-menu.png")

    def ann(f, a, b):
        f.box(a, 9, 578, 67, 787)                            # 1 unlabelled icons
        f.marker(a, 1, ("L", MARGIN / 2, 606), to=[(9, 606)])
        f.ring(a, 38, 757, 22)                               # 2 the ≡ icon ...
        f.marker(a, 2, ("L", MARGIN / 2, 757), to=[(16, 757)])
        f.box(b, 56, 405, 516, 466)                          # ... and the option it opens
        f.marker(b, 2, (536, 436))
        f.box(b, 21, 299, 552, 774)                          # 3 dark pop-up
        f.marker(b, 3, (30, 292))
    render("before-F2", [a, b], ann)


def f3():
    a = mac("t3-search-route-number-only.png")
    b = mac("t4-planner-ai-changes-stops.png")

    def ann(f, a, b):
        f.box(a, 5, 149, 569, 224)                           # 1 route numbers only
        f.marker(a, 1, (44, 186))
        f.box(a, 3, 598, 571, 981)                           # 2 keypad
        f.marker(a, 2, (30, 604))
        f.box(b, 79, 190, 292, 231)                          # 3 stop entered ...
        f.marker(b, 3, ("off", 292, 210, A.MR + 8, 0))
        f.box(b, 19, 520, 447, 756)                          # ... and the stop it boards at
        f.marker(b, 3, ("off", 447, 540, A.MR + 8, 0))
    render("before-F3", [a, b], ann)


def f4():
    a = mac("t5-nearby-stop-code-entry.png")
    b = mac("t5-nearby-landmarks-location-off.png")

    def ann(f, a, b):
        f.box(a, 185, 165, 390, 389)                         # 1 stop code
        f.marker(a, 1, ("off", 390, 280, A.MR + 8, 0))
        f.box(b, 51, 401, 523, 684)                          # 2 location off
        f.marker(b, 2, (58, 390))
    render("before-F4", [a, b], ann)


def f5():
    a = phone("t6-menu-grid-iphone-26-items.png")
    b = mac("t7-language-no-cancel.png")

    def ann(f, a, b):
        f.box(a, 58, 572, 862, 1748)                         # 1 the 26-item grid
        f.marker(a, 1, (858, 578))
        for x0, y0, x1, y1, mx in [(279, 582, 429, 735, 452), (279, 1250, 429, 1402, 452),
                                   (703, 1250, 853, 1402, 680), (279, 1417, 429, 1569, 452)]:
            f.box(a, x0, y0, x1, y1)                         # 2 promotions mixed in
            f.marker(a, 2, (mx, y0 + 18))
        x, y = f.bracket(a, "L", 572, 1748, 30)              # 3 no text-size setting
        f.disc(x - A.MR + 6, y, 3)
        f.box(b, 21, 367, 552, 705)                          # 4 no cancel
        f.marker(b, 4, (36, 370))
    render("before-F5", [a, b], ann)


# ------------------------------------------------------------ other slides
def save_entry():
    home, card = screen("F1"), screen("F1A")

    def ann(f, h, c):
        f.box(h, 18, 666, 384, 736, r=10)                    # 1 stop card on Home
        f.marker(h, 1, ("L", MARGIN / 2, 700), to=[(18, 700)])
        f.box(c, 26, 726, 252, 753)                          # 2 the only cue
        f.marker(c, 2, ("off", 252, 739, A.MR + 10, 0))
    render("save-entry", [home, card], ann)


def launch_ring():
    p = phone("t1-launch-fullscreen-ad.png", (0, 142, 920, 1858))
    render("launch-ring", [p], lambda f, p: f.ring(p, 865, 197, 46), ml=0, mr=0)


def a11y():
    boxes = [(351, 172, 568, 203), (366, 1100, 551, 1128), (206, 1885, 255, 1908)]

    def ann(f, p):
        for b in boxes:
            f.box(p, *b, r=4)
    render("a11y-home-before", [phone("t1-home-iphone-no-nearby-stops-banner-ad.png")], ann, ml=0, mr=0)
    render("a11y-setting", [phone("t8-a11y-ios-larger-text-max-setting.png")], None, ml=0, mr=0)
    render("a11y-home-after", [phone("t8-a11y-home-at-max-text-size.png")], ann, ml=0, mr=0)


def crops():
    """Plain crops: originals for slide 3 and en-GB components for slide 6."""
    jobs = [
        (SRC / "t3-search-route-number-only.png", MAC, "crop-search"),
        (SRC / "t2-hidden-save-stop-menu.png", MAC, "crop-save-menu"),
        (SRC / "t6-menu-grid-iphone-26-items.png", PHONE, "crop-menu-grid"),
        (SCREENS / "F1.png", (0, 0, 402, 188), "comp-header"),
        (SCREENS / "F1.png", (16, 308, 386, 440), "comp-route-card"),
        (SCREENS / "F2A.png", (44, 434, 392, 502), "comp-arrivals"),
        (SCREENS / "F2.png", (44, 582, 392, 640), "comp-save-button"),
        (SCREENS / "F2A.png", (17, 670, 388, 728), "comp-toast"),
        (SCREENS / "F1.png", (0, 806, 402, 874), "comp-tab-bar"),
    ]
    for src, box, name in jobs:
        im = Image.open(src).convert("RGB").crop(box)
        im.save(OUT / f"{name}.png")
        LAYOUT[name] = {"w": im.width, "h": im.height}
        print(name, im.size)


if __name__ == "__main__":
    for job in (f1, f2, f3, f4, f5, save_entry, launch_ring, a11y, crops):
        job()
    plt.close("all")
    (OUT / "layout.json").write_text(json.dumps(LAYOUT, indent=1))
    print("wrote", OUT / "layout.json")

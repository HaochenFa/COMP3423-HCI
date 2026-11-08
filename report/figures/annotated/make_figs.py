"""Build the five annotated problem-evidence figures.

usage: python3 make_figs.py OUTDIR [F1 F2 ...]
Source coordinates below are pixels in the ORIGINAL screenshot files.
"""
import os
import sys
import matplotlib.pyplot as plt
from annotlib import (Panel, Figure, layout_row, caption_height, fitted_caption_fs,
                      W, MR)

SRC = "/Users/billyfa/COMP3423/original-app-screenshots"
TB = (0, 54, 574, 1078)   # macOS capture: drop title bar (rows 0-53) + 2 px right / 4 px bottom frame
TOP, BOTTOM = 40, 40
CAP_GAP = 16


def png(name):
    return Panel(f"{SRC}/{name}", TB, name)


def build(out, panels, gutters, annotate, entries, ml=60, mr=60, legend="below",
          ncol=2, legend_w=0, legend_gap=90, max_scale=1.3, cap_fs=None):
    if legend == "below":
        layout_row(panels, ml, W - mr, gutters, max_scale=max_scale)
    else:
        layout_row(panels, ml, W - mr - legend_w - legend_gap, gutters, max_scale=max_scale)
    for p in panels:
        p.top = TOP
        p.cap_slack = min(20, min(gutters) * 0.4) if gutters else 20
    common = cap_fs or min(fitted_caption_fs(p) for p in panels)
    for p in panels:
        p.cap_fs = common
    hp = panels[0].height
    cap_h = max(caption_height(p) for p in panels)
    cap_bottom = TOP + hp + CAP_GAP + cap_h
    probe = Figure(100)
    if legend == "below":
        lx, lw = ml, W - ml - mr
        lh = probe.legend(entries, lx, 0, lw, ncol=ncol, layout_only=True)
        ly = cap_bottom + 56
        H = ly + lh + BOTTOM
    else:
        lx, lw = W - mr - legend_w, legend_w
        lh = probe.legend(entries, lx, 0, lw, ncol=1, layout_only=True)
        ly = TOP + max(0, (hp - lh) / 2)
        H = max(cap_bottom, ly + lh) + BOTTOM
    plt.close(probe.fig)
    f = Figure(H)
    for p in panels:
        f.place(p)
        f.caption(p, TOP + hp + CAP_GAP)
    annotate(f, *panels)
    if legend == "below":
        f.rule(ml, W - mr, cap_bottom + 26)
        f.legend(entries, lx, ly, lw, ncol=ncol)
    else:
        f.legend(entries, lx, ly, lw, ncol=1)
    f.save(out)
    print(out, f"{W}x{f.H}", "scales:", [round(p.s, 3) for p in panels])


# ---------------------------------------------------------------- F1 Home
def f1(outdir):
    ads = Panel(f"{SRC}/cropped/moling-ads-interstitial.jpeg", (0, 0, 1269, 920),
                "cropped/moling-ads-interstitial.jpeg  (three phone captures)")
    games = png("t7-games-tab.png")
    # phone capture; drop the black bars above and below the advert (rows 0-141, 1858-1999)
    launch = Panel(f"{SRC}/t1-launch-fullscreen-ad.png", (0, 142, 920, 1858),
                   "t1-launch-fullscreen-ad.png")

    def ann(f, l, a, g):
        # 1 full-screen advert on opening the app; the only exit is the small skip button
        f.ring(l, 865, 197, 40)
        f.marker(l, 1, (745, 197), to=[(825, 197)])
        # 1 full-screen interstitial advert (centre capture)
        f.box(a, 426, 67, 844, 854)
        f.marker(a, 1, (454, 34))
        # 2 rotating promotional banner, two different promos in the two captures
        f.box(a, 3, 108, 421, 212)
        f.marker(a, 2, (34, 142))
        f.box(a, 848, 108, 1266, 212)
        f.marker(a, 2, ("R", 36, 160), to=[(1266, 160)])
        # 3 floating "想去哪里" button covering the arrival column
        f.ring(a, 366, 655, 50)
        f.marker(a, 3, (304, 604))
        # 4 banner advert inside the list
        f.box(a, 886, 735, 1229, 794)
        f.marker(a, 4, ("R", 36, 764), to=[(1229, 764)])
        # 5 arrival minutes, no live/scheduled label (right capture column)
        f.box(a, 1194, 222, 1265, 590)
        f.marker(a, 5, ("R", 36, 406), to=[(1265, 406)])
        # 6 Games tab in the bottom navigation, and the Games screen it opens
        f.box(a, 293, 818, 348, 889)
        f.marker(a, 6, (320, 793))
        f.box(g, 397, 992, 461, 1075)
        f.marker(g, 6, (429, 963))

    entries = [
        (1, "Full-screen adverts: one as soon as the app opens, whose only exit is a small skip button (ringed); a bank advert (centre)"),
        (2, "Rotating quiz and promotion banner above the routes"),
        (3, "Floating 'Where to?' button (想去哪里) covers arrival times"),
        (4, "Banner advert inside the route list"),
        (5, "Arrival minutes with no Live / Scheduled label"),
        (6, "Games tab (游戏 / 遊戲) takes a slot in the main navigation"),
    ]
    build(f"{outdir}/F1-home-annotated.png", [launch, ads, games], [60, 110], ann, entries,
          ml=50, mr=50, ncol=2)


# ---------------------------------------------------------------- F2 Save
def f2(outdir):
    p1 = png("t2-stop-expanded-unlabelled-icons.png")
    p2 = png("t2-hidden-save-stop-menu.png")
    p3 = png("t2-favourites-after-save.png")
    p4 = png("t3-route-detail-map-mascots.png")

    def ann(f, a, b, c, d):
        # 1 four unlabelled round icons
        f.box(a, 9, 578, 67, 787)
        f.marker(a, 1, ("L", 38, 606), to=[(9, 606)])
        # 2 save hidden behind the "≡" icon ...
        f.ring(a, 38, 757, 22)
        f.marker(a, 2, ("L", 38, 757), to=[(16, 757)])
        # ... and the 收藏此車站 option it opens
        f.box(b, 56, 405, 516, 466)
        f.marker(b, 2, (530, 436))
        # 3 dark pop-up covering the screen
        f.box(b, 21, 299, 552, 774)
        f.marker(b, 3, (30, 292))
        # 4 decorative district text / "?" graphics beside the stop list
        f.box(a, 405, 560, 571, 789)
        f.marker(a, 4, (386, 574))
        f.box(a, 471, 906, 571, 971)
        f.marker(a, 4, (450, 917))
        # 5 saved stop: bare minutes, no live/scheduled label
        f.box(c, 467, 211, 559, 293)
        f.marker(c, 5, (513, 322))
        # 6 mascots covering stops on the map
        for cx, cy, r in [(162, 283, 53), (205, 387, 52), (313, 447, 50),
                          (514, 319, 51), (480, 359, 51)]:
            f.ring(d, cx, cy, r)
        f.marker(d, 6, (98, 228))

    entries = [
        (1, "Four stop tools shown only as unlabelled round icons"),
        (2, "Save is hidden behind the ≡ icon, which opens 收藏此車站 (Save this stop)"),
        (3, "Dark pop-up menu covers the route and stop list"),
        (4, "Decorative district text and \"?\" graphics compete with the stop list"),
        (5, "Saved stop shows minutes with no Live / Scheduled label"),
        (6, "Mascot graphics cover stops on the route map"),
    ]
    build(f"{outdir}/F2-save-annotated.png", [p1, p2, p3, p4], [70, 70, 70], ann,
          entries, ml=78, mr=40, ncol=2)


# ---------------------------------------------------------------- F3 Trip planning
def f3(outdir):
    p1 = png("t3-search-route-number-only.png")
    p2 = png("t4-planner-null-origin.png")
    p3 = png("t4-planner-ambiguous-stops.png")
    p4 = png("t4-planner-night-routes-daytime.png")
    p5 = png("t4-planner-ai-changes-stops.png")
    p6 = png("t4-planner-error-call-hotline.png")

    def ann(f, a, b, c, d, e, g):
        # 1 search box accepts route numbers only
        f.box(a, 5, 149, 569, 224)
        f.marker(a, 1, (44, 186))
        # 2 keypad covers the list
        f.box(a, 3, 598, 571, 981)
        f.marker(a, 2, (28, 602))
        # 3 origin "null (現在位置)"
        f.box(b, 79, 188, 282, 232)
        f.marker(b, 3, ("off", 282, 210, MR + 6, 0))
        # 4 nine look-alike results
        f.box(c, 6, 170, 568, 914)
        f.marker(c, 4, (40, 946))
        # 5 night routes in a daytime search
        f.box(d, 4, 555, 126, 601)
        f.box(d, 30, 663, 113, 707)
        f.box(d, 30, 769, 119, 815)
        f.marker(d, 5, (200, 685), to=[(96, 601), (113, 685), (96, 769)])
        # 6 AI changes boarding stop: origin entered vs. stop in the AI reply
        f.box(e, 79, 190, 292, 231)
        f.marker(e, 6, ("off", 292, 210, MR + 6, 0))
        f.box(e, 19, 520, 447, 756)
        f.marker(e, 6, ("off", 447, 540, MR + 6, 0))
        # 7 dead end: call the hotline
        f.box(g, 21, 409, 552, 664)
        f.marker(g, 7, (34, 404))

    entries = [
        (1, "Search box takes route numbers only (輸入路線號碼)"),
        (2, "Route keypad covers much of the screen and the list"),
        (3, "Origin field shows a raw \"null\" (現在位置) instead of the current location"),
        (4, "Nine look-alike 紅磡站 results, most told apart only by stop codes"),
        (5, "Overnight routes N368, N171, N122 ranked among the fastest; only a small clock icon on N368 hints it may not run"),
        (6, "AI 'Smart Suggestion' (智能建議) boards at HH602, not the HH979 entered, and does not say so"),
        (7, "Dead end: \"No route, call the hotline\" (未有路線)"),
    ]
    build(f"{outdir}/F3-trip-annotated.png", [p1, p2, p3, p4, p5, p6], [44] * 5, ann,
          entries, ml=40, mr=40, ncol=2, cap_fs=5.0)


# ---------------------------------------------------------------- F4 Nearby
def f4(outdir):
    p1 = png("t5-nearby-stop-code-entry.png")
    p2 = png("t5-nearby-landmarks-location-off.png")
    p3 = Panel(f"{SRC}/cropped/moling-nearby-landmarks.jpeg", (0, 0, 977, 1062),
               "cropped/moling-nearby-landmarks.jpeg  (team annotation kept as is)")

    def ann(f, a, b, c):
        # 1 stop code required
        f.box(a, 185, 165, 390, 389)
        f.marker(a, 1, ("off", 390, 280, MR + 6, 0))
        # 2 location off: one line of text, no alternative
        f.box(b, 51, 401, 523, 684)
        f.marker(b, 2, (58, 386))
        # 3 stops identified by codes
        f.box(c, 21, 131, 487, 197)
        f.marker(c, 3, (122, 224))
        # 4 number only, next to the existing team annotation
        f.marker(c, 4, (519, 447))

    entries = [
        (1, "Stop search asks for a stop code (請輸入車站號碼) on a letter keypad"),
        (2, "Location off: only the line 「定位資訊」尚未開啟, with no button to turn location on"),
        (3, "Nearby stops identified by codes (HH979, HH500 ...)"),
        (4, "Landmark rows show only a walking distance, no name or category"),
    ]
    build(f"{outdir}/F4-nearby-annotated.png", [p1, p2, p3], [80, 80], ann, entries,
          ml=50, mr=50, ncol=2)


# ---------------------------------------------------------------- F5 More
def f5(outdir):
    # iPhone capture, v2.3.39: the whole 26-item menu fits on screen
    p1 = Panel(f"{SRC}/t6-menu-grid-iphone-26-items.png", (0, 0, 920, 2000),
               "t6-menu-grid-iphone-26-items.png")
    p2 = png("t7-language-no-cancel.png")

    def ann(f, a, b):
        # 1 the 26-item grid
        f.box(a, 58, 572, 862, 1748)
        f.marker(a, 1, (858, 578))
        # 2 promotions / social media mixed in with service tools
        f.box(a, 279, 582, 429, 735)
        f.marker(a, 2, (452, 600))
        f.box(a, 279, 1250, 429, 1402)
        f.marker(a, 2, (452, 1268))
        f.box(a, 703, 1250, 853, 1402)
        f.marker(a, 2, (680, 1268))
        f.box(a, 279, 1417, 429, 1569)
        f.marker(a, 2, (452, 1435))
        # 3 no text-size option: bracket on the outer side of the whole menu
        x, y = f.bracket(a, "L", 572, 1748, 22)
        f.disc(x - MR + 4, y, 3)
        # 4 language pop-up, no cancel
        f.box(b, 21, 367, 552, 705)
        f.marker(b, 4, (36, 370))

    entries = [
        (1, "26 icons in one unsorted grid"),
        (2, "Promotions and social media (pet bus 寵物巴士, online shopping 網上購物, Facebook, AD HERE) mixed in with service tools"),
        (3, "No text-size or display setting among them"),
        (4, "Language pop-up (請選擇語言) with no Cancel button"),
    ]
    entries[1] = (2, "Promotions and social media (pet bus 寵物巴士, online shopping 網上購物, "
                     "Facebook, advertising enquiries 廣告查詢) mixed in with service tools")
    build(f"{outdir}/F5-more-annotated.png", [p1, p2], [80], ann, entries,
          ml=96, mr=50, legend="right", legend_w=960, legend_gap=90, max_scale=1.0)


# ---------------------------------------------------------------- F3b Picking a place (iPhone, v2.3.39)
def f3b(outdir):
    def ip(name):
        return Panel(f"{SRC}/{name}", (0, 0, 920, 2000), name)
    p1 = ip("t4-planner-iphone-null-origin.png")
    p2 = ip("t4-planner-iphone-pick-region.png")
    p3 = ip("t4-planner-iphone-pick-district-area.png")
    p4 = ip("t4-planner-iphone-pick-on-map.png")

    def ann(f, a, b, c, d):
        # 1 origin starts as "null (現在位置)"
        f.box(a, 112, 285, 420, 350)
        f.marker(a, 1, (480, 318), to=[(420, 318)])
        # 2 region list
        f.box(b, 6, 352, 914, 690)
        f.marker(b, 2, (40, 352))
        # the region chosen in step 1 (九龍) expands in place
        f.box(c, 6, 465, 914, 575)
        f.marker(c, 2, (790, 520))
        # 3 district, then area
        for y0, y1 in [(580, 690), (1152, 1262)]:
            f.box(c, 6, y0, 914, y1)
            f.marker(c, 3, (790, (y0 + y1) // 2))
        # 4 find the spot on the map, then 確認
        f.ring(d, 460, 1082, 50)
        f.marker(d, 4, (590, 980), to=[(495, 1047)])
        f.box(d, 230, 1755, 690, 1838)
        f.marker(d, 4, (740, 1797), to=[(690, 1797)])

    entries = [
        (1, "The origin starts as \"null (現在位置)\"; tapping it opens the picker"),
        (2, "Step 1: choose a region (地圖選點: 香港 / 九龍 / 新界); it expands in place"),
        (3, "Steps 2-3: choose a district, then an area (油尖旺 → 尖沙咀東/紅磡站)"),
        (4, "Step 4: find the spot on a map and press 確認"),
    ]
    build(f"{outdir}/F3b-pick-location-annotated.png", [p1, p2, p3, p4], [60] * 3, ann,
          entries, ml=50, mr=50, ncol=2)


if __name__ == "__main__":
    outdir = sys.argv[1]
    os.makedirs(outdir, exist_ok=True)
    which = sys.argv[2:] or ["F1", "F2", "F3", "F3b", "F4", "F5"]
    for k in which:
        {"F1": f1, "F2": f2, "F3": f3, "F3b": f3b, "F4": f4, "F5": f5}[k](outdir)

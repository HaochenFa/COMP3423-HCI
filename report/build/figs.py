"""Build the report figures in report/figures/final/.

usage: python3 figs.py [OUTDIR]   (default: ../figures/final)

Inputs: en-GB screen exports (402 x 874) in screens/, test results typed in from
user-test/participants.md and final-deliverables-plan.md (all checked against the
Maze PDF). Output: PNGs at 300 dpi in OUTDIR.
"""
import sys
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, Rectangle, Circle
from PIL import Image

HERE = Path(__file__).parent
SCR = HERE / "screens"
OUT = Path(sys.argv[1]) if len(sys.argv) > 1 else HERE.parent / "figures" / "final"
OUT.mkdir(parents=True, exist_ok=True)

plt.rcParams.update({
    "font.family": ["Arial", "Arial Unicode MS"],
    "font.size": 8,
    "axes.edgecolor": "#BBBBBB",
    "axes.linewidth": 0.6,
    "savefig.facecolor": "white",
})
INK, INK2, MUTED, RULE = "#1A1A1A", "#52514E", "#8A8A8A", "#D9D9D9"
RED = "#C8102E"
CM = 1 / 2.54


def screen(name):
    return Image.open(SCR / f"{name}.png").convert("RGB")


def framed(ax, img):
    ax.imshow(img)
    ax.set_xticks([]); ax.set_yticks([])
    for s in ax.spines.values():
        s.set_color("#C8C8C8"); s.set_linewidth(0.6)


# ---------------------------------------------------------------- journey map
def journey():
    stages = ["1  Opening the app", "2  Searching", "3  Reading and waiting", "4  Afterwards"]
    touch = ["Launch screen and\nfull-screen advert", "Route search, trip planner,\nnearby search", "Arrival list,\nroute detail", "Home screen,\nstop signs, other apps"]
    old = [-3, -3, -2, -3]
    com = [-3, -2, -3, -2]
    pain_old = [
        "Full-screen advert on launch;\nsuspects the app is a scam",
        "Search wants route numbers or\nstop IDs; keyboard covers ~85%\nof the screen; place names fail",
        "Small text; banner adverts\nappear over fares and times",
        "Gives up; goes back to stop\nsigns and asking people",
    ]
    pain_com = [
        "Forced 10–15 s advert with a\ntiny skip button; bus may leave",
        "Smart Search changes the\ndestination; saved routes are\nseveral menus deep",
        "Countdown jumps (5, then 8 min)\nand buses vanish unexplained",
        "Keeps using it reluctantly;\ntries third-party apps",
    ]
    principle = ["H3, H7, Fitts' law,\ndark patterns", "H6, H5, H2", "H1, H8,\nWCAG 1.4.4", "Lost trust"]
    feats = ["F1 Home", "F2, F3, F4", "F1, F2, F5", "All five"]

    fig = plt.figure(figsize=(17 * CM, 9.4 * CM), dpi=300)
    ax = fig.add_axes([0, 0, 1, 1]); ax.set_xlim(0, 170); ax.set_ylim(4, 98); ax.axis("off")
    x0, colw = 27, 35.5
    xs = [x0 + colw * i for i in range(4)]
    # row labels
    rows = [(93, "Stage"), (84.5, "Touchpoint"), (67, "Emotion"), (47, "Older\npassenger"),
            (34, "Student /\ncommuter"), (21.5, "Principles\nviolated"), (10.5, "Addressed by")]
    for y, t in rows:
        ax.text(2, y, t, ha="left", va="center", fontsize=7, color=INK2, fontweight="bold")
    for i, x in enumerate(xs):
        ax.add_patch(Rectangle((x + 0.6, 89.5), colw - 1.2, 7, fc="white", ec=INK, lw=0.8))
        ax.text(x + colw / 2, 93, stages[i], ha="center", va="center", fontsize=7.6, fontweight="bold", color=INK)
        ax.text(x + colw / 2, 84.5, touch[i], ha="center", va="center", fontsize=6.4, color=INK2, linespacing=1.15)
        ax.text(x + colw / 2, 47, pain_old[i], ha="center", va="center", fontsize=6.2, color=INK, linespacing=1.2)
        ax.text(x + colw / 2, 34, pain_com[i], ha="center", va="center", fontsize=6.2, color=INK, linespacing=1.2)
        ax.text(x + colw / 2, 21.5, principle[i], ha="center", va="center", fontsize=6.2, color=INK2, linespacing=1.15)
        ax.text(x + colw / 2, 10.5, feats[i], ha="center", va="center", fontsize=7, color=RED, fontweight="bold")
    for y in (80, 53.5, 40.5, 27.5, 16):
        ax.plot([2, 168], [y, y], color=RULE, lw=0.6)
    # emotion chart: 0 at y=76, -3 at y=58
    def ey(v):
        return 76 + v * (18 / 3)
    for v in (0, -1, -2, -3):
        ax.plot([x0, 168], [ey(v), ey(v)], color="#EEEEEE", lw=0.5, zorder=0)
        ax.text(x0 - 1, ey(v), f"{v}" if v else "0", ha="right", va="center", fontsize=5.8, color=MUTED)
    cx = [x + colw / 2 for x in xs]
    ax.plot(cx, [ey(v) + 0.5 for v in old], color=RED, lw=1.4, marker="o", ms=4, zorder=3)
    ax.plot(cx, [ey(v) - 0.5 for v in com], color="#2a78d6", lw=1.4, marker="s", ms=3.6, zorder=3, ls=(0, (4, 1.5)))
    for c, a, b in zip(cx, old, com):
        up_old = a >= b
        ax.text(c + 2.4, ey(a) + (2.2 if up_old else -2.2), f"{a}", color=RED, fontsize=6, ha="left", va="center", fontweight="bold")
        ax.text(c + 2.4, ey(b) + (-2.2 if up_old else 2.2), f"{b}", color="#2a78d6", fontsize=6, ha="left", va="center", fontweight="bold")
    ax.plot([x0 + 2, x0 + 7], [78, 78], color=RED, lw=1.4, marker="o", ms=3.5)
    ax.text(x0 + 8.5, 78, "Older passenger (observed)", fontsize=6, va="center", color=INK2)
    ax.plot([x0 + 44, x0 + 49], [78, 78], color="#2a78d6", lw=1.4, marker="s", ms=3, ls=(0, (4, 1.5)))
    ax.text(x0 + 50.5, 78, "Commuter (from app-store reviews)", fontsize=6, va="center", color=INK2)
    fig.savefig(OUT / "fig3-1-journey-map.png")
    plt.close(fig)


# ---------------------------------------------------------------- walkthrough
def strip_row(fig, top, names, captions, label, numbered=True, left=0.0, width=1.0):
    """One row of screens; each axes has exactly the screen's aspect ratio."""
    n = len(names)
    fw, fh = fig.get_size_inches()
    gap = 0.014
    w = (width - gap * (n - 1)) / n
    height = w * fw / fh * 874 / 402
    for i, (nm, cap) in enumerate(zip(names, captions)):
        x = left + i * (w + gap)
        ax = fig.add_axes([x, top - height, w, height])
        framed(ax, screen(nm))
        if numbered:
            fig.text(x, top + 0.006, f"{i + 1}", ha="left", va="bottom", fontsize=7, color="white", fontweight="bold",
                     bbox=dict(boxstyle="circle,pad=0.25", fc=INK, ec="none"))
        fig.text(x + w / 2, top - height - 0.01, cap, ha="center", va="top", fontsize=6.1, color=INK, linespacing=1.15)
    if label:
        fig.text(left, top + 0.045, label, ha="left", va="bottom", fontsize=7.6, fontweight="bold", color=INK)
    return height


def walkthrough():
    fig = plt.figure(figsize=(17 * CM, 14.4 * CM), dpi=300)
    a = ["O1", "F1", "F1A", "F2", "F2A", "M2", "F2D"]
    ac = ["O1 Welcome:\nthree promises,\nchoose language", "F1 Home: route 8,\nnext bus 5 min Live", "F1A Card expands\nin place", "F2 Route detail:\n☆ on every stop", "F2A Saved, with\nUndo toast", "M2 Alight alert\nset-up", "F2D Alert in\nprogress"]
    b = ["S4", "F3", "F3A", "F3C", "F5", "S2B", "F1-200"]
    bc = ["S4 Location off:\nsearch by place", "F3 Planner: origin\nis my location", "F3A Three options,\nRecommended first", "F3C Typo shown,\nwith Use my spelling", "F5 More: Text,\nVisual aids, Other", "S2B Text size\nat 200%", "F1 Home at the\nlargest text size"]
    strip_row(fig, 0.905, a, ac, "A   A commuter checks the bus and saves a stop", left=0.014, width=0.972)
    strip_row(fig, 0.415, b, bc, "B   An older passenger plans a trip by place name and enlarges the text", left=0.014, width=0.972)
    fig.savefig(OUT / "fig3-3-walkthrough.png")
    plt.close(fig)


# ---------------------------------------------------------------- style guide
def style_guide():
    fig = plt.figure(figsize=(17 * CM, 8.6 * CM), dpi=300)
    ax = fig.add_axes([0, 0, 1, 1]); ax.set_xlim(0, 170); ax.set_ylim(0, 86); ax.axis("off")
    ax.text(2, 83, "Colour", fontsize=7.6, fontweight="bold", va="top")
    sw = [("#C8102E", "Brand red", "header, route badges,\nprimary buttons, active tab"),
          ("#111111", "Ink", "titles, arrival minutes"),
          ("#696969", "Secondary grey", "streets, labels (5.49:1)"),
          ("#F5F5F5", "Background", "neutral containers"),
          ("#087A45", "Live", "on #E6F6EE (4.84:1)"),
          ("#9A4C00", "Scheduled / Diverted", "on #FFF1DF (5.55:1)")]
    for i, (hx, nm, use) in enumerate(sw):
        y = 74 - i * 11.5
        ax.add_patch(FancyBboxPatch((2, y - 4.2), 9, 8.4, boxstyle="round,pad=0,rounding_size=1.2", fc=hx, ec="#CCCCCC", lw=0.5))
        ax.text(13.5, y + 1.6, f"{nm}  {hx}", fontsize=6.4, fontweight="bold", va="center", color=INK)
        ax.text(13.5, y - 2.1, use, fontsize=5.8, va="center", color=INK2, linespacing=1.1)
    ax.text(50, 83, "Type (Noto Sans HK)", fontsize=7.6, fontweight="bold", va="top")
    ts = [("28 pt", "arrival minutes"), ("20 pt Bold", "section titles"), ("16 pt", "header, search"),
          ("15 pt", "card titles"), ("12 pt", "streets, labels"), ("11 pt", "badges, tab labels")]
    for i, (sz, use) in enumerate(ts):
        y = 75 - i * 8
        ax.text(50, y, sz, fontsize=6.6, fontweight="bold", va="center", color=INK)
        ax.text(65, y, use, fontsize=6.2, va="center", color=INK2)
    ax.text(50, 24, "Every arrival is the largest\ntext on its card. Status is\nalways written out, never\nshown by colour alone.",
            fontsize=6, color=INK2, va="top", linespacing=1.25)
    ax.text(90, 83, "Components (cropped from the en-GB screens)", fontsize=7.6, fontweight="bold", va="top")
    crops = [("F1", (0, 0, 402, 188), (90, 50, 168, 79)),
             ("F1", (16, 308, 386, 440), (90, 19, 127, 47)),
             ("F2A", (44, 434, 392, 502), (130, 37, 168, 47)),
             ("F2", (44, 582, 392, 640), (130, 27, 168, 34.5)),
             ("F2A", (18, 669, 388, 727), (130, 17.5, 168, 24.5)),
             ("F1", (0, 800, 402, 860), (96, 3, 162, 13.5))]
    for nm, box, (x1, y1, x2, y2) in crops:
        im = screen(nm).crop(box)
        sub = fig.add_axes([x1 / 170, y1 / 86, (x2 - x1) / 170, (y2 - y1) / 86])
        sub.imshow(im, aspect="auto" if False else "equal")
        sub.set_xticks([]); sub.set_yticks([])
        for s in sub.spines.values():
            s.set_color("#DDDDDD"); s.set_linewidth(0.5)
    fig.savefig(OUT / "fig3-4-style-guide.png")
    plt.close(fig)


# ---------------------------------------------------------------- after strips
AFTER = {
    "f1": (["F1", "F1A", "S6", "S7"],
           ["F1 Home: saved routes first,\nevery time labelled Live", "F1A Card expands in place:\njourney time, fare, stops", "S6 Offline: times from 10:32\nmarked Offline, with Retry", "S7 Black Rainstorm: route 8\nSuspended, 87D Diverted"]),
    "f2": (["F2", "F2A", "F1B", "F2B", "F2D"],
           ["F2 ☆ on every stop and a\nlabelled Save this stop", "F2A Stop saved, toast\nwith Undo, no dialog", "F1B Saved: my routes\nand my stops", "F2B Timetable by\ndirection and day", "F2D Alight alert:\n2 stops to go"]),
    "f3": (["F3", "F3A", "F3C", "S1"],
           ["F3 Origin preset to my\nlocation; place suggestions", "F3A Three options,\nRecommended first", "F3C Correction shown,\nUse my spelling or Correct", "S1 Error at the field,\nwith Search again"]),
    "f4": (["F4", "F4B", "F4C", "S4"],
           ["F4 Stops by walking time,\nstreet and next buses", "F4B Landmarks: category,\nnearest stop, buses", "F4C Map: numbered pins\nmatch the list", "S4 Location off: turn it on\nor search by place"]),
    "f5": (["F5", "S2A", "S2B", "M1"],
           ["F5 More: Text, Visual\naids, Other", "S2A Text size at 150%", "S2B Text size at 200%,\nA+ dimmed at the limit", "M1 Language sheet: three\nlanguages, closes with ×"]),
}


def after_strips():
    for key, (names, caps) in AFTER.items():
        n = len(names)
        h_cm = 8.6 if n == 4 else 7.3
        fig = plt.figure(figsize=(17 * CM, h_cm * CM), dpi=300)
        shot_h = 0.83
        # keep each screen at its own aspect: width in figure units
        w_cm = (shot_h * h_cm) * 402 / 874
        w = w_cm / 17
        gap = (1 - n * w) / (n - 1 + 1.0)
        for i, (nm, cap) in enumerate(zip(names, caps)):
            x = gap / 2 + i * (w + gap)
            ax = fig.add_axes([x, 1 - shot_h - 0.01, w, shot_h])
            framed(ax, screen(nm))
            fig.text(x + w / 2, 1 - shot_h - 0.035, cap, ha="center", va="top", fontsize=6.4, color=INK, linespacing=1.15)
        fig.savefig(OUT / f"fig4-{key}-after.png")
        plt.close(fig)


def a11y():
    names = ["F1", "F1-200", "S2", "S3"]
    caps = ["Home at the default size", "Home at the largest step:\nheadings 20 → 40 pt,\nroute names 15 → 22 pt", "S2 High contrast with\n200% text on More", "S3 Calm mode on:\nfewer animations and ads"]
    fig = plt.figure(figsize=(17 * CM, 9.2 * CM), dpi=300)
    n = 4; shot_h = 0.78; h_cm = 9.2
    w = (shot_h * h_cm * 402 / 874) / 17
    gap = (1 - n * w) / n
    for i, (nm, cap) in enumerate(zip(names, caps)):
        x = gap / 2 + i * (w + gap)
        ax = fig.add_axes([x, 1 - shot_h - 0.01, w, shot_h])
        framed(ax, screen(nm))
        fig.text(x + w / 2, 1 - shot_h - 0.035, cap, ha="center", va="top", fontsize=6.4, color=INK, linespacing=1.15)
    fig.savefig(OUT / "fig3-5-accessibility.png")
    plt.close(fig)


# ---------------------------------------------------------------- results chart
BLUE, AMBER = "#2a78d6", "#eda100"


def results():
    missions = [("Onboarding (O1–O2)", 9, 0, 0), ("Read Bus 8 info (F1)", 9, 0, 0), ("Save a stop (F2)", 2, 6, 1),
                ("Check saved stops (F2)", 7, 1, 1), ("Plan a trip (F3)", 8, 1, 0), ("Find nearby stops (F4)", 4, 5, 0),
                ("Open the map (F4)", 6, 3, 0), ("Find landmarks (F4)", 8, 0, 1), ("Enlarge text (F5)", 6, 3, 0)]
    comp = [("Next Bus 8", 9), ("Route 8 journey time", 7), ("Bus and walking time", 3), ("Which bus comes first", 8),
            ("Buses to the hospital", 9), ("Bus 116 at 200% text", 9)]
    ease = [("Read bus info", 4, 4, 1, 0), ("Save a stop", 3, 2, 2, 2), ("Search a route", 4, 5, 0, 0),
            ("Use Nearby", 3, 4, 2, 0), ("Adjust text size", 5, 2, 2, 0)]
    fig = plt.figure(figsize=(17 * CM, 9.4 * CM), dpi=300)

    def style(ax):
        for s in ("top", "right", "left"):
            ax.spines[s].set_visible(False)
        ax.tick_params(axis="y", length=0, labelsize=6.6, colors=INK)
        ax.tick_params(axis="x", length=2, labelsize=6, colors=INK2)
        ax.set_axisbelow(True)
        ax.grid(axis="x", color="#EEEEEE", lw=0.5)

    # (a) outcomes
    ax = fig.add_axes([0.17, 0.12, 0.30, 0.76])
    style(ax)
    ys = list(range(len(missions)))[::-1]
    for y, (nm, d, i, f) in zip(ys, missions):
        left = 0
        for v, c in ((d, BLUE), (i, AMBER), (f, RED)):
            if v:
                ax.barh(y, v - 0.08, left=left + 0.04, height=0.62, color=c, edgecolor="none")
                ax.text(left + v / 2, y, str(v), ha="center", va="center", fontsize=5.8,
                        color="white" if c != AMBER else INK, fontweight="bold")
            left += v
    ax.set_yticks(ys); ax.set_yticklabels([m[0] for m in missions])
    ax.set_xlim(0, 9); ax.set_xticks([0, 3, 6, 9])
    ax.set_title("(a) Task outcome by mission (participants, n = 9)", fontsize=7.4, loc="left", x=-0.53, fontweight="bold", color=INK)
    for k, (lab, c, dx) in enumerate((("Direct (expected path)", BLUE, 0.0), ("Indirect (another route)", AMBER, 0.135), ("Gave up", RED, 0.28))):
        fig.patches.append(Rectangle((0.02 + dx, 0.025), 0.011, 0.022, transform=fig.transFigure, fc=c, ec="none"))
        fig.text(0.034 + dx, 0.036, lab, fontsize=5.6, va="center", color=INK2)

    # (b) comprehension
    ax = fig.add_axes([0.70, 0.58, 0.27, 0.30])
    style(ax)
    ys = list(range(len(comp)))[::-1]
    for y, (nm, v) in zip(ys, comp):
        ax.barh(y, v, height=0.6, color=BLUE, edgecolor="none")
        ax.text(v + 0.15, y, f"{v}/9", va="center", fontsize=5.8, color=INK)
    ax.set_yticks(ys); ax.set_yticklabels([c[0] for c in comp])
    ax.set_xlim(0, 10.2); ax.set_xticks([0, 3, 6, 9])
    ax.set_title("(b) Comprehension questions answered correctly", fontsize=7.4, loc="left", x=-0.62, fontweight="bold", color=INK)

    # (c) ease (diverging Likert)
    LIK = [("Really easy", "#2a78d6"), ("Easy", "#8fb8ea"), ("Moderate", "#c9c8c3"), ("A little difficult", "#eb6834")]
    ax = fig.add_axes([0.70, 0.12, 0.27, 0.27])
    style(ax)
    ys = list(range(len(ease)))[::-1]
    for y, row in zip(ys, ease):
        left = 0
        for v, (lab, c) in zip(row[1:], LIK):
            if v:
                ax.barh(y, v - 0.08, left=left + 0.04, height=0.6, color=c, edgecolor="none")
                ax.text(left + v / 2, y, str(v), ha="center", va="center", fontsize=5.6,
                        color="white" if c in ("#2a78d6", "#eb6834") else INK, fontweight="bold")
            left += v
    ax.set_yticks(ys); ax.set_yticklabels([e[0] for e in ease])
    ax.set_xlim(0, 9); ax.set_xticks([0, 3, 6, 9])
    ax.set_title("(c) Ease ratings after each task", fontsize=7.4, loc="left", x=-0.62, fontweight="bold", color=INK)
    for k, (lab, c) in enumerate(LIK):
        fig.patches.append(Rectangle((0.555 + k * 0.105, 0.025), 0.011, 0.022, transform=fig.transFigure, fc=c, ec="none"))
        fig.text(0.569 + k * 0.105, 0.036, lab, fontsize=5.6, va="center", color=INK2)
    fig.savefig(OUT / "fig5-1-results.png")
    plt.close(fig)


def contact():
    order = ["O1", "O2", "S4", "F1", "F1A", "F1B", "F1C", "S5",
             "S6", "S7", "F2", "F2A", "F2B", "F2C", "M2", "F2D",
             "F3", "F3A", "F3C", "S1", "F4", "F4A", "F4B", "F4C",
             "F5", "M1", "S2A", "S2B", "S2C", "S2", "S3", "F1-200"]
    label = {"F1-200": "F1 at 200%"}
    fig = plt.figure(figsize=(17 * CM, 19.6 * CM), dpi=300)
    for r in range(4):
        strip_row(fig, 0.975 - r * 0.247, order[r * 8:(r + 1) * 8],
                  [label.get(n, n) for n in order[r * 8:(r + 1) * 8]], None, numbered=False, left=0.01, width=0.98)
    fig.savefig(OUT / "figE-all-screens.png")
    plt.close(fig)


if __name__ == "__main__":
    journey(); walkthrough(); style_guide(); after_strips(); a11y(); results(); contact()
    print("ok", sorted(p.name for p in OUT.glob("*.png")))

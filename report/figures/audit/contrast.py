import sys
from collections import Counter
from PIL import Image

D = sys.argv[1]

def lin(c):
    c = c / 255.0
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

def lum(rgb):
    r, g, b = rgb[:3]
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)

def ratio(a, b):
    la, lb = lum(a), lum(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)

def hx(c):
    return "#%02X%02X%02X" % tuple(c[:3])

# (id, file, box, what, kind)  kind: text | ui
ITEMS = [
    ("A", "t1-home-no-location.png", (215, 95, 355, 130), "Home header title 'APP 1933' (white on red)", "text"),
    ("U", "t1-home-no-location.png", (98, 92, 145, 112), "Home weather '31°C' (white on red)", "text"),
    ("B", "t1-home-no-location.png", (122, 412, 142, 432), "Home '往' (to) label before destination", "text"),
    ("C", "t1-home-no-location.png", (148, 400, 325, 435), "Home destination name", "text"),
    ("V", "t1-home-no-location.png", (478, 728, 528, 782), "Home floating '想去邊度' (white on red)", "text"),
    ("P1", "t4-planner-N368-no-service-clipped.png", (180, 700, 400, 728), "Planner '暫時沒有預定班次' (no scheduled service)", "text"),
    ("P2", "t4-planner-N368-no-service-clipped.png", (350, 802, 410, 824), "Planner walking distance '278 米'", "text"),
    ("P3", "t4-planner-N368-no-service-clipped.png", (35, 575, 145, 600), "Planner summary bar '車程 5 分鐘' (white on slate)", "text"),
    ("P4", "t4-planner-N368-no-service-clipped.png", (418, 620, 446, 725), "Planner vertical trivia '轉乘路線'", "text"),
    ("P5", "t4-planner-ambiguous-stops.png", (526, 196, 554, 222), "Planner result star icon vs white", "ui"),
    ("E", "t1-home-no-location.png", (25, 1050, 65, 1072), "Tab label, selected '主頁' (red on white)", "text"),
    ("D", "t1-home-no-location.png", (118, 1050, 165, 1072), "Tab label, unselected '收藏'", "text"),
    ("F", "t1-home-no-location.png", (118, 995, 165, 1045), "Tab icon outline vs white", "ui"),
    ("W", "t2-stop-expanded-unlabelled-icons.png", (70, 100, 370, 130), "Route detail title (white on red)", "text"),
    ("L", "t2-stop-expanded-unlabelled-icons.png", (113, 620, 200, 640), "Route detail fare '車資: $5.8'", "text"),
    ("J", "t2-stop-expanded-unlabelled-icons.png", (205, 650, 232, 680), "Route detail ETA number '5' (blue)", "text"),
    ("G", "t2-stop-expanded-unlabelled-icons.png", (295, 695, 395, 725), "Route detail '預定班次' (scheduled)", "text"),
    ("H", "t2-stop-expanded-unlabelled-icons.png", (415, 570, 445, 780), "Route detail vertical trivia text", "text"),
    ("I", "t2-stop-expanded-unlabelled-icons.png", (455, 755, 572, 785), "Route detail trivia caption '紅磡黃埔'", "text"),
    ("K", "t2-stop-expanded-unlabelled-icons.png", (15, 585, 60, 625), "Stop action icon (bell circle) vs white", "ui"),
    ("M", "t3-search-route-number-only.png", (195, 172, 375, 205), "Search placeholder '輸入路線號碼'", "text"),
    ("N", "t3-search-route-number-only.png", (125, 470, 460, 492), "Search operator note '大嶼山巴士 (資料由…)'", "text"),
    ("O", "t5-nearby-stop-code-entry.png", (200, 178, 375, 205), "Nearby instruction '請輸入車站號碼'", "text"),
    ("P", "t5-nearby-stop-code-entry.png", (88, 765, 165, 787), "Nearby mode button '鄰近車站' (white on grey)", "text"),
    ("Q", "t5-nearby-stop-code-entry.png", (410, 765, 487, 787), "Nearby mode button '鄰近地標' (white on grey)", "text"),
    ("Y", "t5-nearby-stop-code-entry.png", (248, 765, 325, 787), "Nearby mode button, selected '車站搜尋'", "text"),
    ("T", "t5-nearby-stop-code-entry.png", (28, 408, 62, 448), "Nearby keypad letter 'A' (enabled)", "text"),
    ("Z", "t5-nearby-stop-code-entry.png", (108, 408, 142, 448), "Nearby keypad letter 'B' (disabled)", "text"),
    ("R", "t2-favourites-after-save.png", (40, 158, 130, 182), "Saved section bar '收藏車站' (white on slate)", "text"),
    ("S", "t2-favourites-after-save.png", (508, 222, 552, 258), "Saved ETA '19' (blue)", "text"),
    ("X", "t2-favourites-after-save.png", (512, 264, 552, 284), "Saved ETA unit '分鐘'", "text"),
]

for iid, f, box, what, kind in ITEMS:
    im = Image.open(f"{D}/{f}").convert("RGB")
    px = list(im.crop(box).getdata())
    bg = Counter(px).most_common(1)[0][0]
    fg = max(px, key=lambda p: ratio(p, bg))
    r = ratio(fg, bg)
    need = 4.5 if kind == "text" else 3.0
    print(f"{iid}\t{f}\t{what}\tfg {hx(fg)}\tbg {hx(bg)}\t{r:.2f}:1\t{'pass' if r >= need else 'FAIL'} (needs {need}:1)")

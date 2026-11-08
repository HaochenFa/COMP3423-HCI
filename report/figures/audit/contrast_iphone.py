import sys
from collections import Counter
from PIL import Image

D = sys.argv[1]

def lin(c):
    c = c / 255.0
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

def lum(p):
    return 0.2126 * lin(p[0]) + 0.7152 * lin(p[1]) + 0.0722 * lin(p[2])

def ratio(a, b):
    la, lb = lum(a), lum(b)
    return (max(la, lb) + 0.05) / (min(la, lb) + 0.05)

def hx(c):
    return "#%02X%02X%02X" % tuple(c[:3])

ITEMS = [
    ("t5-nearby-iphone-no-stops.png", (265, 1060, 655, 1118), "Nearby empty state '鄰近沒有任何車站'", 4.5),
    ("t5-nearby-iphone-no-stops.png", (400, 1455, 520, 1492), "Nearby mode button '車站搜尋' (unselected)", 4.5),
    ("t5-nearby-iphone-no-stops.png", (638, 1455, 758, 1492), "Nearby mode button '鄰近地標' (unselected)", 4.5),
    ("t5-nearby-iphone-no-stops.png", (162, 1455, 280, 1492), "Nearby mode button '鄰近車站' (selected)", 4.5),
    ("t3-search-iphone-keypad-banner-ad.png", (325, 272, 595, 328), "Search placeholder '輸入路線號碼'", 4.5),
    ("t2-saved-iphone-empty-no-hint.png", (60, 252, 195, 292), "Saved section bar '收藏車站'", 4.5),
    ("t2-saved-iphone-empty-no-hint.png", (330, 360, 590, 398), "Saved empty state '沒有收藏任何車站'", 4.5),
    ("t1-home-iphone-no-nearby-stops-banner-ad.png", (360, 1095, 560, 1135), "Home empty state '附近沒有車站'", 4.5),
    ("t1-home-iphone-no-nearby-stops-banner-ad.png", (345, 160, 575, 215), "Header 'APP 1933' (white on red)", 4.5),
    ("t6-menu-grid-iphone-26-items.png", (320, 1830, 600, 1895), "More menu version text '程式版本'", 4.5),
]

for f, box, what, need in ITEMS:
    px = list(Image.open(f"{D}/{f}").convert("RGB").crop(box).getdata())
    bg = Counter(px).most_common(1)[0][0]
    others = sorted((p for p in px if ratio(p, bg) > 1.15), key=lambda p: ratio(p, bg), reverse=True)
    fg = others[0]
    robust = others[max(0, len(others) // 20)]  # 95th percentile of text pixels, ignores compression ringing
    r1, r2 = ratio(fg, bg), ratio(robust, bg)
    print(f"{what}\tbg {hx(bg)}\textreme {hx(fg)} {r1:.2f}:1\trobust {hx(robust)} {r2:.2f}:1\t{'pass' if r2 >= need else 'FAIL'}")

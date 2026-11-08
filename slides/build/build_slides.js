// Builds the COMP3423 App1933 presentation (Group A21) as a PPTX file.
//
// usage: python3 slide_figs.py && node build_slides.js [out.pptx]
//   default output: ../COMP3423_App1933_Presentation.pptx
//
// Slide text, speaker notes and chart data all live in this file. The
// annotated screenshots come from slide_figs.py (img/), the English screens
// from report/build/screens/, and every number from the Maze report and export
// (see report/build/part3.js and user-test/participants.md).
const fs = require("fs");
const path = require("path");
const pptxgen = require("pptxgenjs");
const JSZip = require("jszip");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const sharp = require("sharp");
const MD = require("react-icons/md");

const HERE = __dirname;
const REPO = path.resolve(HERE, "..", "..");
const IMG = (f) => path.join(HERE, "img", f);
const SCREEN = (c) => path.join(REPO, "report", "build", "screens", `${c}.png`);
const APP_ICON = path.join(REPO, "assets", "icon-app1933_gplay_512px.png");
const STRIP = path.join(REPO, "report", "figures", "iteration", "F3A-route-search-iteration-strip.png");
const OUT = process.argv[2] || path.resolve(HERE, "..", "COMP3423_App1933_Presentation.pptx");
const LAYOUT = JSON.parse(fs.readFileSync(IMG("layout.json"), "utf8"));

const FIGMA = "https://www.figma.com/design/2JkOkm1pztoaZask0fDJeq/APP1933-KMB.LWB-Redesign?node-id=0-1";
const PROTO = "https://www.figma.com/proto/2JkOkm1pztoaZask0fDJeq/APP1933-KMB.LWB-Redesign?node-id=26-1387&starting-point-node-id=26%3A1387";
const MAZE = "https://app.maze.co/report/Kowloon_bus_redesign/oBtJvOVQD-qXRtWj33TtgofbHD7gVvM9/intro";

// ------------------------------------------------------------------ theme
const THEME = {
  name: "App1933 Group A21",
  headFontFace: "Arial",
  bodyFontFace: "Arial",
  colors: {
    dk1: "1A1A1A",     // ink
    lt1: "FFFFFF",
    dk2: "595959",     // secondary text (7:1 on white)
    lt2: "F4F4F4",     // neutral panels
    accent1: "C8102E", // KMB brand red: highlights and key numbers
    accent2: "2B2B2B", // dark grey: main chart series
    accent3: "8C8C8C", // mid grey
    accent4: "D9D9D9", // rules and frames
    accent5: "087A45", // Live green (as in the app)
    accent6: "9A4C00", // Scheduled amber (as in the app)
    hlink: "C8102E",
    folHlink: "8E0B21",
  },
};
const HEX = THEME.colors;
const EASE = ["2B2B2B", "5E5E5E", "8C8C8C", "C8102E"]; // really easy .. a little difficult
const OUTCOME = ["2B2B2B", "8C8C8C", "C8102E"];         // direct, indirect, gave up

const W = 13.333, ML = 0.6, CW = W - 2 * ML;
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.title = "Re-designing App1933";
pres.subject = "COMP3423 Human Computer Interaction, group project presentation";
pres.author = "Group A21";
pres.company = "The Hong Kong Polytechnic University";
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
const C = pres.SchemeColor;
const K = { ink: C.text1, grey: C.text2, white: C.background1, panel: C.background2, red: C.accent1, dark: C.accent2, mid: C.accent3, rule: C.accent4 };

pres.defineSlideMaster({
  title: "TITLE",
  background: { color: HEX.lt1 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: ML, y: 2.3, w: 6.6, h: 0.95, fontSize: 44, bold: true, color: K.ink, align: "left", valign: "top", margin: 0 }, text: "" } },
  ],
});
pres.defineSlideMaster({
  title: "CONTENT",
  background: { color: HEX.lt1 },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: ML, y: 0.42, w: CW, h: 0.62, fontSize: 28, bold: true, color: K.ink, align: "left", valign: "top", margin: 0 }, text: "" } },
    { text: { text: "Re-designing App1933  ·  COMP3423 Group A21", options: { x: ML, y: 7.0, w: 6, h: 0.25, fontSize: 10, color: K.grey, margin: 0 } } },
  ],
  slideNumber: { x: W - ML - 0.8, y: 7.0, w: 0.8, h: 0.25, fontSize: 10, color: K.grey, align: "right", margin: 0 },
});

// ------------------------------------------------------------------ helpers
const pngSize = (file) => { const b = fs.readFileSync(file); return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) }; };

const LANG = "en-GB"; // British English for PowerPoint's spelling check

function text(slide, t, o) {
  slide.addText(t, { isTextBox: true, margin: 0, fontSize: 14, color: K.ink, valign: "top", lang: LANG, ...o });
}

function frame(slide, x, y, w, h) {
  slide.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: HEX.lt1, transparency: 100 }, line: { color: K.rule, width: 0.75 } });
}

// An image at height h with its natural aspect ratio; returns the width.
function picture(slide, file, x, y, h, alt, o = {}) {
  const s = pngSize(file);
  const w = (h * s.w) / s.h;
  slide.addImage({ path: file, x, y, w, h, altText: alt });
  if (o.frame !== false) frame(slide, x, y, w, h);
  return w;
}

// An image from slide_figs.py, placed so that its first screenshot's top-left
// corner is at (x, y) and every screenshot is panelH tall. Returns the right
// edge of the last screenshot.
function annotated(slide, name, x, y, panelH, alt) {
  const L = LAYOUT[name];
  const p0 = L.panels[0];
  const s = panelH / (p0[3] - p0[1]);
  const left = x - p0[0] * s, top = y - p0[1] * s;
  slide.addImage({ path: IMG(`${name}.png`), x: left, y: top, w: L.w * s, h: L.h * s, altText: alt });
  return left + L.panels[L.panels.length - 1][2] * s;
}

function disc(slide, n, x, y, d = 0.26, fill = K.red) {
  slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: { color: fill, width: 0.5 } });
  text(slide, String(n), { x, y, w: d, h: d, fontSize: 11, bold: true, color: K.white, align: "center", valign: "middle" });
}

// Numbered callout list matching the red discs on an annotated screenshot.
function numbered(slide, items, x, y, w, o = {}) {
  const cols = o.cols || 1, rowH = o.rowH || 0.44, gap = 0.3;
  const colW = (w - (cols - 1) * gap) / cols, per = Math.ceil(items.length / cols);
  items.forEach((t, i) => {
    const xx = x + Math.floor(i / per) * (colW + gap), yy = y + (i % per) * rowH;
    disc(slide, i + 1, xx, yy, 0.24);
    text(slide, t, { x: xx + 0.34, y: yy + 0.01, w: colW - 0.34, h: rowH, fontSize: o.fontSize || 12 });
  });
}

function chips(slide, list, x, y, maxW) {
  let cx = x, cy = y;
  for (const t of list) {
    const w = 0.3 + t.length * 0.074;
    if (cx + w > x + maxW) { cx = x; cy += 0.4; }
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: cy, w, h: 0.3, rectRadius: 0.08, fill: { color: K.panel }, line: { color: K.panel, width: 0.5 } });
    text(slide, t, { x: cx, y: cy, w, h: 0.3, fontSize: 11, align: "center", valign: "middle" });
    cx += w + 0.1;
  }
}

function stat(slide, big, label, x, y, w, o = {}) {
  const bh = o.bigH || 0.8;
  text(slide, big, { x, y, w, h: bh, fontSize: o.size || 44, bold: true, color: K.red, valign: "bottom" });
  text(slide, label, { x, y: y + bh + 0.06, w, h: o.labelH || 0.7, fontSize: o.labelSize || 14 });
}

function arrow(slide, x1, y1, x2, y2, o = {}) {
  slide.addShape(pres.shapes.LINE, {
    x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1), h: Math.abs(y2 - y1),
    flipH: x2 < x1, flipV: y2 < y1,
    line: { color: o.color || K.mid, width: o.width || 1.5, dashType: o.dash || "solid", endArrowType: o.head === false ? undefined : "triangle" },
  });
}

function rule(slide, x, y, w) {
  slide.addShape(pres.shapes.LINE, { x, y, w, h: 0, line: { color: K.rule, width: 0.75 } });
}

const iconCache = {};
async function icon(name, hex) {
  const key = name + hex;
  if (!iconCache[key]) {
    const svg = renderToStaticMarkup(React.createElement(MD[name], { color: `#${hex}`, size: 256 }));
    const png = await sharp(Buffer.from(svg)).png().toBuffer();
    iconCache[key] = `image/png;base64,${png.toString("base64")}`;
  }
  return iconCache[key];
}

async function iconCircle(slide, name, x, y, d) {
  slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: K.red }, line: { color: K.red, width: 0.5 } });
  const p = d * 0.22;
  slide.addImage({ data: await icon(name, HEX.lt1), x: x + p, y: y + p, w: d - 2 * p, h: d - 2 * p, altText: "" });
}

function content(section, title, notes) {
  const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: section });
  s.addText(title, { placeholder: "title", lang: LANG });
  if (notes) s.addNotes(notes);
  return s;
}

const chartText = { catAxisLabelFontFace: "Arial", valAxisLabelFontFace: "Arial", dataLabelFontFace: "Arial", legendFontFace: "Arial" };

// ------------------------------------------------------------------ feature slide
async function feature(o) {
  const s = content("Design", o.title, o.notes);
  const top = 1.78, PH = 3.5, AX = 6.95;
  text(s, [{ text: "Before", options: { bold: true } }, { text: `   ${o.beforeNote}`, options: { color: K.grey } }], { x: ML, y: 1.3, w: 6, h: 0.3, fontSize: 13 });
  text(s, [{ text: "After", options: { bold: true } }, { text: "   redesign, English prototype", options: { color: K.grey } }], { x: AX, y: 1.3, w: 5.8, h: 0.3, fontSize: 13 });

  const right = annotated(s, o.before, ML + 0.15, top, PH, o.beforeAlt);
  const twoCols = o.items.length > 3, rowH = twoCols ? 0.44 : 0.4;
  numbered(s, o.items, ML, top + PH + 0.24, 6.0, { cols: twoCols ? 2 : 1, rowH });
  if (o.extra) text(s, o.extra, { x: ML + 0.34, y: top + PH + 0.24 + o.items.length * rowH, w: 5.6, h: 0.3, fontSize: 12, color: K.grey });

  const ax = (right + AX) / 2 - 0.19;
  s.addImage({ data: await icon("MdArrowForward", HEX.accent3), x: ax, y: top + PH / 2 - 0.19, w: 0.38, h: 0.38, altText: "" });

  let x = AX;
  for (const [code, cap, file] of o.after) {
    const w = picture(s, SCREEN(file || code), x, top, PH, `${code}: ${cap}`);
    text(s, [{ text: `${code}  `, options: { bold: true } }, { text: cap, options: { color: K.grey } }], { x, y: top + PH + 0.1, w: 1.9, h: 0.6, fontSize: 11 });
    x += w + 0.3;
  }
  chips(s, o.principles, AX, 6.12, W - ML - AX);
  stat(s, o.stat[0], o.stat[1], 10.85, top - 0.1, W - ML - 10.85, { size: 48, bigH: 0.85, labelH: 1.0 });
  text(s, o.stat[2], { x: 10.85, y: top + 1.95, w: W - ML - 10.85, h: 1.3, fontSize: 12, color: K.grey });
}

// ================================================================== slides
async function build() {
  // 1 ---------------------------------------------------------------- title
  pres.addSection({ title: "Opening" });
  {
    const s = pres.addSlide({ masterName: "TITLE", sectionTitle: "Opening" });
    s.addText("Re-designing App1933", { placeholder: "title", lang: LANG });
    s.addImage({ path: APP_ICON, x: ML, y: 0.85, w: 0.8, h: 0.8, altText: "App1933 icon" });
    text(s, "COMP3423 Human Computer Interaction  ·  Group A21", { x: ML, y: 1.85, w: 6.6, h: 0.35, fontSize: 14, color: K.grey });
    text(s, "A new interface for KMB and LWB bus passengers, built around one question: when is my bus coming?", { x: ML, y: 3.3, w: 6.2, h: 0.95, fontSize: 18, color: K.grey });
    const team = [["Haochen Fa", "Project Lead & UX Strategist"], ["Chenyang Zhang", "User Researcher"], ["Xulu Zhang", "Interaction Designer"], ["Li-En Lo", "Visual & UI Designer"], ["Moling Kong", "Accessibility & Evaluation Lead"]];
    team.forEach(([n, r], i) => {
      text(s, n, { x: ML, y: 4.6 + i * 0.34, w: 1.9, h: 0.3, fontSize: 13, bold: true });
      text(s, r, { x: ML + 1.9, y: 4.6 + i * 0.34, w: 4.4, h: 0.3, fontSize: 13, color: K.grey });
    });
    text(s, "The Hong Kong Polytechnic University  ·  Semester 1, 2026/27", { x: ML, y: 6.6, w: 6.6, h: 0.3, fontSize: 12, color: K.grey });
    const h = 5.5, w = (h * 402) / 874;
    picture(s, SCREEN("F1"), W - ML - 2 * w - 0.3, 1.0, h, "Redesigned Home screen");
    picture(s, SCREEN("F3A"), W - ML - w, 1.0, h, "Redesigned trip results screen");
    s.addNotes("Presenter: Haochen Fa (Project Lead) · about 10 seconds.\n\nHello, we are Group A21. Our project redesigns App1933, the official app of KMB and Long Win Bus. Each of us will present the part we led.");
  }

  // 2 ---------------------------------------------------------------- users
  pres.addSection({ title: "Problem and users" });
  {
    const s = content("Problem and users", "Two groups of passengers, one question",
      "Presenter: Haochen Fa · about 30 seconds.\n\nMost people open App1933 for one reason: to see when their bus is coming. We designed for two groups. Older passengers often know where they are going but not the route number, and small text and sudden adverts put them off. Students and commuters are confident users who are short of time and often use the phone with one hand. Research on real-time information shows it shortens waits when riders trust it, though satisfaction rose less among older riders.");
    text(s, "When is my bus\ncoming?", { x: ML, y: 1.5, w: 5.9, h: 1.3, fontSize: 40, bold: true });
    text(s, "Most people open App1933, the official app of Kowloon Motor Bus and Long Win Bus, to answer that question. Less often they look up a route, plan a trip or look for a stop nearby.", { x: ML, y: 3.05, w: 5.6, h: 1.3, fontSize: 16, color: K.grey });
    text(s, "Real-time arrival times help when riders trust them: riders who used them waited almost two minutes less (Watkins et al., 2011). Satisfaction rose less among older riders (Ferris et al., 2010).", { x: ML, y: 4.55, w: 5.6, h: 1.1, fontSize: 14 });
    text(s, "We studied v2.3.38 for iOS and checked it on an iPhone running v2.3.39.", { x: ML, y: 6.35, w: 5.6, h: 0.3, fontSize: 12, color: K.grey });
    const cards = [
      ["MdElderly", "Older passengers", ["Know places, not route numbers or stop codes", "Find small text hard to read", "May take a sudden full-screen advert for a scam"]],
      ["MdDirectionsWalk", "Students and daily commuters", ["Confident phone users, short of time", "Often use the phone one-handed while walking", "Want their usual route and its next bus at once"]],
    ];
    for (const [i, [ic, head, lines]] of cards.entries()) {
      const x = 6.9, y = 1.35 + i * 2.7, w = W - ML - x;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h: 2.45, rectRadius: 0.12, fill: { color: K.panel }, line: { color: K.panel, width: 0.5 } });
      await iconCircle(s, ic, x + 0.35, y + 0.35, 0.8);
      text(s, head, { x: x + 1.4, y: y + 0.35, w: w - 1.7, h: 0.45, fontSize: 18, bold: true });
      text(s, lines.map((t, k) => ({ text: t, options: { bullet: true, breakLine: k < lines.length - 1 } })), { x: x + 1.4, y: y + 0.9, w: w - 1.7, h: 1.4, fontSize: 14, paraSpaceAfter: 6 });
    }
  }

  // 3 ---------------------------------------------------------------- pain points
  {
    const s = content("Problem and users", "Today, both groups work hard for that answer",
      "Presenter: Haochen Fa · about 40 seconds.\n\nThese are real screenshots of the current app. It opens on a full-screen advert with a tiny skip button. Search only accepts route numbers. Saving a stop takes seven taps through an unlabelled icon and a pop-up. And the menu is 26 unsorted icons, none of which changes the text size; the app also ignores the iPhone's own text-size setting.");
    const colW = CW / 4, top = 1.35, h = 3.85;
    const cols = [
      ["launch-ring", "An advert comes first", "On opening, a full-screen advert whose only exit is a skip button about 6% of the screen wide."],
      ["crop-search.png", "Route numbers only", "Search accepts route numbers, so a passenger who knows the place but not the bus cannot start."],
      ["crop-save-menu.png", "Seven taps to save a stop", "Save is hidden behind an unlabelled icon and a dark pop-up menu."],
      ["crop-menu-grid.png", "26 unsorted icons", "None changes the text size, and the app ignores the iPhone's own text size."],
    ];
    cols.forEach(([f, head, line], i) => {
      const x = ML + i * colW;
      if (f.endsWith(".png")) picture(s, IMG(f), x, top, h, head);
      else annotated(s, f, x, top, h, head);
      text(s, head, { x, y: top + h + 0.18, w: colW - 0.3, h: 0.35, fontSize: 15, bold: true });
      text(s, line, { x, y: top + h + 0.55, w: colW - 0.3, h: 0.9, fontSize: 13, color: K.grey });
    });
    text(s, "Real screenshots: App1933 v2.3.38 on a Mac, and v2.3.39 on an iPhone (advert and menu, 8 Nov 2026).", { x: ML, y: 6.62, w: CW, h: 0.28, fontSize: 11, color: K.grey });
  }

  // 4 ---------------------------------------------------------------- journey map
  {
    const s = content("Problem and users", "Both journeys bottom out at launch and at search",
      "Presenter: Chenyang Zhang (User Researcher) · about 50 seconds.\n\nOur journey map follows both groups through four stages. The older passenger's track comes from observation, the commuter's from app-store reviews. Both reach their lowest point at launch, where an advert stands between them and the arrival time, and at search, where the app wants route numbers or stop codes and its smart suggestion can change what they typed. Reading arrival times is a smaller dip. The bottom row shows which feature answers each stage.");
    const LW = 1.95, x0 = ML + LW, sw = (CW - LW) / 4;
    const stages = ["Opening the app", "Searching", "Reading and waiting", "Afterwards"];
    stages.forEach((t, i) => {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x0 + i * sw + 0.06, y: 1.3, w: sw - 0.12, h: 0.48, rectRadius: 0.08, fill: { color: K.panel }, line: { color: K.panel, width: 0.5 } });
      text(s, `${i + 1}   ${t}`, { x: x0 + i * sw + 0.06, y: 1.3, w: sw - 0.12, h: 0.48, fontSize: 14, bold: true, align: "center", valign: "middle" });
    });
    // emotion curves, drawn to scale: 0 (neutral) to -3 (very negative)
    const y0 = 2.2, unit = 0.4, cx = (i) => x0 + (i + 0.5) * sw, cy = (v) => y0 - v * unit;
    text(s, "Emotion", { x: ML, y: 2.05, w: LW, h: 0.3, fontSize: 13, bold: true });
    for (const v of [0, -3]) {
      rule(s, x0, cy(v), CW - LW);
      text(s, v === 0 ? "0" : "−3", { x: x0 - 0.45, y: cy(v) - 0.12, w: 0.35, h: 0.24, fontSize: 10, color: K.grey, align: "right" });
    }
    const older = [-3, -3, -2, -3], commuter = [-3, -2, -3, -2];
    for (let i = 0; i < 3; i++) {
      arrow(s, cx(i), cy(commuter[i]), cx(i + 1), cy(commuter[i + 1]), { color: K.dark, width: 2, dash: "dash", head: false });
      arrow(s, cx(i), cy(older[i]), cx(i + 1), cy(older[i + 1]), { color: K.red, width: 2.25, head: false });
    }
    for (let i = 0; i < 4; i++) {
      s.addShape(pres.shapes.RECTANGLE, { x: cx(i) - 0.07, y: cy(commuter[i]) - 0.07, w: 0.14, h: 0.14, fill: { color: K.dark }, line: { color: K.white, width: 1 } });
      s.addShape(pres.shapes.OVAL, { x: cx(i) - 0.085, y: cy(older[i]) - 0.085, w: 0.17, h: 0.17, fill: { color: K.red }, line: { color: K.white, width: 1 } });
      const oAbove = older[i] >= commuter[i];
      const lab = (v, above) => text(s, `−${-v}`, { x: cx(i) + 0.12, y: above ? cy(v) - 0.36 : cy(v) + 0.08, w: 0.4, h: 0.26, fontSize: 11, bold: true });
      lab(older[i], oAbove);
      lab(commuter[i], !oAbove);
    }
    arrow(s, ML, 2.55, ML + 0.35, 2.55, { color: K.red, width: 2.25, head: false });
    text(s, "Older passenger (observed)", { x: ML + 0.45, y: 2.43, w: LW - 0.5, h: 0.4, fontSize: 10, color: K.grey });
    arrow(s, ML, 3.05, ML + 0.35, 3.05, { color: K.dark, width: 2, dash: "dash", head: false });
    text(s, "Commuter (app-store reviews)", { x: ML + 0.45, y: 2.93, w: LW - 0.5, h: 0.4, fontSize: 10, color: K.grey });
    const rows = [
      ["Older passenger", ["Full-screen advert on launch; suspects the app is a scam", "Asked for route numbers or stop IDs; place names fail", "Small text; banner adverts over fares and times", "Gives up; goes back to stop signs and asking people"]],
      ["Student / commuter", ["Forced 10–15 s advert with a tiny skip button", "Smart Search changes the destination", "Countdown jumps (5, then 8 min); buses vanish unexplained", "Keeps using it reluctantly; tries other apps"]],
    ];
    rows.forEach(([head, cells], r) => {
      const y = 3.85 + r * 0.9;
      rule(s, ML, y - 0.1, CW);
      text(s, head, { x: ML, y, w: LW - 0.1, h: 0.7, fontSize: 13, bold: true });
      cells.forEach((t, i) => text(s, t, { x: x0 + i * sw + 0.1, y, w: sw - 0.25, h: 0.75, fontSize: 13 }));
    });
    rule(s, ML, 5.6, CW);
    text(s, "Addressed by", { x: ML, y: 5.72, w: LW, h: 0.35, fontSize: 13, bold: true });
    ["F1 Home", "F2, F3, F4", "F1, F2, F5", "All five"].forEach((t, i) => text(s, t, { x: x0 + i * sw + 0.1, y: 5.7, w: sw - 0.2, h: 0.35, fontSize: 15, bold: true, color: K.red }));
    text(s, "Dual-track journey map from our checkpoint research. Emotion runs from 0 (neutral) to −3 (very negative).", { x: ML, y: 6.5, w: CW, h: 0.28, fontSize: 11, color: K.grey });
  }

  // 5 ---------------------------------------------------------------- five tabs
  pres.addSection({ title: "Design" });
  {
    const s = content("Design", "Five tabs, each answering one question",
      "Presenter: Xulu Zhang (Interaction Designer) · about 20 seconds.\n\nWe cut the navigation to five labelled tabs, and each one answers a single question. Route detail is a shared screen: it opens the same way from Home, Saved, Nearby and Landmarks. Every screen keeps the tab bar, so you are always one tap from a known place.");
    const tabs = [["F1", "Home", "When is my usual bus coming?"], ["F3", "Trip", "How do I get to a place?"], ["F4", "Nearby", "What can I catch from here?"], ["F1B", "Saved", "Where are my routes and stops?"], ["F5", "More", "How do I change text size or language?"]];
    const colW = CW / 5, h = 3.8, sw = (h * 402) / 874;
    tabs.forEach(([code, name, q], i) => {
      const x = ML + i * colW + (colW - sw) / 2;
      picture(s, SCREEN(code), x, 1.3, h, `${name} tab (${code})`);
      text(s, name, { x, y: 5.22, w: colW - 0.2, h: 0.35, fontSize: 16, bold: true });
      text(s, q, { x, y: 5.58, w: colW - 0.25, h: 0.6, fontSize: 13, color: K.grey });
    });
    text(s, "This replaces six bottom-bar items and a menu of 26 unsorted icons. Route detail opens from Home, Saved, Nearby and Landmarks, so a route looks and behaves the same wherever it is tapped.", { x: ML, y: 6.3, w: CW, h: 0.55, fontSize: 13 });
  }

  // 6 ---------------------------------------------------------------- visual language
  {
    const s = content("Design", "Red is for actions; status is always written out",
      "Presenter: Li-En Lo (Visual & UI Designer) · about 15 seconds.\n\nWe kept KMB's red but use it only where you can act: the header, route badges, primary buttons and the active tab. Content sits on white and light grey, arrival minutes are the largest text on each card, and every status is written out, never shown by colour alone.");
    text(s, "Colour", { x: ML, y: 1.3, w: 4, h: 0.35, fontSize: 15, bold: true });
    const sw = [
      ["C8102E", "Brand red  #C8102E", "Header, route badges, primary buttons, active tab · white text 5.88:1"],
      ["111111", "Ink  #111111", "Titles and arrival minutes"],
      ["696969", "Secondary grey  #696969", "Streets and labels · 5.49:1"],
      ["F5F5F5", "Background  #F5F5F5", "Neutral containers"],
      ["087A45", "Live  #087A45", "On #E6F6EE · 4.84:1"],
      ["9A4C00", "Scheduled / Diverted  #9A4C00", "On #FFF1DF · 5.55:1"],
    ];
    sw.forEach(([hex, name, use], i) => {
      const y = 1.8 + i * 0.76;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: ML, y, w: 0.55, h: 0.55, rectRadius: 0.06, fill: { color: hex }, line: { color: hex === "F5F5F5" ? K.rule : hex, width: 0.75 } });
      text(s, name, { x: ML + 0.75, y: y - 0.02, w: 3.7, h: 0.3, fontSize: 14, bold: true });
      text(s, use, { x: ML + 0.75, y: y + 0.27, w: 3.7, h: 0.45, fontSize: 11, color: K.grey });
    });
    const tx = 5.25;
    text(s, "Type  ·  Noto Sans HK", { x: tx, y: 1.3, w: 2.8, h: 0.35, fontSize: 15, bold: true });
    [[28, false, "Arrival minutes"], [20, true, "Section titles"], [16, false, "Header, search"], [15, false, "Card titles"], [12, false, "Streets, labels"], [11, false, "Badges, tab labels"]].forEach(([pt, b, use], i) => {
      const y = 1.8 + i * 0.6;
      text(s, `${pt} pt`, { x: tx, y, w: 1.2, h: 0.5, fontSize: pt, bold: b, valign: "middle" });
      text(s, use, { x: tx + 1.25, y, w: 1.6, h: 0.5, fontSize: 12, color: K.grey, valign: "middle" });
    });
    text(s, "Every arrival time is the largest text on its card. Status is always written out, never shown by colour alone.", { x: tx, y: 5.55, w: 2.75, h: 1.2, fontSize: 13 });
    const cx = 8.45, cw = 3.6;
    text(s, "Components (English screens)", { x: cx, y: 1.3, w: W - ML - cx, h: 0.35, fontSize: 15, bold: true });
    let y = 1.8;
    for (const [f, alt] of [["comp-header", "Header with logo, language button and search"], ["comp-route-card", "Saved route card with the next bus and a Live label"], ["comp-arrivals", "Arrival tiles, Live and Scheduled"], ["comp-save-button", "Primary button: Save this stop"]]) {
      const L = LAYOUT[f], h = (cw * L.h) / L.w;
      s.addImage({ path: IMG(`${f}.png`), x: cx, y, w: cw, h, altText: alt });
      y += h + 0.14;
    }
  }

  // 7-11 ------------------------------------------------------------ features
  await feature({
    title: "F1 Home: the next bus first, not an advert",
    before: "before-F1", beforeNote: "App1933 on an iPhone (v2.3.39)", beforeAlt: "Launch advert and Home in the existing app, annotated",
    items: ["Advert on opening; only a small skip button", "Rotating quiz and promotion banner", "Floating button covers arrival times", "Banner advert inside the route list", "Minutes not labelled Live or Scheduled"],
    after: [["F1", "Home: saved routes first, every time labelled"], ["S6", "Offline: old times marked, with Retry"]],
    principles: ["H7 Flexibility and efficiency", "H1 Visibility of system status", "H3 User control", "H8 Minimalist design"],
    stat: ["9/9", "read the next Bus 8 correctly", "8 of 9 rated reading bus information easy or really easy."],
    notes: "Presenter: Li-En Lo · about 15 seconds.\n\nBefore: an advert on opening, a promotion banner, a floating button over the times, and minutes with no sign of whether they are live. After: Home opens on your saved routes with the next bus in the largest type, every time is labelled Live or Scheduled, and the offline state says plainly that the times are old. All nine participants read the next Bus 8 correctly.",
  });
  await feature({
    title: "F2 Save: a star on every stop, and Undo",
    before: "before-F2", beforeNote: "App1933 v2.3.38", beforeAlt: "Saving a stop in the existing app, annotated",
    items: ["Four stop tools shown as unlabelled round icons", "Save hides behind one of them, in a menu", "A dark pop-up covers the stop list"],
    extra: "Seven taps from Home to save a stop, in our count.",
    after: [["F2", "Route detail: a star on every stop, a Save button"], ["F2A", "Saved: the star fills, Undo in a toast"]],
    principles: ["H6 Recognition rather than recall", "Fitts' law", "H3 Undo", "Visible signifiers"],
    stat: ["8/9", "saved the stop", "But only 2 of 9 found the expected way to the route screen. More on this in the results."],
    notes: "Presenter: Xulu Zhang · about 15 seconds.\n\nBefore: four unlabelled icons, with Save hidden behind one of them in a pop-up menu. After: every stop has a large star, the nearest stop has a labelled Save button, and saving shows an Undo toast instead of a dialog. Eight of nine saved the stop, but only two found the expected way to the route screen; we come back to that in the results.",
  });
  await feature({
    title: "F3 Trip: search by place, starting from here",
    before: "before-F3", beforeNote: "App1933 v2.3.38", beforeAlt: "Search and the trip planner in the existing app, annotated",
    items: ["Search takes route numbers only", "The keypad covers most of the screen", "The suggestion boards at HH602, not the HH979 you entered, and does not say so"],
    after: [["F3", "Origin preset to your location"], ["F3A", "Recommended option first, with legs and next bus"]],
    principles: ["H2 Match with the real world", "H6 Recognition", "H5 Error prevention", "H3 User control"],
    stat: ["8/9", "planned the trip by the expected path", "All 9 succeeded, and all 9 rated route search easy or really easy."],
    notes: "Presenter: Xulu Zhang · about 15 seconds.\n\nBefore: search by route number only, a keypad over most of the screen, and a smart suggestion that quietly boards you at a different stop. The planner's origin even starts as \"null\". After: the origin is preset to your location, you type a place name, and suggestions show the type and street of each place. All nine planned the trip, eight by the expected path.",
  });
  await feature({
    title: "F4 Nearby: stops by street and walking time",
    before: "before-F4", beforeNote: "App1933 v2.3.38", beforeAlt: "Nearby in the existing app, annotated",
    items: ["Stop search asks for a stop code on a letter keypad", "Location off: one line of text and no way forward"],
    after: [["F4", "Stops with walking time, street and next buses"], ["F4B", "Landmarks with their category and buses"]],
    principles: ["H2 Match with the real world", "H6 Recognition", "H9 Recover from errors", "H4 Consistent list and map"],
    stat: ["9/9", "named both buses to Queen Elizabeth Hospital", "All 9 found a nearby stop, and 8 of 9 picked the first bus correctly."],
    notes: "Presenter: Li-En Lo · about 15 seconds.\n\nBefore: Nearby asks for a stop code, and with location off it shows one line of text and no way forward. After: each stop shows walking time, street and the next buses, and the Landmarks filter lists places with the buses that serve them. All nine named both buses to Queen Elizabeth Hospital.",
  });
  await feature({
    title: "F5 More: grouped settings, text up to 200%",
    before: "before-F5", beforeNote: "App1933 v2.3.39 (iPhone) and v2.3.38", beforeAlt: "The More menu and language pop-up in the existing app, annotated",
    items: ["26 icons in one unsorted grid", "Promotions and social media among service tools", "No text-size or display setting", "Language pop-up with no Cancel"],
    after: [["F5", "More: Text, Visual aids and Other"], ["F1", "Home at 200%: headings double, body about 1.5×", "F1-200"]],
    principles: ["Hick's law", "H8 Minimalist design", "H3 User control", "WCAG 1.4.4 Resize text"],
    stat: ["9/9", "read the next Bus 116 at the largest text size", "7 of 9 went to More as their very first move."],
    notes: "Presenter: Moling Kong (Accessibility & Evaluation Lead) · about 15 seconds.\n\nBefore: 26 unsorted icons mixing promotions with service tools, no text-size setting, and a language pop-up with no Cancel. After: three headed groups, with text size at the top of More. The steps are labelled 100, 150 and 200 percent; at the largest step headings double and body text grows about one and a half times. All nine read the next Bus 116 at that size.",
  });

  // 12 --------------------------------------------------------------- accessibility
  {
    const s = content("Design", "Accessibility: audited before, measured after",
      "Presenter: Moling Kong · about 25 seconds.\n\nWe audited the original app against four WCAG basics. The clearest failure is text size: with the iPhone's Larger Text at maximum, Home stays exactly the same size, to the pixel. In the redesign, almost all text meets 4.5 to 1, no link is smaller than 24 points, and 86 percent reach 44. We could not test a screen reader in Figma, so labels are specified in the design only.");
    const PH = 3.75, pw = PH * 0.46;
    [["a11y-home-before", "Home, 21:23", "default text size"], ["a11y-setting", "iOS Larger Text", "slider at maximum"], ["a11y-home-after", "Home, 21:32", "after the change"]].forEach(([f, a, b], i) => {
      const x = ML + i * (pw + 0.28);
      text(s, [{ text: a, options: { bold: true, breakLine: true } }, { text: b, options: { color: K.grey } }], { x, y: 1.25, w: pw + 0.2, h: 0.48, fontSize: 12 });
      annotated(s, f, x, 1.82, PH, `${a}, ${b}`);
    });
    text(s, "The boxed text is the same size to the pixel before and after: App1933 ignores the iPhone's text size (WCAG 1.4.4). iPhone, v2.3.39, 8 Nov 2026.", { x: ML, y: 5.75, w: 3 * pw + 0.56, h: 0.75, fontSize: 12, color: K.grey });
    const tx = 6.95, tw = W - ML - tx;
    const hd = (t) => ({ text: t, options: { bold: true, fill: { color: HEX.lt2 } } });
    const rows = [
      [hd("Check"), hd("Original app"), hd("Redesign")],
      ["Contrast (1.4.3)", "Search hint 1.4:1; Nearby buttons 1.9:1", "1,155 of 1,169 text layers at 4.5:1 or more"],
      ["Target size (2.5.8)", "Stop icons 26 pt; advert skip button about 24 pt", "None of 98 links under 24 pt; 84 (86%) at 44 pt or more"],
      ["Text size (1.4.4)", "No setting, and the phone's size is ignored", "100%, 150% and 200% steps at the top of More"],
      ["Arrival status", "Live and timetable minutes look the same", "Live, Scheduled and Offline written out, not colour alone (1.4.1)"],
      ["Screen reader", "Most content not exposed to assistive technology", "Labels specified in the design only; not tested"],
    ];
    const line = { type: "solid", pt: 0.75, color: HEX.accent4 }, none = { type: "none" };
    s.addTable(rows.map((r, i) => r.map((c) => (typeof c === "string" ? { text: c, options: { bold: false } } : c)).map((c, j) => ({ ...c, options: { ...c.options, lang: LANG, bold: c.options.bold || j === 0, border: [i === 0 ? line : none, none, line, none] } }))),
      { x: tx, y: 1.3, w: tw, colW: [1.5, 2.1, tw - 3.6], fontSize: 12, fontFace: "Arial", color: HEX.dk1, margin: [5, 6, 5, 6], valign: "middle" });
    stat(s, "9/9", "read the next Bus 116 at 200% text in the test", tx, 5.0, 2.6, { size: 36, bigH: 0.6, labelH: 0.6 });
    text(s, "Redesign figures were computed by script from the Figma file, so they are close estimates rather than a formal audit.", { x: tx + 2.9, y: 5.25, w: tw - 2.9, h: 0.9, fontSize: 11, color: K.grey });
  }

  // 13 --------------------------------------------------------------- walkthrough
  {
    const s = content("Design", "Live walkthrough of the tested prototype",
      "Presenter: Xulu Zhang · about 1 minute 40 seconds.\n\nSwitch to Figma. Open the prototype in Present mode with the iPhone device frame and start the flow \"First launch (en-GB)\".\n\nScenario A: tap Get started, allow location, expand route 8 on Home, open the full route, save Cross Harbour Tunnel, then tap Undo.\n\nScenario B: open Trip, tap the Argyle Centre suggestion and look at the recommended result; open Nearby and choose Landmarks; then open More, press A+ twice and go back to Home.\n\nScreens do not scroll in Present mode, so stay on what is visible.");
    const rows = [
      ["A", "Commuter", "Check the bus, then save a stop and undo it", [["O1", "Welcome"], ["F1", "Home"], ["F1A", "Expand route 8"], ["F2", "Route detail"], ["F2A", "Save, then Undo"]]],
      ["B", "Older passenger", "Plan by place name, find a landmark, enlarge the text", [["F3", "Plan a trip"], ["F3A", "Results"], ["F4B", "Landmarks"], ["F5", "More"], ["F1-200", "Home at 200%"]]],
    ];
    const th = 2.2, tw = (th * 402) / 874, gap = 0.62, sx = 4.0;
    rows.forEach(([k, who, what, steps], r) => {
      const y = 1.35 + r * 2.85;
      disc(s, k, ML, y + 0.03, 0.34);
      text(s, who, { x: ML + 0.5, y, w: 2.8, h: 0.4, fontSize: 16, bold: true });
      text(s, what, { x: ML + 0.5, y: y + 0.42, w: 2.8, h: 0.9, fontSize: 13, color: K.grey });
      steps.forEach(([code, lab], i) => {
        const x = sx + i * (tw + gap);
        picture(s, SCREEN(code), x, y, th, lab);
        text(s, lab, { x, y: y + th + 0.06, w: tw + gap - 0.05, h: 0.3, fontSize: 11 });
        if (i < steps.length - 1) arrow(s, x + tw + 0.12, y + th / 2, x + tw + gap - 0.12, y + th / 2);
      });
    });
    text(s, [{ text: "Prototype: ", options: { color: K.grey } }, { text: "flow \"First launch (en-GB)\"", options: { hyperlink: { url: PROTO } } }], { x: ML + 0.5, y: 6.1, w: 3.2, h: 0.5, fontSize: 12 });
  }

  // 14 --------------------------------------------------------------- method
  pres.addSection({ title: "Testing" });
  {
    const s = content("Testing", "Nine people tested the English prototype",
      "Presenter: Chenyang Zhang · about 25 seconds.\n\nNine people took the test between 5 and 7 November, alone and remotely, with no moderator. The study had 21 blocks: nine tasks in the prototype, six questions checking what people read, five ease ratings and one overall rating. Participants were 18 to 48, and none was 60 or over, although older passengers are one of our target groups. Five used a laptop, so most taps were mouse clicks.");
    stat(s, "9", "participants, 5–7 Nov 2026", ML, 1.2, 2.6, { size: 36, bigH: 0.6, labelH: 0.35 });
    stat(s, "21", "Maze blocks in one study", ML + 2.9, 1.2, 2.6, { size: 36, bigH: 0.6, labelH: 0.35 });
    stat(s, "9.2 min", "median study time (6.7–22.4)", ML + 5.8, 1.2, 2.8, { size: 36, bigH: 0.6, labelH: 0.35 });
    text(s, "Each person opened the Maze link alone, on their own device, with no moderator. Some talked to our User Researcher afterwards; the researcher's notes are the source of the quotes.", { x: ML + 8.9, y: 1.3, w: CW - 8.9, h: 1.2, fontSize: 12, color: K.grey });
    // the 21 blocks in order
    const kind = { m: [K.red, K.white], q: [K.dark, K.white], e: [K.mid, K.white], o: [K.rule, K.ink] };
    const seq = "mqmqemmemqemqmmqemqeo";
    const step = CW / 21, sq = step - 0.07, sy = 2.85;
    [...seq].forEach((t, i) => {
      s.addShape(pres.shapes.RECTANGLE, { x: ML + i * step, y: sy, w: sq, h: sq, fill: { color: kind[t][0] }, line: { color: kind[t][0], width: 0.5 } });
      text(s, String(i + 1), { x: ML + i * step, y: sy, w: sq, h: sq, fontSize: 11, bold: true, color: kind[t][1], align: "center", valign: "middle" });
    });
    [["Start", 1, 1], ["F1", 2, 5], ["F2", 6, 8], ["F3", 9, 11], ["F4", 12, 17], ["F5", 18, 20], ["End", 21, 21]].forEach(([lab, a, b]) => {
      const x = ML + (a - 1) * step, w = (b - a + 1) * step - 0.07;
      s.addShape(pres.shapes.LINE, { x, y: sy + sq + 0.1, w, h: 0, line: { color: K.mid, width: 1 } });
      text(s, lab, { x, y: sy + sq + 0.15, w, h: 0.28, fontSize: 12, bold: true, align: "center" });
    });
    [["m", "Task in the prototype (9)"], ["q", "Question on what they read (6)"], ["e", "Ease rating (5)"], ["o", "Overall rating (1)"]].forEach(([t, lab], i) => {
      const x = ML + i * 3.0;
      s.addShape(pres.shapes.RECTANGLE, { x, y: 3.95, w: 0.2, h: 0.2, fill: { color: kind[t][0] }, line: { color: kind[t][0], width: 0.5 } });
      text(s, lab, { x: x + 0.3, y: 3.92, w: 2.6, h: 0.28, fontSize: 12, color: K.grey });
    });
    // ages
    text(s, [{ text: "Age", options: { bold: true } }, { text: "   18 to 48, median 19", options: { color: K.grey } }], { x: ML, y: 4.55, w: 5.6, h: 0.32, fontSize: 14 });
    // one dot per participant at their exact age; one year is wider than a dot
    const ax0 = ML, axW = 5.6, a0 = 15, a1 = 70, ay = 6.15, xa = (a) => ax0 + ((a - a0) / (a1 - a0)) * axW;
    s.addShape(pres.shapes.RECTANGLE, { x: xa(60), y: 4.95, w: xa(70) - xa(60), h: ay - 4.95, fill: { color: K.panel }, line: { color: K.panel, width: 0.5 } });
    text(s, "Aged 60+: a target group, none tested", { x: xa(60) + 0.08, y: 5.0, w: xa(70) - xa(60) - 0.12, h: 1.1, fontSize: 11, color: K.grey });
    s.addShape(pres.shapes.LINE, { x: ax0, y: ay, w: axW, h: 0, line: { color: K.mid, width: 1 } });
    for (const a of [20, 30, 40, 50, 60, 70]) text(s, String(a), { x: xa(a) - 0.2, y: ay + 0.06, w: 0.4, h: 0.24, fontSize: 10, color: K.grey, align: "center" });
    const d = 0.1;
    for (const [a, n] of [[18, 1], [19, 5], [20, 1], [45, 1], [48, 1]]) {
      for (let j = 0; j < n; j++) s.addShape(pres.shapes.OVAL, { x: xa(a) - d / 2, y: ay - 0.08 - d - j * (d + 0.03), w: d, h: d, fill: { color: K.dark }, line: { color: K.dark, width: 0.25 } });
    }
    // devices
    const dx = 7.1;
    text(s, [{ text: "Device", options: { bold: true } }, { text: "   most taps were mouse clicks", options: { color: K.grey } }], { x: dx, y: 4.55, w: W - ML - dx, h: 0.32, fontSize: 14 });
    let x = dx;
    for (const [ic, n, lab] of [["MdLaptop", 5, "Laptop"], ["MdSmartphone", 3, "Phone"], ["MdTabletMac", 1, "Tablet"]]) {
      const start = x;
      for (let j = 0; j < n; j++) { s.addImage({ data: await icon(ic, HEX.accent2), x, y: 5.15, w: 0.45, h: 0.45, altText: lab }); x += 0.5; }
      text(s, `${lab}  ${n}`, { x: start, y: 5.7, w: 1.8, h: 0.3, fontSize: 13, bold: true });
      x += 0.45;
    }
    text(s, "Touch-target size and thumb reach were therefore barely tested.", { x: dx, y: 6.1, w: W - ML - dx, h: 0.3, fontSize: 12, color: K.grey });
  }

  // 15 --------------------------------------------------------------- results
  {
    const s = content("Testing", "All nine finished; 78 of 81 attempts succeeded",
      "Presenter: Chenyang Zhang · about 30 seconds.\n\nEvery participant finished. Of 81 task attempts, 78 succeeded: 59 by the expected path and 19 by another route, with three give-ups, each by a different person. The Maze usability score was 71, and all nine rated the redesign Good or Very good. Phone users took the expected path far less often than laptop users. Note that Maze calls any route other than the expected one indirect, even a shorter route we designed.");
    const M = ["Onboarding", "Read Bus 8 information (F1)", "Save a stop (F2)", "Check saved stops (F2)", "Plan a trip (F3)", "Find nearby stops (F4)", "Open the map (F4)", "Find landmarks (F4)", "Enlarge the text (F5)"];
    s.addChart(pres.charts.BAR, [
      { name: "Direct (expected path)", labels: M, values: [9, 9, 2, 7, 8, 4, 6, 8, 6] },
      { name: "Indirect (another route)", labels: M, values: [0, 0, 6, 1, 1, 5, 3, 0, 3] },
      { name: "Gave up", labels: M, values: [0, 0, 1, 1, 0, 0, 0, 1, 0] },
    ], {
      x: ML, y: 1.25, w: 8.4, h: 5.25, barDir: "bar", barGrouping: "stacked", barGapWidthPct: 45,
      chartColors: OUTCOME, catAxisOrientation: "maxMin", catAxisLabelFontSize: 13, catAxisLabelColor: HEX.dk1, catAxisLineShow: false,
      valAxisHidden: true, valAxisMinVal: 0, valAxisMaxVal: 9, valGridLine: { style: "none" }, catGridLine: { style: "none" },
      showValue: true, dataLabelPosition: "ctr", dataLabelColor: HEX.lt1, dataLabelFontSize: 14, dataLabelFontBold: true, dataLabelFormatCode: "0;;;",
      showLegend: true, legendPos: "t", legendFontSize: 12, legendColor: HEX.dk1, ...chartText,
    });
    text(s, "Participants per mission (n = 9). Maze counts any route other than the single expected path as indirect, even a shorter one.", { x: ML, y: 6.55, w: 8.4, h: 0.35, fontSize: 11, color: K.grey });
    const tx = 9.45, tw = W - ML - tx;
    [["71/100", "Maze usability score"], ["45/54", "answers on what they read were correct (83%)"], ["9/9", "rated the redesign Good (8) or Very good (1)"], ["10/24", "direct successes for phone users, against 35/40 on laptops"]].forEach(([b, l], i) => {
      const y = 1.3 + i * 1.33;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: tx, y, w: tw, h: 1.2, rectRadius: 0.1, fill: { color: K.panel }, line: { color: K.panel, width: 0.5 } });
      text(s, b, { x: tx + 0.2, y: y + 0.1, w: tw - 0.4, h: 0.5, fontSize: 28, bold: true, color: K.red, valign: "middle" });
      text(s, l, { x: tx + 0.2, y: y + 0.62, w: tw - 0.4, h: 0.5, fontSize: 12 });
    });
  }

  // 16 --------------------------------------------------------------- reading and ease
  {
    const s = content("Testing", "On the right screen, people read the times correctly",
      "Presenter: Chenyang Zhang · about 20 seconds.\n\nWhen people reached the right screen, they read it correctly: the next Bus 8, the first bus at the nearest stop, both buses to the hospital, and Bus 116 at the largest text size. The two lower scores are the duration questions, which we come back to in a moment. Ease ratings were mostly Easy or Really easy; the only 'A little difficult' ratings were for saving a stop.");
    text(s, "Questions answered correctly (out of 9)", { x: ML, y: 1.3, w: 5.9, h: 0.35, fontSize: 15, bold: true });
    s.addChart(pres.charts.BAR, [{ name: "Correct", labels: ["Next Bus 8", "Route 8 journey time", "Walking time on the trip", "Which bus comes first", "Buses to the hospital", "Bus 116 at 200% text"], values: [9, 7, 3, 8, 9, 9] }], {
      x: ML, y: 1.75, w: 5.9, h: 4.3, barDir: "bar", barGapWidthPct: 55, chartColors: [HEX.accent2],
      catAxisOrientation: "maxMin", catAxisLabelFontSize: 13, catAxisLabelColor: HEX.dk1, catAxisLineShow: false,
      valAxisHidden: true, valAxisMinVal: 0, valAxisMaxVal: 10, valGridLine: { style: "none" }, catGridLine: { style: "none" },
      showValue: true, dataLabelPosition: "outEnd", dataLabelColor: HEX.dk1, dataLabelFontSize: 14, dataLabelFontBold: true, dataLabelFormatCode: '0"/9"',
      showLegend: false, ...chartText,
    });
    text(s, "The two duration questions scored lower. Their wording pointed to another number on the screen (slide 18).", { x: ML, y: 6.15, w: 5.9, h: 0.6, fontSize: 12, color: K.grey });
    const ex = 6.95, ew = W - ML - ex;
    text(s, "Ease ratings after each task", { x: ex, y: 1.3, w: ew, h: 0.35, fontSize: 15, bold: true });
    const T = ["Read bus information", "Save a stop", "Search a route", "Use Nearby", "Adjust text size"];
    s.addChart(pres.charts.BAR, [
      { name: "Really easy", labels: T, values: [4, 3, 4, 3, 5] },
      { name: "Easy", labels: T, values: [4, 2, 5, 4, 2] },
      { name: "Moderate", labels: T, values: [1, 2, 0, 2, 2] },
      { name: "A little difficult", labels: T, values: [0, 2, 0, 0, 0] },
    ], {
      x: ex, y: 1.75, w: ew, h: 4.3, barDir: "bar", barGrouping: "stacked", barGapWidthPct: 55, chartColors: EASE,
      catAxisOrientation: "maxMin", catAxisLabelFontSize: 13, catAxisLabelColor: HEX.dk1, catAxisLineShow: false,
      valAxisHidden: true, valAxisMinVal: 0, valAxisMaxVal: 9, valGridLine: { style: "none" }, catGridLine: { style: "none" },
      showValue: true, dataLabelPosition: "ctr", dataLabelColor: HEX.lt1, dataLabelFontSize: 14, dataLabelFontBold: true, dataLabelFormatCode: "0;;;",
      showLegend: true, legendPos: "t", legendFontSize: 12, legendColor: HEX.dk1, ...chartText,
    });
    text(s, "No task was rated harder than \"A little difficult\". Both of those ratings were for saving a stop.", { x: ex, y: 6.15, w: ew, h: 0.6, fontSize: 12, color: K.grey });
  }

  // 17 --------------------------------------------------------------- the save finding
  {
    const s = content("Testing", "Saving a stop was the hardest task",
      "Presenter: Chenyang Zhang · about 40 seconds.\n\nSaving was our weakest task. Only two of nine took the expected path, and its score, 43, was the lowest. Half of those who reached the route screen came from the Home card and half from Saved. Three people tapped the stop card on Home 13 times, but it opens nothing, and the only cue on the expanded card is a small text link. The ratings follow the path length: the four with long paths are the ones who rated it harder. We accept this. It is a missing signifier, and it shapes our next step.");
    const PH = 3.55;
    annotated(s, "save-entry", ML + 0.25, 1.35, PH, "English Home and the expanded route card, with the stop card and the small route link marked");
    numbered(s, ["Stop card on Home: 13 taps from 3 people; it opens nothing", "The only cue to the route screen is a small text link"], ML, 1.35 + PH + 0.25, 4.6, { rowH: 0.5 });
    const rx = 5.75, rw = W - ML - rx;
    [["2/9", "took the expected path"], ["43", "Maze score, the lowest of nine tasks"], ["4 + 4", "reached the route screen from the Home card, or from Saved"]].forEach(([b, l], i) => {
      const w = (rw - 0.4) / 3, x = rx + i * (w + 0.2);
      text(s, b, { x, y: 1.25, w, h: 0.6, fontSize: 32, bold: true, color: K.red, valign: "bottom" });
      text(s, l, { x, y: 1.9, w, h: 0.55, fontSize: 12 });
    });
    text(s, "Screens visited in the save task, by participant and ease rating", { x: rx, y: 2.65, w: rw, h: 0.3, fontSize: 13, bold: true });
    const legend = [["Really easy", EASE[0]], ["Easy", EASE[1]], ["Moderate", EASE[2]], ["A little difficult", EASE[3]]];
    let lx = rx;
    for (const [lab, hex] of legend) {
      s.addShape(pres.shapes.RECTANGLE, { x: lx, y: 3.05, w: 0.18, h: 0.18, fill: { color: hex }, line: { color: hex, width: 0.5 } });
      text(s, lab, { x: lx + 0.25, y: 3.0, w: 1.5, h: 0.28, fontSize: 11, color: K.grey });
      lx += 0.4 + lab.length * 0.075;
    }
    const P = [["P4 · direct", 4, 0], ["P6 · direct", 4, 0], ["P7 · via Saved", 4, 0], ["P5 · via Saved", 5, 1], ["P1 · card, twice", 6, 1], ["P3 · gave up", 9, 3], ["P2 · via Saved", 10, 2], ["P9 · card, 4 times", 10, 2], ["P8 · via Saved", 18, 3]];
    s.addChart(pres.charts.BAR, [{ name: "Screens", labels: P.map((p) => p[0]), values: P.map((p) => p[1]) }], {
      x: rx, y: 3.3, w: rw, h: 2.75, barDir: "bar", barGapWidthPct: 30, chartColors: P.map((p) => EASE[p[2]]),
      catAxisOrientation: "maxMin", catAxisLabelFontSize: 11, catAxisLabelColor: HEX.dk1, catAxisLineShow: false, catAxisLabelFrequency: 1,
      valAxisHidden: true, valAxisMinVal: 0, valAxisMaxVal: 20, valGridLine: { style: "none" }, catGridLine: { style: "none" },
      showValue: true, dataLabelPosition: "outEnd", dataLabelColor: HEX.dk1, dataLabelFontSize: 11, dataLabelFontBold: true,
      showLegend: false, ...chartText,
    });
    text(s, [
      { text: "\"Not intuitive. Don't know that the station inside the column is interactive and can therefore lead to the saving process of target station.\"", options: { italic: true, breakLine: true } },
      { text: "Participant comment, from the researcher's notes. Once on the route screen, all eight saved the stop.", options: { color: K.grey, fontSize: 11 } },
    ], { x: rx, y: 6.1, w: rw, h: 0.8, fontSize: 12 });
  }

  // 18 --------------------------------------------------------------- what we keep
  {
    const s = content("Testing", "Where we keep the design, and why",
      "Presenter: Chenyang Zhang · about 35 seconds.\n\nSome feedback we weigh against the data and keep the design. Two people did not expect text size under More, but seven of nine went there first, and that is where iOS and Android apps keep it. The map stays one tap from Home and Nearby: eight of nine reached it in one or two taps, and a sixth tab would add a choice to every screen. And the walking-time question mostly measured its wording: six chose 28 minutes, the value labelled Total trip.");
    const cols = [
      ["MdTextFields", "Text size stays in More", "7/9", "tapped More as their very first move", "Text size lives in settings on iOS, Android and almost every app, and a built app would also follow the phone's own setting. Pinch-to-zoom is a convention for maps and photos.", "\"Don't know they need to enter 'More' page to adjust text size.\""],
      ["MdMap", "The map stays one tap away", "8/9", "reached the map in one or two taps", "We accept that the Map view link on Home is easy to miss. A sixth tab would add a choice to every screen for a secondary task (Hick, 1952).", "\"Forgot the small Map View button at the home page.\""],
      ["MdDirectionsWalk", "Walking time: the question, not the screen", "6/9", "chose 28 min, the value labelled \"Total trip\"", "All nine chose the right bus, and the walk is shown twice as \"Walk 2 min\". Next time we would ask: \"How many minutes do you walk before boarding?\"", "One participant asked for \"a page with less distracting or redundant information\"."],
    ];
    const gap = 0.4, cw = (CW - 2 * gap) / 3;
    for (const [i, [ic, head, big, lab, body, quote]] of cols.entries()) {
      const x = ML + i * (cw + gap);
      await iconCircle(s, ic, x, 1.35, 0.55);
      text(s, head, { x: x + 0.7, y: 1.35, w: cw - 0.7, h: 0.55, fontSize: 15, bold: true, valign: "middle" });
      text(s, big, { x, y: 2.1, w: cw, h: 0.75, fontSize: 44, bold: true, color: K.red, valign: "bottom" });
      text(s, lab, { x, y: 2.92, w: cw, h: 0.55, fontSize: 14 });
      rule(s, x, 3.6, cw);
      text(s, body, { x, y: 3.75, w: cw, h: 1.65, fontSize: 13 });
      text(s, quote, { x, y: 5.0, w: cw, h: 1.0, fontSize: 12, italic: true, color: K.grey });
    }
  }

  // 19 --------------------------------------------------------------- iteration
  {
    const s = content("Testing", "Three dated versions before testing",
      "Presenter: Li-En Lo · about 20 seconds.\n\nThe design went through three versions before testing, and Figma's version history records each step. This is the route results screen on 28 October, 30 October and 5 November: the trip time gained a label, the next bus and its Live source were added, and the accessibility pass enlarged the badge. We froze the design before the first Maze session, so no screen changed after the test.");
    picture(s, STRIP, ML, 1.3, 5.4, "Route results screen from the Figma version history on 28 Oct, 30 Oct and 5 Nov 2026", { frame: false });
    const tx = 7.65, lx = tx + 0.07;
    const steps = [
      ["1 Oct", "Dual-track journey map", "Chenyang Zhang"],
      ["11–12 Oct", "Wireframe; mid-project checkpoint", "Li-En Lo, with the team"],
      ["28 Oct", "v1: first high-fidelity design, 13 screens", "Li-En Lo"],
      ["28–30 Oct", "v2: Chinese and English pages; 200% and contrast states", "Haochen Fa"],
      ["2 Nov", "Variables for text size, contrast and language; 111 extra frames", "Xulu Zhang"],
      ["3–5 Nov", "200% checks, then arrival rows reworked. Frozen 5 Nov, 17:56", "Moling Kong"],
      ["5–7 Nov", "Maze test with nine participants", "Chenyang Zhang"],
    ];
    s.addShape(pres.shapes.LINE, { x: lx, y: 1.45, w: 0, h: 6 * 0.74, line: { color: K.rule, width: 1.5 } });
    steps.forEach(([d, what, who], i) => {
      const y = 1.35 + i * 0.74;
      s.addShape(pres.shapes.OVAL, { x: tx, y: y + 0.06, w: 0.14, h: 0.14, fill: { color: i === 5 ? K.red : K.dark }, line: { color: K.white, width: 1 } });
      text(s, [{ text: d, options: { bold: true } }, { text: `   ${who}`, options: { color: K.grey, fontSize: 11 } }], { x: tx + 0.35, y, w: W - ML - tx - 0.35, h: 0.28, fontSize: 13 });
      text(s, what, { x: tx + 0.35, y: y + 0.28, w: W - ML - tx - 0.35, h: 0.45, fontSize: 12 });
    });
    text(s, "No screen changed after the test. The changes the results point to are on the next slide.", { x: tx + 0.35, y: 6.5, w: W - ML - tx - 0.35, h: 0.4, fontSize: 11, color: K.grey });
  }

  // 20 --------------------------------------------------------------- next step
  pres.addSection({ title: "Conclusion" });
  {
    const s = content("Conclusion", "Next step: a stop page wherever a stop appears",
      "Presenter: Haochen Fa · about 25 seconds.\n\nOur next step answers the save finding: a stop page that opens from every place a stop appears, the Home card, Nearby, the map and search, with every route at that stop and a labelled Save button. We would test it with the same task and compare the expected-path rate and the taps on the stop card. Four smaller changes come straight from the test results.");
    const src = [["MdHome", "Stop card on Home"], ["MdNearMe", "Stop in the Nearby list"], ["MdMap", "Stop pin on the map"], ["MdSearch", "Stop in search results"]];
    const bx = 4.3, by = 1.35, bh = 2.85, bw = 3.75;
    for (const [i, [ic, lab]] of src.entries()) {
      const y = 1.35 + i * 0.75;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: ML, y, w: 2.9, h: 0.6, rectRadius: 0.08, fill: { color: K.panel }, line: { color: K.panel, width: 0.5 } });
      s.addImage({ data: await icon(ic, HEX.accent2), x: ML + 0.15, y: y + 0.14, w: 0.32, h: 0.32, altText: "" });
      text(s, lab, { x: ML + 0.6, y, w: 2.25, h: 0.6, fontSize: 13, valign: "middle" });
      arrow(s, ML + 2.95, y + 0.3, bx - 0.06, by + bh / 2, { color: K.mid, width: 1.25 });
    }
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: bx, y: by, w: bw, h: bh, rectRadius: 0.12, fill: { color: K.white }, line: { color: K.red, width: 1.75 } });
    s.addImage({ data: await icon("MdPlace", HEX.accent1), x: bx + 0.25, y: by + 0.28, w: 0.42, h: 0.42, altText: "" });
    text(s, "Stop page", { x: bx + 0.75, y: by + 0.27, w: bw - 1, h: 0.45, fontSize: 20, bold: true });
    const sp = ["Every route at that stop", "Next arrivals, Live or Scheduled", "A labelled Save this stop button"];
    text(s, sp.map((t, k) => ({ text: t, options: { bullet: true, breakLine: k < sp.length - 1 } })), { x: bx + 0.3, y: by + 0.9, w: bw - 0.5, h: 1.7, fontSize: 14, paraSpaceAfter: 8 });
    const rx = 8.45, rw = W - ML - rx;
    text(s, [
      { text: "Why", options: { bold: true, breakLine: true } },
      { text: "Three people tapped the Home stop card 13 times, and others looked for the stop in Nearby, on the map and in search.", options: { breakLine: true } },
      { text: " ", options: { fontSize: 8, breakLine: true } },
      { text: "How we would test it", options: { bold: true, breakLine: true } },
      { text: "The same save task against the current design, comparing the expected-path rate (now 2 of 9) and taps on the stop card." },
    ], { x: rx, y: by + 0.05, w: rw, h: bh, fontSize: 13 });
    text(s, "Smaller changes from the test", { x: ML, y: 4.55, w: CW, h: 0.32, fontSize: 14, bold: true });
    const hd = (t) => ({ text: t, options: { bold: true, fill: { color: HEX.lt2 } } });
    const rows = [
      [hd("Finding"), hd("Change"), hd("Evidence")],
      ["\"Full route\" read as the wait", "Relabel it \"Journey time\", like the Chinese 全程需時", "Block 4: two answered \"5 min\""],
      ["Map view link easy to miss", "Give the Map buttons on Home and Nearby more weight", "Block 14: one person took eight steps"],
      ["Saved stops expected on Home", "Show saved stops as well as routes in My favourites", "Block 7 comment"],
      ["No participant aged 60 or over", "Re-test in Cantonese with older passengers, on phones", "Profile; blocks 4 and 10"],
    ];
    const line = { type: "solid", pt: 0.75, color: HEX.accent4 }, none = { type: "none" };
    s.addTable(rows.map((r, i) => r.map((c) => (typeof c === "string" ? { text: c, options: {} } : c)).map((c) => ({ ...c, options: { ...c.options, lang: LANG, border: [i === 0 ? line : none, none, line, none] } }))),
      { x: ML, y: 4.92, w: CW, colW: [3.5, 5.3, CW - 8.8], fontSize: 12, fontFace: "Arial", color: HEX.dk1, margin: [3, 6, 3, 6], valign: "middle" });
  }

  // 21 --------------------------------------------------------------- summary
  {
    const s = content("Conclusion", "What we learned, and what we could not test",
      "Presenter: Haochen Fa · about 30 seconds.\n\nTo sum up: the redesign answers 'when is my bus coming?' on the first screen, and the test shows that people can read it. The clearest weakness is the way into saving, and we have a concrete fix for it. Our main limitations are the sample, with no one over 60 and mostly laptops, and a prototype with plain links. Thank you for watching. The links to the Figma file, the prototype and the Maze report are on this slide.");
    text(s, "What we found", { x: ML, y: 1.3, w: 5.8, h: 0.35, fontSize: 16, bold: true });
    [["78/81", "task attempts succeeded, and every participant finished the study"], ["9/9", "read Bus 8's next arrival, and 9 of 9 read Bus 116 at 200% text: the information design works"], ["2/9", "found the expected way into saving. The Home card needs a visible signifier, and a stop page is our next step"]].forEach(([b, l], i) => {
      const y = 1.8 + i * 1.22;
      text(s, b, { x: ML, y, w: 1.9, h: 0.7, fontSize: 36, bold: true, color: K.red, valign: "top" });
      text(s, l, { x: ML + 2.0, y: y + 0.05, w: 3.9, h: 1.1, fontSize: 14 });
    });
    const lx = 7.0, lw = W - ML - lx;
    text(s, "Limitations", { x: lx, y: 1.3, w: lw, h: 0.35, fontSize: 16, bold: true });
    const lim = ["Nine participants aged 18 to 48, none 60 or over, tested in English", "Five used laptops, so touch and thumb reach were barely tested", "Unmoderated sessions; the comments are the researcher's notes", "The English prototype has links only: taps elsewhere count as misclicks", "Frozen before testing, so the proposed changes are untested"];
    text(s, lim.map((t, k) => ({ text: t, options: { bullet: true, breakLine: k < lim.length - 1 } })), { x: lx, y: 1.8, w: lw, h: 3.4, fontSize: 14, paraSpaceAfter: 9 });
    rule(s, ML, 5.65, CW);
    const links = [["Figma design file", "figma.com/design/2JkOkm1pztoaZask0fDJeq", FIGMA], ["Clickable prototype", "flow \"First launch (en-GB)\"", PROTO], ["Maze report", "app.maze.co/report/Kowloon_bus_redesign", MAZE]];
    links.forEach(([head, shown, url], i) => {
      const x = ML + i * (CW / 3);
      text(s, [{ text: head, options: { bold: true, breakLine: true } }, { text: shown, options: { hyperlink: { url } } }], { x, y: 5.85, w: CW / 3 - 0.2, h: 0.7, fontSize: 12 });
    });
  }

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("wrote", OUT);
}

// pptxgenjs writes Office's stock colour scheme; replace it with ours so the
// scheme colours above (and PowerPoint's colour picker) use the deck palette.
async function applyTheme(file, theme) {
  const zip = await JSZip.loadAsync(fs.readFileSync(file));
  const c = theme.colors;
  const slot = (k) => `<a:${k}><a:srgbClr val="${c[k]}"/></a:${k}>`;
  const scheme = `<a:clrScheme name="${theme.name}">${["dk1", "lt1", "dk2", "lt2", "accent1", "accent2", "accent3", "accent4", "accent5", "accent6", "hlink", "folHlink"].map(slot).join("")}</a:clrScheme>`;
  for (const name of Object.keys(zip.files).filter((n) => /^ppt\/theme\/theme\d+\.xml$/.test(n))) {
    const xml = await zip.file(name).async("string");
    zip.file(name, xml.replace(/<a:clrScheme[\s\S]*?<\/a:clrScheme>/, scheme).replace(/(<a:theme[^>]*\sname=")[^"]*"/, `$1${theme.name}"`));
  }
  // Copy the files only, without folder entries: some cloud co-editing services
  // refuse files that have them. (Removing a folder entry would delete its files.)
  const out = new JSZip();
  for (const [name, entry] of Object.entries(zip.files)) {
    if (!entry.dir) out.file(name, await entry.async("nodebuffer"), { createFolders: false });
  }
  fs.writeFileSync(file, await out.generateAsync({ type: "nodebuffer", compression: "DEFLATE" }));
}

build().catch((e) => { console.error(e); process.exit(1); });
